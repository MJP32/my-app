import { useState, useEffect, useRef } from 'react'

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

function SpringBoot({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory }) {
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})

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

  // Format explanation text with markdown-style formatting
  const formatExplanation = (text) => {
    const lines = text.split('\n')
    const elements = []
    let currentBulletGroup = []
    let key = 0

    const flushBullets = () => {
      if (currentBulletGroup.length > 0) {
        elements.push(
          <ul key={`bullets-${key++}`} style={{
            margin: '0.5rem 0',
            paddingLeft: '1.5rem',
            listStyleType: 'none'
          }}>
            {currentBulletGroup.map((bullet, idx) => (
              <li key={idx} style={{
                marginBottom: '0.5rem',
                position: 'relative',
                paddingLeft: '1rem'
              }}>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  color: '#10b981'
                }}>•</span>
                {bullet}
              </li>
            ))}
          </ul>
        )
        currentBulletGroup = []
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()

      // Skip empty lines
      if (line.length === 0) {
        flushBullets()
        continue
      }

      // Check for section headers like **Overview:**
      const headerMatch = line.match(/^\*\*(.+?):\*\*(.*)$/)
      if (headerMatch) {
        flushBullets()
        elements.push(
          <div key={`header-${key++}`} style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>
            <strong style={{
              fontSize: '1.1rem',
              color: '#10b981',
              fontWeight: '700'
            }}>
              {headerMatch[1]}:
            </strong>
            {headerMatch[2] && <span> {headerMatch[2]}</span>}
          </div>
        )
        continue
      }

      // Check for bullet points
      if (line.startsWith('•')) {
        currentBulletGroup.push(line.substring(1).trim())
        continue
      }

      // Regular paragraph text
      flushBullets()

      // Process inline bold text (**text**)
      const parts = []
      let lastIndex = 0
      const boldRegex = /\*\*(.+?)\*\*/g
      let match

      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index))
        }
        parts.push(<strong key={`bold-${key++}`} style={{ fontWeight: '700' }}>{match[1]}</strong>)
        lastIndex = match.index + match[0].length
      }

      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex))
      }

      if (parts.length === 0) {
        parts.push(line)
      }

      elements.push(
        <p key={`para-${key++}`} style={{
          margin: '0.5rem 0',
          lineHeight: '1.7'
        }}>
          {parts}
        </p>
      )
    }

    flushBullets()
    return elements
  }

  const springBootFeatures = [
    {
      name: 'Auto-Configuration',
      explanation: `**Overview:**
Spring Boot's auto-configuration dramatically reduces boilerplate by intelligently configuring your application based on classpath dependencies, automatically creating beans and sensible defaults without explicit configuration.

**How It Works:**
• Conditional annotations (@ConditionalOnClass, @ConditionalOnMissingBean, @ConditionalOnProperty) apply configuration only when conditions are met
• @SpringBootApplication combines @Configuration, @EnableAutoConfiguration, and @ComponentScan in one annotation
• Detects dependencies on classpath and configures appropriate beans (e.g., H2 triggers embedded database configuration)
• Order of precedence: explicit configuration > property overrides > auto-configuration
• Uses spring.factories file to discover auto-configuration classes

**Key Features:**
• Intelligent bean creation based on classpath scanning and conditional logic
• Sensible defaults eliminating manual configuration for common patterns
• Selective exclusion of auto-configurations via exclude attribute
• Integration with Actuator's conditions endpoint to inspect applied configurations
• Support for custom auto-configuration classes following same patterns

**Real-World Use Cases:**
• Microservices architectures: Quickly spinning up multiple services with consistent configurations
• REST APIs: Automatic configuration of web server, JSON processing, validation
• Database access: Auto-configuring data sources, JPA, transaction management
• Security: Setting up authentication, authorization with minimal configuration
• Messaging: Configuring message brokers, templates, and listeners

**Best Practices:**
• Understand what's being configured using --debug flag or Actuator's conditions endpoint
• Selectively exclude unwanted auto-configurations using exclude attribute
• Create custom auto-configuration classes for organization-specific patterns
• Document deviations from auto-configuration defaults
• Use @ConditionalOnProperty for feature toggles in custom configurations

**Common Pitfalls:**
• Over-relying on auto-configuration without understanding underlying Spring concepts causes debugging confusion
• Conflicting configurations between auto-configuration and explicit configuration
• Not understanding order of precedence leading to unexpected behavior
• Assuming all dependencies will auto-configure when conditions aren't met
• Forgetting to exclude auto-configurations when providing custom implementations

**When to Use:**
Use auto-configuration for rapid application development, microservices, and standard patterns. Essential for reducing boilerplate in REST APIs, data access, security, and messaging. Most valuable when following Spring Boot conventions.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Basic SpringBootApplication Setup
// ═══════════════════════════════════════════════════════════════════════════

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication = @Configuration + @EnableAutoConfiguration + @ComponentScan
@SpringBootApplication
public class MyApplication {
  public static void main(String[] args) {
    SpringApplication.run(MyApplication.class, args);
  }
}
// Output: Application started on port 8080

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Custom Auto-Configuration with Conditionals
// ═══════════════════════════════════════════════════════════════════════════

// Custom auto-configuration
@Configuration
@ConditionalOnClass(DataSource.class)
@ConditionalOnMissingBean(DataSource.class)
public class DataSourceAutoConfiguration {

  @Bean
  public DataSource dataSource() {
    HikariDataSource dataSource = new HikariDataSource();
    dataSource.setJdbcUrl("jdbc:h2:mem:testdb");
    dataSource.setUsername("sa");
    dataSource.setPassword("");
    return dataSource;
  }
}
// Auto-configured only if DataSource class exists and no DataSource bean defined

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Conditional Beans and Profile Management
// ═══════════════════════════════════════════════════════════════════════════

// Conditional beans
@Configuration
public class MyConfiguration {

  @Bean
  @ConditionalOnProperty(name = "app.feature.enabled", havingValue = "true")
  public FeatureService featureService() {
    return new FeatureService();
  }

  @Bean
  @Profile("dev")
  public DataSource devDataSource() {
    return new H2DataSource();
  }

  @Bean
  @Profile("prod")
  public DataSource prodDataSource() {
    return new PostgresDataSource();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Excluding Auto-Configurations
// ═══════════════════════════════════════════════════════════════════════════

// Excluding auto-configurations
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class CustomApplication {
  public static void main(String[] args) {
    SpringApplication.run(CustomApplication.class, args);
  }
}
// Output: Application started without DataSource auto-configuration`
    },
    {
      name: 'Starter Dependencies',
      explanation: `**Overview:**
Spring Boot starters are carefully curated dependency sets providing everything needed for specific use cases in one package, eliminating version management complexity and ensuring compatible, tested library combinations.

**How It Works:**
• Each starter bundles related dependencies for a specific technical capability or pattern
• Bill of Materials (BOM) manages compatible versions across all included libraries
• Transitive dependencies automatically include everything needed (server, serialization, validation)
• Version upgrades happen together when upgrading Spring Boot version
• Maven/Gradle dependency management handles all version resolution

**Key Features:**
• "Batteries included" approach with all necessary dependencies in one declaration
• Automatic version compatibility eliminating dependency conflict resolution
• Modular composition allowing mixing starters for needed functionality
• Transitive dependency management including servers, libraries, and utilities
• Support for exclusions and customization when needed

**Real-World Use Cases:**
• Microservices: Quickly composing web, data, security, and actuator starters for complete service
• REST APIs: spring-boot-starter-web provides server, MVC, JSON, and validation instantly
• Data access: spring-boot-starter-data-jpa for relational or spring-boot-starter-data-mongodb for NoSQL
• Messaging: spring-boot-starter-kafka or spring-boot-starter-amqp for event-driven architectures
• Testing: spring-boot-starter-test bundles JUnit, Mockito, AssertJ for comprehensive test support

**Best Practices:**
• Include only starters actually needed to keep application lean and focused
• Review transitive dependencies to understand what's being included
• Use exclusion mechanisms when swapping implementations (e.g., Tomcat to Jetty)
• Consider creating custom starters for organization-specific patterns
• Check Spring Boot documentation for specific library versions in each starter

**Common Pitfalls:**
• Adding too many starters bloats application and increases startup time
• Starter auto-configurations may conflict with explicit configuration
• Not understanding transitive dependencies leading to unexpected libraries
• Forgetting to exclude default implementations when providing alternatives
• Version conflicts when mixing Spring Boot starters with non-Boot dependencies

**Common Starters:**
• spring-boot-starter-web: REST APIs (Tomcat, Spring MVC, Jackson, Validation)
• spring-boot-starter-data-jpa: Relational DB (Hibernate, Spring Data JPA, JDBC)
• spring-boot-starter-data-mongodb: NoSQL MongoDB integration
• spring-boot-starter-security: Authentication and authorization
• spring-boot-starter-test: Testing (JUnit 5, Mockito, AssertJ, Spring Test)
• spring-boot-starter-actuator: Monitoring (metrics, health checks, endpoints)
• spring-boot-starter-webflux: Reactive web (Reactor Netty, Spring WebFlux)
• spring-boot-starter-kafka: Event streaming with Apache Kafka
• spring-boot-starter-cache: Cache abstraction (EhCache, Redis, Caffeine)

**When to Use:**
Use starters for all Spring Boot applications to leverage dependency management, version compatibility, and rapid development. Essential for microservices, REST APIs, and any application following standard patterns.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Maven Starter Dependencies Configuration
// ═══════════════════════════════════════════════════════════════════════════

// pom.xml - Maven starter dependencies
/*
<dependencies>
  <!-- Web starter: Tomcat, Spring MVC, Jackson, Validation -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>

  <!-- JPA starter: Hibernate, Spring Data JPA, JDBC -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
  </dependency>

  <!-- Security starter: Spring Security, OAuth2 -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
  </dependency>

  <!-- Test starter: JUnit, Mockito, AssertJ, Spring Test -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
  </dependency>
</dependencies>
*/

// ═══════════════════════════════════════════════════════════════════════════
// ✦ REST Controller with Web Starter
// ═══════════════════════════════════════════════════════════════════════════

// REST Controller with web starter
@RestController
@RequestMapping("/api")
public class UserController {

  @Autowired
  private UserRepository userRepository;

  @GetMapping("/users")
  public List<User> getUsers() {
    return userRepository.findAll();
  }

  @PostMapping("/users")
  public User createUser(@RequestBody User user) {
    return userRepository.save(user);
  }
}
// Output: GET /api/users returns JSON array

// ═══════════════════════════════════════════════════════════════════════════
// ✦ JPA Entity and Repository with Data JPA Starter
// ═══════════════════════════════════════════════════════════════════════════

// JPA Entity with data-jpa starter
@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;
  private String email;

  // Getters and setters
}

// Repository interface - no implementation needed
public interface UserRepository extends JpaRepository<User, Long> {
  List<User> findByName(String name);
  Optional<User> findByEmail(String email);
}
// Output: Automatic CRUD operations + custom queries

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Testing with Test Starter
// ═══════════════════════════════════════════════════════════════════════════

// Testing with test starter
@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Test
  void testGetUsers() throws Exception {
    mockMvc.perform(get("/api/users"))
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_JSON));
  }
}
// Output: Test passed`
    },
    {
      name: 'Embedded Servers',
      explanation: `**Overview:**
Spring Boot's embedded servers revolutionize deployment by including the web server directly in your application JAR, eliminating separate server installation and enabling self-contained, executable applications.

**How It Works:**
• Web server (Tomcat, Jetty, Undertow, Reactor Netty) packaged inside application JAR
• Application runs with simple java -jar command without separate server deployment
• Server lifecycle managed by Spring Boot application context
• Configurable via application.properties or programmatic customization
• Same server version embedded ensuring consistency across environments

**Key Features:**
• Self-contained executable JARs eliminating WAR deployment to external servers
• Simplified deployment with no separate server installation or configuration
• Consistent server versions across development, testing, and production
• Trivial containerization requiring only JRE and application JAR
• Instant application startup from IDE or command line

**Real-World Use Cases:**
• Microservices: Deploying dozens or hundreds of independent services with embedded servers
• Containerization: Docker and Kubernetes deployments with minimal container images
• Cloud platforms: AWS Elastic Beanstalk, Google App Engine, Azure App Service compatibility
• Standalone tools: Admin utilities and monitoring tools needing HTTP interface
• Development: Rapid application testing without external server setup

**Best Practices:**
• Choose server based on needs: Tomcat (default, broad compatibility), Undertow (performance), Jetty (WebSocket), Reactor Netty (reactive)
• Configure thread pools, connection limits, and timeouts for production
• Use externalized configuration for server settings allowing tuning without rebuild
• Consider reverse proxy (Nginx) for SSL termination, load balancing, security in production
• Monitor memory usage and resource consumption per server choice

**Common Pitfalls:**
• Assuming default settings are production-ready without tuning thread pools and connection limits
• High memory overhead when running multiple instances on same host
• Blocking I/O operations on server threads in high-concurrency scenarios
• Not implementing graceful shutdown in containerized environments
• Ignoring resource management since server and application share same JVM

**Available Servers:**
• Tomcat (default): Full Servlet support, extensive documentation, proven production use
• Jetty: Lightweight, excellent async I/O, ideal for WebSocket and long-polling
• Undertow: High-performance, non-blocking I/O, lowest memory footprint, best for microservices
• Reactor Netty: Built for Spring WebFlux, fully non-blocking, optimal for high-concurrency reactive apps

**When to Use:**
Use embedded servers for microservices, containerized applications, cloud deployments, and any application prioritizing deployment simplicity and environment consistency. Essential for modern cloud-native development.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Default Embedded Tomcat Configuration
// ═══════════════════════════════════════════════════════════════════════════

// Default embedded Tomcat (included in spring-boot-starter-web)
@SpringBootApplication
public class EmbeddedServerApp {
  public static void main(String[] args) {
    SpringApplication.run(EmbeddedServerApp.class, args);
  }
}
// Output: Tomcat started on port 8080

// application.properties - Server configuration
/*
server.port=9090
server.servlet.context-path=/myapp
server.tomcat.max-threads=200
server.tomcat.max-connections=10000
server.compression.enabled=true
*/

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Programmatic Server Configuration
// ═══════════════════════════════════════════════════════════════════════════

// Programmatic server configuration
@Configuration
public class ServerConfig {

  @Bean
  public WebServerFactoryCustomizer<TomcatServletWebServerFactory>
      customizer() {
    return factory -> {
      factory.setPort(9090);
      factory.setContextPath("/myapp");
      factory.addConnectorCustomizers(connector -> {
        connector.setMaxThreads(200);
      });
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Switching to Alternative Servers
// ═══════════════════════════════════════════════════════════════════════════

// Switch to Jetty (exclude Tomcat, add Jetty)
/*
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
  <exclusions>
    <exclusion>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-tomcat</artifactId>
    </exclusion>
  </exclusions>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
*/

// ═══════════════════════════════════════════════════════════════════════════
// ✦ SSL/HTTPS and Docker Deployment
// ═══════════════════════════════════════════════════════════════════════════

// SSL/HTTPS configuration
/*
server.port=8443
server.ssl.key-store=classpath:keystore.p12
server.ssl.key-store-password=password
server.ssl.key-store-type=PKCS12
server.ssl.key-alias=tomcat
*/

// Building executable JAR
// mvn clean package
// java -jar target/myapp.jar
// Output: Application running on embedded Tomcat at https://localhost:8443

// Docker deployment
/*
FROM openjdk:17-jdk-slim
COPY target/myapp.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
*/
// docker build -t myapp:latest .
// docker run -p 8080:8080 myapp:latest
// Output: Containerized app running on port 8080`
    },
    {
      name: 'Actuator',
      explanation: `**Overview:**
Spring Boot Actuator provides production-ready monitoring, management, and diagnostic features through HTTP endpoints and JMX, enabling operational visibility without modifying core application code.

**How It Works:**
• Exposes operational information through HTTP endpoints (/actuator/*) and JMX
• Built on Micrometer metrics facade providing vendor-neutral instrumentation
• Health check system monitors application components (database, disk, message brokers)
• Metrics collection includes JVM stats, HTTP requests, database pools, custom metrics
• Exports to multiple monitoring systems (Prometheus, Grafana, Datadog, CloudWatch)

**Key Features:**
• Comprehensive health checks with detailed component status for orchestration platforms
• Vendor-neutral metrics collection exportable to multiple monitoring systems
• Dynamic logging level adjustment without application restart
• Custom endpoints and health indicators for application-specific monitoring
• Thread dumps, heap dumps, and bean inspection for debugging
• Auto-configuration visibility showing applied configurations

**Real-World Use Cases:**
• Microservices: Centralized monitoring across dozens of services with Prometheus/Grafana integration
• Kubernetes: Health endpoints for liveness and readiness probes
• Production debugging: Adjusting log levels, capturing heap dumps, analyzing thread states
• Performance monitoring: Tracking HTTP requests, database connections, JVM metrics
• Observability: Foundation for monitoring, logging, and tracing practices
• SLI/SLO implementation: Tracking Service Level Indicators and Objectives

**Best Practices:**
• Secure endpoints with Spring Security requiring authentication for management access
• Selectively expose only needed endpoints rather than all endpoints
• Integrate with Prometheus for metrics collection and Grafana for visualization
• Create custom health indicators for critical external dependencies
• Use metric tags for filtering and aggregation in monitoring systems
• Cache expensive health check operations to avoid overhead

**Common Pitfalls:**
• Exposing endpoints publicly without security leaks sensitive information and enables DoS attacks
• Relying solely on health checks without proper logging and distributed tracing
• Enabling /shutdown endpoint accidentally allowing external termination
• Expensive operations in health indicators impacting load balancer health checks
• Not considering performance overhead of metrics collection and heap dumps under high load
• Exposing all endpoints by default instead of selective exposure

**Common Endpoints:**
• /actuator/health: Component health checks for Kubernetes probes
• /actuator/metrics: JVM, HTTP, database metrics for performance monitoring
• /actuator/prometheus: Prometheus-formatted metrics for scraping
• /actuator/info: Version, build, git commit information
• /actuator/loggers: Dynamic log level modification without restart
• /actuator/env: Environment properties for configuration debugging
• /actuator/beans: Spring beans and dependencies for DI understanding
• /actuator/threaddump: Thread dump for deadlock troubleshooting
• /actuator/heapdump: Heap dump for memory analysis

**When to Use:**
Always include Actuator in production applications. Essential for cloud deployments, containerized applications, microservices, and any system requiring operational visibility, health monitoring, or observability.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Actuator Setup and Configuration
// ═══════════════════════════════════════════════════════════════════════════

// Add actuator dependency
/*
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
*/

// application.properties - Enable actuator endpoints
/*
management.endpoints.web.exposure.include=health,info,metrics,env,beans
management.endpoint.health.show-details=always
management.metrics.export.prometheus.enabled=true
*/

// Access health endpoint
// GET http://localhost:8080/actuator/health
/*
{
  "status": "UP",
  "components": {
    "db": {"status": "UP", "details": {"database": "H2"}},
    "diskSpace": {"status": "UP", "details": {"free": "100GB"}}
  }
}
*/

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Custom Health Indicators
// ═══════════════════════════════════════════════════════════════════════════

// Custom health indicator
@Component
public class CustomHealthIndicator implements HealthIndicator {

  @Override
  public Health health() {
    boolean healthy = checkExternalService();
    if (healthy) {
      return Health.up()
        .withDetail("service", "available")
        .build();
    }
    return Health.down()
      .withDetail("service", "unavailable")
      .withDetail("error", "Connection timeout")
      .build();
  }

  private boolean checkExternalService() {
    // Check external service health
    return true;
  }
}
// Output: /actuator/health includes custom indicator

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Custom Metrics with Micrometer
// ═══════════════════════════════════════════════════════════════════════════

// Custom metrics
@Service
public class OrderService {

  private final Counter orderCounter;
  private final Timer orderTimer;

  public OrderService(MeterRegistry registry) {
    this.orderCounter = Counter.builder("orders.created")
      .description("Total orders created")
      .tag("type", "online")
      .register(registry);

    this.orderTimer = Timer.builder("orders.processing.time")
      .description("Order processing time")
      .register(registry);
  }

  public Order createOrder(Order order) {
    return orderTimer.record(() -> {
      Order saved = orderRepository.save(order);
      orderCounter.increment();
      return saved;
    });
  }
}
// Output: /actuator/metrics/orders.created

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Custom Actuator Endpoints and Prometheus Integration
// ═══════════════════════════════════════════════════════════════════════════

// Custom actuator endpoint
@Component
@Endpoint(id = "custom")
public class CustomEndpoint {

  @ReadOperation
  public Map<String, Object> customInfo() {
    Map<String, Object> info = new HashMap<>();
    info.put("version", "1.0.0");
    info.put("environment", "production");
    info.put("uptime", getUptime());
    return info;
  }

  @WriteOperation
  public void resetCache() {
    // Reset application cache
    System.out.println("Cache reset");
  }
}
// Output: GET /actuator/custom returns custom info
// Output: POST /actuator/custom resets cache

// Prometheus metrics endpoint
// GET http://localhost:8080/actuator/prometheus
/*
# HELP orders_created_total Total orders created
# TYPE orders_created_total counter
orders_created_total{type="online"} 150.0

# HELP orders_processing_time_seconds Order processing time
# TYPE orders_processing_time_seconds summary
orders_processing_time_seconds_count 150
orders_processing_time_seconds_sum 45.5
*/`
    },
    {
      name: 'DevTools',
      explanation: `**Overview:**
Spring Boot DevTools accelerates development with automatic application restart, LiveReload browser refresh, and development-optimized property defaults, enhancing developer productivity while automatically disabling in production.

**How It Works:**
• Two-classloader architecture: application code (frequently changing) and dependencies (stable)
• Monitors classpath for changes and restarts only application classloader (5-10 seconds vs 30-60 seconds full restart)
• LiveReload integration automatically refreshes browser on static resource changes
• Development property defaults disable caching and enable detailed error messages
• Automatically disabled when application is packaged and deployed to production

**Key Features:**
• Intelligent fast restart reloading only changed application code, not dependencies
• LiveReload browser extension integration for instant frontend feedback
• Development-optimized defaults (disabled caching, H2 console, detailed errors)
• Configurable exclusion patterns for resources that shouldn't trigger restarts
• Remote DevTools support for cloud development with security configuration

**Real-World Use Cases:**
• REST API development: Modifying controllers and testing immediately without manual restart
• Full-stack development: LiveReload keeping browser synchronized with backend and frontend changes
• Rapid prototyping: Fast iteration cycle enabling flow state during active development
• Configuration experimentation: Quick testing of property changes without long restart cycles
• Debugging: Fast restart for testing theories and fixes

**Best Practices:**
• Add as optional dependency ensuring exclusion from production builds
• Configure exclusion patterns for static assets that shouldn't trigger restarts
• Use with IDE's build-on-save feature for optimal experience
• Set up development profile with additional debugging properties
• Configure remote DevTools with security for cloud development scenarios

**Common Pitfalls:**
• Classloader architecture causing issues with libraries using reflection or assuming specific classloader
• Automatic restart triggered by irrelevant file changes without proper exclusions
• @PostConstruct and lifecycle methods invoked on each restart, not just once
• Static field values lost on restart without explicit preservation
• Not configuring IDE for automatic build preventing DevTools from working
• Memory overhead from maintaining two classloaders

**When to Use:**
Include DevTools in every Spring Boot application during active development for rapid prototyping and iterative development. Essential for frequent code changes and tight feedback loops. Exclude from production where it adds overhead and potential issues.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ DevTools Setup and Automatic Restart
// ═══════════════════════════════════════════════════════════════════════════

// Add DevTools dependency (automatically disabled in production)
/*
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-devtools</artifactId>
  <optional>true</optional>
</dependency>
*/

// Automatic restart demonstration
@RestController
public class HelloController {

  @GetMapping("/hello")
  public String hello() {
    return "Hello, World!";
  }
}
// Modify return value to "Hello, Spring Boot!"
// Save file
// Output: Application automatically restarts
// Output: GET /hello returns "Hello, Spring Boot!"

// ═══════════════════════════════════════════════════════════════════════════
// ✦ DevTools Configuration Options
// ═══════════════════════════════════════════════════════════════════════════

// DevTools configuration
// application-dev.properties
/*
spring.devtools.restart.enabled=true
spring.devtools.restart.additional-paths=src/main/resources
spring.devtools.restart.exclude=static/**,public/**
spring.devtools.livereload.enabled=true
spring.devtools.livereload.port=35729
*/

// Restart vs Reload
// Restart: Full application context refresh (code changes)
// Reload: Static resources only (HTML, CSS, JS)

// Trigger restart programmatically
@Component
public class RestartService {

  @Autowired
  private RestartEndpoint restartEndpoint;

  public void triggerRestart() {
    restartEndpoint.restart();
    System.out.println("Application restarting...");
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Remote DevTools and Static Data
// ═══════════════════════════════════════════════════════════════════════════

// Remote DevTools (for cloud deployments)
/*
spring.devtools.remote.secret=mysecret
spring.devtools.remote.context-path=/devtools
*/
// java -jar spring-boot-devtools.jar http://localhost:8080

// Exclude from restart
@Component
public class StaticDataLoader {

  @PostConstruct
  public void loadData() {
    // This won't reload on restart
    System.out.println("Loading static data once");
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Development Defaults and Performance Benefits
// ═══════════════════════════════════════════════════════════════════════════

// Development property defaults
// DevTools automatically sets:
/*
spring.thymeleaf.cache=false
spring.freemarker.cache=false
spring.groovy.template.cache=false
spring.h2.console.enabled=true
server.error.include-message=always
server.error.include-binding-errors=always
*/

// Performance improvement
// Before DevTools: Code change -> Stop -> Compile -> Start (30-60 seconds)
// With DevTools: Code change -> Save -> Auto-restart (5-10 seconds)
// Output: 6x faster development cycle

// LiveReload browser extension integration
// Install LiveReload extension
// Make changes to HTML/CSS
// Output: Browser automatically refreshes`
    },
    {
      name: 'Configuration Properties',
      explanation: `**Overview:**
Spring Boot's configuration properties provide type-safe externalized configuration enabling the same binary to work across environments without recompilation, following Twelve-Factor App methodology for cloud-native applications.

**How It Works:**
• @ConfigurationProperties binds external configuration to strongly-typed Java objects
• Well-defined precedence: command-line args > environment variables > application.properties/yml > defaults
• Profile-specific files (application-dev.yml, application-prod.yml) for per-environment overrides
• Bean Validation (JSR-303/JSR-380) integration for declarative configuration validation at startup
• Hierarchical property structure with dot notation (app.security.jwt-secret)

**Key Features:**
• Type-safe configuration with compile-time checking and IDE autocomplete
• Centralized configuration management avoiding scattered @Value annotations
• Multiple configuration sources with clear precedence order
• Profile-based environment-specific configuration
• Validation support catching misconfiguration at startup with clear error messages
• Integration with ConfigMap and Secrets in Kubernetes

**Real-World Use Cases:**
• Environment-varying values: Database connections, API endpoints, feature flags, rate limits
• Microservices configuration: Service discovery endpoints, circuit breaker thresholds, retry policies
• Feature toggles: Enabling/disabling functionality without code changes
• Security: Externalized credentials, JWT secrets, API keys via environment variables
• Cloud-native apps: Kubernetes ConfigMap and Secrets integration
• Performance tuning: Cache TTLs, thread pool sizes, timeout values

**Best Practices:**
• Group related properties into nested objects for organization (app.security.jwt-secret)
• Provide sensible defaults where possible for optional configuration
• Validate all properties with JSR-303 annotations catching errors early
• Use @ConfigurationProperties instead of scattered @Value for maintainability
• Document properties with Javadoc or generate metadata for IDE support
• Store sensitive values (passwords, API keys) in environment variables or secret managers, never in version control

**Common Pitfalls:**
• Committing sensitive configuration to version control instead of using environment variables
• Property name binding confusion - understand Spring Boot's flexible binding conventions
• Over-using profiles creating configuration management complexity
• Bypassing validation by making everything optional with defaults - fail fast instead
• Mixing @Value and @ConfigurationProperties inconsistently
• Not understanding property precedence leading to unexpected values

**When to Use:**
Use @ConfigurationProperties for related configuration sets or more than a few properties. Use @Value for simple one-off properties. Always externalize configuration. Essential for multi-environment deployments and cloud-native applications.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Type-Safe Configuration Properties Setup
// ═══════════════════════════════════════════════════════════════════════════

// application.yml
/*
app:
  name: MyApplication
  version: 1.0.0
  security:
    jwt-secret: secret-key
    token-expiration: 3600
  email:
    host: smtp.gmail.com
    port: 587
    username: user@example.com
    password: password
*/

// Type-safe configuration properties
@Component
@ConfigurationProperties(prefix = "app")
@Validated
public class AppProperties {

  @NotNull
  private String name;

  @NotNull
  private String version;

  private Security security = new Security();
  private Email email = new Email();

  // Getters and setters

  public static class Security {
    @NotBlank
    private String jwtSecret;

    @Min(60)
    @Max(86400)
    private int tokenExpiration;

    // Getters and setters
  }

  public static class Email {
    private String host;
    private int port;
    private String username;
    private String password;

    // Getters and setters
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Using Configuration Properties in Services
// ═══════════════════════════════════════════════════════════════════════════

// Enable configuration properties
@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class Application {
  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }
}

// Using configuration properties
@Service
public class JwtService {

  @Autowired
  private AppProperties appProperties;

  public String generateToken(String username) {
    String secret = appProperties.getSecurity().getJwtSecret();
    int expiration = appProperties.getSecurity().getTokenExpiration();

    return Jwts.builder()
      .setSubject(username)
      .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000))
      .signWith(SignatureAlgorithm.HS512, secret)
      .compact();
  }
}
// Output: JWT token with configured secret and expiration

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Profile-Specific and Environment Configuration
// ═══════════════════════════════════════════════════════════════════════════

// Profile-specific configuration
// application-dev.yml
/*
app:
  security:
    jwt-secret: dev-secret
logging:
  level:
    root: DEBUG
*/

// application-prod.yml
/*
app:
  security:
    jwt-secret: prod-secret-from-vault
logging:
  level:
    root: WARN
*/

// Activate profile
// java -jar app.jar --spring.profiles.active=prod

// Environment variable override
// export APP_SECURITY_JWT_SECRET=env-secret
// export APP_SECURITY_TOKEN_EXPIRATION=7200
// java -jar app.jar
// Output: Environment variables override application.yml

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Simple @Value Annotation and Validation
// ═══════════════════════════════════════════════════════════════════════════

// @Value annotation (for simple cases)
@Component
public class SimpleConfig {

  @Value("\${app.name}")
  private String appName;

  @Value("\${app.version:1.0.0}")  // Default value
  private String version;

  @Value("\${app.features:feature1,feature2}")
  private List<String> features;

  public void printConfig() {
    System.out.println("App: " + appName + " v" + version);
    System.out.println("Features: " + features);
  }
}
// Output: App: MyApplication v1.0.0
// Output: Features: [feature1, feature2]

// Validation
@ConfigurationProperties(prefix = "database")
@Validated
public class DatabaseProperties {

  @NotNull
  @Pattern(regexp = "jdbc:.*")
  private String url;

  @NotBlank
  private String username;

  @NotBlank
  private String password;

  @Min(1)
  @Max(100)
  private int maxConnections = 10;

  // Getters and setters
}
// Invalid configuration throws exception at startup`
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
    <div style={{
      padding: '2rem',
      maxWidth: '95%',
      margin: '120px auto 0',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      border: '3px solid rgba(16, 185, 129, 0.4)'
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
              🚀 Spring Boot
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
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(16, 185, 129, 0.3)',
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
          Spring Boot is an opinionated framework built on top of the Spring Framework that simplifies application development
          with auto-configuration, embedded servers, starter dependencies, production-ready actuators, and convention-over-configuration approach.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedConcept ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {!selectedConcept ? (
          springBootFeatures.map((feature, idx) => (
            <div
              key={idx}
              onClick={() => handleConceptClick(feature)}
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.05)',
                padding: '2rem',
                borderRadius: '12px',
                border: '2px solid rgba(16, 185, 129, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.1)'
                e.currentTarget.style.borderColor = '#10b981'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(16, 185, 129, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: '#10b981',
                  margin: '0 0 0.5rem 0'
                }}>
                  {feature.name}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {feature.explanation.substring(0, 100)}...
                </p>
              </div>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: '600',
                color: '#10b981',
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
                Spring Boot Features
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {springBootFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleConceptClick(feature)}
                    style={{
                      backgroundColor: selectedConcept?.name === feature.name
                        ? 'rgba(16, 185, 129, 0.15)'
                        : 'rgba(16, 185, 129, 0.05)',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: selectedConcept?.name === feature.name
                        ? '3px solid #10b981'
                        : '2px solid rgba(16, 185, 129, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedConcept?.name !== feature.name) {
                        e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.1)'
                        e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedConcept?.name !== feature.name) {
                        e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.05)'
                        e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)'
                      }
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>🚀</span>
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: selectedConcept?.name === feature.name ? '#10b981' : '#1f2937'
                      }}>
                        {feature.name}
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
                color: '#10b981',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: '2rem' }}>🚀</span>
                {selectedConcept.name}
              </h3>

              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '2px solid rgba(16, 185, 129, 0.3)',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  fontSize: '1rem',
                  color: '#374151',
                  fontWeight: '500',
                  textAlign: 'left'
                }}>
                  {formatExplanation(selectedConcept.explanation)}
                </div>
              </div>

              <div>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#10b981',
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
                              border: '2px solid rgba(16, 185, 129, 0.3)',
                              overflow: 'hidden'
                            }}
                          >
                            <button
                              onClick={() => toggleSection(sectionKey)}
                              style={{
                                width: '100%',
                                padding: '1.25rem',
                                backgroundColor: isExpanded ? 'rgba(16, 185, 129, 0.15)' : 'white',
                                border: 'none',
                                borderBottom: isExpanded ? '2px solid rgba(16, 185, 129, 0.3)' : 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                transition: 'all 0.2s ease',
                                textAlign: 'left'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.15)'
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
                                color: '#10b981'
                              }}>
                                {section.title}
                              </span>
                              <span style={{
                                fontSize: '1.5rem',
                                color: '#10b981',
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

export default SpringBoot

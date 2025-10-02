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

function SpringBoot({ onBack }) {
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

  const springBootFeatures = [
    {
      name: 'Auto-Configuration',
      explanation: 'Spring Boot automatically configures application based on dependencies in classpath. Reduces boilerplate configuration dramatically. Conditional bean creation based on presence of classes. Opinionated defaults with override capability. @SpringBootApplication combines @Configuration, @EnableAutoConfiguration, @ComponentScan.',
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
      explanation: `Curated sets of dependencies for common use cases. Eliminates version management complexity and ensures compatible dependency versions.

Common Starters:
• spring-boot-starter-web: Tomcat, Spring MVC, Jackson, Validation
• spring-boot-starter-data-jpa: Hibernate, Spring Data JPA, JDBC
• spring-boot-starter-data-mongodb: MongoDB driver, Spring Data MongoDB
• spring-boot-starter-data-redis: Lettuce, Spring Data Redis
• spring-boot-starter-security: Spring Security core, OAuth2 support
• spring-boot-starter-test: JUnit 5, Mockito, AssertJ, Spring Test
• spring-boot-starter-actuator: Production metrics, health checks
• spring-boot-starter-validation: Hibernate Validator (JSR-303)
• spring-boot-starter-cache: Spring Cache abstraction
• spring-boot-starter-mail: JavaMail, Spring Mail support
• spring-boot-starter-thymeleaf: Thymeleaf template engine
• spring-boot-starter-webflux: Reactor Netty, Spring WebFlux (reactive)
• spring-boot-starter-batch: Spring Batch processing
• spring-boot-starter-integration: Spring Integration patterns
• spring-boot-starter-amqp: RabbitMQ, Spring AMQP
• spring-boot-starter-kafka: Kafka client, Spring Kafka`,
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
      explanation: `No need for separate application server deployment. Standalone executable JAR with java -jar command. Simplifies deployment and development. Easy containerization for Docker and Kubernetes.

Available Embedded Servers:
• Tomcat (default): Most common, full Servlet 5.0/6.0 support, widely used in production
• Jetty: Lightweight, async I/O, suitable for long-polling and WebSocket
• Undertow: High-performance, low memory footprint, non-blocking I/O
• Reactor Netty: For reactive WebFlux applications, fully non-blocking`,
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
      explanation: `Production-ready features for monitoring and management. JMX and HTTP exposure. Integration with Prometheus, Grafana. Custom endpoints and metrics support. Essential for microservices observability.

Common Actuator Endpoints:
• /actuator/health: Application health status, database connectivity, disk space
• /actuator/info: Application information, version, build details
• /actuator/metrics: JVM metrics, HTTP requests, database connections, custom metrics
• /actuator/env: Environment properties, configuration values
• /actuator/beans: All Spring beans in the application context
• /actuator/mappings: All @RequestMapping paths
• /actuator/configprops: All @ConfigurationProperties beans
• /actuator/loggers: View and modify logging levels at runtime
• /actuator/threaddump: Thread dump for troubleshooting
• /actuator/heapdump: Heap dump for memory analysis
• /actuator/prometheus: Prometheus-formatted metrics
• /actuator/caches: Cache statistics and management
• /actuator/conditions: Auto-configuration conditions report
• /actuator/scheduledtasks: Scheduled tasks information
• /actuator/sessions: HTTP session information (if Spring Session used)
• /actuator/shutdown: Gracefully shutdown the application (disabled by default)`,
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
      explanation: 'Automatic application restart on code changes. LiveReload integration for browser refresh. Property defaults for development. Caching disabled in development. Faster development feedback loop.',
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
      explanation: '@ConfigurationProperties for type-safe configuration. Externalized configuration via application.properties/yml. Profile-specific configurations. Environment variable overrides. Validation with JSR-303 annotations.',
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
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          ← Back to Menu
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          🚀 Spring Boot
        </h1>
        <div style={{ width: '120px' }}></div>
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
                <p style={{
                  fontSize: '1rem',
                  color: '#374151',
                  fontWeight: '500',
                  margin: 0,
                  lineHeight: '1.7',
                  textAlign: 'justify'
                }}>
                  {selectedConcept.explanation}
                </p>
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

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'

export default function SpringBootQuestions({ onBack, breadcrumb }) {
  const [expandedQuestionId, setExpandedQuestionId] = useState(null)
  const categoryColor = '#10b981'

  const questions = [
    {
      id: 1,
      category: 'Fundamentals',
      difficulty: 'Medium',
      question: 'What is Spring Boot Auto-Configuration and how does it work',
      answer: `**Spring Boot Auto-Configuration:**
Automatically configures Spring application based on dependencies present in the classpath. Eliminates need for extensive XML or Java configuration.

**How It Works:**

**1. @SpringBootApplication:**
\`\`\`java
@SpringBootApplication  // Combines three annotations
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// Equivalent to:
@SpringBootConfiguration  // @Configuration
@EnableAutoConfiguration
@ComponentScan
\`\`\`

**2. @EnableAutoConfiguration:**
Tells Spring Boot to automatically configure beans based on classpath
\`\`\`java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage
@Import(AutoConfigurationImportSelector.class)
public @interface EnableAutoConfiguration {
}
\`\`\`

**3. spring.factories:**
Located in META-INF/spring.factories
\`\`\`properties
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\\
org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,\\
org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration,\\
org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration
\`\`\`

**4. Conditional Annotations:**
\`\`\`java
@Configuration
@ConditionalOnClass(DataSource.class)
@ConditionalOnMissingBean(DataSource.class)
@EnableConfigurationProperties(DataSourceProperties.class)
public class DataSourceAutoConfiguration {

    @Bean
    @ConditionalOnProperty(name = "spring.datasource.url")
    public DataSource dataSource(DataSourceProperties properties) {
        return properties.initializeDataSourceBuilder().build();
    }
}
\`\`\`

**Common Conditional Annotations:**
| Annotation | Condition |
|------------|-----------|
| @ConditionalOnClass | Class exists in classpath |
| @ConditionalOnMissingClass | Class not in classpath |
| @ConditionalOnBean | Bean exists |
| @ConditionalOnMissingBean | Bean doesn't exist |
| @ConditionalOnProperty | Property has specific value |
| @ConditionalOnResource | Resource exists |
| @ConditionalOnWebApplication | Web application |

**Exclude Auto-Configuration:**
\`\`\`java
@SpringBootApplication(exclude = {
    DataSourceAutoConfiguration.class,
    HibernateJpaAutoConfiguration.class
})
public class Application {
}
\`\`\`

**Debug Auto-Configuration:**
\`\`\`properties
# application.properties
logging.level.org.springframework.boot.autoconfigure=DEBUG
# Or run with --debug flag
\`\`\`

**Custom Auto-Configuration:**
\`\`\`java
@Configuration
@ConditionalOnClass(MyService.class)
public class MyAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public MyService myService() {
        return new MyService();
    }
}

// META-INF/spring.factories
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\\
com.example.MyAutoConfiguration
\`\`\``
    },
    {
      id: 2,
      category: 'Configuration',
      difficulty: 'Medium',
      question: 'Explain Spring Boot application.properties vs application.yml and property binding',
      answer: `**Configuration Files:**

**1. application.properties:**
\`\`\`properties
# Server Configuration
server.port=8080
server.servlet.context-path=/api

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=secret
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
\`\`\`

**2. application.yml (Preferred):**
\`\`\`yaml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: secret
    driver-class-name: com.mysql.cj.jdbc.Driver

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
\`\`\`

**Property Binding:**

**1. @Value:**
\`\`\`java
@Component
public class AppConfig {
    @Value("\${server.port}")
    private int port;

    @Value("\${app.name:MyApp}")  // Default value
    private String appName;

    @Value("#{\${app.max.users}}")
    private int maxUsers;
}
\`\`\`

**2. @ConfigurationProperties (Recommended):**
\`\`\`java
@ConfigurationProperties(prefix = "app")
@Component
public class AppProperties {
    private String name;
    private Security security = new Security();
    private List<String> servers;

    public static class Security {
        private String username;
        private String password;
        private List<String> roles;

        // Getters and Setters
    }

    // Getters and Setters
}
\`\`\`

**YAML:**
\`\`\`yaml
app:
  name: MyApplication
  security:
    username: admin
    password: secret
    roles:
      - ADMIN
      - USER
  servers:
    - server1.example.com
    - server2.example.com
\`\`\`

**3. Using @ConfigurationProperties:**
\`\`\`java
@Service
public class MyService {
    private final AppProperties appProperties;

    public MyService(AppProperties appProperties) {
        this.appProperties = appProperties;
    }

    public void doSomething() {
        System.out.println(appProperties.getName());
        System.out.println(appProperties.getSecurity().getUsername());
    }
}
\`\`\`

**Profile-Specific Configuration:**
\`\`\`yaml
# application.yml (common)
app:
  name: MyApp

---
# application-dev.yml
spring:
  config:
    activate:
      on-profile: dev
  datasource:
    url: jdbc:mysql://localhost:3306/devdb

---
# application-prod.yml
spring:
  config:
    activate:
      on-profile: prod
  datasource:
    url: jdbc:mysql://prod-server:3306/proddb
\`\`\`

**Activate Profile:**
\`\`\`properties
# application.properties
spring.profiles.active=dev

# Or via command line
java -jar app.jar --spring.profiles.active=prod

# Or environment variable
export SPRING_PROFILES_ACTIVE=prod
\`\`\`

**Validation:**
\`\`\`java
@ConfigurationProperties(prefix = "app")
@Validated
@Component
public class AppProperties {

    @NotBlank
    private String name;

    @Min(1024)
    @Max(65535)
    private int port;

    @Email
    private String adminEmail;

    @Pattern(regexp = "^[A-Z]{2}$")
    private String countryCode;

    // Getters and Setters
}
\`\`\`

**External Configuration Priority:**
1. Command line arguments
2. SPRING_APPLICATION_JSON
3. ServletConfig init parameters
4. ServletContext init parameters
5. JNDI attributes
6. System properties
7. OS environment variables
8. Profile-specific properties (application-{profile}.properties)
9. Application properties (application.properties)
10. @PropertySource
11. Default properties`
    },
    {
      id: 3,
      category: 'Starters',
      difficulty: 'Easy',
      question: 'What are Spring Boot Starters and explain commonly used starters',
      answer: `**Spring Boot Starters:**
Dependency descriptors that provide all related dependencies for a specific functionality in one place. Simplify dependency management.

**Commonly Used Starters:**

**1. spring-boot-starter-web:**
For building web applications (REST APIs, MVC)
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
\`\`\`
Includes: Spring MVC, Tomcat (embedded), Jackson, Validation

**2. spring-boot-starter-data-jpa:**
For JPA-based data access
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
\`\`\`
Includes: Hibernate, Spring Data JPA, Spring ORM, Transaction API

**3. spring-boot-starter-security:**
For Spring Security
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
\`\`\`
Includes: Spring Security Core, Config, Web

**4. spring-boot-starter-test:**
For testing (already included in new projects)
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
\`\`\`
Includes: JUnit 5, Mockito, AssertJ, Hamcrest, Spring Test

**5. spring-boot-starter-actuator:**
Production-ready features (monitoring, metrics)
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
\`\`\`

**6. spring-boot-starter-cache:**
For caching support
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
\`\`\`

**7. spring-boot-starter-validation:**
For Bean Validation
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
\`\`\`
Includes: Hibernate Validator

**8. spring-boot-starter-amqp:**
For RabbitMQ messaging
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
\`\`\`

**9. spring-boot-starter-mail:**
For email support
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
\`\`\`

**10. spring-boot-starter-redis:**
For Redis data access
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
\`\`\`

**Database Starters:**
\`\`\`xml
<!-- H2 Database -->
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>

<!-- MySQL -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>

<!-- PostgreSQL -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
\`\`\`

**Custom Starter:**
\`\`\`xml
<!-- my-custom-spring-boot-starter -->
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-autoconfigure</artifactId>
    </dependency>
    <dependency>
        <groupId>com.example</groupId>
        <artifactId>my-library</artifactId>
    </dependency>
</dependencies>
\`\`\`

**Naming Convention:**
- Official starters: \`spring-boot-starter-*\`
- Third-party: \`thirdparty-spring-boot-starter\`
- Custom: \`myproject-spring-boot-starter\`

**Benefits:**
• One-stop dependency management
• Version compatibility managed by Spring Boot
• Reduces configuration
• Easy to swap implementations (e.g., Tomcat to Jetty)`
    },
    {
      id: 4,
      category: 'Actuator',
      difficulty: 'Medium',
      question: 'What is Spring Boot Actuator and what endpoints does it provide?',
      answer: `**Spring Boot Actuator:**
Production-ready features for monitoring and managing Spring Boot applications. Provides built-in endpoints for health checks, metrics, and application info.

**Enable Actuator:**
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
\`\`\`

**Key Endpoints:**

**1. /actuator/health:**
\`\`\`json
{
  "status": "UP",
  "components": {
    "db": { "status": "UP" },
    "diskSpace": { "status": "UP" },
    "redis": { "status": "UP" }
  }
}
\`\`\`

**2. /actuator/info:**
Application information
\`\`\`properties
# application.properties
info.app.name=My Application
info.app.version=1.0.0
info.app.description=Spring Boot Demo
\`\`\`

**3. /actuator/metrics:**
Application metrics (JVM, HTTP requests, etc.)
\`\`\`
/actuator/metrics/jvm.memory.used
/actuator/metrics/http.server.requests
/actuator/metrics/system.cpu.usage
\`\`\`

**4. /actuator/env:**
Environment properties and configuration

**5. /actuator/beans:**
All Spring beans in the application context

**6. /actuator/mappings:**
All @RequestMapping paths

**7. /actuator/loggers:**
View and modify logging levels at runtime
\`\`\`bash
# Change log level dynamically
curl -X POST http://localhost:8080/actuator/loggers/com.example \\
  -H "Content-Type: application/json" \\
  -d '{"configuredLevel": "DEBUG"}'
\`\`\`

**8. /actuator/threaddump:**
Thread dump for debugging

**9. /actuator/heapdump:**
JVM heap dump

**Configuration:**
\`\`\`properties
# Expose all endpoints
management.endpoints.web.exposure.include=*

# Expose specific endpoints
management.endpoints.web.exposure.include=health,info,metrics

# Hide sensitive endpoints
management.endpoints.web.exposure.exclude=env,beans

# Custom base path
management.endpoints.web.base-path=/manage

# Show detailed health info
management.endpoint.health.show-details=always

# Enable health probes for Kubernetes
management.endpoint.health.probes.enabled=true
\`\`\`

**Custom Health Indicator:**
\`\`\`java
@Component
public class DatabaseHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        if (isDatabaseHealthy()) {
            return Health.up()
                .withDetail("database", "PostgreSQL")
                .withDetail("version", "14.2")
                .build();
        }
        return Health.down()
            .withDetail("error", "Cannot connect to database")
            .build();
    }
}
\`\`\`

**Custom Metrics:**
\`\`\`java
@Service
public class OrderService {
    private final Counter orderCounter;
    private final Timer orderTimer;

    public OrderService(MeterRegistry registry) {
        this.orderCounter = registry.counter("orders.created");
        this.orderTimer = registry.timer("orders.processing.time");
    }

    public Order createOrder(OrderRequest request) {
        return orderTimer.record(() -> {
            Order order = processOrder(request);
            orderCounter.increment();
            return order;
        });
    }
}
\`\`\`

**Security:**
\`\`\`java
@Configuration
public class ActuatorSecurityConfig {

    @Bean
    public SecurityFilterChain actuatorSecurity(HttpSecurity http) throws Exception {
        return http
            .securityMatcher("/actuator/**")
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/health").permitAll()
                .requestMatchers("/actuator/**").hasRole("ADMIN")
            )
            .httpBasic(Customizer.withDefaults())
            .build();
    }
}
\`\`\``
    },
    {
      id: 5,
      category: 'Testing',
      difficulty: 'Medium',
      question: 'How do you test Spring Boot applications? Explain different testing approaches',
      answer: `**Testing Dependencies:**
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
\`\`\`
Includes: JUnit 5, Mockito, AssertJ, Spring Test

**1. Unit Tests (No Spring Context):**
\`\`\`java
@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private OrderService orderService;

    @Test
    void shouldCreateOrder() {
        // Given
        OrderRequest request = new OrderRequest("item1", 2);
        Order expected = new Order(1L, "item1", 2);
        when(orderRepository.save(any())).thenReturn(expected);

        // When
        Order result = orderService.createOrder(request);

        // Then
        assertThat(result.getId()).isEqualTo(1L);
        verify(orderRepository).save(any());
    }
}
\`\`\`

**2. Integration Test (@SpringBootTest):**
\`\`\`java
@SpringBootTest
@AutoConfigureTestDatabase
class OrderServiceIntegrationTest {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;

    @Test
    void shouldPersistOrder() {
        // Given
        OrderRequest request = new OrderRequest("item1", 2);

        // When
        Order result = orderService.createOrder(request);

        // Then
        Order saved = orderRepository.findById(result.getId()).orElseThrow();
        assertThat(saved.getItemName()).isEqualTo("item1");
    }
}
\`\`\`

**3. Web Layer Test (@WebMvcTest):**
\`\`\`java
@WebMvcTest(OrderController.class)
class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OrderService orderService;

    @Test
    void shouldReturnOrder() throws Exception {
        // Given
        Order order = new Order(1L, "item1", 2);
        when(orderService.getOrder(1L)).thenReturn(order);

        // When/Then
        mockMvc.perform(get("/api/orders/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.itemName").value("item1"));
    }

    @Test
    void shouldCreateOrder() throws Exception {
        // Given
        Order order = new Order(1L, "item1", 2);
        when(orderService.createOrder(any())).thenReturn(order);

        // When/Then
        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\\"itemName\\":\\"item1\\",\\"quantity\\":2}"))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.id").value(1));
    }
}
\`\`\`

**4. Data Layer Test (@DataJpaTest):**
\`\`\`java
@DataJpaTest
class OrderRepositoryTest {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    void shouldFindByStatus() {
        // Given
        Order order = new Order("item1", 2, OrderStatus.PENDING);
        entityManager.persist(order);
        entityManager.flush();

        // When
        List<Order> result = orderRepository.findByStatus(OrderStatus.PENDING);

        // Then
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getItemName()).isEqualTo("item1");
    }
}
\`\`\`

**5. TestContainers (Real Database):**
\`\`\`java
@SpringBootTest
@Testcontainers
class OrderServiceContainerTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:14")
        .withDatabaseName("testdb")
        .withUsername("test")
        .withPassword("test");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private OrderService orderService;

    @Test
    void shouldWorkWithRealDatabase() {
        Order result = orderService.createOrder(new OrderRequest("item1", 2));
        assertThat(result.getId()).isNotNull();
    }
}
\`\`\`

**6. Security Tests:**
\`\`\`java
@WebMvcTest(OrderController.class)
class OrderControllerSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser(roles = "USER")
    void userCanViewOrders() throws Exception {
        mockMvc.perform(get("/api/orders"))
            .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void adminCanDeleteOrders() throws Exception {
        mockMvc.perform(delete("/api/orders/1"))
            .andExpect(status().isOk());
    }

    @Test
    void unauthenticatedUserForbidden() throws Exception {
        mockMvc.perform(get("/api/orders"))
            .andExpect(status().isUnauthorized());
    }
}
\`\`\`

**Test Slices Summary:**
| Annotation | Loads | Use Case |
|------------|-------|----------|
| @SpringBootTest | Full context | Integration tests |
| @WebMvcTest | Web layer only | Controller tests |
| @DataJpaTest | JPA layer only | Repository tests |
| @JsonTest | JSON serialization | JSON tests |
| @RestClientTest | REST client | External API tests |`
    },
    {
      id: 6,
      category: 'Exception Handling',
      difficulty: 'Medium',
      question: 'How do you handle exceptions globally in Spring Boot?',
      answer: `**Global Exception Handling with @ControllerAdvice:**

**1. Custom Exception:**
\`\`\`java
public class ResourceNotFoundException extends RuntimeException {
    private String resourceName;
    private String fieldName;
    private Object fieldValue;

    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s not found with %s: '%s'", resourceName, fieldName, fieldValue));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }
}
\`\`\`

**2. Error Response DTO:**
\`\`\`java
@Data
@Builder
public class ErrorResponse {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
    private List<FieldError> fieldErrors;

    @Data
    @AllArgsConstructor
    public static class FieldError {
        private String field;
        private String message;
    }
}
\`\`\`

**3. Global Exception Handler:**
\`\`\`java
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFound(ResourceNotFoundException ex, WebRequest request) {
        log.error("Resource not found: {}", ex.getMessage());
        return ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.NOT_FOUND.value())
            .error("Not Found")
            .message(ex.getMessage())
            .path(((ServletWebRequest) request).getRequest().getRequestURI())
            .build();
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleValidation(MethodArgumentNotValidException ex, WebRequest request) {
        List<ErrorResponse.FieldError> fieldErrors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error -> new ErrorResponse.FieldError(
                error.getField(),
                error.getDefaultMessage()))
            .collect(Collectors.toList());

        return ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.BAD_REQUEST.value())
            .error("Validation Failed")
            .message("Invalid request parameters")
            .path(((ServletWebRequest) request).getRequest().getRequestURI())
            .fieldErrors(fieldErrors)
            .build();
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponse handleDataIntegrity(DataIntegrityViolationException ex, WebRequest request) {
        return ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.CONFLICT.value())
            .error("Data Integrity Violation")
            .message("Database constraint violation")
            .path(((ServletWebRequest) request).getRequest().getRequestURI())
            .build();
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleGeneral(Exception ex, WebRequest request) {
        log.error("Unexpected error", ex);
        return ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
            .error("Internal Server Error")
            .message("An unexpected error occurred")
            .path(((ServletWebRequest) request).getRequest().getRequestURI())
            .build();
    }
}
\`\`\`

**4. Using @ResponseStatus on Exception:**
\`\`\`java
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidOrderException extends RuntimeException {
    public InvalidOrderException(String message) {
        super(message);
    }
}
\`\`\`

**5. Problem Details (RFC 7807) - Spring 6+:**
\`\`\`java
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleNotFound(ResourceNotFoundException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
            HttpStatus.NOT_FOUND, ex.getMessage());
        problemDetail.setTitle("Resource Not Found");
        problemDetail.setProperty("resourceName", ex.getResourceName());
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }
}
\`\`\`

**Response:**
\`\`\`json
{
  "type": "about:blank",
  "title": "Resource Not Found",
  "status": 404,
  "detail": "Order not found with id: '123'",
  "instance": "/api/orders/123",
  "resourceName": "Order",
  "timestamp": "2024-01-15T10:30:00Z"
}
\`\`\`

**Best Practices:**
• Use specific exception types for different error scenarios
• Log exceptions at appropriate levels
• Don't expose sensitive information in error messages
• Use consistent error response format across API
• Include correlation IDs for tracing
• Return appropriate HTTP status codes`
    },
    {
      id: 7,
      category: 'Security',
      difficulty: 'Hard',
      question: 'How do you implement JWT authentication in Spring Boot?',
      answer: `**JWT Authentication Implementation:**

**1. Dependencies:**
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
\`\`\`

**2. JWT Service:**
\`\`\`java
@Service
public class JwtService {

    @Value("\${jwt.secret}")
    private String secretKey;

    @Value("\${jwt.expiration}")
    private long jwtExpiration;

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder()
            .setClaims(extraClaims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(getSignInKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }
}
\`\`\`

**3. JWT Authentication Filter:**
\`\`\`java
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7);
        final String username = jwtService.extractUsername(jwt);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource()
                    .buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
\`\`\`

**4. Security Configuration:**
\`\`\`java
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}
\`\`\`

**5. Authentication Controller:**
\`\`\`java
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(), request.getPassword()));

        User user = userService.findByEmail(request.getEmail());
        String token = jwtService.generateToken(user);

        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        User user = userService.register(request);
        String token = jwtService.generateToken(user);

        return ResponseEntity.ok(new AuthResponse(token));
    }
}
\`\`\`

**6. Configuration:**
\`\`\`properties
jwt.secret=your-256-bit-secret-key-here-must-be-long-enough
jwt.expiration=86400000
\`\`\`

**Usage:**
\`\`\`bash
# Login
curl -X POST http://localhost:8080/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"user@example.com","password":"password"}'

# Response: {"token":"eyJhbGciOiJIUzI1NiJ9..."}

# Access protected resource
curl http://localhost:8080/api/orders \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..."
\`\`\``
    },
    {
      id: 8,
      category: 'Caching',
      difficulty: 'Medium',
      question: 'How do you implement caching in Spring Boot?',
      answer: `**Spring Boot Caching:**

**1. Enable Caching:**
\`\`\`java
@SpringBootApplication
@EnableCaching
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
\`\`\`

**2. Basic Cache Annotations:**

**@Cacheable - Cache method result:**
\`\`\`java
@Service
public class ProductService {

    @Cacheable(value = "products", key = "#id")
    public Product getProductById(Long id) {
        // This will only be called if not in cache
        log.info("Fetching product from database: {}", id);
        return productRepository.findById(id).orElseThrow();
    }

    @Cacheable(value = "products", key = "#name", condition = "#name.length() > 3")
    public List<Product> findByName(String name) {
        return productRepository.findByNameContaining(name);
    }

    @Cacheable(value = "products", key = "#root.methodName")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
\`\`\`

**@CachePut - Update cache:**
\`\`\`java
@CachePut(value = "products", key = "#product.id")
public Product updateProduct(Product product) {
    // Always executes and updates cache
    return productRepository.save(product);
}
\`\`\`

**@CacheEvict - Remove from cache:**
\`\`\`java
@CacheEvict(value = "products", key = "#id")
public void deleteProduct(Long id) {
    productRepository.deleteById(id);
}

@CacheEvict(value = "products", allEntries = true)
public void clearAllProductCache() {
    // Clears entire cache
}

@CacheEvict(value = {"products", "categories"}, allEntries = true)
public void clearAllCaches() {
    // Clears multiple caches
}
\`\`\`

**@Caching - Multiple cache operations:**
\`\`\`java
@Caching(
    cacheable = @Cacheable(value = "products", key = "#id"),
    put = @CachePut(value = "products", key = "#result.name")
)
public Product getAndCacheByMultipleKeys(Long id) {
    return productRepository.findById(id).orElseThrow();
}
\`\`\`

**3. Redis Cache Configuration:**
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
\`\`\`

\`\`\`properties
spring.redis.host=localhost
spring.redis.port=6379
spring.cache.type=redis
spring.cache.redis.time-to-live=3600000
\`\`\`

\`\`\`java
@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public RedisCacheConfiguration cacheConfiguration() {
        return RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(60))
            .disableCachingNullValues()
            .serializeKeysWith(RedisSerializationContext.SerializationPair
                .fromSerializer(new StringRedisSerializer()))
            .serializeValuesWith(RedisSerializationContext.SerializationPair
                .fromSerializer(new GenericJackson2JsonRedisSerializer()));
    }

    @Bean
    public RedisCacheManager cacheManager(RedisConnectionFactory connectionFactory) {
        Map<String, RedisCacheConfiguration> cacheConfigurations = new HashMap<>();

        // Different TTL for different caches
        cacheConfigurations.put("products",
            RedisCacheConfiguration.defaultCacheConfig().entryTtl(Duration.ofHours(1)));
        cacheConfigurations.put("users",
            RedisCacheConfiguration.defaultCacheConfig().entryTtl(Duration.ofMinutes(30)));

        return RedisCacheManager.builder(connectionFactory)
            .cacheDefaults(cacheConfiguration())
            .withInitialCacheConfigurations(cacheConfigurations)
            .build();
    }
}
\`\`\`

**4. Caffeine Cache (In-Memory):**
\`\`\`xml
<dependency>
    <groupId>com.github.ben-manes.caffeine</groupId>
    <artifactId>caffeine</artifactId>
</dependency>
\`\`\`

\`\`\`java
@Configuration
@EnableCaching
public class CaffeineCacheConfig {

    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager();
        cacheManager.setCaffeine(Caffeine.newBuilder()
            .initialCapacity(100)
            .maximumSize(500)
            .expireAfterWrite(Duration.ofMinutes(10))
            .recordStats());
        return cacheManager;
    }
}
\`\`\`

**5. SpEL Key Expressions:**
\`\`\`java
// Method argument
@Cacheable(value = "users", key = "#userId")

// Object property
@Cacheable(value = "users", key = "#user.email")

// Multiple arguments
@Cacheable(value = "users", key = "#firstName + '_' + #lastName")

// Root object
@Cacheable(value = "users", key = "#root.methodName + #root.args[0]")

// Conditional caching
@Cacheable(value = "users", condition = "#result != null", unless = "#result.age < 18")
\`\`\`

**Best Practices:**
• Use cache for read-heavy, rarely changing data
• Set appropriate TTL to prevent stale data
• Use cache eviction on updates/deletes
• Monitor cache hit/miss ratios
• Consider cache warming for critical data
• Use distributed cache (Redis) for multi-instance deployments`
    },
    {
      id: 9,
      category: 'Scheduling',
      difficulty: 'Easy',
      question: 'How do you schedule tasks in Spring Boot?',
      answer: `**Task Scheduling in Spring Boot:**

**1. Enable Scheduling:**
\`\`\`java
@SpringBootApplication
@EnableScheduling
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
\`\`\`

**2. @Scheduled Annotation:**

**Fixed Rate:**
\`\`\`java
@Component
@Slf4j
public class ScheduledTasks {

    // Runs every 5 seconds (from start of previous execution)
    @Scheduled(fixedRate = 5000)
    public void reportCurrentTime() {
        log.info("Fixed rate task - {}", LocalDateTime.now());
    }

    // With initial delay
    @Scheduled(fixedRate = 5000, initialDelay = 10000)
    public void taskWithInitialDelay() {
        log.info("Task with initial delay");
    }
}
\`\`\`

**Fixed Delay:**
\`\`\`java
// Runs 5 seconds after previous execution completes
@Scheduled(fixedDelay = 5000)
public void taskWithFixedDelay() {
    log.info("Fixed delay task - {}", LocalDateTime.now());
    // If this takes 3 seconds, next run is 8 seconds from start
}
\`\`\`

**Cron Expression:**
\`\`\`java
// Every day at 2:00 AM
@Scheduled(cron = "0 0 2 * * ?")
public void dailyCleanup() {
    log.info("Daily cleanup task");
}

// Every Monday at 9:00 AM
@Scheduled(cron = "0 0 9 * * MON")
public void weeklyReport() {
    log.info("Weekly report generation");
}

// Every 15 minutes
@Scheduled(cron = "0 */15 * * * ?")
public void every15Minutes() {
    log.info("Task running every 15 minutes");
}

// Last day of every month at midnight
@Scheduled(cron = "0 0 0 L * ?")
public void monthlyTask() {
    log.info("Monthly task");
}
\`\`\`

**Cron Format:**
\`\`\`
┌───────────── second (0-59)
│ ┌───────────── minute (0-59)
│ │ ┌───────────── hour (0-23)
│ │ │ ┌───────────── day of month (1-31)
│ │ │ │ ┌───────────── month (1-12 or JAN-DEC)
│ │ │ │ │ ┌───────────── day of week (0-7 or SUN-SAT)
│ │ │ │ │ │
* * * * * *
\`\`\`

**3. Externalized Configuration:**
\`\`\`java
@Scheduled(fixedRateString = "\${task.rate:5000}")
public void configurableTask() {
    log.info("Configurable rate task");
}

@Scheduled(cron = "\${task.cron:0 0 2 * * ?}")
public void configurableCronTask() {
    log.info("Configurable cron task");
}
\`\`\`

\`\`\`properties
task.rate=10000
task.cron=0 0 3 * * ?
\`\`\`

**4. Async Scheduled Tasks:**
\`\`\`java
@Configuration
@EnableAsync
@EnableScheduling
public class SchedulingConfig implements SchedulingConfigurer {

    @Override
    public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
        taskRegistrar.setScheduler(taskExecutor());
    }

    @Bean
    public Executor taskExecutor() {
        return Executors.newScheduledThreadPool(10);
    }
}

@Component
public class AsyncScheduledTasks {

    @Async
    @Scheduled(fixedRate = 5000)
    public void asyncTask() {
        // Runs in separate thread
        log.info("Async task - Thread: {}", Thread.currentThread().getName());
    }
}
\`\`\`

**5. Conditional Scheduling:**
\`\`\`java
@Component
@ConditionalOnProperty(name = "scheduler.enabled", havingValue = "true")
public class ConditionalScheduledTasks {

    @Scheduled(fixedRate = 5000)
    public void conditionalTask() {
        log.info("This only runs if scheduler.enabled=true");
    }
}
\`\`\`

**6. Dynamic Scheduling:**
\`\`\`java
@Component
public class DynamicScheduler {

    private final TaskScheduler taskScheduler;
    private ScheduledFuture<?> scheduledFuture;

    public DynamicScheduler(TaskScheduler taskScheduler) {
        this.taskScheduler = taskScheduler;
    }

    public void scheduleTask(Runnable task, String cronExpression) {
        if (scheduledFuture != null) {
            scheduledFuture.cancel(false);
        }
        scheduledFuture = taskScheduler.schedule(task, new CronTrigger(cronExpression));
    }

    public void cancelTask() {
        if (scheduledFuture != null) {
            scheduledFuture.cancel(false);
        }
    }
}
\`\`\`

**Best Practices:**
• Use fixedDelay for dependent tasks
• Use fixedRate for independent periodic tasks
• Use cron for time-based scheduling
• Externalize schedules for flexibility
• Use thread pool for multiple scheduled tasks
• Handle exceptions in scheduled methods
• Consider distributed locking (ShedLock) for clustered environments`
    },
    {
      id: 10,
      category: 'Database',
      difficulty: 'Medium',
      question: 'How do you handle database migrations in Spring Boot?',
      answer: `**Database Migrations with Flyway:**

**1. Add Dependency:**
\`\`\`xml
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
</dependency>
\`\`\`

**2. Configuration:**
\`\`\`properties
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration
spring.flyway.baseline-on-migrate=true
spring.flyway.validate-on-migrate=true
\`\`\`

**3. Migration Files:**
\`\`\`
src/main/resources/db/migration/
├── V1__Create_users_table.sql
├── V2__Create_orders_table.sql
├── V3__Add_email_to_users.sql
└── V4__Create_index_on_orders.sql
\`\`\`

**Naming Convention:** V{version}__{description}.sql

**Example Migrations:**

**V1__Create_users_table.sql:**
\`\`\`sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

**V2__Create_orders_table.sql:**
\`\`\`sql
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
\`\`\`

**V3__Add_email_to_users.sql:**
\`\`\`sql
ALTER TABLE users ADD COLUMN email VARCHAR(100);
UPDATE users SET email = CONCAT(username, '@example.com') WHERE email IS NULL;
ALTER TABLE users ALTER COLUMN email SET NOT NULL;
ALTER TABLE users ADD CONSTRAINT uk_users_email UNIQUE (email);
\`\`\`

**4. Repeatable Migrations:**
\`\`\`
R__Create_views.sql  (Runs on every checksum change)
\`\`\`

**5. Undo Migrations (Flyway Teams):**
\`\`\`
U1__Undo_create_users.sql
\`\`\`

**6. Java-based Migrations:**
\`\`\`java
@Component
public class V5__Migrate_legacy_data extends BaseJavaMigration {

    @Override
    public void migrate(Context context) throws Exception {
        try (Statement stmt = context.getConnection().createStatement()) {
            // Complex data migration logic
            stmt.execute("UPDATE users SET status = 'ACTIVE' WHERE status IS NULL");
        }
    }
}
\`\`\`

**Database Migrations with Liquibase:**

**1. Add Dependency:**
\`\`\`xml
<dependency>
    <groupId>org.liquibase</groupId>
    <artifactId>liquibase-core</artifactId>
</dependency>
\`\`\`

**2. Configuration:**
\`\`\`properties
spring.liquibase.change-log=classpath:db/changelog/db.changelog-master.xml
spring.liquibase.enabled=true
\`\`\`

**3. Master Changelog:**
\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
                   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
                   http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-4.4.xsd">

    <include file="db/changelog/changes/001-create-users.xml"/>
    <include file="db/changelog/changes/002-create-orders.xml"/>
</databaseChangeLog>
\`\`\`

**4. Changeset Example:**
\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
                   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
                   http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-4.4.xsd">

    <changeSet id="1" author="developer">
        <createTable tableName="users">
            <column name="id" type="BIGINT" autoIncrement="true">
                <constraints primaryKey="true" nullable="false"/>
            </column>
            <column name="username" type="VARCHAR(50)">
                <constraints unique="true" nullable="false"/>
            </column>
            <column name="email" type="VARCHAR(100)">
                <constraints unique="true" nullable="false"/>
            </column>
            <column name="created_at" type="TIMESTAMP" defaultValueComputed="CURRENT_TIMESTAMP"/>
        </createTable>
    </changeSet>

    <changeSet id="2" author="developer">
        <addColumn tableName="users">
            <column name="phone" type="VARCHAR(20)"/>
        </addColumn>
    </changeSet>

    <changeSet id="3" author="developer">
        <createIndex tableName="users" indexName="idx_users_email">
            <column name="email"/>
        </createIndex>
    </changeSet>
</databaseChangeLog>
\`\`\`

**Flyway vs Liquibase:**
| Feature | Flyway | Liquibase |
|---------|--------|-----------|
| Format | SQL files | XML/YAML/JSON/SQL |
| Rollback | Teams edition | Free |
| Complexity | Simpler | More features |
| Learning curve | Easy | Moderate |

**Best Practices:**
• Never modify applied migrations
• Use version control for migrations
• Test migrations in staging first
• Include both schema and data migrations
• Use meaningful descriptions
• Keep migrations small and focused
• Always backup before migrating production`
    },
    {
      id: 11,
      category: 'Async',
      difficulty: 'Medium',
      question: 'How do you implement asynchronous processing in Spring Boot?',
      answer: `**Asynchronous Processing in Spring Boot:**

**1. Enable Async:**
\`\`\`java
@SpringBootApplication
@EnableAsync
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
\`\`\`

**2. Basic @Async Usage:**
\`\`\`java
@Service
@Slf4j
public class EmailService {

    @Async
    public void sendEmailAsync(String to, String subject, String body) {
        // Runs in separate thread
        log.info("Sending email in thread: {}", Thread.currentThread().getName());
        // Simulate slow email sending
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        log.info("Email sent to: {}", to);
    }
}
\`\`\`

**3. Async with Return Value:**
\`\`\`java
@Service
public class ReportService {

    @Async
    public CompletableFuture<Report> generateReportAsync(String reportType) {
        log.info("Generating {} report...", reportType);
        Report report = generateReport(reportType);
        return CompletableFuture.completedFuture(report);
    }

    @Async
    public Future<String> processDataAsync(String data) {
        String result = processData(data);
        return new AsyncResult<>(result);
    }
}
\`\`\`

**4. Waiting for Async Results:**
\`\`\`java
@RestController
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/reports")
    public ResponseEntity<List<Report>> getReports() throws Exception {
        // Start multiple async tasks
        CompletableFuture<Report> salesReport = reportService.generateReportAsync("SALES");
        CompletableFuture<Report> inventoryReport = reportService.generateReportAsync("INVENTORY");
        CompletableFuture<Report> financialReport = reportService.generateReportAsync("FINANCIAL");

        // Wait for all to complete
        CompletableFuture.allOf(salesReport, inventoryReport, financialReport).join();

        // Collect results
        List<Report> reports = Arrays.asList(
            salesReport.get(),
            inventoryReport.get(),
            financialReport.get()
        );

        return ResponseEntity.ok(reports);
    }
}
\`\`\`

**5. Custom Thread Pool:**
\`\`\`java
@Configuration
@EnableAsync
public class AsyncConfig implements AsyncConfigurer {

    @Override
    @Bean(name = "taskExecutor")
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(25);
        executor.setThreadNamePrefix("Async-");
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.initialize();
        return executor;
    }

    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return new CustomAsyncExceptionHandler();
    }
}

public class CustomAsyncExceptionHandler implements AsyncUncaughtExceptionHandler {

    @Override
    public void handleUncaughtException(Throwable ex, Method method, Object... params) {
        log.error("Async method {} threw exception: {}", method.getName(), ex.getMessage());
    }
}
\`\`\`

**6. Multiple Executors:**
\`\`\`java
@Configuration
@EnableAsync
public class AsyncConfig {

    @Bean(name = "emailExecutor")
    public Executor emailExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(2);
        executor.setMaxPoolSize(5);
        executor.setThreadNamePrefix("Email-");
        executor.initialize();
        return executor;
    }

    @Bean(name = "reportExecutor")
    public Executor reportExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(20);
        executor.setThreadNamePrefix("Report-");
        executor.initialize();
        return executor;
    }
}

@Service
public class NotificationService {

    @Async("emailExecutor")
    public void sendEmail(String to) {
        // Uses email thread pool
    }

    @Async("reportExecutor")
    public CompletableFuture<Report> generateReport() {
        // Uses report thread pool
    }
}
\`\`\`

**7. Exception Handling:**
\`\`\`java
@Async
public CompletableFuture<String> asyncMethodWithException() {
    return CompletableFuture.supplyAsync(() -> {
        if (someCondition) {
            throw new RuntimeException("Something went wrong");
        }
        return "Success";
    }).exceptionally(ex -> {
        log.error("Async error: {}", ex.getMessage());
        return "Default value on error";
    });
}

// Caller
reportService.asyncMethodWithException()
    .thenAccept(result -> log.info("Result: {}", result))
    .exceptionally(ex -> {
        log.error("Error: {}", ex.getMessage());
        return null;
    });
\`\`\`

**8. CompletableFuture Chaining:**
\`\`\`java
@Async
public CompletableFuture<Order> processOrder(OrderRequest request) {
    return CompletableFuture.supplyAsync(() -> createOrder(request))
        .thenApply(order -> validateOrder(order))
        .thenApply(order -> calculateTotal(order))
        .thenApply(order -> saveOrder(order))
        .thenCompose(order -> notifyCustomer(order));
}
\`\`\`

**Important Notes:**
• @Async only works on public methods
• Self-invocation doesn't work (must call from another bean)
• Use CompletableFuture for return values
• Configure proper thread pool sizes
• Handle exceptions properly
• Consider using @Transactional carefully with @Async`
    },
    {
      id: 12,
      category: 'Validation',
      difficulty: 'Easy',
      question: 'How do you validate request data in Spring Boot?',
      answer: `**Request Validation in Spring Boot:**

**1. Add Dependency:**
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
\`\`\`

**2. DTO with Validation Annotations:**
\`\`\`java
@Data
public class UserRequest {

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be 3-50 characters")
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$",
             message = "Password must contain digit, lowercase and uppercase")
    private String password;

    @NotNull(message = "Age is required")
    @Min(value = 18, message = "Must be at least 18 years old")
    @Max(value = 120, message = "Age cannot exceed 120")
    private Integer age;

    @Past(message = "Birth date must be in the past")
    private LocalDate birthDate;

    @Future(message = "Expiry date must be in the future")
    private LocalDate expiryDate;

    @Positive(message = "Amount must be positive")
    private BigDecimal amount;

    @NotEmpty(message = "At least one role is required")
    private List<@NotBlank String> roles;
}
\`\`\`

**3. Controller with @Valid:**
\`\`\`java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody UserRequest request) {
        // Request is validated before reaching here
        User user = userService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable @Positive Long id,
            @Valid @RequestBody UserRequest request) {
        User user = userService.update(id, request);
        return ResponseEntity.ok(user);
    }

    @GetMapping
    public ResponseEntity<List<User>> getUsers(
            @RequestParam @Min(0) int page,
            @RequestParam @Min(1) @Max(100) int size) {
        return ResponseEntity.ok(userService.findAll(page, size));
    }
}
\`\`\`

**4. Common Validation Annotations:**
\`\`\`java
// String validations
@NotNull      // Not null (can be empty string)
@NotEmpty     // Not null and not empty
@NotBlank     // Not null, not empty, not just whitespace
@Size(min=, max=)
@Pattern(regexp=)
@Email

// Number validations
@Min(value)
@Max(value)
@Positive
@PositiveOrZero
@Negative
@NegativeOrZero
@Digits(integer=, fraction=)
@DecimalMin(value)
@DecimalMax(value)

// Date validations
@Past
@PastOrPresent
@Future
@FutureOrPresent

// Collection validations
@NotEmpty
@Size(min=, max=)

// Boolean
@AssertTrue
@AssertFalse
\`\`\`

**5. Custom Validator:**
\`\`\`java
// Annotation
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PhoneNumberValidator.class)
public @interface ValidPhoneNumber {
    String message() default "Invalid phone number";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

// Validator
public class PhoneNumberValidator implements ConstraintValidator<ValidPhoneNumber, String> {

    private static final Pattern PHONE_PATTERN =
        Pattern.compile("^\\\\+?[1-9]\\\\d{1,14}$");

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return true; // Use @NotNull for null check
        }
        return PHONE_PATTERN.matcher(value).matches();
    }
}

// Usage
@ValidPhoneNumber
private String phoneNumber;
\`\`\`

**6. Cross-Field Validation:**
\`\`\`java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordMatchValidator.class)
public @interface PasswordMatch {
    String message() default "Passwords do not match";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

public class PasswordMatchValidator implements ConstraintValidator<PasswordMatch, Object> {

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext context) {
        if (obj instanceof RegistrationRequest request) {
            return request.getPassword().equals(request.getConfirmPassword());
        }
        return true;
    }
}

@Data
@PasswordMatch
public class RegistrationRequest {
    private String password;
    private String confirmPassword;
}
\`\`\`

**7. Validation Groups:**
\`\`\`java
public interface OnCreate {}
public interface OnUpdate {}

@Data
public class UserRequest {

    @Null(groups = OnCreate.class)
    @NotNull(groups = OnUpdate.class)
    private Long id;

    @NotBlank(groups = {OnCreate.class, OnUpdate.class})
    private String username;
}

@PostMapping
public ResponseEntity<User> create(
        @Validated(OnCreate.class) @RequestBody UserRequest request) {
    // ...
}

@PutMapping("/{id}")
public ResponseEntity<User> update(
        @Validated(OnUpdate.class) @RequestBody UserRequest request) {
    // ...
}
\`\`\`

**8. Handle Validation Errors:**
\`\`\`java
@RestControllerAdvice
public class ValidationExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage()));

        return Map.of(
            "status", 400,
            "message", "Validation failed",
            "errors", errors
        );
    }
}
\`\`\`

**Response:**
\`\`\`json
{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "email": "Invalid email format",
    "password": "Password must be at least 8 characters"
  }
}
\`\`\``
    },
    {
      id: 13,
      category: 'Profiles',
      difficulty: 'Medium',
      question: 'How do you use Spring Profiles for environment-specific configuration?',
      answer: `**Spring Profiles:**
Allow different configurations for different environments (dev, staging, prod).

**1. Profile-Specific Property Files:**
\`\`\`
src/main/resources/
├── application.yml              # Common config
├── application-dev.yml          # Development
├── application-staging.yml      # Staging
└── application-prod.yml         # Production
\`\`\`

**application.yml (common):**
\`\`\`yaml
spring:
  application:
    name: my-application

server:
  port: 8080

logging:
  level:
    root: INFO
\`\`\`

**application-dev.yml:**
\`\`\`yaml
spring:
  datasource:
    url: jdbc:h2:mem:devdb
    username: sa
    password:
  jpa:
    show-sql: true
    hibernate:
      ddl-auto: create-drop

logging:
  level:
    com.example: DEBUG
    org.hibernate.SQL: DEBUG
\`\`\`

**application-prod.yml:**
\`\`\`yaml
spring:
  datasource:
    url: jdbc:postgresql://prod-db:5432/proddb
    username: \${DB_USERNAME}
    password: \${DB_PASSWORD}
  jpa:
    show-sql: false
    hibernate:
      ddl-auto: validate

logging:
  level:
    root: WARN
    com.example: INFO
\`\`\`

**2. Activating Profiles:**

**Via application.yml:**
\`\`\`yaml
spring:
  profiles:
    active: dev
\`\`\`

**Via Command Line:**
\`\`\`bash
java -jar app.jar --spring.profiles.active=prod

# Multiple profiles
java -jar app.jar --spring.profiles.active=prod,metrics
\`\`\`

**Via Environment Variable:**
\`\`\`bash
export SPRING_PROFILES_ACTIVE=prod
java -jar app.jar
\`\`\`

**Via JVM Property:**
\`\`\`bash
java -Dspring.profiles.active=prod -jar app.jar
\`\`\`

**3. Profile-Specific Beans:**
\`\`\`java
@Configuration
public class DataSourceConfig {

    @Bean
    @Profile("dev")
    public DataSource devDataSource() {
        return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.H2)
            .build();
    }

    @Bean
    @Profile("prod")
    public DataSource prodDataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl("jdbc:postgresql://prod-db:5432/proddb");
        return dataSource;
    }

    @Bean
    @Profile("!prod") // Not production
    public DataSource nonProdDataSource() {
        // Used for all non-prod environments
    }
}
\`\`\`

**4. Profile-Specific Components:**
\`\`\`java
@Service
@Profile("dev")
public class MockPaymentService implements PaymentService {
    @Override
    public PaymentResult process(Payment payment) {
        return PaymentResult.success("MOCK-" + UUID.randomUUID());
    }
}

@Service
@Profile("prod")
public class StripePaymentService implements PaymentService {
    @Override
    public PaymentResult process(Payment payment) {
        // Real Stripe integration
    }
}
\`\`\`

**5. Profile Groups (Spring Boot 2.4+):**
\`\`\`yaml
# application.yml
spring:
  profiles:
    group:
      production:
        - prod
        - metrics
        - logging
      development:
        - dev
        - swagger
        - debug
\`\`\`

**Activate group:**
\`\`\`bash
java -jar app.jar --spring.profiles.active=production
# Activates: prod, metrics, logging
\`\`\`

**6. Conditional Configuration:**
\`\`\`java
@Configuration
public class FeatureConfig {

    @Bean
    @ConditionalOnProperty(name = "feature.cache.enabled", havingValue = "true")
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager();
    }

    @Bean
    @ConditionalOnExpression("\${feature.async.enabled:false} and '\${spring.profiles.active}'.contains('prod')")
    public AsyncTaskExecutor asyncExecutor() {
        return new SimpleAsyncTaskExecutor();
    }
}
\`\`\`

**7. Profile-Specific Tests:**
\`\`\`java
@SpringBootTest
@ActiveProfiles("test")
class OrderServiceTest {
    // Uses application-test.yml
}

@SpringBootTest
@ActiveProfiles({"test", "integration"})
class IntegrationTest {
    // Uses both application-test.yml and application-integration.yml
}
\`\`\`

**8. Programmatic Profile Check:**
\`\`\`java
@Service
public class FeatureService {

    @Autowired
    private Environment environment;

    public void doSomething() {
        if (Arrays.asList(environment.getActiveProfiles()).contains("prod")) {
            // Production-specific logic
        }
    }
}
\`\`\`

**Best Practices:**
• Keep common config in application.yml
• Use environment variables for secrets in prod
• Use profile groups for related configurations
• Test with @ActiveProfiles
• Don't hardcode profile names in business logic
• Use @Profile("!prod") for dev-only beans
• Document which profiles are available`
    },
    {
      id: 14,
      category: 'Logging',
      difficulty: 'Easy',
      question: 'How do you configure logging in Spring Boot?',
      answer: `**Logging in Spring Boot:**
Spring Boot uses SLF4J with Logback by default.

**1. Basic Configuration (application.yml):**
\`\`\`yaml
logging:
  level:
    root: INFO
    com.example: DEBUG
    org.springframework: WARN
    org.hibernate.SQL: DEBUG
    org.hibernate.type.descriptor.sql: TRACE

  file:
    name: logs/application.log
    max-size: 10MB
    max-history: 30

  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
\`\`\`

**2. Using SLF4J in Code:**
\`\`\`java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class OrderService {

    private static final Logger log = LoggerFactory.getLogger(OrderService.class);

    public Order createOrder(OrderRequest request) {
        log.info("Creating order for user: {}", request.getUserId());
        log.debug("Order details: {}", request);

        try {
            Order order = processOrder(request);
            log.info("Order created successfully: {}", order.getId());
            return order;
        } catch (Exception e) {
            log.error("Failed to create order for user: {}", request.getUserId(), e);
            throw e;
        }
    }
}
\`\`\`

**3. Lombok @Slf4j:**
\`\`\`java
@Service
@Slf4j
public class OrderService {

    public Order createOrder(OrderRequest request) {
        log.info("Creating order for user: {}", request.getUserId());
        // ...
    }
}
\`\`\`

**4. Custom Logback Configuration (logback-spring.xml):**
\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>

    <!-- Console Appender -->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <!-- Rolling File Appender -->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>logs/application.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>logs/application.%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>10MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <maxHistory>30</maxHistory>
            <totalSizeCap>1GB</totalSizeCap>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <!-- JSON Appender for ELK -->
    <appender name="JSON" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>logs/application.json</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>logs/application.%d{yyyy-MM-dd}.json</fileNamePattern>
        </rollingPolicy>
        <encoder class="net.logstash.logback.encoder.LogstashEncoder"/>
    </appender>

    <!-- Profile-specific configuration -->
    <springProfile name="dev">
        <root level="DEBUG">
            <appender-ref ref="CONSOLE"/>
        </root>
    </springProfile>

    <springProfile name="prod">
        <root level="INFO">
            <appender-ref ref="FILE"/>
            <appender-ref ref="JSON"/>
        </root>
    </springProfile>

    <!-- Package-specific levels -->
    <logger name="com.example" level="DEBUG"/>
    <logger name="org.springframework" level="WARN"/>
    <logger name="org.hibernate.SQL" level="DEBUG"/>

</configuration>
\`\`\`

**5. MDC (Mapped Diagnostic Context):**
\`\`\`java
@Component
public class RequestLoggingFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String requestId = UUID.randomUUID().toString();
            MDC.put("requestId", requestId);
            MDC.put("userId", getCurrentUserId());

            filterChain.doFilter(request, response);
        } finally {
            MDC.clear();
        }
    }
}
\`\`\`

**Logback pattern with MDC:**
\`\`\`xml
<pattern>%d{yyyy-MM-dd HH:mm:ss} [%thread] [%X{requestId}] [%X{userId}] %-5level %logger{36} - %msg%n</pattern>
\`\`\`

**6. Dynamic Log Level Change:**
\`\`\`bash
# Using Actuator endpoint
curl -X POST http://localhost:8080/actuator/loggers/com.example \\
  -H "Content-Type: application/json" \\
  -d '{"configuredLevel": "DEBUG"}'

# View current level
curl http://localhost:8080/actuator/loggers/com.example
\`\`\`

**7. Async Logging (Performance):**
\`\`\`xml
<appender name="ASYNC" class="ch.qos.logback.classic.AsyncAppender">
    <appender-ref ref="FILE"/>
    <queueSize>512</queueSize>
    <discardingThreshold>0</discardingThreshold>
</appender>
\`\`\`

**Log Levels:**
| Level | Description |
|-------|-------------|
| TRACE | Most detailed |
| DEBUG | Development debugging |
| INFO | Normal operation |
| WARN | Potential problems |
| ERROR | Errors |

**Best Practices:**
• Use parameterized logging: log.info("User: {}", userId)
• Don't concatenate strings in log statements
• Use appropriate log levels
• Include correlation IDs for tracing
• Log at method boundaries for debugging
• Don't log sensitive information (passwords, tokens)
• Use structured logging (JSON) for log aggregation`
    },
    {
      id: 15,
      category: 'REST',
      difficulty: 'Medium',
      question: 'How do you handle REST API versioning in Spring Boot?',
      answer: `**REST API Versioning Strategies:**

**1. URI Path Versioning (Most Common):**
\`\`\`java
@RestController
@RequestMapping("/api/v1/users")
public class UserControllerV1 {

    @GetMapping("/{id}")
    public UserV1 getUser(@PathVariable Long id) {
        return userService.getUserV1(id);
    }
}

@RestController
@RequestMapping("/api/v2/users")
public class UserControllerV2 {

    @GetMapping("/{id}")
    public UserV2 getUser(@PathVariable Long id) {
        return userService.getUserV2(id);
    }
}
\`\`\`

**URLs:**
\`\`\`
GET /api/v1/users/123
GET /api/v2/users/123
\`\`\`

**2. Request Parameter Versioning:**
\`\`\`java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping(value = "/{id}", params = "version=1")
    public UserV1 getUserV1(@PathVariable Long id) {
        return userService.getUserV1(id);
    }

    @GetMapping(value = "/{id}", params = "version=2")
    public UserV2 getUserV2(@PathVariable Long id) {
        return userService.getUserV2(id);
    }
}
\`\`\`

**URLs:**
\`\`\`
GET /api/users/123?version=1
GET /api/users/123?version=2
\`\`\`

**3. Header Versioning:**
\`\`\`java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping(value = "/{id}", headers = "X-API-VERSION=1")
    public UserV1 getUserV1(@PathVariable Long id) {
        return userService.getUserV1(id);
    }

    @GetMapping(value = "/{id}", headers = "X-API-VERSION=2")
    public UserV2 getUserV2(@PathVariable Long id) {
        return userService.getUserV2(id);
    }
}
\`\`\`

**Request:**
\`\`\`bash
curl -H "X-API-VERSION: 2" http://localhost:8080/api/users/123
\`\`\`

**4. Media Type Versioning (Content Negotiation):**
\`\`\`java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping(value = "/{id}", produces = "application/vnd.company.app-v1+json")
    public UserV1 getUserV1(@PathVariable Long id) {
        return userService.getUserV1(id);
    }

    @GetMapping(value = "/{id}", produces = "application/vnd.company.app-v2+json")
    public UserV2 getUserV2(@PathVariable Long id) {
        return userService.getUserV2(id);
    }
}
\`\`\`

**Request:**
\`\`\`bash
curl -H "Accept: application/vnd.company.app-v2+json" http://localhost:8080/api/users/123
\`\`\`

**5. Custom Version Annotation:**
\`\`\`java
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface ApiVersion {
    int value();
}

@Configuration
public class VersioningConfig implements WebMvcRegistrations {

    @Override
    public RequestMappingHandlerMapping getRequestMappingHandlerMapping() {
        return new ApiVersionRequestMappingHandlerMapping();
    }
}

public class ApiVersionRequestMappingHandlerMapping extends RequestMappingHandlerMapping {

    @Override
    protected RequestMappingInfo getMappingForMethod(Method method, Class<?> handlerType) {
        RequestMappingInfo info = super.getMappingForMethod(method, handlerType);
        if (info == null) return null;

        ApiVersion methodAnnotation = method.getAnnotation(ApiVersion.class);
        if (methodAnnotation != null) {
            return createApiVersionInfo(methodAnnotation, info);
        }

        ApiVersion typeAnnotation = handlerType.getAnnotation(ApiVersion.class);
        if (typeAnnotation != null) {
            return createApiVersionInfo(typeAnnotation, info);
        }

        return info;
    }

    private RequestMappingInfo createApiVersionInfo(ApiVersion annotation, RequestMappingInfo info) {
        String prefix = "/api/v" + annotation.value();
        return RequestMappingInfo.paths(prefix).build().combine(info);
    }
}

// Usage
@RestController
@RequestMapping("/users")
@ApiVersion(1)
public class UserControllerV1 {
    // Mapped to /api/v1/users
}

@RestController
@RequestMapping("/users")
@ApiVersion(2)
public class UserControllerV2 {
    // Mapped to /api/v2/users
}
\`\`\`

**6. Version Service Layer:**
\`\`\`java
@Service
public class UserServiceVersioned {

    public User getUser(Long id, int version) {
        User user = userRepository.findById(id).orElseThrow();

        return switch (version) {
            case 1 -> mapToV1(user);
            case 2 -> mapToV2(user);
            default -> throw new UnsupportedApiVersionException(version);
        };
    }
}
\`\`\`

**Comparison:**
| Strategy | Pros | Cons |
|----------|------|------|
| URI Path | Simple, cacheable, clear | URL pollution |
| Parameter | Clean URLs | Can be missed |
| Header | Clean URLs | Hidden, not cacheable |
| Media Type | RESTful | Complex |

**Best Practices:**
• Use URI versioning for public APIs
• Document deprecation timelines
• Support at least N-1 version
• Use semantic versioning
• Test all versions in CI/CD
• Add version to response headers
• Provide migration guides`
    },
    {
      id: 16,
      category: 'Performance',
      difficulty: 'Hard',
      question: 'How do you optimize Spring Boot application performance?',
      answer: `**Spring Boot Performance Optimization:**

**1. JVM Tuning:**
\`\`\`bash
# Production JVM settings
java -Xms2g -Xmx2g \\
     -XX:+UseG1GC \\
     -XX:MaxGCPauseMillis=200 \\
     -XX:+UseStringDeduplication \\
     -XX:+HeapDumpOnOutOfMemoryError \\
     -XX:HeapDumpPath=/logs/heap-dump.hprof \\
     -jar app.jar
\`\`\`

**2. Connection Pool Optimization (HikariCP):**
\`\`\`yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      idle-timeout: 300000
      connection-timeout: 20000
      max-lifetime: 1200000
      leak-detection-threshold: 60000
\`\`\`

**3. JPA/Hibernate Optimization:**
\`\`\`yaml
spring:
  jpa:
    open-in-view: false  # Disable OSIV
    properties:
      hibernate:
        jdbc:
          batch_size: 50
          fetch_size: 100
        order_inserts: true
        order_updates: true
        generate_statistics: false
        cache:
          use_second_level_cache: true
          use_query_cache: true
          region.factory_class: org.hibernate.cache.ehcache.EhCacheRegionFactory
\`\`\`

**N+1 Problem Fix:**
\`\`\`java
// BAD - N+1 queries
@Entity
public class Order {
    @OneToMany(mappedBy = "order")
    private List<OrderItem> items;  // Lazy loaded
}

// Query orders, then N queries for items
List<Order> orders = orderRepository.findAll();
orders.forEach(o -> o.getItems().size());  // N+1!

// GOOD - Join Fetch
@Query("SELECT o FROM Order o JOIN FETCH o.items WHERE o.status = :status")
List<Order> findByStatusWithItems(@Param("status") String status);

// Or use EntityGraph
@EntityGraph(attributePaths = {"items"})
List<Order> findByStatus(String status);
\`\`\`

**4. Caching:**
\`\`\`java
@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager();
        cacheManager.setCaffeine(Caffeine.newBuilder()
            .maximumSize(10000)
            .expireAfterWrite(Duration.ofMinutes(10))
            .recordStats());
        return cacheManager;
    }
}

@Service
public class ProductService {

    @Cacheable(value = "products", key = "#id")
    public Product getProduct(Long id) {
        return productRepository.findById(id).orElseThrow();
    }
}
\`\`\`

**5. Async Processing:**
\`\`\`java
@Configuration
@EnableAsync
public class AsyncConfig {

    @Bean
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(20);
        executor.setQueueCapacity(500);
        executor.setThreadNamePrefix("Async-");
        executor.initialize();
        return executor;
    }
}

@Service
public class NotificationService {

    @Async
    public CompletableFuture<Void> sendNotification(Notification notification) {
        // Non-blocking notification sending
    }
}
\`\`\`

**6. Lazy Initialization:**
\`\`\`yaml
spring:
  main:
    lazy-initialization: true  # Faster startup, slower first request
\`\`\`

**7. Response Compression:**
\`\`\`yaml
server:
  compression:
    enabled: true
    mime-types: application/json,application/xml,text/html,text/xml,text/plain
    min-response-size: 1024
\`\`\`

**8. HTTP/2:**
\`\`\`yaml
server:
  http2:
    enabled: true
  ssl:
    enabled: true
    key-store: classpath:keystore.p12
    key-store-password: password
\`\`\`

**9. Virtual Threads (Java 21+):**
\`\`\`yaml
spring:
  threads:
    virtual:
      enabled: true
\`\`\`

**10. Reactive Programming (WebFlux):**
\`\`\`java
@RestController
public class ReactiveController {

    @GetMapping("/users/{id}")
    public Mono<User> getUser(@PathVariable Long id) {
        return userRepository.findById(id);  // Non-blocking
    }

    @GetMapping("/users")
    public Flux<User> getAllUsers() {
        return userRepository.findAll();  // Streaming
    }
}
\`\`\`

**11. Native Image (GraalVM):**
\`\`\`xml
<plugin>
    <groupId>org.graalvm.buildtools</groupId>
    <artifactId>native-maven-plugin</artifactId>
</plugin>
\`\`\`

\`\`\`bash
mvn -Pnative native:compile
# Results in much faster startup
\`\`\`

**12. Monitoring & Profiling:**
\`\`\`yaml
management:
  endpoints:
    web:
      exposure:
        include: health,metrics,prometheus
  metrics:
    export:
      prometheus:
        enabled: true
\`\`\`

\`\`\`java
@Timed(value = "order.creation.time", description = "Time to create order")
public Order createOrder(OrderRequest request) {
    // ...
}
\`\`\`

**13. Database Indexing:**
\`\`\`java
@Entity
@Table(name = "orders", indexes = {
    @Index(name = "idx_order_user", columnList = "user_id"),
    @Index(name = "idx_order_status", columnList = "status"),
    @Index(name = "idx_order_created", columnList = "created_at")
})
public class Order {
    // ...
}
\`\`\`

**Performance Checklist:**
• Disable OSIV (Open Session in View)
• Use connection pooling (HikariCP)
• Batch database operations
• Fix N+1 queries
• Enable caching
• Use async for non-critical operations
• Compress responses
• Profile and monitor
• Use appropriate indexes
• Consider reactive for high concurrency`
    },
    {
      id: 17,
      category: 'Microservices',
      difficulty: 'Hard',
      question: 'How do you implement service discovery and load balancing in Spring Boot microservices?',
      answer: `**Service Discovery with Spring Cloud:**

**1. Eureka Server (Service Registry):**

**Dependencies:**
\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
\`\`\`

**Application:**
\`\`\`java
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}
\`\`\`

**Configuration:**
\`\`\`yaml
server:
  port: 8761

eureka:
  client:
    register-with-eureka: false
    fetch-registry: false
  server:
    enable-self-preservation: false
\`\`\`

**2. Eureka Client (Service Registration):**

**Dependencies:**
\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
\`\`\`

**Configuration:**
\`\`\`yaml
spring:
  application:
    name: order-service

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
  instance:
    prefer-ip-address: true
    lease-renewal-interval-in-seconds: 10
    lease-expiration-duration-in-seconds: 30
\`\`\`

**3. Service Discovery with RestTemplate:**
\`\`\`java
@Configuration
public class RestTemplateConfig {

    @Bean
    @LoadBalanced  // Enable client-side load balancing
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

@Service
public class OrderService {

    @Autowired
    private RestTemplate restTemplate;

    public User getUser(Long userId) {
        // Uses service name instead of hostname
        return restTemplate.getForObject(
            "http://user-service/api/users/{id}",
            User.class,
            userId);
    }
}
\`\`\`

**4. Load Balancing with Spring Cloud LoadBalancer:**
\`\`\`java
@Configuration
public class LoadBalancerConfig {

    @Bean
    @LoadBalanced
    public WebClient.Builder loadBalancedWebClientBuilder() {
        return WebClient.builder();
    }
}

@Service
public class OrderService {

    private final WebClient.Builder webClientBuilder;

    public Mono<User> getUser(Long userId) {
        return webClientBuilder.build()
            .get()
            .uri("http://user-service/api/users/{id}", userId)
            .retrieve()
            .bodyToMono(User.class);
    }
}
\`\`\`

**5. OpenFeign Client (Declarative REST Client):**

**Dependencies:**
\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
\`\`\`

**Enable Feign:**
\`\`\`java
@SpringBootApplication
@EnableFeignClients
public class OrderServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }
}
\`\`\`

**Feign Client:**
\`\`\`java
@FeignClient(name = "user-service", fallback = UserClientFallback.class)
public interface UserClient {

    @GetMapping("/api/users/{id}")
    User getUser(@PathVariable("id") Long id);

    @GetMapping("/api/users")
    List<User> getAllUsers();

    @PostMapping("/api/users")
    User createUser(@RequestBody UserRequest request);
}

@Component
public class UserClientFallback implements UserClient {

    @Override
    public User getUser(Long id) {
        return new User(id, "Unknown", "unknown@example.com");
    }

    @Override
    public List<User> getAllUsers() {
        return Collections.emptyList();
    }

    @Override
    public User createUser(UserRequest request) {
        throw new ServiceUnavailableException("User service unavailable");
    }
}

@Service
public class OrderService {

    @Autowired
    private UserClient userClient;

    public OrderResponse createOrder(OrderRequest request) {
        User user = userClient.getUser(request.getUserId());
        // ...
    }
}
\`\`\`

**6. Circuit Breaker (Resilience4j):**
\`\`\`xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-circuitbreaker-resilience4j</artifactId>
</dependency>
\`\`\`

\`\`\`java
@Service
public class OrderService {

    private final CircuitBreakerFactory circuitBreakerFactory;
    private final UserClient userClient;

    @CircuitBreaker(name = "userService", fallbackMethod = "getUserFallback")
    public User getUser(Long userId) {
        return userClient.getUser(userId);
    }

    public User getUserFallback(Long userId, Throwable t) {
        log.error("Fallback for user {}: {}", userId, t.getMessage());
        return new User(userId, "Unknown", "unknown@example.com");
    }
}
\`\`\`

**Configuration:**
\`\`\`yaml
resilience4j:
  circuitbreaker:
    instances:
      userService:
        sliding-window-size: 10
        failure-rate-threshold: 50
        wait-duration-in-open-state: 10s
        permitted-number-of-calls-in-half-open-state: 3
  retry:
    instances:
      userService:
        max-attempts: 3
        wait-duration: 1s
  timelimiter:
    instances:
      userService:
        timeout-duration: 5s
\`\`\`

**7. API Gateway (Spring Cloud Gateway):**
\`\`\`yaml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/users/**
          filters:
            - StripPrefix=1

        - id: order-service
          uri: lb://order-service
          predicates:
            - Path=/api/orders/**
          filters:
            - StripPrefix=1
            - name: CircuitBreaker
              args:
                name: orderCircuitBreaker
                fallbackUri: forward:/fallback/orders
\`\`\`

**Architecture:**
\`\`\`
                    ┌─────────────┐
                    │ API Gateway │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        ┌─────────┐  ┌─────────┐  ┌─────────┐
        │ Service │  │ Service │  │ Service │
        │    A    │  │    B    │  │    C    │
        └────┬────┘  └────┬────┘  └────┬────┘
             │            │            │
             └────────────┼────────────┘
                          ▼
                   ┌─────────────┐
                   │   Eureka    │
                   │   Server    │
                   └─────────────┘
\`\`\``
    },
    {
      id: 18,
      category: 'Transactions',
      difficulty: 'Hard',
      question: 'How do you manage transactions in Spring Boot?',
      answer: `**Transaction Management in Spring Boot:**

**1. @Transactional Basics:**
\`\`\`java
@Service
public class OrderService {

    @Transactional
    public Order createOrder(OrderRequest request) {
        Order order = orderRepository.save(new Order(request));
        orderItemRepository.saveAll(createItems(order, request.getItems()));
        inventoryService.decrementStock(request.getItems());
        return order;
        // All operations commit together or rollback together
    }
}
\`\`\`

**2. Propagation Types:**
\`\`\`java
// REQUIRED (default) - Join existing or create new
@Transactional(propagation = Propagation.REQUIRED)
public void methodA() {
    // Uses existing transaction or creates new one
}

// REQUIRES_NEW - Always create new transaction
@Transactional(propagation = Propagation.REQUIRES_NEW)
public void auditLog(String action) {
    // New transaction - commits even if outer transaction fails
    auditRepository.save(new AuditLog(action));
}

// NESTED - Create nested transaction (savepoint)
@Transactional(propagation = Propagation.NESTED)
public void nestedOperation() {
    // Can rollback independently, but commits with parent
}

// MANDATORY - Must run within existing transaction
@Transactional(propagation = Propagation.MANDATORY)
public void mustBeInTransaction() {
    // Throws exception if no active transaction
}

// SUPPORTS - Run in transaction if one exists
@Transactional(propagation = Propagation.SUPPORTS)
public Data readData() {
    // Works with or without transaction
}

// NOT_SUPPORTED - Suspend existing transaction
@Transactional(propagation = Propagation.NOT_SUPPORTED)
public void nonTransactionalOperation() {
    // Runs outside any transaction
}

// NEVER - Must NOT run within transaction
@Transactional(propagation = Propagation.NEVER)
public void neverInTransaction() {
    // Throws exception if transaction exists
}
\`\`\`

**3. Isolation Levels:**
\`\`\`java
// READ_UNCOMMITTED - Allows dirty reads
@Transactional(isolation = Isolation.READ_UNCOMMITTED)

// READ_COMMITTED - Prevents dirty reads (default for most DBs)
@Transactional(isolation = Isolation.READ_COMMITTED)

// REPEATABLE_READ - Prevents dirty and non-repeatable reads
@Transactional(isolation = Isolation.REPEATABLE_READ)

// SERIALIZABLE - Highest isolation, prevents phantom reads
@Transactional(isolation = Isolation.SERIALIZABLE)
\`\`\`

**4. Rollback Configuration:**
\`\`\`java
// Rollback for specific exceptions
@Transactional(rollbackFor = {BusinessException.class, IOException.class})
public void process() {
    // Rollback for BusinessException and IOException
}

// Don't rollback for specific exceptions
@Transactional(noRollbackFor = ValidationException.class)
public void processWithValidation() {
    // Won't rollback for ValidationException
}

// Rollback for all exceptions (including checked)
@Transactional(rollbackFor = Exception.class)
public void processAll() throws Exception {
    // Rollback for any exception
}
\`\`\`

**5. Read-Only Transactions:**
\`\`\`java
@Transactional(readOnly = true)
public List<Order> findAllOrders() {
    return orderRepository.findAll();
    // Optimizations: no dirty checking, no flush
}
\`\`\`

**6. Timeout:**
\`\`\`java
@Transactional(timeout = 30)  // 30 seconds
public void longRunningOperation() {
    // Rolls back if exceeds 30 seconds
}
\`\`\`

**7. Programmatic Transaction Management:**
\`\`\`java
@Service
public class OrderService {

    @Autowired
    private TransactionTemplate transactionTemplate;

    @Autowired
    private PlatformTransactionManager transactionManager;

    // Using TransactionTemplate
    public Order createOrder(OrderRequest request) {
        return transactionTemplate.execute(status -> {
            try {
                Order order = orderRepository.save(new Order(request));
                orderItemRepository.saveAll(createItems(order, request.getItems()));
                return order;
            } catch (Exception e) {
                status.setRollbackOnly();
                throw e;
            }
        });
    }

    // Manual transaction management
    public void manualTransaction() {
        TransactionDefinition def = new DefaultTransactionDefinition();
        TransactionStatus status = transactionManager.getTransaction(def);

        try {
            // Business logic
            orderRepository.save(order);
            transactionManager.commit(status);
        } catch (Exception e) {
            transactionManager.rollback(status);
            throw e;
        }
    }
}
\`\`\`

**8. Transaction Event Listeners:**
\`\`\`java
@Component
public class OrderEventListener {

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleOrderCreated(OrderCreatedEvent event) {
        // Only executes after transaction commits
        notificationService.sendOrderConfirmation(event.getOrder());
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_ROLLBACK)
    public void handleRollback(OrderCreatedEvent event) {
        // Only executes if transaction rolls back
        log.error("Order creation failed: {}", event.getOrder().getId());
    }
}
\`\`\`

**9. Distributed Transactions (Saga Pattern):**
\`\`\`java
@Service
public class OrderSaga {

    @Transactional
    public void createOrder(OrderRequest request) {
        try {
            // Step 1: Create order
            Order order = orderService.create(request);

            // Step 2: Reserve inventory
            inventoryService.reserve(order.getItems());

            // Step 3: Process payment
            paymentService.charge(order);

            // Step 4: Complete order
            orderService.complete(order);

        } catch (InventoryException e) {
            // Compensating transaction
            orderService.cancel(order);
            throw e;
        } catch (PaymentException e) {
            // Compensating transactions
            inventoryService.release(order.getItems());
            orderService.cancel(order);
            throw e;
        }
    }
}
\`\`\`

**Common Pitfalls:**

**1. Self-Invocation (Proxy Bypass):**
\`\`\`java
@Service
public class OrderService {

    public void processOrder() {
        createOrder();  // WRONG - @Transactional ignored!
    }

    @Transactional
    public void createOrder() {
        // Transaction not created when called internally
    }
}

// Solution: Inject self or use separate service
@Service
public class OrderService {

    @Autowired
    private OrderService self;

    public void processOrder() {
        self.createOrder();  // Works - goes through proxy
    }
}
\`\`\`

**2. Checked Exceptions:**
\`\`\`java
// By default, only unchecked exceptions trigger rollback
@Transactional  // Won't rollback for IOException
public void process() throws IOException {
    throw new IOException();  // Transaction commits!
}

// Fix: Explicitly rollback for checked exceptions
@Transactional(rollbackFor = IOException.class)
public void process() throws IOException {
    throw new IOException();  // Now rolls back
}
\`\`\``
    }
  ]

  const renderFormattedAnswer = (text) => {
    const lines = text.split('\n')
    const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']
    let colorIndex = 0
    const result = []
    let inCodeBlock = false
    let codeLines = []
    let codeLanguage = 'java'

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex]

      // Check for code block start/end
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          // Start of code block
          inCodeBlock = true
          codeLanguage = line.trim().substring(3) || 'java'
          codeLines = []
        } else {
          // End of code block
          inCodeBlock = false
          const codeString = codeLines.join('\n')
          result.push(
            <div key={`code-${lineIndex}`} style={{ margin: '1.5rem 0', textAlign: 'left' }}>
              <SyntaxHighlighter
                language={codeLanguage}
                style={vscDarkPlus}
                customStyle={{
                  borderRadius: '0.5rem',
                  fontSize: '0.9rem',
                  padding: '1rem',
                  textAlign: 'left',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  backgroundColor: '#000000'
                }}
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
          )
          codeLines = []
        }
        continue
      }

      if (inCodeBlock) {
        codeLines.push(line)
        continue
      }

      // Empty lines for spacing
      if (line.trim() === '') {
        result.push(<div key={lineIndex} style={{ height: '0.5rem' }}></div>)
        continue
      }

      // Bullet points (lines starting with •)
      const bulletMatch = line.match(/^(\s*)•\s+(.+)$/)
      if (bulletMatch) {
        const indentLevel = bulletMatch[1].length
        const bulletContent = bulletMatch[2]
        result.push(
          <div
            key={lineIndex}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginLeft: `${indentLevel * 0.5 + 1}rem`,
              marginTop: '0.5rem',
              textAlign: 'left',
              lineHeight: '1.6'
            }}
          >
            <span style={{
              color: '#3b82f6',
              marginRight: '0.5rem',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              lineHeight: '1.4'
            }}>
              •
            </span>
            <span style={{ flex: 1 }}>{bulletContent}</span>
          </div>
        )
        continue
      }

      // Bold section headers (e.g., **What is RFQ?**)
      const boldMatch = line.match(/^\*\*(.+?):\*\*/)
      if (boldMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        result.push(
          <div
            key={lineIndex}
            style={{
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
              textAlign: 'left',
              paddingBottom: '0.25rem',
              borderBottom: `2px solid ${color}33`
            }}
          >
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.1rem',
              letterSpacing: '0.02em'
            }}>
              {boldMatch[1]}:
            </span>
            {line.substring(boldMatch[0].length)}
          </div>
        )
        continue
      }

      // Numbered section headers (e.g., **1. Client Initiates:**)
      const numberedMatch = line.match(/^\*\*(\d+\.\s+.+?):\*\*/)
      if (numberedMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        result.push(
          <div
            key={lineIndex}
            style={{
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
              textAlign: 'left',
              paddingBottom: '0.25rem',
              borderBottom: `2px solid ${color}33`
            }}
          >
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.1rem',
              letterSpacing: '0.02em'
            }}>
              {numberedMatch[1]}:
            </span>
            {line.substring(numberedMatch[0].length)}
          </div>
        )
        continue
      }

      // Regular text with subtle left padding
      result.push(
        <div
          key={lineIndex}
          style={{
            textAlign: 'left',
            marginTop: '0.25rem',
            paddingLeft: '0.5rem',
            lineHeight: '1.6',
            color: '#e5e7eb'
          }}
        >
          {line}
        </div>
      )
    }

    return result
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#10b981'
      case 'Medium': return '#f59e0b'
      case 'Hard': return '#ef4444'
      default: return '#6b7280'
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
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
          textAlign: 'left',
            fontWeight: '600',
            backgroundColor: categoryColor,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
          onMouseLeave={(e) => e.target.style.backgroundColor = categoryColor}
        >
          ← Back to Questions
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#93c5fd',
          margin: 0
        }}>
          Spring Boot Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        {questions.map((q) => (
          <div
            key={q.id}
            style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              borderRadius: '12px',
              border: `3px solid #374151`,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: expandedQuestionId === q.id
                ? `0 0 0 4px ${categoryColor}40, 0 8px 16px rgba(0,0,0,0.3)`
                : '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <div
              onClick={() => setExpandedQuestionId(expandedQuestionId === q.id ? null : q.id)}
              style={{
                padding: '1.5rem',
                cursor: 'pointer',
                backgroundColor: expandedQuestionId === q.id ? `${categoryColor}20` : 'transparent',
                transition: 'background-color 0.2s ease'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1rem',
                marginBottom: '0.75rem'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '0.75rem',
                  flexWrap: 'wrap',
                  alignItems: 'center'
                }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: `${categoryColor}20`,
                    color: categoryColor,
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    {q.category}
                  </span>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: `${getDifficultyColor(q.difficulty)}20`,
                    color: getDifficultyColor(q.difficulty),
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    {q.difficulty}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div onClick={(e) => e.stopPropagation()} style={{ transform: 'scale(0.85)' }}>
                    <CompletionCheckbox problemId={`SpringBootQuestions-${q.id}`} />
                  </div>
                  <span style={{
                    fontSize: '1.5rem',
                    color: categoryColor,
                    transition: 'transform 0.3s ease',
                    transform: expandedQuestionId === q.id ? 'rotate(180deg)' : 'rotate(0deg)',
                    display: 'inline-block'
                  }}>
                    ▼
                  </span>
                </div>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#e2e8f0',
                margin: 0
              }}>
                {q.question}
              </h3>
            </div>

            {expandedQuestionId === q.id && (
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#1e293b',
                borderTop: `2px solid ${categoryColor}40`,
                animation: 'fadeIn 0.3s ease'
              }}>
                <div style={{
                  fontSize: '1rem',
          textAlign: 'left',
                  lineHeight: '1.8',
                  color: '#d1d5db',
                  whiteSpace: 'pre-wrap'
                }}>
                  {renderFormattedAnswer(q.answer)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderRadius: '12px',
        border: `3px solid #374151`
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#93c5fd',
          marginBottom: '1rem'
        }}>
          Best Practices
        </h3>
        <ul style={{
          fontSize: '1rem',
          textAlign: 'left',
          lineHeight: '2',
          color: '#d1d5db',
          paddingLeft: '1.5rem'
        }}>
          <li><strong>Use @ConfigurationProperties</strong> instead of @Value for type-safe configuration</li>
          <li><strong>Externalize configuration</strong> - never hardcode values, use profiles</li>
          <li><strong>Use appropriate starters</strong> - avoid manual dependency management</li>
          <li><strong>Enable Actuator</strong> in production for monitoring and health checks</li>
          <li><strong>Use @SpringBootTest</strong> for integration tests, @WebMvcTest for controller tests</li>
          <li><strong>Set spring.profiles.active</strong> via environment variables, not in code</li>
          <li><strong>Use @ConditionalOnProperty</strong> to disable auto-configuration when needed</li>
          <li><strong>Package as executable JAR</strong> with embedded server for deployment</li>
          <li><strong>Use DevTools</strong> for development (automatic restart, LiveReload)</li>
          <li><strong>Follow 12-factor app principles</strong> for cloud-native applications</li>
        </ul>
      </div>
    </div>
  )
}

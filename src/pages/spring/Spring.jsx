import { useState, useEffect, useRef } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

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

function Spring({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
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

  const concepts = [
    {
      name: 'Core Container',
      icon: '🌱',
      explanation: `**Overview:**
The Spring Core Container is the foundational IoC container that manages the complete lifecycle of application objects (beans), providing sophisticated dependency management and configuration capabilities.

**How It Works:**
• Container reads configuration metadata from XML files, Java annotations, or Java code configurations
• BeanFactory provides basic container functionality with lazy bean initialization
• ApplicationContext extends BeanFactory with enterprise features like eager initialization, internationalization, and event publication
• IoC principle inverts control flow - container injects dependencies rather than your code creating them

**Key Features:**
• Automatic dependency injection eliminating manual object creation and wiring
• Lifecycle management from bean instantiation through initialization to destruction
• Support for multiple configuration styles (annotations, Java config, XML)
• Component scanning for automatic bean discovery
• Profile-based configuration for environment-specific beans

**Real-World Use Cases:**
• Managing service layers, data access layers, and web controllers in enterprise applications
• Microservices architectures where each service has its own ApplicationContext
• Resource initialization and cleanup (database connections, thread pools, caches)
• Complex dependency graphs requiring sophisticated wiring and lifecycle management

**Best Practices:**
• Prefer annotation-based configuration (@Configuration, @Bean) over XML for type safety and refactoring support
• Use constructor injection for required dependencies to ensure complete bean initialization
• Leverage component scanning (@ComponentScan) for automatic bean discovery
• Organize beans with profiles for environment-specific configurations
• Use @Lazy judiciously for expensive-to-initialize beans that might not be needed

**Common Pitfalls:**
• Creating ApplicationContext instances manually instead of letting Spring Boot manage it
• Mixing configuration styles excessively (XML, annotations, Java config) making code harder to understand
• Injecting prototype-scoped beans into singletons without proper handling, resulting in singleton behavior
• Circular dependencies complicating initialization and requiring setter injection workarounds

**When to Use:**
The Core Container is fundamental to every Spring application - from simple utilities to complex enterprise systems requiring sophisticated dependency management and lifecycle control.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Basic Spring Configuration with Java Config
// ═══════════════════════════════════════════════════════════════════════════

@Configuration
public class AppConfig {

  @Bean
  public UserService userService() {
    return new UserServiceImpl(userRepository());
  }

  @Bean
  public UserRepository userRepository() {
    return new JpaUserRepository();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Using ApplicationContext to Bootstrap Application
// ═══════════════════════════════════════════════════════════════════════════

public class Application {
  public static void main(String[] args) {
    ApplicationContext context =
      new AnnotationConfigApplicationContext(AppConfig.class);

    UserService userService = context.getBean(UserService.class);
    userService.processUser();
  }
}
// Output: Beans created and managed by Spring container`
    },
    {
      name: 'Dependency Injection',
      icon: '🌱',
      explanation: `**Overview:**
Dependency Injection is Spring's core design pattern that implements Inversion of Control by having the container inject dependencies into objects rather than objects creating their own dependencies.

**How It Works:**
• Spring container creates objects and injects their dependencies automatically
• Constructor injection provides dependencies through class constructors (recommended)
• Setter injection sets dependencies through setter methods after object creation
• Field injection uses @Autowired to inject directly into fields (not recommended)
• @Autowired annotation tells Spring to automatically resolve and inject dependencies by type

**Key Features:**
• Decouples code from specific implementations enabling easy swapping
• Dramatically improves testability through mock/stub injection
• Promotes single responsibility by removing dependency lifecycle management
• Supports @Qualifier for disambiguating multiple beans of same type
• Enables injection of collections, Optional dependencies, and property values with @Value

**Real-World Use Cases:**
• Layered architecture: Injecting repositories into services, services into controllers
• Enterprise applications: Injecting external service clients, caching components, security managers
• Strategy pattern implementation: Different implementations injected based on profiles or conditions
• Microservices: Injecting configuration, service discovery clients, and circuit breakers

**Best Practices:**
• Prefer constructor injection for required dependencies - makes them explicit and enables immutability with final fields
• Use setter injection only for optional dependencies with reasonable defaults
• Avoid field injection as it makes testing harder and hides dependencies
• Use @Qualifier or @Primary to resolve ambiguity when multiple beans of same type exist
• Keep constructors focused on dependency injection, avoiding complex logic

**Common Pitfalls:**
• Field injection makes unit testing difficult without reflection - use constructor injection instead
• Constructor with more than 5 parameters indicates violation of single responsibility principle
• Injecting implementation classes instead of interfaces reduces flexibility and testability
• Not using @Qualifier when multiple beans exist causes NoUniqueBeanDefinitionException
• Circular dependencies indicate design problems - refactor to break the cycle

**When to Use:**
Use DI everywhere in Spring applications for managing dependencies between layers, implementing design patterns, and ensuring testability. It's essential for layered architectures and enterprise applications requiring flexibility and maintainability.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Constructor Injection (Recommended Best Practice)
// ═══════════════════════════════════════════════════════════════════════════

// Constructor injection (recommended)
@Service
public class OrderService {
  private final OrderRepository orderRepository;
  private final PaymentService paymentService;

  @Autowired
  public OrderService(OrderRepository orderRepository,
                      PaymentService paymentService) {
    this.orderRepository = orderRepository;
    this.paymentService = paymentService;
  }

  public void processOrder(Order order) {
    orderRepository.save(order);
    paymentService.processPayment(order);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Field Injection (Not Recommended - Shown for Comparison)
// ═══════════════════════════════════════════════════════════════════════════

// Field injection (not recommended)
@Service
public class NotificationService {
  @Autowired
  private EmailSender emailSender;

  public void sendNotification(String email, String message) {
    emailSender.send(email, message);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Setter Injection for Optional Dependencies
// ═══════════════════════════════════════════════════════════════════════════

// Setter injection
@Service
public class ReportService {
  private DataSource dataSource;

  @Autowired
  public void setDataSource(DataSource dataSource) {
    this.dataSource = dataSource;
  }
}
// Output: Dependencies automatically injected by Spring`
    },
    {
      name: 'Bean Lifecycle',
      icon: '🌱',
      explanation: `**Overview:**
Spring provides comprehensive bean lifecycle management with hooks to execute custom logic at various points from bean creation to destruction, essential for proper resource initialization and cleanup.

**How It Works:**
• Lifecycle phases: instantiation → dependency injection → initialization → ready for use → destruction
• @PostConstruct annotation executes after dependency injection (JSR-250 standard, preferred)
• @PreDestroy annotation executes before bean destruction for cleanup
• Alternative: InitializingBean/DisposableBean interfaces or custom init/destroy methods in @Bean
• Awareness interfaces (BeanNameAware, ApplicationContextAware) provide container access

**Key Features:**
• Multiple initialization mechanisms: @PostConstruct, InitializingBean, custom init-method
• Multiple destruction mechanisms: @PreDestroy, DisposableBean, custom destroy-method
• Initialization order follows dependency graph automatically
• Support for lazy initialization with @Lazy annotation
• Explicit ordering control with @DependsOn annotation

**Real-World Use Cases:**
• Initialization: Database connection pools, message broker connections, cache warming, background threads, service discovery registration
• Destruction: Closing database connections gracefully, flushing caches, completing pending operations, releasing file handles
• Resource management: Thread pools, network connections, external service clients
• Startup configuration: Loading external configuration, validating environment

**Best Practices:**
• Prefer @PostConstruct/@PreDestroy over interfaces for standard approach with less coupling
• Keep initialization logic idempotent to handle container restarts safely
• Ensure cleanup logic handles exceptions gracefully to prevent cascade failures
• Use @Lazy for expensive-to-create beans that might not be needed
• Document initialization requirements and dependencies clearly

**Common Pitfalls:**
• Performing blocking I/O or expensive operations in constructors instead of @PostConstruct
• Forgetting @PreDestroy cleanup leading to resource leaks (connections, file handles)
• Assuming specific initialization order without @DependsOn configuration
• Not handling exceptions in lifecycle methods preventing startup/shutdown
• Using InitializingBean/DisposableBean interfaces unnecessarily, coupling code to Spring

**When to Use:**
Use lifecycle callbacks whenever beans manage external resources (databases, caches, connections), require complex initialization, need graceful cleanup, or must coordinate with external systems.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Lifecycle Management with @PostConstruct and @PreDestroy
// ═══════════════════════════════════════════════════════════════════════════

@Component
public class DatabaseConnection {

  @PostConstruct
  public void init() {
    System.out.println("Initializing database connection");
    // Connect to database
  }

  @PreDestroy
  public void cleanup() {
    System.out.println("Closing database connection");
    // Close connection
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Interface-Based Lifecycle Management
// ═══════════════════════════════════════════════════════════════════════════

// Using interfaces
@Component
public class CacheManager implements InitializingBean, DisposableBean {

  @Override
  public void afterPropertiesSet() throws Exception {
    System.out.println("Cache warming up");
    // Initialize cache
  }

  @Override
  public void destroy() throws Exception {
    System.out.println("Clearing cache");
    // Clear cache
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Custom Lifecycle Methods in @Bean Configuration
// ═══════════════════════════════════════════════════════════════════════════

// Custom lifecycle methods
@Configuration
public class LifecycleConfig {

  @Bean(initMethod = "start", destroyMethod = "stop")
  public ConnectionPool connectionPool() {
    return new HikariConnectionPool();
  }
}
// Output: Lifecycle callbacks executed at appropriate times`
    },
    {
      name: 'AOP Support',
      icon: '🌱',
      explanation: `**Overview:**
Aspect-Oriented Programming modularizes cross-cutting concerns (logging, security, transactions) into reusable aspects, keeping business logic clean by separating concerns that cut across multiple layers.

**How It Works:**
• Spring AOP uses proxy-based approach with JDK dynamic proxies (interfaces) or CGLIB (classes)
• @Aspect annotation defines aspects containing advice methods
• Advice types: @Before, @After, @AfterReturning, @AfterThrowing, @Around
• Pointcut expressions select which methods advice applies to: execution(), within(), @annotation()
• Proxy intercepts method calls, executes advice, then proceeds to actual method

**Key Features:**
• Declarative cross-cutting concern management without code duplication
• Rich pointcut expression language for precise method selection
• Multiple advice types for different interception points
• Support for aspect ordering with @Order when multiple aspects apply
• Built-in support for transactions (@Transactional) and security (@PreAuthorize)

**Real-World Use Cases:**
• Logging: Method entry/exit, parameters, and execution time across service layers
• Performance monitoring: Measuring execution time and collecting metrics
• Security: Implementing authorization checks and authentication
• Transaction management: Declarative transaction boundaries
• Caching: Automatic caching of method results
• Auditing: Recording changes to sensitive data
• Rate limiting: Controlling API call frequency

**Best Practices:**
• Keep aspects focused on single concerns (separate logging, security, transaction aspects)
• Use appropriate advice types - prefer @Before/@After over @Around when possible
• Make pointcuts precise to avoid unintended method interception
• Use annotation-based pointcuts (@Loggable, @Audited) for clearer intent
• Document aspect behavior clearly as it's less visible than direct method calls
• Test aspects independently from business logic

**Common Pitfalls:**
• Aspects don't work on private methods or final classes due to CGLIB limitations
• Self-invocation bypasses proxy and aspects - refactor to call through another bean
• Forgetting @EnableAspectJAutoProxy in configuration disables AOP
• Overly broad pointcuts intercepting too many methods, impacting performance
• Forgetting ProceedingJoinPoint.proceed() in @Around advice prevents method execution
• Not handling exceptions in aspects, breaking application flow

**When to Use:**
Use AOP for cross-cutting concerns affecting multiple layers: logging, security, transactions, caching, monitoring, auditing, and error handling. Essential for keeping business logic clean in enterprise applications and microservices.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Basic Aspect with Before and After Advice
// ═══════════════════════════════════════════════════════════════════════════

@Aspect
@Component
public class LoggingAspect {

  @Before("execution(* com.example.service.*.*(..))")
  public void logBefore(JoinPoint joinPoint) {
    System.out.println("Before: " + joinPoint.getSignature().getName());
  }

  @AfterReturning(
    pointcut = "execution(* com.example.service.*.*(..))",
    returning = "result")
  public void logAfterReturning(JoinPoint joinPoint, Object result) {
    System.out.println("After returning: " + result);
  }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Around Advice for Performance Monitoring
// ═══════════════════════════════════════════════════════════════════════════

  @Around("@annotation(Transactional)")
  public Object logExecutionTime(ProceedingJoinPoint joinPoint)
      throws Throwable {
    long start = System.currentTimeMillis();
    Object proceed = joinPoint.proceed();
    long executionTime = System.currentTimeMillis() - start;
    System.out.println(joinPoint.getSignature() +
                       " executed in " + executionTime + "ms");
    return proceed;
  }
}
// Output: Logging applied to all service methods automatically`
    },
    {
      name: 'Resource Management',
      icon: '🌱',
      explanation: `**Overview:**
Spring's Resource abstraction provides a unified interface for accessing resources from any location (filesystem, classpath, URLs, JARs) with consistent behavior and simplified API.

**How It Works:**
• Resource interface provides methods to check existence, read as InputStream, get file handles
• ResourceLoader strategy interface loads resources from different sources
• ApplicationContext implements ResourceLoader for resource loading in any bean
• Resource prefixes specify location: classpath:, file:, http:
• @Value annotation injects properties from files, system properties, environment variables

**Key Features:**
• Unified API eliminating complexity of different resource access mechanisms
• Support for classpath, filesystem, URL, and JAR resources
• Property placeholder mechanism with \${property.name} syntax
• Default values with \${property:defaultValue} syntax
• Environment abstraction providing access to profiles and properties
• Spring Expression Language (SpEL) for complex property resolution

**Real-World Use Cases:**
• Loading configuration files for different environments (application-dev.properties, application-prod.properties)
• Accessing classpath resources: CSV data, lookup tables, license files, templates
• Loading resource bundles for internationalization
• Reading external configuration from file systems or URLs for dynamic updates
• Accessing static data files bundled with application

**Best Practices:**
• Use classpath: prefix for resources bundled with application
• Use file: for external configuration files allowing runtime updates
• Prefer @ConfigurationProperties over scattered @Value annotations for type-safe configuration
• Provide sensible defaults using \${property:default} syntax
• Use profiles for environment-specific configuration instead of conditionals
• Document required properties and validate at startup

**Common Pitfalls:**
• Hardcoding file paths makes applications non-portable across environments
• Not closing InputStreams properly - always use try-with-resources
• Assuming resources always exist - check existence before accessing
• Using @Value without defaults causing startup failures on missing properties
• Confusing classpath: (single JAR) with classpath*: (all JARs) leading to missing resources
• Not escaping $ in literal property values

**When to Use:**
Use Resource abstraction for loading any external data: configuration files, templates, static data, internationalization bundles. Essential for externalizing configuration and supporting multiple environments.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Loading Resources with ResourceLoader
// ═══════════════════════════════════════════════════════════════════════════

@Component
public class ResourceReader {

  @Autowired
  private ResourceLoader resourceLoader;

  @Value("classpath:config/application.properties")
  private Resource configFile;

  public void readResource() throws IOException {
    Resource resource =
      resourceLoader.getResource("classpath:data/users.json");

    try (InputStream is = resource.getInputStream()) {
      String content = new String(is.readAllBytes());
      System.out.println(content);
    }
  }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Property Injection with @Value and Defaults
// ═══════════════════════════════════════════════════════════════════════════

  @Value("\${app.name}")
  private String appName;

  @Value("\${app.version:1.0.0}")
  private String version;

  public void printConfig() {
    System.out.println("App: " + appName + " v" + version);
  }
}
// Output: Resources loaded from various locations seamlessly`
    },
    {
      name: 'Transaction Management',
      icon: '🌱',
      explanation: `**Overview:**
Spring's transaction management provides a consistent programming model across different transaction APIs (JDBC, JPA, Hibernate, JTA), abstracting complexity and enabling focus on business logic through declarative or programmatic approaches.

**How It Works:**
• @Transactional annotation triggers proxy creation managing transaction lifecycle
• Proxy starts transaction before method, commits on success, rolls back on exception
• Propagation levels define how transactions relate: REQUIRED, REQUIRES_NEW, MANDATORY, SUPPORTS
• Isolation levels control concurrent visibility: READ_UNCOMMITTED, READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE
• Rollback rules specify which exceptions trigger rollback (runtime exceptions by default)

**Key Features:**
• Declarative transaction management separating transaction logic from business logic
• Consistent API across JDBC, JPA, Hibernate, JTA, JMS
• Configurable propagation, isolation, timeout, and read-only optimization
• Rollback rule customization with rollbackFor and noRollbackFor
• Programmatic transaction support with TransactionTemplate for complex scenarios

**Real-World Use Cases:**
• Money transfers: Ensuring atomic debit and credit operations
• Order processing: Spanning inventory updates, order creation, payment processing
• Batch operations: Rolling back all changes if any operation fails
• Event-driven systems: Publishing messages only if database changes succeed
• Audit logging: Using REQUIRES_NEW to persist logs even if main transaction rolls back

**Best Practices:**
• Apply @Transactional at service layer, not repositories or controllers
• Keep transactions short to minimize lock duration and improve scalability
• Use read-only transactions for queries to enable database optimizations
• Be explicit about rollback rules with rollbackFor for checked exceptions
• Use appropriate propagation: REQUIRED for business logic, REQUIRES_NEW for independent operations
• Handle exceptions properly to ensure correct rollback behavior

**Common Pitfalls:**
• @Transactional only works on public methods and external calls due to proxy limitations
• Self-invocation bypasses proxy and transaction management - refactor to separate bean
• Catching exceptions without rethrowing defeats rollback mechanism
• Checked exceptions don't trigger rollback by default - use rollbackFor
• Opening new transactions unnecessarily with REQUIRES_NEW causes performance issues
• Lazy loading outside transactions causes LazyInitializationException
• Not considering isolation levels leading to dirty reads or lost updates

**When to Use:**
Use transaction management for any data modification operations requiring ACID properties: financial transactions, order processing, batch operations, and coordinated updates across multiple entities.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Declarative Transaction Management with @Transactional
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class TransferService {

  @Autowired
  private AccountRepository accountRepository;

  @Transactional(propagation = Propagation.REQUIRED,
                 isolation = Isolation.READ_COMMITTED,
                 rollbackFor = Exception.class)
  public void transferMoney(Long fromId, Long toId, BigDecimal amount) {
    Account from = accountRepository.findById(fromId)
      .orElseThrow(() -> new AccountNotFoundException());
    Account to = accountRepository.findById(toId)
      .orElseThrow(() -> new AccountNotFoundException());

    from.withdraw(amount);
    to.deposit(amount);

    accountRepository.save(from);
    accountRepository.save(to);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Programmatic Transaction Management with TransactionTemplate
// ═══════════════════════════════════════════════════════════════════════════

// Programmatic transaction
@Service
public class BatchProcessor {

  @Autowired
  private TransactionTemplate transactionTemplate;

  public void processBatch(List<Item> items) {
    transactionTemplate.execute(status -> {
      try {
        items.forEach(this::processItem);
        return null;
      } catch (Exception e) {
        status.setRollbackOnly();
        throw e;
      }
    });
  }
}
// Output: Automatic transaction management with rollback on exception`
    },
    {
      name: 'Auto-Configuration',
      icon: '🚀',
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
      icon: '🚀',
      explanation: `Curated sets of dependencies for common use cases. spring-boot-starter-web includes Tomcat, Spring MVC, Jackson. spring-boot-starter-data-jpa includes Hibernate, Spring Data JPA. Eliminates version management complexity. Ensures compatible dependency versions.`,
      codeExample: `// pom.xml - Maven starter dependencies
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
      icon: '🚀',
      explanation: `Embedded Tomcat, Jetty, or Undertow. No need for separate application server deployment. Standalone executable JAR with java -jar command. Simplifies deployment and development. Easy containerization for Docker and Kubernetes.`,
      codeExample: `// Default embedded Tomcat (included in spring-boot-starter-web)
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
      icon: '🚀',
      explanation: `Production-ready features for monitoring and management. Health checks, metrics, info endpoints. JMX and HTTP exposure. Integration with Prometheus, Grafana. Custom endpoints and metrics support. Essential for microservices observability.`,
      codeExample: `// Add actuator dependency
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
      icon: '🚀',
      explanation: `Automatic application restart on code changes. LiveReload integration for browser refresh. Property defaults for development. Caching disabled in development. Faster development feedback loop.`,
      codeExample: `// Add DevTools dependency (automatically disabled in production)
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
      icon: '🚀',
      explanation: `@ConfigurationProperties for type-safe configuration. Externalized configuration via application.properties/yml. Profile-specific configurations. Environment variable overrides. Validation with JSR-303 annotations.`,
      codeExample: `// application.yml
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
    },
    {
      name: 'Spring Data JPA Complete Guide',
      icon: '💾',
      explanation: `Comprehensive Spring Data JPA implementation covering repository patterns, query methods, specifications, pagination, projections, and entity relationships for enterprise applications.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ 1. Entity Modeling with JPA Annotations
// ═══════════════════════════════════════════════════════════════════════════

@Entity
@Table(name = "users", indexes = {
  @Index(name = "idx_email", columnList = "email"),
  @Index(name = "idx_username", columnList = "username")
})
@EntityListeners(AuditingEntityListener.class)
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true, length = 100)
  private String username;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = false)
  private String password;

  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private UserRole role;

  @CreatedDate
  @Column(nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @LastModifiedDate
  private LocalDateTime updatedAt;

  @Version
  private Long version; // Optimistic locking

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Order> orders = new ArrayList<>();

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(
    name = "user_roles",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "role_id")
  )
  private Set<Role> roles = new HashSet<>();

  // Getters, setters, equals, hashCode
}

@Entity
@Table(name = "orders")
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private String orderNumber;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Enumerated(EnumType.STRING)
  private OrderStatus status;

  @Column(nullable = false, precision = 10, scale = 2)
  private BigDecimal totalAmount;

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<OrderItem> items = new ArrayList<>();

  private LocalDateTime orderDate;

  // Helper methods for bidirectional relationships
  public void addItem(OrderItem item) {
    items.add(item);
    item.setOrder(this);
  }

  public void removeItem(OrderItem item) {
    items.remove(item);
    item.setOrder(null);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 2. Repository Patterns and Query Methods
// ═══════════════════════════════════════════════════════════════════════════

public interface UserRepository extends JpaRepository<User, Long>,
                                         JpaSpecificationExecutor<User> {

  // Derived query methods - Spring generates implementation automatically
  Optional<User> findByUsername(String username);

  Optional<User> findByEmail(String email);

  List<User> findByRoleAndCreatedAtAfter(UserRole role, LocalDateTime date);

  // Complex query with multiple conditions
  List<User> findByUsernameContainingAndEmailContainingIgnoreCase(
    String username, String email);

  // Count and exists methods
  long countByRole(UserRole role);

  boolean existsByUsername(String username);

  boolean existsByEmail(String email);

  // Delete methods
  void deleteByUsername(String username);

  // Top/First queries
  List<User> findTop10ByOrderByCreatedAtDesc();

  User findFirstByOrderByCreatedAtAsc();

  // Custom JPQL queries
  @Query("SELECT u FROM User u WHERE u.email LIKE %:domain")
  List<User> findByEmailDomain(@Param("domain") String domain);

  @Query("SELECT u FROM User u JOIN FETCH u.orders WHERE u.id = :id")
  Optional<User> findByIdWithOrders(@Param("id") Long id);

  @Query(value = "SELECT * FROM users WHERE created_at > :date",
         nativeQuery = true)
  List<User> findUsersCreatedAfter(@Param("date") LocalDateTime date);

  // Modifying queries
  @Modifying
  @Query("UPDATE User u SET u.email = :email WHERE u.username = :username")
  int updateEmailByUsername(@Param("username") String username,
                            @Param("email") String email);

  @Modifying
  @Query("DELETE FROM User u WHERE u.createdAt < :date")
  void deleteOldUsers(@Param("date") LocalDateTime date);

  // Projection queries
  @Query("SELECT u.username as username, u.email as email FROM User u")
  List<UserSummary> findAllUserSummaries();

  // Stream for large datasets
  @QueryHints(@QueryHint(name = "org.hibernate.fetchSize", value = "50"))
  Stream<User> streamAllByRole(UserRole role);
}

// Interface-based projection
public interface UserSummary {
  String getUsername();
  String getEmail();
  LocalDateTime getCreatedAt();
}

// Class-based projection (DTO)
public class UserDTO {
  private String username;
  private String email;

  public UserDTO(String username, String email) {
    this.username = username;
    this.email = email;
  }
  // Getters and setters
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 3. Specifications for Dynamic Queries
// ═══════════════════════════════════════════════════════════════════════════

public class UserSpecifications {

  public static Specification<User> hasUsername(String username) {
    return (root, query, cb) ->
      username == null ? null : cb.equal(root.get("username"), username);
  }

  public static Specification<User> hasEmail(String email) {
    return (root, query, cb) ->
      email == null ? null : cb.equal(root.get("email"), email);
  }

  public static Specification<User> hasRole(UserRole role) {
    return (root, query, cb) ->
      role == null ? null : cb.equal(root.get("role"), role);
  }

  public static Specification<User> createdBetween(
      LocalDateTime start, LocalDateTime end) {
    return (root, query, cb) -> {
      if (start == null && end == null) return null;
      if (start == null) return cb.lessThanOrEqualTo(root.get("createdAt"), end);
      if (end == null) return cb.greaterThanOrEqualTo(root.get("createdAt"), start);
      return cb.between(root.get("createdAt"), start, end);
    };
  }

  public static Specification<User> emailContains(String emailPattern) {
    return (root, query, cb) ->
      emailPattern == null ? null :
      cb.like(cb.lower(root.get("email")),
              "%" + emailPattern.toLowerCase() + "%");
  }

  public static Specification<User> hasOrdersGreaterThan(int orderCount) {
    return (root, query, cb) -> {
      query.distinct(true);
      return cb.greaterThan(cb.size(root.get("orders")), orderCount);
    };
  }
}

@Service
public class UserSearchService {

  @Autowired
  private UserRepository userRepository;

  public List<User> searchUsers(UserSearchCriteria criteria) {
    // Build dynamic specification
    Specification<User> spec = Specification.where(null);

    if (criteria.getUsername() != null) {
      spec = spec.and(UserSpecifications.hasUsername(criteria.getUsername()));
    }

    if (criteria.getEmail() != null) {
      spec = spec.and(UserSpecifications.hasEmail(criteria.getEmail()));
    }

    if (criteria.getRole() != null) {
      spec = spec.and(UserSpecifications.hasRole(criteria.getRole()));
    }

    if (criteria.getStartDate() != null || criteria.getEndDate() != null) {
      spec = spec.and(UserSpecifications.createdBetween(
        criteria.getStartDate(), criteria.getEndDate()));
    }

    return userRepository.findAll(spec);
  }

  public Page<User> searchUsersWithPagination(
      UserSearchCriteria criteria, Pageable pageable) {
    Specification<User> spec = buildSpecification(criteria);
    return userRepository.findAll(spec, pageable);
  }

  private Specification<User> buildSpecification(UserSearchCriteria criteria) {
    return Specification.where(UserSpecifications.hasUsername(criteria.getUsername()))
      .and(UserSpecifications.hasEmail(criteria.getEmail()))
      .and(UserSpecifications.hasRole(criteria.getRole()))
      .and(UserSpecifications.createdBetween(
        criteria.getStartDate(), criteria.getEndDate()));
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 4. Pagination and Sorting
// ═══════════════════════════════════════════════════════════════════════════

@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  private UserRepository userRepository;

  // Basic pagination
  @GetMapping
  public Page<User> getAllUsers(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {

    Pageable pageable = PageRequest.of(page, size);
    return userRepository.findAll(pageable);
  }

  // Pagination with sorting
  @GetMapping("/sorted")
  public Page<User> getUsersSorted(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      @RequestParam(defaultValue = "id") String sortBy,
      @RequestParam(defaultValue = "ASC") String direction) {

    Sort.Direction sortDirection = Sort.Direction.fromString(direction);
    Pageable pageable = PageRequest.of(page, size,
                                       Sort.by(sortDirection, sortBy));
    return userRepository.findAll(pageable);
  }

  // Multiple sort fields
  @GetMapping("/multi-sort")
  public Page<User> getUsersMultiSort(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {

    Sort sort = Sort.by(
      Sort.Order.desc("createdAt"),
      Sort.Order.asc("username")
    );
    Pageable pageable = PageRequest.of(page, size, sort);
    return userRepository.findAll(pageable);
  }

  // Custom pageable with search
  @GetMapping("/search")
  public Page<User> searchUsers(
      @RequestParam(required = false) String username,
      @RequestParam(required = false) String email,
      @RequestParam(required = false) UserRole role,
      Pageable pageable) {

    Specification<User> spec = Specification.where(null);

    if (username != null) {
      spec = spec.and(UserSpecifications.hasUsername(username));
    }
    if (email != null) {
      spec = spec.and(UserSpecifications.emailContains(email));
    }
    if (role != null) {
      spec = spec.and(UserSpecifications.hasRole(role));
    }

    return userRepository.findAll(spec, pageable);
  }
}

// Using in service layer
@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public PaginatedResponse<UserDTO> getAllUsersWithPagination(
      int page, int size, String sortBy) {

    Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
    Page<User> userPage = userRepository.findAll(pageable);

    List<UserDTO> userDTOs = userPage.getContent().stream()
      .map(this::convertToDTO)
      .collect(Collectors.toList());

    return new PaginatedResponse<>(
      userDTOs,
      userPage.getNumber(),
      userPage.getSize(),
      userPage.getTotalElements(),
      userPage.getTotalPages(),
      userPage.isFirst(),
      userPage.isLast()
    );
  }

  private UserDTO convertToDTO(User user) {
    return new UserDTO(user.getUsername(), user.getEmail());
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 5. Custom Repository Implementation
// ═══════════════════════════════════════════════════════════════════════════

// Custom repository interface
public interface UserRepositoryCustom {
  List<User> findUsersWithCustomLogic(String criteria);
  void bulkUpdateUsers(List<Long> userIds, UserRole newRole);
}

// Implementation (must be named <InterfaceName>Impl)
@Repository
public class UserRepositoryImpl implements UserRepositoryCustom {

  @PersistenceContext
  private EntityManager entityManager;

  @Override
  public List<User> findUsersWithCustomLogic(String criteria) {
    CriteriaBuilder cb = entityManager.getCriteriaBuilder();
    CriteriaQuery<User> query = cb.createQuery(User.class);
    Root<User> root = query.from(User.class);

    // Complex criteria logic
    Predicate predicate = cb.or(
      cb.like(root.get("username"), "%" + criteria + "%"),
      cb.like(root.get("email"), "%" + criteria + "%")
    );

    query.where(predicate);
    query.orderBy(cb.desc(root.get("createdAt")));

    return entityManager.createQuery(query)
      .setMaxResults(100)
      .getResultList();
  }

  @Override
  @Transactional
  public void bulkUpdateUsers(List<Long> userIds, UserRole newRole) {
    String jpql = "UPDATE User u SET u.role = :role WHERE u.id IN :ids";
    entityManager.createQuery(jpql)
      .setParameter("role", newRole)
      .setParameter("ids", userIds)
      .executeUpdate();
  }
}

// Extended repository interface
public interface UserRepository extends JpaRepository<User, Long>,
                                         JpaSpecificationExecutor<User>,
                                         UserRepositoryCustom {
  // Standard repository methods + custom methods
}`
    },
    {
      name: 'Spring MVC Complete Guide',
      icon: '🎨',
      explanation: `Comprehensive Spring MVC implementation covering controllers, request mapping, validation, exception handling, interceptors, and RESTful API design patterns.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ 1. Advanced Controller Patterns with Request Mapping
// ═══════════════════════════════════════════════════════════════════════════

@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin(origins = "http://localhost:3000")
@Validated
public class ProductController {

  @Autowired
  private ProductService productService;

  // Basic GET with path variable
  @GetMapping("/{id}")
  public ResponseEntity<ProductDTO> getProduct(@PathVariable Long id) {
    ProductDTO product = productService.findById(id);
    return ResponseEntity.ok(product);
  }

  // GET with multiple request parameters
  @GetMapping
  public ResponseEntity<Page<ProductDTO>> getAllProducts(
      @RequestParam(required = false) String category,
      @RequestParam(required = false) String search,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "20") int size,
      @RequestParam(defaultValue = "id,asc") String[] sort) {

    Pageable pageable = PageRequest.of(page, size,
                                       Sort.by(parseSortParams(sort)));
    Page<ProductDTO> products = productService.findAll(
      category, search, pageable);
    return ResponseEntity.ok(products);
  }

  // POST with request body validation
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ResponseEntity<ProductDTO> createProduct(
      @Valid @RequestBody CreateProductRequest request,
      BindingResult bindingResult) {

    if (bindingResult.hasErrors()) {
      throw new ValidationException(bindingResult);
    }

    ProductDTO created = productService.create(request);
    URI location = ServletUriComponentsBuilder
      .fromCurrentRequest()
      .path("/{id}")
      .buildAndExpand(created.getId())
      .toUri();

    return ResponseEntity.created(location).body(created);
  }

  // PUT for full update
  @PutMapping("/{id}")
  public ResponseEntity<ProductDTO> updateProduct(
      @PathVariable Long id,
      @Valid @RequestBody UpdateProductRequest request) {

    ProductDTO updated = productService.update(id, request);
    return ResponseEntity.ok(updated);
  }

  // PATCH for partial update
  @PatchMapping("/{id}")
  public ResponseEntity<ProductDTO> partialUpdateProduct(
      @PathVariable Long id,
      @RequestBody Map<String, Object> updates) {

    ProductDTO updated = productService.partialUpdate(id, updates);
    return ResponseEntity.ok(updated);
  }

  // DELETE
  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
    productService.delete(id);
    return ResponseEntity.noContent().build();
  }

  // Custom action endpoint
  @PostMapping("/{id}/publish")
  public ResponseEntity<ProductDTO> publishProduct(
      @PathVariable Long id,
      @RequestHeader("X-User-Id") Long userId) {

    ProductDTO published = productService.publish(id, userId);
    return ResponseEntity.ok(published);
  }

  // File upload
  @PostMapping("/{id}/image")
  public ResponseEntity<String> uploadProductImage(
      @PathVariable Long id,
      @RequestParam("file") MultipartFile file) {

    if (file.isEmpty()) {
      return ResponseEntity.badRequest()
        .body("Please select a file to upload");
    }

    String imageUrl = productService.uploadImage(id, file);
    return ResponseEntity.ok(imageUrl);
  }

  // Content negotiation - XML and JSON
  @GetMapping(value = "/{id}", produces = {
    MediaType.APPLICATION_JSON_VALUE,
    MediaType.APPLICATION_XML_VALUE
  })
  public ResponseEntity<ProductDTO> getProductWithContentNegotiation(
      @PathVariable Long id) {
    return ResponseEntity.ok(productService.findById(id));
  }

  private Sort.Order[] parseSortParams(String[] sort) {
    return Arrays.stream(sort)
      .map(s -> {
        String[] parts = s.split(",");
        return Sort.Order.by(parts[0])
          .with(Sort.Direction.fromString(parts.length > 1 ? parts[1] : "asc"));
      })
      .toArray(Sort.Order[]::new);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 2. Request/Response DTOs with Validation
// ═══════════════════════════════════════════════════════════════════════════

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateProductRequest {

  @NotBlank(message = "Product name is required")
  @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
  private String name;

  @NotBlank(message = "Description is required")
  @Size(max = 500)
  private String description;

  @NotNull(message = "Price is required")
  @DecimalMin(value = "0.01", message = "Price must be greater than 0")
  @Digits(integer = 10, fraction = 2)
  private BigDecimal price;

  @NotNull
  @Min(0)
  private Integer stockQuantity;

  @NotBlank
  @Pattern(regexp = "^[A-Z]{3,10}$", message = "Invalid category code")
  private String categoryCode;

  @Email(message = "Invalid email format")
  private String contactEmail;

  @Valid
  @NotEmpty(message = "At least one specification is required")
  private List<ProductSpecification> specifications;
}

@Data
public class ProductSpecification {

  @NotBlank
  private String key;

  @NotBlank
  private String value;
}

// Custom validator annotation
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PriceRangeValidator.class)
public @interface ValidPriceRange {
  String message() default "Price is out of valid range";
  Class<?>[] groups() default {};
  Class<? extends Payload>[] payload() default {};
  double min() default 0.0;
  double max() default Double.MAX_VALUE;
}

public class PriceRangeValidator
    implements ConstraintValidator<ValidPriceRange, BigDecimal> {

  private double min;
  private double max;

  @Override
  public void initialize(ValidPriceRange constraint) {
    this.min = constraint.min();
    this.max = constraint.max();
  }

  @Override
  public boolean isValid(BigDecimal value,
                         ConstraintValidatorContext context) {
    if (value == null) return true;
    double doubleValue = value.doubleValue();
    return doubleValue >= min && doubleValue <= max;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 3. Global Exception Handling
// ═══════════════════════════════════════════════════════════════════════════

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class GlobalExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public ErrorResponse handleResourceNotFound(
      ResourceNotFoundException ex, WebRequest request) {

    return ErrorResponse.builder()
      .timestamp(LocalDateTime.now())
      .status(HttpStatus.NOT_FOUND.value())
      .error("Not Found")
      .message(ex.getMessage())
      .path(request.getDescription(false).replace("uri=", ""))
      .build();
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ValidationErrorResponse handleValidationExceptions(
      MethodArgumentNotValidException ex) {

    Map<String, String> errors = new HashMap<>();
    ex.getBindingResult().getAllErrors().forEach(error -> {
      String fieldName = ((FieldError) error).getField();
      String errorMessage = error.getDefaultMessage();
      errors.put(fieldName, errorMessage);
    });

    return ValidationErrorResponse.builder()
      .timestamp(LocalDateTime.now())
      .status(HttpStatus.BAD_REQUEST.value())
      .error("Validation Failed")
      .validationErrors(errors)
      .build();
  }

  @ExceptionHandler(ConstraintViolationException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ValidationErrorResponse handleConstraintViolation(
      ConstraintViolationException ex) {

    Map<String, String> errors = new HashMap<>();
    ex.getConstraintViolations().forEach(violation -> {
      String propertyPath = violation.getPropertyPath().toString();
      String message = violation.getMessage();
      errors.put(propertyPath, message);
    });

    return ValidationErrorResponse.builder()
      .timestamp(LocalDateTime.now())
      .status(HttpStatus.BAD_REQUEST.value())
      .error("Constraint Violation")
      .validationErrors(errors)
      .build();
  }

  @ExceptionHandler(DataIntegrityViolationException.class)
  @ResponseStatus(HttpStatus.CONFLICT)
  public ErrorResponse handleDataIntegrityViolation(
      DataIntegrityViolationException ex) {

    return ErrorResponse.builder()
      .timestamp(LocalDateTime.now())
      .status(HttpStatus.CONFLICT.value())
      .error("Data Integrity Violation")
      .message("Database constraint violation occurred")
      .build();
  }

  @ExceptionHandler(AccessDeniedException.class)
  @ResponseStatus(HttpStatus.FORBIDDEN)
  public ErrorResponse handleAccessDenied(AccessDeniedException ex) {
    return ErrorResponse.builder()
      .timestamp(LocalDateTime.now())
      .status(HttpStatus.FORBIDDEN.value())
      .error("Access Denied")
      .message("You don't have permission to access this resource")
      .build();
  }

  @ExceptionHandler(Exception.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public ErrorResponse handleGlobalException(
      Exception ex, WebRequest request) {

    log.error("Unexpected error occurred", ex);

    return ErrorResponse.builder()
      .timestamp(LocalDateTime.now())
      .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
      .error("Internal Server Error")
      .message("An unexpected error occurred")
      .path(request.getDescription(false).replace("uri=", ""))
      .build();
  }
}

@Data
@Builder
public class ErrorResponse {
  private LocalDateTime timestamp;
  private int status;
  private String error;
  private String message;
  private String path;
}

@Data
@Builder
public class ValidationErrorResponse {
  private LocalDateTime timestamp;
  private int status;
  private String error;
  private Map<String, String> validationErrors;
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 4. Interceptors and Filters
// ═══════════════════════════════════════════════════════════════════════════

@Component
public class RequestLoggingInterceptor implements HandlerInterceptor {

  private static final Logger log =
    LoggerFactory.getLogger(RequestLoggingInterceptor.class);

  @Override
  public boolean preHandle(HttpServletRequest request,
                          HttpServletResponse response,
                          Object handler) throws Exception {

    long startTime = System.currentTimeMillis();
    request.setAttribute("startTime", startTime);

    log.info("Request URL: {} {}", request.getMethod(), request.getRequestURI());
    log.info("Client IP: {}", request.getRemoteAddr());

    return true;
  }

  @Override
  public void postHandle(HttpServletRequest request,
                        HttpServletResponse response,
                        Object handler,
                        ModelAndView modelAndView) throws Exception {

    long startTime = (Long) request.getAttribute("startTime");
    long endTime = System.currentTimeMillis();
    long executeTime = endTime - startTime;

    log.info("Request completed in {}ms", executeTime);
  }

  @Override
  public void afterCompletion(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler,
                             Exception ex) throws Exception {

    if (ex != null) {
      log.error("Request failed with exception", ex);
    }
  }
}

@Component
@Order(1)
public class AuthenticationFilter extends OncePerRequestFilter {

  @Autowired
  private JwtTokenProvider tokenProvider;

  @Override
  protected void doFilterInternal(HttpServletRequest request,
                                 HttpServletResponse response,
                                 FilterChain filterChain)
      throws ServletException, IOException {

    String jwt = extractJwtFromRequest(request);

    if (jwt != null && tokenProvider.validateToken(jwt)) {
      String userId = tokenProvider.getUserIdFromToken(jwt);

      UsernamePasswordAuthenticationToken authentication =
        new UsernamePasswordAuthenticationToken(userId, null, null);

      SecurityContextHolder.getContext()
        .setAuthentication(authentication);
    }

    filterChain.doFilter(request, response);
  }

  private String extractJwtFromRequest(HttpServletRequest request) {
    String bearerToken = request.getHeader("Authorization");
    if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
      return bearerToken.substring(7);
    }
    return null;
  }
}

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

  @Autowired
  private RequestLoggingInterceptor loggingInterceptor;

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(loggingInterceptor)
      .addPathPatterns("/api/**")
      .excludePathPatterns("/api/auth/**", "/api/public/**");
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**")
      .allowedOrigins("http://localhost:3000", "https://example.com")
      .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
      .allowedHeaders("*")
      .allowCredentials(true)
      .maxAge(3600);
  }

  @Override
  public void configureMessageConverters(
      List<HttpMessageConverter<?>> converters) {
    // Custom JSON converter with Jackson
    MappingJackson2HttpMessageConverter jsonConverter =
      new MappingJackson2HttpMessageConverter();
    jsonConverter.setObjectMapper(objectMapper());
    converters.add(jsonConverter);
  }

  @Bean
  public ObjectMapper objectMapper() {
    ObjectMapper mapper = new ObjectMapper();
    mapper.registerModule(new JavaTimeModule());
    mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    return mapper;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 5. Async Request Processing and SSE
// ═══════════════════════════════════════════════════════════════════════════

@RestController
@RequestMapping("/api/async")
public class AsyncController {

  @Autowired
  private AsyncService asyncService;

  // Async request processing with CompletableFuture
  @GetMapping("/process/{id}")
  public CompletableFuture<ResponseEntity<ProcessResult>> processAsync(
      @PathVariable Long id) {

    return asyncService.processData(id)
      .thenApply(result -> ResponseEntity.ok(result))
      .exceptionally(ex -> {
        log.error("Async processing failed", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .build();
      });
  }

  // Server-Sent Events (SSE)
  @GetMapping(value = "/events", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public SseEmitter streamEvents() {
    SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);

    CompletableFuture.runAsync(() -> {
      try {
        for (int i = 0; i < 10; i++) {
          SseEmitter.SseEventBuilder event = SseEmitter.event()
            .data("Event " + i)
            .id(String.valueOf(i))
            .name("message");

          emitter.send(event);
          Thread.sleep(1000);
        }
        emitter.complete();
      } catch (Exception e) {
        emitter.completeWithError(e);
      }
    });

    return emitter;
  }

  // DeferredResult for long polling
  @GetMapping("/long-poll/{id}")
  public DeferredResult<ResponseEntity<String>> longPoll(
      @PathVariable String id) {

    DeferredResult<ResponseEntity<String>> deferredResult =
      new DeferredResult<>(30000L);

    deferredResult.onTimeout(() ->
      deferredResult.setResult(
        ResponseEntity.status(HttpStatus.REQUEST_TIMEOUT)
          .body("Request timeout")));

    asyncService.processlongPollingRequest(id, deferredResult);

    return deferredResult;
  }
}

@Service
public class AsyncService {

  @Async("taskExecutor")
  public CompletableFuture<ProcessResult> processData(Long id) {
    // Simulate long-running task
    try {
      Thread.sleep(5000);
      ProcessResult result = new ProcessResult(id, "Completed");
      return CompletableFuture.completedFuture(result);
    } catch (InterruptedException e) {
      return CompletableFuture.failedFuture(e);
    }
  }

  public void processlongPollingRequest(
      String id, DeferredResult<ResponseEntity<String>> deferredResult) {

    CompletableFuture.runAsync(() -> {
      try {
        Thread.sleep(2000);
        deferredResult.setResult(
          ResponseEntity.ok("Data for " + id));
      } catch (InterruptedException e) {
        deferredResult.setErrorResult(e);
      }
    });
  }
}

@Configuration
@EnableAsync
public class AsyncConfig {

  @Bean(name = "taskExecutor")
  public Executor taskExecutor() {
    ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
    executor.setCorePoolSize(5);
    executor.setMaxPoolSize(10);
    executor.setQueueCapacity(100);
    executor.setThreadNamePrefix("async-");
    executor.initialize();
    return executor;
  }
}`
    },
    {
      name: 'Spring Security Complete Guide',
      icon: '🔒',
      explanation: `Comprehensive Spring Security implementation covering authentication, authorization, JWT tokens, OAuth2, password encoding, and method-level security for enterprise applications.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ 1. Basic Authentication & Authorization Configuration
// ═══════════════════════════════════════════════════════════════════════════

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

  @Autowired
  private UserDetailsService userDetailsService;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .csrf(csrf -> csrf.disable()) // Disable for REST APIs
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/public/**").permitAll()
        .requestMatchers("/api/admin/**").hasRole("ADMIN")
        .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN")
        .anyRequest().authenticated()
      )
      .httpBasic(Customizer.withDefaults())
      .sessionManagement(session -> session
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      );

    return http.build();
  }

  @Bean
  public AuthenticationManager authenticationManager(
      AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(12); // Strength 12
  }
}

// Custom UserDetailsService implementation
@Service
public class CustomUserDetailsService implements UserDetailsService {

  @Autowired
  private UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username)
      throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username)
      .orElseThrow(() -> new UsernameNotFoundException(
        "User not found: " + username));

    return org.springframework.security.core.userdetails.User
      .withUsername(user.getUsername())
      .password(user.getPassword())
      .roles(user.getRole().name())
      .accountExpired(false)
      .accountLocked(false)
      .credentialsExpired(false)
      .disabled(false)
      .build();
  }
}
// Output: Basic auth with username/password, role-based access control

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 2. JWT Token Generation & Validation
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class JwtService {

  @Value("\${jwt.secret}")
  private String secret;

  @Value("\${jwt.expiration}")
  private Long expiration; // milliseconds

  public String generateToken(UserDetails userDetails) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("roles", userDetails.getAuthorities().stream()
      .map(GrantedAuthority::getAuthority)
      .collect(Collectors.toList()));

    return Jwts.builder()
      .setClaims(claims)
      .setSubject(userDetails.getUsername())
      .setIssuedAt(new Date())
      .setExpiration(new Date(System.currentTimeMillis() + expiration))
      .signWith(getSigningKey(), SignatureAlgorithm.HS256)
      .compact();
  }

  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  public Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  private Claims extractAllClaims(String token) {
    return Jwts.parserBuilder()
      .setSigningKey(getSigningKey())
      .build()
      .parseClaimsJws(token)
      .getBody();
  }

  private Key getSigningKey() {
    byte[] keyBytes = Decoders.BASE64.decode(secret);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  public Boolean isTokenValid(String token, UserDetails userDetails) {
    final String username = extractUsername(token);
    return (username.equals(userDetails.getUsername())
        && !isTokenExpired(token));
  }

  private Boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }
}

// JWT Authentication Filter
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  @Autowired
  private JwtService jwtService;

  @Autowired
  private UserDetailsService userDetailsService;

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

    if (username != null && SecurityContextHolder.getContext()
        .getAuthentication() == null) {
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
// Output: JWT-based stateless authentication with token validation

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 3. Method-Level Security with @PreAuthorize
// ═══════════════════════════════════════════════════════════════════════════

@RestController
@RequestMapping("/api/products")
public class ProductController {

  @Autowired
  private ProductService productService;

  // Role-based authorization
  @GetMapping
  @PreAuthorize("hasRole('USER')")
  public List<Product> getAllProducts() {
    return productService.findAll();
  }

  // Multiple roles
  @PostMapping
  @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
  public Product createProduct(@RequestBody Product product) {
    return productService.save(product);
  }

  // Custom SpEL expression
  @PutMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN') or @productSecurity.isOwner(#id)")
  public Product updateProduct(@PathVariable Long id,
                                @RequestBody Product product) {
    return productService.update(id, product);
  }

  // Method parameter security
  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public void deleteProduct(@PathVariable Long id) {
    productService.delete(id);
  }

  // Post-authorization check
  @GetMapping("/{id}")
  @PostAuthorize("returnObject.ownerId == authentication.principal.id or hasRole('ADMIN')")
  public Product getProduct(@PathVariable Long id) {
    return productService.findById(id);
  }

  // Method-level filtering
  @GetMapping("/my-products")
  @PostFilter("filterObject.ownerId == authentication.principal.id")
  public List<Product> getMyProducts() {
    return productService.findAll();
  }
}

// Custom security service
@Service
public class ProductSecurity {

  @Autowired
  private ProductRepository productRepository;

  public boolean isOwner(Long productId) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    String username = auth.getName();

    return productRepository.findById(productId)
      .map(product -> product.getOwner().getUsername().equals(username))
      .orElse(false);
  }
}
// Output: Fine-grained method-level authorization with SpEL expressions

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 4. OAuth2 Resource Server Configuration
// ═══════════════════════════════════════════════════════════════════════════

// application.yml
/*
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: https://auth.example.com/realms/myapp
          jwk-set-uri: https://auth.example.com/realms/myapp/protocol/openid-connect/certs
*/

@Configuration
@EnableWebSecurity
public class OAuth2ResourceServerConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/public/**").permitAll()
        .anyRequest().authenticated()
      )
      .oauth2ResourceServer(oauth2 -> oauth2
        .jwt(jwt -> jwt
          .jwtAuthenticationConverter(jwtAuthenticationConverter())
        )
      );

    return http.build();
  }

  @Bean
  public JwtAuthenticationConverter jwtAuthenticationConverter() {
    JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter =
      new JwtGrantedAuthoritiesConverter();
    grantedAuthoritiesConverter.setAuthoritiesClaimName("roles");
    grantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");

    JwtAuthenticationConverter jwtAuthenticationConverter =
      new JwtAuthenticationConverter();
    jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(
      grantedAuthoritiesConverter);

    return jwtAuthenticationConverter;
  }
}

// OAuth2 Client Configuration
@Configuration
@EnableWebSecurity
public class OAuth2ClientConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .authorizeHttpRequests(auth -> auth
        .anyRequest().authenticated()
      )
      .oauth2Login(oauth2 -> oauth2
        .loginPage("/login")
        .defaultSuccessUrl("/dashboard")
        .failureUrl("/login?error")
        .userInfoEndpoint(userInfo -> userInfo
          .userService(oauth2UserService())
        )
      );

    return http.build();
  }

  @Bean
  public OAuth2UserService<OAuth2UserRequest, OAuth2User> oauth2UserService() {
    DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();

    return userRequest -> {
      OAuth2User oauth2User = delegate.loadUser(userRequest);

      // Custom user processing
      String email = oauth2User.getAttribute("email");
      String name = oauth2User.getAttribute("name");

      // Save or update user in database
      // Return custom OAuth2User implementation

      return oauth2User;
    };
  }
}
// Output: OAuth2 resource server with JWT validation and client support

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 5. Password Encoding & User Details Service
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  // User registration with password encoding
  public User registerUser(UserRegistrationDto dto) {
    if (userRepository.existsByUsername(dto.getUsername())) {
      throw new DuplicateUserException("Username already exists");
    }

    User user = new User();
    user.setUsername(dto.getUsername());
    user.setEmail(dto.getEmail());
    user.setPassword(passwordEncoder.encode(dto.getPassword()));
    user.setRole(UserRole.USER);
    user.setEnabled(true);

    return userRepository.save(user);
  }

  // Password change with validation
  public void changePassword(String username, String oldPassword,
                             String newPassword) {
    User user = userRepository.findByUsername(username)
      .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
      throw new BadCredentialsException("Invalid old password");
    }

    user.setPassword(passwordEncoder.encode(newPassword));
    userRepository.save(user);
  }

  // Password reset with token
  public void resetPassword(String token, String newPassword) {
    PasswordResetToken resetToken = tokenRepository.findByToken(token)
      .orElseThrow(() -> new InvalidTokenException("Invalid reset token"));

    if (resetToken.isExpired()) {
      throw new InvalidTokenException("Token expired");
    }

    User user = resetToken.getUser();
    user.setPassword(passwordEncoder.encode(newPassword));
    userRepository.save(user);

    tokenRepository.delete(resetToken);
  }
}

// Advanced password encoder configuration
@Configuration
public class PasswordEncoderConfig {

  @Bean
  public PasswordEncoder passwordEncoder() {
    // Delegating encoder for algorithm migration
    String idForEncode = "bcrypt";
    Map<String, PasswordEncoder> encoders = new HashMap<>();

    encoders.put("bcrypt", new BCryptPasswordEncoder(12));
    encoders.put("scrypt", SCryptPasswordEncoder.defaultsForSpringSecurity_v5_8());
    encoders.put("argon2", Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8());
    encoders.put("pbkdf2", Pbkdf2PasswordEncoder.defaultsForSpringSecurity_v5_8());

    return new DelegatingPasswordEncoder(idForEncode, encoders);
  }
}

// Custom authentication provider
@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

  @Autowired
  private UserDetailsService userDetailsService;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Override
  public Authentication authenticate(Authentication authentication)
      throws AuthenticationException {
    String username = authentication.getName();
    String password = authentication.getCredentials().toString();

    UserDetails userDetails = userDetailsService.loadUserByUsername(username);

    if (!passwordEncoder.matches(password, userDetails.getPassword())) {
      throw new BadCredentialsException("Invalid credentials");
    }

    // Additional checks (account locked, expired, etc.)
    if (!userDetails.isAccountNonLocked()) {
      throw new LockedException("Account is locked");
    }

    return new UsernamePasswordAuthenticationToken(
      userDetails, password, userDetails.getAuthorities());
  }

  @Override
  public boolean supports(Class<?> authentication) {
    return UsernamePasswordAuthenticationToken.class
      .isAssignableFrom(authentication);
  }
}

// User entity with security fields
@Entity
@Table(name = "users")
public class User implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true, nullable = false)
  private String username;

  @Column(nullable = false)
  private String password;

  @Column(unique = true, nullable = false)
  private String email;

  @Enumerated(EnumType.STRING)
  private UserRole role;

  private boolean enabled = true;
  private boolean accountNonExpired = true;
  private boolean accountNonLocked = true;
  private boolean credentialsNonExpired = true;

  @Column(name = "failed_login_attempts")
  private int failedLoginAttempts = 0;

  @Column(name = "locked_until")
  private LocalDateTime lockedUntil;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.singletonList(
      new SimpleGrantedAuthority("ROLE_" + role.name()));
  }

  // Getters and setters
}
// Output: Secure password encoding with multiple algorithms and account management`
    },
    {
      name: 'Spring Cloud Complete Guide',
      icon: '☁️',
      explanation: `Comprehensive Spring Cloud implementation covering service discovery with Eureka, centralized configuration, API gateway routing, circuit breakers, and load balancing for microservices.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ 1. Eureka Service Discovery (Client & Server)
// ═══════════════════════════════════════════════════════════════════════════

// Eureka Server Configuration
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {
  public static void main(String[] args) {
    SpringApplication.run(EurekaServerApplication.class, args);
  }
}

// application.yml for Eureka Server
/*
server:
  port: 8761

eureka:
  instance:
    hostname: localhost
  client:
    register-with-eureka: false
    fetch-registry: false
    service-url:
      defaultZone: http://\${eureka.instance.hostname}:\${server.port}/eureka/
  server:
    enable-self-preservation: false
    eviction-interval-timer-in-ms: 4000
*/

// pom.xml dependency
/*
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
*/

// Eureka Client Configuration
@SpringBootApplication
@EnableDiscoveryClient
public class ProductServiceApplication {
  public static void main(String[] args) {
    SpringApplication.run(ProductServiceApplication.class, args);
  }
}

// application.yml for Eureka Client
/*
server:
  port: 8081

spring:
  application:
    name: product-service

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
    register-with-eureka: true
    fetch-registry: true
  instance:
    instance-id: \${spring.application.name}:\${spring.application.instance_id:\${random.value}}
    prefer-ip-address: true
    lease-renewal-interval-in-seconds: 30
    lease-expiration-duration-in-seconds: 90
*/

// Service communication using service name
@RestController
@RequestMapping("/api/products")
public class ProductController {

  @Autowired
  private RestTemplate restTemplate;

  @Autowired
  private DiscoveryClient discoveryClient;

  @GetMapping("/{id}/orders")
  public List<Order> getProductOrders(@PathVariable Long id) {
    // Using service name instead of hardcoded URL
    String url = "http://order-service/api/orders/product/" + id;
    return restTemplate.exchange(
      url,
      HttpMethod.GET,
      null,
      new ParameterizedTypeReference<List<Order>>() {}
    ).getBody();
  }

  @GetMapping("/services")
  public List<String> getRegisteredServices() {
    return discoveryClient.getServices();
  }

  @GetMapping("/instances/{serviceName}")
  public List<ServiceInstance> getServiceInstances(
      @PathVariable String serviceName) {
    return discoveryClient.getInstances(serviceName);
  }
}

// RestTemplate with Load Balancing
@Configuration
public class RestTemplateConfig {

  @Bean
  @LoadBalanced
  public RestTemplate restTemplate() {
    return new RestTemplate();
  }
}
// Output: Service discovery with automatic registration and health monitoring

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 2. Config Server & Client Configuration
// ═══════════════════════════════════════════════════════════════════════════

// Config Server Setup
@SpringBootApplication
@EnableConfigServer
public class ConfigServerApplication {
  public static void main(String[] args) {
    SpringApplication.run(ConfigServerApplication.class, args);
  }
}

// application.yml for Config Server
/*
server:
  port: 8888

spring:
  application:
    name: config-server
  cloud:
    config:
      server:
        git:
          uri: https://github.com/myorg/config-repo
          clone-on-start: true
          default-label: main
          search-paths: '{application}'
        # Or use native file system
        native:
          search-locations: classpath:/config,file:///\${user.home}/config-repo
  profiles:
    active: native # or 'git'

encrypt:
  key: mySecretEncryptionKey123
*/

// Config Client Setup
@SpringBootApplication
@RefreshScope
public class UserServiceApplication {
  public static void main(String[] args) {
    SpringApplication.run(UserServiceApplication.class, args);
  }
}

// bootstrap.yml (loads before application.yml)
/*
spring:
  application:
    name: user-service
  cloud:
    config:
      uri: http://localhost:8888
      fail-fast: true
      retry:
        initial-interval: 1000
        max-attempts: 6
        max-interval: 2000
        multiplier: 1.1
  profiles:
    active: dev
*/

// Using configuration properties
@RestController
@RefreshScope
public class ConfigController {

  @Value("\${app.message:Default Message}")
  private String message;

  @Value("\${app.feature.enabled:false}")
  private boolean featureEnabled;

  @Autowired
  private Environment env;

  @GetMapping("/config")
  public Map<String, Object> getConfig() {
    Map<String, Object> config = new HashMap<>();
    config.put("message", message);
    config.put("featureEnabled", featureEnabled);
    config.put("profile", env.getActiveProfiles());
    return config;
  }
}

// Encrypted properties in config repo
/*
# application-prod.yml in Git repo
spring:
  datasource:
    url: jdbc:postgresql://prod-db:5432/myapp
    username: admin
    password: '{cipher}AQBxxx...' # Encrypted value

app:
  api:
    key: '{cipher}AQCyyy...' # Encrypted API key
*/

// Refresh configuration without restart
@RestController
public class RefreshController {

  @Autowired
  private ApplicationContext context;

  @PostMapping("/actuator/refresh")
  public Set<String> refresh() {
    RefreshScope refreshScope = context.getBean(RefreshScope.class);
    refreshScope.refreshAll();
    return Set.of("Configuration refreshed");
  }
}

// Enable actuator for refresh endpoint
/*
management:
  endpoints:
    web:
      exposure:
        include: refresh,health,info
*/
// Output: Centralized configuration with Git backend and automatic refresh

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 3. Resilience4j Circuit Breaker
// ═══════════════════════════════════════════════════════════════════════════

// pom.xml dependencies
/*
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-circuitbreaker-resilience4j</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
*/

// application.yml configuration
/*
resilience4j:
  circuitbreaker:
    instances:
      orderService:
        register-health-indicator: true
        sliding-window-size: 10
        minimum-number-of-calls: 5
        permitted-number-of-calls-in-half-open-state: 3
        wait-duration-in-open-state: 10s
        failure-rate-threshold: 50
        slow-call-rate-threshold: 100
        slow-call-duration-threshold: 2s
        automatic-transition-from-open-to-half-open-enabled: true
  retry:
    instances:
      orderService:
        max-attempts: 3
        wait-duration: 1s
        enable-exponential-backoff: true
        exponential-backoff-multiplier: 2
  bulkhead:
    instances:
      orderService:
        max-concurrent-calls: 10
        max-wait-duration: 0
  ratelimiter:
    instances:
      orderService:
        limit-for-period: 100
        limit-refresh-period: 1s
        timeout-duration: 0
*/

// Circuit Breaker implementation
@Service
public class OrderService {

  @Autowired
  private RestTemplate restTemplate;

  @CircuitBreaker(name = "orderService", fallbackMethod = "getOrdersFallback")
  @Retry(name = "orderService")
  @RateLimiter(name = "orderService")
  @Bulkhead(name = "orderService")
  public List<Order> getOrders(Long userId) {
    String url = "http://order-service/api/orders/user/" + userId;
    ResponseEntity<List<Order>> response = restTemplate.exchange(
      url,
      HttpMethod.GET,
      null,
      new ParameterizedTypeReference<List<Order>>() {}
    );
    return response.getBody();
  }

  // Fallback method with same signature + Throwable
  public List<Order> getOrdersFallback(Long userId, Throwable throwable) {
    // Log the error
    System.err.println("Fallback triggered: " + throwable.getMessage());

    // Return cached data or default response
    return Collections.emptyList();
  }

  // Alternative fallback with custom logic
  public List<Order> getOrdersFallback(Long userId, Exception exception) {
    // Check cache
    List<Order> cachedOrders = getCachedOrders(userId);
    if (cachedOrders != null) {
      return cachedOrders;
    }

    // Return empty list with error indicator
    return new ArrayList<>();
  }

  private List<Order> getCachedOrders(Long userId) {
    // Implement caching logic
    return null;
  }
}

// Circuit Breaker events monitoring
@Component
public class CircuitBreakerEventListener {

  @EventListener
  public void onCircuitBreakerEvent(CircuitBreakerOnStateTransitionEvent event) {
    System.out.println("Circuit Breaker State Transition: "
      + event.getStateTransition());
  }

  @EventListener
  public void onCircuitBreakerError(CircuitBreakerOnErrorEvent event) {
    System.out.println("Circuit Breaker Error: "
      + event.getThrowable().getMessage());
  }
}

// Circuit Breaker health endpoint
@RestController
@RequestMapping("/api/health")
public class HealthController {

  @Autowired
  private CircuitBreakerRegistry circuitBreakerRegistry;

  @GetMapping("/circuit-breakers")
  public Map<String, String> getCircuitBreakersStatus() {
    return circuitBreakerRegistry.getAllCircuitBreakers().stream()
      .collect(Collectors.toMap(
        CircuitBreaker::getName,
        cb -> cb.getState().toString()
      ));
  }

  @GetMapping("/circuit-breaker/{name}/metrics")
  public CircuitBreaker.Metrics getMetrics(@PathVariable String name) {
    return circuitBreakerRegistry.circuitBreaker(name).getMetrics();
  }
}
// Output: Resilient microservices with circuit breaker, retry, and rate limiting

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 4. Spring Cloud Gateway with Routing
// ═══════════════════════════════════════════════════════════════════════════

// Gateway Application
@SpringBootApplication
public class ApiGatewayApplication {
  public static void main(String[] args) {
    SpringApplication.run(ApiGatewayApplication.class, args);
  }
}

// application.yml for Gateway
/*
server:
  port: 8080

spring:
  application:
    name: api-gateway
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/users/**
          filters:
            - StripPrefix=1
            - name: CircuitBreaker
              args:
                name: userService
                fallbackUri: forward:/fallback/users
            - name: RequestRateLimiter
              args:
                redis-rate-limiter:
                  replenishRate: 10
                  burstCapacity: 20

        - id: order-service
          uri: lb://order-service
          predicates:
            - Path=/api/orders/**
          filters:
            - RewritePath=/api/orders/(?<segment>.*), /\${segment}
            - AddRequestHeader=X-Request-Source, Gateway
            - AddResponseHeader=X-Response-Time, \${responseTime}

        - id: product-service
          uri: lb://product-service
          predicates:
            - Path=/api/products/**
            - Method=GET,POST
            - Header=X-Request-Id, \\d+
          filters:
            - name: Retry
              args:
                retries: 3
                statuses: BAD_GATEWAY,GATEWAY_TIMEOUT
                methods: GET,POST
                backoff:
                  firstBackoff: 50ms
                  maxBackoff: 500ms
                  factor: 2

      default-filters:
        - name: GlobalFilter
        - DedupeResponseHeader=Access-Control-Allow-Credentials Access-Control-Allow-Origin

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
*/

// Custom Global Filter
@Component
public class LoggingGlobalFilter implements GlobalFilter, Ordered {

  @Override
  public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
    ServerHttpRequest request = exchange.getRequest();
    System.out.println("Request Path: " + request.getPath());
    System.out.println("Request Method: " + request.getMethod());
    System.out.println("Request Headers: " + request.getHeaders());

    long startTime = System.currentTimeMillis();

    return chain.filter(exchange).then(Mono.fromRunnable(() -> {
      long endTime = System.currentTimeMillis();
      System.out.println("Response Status: "
        + exchange.getResponse().getStatusCode());
      System.out.println("Execution Time: " + (endTime - startTime) + "ms");
    }));
  }

  @Override
  public int getOrder() {
    return -1; // Highest priority
  }
}

// Custom Gateway Filter Factory
@Component
public class CustomHeaderGatewayFilterFactory
    extends AbstractGatewayFilterFactory<CustomHeaderGatewayFilterFactory.Config> {

  public CustomHeaderGatewayFilterFactory() {
    super(Config.class);
  }

  @Override
  public GatewayFilter apply(Config config) {
    return (exchange, chain) -> {
      ServerHttpRequest request = exchange.getRequest().mutate()
        .header(config.getHeaderName(), config.getHeaderValue())
        .build();

      return chain.filter(exchange.mutate().request(request).build());
    };
  }

  public static class Config {
    private String headerName;
    private String headerValue;

    // Getters and setters
    public String getHeaderName() { return headerName; }
    public void setHeaderName(String headerName) { this.headerName = headerName; }
    public String getHeaderValue() { return headerValue; }
    public void setHeaderValue(String headerValue) { this.headerValue = headerValue; }
  }
}

// Fallback controller
@RestController
@RequestMapping("/fallback")
public class FallbackController {

  @GetMapping("/users")
  public ResponseEntity<Map<String, String>> usersFallback() {
    return ResponseEntity.ok(Map.of(
      "message", "User service is temporarily unavailable",
      "status", "fallback"
    ));
  }

  @GetMapping("/orders")
  public ResponseEntity<Map<String, String>> ordersFallback() {
    return ResponseEntity.ok(Map.of(
      "message", "Order service is temporarily unavailable",
      "status", "fallback"
    ));
  }
}
// Output: API Gateway with routing, filtering, rate limiting, and circuit breakers

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 5. Load Balancing with LoadBalancer
// ═══════════════════════════════════════════════════════════════════════════

// pom.xml dependency
/*
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-loadbalancer</artifactId>
</dependency>
*/

// Load Balanced RestTemplate
@Configuration
public class LoadBalancerConfig {

  @Bean
  @LoadBalanced
  public RestTemplate restTemplate() {
    return new RestTemplate();
  }

  // WebClient with Load Balancing
  @Bean
  @LoadBalanced
  public WebClient.Builder webClientBuilder() {
    return WebClient.builder();
  }
}

// Using Load Balanced RestTemplate
@Service
public class UserService {

  @Autowired
  private RestTemplate restTemplate;

  public User getUserById(Long id) {
    // Service name resolves to actual instance via load balancer
    String url = "http://user-service/api/users/" + id;
    return restTemplate.getForObject(url, User.class);
  }
}

// Using Load Balanced WebClient
@Service
public class OrderService {

  private final WebClient webClient;

  public OrderService(@LoadBalanced WebClient.Builder webClientBuilder) {
    this.webClient = webClientBuilder.build();
  }

  public Mono<Order> getOrderById(Long id) {
    return webClient.get()
      .uri("http://order-service/api/orders/{id}", id)
      .retrieve()
      .bodyToMono(Order.class);
  }

  public Flux<Order> getUserOrders(Long userId) {
    return webClient.get()
      .uri("http://order-service/api/orders/user/{userId}", userId)
      .retrieve()
      .bodyToFlux(Order.class);
  }
}

// Custom Load Balancer Configuration
@Configuration
@LoadBalancerClient(name = "user-service", configuration = UserServiceLoadBalancerConfig.class)
public class LoadBalancerConfiguration {
}

@Configuration
public class UserServiceLoadBalancerConfig {

  @Bean
  public ServiceInstanceListSupplier serviceInstanceListSupplier(
      ConfigurableApplicationContext context) {
    return ServiceInstanceListSupplier.builder()
      .withDiscoveryClient()
      .withHealthChecks()
      .withCaching()
      .build(context);
  }

  // Custom load balancing strategy
  @Bean
  public ReactorLoadBalancer<ServiceInstance> randomLoadBalancer(
      Environment environment,
      LoadBalancerClientFactory loadBalancerClientFactory) {
    String name = environment.getProperty(LoadBalancerClientFactory.PROPERTY_NAME);
    return new RandomLoadBalancer(
      loadBalancerClientFactory.getLazyProvider(name, ServiceInstanceListSupplier.class),
      name
    );
  }
}

// Health-aware load balancing
@Configuration
public class HealthCheckLoadBalancerConfig {

  @Bean
  public ServiceInstanceListSupplier healthCheckServiceInstanceListSupplier(
      ConfigurableApplicationContext context) {
    return ServiceInstanceListSupplier.builder()
      .withBlockingDiscoveryClient()
      .withHealthChecks(healthCheckClient())
      .build(context);
  }

  @Bean
  public HealthCheckServiceInstanceListSupplier.HealthCheckClient healthCheckClient() {
    return serviceInstance -> {
      // Custom health check logic
      try {
        RestTemplate restTemplate = new RestTemplate();
        String healthUrl = "http://" + serviceInstance.getHost()
          + ":" + serviceInstance.getPort() + "/actuator/health";
        ResponseEntity<String> response = restTemplate.getForEntity(
          healthUrl, String.class);
        return response.getStatusCode().is2xxSuccessful();
      } catch (Exception e) {
        return false;
      }
    };
  }
}

// Weighted load balancing
@Configuration
public class WeightedLoadBalancerConfig {

  @Bean
  public ServiceInstanceListSupplier weightedServiceInstanceListSupplier(
      ConfigurableApplicationContext context) {
    return ServiceInstanceListSupplier.builder()
      .withDiscoveryClient()
      .withWeighted()
      .build(context);
  }
}

// Service instance metadata for weights
/*
eureka:
  instance:
    metadata-map:
      weight: 5  # Higher weight = more traffic
*/

// Manual load balancer usage
@Service
public class ManualLoadBalancerService {

  @Autowired
  private LoadBalancerClient loadBalancerClient;

  public String callService() {
    ServiceInstance instance = loadBalancerClient.choose("user-service");
    if (instance == null) {
      throw new ServiceUnavailableException("No instances available");
    }

    String baseUrl = "http://" + instance.getHost() + ":" + instance.getPort();
    RestTemplate restTemplate = new RestTemplate();
    return restTemplate.getForObject(baseUrl + "/api/users", String.class);
  }
}
// Output: Client-side load balancing with health checks and custom strategies`
    },
    {
      name: 'Spring AOP Complete Guide',
      icon: '🎯',
      explanation: `Comprehensive Spring AOP implementation covering aspect definitions, pointcut expressions, advice types, transaction management, and logging aspects for cross-cutting concerns.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ 1. Aspect Definition with Pointcut Expressions
// ═══════════════════════════════════════════════════════════════════════════

// Enable AspectJ Auto Proxy
@Configuration
@EnableAspectJAutoProxy
public class AopConfig {
}

// Basic Aspect with Pointcut
@Aspect
@Component
public class LoggingAspect {

  private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

  // Pointcut for all methods in service package
  @Pointcut("execution(* com.example.service..*.*(..))")
  public void serviceLayer() {}

  // Pointcut for all repository methods
  @Pointcut("execution(* com.example.repository..*.*(..))")
  public void repositoryLayer() {}

  // Pointcut for all controller methods
  @Pointcut("execution(* com.example.controller..*.*(..))")
  public void controllerLayer() {}

  // Pointcut combining multiple expressions
  @Pointcut("serviceLayer() || repositoryLayer()")
  public void dataAccessLayer() {}

  // Pointcut with annotations
  @Pointcut("@annotation(com.example.annotation.Loggable)")
  public void loggableMethods() {}

  // Pointcut with specific method signature
  @Pointcut("execution(public * save*(..)) && args(entity)")
  public void saveMethods(Object entity) {}

  // Pointcut for methods with specific return type
  @Pointcut("execution(com.example.dto.UserDTO *.*(..))")
  public void userDtoReturningMethods() {}

  // Pointcut with bean name pattern
  @Pointcut("bean(*Service)")
  public void serviceBean() {}

  // Pointcut within specific class
  @Pointcut("within(com.example.service.UserService)")
  public void withinUserService() {}

  // Pointcut with this and target
  @Pointcut("this(com.example.service.BaseService)")
  public void proxyImplementsBaseService() {}

  @Pointcut("target(com.example.service.BaseService)")
  public void targetImplementsBaseService() {}
}

// Advanced Pointcut Expressions
@Aspect
@Component
public class AdvancedPointcutAspect {

  // Method with specific annotation and parameters
  @Pointcut("@annotation(org.springframework.web.bind.annotation.PostMapping) && args(request,..)")
  public void postMappingWithRequest(Object request) {}

  // Method with @Transactional annotation
  @Pointcut("@annotation(org.springframework.transaction.annotation.Transactional)")
  public void transactionalMethods() {}

  // Methods in classes annotated with @Service
  @Pointcut("@within(org.springframework.stereotype.Service)")
  public void serviceAnnotatedClasses() {}

  // Methods with @Cacheable annotation
  @Pointcut("@annotation(org.springframework.cache.annotation.Cacheable)")
  public void cacheableMethods() {}

  // Exclude specific methods
  @Pointcut("execution(* com.example..*.*(..)) && !execution(* com.example.config..*.*(..))")
  public void allExceptConfig() {}

  // Methods with specific parameter types
  @Pointcut("execution(* *..*.*(Long, String)) && args(id, name)")
  public void methodsWithLongAndString(Long id, String name) {}
}
// Output: Flexible pointcut expressions for precise aspect targeting

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 2. Before, After, Around Advice Types
// ═══════════════════════════════════════════════════════════════════════════

@Aspect
@Component
@Order(1) // Aspect execution order
public class AdviceTypesAspect {

  private static final Logger logger = LoggerFactory.getLogger(AdviceTypesAspect.class);

  // Before Advice - executes before method
  @Before("execution(* com.example.service.*.*(..))")
  public void beforeAdvice(JoinPoint joinPoint) {
    String methodName = joinPoint.getSignature().getName();
    String className = joinPoint.getTarget().getClass().getSimpleName();
    Object[] args = joinPoint.getArgs();

    logger.info("Before executing: {}.{}() with args: {}",
      className, methodName, Arrays.toString(args));
  }

  // Before Advice with annotation
  @Before("@annotation(loggable)")
  public void beforeLoggable(JoinPoint joinPoint, Loggable loggable) {
    logger.info("Loggable method called: {} with level: {}",
      joinPoint.getSignature().getName(), loggable.level());
  }

  // After Advice - executes after method (finally)
  @After("execution(* com.example.service.*.*(..))")
  public void afterAdvice(JoinPoint joinPoint) {
    logger.info("After executing: {}", joinPoint.getSignature().getName());
  }

  // Around Advice - wraps method execution
  @Around("execution(* com.example.service.*.*(..))")
  public Object aroundAdvice(ProceedingJoinPoint joinPoint) throws Throwable {
    String methodName = joinPoint.getSignature().getName();

    logger.info("Around Before: {}", methodName);
    long startTime = System.currentTimeMillis();

    Object result = null;
    try {
      // Proceed with method execution
      result = joinPoint.proceed();
      logger.info("Around After: {} returned {}", methodName, result);
    } catch (Exception e) {
      logger.error("Around Exception: {} threw {}", methodName, e.getMessage());
      throw e;
    } finally {
      long endTime = System.currentTimeMillis();
      logger.info("Around Finally: {} took {}ms", methodName, (endTime - startTime));
    }

    return result;
  }

  // Around Advice with modified arguments
  @Around("execution(* com.example.service.UserService.updateUser(..)) && args(user)")
  public Object aroundUpdateUser(ProceedingJoinPoint joinPoint, User user) throws Throwable {
    // Modify arguments before proceeding
    user.setUpdatedAt(LocalDateTime.now());
    logger.info("Modified user before update: {}", user);

    // Proceed with modified arguments
    Object result = joinPoint.proceed(new Object[]{user});

    // Modify result if needed
    return result;
  }

  // Around Advice with conditional execution
  @Around("@annotation(cacheable)")
  public Object aroundCacheable(ProceedingJoinPoint joinPoint, Cacheable cacheable)
      throws Throwable {
    String cacheKey = generateCacheKey(joinPoint);

    // Check cache
    Object cachedValue = getFromCache(cacheKey);
    if (cachedValue != null) {
      logger.info("Returning cached value for key: {}", cacheKey);
      return cachedValue;
    }

    // Execute method
    Object result = joinPoint.proceed();

    // Store in cache
    putInCache(cacheKey, result);
    return result;
  }

  private String generateCacheKey(ProceedingJoinPoint joinPoint) {
    return joinPoint.getSignature().toString() + Arrays.toString(joinPoint.getArgs());
  }

  private Object getFromCache(String key) {
    // Cache lookup logic
    return null;
  }

  private void putInCache(String key, Object value) {
    // Cache storage logic
  }
}
// Output: Flexible advice types for different interception points

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 3. @AfterReturning & @AfterThrowing Advice
// ═══════════════════════════════════════════════════════════════════════════

@Aspect
@Component
public class AfterAdviceAspect {

  private static final Logger logger = LoggerFactory.getLogger(AfterAdviceAspect.class);

  // AfterReturning - executes after successful return
  @AfterReturning(
    pointcut = "execution(* com.example.service.*.*(..))",
    returning = "result"
  )
  public void afterReturningAdvice(JoinPoint joinPoint, Object result) {
    logger.info("Method {} returned: {}",
      joinPoint.getSignature().getName(), result);

    // Post-process the result
    if (result instanceof List) {
      logger.info("Returned list size: {}", ((List<?>) result).size());
    }
  }

  // AfterReturning with specific return type
  @AfterReturning(
    pointcut = "execution(com.example.dto.UserDTO com.example.service.*.*(..))",
    returning = "userDto"
  )
  public void afterReturningUserDto(JoinPoint joinPoint, UserDTO userDto) {
    logger.info("UserDTO returned: id={}, username={}",
      userDto.getId(), userDto.getUsername());

    // Audit logging
    auditLog("USER_RETRIEVED", userDto.getId());
  }

  // AfterReturning for save operations
  @AfterReturning(
    pointcut = "execution(* com.example.service.*.save*(..)) && args(entity)",
    returning = "savedEntity"
  )
  public void afterSaveEntity(JoinPoint joinPoint, Object entity, Object savedEntity) {
    logger.info("Entity saved: {} -> {}", entity, savedEntity);

    // Send notification
    sendNotification("ENTITY_SAVED", savedEntity);
  }

  // AfterThrowing - executes when exception thrown
  @AfterThrowing(
    pointcut = "execution(* com.example.service.*.*(..))",
    throwing = "exception"
  )
  public void afterThrowingAdvice(JoinPoint joinPoint, Throwable exception) {
    logger.error("Method {} threw exception: {}",
      joinPoint.getSignature().getName(), exception.getMessage());

    // Error notification
    notifyError(joinPoint, exception);
  }

  // AfterThrowing with specific exception type
  @AfterThrowing(
    pointcut = "execution(* com.example.service.*.*(..))",
    throwing = "exception"
  )
  public void afterThrowingDataException(JoinPoint joinPoint,
                                          DataAccessException exception) {
    logger.error("Data access error in {}: {}",
      joinPoint.getSignature().getName(), exception.getMessage());

    // Database error handling
    handleDatabaseError(exception);
  }

  // AfterThrowing with error recovery
  @AfterThrowing(
    pointcut = "@annotation(com.example.annotation.ErrorRecoverable)",
    throwing = "exception"
  )
  public void afterThrowingRecoverable(JoinPoint joinPoint, Exception exception) {
    logger.warn("Recoverable error in {}: {}",
      joinPoint.getSignature().getName(), exception.getMessage());

    // Attempt recovery
    attemptRecovery(joinPoint, exception);
  }

  private void auditLog(String action, Object entityId) {
    // Audit logging implementation
  }

  private void sendNotification(String event, Object data) {
    // Notification implementation
  }

  private void notifyError(JoinPoint joinPoint, Throwable exception) {
    // Error notification implementation
  }

  private void handleDatabaseError(DataAccessException exception) {
    // Database error handling
  }

  private void attemptRecovery(JoinPoint joinPoint, Exception exception) {
    // Error recovery logic
  }
}

// Custom annotation for loggable methods
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Loggable {
  String level() default "INFO";
}

// Custom annotation for error recoverable methods
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface ErrorRecoverable {
  int maxRetries() default 3;
}
// Output: Sophisticated return and exception handling with AOP

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 4. Transaction Management with @Transactional
// ═══════════════════════════════════════════════════════════════════════════

// Enable transaction management
@Configuration
@EnableTransactionManagement
public class TransactionConfig {

  @Bean
  public PlatformTransactionManager transactionManager(EntityManagerFactory emf) {
    return new JpaTransactionManager(emf);
  }
}

// Aspect for transaction monitoring
@Aspect
@Component
public class TransactionMonitoringAspect {

  private static final Logger logger = LoggerFactory.getLogger(TransactionMonitoringAspect.class);

  @Around("@annotation(transactional)")
  public Object monitorTransaction(ProceedingJoinPoint joinPoint,
                                    Transactional transactional) throws Throwable {
    String methodName = joinPoint.getSignature().getName();
    logger.info("Starting transaction for: {}", methodName);
    logger.info("Transaction propagation: {}", transactional.propagation());
    logger.info("Transaction isolation: {}", transactional.isolation());

    long startTime = System.currentTimeMillis();
    Object result = null;

    try {
      result = joinPoint.proceed();
      long duration = System.currentTimeMillis() - startTime;
      logger.info("Transaction committed for: {} in {}ms", methodName, duration);
    } catch (Exception e) {
      logger.error("Transaction rolled back for: {} - {}", methodName, e.getMessage());
      throw e;
    }

    return result;
  }
}

// Service with various transaction configurations
@Service
public class TransactionalService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private OrderRepository orderRepository;

  // Basic transaction
  @Transactional
  public User createUser(User user) {
    return userRepository.save(user);
  }

  // Read-only transaction (performance optimization)
  @Transactional(readOnly = true)
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  // Transaction with custom propagation
  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public Order createOrder(Order order) {
    // Always creates new transaction, suspending current if exists
    return orderRepository.save(order);
  }

  // Transaction with custom isolation level
  @Transactional(isolation = Isolation.SERIALIZABLE)
  public void updateInventory(Long productId, int quantity) {
    // Highest isolation level to prevent concurrent modifications
    Product product = productRepository.findById(productId)
      .orElseThrow(() -> new NotFoundException("Product not found"));
    product.setQuantity(product.getQuantity() - quantity);
    productRepository.save(product);
  }

  // Transaction with rollback rules
  @Transactional(rollbackFor = {Exception.class},
                 noRollbackFor = {BusinessException.class})
  public void processPayment(Payment payment) throws Exception {
    // Rolls back for all exceptions except BusinessException
    paymentRepository.save(payment);
    // ... payment processing logic
  }

  // Transaction with timeout
  @Transactional(timeout = 30) // 30 seconds
  public void longRunningOperation() {
    // Transaction will rollback if exceeds 30 seconds
    // ... long operation
  }

  // Nested transactions
  @Transactional
  public void createUserWithOrders(User user, List<Order> orders) {
    User savedUser = userRepository.save(user);

    orders.forEach(order -> {
      order.setUser(savedUser);
      createOrderInNewTransaction(order); // New transaction
    });
  }

  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public Order createOrderInNewTransaction(Order order) {
    return orderRepository.save(order);
  }

  // Programmatic transaction management
  @Autowired
  private PlatformTransactionManager transactionManager;

  public void programmaticTransaction() {
    TransactionDefinition def = new DefaultTransactionDefinition();
    TransactionStatus status = transactionManager.getTransaction(def);

    try {
      // Transactional operations
      User user = new User();
      userRepository.save(user);

      // Commit transaction
      transactionManager.commit(status);
    } catch (Exception e) {
      // Rollback on error
      transactionManager.rollback(status);
      throw e;
    }
  }

  // TransactionTemplate for programmatic control
  @Autowired
  private TransactionTemplate transactionTemplate;

  public User createUserWithTemplate(User user) {
    return transactionTemplate.execute(status -> {
      try {
        return userRepository.save(user);
      } catch (Exception e) {
        status.setRollbackOnly();
        throw e;
      }
    });
  }
}
// Output: Comprehensive transaction management with declarative and programmatic approaches

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 5. Logging Aspect for Performance Monitoring
// ═══════════════════════════════════════════════════════════════════════════

@Aspect
@Component
@Order(0) // Execute before other aspects
public class PerformanceMonitoringAspect {

  private static final Logger logger = LoggerFactory.getLogger(PerformanceMonitoringAspect.class);

  @Autowired
  private MetricsService metricsService;

  // Performance monitoring for all service methods
  @Around("execution(* com.example.service..*.*(..))")
  public Object monitorPerformance(ProceedingJoinPoint joinPoint) throws Throwable {
    String className = joinPoint.getSignature().getDeclaringTypeName();
    String methodName = joinPoint.getSignature().getName();
    String fullMethodName = className + "." + methodName;

    // Start timing
    long startTime = System.currentTimeMillis();
    StopWatch stopWatch = new StopWatch();
    stopWatch.start();

    Object result = null;
    boolean success = true;

    try {
      result = joinPoint.proceed();
      return result;
    } catch (Throwable e) {
      success = false;
      throw e;
    } finally {
      stopWatch.stop();
      long executionTime = stopWatch.getTotalTimeMillis();

      // Log performance metrics
      if (executionTime > 1000) {
        logger.warn("Slow execution: {} took {}ms", fullMethodName, executionTime);
      } else {
        logger.info("Performance: {} took {}ms", fullMethodName, executionTime);
      }

      // Record metrics
      metricsService.recordExecutionTime(fullMethodName, executionTime, success);
    }
  }

  // Detailed performance monitoring with arguments
  @Around("@annotation(com.example.annotation.MonitorPerformance)")
  public Object detailedPerformanceMonitoring(ProceedingJoinPoint joinPoint)
      throws Throwable {
    MethodSignature signature = (MethodSignature) joinPoint.getSignature();
    String methodName = signature.getName();
    Object[] args = joinPoint.getArgs();

    // Log method entry
    logger.info("Entering: {} with args: {}", methodName, Arrays.toString(args));

    long startTime = System.currentTimeMillis();
    long startMemory = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();

    Object result = null;
    Exception caughtException = null;

    try {
      result = joinPoint.proceed();
    } catch (Exception e) {
      caughtException = e;
      throw e;
    } finally {
      long endTime = System.currentTimeMillis();
      long endMemory = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
      long executionTime = endTime - startTime;
      long memoryUsed = endMemory - startMemory;

      // Create performance report
      PerformanceReport report = PerformanceReport.builder()
        .methodName(methodName)
        .executionTime(executionTime)
        .memoryUsed(memoryUsed)
        .arguments(args)
        .result(result)
        .exception(caughtException)
        .timestamp(LocalDateTime.now())
        .build();

      // Log detailed report
      logger.info("Performance Report: {}", report);

      // Store metrics
      metricsService.storePerformanceReport(report);
    }

    return result;
  }

  // Database query performance monitoring
  @Around("execution(* com.example.repository..*.*(..))")
  public Object monitorDatabaseQueries(ProceedingJoinPoint joinPoint) throws Throwable {
    String repositoryName = joinPoint.getSignature().getDeclaringTypeName();
    String methodName = joinPoint.getSignature().getName();

    long startTime = System.currentTimeMillis();
    Object result = joinPoint.proceed();
    long executionTime = System.currentTimeMillis() - startTime;

    // Log slow queries
    if (executionTime > 500) {
      logger.warn("Slow database query: {}.{} took {}ms",
        repositoryName, methodName, executionTime);
    }

    // Record query metrics
    metricsService.recordDatabaseQuery(repositoryName, methodName, executionTime);

    return result;
  }
}

// Custom annotation for performance monitoring
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface MonitorPerformance {
  String description() default "";
  boolean logArguments() default true;
  boolean logResult() default true;
}

// Performance report model
@Data
@Builder
public class PerformanceReport {
  private String methodName;
  private long executionTime;
  private long memoryUsed;
  private Object[] arguments;
  private Object result;
  private Exception exception;
  private LocalDateTime timestamp;
}

// Metrics service
@Service
public class MetricsService {

  private final Map<String, List<Long>> executionTimes = new ConcurrentHashMap<>();

  public void recordExecutionTime(String methodName, long executionTime, boolean success) {
    executionTimes.computeIfAbsent(methodName, k -> new ArrayList<>()).add(executionTime);
    // Send to monitoring system (e.g., Micrometer, Prometheus)
  }

  public void storePerformanceReport(PerformanceReport report) {
    // Store report in database or send to analytics
  }

  public void recordDatabaseQuery(String repository, String method, long executionTime) {
    // Record database query metrics
  }

  public Map<String, Double> getAverageExecutionTimes() {
    return executionTimes.entrySet().stream()
      .collect(Collectors.toMap(
        Map.Entry::getKey,
        e -> e.getValue().stream().mapToLong(Long::longValue).average().orElse(0.0)
      ));
  }
}
// Output: Comprehensive performance monitoring with detailed metrics and reporting`
    },
    {
      name: 'Spring Batch Complete Guide',
      icon: '⚙️',
      explanation: `Comprehensive Spring Batch implementation covering job configuration, step execution, chunk-oriented processing, readers/processors/writers, and error handling for batch operations.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ 1. Job & Step Configuration
// ═══════════════════════════════════════════════════════════════════════════

// Enable Spring Batch
@Configuration
@EnableBatchProcessing
public class BatchConfig {

  @Autowired
  private JobBuilderFactory jobBuilderFactory;

  @Autowired
  private StepBuilderFactory stepBuilderFactory;

  @Autowired
  private DataSource dataSource;

  // Simple Job with Single Step
  @Bean
  public Job importUserJob(Step importUserStep) {
    return jobBuilderFactory.get("importUserJob")
      .incrementer(new RunIdIncrementer())
      .listener(jobExecutionListener())
      .start(importUserStep)
      .build();
  }

  @Bean
  public Step importUserStep(ItemReader<UserDTO> reader,
                             ItemProcessor<UserDTO, User> processor,
                             ItemWriter<User> writer) {
    return stepBuilderFactory.get("importUserStep")
      .<UserDTO, User>chunk(100) // Process 100 items per chunk
      .reader(reader)
      .processor(processor)
      .writer(writer)
      .faultTolerant()
      .skipLimit(10)
      .skip(Exception.class)
      .retryLimit(3)
      .retry(Exception.class)
      .listener(stepExecutionListener())
      .build();
  }

  // Multi-Step Job with Flow
  @Bean
  public Job complexJob() {
    return jobBuilderFactory.get("complexJob")
      .incrementer(new RunIdIncrementer())
      .start(step1())
      .next(step2())
      .next(step3())
      .build();
  }

  // Conditional Flow - Decision-based execution
  @Bean
  public Job conditionalJob() {
    return jobBuilderFactory.get("conditionalJob")
      .start(step1())
      .on("COMPLETED").to(step2())
      .from(step1()).on("FAILED").to(errorStep())
      .from(step2()).on("COMPLETED").to(step3())
      .end()
      .build();
  }

  // Parallel Steps
  @Bean
  public Job parallelJob() {
    Flow flow1 = new FlowBuilder<Flow>("flow1")
      .start(step1())
      .build();

    Flow flow2 = new FlowBuilder<Flow>("flow2")
      .start(step2())
      .build();

    Flow parallelFlow = new FlowBuilder<Flow>("parallelFlow")
      .split(new SimpleAsyncTaskExecutor())
      .add(flow1, flow2)
      .build();

    return jobBuilderFactory.get("parallelJob")
      .start(parallelFlow)
      .end()
      .build();
  }

  // Partitioned Step - Process data in parallel partitions
  @Bean
  public Job partitionedJob(Step masterStep) {
    return jobBuilderFactory.get("partitionedJob")
      .start(masterStep)
      .build();
  }

  @Bean
  public Step masterStep(Partitioner partitioner, Step slaveStep) {
    return stepBuilderFactory.get("masterStep")
      .partitioner("slaveStep", partitioner)
      .step(slaveStep)
      .gridSize(4) // Number of partitions
      .taskExecutor(taskExecutor())
      .build();
  }

  @Bean
  public TaskExecutor taskExecutor() {
    ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
    executor.setCorePoolSize(4);
    executor.setMaxPoolSize(8);
    executor.setQueueCapacity(25);
    executor.setThreadNamePrefix("batch-");
    executor.initialize();
    return executor;
  }

  // Job and Step Listeners
  @Bean
  public JobExecutionListener jobExecutionListener() {
    return new JobExecutionListener() {
      @Override
      public void beforeJob(JobExecution jobExecution) {
        System.out.println("Job Starting: " + jobExecution.getJobInstance().getJobName());
      }

      @Override
      public void afterJob(JobExecution jobExecution) {
        System.out.println("Job Completed: " + jobExecution.getStatus());
        System.out.println("Duration: " +
          (jobExecution.getEndTime().getTime() - jobExecution.getStartTime().getTime()) + "ms");
      }
    };
  }

  @Bean
  public StepExecutionListener stepExecutionListener() {
    return new StepExecutionListener() {
      @Override
      public void beforeStep(StepExecution stepExecution) {
        System.out.println("Step Starting: " + stepExecution.getStepName());
      }

      @Override
      public ExitStatus afterStep(StepExecution stepExecution) {
        System.out.println("Step Completed. Read: " + stepExecution.getReadCount() +
          " Written: " + stepExecution.getWriteCount());
        return stepExecution.getExitStatus();
      }
    };
  }
}
// Output: Flexible job orchestration with steps, flows, and parallel processing

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 2. ItemReader, ItemProcessor, ItemWriter
// ═══════════════════════════════════════════════════════════════════════════

// CSV File Reader
@Bean
public FlatFileItemReader<UserDTO> csvReader() {
  return new FlatFileItemReaderBuilder<UserDTO>()
    .name("csvReader")
    .resource(new ClassPathResource("users.csv"))
    .delimited()
    .names("id", "firstName", "lastName", "email", "age")
    .linesToSkip(1) // Skip header
    .fieldSetMapper(new BeanWrapperFieldSetMapper<>() {{
      setTargetType(UserDTO.class);
    }})
    .build();
}

// Database Reader with Pagination
@Bean
public JdbcPagingItemReader<User> databaseReader(DataSource dataSource) {
  return new JdbcPagingItemReaderBuilder<User>()
    .name("databaseReader")
    .dataSource(dataSource)
    .queryProvider(queryProvider(dataSource))
    .pageSize(100)
    .rowMapper(new BeanPropertyRowMapper<>(User.class))
    .build();
}

@Bean
public PagingQueryProvider queryProvider(DataSource dataSource) {
  SqlPagingQueryProviderFactoryBean factory = new SqlPagingQueryProviderFactoryBean();
  factory.setDataSource(dataSource);
  factory.setSelectClause("SELECT id, username, email, created_at");
  factory.setFromClause("FROM users");
  factory.setWhereClause("WHERE active = true");
  factory.setSortKey("id");

  try {
    return factory.getObject();
  } catch (Exception e) {
    throw new RuntimeException(e);
  }
}

// JPA Repository Reader
@Bean
public RepositoryItemReader<Order> repositoryReader(OrderRepository orderRepository) {
  return new RepositoryItemReaderBuilder<Order>()
    .name("repositoryReader")
    .repository(orderRepository)
    .methodName("findByStatus")
    .arguments(Arrays.asList(OrderStatus.PENDING))
    .pageSize(50)
    .sorts(Collections.singletonMap("id", Sort.Direction.ASC))
    .build();
}

// JSON File Reader
@Bean
public JsonItemReader<Product> jsonReader() {
  return new JsonItemReaderBuilder<Product>()
    .jsonObjectReader(new JacksonJsonObjectReader<>(Product.class))
    .resource(new ClassPathResource("products.json"))
    .name("jsonReader")
    .build();
}

// Custom Item Reader
public class CustomItemReader implements ItemReader<CustomData> {

  private Iterator<CustomData> dataIterator;
  private List<CustomData> data;

  public CustomItemReader(List<CustomData> data) {
    this.data = data;
    this.dataIterator = data.iterator();
  }

  @Override
  public CustomData read() {
    if (dataIterator.hasNext()) {
      return dataIterator.next();
    }
    return null; // Return null to signal end of data
  }
}

// Item Processor - Transform and Validate
@Component
public class UserItemProcessor implements ItemProcessor<UserDTO, User> {

  @Autowired
  private UserValidator validator;

  @Override
  public User process(UserDTO dto) throws Exception {
    // Validation
    if (!validator.isValid(dto)) {
      return null; // Skip invalid items
    }

    // Transformation
    User user = new User();
    user.setUsername(dto.getFirstName() + "." + dto.getLastName());
    user.setEmail(dto.getEmail().toLowerCase());
    user.setAge(dto.getAge());
    user.setCreatedAt(LocalDateTime.now());
    user.setActive(true);

    // Additional processing
    user.setPasswordHash(generateRandomPassword());

    return user;
  }

  private String generateRandomPassword() {
    return UUID.randomUUID().toString();
  }
}

// Composite Item Processor - Chain multiple processors
@Bean
public CompositeItemProcessor<UserDTO, User> compositeProcessor() {
  CompositeItemProcessor<UserDTO, User> processor = new CompositeItemProcessor<>();
  processor.setDelegates(Arrays.asList(
    validationProcessor(),
    transformationProcessor(),
    enrichmentProcessor()
  ));
  return processor;
}

// Database Writer
@Bean
public JdbcBatchItemWriter<User> databaseWriter(DataSource dataSource) {
  return new JdbcBatchItemWriterBuilder<User>()
    .dataSource(dataSource)
    .sql("INSERT INTO users (username, email, age, created_at, active) " +
         "VALUES (:username, :email, :age, :createdAt, :active)")
    .beanMapped()
    .build();
}

// JPA Repository Writer
@Bean
public RepositoryItemWriter<User> repositoryWriter(UserRepository userRepository) {
  RepositoryItemWriter<User> writer = new RepositoryItemWriter<>();
  writer.setRepository(userRepository);
  writer.setMethodName("save");
  return writer;
}

// File Writer
@Bean
public FlatFileItemWriter<User> fileWriter() {
  return new FlatFileItemWriterBuilder<User>()
    .name("fileWriter")
    .resource(new FileSystemResource("output/users.csv"))
    .delimited()
    .delimiter(",")
    .names("id", "username", "email", "age")
    .headerCallback(writer -> writer.write("ID,Username,Email,Age"))
    .build();
}

// Custom Item Writer
public class CustomItemWriter implements ItemWriter<User> {

  @Autowired
  private UserService userService;

  @Override
  public void write(List<? extends User> users) throws Exception {
    for (User user : users) {
      userService.processUser(user);
      // Additional custom logic
    }
  }
}
// Output: Flexible data reading, processing, and writing with various sources

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 3. Chunk-Oriented Processing
// ═══════════════════════════════════════════════════════════════════════════

// Chunk-based Step Configuration
@Bean
public Step chunkStep() {
  return stepBuilderFactory.get("chunkStep")
    .<UserDTO, User>chunk(100) // Chunk size: 100 items
    .reader(csvReader())
    .processor(userProcessor())
    .writer(databaseWriter())
    .listener(chunkListener())
    .listener(itemReadListener())
    .listener(itemProcessListener())
    .listener(itemWriteListener())
    .build();
}

// Chunk Listener
@Component
public class CustomChunkListener implements ChunkListener {

  private static final Logger logger = LoggerFactory.getLogger(CustomChunkListener.class);

  @Override
  public void beforeChunk(ChunkContext context) {
    logger.info("Starting chunk processing");
  }

  @Override
  public void afterChunk(ChunkContext context) {
    StepExecution stepExecution = context.getStepContext().getStepExecution();
    logger.info("Chunk completed. Items processed: {}",
      stepExecution.getReadCount());
  }

  @Override
  public void afterChunkError(ChunkContext context) {
    logger.error("Chunk processing failed");
  }
}

// Item Read Listener
@Component
public class ItemReadListenerImpl implements ItemReadListener<UserDTO> {

  private static final Logger logger = LoggerFactory.getLogger(ItemReadListenerImpl.class);

  @Override
  public void beforeRead() {
    // Called before each item read
  }

  @Override
  public void afterRead(UserDTO item) {
    logger.debug("Read item: {}", item);
  }

  @Override
  public void onReadError(Exception ex) {
    logger.error("Error reading item: {}", ex.getMessage());
  }
}

// Item Process Listener
@Component
public class ItemProcessListenerImpl implements ItemProcessListener<UserDTO, User> {

  private static final Logger logger = LoggerFactory.getLogger(ItemProcessListenerImpl.class);

  @Override
  public void beforeProcess(UserDTO item) {
    logger.debug("Processing item: {}", item);
  }

  @Override
  public void afterProcess(UserDTO item, User result) {
    if (result == null) {
      logger.warn("Item filtered out: {}", item);
    } else {
      logger.debug("Processed: {} -> {}", item, result);
    }
  }

  @Override
  public void onProcessError(UserDTO item, Exception e) {
    logger.error("Error processing item {}: {}", item, e.getMessage());
  }
}

// Item Write Listener
@Component
public class ItemWriteListenerImpl implements ItemWriteListener<User> {

  private static final Logger logger = LoggerFactory.getLogger(ItemWriteListenerImpl.class);

  @Override
  public void beforeWrite(List<? extends User> items) {
    logger.info("Writing {} items", items.size());
  }

  @Override
  public void afterWrite(List<? extends User> items) {
    logger.info("Successfully wrote {} items", items.size());
  }

  @Override
  public void onWriteError(Exception exception, List<? extends User> items) {
    logger.error("Error writing {} items: {}", items.size(), exception.getMessage());
  }
}

// Tasklet-based Step (Alternative to chunk processing)
@Bean
public Step taskletStep() {
  return stepBuilderFactory.get("taskletStep")
    .tasklet((contribution, chunkContext) -> {
      // Custom logic
      System.out.println("Executing tasklet");

      // Perform operation
      performCleanup();

      return RepeatStatus.FINISHED;
    })
    .build();
}

// Custom Tasklet
@Component
public class CleanupTasklet implements Tasklet {

  @Autowired
  private FileService fileService;

  @Override
  public RepeatStatus execute(StepContribution contribution,
                               ChunkContext chunkContext) throws Exception {
    // Cleanup old files
    int deletedFiles = fileService.deleteOldFiles();

    // Update execution context
    chunkContext.getStepContext()
      .getStepExecution()
      .getExecutionContext()
      .putInt("deletedFiles", deletedFiles);

    return RepeatStatus.FINISHED;
  }
}

// Chunk Completion Policy - Custom chunk size logic
@Bean
public CompletionPolicy customCompletionPolicy() {
  return new SimpleCompletionPolicy(100) {
    @Override
    public boolean isComplete(RepeatContext context, RepeatStatus result) {
      // Custom completion logic
      return super.isComplete(context, result);
    }
  };
}
// Output: Efficient chunk-oriented processing with listeners and tasklets

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 4. Job Parameters & Job Launcher
// ═══════════════════════════════════════════════════════════════════════════

// Job Launcher Configuration
@Service
public class BatchJobLauncher {

  @Autowired
  private JobLauncher jobLauncher;

  @Autowired
  private Job importUserJob;

  @Autowired
  private JobExplorer jobExplorer;

  @Autowired
  private JobRegistry jobRegistry;

  // Launch job with parameters
  public JobExecution runJob(String inputFile, LocalDate processDate)
      throws Exception {
    JobParameters jobParameters = new JobParametersBuilder()
      .addString("inputFile", inputFile)
      .addDate("processDate", Date.from(processDate.atStartOfDay()
        .atZone(ZoneId.systemDefault()).toInstant()))
      .addLong("timestamp", System.currentTimeMillis())
      .toJobParameters();

    return jobLauncher.run(importUserJob, jobParameters);
  }

  // Launch job asynchronously
  public void runJobAsync(String inputFile) throws Exception {
    JobParameters jobParameters = new JobParametersBuilder()
      .addString("inputFile", inputFile)
      .addLong("timestamp", System.currentTimeMillis())
      .toJobParameters();

    // Async execution
    CompletableFuture.runAsync(() -> {
      try {
        jobLauncher.run(importUserJob, jobParameters);
      } catch (Exception e) {
        e.printStackTrace();
      }
    });
  }

  // Get job status
  public JobExecution getJobExecution(Long jobExecutionId) {
    return jobExplorer.getJobExecution(jobExecutionId);
  }

  // Get all job instances
  public List<JobInstance> getJobInstances(String jobName, int start, int count) {
    return jobExplorer.getJobInstances(jobName, start, count);
  }

  // Restart failed job
  public JobExecution restartJob(Long jobExecutionId) throws Exception {
    JobExecution failedExecution = jobExplorer.getJobExecution(jobExecutionId);
    JobInstance jobInstance = failedExecution.getJobInstance();
    Job job = jobRegistry.getJob(jobInstance.getJobName());

    JobParameters parameters = failedExecution.getJobParameters();
    return jobLauncher.run(job, parameters);
  }

  // Stop running job
  public void stopJob(Long jobExecutionId) throws Exception {
    JobExecution execution = jobExplorer.getJobExecution(jobExecutionId);
    execution.setStatus(BatchStatus.STOPPING);
  }
}

// Accessing Job Parameters in Components
@Component
@StepScope
public class ParameterizedReader implements ItemReader<String> {

  @Value("#{jobParameters['inputFile']}")
  private String inputFile;

  @Value("#{jobParameters['processDate']}")
  private Date processDate;

  @Override
  public String read() throws Exception {
    System.out.println("Reading from: " + inputFile);
    System.out.println("Process date: " + processDate);
    return null;
  }
}

// Job Parameter Validator
public class JobParameterValidator implements JobParametersValidator {

  @Override
  public void validate(JobParameters parameters) throws JobParametersInvalidException {
    String inputFile = parameters.getString("inputFile");
    if (inputFile == null || inputFile.isEmpty()) {
      throw new JobParametersInvalidException("Input file parameter is required");
    }

    File file = new File(inputFile);
    if (!file.exists()) {
      throw new JobParametersInvalidException("Input file does not exist: " + inputFile);
    }
  }
}

// REST Controller for Job Management
@RestController
@RequestMapping("/api/batch")
public class BatchController {

  @Autowired
  private BatchJobLauncher batchJobLauncher;

  @PostMapping("/jobs/{jobName}/start")
  public ResponseEntity<Map<String, Object>> startJob(
      @PathVariable String jobName,
      @RequestBody Map<String, String> parameters) throws Exception {

    JobExecution execution = batchJobLauncher.runJob(
      parameters.get("inputFile"),
      LocalDate.parse(parameters.get("processDate"))
    );

    Map<String, Object> response = new HashMap<>();
    response.put("jobExecutionId", execution.getId());
    response.put("status", execution.getStatus().toString());
    response.put("startTime", execution.getStartTime());

    return ResponseEntity.ok(response);
  }

  @GetMapping("/jobs/executions/{id}")
  public ResponseEntity<JobExecutionDTO> getJobExecution(@PathVariable Long id) {
    JobExecution execution = batchJobLauncher.getJobExecution(id);

    JobExecutionDTO dto = new JobExecutionDTO();
    dto.setId(execution.getId());
    dto.setStatus(execution.getStatus().toString());
    dto.setStartTime(execution.getStartTime());
    dto.setEndTime(execution.getEndTime());
    dto.setExitStatus(execution.getExitStatus().getExitCode());

    return ResponseEntity.ok(dto);
  }

  @PostMapping("/jobs/executions/{id}/restart")
  public ResponseEntity<Map<String, String>> restartJob(@PathVariable Long id)
      throws Exception {
    JobExecution execution = batchJobLauncher.restartJob(id);
    return ResponseEntity.ok(Map.of(
      "message", "Job restarted",
      "jobExecutionId", execution.getId().toString()
    ));
  }

  @PostMapping("/jobs/executions/{id}/stop")
  public ResponseEntity<Map<String, String>> stopJob(@PathVariable Long id)
      throws Exception {
    batchJobLauncher.stopJob(id);
    return ResponseEntity.ok(Map.of("message", "Job stop requested"));
  }
}
// Output: Complete job lifecycle management with parameters and REST API

// ═══════════════════════════════════════════════════════════════════════════
// ✦ 5. Skip & Retry Policies with Error Handling
// ═══════════════════════════════════════════════════════════════════════════

// Fault-Tolerant Step Configuration
@Bean
public Step faultTolerantStep() {
  return stepBuilderFactory.get("faultTolerantStep")
    .<UserDTO, User>chunk(100)
    .reader(csvReader())
    .processor(userProcessor())
    .writer(databaseWriter())
    .faultTolerant()
    // Skip Configuration
    .skipLimit(50) // Maximum 50 skips
    .skip(ValidationException.class)
    .skip(FlatFileParseException.class)
    .noSkip(NullPointerException.class)
    // Retry Configuration
    .retryLimit(3) // Retry up to 3 times
    .retry(DeadlockLoserDataAccessException.class)
    .retry(TransientDataAccessException.class)
    .noRetry(NonTransientDataAccessException.class)
    // Backoff Policy
    .retryPolicy(retryPolicy())
    .backOffPolicy(backOffPolicy())
    // Listeners
    .listener(skipListener())
    .listener(retryListener())
    .build();
}

// Custom Retry Policy
@Bean
public RetryPolicy retryPolicy() {
  SimpleRetryPolicy retryPolicy = new SimpleRetryPolicy();
  retryPolicy.setMaxAttempts(3);
  return retryPolicy;
}

// Exponential Backoff Policy
@Bean
public BackOffPolicy backOffPolicy() {
  ExponentialBackOffPolicy backOffPolicy = new ExponentialBackOffPolicy();
  backOffPolicy.setInitialInterval(1000); // 1 second
  backOffPolicy.setMaxInterval(10000);    // 10 seconds
  backOffPolicy.setMultiplier(2.0);       // Double each time
  return backOffPolicy;
}

// Skip Listener
@Component
public class CustomSkipListener implements SkipListener<UserDTO, User> {

  private static final Logger logger = LoggerFactory.getLogger(CustomSkipListener.class);

  @Override
  public void onSkipInRead(Throwable t) {
    logger.warn("Skipped during read: {}", t.getMessage());
  }

  @Override
  public void onSkipInProcess(UserDTO item, Throwable t) {
    logger.warn("Skipped during process. Item: {}, Error: {}",
      item, t.getMessage());
    // Log to error table
    logSkippedItem(item, t);
  }

  @Override
  public void onSkipInWrite(User item, Throwable t) {
    logger.warn("Skipped during write. Item: {}, Error: {}",
      item, t.getMessage());
    // Handle write failures
    handleWriteFailure(item, t);
  }

  private void logSkippedItem(UserDTO item, Throwable t) {
    // Save to error log table
  }

  private void handleWriteFailure(User item, Throwable t) {
    // Dead letter queue or retry mechanism
  }
}

// Retry Listener
@Component
public class CustomRetryListener implements RetryListener {

  private static final Logger logger = LoggerFactory.getLogger(CustomRetryListener.class);

  @Override
  public <T, E extends Throwable> boolean open(RetryContext context,
                                                RetryCallback<T, E> callback) {
    logger.info("Retry starting");
    return true;
  }

  @Override
  public <T, E extends Throwable> void close(RetryContext context,
                                              RetryCallback<T, E> callback,
                                              Throwable throwable) {
    if (throwable != null) {
      logger.error("Retry exhausted after {} attempts",
        context.getRetryCount());
    } else {
      logger.info("Retry succeeded after {} attempts",
        context.getRetryCount());
    }
  }

  @Override
  public <T, E extends Throwable> void onError(RetryContext context,
                                                RetryCallback<T, E> callback,
                                                Throwable throwable) {
    logger.warn("Retry attempt {} failed: {}",
      context.getRetryCount(), throwable.getMessage());
  }
}

// Custom Exception Handler
@Component
public class BatchExceptionHandler implements StepExecutionListener {

  @Override
  public void beforeStep(StepExecution stepExecution) {
    // Setup
  }

  @Override
  public ExitStatus afterStep(StepExecution stepExecution) {
    List<Throwable> exceptions = stepExecution.getFailureExceptions();

    if (!exceptions.isEmpty()) {
      // Analyze exceptions
      long validationErrors = exceptions.stream()
        .filter(e -> e instanceof ValidationException)
        .count();

      long databaseErrors = exceptions.stream()
        .filter(e -> e instanceof DataAccessException)
        .count();

      System.out.println("Validation errors: " + validationErrors);
      System.out.println("Database errors: " + databaseErrors);

      // Decide exit status based on errors
      if (databaseErrors > 10) {
        return new ExitStatus("FAILED_WITH_DATABASE_ERRORS");
      }
    }

    return stepExecution.getExitStatus();
  }
}

// Dead Letter Queue for Failed Items
@Component
public class DeadLetterQueueWriter implements ItemWriter<User> {

  @Autowired
  private ErrorLogRepository errorLogRepository;

  @Override
  public void write(List<? extends User> items) throws Exception {
    for (User user : items) {
      ErrorLog errorLog = new ErrorLog();
      errorLog.setItemData(user.toString());
      errorLog.setErrorTime(LocalDateTime.now());
      errorLog.setProcessed(false);
      errorLogRepository.save(errorLog);
    }
  }
}

// Scheduled Job for Retry Failed Items
@Component
public class RetryFailedItemsJob {

  @Autowired
  private ErrorLogRepository errorLogRepository;

  @Autowired
  private UserService userService;

  @Scheduled(cron = "0 0 2 * * ?") // Run at 2 AM daily
  public void retryFailedItems() {
    List<ErrorLog> failedItems = errorLogRepository
      .findByProcessedFalse();

    for (ErrorLog errorLog : failedItems) {
      try {
        // Retry processing
        userService.processErrorLog(errorLog);
        errorLog.setProcessed(true);
        errorLog.setRetryTime(LocalDateTime.now());
        errorLogRepository.save(errorLog);
      } catch (Exception e) {
        errorLog.setRetryCount(errorLog.getRetryCount() + 1);
        errorLogRepository.save(errorLog);
      }
    }
  }
}
// Output: Robust error handling with skip, retry, and dead letter queue mechanisms`
    },
    {
      name: 'Spring Annotations Reference',
      icon: '@',
      explanation: `Comprehensive guide to commonly used Spring annotations. Covers core, MVC, Boot, Data, and Transaction annotations. Essential reference for Spring development.`,
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ CORE SPRING ANNOTATIONS
// ═══════════════════════════════════════════════════════════════════════════

// @Configuration - Indicates class contains bean definitions
@Configuration
public class AppConfig {
  @Bean
  public UserService userService() {
    return new UserServiceImpl();
  }
}

// @Component - Generic stereotype for Spring-managed component
@Component
public class UtilityComponent {
  public String formatData(String data) {
    return data.trim().toUpperCase();
  }
}

// @Service - Specialization of @Component for service layer
@Service
public class OrderService {
  private final OrderRepository orderRepository;

  public OrderService(OrderRepository orderRepository) {
    this.orderRepository = orderRepository;
  }

  public Order processOrder(OrderRequest request) {
    return orderRepository.save(new Order(request));
  }
}

// @Repository - Specialization for data access layer, enables exception translation
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  List<User> findByEmailContaining(String email);
}

// @Controller - Specialization for web controllers (returns view names)
@Controller
public class HomeController {
  @GetMapping("/")
  public String home(Model model) {
    model.addAttribute("message", "Welcome");
    return "home"; // Returns view name
  }
}

// @RestController - @Controller + @ResponseBody (returns data, not views)
@RestController
@RequestMapping("/api/users")
public class UserController {
  @GetMapping("/{id}")
  public User getUser(@PathVariable Long id) {
    return userService.findById(id); // Returns JSON
  }
}

// @Autowired - Automatic dependency injection
@Service
public class NotificationService {
  private final EmailSender emailSender;
  private final SmsSender smsSender;

  @Autowired // Optional on constructors since Spring 4.3
  public NotificationService(EmailSender emailSender, SmsSender smsSender) {
    this.emailSender = emailSender;
    this.smsSender = smsSender;
  }
}

// @Qualifier - Specify which bean to inject when multiple candidates exist
@Service
public class PaymentService {
  private final PaymentGateway paymentGateway;

  public PaymentService(@Qualifier("stripeGateway") PaymentGateway gateway) {
    this.paymentGateway = gateway;
  }
}

// @Primary - Mark bean as primary when multiple candidates exist
@Configuration
public class GatewayConfig {
  @Bean
  @Primary
  public PaymentGateway stripeGateway() {
    return new StripePaymentGateway();
  }

  @Bean
  public PaymentGateway paypalGateway() {
    return new PaypalPaymentGateway();
  }
}

// @Scope - Define bean scope (singleton, prototype, request, session)
@Component
@Scope("prototype") // New instance each time
public class ShoppingCart {
  private List<Item> items = new ArrayList<>();
}

// @Lazy - Delay bean initialization until first use
@Component
@Lazy
public class HeavyResourceLoader {
  public HeavyResourceLoader() {
    // Expensive initialization
  }
}

// @Value - Inject values from properties files
@Component
public class AppSettings {
  @Value("\${app.name}")
  private String appName;

  @Value("\${app.max.connections:100}") // Default value if not found
  private int maxConnections;

  @Value("#{systemProperties['user.name']}")
  private String username; // SpEL expression
}

// @PropertySource - Load properties file
@Configuration
@PropertySource("classpath:application.properties")
public class PropertiesConfig {
  // Properties loaded into environment
}

// @ConditionalOnProperty - Conditional bean creation based on properties
@Configuration
public class FeatureConfig {
  @Bean
  @ConditionalOnProperty(name = "feature.cache.enabled", havingValue = "true")
  public CacheManager cacheManager() {
    return new CaffeineCacheManager();
  }
}

// @Profile - Activate beans for specific profiles (dev, prod, test)
@Configuration
@Profile("dev")
public class DevConfig {
  @Bean
  public DataSource dataSource() {
    return new H2DataSource(); // In-memory for dev
  }
}

@Configuration
@Profile("prod")
public class ProdConfig {
  @Bean
  public DataSource dataSource() {
    return new PostgresDataSource(); // Real DB for prod
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ SPRING MVC ANNOTATIONS
// ═══════════════════════════════════════════════════════════════════════════

// @RequestMapping - Map web requests to handler methods
@RestController
@RequestMapping("/api/products")
public class ProductController {

  // @GetMapping - Shortcut for @RequestMapping(method = GET)
  @GetMapping
  public List<Product> getAllProducts() {
    return productService.findAll();
  }

  // @PostMapping - Shortcut for @RequestMapping(method = POST)
  @PostMapping
  public Product createProduct(@RequestBody ProductDTO productDTO) {
    return productService.create(productDTO);
  }

  // @PutMapping - Update resource
  @PutMapping("/{id}")
  public Product updateProduct(@PathVariable Long id, @RequestBody ProductDTO dto) {
    return productService.update(id, dto);
  }

  // @DeleteMapping - Delete resource
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
    productService.delete(id);
    return ResponseEntity.noContent().build();
  }

  // @PatchMapping - Partial update
  @PatchMapping("/{id}")
  public Product patchProduct(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
    return productService.patch(id, updates);
  }
}

// @PathVariable - Extract values from URI path
@GetMapping("/products/{id}/reviews/{reviewId}")
public Review getReview(@PathVariable Long id, @PathVariable Long reviewId) {
  return reviewService.findReview(id, reviewId);
}

// @RequestParam - Extract query parameters
@GetMapping("/search")
public List<Product> search(
  @RequestParam String query,
  @RequestParam(defaultValue = "0") int page,
  @RequestParam(defaultValue = "20") int size,
  @RequestParam(required = false) String category) {
  return productService.search(query, page, size, category);
}

// @RequestBody - Bind request body to object (JSON to Java)
@PostMapping("/users")
public User createUser(@RequestBody @Valid UserDTO userDTO) {
  return userService.create(userDTO);
}

// @ResponseBody - Bind return value to response body (Java to JSON)
// Not needed with @RestController, but used with @Controller
@Controller
public class DataController {
  @GetMapping("/data")
  @ResponseBody
  public Map<String, Object> getData() {
    return Map.of("key", "value");
  }
}

// @ResponseStatus - Set HTTP status code for response
@ResponseStatus(HttpStatus.CREATED)
@PostMapping("/articles")
public Article createArticle(@RequestBody ArticleDTO dto) {
  return articleService.create(dto);
}

// @ExceptionHandler - Handle specific exceptions
@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(ResourceNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public ErrorResponse handleNotFound(ResourceNotFoundException ex) {
    return new ErrorResponse(ex.getMessage());
  }

  @ExceptionHandler(ValidationException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ErrorResponse handleValidation(ValidationException ex) {
    return new ErrorResponse(ex.getMessage());
  }
}

// @ControllerAdvice - Global exception handling and model attributes
@ControllerAdvice
public class GlobalControllerAdvice {
  @ModelAttribute("appName")
  public String addAppName() {
    return "My Application";
  }
}

// @RestControllerAdvice - @ControllerAdvice + @ResponseBody
@RestControllerAdvice
public class ApiExceptionHandler {
  // Exception handlers here
}

// @CrossOrigin - Enable CORS for specific endpoints
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ApiController {
  @GetMapping("/data")
  public Data getData() {
    return dataService.getData();
  }
}

// @RequestHeader - Extract HTTP header values
@GetMapping("/info")
public String getInfo(@RequestHeader("User-Agent") String userAgent) {
  return "User agent: " + userAgent;
}

// @CookieValue - Extract cookie values
@GetMapping("/profile")
public String getProfile(@CookieValue("sessionId") String sessionId) {
  return userService.getProfileBySession(sessionId);
}

// @SessionAttribute - Access session attributes
@GetMapping("/cart")
public ShoppingCart getCart(@SessionAttribute("cart") ShoppingCart cart) {
  return cart;
}

// @ModelAttribute - Bind request parameters to model object
@PostMapping("/register")
public String register(@ModelAttribute @Valid UserRegistration registration) {
  userService.register(registration);
  return "redirect:/login";
}

// @Validated - Enable method-level validation
@RestController
@Validated
public class ValidationController {
  @GetMapping("/age")
  public String checkAge(@RequestParam @Min(18) @Max(100) int age) {
    return "Age is valid: " + age;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ SPRING BOOT ANNOTATIONS
// ═══════════════════════════════════════════════════════════════════════════

// @SpringBootApplication - Combines @Configuration, @EnableAutoConfiguration, @ComponentScan
@SpringBootApplication
public class Application {
  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }
}

// @EnableAutoConfiguration - Enable Spring Boot auto-configuration
// (Included in @SpringBootApplication)
@Configuration
@EnableAutoConfiguration
public class AppConfig {
  // Beans here
}

// @ConfigurationProperties - Bind external configuration to POJO
@Configuration
@ConfigurationProperties(prefix = "app.database")
public class DatabaseProperties {
  private String url;
  private String username;
  private String password;
  private int maxConnections;

  // Getters and setters
}

// @EnableConfigurationProperties - Enable @ConfigurationProperties beans
@Configuration
@EnableConfigurationProperties(DatabaseProperties.class)
public class AppConfig {
  // Configuration here
}

// @ConditionalOnClass - Create bean only if class is on classpath
@Configuration
public class CacheConfig {
  @Bean
  @ConditionalOnClass(name = "com.github.benmanes.caffeine.cache.Caffeine")
  public CacheManager cacheManager() {
    return new CaffeineCacheManager();
  }
}

// @ConditionalOnMissingBean - Create bean only if no bean of type exists
@Configuration
public class DefaultConfig {
  @Bean
  @ConditionalOnMissingBean
  public UserService userService() {
    return new DefaultUserService();
  }
}

// @ConditionalOnBean - Create bean only if specified bean exists
@Configuration
public class SecurityConfig {
  @Bean
  @ConditionalOnBean(DataSource.class)
  public SecurityManager securityManager(DataSource dataSource) {
    return new DatabaseSecurityManager(dataSource);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ SPRING DATA ANNOTATIONS
// ═══════════════════════════════════════════════════════════════════════════

// @Entity - JPA entity
@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true, nullable = false)
  private String email;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<Order> orders;
}

// @Query - Custom query methods
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  @Query("SELECT u FROM User u WHERE u.email LIKE %:email%")
  List<User> findByEmailContaining(@Param("email") String email);

  @Query(value = "SELECT * FROM users WHERE created_at > ?1", nativeQuery = true)
  List<User> findRecentUsers(LocalDateTime since);

  @Modifying
  @Query("UPDATE User u SET u.active = false WHERE u.lastLogin < ?1")
  int deactivateInactiveUsers(LocalDateTime cutoffDate);
}

// @Param - Name query parameters
@Query("SELECT u FROM User u WHERE u.age > :minAge AND u.country = :country")
List<User> findByAgeAndCountry(@Param("minAge") int minAge, @Param("country") String country);

// @Modifying - Indicate query modifies data (UPDATE, DELETE)
@Modifying
@Transactional
@Query("DELETE FROM User u WHERE u.active = false")
int deleteInactiveUsers();

// ═══════════════════════════════════════════════════════════════════════════
// ✦ TRANSACTION ANNOTATIONS
// ═══════════════════════════════════════════════════════════════════════════

// @Transactional - Declarative transaction management
@Service
public class OrderService {

  @Transactional // Default: readOnly=false, propagation=REQUIRED
  public Order createOrder(OrderRequest request) {
    Order order = orderRepository.save(new Order(request));
    inventoryService.reserveItems(order.getItems());
    paymentService.processPayment(order);
    return order;
  }

  @Transactional(readOnly = true) // Optimization for read-only operations
  public Order getOrder(Long id) {
    return orderRepository.findById(id)
      .orElseThrow(() -> new OrderNotFoundException(id));
  }

  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public void logActivity(String activity) {
    // Runs in new transaction, commits even if parent transaction rolls back
    activityRepository.save(new Activity(activity));
  }

  @Transactional(isolation = Isolation.SERIALIZABLE)
  public void criticalOperation() {
    // Highest isolation level, prevents all concurrency issues
  }

  @Transactional(timeout = 30) // Timeout in seconds
  public void longRunningOperation() {
    // Will rollback if takes longer than 30 seconds
  }

  @Transactional(rollbackFor = Exception.class)
  public void alwaysRollback() {
    // Rolls back on any exception (default is only RuntimeException)
  }

  @Transactional(noRollbackFor = ValidationException.class)
  public void ignoreValidationErrors() {
    // Won't rollback on ValidationException
  }
}

// @EnableTransactionManagement - Enable annotation-driven transaction management
@Configuration
@EnableTransactionManagement
public class TransactionConfig {
  @Bean
  public PlatformTransactionManager transactionManager(EntityManagerFactory emf) {
    return new JpaTransactionManager(emf);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ CACHING ANNOTATIONS
// ═══════════════════════════════════════════════════════════════════════════

// @Cacheable - Cache method results
@Service
public class ProductService {

  @Cacheable(value = "products", key = "#id")
  public Product findById(Long id) {
    // Result cached with key: id
    return productRepository.findById(id).orElse(null);
  }

  @Cacheable(value = "products", key = "#category", condition = "#category != null")
  public List<Product> findByCategory(String category) {
    // Only cached if category is not null
    return productRepository.findByCategory(category);
  }
}

// @CachePut - Update cache
@CachePut(value = "products", key = "#result.id")
public Product updateProduct(Long id, ProductDTO dto) {
  Product product = productRepository.findById(id).orElseThrow();
  product.update(dto);
  return productRepository.save(product);
}

// @CacheEvict - Remove from cache
@CacheEvict(value = "products", key = "#id")
public void deleteProduct(Long id) {
  productRepository.deleteById(id);
}

@CacheEvict(value = "products", allEntries = true)
public void clearAllProducts() {
  // Clear entire cache
}

// @Caching - Multiple cache operations
@Caching(
  cacheable = @Cacheable("products"),
  evict = {
    @CacheEvict(value = "categories", allEntries = true),
    @CacheEvict(value = "featured", allEntries = true)
  }
)
public Product createProduct(ProductDTO dto) {
  return productRepository.save(new Product(dto));
}

// @EnableCaching - Enable caching
@Configuration
@EnableCaching
public class CacheConfig {
  @Bean
  public CacheManager cacheManager() {
    return new CaffeineCacheManager("products", "users", "categories");
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ SCHEDULING ANNOTATIONS
// ═══════════════════════════════════════════════════════════════════════════

// @Scheduled - Schedule method execution
@Component
public class ScheduledTasks {

  @Scheduled(fixedRate = 5000) // Every 5 seconds
  public void reportStatus() {
    System.out.println("Status: OK");
  }

  @Scheduled(fixedDelay = 10000) // 10 seconds after previous execution completes
  public void processQueue() {
    // Process items
  }

  @Scheduled(initialDelay = 60000, fixedRate = 300000) // Wait 1 min, then every 5 min
  public void syncData() {
    // Sync with external system
  }

  @Scheduled(cron = "0 0 2 * * ?") // Every day at 2 AM
  public void dailyCleanup() {
    // Cleanup old data
  }

  @Scheduled(cron = "0 0/15 * * * ?") // Every 15 minutes
  public void frequentCheck() {
    // Check something
  }
}

// @EnableScheduling - Enable scheduling
@Configuration
@EnableScheduling
public class SchedulingConfig {
  // Scheduling enabled
}

// @Async - Execute method asynchronously
@Service
public class EmailService {

  @Async
  public void sendEmail(String to, String subject, String body) {
    // Runs in separate thread
    emailSender.send(to, subject, body);
  }

  @Async
  public CompletableFuture<String> processAsync() {
    // Return CompletableFuture for async result
    String result = heavyComputation();
    return CompletableFuture.completedFuture(result);
  }
}

// @EnableAsync - Enable async execution
@Configuration
@EnableAsync
public class AsyncConfig {
  @Bean
  public Executor taskExecutor() {
    ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
    executor.setCorePoolSize(5);
    executor.setMaxPoolSize(10);
    executor.setQueueCapacity(100);
    executor.setThreadNamePrefix("async-");
    executor.initialize();
    return executor;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ TESTING ANNOTATIONS
// ═══════════════════════════════════════════════════════════════════════════

// @SpringBootTest - Full application context for integration tests
@SpringBootTest
public class ApplicationTest {
  @Autowired
  private UserService userService;

  @Test
  public void testUserCreation() {
    User user = userService.createUser(new UserDTO());
    assertNotNull(user.getId());
  }
}

// @WebMvcTest - Test web layer only
@WebMvcTest(UserController.class)
public class UserControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private UserService userService;

  @Test
  public void testGetUser() throws Exception {
    when(userService.findById(1L)).thenReturn(new User());

    mockMvc.perform(get("/api/users/1"))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.id").value(1));
  }
}

// @DataJpaTest - Test JPA repositories
@DataJpaTest
public class UserRepositoryTest {
  @Autowired
  private UserRepository userRepository;

  @Test
  public void testFindByEmail() {
    User user = new User("test@example.com");
    userRepository.save(user);

    List<User> found = userRepository.findByEmailContaining("test");
    assertEquals(1, found.size());
  }
}

// @MockBean - Create mock bean in context
@SpringBootTest
public class ServiceTest {
  @MockBean
  private ExternalService externalService;

  @Autowired
  private MyService myService;

  @Test
  public void testWithMock() {
    when(externalService.getData()).thenReturn("mocked");
    assertEquals("mocked", myService.processData());
  }
}

// @TestConfiguration - Additional configuration for tests
@TestConfiguration
public class TestConfig {
  @Bean
  public TestDataGenerator testDataGenerator() {
    return new TestDataGenerator();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ VALIDATION ANNOTATIONS
// ═══════════════════════════════════════════════════════════════════════════

// Bean Validation annotations (from javax.validation)
public class UserDTO {
  @NotNull(message = "Email cannot be null")
  @Email(message = "Invalid email format")
  private String email;

  @NotBlank(message = "Name is required")
  @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
  private String name;

  @Min(value = 18, message = "Must be at least 18 years old")
  @Max(value = 120, message = "Age must be less than 120")
  private Integer age;

  @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Invalid phone number")
  private String phone;

  @Past(message = "Birth date must be in the past")
  private LocalDate birthDate;

  @Future(message = "Appointment must be in the future")
  private LocalDateTime appointmentTime;

  @Valid // Validate nested object
  private AddressDTO address;

  // Getters and setters
}

// Custom validation annotation
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UniqueEmailValidator.class)
public @interface UniqueEmail {
  String message() default "Email already exists";
  Class<?>[] groups() default {};
  Class<? extends Payload>[] payload() default {};
}

// Output: Comprehensive Spring annotations reference with examples`
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
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #064e3b, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          padding: '2rem',
          maxWidth: '95%',
          margin: '120px auto 0',
          background: 'linear-gradient(to bottom right, #1f2937, #111827)',
          borderRadius: '16px',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
          border: '1px solid #374151'
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
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
          >
            ← Back to Frameworks
          </button>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              background: 'linear-gradient(to right, #6ee7b7, #34d399)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Spring Framework
            </h1>
            {currentSubcategory && (
              <span style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                backgroundColor: '#064e3b',
                color: '#6ee7b7',
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

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{
        backgroundColor: '#064e3b',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        borderLeft: '4px solid #10b981',
        marginBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.3rem',
          color: '#d1d5db',
          fontWeight: '500',
          margin: 0,
          lineHeight: '1.8',
          textAlign: 'center'
        }}>
          Spring Framework is a comprehensive enterprise application development framework providing IoC container, dependency injection,
          aspect-oriented programming, declarative transaction management, and integrations for web MVC, data access, security, and batch processing.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedConcept ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {!selectedConcept ? (
          concepts.map((concept, idx) => (
            <div
              key={idx}
              onClick={() => handleConceptClick(concept)}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid #374151',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to bottom right, #1f2937, #064e3b)'
                e.currentTarget.style.borderColor = '#10b981'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(16, 185, 129, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to bottom right, #1f2937, #111827)'
                e.currentTarget.style.borderColor = '#374151'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{concept.icon}</div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: '#6ee7b7',
                  margin: '0 0 0.5rem 0'
                }}>
                  {concept.name}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#d1d5db',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {concept.explanation ? concept.explanation.substring(0, 100) + '...' : 'Click to explore'}
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
                color: 'white',
                marginBottom: '1.5rem'
              }}>
                Spring Concepts
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {concepts.map((concept, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleConceptClick(concept)}
                    style={{
                      backgroundColor: selectedConcept?.name === concept.name
                        ? '#064e3b'
                        : '#1f2937',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: selectedConcept?.name === concept.name
                        ? '2px solid #10b981'
                        : '1px solid #374151',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedConcept?.name !== concept.name) {
                        e.currentTarget.style.backgroundColor = '#374151'
                        e.currentTarget.style.borderColor = '#10b981'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedConcept?.name !== concept.name) {
                        e.currentTarget.style.backgroundColor = '#1f2937'
                        e.currentTarget.style.borderColor = '#374151'
                      }
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>{concept.icon}</span>
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: selectedConcept?.name === concept.name ? '#6ee7b7' : 'white'
                      }}>
                        {concept.name}
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
                color: '#6ee7b7',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: '2rem' }}>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h3>

              <div style={{
                backgroundColor: '#064e3b',
                padding: '1.5rem',
                borderRadius: '12px',
                borderLeft: '4px solid #10b981',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  fontSize: '1rem',
                  color: '#d1d5db',
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
                  color: '#6ee7b7',
                  margin: '0 0 1rem 0'
                }}>
                  Code Examples
                </h4>
                {(() => {
                  const sections = parseCodeSections(selectedConcept.codeExample)
                  if (sections.length === 0) {
                    return (
                      <div style={{
                        backgroundColor: '#1e293b',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: '1px solid #374151'
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
                              backgroundColor: '#1f2937',
                              borderRadius: '12px',
                              border: '1px solid #374151',
                              overflow: 'hidden'
                            }}
                          >
                            <button
                              onClick={() => toggleSection(sectionKey)}
                              style={{
                                width: '100%',
                                padding: '1.25rem',
                                backgroundColor: isExpanded ? '#064e3b' : '#1f2937',
                                border: 'none',
                                borderBottom: isExpanded ? '1px solid #10b981' : 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                transition: 'all 0.2s ease',
                                textAlign: 'left'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#064e3b'
                              }}
                              onMouseLeave={(e) => {
                                if (!isExpanded) {
                                  e.currentTarget.style.backgroundColor = '#1f2937'
                                }
                              }}
                            >
                              <span style={{
                                fontSize: '1.05rem',
                                fontWeight: '700',
                                color: '#6ee7b7'
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
      </div>
    </div>
  )
}

export default Spring

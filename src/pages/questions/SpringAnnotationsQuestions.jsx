import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

export default function SpringAnnotationsQuestions({ onBack, breadcrumb }) {
  const [expandedQuestionId, setExpandedQuestionId] = useState(null)
  const categoryColor = '#a855f7'

  const questions = [
    {
      id: 1,
      category: 'Core Annotations',
      difficulty: 'Medium',
      question: 'Explain Spring stereotype annotations (@Component, @Service, @Repository, @Controller)',
      answer: `**Spring Stereotype Annotations:**
Used to auto-detect and register beans in the Spring IoC container through component scanning.

**1. @Component:**
Generic stereotype for any Spring-managed component
\`\`\`java
@Component
public class EmailValidator {
    public boolean isValid(String email) {
        return email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }
}
\`\`\`

**2. @Service:**
Specialization of @Component, indicates business logic layer
\`\`\`java
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public User createUser(UserDto dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        return userRepository.save(user);
    }
}
\`\`\`

**3. @Repository:**
Specialization of @Component for Data Access layer
Provides automatic exception translation (SQLException → DataAccessException)
\`\`\`java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}

// Or with custom implementation
@Repository
public class CustomUserRepositoryImpl {
    @PersistenceContext
    private EntityManager entityManager;

    public List<User> findByCustomCriteria(String criteria) {
        // Custom JPQL or native query
    }
}
\`\`\`

**4. @Controller:**
Specialization of @Component for web layer (Spring MVC)
\`\`\`java
@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/users/{id}")
    public String getUser(@PathVariable Long id, Model model) {
        User user = userService.findById(id);
        model.addAttribute("user", user);
        return "user-details"; // View name
    }
}
\`\`\`

**5. @RestController:**
Combination of @Controller + @ResponseBody
Returns data directly instead of view names
\`\`\`java
@RestController
@RequestMapping("/api/users")
public class UserRestController {
    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody @Valid UserDto dto) {
        User user = userService.createUser(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
}
\`\`\`

**Comparison:**
| Annotation | Layer | Special Features |
|------------|-------|------------------|
| @Component | Generic | Base stereotype |
| @Service | Business | Transaction management |
| @Repository | Data Access | Exception translation |
| @Controller | Presentation | Spring MVC support |
| @RestController | REST API | @ResponseBody included |

**Component Scanning:**
\`\`\`java
@Configuration
@ComponentScan(basePackages = {"com.example.service", "com.example.repository"},
               excludeFilters = @ComponentScan.Filter(
                   type = FilterType.ASSIGNABLE_TYPE,
                   classes = LegacyClass.class))
public class AppConfig {
}
\`\`\`

**Bean Naming:**
\`\`\`java
@Service("customUserService")
public class UserService { }

@Component  // Bean name: userValidator (camelCase)
public class UserValidator { }
\`\`\``
    },
    {
      id: 2,
      category: 'Configuration',
      difficulty: 'Medium',
      question: 'Explain @Configuration, @Bean, and @ComponentScan annotations',
      answer: `**Configuration Annotations:**

**1. @Configuration:**
Indicates class contains Spring bean definitions
\`\`\`java
@Configuration
public class AppConfig {

    @Bean
    public DataSource dataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/mydb");
        dataSource.setUsername("root");
        dataSource.setPassword("password");
        dataSource.setMaximumPoolSize(10);
        return dataSource;
    }

    @Bean
    public EntityManagerFactory entityManagerFactory(DataSource dataSource) {
        LocalContainerEntityManagerFactoryBean factory =
            new LocalContainerEntityManagerFactoryBean();
        factory.setDataSource(dataSource);
        factory.setPackagesToScan("com.example.entity");
        factory.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
        factory.afterPropertiesSet();
        return factory.getObject();
    }
}
\`\`\`

**2. @Bean:**
Declares a method that returns a Spring bean
\`\`\`java
@Configuration
public class ServiceConfig {

    // Simple bean
    @Bean
    public EmailService emailService() {
        return new EmailService();
    }

    // Bean with dependencies
    @Bean
    public UserService userService(UserRepository repository,
                                   EmailService emailService) {
        return new UserService(repository, emailService);
    }

    // Bean with custom name
    @Bean(name = "primaryCache")
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("users", "products");
    }

    // Bean with init and destroy methods
    @Bean(initMethod = "initialize", destroyMethod = "cleanup")
    public ConnectionPool connectionPool() {
        return new ConnectionPool();
    }

    // Conditional bean
    @Bean
    @ConditionalOnProperty(name = "feature.enabled", havingValue = "true")
    public FeatureService featureService() {
        return new FeatureService();
    }
}
\`\`\`

**3. @ComponentScan:**
Configures component scanning directives
\`\`\`java
@Configuration
@ComponentScan(
    basePackages = {"com.example.service", "com.example.repository"},
    basePackageClasses = {AppMarker.class},
    includeFilters = @ComponentScan.Filter(
        type = FilterType.ANNOTATION,
        classes = CustomComponent.class
    ),
    excludeFilters = @ComponentScan.Filter(
        type = FilterType.REGEX,
        pattern = "com\\.example\\.excluded\\..*"
    ),
    lazyInit = true,
    useDefaultFilters = false
)
public class ComponentScanConfig {
}
\`\`\`

**@Import:**
Import other configuration classes
\`\`\`java
@Configuration
@Import({DatabaseConfig.class, SecurityConfig.class})
public class MainConfig {
}
\`\`\`

**@PropertySource:**
Load external properties
\`\`\`java
@Configuration
@PropertySource("classpath:application.properties")
@PropertySource("classpath:database-\${env}.properties")
public class PropertiesConfig {

    @Value("\${app.name}")
    private String appName;

    @Bean
    public static PropertySourcesPlaceholderConfigurer propertyConfigurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }
}
\`\`\`

**@Profile:**
Load beans based on active profile
\`\`\`java
@Configuration
public class ProfileConfig {

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
        HikariDataSource ds = new HikariDataSource();
        ds.setJdbcUrl("jdbc:mysql://prod-server:3306/proddb");
        return ds;
    }
}
\`\`\`

**@Lazy:**
Delay bean initialization
\`\`\`java
@Configuration
public class LazyConfig {

    @Bean
    @Lazy
    public ExpensiveService expensiveService() {
        // Only created when first accessed
        return new ExpensiveService();
    }
}
\`\`\`

**Full Config Example:**
\`\`\`java
@Configuration
@EnableTransactionManagement
@EnableCaching
@EnableScheduling
@ComponentScan(basePackages = "com.example")
@PropertySource("classpath:application.properties")
public class ApplicationConfig {

    @Bean
    public PlatformTransactionManager transactionManager(
            EntityManagerFactory emf) {
        return new JpaTransactionManager(emf);
    }

    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("users", "products");
    }
}
\`\`\``
    },
    {
      id: 3,
      category: 'Dependency Injection',
      difficulty: 'Hard',
      question: 'Explain @Autowired, @Qualifier, @Primary, and @Resource annotations',
      answer: `**Dependency Injection Annotations:**

**1. @Autowired:**
Auto-wiring by type
\`\`\`java
@Service
public class UserService {

    // Field injection (not recommended)
    @Autowired
    private UserRepository userRepository;

    // Constructor injection (recommended)
    private final EmailService emailService;

    @Autowired  // Optional since Spring 4.3
    public UserService(EmailService emailService) {
        this.emailService = emailService;
    }

    // Setter injection
    private NotificationService notificationService;

    @Autowired
    public void setNotificationService(NotificationService service) {
        this.notificationService = service;
    }

    // Method injection
    @Autowired
    public void initServices(AuditService auditService,
                            LoggingService loggingService) {
        // Initialize services
    }

    // Optional dependency
    @Autowired(required = false)
    private Optional<CacheService> cacheService;

    // Collection injection
    @Autowired
    private List<PaymentProcessor> paymentProcessors;
}
\`\`\`

**2. @Qualifier:**
Resolve ambiguity when multiple beans of same type exist
\`\`\`java
public interface PaymentService {
    void processPayment(BigDecimal amount);
}

@Service("creditCardPayment")
public class CreditCardPaymentService implements PaymentService {
    @Override
    public void processPayment(BigDecimal amount) {
        // Credit card logic
    }
}

@Service("paypalPayment")
public class PayPalPaymentService implements PaymentService {
    @Override
    public void processPayment(BigDecimal amount) {
        // PayPal logic
    }
}

@Service
public class CheckoutService {

    // Inject specific implementation
    @Autowired
    @Qualifier("creditCardPayment")
    private PaymentService paymentService;

    // Or in constructor
    public CheckoutService(
            @Qualifier("paypalPayment") PaymentService paymentService) {
        this.paymentService = paymentService;
    }
}

// Custom qualifier annotation
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Qualifier
public @interface CreditCard {
}

@Service
@CreditCard
public class CreditCardPaymentService implements PaymentService {
}

@Service
public class OrderService {
    @Autowired
    @CreditCard
    private PaymentService paymentService;
}
\`\`\`

**3. @Primary:**
Default bean when multiple candidates exist
\`\`\`java
@Service
@Primary
public class DefaultPaymentService implements PaymentService {
    // This will be injected by default
}

@Service
public class AlternativePaymentService implements PaymentService {
    // Available but not default
}

@Service
public class OrderService {
    @Autowired
    private PaymentService paymentService;  // Gets DefaultPaymentService
}
\`\`\`

**4. @Resource:**
JSR-250 annotation, auto-wire by name
\`\`\`java
@Service
public class UserService {

    @Resource(name = "userRepository")
    private UserRepository repository;

    @Resource  // Uses field name to find bean
    private EmailService emailService;
}
\`\`\`

**5. @Inject:**
JSR-330 annotation, similar to @Autowired
\`\`\`java
@Service
public class OrderService {

    @Inject
    private OrderRepository orderRepository;

    @Inject
    @Named("creditCardPayment")
    private PaymentService paymentService;
}
\`\`\`

**Resolving Multiple Candidates:**
\`\`\`java
public interface NotificationService {
    void send(String message);
}

@Service
@Primary
public class EmailNotificationService implements NotificationService {
    @Override
    public void send(String message) {
        // Email notification
    }
}

@Service
@Qualifier("sms")
public class SmsNotificationService implements NotificationService {
    @Override
    public void send(String message) {
        // SMS notification
    }
}

@Service
public class AlertService {

    // Gets EmailNotificationService (Primary)
    @Autowired
    private NotificationService defaultNotification;

    // Gets SmsNotificationService
    @Autowired
    @Qualifier("sms")
    private NotificationService smsNotification;

    // Gets all implementations
    @Autowired
    private List<NotificationService> allNotifications;

    // Gets all as map (beanName -> instance)
    @Autowired
    private Map<String, NotificationService> notificationMap;
}
\`\`\`

**Comparison:**
| Annotation | Auto-wire By | Standard | Required |
|------------|--------------|----------|----------|
| @Autowired | Type | Spring | No (default) |
| @Qualifier | Name (with @Autowired) | Spring | - |
| @Primary | - | Spring | - |
| @Resource | Name, then Type | JSR-250 | No |
| @Inject | Type | JSR-330 | Yes |

**Best Practices:**
• Use constructor injection with @Autowired
• Use @Primary for default implementations
• Use @Qualifier for named injection
• Avoid field injection (hard to test)
• Use @Resource for name-based wiring`
    },
    {
      id: 4,
      category: 'AOP',
      difficulty: 'Hard',
      question: 'Explain Spring AOP annotations (@Aspect, @Before, @After, @Around, @Pointcut)',
      answer: `**Spring AOP Annotations:**

**1. @Aspect:**
Marks a class as an aspect containing advice
\`\`\`java
@Aspect
@Component
public class LoggingAspect {
    // Advice methods here
}
\`\`\`

**2. @Pointcut:**
Defines reusable pointcut expressions
\`\`\`java
@Aspect
@Component
public class SystemArchitecture {

    // Match all methods in service layer
    @Pointcut("execution(* com.example.service.*.*(..))")
    public void serviceLayer() {}

    // Match all methods in repository layer
    @Pointcut("execution(* com.example.repository.*.*(..))")
    public void repositoryLayer() {}

    // Match all public methods
    @Pointcut("execution(public * *(..))")
    public void publicMethod() {}

    // Match methods with @Transactional
    @Pointcut("@annotation(org.springframework.transaction.annotation.Transactional)")
    public void transactionalMethod() {}

    // Match classes with @Service
    @Pointcut("@within(org.springframework.stereotype.Service)")
    public void serviceClass() {}

    // Combine pointcuts
    @Pointcut("serviceLayer() && publicMethod()")
    public void publicServiceMethod() {}
}
\`\`\`

**3. @Before:**
Execute before method execution
\`\`\`java
@Aspect
@Component
@Slf4j
public class LoggingAspect {

    @Before("execution(* com.example.service.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        log.info("Executing: {}.{}",
            joinPoint.getSignature().getDeclaringTypeName(),
            joinPoint.getSignature().getName());
        log.info("Arguments: {}", Arrays.toString(joinPoint.getArgs()));
    }

    @Before("@annotation(audited)")
    public void logAudit(JoinPoint joinPoint, Audited audited) {
        log.info("Audit: {} - {}", audited.action(), joinPoint.getSignature());
    }
}
\`\`\`

**4. @After:**
Execute after method execution (finally block)
\`\`\`java
@Aspect
@Component
public class CleanupAspect {

    @After("execution(* com.example.service.*.*(..))")
    public void cleanup(JoinPoint joinPoint) {
        log.info("Cleanup after: {}", joinPoint.getSignature().getName());
        // Cleanup resources
    }
}
\`\`\`

**5. @AfterReturning:**
Execute after successful method execution
\`\`\`java
@Aspect
@Component
public class AuditAspect {

    @AfterReturning(
        pointcut = "execution(* com.example.service.UserService.createUser(..))",
        returning = "user")
    public void auditUserCreation(JoinPoint joinPoint, User user) {
        log.info("User created: {} by {}",
            user.getUsername(),
            SecurityContextHolder.getContext().getAuthentication().getName());
    }
}
\`\`\`

**6. @AfterThrowing:**
Execute when method throws exception
\`\`\`java
@Aspect
@Component
public class ExceptionAspect {

    @AfterThrowing(
        pointcut = "execution(* com.example.service.*.*(..))",
        throwing = "exception")
    public void logException(JoinPoint joinPoint, Exception exception) {
        log.error("Exception in {}.{}: {}",
            joinPoint.getSignature().getDeclaringTypeName(),
            joinPoint.getSignature().getName(),
            exception.getMessage());

        // Send alert
        notificationService.sendAlert("Exception occurred", exception);
    }
}
\`\`\`

**7. @Around:**
Most powerful advice, controls method execution
\`\`\`java
@Aspect
@Component
public class PerformanceAspect {

    @Around("execution(* com.example.service.*.*(..))")
    public Object measurePerformance(ProceedingJoinPoint joinPoint)
            throws Throwable {

        long start = System.currentTimeMillis();

        try {
            // Proceed with method execution
            Object result = joinPoint.proceed();

            long duration = System.currentTimeMillis() - start;
            log.info("{} executed in {}ms",
                joinPoint.getSignature().getName(), duration);

            return result;
        } catch (Exception e) {
            log.error("Exception in {}: {}",
                joinPoint.getSignature().getName(), e.getMessage());
            throw e;
        }
    }

    @Around("@annotation(cacheable)")
    public Object cacheResult(ProceedingJoinPoint joinPoint, Cacheable cacheable)
            throws Throwable {

        String cacheKey = generateCacheKey(joinPoint);

        // Check cache
        Object cached = cacheService.get(cacheKey);
        if (cached != null) {
            return cached;
        }

        // Execute method
        Object result = joinPoint.proceed();

        // Store in cache
        cacheService.put(cacheKey, result);

        return result;
    }
}
\`\`\`

**Complete Example:**
\`\`\`java
@Aspect
@Component
@Order(1)  // Aspect execution order
@Slf4j
public class SecurityAspect {

    @Pointcut("@annotation(com.example.annotation.Secured)")
    public void securedMethod() {}

    @Around("securedMethod() && @annotation(secured)")
    public Object checkSecurity(ProceedingJoinPoint joinPoint, Secured secured)
            throws Throwable {

        Authentication auth = SecurityContextHolder.getContext()
            .getAuthentication();

        if (auth == null || !auth.isAuthenticated()) {
            throw new SecurityException("User not authenticated");
        }

        // Check roles
        String[] requiredRoles = secured.roles();
        boolean hasRole = Arrays.stream(requiredRoles)
            .anyMatch(role -> auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals(role)));

        if (!hasRole) {
            throw new SecurityException("Insufficient permissions");
        }

        // Proceed with method
        return joinPoint.proceed();
    }
}

// Custom annotation
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Secured {
    String[] roles() default {};
}

// Usage
@Service
public class AdminService {

    @Secured(roles = {"ROLE_ADMIN"})
    public void deleteUser(Long userId) {
        // Only admins can execute
    }
}
\`\`\`

**Pointcut Expression Syntax:**
\`\`\`java
// Execution
execution(modifiers? return-type declaring-type? method-name(params) throws?)

// Examples:
execution(public * *(..))                    // All public methods
execution(* set*(..))                        // All setter methods
execution(* com.example.service.*.*(..))     // All methods in service package
execution(* com.example.service..*.*(..))    // Including subpackages

// Within
within(com.example.service.*)                // All methods in service package
within(com.example..*)                       // All methods in subpackages

// This
this(com.example.service.UserService)        // Proxy implements interface

// Target
target(com.example.service.UserService)      // Target object type

// Args
args(java.lang.String, ..)                   // First param is String

// Bean
bean(userService)                            // Bean name matches
bean(*Service)                               // Bean name ends with Service
\`\`\`

**Enable AOP:**
\`\`\`java
@Configuration
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class AopConfig {
}
\`\`\``
    },
    {
      id: 5,
      category: 'Transaction',
      difficulty: 'Hard',
      question: 'Explain @Transactional annotation and its attributes in detail',
      answer: `**@Transactional Annotation:**
Declarative transaction management in Spring

**Basic Usage:**
\`\`\`java
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public User createUser(UserDto dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        return userRepository.save(user);
    }
}
\`\`\`

**Attributes:**

**1. propagation:**
Transaction propagation behavior
\`\`\`java
@Service
public class OrderService {

    // REQUIRED (Default): Use existing transaction or create new
    @Transactional(propagation = Propagation.REQUIRED)
    public void processOrder(Order order) {
        // Joins existing transaction or creates new
    }

    // REQUIRES_NEW: Always create new transaction, suspend existing
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void auditLog(String action) {
        // Always in separate transaction
        // Commits even if outer transaction rolls back
    }

    // SUPPORTS: Use transaction if exists, non-transactional otherwise
    @Transactional(propagation = Propagation.SUPPORTS)
    public User findUser(Long id) {
        // Read operation, transaction not required
    }

    // NOT_SUPPORTED: Execute non-transactionally, suspend existing
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public void sendEmail(String email) {
        // Always non-transactional
    }

    // MANDATORY: Must have existing transaction, throw exception otherwise
    @Transactional(propagation = Propagation.MANDATORY)
    public void updateInventory(Long productId) {
        // Must be called within transaction
    }

    // NEVER: Execute non-transactionally, throw exception if transaction exists
    @Transactional(propagation = Propagation.NEVER)
    public void nonTransactionalOperation() {
        // Must not have transaction
    }

    // NESTED: Nested transaction with savepoint
    @Transactional(propagation = Propagation.NESTED)
    public void nestedOperation() {
        // Can rollback to savepoint
    }
}
\`\`\`

**2. isolation:**
Transaction isolation level
\`\`\`java
@Service
public class BankService {

    // READ_UNCOMMITTED: Dirty reads possible
    @Transactional(isolation = Isolation.READ_UNCOMMITTED)
    public void readUncommitted() {
        // Lowest isolation, highest performance
        // Can read uncommitted changes
    }

    // READ_COMMITTED: Prevent dirty reads
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void readCommitted() {
        // Default for most databases
        // Non-repeatable reads possible
    }

    // REPEATABLE_READ: Prevent dirty and non-repeatable reads
    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public void repeatableRead() {
        // Phantom reads possible
    }

    // SERIALIZABLE: Highest isolation
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void serializable() {
        // Complete isolation, lowest performance
        // Prevents all phenomena
    }
}
\`\`\`

**3. timeout:**
Transaction timeout in seconds
\`\`\`java
@Transactional(timeout = 30)  // 30 seconds
public void longRunningOperation() {
    // Throws exception if exceeds 30 seconds
}
\`\`\`

**4. readOnly:**
Optimization hint for read-only transactions
\`\`\`java
@Transactional(readOnly = true)
public List<User> getAllUsers() {
    // Optimization for read operations
    // Some databases can optimize read-only transactions
    return userRepository.findAll();
}
\`\`\`

**5. rollbackFor / noRollbackFor:**
Control rollback behavior
\`\`\`java
@Service
public class PaymentService {

    // Rollback on checked exceptions
    @Transactional(rollbackFor = {PaymentException.class, IOException.class})
    public void processPayment(Payment payment)
            throws PaymentException, IOException {
        // Rolls back on specified exceptions
    }

    // Don't rollback on specific exceptions
    @Transactional(noRollbackFor = {TemporaryException.class})
    public void retryableOperation() throws TemporaryException {
        // Won't rollback on TemporaryException
    }

    // Rollback on all exceptions
    @Transactional(rollbackFor = Exception.class)
    public void criticalOperation() throws Exception {
        // Rolls back on any exception
    }
}
\`\`\`

**6. rollbackForClassName / noRollbackForClassName:**
String-based exception names
\`\`\`java
@Transactional(
    rollbackForClassName = {"java.lang.Exception"},
    noRollbackForClassName = {"com.example.IgnoredException"}
)
public void complexOperation() {
}
\`\`\`

**7. transactionManager:**
Specify transaction manager bean
\`\`\`java
@Transactional(transactionManager = "customTransactionManager")
public void useCustomTxManager() {
    // Uses specific transaction manager
}

@Configuration
public class TransactionConfig {

    @Bean
    public PlatformTransactionManager customTransactionManager(
            DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
}
\`\`\`

**Complete Example:**
\`\`\`java
@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private PaymentService paymentService;

    @Transactional(
        propagation = Propagation.REQUIRED,
        isolation = Isolation.READ_COMMITTED,
        timeout = 60,
        rollbackFor = {OrderException.class, PaymentException.class},
        noRollbackFor = {ValidationException.class}
    )
    public Order createOrder(OrderRequest request)
            throws OrderException, PaymentException {

        // Validate
        validateOrder(request);  // Won't rollback if ValidationException

        // Create order
        Order order = new Order();
        order.setCustomerId(request.getCustomerId());
        order = orderRepository.save(order);

        // Update inventory (same transaction)
        inventoryService.reserveItems(request.getItems());

        // Process payment (new transaction)
        paymentService.processPayment(order.getId(), request.getAmount());

        return order;
    }

    @Transactional(readOnly = true)
    public List<Order> getCustomerOrders(Long customerId) {
        return orderRepository.findByCustomerId(customerId);
    }
}

@Service
public class PaymentService {

    @Transactional(propagation = Propagation.REQUIRES_NEW,
                   isolation = Isolation.SERIALIZABLE)
    public void processPayment(Long orderId, BigDecimal amount)
            throws PaymentException {
        // Always in separate transaction
        // Even if order creation fails, payment is recorded
    }
}
\`\`\`

**Class-Level Transaction:**
\`\`\`java
@Service
@Transactional(readOnly = true)
public class UserService {

    // Inherits readOnly = true
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // Override class-level settings
    @Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
    public User createUser(UserDto dto) {
        // Write operation
        return userRepository.save(new User(dto));
    }
}
\`\`\`

**Enable Transaction Management:**
\`\`\`java
@Configuration
@EnableTransactionManagement
public class TransactionConfig {

    @Bean
    public PlatformTransactionManager transactionManager(
            EntityManagerFactory emf) {
        return new JpaTransactionManager(emf);
    }
}
\`\`\`

**Common Pitfalls:**
\`\`\`java
@Service
public class UserService {

    // ❌ Self-invocation doesn't work (proxy bypass)
    public void publicMethod() {
        this.transactionalMethod();  // Transaction not applied!
    }

    @Transactional
    private void transactionalMethod() {
        // Never called through proxy
    }

    // ✅ Inject self or use separate service
    @Autowired
    private UserService self;

    public void publicMethod() {
        self.transactionalMethod();  // Works!
    }
}
\`\`\``
    },
    {
      id: 6,
      category: 'Validation',
      difficulty: 'Medium',
      question: 'Explain Spring validation annotations (@Valid, @Validated, Bean Validation)',
      answer: `**Spring Validation Annotations:**

**1. JSR-303/JSR-380 Bean Validation:**
\`\`\`java
public class UserDto {

    @NotNull(message = "Username cannot be null")
    @NotBlank(message = "Username cannot be blank")
    @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
    private String username;

    @NotNull
    @Email(message = "Invalid email format")
    private String email;

    @NotNull
    @Size(min = 8, message = "Password must be at least 8 characters")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
             message = "Password must contain letter, number and special character")
    private String password;

    @Min(value = 18, message = "Must be at least 18 years old")
    @Max(value = 120, message = "Age must be realistic")
    private Integer age;

    @Past(message = "Birth date must be in the past")
    private LocalDate birthDate;

    @Future(message = "Expiry date must be in the future")
    private LocalDate expiryDate;

    @Positive
    private BigDecimal salary;

    @DecimalMin(value = "0.0", inclusive = false)
    @DecimalMax(value = "100.0")
    @Digits(integer = 3, fraction = 2)
    private BigDecimal percentage;

    @AssertTrue(message = "Must accept terms")
    private Boolean termsAccepted;

    @NotEmpty
    private List<String> roles;

    @Valid  // Nested validation
    private AddressDto address;
}

public class AddressDto {

    @NotBlank
    private String street;

    @NotBlank
    @Size(min = 5, max = 10)
    private String zipCode;

    @NotBlank
    private String city;
}
\`\`\`

**2. @Valid:**
JSR-303 annotation, triggers validation
\`\`\`java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @PostMapping
    public ResponseEntity<?> createUser(
            @Valid @RequestBody UserDto userDto,
            BindingResult result) {

        if (result.hasErrors()) {
            Map<String, String> errors = result.getFieldErrors()
                .stream()
                .collect(Collectors.toMap(
                    FieldError::getField,
                    FieldError::getDefaultMessage
                ));
            return ResponseEntity.badRequest().body(errors);
        }

        User user = userService.createUser(userDto);
        return ResponseEntity.ok(user);
    }

    // Path variable validation
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(
            @PathVariable @Min(1) Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    // Request param validation
    @GetMapping
    public ResponseEntity<List<User>> searchUsers(
            @RequestParam @NotBlank String keyword,
            @RequestParam @Min(0) @Max(100) int page) {
        return ResponseEntity.ok(userService.search(keyword, page));
    }
}
\`\`\`

**3. @Validated:**
Spring annotation, supports validation groups
\`\`\`java
// Validation groups
public interface CreateValidation {}
public interface UpdateValidation {}

public class UserDto {

    @Null(groups = CreateValidation.class)
    @NotNull(groups = UpdateValidation.class)
    private Long id;

    @NotBlank(groups = {CreateValidation.class, UpdateValidation.class})
    private String username;

    @NotBlank(groups = CreateValidation.class)
    @Null(groups = UpdateValidation.class)
    private String password;

    @Email(groups = {CreateValidation.class, UpdateValidation.class})
    private String email;
}

@RestController
@Validated
public class UserController {

    @PostMapping
    public ResponseEntity<?> createUser(
            @Validated(CreateValidation.class) @RequestBody UserDto userDto) {
        // Validates with CreateValidation group
        return ResponseEntity.ok(userService.createUser(userDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @Validated(UpdateValidation.class) @RequestBody UserDto userDto) {
        // Validates with UpdateValidation group
        return ResponseEntity.ok(userService.updateUser(id, userDto));
    }
}
\`\`\`

**4. Service Layer Validation:**
\`\`\`java
@Service
@Validated
public class UserService {

    @Transactional
    public User createUser(@Valid UserDto dto) {
        // Method parameter validation
        User user = new User();
        user.setUsername(dto.getUsername());
        return userRepository.save(user);
    }

    public User findById(@NotNull @Min(1) Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException(id));
    }

    @Valid
    public User updateUser(Long id, @Valid UserDto dto) {
        // Return value validation
        User user = findById(id);
        user.setEmail(dto.getEmail());
        return userRepository.save(user);
    }
}
\`\`\`

**5. Custom Validators:**
\`\`\`java
// Custom annotation
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PhoneNumberValidator.class)
public @interface PhoneNumber {
    String message() default "Invalid phone number";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

// Validator implementation
public class PhoneNumberValidator
        implements ConstraintValidator<PhoneNumber, String> {

    private static final Pattern PHONE_PATTERN =
        Pattern.compile("^\\+?[1-9]\\d{1,14}$");

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;  // Use @NotNull separately
        }
        return PHONE_PATTERN.matcher(value).matches();
    }
}

// Usage
public class UserDto {
    @PhoneNumber
    private String phoneNumber;
}
\`\`\`

**6. Cross-Field Validation:**
\`\`\`java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordMatchesValidator.class)
public @interface PasswordMatches {
    String message() default "Passwords don't match";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

public class PasswordMatchesValidator
        implements ConstraintValidator<PasswordMatches, Object> {

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext context) {
        UserDto user = (UserDto) obj;
        return user.getPassword().equals(user.getConfirmPassword());
    }
}

@PasswordMatches
public class UserDto {
    private String password;
    private String confirmPassword;
}
\`\`\`

**7. Global Exception Handler:**
\`\`\`java
@RestControllerAdvice
public class ValidationExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationException(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .collect(Collectors.toMap(
                FieldError::getField,
                error -> error.getDefaultMessage() != null
                    ? error.getDefaultMessage()
                    : "Validation failed"
            ));

        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> handleConstraintViolation(
            ConstraintViolationException ex) {

        Map<String, String> errors = ex.getConstraintViolations()
            .stream()
            .collect(Collectors.toMap(
                violation -> violation.getPropertyPath().toString(),
                ConstraintViolation::getMessage
            ));

        return ResponseEntity.badRequest().body(errors);
    }
}
\`\`\`

**Common Validation Annotations:**
| Annotation | Description |
|------------|-------------|
| @NotNull | Field cannot be null |
| @NotEmpty | Collection/String not empty |
| @NotBlank | String not blank (trim) |
| @Size | String/Collection size |
| @Min/@Max | Numeric min/max |
| @Email | Valid email format |
| @Pattern | Regex pattern match |
| @Past/@Future | Date in past/future |
| @Positive/@Negative | Numeric positive/negative |
| @AssertTrue/@AssertFalse | Boolean assertion |`
    },
    {
      id: 7,
      category: 'Scheduling & Async',
      difficulty: 'Medium',
      question: 'Explain @Scheduled, @Async, and @EnableScheduling annotations',
      answer: `**Scheduling and Async Annotations:**

**1. @EnableScheduling:**
Enable scheduled task execution
\`\`\`java
@Configuration
@EnableScheduling
public class SchedulingConfig {

    @Bean
    public TaskScheduler taskScheduler() {
        ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
        scheduler.setPoolSize(10);
        scheduler.setThreadNamePrefix("scheduled-");
        scheduler.initialize();
        return scheduler;
    }
}
\`\`\`

**2. @Scheduled:**
Schedule method execution
\`\`\`java
@Component
public class ScheduledTasks {

    // Fixed rate: Execute every 5 seconds
    @Scheduled(fixedRate = 5000)
    public void fixedRateTask() {
        log.info("Fixed rate task - {}", System.currentTimeMillis());
        // Runs every 5 seconds, regardless of previous execution time
    }

    // Fixed delay: Wait 5 seconds after previous execution completes
    @Scheduled(fixedDelay = 5000)
    public void fixedDelayTask() {
        log.info("Fixed delay task - {}", System.currentTimeMillis());
        // Waits 5 seconds after previous execution finishes
    }

    // Initial delay: Wait 10 seconds before first execution
    @Scheduled(fixedDelay = 5000, initialDelay = 10000)
    public void initialDelayTask() {
        log.info("Task with initial delay");
    }

    // Cron expression: Every day at 2 AM
    @Scheduled(cron = "0 0 2 * * ?")
    public void cronTask() {
        log.info("Cron task - Daily cleanup");
        // Complex scheduling with cron
    }

    // Cron with zone
    @Scheduled(cron = "0 0 9 * * MON-FRI", zone = "America/New_York")
    public void cronWithZone() {
        log.info("Weekday morning task in EST");
    }

    // Cron from properties
    @Scheduled(cron = "\${app.schedule.cron}")
    public void configurableCron() {
        // Cron expression from application.properties
    }
}

// Cron Expression Format:
// ┌───────────── second (0-59)
// │ ┌───────────── minute (0-59)
// │ │ ┌───────────── hour (0-23)
// │ │ │ ┌───────────── day of month (1-31)
// │ │ │ │ ┌───────────── month (1-12 or JAN-DEC)
// │ │ │ │ │ ┌───────────── day of week (0-6 or SUN-SAT)
// │ │ │ │ │ │
// * * * * * *

// Examples:
// 0 0 * * * *        Every hour
// 0 0 0 * * *        Every day at midnight
// 0 0 9 * * MON-FRI  Weekdays at 9 AM
// 0 */15 * * * *     Every 15 minutes
// 0 0 0 1 * *        First day of every month
\`\`\`

**3. @EnableAsync:**
Enable asynchronous method execution
\`\`\`java
@Configuration
@EnableAsync
public class AsyncConfig implements AsyncConfigurer {

    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("async-");
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.initialize();
        return executor;
    }

    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return (throwable, method, params) -> {
            log.error("Async exception in {}: {}",
                method.getName(), throwable.getMessage());
        };
    }
}
\`\`\`

**4. @Async:**
Execute method asynchronously
\`\`\`java
@Service
public class EmailService {

    // Simple async - fire and forget
    @Async
    public void sendEmail(String to, String subject, String body) {
        log.info("Sending email to {} in thread {}",
            to, Thread.currentThread().getName());
        // Email sending logic
    }

    // Async with return value (Future)
    @Async
    public Future<String> processLargeFile(String filename) {
        log.info("Processing file: {}", filename);

        try {
            // Long-running operation
            Thread.sleep(5000);
            String result = "Processed: " + filename;
            return new AsyncResult<>(result);
        } catch (Exception e) {
            return new AsyncResult<>(null);
        }
    }

    // Async with CompletableFuture
    @Async
    public CompletableFuture<UserData> fetchUserData(Long userId) {
        log.info("Fetching user data for: {}", userId);

        try {
            // Simulate API call
            Thread.sleep(2000);
            UserData data = externalApi.getUserData(userId);
            return CompletableFuture.completedFuture(data);
        } catch (Exception e) {
            return CompletableFuture.failedFuture(e);
        }
    }
}

// Usage
@RestController
public class UserController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody UserDto dto) {
        User user = userService.createUser(dto);

        // Send email asynchronously
        emailService.sendEmail(user.getEmail(),
            "Welcome", "Welcome to our platform");

        return ResponseEntity.ok(user);
    }

    @GetMapping("/process/{filename}")
    public ResponseEntity<String> processFile(@PathVariable String filename)
            throws ExecutionException, InterruptedException {

        Future<String> result = emailService.processLargeFile(filename);

        // Wait for result
        String processed = result.get();  // Blocking

        return ResponseEntity.ok(processed);
    }

    @GetMapping("/users/{id}/data")
    public CompletableFuture<ResponseEntity<UserData>> getUserData(
            @PathVariable Long id) {

        return emailService.fetchUserData(id)
            .thenApply(ResponseEntity::ok)
            .exceptionally(ex ->
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }
}
\`\`\`

**5. Parallel Async Operations:**
\`\`\`java
@Service
public class DataAggregationService {

    @Async
    public CompletableFuture<List<Order>> fetchOrders(Long userId) {
        // Fetch orders
        return CompletableFuture.completedFuture(orders);
    }

    @Async
    public CompletableFuture<UserProfile> fetchProfile(Long userId) {
        // Fetch profile
        return CompletableFuture.completedFuture(profile);
    }

    @Async
    public CompletableFuture<List<Address>> fetchAddresses(Long userId) {
        // Fetch addresses
        return CompletableFuture.completedFuture(addresses);
    }

    public CompletableFuture<UserDashboard> fetchDashboard(Long userId) {
        CompletableFuture<List<Order>> ordersFuture = fetchOrders(userId);
        CompletableFuture<UserProfile> profileFuture = fetchProfile(userId);
        CompletableFuture<List<Address>> addressesFuture = fetchAddresses(userId);

        // Combine all results
        return CompletableFuture.allOf(ordersFuture, profileFuture, addressesFuture)
            .thenApply(v -> {
                UserDashboard dashboard = new UserDashboard();
                dashboard.setOrders(ordersFuture.join());
                dashboard.setProfile(profileFuture.join());
                dashboard.setAddresses(addressesFuture.join());
                return dashboard;
            });
    }
}
\`\`\`

**6. Conditional Scheduling:**
\`\`\`java
@Component
public class ConditionalScheduling {

    @Scheduled(fixedRate = 60000)
    @ConditionalOnProperty(name = "app.scheduling.enabled", havingValue = "true")
    public void conditionalTask() {
        // Only runs if property is true
    }
}

// application.yml
app:
  scheduling:
    enabled: true
\`\`\`

**7. Dynamic Scheduling:**
\`\`\`java
@Service
public class DynamicScheduler {

    @Autowired
    private TaskScheduler taskScheduler;

    private ScheduledFuture<?> scheduledTask;

    public void startTask(long interval) {
        if (scheduledTask != null) {
            scheduledTask.cancel(false);
        }

        scheduledTask = taskScheduler.scheduleAtFixedRate(
            () -> log.info("Dynamic task executed"),
            interval
        );
    }

    public void stopTask() {
        if (scheduledTask != null) {
            scheduledTask.cancel(false);
            scheduledTask = null;
        }
    }
}
\`\`\`

**Best Practices:**
• Use @Async for I/O-bound operations
• Configure appropriate thread pool sizes
• Handle exceptions in async methods
• Use CompletableFuture for modern async code
• Avoid @Async with @Transactional (new transaction in different thread)
• Use cron expressions for complex scheduling
• Monitor scheduled tasks in production`
    },
    {
      id: 8,
      category: 'Caching',
      difficulty: 'Medium',
      question: 'Explain Spring Cache annotations (@Cacheable, @CacheEvict, @CachePut, @Caching)',
      answer: `**Spring Cache Annotations:**

**1. @EnableCaching:**
Enable caching support
\`\`\`java
@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {
        SimpleCacheManager cacheManager = new SimpleCacheManager();
        cacheManager.setCaches(Arrays.asList(
            new ConcurrentMapCache("users"),
            new ConcurrentMapCache("products"),
            new ConcurrentMapCache("orders")
        ));
        return cacheManager;
    }

    // Or with Caffeine
    @Bean
    public CacheManager caffeineCacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager(
            "users", "products");
        cacheManager.setCaffeine(Caffeine.newBuilder()
            .maximumSize(1000)
            .expireAfterWrite(10, TimeUnit.MINUTES));
        return cacheManager;
    }

    // Or with Redis
    @Bean
    public CacheManager redisCacheManager(RedisConnectionFactory connectionFactory) {
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(10))
            .serializeKeysWith(
                RedisSerializationContext.SerializationPair
                    .fromSerializer(new StringRedisSerializer()))
            .serializeValuesWith(
                RedisSerializationContext.SerializationPair
                    .fromSerializer(new GenericJackson2JsonRedisSerializer()));

        return RedisCacheManager.builder(connectionFactory)
            .cacheDefaults(config)
            .build();
    }
}
\`\`\`

**2. @Cacheable:**
Cache method result
\`\`\`java
@Service
public class UserService {

    // Simple caching
    @Cacheable("users")
    public User findById(Long id) {
        log.info("Fetching user from database: {}", id);
        return userRepository.findById(id).orElse(null);
    }

    // Cache key from parameter
    @Cacheable(value = "users", key = "#username")
    public User findByUsername(String username) {
        log.info("Database query for: {}", username);
        return userRepository.findByUsername(username).orElse(null);
    }

    // Multiple parameters in key
    @Cacheable(value = "users",
               key = "#firstName + '_' + #lastName")
    public User findByName(String firstName, String lastName) {
        return userRepository.findByFirstNameAndLastName(firstName, lastName);
    }

    // Complex key using SpEL
    @Cacheable(value = "users",
               key = "#user.id + '_' + #user.email")
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Root object properties in key
    @Cacheable(value = "users",
               key = "#root.methodName + '_' + #id")
    public User getUserDetails(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // Conditional caching
    @Cacheable(value = "users",
               condition = "#id != null && #id > 0")
    public User findUserConditional(Long id) {
        // Only cached if id is positive
        return userRepository.findById(id).orElse(null);
    }

    // Unless condition (don't cache if true)
    @Cacheable(value = "users",
               unless = "#result == null")
    public User findUser(Long id) {
        // Don't cache null results
        return userRepository.findById(id).orElse(null);
    }

    // Multiple caches
    @Cacheable(value = {"users", "userDetails"}, key = "#id")
    public User getUser(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // Sync mode (prevent cache stampede)
    @Cacheable(value = "users", key = "#id", sync = true)
    public User findByIdSync(Long id) {
        // Only one thread loads from DB, others wait
        return userRepository.findById(id).orElse(null);
    }
}
\`\`\`

**3. @CachePut:**
Update cache without affecting method execution
\`\`\`java
@Service
public class UserService {

    // Always execute and update cache
    @CachePut(value = "users", key = "#user.id")
    public User updateUser(User user) {
        log.info("Updating user: {}", user.getId());
        return userRepository.save(user);
    }

    // Update multiple caches
    @CachePut(value = {"users", "userDetails"}, key = "#result.id")
    public User createUser(UserDto dto) {
        User user = new User(dto);
        return userRepository.save(user);
    }

    // Conditional update
    @CachePut(value = "users",
              key = "#user.id",
              condition = "#user.active == true")
    public User activateUser(User user) {
        // Only cache if user is active
        user.setActive(true);
        return userRepository.save(user);
    }
}
\`\`\`

**4. @CacheEvict:**
Remove entries from cache
\`\`\`java
@Service
public class UserService {

    // Evict single entry
    @CacheEvict(value = "users", key = "#id")
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // Evict all entries
    @CacheEvict(value = "users", allEntries = true)
    public void deleteAllUsers() {
        userRepository.deleteAll();
    }

    // Before invocation (default: after)
    @CacheEvict(value = "users",
                key = "#id",
                beforeInvocation = true)
    public void deleteUserBefore(Long id) {
        // Cache cleared before method execution
        userRepository.deleteById(id);
    }

    // Conditional eviction
    @CacheEvict(value = "users",
                key = "#user.id",
                condition = "#user.active == false")
    public void deactivateUser(User user) {
        // Only evict if user is inactive
        user.setActive(false);
        userRepository.save(user);
    }
}
\`\`\`

**5. @Caching:**
Multiple cache operations
\`\`\`java
@Service
public class UserService {

    @Caching(
        cacheable = {
            @Cacheable(value = "users", key = "#id")
        },
        put = {
            @CachePut(value = "userDetails", key = "#id"),
            @CachePut(value = "userProfiles", key = "#id")
        }
    )
    public User getUserWithDetails(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Caching(
        evict = {
            @CacheEvict(value = "users", key = "#id"),
            @CacheEvict(value = "userDetails", key = "#id"),
            @CacheEvict(value = "userOrders", allEntries = true)
        }
    )
    public void deleteUserCompletely(Long id) {
        userRepository.deleteById(id);
    }

    @Caching(
        cacheable = @Cacheable(value = "users", key = "#id"),
        evict = @CacheEvict(value = "userStats", allEntries = true)
    )
    public User getUserAndInvalidateStats(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
\`\`\`

**6. @CacheConfig:**
Class-level cache configuration
\`\`\`java
@Service
@CacheConfig(cacheNames = "users",
             keyGenerator = "customKeyGenerator")
public class UserService {

    @Cacheable  // Inherits "users" cache name
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @CacheEvict(allEntries = true)
    public void clearCache() {
        // Evicts all from "users" cache
    }
}
\`\`\`

**7. Custom Key Generator:**
\`\`\`java
@Component
public class CustomKeyGenerator implements KeyGenerator {

    @Override
    public Object generate(Object target, Method method, Object... params) {
        return method.getName() + "_" +
               StringUtils.arrayToDelimitedString(params, "_");
    }
}

@Service
public class UserService {

    @Cacheable(value = "users", keyGenerator = "customKeyGenerator")
    public User findUser(Long id, String type) {
        // Key: findUser_123_ACTIVE
        return userRepository.findById(id).orElse(null);
    }
}
\`\`\`

**8. Cache Resolver:**
\`\`\`java
@Component
public class CustomCacheResolver implements CacheResolver {

    @Autowired
    private CacheManager cacheManager;

    @Override
    public Collection<? extends Cache> resolveCaches(CacheOperationInvocationContext<?> context) {
        // Dynamic cache selection
        String cacheName = determineCacheName(context);
        return Collections.singleton(cacheManager.getCache(cacheName));
    }

    private String determineCacheName(CacheOperationInvocationContext<?> context) {
        // Logic to determine cache name
        return "dynamicCache";
    }
}

@Service
public class UserService {

    @Cacheable(cacheResolver = "customCacheResolver")
    public User findUser(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
\`\`\`

**SpEL Context for Cache Keys:**
| Name | Location | Description | Example |
|------|----------|-------------|---------|
| methodName | root object | Method name | #root.methodName |
| method | root object | Method | #root.method.name |
| target | root object | Target object | #root.target |
| targetClass | root object | Target class | #root.targetClass |
| args | root object | Arguments | #root.args[0] |
| caches | root object | Caches | #root.caches[0].name |
| argument name | evaluation context | Method argument | #id, #user |
| result | evaluation context | Method result | #result |

**Best Practices:**
• Use @Cacheable for read operations
• Use @CachePut for writes to keep cache updated
• Use @CacheEvict to clear stale data
• Set appropriate TTL for cached data
• Monitor cache hit ratio
• Use sync=true to prevent cache stampede
• Don't cache large objects
• Handle null values appropriately`
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
            fontWeight: '600',
            backgroundColor: categoryColor,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
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
          Spring Annotations Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

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
                ? `0 0 0 4px ${categoryColor}20, 0 8px 16px rgba(0,0,0,0.3)`
                : '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <div
              onClick={() => setExpandedQuestionId(expandedQuestionId === q.id ? null : q.id)}
              style={{
                padding: '1.5rem',
                cursor: 'pointer',
                backgroundColor: expandedQuestionId === q.id ? '#374151' : 'transparent',
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
                borderTop: `2px solid ${categoryColor}20`,
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
          Annotation Best Practices
        </h3>
        <ul style={{
          fontSize: '1rem',
          textAlign: 'left',
          lineHeight: '2',
          color: '#d1d5db',
          paddingLeft: '1.5rem'
        }}>
          <li><strong>Use stereotype annotations</strong> appropriately - @Service for business logic, @Repository for data access</li>
          <li><strong>Prefer constructor injection</strong> over field injection with @Autowired</li>
          <li><strong>Use @Qualifier</strong> to resolve ambiguity when multiple beans of same type exist</li>
          <li><strong>Leverage @Primary</strong> to set default bean implementation</li>
          <li><strong>Apply @Transactional</strong> at service layer, not repository</li>
          <li><strong>Use @Async</strong> for I/O-bound operations, configure appropriate thread pool</li>
          <li><strong>Cache frequently accessed data</strong> with @Cacheable, clear with @CacheEvict</li>
          <li><strong>Schedule tasks</strong> with @Scheduled, use cron expressions for complex scheduling</li>
          <li><strong>Validate inputs</strong> with @Valid and Bean Validation annotations</li>
          <li><strong>Enable features explicitly</strong> - @EnableCaching, @EnableScheduling, @EnableAsync</li>
        </ul>
      </div>
    </div>
  )
}

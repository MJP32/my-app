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
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

export default function DependencyInjection({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'constructor-injection',
      name: 'Constructor Injection',
      icon: '🏗️',
      color: '#3b82f6',
      description: 'Dependencies are provided through a class constructor - the preferred approach',
      details: [
        {
          name: 'Overview',
          explanation: 'Constructor injection provides dependencies through a class constructor. This is the preferred injection method in Spring and most DI frameworks because it makes dependencies explicit, enables immutability with final fields, and fails fast if dependencies are missing. In Spring 4.3+, @Autowired is optional for single-constructor classes.'
        },
        {
          name: 'Code Example',
          explanation: `@Service
public class OrderService {
    private final PaymentService paymentService;
    private final InventoryService inventoryService;

    @Autowired  // Optional in Spring 4.3+
    public OrderService(PaymentService paymentService,
                       InventoryService inventoryService) {
        this.paymentService = paymentService;
        this.inventoryService = inventoryService;
    }

    public void processOrder(Order order) {
        inventoryService.checkAvailability(order);
        paymentService.processPayment(order);
    }
}`
        },
        {
          name: 'Spring Configuration',
          explanation: `@Configuration
public class AppConfig {
    @Bean
    public PaymentService paymentService() {
        return new StripePaymentService();
    }

    @Bean
    public InventoryService inventoryService() {
        return new DatabaseInventoryService();
    }

    @Bean
    public OrderService orderService(PaymentService paymentService,
                                     InventoryService inventoryService) {
        return new OrderService(paymentService, inventoryService);
    }
}`
        },
        {
          name: 'Benefits',
          explanation: 'Immutability - dependencies are final fields. Required dependencies are explicit and clear. Easy to test with mocks - just pass mock objects to the constructor. Thread-safe initialization guaranteed. Fails fast if dependencies are missing - application won\'t start. No reflection needed, better performance.'
        },
        {
          name: 'Best Practices',
          explanation: 'Always use final fields for injected dependencies. Keep constructors simple - only assign dependencies, no business logic. Limit the number of constructor parameters (consider refactoring if more than 5). Use interfaces as parameter types, not concrete implementations. Consider using Lombok @RequiredArgsConstructor to reduce boilerplate.'
        }
      ]
    },
    {
      id: 'setter-injection',
      name: 'Setter Injection',
      icon: '🔧',
      color: '#10b981',
      description: 'Dependencies are injected through setter methods - useful for optional dependencies',
      details: [
        {
          name: 'Overview',
          explanation: 'Setter injection provides dependencies through setter methods after object construction. This approach is useful for optional dependencies that can be null, allows reconfiguration after construction, and can help break circular dependencies. However, it allows objects to be in an incomplete state.'
        },
        {
          name: 'Code Example',
          explanation: `@Service
public class EmailService {
    private TemplateEngine templateEngine;
    private SmtpClient smtpClient;

    @Autowired
    public void setTemplateEngine(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    @Autowired
    public void setSmtpClient(SmtpClient smtpClient) {
        this.smtpClient = smtpClient;
    }

    public void sendEmail(String to, String subject, Map<String, Object> data) {
        String body = templateEngine.render("email-template", data);
        smtpClient.send(to, subject, body);
    }
}`
        },
        {
          name: 'XML Configuration',
          explanation: `<!-- Spring XML Configuration -->
<bean id="emailService" class="com.example.EmailService">
    <property name="templateEngine" ref="templateEngine"/>
    <property name="smtpClient" ref="smtpClient"/>
</bean>

<bean id="templateEngine" class="com.example.ThymeleafTemplateEngine"/>
<bean id="smtpClient" class="com.example.SmtpClientImpl"/>`
        },
        {
          name: 'Benefits',
          explanation: 'Optional dependencies can be nullable - not all setters need to be called. Allows reconfiguration after construction for special scenarios. Useful for breaking circular dependencies when constructor injection fails. More flexible than constructor injection for optional features. Can set default values before injection occurs.'
        },
        {
          name: 'Drawbacks',
          explanation: 'Object can exist in incomplete state before setters are called. Dependencies are not explicit - harder to see what\'s required. Cannot use final fields - no immutability guarantee. More verbose than constructor injection. Testing requires calling multiple setters to set up the object.'
        }
      ]
    },
    {
      id: 'interface-injection',
      name: 'Interface Injection',
      icon: '🔌',
      color: '#f59e0b',
      description: 'Dependencies are injected through an interface method contract',
      details: [
        {
          name: 'Overview',
          explanation: 'Interface injection defines an interface that declares an injection method. Classes implement this interface to receive their dependencies. This pattern is less common than constructor or setter injection but useful in plugin architectures and when you need to enforce injection contracts across multiple classes.'
        },
        {
          name: 'Interface Pattern',
          explanation: `public interface ServiceInjector {
    void injectDatabaseService(DatabaseService service);
}

@Component
public class UserRepository implements ServiceInjector {
    private DatabaseService databaseService;

    @Override
    public void injectDatabaseService(DatabaseService service) {
        this.databaseService = service;
    }

    public User findById(Long id) {
        return databaseService.query("SELECT * FROM users WHERE id = ?", id);
    }
}`
        },
        {
          name: 'Jakarta EE Resource Injection',
          explanation: `@Stateless
public class ProductService {
    @Resource(name = "jdbc/ProductDB")
    private DataSource dataSource;

    @Resource
    private SessionContext sessionContext;

    public List<Product> getAllProducts() {
        try (Connection conn = dataSource.getConnection()) {
            // Query products from database
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM products");
            // Process results...
        }
    }
}`
        },
        {
          name: 'Benefits',
          explanation: 'Decouples the injection mechanism from the framework. Framework-independent interface definition. Can enforce injection contracts across implementations. Useful for plugin architectures where plugins must accept certain services. Enables dynamic dependency resolution at runtime.'
        },
        {
          name: 'Use Cases',
          explanation: 'Plugin systems where plugins must receive core services. Legacy systems being migrated to DI. Cross-cutting concerns that all components need. Framework development where you want injection without framework coupling. Systems where injection timing must be controlled explicitly.'
        }
      ]
    },
    {
      id: 'field-injection',
      name: 'Field Injection',
      icon: '📌',
      color: '#8b5cf6',
      description: 'Dependencies are injected directly into fields - simple but not recommended for production',
      details: [
        {
          name: 'Overview',
          explanation: 'Field injection uses annotations to inject dependencies directly into class fields. While it produces the least boilerplate code, it\'s generally not recommended for production code because it hides dependencies, makes testing harder, and prevents immutability. It\'s acceptable for tests and quick prototyping.'
        },
        {
          name: 'Spring Example',
          explanation: `@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @Value("\${app.max-users}")
    private int maxUsers;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.findById(id);
        return ResponseEntity.ok(user);
    }
}`
        },
        {
          name: 'Guice Example',
          explanation: `public class PaymentProcessor {
    @Inject
    private PaymentGateway gateway;

    @Inject
    @Named("stripe")
    private PaymentProvider provider;

    public void processPayment(Payment payment) {
        provider.charge(payment);
        gateway.record(payment);
    }
}`
        },
        {
          name: 'Benefits',
          explanation: 'Less boilerplate code - no constructor or setter needed. Quick for prototyping and proof-of-concept code. Easy to read and write for simple cases. Common in Spring applications for quick development. Works well for test classes where simplicity is preferred.'
        },
        {
          name: 'Drawbacks',
          explanation: 'Harder to test - need reflection to inject mock dependencies. Hidden dependencies - not visible in class signature. Cannot use final fields - no immutability. Breaks encapsulation by requiring framework access to private fields. Constructor injection is strongly preferred for production code. Can lead to NullPointerException if container doesn\'t inject properly.'
        }
      ]
    },
    {
      id: 'di-frameworks',
      name: 'Popular DI Frameworks',
      icon: '🛠️',
      color: '#ec4899',
      description: 'Overview of popular dependency injection frameworks across languages',
      details: [
        {
          name: 'Spring Framework (Java)',
          explanation: '@Autowired and @Component annotations for automatic wiring. Both XML and Java-based configuration options. Supports constructor, setter, and field injection. Rich bean scopes: singleton, prototype, request, session. Auto-configuration in Spring Boot reduces boilerplate. Most popular DI framework in the Java ecosystem.'
        },
        {
          name: 'Google Guice (Java)',
          explanation: 'Lightweight and fast DI framework by Google. Uses @Inject annotation (JSR-330 standard). Module-based configuration with type-safe bindings. No XML configuration needed - pure Java. Provider pattern for lazy instantiation. Great for applications where Spring would be overkill.'
        },
        {
          name: '.NET Core DI (C#)',
          explanation: 'Built-in IoC container in .NET Core and later. Constructor injection is the preferred pattern. Service lifetime management: Transient, Scoped, Singleton. IServiceProvider interface for service resolution. AddTransient, AddScoped, AddSingleton registration methods. No external dependencies required.'
        },
        {
          name: 'Angular DI (TypeScript)',
          explanation: 'Hierarchical injector system in Angular. @Injectable() decorator marks services for injection. Provider configuration in modules and components. Tree-shakable services with providedIn syntax. Dependency injection tokens for interface injection. Built into the framework core.'
        },
        {
          name: 'Dagger (Java/Android)',
          explanation: 'Compile-time dependency injection for Java and Android. No reflection used - generates code at compile time. Extremely fast runtime performance. @Component and @Module annotations. Popular for Android development. Steep learning curve but excellent performance.'
        },
        {
          name: 'CDI (Jakarta EE)',
          explanation: 'Contexts and Dependency Injection specification for Jakarta EE. Standard @Inject annotation. Built-in scopes: @RequestScoped, @SessionScoped, @ApplicationScoped. Producer methods for complex object creation. Event system for loose coupling. Enterprise-grade specification.'
        }
      ]
    },
    {
      id: 'best-practices',
      name: 'Best Practices',
      icon: '✅',
      color: '#14b8a6',
      description: 'Guidelines and best practices for effective dependency injection',
      details: [
        {
          name: 'Prefer Constructor Injection',
          explanation: 'Constructor injection should be your default choice. It makes dependencies explicit in the class signature, enables immutability with final fields, fails fast if dependencies are missing, and doesn\'t require reflection. Spring team officially recommends constructor injection for required dependencies.'
        },
        {
          name: 'Inject Interfaces, Not Implementations',
          explanation: 'Always inject interface types rather than concrete classes. This promotes loose coupling - you can swap implementations without changing client code. Makes unit testing easy with mock implementations. Follows the Dependency Inversion Principle (DIP) from SOLID. Enables runtime polymorphism.'
        },
        {
          name: 'Avoid Circular Dependencies',
          explanation: 'Circular dependencies (A depends on B, B depends on A) indicate design problems. Refactor by extracting shared logic into a third class. Use events or callbacks instead of direct dependencies. If unavoidable, setter injection can break the cycle but address the root cause. Consider if the classes should be merged.'
        },
        {
          name: 'Be Mindful of Scope',
          explanation: 'Understand bean scopes: Singleton (default), Prototype, Request, Session. Injecting a narrower-scoped bean into a wider-scoped bean causes issues. Use Provider or ObjectFactory for prototype beans in singletons. Request-scoped beans need proxy mode for injection into singletons. Match scope to the actual lifecycle needed.'
        },
        {
          name: 'Keep Constructors Simple',
          explanation: 'Constructors should only assign dependencies to fields. No business logic, validation, or external calls in constructors. If initialization is needed, use @PostConstruct or InitializingBean. Complex initialization makes objects hard to test. Constructor should complete quickly and predictably.'
        },
        {
          name: 'Don\'t Overuse DI',
          explanation: 'Not everything needs to be injected. Simple value objects, DTOs, and entities typically don\'t need DI. Utility classes with static methods may not need injection. Over-injection leads to complex configurations. Use DI for services, repositories, and components with dependencies.'
        }
      ]
    },
    {
      id: 'di-architecture',
      name: 'DI Architecture',
      icon: '🏛️',
      color: '#6366f1',
      description: 'Understanding the architecture and flow of dependency injection',
      details: [
        {
          name: 'Without DI (Tight Coupling)',
          explanation: 'Without DI, classes create their own dependencies internally using "new" keyword. OrderService creates PaymentService and InventoryService directly. Problems: Hard to test (can\'t substitute mocks), tight coupling (changing implementation requires code changes), violates Single Responsibility Principle, difficult to maintain and extend.'
        },
        {
          name: 'With DI (Loose Coupling)',
          explanation: 'With DI, a container/framework manages object creation and wiring. Dependencies are injected from outside the class. OrderService declares what it needs, container provides implementations. Benefits: Easy to test with mocks, loose coupling, implementations can be swapped via configuration, follows SOLID principles.'
        },
        {
          name: 'IoC Container Role',
          explanation: 'The IoC (Inversion of Control) container manages the entire object lifecycle. It creates beans, resolves dependencies, injects them, and manages destruction. Spring ApplicationContext is the container. Reads configuration (annotations, XML, Java config) to know what to create. Handles scope, lazy initialization, and circular dependency detection.'
        },
        {
          name: 'Bean Lifecycle',
          explanation: 'Bean creation follows a lifecycle: Instantiation, Populate properties (injection), BeanNameAware/BeanFactoryAware callbacks, @PostConstruct or afterPropertiesSet(), Custom init-method, Bean is ready for use, @PreDestroy or destroy(), Custom destroy-method. Understanding the lifecycle helps with initialization and cleanup.'
        },
        {
          name: 'Dependency Resolution',
          explanation: 'Container resolves dependencies by type, then by name if ambiguous. @Qualifier annotation specifies which bean to inject when multiple candidates exist. @Primary marks a preferred bean among alternatives. Constructor parameters are matched to available beans. Resolution fails at startup if dependencies can\'t be satisfied.'
        },
        {
          name: 'Testing with DI',
          explanation: 'DI makes testing dramatically easier. Unit tests: Pass mock objects directly to constructors. Integration tests: Override beans with @MockBean or test configurations. No reflection or framework needed for basic unit tests. Mockito and similar frameworks integrate seamlessly. Test slices in Spring Boot for focused testing.'
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
      stack.push({ name: 'Dependency Injection', icon: '💉', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'Dependency Injection', icon: '💉' })
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
    background: 'rgba(34, 197, 94, 0.2)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
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
          <h1 style={titleStyle}>Dependency Injection</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {onPrevious && (
            <button
              style={navButtonStyle}
              onClick={onPrevious}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(34, 197, 94, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)'
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
                e.currentTarget.style.background = 'rgba(34, 197, 94, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)'
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
          onMainMenu={breadcrumb?.onMainMenu}
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
              onMainMenu={breadcrumb?.onMainMenu}
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
                  <pre style={{ color: '#e2e8f0', lineHeight: '1.8', marginBottom: '1rem', background: colorScheme.bg, border: `1px solid ${colorScheme.border}`, borderRadius: '0.5rem', padding: '1rem', textAlign: 'left', whiteSpace: 'pre-wrap', wordWrap: 'break-word', fontFamily: detail.explanation.includes('@') || detail.explanation.includes('public ') || detail.explanation.includes('<bean') ? 'monospace' : 'inherit', fontSize: detail.explanation.includes('@') || detail.explanation.includes('public ') || detail.explanation.includes('<bean') ? '0.875rem' : '1rem' }}>{detail.explanation}</pre>
                </div>
              )
            })()}

          </div>
        </div>
      )}
    </div>
  )
}

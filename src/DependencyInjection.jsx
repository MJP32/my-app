import { useState } from 'react'

export default function DependencyInjection({ onBack }) {
  const [selectedType, setSelectedType] = useState(null)

  const injectionTypes = [
    {
      name: 'Constructor Injection',
      icon: '🏗️',
      color: '#3b82f6',
      description: 'Dependencies are provided through a class constructor',
      example: `// Java/Spring - Constructor Injection
@Service
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
}

// Spring Configuration
@Configuration
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
}`,
      benefits: [
        'Immutability - dependencies are final',
        'Required dependencies are explicit',
        'Easy to test with mocks',
        'Thread-safe initialization',
        'Fails fast if dependencies are missing'
      ]
    },
    {
      name: 'Setter Injection',
      icon: '🔧',
      color: '#10b981',
      description: 'Dependencies are injected through setter methods',
      example: `// Java/Spring - Setter Injection
@Service
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
}

// XML Configuration (Spring)
<bean id="emailService" class="com.example.EmailService">
    <property name="templateEngine" ref="templateEngine"/>
    <property name="smtpClient" ref="smtpClient"/>
</bean>

<bean id="templateEngine" class="com.example.ThymeleafTemplateEngine"/>
<bean id="smtpClient" class="com.example.SmtpClientImpl"/>`,
      benefits: [
        'Optional dependencies can be nullable',
        'Allows reconfiguration after construction',
        'Useful for circular dependencies',
        'More flexible than constructor injection',
        'Can set defaults before injection'
      ]
    },
    {
      name: 'Interface Injection',
      icon: '🔌',
      color: '#f59e0b',
      description: 'Dependencies are injected through an interface method',
      example: `// Interface Injection Pattern
public interface ServiceInjector {
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
}

// Jakarta EE Resource Injection
@Stateless
public class ProductService {
    @Resource(name = "jdbc/ProductDB")
    private DataSource dataSource;

    @Resource
    private SessionContext sessionContext;

    public List<Product> getAllProducts() {
        try (Connection conn = dataSource.getConnection()) {
            // Query products
        }
    }
}`,
      benefits: [
        'Decouples injection mechanism',
        'Framework-independent interface',
        'Can enforce injection contracts',
        'Useful for plugin architectures',
        'Enables dynamic dependency resolution'
      ]
    },
    {
      name: 'Field Injection',
      icon: '📌',
      color: '#8b5cf6',
      description: 'Dependencies are injected directly into fields',
      example: `// Spring - Field Injection (not recommended for production)
@RestController
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
}

// Guice - Field Injection
public class PaymentProcessor {
    @Inject
    private PaymentGateway gateway;

    @Inject
    @Named("stripe")
    private PaymentProvider provider;

    public void processPayment(Payment payment) {
        provider.charge(payment);
        gateway.record(payment);
    }
}`,
      benefits: [
        'Less boilerplate code',
        'Quick for prototyping',
        'Easy to read and write',
        'Common in Spring applications',
        'Works well for simple use cases'
      ],
      drawbacks: [
        'Harder to test (need reflection)',
        'Hidden dependencies',
        'Cannot use final fields',
        'Breaks encapsulation',
        'Constructor injection is preferred'
      ]
    }
  ]

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#4f46e5'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#6366f1'}
        >
          ← Back
        </button>
      </div>

      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        💉 Dependency Injection
      </h1>

      <div style={{
        backgroundColor: '#f0f9ff',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        marginBottom: '2rem',
        borderLeft: '4px solid #3b82f6'
      }}>
        <p style={{ color: '#075985', lineHeight: '1.6', marginBottom: '0.5rem' }}>
          Dependency Injection (DI) is a design pattern that implements Inversion of Control (IoC) for resolving dependencies.
          Instead of a class creating its dependencies, they are provided (injected) from outside, typically by a DI framework or container.
        </p>
        <p style={{ color: '#075985', lineHeight: '1.6', margin: 0 }}>
          This pattern promotes loose coupling, testability, and maintainability by separating object creation from business logic.
        </p>
      </div>

      {/* DI Architecture Diagram */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
          Dependency Injection Architecture
        </h2>
        <svg viewBox="0 0 1000 450" style={{ width: '100%', maxWidth: '1000px', height: 'auto', margin: '1rem auto', display: 'block', border: '1px solid #e5e7eb', borderRadius: '0.5rem', backgroundColor: 'white' }}>
          <defs>
            <linearGradient id="diGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="diGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrowDI" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#6366f1" />
            </marker>
          </defs>

          {/* Without DI */}
          <text x="150" y="30" fontSize="18" fontWeight="bold" fill="#1f2937" textAnchor="middle">Without DI (Tight Coupling)</text>

          <rect x="50" y="50" width="200" height="100" fill="url(#diGrad1)" stroke="#2563eb" strokeWidth="2" rx="5" />
          <text x="150" y="85" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">OrderService</text>
          <text x="150" y="110" fontSize="12" fill="white" textAnchor="middle">creates dependencies</text>
          <text x="150" y="130" fontSize="12" fill="white" textAnchor="middle">internally</text>

          <rect x="50" y="180" width="90" height="60" fill="#ef4444" stroke="#dc2626" strokeWidth="2" rx="5" />
          <text x="95" y="210" fontSize="13" fill="white" textAnchor="middle" fontWeight="bold">Payment</text>
          <text x="95" y="227" fontSize="11" fill="white" textAnchor="middle">Service</text>

          <rect x="160" y="180" width="90" height="60" fill="#ef4444" stroke="#dc2626" strokeWidth="2" rx="5" />
          <text x="205" y="210" fontSize="13" fill="white" textAnchor="middle" fontWeight="bold">Inventory</text>
          <text x="205" y="227" fontSize="11" fill="white" textAnchor="middle">Service</text>

          <path d="M 95 150 L 95 180" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowDI)" />
          <path d="M 205 150 L 205 180" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowDI)" />

          <text x="150" y="280" fontSize="13" fill="#dc2626" textAnchor="middle" fontWeight="600">❌ Hard to test</text>
          <text x="150" y="300" fontSize="13" fill="#dc2626" textAnchor="middle" fontWeight="600">❌ Tight coupling</text>

          {/* With DI */}
          <text x="700" y="30" fontSize="18" fontWeight="bold" fill="#1f2937" textAnchor="middle">With DI (Loose Coupling)</text>

          {/* DI Container */}
          <rect x="550" y="40" width="300" height="130" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="2" strokeDasharray="5,5" rx="5" />
          <text x="700" y="65" fontSize="14" fontWeight="bold" fill="#6b7280" textAnchor="middle">DI Container / Framework</text>

          <rect x="570" y="80" width="90" height="60" fill="#10b981" stroke="#059669" strokeWidth="2" rx="5" />
          <text x="615" y="110" fontSize="13" fill="white" textAnchor="middle" fontWeight="bold">Payment</text>
          <text x="615" y="127" fontSize="11" fill="white" textAnchor="middle">Service</text>

          <rect x="680" y="80" width="90" height="60" fill="#10b981" stroke="#059669" strokeWidth="2" rx="5" />
          <text x="725" y="110" fontSize="13" fill="white" textAnchor="middle" fontWeight="bold">Inventory</text>
          <text x="725" y="127" fontSize="11" fill="white" textAnchor="middle">Service</text>

          <rect x="600" y="200" width="200" height="100" fill="url(#diGrad1)" stroke="#2563eb" strokeWidth="2" rx="5" />
          <text x="700" y="235" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">OrderService</text>
          <text x="700" y="260" fontSize="12" fill="white" textAnchor="middle">dependencies injected</text>
          <text x="700" y="280" fontSize="12" fill="white" textAnchor="middle">by container</text>

          <path d="M 615 140 L 650 200" stroke="#6366f1" strokeWidth="3" markerEnd="url(#arrowDI)" />
          <path d="M 725 140 L 750 200" stroke="#6366f1" strokeWidth="3" markerEnd="url(#arrowDI)" />

          <text x="700" y="340" fontSize="13" fill="#059669" textAnchor="middle" fontWeight="600">✓ Easy to test with mocks</text>
          <text x="700" y="360" fontSize="13" fill="#059669" textAnchor="middle" fontWeight="600">✓ Loose coupling</text>
          <text x="700" y="380" fontSize="13" fill="#059669" textAnchor="middle" fontWeight="600">✓ Flexible & maintainable</text>

          {/* Injection arrow */}
          <text x="700" y="187" fontSize="11" fill="#6366f1" textAnchor="middle" fontWeight="bold">Injects ↓</text>
        </svg>
      </div>

      {/* Injection Types */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
          Types of Dependency Injection
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {injectionTypes.map((type, index) => (
            <button
              key={index}
              onClick={() => setSelectedType(selectedType?.name === type.name ? null : type)}
              style={{
                padding: '1.5rem',
                backgroundColor: selectedType?.name === type.name ? type.color : 'white',
                border: `2px solid ${type.color}`,
                borderRadius: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
              onMouseOver={(e) => {
                if (selectedType?.name !== type.name) {
                  e.currentTarget.style.backgroundColor = `${type.color}15`
                }
              }}
              onMouseOut={(e) => {
                if (selectedType?.name !== type.name) {
                  e.currentTarget.style.backgroundColor = 'white'
                }
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{type.icon}</div>
              <div style={{
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: selectedType?.name === type.name ? 'white' : '#1f2937',
                marginBottom: '0.5rem'
              }}>
                {type.name}
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: selectedType?.name === type.name ? 'white' : '#6b7280',
                lineHeight: '1.4'
              }}>
                {type.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Type Details */}
      {selectedType && (
        <div style={{
          backgroundColor: '#1f2937',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          marginBottom: '2rem',
          border: `3px solid ${selectedType.color}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
              {selectedType.icon} {selectedType.name}
            </h3>
            <button
              onClick={() => setSelectedType(null)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: selectedType.color,
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}
            >
              Close
            </button>
          </div>

          <pre style={{
            backgroundColor: '#111827',
            padding: '1rem',
            borderRadius: '0.5rem',
            overflowX: 'auto',
            color: '#e5e7eb',
            fontSize: '0.875rem',
            lineHeight: '1.6',
            marginBottom: '1rem'
          }}>
            <code>{selectedType.example}</code>
          </pre>

          <div style={{ marginTop: '1rem' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#10b981', marginBottom: '0.5rem' }}>
              ✓ Benefits:
            </h4>
            <ul style={{ color: '#d1d5db', lineHeight: '1.8', marginLeft: '1.5rem' }}>
              {selectedType.benefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
            {selectedType.drawbacks && (
              <>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ef4444', marginTop: '1rem', marginBottom: '0.5rem' }}>
                  ⚠️ Drawbacks:
                </h4>
                <ul style={{ color: '#d1d5db', lineHeight: '1.8', marginLeft: '1.5rem' }}>
                  {selectedType.drawbacks.map((drawback, i) => (
                    <li key={i}>{drawback}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}

      {/* DI Frameworks */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
          Popular DI Frameworks
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{
            backgroundColor: '#dbeafe',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            borderLeft: '4px solid #3b82f6'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1e3a8a' }}>
              ☕ Spring Framework (Java)
            </h3>
            <ul style={{ color: '#1e40af', lineHeight: '1.8', marginLeft: '1.5rem' }}>
              <li>@Autowired, @Component annotations</li>
              <li>XML and Java-based configuration</li>
              <li>Constructor, setter, and field injection</li>
              <li>Bean scopes and lifecycle management</li>
              <li>Auto-configuration in Spring Boot</li>
            </ul>
          </div>

          <div style={{
            backgroundColor: '#dcfce7',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            borderLeft: '4px solid #10b981'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: '#065f46' }}>
              🎯 Google Guice (Java)
            </h3>
            <ul style={{ color: '#047857', lineHeight: '1.8', marginLeft: '1.5rem' }}>
              <li>Lightweight and fast</li>
              <li>@Inject JSR-330 standard</li>
              <li>Module-based configuration</li>
              <li>Type-safe bindings</li>
              <li>No XML configuration needed</li>
            </ul>
          </div>

          <div style={{
            backgroundColor: '#fef3c7',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            borderLeft: '4px solid #f59e0b'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: '#92400e' }}>
              🏢 .NET Core DI (C#)
            </h3>
            <ul style={{ color: '#78350f', lineHeight: '1.8', marginLeft: '1.5rem' }}>
              <li>Built-in IoC container</li>
              <li>Constructor injection preferred</li>
              <li>Service lifetime management</li>
              <li>IServiceProvider interface</li>
              <li>AddTransient, AddScoped, AddSingleton</li>
            </ul>
          </div>

          <div style={{
            backgroundColor: '#f3e8ff',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            borderLeft: '4px solid #a855f7'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: '#6b21a8' }}>
              🅰️ Angular DI (TypeScript)
            </h3>
            <ul style={{ color: '#7e22ce', lineHeight: '1.8', marginLeft: '1.5rem' }}>
              <li>Hierarchical injector system</li>
              <li>@Injectable() decorator</li>
              <li>Provider configuration</li>
              <li>Tree-shakable services</li>
              <li>Dependency injection tokens</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
          Best Practices
        </h2>
        <div style={{
          backgroundColor: '#f9fafb',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb'
        }}>
          <ul style={{ color: '#374151', lineHeight: '2', marginLeft: '1.5rem' }}>
            <li><strong>Prefer Constructor Injection</strong> - Makes dependencies explicit and enables immutability</li>
            <li><strong>Inject Interfaces, Not Implementations</strong> - Promotes loose coupling and easier testing</li>
            <li><strong>Avoid Circular Dependencies</strong> - Refactor design if circular dependencies occur</li>
            <li><strong>Use DI for Cross-Cutting Concerns</strong> - Logging, caching, transaction management</li>
            <li><strong>Keep Constructors Simple</strong> - Only assign dependencies, no business logic</li>
            <li><strong>Be Mindful of Scope</strong> - Singleton, Prototype, Request-scoped beans</li>
            <li><strong>Don't Overuse DI</strong> - Simple value objects don't need injection</li>
            <li><strong>Test with Mock Dependencies</strong> - DI makes unit testing much easier</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

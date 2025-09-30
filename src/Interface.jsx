import { useState, useEffect, useRef } from 'react'

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
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null|default)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ArrayList|Map|HashMap|Set|HashSet|Collection|Comparable|Comparator|Runnable|Callable|Consumer|Supplier|Function|Predicate|Stream|Optional)\b/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/\b([A-Z][a-zA-Z0-9_]*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')
      .replace(/\b(\d+\.?\d*[fFdDlL]?)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')

    protectedContent.forEach(({ id, replacement }) => {
      highlighted = highlighted.replace(id, replacement)
    })

    return highlighted
  }

  return (
    <pre style={{
      backgroundColor: '#1e1e1e',
      color: '#d4d4d4',
      padding: '1rem',
      borderRadius: '8px',
      overflowX: 'auto',
      fontSize: '0.9rem',
      lineHeight: '1.5',
      border: '2px solid #3b82f6',
      fontFamily: 'Consolas, Monaco, "Courier New", monospace',
      whiteSpace: 'pre',
      textAlign: 'left',
      margin: 0
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightJava(code) }} />
    </pre>
  )
}

const ModernDiagram = ({ components, onComponentClick, title, width = 1400, height = 800, containerWidth = 1800, focusedIndex }) => {
  const [hoveredComponent, setHoveredComponent] = useState(null)

  return (
    <div style={{
      width: '100%',
      maxWidth: `${containerWidth}px`,
      margin: '0 auto',
      backgroundColor: '#f8fafc',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
      border: '2px solid #e2e8f0'
    }}>
      <h3 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '1.75rem',
        fontWeight: '800',
        color: '#1e293b',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        {title}
      </h3>

      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#059669" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="indigoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#db2777" stopOpacity="0.9"/>
          </linearGradient>

          {/* Arrow markers */}
          <marker id="arrowSolid" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#1e293b" />
          </marker>
          <marker id="arrowDashed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Architectural layer backgrounds */}
        <g opacity="0.1">
          <rect x="50" y="180" width="420" height="200" rx="16" fill="#3b82f6" />
          <text x="260" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af" opacity="0.6">
            Layer 1
          </text>

          <rect x="550" y="80" width="420" height="560" rx="16" fill="#10b981" />
          <text x="760" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="#059669" opacity="0.6">
            Layer 2
          </text>

          <rect x="1050" y="180" width="420" height="520" rx="16" fill="#8b5cf6" />
          <text x="1260" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7c3aed" opacity="0.6">
            Layer 3
          </text>
        </g>

        {/* Connecting lines with arrows and labels */}
        <g fill="none">
          <line x1="430" y1="300" x2="580" y2="200" stroke="#1e293b" strokeWidth="3" strokeOpacity="0.8" markerEnd="url(#arrowSolid)"/>
          <text x="505" y="240" fontSize="11" fontWeight="600" fill="#1e293b" textAnchor="middle">
            interacts
          </text>

          <line x1="430" y1="300" x2="580" y2="400" stroke="#1e293b" strokeWidth="3" strokeOpacity="0.8" markerEnd="url(#arrowSolid)"/>
          <text x="505" y="360" fontSize="11" fontWeight="600" fill="#1e293b" textAnchor="middle">
            uses
          </text>

          <line x1="930" y1="200" x2="1080" y2="300" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="1005" y="240" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            depends
          </text>

          <line x1="930" y1="400" x2="1080" y2="500" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="1005" y="460" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            provides
          </text>

          <line x1="430" y1="500" x2="580" y2="600" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="505" y="560" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            extends
          </text>

          <line x1="930" y1="500" x2="760" y2="600" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="845" y="560" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            integrates
          </text>
        </g>

        {/* Component rectangles */}
        {components.map((component, index) => {
          const isFocused = focusedIndex === index
          const isHovered = hoveredComponent === component.id
          const isHighlighted = isFocused || isHovered

          return (
          <g key={component.id}>
            {/* Focused ring indicator */}
            {isFocused && (
              <rect
                x={component.x - 6}
                y={component.y - 6}
                width={component.width + 12}
                height={component.height + 12}
                rx="16"
                ry="16"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="4"
                style={{
                  opacity: 0.9,
                  filter: 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.6))'
                }}
              />
            )}
            <rect
              x={component.x}
              y={component.y}
              width={component.width}
              height={component.height}
              rx="12"
              ry="12"
              fill={`url(#${component.color}Gradient)`}
              stroke={isHighlighted ? '#1e293b' : '#64748b'}
              strokeWidth={isHighlighted ? '4' : '2'}
              style={{
                cursor: 'pointer',
                filter: isHighlighted ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                transform: isHighlighted ? 'scale(1.05)' : 'scale(1)',
                transformOrigin: `${component.x + component.width/2}px ${component.y + component.height/2}px`,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={() => setHoveredComponent(component.id)}
              onMouseLeave={() => setHoveredComponent(null)}
              onClick={() => onComponentClick && onComponentClick(component)}
            />

            {/* Icon */}
            <text
              x={component.x + component.width/2}
              y={component.y + 35}
              textAnchor="middle"
              fontSize="48"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {component.icon}
            </text>

            {/* Title */}
            <text
              x={component.x + component.width/2}
              y={component.y + 75}
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="white"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {component.title}
            </text>

            {/* Details */}
            {component.details && component.details.slice(0, 3).map((detail, idx) => (
              <text
                key={idx}
                x={component.x + component.width/2}
                y={component.y + 100 + (idx * 15)}
                textAnchor="middle"
                fontSize="10"
                fontWeight="500"
                fill="rgba(255,255,255,0.9)"
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              >
                {(typeof detail === 'string' ? detail : detail.name).length > 18
                  ? (typeof detail === 'string' ? detail : detail.name).substring(0, 15) + '...'
                  : (typeof detail === 'string' ? detail : detail.name)}
              </text>
            ))}
            {component.details && component.details.length > 3 && (
              <text
                x={component.x + component.width/2}
                y={component.y + 145}
                textAnchor="middle"
                fontSize="10"
                fontWeight="500"
                fill="rgba(255,255,255,0.7)"
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              >
                +{component.details.length - 3} more features...
              </text>
            )}
          </g>
        )})}
      </svg>
    </div>
  )
}

function Interface({ onBack }) {
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [focusedComponentIndex, setFocusedComponentIndex] = useState(0)

  const components = [
    {
      id: 'contract-programming', x: 80, y: 240, width: 350, height: 160,
      icon: '📜', title: 'Contract Programming', color: 'pink',
      details: [
        { name: 'Interface as Contract', codeExample: `// Interface defines a contract - what operations are available
// Implementations provide the how

interface PaymentProcessor {
  /**
   * Process a payment transaction
   * @param amount The amount to process (must be > 0)
   * @param currency The currency code (e.g., "USD", "EUR")
   * @return Transaction ID if successful
   * @throws IllegalArgumentException if amount <= 0
   * @throws PaymentException if processing fails
   */
  String processPayment(double amount, String currency)
    throws PaymentException;

  boolean refund(String transactionId);
  PaymentStatus getStatus(String transactionId);
}

// Multiple implementations honor the same contract
class CreditCardProcessor implements PaymentProcessor {
  @Override
  public String processPayment(double amount, String currency)
      throws PaymentException {
    if (amount <= 0) {
      throw new IllegalArgumentException("Amount must be positive");
    }
    // Credit card specific logic
    return "CC-" + System.currentTimeMillis();
  }

  @Override
  public boolean refund(String transactionId) {
    System.out.println("Refunding credit card: " + transactionId);
    return true;
  }

  @Override
  public PaymentStatus getStatus(String transactionId) {
    return PaymentStatus.COMPLETED;
  }
}

class PayPalProcessor implements PaymentProcessor {
  @Override
  public String processPayment(double amount, String currency)
      throws PaymentException {
    if (amount <= 0) {
      throw new IllegalArgumentException("Amount must be positive");
    }
    // PayPal specific logic
    return "PP-" + System.currentTimeMillis();
  }

  @Override
  public boolean refund(String transactionId) {
    System.out.println("Refunding PayPal: " + transactionId);
    return true;
  }

  @Override
  public PaymentStatus getStatus(String transactionId) {
    return PaymentStatus.COMPLETED;
  }
}

// Client depends on the contract, not implementation
class CheckoutService {
  private final PaymentProcessor processor;

  public CheckoutService(PaymentProcessor processor) {
    this.processor = processor;
  }

  public void checkout(double amount, String currency) {
    try {
      String txId = processor.processPayment(amount, currency);
      System.out.println("Payment successful: " + txId);
    } catch (PaymentException e) {
      System.err.println("Payment failed: " + e.getMessage());
    }
  }
}

enum PaymentStatus { PENDING, COMPLETED, FAILED, REFUNDED }
class PaymentException extends Exception {
  public PaymentException(String msg) { super(msg); }
}

// Output: Payment successful: CC-1234567890` },
        { name: 'Multiple Implementations', codeExample: `import java.util.*;

// One interface, many implementations - polymorphism
interface DataStorage {
  void save(String key, String value);
  String load(String key);
  void delete(String key);
  boolean exists(String key);
}

// Implementation 1: In-memory storage
class MemoryStorage implements DataStorage {
  private final Map<String, String> storage = new HashMap<>();

  @Override
  public void save(String key, String value) {
    storage.put(key, value);
    System.out.println("Saved to memory: " + key);
  }

  @Override
  public String load(String key) {
    return storage.get(key);
  }

  @Override
  public void delete(String key) {
    storage.remove(key);
  }

  @Override
  public boolean exists(String key) {
    return storage.containsKey(key);
  }
}

// Implementation 2: Database storage
class DatabaseStorage implements DataStorage {
  @Override
  public void save(String key, String value) {
    System.out.println("Saved to database: " + key);
    // Database logic here
  }

  @Override
  public String load(String key) {
    System.out.println("Loading from database: " + key);
    return "db_value";
  }

  @Override
  public void delete(String key) {
    System.out.println("Deleted from database: " + key);
  }

  @Override
  public boolean exists(String key) {
    return true; // Database check
  }
}

// Implementation 3: File storage
class FileStorage implements DataStorage {
  @Override
  public void save(String key, String value) {
    System.out.println("Saved to file: " + key);
    // File I/O logic here
  }

  @Override
  public String load(String key) {
    return "file_value";
  }

  @Override
  public void delete(String key) {
    System.out.println("Deleted file: " + key);
  }

  @Override
  public boolean exists(String key) {
    return true; // File check
  }
}

// Client works with any implementation
class Application {
  private DataStorage storage;

  public void setStorage(DataStorage storage) {
    this.storage = storage;
  }

  public void storeUser(String userId, String userData) {
    storage.save(userId, userData);
  }
}

// Output: Saved to memory: user123
// Output: Saved to database: user123` },
        { name: 'Type Safety & Generics', codeExample: `import java.util.*;

// Generic interface provides type safety at compile time
interface Repository<T> {
  void save(T entity);
  Optional<T> findById(String id);
  List<T> findAll();
  void delete(String id);
}

class User {
  String id, name, email;

  public User(String id, String name, String email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  @Override
  public String toString() {
    return "User{" + name + ", " + email + "}";
  }
}

class Product {
  String id, name;
  double price;

  public Product(String id, String name, double price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  @Override
  public String toString() {
    return "Product{" + name + ", $" + price + "}";
  }
}

// Type-safe implementation for User
class UserRepository implements Repository<User> {
  private final Map<String, User> users = new HashMap<>();

  @Override
  public void save(User user) {
    users.put(user.id, user);
    System.out.println("Saved user: " + user);
  }

  @Override
  public Optional<User> findById(String id) {
    return Optional.ofNullable(users.get(id));
  }

  @Override
  public List<User> findAll() {
    return new ArrayList<>(users.values());
  }

  @Override
  public void delete(String id) {
    users.remove(id);
  }
}

// Type-safe implementation for Product
class ProductRepository implements Repository<Product> {
  private final Map<String, Product> products = new HashMap<>();

  @Override
  public void save(Product product) {
    products.put(product.id, product);
    System.out.println("Saved product: " + product);
  }

  @Override
  public Optional<Product> findById(String id) {
    return Optional.ofNullable(products.get(id));
  }

  @Override
  public List<Product> findAll() {
    return new ArrayList<>(products.values());
  }

  @Override
  public void delete(String id) {
    products.remove(id);
  }
}

// Compile-time type safety prevents errors
public class TypeSafetyDemo {
  public static void main(String[] args) {
    Repository<User> userRepo = new UserRepository();
    Repository<Product> productRepo = new ProductRepository();

    // Type safe - only User objects
    userRepo.save(new User("1", "Alice", "alice@example.com"));

    // Type safe - only Product objects
    productRepo.save(new Product("P1", "Laptop", 999.99));

    // Compile error: userRepo.save(new Product(...));
    // Type safety prevents mixing types
  }
}
// Output: Saved user: User{Alice, alice@example.com}
// Output: Saved product: Product{Laptop, $999.99}` }
      ],
      description: 'Design approach where interfaces define behavioral contracts that implementations must fulfill, ensuring type safety and flexibility.'
    },
    {
      id: 'dependency-injection', x: 580, y: 140, width: 350, height: 160,
      icon: '💉', title: 'Dependency Injection', color: 'pink',
      details: [
        { name: 'Constructor Injection', codeExample: `// Constructor Injection - preferred method
// Dependencies are immutable, clear, and required

interface EmailService {
  void sendEmail(String to, String subject, String body);
}

interface Logger {
  void log(String message);
}

class SmtpEmailService implements EmailService {
  @Override
  public void sendEmail(String to, String subject, String body) {
    System.out.println("Sending email to: " + to);
    System.out.println("Subject: " + subject);
  }
}

class ConsoleLogger implements Logger {
  @Override
  public void log(String message) {
    System.out.println("[LOG] " + message);
  }
}

// Constructor injection - dependencies passed in constructor
class UserService {
  private final EmailService emailService;
  private final Logger logger;

  // Dependencies injected via constructor
  public UserService(EmailService emailService, Logger logger) {
    this.emailService = emailService;
    this.logger = logger;
  }

  public void registerUser(String email, String name) {
    logger.log("Registering user: " + name);

    // Business logic
    System.out.println("Creating user account for: " + name);

    // Use injected dependencies
    emailService.sendEmail(email,
      "Welcome!",
      "Hello " + name + ", welcome to our service!");

    logger.log("User registered successfully: " + email);
  }
}

public class ConstructorInjectionDemo {
  public static void main(String[] args) {
    // Manual dependency injection
    EmailService emailService = new SmtpEmailService();
    Logger logger = new ConsoleLogger();

    // Inject dependencies via constructor
    UserService userService = new UserService(emailService, logger);

    userService.registerUser("alice@example.com", "Alice");
  }
}
// Output: [LOG] Registering user: Alice
// Output: Creating user account for: Alice
// Output: Sending email to: alice@example.com
// Output: Subject: Welcome!
// Output: [LOG] User registered successfully: alice@example.com` },
        { name: 'Dependency Inversion Principle', codeExample: `// High-level modules should not depend on low-level modules
// Both should depend on abstractions (interfaces)

// Abstraction (interface)
interface DataStore {
  void save(String data);
  String load();
}

interface NotificationService {
  void notify(String message);
}

// Low-level module 1
class FileDataStore implements DataStore {
  @Override
  public void save(String data) {
    System.out.println("Saving to file: " + data);
  }

  @Override
  public String load() {
    return "file_data";
  }
}

// Low-level module 2
class DatabaseDataStore implements DataStore {
  @Override
  public void save(String data) {
    System.out.println("Saving to database: " + data);
  }

  @Override
  public String load() {
    return "database_data";
  }
}

// Low-level module 3
class EmailNotificationService implements NotificationService {
  @Override
  public void notify(String message) {
    System.out.println("Email notification: " + message);
  }
}

// High-level module depends on abstractions, not concrete classes
class OrderProcessor {
  private final DataStore dataStore;
  private final NotificationService notifier;

  // Depends on interfaces, not implementations
  public OrderProcessor(DataStore dataStore,
                        NotificationService notifier) {
    this.dataStore = dataStore;
    this.notifier = notifier;
  }

  public void processOrder(String orderId, double amount) {
    String orderData = "Order: " + orderId + ", Amount: $" + amount;

    dataStore.save(orderData);
    notifier.notify("Order " + orderId + " processed successfully");

    System.out.println("Order processed: " + orderId);
  }
}

public class DependencyInversionDemo {
  public static void main(String[] args) {
    // Easy to swap implementations
    DataStore store = new FileDataStore();
    // DataStore store = new DatabaseDataStore(); // Easy swap

    NotificationService notifier = new EmailNotificationService();

    OrderProcessor processor = new OrderProcessor(store, notifier);
    processor.processOrder("ORD-123", 99.99);
  }
}
// Output: Saving to file: Order: ORD-123, Amount: $99.99
// Output: Email notification: Order ORD-123 processed successfully
// Output: Order processed: ORD-123` },
        { name: 'Mock Testing with DI', codeExample: `import java.util.*;

// Interfaces for dependencies
interface PaymentGateway {
  boolean charge(String cardToken, double amount);
}

interface InventoryService {
  boolean reserveItem(String itemId, int quantity);
  void releaseItem(String itemId, int quantity);
}

// Real implementations
class StripePaymentGateway implements PaymentGateway {
  @Override
  public boolean charge(String cardToken, double amount) {
    System.out.println("Charging $" + amount + " via Stripe");
    return true; // Would actually call Stripe API
  }
}

// Service that depends on interfaces
class CheckoutService {
  private final PaymentGateway paymentGateway;
  private final InventoryService inventoryService;

  public CheckoutService(PaymentGateway paymentGateway,
                         InventoryService inventoryService) {
    this.paymentGateway = paymentGateway;
    this.inventoryService = inventoryService;
  }

  public boolean checkout(String itemId, int qty, String cardToken,
                          double amount) {
    // Reserve inventory first
    if (!inventoryService.reserveItem(itemId, qty)) {
      System.out.println("Checkout failed: Item not available");
      return false;
    }

    // Charge payment
    if (!paymentGateway.charge(cardToken, amount)) {
      // Release inventory if payment fails
      inventoryService.releaseItem(itemId, qty);
      System.out.println("Checkout failed: Payment declined");
      return false;
    }

    System.out.println("Checkout successful!");
    return true;
  }
}

// Mock implementations for testing
class MockPaymentGateway implements PaymentGateway {
  private boolean shouldSucceed = true;

  public void setSucceed(boolean succeed) {
    this.shouldSucceed = succeed;
  }

  @Override
  public boolean charge(String cardToken, double amount) {
    System.out.println("[MOCK] Charging $" + amount);
    return shouldSucceed;
  }
}

class MockInventoryService implements InventoryService {
  private final Map<String, Integer> inventory = new HashMap<>();

  public void setStock(String itemId, int quantity) {
    inventory.put(itemId, quantity);
  }

  @Override
  public boolean reserveItem(String itemId, int quantity) {
    int available = inventory.getOrDefault(itemId, 0);
    if (available >= quantity) {
      inventory.put(itemId, available - quantity);
      System.out.println("[MOCK] Reserved " + quantity + " of " + itemId);
      return true;
    }
    return false;
  }

  @Override
  public void releaseItem(String itemId, int quantity) {
    int current = inventory.getOrDefault(itemId, 0);
    inventory.put(itemId, current + quantity);
    System.out.println("[MOCK] Released " + quantity + " of " + itemId);
  }
}

// Easy to test with mocks!
public class MockTestingDemo {
  public static void main(String[] args) {
    // Create mock dependencies for testing
    MockPaymentGateway mockPayment = new MockPaymentGateway();
    MockInventoryService mockInventory = new MockInventoryService();

    mockInventory.setStock("ITEM-123", 10);

    CheckoutService service = new CheckoutService(
      mockPayment, mockInventory);

    // Test successful checkout
    System.out.println("Test 1: Successful checkout");
    service.checkout("ITEM-123", 2, "tok_123", 99.99);

    // Test payment failure
    System.out.println("\\nTest 2: Payment failure");
    mockPayment.setSucceed(false);
    service.checkout("ITEM-123", 1, "tok_456", 49.99);
  }
}
// Output: Test 1: Successful checkout
// Output: [MOCK] Reserved 2 of ITEM-123
// Output: [MOCK] Charging $99.99
// Output: Checkout successful!` }
      ],
      description: 'Pattern where objects receive their dependencies from external sources rather than creating them, improving testability and flexibility.'
    },
    {
      id: 'strategy-pattern', x: 580, y: 340, width: 350, height: 160,
      icon: '🎲', title: 'Strategy Pattern', color: 'pink',
      details: [
        { name: 'Strategy Pattern Basics', codeExample: `// Strategy pattern - family of interchangeable algorithms

interface CompressionStrategy {
  byte[] compress(String data);
  String decompress(byte[] compressed);
}

class ZipCompression implements CompressionStrategy {
  @Override
  public byte[] compress(String data) {
    System.out.println("Compressing with ZIP algorithm");
    return ("ZIP:" + data).getBytes();
  }

  @Override
  public String decompress(byte[] compressed) {
    String result = new String(compressed).replace("ZIP:", "");
    System.out.println("Decompressing with ZIP");
    return result;
  }
}

class GzipCompression implements CompressionStrategy {
  @Override
  public byte[] compress(String data) {
    System.out.println("Compressing with GZIP algorithm");
    return ("GZIP:" + data).getBytes();
  }

  @Override
  public String decompress(byte[] compressed) {
    String result = new String(compressed).replace("GZIP:", "");
    System.out.println("Decompressing with GZIP");
    return result;
  }
}

class LzmaCompression implements CompressionStrategy {
  @Override
  public byte[] compress(String data) {
    System.out.println("Compressing with LZMA algorithm");
    return ("LZMA:" + data).getBytes();
  }

  @Override
  public String decompress(byte[] compressed) {
    String result = new String(compressed).replace("LZMA:", "");
    System.out.println("Decompressing with LZMA");
    return result;
  }
}

// Context class uses strategy
class FileCompressor {
  private CompressionStrategy strategy;

  public void setStrategy(CompressionStrategy strategy) {
    this.strategy = strategy;
  }

  public byte[] compressFile(String fileData) {
    if (strategy == null) {
      throw new IllegalStateException("Strategy not set");
    }
    return strategy.compress(fileData);
  }

  public String decompressFile(byte[] compressed) {
    return strategy.decompress(compressed);
  }
}

public class StrategyPatternDemo {
  public static void main(String[] args) {
    FileCompressor compressor = new FileCompressor();
    String data = "This is important data to compress";

    // Use ZIP strategy
    compressor.setStrategy(new ZipCompression());
    byte[] zipCompressed = compressor.compressFile(data);

    // Switch to GZIP strategy at runtime
    compressor.setStrategy(new GzipCompression());
    byte[] gzipCompressed = compressor.compressFile(data);

    // Decompress
    String decompressed = compressor.decompressFile(gzipCompressed);
    System.out.println("Decompressed: " + decompressed);
  }
}
// Output: Compressing with ZIP algorithm
// Output: Compressing with GZIP algorithm
// Output: Decompressing with GZIP
// Output: Decompressed: This is important data to compress` },
        { name: 'Comparator Strategy', codeExample: `import java.util.*;

// Comparator is a strategy pattern in Java Collections

class Product {
  String name;
  double price;
  int rating;

  public Product(String name, double price, int rating) {
    this.name = name;
    this.price = price;
    this.rating = rating;
  }

  @Override
  public String toString() {
    return name + " ($" + price + ", " + rating + "★)";
  }
}

// Different sorting strategies implementing Comparator
class PriceComparator implements Comparator<Product> {
  @Override
  public int compare(Product p1, Product p2) {
    return Double.compare(p1.price, p2.price);
  }
}

class RatingComparator implements Comparator<Product> {
  @Override
  public int compare(Product p1, Product p2) {
    return Integer.compare(p2.rating, p1.rating); // Descending
  }
}

class NameComparator implements Comparator<Product> {
  @Override
  public int compare(Product p1, Product p2) {
    return p1.name.compareTo(p2.name);
  }
}

public class ComparatorStrategyDemo {
  public static void main(String[] args) {
    List<Product> products = new ArrayList<>();
    products.add(new Product("Laptop", 999.99, 4));
    products.add(new Product("Mouse", 29.99, 5));
    products.add(new Product("Keyboard", 79.99, 3));
    products.add(new Product("Monitor", 299.99, 5));

    // Sort by price (ascending)
    System.out.println("Sorted by price:");
    Collections.sort(products, new PriceComparator());
    products.forEach(System.out::println);

    // Sort by rating (descending)
    System.out.println("\\nSorted by rating:");
    Collections.sort(products, new RatingComparator());
    products.forEach(System.out::println);

    // Sort by name (alphabetical)
    System.out.println("\\nSorted by name:");
    Collections.sort(products, new NameComparator());
    products.forEach(System.out::println);

    // Lambda strategy (Java 8+)
    System.out.println("\\nSorted by price (lambda):");
    products.sort((p1, p2) -> Double.compare(p1.price, p2.price));
    products.forEach(System.out::println);
  }
}
// Output: Sorted by price:
// Output: Mouse ($29.99, 5★)
// Output: Keyboard ($79.99, 3★)` },
        { name: 'Payment Strategy', codeExample: `// Real-world example: Payment processing strategies

interface PaymentStrategy {
  boolean pay(double amount);
  String getPaymentMethod();
}

class CreditCardStrategy implements PaymentStrategy {
  private String cardNumber;
  private String cvv;
  private String expiryDate;

  public CreditCardStrategy(String cardNumber, String cvv,
                            String expiryDate) {
    this.cardNumber = cardNumber;
    this.cvv = cvv;
    this.expiryDate = expiryDate;
  }

  @Override
  public boolean pay(double amount) {
    System.out.println("Processing credit card payment");
    System.out.println("Card: ****" +
      cardNumber.substring(cardNumber.length() - 4));
    System.out.println("Amount: $" + amount);
    return true;
  }

  @Override
  public String getPaymentMethod() {
    return "Credit Card";
  }
}

class PayPalStrategy implements PaymentStrategy {
  private String email;
  private String password;

  public PayPalStrategy(String email, String password) {
    this.email = email;
    this.password = password;
  }

  @Override
  public boolean pay(double amount) {
    System.out.println("Processing PayPal payment");
    System.out.println("Email: " + email);
    System.out.println("Amount: $" + amount);
    return true;
  }

  @Override
  public String getPaymentMethod() {
    return "PayPal";
  }
}

class CryptocurrencyStrategy implements PaymentStrategy {
  private String walletAddress;
  private String cryptocurrency;

  public CryptocurrencyStrategy(String walletAddress, String crypto) {
    this.walletAddress = walletAddress;
    this.cryptocurrency = crypto;
  }

  @Override
  public boolean pay(double amount) {
    System.out.println("Processing " + cryptocurrency + " payment");
    System.out.println("Wallet: " + walletAddress);
    System.out.println("Amount: $" + amount);
    return true;
  }

  @Override
  public String getPaymentMethod() {
    return cryptocurrency;
  }
}

class ShoppingCart {
  private PaymentStrategy paymentStrategy;
  private double totalAmount = 0;

  public void setPaymentStrategy(PaymentStrategy strategy) {
    this.paymentStrategy = strategy;
  }

  public void addItem(String item, double price) {
    System.out.println("Added " + item + ": $" + price);
    totalAmount += price;
  }

  public boolean checkout() {
    if (paymentStrategy == null) {
      System.out.println("Please select a payment method");
      return false;
    }

    System.out.println("\\nCheckout with " +
      paymentStrategy.getPaymentMethod());
    return paymentStrategy.pay(totalAmount);
  }
}

public class PaymentStrategyDemo {
  public static void main(String[] args) {
    ShoppingCart cart = new ShoppingCart();
    cart.addItem("Laptop", 999.99);
    cart.addItem("Mouse", 29.99);

    // Customer chooses payment method
    cart.setPaymentStrategy(new CreditCardStrategy(
      "1234567890123456", "123", "12/25"));
    cart.checkout();

    // Can easily switch payment method
    System.out.println("\\n--- New cart ---");
    ShoppingCart cart2 = new ShoppingCart();
    cart2.addItem("Monitor", 299.99);
    cart2.setPaymentStrategy(new PayPalStrategy(
      "user@example.com", "password"));
    cart2.checkout();
  }
}
// Output: Added Laptop: $999.99
// Output: Added Mouse: $29.99
// Output: Checkout with Credit Card
// Output: Processing credit card payment
// Output: Card: ****3456
// Output: Amount: $1029.98` }
      ],
      description: 'Defines family of algorithms, encapsulates each one, and makes them interchangeable at runtime.'
    },
    {
      id: 'factory-pattern', x: 80, y: 440, width: 350, height: 160,
      icon: '🏭', title: 'Factory Pattern', color: 'pink',
      details: [
        { name: 'Factory Method Pattern', codeExample: `// Factory Method - subclasses decide which class to instantiate

interface Logger {
  void log(String message);
}

class FileLogger implements Logger {
  @Override
  public void log(String message) {
    System.out.println("[FILE] " + message);
  }
}

class ConsoleLogger implements Logger {
  @Override
  public void log(String message) {
    System.out.println("[CONSOLE] " + message);
  }
}

class DatabaseLogger implements Logger {
  @Override
  public void log(String message) {
    System.out.println("[DATABASE] " + message);
  }
}

// Creator abstract class with factory method
abstract class Application {
  // Factory method - subclasses override
  protected abstract Logger createLogger();

  public void run() {
    Logger logger = createLogger();
    logger.log("Application started");
    // Use logger throughout application
    processData(logger);
    logger.log("Application finished");
  }

  private void processData(Logger logger) {
    logger.log("Processing data...");
  }
}

// Concrete creator 1
class ProductionApp extends Application {
  @Override
  protected Logger createLogger() {
    return new FileLogger();
  }
}

// Concrete creator 2
class DevelopmentApp extends Application {
  @Override
  protected Logger createLogger() {
    return new ConsoleLogger();
  }
}

public class FactoryMethodDemo {
  public static void main(String[] args) {
    System.out.println("Production environment:");
    Application prodApp = new ProductionApp();
    prodApp.run();

    System.out.println("\\nDevelopment environment:");
    Application devApp = new DevelopmentApp();
    devApp.run();
  }
}
// Output: Production environment:
// Output: [FILE] Application started
// Output: [FILE] Processing data...
// Output: [FILE] Application finished` },
        { name: 'Abstract Factory Pattern', codeExample: `// Abstract Factory - create families of related objects

interface Button {
  void render();
}

interface Checkbox {
  void render();
}

// Windows family
class WindowsButton implements Button {
  @Override
  public void render() {
    System.out.println("Rendering Windows-style button");
  }
}

class WindowsCheckbox implements Checkbox {
  @Override
  public void render() {
    System.out.println("Rendering Windows-style checkbox");
  }
}

// Mac family
class MacButton implements Button {
  @Override
  public void render() {
    System.out.println("Rendering Mac-style button");
  }
}

class MacCheckbox implements Checkbox {
  @Override
  public void render() {
    System.out.println("Rendering Mac-style checkbox");
  }
}

// Abstract factory interface
interface GUIFactory {
  Button createButton();
  Checkbox createCheckbox();
}

// Concrete factory for Windows
class WindowsFactory implements GUIFactory {
  @Override
  public Button createButton() {
    return new WindowsButton();
  }

  @Override
  public Checkbox createCheckbox() {
    return new WindowsCheckbox();
  }
}

// Concrete factory for Mac
class MacFactory implements GUIFactory {
  @Override
  public Button createButton() {
    return new MacButton();
  }

  @Override
  public Checkbox createCheckbox() {
    return new MacCheckbox();
  }
}

// Client code works with abstract factory
class UIRenderer {
  private final GUIFactory factory;

  public UIRenderer(GUIFactory factory) {
    this.factory = factory;
  }

  public void renderUI() {
    Button button = factory.createButton();
    Checkbox checkbox = factory.createCheckbox();

    button.render();
    checkbox.render();
  }
}

public class AbstractFactoryDemo {
  public static void main(String[] args) {
    String os = "Windows"; // Could be determined at runtime

    GUIFactory factory;
    if (os.equals("Windows")) {
      factory = new WindowsFactory();
    } else {
      factory = new MacFactory();
    }

    UIRenderer renderer = new UIRenderer(factory);
    renderer.renderUI();
  }
}
// Output: Rendering Windows-style button
// Output: Rendering Windows-style checkbox` },
        { name: 'Simple Factory', codeExample: `// Simple Factory - centralized object creation

enum ShapeType {
  CIRCLE, RECTANGLE, TRIANGLE
}

interface Shape {
  void draw();
  double area();
}

class Circle implements Shape {
  private double radius;

  public Circle(double radius) {
    this.radius = radius;
  }

  @Override
  public void draw() {
    System.out.println("Drawing circle with radius: " + radius);
  }

  @Override
  public double area() {
    return Math.PI * radius * radius;
  }
}

class Rectangle implements Shape {
  private double width, height;

  public Rectangle(double width, double height) {
    this.width = width;
    this.height = height;
  }

  @Override
  public void draw() {
    System.out.println("Drawing rectangle: " + width + "x" + height);
  }

  @Override
  public double area() {
    return width * height;
  }
}

class Triangle implements Shape {
  private double base, height;

  public Triangle(double base, double height) {
    this.base = base;
    this.height = height;
  }

  @Override
  public void draw() {
    System.out.println("Drawing triangle: base=" + base +
      ", height=" + height);
  }

  @Override
  public double area() {
    return 0.5 * base * height;
  }
}

// Simple Factory
class ShapeFactory {
  public static Shape createShape(ShapeType type, double... params) {
    switch (type) {
      case CIRCLE:
        return new Circle(params[0]);
      case RECTANGLE:
        return new Rectangle(params[0], params[1]);
      case TRIANGLE:
        return new Triangle(params[0], params[1]);
      default:
        throw new IllegalArgumentException("Unknown shape type");
    }
  }
}

public class SimpleFactoryDemo {
  public static void main(String[] args) {
    // Client doesn't use 'new' directly
    Shape circle = ShapeFactory.createShape(ShapeType.CIRCLE, 5.0);
    Shape rectangle = ShapeFactory.createShape(
      ShapeType.RECTANGLE, 4.0, 6.0);
    Shape triangle = ShapeFactory.createShape(
      ShapeType.TRIANGLE, 3.0, 4.0);

    circle.draw();
    System.out.println("Area: " + circle.area());

    rectangle.draw();
    System.out.println("Area: " + rectangle.area());

    triangle.draw();
    System.out.println("Area: " + triangle.area());
  }
}
// Output: Drawing circle with radius: 5.0
// Output: Area: 78.53981633974483
// Output: Drawing rectangle: 4.0x6.0
// Output: Area: 24.0` }
      ],
      description: 'Creates objects through interface without specifying exact class, delegating instantiation to subclasses or dedicated factory classes.'
    },
    {
      id: 'adapter-pattern', x: 580, y: 540, width: 350, height: 160,
      icon: '🔌', title: 'Adapter Pattern', color: 'pink',
      details: [
        { name: 'Object Adapter Pattern', codeExample: `// Adapter makes incompatible interfaces work together

// Target interface (what client expects)
interface MediaPlayer {
  void play(String audioType, String fileName);
}

// Adaptee (incompatible third-party classes)
class Mp3Player {
  public void playMp3(String fileName) {
    System.out.println("Playing MP3 file: " + fileName);
  }
}

class Mp4Player {
  public void playMp4(String fileName) {
    System.out.println("Playing MP4 file: " + fileName);
  }
}

class VlcPlayer {
  public void playVlc(String fileName) {
    System.out.println("Playing VLC file: " + fileName);
  }
}

// Adapter - adapts Mp4Player and VlcPlayer to MediaPlayer interface
class MediaAdapter implements MediaPlayer {
  private Mp4Player mp4Player;
  private VlcPlayer vlcPlayer;

  public MediaAdapter(String audioType) {
    if (audioType.equalsIgnoreCase("mp4")) {
      mp4Player = new Mp4Player();
    } else if (audioType.equalsIgnoreCase("vlc")) {
      vlcPlayer = new VlcPlayer();
    }
  }

  @Override
  public void play(String audioType, String fileName) {
    if (audioType.equalsIgnoreCase("mp4")) {
      mp4Player.playMp4(fileName);
    } else if (audioType.equalsIgnoreCase("vlc")) {
      vlcPlayer.playVlc(fileName);
    }
  }
}

// Client
class AudioPlayer implements MediaPlayer {
  private Mp3Player mp3Player = new Mp3Player();
  private MediaAdapter adapter;

  @Override
  public void play(String audioType, String fileName) {
    // Built-in support for mp3
    if (audioType.equalsIgnoreCase("mp3")) {
      mp3Player.playMp3(fileName);
    }
    // Use adapter for other formats
    else if (audioType.equalsIgnoreCase("mp4") ||
             audioType.equalsIgnoreCase("vlc")) {
      adapter = new MediaAdapter(audioType);
      adapter.play(audioType, fileName);
    } else {
      System.out.println("Invalid media type: " + audioType);
    }
  }
}

public class AdapterPatternDemo {
  public static void main(String[] args) {
    AudioPlayer player = new AudioPlayer();

    player.play("mp3", "song.mp3");
    player.play("mp4", "video.mp4");
    player.play("vlc", "movie.vlc");
    player.play("avi", "unsupported.avi");
  }
}
// Output: Playing MP3 file: song.mp3
// Output: Playing MP4 file: video.mp4
// Output: Playing VLC file: movie.vlc
// Output: Invalid media type: avi` },
        { name: 'Legacy Code Integration', codeExample: `// Adapting legacy code to modern interface

// Modern interface (what new code expects)
interface PaymentProcessor {
  boolean processPayment(String customerId, double amount);
  String getTransactionId();
}

// Legacy class (can't modify - third-party or old code)
class LegacyCreditCardSystem {
  public int makePayment(int customerNumber, int cents) {
    System.out.println("Legacy system: Processing " + cents +
      " cents for customer " + customerNumber);
    return (int)(Math.random() * 10000); // Returns transaction ID
  }

  public boolean checkStatus(int transactionId) {
    return transactionId > 0;
  }
}

// Adapter bridges legacy and modern interfaces
class LegacyPaymentAdapter implements PaymentProcessor {
  private final LegacyCreditCardSystem legacySystem;
  private int lastTransactionId;

  public LegacyPaymentAdapter(LegacyCreditCardSystem legacySystem) {
    this.legacySystem = legacySystem;
  }

  @Override
  public boolean processPayment(String customerId, double amount) {
    // Adapt parameters: String -> int, double -> cents
    int customerNumber = Integer.parseInt(customerId);
    int cents = (int)(amount * 100);

    lastTransactionId = legacySystem.makePayment(
      customerNumber, cents);

    boolean success = legacySystem.checkStatus(lastTransactionId);
    System.out.println("Payment " +
      (success ? "successful" : "failed"));
    return success;
  }

  @Override
  public String getTransactionId() {
    return "TXN-" + lastTransactionId;
  }
}

// Modern service uses PaymentProcessor interface
class CheckoutService {
  private final PaymentProcessor processor;

  public CheckoutService(PaymentProcessor processor) {
    this.processor = processor;
  }

  public void checkout(String customerId, double amount) {
    System.out.println("\\nProcessing checkout for customer " +
      customerId + " - $" + amount);

    if (processor.processPayment(customerId, amount)) {
      System.out.println("Transaction ID: " +
        processor.getTransactionId());
    }
  }
}

public class LegacyAdapterDemo {
  public static void main(String[] args) {
    // Wrap legacy system with adapter
    LegacyCreditCardSystem legacySystem =
      new LegacyCreditCardSystem();
    PaymentProcessor adapter =
      new LegacyPaymentAdapter(legacySystem);

    // Modern code works with adapter
    CheckoutService service = new CheckoutService(adapter);
    service.checkout("1001", 99.99);
    service.checkout("1002", 149.50);
  }
}
// Output: Processing checkout for customer 1001 - $99.99
// Output: Legacy system: Processing 9999 cents for customer 1001
// Output: Payment successful
// Output: Transaction ID: TXN-7834` },
        { name: 'Third-Party Library Adapter', codeExample: `import java.util.*;

// Your application's interface
interface NotificationService {
  void sendNotification(String recipient, String message);
  boolean isDelivered(String messageId);
}

// Third-party library (can't modify)
class TwilioSMS {
  public String sendSMS(String phoneNumber, String text) {
    System.out.println("[Twilio] Sending SMS to " + phoneNumber);
    System.out.println("[Twilio] Message: " + text);
    return "SMS-" + UUID.randomUUID().toString().substring(0, 8);
  }

  public int getDeliveryStatus(String smsId) {
    return 200; // 200 = delivered
  }
}

class SendGridEmail {
  public Map<String, Object> send(String email, String subject,
                                   String body) {
    System.out.println("[SendGrid] Sending email to " + email);
    System.out.println("[SendGrid] Subject: " + subject);
    Map<String, Object> response = new HashMap<>();
    response.put("id", "EMAIL-" + System.currentTimeMillis());
    response.put("status", "sent");
    return response;
  }
}

// Adapters for third-party libraries
class TwilioAdapter implements NotificationService {
  private final TwilioSMS twilioSMS;
  private String lastMessageId;

  public TwilioAdapter(TwilioSMS twilioSMS) {
    this.twilioSMS = twilioSMS;
  }

  @Override
  public void sendNotification(String recipient, String message) {
    lastMessageId = twilioSMS.sendSMS(recipient, message);
  }

  @Override
  public boolean isDelivered(String messageId) {
    return twilioSMS.getDeliveryStatus(messageId) == 200;
  }
}

class SendGridAdapter implements NotificationService {
  private final SendGridEmail sendGrid;
  private String lastMessageId;

  public SendGridAdapter(SendGridEmail sendGrid) {
    this.sendGrid = sendGrid;
  }

  @Override
  public void sendNotification(String recipient, String message) {
    Map<String, Object> response = sendGrid.send(
      recipient, "Notification", message);
    lastMessageId = (String) response.get("id");
  }

  @Override
  public boolean isDelivered(String messageId) {
    return lastMessageId != null;
  }
}

// Your application code
class NotificationManager {
  private final List<NotificationService> services;

  public NotificationManager(List<NotificationService> services) {
    this.services = services;
  }

  public void notifyAll(String recipient, String message) {
    services.forEach(service ->
      service.sendNotification(recipient, message));
  }
}

public class ThirdPartyAdapterDemo {
  public static void main(String[] args) {
    // Wrap third-party libraries with adapters
    List<NotificationService> services = Arrays.asList(
      new TwilioAdapter(new TwilioSMS()),
      new SendGridAdapter(new SendGridEmail())
    );

    NotificationManager manager = new NotificationManager(services);
    manager.notifyAll("+1234567890", "Your order has shipped!");
  }
}
// Output: [Twilio] Sending SMS to +1234567890
// Output: [Twilio] Message: Your order has shipped!
// Output: [SendGrid] Sending email to +1234567890
// Output: [SendGrid] Subject: Notification` }
      ],
      description: 'Allows incompatible interfaces to work together by wrapping existing class with new interface.'
    },
    {
      id: 'interface-segregation', x: 1080, y: 240, width: 350, height: 160,
      icon: '✂️', title: 'Interface Segregation', color: 'pink',
      details: [
        { name: 'Fat Interface Problem', codeExample: `// BAD: Fat interface forces implementations to implement unused methods

interface Worker {
  void work();
  void eat();
  void sleep();
  void getPaid();
  void attendMeeting();
}

// Robot worker doesn't eat or sleep!
class RobotWorker implements Worker {
  @Override
  public void work() {
    System.out.println("Robot working 24/7");
  }

  @Override
  public void eat() {
    // Forced to implement - doesn't make sense for robot
    throw new UnsupportedOperationException("Robots don't eat");
  }

  @Override
  public void sleep() {
    // Forced to implement - doesn't make sense for robot
    throw new UnsupportedOperationException("Robots don't sleep");
  }

  @Override
  public void getPaid() {
    // Robots don't get paid
    throw new UnsupportedOperationException();
  }

  @Override
  public void attendMeeting() {
    System.out.println("Robot attending meeting");
  }
}

// GOOD: Segregated interfaces - small, focused contracts

interface Workable {
  void work();
}

interface Eatable {
  void eat();
}

interface Sleepable {
  void sleep();
}

interface Payable {
  void getPaid();
}

interface Meetable {
  void attendMeeting();
}

// Human implements all relevant interfaces
class HumanWorker implements Workable, Eatable, Sleepable,
                             Payable, Meetable {
  @Override
  public void work() {
    System.out.println("Human working 8 hours");
  }

  @Override
  public void eat() {
    System.out.println("Human eating lunch");
  }

  @Override
  public void sleep() {
    System.out.println("Human sleeping 8 hours");
  }

  @Override
  public void getPaid() {
    System.out.println("Human getting paid");
  }

  @Override
  public void attendMeeting() {
    System.out.println("Human attending meeting");
  }
}

// Robot implements only relevant interfaces
class ImprovedRobotWorker implements Workable, Meetable {
  @Override
  public void work() {
    System.out.println("Robot working 24/7");
  }

  @Override
  public void attendMeeting() {
    System.out.println("Robot attending meeting");
  }
}

public class InterfaceSegregationDemo {
  public static void main(String[] args) {
    Workable human = new HumanWorker();
    Workable robot = new ImprovedRobotWorker();

    human.work();
    robot.work();
  }
}
// Output: Human working 8 hours
// Output: Robot working 24/7` },
        { name: 'Role-Based Interfaces', codeExample: `// Multiple small interfaces for different roles/capabilities

interface Readable {
  String read();
}

interface Writable {
  void write(String data);
}

interface Closeable {
  void close();
}

interface Seekable {
  void seek(long position);
  long getPosition();
}

// Read-only file - implements only Readable
class ReadOnlyFile implements Readable, Closeable {
  private final String fileName;

  public ReadOnlyFile(String fileName) {
    this.fileName = fileName;
  }

  @Override
  public String read() {
    System.out.println("Reading from " + fileName);
    return "file content";
  }

  @Override
  public void close() {
    System.out.println("Closing " + fileName);
  }
}

// Full-featured file - implements all interfaces
class RandomAccessFile implements Readable, Writable, Closeable,
                                  Seekable {
  private final String fileName;
  private long position = 0;

  public RandomAccessFile(String fileName) {
    this.fileName = fileName;
  }

  @Override
  public String read() {
    System.out.println("Reading from " + fileName +
      " at position " + position);
    return "data";
  }

  @Override
  public void write(String data) {
    System.out.println("Writing to " + fileName +
      " at position " + position + ": " + data);
  }

  @Override
  public void seek(long position) {
    this.position = position;
    System.out.println("Seeked to position " + position);
  }

  @Override
  public long getPosition() {
    return position;
  }

  @Override
  public void close() {
    System.out.println("Closing " + fileName);
  }
}

// Clients depend only on what they need
class FileReader {
  public void processFile(Readable file) {
    String content = file.read();
    System.out.println("Processed: " + content);
  }
}

class FileWriter {
  public void saveData(Writable file, String data) {
    file.write(data);
  }
}

public class RoleInterfacesDemo {
  public static void main(String[] args) {
    ReadOnlyFile readOnlyFile = new ReadOnlyFile("data.txt");
    RandomAccessFile rwFile = new RandomAccessFile("output.dat");

    FileReader reader = new FileReader();
    reader.processFile(readOnlyFile);
    reader.processFile(rwFile);

    FileWriter writer = new FileWriter();
    // writer.saveData(readOnlyFile, "data"); // Won't compile!
    writer.saveData(rwFile, "Hello World");

    rwFile.seek(100);
  }
}
// Output: Reading from data.txt
// Output: Processed: file content` },
        { name: 'Default Methods (Java 8+)', codeExample: `// Default methods allow interface evolution without breaking clients

interface Vehicle {
  void start();
  void stop();

  // Default method - provides implementation
  default void honk() {
    System.out.println("Beep beep!");
  }

  // Java 8+ default method for backward compatibility
  default String getType() {
    return "Unknown vehicle";
  }
}

interface ElectricPowered {
  void charge();

  default int getBatteryLevel() {
    return 100; // Default implementation
  }
}

interface SelfDriving {
  void enableAutoPilot();
  void disableAutoPilot();

  default boolean isAutoPilotSafe() {
    return true; // Default implementation
  }
}

class Car implements Vehicle {
  @Override
  public void start() {
    System.out.println("Car engine starting");
  }

  @Override
  public void stop() {
    System.out.println("Car engine stopping");
  }

  // Optionally override default methods
  @Override
  public String getType() {
    return "Gas-powered car";
  }
}

class ElectricCar implements Vehicle, ElectricPowered, SelfDriving {
  private int batteryLevel = 80;

  @Override
  public void start() {
    System.out.println("Electric car powering on silently");
  }

  @Override
  public void stop() {
    System.out.println("Electric car powering off");
  }

  @Override
  public void charge() {
    batteryLevel = 100;
    System.out.println("Charging complete. Battery: " + batteryLevel + "%");
  }

  @Override
  public int getBatteryLevel() {
    return batteryLevel;
  }

  @Override
  public void enableAutoPilot() {
    System.out.println("Autopilot enabled");
  }

  @Override
  public void disableAutoPilot() {
    System.out.println("Autopilot disabled");
  }

  @Override
  public String getType() {
    return "Electric car with autopilot";
  }
}

public class DefaultMethodsDemo {
  public static void main(String[] args) {
    Car car = new Car();
    car.start();
    car.honk(); // Uses default implementation
    System.out.println("Type: " + car.getType());
    car.stop();

    System.out.println();

    ElectricCar tesla = new ElectricCar();
    tesla.start();
    tesla.honk(); // Inherited default method
    System.out.println("Type: " + tesla.getType());
    System.out.println("Battery: " + tesla.getBatteryLevel() + "%");
    tesla.charge();
    tesla.enableAutoPilot();
    System.out.println("Autopilot safe: " + tesla.isAutoPilotSafe());
    tesla.stop();
  }
}
// Output: Car engine starting
// Output: Beep beep!
// Output: Type: Gas-powered car` }
      ],
      description: 'SOLID principle stating interfaces should be small and focused, not forcing clients to depend on unused methods.'
    },
    {
      id: 'api-design', x: 1080, y: 440, width: 350, height: 160,
      icon: '🎨', title: 'API Design', color: 'pink',
      details: [
        { name: 'Clear & Consistent API', codeExample: `// Good API design principles

/**
 * User management API with clear, consistent naming
 */
public interface UserService {
  /**
   * Creates a new user account
   * @param username Must be unique and 3-20 characters
   * @param email Must be valid email format
   * @return Created user with generated ID
   * @throws IllegalArgumentException if username/email invalid
   * @throws DuplicateUserException if username exists
   */
  User createUser(String username, String email);

  /**
   * Finds user by unique identifier
   * @param userId Non-null user ID
   * @return Optional containing user if found
   */
  Optional<User> findUserById(String userId);

  /**
   * Finds users matching search criteria
   * @param criteria Search parameters
   * @return List of matching users (never null, may be empty)
   */
  List<User> findUsers(SearchCriteria criteria);

  /**
   * Updates existing user information
   * @param userId ID of user to update
   * @param updates Fields to update
   * @return Updated user
   * @throws UserNotFoundException if user doesn't exist
   */
  User updateUser(String userId, UserUpdates updates);

  /**
   * Deletes user account
   * @param userId ID of user to delete
   * @return true if deleted, false if not found
   */
  boolean deleteUser(String userId);

  /**
   * Checks if username is available
   * @param username Username to check
   * @return true if available
   */
  boolean isUsernameAvailable(String username);
}

// Consistent naming patterns:
// - create*, find*, update*, delete* for CRUD operations
// - is* for boolean queries
// - get* for simple retrieval
// - All methods clearly state what they do
// - Parameters and returns documented
// - Exceptions documented

class User {
  private final String id;
  private final String username;
  private final String email;
  private final long createdAt;

  // Constructor, getters...
  public User(String id, String username, String email,
              long createdAt) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.createdAt = createdAt;
  }

  public String getId() { return id; }
  public String getUsername() { return username; }
  public String getEmail() { return email; }
  public long getCreatedAt() { return createdAt; }
}

class SearchCriteria {
  private String usernamePattern;
  private String emailPattern;
  // Builder pattern for complex criteria
}

class UserUpdates {
  private Optional<String> newEmail = Optional.empty();
  private Optional<String> newUsername = Optional.empty();
  // Builder pattern for updates
}

class DuplicateUserException extends Exception {}
class UserNotFoundException extends Exception {}
// Output: (API design example - no execution)` },
        { name: 'Immutability & Fluent API', codeExample: `import java.util.*;

// Immutable configuration with builder pattern

public final class DatabaseConfig {
  private final String host;
  private final int port;
  private final String database;
  private final String username;
  private final int maxConnections;
  private final int timeoutSeconds;
  private final boolean useSSL;

  // Private constructor - only builder can create
  private DatabaseConfig(Builder builder) {
    this.host = Objects.requireNonNull(builder.host);
    this.port = builder.port;
    this.database = Objects.requireNonNull(builder.database);
    this.username = Objects.requireNonNull(builder.username);
    this.maxConnections = builder.maxConnections;
    this.timeoutSeconds = builder.timeoutSeconds;
    this.useSSL = builder.useSSL;
  }

  // Getters only - no setters (immutable)
  public String getHost() { return host; }
  public int getPort() { return port; }
  public String getDatabase() { return database; }
  public String getUsername() { return username; }
  public int getMaxConnections() { return maxConnections; }
  public int getTimeoutSeconds() { return timeoutSeconds; }
  public boolean isUseSSL() { return useSSL; }

  @Override
  public String toString() {
    return "DatabaseConfig{host='" + host + "', port=" + port +
           ", database='" + database + "', maxConnections=" +
           maxConnections + ", ssl=" + useSSL + "}";
  }

  // Fluent builder API
  public static class Builder {
    private String host = "localhost";
    private int port = 5432;
    private String database;
    private String username;
    private int maxConnections = 10;
    private int timeoutSeconds = 30;
    private boolean useSSL = false;

    public Builder host(String host) {
      this.host = host;
      return this; // Return this for chaining
    }

    public Builder port(int port) {
      this.port = port;
      return this;
    }

    public Builder database(String database) {
      this.database = database;
      return this;
    }

    public Builder username(String username) {
      this.username = username;
      return this;
    }

    public Builder maxConnections(int maxConnections) {
      this.maxConnections = maxConnections;
      return this;
    }

    public Builder timeoutSeconds(int timeoutSeconds) {
      this.timeoutSeconds = timeoutSeconds;
      return this;
    }

    public Builder useSSL(boolean useSSL) {
      this.useSSL = useSSL;
      return this;
    }

    public DatabaseConfig build() {
      // Validation before building
      if (database == null || username == null) {
        throw new IllegalStateException(
          "Database and username are required");
      }
      return new DatabaseConfig(this);
    }
  }

  public static Builder builder() {
    return new Builder();
  }
}

public class FluentAPIDemo {
  public static void main(String[] args) {
    // Fluent, readable configuration
    DatabaseConfig config = DatabaseConfig.builder()
        .host("db.example.com")
        .port(5432)
        .database("myapp")
        .username("admin")
        .maxConnections(20)
        .timeoutSeconds(60)
        .useSSL(true)
        .build();

    System.out.println(config);

    // Immutable - thread-safe, can be shared
    // config.setHost("other"); // Won't compile!
  }
}
// Output: DatabaseConfig{host='db.example.com', port=5432, database='myapp', maxConnections=20, ssl=true}` },
        { name: 'Versioning & Evolution', codeExample: `// API versioning and evolution strategies

/**
 * Payment API v1.0
 * @since 1.0
 */
public interface PaymentAPI_V1 {
  /**
   * Process a payment
   * @deprecated Use {@link #processPayment(PaymentRequest)} instead
   */
  @Deprecated
  boolean processPayment(String customerId, double amount);
}

/**
 * Payment API v2.0 - Extended with more features
 * @since 2.0
 */
public interface PaymentAPI_V2 extends PaymentAPI_V1 {
  /**
   * Process payment with detailed request object
   * @since 2.0
   */
  PaymentResult processPayment(PaymentRequest request);

  /**
   * Refund a payment
   * @since 2.0
   */
  RefundResult refund(String transactionId, double amount);
}

/**
 * Payment API v3.0 - Added async support
 * @since 3.0
 */
public interface PaymentAPI_V3 extends PaymentAPI_V2 {
  /**
   * Process payment asynchronously
   * @since 3.0
   */
  CompletableFuture<PaymentResult> processPaymentAsync(
    PaymentRequest request);
}

// Modern implementation supports all versions
class PaymentService implements PaymentAPI_V3 {
  @Override
  public boolean processPayment(String customerId, double amount) {
    // V1 compatibility - delegates to V2
    System.out.println("[DEPRECATED] Using V1 API");
    PaymentRequest request = new PaymentRequest(customerId, amount);
    PaymentResult result = processPayment(request);
    return result.isSuccess();
  }

  @Override
  public PaymentResult processPayment(PaymentRequest request) {
    System.out.println("Processing payment: " + request);
    return new PaymentResult(true, "TXN-" +
      System.currentTimeMillis());
  }

  @Override
  public RefundResult refund(String transactionId, double amount) {
    System.out.println("Refunding: " + transactionId +
      " amount: $" + amount);
    return new RefundResult(true);
  }

  @Override
  public CompletableFuture<PaymentResult> processPaymentAsync(
      PaymentRequest request) {
    return CompletableFuture.supplyAsync(() ->
      processPayment(request));
  }
}

class PaymentRequest {
  final String customerId;
  final double amount;

  public PaymentRequest(String customerId, double amount) {
    this.customerId = customerId;
    this.amount = amount;
  }

  @Override
  public String toString() {
    return "PaymentRequest{customer='" + customerId +
           "', amount=" + amount + "}";
  }
}

class PaymentResult {
  final boolean success;
  final String transactionId;

  public PaymentResult(boolean success, String transactionId) {
    this.success = success;
    this.transactionId = transactionId;
  }

  public boolean isSuccess() { return success; }
  public String getTransactionId() { return transactionId; }
}

class RefundResult {
  final boolean success;
  public RefundResult(boolean success) { this.success = success; }
}

public class APIVersioningDemo {
  public static void main(String[] args) {
    PaymentService service = new PaymentService();

    // V1 API still works (deprecated)
    service.processPayment("C123", 99.99);

    // V2 API with rich objects
    PaymentRequest req = new PaymentRequest("C456", 149.99);
    PaymentResult result = service.processPayment(req);
    System.out.println("Transaction: " + result.getTransactionId());

    // V3 async API
    service.processPaymentAsync(req).thenAccept(r ->
      System.out.println("Async completed: " +
        r.getTransactionId()));
  }
}
// Output: [DEPRECATED] Using V1 API
// Output: Processing payment: PaymentRequest{customer='C123', amount=99.99}` }
      ],
      description: 'Principles for designing clear, consistent, and maintainable APIs including naming, documentation, and versioning.'
    },
    {
      id: 'polymorphism-interfaces', x: 1080, y: 640, width: 350, height: 140,
      icon: '🎭', title: 'Polymorphism via Interfaces', color: 'pink',
      details: [
        { name: 'Interface Polymorphism', codeExample: `import java.util.*;

// Interface polymorphism - treat different types uniformly

interface Shape {
  double area();
  double perimeter();
  void draw();
}

class Circle implements Shape {
  private double radius;

  public Circle(double radius) {
    this.radius = radius;
  }

  @Override
  public double area() {
    return Math.PI * radius * radius;
  }

  @Override
  public double perimeter() {
    return 2 * Math.PI * radius;
  }

  @Override
  public void draw() {
    System.out.println("Drawing circle with radius " + radius);
  }
}

class Rectangle implements Shape {
  private double width, height;

  public Rectangle(double width, double height) {
    this.width = width;
    this.height = height;
  }

  @Override
  public double area() {
    return width * height;
  }

  @Override
  public double perimeter() {
    return 2 * (width + height);
  }

  @Override
  public void draw() {
    System.out.println("Drawing rectangle " + width + "x" + height);
  }
}

class Triangle implements Shape {
  private double a, b, c;

  public Triangle(double a, double b, double c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  @Override
  public double area() {
    double s = (a + b + c) / 2;
    return Math.sqrt(s * (s-a) * (s-b) * (s-c));
  }

  @Override
  public double perimeter() {
    return a + b + c;
  }

  @Override
  public void draw() {
    System.out.println("Drawing triangle with sides " +
      a + ", " + b + ", " + c);
  }
}

// Work with shapes polymorphically
class ShapeProcessor {
  public void processShapes(List<Shape> shapes) {
    double totalArea = 0;
    double totalPerimeter = 0;

    for (Shape shape : shapes) {
      // Polymorphism - calls appropriate implementation
      shape.draw();
      totalArea += shape.area();
      totalPerimeter += shape.perimeter();
    }

    System.out.println("\\nTotal area: " + totalArea);
    System.out.println("Total perimeter: " + totalPerimeter);
  }
}

public class PolymorphismDemo {
  public static void main(String[] args) {
    List<Shape> shapes = new ArrayList<>();
    shapes.add(new Circle(5.0));
    shapes.add(new Rectangle(4.0, 6.0));
    shapes.add(new Triangle(3.0, 4.0, 5.0));

    ShapeProcessor processor = new ShapeProcessor();
    processor.processShapes(shapes);
  }
}
// Output: Drawing circle with radius 5.0
// Output: Drawing rectangle 4.0x6.0
// Output: Drawing triangle with sides 3.0, 4.0, 5.0
// Output: Total area: 108.53981633974483
// Output: Total perimeter: 51.42477796076938` },
        { name: 'Functional Interfaces', codeExample: `import java.util.*;
import java.util.function.*;

// Functional interfaces - single abstract method (SAM)
// Enable lambda expressions and method references

@FunctionalInterface
interface Calculator {
  double calculate(double a, double b);
}

public class FunctionalInterfaceDemo {
  public static void main(String[] args) {
    // Lambda expressions with custom functional interface
    Calculator add = (a, b) -> a + b;
    Calculator multiply = (a, b) -> a * b;
    Calculator power = (a, b) -> Math.pow(a, b);

    System.out.println("5 + 3 = " + add.calculate(5, 3));
    System.out.println("5 * 3 = " + multiply.calculate(5, 3));
    System.out.println("5 ^ 3 = " + power.calculate(5, 3));

    // Built-in functional interfaces
    // Predicate<T> - takes T, returns boolean
    Predicate<String> isLong = s -> s.length() > 5;
    System.out.println("\\n'Hello' is long: " + isLong.test("Hello"));
    System.out.println("'Programming' is long: " +
      isLong.test("Programming"));

    // Function<T, R> - takes T, returns R
    Function<String, Integer> length = s -> s.length();
    System.out.println("\\nLength of 'Java': " + length.apply("Java"));

    // Consumer<T> - takes T, returns void
    Consumer<String> printer = s ->
      System.out.println("Printing: " + s);
    printer.accept("Hello World");

    // Supplier<T> - takes nothing, returns T
    Supplier<Double> random = () -> Math.random();
    System.out.println("\\nRandom number: " + random.get());

    // Using with streams
    List<String> words = Arrays.asList(
      "Java", "Python", "JavaScript", "C++", "Go");

    System.out.println("\\nLong words:");
    words.stream()
         .filter(isLong)
         .map(String::toUpperCase)
         .forEach(System.out::println);

    // Method references
    Function<String, Integer> lengthRef = String::length;
    Consumer<String> printRef = System.out::println;

    System.out.println("\\nWord lengths:");
    words.stream()
         .map(lengthRef)
         .forEach(printRef);

    // Chaining functional interfaces
    Function<String, String> trim = String::trim;
    Function<String, String> upper = String::toUpperCase;
    Function<String, String> trimAndUpper = trim.andThen(upper);

    System.out.println("\\nChained: " +
      trimAndUpper.apply("  hello  "));
  }
}
// Output: 5 + 3 = 8.0
// Output: 5 * 3 = 15.0
// Output: 5 ^ 3 = 125.0
// Output: 'Hello' is long: false
// Output: 'Programming' is long: true` },
        { name: 'Programming to Interfaces', codeExample: `import java.util.*;

// Best practice: Program to interface, not implementation

public class ProgramToInterfaceDemo {
  public static void main(String[] args) {
    // GOOD: Declare with interface type
    List<String> names = new ArrayList<>();
    // Easy to change implementation later:
    // List<String> names = new LinkedList<>();
    // List<String> names = new Vector<>();

    names.add("Alice");
    names.add("Bob");
    names.add("Charlie");

    // Method accepts interface, not implementation
    processNames(names);

    // Can pass any List implementation
    processNames(new LinkedList<>(names));
    processNames(Arrays.asList("Dave", "Eve"));

    // Set interface
    Set<Integer> numbers = new HashSet<>();
    numbers.add(1);
    numbers.add(2);
    numbers.add(3);

    processNumbers(numbers);

    // Map interface
    Map<String, Integer> ages = new HashMap<>();
    ages.put("Alice", 25);
    ages.put("Bob", 30);

    processAges(ages);

    // Benefits of programming to interfaces:
    // 1. Flexibility - easy to change implementation
    // 2. Testability - easy to mock
    // 3. Reduced coupling
    // 4. Code reusability
  }

  // Accept interface, not ArrayList or LinkedList
  private static void processNames(List<String> names) {
    System.out.println("\\nProcessing " + names.size() + " names:");
    for (String name : names) {
      System.out.println("  - " + name);
    }
  }

  private static void processNumbers(Set<Integer> numbers) {
    System.out.println("\\nProcessing " + numbers.size() + " numbers:");
    int sum = 0;
    for (int num : numbers) {
      sum += num;
    }
    System.out.println("Sum: " + sum);
  }

  private static void processAges(Map<String, Integer> ages) {
    System.out.println("\\nProcessing ages:");
    ages.forEach((name, age) ->
      System.out.println(name + " is " + age + " years old"));
  }

  // BAD Example (for comparison):
  // private static void processNames(ArrayList<String> names) {
  //   // Tightly coupled to ArrayList
  //   // Can't pass LinkedList or other List implementations
  // }
}
// Output: Processing 3 names:
// Output:   - Alice
// Output:   - Bob
// Output:   - Charlie` }
      ],
      description: 'Achieving polymorphic behavior through interface implementation, enabling flexible and loosely coupled designs.'
    }
  ]

  const handleComponentClick = (component) => {
    setSelectedComponent(component)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedComponent(null)
  }

  // Use refs to access current modal state in event handler
  const isModalOpenRef = useRef(isModalOpen)
  useEffect(() => {
    isModalOpenRef.current = isModalOpen
  }, [isModalOpen])

  // Set focus to first component on mount
  useEffect(() => {
    // Small delay to ensure component is fully rendered
    setTimeout(() => {
      setFocusedComponentIndex(0)
    }, 100)
  }, [])

  // Keyboard navigation for diagram components
  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentIsModalOpen = isModalOpenRef.current
      console.log(' KeyDown:', e.key, 'isModalOpen:', currentIsModalOpen)

      // Handle Escape to close modal or go back to menu
      if (e.key === 'Escape') {
        if (currentIsModalOpen) {
          e.preventDefault()
          e.stopImmediatePropagation()
          closeModal()
          return
        }
        return
      }

      // Don't handle other keys if modal is open
      if (currentIsModalOpen) return

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        setFocusedComponentIndex((prev) => (prev + 1) % components.length)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        setFocusedComponentIndex((prev) => (prev - 1 + components.length) % components.length)
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleComponentClick(components[focusedComponentIndex])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, focusedComponentIndex, components, onBack])

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '95%',
      margin: '120px auto 0',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      border: '3px solid rgba(236, 72, 153, 0.4)'
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
          Interface Design
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <div style={{
        backgroundColor: 'rgba(236, 72, 153, 0.05)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(236, 72, 153, 0.3)',
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
          Interface Design: Contract programming for behavioral specifications, dependency injection for loose coupling,
          strategy pattern for interchangeable algorithms, factory pattern for object creation,
          adapter pattern for compatibility, interface segregation principle, API design best practices,
          and polymorphism through interfaces.
        </p>
      </div>

      <ModernDiagram
        components={components}
        onComponentClick={handleComponentClick}
        title="Interface Design Patterns and Principles"
        width={1400}
        height={800}
        containerWidth={1800}
        focusedIndex={focusedComponentIndex}
      />

      {/* Modal */}
      {isModalOpen && selectedComponent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2.5rem',
            borderRadius: '16px',
            maxWidth: '1400px',
            width: '95%',
            maxHeight: '85vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '3px solid rgba(236, 72, 153, 0.4)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: '#1f2937',
                margin: 0,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                {selectedComponent.icon} {selectedComponent.title}
              </h2>
              <button
                onClick={closeModal}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{
              backgroundColor: 'rgba(236, 72, 153, 0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '2px solid rgba(236, 72, 153, 0.2)',
              marginBottom: '2rem'
            }}>
              <p style={{
                fontSize: '1.1rem',
                color: '#374151',
                fontWeight: '500',
                margin: 0,
                lineHeight: '1.6'
              }}>
                {selectedComponent.description}
              </p>
            </div>

            {/* Code Examples Section */}
            <div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                Code Examples
              </h3>
              <div style={{
                display: 'grid',
                gap: '1.5rem'
              }}>
                {selectedComponent.details.map((detail, idx) => (
                  <div key={idx}>
                    <h4 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: '#db2777',
                      marginBottom: '0.75rem'
                    }}>
                      {detail.name}
                    </h4>
                    <SyntaxHighlighter code={detail.codeExample} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Interface

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
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null|module|exports|requires|provides|uses|opens|with|to|transitive)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ArrayList|Map|HashMap|Set|HashSet|ServiceLoader|Optional|Module|ModuleDescriptor|ModuleLayer|ModuleFinder|Configuration|Path|Paths)\b/g, '<span style="color: #4ec9b0;">$1</span>')
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
                {(typeof detail === 'string' ? detail : detail.name).length > 18 ? (typeof detail === 'string' ? detail : detail.name).substring(0, 15) + '...' : (typeof detail === 'string' ? detail : detail.name)}
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

function Module({ onBack }) {
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [focusedComponentIndex, setFocusedComponentIndex] = useState(0)

  const components = [
    {
      id: 'ddd', x: 80, y: 240, width: 350, height: 160,
      icon: '🏗️', title: 'Domain-Driven Design', color: 'teal',
      details: [
        {
          name: 'Ubiquitous Language',
          codeExample: `// Ubiquitous Language Example: Domain-specific terminology
package com.banking.domain;

// Business concept: Account uses domain terms
public class BankAccount {
  private final AccountId id;
  private Money balance;
  private AccountStatus status;

  // Domain language: "deposit" not "add"
  public void deposit(Money amount) {
    if (amount.isNegative()) {
      throw new InvalidDepositException(
        "Cannot deposit negative amount");
    }
    this.balance = balance.add(amount);
  }

  // Domain language: "withdraw" not "subtract"
  public void withdraw(Money amount) {
    if (balance.isLessThan(amount)) {
      throw new InsufficientFundsException(
        "Balance: " + balance + ", Requested: " + amount);
    }
    this.balance = balance.subtract(amount);
  }

  // Domain language: "freeze" not "disable"
  public void freeze(FreezeReason reason) {
    this.status = AccountStatus.FROZEN;
    recordEvent(new AccountFrozenEvent(id, reason));
  }
}

// Output: Domain terms match business vocabulary exactly`
        },
        {
          name: 'Entities & Value Objects',
          codeExample: `// Entity: Has identity, mutable lifecycle
package com.shop.domain;

public class Order {
  private final OrderId id; // Identity
  private OrderStatus status;
  private List<OrderLine> lines;
  private Money totalAmount;

  // Entities compared by ID
  @Override
  public boolean equals(Object obj) {
    if (!(obj instanceof Order)) return false;
    Order other = (Order) obj;
    return this.id.equals(other.id);
  }

  public void addLine(Product product, int quantity) {
    lines.add(new OrderLine(product, quantity));
    recalculateTotal();
  }
}

// Value Object: No identity, immutable
public class Money {
  private final BigDecimal amount;
  private final Currency currency;

  public Money(BigDecimal amount, Currency currency) {
    this.amount = amount;
    this.currency = currency;
  }

  // Value objects compared by attributes
  @Override
  public boolean equals(Object obj) {
    if (!(obj instanceof Money)) return false;
    Money other = (Money) obj;
    return amount.equals(other.amount) &&
           currency.equals(other.currency);
  }

  public Money add(Money other) {
    validateCurrency(other);
    return new Money(amount.add(other.amount), currency);
  }
}

// Output: Entity = identity, Value Object = attributes`
        },
        {
          name: 'Aggregates',
          codeExample: `// Aggregate: Cluster with consistency boundary
package com.order.domain;

// Aggregate Root
public class Order {
  private final OrderId id;
  private CustomerId customerId;
  private List<OrderLine> lines = new ArrayList<>();
  private OrderStatus status;

  // Only root is publicly accessible
  public void addOrderLine(ProductId productId,
                          int quantity, Money price) {
    if (status != OrderStatus.DRAFT) {
      throw new IllegalStateException(
        "Cannot modify submitted order");
    }

    // Internal objects accessed through root
    OrderLine line = new OrderLine(productId, quantity, price);
    lines.add(line);

    // Aggregate enforces invariants
    if (getTotalItems() > 100) {
      throw new OrderLimitExceededException(
        "Max 100 items per order");
    }
  }

  public void submit() {
    if (lines.isEmpty()) {
      throw new EmptyOrderException();
    }
    this.status = OrderStatus.SUBMITTED;
  }

  private int getTotalItems() {
    return lines.stream()
      .mapToInt(OrderLine::getQuantity)
      .sum();
  }
}

// Internal entity, no direct repository access
class OrderLine {
  private ProductId productId;
  private int quantity;
  private Money unitPrice;
  // Only accessible through Order aggregate
}

// Output: Aggregate maintains consistency boundaries`
        },
        {
          name: 'Repositories',
          codeExample: `// Repository: Collection-like aggregate access
package com.order.domain;

// Interface in domain layer
public interface OrderRepository {
  Order findById(OrderId id);
  List<Order> findByCustomer(CustomerId customerId);
  List<Order> findPendingOrders();
  void save(Order order);
  void delete(OrderId id);
}

// Implementation in infrastructure layer
package com.order.infrastructure;

public class JpaOrderRepository implements OrderRepository {
  @PersistenceContext
  private EntityManager em;

  @Override
  public Order findById(OrderId id) {
    return em.find(OrderEntity.class, id.getValue())
             .toDomain();
  }

  @Override
  public List<Order> findByCustomer(CustomerId customerId) {
    return em.createQuery(
      "SELECT o FROM OrderEntity o " +
      "WHERE o.customerId = :customerId", OrderEntity.class)
      .setParameter("customerId", customerId.getValue())
      .getResultList()
      .stream()
      .map(OrderEntity::toDomain)
      .collect(Collectors.toList());
  }

  @Override
  public void save(Order order) {
    OrderEntity entity = OrderEntity.fromDomain(order);
    em.merge(entity);
  }
}

// Usage in application service
Order order = orderRepository.findById(orderId);
order.addOrderLine(productId, quantity, price);
orderRepository.save(order);

// Output: Domain free from persistence concerns`
        },
        {
          name: 'Domain Services',
          codeExample: `// Domain Service: Logic spanning multiple aggregates
package com.banking.domain.service;

public class MoneyTransferService {
  private final AccountRepository accountRepository;
  private final TransferPolicy transferPolicy;

  // Operation doesn't belong to single entity
  public TransferResult transfer(
      AccountId fromId,
      AccountId toId,
      Money amount) {

    // Load both aggregates
    Account fromAccount = accountRepository.findById(fromId);
    Account toAccount = accountRepository.findById(toId);

    // Apply domain rules
    if (!transferPolicy.isAllowed(fromAccount, amount)) {
      return TransferResult.rejected("Policy violation");
    }

    // Coordinate domain objects
    fromAccount.withdraw(amount);
    toAccount.deposit(amount);

    // Create domain event
    TransferCompletedEvent event =
      new TransferCompletedEvent(fromId, toId, amount);

    return TransferResult.success(event);
  }
}

// Usage
MoneyTransferService transferService =
  new MoneyTransferService(accountRepo, policy);

TransferResult result = transferService.transfer(
  AccountId.of("ACC-001"),
  AccountId.of("ACC-002"),
  Money.of(100.00, USD)
);

if (result.isSuccess()) {
  accountRepository.save(fromAccount);
  accountRepository.save(toAccount);
}

// Output: Coordinates multiple aggregates`
        },
        {
          name: 'Strategic Design',
          codeExample: `// Strategic Design: Context Mapping
package com.ecommerce;

// BOUNDED CONTEXT: Sales
module com.ecommerce.sales {
  exports com.ecommerce.sales.domain;

  // Customer in Sales context
  public class Customer {
    private CustomerId id;
    private String name;
    private PaymentMethod preferredPayment;
    private ShippingAddress defaultAddress;
  }
}

// BOUNDED CONTEXT: Support
module com.ecommerce.support {
  exports com.ecommerce.support.domain;

  // Customer in Support context (different model)
  public class Customer {
    private CustomerId id;
    private String name;
    private List<SupportTicket> tickets;
    private SupportTier tier;
    private LocalDateTime lastContactDate;
  }
}

// ANTICORRUPTION LAYER: Translate between contexts
package com.ecommerce.integration;

public class SalesCustomerAdapter {
  private final SalesCustomerService salesService;

  public support.Customer toSupportCustomer(
      sales.Customer salesCustomer) {
    // Translation prevents corruption
    return support.Customer.builder()
      .id(salesCustomer.getId())
      .name(salesCustomer.getName())
      .tier(determineSupportTier(salesCustomer))
      .build();
  }

  private SupportTier determineSupportTier(
      sales.Customer customer) {
    // Context-specific logic
    if (customer.getLifetimeValue() > 10000) {
      return SupportTier.PREMIUM;
    }
    return SupportTier.STANDARD;
  }
}

// Output: Contexts maintain independent models`
        }
      ],
      description: 'Software design approach focusing on core business domain, ubiquitous language, and collaboration between technical and domain experts.'
    },
    {
      id: 'bounded-contexts', x: 580, y: 140, width: 350, height: 160,
      icon: '🔲', title: 'Bounded Contexts', color: 'teal',
      details: [
        {
          name: 'Context Boundaries',
          codeExample: `// Context Boundaries: Different models in different contexts
// SALES CONTEXT
module com.company.sales {
  exports com.company.sales.api;

  public class Customer {
    private CustomerId id;
    private String fullName;
    private CreditLimit creditLimit;
    private List<Order> orders;
    private PaymentTerms paymentTerms;

    public boolean canPlaceOrder(Money orderValue) {
      return creditLimit.allows(orderValue);
    }

    public void recordOrder(Order order) {
      orders.add(order);
    }
  }

  public class Order {
    private OrderId id;
    private Money totalValue;
    private OrderStatus status;
  }
}

// SUPPORT CONTEXT (different Customer model!)
module com.company.support {
  exports com.company.support.api;

  public class Customer {
    private CustomerId id; // Same ID type
    private String displayName;
    private SupportTier tier;
    private List<Ticket> tickets;
    private int satisfactionScore;

    public void openTicket(String issue) {
      Ticket ticket = new Ticket(issue, tier);
      tickets.add(ticket);
    }

    public ResponseTime getExpectedResponseTime() {
      return tier.getResponseTime();
    }
  }

  public class Ticket {
    private TicketId id;
    private String description;
    private TicketPriority priority;
  }
}

// Output: Same concept, different attributes per context`
        },
        {
          name: 'Context Mapping',
          codeExample: `// Context Mapping: Relationship patterns
// UPSTREAM CONTEXT: Product Catalog
module com.shop.catalog {
  exports com.shop.catalog.api;

  public class Product {
    private ProductId id;
    private String name;
    private ProductSpecification spec;

    public ProductPublished asPublished() {
      return new ProductPublished(id, name, spec);
    }
  }
}

// DOWNSTREAM CONTEXT: Shopping Cart (Conformist)
module com.shop.cart {
  requires com.shop.catalog;

  public class CartItem {
    // Conforms to upstream Product model
    private ProductId productId;
    private int quantity;

    public CartItem(ProductPublished product, int qty) {
      this.productId = product.getId();
      this.quantity = qty;
    }
  }
}

// DOWNSTREAM CONTEXT: Recommendations (Anticorruption)
module com.shop.recommendations {
  requires com.shop.catalog;

  // Anticorruption Layer: translate to own model
  public class RecommendationAdapter {
    public RecommendedItem adapt(ProductPublished product) {
      // Translate to internal model
      return RecommendedItem.builder()
        .externalId(product.getId().toString())
        .title(product.getName())
        .relevanceScore(0.0)
        .build();
    }
  }

  // Internal model protected from upstream changes
  public class RecommendedItem {
    private String externalId;
    private String title;
    private double relevanceScore;
  }
}

// Output: Different integration patterns per relationship`
        },
        {
          name: 'Model Integrity',
          codeExample: `// Model Integrity: Maintain consistency within context
module com.shipping.domain {
  // Internal model: optimized for shipping operations
  public class ShipmentPackage {
    private PackageId id;
    private Weight weight;
    private Dimensions dimensions;
    private Address destination;
    private List<PackageItem> items;

    // Invariant: total item weight matches package weight
    public void addItem(PackageItem item) {
      items.add(item);
      validateWeight();
    }

    private void validateWeight() {
      Weight itemsWeight = items.stream()
        .map(PackageItem::getWeight)
        .reduce(Weight.ZERO, Weight::add);

      if (!weight.equals(itemsWeight)) {
        throw new WeightMismatchException(
          "Package weight must match items: " +
          "expected=" + itemsWeight +
          ", actual=" + weight);
      }
    }
  }

  // Translation at boundary: external order to internal package
  public class OrderToShipmentAdapter {
    public ShipmentPackage fromOrder(ExternalOrder order) {
      // Don't let external model corrupt internal model
      ShipmentPackage pkg = new ShipmentPackage();
      pkg.setDestination(
        addressMapper.toShippingAddress(
          order.getDeliveryAddress()));

      // Map only relevant data
      for (ExternalOrderLine line : order.getLines()) {
        PackageItem item = new PackageItem(
          line.getProductId(),
          calculateWeight(line)
        );
        pkg.addItem(item);
      }

      return pkg; // Internal consistency maintained
    }
  }
}

// Output: Context maintains its own consistency rules`
        },
        {
          name: 'Team Organization',
          codeExample: `// Team Organization: Conway's Law in action
// TEAM: Sales (owns Sales context)
module com.company.sales {
  exports com.company.sales.api;
  // Independent deployment, database, team

  public class SalesService {
    private final SalesRepository repo;

    public OrderConfirmation placeOrder(
        CustomerId customer, OrderRequest request) {
      // Team controls entire flow
      Customer cust = repo.findCustomer(customer);
      Order order = cust.createOrder(request);
      repo.saveOrder(order);

      // Publish event for other contexts
      eventBus.publish(
        new OrderPlacedEvent(order.getId()));

      return OrderConfirmation.of(order);
    }
  }
}

// TEAM: Fulfillment (owns Fulfillment context)
module com.company.fulfillment {
  // Different team, database, deployment schedule

  @EventListener
  public class OrderPlacedHandler {
    // Reacts to Sales context events
    public void handle(OrderPlacedEvent event) {
      // Autonomous decision making
      OrderId orderId = event.getOrderId();

      // Query Sales API if needed
      OrderDetails details = salesApi.getOrder(orderId);

      // Create fulfillment in own model
      Fulfillment fulfillment =
        Fulfillment.createFrom(orderId, details);

      fulfillmentRepo.save(fulfillment);
    }
  }
}

// TEAM: Shipping (owns Shipping context)
module com.company.shipping {
  // Third team, completely independent
  // Each team owns their bounded context
}

// Output: Team boundaries align with context boundaries`
        },
        {
          name: 'Integration Patterns',
          codeExample: `// Integration Patterns: Connecting bounded contexts
// PATTERN 1: Event-based integration
module com.payment.domain {
  public class PaymentService {
    public void processPayment(PaymentRequest request) {
      Payment payment = Payment.create(request);
      paymentRepo.save(payment);

      // Async event for other contexts
      eventBus.publish(new PaymentCompletedEvent(
        payment.getId(),
        payment.getOrderId(),
        payment.getAmount()
      ));
    }
  }
}

module com.order.domain {
  @EventListener
  public class PaymentCompletedHandler {
    public void handle(PaymentCompletedEvent event) {
      Order order = orderRepo.find(event.getOrderId());
      order.markAsPaid();
      orderRepo.save(order);
    }
  }
}

// PATTERN 2: REST API integration
module com.inventory.api {
  @RestController
  public class InventoryController {
    @GetMapping("/inventory/{productId}")
    public InventoryLevel check(
        @PathVariable ProductId productId) {
      return inventoryService.getLevel(productId);
    }
  }
}

module com.order.domain {
  public class OrderService {
    private final InventoryApiClient inventoryApi;

    public void validateOrder(Order order) {
      for (OrderLine line : order.getLines()) {
        // Sync call across context boundary
        InventoryLevel level =
          inventoryApi.check(line.getProductId());

        if (level.getQuantity() < line.getQuantity()) {
          throw new InsufficientInventoryException();
        }
      }
    }
  }
}

// Output: Events for async, APIs for sync integration`
        },
        {
          name: 'Context Size',
          codeExample: `// Context Size: Right-sized boundaries
// TOO SMALL: Over-fragmented
module com.order.header { } // Just order header
module com.order.lines { }  // Just order lines
module com.order.totals { } // Just totals
// Problem: Too chatty, excessive coordination

// TOO LARGE: Monolithic context
module com.entire.ecommerce {
  // Contains: products, orders, customers, inventory,
  // shipping, payments, recommendations, etc.
  // Problem: Model too complex, team too large
}

// RIGHT SIZE: Cohesive business capability
module com.order.management {
  exports com.order.management.api;

  // Complete order lifecycle in one context
  public class OrderService {
    public Order createOrder(OrderRequest request) {
      // Order creation logic
    }

    public void updateOrder(OrderId id, OrderUpdate update) {
      // Order modification logic
    }

    public void cancelOrder(OrderId id) {
      // Order cancellation logic
    }

    public OrderStatus getStatus(OrderId id) {
      // Order status query
    }
  }

  // Cohesive domain concepts
  class Order { }
  class OrderLine { }
  class OrderStatus { }

  // Natural team size: 3-9 developers
  // Can be understood by one team
  // Based on business capability
}

// GUIDELINE: If explaining context takes >30 minutes,
// it's probably too large. If it's just CRUD on one
// entity, it's probably too small.

// Output: Context sized by business capability`
        }
      ],
      description: 'Explicit boundaries within domain where specific model terms and rules apply, enabling large models to be divided into manageable parts.'
    },
    {
      id: 'microservices', x: 580, y: 340, width: 350, height: 160,
      icon: '🔷', title: 'Microservices Patterns', color: 'teal',
      details: [
        {
          name: 'Service Independence',
          codeExample: `// Service Independence: Each service owns its data
// ORDER SERVICE (independent deployment)
module com.shop.order.service {
  requires spring.boot;
  requires spring.data.jpa;

  @SpringBootApplication
  public class OrderServiceApplication {
    public static void main(String[] args) {
      SpringApplication.run(OrderServiceApplication.class, args);
    }
  }

  @RestController
  public class OrderController {
    private final OrderRepository orderRepo;

    @PostMapping("/orders")
    public OrderResponse createOrder(
        @RequestBody OrderRequest request) {
      Order order = Order.from(request);
      orderRepo.save(order);
      return OrderResponse.from(order);
    }
  }

  // Own database schema
  @Entity
  public class Order {
    @Id private UUID id;
    private UUID customerId;
    private BigDecimal totalAmount;
    private OrderStatus status;
  }
}

// INVENTORY SERVICE (separate deployment, database)
module com.shop.inventory.service {
  requires spring.boot;
  requires spring.data.mongodb;

  @SpringBootApplication
  public class InventoryServiceApplication {
    // Different technology stack allowed
  }

  @RestController
  public class InventoryController {
    private final InventoryRepository repo;

    @GetMapping("/inventory/{productId}")
    public InventoryLevel check(
        @PathVariable String productId) {
      return repo.findByProductId(productId)
        .map(Inventory::getLevel)
        .orElse(InventoryLevel.OUT_OF_STOCK);
    }
  }

  // MongoDB document (different from Order SQL)
  @Document(collection = "inventory")
  public class Inventory {
    private String productId;
    private int availableQuantity;
    private int reservedQuantity;
  }
}

// Output: Complete service independence`
        },
        {
          name: 'Communication Patterns',
          codeExample: `// Communication Patterns: Sync and Async
// SYNCHRONOUS: REST call with circuit breaker
import io.github.resilience4j.circuitbreaker.annotation.*;

@Service
public class OrderService {
  private final InventoryClient inventoryClient;

  @CircuitBreaker(name = "inventory",
    fallbackMethod = "createOrderFallback")
  public Order createOrder(OrderRequest request) {
    // Sync REST call
    InventoryLevel level = inventoryClient
      .checkInventory(request.getProductId());

    if (!level.isAvailable(request.getQuantity())) {
      throw new OutOfStockException();
    }

    Order order = Order.create(request);
    orderRepo.save(order);
    return order;
  }

  // Fallback method
  private Order createOrderFallback(OrderRequest request,
      Exception ex) {
    // Degrade gracefully
    return Order.createPending(request);
  }
}

// ASYNCHRONOUS: Event-driven messaging
import org.springframework.kafka.core.KafkaTemplate;

@Service
public class PaymentService {
  private final KafkaTemplate<String, PaymentEvent> kafka;

  public void processPayment(PaymentRequest request) {
    Payment payment = Payment.process(request);
    paymentRepo.save(payment);

    // Publish event asynchronously
    PaymentCompletedEvent event =
      new PaymentCompletedEvent(
        payment.getId(),
        payment.getOrderId(),
        payment.getAmount()
      );

    kafka.send("payment-completed", event);
  }
}

@KafkaListener(topics = "payment-completed")
public void handlePaymentCompleted(
    PaymentCompletedEvent event) {
  Order order = orderRepo.find(event.getOrderId());
  order.markAsPaid();
  orderRepo.save(order);
}

// Output: Resilient synchronous and async communication`
        },
        {
          name: 'Data Management',
          codeExample: `// Data Management: Database per service
// ORDER SERVICE: PostgreSQL
@Configuration
public class OrderDataConfig {
  @Bean
  public DataSource orderDataSource() {
    return DataSourceBuilder.create()
      .url("jdbc:postgresql://order-db:5432/orders")
      .username("order_service")
      .build();
  }
}

@Entity
@Table(name = "orders")
public class Order {
  @Id private UUID id;
  private UUID customerId;
  private OrderStatus status;

  // No direct foreign key to other services!
  // Just store customer ID, not customer entity
}

// CUSTOMER SERVICE: MySQL (different database!)
@Configuration
public class CustomerDataConfig {
  @Bean
  public DataSource customerDataSource() {
    return DataSourceBuilder.create()
      .url("jdbc:mysql://customer-db:3306/customers")
      .username("customer_service")
      .build();
  }
}

@Entity
@Table(name = "customers")
public class Customer {
  @Id private UUID id;
  private String name;
  private String email;
}

// DATA CONSISTENCY: Eventual consistency via events
@Service
public class CustomerEventHandler {
  @KafkaListener(topics = "customer-updated")
  public void handleCustomerUpdated(
      CustomerUpdatedEvent event) {
    // Update denormalized data in order service
    List<Order> orders =
      orderRepo.findByCustomerId(event.getCustomerId());

    orders.forEach(order ->
      order.updateCustomerSnapshot(
        event.getCustomerName(),
        event.getCustomerEmail()
      )
    );

    orderRepo.saveAll(orders);
  }
}

// Output: No shared database, eventual consistency`
        },
        {
          name: 'Service Discovery',
          codeExample: `// Service Discovery: Dynamic service location
// EUREKA SERVICE REGISTRY
@SpringBootApplication
@EnableEurekaServer
public class ServiceRegistryApplication {
  public static void main(String[] args) {
    SpringApplication.run(
      ServiceRegistryApplication.class, args);
  }
}

// ORDER SERVICE: Register with Eureka
@SpringBootApplication
@EnableDiscoveryClient
public class OrderServiceApplication {
  // application.yml:
  // spring:
  //   application:
  //     name: order-service
  // eureka:
  //   client:
  //     service-url:
  //       defaultZone: http://eureka:8761/eureka
  //   instance:
  //     prefer-ip-address: true
}

// INVENTORY CLIENT: Discover services dynamically
@FeignClient(name = "inventory-service")
public interface InventoryClient {
  @GetMapping("/inventory/{productId}")
  InventoryLevel checkInventory(
    @PathVariable String productId);
}

@Service
public class OrderService {
  // Feign + Eureka: No hardcoded URLs!
  private final InventoryClient inventoryClient;

  public Order createOrder(OrderRequest request) {
    // Feign resolves "inventory-service" via Eureka
    // Load balancing across multiple instances
    InventoryLevel level = inventoryClient
      .checkInventory(request.getProductId());

    if (level.isAvailable(request.getQuantity())) {
      return Order.create(request);
    }
    throw new OutOfStockException();
  }
}

// HEALTH CHECKS
@RestController
public class HealthController {
  @GetMapping("/health")
  public ResponseEntity<HealthStatus> health() {
    return ResponseEntity.ok(
      new HealthStatus("UP", Instant.now()));
  }
}

// Output: Dynamic service discovery with load balancing`
        },
        {
          name: 'API Gateway',
          codeExample: `// API Gateway: Single entry point
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.*;

@Configuration
public class GatewayConfig {
  @Bean
  public RouteLocator customRoutes(
      RouteLocatorBuilder builder) {
    return builder.routes()
      // Route to Order Service
      .route("orders", r -> r.path("/api/orders/**")
        .filters(f -> f
          .stripPrefix(1)
          .addRequestHeader("X-Gateway", "true")
          .circuitBreaker(c -> c
            .setName("orderCB")
            .setFallbackUri("/fallback/orders")))
        .uri("lb://order-service"))

      // Route to Inventory Service
      .route("inventory", r -> r.path("/api/inventory/**")
        .filters(f -> f
          .stripPrefix(1)
          .rewritePath("/api/inventory/(?<segment>.*)",
                      "/inventory/${segment}"))
        .uri("lb://inventory-service"))

      // Route to Payment Service with rate limiting
      .route("payments", r -> r.path("/api/payments/**")
        .filters(f -> f
          .stripPrefix(1)
          .requestRateLimiter(rl -> rl
            .setRateLimiter(redisRateLimiter())))
        .uri("lb://payment-service"))

      .build();
  }

  // Authentication filter
  @Component
  public class AuthenticationFilter
      implements GlobalFilter {
    @Override
    public Mono<Void> filter(
        ServerWebExchange exchange,
        GatewayFilterChain chain) {
      String token = exchange.getRequest()
        .getHeaders().getFirst("Authorization");

      if (token == null || !isValid(token)) {
        exchange.getResponse()
          .setStatusCode(HttpStatus.UNAUTHORIZED);
        return exchange.getResponse().setComplete();
      }

      return chain.filter(exchange);
    }
  }
}

// Output: Centralized routing, auth, rate limiting`
        },
        {
          name: 'Deployment & Scaling',
          codeExample: `// Deployment & Scaling: Kubernetes
// ORDER SERVICE DEPLOYMENT
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
spec:
  replicas: 3  # Horizontal scaling
  selector:
    matchLabels:
      app: order-service
  template:
    metadata:
      labels:
        app: order-service
        version: v1.2.0
    spec:
      containers:
      - name: order-service
        image: company/order-service:1.2.0
        ports:
        - containerPort: 8080
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: production
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /actuator/health
            port: 8080
          initialDelaySeconds: 30
        readinessProbe:
          httpGet:
            path: /actuator/ready
            port: 8080

---
// HORIZONTAL POD AUTOSCALER
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: order-service-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: order-service
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70

// Output: Auto-scaling microservices deployment
// kubectl apply -f order-service.yaml
// kubectl scale deployment order-service --replicas=5`
        }
      ],
      description: 'Architectural style structuring applications as collection of loosely coupled, independently deployable services.'
    },
    {
      id: 'event-sourcing', x: 80, y: 440, width: 350, height: 160,
      icon: '📜', title: 'Event Sourcing', color: 'teal',
      details: [
        {
          name: 'Event Store',
          codeExample: `// Event Store: Append-only event log
package com.bank.eventsourcing;

// Domain Event
public abstract class DomainEvent {
  private final UUID eventId;
  private final UUID aggregateId;
  private final long version;
  private final Instant timestamp;

  // Events are immutable
  protected DomainEvent(UUID aggregateId, long version) {
    this.eventId = UUID.randomUUID();
    this.aggregateId = aggregateId;
    this.version = version;
    this.timestamp = Instant.now();
  }
}

public class MoneyDepositedEvent extends DomainEvent {
  private final BigDecimal amount;
  private final String description;

  public MoneyDepositedEvent(UUID accountId,
      long version, BigDecimal amount, String desc) {
    super(accountId, version);
    this.amount = amount;
    this.description = desc;
  }
}

// Event Store Interface
public interface EventStore {
  void append(UUID aggregateId, List<DomainEvent> events);
  List<DomainEvent> getEvents(UUID aggregateId);
  List<DomainEvent> getEvents(UUID aggregateId,
    long fromVersion);
}

// Event Store Implementation
@Repository
public class JdbcEventStore implements EventStore {
  @Override
  public void append(UUID aggregateId,
      List<DomainEvent> events) {
    for (DomainEvent event : events) {
      String sql = "INSERT INTO event_store " +
        "(event_id, aggregate_id, event_type, " +
        " event_data, version, timestamp) " +
        "VALUES (?, ?, ?, ?, ?, ?)";

      jdbc.update(sql,
        event.getEventId(),
        aggregateId,
        event.getClass().getSimpleName(),
        serialize(event),
        event.getVersion(),
        event.getTimestamp()
      );
    }
  }

  @Override
  public List<DomainEvent> getEvents(UUID aggregateId) {
    String sql = "SELECT * FROM event_store " +
      "WHERE aggregate_id = ? ORDER BY version";
    return jdbc.query(sql, this::mapEvent, aggregateId);
  }
}

// Output: Complete immutable audit trail`
        },
        {
          name: 'Event Replay',
          codeExample: `// Event Replay: Rebuild state from events
public class BankAccount {
  private UUID id;
  private BigDecimal balance;
  private AccountStatus status;
  private long version;

  // Load aggregate by replaying events
  public static BankAccount loadFromEvents(
      UUID accountId, EventStore store) {
    List<DomainEvent> events = store.getEvents(accountId);

    BankAccount account = new BankAccount(accountId);
    for (DomainEvent event : events) {
      account.apply(event);
    }
    return account;
  }

  // Apply event to rebuild state
  private void apply(DomainEvent event) {
    if (event instanceof AccountOpenedEvent) {
      AccountOpenedEvent e = (AccountOpenedEvent) event;
      this.id = e.getAggregateId();
      this.balance = e.getInitialDeposit();
      this.status = AccountStatus.ACTIVE;
    }
    else if (event instanceof MoneyDepositedEvent) {
      MoneyDepositedEvent e = (MoneyDepositedEvent) event;
      this.balance = balance.add(e.getAmount());
    }
    else if (event instanceof MoneyWithdrawnEvent) {
      MoneyWithdrawnEvent e = (MoneyWithdrawnEvent) event;
      this.balance = balance.subtract(e.getAmount());
    }
    else if (event instanceof AccountFrozenEvent) {
      this.status = AccountStatus.FROZEN;
    }

    this.version = event.getVersion();
  }

  // Time travel: state at specific point in time
  public static BankAccount loadAtTime(UUID accountId,
      Instant timestamp, EventStore store) {
    List<DomainEvent> events = store.getEvents(accountId)
      .stream()
      .filter(e -> e.getTimestamp().isBefore(timestamp))
      .collect(Collectors.toList());

    BankAccount account = new BankAccount(accountId);
    events.forEach(account::apply);
    return account;
  }
}

// Usage: Debug what balance was at specific time
BankAccount historicalState = BankAccount.loadAtTime(
  accountId,
  Instant.parse("2024-01-15T10:00:00Z"),
  eventStore
);

// Output: Time travel debugging and state reconstruction`
        },
        {
          name: 'Domain Events',
          codeExample: `// Domain Events: Business-meaningful occurrences
package com.ecommerce.events;

// Past tense naming convention
public class OrderPlacedEvent extends DomainEvent {
  private final OrderId orderId;
  private final CustomerId customerId;
  private final List<OrderLineItem> items;
  private final Money totalAmount;
  private final ShippingAddress address;

  public OrderPlacedEvent(OrderId orderId,
      CustomerId customerId, List<OrderLineItem> items,
      Money totalAmount, ShippingAddress address) {
    super(orderId.getValue(), 1);
    this.orderId = orderId;
    this.customerId = customerId;
    this.items = items;
    this.totalAmount = totalAmount;
    this.address = address;
  }
}

public class PaymentReceivedEvent extends DomainEvent {
  private final PaymentId paymentId;
  private final OrderId orderId;
  private final Money amount;
  private final PaymentMethod method;

  // Rich with business information
  public PaymentReceivedEvent(PaymentId paymentId,
      OrderId orderId, Money amount, PaymentMethod method) {
    super(orderId.getValue(), 2);
    this.paymentId = paymentId;
    this.orderId = orderId;
    this.amount = amount;
    this.method = method;
  }
}

public class ItemShippedEvent extends DomainEvent {
  private final ShipmentId shipmentId;
  private final OrderId orderId;
  private final TrackingNumber trackingNumber;
  private final Carrier carrier;
  private final Instant shippedAt;

  // Captures business intent
  public ItemShippedEvent(ShipmentId shipmentId,
      OrderId orderId, TrackingNumber trackingNumber,
      Carrier carrier) {
    super(orderId.getValue(), 3);
    this.shipmentId = shipmentId;
    this.orderId = orderId;
    this.trackingNumber = trackingNumber;
    this.carrier = carrier;
    this.shippedAt = Instant.now();
  }
}

// Events published to event bus
@Service
public class EventPublisher {
  private final ApplicationEventPublisher publisher;

  public void publish(DomainEvent event) {
    publisher.publishEvent(event);
  }
}

// Multiple subscribers
@EventListener
public void handleOrderPlaced(OrderPlacedEvent event) {
  // Inventory reservation
}

@EventListener
public void handleOrderPlaced(OrderPlacedEvent event) {
  // Send confirmation email
}

// Output: Business events with multiple subscribers`
        },
        {
          name: 'Snapshots',
          codeExample: `// Snapshots: Performance optimization
@Entity
@Table(name = "account_snapshots")
public class AccountSnapshot {
  @Id private UUID accountId;
  private BigDecimal balance;
  private String status;
  private long version;
  private Instant snapshotAt;

  // Snapshot every N events
  private static final int SNAPSHOT_FREQUENCY = 100;
}

public class SnapshotEventStore implements EventStore {
  private final EventStore eventStore;
  private final SnapshotRepository snapshotRepo;

  public BankAccount load(UUID accountId) {
    // Try to load latest snapshot
    Optional<AccountSnapshot> snapshot =
      snapshotRepo.findLatest(accountId);

    BankAccount account;
    long fromVersion;

    if (snapshot.isPresent()) {
      // Start from snapshot
      account = BankAccount.fromSnapshot(snapshot.get());
      fromVersion = snapshot.get().getVersion() + 1;
    } else {
      // No snapshot, start from beginning
      account = new BankAccount(accountId);
      fromVersion = 0;
    }

    // Apply only events after snapshot
    List<DomainEvent> events =
      eventStore.getEvents(accountId, fromVersion);

    for (DomainEvent event : events) {
      account.apply(event);
    }

    return account;
  }

  public void save(BankAccount account) {
    List<DomainEvent> uncommittedEvents =
      account.getUncommittedEvents();

    eventStore.append(account.getId(), uncommittedEvents);

    // Create snapshot if threshold reached
    if (account.getVersion() % SNAPSHOT_FREQUENCY == 0) {
      AccountSnapshot snapshot =
        AccountSnapshot.from(account);
      snapshotRepo.save(snapshot);
    }
  }
}

// Performance comparison:
// Without snapshot: Replay 10,000 events = 500ms
// With snapshot:    Replay 100 events    = 5ms

// Output: Fast aggregate loading via snapshots`
        },
        {
          name: 'Event Versioning',
          codeExample: `// Event Versioning: Handle evolving events
// Version 1: Original event
public class OrderPlacedEventV1 extends DomainEvent {
  private String customerId;
  private List<String> productIds;
  private double totalAmount;
}

// Version 2: Enhanced event
public class OrderPlacedEventV2 extends DomainEvent {
  private UUID customerId;  // Changed type
  private List<OrderLine> items;  // More detail
  private Money totalAmount;  // Value object
  private ShippingAddress address;  // New field
}

// Event Upcaster
public interface EventUpcaster {
  DomainEvent upcast(DomainEvent event);
  boolean supports(Class<?> eventClass);
}

public class OrderPlacedUpcaster implements EventUpcaster {
  @Override
  public DomainEvent upcast(DomainEvent event) {
    if (event instanceof OrderPlacedEventV1) {
      OrderPlacedEventV1 v1 =
        (OrderPlacedEventV1) event;

      // Transform V1 to V2
      return new OrderPlacedEventV2(
        UUID.fromString(v1.getCustomerId()),
        convertToOrderLines(v1.getProductIds()),
        Money.of(v1.getTotalAmount(), USD),
        ShippingAddress.unknown()  // Default value
      );
    }
    return event;
  }

  @Override
  public boolean supports(Class<?> eventClass) {
    return OrderPlacedEventV1.class.equals(eventClass);
  }
}

// Event Store with Upcasting
public class UpcastingEventStore implements EventStore {
  private final List<EventUpcaster> upcasters;

  @Override
  public List<DomainEvent> getEvents(UUID aggregateId) {
    List<DomainEvent> rawEvents =
      eventStore.getEvents(aggregateId);

    return rawEvents.stream()
      .map(this::upcastIfNeeded)
      .collect(Collectors.toList());
  }

  private DomainEvent upcastIfNeeded(DomainEvent event) {
    for (EventUpcaster upcaster : upcasters) {
      if (upcaster.supports(event.getClass())) {
        return upcaster.upcast(event);
      }
    }
    return event;
  }
}

// Output: Backward compatible event evolution`
        },
        {
          name: 'Benefits & Trade-offs',
          codeExample: `// Benefits & Trade-offs of Event Sourcing
// BENEFIT 1: Complete Audit Trail
public class AuditService {
  public List<AuditEntry> getAccountHistory(
      UUID accountId) {
    return eventStore.getEvents(accountId).stream()
      .map(event -> new AuditEntry(
        event.getTimestamp(),
        event.getClass().getSimpleName(),
        event.toString()
      ))
      .collect(Collectors.toList());
  }

  // Output: Who, what, when for compliance
  // 2024-01-15 10:00:00 - AccountOpenedEvent
  // 2024-01-15 10:15:23 - MoneyDepositedEvent
  // 2024-01-15 11:30:45 - MoneyWithdrawnEvent
}

// BENEFIT 2: Temporal Queries
public class TemporalQueryService {
  public BigDecimal getBalanceAt(UUID accountId,
      Instant timestamp) {
    return BankAccount
      .loadAtTime(accountId, timestamp, eventStore)
      .getBalance();
  }

  // What was the balance on 2024-01-15?
  BigDecimal balance = service.getBalanceAt(
    accountId,
    Instant.parse("2024-01-15T23:59:59Z")
  );
}

// TRADE-OFF 1: Query Complexity
// Problem: Can't easily query "all accounts with
// balance > $1000" without replaying all events

// Solution: CQRS with read models
@EventListener
public void project(MoneyDepositedEvent event) {
  AccountBalance projection =
    projectionRepo.find(event.getAggregateId());
  projection.add(event.getAmount());
  projectionRepo.save(projection);
}

// TRADE-OFF 2: Eventual Consistency
// Events processed asynchronously
// Read model may lag behind write model

// TRADE-OFF 3: Complexity
// More moving parts than CRUD
// Requires event versioning strategy
// Snapshot management
// Event store infrastructure

// Recommendation: Use event sourcing when:
// - Audit trail is critical (finance, healthcare)
// - Temporal queries needed
// - Complex business logic
// NOT suitable for: Simple CRUD, reporting-heavy

// Output: Powerful but complex pattern`
        }
      ],
      description: 'Persistence pattern storing all changes to application state as sequence of immutable events rather than current state.'
    },
    {
      id: 'cqrs', x: 580, y: 540, width: 350, height: 160,
      icon: '⚡', title: 'CQRS Pattern', color: 'teal',
      details: [
        {
          name: 'Command-Query Separation',
          explanation: 'Commands: change state, return void/ack. Queries: return data, don\'t change state. Separate models for writes and reads. Different optimization strategies. Clear intent. Avoid side effects in queries.',
          codeExample: `// Command-Query Separation: Different models
package com.order.cqrs;

// COMMAND SIDE: Write operations
public interface OrderCommands {
  void createOrder(CreateOrderCommand cmd);
  void updateOrder(UpdateOrderCommand cmd);
  void cancelOrder(CancelOrderCommand cmd);
}

public class CreateOrderCommand {
  private final UUID orderId;
  private final UUID customerId;
  private final List<OrderLineItem> items;

  // Commands contain intent
  public CreateOrderCommand(UUID orderId,
      UUID customerId, List<OrderLineItem> items) {
    this.orderId = orderId;
    this.customerId = customerId;
    this.items = items;
  }
}

@Service
public class OrderCommandHandler implements OrderCommands {
  private final OrderRepository writeRepository;
  private final EventPublisher eventPublisher;

  @Override
  @Transactional
  public void createOrder(CreateOrderCommand cmd) {
    // Validate and apply business rules
    Order order = Order.create(
      cmd.getOrderId(),
      cmd.getCustomerId(),
      cmd.getItems()
    );

    writeRepository.save(order);

    // Publish event for read side
    eventPublisher.publish(
      new OrderCreatedEvent(order.getId(), order.getDetails())
    );
  }
}

// QUERY SIDE: Read operations
public interface OrderQueries {
  OrderSummary getOrderSummary(UUID orderId);
  List<OrderSummary> getCustomerOrders(UUID customerId);
  OrderStatistics getStatistics();
}

@Service
public class OrderQueryHandler implements OrderQueries {
  private final OrderReadRepository readRepository;

  @Override
  public OrderSummary getOrderSummary(UUID orderId) {
    // Query optimized read model
    return readRepository.findSummaryById(orderId)
      .orElseThrow(() -> new OrderNotFoundException(orderId));
  }

  @Override
  public List<OrderSummary> getCustomerOrders(
      UUID customerId) {
    // Denormalized view for performance
    return readRepository.findByCustomerId(customerId);
  }
}

// Output: Clear separation between writes and reads`
        },
        {
          name: 'Write Model',
          explanation: 'Optimized for consistency and business logic. Normalized schema. Enforces business rules and invariants. Handles commands. Publishes events. Domain-driven design aggregates. Transactional consistency.',
          codeExample: `// Write Model: Optimized for consistency
package com.order.write;

// Write-side aggregate: normalized, transactional
@Entity
@Table(name = "orders")
public class Order {
  @Id
  private UUID id;

  @Column(nullable = false)
  private UUID customerId;

  @OneToMany(cascade = CascadeType.ALL,
             orphanRemoval = true)
  private List<OrderLine> orderLines = new ArrayList<>();

  @Enumerated(EnumType.STRING)
  private OrderStatus status;

  @Column(nullable = false)
  private BigDecimal totalAmount;

  // Business invariants enforced
  public void addOrderLine(Product product, int quantity) {
    if (status != OrderStatus.DRAFT) {
      throw new IllegalStateException(
        "Cannot modify submitted order");
    }

    if (quantity <= 0) {
      throw new IllegalArgumentException(
        "Quantity must be positive");
    }

    OrderLine line = new OrderLine(
      product.getId(),
      product.getName(),
      product.getPrice(),
      quantity
    );

    orderLines.add(line);
    recalculateTotalAmount();
  }

  public void submit() {
    if (orderLines.isEmpty()) {
      throw new IllegalStateException(
        "Cannot submit empty order");
    }

    if (totalAmount.compareTo(BigDecimal.ZERO) <= 0) {
      throw new IllegalStateException(
        "Invalid order total");
    }

    this.status = OrderStatus.SUBMITTED;
  }

  private void recalculateTotalAmount() {
    this.totalAmount = orderLines.stream()
      .map(line -> line.getPrice()
        .multiply(BigDecimal.valueOf(line.getQuantity())))
      .reduce(BigDecimal.ZERO, BigDecimal::add);
  }
}

// Write repository: transactional operations
public interface OrderWriteRepository
    extends JpaRepository<Order, UUID> {

  @Lock(LockModeType.PESSIMISTIC_WRITE)
  Optional<Order> findByIdForUpdate(UUID id);
}

// Output: Strong consistency, business rules enforced`
        },
        {
          name: 'Read Model',
          explanation: 'Optimized for query performance. Denormalized views. Eventually consistent. Multiple read models possible. Tailored to UI needs. No business logic. Fast queries. Can use different database technology.',
          codeExample: `// Read Model: Optimized for queries
package com.order.read;

// Read-side projection: denormalized for speed
@Document(collection = "order_summaries")
public class OrderSummary {
  @Id
  private String id;
  private String orderId;
  private String customerId;
  private String customerName;
  private String customerEmail;
  private List<OrderLineView> items;
  private BigDecimal totalAmount;
  private String status;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  // No business logic, just data transfer
  // All data needed by UI in one document
}

// Different read model for different view
@Document(collection = "customer_order_history")
public class CustomerOrderHistory {
  @Id
  private String customerId;
  private String customerName;
  private int totalOrders;
  private BigDecimal lifetimeValue;
  private List<OrderHistoryItem> recentOrders;
  private LocalDateTime lastOrderDate;
}

// Read repository: query-optimized
@Repository
public interface OrderReadRepository
    extends MongoRepository<OrderSummary, String> {

  // Fast queries on denormalized data
  List<OrderSummary> findByCustomerId(String customerId);

  List<OrderSummary> findByStatusOrderByCreatedAtDesc(
    String status, Pageable pageable);

  @Query("{ 'totalAmount': { $gte: ?0 } }")
  List<OrderSummary> findHighValueOrders(
    BigDecimal minAmount);
}

// Projection handler: build read models from events
@Service
public class OrderProjectionHandler {
  private final OrderReadRepository repository;

  @EventListener
  public void on(OrderCreatedEvent event) {
    OrderSummary summary = new OrderSummary();
    summary.setOrderId(event.getOrderId().toString());
    summary.setCustomerId(event.getCustomerId().toString());
    summary.setItems(event.getItems());
    summary.setTotalAmount(event.getTotalAmount());
    summary.setStatus("CREATED");
    summary.setCreatedAt(event.getTimestamp());

    repository.save(summary);
  }

  @EventListener
  public void on(OrderSubmittedEvent event) {
    OrderSummary summary = repository
      .findById(event.getOrderId().toString())
      .orElseThrow();

    summary.setStatus("SUBMITTED");
    summary.setUpdatedAt(event.getTimestamp());

    repository.save(summary);
  }
}

// Output: Fast queries, eventual consistency`
        },
        {
          name: 'Event-Based Sync',
          explanation: 'Write model publishes events. Read model subscribes and updates. Asynchronous synchronization. Eventual consistency. Replay events to rebuild read models. Projections from events. Multiple projections for different views.',
          codeExample: `// Event-Based Sync: Write to read propagation
package com.order.sync;

// Write side publishes events
@Service
public class OrderService {
  private final OrderRepository writeRepo;
  private final EventPublisher eventPublisher;

  @Transactional
  public void createOrder(CreateOrderCommand cmd) {
    Order order = Order.create(cmd);
    writeRepo.save(order);

    // Publish event after successful write
    OrderCreatedEvent event = new OrderCreatedEvent(
      order.getId(),
      order.getCustomerId(),
      order.getOrderLines(),
      order.getTotalAmount(),
      Instant.now()
    );

    eventPublisher.publish(event);
  }
}

// Event bus using Kafka
@Service
public class KafkaEventPublisher implements EventPublisher {
  private final KafkaTemplate<String, DomainEvent> kafka;

  @Override
  public void publish(DomainEvent event) {
    kafka.send(
      "order-events",
      event.getAggregateId().toString(),
      event
    );
  }
}

// Read side consumes events
@Service
public class OrderReadModelUpdater {
  private final OrderSummaryRepository summaryRepo;
  private final CustomerHistoryRepository historyRepo;

  @KafkaListener(topics = "order-events",
                 groupId = "order-summary-projection")
  @Transactional
  public void handleOrderCreated(OrderCreatedEvent event) {
    // Update summary projection
    OrderSummary summary = OrderSummary.from(event);
    summaryRepo.save(summary);

    // Update customer history projection
    CustomerOrderHistory history = historyRepo
      .findById(event.getCustomerId().toString())
      .orElseGet(() ->
        new CustomerOrderHistory(event.getCustomerId()));

    history.addOrder(event.getOrderId(),
                    event.getTotalAmount());
    historyRepo.save(history);
  }

  @KafkaListener(topics = "order-events",
                 groupId = "order-analytics-projection")
  public void handleOrderCreatedForAnalytics(
      OrderCreatedEvent event) {
    // Separate projection for analytics
    OrderAnalytics analytics = OrderAnalytics.from(event);
    analyticsRepo.save(analytics);
  }
}

// Rebuild projection from events
@Service
public class ProjectionRebuilder {
  private final EventStore eventStore;
  private final OrderSummaryRepository summaryRepo;

  public void rebuildOrderSummaryProjection() {
    summaryRepo.deleteAll();

    List<DomainEvent> allEvents =
      eventStore.getAllEvents("order-events");

    for (DomainEvent event : allEvents) {
      if (event instanceof OrderCreatedEvent) {
        OrderSummary summary =
          OrderSummary.from((OrderCreatedEvent) event);
        summaryRepo.save(summary);
      }
      // Handle other event types...
    }
  }
}

// Output: Async event-driven synchronization`
        },
        {
          name: 'Use Cases',
          explanation: 'Complex domains with different read/write patterns. High read volume. Multiple views of same data. Event-driven architecture. Audit requirements. Scalability needs. Often combined with event sourcing.',
          codeExample: `// CQRS Use Cases: When to apply
package com.examples.cqrs;

// USE CASE 1: High read/write ratio
@Service
public class ProductCatalogService {
  // Write: infrequent updates by admins
  @Transactional
  public void updateProduct(UUID productId,
      ProductUpdate update) {
    Product product = writeRepo.findById(productId)
      .orElseThrow();
    product.update(update);
    writeRepo.save(product);

    eventPublisher.publish(
      new ProductUpdatedEvent(product));
  }

  // Read: millions of queries per second
  public ProductView getProduct(UUID productId) {
    // Read from optimized cache/read model
    return readCache.get(productId);
  }

  // Reads scaled independently from writes
  // Read replicas, CDN, caching layer
}

// USE CASE 2: Multiple views of same data
@Service
public class OrderViewService {
  // Admin view: detailed, all fields
  public OrderAdminView getAdminView(UUID orderId) {
    return adminReadRepo.findById(orderId);
  }

  // Customer view: simplified, privacy-aware
  public OrderCustomerView getCustomerView(UUID orderId) {
    return customerReadRepo.findById(orderId);
  }

  // Analytics view: aggregated metrics
  public OrderAnalytics getAnalytics(UUID orderId) {
    return analyticsRepo.findById(orderId);
  }

  // Same write model, multiple read models
}

// USE CASE 3: Complex reporting requirements
@Service
public class ReportingService {
  // Write model: normalized, transactional
  private final OrderWriteRepository writeRepo;

  // Read model: denormalized for reporting
  private final OrderReportingRepository reportRepo;

  public SalesReport generateSalesReport(
      LocalDate from, LocalDate to) {
    // Query denormalized reporting model
    List<SalesData> data = reportRepo
      .findSalesDataBetween(from, to);

    return SalesReport.from(data);
    // Without CQRS: complex joins, slow queries
    // With CQRS: pre-computed aggregates, fast
  }
}

// USE CASE 4: Event-driven microservices
@Service
public class OrderEventHandler {
  // Write creates event
  @Transactional
  public void placeOrder(PlaceOrderCommand cmd) {
    Order order = Order.create(cmd);
    orderRepo.save(order);

    // Event triggers downstream services
    eventBus.publish(new OrderPlacedEvent(order));
  }

  // Multiple services consume same event
  @EventListener
  public void updateInventory(OrderPlacedEvent event) {
    // Inventory service updates its read model
  }

  @EventListener
  public void sendConfirmation(OrderPlacedEvent event) {
    // Notification service updates its read model
  }
}

// ANTI-PATTERN: Don't use CQRS for simple CRUD
// If reads/writes are similar, CQRS adds complexity
// without benefits

// Output: Apply CQRS when reads != writes`
        },
        {
          name: 'Implementation Patterns',
          explanation: 'Simple: same database, separate tables. Advanced: separate databases. Messaging infrastructure. Materialized views. Change data capture. Projection handlers. Query optimization independent of write model.',
          codeExample: `// CQRS Implementation Patterns
package com.cqrs.implementations;

// PATTERN 1: Same database, separate schemas
@Configuration
public class SimpleCQRSConfig {
  @Bean
  @Primary
  public DataSource writeDataSource() {
    // Single database
    return DataSourceBuilder.create()
      .url("jdbc:postgresql://db:5432/app")
      .build();
  }

  // Write entities in 'write_model' schema
  @Entity
  @Table(schema = "write_model", name = "orders")
  public class Order { }

  // Read entities in 'read_model' schema
  @Entity
  @Table(schema = "read_model", name = "order_summaries")
  public class OrderSummary { }
}

// PATTERN 2: Separate databases
@Configuration
public class AdvancedCQRSConfig {
  @Bean
  public DataSource writeDataSource() {
    return DataSourceBuilder.create()
      .url("jdbc:postgresql://write-db:5432/orders")
      .build();
  }

  @Bean
  public MongoClient readDataSource() {
    return MongoClients.create(
      "mongodb://read-db:27017/order-views");
  }

  // PostgreSQL for writes: ACID, consistency
  // MongoDB for reads: fast queries, denormalized
}

// PATTERN 3: Materialized views
@Configuration
public class MaterializedViewPattern {
  @PostConstruct
  public void setupMaterializedViews() {
    jdbcTemplate.execute("""
      CREATE MATERIALIZED VIEW customer_order_summary AS
      SELECT
        c.id,
        c.name,
        COUNT(o.id) as total_orders,
        SUM(o.total_amount) as lifetime_value
      FROM customers c
      LEFT JOIN orders o ON c.id = o.customer_id
      GROUP BY c.id, c.name
    """);

    // Refresh materialized view on schedule
    jdbcTemplate.execute(
      "REFRESH MATERIALIZED VIEW customer_order_summary");
  }
}

// PATTERN 4: Change Data Capture
@Configuration
public class CDCPattern {
  // Debezium captures database changes
  @Bean
  public DebeziumEngine<ChangeEvent<String, String>>
      debeziumEngine() {
    Configuration config = Configuration.create()
      .with("connector.class",
            "io.debezium.connector.postgresql.PostgresConnector")
      .with("database.hostname", "write-db")
      .with("database.dbname", "orders")
      .with("table.include.list", "write_model.orders")
      .build();

    return DebeziumEngine.create(
      ChangeEventFormat.of(Connect.class))
      .using(config.asProperties())
      .notifying(this::handleChangeEvent)
      .build();
  }

  private void handleChangeEvent(
      ChangeEvent<String, String> event) {
    // Update read model from CDC event
    readModelUpdater.update(event);
  }
}

// PATTERN 5: Event Store + Projections
@Service
public class EventStoreProjection {
  @KafkaListener(topics = "event-store")
  public void project(DomainEvent event) {
    // Build multiple read models from events
    if (event instanceof OrderPlacedEvent) {
      updateSummaryView(event);
      updateAnalyticsView(event);
      updateReportingView(event);
    }
  }
}

// Output: Choose pattern based on requirements`
        }
      ],
      description: 'Pattern separating read and write operations into distinct models, enabling independent optimization of each.'
    },
    {
      id: 'hexagonal', x: 1080, y: 240, width: 350, height: 160,
      icon: '⬡', title: 'Hexagonal Architecture', color: 'teal',
      details: [
        {
          name: 'Ports and Adapters',
          explanation: 'Core domain at center. Ports define interfaces. Adapters implement interfaces. Technology at edges. Domain independent of infrastructure. Swap adapters without changing core. Testability through mocking ports.',
          codeExample: `// Ports and Adapters: Core concept
package com.hexagonal;

// DOMAIN (CENTER): Pure business logic
package com.hexagonal.domain;

public class Order {
  private UUID id;
  private List<OrderLine> lines;
  private OrderStatus status;

  public void addLine(Product product, int quantity) {
    // Pure business logic
    if (status != OrderStatus.DRAFT) {
      throw new IllegalStateException(
        "Cannot modify submitted order");
    }
    lines.add(new OrderLine(product, quantity));
  }

  public void submit() {
    if (lines.isEmpty()) {
      throw new EmptyOrderException();
    }
    this.status = OrderStatus.SUBMITTED;
  }
}

// PORT (INTERFACE): Application defines contracts
package com.hexagonal.port;

// Output port: domain needs persistence
public interface OrderRepository {
  Order findById(UUID id);
  void save(Order order);
}

// Input port: use case interface
public interface OrderService {
  void createOrder(CreateOrderRequest request);
  Order getOrder(UUID orderId);
}

// ADAPTER: Infrastructure implements ports
package com.hexagonal.adapter;

// Primary adapter: REST controller
@RestController
public class OrderRestAdapter {
  private final OrderService orderService;

  @PostMapping("/orders")
  public ResponseEntity<OrderResponse> create(
      @RequestBody CreateOrderRequest request) {
    orderService.createOrder(request);
    return ResponseEntity.ok().build();
  }
}

// Secondary adapter: Database implementation
@Repository
public class JpaOrderAdapter implements OrderRepository {
  @PersistenceContext
  private EntityManager em;

  @Override
  public Order findById(UUID id) {
    OrderEntity entity = em.find(OrderEntity.class, id);
    return entity.toDomain();
  }

  @Override
  public void save(Order order) {
    OrderEntity entity = OrderEntity.fromDomain(order);
    em.merge(entity);
  }
}

// Output: Domain isolated from infrastructure`
        },
        {
          name: 'Primary & Secondary Ports',
          explanation: 'Primary (driving): initiated by external actors. Secondary (driven): initiated by application. Input ports (use cases). Output ports (repositories, messaging). Clear direction of dependencies. Inversion of control.',
          codeExample: `// Primary & Secondary Ports: Direction matters
package com.hexagonal.ports;

// PRIMARY PORT (DRIVING): External -> Application
// Use case interface
public interface PaymentService {
  PaymentResult processPayment(PaymentRequest request);
  PaymentStatus checkStatus(UUID paymentId);
}

// Application implements primary port
@Service
public class PaymentServiceImpl implements PaymentService {
  private final PaymentRepository repo;  // Secondary port
  private final NotificationPort notifier;  // Secondary port

  @Override
  public PaymentResult processPayment(
      PaymentRequest request) {
    // Business logic
    Payment payment = Payment.create(request);

    // Call secondary ports
    repo.save(payment);
    notifier.sendConfirmation(payment);

    return PaymentResult.success(payment.getId());
  }
}

// SECONDARY PORT (DRIVEN): Application -> External
// Repository port
public interface PaymentRepository {
  Optional<Payment> findById(UUID id);
  void save(Payment payment);
}

// Notification port
public interface NotificationPort {
  void sendConfirmation(Payment payment);
  void sendFailureAlert(Payment payment);
}

// External world implements secondary ports
@Component
public class EmailNotificationAdapter
    implements NotificationPort {
  private final JavaMailSender mailSender;

  @Override
  public void sendConfirmation(Payment payment) {
    MimeMessage message = mailSender.createMimeMessage();
    // Send email...
  }
}

// PRIMARY ADAPTERS (drive application)
@RestController
public class PaymentRestAdapter {
  private final PaymentService service;  // Primary port

  @PostMapping("/payments")
  public ResponseEntity<?> processPayment(
      @RequestBody PaymentRequest request) {
    PaymentResult result = service.processPayment(request);
    return ResponseEntity.ok(result);
  }
}

@Component
public class PaymentMessageAdapter {
  private final PaymentService service;

  @KafkaListener(topics = "payment-requests")
  public void handleMessage(PaymentRequest request) {
    service.processPayment(request);
  }
}

// SECONDARY ADAPTERS (driven by application)
@Repository
public class JpaPaymentAdapter implements PaymentRepository {
  @Override
  public void save(Payment payment) {
    // Database implementation
  }
}

// Output: Dependency inversion, ports at boundaries`
        },
        {
          name: 'Domain Independence',
          explanation: 'Business logic knows nothing about UI, database, frameworks. Pure domain code. Technology decisions deferred. Framework-agnostic core. Easier to reason about business rules. Long-term maintainability.',
          codeExample: `// Domain Independence: Pure business logic
package com.hexagonal.domain;

// Domain entity: NO framework dependencies
public class BankAccount {
  private final AccountId id;
  private Money balance;
  private AccountStatus status;
  private final List<Transaction> transactions;

  // Pure business logic
  public void deposit(Money amount) {
    if (status == AccountStatus.FROZEN) {
      throw new AccountFrozenException(
        "Cannot deposit to frozen account");
    }

    if (amount.isNegative()) {
      throw new InvalidAmountException(
        "Amount must be positive");
    }

    this.balance = balance.add(amount);
    transactions.add(
      Transaction.deposit(id, amount, Instant.now())
    );
  }

  public void withdraw(Money amount) {
    if (status == AccountStatus.FROZEN) {
      throw new AccountFrozenException(
        "Cannot withdraw from frozen account");
    }

    if (balance.isLessThan(amount)) {
      throw new InsufficientFundsException(
        "Balance: " + balance + ", Requested: " + amount);
    }

    this.balance = balance.subtract(amount);
    transactions.add(
      Transaction.withdrawal(id, amount, Instant.now())
    );
  }

  // Business rule
  public boolean canWithdraw(Money amount) {
    return status == AccountStatus.ACTIVE &&
           balance.isGreaterThanOrEqual(amount);
  }
}

// Domain service: NO framework dependencies
public class TransferService {
  // Depends on port, not implementation
  private final AccountRepository repository;

  public TransferResult transfer(
      AccountId fromId,
      AccountId toId,
      Money amount) {

    BankAccount from = repository.findById(fromId);
    BankAccount to = repository.findById(toId);

    // Pure business logic
    if (!from.canWithdraw(amount)) {
      return TransferResult.failed("Insufficient funds");
    }

    from.withdraw(amount);
    to.deposit(amount);

    repository.save(from);
    repository.save(to);

    return TransferResult.success();
  }
}

// Port (interface in domain layer)
public interface AccountRepository {
  BankAccount findById(AccountId id);
  void save(BankAccount account);
}

// NO annotations like @Service, @Entity, @Transactional
// NO imports from Spring, JPA, Jackson, etc.
// Can be tested without any framework
// Can be moved to any framework easily

// Output: Technology-agnostic domain`
        },
        {
          name: 'Adapter Types',
          explanation: 'REST controllers, message consumers (primary adapters). Repository implementations, external API clients, email senders (secondary adapters). Framework-specific code in adapters. Multiple adapters for same port (e.g., REST and gRPC).',
          codeExample: `// Adapter Types: Different implementations
package com.hexagonal.adapters;

// PRIMARY ADAPTER 1: REST
@RestController
@RequestMapping("/api/orders")
public class OrderRestAdapter {
  private final OrderService orderService;  // Primary port

  @PostMapping
  public ResponseEntity<OrderResponse> createOrder(
      @RequestBody CreateOrderRequest request) {
    Order order = orderService.createOrder(request);
    return ResponseEntity.ok(OrderResponse.from(order));
  }
}

// PRIMARY ADAPTER 2: gRPC (same port!)
@GrpcService
public class OrderGrpcAdapter
    extends OrderServiceGrpc.OrderServiceImplBase {
  private final OrderService orderService;  // Same port

  @Override
  public void createOrder(
      CreateOrderProtoRequest request,
      StreamObserver<OrderProtoResponse> responseObserver) {
    CreateOrderRequest domainRequest =
      mapFromProto(request);
    Order order = orderService.createOrder(domainRequest);
    responseObserver.onNext(mapToProto(order));
    responseObserver.onCompleted();
  }
}

// PRIMARY ADAPTER 3: CLI
@Component
public class OrderCliAdapter implements CommandLineRunner {
  private final OrderService orderService;

  @Override
  public void run(String... args) {
    if (args[0].equals("create-order")) {
      CreateOrderRequest request =
        parseArgs(args);
      orderService.createOrder(request);
    }
  }
}

// SECONDARY ADAPTER 1: JPA Repository
@Repository
public class JpaOrderAdapter implements OrderRepository {
  @PersistenceContext
  private EntityManager em;

  @Override
  public void save(Order order) {
    OrderJpaEntity entity =
      OrderJpaEntity.fromDomain(order);
    em.merge(entity);
  }
}

// SECONDARY ADAPTER 2: MongoDB Repository (same port!)
@Repository
public class MongoOrderAdapter implements OrderRepository {
  private final MongoTemplate mongo;

  @Override
  public void save(Order order) {
    OrderDocument doc = OrderDocument.fromDomain(order);
    mongo.save(doc);
  }
}

// SECONDARY ADAPTER 3: In-Memory (testing)
public class InMemoryOrderAdapter implements OrderRepository {
  private final Map<UUID, Order> orders = new HashMap<>();

  @Override
  public void save(Order order) {
    orders.put(order.getId(), order);
  }
}

// SECONDARY ADAPTER 4: External API Client
@Component
public class InventoryApiAdapter implements InventoryPort {
  private final RestTemplate restTemplate;

  @Override
  public boolean isAvailable(ProductId productId, int qty) {
    String url = "https://inventory-service/check/" +
                 productId + "?quantity=" + qty;
    InventoryResponse response = restTemplate
      .getForObject(url, InventoryResponse.class);
    return response.isAvailable();
  }
}

// Output: Multiple adapters per port, easy to swap`
        },
        {
          name: 'Testing Strategy',
          explanation: 'Unit test domain without infrastructure. Integration test adapters. Use test doubles for ports. Fast tests for business logic. Slower tests for adapters. High test coverage of core. Confidence in refactoring.',
          codeExample: `// Testing Strategy: Isolated domain tests
package com.hexagonal.test;

// UNIT TEST: Pure domain logic (fast, no infrastructure)
public class OrderServiceTest {
  private OrderService orderService;
  private OrderRepository orderRepo;  // Test double
  private InventoryPort inventoryPort;  // Test double

  @BeforeEach
  void setUp() {
    // Mock secondary ports
    orderRepo = mock(OrderRepository.class);
    inventoryPort = mock(InventoryPort.class);

    // Real domain logic
    orderService = new OrderServiceImpl(
      orderRepo,
      inventoryPort
    );
  }

  @Test
  void shouldCreateOrderWhenInventoryAvailable() {
    // Given
    CreateOrderRequest request = new CreateOrderRequest(
      customerId, productId, 5
    );
    when(inventoryPort.isAvailable(productId, 5))
      .thenReturn(true);

    // When
    Order order = orderService.createOrder(request);

    // Then
    assertThat(order.getStatus())
      .isEqualTo(OrderStatus.CREATED);
    verify(orderRepo).save(any(Order.class));
  }

  @Test
  void shouldRejectOrderWhenInventoryUnavailable() {
    // Given
    when(inventoryPort.isAvailable(productId, 100))
      .thenReturn(false);

    // When/Then
    assertThrows(InsufficientInventoryException.class,
      () -> orderService.createOrder(request));
    verify(orderRepo, never()).save(any());
  }
}

// INTEGRATION TEST: Adapter with real infrastructure
@SpringBootTest
@Testcontainers
public class JpaOrderAdapterTest {
  @Container
  static PostgreSQLContainer<?> postgres =
    new PostgreSQLContainer<>("postgres:15");

  @Autowired
  private OrderRepository orderRepo;  // Real JPA adapter

  @Test
  void shouldPersistAndRetrieveOrder() {
    // Given
    Order order = Order.create(
      UUID.randomUUID(),
      customerId,
      List.of(orderLine)
    );

    // When
    orderRepo.save(order);
    Order retrieved = orderRepo.findById(order.getId());

    // Then
    assertThat(retrieved.getId()).isEqualTo(order.getId());
    assertThat(retrieved.getLines()).hasSize(1);
  }
}

// ACCEPTANCE TEST: End-to-end through primary adapter
@SpringBootTest(webEnvironment = RANDOM_PORT)
public class OrderRestAdapterTest {
  @LocalServerPort
  private int port;

  @Test
  void shouldCreateOrderViaRestApi() {
    // Given
    CreateOrderRequest request = new CreateOrderRequest(...);

    // When
    ResponseEntity<OrderResponse> response =
      restTemplate.postForEntity(
        "http://localhost:" + port + "/api/orders",
        request,
        OrderResponse.class
      );

    // Then
    assertThat(response.getStatusCode()).isEqualTo(OK);
    assertThat(response.getBody().getOrderId()).isNotNull();
  }
}

// Output: Fast domain tests, slower integration tests`
        },
        {
          name: 'Benefits',
          explanation: 'Technology independence. Testability. Maintainability. Clear separation of concerns. Flexibility to change infrastructure. Multiple UIs possible. Postpone technology choices. Focus on domain.',
          codeExample: `// Benefits: Real-world advantages
package com.hexagonal.benefits;

// BENEFIT 1: Technology Independence
// Migrate from JPA to MongoDB without touching domain
public class OrderServiceImpl implements OrderService {
  private final OrderRepository repo;  // Port interface

  // Works with JPA adapter
  OrderRepository jpaAdapter = new JpaOrderAdapter();

  // Works with MongoDB adapter
  OrderRepository mongoAdapter = new MongoOrderAdapter();

  // Works with in-memory adapter
  OrderRepository memAdapter = new InMemoryOrderAdapter();

  // Domain code unchanged!
}

// BENEFIT 2: Multiple UIs
// Same application logic, different interfaces
@Configuration
public class AdapterConfiguration {
  @Bean
  public OrderService orderService(
      OrderRepository repo,
      InventoryPort inventory) {
    return new OrderServiceImpl(repo, inventory);
  }

  // REST adapter
  @Bean
  public OrderRestAdapter restAdapter(
      OrderService service) {
    return new OrderRestAdapter(service);
  }

  // gRPC adapter
  @Bean
  public OrderGrpcAdapter grpcAdapter(
      OrderService service) {
    return new OrderGrpcAdapter(service);
  }

  // GraphQL adapter
  @Bean
  public OrderGraphQLAdapter graphqlAdapter(
      OrderService service) {
    return new OrderGraphQLAdapter(service);
  }

  // All use same domain logic!
}

// BENEFIT 3: Easy Testing
public class OrderServiceTest {
  @Test
  void testBusinessLogic() {
    // No database, no HTTP, no frameworks
    OrderRepository mockRepo = mock(OrderRepository.class);
    OrderService service = new OrderServiceImpl(mockRepo);

    // Pure business logic test
    Order order = service.createOrder(request);

    // Runs in milliseconds
    assertThat(order.getStatus())
      .isEqualTo(OrderStatus.CREATED);
  }
}

// BENEFIT 4: Postpone Infrastructure Decisions
// Start with simple adapters, evolve later
public class SimpleFileOrderAdapter
    implements OrderRepository {
  // Prototype with file storage
  @Override
  public void save(Order order) {
    Files.writeString(
      Path.of(order.getId() + ".json"),
      toJson(order)
    );
  }
}

// Later: replace with production adapter
public class ProductionOrderAdapter
    implements OrderRepository {
  // Production with proper database
  @Override
  public void save(Order order) {
    // Distributed transaction, replication, etc.
  }
}

// Domain code never changes!

// BENEFIT 5: Clear Architecture
// Everyone knows where code goes:
// - Business rules -> Domain
// - Use cases -> Application Services
// - HTTP/gRPC/CLI -> Primary Adapters
// - Database/APIs -> Secondary Adapters

// No "should this go in controller or service?"
// Architecture enforces proper separation

// Output: Flexible, testable, maintainable`
        }
      ],
      description: 'Architectural pattern isolating core business logic from external concerns through ports and adapters.'
    },
    {
      id: 'saga', x: 1080, y: 440, width: 350, height: 160,
      icon: '🔄', title: 'Saga Pattern', color: 'teal',
      details: [
        {
          name: 'Distributed Transactions',
          explanation: 'Sequence of local transactions. Each service has local transaction. No distributed ACID transactions. Eventual consistency. Coordination between services. Compensating transactions for rollback. Long-running processes.',
          codeExample: `// Distributed Transactions: Saga sequence
package com.saga.distributed;

// ORDER SAGA: Create order across multiple services
public class CreateOrderSaga {
  // Step 1: Order Service - Create order
  @Transactional
  public Order createOrder(OrderRequest request) {
    Order order = new Order(request);
    order.setStatus(OrderStatus.PENDING);
    orderRepository.save(order);

    // Publish event for next step
    eventBus.publish(new OrderCreatedEvent(order.getId()));
    return order;
  }

  // Step 2: Payment Service - Charge payment
  @EventListener
  @Transactional
  public void chargePayment(OrderCreatedEvent event) {
    Order order = orderRepository.findById(event.getOrderId());

    try {
      Payment payment = paymentGateway.charge(
        order.getCustomerId(),
        order.getTotalAmount()
      );
      paymentRepository.save(payment);

      // Success: proceed to next step
      eventBus.publish(
        new PaymentChargedEvent(order.getId(), payment.getId())
      );
    } catch (PaymentFailedException e) {
      // Failure: compensate previous step
      eventBus.publish(
        new PaymentFailedEvent(order.getId())
      );
    }
  }

  // Step 3: Inventory Service - Reserve items
  @EventListener
  @Transactional
  public void reserveInventory(PaymentChargedEvent event) {
    Order order = orderRepository.findById(event.getOrderId());

    try {
      for (OrderLine line : order.getLines()) {
        inventoryService.reserve(
          line.getProductId(),
          line.getQuantity()
        );
      }

      // Success: complete saga
      eventBus.publish(
        new InventoryReservedEvent(order.getId())
      );
    } catch (InsufficientInventoryException e) {
      // Failure: compensate all previous steps
      eventBus.publish(
        new InventoryReservationFailedEvent(order.getId())
      );
    }
  }

  // COMPENSATING TRANSACTION: Rollback payment
  @EventListener
  @Transactional
  public void refundPayment(
      InventoryReservationFailedEvent event) {
    Payment payment = paymentRepository
      .findByOrderId(event.getOrderId());

    paymentGateway.refund(payment.getId());
    payment.setStatus(PaymentStatus.REFUNDED);
    paymentRepository.save(payment);

    // Final compensation: cancel order
    eventBus.publish(new OrderCancelledEvent(event.getOrderId()));
  }
}

// Output: Distributed transaction via local transactions`
        },
        {
          name: 'Orchestration',
          explanation: 'Central orchestrator controls saga. Orchestrator tells participants what to do. Knows saga flow. Easier to understand. Single point of coordination. State machine for saga logic. Clear view of process.',
          codeExample: `// Orchestration: Central coordinator
package com.saga.orchestration;

@Service
public class OrderSagaOrchestrator {
  private final OrderService orderService;
  private final PaymentService paymentService;
  private final InventoryService inventoryService;
  private final ShippingService shippingService;
  private final SagaStateRepository stateRepo;

  public SagaResult executeOrderSaga(CreateOrderRequest request) {
    // Create saga instance
    SagaState saga = new SagaState(
      UUID.randomUUID(),
      SagaType.CREATE_ORDER
    );
    stateRepo.save(saga);

    try {
      // Step 1: Create order
      saga.startStep("CREATE_ORDER");
      Order order = orderService.createOrder(request);
      saga.completeStep("CREATE_ORDER", order.getId());
      stateRepo.save(saga);

      // Step 2: Charge payment
      saga.startStep("CHARGE_PAYMENT");
      Payment payment = paymentService.charge(
        order.getCustomerId(),
        order.getTotalAmount()
      );
      saga.completeStep("CHARGE_PAYMENT", payment.getId());
      stateRepo.save(saga);

      // Step 3: Reserve inventory
      saga.startStep("RESERVE_INVENTORY");
      Reservation reservation = inventoryService.reserve(
        order.getLines()
      );
      saga.completeStep("RESERVE_INVENTORY", reservation.getId());
      stateRepo.save(saga);

      // Step 4: Schedule shipping
      saga.startStep("SCHEDULE_SHIPPING");
      Shipment shipment = shippingService.schedule(order);
      saga.completeStep("SCHEDULE_SHIPPING", shipment.getId());
      stateRepo.save(saga);

      // All steps succeeded
      saga.markCompleted();
      stateRepo.save(saga);
      return SagaResult.success(order.getId());

    } catch (Exception e) {
      // Failure: compensate completed steps
      saga.markFailed(e.getMessage());
      stateRepo.save(saga);
      compensate(saga);
      return SagaResult.failure(e.getMessage());
    }
  }

  private void compensate(SagaState saga) {
    // Compensate in reverse order
    List<String> completedSteps =
      saga.getCompletedSteps();
    Collections.reverse(completedSteps);

    for (String step : completedSteps) {
      switch (step) {
        case "SCHEDULE_SHIPPING":
          shippingService.cancelShipment(
            saga.getStepData(step, UUID.class));
          break;
        case "RESERVE_INVENTORY":
          inventoryService.releaseReservation(
            saga.getStepData(step, UUID.class));
          break;
        case "CHARGE_PAYMENT":
          paymentService.refund(
            saga.getStepData(step, UUID.class));
          break;
        case "CREATE_ORDER":
          orderService.cancelOrder(
            saga.getStepData(step, UUID.class));
          break;
      }
    }
  }
}

// Output: Orchestrator controls entire flow`
        },
        {
          name: 'Choreography',
          explanation: 'No central coordinator. Services react to events. Each service knows its responsibility. Publish events for next step. Distributed logic. Loose coupling. More complex to understand. No single point of failure.',
          codeExample: `// Choreography: Event-driven coordination
package com.saga.choreography;

// ORDER SERVICE: Publishes event
@Service
public class OrderService {
  @Transactional
  public void createOrder(CreateOrderRequest request) {
    Order order = Order.create(request);
    order.setStatus(OrderStatus.PENDING);
    orderRepository.save(order);

    // Publish event (no direct call to payment service)
    eventBus.publish(new OrderCreatedEvent(
      order.getId(),
      order.getCustomerId(),
      order.getTotalAmount()
    ));
  }

  @EventListener
  @Transactional
  public void handlePaymentCharged(PaymentChargedEvent event) {
    // React to payment event
    Order order = orderRepository.findById(event.getOrderId());
    order.setPaymentId(event.getPaymentId());
    order.setStatus(OrderStatus.PAID);
    orderRepository.save(order);

    // No event published: inventory service listens
    // to PaymentChargedEvent directly
  }

  @EventListener
  @Transactional
  public void handleInventoryReserved(
      InventoryReservedEvent event) {
    Order order = orderRepository.findById(event.getOrderId());
    order.setStatus(OrderStatus.CONFIRMED);
    orderRepository.save(order);

    // Publish final event
    eventBus.publish(new OrderConfirmedEvent(order.getId()));
  }

  @EventListener
  @Transactional
  public void handlePaymentFailed(PaymentFailedEvent event) {
    // Compensate: cancel order
    Order order = orderRepository.findById(event.getOrderId());
    order.setStatus(OrderStatus.CANCELLED);
    orderRepository.save(order);
  }
}

// PAYMENT SERVICE: Reacts to order event
@Service
public class PaymentService {
  @KafkaListener(topics = "order-events",
    groupId = "payment-service")
  @Transactional
  public void handleOrderCreated(OrderCreatedEvent event) {
    // React to order creation
    try {
      Payment payment = Payment.charge(
        event.getCustomerId(),
        event.getAmount()
      );
      paymentRepository.save(payment);

      // Publish success event
      eventBus.publish(new PaymentChargedEvent(
        event.getOrderId(),
        payment.getId()
      ));
    } catch (PaymentException e) {
      // Publish failure event
      eventBus.publish(new PaymentFailedEvent(
        event.getOrderId(),
        e.getMessage()
      ));
    }
  }
}

// INVENTORY SERVICE: Reacts to payment event
@Service
public class InventoryService {
  @KafkaListener(topics = "payment-events",
    groupId = "inventory-service")
  @Transactional
  public void handlePaymentCharged(PaymentChargedEvent event) {
    // React to payment success
    try {
      Order order = orderClient.getOrder(event.getOrderId());

      for (OrderLine line : order.getLines()) {
        inventoryRepository.reserve(
          line.getProductId(),
          line.getQuantity()
        );
      }

      // Publish success
      eventBus.publish(new InventoryReservedEvent(
        event.getOrderId()
      ));
    } catch (InsufficientInventoryException e) {
      // Publish failure - triggers compensation
      eventBus.publish(
        new InventoryReservationFailedEvent(
          event.getOrderId()
        )
      );
    }
  }

  @KafkaListener(topics = "payment-events")
  @Transactional
  public void handlePaymentRefunded(PaymentRefundedEvent event) {
    // Compensate: release reservation if exists
    inventoryRepository
      .findReservationByOrderId(event.getOrderId())
      .ifPresent(this::releaseReservation);
  }
}

// Output: Distributed coordination via events`
        },
        {
          name: 'Compensating Transactions',
          explanation: 'Undo previously completed steps. Not ACID rollback but business compensation. Semantic rollback. RefundPayment compensates ChargePayment. Must be idempotent. Saga either completes or compensates all steps.',
          codeExample: `// Compensating Transactions: Semantic rollback
package com.saga.compensation;

// Forward transaction and its compensation
public class PaymentSagaStep implements SagaStep {
  // FORWARD TRANSACTION
  @Override
  @Transactional
  public StepResult execute(SagaContext context) {
    Order order = context.getOrder();

    Payment payment = Payment.create(
      order.getCustomerId(),
      order.getTotalAmount()
    );

    paymentGateway.charge(payment);
    payment.setStatus(PaymentStatus.CHARGED);
    paymentRepository.save(payment);

    // Store compensation data
    context.setPaymentId(payment.getId());

    return StepResult.success(payment.getId());
  }

  // COMPENSATING TRANSACTION
  @Override
  @Transactional
  public void compensate(SagaContext context) {
    UUID paymentId = context.getPaymentId();

    Payment payment = paymentRepository.findById(paymentId)
      .orElseThrow();

    // Idempotent: check if already compensated
    if (payment.getStatus() == PaymentStatus.REFUNDED) {
      return;  // Already compensated
    }

    // Business compensation (not database rollback)
    paymentGateway.refund(payment.getId());
    payment.setStatus(PaymentStatus.REFUNDED);
    payment.setRefundedAt(Instant.now());
    paymentRepository.save(payment);

    // Emit compensation event
    eventBus.publish(new PaymentRefundedEvent(
      payment.getId(),
      payment.getOrderId()
    ));
  }
}

// Inventory compensation
public class InventorySagaStep implements SagaStep {
  @Override
  @Transactional
  public StepResult execute(SagaContext context) {
    Order order = context.getOrder();

    Reservation reservation = Reservation.create(
      order.getId()
    );

    for (OrderLine line : order.getLines()) {
      inventoryRepository.decreaseStock(
        line.getProductId(),
        line.getQuantity()
      );
      reservation.addItem(line.getProductId(), line.getQuantity());
    }

    reservationRepository.save(reservation);
    context.setReservationId(reservation.getId());

    return StepResult.success(reservation.getId());
  }

  @Override
  @Transactional
  public void compensate(SagaContext context) {
    UUID reservationId = context.getReservationId();

    Reservation reservation = reservationRepository
      .findById(reservationId)
      .orElseThrow();

    // Idempotent check
    if (reservation.getStatus() == ReservationStatus.RELEASED) {
      return;
    }

    // Release reserved inventory
    for (ReservationItem item : reservation.getItems()) {
      inventoryRepository.increaseStock(
        item.getProductId(),
        item.getQuantity()
      );
    }

    reservation.setStatus(ReservationStatus.RELEASED);
    reservationRepository.save(reservation);
  }
}

// Saga executor with compensations
@Service
public class SagaExecutor {
  public void execute(Saga saga) {
    List<SagaStep> executedSteps = new ArrayList<>();

    try {
      for (SagaStep step : saga.getSteps()) {
        step.execute(saga.getContext());
        executedSteps.add(step);
      }
      saga.markCompleted();
    } catch (Exception e) {
      // Compensate in reverse order
      Collections.reverse(executedSteps);
      for (SagaStep step : executedSteps) {
        step.compensate(saga.getContext());
      }
      saga.markFailed();
    }
  }
}

// Output: Business compensation, not technical rollback`
        },
        {
          name: 'Failure Handling',
          explanation: 'Backward recovery: compensating transactions. Forward recovery: retry until success. Timeout handling. Dead letter queues. Manual intervention for critical failures. Monitoring saga state. Alerting on stuck sagas.',
          codeExample: `// Failure Handling: Resilience strategies
package com.saga.failure;

@Service
public class ResilientSagaExecutor {
  private final SagaStateRepository stateRepo;
  private final RetryTemplate retryTemplate;

  // STRATEGY 1: Backward recovery (compensate)
  public SagaResult executeWithBackwardRecovery(Saga saga) {
    try {
      for (SagaStep step : saga.getSteps()) {
        step.execute(saga.getContext());
      }
      return SagaResult.success();
    } catch (NonRetryableException e) {
      // Permanent failure: compensate
      compensateAllSteps(saga);
      return SagaResult.compensated();
    }
  }

  // STRATEGY 2: Forward recovery (retry)
  public SagaResult executeWithForwardRecovery(Saga saga) {
    for (SagaStep step : saga.getSteps()) {
      RetryPolicy policy = RetryPolicy.builder()
        .maxAttempts(5)
        .exponentialBackoff(Duration.ofSeconds(1))
        .build();

      try {
        retryTemplate.execute(policy, ctx -> {
          return step.execute(saga.getContext());
        });
      } catch (RetryExhaustedException e) {
        // All retries failed
        compensateAllSteps(saga);
        return SagaResult.failed(e);
      }
    }
    return SagaResult.success();
  }

  // STRATEGY 3: Timeout handling
  @Scheduled(fixedRate = 60000)  // Every minute
  public void handleTimedOutSagas() {
    Instant timeout = Instant.now().minus(10, MINUTES);

    List<SagaState> timedOut = stateRepo
      .findByStatusAndStartedAtBefore(
        SagaStatus.IN_PROGRESS,
        timeout
      );

    for (SagaState saga : timedOut) {
      log.warn("Saga {} timed out after 10 minutes",
        saga.getId());

      // Check last completed step
      String lastStep = saga.getLastCompletedStep();

      if (isCompensatable(lastStep)) {
        // Compensate and mark failed
        compensateSaga(saga);
        saga.setStatus(SagaStatus.COMPENSATED);
      } else {
        // Manual intervention required
        saga.setStatus(SagaStatus.REQUIRES_MANUAL_INTERVENTION);
        alertOperations(saga);
      }

      stateRepo.save(saga);
    }
  }

  // STRATEGY 4: Dead letter queue
  @KafkaListener(topics = "saga-events-dlq")
  public void handleDeadLetterMessages(SagaEvent event) {
    log.error("Saga event in DLQ: {}", event);

    SagaState saga = stateRepo.findById(event.getSagaId())
      .orElseThrow();

    saga.incrementFailureCount();

    if (saga.getFailureCount() > 3) {
      // Too many failures: manual intervention
      saga.setStatus(SagaStatus.REQUIRES_MANUAL_INTERVENTION);
      alertOperations(saga);
    } else {
      // Retry with backoff
      Duration backoff = Duration.ofMinutes(
        (long) Math.pow(2, saga.getFailureCount())
      );
      scheduleRetry(event, backoff);
    }

    stateRepo.save(saga);
  }

  // STRATEGY 5: Circuit breaker per service
  @CircuitBreaker(
    name = "payment-service",
    fallbackMethod = "paymentServiceFallback"
  )
  public Payment chargePayment(Order order) {
    return paymentClient.charge(order);
  }

  private Payment paymentServiceFallback(Order order, Exception e) {
    log.error("Payment service unavailable", e);
    // Return null to trigger saga compensation
    throw new ServiceUnavailableException(
      "Payment service is down");
  }
}

// Monitoring
@Component
public class SagaMonitor {
  @Scheduled(fixedRate = 30000)
  public void monitorSagaHealth() {
    long stuckSagas = stateRepo.countByStatus(
      SagaStatus.IN_PROGRESS
    );

    if (stuckSagas > 100) {
      alertOperations("Too many stuck sagas: " + stuckSagas);
    }
  }
}

// Output: Multiple failure recovery strategies`
        },
        {
          name: 'State Management',
          explanation: 'Track saga execution state. Which steps completed. Saga execution context. Correlation IDs. Idempotency keys. Saga log/journal. Resume after failure. Exactly-once processing semantics.',
          codeExample: `// State Management: Track saga execution
package com.saga.state;

// Saga state entity
@Entity
@Table(name = "saga_state")
public class SagaState {
  @Id
  private UUID sagaId;

  @Enumerated(EnumType.STRING)
  private SagaStatus status;

  private String sagaType;

  // Correlation ID for tracking
  private UUID correlationId;

  // Idempotency key
  private String idempotencyKey;

  private Instant startedAt;
  private Instant completedAt;

  // Current step
  private String currentStep;

  // Completed steps
  @ElementCollection
  private List<String> completedSteps = new ArrayList<>();

  // Step data (JSON)
  @Column(columnDefinition = "jsonb")
  private Map<String, Object> stepData = new HashMap<>();

  // Failure tracking
  private int retryCount;
  private String failureReason;

  public void startStep(String stepName) {
    this.currentStep = stepName;
  }

  public void completeStep(String stepName, Object data) {
    completedSteps.add(stepName);
    stepData.put(stepName, data);
    this.currentStep = null;
  }

  public boolean isStepCompleted(String stepName) {
    return completedSteps.contains(stepName);
  }
}

// Saga execution with state persistence
@Service
public class StatefulSagaExecutor {
  private final SagaStateRepository stateRepo;

  @Transactional
  public SagaResult execute(Saga saga, String idempotencyKey) {
    // Check idempotency
    Optional<SagaState> existing = stateRepo
      .findByIdempotencyKey(idempotencyKey);

    if (existing.isPresent()) {
      // Already processed
      return SagaResult.alreadyProcessed(
        existing.get().getSagaId()
      );
    }

    // Create state
    SagaState state = new SagaState();
    state.setSagaId(UUID.randomUUID());
    state.setIdempotencyKey(idempotencyKey);
    state.setStatus(SagaStatus.STARTED);
    state.setStartedAt(Instant.now());
    stateRepo.save(state);

    try {
      // Execute steps
      for (SagaStep step : saga.getSteps()) {
        // Check if step already completed (resume after crash)
        if (state.isStepCompleted(step.getName())) {
          continue;  // Skip completed step
        }

        // Execute step
        state.startStep(step.getName());
        state.setStatus(SagaStatus.IN_PROGRESS);
        stateRepo.save(state);

        StepResult result = step.execute(saga.getContext());

        state.completeStep(step.getName(), result.getData());
        stateRepo.save(state);
      }

      // All steps completed
      state.setStatus(SagaStatus.COMPLETED);
      state.setCompletedAt(Instant.now());
      stateRepo.save(state);

      return SagaResult.success(state.getSagaId());

    } catch (Exception e) {
      // Record failure
      state.setStatus(SagaStatus.FAILED);
      state.setFailureReason(e.getMessage());
      state.incrementRetryCount();
      stateRepo.save(state);

      // Compensate
      compensate(saga, state);

      return SagaResult.failed(e);
    }
  }

  // Resume saga after crash
  @Transactional
  public void resumeSaga(UUID sagaId) {
    SagaState state = stateRepo.findById(sagaId)
      .orElseThrow();

    if (state.getStatus() != SagaStatus.IN_PROGRESS) {
      throw new IllegalStateException(
        "Cannot resume saga with status: " + state.getStatus()
      );
    }

    Saga saga = sagaFactory.create(state.getSagaType());

    // Skip completed steps
    List<SagaStep> remainingSteps = saga.getSteps()
      .stream()
      .filter(step -> !state.isStepCompleted(step.getName()))
      .collect(Collectors.toList());

    // Continue execution from where it stopped
    execute(saga.withSteps(remainingSteps), state);
  }

  // Query saga state
  public SagaStateView getSagaState(UUID sagaId) {
    SagaState state = stateRepo.findById(sagaId)
      .orElseThrow();

    return SagaStateView.builder()
      .sagaId(state.getSagaId())
      .status(state.getStatus())
      .completedSteps(state.getCompletedSteps())
      .currentStep(state.getCurrentStep())
      .progress(calculateProgress(state))
      .build();
  }
}

// Output: Persistent, resumable saga execution`
        }
      ],
      description: 'Pattern for managing distributed transactions as sequence of local transactions with compensating actions for rollback.'
    },
    {
      id: 'api-composition', x: 1080, y: 640, width: 350, height: 140,
      icon: '🔗', title: 'API Composition', color: 'teal',
      details: [
        {
          name: 'Query Pattern',
          explanation: 'Implement query that spans services by calling multiple services. API Gateway or dedicated composer service. Aggregate results. Join data from multiple sources. Synchronous composition. Real-time data. Simple but coupling.',
          codeExample: `// Query Pattern: Compose from multiple services
package com.api.composition;

// Composer service aggregates data from multiple services
@Service
public class OrderComposerService {
  private final OrderServiceClient orderClient;
  private final CustomerServiceClient customerClient;
  private final ProductServiceClient productClient;
  private final PaymentServiceClient paymentClient;

  // Query that spans multiple services
  public OrderDetailsView getOrderDetails(UUID orderId) {
    // 1. Get order from Order Service
    Order order = orderClient.getOrder(orderId);

    // 2. Get customer details from Customer Service
    Customer customer = customerClient
      .getCustomer(order.getCustomerId());

    // 3. Get product details for each order line
    List<ProductDetails> products = order.getLines()
      .stream()
      .map(line -> productClient.getProduct(line.getProductId()))
      .collect(Collectors.toList());

    // 4. Get payment information from Payment Service
    Payment payment = paymentClient
      .getPaymentByOrderId(orderId);

    // 5. Compose all data into single view
    return OrderDetailsView.builder()
      .orderId(order.getId())
      .orderNumber(order.getOrderNumber())
      .orderDate(order.getCreatedAt())
      .status(order.getStatus())
      .customerId(customer.getId())
      .customerName(customer.getName())
      .customerEmail(customer.getEmail())
      .items(composeOrderItems(order.getLines(), products))
      .totalAmount(order.getTotalAmount())
      .paymentStatus(payment.getStatus())
      .paymentMethod(payment.getMethod())
      .build();
  }

  private List<OrderItemView> composeOrderItems(
      List<OrderLine> lines,
      List<ProductDetails> products) {
    return lines.stream()
      .map(line -> {
        ProductDetails product = products.stream()
          .filter(p -> p.getId().equals(line.getProductId()))
          .findFirst()
          .orElseThrow();

        return OrderItemView.builder()
          .productId(product.getId())
          .productName(product.getName())
          .productImage(product.getImageUrl())
          .quantity(line.getQuantity())
          .unitPrice(line.getUnitPrice())
          .totalPrice(line.getTotalPrice())
          .build();
      })
      .collect(Collectors.toList());
  }
}

// REST endpoint using composition
@RestController
@RequestMapping("/api/orders")
public class OrderCompositionController {
  private final OrderComposerService composer;

  @GetMapping("/{orderId}/details")
  public ResponseEntity<OrderDetailsView> getDetails(
      @PathVariable UUID orderId) {
    OrderDetailsView details = composer.getOrderDetails(orderId);
    return ResponseEntity.ok(details);
  }
}

// Output: Single endpoint, multiple service calls`
        },
        {
          name: 'Parallel Calls',
          explanation: 'Make concurrent calls to services. Use CompletableFuture, reactive programming. Reduce overall latency. Aggregate partial failures. Circuit breakers. Timeout per service. Return partial results if needed.',
          codeExample: `// Parallel Calls: Reduce latency with concurrency
package com.api.composition.parallel;

@Service
public class ParallelOrderComposerService {
  private final OrderServiceClient orderClient;
  private final CustomerServiceClient customerClient;
  private final InventoryServiceClient inventoryClient;
  private final ReviewServiceClient reviewClient;

  public OrderDetailsView getOrderDetails(UUID orderId) {
    // Sequential calls would take: 100ms + 80ms + 90ms + 120ms = 390ms
    // Parallel calls take: max(100, 80, 90, 120) = 120ms

    // Step 1: Get order (required for subsequent calls)
    Order order = orderClient.getOrder(orderId);

    // Step 2: Parallel calls for independent data
    CompletableFuture<Customer> customerFuture =
      CompletableFuture.supplyAsync(() ->
        customerClient.getCustomer(order.getCustomerId())
      );

    CompletableFuture<List<ProductDetails>> productsFuture =
      CompletableFuture.supplyAsync(() ->
        getProductDetails(order.getLines())
      );

    CompletableFuture<Map<UUID, Integer>> inventoryFuture =
      CompletableFuture.supplyAsync(() ->
        getInventoryLevels(order.getLines())
      );

    CompletableFuture<Map<UUID, Double>> reviewsFuture =
      CompletableFuture.supplyAsync(() ->
        getProductRatings(order.getLines())
      );

    // Wait for all to complete
    CompletableFuture.allOf(
      customerFuture,
      productsFuture,
      inventoryFuture,
      reviewsFuture
    ).join();

    // Get results
    Customer customer = customerFuture.join();
    List<ProductDetails> products = productsFuture.join();
    Map<UUID, Integer> inventory = inventoryFuture.join();
    Map<UUID, Double> reviews = reviewsFuture.join();

    // Compose final result
    return composeOrderDetails(
      order, customer, products, inventory, reviews
    );
  }

  // Handle partial failures
  public OrderDetailsView getOrderDetailsResilient(UUID orderId) {
    Order order = orderClient.getOrder(orderId);

    // Parallel calls with fallbacks
    CompletableFuture<Customer> customerFuture =
      CompletableFuture.supplyAsync(() ->
        customerClient.getCustomer(order.getCustomerId())
      ).exceptionally(ex -> {
        log.warn("Failed to fetch customer", ex);
        return Customer.unknown();  // Fallback
      });

    CompletableFuture<List<ProductDetails>> productsFuture =
      CompletableFuture.supplyAsync(() ->
        getProductDetails(order.getLines())
      ).exceptionally(ex -> {
        log.warn("Failed to fetch products", ex);
        return Collections.emptyList();  // Fallback
      });

    // Set timeout for each future
    customerFuture.orTimeout(2, TimeUnit.SECONDS);
    productsFuture.orTimeout(3, TimeUnit.SECONDS);

    CompletableFuture.allOf(customerFuture, productsFuture)
      .join();

    // Return partial results if some services failed
    return composeOrderDetails(
      order,
      customerFuture.join(),
      productsFuture.join()
    );
  }

  // Reactive approach with Project Reactor
  public Mono<OrderDetailsView> getOrderDetailsReactive(
      UUID orderId) {
    return orderClient.getOrderReactive(orderId)
      .flatMap(order -> {
        // Parallel reactive calls
        Mono<Customer> customerMono =
          customerClient.getCustomerReactive(order.getCustomerId());

        Mono<List<ProductDetails>> productsMono =
          getProductDetailsReactive(order.getLines());

        Mono<Map<UUID, Integer>> inventoryMono =
          getInventoryLevelsReactive(order.getLines());

        // Combine results
        return Mono.zip(
          customerMono,
          productsMono,
          inventoryMono
        ).map(tuple -> composeOrderDetails(
          order,
          tuple.getT1(),
          tuple.getT2(),
          tuple.getT3()
        ));
      })
      .timeout(Duration.ofSeconds(5))
      .onErrorResume(ex -> {
        log.error("Composition failed", ex);
        return Mono.error(
          new CompositionException("Failed to compose order", ex)
        );
      });
  }
}

// Output: Parallel calls reduce latency significantly`
        },
        {
          name: 'Data Aggregation',
          explanation: 'Compose data from multiple services. Join by ID. Transform to client-friendly format. Handle missing data. Merge strategies. Consistency considerations. Cache where appropriate.',
          codeExample: `// Data Aggregation: Join and transform data
package com.api.composition.aggregation;

@Service
public class CustomerOrderAggregator {
  private final OrderServiceClient orderClient;
  private final CustomerServiceClient customerClient;
  private final LoyaltyServiceClient loyaltyClient;

  // Aggregate customer data with orders
  public CustomerDashboardView getCustomerDashboard(
      UUID customerId) {
    // Get data from multiple services
    Customer customer = customerClient.getCustomer(customerId);
    List<Order> orders = orderClient
      .getOrdersByCustomer(customerId);
    LoyaltyPoints points = loyaltyClient
      .getPoints(customerId);

    // Aggregate and calculate derived values
    int totalOrders = orders.size();
    BigDecimal lifetimeValue = orders.stream()
      .map(Order::getTotalAmount)
      .reduce(BigDecimal.ZERO, BigDecimal::add);

    Order lastOrder = orders.stream()
      .max(Comparator.comparing(Order::getCreatedAt))
      .orElse(null);

    List<OrderSummary> recentOrders = orders.stream()
      .sorted(Comparator.comparing(Order::getCreatedAt).reversed())
      .limit(5)
      .map(this::toOrderSummary)
      .collect(Collectors.toList());

    // Compose dashboard view
    return CustomerDashboardView.builder()
      .customerId(customer.getId())
      .customerName(customer.getName())
      .memberSince(customer.getCreatedAt())
      .totalOrders(totalOrders)
      .lifetimeValue(lifetimeValue)
      .loyaltyPoints(points.getBalance())
      .lastOrderDate(lastOrder != null ?
        lastOrder.getCreatedAt() : null)
      .recentOrders(recentOrders)
      .build();
  }

  // Handle missing data gracefully
  public ProductCatalogView getProductWithEnrichment(
      UUID productId) {
    // Get product (required)
    Product product = productClient.getProduct(productId);

    // Get optional enrichment data
    Optional<Integer> inventory = getInventorySafely(productId);
    Optional<Double> rating = getRatingSafely(productId);
    Optional<Integer> reviewCount = getReviewCountSafely(productId);
    Optional<List<String>> images = getImagesSafely(productId);

    // Compose with fallbacks for missing data
    return ProductCatalogView.builder()
      .productId(product.getId())
      .name(product.getName())
      .description(product.getDescription())
      .price(product.getPrice())
      .inStock(inventory.orElse(0) > 0)
      .stockLevel(inventory.orElse(null))
      .averageRating(rating.orElse(null))
      .reviewCount(reviewCount.orElse(0))
      .images(images.orElse(List.of(product.getDefaultImage())))
      .build();
  }

  private Optional<Integer> getInventorySafely(UUID productId) {
    try {
      return Optional.of(
        inventoryClient.getStockLevel(productId)
      );
    } catch (Exception e) {
      log.warn("Failed to fetch inventory for product: {}",
        productId, e);
      return Optional.empty();
    }
  }

  // Cache aggregated data
  @Cacheable(value = "product-catalog", key = "#productId")
  public ProductCatalogView getCachedProduct(UUID productId) {
    return getProductWithEnrichment(productId);
  }

  // Merge data from multiple sources
  public CustomerProfileView mergeCustomerData(UUID customerId) {
    // Get customer from multiple contexts
    CustomerSales salesData = salesServiceClient
      .getCustomer(customerId);
    CustomerSupport supportData = supportServiceClient
      .getCustomer(customerId);
    CustomerMarketing marketingData = marketingServiceClient
      .getCustomer(customerId);

    // Merge with conflict resolution
    return CustomerProfileView.builder()
      .customerId(customerId)
      .name(resolveConflict(
        salesData.getName(),
        supportData.getName(),
        marketingData.getName()
      ))
      .email(salesData.getEmail())
      .phone(supportData.getPhone())
      .preferences(marketingData.getPreferences())
      .totalOrders(salesData.getTotalOrders())
      .supportTickets(supportData.getOpenTickets())
      .lastUpdated(findLatestTimestamp(
        salesData.getUpdatedAt(),
        supportData.getUpdatedAt(),
        marketingData.getUpdatedAt()
      ))
      .build();
  }

  private String resolveConflict(String... values) {
    // Use first non-null value
    return Arrays.stream(values)
      .filter(Objects::nonNull)
      .findFirst()
      .orElse("Unknown");
  }
}

// Output: Intelligent data aggregation and merging`
        },
        {
          name: 'Trade-offs',
          explanation: 'Pros: simple, real-time data. Cons: availability issues (all services must be available), performance overhead, coupling between services. Alternative: CQRS with read model. Choose based on requirements.',
          codeExample: `// Trade-offs: When to use API Composition
package com.api.composition.tradeoffs;

// PRO 1: Simple implementation
@Service
public class SimpleComposition {
  public OrderView getOrder(UUID orderId) {
    // Straightforward: call services and combine
    Order order = orderService.getOrder(orderId);
    Customer customer = customerService
      .getCustomer(order.getCustomerId());

    return new OrderView(order, customer);
  }
}

// PRO 2: Always fresh data (no staleness)
@Service
public class RealTimeComposition {
  public ProductView getProduct(UUID productId) {
    // Real-time inventory check
    Product product = productService.getProduct(productId);
    int stock = inventoryService.getCurrentStock(productId);

    // Always accurate stock level
    return new ProductView(product, stock);
  }
}

// CON 1: Availability problems
@Service
public class AvailabilityIssues {
  public OrderView getOrder(UUID orderId) {
    // If ANY service is down, entire query fails
    try {
      Order order = orderService.getOrder(orderId);
      Customer customer = customerService
        .getCustomer(order.getCustomerId());
      Payment payment = paymentService
        .getPayment(orderId);

      // Availability = 99% * 99% * 99% = 97%
      // With 5 services: 99%^5 = 95%
      return new OrderView(order, customer, payment);
    } catch (ServiceUnavailableException e) {
      // Entire operation fails
      throw e;
    }
  }
}

// CON 2: Performance overhead
@Service
public class PerformanceOverhead {
  public CustomerDashboard getDashboard(UUID customerId) {
    // Sequential calls: 50ms + 70ms + 60ms + 80ms = 260ms
    Customer customer = customerService
      .getCustomer(customerId);  // 50ms
    List<Order> orders = orderService
      .getOrders(customerId);    // 70ms
    int points = loyaltyService
      .getPoints(customerId);    // 60ms
    List<Review> reviews = reviewService
      .getReviews(customerId);   // 80ms

    // High latency even with parallel calls
    // Network overhead for each call
    return new CustomerDashboard(
      customer, orders, points, reviews
    );
  }
}

// CON 3: Coupling between services
@Service
public class ServiceCoupling {
  // Composer must know about all services
  public OrderView getOrder(UUID orderId) {
    // Change in any service affects composer
    Order order = orderService.getOrder(orderId);
    Customer customer = customerService
      .getCustomer(order.getCustomerId());

    // If Customer service changes API, composer breaks
    // Tight coupling
    return new OrderView(order, customer);
  }
}

// ALTERNATIVE: CQRS with Read Model
@Service
public class CQRSAlternative {
  // Read model is pre-joined and denormalized
  private final OrderReadModelRepository readRepo;

  public OrderView getOrder(UUID orderId) {
    // Single database query, no service calls
    // Fast: 5ms instead of 200ms
    // Available: no dependency on other services
    // Decoupled: no need to call other services

    OrderReadModel model = readRepo.findById(orderId);
    return OrderView.from(model);

    // Trade-off: eventual consistency
    // Data might be slightly stale (seconds/minutes)
  }
}

// DECISION MATRIX
// Use API Composition when:
// - Fresh data is critical
// - Low query volume
// - Simple aggregation (2-3 services)
// - Acceptable latency (< 500ms)

// Use CQRS/Read Model when:
// - High query volume
// - Complex joins (5+ services)
// - Performance critical (< 50ms)
// - Eventual consistency acceptable

// HYBRID APPROACH
@Service
public class HybridComposition {
  public ProductView getProduct(UUID productId) {
    // Read model for static data (fast)
    ProductReadModel cached = readRepo.findById(productId);

    // API composition for real-time data
    int currentStock = inventoryService
      .getCurrentStock(productId);

    // Best of both worlds
    return ProductView.builder()
      .productId(cached.getId())
      .name(cached.getName())
      .description(cached.getDescription())
      .price(cached.getPrice())
      .currentStock(currentStock)  // Real-time
      .build();
  }
}

// Output: Choose pattern based on requirements`
        },
        {
          name: 'Backend for Frontend',
          explanation: 'Composition layer per client type. Mobile BFF, web BFF. Tailored responses. Client-specific aggregation logic. Reduces chattiness. Optimized for each client. Multiple BFFs possible.',
          codeExample: `// Backend for Frontend: Client-specific composition
package com.api.composition.bff;

// MOBILE BFF: Optimized for mobile clients
@RestController
@RequestMapping("/mobile/api")
public class MobileBFF {
  private final OrderComposerService composer;
  private final ImageOptimizationService imageService;

  @GetMapping("/orders/{orderId}")
  public MobileOrderView getOrder(
      @PathVariable UUID orderId,
      @RequestHeader("Device-Type") String deviceType) {

    // Get composed data
    OrderDetailsView details = composer.getOrderDetails(orderId);

    // Mobile-specific transformations
    return MobileOrderView.builder()
      .orderId(details.getOrderId())
      .orderNumber(details.getOrderNumber())
      .status(details.getStatus())
      .totalAmount(details.getTotalAmount())
      // Simplified items for mobile
      .items(details.getItems().stream()
        .map(item -> MobileOrderItem.builder()
          .name(item.getProductName())
          // Optimize images for mobile
          .thumbnail(imageService.optimize(
            item.getProductImage(),
            ImageSize.MOBILE_THUMBNAIL
          ))
          .quantity(item.getQuantity())
          .price(item.getTotalPrice())
          .build())
        .collect(Collectors.toList()))
      // Exclude verbose fields
      // No customerEmail, no detailed payment info
      .build();
  }

  // Mobile-specific dashboard
  @GetMapping("/dashboard")
  public MobileDashboardView getDashboard(
      @AuthenticationPrincipal User user) {
    // Minimize data transfer for mobile
    List<Order> recentOrders = orderService
      .getRecentOrders(user.getId(), 3);  // Only 3 orders

    return MobileDashboardView.builder()
      .customerName(user.getFirstName())  // First name only
      .orderCount(orderService.getOrderCount(user.getId()))
      .recentOrders(recentOrders.stream()
        .map(this::toMobileSummary)
        .collect(Collectors.toList()))
      .build();
  }
}

// WEB BFF: Full data for web clients
@RestController
@RequestMapping("/web/api")
public class WebBFF {
  private final OrderComposerService composer;

  @GetMapping("/orders/{orderId}")
  public WebOrderView getOrder(@PathVariable UUID orderId) {
    // Get full composed data
    OrderDetailsView details = composer.getOrderDetails(orderId);

    // Web-specific transformations
    return WebOrderView.builder()
      .orderId(details.getOrderId())
      .orderNumber(details.getOrderNumber())
      .orderDate(details.getOrderDate())
      .status(details.getStatus())
      .statusHistory(orderService.getStatusHistory(orderId))
      .customerId(details.getCustomerId())
      .customerName(details.getCustomerName())
      .customerEmail(details.getCustomerEmail())
      // Full product details for web
      .items(details.getItems().stream()
        .map(item -> WebOrderItem.builder()
          .productId(item.getProductId())
          .productName(item.getProductName())
          .fullImage(item.getProductImage())
          .quantity(item.getQuantity())
          .unitPrice(item.getUnitPrice())
          .totalPrice(item.getTotalPrice())
          // Additional fields for web
          .productUrl("/products/" + item.getProductId())
          .canReview(true)
          .build())
        .collect(Collectors.toList()))
      .subtotal(details.getSubtotal())
      .tax(details.getTax())
      .shipping(details.getShippingCost())
      .totalAmount(details.getTotalAmount())
      .paymentStatus(details.getPaymentStatus())
      .paymentMethod(details.getPaymentMethod())
      .shippingAddress(details.getShippingAddress())
      .billingAddress(details.getBillingAddress())
      .build();
  }
}

// ADMIN BFF: Administrative operations
@RestController
@RequestMapping("/admin/api")
public class AdminBFF {
  @GetMapping("/orders/{orderId}/full")
  public AdminOrderView getOrderFull(
      @PathVariable UUID orderId) {
    // Include everything for admin
    OrderDetailsView details = composer.getOrderDetails(orderId);

    return AdminOrderView.builder()
      // All customer fields
      .allOrderDetails(details)
      // Additional admin-only data
      .internalNotes(orderService.getNotes(orderId))
      .fraudScore(fraudService.getScore(orderId))
      .profitMargin(calculateMargin(details))
      .fulfillmentStatus(warehouseService.getStatus(orderId))
      .auditLog(auditService.getLog(orderId))
      .build();
  }
}

// BFF reduces client chattiness
// Without BFF: Mobile makes 5 API calls
// With BFF: Mobile makes 1 API call

// Output: Optimized APIs per client type`
        }
      ],
      description: 'Pattern for implementing queries spanning multiple services by invoking services and combining results.'
    }
  ]

  const handleComponentClick = (component) => {
    setSelectedComponent(component)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedComponent(null)
    setSelectedConcept(null)
  }

  // Use refs to access current modal state in event handler
  const isModalOpenRef = useRef(isModalOpen)
  useEffect(() => {
    isModalOpenRef.current = isModalOpen
  }, [isModalOpen])

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept)
  }

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
      border: '3px solid rgba(20, 184, 166, 0.4)'
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
          Modular Architecture
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <div style={{
        backgroundColor: 'rgba(20, 184, 166, 0.05)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(20, 184, 166, 0.3)',
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
          Modular Architecture: Domain-Driven Design, bounded contexts for model boundaries,
          microservices patterns, event sourcing for audit trails, CQRS for read/write separation,
          hexagonal architecture, saga pattern for distributed transactions, and API composition strategies.
        </p>
      </div>

      <ModernDiagram
        components={components}
        onComponentClick={handleComponentClick}
        title="Modern Modular Architecture Patterns"
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
            border: '3px solid rgba(20, 184, 166, 0.4)'
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
              backgroundColor: 'rgba(20, 184, 166, 0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '2px solid rgba(20, 184, 166, 0.2)',
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
                      color: '#1f2937',
                      marginBottom: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{
                        backgroundColor: 'rgba(34, 197, 94, 0.2)',
                        color: '#166534',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                      }}>
                        {idx + 1}
                      </span>
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

export default Module

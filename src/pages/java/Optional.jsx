/**
 * Java Optional Page
 *
 * Comprehensive guide to java.util.Optional for null-safety and functional programming.
 * Uses modal-based navigation with concepts and details.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const OPTIONAL_COLORS = {
  primary: '#8b5cf6',           // Purple - main accent color
  primaryHover: '#a78bfa',      // Hover state
  bg: 'rgba(139, 92, 246, 0.1)', // Background with transparency
  border: 'rgba(139, 92, 246, 0.3)', // Border color
  arrow: '#8b5cf6',             // Arrow/indicator color
  hoverBg: 'rgba(139, 92, 246, 0.2)', // Hover background
  topicBg: 'rgba(139, 92, 246, 0.2)'  // Topic card background
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },    // purple
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },    // blue
  { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.3)' },    // green
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },    // amber
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },    // pink
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },      // cyan
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const OptionalFlowDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowOptional" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Optional Flow - Explicit Null Handling
    </text>

    {/* Traditional Null Check */}
    <rect x="50" y="60" width="150" height="100" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="125" y="85" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">Traditional</text>
    <text x="125" y="105" textAnchor="middle" fill="#fca5a5" fontSize="9">if (user != null)</text>
    <text x="125" y="125" textAnchor="middle" fill="#fca5a5" fontSize="9">getName()</text>
    <text x="125" y="145" textAnchor="middle" fill="#fca5a5" fontSize="9">else "Unknown"</text>

    {/* Arrow */}
    <line x1="200" y1="110" x2="245" y2="110" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowOptional)"/>
    <text x="222" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">refactor</text>

    {/* Optional Approach */}
    <rect x="250" y="60" width="200" height="100" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="350" y="85" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontWeight="bold">Optional&lt;User&gt;</text>
    <text x="350" y="105" textAnchor="middle" fill="#a78bfa" fontSize="9">ofNullable(user)</text>
    <text x="350" y="125" textAnchor="middle" fill="#a78bfa" fontSize="9">.map(User::getName)</text>
    <text x="350" y="145" textAnchor="middle" fill="#a78bfa" fontSize="9">.orElse("Unknown")</text>

    {/* Benefits */}
    <rect x="500" y="60" width="250" height="100" rx="8" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="625" y="85" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Benefits</text>
    <text x="625" y="105" textAnchor="middle" fill="#6ee7b7" fontSize="9">✓ Explicit null handling</text>
    <text x="625" y="125" textAnchor="middle" fill="#6ee7b7" fontSize="9">✓ Functional composition</text>
    <text x="625" y="145" textAnchor="middle" fill="#6ee7b7" fontSize="9">✓ No NullPointerException</text>

    {/* Note */}
    <text x="400" y="185" textAnchor="middle" fill="#94a3b8" fontSize="10">
      Optional makes null handling explicit and chainable
    </text>
  </svg>
)

const OptionalChainDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowChain" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Optional Method Chaining
    </text>

    {/* Source */}
    <rect x="50" y="60" width="130" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="115" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Optional.of(user)</text>

    {/* Map */}
    <rect x="220" y="60" width="130" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="285" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">map()</text>
    <text x="285" y="100" textAnchor="middle" fill="#ddd6fe" fontSize="8">transform value</text>

    {/* Filter */}
    <rect x="390" y="60" width="130" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="455" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">filter()</text>
    <text x="455" y="100" textAnchor="middle" fill="#fef3c7" fontSize="8">apply condition</text>

    {/* Terminal */}
    <rect x="560" y="60" width="130" height="50" rx="8" fill="#10b981" stroke="#34d399" strokeWidth="2"/>
    <text x="625" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">orElse()</text>
    <text x="625" y="100" textAnchor="middle" fill="#d1fae5" fontSize="8">provide default</text>

    {/* Arrows */}
    <line x1="180" y1="85" x2="215" y2="85" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowChain)"/>
    <line x1="350" y1="85" x2="385" y2="85" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowChain)"/>
    <line x1="520" y1="85" x2="555" y2="85" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowChain)"/>

    {/* Present Path */}
    <rect x="220" y="140" width="270" height="35" rx="6" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="1"/>
    <text x="355" y="163" textAnchor="middle" fill="#10b981" fontSize="9">
      If Present: user → transformed → filtered → result
    </text>

    {/* Empty Path */}
    <rect x="220" y="185" width="270" height="25" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="1"/>
    <text x="355" y="202" textAnchor="middle" fill="#ef4444" fontSize="9">
      If Empty: skip all → return default
    </text>
  </svg>
)

const OptionalStreamDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowStream" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Optional in Stream Pipeline
    </text>

    {/* Stream Source */}
    <rect x="50" y="60" width="150" height="80" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="125" y="85" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">Stream&lt;User&gt;</text>
    <rect x="70" y="100" width="40" height="20" rx="4" fill="#3b82f6" opacity="0.6"/>
    <text x="90" y="114" textAnchor="middle" fill="white" fontSize="8">User</text>
    <rect x="115" y="100" width="40" height="20" rx="4" fill="#3b82f6" opacity="0.6"/>
    <text x="135" y="114" textAnchor="middle" fill="white" fontSize="8">null</text>

    {/* flatMap */}
    <rect x="240" y="60" width="140" height="80" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="310" y="85" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontWeight="bold">flatMap()</text>
    <text x="310" y="105" textAnchor="middle" fill="#a78bfa" fontSize="9">Optional::ofNullable</text>
    <text x="310" y="125" textAnchor="middle" fill="#ddd6fe" fontSize="8">filters out nulls</text>

    {/* Result */}
    <rect x="420" y="60" width="150" height="80" rx="8" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="495" y="85" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Non-null Users</text>
    <rect x="440" y="100" width="40" height="20" rx="4" fill="#10b981"/>
    <text x="460" y="114" textAnchor="middle" fill="white" fontSize="8">User</text>
    <rect x="485" y="100" width="40" height="20" rx="4" fill="#10b981"/>
    <text x="505" y="114" textAnchor="middle" fill="white" fontSize="8">User</text>

    {/* Arrows */}
    <line x1="200" y1="100" x2="235" y2="100" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowStream)"/>
    <line x1="380" y1="100" x2="415" y2="100" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowStream)"/>

    {/* Code Example */}
    <rect x="50" y="160" width="520" height="30" rx="6" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="310" y="180" textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="monospace">
      users.stream().flatMap(u → Optional.ofNullable(u).stream())
    </text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Optional({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'creation',
      name: 'Creating Optionals',
      icon: '🎯',
      color: '#3b82f6',
      description: 'Different ways to create Optional instances: of(), ofNullable(), empty(). Choose the right method for your use case.',
      diagram: OptionalFlowDiagram,
      details: [
        {
          name: 'Optional.of() - Non-null Values',
          diagram: OptionalFlowDiagram,
          explanation: 'Optional.of(value) creates an Optional containing a non-null value. Throws NullPointerException if value is null. Use when you are absolutely certain the value is not null.',
          codeExample: `import java.util.Optional;

class OptionalCreation {
    public void createWithOf() {
        // For non-null values - guaranteed present
        Optional<String> name = Optional.of("Alice");
        System.out.println(name.get());  // Alice

        // DANGER: throws NullPointerException if null
        String nullValue = null;
        Optional<String> bad = Optional.of(nullValue);  // NPE!
    }

    // Good use case: method that never returns null
    public Optional<User> getCurrentUser() {
        User user = loadUser();  // guaranteed non-null
        return Optional.of(user);
    }

    // When to use: factory methods, constants
    private static final Optional<Config> DEFAULT_CONFIG =
        Optional.of(new Config());
}`
        },
        {
          name: 'Optional.ofNullable() - Nullable Values',
          explanation: 'Optional.ofNullable(value) handles both null and non-null values safely. Returns Optional.empty() if value is null, otherwise wraps the value. This is the most commonly used creation method.',
          codeExample: `class SafeOptional {
    public Optional<String> findUserEmail(int userId) {
        String email = database.getEmail(userId);  // might be null
        return Optional.ofNullable(email);  // Safe for null
    }

    // Wrapping nullable method returns
    public Optional<Address> getAddress(User user) {
        return Optional.ofNullable(user.getAddress());
    }

    // Common pattern: wrapping external APIs
    public Optional<String> getSystemProperty(String key) {
        return Optional.ofNullable(System.getProperty(key));
    }

    // Handling Map.get() which returns null
    public Optional<User> getUserFromCache(String id) {
        return Optional.ofNullable(userCache.get(id));
    }
}`
        },
        {
          name: 'Optional.empty() - No Value',
          explanation: 'Optional.empty() creates an empty Optional with no value. Use for "not found" scenarios or to indicate absence explicitly. Much better than returning null.',
          codeExample: `class EmptyOptional {
    public Optional<User> findUserById(int id) {
        User user = database.query(id);
        if (user == null) {
            return Optional.empty();  // Explicit "not found"
        }
        return Optional.of(user);
    }

    // Better than returning null
    public Optional<String> parseConfig(String key) {
        if (!config.containsKey(key)) {
            return Optional.empty();  // Clear absence
        }
        return Optional.of(config.get(key));
    }

    // Using in streams
    public Optional<Integer> findMax(List<Integer> numbers) {
        if (numbers.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(Collections.max(numbers));
    }
}`
        }
      ]
    },
    {
      id: 'transformation',
      name: 'Transforming Values',
      icon: '🔄',
      color: '#8b5cf6',
      description: 'Transform Optional values with map() and flatMap(). Chain operations without null checks.',
      diagram: OptionalChainDiagram,
      details: [
        {
          name: 'map() - Transform Value',
          diagram: OptionalChainDiagram,
          explanation: 'map() transforms the value inside Optional if present. Takes a Function that transforms the value. Returns empty Optional if original was empty. The function is NOT called if Optional is empty.',
          codeExample: `class OptionalMap {
    public Optional<String> getUserEmail(int userId) {
        return findUser(userId)              // Optional<User>
            .map(User::getEmail)             // Optional<String>
            .map(String::toLowerCase)        // Optional<String>
            .map(email -> email.trim());     // Optional<String>
    }

    // Chaining transformations
    public Optional<Integer> getAddressZipCode(User user) {
        return Optional.ofNullable(user)
            .map(User::getAddress)           // Optional<Address>
            .map(Address::getZipCode)        // Optional<String>
            .map(Integer::parseInt);         // Optional<Integer>
    }

    // Complex object navigation
    public Optional<String> getManagerName(Employee emp) {
        return Optional.ofNullable(emp)
            .map(Employee::getDepartment)
            .map(Department::getManager)
            .map(Manager::getName)
            .map(String::toUpperCase);
        // Returns empty if any step is null
    }
}`
        },
        {
          name: 'flatMap() - Avoid Nested Optionals',
          explanation: 'flatMap() is like map(), but for methods that already return Optional. Prevents Optional<Optional<T>>. Essential for chaining Optional-returning methods.',
          codeExample: `class OptionalFlatMap {
    // Without flatMap - nested Optional<Optional<String>>
    public Optional<Optional<String>> getBadEmail(int userId) {
        return findUser(userId)              // Optional<User>
            .map(User::getEmail);            // Optional<Optional<String>> ❌
    }

    // With flatMap - flattens to Optional<String>
    public Optional<String> getEmail(int userId) {
        return findUser(userId)              // Optional<User>
            .flatMap(User::getEmail);        // Optional<String> ✓
    }

    // Chaining multiple Optional-returning methods
    public Optional<License> getDriverLicense(int userId) {
        return findUser(userId)              // Optional<User>
            .flatMap(User::getProfile)       // Optional<Profile>
            .flatMap(Profile::getLicense);   // Optional<License>
    }

    // Real world: database lookups
    public Optional<Order> findOrderByUser(String email) {
        return findUserByEmail(email)        // Optional<User>
            .flatMap(user -> findActiveOrder(user.getId()));
    }
}`
        },
        {
          name: 'or() - Alternative Optional',
          explanation: 'or() provides an alternative Optional if the original is empty. Takes a Supplier<Optional<T>>. Allows fallback chains. Added in Java 9.',
          codeExample: `class OptionalOr {
    public Optional<Config> getConfig() {
        return loadUserConfig()           // Try user config
            .or(() -> loadDefaultConfig())  // Fall back to default
            .or(() -> loadSystemConfig());  // Last resort
    }

    // Chaining multiple sources
    public Optional<User> findUser(String id) {
        return findInCache(id)
            .or(() -> findInDatabase(id))
            .or(() -> findInBackupDatabase(id));
    }

    // With lambda that's only called if needed
    public Optional<Connection> getConnection() {
        return getPooledConnection()
            .or(() -> {
                log("Creating new connection");
                return createNewConnection();
            });
    }

    // Lazy evaluation - expensive operation only if needed
    public Optional<Data> getData(String key) {
        return getFromCache(key)
            .or(() -> expensiveDatabaseQuery(key));
    }
}`
        }
      ]
    },
    {
      id: 'filtering',
      name: 'Filtering & Conditions',
      icon: '🔍',
      color: '#10b981',
      description: 'Apply conditions with filter(). Check presence with isPresent() and isEmpty(). Conditional logic made functional.',
      details: [
        {
          name: 'filter() - Conditional Filtering',
          explanation: 'filter() keeps the value only if it matches a predicate. Returns empty Optional if predicate fails or original was empty. Great for validation and conditional processing.',
          codeExample: `class OptionalFilter {
    public Optional<User> getAdultUser(int userId) {
        return findUser(userId)
            .filter(user -> user.getAge() >= 18);  // Empty if under 18
    }

    // Chaining multiple conditions
    public Optional<String> getValidEmail(String email) {
        return Optional.ofNullable(email)
            .filter(e -> e.contains("@"))
            .filter(e -> e.length() > 5)
            .filter(e -> !e.endsWith(".temp"));
    }

    // Business logic filtering
    public Optional<Order> getShippableOrder(int orderId) {
        return findOrder(orderId)
            .filter(Order::isPaid)
            .filter(order -> order.getItems().size() > 0)
            .filter(order -> !order.isShipped());
    }

    // With map and filter
    public Optional<Integer> getPositiveBalance(User user) {
        return Optional.ofNullable(user)
            .map(User::getBalance)
            .filter(balance -> balance > 0);
    }
}`
        },
        {
          name: 'isPresent() & isEmpty()',
          explanation: 'isPresent() checks if value exists, isEmpty() checks if empty. Avoid using these for control flow - prefer functional methods. Use only when you truly need boolean checks.',
          codeExample: `class OptionalChecks {
    // BAD: defeats the purpose of Optional
    public String getBadEmail(User user) {
        Optional<String> email = Optional.ofNullable(user.getEmail());
        if (email.isPresent()) {
            return email.get();
        } else {
            return "no-email@example.com";
        }
    }

    // GOOD: use orElse instead
    public String getGoodEmail(User user) {
        return Optional.ofNullable(user.getEmail())
            .orElse("no-email@example.com");
    }

    // Valid use: logging
    public void logUserEmail(User user) {
        Optional<String> email = Optional.ofNullable(user.getEmail());
        if (email.isPresent()) {
            log("User has email: " + email.get());
        }
    }

    // isEmpty() - Java 11+
    public boolean hasNoAddress(User user) {
        return Optional.ofNullable(user.getAddress()).isEmpty();
    }
}`
        },
        {
          name: 'ifPresent() & ifPresentOrElse()',
          explanation: 'ifPresent() executes an action if value exists. ifPresentOrElse() (Java 9+) handles both present and empty cases. Better than isPresent() + get() pattern.',
          codeExample: `class OptionalActions {
    // Execute action if present
    public void sendEmail(int userId) {
        findUser(userId)
            .map(User::getEmail)
            .ifPresent(email -> emailService.send(email, "Hello!"));
    }

    // ifPresentOrElse - handle both cases (Java 9+)
    public void processUser(int userId) {
        findUser(userId).ifPresentOrElse(
            user -> {
                log("Found user: " + user.getName());
                user.setLastLogin(now());
            },
            () -> log("User not found: " + userId)
        );
    }

    // Side effects with method references
    public void logUserActivity(String email) {
        findUserByEmail(email)
            .ifPresent(this::recordActivity);
    }

    // Chaining transformations with ifPresent
    public void updateUserAddress(int userId, Address newAddress) {
        findUser(userId)
            .filter(User::isActive)
            .ifPresent(user -> user.setAddress(newAddress));
    }
}`
        }
      ]
    },
    {
      id: 'retrieval',
      name: 'Retrieving Values',
      icon: '📤',
      color: '#f59e0b',
      description: 'Get values safely with orElse(), orElseGet(), orElseThrow(). Avoid dangerous get() method.',
      details: [
        {
          name: 'orElse() - Default Value',
          explanation: 'orElse(defaultValue) returns the value if present, otherwise returns the default. The default value is ALWAYS evaluated, even if Optional is not empty. Use for simple defaults.',
          codeExample: `class OptionalOrElse {
    public String getUserName(int userId) {
        return findUser(userId)
            .map(User::getName)
            .orElse("Guest");  // Always returns a name
    }

    // With primitive defaults
    public int getUserAge(int userId) {
        return findUser(userId)
            .map(User::getAge)
            .orElse(0);
    }

    // CAUTION: default is always created
    public Config getConfig() {
        return loadConfig()
            .orElse(new Config());  // new Config() created every time!
    }

    // Use for constants and simple values
    public String getStatus(Order order) {
        return Optional.ofNullable(order)
            .map(Order::getStatus)
            .orElse("UNKNOWN");
    }
}`
        },
        {
          name: 'orElseGet() - Lazy Default',
          explanation: 'orElseGet(supplier) returns the value if present, otherwise calls the Supplier. The supplier is ONLY called if Optional is empty. Use for expensive operations or object creation.',
          codeExample: `class OptionalOrElseGet {
    // Lazy evaluation - only creates if needed
    public Config getConfig() {
        return loadConfig()
            .orElseGet(() -> new Config());  // Only created if empty
    }

    // Expensive operation only if needed
    public User getUser(int userId) {
        return findInCache(userId)
            .orElseGet(() -> loadFromDatabase(userId));
    }

    // Method reference for suppliers
    public List<Item> getItems() {
        return findItems()
            .orElseGet(Collections::emptyList);
    }

    // Complex lazy initialization
    public Connection getConnection() {
        return getPooledConnection()
            .orElseGet(() -> {
                log("Creating new connection");
                Connection conn = connectionFactory.create();
                pool.add(conn);
                return conn;
            });
    }
}`
        },
        {
          name: 'orElseThrow() - Exception',
          explanation: 'orElseThrow() throws an exception if Optional is empty. Can provide custom exception supplier. Use when absence is truly an error condition.',
          codeExample: `class OptionalOrElseThrow {
    // Throw if empty
    public User getUserOrThrow(int userId) {
        return findUser(userId)
            .orElseThrow(() ->
                new UserNotFoundException("User " + userId + " not found"));
    }

    // With different exceptions
    public Order getOrderOrThrow(int orderId) {
        return findOrder(orderId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid order"));
    }

    // No-arg version throws NoSuchElementException (Java 10+)
    public Config getMandatoryConfig() {
        return loadConfig()
            .orElseThrow();  // NoSuchElementException if empty
    }

    // In API endpoints
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable int id) {
        return userService.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User not found"));
    }
}`
        },
        {
          name: 'get() - AVOID!',
          explanation: 'get() returns the value if present, throws NoSuchElementException if empty. DANGEROUS - defeats the purpose of Optional. Almost always use orElse, orElseGet, or orElseThrow instead.',
          codeExample: `class OptionalGetAntiPattern {
    // BAD: can throw NoSuchElementException
    public String getBadExample(int userId) {
        Optional<User> user = findUser(userId);
        if (user.isPresent()) {
            return user.get().getName();  // Don't do this!
        }
        return "Unknown";
    }

    // GOOD: use orElse
    public String getGoodExample(int userId) {
        return findUser(userId)
            .map(User::getName)
            .orElse("Unknown");
    }

    // BAD: just a longer NullPointerException
    public void badUsage() {
        Optional<String> email = getEmail();
        String e = email.get();  // Throws if empty!
    }

    // Only acceptable use: when you absolutely know it's present
    public void rareValidUse() {
        Optional<Integer> max = Stream.of(1, 2, 3).max(Integer::compareTo);
        int value = max.get();  // Safe: max is guaranteed present
    }
}`
        }
      ]
    },
    {
      id: 'streams',
      name: 'Optional with Streams',
      icon: '🌊',
      color: '#06b6d4',
      description: 'Combine Optional with Stream API. Filter nulls, flatMap Optionals, and convert between Optional and Stream.',
      diagram: OptionalStreamDiagram,
      details: [
        {
          name: 'stream() - Convert to Stream',
          diagram: OptionalStreamDiagram,
          explanation: 'optional.stream() converts Optional to Stream (Java 9+). Returns stream with 0 or 1 element. Perfect for filtering out empties in stream pipelines.',
          codeExample: `import java.util.stream.*;

class OptionalStream {
    // Filter out empties in stream
    public List<String> getAllEmails(List<User> users) {
        return users.stream()
            .map(user -> Optional.ofNullable(user.getEmail()))
            .flatMap(Optional::stream)  // Removes empties!
            .collect(Collectors.toList());
    }

    // Alternative to filter + map
    public List<Integer> getAdultAges(List<User> users) {
        return users.stream()
            .map(User::getAge)
            .map(Optional::ofNullable)
            .flatMap(Optional::stream)
            .filter(age -> age >= 18)
            .collect(Collectors.toList());
    }

    // Chaining with other stream operations
    public Set<String> getActiveUserEmails() {
        return userRepository.findAll().stream()
            .filter(User::isActive)
            .map(User::getEmail)
            .flatMap(email -> Optional.ofNullable(email).stream())
            .map(String::toLowerCase)
            .collect(Collectors.toSet());
    }
}`
        },
        {
          name: 'flatMap with Streams',
          explanation: 'flatMap(Optional::stream) is the idiomatic way to filter out nulls/empties from streams. Replaces verbose filter + map patterns.',
          codeExample: `class StreamFlatMapOptional {
    // OLD WAY: verbose and unclear
    public List<Address> getAddressesOld(List<User> users) {
        return users.stream()
            .map(User::getAddress)
            .filter(Objects::nonNull)
            .collect(Collectors.toList());
    }

    // NEW WAY: clear and functional
    public List<Address> getAddresses(List<User> users) {
        return users.stream()
            .map(User::getAddress)
            .flatMap(addr -> Optional.ofNullable(addr).stream())
            .collect(Collectors.toList());
    }

    // Multiple levels of Optional
    public List<String> getManagerNames(List<Employee> employees) {
        return employees.stream()
            .map(Employee::getManager)           // Optional<Manager>
            .flatMap(Optional::stream)           // Stream<Manager>
            .map(Manager::getName)               // Stream<String>
            .collect(Collectors.toList());
    }
}`
        },
        {
          name: 'findFirst() & findAny()',
          explanation: 'Stream terminal operations that return Optional. findFirst() returns first element, findAny() returns any element (useful for parallel streams). Return empty Optional if stream is empty.',
          codeExample: `class StreamOptionalTerminal {
    // Find first matching element
    public Optional<User> findUserByEmail(String email) {
        return users.stream()
            .filter(user -> user.getEmail().equals(email))
            .findFirst();  // Optional<User>
    }

    // With orElse for default
    public User findOrDefault(String email) {
        return users.stream()
            .filter(user -> user.getEmail().equals(email))
            .findFirst()
            .orElse(createGuestUser());
    }

    // Parallel streams with findAny
    public Optional<Product> findExpensiveProduct() {
        return products.parallelStream()
            .filter(p -> p.getPrice() > 1000)
            .findAny();  // Faster in parallel
    }

    // Chaining with Optional methods
    public String getFirstAdminName() {
        return users.stream()
            .filter(User::isAdmin)
            .findFirst()
            .map(User::getName)
            .orElse("No admin found");
    }
}`
        }
      ]
    },
    {
      id: 'best-practices',
      name: 'Best Practices',
      icon: '✨',
      color: '#ec4899',
      description: 'When to use Optional, common antipatterns, and design guidelines for clean null-safe code.',
      details: [
        {
          name: 'When to Use Optional',
          explanation: 'Use Optional for return types when a value may be absent. DO use for method returns. DO NOT use for fields, parameters, or collections. Optional is not Serializable.',
          codeExample: `class OptionalGoodPractices {
    // ✓ GOOD: Optional return type
    public Optional<User> findUserById(int id) {
        return Optional.ofNullable(repository.find(id));
    }

    // ✓ GOOD: Optional in stream pipeline
    public String getUserEmail(int id) {
        return findUserById(id)
            .map(User::getEmail)
            .orElse("unknown@example.com");
    }

    // ✗ BAD: Optional parameter
    public void updateUser(Optional<User> user) {  // Don't!
        // Just use: updateUser(User user)
        // and check for null if needed
    }

    // ✗ BAD: Optional field
    class BadUser {
        private Optional<String> email;  // Don't!
        // Just use: private String email;
    }

    // ✗ BAD: Optional in collections
    List<Optional<String>> emails;  // Don't!
    // Just use: List<String> and filter nulls
}`
        },
        {
          name: 'Avoid Null Checks on Optional',
          explanation: 'Never check if Optional is null - defeats the purpose. Optional itself should never be null. Always initialize with empty() if needed.',
          codeExample: `class OptionalNullCheck {
    // ✗ BAD: checking Optional for null
    public String getBadName(Optional<User> user) {
        if (user != null && user.isPresent()) {  // Don't!
            return user.get().getName();
        }
        return "Unknown";
    }

    // ✓ GOOD: trust Optional, use its methods
    public String getGoodName(Optional<User> user) {
        return user
            .map(User::getName)
            .orElse("Unknown");
    }

    // ✓ GOOD: never return null Optional
    public Optional<User> findUser(int id) {
        User user = repository.find(id);
        return Optional.ofNullable(user);  // Returns empty, never null
    }

    // ✓ GOOD: initialize fields to empty
    class UserService {
        private Optional<Config> config = Optional.empty();
    }
}`
        },
        {
          name: 'Optional vs Null',
          explanation: 'Optional makes absence explicit in API contracts. Use for return types to force callers to handle absence. For internal code, simple null checks may be more pragmatic.',
          codeExample: `class OptionalVsNull {
    // Public API: use Optional
    public Optional<User> findUserByEmail(String email) {
        // Clear contract: user might not exist
        return Optional.ofNullable(repository.findByEmail(email));
    }

    // Internal method: null is OK
    private User loadFromCache(String id) {
        // Internal implementation detail
        return cache.get(id);  // returns null if not found
    }

    // Public API forces handling
    public void example() {
        // Caller must handle absence
        findUserByEmail("test@test.com")
            .ifPresent(this::sendWelcomeEmail);
    }

    // Performance: Optional has overhead
    // For tight loops, null might be better
    private int sumAges(List<User> users) {
        int sum = 0;
        for (User user : users) {
            if (user != null) {  // Simple and fast
                sum += user.getAge();
            }
        }
        return sum;
    }
}`
        },
        {
          name: 'Optional Anti-patterns',
          explanation: 'Common mistakes: using get() without checking, Optional.of(null), Optional fields, nested Optionals. These defeat the purpose and make code worse.',
          codeExample: `class OptionalAntiPatterns {
    // ✗ BAD: Optional.of with nullable
    public Optional<String> bad1(String value) {
        return Optional.of(value);  // NPE if value is null!
        // Use: Optional.ofNullable(value)
    }

    // ✗ BAD: isPresent + get
    public String bad2(Optional<User> user) {
        if (user.isPresent()) {
            return user.get().getName();
        }
        return "Unknown";
        // Use: user.map(User::getName).orElse("Unknown")
    }

    // ✗ BAD: returning null Optional
    public Optional<User> bad3(int id) {
        if (id < 0) return null;  // Never do this!
        return findUser(id);
        // Use: return Optional.empty()
    }

    // ✗ BAD: Optional in Optional
    public Optional<Optional<String>> bad4() {
        // Nested Optionals are confusing
        // Use: flatMap to flatten
    }

    // ✗ BAD: Optional with collections
    public Optional<List<User>> bad5() {
        // Return empty list instead of Optional
        return Optional.of(Collections.emptyList());
        // Use: just return List, never null
    }
}`
        }
      ]
    }
  ]

  // =============================================================================
  // NAVIGATION HANDLERS
  // =============================================================================

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

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

  // =============================================================================
  // BREADCRUMB CONFIGURATION
  // =============================================================================

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'Java', icon: '☕', page: 'Java' },
      { name: 'Optional', icon: '🎁', page: 'Optional' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index, item) => {
    if (index === 0) {
      onBack()
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)
    }
  }

  // =============================================================================
  // KEYBOARD NAVIGATION
  // =============================================================================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (selectedConcept) {
          setSelectedConceptIndex(null)
        } else {
          onBack()
        }
      } else if (e.key === 'ArrowLeft' && selectedConceptIndex !== null) {
        e.preventDefault()
        handlePreviousConcept()
      } else if (e.key === 'ArrowRight' && selectedConceptIndex !== null) {
        e.preventDefault()
        handleNextConcept()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

  // =============================================================================
  // STYLES
  // =============================================================================

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(139, 92, 246, 0.2)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '0.5rem',
    color: '#a78bfa',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Java Optional</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Java
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={OPTIONAL_COLORS}
        />
      </div>

      {/* Collapsible Sidebar for quick concept navigation */}
      <CollapsibleSidebar
        items={concepts}
        selectedIndex={selectedConceptIndex ?? -1}
        onSelect={(index) => {
          setSelectedConceptIndex(index)
          setSelectedDetailIndex(0)
        }}
        title="Concepts"
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.icon}
        primaryColor={OPTIONAL_COLORS.primary}
      />


      {/* Subtitle */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem', textAlign: 'center' }}>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: 0 }}>
          Master null-safety with Optional - eliminate NullPointerException and write cleaner, more expressive code
        </p>
      </div>

      {/* Concept Cards Grid */}
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

      {/* Modal for Selected Concept */}
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
              maxWidth: '1600px',
              maxHeight: '95vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`,
              width: '100%'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu || onBack}
              colors={OPTIONAL_COLORS}
            />

            {/* Modal Header with Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #334155'
            }}>
              <h2 style={{
                color: selectedConcept.color,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.25rem'
              }}>
                <span>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button
                  onClick={handlePreviousConcept}
                  disabled={selectedConceptIndex === 0}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >←</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>
                  {selectedConceptIndex + 1}/{concepts.length}
                </span>
                <button
                  onClick={handleNextConcept}
                  disabled={selectedConceptIndex === concepts.length - 1}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >→</button>
                <button
                  onClick={() => setSelectedConceptIndex(null)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '0.375rem',
                    color: '#f87171',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    marginLeft: '0.5rem'
                  }}
                >✕</button>
              </div>
            </div>

            {/* Subtopic Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDetailIndex(i)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)',
                    border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`,
                    borderRadius: '0.5rem',
                    color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: selectedDetailIndex === i ? '600' : '400',
                    transition: 'all 0.2s'
                  }}
                >
                  {detail.name}
                </button>
              ))}
            </div>

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = detail.diagram || selectedConcept.diagram
              return (
                <div>
                  {/* Diagram */}
                  {DiagramComponent && (
                    <div style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      border: '1px solid #334155'
                    }}>
                      <DiagramComponent />
                    </div>
                  )}

                  {/* Detail Name */}
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                    {detail.name}
                  </h3>

                  {/* Explanation */}
                  <p style={{
                    color: '#e2e8f0',
                    lineHeight: '1.8',
                    marginBottom: '1rem',
                    background: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'left'
                  }}>
                    {detail.explanation}
                  </p>

                  {/* Code Example */}
                  {detail.codeExample && (
                    <SyntaxHighlighter
                      language="java"
                      style={vscDarkPlus}
                      customStyle={{
                        padding: '1rem',
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.8rem',
                        border: '1px solid #334155',
                        background: '#0f172a'
                      }}
                      codeTagProps={{ style: { background: 'transparent' } }}
                    >
                      {detail.codeExample}
                    </SyntaxHighlighter>
                  )}
                </div>
              )
            })()}

          </div>
        </div>
      )}
    </div>
  )
}

export default Optional

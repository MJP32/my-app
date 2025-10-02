import { useState, useEffect, useRef } from 'react'

// Simple syntax highlighter for Java code
const SyntaxHighlighter = ({ code }) => {
  const highlightJava = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    // Protect comments
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

    // Apply syntax highlighting
    highlighted = highlighted
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ArrayList|HashMap|Optional|Stream|Exception|RuntimeException|ResponseEntity|HttpStatus|RequestMapping|GetMapping|PostMapping|PutMapping|DeleteMapping|PathVariable|RequestParam|RequestBody|ResponseBody|RestController|CrossOrigin)\b/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')
      .replace(/\b(\d+\.?\d*[fLdD]?)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/\b([a-z_]\w*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')

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

function RestAPI({ onBack }) {
  const [selectedTopic, setSelectedTopic] = useState(null)
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

  const restApiTopics = [
    {
      id: 1,
      name: 'REST Principles',
      icon: '📐',
      color: '#3b82f6',
      description: 'Fundamental REST architectural constraints',
      content: {
        explanation: 'REST (Representational State Transfer) is an architectural style for distributed hypermedia systems. It defines six constraints: Client-Server separation, Stateless communication, Cacheable responses, Uniform Interface, Layered System, and optional Code-On-Demand. REST uses HTTP as the application protocol, treating everything as resources identified by URIs. Resources are manipulated through standard HTTP methods, with representations transferred between client and server.',
        keyPoints: [
          'Client-Server: Separation of concerns - UI independent from data storage',
          'Stateless: Each request contains all information needed, no session state on server',
          'Cacheable: Responses must define themselves as cacheable or non-cacheable',
          'Uniform Interface: Standardized communication through resources, HTTP methods, and hypermedia',
          'Layered System: Client cannot tell if connected directly to end server (proxies, load balancers)',
          'Resource-based URIs: Nouns not verbs - /users not /getUsers',
          'Richardson Maturity Model: Level 0 (HTTP), Level 1 (Resources), Level 2 (HTTP Verbs), Level 3 (HATEOAS)',
          'Idempotency: GET, PUT, DELETE are idempotent - same result when called multiple times'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Resource-Based URIs and Controller Design
// ═══════════════════════════════════════════════════════════════════════════

// Resource-based URIs (nouns, not verbs)
// Good: /api/users, /api/users/123, /api/users/123/orders
// Bad: /api/getUser, /api/createUser, /api/deleteUser

@RestController
@RequestMapping("/api/users")
public class UserController {
  // Controller methods follow REST principles
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Stateless Communication Pattern
// ═══════════════════════════════════════════════════════════════════════════

// Each request is independent - no session state stored on server
@GetMapping("/{id}")
public ResponseEntity<User> getUser(
  @PathVariable Long id,
  @RequestHeader("Authorization") String token // Auth in each request
) {
  // Validate token on every request
  if (!authService.validateToken(token)) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
  }

  User user = userService.findById(id)
    .orElseThrow(() -> new UserNotFoundException(id));
  return ResponseEntity.ok(user);
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Cacheable Responses
// ═══════════════════════════════════════════════════════════════════════════

@GetMapping("/{id}")
public ResponseEntity<User> getUserCacheable(@PathVariable Long id) {
  User user = userService.findById(id)
    .orElseThrow(() -> new UserNotFoundException(id));

  return ResponseEntity.ok()
    .cacheControl(CacheControl.maxAge(60, TimeUnit.SECONDS))
    .eTag(String.valueOf(user.getVersion()))
    .body(user);
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Idempotency and Uniform Interface
// ═══════════════════════════════════════════════════════════════════════════

// Idempotent PUT - same result regardless of calls
@PutMapping("/{id}")
public ResponseEntity<User> updateUser(
  @PathVariable Long id,
  @RequestBody User user
) {
  user.setId(id);
  User updated = userService.update(user);
  // Calling this 10 times produces same result
  return ResponseEntity.ok(updated);
}

// Uniform Interface - standard HTTP methods
@PostMapping  // Create
public ResponseEntity<User> createUser(@RequestBody User user) {
  User created = userService.create(user);
  return ResponseEntity
    .status(HttpStatus.CREATED)
    .location(URI.create("/api/users/" + created.getId()))
    .body(created);
}

@GetMapping  // Read collection
public ResponseEntity<List<User>> getAllUsers() {
  return ResponseEntity.ok(userService.findAll());
}

@GetMapping("/{id}")  // Read single
public ResponseEntity<User> getUser(@PathVariable Long id) {
  return userService.findById(id)
    .map(ResponseEntity::ok)
    .orElse(ResponseEntity.notFound().build());
}

@PatchMapping("/{id}")  // Partial update
public ResponseEntity<User> patchUser(
  @PathVariable Long id,
  @RequestBody Map<String, Object> updates
) {
  User user = userService.partialUpdate(id, updates);
  return ResponseEntity.ok(user);
}

@DeleteMapping("/{id}")  // Delete
public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
  userService.delete(id);
  return ResponseEntity.noContent().build();
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Richardson Maturity Model
// ═══════════════════════════════════════════════════════════════════════════

// Level 0: Single URI, single HTTP method (SOAP-like)
@PostMapping("/api")
public Response handleRequest(@RequestBody Request request) {
  // All operations through POST
}

// Level 1: Multiple resource URIs
@PostMapping("/api/users")
@PostMapping("/api/orders")

// Level 2: HTTP verbs (standard REST)
@GetMapping("/api/users/{id}")
@PostMapping("/api/users")
@PutMapping("/api/users/{id}")
@DeleteMapping("/api/users/{id}")

// Level 3: HATEOAS - hypermedia links
@GetMapping("/api/users/{id}")
public EntityModel<User> getUserWithLinks(@PathVariable Long id) {
  User user = userService.findById(id).orElseThrow();

  return EntityModel.of(user,
    linkTo(methodOn(UserController.class).getUser(id)).withSelfRel(),
    linkTo(methodOn(UserController.class).getAllUsers()).withRel("users"),
    linkTo(methodOn(OrderController.class).getUserOrders(id)).withRel("orders")
  );
}

// Output:
/*
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "_links": {
    "self": { "href": "/api/users/1" },
    "users": { "href": "/api/users" },
    "orders": { "href": "/api/users/1/orders" }
  }
}
*/

// ═══════════════════════════════════════════════════════════════════════════
// ✦ REST vs SOAP Comparison
// ═══════════════════════════════════════════════════════════════════════════

/*
REST:
- Architectural style
- Uses HTTP methods
- Multiple formats (JSON, XML)
- Stateless
- Lightweight, faster
- Better caching

SOAP:
- Protocol with strict standards
- Only POST method
- XML only
- Can be stateful
- Heavy, slower
- Built-in security (WS-Security)
*/

// ═══════════════════════════════════════════════════════════════════════════
// ✦ REST Best Practices
// ═══════════════════════════════════════════════════════════════════════════

@RestController
@RequestMapping("/api/v1/users")  // Version in URI
@CrossOrigin(origins = "http://localhost:3000")
public class UserRestController {

  // Use proper status codes
  @PostMapping
  public ResponseEntity<User> create(@Valid @RequestBody User user) {
    User created = userService.create(user);
    return ResponseEntity
      .status(HttpStatus.CREATED)  // 201 Created
      .header("Location", "/api/v1/users/" + created.getId())
      .body(created);
  }

  // Return appropriate empty responses
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    userService.delete(id);
    return ResponseEntity.noContent().build();  // 204 No Content
  }

  // Consistent error responses
  @ExceptionHandler(UserNotFoundException.class)
  public ResponseEntity<ErrorResponse> handleNotFound(
    UserNotFoundException ex
  ) {
    ErrorResponse error = new ErrorResponse(
      HttpStatus.NOT_FOUND.value(),
      ex.getMessage(),
      Instant.now()
    );
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
  }
}`
      }
    },
    {
      id: 2,
      name: 'HTTP Methods & Status Codes',
      icon: '🔤',
      color: '#10b981',
      description: 'HTTP verbs and response codes',
      content: {
        explanation: 'HTTP methods define operations on resources: GET retrieves, POST creates, PUT replaces, PATCH updates partially, DELETE removes. Safe methods (GET, HEAD, OPTIONS) do not modify resources. Idempotent methods (GET, PUT, DELETE) produce the same result when called multiple times. HTTP status codes communicate results: 2xx success, 3xx redirection, 4xx client errors, 5xx server errors. Proper method and status code usage is crucial for RESTful APIs.',
        keyPoints: [
          'GET: Retrieve resource(s) - safe, idempotent, cacheable',
          'POST: Create new resource - not safe, not idempotent',
          'PUT: Replace entire resource - idempotent, requires full representation',
          'PATCH: Partial update - not idempotent, updates specific fields',
          'DELETE: Remove resource - idempotent',
          '2xx Success: 200 OK, 201 Created, 204 No Content',
          '4xx Client Error: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found',
          '5xx Server Error: 500 Internal Server Error, 503 Service Unavailable'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ GET Method - Retrieving Resources
// ═══════════════════════════════════════════════════════════════════════════

@RestController
@RequestMapping("/api/users")
public class UserController {

  // GET - Retrieve resources
  // Safe: No side effects
  // Idempotent: Same result on multiple calls
  // Cacheable: Can be cached
  @GetMapping
  public ResponseEntity<List<User>> getAllUsers(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size,
    @RequestParam(required = false) String sort
  ) {
    List<User> users = userService.findAll(page, size, sort);
    return ResponseEntity.ok(users);  // 200 OK
  }

  @GetMapping("/{id}")
  public ResponseEntity<User> getUser(@PathVariable Long id) {
    return userService.findById(id)
      .map(user -> ResponseEntity.ok(user))  // 200 OK
      .orElse(ResponseEntity.notFound().build());  // 404 Not Found
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ POST Method - Creating Resources
// ═══════════════════════════════════════════════════════════════════════════

// POST - Create new resource
// Not safe: Modifies state
// Not idempotent: Multiple calls create multiple resources
@PostMapping
public ResponseEntity<User> createUser(
  @Valid @RequestBody User user
) {
  User created = userService.create(user);

  // 201 Created with Location header
  return ResponseEntity
    .status(HttpStatus.CREATED)
    .location(URI.create("/api/users/" + created.getId()))
    .body(created);
}

// POST returns 409 Conflict if resource exists
@PostMapping
public ResponseEntity<User> createUserWithDuplicateCheck(
  @RequestBody User user
) {
  if (userService.existsByEmail(user.getEmail())) {
    return ResponseEntity
      .status(HttpStatus.CONFLICT)  // 409 Conflict
      .build();
  }
  User created = userService.create(user);
  return ResponseEntity.status(HttpStatus.CREATED).body(created);
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ PUT Method - Replacing Resources
// ═══════════════════════════════════════════════════════════════════════════

// PUT - Replace entire resource
// Idempotent: Same result on multiple calls
// Requires complete representation
@PutMapping("/{id}")
public ResponseEntity<User> updateUser(
  @PathVariable Long id,
  @Valid @RequestBody User user
) {
  if (!userService.exists(id)) {
    return ResponseEntity.notFound().build();  // 404 Not Found
  }

  user.setId(id);
  User updated = userService.update(user);
  return ResponseEntity.ok(updated);  // 200 OK
}

// PUT can create resource if it doesn't exist (Upsert)
@PutMapping("/{id}")
public ResponseEntity<User> upsertUser(
  @PathVariable Long id,
  @RequestBody User user
) {
  user.setId(id);
  if (userService.exists(id)) {
    User updated = userService.update(user);
    return ResponseEntity.ok(updated);  // 200 OK
  } else {
    User created = userService.create(user);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);  // 201
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ PATCH and DELETE Methods
// ═══════════════════════════════════════════════════════════════════════════

// PATCH - Partial update
// Updates only specified fields
@PatchMapping("/{id}")
public ResponseEntity<User> patchUser(
  @PathVariable Long id,
  @RequestBody Map<String, Object> updates
) {
  if (!userService.exists(id)) {
    return ResponseEntity.notFound().build();
  }

  User user = userService.partialUpdate(id, updates);
  return ResponseEntity.ok(user);  // 200 OK
}

// DELETE - Remove resource
// Idempotent: Same result on multiple calls
@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
  if (!userService.exists(id)) {
    return ResponseEntity.notFound().build();  // 404 Not Found
  }

  userService.delete(id);
  return ResponseEntity.noContent().build();  // 204 No Content
}

// DELETE is idempotent - calling on non-existent resource
@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteUserIdempotent(@PathVariable Long id) {
  userService.delete(id);
  // Returns 204 even if resource didn't exist
  return ResponseEntity.noContent().build();
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ HTTP Status Codes - Success (2xx)
// ═══════════════════════════════════════════════════════════════════════════

@RestController
@RequestMapping("/api/products")
public class ProductController {

  // 200 OK - Success with body
  @GetMapping("/{id}")
  public ResponseEntity<Product> getProduct(@PathVariable Long id) {
    Product product = productService.findById(id).orElseThrow();
    return ResponseEntity.ok(product);  // 200 OK
  }

  // 201 Created - Resource created successfully
  @PostMapping
  public ResponseEntity<Product> createProduct(@RequestBody Product product) {
    Product created = productService.create(product);
    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(created);
  }

  // 204 No Content - Success with no response body
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
    productService.delete(id);
    return ResponseEntity.noContent().build();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ HTTP Status Codes - Client Errors (4xx)
// ═══════════════════════════════════════════════════════════════════════════

// 400 Bad Request - Invalid input
@PostMapping
public ResponseEntity<Product> createWithValidation(
  @Valid @RequestBody Product product,
  BindingResult result
) {
  if (result.hasErrors()) {
    return ResponseEntity.badRequest().build();
  }
  return ResponseEntity.status(HttpStatus.CREATED)
    .body(productService.create(product));
}

// 401 Unauthorized & 403 Forbidden & 404 Not Found
@GetMapping("/secure/{id}")
public ResponseEntity<Product> getSecureProduct(
  @PathVariable Long id,
  @RequestHeader("Authorization") String token
) {
  if (token == null || token.isEmpty()) {
    // 401 Unauthorized - Authentication required
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
  }

  if (!authService.hasPermission(token, "READ_PRODUCT")) {
    // 403 Forbidden - Authenticated but not authorized
    return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
  }

  return productService.findById(id)
    .map(ResponseEntity::ok)
    .orElse(ResponseEntity.notFound().build());  // 404 Not Found
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ HTTP Status Codes - Server Errors (5xx) and Content Negotiation
// ═══════════════════════════════════════════════════════════════════════════

// 5xx Server Error Codes
@GetMapping("/{id}")
public ResponseEntity<Product> getProductWithErrorHandling(
  @PathVariable Long id
) {
  try {
    Product product = productService.findById(id).orElseThrow();
    return ResponseEntity.ok(product);
  } catch (DatabaseException ex) {
    // 500 Internal Server Error
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
  } catch (ServiceUnavailableException ex) {
    // 503 Service Unavailable
    return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).build();
  }
}

// Content Negotiation - JSON or XML based on Accept header
@GetMapping(value = "/{id}",
  produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE}
)
public ResponseEntity<User> getUser(
  @PathVariable Long id,
  @RequestHeader("Accept") String accept
) {
  User user = userService.findById(id).orElseThrow();
  return ResponseEntity.ok(user);
}

// Custom Response Headers
@GetMapping("/{id}")
public ResponseEntity<User> getUserWithHeaders(@PathVariable Long id) {
  User user = userService.findById(id).orElseThrow();

  return ResponseEntity.ok()
    .header("X-Custom-Header", "CustomValue")
    .header("X-Rate-Limit", "100")
    .header("X-Rate-Remaining", "95")
    .lastModified(user.getUpdatedAt())
    .cacheControl(CacheControl.maxAge(300, TimeUnit.SECONDS))
    .body(user);
}

// Common Status Codes Summary
/*
200 OK - Request succeeded
201 Created - Resource created
204 No Content - Success, no body
400 Bad Request - Invalid syntax
401 Unauthorized - Authentication required
403 Forbidden - Authenticated but no permission
404 Not Found - Resource doesn't exist
409 Conflict - Request conflicts with current state
500 Internal Server Error - Server error
503 Service Unavailable - Server temporarily unavailable
*/`
      }
    },
    {
      id: 3,
      name: 'Resource Design',
      icon: '🎯',
      color: '#f59e0b',
      description: 'URI design and resource modeling',
      content: {
        explanation: 'Resource design is the art of modeling your API around resources (nouns) rather than actions (verbs). Use plural nouns for collections (/users), singular identifiers for specific resources (/users/123). Nested resources represent relationships (/users/123/orders). Query parameters enable filtering, sorting, and pagination (?status=active&sort=name&page=1). Resource versioning ensures API evolution without breaking existing clients. Good URI design is intuitive, consistent, and hierarchical.',
        keyPoints: [
          'Use plural nouns: /users, /products, /orders (not /user, /getUser)',
          'Hierarchical URIs: /users/123/orders/456 for nested resources',
          'Query parameters for filtering: /users?status=active&role=admin',
          'Pagination: /users?page=1&size=20 or /users?offset=0&limit=20',
          'Sorting: /users?sort=name,asc or /users?sort=-createdAt (descending)',
          'Path parameters for IDs: /users/{id}, query for filters: ?status=active',
          'Sub-resources: /users/123/orders, /users/123/addresses',
          'Versioning: /api/v1/users, /api/v2/users'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Resource Naming Conventions
// ═══════════════════════════════════════════════════════════════════════════

// Use nouns, not verbs
@RestController
@RequestMapping("/api/v1/users")  // Good: plural noun
public class UserController {
  // Bad examples:
  // /getUsers, /createUser, /deleteUser - avoid verbs
  // /user - use plural
  // /userInfo, /userData - redundant
}

// Collection and Item Resources
@RestController
@RequestMapping("/api/users")
public class UserResourceController {

  // Collection resource - GET /api/users
  @GetMapping
  public ResponseEntity<List<User>> getAllUsers() {
    return ResponseEntity.ok(userService.findAll());
  }

  // Item resource - GET /api/users/123
  @GetMapping("/{id}")
  public ResponseEntity<User> getUser(@PathVariable Long id) {
    return userService.findById(id)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  // Create in collection - POST /api/users
  @PostMapping
  public ResponseEntity<User> createUser(@RequestBody User user) {
    User created = userService.create(user);
    return ResponseEntity
      .created(URI.create("/api/users/" + created.getId()))
      .body(created);
  }

  // Update item - PUT /api/users/123
  @PutMapping("/{id}")
  public ResponseEntity<User> updateUser(
    @PathVariable Long id,
    @RequestBody User user
  ) {
    user.setId(id);
    return ResponseEntity.ok(userService.update(user));
  }

  // Delete item - DELETE /api/users/123
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.delete(id);
    return ResponseEntity.noContent().build();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Nested Resources and Relationships
// ═══════════════════════════════════════════════════════════════════════════

@RestController
@RequestMapping("/api/users/{userId}")
public class UserRelatedResourceController {

  // User's orders - GET /api/users/123/orders
  @GetMapping("/orders")
  public ResponseEntity<List<Order>> getUserOrders(
    @PathVariable Long userId
  ) {
    List<Order> orders = orderService.findByUserId(userId);
    return ResponseEntity.ok(orders);
  }

  // Specific order - GET /api/users/123/orders/456
  @GetMapping("/orders/{orderId}")
  public ResponseEntity<Order> getUserOrder(
    @PathVariable Long userId,
    @PathVariable Long orderId
  ) {
    return orderService.findByUserIdAndOrderId(userId, orderId)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  // Create order for user - POST /api/users/123/orders
  @PostMapping("/orders")
  public ResponseEntity<Order> createUserOrder(
    @PathVariable Long userId,
    @RequestBody Order order
  ) {
    order.setUserId(userId);
    Order created = orderService.create(order);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }

  // User's addresses
  @GetMapping("/addresses")
  public ResponseEntity<List<Address>> getUserAddresses(
    @PathVariable Long userId
  ) {
    return ResponseEntity.ok(addressService.findByUserId(userId));
  }

  // User's profile - singular sub-resource
  @GetMapping("/profile")
  public ResponseEntity<UserProfile> getUserProfile(
    @PathVariable Long userId
  ) {
    return profileService.findByUserId(userId)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Query Parameters (Filtering, Pagination, Sorting)
// ═══════════════════════════════════════════════════════════════════════════

// Filtering with Query Parameters
@RestController
@RequestMapping("/api/products")
public class ProductFilterController {

  // Multiple filters - GET /api/products?category=electronics&minPrice=100&maxPrice=500
  @GetMapping
  public ResponseEntity<List<Product>> getProducts(
    @RequestParam(required = false) String category,
    @RequestParam(required = false) Double minPrice,
    @RequestParam(required = false) Double maxPrice,
    @RequestParam(required = false) String brand,
    @RequestParam(required = false) Boolean inStock
  ) {
    List<Product> products = productService.findByFilters(
      category, minPrice, maxPrice, brand, inStock
    );
    return ResponseEntity.ok(products);
  }

  // Search - GET /api/products?q=laptop
  @GetMapping
  public ResponseEntity<List<Product>> searchProducts(
    @RequestParam(required = false) String q
  ) {
    if (q != null && !q.isEmpty()) {
      return ResponseEntity.ok(productService.search(q));
    }
    return ResponseEntity.ok(productService.findAll());
  }

  // Status filter - GET /api/users?status=active
  @GetMapping("/users")
  public ResponseEntity<List<User>> getUsersByStatus(
    @RequestParam(required = false) String status
  ) {
    if (status != null) {
      return ResponseEntity.ok(userService.findByStatus(status));
    }
    return ResponseEntity.ok(userService.findAll());
  }
}

// Pagination
@RestController
@RequestMapping("/api/users")
public class UserPaginationController {

  // Offset-based pagination - GET /api/users?page=0&size=20
  @GetMapping
  public ResponseEntity<Page<User>> getUsers(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size
  ) {
    Pageable pageable = PageRequest.of(page, size);
    Page<User> users = userService.findAll(pageable);

    return ResponseEntity.ok()
      .header("X-Total-Count", String.valueOf(users.getTotalElements()))
      .header("X-Total-Pages", String.valueOf(users.getTotalPages()))
      .body(users);
  }

  // Cursor-based pagination - GET /api/users?limit=20&cursor=abc123
  @GetMapping("/cursor")
  public ResponseEntity<CursorPage<User>> getUsersCursor(
    @RequestParam(defaultValue = "20") int limit,
    @RequestParam(required = false) String cursor
  ) {
    CursorPage<User> users = userService.findWithCursor(limit, cursor);
    return ResponseEntity.ok(users);
  }
}

// Sorting
@RestController
@RequestMapping("/api/users")
public class UserSortController {

  // Single field - GET /api/users?sort=name
  // Multiple fields - GET /api/users?sort=name,email
  // Descending - GET /api/users?sort=createdAt,desc
  @GetMapping
  public ResponseEntity<List<User>> getUsers(
    @RequestParam(required = false) String sort
  ) {
    Sort sortOrder = Sort.unsorted();

    if (sort != null) {
      String[] parts = sort.split(",");
      String field = parts[0];
      Sort.Direction direction = parts.length > 1 && parts[1].equals("desc")
        ? Sort.Direction.DESC
        : Sort.Direction.ASC;

      sortOrder = Sort.by(direction, field);
    }

    List<User> users = userService.findAll(sortOrder);
    return ResponseEntity.ok(users);
  }

  // Multiple sort fields - GET /api/users?sort=status&sort=name,desc
  @GetMapping("/multi-sort")
  public ResponseEntity<List<User>> getUsersMultiSort(
    @RequestParam(required = false) List<String> sort
  ) {
    Sort sortOrder = Sort.unsorted();

    if (sort != null && !sort.isEmpty()) {
      List<Sort.Order> orders = sort.stream()
        .map(s -> {
          String[] parts = s.split(",");
          String field = parts[0];
          Sort.Direction dir = parts.length > 1 && parts[1].equals("desc")
            ? Sort.Direction.DESC
            : Sort.Direction.ASC;
          return new Sort.Order(dir, field);
        })
        .collect(Collectors.toList());

      sortOrder = Sort.by(orders);
    }

    return ResponseEntity.ok(userService.findAll(sortOrder));
  }
}

// Resource Naming Examples
/*
Good:
  GET    /api/users
  POST   /api/users
  GET    /api/users/123
  PUT    /api/users/123
  DELETE /api/users/123
  GET    /api/users/123/orders
  GET    /api/users/123/orders/456
  GET    /api/products?category=electronics&inStock=true
  GET    /api/users?page=0&size=20&sort=name,asc

Bad:
  /api/getUsers
  /api/createUser
  /api/user (should be plural)
  /api/users/delete/123
  /api/userOrders/123
*/`
      }
    },
    {
      id: 4,
      name: 'Spring Boot REST',
      icon: '🍃',
      color: '#8b5cf6',
      description: 'Building REST APIs with Spring Boot',
      content: {
        explanation: 'Spring Boot simplifies REST API development with powerful annotations. @RestController combines @Controller and @ResponseBody, automatically serializing return values to JSON. Mapping annotations (@GetMapping, @PostMapping, etc.) bind HTTP methods to handler methods. @PathVariable extracts URI template variables, @RequestParam reads query parameters, @RequestBody deserializes request payloads. ResponseEntity provides full control over HTTP responses. @ExceptionHandler centralizes error handling, while CORS configuration enables cross-origin requests.',
        keyPoints: [
          '@RestController combines @Controller and @ResponseBody for REST endpoints',
          '@RequestMapping defines base URI and can specify HTTP methods, consumes/produces',
          '@GetMapping, @PostMapping, @PutMapping, @DeleteMapping, @PatchMapping for HTTP methods',
          '@PathVariable extracts values from URI path: /users/{id}',
          '@RequestParam reads query parameters: /users?status=active',
          '@RequestBody deserializes JSON/XML request body to Java object',
          'ResponseEntity<T> provides full control: status code, headers, body',
          '@ExceptionHandler handles exceptions and returns error responses'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Entity and Repository Layer
// ═══════════════════════════════════════════════════════════════════════════

// Entity
@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true, nullable = false)
  private String email;

  private String name;
  private String status;

  @CreatedDate
  private LocalDateTime createdAt;

  // Constructors, getters, setters
}

// Repository
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmail(String email);
  List<User> findByStatus(String status);
  boolean existsByEmail(String email);
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Service Layer Implementation
// ═══════════════════════════════════════════════════════════════════════════
@Service
@Transactional
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public List<User> findAll() {
    return userRepository.findAll();
  }

  public Optional<User> findById(Long id) {
    return userRepository.findById(id);
  }

  public User create(User user) {
    user.setStatus("ACTIVE");
    return userRepository.save(user);
  }

  public User update(Long id, User user) {
    User existing = userRepository.findById(id)
      .orElseThrow(() -> new UserNotFoundException(id));

    existing.setName(user.getName());
    existing.setEmail(user.getEmail());
    return userRepository.save(existing);
  }

  public void delete(Long id) {
    if (!userRepository.existsById(id)) {
      throw new UserNotFoundException(id);
    }
    userRepository.deleteById(id);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ REST Controller with CRUD Operations
// ═══════════════════════════════════════════════════════════════════════════
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

  @Autowired
  private UserService userService;

  // GET all users - /api/users
  @GetMapping
  public ResponseEntity<List<User>> getAllUsers() {
    List<User> users = userService.findAll();
    return ResponseEntity.ok(users);
  }

  // GET user by ID - /api/users/123
  @GetMapping("/{id}")
  public ResponseEntity<User> getUser(@PathVariable Long id) {
    return userService.findById(id)
      .map(user -> ResponseEntity.ok(user))
      .orElse(ResponseEntity.notFound().build());
  }

  // GET with query parameters - /api/users?status=active
  @GetMapping("/search")
  public ResponseEntity<List<User>> getUsersByStatus(
    @RequestParam String status
  ) {
    List<User> users = userService.findByStatus(status);
    return ResponseEntity.ok(users);
  }

  // POST create user - /api/users
  @PostMapping
  public ResponseEntity<User> createUser(
    @Valid @RequestBody User user
  ) {
    User created = userService.create(user);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .location(URI.create("/api/users/" + created.getId()))
      .body(created);
  }

  // PUT update user - /api/users/123
  @PutMapping("/{id}")
  public ResponseEntity<User> updateUser(
    @PathVariable Long id,
    @Valid @RequestBody User user
  ) {
    User updated = userService.update(id, user);
    return ResponseEntity.ok(updated);
  }

  // PATCH partial update - /api/users/123
  @PatchMapping("/{id}")
  public ResponseEntity<User> patchUser(
    @PathVariable Long id,
    @RequestBody Map<String, Object> updates
  ) {
    User user = userService.findById(id)
      .orElseThrow(() -> new UserNotFoundException(id));

    // Apply partial updates
    updates.forEach((key, value) -> {
      switch (key) {
        case "name":
          user.setName((String) value);
          break;
        case "email":
          user.setEmail((String) value);
          break;
        case "status":
          user.setStatus((String) value);
          break;
      }
    });

    User updated = userService.update(id, user);
    return ResponseEntity.ok(updated);
  }

  // DELETE user - /api/users/123
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.delete(id);
    return ResponseEntity.noContent().build();
  }

  // Multiple path variables - /api/users/123/orders/456
  @GetMapping("/{userId}/orders/{orderId}")
  public ResponseEntity<Order> getUserOrder(
    @PathVariable Long userId,
    @PathVariable Long orderId
  ) {
    Order order = orderService.findByUserAndOrder(userId, orderId);
    return ResponseEntity.ok(order);
  }

  // Multiple query parameters - /api/users?name=John&email=john@example.com
  @GetMapping("/filter")
  public ResponseEntity<List<User>> filterUsers(
    @RequestParam(required = false) String name,
    @RequestParam(required = false) String email,
    @RequestParam(defaultValue = "ACTIVE") String status
  ) {
    List<User> users = userService.filter(name, email, status);
    return ResponseEntity.ok(users);
  }

  // Request headers
  @GetMapping("/secure/{id}")
  public ResponseEntity<User> getSecureUser(
    @PathVariable Long id,
    @RequestHeader("Authorization") String token
  ) {
    // Validate token
    authService.validateToken(token);

    return userService.findById(id)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  // Custom response headers
  @GetMapping("/{id}/with-headers")
  public ResponseEntity<User> getUserWithHeaders(@PathVariable Long id) {
    User user = userService.findById(id)
      .orElseThrow(() -> new UserNotFoundException(id));

    return ResponseEntity.ok()
      .header("X-Custom-Header", "CustomValue")
      .header("X-User-Created", user.getCreatedAt().toString())
      .cacheControl(CacheControl.maxAge(60, TimeUnit.SECONDS))
      .body(user);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Exception Handling
// ═══════════════════════════════════════════════════════════════════════════
@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotFoundException extends RuntimeException {
  public UserNotFoundException(Long id) {
    super("User not found with id: " + id);
  }
}

public class ErrorResponse {
  private int status;
  private String message;
  private LocalDateTime timestamp;

  // Constructor, getters, setters
}

// Global exception handler
@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(UserNotFoundException.class)
  public ResponseEntity<ErrorResponse> handleUserNotFound(
    UserNotFoundException ex
  ) {
    ErrorResponse error = new ErrorResponse(
      HttpStatus.NOT_FOUND.value(),
      ex.getMessage(),
      LocalDateTime.now()
    );
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, String>> handleValidationErrors(
    MethodArgumentNotValidException ex
  ) {
    Map<String, String> errors = new HashMap<>();
    ex.getBindingResult().getFieldErrors().forEach(error ->
      errors.put(error.getField(), error.getDefaultMessage())
    );

    return ResponseEntity.badRequest().body(errors);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponse> handleGeneralException(Exception ex) {
    ErrorResponse error = new ErrorResponse(
      HttpStatus.INTERNAL_SERVER_ERROR.value(),
      "An error occurred: " + ex.getMessage(),
      LocalDateTime.now()
    );
    return ResponseEntity
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .body(error);
  }
}

// 6. Content Negotiation (JSON/XML)
@RestController
@RequestMapping("/api/users")
public class UserContentNegotiationController {

  // Produces JSON or XML based on Accept header
  @GetMapping(
    value = "/{id}",
    produces = {
      MediaType.APPLICATION_JSON_VALUE,
      MediaType.APPLICATION_XML_VALUE
    }
  )
  public ResponseEntity<User> getUser(@PathVariable Long id) {
    // Returns JSON if Accept: application/json
    // Returns XML if Accept: application/xml
    return userService.findById(id)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  // Consumes JSON or XML
  @PostMapping(
    consumes = {
      MediaType.APPLICATION_JSON_VALUE,
      MediaType.APPLICATION_XML_VALUE
    },
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity<User> createUser(@RequestBody User user) {
    User created = userService.create(user);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }
}

// 7. CORS Configuration
@Configuration
public class CorsConfig {

  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
          .allowedOrigins("http://localhost:3000", "https://example.com")
          .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
          .allowedHeaders("*")
          .allowCredentials(true)
          .maxAge(3600);
      }
    };
  }
}

// Or use @CrossOrigin on controller
@RestController
@RequestMapping("/api/users")
@CrossOrigin(
  origins = "http://localhost:3000",
  methods = {RequestMethod.GET, RequestMethod.POST},
  maxAge = 3600
)
public class UserCorsController {
  // Controller methods
}`
      }
    },
    {
      id: 5,
      name: 'API Security',
      icon: '🔐',
      color: '#ec4899',
      description: 'Authentication and authorization',
      content: {
        explanation: 'API security protects resources from unauthorized access. Authentication verifies identity (who you are) while authorization determines permissions (what you can do). JWT (JSON Web Tokens) are self-contained tokens for stateless authentication. OAuth 2.0 provides delegated authorization for third-party access. API keys are simple tokens for service identification. Basic Authentication sends credentials in headers. Bearer tokens (commonly JWT) authorize requests. HTTPS/TLS encrypts data in transit. Rate limiting prevents abuse.',
        keyPoints: [
          'Authentication: Verify user identity (login, JWT, OAuth)',
          'Authorization: Control resource access (roles, permissions)',
          'JWT: Self-contained tokens with header, payload, signature',
          'OAuth 2.0: Authorization framework for third-party access (Google, GitHub)',
          'API Keys: Simple token-based identification for services',
          'Basic Auth: Username:password in Base64 (use with HTTPS only)',
          'Bearer Token: Authorization: Bearer <token> header',
          'Rate Limiting: Prevent API abuse (requests per minute/hour)'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ JWT Token Generation and Validation
// ═══════════════════════════════════════════════════════════════════════════

// JWT Utility Class
@Component
public class JwtUtil {

  @Value("\${jwt.secret}")
  private String secret;

  @Value("\${jwt.expiration}")
  private Long expiration;

  // Generate JWT token
  public String generateToken(String username) {
    Map<String, Object> claims = new HashMap<>();
    return Jwts.builder()
      .setClaims(claims)
      .setSubject(username)
      .setIssuedAt(new Date())
      .setExpiration(new Date(System.currentTimeMillis() + expiration))
      .signWith(SignatureAlgorithm.HS512, secret)
      .compact();
  }

  // Validate JWT token
  public boolean validateToken(String token, String username) {
    String tokenUsername = extractUsername(token);
    return tokenUsername.equals(username) && !isTokenExpired(token);
  }

  // Extract username from token
  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  // Extract expiration
  private boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  private Claims extractAllClaims(String token) {
    return Jwts.parser()
      .setSigningKey(secret)
      .parseClaimsJws(token)
      .getBody();
  }
}

// Authentication Controller for Login/Register
@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JwtUtil jwtUtil;

  @Autowired
  private UserService userService;

  // Login endpoint
  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(
    @RequestBody AuthRequest request
  ) {
    try {
      authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
          request.getUsername(),
          request.getPassword()
        )
      );

      String token = jwtUtil.generateToken(request.getUsername());

      AuthResponse response = new AuthResponse(
        token,
        request.getUsername()
      );

      return ResponseEntity.ok(response);
    } catch (BadCredentialsException ex) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
  }

  // Register endpoint
  @PostMapping("/register")
  public ResponseEntity<User> register(@RequestBody User user) {
    if (userService.existsByUsername(user.getUsername())) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    User created = userService.create(user);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ JWT Request Filter
// ═══════════════════════════════════════════════════════════════════════════
@Component
public class JwtRequestFilter extends OncePerRequestFilter {

  @Autowired
  private JwtUtil jwtUtil;

  @Autowired
  private UserDetailsService userDetailsService;

  @Override
  protected void doFilterInternal(
    HttpServletRequest request,
    HttpServletResponse response,
    FilterChain chain
  ) throws ServletException, IOException {

    String authHeader = request.getHeader("Authorization");
    String username = null;
    String jwt = null;

    // Extract JWT from Bearer token
    if (authHeader != null && authHeader.startsWith("Bearer ")) {
      jwt = authHeader.substring(7);
      username = jwtUtil.extractUsername(jwt);
    }

    // Validate and set authentication
    if (username != null && SecurityContextHolder.getContext()
        .getAuthentication() == null) {

      UserDetails userDetails = userDetailsService.loadUserByUsername(username);

      if (jwtUtil.validateToken(jwt, username)) {
        UsernamePasswordAuthenticationToken authToken =
          new UsernamePasswordAuthenticationToken(
            userDetails, null, userDetails.getAuthorities()
          );

        authToken.setDetails(
          new WebAuthenticationDetailsSource().buildDetails(request)
        );

        SecurityContextHolder.getContext().setAuthentication(authToken);
      }
    }

    chain.doFilter(request, response);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Spring Security Configuration
// ═══════════════════════════════════════════════════════════════════════════
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

  @Autowired
  private JwtRequestFilter jwtRequestFilter;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .csrf(csrf -> csrf.disable())
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/auth/**").permitAll()
        .requestMatchers("/api/public/**").permitAll()
        .requestMatchers("/api/admin/**").hasRole("ADMIN")
        .anyRequest().authenticated()
      )
      .sessionManagement(session -> session
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      )
      .addFilterBefore(
        jwtRequestFilter,
        UsernamePasswordAuthenticationFilter.class
      );

    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager(
    AuthenticationConfiguration config
  ) throws Exception {
    return config.getAuthenticationManager();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Method-Level Security
// ═══════════════════════════════════════════════════════════════════════════
@RestController
@RequestMapping("/api/users")
public class SecureUserController {

  // Accessible by any authenticated user
  @GetMapping
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<List<User>> getAllUsers() {
    return ResponseEntity.ok(userService.findAll());
  }

  // Only ADMIN role
  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.delete(id);
    return ResponseEntity.noContent().build();
  }

  // Only owner or ADMIN
  @PutMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
  public ResponseEntity<User> updateUser(
    @PathVariable Long id,
    @RequestBody User user
  ) {
    User updated = userService.update(id, user);
    return ResponseEntity.ok(updated);
  }

  // Custom permission check
  @PostMapping
  @PreAuthorize("hasAuthority('USER_CREATE')")
  public ResponseEntity<User> createUser(@RequestBody User user) {
    User created = userService.create(user);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }
}

// 4. API Key Authentication
@Component
public class ApiKeyAuthFilter extends OncePerRequestFilter {

  @Value("\${api.key}")
  private String validApiKey;

  @Override
  protected void doFilterInternal(
    HttpServletRequest request,
    HttpServletResponse response,
    FilterChain chain
  ) throws ServletException, IOException {

    String apiKey = request.getHeader("X-API-Key");

    if ("/api/external".startsWith(request.getRequestURI())) {
      if (apiKey == null || !apiKey.equals(validApiKey)) {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        return;
      }
    }

    chain.doFilter(request, response);
  }
}

// 5. OAuth 2.0 Resource Server
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

  private JwtAuthenticationConverter jwtAuthenticationConverter() {
    JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter =
      new JwtGrantedAuthoritiesConverter();
    grantedAuthoritiesConverter.setAuthoritiesClaimName("roles");
    grantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");

    JwtAuthenticationConverter jwtAuthenticationConverter =
      new JwtAuthenticationConverter();
    jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(
      grantedAuthoritiesConverter
    );

    return jwtAuthenticationConverter;
  }
}

// 6. Basic Authentication
@RestController
@RequestMapping("/api/basic")
public class BasicAuthController {

  @GetMapping("/secure")
  public ResponseEntity<String> secureEndpoint(
    @RequestHeader("Authorization") String authHeader
  ) {
    // Authorization: Basic base64(username:password)
    if (authHeader != null && authHeader.startsWith("Basic ")) {
      String base64Credentials = authHeader.substring(6);
      String credentials = new String(
        Base64.getDecoder().decode(base64Credentials)
      );
      String[] parts = credentials.split(":", 2);
      String username = parts[0];
      String password = parts[1];

      // Validate credentials
      if (authService.validate(username, password)) {
        return ResponseEntity.ok("Authenticated");
      }
    }

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
  }
}

// 7. Rate Limiting
@Component
public class RateLimitingFilter extends OncePerRequestFilter {

  private final Map<String, List<Long>> requestCounts = new ConcurrentHashMap<>();
  private static final int MAX_REQUESTS_PER_MINUTE = 100;

  @Override
  protected void doFilterInternal(
    HttpServletRequest request,
    HttpServletResponse response,
    FilterChain chain
  ) throws ServletException, IOException {

    String clientId = getClientId(request);
    long currentTime = System.currentTimeMillis();

    requestCounts.putIfAbsent(clientId, new ArrayList<>());
    List<Long> requests = requestCounts.get(clientId);

    // Remove old requests (older than 1 minute)
    requests.removeIf(time -> currentTime - time > 60000);

    if (requests.size() >= MAX_REQUESTS_PER_MINUTE) {
      response.setStatus(429); // Too Many Requests
      response.getWriter().write("Rate limit exceeded");
      return;
    }

    requests.add(currentTime);
    response.setHeader("X-Rate-Limit", String.valueOf(MAX_REQUESTS_PER_MINUTE));
    response.setHeader("X-Rate-Remaining",
      String.valueOf(MAX_REQUESTS_PER_MINUTE - requests.size()));

    chain.doFilter(request, response);
  }

  private String getClientId(HttpServletRequest request) {
    String apiKey = request.getHeader("X-API-Key");
    return apiKey != null ? apiKey : request.getRemoteAddr();
  }
}

// application.properties
/*
jwt.secret=mySecretKey123456789
jwt.expiration=86400000
api.key=your-api-key-here

# OAuth2
spring.security.oauth2.resourceserver.jwt.issuer-uri=https://auth.example.com
*/`
      }
    },
    {
      id: 6,
      name: 'API Documentation',
      icon: '📚',
      color: '#06b6d4',
      description: 'OpenAPI/Swagger documentation',
      content: {
        explanation: 'API documentation is essential for developers consuming your API. OpenAPI (formerly Swagger) is the industry standard specification for REST APIs. Springdoc OpenAPI automatically generates OpenAPI 3.0 documentation from your Spring Boot code. Swagger UI provides an interactive interface for exploring and testing endpoints. Good documentation includes endpoint descriptions, request/response examples, error codes, authentication requirements, and data schemas. Keep documentation in sync with code using annotations.',
        keyPoints: [
          'OpenAPI 3.0: Standard specification for describing REST APIs',
          'Springdoc OpenAPI: Auto-generates documentation from Spring Boot code',
          'Swagger UI: Interactive API documentation interface at /swagger-ui.html',
          '@Operation: Documents individual API operations with descriptions',
          '@ApiResponse/@ApiResponses: Documents response codes and schemas',
          '@Parameter: Documents request parameters with examples',
          '@Schema: Documents model properties and validation rules',
          'Interactive testing: Try API calls directly from Swagger UI'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ OpenAPI Configuration
// ═══════════════════════════════════════════════════════════════════════════

// Maven Dependency
/*
<dependency>
  <groupId>org.springdoc</groupId>
  <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
  <version>2.2.0</version>
</dependency>
*/

// OpenAPI Configuration Bean
@Configuration
public class OpenApiConfig {

  @Bean
  public OpenAPI customOpenAPI() {
    return new OpenAPI()
      .info(new Info()
        .title("User Management API")
        .version("1.0")
        .description("REST API for user management operations")
        .contact(new Contact()
          .name("API Support")
          .email("support@example.com")
          .url("https://example.com/support")
        )
        .license(new License()
          .name("Apache 2.0")
          .url("https://www.apache.org/licenses/LICENSE-2.0")
        )
      )
      .servers(Arrays.asList(
        new Server()
          .url("http://localhost:8080")
          .description("Development server"),
        new Server()
          .url("https://api.example.com")
          .description("Production server")
      ))
      .components(new Components()
        .addSecuritySchemes("bearer-jwt",
          new SecurityScheme()
            .type(SecurityScheme.Type.HTTP)
            .scheme("bearer")
            .bearerFormat("JWT")
            .in(SecurityScheme.In.HEADER)
            .name("Authorization")
        )
      )
      .addSecurityItem(new SecurityRequirement().addList("bearer-jwt"));
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Documented Controller with @Operation
// ═══════════════════════════════════════════════════════════════════════════
@RestController
@RequestMapping("/api/users")
@Tag(name = "User Management", description = "APIs for managing users")
public class UserController {

  @Autowired
  private UserService userService;

  @Operation(
    summary = "Get all users",
    description = "Retrieves a paginated list of all users in the system"
  )
  @ApiResponses(value = {
    @ApiResponse(
      responseCode = "200",
      description = "Successfully retrieved users",
      content = @Content(
        mediaType = "application/json",
        schema = @Schema(implementation = User.class),
        examples = @ExampleObject(
          value = "[{\\"id\\":1,\\"name\\":\\"John\\",\\"email\\":\\"john@example.com\\"}]"
        )
      )
    ),
    @ApiResponse(
      responseCode = "401",
      description = "Unauthorized - Invalid or missing token",
      content = @Content
    )
  })
  @GetMapping
  public ResponseEntity<List<User>> getAllUsers(
    @Parameter(description = "Page number (0-based)", example = "0")
    @RequestParam(defaultValue = "0") int page,

    @Parameter(description = "Page size", example = "20")
    @RequestParam(defaultValue = "20") int size
  ) {
    List<User> users = userService.findAll(page, size);
    return ResponseEntity.ok(users);
  }

  @Operation(
    summary = "Get user by ID",
    description = "Returns a single user by their unique identifier"
  )
  @ApiResponses(value = {
    @ApiResponse(
      responseCode = "200",
      description = "User found",
      content = @Content(
        mediaType = "application/json",
        schema = @Schema(implementation = User.class)
      )
    ),
    @ApiResponse(
      responseCode = "404",
      description = "User not found",
      content = @Content(
        mediaType = "application/json",
        schema = @Schema(implementation = ErrorResponse.class),
        examples = @ExampleObject(
          value = "{\\"status\\":404,\\"message\\":\\"User not found\\",\\"timestamp\\":\\"2024-01-15T10:30:00\\"}"
        )
      )
    )
  })
  @GetMapping("/{id}")
  public ResponseEntity<User> getUser(
    @Parameter(description = "User ID", required = true, example = "1")
    @PathVariable Long id
  ) {
    return userService.findById(id)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  @Operation(
    summary = "Create new user",
    description = "Creates a new user with the provided information"
  )
  @ApiResponses(value = {
    @ApiResponse(
      responseCode = "201",
      description = "User created successfully",
      content = @Content(
        mediaType = "application/json",
        schema = @Schema(implementation = User.class)
      ),
      headers = @Header(
        name = "Location",
        description = "URI of the created user",
        schema = @Schema(type = "string")
      )
    ),
    @ApiResponse(
      responseCode = "400",
      description = "Invalid input",
      content = @Content(schema = @Schema(implementation = ErrorResponse.class))
    ),
    @ApiResponse(
      responseCode = "409",
      description = "User already exists",
      content = @Content
    )
  })
  @PostMapping
  public ResponseEntity<User> createUser(
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
      description = "User object to be created",
      required = true,
      content = @Content(
        schema = @Schema(implementation = User.class),
        examples = @ExampleObject(
          value = "{\\"name\\":\\"John Doe\\",\\"email\\":\\"john@example.com\\",\\"status\\":\\"ACTIVE\\"}"
        )
      )
    )
    @Valid @RequestBody User user
  ) {
    User created = userService.create(user);

    return ResponseEntity
      .status(HttpStatus.CREATED)
      .location(URI.create("/api/users/" + created.getId()))
      .body(created);
  }

  @Operation(
    summary = "Update user",
    description = "Updates an existing user with new information"
  )
  @ApiResponses(value = {
    @ApiResponse(
      responseCode = "200",
      description = "User updated successfully",
      content = @Content(schema = @Schema(implementation = User.class))
    ),
    @ApiResponse(responseCode = "404", description = "User not found"),
    @ApiResponse(responseCode = "400", description = "Invalid input")
  })
  @PutMapping("/{id}")
  public ResponseEntity<User> updateUser(
    @Parameter(description = "ID of user to update", required = true)
    @PathVariable Long id,

    @RequestBody User user
  ) {
    User updated = userService.update(id, user);
    return ResponseEntity.ok(updated);
  }

  @Operation(
    summary = "Delete user",
    description = "Permanently deletes a user from the system"
  )
  @ApiResponses(value = {
    @ApiResponse(responseCode = "204", description = "User deleted successfully"),
    @ApiResponse(responseCode = "404", description = "User not found"),
    @ApiResponse(
      responseCode = "403",
      description = "Forbidden - Insufficient permissions"
    )
  })
  @DeleteMapping("/{id}")
  @SecurityRequirement(name = "bearer-jwt")
  public ResponseEntity<Void> deleteUser(
    @Parameter(description = "User ID to delete", required = true)
    @PathVariable Long id
  ) {
    userService.delete(id);
    return ResponseEntity.noContent().build();
  }

  @Operation(
    summary = "Search users",
    description = "Search users by various criteria"
  )
  @GetMapping("/search")
  public ResponseEntity<List<User>> searchUsers(
    @Parameter(description = "Search by name", example = "John")
    @RequestParam(required = false) String name,

    @Parameter(description = "Filter by status", example = "ACTIVE")
    @RequestParam(required = false) String status,

    @Parameter(description = "Filter by email domain", example = "example.com")
    @RequestParam(required = false) String domain
  ) {
    List<User> users = userService.search(name, status, domain);
    return ResponseEntity.ok(users);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Documented Models with @Schema
// ═══════════════════════════════════════════════════════════════════════════
@Schema(description = "User entity representing a system user")
public class User {

  @Schema(
    description = "Unique identifier",
    example = "1",
    accessMode = Schema.AccessMode.READ_ONLY
  )
  private Long id;

  @Schema(
    description = "User's full name",
    example = "John Doe",
    required = true,
    minLength = 2,
    maxLength = 100
  )
  @NotBlank
  private String name;

  @Schema(
    description = "User's email address",
    example = "john@example.com",
    required = true,
    format = "email"
  )
  @Email
  @NotBlank
  private String email;

  @Schema(
    description = "User account status",
    example = "ACTIVE",
    allowableValues = {"ACTIVE", "INACTIVE", "SUSPENDED"}
  )
  private String status;

  @Schema(
    description = "Account creation timestamp",
    example = "2024-01-15T10:30:00",
    accessMode = Schema.AccessMode.READ_ONLY
  )
  private LocalDateTime createdAt;

  // Constructors, getters, setters
}

@Schema(description = "Error response structure")
public class ErrorResponse {

  @Schema(description = "HTTP status code", example = "404")
  private int status;

  @Schema(description = "Error message", example = "User not found")
  private String message;

  @Schema(description = "Timestamp of the error", example = "2024-01-15T10:30:00")
  private LocalDateTime timestamp;

  // Constructor, getters, setters
}

// 5. Application Properties
/*
# application.properties

# Swagger UI path
springdoc.swagger-ui.path=/swagger-ui.html

# API docs path
springdoc.api-docs.path=/api-docs

# Group APIs by tags
springdoc.swagger-ui.tagsSorter=alpha

# Enable operation sorting
springdoc.swagger-ui.operationsSorter=alpha

# Show request duration
springdoc.swagger-ui.displayRequestDuration=true

# Packages to scan
springdoc.packages-to-scan=com.example.controller

# Paths to include
springdoc.paths-to-match=/api/**
*/

// 6. Access Documentation
/*
Swagger UI: http://localhost:8080/swagger-ui.html
OpenAPI JSON: http://localhost:8080/api-docs
OpenAPI YAML: http://localhost:8080/api-docs.yaml
*/

// 7. Custom API Groups
@Configuration
public class MultipleApiDocsConfig {

  @Bean
  public GroupedOpenApi publicApi() {
    return GroupedOpenApi.builder()
      .group("public")
      .pathsToMatch("/api/public/**")
      .build();
  }

  @Bean
  public GroupedOpenApi adminApi() {
    return GroupedOpenApi.builder()
      .group("admin")
      .pathsToMatch("/api/admin/**")
      .build();
  }

  @Bean
  public GroupedOpenApi userApi() {
    return GroupedOpenApi.builder()
      .group("users")
      .pathsToMatch("/api/users/**")
      .build();
  }
}

// Documentation Best Practices:
// 1. Document all public endpoints
// 2. Provide request/response examples
// 3. Document error responses
// 4. Include authentication requirements
// 5. Keep documentation in sync with code
// 6. Use meaningful descriptions
// 7. Document query parameters and path variables
// 8. Include data validation rules`
      }
    },
    {
      id: 7,
      name: 'API Best Practices',
      icon: '✨',
      color: '#84cc16',
      description: 'REST API design patterns',
      content: {
        explanation: 'API best practices ensure your API is maintainable, scalable, and user-friendly. Version your API to manage breaking changes (URI versioning is most common). Implement proper error handling with consistent error response structures. Use pagination to limit large result sets (offset-based or cursor-based). Apply rate limiting to prevent abuse. Implement HATEOAS links for discoverability. Enable compression (gzip) to reduce bandwidth. Use caching strategies (ETag, Cache-Control) for performance. Monitor API usage with metrics and logging.',
        keyPoints: [
          'API Versioning: URI (/api/v1), header, or query parameter versioning',
          'Error Handling: Consistent error response format with status, message, timestamp',
          'Pagination: Offset-based (page/size) or cursor-based for large datasets',
          'Rate Limiting: Prevent abuse with requests per minute/hour limits',
          'HATEOAS: Include hypermedia links for API discoverability',
          'Compression: Enable gzip/deflate to reduce response size',
          'Caching: Use ETag, Cache-Control headers for conditional requests',
          'Monitoring: Track API metrics, errors, response times, usage patterns'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ API Versioning Strategies
// ═══════════════════════════════════════════════════════════════════════════

// URI Versioning (Most Common)
@RestController
@RequestMapping("/api/v1/users")
public class UserV1Controller {

  @GetMapping("/{id}")
  public ResponseEntity<UserV1> getUser(@PathVariable Long id) {
    // Version 1 response format
    return ResponseEntity.ok(userService.findByIdV1(id));
  }
}

@RestController
@RequestMapping("/api/v2/users")
public class UserV2Controller {

  @GetMapping("/{id}")
  public ResponseEntity<UserV2> getUser(@PathVariable Long id) {
    // Version 2 with additional fields, breaking changes
    return ResponseEntity.ok(userService.findByIdV2(id));
  }
}

// Header Versioning
@RestController
@RequestMapping("/api/users")
public class UserVersionedController {

  @GetMapping("/{id}")
  public ResponseEntity<?> getUser(
    @PathVariable Long id,
    @RequestHeader(value = "API-Version", defaultValue = "1") int version
  ) {
    if (version == 2) {
      return ResponseEntity.ok(userService.findByIdV2(id));
    }
    return ResponseEntity.ok(userService.findByIdV1(id));
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Consistent Error Handling
// ═══════════════════════════════════════════════════════════════════════════
@Data
@AllArgsConstructor
public class ApiError {
  private int status;
  private String error;
  private String message;
  private String path;
  private LocalDateTime timestamp;
  private List<ValidationError> validationErrors;
}

@Data
@AllArgsConstructor
public class ValidationError {
  private String field;
  private String message;
}

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ApiError> handleNotFound(
    ResourceNotFoundException ex,
    HttpServletRequest request
  ) {
    ApiError error = new ApiError(
      HttpStatus.NOT_FOUND.value(),
      "Not Found",
      ex.getMessage(),
      request.getRequestURI(),
      LocalDateTime.now(),
      null
    );
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiError> handleValidationErrors(
    MethodArgumentNotValidException ex,
    HttpServletRequest request
  ) {
    List<ValidationError> validationErrors = ex.getBindingResult()
      .getFieldErrors()
      .stream()
      .map(error -> new ValidationError(
        error.getField(),
        error.getDefaultMessage()
      ))
      .collect(Collectors.toList());

    ApiError error = new ApiError(
      HttpStatus.BAD_REQUEST.value(),
      "Validation Failed",
      "Invalid input data",
      request.getRequestURI(),
      LocalDateTime.now(),
      validationErrors
    );

    return ResponseEntity.badRequest().body(error);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiError> handleGeneralException(
    Exception ex,
    HttpServletRequest request
  ) {
    ApiError error = new ApiError(
      HttpStatus.INTERNAL_SERVER_ERROR.value(),
      "Internal Server Error",
      "An unexpected error occurred",
      request.getRequestURI(),
      LocalDateTime.now(),
      null
    );
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Pagination and Filtering
// ═══════════════════════════════════════════════════════════════════════════

// Offset-based Pagination
@RestController
@RequestMapping("/api/users")
public class UserPaginationController {

  @GetMapping
  public ResponseEntity<PageResponse<User>> getUsers(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size,
    @RequestParam(required = false) String sort
  ) {
    Pageable pageable = PageRequest.of(page, size);
    Page<User> userPage = userService.findAll(pageable);

    PageResponse<User> response = new PageResponse<>(
      userPage.getContent(),
      userPage.getNumber(),
      userPage.getSize(),
      userPage.getTotalElements(),
      userPage.getTotalPages()
    );

    return ResponseEntity.ok()
      .header("X-Total-Count", String.valueOf(userPage.getTotalElements()))
      .header("X-Page-Number", String.valueOf(userPage.getNumber()))
      .header("X-Page-Size", String.valueOf(userPage.getSize()))
      .body(response);
  }
}

@Data
@AllArgsConstructor
public class PageResponse<T> {
  private List<T> content;
  private int page;
  private int size;
  private long totalElements;
  private int totalPages;
}

// Cursor-based Pagination (better for large datasets)
@Data
@AllArgsConstructor
public class CursorPage<T> {
  private List<T> content;
  private String nextCursor;
  private boolean hasNext;
}

@GetMapping("/cursor")
public ResponseEntity<CursorPage<User>> getUsersCursor(
  @RequestParam(defaultValue = "20") int limit,
  @RequestParam(required = false) String cursor
) {
  CursorPage<User> page = userService.findWithCursor(limit, cursor);
  return ResponseEntity.ok(page);
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Rate Limiting and Caching
// ═══════════════════════════════════════════════════════════════════════════

// Rate Limiting Implementation
@Component
public class RateLimitInterceptor implements HandlerInterceptor {

  private final LoadingCache<String, AtomicInteger> requestCounts;

  public RateLimitInterceptor() {
    this.requestCounts = CacheBuilder.newBuilder()
      .expireAfterWrite(1, TimeUnit.MINUTES)
      .build(new CacheLoader<String, AtomicInteger>() {
        @Override
        public AtomicInteger load(String key) {
          return new AtomicInteger(0);
        }
      });
  }

  @Override
  public boolean preHandle(
    HttpServletRequest request,
    HttpServletResponse response,
    Object handler
  ) throws Exception {

    String clientId = getClientId(request);
    AtomicInteger count = requestCounts.get(clientId);

    int currentCount = count.incrementAndGet();
    int limit = 100; // 100 requests per minute

    response.setHeader("X-Rate-Limit", String.valueOf(limit));
    response.setHeader("X-Rate-Remaining", String.valueOf(limit - currentCount));

    if (currentCount > limit) {
      response.setStatus(429); // Too Many Requests
      response.getWriter().write("Rate limit exceeded");
      return false;
    }

    return true;
  }

  private String getClientId(HttpServletRequest request) {
    String apiKey = request.getHeader("X-API-Key");
    return apiKey != null ? apiKey : request.getRemoteAddr();
  }
}

// Caching with ETags
@RestController
@RequestMapping("/api/users")
public class UserCacheController {

  @GetMapping("/{id}")
  public ResponseEntity<User> getUser(
    @PathVariable Long id,
    @RequestHeader(value = "If-None-Match", required = false) String ifNoneMatch
  ) {
    User user = userService.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException(id));

    String etag = "\"" + user.getVersion() + "\"";

    // If ETag matches, return 304 Not Modified
    if (etag.equals(ifNoneMatch)) {
      return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
    }

    return ResponseEntity.ok()
      .eTag(etag)
      .cacheControl(CacheControl.maxAge(60, TimeUnit.SECONDS))
      .lastModified(user.getUpdatedAt())
      .body(user);
  }
}

// Additional Best Practices

// HATEOAS (Hypermedia Links)
@RestController
@RequestMapping("/api/users")
public class UserHateoasController {

  @GetMapping("/{id}")
  public ResponseEntity<EntityModel<User>> getUser(@PathVariable Long id) {
    User user = userService.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException(id));

    EntityModel<User> resource = EntityModel.of(user);

    // Add HATEOAS links
    resource.add(
      linkTo(methodOn(UserHateoasController.class).getUser(id))
        .withSelfRel()
    );
    resource.add(
      linkTo(methodOn(UserHateoasController.class).getAllUsers())
        .withRel("users")
    );
    resource.add(
      linkTo(methodOn(OrderController.class).getUserOrders(id))
        .withRel("orders")
    );
    resource.add(
      Link.of("/api/users/" + id, "update")
    );
    resource.add(
      Link.of("/api/users/" + id, "delete")
    );

    return ResponseEntity.ok(resource);
  }

  @GetMapping
  public ResponseEntity<CollectionModel<EntityModel<User>>> getAllUsers() {
    List<EntityModel<User>> users = userService.findAll()
      .stream()
      .map(user -> EntityModel.of(user,
        linkTo(methodOn(UserHateoasController.class).getUser(user.getId()))
          .withSelfRel()
      ))
      .collect(Collectors.toList());

    CollectionModel<EntityModel<User>> collection =
      CollectionModel.of(users);

    collection.add(
      linkTo(methodOn(UserHateoasController.class).getAllUsers())
        .withSelfRel()
    );

    return ResponseEntity.ok(collection);
  }
}

// Response with HATEOAS:
/*
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "_links": {
    "self": { "href": "http://localhost:8080/api/users/1" },
    "users": { "href": "http://localhost:8080/api/users" },
    "orders": { "href": "http://localhost:8080/api/users/1/orders" },
    "update": { "href": "http://localhost:8080/api/users/1" },
    "delete": { "href": "http://localhost:8080/api/users/1" }
  }
}
*/

// 6. Response Compression
@Configuration
public class CompressionConfig {

  @Bean
  public FilterRegistrationBean<GzipFilter> gzipFilter() {
    FilterRegistrationBean<GzipFilter> registration =
      new FilterRegistrationBean<>();

    registration.setFilter(new GzipFilter());
    registration.addUrlPatterns("/api/*");
    registration.setOrder(1);

    return registration;
  }
}

// Or in application.properties:
/*
server.compression.enabled=true
server.compression.mime-types=application/json,application/xml,text/html
server.compression.min-response-size=1024
*/

// API Monitoring and Metrics
@RestController
@RequestMapping("/api/users")
public class MonitoredUserController {

  private final MeterRegistry meterRegistry;

  @Autowired
  public MonitoredUserController(MeterRegistry meterRegistry) {
    this.meterRegistry = meterRegistry;
  }

  @GetMapping
  public ResponseEntity<List<User>> getAllUsers() {
    Timer.Sample sample = Timer.start(meterRegistry);

    try {
      List<User> users = userService.findAll();

      // Track success
      meterRegistry.counter("api.users.get.success").increment();

      return ResponseEntity.ok(users);
    } catch (Exception ex) {
      // Track failure
      meterRegistry.counter("api.users.get.failure").increment();
      throw ex;
    } finally {
      sample.stop(meterRegistry.timer("api.users.get.duration"));
    }
  }
}

// Actuator endpoints for monitoring
/*
http://localhost:8080/actuator/health
http://localhost:8080/actuator/metrics
http://localhost:8080/actuator/prometheus
*/

// application.properties
/*
# Actuator
management.endpoints.web.exposure.include=health,metrics,prometheus
management.metrics.export.prometheus.enabled=true
*/`
      }
    }
  ]

  const selectedTopicRef = useRef(selectedTopic)
  useEffect(() => {
    selectedTopicRef.current = selectedTopic
  }, [selectedTopic])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedTopicRef.current) {
          e.preventDefault()
          e.stopImmediatePropagation()
          setSelectedTopic(null)
          return
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '95%',
      margin: '120px auto 0',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      border: '3px solid rgba(14, 165, 233, 0.4)'
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
          🌐 REST API
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <div style={{
        backgroundColor: 'rgba(14, 165, 233, 0.05)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(14, 165, 233, 0.3)',
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
          Comprehensive REST API guide covering REST principles, HTTP methods, resource design, Spring Boot implementation,
          security, documentation with OpenAPI/Swagger, and production best practices.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedTopic ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {!selectedTopic ? (
          restApiTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              style={{
                backgroundColor: 'rgba(14, 165, 233, 0.05)',
                padding: '2rem',
                borderRadius: '12px',
                border: '2px solid rgba(14, 165, 233, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(14, 165, 233, 0.1)'
                e.currentTarget.style.borderColor = topic.color
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 8px 16px ${topic.color}33`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(14, 165, 233, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{topic.icon}</div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: topic.color,
                  margin: '0 0 0.5rem 0'
                }}>
                  {topic.name}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {topic.description}
                </p>
              </div>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: '600',
                color: topic.color,
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
                REST API Topics
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {restApiTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    style={{
                      backgroundColor: selectedTopic?.id === topic.id
                        ? `${topic.color}15`
                        : 'rgba(14, 165, 233, 0.05)',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: selectedTopic?.id === topic.id
                        ? `3px solid ${topic.color}`
                        : '2px solid rgba(14, 165, 233, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedTopic?.id !== topic.id) {
                        e.currentTarget.style.backgroundColor = 'rgba(14, 165, 233, 0.1)'
                        e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.4)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedTopic?.id !== topic.id) {
                        e.currentTarget.style.backgroundColor = 'rgba(14, 165, 233, 0.05)'
                        e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.2)'
                      }
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>{topic.icon}</span>
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: selectedTopic?.id === topic.id ? topic.color : '#1f2937'
                      }}>
                        {topic.name}
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
                color: selectedTopic.color,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: '2rem' }}>{selectedTopic.icon}</span>
                {selectedTopic.name}
              </h3>

              <div style={{
                backgroundColor: `${selectedTopic.color}08`,
                padding: '1.5rem',
                borderRadius: '12px',
                border: `2px solid ${selectedTopic.color}33`,
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
                  {selectedTopic.content.explanation}
                </p>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                border: `2px solid ${selectedTopic.color}33`,
                marginBottom: '1.5rem'
              }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: selectedTopic.color,
                  margin: '0 0 1rem 0'
                }}>
                  📌 Key Points
                </h4>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {selectedTopic.content.keyPoints.map((point, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        padding: '0.75rem',
                        backgroundColor: `${selectedTopic.color}08`,
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        color: '#374151',
                        lineHeight: '1.6'
                      }}
                    >
                      <span style={{
                        color: selectedTopic.color,
                        fontWeight: '700',
                        fontSize: '1.2rem',
                        lineHeight: '1'
                      }}>
                        •
                      </span>
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: selectedTopic.color,
                  margin: '0 0 1rem 0'
                }}>
                  💻 Code Examples
                </h4>
                {(() => {
                  const sections = parseCodeSections(selectedTopic.content.codeExample)
                  if (sections.length === 0) {
                    return (
                      <div style={{
                        backgroundColor: '#1e293b',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: '2px solid #334155'
                      }}>
                        <SyntaxHighlighter code={selectedTopic.content.codeExample} />
                      </div>
                    )
                  }
                  return (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      {sections.map((section, index) => {
                        const sectionKey = `${selectedTopic.id}-${index}`
                        const isExpanded = expandedSections[sectionKey]
                        return (
                          <div
                            key={index}
                            style={{
                              backgroundColor: 'white',
                              borderRadius: '12px',
                              border: `2px solid ${selectedTopic.color}33`,
                              overflow: 'hidden'
                            }}
                          >
                            <button
                              onClick={() => toggleSection(sectionKey)}
                              style={{
                                width: '100%',
                                padding: '1.25rem',
                                backgroundColor: isExpanded ? `${selectedTopic.color}15` : 'white',
                                border: 'none',
                                borderBottom: isExpanded ? `2px solid ${selectedTopic.color}33` : 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                transition: 'all 0.2s ease',
                                textAlign: 'left'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = `${selectedTopic.color}15`
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
                                color: selectedTopic.color
                              }}>
                                {section.title}
                              </span>
                              <span style={{
                                fontSize: '1.5rem',
                                color: selectedTopic.color,
                                transition: 'transform 0.3s ease',
                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
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

export default RestAPI

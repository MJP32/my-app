import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function RestAPIQuestions({ onBack, breadcrumb, problemLimit }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

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

      // Bullet points (lines starting with -)
      const bulletMatch = line.match(/^(\s*)-\s+(.+)$/)
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

  const questions = [
    {
      id: 1,
      category: 'Fundamentals',
      difficulty: 'Medium',
      question: 'Explain REST principles, HTTP methods, and status codes',
      answer: `**REST (Representational State Transfer):**
Architectural style for designing networked applications, treating server objects as resources that can be created, read, updated, or deleted

**REST Principles:**

**1. Client-Server Architecture:**
\`\`\`
- Separation of concerns
- Client handles UI/UX
- Server handles data storage and business logic
- Independent evolution
\`\`\`

**2. Stateless:**
\`\`\`
- Each request contains all necessary information
- Server doesn't store client context between requests
- Session state kept entirely on client
- Improves scalability
\`\`\`

**3. Cacheable:**
\`\`\`
- Responses must define themselves as cacheable or not
- Improves performance and scalability
- Reduces server load
\`\`\`

**4. Uniform Interface:**
\`\`\`
- Resource identification (URIs)
- Resource manipulation through representations
- Self-descriptive messages
- HATEOAS (Hypermedia as the Engine of Application State)
\`\`\`

**5. Layered System:**
\`\`\`
- Client can't tell if connected directly to end server
- Intermediary servers (load balancers, caches)
- Improves scalability
\`\`\`

**6. Code on Demand (Optional):**
\`\`\`
- Server can extend client functionality
- Transfer executable code (JavaScript)
\`\`\`

**HTTP Methods:**

**1. GET:**
\`\`\`java
// Retrieve resource(s)
@GetMapping("/api/users")
public List<User> getAllUsers() {
    return userService.findAll();
}

@GetMapping("/api/users/{id}")
public User getUserById(@PathVariable Long id) {
    return userService.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
}

// Idempotent: Multiple identical requests same as single request
// Safe: Doesn't modify server state
// Cacheable: Response can be cached
\`\`\`

**2. POST:**
\`\`\`java
// Create new resource
@PostMapping("/api/users")
public ResponseEntity<User> createUser(@RequestBody @Valid User user) {
    User savedUser = userService.save(user);
    URI location = ServletUriComponentsBuilder
        .fromCurrentRequest()
        .path("/{id}")
        .buildAndExpand(savedUser.getId())
        .toUri();
    return ResponseEntity.created(location).body(savedUser);
}

// Not idempotent: Multiple requests create multiple resources
// Not safe: Modifies server state
// Not cacheable
\`\`\`

**3. PUT:**
\`\`\`java
// Update entire resource
@PutMapping("/api/users/{id}")
public ResponseEntity<User> updateUser(
    @PathVariable Long id,
    @RequestBody @Valid User user
) {
    User updatedUser = userService.update(id, user);
    return ResponseEntity.ok(updatedUser);
}

// Idempotent: Multiple identical requests produce same result
// Not safe: Modifies server state
// Not cacheable
\`\`\`

**4. PATCH:**
\`\`\`java
// Partial update
@PatchMapping("/api/users/{id}")
public ResponseEntity<User> patchUser(
    @PathVariable Long id,
    @RequestBody Map<String, Object> updates
) {
    User patchedUser = userService.partialUpdate(id, updates);
    return ResponseEntity.ok(patchedUser);
}

// May or may not be idempotent (depends on implementation)
// Not safe: Modifies server state
\`\`\`

**5. DELETE:**
\`\`\`java
// Delete resource
@DeleteMapping("/api/users/{id}")
public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.delete(id);
    return ResponseEntity.noContent().build();
}

// Idempotent: Multiple deletions have same effect as single deletion
// Not safe: Modifies server state
// Not cacheable
\`\`\`

**6. HEAD:**
\`\`\`java
// Get headers without body (check if resource exists)
@RequestMapping(value = "/api/users/{id}", method = RequestMethod.HEAD)
public ResponseEntity<Void> checkUser(@PathVariable Long id) {
    boolean exists = userService.exists(id);
    return exists ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
}
\`\`\`

**7. OPTIONS:**
\`\`\`java
// Get allowed methods for resource
@RequestMapping(value = "/api/users/{id}", method = RequestMethod.OPTIONS)
public ResponseEntity<Void> options() {
    return ResponseEntity
        .ok()
        .allow(HttpMethod.GET, HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE)
        .build();
}
\`\`\`

**HTTP Status Codes:**

**1xx - Informational:**
\`\`\`
100 Continue
101 Switching Protocols
\`\`\`

**2xx - Success:**
\`\`\`
200 OK - Request succeeded
201 Created - Resource created successfully
202 Accepted - Request accepted for processing
204 No Content - Success but no content to return
206 Partial Content - Partial GET request
\`\`\`

**3xx - Redirection:**
\`\`\`
301 Moved Permanently
302 Found (Temporary redirect)
304 Not Modified (Cached version still valid)
307 Temporary Redirect
308 Permanent Redirect
\`\`\`

**4xx - Client Errors:**
\`\`\`
400 Bad Request - Malformed request
401 Unauthorized - Authentication required
403 Forbidden - Authenticated but not authorized
404 Not Found - Resource doesn't exist
405 Method Not Allowed - HTTP method not supported
409 Conflict - Request conflicts with current state
415 Unsupported Media Type
422 Unprocessable Entity - Validation errors
429 Too Many Requests - Rate limit exceeded
\`\`\`

**5xx - Server Errors:**
\`\`\`
500 Internal Server Error
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
\`\`\`

**Status Code Usage Examples:**
\`\`\`java
@RestController
@RequestMapping("/api/products")
public class ProductController {

    // 200 OK
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    // 201 Created
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product created = productService.save(product);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(created);
    }

    // 204 No Content
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // 404 Not Found
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        return productService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // 400 Bad Request
    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        if (product.getPrice() < 0) {
            return ResponseEntity
                .badRequest()
                .body("Price cannot be negative");
        }
        return ResponseEntity.ok(productService.save(product));
    }

    // 409 Conflict
    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        if (productService.existsByName(product.getName())) {
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body("Product already exists");
        }
        return ResponseEntity.ok(productService.save(product));
    }
}
\`\`\``
    },
    {
      id: 2,
      category: 'API Design',
      difficulty: 'Medium',
      question: 'What are REST API design best practices and conventions?',
      answer: `**REST API Design Best Practices:**

**1. Resource Naming:**

**Use Nouns, Not Verbs:**
\`\`\`
Good:
GET    /api/users          - Get all users
GET    /api/users/123      - Get specific user
POST   /api/users          - Create user
PUT    /api/users/123      - Update user
DELETE /api/users/123      - Delete user

Bad:
GET    /api/getUsers
POST   /api/createUser
PUT    /api/updateUser
DELETE /api/deleteUser
\`\`\`

**Use Plural Nouns:**
\`\`\`
Good: /api/users, /api/products, /api/orders
Bad:  /api/user, /api/product, /api/order
\`\`\`

**Hierarchical Resources:**
\`\`\`
GET /api/users/123/orders           - Get orders for user 123
GET /api/users/123/orders/456       - Get specific order for user
POST /api/users/123/orders          - Create order for user
GET /api/orders/456/items           - Get items for order
\`\`\`

**2. URL Structure:**

**Version Your API:**
\`\`\`java
// URI versioning
@RequestMapping("/api/v1/users")
@RequestMapping("/api/v2/users")

// Header versioning
@GetMapping(value = "/api/users", headers = "X-API-Version=1")
@GetMapping(value = "/api/users", headers = "X-API-Version=2")

// Accept header versioning
@GetMapping(value = "/api/users", produces = "application/vnd.company.v1+json")
@GetMapping(value = "/api/users", produces = "application/vnd.company.v2+json")
\`\`\`

**Use Query Parameters for Filtering:**
\`\`\`java
@GetMapping("/api/products")
public Page<Product> getProducts(
    @RequestParam(required = false) String category,
    @RequestParam(required = false) BigDecimal minPrice,
    @RequestParam(required = false) BigDecimal maxPrice,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size,
    @RequestParam(defaultValue = "name,asc") String[] sort
) {
    // GET /api/products?category=electronics&minPrice=100&maxPrice=500&page=0&size=20&sort=price,desc
}
\`\`\`

**3. Pagination:**
\`\`\`java
@GetMapping("/api/users")
public ResponseEntity<Map<String, Object>> getUsers(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size
) {
    Page<User> userPage = userService.findAll(PageRequest.of(page, size));

    Map<String, Object> response = new HashMap<>();
    response.put("users", userPage.getContent());
    response.put("currentPage", userPage.getNumber());
    response.put("totalItems", userPage.getTotalElements());
    response.put("totalPages", userPage.getTotalPages());

    return ResponseEntity.ok(response);
}

// Response:
{
  "users": [...],
  "currentPage": 0,
  "totalItems": 150,
  "totalPages": 8
}
\`\`\`

**4. Filtering and Searching:**
\`\`\`java
@GetMapping("/api/products/search")
public ResponseEntity<List<Product>> searchProducts(
    @RequestParam String query,
    @RequestParam(required = false) List<String> categories,
    @RequestParam(required = false) String sortBy
) {
    // GET /api/products/search?query=laptop&categories=electronics,computers&sortBy=price
    return ResponseEntity.ok(productService.search(query, categories, sortBy));
}
\`\`\`

**5. HATEOAS (Hypermedia):**
\`\`\`java
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@GetMapping("/api/users/{id}")
public EntityModel<User> getUser(@PathVariable Long id) {
    User user = userService.findById(id);

    EntityModel<User> resource = EntityModel.of(user);

    resource.add(linkTo(methodOn(UserController.class).getUser(id)).withSelfRel());
    resource.add(linkTo(methodOn(UserController.class).getUserOrders(id)).withRel("orders"));
    resource.add(linkTo(methodOn(UserController.class).getAllUsers()).withRel("all-users"));

    return resource;
}

// Response:
{
  "id": 123,
  "name": "John Doe",
  "_links": {
    "self": { "href": "http://localhost:8080/api/users/123" },
    "orders": { "href": "http://localhost:8080/api/users/123/orders" },
    "all-users": { "href": "http://localhost:8080/api/users" }
  }
}
\`\`\`

**6. Content Negotiation:**
\`\`\`java
@GetMapping(value = "/api/users/{id}",
    produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
public User getUser(@PathVariable Long id) {
    return userService.findById(id);
}

// Request:
// Accept: application/json  -> Returns JSON
// Accept: application/xml   -> Returns XML
\`\`\`

**7. Consistent Error Format:**
\`\`\`java
public class ApiError {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
    private List<ValidationError> errors;
}

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(
        ResourceNotFoundException ex,
        WebRequest request
    ) {
        ApiError error = new ApiError(
            LocalDateTime.now(),
            HttpStatus.NOT_FOUND.value(),
            "Not Found",
            ex.getMessage(),
            request.getDescription(false)
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
}
\`\`\`

**8. Rate Limiting:**
\`\`\`java
@RestController
public class ApiController {

    @GetMapping("/api/resource")
    @RateLimit(requests = 100, period = 1, unit = TimeUnit.HOURS)
    public ResponseEntity<?> getResource() {
        // Response headers:
        // X-RateLimit-Limit: 100
        // X-RateLimit-Remaining: 95
        // X-RateLimit-Reset: 1640000000
    }
}
\`\`\`

**9. Compression:**
\`\`\`yaml
# application.yml
server:
  compression:
    enabled: true
    mime-types: application/json,application/xml,text/html,text/xml,text/plain
    min-response-size: 1024
\`\`\`

**10. Security Headers:**
\`\`\`java
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.headers()
            .contentSecurityPolicy("default-src 'self'")
            .and()
            .xssProtection()
            .and()
            .contentTypeOptions()
            .and()
            .frameOptions().deny();

        return http.build();
    }
}
\`\`\`

**11. API Documentation:**
\`\`\`java
// Swagger/OpenAPI
@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "User API",
        version = "1.0",
        description = "User management API"
    )
)
public class OpenApiConfig {
}

@Operation(summary = "Get user by ID", description = "Returns a single user")
@ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Success"),
    @ApiResponse(responseCode = "404", description = "User not found")
})
@GetMapping("/api/users/{id}")
public User getUser(@PathVariable Long id) {
    return userService.findById(id);
}
\`\`\`

**12. Bulk Operations:**
\`\`\`java
@PostMapping("/api/users/bulk")
public ResponseEntity<List<User>> createUsers(
    @RequestBody List<User> users
) {
    List<User> created = userService.saveAll(users);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
}

@DeleteMapping("/api/users/bulk")
public ResponseEntity<Void> deleteUsers(
    @RequestParam List<Long> ids
) {
    userService.deleteAllById(ids);
    return ResponseEntity.noContent().build();
}
\`\`\``
    },
    {
      id: 3,
      category: 'Spring Boot REST',
      difficulty: 'Hard',
      question: 'How do you implement REST controllers in Spring Boot with advanced features?',
      answer: `**Spring Boot REST Implementation:**

**1. Basic REST Controller:**
\`\`\`java
@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
@Validated
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        return productService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(
        @RequestBody @Valid Product product
    ) {
        Product saved = productService.save(product);
        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(saved.getId())
            .toUri();
        return ResponseEntity.created(location).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
        @PathVariable Long id,
        @RequestBody @Valid Product product
    ) {
        return productService.update(id, product)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
\`\`\`

**2. Request/Response DTOs:**
\`\`\`java
// Request DTO
public class CreateProductRequest {
    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 100)
    private String name;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal price;

    @NotBlank
    private String category;
}

// Response DTO
public class ProductResponse {
    private Long id;
    private String name;
    private BigDecimal price;
    private String category;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

// Mapper
@Component
public class ProductMapper {
    public Product toEntity(CreateProductRequest request) {
        return Product.builder()
            .name(request.getName())
            .price(request.getPrice())
            .category(request.getCategory())
            .build();
    }

    public ProductResponse toResponse(Product product) {
        return ProductResponse.builder()
            .id(product.getId())
            .name(product.getName())
            .price(product.getPrice())
            .category(product.getCategory())
            .createdAt(product.getCreatedAt())
            .updatedAt(product.getUpdatedAt())
            .build();
    }
}

// Controller using DTOs
@PostMapping
public ResponseEntity<ProductResponse> createProduct(
    @RequestBody @Valid CreateProductRequest request
) {
    Product product = productMapper.toEntity(request);
    Product saved = productService.save(product);
    ProductResponse response = productMapper.toResponse(saved);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
}
\`\`\`

**3. Pagination and Sorting:**
\`\`\`java
@GetMapping
public ResponseEntity<Page<ProductResponse>> getProducts(
    @PageableDefault(size = 20, sort = "name", direction = Sort.Direction.ASC)
    Pageable pageable
) {
    Page<Product> products = productService.findAll(pageable);
    Page<ProductResponse> response = products.map(productMapper::toResponse);
    return ResponseEntity.ok(response);
}

// Custom pagination response
@GetMapping
public ResponseEntity<PagedResponse<ProductResponse>> getProducts(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size,
    @RequestParam(defaultValue = "name") String sortBy,
    @RequestParam(defaultValue = "asc") String direction
) {
    Sort.Direction dir = direction.equalsIgnoreCase("asc")
        ? Sort.Direction.ASC : Sort.Direction.DESC;
    Pageable pageable = PageRequest.of(page, size, Sort.by(dir, sortBy));

    Page<Product> productPage = productService.findAll(pageable);

    PagedResponse<ProductResponse> response = new PagedResponse<>(
        productPage.map(productMapper::toResponse).getContent(),
        productPage.getNumber(),
        productPage.getSize(),
        productPage.getTotalElements(),
        productPage.getTotalPages(),
        productPage.isLast()
    );

    return ResponseEntity.ok(response);
}
\`\`\`

**4. Advanced Filtering:**
\`\`\`java
@GetMapping("/search")
public ResponseEntity<List<ProductResponse>> searchProducts(
    @RequestParam(required = false) String name,
    @RequestParam(required = false) BigDecimal minPrice,
    @RequestParam(required = false) BigDecimal maxPrice,
    @RequestParam(required = false) String category
) {
    ProductSearchCriteria criteria = ProductSearchCriteria.builder()
        .name(name)
        .minPrice(minPrice)
        .maxPrice(maxPrice)
        .category(category)
        .build();

    List<Product> products = productService.search(criteria);
    List<ProductResponse> response = products.stream()
        .map(productMapper::toResponse)
        .collect(Collectors.toList());

    return ResponseEntity.ok(response);
}

// Specification pattern
public class ProductSpecification {
    public static Specification<Product> hasName(String name) {
        return (root, query, cb) ->
            name == null ? null : cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    }

    public static Specification<Product> hasPriceBetween(BigDecimal min, BigDecimal max) {
        return (root, query, cb) -> {
            if (min == null && max == null) return null;
            if (min == null) return cb.lessThanOrEqualTo(root.get("price"), max);
            if (max == null) return cb.greaterThanOrEqualTo(root.get("price"), min);
            return cb.between(root.get("price"), min, max);
        };
    }

    public static Specification<Product> hasCategory(String category) {
        return (root, query, cb) ->
            category == null ? null : cb.equal(root.get("category"), category);
    }
}

// Service using specifications
public List<Product> search(ProductSearchCriteria criteria) {
    Specification<Product> spec = Specification
        .where(ProductSpecification.hasName(criteria.getName()))
        .and(ProductSpecification.hasPriceBetween(criteria.getMinPrice(), criteria.getMaxPrice()))
        .and(ProductSpecification.hasCategory(criteria.getCategory()));

    return productRepository.findAll(spec);
}
\`\`\`

**5. Async Processing:**
\`\`\`java
@PostMapping("/async")
public ResponseEntity<String> createProductAsync(
    @RequestBody @Valid Product product
) {
    CompletableFuture<Product> future = productService.saveAsync(product);
    return ResponseEntity.accepted()
        .header("Location", "/api/products/status/123")
        .body("Processing request");
}

@GetMapping("/status/{requestId}")
public ResponseEntity<?> getStatus(@PathVariable String requestId) {
    // Check status of async operation
    return ResponseEntity.ok(statusService.getStatus(requestId));
}

// Service
@Async
public CompletableFuture<Product> saveAsync(Product product) {
    Product saved = productRepository.save(product);
    return CompletableFuture.completedFuture(saved);
}
\`\`\`

**6. File Upload/Download:**
\`\`\`java
@PostMapping("/upload")
public ResponseEntity<String> uploadFile(
    @RequestParam("file") MultipartFile file
) {
    if (file.isEmpty()) {
        return ResponseEntity.badRequest().body("File is empty");
    }

    String fileUrl = fileService.store(file);
    return ResponseEntity.ok(fileUrl);
}

@GetMapping("/download/{fileId}")
public ResponseEntity<Resource> downloadFile(@PathVariable String fileId) {
    Resource resource = fileService.loadFileAsResource(fileId);

    return ResponseEntity.ok()
        .contentType(MediaType.APPLICATION_OCTET_STREAM)
        .header(HttpHeaders.CONTENT_DISPOSITION,
            "attachment; filename=\\"" + resource.getFilename() + "\\"")
        .body(resource);
}
\`\`\`

**7. Streaming Response:**
\`\`\`java
@GetMapping(value = "/stream", produces = MediaType.APPLICATION_NDJSON_VALUE)
public Flux<Product> streamProducts() {
    return productService.streamAll();
}

@GetMapping(value = "/sse", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
public Flux<ServerSentEvent<Product>> streamProductsSSE() {
    return productService.streamAll()
        .map(product -> ServerSentEvent.<Product>builder()
            .id(String.valueOf(product.getId()))
            .event("product-update")
            .data(product)
            .build());
}
\`\`\`

**8. Caching:**
\`\`\`java
@Configuration
@EnableCaching
public class CacheConfig {
    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("products");
    }
}

@Service
public class ProductService {

    @Cacheable(value = "products", key = "#id")
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    @CachePut(value = "products", key = "#product.id")
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @CacheEvict(value = "products", key = "#id")
    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    @CacheEvict(value = "products", allEntries = true)
    public void deleteAll() {
        productRepository.deleteAll();
    }
}
\`\`\``
    },
    {
      id: 4,
      category: 'Validation & Error Handling',
      difficulty: 'Medium',
      question: 'How do you implement validation and error handling in Spring Boot REST APIs?',
      answer: `**Validation and Error Handling:**

**1. Bean Validation:**
\`\`\`java
import jakarta.validation.constraints.*;

public class ProductRequest {
    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
    private String name;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    @DecimalMax(value = "999999.99", message = "Price cannot exceed 999999.99")
    private BigDecimal price;

    @NotBlank(message = "Category is required")
    @Pattern(regexp = "^(electronics|clothing|books)$", message = "Invalid category")
    private String category;

    @Email(message = "Invalid email format")
    private String contactEmail;

    @Min(value = 0, message = "Stock cannot be negative")
    @Max(value = 10000, message = "Stock cannot exceed 10000")
    private Integer stock;

    @Future(message = "Launch date must be in the future")
    private LocalDate launchDate;

    @URL(message = "Invalid URL format")
    private String productUrl;
}

// Controller
@PostMapping
public ResponseEntity<Product> createProduct(
    @RequestBody @Valid ProductRequest request,
    BindingResult result
) {
    if (result.hasErrors()) {
        // Handle validation errors
        throw new ValidationException(result);
    }
    Product product = productService.save(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(product);
}
\`\`\`

**2. Custom Validators:**
\`\`\`java
// Custom annotation
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UniqueProductNameValidator.class)
public @interface UniqueProductName {
    String message() default "Product name already exists";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

// Validator implementation
@Component
public class UniqueProductNameValidator
    implements ConstraintValidator<UniqueProductName, String> {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public boolean isValid(String name, ConstraintValidatorContext context) {
        if (name == null) return true;
        return !productRepository.existsByName(name);
    }
}

// Usage
public class ProductRequest {
    @UniqueProductName
    @NotBlank
    private String name;
}
\`\`\`

**3. Validation Groups:**
\`\`\`java
public interface CreateValidation {}
public interface UpdateValidation {}

public class ProductRequest {
    @Null(groups = CreateValidation.class)
    @NotNull(groups = UpdateValidation.class)
    private Long id;

    @NotBlank(groups = {CreateValidation.class, UpdateValidation.class})
    private String name;
}

// Controller
@PostMapping
public ResponseEntity<Product> createProduct(
    @Validated(CreateValidation.class) @RequestBody ProductRequest request
) {
    return ResponseEntity.ok(productService.save(request));
}

@PutMapping("/{id}")
public ResponseEntity<Product> updateProduct(
    @PathVariable Long id,
    @Validated(UpdateValidation.class) @RequestBody ProductRequest request
) {
    return ResponseEntity.ok(productService.update(id, request));
}
\`\`\`

**4. Global Exception Handler:**
\`\`\`java
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleValidationException(
        MethodArgumentNotValidException ex
    ) {
        List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();

        Map<String, String> errors = fieldErrors.stream()
            .collect(Collectors.toMap(
                FieldError::getField,
                error -> error.getDefaultMessage(),
                (existing, replacement) -> existing
            ));

        return ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.BAD_REQUEST.value())
            .error("Validation Failed")
            .message("Input validation failed")
            .errors(errors)
            .build();
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFoundException(
        ResourceNotFoundException ex,
        WebRequest request
    ) {
        return ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.NOT_FOUND.value())
            .error("Not Found")
            .message(ex.getMessage())
            .path(request.getDescription(false))
            .build();
    }

    @ExceptionHandler(DuplicateResourceException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponse handleDuplicateException(
        DuplicateResourceException ex
    ) {
        return ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.CONFLICT.value())
            .error("Conflict")
            .message(ex.getMessage())
            .build();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleIllegalArgument(
        IllegalArgumentException ex
    ) {
        return ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.BAD_REQUEST.value())
            .error("Bad Request")
            .message(ex.getMessage())
            .build();
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponse handleDataIntegrityViolation(
        DataIntegrityViolationException ex
    ) {
        log.error("Data integrity violation", ex);
        return ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.CONFLICT.value())
            .error("Data Integrity Violation")
            .message("Database constraint violation occurred")
            .build();
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleGenericException(Exception ex) {
        log.error("Unexpected error occurred", ex);
        return ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
            .error("Internal Server Error")
            .message("An unexpected error occurred")
            .build();
    }
}
\`\`\`

**5. Error Response Model:**
\`\`\`java
@Data
@Builder
public class ErrorResponse {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
    private Map<String, String> errors;  // For validation errors
}

// Example response:
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 400,
  "error": "Validation Failed",
  "message": "Input validation failed",
  "errors": {
    "name": "Name is required",
    "price": "Price must be greater than 0",
    "email": "Invalid email format"
  }
}
\`\`\`

**6. Custom Exceptions:**
\`\`\`java
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String resource, String field, Object value) {
        super(String.format("%s not found with %s: '%s'", resource, field, value));
    }
}

public class DuplicateResourceException extends RuntimeException {
    public DuplicateResourceException(String message) {
        super(message);
    }
}

public class InvalidOperationException extends RuntimeException {
    public InvalidOperationException(String message) {
        super(message);
    }
}

// Usage in service
public Product findById(Long id) {
    return productRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
}
\`\`\`

**7. Problem Details (RFC 7807):**
\`\`\`java
@Configuration
public class ProblemDetailsConfig {
    @Bean
    public ProblemDetailsExceptionHandler problemDetailsExceptionHandler() {
        return new ProblemDetailsExceptionHandler();
    }
}

@RestControllerAdvice
public class ProblemDetailsHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleNotFoundException(ResourceNotFoundException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
            HttpStatus.NOT_FOUND,
            ex.getMessage()
        );
        problemDetail.setTitle("Resource Not Found");
        problemDetail.setProperty("timestamp", LocalDateTime.now());
        return problemDetail;
    }
}

// Response:
{
  "type": "about:blank",
  "title": "Resource Not Found",
  "status": 404,
  "detail": "Product not found with id: '123'",
  "timestamp": "2024-01-15T10:30:00"
}
\`\`\`

**8. Input Sanitization:**
\`\`\`java
@Component
public class InputSanitizer {

    public String sanitize(String input) {
        if (input == null) return null;
        return input.trim()
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll("\\"", "&quot;");
    }
}

@PostMapping
public ResponseEntity<Product> createProduct(
    @RequestBody @Valid ProductRequest request
) {
    request.setName(inputSanitizer.sanitize(request.getName()));
    return ResponseEntity.ok(productService.save(request));
}
\`\`\``
    }
  ]

  // Filter questions based on problemLimit (for Top 100/300 mode)
  const displayQuestions = problemLimit ? questions.slice(0, problemLimit) : questions

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Fundamentals': '#ef4444',
      'API Design': '#3b82f6',
      'Spring Boot REST': '#7c3aed',
      'Validation & Error Handling': '#f59e0b'
    }
    return colors[category] || '#6b7280'
  }

  const getDifficultyColor = (difficulty) => {
    return difficulty === 'Medium' ? '#f59e0b' : '#dc2626'
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
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
        >
          ← Back to Questions
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#93c5fd',
          margin: 0
        }}>
          REST API Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

      <CollapsibleSidebar
        items={displayQuestions}
        selectedIndex={expandedQuestion ? displayQuestions.findIndex(q => q.id === expandedQuestion) : -1}
        onSelect={(index) => toggleQuestion(displayQuestions[index].id)}
        title="Questions"
        getItemLabel={(item) => `${item.id}. ${item.category}`}
        getItemIcon={() => '❓'}
        primaryColor="#3b82f6"
      />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'left',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Comprehensive REST API questions covering principles, HTTP methods, API design, Spring Boot REST controllers, and validation.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {displayQuestions.map((q) => (
          <div
            key={q.id}
            style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              borderRadius: '12px',
              border: `3px solid ${expandedQuestion === q.id ? getCategoryColor(q.category) : '#374151'}`,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: expandedQuestion === q.id
                ? '0 8px 16px rgba(0,0,0,0.3)'
                : '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <button
              onClick={() => toggleQuestion(q.id)}
              style={{
                width: '100%',
                padding: '1.5rem',
                backgroundColor: expandedQuestion === q.id
                  ? `${getCategoryColor(q.category)}15`
                  : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                if (expandedQuestion !== q.id) {
                  e.currentTarget.style.backgroundColor = '#374151'
                }
              }}
              onMouseLeave={(e) => {
                if (expandedQuestion !== q.id) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', textAlign: 'left' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: getCategoryColor(q.category),
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {q.category}
                  </div>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: getDifficultyColor(q.difficulty),
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {q.difficulty}
                  </div>
                </div>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: '700',
                  color: '#e2e8f0',
                  margin: 0
                }}>
                  Q{q.id}. {q.question}
                </h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div onClick={(e) => e.stopPropagation()} style={{ transform: 'scale(0.85)' }}>
                  <CompletionCheckbox problemId={`RestAPIQuestions-${q.id}`} />
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  color: getCategoryColor(q.category),
                  fontWeight: 'bold',
                  transform: expandedQuestion === q.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  ▼
                </div>
              </div>
            </button>

            {expandedQuestion === q.id && (
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#1e293b',
                borderTop: `2px solid ${getCategoryColor(q.category)}40`
              }}>
                <div style={{
                  fontSize: '1rem',
          textAlign: 'left',
                  lineHeight: '1.8',
                  color: '#d1d5db',
                  fontFamily: 'system-ui, -apple-system, sans-serif',

                }}>
                  {renderFormattedAnswer(q.answer)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderRadius: '12px',
        border: '2px solid #6366f1'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#a5b4fc', marginBottom: '0.5rem', textAlign: 'left' }}>
          REST API Best Practices
        </h3>
        <ul style={{ color: '#d1d5db', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Use nouns for resource URIs, not verbs</li>
          <li>Implement proper HTTP status codes for all responses</li>
          <li>Version your APIs from the start</li>
          <li>Provide comprehensive input validation and error messages</li>
          <li>Implement pagination, filtering, and sorting for collections</li>
          <li>Use HATEOAS for discoverability</li>
          <li>Secure APIs with proper authentication and authorization</li>
          <li>Document APIs using OpenAPI/Swagger</li>
        </ul>
      </div>
    </div>
  )
}

export default RestAPIQuestions

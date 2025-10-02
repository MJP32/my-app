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
      .replace(/\b(String|List|ArrayList|HashMap|Optional|Stream|Exception|RuntimeException)\b/g, '<span style="color: #4ec9b0;">$1</span>')
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

function SystemDesign({ onBack }) {
  const [selectedTopic, setSelectedTopic] = useState(null)

  const systemDesignTopics = [
    {
      id: 1,
      name: 'Scalability Patterns',
      icon: '📈',
      color: '#3b82f6',
      description: 'Horizontal and vertical scaling strategies',
      content: {
        explanation: 'Scalability enables systems to handle increased load. Horizontal scaling (scale-out) adds more servers, while vertical scaling (scale-up) adds resources to existing servers. Database sharding partitions data across multiple databases. Read replicas distribute read load. Partitioning strategies include range-based, hash-based, and geographic. Microservices architecture enables independent scaling of services.',
        keyPoints: [
          'Horizontal scaling - add more servers, better fault tolerance, preferred for cloud',
          'Vertical scaling - add CPU/RAM to existing servers, simpler but limited',
          'Database sharding - partition data across databases by key (user ID, region)',
          'Read replicas - distribute read load, eventual consistency trade-off',
          'Partitioning strategies - range, hash, geographic, list-based partitioning',
          'Microservices - independently scalable services, polyglot persistence'
        ],
        codeExample: `// Horizontal Scaling with Load Balancing
@Configuration
public class LoadBalancedServiceConfig {

  @Bean
  @LoadBalanced
  public RestTemplate restTemplate() {
    return new RestTemplate();
  }

  @Bean
  public Sampler defaultSampler() {
    return Sampler.ALWAYS_SAMPLE;
  }
}

@Service
public class UserService {

  @Autowired
  @LoadBalanced
  private RestTemplate restTemplate;

  public User getUser(Long id) {
    // Load balancer automatically distributes across instances
    return restTemplate.getForObject(
      "http://user-service/api/users/" + id,
      User.class
    );
  }
}

// Database Sharding Strategy
@Service
public class ShardingService {

  private final Map<Integer, DataSource> shards = new HashMap<>();

  public ShardingService() {
    // Initialize shards
    shards.put(0, createDataSource("shard-0"));
    shards.put(1, createDataSource("shard-1"));
    shards.put(2, createDataSource("shard-2"));
    shards.put(3, createDataSource("shard-3"));
  }

  public int getShardId(Long userId) {
    // Hash-based sharding
    return Math.abs(userId.hashCode() % shards.size());
  }

  public User getUserFromShard(Long userId) {
    int shardId = getShardId(userId);
    DataSource dataSource = shards.get(shardId);

    JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
    return jdbcTemplate.queryForObject(
      "SELECT * FROM users WHERE id = ?",
      userRowMapper,
      userId
    );
  }

  // Range-based sharding
  public int getShardByRange(Long userId) {
    if (userId < 1000000) return 0;
    if (userId < 2000000) return 1;
    if (userId < 3000000) return 2;
    return 3;
  }

  // Geographic sharding
  public int getShardByRegion(String region) {
    return switch (region) {
      case "US-EAST" -> 0;
      case "US-WEST" -> 1;
      case "EU" -> 2;
      case "ASIA" -> 3;
      default -> 0;
    };
  }
}

// Read Replica Configuration
@Configuration
public class DataSourceConfig {

  @Bean
  @Primary
  public DataSource primaryDataSource() {
    return DataSourceBuilder.create()
      .url("jdbc:mysql://primary-db:3306/mydb")
      .username("user")
      .password("password")
      .build();
  }

  @Bean
  public DataSource replicaDataSource() {
    return DataSourceBuilder.create()
      .url("jdbc:mysql://replica-db:3306/mydb")
      .username("user")
      .password("password")
      .build();
  }

  @Bean
  public DataSource routingDataSource() {
    RoutingDataSource routingDataSource = new RoutingDataSource();

    Map<Object, Object> dataSourceMap = new HashMap<>();
    dataSourceMap.put("PRIMARY", primaryDataSource());
    dataSourceMap.put("REPLICA", replicaDataSource());

    routingDataSource.setTargetDataSources(dataSourceMap);
    routingDataSource.setDefaultTargetDataSource(primaryDataSource());

    return routingDataSource;
  }
}

public class RoutingDataSource extends AbstractRoutingDataSource {

  @Override
  protected Object determineCurrentLookupKey() {
    return DataSourceContext.getDataSourceType();
  }
}

@Service
public class UserQueryService {

  @Transactional(readOnly = true)
  public List<User> getAllUsers() {
    // Route to read replica
    DataSourceContext.setDataSourceType("REPLICA");
    return userRepository.findAll();
  }

  @Transactional
  public User createUser(User user) {
    // Route to primary
    DataSourceContext.setDataSourceType("PRIMARY");
    return userRepository.save(user);
  }
}

// Microservices Scaling
/*
# docker-compose.yml - Scale services independently
version: '3.8'
services:
  user-service:
    image: user-service:latest
    deploy:
      replicas: 5  # Scale to 5 instances
      resources:
        limits:
          cpus: '0.5'
          memory: 512M

  order-service:
    image: order-service:latest
    deploy:
      replicas: 3  # Scale based on load
      resources:
        limits:
          cpus: '1.0'
          memory: 1G

  payment-service:
    image: payment-service:latest
    deploy:
      replicas: 2  # Critical service
      resources:
        limits:
          cpus: '2.0'
          memory: 2G

# Kubernetes auto-scaling
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: user-service-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: user-service
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
*/

// Vertical Scaling Configuration
@Configuration
public class VerticalScalingConfig {

  @Bean
  public ThreadPoolTaskExecutor taskExecutor() {
    ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
    executor.setCorePoolSize(20);      // Increased from 10
    executor.setMaxPoolSize(100);      // Increased from 50
    executor.setQueueCapacity(500);    // Increased from 200
    executor.setThreadNamePrefix("async-");
    executor.initialize();
    return executor;
  }

  @Bean
  public HikariDataSource dataSource() {
    HikariConfig config = new HikariConfig();
    config.setJdbcUrl("jdbc:mysql://localhost:3306/mydb");
    config.setUsername("user");
    config.setPassword("password");
    config.setMaximumPoolSize(50);     // Increased pool size
    config.setMinimumIdle(20);
    config.setConnectionTimeout(30000);
    return new HikariDataSource(config);
  }
}

// Consistent Hashing for Distributed Caching
public class ConsistentHashing {

  private final TreeMap<Long, String> ring = new TreeMap<>();
  private final int virtualNodes = 150;

  public void addNode(String node) {
    for (int i = 0; i < virtualNodes; i++) {
      long hash = hash(node + ":" + i);
      ring.put(hash, node);
    }
  }

  public void removeNode(String node) {
    for (int i = 0; i < virtualNodes; i++) {
      long hash = hash(node + ":" + i);
      ring.remove(hash);
    }
  }

  public String getNode(String key) {
    if (ring.isEmpty()) return null;

    long hash = hash(key);
    Map.Entry<Long, String> entry = ring.ceilingEntry(hash);

    if (entry == null) {
      entry = ring.firstEntry();
    }

    return entry.getValue();
  }

  private long hash(String key) {
    return key.hashCode() & 0xFFFFFFFFL;
  }
}`
      }
    },
    {
      id: 2,
      name: 'High Availability',
      icon: '🔄',
      color: '#10b981',
      description: 'Ensuring system uptime and reliability',
      content: {
        explanation: 'High Availability (HA) ensures systems remain operational during failures. Redundancy provides backup components. Active-Active configurations distribute load across all nodes. Active-Passive has standby nodes ready for failover. Health checks detect failures early. Circuit breakers prevent cascading failures using libraries like Resilience4j. Failover mechanisms automatically redirect traffic to healthy instances.',
        keyPoints: [
          'Redundancy - eliminate single points of failure, duplicate critical components',
          'Active-Active - all nodes serve traffic, better resource utilization',
          'Active-Passive - standby nodes activate on failure, simpler failover',
          'Health checks - monitor service health, automated failure detection',
          'Circuit breakers (Resilience4j) - prevent cascade failures, fail fast',
          'Failover - automatic traffic redirection to healthy instances'
        ],
        codeExample: `// Resilience4j Circuit Breaker
@Configuration
public class CircuitBreakerConfig {

  @Bean
  public CircuitBreakerRegistry circuitBreakerRegistry() {
    CircuitBreakerConfig config = CircuitBreakerConfig.custom()
      .failureRateThreshold(50)                    // 50% failure rate
      .waitDurationInOpenState(Duration.ofSeconds(30))
      .slidingWindowSize(10)                       // Last 10 calls
      .minimumNumberOfCalls(5)                     // Minimum calls before calculation
      .permittedNumberOfCallsInHalfOpenState(3)
      .automaticTransitionFromOpenToHalfOpenEnabled(true)
      .build();

    return CircuitBreakerRegistry.of(config);
  }
}

@Service
public class PaymentService {

  private final CircuitBreaker circuitBreaker;
  private final RestTemplate restTemplate;

  public PaymentService(CircuitBreakerRegistry registry) {
    this.circuitBreaker = registry.circuitBreaker("payment-service");
    this.restTemplate = new RestTemplate();
  }

  public PaymentResponse processPayment(PaymentRequest request) {
    // Wrap external call with circuit breaker
    return circuitBreaker.executeSupplier(() -> {
      try {
        return restTemplate.postForObject(
          "http://payment-gateway/process",
          request,
          PaymentResponse.class
        );
      } catch (Exception e) {
        // Circuit breaker counts this as failure
        throw new PaymentException("Payment failed", e);
      }
    });
  }

  public PaymentResponse processPaymentWithFallback(PaymentRequest request) {
    return circuitBreaker.executeSupplier(() ->
      callPaymentGateway(request)
    ).recover(throwable -> {
      // Fallback: queue for retry
      log.error("Payment failed, queuing for retry", throwable);
      queuePaymentForRetry(request);
      return PaymentResponse.pending();
    }).get();
  }
}

// Health Check Implementation
@RestController
public class HealthCheckController {

  @Autowired
  private DataSource dataSource;

  @Autowired
  private RedisTemplate<String, String> redisTemplate;

  @GetMapping("/health")
  public ResponseEntity<HealthStatus> healthCheck() {
    HealthStatus status = new HealthStatus();

    // Check database connectivity
    try (Connection conn = dataSource.getConnection()) {
      status.setDatabase("UP");
    } catch (SQLException e) {
      status.setDatabase("DOWN");
      status.setHealthy(false);
    }

    // Check Redis connectivity
    try {
      redisTemplate.opsForValue().get("health-check");
      status.setCache("UP");
    } catch (Exception e) {
      status.setCache("DOWN");
      status.setHealthy(false);
    }

    // Check external dependencies
    status.setPaymentGateway(checkPaymentGateway());

    return status.isHealthy()
      ? ResponseEntity.ok(status)
      : ResponseEntity.status(503).body(status);
  }

  @GetMapping("/health/live")
  public ResponseEntity<String> liveness() {
    // Simple liveness check - is app running?
    return ResponseEntity.ok("ALIVE");
  }

  @GetMapping("/health/ready")
  public ResponseEntity<String> readiness() {
    // Readiness check - can app serve traffic?
    if (isReadyToServeTraffic()) {
      return ResponseEntity.ok("READY");
    }
    return ResponseEntity.status(503).body("NOT_READY");
  }
}

// Active-Active High Availability
/*
# Kubernetes Deployment - Active-Active
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3  # Multiple active instances
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: user-service:latest
        ports:
        - containerPort: 8080
        livenessProbe:
          httpGet:
            path: /health/live
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health/ready
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: user-service
spec:
  selector:
    app: user-service
  ports:
  - port: 80
    targetPort: 8080
  type: LoadBalancer
*/

// Retry with Exponential Backoff
@Service
public class ResilientService {

  @Retry(
    name = "userService",
    fallbackMethod = "fallbackGetUser"
  )
  @CircuitBreaker(
    name = "userService",
    fallbackMethod = "fallbackGetUser"
  )
  public User getUser(Long id) {
    return restTemplate.getForObject(
      "http://user-service/api/users/" + id,
      User.class
    );
  }

  private User fallbackGetUser(Long id, Exception e) {
    log.warn("Fallback triggered for user: " + id, e);
    // Return cached data or default user
    return userCache.getOrDefault(id, User.defaultUser());
  }
}

// application.yml - Resilience4j Configuration
/*
resilience4j:
  circuitbreaker:
    instances:
      userService:
        registerHealthIndicator: true
        slidingWindowSize: 10
        minimumNumberOfCalls: 5
        permittedNumberOfCallsInHalfOpenState: 3
        automaticTransitionFromOpenToHalfOpenEnabled: true
        waitDurationInOpenState: 30s
        failureRateThreshold: 50
        eventConsumerBufferSize: 10

  retry:
    instances:
      userService:
        maxAttempts: 3
        waitDuration: 1s
        enableExponentialBackoff: true
        exponentialBackoffMultiplier: 2
        retryExceptions:
          - org.springframework.web.client.HttpServerErrorException
          - java.net.SocketTimeoutException

  timelimiter:
    instances:
      userService:
        timeoutDuration: 3s
        cancelRunningFuture: true
*/

// Failover with Service Discovery
@Configuration
@EnableDiscoveryClient
public class FailoverConfig {

  @Bean
  @LoadBalanced
  public RestTemplate restTemplate() {
    return new RestTemplate();
  }
}

@Service
public class FailoverService {

  @Autowired
  private DiscoveryClient discoveryClient;

  public User getUserWithFailover(Long id) {
    List<ServiceInstance> instances =
      discoveryClient.getInstances("user-service");

    for (ServiceInstance instance : instances) {
      try {
        String url = instance.getUri() + "/api/users/" + id;
        return restTemplate.getForObject(url, User.class);
      } catch (Exception e) {
        log.warn("Instance {} failed, trying next", instance.getUri());
        continue;
      }
    }

    throw new ServiceUnavailableException("All instances failed");
  }
}

// Database Failover
@Configuration
public class DatabaseFailoverConfig {

  @Bean
  public DataSource dataSource() {
    HikariConfig primary = new HikariConfig();
    primary.setJdbcUrl("jdbc:mysql://primary:3306/db");

    HikariConfig replica = new HikariConfig();
    replica.setJdbcUrl("jdbc:mysql://replica:3306/db");

    return new FailoverDataSource(
      new HikariDataSource(primary),
      new HikariDataSource(replica)
    );
  }
}

public class FailoverDataSource extends AbstractRoutingDataSource {

  private final DataSource primary;
  private final DataSource replica;
  private volatile boolean primaryHealthy = true;

  public FailoverDataSource(DataSource primary, DataSource replica) {
    this.primary = primary;
    this.replica = replica;

    Map<Object, Object> dataSourceMap = new HashMap<>();
    dataSourceMap.put("PRIMARY", primary);
    dataSourceMap.put("REPLICA", replica);

    setTargetDataSources(dataSourceMap);
    setDefaultTargetDataSource(primary);

    // Start health check
    scheduleHealthCheck();
  }

  @Override
  protected Object determineCurrentLookupKey() {
    return primaryHealthy ? "PRIMARY" : "REPLICA";
  }

  private void scheduleHealthCheck() {
    ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
    executor.scheduleAtFixedRate(() -> {
      try (Connection conn = primary.getConnection()) {
        conn.createStatement().execute("SELECT 1");
        primaryHealthy = true;
      } catch (SQLException e) {
        log.error("Primary database down, failing over to replica");
        primaryHealthy = false;
      }
    }, 0, 10, TimeUnit.SECONDS);
  }
}`
      }
    },
    {
      id: 3,
      name: 'Caching Strategies',
      icon: '⚡',
      color: '#f59e0b',
      description: 'Cache patterns for performance',
      content: {
        explanation: 'Caching stores frequently accessed data in fast storage to reduce latency and database load. Cache-aside (lazy loading) loads data on cache miss. Write-through updates cache and database synchronously. Write-behind queues writes for async persistence. Redis and Memcached provide distributed caching. CDN caches static content at edge locations. Cache invalidation strategies include TTL, event-based, and manual invalidation.',
        keyPoints: [
          'Cache-aside (lazy loading) - read from cache, load on miss, app manages cache',
          'Write-through - write to cache and database synchronously, ensures consistency',
          'Write-behind (write-back) - write to cache immediately, persist async to database',
          'Redis/Memcached - distributed in-memory caches, Redis supports data structures',
          'CDN - caches static assets at edge locations, reduces latency globally',
          'Cache invalidation - TTL expiration, event-based, manual purge strategies'
        ],
        codeExample: `// Cache-Aside Pattern (Lazy Loading)
@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RedisTemplate<String, User> redisTemplate;

  private static final String CACHE_KEY_PREFIX = "user:";
  private static final long CACHE_TTL = 3600; // 1 hour

  public User getUserById(Long id) {
    String cacheKey = CACHE_KEY_PREFIX + id;

    // Try cache first
    User cachedUser = redisTemplate.opsForValue().get(cacheKey);
    if (cachedUser != null) {
      log.debug("Cache hit for user: {}", id);
      return cachedUser;
    }

    // Cache miss - load from database
    log.debug("Cache miss for user: {}", id);
    User user = userRepository.findById(id)
      .orElseThrow(() -> new UserNotFoundException(id));

    // Update cache
    redisTemplate.opsForValue().set(cacheKey, user, CACHE_TTL, TimeUnit.SECONDS);

    return user;
  }

  public void deleteUser(Long id) {
    userRepository.deleteById(id);

    // Invalidate cache
    String cacheKey = CACHE_KEY_PREFIX + id;
    redisTemplate.delete(cacheKey);
  }
}

// Write-Through Pattern
@Service
public class WriteThrough Cache Service {

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private RedisTemplate<String, Product> redisTemplate;

  @Transactional
  public Product updateProduct(Product product) {
    // Write to database
    Product saved = productRepository.save(product);

    // Write to cache (synchronously)
    String cacheKey = "product:" + product.getId();
    redisTemplate.opsForValue().set(cacheKey, saved, 1, TimeUnit.HOURS);

    return saved;
  }

  public Product getProduct(Long id) {
    String cacheKey = "product:" + id;

    // Read from cache
    Product cached = redisTemplate.opsForValue().get(cacheKey);
    if (cached != null) {
      return cached;
    }

    // Load from database and cache
    Product product = productRepository.findById(id).orElseThrow();
    redisTemplate.opsForValue().set(cacheKey, product, 1, TimeUnit.HOURS);

    return product;
  }
}

// Write-Behind (Write-Back) Pattern
@Service
public class WriteBehindCacheService {

  @Autowired
  private RedisTemplate<String, Order> redisTemplate;

  @Autowired
  private OrderRepository orderRepository;

  private final BlockingQueue<Order> writeQueue = new LinkedBlockingQueue<>();

  @PostConstruct
  public void startAsyncWriter() {
    ExecutorService executor = Executors.newSingleThreadExecutor();
    executor.submit(() -> {
      while (true) {
        try {
          Order order = writeQueue.take();
          orderRepository.save(order);
          log.debug("Persisted order: {}", order.getId());
        } catch (InterruptedException e) {
          Thread.currentThread().interrupt();
          break;
        }
      }
    });
  }

  public Order createOrder(Order order) {
    order.setCreatedAt(LocalDateTime.now());

    // Write to cache immediately
    String cacheKey = "order:" + order.getId();
    redisTemplate.opsForValue().set(cacheKey, order, 30, TimeUnit.MINUTES);

    // Queue for async database write
    writeQueue.offer(order);

    return order;
  }
}

// Spring Cache Abstraction
@Configuration
@EnableCaching
public class CacheConfig {

  @Bean
  public CacheManager cacheManager(RedisConnectionFactory factory) {
    RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
      .entryTtl(Duration.ofHours(1))
      .serializeKeysWith(
        RedisSerializationContext.SerializationPair.fromSerializer(
          new StringRedisSerializer()
        )
      )
      .serializeValuesWith(
        RedisSerializationContext.SerializationPair.fromSerializer(
          new GenericJackson2JsonRedisSerializer()
        )
      );

    return RedisCacheManager.builder(factory)
      .cacheDefaults(config)
      .build();
  }
}

@Service
public class CachedUserService {

  @Cacheable(value = "users", key = "#id")
  public User getUserById(Long id) {
    log.info("Fetching user from database: {}", id);
    return userRepository.findById(id).orElseThrow();
  }

  @CachePut(value = "users", key = "#user.id")
  public User updateUser(User user) {
    log.info("Updating user: {}", user.getId());
    return userRepository.save(user);
  }

  @CacheEvict(value = "users", key = "#id")
  public void deleteUser(Long id) {
    log.info("Deleting user: {}", id);
    userRepository.deleteById(id);
  }

  @CacheEvict(value = "users", allEntries = true)
  public void clearAllUsers() {
    log.info("Clearing all users from cache");
  }
}

// Cache Invalidation Strategies
@Service
public class CacheInvalidationService {

  @Autowired
  private RedisTemplate<String, Object> redisTemplate;

  // TTL-based invalidation (automatic)
  public void setWithTtl(String key, Object value, long ttlSeconds) {
    redisTemplate.opsForValue().set(key, value, ttlSeconds, TimeUnit.SECONDS);
  }

  // Event-based invalidation
  @EventListener
  public void onUserUpdated(UserUpdatedEvent event) {
    String cacheKey = "user:" + event.getUserId();
    redisTemplate.delete(cacheKey);
    log.info("Invalidated cache for user: {}", event.getUserId());
  }

  // Pattern-based invalidation
  public void invalidateByPattern(String pattern) {
    Set<String> keys = redisTemplate.keys(pattern);
    if (keys != null && !keys.isEmpty()) {
      redisTemplate.delete(keys);
      log.info("Invalidated {} keys matching pattern: {}", keys.size(), pattern);
    }
  }

  // Bulk invalidation
  public void invalidateMultiple(List<String> keys) {
    redisTemplate.delete(keys);
  }
}

// Multi-Level Caching
@Service
public class MultiLevelCacheService {

  // L1: Local cache (Caffeine)
  private final Cache<String, User> localCache = Caffeine.newBuilder()
    .maximumSize(1000)
    .expireAfterWrite(5, TimeUnit.MINUTES)
    .build();

  // L2: Distributed cache (Redis)
  @Autowired
  private RedisTemplate<String, User> redisTemplate;

  @Autowired
  private UserRepository userRepository;

  public User getUser(Long id) {
    String key = "user:" + id;

    // Check L1 cache
    User user = localCache.getIfPresent(key);
    if (user != null) {
      log.debug("L1 cache hit: {}", id);
      return user;
    }

    // Check L2 cache
    user = redisTemplate.opsForValue().get(key);
    if (user != null) {
      log.debug("L2 cache hit: {}", id);
      localCache.put(key, user);
      return user;
    }

    // Load from database
    log.debug("Cache miss, loading from DB: {}", id);
    user = userRepository.findById(id).orElseThrow();

    // Populate caches
    localCache.put(key, user);
    redisTemplate.opsForValue().set(key, user, 1, TimeUnit.HOURS);

    return user;
  }
}

// CDN Configuration (Nginx)
/*
# nginx.conf - CDN/Reverse Proxy Cache
http {
  proxy_cache_path /var/cache/nginx levels=1:2
    keys_zone=static_cache:10m max_size=1g
    inactive=60m use_temp_path=off;

  server {
    listen 80;

    location /static/ {
      proxy_pass http://backend;
      proxy_cache static_cache;
      proxy_cache_valid 200 60m;
      proxy_cache_valid 404 1m;
      proxy_cache_use_stale error timeout updating;
      add_header X-Cache-Status $upstream_cache_status;
    }

    location /api/ {
      proxy_pass http://backend;
      proxy_cache api_cache;
      proxy_cache_valid 200 5m;
      proxy_cache_key "$request_uri|$http_accept|$http_accept_encoding";
      proxy_cache_bypass $http_cache_control;
    }
  }
}
*/

// Cache Warming
@Component
public class CacheWarmer {

  @Autowired
  private UserService userService;

  @Autowired
  private ProductService productService;

  @EventListener(ApplicationReadyEvent.class)
  public void warmCache() {
    log.info("Starting cache warming...");

    // Warm frequently accessed users
    List<Long> popularUserIds = Arrays.asList(1L, 2L, 3L, 4L, 5L);
    popularUserIds.forEach(userService::getUserById);

    // Warm popular products
    productService.getTopProducts(100)
      .forEach(product -> productService.getProduct(product.getId()));

    log.info("Cache warming completed");
  }
}`
      }
    },
    {
      id: 4,
      name: 'N-Tier Architecture',
      icon: '🏗️',
      color: '#8b5cf6',
      description: 'Layered application architecture',
      content: {
        explanation: 'N-Tier architecture separates applications into logical layers with distinct responsibilities. The Presentation layer handles UI and user interaction. The Business layer contains domain logic and business rules. The Data layer manages persistence and database operations. Separation of concerns improves maintainability, testability, and allows independent scaling. Each layer should only communicate with adjacent layers.',
        keyPoints: [
          'Presentation layer - UI, controllers, view models, user interaction',
          'Business layer - domain logic, business rules, validation, workflows',
          'Data layer - repositories, DAO, database access, ORM mapping',
          'Separation of concerns - each layer has single responsibility',
          'Layered architecture - strict dependency rules, top-down communication',
          'Cross-cutting concerns - logging, security, transaction management'
        ],
        codeExample: `// Presentation Layer - Controllers
@RestController
@RequestMapping("/api/orders")
public class OrderController {

  @Autowired
  private OrderService orderService;

  @PostMapping
  public ResponseEntity<OrderDto> createOrder(@Valid @RequestBody CreateOrderRequest request) {
    Order order = orderService.createOrder(
      request.getUserId(),
      request.getItems()
    );

    OrderDto dto = OrderMapper.toDto(order);
    return ResponseEntity.status(HttpStatus.CREATED).body(dto);
  }

  @GetMapping("/{id}")
  public ResponseEntity<OrderDto> getOrder(@PathVariable Long id) {
    Order order = orderService.getOrderById(id);
    return ResponseEntity.ok(OrderMapper.toDto(order));
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<List<OrderDto>> getUserOrders(@PathVariable Long userId) {
    List<Order> orders = orderService.getOrdersByUserId(userId);
    List<OrderDto> dtos = orders.stream()
      .map(OrderMapper::toDto)
      .collect(Collectors.toList());
    return ResponseEntity.ok(dtos);
  }
}

// DTO (Data Transfer Object)
public class OrderDto {
  private Long id;
  private Long userId;
  private BigDecimal totalAmount;
  private String status;
  private LocalDateTime createdAt;
  private List<OrderItemDto> items;

  // Getters and setters
}

// Business Layer - Service
@Service
@Transactional
public class OrderService {

  @Autowired
  private OrderRepository orderRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private InventoryService inventoryService;

  @Autowired
  private PaymentService paymentService;

  public Order createOrder(Long userId, List<OrderItemRequest> items) {
    // Business logic validation
    User user = userRepository.findById(userId)
      .orElseThrow(() -> new UserNotFoundException(userId));

    if (!user.isActive()) {
      throw new BusinessException("User account is not active");
    }

    // Calculate total and validate inventory
    BigDecimal total = BigDecimal.ZERO;
    List<OrderItem> orderItems = new ArrayList<>();

    for (OrderItemRequest item : items) {
      Product product = productRepository.findById(item.getProductId())
        .orElseThrow(() -> new ProductNotFoundException(item.getProductId()));

      // Check inventory
      if (!inventoryService.checkAvailability(product.getId(), item.getQuantity())) {
        throw new InsufficientInventoryException(product.getId());
      }

      BigDecimal itemTotal = product.getPrice()
        .multiply(BigDecimal.valueOf(item.getQuantity()));
      total = total.add(itemTotal);

      OrderItem orderItem = new OrderItem();
      orderItem.setProduct(product);
      orderItem.setQuantity(item.getQuantity());
      orderItem.setPrice(product.getPrice());
      orderItems.add(orderItem);
    }

    // Apply business rules
    if (total.compareTo(BigDecimal.valueOf(1000)) > 0) {
      // Apply discount for orders over $1000
      total = total.multiply(BigDecimal.valueOf(0.95));
    }

    // Create order
    Order order = new Order();
    order.setUser(user);
    order.setItems(orderItems);
    order.setTotalAmount(total);
    order.setStatus(OrderStatus.PENDING);
    order.setCreatedAt(LocalDateTime.now());

    // Save order
    Order savedOrder = orderRepository.save(order);

    // Reserve inventory
    orderItems.forEach(item ->
      inventoryService.reserve(item.getProduct().getId(), item.getQuantity())
    );

    // Process payment asynchronously
    paymentService.processPaymentAsync(savedOrder);

    return savedOrder;
  }

  @Transactional(readOnly = true)
  public Order getOrderById(Long id) {
    return orderRepository.findById(id)
      .orElseThrow(() -> new OrderNotFoundException(id));
  }

  @Transactional(readOnly = true)
  public List<Order> getOrdersByUserId(Long userId) {
    return orderRepository.findByUserId(userId);
  }

  public void cancelOrder(Long orderId) {
    Order order = getOrderById(orderId);

    // Business rule: can only cancel pending orders
    if (order.getStatus() != OrderStatus.PENDING) {
      throw new BusinessException("Cannot cancel order in status: " + order.getStatus());
    }

    // Release inventory
    order.getItems().forEach(item ->
      inventoryService.release(item.getProduct().getId(), item.getQuantity())
    );

    // Update status
    order.setStatus(OrderStatus.CANCELLED);
    orderRepository.save(order);
  }
}

// Data Layer - Repository
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

  List<Order> findByUserId(Long userId);

  List<Order> findByStatus(OrderStatus status);

  @Query("SELECT o FROM Order o WHERE o.createdAt BETWEEN :start AND :end")
  List<Order> findByDateRange(
    @Param("start") LocalDateTime start,
    @Param("end") LocalDateTime end
  );

  @Query("SELECT o FROM Order o JOIN FETCH o.items WHERE o.id = :id")
  Optional<Order> findByIdWithItems(@Param("id") Long id);
}

// Domain Model
@Entity
@Table(name = "orders")
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "order_id")
  private List<OrderItem> items = new ArrayList<>();

  @Column(nullable = false)
  private BigDecimal totalAmount;

  @Enumerated(EnumType.STRING)
  private OrderStatus status;

  private LocalDateTime createdAt;

  // Getters and setters
}

@Entity
@Table(name = "order_items")
public class OrderItem {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "product_id")
  private Product product;

  private Integer quantity;
  private BigDecimal price;

  // Getters and setters
}

// Cross-Cutting Concerns - Aspect
@Aspect
@Component
public class LoggingAspect {

  @Around("@annotation(org.springframework.web.bind.annotation.RequestMapping)")
  public Object logControllerAccess(ProceedingJoinPoint joinPoint) throws Throwable {
    String method = joinPoint.getSignature().getName();
    log.info("Controller method called: {}", method);

    long start = System.currentTimeMillis();
    Object result = joinPoint.proceed();
    long duration = System.currentTimeMillis() - start;

    log.info("Controller method {} completed in {}ms", method, duration);
    return result;
  }

  @Around("@within(org.springframework.stereotype.Service)")
  public Object logServiceAccess(ProceedingJoinPoint joinPoint) throws Throwable {
    String method = joinPoint.getSignature().getName();
    Object[] args = joinPoint.getArgs();

    log.debug("Service method called: {} with args: {}", method, args);

    try {
      Object result = joinPoint.proceed();
      log.debug("Service method {} returned: {}", method, result);
      return result;
    } catch (Exception e) {
      log.error("Service method {} threw exception", method, e);
      throw e;
    }
  }
}

// Transaction Management
@Configuration
@EnableTransactionManagement
public class TransactionConfig {

  @Bean
  public PlatformTransactionManager transactionManager(EntityManagerFactory emf) {
    return new JpaTransactionManager(emf);
  }
}

// Layered Architecture Diagram
/*
┌─────────────────────────────────────┐
│      Presentation Layer             │
│  ┌──────────┐  ┌──────────────┐    │
│  │Controllers│  │DTO/ViewModels│    │
│  └──────────┘  └──────────────┘    │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│        Business Layer               │
│  ┌─────────┐  ┌────────────────┐   │
│  │Services │  │Domain Entities │   │
│  └─────────┘  └────────────────┘   │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│         Data Layer                  │
│  ┌────────────┐  ┌──────────────┐  │
│  │Repositories│  │JPA/Hibernate │  │
│  └────────────┘  └──────────────┘  │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│          Database                   │
└─────────────────────────────────────┘
*/`
      }
    },
    {
      id: 5,
      name: 'Load Balancing',
      icon: '⚖️',
      color: '#ec4899',
      description: 'Distributing traffic across servers',
      content: {
        explanation: 'Load balancing distributes incoming traffic across multiple servers to optimize resource usage, maximize throughput, and ensure high availability. Round-robin rotates requests across servers. Least connections sends traffic to servers with fewest active connections. Sticky sessions route user requests to the same server. Layer 4 (L4) operates at transport layer, Layer 7 (L7) at application layer. Health checks ensure traffic only goes to healthy servers.',
        keyPoints: [
          'Round-robin - sequential distribution, simple and fair',
          'Least connections - routes to server with fewest active connections',
          'Sticky sessions (session affinity) - same user routes to same server',
          'L4 vs L7 balancing - L4 (TCP/UDP), L7 (HTTP/HTTPS with content routing)',
          'Health checks - active/passive monitoring, remove unhealthy servers',
          'Nginx/HAProxy - popular load balancers, reverse proxy capabilities'
        ],
        codeExample: `// Spring Cloud LoadBalancer
@Configuration
public class LoadBalancerConfig {

  @Bean
  @LoadBalanced
  public RestTemplate restTemplate() {
    return new RestTemplate();
  }

  @Bean
  public ServiceInstanceListSupplier customServiceInstanceListSupplier(
      ConfigurableApplicationContext context) {
    return ServiceInstanceListSupplier.builder()
      .withDiscoveryClient()
      .withHealthChecks()
      .withCaching()
      .build(context);
  }
}

@Service
public class LoadBalancedService {

  @Autowired
  @LoadBalanced
  private RestTemplate restTemplate;

  public User getUser(Long id) {
    // Load balancer automatically distributes across instances
    return restTemplate.getForObject(
      "http://user-service/api/users/" + id,
      User.class
    );
  }
}

// Custom Load Balancer
public class CustomLoadBalancer {

  private final List<Server> servers = new CopyOnWriteArrayList<>();
  private final AtomicInteger currentIndex = new AtomicInteger(0);

  public void addServer(Server server) {
    servers.add(server);
  }

  public void removeServer(Server server) {
    servers.remove(server);
  }

  // Round-robin algorithm
  public Server roundRobin() {
    if (servers.isEmpty()) {
      throw new NoAvailableServersException();
    }

    int index = currentIndex.getAndIncrement() % servers.size();
    return servers.get(index);
  }

  // Least connections algorithm
  public Server leastConnections() {
    return servers.stream()
      .filter(Server::isHealthy)
      .min(Comparator.comparingInt(Server::getActiveConnections))
      .orElseThrow(NoAvailableServersException::new);
  }

  // Weighted round-robin
  public Server weightedRoundRobin() {
    int totalWeight = servers.stream()
      .mapToInt(Server::getWeight)
      .sum();

    int random = ThreadLocalRandom.current().nextInt(totalWeight);
    int weightSum = 0;

    for (Server server : servers) {
      weightSum += server.getWeight();
      if (random < weightSum) {
        return server;
      }
    }

    return servers.get(0);
  }

  // IP Hash (consistent hashing)
  public Server ipHash(String clientIp) {
    int hash = clientIp.hashCode();
    int index = Math.abs(hash % servers.size());
    return servers.get(index);
  }
}

public class Server {
  private final String host;
  private final int port;
  private final AtomicInteger activeConnections = new AtomicInteger(0);
  private volatile boolean healthy = true;
  private final int weight;

  public void incrementConnections() {
    activeConnections.incrementAndGet();
  }

  public void decrementConnections() {
    activeConnections.decrementAndGet();
  }

  // Getters
}

// Nginx Load Balancer Configuration
/*
# nginx.conf
upstream backend {
  # Round-robin (default)
  server backend1.example.com:8080;
  server backend2.example.com:8080;
  server backend3.example.com:8080;
}

upstream weighted_backend {
  # Weighted round-robin
  server backend1.example.com:8080 weight=3;
  server backend2.example.com:8080 weight=2;
  server backend3.example.com:8080 weight=1;
}

upstream least_conn_backend {
  # Least connections
  least_conn;
  server backend1.example.com:8080;
  server backend2.example.com:8080;
}

upstream ip_hash_backend {
  # IP Hash (sticky sessions)
  ip_hash;
  server backend1.example.com:8080;
  server backend2.example.com:8080;
}

# Health checks
upstream healthy_backend {
  server backend1.example.com:8080 max_fails=3 fail_timeout=30s;
  server backend2.example.com:8080 max_fails=3 fail_timeout=30s;
  server backend3.example.com:8080 backup;  # Backup server
}

server {
  listen 80;

  location / {
    proxy_pass http://backend;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    # Connection settings
    proxy_connect_timeout 5s;
    proxy_send_timeout 10s;
    proxy_read_timeout 10s;

    # Retry on error
    proxy_next_upstream error timeout invalid_header http_500 http_502 http_503;
  }

  # Layer 7 routing based on URI
  location /api/ {
    proxy_pass http://api_backend;
  }

  location /admin/ {
    proxy_pass http://admin_backend;
  }
}
*/

// Health Check Service
@Service
public class HealthCheckService {

  private final Map<String, ServerHealth> serverHealth = new ConcurrentHashMap<>();
  private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

  @PostConstruct
  public void startHealthChecks() {
    scheduler.scheduleAtFixedRate(
      this::performHealthChecks,
      0,
      10,
      TimeUnit.SECONDS
    );
  }

  private void performHealthChecks() {
    servers.forEach(server -> {
      boolean healthy = checkServerHealth(server);
      serverHealth.put(server.getUrl(), new ServerHealth(healthy, LocalDateTime.now()));

      if (!healthy) {
        log.warn("Server unhealthy: {}", server.getUrl());
      }
    });
  }

  private boolean checkServerHealth(Server server) {
    try {
      RestTemplate restTemplate = new RestTemplate();
      ResponseEntity<String> response = restTemplate.getForEntity(
        server.getUrl() + "/health",
        String.class
      );
      return response.getStatusCode() == HttpStatus.OK;
    } catch (Exception e) {
      log.error("Health check failed for {}", server.getUrl(), e);
      return false;
    }
  }

  public boolean isHealthy(String serverUrl) {
    ServerHealth health = serverHealth.get(serverUrl);
    return health != null && health.isHealthy();
  }
}

// Sticky Session Implementation
@Component
public class StickySessionLoadBalancer {

  private final Map<String, Server> sessionToServer = new ConcurrentHashMap<>();
  private final LoadBalancer loadBalancer;

  public Server getServer(String sessionId) {
    // Check if session already mapped
    if (sessionId != null && sessionToServer.containsKey(sessionId)) {
      Server server = sessionToServer.get(sessionId);
      if (server.isHealthy()) {
        return server;
      }
    }

    // Assign new server
    Server server = loadBalancer.selectServer();
    if (sessionId != null) {
      sessionToServer.put(sessionId, server);
    }

    return server;
  }

  public void removeSession(String sessionId) {
    sessionToServer.remove(sessionId);
  }
}

// Ribbon Load Balancer (Legacy Spring Cloud)
@Configuration
public class RibbonConfig {

  @Bean
  public IRule ribbonRule() {
    // Available rules:
    // - RoundRobinRule
    // - RandomRule
    // - WeightedResponseTimeRule
    // - BestAvailableRule
    // - AvailabilityFilteringRule
    return new WeightedResponseTimeRule();
  }
}

// Kubernetes Service Load Balancing
/*
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: user-service
spec:
  selector:
    app: user-service
  ports:
  - port: 80
    targetPort: 8080
  type: LoadBalancer
  sessionAffinity: ClientIP  # Sticky sessions
  sessionAffinityConfig:
    clientIP:
      timeoutSeconds: 10800

---
# Ingress with load balancing
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    nginx.ingress.kubernetes.io/load-balance: "least_conn"
    nginx.ingress.kubernetes.io/upstream-hash-by: "$remote_addr"
spec:
  rules:
  - host: example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: user-service
            port:
              number: 80
*/`
      }
    },
    {
      id: 6,
      name: 'CAP Theorem',
      icon: '🔺',
      color: '#06b6d4',
      description: 'Consistency, Availability, Partition Tolerance',
      content: {
        explanation: 'CAP theorem states that distributed systems can only guarantee two of three properties: Consistency (all nodes see same data), Availability (system responds to requests), Partition Tolerance (system works despite network failures). During network partitions, choose CP (consistent but unavailable) or AP (available but inconsistent). Eventual consistency accepts temporary inconsistencies. BASE (Basically Available, Soft state, Eventual consistency) is an alternative to ACID for distributed systems.',
        keyPoints: [
          'Consistency - all nodes see the same data at the same time',
          'Availability - every request receives a response (success/failure)',
          'Partition Tolerance - system continues despite network failures',
          'CP systems - sacrifice availability for consistency (banks, inventory)',
          'AP systems - sacrifice consistency for availability (social media, caching)',
          'Eventual consistency - accepts temporary inconsistency, converges over time',
          'BASE - Basically Available, Soft state, Eventual consistency model'
        ],
        codeExample: `// CP System - Strong Consistency (Banking)
@Service
@Transactional
public class BankingService {

  @Autowired
  private AccountRepository accountRepository;

  // Strong consistency - use distributed locks
  public void transfer(Long fromAccountId, Long toAccountId, BigDecimal amount) {
    // Acquire locks in order to prevent deadlock
    Long firstLock = Math.min(fromAccountId, toAccountId);
    Long secondLock = Math.max(fromAccountId, toAccountId);

    synchronized (getLock(firstLock)) {
      synchronized (getLock(secondLock)) {
        Account fromAccount = accountRepository.findById(fromAccountId)
          .orElseThrow();
        Account toAccount = accountRepository.findById(toAccountId)
          .orElseThrow();

        if (fromAccount.getBalance().compareTo(amount) < 0) {
          throw new InsufficientFundsException();
        }

        // Both updates happen atomically
        fromAccount.setBalance(fromAccount.getBalance().subtract(amount));
        toAccount.setBalance(toAccount.getBalance().add(amount));

        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);
      }
    }
  }

  private Object getLock(Long id) {
    return ("lock_" + id).intern();
  }
}

// AP System - Eventual Consistency (Social Media)
@Service
public class SocialMediaService {

  @Autowired
  private PostRepository postRepository;

  @Autowired
  private KafkaTemplate<String, PostEvent> kafkaTemplate;

  public Post createPost(Post post) {
    // Write to local database (available)
    Post saved = postRepository.save(post);

    // Asynchronously propagate to other regions
    PostEvent event = new PostEvent(saved.getId(), saved.getContent());
    kafkaTemplate.send("post-events", event);

    // Return immediately without waiting for propagation
    return saved;
  }

  @KafkaListener(topics = "post-events")
  public void handlePostEvent(PostEvent event) {
    // Eventually consistent - update local copy
    Post post = new Post();
    post.setId(event.getPostId());
    post.setContent(event.getContent());
    postRepository.save(post);
  }
}

// Quorum-based Consistency
@Service
public class QuorumService {

  private final List<DataNode> nodes;
  private final int writeQuorum;
  private final int readQuorum;

  public QuorumService(List<DataNode> nodes) {
    this.nodes = nodes;
    this.writeQuorum = (nodes.size() / 2) + 1;  // Majority
    this.readQuorum = (nodes.size() / 2) + 1;
  }

  public void write(String key, String value) {
    int successCount = 0;
    List<CompletableFuture<Boolean>> futures = new ArrayList<>();

    for (DataNode node : nodes) {
      CompletableFuture<Boolean> future = CompletableFuture.supplyAsync(() ->
        node.write(key, value)
      );
      futures.add(future);
    }

    // Wait for write quorum
    for (CompletableFuture<Boolean> future : futures) {
      try {
        if (future.get(5, TimeUnit.SECONDS)) {
          successCount++;
          if (successCount >= writeQuorum) {
            return;  // Success
          }
        }
      } catch (Exception e) {
        log.warn("Write failed on node", e);
      }
    }

    throw new QuorumNotReachedException("Failed to reach write quorum");
  }

  public String read(String key) {
    Map<String, Integer> versionCounts = new HashMap<>();
    int responseCount = 0;

    for (DataNode node : nodes) {
      try {
        VersionedValue value = node.read(key);
        String data = value.getData();
        versionCounts.merge(data, 1, Integer::sum);
        responseCount++;

        if (responseCount >= readQuorum) {
          break;
        }
      } catch (Exception e) {
        log.warn("Read failed on node", e);
      }
    }

    if (responseCount < readQuorum) {
      throw new QuorumNotReachedException("Failed to reach read quorum");
    }

    // Return most common version
    return versionCounts.entrySet().stream()
      .max(Map.Entry.comparingByValue())
      .map(Map.Entry::getKey)
      .orElseThrow();
  }
}

// Eventual Consistency with Conflict Resolution
@Service
public class EventuallyConsistentService {

  public void mergeConflictingVersions(
      List<VersionedData> versions,
      String key) {

    // Last-Write-Wins (LWW)
    VersionedData latest = versions.stream()
      .max(Comparator.comparing(VersionedData::getTimestamp))
      .orElseThrow();

    saveResolved(key, latest);
  }

  // Vector clock for conflict detection
  public VersionedData readWithVectorClock(String key) {
    List<VersionedData> versions = readFromAllReplicas(key);

    // Check for conflicts using vector clocks
    if (hasConflict(versions)) {
      // Merge conflicts
      return mergeConflicts(versions);
    }

    return versions.get(0);
  }

  private boolean hasConflict(List<VersionedData> versions) {
    if (versions.size() <= 1) return false;

    VersionedData first = versions.get(0);
    return versions.stream()
      .anyMatch(v -> !v.getVectorClock().equals(first.getVectorClock()));
  }
}

// CRDT (Conflict-free Replicated Data Type)
public class GCounter {
  private final Map<String, Long> counts = new ConcurrentHashMap<>();
  private final String nodeId;

  public GCounter(String nodeId) {
    this.nodeId = nodeId;
  }

  public void increment() {
    counts.merge(nodeId, 1L, Long::sum);
  }

  public long getValue() {
    return counts.values().stream()
      .mapToLong(Long::longValue)
      .sum();
  }

  public void merge(GCounter other) {
    other.counts.forEach((node, count) ->
      counts.merge(node, count, Math::max)
    );
  }
}

// Saga Pattern for Distributed Transactions
@Service
public class OrderSagaService {

  @Autowired
  private OrderService orderService;

  @Autowired
  private PaymentService paymentService;

  @Autowired
  private InventoryService inventoryService;

  public void processOrder(OrderRequest request) {
    String sagaId = UUID.randomUUID().toString();

    try {
      // Step 1: Create order
      Order order = orderService.createOrder(request);

      // Step 2: Reserve inventory
      inventoryService.reserve(order.getItems(), sagaId);

      // Step 3: Process payment
      paymentService.charge(order.getTotalAmount(), sagaId);

      // Success - commit all
      orderService.confirmOrder(order.getId());

    } catch (Exception e) {
      // Compensating transactions
      log.error("Saga failed, executing compensations", e);

      try {
        paymentService.refund(sagaId);
      } catch (Exception ex) {
        log.error("Payment refund failed", ex);
      }

      try {
        inventoryService.release(sagaId);
      } catch (Exception ex) {
        log.error("Inventory release failed", ex);
      }

      try {
        orderService.cancelOrder(sagaId);
      } catch (Exception ex) {
        log.error("Order cancellation failed", ex);
      }

      throw new SagaFailedException("Order processing failed", e);
    }
  }
}

// BASE Properties Example
@Service
public class BaseService {

  // Basically Available - service responds even during partial failures
  public List<Product> searchProducts(String query) {
    try {
      return primaryDatabase.search(query);
    } catch (Exception e) {
      log.warn("Primary search failed, using cache", e);
      return cacheService.search(query);  // Degraded but available
    }
  }

  // Soft State - state may change without input (background sync)
  @Scheduled(fixedRate = 60000)
  public void syncState() {
    List<Order> pendingOrders = orderRepository.findPendingOrders();

    pendingOrders.forEach(order -> {
      // Background state transitions
      if (order.isPaid() && order.isShipped()) {
        order.setStatus(OrderStatus.COMPLETED);
        orderRepository.save(order);
      }
    });
  }

  // Eventual Consistency - accept temporary inconsistency
  public void updateUserProfile(User user) {
    // Update primary
    userRepository.save(user);

    // Async propagation to read replicas
    CompletableFuture.runAsync(() -> {
      replicaSync.sync(user);
    });

    // Async update cache
    CompletableFuture.runAsync(() -> {
      cacheService.update(user);
    });
  }
}`
      }
    },
    {
      id: 7,
      name: 'Disaster Recovery',
      icon: '🚑',
      color: '#ef4444',
      description: 'Planning for system failures',
      content: {
        explanation: 'Disaster Recovery (DR) ensures business continuity during catastrophic failures. Recovery Time Objective (RTO) defines maximum acceptable downtime. Recovery Point Objective (RPO) defines maximum acceptable data loss. Backup strategies include full, incremental, and differential backups. DR testing validates recovery procedures. Multi-region deployments provide geographic redundancy. Failover procedures automate recovery to backup systems.',
        keyPoints: [
          'RTO (Recovery Time Objective) - maximum acceptable downtime duration',
          'RPO (Recovery Point Objective) - maximum acceptable data loss',
          'Backup strategies - full, incremental, differential backups with retention',
          'DR testing - regular drills to validate recovery procedures',
          'Multi-region - geographic redundancy for regional failures',
          'Failover procedures - automated recovery to backup infrastructure'
        ],
        codeExample: `// Backup Service
@Service
public class BackupService {

  @Autowired
  private DataSource dataSource;

  @Scheduled(cron = "0 0 2 * * ?")  // Daily at 2 AM
  public void performFullBackup() {
    String timestamp = LocalDateTime.now()
      .format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
    String backupFile = "backup_full_" + timestamp + ".sql";

    try {
      ProcessBuilder pb = new ProcessBuilder(
        "mysqldump",
        "--host=" + dbHost,
        "--user=" + dbUser,
        "--password=" + dbPassword,
        "--databases", dbName,
        "--result-file=" + backupFile
      );

      Process process = pb.start();
      int exitCode = process.waitFor();

      if (exitCode == 0) {
        // Upload to S3
        uploadToS3(backupFile);
        log.info("Full backup completed: {}", backupFile);
      } else {
        log.error("Backup failed with exit code: {}", exitCode);
      }
    } catch (Exception e) {
      log.error("Backup error", e);
    }
  }

  @Scheduled(cron = "0 0 */6 * * ?")  // Every 6 hours
  public void performIncrementalBackup() {
    String timestamp = LocalDateTime.now()
      .format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));

    // Backup only changes since last backup
    String backupFile = "backup_incr_" + timestamp + ".sql";

    try {
      // Binary log-based incremental backup
      mysqlBinlogBackup(backupFile);
      uploadToS3(backupFile);
      log.info("Incremental backup completed: {}", backupFile);
    } catch (Exception e) {
      log.error("Incremental backup error", e);
    }
  }

  private void uploadToS3(String filename) {
    AmazonS3 s3Client = AmazonS3ClientBuilder.defaultClient();
    s3Client.putObject(
      new PutObjectRequest(
        "backup-bucket",
        "backups/" + filename,
        new File(filename)
      )
    );
  }
}

// RTO/RPO Configuration
@Configuration
public class DisasterRecoveryConfig {

  // RTO: 4 hours - Maximum acceptable downtime
  private final Duration RTO = Duration.ofHours(4);

  // RPO: 1 hour - Maximum acceptable data loss
  private final Duration RPO = Duration.ofHours(1);

  @Bean
  public BackupScheduler backupScheduler() {
    return new BackupScheduler(RPO);
  }

  @Bean
  public FailoverCoordinator failoverCoordinator() {
    return new FailoverCoordinator(RTO);
  }
}

// Multi-Region Failover
@Service
public class MultiRegionService {

  private final Map<String, RegionEndpoint> regions = new HashMap<>();
  private volatile String primaryRegion = "us-east-1";

  public MultiRegionService() {
    regions.put("us-east-1", new RegionEndpoint("https://api.us-east-1.example.com"));
    regions.put("us-west-2", new RegionEndpoint("https://api.us-west-2.example.com"));
    regions.put("eu-west-1", new RegionEndpoint("https://api.eu-west-1.example.com"));

    startHealthMonitoring();
  }

  public <T> T executeRequest(Function<RegionEndpoint, T> request) {
    try {
      return request.apply(regions.get(primaryRegion));
    } catch (Exception e) {
      log.error("Primary region failed, failing over", e);
      return executeWithFailover(request);
    }
  }

  private <T> T executeWithFailover(Function<RegionEndpoint, T> request) {
    for (Map.Entry<String, RegionEndpoint> entry : regions.entrySet()) {
      if (entry.getKey().equals(primaryRegion)) continue;

      try {
        T result = request.apply(entry.getValue());
        log.info("Failover successful to region: {}", entry.getKey());
        primaryRegion = entry.getKey();  // Update primary
        return result;
      } catch (Exception e) {
        log.warn("Failover to {} failed", entry.getKey(), e);
      }
    }

    throw new AllRegionsFailedException();
  }

  private void startHealthMonitoring() {
    ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    scheduler.scheduleAtFixedRate(() -> {
      for (Map.Entry<String, RegionEndpoint> entry : regions.entrySet()) {
        boolean healthy = entry.getValue().healthCheck();
        if (!healthy && entry.getKey().equals(primaryRegion)) {
          log.error("Primary region {} is unhealthy, triggering failover",
            entry.getKey());
          triggerFailover();
        }
      }
    }, 0, 30, TimeUnit.SECONDS);
  }

  private void triggerFailover() {
    // Find healthy region
    regions.entrySet().stream()
      .filter(e -> !e.getKey().equals(primaryRegion))
      .filter(e -> e.getValue().healthCheck())
      .findFirst()
      .ifPresent(e -> {
        log.info("Failing over from {} to {}", primaryRegion, e.getKey());
        primaryRegion = e.getKey();
      });
  }
}

// Restore Service
@Service
public class RestoreService {

  public void restoreFromBackup(String backupFile) {
    log.info("Starting restore from backup: {}", backupFile);

    try {
      // Download from S3
      downloadFromS3(backupFile);

      // Stop application (maintenance mode)
      maintenanceModeService.enable();

      // Restore database
      ProcessBuilder pb = new ProcessBuilder(
        "mysql",
        "--host=" + dbHost,
        "--user=" + dbUser,
        "--password=" + dbPassword,
        dbName
      );

      pb.redirectInput(new File(backupFile));
      Process process = pb.start();
      int exitCode = process.waitFor();

      if (exitCode == 0) {
        log.info("Database restored successfully");

        // Apply incremental backups if any
        applyIncrementalBackups(backupFile);

        // Restart application
        maintenanceModeService.disable();
      } else {
        log.error("Restore failed with exit code: {}", exitCode);
      }
    } catch (Exception e) {
      log.error("Restore error", e);
    }
  }

  private void applyIncrementalBackups(String fullBackupFile) {
    // Find incremental backups after full backup
    LocalDateTime fullBackupTime = extractTimestamp(fullBackupFile);

    List<String> incrementalBackups = findIncrementalBackups(fullBackupTime);

    for (String incBackup : incrementalBackups) {
      log.info("Applying incremental backup: {}", incBackup);
      applyBinaryLog(incBackup);
    }
  }
}

// DR Testing Framework
@Service
public class DrTestService {

  @Scheduled(cron = "0 0 1 1 * ?")  // Monthly DR drill
  public void performDrTest() {
    log.info("Starting DR test drill");

    DrTestReport report = new DrTestReport();
    report.setStartTime(LocalDateTime.now());

    try {
      // Test 1: Database backup and restore
      report.addTest(testBackupRestore());

      // Test 2: Failover to secondary region
      report.addTest(testRegionalFailover());

      // Test 3: Application recovery
      report.addTest(testApplicationRecovery());

      // Test 4: Data consistency check
      report.addTest(testDataConsistency());

      report.setStatus("SUCCESS");
    } catch (Exception e) {
      report.setStatus("FAILED");
      report.setError(e.getMessage());
      log.error("DR test failed", e);
    }

    report.setEndTime(LocalDateTime.now());
    report.setDuration(Duration.between(report.getStartTime(), report.getEndTime()));

    // Send report
    sendDrTestReport(report);
  }

  private TestResult testBackupRestore() {
    // Create test backup
    backupService.performFullBackup();

    // Restore to test environment
    restoreService.restoreToTestEnvironment();

    // Verify data
    boolean dataValid = verifyTestData();

    return new TestResult("Backup/Restore", dataValid);
  }

  private TestResult testRegionalFailover() {
    // Simulate primary region failure
    multiRegionService.simulateRegionFailure("us-east-1");

    // Execute request (should failover)
    boolean success = multiRegionService.executeHealthCheck();

    return new TestResult("Regional Failover", success);
  }
}

// Automated Failover Coordinator
@Component
public class FailoverCoordinator {

  private final Duration rto;
  private volatile boolean failoverInProgress = false;

  public void initiateFailover(FailureEvent event) {
    if (failoverInProgress) {
      log.warn("Failover already in progress");
      return;
    }

    failoverInProgress = true;
    long startTime = System.currentTimeMillis();

    try {
      log.info("Initiating failover due to: {}", event.getReason());

      // Step 1: Stop traffic to failed component
      loadBalancer.removeBackend(event.getFailedComponent());

      // Step 2: Promote standby to primary
      standbyService.promote(event.getStandbyComponent());

      // Step 3: Redirect traffic
      loadBalancer.addBackend(event.getStandbyComponent());

      // Step 4: Verify failover
      if (!verifyFailover()) {
        rollbackFailover();
        throw new FailoverException("Failover verification failed");
      }

      long duration = System.currentTimeMillis() - startTime;
      log.info("Failover completed in {}ms", duration);

      // Check if within RTO
      if (duration > rto.toMillis()) {
        log.error("Failover exceeded RTO: {}ms > {}ms", duration, rto.toMillis());
      }

    } finally {
      failoverInProgress = false;
    }
  }
}`
      }
    },
    {
      id: 8,
      name: 'Performance Optimization',
      icon: '🚀',
      color: '#84cc16',
      description: 'System performance tuning',
      content: {
        explanation: 'Performance optimization improves system responsiveness and throughput. Database indexing accelerates query execution on frequently searched columns. Connection pooling reuses database connections to reduce overhead. Asynchronous processing offloads long-running tasks. Profiling tools identify performance bottlenecks. Query optimization includes proper indexing, avoiding N+1 queries, and using appropriate fetch strategies.',
        keyPoints: [
          'Database indexing - B-tree indexes on WHERE/JOIN columns, composite indexes',
          'Connection pooling - HikariCP with tuned pool size, connection reuse',
          'Async processing - @Async, CompletableFuture, message queues for background tasks',
          'Profiling - JProfiler, VisualVM, Spring Boot Actuator metrics',
          'Query optimization - EXPLAIN plans, avoid SELECT *, proper JOIN strategies',
          'JPA optimization - fetch strategies (LAZY/EAGER), batch inserts, query hints'
        ],
        codeExample: `// Database Indexing
/*
-- Create indexes on frequently queried columns
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);

-- Composite index for multiple columns
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Covering index includes all query columns
CREATE INDEX idx_orders_covering ON orders(user_id, created_at, status, total_amount);

-- Check index usage
EXPLAIN SELECT * FROM orders WHERE user_id = 123 AND status = 'PENDING';
*/

// Connection Pooling - HikariCP
@Configuration
public class DataSourceConfig {

  @Bean
  public DataSource dataSource() {
    HikariConfig config = new HikariConfig();
    config.setJdbcUrl("jdbc:mysql://localhost:3306/mydb");
    config.setUsername("user");
    config.setPassword("password");

    // Performance tuning
    config.setMaximumPoolSize(20);           // Max connections
    config.setMinimumIdle(5);                // Min idle connections
    config.setConnectionTimeout(30000);      // 30 seconds
    config.setIdleTimeout(600000);           // 10 minutes
    config.setMaxLifetime(1800000);          // 30 minutes

    // Performance optimizations
    config.setAutoCommit(false);
    config.setCachePrepStmts(true);
    config.setPrepStmtCacheSize(250);
    config.setPrepStmtCacheSqlLimit(2048);
    config.setUseServerPrepStmts(true);

    return new HikariDataSource(config);
  }
}

// Async Processing
@Configuration
@EnableAsync
public class AsyncConfig {

  @Bean
  public Executor taskExecutor() {
    ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
    executor.setCorePoolSize(10);
    executor.setMaxPoolSize(50);
    executor.setQueueCapacity(200);
    executor.setThreadNamePrefix("async-");
    executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
    executor.initialize();
    return executor;
  }
}

@Service
public class EmailService {

  @Async
  public CompletableFuture<Void> sendEmailAsync(String to, String subject, String body) {
    log.info("Sending email asynchronously to: {}", to);

    try {
      // Simulate email sending
      Thread.sleep(2000);
      log.info("Email sent to: {}", to);
      return CompletableFuture.completedFuture(null);
    } catch (InterruptedException e) {
      return CompletableFuture.failedFuture(e);
    }
  }
}

@Service
public class OrderService {

  @Autowired
  private EmailService emailService;

  public Order createOrder(OrderRequest request) {
    Order order = orderRepository.save(new Order(request));

    // Send confirmation email asynchronously (non-blocking)
    emailService.sendEmailAsync(
      order.getUserEmail(),
      "Order Confirmation",
      "Your order " + order.getId() + " has been placed"
    );

    return order;  // Return immediately
  }
}

// Query Optimization - Avoid N+1
// BAD: N+1 Query Problem
@Service
public class BadQueryService {

  public List<OrderDto> getOrders() {
    List<Order> orders = orderRepository.findAll();  // 1 query

    return orders.stream()
      .map(order -> {
        // N queries (one per order)
        User user = userRepository.findById(order.getUserId()).orElseThrow();
        return new OrderDto(order, user);
      })
      .collect(Collectors.toList());
  }
}

// GOOD: Fetch Join
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

  @Query("SELECT o FROM Order o JOIN FETCH o.user")
  List<Order> findAllWithUsers();  // Single query with JOIN

  @Query("SELECT o FROM Order o LEFT JOIN FETCH o.items WHERE o.id = :id")
  Optional<Order> findByIdWithItems(@Param("id") Long id);
}

@Service
public class GoodQueryService {

  public List<OrderDto> getOrders() {
    List<Order> orders = orderRepository.findAllWithUsers();  // 1 query
    return orders.stream()
      .map(OrderDto::new)
      .collect(Collectors.toList());
  }
}

// JPA Performance - Batch Inserts
@Configuration
public class JpaConfig {

  @Bean
  public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
    LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();

    Map<String, Object> properties = new HashMap<>();
    properties.put("hibernate.jdbc.batch_size", 50);
    properties.put("hibernate.order_inserts", true);
    properties.put("hibernate.order_updates", true);
    properties.put("hibernate.jdbc.batch_versioned_data", true);

    em.setJpaPropertyMap(properties);
    return em;
  }
}

@Service
public class BatchInsertService {

  @Autowired
  private EntityManager entityManager;

  @Transactional
  public void batchInsert(List<User> users) {
    int batchSize = 50;

    for (int i = 0; i < users.size(); i++) {
      entityManager.persist(users.get(i));

      if (i % batchSize == 0 && i > 0) {
        entityManager.flush();
        entityManager.clear();
      }
    }

    entityManager.flush();
    entityManager.clear();
  }
}

// Lazy vs Eager Fetching
@Entity
public class Order {

  @Id
  private Long id;

  // LAZY: Load only when accessed
  @OneToMany(fetch = FetchType.LAZY, mappedBy = "order")
  private List<OrderItem> items;

  // EAGER: Load immediately (use sparingly)
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id")
  private User user;
}

// Profiling and Monitoring
@Configuration
public class MetricsConfig {

  @Bean
  public MeterRegistryCustomizer<MeterRegistry> metricsCommonTags() {
    return registry -> registry.config()
      .commonTags("application", "order-service");
  }
}

@Service
public class ProfiledService {

  @Timed(value = "order.creation", description = "Time to create order")
  public Order createOrder(OrderRequest request) {
    return orderRepository.save(new Order(request));
  }

  @Counted(value = "order.failures", description = "Failed order creations")
  public void handleOrderFailure(Exception e) {
    log.error("Order creation failed", e);
  }
}

// Caching for Performance
@Service
public class CachedProductService {

  @Cacheable(value = "products", key = "#id")
  public Product getProduct(Long id) {
    log.info("Loading product from database: {}", id);
    return productRepository.findById(id).orElseThrow();
  }

  @Cacheable(value = "popularProducts")
  public List<Product> getPopularProducts() {
    log.info("Loading popular products from database");
    return productRepository.findTop10ByOrderBySalesDesc();
  }
}

// Query Hints
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  @QueryHints({
    @QueryHint(name = "org.hibernate.cacheable", value = "true"),
    @QueryHint(name = "org.hibernate.fetchSize", value = "50")
  })
  @Query("SELECT u FROM User u WHERE u.active = true")
  List<User> findActiveUsers();
}

// Database Query Analysis
/*
-- Slow query log analysis
SHOW VARIABLES LIKE 'slow_query_log%';
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;

-- Analyze query performance
EXPLAIN ANALYZE
SELECT o.*, u.name
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.status = 'PENDING'
  AND o.created_at > DATE_SUB(NOW(), INTERVAL 7 DAY);

-- Index usage
SHOW INDEX FROM orders;
ANALYZE TABLE orders;
*/

// Pagination for Large Result Sets
@Service
public class PaginatedService {

  public Page<Order> getOrders(int page, int size) {
    Pageable pageable = PageRequest.of(page, size,
      Sort.by("createdAt").descending());

    return orderRepository.findAll(pageable);
  }

  // Cursor-based pagination for consistent results
  public List<Order> getOrdersAfter(Long lastId, int limit) {
    return orderRepository.findTop10ByIdGreaterThanOrderById(lastId);
  }
}`
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
      border: '3px solid rgba(59, 130, 246, 0.4)'
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
          🏗️ System Design
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <div style={{
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(59, 130, 246, 0.3)',
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
          System design fundamentals covering scalability patterns, high availability, caching strategies,
          N-tier architecture, load balancing, CAP theorem, disaster recovery, and performance optimization.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedTopic ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {!selectedTopic ? (
          systemDesignTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              style={{
                backgroundColor: 'rgba(59, 130, 246, 0.05)',
                padding: '2rem',
                borderRadius: '12px',
                border: '2px solid rgba(59, 130, 246, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'
                e.currentTarget.style.borderColor = topic.color
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 8px 16px ${topic.color}33`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)'
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
                System Design Topics
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {systemDesignTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    style={{
                      backgroundColor: selectedTopic?.id === topic.id
                        ? `${topic.color}15`
                        : 'rgba(59, 130, 246, 0.05)',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: selectedTopic?.id === topic.id
                        ? `3px solid ${topic.color}`
                        : '2px solid rgba(59, 130, 246, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedTopic?.id !== topic.id) {
                        e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedTopic?.id !== topic.id) {
                        e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.05)'
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)'
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
                <div style={{
                  backgroundColor: '#1e293b',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '2px solid #334155'
                }}>
                  <SyntaxHighlighter code={selectedTopic.content.codeExample} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SystemDesign

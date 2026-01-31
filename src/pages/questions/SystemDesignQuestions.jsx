import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'

function SystemDesignQuestions({ onBack, breadcrumb }) {
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
      category: 'Scalability',
      question: 'What is the difference between horizontal and vertical scaling?',
      answer: `**Vertical Scaling (Scale Up):**
- Add more resources to existing server
- Increase CPU, RAM, storage
- Simpler to implement
- Has upper limits (hardware constraints)

\`\`\`
Before: 4 CPU, 16GB RAM
After:  32 CPU, 128GB RAM
\`\`\`

**Horizontal Scaling (Scale Out):**
- Add more servers to the pool
- Distribute load across machines
- Better fault tolerance
- Requires distributed system design

\`\`\`
Before: 1 server
After:  4 servers behind load balancer
\`\`\`

**Comparison:**
| Aspect | Vertical | Horizontal |
|--------|----------|------------|
| Cost | Expensive high-end hardware | Commodity hardware |
| Limit | Hardware limits | Virtually unlimited |
| Downtime | Required for upgrade | Zero downtime |
| Complexity | Simple | Complex (distributed) |
| Failure | Single point of failure | Fault tolerant |

**When to Use:**
- Vertical: Small to medium apps, databases
- Horizontal: Large-scale web apps, microservices

**Example: Database Scaling**
\`\`\`
Vertical: Upgrade PostgreSQL server
- 8 cores → 32 cores
- 32GB RAM → 128GB RAM

Horizontal: Database sharding
- Shard 1: Users A-M
- Shard 2: Users N-Z
- Add more shards as needed
\`\`\``
    },
    {
      id: 2,
      category: 'Load Balancing',
      question: 'Explain different load balancing algorithms',
      answer: `**Load Balancing Algorithms:**

**1. Round Robin:**
\`\`\`
Request 1 → Server A
Request 2 → Server B
Request 3 → Server C
Request 4 → Server A (cycles back)

Pros: Simple, even distribution
Cons: Ignores server capacity/load
\`\`\`

**2. Weighted Round Robin:**
\`\`\`
Weights: A=3, B=2, C=1
Distribution: A, A, A, B, B, C, A, A, A, B, B, C...

Pros: Accounts for server capacity
Cons: Doesn't account for current load
\`\`\`

**3. Least Connections:**
\`\`\`
Server A: 10 connections
Server B: 5 connections
Server C: 8 connections

Next request → Server B (least connections)

Pros: Adapts to current load
Cons: Doesn't account for connection weight
\`\`\`

**4. Weighted Least Connections:**
\`\`\`
Combines weights with connection count
Score = connections / weight

Server A: 10 conn, weight 3 → score 3.3
Server B: 6 conn, weight 2 → score 3.0
Server C: 4 conn, weight 1 → score 4.0

Next request → Server B (lowest score)
\`\`\`

**5. IP Hash:**
\`\`\`
hash(client_ip) % num_servers = server_index

Client 1.2.3.4 → always Server A
Client 5.6.7.8 → always Server B

Pros: Session persistence (sticky sessions)
Cons: Uneven distribution possible
\`\`\`

**6. Least Response Time:**
\`\`\`
Tracks response time of each server
Routes to server with fastest response

Pros: Optimal performance
Cons: Requires monitoring overhead
\`\`\`

**7. Random:**
\`\`\`
Randomly selects a server

Pros: Simple, no state needed
Cons: Can be uneven short-term
\`\`\`

**Layer 4 vs Layer 7:**
\`\`\`
Layer 4 (TCP/UDP):
- Faster (no packet inspection)
- Routes based on IP/port
- Simple, efficient

Layer 7 (HTTP/HTTPS):
- Content-aware routing
- Can route based on URL, headers, cookies
- SSL termination
- More CPU intensive
\`\`\`

**Health Checks:**
\`\`\`
Active: Periodic probes to servers
  /health endpoint every 10s

Passive: Monitor actual traffic
  Remove server after N failures
\`\`\``
    },
    {
      id: 3,
      category: 'Caching',
      question: 'Explain caching strategies and cache invalidation patterns',
      answer: `**Caching Strategies:**

**1. Cache-Aside (Lazy Loading):**
\`\`\`
Read:
1. Check cache
2. If miss, read from DB
3. Update cache
4. Return data

Write:
1. Write to DB
2. Invalidate cache

Pros: Only requested data cached
Cons: Cache miss penalty, stale data possible
\`\`\`

\`\`\`java
public User getUser(String id) {
    User user = cache.get(id);
    if (user == null) {
        user = database.get(id);
        cache.set(id, user, TTL);
    }
    return user;
}
\`\`\`

**2. Write-Through:**
\`\`\`
Write:
1. Write to cache
2. Cache writes to DB synchronously

Read:
1. Read from cache (always fresh)

Pros: Data consistency
Cons: Write latency, cache may have unused data
\`\`\`

**3. Write-Behind (Write-Back):**
\`\`\`
Write:
1. Write to cache
2. Queue DB write
3. Async batch write to DB

Pros: Low write latency, batch efficiency
Cons: Data loss risk if cache fails
\`\`\`

**4. Read-Through:**
\`\`\`
Read:
1. Request data from cache
2. Cache loads from DB if missing
3. Cache returns data

Cache handles DB interaction automatically
\`\`\`

**Cache Invalidation Patterns:**

**1. TTL (Time-To-Live):**
\`\`\`java
cache.set(key, value, Duration.ofMinutes(30));
// Automatically expires after 30 minutes
\`\`\`

**2. Event-Based Invalidation:**
\`\`\`java
@Transactional
public void updateUser(User user) {
    userRepository.save(user);
    cache.evict("user:" + user.getId());
    // Or publish event for distributed cache
    eventPublisher.publish(new UserUpdatedEvent(user.getId()));
}
\`\`\`

**3. Version-Based:**
\`\`\`java
// Key includes version
String key = "user:" + userId + ":v" + version;

// On update, increment version
// Old cached versions become unreachable
\`\`\`

**Cache Problems:**

**Cache Stampede:**
\`\`\`
When TTL expires, many requests hit DB simultaneously

Solutions:
1. Jittered TTL: Add random offset to TTL
2. Lock-based: Single thread refreshes cache
3. Probabilistic early expiration: Refresh before TTL
\`\`\`

**Cache Penetration:**
\`\`\`
Requests for non-existent data always hit DB

Solutions:
1. Cache null results (with short TTL)
2. Bloom filter to check existence
\`\`\`

**Cache Aside vs Through:**
| Pattern | Consistency | Complexity | Use Case |
|---------|-------------|------------|----------|
| Cache-Aside | Eventual | Simple | General purpose |
| Write-Through | Strong | Medium | High consistency |
| Write-Behind | Eventual | Complex | High write volume |
| Read-Through | Strong | Medium | Read-heavy |`
    },
    {
      id: 4,
      category: 'Database',
      question: 'What is database sharding and what are the sharding strategies?',
      answer: `**Database Sharding:**
Splitting data across multiple database instances to improve scalability and performance.

**Why Shard?**
- Single database can't handle load
- Data size exceeds single server capacity
- Need geographic distribution
- Improve query performance

**Sharding Strategies:**

**1. Range-Based Sharding:**
\`\`\`
Shard by range of values:
Shard 1: user_id 1-1,000,000
Shard 2: user_id 1,000,001-2,000,000
Shard 3: user_id 2,000,001-3,000,000

Pros: Simple, efficient range queries
Cons: Hot spots if data not evenly distributed
\`\`\`

**2. Hash-Based Sharding:**
\`\`\`
shard = hash(user_id) % num_shards

user_id=12345 → hash=789 → 789 % 4 = 1 → Shard 1
user_id=67890 → hash=456 → 456 % 4 = 0 → Shard 0

Pros: Even distribution
Cons: Resharding is complex, no range queries
\`\`\`

**3. Directory-Based Sharding:**
\`\`\`
Lookup table maps keys to shards:
user_id → shard_id
12345   → Shard 2
67890   → Shard 1

Pros: Flexible, easy to rebalance
Cons: Single point of failure (directory)
\`\`\`

**4. Geographic Sharding:**
\`\`\`
Shard by location:
Shard US: Users in North America
Shard EU: Users in Europe
Shard APAC: Users in Asia-Pacific

Pros: Low latency for users
Cons: Cross-region queries complex
\`\`\`

**Consistent Hashing:**
\`\`\`
Solves resharding problem

Traditional:
hash(key) % 4 = shard
Add server → hash(key) % 5 = different shard
(Almost all data moves!)

Consistent Hashing:
Servers on hash ring
Keys mapped to next server clockwise
Add server → only K/N keys move (minimal disruption)

Virtual nodes for better distribution
\`\`\`

**Challenges:**

**1. Cross-Shard Queries:**
\`\`\`sql
-- Simple: Query one shard
SELECT * FROM users WHERE user_id = 123;

-- Complex: Query all shards, aggregate results
SELECT * FROM orders WHERE created_at > '2024-01-01';
-- Must query all shards and merge results
\`\`\`

**2. Cross-Shard Transactions:**
\`\`\`
User creates order:
- User in Shard A
- Order in Shard B
- Requires distributed transaction (complex!)

Solutions:
- Eventual consistency
- Saga pattern
- Co-locate related data
\`\`\`

**3. Resharding:**
\`\`\`
Adding/removing shards requires data migration

Strategies:
- Consistent hashing (minimal migration)
- Double-write period
- Background migration with cutover
\`\`\`

**Shard Key Selection:**
\`\`\`
Good: user_id (evenly distributed)
Bad: timestamp (hot spot on recent shard)
Bad: country (uneven distribution)

Criteria:
- High cardinality
- Even distribution
- Matches query patterns
\`\`\``
    },
    {
      id: 5,
      category: 'CAP Theorem',
      question: 'Explain CAP Theorem and its implications',
      answer: `**CAP Theorem:**
In a distributed system, you can only guarantee 2 of 3 properties:
- **C**onsistency - Every read receives the most recent write
- **A**vailability - Every request receives a response
- **P**artition tolerance - System works despite network failures

**The Trade-offs:**

**CP Systems (Consistency + Partition Tolerance):**
\`\`\`
During partition, system becomes unavailable
to maintain consistency.

Examples: MongoDB, HBase, Redis (default)

Behavior during partition:
- Refuse writes to prevent inconsistency
- Return errors instead of stale data

Use cases:
- Financial transactions
- Inventory management
- Leader election
\`\`\`

**AP Systems (Availability + Partition Tolerance):**
\`\`\`
During partition, system remains available
but may return stale data.

Examples: Cassandra, CouchDB, DynamoDB

Behavior during partition:
- Accept writes on both sides
- Resolve conflicts later (eventual consistency)

Use cases:
- Social media feeds
- Shopping carts
- DNS
\`\`\`

**CA Systems (Consistency + Availability):**
\`\`\`
Not possible in distributed systems!
Network partitions are inevitable.

Single-node databases are effectively CA
but aren't distributed.

Examples: Single MySQL, PostgreSQL (non-clustered)
\`\`\`

**Real-World Example:**

**Banking System (CP):**
\`\`\`
Balance: $100

User A (Server 1): Withdraw $80
User B (Server 2): Withdraw $80

With CP:
- Servers must agree before completing
- If partition, reject transactions
- Never overdraw

With AP:
- Both withdrawals succeed
- $60 overdrawn (unacceptable!)
\`\`\`

**Social Media Feed (AP):**
\`\`\`
User posts update

With AP:
- Post visible to some users immediately
- Eventually visible to all
- Acceptable delay

With CP:
- All users see post at same time
- But some can't see ANY posts during partition
- Worse user experience
\`\`\`

**PACELC Extension:**
\`\`\`
If Partition:
  Choose Availability or Consistency
Else (normal operation):
  Choose Latency or Consistency

Examples:
- DynamoDB: PA/EL (AP during partition, low latency normally)
- MongoDB: PC/EC (CP always)
- Cassandra: PA/EL (tunable consistency)
\`\`\`

**Tunable Consistency:**
\`\`\`
Cassandra allows per-query tuning:

ONE: Write/read from one replica (fast, eventual)
QUORUM: Majority of replicas (balanced)
ALL: All replicas (slow, consistent)

Write QUORUM + Read QUORUM > Replication Factor
= Strong consistency
\`\`\`

**Best Practices:**
- Understand your consistency requirements
- Choose database that matches use case
- Consider tunable consistency
- Plan for network partitions
- Document expected behavior during failures`
    },
    {
      id: 6,
      category: 'Messaging',
      question: 'When would you use message queues vs direct API calls?',
      answer: `**Message Queues vs Direct API Calls:**

**Direct API Calls:**
\`\`\`
Service A ──HTTP──> Service B

Synchronous communication
Tight coupling
Immediate response needed
\`\`\`

**Message Queues:**
\`\`\`
Service A ──> Queue ──> Service B

Asynchronous communication
Loose coupling
Response not immediately needed
\`\`\`

**When to Use Direct API Calls:**

**1. Immediate Response Required:**
\`\`\`
User login → Auth Service → Token
- User needs token immediately
- Can't proceed without response
\`\`\`

**2. Simple Request-Response:**
\`\`\`
GET /api/users/123
- Straightforward query
- No complex processing
\`\`\`

**3. Low Volume, Low Latency:**
\`\`\`
Internal service communication
- Few requests per second
- Need sub-100ms response
\`\`\`

**When to Use Message Queues:**

**1. Fire-and-Forget Operations:**
\`\`\`
User places order:
1. Save order → Return success to user
2. Queue: Send confirmation email
3. Queue: Update inventory
4. Queue: Notify warehouse

User doesn't wait for email to be sent
\`\`\`

**2. Handling Traffic Spikes:**
\`\`\`
Without queue:
Spike → Services overwhelmed → Failures

With queue:
Spike → Messages buffered → Services process at own pace
\`\`\`

**3. Service Decoupling:**
\`\`\`
Without queue:
Order Service must know about:
- Inventory Service
- Email Service
- Analytics Service
- Notification Service

With queue:
Order Service publishes event
Other services subscribe independently
\`\`\`

**4. Reliable Delivery:**
\`\`\`
Critical operations that must complete:
- Payment processing
- Order fulfillment
- Data synchronization

Queue ensures message delivered even if
consumer temporarily unavailable
\`\`\`

**5. Rate Limiting:**
\`\`\`
External API has rate limit:
- Queue requests
- Process at allowed rate
- Don't lose requests during limits
\`\`\`

**Comparison:**
| Aspect | Direct API | Message Queue |
|--------|-----------|---------------|
| Coupling | Tight | Loose |
| Latency | Low | Higher |
| Reliability | Must handle failures | Built-in retry |
| Scalability | Limited by slowest | Independent scaling |
| Complexity | Simple | More infrastructure |
| Debugging | Easier | More complex |

**Hybrid Approach:**
\`\`\`
User → API → Order Service (sync)
                    ↓
              Message Queue (async)
                    ↓
    ┌───────────────┼───────────────┐
    ↓               ↓               ↓
Inventory      Email           Analytics
\`\`\``
    },
    {
      id: 7,
      category: 'Microservices',
      question: 'How do you handle distributed transactions in microservices?',
      answer: `**Distributed Transaction Challenges:**
In microservices, a single business operation may span multiple services, each with its own database.

**Traditional 2PC (Two-Phase Commit):**
\`\`\`
Phase 1: Prepare
- Coordinator asks all participants to prepare
- Participants lock resources, respond ready/abort

Phase 2: Commit
- If all ready → Coordinator says commit
- If any abort → Coordinator says rollback

Problems:
- Blocking (resources locked)
- Single point of failure (coordinator)
- Not suitable for microservices
\`\`\`

**Saga Pattern:**
A sequence of local transactions where each step triggers the next.

**1. Choreography-Based Saga:**
\`\`\`
Services communicate via events, no central coordinator

Order Created → Payment Service
                    ↓
              Payment Processed → Inventory Service
                                      ↓
                                Inventory Reserved → Shipping Service
                                                          ↓
                                                    Shipment Created

Compensation (on failure):
Shipment Failed → Release Inventory → Refund Payment → Cancel Order
\`\`\`

\`\`\`java
// Order Service publishes event
eventPublisher.publish(new OrderCreatedEvent(order));

// Payment Service listens
@EventHandler
public void on(OrderCreatedEvent event) {
    try {
        processPayment(event.getOrder());
        eventPublisher.publish(new PaymentProcessedEvent(...));
    } catch (Exception e) {
        eventPublisher.publish(new PaymentFailedEvent(...));
    }
}
\`\`\`

**2. Orchestration-Based Saga:**
\`\`\`
Central orchestrator coordinates the saga

                   Saga Orchestrator
                         │
    ┌────────────────────┼────────────────────┐
    ↓                    ↓                    ↓
Order Service    Payment Service    Inventory Service
\`\`\`

\`\`\`java
public class OrderSagaOrchestrator {

    public void createOrder(OrderRequest request) {
        try {
            // Step 1: Create order
            Order order = orderService.create(request);

            // Step 2: Process payment
            Payment payment = paymentService.charge(order);

            // Step 3: Reserve inventory
            inventoryService.reserve(order.getItems());

            // Step 4: Complete
            orderService.complete(order);

        } catch (PaymentException e) {
            // Compensate: Cancel order
            orderService.cancel(order);

        } catch (InventoryException e) {
            // Compensate: Refund and cancel
            paymentService.refund(payment);
            orderService.cancel(order);
        }
    }
}
\`\`\`

**Saga Comparison:**
| Aspect | Choreography | Orchestration |
|--------|--------------|---------------|
| Coupling | Loose | Tighter |
| Visibility | Distributed | Centralized |
| Debugging | Harder | Easier |
| Single point of failure | No | Yes (orchestrator) |
| Complexity | In events | In orchestrator |

**Compensating Transactions:**
\`\`\`
Each step must have a compensating action:

createOrder    → cancelOrder
processPayment → refundPayment
reserveStock   → releaseStock
createShipment → cancelShipment

Compensations must be:
- Idempotent (can run multiple times safely)
- Eventually consistent
\`\`\`

**Outbox Pattern (Reliable Messaging):**
\`\`\`
Problem: Need to update DB AND publish event atomically

Solution: Outbox table in same transaction

BEGIN TRANSACTION;
  INSERT INTO orders (...);
  INSERT INTO outbox (event_type, payload) VALUES (...);
COMMIT;

Separate process reads outbox, publishes events
\`\`\`

**Best Practices:**
- Design for eventual consistency
- Implement idempotent operations
- Use correlation IDs for tracing
- Log all saga steps
- Monitor saga completion rates
- Plan compensation carefully
- Test failure scenarios`
    },
    {
      id: 8,
      category: 'Rate Limiting',
      question: 'How do you implement rate limiting in a distributed system?',
      answer: `**Rate Limiting Algorithms:**

**1. Token Bucket:**
\`\`\`
Bucket filled with tokens at constant rate
Each request consumes a token
No token = request rejected

Bucket capacity: 10 tokens
Refill rate: 1 token/second

Second 0: 10 tokens
10 requests → 0 tokens (all succeed)
Second 1: 1 token
1 request → 0 tokens (succeeds)
More requests → rejected

Pros: Allows bursts, smooth rate limiting
Cons: Slightly complex
\`\`\`

\`\`\`java
public class TokenBucket {
    private final long capacity;
    private final double refillRate;
    private double tokens;
    private long lastRefill;

    public synchronized boolean tryConsume() {
        refill();
        if (tokens >= 1) {
            tokens--;
            return true;
        }
        return false;
    }

    private void refill() {
        long now = System.nanoTime();
        double tokensToAdd = (now - lastRefill) * refillRate / 1_000_000_000;
        tokens = Math.min(capacity, tokens + tokensToAdd);
        lastRefill = now;
    }
}
\`\`\`

**2. Leaky Bucket:**
\`\`\`
Requests added to queue (bucket)
Processed at fixed rate (leak)
Full bucket = request rejected

Bucket size: 10
Process rate: 1/second

Constant output rate regardless of input

Pros: Smooth output rate
Cons: No bursts allowed
\`\`\`

**3. Fixed Window:**
\`\`\`
Count requests in fixed time windows
Reset count at window boundary

Window: 1 minute, Limit: 100 requests

12:00:00 - 12:00:59 → Allow 100 requests
12:01:00 - 12:01:59 → Reset, allow 100 more

Problem: 200 requests possible at boundary
(100 at 12:00:59, 100 at 12:01:00)
\`\`\`

**4. Sliding Window Log:**
\`\`\`
Store timestamp of each request
Count requests in sliding window

Request at 12:01:30
Check: How many requests in [12:00:30, 12:01:30]?
If < limit, allow

Pros: Accurate
Cons: Memory intensive (store all timestamps)
\`\`\`

**5. Sliding Window Counter:**
\`\`\`
Combine fixed window with weighted count

Current window: 40% through
Previous window: 80 requests
Current window: 20 requests

Weighted count: 80 * 0.6 + 20 = 68

Pros: Memory efficient, accurate
Cons: Slightly complex
\`\`\`

**Distributed Rate Limiting:**

**Using Redis:**
\`\`\`java
// Token bucket with Redis
public boolean isAllowed(String userId) {
    String key = "ratelimit:" + userId;
    String script =
        "local tokens = redis.call('get', KEYS[1]) " +
        "if not tokens then tokens = ARGV[1] end " +
        "if tonumber(tokens) > 0 then " +
        "  redis.call('decr', KEYS[1]) " +
        "  redis.call('expire', KEYS[1], ARGV[2]) " +
        "  return 1 " +
        "end " +
        "return 0";

    Long result = redis.eval(script, List.of(key),
        List.of(String.valueOf(MAX_TOKENS), String.valueOf(WINDOW_SECONDS)));

    return result == 1;
}
\`\`\`

**Rate Limiting Strategies:**
\`\`\`
By User: 100 requests/minute per user
By IP: 1000 requests/minute per IP
By API Key: 10000 requests/day per API key
By Endpoint: /api/search limited to 10/minute

Combine: 100/min per user AND 1000/min per IP
\`\`\`

**Response Headers:**
\`\`\`
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1609459200
Retry-After: 60
\`\`\`

**Graceful Degradation:**
\`\`\`java
if (rateLimiter.isAllowed(userId)) {
    return fullResponse();
} else if (rateLimiter.isPartiallyAllowed(userId)) {
    return cachedResponse();  // Serve stale data
} else {
    throw new TooManyRequestsException();
}
\`\`\``
    },
    {
      id: 9,
      category: 'API Design',
      question: 'What are best practices for designing RESTful APIs?',
      answer: `**RESTful API Best Practices:**

**1. Use Nouns for Resources:**
\`\`\`
Good:
GET    /users
GET    /users/123
POST   /users
PUT    /users/123
DELETE /users/123

Bad:
GET /getUsers
POST /createUser
DELETE /deleteUser?id=123
\`\`\`

**2. Use HTTP Methods Correctly:**
\`\`\`
GET    - Read (idempotent, safe)
POST   - Create
PUT    - Update (replace entire resource)
PATCH  - Partial update
DELETE - Delete

Idempotent: GET, PUT, DELETE
Not idempotent: POST, PATCH
\`\`\`

**3. Use Proper Status Codes:**
\`\`\`
Success:
200 OK            - Successful GET, PUT, PATCH
201 Created       - Successful POST
204 No Content    - Successful DELETE

Client Errors:
400 Bad Request   - Invalid syntax
401 Unauthorized  - Authentication required
403 Forbidden     - Not allowed
404 Not Found     - Resource doesn't exist
409 Conflict      - Conflict (duplicate, version)
422 Unprocessable - Validation error
429 Too Many Requests

Server Errors:
500 Internal Server Error
502 Bad Gateway
503 Service Unavailable
\`\`\`

**4. Resource Naming:**
\`\`\`
Use plural nouns: /users, /orders, /products
Use lowercase: /user-profiles (not /UserProfiles)
Use hyphens: /user-orders (not /user_orders)

Nested resources:
GET /users/123/orders      - User's orders
GET /orders/456/items      - Order's items
POST /users/123/orders     - Create order for user

Avoid deep nesting:
Bad:  /users/123/orders/456/items/789
Good: /order-items/789
\`\`\`

**5. Filtering, Sorting, Pagination:**
\`\`\`
Filtering:
GET /users?status=active&role=admin

Sorting:
GET /users?sort=name,-created_at
(name ascending, created_at descending)

Pagination:
GET /users?page=2&limit=20
GET /users?offset=20&limit=20

Response with pagination info:
{
  "data": [...],
  "meta": {
    "page": 2,
    "limit": 20,
    "total": 100,
    "pages": 5
  },
  "links": {
    "first": "/users?page=1",
    "prev": "/users?page=1",
    "next": "/users?page=3",
    "last": "/users?page=5"
  }
}
\`\`\`

**6. Versioning:**
\`\`\`
URI versioning (most common):
/api/v1/users
/api/v2/users

Header versioning:
Accept: application/vnd.api.v1+json

Query parameter:
/users?version=1
\`\`\`

**7. Error Responses:**
\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      },
      {
        "field": "age",
        "message": "Must be at least 18"
      }
    ],
    "timestamp": "2024-01-15T10:30:00Z",
    "path": "/api/v1/users",
    "requestId": "abc-123"
  }
}
\`\`\`

**8. HATEOAS (Hypermedia):**
\`\`\`json
{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "_links": {
    "self": { "href": "/users/123" },
    "orders": { "href": "/users/123/orders" },
    "edit": { "href": "/users/123", "method": "PUT" }
  }
}
\`\`\`

**9. Security:**
\`\`\`
- Use HTTPS always
- Implement authentication (JWT, OAuth)
- Validate all inputs
- Rate limit requests
- Use CORS properly
- Don't expose sensitive data
- Sanitize error messages
\`\`\``
    },
    {
      id: 10,
      category: 'Consistency',
      question: 'Explain eventual consistency and how to handle it',
      answer: `**Eventual Consistency:**
After an update, all reads will eventually return the updated value, but not immediately.

**Strong vs Eventual Consistency:**
\`\`\`
Strong Consistency:
Write → All reads immediately see new value
Simple but slower, less available

Eventual Consistency:
Write → Some reads may see old value temporarily
Eventually all reads see new value
Faster, more available, complex
\`\`\`

**Why Use Eventual Consistency?**
\`\`\`
CAP Theorem trade-off:
- Network partitions happen
- Choose availability over consistency
- Accept temporary inconsistency

Benefits:
- Higher availability
- Better performance
- Geographic distribution
\`\`\`

**Handling Eventual Consistency:**

**1. Read Your Own Writes:**
\`\`\`java
// After write, read from same node or use version
public void updateProfile(User user) {
    userService.update(user);
    // Store version locally
    sessionCache.put("user:" + user.getId(), user);
}

public User getProfile(String userId) {
    // Check local cache first
    User cached = sessionCache.get("user:" + userId);
    if (cached != null) return cached;

    return userService.get(userId);
}
\`\`\`

**2. Version Vectors:**
\`\`\`java
class VersionedData<T> {
    T value;
    Map<String, Integer> vectorClock;
}

// Compare versions to detect conflicts
if (v1.vectorClock.happensBefore(v2.vectorClock)) {
    // v2 is newer, use v2
} else if (v2.vectorClock.happensBefore(v1.vectorClock)) {
    // v1 is newer, use v1
} else {
    // Concurrent updates - conflict!
    resolve(v1, v2);
}
\`\`\`

**3. Last-Write-Wins (LWW):**
\`\`\`java
// Simple but can lose data
class TimestampedValue<T> {
    T value;
    long timestamp;
}

T resolve(TimestampedValue<T> v1, TimestampedValue<T> v2) {
    return v1.timestamp > v2.timestamp ? v1.value : v2.value;
}
\`\`\`

**4. Conflict-Free Replicated Data Types (CRDTs):**
\`\`\`java
// G-Counter: Grow-only counter
class GCounter {
    Map<String, Integer> counts;  // node -> count

    void increment(String nodeId) {
        counts.merge(nodeId, 1, Integer::sum);
    }

    int value() {
        return counts.values().stream().mapToInt(i -> i).sum();
    }

    GCounter merge(GCounter other) {
        GCounter result = new GCounter();
        for (String node : Sets.union(counts.keySet(), other.counts.keySet())) {
            result.counts.put(node, Math.max(
                counts.getOrDefault(node, 0),
                other.counts.getOrDefault(node, 0)
            ));
        }
        return result;
    }
}
\`\`\`

**5. Application-Level Handling:**
\`\`\`java
// Show stale data with indicator
{
  "data": {...},
  "meta": {
    "dataAge": "5s",
    "mayBeStale": true
  }
}

// UI shows "Data may be slightly outdated"
\`\`\`

**6. Read Repair:**
\`\`\`
On read, if replicas disagree:
1. Return newest value to client
2. Background update stale replicas

Cassandra does this automatically
\`\`\`

**7. Anti-Entropy (Merkle Trees):**
\`\`\`
Periodically compare data between replicas
Use hash trees for efficient comparison
Sync only different portions
\`\`\`

**Design for Eventual Consistency:**
\`\`\`
1. Identify where strong consistency is needed
   - Financial transactions
   - Inventory counts

2. Accept eventual consistency elsewhere
   - User profiles
   - Social feeds
   - Analytics

3. Communicate to users
   - "Changes may take a few minutes"
   - "Your post is being processed"
\`\`\``
    },
    {
      id: 11,
      category: 'High Availability',
      question: 'How do you design for high availability?',
      answer: `**High Availability (HA) Principles:**

**Availability Targets:**
\`\`\`
99%    - 3.65 days downtime/year
99.9%  - 8.76 hours downtime/year
99.99% - 52.6 minutes downtime/year
99.999% - 5.26 minutes downtime/year (five nines)
\`\`\`

**1. Eliminate Single Points of Failure:**
\`\`\`
Bad:
User → Load Balancer → Single Server → Single Database

Good:
User → DNS (multiple IPs)
     → Load Balancer (active-passive pair)
     → Server Cluster (multiple instances)
     → Database Cluster (primary-replica)
\`\`\`

**2. Load Balancer HA:**
\`\`\`
Active-Passive:
┌──────────────┐    ┌──────────────┐
│   Active LB  │◄──►│  Passive LB  │
│   (primary)  │    │  (standby)   │
└──────────────┘    └──────────────┘
        │
        ▼
    Servers

Virtual IP (VIP) floats to active LB
If active fails, passive takes over VIP
\`\`\`

**3. Database HA:**
\`\`\`
Primary-Replica with Automatic Failover:

Primary (writes) ──replicate──> Replica 1 (reads)
      │                              │
      └──────replicate───────> Replica 2 (reads)

If primary fails:
- Replica promoted to primary
- Other replicas repoint
- Application reconnects

Tools: PostgreSQL Patroni, MySQL Group Replication
\`\`\`

**4. Multi-Region Deployment:**
\`\`\`
                    Global Load Balancer
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
     US-EAST          EU-WEST          ASIA-EAST
   ┌─────────┐      ┌─────────┐      ┌─────────┐
   │ App     │      │ App     │      │ App     │
   │ Servers │      │ Servers │      │ Servers │
   └────┬────┘      └────┬────┘      └────┬────┘
        │                │                │
   ┌────┴────┐      ┌────┴────┐      ┌────┴────┐
   │ Database│◄────►│ Database│◄────►│ Database│
   └─────────┘      └─────────┘      └─────────┘
            (cross-region replication)
\`\`\`

**5. Health Checks:**
\`\`\`java
@GetMapping("/health")
public Health health() {
    return Health.builder()
        .status(Status.UP)
        .withDetail("database", databaseHealth())
        .withDetail("cache", cacheHealth())
        .withDetail("messageQueue", mqHealth())
        .build();
}

// Deep health check for dependencies
// Shallow health check for quick liveness probe
\`\`\`

**6. Circuit Breaker:**
\`\`\`java
@CircuitBreaker(name = "userService", fallbackMethod = "fallback")
public User getUser(String id) {
    return userServiceClient.getUser(id);
}

public User fallback(String id, Exception e) {
    return cachedUserService.getUser(id);
}

// States: Closed → Open (on failures) → Half-Open → Closed
\`\`\`

**7. Graceful Degradation:**
\`\`\`
Full functionality:
- Real-time recommendations
- Personalized content
- Full search

Degraded (under load):
- Cached recommendations
- Generic content
- Limited search

Minimal (survival mode):
- Static pages
- Essential functions only
\`\`\`

**8. Stateless Services:**
\`\`\`
Stateless:
- Any instance can handle any request
- Easy to scale horizontally
- No instance affinity

State externalized to:
- Database
- Redis/Memcached
- Message queues
\`\`\`

**9. Deployment Strategies:**
\`\`\`
Blue-Green:
- Two identical environments
- Switch traffic instantly
- Easy rollback

Rolling Update:
- Update instances gradually
- No downtime
- Slower rollback

Canary:
- Route small % to new version
- Monitor for issues
- Gradually increase %
\`\`\`

**10. Chaos Engineering:**
\`\`\`
Regularly test failure scenarios:
- Kill random instances
- Inject network latency
- Simulate region failure
- Fill disk space

Tools: Chaos Monkey, Gremlin, LitmusChaos
\`\`\``
    },
    {
      id: 12,
      category: 'Security',
      question: 'How do you secure a distributed system?',
      answer: `**Distributed System Security:**

**1. Authentication:**
\`\`\`
Service-to-Service:
- Mutual TLS (mTLS)
- API keys
- OAuth 2.0 client credentials

User Authentication:
- JWT tokens
- Session management
- Multi-factor authentication
\`\`\`

**2. Mutual TLS (mTLS):**
\`\`\`
Both client and server present certificates

Service A ──────────────────> Service B
    │ Present cert              │ Verify A's cert
    │ Verify B's cert           │ Present cert

Benefits:
- Encrypted communication
- Both parties authenticated
- No impersonation

Implementation:
- Service mesh (Istio, Linkerd)
- Certificate management (cert-manager)
\`\`\`

**3. API Gateway Security:**
\`\`\`
                    API Gateway
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    Rate Limit      Auth Check      Input Validation
                         │
                    Microservices
\`\`\`

\`\`\`yaml
# Kong/API Gateway config
plugins:
  - jwt:
      secret_is_base64: true
  - rate-limiting:
      minute: 100
      policy: local
  - ip-restriction:
      whitelist: [10.0.0.0/8]
\`\`\`

**4. Zero Trust Architecture:**
\`\`\`
Never trust, always verify:
- Verify every request
- Authenticate every service
- Encrypt all traffic
- Principle of least privilege

Even internal traffic is untrusted
\`\`\`

**5. Secrets Management:**
\`\`\`java
// Bad: Hardcoded secrets
String password = "mysecret123";

// Good: External secret management
@Value("\${database.password}")
private String password;

// Better: Vault integration
VaultTemplate vault = new VaultTemplate(...);
String password = vault.read("secret/database").getData().get("password");

// Best: Dynamic secrets
DatabaseCredentials creds = vault.opsForDatabase()
    .getCredentials("my-role");
// Credentials auto-rotate
\`\`\`

**6. Input Validation:**
\`\`\`java
@PostMapping("/users")
public User createUser(@Valid @RequestBody UserRequest request) {
    // Validated automatically
}

public class UserRequest {
    @NotBlank
    @Size(max = 100)
    private String name;

    @Email
    private String email;

    @Pattern(regexp = "^[a-zA-Z0-9]+$")
    private String username;
}

// Also validate at service layer
// Never trust client input
\`\`\`

**7. SQL Injection Prevention:**
\`\`\`java
// Bad: String concatenation
String sql = "SELECT * FROM users WHERE id = " + userId;

// Good: Parameterized query
@Query("SELECT u FROM User u WHERE u.id = :id")
User findById(@Param("id") Long id);

// Or prepared statement
PreparedStatement ps = conn.prepareStatement(
    "SELECT * FROM users WHERE id = ?");
ps.setLong(1, userId);
\`\`\`

**8. Encryption:**
\`\`\`
In Transit:
- TLS 1.3 for all communication
- Certificate pinning for mobile

At Rest:
- Database encryption (TDE)
- File system encryption
- Application-level encryption for sensitive fields

Key Management:
- AWS KMS, Azure Key Vault, HashiCorp Vault
- Key rotation policies
\`\`\`

**9. Audit Logging:**
\`\`\`java
@Aspect
public class AuditAspect {

    @AfterReturning("@annotation(Audited)")
    public void audit(JoinPoint jp) {
        AuditEvent event = AuditEvent.builder()
            .action(jp.getSignature().getName())
            .actor(SecurityContext.getCurrentUser())
            .resource(extractResource(jp))
            .timestamp(Instant.now())
            .result("SUCCESS")
            .build();

        auditService.log(event);
    }
}

// Immutable audit log (append-only)
// Ship to SIEM for analysis
\`\`\`

**10. Security Headers:**
\`\`\`java
@Configuration
public class SecurityHeadersConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) {
        return http
            .headers(headers -> headers
                .contentSecurityPolicy("default-src 'self'")
                .xssProtection(xss -> xss.block(true))
                .frameOptions(frame -> frame.deny())
                .httpStrictTransportSecurity(hsts -> hsts
                    .maxAgeInSeconds(31536000)
                    .includeSubDomains(true))
            )
            .build();
    }
}
\`\`\`

**Security Checklist:**
- [ ] Enable TLS everywhere
- [ ] Implement authentication
- [ ] Use secrets management
- [ ] Validate all inputs
- [ ] Encrypt sensitive data
- [ ] Enable audit logging
- [ ] Regular security scanning
- [ ] Penetration testing
- [ ] Dependency vulnerability scanning`
    },
    {
      id: 13,
      category: 'Observability',
      question: 'Explain the three pillars of observability: logs, metrics, and traces',
      answer: `**Three Pillars of Observability:**

**1. Logs:**
\`\`\`
What happened at a specific point in time

Structured logging:
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "ERROR",
  "service": "order-service",
  "traceId": "abc123",
  "userId": "user-456",
  "message": "Payment failed",
  "error": {
    "type": "PaymentException",
    "message": "Card declined"
  }
}
\`\`\`

**Log Aggregation:**
\`\`\`
Service A ──┐
Service B ──┼──> Log Shipper ──> Elasticsearch ──> Kibana
Service C ──┘    (Fluentd)          (Storage)      (Query)

Or: Loki + Grafana (lighter weight)
\`\`\`

**Best Practices:**
\`\`\`java
// Structured logging
log.info("Order created",
    kv("orderId", order.getId()),
    kv("userId", user.getId()),
    kv("total", order.getTotal()));

// Include context
MDC.put("traceId", traceId);
MDC.put("userId", userId);
log.info("Processing order");
MDC.clear();
\`\`\`

**2. Metrics:**
\`\`\`
Numeric measurements over time

Types:
- Counter: Monotonically increasing (requests_total)
- Gauge: Point-in-time value (memory_usage)
- Histogram: Distribution (request_duration)
- Summary: Quantiles (p50, p99 latency)
\`\`\`

**Prometheus Metrics:**
\`\`\`java
// Counter
Counter requestCounter = Counter.build()
    .name("http_requests_total")
    .labelNames("method", "path", "status")
    .register();

requestCounter.labels("GET", "/api/users", "200").inc();

// Histogram
Histogram requestDuration = Histogram.build()
    .name("http_request_duration_seconds")
    .labelNames("method", "path")
    .buckets(0.01, 0.05, 0.1, 0.5, 1.0, 5.0)
    .register();

requestDuration.labels("GET", "/api/users").observe(duration);

// Gauge
Gauge activeConnections = Gauge.build()
    .name("active_connections")
    .register();

activeConnections.inc();  // Connection opened
activeConnections.dec();  // Connection closed
\`\`\`

**Key Metrics:**
\`\`\`
RED Method (Request-oriented):
- Rate: Requests per second
- Errors: Error rate
- Duration: Latency

USE Method (Resource-oriented):
- Utilization: % time busy
- Saturation: Queue depth
- Errors: Error count

Golden Signals:
- Latency
- Traffic
- Errors
- Saturation
\`\`\`

**3. Traces:**
\`\`\`
Follow a request across services

User → API Gateway → Order Service → Payment Service → Database
        span 1        span 2          span 3           span 4

Trace: Collection of spans for one request
Span: Single operation with timing
\`\`\`

**Distributed Tracing:**
\`\`\`
Trace ID: abc-123 (same for entire request)
Parent Span ID: Links spans together

API Gateway (span 1)
  └── Order Service (span 2, parent=1)
        ├── Inventory Service (span 3, parent=2)
        └── Payment Service (span 4, parent=2)
              └── Database (span 5, parent=4)
\`\`\`

**OpenTelemetry:**
\`\`\`java
// Auto-instrumentation handles most cases
// Manual instrumentation for custom spans

Span span = tracer.spanBuilder("processOrder")
    .setParent(Context.current())
    .startSpan();

try (Scope scope = span.makeCurrent()) {
    span.setAttribute("order.id", orderId);
    span.setAttribute("user.id", userId);

    processOrder(order);

    span.setStatus(StatusCode.OK);
} catch (Exception e) {
    span.setStatus(StatusCode.ERROR, e.getMessage());
    span.recordException(e);
    throw e;
} finally {
    span.end();
}
\`\`\`

**Correlation:**
\`\`\`
Connect logs, metrics, traces:

1. Request arrives, generate traceId
2. Include traceId in all logs
3. Include traceId in metric labels
4. Trace shows request flow

From trace → find related logs
From alert → find trace → debug
\`\`\`

**Tools:**
\`\`\`
Logs: ELK Stack, Loki, Splunk
Metrics: Prometheus, Datadog, New Relic
Traces: Jaeger, Zipkin, Tempo
All-in-one: Grafana Cloud, Datadog
\`\`\``
    },
    {
      id: 14,
      category: 'Design Patterns',
      question: 'Explain the Circuit Breaker and Bulkhead patterns',
      answer: `**Circuit Breaker Pattern:**

**Problem:**
\`\`\`
Service A calls Service B repeatedly
Service B is down
Each call times out (30s each)
Service A becomes slow, may cascade failure
\`\`\`

**Solution:**
\`\`\`
Circuit breaker monitors failures
After threshold, "opens" circuit
Subsequent calls fail immediately
Periodically allows test call (half-open)
If successful, closes circuit
\`\`\`

**States:**
\`\`\`
CLOSED:
  Requests pass through
  Track success/failure rate
  If failure rate > threshold → OPEN

OPEN:
  Requests fail immediately
  No call to downstream service
  After timeout → HALF-OPEN

HALF-OPEN:
  Allow limited test requests
  If successful → CLOSED
  If fails → OPEN
\`\`\`

**Implementation (Resilience4j):**
\`\`\`java
CircuitBreakerConfig config = CircuitBreakerConfig.custom()
    .failureRateThreshold(50)           // 50% failure rate opens circuit
    .slowCallRateThreshold(80)          // 80% slow calls opens circuit
    .slowCallDurationThreshold(Duration.ofSeconds(2))
    .waitDurationInOpenState(Duration.ofSeconds(60))
    .permittedNumberOfCallsInHalfOpenState(3)
    .minimumNumberOfCalls(10)
    .slidingWindowType(SlidingWindowType.COUNT_BASED)
    .slidingWindowSize(10)
    .build();

CircuitBreaker circuitBreaker = CircuitBreaker.of("userService", config);

Supplier<User> decorated = CircuitBreaker
    .decorateSupplier(circuitBreaker, () -> userService.getUser(id));

Try<User> result = Try.ofSupplier(decorated)
    .recover(CallNotPermittedException.class, e -> getCachedUser(id));
\`\`\`

**Spring Integration:**
\`\`\`java
@CircuitBreaker(name = "userService", fallbackMethod = "getUserFallback")
public User getUser(String id) {
    return userServiceClient.getUser(id);
}

public User getUserFallback(String id, Exception e) {
    log.warn("Circuit breaker fallback for user: {}", id);
    return cachedUserService.getUser(id);
}
\`\`\`

**Bulkhead Pattern:**

**Problem:**
\`\`\`
Single slow dependency consumes all threads
Other operations can't proceed
Entire service becomes unresponsive
\`\`\`

**Solution:**
\`\`\`
Isolate different operations
Limit resources per operation
Failure in one doesn't affect others
\`\`\`

**Types:**

**1. Thread Pool Bulkhead:**
\`\`\`
Thread Pool for User Service: 10 threads
Thread Pool for Order Service: 10 threads
Thread Pool for Payment Service: 5 threads

If Payment Service is slow:
- Only 5 threads affected
- User and Order services unaffected
\`\`\`

\`\`\`java
ThreadPoolBulkheadConfig config = ThreadPoolBulkheadConfig.custom()
    .maxThreadPoolSize(10)
    .coreThreadPoolSize(5)
    .queueCapacity(100)
    .keepAliveDuration(Duration.ofSeconds(60))
    .build();

ThreadPoolBulkhead bulkhead = ThreadPoolBulkhead.of("userService", config);

CompletableFuture<User> future = bulkhead.executeSupplier(
    () -> userService.getUser(id));
\`\`\`

**2. Semaphore Bulkhead:**
\`\`\`
Limit concurrent calls without separate threads

Semaphore: 10 permits
Call acquired permit → proceed
No permit available → wait or fail
\`\`\`

\`\`\`java
SemaphoreBulkhead bulkhead = SemaphoreBulkhead.of("orderService",
    SemaphoreBulkheadConfig.custom()
        .maxConcurrentCalls(10)
        .maxWaitDuration(Duration.ofMillis(500))
        .build());

User user = Bulkhead.decorateSupplier(bulkhead,
    () -> userService.getUser(id)).get();
\`\`\`

**Combining Patterns:**
\`\`\`java
@Service
public class ResilientUserService {

    @CircuitBreaker(name = "userService")
    @Bulkhead(name = "userService")
    @Retry(name = "userService")
    @TimeLimiter(name = "userService")
    public CompletableFuture<User> getUser(String id) {
        return CompletableFuture.supplyAsync(() ->
            userServiceClient.getUser(id));
    }
}
\`\`\`

**Configuration:**
\`\`\`yaml
resilience4j:
  circuitbreaker:
    instances:
      userService:
        failure-rate-threshold: 50
        wait-duration-in-open-state: 60s
  bulkhead:
    instances:
      userService:
        max-concurrent-calls: 10
        max-wait-duration: 500ms
  retry:
    instances:
      userService:
        max-attempts: 3
        wait-duration: 1s
\`\`\``
    },
    {
      id: 15,
      category: 'Data Storage',
      question: 'How do you choose between SQL and NoSQL databases?',
      answer: `**SQL vs NoSQL Decision:**

**SQL Databases (Relational):**
\`\`\`
Characteristics:
- Structured schema (tables, columns)
- ACID transactions
- Complex queries with JOINs
- Strong consistency

Examples: PostgreSQL, MySQL, Oracle

Use When:
- Complex relationships
- Need transactions
- Structured, predictable data
- Complex queries
- Data integrity critical
\`\`\`

**NoSQL Databases:**

**1. Document Stores:**
\`\`\`
Examples: MongoDB, CouchDB

Data model:
{
  "_id": "user123",
  "name": "John",
  "orders": [
    {"id": 1, "total": 100},
    {"id": 2, "total": 200}
  ]
}

Use when:
- Flexible schema
- Hierarchical data
- Denormalized data
- Rapid development
\`\`\`

**2. Key-Value Stores:**
\`\`\`
Examples: Redis, DynamoDB

Data model:
"user:123" → {"name": "John", "email": "john@example.com"}

Use when:
- Simple lookup by key
- Caching
- Session storage
- High throughput
\`\`\`

**3. Column-Family:**
\`\`\`
Examples: Cassandra, HBase

Data model:
Row key: user123
Column families: {
  profile: {name: "John", email: "john@example.com"},
  activity: {last_login: "2024-01-15", visits: 100}
}

Use when:
- Write-heavy workloads
- Time-series data
- Large scale (billions of rows)
\`\`\`

**4. Graph Databases:**
\`\`\`
Examples: Neo4j, Amazon Neptune

Data model:
(User)-[FRIENDS_WITH]->(User)
(User)-[PURCHASED]->(Product)

Use when:
- Relationship-heavy queries
- Social networks
- Recommendation engines
- Fraud detection
\`\`\`

**Comparison:**
| Factor | SQL | NoSQL |
|--------|-----|-------|
| Schema | Fixed | Flexible |
| Scaling | Vertical | Horizontal |
| Transactions | Full ACID | Usually eventual |
| Relationships | Complex JOINs | Embedded/referenced |
| Query Language | SQL | Various |
| Best for | Structured data | Unstructured/varied |

**Decision Framework:**
\`\`\`
1. Data Structure
   - Highly relational → SQL
   - Hierarchical/nested → Document
   - Simple key-lookup → Key-Value
   - Graph relationships → Graph DB

2. Consistency Requirements
   - ACID required → SQL
   - Eventual OK → NoSQL

3. Scale Requirements
   - Moderate scale → SQL works
   - Massive scale → NoSQL shines

4. Query Patterns
   - Complex queries → SQL
   - Simple queries → NoSQL
   - Graph traversal → Graph DB

5. Development Speed
   - Schema changes frequent → Document DB
   - Schema stable → SQL
\`\`\`

**Polyglot Persistence:**
\`\`\`
Use multiple databases for different needs:

E-commerce system:
- User accounts → PostgreSQL (relational, transactions)
- Product catalog → MongoDB (flexible schema)
- Shopping cart → Redis (fast, ephemeral)
- Search → Elasticsearch (full-text search)
- Recommendations → Neo4j (graph relationships)
\`\`\``
    }
  ]

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Scalability': '#ef4444',
      'Load Balancing': '#f59e0b',
      'Caching': '#10b981',
      'Database': '#3b82f6',
      'CAP Theorem': '#8b5cf6',
      'Messaging': '#ec4899',
      'Microservices': '#06b6d4',
      'Rate Limiting': '#f97316',
      'API Design': '#14b8a6',
      'Consistency': '#a855f7',
      'High Availability': '#22c55e',
      'Security': '#dc2626',
      'Observability': '#0ea5e9',
      'Design Patterns': '#6366f1',
      'Data Storage': '#eab308'
    }
    return colors[category] || '#6b7280'
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
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
            backgroundColor: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#7c3aed'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#8b5cf6'}
        >
          ← Back to Questions
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#93c5fd',
          margin: 0
        }}>
          System Design Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'left',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Master system design concepts including scalability, distributed systems, caching, and architectural patterns.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {questions.map((q) => (
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
                <div style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  backgroundColor: getCategoryColor(q.category),
                  color: 'white',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>
                  {q.category}
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
                  <CompletionCheckbox problemId={`SystemDesignQuestions-${q.id}`} />
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
                  lineHeight: '1.8',
                  color: '#d1d5db',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  textAlign: 'left'
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
        backgroundColor: 'rgba(139, 92, 246, 0.15)',
        borderRadius: '12px',
        border: '2px solid #8b5cf6'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#c4b5fd', marginBottom: '0.5rem' }}>
          System Design Interview Tips
        </h3>
        <ul style={{ color: '#d1d5db', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Start with requirements clarification - ask questions</li>
          <li>Do back-of-envelope calculations for scale</li>
          <li>Start high-level, then dive into components</li>
          <li>Consider trade-offs and justify your decisions</li>
          <li>Discuss failure scenarios and how to handle them</li>
          <li>Know the fundamentals: CAP theorem, scaling patterns, caching</li>
        </ul>
      </div>
    </div>
  )
}

export default SystemDesignQuestions

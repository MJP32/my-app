import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function SystemDesignFundamentalsQuestions({ onBack, problemLimit }) {
  const [expandedId, setExpandedId] = useState(null)

  const questions = [
    // CAP Theorem
    {
      id: 1,
      category: 'CAP Theorem',
      question: 'What is the CAP theorem and what does each letter stand for?',
      answer: `The CAP theorem states that a distributed system can only guarantee two of three properties:

**C - Consistency**: Every read receives the most recent write or an error. All nodes see the same data at the same time.

**A - Availability**: Every request receives a response (success or failure), without guarantee it contains the most recent write.

**P - Partition Tolerance**: The system continues to operate despite network partitions (communication breakdowns between nodes).

**Why only 2 of 3?**
- During a network partition, you must choose between consistency (reject requests) or availability (serve potentially stale data)
- CP systems: MongoDB, HBase, Redis (in cluster mode)
- AP systems: Cassandra, DynamoDB, CouchDB
- CA systems: Traditional RDBMS (but they can't handle partitions)`
    },
    {
      id: 2,
      category: 'CAP Theorem',
      question: 'When would you choose CP over AP, and vice versa?',
      answer: `**Choose CP (Consistency + Partition Tolerance) when:**
- Financial transactions (banking, trading)
- Inventory management (avoid overselling)
- User authentication/authorization
- Any system where stale data causes serious problems

**Choose AP (Availability + Partition Tolerance) when:**
- Social media feeds (slightly stale posts are acceptable)
- Shopping carts (can merge conflicts later)
- Analytics and metrics collection
- Content delivery systems
- Any system where availability is more important than immediate consistency

**Real-world example:**
- Banking: CP - You can't show wrong account balance
- Twitter timeline: AP - Missing a tweet for a few seconds is acceptable`
    },
    // Scaling
    {
      id: 3,
      category: 'Scaling',
      question: 'What is the difference between horizontal and vertical scaling?',
      answer: `**Vertical Scaling (Scale Up)**
- Add more power to existing machine (CPU, RAM, storage)
- Simpler to implement
- Limited by hardware capacity
- Single point of failure
- Example: Upgrading from 8GB to 64GB RAM

**Horizontal Scaling (Scale Out)**
- Add more machines to the pool
- More complex (requires load balancing, data distribution)
- Virtually unlimited scaling
- Better fault tolerance
- Example: Adding more web servers behind a load balancer

**When to use each:**
- Vertical: Database servers, legacy applications, quick fixes
- Horizontal: Web servers, microservices, distributed systems

**Cost considerations:**
- Vertical: Exponential cost increase for high-end hardware
- Horizontal: Linear cost increase, commodity hardware`
    },
    {
      id: 4,
      category: 'Scaling',
      question: 'What are the challenges of horizontal scaling and how do you address them?',
      answer: `**Key Challenges:**

1. **State Management**
   - Sessions must be shared or externalized
   - Solution: Stateless services + Redis/Memcached for session storage

2. **Data Consistency**
   - Multiple nodes may have different views
   - Solution: Distributed consensus (Raft, Paxos), eventual consistency

3. **Load Balancing**
   - Traffic distribution across nodes
   - Solution: Load balancers (HAProxy, Nginx, AWS ALB)

4. **Service Discovery**
   - Finding healthy instances
   - Solution: Consul, etcd, Kubernetes DNS

5. **Data Partitioning**
   - Splitting data across databases
   - Solution: Consistent hashing, range-based sharding

6. **Distributed Transactions**
   - ACID across multiple services
   - Solution: Saga pattern, eventual consistency, 2PC (when necessary)`
    },
    // Load Balancing
    {
      id: 5,
      category: 'Load Balancing',
      question: 'What are the different load balancing algorithms and when would you use each?',
      answer: `**1. Round Robin**
- Requests distributed sequentially
- Use when: Servers have equal capacity, stateless requests
- Pros: Simple, fair distribution
- Cons: Doesn't consider server load

**2. Weighted Round Robin**
- Servers assigned weights based on capacity
- Use when: Heterogeneous server capacities
- Example: Server A (weight 3) gets 3x requests vs Server B (weight 1)

**3. Least Connections**
- Routes to server with fewest active connections
- Use when: Long-lived connections, varying request times
- Good for: WebSocket connections, database connections

**4. IP Hash**
- Hash of client IP determines server
- Use when: Session persistence needed without cookies
- Ensures same client goes to same server

**5. Least Response Time**
- Routes to fastest responding server
- Use when: Response time is critical
- Requires health monitoring

**6. Random**
- Randomly selects a server
- Use when: Simple setup, equal servers
- Statistically similar to Round Robin at scale`
    },
    {
      id: 6,
      category: 'Load Balancing',
      question: 'What is the difference between L4 and L7 load balancers?',
      answer: `**Layer 4 (Transport Layer) Load Balancer**
- Operates on TCP/UDP level
- Routes based on IP address and port
- No inspection of packet content
- Faster, lower latency
- Examples: AWS NLB, HAProxy (TCP mode)

**Layer 7 (Application Layer) Load Balancer**
- Operates on HTTP/HTTPS level
- Can inspect headers, cookies, URLs
- Content-based routing possible
- SSL termination
- Examples: AWS ALB, Nginx, HAProxy (HTTP mode)

**Use L4 when:**
- Raw performance is critical
- Non-HTTP protocols (gaming, IoT)
- Simple TCP/UDP forwarding

**Use L7 when:**
- Need URL-based routing (/api vs /static)
- Cookie-based session persistence
- SSL termination at load balancer
- A/B testing, canary deployments
- WebSocket support with path routing`
    },
    // Caching
    {
      id: 7,
      category: 'Caching',
      question: 'What are the different caching strategies and when would you use each?',
      answer: `**1. Cache-Aside (Lazy Loading)**
- App checks cache first, loads from DB on miss
- Use when: Read-heavy workloads
- Pros: Only requested data cached
- Cons: Cache miss penalty, potential stale data

**2. Write-Through**
- Write to cache and DB simultaneously
- Use when: Data consistency critical
- Pros: Cache always current
- Cons: Write latency, cache churn

**3. Write-Behind (Write-Back)**
- Write to cache, async write to DB
- Use when: Write-heavy, can tolerate some data loss
- Pros: Fast writes
- Cons: Risk of data loss, complexity

**4. Read-Through**
- Cache loads data from DB on miss
- Use when: Want cache to manage DB interaction
- Pros: Simpler application code
- Cons: First request always slow

**5. Refresh-Ahead**
- Proactively refresh before expiry
- Use when: Predictable access patterns
- Pros: No cache miss latency
- Cons: May refresh unused data`
    },
    {
      id: 8,
      category: 'Caching',
      question: 'What are cache eviction policies and when would you use each?',
      answer: `**1. LRU (Least Recently Used)**
- Evicts least recently accessed item
- Best for: General purpose, temporal locality
- Implementation: Doubly linked list + HashMap

**2. LFU (Least Frequently Used)**
- Evicts least frequently accessed item
- Best for: Long-term popularity patterns
- Cons: New items may be evicted quickly

**3. FIFO (First In, First Out)**
- Evicts oldest item
- Best for: Simple implementation needs
- Cons: Doesn't consider access patterns

**4. TTL (Time To Live)**
- Items expire after set duration
- Best for: Data that becomes stale
- Often combined with other policies

**5. Random**
- Randomly selects item to evict
- Best for: When access patterns unpredictable
- Surprisingly effective in some cases

**6. ARC (Adaptive Replacement Cache)**
- Balances recency and frequency
- Best for: Varying workload patterns
- Used in: ZFS, IBM DS8000`
    },
    // CDN
    {
      id: 9,
      category: 'CDN',
      question: 'How does a CDN work and what are its benefits?',
      answer: `**How CDN Works:**
1. User requests content (image, video, static file)
2. DNS resolves to nearest CDN edge server
3. Edge server checks if content is cached
4. If cached (hit): Serve directly
5. If not cached (miss): Fetch from origin, cache, then serve

**Key Benefits:**

1. **Reduced Latency**
   - Content served from geographically closer servers
   - Typical: 200ms -> 20ms improvement

2. **Reduced Origin Load**
   - Edge servers handle most requests
   - Origin only serves cache misses

3. **DDoS Protection**
   - Distributed infrastructure absorbs attacks
   - Edge servers filter malicious traffic

4. **High Availability**
   - Multiple edge locations provide redundancy
   - Automatic failover

5. **Cost Savings**
   - Reduced bandwidth from origin
   - Lower infrastructure requirements

**Popular CDNs:** CloudFlare, AWS CloudFront, Akamai, Fastly`
    },
    {
      id: 10,
      category: 'CDN',
      question: 'What is cache invalidation in CDN and what strategies exist?',
      answer: `**Cache Invalidation Challenge:**
"There are only two hard things in Computer Science: cache invalidation and naming things." - Phil Karlton

**Strategies:**

1. **TTL-Based Expiration**
   - Set max-age in Cache-Control header
   - Simple but not immediate
   - Example: \`Cache-Control: max-age=3600\`

2. **Versioned URLs**
   - Include version/hash in filename
   - \`style.css\` -> \`style.v2.css\` or \`style.abc123.css\`
   - Instant invalidation, no purge needed

3. **Purge/Invalidation API**
   - Explicitly tell CDN to remove content
   - CloudFront: CreateInvalidation API
   - Can be slow (propagation time)

4. **Soft Purge (Stale-While-Revalidate)**
   - Serve stale content while fetching fresh
   - Better user experience
   - Header: \`stale-while-revalidate=60\`

5. **Tag-Based Invalidation**
   - Group related content with tags
   - Invalidate all content with specific tag
   - Fastly Surrogate-Key header

**Best Practice:** Use versioned URLs for static assets, TTL + purge for dynamic content`
    },
    // Proxies
    {
      id: 11,
      category: 'Proxies',
      question: 'What is the difference between forward proxy and reverse proxy?',
      answer: `**Forward Proxy**
- Sits between client and internet
- Client knows about proxy, configures it
- Hides client identity from servers

**Use Cases:**
- Corporate network filtering
- Bypass geo-restrictions
- Caching for clients
- Anonymity (like Tor)

**Reverse Proxy**
- Sits between internet and servers
- Client doesn't know about proxy
- Hides server identity from clients

**Use Cases:**
- Load balancing
- SSL termination
- Caching
- Security (WAF)
- Compression

**Key Difference:**
- Forward: Protects/hides clients
- Reverse: Protects/hides servers

**Examples:**
- Forward: Squid, corporate proxies
- Reverse: Nginx, HAProxy, AWS ALB`
    },
    {
      id: 12,
      category: 'Proxies',
      question: 'What is an API Gateway and how does it differ from a reverse proxy?',
      answer: `**API Gateway** is a specialized reverse proxy for APIs with additional features:

**Core Features:**
1. **Request Routing** - Route to different microservices
2. **Authentication/Authorization** - JWT validation, OAuth
3. **Rate Limiting** - Protect backend services
4. **Request/Response Transformation** - Modify payloads
5. **API Versioning** - /v1/users vs /v2/users
6. **Analytics & Monitoring** - Track API usage

**Reverse Proxy vs API Gateway:**

| Feature | Reverse Proxy | API Gateway |
|---------|--------------|-------------|
| Load Balancing | Yes | Yes |
| SSL Termination | Yes | Yes |
| Authentication | Basic | Advanced (OAuth, JWT) |
| Rate Limiting | Basic | Advanced (per user/API) |
| Request Transform | No | Yes |
| API Analytics | No | Yes |
| Protocol Translation | Limited | REST, GraphQL, gRPC |

**Popular API Gateways:** Kong, AWS API Gateway, Apigee, Zuul`
    },
    // System Design Methodology
    {
      id: 13,
      category: 'System Design',
      question: 'What is the STAR method for system design interviews?',
      answer: `**STAR Framework for System Design:**

**S - Scope (Requirements)**
- Clarify functional requirements
- Define non-functional requirements (scale, latency, availability)
- Identify constraints and assumptions
- Ask about: Users, geography, data volume, peak traffic

**T - Technical Design**
- High-level architecture diagram
- Choose appropriate components
- Data model and storage
- API design
- Consider trade-offs

**A - Articulate (Deep Dive)**
- Explain key components in detail
- Discuss algorithms and data structures
- Address bottlenecks
- Show scaling strategies

**R - Review (Wrap Up)**
- Summarize the design
- Discuss trade-offs made
- Identify potential improvements
- Mention monitoring and alerting

**Time Allocation (45 min):**
- Requirements: 5-7 min
- High-level design: 10-15 min
- Deep dive: 15-20 min
- Review: 5 min`
    },
    {
      id: 14,
      category: 'System Design',
      question: 'What are the key non-functional requirements to consider in system design?',
      answer: `**Key Non-Functional Requirements:**

1. **Scalability**
   - Handle growth in users, data, transactions
   - Questions: Expected users? Growth rate? Peak vs average?

2. **Availability**
   - System uptime target
   - 99.9% = 8.76 hours downtime/year
   - 99.99% = 52.6 minutes downtime/year

3. **Latency**
   - Response time requirements
   - P50, P95, P99 percentiles
   - User-facing: <200ms, Backend: <50ms

4. **Throughput**
   - Requests per second (RPS)
   - Data volume per second

5. **Consistency**
   - Strong vs eventual consistency
   - Read-after-write guarantees

6. **Durability**
   - Data loss tolerance
   - Backup and recovery requirements

7. **Security**
   - Authentication, authorization
   - Encryption (at rest, in transit)
   - Compliance requirements

8. **Cost**
   - Infrastructure budget
   - Build vs buy decisions`
    },
    {
      id: 15,
      category: 'System Design',
      question: 'How do you estimate capacity and do back-of-envelope calculations?',
      answer: `**Key Numbers to Remember:**

**Storage:**
- 1 char = 1 byte (ASCII) or 2 bytes (Unicode)
- Average tweet = 140 bytes
- Average image = 200 KB - 1 MB
- Average video minute = 50-150 MB

**Time:**
- 1 day = 86,400 seconds ≈ 100K seconds
- 1 month = 2.5 million seconds
- 1 year = 31.5 million seconds

**Scale:**
- 1 million = 10^6
- 1 billion = 10^9
- 1 trillion = 10^12

**Example Calculation - Twitter:**
- 500M tweets/day
- Average tweet: 140 bytes
- Daily storage: 500M × 140 = 70 GB/day
- With metadata (user, timestamp): ~200 GB/day
- Yearly: 200 GB × 365 = 73 TB/year

**QPS Calculation:**
- 500M tweets/day ÷ 100K seconds = 5,000 writes/sec
- Read:Write ratio 100:1 = 500,000 reads/sec
- Peak (2x average) = 1M reads/sec

**Memory for caching 20% of daily tweets:**
- 100M tweets × 140 bytes = 14 GB RAM`
    }
  ]

  // Filter questions based on problemLimit (for Top 100/300 mode)
  const displayQuestions = problemLimit ? questions.slice(0, problemLimit) : questions

  const categories = [...new Set(displayQuestions.map(q => q.category))]

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '850px', margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={onBack}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(139, 92, 246, 0.2)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '6px',
              color: '#a78bfa',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
          >
            ← Back
          </button>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#a78bfa',
            marginBottom: '0.5rem'
          }}>
            System Design Fundamentals Questions
          </h1>
          <p style={{ color: '#94a3b8' }}>
            {questions.length} questions covering CAP Theorem, Scaling, Load Balancing, Caching, CDN, and Proxies
          </p>
        </div>

        <CollapsibleSidebar
          items={displayQuestions}
          selectedIndex={expandedId ? displayQuestions.findIndex(q => q.id === expandedId) : -1}
          onSelect={(index) => setExpandedId(displayQuestions[index].id)}
          title="Questions"
          getItemLabel={(item) => `${item.id}. ${item.category}`}
          getItemIcon={() => '❓'}
          primaryColor="#3b82f6"
        />

        {/* Questions by Category */}
        {categories.map(category => (
          <div key={category} style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#c4b5fd',
              marginBottom: '1rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid rgba(139, 92, 246, 0.3)'
            }}>
              {category}
            </h2>
            {displayQuestions.filter(q => q.category === category).map(q => (
              <div
                key={q.id}
                style={{
                  background: 'rgba(30, 27, 75, 0.8)',
                  borderRadius: '8px',
                  marginBottom: '0.75rem',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                    <div onClick={(e) => e.stopPropagation()} style={{ transform: 'scale(0.85)' }}>
                      <CompletionCheckbox problemId={`SystemDesignFundamentalsQuestions-${q.id}`} />
                    </div>
                    <span style={{ color: '#e2e8f0', fontWeight: '500' }}>{q.question}</span>
                  </div>
                  <span style={{
                    color: '#a78bfa',
                    transform: expandedId === q.id ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s'
                  }}>
                    ▼
                  </span>
                </button>
                {expandedId === q.id && (
                  <div style={{
                    padding: '1rem',
                    borderTop: '1px solid rgba(139, 92, 246, 0.2)',
                    background: 'rgba(15, 12, 41, 0.5)'
                  }}>
                    <div style={{
                      color: '#cbd5e1',
                      lineHeight: '1.7',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {q.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SystemDesignFundamentalsQuestions

import { useState } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function ArchitectureQuestions({ onBack, problemLimit }) {
  const [expandedId, setExpandedId] = useState(null)

  const questions = [
    // Microservices
    {
      id: 1,
      category: 'Microservices',
      question: 'What are microservices and what are their benefits and drawbacks?',
      answer: `**Microservices** are an architectural style where an application is composed of small, independent services that communicate over APIs.

**Benefits:**
1. **Independent deployment** - Update one service without affecting others
2. **Technology flexibility** - Each service can use different tech stack
3. **Scalability** - Scale individual services based on demand
4. **Fault isolation** - One service failure doesn't crash entire system
5. **Team autonomy** - Small teams own entire services

**Drawbacks:**
1. **Distributed system complexity** - Network failures, latency
2. **Data consistency** - No ACID across services
3. **Operational overhead** - More services to deploy, monitor
4. **Testing complexity** - Integration testing harder
5. **Service discovery** - Need to find service instances

**When to use:**
- Large teams (>20 developers)
- Need independent scaling
- Different parts have different requirements
- Rapid, frequent deployments needed

**When NOT to use:**
- Small team/application
- Unclear domain boundaries
- Strong consistency requirements`
    },
    {
      id: 2,
      category: 'Microservices',
      question: 'How do microservices communicate with each other?',
      answer: `**Synchronous Communication:**

1. **REST/HTTP**
   - Simple, widely understood
   - Request-response pattern
   - Tight coupling in time

2. **gRPC**
   - Binary protocol (Protocol Buffers)
   - Faster than REST
   - Streaming support
   - Strong typing

**Asynchronous Communication:**

1. **Message Queues**
   - RabbitMQ, SQS
   - Point-to-point
   - Guaranteed delivery

2. **Event Streaming**
   - Kafka, Kinesis
   - Pub-sub pattern
   - Event replay capability

**Choosing communication style:**

| Sync (REST/gRPC) | Async (Messages) |
|------------------|------------------|
| Need immediate response | Fire and forget |
| Simple request-response | Complex workflows |
| Low latency critical | Spike handling |
| Tight coupling acceptable | Loose coupling needed |

**Best practice:**
- Sync for queries (GET data)
- Async for commands (change state)
- Event-driven for cross-service updates`
    },
    // Microservice Patterns
    {
      id: 3,
      category: 'Microservice Patterns',
      question: 'What is the Saga pattern and when would you use it?',
      answer: `**Saga Pattern** manages distributed transactions across multiple services without using 2PC (two-phase commit).

**How it works:**
- Break transaction into local transactions
- Each service completes its local transaction
- If one fails, execute compensating transactions

**Two types:**

1. **Choreography**
   - Services listen to events and react
   - No central coordinator
   - Simpler but harder to track

2. **Orchestration**
   - Central orchestrator manages flow
   - Easier to understand and debug
   - Single point of failure risk

**Example - Order Saga:**
1. Order Service: Create order (pending)
2. Payment Service: Process payment
3. Inventory Service: Reserve items
4. Order Service: Confirm order

**If Payment fails:**
1. Payment Service: Publish PaymentFailed
2. Order Service: Cancel order (compensate)

**When to use:**
- Transactions spanning multiple services
- Eventual consistency acceptable
- Long-running transactions

**Challenges:**
- Compensating transactions can be complex
- Observability and debugging
- Handling partial failures`
    },
    {
      id: 4,
      category: 'Microservice Patterns',
      question: 'What is CQRS and when should you use it?',
      answer: `**CQRS** (Command Query Responsibility Segregation) separates read and write operations into different models.

**Traditional approach:**
- Same model for reads and writes
- Same database for both

**CQRS approach:**
- Commands (writes) -> Write Model -> Write DB
- Queries (reads) -> Read Model -> Read DB

**Benefits:**
1. **Optimized models** - Read model for queries, write model for validation
2. **Independent scaling** - Scale reads/writes separately
3. **Better performance** - Denormalized read models
4. **Simpler queries** - Read model matches query needs

**When to use:**
- Read/write patterns very different
- Complex domain with rich business logic
- High read-to-write ratio
- Event sourcing architecture

**When NOT to use:**
- Simple CRUD applications
- Small scale
- Team unfamiliar with pattern

**Often combined with Event Sourcing:**
- Events are the write model
- Read model built from events
- Can rebuild read model anytime`
    },
    {
      id: 5,
      category: 'Microservice Patterns',
      question: 'What is the Circuit Breaker pattern?',
      answer: `**Circuit Breaker** prevents cascading failures by stopping calls to a failing service.

**States:**

1. **Closed** (normal)
   - Requests pass through
   - Failures counted
   - Threshold triggers Open

2. **Open** (failing)
   - Requests fail immediately
   - No calls to service
   - Timer triggers Half-Open

3. **Half-Open** (testing)
   - Limited requests allowed
   - Success -> Closed
   - Failure -> Open

**Configuration:**
- Failure threshold (e.g., 5 failures)
- Timeout duration (e.g., 30 seconds)
- Half-open max requests (e.g., 3)

**Implementation with Resilience4j:**
\`\`\`java
CircuitBreaker cb = CircuitBreaker.ofDefaults("service");
Supplier<String> decorated = CircuitBreaker
    .decorateSupplier(cb, () -> service.call());
Try<String> result = Try.ofSupplier(decorated);
\`\`\`

**Benefits:**
- Fail fast instead of waiting
- Give failing service time to recover
- Prevent resource exhaustion
- Provide fallback responses

**Use with:**
- Retry pattern (for transient failures)
- Bulkhead pattern (isolate resources)
- Timeout pattern (prevent hanging)`
    },
    // Domain Driven Design
    {
      id: 6,
      category: 'Domain Driven Design',
      question: 'What is Domain-Driven Design and what are its key concepts?',
      answer: `**Domain-Driven Design (DDD)** is an approach to software development that focuses on the business domain.

**Key Concepts:**

1. **Ubiquitous Language**
   - Shared vocabulary between developers and domain experts
   - Used in code, documentation, conversations

2. **Bounded Context**
   - Explicit boundary within which a model applies
   - Same term can mean different things in different contexts
   - Example: "Customer" in Sales vs Support

3. **Entities**
   - Objects with unique identity
   - Identity persists across time
   - Example: User, Order

4. **Value Objects**
   - Objects defined by attributes, not identity
   - Immutable
   - Example: Money, Address

5. **Aggregates**
   - Cluster of entities and value objects
   - One entity is the Aggregate Root
   - External access only through root

6. **Domain Events**
   - Something that happened in the domain
   - Immutable, past tense naming
   - Example: OrderPlaced, PaymentReceived

7. **Repositories**
   - Abstraction for data access
   - Work with aggregates`
    },
    {
      id: 7,
      category: 'Domain Driven Design',
      question: 'What is a Bounded Context and how do you identify them?',
      answer: `**Bounded Context** is a central pattern in DDD - it's the boundary within which a particular domain model is defined and applicable.

**Why needed:**
- Large systems have multiple models
- Same word means different things (Customer, Product)
- Teams need clear ownership

**Identifying Bounded Contexts:**

1. **Language boundaries**
   - Where ubiquitous language changes
   - Different teams use different terms

2. **Organizational boundaries**
   - Different teams/departments
   - Different business capabilities

3. **Process boundaries**
   - Different workflows
   - Different lifecycle stages

**Example - E-commerce:**
- **Sales Context**: Customer, Order, Cart
- **Shipping Context**: Shipment, Delivery, Address
- **Billing Context**: Invoice, Payment, Account

**Context Mapping:**
Relationships between bounded contexts:
- **Shared Kernel**: Shared subset of model
- **Customer-Supplier**: Upstream/downstream dependency
- **Conformist**: Downstream conforms to upstream
- **Anti-Corruption Layer**: Translation layer
- **Separate Ways**: No integration

**In microservices:**
Often 1:1 mapping between bounded context and microservice.`
    },
    // Event Driven Architecture
    {
      id: 8,
      category: 'Event Driven Architecture',
      question: 'What is Event Sourcing and how does it differ from traditional storage?',
      answer: `**Event Sourcing** stores state changes as a sequence of events, rather than current state.

**Traditional (State) Storage:**
- Store current state
- Update in place
- History lost

**Event Sourcing:**
- Store all events
- Current state derived from events
- Complete history preserved

**Example - Bank Account:**

Traditional:
\`\`\`
Account: { id: 1, balance: 150 }
\`\`\`

Event Sourced:
\`\`\`
AccountCreated { id: 1, initialBalance: 0 }
MoneyDeposited { amount: 200 }
MoneyWithdrawn { amount: 50 }
// Current balance: 0 + 200 - 50 = 150
\`\`\`

**Benefits:**
1. **Complete audit trail**
2. **Temporal queries** (state at any point)
3. **Debug by replaying events**
4. **Event-driven integration**

**Challenges:**
1. **Event schema evolution**
2. **Eventually consistent reads**
3. **Complexity**
4. **Storage growth**

**Often combined with:**
- CQRS (read models from events)
- Domain-Driven Design`
    },
    {
      id: 9,
      category: 'Event Driven Architecture',
      question: 'What is the difference between Event Notification and Event-Carried State Transfer?',
      answer: `**Event Notification:**
- Event says "something happened"
- Minimal data in event
- Consumers query source for details

Example:
\`\`\`json
{
  "type": "OrderPlaced",
  "orderId": "123"
}
\`\`\`
Consumer calls Order Service to get order details.

**Event-Carried State Transfer:**
- Event contains all relevant data
- Consumers don't need to call back
- Data duplication across services

Example:
\`\`\`json
{
  "type": "OrderPlaced",
  "orderId": "123",
  "customerId": "456",
  "items": [...],
  "total": 99.99,
  "shippingAddress": {...}
}
\`\`\`

**Comparison:**

| Aspect | Notification | State Transfer |
|--------|--------------|----------------|
| Event size | Small | Large |
| Coupling | Query coupling | Data coupling |
| Consistency | Real-time data | Point-in-time data |
| Performance | Extra calls | No extra calls |

**When to use:**
- Notification: Data changes frequently, small event rate
- State Transfer: High event rate, consumers need full data`
    },
    // Design Patterns
    {
      id: 10,
      category: 'Design Patterns',
      question: 'What is the API Gateway pattern and its responsibilities?',
      answer: `**API Gateway** is a single entry point for all client requests to microservices.

**Core Responsibilities:**

1. **Request Routing**
   - Route to appropriate microservice
   - URL path-based routing

2. **API Composition**
   - Aggregate data from multiple services
   - Single request, multiple backend calls

3. **Protocol Translation**
   - REST to gRPC
   - HTTP to WebSocket

4. **Authentication/Authorization**
   - Validate tokens
   - Check permissions

5. **Rate Limiting**
   - Protect backend services
   - Per-client limits

6. **Caching**
   - Response caching
   - Reduce backend load

7. **Request/Response Transformation**
   - Add/remove headers
   - Modify payloads

8. **Monitoring & Analytics**
   - Request logging
   - Metrics collection

**Popular implementations:**
- Kong
- AWS API Gateway
- Netflix Zuul
- Spring Cloud Gateway

**Considerations:**
- Single point of failure
- Can become bottleneck
- Added latency`
    },
    {
      id: 11,
      category: 'Design Patterns',
      question: 'What is the Strangler Fig pattern for migrating to microservices?',
      answer: `**Strangler Fig Pattern** gradually replaces a monolithic system with microservices, inspired by strangler fig trees that grow around host trees.

**How it works:**

1. **Identify component to extract**
   - Start with low-risk, well-bounded functionality
   - Clear interfaces

2. **Build new microservice**
   - Implement same functionality
   - May improve/modernize

3. **Route traffic**
   - Use facade/proxy to route requests
   - New functionality -> microservice
   - Rest -> monolith

4. **Iterate**
   - Extract more components
   - Eventually retire monolith

**Implementation:**

\`\`\`
                    ┌─────────────┐
    Clients ────────▶   Facade    │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
         ┌────────┐  ┌──────────┐  ┌────────┐
         │ New μS │  │ Monolith │  │ New μS │
         └────────┘  └──────────┘  └────────┘
\`\`\`

**Benefits:**
- Low risk, incremental migration
- Continuous delivery of value
- Rollback capability
- Learn and adapt

**Tips:**
- Start with edges, not core
- Use feature flags
- Monitor both systems
- Don't rush - can take years`
    },
    {
      id: 12,
      category: 'Design Patterns',
      question: 'What is the Bulkhead pattern?',
      answer: `**Bulkhead Pattern** isolates failures by partitioning resources, like compartments in a ship's hull.

**Without Bulkhead:**
- All requests share same thread pool
- Slow service exhausts all threads
- Entire application becomes unresponsive

**With Bulkhead:**
- Separate thread pools per service
- Slow service only affects its pool
- Other services continue working

**Implementation approaches:**

1. **Thread Pool Isolation**
\`\`\`java
// Separate pool for each service
ExecutorService paymentPool = Executors.newFixedThreadPool(10);
ExecutorService inventoryPool = Executors.newFixedThreadPool(10);
\`\`\`

2. **Semaphore Isolation**
\`\`\`java
Semaphore sem = new Semaphore(10);
if (sem.tryAcquire()) {
    try { callService(); }
    finally { sem.release(); }
} else {
    fallback();
}
\`\`\`

3. **Connection Pool Isolation**
- Separate database connection pools
- Separate HTTP client pools

**Bulkhead dimensions:**
- By service/dependency
- By tenant (multi-tenant systems)
- By priority (premium vs free users)

**Often combined with:**
- Circuit Breaker (fail fast)
- Timeout (prevent hanging)
- Retry (transient failures)`
    }
  ]

  // Filter questions based on problemLimit (for Top 100/300 mode)
  const displayQuestions = problemLimit ? questions.slice(0, problemLimit) : questions

  const categories = [...new Set(displayQuestions.map(q => q.category))]

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%)',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '850px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={onBack}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(34, 197, 94, 0.2)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '6px',
              color: '#4ade80',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
          >
            ← Back
          </button>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#4ade80',
            marginBottom: '0.5rem'
          }}>
            Architecture & Design Patterns Questions
          </h1>
          <p style={{ color: '#94a3b8' }}>
            {questions.length} questions covering Microservices, CQRS, Saga, DDD, Event Sourcing, and Design Patterns
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

        {categories.map(category => (
          <div key={category} style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#86efac',
              marginBottom: '1rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid rgba(34, 197, 94, 0.3)'
            }}>
              {category}
            </h2>
            {displayQuestions.filter(q => q.category === category).map(q => (
              <div
                key={q.id}
                style={{
                  background: 'rgba(30, 41, 59, 0.8)',
                  borderRadius: '8px',
                  marginBottom: '0.75rem',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
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
                      <CompletionCheckbox problemId={`ArchitectureQuestions-${q.id}`} />
                    </div>
                    <span style={{ color: '#e2e8f0', fontWeight: '500' }}>{q.question}</span>
                  </div>
                  <span style={{
                    color: '#4ade80',
                    transform: expandedId === q.id ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s'
                  }}>
                    ▼
                  </span>
                </button>
                {expandedId === q.id && (
                  <div style={{
                    padding: '1rem',
                    borderTop: '1px solid rgba(34, 197, 94, 0.2)',
                    background: 'rgba(15, 23, 42, 0.5)'
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

export default ArchitectureQuestions

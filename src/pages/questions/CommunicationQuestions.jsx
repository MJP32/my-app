import { useState } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function CommunicationQuestions({ onBack, problemLimit }) {
  const [expandedId, setExpandedId] = useState(null)

  const questions = [
    // API Design
    {
      id: 1,
      category: 'API Design',
      question: 'What are the key principles of RESTful API design?',
      answer: `**REST Principles:**

1. **Stateless**
   - Server doesn't store client state
   - Each request contains all needed info
   - Enables scalability

2. **Resource-based URLs**
   - Nouns, not verbs: /users, not /getUsers
   - Hierarchical: /users/123/orders

3. **HTTP Methods**
   - GET: Read (idempotent)
   - POST: Create
   - PUT: Full update (idempotent)
   - PATCH: Partial update
   - DELETE: Remove (idempotent)

4. **Status Codes**
   - 2xx: Success (200, 201, 204)
   - 4xx: Client error (400, 401, 404)
   - 5xx: Server error (500, 503)

5. **HATEOAS**
   - Include links to related resources
   - Client discovers API through links

**Best Practices:**
- Version your API (/v1/users)
- Use plural nouns (/users not /user)
- Filter, sort, paginate with query params
- Return appropriate content types
- Document with OpenAPI/Swagger`
    },
    {
      id: 2,
      category: 'API Design',
      question: 'How do you handle pagination in APIs?',
      answer: `**Pagination Strategies:**

1. **Offset-based (Page Number)**
\`\`\`
GET /users?page=2&per_page=20
\`\`\`
- Simple to implement
- Can miss/duplicate if data changes
- Slow for large offsets (OFFSET 10000)

2. **Cursor-based (Keyset)**
\`\`\`
GET /users?cursor=eyJpZCI6MTAwfQ&limit=20
\`\`\`
- Cursor encodes last seen item
- Consistent results even with changes
- Better performance at scale
- Can't jump to arbitrary page

3. **Time-based**
\`\`\`
GET /events?since=2024-01-01T00:00:00Z&limit=100
\`\`\`
- Good for feeds/timelines
- Natural ordering

**Response format:**
\`\`\`json
{
  "data": [...],
  "pagination": {
    "total": 1000,
    "per_page": 20,
    "current_page": 2,
    "next_cursor": "abc123",
    "has_more": true
  },
  "links": {
    "next": "/users?cursor=abc123",
    "prev": "/users?cursor=xyz789"
  }
}
\`\`\`

**Recommendation:** Use cursor-based for infinite scroll, offset for admin dashboards.`
    },
    // Message Queues
    {
      id: 3,
      category: 'Message Queues',
      question: 'What is the difference between message queues and event streaming?',
      answer: `**Message Queues (RabbitMQ, SQS):**
- Messages consumed once and deleted
- Point-to-point or pub-sub
- Consumer acknowledges processing
- Good for task distribution

**Event Streaming (Kafka, Kinesis):**
- Events persisted for retention period
- Multiple consumers read same events
- Consumer tracks own position (offset)
- Good for event sourcing, replay

**Comparison:**

| Aspect | Message Queue | Event Streaming |
|--------|---------------|-----------------|
| Consumption | Once | Multiple times |
| Storage | Until consumed | Retention period |
| Ordering | Per queue | Per partition |
| Replay | No | Yes |
| Use case | Tasks, commands | Events, logs |

**When to use Message Queue:**
- Background job processing
- Work distribution
- RPC replacement
- Transient messages

**When to use Event Streaming:**
- Event sourcing
- Real-time analytics
- Log aggregation
- Multi-consumer scenarios`
    },
    {
      id: 4,
      category: 'Message Queues',
      question: 'How do you ensure message delivery guarantees?',
      answer: `**Delivery Semantics:**

1. **At-most-once**
   - Fire and forget
   - Message may be lost
   - Fastest, no overhead

2. **At-least-once**
   - Retry until acknowledged
   - Message may be delivered multiple times
   - Consumer must be idempotent

3. **Exactly-once**
   - Message delivered exactly once
   - Hardest to achieve
   - Often "effectively once" via deduplication

**Achieving At-least-once:**
- Publisher: Retry on failure
- Broker: Persist before acknowledging
- Consumer: Ack only after processing

**Achieving Exactly-once:**

1. **Idempotent consumers**
   - Track processed message IDs
   - Skip if already seen

2. **Transactional outbox**
   - Write message to DB in same transaction
   - Separate process publishes to queue

3. **Deduplication**
   - Message ID in broker
   - Consumer checks duplicates

**Example - Idempotent handler:**
\`\`\`java
void handleMessage(Message msg) {
    if (processedIds.contains(msg.id)) {
        return; // Already processed
    }
    processOrder(msg);
    processedIds.add(msg.id);
    ack(msg);
}
\`\`\``
    },
    // WebSockets
    {
      id: 5,
      category: 'WebSockets',
      question: 'When would you use WebSockets vs HTTP polling vs Server-Sent Events?',
      answer: `**HTTP Polling:**
- Client repeatedly requests updates
- Simple to implement
- High latency, wasted requests

**Long Polling:**
- Server holds request until data available
- Better latency than polling
- Connection overhead on each update

**Server-Sent Events (SSE):**
- Server pushes events over HTTP
- One-way (server to client)
- Auto-reconnection built-in
- Text-based (no binary)

**WebSockets:**
- Full-duplex communication
- Bi-directional
- Binary and text support
- Persistent connection

**Comparison:**

| Use Case | Best Choice |
|----------|-------------|
| Real-time notifications | SSE |
| Live dashboard updates | SSE |
| Chat applications | WebSocket |
| Gaming | WebSocket |
| Collaborative editing | WebSocket |
| News feeds | SSE or Long Poll |
| Infrequent updates | HTTP Polling |

**Scaling considerations:**
- WebSockets need sticky sessions or shared state
- SSE easier to scale (HTTP/2 multiplexing)
- Both need connection management at scale`
    },
    {
      id: 6,
      category: 'WebSockets',
      question: 'How do you scale WebSocket connections?',
      answer: `**Challenges:**
- Persistent connections = more resources
- State must be shared across servers
- Load balancer needs sticky sessions

**Solutions:**

1. **Sticky Sessions**
   - Route same client to same server
   - Using IP hash or cookie
   - Problem: Uneven distribution

2. **Shared State (Pub/Sub)**
   - Redis Pub/Sub for message distribution
   - Any server can broadcast to all clients

\`\`\`
Client A ──► Server 1 ──┐
                        ├──► Redis ──┐
Client B ──► Server 2 ──┘            │
                                     ▼
Client C ──► Server 3 ◄────── Broadcast
\`\`\`

3. **Dedicated WebSocket Servers**
   - Separate pool for WS connections
   - Stateless API servers
   - WS servers hold connections

4. **Connection Managers**
   - Socket.io with Redis adapter
   - AWS API Gateway WebSocket
   - Pusher, Ably (managed services)

**Best practices:**
- Heartbeat/ping to detect dead connections
- Graceful reconnection with backoff
- Message queuing during disconnect
- Connection limits per client`
    },
    // Event Driven
    {
      id: 7,
      category: 'Event Driven',
      question: 'What are the components of an event-driven architecture?',
      answer: `**Core Components:**

1. **Event Producers**
   - Generate events when something happens
   - Don't know/care who consumes
   - Examples: User service, Order service

2. **Event Channel/Broker**
   - Transports events from producers to consumers
   - Kafka, RabbitMQ, EventBridge
   - May provide persistence, filtering

3. **Event Consumers**
   - Subscribe to events of interest
   - Process independently
   - Multiple consumers per event type

4. **Event Store (optional)**
   - Persists all events
   - Enables replay, auditing
   - Source of truth in event sourcing

**Event Structure:**
\`\`\`json
{
  "eventId": "uuid",
  "eventType": "OrderPlaced",
  "timestamp": "2024-01-15T10:30:00Z",
  "source": "order-service",
  "data": {
    "orderId": "123",
    "customerId": "456",
    "items": [...]
  },
  "metadata": {
    "correlationId": "abc",
    "userId": "789"
  }
}
\`\`\`

**Patterns:**
- Event notification
- Event-carried state transfer
- Event sourcing
- CQRS`
    },
    {
      id: 8,
      category: 'Event Driven',
      question: 'How do you handle event ordering and idempotency?',
      answer: `**Event Ordering Challenges:**
- Events may arrive out of order
- Parallel processing breaks order
- Network delays

**Solutions for Ordering:**

1. **Partition by key**
   - Same key always same partition
   - Order guaranteed within partition
   - Kafka: \`producer.send(topic, key, event)\`

2. **Sequence numbers**
   - Include sequence in event
   - Consumer detects gaps, reorders

3. **Causal ordering**
   - Track dependencies
   - Event B depends on Event A

4. **Accept eventual consistency**
   - Design for out-of-order
   - Last-write-wins or merge

**Idempotency Strategies:**

1. **Idempotency keys**
   - Unique ID per operation
   - Track processed IDs
   - Skip duplicates

2. **Idempotent operations**
   - Design operations that can repeat
   - SET vs INCREMENT
   - Upsert vs Insert

3. **Conditional updates**
   - Version/timestamp checks
   - UPDATE WHERE version = X

\`\`\`java
// Idempotent handler
void handleOrderPlaced(OrderPlacedEvent event) {
    if (orderExists(event.orderId)) {
        return; // Idempotent - already processed
    }
    createOrder(event);
}
\`\`\``
    }
  ]

  // Filter questions based on problemLimit (for Top 100/300 mode)
  const displayQuestions = problemLimit ? questions.slice(0, problemLimit) : questions

  const categories = [...new Set(displayQuestions.map(q => q.category))]

  return (
    <div style={{
      background: 'linear-gradient(135deg, #134e4a 0%, #0f172a 50%, #134e4a 100%)',
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
              background: 'rgba(20, 184, 166, 0.2)',
              border: '1px solid rgba(20, 184, 166, 0.3)',
              borderRadius: '6px',
              color: '#2dd4bf',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
          >
            ← Back
          </button>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#2dd4bf',
            marginBottom: '0.5rem'
          }}>
            Communication & APIs Questions
          </h1>
          <p style={{ color: '#94a3b8' }}>
            {questions.length} questions covering API Design, Message Queues, WebSockets, and Event-Driven Architecture
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
              color: '#5eead4',
              marginBottom: '1rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid rgba(20, 184, 166, 0.3)'
            }}>
              {category}
            </h2>
            {displayQuestions.filter(q => q.category === category).map(q => (
              <div
                key={q.id}
                style={{
                  background: 'rgba(19, 78, 74, 0.8)',
                  borderRadius: '8px',
                  marginBottom: '0.75rem',
                  border: '1px solid rgba(20, 184, 166, 0.2)',
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
                      <CompletionCheckbox problemId={`CommunicationQuestions-${q.id}`} />
                    </div>
                    <span style={{ color: '#e2e8f0', fontWeight: '500' }}>{q.question}</span>
                  </div>
                  <span style={{
                    color: '#2dd4bf',
                    transform: expandedId === q.id ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s'
                  }}>
                    ▼
                  </span>
                </button>
                {expandedId === q.id && (
                  <div style={{
                    padding: '1rem',
                    borderTop: '1px solid rgba(20, 184, 166, 0.2)',
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

export default CommunicationQuestions

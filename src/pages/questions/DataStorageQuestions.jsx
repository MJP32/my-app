import { useState } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function DataStorageQuestions({ onBack, problemLimit }) {
  const [expandedId, setExpandedId] = useState(null)

  const questions = [
    // Database Sharding
    {
      id: 1,
      category: 'Database Sharding',
      question: 'What is database sharding and why is it needed?',
      answer: `**Database Sharding** is horizontal partitioning of data across multiple database instances.

**Why Sharding is Needed:**
1. **Scale beyond single server** - When data exceeds single machine capacity
2. **Improve performance** - Distribute read/write load
3. **Geographic distribution** - Data closer to users
4. **Fault isolation** - Failure affects only one shard

**Sharding Strategies:**

1. **Range-based** - Shard by value ranges (user_id 1-1M, 1M-2M)
2. **Hash-based** - Hash of key determines shard
3. **Directory-based** - Lookup table maps keys to shards
4. **Geographic** - Shard by user location

**Challenges:**
- Cross-shard queries are expensive
- Rebalancing when adding shards
- Maintaining referential integrity
- Increased operational complexity`
    },
    {
      id: 2,
      category: 'Database Sharding',
      question: 'What is the difference between horizontal and vertical partitioning?',
      answer: `**Horizontal Partitioning (Sharding)**
- Split rows across multiple tables/databases
- Each shard has same schema, different data
- Example: Users 1-1M in Shard1, 1M-2M in Shard2

**Vertical Partitioning**
- Split columns across multiple tables
- Each partition has different columns
- Example: User profile in Table1, User activity in Table2

**When to use each:**

| Horizontal | Vertical |
|------------|----------|
| Large row count | Wide tables with many columns |
| Uniform access patterns | Different access patterns per column group |
| Need to scale writes | Some columns accessed more frequently |
| Data naturally partitionable | Separate hot and cold data |

**Combined approach:**
Often use both - vertically partition first (separate concerns), then horizontally shard the high-volume tables.`
    },
    // Database Replication
    {
      id: 3,
      category: 'Database Replication',
      question: 'What are the different types of database replication?',
      answer: `**1. Master-Slave (Primary-Replica)**
- One master handles writes
- Slaves replicate from master, handle reads
- Simple, but master is bottleneck
- Used by: MySQL, PostgreSQL

**2. Master-Master (Multi-Primary)**
- Multiple nodes accept writes
- Bidirectional replication
- Risk of conflicts
- Used by: Galera Cluster, CockroachDB

**3. Synchronous Replication**
- Write waits for all replicas to confirm
- Strong consistency
- Higher latency
- Data durability guaranteed

**4. Asynchronous Replication**
- Write returns immediately
- Replicas updated eventually
- Lower latency
- Risk of data loss on master failure

**5. Semi-Synchronous**
- Wait for at least one replica
- Balance of consistency and performance
- MySQL semi-sync replication`
    },
    {
      id: 4,
      category: 'Database Replication',
      question: 'What is replication lag and how do you handle it?',
      answer: `**Replication Lag** is the delay between a write on primary and its appearance on replicas.

**Causes:**
- Network latency
- Replica under heavy load
- Large transactions
- Disk I/O bottlenecks

**Problems it causes:**
- User writes data, immediate read shows old data
- Inconsistent reads across replicas
- Stale cache invalidation

**Solutions:**

1. **Read-your-writes consistency**
   - Route user's reads to primary after their writes
   - Or track write timestamp, wait for replica to catch up

2. **Monotonic reads**
   - Stick user to same replica
   - Prevents seeing data go "backward"

3. **Synchronous replication for critical data**
   - Accept latency for consistency

4. **Application-level handling**
   - Show "saving..." indicator
   - Optimistic UI updates

5. **Monitor and alert**
   - Track replication lag metrics
   - Alert when lag exceeds threshold`
    },
    // Consistent Hashing
    {
      id: 5,
      category: 'Consistent Hashing',
      question: 'What is consistent hashing and why is it used?',
      answer: `**Consistent Hashing** is a distributed hashing scheme that minimizes remapping when nodes are added/removed.

**Problem with regular hashing:**
- hash(key) % N gives server index
- Adding/removing server changes N
- All keys need to be remapped!

**How Consistent Hashing works:**
1. Hash both servers and keys to a ring (0 to 2^32)
2. Key is assigned to first server clockwise from its position
3. Adding/removing server only affects keys between it and previous server

**Benefits:**
- Only K/N keys remapped when adding/removing node (K=keys, N=nodes)
- Load naturally distributed
- Easy to add/remove nodes

**Virtual Nodes:**
- Each physical server maps to multiple points on ring
- Better load distribution
- Handles heterogeneous server capacities

**Used in:**
- Amazon DynamoDB
- Apache Cassandra
- Memcached
- Content delivery networks`
    },
    {
      id: 6,
      category: 'Consistent Hashing',
      question: 'How do virtual nodes improve consistent hashing?',
      answer: `**Problem without virtual nodes:**
- Servers may be unevenly distributed on ring
- Adding/removing can cause hotspots
- Different server capacities not handled

**Virtual Nodes (vNodes) solution:**
Each physical server maps to multiple positions on the ring.

**Benefits:**

1. **Better load distribution**
   - More points = more uniform distribution
   - Reduces variance in load

2. **Heterogeneous servers**
   - Powerful server: 200 vNodes
   - Weak server: 50 vNodes
   - Load proportional to capacity

3. **Faster rebalancing**
   - When server fails, load distributed to many servers
   - Not just the next server on ring

4. **Gradual migration**
   - Add vNodes one at a time
   - Smooth capacity increase

**Typical configuration:**
- 100-200 vNodes per physical node
- Hash: MD5 or SHA-1 of "server_id:vnode_index"`
    },
    // SQL vs NoSQL
    {
      id: 7,
      category: 'SQL vs NoSQL',
      question: 'When would you choose SQL over NoSQL and vice versa?',
      answer: `**Choose SQL when:**
- Complex queries with JOINs needed
- ACID transactions required
- Data has clear relationships
- Schema is well-defined and stable
- Need strong consistency
- Examples: Financial systems, ERP, CRM

**Choose NoSQL when:**
- Massive scale (millions of ops/sec)
- Flexible/evolving schema
- Simple query patterns (key-value)
- Geographic distribution needed
- High availability over consistency
- Examples: Social media, IoT, real-time analytics

**NoSQL Types:**

| Type | Use Case | Examples |
|------|----------|----------|
| Key-Value | Caching, sessions | Redis, DynamoDB |
| Document | Content management, catalogs | MongoDB, CouchDB |
| Column | Time-series, analytics | Cassandra, HBase |
| Graph | Social networks, recommendations | Neo4j, Neptune |

**Hybrid approach:**
Many systems use both - SQL for transactions, NoSQL for caching/analytics.`
    },
    {
      id: 8,
      category: 'SQL vs NoSQL',
      question: 'What is the difference between ACID and BASE?',
      answer: `**ACID (SQL Databases)**

- **Atomicity**: All or nothing transactions
- **Consistency**: Data always valid state
- **Isolation**: Concurrent transactions don't interfere
- **Durability**: Committed data survives failures

**BASE (NoSQL Databases)**

- **Basically Available**: System always responds
- **Soft state**: State may change over time
- **Eventually consistent**: Will become consistent given time

**Comparison:**

| ACID | BASE |
|------|------|
| Strong consistency | Eventual consistency |
| Pessimistic locking | Optimistic/no locking |
| Vertical scaling | Horizontal scaling |
| Complex queries | Simple queries |
| Lower availability | Higher availability |

**When to use:**
- ACID: Banking, inventory, bookings
- BASE: Social feeds, analytics, caching

**Note:** Many NoSQL databases now offer ACID transactions for single documents or even across documents (MongoDB 4.0+, DynamoDB transactions).`
    },
    // Data Partitioning
    {
      id: 9,
      category: 'Data Partitioning',
      question: 'What are the different data partitioning strategies?',
      answer: `**1. Range Partitioning**
- Partition by value ranges
- Example: Orders by date (Jan, Feb, Mar...)
- Pros: Range queries efficient
- Cons: Hot spots if recent data accessed more

**2. Hash Partitioning**
- Hash function determines partition
- Example: hash(user_id) % num_partitions
- Pros: Even distribution
- Cons: Range queries require all partitions

**3. List Partitioning**
- Explicit mapping of values to partitions
- Example: Countries -> regions
- Pros: Control over data placement
- Cons: Manual maintenance

**4. Composite Partitioning**
- Combine strategies
- Example: Hash by user, then range by date
- Pros: Flexibility
- Cons: Complexity

**5. Directory-Based**
- Lookup service maps keys to partitions
- Pros: Flexible, supports any strategy
- Cons: Directory is single point of failure

**Choosing a strategy:**
- Range: Time-series data, archival
- Hash: User data, even distribution
- List: Geographic, categorical data`
    },
    {
      id: 10,
      category: 'Data Partitioning',
      question: 'How do you handle hot partitions?',
      answer: `**Hot Partition Problem:**
One partition receives disproportionate traffic, causing performance issues.

**Causes:**
- Celebrity user with millions of followers
- Viral content
- Time-based partitioning with recent data
- Poor partition key choice

**Solutions:**

1. **Salting/Suffixing**
   - Add random suffix to hot keys
   - celebrity_123 -> celebrity_123_0, celebrity_123_1
   - Read from multiple partitions, merge results

2. **Adaptive partitioning**
   - Detect hot partitions
   - Split automatically
   - DynamoDB adaptive capacity

3. **Caching layer**
   - Cache hot data in Redis/Memcached
   - Absorb read traffic

4. **Write sharding**
   - Aggregate writes in memory
   - Batch write to database
   - Counter: 10 shards, sum on read

5. **Better partition key**
   - Combine multiple attributes
   - Add timestamp component
   - user_id + date instead of just user_id

6. **Rate limiting**
   - Limit requests per partition
   - Queue excess requests`
    },
    // Blob Storage
    {
      id: 11,
      category: 'Blob Storage',
      question: 'What is blob storage and when should you use it?',
      answer: `**Blob Storage** (Binary Large Object) is optimized for storing unstructured data like images, videos, documents.

**Characteristics:**
- Flat namespace (or simulated hierarchy)
- Object-based (not file/block)
- HTTP/REST API access
- Highly durable (11 9's typically)
- Virtually unlimited scale

**When to use Blob Storage:**
- Images and media files
- Backups and archives
- Static website hosting
- Data lake storage
- Log files
- ML training data

**When NOT to use:**
- Frequently modified files
- Database storage
- Low-latency requirements
- Small files with complex hierarchy

**Popular services:**
- AWS S3
- Azure Blob Storage
- Google Cloud Storage
- MinIO (self-hosted)

**Storage tiers:**
- Hot: Frequent access, higher cost
- Cool: Infrequent access, lower cost
- Archive: Rare access, lowest cost, retrieval delay`
    },
    {
      id: 12,
      category: 'Blob Storage',
      question: 'How do you design a system to handle large file uploads?',
      answer: `**Challenges:**
- Network interruptions
- Timeout limits
- Memory constraints
- Progress tracking

**Solution: Multipart Upload**

1. **Initiate upload**
   - Client requests upload session
   - Server returns upload ID

2. **Upload parts**
   - Split file into chunks (5-100 MB)
   - Upload each chunk with part number
   - Can upload in parallel
   - Retry individual parts on failure

3. **Complete upload**
   - Send list of part numbers and ETags
   - Server assembles final object

**Implementation considerations:**

- **Presigned URLs**: Generate time-limited upload URLs
- **Progress tracking**: Store part status in Redis
- **Resume capability**: Client tracks uploaded parts
- **Checksums**: Verify each part integrity
- **Cleanup**: Delete incomplete uploads after timeout

**Client-side:**
\`\`\`javascript
// Chunk and upload
const chunkSize = 10 * 1024 * 1024; // 10MB
for (let i = 0; i < file.size; i += chunkSize) {
  const chunk = file.slice(i, i + chunkSize);
  await uploadPart(uploadId, partNumber++, chunk);
}
\`\`\``
    }
  ]

  // Filter questions based on problemLimit (for Top 100/300 mode)
  const displayQuestions = problemLimit ? questions.slice(0, problemLimit) : questions

  const categories = [...new Set(displayQuestions.map(q => q.category))]

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e3a5f 0%, #1e1b4b 50%, #1e3a5f 100%)',
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
              background: 'rgba(59, 130, 246, 0.2)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '6px',
              color: '#60a5fa',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
          >
            ← Back
          </button>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#60a5fa',
            marginBottom: '0.5rem'
          }}>
            Data Storage Questions
          </h1>
          <p style={{ color: '#94a3b8' }}>
            {questions.length} questions covering Sharding, Replication, Partitioning, SQL vs NoSQL, and Blob Storage
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
              color: '#93c5fd',
              marginBottom: '1rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
              {category}
            </h2>
            {displayQuestions.filter(q => q.category === category).map(q => (
              <div
                key={q.id}
                style={{
                  background: 'rgba(30, 58, 95, 0.8)',
                  borderRadius: '8px',
                  marginBottom: '0.75rem',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
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
                      <CompletionCheckbox problemId={`DataStorageQuestions-${q.id}`} />
                    </div>
                    <span style={{ color: '#e2e8f0', fontWeight: '500' }}>{q.question}</span>
                  </div>
                  <span style={{
                    color: '#60a5fa',
                    transform: expandedId === q.id ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s'
                  }}>
                    ▼
                  </span>
                </button>
                {expandedId === q.id && (
                  <div style={{
                    padding: '1rem',
                    borderTop: '1px solid rgba(59, 130, 246, 0.2)',
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

export default DataStorageQuestions

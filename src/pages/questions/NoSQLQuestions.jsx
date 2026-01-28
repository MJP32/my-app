import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

function NoSQLQuestions({ onBack, breadcrumb }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const renderFormattedAnswer = (text) => {
    const lines = text.split('\n')
    const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']
    let colorIndex = 0
    const result = []
    let inCodeBlock = false
    let codeLines = []
    let codeLanguage = 'javascript'

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex]

      // Check for code block start/end
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          // Start of code block
          inCodeBlock = true
          codeLanguage = line.trim().substring(3) || 'javascript'
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
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
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
      question: 'What is NoSQL and how does it differ from SQL databases?',
      answer: `**NoSQL Definition:**
- "Not Only SQL" - databases that don't use traditional relational model
- Designed for distributed systems and horizontal scaling
- Schema-flexible or schema-less design
- Optimized for specific data models and access patterns

**Key Differences from SQL:**

| Aspect | SQL (Relational) | NoSQL |
|--------|------------------|-------|
| Schema | Fixed, predefined | Flexible, dynamic |
| Scaling | Vertical (bigger server) | Horizontal (more servers) |
| ACID | Strong ACID guarantees | Eventually consistent (BASE) |
| Joins | Native support | Limited or no joins |
| Data Model | Tables with rows | Documents, key-value, etc. |
| Query Language | SQL | Database-specific |

**Types of NoSQL Databases:**

**1. Document Stores:**
- Store JSON-like documents
- Examples: MongoDB, CouchDB, Firestore
- Use Case: Content management, user profiles

**2. Key-Value Stores:**
- Simple key-value pairs
- Examples: Redis, DynamoDB, Memcached
- Use Case: Caching, session management

**3. Column-Family:**
- Store data in column families
- Examples: Cassandra, HBase, ScyllaDB
- Use Case: Time-series, analytics

**4. Graph Databases:**
- Store nodes and relationships
- Examples: Neo4j, Amazon Neptune
- Use Case: Social networks, recommendations

**When to Use NoSQL:**
- High-volume data with horizontal scaling needs
- Flexible or evolving schema requirements
- Specific access patterns (key-value, document)
- Distributed, globally replicated data
- Real-time applications requiring low latency

**When to Use SQL:**
- Complex queries with multiple joins
- Strong consistency requirements (ACID)
- Well-defined, stable schema
- Complex transactions
- Reporting and analytics`
    },
    {
      id: 2,
      category: 'MongoDB',
      question: 'Explain MongoDB document model and basic CRUD operations',
      answer: `**MongoDB Document Model:**
- Data stored as BSON (Binary JSON) documents
- Documents organized in collections (like tables)
- Collections grouped in databases
- Schema-flexible: documents in same collection can have different fields

**Document Structure:**
\`\`\`javascript
{
    "_id": ObjectId("507f1f77bcf86cd799439011"),
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "address": {
        "city": "New York",
        "zip": "10001"
    },
    "tags": ["developer", "mongodb"]
}
\`\`\`

**CRUD Operations:**

**1. CREATE (Insert):**
\`\`\`javascript
// Insert one document
db.users.insertOne({
    name: "John",
    email: "john@example.com",
    age: 30
});

// Insert multiple documents
db.users.insertMany([
    { name: "Alice", age: 25 },
    { name: "Bob", age: 35 }
]);
\`\`\`

**2. READ (Find):**
\`\`\`javascript
// Find all documents
db.users.find();

// Find with filter
db.users.find({ age: { $gt: 25 } });

// Find one document
db.users.findOne({ email: "john@example.com" });

// Projection (select specific fields)
db.users.find({}, { name: 1, email: 1, _id: 0 });

// Sort and limit
db.users.find().sort({ age: -1 }).limit(10);
\`\`\`

**3. UPDATE:**
\`\`\`javascript
// Update one document
db.users.updateOne(
    { email: "john@example.com" },
    { $set: { age: 31 } }
);

// Update multiple documents
db.users.updateMany(
    { age: { $lt: 30 } },
    { $set: { status: "young" } }
);

// Replace entire document
db.users.replaceOne(
    { email: "john@example.com" },
    { name: "John", email: "john@example.com", age: 31 }
);

// Update operators
$set      // Set field value
$unset    // Remove field
$inc      // Increment value
$push     // Add to array
$pull     // Remove from array
$addToSet // Add unique to array
\`\`\`

**4. DELETE:**
\`\`\`javascript
// Delete one document
db.users.deleteOne({ email: "john@example.com" });

// Delete multiple documents
db.users.deleteMany({ age: { $lt: 18 } });

// Delete all documents in collection
db.users.deleteMany({});
\`\`\`

**Query Operators:**
\`\`\`javascript
// Comparison
$eq, $ne, $gt, $gte, $lt, $lte, $in, $nin

// Logical
$and, $or, $not, $nor

// Example
db.users.find({
    $and: [
        { age: { $gte: 18 } },
        { status: { $in: ["active", "pending"] } }
    ]
});
\`\`\``
    },
    {
      id: 3,
      category: 'MongoDB',
      question: 'What are MongoDB indexes and aggregation pipeline?',
      answer: `**MongoDB Indexes:**
- Data structures that improve query performance
- Trade-off: faster reads, slower writes, more storage

**Index Types:**

**1. Single Field Index:**
\`\`\`javascript
db.users.createIndex({ email: 1 });  // Ascending
db.users.createIndex({ age: -1 });   // Descending
\`\`\`

**2. Compound Index:**
\`\`\`javascript
db.users.createIndex({ lastName: 1, firstName: 1 });
// Order matters! Supports queries on:
// - lastName
// - lastName + firstName
// NOT just firstName
\`\`\`

**3. Unique Index:**
\`\`\`javascript
db.users.createIndex({ email: 1 }, { unique: true });
\`\`\`

**4. Text Index:**
\`\`\`javascript
db.articles.createIndex({ content: "text" });
db.articles.find({ $text: { $search: "mongodb tutorial" } });
\`\`\`

**5. TTL Index (Time To Live):**
\`\`\`javascript
// Auto-delete documents after 1 hour
db.sessions.createIndex(
    { createdAt: 1 },
    { expireAfterSeconds: 3600 }
);
\`\`\`

**Aggregation Pipeline:**
- Process documents through stages
- Each stage transforms the documents
- Powerful for data analysis and reporting

**Common Stages:**

\`\`\`javascript
// $match - Filter documents (like WHERE)
{ $match: { status: "active" } }

// $group - Group by field (like GROUP BY)
{ $group: { _id: "$department", total: { $sum: "$salary" } } }

// $project - Select/transform fields (like SELECT)
{ $project: { name: 1, email: 1, _id: 0 } }

// $sort - Sort documents
{ $sort: { age: -1 } }

// $limit / $skip - Pagination
{ $limit: 10 }
{ $skip: 20 }

// $lookup - Join with another collection
{ $lookup: {
    from: "orders",
    localField: "_id",
    foreignField: "userId",
    as: "userOrders"
}}

// $unwind - Deconstruct array
{ $unwind: "$tags" }
\`\`\`

**Aggregation Example:**
\`\`\`javascript
// Get total sales per product category, sorted by revenue
db.orders.aggregate([
    { $match: { status: "completed" } },
    { $unwind: "$items" },
    { $group: {
        _id: "$items.category",
        totalRevenue: { $sum: "$items.price" },
        count: { $sum: 1 }
    }},
    { $sort: { totalRevenue: -1 } },
    { $limit: 10 },
    { $project: {
        category: "$_id",
        totalRevenue: 1,
        count: 1,
        _id: 0
    }}
]);
\`\`\`

**Index Best Practices:**
- Index fields used in queries, sorts, and joins
- Use compound indexes for multi-field queries
- Monitor slow queries with explain()
- Don't over-index (impacts write performance)
- Use covered queries when possible`
    },
    {
      id: 4,
      category: 'Redis',
      question: 'What is Redis and what are its main data structures?',
      answer: `**What is Redis?**
- In-memory data structure store
- Used as database, cache, message broker
- Extremely fast (sub-millisecond latency)
- Supports persistence (RDB snapshots, AOF logging)
- Single-threaded with event loop

**Redis Data Structures:**

**1. Strings:**
\`\`\`redis
SET user:1:name "John"
GET user:1:name
INCR page:views          # Atomic increment
SETEX session:abc 3600 "data"  # Set with TTL
\`\`\`

**2. Lists (Linked Lists):**
\`\`\`redis
LPUSH queue:tasks "task1"   # Push to left
RPUSH queue:tasks "task2"   # Push to right
LPOP queue:tasks            # Pop from left
LRANGE queue:tasks 0 -1     # Get all elements
\`\`\`
Use Case: Message queues, activity feeds

**3. Sets (Unique Values):**
\`\`\`redis
SADD tags:post:1 "mongodb" "nosql"
SMEMBERS tags:post:1        # Get all members
SISMEMBER tags:post:1 "mongodb"  # Check membership
SINTER tags:post:1 tags:post:2   # Intersection
\`\`\`
Use Case: Tags, unique visitors, followers

**4. Sorted Sets (Ranked):**
\`\`\`redis
ZADD leaderboard 100 "player1"
ZADD leaderboard 200 "player2"
ZRANGE leaderboard 0 -1 WITHSCORES  # Ascending
ZREVRANGE leaderboard 0 9           # Top 10 descending
ZRANK leaderboard "player1"         # Get rank
\`\`\`
Use Case: Leaderboards, priority queues, rate limiting

**5. Hashes (Object-like):**
\`\`\`redis
HSET user:1 name "John" email "john@example.com"
HGET user:1 name
HGETALL user:1
HINCRBY user:1 visits 1
\`\`\`
Use Case: Object storage, counters, user profiles

**6. HyperLogLog (Cardinality Estimation):**
\`\`\`redis
PFADD visitors:today "user1" "user2" "user1"
PFCOUNT visitors:today  # Returns ~2 (unique count)
\`\`\`
Use Case: Unique visitor counting (memory efficient)

**7. Streams (Log-like):**
\`\`\`redis
XADD events * action "click" user "123"
XREAD STREAMS events 0
\`\`\`
Use Case: Event sourcing, message streaming

**Common Use Cases:**

**Caching:**
\`\`\`redis
SET cache:user:1 "{...json...}" EX 3600
GET cache:user:1
\`\`\`

**Session Storage:**
\`\`\`redis
HSET session:abc user_id 1 expires 3600
EXPIRE session:abc 3600
\`\`\`

**Rate Limiting:**
\`\`\`redis
INCR rate:user:1:requests
EXPIRE rate:user:1:requests 60
# Check if > limit
\`\`\`

**Pub/Sub:**
\`\`\`redis
SUBSCRIBE channel:updates
PUBLISH channel:updates "New message!"
\`\`\`

**Redis Persistence:**
- RDB: Point-in-time snapshots
- AOF: Append-only log of operations
- Hybrid: RDB + AOF for best durability`
    },
    {
      id: 5,
      category: 'Cassandra',
      question: 'Explain Apache Cassandra architecture and data modeling',
      answer: `**What is Cassandra?**
- Distributed, wide-column NoSQL database
- Designed for high availability and scalability
- No single point of failure
- Linear scalability (add nodes = more capacity)
- Used by Netflix, Apple, Instagram

**Architecture:**

**Ring Topology:**
- Nodes arranged in a ring
- Data distributed using consistent hashing
- Each node responsible for a range of tokens

**Key Concepts:**

**1. Partition Key:**
- Determines which node stores the data
- Data with same partition key stored together
- Critical for query performance

**2. Clustering Key:**
- Determines sort order within a partition
- Enables range queries within partition

**3. Replication Factor:**
- Number of copies of each partition
- RF=3 means 3 nodes have each partition

**4. Consistency Levels:**
\`\`\`
ONE         - One replica responds
QUORUM      - Majority responds (N/2 + 1)
ALL         - All replicas respond
LOCAL_QUORUM - Quorum in local datacenter
\`\`\`

**Data Model Example:**

\`\`\`cql
-- Create keyspace (database)
CREATE KEYSPACE ecommerce
WITH REPLICATION = {
    'class': 'NetworkTopologyStrategy',
    'datacenter1': 3
};

-- Create table
CREATE TABLE orders (
    customer_id UUID,
    order_date DATE,
    order_id UUID,
    product_name TEXT,
    amount DECIMAL,
    PRIMARY KEY ((customer_id), order_date, order_id)
) WITH CLUSTERING ORDER BY (order_date DESC);
\`\`\`

**Primary Key Breakdown:**
- \`(customer_id)\` - Partition key
- \`order_date, order_id\` - Clustering keys
- Queries: All orders for a customer, sorted by date

**Query Patterns:**
\`\`\`cql
-- Good: Query by partition key
SELECT * FROM orders WHERE customer_id = ?;

-- Good: Query by partition + clustering
SELECT * FROM orders
WHERE customer_id = ?
AND order_date >= '2024-01-01';

-- BAD: Query without partition key
SELECT * FROM orders WHERE order_date = '2024-01-01';
-- Requires ALLOW FILTERING (full table scan!)
\`\`\`

**Data Modeling Rules:**

**1. Query-First Design:**
- Design tables based on queries, not data relationships
- Denormalization is expected

**2. One Table Per Query Pattern:**
\`\`\`cql
-- Query: Get orders by customer
CREATE TABLE orders_by_customer (...);

-- Query: Get orders by product
CREATE TABLE orders_by_product (...);
\`\`\`

**3. Wide Rows:**
- Single partition can have many rows (clustering keys)
- Avoid unbounded growth

**When to Use Cassandra:**
- High write throughput
- Geographically distributed
- Time-series data
- No complex joins needed
- Linear scalability required

**When NOT to Use:**
- Complex transactions (ACID)
- Ad-hoc queries
- Small datasets
- Heavy aggregations`
    },
    {
      id: 6,
      category: 'DynamoDB',
      question: 'What is Amazon DynamoDB and how does it work?',
      answer: `**What is DynamoDB?**
- Fully managed NoSQL database by AWS
- Key-value and document data models
- Single-digit millisecond latency
- Automatic scaling and high availability
- Serverless (no infrastructure to manage)

**Core Concepts:**

**1. Tables:**
- Collection of items (like rows)
- Schema-less (except for keys)

**2. Items:**
- Collection of attributes
- Max size: 400 KB

**3. Attributes:**
- Key-value pairs
- Supports: String, Number, Binary, Boolean, List, Map, Set

**Primary Key Types:**

**Partition Key (Simple):**
\`\`\`
Table: Users
Partition Key: user_id

{ user_id: "123", name: "John", email: "..." }
\`\`\`

**Partition + Sort Key (Composite):**
\`\`\`
Table: Orders
Partition Key: customer_id
Sort Key: order_date

{ customer_id: "123", order_date: "2024-01-15", ... }
\`\`\`

**Secondary Indexes:**

**Global Secondary Index (GSI):**
- Different partition key than table
- Can query data by alternate key
- Eventually consistent

\`\`\`
Base Table: customer_id (PK), order_date (SK)
GSI: product_id (PK), order_date (SK)
\`\`\`

**Local Secondary Index (LSI):**
- Same partition key, different sort key
- Must be created at table creation
- Strongly consistent option

**Capacity Modes:**

**1. Provisioned:**
\`\`\`
Read Capacity Units (RCU): 1 RCU = 1 strongly consistent read/sec (4KB)
Write Capacity Units (WCU): 1 WCU = 1 write/sec (1KB)
\`\`\`

**2. On-Demand:**
- Pay per request
- Auto-scales instantly
- Good for unpredictable workloads

**Operations:**

\`\`\`python
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Users')

# Put Item
table.put_item(Item={
    'user_id': '123',
    'name': 'John',
    'email': 'john@example.com'
})

# Get Item
response = table.get_item(Key={'user_id': '123'})
item = response['Item']

# Query (partition key required)
response = table.query(
    KeyConditionExpression=Key('customer_id').eq('123')
)

# Scan (full table - expensive!)
response = table.scan(
    FilterExpression=Attr('age').gt(25)
)

# Update Item
table.update_item(
    Key={'user_id': '123'},
    UpdateExpression='SET age = :val',
    ExpressionAttributeValues={':val': 31}
)

# Delete Item
table.delete_item(Key={'user_id': '123'})
\`\`\`

**Best Practices:**

**1. Design for Queries:**
- Know your access patterns first
- Use composite keys for range queries

**2. Avoid Hot Partitions:**
- Distribute writes across partitions
- Add randomness to partition keys if needed

**3. Use Sparse Indexes:**
- GSI only indexes items with the attribute
- Don't index everything

**4. Batch Operations:**
\`\`\`python
# Batch write (up to 25 items)
with table.batch_writer() as batch:
    for item in items:
        batch.put_item(Item=item)
\`\`\`

**DynamoDB Streams:**
- Capture item-level changes
- Trigger Lambda functions
- Enable event-driven architectures`
    },
    {
      id: 7,
      category: 'CAP Theorem',
      question: 'Explain CAP Theorem and BASE properties',
      answer: `**CAP Theorem:**
States that a distributed system can only guarantee 2 out of 3 properties:

**C - Consistency:**
- All nodes see the same data at the same time
- Every read receives the most recent write
- Like ACID consistency but distributed

**A - Availability:**
- Every request receives a response
- System remains operational
- No timeouts or errors

**P - Partition Tolerance:**
- System continues despite network failures
- Nodes can't communicate but system works
- Required for distributed systems

**Why Only 2 of 3?**

During a network partition:
- If you choose Consistency: Some nodes can't respond (lose Availability)
- If you choose Availability: Nodes may have different data (lose Consistency)

**Database Classifications:**

**CP (Consistency + Partition Tolerance):**
- MongoDB (with majority write concern)
- HBase
- Redis (single master)
- Behavior: Refuses requests during partition to maintain consistency

**AP (Availability + Partition Tolerance):**
- Cassandra
- DynamoDB
- CouchDB
- Behavior: Allows reads/writes during partition, eventual consistency

**CA (Consistency + Availability):**
- Traditional RDBMS (single node)
- Not practical for distributed systems
- Can't handle network partitions

**BASE Properties:**
Alternative to ACID for distributed systems

**BA - Basically Available:**
- System appears to work most of the time
- May return stale data
- Partial failures acceptable

**S - Soft State:**
- State may change over time
- Without input, due to eventual consistency
- No guarantee of consistency at any point

**E - Eventually Consistent:**
- System will become consistent over time
- Given no new updates
- All replicas converge

**ACID vs BASE:**

| ACID | BASE |
|------|------|
| Strong consistency | Eventual consistency |
| Isolation | Availability first |
| Focus on commit | Best effort |
| Conservative | Optimistic |
| Simple queries | Complex to reason about |

**Consistency Levels Example (Cassandra):**

\`\`\`
Write with ONE, Read with ONE:
  - Fastest
  - Risk of reading stale data

Write with QUORUM, Read with QUORUM:
  - Strong consistency (R + W > N)
  - Good balance

Write with ALL, Read with ONE:
  - Strong consistency for reads
  - Slow writes, any failure = failure
\`\`\`

**Practical Implications:**

**Choose CP when:**
- Financial transactions
- Inventory management
- User authentication

**Choose AP when:**
- Social media feeds
- Product catalog
- Analytics data

**Real-World Tradeoffs:**
- Netflix: AP for availability (show cached content)
- Banks: CP for transactions (block rather than corrupt)
- E-commerce: Hybrid (CP for orders, AP for recommendations)`
    },
    {
      id: 8,
      category: 'Comparison',
      question: 'When should you choose NoSQL over SQL databases?',
      answer: `**Choose NoSQL When:**

**1. Scalability Requirements:**
- Need horizontal scaling (add more servers)
- Data volume in terabytes/petabytes
- High write throughput (millions of writes/sec)
- Global distribution across regions

**Example:**
\`\`\`
Social media platform:
- 500M users
- 10M posts/day
- Global presence
→ Cassandra or DynamoDB
\`\`\`

**2. Flexible Schema:**
- Data structure evolves frequently
- Different entities have different attributes
- Prototyping or rapid development
- Storing JSON documents

**Example:**
\`\`\`
E-commerce products:
- Electronics: brand, specs, warranty
- Clothing: size, color, material
- Books: author, ISBN, pages
→ MongoDB (flexible document schema)
\`\`\`

**3. Specific Data Models:**
- Key-value access patterns (caching)
- Document-oriented data
- Graph relationships
- Time-series data

**Example:**
\`\`\`
Recommendation engine:
- Users follow users
- Users like products
- Products in categories
→ Neo4j (graph database)
\`\`\`

**4. High Availability:**
- 99.99%+ uptime required
- No single point of failure
- Eventual consistency acceptable

**Choose SQL When:**

**1. Complex Queries:**
- Multiple JOINs required
- Complex aggregations
- Ad-hoc reporting
- Business intelligence

**Example:**
\`\`\`
Sales reporting:
- Revenue by region, product, time
- Customer segmentation
- Trend analysis
→ PostgreSQL with proper indexing
\`\`\`

**2. ACID Transactions:**
- Financial operations
- Inventory management
- Booking systems
- Strong consistency required

**Example:**
\`\`\`
Banking system:
- Transfer money between accounts
- Atomic: both debit and credit must succeed
→ PostgreSQL or MySQL
\`\`\`

**3. Structured Data:**
- Well-defined relationships
- Stable schema
- Data integrity constraints
- Foreign key relationships

**4. Smaller Scale:**
- Single server sufficient
- < 1TB data
- Moderate read/write load

**Hybrid Approach (Polyglot Persistence):**

Many systems use multiple databases:

\`\`\`
E-commerce Platform:
├── PostgreSQL    → Orders, transactions (ACID)
├── MongoDB       → Product catalog (flexible schema)
├── Redis         → Session cache, shopping cart
├── Elasticsearch → Product search
└── Cassandra     → User activity logs
\`\`\`

**Decision Matrix:**

| Requirement | SQL | NoSQL |
|-------------|-----|-------|
| Complex queries | ✓ | ✗ |
| Transactions | ✓ | Limited |
| Scalability | Vertical | Horizontal |
| Schema flexibility | ✗ | ✓ |
| Consistency | Strong | Eventual |
| Joins | Native | Limited |
| Learning curve | Lower | Varies |

**Common Mistakes:**

**1. Using NoSQL for everything:**
- Not all data needs to scale
- Losing ACID guarantees unnecessarily

**2. Using SQL when it doesn't fit:**
- Fighting against schema for variable data
- Scaling vertically when horizontal needed

**3. Ignoring query patterns:**
- NoSQL requires knowing queries upfront
- SQL more flexible for ad-hoc queries

**Best Practice:**
- Start with SQL unless you have specific needs for NoSQL
- NoSQL adds complexity (eventual consistency, denormalization)
- Choose based on actual requirements, not hype`
    }
  ]

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Fundamentals': '#10b981',
      'MongoDB': '#4ade80',
      'Redis': '#ef4444',
      'Cassandra': '#f59e0b',
      'DynamoDB': '#3b82f6',
      'CAP Theorem': '#8b5cf6',
      'Comparison': '#ec4899'
    }
    return colors[category] || '#6b7280'
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #064e3b, #111827)', minHeight: '100vh' }}>
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
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
        >
          ← Back to Questions
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#6ee7b7',
          margin: 0
        }}>
          NoSQL Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'left',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Essential NoSQL interview questions covering MongoDB, Redis, Cassandra, DynamoDB, and CAP theorem.
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
              <div style={{
                fontSize: '1.5rem',
                color: getCategoryColor(q.category),
                fontWeight: 'bold',
                marginLeft: '1rem',
                transform: expandedQuestion === q.id ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}>
                ▼
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
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        borderRadius: '12px',
        border: '2px solid #10b981'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#6ee7b7', marginBottom: '0.5rem' }}>
          NoSQL Interview Tips
        </h3>
        <ul style={{ color: '#d1d5db', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Know the CAP theorem and be able to explain trade-offs</li>
          <li>Understand when to use document, key-value, column-family, or graph databases</li>
          <li>Be familiar with at least one NoSQL database in depth (MongoDB or Redis)</li>
          <li>Know how to design data models for specific query patterns</li>
          <li>Understand eventual consistency and its implications</li>
        </ul>
      </div>
    </div>
  )
}

export default NoSQLQuestions

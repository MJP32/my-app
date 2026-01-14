import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function KafkaQuestions({ onBack, breadcrumb }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  // Helper function to render formatted text with colors for bold sections
  const renderFormattedAnswer = (text) => {
    const lines = text.split('\n')
    const colors = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#ea580c', '#0891b2']
    let colorIndex = 0

    return lines.map((line, lineIndex) => {
      // Check if line starts with ** (bold section header)
      const boldMatch = line.match(/^\*\*(.+?):\*\*/)
      if (boldMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        return (
          <div key={lineIndex} style={{ marginTop: lineIndex > 0 ? '1rem' : 0 }}>
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.05rem'
            }}>
              {boldMatch[1]}:
            </span>
            {line.substring(boldMatch[0].length)}
          </div>
        )
      }

      // Check for numbered sections like **1. Title:**
      const numberedMatch = line.match(/^\*\*(\d+\.\s+.+?):\*\*/)
      if (numberedMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        return (
          <div key={lineIndex} style={{ marginTop: lineIndex > 0 ? '1rem' : 0 }}>
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.05rem'
            }}>
              {numberedMatch[1]}:
            </span>
            {line.substring(numberedMatch[0].length)}
          </div>
        )
      }

      // Regular line
      return <div key={lineIndex}>{line}</div>
    })
  }

  const questions = [
    {
      id: 1,
      category: 'Core Concepts',
      question: 'What is Apache Kafka and what are its key components?',
      answer: `**What is Apache Kafka?**
- Distributed event streaming platform
- Publish-subscribe messaging system
- High-throughput, fault-tolerant, scalable
- Used for real-time data pipelines and streaming applications

**Key Components:**

**1. Topic:**
- Category or feed name to which records are published
- Multi-subscriber - can have many consumers
- Partitioned for scalability

**2. Partition:**
- Topic is split into ordered, immutable sequences
- Each partition hosted on different brokers
- Enables parallelism and scalability

**3. Broker:**
- Kafka server that stores data
- Each broker handles read/write requests
- Cluster can have multiple brokers

**4. Producer:**
- Publishes records to topics
- Chooses which partition to send data to

\`\`\`java
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

Producer<String, String> producer = new KafkaProducer<>(props);
producer.send(new ProducerRecord<>("topic-name", "key", "value"));
producer.close();
\`\`\`

**5. Consumer:**
- Reads records from topics
- Part of consumer group for load balancing

\`\`\`java
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("group.id", "test-group");
props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");

KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
consumer.subscribe(Arrays.asList("topic-name"));

while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
    for (ConsumerRecord<String, String> record : records) {
        System.out.println(record.value());
    }
}
\`\`\`

**6. ZooKeeper (being phased out):**
- Manages and coordinates Kafka brokers
- Maintains metadata
- Leader election for partitions

**7. Consumer Group:**
- Group of consumers working together
- Each partition consumed by only one consumer in group
- Enables load balancing

**Key Features:**
- High throughput (millions of messages/second)
- Low latency (< 10ms)
- Fault tolerant (replication)
- Durable (persistent storage)
- Scalable (horizontal scaling)`
    },
    {
      id: 2,
      category: 'Partitions',
      question: 'Explain Kafka Partitions and how they provide scalability',
      answer: `**What are Partitions?**
- Topic divided into ordered, immutable sequences
- Each partition is an ordered log of records
- Records within partition are ordered by offset
- Different partitions can be on different brokers

**Partition Structure:**
\`\`\`
Topic: orders
├── Partition 0: [msg0, msg1, msg2, msg3, ...]
├── Partition 1: [msg0, msg1, msg2, msg3, ...]
└── Partition 2: [msg0, msg1, msg2, msg3, ...]
\`\`\`

**How Partitioning Works:**

**1. Producer sends message:**
\`\`\`java
// Option 1: Kafka chooses partition (round-robin)
producer.send(new ProducerRecord<>("orders", value));

// Option 2: Specify partition number
producer.send(new ProducerRecord<>("orders", 2, key, value));

// Option 3: Use key for partition (hash-based)
producer.send(new ProducerRecord<>("orders", "user-123", value));
// All messages with same key go to same partition
\`\`\`

**2. Partition Selection:**
\`\`\`
partition = hash(key) % number_of_partitions

Example:
key="user-123" → hash=456 → 456 % 3 = 0 → Partition 0
key="user-789" → hash=123 → 123 % 3 = 0 → Partition 0
key="user-456" → hash=789 → 789 % 3 = 1 → Partition 1
\`\`\`

**Scalability Benefits:**

**1. Parallel Processing:**
- Multiple consumers read from different partitions simultaneously
- Each partition handled by one consumer in group

\`\`\`
Consumer Group: order-processors
├── Consumer 1 → reads Partition 0
├── Consumer 2 → reads Partition 1
└── Consumer 3 → reads Partition 2

Throughput = 3x (compared to single partition)
\`\`\`

**2. Storage Distribution:**
- Partitions distributed across brokers
- No single broker overload

\`\`\`
Broker 1: Partition 0, Partition 3
Broker 2: Partition 1, Partition 4
Broker 3: Partition 2, Partition 5
\`\`\`

**3. Ordering Guarantee:**
- **Within partition:** Strict ordering guaranteed
- **Across partitions:** No ordering guarantee

\`\`\`java
// To maintain order: use same key for related messages
producer.send(new ProducerRecord<>("orders", "user-123", "order-1"));
producer.send(new ProducerRecord<>("orders", "user-123", "order-2"));
// Both go to same partition → ordered
\`\`\`

**Replication:**
- Each partition has leader and followers (replicas)
- Leader handles all read/write
- Followers replicate data for fault tolerance

\`\`\`
Partition 0:
├── Leader (Broker 1)
├── Follower (Broker 2)
└── Follower (Broker 3)

If Broker 1 fails → Broker 2 or 3 becomes leader
\`\`\`

**Best Practices:**

**Choosing Number of Partitions:**
\`\`\`
partitions >= max(
    target_throughput / producer_throughput_per_partition,
    target_throughput / consumer_throughput_per_partition,
    number_of_consumers
)
\`\`\`

**Example:**
- Target: 100 MB/s
- Producer throughput per partition: 10 MB/s
- Consumer throughput per partition: 20 MB/s
- Partitions needed: 100/10 = 10

**Partition Key Selection:**
- Use keys that evenly distribute data
- Bad: timestamp (creates hot partitions)
- Good: user_id, order_id (even distribution)

**Partition Count Considerations:**
- More partitions = more parallelism
- More partitions = more overhead (file handles, memory)
- Typical: 10-100 partitions per topic
- Can't easily decrease partitions (only increase)`
    },
    {
      id: 3,
      category: 'Consumer Groups',
      question: 'Explain Consumer Groups and offset management',
      answer: `**Consumer Groups:**
- Logical grouping of consumers
- Each partition consumed by only one consumer in group
- Enables load balancing and fault tolerance

**How Consumer Groups Work:**

**Scenario 1: Consumers < Partitions**
\`\`\`
Topic: 4 partitions
Consumer Group: 2 consumers

Consumer 1 → Partition 0, Partition 1
Consumer 2 → Partition 2, Partition 3
\`\`\`

**Scenario 2: Consumers = Partitions (Ideal)**
\`\`\`
Topic: 4 partitions
Consumer Group: 4 consumers

Consumer 1 → Partition 0
Consumer 2 → Partition 1
Consumer 3 → Partition 2
Consumer 4 → Partition 3
\`\`\`

**Scenario 3: Consumers > Partitions**
\`\`\`
Topic: 4 partitions
Consumer Group: 6 consumers

Consumer 1 → Partition 0
Consumer 2 → Partition 1
Consumer 3 → Partition 2
Consumer 4 → Partition 3
Consumer 5 → Idle (no partition)
Consumer 6 → Idle (no partition)
\`\`\`

**Offset Management:**

**What is Offset?**
- Sequential ID of each record in partition
- Unique within partition, not across partitions
- Used to track consumer position

\`\`\`
Partition 0:
offset 0: message A
offset 1: message B
offset 2: message C
offset 3: message D  ← current consumer position
offset 4: message E
offset 5: message F
\`\`\`

**Committing Offsets:**

**1. Auto Commit (Default):**
\`\`\`java
props.put("enable.auto.commit", "true");
props.put("auto.commit.interval.ms", "5000");

// Offset committed automatically every 5 seconds
while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
    for (ConsumerRecord<String, String> record : records) {
        processRecord(record);
        // Offset auto-committed in background
    }
}
\`\`\`

**Problem:** Can lose messages if crash before auto-commit

**2. Manual Commit (Recommended):**
\`\`\`java
props.put("enable.auto.commit", "false");

while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
    for (ConsumerRecord<String, String> record : records) {
        processRecord(record);
    }
    consumer.commitSync();  // Commit after processing
}
\`\`\`

**3. Async Commit:**
\`\`\`java
consumer.commitAsync((offsets, exception) -> {
    if (exception != null) {
        System.err.println("Commit failed: " + exception);
    }
});
\`\`\`

**Rebalancing:**
- Occurs when consumer joins/leaves group
- Partitions reassigned among available consumers

**Rebalance Triggers:**
- Consumer added to group
- Consumer removed (crash or shutdown)
- New partitions added to topic

**Example:**
\`\`\`
Initial:
Consumer 1 → Partition 0, Partition 1
Consumer 2 → Partition 2, Partition 3

Consumer 3 joins:
Consumer 1 → Partition 0
Consumer 2 → Partition 1
Consumer 3 → Partition 2
(Partition 3 unassigned if only 3 partitions)
\`\`\`

**Handling Rebalance:**
\`\`\`java
consumer.subscribe(Arrays.asList("orders"), new ConsumerRebalanceListener() {
    @Override
    public void onPartitionsRevoked(Collection<TopicPartition> partitions) {
        // Commit offsets before rebalance
        consumer.commitSync();
    }

    @Override
    public void onPartitionsAssigned(Collection<TopicPartition> partitions) {
        // Initialize new partitions
    }
});
\`\`\`

**Seeking to Specific Offset:**
\`\`\`java
// Seek to beginning
consumer.seekToBeginning(consumer.assignment());

// Seek to end
consumer.seekToEnd(consumer.assignment());

// Seek to specific offset
TopicPartition partition = new TopicPartition("orders", 0);
consumer.seek(partition, 100);  // Start from offset 100
\`\`\`

**Best Practices:**
- Number of consumers ≤ number of partitions
- Use manual offset commit for critical data
- Handle rebalance gracefully
- Use unique group.id per application
- Monitor consumer lag`
    },
    {
      id: 4,
      category: 'Producer',
      question: 'Explain Producer Acknowledgments (acks) and their impact',
      answer: `**Producer Acknowledgments (acks):**
- Controls how many brokers must acknowledge write before success
- Trade-off between durability and performance

**Three Levels:**

**acks=0 (Fire and Forget):**
- Producer doesn't wait for any acknowledgment
- Highest throughput, lowest durability
- Message can be lost

\`\`\`java
props.put("acks", "0");

producer.send(new ProducerRecord<>("orders", "message"));
// Returns immediately, doesn't wait for broker
\`\`\`

**Use Case:**
- Log aggregation
- Metrics collection
- Non-critical data
- When throughput > reliability

**Characteristics:**
- Throughput: ⭐⭐⭐⭐⭐ (Highest)
- Durability: ⭐ (Lowest)
- Latency: Lowest

**acks=1 (Leader Acknowledgment):**
- Producer waits for leader to write to local log
- Doesn't wait for replicas
- Balance between performance and durability

\`\`\`java
props.put("acks", "1");

producer.send(new ProducerRecord<>("orders", "message"));
// Returns after leader writes, before replication
\`\`\`

**Risk:** If leader crashes before replication, message lost

**Use Case:**
- Most common setting
- Acceptable for many applications
- Good balance

**Characteristics:**
- Throughput: ⭐⭐⭐⭐ (High)
- Durability: ⭐⭐⭐ (Medium)
- Latency: Medium

**acks=all or acks=-1 (All In-Sync Replicas):**
- Producer waits for leader AND all in-sync replicas
- Highest durability, lowest throughput
- No data loss (if min.insync.replicas configured)

\`\`\`java
props.put("acks", "all");
props.put("min.insync.replicas", "2");

producer.send(new ProducerRecord<>("orders", "message"));
// Returns after leader + all ISR write
\`\`\`

**Use Case:**
- Financial transactions
- Critical business data
- When data loss unacceptable

**Characteristics:**
- Throughput: ⭐⭐ (Lower)
- Durability: ⭐⭐⭐⭐⭐ (Highest)
- Latency: Highest

**min.insync.replicas:**
- Minimum replicas that must acknowledge
- Works with acks=all

\`\`\`
replication.factor=3
min.insync.replicas=2

Must have at least 2 replicas available
If only 1 replica available → producer fails
\`\`\`

**Comparison:**

| Setting | Latency | Throughput | Durability | Data Loss Risk |
|---------|---------|------------|------------|----------------|
| acks=0 | Lowest | Highest | Lowest | High |
| acks=1 | Medium | High | Medium | Medium |
| acks=all | Highest | Lower | Highest | Minimal |

**Idempotent Producer:**
- Prevents duplicate messages on retry
- Automatically sets acks=all

\`\`\`java
props.put("enable.idempotence", "true");
// Automatically sets:
// acks=all
// retries=Integer.MAX_VALUE
// max.in.flight.requests.per.connection=5
\`\`\`

**Retries:**
\`\`\`java
props.put("retries", "3");  // Retry 3 times on failure
props.put("retry.backoff.ms", "100");  // Wait 100ms between retries
\`\`\`

**Complete Producer Configuration:**
\`\`\`java
Properties props = new Properties();

// Basic config
props.put("bootstrap.servers", "localhost:9092");
props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

// Durability (critical data)
props.put("acks", "all");
props.put("enable.idempotence", "true");
props.put("retries", Integer.MAX_VALUE);

// Performance (high throughput)
props.put("batch.size", 16384);  // 16KB batch
props.put("linger.ms", 10);  // Wait 10ms to batch
props.put("compression.type", "snappy");  // Compress messages

// Monitoring
props.put("request.timeout.ms", 30000);
\`\`\`

**Best Practices:**

**For Critical Data:**
\`\`\`
acks=all
min.insync.replicas=2
enable.idempotence=true
replication.factor=3
\`\`\`

**For High Throughput:**
\`\`\`
acks=1
batch.size=65536
linger.ms=20
compression.type=lz4
\`\`\``
    },
    {
      id: 5,
      category: 'Performance',
      question: 'How do you optimize Kafka performance for high throughput?',
      answer: `**Producer Optimization:**

**1. Batching:**
\`\`\`java
props.put("batch.size", 65536);  // 64KB (default: 16KB)
props.put("linger.ms", 20);  // Wait 20ms to accumulate batch

// Larger batch = fewer requests = higher throughput
// Trade-off: slightly higher latency
\`\`\`

**2. Compression:**
\`\`\`java
props.put("compression.type", "lz4");  // or snappy, gzip

// Compression comparison:
// lz4: Fast, good compression
// snappy: Very fast, moderate compression
// gzip: Slower, best compression
\`\`\`

**3. Parallel Producers:**
\`\`\`java
// Create multiple producer instances
ExecutorService executor = Executors.newFixedThreadPool(10);
for (int i = 0; i < 10; i++) {
    executor.submit(() -> {
        Producer<String, String> producer = new KafkaProducer<>(props);
        // Send messages
    });
}
\`\`\`

**4. Async Send:**
\`\`\`java
// Async (non-blocking)
producer.send(record, (metadata, exception) -> {
    if (exception != null) {
        System.err.println("Send failed: " + exception);
    }
});

// vs Sync (blocking)
producer.send(record).get();  // Waits for acknowledgment
\`\`\`

**5. Partitioning Strategy:**
\`\`\`java
// Custom partitioner for even distribution
public class CustomPartitioner implements Partitioner {
    @Override
    public int partition(String topic, Object key, byte[] keyBytes,
                        Object value, byte[] valueBytes, Cluster cluster) {
        // Implement custom logic
        return Math.abs(key.hashCode()) % cluster.partitionCountForTopic(topic);
    }
}

props.put("partitioner.class", CustomPartitioner.class.getName());
\`\`\`

**Consumer Optimization:**

**1. Parallel Consumers:**
\`\`\`
partitions=10
consumers=10 (one per partition)

Throughput = 10x single consumer
\`\`\`

**2. Fetch Size:**
\`\`\`java
props.put("fetch.min.bytes", 1024);  // Wait for at least 1KB
props.put("fetch.max.wait.ms", 500);  // Or wait max 500ms
props.put("max.partition.fetch.bytes", 1048576);  // 1MB per partition
\`\`\`

**3. Prefetching:**
\`\`\`java
props.put("max.poll.records", 500);  // Fetch 500 records at once

while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
    // Process 500 records in batch
    for (ConsumerRecord<String, String> record : records) {
        processRecord(record);
    }
}
\`\`\`

**4. Multi-threaded Processing:**
\`\`\`java
ExecutorService executor = Executors.newFixedThreadPool(10);

while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
    for (ConsumerRecord<String, String> record : records) {
        executor.submit(() -> processRecord(record));
    }
    consumer.commitSync();
}
\`\`\`

**Broker Optimization:**

**1. Increase Partitions:**
\`\`\`bash
# More partitions = more parallelism
kafka-topics --create --topic orders --partitions 20 --replication-factor 3
\`\`\`

**2. Disk Configuration:**
\`\`\`properties
# Use separate disks for logs
log.dirs=/disk1/kafka,/disk2/kafka,/disk3/kafka

# Increase log segment size
log.segment.bytes=1073741824  # 1GB

# Flush settings
log.flush.interval.messages=10000
log.flush.interval.ms=1000
\`\`\`

**3. Network Configuration:**
\`\`\`properties
# Increase socket buffer
socket.send.buffer.bytes=1048576  # 1MB
socket.receive.buffer.bytes=1048576  # 1MB
socket.request.max.bytes=104857600  # 100MB
\`\`\`

**4. Memory Settings:**
\`\`\`bash
# Increase JVM heap
export KAFKA_HEAP_OPTS="-Xmx4G -Xms4G"

# Page cache (OS manages)
# Keep Kafka heap small, let OS use RAM for page cache
\`\`\`

**Monitoring & Tuning:**

**Key Metrics:**
\`\`\`
Producer:
- record-send-rate
- request-latency-avg
- compression-rate-avg

Consumer:
- records-consumed-rate
- fetch-latency-avg
- records-lag-max

Broker:
- MessagesInPerSec
- BytesInPerSec
- BytesOutPerSec
- RequestsPerSec
\`\`\`

**Benchmarking:**
\`\`\`bash
# Producer test
kafka-producer-perf-test \\
  --topic test \\
  --num-records 1000000 \\
  --record-size 1024 \\
  --throughput -1 \\
  --producer-props bootstrap.servers=localhost:9092

# Consumer test
kafka-consumer-perf-test \\
  --topic test \\
  --messages 1000000 \\
  --threads 4 \\
  --bootstrap-server localhost:9092
\`\`\`

**Best Configuration for High Throughput:**

**Producer:**
\`\`\`java
acks=1  // Not all (for throughput)
batch.size=65536
linger.ms=20
compression.type=lz4
buffer.memory=67108864  // 64MB
max.in.flight.requests.per.connection=5
\`\`\`

**Consumer:**
\`\`\`java
fetch.min.bytes=50000
max.poll.records=500
max.partition.fetch.bytes=1048576
\`\`\`

**Typical Throughput:**
- Single producer: 50-100 MB/s per partition
- Single consumer: 80-150 MB/s per partition
- With optimization: 500+ MB/s per broker`
    }
  ]

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Core Concepts': '#ef4444',
      'Partitions': '#f59e0b',
      'Consumer Groups': '#10b981',
      'Producer': '#3b82f6',
      'Performance': '#ec4899'
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
          Kafka Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'center',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Master Apache Kafka concepts including partitions, consumer groups, and performance optimization.
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
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderRadius: '12px',
        border: '2px solid #6366f1'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#a5b4fc', marginBottom: '0.5rem' }}>
          Kafka Interview Tips
        </h3>
        <ul style={{ color: '#d1d5db', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Understand partitions and how they enable scalability</li>
          <li>Know the difference between acks=0, acks=1, and acks=all</li>
          <li>Explain consumer groups and rebalancing</li>
          <li>Be familiar with offset management strategies</li>
          <li>Understand trade-offs between throughput and durability</li>
        </ul>
      </div>
    </div>
  )
}

export default KafkaQuestions

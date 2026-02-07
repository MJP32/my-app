import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function KafkaQuestions({ onBack, breadcrumb, problemLimit }) {
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
    },
    {
      id: 6,
      category: 'Consumer Groups',
      question: 'How do Kafka Consumer Groups work and what is rebalancing?',
      answer: `**Consumer Groups:**
- Logical group of consumers that work together to consume a topic
- Each partition assigned to exactly one consumer in the group
- Enables load balancing and fault tolerance

**Consumer Group Coordination:**
\`\`\`java
Properties props = new Properties();
props.put("group.id", "order-processors");  // Same group ID
props.put("bootstrap.servers", "localhost:9092");

// Consumer 1
KafkaConsumer<String, String> consumer1 = new KafkaConsumer<>(props);
consumer1.subscribe(Arrays.asList("orders"));  // Gets partitions 0,1

// Consumer 2 (same group)
KafkaConsumer<String, String> consumer2 = new KafkaConsumer<>(props);
consumer2.subscribe(Arrays.asList("orders"));  // Gets partitions 2,3
\`\`\`

**Partition Assignment:**
\`\`\`
Topic: orders (4 partitions)
Consumer Group: order-processors

Scenario 1: 2 consumers, 4 partitions
├── Consumer 1: Partition 0, Partition 1
└── Consumer 2: Partition 2, Partition 3

Scenario 2: 4 consumers, 4 partitions
├── Consumer 1: Partition 0
├── Consumer 2: Partition 1
├── Consumer 3: Partition 2
└── Consumer 4: Partition 3

Scenario 3: 5 consumers, 4 partitions
├── Consumer 1: Partition 0
├── Consumer 2: Partition 1
├── Consumer 3: Partition 2
├── Consumer 4: Partition 3
└── Consumer 5: (idle - no partitions)
\`\`\`

**Rebalancing:**

**What triggers rebalancing?**
1. New consumer joins the group
2. Consumer leaves (shutdown or failure)
3. Number of partitions changes
4. Consumer exceeds max.poll.interval.ms

**Rebalancing Process:**
\`\`\`
1. Consumer stops fetching → commits offsets
2. All consumers give up partitions
3. Group coordinator reassigns partitions
4. Consumers resume with new assignments
\`\`\`

**Rebalancing Strategies:**

**1. Range Assignor (default):**
\`\`\`java
props.put("partition.assignment.strategy", "RangeAssignor");

// Assigns partitions sequentially
Topic1: P0,P1,P2,P3
├── C1: P0,P1
└── C2: P2,P3
\`\`\`

**2. Round Robin:**
\`\`\`java
props.put("partition.assignment.strategy", "RoundRobinAssignor");

// Distributes evenly across all topics
Topic1: P0,P1,P2,P3
Topic2: P0,P1
├── C1: T1-P0, T1-P2, T2-P0
└── C2: T1-P1, T1-P3, T2-P1
\`\`\`

**3. Sticky Assignor:**
\`\`\`java
props.put("partition.assignment.strategy", "StickyAssignor");

// Minimizes partition movement during rebalance
// Keeps as many existing assignments as possible
\`\`\`

**4. Cooperative Sticky (Incremental):**
\`\`\`java
props.put("partition.assignment.strategy", "CooperativeStickyAssignor");

// Only reassigns affected partitions
// Other consumers keep consuming during rebalance
\`\`\`

**Avoiding Rebalance Issues:**

**1. Configure timeouts properly:**
\`\`\`java
// How long consumer can go without polling before being removed
props.put("max.poll.interval.ms", "300000");  // 5 minutes

// Heartbeat interval (should be 1/3 of session timeout)
props.put("heartbeat.interval.ms", "3000");

// Session timeout
props.put("session.timeout.ms", "10000");
\`\`\`

**2. Process quickly:**
\`\`\`java
while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));

    // Process quickly to avoid exceeding max.poll.interval.ms
    for (ConsumerRecord<String, String> record : records) {
        processQuickly(record);  // Don't do slow operations here
    }

    consumer.commitSync();  // Commit before next poll
}
\`\`\`

**3. Static Membership (Kafka 2.3+):**
\`\`\`java
// Assign static member ID to avoid rebalance on restart
props.put("group.instance.id", "consumer-1");

// Consumer restart won't trigger rebalance
// Partitions wait for consumer to rejoin (up to session.timeout.ms)
\`\`\`

**Monitoring Rebalances:**
\`\`\`java
consumer.subscribe(Arrays.asList("orders"), new ConsumerRebalanceListener() {
    @Override
    public void onPartitionsRevoked(Collection<TopicPartition> partitions) {
        System.out.println("Partitions revoked: " + partitions);
        // Commit offsets before losing partitions
        consumer.commitSync();
    }

    @Override
    public void onPartitionsAssigned(Collection<TopicPartition> partitions) {
        System.out.println("Partitions assigned: " + partitions);
        // Can seek to specific offsets here
    }
});
\`\`\``
    },
    {
      id: 7,
      category: 'Delivery Semantics',
      question: 'Explain Kafka delivery guarantees: at-most-once, at-least-once, and exactly-once',
      answer: `**Kafka Delivery Semantics:**

**1. At-Most-Once (messages may be lost, never duplicated):**

**Producer:**
\`\`\`java
props.put("acks", "0");  // Don't wait for acknowledgment

producer.send(record);  // Fire and forget
// If send fails, message is lost
\`\`\`

**Consumer:**
\`\`\`java
// Commit offset BEFORE processing
consumer.commitSync();
ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
processRecords(records);
// If processing fails, message is lost (already committed)
\`\`\`

**Use Case:** Metrics, logs where occasional loss is acceptable

**2. At-Least-Once (messages may be duplicated, never lost):**

**Producer:**
\`\`\`java
props.put("acks", "all");  // Wait for all replicas
props.put("retries", Integer.MAX_VALUE);
props.put("max.in.flight.requests.per.connection", 1);  // Prevent reordering

producer.send(record).get();  // Wait for acknowledgment
// If network error, message may be sent twice
\`\`\`

**Consumer:**
\`\`\`java
// Process BEFORE committing offset
ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
processRecords(records);
consumer.commitSync();  // Commit after successful processing

// If crash after processing but before commit:
// Message will be reprocessed on restart
\`\`\`

**Use Case:** Most common - acceptable with idempotent processing

**3. Exactly-Once Semantics (EOS):**

**Idempotent Producer (Kafka 0.11+):**
\`\`\`java
props.put("enable.idempotence", "true");
// Automatically sets:
// - acks=all
// - retries=Integer.MAX_VALUE
// - max.in.flight.requests.per.connection=5

Producer<String, String> producer = new KafkaProducer<>(props);

// Producer ID and sequence number prevent duplicates
// Same message sent twice = stored once
producer.send(new ProducerRecord<>("orders", "key", "value"));
\`\`\`

**How Idempotent Producer Works:**
\`\`\`
Producer sends: [PID=100, Seq=0, Data="msg1"]
Broker receives and stores: msg1

Network fails, producer retries
Producer sends again: [PID=100, Seq=0, Data="msg1"]
Broker sees duplicate sequence → ignores, returns success

Result: Message stored exactly once
\`\`\`

**Transactions (Read-Process-Write Exactly-Once):**
\`\`\`java
// Producer with transactions
props.put("transactional.id", "order-processor-1");
props.put("enable.idempotence", "true");

Producer<String, String> producer = new KafkaProducer<>(props);
producer.initTransactions();

try {
    // Begin transaction
    producer.beginTransaction();

    // Send messages
    producer.send(new ProducerRecord<>("output-topic", "result1"));
    producer.send(new ProducerRecord<>("output-topic", "result2"));

    // Commit offsets within transaction
    producer.sendOffsetsToTransaction(offsets, consumerGroupId);

    // Commit transaction
    producer.commitTransaction();
} catch (Exception e) {
    producer.abortTransaction();
}
\`\`\`

**Exactly-Once with Kafka Streams:**
\`\`\`java
Properties props = new Properties();
props.put(StreamsConfig.APPLICATION_ID_CONFIG, "word-count");
props.put(StreamsConfig.PROCESSING_GUARANTEE_CONFIG,
          StreamsConfig.EXACTLY_ONCE_V2);  // Exactly-once guarantee

StreamsBuilder builder = new StreamsBuilder();
KStream<String, String> input = builder.stream("input-topic");

input.flatMapValues(value -> Arrays.asList(value.split(" ")))
     .groupBy((key, word) -> word)
     .count()
     .toStream()
     .to("output-topic");

KafkaStreams streams = new KafkaStreams(builder.build(), props);
streams.start();
// All transformations are exactly-once
\`\`\`

**Transactional Consumer:**
\`\`\`java
props.put("isolation.level", "read_committed");  // Only read committed messages

KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
consumer.subscribe(Arrays.asList("output-topic"));

while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
    // Only receives messages from committed transactions
    // Aborted transactions are filtered out
    for (ConsumerRecord<String, String> record : records) {
        process(record);
    }
}
\`\`\`

**Exactly-Once Workflow:**
\`\`\`
1. Consumer reads from input-topic
2. Producer begins transaction
3. Producer writes to output-topic
4. Producer commits consumer offsets within transaction
5. Producer commits transaction

If any step fails:
- Transaction aborted
- Offsets not committed
- Consumer will re-read same messages
- No duplicate processing
\`\`\`

**Performance Impact:**
\`\`\`
At-most-once:  Fastest (no guarantees)
At-least-once: Fast (default, good for most)
Exactly-once:  Slower (~20-30% overhead, but worth it)
\`\`\`

**Best Practices:**
- Use idempotent producer for all production systems
- Use transactions for read-process-write patterns
- Use exactly-once-v2 in Kafka Streams
- Consider at-least-once + idempotent processing as alternative`
    },
    {
      id: 8,
      category: 'Kafka Streams',
      question: 'What is Kafka Streams and how does it differ from Kafka Consumer API?',
      answer: `**Kafka Streams:**
- Client library for processing data in Kafka
- Stream processing framework (like Apache Flink, Spark Streaming)
- Built on top of Kafka Consumer/Producer APIs
- Stateful processing with local state stores

**Kafka Streams vs Consumer API:**

\`\`\`
Consumer API:
- Low-level control
- Manual state management
- Manual partition assignment
- More code for simple operations

Kafka Streams:
- High-level DSL (domain-specific language)
- Automatic state management
- Automatic partition assignment
- Built-in windowing, joins, aggregations
\`\`\`

**Simple Example - Word Count:**

**With Consumer API:**
\`\`\`java
Map<String, Integer> wordCounts = new HashMap<>();
KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
consumer.subscribe(Arrays.asList("input"));

while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
    for (ConsumerRecord<String, String> record : records) {
        String[] words = record.value().split(" ");
        for (String word : words) {
            wordCounts.put(word, wordCounts.getOrDefault(word, 0) + 1);
        }
    }
    // Manual offset commits
    // Manual state persistence
    // Manual failure handling
}
\`\`\`

**With Kafka Streams:**
\`\`\`java
StreamsBuilder builder = new StreamsBuilder();

KStream<String, String> textLines = builder.stream("input");

KTable<String, Long> wordCounts = textLines
    .flatMapValues(line -> Arrays.asList(line.split(" ")))
    .groupBy((key, word) -> word)
    .count();  // Automatically managed state store

wordCounts.toStream().to("output");

KafkaStreams streams = new KafkaStreams(builder.build(), props);
streams.start();
// Automatic offset commits, state management, failure recovery
\`\`\`

**Key Features:**

**1. Stateful Processing:**
\`\`\`java
// Aggregation with state
KTable<String, Long> aggregated = stream
    .groupByKey()
    .aggregate(
        () -> 0L,  // Initializer
        (key, value, aggregate) -> aggregate + value,  // Aggregator
        Materialized.as("aggregate-store")  // State store name
    );

// State stores are fault-tolerant
// Backed by changelog topics
// Automatically restored on failure
\`\`\`

**2. Windowing:**
\`\`\`java
// Tumbling window (non-overlapping)
stream.groupByKey()
    .windowedBy(TimeWindows.of(Duration.ofMinutes(5)))
    .count()
    .toStream()
    .to("windowed-counts");

// Hopping window (overlapping)
stream.groupByKey()
    .windowedBy(TimeWindows.of(Duration.ofMinutes(5))
                          .advanceBy(Duration.ofMinutes(1)))
    .count();

// Session window (dynamic, based on inactivity)
stream.groupByKey()
    .windowedBy(SessionWindows.with(Duration.ofMinutes(5)))
    .count();
\`\`\`

**3. Joins:**
\`\`\`java
KStream<String, Order> orders = builder.stream("orders");
KTable<String, Customer> customers = builder.table("customers");

// Stream-Table join (orders enriched with customer data)
KStream<String, OrderWithCustomer> enriched = orders.join(
    customers,
    (order, customer) -> new OrderWithCustomer(order, customer),
    Joined.with(Serdes.String(), orderSerde, customerSerde)
);

// Stream-Stream join (within time window)
KStream<String, Payment> payments = builder.stream("payments");
KStream<String, OrderPayment> matched = orders.join(
    payments,
    (order, payment) -> new OrderPayment(order, payment),
    JoinWindows.of(Duration.ofMinutes(5))  // Match within 5 min
);
\`\`\`

**4. KStream vs KTable:**
\`\`\`java
// KStream: Stream of events (append-only log)
KStream<String, String> stream = builder.stream("events");
// Each record is a new event
// [user1, "login"], [user1, "click"], [user1, "logout"]

// KTable: Changelog stream (latest value per key)
KTable<String, String> table = builder.table("users");
// Each record updates the state
// [user1, "status=online"] → [user1, "status=offline"]
// Table has: {user1: "status=offline"}

// Converting
KTable<String, Long> table = stream.groupByKey().count();
KStream<String, Long> stream = table.toStream();
\`\`\`

**5. Interactive Queries:**
\`\`\`java
// Query local state store
ReadOnlyKeyValueStore<String, Long> store = streams.store(
    StoreQueryParameters.fromNameAndType(
        "word-counts",
        QueryableStoreTypes.keyValueStore()
    )
);

// Get value
Long count = store.get("hello");

// Range scan
KeyValueIterator<String, Long> range = store.range("a", "z");
\`\`\`

**Topology:**
\`\`\`java
// Stream processing topology
StreamsBuilder builder = new StreamsBuilder();

KStream<String, String> source = builder.stream("input");

source
    .filter((key, value) -> value.length() > 10)  // Filter
    .mapValues(value -> value.toUpperCase())       // Transform
    .to("output");                                  // Sink

// View topology
Topology topology = builder.build();
System.out.println(topology.describe());
\`\`\`

**Scaling:**
\`\`\`
Single Application Instance:
- Processes all partitions
- All state stores local

Multiple Instances (Same application.id):
- Partitions distributed across instances
- Each instance processes subset of partitions
- State stores partitioned accordingly
- Automatic rebalancing on instance add/remove

Example: 3 instances, 6 partitions
├── Instance 1: P0, P1
├── Instance 2: P2, P3
└── Instance 3: P4, P5
\`\`\`

**Use Cases:**
- Real-time aggregations
- Stream enrichment
- Event-driven microservices
- Real-time analytics
- Fraud detection
- Monitoring and alerting`
    },
    {
      id: 9,
      category: 'Security',
      question: 'How do you secure Kafka? Explain authentication, authorization, and encryption',
      answer: `**Kafka Security Components:**

**1. Authentication (Who are you?)**

**SASL/PLAIN:**
\`\`\`properties
# Server config (server.properties)
listeners=SASL_PLAINTEXT://localhost:9092
security.inter.broker.protocol=SASL_PLAINTEXT
sasl.mechanism.inter.broker.protocol=PLAIN
sasl.enabled.mechanisms=PLAIN

# JAAS config
KafkaServer {
    org.apache.kafka.common.security.plain.PlainLoginModule required
    username="admin"
    password="admin-secret"
    user_admin="admin-secret"
    user_producer="producer-secret"
    user_consumer="consumer-secret";
};
\`\`\`

\`\`\`java
// Client config
props.put("security.protocol", "SASL_PLAINTEXT");
props.put("sasl.mechanism", "PLAIN");
props.put("sasl.jaas.config",
    "org.apache.kafka.common.security.plain.PlainLoginModule required " +
    "username='producer' password='producer-secret';");
\`\`\`

**SASL/SCRAM (better than PLAIN):**
\`\`\`bash
# Create user in ZooKeeper
kafka-configs.sh --zookeeper localhost:2181 --alter \\
    --add-config 'SCRAM-SHA-256=[password=alice-secret]' \\
    --entity-type users --entity-name alice
\`\`\`

\`\`\`properties
# Server config
sasl.enabled.mechanisms=SCRAM-SHA-256
sasl.mechanism.inter.broker.protocol=SCRAM-SHA-256
\`\`\`

\`\`\`java
// Client config
props.put("sasl.mechanism", "SCRAM-SHA-256");
props.put("sasl.jaas.config",
    "org.apache.kafka.common.security.scram.ScramLoginModule required " +
    "username='alice' password='alice-secret';");
\`\`\`

**SASL/GSSAPI (Kerberos):**
\`\`\`properties
# Server config
listeners=SASL_PLAINTEXT://localhost:9092
security.inter.broker.protocol=SASL_PLAINTEXT
sasl.mechanism.inter.broker.protocol=GSSAPI
sasl.enabled.mechanisms=GSSAPI
sasl.kerberos.service.name=kafka
\`\`\`

\`\`\`java
// Client config
props.put("security.protocol", "SASL_PLAINTEXT");
props.put("sasl.mechanism", "GSSAPI");
props.put("sasl.kerberos.service.name", "kafka");
props.put("sasl.jaas.config",
    "com.sun.security.auth.module.Krb5LoginModule required " +
    "useKeyTab=true " +
    "storeKey=true " +
    "keyTab='/path/to/keytab' " +
    "principal='kafka-client@EXAMPLE.COM';");
\`\`\`

**2. Authorization (What can you do?)**

**Enable ACLs:**
\`\`\`properties
# Server config
authorizer.class.name=kafka.security.authorizer.AclAuthorizer
super.users=User:admin
allow.everyone.if.no.acl.found=false
\`\`\`

**Grant Permissions:**
\`\`\`bash
# Grant WRITE permission on topic
kafka-acls.sh --authorizer-properties zookeeper.connect=localhost:2181 \\
    --add --allow-principal User:producer \\
    --operation Write --topic orders

# Grant READ permission on topic and consumer group
kafka-acls.sh --authorizer-properties zookeeper.connect=localhost:2181 \\
    --add --allow-principal User:consumer \\
    --operation Read --topic orders \\
    --group order-processors

# Grant CREATE permission
kafka-acls.sh --authorizer-properties zookeeper.connect=localhost:2181 \\
    --add --allow-principal User:admin \\
    --operation Create --cluster

# List ACLs
kafka-acls.sh --authorizer-properties zookeeper.connect=localhost:2181 \\
    --list --topic orders

# Remove ACL
kafka-acls.sh --authorizer-properties zookeeper.connect=localhost:2181 \\
    --remove --allow-principal User:producer \\
    --operation Write --topic orders
\`\`\`

**ACL Operations:**
\`\`\`
Topic Operations:
- READ: Consume from topic
- WRITE: Produce to topic
- CREATE: Create topic
- DELETE: Delete topic
- DESCRIBE: Describe topic
- ALTER: Alter topic config

Consumer Group Operations:
- READ: Join group and consume
- DESCRIBE: Describe group

Cluster Operations:
- CREATE: Create topics
- CLUSTER_ACTION: Execute cluster operations
- DESCRIBE_CONFIGS: Describe configs
- ALTER_CONFIGS: Alter configs
\`\`\`

**3. Encryption:**

**SSL/TLS Encryption:**
\`\`\`bash
# Generate keystore for broker
keytool -keystore kafka.server.keystore.jks -alias localhost \\
    -keyalg RSA -validity 365 -genkey

# Generate CA certificate
openssl req -new -x509 -keyout ca-key -out ca-cert -days 365

# Sign broker certificate
keytool -keystore kafka.server.keystore.jks -alias localhost \\
    -certreq -file cert-file

openssl x509 -req -CA ca-cert -CAkey ca-key -in cert-file \\
    -out cert-signed -days 365 -CAcreateserial

# Import CA cert and signed cert
keytool -keystore kafka.server.keystore.jks -alias CARoot \\
    -import -file ca-cert

keytool -keystore kafka.server.keystore.jks -alias localhost \\
    -import -file cert-signed

# Generate truststore
keytool -keystore kafka.server.truststore.jks -alias CARoot \\
    -import -file ca-cert
\`\`\`

\`\`\`properties
# Server config
listeners=SSL://localhost:9093
ssl.keystore.location=/var/private/ssl/kafka.server.keystore.jks
ssl.keystore.password=keystore-password
ssl.key.password=key-password
ssl.truststore.location=/var/private/ssl/kafka.server.truststore.jks
ssl.truststore.password=truststore-password
ssl.client.auth=required
\`\`\`

\`\`\`java
// Client config
props.put("security.protocol", "SSL");
props.put("ssl.truststore.location", "/var/private/ssl/kafka.client.truststore.jks");
props.put("ssl.truststore.password", "truststore-password");
props.put("ssl.keystore.location", "/var/private/ssl/kafka.client.keystore.jks");
props.put("ssl.keystore.password", "keystore-password");
props.put("ssl.key.password", "key-password");
\`\`\`

**Combined: SASL + SSL:**
\`\`\`properties
# Server config
listeners=SASL_SSL://localhost:9093
security.inter.broker.protocol=SASL_SSL
sasl.mechanism.inter.broker.protocol=SCRAM-SHA-256
sasl.enabled.mechanisms=SCRAM-SHA-256
ssl.keystore.location=/path/to/keystore.jks
ssl.truststore.location=/path/to/truststore.jks
\`\`\`

\`\`\`java
// Client config
props.put("security.protocol", "SASL_SSL");
props.put("sasl.mechanism", "SCRAM-SHA-256");
props.put("sasl.jaas.config",
    "org.apache.kafka.common.security.scram.ScramLoginModule required " +
    "username='alice' password='alice-secret';");
props.put("ssl.truststore.location", "/path/to/truststore.jks");
props.put("ssl.truststore.password", "password");
\`\`\`

**4. Data Encryption at Rest:**
\`\`\`properties
# Enable encryption for data at rest (file system level)
# Use encrypted volumes or file system encryption
# Kafka doesn't provide built-in encryption at rest
\`\`\`

**Best Practices:**
1. Always use SSL for production
2. Use SASL/SCRAM instead of PLAIN
3. Enable ACLs with deny-by-default
4. Rotate certificates regularly
5. Use separate credentials for each client
6. Monitor security metrics
7. Enable audit logging
8. Use VPC/network segmentation
9. Encrypt backup data
10. Implement proper key management`
    },
    {
      id: 10,
      category: 'Monitoring',
      question: 'What metrics should you monitor in Kafka and how do you troubleshoot common issues?',
      answer: `**Key Kafka Metrics:**

**1. Broker Metrics:**

**Under-replicated Partitions:**
\`\`\`
kafka.server:type=ReplicaManager,name=UnderReplicatedPartitions

Critical metric - should always be 0
If > 0: Follower replicas are not keeping up with leader
Causes: Broker down, slow disk, network issues
\`\`\`

**Active Controller Count:**
\`\`\`
kafka.controller:type=KafkaController,name=ActiveControllerCount

Should be 1 in cluster (exactly one controller)
If 0: No controller elected (serious issue)
If > 1: Split brain (multiple controllers - critical)
\`\`\`

**Offline Partitions:**
\`\`\`
kafka.controller:type=KafkaController,name=OfflinePartitionsCount

Should always be 0
If > 0: Some partitions have no leader (data unavailable)
\`\`\`

**Request Metrics:**
\`\`\`
kafka.network:type=RequestMetrics,name=TotalTimeMs,request=Produce
kafka.network:type=RequestMetrics,name=TotalTimeMs,request=FetchConsumer

Monitor latency for produce/fetch requests
High latency indicates performance issues
\`\`\`

**2. Producer Metrics:**

\`\`\`java
// Record send rate
producer.metrics().get(new MetricName(
    "record-send-rate",
    "producer-metrics",
    "",
    Collections.emptyMap()
));

// Batch size
"batch-size-avg"  // Average batch size
"record-queue-time-avg"  // Time records wait in buffer

// Errors
"record-error-rate"  // Errors per second
"record-retry-rate"  // Retries per second
\`\`\`

**3. Consumer Metrics:**

\`\`\`java
// Consumer lag (critical!)
kafka.consumer:type=consumer-fetch-manager-metrics,partition={},topic={},client-id={}
"records-lag"  // Number of messages behind

// Fetch metrics
"fetch-latency-avg"  // Average fetch latency
"records-per-request-avg"  // Records per fetch

// Rebalance metrics
"rebalance-latency-avg"  // Time spent in rebalance
"rebalance-total"  // Total number of rebalances
\`\`\`

**4. Consumer Lag Monitoring:**

\`\`\`bash
# Check consumer lag
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \\
    --describe --group order-processors

GROUP           TOPIC      PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG
order-processors orders    0          12500           12500           0
order-processors orders    1          11200           12800           1600  ← LAG!
order-processors orders    2          10500           10500           0
\`\`\`

**Using Prometheus + JMX Exporter:**
\`\`\`yaml
# jmx_exporter config
rules:
  - pattern: kafka.server<type=(.+), name=(.+)><>Value
    name: kafka_server_$1_$2
    type: GAUGE

  - pattern: kafka.controller<type=(.+), name=(.+)><>Value
    name: kafka_controller_$1_$2
    type: GAUGE

  - pattern: kafka.network<type=RequestMetrics, name=TotalTimeMs, request=(.+)><>Mean
    name: kafka_network_request_total_time_ms
    labels:
      request: $1
    type: GAUGE
\`\`\`

**Common Issues and Troubleshooting:**

**1. High Consumer Lag:**

**Symptoms:**
- Consumer can't keep up with producers
- records-lag metric increasing

**Diagnosis:**
\`\`\`bash
# Check lag per partition
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \\
    --describe --group order-processors

# Check consumer throughput
# Look for slow processing in application logs
\`\`\`

**Solutions:**
\`\`\`java
// Option 1: Add more consumers (if lag is spread across partitions)
// If 4 partitions and 2 consumers with lag → add 2 more consumers

// Option 2: Increase fetch size
props.put("max.poll.records", "1000");  // Process more records per poll
props.put("fetch.min.bytes", "100000");  // Fetch larger batches

// Option 3: Optimize processing
// Move slow operations to async threads
ExecutorService executor = Executors.newFixedThreadPool(10);
while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
    for (ConsumerRecord<String, String> record : records) {
        executor.submit(() -> processRecord(record));  // Async processing
    }
    consumer.commitAsync();  // Don't block on commit
}

// Option 4: Add more partitions to topic
kafka-topics.sh --bootstrap-server localhost:9092 \\
    --alter --topic orders --partitions 8
\`\`\`

**2. Under-Replicated Partitions:**

**Symptoms:**
- UnderReplicatedPartitions > 0
- Follower replicas not in sync with leader

**Diagnosis:**
\`\`\`bash
# Check broker status
kafka-broker-api-versions.sh --bootstrap-server localhost:9092

# Check topic details
kafka-topics.sh --bootstrap-server localhost:9092 \\
    --describe --topic orders

# Look for:
Topic: orders  Partition: 0  Leader: 1  Replicas: 1,2,3  Isr: 1,3
# ISR (In-Sync Replicas) missing broker 2 → under-replicated
\`\`\`

**Solutions:**
\`\`\`bash
# Check broker logs for errors
tail -f /var/log/kafka/server.log

# Common causes:
# 1. Disk full → clean up old segments
# 2. Network issues → check network connectivity
# 3. Broker overloaded → add more brokers or reduce load
# 4. Slow disk → upgrade storage

# Increase replica lag time if needed
replica.lag.time.max.ms=30000  # Allow more time for followers to catch up
\`\`\`

**3. Frequent Rebalances:**

**Symptoms:**
- High rebalance-total metric
- Consumer performance degraded
- "Rebalance in progress" errors

**Diagnosis:**
\`\`\`bash
# Check consumer group state
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \\
    --describe --group order-processors --state

# Look for frequent state changes
\`\`\`

**Solutions:**
\`\`\`java
// Increase timeouts
props.put("max.poll.interval.ms", "600000");  // 10 minutes
props.put("session.timeout.ms", "30000");     // 30 seconds
props.put("heartbeat.interval.ms", "10000");   // 10 seconds

// Use static membership (Kafka 2.3+)
props.put("group.instance.id", "consumer-1");

// Use incremental cooperative rebalancing
props.put("partition.assignment.strategy", "CooperativeStickyAssignor");

// Optimize processing to poll more frequently
while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));

    // Process quickly
    processBatch(records);  // < max.poll.interval.ms

    consumer.commitSync();
}
\`\`\`

**4. Message Loss:**

**Diagnosis:**
\`\`\`bash
# Check producer acks setting
# Check min.insync.replicas

# Verify message count
kafka-run-class.sh kafka.tools.GetOffsetShell \\
    --broker-list localhost:9092 \\
    --topic orders --time -1  # Get latest offsets
\`\`\`

**Solutions:**
\`\`\`java
// Producer: Use stronger guarantees
props.put("acks", "all");  // Wait for all replicas
props.put("retries", Integer.MAX_VALUE);
props.put("enable.idempotence", "true");

// Broker: Require minimum in-sync replicas
min.insync.replicas=2  // At least 2 replicas must acknowledge
\`\`\`

**5. Performance Issues:**

\`\`\`bash
# Check disk I/O
iostat -x 1

# Check network throughput
iftop

# Check JVM heap usage
jstat -gcutil <kafka_pid> 1000

# Tune OS settings
# Increase file descriptor limit
ulimit -n 100000

# Disable swap
swappiness=1

# Use deadline/noop I/O scheduler for SSDs
echo noop > /sys/block/sda/queue/scheduler
\`\`\`

**Monitoring Tools:**
1. **Kafka Manager (CMAK)** - UI for managing Kafka clusters
2. **Burrow** - Consumer lag monitoring
3. **Prometheus + Grafana** - Metrics and dashboards
4. **Confluent Control Center** - Enterprise monitoring
5. **LinkedIn Cruise Control** - Cluster management and rebalancing`
    },
    {
      id: 11,
      category: 'Schema Registry',
      question: 'What is Schema Registry and why is it important for Kafka?',
      answer: `**Schema Registry:**
- Centralized schema storage and management
- Enforces data contracts between producers and consumers
- Supports Avro, JSON Schema, and Protobuf
- Provides schema versioning and compatibility checks

**Why Use Schema Registry?**

**Without Schema Registry:**
\`\`\`java
// Producer sends JSON
producer.send(new ProducerRecord<>("users", "{"name":"John","age":30}"));

// Consumer expects different format - BREAKS!
// What if producer changes schema without telling consumer?
\`\`\`

**With Schema Registry:**
\`\`\`java
// Schema is registered and enforced
// Both producer and consumer agree on structure
// Schema evolution is controlled
\`\`\`

**Architecture:**
\`\`\`
Producer → Schema Registry → Kafka → Consumer
    ↓           ↑              ↓         ↓
  Register    Validate      Store     Fetch
  Schema      Schema        Data      Schema
\`\`\`

**Using Avro with Schema Registry:**

**1. Define Schema (user.avsc):**
\`\`\`json
{
  "type": "record",
  "name": "User",
  "namespace": "com.example",
  "fields": [
    {"name": "id", "type": "long"},
    {"name": "name", "type": "string"},
    {"name": "email", "type": "string"},
    {"name": "age", "type": ["null", "int"], "default": null}
  ]
}
\`\`\`

**2. Producer Configuration:**
\`\`\`java
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("schema.registry.url", "http://localhost:8081");
props.put("key.serializer", StringSerializer.class);
props.put("value.serializer", KafkaAvroSerializer.class);

Producer<String, User> producer = new KafkaProducer<>(props);

User user = User.newBuilder()
    .setId(1L)
    .setName("John Doe")
    .setEmail("john@example.com")
    .setAge(30)
    .build();

producer.send(new ProducerRecord<>("users", user.getId().toString(), user));
\`\`\`

**3. Consumer Configuration:**
\`\`\`java
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("schema.registry.url", "http://localhost:8081");
props.put("group.id", "user-consumer-group");
props.put("key.deserializer", StringDeserializer.class);
props.put("value.deserializer", KafkaAvroDeserializer.class);
props.put("specific.avro.reader", "true");

KafkaConsumer<String, User> consumer = new KafkaConsumer<>(props);
consumer.subscribe(Collections.singletonList("users"));

while (true) {
    ConsumerRecords<String, User> records = consumer.poll(Duration.ofMillis(100));
    for (ConsumerRecord<String, User> record : records) {
        User user = record.value();
        System.out.println(user.getName() + " - " + user.getEmail());
    }
}
\`\`\`

**Schema Compatibility Types:**

**BACKWARD (default):**
\`\`\`
New schema can read old data
Can: Delete fields, add optional fields
Cannot: Add required fields
\`\`\`

**FORWARD:**
\`\`\`
Old schema can read new data
Can: Add fields, delete optional fields
Cannot: Delete required fields
\`\`\`

**FULL:**
\`\`\`
Both backward and forward compatible
Most restrictive but safest
\`\`\`

**NONE:**
\`\`\`
No compatibility checking
Not recommended for production
\`\`\`

**Schema Evolution Example:**

**Version 1:**
\`\`\`json
{"name": "User", "fields": [
  {"name": "id", "type": "long"},
  {"name": "name", "type": "string"}
]}
\`\`\`

**Version 2 (BACKWARD compatible):**
\`\`\`json
{"name": "User", "fields": [
  {"name": "id", "type": "long"},
  {"name": "name", "type": "string"},
  {"name": "email", "type": ["null", "string"], "default": null}
]}
\`\`\`

**REST API:**
\`\`\`bash
# List subjects
curl http://localhost:8081/subjects

# Get schema versions
curl http://localhost:8081/subjects/users-value/versions

# Register schema
curl -X POST http://localhost:8081/subjects/users-value/versions \\
  -H "Content-Type: application/vnd.schemaregistry.v1+json" \\
  -d '{"schema": "{\\"type\\":\\"record\\",...}"}'

# Test compatibility
curl -X POST http://localhost:8081/compatibility/subjects/users-value/versions/latest \\
  -H "Content-Type: application/vnd.schemaregistry.v1+json" \\
  -d '{"schema": "..."}'
\`\`\`

**Benefits:**
✅ Data contracts enforced
✅ Schema versioning
✅ Backward/forward compatibility
✅ Smaller message size (schema ID vs full schema)
✅ Documentation of data structures`
    },
    {
      id: 12,
      category: 'Kafka Connect',
      question: 'What is Kafka Connect and how does it work?',
      answer: `**Kafka Connect:**
- Framework for streaming data between Kafka and external systems
- Pre-built connectors for databases, file systems, cloud services
- Scalable, fault-tolerant, no coding required

**Architecture:**
\`\`\`
Source Systems          Kafka Connect          Kafka          Kafka Connect          Sink Systems
┌──────────┐           ┌───────────┐        ┌───────┐       ┌───────────┐          ┌──────────┐
│ Database │ ───────▶  │  Source   │ ─────▶ │ Topic │ ────▶ │   Sink    │ ───────▶ │   S3     │
│ Files    │           │ Connector │        │       │       │ Connector │          │ HDFS     │
│ APIs     │           └───────────┘        └───────┘       └───────────┘          │ Elastic  │
└──────────┘                                                                        └──────────┘
\`\`\`

**Connector Types:**

**Source Connectors:**
- Read from external system → Write to Kafka
- Examples: JDBC, Debezium (CDC), File, S3

**Sink Connectors:**
- Read from Kafka → Write to external system
- Examples: JDBC, Elasticsearch, HDFS, S3

**Running Kafka Connect:**

**Standalone Mode:**
\`\`\`bash
# For development/testing
connect-standalone.sh connect-standalone.properties connector.properties
\`\`\`

**Distributed Mode:**
\`\`\`bash
# For production (scalable, fault-tolerant)
connect-distributed.sh connect-distributed.properties
\`\`\`

**Distributed Mode Configuration:**
\`\`\`properties
bootstrap.servers=localhost:9092
group.id=connect-cluster

# Converter configuration
key.converter=org.apache.kafka.connect.json.JsonConverter
value.converter=org.apache.kafka.connect.json.JsonConverter
key.converter.schemas.enable=false
value.converter.schemas.enable=false

# Internal topics for storing configs and offsets
config.storage.topic=connect-configs
offset.storage.topic=connect-offsets
status.storage.topic=connect-status

# REST API port
rest.port=8083
\`\`\`

**JDBC Source Connector Example:**
\`\`\`json
{
  "name": "jdbc-source-connector",
  "config": {
    "connector.class": "io.confluent.connect.jdbc.JdbcSourceConnector",
    "connection.url": "jdbc:postgresql://localhost:5432/mydb",
    "connection.user": "user",
    "connection.password": "password",
    "table.whitelist": "orders,customers",
    "mode": "incrementing",
    "incrementing.column.name": "id",
    "topic.prefix": "db-",
    "poll.interval.ms": "1000"
  }
}
\`\`\`

**JDBC Sink Connector Example:**
\`\`\`json
{
  "name": "jdbc-sink-connector",
  "config": {
    "connector.class": "io.confluent.connect.jdbc.JdbcSinkConnector",
    "connection.url": "jdbc:postgresql://localhost:5432/warehouse",
    "connection.user": "user",
    "connection.password": "password",
    "topics": "processed-orders",
    "auto.create": "true",
    "insert.mode": "upsert",
    "pk.mode": "record_key",
    "pk.fields": "order_id"
  }
}
\`\`\`

**Debezium CDC Connector:**
\`\`\`json
{
  "name": "postgres-cdc-connector",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "database.hostname": "localhost",
    "database.port": "5432",
    "database.user": "postgres",
    "database.password": "password",
    "database.dbname": "mydb",
    "database.server.name": "dbserver1",
    "table.include.list": "public.orders,public.customers",
    "plugin.name": "pgoutput",
    "slot.name": "debezium_slot"
  }
}
\`\`\`

**REST API:**
\`\`\`bash
# List connectors
curl http://localhost:8083/connectors

# Create connector
curl -X POST http://localhost:8083/connectors \\
  -H "Content-Type: application/json" \\
  -d @connector-config.json

# Get connector status
curl http://localhost:8083/connectors/my-connector/status

# Pause connector
curl -X PUT http://localhost:8083/connectors/my-connector/pause

# Resume connector
curl -X PUT http://localhost:8083/connectors/my-connector/resume

# Delete connector
curl -X DELETE http://localhost:8083/connectors/my-connector
\`\`\`

**Transformations (SMT):**
\`\`\`json
{
  "name": "jdbc-source",
  "config": {
    "connector.class": "io.confluent.connect.jdbc.JdbcSourceConnector",
    "transforms": "addTimestamp,maskField",
    "transforms.addTimestamp.type": "org.apache.kafka.connect.transforms.InsertField$Value",
    "transforms.addTimestamp.timestamp.field": "processed_at",
    "transforms.maskField.type": "org.apache.kafka.connect.transforms.MaskField$Value",
    "transforms.maskField.fields": "ssn,credit_card"
  }
}
\`\`\`

**Common Use Cases:**
- Database replication
- Change Data Capture (CDC)
- Log aggregation
- Data lake ingestion
- Real-time analytics pipelines`
    },
    {
      id: 13,
      category: 'KRaft Mode',
      question: 'What is KRaft mode and why is Kafka moving away from ZooKeeper?',
      answer: `**KRaft Mode (Kafka Raft):**
- New consensus protocol replacing ZooKeeper
- Kafka manages its own metadata
- Available since Kafka 2.8, production-ready in 3.3+

**Why Replace ZooKeeper?**

**ZooKeeper Limitations:**
\`\`\`
1. Separate system to manage
2. Scalability bottleneck (millions of partitions)
3. Additional operational complexity
4. Controller failover is slow
5. Metadata stored externally
\`\`\`

**KRaft Benefits:**
\`\`\`
1. Single system - simpler operations
2. Better scalability (millions of partitions)
3. Faster failover (seconds vs minutes)
4. Metadata stored in Kafka
5. Reduced latency for metadata operations
\`\`\`

**Architecture Comparison:**

**With ZooKeeper:**
\`\`\`
┌───────────────┐     ┌───────────────┐
│   ZooKeeper   │◀───▶│   ZooKeeper   │
│    Cluster    │     │    Cluster    │
└───────┬───────┘     └───────────────┘
        │
        ▼
┌───────────────┐
│    Kafka      │
│  Controller   │
└───────┬───────┘
        │
┌───────┼───────┐
▼       ▼       ▼
Broker  Broker  Broker
\`\`\`

**With KRaft:**
\`\`\`
┌───────────────┐
│  Controller   │◀──▶ Raft Consensus
│    Quorum     │
└───────┬───────┘
        │
┌───────┼───────┐
▼       ▼       ▼
Broker  Broker  Broker
\`\`\`

**KRaft Configuration:**

**Controller-Only Node:**
\`\`\`properties
process.roles=controller
node.id=1
controller.quorum.voters=1@controller1:9093,2@controller2:9093,3@controller3:9093
controller.listener.names=CONTROLLER
listeners=CONTROLLER://controller1:9093
\`\`\`

**Broker-Only Node:**
\`\`\`properties
process.roles=broker
node.id=4
controller.quorum.voters=1@controller1:9093,2@controller2:9093,3@controller3:9093
listeners=PLAINTEXT://broker1:9092
\`\`\`

**Combined Mode (small clusters):**
\`\`\`properties
process.roles=broker,controller
node.id=1
controller.quorum.voters=1@localhost:9093
listeners=PLAINTEXT://localhost:9092,CONTROLLER://localhost:9093
\`\`\`

**Migration from ZooKeeper:**

**1. Format Storage:**
\`\`\`bash
# Generate cluster ID
kafka-storage.sh random-uuid

# Format storage
kafka-storage.sh format -t <cluster-id> -c server.properties
\`\`\`

**2. Start in KRaft Mode:**
\`\`\`bash
# Start controller
kafka-server-start.sh config/kraft/controller.properties

# Start broker
kafka-server-start.sh config/kraft/broker.properties
\`\`\`

**3. Migration Steps (ZK to KRaft):**
\`\`\`
1. Upgrade all brokers to Kafka 3.3+
2. Enable migration feature flag
3. Start KRaft controllers (connect to ZK)
4. Migrate metadata from ZK to KRaft
5. Switch brokers to KRaft mode
6. Remove ZooKeeper dependency
\`\`\`

**Metadata Topic:**
\`\`\`
__cluster_metadata topic
- Stores all cluster metadata
- Replicated across controller quorum
- Topics, partitions, configs, ACLs
- Replaces ZooKeeper znodes
\`\`\`

**Key Improvements:**

**Partition Scalability:**
\`\`\`
ZooKeeper: ~200,000 partitions
KRaft: Millions of partitions
\`\`\`

**Controller Failover:**
\`\`\`
ZooKeeper: Minutes (must read all metadata)
KRaft: Seconds (in-memory metadata)
\`\`\`

**Cluster Startup:**
\`\`\`
ZooKeeper: O(partitions) - slow for large clusters
KRaft: O(1) - constant time
\`\`\`

**KRaft Quorum:**
\`\`\`
Minimum controllers: 3 (for fault tolerance)
Recommended: 3 or 5 controllers
Majority required for consensus (2/3 or 3/5)
\`\`\`

**When to Use KRaft:**
✅ New Kafka deployments (3.3+)
✅ Scaling beyond ZK limits
✅ Simplifying operations
✅ Reducing failover time

**When to Stay on ZooKeeper:**
- Existing stable production clusters
- Using Kafka < 3.3
- Waiting for full feature parity`
    },
    {
      id: 14,
      category: 'Ordering',
      question: 'How does Kafka guarantee message ordering?',
      answer: `**Kafka Message Ordering:**

**Ordering Guarantee:**
- Kafka guarantees ordering WITHIN a partition only
- No ordering guarantee ACROSS partitions
- This is a fundamental design decision for scalability

**Within Partition:**
\`\`\`
Partition 0:
offset 0 → message A (produced first)
offset 1 → message B (produced second)
offset 2 → message C (produced third)

Consumer always reads: A → B → C (in order)
\`\`\`

**Across Partitions:**
\`\`\`
Partition 0: [A, C, E]
Partition 1: [B, D, F]

Consumer may read: A, B, C, D, E, F
                or: B, A, D, C, F, E
                or: any interleaving
\`\`\`

**Ensuring Ordering with Keys:**

**Same Key = Same Partition:**
\`\`\`java
// All messages for user-123 go to same partition
producer.send(new ProducerRecord<>("orders", "user-123", order1));
producer.send(new ProducerRecord<>("orders", "user-123", order2));
producer.send(new ProducerRecord<>("orders", "user-123", order3));
// Guaranteed order: order1 → order2 → order3

// Partition assignment
partition = hash(key) % num_partitions
// hash("user-123") % 6 = partition 2
\`\`\`

**Producer Ordering Configuration:**

**Problem: Out-of-Order Delivery**
\`\`\`java
// With retries and multiple in-flight requests
// Message 1 fails, Message 2 succeeds, Message 1 retried
// Result: Message 2 before Message 1 (out of order!)
\`\`\`

**Solution 1: Single In-Flight Request**
\`\`\`java
props.put("max.in.flight.requests.per.connection", 1);
// Only one request at a time - maintains order
// Downside: Lower throughput
\`\`\`

**Solution 2: Idempotent Producer (Recommended)**
\`\`\`java
props.put("enable.idempotence", "true");
// Automatically sets:
// - acks=all
// - retries=MAX_VALUE
// - max.in.flight.requests.per.connection=5 (safe with idempotence)

// Uses sequence numbers to maintain order
// Message 1: [PID=100, Seq=0]
// Message 2: [PID=100, Seq=1]
// Broker reorders based on sequence
\`\`\`

**Consumer Ordering:**

**Single Consumer:**
\`\`\`java
// One consumer reads all partitions - sees all messages in order
// But no parallelism
consumer.subscribe(Collections.singletonList("orders"));
while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
    // Process in order
}
\`\`\`

**Consumer Group with Partitions:**
\`\`\`
Topic: 4 partitions
Consumer Group: 4 consumers

Consumer 1 → Partition 0 (ordered within P0)
Consumer 2 → Partition 1 (ordered within P1)
Consumer 3 → Partition 2 (ordered within P2)
Consumer 4 → Partition 3 (ordered within P3)

Each partition maintains order, but no global order
\`\`\`

**Strict Global Ordering:**
\`\`\`
Option 1: Single Partition (no parallelism)
Topic with 1 partition → all messages ordered

Option 2: Single Consumer (no parallelism)
One consumer processes all partitions sequentially

Option 3: External Sorting
Add timestamp/sequence to messages
Buffer and sort in application
\`\`\`

**Design Patterns:**

**1. Entity-Based Partitioning:**
\`\`\`java
// All events for an entity go to same partition
producer.send(new ProducerRecord<>("orders", orderId, event));
producer.send(new ProducerRecord<>("users", userId, event));
// Order maintained per entity
\`\`\`

**2. Event Sourcing:**
\`\`\`java
// Aggregate events by entity key
Topic: user-events
Key: user-123
Events: [Created, Updated, Updated, Deleted]
// All events for user-123 are ordered
\`\`\`

**3. Sequence Numbers in Payload:**
\`\`\`java
public class Event {
    private String entityId;
    private long sequenceNumber;  // Application-level ordering
    private String data;
}

// Consumer can detect gaps or reorder
if (event.getSequenceNumber() != expectedSequence) {
    // Handle out-of-order or missing events
}
\`\`\`

**Best Practices:**
• Use meaningful keys for partitioning
• Enable idempotent producer
• Design for partition-level ordering
• Use single partition only when necessary
• Add sequence numbers for cross-partition ordering
• Consider event timestamps for debugging`
    },
    {
      id: 15,
      category: 'Retention',
      question: 'How does Kafka handle data retention and log compaction?',
      answer: `**Kafka Data Retention:**

**Two Retention Policies:**

**1. Time-Based Retention:**
\`\`\`properties
# Retain data for 7 days
log.retention.hours=168
# or more precisely
log.retention.ms=604800000

# Check interval for cleanup
log.retention.check.interval.ms=300000  # 5 minutes
\`\`\`

**2. Size-Based Retention:**
\`\`\`properties
# Retain up to 1GB per partition
log.retention.bytes=1073741824

# Unlimited size (default)
log.retention.bytes=-1
\`\`\`

**Both Can Be Combined:**
\`\`\`properties
# Delete when EITHER condition is met
log.retention.hours=168
log.retention.bytes=1073741824
# Data deleted after 7 days OR when partition exceeds 1GB
\`\`\`

**Log Segments:**
\`\`\`
Partition:
├── 00000000000000000000.log  (oldest, closed)
├── 00000000000000050000.log  (closed)
├── 00000000000000100000.log  (closed)
└── 00000000000000150000.log  (active segment)

# Segment settings
log.segment.bytes=1073741824    # 1GB segments
log.segment.ms=604800000        # 7 days per segment
\`\`\`

**Log Compaction:**

**What is Log Compaction?**
- Keeps only the latest value for each key
- Never deletes the latest message per key
- Useful for state/changelog topics

**Standard Retention vs Compaction:**
\`\`\`
Standard (delete):
Before: [A:1, B:2, A:3, C:4, B:5, A:6]
After:  []  (all deleted after retention period)

Compaction:
Before: [A:1, B:2, A:3, C:4, B:5, A:6]
After:  [C:4, B:5, A:6]  (latest value per key kept)
\`\`\`

**Enable Compaction:**
\`\`\`properties
# Topic-level
cleanup.policy=compact

# Or both delete and compact
cleanup.policy=compact,delete
\`\`\`

**Compaction Configuration:**
\`\`\`properties
# Minimum time before compaction
min.compaction.lag.ms=0

# Maximum time dirty (uncompacted) data can exist
max.compaction.lag.ms=9223372036854775807  # Long.MAX

# Minimum ratio of dirty log to total log
min.cleanable.dirty.ratio=0.5

# Number of compaction threads
log.cleaner.threads=1

# Memory for compaction
log.cleaner.dedupe.buffer.size=134217728  # 128MB
\`\`\`

**Compaction Process:**
\`\`\`
Dirty Segment:
[A:v1, B:v1, A:v2, C:v1, B:v2]
       ↓ (compaction)
Clean Segment:
[A:v2, C:v1, B:v2]

Head (active segment) - never compacted
Tail (closed segments) - eligible for compaction
\`\`\`

**Tombstones (Deletion):**
\`\`\`java
// Delete a key by sending null value (tombstone)
producer.send(new ProducerRecord<>("users", "user-123", null));

// Tombstone retained for delete.retention.ms
// Then removed during compaction
\`\`\`

**Compaction Settings:**
\`\`\`properties
# Tombstone retention
delete.retention.ms=86400000  # 1 day

# Segment size for compaction
segment.bytes=1073741824

# Minimum time before message is compacted
min.compaction.lag.ms=0
\`\`\`

**Use Cases:**

**Delete Policy:**
\`\`\`
- Event streams
- Logs
- Metrics
- Temporary data
\`\`\`

**Compact Policy:**
\`\`\`
- User profiles
- Product catalog
- Configuration
- Kafka Streams state stores
- CDC changelog
\`\`\`

**Delete + Compact:**
\`\`\`
- Keep latest per key
- Eventually delete old keys
- Example: recent user sessions
\`\`\`

**Monitoring Compaction:**
\`\`\`bash
# Check log cleaner status
kafka-log-dirs.sh --describe --bootstrap-server localhost:9092

# Metrics
kafka.log.LogCleaner:
  - cleaner-recopy-percent
  - max-clean-time-secs
  - max-buffer-utilization-percent
\`\`\`

**Best Practices:**
• Use compaction for stateful topics
• Set appropriate delete.retention.ms for tombstones
• Monitor log cleaner performance
• Size segments appropriately
• Consider compact+delete for bounded state`
    },
    {
      id: 16,
      category: 'Replication',
      question: 'How does Kafka replication work and what is ISR?',
      answer: `**Kafka Replication:**

**Replication Factor:**
\`\`\`
replication.factor=3

Partition 0:
├── Replica on Broker 1 (Leader)
├── Replica on Broker 2 (Follower)
└── Replica on Broker 3 (Follower)
\`\`\`

**Leader and Followers:**
\`\`\`
Producer → Leader → (replicates to) → Followers
                                          ↓
Consumer ← Leader ← (reads from)
\`\`\`

**In-Sync Replicas (ISR):**
- Replicas that are "caught up" with the leader
- Eligible to become leader if current leader fails
- Configurable lag threshold

**ISR Configuration:**
\`\`\`properties
# Time replica can be behind before removed from ISR
replica.lag.time.max.ms=30000  # 30 seconds

# Minimum ISR for write to succeed (with acks=all)
min.insync.replicas=2
\`\`\`

**ISR States:**
\`\`\`
Partition 0:
  Leader: Broker 1
  ISR: [1, 2, 3]  (all in sync)

# Broker 3 falls behind
  ISR: [1, 2]     (3 removed from ISR)

# Broker 3 catches up
  ISR: [1, 2, 3]  (3 rejoins ISR)
\`\`\`

**Replication Protocol:**

**1. Producer Writes:**
\`\`\`
Producer → Leader (Broker 1)
    1. Writes to local log
    2. Followers fetch from leader
    3. Followers write to their logs
    4. Followers acknowledge to leader
    5. Leader commits (updates high watermark)
    6. Leader acknowledges to producer
\`\`\`

**2. High Watermark:**
\`\`\`
Log:     [0][1][2][3][4][5][6][7][8]
                        ↑
              High Watermark (HW)

Messages 0-5: Committed (replicated to all ISR)
Messages 6-8: Uncommitted (not yet replicated)
\`\`\`

**3. Consumer Visibility:**
\`\`\`
Consumer can only read up to High Watermark
- Ensures consistency across replicas
- Prevents reading uncommitted data
\`\`\`

**Leader Election:**

**Scenario: Leader Fails**
\`\`\`
Before:
  Partition 0: Leader=1, ISR=[1,2,3]

Broker 1 fails:
  1. Controller detects failure
  2. Selects new leader from ISR (Broker 2)
  3. Updates metadata
  4. Notifies clients

After:
  Partition 0: Leader=2, ISR=[2,3]
\`\`\`

**Unclean Leader Election:**
\`\`\`properties
# Allow non-ISR replica to become leader
unclean.leader.election.enable=false  # Default: false

# If true: May lose committed messages
# If false: Partition unavailable if no ISR replicas
\`\`\`

**Min ISR with acks=all:**
\`\`\`java
// Producer config
props.put("acks", "all");

// Broker config
min.insync.replicas=2

// Scenario:
// replication.factor=3, min.insync.replicas=2
//
// ISR=[1,2,3] → Write succeeds (3 >= 2)
// ISR=[1,2]   → Write succeeds (2 >= 2)
// ISR=[1]     → Write FAILS (1 < 2)
\`\`\`

**Replica Fetching:**
\`\`\`properties
# Fetch configuration
replica.fetch.max.bytes=1048576       # 1MB
replica.fetch.wait.max.ms=500
replica.fetch.min.bytes=1

# Replica socket settings
replica.socket.timeout.ms=30000
replica.socket.receive.buffer.bytes=65536
\`\`\`

**Monitoring Replication:**
\`\`\`bash
# Check under-replicated partitions
kafka-topics.sh --describe --bootstrap-server localhost:9092 \\
  --under-replicated-partitions

# Check ISR for topic
kafka-topics.sh --describe --bootstrap-server localhost:9092 \\
  --topic my-topic
\`\`\`

**Key Metrics:**
\`\`\`
UnderReplicatedPartitions: Should be 0
IsrShrinksPerSec: Should be low
IsrExpandsPerSec: Should be low
ActiveControllerCount: Should be 1
OfflinePartitionsCount: Should be 0
\`\`\`

**Best Practices:**
• replication.factor >= 3 for production
• min.insync.replicas = replication.factor - 1
• acks=all for critical data
• Disable unclean leader election
• Monitor under-replicated partitions
• Spread replicas across racks/zones`
    },
    {
      id: 17,
      category: 'Backpressure',
      question: 'How do you handle backpressure in Kafka applications?',
      answer: `**Backpressure in Kafka:**
When consumers can't keep up with producers, causing lag to grow.

**Detecting Backpressure:**

**1. Consumer Lag:**
\`\`\`bash
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \\
  --describe --group my-consumer-group

# Output:
GROUP           TOPIC      PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG
my-consumer     orders     0          95000           100000          5000 ←
my-consumer     orders     1          90000           100000          10000 ←
\`\`\`

**2. Metrics:**
\`\`\`
Consumer:
  records-lag-max
  records-consumed-rate

Producer:
  record-queue-time-avg
  buffer-exhausted-rate
\`\`\`

**Handling Consumer Backpressure:**

**1. Scale Consumers:**
\`\`\`
Before: 2 consumers, 4 partitions
  Consumer 1: P0, P1
  Consumer 2: P2, P3

After: 4 consumers, 4 partitions
  Consumer 1: P0
  Consumer 2: P1
  Consumer 3: P2
  Consumer 4: P3

Throughput: 2x
\`\`\`

**2. Increase Partitions:**
\`\`\`bash
# Add more partitions (can't decrease!)
kafka-topics.sh --bootstrap-server localhost:9092 \\
  --alter --topic orders --partitions 8
\`\`\`

**3. Optimize Consumer Processing:**
\`\`\`java
// Batch processing
props.put("max.poll.records", "500");
props.put("fetch.min.bytes", "50000");

while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));

    // Process in parallel
    ExecutorService executor = Executors.newFixedThreadPool(10);
    List<Future<?>> futures = new ArrayList<>();

    for (ConsumerRecord<String, String> record : records) {
        futures.add(executor.submit(() -> processRecord(record)));
    }

    // Wait for all to complete
    for (Future<?> future : futures) {
        future.get();
    }

    consumer.commitSync();
}
\`\`\`

**4. Async Processing with Queue:**
\`\`\`java
BlockingQueue<ConsumerRecord<String, String>> queue =
    new LinkedBlockingQueue<>(10000);

// Consumer thread - fast polling
while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
    for (ConsumerRecord<String, String> record : records) {
        queue.put(record);  // Blocks if queue full (backpressure)
    }
    consumer.commitSync();
}

// Worker threads - slow processing
for (int i = 0; i < 10; i++) {
    executor.submit(() -> {
        while (true) {
            ConsumerRecord<String, String> record = queue.take();
            processRecord(record);  // Slow operation
        }
    });
}
\`\`\`

**5. Pause/Resume Partitions:**
\`\`\`java
// Pause when buffer is full
if (processingQueue.size() > HIGH_WATERMARK) {
    consumer.pause(consumer.assignment());
}

// Resume when buffer drains
if (processingQueue.size() < LOW_WATERMARK) {
    consumer.resume(consumer.paused());
}
\`\`\`

**Handling Producer Backpressure:**

**1. Producer Buffer:**
\`\`\`java
// Increase buffer size
props.put("buffer.memory", "67108864");  // 64MB

// Handle buffer full
props.put("max.block.ms", "60000");  // Block up to 60s

// If buffer full, send() blocks until space available
// Or throws TimeoutException after max.block.ms
\`\`\`

**2. Batch Settings:**
\`\`\`java
// Larger batches = better throughput
props.put("batch.size", "65536");     // 64KB
props.put("linger.ms", "50");         // Wait up to 50ms to batch
props.put("compression.type", "lz4"); // Compress for better throughput
\`\`\`

**3. Rate Limiting Producer:**
\`\`\`java
RateLimiter rateLimiter = RateLimiter.create(10000);  // 10K/sec

while (hasData) {
    rateLimiter.acquire();  // Block if rate exceeded
    producer.send(new ProducerRecord<>("topic", data));
}
\`\`\`

**4. Async with Callback:**
\`\`\`java
Semaphore semaphore = new Semaphore(1000);  // Max 1000 in-flight

while (hasData) {
    semaphore.acquire();  // Block if too many in-flight

    producer.send(record, (metadata, exception) -> {
        semaphore.release();
        if (exception != null) {
            // Handle failure
        }
    });
}
\`\`\`

**Monitoring for Backpressure:**
\`\`\`yaml
# Prometheus alerts
- alert: KafkaConsumerLagHigh
  expr: kafka_consumer_group_lag > 10000
  for: 5m
  labels:
    severity: warning

- alert: KafkaProducerBufferExhausted
  expr: rate(kafka_producer_buffer_exhausted_total[5m]) > 0
  labels:
    severity: critical
\`\`\`

**Best Practices:**
• Monitor consumer lag continuously
• Set up alerts for lag thresholds
• Scale consumers before lag gets critical
• Use async processing for slow operations
• Implement pause/resume for controlled backpressure
• Rate limit producers if needed
• Size producer buffers appropriately`
    },
    {
      id: 18,
      category: 'Error Handling',
      question: 'How do you implement error handling and dead letter queues in Kafka?',
      answer: `**Kafka Error Handling Strategies:**

**1. Dead Letter Queue (DLQ):**
\`\`\`java
while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));

    for (ConsumerRecord<String, String> record : records) {
        try {
            processRecord(record);
        } catch (Exception e) {
            // Send to DLQ
            sendToDeadLetterQueue(record, e);
        }
    }
    consumer.commitSync();
}

private void sendToDeadLetterQueue(ConsumerRecord<String, String> record, Exception e) {
    ProducerRecord<String, String> dlqRecord = new ProducerRecord<>(
        "orders-dlq",  // DLQ topic
        record.key(),
        record.value()
    );

    // Add error metadata as headers
    dlqRecord.headers()
        .add("original-topic", record.topic().getBytes())
        .add("original-partition", String.valueOf(record.partition()).getBytes())
        .add("original-offset", String.valueOf(record.offset()).getBytes())
        .add("error-message", e.getMessage().getBytes())
        .add("error-timestamp", Instant.now().toString().getBytes());

    dlqProducer.send(dlqRecord);
}
\`\`\`

**2. Retry with Exponential Backoff:**
\`\`\`java
private static final int MAX_RETRIES = 3;
private static final long INITIAL_BACKOFF_MS = 1000;

for (ConsumerRecord<String, String> record : records) {
    int attempts = 0;
    boolean success = false;

    while (attempts < MAX_RETRIES && !success) {
        try {
            processRecord(record);
            success = true;
        } catch (RetryableException e) {
            attempts++;
            if (attempts < MAX_RETRIES) {
                long backoff = INITIAL_BACKOFF_MS * (long) Math.pow(2, attempts - 1);
                Thread.sleep(backoff);
            } else {
                sendToDeadLetterQueue(record, e);
            }
        } catch (NonRetryableException e) {
            // Don't retry, send directly to DLQ
            sendToDeadLetterQueue(record, e);
            break;
        }
    }
}
\`\`\`

**3. Retry Topics Pattern:**
\`\`\`
Main Topic: orders
Retry Topics: orders-retry-1, orders-retry-2, orders-retry-3
DLQ: orders-dlq

Flow:
orders → (fail) → orders-retry-1 (1min delay)
       → (fail) → orders-retry-2 (5min delay)
       → (fail) → orders-retry-3 (30min delay)
       → (fail) → orders-dlq
\`\`\`

\`\`\`java
public class RetryConsumer {

    private final Map<String, Long> retryDelays = Map.of(
        "orders-retry-1", 60_000L,
        "orders-retry-2", 300_000L,
        "orders-retry-3", 1800_000L
    );

    public void processWithRetry(ConsumerRecord<String, String> record) {
        try {
            process(record);
        } catch (Exception e) {
            String nextTopic = getNextRetryTopic(record.topic());
            if (nextTopic != null) {
                // Schedule delayed retry
                scheduleRetry(record, nextTopic, retryDelays.get(nextTopic));
            } else {
                sendToDeadLetterQueue(record, e);
            }
        }
    }

    private String getNextRetryTopic(String currentTopic) {
        return switch (currentTopic) {
            case "orders" -> "orders-retry-1";
            case "orders-retry-1" -> "orders-retry-2";
            case "orders-retry-2" -> "orders-retry-3";
            default -> null;  // Go to DLQ
        };
    }
}
\`\`\`

**4. Spring Kafka Error Handler:**
\`\`\`java
@Configuration
public class KafkaConfig {

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, String>
            kafkaListenerContainerFactory(
                ConsumerFactory<String, String> consumerFactory,
                KafkaTemplate<String, String> kafkaTemplate) {

        ConcurrentKafkaListenerContainerFactory<String, String> factory =
            new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(consumerFactory);

        // Retry configuration
        factory.setCommonErrorHandler(
            new DefaultErrorHandler(
                new DeadLetterPublishingRecoverer(kafkaTemplate,
                    (record, ex) -> new TopicPartition(record.topic() + "-dlq", -1)),
                new ExponentialBackOff(1000L, 2.0)
            )
        );

        return factory;
    }
}

@Service
public class OrderConsumer {

    @KafkaListener(topics = "orders", groupId = "order-group")
    @RetryableTopic(
        attempts = "3",
        backoff = @Backoff(delay = 1000, multiplier = 2.0),
        dltTopicSuffix = "-dlq"
    )
    public void consume(String message) {
        // Process message
        // Automatic retry and DLQ handling
    }

    @DltHandler
    public void handleDlt(String message) {
        log.error("Message in DLQ: {}", message);
        // Alert, log, or special handling
    }
}
\`\`\`

**5. Handling Deserialization Errors:**
\`\`\`java
// Custom deserializer with error handling
public class SafeDeserializer implements Deserializer<MyObject> {

    @Override
    public MyObject deserialize(String topic, byte[] data) {
        try {
            return objectMapper.readValue(data, MyObject.class);
        } catch (Exception e) {
            log.error("Deserialization error: {}", e.getMessage());
            return null;  // Or throw custom exception
        }
    }
}

// Or use ErrorHandlingDeserializer
props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,
    ErrorHandlingDeserializer.class);
props.put(ErrorHandlingDeserializer.VALUE_DESERIALIZER_CLASS,
    JsonDeserializer.class);
props.put(ErrorHandlingDeserializer.VALUE_FUNCTION,
    (record, exception) -> {
        // Log and return null or send to DLQ
    });
\`\`\`

**6. DLQ Processing:**
\`\`\`java
@KafkaListener(topics = "orders-dlq", groupId = "dlq-processor")
public void processDlq(ConsumerRecord<String, String> record) {
    String originalTopic = new String(record.headers().lastHeader("original-topic").value());
    String errorMessage = new String(record.headers().lastHeader("error-message").value());

    // Log for analysis
    log.error("DLQ message from {}: error={}", originalTopic, errorMessage);

    // Store in database for manual review
    dlqRepository.save(new DlqEntry(record));

    // Alert operations team
    alertService.sendAlert("DLQ message received", record);

    // Optionally: Auto-retry after fix
    if (shouldRetry(record)) {
        reprocessService.scheduleReprocess(record);
    }
}
\`\`\`

**Best Practices:**
• Distinguish retryable vs non-retryable errors
• Use exponential backoff for retries
• Add metadata (timestamps, errors) to DLQ messages
• Monitor DLQ size and set up alerts
• Implement DLQ processing/reprocessing
• Log all errors for debugging
• Consider idempotent processing for retries`
    }
  ]

  // Filter questions based on problemLimit (for Top 100/300 mode)
  const displayQuestions = problemLimit ? questions.slice(0, problemLimit) : questions

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Core Concepts': '#ef4444',
      'Partitions': '#f59e0b',
      'Consumer Groups': '#10b981',
      'Producer': '#3b82f6',
      'Performance': '#ec4899',
      'Delivery Semantics': '#8b5cf6',
      'Kafka Streams': '#06b6d4',
      'Security': '#dc2626',
      'Monitoring': '#84cc16',
      'Schema Registry': '#f97316',
      'Kafka Connect': '#14b8a6',
      'KRaft Mode': '#6366f1',
      'Ordering': '#a855f7',
      'Retention': '#22c55e',
      'Replication': '#0ea5e9',
      'Backpressure': '#f43f5e',
      'Error Handling': '#eab308'
    }
    return colors[category] || '#6b7280'
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
        Master Apache Kafka concepts including partitions, consumer groups, and performance optimization.
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
                  <CompletionCheckbox problemId={`KafkaQuestions-${q.id}`} />
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

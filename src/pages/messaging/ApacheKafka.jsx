import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function ApacheKafka({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConcept, setSelectedConcept] = useState(null)

  // Handle Escape key for modal navigation
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation() // Prevent event from reaching parent handlers

        if (selectedConcept) {
          // If viewing a concept, go back to concept list
          setSelectedConcept(null)
        } else {
          // If on concept list, close the modal
          onBack()
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [selectedConcept, onBack])

  const concepts = [
    {
      id: 'producers',
      name: 'Kafka Producers',
      icon: '📤',
      color: '#3b82f6',
      description: 'High-performance message producers with batching, compression, partitioning strategies, and delivery guarantees',
      details: [
        {
          name: 'High Throughput APIs',
          explanation: 'Kafka Producer API enables asynchronous message sending with callbacks for high throughput. Send thousands of messages with non-blocking operations. Configure acks, batch size, and linger time for optimal performance. Automatic retries and error handling. Monitor partition assignments and offsets.',
          codeExample: `// High-throughput Kafka Producer
import org.apache.kafka.clients.producer.*;
import java.util.Properties;

public class KafkaProducerExample {
    public static void main(String[] args) {
        // Producer configuration
        Properties props = new Properties();
        props.put("bootstrap.servers", "kafka1:9092,kafka2:9092,kafka3:9092");
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

        // Performance tuning
        props.put("acks", "all");  // Wait for all replicas
        props.put("batch.size", 32768);  // 32KB batch size
        props.put("linger.ms", 10);  // Wait 10ms for batching
        props.put("compression.type", "snappy");  // Compression
        props.put("buffer.memory", 33554432);  // 32MB buffer

        // Create producer
        KafkaProducer<String, String> producer = new KafkaProducer<>(props);

        // Async send with callback
        for (int i = 0; i < 1000; i++) {
            ProducerRecord<String, String> record =
                new ProducerRecord<>("orders", "order-" + i, "Order data " + i);

            producer.send(record, new Callback() {
                @Override
                public void onCompletion(RecordMetadata metadata, Exception e) {
                    if (e != null) {
                        System.err.println("Error sending message: " + e.getMessage());
                    } else {
                        System.out.printf("Sent to partition %d, offset %d%n",
                            metadata.partition(), metadata.offset());
                    }
                }
            });
        }

        producer.flush();
        producer.close();
    }
}`
        },
        {
          name: 'Batching & Compression',
          explanation: 'Batch messages together for efficiency. Configure batch.size (32KB-64KB) and linger.ms (wait time). Compression reduces network bandwidth: snappy (fast), gzip (high compression), lz4, zstd. Buffer memory controls producer memory usage. Dramatically improves throughput for high-volume workloads.'
        },
        {
          name: 'Partitioning Strategy',
          explanation: 'Control message distribution across partitions. Default: hash of key determines partition. Custom partitioners for specific routing logic. Round-robin for keyless messages. Partition affinity for related messages. Balance load across brokers while maintaining order within partitions.',
          codeExample: `// Custom Partitioner Implementation
import org.apache.kafka.clients.producer.Partitioner;
import org.apache.kafka.common.Cluster;

public class CustomPartitioner implements Partitioner {
    @Override
    public int partition(String topic, Object key, byte[] keyBytes,
                        Object value, byte[] valueBytes, Cluster cluster) {
        int numPartitions = cluster.partitionCountForTopic(topic);

        // Custom logic: VIP customers go to partition 0
        if (key != null && key.toString().startsWith("VIP-")) {
            return 0;
        }

        // Regular customers distributed by hash
        return Math.abs(key.hashCode()) % numPartitions;
    }

    @Override
    public void close() {}

    @Override
    public void configure(Map<String, ?> configs) {}
}

// Usage in producer
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
props.put("partitioner.class", "com.example.CustomPartitioner");

KafkaProducer<String, String> producer = new KafkaProducer<>(props);

// Send to specific partition
ProducerRecord<String, String> record =
    new ProducerRecord<>("orders", "VIP-123", "High priority order");
producer.send(record);`
        },
        {
          name: 'Retry Mechanisms',
          explanation: 'Automatic retry on transient failures. Configure retries count and retry backoff. Delivery timeout for total send time. Enable idempotence to avoid duplicates on retry. Handle permanent vs transient errors differently. Exponential backoff prevents overwhelming brokers.'
        },
        {
          name: 'Idempotent Writes',
          explanation: 'Exactly-once delivery semantics within a session. Enable with enable.idempotence=true. Producer assigns sequence numbers to detect duplicates. Automatic retry without duplicates. Combined with transactions for multi-topic atomicity. Critical for financial and mission-critical systems.',
          codeExample: `// Idempotent Producer with Transactions
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

// Enable idempotence
props.put("enable.idempotence", true);
props.put("acks", "all");
props.put("retries", Integer.MAX_VALUE);
props.put("max.in.flight.requests.per.connection", 5);

// Enable transactions for multi-topic atomicity
props.put("transactional.id", "my-transactional-producer");

KafkaProducer<String, String> producer = new KafkaProducer<>(props);

// Initialize transactions
producer.initTransactions();

try {
    // Begin transaction
    producer.beginTransaction();

    // Send messages to multiple topics atomically
    producer.send(new ProducerRecord<>("orders", "order-123", "Order data"));
    producer.send(new ProducerRecord<>("inventory", "item-456", "Update inventory"));
    producer.send(new ProducerRecord<>("audit", "txn-789", "Audit log"));

    // Commit transaction (all or nothing)
    producer.commitTransaction();
} catch (Exception e) {
    // Rollback on error
    producer.abortTransaction();
    System.err.println("Transaction failed: " + e.getMessage());
} finally {
    producer.close();
}

// Benefits:
// - No duplicates even with retries
// - Atomic writes across multiple partitions/topics
// - Exactly-once semantics end-to-end`
        },
        {
          name: 'Custom Serializers',
          explanation: 'Convert objects to bytes for transmission. Built-in: String, Integer, ByteArray serializers. Custom serializers for complex types. Avro/Protobuf for schema evolution. Serialize keys and values independently. Handle serialization errors gracefully.'
        }
      ]
    },
    {
      id: 'kafka-cluster',
      name: 'Kafka Cluster',
      icon: '🏗️',
      color: '#10b981',
      description: 'Distributed broker architecture with partitioning, replication, leader election, and log management',
      details: [
        {
          name: 'Distributed Brokers',
          explanation: 'Multiple brokers form a cluster managed by ZooKeeper or KRaft. Each broker handles subset of partitions. Load distribution and fault tolerance. Horizontal scaling by adding brokers. Bootstrap servers for client connections. Controller broker manages cluster metadata.'
        },
        {
          name: 'Topic Partitions',
          explanation: 'Topics divided into partitions for parallelism. Each partition is ordered log of messages. Partition count determines max consumer parallelism. Choose partition count based on throughput needs. Cannot easily change partition count later. Messages within partition maintain order.'
        },
        {
          name: 'Replication Factor',
          explanation: 'Each partition replicated across multiple brokers. Replication factor (RF) = number of copies. RF=3 typical for production. Leader handles reads/writes, followers replicate. In-sync replicas (ISR) track healthy replicas. Survives broker failures up to RF-1.'
        },
        {
          name: 'Leader Election',
          explanation: 'One replica elected as partition leader. Leader handles all client requests. Followers fetch from leader to stay in sync. Automatic failover when leader fails. New leader elected from ISR. Unclean leader election trades data loss for availability.'
        },
        {
          name: 'Log Compaction',
          explanation: 'Retain only latest value per key. Background compaction process. Useful for state snapshots and changelog topics. Compacted topics serve as durable key-value stores. Cleanup policy: delete or compact. Preserves at least one value per key.'
        },
        {
          name: 'Retention Policies',
          explanation: 'Control how long messages are stored. Time-based: retention.ms (default 7 days). Size-based: retention.bytes per partition. Whichever limit reached first triggers deletion. Segment files enable efficient deletion. Infinite retention for critical data.'
        }
      ]
    },
    {
      id: 'consumers',
      name: 'Kafka Consumers',
      icon: '📥',
      color: '#8b5cf6',
      description: 'Consumer groups with offset management, parallel processing, and rebalancing strategies',
      details: [
        {
          name: 'Consumer Groups',
          explanation: 'Multiple consumers in a group share partition load. Each partition consumed by one consumer in group. Horizontal scaling by adding consumers (up to partition count). Different groups can consume same topic independently. Group coordinator manages membership.',
          codeExample: `// Kafka Consumer with Consumer Groups
import org.apache.kafka.clients.consumer.*;
import java.time.Duration;
import java.util.*;

public class KafkaConsumerExample {
    public static void main(String[] args) {
        // Consumer configuration
        Properties props = new Properties();
        props.put("bootstrap.servers", "kafka1:9092,kafka2:9092,kafka3:9092");
        props.put("group.id", "order-processing-group");
        props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");

        // Consumer group settings
        props.put("enable.auto.commit", false);  // Manual commit
        props.put("auto.offset.reset", "earliest");  // Start from beginning
        props.put("max.poll.records", 500);  // Batch size
        props.put("session.timeout.ms", 30000);  // Heartbeat timeout

        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);

        // Subscribe to topics
        consumer.subscribe(Arrays.asList("orders", "payments"));

        try {
            while (true) {
                // Poll for messages
                ConsumerRecords<String, String> records =
                    consumer.poll(Duration.ofMillis(100));

                for (ConsumerRecord<String, String> record : records) {
                    System.out.printf("Partition %d, Offset %d: %s = %s%n",
                        record.partition(), record.offset(),
                        record.key(), record.value());

                    // Process message
                    processOrder(record.value());
                }

                // Commit offsets after processing batch
                consumer.commitSync();
            }
        } finally {
            consumer.close();
        }
    }

    private static void processOrder(String order) {
        // Business logic here
    }
}`
        },
        {
          name: 'Offset Management',
          explanation: 'Offset tracks consumer position in partition. Commit offset to mark messages as processed. Stored in __consumer_offsets topic. Committed offset survives consumer restart. Seek to specific offset for replay. Latest vs earliest offset strategies.'
        },
        {
          name: 'Parallel Processing',
          explanation: 'Each consumer in group processes different partitions. Partition assignment strategies: range, round-robin, sticky, cooperative. Process messages in parallel across consumers. Single-threaded per consumer for simplicity. Scale processing by adding consumers.'
        },
        {
          name: 'Auto-commit',
          explanation: 'Automatically commit offsets periodically. enable.auto.commit=true with auto.commit.interval.ms. Simple but risks duplicate or lost messages. Commits happen in background during poll(). Trade convenience for at-least-once semantics. Good for non-critical workloads.'
        },
        {
          name: 'Manual Commit',
          explanation: 'Explicit offset commits for precise control. commitSync() blocks until acknowledged. commitAsync() with callback for non-blocking. Commit per record, batch, or partition. Enables exactly-once processing with transactions. Critical for financial and stateful applications.',
          codeExample: `// Manual Offset Management with Exactly-Once
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("group.id", "payment-processor");
props.put("enable.auto.commit", false);  // Manual commit
props.put("isolation.level", "read_committed");  // Read only committed messages
props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");

KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
consumer.subscribe(Arrays.asList("payments"));

try {
    while (true) {
        ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));

        // Process records by partition
        for (TopicPartition partition : records.partitions()) {
            List<ConsumerRecord<String, String>> partitionRecords =
                records.records(partition);

            for (ConsumerRecord<String, String> record : partitionRecords) {
                try {
                    // Process message (database write, external API call, etc.)
                    processPayment(record.value());

                    // Commit after each record for exactly-once
                    Map<TopicPartition, OffsetAndMetadata> offsets = new HashMap<>();
                    offsets.put(partition,
                        new OffsetAndMetadata(record.offset() + 1));
                    consumer.commitSync(offsets);

                } catch (Exception e) {
                    System.err.println("Error processing record: " + e.getMessage());
                    // Don't commit - will reprocess this message
                    break;
                }
            }
        }

        // Alternative: Async commit for better throughput
        consumer.commitAsync((offsets, exception) -> {
            if (exception != null) {
                System.err.println("Commit failed: " + exception.getMessage());
            }
        });
    }
} finally {
    // Final sync commit before closing
    try {
        consumer.commitSync();
    } finally {
        consumer.close();
    }
}`
        },
        {
          name: 'Rebalancing',
          explanation: 'Redistribute partitions when consumers join/leave. Cooperative rebalancing avoids stop-the-world pauses. RebalanceListener hooks for cleanup/initialization. Save state before rebalance, restore after. Rebalance triggered by heartbeat failure or session timeout. Static membership reduces rebalances.'
        }
      ]
    },
    {
      id: 'stream-processing',
      name: 'Kafka Streams',
      icon: '🌊',
      color: '#ef4444',
      description: 'Stream processing library with stateful operations, windowing, joins, and exactly-once semantics',
      details: [
        {
          name: 'Stateful Processing',
          explanation: 'Maintain state across messages with state stores. RocksDB for persistent local state. Changelog topics for fault tolerance. Restore state from changelog on failure. Aggregate, reduce, count operations. Interactive queries for external state access.',
          codeExample: `// Kafka Streams Stateful Processing
import org.apache.kafka.streams.*;
import org.apache.kafka.streams.kstream.*;

Properties props = new Properties();
props.put(StreamsConfig.APPLICATION_ID_CONFIG, "order-aggregator");
props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());

StreamsBuilder builder = new StreamsBuilder();

// Input stream
KStream<String, String> orders = builder.stream("orders");

// Stateful aggregation: count orders per customer
KTable<String, Long> orderCounts = orders
    .groupByKey()
    .count(Materialized.as("order-counts-store"));  // State store

// Stateful aggregation: total amount per customer
KTable<String, Double> orderTotals = orders
    .mapValues(value -> Double.parseDouble(value))
    .groupByKey()
    .reduce(
        (aggValue, newValue) -> aggValue + newValue,
        Materialized.as("order-totals-store")  // Persistent state
    );

// Join two KTables (both stateful)
KTable<String, String> customerStats = orderCounts
    .join(orderTotals,
        (count, total) -> String.format("Count: %d, Total: %.2f", count, total)
    );

// Write results to output topic
customerStats.toStream().to("customer-statistics");

// Start streams application
KafkaStreams streams = new KafkaStreams(builder.build(), props);
streams.start();

// Query state store from external application
ReadOnlyKeyValueStore<String, Long> store =
    streams.store(
        StoreQueryParameters.fromNameAndType(
            "order-counts-store",
            QueryableStoreTypes.keyValueStore()
        )
    );

Long count = store.get("customer-123");  // Interactive query`
        },
        {
          name: 'Windowing Operations',
          explanation: 'Group events by time windows. Tumbling windows (fixed, non-overlapping). Hopping windows (fixed, overlapping). Sliding windows (continuous). Session windows (activity-based gaps). Grace period handles late-arriving events. Window results to output topics.',
          codeExample: `// Kafka Streams Windowing Examples
StreamsBuilder builder = new StreamsBuilder();
KStream<String, Double> transactions = builder.stream("transactions");

// 1. Tumbling Window (5-minute, non-overlapping)
KTable<Windowed<String>, Double> tumblingSum = transactions
    .groupByKey()
    .windowedBy(TimeWindows.ofSizeWithNoGrace(Duration.ofMinutes(5)))
    .reduce((aggValue, newValue) -> aggValue + newValue);

// 2. Hopping Window (10-minute window, advance by 5 minutes)
KTable<Windowed<String>, Long> hoppingCount = transactions
    .groupByKey()
    .windowedBy(
        TimeWindows
            .ofSizeWithNoGrace(Duration.ofMinutes(10))
            .advanceBy(Duration.ofMinutes(5))
    )
    .count();

// 3. Session Window (30-minute inactivity gap)
KTable<Windowed<String>, Long> sessionCount = transactions
    .groupByKey()
    .windowedBy(SessionWindows.ofInactivityGapWithNoGrace(Duration.ofMinutes(30)))
    .count();

// 4. Sliding Window (continuous, 1-hour window)
KTable<Windowed<String>, Double> slidingAvg = transactions
    .groupByKey()
    .windowedBy(SlidingWindows.ofTimeDifferenceWithNoGrace(Duration.ofHours(1)))
    .aggregate(
        () -> new AverageAggregator(),
        (key, value, agg) -> agg.add(value),
        Materialized.with(Serdes.String(), new AverageAggregatorSerde())
    );

// 5. Window with grace period for late arrivals
KTable<Windowed<String>, Long> gracefulCount = transactions
    .groupByKey()
    .windowedBy(
        TimeWindows
            .ofSizeAndGrace(Duration.ofMinutes(5), Duration.ofMinutes(1))
    )
    .count();

// Output windowed results
tumblingSum
    .toStream()
    .map((windowedKey, value) ->
        KeyValue.pair(
            windowedKey.key() + "@" + windowedKey.window().start(),
            value
        )
    )
    .to("windowed-results");`
        },
        {
          name: 'Joins & Aggregations',
          explanation: 'Join streams with streams or tables. Inner, left, outer join semantics. Co-partitioned topics for join performance. Windowed joins for bounded state. Aggregations: count, sum, reduce. GroupBy for key changes. KTable for table semantics.'
        },
        {
          name: 'Exactly-Once Semantics',
          explanation: 'End-to-end exactly-once processing with transactions. processing.guarantee=exactly_once_v2. Atomic writes across multiple partitions. Transaction markers in log. Idempotent producers prevent duplicates. Read committed isolation level. Performance overhead vs at-least-once.'
        },
        {
          name: 'Interactive Queries',
          explanation: 'Query state stores from external applications. REST API for state access. ReadOnlyKeyValueStore interface. Distributed queries across application instances. Metadata for routing queries to correct instance. Real-time materialized views.'
        },
        {
          name: 'Topology Optimization',
          explanation: 'Optimize stream processing DAG. Reduce repartition operations. Co-locate related operations. Named topologies for modular code. Describe topology for debugging. Tune parallelism with thread count. Monitor lag and processing rate.'
        }
      ]
    },
    {
      id: 'schema-registry',
      name: 'Schema Registry',
      icon: '📋',
      color: '#f59e0b',
      description: 'Centralized schema management with evolution, versioning, and compatibility enforcement',
      details: [
        {
          name: 'Schema Evolution',
          explanation: 'Evolve schemas over time without breaking consumers. Add optional fields with defaults. Remove optional fields. Forward, backward, full compatibility. Schema Registry validates compatibility. Prevents breaking changes. Decouple producer/consumer deployments.',
          codeExample: `// Schema Registry with Avro
import io.confluent.kafka.serializers.KafkaAvroSerializer;
import io.confluent.kafka.serializers.KafkaAvroDeserializer;
import org.apache.avro.Schema;
import org.apache.avro.generic.GenericRecord;
import org.apache.avro.generic.GenericData;

// V1 Schema
String schemaV1 = "{"
    + "\\"type\\": \\"record\\","
    + "\\"name\\": \\"Customer\\","
    + "\\"fields\\": ["
    + "  {\\"name\\": \\"id\\", \\"type\\": \\"string\\"},"
    + "  {\\"name\\": \\"name\\", \\"type\\": \\"string\\"}"
    + "]"
    + "}";

// V2 Schema - backward compatible (added optional field with default)
String schemaV2 = "{"
    + "\\"type\\": \\"record\\","
    + "\\"name\\": \\"Customer\\","
    + "\\"fields\\": ["
    + "  {\\"name\\": \\"id\\", \\"type\\": \\"string\\"},"
    + "  {\\"name\\": \\"name\\", \\"type\\": \\"string\\"},"
    + "  {\\"name\\": \\"email\\", \\"type\\": \\"string\\", \\"default\\": \\"\\"}"
    + "]"
    + "}";

// Producer with Schema Registry
Properties producerProps = new Properties();
producerProps.put("bootstrap.servers", "localhost:9092");
producerProps.put("key.serializer", StringSerializer.class);
producerProps.put("value.serializer", KafkaAvroSerializer.class);
producerProps.put("schema.registry.url", "http://localhost:8081");

KafkaProducer<String, GenericRecord> producer = new KafkaProducer<>(producerProps);

Schema.Parser parser = new Schema.Parser();
Schema schema = parser.parse(schemaV2);

GenericRecord customer = new GenericData.Record(schema);
customer.put("id", "123");
customer.put("name", "John Doe");
customer.put("email", "john@example.com");

producer.send(new ProducerRecord<>("customers", "123", customer));

// Consumer automatically gets schema from registry
Properties consumerProps = new Properties();
consumerProps.put("bootstrap.servers", "localhost:9092");
consumerProps.put("group.id", "customer-processor");
consumerProps.put("key.deserializer", StringDeserializer.class);
consumerProps.put("value.deserializer", KafkaAvroDeserializer.class);
consumerProps.put("schema.registry.url", "http://localhost:8081");
consumerProps.put("specific.avro.reader", false);

KafkaConsumer<String, GenericRecord> consumer = new KafkaConsumer<>(consumerProps);`
        },
        {
          name: 'Avro/JSON Support',
          explanation: 'Avro for compact binary serialization. JSON Schema for human-readable format. Protobuf support available. Schema ID embedded in message. Registry stores schemas centrally. Automatic serializer/deserializer generation. Type safety and documentation.'
        },
        {
          name: 'Compatibility Checks',
          explanation: 'Enforce compatibility rules before registration. BACKWARD: new schema reads old data. FORWARD: old schema reads new data. FULL: both directions. NONE: no checks. Subject-level or global settings. Reject incompatible schemas.'
        },
        {
          name: 'Version Management',
          explanation: 'Every schema change creates new version. Immutable versions prevent conflicts. List all versions for a subject. Fetch schema by version or ID. Rollback to previous version. Soft delete with option to permanently delete.'
        },
        {
          name: 'Schema Validation',
          explanation: 'Validate messages against registered schemas. Serialization fails for invalid data. Deserialization with schema ID lookup. Client-side caching for performance. Fail-fast on schema errors. Integration with Connect and Streams.'
        }
      ]
    },
    {
      id: 'connect',
      name: 'Kafka Connect',
      icon: '🔌',
      color: '#14b8a6',
      description: 'Scalable data integration framework with source and sink connectors for external systems',
      details: [
        {
          name: 'Source Connectors',
          explanation: 'Import data from external systems into Kafka. JDBC, file, database CDC connectors. Poll or push-based data ingestion. Schema discovery and evolution. Offset tracking for incremental loads. Hundreds of connectors available. Custom connectors possible.',
          codeExample: `// Kafka Connect JDBC Source Connector Configuration (JSON)
{
  "name": "jdbc-source-connector",
  "config": {
    "connector.class": "io.confluent.connect.jdbc.JdbcSourceConnector",
    "tasks.max": "3",
    "connection.url": "jdbc:postgresql://localhost:5432/mydb",
    "connection.user": "dbuser",
    "connection.password": "dbpass",

    // Table monitoring
    "table.whitelist": "customers,orders,products",
    "mode": "incrementing",
    "incrementing.column.name": "id",
    "timestamp.column.name": "updated_at",
    "poll.interval.ms": "5000",

    // Topic naming
    "topic.prefix": "postgres-",

    // Schema evolution
    "schema.registry.url": "http://localhost:8081",
    "key.converter": "io.confluent.connect.avro.AvroConverter",
    "value.converter": "io.confluent.connect.avro.AvroConverter",

    // Transformations (SMT)
    "transforms": "addPrefix,maskPII",
    "transforms.addPrefix.type": "org.apache.kafka.connect.transforms.RegexRouter",
    "transforms.addPrefix.regex": ".*",
    "transforms.addPrefix.replacement": "source-$0",
    "transforms.maskPII.type": "org.apache.kafka.connect.transforms.MaskField$Value",
    "transforms.maskPII.fields": "ssn,credit_card"
  }
}

// Deploy connector via REST API
POST http://localhost:8083/connectors
Content-Type: application/json

// Sink Connector Example - Write to Elasticsearch
{
  "name": "elasticsearch-sink",
  "config": {
    "connector.class": "io.confluent.connect.elasticsearch.ElasticsearchSinkConnector",
    "tasks.max": "3",
    "topics": "orders,customers",
    "connection.url": "http://elasticsearch:9200",
    "type.name": "_doc",
    "key.ignore": "false",
    "schema.ignore": "false",
    "behavior.on.malformed.documents": "warn"
  }
}`
        },
        {
          name: 'Sink Connectors',
          explanation: 'Export data from Kafka to external systems. Write to databases, filesystems, data warehouses. Batch writes for efficiency. Exactly-once delivery with idempotent writes. Schema integration with Registry. Error handling and dead letter queues.'
        },
        {
          name: 'Transform SMTs',
          explanation: 'Single Message Transforms modify messages in-flight. InsertField, ReplaceField, MaskField, Cast. Filter unwanted messages. Flatten nested structures. Chain multiple transformations. Lightweight processing without Streams. Declarative configuration.'
        },
        {
          name: 'Distributed Mode',
          explanation: 'Run Connect as a cluster for scalability. REST API for connector management. Automatic load balancing and failover. Share configuration in Kafka topics. Worker nodes execute tasks. Horizontal scaling for throughput. Centralized monitoring.'
        },
        {
          name: 'Schema Integration',
          explanation: 'Seamless Schema Registry integration. Automatic schema registration on ingest. Schema evolution handling. Avro/JSON converters. Schema-aware transformations. Type conversions between systems. Maintain schema compatibility across pipeline.'
        }
      ]
    },
    {
      id: 'monitoring',
      name: 'Monitoring & Operations',
      icon: '📊',
      color: '#6366f1',
      description: 'Operational monitoring with JMX metrics, lag tracking, health checks, and alerting',
      details: [
        {
          name: 'JMX Metrics',
          explanation: 'Java Management Extensions expose internal metrics. Producer/consumer/broker metrics. Throughput, latency, error rates. Request queue sizes. Network thread utilization. Export to Prometheus, Grafana, Datadog. Real-time operational visibility.'
        },
        {
          name: 'Lag Monitoring',
          explanation: 'Track consumer lag (messages behind). Current offset vs log end offset. Per-partition lag metrics. Consumer group lag API. Alert on excessive lag. Identifies slow consumers. Scale consumers or optimize processing. Critical for SLA compliance.'
        },
        {
          name: 'Broker Health',
          explanation: 'Monitor broker health and performance. Under-replicated partitions. Offline partitions. Leader election rate. Disk usage and I/O. Network saturation. ZooKeeper/KRaft health. Cluster controller status. Proactive issue detection.'
        },
        {
          name: 'Topic Analytics',
          explanation: 'Analyze topic-level metrics. Message rate and size distribution. Partition balance across brokers. Retention and compaction effectiveness. Producer/consumer distribution. Hot partitions. Storage usage trends. Capacity planning.'
        },
        {
          name: 'Alert Management',
          explanation: 'Configure alerts for critical conditions. Under-replicated partitions. Consumer lag thresholds. Broker failures. Disk space warnings. Latency spikes. Integration with PagerDuty, Slack. Runbook automation. Incident response workflows.'
        }
      ]
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onBack}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d97706'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}
          >
            ← Back to Messaging
          </button>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              background: 'linear-gradient(to right, #fcd34d, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Apache Kafka
            </h1>
            {currentSubcategory && (
              <span style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                borderRadius: '6px',
                marginTop: '0.25rem',
                display: 'inline-block'
              }}>
                {currentSubcategory}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {onPrevious && (
            <button
              onClick={onPrevious}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
            >
              ← {previousName}
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <p style={{
        fontSize: '1.2rem',
        color: '#9ca3af',
        textAlign: 'center',
        marginBottom: '3rem',
        lineHeight: '1.8'
      }}>
        Distributed event streaming platform for high-throughput, fault-tolerant messaging systems. Covers producers,
        consumers, cluster architecture, stream processing, schema management, data integration, and operational monitoring.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedConcept ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {selectedConcept ? (
          <>
            {/* Sidebar */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <button
                onClick={() => setSelectedConcept(null)}
                style={{
                  padding: '0.75rem',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginBottom: '0.5rem'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
              >
                ← Back to Categories
              </button>
              {concepts.map((concept) => (
                <div
                  key={concept.id}
                  onClick={() => setSelectedConcept(concept)}
                  style={{
                    padding: '1rem',
                    backgroundColor: selectedConcept.id === concept.id ? concept.color + '20' : '#1f2937',
                    border: `2px solid ${selectedConcept.id === concept.id ? concept.color : '#374151'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedConcept.id !== concept.id) {
                      e.currentTarget.style.backgroundColor = concept.color + '10'
                      e.currentTarget.style.borderColor = concept.color
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedConcept.id !== concept.id) {
                      e.currentTarget.style.backgroundColor = '#1f2937'
                      e.currentTarget.style.borderColor = '#374151'
                    }
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{concept.icon}</div>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'white'
                  }}>
                    {concept.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Main content */}
            <div>
              <div style={{
                backgroundColor: '#1f2937',
                padding: '2rem',
                borderRadius: '12px',
                border: `3px solid ${selectedConcept.color}40`,
                marginBottom: '2rem'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{selectedConcept.icon}</div>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  color: 'white',
                  marginBottom: '1rem'
                }}>
                  {selectedConcept.name}
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#9ca3af',
                  lineHeight: '1.8'
                }}>
                  {selectedConcept.description}
                </p>
              </div>

              <div style={{
                display: 'grid',
                gap: '1.5rem'
              }}>
                {selectedConcept.details.map((detail, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: '#1f2937',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: `2px solid #374151`,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.75rem'
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: selectedConcept.color,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        fontWeight: '700'
                      }}>
                        {index + 1}
                      </div>
                      <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        color: 'white',
                        margin: 0
                      }}>
                        {detail.name}
                      </h3>
                    </div>
                    <p style={{
                      fontSize: '1rem',
                      color: '#9ca3af',
                      lineHeight: '1.7',
                      margin: 0
                    }}>
                      {detail.explanation}
                    </p>
                    {detail.codeExample && (
                      <pre style={{
                        backgroundColor: '#1e293b',
                        color: '#e2e8f0',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        overflow: 'auto',
                        fontSize: '0.875rem',
                        lineHeight: '1.6',
                        marginTop: '1rem',
                        border: `2px solid ${selectedConcept.color}40`
                      }}>
                        <code>{detail.codeExample}</code>
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          concepts.map((concept) => (
            <div
              key={concept.id}
              onClick={() => setSelectedConcept(concept)}
              style={{
                backgroundColor: '#1f2937',
                padding: '2rem',
                borderRadius: '12px',
                border: `3px solid #374151`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)'
                e.currentTarget.style.borderColor = concept.color
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = '#374151'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{concept.icon}</div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '0.75rem'
              }}>
                {concept.name}
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#9ca3af',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                {concept.description}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                color: concept.color,
                fontWeight: '600'
              }}>
                <span>Learn more</span>
                <span>→</span>
              </div>
            </div>
          ))
        )}
      </div>
      </div>
    </div>
  )
}

export default ApacheKafka

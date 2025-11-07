import { useState, useEffect } from 'react'

function ApacheFlink({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory }) {
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
      id: 'stream-processing',
      name: 'Stream Processing',
      icon: '🌊',
      color: '#3b82f6',
      description: 'Unified stream and batch processing framework with event-time handling, windowing, and rich operators',
      details: [
        {
          name: 'Unbounded Streams',
          explanation: 'Process infinite event streams with no defined end. Continuous data ingestion from sources like Kafka, Kinesis. Streaming-first architecture. Handle late-arriving data gracefully. Back-pressure mechanism prevents overwhelming downstream. Native support for real-time analytics and complex event processing.',
          codeExample: `// Reading from Kafka and processing unbounded stream
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// Kafka source configuration
KafkaSource<String> source = KafkaSource.<String>builder()
    .setBootstrapServers("localhost:9092")
    .setTopics("events")
    .setGroupId("flink-consumer")
    .setStartingOffsets(OffsetsInitializer.earliest())
    .setValueOnlyDeserializer(new SimpleStringSchema())
    .build();

// Process unbounded stream
DataStream<String> stream = env.fromSource(
    source,
    WatermarkStrategy.noWatermarks(),
    "Kafka Source"
);

stream
    .map(event -> processEvent(event))
    .filter(event -> event.isValid())
    .print();

env.execute("Unbounded Stream Processing");`
        },
        {
          name: 'Event Time Processing',
          explanation: 'Process events based on their actual occurrence time, not processing time. Watermarks track event-time progress. Handle out-of-order events. Deterministic results regardless of processing speed. Critical for accurate time-based computations. Allowed lateness for late data.',
          codeExample: `// Event time processing with watermarks
public class EventTimeExample {
    public static void main(String[] args) throws Exception {
        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

        // Define watermark strategy
        WatermarkStrategy<Event> watermarkStrategy = WatermarkStrategy
            .<Event>forBoundedOutOfOrderness(Duration.ofSeconds(5))
            .withTimestampAssigner((event, timestamp) -> event.getEventTime());

        DataStream<Event> stream = env
            .fromSource(kafkaSource, watermarkStrategy, "Events")
            .keyBy(Event::getUserId)
            .window(TumblingEventTimeWindows.of(Time.minutes(1)))
            .allowedLateness(Time.seconds(10))
            .process(new EventTimeWindowFunction());

        env.execute("Event Time Processing");
    }
}

class EventTimeWindowFunction extends ProcessWindowFunction<Event, Result, String, TimeWindow> {
    @Override
    public void process(String key, Context context, Iterable<Event> events, Collector<Result> out) {
        long count = 0;
        for (Event event : events) {
            count++;
        }
        out.collect(new Result(key, count, context.window().getStart(), context.window().getEnd()));
    }
}`
        },
        {
          name: 'Exactly-Once Semantics',
          explanation: 'Guarantee each event affects state exactly once. Two-phase commit protocol. Transactional sinks for external systems. State snapshots with barriers. Critical for financial systems. No duplicate processing on failures. Combination of checkpointing and idempotent writes.',
          codeExample: `// Exactly-Once Semantics with Kafka Sink
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// Enable checkpointing for exactly-once
env.enableCheckpointing(60000);
env.getCheckpointConfig().setCheckpointingMode(CheckpointingMode.EXACTLY_ONCE);

DataStream<Transaction> transactions = ...;

// Kafka sink with exactly-once guarantees (two-phase commit)
KafkaSink<Transaction> sink = KafkaSink.<Transaction>builder()
    .setBootstrapServers("localhost:9092")
    .setRecordSerializer(KafkaRecordSerializationSchema.builder()
        .setTopic("processed-transactions")
        .setValueSerializationSchema(new JsonSerializationSchema())
        .build()
    )
    // Enable exactly-once with transactional writes
    .setDeliveryGuarantee(DeliveryGuarantee.EXACTLY_ONCE)
    .setTransactionalIdPrefix("flink-transaction")
    .build();

transactions
    .map(t -> processTransaction(t))
    .sinkTo(sink);

// JDBC sink with exactly-once via XA transactions
JdbcSink.exactlyOnceSink(
    "INSERT INTO transactions (id, amount, timestamp) VALUES (?, ?, ?)",
    (ps, transaction) -> {
        ps.setString(1, transaction.getId());
        ps.setBigDecimal(2, transaction.getAmount());
        ps.setTimestamp(3, transaction.getTimestamp());
    },
    JdbcExecutionOptions.builder()
        .withMaxRetries(3)
        .build(),
    JdbcExactlyOnceOptions.builder()
        .withTransactionPerConnection(true)
        .build(),
    () -> {
        // XA DataSource configuration
        PGXADataSource xaDataSource = new PGXADataSource();
        xaDataSource.setUrl("jdbc:postgresql://localhost:5432/mydb");
        return xaDataSource;
    }
);

env.execute("Exactly-Once Processing");`
        },
        {
          name: 'Windowing',
          explanation: 'Group events into finite sets for processing. Tumbling (fixed, non-overlapping), sliding (fixed, overlapping), session (gap-based) windows. Count, processing-time, event-time windows. Triggers control when windows emit. Evictors remove elements. Custom window logic supported.',
          codeExample: `// Various window types demonstration
// 1. Tumbling Window (non-overlapping, fixed size)
stream
    .keyBy(event -> event.getUserId())
    .window(TumblingEventTimeWindows.of(Time.minutes(5)))
    .sum("amount");

// 2. Sliding Window (overlapping, fixed size and slide)
stream
    .keyBy(event -> event.getUserId())
    .window(SlidingEventTimeWindows.of(Time.minutes(10), Time.minutes(5)))
    .aggregate(new AverageAggregate());

// 3. Session Window (dynamic, based on inactivity gap)
stream
    .keyBy(event -> event.getSessionId())
    .window(EventTimeSessionWindows.withGap(Time.minutes(30)))
    .process(new SessionWindowFunction());

// 4. Count Window
stream
    .keyBy(event -> event.getUserId())
    .countWindow(100) // Window of 100 elements
    .reduce((event1, event2) -> combine(event1, event2));

// 5. Global Window with custom trigger
stream
    .keyBy(event -> event.getKey())
    .window(GlobalWindows.create())
    .trigger(CountTrigger.of(1000))
    .evictor(TimeEvictor.of(Time.seconds(100)))
    .apply(new WindowFunction<...>() { ... });`
        },
        {
          name: 'Complex Event Processing',
          explanation: 'Detect patterns in event streams. CEP library for pattern matching. Sequence detection with timing constraints. State machines for complex patterns. AFTER, FOLLOWED BY, NOT patterns. Pattern groups and iterations. Real-time alerting and monitoring use cases.',
          codeExample: `// Complex Event Processing with Flink CEP
import org.apache.flink.cep.CEP;
import org.apache.flink.cep.PatternStream;
import org.apache.flink.cep.pattern.Pattern;
import org.apache.flink.cep.pattern.conditions.SimpleCondition;

DataStream<Event> events = ...;

// Pattern: Detect login followed by payment within 10 minutes
Pattern<Event, ?> pattern = Pattern.<Event>begin("login")
    .where(new SimpleCondition<Event>() {
        @Override
        public boolean filter(Event event) {
            return event.getType().equals("LOGIN");
        }
    })
    .followedBy("payment")
    .where(new SimpleCondition<Event>() {
        @Override
        public boolean filter(Event event) {
            return event.getType().equals("PAYMENT") && event.getAmount() > 1000;
        }
    })
    .within(Time.minutes(10));

// Apply pattern to stream
PatternStream<Event> patternStream = CEP.pattern(
    events.keyBy(Event::getUserId),
    pattern
);

// Extract matched patterns
DataStream<Alert> alerts = patternStream.select(
    (Map<String, List<Event>> pattern) -> {
        Event login = pattern.get("login").get(0);
        Event payment = pattern.get("payment").get(0);
        return new Alert(login.getUserId(), "High-value payment after login", payment.getAmount());
    }
);

// Complex pattern: Detect fraud (3 failed logins followed by success)
Pattern<LoginEvent, ?> fraudPattern = Pattern.<LoginEvent>begin("failures")
    .where(event -> event.getStatus().equals("FAILED"))
    .times(3).consecutive()
    .followedBy("success")
    .where(event -> event.getStatus().equals("SUCCESS"))
    .within(Time.minutes(5));`
        },
        {
          name: 'Rich Operators',
          explanation: 'Map, FlatMap, Filter, KeyBy, Reduce operations. Windows and time-based operations. Joins (stream-stream, stream-table). CoProcess for multi-input streams. Broadcast state pattern. AsyncIO for external lookups. Process functions for custom logic with state and timers.',
          codeExample: `// Rich Operators demonstration
DataStream<Event> events = ...;

// 1. Map - transform each element
DataStream<String> userIds = events.map(event -> event.getUserId());

// 2. FlatMap - produce 0, 1, or multiple outputs per input
DataStream<String> words = events.flatMap((event, out) -> {
    for (String word : event.getMessage().split(" ")) {
        out.collect(word);
    }
});

// 3. Filter - keep only matching elements
DataStream<Event> highValue = events.filter(event -> event.getAmount() > 1000);

// 4. KeyBy and Reduce
DataStream<Event> maxByUser = events
    .keyBy(Event::getUserId)
    .reduce((e1, e2) -> e1.getAmount() > e2.getAmount() ? e1 : e2);

// 5. Stream-to-stream join (interval join)
DataStream<Order> orders = ...;
DataStream<Payment> payments = ...;

DataStream<OrderPayment> joined = orders
    .keyBy(Order::getOrderId)
    .intervalJoin(payments.keyBy(Payment::getOrderId))
    .between(Time.minutes(-10), Time.minutes(10))
    .process(new ProcessJoinFunction<Order, Payment, OrderPayment>() {
        @Override
        public void processElement(Order order, Payment payment, Context ctx,
                                   Collector<OrderPayment> out) {
            out.collect(new OrderPayment(order, payment));
        }
    });

// 6. CoProcess - process two streams with shared state
DataStream<Control> controls = ...;
events.keyBy(Event::getUserId)
    .connect(controls.keyBy(Control::getUserId))
    .process(new CoProcessFunction<Event, Control, Result>() {
        private ValueState<ControlState> state;

        @Override
        public void processElement1(Event event, Context ctx, Collector<Result> out) {
            // Process events stream
        }

        @Override
        public void processElement2(Control control, Context ctx, Collector<Result> out) {
            // Process control stream
        }
    });

// 7. AsyncIO - async external lookup
AsyncDataStream.unorderedWait(
    events,
    new AsyncDatabaseRequest(),
    1000, TimeUnit.MILLISECONDS,
    100  // capacity
);`
        }
      ]
    },
    {
      id: 'stateful-computing',
      name: 'Stateful Computing',
      icon: '💾',
      color: '#10b981',
      description: 'Managed state with multiple backends, queryable state, broadcast patterns, and TTL management',
      details: [
        {
          name: 'Managed State',
          explanation: 'Flink manages state distribution and checkpointing. ValueState for single values. ListState for lists. MapState for key-value pairs. ReducingState and AggregatingState for incremental aggregations. Per-key state partitioning. Automatic state migration on rebalancing.',
          codeExample: `// Stateful processing with various state types
public class StatefulProcessor extends KeyedProcessFunction<String, Event, Result> {

    // ValueState: stores a single value
    private transient ValueState<Long> countState;

    // ListState: stores a list of values
    private transient ListState<Event> eventsState;

    // MapState: stores key-value pairs
    private transient MapState<String, Double> aggregatesState;

    @Override
    public void open(Configuration parameters) {
        // Initialize ValueState
        ValueStateDescriptor<Long> countDescriptor =
            new ValueStateDescriptor<>("count", Long.class);
        countState = getRuntimeContext().getState(countDescriptor);

        // Initialize ListState
        ListStateDescriptor<Event> eventsDescriptor =
            new ListStateDescriptor<>("events", Event.class);
        eventsState = getRuntimeContext().getListState(eventsDescriptor);

        // Initialize MapState
        MapStateDescriptor<String, Double> aggregatesDescriptor =
            new MapStateDescriptor<>("aggregates", String.class, Double.class);
        aggregatesState = getRuntimeContext().getMapState(aggregatesDescriptor);
    }

    @Override
    public void processElement(Event event, Context ctx, Collector<Result> out) throws Exception {
        // Update ValueState
        Long count = countState.value();
        if (count == null) count = 0L;
        countState.update(count + 1);

        // Update ListState
        eventsState.add(event);

        // Update MapState
        aggregatesState.put(event.getCategory(), event.getValue());

        // Register timer for cleanup
        ctx.timerService().registerEventTimeTimer(event.getTimestamp() + 3600000);
    }
}`
        },
        {
          name: 'State Backends',
          explanation: 'MemoryStateBackend for small state (development). FsStateBackend stores state in filesystem (moderate scale). RocksDBStateBackend for large state (incremental checkpoints). Async snapshotting. Trade-offs between latency and scalability. Pluggable backend architecture.',
          codeExample: `// State Backend Configuration
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// 1. HashMapStateBackend (formerly MemoryStateBackend)
// Best for: Small state, development, testing
env.setStateBackend(new HashMapStateBackend());
env.getCheckpointConfig().setCheckpointStorage("file:///checkpoints");

// 2. EmbeddedRocksDBStateBackend (formerly RocksDBStateBackend)
// Best for: Large state (GBs to TBs), incremental checkpoints
EmbeddedRocksDBStateBackend rocksDBBackend = new EmbeddedRocksDBStateBackend();

// Enable incremental checkpoints (only checkpoint state changes)
rocksDBBackend.enableIncrementalCheckpointing(true);

// Configure RocksDB options
rocksDBBackend.setDbStoragePath("/tmp/rocksdb");
rocksDBBackend.setPredefinedOptions(PredefinedOptions.SPINNING_DISK_OPTIMIZED);
// or: PredefinedOptions.FLASH_SSD_OPTIMIZED

env.setStateBackend(rocksDBBackend);
env.getCheckpointConfig().setCheckpointStorage("s3://my-bucket/checkpoints");

// 3. Custom RocksDB configuration
DBOptions dbOptions = new DBOptions()
    .setMaxBackgroundJobs(4)
    .setMaxOpenFiles(-1);

ColumnFamilyOptions columnOptions = new ColumnFamilyOptions()
    .setCompactionStyle(CompactionStyle.LEVEL)
    .setWriteBufferSize(64 * 1024 * 1024)  // 64 MB
    .setMaxWriteBufferNumber(3)
    .setTargetFileSizeBase(64 * 1024 * 1024);

RocksDBOptionsFactory optionsFactory = new RocksDBOptionsFactory() {
    @Override
    public DBOptions createDBOptions(DBOptions currentOptions, Collection<AutoCloseable> handlesToClose) {
        return dbOptions;
    }

    @Override
    public ColumnFamilyOptions createColumnOptions(ColumnFamilyOptions currentOptions, Collection<AutoCloseable> handlesToClose) {
        return columnOptions;
    }
};

rocksDBBackend.setRocksDBOptions(optionsFactory);`
        },
        {
          name: 'Queryable State',
          explanation: 'Query state from external applications. Expose state over network. Key-based lookups for dashboards. Real-time materialized views. Client API for queries. No impact on processing performance. Alternative to writing state to external database.'
        },
        {
          name: 'Broadcast State',
          explanation: 'Replicate low-volume stream to all parallel instances. Rules, configurations, patterns broadcast to all tasks. Update broadcast state dynamically. Join high-volume stream with broadcast state. MapStateDescriptor for broadcast state. Control stream vs data stream pattern.',
          codeExample: `// Broadcast State Pattern - Dynamic Rules
// Low-volume rule stream broadcasted to all parallel instances
DataStream<Rule> ruleStream = ...;
DataStream<Event> eventStream = ...;

// Descriptor for broadcast state
MapStateDescriptor<String, Rule> ruleStateDescriptor = new MapStateDescriptor<>(
    "RulesBroadcastState",
    String.class,
    Rule.class
);

// Broadcast the rule stream
BroadcastStream<Rule> ruleBroadcastStream = ruleStream
    .broadcast(ruleStateDescriptor);

// Connect data stream with broadcast stream
DataStream<Alert> alerts = eventStream
    .keyBy(Event::getUserId)
    .connect(ruleBroadcastStream)
    .process(new BroadcastProcessFunction<String, Event, Rule, Alert>() {

        @Override
        public void processElement(Event event, ReadOnlyContext ctx, Collector<Alert> out) throws Exception {
            // Access broadcast state (read-only in processElement)
            ReadOnlyBroadcastState<String, Rule> rules = ctx.getBroadcastState(ruleStateDescriptor);

            // Apply all rules to the event
            for (Map.Entry<String, Rule> entry : rules.immutableEntries()) {
                Rule rule = entry.getValue();
                if (rule.matches(event)) {
                    out.collect(new Alert(event, rule));
                }
            }
        }

        @Override
        public void processBroadcastElement(Rule rule, Context ctx, Collector<Alert> out) throws Exception {
            // Update broadcast state (can write in processBroadcastElement)
            BroadcastState<String, Rule> rules = ctx.getBroadcastState(ruleStateDescriptor);

            if (rule.isActive()) {
                // Add or update rule
                rules.put(rule.getId(), rule);
            } else {
                // Remove rule
                rules.remove(rule.getId());
            }
        }
    });

// Use case: Fraud detection with dynamic rules
// Rule stream updates fraud patterns in real-time
// Event stream applies latest rules to detect fraud`
        },
        {
          name: 'State TTL',
          explanation: 'Automatically clean up expired state. Configure time-to-live per state descriptor. Full or incremental cleanup strategies. Background cleanup in RocksDB. Prevents unbounded state growth. Configurable update and visibility semantics. Memory management for long-running jobs.',
          codeExample: `// State TTL Configuration
public class StateTTLExample extends KeyedProcessFunction<String, Event, Result> {

    private ValueState<Long> countState;
    private ListState<Event> recentEvents;

    @Override
    public void open(Configuration parameters) {
        // Configure TTL - state expires after 1 hour of inactivity
        StateTtlConfig ttlConfig = StateTtlConfig
            .newBuilder(Time.hours(1))
            // Update TTL on creation and write
            .setUpdateType(StateTtlConfig.UpdateType.OnCreateAndWrite)
            // Never return expired state
            .setStateVisibility(StateTtlConfig.StateVisibility.NeverReturnExpired)
            // Cleanup strategy
            .cleanupFullSnapshot()  // Clean on full snapshot
            .cleanupIncrementally(1000, true)  // Incremental cleanup
            .build();

        // Apply TTL to ValueState
        ValueStateDescriptor<Long> countDescriptor = new ValueStateDescriptor<>(
            "count-state",
            Long.class
        );
        countDescriptor.enableTimeToLive(ttlConfig);
        countState = getRuntimeContext().getState(countDescriptor);

        // TTL config for ListState with RocksDB compaction cleanup
        StateTtlConfig listTtlConfig = StateTtlConfig
            .newBuilder(Time.days(7))
            .setUpdateType(StateTtlConfig.UpdateType.OnReadAndWrite)
            .setStateVisibility(StateTtlConfig.StateVisibility.ReturnExpiredIfNotCleanedUp)
            .cleanupInRocksdbCompactFilter(1000)  // Cleanup during RocksDB compaction
            .build();

        ListStateDescriptor<Event> eventsDescriptor = new ListStateDescriptor<>(
            "events-state",
            Event.class
        );
        eventsDescriptor.enableTimeToLive(listTtlConfig);
        recentEvents = getRuntimeContext().getListState(eventsDescriptor);
    }

    @Override
    public void processElement(Event event, Context ctx, Collector<Result> out) throws Exception {
        // State automatically cleaned up when expired
        Long count = countState.value();
        if (count == null) count = 0L;
        countState.update(count + 1);

        recentEvents.add(event);
    }
}`
        },
        {
          name: 'Savepoints',
          explanation: 'Manually triggered snapshots for versioning. Upgrade applications with state migration. A/B testing with state forking. State evolution with serializer upgrades. Relocate jobs across clusters. Debug production issues. Externalized state for disaster recovery.'
        }
      ]
    },
    {
      id: 'fault-tolerance',
      name: 'Fault Tolerance',
      icon: '🛡️',
      color: '#8b5cf6',
      description: 'Distributed snapshots with checkpointing, Chandy-Lamport algorithm, and fast recovery mechanisms',
      details: [
        {
          name: 'Checkpointing',
          explanation: 'Periodic snapshots of application state. Distributed snapshots across all tasks. Configurable interval (e.g., 60 seconds). Alignment of barriers across inputs. Persistent storage (HDFS, S3). Recovery from checkpoint on failure. Minimal impact on throughput.',
          codeExample: `// Configuring checkpointing for fault tolerance
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// Enable checkpointing every 60 seconds
env.enableCheckpointing(60000);

// Checkpoint configuration
CheckpointConfig config = env.getCheckpointConfig();

// Set checkpointing mode (EXACTLY_ONCE or AT_LEAST_ONCE)
config.setCheckpointingMode(CheckpointingMode.EXACTLY_ONCE);

// Minimum time between checkpoints (pause between checkpoints)
config.setMinPauseBetweenCheckpoints(30000);

// Checkpoint timeout
config.setCheckpointTimeout(600000);

// Allow only one checkpoint to be in progress at the same time
config.setMaxConcurrentCheckpoints(1);

// Enable externalized checkpoints (retained after job cancellation)
config.enableExternalizedCheckpoints(
    CheckpointConfig.ExternalizedCheckpointCleanup.RETAIN_ON_CANCELLATION
);

// Checkpoint storage location (S3, HDFS, etc.)
config.setCheckpointStorage("s3://my-bucket/checkpoints");

// Enable unaligned checkpoints for faster checkpointing
config.enableUnalignedCheckpoints();

// State backend configuration
env.setStateBackend(new HashMapStateBackend());
// Or for large state:
// env.setStateBackend(new EmbeddedRocksDBStateBackend());`
        },
        {
          name: 'Chandy-Lamport Algorithm',
          explanation: 'Distributed snapshot algorithm for stream processing. Barriers flow with data through DAG. Snapshot taken when barrier reaches operator. Consistent global state without stopping processing. Handles multiple input streams. Foundation for exactly-once semantics.'
        },
        {
          name: 'Recovery Mechanism',
          explanation: 'Restore state from latest checkpoint. Rewind source offsets (Kafka, Kinesis). Replay events since checkpoint. Coordinate recovery across tasks. Restart strategies: fixed delay, exponential backoff, failure rate. Regional and global failover. Minimal data loss.'
        },
        {
          name: 'Incremental Checkpoints',
          explanation: 'Only snapshot state changes since last checkpoint. Dramatically reduces checkpoint size. RocksDB backend support. Faster checkpoints for large state. Lower storage costs. Asynchronous materialization. Critical for terabyte-scale state.'
        },
        {
          name: 'Unaligned Checkpoints',
          explanation: 'Skip barrier alignment for faster checkpoints. Reduce back-pressure during checkpointing. Include in-flight data in snapshot. Lower checkpoint latency. Trade storage for speed. Useful for high-throughput pipelines with skew.'
        },
        {
          name: 'Recovery Time',
          explanation: 'Fast recovery with distributed restore. Parallel state loading from checkpoint. Local recovery from TaskManager disk. Rescale jobs during recovery. Checkpoint retention policies. RTO and RPO guarantees. Minimize downtime.'
        }
      ]
    },
    {
      id: 'table-sql',
      name: 'Table API & SQL',
      icon: '📊',
      color: '#ef4444',
      description: 'Unified batch and streaming with ANSI SQL, catalogs, continuous queries, and optimization',
      details: [
        {
          name: 'Unified Batch & Stream',
          explanation: 'Single API for batch and streaming. Bounded tables (batch) and unbounded tables (streaming). Automatic mode detection. Unified semantics across modes. Append, retract, upsert modes. Dynamic tables continuously updated. SQL queries on streams.'
        },
        {
          name: 'ANSI SQL Support',
          explanation: 'Standard SQL syntax for stream processing. SELECT, WHERE, JOIN, GROUP BY, OVER windows. Temporal table joins for dimension lookups. Deduplication with ROW_NUMBER. Top-N queries. User-defined functions (UDF, UDAF, UDTF). SQL DDL for table creation.',
          codeExample: `// Table API & SQL examples
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
StreamTableEnvironment tableEnv = StreamTableEnvironment.create(env);

// 1. Create table from Kafka
tableEnv.executeSql(
    "CREATE TABLE transactions ( " +
    "  user_id STRING, " +
    "  amount DECIMAL(10, 2), " +
    "  transaction_time TIMESTAMP(3), " +
    "  WATERMARK FOR transaction_time AS transaction_time - INTERVAL '5' SECOND " +
    ") WITH ( " +
    "  'connector' = 'kafka', " +
    "  'topic' = 'transactions', " +
    "  'properties.bootstrap.servers' = 'localhost:9092', " +
    "  'format' = 'json' " +
    ")"
);

// 2. Windowed aggregation query
Table result = tableEnv.sqlQuery(
    "SELECT " +
    "  user_id, " +
    "  TUMBLE_START(transaction_time, INTERVAL '1' HOUR) as window_start, " +
    "  SUM(amount) as total_amount, " +
    "  COUNT(*) as transaction_count " +
    "FROM transactions " +
    "GROUP BY user_id, TUMBLE(transaction_time, INTERVAL '1' HOUR)"
);

// 3. Top-N query (top 5 users by transaction amount)
tableEnv.executeSql(
    "CREATE VIEW top_users AS " +
    "SELECT * FROM ( " +
    "  SELECT *, " +
    "    ROW_NUMBER() OVER (PARTITION BY window_start ORDER BY total_amount DESC) as rank " +
    "  FROM hourly_aggregates " +
    ") WHERE rank <= 5"
);

// 4. Stream-to-stream join
tableEnv.executeSql(
    "SELECT o.order_id, o.amount, p.payment_method " +
    "FROM orders o " +
    "JOIN payments p ON o.order_id = p.order_id " +
    "WHERE o.order_time BETWEEN p.payment_time - INTERVAL '10' MINUTE AND p.payment_time"
);`
        },
        {
          name: 'Catalogs & Connectors',
          explanation: 'Catalog API for metadata management. Hive Metastore integration. Table schemas and configurations. File, JDBC, Kafka, Elasticsearch connectors. Format support: JSON, Avro, Parquet, ORC. Automatic schema inference. Dynamic table options.'
        },
        {
          name: 'Table Ecosystem',
          explanation: 'Python, Java, Scala Table API. Pyflink for Python data scientists. Pandas integration. Jupyter notebook support. Table descriptors and environments. Convert between DataStream and Table. Hybrid pipelines.'
        },
        {
          name: 'Continuous Queries',
          explanation: 'Long-running SQL queries on streams. Results continuously updated. Changelog streams with retractions. Upsert semantics for point queries. Windowed aggregations. Temporal patterns with MATCH_RECOGNIZE. Real-time materialized views.'
        },
        {
          name: 'Query Optimization',
          explanation: 'Volcano/Cascades optimizer for SQL. Rule-based and cost-based optimization. Predicate pushdown. Join reordering. Operator fusion. Statistics-based optimization. Explain plan for debugging. Incremental aggregation optimization.'
        }
      ]
    },
    {
      id: 'deployment',
      name: 'Deployment & Scaling',
      icon: '🚀',
      color: '#f59e0b',
      description: 'Flexible deployment options with dynamic scaling, resource management, HA, and Kubernetes integration',
      details: [
        {
          name: 'Flexible Deployment',
          explanation: 'Standalone cluster mode. YARN for Hadoop environments. Kubernetes native deployment. Mesos support. Session vs per-job vs application mode. Run on-premise or cloud (AWS, GCP, Azure). Docker containers. Embedded mode for testing.'
        },
        {
          name: 'Dynamic Scaling',
          explanation: 'Rescale jobs without downtime. Savepoint → stop → change parallelism → restore. Reactive mode auto-scales based on available resources. Key groups enable rescaling keyed state. Rebalance partitions. Kubernetes HPA integration. Elastic resource allocation.'
        },
        {
          name: 'Resource Management',
          explanation: 'TaskManager and JobManager architecture. Slot sharing for efficiency. Task chaining reduces network overhead. Memory configuration: heap, off-heap, network buffers. CPU and memory profiles. Resource isolation. Workload-specific tuning.'
        },
        {
          name: 'High Availability',
          explanation: 'Multiple JobManager instances with ZooKeeper. Leader election for active JobManager. TaskManager failure recovery. Checkpointing for state recovery. Region-based failover for localized failures. Split-brain prevention. Application master HA on YARN.'
        },
        {
          name: 'Monitoring & Metrics',
          explanation: 'REST API for job metrics. Prometheus, Grafana integration. Throughput, latency, backpressure metrics. Checkpoint statistics. Memory and CPU usage. Watermark monitoring. Web UI for visualization. Custom metrics reporters.'
        },
        {
          name: 'Kubernetes Native',
          explanation: 'Native Kubernetes deployment mode. Dynamic resource allocation. Pod templates for customization. Service accounts and RBAC. ConfigMaps for configuration. Persistent volume claims for checkpoints. Operator for complex deployments. Multi-tenancy support.'
        }
      ]
    },
    {
      id: 'connectors',
      name: 'Connectors & Integration',
      icon: '🔌',
      color: '#14b8a6',
      description: 'Rich ecosystem of connectors for Kafka, filesystems, databases, AWS services, and custom integration',
      details: [
        {
          name: 'Apache Kafka',
          explanation: 'First-class Kafka connector. Exactly-once semantics with transactional producers. Dynamic partition discovery. Watermark generation from Kafka timestamps. Consumer group offsets. Avro schema registry integration. Kafka 0.10+ support. High throughput optimizations.',
          codeExample: `// Advanced Kafka Source and Sink Configuration
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

// Kafka Source with all features
KafkaSource<Order> kafkaSource = KafkaSource.<Order>builder()
    .setBootstrapServers("kafka1:9092,kafka2:9092,kafka3:9092")
    .setTopics("orders", "returns")  // Multiple topics
    .setGroupId("flink-consumer-group")
    .setStartingOffsets(OffsetsInitializer.committedOffsets(OffsetResetStrategy.EARLIEST))
    .setDeserializer(KafkaRecordDeserializationSchema.of(new OrderDeserializer()))
    .setProperty("partition.discovery.interval.ms", "60000")  // Dynamic partition discovery
    .setProperty("commit.offsets.on.checkpoint", "true")
    .build();

// Watermark strategy from Kafka timestamp
WatermarkStrategy<Order> watermarkStrategy = WatermarkStrategy
    .<Order>forBoundedOutOfOrderness(Duration.ofSeconds(20))
    .withTimestampAssigner((order, recordTimestamp) -> order.getTimestamp())
    .withIdleness(Duration.ofMinutes(1));

DataStream<Order> orders = env.fromSource(
    kafkaSource,
    watermarkStrategy,
    "Kafka Orders Source"
);

// Process orders
DataStream<OrderResult> processed = orders
    .keyBy(Order::getCustomerId)
    .window(TumblingEventTimeWindows.of(Time.hours(1)))
    .aggregate(new OrderAggregator());

// Kafka Sink with exactly-once
KafkaSink<OrderResult> kafkaSink = KafkaSink.<OrderResult>builder()
    .setBootstrapServers("kafka1:9092,kafka2:9092,kafka3:9092")
    .setRecordSerializer(KafkaRecordSerializationSchema.<OrderResult>builder()
        .setTopic("processed-orders")
        .setKeySerializationSchema(new SimpleStringSchema())
        .setValueSerializationSchema(new JsonSerializationSchema<>())
        .build()
    )
    .setDeliveryGuarantee(DeliveryGuarantee.EXACTLY_ONCE)
    .setTransactionalIdPrefix("flink-txn")
    .setProperty("transaction.timeout.ms", "900000")
    .build();

processed.sinkTo(kafkaSink);

env.execute("Kafka Integration Example");`
        },
        {
          name: 'File Systems',
          explanation: 'HDFS, S3, Azure Blob storage connectors. Parquet, ORC, Avro, CSV formats. Streaming file monitoring with continuous ingestion. Bucketing for exactly-once file sinks. Rolling policies for file rotation. Partition pruning. Compaction strategies.'
        },
        {
          name: 'Databases',
          explanation: 'JDBC connector for relational databases. Change Data Capture (CDC) connectors: Debezium, Canal. Elasticsearch for search and analytics. MongoDB, Cassandra connectors. HBase integration. Upsert mode for databases. Connection pooling. Batch writes.'
        },
        {
          name: 'AWS Services',
          explanation: 'Kinesis Data Streams source and sink. DynamoDB sink. S3 StreamingFileSink. AWS SDK authentication. IAM role support. Enhanced fan-out for Kinesis. Cross-region replication. Glue catalog integration. EMR deployment.'
        },
        {
          name: 'Message Queues',
          explanation: 'RabbitMQ, Pulsar connectors. JMS support for enterprise messaging. MQTT for IoT scenarios. NATS connector. Exactly-once delivery guarantees. Queue discovery. Message acknowledgment strategies. Dead letter queues.'
        },
        {
          name: 'Custom Connectors',
          explanation: 'Implement SourceFunction or SinkFunction interfaces. RichFunction for initialization. Async I/O for external lookups. Table connector SDK for Table API. FLIP-27 source interface. Watermark strategies. Exactly-once sink implementation patterns.'
        }
      ]
    },
    {
      id: 'performance',
      name: 'Performance & Optimization',
      icon: '⚡',
      color: '#6366f1',
      description: 'Advanced performance features including pipelined execution, memory management, and operator chaining',
      details: [
        {
          name: 'Pipelined Execution',
          explanation: 'Streaming execution without batch boundaries. Data flows through operators without materialization. Lower latency than batch. Credit-based flow control for back-pressure. Network buffers for efficiency. No disk spilling in streaming mode.'
        },
        {
          name: 'Memory Management',
          explanation: 'Off-heap memory management with Flink-managed memory. Binary format in memory. Sorting and hashing without JVM heap. Prevents OutOfMemoryErrors. Spill to disk for large state. Memory pools. Garbage collection reduction. RocksDB memory integration.'
        },
        {
          name: 'Network Stack',
          explanation: 'Netty-based network communication. Zero-copy network transfers. Network buffer tuning. Compression for network traffic. Batch shuffle for batch jobs. Credit-based flow control prevents buffer bloat. SSL/TLS encryption. Network bandwidth management.'
        },
        {
          name: 'Operator Chaining',
          explanation: 'Combine multiple operators into single task. Reduce serialization overhead. Function calls instead of network. Parallel execution in single thread. Disable for debugging. Start new chain for specific operators. Slot sharing groups.'
        },
        {
          name: 'Batch Processing Mode',
          explanation: 'Optimized execution for bounded data. Sort-based aggregations and joins. Blocking shuffles for efficiency. Adaptive query execution. Statistics-based optimization. Hash joins vs sort-merge joins. Memory budget allocation. Batch vs streaming trade-offs.'
        },
        {
          name: 'Benchmarks',
          explanation: 'Industry-leading performance. Yahoo Streaming Benchmark results. TPC-DS for SQL performance. Nexmark benchmark for streaming auctions. Lower latency than alternatives. High throughput sustained. Stateful streaming at scale. Terabyte-scale state management.'
        }
      ]
    },
    {
      id: 'use-cases',
      name: 'Use Cases & Applications',
      icon: '🎯',
      color: '#ec4899',
      description: 'Real-world applications from real-time analytics to fraud detection, IoT processing, and recommendations',
      details: [
        {
          name: 'Real-time Analytics',
          explanation: 'Streaming dashboards and KPIs. Aggregations over tumbling/sliding windows. Real-time reports and alerts. Business intelligence on fresh data. Customer behavior analytics. Application performance monitoring. Ad-hoc queries on streams with SQL.'
        },
        {
          name: 'ETL Pipelines',
          explanation: 'Extract-Transform-Load for data lakes and warehouses. Streaming ingestion from multiple sources. Data cleansing and enrichment. Schema evolution and validation. Compaction and deduplication. Incremental updates to data warehouse. Medallion architecture (bronze/silver/gold).'
        },
        {
          name: 'Fraud Detection',
          explanation: 'Real-time transaction monitoring. Pattern detection with CEP. Machine learning model scoring. Rule engines for complex logic. Risk scoring and alerting. Multi-level aggregations. Session-based analysis. Low-latency requirements (milliseconds).',
          codeExample: `// Real-time Fraud Detection System
import org.apache.flink.cep.*;
import org.apache.flink.cep.pattern.Pattern;
import org.apache.flink.cep.pattern.conditions.SimpleCondition;

StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

DataStream<Transaction> transactions = env
    .fromSource(kafkaSource, WatermarkStrategy.forMonotonousTimestamps(), "Transactions");

// Rule 1: Velocity check - Multiple transactions in short time
DataStream<Alert> velocityAlerts = transactions
    .keyBy(Transaction::getCardNumber)
    .window(SlidingEventTimeWindows.of(Time.minutes(5), Time.minutes(1)))
    .aggregate(new AggregateFunction<Transaction, VelocityAccumulator, VelocityResult>() {
        // Count transactions and total amount in window
    })
    .filter(result -> result.getCount() > 10 || result.getTotalAmount() > 10000)
    .map(result -> new Alert("VELOCITY", result, "High transaction velocity"));

// Rule 2: Geographic anomaly - Transactions from different locations
Pattern<Transaction, ?> geoPattern = Pattern.<Transaction>begin("first")
    .where(new SimpleCondition<Transaction>() {
        @Override
        public boolean filter(Transaction txn) { return true; }
    })
    .followedBy("second")
    .where(new SimpleCondition<Transaction>() {
        @Override
        public boolean filter(Transaction txn) { return true; }
    })
    .within(Time.hours(1));

DataStream<Alert> geoAlerts = CEP.pattern(
    transactions.keyBy(Transaction::getCardNumber),
    geoPattern
).select((Map<String, List<Transaction>> pattern) -> {
    Transaction first = pattern.get("first").get(0);
    Transaction second = pattern.get("second").get(0);
    double distance = calculateDistance(first.getLocation(), second.getLocation());
    if (distance > 100) {  // 100 km
        return new Alert("GEO_ANOMALY", second, "Impossible travel detected");
    }
    return null;
}).filter(alert -> alert != null);

// Rule 3: ML Model Scoring with AsyncIO
AsyncDataStream.unorderedWait(
    transactions,
    new AsyncFunction<Transaction, ScoredTransaction>() {
        @Override
        public void asyncInvoke(Transaction txn, ResultFuture<ScoredTransaction> resultFuture) {
            // Call ML model service asynchronously
            mlModelClient.scoreAsync(txn)
                .thenAccept(score -> resultFuture.complete(
                    Collections.singleton(new ScoredTransaction(txn, score))
                ));
        }
    },
    1000, TimeUnit.MILLISECONDS
)
.filter(scored -> scored.getRiskScore() > 0.8)
.map(scored -> new Alert("ML_MODEL", scored.getTransaction(), "High risk score: " + scored.getRiskScore()));

// Combine all alert streams
DataStream<Alert> allAlerts = velocityAlerts
    .union(geoAlerts)
    .union(mlAlerts);

// Aggregate and deduplicate alerts
allAlerts
    .keyBy(Alert::getTransactionId)
    .window(TumblingEventTimeWindows.of(Time.minutes(1)))
    .reduce((a1, a2) -> a1)  // Dedup
    .sinkTo(alertSink);

env.execute("Fraud Detection");`
        },
        {
          name: 'IoT & Sensors',
          explanation: 'Process telemetry from millions of devices. Time-series aggregations. Anomaly detection on sensor data. Predictive maintenance. Device state management. Geo-spatial processing. Protocol conversion (MQTT, CoAP). Edge computing integration.'
        },
        {
          name: 'Recommendation Engines',
          explanation: 'Real-time personalization. Feature engineering on user behavior. Online model inference. A/B testing analytics. Collaborative filtering. Content-based recommendations. Session-based recommendations. Contextual bandits with online learning.'
        }
      ]
    }
  ]

  return (
    <div style={{ padding: '2rem', maxWidth: '1600px', margin: '0 auto' }}>
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
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            ← Back to Menu
          </button>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#1f2937',
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              🌊 Apache Flink
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

      <p style={{
        fontSize: '1.2rem',
        color: '#4b5563',
        textAlign: 'center',
        marginBottom: '3rem',
        lineHeight: '1.8'
      }}>
        Stream processing framework for real-time data analytics and event-driven applications. Covers stateful computations,
        event time processing, windowing, checkpointing, fault tolerance, Table API & SQL, deployment strategies, and connectors.
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
                ← Back to All Concepts
              </button>
              {concepts.map((concept) => (
                <div
                  key={concept.id}
                  onClick={() => setSelectedConcept(concept)}
                  style={{
                    padding: '1rem',
                    backgroundColor: selectedConcept.id === concept.id ? concept.color + '20' : '#f9fafb',
                    border: `2px solid ${selectedConcept.id === concept.id ? concept.color : '#e5e7eb'}`,
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
                      e.currentTarget.style.backgroundColor = '#f9fafb'
                      e.currentTarget.style.borderColor = '#e5e7eb'
                    }
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{concept.icon}</div>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#1f2937'
                  }}>
                    {concept.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Main content */}
            <div>
              <div style={{
                backgroundColor: selectedConcept.color + '10',
                padding: '2rem',
                borderRadius: '12px',
                border: `3px solid ${selectedConcept.color}40`,
                marginBottom: '2rem'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{selectedConcept.icon}</div>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  {selectedConcept.name}
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#4b5563',
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
                      backgroundColor: 'white',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: `2px solid ${selectedConcept.color}30`,
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
                        color: '#1f2937',
                        margin: 0
                      }}>
                        {detail.name}
                      </h3>
                    </div>
                    <p style={{
                      fontSize: '1rem',
                      color: '#4b5563',
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
                backgroundColor: concept.color + '10',
                padding: '2rem',
                borderRadius: '12px',
                border: `3px solid ${concept.color}40`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{concept.icon}</div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '0.75rem'
              }}>
                {concept.name}
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#4b5563',
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
  )
}

export default ApacheFlink

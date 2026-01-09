import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function ApacheFlinkQuestions({ onBack, breadcrumb }) {
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
      question: 'What is Apache Flink and how does it differ from Apache Spark?',
      answer: `**What is Apache Flink?**
- Distributed stream processing framework
- True streaming (not micro-batching)
- Event-time processing with watermarks
- Exactly-once state consistency
- Low latency (<100ms) processing

**Key Features:**
- Unified batch and stream processing
- Stateful computations with managed state
- Event-time processing and windowing
- Fault tolerance via checkpointing
- High throughput and low latency

**Flink vs Spark Streaming:**

\`\`\`
Apache Flink:
├── True streaming (one-at-a-time processing)
├── Native event-time support
├── Lower latency (<100ms)
├── Stateful stream processing built-in
└── Better for real-time applications

Apache Spark Streaming:
├── Micro-batching (mini-batch processing)
├── Processing time focused
├── Higher latency (seconds)
├── Stateful operations via updateStateByKey
└── Better for batch analytics
\`\`\`

**Processing Model Comparison:**

\`\`\`java
// Flink - Continuous streaming
DataStream<Event> stream = env.fromSource(kafkaSource, ...);
stream
    .keyBy(Event::getUserId)
    .process(new ProcessFunction<Event, Result>() {
        // Process each event as it arrives
    });

// Spark - Micro-batching
JavaDStream<Event> stream = jssc.receiverStream(kafkaReceiver);
stream.window(Durations.seconds(1))  // 1-second batches
    .foreachRDD(rdd -> {
        // Process batch of events
    });
\`\`\`

**Event Time vs Processing Time:**

\`\`\`
Event Time (Flink):
Event 1 (t=10:00:00) → arrives at 10:00:05 → processed with timestamp 10:00:00
Event 2 (t=10:00:02) → arrives at 10:00:06 → processed with timestamp 10:00:02
Result: Correct ordering based on event occurrence time

Processing Time (Spark):
Event 1 → arrives at 10:00:05 → processed with timestamp 10:00:05
Event 2 → arrives at 10:00:06 → processed with timestamp 10:00:06
Result: Ordering based on arrival time (may be incorrect)
\`\`\`

**Use Cases:**

**Flink Best For:**
- Real-time fraud detection (low latency required)
- Complex event processing (CEP)
- Streaming ETL with event-time guarantees
- Real-time recommendations
- Financial transaction processing

**Spark Best For:**
- Batch analytics on historical data
- Machine learning workflows
- SQL analytics on large datasets
- Applications with second-level latency tolerance

**State Management:**

\`\`\`java
// Flink - Rich state management
public class FlinkStatefulFunction extends KeyedProcessFunction<String, Event, Result> {
    private ValueState<Long> countState;
    private ListState<Event> recentEvents;

    @Override
    public void open(Configuration parameters) {
        ValueStateDescriptor<Long> descriptor =
            new ValueStateDescriptor<>("count", Long.class);
        countState = getRuntimeContext().getState(descriptor);
    }

    @Override
    public void processElement(Event event, Context ctx, Collector<Result> out) {
        Long count = countState.value();
        countState.update(count == null ? 1 : count + 1);
    }
}

// Spark - updateStateByKey
JavaPairDStream<String, Integer> stateDstream = stream
    .mapToPair(event -> new Tuple2<>(event.getKey(), 1))
    .updateStateByKey((values, state) -> {
        int sum = state.or(0);
        for (int value : values) {
            sum += value;
        }
        return Optional.of(sum);
    });
\`\`\`

**Performance Characteristics:**

| Feature | Apache Flink | Apache Spark Streaming |
|---------|-------------|----------------------|
| Latency | Sub-second (< 100ms) | Seconds |
| Throughput | Very High | Very High |
| Processing Model | Streaming-first | Batch-first |
| State Management | Native, rich | Limited |
| Event Time | Native support | Limited support |
| Exactly-Once | Yes (built-in) | Yes (with checkpointing) |

**When to Choose Flink:**
- Need true low-latency streaming (< 1 second)
- Require event-time processing
- Complex stateful computations
- Need exactly-once guarantees with low latency
- Stream-first architecture`
    },
    {
      id: 2,
      category: 'State Management',
      question: 'Explain Flink\'s state management and different types of state',
      answer: `**Flink State Management:**
- Managed by Flink runtime
- Fault-tolerant via checkpointing
- Scalable across parallel tasks
- Queryable from external applications

**Types of State:**

**1. Keyed State:**
- Associated with keys from keyBy() operation
- Partitioned across parallel instances
- Each parallel task has subset of keys

**Available Keyed State Types:**

\`\`\`java
public class StatefulProcessor extends KeyedProcessFunction<String, Event, Result> {

    // 1. ValueState - Single value per key
    private ValueState<Long> countState;

    // 2. ListState - List of values per key
    private ListState<Event> eventsState;

    // 3. MapState - Map of key-value pairs
    private MapState<String, Double> metricsState;

    // 4. ReducingState - Aggregated value
    private ReducingState<Long> sumState;

    // 5. AggregatingState - Custom aggregation
    private AggregatingState<Event, Double> avgState;

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
        MapStateDescriptor<String, Double> metricsDescriptor =
            new MapStateDescriptor<>("metrics", String.class, Double.class);
        metricsState = getRuntimeContext().getMapState(metricsDescriptor);
    }

    @Override
    public void processElement(Event event, Context ctx, Collector<Result> out) {
        // Use ValueState
        Long count = countState.value();
        if (count == null) count = 0L;
        countState.update(count + 1);

        // Use ListState
        eventsState.add(event);

        // Use MapState
        metricsState.put(event.getMetricName(), event.getValue());

        // Register timer for cleanup
        ctx.timerService().registerEventTimeTimer(
            event.getTimestamp() + 3600000  // 1 hour TTL
        );
    }

    @Override
    public void onTimer(long timestamp, OnTimerContext ctx, Collector<Result> out) {
        // Cleanup expired state
        countState.clear();
        eventsState.clear();
    }
}
\`\`\`

**2. Operator State:**
- Associated with parallel operator instance
- Not partitioned by key
- Used for sources/sinks

\`\`\`java
public class CustomSource implements SourceFunction<Event>, CheckpointedFunction {
    private transient ListState<Long> offsetState;
    private long offset = 0;

    @Override
    public void initializeState(FunctionInitializationContext context) {
        ListStateDescriptor<Long> descriptor =
            new ListStateDescriptor<>("offset", Long.class);
        offsetState = context.getOperatorStateStore().getListState(descriptor);

        // Restore state after failure
        if (context.isRestored()) {
            for (Long restoredOffset : offsetState.get()) {
                offset = restoredOffset;
            }
        }
    }

    @Override
    public void snapshotState(FunctionSnapshotContext context) {
        offsetState.clear();
        offsetState.add(offset);
    }
}
\`\`\`

**State Backends:**

**1. HashMapStateBackend (MemoryStateBackend):**
\`\`\`java
// Small state, development
env.setStateBackend(new HashMapStateBackend());
env.getCheckpointConfig().setCheckpointStorage("file:///checkpoints");

// Characteristics:
// - State in JVM heap
// - Fast access
// - Limited by memory
// - Good for: Development, small state (< 100 MB)
\`\`\`

**2. EmbeddedRocksDBStateBackend:**
\`\`\`java
// Large state, production
EmbeddedRocksDBStateBackend rocksDB = new EmbeddedRocksDBStateBackend();
rocksDB.enableIncrementalCheckpointing(true);

env.setStateBackend(rocksDB);
env.getCheckpointConfig().setCheckpointStorage("s3://bucket/checkpoints");

// Characteristics:
// - State on disk (RocksDB)
// - Incremental checkpointing
// - Can handle TBs of state
// - Good for: Production, large state
\`\`\`

**State TTL (Time-To-Live):**

\`\`\`java
StateTtlConfig ttlConfig = StateTtlConfig
    .newBuilder(Time.hours(1))  // Expire after 1 hour
    .setUpdateType(StateTtlConfig.UpdateType.OnCreateAndWrite)
    .setStateVisibility(StateTtlConfig.StateVisibility.NeverReturnExpired)
    .cleanupFullSnapshot()
    .cleanupIncrementally(1000, true)
    .build();

ValueStateDescriptor<String> descriptor =
    new ValueStateDescriptor<>("user-session", String.class);
descriptor.enableTimeToLive(ttlConfig);

ValueState<String> state = getRuntimeContext().getState(descriptor);
\`\`\`

**Queryable State:**
- Access state from external applications
- No impact on processing

\`\`\`java
// Mark state as queryable
ValueStateDescriptor<Long> descriptor =
    new ValueStateDescriptor<>("count", Long.class);
descriptor.setQueryable("user-counts");  // Expose for queries

// Query from external app
QueryableStateClient client = new QueryableStateClient(host, port);
CompletableFuture<ValueState<Long>> resultFuture =
    client.getKvState(
        jobId,
        "user-counts",
        "user-123",
        BasicTypeInfo.STRING_TYPE_INFO,
        new ValueStateDescriptor<>("count", Long.class)
    );

Long count = resultFuture.get().value();
\`\`\`

**Broadcast State:**
- Replicate state to all parallel instances
- Join low-volume stream with high-volume stream

\`\`\`java
// Low-volume rule stream
DataStream<Rule> ruleStream = ...;

MapStateDescriptor<String, Rule> ruleDescriptor =
    new MapStateDescriptor<>("rules", String.class, Rule.class);

BroadcastStream<Rule> broadcastRules = ruleStream.broadcast(ruleDescriptor);

// High-volume data stream
DataStream<Event> events = ...;

events
    .keyBy(Event::getUserId)
    .connect(broadcastRules)
    .process(new BroadcastProcessFunction<String, Event, Rule, Alert>() {
        @Override
        public void processElement(Event event, ReadOnlyContext ctx,
                                   Collector<Alert> out) {
            // Read broadcast state (read-only)
            ReadOnlyBroadcastState<String, Rule> rules =
                ctx.getBroadcastState(ruleDescriptor);

            // Apply rules to event
            for (Map.Entry<String, Rule> entry : rules.immutableEntries()) {
                if (entry.getValue().matches(event)) {
                    out.collect(new Alert(event, entry.getValue()));
                }
            }
        }

        @Override
        public void processBroadcastElement(Rule rule, Context ctx,
                                           Collector<Alert> out) {
            // Update broadcast state (can write)
            BroadcastState<String, Rule> rules =
                ctx.getBroadcastState(ruleDescriptor);
            rules.put(rule.getId(), rule);
        }
    });
\`\`\`

**Best Practices:**
- Use RocksDB for production (large state)
- Enable incremental checkpointing
- Configure state TTL to prevent unbounded growth
- Monitor state size and checkpoint duration
- Choose appropriate state type for use case`
    },
    {
      id: 3,
      category: 'Windowing',
      question: 'Explain different types of windows in Flink and when to use each',
      answer: `**Flink Windowing:**
- Group unbounded streams into finite chunks
- Apply computations on bounded sets
- Event-time or processing-time based

**Window Types:**

**1. Tumbling Windows:**
- Fixed size, non-overlapping
- Each event belongs to exactly one window

\`\`\`java
// Tumbling Event-Time Window (5 minutes)
stream
    .keyBy(Event::getUserId)
    .window(TumblingEventTimeWindows.of(Time.minutes(5)))
    .sum("amount");

// Example timeline:
// Window 1: [10:00:00 - 10:05:00)
// Window 2: [10:05:00 - 10:10:00)
// Window 3: [10:10:00 - 10:15:00)
// No overlap between windows
\`\`\`

**Use Cases:**
- Aggregating metrics per hour/day
- Counting events in fixed intervals
- Periodic reporting

**2. Sliding Windows:**
- Fixed size, overlapping
- Windows slide by specified interval
- Event can belong to multiple windows

\`\`\`java
// Sliding Window (10-minute window, 5-minute slide)
stream
    .keyBy(Event::getUserId)
    .window(SlidingEventTimeWindows.of(Time.minutes(10), Time.minutes(5)))
    .reduce((e1, e2) -> combine(e1, e2));

// Example timeline:
// Window 1: [10:00:00 - 10:10:00)
// Window 2: [10:05:00 - 10:15:00)  ← overlaps with Window 1
// Window 3: [10:10:00 - 10:20:00)
// Events at 10:06:00 belong to both Window 1 and Window 2
\`\`\`

**Use Cases:**
- Moving averages
- Trend detection
- Overlapping time-based analytics

**3. Session Windows:**
- Dynamic size based on activity gaps
- No fixed duration
- Window closes after inactivity period

\`\`\`java
// Session Window with 30-minute inactivity gap
stream
    .keyBy(Event::getSessionId)
    .window(EventTimeSessionWindows.withGap(Time.minutes(30)))
    .process(new SessionWindowFunction());

// Example:
// Events: 10:00, 10:10, 10:15, 10:50, 10:55
// Session 1: [10:00 - 10:45) includes 10:00, 10:10, 10:15
//   (closes 30 min after last event at 10:15)
// Session 2: [10:50 - 11:25) includes 10:50, 10:55
//   (closes 30 min after last event at 10:55)
\`\`\`

**Use Cases:**
- User session analytics
- Website activity tracking
- Click stream analysis

**4. Count Windows:**
- Based on number of elements, not time
- Fixed count per window

\`\`\`java
// Count Window - window of 100 elements
stream
    .keyBy(Event::getUserId)
    .countWindow(100)  // Tumbling count window
    .reduce((e1, e2) -> combine(e1, e2));

// Sliding count window - 100 elements, slide by 50
stream
    .keyBy(Event::getUserId)
    .countWindow(100, 50)
    .reduce((e1, e2) -> combine(e1, e2));
\`\`\`

**Use Cases:**
- Processing fixed batches
- Top-N aggregations
- Sampling

**5. Global Windows:**
- All elements in single window
- Requires custom trigger
- Never closes automatically

\`\`\`java
stream
    .keyBy(Event::getUserId)
    .window(GlobalWindows.create())
    .trigger(CountTrigger.of(1000))  // Fire every 1000 elements
    .evictor(TimeEvictor.of(Time.seconds(100)))  // Keep last 100 seconds
    .apply(new WindowFunction<...>() { ... });
\`\`\`

**Watermarks and Late Data:**

\`\`\`java
// Watermark strategy
WatermarkStrategy<Event> watermarkStrategy = WatermarkStrategy
    .<Event>forBoundedOutOfOrderness(Duration.ofSeconds(5))
    .withTimestampAssigner((event, timestamp) -> event.getEventTime());

DataStream<Event> stream = env
    .fromSource(kafkaSource, watermarkStrategy, "Events");

// Window with allowed lateness
stream
    .keyBy(Event::getUserId)
    .window(TumblingEventTimeWindows.of(Time.minutes(5)))
    .allowedLateness(Time.seconds(10))  // Wait 10 seconds for late events
    .sideOutputLateData(lateDataTag)  // Collect extremely late data
    .sum("amount");

// Process late data separately
DataStream<Event> lateData = stream.getSideOutput(lateDataTag);
\`\`\`

**Window Functions:**

**1. ReduceFunction (Incremental):**
\`\`\`java
stream
    .keyBy(Event::getUserId)
    .window(TumblingEventTimeWindows.of(Time.minutes(5)))
    .reduce((e1, e2) -> {
        Event result = new Event();
        result.setAmount(e1.getAmount() + e2.getAmount());
        return result;
    });
// Memory efficient - maintains only one value
\`\`\`

**2. AggregateFunction (Incremental):**
\`\`\`java
stream
    .keyBy(Event::getUserId)
    .window(TumblingEventTimeWindows.of(Time.minutes(5)))
    .aggregate(new AverageAggregate());

class AverageAggregate implements AggregateFunction<Event, Tuple2<Long, Long>, Double> {
    @Override
    public Tuple2<Long, Long> createAccumulator() {
        return new Tuple2<>(0L, 0L);
    }

    @Override
    public Tuple2<Long, Long> add(Event value, Tuple2<Long, Long> acc) {
        return new Tuple2<>(acc.f0 + value.getAmount(), acc.f1 + 1);
    }

    @Override
    public Double getResult(Tuple2<Long, Long> acc) {
        return ((double) acc.f0) / acc.f1;
    }

    @Override
    public Tuple2<Long, Long> merge(Tuple2<Long, Long> a, Tuple2<Long, Long> b) {
        return new Tuple2<>(a.f0 + b.f0, a.f1 + b.f1);
    }
}
\`\`\`

**3. ProcessWindowFunction (Full window access):**
\`\`\`java
stream
    .keyBy(Event::getUserId)
    .window(TumblingEventTimeWindows.of(Time.minutes(5)))
    .process(new ProcessWindowFunction<Event, Result, String, TimeWindow>() {
        @Override
        public void process(String key, Context context,
                          Iterable<Event> events, Collector<Result> out) {
            long count = 0;
            for (Event event : events) {
                count++;
            }
            out.collect(new Result(key, count,
                context.window().getStart(), context.window().getEnd()));
        }
    });
// Has access to all events in window + window metadata
\`\`\`

**Combining Incremental + Full:**
\`\`\`java
stream
    .keyBy(Event::getUserId)
    .window(TumblingEventTimeWindows.of(Time.minutes(5)))
    .aggregate(
        new SumAggregate(),
        new WindowResultFunction()
    );
// Efficient: incremental aggregation + window metadata access
\`\`\`

**Best Practices:**
- Use event-time for correctness
- Configure watermark strategy appropriately
- Use incremental functions (reduce/aggregate) for efficiency
- Set allowed lateness for late events
- Monitor window state size`
    },
    {
      id: 4,
      category: 'Checkpointing',
      question: 'How does Flink\'s checkpointing work and ensure exactly-once semantics?',
      answer: `**Checkpointing in Flink:**
- Distributed snapshots of application state
- Enables fault tolerance
- Foundation for exactly-once guarantees
- Based on Chandy-Lamport algorithm

**How Checkpointing Works:**

**1. Trigger:**
- JobManager triggers checkpoint periodically
- Barrier markers injected into streams

**2. Barrier Flow:**
\`\`\`
Source → Barrier injected → flows through DAG → reaches Sink

Source
  ↓ [Barrier n]
Map Operator (takes snapshot)
  ↓ [Barrier n]
KeyBy/Shuffle
  ↓ [Barrier n]
Window Operator (takes snapshot)
  ↓ [Barrier n]
Sink (takes snapshot)

All operators snapshot state when barrier passes
\`\`\`

**3. Barrier Alignment:**
\`\`\`
Two input streams to operator:

Stream A: ... [data] [Barrier n] [blocked]
Stream B: ... [data] [data] [Barrier n]

Operator waits for Barrier n from ALL inputs before:
1. Taking snapshot
2. Processing data after barrier
\`\`\`

**Configuration:**

\`\`\`java
StreamExecutionEnvironment env =
    StreamExecutionEnvironment.getExecutionEnvironment();

// Enable checkpointing every 60 seconds
env.enableCheckpointing(60000);

CheckpointConfig config = env.getCheckpointConfig();

// Checkpointing mode
config.setCheckpointingMode(CheckpointingMode.EXACTLY_ONCE);
// or CheckpointingMode.AT_LEAST_ONCE (faster but duplicates possible)

// Minimum pause between checkpoints
config.setMinPauseBetweenCheckpoints(30000);  // 30 seconds

// Checkpoint timeout
config.setCheckpointTimeout(600000);  // 10 minutes

// Max concurrent checkpoints
config.setMaxConcurrentCheckpoints(1);

// Externalized checkpoints (survive job cancellation)
config.enableExternalizedCheckpoints(
    CheckpointConfig.ExternalizedCheckpointCleanup.RETAIN_ON_CANCELLATION
);

// Checkpoint storage
config.setCheckpointStorage("hdfs://namenode:port/flink/checkpoints");
// or "file:///local/path" or "s3://bucket/checkpoints"

// Prefer checkpoint for recovery (over savepoint)
config.setPreferCheckpointForRecovery(true);

// Tolerate checkpoint failures
config.setTolerableCheckpointFailureNumber(3);
\`\`\`

**Incremental Checkpointing:**
- Only checkpoint state changes
- Reduces checkpoint size
- Only with RocksDB backend

\`\`\`java
EmbeddedRocksDBStateBackend rocksDB = new EmbeddedRocksDBStateBackend();
rocksDB.enableIncrementalCheckpointing(true);

env.setStateBackend(rocksDB);

// Checkpoint 1: Full state (10 GB)
// Checkpoint 2: Only changes (500 MB)
// Checkpoint 3: Only changes (300 MB)
// Total stored: 10.8 GB instead of 30 GB
\`\`\`

**Unaligned Checkpoints:**
- Skip barrier alignment
- Include in-flight data in checkpoint
- Faster for high back-pressure scenarios

\`\`\`java
config.enableUnalignedCheckpoints();

// Trade-offs:
// + Faster checkpoint completion
// + Better for high back-pressure
// - Larger checkpoint size
// - More recovery time
\`\`\`

**Exactly-Once Semantics:**

**How it works:**
1. Checkpoint captures consistent snapshot
2. On failure, restore from last checkpoint
3. Rewind source offsets (Kafka, Kinesis)
4. Replay events since checkpoint

\`\`\`
Timeline:
10:00 - Checkpoint 1 (Kafka offset: 1000)
10:01 - Process offset 1001-1500
10:02 - FAILURE
10:02 - Restore from Checkpoint 1
10:02 - Rewind Kafka to offset 1000
10:02 - Replay offset 1001-1500

Result: Exactly-once processing (no loss, no duplicates)
\`\`\`

**Exactly-Once with Sinks:**

**Kafka Sink:**
\`\`\`java
KafkaSink<Event> sink = KafkaSink.<Event>builder()
    .setBootstrapServers("localhost:9092")
    .setRecordSerializer(...)
    .setDeliveryGuarantee(DeliveryGuarantee.EXACTLY_ONCE)
    .setTransactionalIdPrefix("flink-txn")
    .build();

// Uses two-phase commit:
// 1. Pre-commit (checkpoint)
// 2. Commit (after checkpoint completes)
\`\`\`

**JDBC Sink:**
\`\`\`java
JdbcSink.exactlyOnceSink(
    "INSERT INTO users VALUES (?, ?)",
    (ps, event) -> {
        ps.setString(1, event.getId());
        ps.setString(2, event.getName());
    },
    JdbcExecutionOptions.builder()
        .withMaxRetries(3)
        .build(),
    JdbcExactlyOnceOptions.builder()
        .withTransactionPerConnection(true)
        .build(),
    () -> {
        // XA DataSource for two-phase commit
        PGXADataSource xaDS = new PGXADataSource();
        xaDS.setUrl("jdbc:postgresql://localhost/db");
        return xaDS;
    }
);
\`\`\`

**Recovery:**

\`\`\`
Failure Scenario:
├── Detect failure
├── Cancel all running tasks
├── Restore state from last successful checkpoint
├── Rewind source positions
├── Resume processing

Recovery Time:
├── Depends on:
│   ├── State size
│   ├── Parallelism
│   ├── Network bandwidth
│   └── Storage performance
└── Typical: seconds to minutes
\`\`\`

**Savepoints vs Checkpoints:**

\`\`\`
Checkpoints (Automatic):
├── Periodic snapshots
├── For fault tolerance
├── Managed by Flink
├── Can be deleted automatically
└── Format optimized for recovery

Savepoints (Manual):
├── User-triggered snapshots
├── For versioning/migration
├── Manual management
├── Never deleted automatically
└── Canonical format (portable)
\`\`\`

**Creating Savepoint:**
\`\`\`bash
# Create savepoint
flink savepoint <jobId> [target-directory]

# Cancel job with savepoint
flink cancel -s [target-directory] <jobId>

# Resume from savepoint
flink run -s <savepoint-path> <jar-file>
\`\`\`

**Best Practices:**

**Checkpoint Interval:**
\`\`\`
Too frequent:
- High overhead
- Reduced throughput
- Increased storage I/O

Too infrequent:
- More data to replay on failure
- Longer recovery time

Sweet spot: 1-5 minutes for most applications
\`\`\`

**Monitoring:**
\`\`\`
Key Metrics:
├── Checkpoint duration
├── Checkpoint size
├── Alignment time
├── Failures count
└── Recovery time

Alert if:
├── Duration > timeout
├── Size growing unboundedly
├── Frequent failures
\`\`\`

**Configuration Tips:**
- Use RocksDB + incremental for large state
- Enable unaligned for high back-pressure
- Set checkpoint interval based on recovery SLA
- Monitor checkpoint duration < timeout
- Test recovery procedures regularly`
    },
    {
      id: 5,
      category: 'Performance',
      question: 'How do you optimize Apache Flink applications for high throughput and low latency?',
      answer: `**Flink Performance Optimization:**

**1. Parallelism Tuning:**

\`\`\`java
// Global parallelism
env.setParallelism(10);

// Operator-specific parallelism
stream
    .map(new MyMapper()).setParallelism(5)
    .keyBy(...)
    .window(...).setParallelism(20)  // More parallel for heavy operation
    .sum("amount");

// Parallelism calculation:
// parallelism = ceil(throughput_required / throughput_per_slot)
//
// Example:
// Required: 1000 events/sec
// Per slot: 100 events/sec
// Parallelism needed: 1000/100 = 10
\`\`\`

**Slot Sharing:**
\`\`\`java
// Group operators in same slot (default behavior)
stream
    .map(new MyMapper())  // Slot sharing group: "default"
    .keyBy(...)
    .window(...)
    .sum("amount");

// Disable slot sharing for resource-intensive operators
stream
    .map(new HeavyMapper()).slotSharingGroup("heavy")
    .keyBy(...)
    .window(...).slotSharingGroup("default");

// Benefits:
// - Better resource utilization
// - Reduced network transfers
// - Lower latency
\`\`\`

**2. Operator Chaining:**

\`\`\`java
// Operators chained together (default)
stream
    .map(new Mapper1())      //
    .map(new Mapper2())      // → Chained together
    .filter(new Filter1())   //    in same thread
    .keyBy(...)  // Chain breaks here (network shuffle)
    .reduce(...);

// Disable chaining for specific operators
stream
    .map(new Mapper1())
    .map(new Mapper2()).disableChaining()  // Force separate task
    .keyBy(...);

// Start new chain
stream
    .map(new Mapper1())
    .map(new Mapper2()).startNewChain()  // New chain begins here
    .keyBy(...);

// Benefits of chaining:
// - Reduced serialization
// - Function calls instead of network
// - Lower latency
// - Better throughput
\`\`\`

**3. State Backend Optimization:**

\`\`\`java
// HashMapStateBackend for small state
env.setStateBackend(new HashMapStateBackend());

// RocksDB for large state
EmbeddedRocksDBStateBackend rocksDB = new EmbeddedRocksDBStateBackend();

// Enable incremental checkpointing
rocksDB.enableIncrementalCheckpointing(true);

// RocksDB tuning
rocksDB.setPredefinedOptions(PredefinedOptions.SPINNING_DISK_OPTIMIZED);
// or PredefinedOptions.FLASH_SSD_OPTIMIZED

// Custom RocksDB configuration
DBOptions dbOptions = new DBOptions()
    .setMaxBackgroundJobs(4)
    .setMaxOpenFiles(-1);  // Unlimited

ColumnFamilyOptions columnOptions = new ColumnFamilyOptions()
    .setCompactionStyle(CompactionStyle.LEVEL)
    .setWriteBufferSize(64 * 1024 * 1024)  // 64 MB
    .setMaxWriteBufferNumber(3);

// Trade-offs:
// HashMapStateBackend: Fast, limited size
// RocksDB: Slower, unlimited size
\`\`\`

**4. Checkpoint Optimization:**

\`\`\`java
// Longer intervals reduce overhead
env.enableCheckpointing(120000);  // 2 minutes

CheckpointConfig config = env.getCheckpointConfig();

// Unaligned checkpoints for back-pressure
config.enableUnalignedCheckpoints();

// Incremental checkpoints (RocksDB only)
// Already enabled in RocksDB config above

// Concurrent checkpoints (use carefully)
config.setMaxConcurrentCheckpoints(2);

// Checkpoint timeout
config.setCheckpointTimeout(600000);  // 10 minutes

// Benchmark checkpoint duration:
// Should be < 10% of checkpoint interval
// If 2-minute interval, duration should be < 12 seconds
\`\`\`

**5. Network Buffer Tuning:**

\`\`\`yaml
# flink-conf.yaml

# Network buffers per channel
taskmanager.network.memory.buffers-per-channel: 2

# Floating buffers
taskmanager.network.memory.floating-buffers-per-gate: 8

# Buffer timeout (trade latency for throughput)
taskmanager.network.netty.transport: nio
env.setBufferTimeout(100);  // ms

# Buffer timeout guidelines:
# - 0: max throughput, higher latency
# - 100: balanced (default)
# - -1: min latency, lower throughput
\`\`\`

**6. Memory Configuration:**

\`\`\`yaml
# TaskManager memory configuration
taskmanager.memory.process.size: 4gb

# Breakdown:
# - Framework: ~600 MB (fixed)
# - Task: managed state operations
# - Network: buffers
# - Managed: RocksDB, sorting

# For RocksDB:
state.backend.rocksdb.memory.managed: true
state.backend.rocksdb.memory.write-buffer-ratio: 0.5
state.backend.rocksdb.memory.high-prio-pool-ratio: 0.1

# JVM options
env.java.opts: -XX:+UseG1GC -XX:MaxGCPauseMillis=100
\`\`\`

**7. Watermark Optimization:**

\`\`\`java
// Periodic watermarks (default, more efficient)
WatermarkStrategy<Event> periodic = WatermarkStrategy
    .<Event>forBoundedOutOfOrderness(Duration.ofSeconds(5))
    .withTimestampAssigner((event, timestamp) -> event.getTimestamp());

// Idle source handling
WatermarkStrategy<Event> withIdleness = periodic
    .withIdleness(Duration.ofMinutes(1));

// Per-partition watermarks (Kafka)
KafkaSource<Event> source = KafkaSource.<Event>builder()
    .setBootstrapServers("localhost:9092")
    .setTopics("events")
    .setDeserializer(...)
    .build();

WatermarkStrategy<Event> strategy = WatermarkStrategy
    .<Event>forBoundedOutOfOrderness(Duration.ofSeconds(5))
    .withTimestampAssigner((event, timestamp) -> event.getTimestamp())
    .withWatermarkAlignment("kafka-alignment", Duration.ofSeconds(20));
\`\`\`

**8. Async I/O for External Lookups:**

\`\`\`java
// External database lookups
DataStream<Event> enriched = AsyncDataStream.unorderedWait(
    events,
    new AsyncDatabaseRequest(),
    1000,  // Timeout (ms)
    TimeUnit.MILLISECONDS,
    100    // Capacity (max concurrent requests)
);

class AsyncDatabaseRequest extends RichAsyncFunction<Event, EnrichedEvent> {
    private transient DatabaseClient client;

    @Override
    public void asyncInvoke(Event input, ResultFuture<EnrichedEvent> resultFuture) {
        CompletableFuture<UserInfo> future = client.asyncGet(input.getUserId());
        future.thenAccept(userInfo -> {
            resultFuture.complete(
                Collections.singleton(new EnrichedEvent(input, userInfo))
            );
        });
    }
}

// Benefits:
// - Non-blocking I/O
// - High throughput for enrichment
// - Concurrent external requests
\`\`\`

**9. Object Reuse:**

\`\`\`java
// Enable object reuse to reduce GC
env.getConfig().enableObjectReuse();

// Reduces:
// - Object allocation
// - Garbage collection
// - Serialization overhead

// WARNING: Only safe if objects not modified
\`\`\`

**10. Predicate Pushdown:**

\`\`\`java
// Bad: Filter after expensive operation
stream
    .map(new ExpensiveMapper())  // Process all records
    .filter(event -> event.getAmount() > 1000);  // Then filter

// Good: Filter first
stream
    .filter(event -> event.getAmount() > 1000)  // Filter early
    .map(new ExpensiveMapper());  // Process fewer records
\`\`\`

**Monitoring & Metrics:**

\`\`\`
Key Performance Metrics:

Throughput:
├── Records processed per second
├── Bytes processed per second
└── Output rate

Latency:
├── Event latency (event time vs processing time)
├── Source latency
└── End-to-end latency

Resources:
├── CPU utilization
├── Memory usage
├── Network bandwidth
├── Disk I/O
└── GC time

Back-pressure:
├── Buffer usage
├── Output buffer full %
└── Input buffer empty %

Checkpoints:
├── Duration
├── Size
├── Alignment time
└── Failure rate
\`\`\`

**Benchmarking:**

\`\`\`bash
# Generate load for testing
flink run -c com.example.Benchmark benchmark.jar \\
  --rate 10000 \\  # events/sec
  --duration 600   # seconds

# Monitor with metrics
curl http://jobmanager:8081/jobs/<job-id>/metrics
\`\`\`

**Best Practices Summary:**

\`\`\`
1. Right-size parallelism (based on throughput needs)
2. Use RocksDB + incremental checkpoints for large state
3. Enable operator chaining (default)
4. Configure buffer timeout (100ms default good for most)
5. Use async I/O for external lookups
6. Filter early in pipeline
7. Monitor back-pressure indicators
8. Benchmark under realistic load
9. Tune checkpoint interval (1-5 minutes)
10. Enable object reuse if safe
\`\`\`

**Typical Performance:**
- Throughput: 100K-1M events/sec per TaskManager
- Latency: < 100ms for simple operations
- State size: Up to TBs with RocksDB
- Recovery time: Seconds to minutes`
    }
  ]

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Core Concepts': '#3b82f6',
      'State Management': '#10b981',
      'Windowing': '#f59e0b',
      'Checkpointing': '#8b5cf6',
      'Performance': '#ef4444'
    }
    return colors[category] || '#6b7280'
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#111827', minHeight: '100vh' }}>
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
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
        >
          ← Back to Questions
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: 0
        }}>
          Apache Flink Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <p style={{
        fontSize: '1.1rem',
        color: '#4b5563',
        textAlign: 'center',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Master Apache Flink concepts including state management, windowing, checkpointing, and performance optimization.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {questions.map((q) => (
          <div
            key={q.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              border: `3px solid ${expandedQuestion === q.id ? getCategoryColor(q.category) : '#e5e7eb'}`,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: expandedQuestion === q.id
                ? '0 8px 16px rgba(0,0,0,0.1)'
                : '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            <button
              onClick={() => toggleQuestion(q.id)}
              style={{
                width: '100%',
                padding: '1.5rem',
                backgroundColor: expandedQuestion === q.id
                  ? `${getCategoryColor(q.category)}15`
                  : 'white',
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
                  e.currentTarget.style.backgroundColor = '#f9fafb'
                }
              }}
              onMouseLeave={(e) => {
                if (expandedQuestion !== q.id) {
                  e.currentTarget.style.backgroundColor = 'white'
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
                  color: '#1f2937',
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
                backgroundColor: '#fafafa',
                borderTop: `2px solid ${getCategoryColor(q.category)}40`
              }}>
                <div style={{
                  fontSize: '1rem',
                  lineHeight: '1.8',
                  color: '#374151',
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
        backgroundColor: '#dbeafe',
        borderRadius: '12px',
        border: '2px solid #3b82f6'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e40af', marginBottom: '0.5rem' }}>
          💡 Apache Flink Interview Tips
        </h3>
        <ul style={{ color: '#1e3a8a', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Understand difference between event-time and processing-time</li>
          <li>Know different window types and when to use each</li>
          <li>Explain checkpointing and exactly-once semantics</li>
          <li>Be familiar with state backends (HashMap vs RocksDB)</li>
          <li>Understand watermarks and handling late data</li>
          <li>Know performance tuning: parallelism, chaining, state management</li>
        </ul>
      </div>
    </div>
  )
}

export default ApacheFlinkQuestions

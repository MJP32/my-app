import { useState, useEffect, useRef } from 'react'

const SyntaxHighlighter = ({ code }) => {
  const highlightJava = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    highlighted = highlighted
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ArrayList|Map|HashMap|Set|HashSet|Properties|DataStream|StreamExecutionEnvironment|SingleOutputStreamOperator|KeyedStream|WindowedStream|Tuple2|TimeWindow|Duration|Time|WindowAssigner|ProcessFunction|KeySelector|Collector|RuntimeContext|ValueState|ValueStateDescriptor|RichMapFunction|RichFlatMapFunction)\b/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/\b([A-Z][a-zA-Z0-9_]*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')
      .replace(/\b(\d+\.?\d*[fFdDlL]?)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')

    protectedContent.forEach(({ id, replacement }) => {
      highlighted = highlighted.replace(id, replacement)
    })

    return highlighted
  }

  return (
    <pre style={{
      backgroundColor: '#1e1e1e',
      color: '#d4d4d4',
      padding: '1rem',
      borderRadius: '8px',
      overflowX: 'auto',
      fontSize: '0.9rem',
      lineHeight: '1.5',
      border: '2px solid #3b82f6',
      fontFamily: 'Consolas, Monaco, "Courier New", monospace',
      whiteSpace: 'pre',
      textAlign: 'left',
      margin: 0
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightJava(code) }} />
    </pre>
  )
}

const ModernDiagram = ({ components, onComponentClick, title, width = 1400, height = 800, containerWidth = 1800, focusedIndex }) => {
  const [hoveredComponent, setHoveredComponent] = useState(null)

  return (
    <div style={{
      width: '100%',
      maxWidth: `${containerWidth}px`,
      margin: '0 auto',
      backgroundColor: '#f8fafc',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
      border: '2px solid #e2e8f0'
    }}>
      <h3 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '1.75rem',
        fontWeight: '800',
        color: '#1e293b',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        {title}
      </h3>

      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#059669" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="indigoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#db2777" stopOpacity="0.9"/>
          </linearGradient>

          {/* Arrow markers */}
          <marker id="arrowSolid" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#1e293b" />
          </marker>
          <marker id="arrowDashed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Architectural layer backgrounds */}
        <g opacity="0.1">
          <rect x="50" y="180" width="420" height="200" rx="16" fill="#3b82f6" />
          <text x="260" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af" opacity="0.6">
            Layer 1
          </text>

          <rect x="550" y="80" width="420" height="560" rx="16" fill="#10b981" />
          <text x="760" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="#059669" opacity="0.6">
            Layer 2
          </text>

          <rect x="1050" y="180" width="420" height="520" rx="16" fill="#8b5cf6" />
          <text x="1260" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7c3aed" opacity="0.6">
            Layer 3
          </text>
        </g>

        {/* Connecting lines with arrows and labels */}
        <g fill="none">
          <line x1="430" y1="300" x2="580" y2="200" stroke="#1e293b" strokeWidth="3" strokeOpacity="0.8" markerEnd="url(#arrowSolid)"/>
          <text x="505" y="240" fontSize="11" fontWeight="600" fill="#1e293b" textAnchor="middle">
            interacts
          </text>

          <line x1="430" y1="300" x2="580" y2="400" stroke="#1e293b" strokeWidth="3" strokeOpacity="0.8" markerEnd="url(#arrowSolid)"/>
          <text x="505" y="360" fontSize="11" fontWeight="600" fill="#1e293b" textAnchor="middle">
            uses
          </text>

          <line x1="930" y1="200" x2="1080" y2="300" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="1005" y="240" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            depends
          </text>

          <line x1="930" y1="400" x2="1080" y2="500" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="1005" y="460" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            provides
          </text>

          <line x1="430" y1="500" x2="580" y2="600" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="505" y="560" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            extends
          </text>

          <line x1="930" y1="500" x2="760" y2="600" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="845" y="560" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            integrates
          </text>
        </g>

        {/* Component rectangles */}
        {components.map((component, index) => {
          const isFocused = focusedIndex === index
          const isHovered = hoveredComponent === component.id
          const isHighlighted = isFocused || isHovered

          return (
          <g key={component.id}>
            {/* Focused ring indicator */}
            {isFocused && (
              <rect
                x={component.x - 6}
                y={component.y - 6}
                width={component.width + 12}
                height={component.height + 12}
                rx="16"
                ry="16"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="4"
                style={{
                  opacity: 0.9,
                  filter: 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.6))'
                }}
              />
            )}
            <rect
              x={component.x}
              y={component.y}
              width={component.width}
              height={component.height}
              rx="12"
              ry="12"
              fill={`url(#${component.color}Gradient)`}
              stroke={isHighlighted ? '#1e293b' : '#64748b'}
              strokeWidth={isHighlighted ? '4' : '2'}
              style={{
                cursor: 'pointer',
                filter: isHighlighted ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                transform: isHighlighted ? 'scale(1.05)' : 'scale(1)',
                transformOrigin: `${component.x + component.width/2}px ${component.y + component.height/2}px`,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={() => setHoveredComponent(component.id)}
              onMouseLeave={() => setHoveredComponent(null)}
              onClick={() => onComponentClick && onComponentClick(component)}
            />

            {/* Icon */}
            <text
              x={component.x + component.width/2}
              y={component.y + 35}
              textAnchor="middle"
              fontSize="48"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {component.icon}
            </text>

            {/* Title */}
            <text
              x={component.x + component.width/2}
              y={component.y + 75}
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="white"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {component.title}
            </text>

            {/* Details */}
            {component.details && component.details.slice(0, 3).map((detail, idx) => (
              <text
                key={idx}
                x={component.x + component.width/2}
                y={component.y + 100 + (idx * 15)}
                textAnchor="middle"
                fontSize="10"
                fontWeight="500"
                fill="rgba(255,255,255,0.9)"
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              >
                {(typeof detail === 'string' ? detail : detail.name).length > 18 ? (typeof detail === 'string' ? detail : detail.name).substring(0, 15) + '...' : (typeof detail === 'string' ? detail : detail.name)}
              </text>
            ))}
            {component.details && component.details.length > 3 && (
              <text
                x={component.x + component.width/2}
                y={component.y + 145}
                textAnchor="middle"
                fontSize="10"
                fontWeight="500"
                fill="rgba(255,255,255,0.7)"
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              >
                +{component.details.length - 3} more features...
              </text>
            )}
          </g>
        )})}
      </svg>
    </div>
  )
}

function ApacheFlink({ onBack }) {
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [focusedComponentIndex, setFocusedComponentIndex] = useState(0)

  const components = [
    {
      id: 'stream-processing', x: 80, y: 240, width: 350, height: 160,
      icon: '🌊', title: 'Stream Processing', color: 'blue',
      metrics: { 'Throughput': '10M+ events/s', 'Latency': 'Sub-millisecond', 'Parallelism': '1000s tasks', 'State Size': 'Terabytes' },
      details: [
        {
          name: 'Unbounded Streams',
          explanation: 'Process infinite data streams in real-time. Handles continuously arriving data without predefined end. True streaming semantics unlike micro-batching. Low-latency processing with millisecond response times. Perfect for real-time analytics and monitoring.',
          codeExample: `import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

public class UnboundedStreamExample {
  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // Create unbounded stream from socket
    DataStream<String> stream = env.socketTextStream("localhost", 9999);

    // Process stream continuously
    DataStream<Integer> lengths = stream
      .map(String::length)
      .filter(len -> len > 5);

    lengths.print();
    env.execute("Unbounded Stream Processing");

    // Output: Continuous processing of incoming data
    // 15
    // 23
    // 8
    // ... (infinite stream continues)
  }
}`
        },
        {
          name: 'Event Time Processing',
          explanation: 'Process events based on when they occurred, not when they arrived. Handles out-of-order events correctly. Watermarks track event time progress. Critical for accurate time-based computations in distributed systems.',
          codeExample: `import org.apache.flink.api.common.eventtime.*;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import java.time.Duration;

public class EventTimeExample {
  public static class Event {
    public String id;
    public long timestamp;
    public double value;

    public Event(String id, long timestamp, double value) {
      this.id = id;
      this.timestamp = timestamp;
      this.value = value;
    }
  }

  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    DataStream<Event> events = env.fromElements(
      new Event("e1", 1000L, 10.5),
      new Event("e2", 2000L, 20.3),
      new Event("e3", 1500L, 15.7)  // Out-of-order event
    );

    // Assign timestamps and watermarks
    DataStream<Event> withTimestamps = events.assignTimestampsAndWatermarks(
      WatermarkStrategy.<Event>forBoundedOutOfOrderness(Duration.ofSeconds(5))
        .withTimestampAssigner((event, timestamp) -> event.timestamp)
    );

    withTimestamps
      .keyBy(e -> e.id)
      .sum("value")
      .print();

    env.execute("Event Time Processing");

    // Output: Events processed in event-time order despite arrival order
    // Event(id=e1, timestamp=1000, value=10.5)
    // Event(id=e3, timestamp=1500, value=15.7)
    // Event(id=e2, timestamp=2000, value=20.3)
  }
}`
        },
        {
          name: 'Exactly-Once Semantics',
          explanation: 'Guarantees each record processed exactly once despite failures. Distributed snapshots via Chandy-Lamport algorithm. State and output consistency maintained. No duplicate processing or data loss.',
          codeExample: `import org.apache.flink.api.common.state.*;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.api.functions.KeyedProcessFunction;
import org.apache.flink.util.Collector;

public class ExactlyOnceExample {
  public static class CountFunction extends KeyedProcessFunction<String, String, String> {
    private ValueState<Long> countState;

    @Override
    public void open(Configuration parameters) {
      ValueStateDescriptor<Long> descriptor =
        new ValueStateDescriptor<>("count", Long.class, 0L);
      countState = getRuntimeContext().getState(descriptor);
    }

    @Override
    public void processElement(String value, Context ctx, Collector<String> out)
        throws Exception {
      Long currentCount = countState.value();
      currentCount++;
      countState.update(currentCount);

      out.collect(value + " -> count: " + currentCount);
    }
  }

  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // Enable checkpointing for exactly-once
    env.enableCheckpointing(1000);

    DataStream<String> stream = env.fromElements("A", "B", "A", "C", "A");

    stream
      .keyBy(x -> x)
      .process(new CountFunction())
      .print();

    env.execute("Exactly-Once Semantics");

    // Output: Each element counted exactly once even with failures
    // A -> count: 1
    // B -> count: 1
    // A -> count: 2
    // C -> count: 1
    // A -> count: 3
  }
}`
        },
        {
          name: 'Windowing',
          explanation: 'Group streaming data into finite sets for computation. Tumbling (fixed non-overlapping), sliding (overlapping), session (activity-based) windows. Time and count-based triggers. Essential for aggregations over streams.',
          codeExample: `import org.apache.flink.api.common.functions.AggregateFunction;
import org.apache.flink.api.java.tuple.Tuple2;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.api.windowing.assigners.*;
import org.apache.flink.streaming.api.windowing.time.Time;

public class WindowingExample {
  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    DataStream<Tuple2<String, Integer>> stream = env.fromElements(
      new Tuple2<>("sensor1", 10),
      new Tuple2<>("sensor1", 20),
      new Tuple2<>("sensor2", 15),
      new Tuple2<>("sensor1", 30)
    );

    // Tumbling window: 10 second non-overlapping windows
    DataStream<Tuple2<String, Double>> tumblingAvg = stream
      .keyBy(t -> t.f0)
      .window(TumblingProcessingTimeWindows.of(Time.seconds(10)))
      .aggregate(new AggregateFunction<
          Tuple2<String, Integer>,
          Tuple2<Integer, Integer>,
          Tuple2<String, Double>>() {

        public Tuple2<Integer, Integer> createAccumulator() {
          return new Tuple2<>(0, 0);
        }

        public Tuple2<Integer, Integer> add(
            Tuple2<String, Integer> value,
            Tuple2<Integer, Integer> acc) {
          return new Tuple2<>(acc.f0 + value.f1, acc.f1 + 1);
        }

        public Tuple2<String, Double> getResult(Tuple2<Integer, Integer> acc) {
          return new Tuple2<>("avg", (double) acc.f0 / acc.f1);
        }

        public Tuple2<Integer, Integer> merge(
            Tuple2<Integer, Integer> a,
            Tuple2<Integer, Integer> b) {
          return new Tuple2<>(a.f0 + b.f0, a.f1 + b.f1);
        }
      });

    tumblingAvg.print();
    env.execute("Windowing Example");

    // Output: Aggregated values per window
    // (avg, 20.0)  // sensor1: (10+20+30)/3
    // (avg, 15.0)  // sensor2: 15/1
  }
}`
        },
        {
          name: 'Complex Event Processing',
          explanation: 'Detect patterns across multiple events. CEP library for pattern matching. Temporal constraints and conditions. Use cases: fraud detection, anomaly detection, business process monitoring.',
          codeExample: `import org.apache.flink.cep.CEP;
import org.apache.flink.cep.PatternStream;
import org.apache.flink.cep.pattern.Pattern;
import org.apache.flink.cep.pattern.conditions.SimpleCondition;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.api.windowing.time.Time;

public class CEPExample {
  public static class LoginEvent {
    public String userId;
    public String status;

    public LoginEvent(String userId, String status) {
      this.userId = userId;
      this.status = status;
    }
  }

  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    DataStream<LoginEvent> loginStream = env.fromElements(
      new LoginEvent("user1", "fail"),
      new LoginEvent("user1", "fail"),
      new LoginEvent("user1", "fail"),
      new LoginEvent("user2", "success")
    );

    // Pattern: 3 consecutive failed logins within 5 minutes
    Pattern<LoginEvent, ?> pattern = Pattern
      .<LoginEvent>begin("first")
        .where(new SimpleCondition<LoginEvent>() {
          public boolean filter(LoginEvent event) {
            return event.status.equals("fail");
          }
        })
      .next("second")
        .where(new SimpleCondition<LoginEvent>() {
          public boolean filter(LoginEvent event) {
            return event.status.equals("fail");
          }
        })
      .next("third")
        .where(new SimpleCondition<LoginEvent>() {
          public boolean filter(LoginEvent event) {
            return event.status.equals("fail");
          }
        })
      .within(Time.minutes(5));

    PatternStream<LoginEvent> patternStream = CEP.pattern(
      loginStream.keyBy(event -> event.userId),
      pattern
    );

    DataStream<String> alerts = patternStream.select(
      (map) -> "ALERT: " + map.get("first").get(0).userId +
               " had 3 failed login attempts!"
    );

    alerts.print();
    env.execute("CEP - Fraud Detection");

    // Output: Pattern matches trigger alerts
    // ALERT: user1 had 3 failed login attempts!
  }
}`
        },
        {
          name: 'Rich Operators',
          explanation: 'Map, flatMap, filter, keyBy, reduce, aggregate, join, coGroup. Window operations, process functions for custom logic. SQL support for declarative stream processing. Both high and low-level APIs available.',
          codeExample: `import org.apache.flink.api.common.functions.*;
import org.apache.flink.api.java.tuple.Tuple2;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.util.Collector;

public class RichOperatorsExample {
  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    DataStream<String> text = env.fromElements(
      "hello world",
      "hello flink",
      "apache flink streaming"
    );

    // FlatMap: split sentences into words
    DataStream<String> words = text.flatMap(
      new FlatMapFunction<String, String>() {
        public void flatMap(String value, Collector<String> out) {
          for (String word : value.split(" ")) {
            out.collect(word);
          }
        }
      }
    );

    // Map: create word-count pairs
    DataStream<Tuple2<String, Integer>> pairs = words
      .map(new MapFunction<String, Tuple2<String, Integer>>() {
        public Tuple2<String, Integer> map(String word) {
          return new Tuple2<>(word, 1);
        }
      });

    // KeyBy and Reduce: count words
    DataStream<Tuple2<String, Integer>> counts = pairs
      .keyBy(t -> t.f0)
      .reduce(new ReduceFunction<Tuple2<String, Integer>>() {
        public Tuple2<String, Integer> reduce(
            Tuple2<String, Integer> a,
            Tuple2<String, Integer> b) {
          return new Tuple2<>(a.f0, a.f1 + b.f1);
        }
      });

    // Filter: only words with count > 1
    DataStream<Tuple2<String, Integer>> filtered = counts
      .filter(new FilterFunction<Tuple2<String, Integer>>() {
        public boolean filter(Tuple2<String, Integer> value) {
          return value.f1 > 1;
        }
      });

    filtered.print();
    env.execute("Rich Operators");

    // Output: Word counts greater than 1
    // (hello, 2)
    // (flink, 2)
  }
}`
        }
      ],
      description: 'True streaming engine processing unbounded data streams with event time semantics, windowing, and exactly-once guarantees.'
    },
    {
      id: 'stateful-computing', x: 580, y: 140, width: 350, height: 160,
      icon: '💾', title: 'Stateful Computing', color: 'green',
      metrics: { 'State Size': 'Petabytes', 'Backend': 'RocksDB', 'Checkpoints': '<1min', 'Recovery': '<5min' },
      details: [
        {
          name: 'Managed State',
          explanation: 'Flink manages operator state automatically. ValueState, ListState, MapState, ReducingState, AggregatingState abstractions. Transparent to user code. Automatically included in checkpoints for fault tolerance.',
          codeExample: `import org.apache.flink.api.common.state.*;
import org.apache.flink.api.common.typeinfo.Types;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.streaming.api.functions.KeyedProcessFunction;
import org.apache.flink.util.Collector;

public class ManagedStateExample extends
    KeyedProcessFunction<String, Tuple2<String, Double>, String> {

  private ValueState<Double> sumState;
  private ValueState<Long> countState;
  private ListState<Double> historyState;

  @Override
  public void open(Configuration parameters) {
    // ValueState for sum
    ValueStateDescriptor<Double> sumDescriptor =
      new ValueStateDescriptor<>("sum", Types.DOUBLE);
    sumState = getRuntimeContext().getState(sumDescriptor);

    // ValueState for count
    ValueStateDescriptor<Long> countDescriptor =
      new ValueStateDescriptor<>("count", Types.LONG);
    countState = getRuntimeContext().getState(countDescriptor);

    // ListState for history
    ListStateDescriptor<Double> historyDescriptor =
      new ListStateDescriptor<>("history", Types.DOUBLE);
    historyState = getRuntimeContext().getListState(historyDescriptor);
  }

  @Override
  public void processElement(
      Tuple2<String, Double> value,
      Context ctx,
      Collector<String> out) throws Exception {

    // Update sum and count
    Double currentSum = sumState.value();
    currentSum = (currentSum == null) ? value.f1 : currentSum + value.f1;
    sumState.update(currentSum);

    Long currentCount = countState.value();
    currentCount = (currentCount == null) ? 1L : currentCount + 1L;
    countState.update(currentCount);

    // Add to history
    historyState.add(value.f1);

    // Calculate average
    double avg = currentSum / currentCount;
    out.collect(value.f0 + " avg: " + avg + " (count: " + currentCount + ")");
  }
}

// Output: Stateful computation with automatic state management
// sensor1 avg: 10.0 (count: 1)
// sensor1 avg: 15.0 (count: 2)
// sensor1 avg: 20.0 (count: 3)`
        },
        {
          name: 'State Backends',
          explanation: 'MemoryStateBackend for small state, FsStateBackend for large state on disk, RocksDBStateBackend for very large state. Incremental checkpoints with RocksDB. Choose based on state size and performance needs.',
          codeExample: `import org.apache.flink.contrib.streaming.state.RocksDBStateBackend;
import org.apache.flink.runtime.state.filesystem.FsStateBackend;
import org.apache.flink.runtime.state.memory.MemoryStateBackend;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

public class StateBackendExample {
  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // Option 1: MemoryStateBackend (for testing, small state)
    // State stored in Java heap, fast but limited by memory
    env.setStateBackend(new MemoryStateBackend(100 * 1024 * 1024)); // 100 MB

    // Option 2: FsStateBackend (for moderate state)
    // State in TaskManager memory, checkpoints to file system
    env.setStateBackend(
      new FsStateBackend("hdfs://namenode:9000/flink/checkpoints")
    );

    // Option 3: RocksDBStateBackend (for very large state)
    // State in embedded RocksDB, supports incremental checkpoints
    RocksDBStateBackend rocksDB = new RocksDBStateBackend(
      "hdfs://namenode:9000/flink/checkpoints",
      true  // enable incremental checkpoints
    );
    env.setStateBackend(rocksDB);

    // Configure checkpoint interval
    env.enableCheckpointing(60000); // checkpoint every 60 seconds

    // Your stream processing logic here
    // ...

    env.execute("State Backend Example");

    // Output: Backend choice affects performance and state size limits
    // MemoryStateBackend: Fast, limited to heap size
    // FsStateBackend: Good for GB-scale state
    // RocksDBStateBackend: Scales to TB+ with incremental checkpoints
  }
}`
        },
        {
          name: 'Queryable State',
          explanation: 'Query operator state from external applications. Key-value access to streaming state. Enables real-time dashboards and monitoring. Serve results without external database.',
          codeExample: `import org.apache.flink.api.common.state.*;
import org.apache.flink.api.common.typeinfo.Types;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.queryablestate.client.QueryableStateClient;
import org.apache.flink.streaming.api.functions.KeyedProcessFunction;
import org.apache.flink.util.Collector;
import java.util.concurrent.CompletableFuture;

public class QueryableStateExample {
  // Server-side: Make state queryable
  public static class CountFunction extends
      KeyedProcessFunction<String, String, String> {

    private ValueState<Long> countState;

    @Override
    public void open(Configuration parameters) {
      ValueStateDescriptor<Long> descriptor =
        new ValueStateDescriptor<>("count", Types.LONG);

      // Make this state queryable
      descriptor.setQueryable("query-count");

      countState = getRuntimeContext().getState(descriptor);
    }

    @Override
    public void processElement(String value, Context ctx, Collector<String> out)
        throws Exception {
      Long count = countState.value();
      count = (count == null) ? 1L : count + 1L;
      countState.update(count);
      out.collect(value + ": " + count);
    }
  }

  // Client-side: Query state externally
  public static void queryState() throws Exception {
    QueryableStateClient client = new QueryableStateClient("localhost", 9069);

    ValueStateDescriptor<Long> descriptor =
      new ValueStateDescriptor<>("count", Types.LONG);

    // Query state for key "user123"
    CompletableFuture<ValueState<Long>> resultFuture =
      client.getKvState(
        "my-job-id",
        "query-count",
        "user123",
        Types.STRING,
        descriptor
      );

    // Get result asynchronously
    resultFuture.thenAccept(response -> {
      try {
        System.out.println("Count for user123: " + response.value());
      } catch (Exception e) {
        e.printStackTrace();
      }
    });

    // Output: External applications can query streaming state in real-time
    // Count for user123: 42
  }
}`
        },
        {
          name: 'Broadcast State',
          explanation: 'Share state across parallel instances. Useful for rules, configurations, ML models. Broadcast stream to all parallel tasks. Efficient state replication pattern.',
          codeExample: `import org.apache.flink.api.common.state.*;
import org.apache.flink.api.common.typeinfo.Types;
import org.apache.flink.streaming.api.datastream.*;
import org.apache.flink.streaming.api.functions.co.KeyedBroadcastProcessFunction;
import org.apache.flink.util.Collector;

public class BroadcastStateExample {
  public static class Rule {
    public String pattern;
    public String action;

    public Rule(String pattern, String action) {
      this.pattern = pattern;
      this.action = action;
    }
  }

  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // Regular data stream
    DataStream<String> dataStream = env.fromElements(
      "login-attempt-123",
      "payment-456",
      "suspicious-789"
    );

    // Broadcast stream with rules
    DataStream<Rule> ruleStream = env.fromElements(
      new Rule("suspicious", "ALERT"),
      new Rule("payment", "VALIDATE")
    );

    // Create broadcast state descriptor
    MapStateDescriptor<String, Rule> ruleStateDescriptor =
      new MapStateDescriptor<>("rules", Types.STRING, Types.POJO(Rule.class));

    BroadcastStream<Rule> broadcastRules =
      ruleStream.broadcast(ruleStateDescriptor);

    // Connect data stream with broadcast stream
    DataStream<String> result = dataStream
      .keyBy(x -> x)
      .connect(broadcastRules)
      .process(new KeyedBroadcastProcessFunction<
          String, String, Rule, String>() {

        @Override
        public void processElement(String value, ReadOnlyContext ctx,
            Collector<String> out) throws Exception {
          // Access broadcast state (read-only)
          ReadOnlyBroadcastState<String, Rule> ruleState =
            ctx.getBroadcastState(ruleStateDescriptor);

          // Check against all rules
          for (Map.Entry<String, Rule> entry : ruleState.immutableEntries()) {
            Rule rule = entry.getValue();
            if (value.contains(rule.pattern)) {
              out.collect(rule.action + ": " + value);
            }
          }
        }

        @Override
        public void processBroadcastElement(Rule rule, Context ctx,
            Collector<String> out) throws Exception {
          // Update broadcast state
          ctx.getBroadcastState(ruleStateDescriptor).put(rule.pattern, rule);
        }
      });

    result.print();
    env.execute("Broadcast State Example");

    // Output: Rules broadcast to all parallel tasks
    // VALIDATE: payment-456
    // ALERT: suspicious-789
  }
}`
        },
        {
          name: 'State TTL',
          explanation: 'Automatic state cleanup after time-to-live expires. Prevents unbounded state growth. Configurable cleanup strategies. Essential for long-running streaming applications.',
          codeExample: `import org.apache.flink.api.common.state.*;
import org.apache.flink.api.common.time.Time;
import org.apache.flink.api.common.typeinfo.Types;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.streaming.api.functions.KeyedProcessFunction;
import org.apache.flink.util.Collector;

public class StateTTLExample extends
    KeyedProcessFunction<String, Tuple2<String, String>, String> {

  private ValueState<String> lastSeenState;

  @Override
  public void open(Configuration parameters) {
    // Configure State TTL
    StateTtlConfig ttlConfig = StateTtlConfig
      .newBuilder(Time.hours(1))  // TTL of 1 hour
      .setUpdateType(StateTtlConfig.UpdateType.OnCreateAndWrite)
      .setStateVisibility(StateTtlConfig.StateVisibility.NeverReturnExpired)
      .cleanupFullSnapshot()  // Cleanup during full snapshots
      .cleanupIncrementally(10, false)  // Cleanup incrementally
      .build();

    ValueStateDescriptor<String> descriptor =
      new ValueStateDescriptor<>("last-seen", Types.STRING);

    // Enable TTL on state
    descriptor.enableTimeToLive(ttlConfig);

    lastSeenState = getRuntimeContext().getState(descriptor);
  }

  @Override
  public void processElement(
      Tuple2<String, String> value,
      Context ctx,
      Collector<String> out) throws Exception {

    String userId = value.f0;
    String action = value.f1;

    // Try to get previous state
    String lastSeen = lastSeenState.value();

    if (lastSeen != null) {
      out.collect(userId + " was last seen doing: " + lastSeen +
                  ", now doing: " + action);
    } else {
      out.collect(userId + " first activity: " + action);
    }

    // Update state (resets TTL timer)
    lastSeenState.update(action);
  }
}

// Output: State automatically cleaned up after 1 hour of inactivity
// user1 first activity: login
// user1 was last seen doing: login, now doing: purchase
// ... (after 1 hour of no activity, state is removed)
// user1 first activity: logout`
        },
        {
          name: 'Savepoints',
          explanation: 'Manual snapshots for operational purposes. Enable application updates, code changes, rescaling. Restore from savepoint with different parallelism. Version-compatible state evolution.',
          codeExample: `import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

public class SavepointExample {
  public static void main(String[] args) throws Exception {
    // Creating a savepoint (via CLI):
    // $ flink savepoint <job-id> [target-directory]
    // $ flink savepoint 5e20cb6b0f357591171dfcca2eea09de hdfs:///savepoints

    // Stopping job with savepoint:
    // $ flink stop --savepointPath hdfs:///savepoints/sp-123 <job-id>

    // Restoring from savepoint:
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // Application code
    DataStream<String> stream = env.socketTextStream("localhost", 9999);
    stream
      .keyBy(x -> x)
      .map(x -> x.toUpperCase())
      .print();

    env.execute("Savepoint Example");

    // Restore with different parallelism:
    // $ flink run -s hdfs:///savepoints/sp-123 -p 8 my-job.jar
    // (restores from savepoint with parallelism 8)

    // Use cases:
    // 1. Application upgrades without data loss
    // 2. Rescaling (change parallelism)
    // 3. Cluster migration
    // 4. Flink version upgrades
    // 5. Testing with production state
    // 6. Bug fixing with state rollback

    // Output: Operational flexibility for production systems
    // Savepoint created at: hdfs:///savepoints/savepoint-5e20cb-123456
    // Job restarted from savepoint with updated code
  }
}

// Configuration for savepoints
// env.setStateBackend(new FsStateBackend("hdfs:///checkpoints"));
// env.enableCheckpointing(60000);
// env.getCheckpointConfig().setExternalizedCheckpointCleanup(
//   CheckpointConfig.ExternalizedCheckpointCleanup.RETAIN_ON_CANCELLATION
// );`
        }
      ],
      description: 'Managed stateful computations with multiple state backends, queryable state, and operational flexibility via savepoints.'
    },
    {
      id: 'fault-tolerance', x: 580, y: 340, width: 350, height: 160,
      icon: '🛡️', title: 'Fault Tolerance', color: 'purple',
      metrics: { 'MTTR': '<5min', 'Checkpoint Time': '<1min', 'Data Loss': 'Zero', 'Availability': '99.99%' },
      details: [
        {
          name: 'Checkpointing',
          explanation: 'Periodic distributed snapshots of application state and position in streams. Asynchronous and non-blocking. Minimal impact on throughput. Configurable interval and timeout. Foundation of fault tolerance.',
          codeExample: `import org.apache.flink.streaming.api.CheckpointingMode;
import org.apache.flink.streaming.api.environment.CheckpointConfig;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

public class CheckpointingExample {
  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // Enable checkpointing every 10 seconds
    env.enableCheckpointing(10000);

    // Configure checkpointing
    CheckpointConfig config = env.getCheckpointConfig();

    // Exactly-once semantics
    config.setCheckpointingMode(CheckpointingMode.EXACTLY_ONCE);

    // Minimum pause between checkpoints
    config.setMinPauseBetweenCheckpoints(5000);

    // Checkpoint timeout (fail if not completed in 60s)
    config.setCheckpointTimeout(60000);

    // Allow only 1 checkpoint in progress at a time
    config.setMaxConcurrentCheckpoints(1);

    // Retain checkpoints when job is cancelled
    config.setExternalizedCheckpointCleanup(
      CheckpointConfig.ExternalizedCheckpointCleanup.RETAIN_ON_CANCELLATION
    );

    // Tolerate checkpoint failures
    config.setTolerableCheckpointFailureNumber(3);

    // Your stream processing logic
    env.fromElements(1, 2, 3, 4, 5)
      .map(x -> x * 2)
      .print();

    env.execute("Checkpointing Example");

    // Output: Periodic snapshots taken every 10 seconds
    // Checkpoint 1 completed at offset 100
    // Checkpoint 2 completed at offset 200
    // ... (automatic fault tolerance enabled)
  }
}`
        },
        {
          name: 'Chandy-Lamport Algorithm',
          explanation: 'Distributed snapshot algorithm ensuring consistency. Captures state of all operators and in-flight records. Creates consistent global snapshot without stopping processing. Theoretically sound approach.',
          codeExample: `import org.apache.flink.api.common.state.ValueState;
import org.apache.flink.api.common.state.ValueStateDescriptor;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.streaming.api.functions.KeyedProcessFunction;
import org.apache.flink.util.Collector;

// Chandy-Lamport ensures consistent distributed snapshots
// Barrier markers flow through the stream to coordinate snapshots

public class DistributedSnapshotExample extends
    KeyedProcessFunction<String, String, String> {

  private ValueState<Long> count;

  @Override
  public void open(Configuration parameters) {
    count = getRuntimeContext().getState(
      new ValueStateDescriptor<>("count", Long.class, 0L)
    );
  }

  @Override
  public void processElement(String value, Context ctx, Collector<String> out)
      throws Exception {
    // Process element and update state
    Long currentCount = count.value();
    currentCount++;
    count.update(currentCount);

    // Checkpoint barriers flow through the stream
    // When barrier arrives at operator:
    // 1. Operator snapshots its state
    // 2. Barrier is forwarded downstream
    // 3. Processing continues uninterrupted

    out.collect(value + " (count: " + currentCount + ")");
  }

  // Flink handles checkpoint coordination automatically:
  // JobManager triggers checkpoint
  // Barrier injected at sources
  // Barrier flows through DAG
  // Each operator snapshots state when barrier arrives
  // All snapshots form consistent global state
}

// Output: Consistent snapshots despite asynchronous processing
// State at checkpoint 1: {user1: 10, user2: 5}
// State at checkpoint 2: {user1: 15, user2: 8}
// Recovery restores to consistent state`
        },
        {
          name: 'Recovery Mechanism',
          explanation: 'On failure, restore from last successful checkpoint. Replay records from checkpoint position. All operators restart from consistent state. Automatic and transparent recovery.',
          codeExample: `import org.apache.flink.api.common.restartstrategy.RestartStrategies;
import org.apache.flink.api.common.time.Time;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

public class RecoveryExample {
  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // Enable checkpointing
    env.enableCheckpointing(5000);

    // Configure restart strategy
    // Fixed delay: restart 3 times with 10-second delay
    env.setRestartStrategy(RestartStrategies.fixedDelayRestart(
      3,  // number of restart attempts
      Time.seconds(10)  // delay between attempts
    ));

    // Alternative: exponential backoff
    env.setRestartStrategy(RestartStrategies.exponentialDelayRestart(
      Time.milliseconds(1),
      Time.milliseconds(1000),
      1.5,  // backoff multiplier
      Time.milliseconds(60000),  // max backoff
      0.1  // jitter
    ));

    // Alternative: failure rate
    env.setRestartStrategy(RestartStrategies.failureRateRestart(
      3,  // max failures per interval
      Time.minutes(5),  // failure rate interval
      Time.seconds(10)  // delay between restarts
    ));

    // Stream processing
    env.socketTextStream("localhost", 9999)
      .map(x -> {
        // Simula te occasional failure
        if (x.contains("error")) {
          throw new RuntimeException("Processing error!");
        }
        return x.toUpperCase();
      })
      .print();

    env.execute("Recovery Example");

    // Output: Automatic recovery on failures
    // Processing...
    // ERROR OCCURRED!
    // Restoring from checkpoint 5...
    // State restored, resuming from offset 500
    // Processing resumed... (no data loss)
  }
}`
        },
        {
          name: 'Incremental Checkpoints',
          explanation: 'With RocksDB backend, only changes since last checkpoint saved. Reduces checkpoint time and size. Essential for applications with large state. Faster recovery and lower overhead.',
          codeExample: `import org.apache.flink.contrib.streaming.state.EmbeddedRocksDBStateBackend;
import org.apache.flink.runtime.state.storage.FileSystemCheckpointStorage;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

public class IncrementalCheckpointsExample {
  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // Configure RocksDB with incremental checkpoints
    EmbeddedRocksDBStateBackend rocksDB =
      new EmbeddedRocksDBStateBackend(true);  // enable incremental

    // Set checkpoint storage
    rocksDB.setCheckpointStorage(
      new FileSystemCheckpointStorage("hdfs:///flink/checkpoints")
    );

    env.setStateBackend(rocksDB);

    // Enable checkpointing
    env.enableCheckpointing(60000);  // 60 seconds

    // With incremental checkpoints:
    // Checkpoint 1: Full snapshot (1 GB)
    // Checkpoint 2: Only changes since CP1 (50 MB)
    // Checkpoint 3: Only changes since CP2 (30 MB)
    // Checkpoint 4: Only changes since CP3 (40 MB)

    // Benefits:
    // - Faster checkpoint completion (seconds vs minutes)
    // - Less network/disk I/O
    // - Lower impact on processing throughput
    // - Suitable for very large state (TBs)

    env.fromElements(1, 2, 3, 4, 5)
      .keyBy(x -> x % 2)
      .map(x -> x * 2)
      .print();

    env.execute("Incremental Checkpoints");

    // Output: Efficient checkpointing for large state
    // Checkpoint 1 (full): 1024 MB, 45 seconds
    // Checkpoint 2 (incremental): 52 MB, 3 seconds
    // Checkpoint 3 (incremental): 31 MB, 2 seconds
  }
}`
        },
        {
          name: 'Unaligned Checkpoints',
          explanation: 'Allow checkpoints to complete during backpressure. Don\'t wait for in-flight records to drain. Faster checkpoint completion under high load. Trade-off: larger checkpoint size.',
          codeExample: `import org.apache.flink.streaming.api.environment.CheckpointConfig;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

public class UnalignedCheckpointsExample {
  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // Enable checkpointing
    env.enableCheckpointing(10000);

    CheckpointConfig config = env.getCheckpointConfig();

    // Enable unaligned checkpoints
    config.enableUnalignedCheckpoints();

    // Configure unaligned checkpoint timeout
    // If aligned checkpoint takes too long, switch to unaligned
    config.setAlignmentTimeout(java.time.Duration.ofSeconds(1));

    // Traditional aligned checkpoints:
    // - Wait for all in-flight records to be processed
    // - Barriers must align at operators
    // - Can be slow during backpressure

    // Unaligned checkpoints:
    // - Don't wait for in-flight records
    // - Snapshot includes in-flight data
    // - Faster completion under backpressure
    // - Larger checkpoint size (includes buffers)

    // Use case: High-throughput pipelines with occasional slowdowns

    env.socketTextStream("localhost", 9999)
      .map(x -> {
        // Simulate varying processing time
        Thread.sleep((int)(Math.random() * 100));
        return x.toUpperCase();
      })
      .print();

    env.execute("Unaligned Checkpoints");

    // Output: Faster checkpoints under load
    // Without unaligned: Checkpoint took 45s (waited for backpressure)
    // With unaligned: Checkpoint took 2s (snapshot includes buffers)
  }
}`
        },
        {
          name: 'Recovery Time',
          explanation: 'Fast recovery from failures. Seconds to minutes depending on state size. No data loss with exactly-once semantics. Automatic restart strategies configurable. High availability design.',
          codeExample: `import org.apache.flink.api.common.restartstrategy.RestartStrategies;
import org.apache.flink.api.common.time.Time;
import org.apache.flink.contrib.streaming.state.EmbeddedRocksDBStateBackend;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

public class FastRecoveryExample {
  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // Optimize for fast recovery
    // 1. Frequent checkpoints (balance with overhead)
    env.enableCheckpointing(30000);  // 30 seconds

    // 2. Use RocksDB with incremental checkpoints
    EmbeddedRocksDBStateBackend rocksDB =
      new EmbeddedRocksDBStateBackend(true);
    env.setStateBackend(rocksDB);

    // 3. Configure aggressive restart strategy
    env.setRestartStrategy(RestartStrategies.fixedDelayRestart(
      10,  // more restart attempts
      Time.seconds(5)  // shorter delay
    ));

    // 4. Set local recovery for faster state restoration
    env.getCheckpointConfig().enableLocalRecovery(true);

    // Recovery time factors:
    // - Checkpoint interval (30s) = max data loss window
    // - State size (100 MB incremental)
    // - Network speed (1 Gbps)
    // - Restart delay (5s)

    // Typical recovery timeline:
    // t=0: Failure detected
    // t=2s: TaskManager restarted
    // t=5s: Job rescheduled
    // t=8s: State restored from local disk (or remote)
    // t=10s: Processing resumed

    env.socketTextStream("localhost", 9999)
      .keyBy(x -> x)
      .map(x -> x.toUpperCase())
      .print();

    env.execute("Fast Recovery");

    // Output: Sub-minute recovery for most scenarios
    // Failure at 10:30:45
    // Restored from checkpoint at 10:30:32 (13s data loss)
    // Recovery completed at 10:30:55 (10s downtime)
    // Total MTTR: 10 seconds
  }
}`
        }
      ],
      description: 'Robust fault tolerance via distributed checkpointing with exactly-once semantics and fast automatic recovery.'
    },
    {
      id: 'table-sql', x: 80, y: 440, width: 350, height: 160,
      icon: '📊', title: 'Table API & SQL', color: 'red',
      details: [
        {
          name: 'Unified Batch & Stream',
          explanation: 'Single API for batch and streaming. SQL queries work on bounded and unbounded data. Automatic optimization for both modes. Seamless experience across processing types.',
          codeExample: `import org.apache.flink.table.api.*;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

public class UnifiedBatchStreamExample {
  public static void main(String[] args) {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    StreamTableEnvironment tableEnv =
      StreamTableEnvironment.create(env);

    // Same table definition works for both batch and streaming
    tableEnv.executeSql(
      "CREATE TABLE Orders (" +
      "  order_id STRING," +
      "  user_id STRING," +
      "  amount DOUBLE," +
      "  order_time TIMESTAMP(3)," +
      "  WATERMARK FOR order_time AS order_time - INTERVAL '5' SECOND" +
      ") WITH (" +
      "  'connector' = 'kafka'," +
      "  'topic' = 'orders'," +
      "  'properties.bootstrap.servers' = 'localhost:9092'," +
      "  'format' = 'json'" +
      ")"
    );

    // Query works on streaming data
    Table result = tableEnv.sqlQuery(
      "SELECT user_id, SUM(amount) as total " +
      "FROM Orders " +
      "GROUP BY user_id"
    );

    // For batch mode, set execution mode
    // tableEnv.getConfig().set("execution.runtime-mode", "BATCH");

    result.execute().print();

    // Output: Unified API for both modes
    // +--------------------------------+----------------------+
    // |                        user_id |                total |
    // +--------------------------------+----------------------+
    // |                          user1 |                250.0 |
    // |                          user2 |                175.5 |
    // +--------------------------------+----------------------+
  }
}`
        },
        {
          name: 'ANSI SQL Support',
          explanation: 'Standard SQL syntax and semantics. SELECT, WHERE, GROUP BY, JOIN, UNION. Window functions, aggregations, user-defined functions. Familiar for SQL developers.',
          codeExample: `import org.apache.flink.table.api.*;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

public class ANSISQLExample {
  public static void main(String[] args) {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    StreamTableEnvironment tableEnv =
      StreamTableEnvironment.create(env);

    // Create tables
    tableEnv.executeSql(
      "CREATE TABLE Sales (" +
      "  product_id STRING," +
      "  category STRING," +
      "  price DOUBLE," +
      "  quantity INT," +
      "  sale_time TIMESTAMP(3)" +
      ") WITH ('connector' = 'datagen', 'number-of-rows' = '100')"
    );

    // Standard ANSI SQL with window functions
    String query =
      "SELECT " +
      "  category, " +
      "  product_id, " +
      "  price, " +
      "  SUM(price * quantity) OVER (PARTITION BY category) as category_revenue, " +
      "  RANK() OVER (PARTITION BY category ORDER BY price DESC) as price_rank, " +
      "  AVG(price) OVER (PARTITION BY category) as avg_category_price " +
      "FROM Sales " +
      "WHERE price > 10.0 " +
      "  AND quantity > 0 " +
      "ORDER BY category, price_rank";

    // Complex JOIN query
    String joinQuery =
      "SELECT s.category, " +
      "       COUNT(*) as total_sales, " +
      "       SUM(s.price * s.quantity) as revenue " +
      "FROM Sales s " +
      "GROUP BY s.category " +
      "HAVING SUM(s.price * s.quantity) > 1000 " +
      "UNION ALL " +
      "SELECT 'TOTAL' as category, " +
      "       COUNT(*) as total_sales, " +
      "       SUM(price * quantity) as revenue " +
      "FROM Sales";

    tableEnv.sqlQuery(query).execute().print();

    // Output: Standard SQL features
    // category | product_id | price | category_revenue | price_rank
    // Electronics | P123 | 599.99 | 15000.0 | 1
    // Electronics | P456 | 399.99 | 15000.0 | 2
  }
}`
        },
        {
          name: 'Catalogs & Connectors',
          explanation: 'Integration with Hive metastore, JDBC catalogs. Pre-built connectors for Kafka, Kinesis, databases, file systems. Easy data source and sink integration. Plug-and-play connectivity.',
          codeExample: `import org.apache.flink.table.api.*;
import org.apache.flink.table.catalog.hive.HiveCatalog;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

public class CatalogsConnectorsExample {
  public static void main(String[] args) {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    StreamTableEnvironment tableEnv =
      StreamTableEnvironment.create(env);

    // Register Hive Catalog
    String catalogName = "myhive";
    String hiveConfDir = "/opt/hive-conf";
    String hiveVersion = "3.1.2";

    HiveCatalog hive = new HiveCatalog(
      catalogName,
      "default",
      hiveConfDir,
      hiveVersion
    );

    tableEnv.registerCatalog(catalogName, hive);
    tableEnv.useCatalog(catalogName);

    // Create table with Kafka connector
    tableEnv.executeSql(
      "CREATE TABLE kafka_orders (" +
      "  order_id STRING," +
      "  product STRING," +
      "  amount DOUBLE," +
      "  event_time TIMESTAMP(3)," +
      "  WATERMARK FOR event_time AS event_time - INTERVAL '5' SECOND" +
      ") WITH (" +
      "  'connector' = 'kafka'," +
      "  'topic' = 'orders'," +
      "  'properties.bootstrap.servers' = 'localhost:9092'," +
      "  'properties.group.id' = 'flink-consumer'," +
      "  'format' = 'json'," +
      "  'scan.startup.mode' = 'latest-offset'" +
      ")"
    );

    // Create table with JDBC connector (sink to PostgreSQL)
    tableEnv.executeSql(
      "CREATE TABLE postgres_analytics (" +
      "  product STRING," +
      "  total_revenue DOUBLE," +
      "  order_count BIGINT," +
      "  PRIMARY KEY (product) NOT ENFORCED" +
      ") WITH (" +
      "  'connector' = 'jdbc'," +
      "  'url' = 'jdbc:postgresql://localhost:5432/mydb'," +
      "  'table-name' = 'product_analytics'," +
      "  'username' = 'user'," +
      "  'password' = 'pass'" +
      ")"
    );

    // Query from Kafka and write to PostgreSQL
    tableEnv.executeSql(
      "INSERT INTO postgres_analytics " +
      "SELECT product, " +
      "       SUM(amount) as total_revenue, " +
      "       COUNT(*) as order_count " +
      "FROM kafka_orders " +
      "GROUP BY product"
    );

    // Output: Seamless integration with external systems
    // Data flows: Kafka -> Flink -> PostgreSQL
    // Hive metastore stores table metadata
  }
}`
        },
        {
          name: 'Table Ecosystem',
          explanation: 'Table API for programmatic queries. SQL for declarative queries. Interoperate with DataStream API. Convert between representations. Choose right abstraction level.',
          codeExample: `import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.table.api.*;
import org.apache.flink.table.api.bridge.java.StreamTableEnvironment;
import org.apache.flink.types.Row;
import static org.apache.flink.table.api.Expressions.*;

public class TableEcosystemExample {
  public static class Order {
    public String orderId;
    public String product;
    public double amount;

    public Order() {}

    public Order(String orderId, String product, double amount) {
      this.orderId = orderId;
      this.product = product;
      this.amount = amount;
    }
  }

  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    StreamTableEnvironment tableEnv =
      StreamTableEnvironment.create(env);

    // Create DataStream
    DataStream<Order> orderStream = env.fromElements(
      new Order("O1", "Laptop", 1200.0),
      new Order("O2", "Mouse", 25.0),
      new Order("O3", "Laptop", 1100.0)
    );

    // Convert DataStream to Table
    Table orderTable = tableEnv.fromDataStream(orderStream);

    // Use Table API (programmatic)
    Table apiResult = orderTable
      .groupBy($("product"))
      .select(
        $("product"),
        $("amount").sum().as("total_amount"),
        $("orderId").count().as("order_count")
      )
      .filter($("total_amount").isGreater(100));

    // Use SQL (declarative)
    tableEnv.createTemporaryView("orders", orderTable);
    Table sqlResult = tableEnv.sqlQuery(
      "SELECT product, " +
      "       SUM(amount) as total_amount, " +
      "       COUNT(*) as order_count " +
      "FROM orders " +
      "GROUP BY product " +
      "HAVING SUM(amount) > 100"
    );

    // Convert Table back to DataStream
    DataStream<Row> resultStream = tableEnv.toDataStream(sqlResult);

    // Process with DataStream API
    resultStream
      .map(row -> row.getField(0) + ": $" + row.getField(1))
      .print();

    env.execute("Table Ecosystem Example");

    // Output: Seamless interoperability
    // Laptop: $2300.0
  }
}`
        },
        {
          name: 'Continuous Queries',
          explanation: 'SQL queries that continuously update results. Materialized views over streams. Temporal table joins for versioned data. Powerful declarative streaming.',
          codeExample: `import org.apache.flink.table.api.*;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

public class ContinuousQueriesExample {
  public static void main(String[] args) {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    StreamTableEnvironment tableEnv =
      StreamTableEnvironment.create(env);

    // Create streaming source
    tableEnv.executeSql(
      "CREATE TABLE transactions (" +
      "  txn_id STRING," +
      "  user_id STRING," +
      "  amount DOUBLE," +
      "  txn_time TIMESTAMP(3)," +
      "  WATERMARK FOR txn_time AS txn_time - INTERVAL '10' SECOND" +
      ") WITH ('connector' = 'kafka', 'topic' = 'transactions', " +
      "'properties.bootstrap.servers' = 'localhost:9092', 'format' = 'json')"
    );

    // Create temporal table for currency rates
    tableEnv.executeSql(
      "CREATE TABLE currency_rates (" +
      "  currency STRING," +
      "  rate DOUBLE," +
      "  rate_time TIMESTAMP(3)," +
      "  WATERMARK FOR rate_time AS rate_time - INTERVAL '5' SECOND," +
      "  PRIMARY KEY(currency) NOT ENFORCED" +
      ") WITH ('connector' = 'kafka', 'topic' = 'rates', " +
      "'properties.bootstrap.servers' = 'localhost:9092', 'format' = 'json')"
    );

    // Continuous query with temporal join
    // Joins transaction with currency rate valid at transaction time
    String continuousQuery =
      "SELECT " +
      "  t.user_id, " +
      "  t.amount, " +
      "  r.rate, " +
      "  t.amount * r.rate as converted_amount, " +
      "  t.txn_time " +
      "FROM transactions AS t " +
      "LEFT JOIN currency_rates FOR SYSTEM_TIME AS OF t.txn_time AS r " +
      "  ON t.user_id = r.currency";

    // Continuous aggregation query
    String aggregationQuery =
      "SELECT " +
      "  user_id, " +
      "  TUMBLE_START(txn_time, INTERVAL '1' MINUTE) as window_start, " +
      "  COUNT(*) as txn_count, " +
      "  SUM(amount) as total_amount, " +
      "  AVG(amount) as avg_amount, " +
      "  MAX(amount) as max_amount " +
      "FROM transactions " +
      "GROUP BY user_id, TUMBLE(txn_time, INTERVAL '1' MINUTE)";

    Table result = tableEnv.sqlQuery(aggregationQuery);
    result.execute().print();

    // Output: Continuously updating results
    // user_id | window_start | txn_count | total_amount | avg_amount
    // user1 | 2024-01-01 10:00:00 | 15 | 1500.50 | 100.03
    // user1 | 2024-01-01 10:01:00 | 22 | 2200.75 | 100.03
    // (results update as new data arrives)
  }
}`
        },
        {
          name: 'Query Optimization',
          explanation: 'Cost-based optimizer like traditional databases. Push-down predicates, projection pruning. Join reordering, statistics-based decisions. Performance without manual tuning.',
          codeExample: `import org.apache.flink.table.api.*;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.configuration.Configuration;

public class QueryOptimizationExample {
  public static void main(String[] args) {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    StreamTableEnvironment tableEnv =
      StreamTableEnvironment.create(env);

    // Enable optimizer features
    Configuration config = tableEnv.getConfig().getConfiguration();

    // Enable predicate pushdown
    config.setString("table.optimizer.predicate-pushdown-enabled", "true");

    // Enable join reordering
    config.setString("table.optimizer.join-reorder-enabled", "true");

    // Create tables with statistics
    tableEnv.executeSql(
      "CREATE TABLE large_orders (" +
      "  order_id STRING," +
      "  customer_id STRING," +
      "  amount DOUBLE," +
      "  status STRING," +
      "  order_date DATE" +
      ") WITH ('connector' = 'datagen', 'number-of-rows' = '1000000')"
    );

    tableEnv.executeSql(
      "CREATE TABLE customers (" +
      "  customer_id STRING," +
      "  name STRING," +
      "  country STRING" +
      ") WITH ('connector' = 'datagen', 'number-of-rows' = '10000')"
    );

    // Complex query - optimizer will apply transformations
    String query =
      "SELECT " +
      "  c.name, " +
      "  c.country, " +
      "  o.amount " +
      "FROM large_orders o " +
      "JOIN customers c ON o.customer_id = c.customer_id " +
      "WHERE o.status = 'completed' " +  // Predicate pushed to source
      "  AND o.amount > 100 " +           // Filter early
      "  AND c.country = 'USA' " +        // Join condition optimized
      "  AND o.order_date >= CURRENT_DATE - INTERVAL '30' DAY";

    // Optimizer applies:
    // 1. Predicate pushdown: filters applied at source
    // 2. Projection pruning: only needed columns read
    // 3. Join reordering: smallest table first
    // 4. Filter reordering: most selective filters first

    // View execution plan
    Table result = tableEnv.sqlQuery(query);
    System.out.println(result.explain());

    result.execute().print();

    // Output: Optimized execution plan
    // == Optimized Physical Plan ==
    // Calc(select=[name, country, amount])
    // +- Join(joinType=[InnerJoin], where=[customer_id = customer_id])
    //    :- Exchange(distribution=[hash[customer_id]])
    //    :  +- Calc(select=[customer_id, amount], where=[status = 'completed'
    //    :     AND amount > 100 AND order_date >= ...])
    //    :     +- TableSourceScan(table=[[large_orders]], fields=[...])
    //    +- Exchange(distribution=[hash[customer_id]])
    //       +- Calc(select=[customer_id, name, country], where=[country = 'USA'])
    //          +- TableSourceScan(table=[[customers]], fields=[...])
  }
}`
        }
      ],
      description: 'Unified Table API and ANSI SQL for batch and streaming with connectors, catalogs, and query optimization.'
    },
    {
      id: 'deployment', x: 580, y: 540, width: 350, height: 160,
      icon: '🚀', title: 'Deployment & Scaling', color: 'orange',
      details: [
        {
          name: 'Flexible Deployment',
          explanation: 'Standalone cluster, YARN, Kubernetes, Mesos. Cloud platforms: AWS, GCP, Azure. Docker containers. Choose deployment matching infrastructure. Wide platform support.',
          codeExample: `import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.configuration.RestOptions;

public class FlexibleDeploymentExample {
  public static void main(String[] args) throws Exception {
    // Local deployment (for testing)
    StreamExecutionEnvironment localEnv =
      StreamExecutionEnvironment.createLocalEnvironment();

    // Remote cluster deployment
    Configuration config = new Configuration();
    config.setString(RestOptions.ADDRESS, "jobmanager-host");
    config.setInteger(RestOptions.PORT, 8081);
    StreamExecutionEnvironment remoteEnv =
      StreamExecutionEnvironment.createRemoteEnvironment(
        "jobmanager-host",
        8081,
        config,
        "/path/to/your-job.jar"
      );

    // Kubernetes native deployment (via kubectl)
    // flink-kubernetes-application.yaml:
    /*
    apiVersion: flink.apache.org/v1beta1
    kind: FlinkDeployment
    metadata:
      name: flink-streaming-app
    spec:
      image: flink:1.18
      flinkVersion: v1_18
      serviceAccount: flink
      jobManager:
        replicas: 1
        resource:
          memory: "2048m"
          cpu: 1
      taskManager:
        replicas: 3
        resource:
          memory: "4096m"
          cpu: 2
      job:
        jarURI: local:///opt/flink/usrlib/my-job.jar
        parallelism: 6
        state: running
    */

    // YARN deployment (via CLI)
    // $ flink run-application -t yarn-application \\
    //   -Djobmanager.memory.process.size=2048m \\
    //   -Dtaskmanager.memory.process.size=4096m \\
    //   -Dtaskmanager.numberOfTaskSlots=4 \\
    //   /path/to/your-job.jar

    // Docker standalone
    // docker-compose.yml:
    /*
    version: "3"
    services:
      jobmanager:
        image: flink:1.18
        ports:
          - "8081:8081"
        command: jobmanager
      taskmanager:
        image: flink:1.18
        depends_on:
          - jobmanager
        command: taskmanager
        scale: 3
    */

    // Output: Multiple deployment options for any infrastructure
  }
}`
        },
        {
          name: 'Dynamic Scaling',
          explanation: 'Rescale running jobs via savepoints. Change parallelism without data loss. Reactive mode auto-scales based on load. Kubernetes native auto-scaling integration.',
          codeExample: `import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.configuration.Configuration;

public class DynamicScalingExample {
  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // Set initial parallelism
    env.setParallelism(4);

    // Enable reactive mode (auto-scaling)
    Configuration config = env.getConfiguration();
    config.setString("scheduler-mode", "reactive");

    // Job code
    env.socketTextStream("localhost", 9999)
      .map(String::toUpperCase)
      .print();

    env.execute("Dynamic Scaling Example");

    // Manual rescaling via CLI:
    // 1. Trigger savepoint:
    //    $ flink savepoint <job-id> hdfs:///savepoints
    //    Output: Savepoint completed at hdfs:///savepoints/savepoint-abc123

    // 2. Cancel job:
    //    $ flink cancel <job-id>

    // 3. Restart with new parallelism:
    //    $ flink run -s hdfs:///savepoints/savepoint-abc123 \\
    //      -p 8 /path/to/job.jar
    //    (scales from 4 to 8 parallel tasks)

    // Kubernetes HPA (Horizontal Pod Autoscaler):
    /*
    apiVersion: autoscaling/v2
    kind: HorizontalPodAutoscaler
    metadata:
      name: flink-taskmanager-hpa
    spec:
      scaleTargetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: flink-taskmanager
      minReplicas: 2
      maxReplicas: 10
      metrics:
      - type: Resource
        resource:
          name: cpu
          target:
            type: Utilization
            averageUtilization: 70
    */

    // Output: Dynamic scaling without downtime
    // Initial: 4 TaskManagers, parallelism=4
    // After rescaling: 8 TaskManagers, parallelism=8
    // State preserved via savepoint
  }
}`
        },
        {
          name: 'Resource Management',
          explanation: 'Fine-grained resource configuration. TaskManager slots, memory management. Network buffer tuning. Optimize for workload characteristics. Efficient resource utilization.',
          codeExample: `import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.configuration.*;

public class ResourceManagementExample {
  public static void main(String[] args) throws Exception {
    Configuration config = new Configuration();

    // TaskManager configuration
    config.setString("taskmanager.numberOfTaskSlots", "4");

    // Memory configuration
    config.setString("taskmanager.memory.process.size", "4096m");
    config.setString("taskmanager.memory.flink.size", "3072m");
    config.setString("taskmanager.memory.managed.size", "1024m");
    config.setString("taskmanager.memory.network.min", "256m");
    config.setString("taskmanager.memory.network.max", "512m");

    // JobManager memory
    config.setString("jobmanager.memory.process.size", "2048m");
    config.setString("jobmanager.memory.heap.size", "1024m");

    // Network buffers (for shuffling)
    config.setInteger("taskmanager.network.numberOfBuffers", 8192);
    config.setString("taskmanager.network.memory.buffer-debloat.enabled", "true");

    // RocksDB state backend memory
    config.setString("state.backend.rocksdb.memory.managed", "true");
    config.setString("state.backend.rocksdb.memory.write-buffer-ratio", "0.5");

    // Slot sharing configuration
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment(config);

    // Set slot sharing groups for resource isolation
    env.socketTextStream("localhost", 9999)
      .map(String::toUpperCase).slotSharingGroup("map-group")
      .filter(s -> s.length() > 5).slotSharingGroup("filter-group")
      .print();

    env.execute("Resource Management");

    // Output: Fine-tuned resource allocation
    // TaskManager: 4 slots, 4GB memory
    //   - JVM Heap: 2GB
    //   - Managed Memory: 1GB (RocksDB)
    //   - Network Buffers: 512MB
    // Operators isolated in slot sharing groups
  }
}`
        },
        {
          name: 'High Availability',
          explanation: 'JobManager HA with ZooKeeper or Kubernetes. Automatic failover and recovery. No single point of failure. Production-grade reliability.',
          codeExample: `import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.configuration.*;

public class HighAvailabilityExample {
  public static void main(String[] args) throws Exception {
    Configuration config = new Configuration();

    // ZooKeeper-based HA
    config.setString("high-availability", "zookeeper");
    config.setString("high-availability.zookeeper.quorum",
      "zk1:2181,zk2:2181,zk3:2181");
    config.setString("high-availability.zookeeper.path.root", "/flink");
    config.setString("high-availability.cluster-id", "my-flink-cluster");
    config.setString("high-availability.storageDir",
      "hdfs:///flink/ha-storage");

    // Kubernetes-based HA (no ZooKeeper needed)
    config.setString("high-availability", "kubernetes");
    config.setString("high-availability.storageDir",
      "s3://flink-ha/my-cluster");
    config.setString("kubernetes.cluster-id", "my-flink-cluster");

    // JobManager HA configuration
    config.setInteger("jobmanager.execution.failover-strategy", 1);
    config.setString("restart-strategy", "fixed-delay");
    config.setInteger("restart-strategy.fixed-delay.attempts", 10);
    config.setString("restart-strategy.fixed-delay.delay", "10s");

    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment(config);

    // Enable checkpointing for state recovery
    env.enableCheckpointing(60000);

    env.socketTextStream("localhost", 9999)
      .keyBy(x -> x)
      .map(String::toUpperCase)
      .print();

    env.execute("HA Example");

    // HA behavior:
    // 1. Multiple JobManager instances running
    // 2. One leader, others standby
    // 3. Leader failure detected via ZooKeeper/Kubernetes
    // 4. Standby promoted to leader automatically
    // 5. Job recovered from last checkpoint
    // 6. Processing continues with minimal downtime

    // Output: No single point of failure
    // JobManager-1 (leader): Active
    // JobManager-2 (standby): Ready
    // JobManager-1 fails -> JobManager-2 becomes leader (<30s failover)
  }
}`
        },
        {
          name: 'Monitoring & Metrics',
          explanation: 'Built-in metrics system. REST API for monitoring. Integration with Prometheus, Grafana. Web UI for job visualization. Comprehensive observability.',
          codeExample: `import org.apache.flink.api.common.functions.RichMapFunction;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.metrics.Counter;
import org.apache.flink.metrics.Histogram;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.dropwizard.metrics.DropwizardHistogramWrapper;
import com.codahale.metrics.SlidingWindowReservoir;

public class MonitoringMetricsExample {
  public static class MetricsMapFunction extends RichMapFunction<String, String> {
    private transient Counter processedRecords;
    private transient Histogram valueLengthHistogram;

    @Override
    public void open(Configuration parameters) {
      // Create custom counter
      processedRecords = getRuntimeContext()
        .getMetricGroup()
        .counter("processed_records");

      // Create custom histogram
      valueLengthHistogram = getRuntimeContext()
        .getMetricGroup()
        .histogram("value_length",
          new DropwizardHistogramWrapper(
            new com.codahale.metrics.Histogram(
              new SlidingWindowReservoir(100)
            )
          )
        );
    }

    @Override
    public String map(String value) {
      processedRecords.inc();
      valueLengthHistogram.update(value.length());
      return value.toUpperCase();
    }
  }

  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // Configure Prometheus reporter in flink-conf.yaml:
    // metrics.reporter.prom.class: org.apache.flink.metrics.prometheus.PrometheusReporter
    // metrics.reporter.prom.port: 9249

    env.socketTextStream("localhost", 9999)
      .map(new MetricsMapFunction())
      .print();

    env.execute("Monitoring Example");

    // Available metrics endpoints:
    // REST API: http://jobmanager:8081/jobs/<job-id>/metrics
    // Prometheus: http://jobmanager:9249/metrics

    // Grafana dashboard queries:
    // - flink_taskmanager_job_task_numRecordsInPerSecond
    // - flink_taskmanager_job_task_numRecordsOutPerSecond
    // - flink_taskmanager_Status_JVM_Memory_Heap_Used
    // - flink_jobmanager_job_uptime
    // - flink_taskmanager_job_task_checkpointAlignmentTime

    // Output: Comprehensive observability
    // Custom metrics: processed_records, value_length histogram
    // System metrics: throughput, latency, memory, GC
    // Web UI: http://jobmanager:8081 (job graph, checkpoints, backpressure)
  }
}`
        },
        {
          name: 'Kubernetes Native',
          explanation: 'Native Kubernetes operator. Dynamic resource allocation. Auto-scaling support. Session and application modes. Cloud-native architecture first-class citizen.',
          codeExample: `// Kubernetes Native Flink Deployment
// flink-deployment.yaml

apiVersion: flink.apache.org/v1beta1
kind: FlinkDeployment
metadata:
  name: streaming-analytics
  namespace: flink-apps
spec:
  image: flink:1.18
  flinkVersion: v1_18
  flinkConfiguration:
    taskmanager.numberOfTaskSlots: "4"
    state.backend: rocksdb
    state.checkpoints.dir: s3://flink-checkpoints/streaming-analytics
    state.savepoints.dir: s3://flink-savepoints/streaming-analytics
    high-availability: kubernetes
    high-availability.storageDir: s3://flink-ha/streaming-analytics
    metrics.reporter.prom.class: org.apache.flink.metrics.prometheus.PrometheusReporter
    metrics.reporter.prom.port: "9249"

  serviceAccount: flink
  podTemplate:
    spec:
      containers:
        - name: flink-main-container
          resources:
            requests:
              memory: "2048Mi"
              cpu: "1000m"
            limits:
              memory: "4096Mi"
              cpu: "2000m"

  jobManager:
    replicas: 2  # HA mode
    resource:
      memory: "2048m"
      cpu: 1

  taskManager:
    replicas: 4
    resource:
      memory: "4096m"
      cpu: 2

  job:
    jarURI: s3://flink-jobs/streaming-analytics.jar
    entryClass: com.example.StreamingJob
    args: ["--kafka-bootstrap", "kafka:9092"]
    parallelism: 8
    upgradeMode: savepoint
    state: running
    savepointTriggerNonce: 0

---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: flink
  namespace: flink-apps

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: flink-taskmanager-hpa
  namespace: flink-apps
spec:
  scaleTargetRef:
    apiVersion: flink.apache.org/v1beta1
    kind: FlinkDeployment
    name: streaming-analytics
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Pods
    pods:
      metric:
        name: flink_taskmanager_Status_JVM_CPU_Load
      target:
        type: AverageValue
        averageValue: "0.7"

# Deploy:
# $ kubectl apply -f flink-deployment.yaml

# Output: Cloud-native Flink deployment
# - Dynamic resource allocation
# - Auto-scaling based on load
# - HA with Kubernetes leader election
# - S3 for checkpoints and savepoints
# - Prometheus metrics exported`
        }
      ],
      description: 'Flexible deployment on various platforms with dynamic scaling, high availability, and comprehensive monitoring.'
    },
    {
      id: 'connectors', x: 1080, y: 240, width: 350, height: 160,
      icon: '🔌', title: 'Connectors & Integration', color: 'teal',
      details: [
        {
          name: 'Apache Kafka',
          explanation: 'First-class Kafka integration. Exactly-once Kafka source and sink. Transaction support. Timestamp and watermark extraction. Most popular streaming source/sink.',
          codeExample: `import org.apache.flink.api.common.eventtime.WatermarkStrategy;
import org.apache.flink.api.common.serialization.SimpleStringSchema;
import org.apache.flink.connector.kafka.source.KafkaSource;
import org.apache.flink.connector.kafka.source.enumerator.initializer.OffsetsInitializer;
import org.apache.flink.connector.kafka.sink.KafkaSink;
import org.apache.flink.connector.kafka.sink.KafkaRecordSerializationSchema;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import java.time.Duration;

public class KafkaConnectorExample {
  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // Configure Kafka source with exactly-once semantics
    KafkaSource<String> source = KafkaSource.<String>builder()
      .setBootstrapServers("localhost:9092")
      .setTopics("input-topic")
      .setGroupId("flink-consumer-group")
      .setStartingOffsets(OffsetsInitializer.earliest())
      .setValueOnlyDeserializer(new SimpleStringSchema())
      .setProperty("partition.discovery.interval.ms", "10000")
      .setProperty("isolation.level", "read_committed")
      .build();

    // Read from Kafka with watermarks
    DataStream<String> stream = env.fromSource(
      source,
      WatermarkStrategy
        .<String>forBoundedOutOfOrderness(Duration.ofSeconds(5))
        .withIdleness(Duration.ofMinutes(1)),
      "Kafka Source"
    );

    // Process data
    DataStream<String> processed = stream
      .map(String::toUpperCase)
      .filter(s -> s.length() > 5);

    // Configure Kafka sink with exactly-once semantics
    KafkaSink<String> sink = KafkaSink.<String>builder()
      .setBootstrapServers("localhost:9092")
      .setRecordSerializer(KafkaRecordSerializationSchema.builder()
        .setTopic("output-topic")
        .setValueSerializationSchema(new SimpleStringSchema())
        .build()
      )
      .setDeliveryGuarantee(DeliveryGuarantee.EXACTLY_ONCE)
      .setTransactionalIdPrefix("flink-kafka-sink")
      .build();

    // Write to Kafka
    processed.sinkTo(sink);

    env.execute("Kafka Integration Example");

    // Output: Exactly-once end-to-end processing
    // Kafka (input-topic) -> Flink -> Kafka (output-topic)
    // Transactional writes ensure no duplicates or data loss
  }
}`
        },
        {
          name: 'File Systems',
          explanation: 'HDFS, S3, Azure Blob Storage, local files. Streaming file source monitors directories. Multiple formats: CSV, JSON, Avro, Parquet, ORC. Bucketing for efficient reads.',
          codeExample: `import org.apache.flink.api.common.serialization.SimpleStringEncoder;
import org.apache.flink.connector.file.src.FileSource;
import org.apache.flink.connector.file.src.reader.TextLineInputFormat;
import org.apache.flink.connector.file.sink.FileSink;
import org.apache.flink.core.fs.Path;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.api.functions.sink.filesystem.rollingpolicies.DefaultRollingPolicy;
import java.time.Duration;

public class FileSystemConnectorExample {
  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // Read from file system (S3, HDFS, local)
    FileSource<String> source = FileSource
      .forRecordStreamFormat(
        new TextLineInputFormat(),
        new Path("s3://my-bucket/input/")
      )
      .monitorContinuously(Duration.ofMinutes(1))  // Streaming mode
      .build();

    DataStream<String> stream = env.fromSource(
      source,
      WatermarkStrategy.noWatermarks(),
      "File Source"
    );

    // Process data
    DataStream<String> processed = stream
      .map(line -> line.toUpperCase())
      .filter(line -> line.contains("ERROR"));

    // Write to file system with bucketing
    FileSink<String> sink = FileSink
      .<String>forRowFormat(
        new Path("s3://my-bucket/output/"),
        new SimpleStringEncoder<>()
      )
      .withRollingPolicy(
        DefaultRollingPolicy.builder()
          .withRolloverInterval(Duration.ofMinutes(15))
          .withInactivityInterval(Duration.ofMinutes(5))
          .withMaxPartSize(128 * 1024 * 1024)  // 128 MB
          .build()
      )
      .withBucketAssigner(new DateTimeBucketAssigner<>("yyyy-MM-dd--HH"))
      .build();

    processed.sinkTo(sink);

    env.execute("File System Integration");

    // Output: Continuous file processing with bucketing
    // Input: s3://my-bucket/input/*.txt
    // Output: s3://my-bucket/output/2024-01-15--10/part-0-1.txt
    //         s3://my-bucket/output/2024-01-15--11/part-0-2.txt
    // Files rolled based on time/size policies
  }
}`
        },
        {
          name: 'Databases',
          explanation: 'JDBC connector for relational databases. Elasticsearch for search and analytics. MongoDB, Cassandra connectors. Change Data Capture (CDC) from databases with Debezium.',
          codeExample: `import org.apache.flink.connector.jdbc.*;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import com.ververica.cdc.connectors.mysql.source.MySqlSource;
import com.ververica.cdc.debezium.JsonDebeziumDeserializationSchema;

public class DatabaseConnectorExample {
  public static class User {
    public int id;
    public String name;
    public String email;

    public User() {}

    public User(int id, String name, String email) {
      this.id = id;
      this.name = name;
      this.email = email;
    }
  }

  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // CDC from MySQL using Debezium
    MySqlSource<String> cdcSource = MySqlSource.<String>builder()
      .hostname("localhost")
      .port(3306)
      .databaseList("mydb")
      .tableList("mydb.users")
      .username("root")
      .password("password")
      .deserializer(new JsonDebeziumDeserializationSchema())
      .build();

    DataStream<String> cdcStream = env.fromSource(
      cdcSource,
      WatermarkStrategy.noWatermarks(),
      "MySQL CDC Source"
    );

    // Process CDC events (insert, update, delete)
    cdcStream.print();

    // JDBC sink to PostgreSQL
    DataStream<User> userStream = env.fromElements(
      new User(1, "Alice", "alice@example.com"),
      new User(2, "Bob", "bob@example.com"),
      new User(3, "Charlie", "charlie@example.com")
    );

    // Create JDBC sink with connection pooling
    userStream.addSink(
      JdbcSink.sink(
        "INSERT INTO users (id, name, email) VALUES (?, ?, ?) " +
        "ON CONFLICT (id) DO UPDATE SET name = ?, email = ?",
        (ps, user) -> {
          ps.setInt(1, user.id);
          ps.setString(2, user.name);
          ps.setString(3, user.email);
          ps.setString(4, user.name);
          ps.setString(5, user.email);
        },
        JdbcExecutionOptions.builder()
          .withBatchSize(100)
          .withBatchIntervalMs(200)
          .withMaxRetries(3)
          .build(),
        new JdbcConnectionOptions.JdbcConnectionOptionsBuilder()
          .withUrl("jdbc:postgresql://localhost:5432/mydb")
          .withDriverName("org.postgresql.Driver")
          .withUsername("user")
          .withPassword("pass")
          .build()
      )
    );

    env.execute("Database Integration");

    // Output: Real-time CDC and database writes
    // MySQL changes -> Flink CDC -> Processing -> PostgreSQL
    // Captures all insert/update/delete operations
  }
}`
        },
        {
          name: 'AWS Services',
          explanation: 'Kinesis Data Streams source and sink. DynamoDB connector. S3 integration. AWS native deployments. Cloud-native streaming pipelines.',
          codeExample: `import org.apache.flink.connector.kinesis.sink.KinesisStreamsSink;
import org.apache.flink.connector.aws.config.AWSConfigConstants;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.connectors.kinesis.FlinkKinesisConsumer;
import org.apache.flink.streaming.connectors.kinesis.config.ConsumerConfigConstants;
import org.apache.flink.api.common.serialization.SimpleStringSchema;
import java.util.Properties;

public class AWSConnectorExample {
  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // Configure Kinesis source
    Properties consumerConfig = new Properties();
    consumerConfig.setProperty(
      AWSConfigConstants.AWS_REGION, "us-east-1"
    );
    consumerConfig.setProperty(
      AWSConfigConstants.AWS_ACCESS_KEY_ID, "your-access-key"
    );
    consumerConfig.setProperty(
      AWSConfigConstants.AWS_SECRET_ACCESS_KEY, "your-secret-key"
    );
    consumerConfig.setProperty(
      ConsumerConfigConstants.STREAM_INITIAL_POSITION,
      "LATEST"
    );

    // Create Kinesis consumer
    FlinkKinesisConsumer<String> kinesisSource =
      new FlinkKinesisConsumer<>(
        "input-stream",
        new SimpleStringSchema(),
        consumerConfig
      );

    DataStream<String> kinesisStream = env.addSource(kinesisSource);

    // Process data
    DataStream<String> processed = kinesisStream
      .map(String::toUpperCase)
      .filter(s -> s.length() > 10);

    // Configure Kinesis sink
    KinesisStreamsSink<String> kinesisSink = KinesisStreamsSink.<String>builder()
      .setKinesisClientProperties(consumerConfig)
      .setSerializationSchema(new SimpleStringSchema())
      .setPartitionKeyGenerator(element -> String.valueOf(element.hashCode()))
      .setStreamName("output-stream")
      .setFailOnError(false)
      .setMaxBatchSize(500)
      .setMaxInFlightRequests(50)
      .setMaxBufferedRequests(10000)
      .build();

    processed.sinkTo(kinesisSink);

    // S3 integration for checkpoints
    env.getCheckpointConfig().setCheckpointStorage(
      "s3://my-bucket/flink-checkpoints/"
    );
    env.enableCheckpointing(60000);

    env.execute("AWS Services Integration");

    // Output: AWS-native streaming pipeline
    // Kinesis (input-stream) -> Flink -> Kinesis (output-stream)
    // Checkpoints stored in S3
    // Can deploy on EMR, EKS, or EC2
  }
}`
        },
        {
          name: 'Message Queues',
          explanation: 'RabbitMQ, Apache Pulsar connectors. Google Pub/Sub integration. Azure Event Hubs. Various messaging systems supported. Flexible message routing.',
          codeExample: `import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.connectors.rabbitmq.RMQSource;
import org.apache.flink.streaming.connectors.rabbitmq.RMQSink;
import org.apache.flink.streaming.connectors.rabbitmq.common.RMQConnectionConfig;
import org.apache.flink.api.common.serialization.SimpleStringSchema;
import org.apache.pulsar.client.api.PulsarClient;
import org.apache.flink.connector.pulsar.source.PulsarSource;
import org.apache.flink.connector.pulsar.sink.PulsarSink;

public class MessageQueueConnectorExample {
  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // RabbitMQ configuration
    RMQConnectionConfig rmqConfig = new RMQConnectionConfig.Builder()
      .setHost("localhost")
      .setPort(5672)
      .setVirtualHost("/")
      .setUserName("guest")
      .setPassword("guest")
      .build();

    // RabbitMQ source
    DataStream<String> rabbitStream = env.addSource(
      new RMQSource<>(
        rmqConfig,
        "input-queue",
        true,  // use correlation id
        new SimpleStringSchema()
      )
    ).setParallelism(1);

    // Process data
    DataStream<String> processed = rabbitStream
      .map(String::toUpperCase)
      .filter(s -> s.startsWith("IMPORTANT"));

    // RabbitMQ sink
    processed.addSink(
      new RMQSink<>(
        rmqConfig,
        "output-queue",
        new SimpleStringSchema()
      )
    ).setParallelism(1);

    // Apache Pulsar integration
    PulsarSource<String> pulsarSource = PulsarSource.builder()
      .setServiceUrl("pulsar://localhost:6650")
      .setAdminUrl("http://localhost:8080")
      .setTopics("input-topic")
      .setDeserializationSchema(new SimpleStringSchema())
      .setSubscriptionName("flink-subscription")
      .build();

    DataStream<String> pulsarStream = env.fromSource(
      pulsarSource,
      WatermarkStrategy.noWatermarks(),
      "Pulsar Source"
    );

    PulsarSink<String> pulsarSink = PulsarSink.builder()
      .setServiceUrl("pulsar://localhost:6650")
      .setAdminUrl("http://localhost:8080")
      .setTopics("output-topic")
      .setSerializationSchema(new SimpleStringSchema())
      .build();

    pulsarStream
      .map(String::toLowerCase)
      .sinkTo(pulsarSink);

    env.execute("Message Queue Integration");

    // Output: Multiple messaging system support
    // RabbitMQ: queue-based routing
    // Pulsar: topic-based pub/sub with multi-tenancy
    // Both support reliable message delivery
  }
}`
        },
        {
          name: 'Custom Connectors',
          explanation: 'Implement SourceFunction, SinkFunction interfaces. Rich ecosystem of community connectors. Table API connector framework. Easy to extend.',
          codeExample: `import org.apache.flink.streaming.api.functions.source.SourceFunction;
import org.apache.flink.streaming.api.functions.sink.SinkFunction;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import java.util.Random;

public class CustomConnectorExample {
  // Custom source - simulates sensor data
  public static class CustomSensorSource implements SourceFunction<SensorReading> {
    private volatile boolean isRunning = true;
    private Random random = new Random();

    @Override
    public void run(SourceContext<SensorReading> ctx) throws Exception {
      while (isRunning) {
        String sensorId = "sensor_" + random.nextInt(10);
        double temperature = 15 + random.nextDouble() * 30;
        long timestamp = System.currentTimeMillis();

        ctx.collect(new SensorReading(sensorId, timestamp, temperature));

        Thread.sleep(100);  // 10 readings/second
      }
    }

    @Override
    public void cancel() {
      isRunning = false;
    }
  }

  // Custom sink - writes to custom storage
  public static class CustomStorageSink implements SinkFunction<SensorReading> {
    @Override
    public void invoke(SensorReading value, Context context) {
      // Custom logic to write to your storage system
      System.out.println("Writing to custom storage: " + value);

      // Example: Write to REST API, custom database, cache, etc.
      // restClient.post("/api/sensors", value);
      // customDB.insert(value);
      // cache.put(value.sensorId, value);
    }
  }

  public static class SensorReading {
    public String sensorId;
    public long timestamp;
    public double temperature;

    public SensorReading() {}

    public SensorReading(String sensorId, long timestamp, double temperature) {
      this.sensorId = sensorId;
      this.timestamp = timestamp;
      this.temperature = temperature;
    }

    @Override
    public String toString() {
      return String.format("Sensor(%s, %d, %.2f°C)",
        sensorId, timestamp, temperature);
    }
  }

  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // Use custom source
    DataStream<SensorReading> sensorStream = env.addSource(
      new CustomSensorSource()
    );

    // Process data
    DataStream<SensorReading> filtered = sensorStream
      .filter(reading -> reading.temperature > 25.0);

    // Use custom sink
    filtered.addSink(new CustomStorageSink());

    env.execute("Custom Connector Example");

    // Output: Custom source and sink implementation
    // Sensor(sensor_3, 1704120345000, 28.45°C)
    // Writing to custom storage: Sensor(sensor_7, 1704120346000, 31.20°C)
    // Easy to integrate with any system not covered by existing connectors
  }
}`
        }
      ],
      description: 'Rich ecosystem of connectors for Kafka, file systems, databases, cloud services, and message queues.'
    },
    {
      id: 'performance', x: 1080, y: 440, width: 350, height: 160,
      icon: '⚡', title: 'Performance & Optimization', color: 'indigo',
      details: [
        {
          name: 'Pipelined Execution',
          explanation: 'Records flow through operators without materialization. Low latency, continuous processing. Efficient memory usage. No intermediate storage between operators unless required.',
          codeExample: `import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.api.common.functions.MapFunction;
import org.apache.flink.api.common.functions.FilterFunction;

public class PipelinedExecutionExample {
  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // Configure for low latency
    env.setBufferTimeout(10);  // 10ms buffer timeout

    DataStream<String> input = env.socketTextStream("localhost", 9999);

    // Pipelined execution: records flow through operators immediately
    // No materialization between operators
    DataStream<String> result = input
      .map(new MapFunction<String, String>() {
        public String map(String value) {
          // Record passes through immediately, no buffering
          return value.toUpperCase();
        }
      })
      .filter(new FilterFunction<String>() {
        public boolean filter(String value) {
          // Evaluated immediately after map
          return value.length() > 5;
        }
      })
      .map(new MapFunction<String, String>() {
        public String map(String value) {
          // Continues pipelined processing
          return "Processed: " + value;
        }
      });

    result.print();

    env.execute("Pipelined Execution");

    // Performance characteristics:
    // - Sub-millisecond latency through operator chain
    // - No disk I/O between operators
    // - Memory-efficient (no intermediate buffers)
    // - Continuous data flow without blocking

    // Output: Immediate processing
    // Input:  "hello world" (t=0ms)
    // Map1:   "HELLO WORLD" (t=0.1ms)
    // Filter: passed (t=0.2ms)
    // Map2:   "Processed: HELLO WORLD" (t=0.3ms)
    // Total latency: <1ms
  }
}`
        },
        {
          name: 'Memory Management',
          explanation: 'Off-heap memory management for large datasets. Controlled memory allocation. Spill to disk when needed. Avoid JVM garbage collection pressure. Predictable performance.',
          codeExample: `import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.configuration.TaskManagerOptions;

public class MemoryManagementExample {
  public static void main(String[] args) throws Exception {
    Configuration config = new Configuration();

    // Configure TaskManager memory
    config.set(TaskManagerOptions.TOTAL_PROCESS_MEMORY,
      org.apache.flink.configuration.MemorySize.ofMebiBytes(4096));

    // Managed memory (for sorting, hashing, caching)
    config.set(TaskManagerOptions.MANAGED_MEMORY_SIZE,
      org.apache.flink.configuration.MemorySize.ofMebiBytes(1024));

    // Network memory (for shuffling)
    config.set(TaskManagerOptions.NETWORK_MEMORY_MIN,
      org.apache.flink.configuration.MemorySize.ofMebiBytes(256));
    config.set(TaskManagerOptions.NETWORK_MEMORY_MAX,
      org.apache.flink.configuration.MemorySize.ofMebiBytes(512));

    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment(config);

    // Memory management benefits:
    // 1. Off-heap storage: reduces GC pressure
    // 2. Predictable memory usage: no OutOfMemoryErrors
    // 3. Spill to disk: handles datasets larger than memory
    // 4. Binary format: efficient serialization

    // Example: Large aggregation using managed memory
    env.fromElements(1, 2, 3, 4, 5)
      .keyBy(x -> x % 2)
      .sum(0)  // Uses managed memory for state
      .print();

    env.execute("Memory Management");

    // Memory layout:
    // Total: 4096 MB
    //   ├─ JVM Heap: 1792 MB (for objects, operators)
    //   ├─ Managed Memory: 1024 MB (off-heap, for algorithms)
    //   ├─ Network: 512 MB (for data shuffling)
    //   └─ Framework: 768 MB (TaskManager, metrics, etc.)

    // Output: Efficient memory usage with predictable performance
    // No GC pauses, handles large state, automatic spilling
  }
}`
        },
        {
          name: 'Network Stack',
          explanation: 'Zero-copy network transfers where possible. Credit-based flow control. Back-pressure handling. Efficient data shuffling. Optimized for high throughput.',
          codeExample: `import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.configuration.Configuration;

public class NetworkStackExample {
  public static void main(String[] args) throws Exception {
    Configuration config = new Configuration();

    // Network buffer configuration
    config.setInteger("taskmanager.network.numberOfBuffers", 8192);
    config.setString("taskmanager.network.memory.buffer-debloat.enabled", "true");
    config.setString("taskmanager.network.memory.buffer-debloat.target", "1s");

    // Credit-based flow control (automatic back-pressure)
    config.setBoolean("taskmanager.network.credit-based-flow-control.enabled", true);

    // Compression for network transfers
    config.setString("execution.batch-shuffle-mode", "ALL_EXCHANGES_BLOCKING");
    config.setBoolean("taskmanager.network.compression.enabled", true);

    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment(config);

    // High-throughput data shuffling example
    DataStream<Integer> stream = env.fromElements(
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    );

    // KeyBy triggers data shuffling across network
    DataStream<Integer> shuffled = stream
      .keyBy(x -> x % 3)  // Redistributes data by key
      .map(x -> x * 2);

    shuffled.print();

    env.execute("Network Stack Example");

    // Network optimizations:
    // 1. Zero-copy transfers: direct buffer access
    // 2. Credit-based flow control: prevents buffer overflow
    // 3. Back-pressure: automatic slowdown when downstream slow
    // 4. Compression: reduces network bandwidth usage
    // 5. Buffer reuse: minimizes allocations

    // Performance:
    // - Throughput: 10+ Gbps per TaskManager
    // - Latency: <10ms for shuffling
    // - Back-pressure: millisecond reaction time

    // Output: Efficient network communication
    // Data shuffled across tasks with minimal overhead
    // Automatic back-pressure prevents memory issues
  }
}`
        },
        {
          name: 'Operator Chaining',
          explanation: 'Combine operators in single task for efficiency. Reduces serialization and network overhead. Automatic based on optimization rules. Better resource utilization.',
          codeExample: `import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

public class OperatorChainingExample {
  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    DataStream<String> input = env.fromElements(
      "hello", "world", "flink", "streaming"
    );

    // Example 1: Operators will be chained automatically
    DataStream<String> chained = input
      .map(s -> s.toUpperCase())      // Chained
      .filter(s -> s.length() > 5)    // Chained
      .map(s -> "Result: " + s);      // Chained

    // All three operators run in same thread - no serialization!

    // Example 2: Disable chaining when needed
    DataStream<String> unchained = input
      .map(s -> s.toUpperCase())
      .disableChaining()              // Break chain here
      .filter(s -> s.length() > 5);

    // Example 3: Start new chain
    DataStream<String> newChain = input
      .map(s -> s.toUpperCase())
      .filter(s -> s.length() > 5)
      .startNewChain()                // New chain starts
      .map(s -> "Result: " + s);

    // Example 4: Slot sharing group (resource isolation)
    DataStream<String> isolated = input
      .map(s -> s.toUpperCase()).slotSharingGroup("group1")
      .filter(s -> s.length() > 5).slotSharingGroup("group2");

    chained.print();

    env.execute("Operator Chaining");

    // Benefits of chaining:
    // 1. No serialization between chained operators
    // 2. Reduced network communication (0 bytes)
    // 3. Better CPU cache locality
    // 4. Lower latency (direct function calls)
    // 5. Better resource utilization

    // Performance comparison:
    // Chained:   100M records/sec, 1ms latency
    // Unchained: 50M records/sec, 5ms latency

    // Output: Optimized execution
    // 3 operators chained -> Single task
    // No intermediate buffers or network transfers
  }
}`
        },
        {
          name: 'Batch Processing Mode',
          explanation: 'Bounded data processed efficiently in batch mode. Different optimizations than streaming. Still uses unified API. Best of both worlds.',
          codeExample: `import org.apache.flink.api.common.RuntimeExecutionMode;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.api.datastream.DataStream;

public class BatchProcessingModeExample {
  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // Enable batch execution mode
    env.setRuntimeMode(RuntimeExecutionMode.BATCH);

    // Same API works for both streaming and batch!
    DataStream<String> input = env.fromElements(
      "apple", "banana", "cherry", "apple", "banana", "apple"
    );

    // Batch optimizations applied automatically:
    // - Sorting instead of hashing for grouping
    // - Blocking shuffles (more efficient for bounded data)
    // - Memory-optimized algorithms
    // - No checkpointing overhead

    DataStream<Tuple2<String, Integer>> result = input
      .map(word -> new Tuple2<>(word, 1))
      .keyBy(tuple -> tuple.f0)
      .sum(1);

    result.print();

    env.execute("Batch Mode Example");

    // Batch mode optimizations:
    // 1. Sort-based grouping (vs hash-based)
    // 2. Blocking data exchange (vs pipelined)
    // 3. Memory-optimized operators
    // 4. Adaptive query execution
    // 5. No checkpointing overhead

    // Performance comparison (1TB dataset):
    // Streaming mode: 60 minutes, continuous output
    // Batch mode: 30 minutes, bulk output

    // When to use batch mode:
    // - Bounded datasets (files, finite tables)
    // - Historical data processing
    // - ETL jobs
    // - Analytics queries

    // When to use streaming mode:
    // - Unbounded streams (Kafka, Kinesis)
    // - Real-time processing
    // - Low-latency requirements
    // - Continuous queries

    // Output: Efficient batch processing
    // (apple, 3)
    // (banana, 2)
    // (cherry, 1)
  }
}`
        },
        {
          name: 'Benchmarks',
          explanation: 'Sub-second latency for simple operations. Multi-million events per second throughput. Scales linearly with parallelism. Industry-leading performance for streaming.',
          codeExample: `import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.api.functions.source.RichParallelSourceFunction;

public class BenchmarkExample {
  // High-throughput data generator
  public static class ThroughputSource extends RichParallelSourceFunction<Long> {
    private volatile boolean running = true;
    private long count = 0;

    @Override
    public void run(SourceContext<Long> ctx) {
      long startTime = System.currentTimeMillis();

      while (running) {
        ctx.collect(count++);

        // Report throughput every 1M records
        if (count % 1_000_000 == 0) {
          long duration = System.currentTimeMillis() - startTime;
          double throughput = (count / (duration / 1000.0));
          System.out.println(
            "Throughput: " + (long)(throughput / 1_000_000) + "M events/sec"
          );
        }
      }
    }

    @Override
    public void cancel() {
      running = false;
    }
  }

  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // Optimize for throughput
    env.setParallelism(8);              // 8 parallel tasks
    env.setBufferTimeout(100);          // 100ms buffer
    env.disableOperatorChaining();      // Measure individual operators

    // Benchmark test
    DataStream<Long> source = env.addSource(new ThroughputSource());

    // Simple transformations
    source
      .map(x -> x * 2)                  // Latency: <100ns
      .filter(x -> x % 2 == 0)          // Latency: <100ns
      .keyBy(x -> x % 100)              // Shuffling: <10ms
      .sum(0)                           // Aggregation: <1ms
      .print();

    env.execute("Benchmark Test");

    // Performance results (industry benchmarks):

    // Latency:
    // - Simple map/filter: <100 nanoseconds
    // - Keyed operations: <1 millisecond
    // - Window aggregations: <100 milliseconds
    // - End-to-end (Kafka→Flink→Kafka): <10 milliseconds

    // Throughput (per core):
    // - Simple pipeline: 10M+ events/sec
    // - With state: 5M+ events/sec
    // - With complex joins: 1M+ events/sec

    // Scalability:
    // - 1 core: 10M events/sec
    // - 10 cores: 100M events/sec (linear)
    // - 100 cores: 1B events/sec (linear)
    // - 1000 cores: 10B+ events/sec

    // State size support:
    // - MemoryStateBackend: GBs
    // - FsStateBackend: 10s-100s GB
    // - RocksDBStateBackend: TBs

    // Output: Industry-leading performance
    // Throughput: 10M events/sec
    // Throughput: 20M events/sec
    // Throughput: 30M events/sec
    // Linear scaling with parallelism
  }
}`
        }
      ],
      description: 'High-performance execution with pipelined processing, memory management, and optimizations for throughput and latency.'
    },
    {
      id: 'use-cases', x: 1080, y: 640, width: 350, height: 140,
      icon: '🎯', title: 'Use Cases & Applications', color: 'pink',
      details: [
        {
          name: 'Real-time Analytics',
          explanation: 'Live dashboards, metrics computation, trend analysis. Real-time business intelligence. Continuous aggregations over streams. Sub-second insights from data.',
          codeExample: `import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.api.windowing.assigners.TumblingProcessingTimeWindows;
import org.apache.flink.streaming.api.windowing.time.Time;
import org.apache.flink.api.java.tuple.Tuple3;

public class RealTimeAnalyticsExample {
  public static class WebEvent {
    public String userId;
    public String page;
    public long timestamp;
    public double value;

    public WebEvent(String userId, String page, long timestamp, double value) {
      this.userId = userId;
      this.page = page;
      this.timestamp = timestamp;
      this.value = value;
    }
  }

  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // Simulate real-time web events
    DataStream<WebEvent> events = env.fromElements(
      new WebEvent("user1", "/products", System.currentTimeMillis(), 100.0),
      new WebEvent("user2", "/checkout", System.currentTimeMillis(), 250.0),
      new WebEvent("user1", "/cart", System.currentTimeMillis(), 50.0),
      new WebEvent("user3", "/products", System.currentTimeMillis(), 75.0)
    );

    // Real-time metrics: page views per minute
    DataStream<Tuple3<String, Long, Long>> pageViews = events
      .map(e -> new Tuple3<>(e.page, 1L, e.timestamp))
      .keyBy(tuple -> tuple.f0)
      .window(TumblingProcessingTimeWindows.of(Time.minutes(1)))
      .sum(1);

    // Real-time revenue tracking
    DataStream<Tuple3<String, Double, String>> revenue = events
      .keyBy(e -> e.page)
      .window(TumblingProcessingTimeWindows.of(Time.seconds(10)))
      .aggregate(new AggregateFunction<WebEvent, Double, Tuple3<String, Double, String>>() {
        public Double createAccumulator() {
          return 0.0;
        }

        public Double add(WebEvent event, Double acc) {
          return acc + event.value;
        }

        public Tuple3<String, Double, String> getResult(Double acc) {
          return new Tuple3<>("Total Revenue", acc, "per 10s window");
        }

        public Double merge(Double a, Double b) {
          return a + b;
        }
      });

    // User activity tracking
    DataStream<Tuple3<String, Long, Long>> activeUsers = events
      .keyBy(e -> e.userId)
      .window(TumblingProcessingTimeWindows.of(Time.minutes(5)))
      .aggregate(new AggregateFunction<WebEvent, Long, Tuple3<String, Long, Long>>() {
        public Long createAccumulator() {
          return 0L;
        }

        public Long add(WebEvent event, Long count) {
          return count + 1;
        }

        public Tuple3<String, Long, Long> getResult(Long count) {
          return new Tuple3<>("Active Users", count, System.currentTimeMillis());
        }

        public Long merge(Long a, Long b) {
          return a + b;
        }
      });

    pageViews.print();
    revenue.print();

    env.execute("Real-Time Analytics Dashboard");

    // Output: Live dashboard metrics updated every second
    // (/products, 1250, timestamp)    // 1250 views/minute
    // (/checkout, 850, timestamp)     // 850 views/minute
    // (Total Revenue, 52500.00, "per 10s window")
    // Real-time business intelligence for decision making
  }
}`
        },
        {
          name: 'ETL Pipelines',
          explanation: 'Stream ETL for data ingestion and transformation. Real-time data warehousing. CDC-based pipelines. Replace batch ETL with streaming. Always fresh data.',
          codeExample: `import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.connector.kafka.source.KafkaSource;
import org.apache.flink.connector.jdbc.JdbcSink;
import com.ververica.cdc.connectors.mysql.source.MySqlSource;

public class StreamingETLExample {
  public static class RawEvent {
    public String id;
    public String rawData;
    public long timestamp;
  }

  public static class CleanedEvent {
    public String id;
    public String category;
    public double value;
    public long timestamp;
  }

  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // EXTRACT: Read from MySQL CDC (Change Data Capture)
    MySqlSource<String> cdcSource = MySqlSource.<String>builder()
      .hostname("localhost")
      .port(3306)
      .databaseList("source_db")
      .tableList("source_db.transactions")
      .username("root")
      .password("password")
      .deserializer(new JsonDebeziumDeserializationSchema())
      .build();

    DataStream<String> sourceStream = env.fromSource(
      cdcSource,
      WatermarkStrategy.noWatermarks(),
      "MySQL CDC Source"
    );

    // TRANSFORM: Clean, enrich, and validate data
    DataStream<CleanedEvent> transformed = sourceStream
      .map(json -> parseJson(json))            // Parse JSON
      .filter(event -> event.value > 0)        // Filter invalid
      .map(event -> enrichWithMetadata(event)) // Enrich
      .keyBy(event -> event.category)
      .map(event -> normalize(event));         // Normalize

    // LOAD: Write to multiple destinations
    // 1. Data warehouse (PostgreSQL)
    transformed.addSink(
      JdbcSink.sink(
        "INSERT INTO analytics.events (id, category, value, timestamp) " +
        "VALUES (?, ?, ?, ?)",
        (ps, event) -> {
          ps.setString(1, event.id);
          ps.setString(2, event.category);
          ps.setDouble(3, event.value);
          ps.setLong(4, event.timestamp);
        },
        JdbcExecutionOptions.builder()
          .withBatchSize(1000)
          .withBatchIntervalMs(200)
          .build(),
        new JdbcConnectionOptions.JdbcConnectionOptionsBuilder()
          .withUrl("jdbc:postgresql://warehouse:5432/analytics")
          .withDriverName("org.postgresql.Driver")
          .withUsername("user")
          .withPassword("pass")
          .build()
      )
    );

    // 2. Real-time cache (Redis)
    transformed
      .keyBy(event -> event.id)
      .addSink(new RedisSink(redisConfig));

    // 3. Archive to S3 (partitioned by date)
    transformed
      .map(event -> toAvro(event))
      .sinkTo(FileSink
        .forBulkFormat(
          new Path("s3://data-lake/events/"),
          AvroWriters.forReflectRecord(CleanedEvent.class)
        )
        .withBucketAssigner(new DateTimeBucketAssigner<>("yyyy-MM-dd"))
        .build()
      );

    env.execute("Streaming ETL Pipeline");

    // Output: Real-time data pipeline
    // MySQL -> Transform -> PostgreSQL (analytics)
    //                   -> Redis (cache)
    //                   -> S3 (archive)
    // Always fresh data, no batch delays
    // Latency: <1 second end-to-end
  }
}`
        },
        {
          name: 'Fraud Detection',
          explanation: 'Real-time transaction monitoring. Pattern detection across events. ML model scoring. Immediate alerts. Used by financial institutions.',
          codeExample: `import org.apache.flink.cep.CEP;
import org.apache.flink.cep.PatternStream;
import org.apache.flink.cep.pattern.Pattern;
import org.apache.flink.cep.pattern.conditions.SimpleCondition;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.api.windowing.time.Time;

public class FraudDetectionExample {
  public static class Transaction {
    public String userId;
    public String cardNumber;
    public double amount;
    public String location;
    public long timestamp;

    public Transaction(String userId, String cardNumber, double amount,
                      String location, long timestamp) {
      this.userId = userId;
      this.cardNumber = cardNumber;
      this.amount = amount;
      this.location = location;
      this.timestamp = timestamp;
    }
  }

  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // Real-time transaction stream
    DataStream<Transaction> transactions = env.fromElements(
      new Transaction("user1", "1234", 50.0, "NYC", 1000L),
      new Transaction("user1", "1234", 5000.0, "NYC", 2000L),
      new Transaction("user1", "1234", 5500.0, "London", 3000L), // Suspicious!
      new Transaction("user2", "5678", 100.0, "LA", 4000L)
    );

    // Rule 1: Large transaction followed by international transaction
    Pattern<Transaction, ?> suspiciousPattern = Pattern
      .<Transaction>begin("largeTransaction")
        .where(new SimpleCondition<Transaction>() {
          public boolean filter(Transaction txn) {
            return txn.amount > 1000.0;
          }
        })
      .next("internationalTransaction")
        .where(new SimpleCondition<Transaction>() {
          public boolean filter(Transaction txn) {
            return !txn.location.equals("NYC") && !txn.location.equals("LA");
          }
        })
      .within(Time.minutes(5));

    // Apply pattern matching
    PatternStream<Transaction> patternStream = CEP.pattern(
      transactions.keyBy(txn -> txn.userId),
      suspiciousPattern
    );

    // Generate fraud alerts
    DataStream<String> fraudAlerts = patternStream.select(
      (pattern) -> {
        Transaction first = pattern.get("largeTransaction").get(0);
        Transaction second = pattern.get("internationalTransaction").get(0);

        return String.format(
          "FRAUD ALERT: User %s - Large transaction $%.2f followed by " +
          "international transaction $%.2f in %s within 5 minutes!",
          first.userId, first.amount, second.amount, second.location
        );
      }
    );

    // Rule 2: ML model scoring for anomaly detection
    DataStream<String> mlScores = transactions
      .map(txn -> {
        // Load trained ML model and score transaction
        double anomalyScore = scoreWithMLModel(txn);

        if (anomalyScore > 0.8) {  // High anomaly score
          return String.format(
            "ML ALERT: Transaction %s has anomaly score %.2f",
            txn.cardNumber, anomalyScore
          );
        }
        return null;
      })
      .filter(alert -> alert != null);

    // Rule 3: Velocity check - too many transactions
    DataStream<String> velocityAlerts = transactions
      .keyBy(txn -> txn.cardNumber)
      .window(TumblingProcessingTimeWindows.of(Time.minutes(1)))
      .aggregate(new AggregateFunction<Transaction, Long, String>() {
        public Long createAccumulator() {
          return 0L;
        }

        public Long add(Transaction txn, Long count) {
          return count + 1;
        }

        public String getResult(Long count) {
          if (count > 10) {
            return "VELOCITY ALERT: " + count + " transactions in 1 minute";
          }
          return null;
        }

        public Long merge(Long a, Long b) {
          return a + b;
        }
      })
      .filter(alert -> alert != null);

    // Combine all alerts and send to notification system
    fraudAlerts.union(mlScores).union(velocityAlerts)
      .addSink(new AlertSink());  // Email, SMS, Slack, etc.

    env.execute("Fraud Detection System");

    // Output: Real-time fraud detection
    // FRAUD ALERT: User user1 - Large transaction $5000.00 followed by
    // international transaction $5500.00 in London within 5 minutes!
    // Response time: <100ms
    // Prevents fraudulent transactions before completion
  }
}`
        },
        {
          name: 'IoT & Sensors',
          explanation: 'Process sensor data in real-time. Anomaly detection. Predictive maintenance. Edge to cloud pipelines. Handle high-volume device data.',
          codeExample: `import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.api.functions.windowing.ProcessWindowFunction;
import org.apache.flink.streaming.api.windowing.assigners.SlidingEventTimeWindows;
import org.apache.flink.streaming.api.windowing.time.Time;
import org.apache.flink.util.Collector;

public class IoTSensorExample {
  public static class SensorReading {
    public String deviceId;
    public String sensorType;
    public double value;
    public long timestamp;

    public SensorReading(String deviceId, String sensorType,
                        double value, long timestamp) {
      this.deviceId = deviceId;
      this.sensorType = sensorType;
      this.value = value;
      this.timestamp = timestamp;
    }
  }

  public static class Alert {
    public String deviceId;
    public String alertType;
    public String message;
    public long timestamp;
  }

  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // High-volume sensor data stream (millions of sensors)
    DataStream<SensorReading> sensorData = env
      .addSource(new IoTSensorSource())
      .assignTimestampsAndWatermarks(
        WatermarkStrategy
          .<SensorReading>forBoundedOutOfOrderness(Duration.ofSeconds(5))
          .withTimestampAssigner((event, timestamp) -> event.timestamp)
      );

    // Anomaly detection: temperature spikes
    DataStream<Alert> temperatureAlerts = sensorData
      .filter(reading -> reading.sensorType.equals("temperature"))
      .keyBy(reading -> reading.deviceId)
      .window(SlidingEventTimeWindows.of(Time.minutes(5), Time.minutes(1)))
      .process(new ProcessWindowFunction<
          SensorReading, Alert, String, TimeWindow>() {

        public void process(String deviceId,
                          Context context,
                          Iterable<SensorReading> readings,
                          Collector<Alert> out) {
          // Calculate statistics
          double sum = 0.0;
          int count = 0;
          for (SensorReading r : readings) {
            sum += r.value;
            count++;
          }
          double avg = sum / count;

          // Check for anomalies (temp > 80°C or rapid change)
          for (SensorReading r : readings) {
            if (r.value > 80.0 || Math.abs(r.value - avg) > 20.0) {
              out.collect(new Alert(
                deviceId,
                "TEMPERATURE_ANOMALY",
                String.format("Temperature %.1f°C exceeds threshold (avg: %.1f°C)",
                  r.value, avg),
                r.timestamp
              ));
            }
          }
        }
      });

    // Predictive maintenance: vibration analysis
    DataStream<Alert> maintenanceAlerts = sensorData
      .filter(reading -> reading.sensorType.equals("vibration"))
      .keyBy(reading -> reading.deviceId)
      .window(TumblingEventTimeWindows.of(Time.hours(1)))
      .aggregate(new AggregateFunction<
          SensorReading, Tuple3<Double, Double, Integer>,
          Tuple3<Double, Double, Integer>>() {

        public Tuple3<Double, Double, Integer> createAccumulator() {
          return new Tuple3<>(0.0, 0.0, 0);
        }

        public Tuple3<Double, Double, Integer> add(
            SensorReading value,
            Tuple3<Double, Double, Integer> acc) {
          return new Tuple3<>(
            acc.f0 + value.value,
            Math.max(acc.f1, value.value),
            acc.f2 + 1
          );
        }

        public Tuple3<Double, Double, Integer> getResult(
            Tuple3<Double, Double, Integer> acc) {
          return acc;
        }

        public Tuple3<Double, Double, Integer> merge(
            Tuple3<Double, Double, Integer> a,
            Tuple3<Double, Double, Integer> b) {
          return new Tuple3<>(
            a.f0 + b.f0,
            Math.max(a.f1, b.f1),
            a.f2 + b.f2
          );
        }
      })
      .map(stats -> {
        double avg = stats.f0 / stats.f2;
        double max = stats.f1;

        // Predict maintenance need
        if (avg > 50.0 || max > 80.0) {
          return new Alert(
            "device",
            "PREDICTIVE_MAINTENANCE",
            String.format("High vibration detected: avg=%.1f, max=%.1f. " +
              "Schedule maintenance soon!", avg, max),
            System.currentTimeMillis()
          );
        }
        return null;
      })
      .filter(alert -> alert != null);

    // Combine alerts and send to monitoring dashboard
    temperatureAlerts.union(maintenanceAlerts)
      .addSink(new MonitoringDashboardSink());

    env.execute("IoT Sensor Processing");

    // Output: Real-time IoT monitoring
    // Processing: 1M+ sensors, 10M+ readings/second
    // TEMPERATURE_ANOMALY: Device sensor_42 - 95.3°C exceeds threshold
    // PREDICTIVE_MAINTENANCE: Device pump_15 - Schedule maintenance
    // Prevents equipment failures, reduces downtime
  }
}`
        },
        {
          name: 'Recommendation Engines',
          explanation: 'Real-time personalization. Feature computation for ML. Online model serving. E-commerce, content platforms. Immediate user experience updates.',
          codeExample: `import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.api.common.state.ValueState;
import org.apache.flink.api.common.state.ValueStateDescriptor;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.streaming.api.functions.KeyedProcessFunction;
import org.apache.flink.util.Collector;
import java.util.*;

public class RecommendationEngineExample {
  public static class UserEvent {
    public String userId;
    public String eventType;  // view, click, purchase
    public String itemId;
    public long timestamp;
  }

  public static class UserProfile {
    public Set<String> viewedItems = new HashSet<>();
    public Set<String> purchasedItems = new HashSet<>();
    public Map<String, Integer> categoryInterests = new HashMap<>();
    public double totalSpent = 0.0;
  }

  public static class Recommendation {
    public String userId;
    public List<String> recommendedItems;
    public double relevanceScore;
  }

  public static void main(String[] args) throws Exception {
    StreamExecutionEnvironment env =
      StreamExecutionEnvironment.getExecutionEnvironment();

    // Real-time user activity stream
    DataStream<UserEvent> userEvents = env
      .addSource(new KafkaSource<>("user-events"));

    // Build real-time user profiles
    DataStream<UserProfile> profiles = userEvents
      .keyBy(event -> event.userId)
      .process(new KeyedProcessFunction<
          String, UserEvent, UserProfile>() {

        private ValueState<UserProfile> profileState;

        @Override
        public void open(Configuration parameters) {
          profileState = getRuntimeContext().getState(
            new ValueStateDescriptor<>("user-profile", UserProfile.class)
          );
        }

        @Override
        public void processElement(
            UserEvent event,
            Context ctx,
            Collector<UserProfile> out) throws Exception {

          UserProfile profile = profileState.value();
          if (profile == null) {
            profile = new UserProfile();
          }

          // Update profile based on event
          switch (event.eventType) {
            case "view":
              profile.viewedItems.add(event.itemId);
              break;
            case "click":
              // Increase interest in category
              String category = getCategory(event.itemId);
              profile.categoryInterests.put(
                category,
                profile.categoryInterests.getOrDefault(category, 0) + 1
              );
              break;
            case "purchase":
              profile.purchasedItems.add(event.itemId);
              profile.totalSpent += getPrice(event.itemId);
              break;
          }

          profileState.update(profile);
          out.collect(profile);
        }
      });

    // Generate real-time recommendations
    DataStream<Recommendation> recommendations = profiles
      .keyBy(profile -> profile.userId)
      .map(profile -> {
        // Collaborative filtering + content-based
        List<String> recommended = new ArrayList<>();

        // 1. Find similar users (collaborative filtering)
        Set<String> similarUserItems =
          findSimilarUserItems(profile);

        // 2. Content-based recommendations
        Set<String> contentBased =
          findSimilarItems(profile.viewedItems);

        // 3. Trending items in user's categories
        Set<String> trending =
          getTrendingInCategories(profile.categoryInterests);

        // 4. ML model scoring
        for (String itemId : similarUserItems) {
          double score = scoreItemForUser(profile, itemId);
          if (score > 0.7 && !profile.purchasedItems.contains(itemId)) {
            recommended.add(itemId);
          }
        }

        // Sort by relevance and return top 10
        recommended.sort((a, b) ->
          Double.compare(
            scoreItemForUser(profile, b),
            scoreItemForUser(profile, a)
          )
        );

        return new Recommendation(
          profile.userId,
          recommended.subList(0, Math.min(10, recommended.size())),
          calculateRelevance(profile, recommended)
        );
      });

    // Update recommendation cache for instant serving
    recommendations
      .keyBy(rec -> rec.userId)
      .addSink(new RedisSink<>("recommendations"));

    // Track recommendation performance
    DataStream<String> metrics = userEvents
      .join(recommendations)
        .where(event -> event.userId)
        .equalTo(rec -> rec.userId)
        .window(TumblingEventTimeWindows.of(Time.minutes(5)))
        .apply((event, rec) -> {
          // Calculate click-through rate, conversion rate
          boolean clicked = event.eventType.equals("click") &&
            rec.recommendedItems.contains(event.itemId);
          boolean purchased = event.eventType.equals("purchase") &&
            rec.recommendedItems.contains(event.itemId);

          return String.format(
            "User %s - Clicked: %b, Purchased: %b, Relevance: %.2f",
            event.userId, clicked, purchased, rec.relevanceScore
          );
        });

    metrics.print();

    env.execute("Real-Time Recommendation Engine");

    // Output: Personalized recommendations in real-time
    // User user123 -> [item456, item789, item321, ...]
    // Relevance: 0.92
    // CTR: 12.5%, Conversion: 3.2%
    // Response time: <50ms
    // Immediate user experience updates
  }
}`
        }
      ],
      description: 'Versatile applications: real-time analytics, ETL, fraud detection, IoT processing, and recommendation systems.'
    }
  ]

  const handleComponentClick = (component) => {
    setSelectedComponent(component)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedComponent(null)
    setSelectedConcept(null)


  }

  // Use refs to access current modal state in event handler
  const selectedConceptRef = useRef(selectedConcept)
  useEffect(() => {
    selectedConceptRef.current = selectedConcept
  }, [selectedConcept])


  // Set initial focus on mount
  useEffect(() => {
    setFocusedComponentIndex(0)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentSelectedConcept = selectedConceptRef.current
      // Handle Escape to close modal or go back to menu
      if (e.key === 'Escape') {
        if (currentSelectedConcept) {
          e.preventDefault()
          e.stopImmediatePropagation()
          setSelectedConcept(null)
          return
        }
        return
      }

      if (currentSelectedConcept) {
        // Modal is open, don't handle other keys
        return
      }

      // Navigation when modal is closed
      const componentCount = components.length

      switch(e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault()
          setFocusedComponentIndex((prev) => (prev + 1) % componentCount)
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          setFocusedComponentIndex((prev) => (prev - 1 + componentCount) % componentCount)
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (components[focusedComponentIndex]) {
            handleComponentClick(components[focusedComponentIndex])
          }
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [focusedComponentIndex])

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept)
  }

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '95%',
      margin: '120px auto 0',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      border: '3px solid rgba(20, 184, 166, 0.4)'
    }}>
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
        >
          ← Back to Menu
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          🌊 Apache Flink
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <div style={{
        backgroundColor: 'rgba(20, 184, 166, 0.05)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(20, 184, 166, 0.3)',
        marginBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.3rem',
          color: '#374151',
          fontWeight: '500',
          margin: 0,
          lineHeight: '1.8',
          textAlign: 'center'
        }}>
          Apache Flink is a distributed stream processing framework for stateful computations over unbounded and bounded data streams.
          True streaming with event time processing, exactly-once semantics, and powerful state management
          for real-time analytics, ETL pipelines, and complex event processing at scale.
        </p>
      </div>

      <ModernDiagram
        components={components}
        onComponentClick={handleComponentClick}
        title="Apache Flink Architecture & Capabilities"
        width={1400}
        height={800}
        containerWidth={1800}
      
        focusedIndex={focusedComponentIndex}
      />

      {/* Modal */}
      {isModalOpen && selectedComponent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2.5rem',
            borderRadius: '16px',
            maxWidth: '1400px',
            width: '95%',
            maxHeight: '85vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '3px solid rgba(20, 184, 166, 0.4)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: '#1f2937',
                margin: 0,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                {selectedComponent.icon} {selectedComponent.title}
              </h2>
              <button
                onClick={closeModal}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{
              backgroundColor: 'rgba(20, 184, 166, 0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '2px solid rgba(20, 184, 166, 0.2)',
              marginBottom: '2rem'
            }}>
              <p style={{
                fontSize: '1.1rem',
                color: '#374151',
                fontWeight: '500',
                margin: 0,
                lineHeight: '1.6'
              }}>
                {selectedComponent.description}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: selectedConcept ? '1fr 1fr' : '1fr',
              gap: '2rem'
            }}>
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  Key Features
                </h3>
                <div style={{
                  display: 'grid',
                  gap: '0.75rem'
                }}>
                  {selectedComponent.details.map((detail, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleConceptClick(detail)}
                      style={{
                        backgroundColor: selectedConcept?.name === detail.name
                          ? 'rgba(20, 184, 166, 0.15)'
                          : 'rgba(34, 197, 94, 0.1)',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: selectedConcept?.name === detail.name
                          ? '2px solid rgba(20, 184, 166, 0.4)'
                          : '2px solid rgba(34, 197, 94, 0.2)',
                        fontSize: '0.95rem',
                        fontWeight: '500',
                        color: selectedConcept?.name === detail.name
                          ? '#0d9488'
                          : '#166534',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        transform: 'scale(1)'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedConcept?.name !== detail.name) {
                          e.target.style.backgroundColor = 'rgba(34, 197, 94, 0.15)'
                          e.target.style.transform = 'scale(1.02)'
                          e.target.style.borderColor = 'rgba(34, 197, 94, 0.4)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedConcept?.name !== detail.name) {
                          e.target.style.backgroundColor = 'rgba(34, 197, 94, 0.1)'
                          e.target.style.transform = 'scale(1)'
                          e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)'
                        }
                      }}
                    >
                      • {detail.name}
                      {selectedConcept?.name === detail.name && (
                        <span style={{
                          fontSize: '0.8rem',
                          opacity: 0.8,
                          marginLeft: '0.5rem',
                          fontWeight: '600'
                        }}>
                          ← Selected
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {selectedConcept && (
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '1rem'
                  }}>
                    {selectedConcept.name}
                  </h3>

                  <div style={{
                    backgroundColor: 'rgba(20, 184, 166, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(20, 184, 166, 0.2)',
                    marginBottom: '1.5rem'
                  }}>
                    <p style={{
                      fontSize: '1rem',
                      color: '#374151',
                      fontWeight: '500',
                      margin: 0,
                      lineHeight: '1.7',
                      textAlign: 'justify'
                    }}>
                      {selectedConcept.explanation}
                    </p>
                  </div>

                  {selectedConcept.codeExample && (
                    <div style={{
                      backgroundColor: 'rgba(59, 130, 246, 0.05)',
                      padding: '1.25rem',
                      borderRadius: '12px',
                      border: '2px solid rgba(59, 130, 246, 0.2)'
                    }}>
                      <h4 style={{
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: '#1e40af',
                        margin: '0 0 0.75rem 0'
                      }}>
                        📝 Code Example
                      </h4>
                      <SyntaxHighlighter code={selectedConcept.codeExample} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default ApacheFlink

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function JFRQuestions({ onBack, breadcrumb, problemLimit }) {
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

      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true
          codeLanguage = line.trim().substring(3) || 'java'
          codeLines = []
        } else {
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

      if (line.trim() === '') {
        result.push(<div key={lineIndex} style={{ height: '0.5rem' }}></div>)
        continue
      }

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

      result.push(
        <div key={lineIndex} style={{ marginTop: '0.5rem', textAlign: 'left' }}>
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
      difficulty: 'Medium',
      question: 'What is Java Flight Recorder and explain its architecture',
      answer: `**Java Flight Recorder (JFR):**
A profiling and diagnostics framework built into the JVM for collecting detailed runtime information with minimal overhead

**Key Features:**
- Built into HotSpot JVM (free since JDK 11, backported to JDK 8u262+)
- Extremely low overhead (typically {'<'} 1% in production)
- Circular buffer design prevents disk space exhaustion
- Always-on capability for production monitoring
- Rich event model covering JVM internals, OS, and application events

**Architecture:**

**1. Event Infrastructure:**
\`\`\`
┌───────────────────────────────────────┐
│              JVM Process              │
│  ┌─────────────┐  ┌───────────────┐  │
│  │  Application │  │  JVM Internals│  │
│  │  Events      │  │  Events       │  │
│  └──────┬───────┘  └───────┬───────┘  │
│         │                  │          │
│    ┌────▼──────────────────▼────┐     │
│    │   Thread-Local Buffers     │     │
│    └────────────┬───────────────┘     │
│                 │                     │
│    ┌────────────▼───────────────┐     │
│    │    Global Buffer Pool      │     │
│    └────────────┬───────────────┘     │
│                 │                     │
│    ┌────────────▼───────────────┐     │
│    │   Repository (disk/memory) │     │
│    └────────────────────────────┘     │
└───────────────────────────────────────┘
\`\`\`

**2. Starting JFR:**
\`\`\`bash
# Command-line at JVM startup
java -XX:StartFlightRecording=duration=60s,filename=recording.jfr MyApp

# With detailed settings
java -XX:StartFlightRecording=\\
  name=MyRecording,\\
  settings=profile,\\
  duration=300s,\\
  maxsize=500m,\\
  filename=/tmp/recording.jfr \\
  MyApp

# Continuous recording (always-on)
java -XX:StartFlightRecording=\\
  name=continuous,\\
  settings=default,\\
  maxage=24h,\\
  maxsize=1g,\\
  disk=true,\\
  dumponexit=true,\\
  dumponexitpath=/tmp/dump.jfr \\
  MyApp
\`\`\`

**3. Runtime Control via jcmd:**
\`\`\`bash
# Start recording on running JVM
jcmd {'<'}pid> JFR.start name=myRecording settings=profile duration=120s

# Dump current recording
jcmd {'<'}pid> JFR.dump name=myRecording filename=snapshot.jfr

# Stop recording
jcmd {'<'}pid> JFR.stop name=myRecording

# Check active recordings
jcmd {'<'}pid> JFR.check

# Configure recording
jcmd {'<'}pid> JFR.configure repositorypath=/tmp/jfr
\`\`\`

**4. Recording Settings:**
\`\`\`
Default Profile (default.jfc):
- Low overhead ({'<'} 1%)
- Basic event collection
- Suitable for continuous production use

Profile Setting (profile.jfc):
- Higher detail (1-3% overhead)
- Method profiling enabled
- Object allocation tracking
- Suitable for targeted investigation
\`\`\`

**5. Programmatic API:**
\`\`\`java
import jdk.jfr.*;

// Start recording programmatically
Recording recording = new Recording();
recording.enable("jdk.CPULoad").withPeriod(Duration.ofSeconds(1));
recording.enable("jdk.GarbageCollection");
recording.enable("jdk.ThreadSleep").withThreshold(Duration.ofMillis(10));
recording.setMaxAge(Duration.ofHours(1));
recording.setMaxSize(100_000_000); // 100 MB
recording.start();

// Later, dump to file
recording.dump(Path.of("recording.jfr"));
recording.stop();
recording.close();
\`\`\``
    },
    {
      id: 2,
      category: 'Event System',
      difficulty: 'Hard',
      question: 'Explain JFR event categories and how to create custom events',
      answer: `**JFR Event Categories:**

**1. JVM Events:**
\`\`\`
Runtime:
- jdk.ClassLoad: Class loading events
- jdk.ClassUnload: Class unloading
- jdk.Compilation: JIT compilation events
- jdk.Deoptimization: Method deoptimizations

GC Events:
- jdk.GarbageCollection: GC cycle information
- jdk.GCPhasePause: Individual GC pause phases
- jdk.G1HeapRegionTypeChange: G1 region transitions
- jdk.OldObjectSample: Objects promoting to old gen

Thread Events:
- jdk.ThreadStart / jdk.ThreadEnd
- jdk.ThreadSleep: Thread.sleep() calls
- jdk.ThreadPark: LockSupport.park() calls
- jdk.JavaMonitorWait: Object.wait() calls
- jdk.JavaMonitorEnter: Synchronized block contention
\`\`\`

**2. Operating System Events:**
\`\`\`
- jdk.CPULoad: System and process CPU usage
- jdk.PhysicalMemory: Physical memory info
- jdk.NetworkUtilization: Network I/O stats
- jdk.ProcessStart: Child process creation
\`\`\`

**3. I/O Events:**
\`\`\`
- jdk.FileRead / jdk.FileWrite: File I/O operations
- jdk.SocketRead / jdk.SocketWrite: Network socket I/O
- jdk.FileForce: fsync operations
\`\`\`

**4. Creating Custom Events:**
\`\`\`java
import jdk.jfr.*;

@Name("com.example.OrderProcessed")
@Label("Order Processed")
@Description("Event emitted when an order is processed")
@Category({"Application", "Orders"})
@StackTrace(false)
public class OrderProcessedEvent extends Event {

    @Label("Order ID")
    public String orderId;

    @Label("Customer ID")
    public String customerId;

    @Label("Total Amount")
    @DataAmount
    public double totalAmount;

    @Label("Item Count")
    public int itemCount;

    @Label("Processing Duration")
    @Timespan(Timespan.MILLISECONDS)
    public long processingTimeMs;
}
\`\`\`

**5. Using Custom Events:**
\`\`\`java
public class OrderService {

    public Order processOrder(OrderRequest request) {
        OrderProcessedEvent event = new OrderProcessedEvent();
        event.begin();

        try {
            // Process the order
            Order order = createOrder(request);
            event.orderId = order.getId();
            event.customerId = request.getCustomerId();
            event.totalAmount = order.getTotal();
            event.itemCount = order.getItems().size();
            return order;
        } finally {
            event.end();
            event.processingTimeMs = event.getDuration().toMillis();
            if (event.shouldCommit()) {
                event.commit();
            }
        }
    }
}
\`\`\`

**6. Periodic Custom Events:**
\`\`\`java
@Name("com.example.QueueDepth")
@Label("Queue Depth")
@Category({"Application", "Metrics"})
@Period("5 s")
public class QueueDepthEvent extends Event {

    @Label("Queue Name")
    public String queueName;

    @Label("Current Depth")
    public int depth;

    @Label("Max Capacity")
    public int maxCapacity;
}

// Register periodic event hook
FlightRecorder.addPeriodicEvent(QueueDepthEvent.class, () -> {
    QueueDepthEvent event = new QueueDepthEvent();
    event.queueName = "order-queue";
    event.depth = orderQueue.size();
    event.maxCapacity = orderQueue.remainingCapacity() + orderQueue.size();
    event.commit();
});
\`\`\`

**7. Event Settings Configuration:**
\`\`\`xml
<!-- custom.jfc -->
{'<'}configuration>
  {'<'}event name="com.example.OrderProcessed">
    {'<'}setting name="enabled">true</setting>
    {'<'}setting name="threshold">10 ms</setting>
    {'<'}setting name="stackTrace">true</setting>
  </event>
  {'<'}event name="jdk.JavaMonitorEnter">
    {'<'}setting name="enabled">true</setting>
    {'<'}setting name="threshold">20 ms</setting>
    {'<'}setting name="stackTrace">true</setting>
  </event>
  {'<'}event name="jdk.GarbageCollection">
    {'<'}setting name="enabled">true</setting>
    {'<'}setting name="threshold">0 ms</setting>
  </event>
</configuration>
\`\`\`

**8. Consuming Events Programmatically:**
\`\`\`java
import jdk.jfr.consumer.*;

// Read from file
try (RecordingFile file = new RecordingFile(Path.of("recording.jfr"))) {
    while (file.hasMoreEvents()) {
        RecordedEvent event = file.readEvent();
        if (event.getEventType().getName().equals("jdk.GarbageCollection")) {
            System.out.println("GC: " + event.getString("name")
                + " duration=" + event.getDuration().toMillis() + "ms");
        }
    }
}

// Stream events in real-time (JDK 14+)
try (var stream = new RecordingStream()) {
    stream.enable("jdk.CPULoad").withPeriod(Duration.ofSeconds(1));
    stream.enable("jdk.GarbageCollection");

    stream.onEvent("jdk.CPULoad", event -> {
        float machineTotal = event.getFloat("machineTotal");
        float jvmUser = event.getFloat("jvmUser");
        System.out.printf("CPU: machine=%.1f%% jvm=%.1f%%%n",
            machineTotal * 100, jvmUser * 100);
    });

    stream.onEvent("jdk.GarbageCollection", event -> {
        System.out.println("GC: " + event.getString("name")
            + " cause=" + event.getString("cause"));
    });

    stream.start(); // blocks
}
\`\`\``
    },
    {
      id: 3,
      category: 'Production Profiling',
      difficulty: 'Hard',
      question: 'How do you use JFR for production performance troubleshooting?',
      answer: `**Production Profiling with JFR:**

**1. Always-On Production Configuration:**
\`\`\`bash
# Recommended production JVM flags
java -XX:StartFlightRecording=\\
  name=production,\\
  settings=default,\\
  maxage=12h,\\
  maxsize=500m,\\
  disk=true,\\
  dumponexit=true,\\
  dumponexitpath=/var/log/jfr/exit_dump.jfr \\
  -jar myapp.jar
\`\`\`

**2. Troubleshooting High CPU:**
\`\`\`bash
# Capture profiling recording
jcmd {'<'}pid> JFR.start name=cpu_profile \\
  settings=profile \\
  duration=60s \\
  filename=/tmp/cpu_profile.jfr
\`\`\`

**Key events to analyze:**
\`\`\`
jdk.ExecutionSample (Method profiling):
- Shows which methods consume most CPU
- Sampled every 10ms in profile mode
- Provides full stack traces

jdk.CPULoad:
- System vs JVM CPU usage
- jvmUser: Application CPU time
- jvmSystem: JVM system CPU time
- machineTotal: Overall machine CPU

jdk.Compilation:
- JIT compilation activity
- Deoptimization events that cause recompilation
\`\`\`

**3. Troubleshooting Memory Issues:**
\`\`\`bash
# Enable allocation profiling
jcmd {'<'}pid> JFR.start name=memory_profile \\
  settings=profile \\
  duration=120s \\
  filename=/tmp/memory_profile.jfr
\`\`\`

**Key events:**
\`\`\`
jdk.ObjectAllocationInNewTLAB:
- Large TLAB allocations
- Shows allocation hot spots

jdk.ObjectAllocationOutsideTLAB:
- Allocations too large for TLAB
- Potential for optimization

jdk.OldObjectSample:
- Objects surviving to old generation
- Memory leak candidates

jdk.GarbageCollection:
- GC frequency and duration
- GC cause (Allocation Failure, System.gc(), etc.)

jdk.GCPhasePause:
- Individual GC phase timings
- Identifies longest stop-the-world phases
\`\`\`

**4. Troubleshooting Latency:**
\`\`\`
Thread Contention Events:
- jdk.JavaMonitorEnter: Synchronized lock contention
- jdk.JavaMonitorWait: Object.wait() calls
- jdk.ThreadPark: Lock/condition waits

I/O Latency Events:
- jdk.FileRead / jdk.FileWrite: Disk I/O delays
- jdk.SocketRead / jdk.SocketWrite: Network delays

Key Analysis:
1. Sort JavaMonitorEnter by duration (descending)
2. Identify lock objects causing contention
3. Review stack traces to find code paths
4. Check if locks can be replaced with concurrent structures
\`\`\`

**5. GC Troubleshooting:**
\`\`\`java
// Programmatic GC analysis
try (RecordingFile file = new RecordingFile(Path.of("recording.jfr"))) {
    long totalPauseMs = 0;
    int gcCount = 0;

    while (file.hasMoreEvents()) {
        RecordedEvent event = file.readEvent();
        if (event.getEventType().getName().equals("jdk.GarbageCollection")) {
            long pauseMs = event.getDuration().toMillis();
            String gcName = event.getString("name");
            String cause = event.getString("cause");

            totalPauseMs += pauseMs;
            gcCount++;

            if (pauseMs > 200) {
                System.out.printf("Long GC: %s cause=%s duration=%dms%n",
                    gcName, cause, pauseMs);
            }
        }
    }
    System.out.printf("Total: %d GCs, %dms total pause%n", gcCount, totalPauseMs);
}
\`\`\`

**6. Thread Analysis:**
\`\`\`
Common Thread Issues Detected by JFR:

Thread Starvation:
- High jdk.ThreadPark events with long durations
- Thread pool exhaustion visible in thread count events

Deadlock Detection:
- jdk.JavaMonitorEnter events with very long durations
- Cross-referencing lock owners and waiters

Thread Leak:
- Increasing jdk.ThreadStart without corresponding jdk.ThreadEnd
- Growing active thread count over time
\`\`\`

**7. Automated Alerting with JFR Streaming:**
\`\`\`java
// Real-time monitoring with event streaming (JDK 14+)
try (var stream = new RecordingStream()) {
    stream.enable("jdk.GarbageCollection");
    stream.enable("jdk.CPULoad").withPeriod(Duration.ofSeconds(5));
    stream.enable("jdk.JavaMonitorEnter").withThreshold(Duration.ofMillis(100));

    stream.onEvent("jdk.GarbageCollection", event -> {
        if (event.getDuration().toMillis() > 500) {
            alerting.send("Long GC pause: " +
                event.getDuration().toMillis() + "ms");
        }
    });

    stream.onEvent("jdk.CPULoad", event -> {
        if (event.getFloat("jvmUser") > 0.9) {
            alerting.send("High CPU: " +
                (event.getFloat("jvmUser") * 100) + "%");
        }
    });

    stream.startAsync();
}
\`\`\`

**8. Comparing Recordings:**
\`\`\`bash
# Take baseline recording
jcmd {'<'}pid> JFR.start name=baseline duration=300s filename=baseline.jfr

# After code change, take comparison recording
jcmd {'<'}pid> JFR.start name=comparison duration=300s filename=comparison.jfr

# Compare in JDK Mission Control:
# File → Compare Recordings
# Key comparisons:
# - Method profiling hot spots
# - GC pause distributions
# - Allocation rates
# - Lock contention changes
\`\`\``
    },
    {
      id: 4,
      category: 'Analysis',
      difficulty: 'Medium',
      question: 'How do you analyze JFR recordings with JDK Mission Control?',
      answer: `**JDK Mission Control (JMC):**
The official GUI tool for analyzing JFR recordings, providing deep insights into JVM behavior

**1. Opening Recordings:**
\`\`\`bash
# Launch JMC
jmc

# Open recording from command line
jmc --open recording.jfr

# Or drag and drop .jfr files into JMC
\`\`\`

**2. Key Analysis Views:**

**Automated Analysis:**
\`\`\`
The Automated Analysis page provides:
- Rule-based analysis of the recording
- Color-coded severity (OK, Info, Warning, Critical)
- Prioritized list of issues found
- Recommendations for each issue

Common findings:
- Excessive GC overhead
- Thread contention hot spots
- I/O bottlenecks
- Method profiling hot spots
- Class loading overhead
\`\`\`

**3. Method Profiling View:**
\`\`\`
Hot Methods (Top-Down):
- Shows methods consuming most CPU time
- Stack trace aggregation for common paths
- Flame graph visualization

Call Tree (Bottom-Up):
- Shows calling contexts for hot methods
- Useful for understanding why a method is called
- Identifies optimization targets

Stack Trace:
- Full stack traces for sampled events
- Filter by thread, time range, or method
\`\`\`

**4. Memory View:**
\`\`\`
Heap Statistics:
- Object allocation by class
- Allocation rate over time
- Top allocating methods

GC Analysis:
- GC pause distribution
- GC cause breakdown
- Heap usage before/after GC
- Promotion rate to old generation

TLAB Allocations:
- In-TLAB vs outside-TLAB ratios
- Allocation hot spots
- TLAB waste analysis
\`\`\`

**5. Thread View:**
\`\`\`
Thread Activity:
- Timeline showing thread states
  (Running, Sleeping, Waiting, Blocked)
- Thread CPU usage breakdown
- Thread count over time

Lock Contention:
- Monitor enter events sorted by duration
- Lock owner identification
- Blocked thread stack traces
- Contention heat map
\`\`\`

**6. I/O View:**
\`\`\`
File I/O:
- Read/Write operations by file
- Duration distribution
- Throughput metrics

Socket I/O:
- Network read/write by host/port
- Connection durations
- Data transfer volumes
\`\`\`

**7. JFR Event Browser:**
\`\`\`
Filter and search all events:
- By event type (GC, Thread, I/O, Custom)
- By time range
- By thread
- By duration threshold
- By custom event attributes

Export filtered results to CSV for further analysis
\`\`\`

**8. Command-Line Analysis with jfr tool:**
\`\`\`bash
# Print summary
jfr summary recording.jfr

# Print specific event type
jfr print --events jdk.GarbageCollection recording.jfr

# Print with filters
jfr print --events jdk.JavaMonitorEnter \\
  --stack-depth 10 recording.jfr

# Print metadata (event types available)
jfr metadata recording.jfr

# Convert to JSON
jfr print --json recording.jfr > recording.json

# Convert to XML
jfr print --xml recording.jfr > recording.xml

# Disassemble into chunks
jfr disassemble --output chunks/ recording.jfr
\`\`\`

**9. Flame Graph Generation:**
\`\`\`bash
# Using JMC built-in flame graph (JMC 8+)
# View → Flame Graph in Method Profiling page

# Using async-profiler converter
java -cp converter.jar \\
  jfr2flame recording.jfr flamegraph.html

# Key patterns in flame graphs:
# - Wide plateaus = hot methods (optimize these)
# - Tall narrow towers = deep call stacks
# - GC frames = GC overhead
# - Lock frames = contention
\`\`\`

**10. Best Practices for Analysis:**
\`\`\`
1. Start with Automated Analysis page
2. Check GC overhead and pause times
3. Review method profiling for CPU hot spots
4. Look for thread contention issues
5. Check I/O latency for external dependencies
6. Compare with baseline recordings
7. Focus on p99 latency contributors
8. Export data for trend analysis
\`\`\``
    }
  ]

  const displayQuestions = problemLimit ? questions.slice(0, problemLimit) : questions

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Fundamentals': '#ef4444',
      'Event System': '#3b82f6',
      'Production Profiling': '#7c3aed',
      'Analysis': '#10b981'
    }
    return colors[category] || '#6b7280'
  }

  const getDifficultyColor = (difficulty) => {
    return difficulty === 'Medium' ? '#f59e0b' : '#dc2626'
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
          textAlign: 'left',
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
          color: '#f97316',
          margin: 0
        }}>
          JFR Interview Questions
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
        primaryColor="#f97316"
      />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'left',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Comprehensive Java Flight Recorder questions covering profiling fundamentals, event system, production troubleshooting, and analysis tools.
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
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', textAlign: 'left' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: getCategoryColor(q.category),
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {q.category}
                  </div>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: getDifficultyColor(q.difficulty),
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {q.difficulty}
                  </div>
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
                  <CompletionCheckbox problemId={`JFRQuestions-${q.id}`} />
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
          textAlign: 'left',
                  lineHeight: '1.8',
                  color: '#d1d5db',
                  fontFamily: 'system-ui, -apple-system, sans-serif',

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
        backgroundColor: 'rgba(249, 115, 22, 0.15)',
        borderRadius: '12px',
        border: '2px solid #f97316'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fdba74', marginBottom: '0.5rem', textAlign: 'left' }}>
          JFR Best Practices
        </h3>
        <ul style={{ color: '#d1d5db', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Enable always-on recording in production with default settings</li>
          <li>Use profile settings only for targeted investigation</li>
          <li>Create custom events for business-critical operations</li>
          <li>Set maxage and maxsize to prevent disk exhaustion</li>
          <li>Use JFR streaming for real-time alerting on JDK 14+</li>
          <li>Compare recordings before and after changes to detect regressions</li>
        </ul>
      </div>
    </div>
  )
}

export default JFRQuestions

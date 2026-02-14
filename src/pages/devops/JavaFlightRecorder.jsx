import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

const JFR_COLORS = {
  primary: '#f97316',
  primaryHover: '#fb923c',
  bg: 'rgba(249, 115, 22, 0.1)',
  border: 'rgba(249, 115, 22, 0.3)',
  arrow: '#f97316',
  hoverBg: 'rgba(249, 115, 22, 0.2)',
  topicBg: 'rgba(249, 115, 22, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

const JFRArchitectureDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="jfrArchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#c2410c" stopOpacity="0.1"/>
      </linearGradient>
      <marker id="arrowJfrArch" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#f97316"/>
      </marker>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#jfrArchGrad)" stroke="#f97316" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#fb923c" fontSize="14" fontWeight="bold">JFR Architecture — Low-Overhead Recording Pipeline</text>
    <rect x="20" y="40" width="120" height="50" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"/>
    <text x="80" y="60" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Thread-Local</text>
    <text x="80" y="75" textAnchor="middle" fill="#60a5fa" fontSize="9">Buffers</text>
    <line x1="140" y1="65" x2="185" y2="65" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowJfrArch)"/>
    <rect x="190" y="40" width="120" height="50" rx="6" fill="#1e3a5f" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="250" y="60" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Global Buffer</text>
    <text x="250" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">(in-memory)</text>
    <line x1="310" y1="65" x2="355" y2="65" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowJfrArch)"/>
    <rect x="360" y="40" width="120" height="50" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="420" y="60" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Disk (.jfr)</text>
    <text x="420" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">circular buffer</text>
    <line x1="480" y1="65" x2="525" y2="65" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowJfrArch)"/>
    <rect x="530" y="40" width="140" height="50" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="600" y="60" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">JMC Analysis</text>
    <text x="600" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">or jfr CLI</text>
    <rect x="20" y="105" width="90" height="30" rx="4" fill="#166534" stroke="#22c55e" strokeWidth="1"/>
    <text x="65" y="124" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">{'<1% overhead'}</text>
    <text x="180" y="124" fill="#94a3b8" fontSize="9">Built into JVM since JDK 11 — no extra agent needed</text>
  </svg>
)

const JFREventCategoriesDiagram = () => (
  <svg viewBox="0 0 700 140" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="jfrEvtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#c2410c" stopOpacity="0.05"/>
      </linearGradient>
    </defs>
    <rect x="5" y="5" width="690" height="130" rx="10" fill="url(#jfrEvtGrad)" stroke="#f97316" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#fb923c" fontSize="14" fontWeight="bold">JFR Event Categories — 200+ Built-in Events</text>
    <rect x="20" y="40" width="120" height="75" rx="6" fill="#1e3a5f" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="80" y="58" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">GC / Memory</text>
    <text x="80" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8">GarbageCollection</text>
    <text x="80" y="85" textAnchor="middle" fill="#94a3b8" fontSize="8">HeapSummary</text>
    <text x="80" y="97" textAnchor="middle" fill="#94a3b8" fontSize="8">OldObjectSample</text>
    <rect x="155" y="40" width="120" height="75" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"/>
    <text x="215" y="58" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Thread / Lock</text>
    <text x="215" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8">MonitorEnter</text>
    <text x="215" y="85" textAnchor="middle" fill="#94a3b8" fontSize="8">MonitorWait</text>
    <text x="215" y="97" textAnchor="middle" fill="#94a3b8" fontSize="8">ThreadPark</text>
    <rect x="290" y="40" width="120" height="75" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="350" y="58" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">I/O / Network</text>
    <text x="350" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8">FileRead/Write</text>
    <text x="350" y="85" textAnchor="middle" fill="#94a3b8" fontSize="8">SocketRead/Write</text>
    <text x="350" y="97" textAnchor="middle" fill="#94a3b8" fontSize="8">SocketConnect</text>
    <rect x="425" y="40" width="120" height="75" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="485" y="58" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">JIT / ClassLoad</text>
    <text x="485" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8">Compilation</text>
    <text x="485" y="85" textAnchor="middle" fill="#94a3b8" fontSize="8">Deoptimization</text>
    <text x="485" y="97" textAnchor="middle" fill="#94a3b8" fontSize="8">ClassLoad</text>
    <rect x="560" y="40" width="120" height="75" rx="6" fill="#1e3a5f" stroke="#ef4444" strokeWidth="1.5"/>
    <text x="620" y="58" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">CPU / OS</text>
    <text x="620" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8">CPULoad</text>
    <text x="620" y="85" textAnchor="middle" fill="#94a3b8" fontSize="8">ExecutionSample</text>
    <text x="620" y="97" textAnchor="middle" fill="#94a3b8" fontSize="8">PhysicalMemory</text>
  </svg>
)

const JMCAnalysisDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="jmcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.1"/>
      </linearGradient>
      <marker id="arrowJmc" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6"/>
      </marker>
    </defs>
    <rect x="5" y="5" width="690" height="150" rx="10" fill="url(#jmcGrad)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">JDK Mission Control Analysis Pipeline</text>
    <rect x="20" y="50" width="110" height="55" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="75" y="72" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">.jfr File</text>
    <text x="75" y="88" textAnchor="middle" fill="#94a3b8" fontSize="8">Recording data</text>
    <line x1="130" y1="77" x2="175" y2="77" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowJmc)"/>
    <rect x="180" y="40" width="130" height="75" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="245" y="60" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">JMC Tool</text>
    <text x="245" y="77" textAnchor="middle" fill="#94a3b8" fontSize="8">Automated Analysis</text>
    <text x="245" y="90" textAnchor="middle" fill="#94a3b8" fontSize="8">Severity Scoring</text>
    <text x="245" y="103" textAnchor="middle" fill="#94a3b8" fontSize="8">0 (info) → 100 (critical)</text>
    <line x1="310" y1="55" x2="355" y2="45" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#arrowJmc)"/>
    <line x1="310" y1="65" x2="355" y2="65" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#arrowJmc)"/>
    <line x1="310" y1="75" x2="355" y2="85" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#arrowJmc)"/>
    <line x1="310" y1="90" x2="355" y2="108" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#arrowJmc)"/>
    <rect x="360" y="35" width="150" height="24" rx="4" fill="#374151" stroke="#ef4444" strokeWidth="1"/>
    <text x="435" y="51" textAnchor="middle" fill="#f87171" fontSize="9">Flame Graph</text>
    <rect x="360" y="63" width="150" height="24" rx="4" fill="#374151" stroke="#22c55e" strokeWidth="1"/>
    <text x="435" y="79" textAnchor="middle" fill="#4ade80" fontSize="9">Memory Leak Detection</text>
    <rect x="360" y="91" width="150" height="24" rx="4" fill="#374151" stroke="#3b82f6" strokeWidth="1"/>
    <text x="435" y="107" textAnchor="middle" fill="#60a5fa" fontSize="9">Thread Analysis</text>
    <rect x="530" y="50" width="140" height="55" rx="6" fill="#374151" stroke="#f97316" strokeWidth="1.5"/>
    <text x="600" y="72" textAnchor="middle" fill="#fb923c" fontSize="9" fontWeight="bold">Automated Report</text>
    <text x="600" y="88" textAnchor="middle" fill="#94a3b8" fontSize="8">GC, CPU, I/O findings</text>
    <line x1="510" y1="77" x2="525" y2="77" stroke="#f97316" strokeWidth="1.5" markerEnd="url(#arrowJmc)"/>
  </svg>
)

const ProductionProfilingDiagram = () => (
  <svg viewBox="0 0 700 150" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="prodProfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.05"/>
      </linearGradient>
      <marker id="arrowProd" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
      </marker>
    </defs>
    <rect x="5" y="5" width="690" height="140" rx="10" fill="url(#prodProfGrad)" stroke="#ef4444" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#f87171" fontSize="14" fontWeight="bold">Always-On Production Recording</text>
    <rect x="20" y="40" width="100" height="50" rx="6" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"/>
    <text x="70" y="60" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">JVM</text>
    <text x="70" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">Application</text>
    <line x1="120" y1="65" x2="155" y2="65" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowProd)"/>
    <rect x="160" y="40" width="130" height="50" rx="6" fill="#1e3a5f" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="225" y="58" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Circular Buffer</text>
    <text x="225" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8">maxsize=500m</text>
    <text x="225" y="85" textAnchor="middle" fill="#94a3b8" fontSize="7">maxage=12h</text>
    <line x1="290" y1="65" x2="325" y2="65" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowProd)"/>
    <rect x="330" y="40" width="130" height="50" rx="6" fill="#1e3a5f" stroke="#22c55e" strokeWidth="1.5"/>
    <text x="395" y="58" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Event Streaming</text>
    <text x="395" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8">JDK 14+ API</text>
    <text x="395" y="85" textAnchor="middle" fill="#94a3b8" fontSize="7">RecordingStream</text>
    <line x1="460" y1="65" x2="495" y2="65" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowProd)"/>
    <rect x="500" y="40" width="170" height="50" rx="6" fill="#1e3a5f" stroke="#8b5cf6" strokeWidth="1.5"/>
    <text x="585" y="58" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Metrics / Alerts</text>
    <text x="585" y="73" textAnchor="middle" fill="#94a3b8" fontSize="8">Prometheus, Grafana</text>
    <text x="585" y="85" textAnchor="middle" fill="#94a3b8" fontSize="7">Micrometer integration</text>
    <text x="225" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">On incident: jcmd dump → retroactive analysis</text>
    <rect x="440" y="100" width="80" height="25" rx="4" fill="#166534" stroke="#22c55e" strokeWidth="1"/>
    <text x="480" y="117" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="bold">Always-On</text>
  </svg>
)

const AsyncProfilerDiagram = () => (
  <svg viewBox="0 0 700 170" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="asyncGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1"/>
      </linearGradient>
      <marker id="arrowAsync" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#06b6d4"/>
      </marker>
    </defs>
    <rect x="5" y="5" width="690" height="160" rx="10" fill="url(#asyncGrad)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="350" y="25" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="bold">async-profiler Modes &amp; Outputs</text>
    <rect x="20" y="40" width="200" height="110" rx="6" fill="#1e3a5f" stroke="#06b6d4" strokeWidth="2"/>
    <text x="120" y="58" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">Profiling Modes</text>
    <rect x="30" y="65" width="180" height="22" rx="3" fill="#374151" stroke="#ef4444" strokeWidth="1"/>
    <text x="120" y="80" textAnchor="middle" fill="#f87171" fontSize="9">CPU (perf_events)</text>
    <rect x="30" y="92" width="180" height="22" rx="3" fill="#374151" stroke="#22c55e" strokeWidth="1"/>
    <text x="120" y="107" textAnchor="middle" fill="#4ade80" fontSize="9">Alloc (TLAB callbacks)</text>
    <rect x="30" y="119" width="180" height="22" rx="3" fill="#374151" stroke="#3b82f6" strokeWidth="1"/>
    <text x="120" y="134" textAnchor="middle" fill="#60a5fa" fontSize="9">Wall-clock (all threads)</text>
    <line x1="220" y1="77" x2="300" y2="65" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowAsync)"/>
    <line x1="220" y1="103" x2="300" y2="95" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowAsync)"/>
    <line x1="220" y1="130" x2="300" y2="125" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowAsync)"/>
    <rect x="260" y="38" width="170" height="30" rx="4" fill="#1e3a5f" stroke="#06b6d4" strokeWidth="1.5"/>
    <text x="345" y="50" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">async-profiler</text>
    <text x="345" y="62" textAnchor="middle" fill="#94a3b8" fontSize="7">AsyncGetCallTrace</text>
    <rect x="460" y="40" width="210" height="110" rx="6" fill="#1e3a5f" stroke="#06b6d4" strokeWidth="2"/>
    <text x="565" y="58" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">Output Formats</text>
    <rect x="470" y="65" width="190" height="22" rx="3" fill="#374151" stroke="#f97316" strokeWidth="1"/>
    <text x="565" y="80" textAnchor="middle" fill="#fb923c" fontSize="9">Flame Graph (HTML/SVG)</text>
    <rect x="470" y="92" width="190" height="22" rx="3" fill="#374151" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="565" y="107" textAnchor="middle" fill="#a78bfa" fontSize="9">JFR (open in JMC)</text>
    <rect x="470" y="119" width="190" height="22" rx="3" fill="#374151" stroke="#f59e0b" strokeWidth="1"/>
    <text x="565" y="134" textAnchor="middle" fill="#fbbf24" fontSize="9">Collapsed Stacks (text)</text>
    <line x1="430" y1="65" x2="455" y2="77" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowAsync)"/>
    <line x1="430" y1="95" x2="455" y2="103" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowAsync)"/>
    <line x1="430" y1="125" x2="455" y2="130" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowAsync)"/>
  </svg>
)

const SyntaxHighlighter = ({ code }) => (
  <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.85rem', lineHeight: '1.6', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace" }}>
    {code}
  </pre>
)

function JavaFlightRecorder({ onBack, onPrevious, onNext, previousName, nextName, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'jfr-architecture',
      name: 'JFR Architecture & Setup',
      icon: '🏗️',
      color: '#3b82f6',
      description: 'JFR is a low-overhead profiling and diagnostics framework built into the JVM since JDK 11 (commercial-free). It captures events from the JVM, OS, and application with <1% overhead in production. Data is written to a circular buffer and flushed to .jfr files for offline analysis.',
      diagram: JFRArchitectureDiagram,
      details: [
        {
          name: 'How JFR Works',
          explanation: 'Java Flight Recorder is built directly into the HotSpot JVM. It uses a thread-local buffer system where each thread writes events to its own buffer, avoiding contention. Buffers are periodically flushed to a global buffer and then to disk. JFR captures JVM events (GC, class loading, thread activity), OS events (CPU, memory), and custom application events. The overhead is typically under 1%, making it safe for production use.',
          codeExample: `// Starting JFR from the command line
// Method 1: Start recording at JVM launch
java -XX:StartFlightRecording=duration=60s,filename=recording.jfr MyApp

// Method 2: Start with continuous recording (circular buffer)
java -XX:StartFlightRecording=disk=true,maxsize=500m,maxage=1h MyApp

// Method 3: Use jcmd to start/stop dynamically
jcmd {'<'}pid> JFR.start name=myrecording duration=120s filename=out.jfr

// List active recordings
jcmd {'<'}pid> JFR.check

// Dump current recording to file
jcmd {'<'}pid> JFR.dump name=myrecording filename=dump.jfr

// Stop a recording
jcmd {'<'}pid> JFR.stop name=myrecording

// Common JVM flags for JFR
// -XX:FlightRecorderOptions=stackdepth=128   (default 64)
// -XX:FlightRecorderOptions=memorysize=10m   (global buffer size)
// -XX:FlightRecorderOptions=threadbuffersize=8k`
        },
        {
          name: 'Programmatic API',
          explanation: 'Since JDK 9, JFR provides a Java API for creating recordings programmatically. You can start/stop recordings, configure which events to capture, and stream events in real-time (JDK 14+). The Recording class represents a recording session, and FlightRecorderMXBean provides JMX access. This is useful for integrating JFR into monitoring frameworks or triggering recordings based on application conditions.',
          codeExample: `import jdk.jfr.*;
import jdk.jfr.consumer.*;
import java.nio.file.Path;
import java.time.Duration;

// === Programmatic Recording ===
try (Recording recording = new Recording()) {
    // Configure recording
    recording.enable("jdk.CPULoad").withPeriod(Duration.ofSeconds(1));
    recording.enable("jdk.GarbageCollection");
    recording.enable("jdk.ThreadSleep").withThreshold(Duration.ofMillis(10));
    recording.enable("jdk.JavaMonitorWait").withStackTrace();

    recording.setMaxSize(100_000_000);   // 100 MB max
    recording.setMaxAge(Duration.ofMinutes(30));

    recording.start();
    // ... application runs ...
    recording.stop();

    // Save to file
    recording.dump(Path.of("my-recording.jfr"));
}

// === Event Streaming (JDK 14+) ===
// Real-time consumption of JFR events — no file needed
try (var stream = new RecordingStream()) {
    stream.enable("jdk.CPULoad").withPeriod(Duration.ofSeconds(1));
    stream.enable("jdk.GarbageCollection");

    stream.onEvent("jdk.CPULoad", event -> {
        float machineTotal = event.getFloat("machineTotal");
        float jvmUser = event.getFloat("jvmUser");
        System.out.printf("CPU: machine=%.1f%%, jvm=%.1f%%%n",
            machineTotal * 100, jvmUser * 100);
    });

    stream.onEvent("jdk.GarbageCollection", event -> {
        System.out.printf("GC: %s, duration=%dms%n",
            event.getString("name"),
            event.getDuration("duration").toMillis());
    });

    stream.startAsync();  // Non-blocking
    Thread.sleep(60_000);
}`
        },
        {
          name: 'Recording Configurations',
          explanation: 'JFR ships with two built-in profiles: "default" (low overhead, safe for production) and "profile" (more detail, ~2% overhead). You can create custom .jfc configuration files to fine-tune which events are captured, their thresholds, and stack trace depth. Custom configurations let you focus on specific areas like GC, I/O, or locking without capturing everything.',
          codeExample: `// Using built-in profiles
// "default" profile — low overhead, production-safe
java -XX:StartFlightRecording=settings=default,filename=rec.jfr MyApp

// "profile" profile — more events, higher detail
java -XX:StartFlightRecording=settings=profile,filename=rec.jfr MyApp

// Custom .jfc file (XML-based configuration)
// Save as custom-recording.jfc:
{'<'}?xml version="1.0" encoding="UTF-8"?>
{'<'}configuration version="2.0" label="Custom GC Focus">
  <!-- GC events — capture all -->
  {'<'}event name="jdk.GarbageCollection">
    {'<'}setting name="enabled">true</setting>
    {'<'}setting name="stackTrace">true</setting>
  </event>
  {'<'}event name="jdk.GCHeapSummary">
    {'<'}setting name="enabled">true</setting>
  </event>
  {'<'}event name="jdk.G1GarbageCollection">
    {'<'}setting name="enabled">true</setting>
  </event>

  <!-- Thread events — only long waits -->
  {'<'}event name="jdk.JavaMonitorWait">
    {'<'}setting name="enabled">true</setting>
    {'<'}setting name="threshold">100 ms</setting>
    {'<'}setting name="stackTrace">true</setting>
  </event>

  <!-- File I/O — only slow operations -->
  {'<'}event name="jdk.FileRead">
    {'<'}setting name="enabled">true</setting>
    {'<'}setting name="threshold">20 ms</setting>
  </event>

  <!-- Disable noisy events -->
  {'<'}event name="jdk.ClassLoad">
    {'<'}setting name="enabled">false</setting>
  </event>
</configuration>

// Use custom config:
java -XX:StartFlightRecording=settings=custom-recording.jfc MyApp`
        },
        {
          name: 'Custom Events',
          explanation: 'You can define application-specific JFR events by extending jdk.jfr.Event. Custom events let you trace business logic (order processing time, cache hits, API latency) alongside JVM events. Annotate with @Name, @Label, @Description, and @Category for organization in JMC. Events are captured with the same low overhead as built-in events.',
          codeExample: `import jdk.jfr.*;

// Define a custom event
@Name("com.myapp.OrderProcessed")
@Label("Order Processed")
@Description("Fired when an order completes processing")
@Category({"Application", "Orders"})
@StackTrace(false)   // Skip stack trace for performance
public class OrderProcessedEvent extends Event {
    @Label("Order ID")
    public long orderId;

    @Label("Customer ID")
    public String customerId;

    @Label("Total Amount")
    @DataAmount        // Tells JMC this is a data amount
    public double totalAmount;

    @Label("Item Count")
    public int itemCount;

    @Label("Processing Time")
    @Timespan(Timespan.MILLISECONDS)
    public long processingTimeMs;
}

// Using the custom event in application code
public Order processOrder(OrderRequest request) {
    OrderProcessedEvent event = new OrderProcessedEvent();
    event.begin();   // Start timing

    try {
        Order order = orderService.create(request);
        event.orderId = order.getId();
        event.customerId = request.getCustomerId();
        event.totalAmount = order.getTotal();
        event.itemCount = request.getItems().size();
        return order;
    } finally {
        event.end();     // Stop timing
        event.commit();  // Write to JFR buffer (if event passes threshold)
    }
}

// Conditional event creation (avoid object allocation when disabled)
if (OrderProcessedEvent.isEnabled()) {
    OrderProcessedEvent event = new OrderProcessedEvent();
    event.begin();
    // ... process ...
    event.commit();
}`
        },
        {
          name: 'JFR with Containers',
          explanation: 'In containerized environments, JFR requires special consideration. The JVM inside Docker/K8s needs proper cgroup memory and CPU limits configured. You can use jcmd from outside the container via docker exec, mount volumes for recording files, or use JFR event streaming to push metrics to external systems. Since JDK 11.0.16+, JFR is container-aware and reports container CPU/memory limits correctly.',
          codeExample: `# Dockerfile with JFR-ready JVM
FROM eclipse-temurin:21-jre
COPY target/app.jar /app/app.jar

# Start with continuous JFR recording
ENTRYPOINT ["java", \\
  "-XX:StartFlightRecording=disk=true,maxsize=200m,maxage=6h,dumponexit=true,filename=/recordings/app.jfr", \\
  "-XX:FlightRecorderOptions=stackdepth=128", \\
  "-jar", "/app/app.jar"]

# Kubernetes deployment with volume for recordings
# apiVersion: apps/v1
# kind: Deployment
# spec:
#   template:
#     spec:
#       containers:
#       - name: app
#         volumeMounts:
#         - name: jfr-recordings
#           mountPath: /recordings
#       volumes:
#       - name: jfr-recordings
#         emptyDir:
#           sizeLimit: 500Mi

# Trigger recording from outside the container
docker exec {'<'}container-id> jcmd 1 JFR.start duration=60s filename=/recordings/dump.jfr

# Copy recording out of container
docker cp {'<'}container-id>:/recordings/dump.jfr ./dump.jfr

# Kubernetes: trigger and retrieve
kubectl exec {'<'}pod> -- jcmd 1 JFR.start duration=60s filename=/tmp/rec.jfr
kubectl cp {'<'}pod>:/tmp/rec.jfr ./rec.jfr`
        }
      ]
    },
    {
      id: 'jfr-event-types',
      name: 'JFR Event Categories',
      icon: '📊',
      color: '#22c55e',
      description: 'JFR captures 200+ event types across JVM internals (GC, JIT, class loading), OS metrics (CPU, memory, I/O), threading (locks, waits, parks), and application-level events. Understanding event categories is key to diagnosing performance issues in interviews.',
      diagram: JFREventCategoriesDiagram,
      details: [
        {
          name: 'GC & Memory Events',
          explanation: 'JFR captures detailed garbage collection events including GC cause, collector used, pause duration, heap before/after, and individual GC phases. Memory events track heap usage, metaspace, and allocation rates. These are critical for diagnosing memory leaks, GC pressure, and allocation hotspots. Key events: jdk.GarbageCollection, jdk.GCHeapSummary, jdk.ObjectAllocationInNewTLAB, jdk.OldObjectSample.',
          codeExample: `// Key GC & Memory events in JFR

// jdk.GarbageCollection — every GC pause
//   Fields: name, cause, duration, sumOfPauses
//   Example: "G1 Young", "Allocation Failure", 12ms

// jdk.GCHeapSummary — heap state before/after GC
//   Fields: heapUsed, heapCommitted, when (Before/After GC)

// jdk.G1GarbageCollection — G1-specific details
//   Fields: type (Young/Mixed/Full), duration

// jdk.ObjectAllocationInNewTLAB — allocation hotspots
//   Fields: objectClass, allocationSize, tlabSize
//   High frequency → shows where objects are allocated

// jdk.ObjectAllocationOutsideTLAB — large allocations
//   Fields: objectClass, allocationSize
//   These bypass TLAB and are expensive

// jdk.OldObjectSample — potential memory leak detection
//   Fields: allocationTime, objectClass, lastKnownHeapUsage
//   Periodically samples old-gen objects to find leaks

// jdk.MetaspaceSummary — class metadata memory
//   Fields: metaspaceUsed, metaspaceCommitted

// Analyzing GC with jfr command-line tool (JDK 17+)
// Print GC summary
jfr summary recording.jfr

// Print specific events
jfr print --events jdk.GarbageCollection recording.jfr

// Filter by duration
jfr print --events jdk.GarbageCollection \\
  --json recording.jfr | jq '.[] | select(.duration > 50000000)'`
        },
        {
          name: 'Thread & Lock Events',
          explanation: 'Thread events track thread lifecycle, sleep, park, and synchronization. Lock events capture contended monitor enters, wait/notify, and ReentrantLock contention. These are essential for diagnosing deadlocks, thread starvation, and lock contention. Key events: jdk.JavaMonitorWait, jdk.JavaMonitorEnter, jdk.ThreadPark, jdk.ThreadSleep.',
          codeExample: `// Key Thread & Lock events

// jdk.JavaMonitorEnter — synchronized block contention
//   Fields: monitorClass, previousOwner, duration
//   Only fires when thread actually BLOCKS (not uncontended)
//   High duration → lock contention hotspot

// jdk.JavaMonitorWait — Object.wait() calls
//   Fields: monitorClass, timeout, timedOut, duration
//   Shows threads waiting on conditions

// jdk.ThreadPark — LockSupport.park() / ReentrantLock waits
//   Fields: parkedClass, timeout, duration, address
//   Captures java.util.concurrent lock contention

// jdk.ThreadSleep — Thread.sleep() calls
//   Fields: duration
//   Useful for finding polling patterns

// jdk.ThreadStart / jdk.ThreadEnd — thread lifecycle
//   Frequent start/end → missing thread pool

// jdk.VirtualThreadStart / jdk.VirtualThreadEnd (JDK 21+)
//   Track virtual thread creation and pinning

// jdk.VirtualThreadPinned (JDK 21+)
//   Fields: duration, stackTrace
//   CRITICAL: shows when virtual thread is pinned to carrier

// Example: Find lock contention hotspots
jfr print --events jdk.JavaMonitorEnter \\
  --stack-depth 10 recording.jfr

// Example: Find long thread parks (potential deadlock)
jfr print --events jdk.ThreadPark \\
  --json recording.jfr | jq '.[] | select(.duration > 5000000000)'`
        },
        {
          name: 'I/O & Network Events',
          explanation: 'JFR captures file I/O (reads, writes, force), socket I/O (reads, writes, connects), and network utilization events. These help identify slow disk operations, network latency, and connection issues. Events include the path/address, bytes transferred, and duration, with configurable thresholds to reduce noise.',
          codeExample: `// Key I/O Events

// jdk.FileRead — file read operations
//   Fields: path, bytesRead, duration
//   Threshold: default 20ms (only captures slow reads)

// jdk.FileWrite — file write operations
//   Fields: path, bytesWritten, duration

// jdk.FileForce — fsync/fdatasync calls
//   Fields: path, duration
//   Important for database/log durability

// jdk.SocketRead — network socket reads
//   Fields: host, port, bytesRead, duration, address
//   Threshold: default 20ms

// jdk.SocketWrite — network socket writes
//   Fields: host, port, bytesWritten, duration

// jdk.SocketConnect — TCP connection establishment
//   Fields: host, port, duration, address
//   Slow connects → DNS issues or firewall

// === I/O Analysis Example ===
// Find slowest file operations
jfr print --events jdk.FileRead,jdk.FileWrite \\
  --json recording.jfr | \\
  jq 'sort_by(-.duration) | .[0:10]'

// Find all socket operations to a specific host
jfr print --events jdk.SocketRead,jdk.SocketWrite \\
  recording.jfr | grep "database-host"

// Aggregate bytes read by path
jfr print --events jdk.FileRead \\
  --json recording.jfr | \\
  jq 'group_by(.path) | map({path: .[0].path, totalBytes: (map(.bytesRead) | add), count: length}) | sort_by(-.totalBytes)'`
        },
        {
          name: 'JIT & Class Loading',
          explanation: 'JIT compilation events show which methods are compiled, deoptimized, or inlined. Class loading events track class loading times and class loader activity. These help diagnose startup performance, warmup issues, and code cache problems. Key events: jdk.Compilation, jdk.CompilerInlining, jdk.ClassLoad, jdk.CodeCacheFull.',
          codeExample: `// Key JIT Compilation Events

// jdk.Compilation — method compilation
//   Fields: method, compileId, compileLevel, duration, isOsr
//   Level 1-3: C1 compiler, Level 4: C2 compiler (optimized)

// jdk.CompilerInlining — inlining decisions
//   Fields: caller, callee, succeeded, message
//   "too big" / "hot method too big" → method needs splitting

// jdk.Deoptimization — compiled code invalidated
//   Fields: method, reason, action
//   Frequent deopts → unstable optimizations, check polymorphism

// jdk.CodeCacheFull — JIT code cache exhausted
//   CRITICAL: JVM stops compiling new methods
//   Fix: -XX:ReservedCodeCacheSize=512m

// === Class Loading Events ===

// jdk.ClassLoad — class loaded
//   Fields: loadedClass, definingClassLoader, duration

// jdk.ClassDefine — class defined (before linking)
//   Fields: definedClass, definingClassLoader

// jdk.ClassUnload — class unloaded by GC
//   Fields: unloadedClass, definingClassLoader

// === Analysis ===
// Find slowest compilations (long C2 compilations block threads)
jfr print --events jdk.Compilation \\
  --json recording.jfr | \\
  jq 'sort_by(-.duration) | .[0:10] | .[] | {method, level: .compileLevel, ms: (.duration/1000000)}'

// Find deoptimization hotspots
jfr print --events jdk.Deoptimization recording.jfr | \\
  sort | uniq -c | sort -rn | head -20

// Count classes loaded per class loader
jfr print --events jdk.ClassLoad \\
  --json recording.jfr | \\
  jq 'group_by(.definingClassLoader) | map({loader: .[0].definingClassLoader, count: length})'`
        },
        {
          name: 'CPU & OS Events',
          explanation: 'JFR captures OS-level metrics including CPU load (per-process and system-wide), physical and virtual memory usage, and execution samples for CPU profiling. Execution samples (jdk.ExecutionSample) provide stack traces of running threads at regular intervals, forming the basis for flame graphs and hot method analysis.',
          codeExample: `// Key CPU & OS Events

// jdk.CPULoad — periodic CPU utilization
//   Fields: jvmUser, jvmSystem, machineTotal
//   Period: configurable (default 1s with "profile" settings)

// jdk.ExecutionSample — CPU profiling via stack sampling
//   Fields: sampledThread, stackTrace, state
//   Period: 10ms (default), captures what's running on CPU
//   THIS is what builds flame graphs

// jdk.NativeMethodSample — native code sampling
//   Fields: sampledThread, stackTrace

// jdk.PhysicalMemory — system memory
//   Fields: totalSize, usedSize

// jdk.CPUInformation — CPU hardware info
//   Fields: cpu, description, sockets, cores, hwThreads

// jdk.OSInformation — OS details
//   Fields: osVersion

// jdk.ContainerCPUUsage (container-aware)
//   Fields: cpuTime, cpuUserTime, cpuSystemTime

// jdk.ContainerMemoryUsage (container-aware)
//   Fields: memoryUsage, memoryLimit, swapMemoryUsage

// === CPU Profiling Workflow ===
// 1. Record with profiling settings (10ms sampling)
java -XX:StartFlightRecording=settings=profile,duration=60s,filename=cpu.jfr MyApp

// 2. Convert to flame graph using async-profiler converter
// or use JDK 17+ jfr tool:
jfr print --events jdk.ExecutionSample --stack-depth 64 cpu.jfr

// 3. Generate flame graph (using jfr-flame-graph tool)
// git clone https://github.com/chrishantha/jfr-flame-graph
// jfr-flame-graph/flamegraph.sh -f cpu.jfr -o flamegraph.svg

// 4. Or use async-profiler's converter:
java -cp converter.jar jfr2flame cpu.jfr flamegraph.html`
        }
      ]
    },
    {
      id: 'jmc-analysis',
      name: 'JDK Mission Control (JMC)',
      icon: '🔍',
      color: '#8b5cf6',
      description: 'JMC is the official GUI tool for analyzing JFR recordings. It provides automated analysis with severity-scored findings, flame graphs, memory leak detection, and thread analysis views. JMC can also connect live to running JVMs for real-time monitoring via JMX.',
      diagram: JMCAnalysisDiagram,
      details: [
        {
          name: 'Automated Analysis',
          explanation: 'JMC\'s Automated Analysis page scores potential issues on a severity scale from 0 (info) to 100 (critical). It checks for GC pressure, lock contention, I/O bottlenecks, exceptions, class loading issues, and more. Each finding includes an explanation and suggested fix. This is the first place to look when opening a JFR recording — it highlights the most impactful problems automatically.',
          codeExample: `// JMC Automated Analysis Categories and What They Check

// === Memory ===
// - Heap usage trends (leak detection)
// - GC pause times and frequency
// - Allocation rate vs. promotion rate
// - Object allocation hotspots (top allocating methods)
// - Metaspace growth

// === CPU / Code ===
// - Hot methods (from ExecutionSample events)
// - JIT compilation issues (slow C2, code cache full)
// - Deoptimization frequency
// - Primitive-to-object boxing overhead

// === Threads ===
// - Lock contention hotspots
// - Thread count trends
// - Deadlock detection
// - Thread starvation in pools

// === I/O ===
// - Slow file I/O operations
// - Socket read/write latency
// - Connection establishment time

// === Exceptions ===
// - Exception creation rate (even caught exceptions cost CPU)
// - Most frequent exception types

// JMC Command Line (JDK 17+) — headless analysis
// jfr tool provides basic analysis:
jfr summary recording.jfr        // Overview of events
jfr print recording.jfr          // All events (verbose)
jfr metadata recording.jfr       // Available event types
jfr view hot-methods recording.jfr    // Top CPU methods
jfr view gc recording.jfr             // GC summary
jfr view allocation-by-class recording.jfr  // Allocation hotspots`
        },
        {
          name: 'Flame Graph View',
          explanation: 'JMC can generate interactive flame graphs from ExecutionSample events. Flame graphs visualize CPU time distribution across the call stack — wide bars indicate methods consuming the most CPU. You can filter by thread, time range, or package. This is the most effective way to find CPU bottlenecks. The x-axis represents proportion of samples (not time), and the y-axis shows stack depth.',
          codeExample: `// Flame Graph Interpretation Guide

// === Reading a Flame Graph ===
// Width = proportion of CPU samples (wider = more CPU time)
// Height = call stack depth (bottom = entry point, top = leaf method)
// Color = random (no significance in standard flame graphs)

// === Common Patterns to Look For ===

// 1. "Plateau" at top — single hot method
//    Wide flat bar at the top means one method uses lots of CPU
//    Example: String.hashCode() → review data structure choices

// 2. "Tower" — deep call stack
//    Tall narrow tower → deep recursion or framework overhead
//    Example: Spring AOP proxy chain, deep reflection

// 3. "Wide base, narrow top" — normal distribution
//    CPU spread across many methods (healthy)

// 4. GC frames — garbage collection overhead
//    Look for frames containing "GC" or "Safepoint"
//    Large proportion → memory pressure

// === Generating Flame Graphs Outside JMC ===

// Using async-profiler's JFR converter
java -cp ap-converter.jar \\
  jfr2flame --lines --total recording.jfr flamegraph.html

// Using Brendan Gregg's FlameGraph tools
jfr print --events jdk.ExecutionSample --json recording.jfr | \\
  jq -r '.[] | .stackTrace.frames | map(.method) | reverse | join(";")' | \\
  sort | uniq -c | sort -rn > stacks.folded
flamegraph.pl stacks.folded > flamegraph.svg

// Using IntelliJ IDEA Profiler (reads .jfr files directly)
// File → Open → select .jfr file → Flame Graph tab`
        },
        {
          name: 'Memory Leak Detection',
          explanation: 'JMC detects memory leaks by analyzing OldObjectSample events — JFR periodically samples objects that survive into old generation and records their allocation stack trace and reference chain. JMC\'s Memory page shows heap growth trends, top allocating classes, and the allocation-to-GC ratio. A growing live set despite GC indicates a leak.',
          codeExample: `// Memory Leak Detection Workflow with JFR

// 1. Record with old object sampling enabled
java -XX:StartFlightRecording=settings=profile,filename=mem.jfr \\
  -XX:FlightRecorderOptions=stackdepth=128 MyApp

// 2. In JMC → Memory tab:
//    - Check "Live Set Trend" — steadily increasing = leak
//    - Check "Allocation by Class" — what types are accumulating
//    - Check "Allocation by Site" — which methods allocate them

// 3. Old Object Sample analysis
//    JMC → Memory → Old Object Samples
//    Shows reference chains from GC roots to leaked objects
//    Example chain: GC Root → HashMap → Entry → LeakedObject

// === Common Leak Patterns JFR Helps Find ===

// Pattern 1: Growing collection
// jdk.OldObjectSample shows HashMap entries increasing
// Fix: Check if items are added but never removed

// Pattern 2: Listener/callback leak
// jdk.OldObjectSample shows event listener objects
// Fix: Unregister listeners in close/destroy lifecycle

// Pattern 3: ThreadLocal leak (in web apps)
// jdk.OldObjectSample shows ThreadLocal values
// Fix: Call ThreadLocal.remove() in finally block

// Pattern 4: ClassLoader leak (in app servers)
// jdk.ClassLoad count increasing, jdk.ClassUnload not matching
// Fix: Ensure no static references to classloader

// === Key JFR Events for Memory Analysis ===
// jdk.ObjectAllocationInNewTLAB  — allocation hotspots
// jdk.ObjectAllocationOutsideTLAB — large allocations
// jdk.OldObjectSample — old gen leak candidates
// jdk.GCHeapSummary — heap before/after GC
// jdk.MetaspaceSummary — class metadata growth`
        },
        {
          name: 'Thread Analysis',
          explanation: 'JMC\'s Thread page visualizes thread states over time — running, sleeping, waiting, blocked, and parked. You can see which threads are contending on locks, how long they\'re blocked, and identify thread pool sizing issues. The Lock Instances view ranks locks by total contention time, and the Thread Latencies view shows where threads spend time waiting.',
          codeExample: `// Thread Analysis Views in JMC

// === Thread States Timeline ===
// Green = Running (on CPU)
// Blue = Sleeping (Thread.sleep)
// Yellow = Waiting (Object.wait, Condition.await)
// Red = Blocked (trying to enter synchronized block)
// Purple = Parked (LockSupport.park, j.u.c locks)

// === Key Questions Thread Analysis Answers ===

// Q: Is there lock contention?
// Look at: jdk.JavaMonitorEnter events
// Red bars in thread timeline = threads blocked on monitors
// JMC ranks locks by total contention time

// Q: Are thread pools sized correctly?
// Look at: Thread count over time
// All pool threads in "Waiting" → pool too large
// All pool threads in "Running" → pool might be too small

// Q: Are there deadlocks?
// Look at: Multiple threads permanently "Blocked"
// JMC highlights circular lock dependencies

// === Using jfr CLI for Thread Analysis ===

// View thread contention summary
jfr view contention-by-class recording.jfr

// View thread allocation summary
jfr print --events jdk.JavaMonitorEnter \\
  --json recording.jfr | \\
  jq 'group_by(.monitorClass) |
      map({class: .[0].monitorClass,
           count: length,
           totalMs: (map(.duration) | add) / 1000000}) |
      sort_by(-.totalMs)'

// Find threads that were blocked the longest
jfr print --events jdk.JavaMonitorEnter \\
  --json recording.jfr | \\
  jq 'sort_by(-.duration) | .[0:5] | .[] |
      {thread: .eventThread.javaName,
       monitor: .monitorClass,
       durationMs: (.duration/1000000),
       previousOwner: .previousOwner.javaName}'`
        },
        {
          name: 'JFR in CI/CD Pipelines',
          explanation: 'JFR can be integrated into CI/CD pipelines for automated performance regression detection. Record during load tests, then use jfr CLI or custom parsers to extract key metrics (P99 latency, allocation rate, GC time). Compare against baselines and fail builds that regress. JDK 17+ jfr tool makes this scriptable without JMC.',
          codeExample: `#!/bin/bash
# === CI/CD Performance Gate with JFR ===

# 1. Run application with JFR during load test
java -XX:StartFlightRecording=\\
settings=profile,\\
duration=300s,\\
filename=perf-test.jfr \\
-jar app.jar &
APP_PID=$!

# 2. Run load test (e.g., with k6, wrk, or JMeter)
k6 run --duration 300s load-test.js

# Wait for recording to finish
wait $APP_PID

# 3. Extract key metrics using jfr CLI
echo "=== GC Summary ==="
jfr view gc perf-test.jfr

echo "=== Hot Methods ==="
jfr view hot-methods perf-test.jfr

echo "=== Lock Contention ==="
jfr view contention-by-class perf-test.jfr

# 4. Automated regression check (custom script)
# Extract total GC pause time
GC_PAUSE_MS=$(jfr print --events jdk.GarbageCollection \\
  --json perf-test.jfr | \\
  jq '[.[].duration] | add / 1000000')

BASELINE_GC_MS=500
THRESHOLD_PCT=20

# Calculate regression percentage
REGRESSION=$(echo "scale=2; (($GC_PAUSE_MS - $BASELINE_GC_MS) / $BASELINE_GC_MS) * 100" | bc)

if (( $(echo "$REGRESSION > $THRESHOLD_PCT" | bc -l) )); then
  echo "FAIL: GC pause regressed by \${REGRESSION}% (baseline: \${BASELINE_GC_MS}ms, current: \${GC_PAUSE_MS}ms)"
  exit 1
fi

echo "PASS: GC pause within threshold (\${GC_PAUSE_MS}ms vs baseline \${BASELINE_GC_MS}ms)"`
        }
      ]
    },
    {
      id: 'jfr-production',
      name: 'Production Profiling',
      icon: '🚀',
      color: '#ef4444',
      description: 'JFR is designed for always-on production profiling with <1% overhead. Key techniques include continuous recording with circular buffers, on-demand dumps during incidents, event streaming to monitoring systems, and correlating JFR data with application metrics for root cause analysis.',
      diagram: ProductionProfilingDiagram,
      details: [
        {
          name: 'Always-On Recording',
          explanation: 'The recommended production setup is continuous recording with a circular buffer. JFR writes to a fixed-size buffer that overwrites old data. When an incident occurs, you dump the buffer to capture what happened. The key flags are maxsize (buffer size), maxage (retention window), and dumponexit (save on JVM shutdown). This approach gives you retroactive profiling data without any preparation.',
          codeExample: `// Production-ready JFR configuration

// Recommended JVM flags for always-on recording
java \\
  -XX:StartFlightRecording=\\
disk=true,\\
maxsize=500m,\\
maxage=12h,\\
dumponexit=true,\\
filename=/var/log/jfr/app-exit.jfr,\\
settings=default,\\
name=continuous \\
  -XX:FlightRecorderOptions=\\
stackdepth=128,\\
memorysize=10m \\
  -jar app.jar

// When incident occurs — dump current buffer:
jcmd {'<'}pid> JFR.dump name=continuous filename=/tmp/incident-$(date +%s).jfr

// Start a focused recording alongside continuous:
jcmd {'<'}pid> JFR.start \\
  name=incident \\
  settings=profile \\
  duration=120s \\
  filename=/tmp/incident-detailed.jfr

// === Monitoring JFR Health ===
// Check recording status
jcmd {'<'}pid> JFR.check

// Output example:
// Recording 1: name=continuous maxSize=500.0MB maxAge=12h (running)
// Recording 2: name=incident duration=2m (running)

// === Automated Dump on OOM ===
// Use -XX:+HeapDumpOnOutOfMemoryError alongside JFR
// JFR's dumponexit=true captures the recording on crash
java \\
  -XX:StartFlightRecording=dumponexit=true,filename=oom-recording.jfr \\
  -XX:+HeapDumpOnOutOfMemoryError \\
  -XX:HeapDumpPath=/var/log/heap-dumps/ \\
  -jar app.jar`
        },
        {
          name: 'Event Streaming to Metrics',
          explanation: 'JDK 14+ JFR Event Streaming allows real-time consumption of JFR events without dumping to file. You can push JFR metrics to Prometheus, Micrometer, or any monitoring backend. This bridges JFR\'s detailed JVM telemetry with your existing monitoring infrastructure. Libraries like jfr-datasource and Spring Boot\'s JFR integration make this straightforward.',
          codeExample: `import jdk.jfr.consumer.*;
import io.micrometer.core.instrument.*;
import java.time.Duration;

// === Stream JFR Events to Micrometer/Prometheus ===
public class JfrMetricsExporter {
    private final MeterRegistry registry;

    public void startStreaming() {
        RecordingStream stream = new RecordingStream();

        // CPU metrics
        stream.enable("jdk.CPULoad").withPeriod(Duration.ofSeconds(5));
        stream.onEvent("jdk.CPULoad", event -> {
            Gauge.builder("jvm.cpu.process", () ->
                event.getFloat("jvmUser") + event.getFloat("jvmSystem"))
                .register(registry);
        });

        // GC pause metrics
        stream.enable("jdk.GarbageCollection");
        stream.onEvent("jdk.GarbageCollection", event -> {
            Timer.builder("jvm.gc.pause")
                .tag("gc", event.getString("name"))
                .tag("cause", event.getString("cause"))
                .register(registry)
                .record(event.getDuration("duration"));
        });

        // Thread contention metrics
        stream.enable("jdk.JavaMonitorEnter")
              .withThreshold(Duration.ofMillis(10));
        stream.onEvent("jdk.JavaMonitorEnter", event -> {
            Counter.builder("jvm.lock.contention")
                .tag("monitor", event.getClass("monitorClass").getName())
                .register(registry)
                .increment();
        });

        // Allocation tracking
        stream.enable("jdk.ObjectAllocationOutsideTLAB");
        stream.onEvent("jdk.ObjectAllocationOutsideTLAB", event -> {
            DistributionSummary.builder("jvm.alloc.outside.tlab")
                .tag("class", event.getClass("objectClass").getName())
                .register(registry)
                .record(event.getLong("allocationSize"));
        });

        stream.startAsync();
    }
}

// === Spring Boot Integration ===
// Add dependency: io.micrometer:micrometer-jfr (Micrometer 1.12+)
// Auto-registers JFR-based JVM metrics with Spring Boot Actuator
// No code needed — just add the dependency`
        },
        {
          name: 'Troubleshooting Latency',
          explanation: 'JFR excels at diagnosing latency spikes in production. By correlating thread events, I/O events, GC pauses, and lock contention within the same time window, you can pinpoint the root cause. Common patterns: GC pauses causing latency spikes, lock contention serializing requests, slow I/O from database queries, or JIT deoptimization causing warmup issues.',
          codeExample: `// === Latency Troubleshooting Checklist with JFR ===

// Step 1: Check GC impact on latency
jfr print --events jdk.GarbageCollection --json recording.jfr | \\
  jq '.[] | select(.duration > 50000000) |
      {name, cause, ms: (.duration/1000000),
       time: .startTime}'
// If GC pauses align with latency spikes → tune GC

// Step 2: Check lock contention
jfr print --events jdk.JavaMonitorEnter --json recording.jfr | \\
  jq 'group_by(.monitorClass) |
      map({class: .[0].monitorClass,
           p99ms: (sort_by(.duration) | .[length * 99 / 100].duration / 1000000),
           avgMs: ((map(.duration) | add / length) / 1000000)}) |
      sort_by(-.p99ms)'
// High contention on shared resource → reduce lock scope

// Step 3: Check slow I/O
jfr print --events jdk.SocketRead --json recording.jfr | \\
  jq 'sort_by(-.duration) | .[0:10] | .[] |
      {host, port, ms: (.duration/1000000), bytes: .bytesRead}'
// Slow reads from DB host → check query performance

// Step 4: Check thread pool saturation
jfr print --events jdk.ThreadPark --json recording.jfr | \\
  jq 'group_by(.eventThread.javaName) |
      map({thread: .[0].eventThread.javaName,
           totalParkMs: (map(.duration) | add / 1000000)}) |
      sort_by(-.totalParkMs) | .[0:10]'
// All worker threads parked → thread pool exhaustion

// Step 5: Check JIT issues (warmup)
jfr print --events jdk.Compilation --json recording.jfr | \\
  jq 'sort_by(-.duration) | .[0:5] | .[] |
      {method, level: .compileLevel, ms: (.duration/1000000)}'
// Long C2 compilations at startup → consider AOT/CDS`
        },
        {
          name: 'JFR vs Other Profilers',
          explanation: 'JFR competes with async-profiler, YourKit, and VisualVM. JFR\'s advantage is zero-install (built into JDK), always-on capability, and comprehensive JVM event coverage. async-profiler has lower overhead for CPU profiling and supports native frames. YourKit and VisualVM provide richer UIs but aren\'t suitable for production. In interviews, know when to use each tool.',
          codeExample: `// === Profiler Comparison ===

// JFR (Java Flight Recorder)
// + Built into JDK (no extra install)
// + Always-on production profiling (<1% overhead)
// + 200+ event types (GC, threads, I/O, JIT, OS)
// + Event streaming API (JDK 14+)
// + Retroactive analysis (circular buffer)
// - Only JVM events (no native frames by default)
// - Analysis requires JMC or CLI tools

// async-profiler
// + Extremely low overhead (~0.5%)
// + CPU + allocation + lock profiling
// + Native frame support (JNI, kernel)
// + Direct flame graph output
// + Perf-events based (hardware counters)
// - Linux/macOS only (no Windows)
// - Fewer event types than JFR
// - No always-on mode

// YourKit
// + Rich GUI with many analysis views
// + CPU + memory + thread profiling
// + Automatic deobfuscation
// - Commercial license required
// - Higher overhead (~3-5%)
// - Not recommended for production

// VisualVM
// + Free, open source
// + Basic CPU and memory profiling
// + JMX monitoring
// - Higher overhead
// - Limited event types
// - Not suitable for production

// === Recommendation ===
// Production monitoring → JFR (always-on)
// Performance testing → JFR + async-profiler
// Development profiling → IntelliJ Profiler (uses JFR)
// Deep native analysis → async-profiler
// Memory leak hunting → JFR + JMC`
        },
        {
          name: 'Interview Scenarios',
          explanation: 'Common interview scenarios involving JFR: diagnosing a production latency spike, finding a memory leak, tuning GC, identifying lock contention, and measuring the impact of code changes. Knowing how to articulate a JFR-based troubleshooting approach demonstrates deep JVM understanding.',
          codeExample: `// === Interview Scenario Responses ===

// Q: "Your service P99 latency jumped from 50ms to 500ms. How do you investigate?"
// A: 1. Dump JFR continuous recording: jcmd <pid> JFR.dump
//    2. Open in JMC → Automated Analysis for quick wins
//    3. Check GC tab — long pauses? (jdk.GarbageCollection)
//    4. Check Thread tab — lock contention? (jdk.JavaMonitorEnter)
//    5. Check I/O tab — slow DB/network? (jdk.SocketRead)
//    6. Check flame graph — new hot method?
//    7. Compare with baseline recording from before the spike

// Q: "Your service is slowly consuming more memory over days."
// A: 1. Enable jdk.OldObjectSample (settings=profile)
//    2. Record for 30+ minutes under normal load
//    3. JMC → Memory → check live set trend
//    4. Old Object Samples → find reference chains
//    5. Look for: growing maps, listener leaks, ThreadLocal leaks
//    6. Compare allocation rate vs GC reclamation rate

// Q: "How would you profile a service in production safely?"
// A: 1. JFR with "default" settings (<1% overhead)
//    2. Always-on circular buffer: maxsize=500m, maxage=12h
//    3. On-demand detailed recording during issues
//    4. Event streaming to monitoring for real-time alerts
//    5. Never use "profile" settings in prod without testing
//    6. Monitor JFR's own overhead: jdk.JFREvent events

// Q: "A microservice has inconsistent throughput at startup."
// A: JFR captures JIT compilation events (jdk.Compilation).
//    Check: long C2 compilations, deoptimizations, code cache full.
//    Solutions: CDS (Class Data Sharing), AOT compilation,
//    warmup scripts, -XX:+TieredCompilation tuning.`
        }
      ]
    },
    {
      id: 'async-profiler',
      name: 'async-profiler Integration',
      icon: '⚡',
      color: '#06b6d4',
      description: 'async-profiler is a complementary low-overhead profiler for Linux/macOS that uses perf_events for CPU profiling and JVM TI for allocations. It outputs JFR-compatible files and generates flame graphs directly. It captures native frames that JFR misses, making it ideal for diagnosing GC overhead, native memory, and kernel-level issues.',
      diagram: AsyncProfilerDiagram,
      details: [
        {
          name: 'CPU Profiling',
          explanation: 'async-profiler captures CPU samples using Linux perf_events, which provides accurate wall-clock and CPU profiling with native frame support. Unlike JFR\'s safepoint-biased sampling, async-profiler uses AsyncGetCallTrace for non-safepoint sampling, giving more accurate results for short methods. Output formats include flame graphs (HTML/SVG), JFR files, and collapsed stacks.',
          codeExample: `# === async-profiler CPU Profiling ===

# Basic CPU profiling (30 seconds, flame graph output)
./asprof -d 30 -f flamegraph.html <pid>

# CPU profiling with native frames
./asprof -d 30 -f flamegraph.html --all-user <pid>

# Wall-clock profiling (includes I/O wait, sleep)
./asprof -e wall -d 30 -f wall-flame.html <pid>

# Output as JFR file (open in JMC or IntelliJ)
./asprof -e cpu -d 30 -f profile.jfr <pid>

# Start/stop mode
./asprof start -e cpu <pid>
# ... wait for interesting behavior ...
./asprof stop -f profile.html <pid>

# Attach at JVM startup
java -agentpath:/path/to/libasyncProfiler.so=\\
start,event=cpu,file=startup-profile.jfr \\
-jar app.jar

# === Filter and Focus ===

# Profile specific threads only
./asprof -d 30 -t -f flamegraph.html <pid>  # per-thread flame graphs

# Include/exclude packages
./asprof -d 30 --include 'com/myapp/*' -f flamegraph.html <pid>
./asprof -d 30 --exclude 'java/*' -f flamegraph.html <pid>

# Profile specific thread by name pattern
./asprof -d 30 --filter 'http-nio-.*' -f flamegraph.html <pid>`
        },
        {
          name: 'Allocation Profiling',
          explanation: 'async-profiler can profile object allocations without the overhead of JFR\'s allocation events. It uses TLAB (Thread Local Allocation Buffer) callbacks to sample allocations, showing which methods create the most objects. This helps find allocation hotspots causing GC pressure. The alloc event mode captures both TLAB and large allocations.',
          codeExample: `# === Allocation Profiling ===

# Profile heap allocations
./asprof -e alloc -d 30 -f alloc-flame.html <pid>

# Show allocation sizes in flame graph
./asprof -e alloc -d 30 --total -f alloc-flame.html <pid>

# Output as JFR for detailed analysis
./asprof -e alloc -d 30 -f alloc.jfr <pid>

# === Lock Contention Profiling ===

# Profile lock contention
./asprof -e lock -d 30 -f lock-flame.html <pid>

# === Live Object Profiling (memory leak detection) ===
# Profile objects that survive GC (JDK 11+)
./asprof -e alloc --live -d 60 -f live-objects.html <pid>

# === Combining Events ===

# CPU + allocation in one recording
./asprof start -e cpu,alloc -f combined.jfr <pid>
# ... run load ...
./asprof stop <pid>

# === Continuous Profiling (production) ===

# Use with Grafana Pyroscope for continuous profiling
java -agentpath:/path/to/libasyncProfiler.so=\\
start,event=cpu,alloc,\\
jfr,\\
file=profile-%t.jfr,\\
jfrsync=default \\
-jar app.jar

# Integrate with Pyroscope agent
java -javaagent:pyroscope.jar \\
  -Dpyroscope.application.name=myapp \\
  -Dpyroscope.server.address=http://pyroscope:4040 \\
  -jar app.jar`
        },
        {
          name: 'JFR Sync Mode',
          explanation: 'async-profiler\'s jfrsync mode combines async-profiler\'s accurate CPU samples with JFR\'s rich event collection into a single .jfr file. This gives you the best of both worlds: async-profiler\'s non-safepoint CPU profiling alongside JFR\'s GC, thread, I/O, and JIT events. The merged file can be opened in JMC for unified analysis.',
          codeExample: `# === JFR Sync Mode — Best of Both Worlds ===

# Combine async-profiler CPU + JFR events in one file
./asprof -e cpu -d 60 --jfrsync default -f combined.jfr <pid>

# Equivalent at startup:
java -agentpath:/path/to/libasyncProfiler.so=\\
start,event=cpu,jfr,jfrsync=profile,file=combined.jfr \\
-jar app.jar

# What you get in the combined .jfr file:
# FROM async-profiler:
#   - Accurate CPU samples (non-safepoint)
#   - Native frames (JNI, kernel)
#   - Allocation samples (if -e alloc added)
#
# FROM JFR:
#   - jdk.GarbageCollection
#   - jdk.JavaMonitorEnter / JavaMonitorWait
#   - jdk.FileRead / FileWrite
#   - jdk.SocketRead / SocketWrite
#   - jdk.Compilation / Deoptimization
#   - jdk.CPULoad
#   - All other JFR events from the selected profile

# Open in JMC → get unified flame graph + JFR analysis
# Or use IntelliJ → Run → Open Profiler Snapshot

# === Why JFR Sync Matters ===
# Standard JFR CPU profiling is safepoint-biased:
#   JFR's ExecutionSample only captures at safepoints
#   Short/hot methods between safepoints are MISSED
#
# async-profiler uses AsyncGetCallTrace:
#   Samples at any point (not just safepoints)
#   More accurate for short/leaf methods
#   Captures native frames JFR can't see`
        },
        {
          name: 'Flame Graph Patterns',
          explanation: 'Understanding common flame graph patterns helps quickly diagnose issues. Patterns include: "christmas tree" (deep recursive calls), "flat top" (single hot method), "GC plateau" (GC dominating CPU), "lock tower" (lock contention), and "I/O gap" (threads idle waiting on I/O). Each pattern maps to specific root causes and fixes.',
          codeExample: `// === Common Flame Graph Anti-Patterns ===

// 1. FLAT TOP — "Plateau"
// Shape: Wide flat bar at top of flame graph
// Cause: Single method consuming most CPU
// Examples:
//   - String.hashCode() → bad hash distribution
//   - Pattern.compile() → recompile on every call
//   - JSON serialization → large object graph
// Fix: Optimize or cache the hot method

// 2. CHRISTMAS TREE — Deep narrow tower
// Shape: Tall narrow spike with many frames
// Cause: Deep recursion or excessive abstraction
// Examples:
//   - Spring AOP proxy chains
//   - Recursive tree traversal without tail-call
//   - Deep reflection/serialization chains
// Fix: Flatten call chain, remove unnecessary layers

// 3. GC FRAMES — GC dominating CPU
// Shape: Large proportion of GC-related frames
// Frames: GC Thread, G1 Young/Mixed, Safepoint
// Cause: High allocation rate, memory pressure
// Fix: Reduce allocations, tune GC, increase heap

// 4. LOCK CONTENTION — Serialized execution
// Shape: Wide bars in monitor/lock frames
// Frames: ObjectMonitor::enter, park/unpark
// Cause: Shared mutable state under contention
// Fix: Reduce lock scope, use concurrent data structures

// 5. IDLE / I/O WAIT (wall-clock mode)
// Shape: Wide bars in read/poll/select frames
// Frames: SocketInputStream.read, EPoll.wait
// Cause: Waiting on external systems
// Fix: Connection pooling, timeouts, async I/O

// 6. INTERPRETER FRAMES
// Shape: "Interpreter" or "vtable" in frames
// Cause: Code not JIT-compiled (startup/warmup)
// Fix: Warmup period, -XX:CompileThreshold tuning`
        },
        {
          name: 'Continuous Profiling',
          explanation: 'Continuous profiling runs always-on in production and streams profiling data to a central service for aggregation and comparison over time. Tools like Grafana Pyroscope, Datadog Continuous Profiler, and Amazon CodeGuru use async-profiler or JFR under the hood. This enables finding performance regressions by comparing profiles across deployments.',
          codeExample: `// === Continuous Profiling Architecture ===

// Application → Profiling Agent → Central Service → UI
//
// Agent options:
// 1. Pyroscope (open source)
// 2. Datadog Continuous Profiler
// 3. Amazon CodeGuru Profiler
// 4. Elastic APM (Universal Profiling)

// === Pyroscope Setup (open source) ===

// docker-compose.yml for Pyroscope server
// services:
//   pyroscope:
//     image: grafana/pyroscope:latest
//     ports:
//       - "4040:4040"

// Java agent configuration
java -javaagent:pyroscope.jar \\
  -Dpyroscope.application.name=my-service \\
  -Dpyroscope.server.address=http://pyroscope:4040 \\
  -Dpyroscope.profiler.event=cpu,alloc,lock \\
  -Dpyroscope.profiler.alloc=512k \\
  -Dpyroscope.upload.interval=10s \\
  -Dpyroscope.labels="env=production,version=2.1.0" \\
  -jar app.jar

// === Comparison Workflow ===
// 1. Deploy version 2.1.0 → collect profiles for 1 hour
// 2. Deploy version 2.2.0 → collect profiles for 1 hour
// 3. Pyroscope UI → Comparison view → diff flame graph
//    Red = slower in new version
//    Green = faster in new version
//    Width = magnitude of difference

// === Key Metrics to Track Over Time ===
// - CPU usage per endpoint
// - Allocation rate per endpoint
// - Lock contention per class
// - GC pause distribution
// - P99 latency correlated with profile data`
        }
      ]
    }
  ]

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedConceptIndex !== null) {
        setSelectedConceptIndex(null)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e1a0f, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <Breadcrumb
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          section={breadcrumb?.section}
          category={breadcrumb?.category}
          topic={breadcrumb?.topic || 'Java Flight Recorder'}
          colors={breadcrumb?.colors || JFR_COLORS}
        />

        <CollapsibleSidebar
          items={concepts}
          selectedIndex={selectedConceptIndex}
          onSelect={(index) => { setSelectedConceptIndex(index); setSelectedDetailIndex(0) }}
          title="Topics"
          getItemLabel={(item) => item.name}
          getItemIcon={(item) => item.icon}
          primaryColor={JFR_COLORS.primary}
        />

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          {onPrevious ? (
            <button onClick={onPrevious} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(249, 115, 22, 0.2)', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '0.5rem', color: '#fb923c', cursor: 'pointer', fontSize: '0.85rem' }}>
              ← {previousName || 'Previous'}
            </button>
          ) : <div />}
          {onNext ? (
            <button onClick={onNext} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(249, 115, 22, 0.2)', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '0.5rem', color: '#fb923c', cursor: 'pointer', fontSize: '0.85rem' }}>
              {nextName || 'Next'} →
            </button>
          ) : <div />}
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#f97316' }}>Java Flight Recorder</h1>
        <p style={{ fontSize: '1.1rem', color: '#d1d5db', marginBottom: '2rem', lineHeight: '1.6' }}>
          Built-in JVM profiling and diagnostics framework for production monitoring, performance analysis, and troubleshooting.
        </p>

        {/* Concept Cards Grid */}
        {selectedConceptIndex === null && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {concepts.map((concept, index) => (
              <button
                key={concept.id}
                onClick={() => { setSelectedConceptIndex(index); setSelectedDetailIndex(0) }}
                style={{
                  background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  border: `2px solid ${concept.color}40`,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  textAlign: 'left',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = concept.color
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = `0 10px 30px ${concept.color}20`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${concept.color}40`
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '2rem' }}>{concept.icon}</span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: concept.color }}>{concept.name}</h3>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#9ca3af', lineHeight: '1.6' }}>{concept.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.75rem' }}>
                  {concept.details.map((d, i) => (
                    <span key={i} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: `${concept.color}15`, border: `1px solid ${concept.color}30`, borderRadius: '0.25rem', color: concept.color }}>{d.name}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Concept Detail View */}
        {selectedConcept && (
          <div style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '0.75rem', border: `2px solid ${selectedConcept.color}40`, padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{selectedConcept.icon}</span>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: selectedConcept.color }}>{selectedConcept.name}</h2>
              </div>
              <button onClick={() => setSelectedConceptIndex(null)} style={{ padding: '0.4rem 0.75rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.375rem', color: '#f87171', cursor: 'pointer', fontSize: '0.8rem', marginLeft: '0.5rem' }}>✕</button>
            </div>

            {/* Subtopic Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button key={i} onClick={() => setSelectedDetailIndex(i)} style={{ padding: '0.5rem 1rem', background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)', border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`, borderRadius: '0.5rem', color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', fontWeight: selectedDetailIndex === i ? '600' : '400', transition: 'all 0.2s' }}>{detail.name}</button>
              ))}
            </div>

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = selectedConcept.diagram
              return (
                <div>
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{detail.name}</h3>
                  {DiagramComponent && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                      <DiagramComponent />
                    </div>
                  )}
                  <p style={{ color: '#e2e8f0', lineHeight: '1.8', marginBottom: '1rem', background: colorScheme.bg, border: `1px solid ${colorScheme.border}`, borderRadius: '0.5rem', padding: '1rem', textAlign: 'left' }}>{detail.explanation}</p>
                  {detail.codeExample && (
                    <div style={{ marginTop: '1rem' }}>
                      <h4 style={{ color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.95rem', fontWeight: '600' }}>Code Example</h4>
                      <div style={{
                        background: '#1e1e1e',
                        borderRadius: '0.5rem',
                        padding: '1rem',
                        border: '1px solid #333',
                        overflow: 'auto',
                        maxHeight: '400px'
                      }}>
                        <SyntaxHighlighter code={detail.codeExample} />
                      </div>
                    </div>
                  )}
                </div>
              )
            })()}
          </div>
        )}
      </div>
    </div>
  )
}

export default JavaFlightRecorder

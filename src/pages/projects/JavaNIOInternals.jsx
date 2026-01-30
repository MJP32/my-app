/**
 * Java NIO Internals - Tab Template Format
 *
 * Deep dive into Java NIO: buffers, channels, selectors, and memory-mapped files
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

/**
 * Java NIO Indigo theme colors
 */
const JAVANIO_COLORS = {
  primary: '#6366f1',           // Indigo
  primaryHover: '#818cf8',      // Light indigo
  bg: 'rgba(99, 102, 241, 0.1)', // Background with transparency
  border: 'rgba(99, 102, 241, 0.3)', // Border color
  arrow: '#6366f1',             // Arrow/indicator color
  hoverBg: 'rgba(99, 102, 241, 0.2)', // Hover background
  topicBg: 'rgba(99, 102, 241, 0.2)'  // Topic card background
}

/**
 * Alternating colors for subtopic detail explanations
 */
const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },    // blue
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },      // green
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },    // amber
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },    // purple
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },    // pink
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },      // cyan
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

/**
 * NIO Architecture Overview Diagram
 */
const NIOArchitectureDiagram = () => (
  <svg viewBox="0 0 800 350" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-nio" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Traditional IO vs Java NIO Architecture
    </text>

    {/* Traditional IO Section */}
    <text x="200" y="55" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">
      Traditional IO
    </text>
    <rect x="50" y="70" width="100" height="40" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="100" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Thread 1</text>
    <rect x="50" y="120" width="100" height="40" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="100" y="145" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Thread 2</text>
    <rect x="50" y="170" width="100" height="40" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="100" y="195" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Thread 3</text>
    <text x="100" y="230" textAnchor="middle" fill="#94a3b8" fontSize="10">...</text>
    <rect x="50" y="240" width="100" height="40" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="100" y="265" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Thread N</text>

    {/* Arrows for Traditional IO */}
    <line x1="150" y1="90" x2="220" y2="90" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead-nio)"/>
    <text x="260" y="95" fill="#94a3b8" fontSize="9">Connection 1</text>
    <line x1="150" y1="140" x2="220" y2="140" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead-nio)"/>
    <text x="260" y="145" fill="#94a3b8" fontSize="9">Connection 2</text>
    <line x1="150" y1="190" x2="220" y2="190" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead-nio)"/>
    <text x="260" y="195" fill="#94a3b8" fontSize="9">Connection 3</text>
    <line x1="150" y1="260" x2="220" y2="260" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead-nio)"/>
    <text x="260" y="265" fill="#94a3b8" fontSize="9">Connection N</text>

    <text x="200" y="305" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">
      One thread per connection
    </text>

    {/* Java NIO Section */}
    <text x="600" y="55" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">
      Java NIO
    </text>

    {/* Selector */}
    <rect x="450" y="70" width="300" height="180" rx="8" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2"/>
    <text x="600" y="90" textAnchor="middle" fill="#818cf8" fontSize="11" fontWeight="bold">Selector</text>

    {/* Channels inside Selector */}
    <rect x="470" y="100" width="120" height="30" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1.5"/>
    <text x="530" y="120" textAnchor="middle" fill="white" fontSize="9">Channel 1 (ready)</text>

    <rect x="610" y="100" width="120" height="30" rx="4" fill="#64748b" stroke="#94a3b8" strokeWidth="1.5"/>
    <text x="670" y="120" textAnchor="middle" fill="white" fontSize="9">Channel 2</text>

    <rect x="470" y="140" width="120" height="30" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="1.5"/>
    <text x="530" y="160" textAnchor="middle" fill="white" fontSize="9">Channel 3 (ready)</text>

    <rect x="610" y="140" width="120" height="30" rx="4" fill="#64748b" stroke="#94a3b8" strokeWidth="1.5"/>
    <text x="670" y="160" textAnchor="middle" fill="white" fontSize="9">Channel 4</text>

    <text x="600" y="190" textAnchor="middle" fill="#94a3b8" fontSize="10">...</text>

    <rect x="540" y="200" width="120" height="30" rx="4" fill="#64748b" stroke="#94a3b8" strokeWidth="1.5"/>
    <text x="600" y="220" textAnchor="middle" fill="white" fontSize="9">Channel N</text>

    {/* Single Thread */}
    <rect x="520" y="270" width="160" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="600" y="295" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Single Thread</text>

    <text x="600" y="330" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">
      One thread handles many connections
    </text>
  </svg>
)

/**
 * ByteBuffer State Diagram
 */
const ByteBufferStateDiagram = () => (
  <svg viewBox="0 0 800 400" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-buffer" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
        <polygon points="0 0, 8 4, 0 8" fill="#6366f1" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      ByteBuffer State Transitions
    </text>

    {/* After allocate(10) */}
    <text x="100" y="65" fill="#94a3b8" fontSize="11" fontWeight="bold">After allocate(10):</text>
    {[...Array(10)].map((_, i) => (
      <rect key={i} x={100 + i * 40} y="80" width="35" height="35" rx="4" fill="rgba(100, 116, 139, 0.3)" stroke="#64748b" strokeWidth="1.5"/>
    ))}
    <text x="100" y="135" fill="#4ade80" fontSize="10">↑ position=0</text>
    <text x="480" y="135" fill="#f59e0b" fontSize="10">↑ limit=10, capacity=10</text>

    {/* After put */}
    <text x="100" y="175" fill="#94a3b8" fontSize="11" fontWeight="bold">After put('H'), put('i'):</text>
    <rect x="100" y="190" width="35" height="35" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="117.5" y="213" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">H</text>
    <rect x="140" y="190" width="35" height="35" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="157.5" y="213" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">i</text>
    {[...Array(8)].map((_, i) => (
      <rect key={i} x={180 + i * 40} y="190" width="35" height="35" rx="4" fill="rgba(100, 116, 139, 0.3)" stroke="#64748b" strokeWidth="1.5"/>
    ))}
    <text x="180" y="245" fill="#4ade80" fontSize="10">↑ position=2</text>
    <text x="480" y="245" fill="#f59e0b" fontSize="10">↑ limit=10, capacity=10</text>

    {/* After flip */}
    <text x="100" y="285" fill="#94a3b8" fontSize="11" fontWeight="bold">After flip():</text>
    <rect x="100" y="300" width="35" height="35" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="117.5" y="323" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">H</text>
    <rect x="140" y="300" width="35" height="35" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="157.5" y="323" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">i</text>
    {[...Array(8)].map((_, i) => (
      <rect key={i} x={180 + i * 40} y="300" width="35" height="35" rx="4" fill="rgba(100, 116, 139, 0.3)" stroke="#64748b" strokeWidth="1.5"/>
    ))}
    <text x="100" y="355" fill="#4ade80" fontSize="10">↑ position=0</text>
    <text x="180" y="355" fill="#f59e0b" fontSize="10">↑ limit=2</text>
    <text x="480" y="355" fill="#94a3b8" fontSize="10">↑ capacity=10</text>

    {/* Invariant */}
    <text x="400" y="390" textAnchor="middle" fill="#818cf8" fontSize="10" fontStyle="italic">
      Invariant: mark ≤ position ≤ limit ≤ capacity
    </text>
  </svg>
)

/**
 * Direct vs Heap Buffer Memory Layout
 */
const DirectHeapBufferDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-mem" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Direct vs Heap Buffer Memory Layout
    </text>

    {/* Heap Buffer */}
    <text x="200" y="65" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">
      Heap Buffer
    </text>

    {/* Java Heap */}
    <rect x="50" y="80" width="300" height="80" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="200" y="105" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Java Heap</text>

    {/* byte array */}
    <rect x="100" y="115" width="200" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="200" y="135" textAnchor="middle" fill="white" fontSize="10">byte[] backing array</text>

    {/* Arrow to ByteBuffer */}
    <line x1="200" y1="145" x2="200" y2="175" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow-mem)"/>
    <text x="220" y="165" fill="#94a3b8" fontSize="9">points to</text>

    {/* ByteBuffer */}
    <rect x="130" y="180" width="140" height="30" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="200" y="200" textAnchor="middle" fill="white" fontSize="10">ByteBuffer</text>

    {/* I/O Process */}
    <text x="200" y="240" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">I/O Process:</text>
    <text x="200" y="255" textAnchor="middle" fill="#94a3b8" fontSize="9">1. Copy to native memory</text>
    <text x="200" y="270" textAnchor="middle" fill="#94a3b8" fontSize="9">2. OS reads from native</text>
    <text x="200" y="285" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold">Two copies!</text>

    {/* Direct Buffer */}
    <text x="600" y="65" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">
      Direct Buffer
    </text>

    {/* Native Memory */}
    <rect x="450" y="80" width="300" height="80" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="600" y="105" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Native Memory (Off-Heap)</text>

    {/* Direct memory buffer */}
    <rect x="500" y="115" width="200" height="30" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="600" y="135" textAnchor="middle" fill="white" fontSize="10">Direct buffer memory</text>

    {/* Arrow to DirectByteBuffer */}
    <line x1="600" y1="145" x2="600" y2="175" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow-mem)"/>
    <text x="620" y="165" fill="#94a3b8" fontSize="9">points to</text>

    {/* DirectByteBuffer */}
    <rect x="510" y="180" width="180" height="30" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="600" y="200" textAnchor="middle" fill="white" fontSize="10">DirectByteBuffer</text>

    {/* I/O Process */}
    <text x="600" y="240" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">I/O Process:</text>
    <text x="600" y="255" textAnchor="middle" fill="#94a3b8" fontSize="9">1. OS reads directly</text>
    <text x="600" y="270" textAnchor="middle" fill="#94a3b8" fontSize="9">from native memory</text>
    <text x="600" y="285" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">One copy (Zero-copy)!</text>
  </svg>
)

/**
 * Selector and Channels Diagram
 */
const SelectorChannelsDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-sel" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Selector Multiplexing Channels
    </text>

    {/* Selector */}
    <rect x="300" y="60" width="200" height="180" rx="8" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="3"/>
    <text x="400" y="85" textAnchor="middle" fill="#818cf8" fontSize="13" fontWeight="bold">Selector</text>
    <text x="400" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">(Monitors multiple channels)</text>

    {/* SelectionKeys */}
    <rect x="320" y="110" width="160" height="35" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="400" y="130" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">OP_ACCEPT (ready)</text>

    <rect x="320" y="155" width="160" height="35" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="400" y="175" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">OP_READ (ready)</text>

    <rect x="320" y="200" width="160" height="35" rx="4" fill="#64748b" stroke="#94a3b8" strokeWidth="1.5"/>
    <text x="400" y="220" textAnchor="middle" fill="white" fontSize="10">OP_WRITE</text>

    {/* Channels on the left */}
    <rect x="50" y="70" width="150" height="35" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="125" y="92" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ServerSocketChannel</text>
    <line x1="200" y1="87" x2="295" y2="127" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow-sel)"/>

    <rect x="50" y="125" width="150" height="35" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="125" y="147" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">SocketChannel 1</text>
    <line x1="200" y1="142" x2="295" y2="172" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow-sel)"/>

    <rect x="50" y="180" width="150" height="35" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="125" y="202" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">SocketChannel 2</text>
    <line x1="200" y1="197" x2="295" y2="217" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow-sel)"/>

    {/* Thread on the right */}
    <rect x="600" y="125" width="150" height="50" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="675" y="155" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Worker Thread</text>
    <line x1="505" y1="150" x2="595" y2="150" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow-sel)"/>
    <text x="550" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">notifies</text>

    {/* Footer notes */}
    <text x="400" y="270" textAnchor="middle" fill="#94a3b8" fontSize="10" fontStyle="italic">
      Uses OS-level polling (epoll on Linux, kqueue on macOS, IOCP on Windows)
    </text>
  </svg>
)

/**
 * Memory-Mapped File Diagram
 */
const MemoryMappedFileDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-mmap" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
      </marker>
      <marker id="arrow-mmap2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    {/* Title */}
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Memory-Mapped File Architecture
    </text>

    {/* File on Disk */}
    <rect x="50" y="60" width="200" height="80" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="150" y="85" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">File on Disk</text>
    <text x="150" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">data.bin</text>
    <rect x="70" y="115" width="160" height="15" rx="2" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="150" y="126" textAnchor="middle" fill="white" fontSize="8">File contents</text>

    {/* Arrow to Memory Map */}
    <line x1="250" y1="100" x2="345" y2="100" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow-mmap)"/>
    <text x="297" y="90" textAnchor="middle" fill="#94a3b8" fontSize="9">map()</text>

    {/* Memory-Mapped Region */}
    <rect x="350" y="60" width="200" height="80" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="450" y="85" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Memory-Mapped Region</text>
    <text x="450" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">Virtual Memory</text>
    <rect x="370" y="115" width="160" height="15" rx="2" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="450" y="126" textAnchor="middle" fill="white" fontSize="8">Same file contents</text>

    {/* Arrow to MappedByteBuffer */}
    <line x1="550" y1="100" x2="645" y2="100" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow-mmap)"/>
    <text x="597" y="90" textAnchor="middle" fill="#94a3b8" fontSize="9">access via</text>

    {/* MappedByteBuffer */}
    <rect x="650" y="70" width="130" height="60" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="715" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">MappedByteBuffer</text>
    <text x="715" y="110" textAnchor="middle" fill="white" fontSize="8">putInt(), getInt()</text>
    <text x="715" y="122" textAnchor="middle" fill="white" fontSize="8">force()</text>

    {/* Benefits */}
    <text x="400" y="175" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Benefits:</text>
    <text x="400" y="195" textAnchor="middle" fill="#94a3b8" fontSize="10">• OS handles caching automatically</text>
    <text x="400" y="210" textAnchor="middle" fill="#94a3b8" fontSize="10">• Zero-copy I/O (no read/write syscalls needed)</text>
    <text x="400" y="225" textAnchor="middle" fill="#94a3b8" fontSize="10">• Random access without seeking</text>
    <text x="400" y="240" textAnchor="middle" fill="#94a3b8" fontSize="10">• Shared memory between processes</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * JavaNIOInternals Component
 */
function JavaNIOInternals({ onBack, breadcrumb }) {
  // State for modal navigation
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'nio-vs-io',
      name: 'NIO vs Traditional IO',
      icon: '⚡',
      color: '#f59e0b',
      description: 'Compare blocking Traditional IO with non-blocking NIO architecture and understand when to use each approach.',
      diagram: NIOArchitectureDiagram,
      details: [
        {
          name: 'Architecture Comparison',
          diagram: NIOArchitectureDiagram,
          explanation: 'Traditional IO uses stream-based operations where each connection requires a dedicated thread that blocks on read/write operations. Java NIO introduces buffer-based operations with channels and selectors, allowing one thread to handle thousands of connections through non-blocking I/O.',
          codeExample: `// Traditional IO - one thread per connection
ServerSocket server = new ServerSocket(8080);
while (true) {
    Socket client = server.accept();  // Blocks
    new Thread(() -> {
        InputStream in = client.getInputStream();
        in.read();  // Blocks until data arrives
    }).start();
}
// Problem: 10,000 connections = 10,000 threads!`
        },
        {
          name: 'NIO Components',
          explanation: 'NIO consists of three key components: Buffers (data containers like ByteBuffer), Channels (bi-directional data streams like SocketChannel), and Selectors (multiplexed I/O event handlers). These work together to enable scalable non-blocking I/O operations.',
          codeExample: `// NIO - one thread handles many connections
ServerSocketChannel server = ServerSocketChannel.open();
server.bind(new InetSocketAddress(8080));
server.configureBlocking(false);

Selector selector = Selector.open();
server.register(selector, SelectionKey.OP_ACCEPT);

while (true) {
    selector.select();  // Blocks until events ready
    Set<SelectionKey> keys = selector.selectedKeys();
    for (SelectionKey key : keys) {
        if (key.isAcceptable()) {
            SocketChannel client = server.accept();
            client.configureBlocking(false);
            client.register(selector, SelectionKey.OP_READ);
        }
        if (key.isReadable()) {
            SocketChannel client = (SocketChannel) key.channel();
            ByteBuffer buffer = ByteBuffer.allocate(1024);
            client.read(buffer);  // Non-blocking!
        }
    }
    keys.clear();
}
// One thread handles thousands of connections!`
        },
        {
          name: 'When to Use Each',
          explanation: 'Use Traditional IO for simple applications with few connections where blocking is acceptable. Use NIO when you need to handle many concurrent connections (like high-performance servers), require non-blocking I/O, or need advanced features like memory-mapped files and scatter/gather operations.',
          codeExample: `// Traditional IO: Good for
// - Simple client apps
// - Few connections (<100)
// - Straightforward code
FileInputStream fis = new FileInputStream("file.txt");
int data = fis.read();  // Simple but blocks

// NIO: Good for
// - High-performance servers
// - Many connections (1000s)
// - Non-blocking required
// - Memory-mapped files
// - Scatter/gather I/O
FileChannel channel = FileChannel.open(
    Paths.get("file.txt"), StandardOpenOption.READ);
ByteBuffer buffer = ByteBuffer.allocate(1024);
channel.read(buffer);  // Can be non-blocking`
        }
      ]
    },
    {
      id: 'bytebuffer',
      name: 'ByteBuffer Internals',
      icon: '📦',
      color: '#3b82f6',
      description: 'Master ByteBuffer state management with position, limit, and capacity, and learn essential buffer operations.',
      diagram: ByteBufferStateDiagram,
      details: [
        {
          name: 'Buffer Properties',
          diagram: ByteBufferStateDiagram,
          explanation: 'ByteBuffer has four key properties: capacity (maximum size, fixed at creation), position (current read/write index), limit (read/write boundary), and mark (saved position for reset). These follow the invariant: mark ≤ position ≤ limit ≤ capacity.',
          codeExample: `// Buffer creation
ByteBuffer buffer = ByteBuffer.allocate(10);
// Initial state: position=0, limit=10, capacity=10

// Write data
buffer.put((byte) 'H');  // position moves to 1
buffer.put((byte) 'i');  // position moves to 2
// State: position=2, limit=10, capacity=10

// Check properties
int capacity = buffer.capacity();  // 10 (never changes)
int position = buffer.position();  // 2
int limit = buffer.limit();        // 10
int remaining = buffer.remaining(); // 8 (limit - position)`
        },
        {
          name: 'Buffer Operations',
          explanation: 'Key buffer operations include: flip() switches from write to read mode (limit=position, position=0), clear() resets for writing (position=0, limit=capacity), compact() moves unread data to start, and rewind() resets position to 0 for re-reading.',
          codeExample: `ByteBuffer buf = ByteBuffer.allocate(10);

// Write mode
buf.put((byte) 'H');
buf.put((byte) 'i');
// position=2, limit=10

// flip() - switch to read mode
buf.flip();
// Same as: buf.limit(buf.position()); buf.position(0);
// position=0, limit=2

// Read data
byte b1 = buf.get();  // 'H', position=1
byte b2 = buf.get();  // 'i', position=2

// rewind() - re-read from start
buf.rewind();
// position=0, limit unchanged

// clear() - reset for writing
buf.clear();
// position=0, limit=capacity

// compact() - keep unread data
buf.flip();
buf.get();  // Read one byte
buf.compact();  // Move remaining to start
// Unread data moved to beginning, ready to write more`
        },
        {
          name: 'Common Mistakes',
          explanation: 'Common mistakes include forgetting to flip() before reading (writes nothing), not clearing selectedKeys in selector loop (processes same keys repeatedly), and not checking hasRemaining() before read/write operations.',
          codeExample: `// MISTAKE 1: Forgetting flip()
ByteBuffer buffer = ByteBuffer.allocate(1024);
buffer.put(data);
// buffer.flip();  // FORGOT THIS!
channel.write(buffer);  // Writes nothing!

// CORRECT:
buffer.flip();  // Must flip before write
channel.write(buffer);

// MISTAKE 2: Not clearing selectedKeys
selector.select();
for (SelectionKey key : selector.selectedKeys()) {
    handleKey(key);
}
// selector.selectedKeys().clear();  // FORGOT!
// Next loop processes same keys again!

// CORRECT:
selector.selectedKeys().clear();

// MISTAKE 3: Not checking hasRemaining()
while (buffer.hasRemaining()) {  // CORRECT
    channel.write(buffer);
}
// vs
channel.write(buffer);  // May not write everything`
        }
      ]
    },
    {
      id: 'direct-heap',
      name: 'Direct vs Heap Buffers',
      icon: '💾',
      color: '#8b5cf6',
      description: 'Understand memory allocation strategies, zero-copy I/O, and performance tradeoffs between heap and direct buffers.',
      diagram: DirectHeapBufferDiagram,
      details: [
        {
          name: 'Heap Buffers',
          diagram: DirectHeapBufferDiagram,
          explanation: 'Heap buffers are allocated using allocate() and backed by a Java byte array in the heap. They are subject to garbage collection, faster to allocate/deallocate, but may require an extra copy during I/O operations. Use for short-lived or small buffers.',
          codeExample: `// Heap buffer - backed by byte[] in Java heap
ByteBuffer heap = ByteBuffer.allocate(1024);

// Access backing array
heap.hasArray();  // true
byte[] backing = heap.array();  // Get backing array
int offset = heap.arrayOffset();

// I/O requires copy:
// 1. JVM copies from heap array to native memory
// 2. OS reads from native memory
// Result: TWO copies

// Advantages:
// - Fast allocation
// - GC manages memory
// - Can access backing array

// Disadvantages:
// - Extra copy for I/O operations
// - Subject to GC pauses`
        },
        {
          name: 'Direct Buffers',
          explanation: 'Direct buffers are allocated using allocateDirect() in native memory outside the Java heap. They enable zero-copy I/O (OS reads directly from native memory), are slower to allocate but faster for I/O operations, and are cleaned up using internal Cleaner mechanism.',
          codeExample: `// Direct buffer - native memory (off-heap)
ByteBuffer direct = ByteBuffer.allocateDirect(1024);

// No backing array
direct.hasArray();  // false
// direct.array();  // UnsupportedOperationException!

// Zero-copy I/O:
// 1. OS reads directly from native memory
// Result: ONE copy

// Advantages:
// - Zero-copy I/O
// - Not affected by GC
// - Better for large/long-lived buffers

// Disadvantages:
// - Slower allocation/deallocation
// - Memory outside heap (harder to monitor)
// - Should be pooled and reused

// Lifecycle managed by Cleaner
// When buffer becomes unreachable, Cleaner frees memory`
        },
        {
          name: 'Buffer Pooling',
          explanation: 'Since direct buffers are expensive to allocate, pool them for reuse. Create a pool of pre-allocated direct buffers, acquire from pool when needed, and return after use. This amortizes the allocation cost across many operations.',
          codeExample: `// Buffer pool implementation
class BufferPool {
    private final Queue<ByteBuffer> pool =
        new ConcurrentLinkedQueue<>();
    private final int bufferSize;
    private final int maxPoolSize;

    public BufferPool(int bufferSize, int maxPoolSize) {
        this.bufferSize = bufferSize;
        this.maxPoolSize = maxPoolSize;
    }

    public ByteBuffer acquire() {
        ByteBuffer buf = pool.poll();
        if (buf == null) {
            buf = ByteBuffer.allocateDirect(bufferSize);
        }
        return buf;
    }

    public void release(ByteBuffer buf) {
        buf.clear();  // Reset for reuse
        if (pool.size() < maxPoolSize) {
            pool.offer(buf);
        }
        // If pool full, let buffer be GC'd
    }
}

// Usage
BufferPool pool = new BufferPool(8192, 100);
ByteBuffer buffer = pool.acquire();
try {
    // Use buffer for I/O
    channel.read(buffer);
    buffer.flip();
    processData(buffer);
} finally {
    pool.release(buffer);  // Return to pool
}`
        }
      ]
    },
    {
      id: 'selectors',
      name: 'Channels and Selectors',
      icon: '🔄',
      color: '#22c55e',
      description: 'Learn multiplexed I/O with Selectors, channel types, and how to build scalable non-blocking servers.',
      diagram: SelectorChannelsDiagram,
      details: [
        {
          name: 'Channel Types',
          diagram: SelectorChannelsDiagram,
          explanation: 'NIO provides several channel types: FileChannel for file I/O, SocketChannel for TCP client connections, ServerSocketChannel for accepting TCP connections, and DatagramChannel for UDP. Channels are bi-directional and work with buffers.',
          codeExample: `// FileChannel - file I/O
FileChannel fileChannel = FileChannel.open(
    Paths.get("data.bin"),
    StandardOpenOption.READ,
    StandardOpenOption.WRITE
);
ByteBuffer buffer = ByteBuffer.allocate(1024);
fileChannel.read(buffer);  // Read from file
buffer.flip();
fileChannel.write(buffer);  // Write to file

// SocketChannel - TCP client
SocketChannel client = SocketChannel.open();
client.connect(new InetSocketAddress("localhost", 8080));
client.configureBlocking(false);
client.write(buffer);  // Send data
client.read(buffer);   // Receive data

// ServerSocketChannel - TCP server
ServerSocketChannel server = ServerSocketChannel.open();
server.bind(new InetSocketAddress(8080));
server.configureBlocking(false);
SocketChannel accepted = server.accept();

// DatagramChannel - UDP
DatagramChannel udp = DatagramChannel.open();
udp.bind(new InetSocketAddress(9090));
udp.send(buffer, new InetSocketAddress("host", 9090));`
        },
        {
          name: 'Selector Operations',
          explanation: 'A Selector multiplexes I/O events from multiple channels. Register channels with interest ops (OP_ACCEPT, OP_CONNECT, OP_READ, OP_WRITE), call select() to block until events are ready, then iterate over selectedKeys to handle each ready channel.',
          codeExample: `// Create selector
Selector selector = Selector.open();

// Register channels with interest ops
serverChannel.register(selector, SelectionKey.OP_ACCEPT);
clientChannel.register(selector, SelectionKey.OP_READ);

// Event loop
while (true) {
    // Block until at least one channel is ready
    selector.select();  // or select(timeout) or selectNow()

    // Get ready channels
    Set<SelectionKey> selectedKeys = selector.selectedKeys();
    Iterator<SelectionKey> iter = selectedKeys.iterator();

    while (iter.hasNext()) {
        SelectionKey key = iter.next();
        iter.remove();  // IMPORTANT: Remove processed key

        // Check what operation is ready
        if (key.isAcceptable()) {
            // Server can accept new connection
            handleAccept(key);
        }
        if (key.isConnectable()) {
            // Client connection established
            handleConnect(key);
        }
        if (key.isReadable()) {
            // Data available to read
            handleRead(key);
        }
        if (key.isWritable()) {
            // Channel ready for writing
            handleWrite(key);
        }
    }
}`
        },
        {
          name: 'SelectionKey Operations',
          explanation: 'SelectionKey represents a channel registration with a selector. It tracks interest ops (what we want to monitor), ready ops (what is currently ready), and allows attaching objects. Use interestOps() to change what to monitor and attach() to store state.',
          codeExample: `// SelectionKey operations
SelectionKey key = channel.register(selector,
    SelectionKey.OP_READ);

// Check ready operations
key.isAcceptable();  // OP_ACCEPT ready
key.isConnectable(); // OP_CONNECT ready
key.isReadable();    // OP_READ ready
key.isWritable();    // OP_WRITE ready

// Get registered channel
SocketChannel channel = (SocketChannel) key.channel();

// Change interest operations
key.interestOps(SelectionKey.OP_WRITE);
// or combine: OP_READ | OP_WRITE

// Attach object to key (store state)
ByteBuffer buffer = ByteBuffer.allocate(1024);
key.attach(buffer);
// Later retrieve it
ByteBuffer buf = (ByteBuffer) key.attachment();

// Cancel registration
key.cancel();  // No longer monitor this channel

// Check validity
if (key.isValid()) {
    // Key is still registered
}`
        },
        {
          name: 'Complete NIO Server',
          explanation: 'A complete NIO server uses a selector to handle accept, read, and write events. Accept new connections and register for read, read data and register for write if response needed, write response and switch back to read mode.',
          codeExample: `public class NioServer {
    public static void main(String[] args) throws IOException {
        Selector selector = Selector.open();

        ServerSocketChannel server = ServerSocketChannel.open();
        server.bind(new InetSocketAddress(8080));
        server.configureBlocking(false);
        server.register(selector, SelectionKey.OP_ACCEPT);

        System.out.println("Server started on port 8080");

        while (true) {
            selector.select();  // Block until events

            Iterator<SelectionKey> iter =
                selector.selectedKeys().iterator();

            while (iter.hasNext()) {
                SelectionKey key = iter.next();
                iter.remove();

                try {
                    if (key.isAcceptable()) {
                        handleAccept(selector, key);
                    }
                    if (key.isReadable()) {
                        handleRead(key);
                    }
                    if (key.isWritable()) {
                        handleWrite(key);
                    }
                } catch (IOException e) {
                    key.cancel();
                    key.channel().close();
                }
            }
        }
    }

    private static void handleAccept(Selector selector,
            SelectionKey key) throws IOException {
        ServerSocketChannel server =
            (ServerSocketChannel) key.channel();
        SocketChannel client = server.accept();
        client.configureBlocking(false);
        client.register(selector, SelectionKey.OP_READ);
    }

    private static void handleRead(SelectionKey key)
            throws IOException {
        SocketChannel client = (SocketChannel) key.channel();
        ByteBuffer buffer = ByteBuffer.allocate(1024);
        int bytesRead = client.read(buffer);

        if (bytesRead == -1) {
            key.cancel();
            client.close();
            return;
        }

        buffer.flip();
        // Process request...
        ByteBuffer response = processRequest(buffer);
        key.attach(response);
        key.interestOps(SelectionKey.OP_WRITE);
    }

    private static void handleWrite(SelectionKey key)
            throws IOException {
        SocketChannel client = (SocketChannel) key.channel();
        ByteBuffer response = (ByteBuffer) key.attachment();
        client.write(response);

        if (!response.hasRemaining()) {
            key.interestOps(SelectionKey.OP_READ);
        }
    }
}`
        }
      ]
    },
    {
      id: 'memory-mapped',
      name: 'Memory-Mapped Files',
      icon: '📁',
      color: '#ec4899',
      description: 'Explore memory-mapped files for zero-copy file I/O, large file processing, and inter-process communication.',
      diagram: MemoryMappedFileDiagram,
      details: [
        {
          name: 'Memory Mapping Basics',
          diagram: MemoryMappedFileDiagram,
          explanation: 'Memory-mapped files map file contents directly into the process address space. The OS handles caching and paging automatically. Changes to the mapped memory are eventually written back to the file, providing zero-copy file access.',
          codeExample: `// Create memory-mapped file
RandomAccessFile file = new RandomAccessFile("data.bin", "rw");
FileChannel channel = file.getChannel();

// Map entire file to memory
MappedByteBuffer mmap = channel.map(
    FileChannel.MapMode.READ_WRITE,  // Access mode
    0,                                // File position
    channel.size()                    // Size to map
);

// Read and write like a ByteBuffer
mmap.putInt(0, 42);           // Write int at position 0
int value = mmap.getInt(0);   // Read int from position 0

// Changes are eventually written to file
// Force immediate write:
mmap.force();  // Flushes changes to disk

// Map modes
// READ_ONLY: Read-only access
// READ_WRITE: Read and write access
// PRIVATE: Copy-on-write (changes not written to file)`
        },
        {
          name: 'Large File Processing',
          explanation: 'For files larger than available memory, map them in chunks. Process each chunk sequentially, unmapping previous chunks to free memory. This allows processing arbitrarily large files with constant memory usage.',
          codeExample: `// Process huge file in chunks
try (FileChannel fc = FileChannel.open(
        Paths.get("huge.bin"),
        StandardOpenOption.READ)) {

    long fileSize = fc.size();
    long position = 0;
    int chunkSize = 1024 * 1024;  // 1MB chunks

    while (position < fileSize) {
        long remaining = fileSize - position;
        int mapSize = (int) Math.min(chunkSize, remaining);

        // Map this chunk
        MappedByteBuffer chunk = fc.map(
            FileChannel.MapMode.READ_ONLY,
            position,
            mapSize
        );

        // Process chunk
        processChunk(chunk);

        // Move to next chunk
        position += mapSize;

        // Chunk will be GC'd and unmapped
    }
}

private static void processChunk(MappedByteBuffer chunk) {
    while (chunk.hasRemaining()) {
        byte b = chunk.get();
        // Process byte...
    }
}`
        },
        {
          name: 'Inter-Process Communication',
          explanation: 'Memory-mapped files enable efficient IPC by mapping the same file in multiple processes. Changes made by one process are visible to others. Use proper synchronization mechanisms (file locks, semaphores) to coordinate access.',
          codeExample: `// Process 1 - Writer
RandomAccessFile file = new RandomAccessFile("shared.bin", "rw");
FileChannel channel = file.getChannel();

// Create 1KB shared memory region
MappedByteBuffer shared = channel.map(
    FileChannel.MapMode.READ_WRITE, 0, 1024);

// Write data
shared.putInt(0, 12345);  // Write int at offset 0
shared.force();           // Ensure written

// Process 2 - Reader (separate process)
RandomAccessFile file2 = new RandomAccessFile("shared.bin", "r");
FileChannel channel2 = file2.getChannel();

// Map same file
MappedByteBuffer shared2 = channel2.map(
    FileChannel.MapMode.READ_ONLY, 0, 1024);

// Read data written by Process 1
int value = shared2.getInt(0);  // Reads 12345

// Synchronization example with FileLock
FileLock lock = channel.lock();  // Exclusive lock
try {
    // Critical section - safe access
    shared.putInt(0, 99999);
    shared.force();
} finally {
    lock.release();
}

// Other process acquires lock
FileLock lock2 = channel2.lock();  // Blocks until available
try {
    int val = shared2.getInt(0);  // Reads 99999
} finally {
    lock2.release();
}`
        },
        {
          name: 'Performance Considerations',
          explanation: 'Memory-mapped files excel at random access and repeated reads/writes to the same regions. The OS page cache makes subsequent accesses very fast. However, mapping has overhead, so it is best for large files (>1MB) or files accessed repeatedly.',
          codeExample: `// Use cases where memory mapping excels:

// 1. Database implementations (random access)
MappedByteBuffer dbFile = channel.map(
    FileChannel.MapMode.READ_WRITE, 0, dbSize);
// Fast random access to records
long recordOffset = recordId * recordSize;
dbFile.position((int) recordOffset);
Record record = readRecord(dbFile);

// 2. Large data processing (sequential chunks)
// Process 10GB file with 100MB chunks
// Each chunk mapped, processed, unmapped

// 3. Read-only shared data (e.g., config)
MappedByteBuffer config = channel.map(
    FileChannel.MapMode.READ_ONLY, 0, configSize);
// Multiple threads read simultaneously
// OS page cache makes it very fast

// When NOT to use memory mapping:
// - Small files (<1MB) - overhead not worth it
// - Sequential one-time reads - buffered streams better
// - Files that change size frequently
// - Need precise control over when writes occur

// Performance tips:
// 1. Reuse mappings when possible
// 2. Use READ_ONLY when you don't need to write
// 3. Call force() only when durability needed
// 4. Unmap when done (buffer becomes unreachable)`
        }
      ]
    },
    {
      id: 'interview',
      name: 'Interview Questions',
      icon: '❓',
      color: '#06b6d4',
      description: 'Common Java NIO interview questions covering buffers, channels, selectors, and best practices.',
      details: [
        {
          name: 'Core Concepts',
          explanation: 'Understanding the fundamental differences between NIO and traditional IO, buffer state management, and when to use each approach is crucial for interviews.',
          codeExample: `// Q: What is the main difference between NIO and Traditional IO?
// A: NIO is buffer-based and non-blocking; IO is stream-based and blocking
//    NIO allows one thread to handle many connections via Selectors

// Q: What does flip() do?
// A: Switches buffer from write mode to read mode
//    Sets limit = position, position = 0
buffer.flip();
// Equivalent to:
// buffer.limit(buffer.position());
// buffer.position(0);

// Q: What is the buffer invariant?
// A: mark ≤ position ≤ limit ≤ capacity

// Q: When would you use NIO over Traditional IO?
// A: - High-performance servers with many connections
//    - Non-blocking I/O required
//    - Need advanced features (memory-mapped files, scatter/gather)
//    Traditional IO for simple apps with few connections`
        },
        {
          name: 'Buffer Operations',
          explanation: 'Interviewers often ask about buffer state transitions and common operations. Understanding clear(), flip(), compact(), and rewind() is essential.',
          codeExample: `// Q: Explain buffer operations
// A:
ByteBuffer buf = ByteBuffer.allocate(10);

// clear() - reset for writing
buf.clear();
// position=0, limit=capacity
// Use when done reading, want to write new data

// flip() - switch to read mode
buf.flip();
// limit=position, position=0
// Use after writing, before reading

// rewind() - re-read from start
buf.rewind();
// position=0, limit unchanged
// Use to read same data again

// compact() - keep unread data
buf.compact();
// Moves unread data to start, position after it
// Use when partially read, want to write more

// Q: What happens if you forget flip()?
// A: Reading reads garbage (data after position)
//    Writing writes nothing (position to limit is empty)`
        },
        {
          name: 'Direct vs Heap',
          explanation: 'Understanding the tradeoffs between direct and heap buffers, when to use each, and why direct buffers need pooling is a common interview topic.',
          codeExample: `// Q: Direct vs Heap buffer?
// A:
// Heap buffer:
ByteBuffer heap = ByteBuffer.allocate(1024);
// - Backed by byte[] in Java heap
// - Fast allocation
// - Subject to GC
// - I/O requires extra copy to native memory

// Direct buffer:
ByteBuffer direct = ByteBuffer.allocateDirect(1024);
// - Native memory (off-heap)
// - Slow allocation
// - Not subject to GC (uses Cleaner)
// - Zero-copy I/O

// Q: When to use direct buffers?
// A: - Long-lived buffers (amortize allocation cost)
//    - Large I/O operations
//    - Memory-mapped files
//    - Always pool them!

// Q: Why pool direct buffers?
// A: Allocation is expensive (syscall to allocate native memory)
//    Pooling amortizes cost across many operations`
        },
        {
          name: 'Selectors',
          explanation: 'Selector questions focus on how multiplexing works, selection keys, and common pitfalls in the event loop.',
          codeExample: `// Q: What is a Selector?
// A: Multiplexes I/O events from multiple channels
//    Allows one thread to monitor many channels
//    Uses OS-level facilities (epoll, kqueue, IOCP)

// Q: What are SelectionKey operations?
// A:
SelectionKey.OP_ACCEPT   // Server: new connection ready
SelectionKey.OP_CONNECT  // Client: connection established
SelectionKey.OP_READ     // Data ready to read
SelectionKey.OP_WRITE    // Ready to write

// Q: Common selector mistakes?
// A:
// 1. Forgetting to clear selectedKeys
selector.select();
for (SelectionKey key : selector.selectedKeys()) {
    handleKey(key);
}
selector.selectedKeys().clear();  // MUST DO THIS!

// 2. Blocking in event loop
// DON'T do expensive operations in event loop
// Hand off to worker threads

// 3. Not checking key.isValid()
if (key.isValid() && key.isReadable()) {
    handleRead(key);
}`
        },
        {
          name: 'Memory-Mapped Files',
          explanation: 'Questions about memory-mapped files cover use cases, benefits, and when they provide performance advantages.',
          codeExample: `// Q: What are memory-mapped files?
// A: Map file contents directly to process memory
//    OS handles caching and paging
//    Provides zero-copy file access

// Q: When to use memory-mapped files?
// A: - Large files (>1MB)
//    - Random access patterns
//    - Database implementations
//    - Inter-process communication (shared memory)

// Q: What are the benefits?
// A: - OS handles caching automatically
//    - Zero-copy I/O (no read/write syscalls)
//    - Random access without seeking
//    - Can be shared between processes

// Q: Example usage?
// A:
MappedByteBuffer mmap = channel.map(
    FileChannel.MapMode.READ_WRITE,
    0,
    channel.size()
);
mmap.putInt(0, 42);      // Write
int value = mmap.getInt(0);  // Read
mmap.force();  // Flush to disk`
        },
        {
          name: 'Scatter/Gather',
          explanation: 'Advanced NIO feature that allows reading into multiple buffers or writing from multiple buffers in a single operation.',
          codeExample: `// Q: What is Scatter/Gather I/O?
// A: Read/write to multiple buffers in one operation

// Scatter Read - read into multiple buffers
ByteBuffer header = ByteBuffer.allocate(128);
ByteBuffer body = ByteBuffer.allocate(1024);
ByteBuffer[] buffers = { header, body };

channel.read(buffers);
// Fills header first, then body
// Useful for structured data (header + payload)

// Gather Write - write from multiple buffers
ByteBuffer header = ByteBuffer.allocate(128);
ByteBuffer body = ByteBuffer.allocate(1024);
// ... populate buffers ...
ByteBuffer[] buffers = { header, body };

channel.write(buffers);
// Writes header first, then body
// Single syscall instead of two

// Benefits:
// - Single syscall vs multiple
// - Cleaner code for structured data
// - Better performance`
        }
      ]
    }
  ]

  // =============================================================================
  // NAVIGATION HANDLERS
  // =============================================================================

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  const handlePreviousConcept = () => {
    if (selectedConceptIndex > 0) {
      setSelectedConceptIndex(selectedConceptIndex - 1)
      setSelectedDetailIndex(0)
    }
  }

  const handleNextConcept = () => {
    if (selectedConceptIndex < concepts.length - 1) {
      setSelectedConceptIndex(selectedConceptIndex + 1)
      setSelectedDetailIndex(0)
    }
  }

  // =============================================================================
  // BREADCRUMB CONFIGURATION
  // =============================================================================

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'My Projects', icon: '💼', page: 'My Projects' },
      { name: 'Java NIO Internals', icon: '📡', page: 'Java NIO Internals' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index, item) => {
    if (index === 0) {
      onBack()  // Go back to My Projects
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)  // Close modal, stay on Java NIO page
    }
  }

  // =============================================================================
  // KEYBOARD NAVIGATION
  // =============================================================================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (selectedConcept) {
          setSelectedConceptIndex(null)
        } else {
          onBack()
        }
      } else if (e.key === 'ArrowLeft' && selectedConceptIndex !== null) {
        e.preventDefault()
        handlePreviousConcept()
      } else if (e.key === 'ArrowRight' && selectedConceptIndex !== null) {
        e.preventDefault()
        handleNextConcept()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

  // =============================================================================
  // STYLES
  // =============================================================================

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #4c1d95 50%, #0f172a 100%)',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }

  const headerStyle = {
    maxWidth: '1400px',
    margin: '0 auto 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  }

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #818cf8, #6366f1)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(99, 102, 241, 0.2)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    borderRadius: '0.5rem',
    color: '#818cf8',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Java NIO - Internal Workings</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(99, 102, 241, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to My Projects
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={JAVANIO_COLORS}
        />
      </div>

      {/* Concept Cards Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {concepts.map((concept, index) => (
          <div
            key={concept.id}
            onClick={() => setSelectedConceptIndex(index)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: `1px solid ${concept.color}40`,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = `0 20px 40px ${concept.color}20`
              e.currentTarget.style.borderColor = concept.color
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.borderColor = `${concept.color}40`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{concept.icon}</span>
              <h3 style={{ color: concept.color, margin: 0, fontSize: '1.25rem' }}>{concept.name}</h3>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>{concept.description}</p>
            <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
              {concept.details.length} topics • Click to explore
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Selected Concept */}
      {selectedConcept && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => setSelectedConceptIndex(null)}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              borderRadius: '1rem',
              padding: '2rem',
              width: '95vw', maxWidth: '1400px', height: '90vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu}
              colors={JAVANIO_COLORS}
            />

            {/* Modal Header with Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #334155'
            }}>
              <h2 style={{
                color: selectedConcept.color,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.25rem'
              }}>
                <span>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button
                  onClick={handlePreviousConcept}
                  disabled={selectedConceptIndex === 0}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >←</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>
                  {selectedConceptIndex + 1}/{concepts.length}
                </span>
                <button
                  onClick={handleNextConcept}
                  disabled={selectedConceptIndex === concepts.length - 1}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >→</button>
                <button
                  onClick={() => setSelectedConceptIndex(null)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '0.375rem',
                    color: '#f87171',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    marginLeft: '0.5rem'
                  }}
                >✕</button>
              </div>
            </div>

            {/* Subtopic Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDetailIndex(i)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)',
                    border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`,
                    borderRadius: '0.5rem',
                    color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: selectedDetailIndex === i ? '600' : '400',
                    transition: 'all 0.2s'
                  }}
                >
                  {detail.name}
                </button>
              ))}
            </div>

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = detail.diagram || selectedConcept.diagram
              return (
                <div>
                  {/* Diagram */}
                  {DiagramComponent && (
                    <div style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      border: '1px solid #334155'
                    }}>
                      <DiagramComponent />
                    </div>
                  )}

                  {/* Detail Name */}
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                    {detail.name}
                  </h3>

                  {/* Explanation */}
                  <p style={{
                    color: '#e2e8f0',
                    lineHeight: '1.8',
                    marginBottom: '1rem',
                    background: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'left'
                  }}>
                    {detail.explanation}
                  </p>

                  {/* Code Example */}
                  {detail.codeExample && (
                    <SyntaxHighlighter
                      language="java"
                      style={vscDarkPlus}
                      customStyle={{
                        padding: '1rem',
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.8rem',
                        border: '1px solid #334155',
                        background: '#0f172a'
                      }}
                      codeTagProps={{ style: { background: 'transparent' } }}
                    >
                      {detail.codeExample}
                    </SyntaxHighlighter>
                  )}
                </div>
              )
            })()}

          </div>
        </div>
      )}
    </div>
  )
}

export default JavaNIOInternals

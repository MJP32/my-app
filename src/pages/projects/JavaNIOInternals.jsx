import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, ArrowLeft, Layers, Zap, Database, Radio, FileText, Settings } from 'lucide-react';
import { KEYS } from '../../utils/keyboardNavigation.js';
import Breadcrumb from '../../components/Breadcrumb';
import { useTheme } from '../../contexts/ThemeContext';

const highlightCode = (code) => {
  let highlighted = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const placeholders = [];
  const store = (html) => { placeholders.push(html); return `___P${placeholders.length - 1}___`; };
  highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, (m) => store(`<span class="token comment">${m}</span>`));
  highlighted = highlighted.replace(/\/\/.*$/gm, (m) => store(`<span class="token comment">${m}</span>`));
  highlighted = highlighted.replace(/"(?:\\.|[^"\\])*"/g, (m) => store(`<span class="token string">${m}</span>`));
  highlighted = highlighted.replace(/@\w+/g, (m) => store(`<span class="token annotation">${m}</span>`));
  highlighted = highlighted.replace(/\b\d+(?:\.\d+)?\b/g, (m) => store(`<span class="token number">${m}</span>`));
  highlighted = highlighted.replace(/\b(true|false|null)\b/g, (m) => store(`<span class="token boolean">${m}</span>`));
  const keywords = 'abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for if implements import instanceof int interface long native new package private protected public return short static super switch synchronized this throw throws transient try void volatile while var';
  highlighted = highlighted.replace(new RegExp('\\b(' + keywords.split(' ').join('|') + ')\\b', 'g'), (m) => store(`<span class="token keyword">${m}</span>`));
  highlighted = highlighted.replace(/\b([A-Z][A-Za-z0-9_]*)\b/g, (m) => store(`<span class="token class-name">${m}</span>`));
  highlighted = highlighted.replace(/\b([a-z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, (m) => store(`<span class="token function">${m}</span>`));
  highlighted = highlighted.replace(/___P(\d+)___/g, (_, n) => placeholders[Number(n)]);
  return highlighted;
};

const JavaNIOInternals = ({ onBack }) => {
  const { colors } = useTheme();
  const [expandedSections, setExpandedSections] = useState({ 0: true });
  const backButtonRef = useRef(null);

  const toggleSection = (index) => setExpandedSections(prev => ({ ...prev, [index]: !prev[index] }));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === KEYS.B && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = e.target.tagName.toLowerCase();
        if (tag !== 'input' && tag !== 'textarea' && !e.target.isContentEditable) {
          e.preventDefault();
          onBack();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const sections = [
    {
      title: 'NIO vs Traditional IO',
      icon: <Zap className="w-5 h-5" />,
      content: `Java NIO (New IO) provides non-blocking I/O operations.

Traditional IO (java.io):
• Stream-based (byte/char streams)
• Blocking operations
• One thread per connection
• Simple but doesn't scale

NIO (java.nio):
• Buffer-based (ByteBuffer)
• Non-blocking with Selectors
• One thread handles many connections
• Complex but highly scalable

Key NIO components:
• Buffers: Data containers
• Channels: Bi-directional streams
• Selectors: Multiplexed I/O`,
      code: `// Traditional IO - one thread per connection
ServerSocket server = new ServerSocket(8080);
while (true) {
    Socket client = server.accept();  // Blocks
    new Thread(() -> {
        InputStream in = client.getInputStream();
        in.read();  // Blocks until data
    }).start();
}
// Problem: 10,000 connections = 10,000 threads!

// NIO - one thread, many connections
ServerSocketChannel server = ServerSocketChannel.open();
server.bind(new InetSocketAddress(8080));
server.configureBlocking(false);

Selector selector = Selector.open();
server.register(selector, SelectionKey.OP_ACCEPT);

while (true) {
    selector.select();  // Blocks until events
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
      title: 'ByteBuffer Internals',
      icon: <Database className="w-5 h-5" />,
      content: `ByteBuffer is the fundamental NIO data container.

Key properties:
• capacity: Maximum size (fixed)
• position: Current read/write position
• limit: Read/write boundary
• mark: Saved position (optional)

Invariant: mark ≤ position ≤ limit ≤ capacity

Buffer types:
• Heap buffer: allocate() - backed by array
• Direct buffer: allocateDirect() - native memory`,
      code: `// Buffer creation
ByteBuffer heapBuffer = ByteBuffer.allocate(1024);
// Backed by byte[], in Java heap

ByteBuffer directBuffer = ByteBuffer.allocateDirect(1024);
// Native memory, faster for I/O

// Buffer state visualization
// After allocate(10):
// [_, _, _, _, _, _, _, _, _, _]
//  ^                           ^
// pos=0                    cap=10, lim=10

// After put (write)
ByteBuffer buf = ByteBuffer.allocate(10);
buf.put((byte) 'H');
buf.put((byte) 'i');
// [H, i, _, _, _, _, _, _, _, _]
//        ^                    ^
//     pos=2                cap=10, lim=10

// flip() - switch from write to read mode
buf.flip();
// [H, i, _, _, _, _, _, _, _, _]
//  ^     ^                    ^
// pos=0 lim=2              cap=10

// After get (read)
byte b = buf.get();  // Returns 'H'
// [H, i, _, _, _, _, _, _, _, _]
//     ^  ^                    ^
//  pos=1 lim=2             cap=10

// clear() - reset for writing
buf.clear();
// [_, _, _, _, _, _, _, _, _, _]
//  ^                          ^
// pos=0                   cap=10, lim=10

// compact() - keep unread data
buf.flip();
buf.get();  // Read one byte
buf.compact();  // Move remaining to start
// [i, _, _, _, _, _, _, _, _, _]
//     ^                       ^
//  pos=1                  cap=10, lim=10`
    },
    {
      title: 'Direct vs Heap Buffers',
      icon: <Layers className="w-5 h-5" />,
      content: `Direct and heap buffers have different performance characteristics.

Heap Buffer (allocate):
• Backed by Java byte[]
• Subject to GC
• May require copying for I/O
• Faster allocation

Direct Buffer (allocateDirect):
• Native memory (off-heap)
• Not subject to GC (uses Cleaner)
• Zero-copy I/O possible
• Slower allocation, reuse them!

When to use Direct:
• Long-lived buffers
• Large I/O operations
• Memory-mapped files`,
      code: `// Heap buffer
ByteBuffer heap = ByteBuffer.allocate(1024);
heap.hasArray();  // true
byte[] backing = heap.array();  // Get backing array

// Direct buffer
ByteBuffer direct = ByteBuffer.allocateDirect(1024);
direct.hasArray();  // false
// direct.array();  // UnsupportedOperationException!

// Why direct buffers for I/O?
// Heap buffer I/O:
// 1. JVM copies from heap array to native memory
// 2. OS reads from native memory
// 3. Two copies!

// Direct buffer I/O:
// 1. OS reads directly from native memory
// 2. One copy!

// Memory layout
// Heap buffer:
// [Java Heap]
//    └── byte[] ← ByteBuffer points here
//
// Direct buffer:
// [Native Memory] ← ByteBuffer points here
// (Not in Java heap, managed by Cleaner)

// Direct buffer lifecycle
DirectByteBuffer dbuf = (DirectByteBuffer)
    ByteBuffer.allocateDirect(1024);
// Uses jdk.internal.ref.Cleaner for deallocation
// When dbuf becomes unreachable, Cleaner frees native memory

// Best practice: pool direct buffers
class BufferPool {
    private final Queue<ByteBuffer> pool = new ConcurrentLinkedQueue<>();
    private final int bufferSize;

    ByteBuffer acquire() {
        ByteBuffer buf = pool.poll();
        if (buf == null) {
            buf = ByteBuffer.allocateDirect(bufferSize);
        }
        return buf;
    }

    void release(ByteBuffer buf) {
        buf.clear();
        pool.offer(buf);
    }
}`
    },
    {
      title: 'Channels and Selectors',
      icon: <Radio className="w-5 h-5" />,
      content: `Channels are bi-directional I/O streams. Selectors multiplex channel events.

Channel types:
• FileChannel: File I/O
• SocketChannel: TCP client
• ServerSocketChannel: TCP server
• DatagramChannel: UDP

Selector:
• Monitors multiple channels
• Notifies when channels are ready
• Uses OS-level polling (epoll, kqueue)

Selection Keys:
• OP_ACCEPT: Server can accept
• OP_CONNECT: Client connected
• OP_READ: Data available to read
• OP_WRITE: Channel ready for write`,
      code: `// Selector-based server
public class NioServer {
    public static void main(String[] args) throws IOException {
        Selector selector = Selector.open();

        ServerSocketChannel serverChannel = ServerSocketChannel.open();
        serverChannel.bind(new InetSocketAddress(8080));
        serverChannel.configureBlocking(false);
        serverChannel.register(selector, SelectionKey.OP_ACCEPT);

        while (true) {
            // Block until at least one channel ready
            selector.select();

            Iterator<SelectionKey> iter =
                selector.selectedKeys().iterator();

            while (iter.hasNext()) {
                SelectionKey key = iter.next();
                iter.remove();

                if (key.isAcceptable()) {
                    // New connection
                    ServerSocketChannel server =
                        (ServerSocketChannel) key.channel();
                    SocketChannel client = server.accept();
                    client.configureBlocking(false);
                    client.register(selector, SelectionKey.OP_READ);
                }

                if (key.isReadable()) {
                    // Data available
                    SocketChannel client =
                        (SocketChannel) key.channel();
                    ByteBuffer buffer = ByteBuffer.allocate(1024);
                    int bytesRead = client.read(buffer);

                    if (bytesRead == -1) {
                        // Connection closed
                        key.cancel();
                        client.close();
                    } else {
                        buffer.flip();
                        // Process data...
                        // Register for write if response needed
                        key.interestOps(SelectionKey.OP_WRITE);
                    }
                }

                if (key.isWritable()) {
                    SocketChannel client =
                        (SocketChannel) key.channel();
                    ByteBuffer response = (ByteBuffer) key.attachment();
                    client.write(response);
                    if (!response.hasRemaining()) {
                        key.interestOps(SelectionKey.OP_READ);
                    }
                }
            }
        }
    }
}`
    },
    {
      title: 'Memory-Mapped Files',
      icon: <FileText className="w-5 h-5" />,
      content: `Memory-mapped files map file contents directly to memory.

Benefits:
• OS handles caching
• Zero-copy file I/O
• Random access to large files
• Shared memory between processes

Use cases:
• Large file processing
• Database implementations
• Inter-process communication
• Read-only shared data`,
      code: `// Memory-mapped file
RandomAccessFile file = new RandomAccessFile("data.bin", "rw");
FileChannel channel = file.getChannel();

// Map file region to memory
MappedByteBuffer mmap = channel.map(
    FileChannel.MapMode.READ_WRITE,
    0,              // position
    channel.size()  // size
);

// Read/write as if it's a ByteBuffer
mmap.putInt(0, 42);      // Write at position 0
int value = mmap.getInt(0);  // Read from position 0

// Changes are automatically persisted (eventually)
// Force immediate write:
mmap.force();

// Map modes
FileChannel.MapMode.READ_ONLY    // Read-only access
FileChannel.MapMode.READ_WRITE   // Read-write access
FileChannel.MapMode.PRIVATE      // Copy-on-write

// Large file processing
try (FileChannel fc = FileChannel.open(
        Paths.get("huge.bin"), StandardOpenOption.READ)) {

    long size = fc.size();
    long position = 0;
    int chunkSize = 1024 * 1024;  // 1MB chunks

    while (position < size) {
        long remaining = size - position;
        int mapSize = (int) Math.min(chunkSize, remaining);

        MappedByteBuffer chunk = fc.map(
            FileChannel.MapMode.READ_ONLY,
            position,
            mapSize
        );

        processChunk(chunk);
        position += mapSize;
    }
}

// Shared memory between processes
// Process 1:
MappedByteBuffer shared = channel.map(
    FileChannel.MapMode.READ_WRITE, 0, 1024);
shared.putInt(0, 123);

// Process 2 (same file):
MappedByteBuffer shared = channel.map(
    FileChannel.MapMode.READ_WRITE, 0, 1024);
int value = shared.getInt(0);  // Reads 123`
    },
    {
      title: 'Interview Questions',
      icon: <Settings className="w-5 h-5" />,
      content: `Common Java NIO interview questions:

Q1: NIO vs IO?
A: NIO is buffer-based, non-blocking; IO is stream-based, blocking

Q2: Direct vs heap buffer?
A: Direct is native memory, zero-copy; Heap is Java array, GC'd

Q3: What does flip() do?
A: Sets limit=position, position=0 for reading

Q4: What is a Selector?
A: Multiplexes I/O events from multiple channels

Q5: When to use memory-mapped files?
A: Large files, random access, shared memory`,
      code: `// Q1: Key differences
// IO: InputStream.read() blocks
// NIO: channel.read() can be non-blocking

// Q2: Buffer choice
// Short-lived, small: allocate() (heap)
// Long-lived, large, I/O: allocateDirect()

// Q3: flip() operation
buffer.flip();
// Same as:
// buffer.limit(buffer.position());
// buffer.position(0);

// Q4: Selector events
SelectionKey.OP_ACCEPT   // Server: new connection
SelectionKey.OP_CONNECT  // Client: connection established
SelectionKey.OP_READ     // Data ready to read
SelectionKey.OP_WRITE    // Ready to write

// Q5: Memory-mapped advantages
// - OS caches automatically
// - Random access without seeking
// - Shared between processes

// Q6: Buffer methods
buf.clear();    // pos=0, lim=cap (reset for write)
buf.flip();     // lim=pos, pos=0 (switch to read)
buf.rewind();   // pos=0 (re-read)
buf.compact();  // Move unread to start

// Q7: Common mistakes
// Forgetting to flip before read
buffer.put(data);
// buffer.flip();  // MISSING!
channel.write(buffer);  // Writes nothing!

// Not clearing selectedKeys
selector.select();
for (SelectionKey key : selector.selectedKeys()) {
    // ... handle key ...
}
selector.selectedKeys().clear();  // IMPORTANT!

// Q8: Scatter/Gather I/O
ByteBuffer[] buffers = { header, body };
channel.read(buffers);   // Scatter: fills header, then body
channel.write(buffers);  // Gather: writes header, then body`
    }
  ];

  return (
    <div className={`min-h-screen ${colors.background}`}>
      <div className="max-w-6xl mx-auto p-6">
        <Breadcrumb section={{ name: 'My Projects', icon: '💼', onClick: onBack }}
          category={{ name: 'Java Internals', onClick: onBack }} topic="Java NIO" />
        <div className="flex items-center gap-3 mt-4">
          <button ref={backButtonRef} onClick={onBack}
            className={`flex items-center gap-2 px-4 py-2 ${colors.buttonBg} text-white rounded-lg transition-all duration-200 hover:scale-105`}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-2">
            <Radio className={`w-8 h-8 ${colors.accent}`} />
            <h1 className={`text-3xl font-bold ${colors.heading}`}>Java NIO - Internal Workings</h1>
          </div>
          <p className={`text-lg ${colors.secondary} mb-6`}>
            Deep dive into Java NIO: buffers, channels, selectors, and memory-mapped files.
          </p>

          <div className={`${colors.card} rounded-xl p-4 mb-6 border ${colors.border}`}>
            <h3 className={`font-semibold ${colors.heading} mb-2`}>NIO Architecture</h3>
            <pre className={`text-sm ${colors.secondary} font-mono whitespace-pre overflow-x-auto`}>
{`Traditional IO:                    Java NIO:
┌──────────┐                      ┌──────────────────────────────┐
│ Thread 1 │──→ Connection 1      │         Selector             │
├──────────┤                      │   ┌───────────────────┐      │
│ Thread 2 │──→ Connection 2      │   │ Channel 1 (ready) │──────┤
├──────────┤                      │   │ Channel 2         │      │
│ Thread 3 │──→ Connection 3      │   │ Channel 3 (ready) │──────┤
├──────────┤                      │   │ Channel 4         │      │
│    ...   │                      │   │    ...            │      │ Single
├──────────┤                      │   └───────────────────┘      │ Thread
│ Thread N │──→ Connection N      └──────────────────────────────┘
└──────────┘
One thread per connection          One thread, many connections

ByteBuffer State:
┌───────────────────────────────────────────────────┐
│ [H][e][l][l][o][ ][ ][ ][ ][ ]                    │
│  0  1  2  3  4  5  6  7  8  9                     │
│           ↑              ↑                    ↑   │
│        position        limit              capacity│
└───────────────────────────────────────────────────┘`}
            </pre>
          </div>

          <div className="space-y-4">
            {sections.map((section, index) => (
              <div key={index} className={`${colors.card} rounded-xl border ${colors.border} overflow-hidden`}>
                <button onClick={() => toggleSection(index)}
                  className={`w-full flex items-center justify-between p-4 ${colors.cardHover} transition-colors duration-200`}>
                  <div className="flex items-center gap-3">
                    <span className={colors.accent}>{section.icon}</span>
                    <span className={`font-semibold ${colors.heading}`}>{section.title}</span>
                  </div>
                  {expandedSections[index] ? <ChevronDown className={`w-5 h-5 ${colors.secondary}`} /> : <ChevronRight className={`w-5 h-5 ${colors.secondary}`} />}
                </button>
                {expandedSections[index] && (
                  <div className="p-4 pt-0">
                    <div className={`${colors.secondary} whitespace-pre-line mb-4`}>{section.content}</div>
                    {section.code && (
                      <div className="relative">
                        <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded ${colors.tag}`}>Java</div>
                        <pre className={`${colors.codeBg} rounded-lg p-4 overflow-x-auto text-sm`}>
                          <code className="font-mono" dangerouslySetInnerHTML={{ __html: highlightCode(section.code) }} />
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JavaNIOInternals;

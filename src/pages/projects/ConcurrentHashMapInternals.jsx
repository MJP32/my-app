import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, Code, ArrowLeft, Layers, Zap, Lock, Shield, GitBranch, Cpu, Hash, Box } from 'lucide-react';
import { KEYS } from '../../utils/keyboardNavigation.js';
import Breadcrumb from '../../components/Breadcrumb';
import { useTheme } from '../../contexts/ThemeContext';

const highlightCode = (code) => {
  code = code
    .replace(/<\s*(?:span|font)[^>]*>/gi, '')
    .replace(/<\s*\/\s*(?:span|font)\s*>/gi, '')
    .replace(/\s*(?:style|color|bgcolor)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');

  let highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const placeholders = [];
  const store = (html) => {
    placeholders.push(html);
    return `___P${placeholders.length - 1}___`;
  };

  highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, (m) => store(`<span class="token comment">${m}</span>`));
  highlighted = highlighted.replace(/\/\/.*$/gm, (m) => store(`<span class="token comment">${m}</span>`));
  highlighted = highlighted.replace(/"(?:\\.|[^"\\])*"/g, (m) => store(`<span class="token string">${m}</span>`));
  highlighted = highlighted.replace(/'(?:\\.|[^'\\])+'/g, (m) => store(`<span class="token char">${m}</span>`));
  highlighted = highlighted.replace(/@\w+/g, (m) => store(`<span class="token annotation">${m}</span>`));
  highlighted = highlighted.replace(/\b\d+(?:\.\d+)?\b/g, (m) => store(`<span class="token number">${m}</span>`));
  highlighted = highlighted.replace(/\b(true|false|null)\b/g, (m) => store(`<span class="token boolean">${m}</span>`));

  const keywords = 'abstract assert boolean break byte case catch char class const continue default do double else enum export extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try var void volatile while';
  const kwRegex = new RegExp('\\b(' + keywords.trim().split(/\\s+/).join('|') + ')\\b', 'g');
  highlighted = highlighted.replace(kwRegex, (m) => store(`<span class="token keyword">${m}</span>`));
  highlighted = highlighted.replace(/\b([A-Z][A-Za-z0-9_]*)\b/g, (m) => store(`<span class="token class-name">${m}</span>`));
  highlighted = highlighted.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, (m) => store(`<span class="token function">${m}</span>`));
  highlighted = highlighted.replace(/([{}()[\];,.<>+\-*/=%!:|&^~?]+)/g, (m) => `<span class="token punctuation">${m}</span>`);
  highlighted = highlighted.replace(/___P(\d+)___/g, (_, n) => placeholders[Number(n)]);

  return highlighted;
};

const ConcurrentHashMapInternals = ({ onBack, breadcrumb }) => {
  const { colors } = useTheme();
  const [expandedSections, setExpandedSections] = useState({ 0: true });
  const backButtonRef = useRef(null);

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

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
      title: 'Why ConcurrentHashMap?',
      icon: <Zap className="w-5 h-5" />,
      content: `ConcurrentHashMap provides thread-safe operations without locking the entire map, enabling high concurrent throughput.

Problems with alternatives:

HashMap:
• Not thread-safe at all
• Concurrent modifications cause infinite loops or data corruption

Hashtable:
• Synchronized on every method (entire table locked)
• Only one thread can access at a time - poor performance

Collections.synchronizedMap():
• Same as Hashtable - global lock
• Iteration still requires external synchronization

ConcurrentHashMap advantages:
• Lock-free reads (volatile + CAS)
• Fine-grained locking for writes (per-bucket)
• No locking for most read operations
• Allows concurrent reads AND writes
• Weakly consistent iterators (no ConcurrentModificationException)`,
      code: `// HashMap - NOT thread-safe (DO NOT USE in concurrent code)
Map<String, Integer> hashMap = new HashMap<>();
// Multiple threads accessing = DATA CORRUPTION!

// Hashtable - Thread-safe but SLOW (global lock)
Map<String, Integer> hashtable = new Hashtable<>();
// synchronized on EVERY operation - one thread at a time

// synchronizedMap - Same problem as Hashtable
Map<String, Integer> syncMap = Collections.synchronizedMap(new HashMap<>());
// Still uses global lock

// ConcurrentHashMap - Thread-safe AND FAST
ConcurrentHashMap<String, Integer> concurrentMap = new ConcurrentHashMap<>();
// Lock-free reads, fine-grained write locks
// Multiple threads can read/write SIMULTANEOUSLY

// Performance comparison (approximate):
// HashMap:           100% (but not thread-safe)
// Hashtable:         15-25% of HashMap
// synchronizedMap:   15-25% of HashMap
// ConcurrentHashMap: 80-95% of HashMap (with multiple threads)`
    },
    {
      title: 'Evolution: Java 7 vs Java 8+',
      icon: <GitBranch className="w-5 h-5" />,
      content: `ConcurrentHashMap's implementation changed dramatically in Java 8.

Java 7 (Segment-based):
• Array of Segments, each with its own lock
• Default 16 segments = 16 concurrent writers max
• Each Segment is like a mini-HashMap
• Reads don't need locks (volatile reads)
• Writes lock only the affected Segment

Java 8+ (Node-based with CAS):
• No more Segments - simpler design
• Lock per bucket (finer granularity)
• Uses CAS (Compare-And-Swap) for many operations
• Synchronized blocks only when necessary
• Trees for long chains (like HashMap)
• Better scalability with many threads`,
      code: `// Java 7 Structure (Segment-based)
class ConcurrentHashMap_Java7<K,V> {
    final Segment<K,V>[] segments;  // Default 16 segments

    static class Segment<K,V> extends ReentrantLock {
        transient volatile HashEntry<K,V>[] table;
        transient int count;
    }

    // Concurrency level = number of segments
    // Max 16 concurrent writers by default
}

// Java 8+ Structure (Node-based)
class ConcurrentHashMap_Java8<K,V> {
    transient volatile Node<K,V>[] table;  // Single array
    // No segments! Lock per bucket using synchronized + CAS

    // Node structure (similar to HashMap)
    static class Node<K,V> {
        final int hash;
        final K key;
        volatile V val;      // volatile for visibility
        volatile Node<K,V> next;
    }

    // TreeNode for long chains (threshold = 8)
    static final class TreeNode<K,V> extends Node<K,V> {
        TreeNode<K,V> parent;
        TreeNode<K,V> left;
        TreeNode<K,V> right;
        TreeNode<K,V> prev;
        boolean red;
    }
}`
    },
    {
      title: 'Internal Data Structure (Java 8+)',
      icon: <Box className="w-5 h-5" />,
      content: `Java 8+ ConcurrentHashMap uses a Node array with special node types:

Node Types:
1. Node - Regular linked list node
2. TreeNode - Red-black tree node (when chain >= 8)
3. ForwardingNode - Indicates bucket is being transferred (resize)
4. ReservationNode - Placeholder during computeIfAbsent

Key Fields:
• table: The main Node array (volatile)
• sizeCtl: Controls initialization and resizing
  - Negative: table being initialized/resized
  - Positive: next resize threshold
• baseCount + counterCells: For size() calculation`,
      code: `public class ConcurrentHashMap<K,V> {
    // Main array - volatile for visibility
    transient volatile Node<K,V>[] table;

    // Next table during resize
    private transient volatile Node<K,V>[] nextTable;

    // Size control:
    // -1: initializing
    // -(1 + number of resizing threads): resizing
    // 0: default, use DEFAULT_CAPACITY
    // >0: next resize threshold
    private transient volatile int sizeCtl;

    // Size tracking (distributed counters for scalability)
    private transient volatile long baseCount;
    private transient volatile CounterCell[] counterCells;

    // Special hash values
    static final int MOVED     = -1; // ForwardingNode
    static final int TREEBIN   = -2; // TreeBin root
    static final int RESERVED  = -3; // ReservationNode

    // Constants
    static final int DEFAULT_CAPACITY = 16;
    static final float LOAD_FACTOR = 0.75f;
    static final int TREEIFY_THRESHOLD = 8;
    static final int UNTREEIFY_THRESHOLD = 6;
    static final int MIN_TREEIFY_CAPACITY = 64;

    // Hash spread function
    static final int spread(int h) {
        return (h ^ (h >>> 16)) & HASH_BITS;  // HASH_BITS = 0x7fffffff
    }
}`
    },
    {
      title: 'get() Operation - Lock-Free',
      icon: <Zap className="w-5 h-5" />,
      content: `The get() operation is completely lock-free, using volatile reads for thread-safety.

How it works:
1. Calculate hash using spread() function
2. Get table reference (volatile read)
3. Find bucket using tabAt() - volatile array access
4. If bucket is TreeBin, use tree search
5. Otherwise, traverse linked list
6. Return value or null

Why no locks needed:
• table is volatile - always see latest reference
• Node.val and Node.next are volatile
• Writes ensure happens-before relationship
• Worst case: see slightly stale data (acceptable for most uses)`,
      code: `public V get(Object key) {
    Node<K,V>[] tab; Node<K,V> e, p; int n, eh; K ek;

    // Spread hash to use high bits
    int h = spread(key.hashCode());

    // Volatile read of table
    if ((tab = table) != null && (n = tab.length) > 0 &&
        (e = tabAt(tab, (n - 1) & h)) != null) {  // tabAt = volatile read

        // Check first node
        if ((eh = e.hash) == h) {
            if ((ek = e.key) == key || (ek != null && key.equals(ek)))
                return e.val;  // volatile read of val
        }
        // Negative hash = special node (tree or forwarding)
        else if (eh < 0)
            return (p = e.find(h, key)) != null ? p.val : null;

        // Traverse linked list
        while ((e = e.next) != null) {  // volatile read of next
            if (e.hash == h &&
                ((ek = e.key) == key || (ek != null && key.equals(ek))))
                return e.val;
        }
    }
    return null;
}

// Volatile array access using Unsafe
@SuppressWarnings("unchecked")
static final <K,V> Node<K,V> tabAt(Node<K,V>[] tab, int i) {
    return (Node<K,V>)U.getObjectVolatile(tab, ((long)i << ASHIFT) + ABASE);
}`
    },
    {
      title: 'put() Operation - CAS + Synchronized',
      icon: <Lock className="w-5 h-5" />,
      content: `The put() operation uses a combination of CAS and synchronized for efficiency.

Strategy:
1. If bucket is empty: use CAS to insert (no lock)
2. If bucket has nodes: synchronized on first node
3. If resizing in progress: help with resize first

This ensures:
• Empty buckets: lock-free insertion via CAS
• Existing buckets: only lock that specific bucket
• No global lock ever needed
• Multiple threads can write to different buckets simultaneously`,
      code: `public V put(K key, V value) {
    return putVal(key, value, false);
}

final V putVal(K key, V value, boolean onlyIfAbsent) {
    if (key == null || value == null) throw new NullPointerException();
    int hash = spread(key.hashCode());
    int binCount = 0;

    for (Node<K,V>[] tab = table;;) {
        Node<K,V> f; int n, i, fh;

        // Table not initialized - initialize it
        if (tab == null || (n = tab.length) == 0)
            tab = initTable();

        // Empty bucket - CAS to insert (NO LOCK!)
        else if ((f = tabAt(tab, i = (n - 1) & hash)) == null) {
            if (casTabAt(tab, i, null, new Node<K,V>(hash, key, value, null)))
                break;  // CAS succeeded, done
            // CAS failed = another thread inserted, retry loop
        }

        // Bucket being moved (resize in progress)
        else if ((fh = f.hash) == MOVED)
            tab = helpTransfer(tab, f);  // Help resize, then retry

        // Bucket has nodes - synchronized on first node
        else {
            V oldVal = null;
            synchronized (f) {  // Lock ONLY this bucket!
                if (tabAt(tab, i) == f) {  // Double-check
                    if (fh >= 0) {  // Linked list
                        binCount = 1;
                        for (Node<K,V> e = f;; ++binCount) {
                            K ek;
                            if (e.hash == hash &&
                                ((ek = e.key) == key ||
                                 (ek != null && key.equals(ek)))) {
                                oldVal = e.val;
                                if (!onlyIfAbsent)
                                    e.val = value;
                                break;
                            }
                            Node<K,V> pred = e;
                            if ((e = e.next) == null) {
                                pred.next = new Node<K,V>(hash, key, value, null);
                                break;
                            }
                        }
                    }
                    else if (f instanceof TreeBin) {  // Tree
                        Node<K,V> p;
                        binCount = 2;
                        if ((p = ((TreeBin<K,V>)f).putTreeVal(hash, key, value)) != null) {
                            oldVal = p.val;
                            if (!onlyIfAbsent)
                                p.val = value;
                        }
                    }
                }
            }
            if (binCount != 0) {
                if (binCount >= TREEIFY_THRESHOLD)
                    treeifyBin(tab, i);  // Convert to tree
                if (oldVal != null)
                    return oldVal;
                break;
            }
        }
    }
    addCount(1L, binCount);  // Update size counter
    return null;
}`
    },
    {
      title: 'Size Counting - Distributed Counters',
      icon: <Cpu className="w-5 h-5" />,
      content: `Maintaining an accurate count in a concurrent map is challenging. ConcurrentHashMap uses distributed counters for scalability.

The Problem:
• Single counter = contention point
• Every put/remove must update the same variable
• CAS failures slow down all threads

The Solution (LongAdder-like):
• baseCount: main counter, updated with CAS
• counterCells[]: array of counters for contention
• Each thread updates different cell to reduce contention
• size() = baseCount + sum(counterCells)

This is similar to how LongAdder works - spreading updates across multiple cells.`,
      code: `// Size tracking fields
private transient volatile long baseCount;
private transient volatile CounterCell[] counterCells;

@sun.misc.Contended  // Prevent false sharing
static final class CounterCell {
    volatile long value;
    CounterCell(long x) { value = x; }
}

// Called after put/remove
private final void addCount(long x, int check) {
    CounterCell[] as; long b, s;

    // Try CAS on baseCount first
    if ((as = counterCells) != null ||
        !U.compareAndSwapLong(this, BASECOUNT, b = baseCount, s = b + x)) {

        // CAS failed or counterCells exist - use cell
        CounterCell a; long v; int m;
        boolean uncontended = true;

        // Try to update a random cell
        if (as == null || (m = as.length - 1) < 0 ||
            (a = as[ThreadLocalRandom.getProbe() & m]) == null ||
            !(uncontended = U.compareAndSwapLong(a, CELLVALUE, v = a.value, v + x))) {
            fullAddCount(x, uncontended);  // Handle contention
            return;
        }
        if (check <= 1)
            return;
        s = sumCount();
    }
    // Check if resize needed...
}

// Calculate total size
final long sumCount() {
    CounterCell[] as = counterCells; CounterCell a;
    long sum = baseCount;
    if (as != null) {
        for (int i = 0; i < as.length; ++i) {
            if ((a = as[i]) != null)
                sum += a.value;
        }
    }
    return sum;
}

public int size() {
    long n = sumCount();
    return ((n < 0L) ? 0 :
            (n > (long)Integer.MAX_VALUE) ? Integer.MAX_VALUE : (int)n);
}`
    },
    {
      title: 'Resizing - Concurrent Transfer',
      icon: <Layers className="w-5 h-5" />,
      content: `Resizing in ConcurrentHashMap is parallelized - multiple threads can help transfer buckets.

How it works:
1. One thread initiates resize, creates nextTable (2x size)
2. Sets transferIndex to indicate work range
3. Other threads encountering MOVED nodes help transfer
4. Each helper claims a chunk of buckets to transfer
5. After transfer, bucket marked with ForwardingNode
6. When all buckets transferred, nextTable becomes table

ForwardingNode:
• Special node with hash = MOVED (-1)
• Points to nextTable
• Signals "this bucket already moved"
• get() on ForwardingNode forwards to nextTable`,
      code: `// Resize initiated when size > threshold
private final void transfer(Node<K,V>[] tab, Node<K,V>[] nextTab) {
    int n = tab.length, stride;

    // Divide work into chunks (stride)
    if ((stride = (NCPU > 1) ? (n >>> 3) / NCPU : n) < MIN_TRANSFER_STRIDE)
        stride = MIN_TRANSFER_STRIDE;

    // Initialize nextTable if needed
    if (nextTab == null) {
        Node<K,V>[] nt = new Node[n << 1];  // Double size
        nextTab = nt;
        nextTable = nextTab;
        transferIndex = n;  // Start from end
    }

    int nextn = nextTab.length;
    ForwardingNode<K,V> fwd = new ForwardingNode<K,V>(nextTab);
    boolean advance = true;
    boolean finishing = false;

    // Claim and transfer buckets
    for (int i = 0, bound = 0;;) {
        Node<K,V> f; int fh;

        // Claim next chunk of buckets
        while (advance) {
            int nextIndex, nextBound;
            if (--i >= bound || finishing)
                advance = false;
            else if ((nextIndex = transferIndex) <= 0) {
                i = -1;
                advance = false;
            }
            else if (U.compareAndSwapInt(this, TRANSFERINDEX, nextIndex,
                      nextBound = (nextIndex > stride ? nextIndex - stride : 0))) {
                bound = nextBound;
                i = nextIndex - 1;
                advance = false;
            }
        }

        // Check if done
        if (i < 0 || i >= n || i + n >= nextn) {
            // ... finishing logic
        }

        // Empty bucket - mark as forwarding
        else if ((f = tabAt(tab, i)) == null)
            advance = casTabAt(tab, i, null, fwd);

        // Already forwarded
        else if ((fh = f.hash) == MOVED)
            advance = true;

        // Transfer this bucket
        else {
            synchronized (f) {
                // ... transfer nodes to nextTable
                // Split into low and high lists (like HashMap)
                setTabAt(nextTab, i, ln);      // Low list
                setTabAt(nextTab, i + n, hn);  // High list
                setTabAt(tab, i, fwd);         // Mark as moved
                advance = true;
            }
        }
    }
}

// ForwardingNode - points to nextTable
static final class ForwardingNode<K,V> extends Node<K,V> {
    final Node<K,V>[] nextTable;
    ForwardingNode(Node<K,V>[] tab) {
        super(MOVED, null, null, null);  // hash = MOVED = -1
        this.nextTable = tab;
    }

    // Forward find to nextTable
    Node<K,V> find(int h, Object k) {
        // ... search in nextTable
    }
}`
    },
    {
      title: 'Atomic Operations',
      icon: <Shield className="w-5 h-5" />,
      content: `ConcurrentHashMap provides atomic compound operations that are thread-safe.

These operations are essential because:
• Check-then-act patterns are NOT atomic with get()/put()
• Without these, you need external synchronization
• They use internal locking efficiently

Key atomic methods:
• putIfAbsent(key, value) - put only if key not present
• remove(key, value) - remove only if value matches
• replace(key, oldValue, newValue) - replace only if old matches
• computeIfAbsent(key, function) - compute if missing
• computeIfPresent(key, function) - compute if present
• merge(key, value, function) - merge with existing`,
      code: `// WRONG - Race condition!
if (!map.containsKey(key)) {
    map.put(key, value);  // Another thread may have inserted!
}

// CORRECT - Atomic operation
map.putIfAbsent(key, value);

// WRONG - Race condition!
V oldValue = map.get(key);
if (expectedValue.equals(oldValue)) {
    map.put(key, newValue);  // Another thread may have changed!
}

// CORRECT - Atomic operation
map.replace(key, expectedValue, newValue);

// computeIfAbsent - great for caching
ConcurrentHashMap<String, ExpensiveObject> cache = new ConcurrentHashMap<>();

ExpensiveObject obj = cache.computeIfAbsent(key, k -> {
    // This function runs ONLY if key is absent
    // And it's atomic - no duplicate computation
    return new ExpensiveObject(k);
});

// merge - atomic read-modify-write
ConcurrentHashMap<String, Integer> wordCount = new ConcurrentHashMap<>();

// Count word occurrences atomically
for (String word : words) {
    wordCount.merge(word, 1, Integer::sum);
    // If absent: put(word, 1)
    // If present: put(word, oldValue + 1)
}

// compute - general atomic update
map.compute(key, (k, v) -> {
    if (v == null) return initialValue;
    return v.transform();  // Transform existing value
});`
    },
    {
      title: 'Interview Questions',
      icon: <Hash className="w-5 h-5" />,
      content: `Common ConcurrentHashMap interview questions:

Q1: ConcurrentHashMap vs Hashtable?
A: CHM uses fine-grained locking (per-bucket), Hashtable locks entire map. CHM allows concurrent reads/writes, Hashtable allows only one thread.

Q2: Why no null keys/values?
A: Ambiguity - can't distinguish "key not found" from "value is null". In concurrent context, this matters for putIfAbsent/computeIfAbsent.

Q3: Is size() accurate?
A: It's an estimate during concurrent modifications. Uses distributed counters (baseCount + counterCells) for scalability.

Q4: What's the default concurrency level in Java 8+?
A: No fixed concurrency level. Lock granularity is per-bucket, so it scales with table size.

Q5: Can iterators throw ConcurrentModificationException?
A: No. Iterators are weakly consistent - they may or may not reflect concurrent modifications.`,
      code: `// Q6: Why is this code wrong?
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();

// WRONG - Not atomic!
Integer value = map.get(key);
if (value == null) {
    map.put(key, 1);
} else {
    map.put(key, value + 1);
}

// CORRECT - Atomic
map.merge(key, 1, Integer::sum);
// OR
map.compute(key, (k, v) -> v == null ? 1 : v + 1);

// Q7: How to iterate safely?
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();

// Safe - weakly consistent iterator
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
    // May see concurrent updates, may not
}

// Also safe - forEach with lambda
map.forEach((key, value) -> {
    System.out.println(key + ": " + value);
});

// Q8: HashMap vs ConcurrentHashMap performance?
// Single-threaded: HashMap is faster (no synchronization overhead)
// Multi-threaded reads: CHM nearly as fast (lock-free reads)
// Multi-threaded writes: CHM much faster than synchronized alternatives

// Q9: When NOT to use ConcurrentHashMap?
// - Single-threaded code (use HashMap)
// - Need null keys/values (use Collections.synchronizedMap)
// - Need consistent iteration snapshot (use synchronized block)
// - Need atomic operations spanning multiple keys (need external lock)`
    }
  ];

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: colors.background }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            ref={backButtonRef}
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: colors.card,
              color: colors.primary
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
{breadcrumb && <Breadcrumb breadcrumb={breadcrumb} />}
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: colors.text }}>
            ConcurrentHashMap - Internal Workings
          </h1>
          <p className="text-lg" style={{ color: colors.textSecondary }}>
            Deep dive into Java's thread-safe high-performance Map - essential for concurrency interviews
          </p>
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Thread Safe', value: 'Yes' },
            { label: 'Null Keys/Values', value: 'No' },
            { label: 'Read Locking', value: 'None (CAS)' },
            { label: 'Write Locking', value: 'Per-Bucket' }
          ].map((fact, i) => (
            <div
              key={i}
              className="p-4 rounded-lg text-center"
              style={{ backgroundColor: colors.card }}
            >
              <div className="text-xl font-bold" style={{ color: colors.primary }}>
                {fact.value}
              </div>
              <div className="text-sm" style={{ color: colors.textSecondary }}>
                {fact.label}
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-8 p-4 rounded-lg overflow-x-auto" style={{ backgroundColor: colors.card }}>
          <h3 className="text-lg font-bold mb-3" style={{ color: colors.text }}>
            Comparison: Thread-Safe Map Options
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                <th className="text-left p-2" style={{ color: colors.text }}>Feature</th>
                <th className="text-left p-2" style={{ color: colors.text }}>HashMap</th>
                <th className="text-left p-2" style={{ color: colors.text }}>Hashtable</th>
                <th className="text-left p-2" style={{ color: colors.text }}>synchronizedMap</th>
                <th className="text-left p-2" style={{ color: colors.text }}>ConcurrentHashMap</th>
              </tr>
            </thead>
            <tbody style={{ color: colors.textSecondary }}>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                <td className="p-2 font-medium">Thread-safe</td>
                <td className="p-2 text-red-400">No</td>
                <td className="p-2 text-green-400">Yes</td>
                <td className="p-2 text-green-400">Yes</td>
                <td className="p-2 text-green-400">Yes</td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                <td className="p-2 font-medium">Locking</td>
                <td className="p-2">None</td>
                <td className="p-2">Global</td>
                <td className="p-2">Global</td>
                <td className="p-2 text-green-400">Per-bucket</td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                <td className="p-2 font-medium">Null key/value</td>
                <td className="p-2 text-green-400">Yes</td>
                <td className="p-2 text-red-400">No</td>
                <td className="p-2 text-green-400">Yes</td>
                <td className="p-2 text-red-400">No</td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                <td className="p-2 font-medium">Concurrent perf</td>
                <td className="p-2">N/A</td>
                <td className="p-2 text-red-400">Poor</td>
                <td className="p-2 text-red-400">Poor</td>
                <td className="p-2 text-green-400">Excellent</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">Iterator behavior</td>
                <td className="p-2">Fail-fast</td>
                <td className="p-2">Fail-fast</td>
                <td className="p-2">Fail-fast</td>
                <td className="p-2">Weakly consistent</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden"
              style={{ backgroundColor: colors.card }}
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full flex items-center gap-3 p-4 text-left transition-colors hover:opacity-80"
              >
                <span style={{ color: colors.primary }}>{section.icon}</span>
                <span className="flex-1 font-semibold" style={{ color: colors.text }}>
                  {section.title}
                </span>
                {expandedSections[index] ? (
                  <ChevronDown className="w-5 h-5" style={{ color: colors.textSecondary }} />
                ) : (
                  <ChevronRight className="w-5 h-5" style={{ color: colors.textSecondary }} />
                )}
              </button>

              {expandedSections[index] && (
                <div className="px-4 pb-4 border-t" style={{ borderColor: colors.border }}>
                  <div className="mt-4 whitespace-pre-line" style={{ color: colors.textSecondary }}>
                    {section.content}
                  </div>
                  {section.code && (
                    <pre
                      className="mt-4 p-4 rounded-lg overflow-x-auto text-sm"
                      style={{ backgroundColor: colors.background }}
                    >
                      <code
                        dangerouslySetInnerHTML={{ __html: highlightCode(section.code) }}
                        style={{ color: colors.text }}
                      />
                    </pre>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Visual Diagram */}
        <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: colors.card }}>
          <h3 className="text-xl font-bold mb-4" style={{ color: colors.text }}>
            Visual: ConcurrentHashMap Structure (Java 8+)
          </h3>
          <pre
            className="text-xs md:text-sm overflow-x-auto p-4 rounded"
            style={{ backgroundColor: colors.background, color: colors.textSecondary }}
          >
{`ConcurrentHashMap Internal Structure (Java 8+):

table[] (Node array - volatile)
┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
│  0  │  1  │  2  │  3  │  4  │  5  │  6  │  7  │  8  │  9  │ 10  │ 11  │ 12  │ 13  │ 14  │ 15  │
└──┬──┴─────┴──┬──┴─────┴─────┴──┬──┴─────┴─────┴─────┴─────┴──┬──┴─────┴─────┴─────┴──┬──┴─────┘
   │           │                 │                             │                       │
   ▼           ▼                 ▼                             ▼                       ▼
┌──────┐   ┌──────┐         ┌──────┐                      ┌──────────┐            ┌────────┐
│ Node │   │ Node │         │ Node │                      │ TreeBin  │            │Fwd Node│
│ K: A │   │ K: B │         │ K: C │                      │ (>=8     │            │ hash=-1│
│ V: 1 │   │ V: 2 │         │ V: 3 │                      │  nodes)  │            │nextTab→│
│next:─┼─┐ └──────┘         │next:─┼─┐                    └──────────┘            └────────┘
└──────┘ │                  └──────┘ │                          │                      │
         ▼                           ▼                     Red-Black               Points to
     ┌──────┐                    ┌──────┐                    Tree                  nextTable
     │ Node │                    │ Node │                      │                   (resizing)
     │ K: D │                    │ K: E │                      ▼
     │ V: 4 │                    │ V: 5 │                  ┌───────┐
     └──────┘                    └──────┘                  │TreeNode
         ▲                           ▲                     └───┬───┘
         │                           │                     ┌───┴───┐
    Lock-free                   synchronized              ▼       ▼
    CAS insert                  on first node         ┌─────┐ ┌─────┐
    (if empty)                  (if occupied)         │  L  │ │  R  │
                                                      └─────┘ └─────┘

Concurrent Operations:
═════════════════════

  Thread 1              Thread 2              Thread 3              Thread 4
      │                     │                     │                     │
      ▼                     ▼                     ▼                     ▼
  ┌───────┐             ┌───────┐             ┌───────┐             ┌───────┐
  │get(A) │             │put(B) │             │put(C) │             │get(D) │
  │       │             │       │             │       │             │       │
  │LOCK-  │             │CAS on │             │sync on│             │LOCK-  │
  │FREE!  │             │empty  │             │bucket │             │FREE!  │
  │       │             │bucket │             │  5    │             │       │
  └───────┘             └───────┘             └───────┘             └───────┘
      │                     │                     │                     │
      ▼                     ▼                     ▼                     ▼
   No lock              No lock              Lock only              No lock
   needed!              (CAS)                bucket 5!              needed!


Size Counting (Distributed Counters):
═════════════════════════════════════

  ┌──────────────┐
  │  baseCount   │◄─── Try CAS here first
  └──────────────┘
         │
         │ If CAS fails (contention)
         ▼
  ┌──────────────────────────────────────────┐
  │           counterCells[]                  │
  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐     │
  │  │ C0 │ │ C1 │ │ C2 │ │ C3 │ │... │     │
  │  └────┘ └────┘ └────┘ └────┘ └────┘     │
  │    │       │       │       │             │
  │    ▼       ▼       ▼       ▼             │
  │  Thread  Thread  Thread  Thread          │
  │    1       2       3       4             │
  └──────────────────────────────────────────┘

  size() = baseCount + sum(counterCells)`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ConcurrentHashMapInternals;

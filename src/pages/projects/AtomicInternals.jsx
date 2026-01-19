import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, ArrowLeft, Layers, Zap, Cpu, RefreshCw, Shield, AlertTriangle, Settings } from 'lucide-react';
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

const AtomicInternals = ({ onBack, breadcrumb }) => {
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
      title: 'What is CAS?',
      icon: <Zap className="w-5 h-5" />,
      content: `Compare-And-Swap (CAS) is a CPU instruction for lock-free atomic operations.

CAS operation:
1. Read current value
2. Compare with expected value
3. If equal, swap with new value
4. Return success/failure

Key properties:
• Atomic - happens all at once
• Lock-free - no blocking
• Non-blocking - threads don't wait
• Hardware-supported (CPU instruction)

In Java:
• Unsafe.compareAndSwapInt/Long/Object
• VarHandle (Java 9+)
• Atomic classes built on CAS`,
      code: `// CAS pseudo-code
boolean compareAndSwap(address, expectedValue, newValue) {
    // Atomic operation - CPU guarantees
    if (*address == expectedValue) {
        *address = newValue;
        return true;  // Success
    }
    return false;  // Failed - value changed
}

// Java CAS using Unsafe (internal)
public final int getAndIncrement() {
    return U.getAndAddInt(this, VALUE, 1);
}

// Unsafe.getAndAddInt implementation
public final int getAndAddInt(Object o, long offset, int delta) {
    int v;
    do {
        v = getIntVolatile(o, offset);  // Read current
    } while (!compareAndSwapInt(o, offset, v, v + delta));  // CAS loop
    return v;
}

// VarHandle CAS (Java 9+)
VarHandle VH = MethodHandles.lookup()
    .findVarHandle(MyClass.class, "value", int.class);
VH.compareAndSet(this, expectedValue, newValue);`
    },
    {
      title: 'AtomicInteger Internals',
      icon: <Layers className="w-5 h-5" />,
      content: `AtomicInteger provides lock-free atomic operations on int values.

Internal structure:
• volatile int value - ensures visibility
• Uses Unsafe/VarHandle for CAS

Key operations:
• get() - volatile read
• set() - volatile write
• getAndIncrement() - CAS loop
• compareAndSet() - single CAS
• lazySet() - eventual visibility (faster)

All operations are thread-safe without locks!`,
      code: `// AtomicInteger structure
public class AtomicInteger extends Number {
    private static final VarHandle VALUE;
    private volatile int value;

    static {
        VALUE = MethodHandles.lookup()
            .findVarHandle(AtomicInteger.class, "value", int.class);
    }

    public AtomicInteger(int initialValue) {
        value = initialValue;
    }

    // Simple volatile read
    public final int get() {
        return value;
    }

    // Simple volatile write
    public final void set(int newValue) {
        value = newValue;
    }

    // CAS - single attempt
    public final boolean compareAndSet(int expectedValue, int newValue) {
        return VALUE.compareAndSet(this, expectedValue, newValue);
    }

    // CAS loop for increment
    public final int getAndIncrement() {
        return (int) VALUE.getAndAdd(this, 1);
    }

    // Increment and get
    public final int incrementAndGet() {
        return (int) VALUE.getAndAdd(this, 1) + 1;
    }

    // Atomic update with function
    public final int updateAndGet(IntUnaryOperator updateFunction) {
        int prev = get(), next = 0;
        for (boolean haveNext = false;;) {
            if (!haveNext)
                next = updateFunction.applyAsInt(prev);
            if (VALUE.weakCompareAndSet(this, prev, next))
                return next;
            haveNext = (prev == (prev = get()));
        }
    }
}`
    },
    {
      title: 'CAS Loop Pattern',
      icon: <RefreshCw className="w-5 h-5" />,
      content: `CAS may fail if another thread modified the value. Solution: retry loop.

Pattern:
1. Read current value
2. Compute new value
3. CAS (old → new)
4. If failed, goto step 1

This is called optimistic locking:
• Assume no contention
• Retry if wrong

Performance:
• Fast under low contention
• May spin under high contention
• Still better than locks for simple ops`,
      code: `// CAS loop example: atomic increment
public int incrementAndGet() {
    while (true) {
        int current = get();         // 1. Read current
        int next = current + 1;      // 2. Compute new
        if (compareAndSet(current, next))  // 3. Try CAS
            return next;              // Success!
        // Failed - another thread changed value, retry
    }
}

// More complex: atomic multiply
public int multiplyAndGet(int factor) {
    while (true) {
        int current = get();
        int next = current * factor;
        if (compareAndSet(current, next))
            return next;
        // Retry...
    }
}

// Using updateAndGet (cleaner)
AtomicInteger counter = new AtomicInteger(0);
counter.updateAndGet(x -> x * 2);  // Atomic double

// Accumulator pattern
counter.accumulateAndGet(5, (current, delta) -> current + delta);

// CAS can fail scenario:
// Thread 1: read 10
// Thread 2: read 10, CAS 10→11, success
// Thread 1: CAS 10→11 FAILS (value is now 11)
// Thread 1: retry, read 11, CAS 11→12, success`
    },
    {
      title: 'AtomicReference',
      icon: <Shield className="w-5 h-5" />,
      content: `AtomicReference provides CAS for object references.

Use cases:
• Atomic object updates
• Lock-free data structures
• Immutable object swapping

Same CAS pattern as AtomicInteger but for references.

Warning: CAS compares references, not object contents!`,
      code: `// AtomicReference usage
AtomicReference<String> ref = new AtomicReference<>("initial");

// Get current value
String current = ref.get();

// Set new value
ref.set("new value");

// Compare and set
boolean success = ref.compareAndSet("initial", "updated");

// Atomic update
ref.updateAndGet(s -> s.toUpperCase());

// Lock-free stack using AtomicReference
class LockFreeStack<T> {
    private final AtomicReference<Node<T>> head = new AtomicReference<>();

    public void push(T value) {
        Node<T> newNode = new Node<>(value);
        while (true) {
            Node<T> currentHead = head.get();
            newNode.next = currentHead;
            if (head.compareAndSet(currentHead, newNode))
                return;  // Success
        }
    }

    public T pop() {
        while (true) {
            Node<T> currentHead = head.get();
            if (currentHead == null)
                return null;
            if (head.compareAndSet(currentHead, currentHead.next))
                return currentHead.value;
        }
    }
}

// AtomicStampedReference - solves ABA problem
AtomicStampedReference<String> stamped =
    new AtomicStampedReference<>("value", 0);
int[] stampHolder = new int[1];
String value = stamped.get(stampHolder);
stamped.compareAndSet(value, "new", stampHolder[0], stampHolder[0] + 1);`
    },
    {
      title: 'ABA Problem',
      icon: <AlertTriangle className="w-5 h-5" />,
      content: `ABA problem: CAS sees same value but it was changed and changed back.

Scenario:
1. Thread 1 reads A
2. Thread 2 changes A→B→A
3. Thread 1's CAS succeeds (sees A)
4. But state may have changed!

Solutions:
• AtomicStampedReference - version stamp
• AtomicMarkableReference - boolean mark
• Immutable objects (always new reference)`,
      code: `// ABA Problem Example
// Lock-free stack pop:
// Stack: A → B → C

// Thread 1: reads head = A, next = B
// Thread 1: about to CAS(A, B)

// Thread 2: pop A  → Stack: B → C
// Thread 2: pop B  → Stack: C
// Thread 2: push A → Stack: A → C  (A recycled!)

// Thread 1: CAS(A, B) SUCCEEDS! (head is A)
// But now stack is corrupt: A → C → B

// Solution: AtomicStampedReference
AtomicStampedReference<Node> head =
    new AtomicStampedReference<>(initialHead, 0);

public Node pop() {
    while (true) {
        int[] stampHolder = new int[1];
        Node currentHead = head.get(stampHolder);
        int stamp = stampHolder[0];

        if (currentHead == null)
            return null;

        Node newHead = currentHead.next;

        // CAS checks BOTH reference AND stamp
        if (head.compareAndSet(currentHead, newHead,
                                stamp, stamp + 1)) {
            return currentHead;
        }
    }
}

// AtomicMarkableReference - simpler boolean flag
AtomicMarkableReference<Node> ref =
    new AtomicMarkableReference<>(node, false);
boolean[] markHolder = new boolean[1];
Node n = ref.get(markHolder);
ref.compareAndSet(n, newNode, false, true);`
    },
    {
      title: 'LongAdder (High Contention)',
      icon: <Cpu className="w-5 h-5" />,
      content: `LongAdder is optimized for high-contention counting.

Problem with AtomicLong:
• Many threads CAS same variable
• High contention = many retries
• Poor performance

LongAdder solution:
• Striped counters (Cell array)
• Each thread updates different cell
• sum() adds all cells

Performance:
• Much faster under contention
• Slightly slower for single thread
• Uses more memory`,
      code: `// AtomicLong - all threads compete
AtomicLong counter = new AtomicLong();
counter.incrementAndGet();  // CAS contention!

// LongAdder - striped cells
LongAdder adder = new LongAdder();
adder.increment();  // Updates thread's cell
long sum = adder.sum();  // Sum all cells

// LongAdder internal structure
public class LongAdder extends Striped64 {
    // From Striped64:
    transient volatile Cell[] cells;  // Striped counters
    transient volatile long base;     // Base counter

    public void add(long x) {
        Cell[] cs; long b, v; int m; Cell c;
        if ((cs = cells) != null ||
            !casBase(b = base, b + x)) {  // Try base first
            // Contention - use cells
            int index = getProbe() & m;   // Thread's cell
            if ((c = cs[index]) == null ||
                !c.cas(v = c.value, v + x)) {
                longAccumulate(x, null, uncontended);
            }
        }
    }

    public long sum() {
        Cell[] cs = cells;
        long sum = base;
        if (cs != null) {
            for (Cell c : cs)
                if (c != null)
                    sum += c.value;
        }
        return sum;
    }
}

// When to use each:
// AtomicLong: need exact value, low contention
// LongAdder: high contention counting, eventual sum OK`
    },
    {
      title: 'Interview Questions',
      icon: <Settings className="w-5 h-5" />,
      content: `Common atomic/CAS interview questions:

Q1: What is CAS?
A: Compare-And-Swap, atomic CPU instruction

Q2: How does AtomicInteger work?
A: Volatile + CAS loop for atomic updates

Q3: What is the ABA problem?
A: Value changed and reverted, CAS doesn't detect

Q4: AtomicLong vs LongAdder?
A: LongAdder uses striped cells, faster under contention

Q5: Can CAS fail?
A: Yes, if value changed. Use retry loop.

Q6: Why is CAS better than synchronized?
A: Lock-free, no blocking, no context switches`,
      code: `// Q1: CAS demonstration
AtomicInteger ai = new AtomicInteger(5);
boolean success = ai.compareAndSet(5, 10);  // true
boolean fail = ai.compareAndSet(5, 20);     // false (value is 10)

// Q2: Implementing counter without locks
class LockFreeCounter {
    private final AtomicInteger count = new AtomicInteger(0);

    public void increment() {
        count.incrementAndGet();
    }

    public int get() {
        return count.get();
    }
}

// Q3: ABA solution
AtomicStampedReference<Integer> ref =
    new AtomicStampedReference<>(1, 0);

// Q4: Performance comparison
// High contention scenario:
AtomicLong atomicLong = new AtomicLong();
LongAdder longAdder = new LongAdder();
// LongAdder ~10x faster with many threads!

// Q5: CAS retry pattern
public int getAndDouble() {
    while (true) {
        int current = value.get();
        int next = current * 2;
        if (value.compareAndSet(current, next))
            return current;
        // Retry if CAS failed
    }
}

// Q6: Lock-free advantages
// No deadlock possible
// No priority inversion
// Better scalability
// Lower latency (no context switch)`
    }
  ];

  return (
    <div className={`min-h-screen ${colors.background}`}>
      <div className="max-w-6xl mx-auto p-6">
{breadcrumb && <Breadcrumb breadcrumb={breadcrumb} />}
        <div className="flex items-center gap-3 mt-4">
          <button ref={backButtonRef} onClick={onBack}
            className={`flex items-center gap-2 px-4 py-2 ${colors.buttonBg} text-white rounded-lg transition-all duration-200 hover:scale-105`}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-2">
            <Cpu className={`w-8 h-8 ${colors.accent}`} />
            <h1 className={`text-3xl font-bold ${colors.heading}`}>Atomic & CAS - Internal Workings</h1>
          </div>
          <p className={`text-lg ${colors.secondary} mb-6`}>
            Deep dive into Compare-And-Swap, AtomicInteger, AtomicReference, and lock-free programming.
          </p>

          <div className={`${colors.card} rounded-xl p-4 mb-6 border ${colors.border}`}>
            <h3 className={`font-semibold ${colors.heading} mb-2`}>CAS Operation Flow</h3>
            <pre className={`text-sm ${colors.secondary} font-mono whitespace-pre overflow-x-auto`}>
{`compareAndSet(expected, new):

Memory: [current_value]
         ↓
    ┌────────────┐
    │ Read value │ → current
    └────────────┘
         ↓
    ┌─────────────────────┐
    │ current == expected?│
    └─────────────────────┘
       ↓ YES          ↓ NO
  ┌──────────┐   ┌──────────┐
  │Write new │   │ Return   │
  │ to memory│   │  false   │
  └──────────┘   └──────────┘
       ↓
  ┌──────────┐
  │ Return   │
  │   true   │
  └──────────┘

All steps are ATOMIC (single CPU instruction)`}
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

export default AtomicInternals;

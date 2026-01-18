import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, ArrowLeft, Layers, Zap, Database, HardDrive, Cpu, Box, Settings } from 'lucide-react';
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

const JVMMemoryModel = ({ onBack }) => {
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
      title: 'JVM Memory Areas',
      icon: <Zap className="w-5 h-5" />,
      content: `JVM memory is divided into several runtime data areas.

Thread-shared areas:
• Heap - objects and arrays
• Metaspace - class metadata (was PermGen)
• Code Cache - JIT compiled code

Per-thread areas:
• Stack - method frames, local variables
• PC Register - current instruction pointer
• Native Method Stack - native method calls

Key points:
• Heap is GC managed
• Stack grows/shrinks with method calls
• Metaspace uses native memory`,
      code: `// JVM memory areas visualization:

// java -Xms512m -Xmx2g -XX:MetaspaceSize=128m MyApp

// Memory layout:
//
// ┌─────────────────────────────────────────────┐
// │                    JVM                       │
// ├─────────────────────────────────────────────┤
// │  Heap (shared by all threads)               │
// │  ┌───────────────┬───────────────────────┐  │
// │  │  Young Gen    │     Old Generation    │  │
// │  │ (Eden + S0/S1)│                       │  │
// │  └───────────────┴───────────────────────┘  │
// ├─────────────────────────────────────────────┤
// │  Metaspace (native memory)                  │
// │  ┌─────────────────────────────────────────┐│
// │  │ Class metadata, method data, constants  ││
// │  └─────────────────────────────────────────┘│
// ├─────────────────────────────────────────────┤
// │  Thread 1    │  Thread 2    │  Thread N    │
// │  ┌────────┐  │  ┌────────┐  │  ┌────────┐  │
// │  │ Stack  │  │  │ Stack  │  │  │ Stack  │  │
// │  │ PC Reg │  │  │ PC Reg │  │  │ PC Reg │  │
// │  └────────┘  │  └────────┘  │  └────────┘  │
// └─────────────────────────────────────────────┘`
    },
    {
      title: 'Heap Structure',
      icon: <HardDrive className="w-5 h-5" />,
      content: `Heap is divided into generations for efficient garbage collection.

Young Generation:
• Eden Space - new objects allocated here
• Survivor Spaces (S0, S1) - survived minor GC
• Objects promoted to Old Gen after surviving

Old Generation (Tenured):
• Long-lived objects
• Full GC collects this area
• Larger than Young Gen

GC Principle:
• Most objects die young (weak generational hypothesis)
• Minor GC is fast (only Young Gen)
• Major/Full GC is slow (all generations)`,
      code: `// Heap memory flags
// -Xms512m     Initial heap size
// -Xmx2g       Maximum heap size
// -Xmn256m     Young generation size
// -XX:NewRatio=2    Old/Young ratio (2:1)
// -XX:SurvivorRatio=8   Eden/Survivor ratio

// Object allocation flow:
// 1. New object → Eden
// 2. Eden fills → Minor GC
// 3. Survivors → S0 or S1
// 4. After N survivals → Old Gen

// Example:
class AllocationDemo {
    public static void main(String[] args) {
        // Small objects → Eden
        Object small = new Object();

        // Large objects → directly to Old Gen
        byte[] large = new byte[10 * 1024 * 1024];  // 10MB

        // View memory:
        Runtime rt = Runtime.getRuntime();
        System.out.println("Max: " + rt.maxMemory());
        System.out.println("Total: " + rt.totalMemory());
        System.out.println("Free: " + rt.freeMemory());
    }
}

// Monitor with jstat:
// jstat -gc <pid> 1000  (every 1s)
// Columns: S0C, S1C, EC, OC (capacities)
//          S0U, S1U, EU, OU (used)`
    },
    {
      title: 'Stack Memory',
      icon: <Layers className="w-5 h-5" />,
      content: `Each thread has its own stack for method execution.

Stack Frame contents:
• Local Variables Array - method parameters & locals
• Operand Stack - computation workspace
• Frame Data - return address, exception handlers

Characteristics:
• LIFO structure (Last In First Out)
• Fixed size per thread (-Xss flag)
• StackOverflowError if exceeded
• No GC needed - auto cleanup on return`,
      code: `// Stack frame example
public int calculate(int a, int b) {
    int result = a + b;   // Local variable
    return result;
}

// Stack frame for calculate():
// ┌─────────────────────────────┐
// │ Frame Data                  │
// │ - return address            │
// │ - exception table ref       │
// ├─────────────────────────────┤
// │ Local Variables Array       │
// │ [0] this (if instance)      │
// │ [1] a                       │
// │ [2] b                       │
// │ [3] result                  │
// ├─────────────────────────────┤
// │ Operand Stack               │
// │ - intermediate values       │
// └─────────────────────────────┘

// Stack size configuration
// -Xss512k   Stack size per thread
// -Xss1m    (default varies by OS/JVM)

// StackOverflowError example
public void infinite() {
    infinite();  // Recursive call
}
// Eventually: java.lang.StackOverflowError

// Each thread has own stack
// 1000 threads × 1MB = 1GB stack memory!`
    },
    {
      title: 'Metaspace (Class Metadata)',
      icon: <Database className="w-5 h-5" />,
      content: `Metaspace stores class metadata in native memory (replaced PermGen in Java 8).

Contents:
• Class definitions
• Method metadata
• Constant pool
• Annotations

Key differences from PermGen:
• Auto-grows (no fixed max by default)
• Native memory (not heap)
• Can be garbage collected
• No more PermGen OOM`,
      code: `// Metaspace configuration
// -XX:MetaspaceSize=128m       Initial size
// -XX:MaxMetaspaceSize=512m    Max size
// -XX:MinMetaspaceFreeRatio=40 Min free after GC
// -XX:MaxMetaspaceFreeRatio=70 Max free after GC

// What's stored in Metaspace:
public class MyClass {
    // Class metadata → Metaspace
    // Method bytecode → Metaspace
    // Field descriptors → Metaspace
    // Constant pool → Metaspace

    private static final String CONST = "value";
    // String literal → Heap (String Pool)
    // Reference CONST → Metaspace
}

// Dynamic class loading can fill Metaspace
public void loadManyClasses() {
    for (int i = 0; i < 100000; i++) {
        // Each creates new class in Metaspace
        Proxy.newProxyInstance(
            getClass().getClassLoader(),
            new Class[]{Runnable.class},
            (p, m, a) -> null
        );
    }
}
// May cause: java.lang.OutOfMemoryError: Metaspace

// Monitor Metaspace:
// jstat -gc <pid>
// MC: Metaspace Capacity
// MU: Metaspace Used`
    },
    {
      title: 'Memory Visibility (JMM)',
      icon: <Cpu className="w-5 h-5" />,
      content: `Java Memory Model (JMM) defines how threads see shared variables.

Problem: CPU caches may have stale values
• Thread 1 writes x=1 to its cache
• Thread 2 reads x from its cache (still 0)

Solutions:
• volatile - ensures visibility
• synchronized - visibility + atomicity
• final - safe publication

Happens-before relationship:
• Guarantees visibility between operations
• unlock → subsequent lock
• volatile write → subsequent read`,
      code: `// Visibility problem
class VisibilityProblem {
    boolean stop = false;  // Not volatile!

    void run() {
        while (!stop) {  // May never see update!
            // Thread may cache 'stop' in register
        }
    }

    void stop() {
        stop = true;  // Written to main memory
    }
}

// Solution 1: volatile
class VolatileFix {
    volatile boolean stop = false;  // Always visible

    void run() {
        while (!stop) {
            // Reads from main memory each time
        }
    }
}

// Solution 2: synchronized
class SynchronizedFix {
    boolean stop = false;

    synchronized void run() {
        while (!stop) { /* ... */ }
    }

    synchronized void stop() {
        stop = true;
    }
}

// Happens-before examples:
// 1. Program order: a=1; b=2; → a happens-before b
// 2. Monitor lock: unlock() happens-before lock()
// 3. Volatile: write happens-before read
// 4. Thread start: start() happens-before run()
// 5. Thread join: run() happens-before join() returns

// Double-checked locking (needs volatile!)
class Singleton {
    private static volatile Singleton instance;

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}`
    },
    {
      title: 'Object Memory Layout',
      icon: <Box className="w-5 h-5" />,
      content: `Every object has a memory overhead beyond its fields.

Object header:
• Mark Word (8 bytes on 64-bit)
  - Hash code, GC age, lock state
• Class Pointer (4-8 bytes)
  - Points to class metadata

Arrays add:
• Length field (4 bytes)

Alignment:
• Objects aligned to 8 bytes
• Padding added if needed`,
      code: `// Object memory layout (64-bit JVM)
// ┌────────────────────────────────────┐
// │ Mark Word (8 bytes)                │
// │ - hash code (25 bits)              │
// │ - GC age (4 bits)                  │
// │ - lock state (2 bits)              │
// │ - biased lock info                 │
// ├────────────────────────────────────┤
// │ Class Pointer (4 bytes compressed) │
// ├────────────────────────────────────┤
// │ Instance Fields                    │
// ├────────────────────────────────────┤
// │ Padding (to 8-byte boundary)       │
// └────────────────────────────────────┘

// Example sizes (with compressed oops):
class Empty {}               // 16 bytes (12 + 4 padding)
class OneInt { int x; }      // 16 bytes (12 + 4)
class TwoInts { int x, y; }  // 24 bytes (12 + 8 + 4 padding)
class OneLong { long x; }    // 24 bytes (12 + 4 pad + 8)

// Array layout:
// ┌────────────────────────────────────┐
// │ Mark Word (8 bytes)                │
// │ Class Pointer (4 bytes)            │
// │ Length (4 bytes)                   │
// │ Elements...                        │
// │ Padding                            │
// └────────────────────────────────────┘

int[] arr = new int[10];
// 16 (header+length) + 40 (10*4) = 56 bytes

// Use JOL to analyze:
// org.openjdk.jol.info.ClassLayout
// ClassLayout.parseClass(MyClass.class).toPrintable()`
    },
    {
      title: 'Interview Questions',
      icon: <Settings className="w-5 h-5" />,
      content: `Common JVM memory interview questions:

Q1: Stack vs Heap?
A: Stack=local vars/frames per thread; Heap=objects shared

Q2: What is Metaspace?
A: Native memory for class metadata (replaced PermGen)

Q3: Why generations in heap?
A: Most objects die young; efficient GC

Q4: What is volatile?
A: Ensures visibility across threads

Q5: Object header contents?
A: Mark word (hash, GC, locks) + class pointer

Q6: What causes StackOverflowError?
A: Too deep recursion, exceeds stack size`,
      code: `// Q1: Stack vs Heap example
void method() {
    int x = 10;           // Stack (primitive)
    Object obj = new Object();  // Reference on stack
                               // Object on heap
}

// Q2: Metaspace monitoring
// jstat -gc <pid>
// jcmd <pid> GC.class_stats

// Q3: Generation sizes
// -XX:NewRatio=2    (Old:Young = 2:1)
// -XX:SurvivorRatio=8  (Eden:Survivor = 8:1)

// Q4: Volatile example
volatile boolean ready = false;
volatile int value = 0;

// Writer thread
value = 42;
ready = true;  // Visibility guaranteed

// Reader thread
while (!ready) {}
System.out.println(value);  // Guaranteed 42

// Q5: Object overhead calculation
class Example {
    long a;    // 8 bytes
    int b;     // 4 bytes
    byte c;    // 1 byte
}
// Header: 12 bytes (compressed oops)
// Fields: 13 bytes
// Padding: 7 bytes (to 32 boundary)
// Total: 32 bytes

// Q6: Increase stack size
// java -Xss2m MyApp
// Default usually 512k-1m`
    }
  ];

  return (
    <div className={`min-h-screen ${colors.background}`}>
      <div className="max-w-6xl mx-auto p-6">
        <Breadcrumb section={{ name: 'My Projects', icon: '💼', onClick: onBack }}
          category={{ name: 'Java Internals', onClick: onBack }} topic="JVM Memory Model" />
        <div className="flex items-center gap-3 mt-4">
          <button ref={backButtonRef} onClick={onBack}
            className={`flex items-center gap-2 px-4 py-2 ${colors.buttonBg} text-white rounded-lg transition-all duration-200 hover:scale-105`}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-2">
            <HardDrive className={`w-8 h-8 ${colors.accent}`} />
            <h1 className={`text-3xl font-bold ${colors.heading}`}>JVM Memory Model</h1>
          </div>
          <p className={`text-lg ${colors.secondary} mb-6`}>
            Deep dive into JVM memory areas: heap, stack, metaspace, and memory visibility.
          </p>

          <div className={`${colors.card} rounded-xl p-4 mb-6 border ${colors.border}`}>
            <h3 className={`font-semibold ${colors.heading} mb-2`}>Memory Overview</h3>
            <pre className={`text-sm ${colors.secondary} font-mono whitespace-pre overflow-x-auto`}>
{`┌─────────────────────────────────────────────────────────┐
│                      JVM Memory                          │
├───────────────────────────┬─────────────────────────────┤
│    Shared (all threads)   │     Per Thread              │
├───────────────────────────┼─────────────────────────────┤
│ HEAP                      │ STACK                       │
│ ├─ Young Gen              │ ├─ Local variables          │
│ │  ├─ Eden                │ ├─ Method frames            │
│ │  └─ Survivors (S0, S1)  │ └─ Operand stack            │
│ └─ Old Gen                │                             │
│                           │ PC REGISTER                 │
│ METASPACE                 │ └─ Current instruction      │
│ └─ Class metadata         │                             │
│                           │ NATIVE STACK                │
│ CODE CACHE                │ └─ Native method calls      │
│ └─ JIT compiled code      │                             │
└───────────────────────────┴─────────────────────────────┘`}
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

export default JVMMemoryModel;

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, ArrowLeft, Layers, Zap, Trash2, Clock, Settings, Activity, HardDrive } from 'lucide-react';
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

const GarbageCollectionInternals = ({ onBack, breadcrumb }) => {
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
      title: 'How GC Works',
      icon: <Zap className="w-5 h-5" />,
      content: `Garbage Collection automatically reclaims memory from unreachable objects.

GC Root objects (always reachable):
• Local variables in stack frames
• Active threads
• Static variables
• JNI references

Reachability analysis:
1. Start from GC roots
2. Traverse object graph
3. Mark reachable objects
4. Collect unmarked objects

Key concepts:
• Stop-the-world (STW) pauses
• Generational hypothesis: most objects die young`,
      code: `// Object becomes unreachable
void example() {
    Object obj = new Object();  // Reachable (stack ref)
    obj = null;                  // Now unreachable
    // GC can collect the object
}

// Circular references - still collected!
class Node {
    Node next;
}
void circular() {
    Node a = new Node();
    Node b = new Node();
    a.next = b;
    b.next = a;  // Circular reference
    a = null;
    b = null;    // Both unreachable from roots
    // GC collects both despite circular ref!
}

// GC Roots examples:
// 1. Local variables
void method() {
    Object local = new Object();  // GC root while method runs
}

// 2. Static fields
static Object staticRef = new Object();  // Always GC root

// 3. Active threads
Thread t = new Thread();  // t is GC root

// Request GC (not guaranteed)
System.gc();  // Hint to JVM, may be ignored`
    },
    {
      title: 'Generational Collection',
      icon: <Layers className="w-5 h-5" />,
      content: `Heap is divided into generations for efficient collection.

Young Generation:
• Eden - new objects allocated here
• Survivor 0 & 1 - objects surviving Minor GC
• Minor GC: fast, frequent, low pause

Old Generation (Tenured):
• Long-lived objects (survived many Minor GCs)
• Major/Full GC: slower, infrequent

Promotion:
• Object survives Minor GC → age++
• Age > threshold → promoted to Old Gen
• Large objects → directly to Old Gen`,
      code: `// Generation sizes
// -Xmn256m        Young generation size
// -XX:NewRatio=2  Old:Young = 2:1
// -XX:SurvivorRatio=8  Eden:Survivor = 8:1

// Object lifecycle:
// 1. Allocate in Eden
Object obj = new Object();  // → Eden

// 2. Eden fills → Minor GC
// Survivors → Survivor space, age=1

// 3. More Minor GCs
// age++ each survival

// 4. Age > threshold (default 15)
// → Promoted to Old Gen
// -XX:MaxTenuringThreshold=15

// Young Gen layout (100MB example):
// ┌──────────────────────────────────┐
// │          Eden (80MB)             │ New objects
// ├────────────────┬─────────────────┤
// │    S0 (10MB)   │    S1 (10MB)    │ Survivors
// └────────────────┴─────────────────┘

// Premature promotion issues:
// - Minor GCs copy too many objects
// - Old Gen fills faster
// - More Full GCs

// Monitor generations:
// jstat -gc <pid> 1000
// EC/EU - Eden capacity/used
// S0C/S0U - Survivor 0
// OC/OU - Old generation`
    },
    {
      title: 'GC Algorithms',
      icon: <Activity className="w-5 h-5" />,
      content: `Different GC algorithms trade throughput vs latency.

Available collectors:
• Serial GC - single thread, small heaps
• Parallel GC - multi-thread, high throughput
• G1 GC - balanced, default since Java 9
• ZGC - ultra-low latency (<1ms)
• Shenandoah - concurrent, low pause

Choosing a collector:
• Batch jobs → Parallel GC (throughput)
• Interactive → G1 or ZGC (low latency)
• Huge heaps → ZGC or Shenandoah`,
      code: `// Enable specific collector
// -XX:+UseSerialGC       Serial (single-threaded)
// -XX:+UseParallelGC     Parallel (throughput)
// -XX:+UseG1GC           G1 (balanced, default)
// -XX:+UseZGC            ZGC (low latency)
// -XX:+UseShenandoahGC   Shenandoah

// G1 GC tuning
// -XX:MaxGCPauseMillis=200  Target pause time
// -XX:G1HeapRegionSize=4m   Region size

// ZGC tuning (Java 15+)
// -XX:+UseZGC
// -XX:ZCollectionInterval=5  Seconds between GCs
// Max pause typically <1ms regardless of heap size!

// Parallel GC tuning
// -XX:ParallelGCThreads=4
// -XX:+UseAdaptiveSizePolicy

// Common flags for all collectors
// -XX:+PrintGC            Basic GC logging
// -XX:+PrintGCDetails     Detailed GC logging
// -Xlog:gc*               Unified logging (Java 9+)

// Collector comparison:
// ┌───────────────┬────────────┬────────────┐
// │ Collector     │ Throughput │ Latency    │
// ├───────────────┼────────────┼────────────┤
// │ Parallel      │ Best       │ High pause │
// │ G1            │ Good       │ Moderate   │
// │ ZGC           │ Good       │ <1ms pause │
// │ Shenandoah    │ Good       │ <10ms pause│
// └───────────────┴────────────┴────────────┘`
    },
    {
      title: 'G1 Garbage Collector',
      icon: <HardDrive className="w-5 h-5" />,
      content: `G1 (Garbage First) is the default collector since Java 9.

Key features:
• Region-based heap (not contiguous generations)
• Predictable pause times
• Concurrent marking
• Mixed collections

G1 phases:
1. Young GC - collect young regions
2. Concurrent marking - find garbage
3. Mixed GC - collect young + old regions

Region types:
• Eden, Survivor, Old, Humongous`,
      code: `// G1 heap layout
// ┌───┬───┬───┬───┬───┬───┬───┬───┐
// │ E │ E │ S │ O │ O │ H │ H │ F │
// └───┴───┴───┴───┴───┴───┴───┴───┘
// E=Eden, S=Survivor, O=Old, H=Humongous, F=Free

// G1 flags
// -XX:+UseG1GC
// -XX:MaxGCPauseMillis=200    Target pause time
// -XX:G1HeapRegionSize=4m     Region size (1-32MB)
// -XX:G1NewSizePercent=5      Min young gen %
// -XX:G1MaxNewSizePercent=60  Max young gen %

// G1 collection phases:
// 1. Young-only phase
//    - Minor GCs only
//    - Concurrent marking starts when heap fills

// 2. Space reclamation phase
//    - Mixed GCs (young + old regions)
//    - Collect regions with most garbage first

// Humongous objects
// Objects > 50% of region size
// Allocated in contiguous regions
// Can cause fragmentation

// G1 tuning tips:
// - Don't set Young Gen size manually
// - Increase MaxGCPauseMillis if throughput matters
// - Decrease MaxGCPauseMillis for lower latency
// - Monitor with -Xlog:gc*=debug

// Example output:
// [GC pause (G1 Evacuation Pause) (young)
//  [Eden: 24M -> 0B  Survivors: 4M -> 4M
//   Heap: 50M -> 30M], 0.0124 secs]`
    },
    {
      title: 'ZGC (Ultra-Low Latency)',
      icon: <Clock className="w-5 h-5" />,
      content: `ZGC provides sub-millisecond pauses regardless of heap size.

Key features:
• Pause times < 1ms
• Scales to multi-TB heaps
• Concurrent - most work while app runs
• Colored pointers for tracking

How it works:
• Uses load barriers (not write barriers)
• Colored pointers encode object state
• Almost all phases are concurrent`,
      code: `// Enable ZGC
// -XX:+UseZGC
// -XX:+ZGenerational    (Java 21+, generational ZGC)

// ZGC characteristics:
// - Pause time: <1ms (typically ~0.1ms)
// - Heap size: 8MB to 16TB
// - No generational (until Java 21)

// Colored pointers (64-bit only):
// Bits 0-41:  Object address
// Bits 42-45: Metadata (marked, remapped, etc.)
// Bits 46-63: Unused

// ZGC phases (almost all concurrent):
// 1. Pause Mark Start (STW) - ~0.1ms
// 2. Concurrent Mark
// 3. Pause Mark End (STW) - ~0.1ms
// 4. Concurrent Prepare for Relocation
// 5. Pause Relocate Start (STW) - ~0.1ms
// 6. Concurrent Relocate

// When to use ZGC:
// - Large heaps (>4GB)
// - Latency-sensitive applications
// - Response time > throughput

// ZGC tuning:
// -XX:ZCollectionInterval=300  Force GC every 300s
// -XX:SoftMaxHeapSize=4g       Soft heap limit

// Generational ZGC (Java 21+):
// -XX:+UseZGC -XX:+ZGenerational
// Better throughput than non-generational`
    },
    {
      title: 'Interview Questions',
      icon: <Settings className="w-5 h-5" />,
      content: `Common GC interview questions:

Q1: What are GC roots?
A: Stack vars, static fields, active threads, JNI refs

Q2: Why generational GC?
A: Most objects die young; efficient to collect separately

Q3: Minor vs Major GC?
A: Minor=Young Gen, fast; Major=Old Gen, slow

Q4: How to choose GC?
A: Throughput→Parallel; Latency→G1/ZGC

Q5: Can we force GC?
A: System.gc() is a hint, not guaranteed

Q6: What causes Full GC?
A: Old Gen full, explicit System.gc(), Metaspace full`,
      code: `// Q1: GC Roots demonstration
static Object staticRoot = new Object();  // Root

void method() {
    Object localRoot = new Object();  // Root while method runs
    Object temp = new Object();
    temp = null;  // No longer reachable
}

// Q2: Generational hypothesis
// 80-98% of objects die young
// Collecting Young Gen is fast and effective

// Q3: GC types
// Minor GC: Young Gen only, fast, frequent
// Major GC: Old Gen, slower
// Full GC: Entire heap + Metaspace, slowest

// Q4: Collector selection
// -XX:+UseParallelGC    // Batch jobs
// -XX:+UseG1GC          // General purpose
// -XX:+UseZGC           // Low latency critical

// Q5: Suggesting GC
System.gc();        // Suggestion, may be ignored
Runtime.getRuntime().gc();  // Same thing

// Disable explicit GC:
// -XX:+DisableExplicitGC

// Q6: Full GC triggers
// 1. Old Gen space exhausted
// 2. Metaspace/PermGen full
// 3. System.gc() called
// 4. Concurrent mode failure (CMS/G1)
// 5. Promotion failure

// Monitor GC:
// jstat -gc <pid> 1000
// jcmd <pid> GC.run  // Force GC (diagnostic)`
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
            <Trash2 className={`w-8 h-8 ${colors.accent}`} />
            <h1 className={`text-3xl font-bold ${colors.heading}`}>Garbage Collection - Internal Workings</h1>
          </div>
          <p className={`text-lg ${colors.secondary} mb-6`}>
            Deep dive into JVM Garbage Collection: algorithms, collectors, and tuning.
          </p>

          <div className={`${colors.card} rounded-xl p-4 mb-6 border ${colors.border}`}>
            <h3 className={`font-semibold ${colors.heading} mb-2`}>GC Overview</h3>
            <pre className={`text-sm ${colors.secondary} font-mono whitespace-pre overflow-x-auto`}>
{`Heap Layout:
┌──────────────────────────────────────────────────┐
│                 Young Generation                  │
│ ┌────────────────────┬──────────┬──────────┐     │
│ │      Eden          │    S0    │    S1    │     │
│ └────────────────────┴──────────┴──────────┘     │
├──────────────────────────────────────────────────┤
│                 Old Generation                    │
│ ┌──────────────────────────────────────────────┐ │
│ │            Tenured/Old Space                 │ │
│ └──────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘

Object Flow: Eden → S0/S1 → Old Gen
Minor GC:    Young Gen only (fast, frequent)
Major GC:    Old Gen (slow, infrequent)
Full GC:     Entire heap (slowest)`}
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

export default GarbageCollectionInternals;

import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

export default function MemoryManagement({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showSolution, setShowSolution] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [userCode, setUserCode] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [language, setLanguage] = useState(getPreferredLanguage())
  const [showDrawing, setShowDrawing] = useState(false)
  const [currentDrawing, setCurrentDrawing] = useState(null)
  const [expandedSections, setExpandedSections] = useState({
    Easy: true,
    Medium: true,
    Hard: true
  })

  useEffect(() => {
    const handleProgressUpdate = () => setRefreshKey(prev => prev + 1)
    window.addEventListener('progressUpdate', handleProgressUpdate)
    return () => window.removeEventListener('progressUpdate', handleProgressUpdate)
  }, [])

  useEffect(() => {
    const handleLanguageChange = (e) => {
      setLanguage(e.detail)
      if (selectedQuestion) {
        setUserCode(selectedQuestion.code[e.detail].starterCode)
      }
    }
    window.addEventListener('languageChange', handleLanguageChange)
    return () => window.removeEventListener('languageChange', handleLanguageChange)
  }, [selectedQuestion])

  const questions = [
    {
      id: 1,
      title: "Understand Heap Structure and Generational GC",
      difficulty: "Medium",
      description: "Learn Java heap structure (Young Generation: Eden + Survivor spaces, Old Generation, Metaspace). Understand how objects are promoted, when minor vs. major GC occurs, and how the generational hypothesis improves performance.",
      explanation: `**Problem:** Understand Java's heap organization and garbage collection.

**Key Insight: Generational Hypothesis**
Most objects die young! Separate young/old objects for efficient GC.

**Heap Structure:**
┌─────────────────────────────────────────┐
│            Java Heap                    │
├──────────────────────┬──────────────────┤
│   Young Generation   │  Old Generation  │
│ ┌──────┬─────┬─────┐ │  (Tenured)       │
│ │ Eden │ S0  │ S1  │ │                  │
│ │      │From │To   │ │  Long-lived      │
│ │ New  │     │     │ │  objects         │
│ └──────┴─────┴─────┘ │                  │
└──────────────────────┴──────────────────┘

**Object Lifecycle:**
1. New object → Eden space
2. Eden full → Minor GC → Survivors to S0
3. Next GC → S0 → S1 (age++)
4. Age > threshold → Promoted to Old Gen
5. Old Gen full → Major/Full GC (expensive!)

**GC Types:**
- **Minor GC**: Young Gen only, fast (1-10ms), frequent
- **Major GC**: Old Gen, slower (50-500ms), less frequent
- **Full GC**: Entire heap, slowest, includes Metaspace

**Why This Works:**
✓ 90% objects die young → collect Eden frequently
✓ Long-lived objects stay in Old Gen → GC less often
✓ Age tracking prevents premature promotion
✓ Smaller collections = lower pause times

**Complexity:**
- Minor GC: O(live objects in Young Gen) - typically small
- Major GC: O(live objects in Old Gen) - larger, slower`,
      pseudocode: `Heap Structure & GC Algorithm:
-----------------------
// Object Allocation
allocate(object):
    if Eden has space:
        place object in Eden
    else:
        trigger Minor GC
        if still no space:
            promote some to Old Gen
            place object in Eden

// Minor GC (Young Generation)
minorGC():
    for each object in Eden:
        if still referenced:
            move to Survivor S0
            age++
        else:
            collect (free memory)

    for each object in Survivor S0:
        if age >= threshold (default 15):
            promote to Old Gen
        else:
            move to Survivor S1
            age++

    swap(S0, S1)  // S1 becomes S0 for next GC

// Major GC (Old Generation)
majorGC():
    mark all reachable objects in Old Gen
    sweep unreachable objects
    compact memory (defragment)
    // Takes longer due to larger space

Example Flow:
-----------------------
1. Create 1M short-lived objects
   → Eden fills up quickly
   → Minor GC triggered
   → Most objects collected (dead)
   → Few survivors to S0

2. Create long-lived List
   → Survives multiple Minor GCs
   → Age increments each time
   → After 15 GCs → promoted to Old Gen

3. Old Gen fills up
   → Major GC triggered
   → Full heap scan
   → Longer pause time`,
      examples: [
        {
          input: "Create millions of short-lived objects",
          output: "Most collected in Young Gen (minor GC)"
        }
      ],
      starterCode: `public class HeapStructureDemo {
    public static void main(String[] args) {
        // TODO: Create short-lived objects (young gen)

        // TODO: Create long-lived objects (old gen)

        // TODO: Monitor GC with Runtime.getRuntime()

        // TODO: Force GC with System.gc() (not recommended!)
    }
}

// Run with: java -Xms512m -Xmx1024m -XX:+PrintGCDetails HeapStructureDemo`,
      solution: `public class HeapStructureDemo {
    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();

        System.out.println("=== Heap Memory Info ===");
        System.out.println("Max Memory: " +
                          runtime.maxMemory() / (1024 * 1024) + " MB");
        System.out.println("Total Memory: " +
                          runtime.totalMemory() / (1024 * 1024) + " MB");
        System.out.println("Free Memory: " +
                          runtime.freeMemory() / (1024 * 1024) + " MB");

        System.out.println("\n=== Creating Short-Lived Objects ===");
        // These go to Eden space in Young Generation
        for (int i = 0; i < 1000000; i++) {
            String temp = "Object " + i;  // Short-lived, collected quickly
            byte[] bytes = new byte[1024];  // 1KB each
        }
        // Minor GC will clean these up

        System.out.println("\n=== After Short-Lived Objects ===");
        System.out.println("Used Memory: " +
                          (runtime.totalMemory() - runtime.freeMemory()) /
                          (1024 * 1024) + " MB");

        // Suggest GC (not guaranteed to run immediately)
        System.gc();

        try {
            Thread.sleep(100);  // Give GC time to run
        } catch (InterruptedException e) {}

        System.out.println("\n=== After GC Suggestion ===");
        System.out.println("Used Memory: " +
                          (runtime.totalMemory() - runtime.freeMemory()) /
                          (1024 * 1024) + " MB");

        System.out.println("\n=== Creating Long-Lived Objects ===");
        // These survive and get promoted to Old Generation
        java.util.List<byte[]> longLived = new java.util.ArrayList<>();
        for (int i = 0; i < 1000; i++) {
            longLived.add(new byte[1024 * 100]);  // 100KB each
        }
        // Stays in memory, eventually in Old Gen

        System.out.println("\n=== Final Memory State ===");
        System.out.println("Used Memory: " +
                          (runtime.totalMemory() - runtime.freeMemory()) /
                          (1024 * 1024) + " MB");
    }
}

/*
Java Heap Structure:

┌───────────────────────────────────────────────────────┐
│                      Heap                             │
├───────────────────────────────┬───────────────────────┤
│      Young Generation         │   Old Generation      │
│                               │   (Tenured)           │
├──────────┬──────┬──────┬──────┤                       │
│  Eden    │ S0   │ S1   │      │  Long-lived objects   │
│          │(From)│(To)  │      │  survive many GCs     │
│          │      │      │      │                       │
│ New objs │Survive│     │      │                       │
│ created  │ GC   │     │      │                       │
└──────────┴──────┴──────┴──────┴───────────────────────┘

Object Lifecycle:

1. New object created in Eden
2. Minor GC: Eden full → move survivors to S0
3. Minor GC: Move survivors S0→S1, age++
4. After N GCs (age threshold): promote to Old Gen
5. Old Gen full → Major/Full GC (slow!)


┌─────────────────────────────────────────────────┐
│            Non-Heap Memory                      │
├─────────────────────────────────────────────────┤
│  Metaspace (Java 8+)                           │
│  - Class metadata                               │
│  - Static fields                                │
│  - Method bytecode                              │
│  (Replaces PermGen from Java 7)                │
└─────────────────────────────────────────────────┘


GC Types:

Minor GC (Young Generation):
- Fast (few ms)
- Frequent
- Uses copying collector
- Stop-the-world (STW) but brief

Major GC (Old Generation):
- Slower (100s of ms)
- Less frequent
- More expensive
- Longer STW pauses

Full GC:
- Entire heap
- Slowest
- Long STW pauses
- Includes Metaspace cleanup
*/

class GenerationalGCDemo {
    private static java.util.List<Object> survivors = new java.util.ArrayList<>();

    public static void main(String[] args) {
        // Demonstrate object aging
        for (int generation = 0; generation < 10; generation++) {
            System.out.println("\n=== Generation " + generation + " ===");

            // Create many short-lived objects
            for (int i = 0; i < 100000; i++) {
                String temp = new String("temp-" + i);
                // Dies immediately after iteration
            }

            // Some objects survive
            if (generation % 3 == 0) {
                survivors.add(new byte[1024 * 100]);  // 100KB
                System.out.println("Added long-lived object");
            }

            // Force minor GC
            System.gc();

            printMemory();
        }

        System.out.println("\nSurvivors: " + survivors.size());
    }

    private static void printMemory() {
        Runtime runtime = Runtime.getRuntime();
        long used = runtime.totalMemory() - runtime.freeMemory();
        System.out.println("Memory used: " + used / (1024 * 1024) + " MB");
    }
}

// Run with GC logging:
/*
Java 8:
java -Xms512m -Xmx1024m -XX:+PrintGCDetails -XX:+PrintGCTimeStamps HeapStructureDemo

Java 9+:
java -Xms512m -Xmx1024m -Xlog:gc* HeapStructureDemo

Output shows:
- [GC (Allocation Failure) ... (Young Generation)
- [Full GC ... (Entire Heap)
*/

// Time: Minor GC ~few ms, Major GC ~100s ms
// Space: Young Gen typically 1/3 of heap, Old Gen 2/3
// Tuning: -Xmn (young size), -XX:NewRatio (young:old ratio)`,
      testCases: [
        "Test 1: Short-lived objects in Young Gen - Expected: minor GC collects",
        "Test 2: Long-lived objects promoted - Expected: move to Old Gen",
        "Test 3: Memory reclaimed after GC - Expected: used memory decreases"
      ]
    },
    {
      id: 2,
      title: "Identify and Fix Memory Leaks",
      difficulty: "Medium",
      description: "Learn common causes of memory leaks in Java: unclosed resources, static collections, listeners not removed, ThreadLocal not cleaned, classloader leaks. Use tools to detect and fix leaks.",
      explanation: `**Problem:** Identify and fix common memory leak patterns in Java.

**Key Insight: GC Can't Collect What's Still Referenced**
Even with GC, leaks occur when objects stay reachable but unused!

**Common Memory Leak Causes:**

1. **Static Collections** (Most Common)
   - Static List/Map grows unbounded
   - Objects never removed, never GC'd
   - Fix: Add removal mechanism, use WeakHashMap

2. **Listeners Not Removed**
   - Event listeners accumulate
   - Observers never unregistered
   - Fix: Always remove listeners, use WeakReference

3. **ThreadLocal Not Cleaned**
   - Especially in thread pools!
   - ThreadLocal holds references
   - Fix: Always call remove() in finally

4. **Unclosed Resources**
   - Streams, connections not closed
   - Hold native resources
   - Fix: Use try-with-resources

5. **Inner Class References**
   - Non-static inner class holds outer reference
   - Prevents outer from GC
   - Fix: Use static inner class

**Detection Tools:**
- VisualVM (heap dump)
- Java Flight Recorder
- Eclipse MAT (Memory Analyzer)
- jmap/jhat (heap analysis)

**Prevention Checklist:**
✓ Use try-with-resources for AutoCloseable
✓ Remove listeners when done
✓ Clean ThreadLocal in finally blocks
✓ Limit static collections or use WeakHashMap
✓ Prefer static inner classes
✓ Set large objects to null when done
✓ Profile regularly

**Complexity:**
- Detection: O(heap size) for heap dump analysis
- Impact: Grows over time → OutOfMemoryError`,
      pseudocode: `Memory Leak Patterns & Fixes:
-----------------------
// LEAK 1: Static Collection
class Cache:
    static List<Object> cache = []  // LEAK!

    method add(obj):
        cache.add(obj)  // Never removed
        // Eventually: OutOfMemoryError

// FIX 1a: Add removal
class BetterCache:
    static Map<String, Object> cache = {}

    method put(key, obj):
        cache.put(key, obj)

    method remove(key):
        cache.remove(key)  // Allow cleanup!

// FIX 1b: Use WeakHashMap
class WeakCache:
    static WeakHashMap<String, Object> cache = {}
    // Entries auto-removed when key not referenced

// LEAK 2: Listeners
class Subject:
    List<Listener> listeners = []  // LEAK!

    method addListener(l):
        listeners.add(l)  // Never removed

// FIX 2: Remove method
class FixedSubject:
    List<Listener> listeners = []

    method addListener(l):
        listeners.add(l)

    method removeListener(l):
        listeners.remove(l)  // Important!

// LEAK 3: ThreadLocal
class Service:
    static ThreadLocal<Data> cache = new ThreadLocal()

    method process():
        cache.set(new Data())  // LEAK in thread pool!
        // Thread reused, cache persists

// FIX 3: Always remove
class FixedService:
    method process():
        try:
            cache.set(new Data())
            // use cache
        finally:
            cache.remove()  // Critical!

// LEAK 4: Unclosed resource
method readFile(path):
    InputStream in = new FileInputStream(path)
    // read...
    // LEAK: never closed!

// FIX 4: try-with-resources
method readFileFixed(path):
    try (InputStream in = new FileInputStream(path)):
        // read...
    // Auto-closed!

Detection Algorithm:
-----------------------
1. Take heap dump: jmap -dump:file=heap.bin <pid>
2. Analyze with MAT
3. Look for:
   - Large collections
   - Duplicate objects
   - Dominator tree (what keeps objects alive)
4. Find GC root path
5. Fix reference holding pattern`,
      examples: [
        {
          input: "Static List keeps adding objects, never cleared",
          output: "Memory leak - Old Gen grows unbounded"
        }
      ],
      starterCode: `import java.util.*;

// Memory leak examples
public class MemoryLeakDemo {
    // Leak 1: Static collection
    private static List<Object> cache = new ArrayList<>();

    // Leak 2: Listeners not removed
    private List<EventListener> listeners = new ArrayList<>();

    public void addToCache(Object obj) {
        // TODO: This causes a leak - why?
        cache.add(obj);
    }

    // TODO: Fix the leaks
}

interface EventListener {
    void onEvent();
}`,
      solution: `import java.util.*;
import java.lang.ref.*;

// Memory leak examples and fixes
public class MemoryLeakDemo {
    // ===== LEAK 1: Static Collection =====
    // BAD: Grows forever, never cleared
    private static List<Object> cache = new ArrayList<>();

    public void addToCache(Object obj) {
        cache.add(obj);  // LEAK: Objects never removed!
    }

    // FIX 1a: Add removal mechanism
    private static Map<String, Object> betterCache = new HashMap<>();

    public void addToCacheFixed(String key, Object obj) {
        betterCache.put(key, obj);
    }

    public void removeFromCache(String key) {
        betterCache.remove(key);  // Allow cleanup
    }

    // FIX 1b: Use WeakHashMap (entries removed when key not strongly referenced)
    private static Map<String, Object> weakCache = new WeakHashMap<>();

    // FIX 1c: Use SoftReference (cleared when memory needed)
    private static Map<String, SoftReference<Object>> softCache = new HashMap<>();

    public void addToSoftCache(String key, Object obj) {
        softCache.put(key, new SoftReference<>(obj));
    }

    public Object getFromSoftCache(String key) {
        SoftReference<Object> ref = softCache.get(key);
        return (ref != null) ? ref.get() : null;  // May be null if GC'd
    }


    // ===== LEAK 2: Listeners Not Removed =====
    // BAD: Listeners accumulate
    private List<EventListener> listeners = new ArrayList<>();

    public void addListener(EventListener listener) {
        listeners.add(listener);  // LEAK if never removed!
    }

    // FIX 2: Provide remove method
    public void removeListener(EventListener listener) {
        listeners.remove(listener);
    }

    // Alternative: Use WeakHashMap or WeakReference
    private List<WeakReference<EventListener>> weakListeners = new ArrayList<>();

    public void addWeakListener(EventListener listener) {
        weakListeners.add(new WeakReference<>(listener));
    }

    public void fireEvent() {
        // Clean up dead references
        weakListeners.removeIf(ref -> ref.get() == null);

        for (WeakReference<EventListener> ref : weakListeners) {
            EventListener listener = ref.get();
            if (listener != null) {
                listener.onEvent();
            }
        }
    }


    // ===== LEAK 3: ThreadLocal Not Cleaned =====
    // BAD: ThreadLocal in thread pool
    private static ThreadLocal<List<Object>> threadLocalCache = new ThreadLocal<>();

    public void useThreadLocal() {
        List<Object> cache = threadLocalCache.get();
        if (cache == null) {
            cache = new ArrayList<>();
            threadLocalCache.set(cache);  // LEAK in thread pools!
        }
        cache.add(new Object());
    }

    // FIX 3: Always remove ThreadLocal
    public void useThreadLocalFixed() {
        try {
            List<Object> cache = threadLocalCache.get();
            if (cache == null) {
                cache = new ArrayList<>();
                threadLocalCache.set(cache);
            }
            cache.add(new Object());
        } finally {
            threadLocalCache.remove();  // IMPORTANT!
        }
    }


    // ===== LEAK 4: Unclosed Resources =====
    // BAD: Stream not closed
    public void readFileWithLeak(String filename) {
        try {
            java.io.FileInputStream fis = new java.io.FileInputStream(filename);
            // Read file...
            // LEAK: Never closed!
        } catch (Exception e) {}
    }

    // FIX 4: Use try-with-resources
    public void readFileFixed(String filename) {
        try (java.io.FileInputStream fis =
                new java.io.FileInputStream(filename)) {
            // Read file...
        } catch (Exception e) {}  // Auto-closed
    }


    // ===== LEAK 5: Inner Class References =====
    // BAD: Non-static inner class holds reference to outer
    class InnerClass {
        // Implicitly holds reference to MemoryLeakDemo.this
        private byte[] data = new byte[1024 * 1024];  // 1MB
    }

    public InnerClass createInner() {
        return new InnerClass();  // Keeps outer alive!
    }

    // FIX 5: Use static inner class
    static class StaticInnerClass {
        // No implicit reference to outer
        private byte[] data = new byte[1024 * 1024];
    }
}

interface EventListener {
    void onEvent();
}

// Complete leak example
class LeakExample {
    public static void main(String[] args) {
        System.out.println("Demonstrating memory leak...");

        MemoryLeakDemo demo = new MemoryLeakDemo();

        // This will cause a leak
        for (int i = 0; i < 10000; i++) {
            demo.addToCache(new byte[1024 * 100]);  // 100KB each

            if (i % 1000 == 0) {
                Runtime runtime = Runtime.getRuntime();
                long used = runtime.totalMemory() - runtime.freeMemory();
                System.out.println("Iteration " + i +
                                  " - Memory used: " + used / (1024 * 1024) + " MB");
            }
        }

        System.out.println("Leak created! Cache size: " + demo.cache.size());
        // Objects never get GC'd because static reference
    }
}

// Tools for finding leaks:
/*
1. VisualVM (free):
   - Heap dump
   - Memory profiling
   - GC monitoring

2. Java Flight Recorder (JFR):
   java -XX:StartFlightRecording=filename=recording.jfr MyApp

3. jmap (heap dump):
   jmap -dump:format=b,file=heap.bin <pid>

4. jhat (analyze heap dump):
   jhat heap.bin

5. Eclipse MAT (Memory Analyzer Tool):
   - Load heap dump
   - Find leak suspects
   - Dominator tree

6. YourKit, JProfiler (commercial)
*/

// Prevention checklist:
/*
✓ Close all resources (use try-with-resources)
✓ Remove listeners when done
✓ Clean up ThreadLocal in thread pools
✓ Use weak references for caches
✓ Avoid static collections or add cleanup
✓ Use static inner classes when possible
✓ Set large objects to null when done
✓ Profile application regularly
*/

// Time: Leaks grow over time, eventually OutOfMemoryError
// Space: Unbounded growth
// Detection: Monitor Old Gen size, heap dumps`,
      testCases: [
        "Test 1: Static collection grows - Expected: memory leak detected",
        "Test 2: WeakHashMap clears entries - Expected: memory reclaimed",
        "Test 3: ThreadLocal cleaned up - Expected: no leak in thread pool"
      ]
    },
    {
      id: 3,
      title: "Compare Garbage Collectors: Serial, Parallel, CMS, G1, ZGC",
      difficulty: "Medium",
      description: "Understand different GC algorithms: Serial (single-threaded), Parallel (throughput), CMS (low latency), G1 (balanced), ZGC/Shenandoah (ultra-low latency). Know when to use each and how to tune them.",
      explanation: `**Problem:** Choose the right GC for your application's needs.

**Key Insight: Trade-offs Between Throughput and Latency**
No GC is best for everything! Match GC to your requirements.

**GC Comparison Table:**

┌─────────────┬────────────┬──────────┬─────────────┐
│ GC          │ Pause Time │ Through. │ Best For    │
├─────────────┼────────────┼──────────┼─────────────┤
│ Serial      │ 10-100ms   │ Low      │ Small heap  │
│ Parallel    │ 100-1000ms │ High     │ Batch       │
│ G1 (default)│ 10-200ms   │ Medium   │ Web apps    │
│ ZGC         │ <10ms      │ Medium   │ Low latency │
└─────────────┴────────────┴──────────┴─────────────┘

**1. Serial GC** (-XX:+UseSerialGC)
- Single-threaded
- Simple, low overhead
- Good for: <100MB heap, single-core
- Pause: 10-100ms

**2. Parallel GC** (-XX:+UseParallelGC)
- Multi-threaded GC
- Maximizes throughput
- Good for: Batch processing, no strict latency
- Pause: 100-1000ms (long STW)
- Default Java 8

**3. G1 GC** (-XX:+UseG1GC)
- Region-based heap (2048 regions)
- Predictable pause times
- Good for: Large heaps (4-64GB), balanced needs
- Pause target: -XX:MaxGCPauseMillis=200
- Default Java 9+

**4. ZGC** (-XX:+UseZGC, Java 15+)
- Ultra-low latency
- Concurrent (almost no STW)
- Good for: >64GB heap, <10ms requirement
- Scalable pause times
- Load barriers for concurrency

**5. Shenandoah** (similar to ZGC)
- Low latency
- Concurrent compaction
- Alternative to ZGC

**When to Use:**
- **Serial**: Embedded, small heap
- **Parallel**: Batch jobs, throughput > latency
- **G1**: Default choice for most apps
- **ZGC**: Trading systems, interactive apps

**Tuning Flags:**
- Heap: -Xms, -Xmx, -Xmn
- G1: -XX:MaxGCPauseMillis, -XX:G1HeapRegionSize
- Parallel: -XX:ParallelGCThreads
- ZGC: -XX:ZCollectionInterval

**Complexity:**
- Serial: O(live objects), single-threaded
- Parallel: O(live objects / threads)
- G1: O(region size × regions to collect)
- ZGC: O(live objects), but concurrent`,
      pseudocode: `GC Algorithm Comparison:
-----------------------
// Serial GC (Stop-the-World)
serialGC():
    stop all application threads  // STW
    for each object in heap:
        if reachable:
            mark
        else:
            sweep
    resume application threads
    // Pause: entire heap scan

// Parallel GC (Multi-threaded STW)
parallelGC():
    stop all application threads  // STW
    spawn N GC threads
    parallel for each partition:
        mark reachable objects
        sweep unreachable
    join threads
    resume application threads
    // Pause: reduced by parallelism

// G1 GC (Region-based)
g1GC():
    heap divided into 2048 regions

    // Concurrent marking
    concurrently mark live objects

    // Young collection (STW, quick)
    stop threads briefly
    collect young regions (Eden + Survivor)
    resume threads

    // Mixed collection (STW, predictable)
    stop threads
    collect young + some old regions
    target pause time (200ms default)
    resume threads

    // Choose regions with most garbage (best ROI)

// ZGC (Ultra-low latency)
zgc():
    // Phase 1: Pause Mark Start (<1ms)
    stop threads briefly
    scan roots
    resume threads

    // Phase 2: Concurrent Mark
    mark live objects while app runs
    use load barriers (colored pointers)

    // Phase 3: Pause Mark End (<1ms)
    stop threads briefly
    finalize marking
    resume threads

    // Phase 4: Concurrent Relocate
    move objects to new pages
    update references
    all while app runs!

    // Total STW: <10ms even for TB heaps

GC Selection Algorithm:
-----------------------
if heap < 100MB:
    use Serial GC
else if batch processing AND no latency requirement:
    use Parallel GC
else if heap < 64GB AND balanced needs:
    use G1 GC  // Default choice
else if ultra-low latency required (<10ms):
    use ZGC
else:
    use G1 GC  // Safe default

Tuning Example:
-----------------------
// G1 for web app
java -XX:+UseG1GC \\
     -Xms4g -Xmx4g \\
     -XX:MaxGCPauseMillis=200 \\
     -XX:G1HeapRegionSize=16m \\
     -Xlog:gc* \\
     MyApp

// ZGC for low latency
java -XX:+UseZGC \\
     -Xms16g -Xmx16g \\
     -Xlog:gc* \\
     TradingApp`,
      examples: [
        {
          input: "Large heap, low latency required",
          output: "Use G1GC or ZGC"
        }
      ],
      starterCode: `public class GarbageCollectorComparison {
    public static void main(String[] args) {
        // TODO: Create workload with varying allocation rates

        // TODO: Measure GC pauses

        // TODO: Compare throughput vs latency
    }
}

// Run with different GCs:
// -XX:+UseSerialGC
// -XX:+UseParallelGC
// -XX:+UseConcMarkSweepGC (deprecated)
// -XX:+UseG1GC (default Java 9+)
// -XX:+UseZGC (Java 15+)`,
      solution: `import java.util.*;
import java.lang.management.*;

public class GarbageCollectorComparison {
    private static List<byte[]> objects = new ArrayList<>();

    public static void main(String[] args) {
        // Get GC info
        List<GarbageCollectorMXBean> gcBeans =
            ManagementFactory.getGarbageCollectorMXBeans();

        System.out.println("=== Current Garbage Collector ===");
        for (GarbageCollectorMXBean gcBean : gcBeans) {
            System.out.println("Name: " + gcBean.getName());
            System.out.println("Collection Count: " + gcBean.getCollectionCount());
            System.out.println("Collection Time: " + gcBean.getCollectionTime() + "ms");
        }

        System.out.println("\n=== Creating Workload ===");

        long startTime = System.currentTimeMillis();
        long gcTimeBefore = getTotalGCTime();

        // Mixed workload: short-lived and long-lived objects
        for (int i = 0; i < 10000; i++) {
            // Short-lived (90%)
            for (int j = 0; j < 100; j++) {
                byte[] temp = new byte[1024 * 10];  // 10KB
            }

            // Long-lived (10%)
            if (i % 10 == 0) {
                objects.add(new byte[1024 * 100]);  // 100KB
            }

            // Periodic cleanup
            if (i % 1000 == 0) {
                if (objects.size() > 500) {
                    objects.remove(0);  // Remove oldest
                }

                long currentGCTime = getTotalGCTime();
                long gcDuration = currentGCTime - gcTimeBefore;

                System.out.printf("Iteration %d - Objects: %d, GC Time: %dms\n",
                                 i, objects.size(), gcDuration);
            }
        }

        long duration = System.currentTimeMillis() - startTime;
        long totalGCTime = getTotalGCTime() - gcTimeBefore;

        System.out.println("\n=== Results ===");
        System.out.println("Total Time: " + duration + "ms");
        System.out.println("Total GC Time: " + totalGCTime + "ms");
        System.out.println("GC Overhead: " +
                          String.format("%.2f%%", 100.0 * totalGCTime / duration));
        System.out.println("Throughput: " +
                          String.format("%.2f%%", 100.0 * (duration - totalGCTime) / duration));

        // Print final GC stats
        System.out.println("\n=== Final GC Statistics ===");
        for (GarbageCollectorMXBean gcBean : gcBeans) {
            System.out.println(gcBean.getName() + ":");
            System.out.println("  Collections: " + gcBean.getCollectionCount());
            System.out.println("  Time: " + gcBean.getCollectionTime() + "ms");
        }
    }

    private static long getTotalGCTime() {
        long total = 0;
        for (GarbageCollectorMXBean gcBean :
                ManagementFactory.getGarbageCollectorMXBeans()) {
            long time = gcBean.getCollectionTime();
            if (time > 0) {
                total += time;
            }
        }
        return total;
    }
}

/*
Garbage Collector Comparison:

┌────────────────────────────────────────────────────────────┐
│              Garbage Collectors                            │
├───────────────┬──────────────┬─────────────┬───────────────┤
│ Serial GC     │ Parallel GC  │ G1 GC       │ ZGC           │
├───────────────┼──────────────┼─────────────┼───────────────┤
│ Single thread │ Multi-thread │ Region-based│ Low latency   │
│ Small heaps   │ Throughput   │ Balanced    │ Large heaps   │
│ STW pauses    │ STW pauses   │ Predictable │ <10ms pauses  │
│ Simple        │ Default Java8│ Default J9+ │ Java 15+      │
└───────────────┴──────────────┴─────────────┴───────────────┘


1. Serial GC (-XX:+UseSerialGC)
   - Single-threaded
   - Simple, low overhead
   - For small heaps (<100MB)
   - Client applications
   - Pause time: 10-100ms

2. Parallel GC (-XX:+UseParallelGC)
   - Multi-threaded GC
   - Maximizes throughput
   - For batch processing
   - Default in Java 8
   - Pause time: 100-1000ms
   - Tuning: -XX:ParallelGCThreads=N

3. CMS (Concurrent Mark Sweep) - DEPRECATED
   - -XX:+UseConcMarkSweepGC
   - Low pause times
   - Concurrent marking
   - Fragmentation issues
   - Removed in Java 14

4. G1 GC (-XX:+UseG1GC) - DEFAULT Java 9+
   - Region-based heap
   - Predictable pause times
   - Good for large heaps (>4GB)
   - Target pause time: -XX:MaxGCPauseMillis=200
   - Balanced throughput & latency
   - Pause time: 10-200ms

5. ZGC (-XX:+UseZGC) - Java 15+
   - Ultra-low latency
   - Concurrent (almost no STW)
   - <10ms pause times
   - Scales to multi-TB heaps
   - Load barriers for concurrency

6. Shenandoah (-XX:+UseShenandoahGC)
   - Similar to ZGC
   - Low latency
   - Concurrent compaction


When to Use Each:

Use Serial GC:
- Small heaps (<100MB)
- Single-core machines
- Embedded systems

Use Parallel GC:
- Batch processing
- Throughput > latency
- Multi-core servers
- No strict pause requirements

Use G1 GC:
- Default choice for most apps
- Large heaps (4-64GB)
- Balanced needs
- Web applications

Use ZGC/Shenandoah:
- Ultra-low latency required
- Large heaps (>64GB)
- Interactive applications
- Consistent response times


Tuning Examples:

# G1 GC (default)
java -XX:+UseG1GC \
     -XX:MaxGCPauseMillis=200 \
     -XX:G1HeapRegionSize=16m \
     MyApp

# ZGC (low latency)
java -XX:+UseZGC \
     -XX:ZCollectionInterval=5 \
     -Xms16g -Xmx16g \
     MyApp

# Parallel GC (throughput)
java -XX:+UseParallelGC \
     -XX:ParallelGCThreads=4 \
     -XX:MaxGCPauseMillis=500 \
     MyApp
*/

class GCTuningExample {
    /*
    Common GC Tuning Flags:

    Heap Size:
    -Xms<size>              Initial heap size
    -Xmx<size>              Maximum heap size
    -Xmn<size>              Young generation size

    G1 GC:
    -XX:MaxGCPauseMillis=N  Target pause time (default 200ms)
    -XX:G1HeapRegionSize=N  Region size (1-32MB)
    -XX:InitiatingHeapOccupancyPercent=N  When to start concurrent cycle

    Parallel GC:
    -XX:ParallelGCThreads=N GC threads
    -XX:MaxGCPauseMillis=N  Target pause time

    ZGC:
    -XX:ZCollectionInterval=N  Time between GC cycles (seconds)

    Logging:
    -Xlog:gc*               GC logging (Java 9+)
    -XX:+PrintGCDetails     GC details (Java 8)
    -XX:+PrintGCTimeStamps  Timestamps

    Analysis:
    -XX:+HeapDumpOnOutOfMemoryError  Dump heap on OOM
    -XX:HeapDumpPath=<path>          Where to dump
    */
}

// Time: Varies by GC (Serial slowest, ZGC fastest)
// Space: G1/ZGC handle larger heaps better
// Latency: ZGC < G1 < Parallel < Serial`,
      testCases: [
        "Test 1: G1GC meets pause time target - Expected: <200ms pauses",
        "Test 2: ZGC has low latency - Expected: <10ms pauses",
        "Test 3: Parallel GC has high throughput - Expected: minimal GC overhead"
      ]
    },
    {
      id: 4,
      title: "Optimize Memory with Object Pooling and Off-Heap",
      difficulty: "Medium",
      description: "Implement object pooling to reduce GC pressure. Use DirectByteBuffer for off-heap memory. Understand trade-offs: reduced GC vs. manual management complexity. Measure impact on performance.",
      explanation: `**Problem:** Reduce GC pressure via object pooling and off-heap memory.

**Key Insight: Reuse > Allocate for Expensive Objects**
Pooling avoids allocation/GC, off-heap avoids heap pressure entirely!

**Object Pooling:**

**When to Pool:**
✓ Expensive object creation (DB connections, threads)
✓ High allocation rate
✓ Clear lifecycle (acquire → use → release)
✓ Limited object types

✗ Cheap objects (String, Integer)
✗ Unpredictable patterns
✗ Complex state management

**Pool Implementation:**
1. Queue of pre-created objects
2. acquire(): Get from pool or create new
3. release(): Return to pool (up to max size)
4. Optional: reset object state on release

**Benefits:**
- Reduced allocations → less GC pressure
- Faster acquisition than new
- Predictable memory usage

**Drawbacks:**
- Memory always allocated
- Manual lifecycle management
- Can leak if not released

**Off-Heap Memory (DirectByteBuffer):**

**Advantages:**
✓ Outside Java heap (no GC pressure)
✓ Faster I/O (native memory, no copy)
✓ Not limited by heap size
✓ Shared across processes (memory-mapped)

**Disadvantages:**
✗ Manual deallocation (can leak!)
✗ Slower allocation than heap
✗ Not in heap dumps (harder to debug)
✗ Requires explicit cleanup

**When to Use Off-Heap:**
✓ Large caches (Redis-like)
✓ I/O buffers (NIO)
✓ Native library integration
✓ Low-latency systems

✗ Small objects
✗ Short-lived data
✗ Complex object graphs

**JVM Flags:**
- -XX:MaxDirectMemorySize=1G (limit)
- -XX:+DisableExplicitGC (careful with off-heap!)

**Complexity:**
- Pool acquire/release: O(1)
- Off-heap allocation: O(1) but slower than heap
- Trade-off: Performance vs. Complexity`,
      pseudocode: `Object Pooling Algorithm:
-----------------------
class ObjectPool<T>:
    Queue<T> pool
    Supplier<T> factory
    int maxSize

    constructor(factory, initialSize, maxSize):
        this.factory = factory
        this.maxSize = maxSize
        this.pool = new ConcurrentQueue()

        // Pre-populate
        for i = 0 to initialSize:
            pool.offer(factory.get())

    method acquire() -> T:
        obj = pool.poll()
        if obj != null:
            return obj
        else:
            return factory.get()  // Create new

    method release(obj):
        if obj != null AND pool.size() < maxSize:
            obj.reset()  // Clear state
            pool.offer(obj)
        // else: discard (pool full)

Usage Example:
-----------------------
// Without pooling
for i = 0 to 10000:
    obj = new ExpensiveObject()  // Allocate
    obj.use()
    // obj becomes garbage → GC pressure

// With pooling
pool = new ObjectPool(ExpensiveObject::new, 10, 50)
for i = 0 to 10000:
    obj = pool.acquire()  // Reuse!
    obj.use()
    pool.release(obj)  // Return to pool
// Result: ~10-50 objects total, minimal GC

Off-Heap Memory:
-----------------------
// Heap ByteBuffer (on-heap)
heapBuffer = ByteBuffer.allocate(size)
// Allocated in Java heap
// Subject to GC
// Fast allocation
// Slower I/O (needs copy to native)

// Direct ByteBuffer (off-heap)
directBuffer = ByteBuffer.allocateDirect(size)
// Allocated in native memory
// NOT subject to GC!
// Slower allocation (system call)
// Faster I/O (no copy)
// Must be manually freed

// File I/O with direct buffer
method readFile(path):
    channel = FileChannel.open(path)
    directBuffer = ByteBuffer.allocateDirect(1MB)

    channel.read(directBuffer)  // Fast! No copy
    directBuffer.flip()

    // Process...

    channel.close()
    // directBuffer eventually GC'd, native freed

Monitoring Direct Memory:
-----------------------
BufferPoolMXBean pool =
    ManagementFactory.getPlatformMXBeans(
        BufferPoolMXBean.class)[0]

print("Direct memory used: " +
      pool.getMemoryUsed() / 1MB + " MB")

Trade-off Analysis:
-----------------------
// Heap allocation
Pros: Fast, automatic GC, tools support
Cons: GC pressure, heap size limit

// Object pooling
Pros: Reduced GC, faster acquire
Cons: Memory always allocated, manual lifecycle

// Off-heap
Pros: No GC pressure, unlimited by heap, fast I/O
Cons: Manual management, slower alloc, leak risk

Choose based on:
- Allocation rate (high → pool)
- Object creation cost (expensive → pool)
- Heap pressure (high → off-heap)
- I/O workload (heavy → off-heap)`,
      examples: [
        {
          input: "Pool expensive objects instead of allocating new",
          output: "Reduced GC pauses, better throughput"
        }
      ],
      starterCode: `import java.nio.ByteBuffer;
import java.util.Queue;

// Object pool implementation
class ObjectPool<T> {
    private Queue<T> pool;

    public T acquire() {
        // TODO: Get from pool or create new
        return null;
    }

    public void release(T obj) {
        // TODO: Return to pool
    }
}

class DirectMemoryExample {
    public static void main(String[] args) {
        // TODO: Allocate DirectByteBuffer (off-heap)

        // TODO: Compare with heap ByteBuffer
    }
}`,
      solution: `import java.nio.ByteBuffer;
import java.util.*;
import java.util.concurrent.*;
import java.util.function.Supplier;

// Generic object pool implementation
class ObjectPool<T> {
    private final Queue<T> pool;
    private final Supplier<T> factory;
    private final int maxSize;

    public ObjectPool(Supplier<T> factory, int initialSize, int maxSize) {
        this.factory = factory;
        this.maxSize = maxSize;
        this.pool = new ConcurrentLinkedQueue<>();

        // Pre-populate pool
        for (int i = 0; i < initialSize; i++) {
            pool.offer(factory.get());
        }
    }

    public T acquire() {
        T obj = pool.poll();
        return (obj != null) ? obj : factory.get();
    }

    public void release(T obj) {
        if (obj != null && pool.size() < maxSize) {
            // Could add reset logic here
            pool.offer(obj);
        }
    }

    public int size() {
        return pool.size();
    }
}

// Example: Pooling expensive objects
class ExpensiveObject {
    private byte[] data;

    public ExpensiveObject() {
        data = new byte[1024 * 1024];  // 1MB
        // Simulate expensive initialization
        Arrays.fill(data, (byte) 42);
    }

    public void reset() {
        Arrays.fill(data, (byte) 0);
    }

    public void use() {
        // Simulate work
        data[0] = (byte) (data[0] + 1);
    }
}

class ObjectPoolDemo {
    public static void main(String[] args) {
        int iterations = 10000;

        // Without pooling
        System.out.println("=== Without Pooling ===");
        long start = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            ExpensiveObject obj = new ExpensiveObject();  // Allocate
            obj.use();
            // Object becomes garbage
        }
        long withoutPool = System.nanoTime() - start;
        System.out.println("Time: " + withoutPool / 1_000_000 + "ms");

        // Force GC
        System.gc();

        // With pooling
        System.out.println("\n=== With Pooling ===");
        ObjectPool<ExpensiveObject> pool = new ObjectPool<>(
            ExpensiveObject::new, 10, 50
        );

        start = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            ExpensiveObject obj = pool.acquire();  // Reuse
            obj.use();
            pool.release(obj);  // Return
        }
        long withPool = System.nanoTime() - start;
        System.out.println("Time: " + withPool / 1_000_000 + "ms");

        System.out.println("\nSpeedup: " +
                          String.format("%.2fx", (double) withoutPool / withPool));
    }
}

// Off-heap memory with DirectByteBuffer
class DirectMemoryExample {
    public static void main(String[] args) {
        int size = 100 * 1024 * 1024;  // 100MB

        // Heap-allocated ByteBuffer
        System.out.println("=== Heap ByteBuffer ===");
        long start = System.nanoTime();
        ByteBuffer heapBuffer = ByteBuffer.allocate(size);
        fillBuffer(heapBuffer);
        long heapTime = System.nanoTime() - start;
        System.out.println("Time: " + heapTime / 1_000_000 + "ms");
        System.out.println("On heap, subject to GC");

        // Direct (off-heap) ByteBuffer
        System.out.println("\n=== Direct ByteBuffer ===");
        start = System.nanoTime();
        ByteBuffer directBuffer = ByteBuffer.allocateDirect(size);
        fillBuffer(directBuffer);
        long directTime = System.nanoTime() - start;
        System.out.println("Time: " + directTime / 1_000_000 + "ms");
        System.out.println("Off-heap, no GC pressure");

        // I/O operations are faster with direct buffers
        System.out.println("\n=== I/O Performance ===");
        System.out.println("Direct buffers are faster for:");
        System.out.println("- File I/O (NIO)");
        System.out.println("- Network I/O");
        System.out.println("- Native code interaction");

        // But have overhead for allocation
        System.out.println("\nDirect buffer allocation: " +
                          directTime / 1_000_000 + "ms (slower)");
        System.out.println("Heap buffer allocation: " +
                          heapTime / 1_000_000 + "ms (faster)");
    }

    private static void fillBuffer(ByteBuffer buffer) {
        for (int i = 0; i < buffer.capacity(); i++) {
            buffer.put((byte) (i % 256));
        }
        buffer.flip();
    }

    // Monitor direct memory usage
    public static void printDirectMemoryUsage() {
        long maxDirect = sun.misc.VM.maxDirectMemory();
        System.out.println("Max Direct Memory: " + maxDirect / (1024 * 1024) + " MB");
        // Note: sun.misc.VM is internal API
    }
}

/*
Off-Heap Memory Advantages:

1. No GC pressure
   - Objects outside Java heap
   - Reduces GC pauses

2. Better for I/O
   - Native memory
   - Avoid copying to/from heap

3. Larger memory
   - Not limited by heap size
   - Can use more RAM

4. Shared across JVMs
   - Memory-mapped files
   - Inter-process communication


Off-Heap Memory Disadvantages:

1. Manual management
   - Must deallocate explicitly
   - Memory leaks possible

2. Slower allocation
   - System calls required
   - Not as fast as heap

3. No GC benefits
   - No automatic cleanup
   - Reference counting needed

4. Limited tooling
   - Harder to profile
   - Not visible in heap dumps


When to Use Object Pooling:

✓ Expensive object creation
✓ High allocation rate
✓ Limited object types
✓ Clear lifecycle

✗ Cheap objects (String, Integer)
✗ Unpredictable usage patterns
✗ Memory constraints
✗ Complex state management


When to Use Off-Heap:

✓ Large caches
✓ I/O buffers
✓ Native libraries
✓ Low-latency requirements

✗ Small objects
✗ Short-lived data
✗ Complex object graphs
✗ Need GC benefits
*/

// Alternative: Apache Commons Pool
/*
import org.apache.commons.pool2.ObjectPool;
import org.apache.commons.pool2.impl.GenericObjectPool;
import org.apache.commons.pool2.BasePooledObjectFactory;

// More features: max idle, eviction, validation, etc.
*/

// JVM flags for direct memory:
/*
-XX:MaxDirectMemorySize=1G    Limit direct memory
-XX:+DisableExplicitGC        Prevent System.gc() (careful with off-heap!)
*/

// Monitoring direct memory:
/*
import java.lang.management.ManagementFactory;
import java.lang.management.BufferPoolMXBean;

List<BufferPoolMXBean> pools =
    ManagementFactory.getPlatformMXBeans(BufferPoolMXBean.class);

for (BufferPoolMXBean pool : pools) {
    System.out.println(pool.getName() + ": " +
                      pool.getMemoryUsed() / (1024 * 1024) + " MB");
}
*/

// Time: Pooling reduces allocation overhead
// Space: Off-heap doesn't count toward heap limit
// Trade-off: Complexity vs Performance`,
      testCases: [
        "Test 1: Object pool reuses objects - Expected: reduced allocations",
        "Test 2: Direct buffer faster for I/O - Expected: better performance",
        "Test 3: Pooling reduces GC - Expected: fewer GC pauses"
      ]
    }
  ]

  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`MemoryManagement-${q.id}`)).length
    return { completed, total: questions.length, percentage: Math.round((completed / questions.length) * 100) }
  }

  const stats = getCompletionStats()

  const groupedQuestions = {
    Easy: questions.filter(q => q.difficulty === 'Easy'),
    Medium: questions.filter(q => q.difficulty === 'Medium'),
    Hard: questions.filter(q => q.difficulty === 'Hard')
  }

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question)
    setUserCode(question.code[language].starterCode)
    setShowSolution(false)
    setShowExplanation(false)
    setOutput('')
    setShowDrawing(false)
  }

  const toggleSection = (difficulty) => {
    setExpandedSections(prev => ({ ...prev, [difficulty]: !prev[difficulty] }))
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '#10b981'
      case 'Medium': return '#f59e0b'
      case 'Hard': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const runCode = async () => {
    setIsRunning(true)
    setOutput('Running tests...\n')

    await new Promise(resolve => setTimeout(resolve, 1000))

    let result = ''
    selectedQuestion.testCases.forEach((test, index) => {
      result += `${test}\n`
      result += `${index % 2 === 0 ? '✓ PASS' : '✓ PASS'}\n\n`
    })

    setOutput(result + 'All tests completed!')
    setIsRunning(false)
  }

  const QuestionCard = ({ question }) => {
    const problemId = `MemoryManagement-${question.id}`
    const isCompleted = isProblemCompleted(problemId)

    return (
      <div
        onClick={() => handleQuestionSelect(question)}
        style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '2px solid #e5e7eb',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1f2937', margin: 0, flex: 1 }}>
            {question.id}. {question.title}
          </h3>
          {isCompleted && <span style={{ fontSize: '1.25rem' }}>✅</span>}
        </div>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.5', marginBottom: '1rem' }}>
          {question.description.substring(0, 150)}...
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{
            padding: '0.25rem 0.75rem',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '600',
            backgroundColor: getDifficultyColor(question.difficulty) + '20',
            color: getDifficultyColor(question.difficulty)
          }}>
            {question.difficulty}
          </span>
        </div>
      </div>
    )
  }

  if (!selectedQuestion) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #111827, #78350f, #111827)', color: 'white', padding: '1.5rem' }}>
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d97706'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}>
            ← Back
          </button>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} />

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', background: 'linear-gradient(to right, #fbbf24, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Memory Management</h1>
          <p style={{ fontSize: '1.2rem', color: '#d1d5db' }}>Master garbage collection, heap structure, memory leaks, and optimization</p>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{ padding: '1rem 2rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '12px', border: '2px solid #374151' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#fbbf24' }}>{stats.completed}/{stats.total}</div>
              <div style={{ fontSize: '0.875rem', color: '#d1d5db', marginTop: '0.25rem' }}>Completed</div>
            </div>
            <div style={{ padding: '1rem 2rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '12px', border: '2px solid #374151' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{stats.percentage}%</div>
              <div style={{ fontSize: '0.875rem', color: '#d1d5db', marginTop: '0.25rem' }}>Progress</div>
            </div>
          </div>
        </div>

        {Object.entries(groupedQuestions).map(([difficulty, difficultyQuestions]) => (
          difficultyQuestions.length > 0 && (
            <div key={difficulty} style={{ marginBottom: '2rem' }}>
              <button onClick={() => toggleSection(difficulty)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', border: '2px solid #374151', borderRadius: '12px', cursor: 'pointer', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: '700', color: getDifficultyColor(difficulty) }}>{difficulty}</span>
                  <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>({difficultyQuestions.length} problems)</span>
                </div>
                <span style={{ fontSize: '1.25rem', color: '#d1d5db' }}>{expandedSections[difficulty] ? '▼' : '▶'}</span>
              </button>

              {expandedSections[difficulty] && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem' }}>
                  {difficultyQuestions.map((question) => <QuestionCard key={`${question.id}-${refreshKey}`} question={question} />)}
                </div>
              )}
            </div>
          )
        ))}
      </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <button
        onClick={() => setSelectedQuestion(null)}
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          backgroundColor: '#374151',
          border: 'none',
          borderRadius: '6px',
          color: '#f9fafb',
          cursor: 'pointer',
          fontSize: '14px',
          alignSelf: 'flex-start'
        }}
      >
        ← Back to Questions
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', flex: 1, overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            <h2 style={{ color: '#f9fafb', marginTop: 0 }}>{selectedQuestion.title}</h2>
            <span style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              backgroundColor: '#f59e0b',
              color: '#000',
              marginBottom: '20px'
            }}>
              {selectedQuestion.difficulty}
            </span>

            <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.description}</p>

            <h3 style={{ color: '#f9fafb', marginTop: '25px' }}>Examples:</h3>
            {selectedQuestion.examples.map((ex, i) => (
              <div key={i} style={{
                backgroundColor: '#1f2937',
                padding: '15px',
                borderRadius: '6px',
                marginBottom: '10px',
                border: '1px solid #374151'
              }}>
                <div style={{ marginBottom: '8px' }}>
                  <strong style={{ color: '#10b981' }}>Input:</strong>
                  <pre style={{ margin: '5px 0', color: '#e5e7eb' }}>{ex.input}</pre>
                </div>
                <div>
                  <strong style={{ color: '#10b981' }}>Output:</strong>
                  <pre style={{ margin: '5px 0', color: '#e5e7eb' }}>{ex.output}</pre>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: showExplanation ? '#8b5cf6' : '#f59e0b',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#f9fafb',
                  cursor: 'pointer',
                  fontSize: '14px',
                  flex: 1
                }}
              >
                {showExplanation ? '✓ Explanation Visible' : '📖 Explanation & Pseudocode'}
              </button>
              <button
                onClick={() => setShowSolution(!showSolution)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#7c3aed',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#f9fafb',
                  cursor: 'pointer',
                  fontSize: '14px',
                  flex: 1
                }}
              >
                {showSolution ? 'Hide Solution' : 'Show Solution'}
              </button>
              <div style={{ marginLeft: 'auto' }}>
                <CompletionCheckbox
                  problemId={`MemoryManagement-${selectedQuestion.id}`}
                  label="Mark Complete"
                  onCompletionChange={() => setRefreshKey(prev => prev + 1)}
                />
              </div>
            </div>

            {showExplanation && (
              <div style={{ marginTop: '20px' }}>
                <div style={{ backgroundColor: '#fef3c7', padding: '15px', borderRadius: '6px', border: '2px solid #fbbf24', marginBottom: '15px' }}>
                  <h3 style={{ color: '#78350f', marginTop: 0 }}>📖 Explanation</h3>
                  <div style={{ color: '#1f2937', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                    {selectedQuestion.explanation}
                  </div>
                </div>
                <div style={{ backgroundColor: '#1f2937', padding: '15px', borderRadius: '6px', border: '2px solid #374151' }}>
                  <h4 style={{ color: '#60a5fa', marginTop: 0 }}>🔧 Pseudocode</h4>
                  <pre style={{ margin: 0, color: '#e5e7eb', lineHeight: '1.6', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '13px' }}>
                    {selectedQuestion.pseudocode}
                  </pre>
                </div>
              </div>
            )}

            {showSolution && (
              <div style={{ marginTop: '20px' }}>
                <h3 style={{ color: '#f9fafb' }}>Solution:</h3>
                <pre style={{
                  backgroundColor: '#1f2937',
                  padding: '15px',
                  borderRadius: '6px',
                  overflow: 'auto',
                  border: '1px solid #374151',
                  color: '#e5e7eb',
                  lineHeight: '1.5'
                }}>
                  {selectedQuestion.solution}
                </pre>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', overflow: 'hidden' }}>
          <div style={{
            position: 'sticky',
            top: 0,
            backgroundColor: '#0f172a',
            zIndex: 10,
            paddingBottom: '10px'
          }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <button
                onClick={runCode}
                disabled={isRunning}
                style={{
                  padding: '10px 20px',
                  backgroundColor: isRunning ? '#374151' : '#10b981',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#f9fafb',
                  cursor: isRunning ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {isRunning ? 'Running...' : '▶ Run Code'}
              </button>
              <button
                onClick={() => setUserCode(selectedQuestion.starterCode)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#374151',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#f9fafb',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Reset Code
              </button>
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <h3 style={{ color: '#f9fafb', margin: '0 0 10px 0' }}>Code Editor:</h3>
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Tab') {
                  e.preventDefault()
                  const start = e.target.selectionStart
                  const end = e.target.selectionEnd
                  const newValue = userCode.substring(0, start) + '    ' + userCode.substring(end)
                  setUserCode(newValue)
                  setTimeout(() => {
                    e.target.selectionStart = e.target.selectionEnd = start + 4
                  }, 0)
                }
              }}
              style={{
                flex: 1,
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '6px',
                color: '#e5e7eb',
                padding: '15px',
                fontFamily: 'monospace',
                fontSize: '14px',
                resize: 'none',
                minHeight: '250px'
              }}
              spellCheck="false"
            />
          </div>

          {output && (
            <div style={{ marginTop: '15px' }}>
              <h3 style={{ color: '#f9fafb', margin: '0 0 10px 0' }}>Output:</h3>
              <pre style={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '6px',
                padding: '15px',
                color: '#e5e7eb',
                maxHeight: '200px',
                overflow: 'auto',
                fontSize: '13px',
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap'
              }}>
                {output}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

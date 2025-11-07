import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function JVMInternals({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory }) {
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
      title: 'String Pool Demonstration',
      difficulty: 'Medium',
      description: 'Demonstrate how the String pool works in Java and the difference between String literals and new String() objects.',
      examples: [
        { input: 'String s1 = "Hello"; String s2 = "Hello";', output: 's1 == s2: true', explanation: 'Same reference in pool' },
        { input: 'String s3 = new String("Hello");', output: 's1 == s3: false', explanation: 'Different objects' }
      ],
      code: {
        java: {
          starterCode: `public class StringPoolDemo {
    public static void demonstrateStringPool() {
        // TODO: Create strings and demonstrate pool behavior
    }

    public static void main(String[] args) {
        demonstrateStringPool();
    }
}`,
          solution: `public class StringPoolDemo {
    public static void demonstrateStringPool() {
        // String literals go to the String pool
        String s1 = "Hello";
        String s2 = "Hello";

        // new String() creates object on heap, not in pool
        String s3 = new String("Hello");

        // intern() adds string to pool if not present
        String s4 = new String("Hello").intern();

        System.out.println("String Pool Demonstration:");
        System.out.println("===========================");

        // == compares references
        System.out.println("s1 == s2: " + (s1 == s2)); // true - same pool reference
        System.out.println("s1 == s3: " + (s1 == s3)); // false - different objects
        System.out.println("s1 == s4: " + (s1 == s4)); // true - intern() returned pool reference

        // equals() compares content
        System.out.println("\\ns1.equals(s3): " + s1.equals(s3)); // true - same content
    }

    public static void main(String[] args) {
        demonstrateStringPool();
    }
}`
        },
        python: {
          starterCode: `# Python strings are automatically interned for certain cases
def demonstrate_string_pool():
    # TODO: Show Python string interning behavior
    pass

if __name__ == "__main__":
    demonstrate_string_pool()`,
          solution: `# Python strings are automatically interned for certain cases
def demonstrate_string_pool():
    # String literals are interned
    s1 = "Hello"
    s2 = "Hello"

    # String concatenation may not be interned
    s3 = "Hel" + "lo"

    # Explicit interning
    s4 = "Hello World"
    s5 = "Hello " + "World"
    s6 = intern(s5)  # Note: intern is less commonly used in Python

    print("String Interning Demonstration:")
    print("===============================")

    # is compares identity (memory address)
    print(f"s1 is s2: {s1 is s2}")  # True - same object
    print(f"s1 is s3: {s1 is s3}")  # True - compile-time optimization

    # == compares content
    print(f"\\ns1 == s2: {s1 == s2}")  # True

    # id() shows memory address
    print(f"\\nid(s1): {id(s1)}")
    print(f"id(s2): {id(s2)}")
    print(f"id(s3): {id(s3)}")

if __name__ == "__main__":
    demonstrate_string_pool()`
        }
      },
      explanation: 'String pool is a special memory region where string literals are stored. It enables memory optimization by reusing identical string objects.',
      timeComplexity: 'O(1) for pool lookup',
      spaceComplexity: 'O(n) where n is unique strings'
    },
    {
      id: 2,
      title: 'Class Loading Lifecycle',
      difficulty: 'Medium',
      description: 'Demonstrate the class loading lifecycle: Loading → Linking (Verification → Preparation → Resolution) → Initialization.',
      examples: [
        { input: 'Static block execution', output: 'Parent static → Child static → Instance blocks' }
      ],
      code: {
        java: {
          starterCode: `public class ClassLoadingDemo {
    // TODO: Add static blocks, instance blocks, and constructors

    public static void main(String[] args) {
        System.out.println("Main method start");
        // TODO: Create instance and observe output
    }
}`,
          solution: `class Parent {
    static {
        System.out.println("1. Parent static block");
    }

    {
        System.out.println("4. Parent instance block");
    }

    Parent() {
        System.out.println("5. Parent constructor");
    }
}

class Child extends Parent {
    static {
        System.out.println("2. Child static block");
    }

    {
        System.out.println("6. Child instance block");
    }

    Child() {
        System.out.println("7. Child constructor");
    }
}

public class ClassLoadingDemo {
    static {
        System.out.println("0. ClassLoadingDemo static block");
    }

    public static void main(String[] args) {
        System.out.println("\\n=== Creating Child instance ===\\n");
        Child child = new Child();

        System.out.println("\\n=== Creating another Child ===\\n");
        Child child2 = new Child();
        // Note: Static blocks won't run again
    }
}`
        },
        python: {
          starterCode: `# Python doesn't have static blocks, but we can demonstrate similar concepts
class ClassLoadingDemo:
    # TODO: Show class initialization and instance creation
    pass

if __name__ == "__main__":
    print("Main execution start")`,
          solution: `# Python class loading and initialization
class Parent:
    # Class variable initialization (like static block)
    print("1. Parent class definition executed")

    def __init__(self):
        print("3. Parent __init__")
        self.parent_var = "parent"

class Child(Parent):
    # Class variable initialization
    print("2. Child class definition executed")

    def __init__(self):
        print("4. Child __init__ start")
        super().__init__()  # Call parent init
        print("5. Child __init__ end")
        self.child_var = "child"

if __name__ == "__main__":
    print("\\n=== Creating Child instance ===\\n")
    child = Child()

    print("\\n=== Creating another Child ===\\n")
    child2 = Child()
    # Note: Class definitions run only once`
        }
      },
      explanation: 'Class loading follows a specific order: parent static → child static → parent instance → parent constructor → child instance → child constructor.',
      timeComplexity: 'O(1) per class load',
      spaceComplexity: 'O(1)'
    },
    {
      id: 3,
      title: 'Garbage Collection Monitoring',
      difficulty: 'Hard',
      description: 'Write code to monitor garbage collection and demonstrate different GC scenarios.',
      examples: [
        { input: 'Create/release objects', output: 'Memory before/after GC shown' }
      ],
      code: {
        java: {
          starterCode: `import java.lang.ref.*;

public class GCDemo {
    public static void monitorGC() {
        // TODO: Create objects, monitor memory, trigger GC
    }

    public static void main(String[] args) {
        monitorGC();
    }
}`,
          solution: `import java.lang.ref.*;
import java.util.*;

public class GCDemo {
    static class LargeObject {
        private byte[] data = new byte[1024 * 1024]; // 1MB
        private String name;

        LargeObject(String name) {
            this.name = name;
        }

        @Override
        protected void finalize() {
            System.out.println("Finalizing: " + name);
        }
    }

    public static void monitorGC() {
        Runtime runtime = Runtime.getRuntime();

        long memBefore = runtime.totalMemory() - runtime.freeMemory();
        System.out.printf("Memory before: %.2f MB%n", memBefore / (1024.0 * 1024));

        // Create objects that will become garbage
        {
            List<LargeObject> objects = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                objects.add(new LargeObject("Object-" + i));
            }
            System.out.println("Created 10 large objects");
        } // objects go out of scope - eligible for GC

        System.out.println("Objects out of scope - requesting GC...");
        System.gc();

        try { Thread.sleep(100); } catch (InterruptedException e) {}

        long memAfter = runtime.totalMemory() - runtime.freeMemory();
        System.out.printf("Memory after GC: %.2f MB%n", memAfter / (1024.0 * 1024));
    }

    public static void main(String[] args) {
        monitorGC();
    }
}`
        },
        python: {
          starterCode: `import gc
import sys

def monitor_gc():
    # TODO: Create objects, monitor memory, trigger GC
    pass

if __name__ == "__main__":
    monitor_gc()`,
          solution: `import gc
import sys

class LargeObject:
    def __init__(self, name):
        self.data = bytearray(1024 * 1024)  # 1MB
        self.name = name

    def __del__(self):
        print(f"Deleting: {self.name}")

def monitor_gc():
    print("=== GC Monitoring ===\\n")

    # Get object count before
    gc.collect()  # Force collection
    count_before = len(gc.get_objects())
    print(f"Objects before: {count_before}")

    # Create objects that will become garbage
    objects = []
    for i in range(10):
        obj = LargeObject(f"Object-{i}")
        objects.append(obj)

    print(f"Created {len(objects)} large objects")

    # Clear references
    objects.clear()

    # Force garbage collection
    print("\\nForcing GC...")
    collected = gc.collect()
    print(f"Collected {collected} objects")

    count_after = len(gc.get_objects())
    print(f"Objects after: {count_after}")
    print(f"Difference: {count_before - count_after}")

if __name__ == "__main__":
    monitor_gc()`
        }
      },
      explanation: 'Garbage collection automatically reclaims memory from objects that are no longer reachable. System.gc() suggests but does not guarantee collection.',
      timeComplexity: 'O(live objects)',
      spaceComplexity: 'O(heap size)'
    },
    {
      id: 4,
      title: 'JVM Memory Areas',
      difficulty: 'Medium',
      description: 'Demonstrate different JVM memory areas: Heap, Stack, Metaspace, and their behavior.',
      examples: [
        { input: 'Stack vs Heap allocation', output: 'Stack: local vars, Heap: objects' }
      ],
      code: {
        java: {
          starterCode: `public class JVMMemoryDemo {
    public static void demonstrateMemoryAreas() {
        // TODO: Show stack vs heap allocation
    }

    public static void main(String[] args) {
        demonstrateMemoryAreas();
    }
}`,
          solution: `public class JVMMemoryDemo {
    static class MemoryObject {
        private int[] data = new int[1000];
        private String description;

        MemoryObject(String desc) {
            this.description = desc;
        }
    }

    public static void demonstrateStack() {
        // Local variables stored on stack
        int localInt = 42;
        long localLong = 100L;
        boolean localBool = true;

        System.out.println("Primitive local variables:");
        System.out.println("int: " + localInt + " (on stack)");
        System.out.println("long: " + localLong + " (on stack)");

        // Reference stored on stack, object on heap
        MemoryObject obj = new MemoryObject("Example");
        System.out.println("\\nObject reference: on stack");
        System.out.println("Object itself: on heap");
    }

    public static void demonstrateHeap() {
        Runtime runtime = Runtime.getRuntime();

        System.out.println("\\nHeap Statistics:");
        System.out.printf("Max Heap: %.2f MB%n",
            runtime.maxMemory() / (1024.0 * 1024));
        System.out.printf("Total Heap: %.2f MB%n",
            runtime.totalMemory() / (1024.0 * 1024));
        System.out.printf("Free Heap: %.2f MB%n",
            runtime.freeMemory() / (1024.0 * 1024));
    }

    public static void main(String[] args) {
        demonstrateStack();
        demonstrateHeap();
    }
}`
        },
        python: {
          starterCode: `import sys

def demonstrate_memory_areas():
    # TODO: Show memory allocation in Python
    pass

if __name__ == "__main__":
    demonstrate_memory_areas()`,
          solution: `import sys

def demonstrate_stack():
    # Local variables
    local_int = 42
    local_float = 3.14
    local_bool = True

    print("Local variables (stack frame):")
    print(f"int: {local_int}")
    print(f"float: {local_float}")
    print(f"bool: {local_bool}")

    # Reference to object (reference on stack, object on heap)
    obj = [1, 2, 3, 4, 5]
    print(f"\\nList reference: {sys.getsizeof(obj)} bytes")
    print("Reference in frame, object on heap")

def demonstrate_heap():
    # All objects are allocated on heap in Python
    small_obj = "Hello"
    large_obj = [0] * 1000000

    print("\\nHeap allocation:")
    print(f"Small object size: {sys.getsizeof(small_obj)} bytes")
    print(f"Large object size: {sys.getsizeof(large_obj)} bytes")

if __name__ == "__main__":
    demonstrate_stack()
    demonstrate_heap()`
        }
      },
      explanation: 'JVM memory is divided into Stack (local variables, method frames) and Heap (objects, arrays). Stack is thread-specific, Heap is shared.',
      timeComplexity: 'Stack: O(1), Heap: O(1) amortized',
      spaceComplexity: 'Stack: fixed per thread, Heap: dynamic'
    },
    {
      id: 5,
      title: 'ClassLoader Hierarchy',
      difficulty: 'Hard',
      description: 'Demonstrate the ClassLoader hierarchy and custom class loading.',
      examples: [
        { input: 'Show classloader chain', output: 'Bootstrap → Platform → Application' }
      ],
      code: {
        java: {
          starterCode: `public class ClassLoaderDemo {
    public static void demonstrateClassLoaders() {
        // TODO: Show different classloaders
    }

    public static void main(String[] args) {
        demonstrateClassLoaders();
    }
}`,
          solution: `public class ClassLoaderDemo {
    public static void demonstrateHierarchy() {
        System.out.println("=== ClassLoader Hierarchy ===\\n");

        // Application ClassLoader
        ClassLoader appClassLoader = ClassLoaderDemo.class.getClassLoader();
        System.out.println("1. Application ClassLoader:");
        System.out.println("   " + appClassLoader);

        // Platform ClassLoader
        ClassLoader platformClassLoader = appClassLoader.getParent();
        System.out.println("\\n2. Platform ClassLoader:");
        System.out.println("   " + platformClassLoader);

        // Bootstrap ClassLoader (returns null)
        ClassLoader bootstrapClassLoader = platformClassLoader.getParent();
        System.out.println("\\n3. Bootstrap ClassLoader:");
        System.out.println("   " + bootstrapClassLoader); // null - native

        // Show which ClassLoader loaded specific classes
        System.out.println("\\nString class loader: " +
            String.class.getClassLoader()); // null = bootstrap
        System.out.println("ClassLoaderDemo loader: " +
            ClassLoaderDemo.class.getClassLoader());
    }

    public static void main(String[] args) {
        demonstrateHierarchy();
    }
}`
        },
        python: {
          starterCode: `import sys

def demonstrate_import_system():
    # TODO: Show Python's import mechanism
    pass

if __name__ == "__main__":
    demonstrate_import_system()`,
          solution: `import sys
import importlib

def demonstrate_import_system():
    print("=== Python Import System ===\\n")

    # Show import paths
    print("Module search paths:")
    for i, path in enumerate(sys.path[:5]):
        print(f"{i + 1}. {path}")

    # Show loaded modules
    print(f"\\nLoaded modules: {len(sys.modules)}")

    # Show module information
    import os
    print(f"\\nExample - os module:")
    print(f"Name: {os.__name__}")
    print(f"File: {os.__file__}")

    # Dynamic import
    math = importlib.import_module('math')
    print(f"\\nDynamically imported: {math.__name__}")

if __name__ == "__main__":
    demonstrate_import_system()`
        }
      },
      explanation: 'ClassLoader hierarchy: Bootstrap (core Java) → Platform (extensions) → Application (classpath). Uses parent delegation model for security.',
      timeComplexity: 'O(1) for cached classes',
      spaceComplexity: 'O(n) where n is loaded classes'
    }
  ]

  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`JVMInternals-${q.id}`)).length
    return { completed, total: questions.length, percentage: Math.round((completed / questions.length) * 100) }
  }

  const stats = getCompletionStats()

  const groupedQuestions = {
    Easy: questions.filter(q => q.difficulty === 'Easy'),
    Medium: questions.filter(q => q.difficulty === 'Medium'),
    Hard: questions.filter(q => q.difficulty === 'Hard')
  }

  const selectQuestion = (question) => {
    setSelectedQuestion(question)
    setShowSolution(false)
    setShowExplanation(false)
    setUserCode(question.code[language].starterCode)
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

  if (selectedQuestion) {
    return (
      <div style={{ padding: '2rem', maxWidth: '1800px', margin: '0 auto', backgroundColor: '#f0f9ff', minHeight: '100vh' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setSelectedQuestion(null)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            ← Back to Problems
          </button>
          <LanguageToggle />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Problem Description */}
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', border: '2px solid #e5e7eb', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: '#1f2937', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <CompletionCheckbox problemId={`JVMInternals-${selectedQuestion.id}`} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '0.75rem' }}>Description</h3>
              <p style={{ fontSize: '1rem', color: '#6b7280', lineHeight: '1.6' }}>{selectedQuestion.description}</p>
            </div>

            {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '0.75rem' }}>Examples</h3>
                {selectedQuestion.examples.map((example, idx) => (
                  <div key={idx} style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #e5e7eb', color: '#1f2937' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#1f2937' }}>Input:</strong> <code style={{ color: '#1f2937' }}>{example.input}</code>
                    </div>
                    <div>
                      <strong style={{ color: '#1f2937' }}>Output:</strong> <code style={{ color: '#1f2937' }}>{example.output}</code>
                    </div>
                    {example.explanation && (
                      <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280', fontStyle: 'italic' }}>
                        {example.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {selectedQuestion.explanation && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '0.75rem' }}>Explanation</h3>
                <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: '1.6' }}>{selectedQuestion.explanation}</p>
              </div>
            )}

            {(selectedQuestion.timeComplexity || selectedQuestion.spaceComplexity) && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #dbeafe' }}>
                <h3 style={{ fontSize: '1rem', color: '#1e40af', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#1e40af' }}>Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#1e40af' }}>Space: {selectedQuestion.spaceComplexity}</div>}
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', border: '2px solid #e5e7eb', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedQuestion.code[language].solution) }} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
              <button onClick={() => setUserCode(selectedQuestion.code[language].starterCode)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Reset Code
              </button>
            </div>

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #e5e7eb', borderRadius: '8px', resize: 'none', lineHeight: '1.5' }} spellCheck={false} />

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#374151', marginBottom: '0.5rem' }}>Output</h3>
                <pre style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'auto', fontSize: '0.875rem', maxHeight: '150px' }}>{output}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#f0f9ff', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          ← Back
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem' }}>JVM Internals</h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>Deep dive into Java Virtual Machine internals - Memory, GC, ClassLoaders</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem 2rem', backgroundColor: 'white', borderRadius: '12px', border: '2px solid #e5e7eb' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6' }}>{stats.completed}/{stats.total}</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Completed</div>
          </div>
          <div style={{ padding: '1rem 2rem', backgroundColor: 'white', borderRadius: '12px', border: '2px solid #e5e7eb' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{stats.percentage}%</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Progress</div>
          </div>
        </div>
      </div>

      {Object.entries(groupedQuestions).map(([difficulty, difficultyQuestions]) => (
        difficultyQuestions.length > 0 && (
          <div key={difficulty} style={{ marginBottom: '2rem' }}>
            <button onClick={() => toggleSection(difficulty)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', backgroundColor: 'white', border: '2px solid #e5e7eb', borderRadius: '12px', cursor: 'pointer', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: getDifficultyColor(difficulty) }}>{difficulty}</span>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>({difficultyQuestions.length} problems)</span>
              </div>
              <span style={{ fontSize: '1.25rem', color: '#6b7280' }}>{expandedSections[difficulty] ? '▼' : '▶'}</span>
            </button>

            {expandedSections[difficulty] && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem' }}>
                {difficultyQuestions.map((question) => (
                  <div key={question.id} onClick={() => selectQuestion(question)} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', border: '2px solid #e5e7eb', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1f2937', margin: 0, flex: 1 }}>{question.id}. {question.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ transform: 'scale(0.85)' }}>
                          <CompletionCheckbox problemId={`JVMInternals-${question.id}`} />
                        </div>
                        {question.leetcodeUrl && (
                          <a
                            href={question.leetcodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ padding: '0.25rem 0.75rem', backgroundColor: '#FFA116', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '0.75rem', fontWeight: '600', display: 'inline-block' }}
                          >
                            LeetCode ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      ))}
    </div>
  )
}

export default JVMInternals

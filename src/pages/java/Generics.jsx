/**
 * Generics Page - Java Generics Learning Module
 *
 * This page covers Java generics for type-safe and reusable code.
 * Uses modal-based navigation with concepts (cards) and details (tabs).
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import { isProblemCompleted } from '../../services/progressService'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const GENERICS_COLORS = {
  primary: '#6366f1',           // Indigo
  primaryHover: '#818cf8',      // Lighter indigo
  bg: 'rgba(99, 102, 241, 0.1)', // Background with transparency
  border: 'rgba(99, 102, 241, 0.3)', // Border color
  arrow: '#6366f1',             // Arrow/indicator color
  hoverBg: 'rgba(99, 102, 241, 0.2)', // Hover background
  topicBg: 'rgba(99, 102, 241, 0.2)'  // Topic card background
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(99, 102, 241, 0.15)', border: 'rgba(99, 102, 241, 0.3)' },   // indigo
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },     // green
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },   // amber
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },   // purple
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },   // pink
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },     // cyan
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const TypeParametersDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowGeneric" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Generic Type Parameters
    </text>

    {/* Box<T> definition */}
    <rect x="50" y="50" width="200" height="80" rx="8" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2"/>
    <text x="150" y="75" textAnchor="middle" fill="#a5b4fc" fontSize="12" fontWeight="bold">Generic Class</text>
    <text x="150" y="100" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="monospace">{'Box<T>'}</text>
    <text x="150" y="120" textAnchor="middle" fill="#94a3b8" fontSize="10">T = Type Parameter</text>

    {/* Arrow */}
    <line x1="250" y1="90" x2="320" y2="90" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowGeneric)"/>
    <text x="285" y="80" textAnchor="middle" fill="#94a3b8" fontSize="9">instantiate</text>

    {/* Box<String> */}
    <rect x="330" y="50" width="140" height="80" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold">{'Box<String>'}</text>
    <text x="400" y="95" textAnchor="middle" fill="#e2e8f0" fontSize="10">T = String</text>
    <text x="400" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">Type-safe!</text>

    {/* Box<Integer> */}
    <rect x="490" y="50" width="140" height="80" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="560" y="75" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">{'Box<Integer>'}</text>
    <text x="560" y="95" textAnchor="middle" fill="#e2e8f0" fontSize="10">T = Integer</text>
    <text x="560" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">Type-safe!</text>

    {/* Compile-time check */}
    <rect x="200" y="160" width="400" height="45" rx="8" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="400" y="187" textAnchor="middle" fill="#c4b5fd" fontSize="11">Compiler enforces type safety - no runtime casting needed</text>
  </svg>
)

const WildcardsDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Wildcard Types in Generics
    </text>

    {/* Unbounded Wildcard */}
    <rect x="50" y="50" width="200" height="90" rx="8" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2"/>
    <text x="150" y="75" textAnchor="middle" fill="#a5b4fc" fontSize="12" fontWeight="bold">Unbounded</text>
    <text x="150" y="100" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontFamily="monospace">{'List<?>'}</text>
    <text x="150" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">Any type</text>

    {/* Upper Bounded */}
    <rect x="300" y="50" width="200" height="90" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="bold">Upper Bounded</text>
    <text x="400" y="100" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontFamily="monospace">{'List<? extends T>'}</text>
    <text x="400" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">T or subtypes (Producer)</text>

    {/* Lower Bounded */}
    <rect x="550" y="50" width="200" height="90" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Lower Bounded</text>
    <text x="650" y="100" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontFamily="monospace">{'List<? super T>'}</text>
    <text x="650" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">T or supertypes (Consumer)</text>

    {/* PECS Rule */}
    <rect x="150" y="170" width="500" height="90" rx="8" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="195" textAnchor="middle" fill="#c4b5fd" fontSize="13" fontWeight="bold">PECS: Producer Extends, Consumer Super</text>
    <text x="400" y="220" textAnchor="middle" fill="#e2e8f0" fontSize="11">Use extends when you only GET values from a structure</text>
    <text x="400" y="240" textAnchor="middle" fill="#e2e8f0" fontSize="11">Use super when you only PUT values into a structure</text>
  </svg>
)

const BoundsDiagram = () => (
  <svg viewBox="0 0 800 260" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowBounds" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Type Bounds - Constraining Generic Types
    </text>

    {/* Class hierarchy */}
    <rect x="325" y="50" width="150" height="40" rx="8" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="bold">{'Comparable<T>'}</text>

    <line x1="400" y1="90" x2="400" y2="110" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowBounds)"/>

    <rect x="325" y="115" width="150" height="40" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="140" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold">Number</text>

    <line x1="320" y1="155" x2="250" y2="180" stroke="#22c55e" strokeWidth="1.5"/>
    <line x1="400" y1="155" x2="400" y2="180" stroke="#22c55e" strokeWidth="1.5"/>
    <line x1="480" y1="155" x2="550" y2="180" stroke="#22c55e" strokeWidth="1.5"/>

    <rect x="175" y="185" width="100" height="35" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="225" y="207" textAnchor="middle" fill="#fbbf24" fontSize="10">Integer</text>

    <rect x="350" y="185" width="100" height="35" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="400" y="207" textAnchor="middle" fill="#fbbf24" fontSize="10">Double</text>

    <rect x="525" y="185" width="100" height="35" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1.5"/>
    <text x="575" y="207" textAnchor="middle" fill="#fbbf24" fontSize="10">BigDecimal</text>

    {/* Bounded type explanation */}
    <text x="400" y="250" textAnchor="middle" fill="#94a3b8" fontSize="11">{'<T extends Number & Comparable<T>> accepts Integer, Double, BigDecimal'}</text>
  </svg>
)

const TypeErasureDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowErasure" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Type Erasure at Compile Time
    </text>

    {/* Before compilation */}
    <rect x="50" y="55" width="250" height="80" rx="8" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2"/>
    <text x="175" y="80" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="bold">Source Code</text>
    <text x="175" y="105" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="monospace">{'List<String> list'}</text>
    <text x="175" y="125" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="monospace">list.add("Hello")</text>

    {/* Arrow */}
    <line x1="300" y1="95" x2="370" y2="95" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowErasure)"/>
    <text x="335" y="85" textAnchor="middle" fill="#f87171" fontSize="9">erasure</text>

    {/* After compilation */}
    <rect x="380" y="55" width="250" height="80" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="505" y="80" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Bytecode</text>
    <text x="505" y="105" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="monospace">List list</text>
    <text x="505" y="125" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="monospace">list.add((Object)"Hello")</text>

    {/* Note */}
    <rect x="200" y="155" width="400" height="35" rx="6" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="400" y="178" textAnchor="middle" fill="#fbbf24" fontSize="10">Generic type info removed at runtime - compiler inserts casts</text>
  </svg>
)

const GenericMethodDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowMethod" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Generic Method Syntax
    </text>

    {/* Method structure */}
    <rect x="100" y="50" width="600" height="60" rx="8" fill="rgba(99, 102, 241, 0.15)" stroke="#6366f1" strokeWidth="2"/>

    <text x="150" y="85" textAnchor="middle" fill="#86efac" fontSize="12" fontFamily="monospace">{'<T>'}</text>
    <text x="250" y="85" textAnchor="middle" fill="#fbbf24" fontSize="12" fontFamily="monospace">T</text>
    <text x="350" y="85" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontFamily="monospace">findMax</text>
    <text x="500" y="85" textAnchor="middle" fill="#a5b4fc" fontSize="12" fontFamily="monospace">(T[] array)</text>

    {/* Labels */}
    <text x="150" y="140" textAnchor="middle" fill="#86efac" fontSize="10">Type</text>
    <text x="150" y="155" textAnchor="middle" fill="#86efac" fontSize="10">Parameter</text>

    <text x="250" y="140" textAnchor="middle" fill="#fbbf24" fontSize="10">Return</text>
    <text x="250" y="155" textAnchor="middle" fill="#fbbf24" fontSize="10">Type</text>

    <text x="350" y="140" textAnchor="middle" fill="#94a3b8" fontSize="10">Method</text>
    <text x="350" y="155" textAnchor="middle" fill="#94a3b8" fontSize="10">Name</text>

    <text x="500" y="140" textAnchor="middle" fill="#a5b4fc" fontSize="10">Parameters</text>
    <text x="500" y="155" textAnchor="middle" fill="#a5b4fc" fontSize="10">(using T)</text>

    {/* Arrows to labels */}
    <line x1="150" y1="110" x2="150" y2="125" stroke="#86efac" strokeWidth="1"/>
    <line x1="250" y1="110" x2="250" y2="125" stroke="#fbbf24" strokeWidth="1"/>
    <line x1="350" y1="110" x2="350" y2="125" stroke="#94a3b8" strokeWidth="1"/>
    <line x1="500" y1="110" x2="500" y2="125" stroke="#a5b4fc" strokeWidth="1"/>
  </svg>
)

const GenericClassDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Generic Class Structure
    </text>

    {/* Class box */}
    <rect x="200" y="45" width="400" height="150" rx="10" fill="rgba(99, 102, 241, 0.1)" stroke="#6366f1" strokeWidth="2"/>

    {/* Header */}
    <rect x="200" y="45" width="400" height="35" rx="10" fill="rgba(99, 102, 241, 0.3)"/>
    <text x="400" y="68" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">{'public class Pair<K, V>'}</text>

    {/* Fields */}
    <text x="220" y="100" fill="#86efac" fontSize="11" fontFamily="monospace">private K key;</text>
    <text x="220" y="120" fill="#86efac" fontSize="11" fontFamily="monospace">private V value;</text>

    {/* Methods */}
    <text x="220" y="145" fill="#fbbf24" fontSize="11" fontFamily="monospace">public K getKey() {'{'}...{'}'}</text>
    <text x="220" y="165" fill="#fbbf24" fontSize="11" fontFamily="monospace">public V getValue() {'{'}...{'}'}</text>
    <text x="220" y="185" fill="#a5b4fc" fontSize="11" fontFamily="monospace">{'public Pair<V, K> swap() {...}'}</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Generics({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)
  const [, setRefreshKey] = useState(0)
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [userCode, setUserCode] = useState('')
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    const handleProgressUpdate = () => setRefreshKey(prev => prev + 1)
    window.addEventListener('progressUpdate', handleProgressUpdate)
    return () => window.removeEventListener('progressUpdate', handleProgressUpdate)
  }, [])

  const openProblem = (problem) => { setSelectedProblem(problem); setUserCode(problem.starterCode); setShowSolution(false) }
  const closeProblem = () => { setSelectedProblem(null); setUserCode(''); setShowSolution(false) }

  const practiceProblems = [
    { id: 1, title: 'Generic Class', difficulty: 'Easy', description: 'Create a generic Pair<K,V> class that holds two values of different types.', example: 'Pair<String, Integer> pair = new Pair<>("age", 25)',
      instructions: `Create a generic Pair class.

**Requirements:**
1. Two type parameters K and V
2. Constructor, getters, setters
3. Override toString()`,
      starterCode: `public class Pair<K, V> {
    // TODO: Add fields for key and value
    
    // TODO: Constructor
    
    // TODO: Getters and setters
    
    // TODO: toString()
}

// Test:
// Pair<String, Integer> p = new Pair<>("age", 25);
// System.out.println(p);`,
      solution: `public class Pair<K, V> {
    private K key;
    private V value;
    
    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }
    
    public K getKey() { return key; }
    public V getValue() { return value; }
    public void setKey(K key) { this.key = key; }
    public void setValue(V value) { this.value = value; }
    
    @Override
    public String toString() {
        return "Pair{" + key + "=" + value + "}";
    }
}

// Usage:
Pair<String, Integer> age = new Pair<>("age", 25);
Pair<String, List<String>> tags = new Pair<>("tags", Arrays.asList("java", "generics"));`
    },
    { id: 2, title: 'Bounded Type Parameters', difficulty: 'Medium', description: 'Implement a generic method that only accepts Number subclasses.', example: '<T extends Number> double sum(List<T> numbers)',
      instructions: `Create bounded generic method.

**Requirements:**
1. Accept only Number types
2. Sum all numbers
3. Return double result`,
      starterCode: `import java.util.*;

public class NumberUtils {
    // TODO: Implement sum method with bounded type
    // <T extends Number> double sum(List<T> numbers)
    
    public static void main(String[] args) {
        List<Integer> ints = Arrays.asList(1, 2, 3);
        List<Double> doubles = Arrays.asList(1.5, 2.5);
        
        // System.out.println(sum(ints));    // 6.0
        // System.out.println(sum(doubles)); // 4.0
    }
}`,
      solution: `import java.util.*;

public class NumberUtils {
    public static <T extends Number> double sum(List<T> numbers) {
        double total = 0;
        for (T num : numbers) {
            total += num.doubleValue();
        }
        return total;
    }
    
    // Also works with multiple bounds:
    public static <T extends Number & Comparable<T>> T max(List<T> list) {
        if (list.isEmpty()) return null;
        T max = list.get(0);
        for (T item : list) {
            if (item.compareTo(max) > 0) max = item;
        }
        return max;
    }
    
    public static void main(String[] args) {
        List<Integer> ints = Arrays.asList(1, 2, 3);
        List<Double> doubles = Arrays.asList(1.5, 2.5);
        
        System.out.println(sum(ints));    // 6.0
        System.out.println(sum(doubles)); // 4.0
        System.out.println(max(ints));    // 3
    }
}`
    },
    { id: 3, title: 'Wildcard Usage', difficulty: 'Medium', description: 'Use wildcards to write a method that prints any list of objects.', example: 'void printList(List<?> list)',
      instructions: `Use wildcards correctly.

**Requirements:**
1. Unbounded wildcard for reading
2. Upper bounded for Number
3. Lower bounded for adding`,
      starterCode: `import java.util.*;

public class WildcardDemo {
    // TODO: Print any list (unbounded)
    // void printList(List<?> list)
    
    // TODO: Sum numbers (upper bounded)
    // double sumNumbers(List<? extends Number> list)
    
    // TODO: Add integers (lower bounded)
    // void addNumbers(List<? super Integer> list)
    
    public static void main(String[] args) {
        List<String> strings = Arrays.asList("a", "b");
        List<Integer> ints = Arrays.asList(1, 2, 3);
        List<Number> nums = new ArrayList<>();
    }
}`,
      solution: `import java.util.*;

public class WildcardDemo {
    // Unbounded: can read as Object
    static void printList(List<?> list) {
        for (Object item : list) {
            System.out.println(item);
        }
    }
    
    // Upper bounded: can read as Number
    static double sumNumbers(List<? extends Number> list) {
        double sum = 0;
        for (Number n : list) {
            sum += n.doubleValue();
        }
        return sum;
    }
    
    // Lower bounded: can add Integer
    static void addNumbers(List<? super Integer> list) {
        list.add(1);
        list.add(2);
        list.add(3);
    }
    
    public static void main(String[] args) {
        List<String> strings = Arrays.asList("a", "b");
        List<Integer> ints = Arrays.asList(1, 2, 3);
        List<Number> nums = new ArrayList<>();
        
        printList(strings);      // Works
        printList(ints);         // Works
        System.out.println(sumNumbers(ints)); // 6.0
        addNumbers(nums);        // Works: Number is super of Integer
    }
}`
    },
    { id: 4, title: 'Type Erasure Understanding', difficulty: 'Hard', description: 'Explain why List<String> and List<Integer> have the same runtime type.', example: 'Both become List at runtime due to type erasure',
      instructions: `Demonstrate type erasure.

**Requirements:**
1. Show runtime type equality
2. Explain limitations
3. Workarounds`,
      starterCode: `import java.util.*;

public class TypeErasureDemo {
    public static void main(String[] args) {
        List<String> strings = new ArrayList<>();
        List<Integer> integers = new ArrayList<>();
        
        // TODO: Compare runtime types
        // System.out.println(strings.getClass() == integers.getClass());
        
        // TODO: Why can't we do this?
        // if (obj instanceof List<String>) { }
        
        // TODO: How to preserve type info?
    }
}`,
      solution: `import java.util.*;
import java.lang.reflect.*;

public class TypeErasureDemo {
    public static void main(String[] args) {
        List<String> strings = new ArrayList<>();
        List<Integer> integers = new ArrayList<>();
        
        // Same runtime type due to erasure
        System.out.println(strings.getClass() == integers.getClass()); // true
        System.out.println(strings.getClass()); // class java.util.ArrayList
        
        // Cannot check generic type at runtime:
        // if (obj instanceof List<String>) { } // Compile error!
        
        // Workaround 1: Type tokens
        class TypeToken<T> {
            Type getType() {
                return ((ParameterizedType) getClass()
                    .getGenericSuperclass()).getActualTypeArguments()[0];
            }
        }
        
        // Workaround 2: Pass Class object
        static <T> List<T> createList(Class<T> type) {
            return new ArrayList<>();
        }
        
        // Workaround 3: Store type in wrapper
        class TypedList<T> {
            private List<T> list = new ArrayList<>();
            private Class<T> type;
            
            TypedList(Class<T> type) { this.type = type; }
            Class<T> getType() { return type; }
        }
    }
}`
    }
  ]

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'generic-classes',
      name: 'Generic Classes',
      icon: '📦',
      color: '#6366f1',
      description: 'Create reusable classes that work with any type while maintaining compile-time type safety.',
      diagram: GenericClassDiagram,
      details: [
        {
          name: 'Basic Box<T>',
          diagram: TypeParametersDiagram,
          explanation: 'A generic class uses type parameters (like T) to work with any type. Box<T> can store any object type while the compiler ensures type safety. When you create Box<String>, the compiler knows it only holds Strings - no casting needed and no ClassCastException at runtime.',
          codeExample: `// Generic Box class with type parameter T
public class Box<T> {
    private T value;

    public void set(T value) {
        this.value = value;
    }

    public T get() {
        return value;
    }

    public boolean isEmpty() {
        return value == null;
    }
}

// Usage examples - compiler enforces type safety
Box<Integer> intBox = new Box<>();
intBox.set(10);
System.out.println(intBox.get()); // Output: 10

Box<String> strBox = new Box<>();
strBox.set("Hello");
System.out.println(strBox.get()); // Output: Hello

// This won't compile - type safety!
// intBox.set("wrong type"); // Compile error!`
        },
        {
          name: 'Pair<K, V>',
          diagram: GenericClassDiagram,
          explanation: 'Generic classes can have multiple type parameters. Pair<K, V> stores two values of potentially different types. This is useful for returning multiple values from methods or creating map-like structures. The swap() method demonstrates creating a new Pair with reversed types.',
          codeExample: `// Generic Pair class with two type parameters
public class Pair<K, V> {
    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() { return key; }
    public V getValue() { return value; }
    public void setKey(K key) { this.key = key; }
    public void setValue(V value) { this.value = value; }

    // Swap creates a new Pair with reversed types
    public Pair<V, K> swap() {
        return new Pair<>(value, key);
    }

    @Override
    public String toString() {
        return "Pair{key=" + key + ", value=" + value + "}";
    }
}

// Usage:
Pair<String, Integer> pair = new Pair<>("age", 25);
System.out.println(pair); // Pair{key=age, value=25}

Pair<Integer, String> swapped = pair.swap();
System.out.println(swapped); // Pair{key=25, value=age}`
        },
        {
          name: 'Generic Stack',
          explanation: 'Generic data structures like Stack<T> provide type-safe collections. Using ArrayList internally gives dynamic sizing, while generics ensure you can only push/pop the declared type. This pattern is used throughout the Java Collections Framework.',
          codeExample: `// Generic Stack implementation
import java.util.ArrayList;
import java.util.EmptyStackException;

public class Stack<T> {
    private ArrayList<T> elements;

    public Stack() {
        elements = new ArrayList<>();
    }

    public void push(T item) {
        elements.add(item);
    }

    public T pop() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return elements.remove(elements.size() - 1);
    }

    public T peek() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return elements.get(elements.size() - 1);
    }

    public boolean isEmpty() {
        return elements.isEmpty();
    }

    public int size() {
        return elements.size();
    }
}

// Usage:
Stack<Integer> stack = new Stack<>();
stack.push(1);
stack.push(2);
stack.push(3);
System.out.println(stack.peek()); // 3
System.out.println(stack.pop());  // 3
System.out.println(stack.size()); // 2`
        }
      ]
    },
    {
      id: 'generic-methods',
      name: 'Generic Methods',
      icon: '⚡',
      color: '#22c55e',
      description: 'Write methods that work with different types independently of the class, with type inference at call site.',
      diagram: GenericMethodDiagram,
      details: [
        {
          name: 'Basic Syntax',
          diagram: GenericMethodDiagram,
          explanation: 'Generic methods declare their own type parameters before the return type. The syntax <T> declares T as a type parameter for this method only. The compiler infers the actual type from the arguments passed, so you rarely need to specify it explicitly.',
          codeExample: `// Generic method with type parameter
public class Utils {

    // Type parameter <T> declared before return type
    public static <T> void printArray(T[] array) {
        for (T element : array) {
            System.out.print(element + " ");
        }
        System.out.println();
    }

    // Multiple type parameters
    public static <K, V> void printPair(K key, V value) {
        System.out.println(key + " = " + value);
    }

    // Generic method in non-generic class
    public static <T> T getFirst(List<T> list) {
        if (list == null || list.isEmpty()) {
            return null;
        }
        return list.get(0);
    }
}

// Usage - type is inferred:
Integer[] nums = {1, 2, 3, 4, 5};
Utils.printArray(nums);  // Infers T as Integer

String[] words = {"Hello", "World"};
Utils.printArray(words); // Infers T as String

Utils.printPair("name", 42); // K=String, V=Integer`
        },
        {
          name: 'Find Maximum',
          diagram: BoundsDiagram,
          explanation: 'To compare elements, we need them to be Comparable. The bound <T extends Comparable<T>> ensures T has a compareTo() method. This bounded type parameter restricts which types can be used while enabling type-specific operations.',
          codeExample: `// Generic method with bounded type parameter
public static <T extends Comparable<T>> T findMax(T[] array) {
    if (array == null || array.length == 0) {
        throw new IllegalArgumentException("Array cannot be null or empty");
    }

    T max = array[0];
    for (int i = 1; i < array.length; i++) {
        if (array[i].compareTo(max) > 0) {
            max = array[i];
        }
    }
    return max;
}

// Usage with different Comparable types:
Integer[] nums = {1, 5, 3, 9, 2};
System.out.println(findMax(nums)); // Output: 9

String[] words = {"apple", "zebra", "banana"};
System.out.println(findMax(words)); // Output: zebra

Double[] doubles = {1.5, 3.14, 2.71};
System.out.println(findMax(doubles)); // Output: 3.14

// This won't compile - Object is not Comparable
// Object[] objs = {new Object()};
// findMax(objs); // Compile error!`
        },
        {
          name: 'Swap & Copy',
          explanation: 'Generic utility methods are common in libraries. Methods like swap() and copy() work with any array type. Note that generic arrays cannot be created directly in Java, but you can work with arrays passed as parameters.',
          codeExample: `public class ArrayUtils {

    // Swap elements at two positions
    public static <T> void swap(T[] array, int i, int j) {
        T temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    // Copy from source to destination
    public static <T> void copy(T[] source, T[] dest) {
        int length = Math.min(source.length, dest.length);
        for (int i = 0; i < length; i++) {
            dest[i] = source[i];
        }
    }

    // Fill array with a value
    public static <T> void fill(T[] array, T value) {
        for (int i = 0; i < array.length; i++) {
            array[i] = value;
        }
    }

    // Check if array contains element
    public static <T> boolean contains(T[] array, T target) {
        for (T element : array) {
            if (element.equals(target)) {
                return true;
            }
        }
        return false;
    }
}

// Usage:
String[] arr = {"A", "B", "C"};
ArrayUtils.swap(arr, 0, 2);
System.out.println(Arrays.toString(arr)); // [C, B, A]

Integer[] src = {1, 2, 3};
Integer[] dst = new Integer[3];
ArrayUtils.copy(src, dst);
System.out.println(Arrays.toString(dst)); // [1, 2, 3]`
        }
      ]
    },
    {
      id: 'type-bounds',
      name: 'Type Bounds',
      icon: '🔒',
      color: '#f59e0b',
      description: 'Constrain type parameters to specific class hierarchies using upper and lower bounds.',
      diagram: BoundsDiagram,
      details: [
        {
          name: 'Upper Bounds (extends)',
          diagram: BoundsDiagram,
          explanation: 'Upper bounds restrict T to be a specific type or its subtypes using "extends". This works for both classes and interfaces. You can read values from upper-bounded types but cannot safely add to collections (except null).',
          codeExample: `// Upper bound - T must be Number or subtype
public static <T extends Number> double sum(List<T> numbers) {
    double sum = 0;
    for (T num : numbers) {
        sum += num.doubleValue();
    }
    return sum;
}

// Multiple bounds - T must satisfy ALL bounds
public static <T extends Number & Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) > 0 ? a : b;
}

// Usage:
List<Integer> integers = Arrays.asList(1, 2, 3, 4, 5);
System.out.println(sum(integers)); // 15.0

List<Double> doubles = Arrays.asList(1.5, 2.5, 3.5);
System.out.println(sum(doubles)); // 7.5

System.out.println(max(10, 20)); // 20
System.out.println(max(3.14, 2.71)); // 3.14

// Won't compile - String is not a Number
// List<String> strings = Arrays.asList("a", "b");
// sum(strings); // Compile error!`
        },
        {
          name: 'Lower Bounds (super)',
          explanation: 'Lower bounds use "super" to accept a type or its supertypes. This is useful when you want to ADD elements to a collection. The PECS principle (Producer Extends, Consumer Super) guides when to use each.',
          codeExample: `// Lower bound - list can hold Integer or any supertype
public static void addNumbers(List<? super Integer> list) {
    // Can safely add Integer (or subtype)
    list.add(1);
    list.add(2);
    list.add(3);
}

// Copy from source (producer) to destination (consumer)
public static <T> void copy(List<? extends T> src,
                            List<? super T> dest) {
    for (T item : src) {
        dest.add(item);
    }
}

// Usage:
List<Number> numbers = new ArrayList<>();
addNumbers(numbers); // OK - Number is supertype of Integer
System.out.println(numbers); // [1, 2, 3]

List<Object> objects = new ArrayList<>();
addNumbers(objects); // OK - Object is supertype of Integer
System.out.println(objects); // [1, 2, 3]

// Copy example
List<Integer> source = Arrays.asList(1, 2, 3);
List<Number> destination = new ArrayList<>();
copy(source, destination);
System.out.println(destination); // [1, 2, 3]`
        },
        {
          name: 'PECS Principle',
          diagram: WildcardsDiagram,
          explanation: 'PECS stands for Producer Extends, Consumer Super. When you GET/read values from a structure (it produces), use "extends". When you PUT/write values to a structure (it consumes), use "super". This maximizes flexibility while maintaining type safety.',
          codeExample: `// PECS in action - flexible merge method
public static <T> List<T> merge(
        List<? extends T> producer1,  // READ from these
        List<? extends T> producer2,
        List<? super T> consumer) {   // WRITE to this

    List<T> result = new ArrayList<>();

    // Read from producers
    for (T item : producer1) {
        result.add(item);
        consumer.add(item);
    }
    for (T item : producer2) {
        result.add(item);
        consumer.add(item);
    }

    return result;
}

// Real-world example: Collections.copy()
// public static <T> void copy(List<? super T> dest,
//                             List<? extends T> src)

// Usage demonstrating flexibility:
List<Integer> ints = Arrays.asList(1, 2);
List<Double> doubles = Arrays.asList(3.0, 4.0);
List<Number> numberConsumer = new ArrayList<>();

// Integer and Double both extend Number
// Can read from both and write to Number list
List<Number> merged = merge(ints, doubles, numberConsumer);`
        }
      ]
    },
    {
      id: 'wildcards',
      name: 'Wildcards',
      icon: '❓',
      color: '#8b5cf6',
      description: 'Use wildcard types (?) for flexibility when the exact type parameter is unknown or irrelevant.',
      diagram: WildcardsDiagram,
      details: [
        {
          name: 'Unbounded Wildcard',
          diagram: WildcardsDiagram,
          explanation: 'The unbounded wildcard <?> means "any type". Use it when you do not care about the type parameter, only that a generic type is used. You can read as Object but cannot add anything (except null) since the actual type is unknown.',
          codeExample: `// Unbounded wildcard - works with any List
public static void printList(List<?> list) {
    for (Object item : list) {
        System.out.println(item);
    }
}

// Check if list is empty - type doesn't matter
public static boolean isEmpty(Collection<?> collection) {
    return collection == null || collection.isEmpty();
}

// Get size - type doesn't matter
public static int getSize(Collection<?> collection) {
    return collection == null ? 0 : collection.size();
}

// Usage:
List<String> strings = Arrays.asList("Hello", "World");
List<Integer> integers = Arrays.asList(1, 2, 3);
List<Double> doubles = Arrays.asList(1.1, 2.2);

printList(strings);  // Works with String
printList(integers); // Works with Integer
printList(doubles);  // Works with Double

// CANNOT add to List<?>
List<?> unknown = new ArrayList<String>();
// unknown.add("test"); // Compile error!
unknown.add(null);      // Only null is allowed`
        },
        {
          name: 'Upper Bounded Wildcard',
          explanation: 'List<? extends T> accepts T or any subtype. Use this when you need to READ from a collection but not write to it. Common in method parameters that process collections without modifying them.',
          codeExample: `// Upper bounded - accepts Number or any subtype
public static double sumOfList(List<? extends Number> list) {
    double sum = 0.0;
    for (Number num : list) {
        sum += num.doubleValue();
    }
    return sum;
}

// Process shapes - any subtype of Shape
public static void drawAll(List<? extends Shape> shapes) {
    for (Shape shape : shapes) {
        shape.draw();
    }
}

// Usage - works with any Number subtype:
List<Integer> ints = Arrays.asList(1, 2, 3);
List<Double> doubles = Arrays.asList(1.5, 2.5);
List<Long> longs = Arrays.asList(100L, 200L);

System.out.println(sumOfList(ints));    // 6.0
System.out.println(sumOfList(doubles)); // 4.0
System.out.println(sumOfList(longs));   // 300.0

// Reading is safe
List<? extends Number> nums = ints;
Number n = nums.get(0); // OK - read as Number

// Writing is NOT safe
// nums.add(1.0); // Compile error! Could be List<Integer>`
        },
        {
          name: 'Lower Bounded Wildcard',
          explanation: 'List<? super T> accepts T or any supertype. Use this when you need to WRITE to a collection. The compiler knows T and its subtypes can safely be added, though reads are limited to Object.',
          codeExample: `// Lower bounded - accepts Integer or any supertype
public static void addIntegers(List<? super Integer> list) {
    list.add(1);
    list.add(2);
    list.add(3);
}

// Add items to a consumer collection
public static <T> void populate(List<? super T> list, T... items) {
    for (T item : items) {
        list.add(item);
    }
}

// Usage - works with Integer, Number, or Object:
List<Integer> integers = new ArrayList<>();
List<Number> numbers = new ArrayList<>();
List<Object> objects = new ArrayList<>();

addIntegers(integers); // List<Integer> - direct match
addIntegers(numbers);  // List<Number> - supertype of Integer
addIntegers(objects);  // List<Object> - supertype of Integer

// Writing is safe
List<? super Integer> consumer = new ArrayList<Number>();
consumer.add(42);      // OK - Integer is compatible
consumer.add(100);     // OK

// Reading is limited to Object
Object obj = consumer.get(0); // Can only read as Object
// Integer i = consumer.get(0); // Compile error!`
        },
        {
          name: 'Wildcard Capture',
          explanation: 'Sometimes you need to "capture" a wildcard to use it. A helper method with a type parameter can capture the wildcard, allowing operations that would otherwise be impossible. This is called wildcard capture.',
          codeExample: `// Cannot swap directly with wildcards
public static void swapWrong(List<?> list, int i, int j) {
    // list.set(i, list.get(j)); // Compile error!
}

// Solution: Capture helper method
public static void swap(List<?> list, int i, int j) {
    swapHelper(list, i, j);
}

// Private helper captures the wildcard
private static <T> void swapHelper(List<T> list, int i, int j) {
    T temp = list.get(i);
    list.set(i, list.get(j));
    list.set(j, temp);
}

// Another example: reverse a list
public static void reverse(List<?> list) {
    reverseHelper(list);
}

private static <T> void reverseHelper(List<T> list) {
    int size = list.size();
    for (int i = 0; i < size / 2; i++) {
        T temp = list.get(i);
        list.set(i, list.get(size - 1 - i));
        list.set(size - 1 - i, temp);
    }
}

// Usage:
List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));
swap(list, 0, 2);
System.out.println(list); // [C, B, A]

reverse(list);
System.out.println(list); // [A, B, C]`
        }
      ]
    },
    {
      id: 'type-erasure',
      name: 'Type Erasure',
      icon: '🔄',
      color: '#ef4444',
      description: 'Understand how Java implements generics through type erasure and its implications.',
      diagram: TypeErasureDiagram,
      details: [
        {
          name: 'How Erasure Works',
          diagram: TypeErasureDiagram,
          explanation: 'Java generics use type erasure for backward compatibility. At compile time, the compiler verifies type safety, then removes (erases) generic type information. Type parameters are replaced with their bounds (or Object if unbounded). The compiler inserts casts where needed.',
          codeExample: `// What you write:
public class Box<T> {
    private T value;
    public void set(T value) { this.value = value; }
    public T get() { return value; }
}

Box<String> stringBox = new Box<>();
stringBox.set("Hello");
String s = stringBox.get();

// What the compiler generates (after erasure):
public class Box {
    private Object value;
    public void set(Object value) { this.value = value; }
    public Object get() { return value; }
}

Box stringBox = new Box();
stringBox.set("Hello");
String s = (String) stringBox.get(); // Compiler adds cast

// With bounded types:
public class NumberBox<T extends Number> {
    private T value;
}
// Becomes:
public class NumberBox {
    private Number value; // Bound becomes the erasure
}`
        },
        {
          name: 'Limitations',
          explanation: 'Type erasure creates several limitations: cannot use instanceof with generic types, cannot create generic arrays, cannot use primitives as type parameters, and generic type info is not available at runtime via reflection (for the most part).',
          codeExample: `// Cannot use instanceof with generic types
// public static <T> boolean isString(T obj) {
//     return obj instanceof T; // Compile error!
// }

// Cannot create generic arrays
// T[] array = new T[10]; // Compile error!

// Workaround using Object array:
@SuppressWarnings("unchecked")
public static <T> T[] createArray(int size) {
    return (T[]) new Object[size]; // Unsafe but works
}

// Better: use Array.newInstance
public static <T> T[] createArray(Class<T> type, int size) {
    @SuppressWarnings("unchecked")
    T[] array = (T[]) java.lang.reflect.Array.newInstance(type, size);
    return array;
}

// Cannot overload by generic type alone
// public void process(List<String> list) { }
// public void process(List<Integer> list) { } // Compile error!
// Both erase to process(List list)

// Primitives cannot be type parameters
// Box<int> intBox; // Compile error!
Box<Integer> intBox; // Use wrapper class`
        },
        {
          name: 'Bridge Methods',
          explanation: 'When a generic class is extended, the compiler generates bridge methods to preserve polymorphism. These synthetic methods ensure overriding works correctly despite type erasure by bridging between the erased and specific types.',
          codeExample: `// Generic interface
interface Comparable<T> {
    int compareTo(T other);
}

// Implementation with specific type
class MyString implements Comparable<MyString> {
    private String value;

    @Override
    public int compareTo(MyString other) {
        return this.value.compareTo(other.value);
    }
}

// After erasure, Comparable becomes:
// interface Comparable {
//     int compareTo(Object other);
// }

// Compiler generates a bridge method in MyString:
// public int compareTo(Object other) {  // Bridge
//     return compareTo((MyString) other);
// }

// This ensures polymorphism works:
Comparable c = new MyString();
c.compareTo(anotherMyString); // Calls bridge -> real method

// You can see bridge methods via reflection:
for (Method m : MyString.class.getDeclaredMethods()) {
    if (m.isBridge()) {
        System.out.println("Bridge: " + m);
    }
}`
        },
        {
          name: 'Reifiable Types',
          explanation: 'Reifiable types have full type information available at runtime. These include primitives, non-generic types, raw types, and unbounded wildcards. Non-reifiable types (most generics) lose type info at runtime, which affects instanceof and array creation.',
          codeExample: `// Reifiable types - full type info at runtime:
// - Primitives: int, double, etc.
// - Non-parameterized: String, Integer
// - Raw types: List, Map (not recommended)
// - Unbounded wildcards: List<?>

// Non-reifiable types - erased at runtime:
// - List<String>, Map<K,V>, etc.

// instanceof works with reifiable types:
Object obj = "Hello";
if (obj instanceof String) {       // OK
    System.out.println("String!");
}

List<String> list = new ArrayList<>();
if (list instanceof ArrayList) {   // OK - raw type check
    System.out.println("ArrayList!");
}
// if (list instanceof ArrayList<String>) // Error!

// Arrays of reifiable types are safe:
String[] strings = new String[10];  // OK

// Arrays of non-reifiable types cause issues:
// List<String>[] lists = new List<String>[10]; // Error!

// Workaround:
@SuppressWarnings("unchecked")
List<String>[] lists = (List<String>[]) new List[10];

// Or better, use List<List<String>>:
List<List<String>> listOfLists = new ArrayList<>();`
        }
      ]
    },
    {
      id: 'best-practices',
      name: 'Best Practices',
      icon: '✅',
      color: '#06b6d4',
      description: 'Guidelines for writing clean, effective generic code that is both flexible and type-safe.',
      details: [
        {
          name: 'Naming Conventions',
          explanation: 'Type parameter names follow conventions: E for Element (collections), K for Key, V for Value, T for Type (general), S/U/V for additional types, N for Number. Single uppercase letters distinguish type parameters from regular class names.',
          codeExample: `// Standard type parameter naming conventions:

// E - Element (used in collections)
public interface List<E> {
    void add(E element);
    E get(int index);
}

// K, V - Key, Value (used in maps)
public interface Map<K, V> {
    V put(K key, V value);
    V get(K key);
}

// T - Type (general purpose)
public class Box<T> {
    private T value;
}

// T, U, S - Multiple types
public class Triple<T, U, S> {
    private T first;
    private U second;
    private S third;
}

// N - Number
public class MathUtils<N extends Number> {
    public double toDouble(N number) {
        return number.doubleValue();
    }
}

// R - Return type
public interface Function<T, R> {
    R apply(T input);
}`
        },
        {
          name: 'Favor Generic Methods',
          explanation: 'Prefer generic methods over raw types or Object parameters. Generic methods provide type safety at compile time, eliminate the need for casting, and make the API more self-documenting. Use bounded type parameters when you need specific capabilities.',
          codeExample: `// Bad: Using raw types or Object
public static Object getFirst(List list) {
    return list.get(0);  // No type safety
}
String s = (String) getFirst(strings); // Requires cast

// Good: Generic method
public static <T> T getFirst(List<T> list) {
    return list.get(0);  // Type-safe
}
String s = getFirst(strings); // No cast needed

// Bad: Separate methods for each type
public static int maxInt(int a, int b) { return a > b ? a : b; }
public static double maxDouble(double a, double b) { return a > b ? a : b; }

// Good: Single generic method
public static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) > 0 ? a : b;
}

// Works with any Comparable type
Integer maxInt = max(10, 20);
String maxStr = max("apple", "banana");
LocalDate maxDate = max(date1, date2);`
        },
        {
          name: 'API Design',
          explanation: 'Design flexible APIs using PECS (Producer Extends, Consumer Super). Accept the most general type that works, return the most specific type possible. Avoid raw types in public APIs.',
          codeExample: `// Flexible API using PECS
public class Collections {

    // Source is producer (extends), dest is consumer (super)
    public static <T> void copy(List<? super T> dest,
                                List<? extends T> src) {
        for (T item : src) {
            dest.add(item);
        }
    }

    // Accept subtypes when reading
    public static <T extends Comparable<? super T>>
            void sort(List<T> list) {
        // T must be comparable to T or a supertype of T
        // This allows sorting List<Integer> even though
        // Integer implements Comparable<Integer>
    }

    // Return specific type, accept general input
    public static <T> List<T> createList(T... elements) {
        return new ArrayList<>(Arrays.asList(elements));
    }
}

// Use bounded wildcards in parameters
public interface Repository<T> {
    void saveAll(Collection<? extends T> entities);
    void loadInto(Collection<? super T> destination);
}

// Avoid exposing wildcards in return types
// Bad: List<?> getItems()
// Good: List<Item> getItems()`
        },
        {
          name: 'Avoid Raw Types',
          explanation: 'Never use raw types in new code. Raw types exist only for backward compatibility with pre-generics code. Always specify type parameters to get compile-time type checking. Use <?> if you truly do not care about the type.',
          codeExample: `// Bad: Raw types - no compile-time safety
List list = new ArrayList();
list.add("string");
list.add(123); // No error at compile time
String s = (String) list.get(1); // ClassCastException!

// Good: Parameterized types - compile-time safety
List<String> list = new ArrayList<>();
list.add("string");
// list.add(123); // Compile error!
String s = list.get(0); // No cast needed

// When you don't know the type, use wildcard
public static void printCollection(Collection<?> c) {
    for (Object o : c) {
        System.out.println(o);
    }
}

// If you need the raw type for instanceof:
if (obj instanceof Set) {  // OK - raw type in instanceof
    Set<?> set = (Set<?>) obj;  // Use wildcard for variable
}

// Class literals use raw type (the only exception)
Class<List> listClass = List.class; // Not List<String>.class

// Suppress warnings when using legacy APIs
@SuppressWarnings("unchecked")
List<String> legacy = legacyMethodReturningRawList();`
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
      { name: 'Java', icon: '☕', page: 'Java' },
      { name: 'Generics', icon: '📦', page: 'Generics' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index, item) => {
    if (index === 0) {
      onBack()
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)
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
    background: 'var(--bg-gradient)',
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
    color: '#a5b4fc',
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
        <h1 style={titleStyle}>Java Generics</h1>
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
          ← Back to Java
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={GENERICS_COLORS}
        />
      </div>

      {/* Intro text */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem', textAlign: 'center' }}>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: '1.6' }}>
          Master Java generics for type-safe and reusable code. Generics enable you to write
          classes and methods that work with any type while catching type errors at compile time.
        </p>
      </div>

      {/* Practice Exercises Section */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem', background: 'rgba(15, 23, 42, 0.8)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
        <h2 style={{ color: '#6366f1', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span>📝</span> Practice Exercises</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>Click on an exercise to practice. Complete the code challenge and mark as done.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {practiceProblems.map((problem) => {
            const problemId = `Generics-${problem.id}`
            const isCompleted = isProblemCompleted(problemId)
            return (
              <div key={problem.id} onClick={() => openProblem(problem)} style={{ background: isCompleted ? 'rgba(34, 197, 94, 0.1)' : 'rgba(30, 41, 59, 0.8)', borderRadius: '0.75rem', padding: '1rem', border: `1px solid ${isCompleted ? '#22c55e' : '#334155'}`, cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.2)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = isCompleted ? '#22c55e' : '#334155'; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h4 style={{ color: '#e2e8f0', margin: 0, fontSize: '0.95rem' }}>{problem.title}</h4>
                  <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '600', backgroundColor: problem.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.2)' : problem.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: problem.difficulty === 'Easy' ? '#22c55e' : problem.difficulty === 'Medium' ? '#f59e0b' : '#ef4444' }}>{problem.difficulty}</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0.5rem 0', lineHeight: '1.4' }}>{problem.description}</p>
                <p style={{ color: '#64748b', fontSize: '0.75rem', margin: '0.5rem 0', fontStyle: 'italic' }}>{problem.example}</p>
                <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6366f1', fontSize: '0.8rem', fontWeight: '500' }}>Click to practice →</span>
                  <div onClick={(e) => e.stopPropagation()}><CompletionCheckbox problemId={problemId} compact /></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Practice Problem Modal */}
      {selectedProblem && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }} onClick={closeProblem}>
          <div style={{ backgroundColor: '#1f2937', borderRadius: '1rem', width: '95vw', maxWidth: '1400px', height: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '2px solid #6366f1' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h2 style={{ color: '#e2e8f0', margin: 0, fontSize: '1.5rem' }}>{selectedProblem.title}</h2>
                <span style={{ padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', backgroundColor: selectedProblem.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.2)' : selectedProblem.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: selectedProblem.difficulty === 'Easy' ? '#22c55e' : selectedProblem.difficulty === 'Medium' ? '#f59e0b' : '#ef4444' }}>{selectedProblem.difficulty}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <CompletionCheckbox problemId={`Generics-${selectedProblem.id}`} compact />
                <button onClick={closeProblem} style={{ padding: '0.5rem 1rem', backgroundColor: '#374151', color: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>✕ Close</button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem', borderRight: '1px solid #374151', overflowY: 'auto' }}>
                <h3 style={{ color: '#6366f1', marginTop: 0, marginBottom: '1rem' }}>📋 Instructions</h3>
                <div style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{selectedProblem.instructions.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} style={{ color: '#e2e8f0' }}>{part}</strong> : part)}</div>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedProblem.solution) }} style={{ padding: '0.5rem 1rem', backgroundColor: showSolution ? '#ef4444' : '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>{showSolution ? '🔒 Hide Solution' : '💡 Show Solution'}</button>
                  <button onClick={() => { setUserCode(selectedProblem.starterCode); setShowSolution(false) }} style={{ padding: '0.5rem 1rem', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>🔄 Reset Code</button>
                  <button onClick={() => navigator.clipboard.writeText(userCode)} style={{ padding: '0.5rem 1rem', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>📋 Copy Code</button>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                  <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'Consolas, Monaco, "Courier New", monospace', fontSize: '0.9rem', backgroundColor: '#111827', color: '#e2e8f0', border: '1px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5' }} spellCheck={false} />
                </div>
                <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.75rem', marginBottom: 0 }}>💡 Copy this code to your IDE to run and test. Mark as complete when you've solved it!</p>
              </div>
            </div>
          </div>
        </div>
      )}

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
              {concept.details.length} topics - Click to explore
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
              colors={GENERICS_COLORS}
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

export default Generics

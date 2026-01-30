/**
 * Java 24 Preview Features
 *
 * Covers new Java 24 features including Module Import Declarations,
 * Scoped Values, Stream Gatherers, and Class-File API.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const JAVA24_COLORS = {
  primary: '#14b8a6',
  primaryHover: '#2dd4bf',
  bg: 'rgba(20, 184, 166, 0.1)',
  border: 'rgba(20, 184, 166, 0.3)',
  arrow: '#14b8a6',
  hoverBg: 'rgba(20, 184, 166, 0.2)',
  topicBg: 'rgba(20, 184, 166, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const ModuleImportDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowTeal" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#14b8a6" />
      </marker>
      <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0d9488" />
        <stop offset="100%" stopColor="#14b8a6" />
      </linearGradient>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Module Import Declarations Flow
    </text>

    <rect x="50" y="60" width="140" height="60" rx="8" fill="url(#tealGrad)" stroke="#2dd4bf" strokeWidth="2"/>
    <text x="120" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">import module</text>
    <text x="120" y="102" textAnchor="middle" fill="white" fontSize="10">java.base</text>

    <rect x="280" y="60" width="140" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="350" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Module System</text>
    <text x="350" y="102" textAnchor="middle" fill="white" fontSize="10">Resolves All Types</text>

    <rect x="510" y="45" width="140" height="30" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="580" y="65" textAnchor="middle" fill="white" fontSize="10">List, Map, Set</text>

    <rect x="510" y="85" width="140" height="30" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="580" y="105" textAnchor="middle" fill="white" fontSize="10">Stream, Optional</text>

    <rect x="510" y="125" width="140" height="30" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="580" y="145" textAnchor="middle" fill="white" fontSize="10">Path, Files</text>

    <line x1="190" y1="90" x2="275" y2="90" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowTeal)"/>
    <line x1="420" y1="75" x2="505" y2="60" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowTeal)"/>
    <line x1="420" y1="90" x2="505" y2="100" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowTeal)"/>
    <line x1="420" y1="105" x2="505" y2="140" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowTeal)"/>

    <text x="232" y="80" textAnchor="middle" fill="#94a3b8" fontSize="9">declares</text>
    <text x="700" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">All Available!</text>
  </svg>
)

const ScopedValueDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      ScopedValue vs ThreadLocal
    </text>

    <rect x="50" y="50" width="300" height="150" rx="10" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="2"/>
    <text x="200" y="75" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">ThreadLocal (Old)</text>

    <rect x="70" y="90" width="260" height="25" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
    <text x="200" y="107" textAnchor="middle" fill="#94a3b8" fontSize="10">set() - Manual setup</text>

    <rect x="70" y="125" width="260" height="25" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
    <text x="200" y="142" textAnchor="middle" fill="#94a3b8" fontSize="10">get() - Access value</text>

    <rect x="70" y="160" width="260" height="25" rx="4" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="1"/>
    <text x="200" y="177" textAnchor="middle" fill="#fca5a5" fontSize="10">remove() - Must remember!</text>

    <rect x="450" y="50" width="300" height="150" rx="10" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="600" y="75" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">ScopedValue (New)</text>

    <rect x="470" y="90" width="260" height="25" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
    <text x="600" y="107" textAnchor="middle" fill="#94a3b8" fontSize="10">where(key, value) - Bind</text>

    <rect x="470" y="125" width="260" height="25" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
    <text x="600" y="142" textAnchor="middle" fill="#94a3b8" fontSize="10">{`.run(() -> ...) - Scoped execution`}</text>

    <rect x="470" y="160" width="260" height="25" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="600" y="177" textAnchor="middle" fill="#86efac" fontSize="10">Automatic cleanup!</text>

    <text x="400" y="215" textAnchor="middle" fill="#14b8a6" fontSize="11" fontWeight="bold">
      Immutable + Auto-cleanup = Better!
    </text>
  </svg>
)

const StreamGatherersDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Stream Gatherers - Custom Intermediate Operations
    </text>

    <rect x="30" y="60" width="100" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="80" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Stream</text>

    <rect x="180" y="60" width="120" height="40" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="240" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">.gather()</text>

    <rect x="350" y="45" width="140" height="70" rx="8" fill="rgba(20, 184, 166, 0.2)" stroke="#14b8a6" strokeWidth="2"/>
    <text x="420" y="68" textAnchor="middle" fill="#14b8a6" fontSize="10" fontWeight="bold">Gatherer</text>
    <text x="420" y="85" textAnchor="middle" fill="#94a3b8" fontSize="9">windowFixed(n)</text>
    <text x="420" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">windowSliding(n)</text>

    <rect x="540" y="60" width="100" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="590" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">.map()</text>

    <rect x="690" y="60" width="80" height="40" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="730" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Result</text>

    <line x1="130" y1="80" x2="175" y2="80" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreen)"/>
    <line x1="300" y1="80" x2="345" y2="80" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreen)"/>
    <line x1="490" y1="80" x2="535" y2="80" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreen)"/>
    <line x1="640" y1="80" x2="685" y2="80" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreen)"/>

    <rect x="150" y="130" width="500" height="50" rx="8" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="400" y="152" textAnchor="middle" fill="#a78bfa" fontSize="10">{`
      [1,2,3,4,5,6] -&gt; windowFixed(2) -&gt; [[1,2], [3,4], [5,6]] -&gt; map(sum) -&gt; [3, 7, 11]
    `}</text>
    <text x="400" y="170" textAnchor="middle" fill="#94a3b8" fontSize="9">Custom stateful operations in a single pipeline pass</text>
  </svg>
)

const ClassFileApiDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowAmber" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Class-File API - Standard Bytecode Manipulation
    </text>

    <rect x="50" y="55" width="130" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="115" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">.class File</text>
    <text x="115" y="97" textAnchor="middle" fill="white" fontSize="9">Raw Bytecode</text>

    <rect x="250" y="55" width="130" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="315" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">ClassFile.of()</text>
    <text x="315" y="97" textAnchor="middle" fill="white" fontSize="9">.parse(bytes)</text>

    <rect x="450" y="55" width="130" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="515" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">ClassModel</text>
    <text x="515" y="97" textAnchor="middle" fill="white" fontSize="9">High-Level API</text>

    <rect x="650" y="55" width="100" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="700" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Transform</text>
    <text x="700" y="97" textAnchor="middle" fill="white" fontSize="9">or Build</text>

    <line x1="180" y1="85" x2="245" y2="85" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowAmber)"/>
    <line x1="380" y1="85" x2="445" y2="85" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowAmber)"/>
    <line x1="580" y1="85" x2="645" y2="85" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowAmber)"/>

    <rect x="100" y="145" width="600" height="60" rx="8" fill="rgba(20, 184, 166, 0.1)" stroke="#14b8a6" strokeWidth="2"/>
    <text x="400" y="168" textAnchor="middle" fill="#14b8a6" fontSize="11" fontWeight="bold">
      Replaces: ASM, ByteBuddy, Javassist, BCEL
    </text>
    <text x="400" y="188" textAnchor="middle" fill="#94a3b8" fontSize="10">
      Built into JDK - Always up-to-date with latest bytecode features
    </text>
  </svg>
)

const SimplifiedImportsDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Traditional vs Module Import
    </text>

    <rect x="50" y="45" width="300" height="120" rx="8" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="2"/>
    <text x="200" y="70" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">Traditional Imports</text>
    <text x="200" y="90" textAnchor="middle" fill="#94a3b8" fontSize="9">import java.util.List;</text>
    <text x="200" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">import java.util.Map;</text>
    <text x="200" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">import java.util.ArrayList;</text>
    <text x="200" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">import java.io.Files;</text>
    <text x="200" y="150" textAnchor="middle" fill="#94a3b8" fontSize="9">... (many more)</text>

    <rect x="450" y="45" width="300" height="120" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="600" y="70" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">Module Import (Java 24)</text>
    <text x="600" y="105" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">import module java.base;</text>
    <text x="600" y="135" textAnchor="middle" fill="#94a3b8" fontSize="10">All java.base APIs available!</text>
  </svg>
)

const PerformanceBenefitsDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      ScopedValue Performance with Virtual Threads
    </text>

    <rect x="50" y="50" width="200" height="100" rx="8" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="2"/>
    <text x="150" y="75" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">ThreadLocal</text>
    <text x="150" y="100" textAnchor="middle" fill="#94a3b8" fontSize="10">Memory overhead per thread</text>
    <text x="150" y="120" textAnchor="middle" fill="#94a3b8" fontSize="10">Manual cleanup required</text>
    <text x="150" y="140" textAnchor="middle" fill="#fca5a5" fontSize="10">Scales poorly</text>

    <rect x="300" y="50" width="200" height="100" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">ScopedValue</text>
    <text x="400" y="100" textAnchor="middle" fill="#94a3b8" fontSize="10">10x lower memory</text>
    <text x="400" y="120" textAnchor="middle" fill="#94a3b8" fontSize="10">Automatic cleanup</text>
    <text x="400" y="140" textAnchor="middle" fill="#86efac" fontSize="10">Millions of threads!</text>

    <rect x="550" y="50" width="200" height="100" rx="8" fill="rgba(20, 184, 166, 0.1)" stroke="#14b8a6" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="#14b8a6" fontSize="11" fontWeight="bold">Virtual Threads</text>
    <text x="650" y="100" textAnchor="middle" fill="#94a3b8" fontSize="10">1,000,000 concurrent</text>
    <text x="650" y="120" textAnchor="middle" fill="#94a3b8" fontSize="10">~0.005ms per task</text>
    <text x="650" y="140" textAnchor="middle" fill="#2dd4bf" fontSize="10">Perfect match!</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Java24({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'module-imports',
      name: 'Module Import Declarations',
      icon: '📦',
      color: '#8b5cf6',
      description: 'Import entire modules with a single declaration instead of individual types. Simplifies code with reduced boilerplate.',
      diagram: ModuleImportDiagram,
      details: [
        {
          name: 'Simplified Imports',
          diagram: SimplifiedImportsDiagram,
          explanation: 'Import entire modules with a single declaration instead of individual types. Use "import module java.base" to access all public APIs. All module classes become available without explicit imports. This is a preview feature in Java 24 requiring --enable-preview flag.',
          codeExample: `// Java 24 Preview: Module Import Declarations
// Compile with: javac --enable-preview --release 24 ModuleImportExample.java

// Traditional way - verbose
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

// NEW: Module import (Preview)
import module java.base;  // All java.base APIs available!

public class ModuleImportExample {
    public static void main(String[] args) throws IOException {
        // No need for explicit imports - module import covers all
        List<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");

        Map<String, Integer> ages = new HashMap<>();
        ages.put("Alice", 30);
        ages.put("Bob", 25);

        // File operations without importing Path, Files
        Path tempFile = Files.createTempFile("test", ".txt");
        Files.writeString(tempFile, "Module imports rock!");
        String content = Files.readString(tempFile);

        System.out.println("Names: " + names);
        System.out.println("Ages: " + ages);
        System.out.println("File content: " + content);
    }
}`
        },
        {
          name: 'Namespace Access',
          explanation: 'All types from an imported module become available as if individually imported. No need for fully qualified names like java.util.List. Use List, Map, Stream, Optional directly in your code. Full compile-time type checking is maintained.',
          codeExample: `// Namespace Access with Module Imports
import module java.base;  // All java.base types available

public class NamespaceExample {
    // Use any type from java.base without explicit imports
    private final Map<String, List<String>> data = new HashMap<>();
    private final Optional<String> result;
    private final CompletableFuture<Integer> future;

    public NamespaceExample() {
        // Collections API
        data.put("fruits", Arrays.asList("apple", "banana", "orange"));
        data.put("colors", List.of("red", "green", "blue"));

        // Optional and Stream API
        result = data.values().stream()
            .flatMap(List::stream)
            .filter(s -> s.startsWith("a"))
            .findFirst();

        // Concurrent API
        future = CompletableFuture.supplyAsync(() -> 42);
    }

    public void demonstrate() {
        // All types accessible without qualification
        StringBuilder sb = new StringBuilder();
        Pattern pattern = Pattern.compile("\\\\w+");
        Duration duration = Duration.ofSeconds(5);

        System.out.println("Result: " + result.orElse("none"));
        System.out.println("Future: " + future.join());
    }
}`
        },
        {
          name: 'Conflict Resolution',
          explanation: 'Clear precedence rules determine which import wins when names conflict. Explicit single-type imports have highest priority, followed by on-demand package imports, then module imports. Fully qualified names always work regardless of imports.',
          codeExample: `// Conflict Resolution with Module Imports
import module java.base;

// Explicit import takes precedence over module import
import java.util.List;        // Explicit: highest priority
import java.util.*;           // On-demand: medium priority
// module java.base           // Module import: lowest priority

public class ConflictResolution {
    public static void main(String[] args) {
        // Uses java.util.List (explicit import wins)
        List<String> standardList = new ArrayList<>();
        standardList.add("Using java.util.List");

        // Use fully qualified name for custom class
        com.example.List<Integer> customList =
            new com.example.List<>(1, 2, 3);

        // All other java.base types available via module import
        Map<String, String> map = new HashMap<>();
        Set<Integer> set = new HashSet<>();
        Optional<String> opt = Optional.of("value");

        // Precedence rules:
        // 1. Explicit single-type import (import java.util.List)
        // 2. On-demand package import (import java.util.*)
        // 3. Module import (import module java.base)
    }
}`
        },
        {
          name: 'Use Cases',
          explanation: 'Module imports shine in educational code where students focus on logic rather than import management. Perfect for rapid prototyping, scripting, and REPL environments. Also useful in production for large module APIs when using many classes from the same module.',
          codeExample: `// Use Cases for Module Imports

// Use Case 1: Educational Code - Simpler for learners
import module java.base;

public class StudentExample {
    public static void main(String[] args) {
        // No import clutter - students focus on logic
        List<String> courses = Arrays.asList("Math", "Physics", "CS");
        Map<String, Integer> grades = new HashMap<>();

        courses.forEach(course -> grades.put(course, 85));
        System.out.println("Grades: " + grades);
    }
}

// Use Case 2: Scripting and Quick Prototyping
import module java.base;

public class QuickScript {
    public static void main(String[] args) throws Exception {
        // Rapid prototyping without import management
        var data = Files.readString(Path.of("data.txt"));
        var lines = data.lines()
            .filter(line -> !line.isBlank())
            .map(String::trim)
            .collect(Collectors.toList());

        var stats = lines.stream()
            .mapToInt(String::length)
            .summaryStatistics();

        System.out.printf("Lines: %d, Avg length: %.1f%n",
            stats.getCount(), stats.getAverage());
    }
}`
        },
        {
          name: 'Preview Status',
          explanation: 'Module import declarations are a preview feature in Java 24. Requires --enable-preview flag for compilation and execution. Subject to change based on community feedback. Not recommended for production use until standardized.',
          codeExample: `// Module Import Declarations - Preview Feature Status

// Compile with preview features enabled:
// javac --enable-preview --release 24 PreviewExample.java
// java --enable-preview PreviewExample

import module java.base;  // PREVIEW in Java 24

public class PreviewExample {
    public static void main(String[] args) {
        System.out.println("Java Version: " +
            Runtime.version());

        System.out.println("Preview Features: " +
            (Runtime.version().feature() >= 24 ? "Enabled" : "Disabled"));

        // Using module import (preview feature)
        List<String> features = List.of(
            "Module Import Declarations",
            "Simplified API access",
            "Reduced boilerplate",
            "Better scripting support"
        );

        System.out.println("\\nJava 24 Preview Features:");
        features.forEach(f -> System.out.println("  - " + f));

        // Module imports are part of ongoing improvements to:
        // 1. Make Java more accessible for beginners
        // 2. Improve scripting and prototyping experience
        // 3. Reduce boilerplate in module-heavy projects
    }
}`
        }
      ]
    },
    {
      id: 'scoped-values',
      name: 'Scoped Values',
      icon: '🔐',
      color: '#3b82f6',
      description: 'Better alternative to ThreadLocal for sharing immutable data across threads with automatic lifecycle management.',
      diagram: ScopedValueDiagram,
      details: [
        {
          name: 'Better Than ThreadLocal',
          diagram: ScopedValueDiagram,
          explanation: 'Scoped values solve ThreadLocal problems with immutable by design values that cannot be changed once set. Automatic cleanup eliminates memory leaks from forgotten remove() calls. Optimized for virtual threads with much lower overhead.',
          codeExample: `// Scoped Values vs ThreadLocal (Preview)
import java.lang.ScopedValue;
import java.util.concurrent.*;

public class ScopedValueVsThreadLocal {
    // OLD: ThreadLocal - mutable, manual cleanup required
    private static final ThreadLocal<String> oldUserId =
        new ThreadLocal<>();

    // NEW: ScopedValue - immutable, automatic cleanup (Preview)
    private static final ScopedValue<String> userId =
        ScopedValue.newInstance();

    public static void main(String[] args) throws InterruptedException {
        // ThreadLocal approach - problematic
        demonstrateThreadLocal();

        // ScopedValue approach - better
        demonstrateScopedValue();
    }

    static void demonstrateThreadLocal() {
        oldUserId.set("user123");
        try {
            processRequest();  // Uses ThreadLocal
        } finally {
            oldUserId.remove();  // Must manually clean up!
        }
    }

    static void demonstrateScopedValue() {
        // Automatic cleanup when scope ends
        ScopedValue.where(userId, "user456")
            .run(() -> processRequest());
        // userId automatically unavailable here
    }

    static void processRequest() {
        String user = userId.orElse("none");
        System.out.println("ScopedValue user: " + user);
        logAudit();
    }

    static void logAudit() {
        String user = userId.orElse("unknown");
        System.out.println("Audit log for: " + user);
    }
}`
        },
        {
          name: 'Immutable Sharing',
          explanation: 'Values are set once and cannot be modified within their scope. No mutation bugs possible since values stay constant throughout the scope. Thread-safe sharing without synchronization. Records work great as scoped values.',
          codeExample: `// Immutable Context Sharing with Scoped Values
import java.lang.ScopedValue;

public record RequestContext(
    String requestId,
    String userId,
    long timestamp
) {}

public class ImmutableSharing {
    private static final ScopedValue<RequestContext> context =
        ScopedValue.newInstance();

    public static void main(String[] args) {
        RequestContext req = new RequestContext(
            "req-12345",
            "alice",
            System.currentTimeMillis()
        );

        // Set immutable context for scope
        ScopedValue.where(context, req)
            .run(() -> {
                handleRequest();
                processData();
                saveResults();
            });
        // Context automatically cleared here
    }

    static void handleRequest() {
        RequestContext ctx = context.get();
        System.out.println("Handling request: " + ctx.requestId());
        System.out.println("User: " + ctx.userId());
        // Cannot modify - immutable!
    }

    static void processData() {
        RequestContext ctx = context.get();
        System.out.println("Processing for " + ctx.userId());
    }

    static void saveResults() {
        RequestContext ctx = context.get();
        System.out.println("Saving results for: " + ctx.requestId());
    }
}`
        },
        {
          name: 'Performance Benefits',
          diagram: PerformanceBenefitsDiagram,
          explanation: 'Designed specifically for virtual threads and high-concurrency workloads. Zero cleanup cost with automatic scope-based release. 10x lower memory overhead per thread compared to ThreadLocal. Scales to millions of virtual threads.',
          codeExample: `// Performance with Virtual Threads
import java.lang.ScopedValue;
import java.util.concurrent.*;

public class PerformanceBenchmark {
    private static final ScopedValue<String> scopedId =
        ScopedValue.newInstance();

    public static void main(String[] args) throws InterruptedException {
        // Virtual threads + ScopedValue = Optimal
        benchmarkVirtualThreads();
    }

    static void benchmarkVirtualThreads() throws InterruptedException {
        int numTasks = 1_000_000;  // One million tasks!

        try (var executor =
                Executors.newVirtualThreadPerTaskExecutor()) {

            long start = System.currentTimeMillis();

            for (int i = 0; i < numTasks; i++) {
                final int taskId = i;
                executor.submit(() -> {
                    // Each task has its own scoped context
                    ScopedValue.where(scopedId, "task-" + taskId)
                        .run(() -> {
                            doWork();
                            // No cleanup needed!
                        });
                });
            }

            executor.shutdown();
            executor.awaitTermination(1, TimeUnit.MINUTES);

            long elapsed = System.currentTimeMillis() - start;
            System.out.printf("Processed %,d tasks in %,d ms%n",
                numTasks, elapsed);
        }
        // Benefits: No memory leaks, low overhead, scales to millions
    }

    static void doWork() {
        String id = scopedId.get();
        // Simulate work
    }
}`
        },
        {
          name: 'API Design',
          explanation: 'Clean, readable fluent API for defining value scopes. ScopedValue.newInstance() creates a new key. where(key, value) binds value to key. run(() -> ...) executes code with bound value. get() accesses current value in scope.',
          codeExample: `// ScopedValue API Patterns
import java.lang.ScopedValue;

public class ApiPatterns {
    private static final ScopedValue<String> userId =
        ScopedValue.newInstance();
    private static final ScopedValue<String> tenantId =
        ScopedValue.newInstance();
    private static final ScopedValue<Integer> requestLevel =
        ScopedValue.newInstance();

    public static void main(String[] args) {
        demonstrateBasicAPI();
        demonstrateNestedScopes();
        demonstrateMultipleValues();
    }

    static void demonstrateBasicAPI() {
        System.out.println("=== Basic API ===");
        ScopedValue.where(userId, "alice")
            .run(() -> {
                System.out.println("User: " + userId.get());
            });
        // Value unavailable outside scope
        System.out.println("User outside: " + userId.orElse("none"));
    }

    static void demonstrateNestedScopes() {
        System.out.println("\\n=== Nested Scopes ===");
        ScopedValue.where(userId, "bob")
            .run(() -> {
                System.out.println("Outer scope: " + userId.get());
                // Inner scope with different value
                ScopedValue.where(userId, "charlie")
                    .run(() -> {
                        System.out.println("Inner scope: " + userId.get());
                    });
                // Outer scope restored
                System.out.println("Back to outer: " + userId.get());
            });
    }

    static void demonstrateMultipleValues() {
        System.out.println("\\n=== Multiple Values ===");
        ScopedValue.where(userId, "alice")
            .where(tenantId, "tenant-123")
            .where(requestLevel, 1)
            .run(() -> {
                System.out.println("User: " + userId.get());
                System.out.println("Tenant: " + tenantId.get());
                System.out.println("Level: " + requestLevel.get());
            });
    }
}`
        },
        {
          name: 'Migration Path',
          explanation: 'Step-by-step guide for modernizing code from ThreadLocal to ScopedValue. Identify candidates holding immutable context data. Replace ThreadLocal with ScopedValue, convert set/get to where/run pattern, and remove manual cleanup calls.',
          codeExample: `// Migrating from ThreadLocal to ScopedValue

// BEFORE: ThreadLocal (old approach)
class LegacyContextManager {
    private static final ThreadLocal<UserContext> context =
        new ThreadLocal<>();

    static class UserContext {
        String userId;
        String sessionId;
    }

    public void handleRequest(String userId, String sessionId) {
        UserContext ctx = new UserContext();
        ctx.userId = userId;
        ctx.sessionId = sessionId;
        context.set(ctx);

        try {
            processRequest();
            saveData();
        } finally {
            context.remove();  // Easy to forget!
        }
    }
}

// AFTER: ScopedValue (modern approach)
import java.lang.ScopedValue;

record UserContext(String userId, String sessionId) {}

class ModernContextManager {
    private static final ScopedValue<UserContext> context =
        ScopedValue.newInstance();

    public void handleRequest(String userId, String sessionId) {
        UserContext ctx = new UserContext(userId, sessionId);

        // Automatic cleanup - no try-finally needed!
        ScopedValue.where(context, ctx)
            .run(() -> {
                processRequest();
                saveData();
            });
        // Automatically cleared here
    }
}

// Benefits: No manual cleanup, immutable, better with virtual threads`
        },
        {
          name: 'Real-World Use Cases',
          explanation: 'Common scenarios where scoped values excel include web applications for user identity and request tracking, enterprise systems for transaction context and audit logging, and microservices for distributed tracing and feature flags.',
          codeExample: `// Real-World Use Cases for Scoped Values
import java.lang.ScopedValue;

// Use Case 1: Request Tracking
class RequestTracker {
    private static final ScopedValue<String> requestId =
        ScopedValue.newInstance();

    public void handleHttpRequest(String reqId) {
        ScopedValue.where(requestId, reqId)
            .run(() -> {
                authenticate();
                authorize();
                processBusinessLogic();
                logResponse();
            });
    }

    void logResponse() {
        System.out.println("Request " + requestId.get() + " completed");
    }
}

// Use Case 2: Security Context
record SecurityPrincipal(String username, String[] roles, String tenant) {}

class SecurityContext {
    private static final ScopedValue<SecurityPrincipal> principal =
        ScopedValue.newInstance();

    public void executeAsUser(SecurityPrincipal user, Runnable action) {
        ScopedValue.where(principal, user)
            .run(() -> {
                if (hasPermission("ADMIN")) {
                    action.run();
                }
            });
    }

    static boolean hasPermission(String required) {
        SecurityPrincipal p = principal.get();
        return Arrays.asList(p.roles()).contains(required);
    }
}

// Use Case 3: Transaction Context
record TransactionInfo(String txId, long startTime, boolean readOnly) {}

class TransactionManager {
    private static final ScopedValue<TransactionInfo> transaction =
        ScopedValue.newInstance();

    public void runInTransaction(boolean readOnly, Runnable work) {
        TransactionInfo tx = new TransactionInfo(
            generateTxId(), System.currentTimeMillis(), readOnly);

        ScopedValue.where(transaction, tx)
            .run(() -> {
                try { work.run(); commit(); }
                catch (Exception e) { rollback(); }
            });
    }
}`
        }
      ]
    },
    {
      id: 'stream-gatherers',
      name: 'Stream Gatherers',
      icon: '🌊',
      color: '#10b981',
      description: 'Custom intermediate operations for Stream API enabling stateful processing like windowing and batching.',
      diagram: StreamGatherersDiagram,
      details: [
        {
          name: 'Custom Stream Operations',
          diagram: StreamGatherersDiagram,
          explanation: 'Create custom intermediate operations beyond built-in map, filter, reduce. Implement operations not in standard API like sliding windows, batching, and custom accumulation. Package complex operations for reuse.',
          codeExample: `// Stream Gatherers - Custom Operations (Preview)
import java.util.stream.*;

public class CustomStreamOperations {
    public static void main(String[] args) {
        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Traditional Stream API - limited operations
        var result1 = numbers.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * 2)
            .collect(Collectors.toList());
        System.out.println("Traditional: " + result1);

        // NEW: Stream Gatherers - custom intermediate operations
        var result2 = numbers.stream()
            .gather(Gatherers.windowFixed(3))  // Groups of 3
            .map(window -> window.stream()
                .mapToInt(Integer::intValue)
                .sum())
            .toList();
        System.out.println("Fixed windows: " + result2);

        // Sliding windows
        var result3 = numbers.stream()
            .gather(Gatherers.windowSliding(3))  // Overlapping groups
            .map(window -> window.stream()
                .mapToInt(Integer::intValue)
                .average()
                .orElse(0))
            .toList();
        System.out.println("Sliding averages: " + result3);

        // Running accumulation (scan)
        var result4 = numbers.stream()
            .gather(Gatherers.scan(() -> 0, (sum, n) -> sum + n))
            .toList();
        System.out.println("Running totals: " + result4);
    }
}
// Output:
// Fixed windows: [6, 15, 24]
// Sliding averages: [2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0]
// Running totals: [1, 3, 6, 10, 15, 21, 28, 36, 45, 55]`
        },
        {
          name: 'Stateful Processing',
          explanation: 'Gatherers can maintain state across multiple stream elements. Build up values with accumulation, keep recent elements for windowed operations, track patterns and occurrences. More powerful than stateless operations.',
          codeExample: `// Stateful Stream Processing with Gatherers
import java.util.stream.*;

public class StatefulProcessing {
    public static void main(String[] args) {
        // Example: Process time-series data
        List<StockPrice> prices = List.of(
            new StockPrice("AAPL", 150.0),
            new StockPrice("AAPL", 152.0),
            new StockPrice("AAPL", 149.0),
            new StockPrice("AAPL", 151.0),
            new StockPrice("AAPL", 153.0)
        );

        // Calculate moving average (stateful operation)
        var movingAverages = prices.stream()
            .map(p -> p.price)
            .gather(Gatherers.windowSliding(3))
            .map(window -> window.stream()
                .mapToDouble(Double::doubleValue)
                .average()
                .orElse(0))
            .toList();

        System.out.println("Moving averages (3-period):");
        movingAverages.forEach(avg ->
            System.out.printf("  $%.2f%n", avg));

        // Running minimum/maximum (stateful)
        List<Integer> values = List.of(5, 2, 8, 1, 9, 3, 7);

        var runningMin = values.stream()
            .gather(Gatherers.scan(() -> Integer.MAX_VALUE,
                (min, val) -> Math.min(min, val)))
            .toList();

        var runningMax = values.stream()
            .gather(Gatherers.scan(() -> Integer.MIN_VALUE,
                (max, val) -> Math.max(max, val)))
            .toList();

        System.out.println("\\nRunning min: " + runningMin);
        System.out.println("Running max: " + runningMax);
    }

    record StockPrice(String symbol, double price) {}
}`
        },
        {
          name: 'Built-in Gatherers',
          explanation: 'Java 24 provides common gatherers out of the box. windowFixed(n) creates non-overlapping windows. windowSliding(n) creates overlapping sliding windows. scan(identity, accumulator) provides running accumulation.',
          codeExample: `// Built-in Gatherers API
import java.util.stream.*;

public class BuiltInGatherers {
    public static void main(String[] args) {
        List<String> words = List.of(
            "the", "quick", "brown", "fox",
            "jumps", "over", "lazy", "dog"
        );

        // 1. windowFixed - non-overlapping windows
        System.out.println("=== Fixed Windows ===");
        words.stream()
            .gather(Gatherers.windowFixed(3))
            .forEach(window -> System.out.println("  " + window));

        // 2. windowSliding - overlapping windows
        System.out.println("\\n=== Sliding Windows ===");
        words.stream()
            .gather(Gatherers.windowSliding(3))
            .forEach(window -> System.out.println("  " + window));

        // 3. scan - running accumulation
        System.out.println("\\n=== Running Concatenation ===");
        words.stream()
            .gather(Gatherers.scan(() -> "",
                (acc, word) -> acc.isEmpty() ? word : acc + "-" + word))
            .forEach(System.out::println);

        // 5. Combining gatherers
        System.out.println("\\n=== Combined Gatherers ===");
        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8);
        numbers.stream()
            .gather(Gatherers.windowFixed(2))  // Pairs
            .map(pair -> pair.stream()
                .mapToInt(Integer::intValue)
                .sum())  // Sum each pair
            .gather(Gatherers.scan(() -> 0, (sum, n) -> sum + n))
            .forEach(n -> System.out.print(n + " "));
    }
}
// Output:
// === Fixed Windows ===
//   [the, quick, brown]
//   [fox, jumps, over]
//   [lazy, dog]`
        },
        {
          name: 'Custom Gatherers',
          explanation: 'Create reusable custom stream operations with the Gatherer interface. Define initializer for state, integrator to process elements, optional finisher for final transformation, and combiner for parallel support.',
          codeExample: `// Custom Gatherer Implementation
import java.util.stream.*;
import java.util.function.*;

public class CustomGatherer {
    // Custom gatherer: Deduplicate consecutive elements
    static <T> Gatherer<T, ?, T> deduplicateConsecutive() {
        return Gatherer.of(
            () -> new Object() {
                T last = null;
                boolean first = true;
            },
            (state, element, downstream) -> {
                if (state.first || !element.equals(state.last)) {
                    state.last = element;
                    state.first = false;
                    return downstream.push(element);
                }
                return true;  // Continue processing
            }
        );
    }

    // Custom gatherer: Batch elements
    static <T> Gatherer<T, ?, List<T>> batch(int size) {
        return Gatherer.ofSequential(
            () -> new ArrayList<T>(),
            (batch, element, downstream) -> {
                batch.add(element);
                if (batch.size() == size) {
                    boolean shouldContinue =
                        downstream.push(new ArrayList<>(batch));
                    batch.clear();
                    return shouldContinue;
                }
                return true;
            },
            (batch, downstream) -> {
                if (!batch.isEmpty()) {
                    downstream.push(batch);
                }
            }
        );
    }

    public static void main(String[] args) {
        List<String> data = List.of("a", "a", "b", "b", "b", "c", "a", "a");

        var deduplicated = data.stream()
            .gather(deduplicateConsecutive())
            .toList();
        System.out.println("Deduplicated: " + deduplicated);
        // Output: [a, b, c, a]

        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        var batched = numbers.stream()
            .gather(batch(3))
            .toList();
        System.out.println("Batched: " + batched);
        // Output: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
    }
}`
        },
        {
          name: 'Performance',
          explanation: 'Gatherers are designed for high-performance stream processing with lazy evaluation, short-circuit support, and minimal memory usage. Parallel stream support through combiner functions enables work distribution across cores.',
          codeExample: `// Gatherer Performance and Lazy Evaluation
import java.util.stream.*;

public class GathererPerformance {
    public static void main(String[] args) {
        // Lazy evaluation - only processes what's needed
        System.out.println("=== Lazy Evaluation ===");

        List<Integer> numbers = Stream.iterate(1, n -> n + 1)
            .limit(1_000_000)
            .toList();

        long start = System.nanoTime();

        // Only processes until finding first match
        var result = numbers.stream()
            .gather(Gatherers.windowSliding(100))
            .filter(window -> window.stream()
                .mapToInt(Integer::intValue)
                .average()
                .orElse(0) > 500)
            .findFirst();

        long elapsed = (System.nanoTime() - start) / 1_000_000;
        System.out.println("Found in " + elapsed + "ms (lazy eval)");

        // Parallel processing
        System.out.println("\\n=== Parallel Processing ===");

        start = System.nanoTime();

        var parallelResult = numbers.parallelStream()
            .gather(Gatherers.windowFixed(1000))
            .map(window -> window.stream()
                .mapToInt(Integer::intValue)
                .sum())
            .reduce(0, Integer::sum);

        elapsed = (System.nanoTime() - start) / 1_000_000;
        System.out.println("Parallel processed 1M elements in " +
            elapsed + "ms");
        System.out.println("Total: " + parallelResult);

        // Short-circuiting
        System.out.println("\\n=== Short-Circuiting ===");
        // Processes only needed elements before short-circuit
    }
}`
        },
        {
          name: 'Real-World Use Cases',
          explanation: 'Practical scenarios include financial data for moving averages and technical indicators, log analysis for event correlation and pattern detection, data processing for batching and windowed aggregation, and IoT for signal smoothing.',
          codeExample: `// Real-World Use Cases for Stream Gatherers
import java.util.stream.*;
import java.time.*;

// Use Case 1: Time-Series Data Processing
record SensorReading(Instant time, double value) {}

class TimeSeriesAnalysis {
    public static void analyze(List<SensorReading> readings) {
        // Moving average (smoothing)
        var smoothed = readings.stream()
            .map(r -> r.value)
            .gather(Gatherers.windowSliding(5))
            .map(window -> window.stream()
                .mapToDouble(Double::doubleValue)
                .average()
                .orElse(0))
            .toList();

        System.out.println("Smoothed data: " + smoothed);
    }
}

// Use Case 2: Batch Processing
class BatchProcessor {
    public void processBatch(List<Transaction> transactions) {
        // Process in batches of 100
        transactions.stream()
            .gather(Gatherers.windowFixed(100))
            .forEach(batch -> {
                saveBatchToDatabase(batch);
                System.out.println("Saved batch of " +
                    batch.size() + " transactions");
            });
    }
}

// Use Case 3: Running Statistics
record Stats(double min, double max, double avg, long count) {}

class RunningStatistics {
    public static void main(String[] args) {
        List<Double> prices = List.of(100.0, 102.5, 99.8, 105.2, 103.0);

        var windowStats = prices.stream()
            .gather(Gatherers.windowSliding(3))
            .map(window -> {
                var stats = window.stream()
                    .mapToDouble(Double::doubleValue)
                    .summaryStatistics();
                return new Stats(
                    stats.getMin(), stats.getMax(),
                    stats.getAverage(), stats.getCount());
            })
            .toList();

        windowStats.forEach(stats ->
            System.out.printf("Window: min=%.1f, max=%.1f, avg=%.1f%n",
                stats.min, stats.max, stats.avg));
    }
}`
        }
      ]
    },
    {
      id: 'class-file-api',
      name: 'Class-File API',
      icon: '⚙️',
      color: '#f59e0b',
      description: 'Standard API for parsing, generating, and transforming Java bytecode built into the JDK.',
      diagram: ClassFileApiDiagram,
      details: [
        {
          name: 'Standard Bytecode API',
          diagram: ClassFileApiDiagram,
          explanation: 'First-party API for bytecode manipulation built into Java. Replaces external dependencies like ASM, ByteBuddy, Javassist, and BCEL. Always up-to-date with JVM changes and supports latest bytecode features immediately.',
          codeExample: `// Class-File API - Standard Bytecode Manipulation (Preview)
import java.lang.classfile.*;
import java.lang.classfile.attribute.*;
import java.lang.constant.*;

public class StandardBytecodeAPI {
    public static void main(String[] args) throws Exception {
        // Parse existing class file
        byte[] classBytes = readClassFile("MyClass.class");

        ClassModel classModel = ClassFile.of().parse(classBytes);

        // Inspect class structure
        System.out.println("Class: " + classModel.thisClass().asInternalName());
        System.out.println("Super: " + classModel.superclass().get().asInternalName());
        System.out.println("Interfaces: " + classModel.interfaces().size());

        // List all methods
        System.out.println("\\nMethods:");
        for (MethodModel method : classModel.methods()) {
            System.out.println("  " + method.methodName().stringValue() +
                method.methodType().stringValue());

            // Access method attributes
            method.findAttribute(Attributes.CODE).ifPresent(code -> {
                System.out.println("    Max stack: " + code.maxStack());
                System.out.println("    Max locals: " + code.maxLocals());
            });
        }

        // List all fields
        System.out.println("\\nFields:");
        for (FieldModel field : classModel.fields()) {
            System.out.println("  " + field.fieldName().stringValue() +
                " : " + field.fieldType().stringValue());
        }
    }
}`
        },
        {
          name: 'High-Level Abstractions',
          explanation: 'Work with Java concepts instead of raw bytecode instructions. ClassModel represents entire class files, MethodModel for methods with attributes and code, FieldModel for field declarations. Builder pattern provides fluent API for creating classes.',
          codeExample: `// High-Level Class File Abstractions
import java.lang.classfile.*;
import java.lang.constant.*;

public class HighLevelAPI {
    public static void main(String[] args) throws Exception {
        // Build a class using high-level API
        byte[] classBytes = ClassFile.of().build(
            ClassDesc.of("com.example.GeneratedClass"),
            classBuilder -> {
                // Add fields
                classBuilder.withField("name",
                    ClassDesc.of("java.lang.String"),
                    ClassFile.ACC_PRIVATE | ClassFile.ACC_FINAL);

                classBuilder.withField("age",
                    ConstantDescs.CD_int,
                    ClassFile.ACC_PRIVATE);

                // Add constructor
                classBuilder.withMethod("<init>",
                    MethodTypeDesc.of(
                        ConstantDescs.CD_void,
                        ClassDesc.of("java.lang.String"),
                        ConstantDescs.CD_int
                    ),
                    ClassFile.ACC_PUBLIC,
                    methodBuilder -> {
                        methodBuilder.withCode(codeBuilder -> {
                            codeBuilder.aload(0);
                            codeBuilder.invokespecial(
                                ClassDesc.of("java.lang.Object"),
                                "<init>",
                                MethodTypeDesc.of(ConstantDescs.CD_void)
                            );
                            // Store name field
                            codeBuilder.aload(0);
                            codeBuilder.aload(1);
                            codeBuilder.putfield(
                                ClassDesc.of("com.example.GeneratedClass"),
                                "name",
                                ClassDesc.of("java.lang.String")
                            );
                            // Store age field
                            codeBuilder.aload(0);
                            codeBuilder.iload(2);
                            codeBuilder.putfield(
                                ClassDesc.of("com.example.GeneratedClass"),
                                "age",
                                ConstantDescs.CD_int
                            );
                            codeBuilder.return_();
                        });
                    });

                // Add getter method
                classBuilder.withMethod("getName",
                    MethodTypeDesc.of(ClassDesc.of("java.lang.String")),
                    ClassFile.ACC_PUBLIC,
                    methodBuilder -> {
                        methodBuilder.withCode(codeBuilder -> {
                            codeBuilder.aload(0);
                            codeBuilder.getfield(
                                ClassDesc.of("com.example.GeneratedClass"),
                                "name",
                                ClassDesc.of("java.lang.String")
                            );
                            codeBuilder.areturn();
                        });
                    });
            }
        );

        System.out.println("Generated class: " + classBytes.length + " bytes");
    }
}`
        },
        {
          name: 'Read and Write',
          explanation: 'Full support for reading, modifying, and creating class files. Parse existing classes with ClassFile.of().parse(bytes). Transform classes element-by-element with selective modification. Create classes from scratch using builder pattern.',
          codeExample: `// Read, Transform, and Write Class Files
import java.lang.classfile.*;
import java.lang.classfile.instruction.*;

public class ReadWriteTransform {
    public static void main(String[] args) throws Exception {
        // Read existing class
        byte[] originalClass = readClass("MyClass.class");

        // Transform class - add logging to all methods
        byte[] transformedClass = ClassFile.of().transform(
            ClassFile.of().parse(originalClass),
            (classBuilder, classElement) -> {
                if (classElement instanceof MethodModel method) {
                    // Transform each method
                    classBuilder.transformMethod(method,
                        (methodBuilder, methodElement) -> {
                            if (methodElement instanceof CodeModel code) {
                                // Add logging at method entry
                                methodBuilder.withCode(codeBuilder -> {
                                    // System.out.println("Entering: " + methodName)
                                    codeBuilder.getstatic(
                                        ClassDesc.of("java.lang.System"),
                                        "out",
                                        ClassDesc.of("java.io.PrintStream")
                                    );
                                    codeBuilder.ldc("Entering: " +
                                        method.methodName().stringValue());
                                    codeBuilder.invokevirtual(
                                        ClassDesc.of("java.io.PrintStream"),
                                        "println",
                                        MethodTypeDesc.of(
                                            ConstantDescs.CD_void,
                                            ClassDesc.of("java.lang.String")
                                        )
                                    );

                                    // Copy original method code
                                    for (CodeElement ce : code) {
                                        codeBuilder.with(ce);
                                    }
                                });
                            } else {
                                methodBuilder.with(methodElement);
                            }
                        });
                } else {
                    classBuilder.with(classElement);
                }
            }
        );

        // Write transformed class
        writeClass("MyClass.class", transformedClass);
        System.out.println("Class transformed and written");
    }
}`
        },
        {
          name: 'Framework Support',
          explanation: 'Critical infrastructure for Java ecosystem tools and frameworks. Used by Spring for AOP proxies and configuration class enhancement, Hibernate for lazy loading and entity enhancement, Mockito for mock generation, and profilers for instrumentation.',
          codeExample: `// Framework Use: Dynamic Proxy Generation
import java.lang.classfile.*;
import java.lang.constant.*;

// Example: Generate proxy class for interface
public class ProxyGenerator {
    public static byte[] generateProxy(
            Class<?> interfaceClass,
            Class<?> handlerClass) {

        return ClassFile.of().build(
            ClassDesc.of(interfaceClass.getName() + "$Proxy"),
            classBuilder -> {
                // Implement interface
                classBuilder.withInterfaceSymbols(
                    ClassDesc.of(interfaceClass.getName())
                );

                // Add handler field
                classBuilder.withField("handler",
                    ClassDesc.of(handlerClass.getName()),
                    ClassFile.ACC_PRIVATE | ClassFile.ACC_FINAL);

                // For each interface method, generate proxy method
                for (var method : interfaceClass.getMethods()) {
                    generateProxyMethod(classBuilder, method, handlerClass);
                }
            }
        );
    }

    // Generate proxy method that delegates to handler
    private static void generateProxyMethod(
            ClassBuilder cb,
            java.lang.reflect.Method method,
            Class<?> handlerClass) {

        cb.withMethod(method.getName(),
            MethodTypeDesc.ofDescriptor(methodDescriptor(method)),
            ClassFile.ACC_PUBLIC,
            methodBuilder -> {
                methodBuilder.withCode(codeBuilder -> {
                    // Load handler field
                    codeBuilder.aload(0);
                    codeBuilder.getfield(
                        cb.thisClass(),
                        "handler",
                        ClassDesc.of(handlerClass.getName())
                    );
                    // Load args and invoke handler...
                });
            });
    }
}

// Use cases:
// - Spring AOP proxies
// - Hibernate entity enhancement
// - Mockito mock generation
// - JPA entity weaving`
        },
        {
          name: 'Future-Proof',
          explanation: 'Built-in API always supports latest Java features immediately with same-day support for new bytecode features. Backward compatible for reading class files from Java 1.1 through current. Forward compatible for generating newer class file versions.',
          codeExample: `// Future-Proof Class File API
import java.lang.classfile.*;

public class FutureProofAPI {
    public static void main(String[] args) throws Exception {
        // API supports all class file versions
        byte[] modernClass = generateClass(ClassFile.JAVA_24_VERSION);
        byte[] legacyClass = generateClass(ClassFile.JAVA_8_VERSION);

        // Parse and analyze any class file version
        analyzeClass(modernClass);
        analyzeClass(legacyClass);
    }

    static byte[] generateClass(int classFileVersion) {
        return ClassFile.of(
            ClassFile.ClassHierarchyResolverOption.of(
                ClassHierarchyResolver.defaultResolver())
        ).build(
            ClassDesc.of("com.example.Generated"),
            classBuilder -> {
                // Build class with specified version
                // API handles version-specific features automatically

                // Features available depend on version
                if (classFileVersion >= ClassFile.JAVA_17_VERSION) {
                    // Can use sealed classes, records, etc.
                }

                if (classFileVersion >= ClassFile.JAVA_21_VERSION) {
                    // Can use pattern matching, etc.
                }
            }
        );
    }

    static void analyzeClass(byte[] classBytes) throws Exception {
        ClassModel model = ClassFile.of().parse(classBytes);

        System.out.println("Class file version: " +
            model.majorVersion() + "." + model.minorVersion());

        System.out.println("Java version: " +
            classFileVersionToJavaVersion(model.majorVersion()));

        // API handles all versions transparently
        System.out.println("Methods: " + model.methods().size());
        System.out.println("Fields: " + model.fields().size());
    }

    static String classFileVersionToJavaVersion(int major) {
        return switch (major) {
            case 52 -> "Java 8";
            case 55 -> "Java 11";
            case 61 -> "Java 17";
            case 65 -> "Java 21";
            case 68 -> "Java 24";
            default -> "Unknown";
        };
    }
}

// Benefits:
// 1. Always up-to-date with JDK
// 2. No external dependencies
// 3. Future JVM features supported automatically`
        },
        {
          name: 'Use Cases',
          explanation: 'Practical applications include code generation for annotation processors and builder patterns, runtime enhancement for lazy loading and caching, AOP for method interception and transaction management, and testing tools for mock generation.',
          codeExample: `// Real-World Use Cases for Class-File API

// Use Case 1: Code Generation (Annotation Processing)
class EntityGenerator {
    public byte[] generateEntity(EntityConfig config) {
        return ClassFile.of().build(
            ClassDesc.of(config.className()),
            cb -> {
                // Generate JPA entity
                cb.withFlags(ClassFile.ACC_PUBLIC);

                // Add @Entity annotation
                cb.withAttribute(RuntimeVisibleAnnotationsAttribute.of(
                    Annotation.of(ClassDesc.of("jakarta.persistence.Entity"))
                ));

                // Generate fields with @Column annotations
                for (var field : config.fields()) {
                    generateField(cb, field);
                }

                // Generate getters/setters
                for (var field : config.fields()) {
                    generateGetter(cb, field);
                    generateSetter(cb, field);
                }
            }
        );
    }
}

// Use Case 2: Bytecode Enhancement (Lazy Loading)
class LazyLoadingEnhancer {
    public byte[] enhanceForLazyLoading(byte[] original) {
        return ClassFile.of().transform(
            ClassFile.of().parse(original),
            (cb, ce) -> {
                if (ce instanceof MethodModel method &&
                        isLazyField(method)) {
                    // Wrap field access with lazy loading logic
                    enhanceMethod(cb, method);
                } else {
                    cb.with(ce);
                }
            }
        );
    }
}

// Use Case 3: Instrumentation (Performance Monitoring)
class PerformanceInstrumenter {
    public byte[] addPerformanceMonitoring(byte[] original) {
        return ClassFile.of().transform(
            ClassFile.of().parse(original),
            (cb, ce) -> {
                if (ce instanceof MethodModel method) {
                    cb.transformMethod(method, (mb, me) -> {
                        if (me instanceof CodeModel code) {
                            mb.withCode(codeBuilder -> {
                                // Add timing code at start
                                addTimingStart(codeBuilder);
                                // Original method code
                                code.forEach(codeBuilder::with);
                                // Add timing code at end
                                addTimingEnd(codeBuilder, method);
                            });
                        } else {
                            mb.with(me);
                        }
                    });
                } else {
                    cb.with(ce);
                }
            }
        );
    }
}

// All use cases benefit from official JDK support and no external deps`
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
      { name: 'Java 24', icon: '🆕', page: 'Java 24' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #134e4a 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #2dd4bf, #14b8a6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(20, 184, 166, 0.2)',
    border: '1px solid rgba(20, 184, 166, 0.3)',
    borderRadius: '0.5rem',
    color: '#2dd4bf',
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
        <h1 style={titleStyle}>Java 24 Preview Features</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(20, 184, 166, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(20, 184, 166, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Back to Java
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={JAVA24_COLORS}
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
              colors={JAVA24_COLORS}
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
                >&larr;</button>
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
                >&rarr;</button>
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
                >X</button>
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

export default Java24

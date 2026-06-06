/**
 * Java Topic Page - Tab Template Format
 *
 * Direct topic page with concepts and details modals.
 * No intermediate navigation - content is immediately accessible.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../components/Breadcrumb'
import CollapsibleSidebar from '../components/CollapsibleSidebar'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'
import { useTheme } from '../contexts/ThemeContext'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const JAVA_COLORS = {
  primary: '#f59e0b',
  primaryHover: '#fbbf24',
  bg: 'rgba(245, 158, 11, 0.1)',
  border: 'rgba(245, 158, 11, 0.3)',
  arrow: '#f97316',
  hoverBg: 'rgba(245, 158, 11, 0.2)',
  topicBg: 'rgba(245, 158, 11, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const JavaOverviewDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="javaArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Java Platform Overview</text>
    <rect x="50" y="50" width="140" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="120" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Java Source</text>
    <rect x="250" y="50" width="140" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="320" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Bytecode</text>
    <rect x="450" y="50" width="140" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="520" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">JVM</text>
    <rect x="650" y="50" width="100" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="700" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Native</text>
    <line x1="190" y1="75" x2="245" y2="75" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#javaArrow)"/>
    <line x1="390" y1="75" x2="445" y2="75" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#javaArrow)"/>
    <line x1="590" y1="75" x2="645" y2="75" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#javaArrow)"/>
    <text x="217" y="65" textAnchor="middle" fill="#94a3b8" fontSize="9">javac</text>
    <text x="417" y="65" textAnchor="middle" fill="#94a3b8" fontSize="9">load</text>
    <text x="617" y="65" textAnchor="middle" fill="#94a3b8" fontSize="9">JIT</text>
    <rect x="200" y="130" width="400" height="50" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="160" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Write Once, Run Anywhere - Platform Independence</text>
  </svg>
)

const LambdaStreamDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="streamArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Stream Pipeline</text>
    <rect x="30" y="60" width="120" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="90" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Source</text>
    <rect x="180" y="60" width="120" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="240" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">filter()</text>
    <text x="240" y="100" textAnchor="middle" fill="#bfdbfe" fontSize="8">Intermediate</text>
    <rect x="330" y="60" width="120" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="390" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">map()</text>
    <text x="390" y="100" textAnchor="middle" fill="#ddd6fe" fontSize="8">Intermediate</text>
    <rect x="480" y="60" width="120" height="50" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="540" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">sorted()</text>
    <text x="540" y="100" textAnchor="middle" fill="#fbcfe8" fontSize="8">Intermediate</text>
    <rect x="630" y="60" width="120" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="690" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">collect()</text>
    <text x="690" y="100" textAnchor="middle" fill="#fef3c7" fontSize="8">Terminal</text>
    <line x1="150" y1="85" x2="175" y2="85" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#streamArrow)"/>
    <line x1="300" y1="85" x2="325" y2="85" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#streamArrow)"/>
    <line x1="450" y1="85" x2="475" y2="85" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#streamArrow)"/>
    <line x1="600" y1="85" x2="625" y2="85" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#streamArrow)"/>
    <text x="400" y="150" textAnchor="middle" fill="#64748b" fontSize="10">Lazy evaluation - only executes when terminal operation is called</text>
  </svg>
)

const ConcurrencyDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Java Concurrency Model</text>
    <rect x="50" y="50" width="150" height="60" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="125" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Thread Pool</text>
    <text x="125" y="95" textAnchor="middle" fill="#fbcfe8" fontSize="9">ExecutorService</text>
    <rect x="250" y="50" width="150" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="325" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Synchronization</text>
    <text x="325" y="95" textAnchor="middle" fill="#ddd6fe" fontSize="9">Locks, Semaphores</text>
    <rect x="450" y="50" width="150" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="525" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Concurrent Collections</text>
    <text x="525" y="95" textAnchor="middle" fill="#bfdbfe" fontSize="9">ConcurrentHashMap</text>
    <rect x="650" y="50" width="100" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="700" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Atomics</text>
    <text x="700" y="95" textAnchor="middle" fill="#bbf7d0" fontSize="9">AtomicInteger</text>
    <rect x="200" y="130" width="400" height="35" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="400" y="153" textAnchor="middle" fill="#a78bfa" fontSize="10">CompletableFuture - Async Programming</text>
  </svg>
)

const VirtualThreadsDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Virtual Threads (Java 21+)</text>
    <rect x="50" y="50" width="200" height="100" rx="8" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="150" y="75" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Platform Threads</text>
    <text x="150" y="95" textAnchor="middle" fill="#fca5a5" fontSize="9">1:1 with OS threads</text>
    <text x="150" y="115" textAnchor="middle" fill="#fca5a5" fontSize="9">~1MB stack each</text>
    <text x="150" y="135" textAnchor="middle" fill="#fca5a5" fontSize="9">Limited scalability</text>
    <rect x="300" y="50" width="200" height="100" rx="8" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Virtual Threads</text>
    <text x="400" y="95" textAnchor="middle" fill="#86efac" fontSize="9">M:N with carriers</text>
    <text x="400" y="115" textAnchor="middle" fill="#86efac" fontSize="9">~1KB stack each</text>
    <text x="400" y="135" textAnchor="middle" fill="#86efac" fontSize="9">Millions possible</text>
    <rect x="550" y="50" width="200" height="100" rx="8" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Benefits</text>
    <text x="650" y="95" textAnchor="middle" fill="#93c5fd" fontSize="9">Simple blocking code</text>
    <text x="650" y="115" textAnchor="middle" fill="#93c5fd" fontSize="9">High throughput</text>
    <text x="650" y="135" textAnchor="middle" fill="#93c5fd" fontSize="9">Easy debugging</text>
  </svg>
)

const CollectionsDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Collections Framework Hierarchy</text>
    <rect x="325" y="40" width="150" height="35" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="400" y="63" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Iterable</text>
    <rect x="325" y="90" width="150" height="35" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="113" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Collection</text>
    <line x1="400" y1="75" x2="400" y2="90" stroke="#94a3b8" strokeWidth="1.5"/>
    <rect x="50" y="145" width="100" height="35" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="100" y="168" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">List</text>
    <rect x="200" y="145" width="100" height="35" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="250" y="168" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Set</text>
    <rect x="350" y="145" width="100" height="35" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="400" y="168" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Queue</text>
    <rect x="500" y="145" width="100" height="35" rx="6" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="550" y="168" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Deque</text>
    <rect x="650" y="145" width="100" height="35" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="700" y="168" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Map</text>
    <line x1="400" y1="125" x2="100" y2="145" stroke="#94a3b8" strokeWidth="1"/>
    <line x1="400" y1="125" x2="250" y2="145" stroke="#94a3b8" strokeWidth="1"/>
    <line x1="400" y1="125" x2="400" y2="145" stroke="#94a3b8" strokeWidth="1"/>
    <line x1="400" y1="125" x2="550" y2="145" stroke="#94a3b8" strokeWidth="1"/>
  </svg>
)

const OOPDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">OOP Principles</text>
    <rect x="50" y="50" width="160" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="130" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Encapsulation</text>
    <text x="130" y="95" textAnchor="middle" fill="#fef3c7" fontSize="9">Data hiding</text>
    <rect x="230" y="50" width="160" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="310" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Inheritance</text>
    <text x="310" y="95" textAnchor="middle" fill="#bfdbfe" fontSize="9">Code reuse</text>
    <rect x="410" y="50" width="160" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="490" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Polymorphism</text>
    <text x="490" y="95" textAnchor="middle" fill="#bbf7d0" fontSize="9">Many forms</text>
    <rect x="590" y="50" width="160" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="670" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Abstraction</text>
    <text x="670" y="95" textAnchor="middle" fill="#ddd6fe" fontSize="9">Hide complexity</text>
    <rect x="150" y="130" width="500" height="35" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="400" y="153" textAnchor="middle" fill="#fbbf24" fontSize="10">SOLID Principles: Single Responsibility, Open-Closed, Liskov, Interface Segregation, Dependency Inversion</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

const tabCategories = {
  all: { label: 'All', ids: null },
  quickref: { label: 'Quick Reference', ids: ['oop-overview', 'streams-overview', 'concurrency-overview', 'collections-overview', 'modern-java-overview', 'jvm-overview', 'fundamentals-overview', 'fundamentals-senior-overview', 'must-know-examples-overview'] },
  core: { label: 'Core Fundamentals', ids: ['Core Java', 'Object-Oriented Programming', 'Class', 'Interface', 'Exception Handling', 'Generics', 'File I/O'] },
  collections: { label: 'Collections & Streams', ids: ['Collections Framework', 'Streams', 'Streams Advanced', 'Optional', 'Lambdas', 'Lambdas Advanced', 'Functional Interfaces', 'Functional Programming'] },
  concurrency: { label: 'Concurrency', ids: ['Concurrency', 'Multithreading'] },
  modern: { label: 'Modern Java', ids: ['Java 8', 'Module', 'Java 11', 'Java 15', 'Java 21', 'Java 24'] },
  jvm: { label: 'JVM & Performance', ids: ['JVM Internals', 'Memory Management'] }
}

function Java({ onBack, onSelectItem, breadcrumb, initialCategory, onInitialCategoryUsed }) {
  const { colors, isDark } = useTheme()
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'all')

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory)
      onInitialCategoryUsed?.()
    }
  }, [initialCategory])

  const javaItems = [
    // Quick Reference
    { id: 'oop-overview', name: 'OOP Principles', icon: '📦', color: '#f59e0b', description: 'Encapsulation, inheritance, polymorphism, abstraction, and SOLID principles.', isQuickRef: true },
    { id: 'streams-overview', name: 'Streams & Lambdas', icon: '🌊', color: '#3b82f6', description: 'Lambda expressions, method references, and functional interfaces.', isQuickRef: true },
    { id: 'concurrency-overview', name: 'Concurrency', icon: '🔄', color: '#10b981', description: 'Thread pools, synchronization, CompletableFuture, and concurrent collections.', isQuickRef: true },
    { id: 'collections-overview', name: 'Collections', icon: '📚', color: '#8b5cf6', description: 'List, Set, Map, Queue implementations and when to use each.', isQuickRef: true },
    { id: 'modern-java-overview', name: 'Modern Java (8-21)', icon: '🚀', color: '#22c55e', description: 'Overview of all modern Java features from Java 8 to 24.', isQuickRef: true },
    { id: 'jvm-overview', name: 'JVM & Performance', icon: '⚙️', color: '#6366f1', description: 'Memory model, garbage collection, and optimization techniques.', isQuickRef: true },
    { id: 'fundamentals-overview', name: 'Interview Fundamentals', icon: '🔑', color: '#a855f7', description: 'Class loaders, GC, this/super, static, object creation, JVM/JDK/JRE, heap vs stack, records, wrappers — common interview topics.', isQuickRef: true },
    { id: 'fundamentals-senior-overview', name: 'Senior Interview Topics', icon: '⚡', color: '#ef4444', description: 'JMM, HashMap internals, CAS/ABA, references, invokedynamic, type erasure, CompletableFuture, virtual threads, classloader leaks.', isQuickRef: true },
    { id: 'must-know-examples-overview', name: 'Coding Must-Know Examples', icon: '💡', color: '#0ea5e9', description: 'Canonical implementations: deep vs shallow object cloning, copy constructors, and other from-scratch coding patterns.', isQuickRef: true },
    // Core Fundamentals
    { id: 'Core Java', name: 'Core Java', icon: '☕', color: '#f59e0b', description: 'Java fundamentals, syntax, data types, operators, and control flow.' },
    { id: 'Object-Oriented Programming', name: 'Object-Oriented Programming', icon: '🎭', color: '#8b5cf6', description: 'Classes, objects, inheritance, polymorphism, encapsulation, and abstraction.' },
    { id: 'Class', name: 'Classes', icon: '📦', color: '#3b82f6', description: 'Class structure, constructors, methods, fields, and access modifiers.' },
    { id: 'Interface', name: 'Interfaces', icon: '🔌', color: '#10b981', description: 'Interface design, default methods, static methods, and multiple inheritance.' },
    { id: 'Exception Handling', name: 'Exception Handling', icon: '⚠️', color: '#ef4444', description: 'Try-catch, custom exceptions, exception hierarchies, and error handling patterns.' },
    { id: 'Generics', name: 'Generics', icon: '🔤', color: '#f97316', description: 'Generic classes, methods, bounded types, wildcards, and type erasure.' },
    { id: 'File I/O', name: 'File I/O', icon: '📁', color: '#14b8a6', description: 'File operations, NIO.2, Path API, streams, and file system operations.' },
    // Collections & Streams
    { id: 'Collections Framework', name: 'Collections Framework', icon: '📦', color: '#ec4899', description: 'List, Set, Map, Queue implementations and advanced collection operations.' },
    { id: 'Streams', name: 'Streams API', icon: '🌊', color: '#06b6d4', description: 'Stream operations, collectors, parallel streams, and functional programming.' },
    { id: 'Streams Advanced', name: 'Streams Advanced', icon: '🌀', color: '#0891b2', description: 'Advanced stream operations, custom collectors, and performance optimization.' },
    { id: 'Optional', name: 'Optional', icon: '🎁', color: '#8b5cf6', description: 'Null-safety with Optional, functional transformations, and best practices.' },
    { id: 'Lambdas', name: 'Lambdas', icon: 'λ', color: '#f59e0b', description: 'Lambda expressions, syntax, closures, and effectively final variables.' },
    { id: 'Lambdas Advanced', name: 'Lambdas Advanced', icon: '⚡', color: '#eab308', description: 'Advanced lambda patterns, method references, and functional composition.' },
    { id: 'Functional Interfaces', name: 'Functional Interfaces', icon: '🔗', color: '#14b8a6', description: 'Predicate, Function, Consumer, Supplier, and custom functional interfaces.' },
    { id: 'Functional Programming', name: 'Functional Programming', icon: '🔄', color: '#a855f7', description: 'Functional paradigm, immutability, pure functions, and higher-order functions.' },
    // Concurrency & Threading
    { id: 'Concurrency', name: 'Concurrency', icon: '🔄', color: '#10b981', description: 'Thread safety, locks, atomic operations, semaphores, and concurrent collections.' },
    { id: 'Multithreading', name: 'Multithreading', icon: '🧵', color: '#059669', description: 'Thread lifecycle, synchronization, thread pools, and parallel processing.' },
    // Modern Java
    { id: 'Java 8', name: 'Java 8', icon: '🎯', color: '#3b82f6', description: 'Lambda expressions, Stream API, Optional, functional interfaces, and Date/Time API.' },
    { id: 'Module', name: 'Module System', icon: '📦', color: '#8b5cf6', description: 'Java Platform Module System (JPMS), module declarations, and encapsulation.' },
    { id: 'Java 11', name: 'Java 11 LTS', icon: '🔧', color: '#06b6d4', description: 'Local variable type inference, HTTP Client, module system, and performance improvements.' },
    { id: 'Java 15', name: 'Java 15', icon: '📝', color: '#8b5cf6', description: 'Text blocks, sealed classes preview, pattern matching, and hidden classes.' },
    { id: 'Java 21', name: 'Java 21 LTS', icon: '🚀', color: '#22c55e', description: 'Virtual threads, pattern matching for switch, record patterns, and sequenced collections.' },
    { id: 'Java 24', name: 'Java 24 Preview', icon: '🔮', color: '#f59e0b', description: 'Cutting-edge preview features and experimental capabilities.' },
    // JVM & Performance
    { id: 'JVM Internals', name: 'JVM Internals', icon: '⚙️', color: '#6366f1', description: 'Class loading, bytecode, JIT compilation, and JVM architecture.' },
    { id: 'Memory Management', name: 'Memory Management', icon: '🧠', color: '#a855f7', description: 'Heap, stack, garbage collection algorithms, and memory optimization.' },
  ]

  const concepts = [
    {
      id: 'oop',
      name: 'OOP & Classes',
      icon: '📦',
      color: '#f59e0b',
      description: 'Object-oriented programming principles, class design, inheritance, and SOLID principles.',
      diagram: OOPDiagram,
      details: [
        {
          name: 'Encapsulation',
          explanation: 'Encapsulation bundles data and methods that operate on that data within a single unit (class), restricting direct access to some components. Use private fields with public getters/setters, validate data in setters, and expose only necessary operations.',
          codeExample: `public class BankAccount {
    private double balance;  // Hidden from outside
    private String accountId;

    public BankAccount(String accountId, double initialBalance) {
        this.accountId = accountId;
        this.balance = initialBalance;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }
}`
        },
        {
          name: 'Inheritance & Polymorphism',
          explanation: 'Inheritance enables code reuse through IS-A relationships. Polymorphism allows objects to be treated as their parent type while executing child-specific behavior. Prefer composition over inheritance for flexibility.',
          codeExample: `// Base class
abstract class Shape {
    abstract double area();
    abstract double perimeter();
}

// Inheritance with polymorphism
class Circle extends Shape {
    private double radius;

    Circle(double radius) { this.radius = radius; }

    @Override
    double area() { return Math.PI * radius * radius; }

    @Override
    double perimeter() { return 2 * Math.PI * radius; }
}

class Rectangle extends Shape {
    private double width, height;

    Rectangle(double w, double h) { width = w; height = h; }

    @Override
    double area() { return width * height; }

    @Override
    double perimeter() { return 2 * (width + height); }
}

// Polymorphic usage
List<Shape> shapes = List.of(new Circle(5), new Rectangle(4, 6));
double totalArea = shapes.stream()
    .mapToDouble(Shape::area)
    .sum();`
        },
        {
          name: 'SOLID Principles',
          explanation: 'SOLID: Single Responsibility (one reason to change), Open-Closed (open for extension, closed for modification), Liskov Substitution (subtypes substitutable), Interface Segregation (specific interfaces), Dependency Inversion (depend on abstractions).',
          codeExample: `// Single Responsibility - each class has one job
class UserValidator { boolean validate(User u) { /*...*/ } }
class UserRepository { void save(User u) { /*...*/ } }
class EmailService { void sendWelcome(User u) { /*...*/ } }

// Dependency Inversion - depend on abstractions
interface PaymentProcessor {
    void process(Payment payment);
}

class StripeProcessor implements PaymentProcessor {
    public void process(Payment payment) { /* Stripe logic */ }
}

class PayPalProcessor implements PaymentProcessor {
    public void process(Payment payment) { /* PayPal logic */ }
}

// High-level module depends on abstraction
class OrderService {
    private final PaymentProcessor processor;

    OrderService(PaymentProcessor processor) {
        this.processor = processor;  // Injected dependency
    }

    void checkout(Order order) {
        processor.process(order.getPayment());
    }
}`
        }
      ]
    },
    {
      id: 'streams',
      name: 'Streams & Lambdas',
      icon: '🌊',
      color: '#3b82f6',
      description: 'Functional programming with lambda expressions, Stream API for data processing, and method references.',
      diagram: LambdaStreamDiagram,
      details: [
        {
          name: 'Lambda Expressions',
          explanation: 'Lambdas provide concise syntax for functional interfaces. Syntax: (parameters) -> expression or (parameters) -> { statements }. Use method references (Class::method) for cleaner code when the lambda just calls an existing method.',
          codeExample: `// Lambda syntax variations
Runnable r = () -> System.out.println("Hello");
Consumer<String> c = s -> System.out.println(s);
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;

// Method references
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
names.forEach(System.out::println);  // Instance method ref
names.stream().map(String::toUpperCase);  // Instance method ref
names.stream().map(String::length);  // Instance method ref

// Functional interfaces
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}

Calculator multiply = (a, b) -> a * b;
Calculator divide = (a, b) -> a / b;`
        },
        {
          name: 'Stream Operations',
          explanation: 'Streams provide declarative data processing. Intermediate operations (filter, map, flatMap, sorted) are lazy. Terminal operations (collect, reduce, forEach, count) trigger execution. Streams can only be consumed once.',
          codeExample: `List<Person> people = getPeople();

// Chained stream operations
List<String> adultNames = people.stream()
    .filter(p -> p.getAge() >= 18)           // Intermediate
    .sorted(Comparator.comparing(Person::getName))  // Intermediate
    .map(Person::getName)                     // Intermediate
    .distinct()                               // Intermediate
    .limit(10)                                // Intermediate
    .collect(Collectors.toList());            // Terminal

// Reduce operation
int totalAge = people.stream()
    .mapToInt(Person::getAge)
    .sum();

// Grouping with Collectors
Map<String, List<Person>> byCity = people.stream()
    .collect(Collectors.groupingBy(Person::getCity));

// FlatMap for nested structures
List<String> allSkills = people.stream()
    .flatMap(p -> p.getSkills().stream())
    .distinct()
    .collect(Collectors.toList());`
        },
        {
          name: 'Parallel Streams',
          explanation: 'Parallel streams split work across multiple threads using the ForkJoinPool. Use for CPU-intensive operations on large datasets. Avoid for I/O-bound operations or small collections. Ensure thread-safe operations.',
          codeExample: `// Parallel stream processing
List<Integer> numbers = IntStream.rangeClosed(1, 1_000_000)
    .boxed()
    .collect(Collectors.toList());

// Parallel computation
long sum = numbers.parallelStream()
    .filter(n -> n % 2 == 0)
    .mapToLong(Integer::longValue)
    .sum();

// When to use parallel streams:
// ✓ Large datasets (>10,000 elements)
// ✓ CPU-intensive operations
// ✓ Independent element processing
// ✗ Small collections (overhead > benefit)
// ✗ I/O operations (use async instead)
// ✗ Order-dependent operations

// Custom thread pool for parallel streams
ForkJoinPool customPool = new ForkJoinPool(4);
List<Result> results = customPool.submit(() ->
    data.parallelStream()
        .map(this::processItem)
        .collect(Collectors.toList())
).get();`
        }
      ]
    },
    {
      id: 'concurrency',
      name: 'Concurrency',
      icon: '🔄',
      color: '#ec4899',
      description: 'Multithreading, ExecutorService, synchronization, locks, and concurrent collections.',
      diagram: ConcurrencyDiagram,
      details: [
        {
          name: 'Thread Pools',
          explanation: 'ExecutorService manages thread pools for efficient task execution. Fixed pools for bounded concurrency, cached pools for short-lived tasks, scheduled pools for delayed/periodic execution. Always shutdown executors properly.',
          codeExample: `// Fixed thread pool
ExecutorService fixed = Executors.newFixedThreadPool(4);

// Submit tasks
Future<String> future = fixed.submit(() -> {
    return computeResult();
});
String result = future.get();  // Blocks until complete

// Execute multiple tasks
List<Callable<Integer>> tasks = List.of(
    () -> compute(1),
    () -> compute(2),
    () -> compute(3)
);
List<Future<Integer>> futures = fixed.invokeAll(tasks);

// Scheduled execution
ScheduledExecutorService scheduled =
    Executors.newScheduledThreadPool(2);
scheduled.scheduleAtFixedRate(
    () -> System.out.println("Tick"),
    0, 1, TimeUnit.SECONDS
);

// Proper shutdown
fixed.shutdown();
try {
    if (!fixed.awaitTermination(60, TimeUnit.SECONDS)) {
        fixed.shutdownNow();
    }
} catch (InterruptedException e) {
    fixed.shutdownNow();
}`
        },
        {
          name: 'Synchronization',
          explanation: 'Synchronization ensures thread-safe access to shared resources. Use synchronized blocks/methods, ReentrantLock for advanced control, ReadWriteLock for read-heavy workloads. Volatile ensures visibility across threads.',
          codeExample: `// Synchronized method
class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }

    public synchronized int getCount() {
        return count;
    }
}

// ReentrantLock for more control
class BetterCounter {
    private final ReentrantLock lock = new ReentrantLock();
    private int count = 0;

    public void increment() {
        lock.lock();
        try {
            count++;
        } finally {
            lock.unlock();
        }
    }
}

// ReadWriteLock for read-heavy scenarios
class Cache<K, V> {
    private final Map<K, V> map = new HashMap<>();
    private final ReadWriteLock rwLock = new ReentrantReadWriteLock();

    public V get(K key) {
        rwLock.readLock().lock();
        try {
            return map.get(key);
        } finally {
            rwLock.readLock().unlock();
        }
    }

    public void put(K key, V value) {
        rwLock.writeLock().lock();
        try {
            map.put(key, value);
        } finally {
            rwLock.writeLock().unlock();
        }
    }
}`
        },
        {
          name: 'CompletableFuture',
          explanation: 'CompletableFuture enables async programming with composable operations. Chain operations with thenApply, thenCompose, thenCombine. Handle errors with exceptionally or handle. Combine multiple futures with allOf/anyOf.',
          codeExample: `// Async computation
CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> fetchData())
    .thenApply(data -> process(data))
    .thenApply(result -> format(result));

// Combine multiple futures
CompletableFuture<User> userFuture = fetchUserAsync(id);
CompletableFuture<List<Order>> ordersFuture = fetchOrdersAsync(id);

CompletableFuture<UserProfile> profile = userFuture
    .thenCombine(ordersFuture, (user, orders) ->
        new UserProfile(user, orders));

// Error handling
CompletableFuture<String> withFallback = fetchAsync()
    .exceptionally(ex -> "default value")
    .thenApply(String::toUpperCase);

// Wait for all
CompletableFuture<Void> allDone = CompletableFuture.allOf(
    future1, future2, future3
);
allDone.thenRun(() -> System.out.println("All complete"));

// Timeout (Java 9+)
future.orTimeout(5, TimeUnit.SECONDS)
      .exceptionally(ex -> "Timeout fallback");`
        }
      ]
    },
    {
      id: 'collections',
      name: 'Collections',
      icon: '📚',
      color: '#8b5cf6',
      description: 'Collection framework: List, Set, Map, Queue implementations, and concurrent collections.',
      diagram: CollectionsDiagram,
      details: [
        {
          name: 'List & Set',
          explanation: 'ArrayList: O(1) random access, O(n) insert/delete. LinkedList: O(n) access, O(1) insert/delete at ends. HashSet: O(1) operations, no order. TreeSet: O(log n), sorted. LinkedHashSet: O(1), insertion order.',
          codeExample: `// ArrayList - most common, fast random access
List<String> arrayList = new ArrayList<>();
arrayList.add("A");
arrayList.get(0);  // O(1)

// LinkedList - fast insert/remove at ends
LinkedList<String> linkedList = new LinkedList<>();
linkedList.addFirst("A");  // O(1)
linkedList.addLast("B");   // O(1)

// HashSet - unique elements, no order
Set<String> hashSet = new HashSet<>();
hashSet.add("A");
hashSet.contains("A");  // O(1)

// TreeSet - sorted unique elements
Set<Integer> treeSet = new TreeSet<>();
treeSet.add(3);
treeSet.add(1);
treeSet.add(2);
// Iteration: 1, 2, 3 (sorted)

// Immutable collections (Java 9+)
List<String> immutable = List.of("A", "B", "C");
Set<Integer> immutableSet = Set.of(1, 2, 3);`
        },
        {
          name: 'Map Implementations',
          explanation: 'HashMap: O(1) average operations, allows null key/values. TreeMap: O(log n), sorted by keys. LinkedHashMap: O(1), maintains insertion/access order. ConcurrentHashMap: thread-safe, high concurrency.',
          codeExample: `// HashMap - most common
Map<String, Integer> hashMap = new HashMap<>();
hashMap.put("one", 1);
hashMap.getOrDefault("two", 0);  // Returns 0

// Compute operations
hashMap.computeIfAbsent("three", k -> 3);
hashMap.merge("one", 1, Integer::sum);  // Increment

// TreeMap - sorted by key
Map<String, Integer> treeMap = new TreeMap<>();
treeMap.put("b", 2);
treeMap.put("a", 1);
// Keys in order: a, b

// LinkedHashMap - access-order for LRU cache
Map<String, String> lruCache = new LinkedHashMap<>(16, 0.75f, true) {
    @Override
    protected boolean removeEldestEntry(Map.Entry<String, String> eldest) {
        return size() > 100;  // Max 100 entries
    }
};

// Immutable map
Map<String, Integer> immutable = Map.of("a", 1, "b", 2);`
        },
        {
          name: 'Concurrent Collections',
          explanation: 'ConcurrentHashMap: thread-safe with segment locking. CopyOnWriteArrayList: safe iteration, expensive writes. BlockingQueue: producer-consumer pattern. ConcurrentLinkedQueue: non-blocking thread-safe queue.',
          codeExample: `// ConcurrentHashMap - thread-safe map
ConcurrentHashMap<String, Integer> concurrentMap = new ConcurrentHashMap<>();
concurrentMap.put("key", 1);
concurrentMap.compute("key", (k, v) -> v + 1);  // Atomic update

// Atomic operations
concurrentMap.putIfAbsent("new", 0);
concurrentMap.replace("key", 2, 3);  // CAS operation

// BlockingQueue - producer/consumer
BlockingQueue<Task> queue = new LinkedBlockingQueue<>(100);

// Producer
queue.put(task);  // Blocks if full

// Consumer
Task task = queue.take();  // Blocks if empty

// CopyOnWriteArrayList - safe iteration
List<String> cowList = new CopyOnWriteArrayList<>();
// Safe to iterate while others modify
for (String s : cowList) {
    // No ConcurrentModificationException
}`
        }
      ]
    },
    {
      id: 'modern-java',
      name: 'Modern Java (8-21)',
      icon: '🚀',
      color: '#22c55e',
      description: 'Modern Java features: Optional, records, sealed classes, pattern matching, and virtual threads.',
      diagram: VirtualThreadsDiagram,
      details: [
        {
          name: 'Java 8 - Lambdas & Streams',
          explanation: 'Java 8 introduced functional programming with lambdas, Stream API for data processing, Optional for null-safety, method references, default/static interface methods, and the modern Date/Time API.',
          codeExample: `// Lambda expressions
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
names.forEach(name -> System.out.println(name));

// Streams - filter, map, collect
List<String> longNames = names.stream()
    .filter(name -> name.length() > 4)
    .map(String::toUpperCase)
    .collect(Collectors.toList());

// Optional - null-safe
Optional<User> user = findUser("123");
String name = user
    .map(User::getName)
    .orElse("Guest");

// Method references
names.stream()
    .map(String::toUpperCase)    // Instance method
    .forEach(System.out::println); // Static method

// Default interface methods
interface Vehicle {
    default void start() {
        System.out.println("Starting vehicle");
    }
}

// Date/Time API
LocalDate today = LocalDate.now();
LocalDateTime meeting = LocalDateTime.of(2024, 6, 15, 14, 30);
Duration duration = Duration.between(start, end);
Period period = Period.between(birthday, today);`
        },
        {
          name: 'Java 9-11 - Modules, Var, HttpClient',
          explanation: 'Java 9 introduced the module system for better encapsulation. Java 10 added var for local type inference. Java 11 provided the new HttpClient, string methods, and became the first LTS after Java 8.',
          codeExample: `// Java 9 - Module system (module-info.java)
module com.example.app {
    requires java.sql;
    requires com.example.api;
    exports com.example.app.service;
    opens com.example.app.model; // for reflection
}

// Java 10 - var keyword (local type inference)
var list = new ArrayList<String>();  // inferred type
var map = Map.of("key", "value");
var stream = list.stream()
    .filter(s -> s.length() > 5);

// Can't use var everywhere
// var x;              // ERROR: can't infer type
// var lambda = x -> x * 2;  // ERROR: explicit type needed

// Java 11 - New HttpClient
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users"))
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(json))
    .build();

HttpResponse<String> response = client.send(request,
    HttpResponse.BodyHandlers.ofString());

// String enhancements (Java 11)
String text = "  Hello  ";
text.isBlank();           // true if empty/whitespace
text.strip();             // better trim()
text.lines().count();     // split by line breaks
"abc".repeat(3);          // "abcabcabc"`
        },
        {
          name: 'Java 14-15 - Records, Text Blocks, Switch',
          explanation: 'Records provide compact syntax for immutable data classes. Text blocks handle multi-line strings elegantly. Switch expressions return values and support multiple patterns.',
          codeExample: `// Records (Java 14+) - immutable data carriers
record Person(String name, int age) {
    // Compact constructor for validation
    public Person {
        if (age < 0) throw new IllegalArgumentException("Invalid age");
    }

    // Additional methods
    public boolean isAdult() {
        return age >= 18;
    }
}

Person p = new Person("Alice", 30);
String name = p.name();  // auto-generated accessor
System.out.println(p);   // Person[name=Alice, age=30]

// Text Blocks (Java 15) - multi-line strings
String json = """
    {
        "name": "Alice",
        "age": 30,
        "email": "alice@example.com"
    }
    """;

String sql = """
    SELECT u.name, u.email, o.total
    FROM users u
    JOIN orders o ON u.id = o.user_id
    WHERE u.active = true
    ORDER BY o.created_at DESC
    """;

// Switch expressions (Java 14)
int numDays = switch (month) {
    case "JAN", "MAR", "MAY" -> 31;
    case "APR", "JUN", "SEP" -> 30;
    case "FEB" -> {
        int days = isLeapYear ? 29 : 28;
        yield days;  // return from block
    }
    default -> throw new IllegalArgumentException("Invalid month");
};

// Pattern matching switch (Java 17+)
String formatted = switch (obj) {
    case Integer i -> String.format("int %d", i);
    case Long l    -> String.format("long %d", l);
    case Double d  -> String.format("double %f", d);
    case String s  -> String.format("String %s", s);
    default        -> obj.toString();
};`
        },
        {
          name: 'Java 17-21 - Sealed Classes & Pattern Matching',
          explanation: 'Sealed classes restrict inheritance for better type safety. Pattern matching for instanceof and switch eliminates casting. Record patterns destructure records inline.',
          codeExample: `// Sealed classes (Java 17) - restricted inheritance
sealed interface Shape
    permits Circle, Rectangle, Triangle {}

record Circle(double radius) implements Shape {}
record Rectangle(double width, double height) implements Shape {}
final class Triangle implements Shape {
    // Must be final, sealed, or non-sealed
}

// Pattern matching for instanceof (Java 16)
if (obj instanceof String s && s.length() > 5) {
    System.out.println(s.toUpperCase());  // s is in scope
}

// Pattern matching switch (Java 21)
double area(Shape shape) {
    return switch (shape) {
        case Circle c -> Math.PI * c.radius() * c.radius();
        case Rectangle r -> r.width() * r.height();
        case Triangle t -> t.calculateArea();
        // Exhaustive - compiler ensures all cases covered
    };
}

// Guarded patterns (when clauses)
String classify(Object obj) {
    return switch (obj) {
        case String s when s.length() > 10 -> "Long string";
        case String s -> "Short string";
        case Integer i when i > 100 -> "Large number";
        case Integer i -> "Small number";
        case null -> "null";
        default -> "Other";
    };
}

// Record patterns (Java 21) - destructuring
record Point(int x, int y) {}
record Circle(Point center, int radius) {}

String describe(Object obj) {
    return switch (obj) {
        case Circle(Point(var x, var y), var r) ->
            "Circle at (" + x + "," + y + ") radius " + r;
        case Point(var x, var y) ->
            "Point at (" + x + "," + y + ")";
        default -> "Unknown shape";
    };
}`
        },
        {
          name: 'Pattern Matching',
          explanation: 'Pattern matching (Java 16+) simplifies type checks and casts. Switch expressions (Java 14+) return values and support pattern matching. Sealed classes (Java 17) restrict which classes can extend them.',
          codeExample: `// Pattern matching for instanceof
Object obj = getObject();
if (obj instanceof String s && s.length() > 5) {
    System.out.println(s.toUpperCase());
}

// Pattern matching in switch (Java 21)
String describe(Object obj) {
    return switch (obj) {
        case Integer i -> "Integer: " + i;
        case String s when s.length() > 5 -> "Long string: " + s;
        case String s -> "Short string: " + s;
        case null -> "null value";
        default -> "Unknown: " + obj;
    };
}

// Sealed classes
sealed interface Shape permits Circle, Rectangle, Triangle {}

record Circle(double radius) implements Shape {}
record Rectangle(double w, double h) implements Shape {}
final class Triangle implements Shape { /*...*/ }

// Exhaustive switch on sealed type
double area(Shape shape) {
    return switch (shape) {
        case Circle c -> Math.PI * c.radius() * c.radius();
        case Rectangle r -> r.w() * r.h();
        case Triangle t -> t.calculateArea();
    };
}`
        },
        {
          name: 'Java 21 - Virtual Threads',
          explanation: 'Virtual threads are lightweight threads managed by the JVM, not the OS. Enable millions of concurrent operations with simple blocking code. Perfect for I/O-bound tasks like HTTP requests, database queries. Structured concurrency ensures proper lifecycle management.',
          codeExample: `// Create virtual thread
Thread vThread = Thread.ofVirtual().start(() -> {
    System.out.println("Running in virtual thread");
});
vThread.join();

// Virtual thread executor - scales to millions
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 1_000_000).forEach(i -> {
        executor.submit(() -> {
            // Blocking calls are cheap with virtual threads
            String data = httpClient.get("https://api.com/" + i);
            return processData(data);
        });
    });
} // Auto-shutdown and wait for completion

// Platform threads vs Virtual threads
// Platform: 1:1 mapping to OS threads, expensive, limited (~thousands)
// Virtual: Many-to-few mapping, cheap, millions possible

Thread.ofPlatform().start(() -> { /* OS thread */ });
Thread.ofVirtual().start(() -> { /* Virtual thread */ });

// Structured concurrency (Preview) - better than CompletableFuture
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    // Fork multiple tasks
    Future<User> userTask = scope.fork(() -> fetchUser(userId));
    Future<List<Order>> ordersTask = scope.fork(() -> fetchOrders(userId));
    Future<Address> addressTask = scope.fork(() -> fetchAddress(userId));

    scope.join();           // Wait for all tasks
    scope.throwIfFailed();  // Propagate first exception

    // All succeeded - get results
    User user = userTask.resultNow();
    List<Order> orders = ordersTask.resultNow();
    Address address = addressTask.resultNow();

    return new UserProfile(user, orders, address);
}

// Use case: Parallel HTTP requests
List<String> urls = List.of("url1", "url2", "url3");
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    List<CompletableFuture<String>> futures = urls.stream()
        .map(url -> CompletableFuture.supplyAsync(
            () -> httpClient.get(url), executor))
        .toList();

    CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
        .join();
}`
        },
        {
          name: 'Java 21+ - Latest Features',
          explanation: 'Sequenced collections provide consistent ordering operations. Unnamed patterns/variables use _ for ignored values. String templates (preview) enable safe interpolation. Foreign Function & Memory API for native interop.',
          codeExample: `// Sequenced Collections (Java 21) - consistent ordering
List<String> list = new ArrayList<>();
list.addFirst("first");   // Add to beginning
list.addLast("last");     // Add to end
String first = list.getFirst();  // Get first element
String last = list.getLast();    // Get last element
List<String> reversed = list.reversed();  // Reverse view

// Works with Set, Map too
LinkedHashSet<String> set = new LinkedHashSet<>();
set.addFirst("a");
set.addLast("z");

LinkedHashMap<String, Integer> map = new LinkedHashMap<>();
map.putFirst("first", 1);
map.putLast("last", 99);
Map.Entry<String, Integer> firstEntry = map.firstEntry();

// Unnamed patterns and variables (Java 21)
// Use _ for values you don't care about
if (obj instanceof Point(int x, _)) {
    // Only care about x, ignore y
    System.out.println("x = " + x);
}

// Unnamed variables in catch
try {
    riskyOperation();
} catch (Exception _) {  // Don't need exception object
    System.out.println("Operation failed");
}

// Multiple unnamed in switch
switch (shape) {
    case Circle(_, var radius) -> "radius: " + radius;
    case Rectangle(_, _) -> "rectangle";
    default -> "unknown";
}

// String templates (Preview - Java 21)
// Safe interpolation - NOT concatenation
String name = "Alice";
int age = 30;
String message = STR."Hello \\{name}, you are \\{age} years old";
// Result: "Hello Alice, you are 30 years old"

// With expressions
String json = STR."""
    {
        "name": "\\{user.getName()}",
        "age": \\{user.getAge()},
        "email": "\\{user.getEmail()}"
    }
    """;

// Foreign Function & Memory API (Java 22)
// Call native C libraries without JNI
Linker linker = Linker.nativeLinker();
SymbolLookup stdlib = linker.defaultLookup();
MethodHandle strlen = linker.downcallHandle(
    stdlib.find("strlen").orElseThrow(),
    FunctionDescriptor.of(JAVA_LONG, ADDRESS)
);`
        }
      ]
    },
    {
      id: 'jvm',
      name: 'JVM & Performance',
      icon: '⚙️',
      color: '#06b6d4',
      description: 'JVM internals, memory management, garbage collection, and performance optimization.',
      diagram: JavaOverviewDiagram,
      details: [
        {
          name: 'Memory Model',
          explanation: 'JVM memory: Heap (objects, GC-managed), Stack (method frames, thread-local), Metaspace (class metadata). Young generation (Eden + Survivor) for short-lived objects, Old generation for long-lived. GC algorithms: G1 (default), ZGC (low latency), Shenandoah.',
          codeExample: `// JVM memory configuration
// -Xms512m        Initial heap size
// -Xmx4g          Maximum heap size
// -XX:MetaspaceSize=256m
// -XX:+UseG1GC    Use G1 garbage collector
// -XX:+UseZGC     Use ZGC (low latency)

// Memory-efficient coding
// 1. Avoid creating unnecessary objects
String result = new StringBuilder()
    .append(a)
    .append(b)
    .toString();  // Better than a + b in loops

// 2. Use primitives over wrappers
int count = 0;  // Not Integer count = 0;

// 3. Proper collection sizing
List<String> list = new ArrayList<>(expectedSize);
Map<String, Integer> map = new HashMap<>(expectedSize * 4 / 3);

// 4. Use try-with-resources
try (InputStream is = new FileInputStream(file)) {
    // Auto-closed, no resource leaks
}`
        },
        {
          name: 'Garbage Collection',
          explanation: 'G1 GC: default, balances throughput and latency. ZGC: sub-millisecond pauses, good for large heaps. Shenandoah: concurrent compaction, low pause times. Monitor with -Xlog:gc* or tools like VisualVM, JFR.',
          codeExample: `// G1 GC tuning (default in Java 9+)
// -XX:+UseG1GC
// -XX:MaxGCPauseMillis=200    Target pause time
// -XX:G1HeapRegionSize=16m    Region size
// -XX:InitiatingHeapOccupancyPercent=45

// ZGC for low latency (Java 15+)
// -XX:+UseZGC
// -XX:+ZGenerational          (Java 21+)

// GC logging
// -Xlog:gc*:file=gc.log:time,level,tags

// Monitoring tools
// jstat -gc <pid> 1000       GC statistics
// jmap -heap <pid>           Heap summary
// jcmd <pid> GC.heap_info    Heap info

// Avoid GC pressure
// - Reuse objects (object pools)
// - Avoid finalizers (use Cleaner)
// - Use weak/soft references for caches
WeakReference<ExpensiveObject> weakRef =
    new WeakReference<>(expensive);
SoftReference<byte[]> cache =
    new SoftReference<>(new byte[1024 * 1024]);`
        },
        {
          name: 'Performance Tips',
          explanation: 'Profile before optimizing (JFR, async-profiler). Use StringBuilder for string concatenation in loops. Prefer primitives and arrays over wrappers and collections for hot paths. Cache expensive computations. Use appropriate data structures.',
          codeExample: `// 1. String concatenation
// Bad in loop
String result = "";
for (String s : items) {
    result += s;  // Creates new String each iteration
}

// Good
StringBuilder sb = new StringBuilder();
for (String s : items) {
    sb.append(s);
}
String result = sb.toString();

// 2. Use primitive streams
int sum = list.stream()
    .mapToInt(Integer::intValue)  // Avoid boxing
    .sum();

// 3. Lazy initialization
private volatile ExpensiveObject instance;

public ExpensiveObject getInstance() {
    ExpensiveObject result = instance;
    if (result == null) {
        synchronized (this) {
            result = instance;
            if (result == null) {
                instance = result = new ExpensiveObject();
            }
        }
    }
    return result;
}

// 4. Use appropriate collections
// EnumSet/EnumMap for enum keys
EnumSet<Day> weekend = EnumSet.of(Day.SATURDAY, Day.SUNDAY);
EnumMap<Day, String> schedule = new EnumMap<>(Day.class);`
        }
      ]
    },
    {
      id: 'fundamentals',
      name: 'Interview Fundamentals',
      icon: '🔑',
      color: '#a855f7',
      description: 'Essential Java interview concepts grouped by topic: JVM & memory, class/object mechanics, modern essentials, and runtime quirks.',
      diagram: JavaOverviewDiagram,
      details: [
        // ============================================================
        // 🧠 JVM & Memory
        // ============================================================
        {
          name: '🧠 JVM vs JDK vs JRE',
          explanation: 'These three are nested: JDK ⊃ JRE ⊃ JVM. JVM (Java Virtual Machine) is the runtime engine that executes bytecode — platform-specific (Windows/Linux/Mac) but runs the same .class files. JRE (Java Runtime Environment) = JVM + class libraries (java.*, javax.*) — what end-users install to RUN Java apps. JDK (Java Development Kit) = JRE + dev tools (javac, javadoc, jdb, jar, jlink) — what developers install to BUILD Java apps. Java 9+ stopped distributing JRE separately; use jlink for custom slim runtimes.',
          codeExample: `// JVM Components
// ┌──────────────────────────────────────┐
// │ ClassLoader Subsystem                │  loads .class files
// │ Runtime Data Areas:                  │
// │   - Method Area (Metaspace, Java 8+) │  class metadata
// │   - Heap                             │  all objects
// │   - Stack (per thread)               │  method frames
// │   - PC Register (per thread)         │  current instruction
// │   - Native Method Stack              │  for JNI
// │ Execution Engine:                    │
// │   - Interpreter                      │  runs bytecode
// │   - JIT Compiler                     │  bytecode → native
// │   - Garbage Collector                │
// └──────────────────────────────────────┘

// JDK tools (NOT in JRE)
javac MyClass.java          // compile .java → .class
javadoc -d docs *.java      // generate API docs
jdb MyClass                 // debugger
jar cf myapp.jar *.class    // package
jlink --add-modules java.base --output mini-jre   // custom slim JRE

// JRE only (run, no compile)
java MyClass                // runs bytecode

// "Write once, run anywhere"
// 1. javac compiles to platform-independent bytecode
// 2. JVM is platform-specific, JIT compiles bytecode → native
// 3. Same .class runs on any JVM`
        },
        {
          name: '🧠 Class Loaders',
          explanation: 'A ClassLoader loads .class bytecode into the JVM at runtime. Java uses a hierarchy with parent delegation — a child loader always asks its parent first before loading itself. Three built-in loaders: Bootstrap (core JDK, java.lang.*, native), Platform/Extension (javax.* and platform modules), and Application/System (your code from CLASSPATH). Custom loaders enable plugins, hot-reload, and isolation (Tomcat, OSGi).',
          codeExample: `// Get the class loader
ClassLoader cl = String.class.getClassLoader();
// → null (Bootstrap loader, native code)

ClassLoader appCl = MyClass.class.getClassLoader();
// → jdk.internal.loader.ClassLoaders$AppClassLoader

ClassLoader parent = appCl.getParent();
// → PlatformClassLoader (was ExtClassLoader pre-Java 9)

// Custom ClassLoader
public class MyClassLoader extends ClassLoader {
    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        byte[] bytes = loadBytecode(name);  // disk, network, encrypted
        return defineClass(name, bytes, 0, bytes.length);
    }
}

ClassLoader loader = new MyClassLoader();
Class<?> cls = loader.loadClass("com.example.Plugin");
Object instance = cls.getDeclaredConstructor().newInstance();

// Loading phases:
// 1. Loading    — read .class bytes
// 2. Linking    — verify, prepare statics, resolve refs
// 3. Initialization — run <clinit> (static blocks, static fields)`
        },
        {
          name: '🧠 Heap (Objects) vs Stack (Methods)',
          explanation: 'JVM memory splits into two main regions. Stack: per-thread, LIFO method frames, stores local primitives + references (not the object), parameters; size ~512KB-1MB; StackOverflowError on too-deep recursion; very fast (no allocator). Heap: shared by all threads, holds all objects + arrays + class metadata; generational structure (Young = Eden + Survivors, Old, plus Metaspace off-heap for class metadata since Java 8); GC-managed; OutOfMemoryError when full. Java is always pass-by-value — for objects, the reference is copied.',
          codeExample: `void process() {                       // new STACK frame
    int count = 5;                     // primitive — on STACK
    User user = new User("Alice");     // 'user' (reference) on STACK
                                        // User OBJECT on HEAP
    String name = user.getName();      // 'name' (reference) on STACK
                                        // "Alice" on HEAP (string pool)
    helper(user);                       // pushes new frame, passes ref
}                                       // frame popped; refs gone;
                                        // GC may collect heap objects later

// Stack overflow
void recurse() { recurse(); }
recurse();   // StackOverflowError after thousands of frames

// Heap overflow
List<byte[]> leak = new ArrayList<>();
while (true) leak.add(new byte[1024 * 1024]);
// → OutOfMemoryError: Java heap space

// Pass-by-value for objects
void mutate(User u) {
    u.setName("Bob");      // MODIFIES the heap object — visible outside
    u = new User("Eve");   // reassigns LOCAL reference — invisible outside
}

User original = new User("Alice");
mutate(original);
System.out.println(original.getName());   // "Bob" — mutated, not "Eve"

// JVM tuning
// -Xss512k         Stack size per thread
// -Xms512m         Initial heap
// -Xmx4g           Max heap
// -XX:MetaspaceSize=128m

// Beyond stack/heap
// PC Register             — per thread, current bytecode address
// Native Method Stack     — for JNI calls
// Method Area / Metaspace — class metadata (off-heap, Java 8+)`
        },
        {
          name: '🧠 Garbage Collection — Mark & Sweep',
          explanation: 'Mark & Sweep is the foundational reachability-based GC algorithm. Phase 1 (Mark): trace from GC Roots (active stack frames, static fields, JNI refs) and mark all reachable objects as live. Phase 2 (Sweep): walk heap and free unmarked objects — leaving fragmented free space. Optional Phase 3 (Compact): move live objects together to eliminate fragmentation. Modern collectors (G1, ZGC, Shenandoah) descend from this with generational, incremental, concurrent, and region-based optimizations.',
          codeExample: `// GC Roots (objects considered always reachable):
// - Local variables in active stack frames
// - Static fields
// - Active threads
// - JNI references
// - Synchronized monitors

// Reachability example
Object a = new Object();   // a → Obj1 (reachable: a is local var = root)
a = null;                   // Obj1 unreachable → eligible for GC

// Cycle detection (mark&sweep handles this; ref-counting cannot)
class Node { Node next; }
Node x = new Node();
Node y = new Node();
x.next = y;  y.next = x;   // cycle
x = null; y = null;
// Both are unreachable from any root → GC reclaims them

// JVM tuning
// -XX:+UseG1GC                    G1 (default Java 9+)
// -XX:+UseZGC                     ZGC (sub-ms pauses, Java 15+)
// -XX:MaxGCPauseMillis=200        Target pause time
// -Xlog:gc*:file=gc.log           GC logs

// Manual hint (rarely useful — JVM may ignore)
System.gc();   // suggestion only

// Force memory release of caches
WeakReference<HeavyObject> weak = new WeakReference<>(obj);
SoftReference<byte[]> cache = new SoftReference<>(new byte[1<<20]);`
        },
        {
          name: 'this and super',
          explanation: '"this" is a reference to the current object instance — used to disambiguate fields from parameters with the same name, or to invoke another constructor in the same class via this(...). "super" references the parent class — used to call parent constructor (super(...)) or invoke an overridden parent method (super.method()). Both this(...) and super(...) must be the FIRST statement in a constructor.',
          codeExample: `public class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;          // this.name (field) vs name (param)
    }

    public void speak() {
        System.out.println("...");
    }
}

public class Dog extends Animal {
    private String breed;

    public Dog(String name, String breed) {
        super(name);                  // call parent constructor — must be FIRST
        this.breed = breed;
    }

    public Dog(String name) {
        this(name, "Mixed");          // call other ctor — must be FIRST
    }

    @Override
    public void speak() {
        super.speak();                // call parent's speak()
        System.out.println("Woof!");
    }

    public Dog self() {
        return this;                  // return current instance (for chaining)
    }
}

// Compile errors:
// - this/super not allowed in static methods (no instance)
// - Can't use both this(...) and super(...) in one constructor
// - If parent has no no-arg ctor, you MUST call super(args) explicitly`
        },
        {
          name: 'static keyword',
          explanation: '"static" means the member belongs to the CLASS, not to instances. One copy is shared across all instances. Used for: class-level state (counters, caches, constants), utility methods (Math.sqrt), static blocks (initialization), static nested classes (no implicit outer reference). Static methods cannot access instance members directly (no "this"). Static methods cannot be overridden — only hidden.',
          codeExample: `public class Counter {
    private static int totalCount = 0;     // shared across instances
    private final int id;

    public Counter() {
        id = ++totalCount;
    }

    public static int getTotal() {
        return totalCount;                  // can only access static members
    }

    // public static int getId() { return id; } // ERROR: 'id' is non-static
}

Counter a = new Counter();    // totalCount = 1
Counter b = new Counter();    // totalCount = 2
Counter.getTotal();           // 2 — access via class, not instance

// Constants
public class HttpStatus {
    public static final int OK = 200;
    public static final int NOT_FOUND = 404;
}

// Static import
import static java.lang.Math.*;
double r = sqrt(2);   // no Math. prefix

// Static nested class — no outer reference
class Outer {
    static class Inner {  // doesn't hold Outer.this
        // can be instantiated standalone: new Outer.Inner()
    }
}

// ⚠️ Pitfall: static fields are shared across threads.
// Mutating them without synchronization → race conditions.
// Static collections that grow forever → memory leak.`
        },
        {
          name: 'Ways to Create an Object',
          explanation: 'Five main ways to instantiate an object in Java: (1) new keyword — most common; (2) Reflection — Class.forName + Constructor.newInstance, used by frameworks like Spring/Hibernate; (3) clone() — copies an existing object (default is shallow); (4) Deserialization — ObjectInputStream.readObject, bypasses constructor; (5) Factory methods — static methods returning instances (List.of, LocalDate.now). Joshua Bloch recommends avoiding clone() in favor of copy constructors or static factory methods.',
          codeExample: `// 1. new keyword (99% of cases)
User u1 = new User("Alice", 30);

// 2. Reflection
Class<?> cls = Class.forName("com.example.User");
Constructor<?> ctor = cls.getDeclaredConstructor(String.class, int.class);
User u2 = (User) ctor.newInstance("Bob", 25);

// 3. clone() — implements Cloneable
public class User implements Cloneable {
    String name;
    @Override
    public User clone() throws CloneNotSupportedException {
        return (User) super.clone();   // shallow by default
    }
}
User u3 = u1.clone();   // separate object, same field values

// Deep clone — copy nested mutable references
@Override
public User clone() {
    User copy = (User) super.clone();
    copy.addresses = new ArrayList<>(this.addresses);  // deep
    return copy;
}

// 4. Deserialization — does NOT call constructor!
try (ObjectInputStream in = new ObjectInputStream(new FileInputStream("u.ser"))) {
    User u4 = (User) in.readObject();
}

// 5. Static factory methods (best practice)
List<Integer> list = List.of(1, 2, 3);
LocalDate today = LocalDate.now();
User u5 = User.copyOf(u1);   // preferred over clone()`
        },
        {
          name: 'Private Constructor',
          explanation: 'A private constructor prevents instantiation from outside the class. Used for: (1) Singleton — one shared instance; (2) Utility class — only static members, no instances; (3) Static factory pattern — controlled creation through named methods; (4) Builder pattern — only the Builder calls the private constructor. A class with only private constructors cannot be subclassed (children can\'t call any super(...)) — effectively making it final.',
          codeExample: `// 1. Singleton
public class Database {
    private static final Database INSTANCE = new Database();
    private Database() { }                        // can't be called externally
    public static Database getInstance() { return INSTANCE; }
}

// 2. Utility class
public final class StringUtils {
    private StringUtils() {
        throw new AssertionError("No instances!");  // also blocks reflection
    }
    public static boolean isEmpty(String s) {
        return s == null || s.isEmpty();
    }
}

// 3. Static factory
public class User {
    private final String name;
    private User(String name) { this.name = name; }

    public static User named(String name)    { return new User(name); }
    public static User anonymous()           { return new User("Anonymous"); }
}
User u = User.named("Alice");        // more readable than constructor

// 4. Builder pattern
public class Pizza {
    private Pizza(Builder b) { /* ... */ }     // only Builder calls this
    public static class Builder {
        public Pizza build() { return new Pizza(this); }
    }
}

// Side effect: cannot be subclassed
public class Final {
    private Final() {}
}
// class Child extends Final { }  // ERROR: no accessible constructor`
        },
        {
          name: 'Static Initializer Block',
          explanation: 'A static initializer block runs ONCE when the class is loaded — before any constructors, before main(). Used for complex static field initialization that needs multiple statements, exception handling, or computation. Multiple blocks execute in source order. Initialization order: (1) static fields/blocks once on class load → (2) instance fields/blocks per "new" → (3) constructor body. If a static block throws, the class fails to load with ExceptionInInitializerError.',
          codeExample: `public class Config {
    static int maxConnections;
    static Map<String, String> settings;

    // Static initializer block — runs once, on class load
    static {
        System.out.println("Class loaded — running static block");
        maxConnections = readFromEnv("MAX_CONNECTIONS", 10);
        settings = new HashMap<>();
        settings.put("env", System.getenv("ENV"));
    }

    static {
        // Multiple blocks allowed — execute in source order
        settings.put("version", "1.0");
    }
}

// Initialization order
public class Order {
    static int counter;
    int id;

    static    { counter = 0;       System.out.println("static block"); }
    {           id = ++counter;     System.out.println("instance: " + id); }

    public Order() {                System.out.println("ctor: " + id); }
}

new Order();   // static block (once), instance: 1, ctor: 1
new Order();   // instance: 2, ctor: 2  (no static again)

// Common uses
static {
    System.loadLibrary("nativeLib");      // load native library
}
static {
    try {
        config = new Properties();
        config.load(getResourceAsStream("app.properties"));
    } catch (IOException e) {
        throw new ExceptionInInitializerError(e);
    }
}`
        },
        {
          name: 'try-with-resources',
          explanation: 'Java 7+ syntax for automatic resource management. Any resource declared in the try(...) header is closed automatically when the block exits — normally OR via exception. The resource must implement AutoCloseable (or its subinterface Closeable). Multiple resources are closed in REVERSE order of declaration. If both the try body and close() throw, the close exception is attached as a SUPPRESSED exception on the primary one (Throwable.getSuppressed()). Java 9+ allows declaring an effectively-final variable OUTSIDE the parens.',
          codeExample: `// Pre-Java 7 — verbose, error-prone, masks exceptions
InputStream in = null;
try {
    in = new FileInputStream("data.txt");
    // ... use in
} finally {
    if (in != null) {
        try { in.close(); } catch (IOException e) { /* swallowed! */ }
    }
}

// Java 7+ — try-with-resources
try (InputStream in = new FileInputStream("data.txt")) {
    // ... use in
}   // close() called automatically — even on exception

// Multiple resources — closed in REVERSE order of declaration
try (InputStream in = new FileInputStream("a.txt");
     OutputStream out = new FileOutputStream("b.txt")) {
    in.transferTo(out);
}
// close order: out first, then in

// Java 9+ — effectively-final variable can live outside the parens
InputStream in = new FileInputStream("data.txt");
try (in) {                                  // ✓ Java 9+
    // ... use in
}

// Custom resource — must implement AutoCloseable
public class DbSession implements AutoCloseable {
    @Override
    public void close() throws Exception {
        // release connection
    }
}

try (DbSession s = openSession()) {
    s.query("SELECT 1");
}

// SUPPRESSED EXCEPTIONS
try (Resource r = new Resource()) {
    throw new RuntimeException("primary");   // (A)
}
// If close() also throws (B), the runtime keeps (A) and attaches (B) via
// addSuppressed(). Pre-Java 7 finally would have LOST (A) silently.

catch (Exception e) {
    e.getMessage();                  // "primary"
    Throwable[] sup = e.getSuppressed();   // [exception from close()]
}

// AutoCloseable vs Closeable
// - AutoCloseable.close() throws Exception            — anything cleanable
// - Closeable extends AutoCloseable, throws IOException — I/O resources
// Use Closeable for streams; AutoCloseable for locks, sessions, transactions

// Use cases beyond I/O
try (var lock = redisLock.acquire("user:1")) { ... }       // distributed lock
try (var tx = db.beginTransaction()) { ... tx.commit(); }  // transaction
try (var span = tracer.startSpan("op")) { ... }            // tracing span
try (MDC.putCloseable("requestId", id)) { ... }             // SLF4J context

// COMMON BUG — wrapping that loses outer reference
try (BufferedReader br = new BufferedReader(new FileReader(file))) {
    // OK: br closes — and BufferedReader.close() also closes the wrapped FileReader
}
// But if BufferedReader constructor throws AFTER FileReader opens, FileReader leaks.
// Fix: declare both in try header
try (FileReader fr = new FileReader(file);
     BufferedReader br = new BufferedReader(fr)) {
    // both safely closed (in reverse order)
}`
        },
        {
          name: 'main without "public" modifier',
          explanation: 'Pre-Java 21: the JVM specifically requires "public static void main(String[] args)". Dropping "public" causes "Error: Main method not found" — even though the class compiles. The JVM looks up main from outside the class, so public is required for accessibility. Java 21+ (JEP 445, "unnamed classes and instance main methods", preview) relaxes this — you can drop public, static, the class declaration itself, and even String[] args.',
          codeExample: `// Pre-Java 21 — FAILS at runtime
class Test {
    static void main(String[] args) {        // missing 'public'
        System.out.println("Hello");
    }
}
// $ java Test
// Error: Main method not found in class Test

// Required signature pre-21
public class App {
    public static void main(String[] args) {
        // public — accessible to JVM
        // static — no instance needed
        // void   — exit codes via System.exit()
        // String[] args — command-line args
    }
}

// Java 21+ — JEP 445 (preview): simplified entry points
// Hello.java — no class needed!
void main() {
    System.out.println("Hello, world!");
}
// java --enable-preview --source 21 Hello.java

// Allowed variations:
void main()                              // simplest
void main(String[] args)                 // with args
public void main()                       // explicit public
public static void main()                // traditional, no args

// Common interview tricks (pre-21)
// Q: Can main be private?    A: No — JVM can't find it
// Q: Can main return int?    A: No — must be void
// Q: Can you have multiple main? A: No (per class), but overloading is OK`
        },
        {
          name: 'Running Without main()',
          explanation: 'Pre-Java 7: yes — using a static initializer block that calls System.exit(0) before the JVM checks for main. Java 7+: the JVM checks for main BEFORE class initialization runs, so even System.exit in a static block can\'t prevent the "main method not found" error. Other ways to "run code without main": library classes (loaded by other apps), servlets (entry point is doGet/doPost), Spring Boot (main exists but trivially calls run()), JUnit tests (runner provides entry point), Java 21+ instance main methods.',
          codeExample: `// Pre-Java 7 only — the classic trick
public class NoMain {
    static {
        System.out.println("Hello without main!");
        System.exit(0);   // exit before JVM looks up main()
    }
}
// Java 6: prints "Hello without main!"
// Java 7+: prints "Hello without main!" THEN errors out

// Why it stopped working:
// Java 7+ checks main BEFORE class initialization

// Library classes (no main, run by other apps)
public class StringUtils {
    public static boolean isEmpty(String s) {
        return s == null || s.isEmpty();
    }
}
// Used as: StringUtils.isEmpty("foo")  — no main needed

// Servlets — entry points are HTTP methods
public class MyServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) {
        // entry point — container (Tomcat) calls this
    }
}

// JUnit tests
public class MyTest {
    @Test
    void testSomething() {
        assertEquals(1, 1);   // runner provides entry, no main
    }
}

// Java 21+ — instance main (JEP 445, preview)
void main() {
    System.out.println("No 'class' or 'static' or 'public' needed");
}`
        },
        {
          name: 'Explain System.out.println()',
          explanation: 'Three components: System is a final class in java.lang providing access to standard streams; out is a public static final PrintStream field of System (initialized by JVM at startup) — the standard output stream; println is an instance method on PrintStream that prints arg + newline (synchronized on the stream). Performance pitfall: println synchronizes on the PrintStream — concurrent threads serialize through it. Use a logger (Log4j/SLF4J) for production code.',
          codeExample: `// System class (java.lang)
public final class System {
    public static final PrintStream out;     // standard output
    public static final PrintStream err;     // standard error
    public static final InputStream in;      // standard input

    static {
        // initialized by JVM at startup
    }
}

// PrintStream.println (synchronized!)
public class PrintStream extends FilterOutputStream {
    public void println(String x) {
        synchronized (this) {
            print(x);
            newLine();
        }
    }
}

// Why "out" is static
System.out.println("hi");   // ✓ access via class
new System().out.println("hi");   // ✗ System has private constructor

// Redirecting output (yes, despite 'final'!)
PrintStream original = System.out;
System.setOut(new PrintStream(new FileOutputStream("log.txt")));
System.out.println("Goes to log file");
System.setOut(original);   // restore
// setOut() uses native code to bypass 'final'

// Performance pitfall
for (int i = 0; i < 1_000_000; i++) {
    System.out.println(i);   // synchronized — slow in hot paths
}

// Production alternatives
logger.info("User {} logged in", user.id);   // SLF4J — lazy formatting
System.out.printf("%d items%n", count);      // formatted
log.info(() -> heavyToString(obj));          // lazy supplier`
        },
        {
          name: 'Records and Sealed Classes',
          explanation: 'Records (Java 14+, GA in 16) are immutable data carriers — the compiler auto-generates the canonical constructor, accessors, equals, hashCode, and toString from the header. They are implicitly final and extend java.lang.Record. Sealed classes (Java 17+) restrict which classes can extend/implement them via the "permits" clause — enabling exhaustive pattern matching. Together they enable algebraic data types: a sealed interface with record subtypes gives type-safe sum types.',
          codeExample: `// RECORDS — immutable data carrier
public record Point(int x, int y) {}

Point p = new Point(3, 4);
p.x();          // accessor (no get prefix)
p.y();
p.equals(new Point(3, 4));   // true — value-based equals
p.toString();   // "Point[x=3, y=4]"

// Compact constructor — validate without listing all fields
public record User(String name, int age) {
    public User {                            // compact ctor
        if (age < 0) throw new IllegalArgumentException();
        name = name.trim();                  // can normalize
    }
}

// Records are implicitly final; can implement interfaces
public record Vector2(double x, double y) implements Comparable<Vector2> {
    public double magnitude() { return Math.sqrt(x*x + y*y); }

    @Override
    public int compareTo(Vector2 o) {
        return Double.compare(magnitude(), o.magnitude());
    }
}

// SEALED CLASSES — controlled inheritance
public sealed interface Shape permits Circle, Square, Triangle {}

public record Circle(double radius)              implements Shape {}
public record Square(double side)                implements Shape {}
public record Triangle(double a, double b, double c) implements Shape {}

// Exhaustive pattern matching (Java 21+)
double area(Shape s) {
    return switch (s) {
        case Circle c    -> Math.PI * c.radius() * c.radius();
        case Square sq   -> sq.side() * sq.side();
        case Triangle t  -> heronArea(t);
        // no default needed — compiler enforces exhaustiveness
    };
}

// permits options for subclasses:
// - final            (record/class — no further subclassing)
// - sealed           (subclass must also restrict its children)
// - non-sealed       (subclass opens up unrestricted inheritance)

// Use cases
// - DTOs / API responses (records replace Lombok @Value)
// - AST nodes, state machines, sum types (sealed + records)
// - Immutable value objects in DDD`
        },
        {
          name: 'Wrapper Classes & Autoboxing',
          explanation: 'Each primitive (int, long, double, boolean...) has a wrapper class (Integer, Long, Double, Boolean) used wherever an object is required (collections, generics, null). Autoboxing (Java 5+) automatically converts primitive ↔ wrapper. PITFALLS: (1) Integer cache — values -128 to 127 are cached, so == returns true for cached but false for larger; always use .equals() for wrapper comparison. (2) Unboxing a null wrapper throws NullPointerException. (3) Boxing in tight loops kills performance — heap allocation per value.',
          codeExample: `// Wrapper classes for each primitive
int      ↔ Integer
long     ↔ Long
double   ↔ Double
boolean  ↔ Boolean
char     ↔ Character
byte     ↔ Byte
short    ↔ Short
float    ↔ Float

// Autoboxing — primitive → wrapper
List<Integer> list = new ArrayList<>();
list.add(5);                    // autobox: int 5 → Integer.valueOf(5)
int sum = list.get(0) + 10;     // unbox: Integer → int

// PITFALL 1: Integer cache (-128 to 127)
Integer a = 100;
Integer b = 100;
a == b;            // true  (cached, same Integer object)
a.equals(b);       // true  ✓ correct comparison

Integer x = 200;
Integer y = 200;
x == y;            // FALSE (not cached, different objects!)
x.equals(y);       // true  ✓ always use .equals()

// PITFALL 2: NullPointerException on unboxing
Map<String, Integer> map = new HashMap<>();
int count = map.get("missing");   // throws NPE — get() returns null,
                                   // Java tries to unbox null → int

// Safe pattern
Integer val = map.get("missing");
int count = val != null ? val : 0;
// Or:
int count = map.getOrDefault("missing", 0);

// PITFALL 3: Boxing in loops kills performance
Long sum = 0L;                        // ⚠️ boxed
for (long i = 0; i < 1_000_000; i++) {
    sum += i;                          // unbox + add + autobox each iter
}
// → 1M extra Long objects allocated, massive GC pressure

// Fix
long sum = 0L;                         // primitive
for (long i = 0; i < 1_000_000; i++) {
    sum += i;                          // pure primitive math
}

// Use primitive streams to avoid boxing
int total = list.stream()
    .mapToInt(Integer::intValue)       // IntStream — no boxing
    .sum();

// Wrapper vs primitive — when to use which
// Primitives: hot paths, math, perf-critical
// Wrappers: collections, generics, "nullable" (e.g. JDBC results),
//           Optional, JPA entities`
        }
      ]
    },
    {
      id: 'fundamentals-senior',
      name: 'Senior Interview Topics',
      icon: '⚡',
      color: '#ef4444',
      description: 'Advanced Java interview concepts: JMM & happens-before, HashMap internals (treeification), CAS/ABA, reference types, invokedynamic, type erasure, CompletableFuture, virtual threads, classloader leaks.',
      diagram: JavaOverviewDiagram,
      details: [
        {
          name: 'Java Memory Model & happens-before',
          explanation: 'The JMM defines when one thread\'s memory writes become visible to another. Without "happens-before" edges, the compiler/CPU can reorder operations, and reads can see stale values forever. Edges include: program order within a thread, synchronized lock release → subsequent acquire of the same lock, volatile write → subsequent volatile read of the same variable, Thread.start() → first action in new thread, last action of thread → join() return, final field writes in constructor → reads after construction completes.',
          codeExample: `// Without happens-before — data race, broken
class Broken {
    int data = 0;
    boolean ready = false;

    void writer() {
        data = 42;          // (1)
        ready = true;       // (2)
    }

    void reader() {
        if (ready) {        // (3) may NEVER see true, OR see true
            print(data);    // (4) but data still 0! (reordered/stale)
        }
    }
}

// Fix: volatile creates a happens-before edge
class Fixed {
    int data = 0;
    volatile boolean ready = false;     // ← key change

    void writer() {
        data = 42;                       // (1) HB→ (2)
        ready = true;                    // (2) volatile write
    }

    void reader() {
        if (ready) {                     // (3) volatile read sees (2)
            print(data);                 // (4) → also sees (1) — guaranteed 42
        }
    }
}

// Synchronized creates HB on the same monitor
synchronized (lock) { x = 1; }              // release HB→
synchronized (lock) { print(x); }           // → acquire — sees x=1

// Thread.start() / join()
int x = 0;
Thread t = new Thread(() -> System.out.println(x));   // sees x=0
x = 5;
t.start();                                  // start HB→ thread's first action
                                            // → thread sees x=5

// final field semantics — the only safe lockless publication
class Immutable {
    final int x;
    Immutable(int x) { this.x = x; }   // final write HB→ any read after ctor
}
// After 'new Immutable(5)' is published, all threads see x=5

// SAFE PUBLICATION patterns
// 1. Initialize in static initializer
// 2. Store in volatile field
// 3. Store in final field of constructor
// 4. Store in field guarded by lock`
        },
        {
          name: 'HashMap Internals (Treeification)',
          explanation: 'HashMap is an array of "buckets" — each bucket is initially a linked list of entries. The hash function spreads bits with (h ^ (h >>> 16)) to mix high bits into the low bits used for indexing (since table size is a power of two, only low bits would otherwise be used). At load factor 0.75, the table doubles. Java 8 added TREEIFICATION: a bucket with 8+ entries (and table size ≥ 64) converts to a red-black tree, dropping worst-case from O(n) to O(log n) under hash flooding attacks. It un-treeifies back to a list at 6 entries.',
          codeExample: `// Bucket structure (Java 8+)
// table[i] starts as a linked list of Node<K,V>
// At 8 collisions in one bucket (and table.length >= 64),
//   list → red-black tree (TreeNode<K,V>)
// At 6, untreeifies back to list (hysteresis prevents oscillation)

// Hash function — spread high bits to low
static int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}

// Index calculation — power-of-two table size enables (n-1) mask
int index = (table.length - 1) & hash;
// Equivalent to: hash % table.length, but faster

// Resize threshold
// table grows when size > capacity * loadFactor (default 0.75)
// Initial capacity 16 → 12 entries → resize to 32
// Each resize redistributes entries (split point: high bit of new size)

// Treeification thresholds
static final int TREEIFY_THRESHOLD = 8;     // list → tree
static final int UNTREEIFY_THRESHOLD = 6;   // tree → list
static final int MIN_TREEIFY_CAPACITY = 64; // table must be ≥ 64

// Why these numbers?
// - 8: probability of a bucket having 8 collisions with good hash is ~10^-7
//      (Poisson distribution). If you hit it, you have a hash flood attack.
// - 6: hysteresis — avoid flapping list↔tree when entries are added/removed
//      around 8.

// Why power-of-two capacity?
// - (n-1) & hash replaces % — much faster
// - Resize doubles size; entries either stay or move by exactly old capacity

// Equality contract
// If a.equals(b), then a.hashCode() == b.hashCode() — MANDATORY
// (Other direction not required; hash collisions are OK)

// Common bugs
// 1. Mutating a key after insertion (hashCode changes → can't find entry)
// 2. Using objects without proper equals/hashCode (default = identity)
// 3. Not synchronizing — use ConcurrentHashMap for shared maps`
        },
        {
          name: 'CAS and the ABA Problem',
          explanation: 'Compare-And-Swap (CAS) is an atomic CPU instruction: "if this memory location still holds the expected value, replace it with the new value." It enables lock-free algorithms via java.util.concurrent.atomic. The ABA PROBLEM: thread T1 reads value A, gets preempted; thread T2 changes A→B→A; T1 resumes and CAS(A, A, new) succeeds — but the world has changed. The fix: include a version stamp (AtomicStampedReference) so CAS checks both value AND stamp.',
          codeExample: `// CAS via AtomicInteger (lock-free counter)
AtomicInteger counter = new AtomicInteger(0);

int oldVal, newVal;
do {
    oldVal = counter.get();
    newVal = oldVal + 1;
} while (!counter.compareAndSet(oldVal, newVal));

// Or simply
counter.incrementAndGet();   // implemented exactly like above internally

// AtomicReference for objects
AtomicReference<Node> head = new AtomicReference<>();
Node oldHead, newHead;
do {
    oldHead = head.get();
    newHead = new Node(value, oldHead);
} while (!head.compareAndSet(oldHead, newHead));   // lock-free push

// THE ABA PROBLEM
// Lock-free stack pop — looks correct, isn't!
Node oldHead;
do {
    oldHead = head.get();
    if (oldHead == null) return null;
} while (!head.compareAndSet(oldHead, oldHead.next));
// SCENARIO:
// 1. Thread T1: reads oldHead = A, sees A.next = B
// 2. T1 preempted
// 3. Thread T2: pops A → head=B; pops B → head=C; pushes A back → head=A (with new A.next=C)
// 4. T1 resumes: CAS(head, A, A.next=B) succeeds!
//    But B is no longer in the stack — corrupted state.

// FIX: AtomicStampedReference (value + version)
AtomicStampedReference<Node> head = new AtomicStampedReference<>(null, 0);

int[] stampHolder = new int[1];
Node oldHead;
int oldStamp;
do {
    oldHead = head.get(stampHolder);
    oldStamp = stampHolder[0];
    if (oldHead == null) return null;
} while (!head.compareAndSet(oldHead, oldHead.next, oldStamp, oldStamp + 1));
// Now even if value comes back to A, stamp differs → CAS fails → retry

// Where ABA bites in real code
// - Lock-free linked structures (stacks, queues, lists)
// - Memory reuse / object pooling
// - Anywhere a freed-and-reallocated address can equal a previously-read one`
        },
        {
          name: 'Reference Types: Strong/Soft/Weak/Phantom',
          explanation: 'Java has four levels of reachability that the GC respects. STRONG (default): prevents GC. SOFT: GC reclaims only when memory is tight — ideal for memory-sensitive caches. WEAK: GC reclaims at the very next cycle once no strong refs exist — used by WeakHashMap and listener registries. PHANTOM: never returned via get() (always null) — only enqueued in a ReferenceQueue before the object is finalized, used for post-mortem cleanup (Cleaner API replaces deprecated finalize).',
          codeExample: `import java.lang.ref.*;

// 1. STRONG — the default
Object obj = new Object();      // strongly reachable; GC never collects

// 2. SOFT — keep until memory pressure
SoftReference<byte[]> cache = new SoftReference<>(new byte[1024 * 1024]);
byte[] data = cache.get();      // may be null after low-memory GC
// Use case: in-memory caches that should yield to OOM

// 3. WEAK — collected at next GC cycle when only weakly reachable
WeakReference<User> ref = new WeakReference<>(new User("Alice"));
User u = ref.get();             // may be null any time
// Use case: WeakHashMap, listeners that shouldn't prevent GC

WeakHashMap<Key, Resource> registry = new WeakHashMap<>();
// Key collected → entry removed automatically

// 4. PHANTOM — for post-mortem cleanup (replaces finalize)
ReferenceQueue<Object> queue = new ReferenceQueue<>();
PhantomReference<Object> ref = new PhantomReference<>(obj, queue);
ref.get();                       // ALWAYS null — can't resurrect object

// Background thread polls queue
new Thread(() -> {
    while (true) {
        Reference<?> r = queue.remove();   // blocks until enqueued
        // r is now safe to clean up — its referent is unreachable
    }
}).start();

// Modern API: Cleaner (Java 9+) — built on phantom refs
Cleaner cleaner = Cleaner.create();
class Resource {
    private final Cleaner.Cleanable cleanable;
    Resource() {
        this.cleanable = cleaner.register(this, () -> {
            // cleanup logic — runs after object becomes unreachable
            releaseNativeMemory();
        });
    }
}

// REACHABILITY HIERARCHY (strongest to weakest)
// Strongly → Softly → Weakly → Phantom-reachable → Unreachable

// PITFALLS
// - SoftReference is NOT a magic cache — under memory pressure all softrefs may be cleared
// - WeakHashMap keys are weak, but values are strong — value→key chain causes leak
// - finalize() is deprecated since Java 9 — use Cleaner instead
// - ThreadLocal uses weak refs to keys but strong refs to values
//   → memory leak in app servers if you don't call .remove()`
        },
        {
          name: 'invokedynamic & Lambda Compilation',
          explanation: 'Lambdas do NOT compile to anonymous classes. The compiler emits an invokedynamic instruction whose bootstrap method is LambdaMetafactory.metafactory. At first call, the JVM generates the lambda implementation class on the fly (via ASM-like bytecode generation) and links the call site. Subsequent calls invoke the linked method handle directly — same speed as a regular method call. Benefits: no per-lambda .class file (smaller jar, faster startup), JIT can inline, lambdas without captures can be cached as singletons.',
          codeExample: `// What you write
Runnable r = () -> System.out.println("hi");

// What gets compiled (simplified)
Runnable r = INDY[ /* invokedynamic */ ](
    /* bootstrap */ LambdaMetafactory.metafactory,
    /* args */ Runnable.class, "run", () -> void,
    /* impl */ Hello::lambda$0
);

// First call: bootstrap method generates a class like
class Hello$$Lambda$1 implements Runnable {
    public void run() {
        Hello.lambda$0();  // invoked once, then cached
    }
}

// Lambda body becomes a private static synthetic method
private static void lambda$0() {
    System.out.println("hi");
}

// Compare to anonymous class (pre-Java 8 style)
Runnable r = new Runnable() {
    @Override public void run() { System.out.println("hi"); }
};
// → produces Outer$1.class file, holds Outer.this if non-static context

// HOW TO INSPECT
// javap -p -v Hello.class
// You'll see:
//   #invokedynamic #2,  0   // run:()LRunnable;
//                            //    [bootstrap:LambdaMetafactory.metafactory ...]

// Method references compile the same way
list.forEach(System.out::println);
// → invokedynamic with bootstrap pointing to System.out::println

// PERFORMANCE NOTES
// - Stateless lambdas (no captures): cached singleton — zero alloc per call
// - Capturing lambdas: new instance per evaluation site, like anonymous class
// - JIT can inline through method handles after a few invocations

Runnable a = () -> log("hi");
Runnable b = () -> log("hi");
// a == b   // typically TRUE for non-capturing — same singleton

int x = 5;
Runnable c = () -> log("x=" + x);
Runnable d = () -> log("x=" + x);
// c == d   // FALSE — captures create new instance

// WHY invokedynamic instead of anonymous classes?
// 1. Lazy class generation — startup cost moved to first use
// 2. JVM has freedom to choose strategy (could even inline directly)
// 3. Smaller bytecode footprint
// 4. Foundation for future features (records also use indy under the hood)`
        },
        {
          name: 'Type Erasure Pitfalls',
          explanation: 'Java generics are erased at compile time — at runtime, List<String> and List<Integer> are both just List. The bytecode keeps only the upper bound (Object by default, or the explicit bound). This breaks several intuitive operations: cannot do "instanceof T", "new T[]", "new T()", or "catch (T e)". Heap pollution: assigning a parameterized type to a raw type bypasses the compiler\'s checks; @SafeVarargs marks a varargs generic method as safe.',
          codeExample: `// What you write
public class Box<T> {
    private T value;
    public T get() { return value; }
}

// What runs (after erasure)
public class Box {                         // no T at runtime
    private Object value;                  // erased to Object (or bound)
    public Object get() { return value; }  // compiler inserts cast at call site
}

// Bounded erasure
public class NumBox<T extends Number> {
    private T value;
}
// Erases to: private Number value;   ← bound preserved

// FAILS to compile / runtime — the classic erasure traps
public class Bad<T> {
    void check(Object o) {
        if (o instanceof T) { }       // ✗ "cannot perform instanceof against type parameter"
    }

    T[] makeArray(int n) {
        return new T[n];               // ✗ "generic array creation"
    }

    T newInstance() {
        return new T();                 // ✗ "type parameter cannot be instantiated"
    }

    void caught(Throwable t) {
        try { } catch (T e) { }         // ✗ "cannot catch type parameter"
    }

    void overload(List<String> a) { }
    void overload(List<Integer> a) { }   // ✗ same erasure → conflict!
}

// WORKAROUND — pass Class<T> token
public class Good<T> {
    private final Class<T> type;
    public Good(Class<T> type) { this.type = type; }

    boolean check(Object o) { return type.isInstance(o); }      // ✓
    T[] makeArray(int n) {
        return (T[]) Array.newInstance(type, n);                 // ✓
    }
    T newInstance() throws Exception {
        return type.getDeclaredConstructor().newInstance();      // ✓
    }
}

// HEAP POLLUTION — generic varargs
@SafeVarargs    // YOU promise the method is safe
static <T> List<T> listOf(T... elements) {
    return Arrays.asList(elements);
}

// Without @SafeVarargs, the compiler warns:
// "Possible heap pollution from parameterized vararg type"

// REIFIED vs ERASED
// - Reified types: type info preserved at runtime (Kotlin "inline reified", C# generics)
// - Java: erased — backward compat with pre-generics code (1.5 design choice)

// Practical impact
// - Cannot use generics in static fields' types meaningfully
// - JSON libs (Jackson, Gson) need TypeReference<List<User>>{} trick to capture type
// - Spring's ParameterizedTypeReference<List<User>>{} same idea`
        },
        {
          name: 'CompletableFuture Composition',
          explanation: 'CompletableFuture is the modern async primitive — composable, exception-safe, with a rich API. Key methods: thenApply (map, sync), thenCompose (flatMap, async chain), thenCombine (zip two futures), allOf / anyOf (combine many), exceptionally / handle (recover from failure), whenComplete (side effect). CRITICAL PITFALL: methods without explicit Executor run on ForkJoinPool.commonPool() — a small shared pool. For blocking I/O, always pass your own executor.',
          codeExample: `// Basic creation
CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() -> fetchUser());

// thenApply — sync transformation (map)
CompletableFuture<Integer> f2 = f1.thenApply(user -> user.length());

// thenCompose — async chain (flatMap), avoids nested CF<CF<T>>
CompletableFuture<Order> f3 = userFuture
    .thenCompose(user -> fetchOrders(user))   // each returns a CF
    .thenApply(orders -> orders.get(0));

// thenCombine — zip two independent futures
CompletableFuture<Combined> result = userFuture.thenCombine(
    accountFuture,
    (user, account) -> new Combined(user, account)
);

// allOf — wait for all (returns Void; collect manually)
CompletableFuture<Void> all = CompletableFuture.allOf(f1, f2, f3);
all.thenRun(() -> {
    String r1 = f1.join();
    Integer r2 = f2.join();
    Order r3 = f3.join();
});

// anyOf — first to complete wins
CompletableFuture<Object> first = CompletableFuture.anyOf(primary, fallback);

// EXCEPTION HANDLING
future
    .thenApply(this::process)
    .exceptionally(ex -> {                    // recover with default
        log.error("failed", ex);
        return defaultValue;
    });

future.handle((result, ex) -> {               // both branches; like exceptionally + thenApply
    if (ex != null) return defaultValue;
    return process(result);
});

future.whenComplete((result, ex) -> {         // side effect only; doesn't transform
    log.info("done: {}", result);
});

// PITFALL 1: default executor
CompletableFuture.supplyAsync(() -> blockingDbCall())
    .thenApply(this::transform);
// Both run on ForkJoinPool.commonPool() — small (cores - 1)
// Blocking I/O starves all other CommonPool users (parallel streams, etc.)

// FIX: provide an executor sized for your workload
ExecutorService io = Executors.newFixedThreadPool(50);
CompletableFuture.supplyAsync(() -> blockingDbCall(), io)
    .thenApplyAsync(this::transform, io);     // also pass to "Async" variants

// PITFALL 2: thenApply continues on calling thread
future.thenApply(slow);                        // runs on whatever completed the future
future.thenApplyAsync(slow, executor);         // explicit thread pool

// PITFALL 3: get() vs join()
future.get();                                  // throws checked InterruptedException, ExecutionException
future.join();                                 // unchecked CompletionException — better in stream pipelines

// COMMON PATTERN: timeout (Java 9+)
future.completeOnTimeout(defaultValue, 2, TimeUnit.SECONDS);
future.orTimeout(2, TimeUnit.SECONDS);          // throws TimeoutException after deadline`
        },
        {
          name: 'Virtual Threads — Pinning & Pitfalls',
          explanation: 'Virtual threads (Project Loom, Java 21 GA) are JVM-managed threads that mount on a small pool of "carrier" platform threads. When a virtual thread blocks on supported I/O, it unmounts — the carrier picks up another virtual thread. This makes millions of concurrent threads cheap. PINNING: when a virtual thread enters synchronized or a native method, it CANNOT unmount — it pins the carrier, defeating the benefit. Fix: use ReentrantLock instead of synchronized for blocking I/O sections. Parallel streams and ForkJoin also pin.',
          codeExample: `// Creating virtual threads
Thread vt = Thread.startVirtualThread(() -> {
    System.out.println("in virtual thread: " + Thread.currentThread());
    // Output: VirtualThread[#21]/runnable@ForkJoinPool-1-worker-1
});

// Or with a builder
Thread.ofVirtual().name("worker").start(() -> work());

// Virtual thread executor (preferred for server apps)
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 1_000_000).forEach(i ->
        executor.submit(() -> handleRequest(i))   // 1M virtual threads — fine!
    );
}

// HOW UNMOUNTING WORKS
// Virtual thread runs on a carrier (platform) thread.
// On blocking call (HTTP, DB, sleep, lock acquire):
//   1. Stack frames copied to heap
//   2. Carrier released to run another virtual thread
//   3. When I/O completes, scheduler mounts on (any) carrier and resumes

// PINNING — blocks unmounting
// Pin happens when virtual thread is in:
//   1. synchronized block/method
//   2. Native method (JNI)
//   3. ForeignFunction call

// BAD — synchronized around blocking I/O pins the carrier
synchronized (lock) {
    var data = httpClient.send(req);   // ⚠️ pins! carrier unavailable for whole call
}

// GOOD — ReentrantLock can park properly
lock.lock();
try {
    var data = httpClient.send(req);   // ✓ unmounts during HTTP I/O
} finally {
    lock.unlock();
}

// DETECT PINNING
// JVM flag: -Djdk.tracePinnedThreads=full
// Logs every pinning event with stack trace

// WHEN NOT TO USE VIRTUAL THREADS
// 1. CPU-bound work — virtual threads add scheduling overhead vs platform pool.
//    Use Executors.newWorkStealingPool() or parallel streams for compute.
// 2. Code with heavy synchronized usage — pinning cancels the benefit.
// 3. Long-running tasks holding native resources or ThreadLocal-keyed state.
//    ThreadLocals work but each VT has its own — millions of VTs = ThreadLocal memory blowup.
//    Use ScopedValue (Java 21+) instead.

// MIGRATION PATH
// Old:
ExecutorService pool = Executors.newFixedThreadPool(200);
// New:
ExecutorService pool = Executors.newVirtualThreadPerTaskExecutor();
// Code unchanged; concurrency limit moves from threads → upstream rate limiting

// COMMON MISCONCEPTIONS
// - VTs are NOT faster for one task; they're cheaper to have many
// - VTs do NOT magically parallelize CPU work (still bound by carriers)
// - VTs are NOT a drop-in replacement for reactive code that's already non-blocking`
        },
        {
          name: 'Class Loader Internals & Leaks',
          explanation: 'CLASS IDENTITY = (Fully Qualified Name, defining ClassLoader). The same .class loaded by two different loaders produces TWO distinct Class objects — incompatible with each other. This is why you can see "ClassCastException: foo.Bar cannot be cast to foo.Bar" — same name, different loaders. Senior pitfalls: TCCL (Thread Context ClassLoader) used by frameworks for service discovery; class unloading only when the entire loader becomes unreachable; ClassLoader leaks in app servers; Tomcat\'s broken-delegation hierarchy for webapp isolation; Spring Boot\'s LaunchedURLClassLoader.',
          codeExample: `// CLASS IDENTITY — same FQCN, different loaders → DIFFERENT classes
ClassLoader cl1 = new MyLoader();
ClassLoader cl2 = new MyLoader();

Class<?> a = cl1.loadClass("com.example.Foo");
Class<?> b = cl2.loadClass("com.example.Foo");

a.equals(b);                  // false — different Class objects
a.getName().equals(b.getName());  // true — same FQCN

// "A is not A" ClassCastException
Object obj = a.getDeclaredConstructor().newInstance();
Foo foo = (Foo) obj;          // ⚠️ ClassCastException if Foo loaded by cl2!
                               // Even though obj.getClass().getName() == "com.example.Foo"

// PARENT DELEGATION (default) — child asks parent first
public Class<?> loadClass(String name) {
    Class<?> c = findLoadedClass(name);   // 1. already loaded?
    if (c == null) {
        try {
            c = parent.loadClass(name);    // 2. delegate to parent
        } catch (ClassNotFoundException e) {
            c = findClass(name);            // 3. find ourselves
        }
    }
    return c;
}

// BREAKING DELEGATION — Tomcat / OSGi / Spring Boot LaunchedURLClassLoader
// Webapp loader looks LOCAL FIRST, falls back to parent
// Why? So webapps can ship their own jars without conflict with server libs

// Tomcat hierarchy
//   Bootstrap
//     System (Tomcat startup classes)
//       Common (catalina.jar etc.)
//         WebappClassLoader (per-webapp; LOCAL FIRST)
// Each war has its own loader → undeploy = drop the loader → classes unload

// THREAD CONTEXT CLASSLOADER (TCCL)
// Frameworks (JDBC, JNDI, ServiceLoader, JAXP) use TCCL to discover services
// because their classes (loaded by parent) need to load YOUR classes
Thread.currentThread().setContextClassLoader(myLoader);
try {
    ServiceLoader<Driver> drivers = ServiceLoader.load(Driver.class);
    // Looks at TCCL, not the loader of ServiceLoader itself
} finally {
    Thread.currentThread().setContextClassLoader(original);   // CRITICAL — restore!
}

// CLASSLOADER LEAKS (deadly in app servers)
// A single static reference from a parent loader's class
// to ANYTHING in the webapp loader prevents the webapp loader from being GC'd.
// Result: each redeploy adds a permanent ~100 MB to memory until OOM.

// Common offenders
// 1. ThreadLocal not removed:
//    threadPool runs your code → ThreadLocal stores your-loader-class instance
//    → thread persists in pool → ThreadLocal pins entire webapp loader
//
// 2. JDBC drivers registered via DriverManager.registerDriver() not deregistered
// 3. Custom log4j appenders, JMX beans, shutdown hooks
// 4. Thread.currentThread().setContextClassLoader(...) without restoring
// 5. Caches in libraries that key on Class objects (Reflection caches)

// FIX checklist (for webapp ServletContextListener.contextDestroyed)
// - ThreadLocal.remove() in every thread that touched the context
// - DriverManager.deregisterDriver() for each registered driver
// - Cancel timers, shutdown executors, unregister MBeans
// - Restore TCCL to original before returning to container threads

// CLASS UNLOADING
// A Class can only be GC'd when its ClassLoader is unreachable AND
// no instances of any class loaded by it remain.
// Triggered automatically; observable via -verbose:class or -Xlog:class+unload

// Java 9+ Module Layers
// ModuleLayer can have its own loaders; multiple versions of same module
// in different layers don't conflict. Foundation for jlink and Loom.`
        }
      ]
    },
    {
      id: 'must-know-examples',
      name: 'Coding Must-Know Examples',
      icon: '💡',
      color: '#0ea5e9',
      description: 'Canonical implementations every Java developer should be able to write from scratch — starting with deep vs shallow object cloning.',
      details: [
        {
          name: 'Cloning — Shallow Copy (default clone)',
          explanation: 'A shallow copy duplicates the top-level object but shares references to nested objects. Object.clone() is shallow by default — primitive and immutable (String) fields are effectively independent, but any mutable reference field is SHARED with the original. Mutating the nested object through one reference is visible through the other.',
          codeExample: `public class Employee implements Cloneable {
    String name;
    int id;
    Address address;   // mutable nested object

    public Employee(String name, int id, Address address) {
        this.name = name;
        this.id = id;
        this.address = address;
    }

    @Override
    public Employee clone() throws CloneNotSupportedException {
        return (Employee) super.clone();   // SHALLOW: address reference is shared
    }
}

class Address {
    String line1;
    String line2;
    Address(String line1, String line2) { this.line1 = line1; this.line2 = line2; }
}

// --- Demo: the shared reference bites you ---
Employee e1 = new Employee("Mohit", 1, new Address("123", "123"));
Employee e2 = e1.clone();

e2.address.line1 = "234";              // mutate through the copy...

System.out.println(e1.address.line1); // prints "234"  ⚠️ original changed too!
System.out.println(e2.address.line1); // prints "234"
// Both Employees point at the SAME Address object.`
        },
        {
          name: 'Cloning — Deep Copy (recursive clone)',
          explanation: 'A deep copy recursively clones nested mutable objects so the copy is fully independent. Override clone() to clone each mutable field after calling super.clone(). Immutable fields (String, primitives) need no special handling. The nested type must also support cloning.',
          codeExample: `public class Employee implements Cloneable {
    String name;
    int id;
    Address address;

    public Employee(String name, int id, Address address) {
        this.name = name;
        this.id = id;
        this.address = address;
    }

    public void setAddress(String line1, String line2) {
        this.address = new Address(line1, line2);
    }

    @Override
    public Employee clone() throws CloneNotSupportedException {
        Employee e2 = (Employee) super.clone();   // shallow copy of fields
        e2.address = address.clone();             // deep copy the mutable field
        return e2;
    }
}

public class Address implements Cloneable {
    String line1;
    String line2;

    public Address(String line1, String line2) {
        this.line1 = line1;
        this.line2 = line2;
    }

    @Override
    public Address clone() throws CloneNotSupportedException {
        return (Address) super.clone();   // String fields are immutable, shallow is fine
    }
}

// --- Demo: copy is independent ---
Employee e1 = new Employee("Mohit", 1, new Address("123", "123"));
Employee e2 = e1.clone();
e2.setAddress("234", "234");

System.out.println(e1.address.line1); // prints "123" — deep copy worked
System.out.println(e2.address.line1); // prints "234"`
        },
        {
          name: 'Cloning — Copy Constructor (preferred over clone)',
          explanation: 'Joshua Bloch (Effective Java) recommends avoiding Cloneable entirely — it is a fragile, error-prone marker interface. A copy constructor (or static factory) is clearer, needs no checked exception, works with final fields, and makes deep vs shallow explicit by how you copy each field.',
          codeExample: `public class Employee {
    private final String name;
    private final int id;
    private Address address;

    public Employee(String name, int id, Address address) {
        this.name = name;
        this.id = id;
        this.address = address;
    }

    // Copy constructor — deep copies the mutable Address
    public Employee(Employee other) {
        this.name = other.name;
        this.id = other.id;
        this.address = new Address(other.address);   // explicit deep copy
    }
}

class Address {
    String line1, line2;
    Address(String line1, String line2) { this.line1 = line1; this.line2 = line2; }
    // copy constructor
    Address(Address other) { this.line1 = other.line1; this.line2 = other.line2; }
}

Employee e1 = new Employee("Mohit", 1, new Address("123", "123"));
Employee e2 = new Employee(e1);   // independent deep copy, no clone()/CloneNotSupportedException`
        },
        {
          name: 'Concurrency — Producer-Consumer (BlockingQueue)',
          explanation: 'The classic concurrency pattern: producers add work to a shared queue, consumers remove it, and the queue decouples their speeds. A bounded BlockingQueue handles all synchronization — put() blocks when the queue is full and take() blocks when it is empty, so you never busy-wait or manage wait()/notify() by hand. Always restore the interrupt flag (Thread.currentThread().interrupt()) when catching InterruptedException.',
          codeExample: `import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

public class ProducerConsumer {

    static class Producer implements Runnable {
        private final BlockingQueue<Integer> queue;

        Producer(BlockingQueue<Integer> queue) {
            this.queue = queue;
        }

        @Override
        public void run() {
            try {
                for (int i = 0; i < 10; i++) {
                    queue.put(i);                    // blocks if full
                    System.out.println("Produced: " + i);
                    Thread.sleep(1000);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }

    static class Consumer implements Runnable {
        private final BlockingQueue<Integer> queue;

        Consumer(BlockingQueue<Integer> queue) {
            this.queue = queue;
        }

        @Override
        public void run() {
            try {
                while (true) {
                    Integer item = queue.take();     // blocks if empty
                    System.out.println("Consumed: " + item);
                    Thread.sleep(1500);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }

    public static void main(String[] args) {
        BlockingQueue<Integer> queue = new LinkedBlockingQueue<>(5); // bounded
        new Thread(new Producer(queue), "producer").start();
        new Thread(new Consumer(queue), "consumer").start();
    }
}`
        },
        {
          name: 'I/O — Serialization & Deserialization',
          explanation: 'Serialization converts an object graph into a byte stream (for storage or network transfer); deserialization reconstructs it. Implement java.io.Serializable, declare a serialVersionUID to control version compatibility, and mark fields you do NOT want persisted as transient (e.g. secrets, derived/cached values). Deserialization bypasses constructors — the JVM allocates the object and restores fields directly — so validate sensitive invariants in readObject if needed.',
          codeExample: `import java.io.*;

public class User implements Serializable {
    private static final long serialVersionUID = 1L;  // version control

    private String name;
    private int age;
    private transient String password;   // NOT serialized (skipped)

    public User(String name, int age, String password) {
        this.name = name;
        this.age = age;
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{name=" + name + ", age=" + age + ", password=" + password + "}";
    }

    // Serialize an object to a file
    public static void serialize(User user, String path) throws IOException {
        try (ObjectOutputStream out =
                 new ObjectOutputStream(new FileOutputStream(path))) {
            out.writeObject(user);
        }
    }

    // Deserialize an object from a file
    public static User deserialize(String path)
            throws IOException, ClassNotFoundException {
        try (ObjectInputStream in =
                 new ObjectInputStream(new FileInputStream(path))) {
            return (User) in.readObject();
        }
    }

    public static void main(String[] args) throws Exception {
        User u1 = new User("Mohit", 30, "secret123");
        serialize(u1, "user.ser");

        User u2 = deserialize("user.ser");
        System.out.println(u2);   // password is null — transient field not restored
    }
}`
        },
        {
          name: 'Singleton — Eager & Static Holder',
          explanation: 'A Singleton guarantees exactly one instance of a class and a global access point to it. The simplest correct forms are eager initialization (instance created at class load) and the Bill Pugh static holder (lazy + thread-safe via class-loading guarantees, no synchronization cost). Use eager when the instance is cheap and always needed; use the holder idiom when you want lazy creation without locking overhead.',
          codeExample: `// 1. Eager initialization — instance built at class load, inherently thread-safe
public class EagerSingleton {
    private static final EagerSingleton INSTANCE = new EagerSingleton();

    private EagerSingleton() { }                  // private — no external new

    public static EagerSingleton getInstance() {
        return INSTANCE;
    }
}

// 2. Bill Pugh static holder — lazy AND thread-safe with no synchronization.
//    The holder class loads only on first getInstance() call.
public class HolderSingleton {
    private HolderSingleton() { }

    private static class Holder {
        private static final HolderSingleton INSTANCE = new HolderSingleton();
    }

    public static HolderSingleton getInstance() {
        return Holder.INSTANCE;
    }
}`
        },
        {
          name: 'Singleton — Double-Checked Locking',
          explanation: 'Lazy singleton that is thread-safe but only pays the synchronization cost on the first call. The volatile keyword is REQUIRED: without it, the partially-constructed object could be visible to another thread due to instruction reordering (the reference is assigned before the constructor finishes). The two null checks avoid locking once the instance exists.',
          codeExample: `public class Singleton {
    // volatile prevents reordering / publishing a half-built object
    private static volatile Singleton instance;

    private Singleton() { }

    public static Singleton getInstance() {
        if (instance == null) {                 // 1st check — no lock (fast path)
            synchronized (Singleton.class) {
                if (instance == null) {         // 2nd check — inside lock
                    instance = new Singleton(); // safe publication via volatile
                }
            }
        }
        return instance;
    }
}

// Why the second check? Two threads can both pass the first null check and
// queue on the lock. Without the inner check, the second thread would create
// a second instance after the first already did.`
        }
      ]
    }
  ]

  const filteredItems = activeCategory === 'all'
    ? javaItems
    : javaItems.filter(item => tabCategories[activeCategory].ids.includes(item.id))

  // Keyboard navigation for main topic grid
  const { focusedIndex: focusedTopicIndex, itemRefs: topicRefs } = useKeyboardNavigation({
    items: filteredItems,
    onSelect: (topic) => {
      if (topic.isQuickRef) {
        // Find the matching concept and open modal
        const conceptIndex = concepts.findIndex(c => c.id === topic.id.replace('-overview', ''))
        if (conceptIndex !== -1) {
          setSelectedConceptIndex(conceptIndex)
          setSelectedDetailIndex(0)
        }
      } else {
        // Navigate to dedicated page
        onSelectItem(topic.id)
      }
    },
    onBack,
    enabled: selectedConceptIndex === null,
    gridColumns: 3,
    loop: true
  })

  // Modal keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedConceptIndex === null) return

      const concept = concepts[selectedConceptIndex]
      if (e.key === 'Escape') {
        setSelectedConceptIndex(null)
        setSelectedDetailIndex(0)
      } else if (e.key === 'ArrowRight') {
        setSelectedDetailIndex(prev =>
          prev < concept.details.length - 1 ? prev + 1 : 0
        )
      } else if (e.key === 'ArrowLeft') {
        setSelectedDetailIndex(prev =>
          prev > 0 ? prev - 1 : concept.details.length - 1
        )
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, concepts])

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark
        ? 'linear-gradient(135deg, #0f172a 0%, #1e1a0f 50%, #0f172a 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #fef3c7 50%, #f8fafc 100%)',
      padding: '1.5rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: colors.textPrimary
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <Breadcrumb
          breadcrumbStack={[
            { name: 'Java', icon: '☕' }
          ]}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={JAVA_COLORS}
        />

        {/* Description */}
        <p style={{
          fontSize: '1.2rem',
          color: isDark ? '#d1d5db' : '#4b5563',
          textAlign: 'center',
          marginBottom: '2rem',
          lineHeight: '1.8'
        }}>
          Master Java from OOP fundamentals to modern features like virtual threads and pattern matching.
        </p>

        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          borderBottom: '2px solid #374151',
          overflowX: 'auto'
        }}>
          {Object.entries(tabCategories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              style={{
                padding: '1rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: activeCategory === key ? '#f59e0b' : 'transparent',
                color: activeCategory === key ? 'white' : '#9ca3af',
                border: 'none',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== key) {
                  e.target.style.backgroundColor = '#374151'
                  e.target.style.color = '#d1d5db'
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== key) {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = '#9ca3af'
                }
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Topic Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem'
        }}>
          {filteredItems.map((topic, index) => (
            <button
              key={topic.id}
              ref={(el) => topicRefs.current[index] = el}
              tabIndex={focusedTopicIndex === index ? 0 : -1}
              role="link"
              aria-label={`${topic.name}. ${topic.description}`}
              onClick={() => {
                if (topic.isQuickRef) {
                  const conceptIndex = concepts.findIndex(c => c.id === topic.id.replace('-overview', ''))
                  if (conceptIndex !== -1) {
                    setSelectedConceptIndex(conceptIndex)
                    setSelectedDetailIndex(0)
                  }
                } else {
                  onSelectItem(topic.id)
                }
              }}
              style={{
                background: isDark
                  ? 'linear-gradient(145deg, #1e293b, #0f172a)'
                  : 'linear-gradient(145deg, #ffffff, #f9fafb)',
                border: `2px solid ${focusedTopicIndex === index ? topic.color : topic.color + '40'}`,
                borderRadius: '12px',
                padding: '1.25rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.3s ease',
                position: 'relative',
                transform: focusedTopicIndex === index ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: focusedTopicIndex === index ? `0 12px 24px -8px ${topic.color}30` : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = `0 12px 24px -8px ${topic.color}30`
                e.currentTarget.style.borderColor = topic.color
              }}
              onMouseLeave={(e) => {
                if (focusedTopicIndex !== index) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = `${topic.color}40`
                }
              }}
            >
              {topic.isQuickRef && (
                <div style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  background: 'rgba(59, 130, 246, 0.2)',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                  borderRadius: '4px',
                  padding: '0.15rem 0.4rem',
                  fontSize: '0.65rem',
                  color: '#60a5fa',
                  fontWeight: '600'
                }}>
                  QUICK REF
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.75rem' }}>{topic.icon}</span>
                <h3 style={{
                  color: topic.color,
                  fontSize: '1rem',
                  fontWeight: '600',
                  margin: 0
                }}>
                  {topic.name}
                </h3>
              </div>
              <p style={{
                color: isDark ? '#9ca3af' : '#6b7280',
                fontSize: '0.875rem',
                lineHeight: '1.4',
                margin: 0
              }}>
                {topic.description}
              </p>
            </button>
          ))}
        </div>

        {/* Hidden concept cards - kept for modal functionality */}
        <div style={{ display: 'none' }}>
          {concepts.map((concept, index) => (
            <button
              key={concept.id}
              onClick={() => {
                setSelectedConceptIndex(index)
                setSelectedDetailIndex(0)
              }}
              style={{
                background: 'linear-gradient(145deg, #1e293b, #0f172a)',
                border: `2px solid ${concept.color}40`,
                borderRadius: '16px',
                padding: '1.5rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 20px 40px -12px ${concept.color}30`
                e.currentTarget.style.borderColor = concept.color
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = `${concept.color}40`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2.5rem' }}>{concept.icon}</span>
                <div>
                  <h3 style={{ color: isDark ? '#f1f5f9' : '#1f2937', fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>
                    {concept.name}
                  </h3>
                  <span style={{ color: isDark ? '#64748b' : '#6b7280', fontSize: '0.85rem' }}>
                    {concept.details.length} topics
                  </span>
                </div>
              </div>
              <p style={{ color: isDark ? '#94a3b8' : '#4b5563', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                {concept.description}
              </p>
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                color: concept.color,
                fontSize: '0.85rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                Explore <span>→</span>
              </div>
            </button>
          ))}
        </div>

      {/* Collapsible Sidebar for quick concept navigation */}
      <CollapsibleSidebar
        items={concepts}
        selectedIndex={selectedConceptIndex ?? -1}
        onSelect={(index) => {
          setSelectedConceptIndex(index)
          setSelectedDetailIndex(0)
        }}
        title="Concepts"
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.icon}
        primaryColor={JAVA_COLORS.primary}
      />


        {/* Modal */}
        {selectedConcept && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '2rem'
            }}
            onClick={() => {
              setSelectedConceptIndex(null)
              setSelectedDetailIndex(0)
            }}
          >
            <div
              style={{
                background: isDark
                  ? 'linear-gradient(145deg, #1e293b, #0f172a)'
                  : 'linear-gradient(145deg, #ffffff, #f9fafb)',
                borderRadius: '20px',
                width: '100%',
                maxWidth: '1600px',
                maxHeight: '95vh',
                overflow: 'auto',
                border: `2px solid ${selectedConcept.color}`,
                boxShadow: `0 25px 50px -12px ${selectedConcept.color}40`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Breadcrumb */}
              <div style={{ padding: '1rem 1.5rem 0' }}>
                <Breadcrumb
                  breadcrumbStack={[
                    { name: 'Java', icon: '☕' },
                    { name: selectedConcept.name, icon: selectedConcept.icon }
                  ]}
                  onBreadcrumbClick={(index) => {
                    if (index === 0) {
                      setSelectedConceptIndex(null)
                      setSelectedDetailIndex(0)
                    }
                  }}
                  onMainMenu={breadcrumb?.onMainMenu || onBack}
                  colors={JAVA_COLORS}
                />
              </div>

              {/* Modal Header with Navigation */}
              <div style={{
                padding: '1.5rem',
                borderBottom: isDark ? '1px solid #334155' : '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                background: isDark
                  ? 'linear-gradient(145deg, #1e293b, #0f172a)'
                  : 'linear-gradient(145deg, #ffffff, #f9fafb)',
                zIndex: 10
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '2rem' }}>{selectedConcept.icon}</span>
                  <h2 style={{ color: isDark ? '#f1f5f9' : '#1f2937', fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
                    {selectedConcept.name}
                  </h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <button
                    onClick={() => {
                      if (selectedConceptIndex > 0) {
                        setSelectedConceptIndex(selectedConceptIndex - 1)
                        setSelectedDetailIndex(0)
                      }
                    }}
                    disabled={selectedConceptIndex === 0}
                    style={{
                      padding: '0.4rem 0.75rem',
                      background: isDark ? 'rgba(100, 116, 139, 0.2)' : 'rgba(100, 116, 139, 0.1)',
                      border: isDark ? '1px solid rgba(100, 116, 139, 0.3)' : '1px solid rgba(100, 116, 139, 0.2)',
                      borderRadius: '0.375rem',
                      color: selectedConceptIndex === 0 ? (isDark ? '#475569' : '#9ca3af') : (isDark ? '#94a3b8' : '#4b5563'),
                      cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer',
                      fontSize: '0.8rem'
                    }}
                  >←</button>
                  <span style={{ color: isDark ? '#64748b' : '#6b7280', fontSize: '0.75rem', padding: '0 0.5rem' }}>
                    {selectedConceptIndex + 1}/{concepts.length}
                  </span>
                  <button
                    onClick={() => {
                      if (selectedConceptIndex < concepts.length - 1) {
                        setSelectedConceptIndex(selectedConceptIndex + 1)
                        setSelectedDetailIndex(0)
                      }
                    }}
                    disabled={selectedConceptIndex === concepts.length - 1}
                    style={{
                      padding: '0.4rem 0.75rem',
                      background: isDark ? 'rgba(100, 116, 139, 0.2)' : 'rgba(100, 116, 139, 0.1)',
                      border: isDark ? '1px solid rgba(100, 116, 139, 0.3)' : '1px solid rgba(100, 116, 139, 0.2)',
                      borderRadius: '0.375rem',
                      color: selectedConceptIndex === concepts.length - 1 ? (isDark ? '#475569' : '#9ca3af') : (isDark ? '#94a3b8' : '#4b5563'),
                      cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer',
                      fontSize: '0.8rem'
                    }}
                  >→</button>
                  <button
                    onClick={() => {
                      setSelectedConceptIndex(null)
                      setSelectedDetailIndex(0)
                    }}
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

              {/* Diagram */}
              {selectedConcept.diagram && (
                <div style={{ padding: '1rem 1.5rem', borderBottom: isDark ? '1px solid #334155' : '1px solid #e5e7eb' }}>
                  <selectedConcept.diagram />
                </div>
              )}

              {/* Detail Tabs */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '1rem 1.5rem',
                borderBottom: isDark ? '1px solid #334155' : '1px solid #e5e7eb',
                overflowX: 'auto'
              }}>
                {selectedConcept.details.map((detail, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDetailIndex(idx)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: selectedDetailIndex === idx ? selectedConcept.color : (isDark ? '#334155' : '#e5e7eb'),
                      color: selectedDetailIndex === idx ? 'white' : (isDark ? '#94a3b8' : '#4b5563'),
                      cursor: 'pointer',
                      fontWeight: '500',
                      fontSize: '0.9rem',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s'
                    }}
                  >
                    {detail.name}
                  </button>
                ))}
              </div>

              {/* Detail Content */}
              <div style={{ padding: '1.5rem' }}>
                {(() => {
                  const detail = selectedConcept.details[selectedDetailIndex]
                  const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]

                  return (
                    <div>
                      <h3 style={{ color: isDark ? '#f1f5f9' : '#1f2937', fontSize: '1.25rem', marginBottom: '1rem' }}>
                        {detail.name}
                      </h3>
                      <p style={{
                        color: isDark ? '#e2e8f0' : '#374151',
                        lineHeight: '1.8',
                        marginBottom: '1.5rem',
                        background: colorScheme.bg,
                        border: `1px solid ${colorScheme.border}`,
                        borderRadius: '8px',
                        padding: '1rem'
                      }}>
                        {detail.explanation}
                      </p>
                      {detail.codeExample && (
                        <SyntaxHighlighter
                          language="java"
                          style={vscDarkPlus}
                          customStyle={{
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            margin: 0
                          }}
                        >
                          {detail.codeExample}
                        </SyntaxHighlighter>
                      )}
                    </div>
                  )
                })()}
              </div>

              {/* Navigation hint */}
              <div style={{
                padding: '1rem 1.5rem',
                borderTop: isDark ? '1px solid #334155' : '1px solid #e5e7eb',
                textAlign: 'center',
                color: isDark ? '#64748b' : '#6b7280',
                fontSize: '0.85rem'
              }}>
                Use ← → arrow keys to switch tabs • Press Escape to close
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Java

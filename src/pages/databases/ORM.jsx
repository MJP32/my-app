import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import useVoiceConceptNavigation from '../../hooks/useVoiceConceptNavigation'

const DATABASE_COLORS = {
  primary: '#60a5fa',
  primaryHover: '#93c5fd',
  bg: 'rgba(59, 130, 246, 0.1)',
  border: 'rgba(59, 130, 246, 0.3)',
  arrow: '#3b82f6',
  hoverBg: 'rgba(59, 130, 246, 0.2)',
  topicBg: 'rgba(59, 130, 246, 0.2)'
}

// Background colors for subtopic descriptions
const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// Hibernate Framework Diagram
const HibernateDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Hibernate Architecture</text>
    <rect x="50" y="45" width="120" height="50" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="110" y="75" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Java Objects</text>
    <rect x="200" y="45" width="140" height="90" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="270" y="65" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Session</text>
    <text x="270" y="85" textAnchor="middle" fill="#c4b5fd" fontSize="8">1st Level Cache</text>
    <text x="270" y="100" textAnchor="middle" fill="#c4b5fd" fontSize="7">Dirty checking</text>
    <text x="270" y="115" textAnchor="middle" fill="#c4b5fd" fontSize="7">Entity lifecycle</text>
    <rect x="370" y="45" width="140" height="90" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="440" y="65" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">SessionFactory</text>
    <text x="440" y="85" textAnchor="middle" fill="#86efac" fontSize="8">2nd Level Cache</text>
    <text x="440" y="100" textAnchor="middle" fill="#86efac" fontSize="7">Connection pool</text>
    <text x="440" y="115" textAnchor="middle" fill="#86efac" fontSize="7">Thread-safe</text>
    <rect x="540" y="45" width="120" height="50" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="600" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Database</text>
    <line x1="170" y1="70" x2="195" y2="70" stroke="#4ade80" strokeWidth="2"/>
    <line x1="340" y1="90" x2="365" y2="90" stroke="#4ade80" strokeWidth="2"/>
    <line x1="510" y1="70" x2="535" y2="70" stroke="#4ade80" strokeWidth="2"/>
    <rect x="150" y="145" width="400" height="25" rx="4" fill="rgba(236, 72, 153, 0.15)" stroke="#ec4899" strokeWidth="1"/>
    <text x="350" y="162" textAnchor="middle" fill="#f472b6" fontSize="9">HQL • Criteria API • Named Queries • Native SQL</text>
    <text x="350" y="178" textAnchor="middle" fill="#64748b" fontSize="9">Transparent persistence • Automatic SQL generation</text>
  </svg>
)

// JPA Diagram
const JPADiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">JPA (Java Persistence API)</text>
    <rect x="50" y="50" width="600" height="30" rx="4" fill="rgba(234, 88, 12, 0.3)" stroke="#ea580c" strokeWidth="2"/>
    <text x="350" y="70" textAnchor="middle" fill="#fb923c" fontSize="10" fontWeight="bold">JPA Specification (jakarta.persistence)</text>
    <rect x="80" y="95" width="150" height="45" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="155" y="118" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Hibernate</text>
    <text x="155" y="132" textAnchor="middle" fill="#c4b5fd" fontSize="7">Most popular</text>
    <rect x="260" y="95" width="150" height="45" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="335" y="118" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">EclipseLink</text>
    <text x="335" y="132" textAnchor="middle" fill="#86efac" fontSize="7">Reference impl</text>
    <rect x="440" y="95" width="150" height="45" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="515" y="118" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">OpenJPA</text>
    <text x="515" y="132" textAnchor="middle" fill="#93c5fd" fontSize="7">Apache</text>
    <line x1="155" y1="80" x2="155" y2="90" stroke="#64748b" strokeWidth="1" strokeDasharray="3"/>
    <line x1="335" y1="80" x2="335" y2="90" stroke="#64748b" strokeWidth="1" strokeDasharray="3"/>
    <line x1="515" y1="80" x2="515" y2="90" stroke="#64748b" strokeWidth="1" strokeDasharray="3"/>
    <text x="350" y="155" textAnchor="middle" fill="#64748b" fontSize="9">Vendor-neutral • @Entity • EntityManager • JPQL</text>
  </svg>
)

// Entity Mapping Diagram
const EntityMappingDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Entity Mapping</text>
    <rect x="50" y="45" width="200" height="100" rx="6" fill="rgba(220, 38, 38, 0.2)" stroke="#dc2626" strokeWidth="2"/>
    <text x="150" y="65" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">@Entity User</text>
    <text x="70" y="85" fill="#fca5a5" fontSize="8">@Id Long id</text>
    <text x="70" y="100" fill="#fca5a5" fontSize="8">@Column String name</text>
    <text x="70" y="115" fill="#fca5a5" fontSize="8">@OneToMany orders</text>
    <text x="70" y="130" fill="#fca5a5" fontSize="8">@Embedded address</text>
    <text x="290" y="95" fill="#4ade80" fontSize="20">→</text>
    <rect x="350" y="45" width="200" height="100" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="450" y="65" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">users TABLE</text>
    <text x="370" y="85" fill="#93c5fd" fontSize="8">id BIGINT PK</text>
    <text x="370" y="100" fill="#93c5fd" fontSize="8">name VARCHAR</text>
    <text x="370" y="115" fill="#93c5fd" fontSize="8">address_city VARCHAR</text>
    <text x="370" y="130" fill="#93c5fd" fontSize="8">address_zip VARCHAR</text>
    <rect x="580" y="65" width="90" height="60" rx="4" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="625" y="85" textAnchor="middle" fill="#a78bfa" fontSize="8" fontWeight="bold">orders</text>
    <text x="625" y="100" textAnchor="middle" fill="#c4b5fd" fontSize="7">user_id FK</text>
    <text x="625" y="115" textAnchor="middle" fill="#c4b5fd" fontSize="7">total</text>
    <line x1="550" y1="95" x2="575" y2="95" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3"/>
    <text x="350" y="165" textAnchor="middle" fill="#64748b" fontSize="9">Annotations define mapping • Classes → Tables • Fields → Columns</text>
  </svg>
)

// Query Optimization Diagram
const QueryOptimizationDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">ORM Query Optimization</text>
    <rect x="50" y="50" width="140" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="120" y="75" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Fetch Strategy</text>
    <text x="120" y="93" textAnchor="middle" fill="#c4b5fd" fontSize="7">JOIN FETCH</text>
    <text x="120" y="107" textAnchor="middle" fill="#c4b5fd" fontSize="7">Entity Graphs</text>
    <rect x="210" y="50" width="140" height="70" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="280" y="75" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Projections</text>
    <text x="280" y="93" textAnchor="middle" fill="#86efac" fontSize="7">Select needed cols</text>
    <text x="280" y="107" textAnchor="middle" fill="#86efac" fontSize="7">DTOs</text>
    <rect x="370" y="50" width="140" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="440" y="75" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Batch Fetch</text>
    <text x="440" y="93" textAnchor="middle" fill="#fcd34d" fontSize="7">@BatchSize</text>
    <text x="440" y="107" textAnchor="middle" fill="#fcd34d" fontSize="7">IN clause</text>
    <rect x="530" y="50" width="140" height="70" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="600" y="75" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Pagination</text>
    <text x="600" y="93" textAnchor="middle" fill="#fca5a5" fontSize="7">setMaxResults</text>
    <text x="600" y="107" textAnchor="middle" fill="#fca5a5" fontSize="7">Stream API</text>
    <text x="350" y="145" textAnchor="middle" fill="#64748b" fontSize="9">Avoid N+1 • Use indexes • Profile queries • Minimize data transfer</text>
  </svg>
)

// Caching Strategies Diagram
const CachingStrategiesDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">ORM Caching Layers</text>
    <rect x="50" y="50" width="180" height="70" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="140" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">L1 Cache</text>
    <text x="140" y="95" textAnchor="middle" fill="#86efac" fontSize="8">Session scope</text>
    <text x="140" y="110" textAnchor="middle" fill="#86efac" fontSize="7">Automatic • Mandatory</text>
    <rect x="260" y="50" width="180" height="70" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="350" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">L2 Cache</text>
    <text x="350" y="95" textAnchor="middle" fill="#93c5fd" fontSize="8">SessionFactory scope</text>
    <text x="350" y="110" textAnchor="middle" fill="#93c5fd" fontSize="7">EhCache • Hazelcast</text>
    <rect x="470" y="50" width="180" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="560" y="75" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Query Cache</text>
    <text x="560" y="95" textAnchor="middle" fill="#c4b5fd" fontSize="8">Result sets</text>
    <text x="560" y="110" textAnchor="middle" fill="#c4b5fd" fontSize="7">By query + params</text>
    <line x1="230" y1="85" x2="255" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <line x1="440" y1="85" x2="465" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <rect x="150" y="135" width="400" height="30" rx="4" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="350" y="155" textAnchor="middle" fill="#fbbf24" fontSize="9">Eviction: TTL • LRU • Manual invalidation • Distributed sync</text>
    <text x="350" y="175" textAnchor="middle" fill="#64748b" fontSize="9">Dramatically reduces database load for read-heavy workloads</text>
  </svg>
)

// Transaction Management Diagram
const TransactionDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Transaction Management</text>
    <rect x="50" y="50" width="120" height="60" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="110" y="75" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">BEGIN</text>
    <text x="110" y="92" textAnchor="middle" fill="#93c5fd" fontSize="7">Start TX</text>
    <rect x="200" y="50" width="200" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="300" y="70" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Operations</text>
    <text x="300" y="88" textAnchor="middle" fill="#fcd34d" fontSize="7">persist • merge • remove</text>
    <text x="300" y="102" textAnchor="middle" fill="#fcd34d" fontSize="7">Dirty checking • Flush</text>
    <rect x="430" y="40" width="100" height="35" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="480" y="62" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">COMMIT</text>
    <rect x="430" y="85" width="100" height="35" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="480" y="107" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">ROLLBACK</text>
    <line x1="170" y1="80" x2="195" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <line x1="400" y1="70" x2="425" y2="57" stroke="#10b981" strokeWidth="2"/>
    <line x1="400" y1="90" x2="425" y2="103" stroke="#ef4444" strokeWidth="2"/>
    <rect x="560" y="50" width="100" height="60" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="610" y="70" textAnchor="middle" fill="#a78bfa" fontSize="8" fontWeight="bold">Locking</text>
    <text x="610" y="85" textAnchor="middle" fill="#c4b5fd" fontSize="7">Optimistic</text>
    <text x="610" y="100" textAnchor="middle" fill="#c4b5fd" fontSize="7">Pessimistic</text>
    <text x="350" y="135" textAnchor="middle" fill="#64748b" fontSize="9">ACID • @Transactional • Isolation levels • @Version for optimistic locks</text>
  </svg>
)

// Lazy/Eager Loading Diagram
const LazyEagerDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Lazy vs Eager Loading</text>
    <rect x="50" y="50" width="280" height="80" rx="6" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
    <text x="190" y="70" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">LAZY (Default for collections)</text>
    <text x="190" y="90" textAnchor="middle" fill="#f9a8d4" fontSize="8">Load on first access</text>
    <text x="190" y="105" textAnchor="middle" fill="#f9a8d4" fontSize="8">Proxy objects</text>
    <text x="190" y="120" textAnchor="middle" fill="#f9a8d4" fontSize="7">Risk: LazyInitializationException</text>
    <rect x="370" y="50" width="280" height="80" rx="6" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="510" y="70" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">EAGER (Default for @ManyToOne)</text>
    <text x="510" y="90" textAnchor="middle" fill="#86efac" fontSize="8">Load immediately</text>
    <text x="510" y="105" textAnchor="middle" fill="#86efac" fontSize="8">Single query or join</text>
    <text x="510" y="120" textAnchor="middle" fill="#86efac" fontSize="7">Risk: Loading too much data</text>
    <text x="350" y="150" textAnchor="middle" fill="#64748b" fontSize="9">Entity Graphs • JOIN FETCH • @BatchSize for middle-ground approach</text>
  </svg>
)

// N+1 Problem Diagram
const NPlusOneDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">N+1 Query Problem</text>
    <rect x="50" y="45" width="280" height="90" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="190" y="65" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Problem: N+1 Queries</text>
    <text x="70" y="85" fill="#fca5a5" fontSize="8">1: SELECT * FROM users</text>
    <text x="70" y="100" fill="#fca5a5" fontSize="8">N: SELECT * FROM orders WHERE user_id=?</text>
    <text x="70" y="115" fill="#fca5a5" fontSize="7">...</text>
    <text x="70" y="128" fill="#fca5a5" fontSize="7">Total: 1 + N queries!</text>
    <rect x="370" y="45" width="280" height="90" rx="6" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="510" y="65" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Solution: JOIN FETCH</text>
    <text x="390" y="85" fill="#86efac" fontSize="8">SELECT u FROM User u</text>
    <text x="390" y="100" fill="#86efac" fontSize="8">JOIN FETCH u.orders</text>
    <text x="390" y="120" fill="#86efac" fontSize="7">Single query loads everything!</text>
    <rect x="150" y="145" width="400" height="25" rx="4" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="350" y="162" textAnchor="middle" fill="#fbbf24" fontSize="9">Detection: Enable SQL logging • Solutions: JOIN FETCH • Entity Graphs • @BatchSize</text>
    <text x="350" y="178" textAnchor="middle" fill="#64748b" fontSize="9">Critical performance issue - always monitor query counts</text>
  </svg>
)

// Simple syntax highlighter for Java code
const SyntaxHighlighter = ({ code }) => {
  const highlightJava = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    highlighted = highlighted
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|super|this|null|default)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean|var)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ArrayList|Set|HashSet|Map|HashMap|Optional|Stream|Exception|Session|SessionFactory|Transaction|Query|Criteria|CriteriaBuilder|CriteriaQuery|Root|TypedQuery|Entity|Table|Column|Id|GeneratedValue|OneToMany|ManyToOne|ManyToMany|OneToOne|JoinColumn|JoinTable|Cascade|Fetch|Lazy|Eager|EntityManager|EntityManagerFactory|Persistence|EntityGraph|Subgraph|NamedEntityGraph|NamedAttributeNode|Embedded|Embeddable|Inheritance|DiscriminatorColumn|Version|Cacheable|Cache|BatchSize|Transactional|LockModeType|CacheStoreMode|CacheRetrieveMode|AttributeConverter|Converter|Override|Integer|Long|BigDecimal|LocalDate|Date|Temporal)\b/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')
      .replace(/\b(\d+\.?\d*[fLdD]?)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/\b([a-z_]\w*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')

    protectedContent.forEach(({ id, replacement }) => {
      highlighted = highlighted.replace(id, replacement)
    })

    return highlighted
  }

  return (
    <pre style={{
      margin: 0,
      fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
      fontSize: '0.85rem',
      lineHeight: '1.6',
      color: '#d4d4d4',
      whiteSpace: 'pre',
      overflowX: 'auto',
      textAlign: 'left',
      padding: 0
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightJava(code) }} />
    </pre>
  )
}

function ORM({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'hibernate',
      name: 'Hibernate Framework',
      icon: '🔄',
      color: '#f59e0b',
      description: 'Popular Java ORM framework providing transparent persistence with sophisticated caching, query APIs, and relationship management',
      diagram: HibernateDiagram,
      details: [
        {
          name: 'Object-Relational Mapping',
          explanation: 'Maps Java objects to database tables automatically. Classes become tables, fields become columns, instances become rows. Eliminates manual SQL writing for CRUD operations. Annotations or XML for mapping configuration. Natural object-oriented programming.',
          codeExample: `@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false)
    private String name;

    @Column(unique = true)
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    // Constructors, getters, setters
}`
        },
        {
          name: 'Session Management',
          explanation: 'Session represents conversation with database. First-level cache stores entities in session scope. Manages entity lifecycle states: transient, persistent, detached, removed. Automatic dirty checking and synchronization. Transaction boundaries.',
          codeExample: `// Open session and perform operations
try (Session session = sessionFactory.openSession()) {
    Transaction tx = session.beginTransaction();

    // Create
    Employee emp = new Employee("Alice", "alice@co.com");
    session.persist(emp);

    // Read
    Employee found = session.get(Employee.class, 1L);

    // Update - dirty checking auto-syncs
    found.setEmail("alice.new@co.com");

    // Delete
    session.remove(found);

    tx.commit();
} // session auto-closed`
        },
        {
          name: 'HQL & Criteria API',
          explanation: 'HQL (Hibernate Query Language) is object-oriented query language. Query entities instead of tables. Criteria API for programmatic type-safe queries. QueryDSL integration. Named queries for reusability. Compile-time safety.',
          codeExample: `// HQL - object-oriented queries
List<Employee> employees = session
    .createQuery("FROM Employee e WHERE e.department.name = :dept", Employee.class)
    .setParameter("dept", "Engineering")
    .getResultList();

// Criteria API - type-safe, programmatic
CriteriaBuilder cb = session.getCriteriaBuilder();
CriteriaQuery<Employee> cq = cb.createQuery(Employee.class);
Root<Employee> root = cq.from(Employee.class);
cq.select(root).where(
    cb.and(
        cb.equal(root.get("department").get("name"), "Engineering"),
        cb.greaterThan(root.get("salary"), 50000)
    )
);
List<Employee> results = session.createQuery(cq).getResultList();`
        },
        {
          name: 'Caching Layers',
          explanation: 'First-level cache (session scope), second-level cache (session factory scope), query cache. Integration with EhCache, Hazelcast, Infinispan. Dramatically reduces database hits. Configurable per entity. Cache strategies: read-only, read-write, nonstrict-read-write, transactional.',
          codeExample: `// First-level cache (automatic)
Employee e1 = session.get(Employee.class, 1L); // DB hit
Employee e2 = session.get(Employee.class, 1L); // Cache hit
System.out.println(e1 == e2); // true

// Second-level cache setup
@Entity
@Cacheable
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Product {
    @Id
    private Long id;
    private String name;
    private BigDecimal price;
}

// Query cache
List<Product> products = session
    .createQuery("FROM Product WHERE price < :max", Product.class)
    .setParameter("max", new BigDecimal("100"))
    .setCacheable(true)
    .getResultList();`
        },
        {
          name: 'Relationship Mapping',
          explanation: 'Support for @OneToOne, @OneToMany, @ManyToOne, @ManyToMany relationships. Bidirectional and unidirectional associations. Cascade operations. Orphan removal. Join tables and foreign keys managed automatically. Complex object graphs.',
          codeExample: `@Entity
public class Department {
    @Id @GeneratedValue
    private Long id;
    private String name;

    @OneToMany(mappedBy = "department",
               cascade = CascadeType.ALL,
               orphanRemoval = true)
    private List<Employee> employees = new ArrayList<>();

    public void addEmployee(Employee emp) {
        employees.add(emp);
        emp.setDepartment(this);
    }
}

@Entity
public class Employee {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;
}`
        },
        {
          name: 'Interceptors & Events',
          explanation: 'Lifecycle event listeners for entity state changes. Pre/post insert, update, delete, load callbacks. Custom interceptors for cross-cutting concerns. Audit logging, validation, security. Envers for entity versioning and auditing.',
          codeExample: `@Entity
@EntityListeners(AuditListener.class)
public class Order {
    @Id @GeneratedValue
    private Long id;
    private LocalDate createdAt;
    private LocalDate updatedAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDate.now();
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDate.now();
    }
}

// Separate listener class
public class AuditListener {
    @PostPersist
    public void afterInsert(Object entity) {
        System.out.println("Inserted: " + entity);
    }
}`
        }
      ]
    },
    {
      id: 'jpa',
      name: 'JPA (Java Persistence API)',
      icon: '☕',
      color: '#ea580c',
      description: 'Standard Java specification for ORM providing portable, vendor-neutral persistence layer with rich annotations and JPQL',
      diagram: JPADiagram,
      details: [
        {
          name: 'Standard Specification',
          explanation: 'Java EE/Jakarta EE standard for ORM. Provider-agnostic API. Implementations: Hibernate, EclipseLink, OpenJPA. Write once, switch providers easily. Industry standard annotations and patterns. Portable across application servers.',
          codeExample: `// persistence.xml - provider-neutral configuration
// <persistence-unit name="myApp">
//   <provider>org.hibernate.jpa.HibernatePersistenceProvider</provider>
// </persistence-unit>

// Create EntityManagerFactory (once at startup)
EntityManagerFactory emf = Persistence
    .createEntityManagerFactory("myApp");

// Create EntityManager (per request)
EntityManager em = emf.createEntityManager();

// Switch provider by changing persistence.xml
// No code changes needed - that's JPA's power`
        },
        {
          name: 'Entity Annotations',
          explanation: '@Entity, @Table, @Id, @GeneratedValue, @Column annotations define mapping. @Embedded for value objects. @Inheritance strategies. @Enumerated for enums. Rich annotation set for all mapping scenarios. Convention over configuration.',
          codeExample: `@Entity
@Table(name = "products", uniqueConstraints =
    @UniqueConstraint(columnNames = {"sku"}))
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Embedded
    private AuditInfo auditInfo;

    @Transient  // Not persisted
    private double discountedPrice;
}`
        },
        {
          name: 'EntityManager',
          explanation: 'Core interface for persistence operations. persist(), merge(), remove(), find() methods. Manages persistence context. Query creation. Transaction management. Similar to Hibernate Session but standardized.',
          codeExample: `EntityManager em = emf.createEntityManager();
EntityTransaction tx = em.getTransaction();
tx.begin();

// Create
Product product = new Product("Laptop", new BigDecimal("999.99"));
em.persist(product);

// Read
Product found = em.find(Product.class, 1L);

// Update - changes tracked automatically
found.setPrice(new BigDecimal("899.99"));

// Delete
em.remove(found);

// Detach and re-attach
em.detach(product);
Product managed = em.merge(product);

tx.commit();
em.close();`
        },
        {
          name: 'JPQL',
          explanation: 'Java Persistence Query Language - object-oriented SQL-like syntax. Query entities and their fields. Supports joins, subqueries, aggregations, projections. Named and native queries. Parameter binding. Pagination support.',
          codeExample: `// Basic JPQL query
TypedQuery<Product> query = em.createQuery(
    "SELECT p FROM Product p WHERE p.price > :minPrice " +
    "ORDER BY p.name", Product.class);
query.setParameter("minPrice", new BigDecimal("50"));
List<Product> products = query.getResultList();

// Aggregation
Long count = em.createQuery(
    "SELECT COUNT(p) FROM Product p WHERE p.category = :cat",
    Long.class)
    .setParameter("cat", Category.ELECTRONICS)
    .getSingleResult();

// Pagination
List<Product> page = em.createQuery(
    "SELECT p FROM Product p ORDER BY p.id", Product.class)
    .setFirstResult(20)   // offset
    .setMaxResults(10)    // limit
    .getResultList();`
        },
        {
          name: 'Transaction Management',
          explanation: 'Integration with JTA (Java Transaction API). Container-managed or application-managed transactions. @Transactional annotation (with Spring). ACID guarantees. Rollback on exceptions. Isolation levels.',
          codeExample: `// Spring declarative transactions
@Service
public class OrderService {

    @Transactional
    public Order createOrder(OrderRequest request) {
        Order order = new Order(request.getCustomerId());
        for (var item : request.getItems()) {
            Product p = em.find(Product.class, item.getProductId());
            order.addItem(p, item.getQuantity());
        }
        em.persist(order);
        return order;
    }

    @Transactional(readOnly = true)
    public List<Order> getOrders(Long customerId) {
        return em.createQuery(
            "FROM Order o WHERE o.customerId = :id", Order.class)
            .setParameter("id", customerId)
            .getResultList();
    }
}`
        },
        {
          name: 'Bean Validation',
          explanation: 'Integration with JSR 380 Bean Validation. @NotNull, @Size, @Min, @Max, @Pattern constraints. Automatic validation before persist/update. Custom validators. Consistent validation across layers. Fail-fast with meaningful errors.',
          codeExample: `@Entity
public class User {
    @Id @GeneratedValue
    private Long id;

    @NotNull
    @Size(min = 2, max = 50)
    private String name;

    @Email
    @Column(unique = true)
    private String email;

    @Min(18) @Max(150)
    private int age;

    @Pattern(regexp = "^\\\\+?[1-9]\\\\d{1,14}$")
    private String phone;

    @Past
    private LocalDate birthDate;
}

// Validation happens automatically on persist/update
// ConstraintViolationException thrown if invalid`
        }
      ]
    },
    {
      id: 'entity-mapping',
      name: 'Entity Mapping',
      icon: '🗺️',
      color: '#dc2626',
      description: 'Configuration of how Java entities map to database tables using annotations for fields, relationships, and strategies',
      diagram: EntityMappingDiagram,
      details: [
        {
          name: 'Table & Column Mapping',
          explanation: '@Table specifies database table name. @Column for column properties: name, length, nullable, unique. @Temporal for dates. @Lob for large objects. @Transient for non-persistent fields. Explicit control over schema mapping.',
          codeExample: `@Entity
@Table(name = "articles", schema = "blog")
public class Article {
    @Id @GeneratedValue
    private Long id;

    @Column(name = "title", length = 200, nullable = false)
    private String title;

    @Lob  // Maps to TEXT/CLOB
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private Date publishedAt;

    @Transient  // Not stored in DB
    private int wordCount;
}`
        },
        {
          name: 'Primary Keys',
          explanation: '@Id marks primary key. @GeneratedValue strategies: AUTO, IDENTITY, SEQUENCE, TABLE. @SequenceGenerator and @TableGenerator for custom generation. Composite keys with @EmbeddedId or @IdClass. Natural vs surrogate keys.',
          codeExample: `// Auto-increment
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

// Sequence (Oracle/PostgreSQL)
@Id
@GeneratedValue(strategy = GenerationType.SEQUENCE,
    generator = "order_seq")
@SequenceGenerator(name = "order_seq",
    sequenceName = "order_sequence", allocationSize = 50)
private Long id;

// Composite key with @EmbeddedId
@Embeddable
public class EnrollmentId {
    private Long studentId;
    private Long courseId;
}

@Entity
public class Enrollment {
    @EmbeddedId
    private EnrollmentId id;
    private LocalDate enrolledDate;
}`
        },
        {
          name: 'Embeddable Objects',
          explanation: '@Embeddable for value objects embedded in entities. Reusable components. @Embedded in entity class. No separate table. Useful for addresses, names, coordinates. Flattened into entity table.',
          codeExample: `@Embeddable
public class Address {
    private String street;
    private String city;
    private String state;
    private String zipCode;
}

@Entity
public class Customer {
    @Id @GeneratedValue
    private Long id;
    private String name;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "street",
            column = @Column(name = "home_street")),
        @AttributeOverride(name = "city",
            column = @Column(name = "home_city"))
    })
    private Address homeAddress;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "street",
            column = @Column(name = "work_street")),
        @AttributeOverride(name = "city",
            column = @Column(name = "work_city"))
    })
    private Address workAddress;
}`
        },
        {
          name: 'Inheritance Mapping',
          explanation: 'Three strategies: SINGLE_TABLE (default), TABLE_PER_CLASS, JOINED. @Inheritance annotation. @DiscriminatorColumn for single table. Trade-offs between normalization and performance. Polymorphic queries.',
          codeExample: `// SINGLE_TABLE - all subclasses in one table
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "payment_type")
public abstract class Payment {
    @Id @GeneratedValue
    private Long id;
    private BigDecimal amount;
}

@Entity
@DiscriminatorValue("CREDIT")
public class CreditCardPayment extends Payment {
    private String cardNumber;
    private String expiryDate;
}

@Entity
@DiscriminatorValue("BANK")
public class BankTransfer extends Payment {
    private String bankCode;
    private String accountNumber;
}`
        },
        {
          name: 'Collection Mapping',
          explanation: '@ElementCollection for collections of basic types or embeddables. @OneToMany/@ManyToMany for entity relationships. List, Set, Map support. @OrderBy, @OrderColumn for ordering. Lazy/eager fetch types.',
          codeExample: `@Entity
public class Employee {
    @Id @GeneratedValue
    private Long id;

    // Collection of basic types
    @ElementCollection
    @CollectionTable(name = "employee_skills",
        joinColumns = @JoinColumn(name = "employee_id"))
    @Column(name = "skill")
    private Set<String> skills = new HashSet<>();

    // Ordered entity collection
    @OneToMany(mappedBy = "employee")
    @OrderBy("startDate DESC")
    private List<Project> projects;

    // Map of embeddables
    @ElementCollection
    @MapKeyColumn(name = "phone_type")
    @Column(name = "phone_number")
    private Map<String, String> phones = new HashMap<>();
}`
        },
        {
          name: 'Converter & Enumerated',
          explanation: '@Converter for custom type conversions. Convert Java types to database columns. @Enumerated(STRING/ORDINAL) for enums. AttributeConverter interface. Centralized conversion logic. Type safety.',
          codeExample: `// Store enum as string
@Enumerated(EnumType.STRING)
private Status status; // "ACTIVE", "INACTIVE"

// Custom converter: JSON column
@Converter(autoApply = true)
public class JsonMapConverter
    implements AttributeConverter<Map<String, Object>, String> {

    @Override
    public String convertToDatabaseColumn(Map<String, Object> map) {
        return new ObjectMapper().writeValueAsString(map);
    }

    @Override
    public Map<String, Object> convertToEntityAttribute(String json) {
        return new ObjectMapper().readValue(json, Map.class);
    }
}

@Entity
public class Config {
    @Id private String key;
    @Convert(converter = JsonMapConverter.class)
    private Map<String, Object> properties;
}`
        }
      ]
    },
    {
      id: 'query-optimization',
      name: 'Query Optimization',
      icon: '⚡',
      color: '#8b5cf6',
      description: 'Techniques for optimizing ORM queries including fetch strategies, solving N+1 problems, and using projections',
      diagram: QueryOptimizationDiagram,
      details: [
        {
          name: 'Fetch Strategies',
          explanation: 'EAGER loads data immediately. LAZY loads on-demand. @Fetch(FetchMode.JOIN/SELECT/SUBSELECT) controls SQL generation. Entity graphs for dynamic fetch plans. Balance between data loading and performance. Avoid unnecessary queries.',
          codeExample: `// Lazy - loads orders only when accessed
@OneToMany(mappedBy = "customer", fetch = FetchType.LAZY)
private List<Order> orders;

// Eager - loads address with every customer query
@OneToOne(fetch = FetchType.EAGER)
private Address address;

// Subselect fetch mode - one extra query for all
@OneToMany(mappedBy = "customer")
@Fetch(FetchMode.SUBSELECT)
private List<Order> orders;
// Generates: SELECT * FROM orders
//   WHERE customer_id IN (SELECT id FROM customers WHERE ...)`
        },
        {
          name: 'N+1 Query Problem',
          explanation: 'One query loads entities, N queries load relationships. Use JOIN FETCH in JPQL. Batch fetching with @BatchSize. Entity graphs. Show SQL to detect. Major performance bottleneck if unaddressed. Monitor query counts.',
          codeExample: `// BAD: N+1 problem
List<Customer> customers = em.createQuery(
    "FROM Customer", Customer.class).getResultList();
// 1 query for customers
for (Customer c : customers) {
    c.getOrders().size(); // N queries!
}

// GOOD: JOIN FETCH - single query
List<Customer> customers = em.createQuery(
    "SELECT DISTINCT c FROM Customer c " +
    "JOIN FETCH c.orders", Customer.class)
    .getResultList();

// GOOD: @BatchSize - batched queries
@OneToMany(mappedBy = "customer")
@BatchSize(size = 25)
private List<Order> orders;
// Loads orders in batches of 25 customer IDs`
        },
        {
          name: 'Projections & DTOs',
          explanation: 'Select only needed columns with constructor expressions in JPQL. ResultTransformer for custom mappings. Blaze-Persistence for advanced projections. Spring Data Projections. Reduce data transfer and memory usage.',
          codeExample: `// DTO projection - only fetch needed columns
public record CustomerSummary(String name, Long orderCount) {}

List<CustomerSummary> summaries = em.createQuery(
    "SELECT new com.app.dto.CustomerSummary(" +
    "  c.name, COUNT(o)) " +
    "FROM Customer c LEFT JOIN c.orders o " +
    "GROUP BY c.name", CustomerSummary.class)
    .getResultList();

// Spring Data interface projection
public interface OrderView {
    String getCustomerName();
    BigDecimal getTotalAmount();
    LocalDate getOrderDate();
}

List<OrderView> views = orderRepository
    .findByStatus(Status.PENDING);`
        },
        {
          name: 'Query Hints',
          explanation: 'JPA query hints for optimization. Timeout hints. Cache retrieval/store modes. Flush modes. Lock modes. Fetch size. Read-only hints. Provider-specific optimizations. Fine-tune query execution.',
          codeExample: `// Read-only hint - skip dirty checking
List<Product> products = em.createQuery(
    "FROM Product", Product.class)
    .setHint("org.hibernate.readOnly", true)
    .getResultList();

// Cache hints
em.createQuery("FROM Product", Product.class)
    .setHint("jakarta.persistence.cache.storeMode",
        CacheStoreMode.REFRESH)
    .setHint("jakarta.persistence.cache.retrieveMode",
        CacheRetrieveMode.USE)
    .getResultList();

// Fetch size hint for large results
em.createQuery("FROM LogEntry", LogEntry.class)
    .setHint("org.hibernate.fetchSize", 100)
    .getResultList();`
        },
        {
          name: 'Index Awareness',
          explanation: 'Design queries to use database indexes. @Index annotation on columns. Avoid functions on indexed columns. Leading column in composite indexes. WHERE, JOIN, ORDER BY considerations. Explain plans.',
          codeExample: `@Entity
@Table(name = "orders", indexes = {
    @Index(name = "idx_customer", columnList = "customer_id"),
    @Index(name = "idx_status_date",
           columnList = "status, order_date"),
    @Index(name = "idx_email", columnList = "email",
           unique = true)
})
public class Order {
    @Id @GeneratedValue
    private Long id;

    @Column(name = "customer_id")
    private Long customerId;

    private String status;
    private LocalDate orderDate;

    // GOOD: uses idx_status_date
    // WHERE status = ? AND order_date > ?

    // BAD: function on indexed column
    // WHERE UPPER(status) = 'ACTIVE'
}`
        },
        {
          name: 'Pagination & Streaming',
          explanation: 'setFirstResult() and setMaxResults() for pagination. Stream API for large result sets. Cursor-based pagination. Avoid offset on large datasets. ScrollableResults. Memory-efficient processing.',
          codeExample: `// Offset pagination
List<Product> page = em.createQuery(
    "FROM Product ORDER BY id", Product.class)
    .setFirstResult(40)  // skip 40
    .setMaxResults(20)   // take 20
    .getResultList();

// Keyset pagination (better for large datasets)
List<Product> nextPage = em.createQuery(
    "FROM Product WHERE id > :lastId ORDER BY id",
    Product.class)
    .setParameter("lastId", lastSeenId)
    .setMaxResults(20)
    .getResultList();

// Streaming for batch processing
try (Stream<Order> stream = em.createQuery(
    "FROM Order WHERE status = 'PENDING'", Order.class)
    .getResultStream()) {
    stream.forEach(order -> processOrder(order));
}`
        }
      ]
    },
    {
      id: 'caching',
      name: 'Caching Strategies',
      icon: '💾',
      color: '#10b981',
      description: 'Multi-level caching mechanisms to reduce database access including session, application, and query caches',
      diagram: CachingStrategiesDiagram,
      details: [
        {
          name: 'First-Level Cache',
          explanation: 'Session/EntityManager scope cache. Automatic and mandatory. Stores entities within single session. Ensures repeatable reads. Cleared on session close. Prevents duplicate queries for same entity in transaction.',
          codeExample: `EntityManager em = emf.createEntityManager();

// First call hits database
Product p1 = em.find(Product.class, 1L);

// Second call returns cached instance (no SQL)
Product p2 = em.find(Product.class, 1L);
System.out.println(p1 == p2); // true - same instance

// Clear L1 cache to force DB reload
em.clear();
Product p3 = em.find(Product.class, 1L); // DB hit again
System.out.println(p1 == p3); // false - new instance

// Evict single entity from L1 cache
em.detach(p3);`
        },
        {
          name: 'Second-Level Cache',
          explanation: 'SessionFactory/EntityManagerFactory scope. Shared across sessions. Optional, configurable per entity. @Cacheable annotation. Cache providers: EhCache, Hazelcast, Infinispan. Dramatically reduces database load. Invalidation strategies.',
          codeExample: `// Enable L2 cache on entity
@Entity
@Cacheable
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Product {
    @Id @GeneratedValue
    private Long id;
    private String name;
    private BigDecimal price;

    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @OneToMany(mappedBy = "product")
    private List<Review> reviews; // Collection cache
}

// application.properties
// spring.jpa.properties.hibernate.cache
//   .use_second_level_cache=true
// spring.jpa.properties.hibernate.cache
//   .region.factory_class=
//   org.hibernate.cache.jcache.JCacheRegionFactory`
        },
        {
          name: 'Query Cache',
          explanation: 'Caches query result sets by query string and parameters. Must enable second-level cache first. query.setCacheable(true). Invalidated when related entity data changes. Useful for repeated queries with same parameters.',
          codeExample: `// Enable query cache
// hibernate.cache.use_query_cache=true

// Cache a specific query
List<Product> featured = em.createQuery(
    "FROM Product WHERE featured = true", Product.class)
    .setHint("org.hibernate.cacheable", true)
    .setHint("org.hibernate.cacheRegion", "featuredProducts")
    .getResultList();

// Spring Data - @QueryHints
@QueryHints({
    @QueryHint(name = "org.hibernate.cacheable", value = "true")
})
List<Product> findByCategory(String category);`
        },
        {
          name: 'Cache Modes',
          explanation: 'CacheStoreMode: USE, BYPASS, REFRESH. CacheRetrieveMode: USE, BYPASS. Control cache behavior per query. Force database hit when needed. Refresh stale data. Balance consistency and performance.',
          codeExample: `// Normal: read from cache, store in cache
em.setProperty("jakarta.persistence.cache.retrieveMode",
    CacheRetrieveMode.USE);
em.setProperty("jakarta.persistence.cache.storeMode",
    CacheStoreMode.USE);

// Bypass cache: force fresh DB read
Product fresh = em.find(Product.class, 1L,
    Map.of(
        "jakarta.persistence.cache.retrieveMode",
        CacheRetrieveMode.BYPASS
    ));

// Refresh cache: read from DB, update cache
em.find(Product.class, 1L,
    Map.of(
        "jakarta.persistence.cache.storeMode",
        CacheStoreMode.REFRESH
    ));`
        },
        {
          name: 'Eviction & Expiration',
          explanation: 'TTL (time-to-live) for cache entries. LRU/LFU eviction policies. Manual eviction with cache.evict(). Clear entire cache. Memory management. Stale data prevention. Configuration per entity or globally.',
          codeExample: `// Manual eviction
Cache cache = emf.getCache();

// Evict specific entity
cache.evict(Product.class, productId);

// Evict all of a type
cache.evict(Product.class);

// Evict everything
cache.evictAll();

// EhCache XML configuration
// <cache alias="products">
//   <expiry>
//     <ttl unit="minutes">30</ttl>
//   </expiry>
//   <heap unit="entries">1000</heap>
//   <offheap unit="MB">100</offheap>
// </cache>`
        },
        {
          name: 'Distributed Caching',
          explanation: 'Hazelcast, Infinispan for clustered deployments. Cache replication across nodes. Invalidation messages. Near cache optimization. Scalability in multi-server environments. Consistent caching.',
          codeExample: `// Hazelcast as L2 cache provider
// application.properties
// spring.jpa.properties.hibernate.cache
//   .region.factory_class=
//   com.hazelcast.hibernate.HazelcastCacheRegionFactory

// hazelcast.xml configuration
// <map name="com.app.entity.Product">
//   <backup-count>1</backup-count>
//   <time-to-live-seconds>300</time-to-live-seconds>
//   <eviction max-size-policy="PER_NODE"
//             size="10000"
//             eviction-policy="LRU"/>
//   <near-cache>
//     <max-size>5000</max-size>
//     <time-to-live-seconds>60</time-to-live-seconds>
//   </near-cache>
// </map>`
        }
      ]
    },
    {
      id: 'transaction-management',
      name: 'Transaction Management',
      icon: '🔐',
      color: '#3b82f6',
      description: 'Managing database transactions with ACID guarantees, isolation levels, and optimistic/pessimistic locking strategies',
      diagram: TransactionDiagram,
      details: [
        {
          name: 'ACID Properties',
          explanation: 'Atomicity: all or nothing. Consistency: valid state transitions. Isolation: concurrent transaction handling. Durability: committed changes persist. ORM ensures ACID through transaction boundaries. Data integrity guarantees.',
          codeExample: `// Atomicity - all or nothing
EntityTransaction tx = em.getTransaction();
tx.begin();
try {
    // Both operations succeed or both fail
    Account from = em.find(Account.class, fromId);
    Account to = em.find(Account.class, toId);
    from.debit(amount);
    to.credit(amount);
    tx.commit();  // Both changes persisted
} catch (Exception e) {
    tx.rollback(); // Neither change persisted
    throw e;
}`
        },
        {
          name: 'Programmatic Transactions',
          explanation: 'Manual transaction control with transaction.begin(), commit(), rollback(). Try-finally blocks for cleanup. Exception handling. Fine-grained control. Useful for complex transaction logic. Resource management.',
          codeExample: `EntityManager em = emf.createEntityManager();
EntityTransaction tx = em.getTransaction();

try {
    tx.begin();

    Order order = new Order(customerId);
    em.persist(order);

    for (var item : items) {
        Product p = em.find(Product.class, item.getId());
        if (p.getStock() < item.getQty()) {
            tx.rollback();
            throw new InsufficientStockException(p.getName());
        }
        p.reduceStock(item.getQty());
        order.addItem(p, item.getQty());
    }

    tx.commit();
} catch (Exception e) {
    if (tx.isActive()) tx.rollback();
    throw e;
} finally {
    em.close();
}`
        },
        {
          name: 'Declarative Transactions',
          explanation: '@Transactional annotation (Spring/Jakarta EE). AOP-based transaction proxies. Automatic rollback on unchecked exceptions. Propagation behaviors: REQUIRED, REQUIRES_NEW, NESTED, etc. Simpler, cleaner code.',
          codeExample: `@Service
public class PaymentService {

    // Default: REQUIRED - join existing or create new
    @Transactional
    public void processPayment(PaymentRequest req) {
        Payment payment = new Payment(req);
        em.persist(payment);
        notificationService.send(payment); // same TX
    }

    // REQUIRES_NEW - always new, independent TX
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void auditLog(String action) {
        em.persist(new AuditEntry(action));
        // Commits even if outer TX rolls back
    }

    // Read-only optimization
    @Transactional(readOnly = true)
    public List<Payment> getHistory(Long userId) {
        return paymentRepository.findByUserId(userId);
    }
}`
        },
        {
          name: 'Isolation Levels',
          explanation: 'READ_UNCOMMITTED, READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE. Control concurrent transaction behavior. Trade-off between consistency and performance. Database-dependent. Prevent dirty reads, phantom reads, lost updates.',
          codeExample: `// Set isolation level per transaction
@Transactional(isolation = Isolation.READ_COMMITTED)
public void updateInventory(Long productId, int qty) {
    Product p = em.find(Product.class, productId);
    p.setStock(p.getStock() - qty);
}

// SERIALIZABLE for critical financial operations
@Transactional(isolation = Isolation.SERIALIZABLE)
public void transferFunds(Long from, Long to, BigDecimal amt) {
    Account source = em.find(Account.class, from);
    Account target = em.find(Account.class, to);
    source.debit(amt);
    target.credit(amt);
}

// Isolation levels (low to high consistency):
// READ_UNCOMMITTED - dirty reads allowed
// READ_COMMITTED   - only committed data (default)
// REPEATABLE_READ  - consistent reads in TX
// SERIALIZABLE     - full isolation, slowest`
        },
        {
          name: 'Optimistic Locking',
          explanation: '@Version field for optimistic locking. Detects concurrent modifications. OptimisticLockException on conflict. Better concurrency than pessimistic locks. Last-commit-wins or retry strategies. Suitable for low contention.',
          codeExample: `@Entity
public class Product {
    @Id @GeneratedValue
    private Long id;
    private String name;
    private int stock;

    @Version  // Hibernate checks this on update
    private int version;
}

// Usage - concurrent update detection
@Transactional
public void updateStock(Long id, int qty) {
    Product p = em.find(Product.class, id);
    p.setStock(p.getStock() - qty);
    // On commit, Hibernate generates:
    // UPDATE products SET stock=?, version=version+1
    //   WHERE id=? AND version=?
    // If version changed -> OptimisticLockException
}`
        },
        {
          name: 'Pessimistic Locking',
          explanation: 'LockModeType.PESSIMISTIC_READ/WRITE/FORCE_INCREMENT. Database-level locks. Prevents concurrent modifications. Higher consistency, lower concurrency. SELECT FOR UPDATE queries. Use sparingly for critical sections.',
          codeExample: `// Pessimistic write lock - SELECT FOR UPDATE
@Transactional
public void reserveSeat(Long seatId) {
    Seat seat = em.find(Seat.class, seatId,
        LockModeType.PESSIMISTIC_WRITE);
    // Row is locked - other TXs wait

    if (seat.isAvailable()) {
        seat.setAvailable(false);
        seat.setReservedBy(currentUser());
    } else {
        throw new SeatUnavailableException();
    }
    // Lock released on commit
}

// With timeout
em.find(Seat.class, seatId,
    LockModeType.PESSIMISTIC_WRITE,
    Map.of("jakarta.persistence.lock.timeout", 5000));`
        }
      ]
    },
    {
      id: 'lazy-eager',
      name: 'Lazy/Eager Loading',
      icon: '🎯',
      color: '#ec4899',
      description: 'Loading strategies for entity relationships balancing between immediate data retrieval and on-demand loading',
      diagram: LazyEagerDiagram,
      details: [
        {
          name: 'Lazy Loading',
          explanation: 'Data loaded on first access. Proxy objects for unloaded data. Reduces initial query overhead. LazyInitializationException if session closed. Requires open persistence context. Default for collections and *ToMany relationships.',
          codeExample: `@Entity
public class Customer {
    @Id @GeneratedValue
    private Long id;
    private String name;

    // LAZY: orders not loaded until accessed
    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY)
    private List<Order> orders;
}

// Usage
Customer c = em.find(Customer.class, 1L);
// Only SELECT * FROM customers WHERE id=1

c.getOrders().size(); // NOW loads orders
// SELECT * FROM orders WHERE customer_id=1

// DANGER: accessing after session close
em.close();
c.getOrders(); // LazyInitializationException!`
        },
        {
          name: 'Eager Loading',
          explanation: 'Data loaded immediately with parent entity. Single query or separate queries. JOIN FETCH in queries. Simpler programming model. Risk of loading too much data. Default for *ToOne relationships. Memory considerations.',
          codeExample: `@Entity
public class Order {
    @Id @GeneratedValue
    private Long id;

    // EAGER: customer always loaded with order
    @ManyToOne(fetch = FetchType.EAGER)
    private Customer customer;

    // EAGER: items always loaded
    @OneToMany(mappedBy = "order", fetch = FetchType.EAGER)
    private List<OrderItem> items;
}

// Single find loads everything
Order order = em.find(Order.class, 1L);
// Generates JOIN query or multiple SELECTs
// customer and items immediately available
String name = order.getCustomer().getName(); // No extra query`
        },
        {
          name: 'Fetch Joins',
          explanation: 'JPQL: SELECT u FROM User u JOIN FETCH u.orders. Single query loads parent and children. Prevents N+1 problem. Can cause cartesian product with multiple collections. Distinct results. Most efficient loading strategy.',
          codeExample: `// Single JOIN FETCH - most efficient
List<Customer> customers = em.createQuery(
    "SELECT DISTINCT c FROM Customer c " +
    "JOIN FETCH c.orders " +
    "WHERE c.status = 'ACTIVE'", Customer.class)
    .getResultList();
// One query: SELECT c.*, o.* FROM customers c
//   JOIN orders o ON c.id = o.customer_id

// Multiple collections - use separate queries
List<Customer> customers = em.createQuery(
    "SELECT DISTINCT c FROM Customer c " +
    "JOIN FETCH c.orders", Customer.class)
    .getResultList();
// Then in a second query:
em.createQuery(
    "SELECT DISTINCT c FROM Customer c " +
    "JOIN FETCH c.addresses " +
    "WHERE c IN :customers", Customer.class)
    .setParameter("customers", customers)
    .getResultList();`
        },
        {
          name: 'Entity Graphs',
          explanation: 'JPA 2.1+ feature for dynamic fetch plans. @NamedEntityGraph annotation or programmatic. Override default fetch types. Mix of LAZY and EAGER per query. More flexible than static annotations. Query-specific optimization.',
          codeExample: `// Declarative entity graph
@Entity
@NamedEntityGraph(name = "Customer.withOrders",
    attributeNodes = {
        @NamedAttributeNode(value = "orders",
            subgraph = "orders-items")
    },
    subgraphs = @NamedSubgraph(name = "orders-items",
        attributeNodes = @NamedAttributeNode("items"))
)
public class Customer { ... }

// Use the graph
EntityGraph<?> graph = em.getEntityGraph("Customer.withOrders");
Customer c = em.find(Customer.class, 1L,
    Map.of("jakarta.persistence.fetchgraph", graph));

// Programmatic entity graph
EntityGraph<Customer> graph = em.createEntityGraph(Customer.class);
graph.addAttributeNodes("orders", "addresses");
Subgraph<Order> orderGraph = graph.addSubgraph("orders");
orderGraph.addAttributeNodes("items");`
        },
        {
          name: 'Batch Fetching',
          explanation: '@BatchSize(size=10) annotation. Loads collections in batches. Reduces number of queries without JOIN FETCH. Multiple IDs in IN clause. Middle ground between lazy and eager. Configuration per relationship.',
          codeExample: `@Entity
public class Department {
    @Id @GeneratedValue
    private Long id;

    @OneToMany(mappedBy = "department")
    @BatchSize(size = 25)
    private List<Employee> employees;
}

// Load 100 departments
List<Department> depts = em.createQuery(
    "FROM Department", Department.class).getResultList();
// 1 query for departments

// Access employees - loads in batches
for (Department d : depts) {
    d.getEmployees().size();
}
// Without @BatchSize: 100 queries (N+1)
// With @BatchSize(25): 4 queries (100/25)
// SELECT * FROM employees
//   WHERE department_id IN (?, ?, ..., ?)  -- 25 IDs`
        },
        {
          name: 'Fetch Strategy Trade-offs',
          explanation: 'Lazy: fewer initial queries, risk of LazyInitializationException. Eager: simpler code, potentially wasteful. Choose based on use case. Different strategies for different scenarios. Profile actual usage patterns.',
          codeExample: `// Rule of thumb:
// @ManyToOne  -> LAZY  (override EAGER default)
// @OneToOne   -> LAZY  (override EAGER default)
// @OneToMany  -> LAZY  (already default)
// @ManyToMany -> LAZY  (already default)

@Entity
public class Order {
    @ManyToOne(fetch = FetchType.LAZY) // Override!
    private Customer customer;

    @OneToMany(mappedBy = "order") // Default LAZY
    private List<OrderItem> items;
}

// Then use JOIN FETCH per use case:
// List page: no joins needed
// Detail page: JOIN FETCH items
// Report: JOIN FETCH customer, items`
        }
      ]
    },
    {
      id: 'n-plus-one',
      name: 'N+1 Problem',
      icon: '⚠️',
      color: '#ef4444',
      description: 'Common ORM performance anti-pattern where loading parent entities triggers N additional queries for relationships',
      diagram: NPlusOneDiagram,
      details: [
        {
          name: 'Problem Description',
          explanation: 'One query loads N parent entities, then N additional queries load children for each parent. Extremely common performance issue. 1 + N total queries. Linear growth with data size. Can bring system to crawl. Often invisible until production load.',
          codeExample: `// N+1 in action - 101 queries for 100 customers!
List<Customer> customers = em.createQuery(
    "FROM Customer", Customer.class).getResultList();
// Query 1: SELECT * FROM customers

for (Customer c : customers) {
    // Query 2..101: one per customer
    int orderCount = c.getOrders().size();
    System.out.println(c.getName() + ": " + orderCount);
}
// Total: 1 + 100 = 101 queries!
// With 10,000 customers = 10,001 queries!`
        },
        {
          name: 'Detection',
          explanation: 'Enable SQL logging: hibernate.show_sql=true. Look for repeated similar queries. APM tools show query patterns. Performance testing with realistic data volumes. Monitoring query counts. SQL explain plans.',
          codeExample: `// application.properties - enable SQL logging
// spring.jpa.show-sql=true
// spring.jpa.properties.hibernate.format_sql=true

// Programmatic statistics
Statistics stats = sessionFactory.getStatistics();
stats.setStatisticsEnabled(true);

// After operations, check query count
long queryCount = stats.getQueryExecutionCount();
System.out.println("Queries executed: " + queryCount);

// Log slow queries (> 500ms)
// hibernate.session.events.log.LOG_QUERIES_SLOWER_THAN_MS=500`
        },
        {
          name: 'JOIN FETCH Solution',
          explanation: 'Use JOIN FETCH in JPQL/HQL: FROM User u JOIN FETCH u.orders. Single query loads everything. Most efficient solution. Watch for cartesian products with multiple collections. Use SET to deduplicate results.',
          codeExample: `// FIXED: Single query loads everything
List<Customer> customers = em.createQuery(
    "SELECT DISTINCT c FROM Customer c " +
    "JOIN FETCH c.orders o " +
    "WHERE c.status = 'ACTIVE'", Customer.class)
    .getResultList();
// 1 query: SELECT DISTINCT c.*, o.*
//   FROM customers c
//   JOIN orders o ON c.id = o.customer_id

// Now iterate with zero extra queries
for (Customer c : customers) {
    int orderCount = c.getOrders().size(); // From cache
    System.out.println(c.getName() + ": " + orderCount);
}`
        },
        {
          name: 'Batch Fetching',
          explanation: '@BatchSize(size=10) annotation loads in batches. Fewer queries than N+1 but more than JOIN FETCH. Good for collections that are rarely accessed. Reduces N+1 impact without complex queries.',
          codeExample: `@Entity
public class Customer {
    @OneToMany(mappedBy = "customer")
    @BatchSize(size = 50) // Load 50 at a time
    private List<Order> orders;
}

// 100 customers, batch size 50
// Query 1: SELECT * FROM customers
// Query 2: SELECT * FROM orders
//   WHERE customer_id IN (1,2,3,...,50)
// Query 3: SELECT * FROM orders
//   WHERE customer_id IN (51,52,...,100)
// Total: 3 queries instead of 101!

// Global batch size in config
// hibernate.default_batch_fetch_size=25`
        },
        {
          name: 'Entity Graphs',
          explanation: 'Define fetch graph dynamically. entityGraph.addAttributeNodes("orders"). Applied per query. Overrides default lazy loading. Clean separation of mapping and fetching strategy. Multiple graphs for different use cases.',
          codeExample: `// Dynamic entity graph per query
EntityGraph<Customer> graph = em
    .createEntityGraph(Customer.class);
graph.addAttributeNodes("orders");

List<Customer> customers = em.createQuery(
    "FROM Customer WHERE status = 'ACTIVE'",
    Customer.class)
    .setHint("jakarta.persistence.fetchgraph", graph)
    .getResultList();
// Orders loaded eagerly for this query only
// Other queries still use LAZY default

// Spring Data shortcut
@EntityGraph(attributePaths = {"orders", "orders.items"})
List<Customer> findByStatus(String status);`
        }
      ]
    }
  ]

  useVoiceConceptNavigation(concepts, setSelectedConceptIndex, setSelectedDetailIndex)

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (selectedConceptIndex !== null) {
          setSelectedConceptIndex(null)
          setSelectedDetailIndex(0)
        } else {
          onBack()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

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

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'Databases', icon: '🗃️', onClick: onBack }
    ]

    if (selectedConcept) {
      stack.push({ name: 'Object-Relational Mapping', icon: '🔗', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'Object-Relational Mapping', icon: '🔗' })
    }

    return stack
  }

  const handleBreadcrumbClick = (index) => {
    const stack = buildBreadcrumbStack()
    if (stack[index].onClick) {
      stack[index].onClick()
    }
  }

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #93c5fd, #60a5fa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(59, 130, 246, 0.2)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '0.5rem',
    color: '#60a5fa',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  const navButtonStyle = {
    padding: '0.75rem 1.25rem',
    background: 'rgba(16, 185, 129, 0.2)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '0.5rem',
    color: '#4ade80',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            style={backButtonStyle}
            onClick={onBack}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            ← Back to Databases
          </button>
          <h1 style={titleStyle}>Object-Relational Mapping</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {onPrevious && (
            <button
              style={navButtonStyle}
              onClick={onPrevious}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              ← {previousName}
            </button>
          )}
          {onNext && (
            <button
              style={navButtonStyle}
              onClick={onNext}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={DATABASE_COLORS}
        />
      </div>

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
              {concept.details.length} topics • Click to explore
            </div>
          </div>
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
        primaryColor={DATABASE_COLORS.primary}
      />


      {/* Concept Detail Modal */}
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
              onMainMenu={breadcrumb?.onMainMenu || onBack}
              colors={DATABASE_COLORS}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #334155' }}>
              <h2 style={{ color: selectedConcept.color, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
                <span>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button onClick={handlePreviousConcept} disabled={selectedConceptIndex === 0} style={{ padding: '0.4rem 0.75rem', background: 'rgba(100, 116, 139, 0.2)', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '0.375rem', color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8', cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer', fontSize: '0.8rem' }}>←</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>{selectedConceptIndex + 1}/{concepts.length}</span>
                <button onClick={handleNextConcept} disabled={selectedConceptIndex === concepts.length - 1} style={{ padding: '0.4rem 0.75rem', background: 'rgba(100, 116, 139, 0.2)', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '0.375rem', color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8', cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer', fontSize: '0.8rem' }}>→</button>
                <button onClick={() => setSelectedConceptIndex(null)} style={{ padding: '0.4rem 0.75rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.375rem', color: '#f87171', cursor: 'pointer', fontSize: '0.8rem', marginLeft: '0.5rem' }}>✕</button>
              </div>
            </div>

            {/* Subtopic Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button key={i} onClick={() => setSelectedDetailIndex(i)} style={{ padding: '0.5rem 1rem', background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)', border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`, borderRadius: '0.5rem', color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', fontWeight: selectedDetailIndex === i ? '600' : '400', transition: 'all 0.2s' }}>{detail.name}</button>
              ))}
            </div>

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = detail.diagram || selectedConcept.diagram
              return (
                <div>
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{detail.name}</h3>
                  {DiagramComponent && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                      <DiagramComponent />
                    </div>
                  )}
                  <p style={{ color: '#e2e8f0', lineHeight: '1.8', marginBottom: '1rem', background: colorScheme.bg, border: `1px solid ${colorScheme.border}`, borderRadius: '0.5rem', padding: '1rem', textAlign: 'left' }}>{detail.explanation}</p>
                  {detail.codeExample && (
                    <div style={{
                      backgroundColor: '#1e293b',
                      padding: '1.5rem',
                      borderRadius: '0.5rem',
                      borderLeft: `4px solid ${selectedConcept.color}`,
                      overflow: 'auto',
                      marginTop: '1rem'
                    }}>
                      <SyntaxHighlighter code={detail.codeExample} />
                    </div>
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

export default ORM

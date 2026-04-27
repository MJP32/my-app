import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

// ORM Mapping Diagram
const ORMDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Object-Relational Mapping (ORM)</text>
    <rect x="50" y="50" width="180" height="90" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="140" y="75" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Java Object</text>
    <text x="140" y="95" textAnchor="middle" fill="#c4b5fd" fontSize="8">class User</text>
    <text x="140" y="110" textAnchor="middle" fill="#c4b5fd" fontSize="8">Long id</text>
    <text x="140" y="125" textAnchor="middle" fill="#c4b5fd" fontSize="8">String username</text>
    <rect x="260" y="65" width="180" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="90" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Hibernate ORM</text>
    <text x="350" y="110" textAnchor="middle" fill="#fcd34d" fontSize="8">@Entity → Table mapping</text>
    <rect x="470" y="50" width="180" height="90" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="560" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Database Table</text>
    <text x="560" y="95" textAnchor="middle" fill="#86efac" fontSize="8">users</text>
    <text x="560" y="110" textAnchor="middle" fill="#86efac" fontSize="8">id BIGINT PK</text>
    <text x="560" y="125" textAnchor="middle" fill="#86efac" fontSize="8">username VARCHAR</text>
    <line x1="230" y1="95" x2="255" y2="95" stroke="#4ade80" strokeWidth="2"/>
    <line x1="440" y1="95" x2="465" y2="95" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="160" textAnchor="middle" fill="#64748b" fontSize="9">Java objects ↔ SQL records • No manual JDBC • Database independence</text>
  </svg>
)

// Entity Relationships Diagram
const RelationshipsDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">JPA Entity Relationships</text>
    <rect x="50" y="50" width="130" height="50" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="115" y="80" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">@OneToOne</text>
    <rect x="200" y="50" width="130" height="50" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="265" y="80" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">@OneToMany</text>
    <rect x="350" y="50" width="130" height="50" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="415" y="80" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">@ManyToOne</text>
    <rect x="500" y="50" width="130" height="50" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="565" y="80" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">@ManyToMany</text>
    <text x="115" y="115" textAnchor="middle" fill="#93c5fd" fontSize="7">User ↔ Profile</text>
    <text x="265" y="115" textAnchor="middle" fill="#86efac" fontSize="7">Dept → Employees</text>
    <text x="415" y="115" textAnchor="middle" fill="#fcd34d" fontSize="7">Employee → Dept</text>
    <text x="565" y="115" textAnchor="middle" fill="#c4b5fd" fontSize="7">Student ↔ Course</text>
    <rect x="150" y="130" width="400" height="35" rx="4" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="1"/>
    <text x="350" y="150" textAnchor="middle" fill="#f472b6" fontSize="9">mappedBy = owner side • @JoinColumn • cascade = CascadeType.ALL</text>
  </svg>
)

// Session Lifecycle Diagram
const SessionDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Hibernate Session Lifecycle</text>
    <rect x="30" y="50" width="100" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="80" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Session</text>
    <text x="80" y="88" textAnchor="middle" fill="#bfdbfe" fontSize="8">Factory</text>
    <rect x="150" y="50" width="100" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="200" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">openSession</text>
    <text x="200" y="88" textAnchor="middle" fill="#bbf7d0" fontSize="8">()</text>
    <rect x="270" y="50" width="100" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="320" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">begin</text>
    <text x="320" y="88" textAnchor="middle" fill="#fef3c7" fontSize="8">Transaction</text>
    <rect x="390" y="50" width="100" height="50" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="440" y="72" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">CRUD</text>
    <text x="440" y="88" textAnchor="middle" fill="#ddd6fe" fontSize="8">Operations</text>
    <rect x="510" y="50" width="80" height="50" rx="6" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="550" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">commit</text>
    <rect x="610" y="50" width="60" height="50" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="640" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">close</text>
    <line x1="130" y1="75" x2="145" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="250" y1="75" x2="265" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="370" y1="75" x2="385" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="490" y1="75" x2="505" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="590" y1="75" x2="605" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">One Session per request • First-level cache • Always close session</text>
  </svg>
)

// Entity States Diagram
const EntityStatesDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Hibernate Entity States</text>
    <rect x="50" y="60" width="120" height="50" rx="6" fill="rgba(100, 116, 139, 0.3)" stroke="#64748b" strokeWidth="2"/>
    <text x="110" y="90" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Transient</text>
    <rect x="210" y="60" width="120" height="50" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="270" y="90" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Persistent</text>
    <rect x="370" y="60" width="120" height="50" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="430" y="90" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Detached</text>
    <rect x="530" y="60" width="120" height="50" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="590" y="90" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Removed</text>
    <path d="M 170 85 L 200 85" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow)"/>
    <text x="185" y="75" textAnchor="middle" fill="#4ade80" fontSize="7">save()</text>
    <path d="M 330 85 L 360 85" stroke="#f59e0b" strokeWidth="2"/>
    <text x="345" y="75" textAnchor="middle" fill="#fbbf24" fontSize="7">close()</text>
    <path d="M 330 105 L 360 105" stroke="#ef4444" strokeWidth="2"/>
    <text x="345" y="130" textAnchor="middle" fill="#f87171" fontSize="7">delete()</text>
    <path d="M 490 85 L 520 85" stroke="#ef4444" strokeWidth="2"/>
    <text x="110" y="130" textAnchor="middle" fill="#64748b" fontSize="7">new Object()</text>
    <text x="270" y="130" textAnchor="middle" fill="#86efac" fontSize="7">In Session cache</text>
    <text x="430" y="130" textAnchor="middle" fill="#fcd34d" fontSize="7">Session closed</text>
    <text x="590" y="130" textAnchor="middle" fill="#fca5a5" fontSize="7">Marked for delete</text>
    <text x="350" y="165" textAnchor="middle" fill="#64748b" fontSize="9">merge() reattaches • refresh() reloads • Changes auto-sync when persistent</text>
  </svg>
)

// Caching Diagram
const CachingDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Hibernate Caching Levels</text>
    <rect x="50" y="50" width="200" height="70" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="150" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">First-Level Cache</text>
    <text x="150" y="95" textAnchor="middle" fill="#93c5fd" fontSize="8">Session scope (automatic)</text>
    <text x="150" y="110" textAnchor="middle" fill="#93c5fd" fontSize="8">Entities by ID</text>
    <rect x="280" y="50" width="200" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="380" y="75" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Second-Level Cache</text>
    <text x="380" y="95" textAnchor="middle" fill="#c4b5fd" fontSize="8">SessionFactory scope</text>
    <text x="380" y="110" textAnchor="middle" fill="#c4b5fd" fontSize="8">EhCache, Redis</text>
    <rect x="510" y="50" width="140" height="70" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="580" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Query Cache</text>
    <text x="580" y="95" textAnchor="middle" fill="#86efac" fontSize="8">Cache query results</text>
    <text x="580" y="110" textAnchor="middle" fill="#86efac" fontSize="8">Invalidate on write</text>
    <line x1="250" y1="85" x2="275" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <line x1="480" y1="85" x2="505" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="145" textAnchor="middle" fill="#64748b" fontSize="9">L1 = per session • L2 = shared across sessions • Query cache for HQL results</text>
  </svg>
)

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
      .replace(/\b(String|List|ArrayList|Set|HashSet|Map|HashMap|Optional|Stream|Exception|Override|Integer|Long|BigDecimal|LocalDate|Date|Session|SessionFactory|Transaction|Query|Criteria|CriteriaBuilder|CriteriaQuery|Root|TypedQuery|Entity|Table|Column|Id|GeneratedValue|OneToMany|ManyToOne|ManyToMany|OneToOne|JoinColumn|JoinTable|Cascade|FetchType|EntityManager|Transactional|Configuration|ServiceRegistry|StandardServiceRegistryBuilder|Cacheable|Cache|BatchSize|Version|Embedded|Embeddable|Inheritance|DiscriminatorColumn|NamedQuery|NamedEntityGraph|EntityGraph)\b/g, '<span style="color: #4ec9b0;">$1</span>')
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

function Hibernate({ onBack, breadcrumb }) {
  const [activeSection, setActiveSection] = useState('basics')

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #064e3b, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Back button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <button
            onClick={onBack}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              background: 'rgba(74, 222, 128, 0.2)',
              color: '#4ade80',
              border: '1px solid rgba(74, 222, 128, 0.4)',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(74, 222, 128, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(74, 222, 128, 0.2)'
            }}
          >
            Back
          </button>
        </div>

        {/* Breadcrumb */}
        {breadcrumb && (
          <Breadcrumb
            breadcrumbStack={[
              breadcrumb.section && { name: breadcrumb.section.name, icon: breadcrumb.section.icon, onClick: breadcrumb.section.onClick },
              breadcrumb.category && { name: breadcrumb.category.name, onClick: breadcrumb.category.onClick },
              breadcrumb.topic && { name: breadcrumb.topic }
            ].filter(Boolean)}
            colors={breadcrumb.colors}
            onMainMenu={breadcrumb.onMainMenu}
          />
        )}

        {/* Centered title */}
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '0.5rem',
          background: 'linear-gradient(to right, #86efac, #4ade80)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Hibernate ORM
        </h1>
        <p style={{ color: '#d1d5db', textAlign: 'center', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Object-Relational Mapping framework for Java with caching, lazy loading, and database independence
        </p>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '0.25rem',
          marginBottom: '2rem',
          borderBottom: '2px solid #374151',
          overflowX: 'auto',
          flexWrap: 'nowrap'
        }}>
          {[
            { id: 'basics', label: 'Basics & ORM' },
            { id: 'relationships', label: 'Relationships' },
            { id: 'session', label: 'Session Management' },
            { id: 'caching', label: 'Caching' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '0.95rem',
                fontWeight: '600',
                backgroundColor: activeSection === tab.id ? '#22c55e' : 'transparent',
                color: activeSection === tab.id ? 'white' : '#9ca3af',
                border: 'none',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (activeSection !== tab.id) {
                  e.target.style.backgroundColor = '#374151'
                  e.target.style.color = '#d1d5db'
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== tab.id) {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = '#9ca3af'
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Basics & ORM */}
        {activeSection === 'basics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* ORM Diagram */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #374151',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <ORMDiagram />
            </div>

            {/* ORM Overview */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #374151'
            }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                ORM Overview
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                Hibernate is an Object-Relational Mapping (ORM) framework that maps Java objects to database tables. It eliminates boilerplate JDBC code, provides automatic table creation, caching mechanisms, and supports database independence. Hibernate implements JPA (Java Persistence API) specification and simplifies database operations through entity management.
              </p>
              <div style={{
                backgroundColor: '#1e1e1e',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <SyntaxHighlighter code={`// Entity Class
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "email")
    private String email;

    // Constructors, getters, setters
}`} />
              </div>
            </div>

            {/* SessionFactory Setup */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #374151'
            }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                SessionFactory Setup
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                SessionFactory is a heavyweight, thread-safe object created once per application. It reads hibernate.cfg.xml configuration, registers entity classes, and provides Session instances. Creating SessionFactory is expensive, so it should be done once at application startup and reused throughout.
              </p>
              <div style={{
                backgroundColor: '#1e1e1e',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <SyntaxHighlighter code={`// SessionFactory setup
SessionFactory factory = new Configuration()
    .configure("hibernate.cfg.xml")
    .addAnnotatedClass(User.class)
    .buildSessionFactory();

Session session = factory.openSession();
Transaction tx = session.beginTransaction();

// CRUD operations here

tx.commit();
session.close();`} />
              </div>
            </div>

            {/* Basic CRUD Operations */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #374151'
            }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Basic CRUD Operations
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                Hibernate provides simple methods for Create, Read, Update, and Delete operations. save() persists new entities, get() retrieves by ID, update() modifies existing entities, and delete() removes entities. All operations should be wrapped in transactions for data consistency.
              </p>
              <div style={{
                backgroundColor: '#1e1e1e',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <SyntaxHighlighter code={`Session session = factory.openSession();
Transaction tx = session.beginTransaction();

// Create
User user = new User("john", "john@example.com");
session.save(user);

// Read
User foundUser = session.get(User.class, 1L);

// Update
foundUser.setEmail("newemail@example.com");
session.update(foundUser);

// Delete
session.delete(foundUser);

tx.commit();
session.close();`} />
              </div>
            </div>

            {/* Key Points */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #374151'
            }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Key Points
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                ORM maps Java objects to database tables automatically. Eliminates boilerplate JDBC code - no manual SQL queries needed. Database independence - change database by changing configuration. Automatic table creation from entity classes. Built-in caching (first-level and second-level cache). Lazy loading for better performance. HQL (Hibernate Query Language) - object-oriented query language. Criteria API for type-safe queries.
              </p>
              <div style={{
                backgroundColor: '#1e1e1e',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <SyntaxHighlighter code={`// HQL - Hibernate Query Language
List<User> users = session.createQuery(
    "FROM User u WHERE u.email LIKE :domain", User.class)
    .setParameter("domain", "%@example.com")
    .getResultList();

// Criteria API - type-safe queries
CriteriaBuilder cb = session.getCriteriaBuilder();
CriteriaQuery<User> cq = cb.createQuery(User.class);
Root<User> root = cq.from(User.class);
cq.select(root).where(
    cb.like(root.get("email"), "%@example.com"));
List<User> result = session.createQuery(cq).getResultList();

// hibernate.cfg.xml key properties
// hibernate.dialect = org.hibernate.dialect.MySQLDialect
// hibernate.hbm2ddl.auto = update  (auto table creation)
// hibernate.show_sql = true`} />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Relationships */}
        {activeSection === 'relationships' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Relationships Diagram */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #374151',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <RelationshipsDiagram />
            </div>

            {/* One-to-Many / Many-to-One */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #374151'
            }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                One-to-Many / Many-to-One
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                @OneToMany represents a parent entity having a collection of child entities. @ManyToOne represents a child entity referencing its parent. The mappedBy attribute defines the owning side of the relationship. Use cascade types to control operation propagation.
              </p>
              <div style={{
                backgroundColor: '#1e1e1e',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <SyntaxHighlighter code={`@Entity
public class Department {
    @Id
    @GeneratedValue
    private Long id;

    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
    private List<Employee> employees;
}

@Entity
public class Employee {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
}`} />
              </div>
            </div>

            {/* Many-to-Many */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #374151'
            }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Many-to-Many
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                @ManyToMany represents multiple entities on both sides of the relationship. Requires a join table to store the associations. Use @JoinTable to specify the join table name and column mappings. The mappedBy attribute indicates the inverse side.
              </p>
              <div style={{
                backgroundColor: '#1e1e1e',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <SyntaxHighlighter code={`@Entity
public class Student {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToMany
    @JoinTable(
        name = "student_course",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private Set<Course> courses;
}

@Entity
public class Course {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToMany(mappedBy = "courses")
    private Set<Student> students;
}`} />
              </div>
            </div>

            {/* Cascade & Fetch Types */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #374151'
            }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Cascade & Fetch Types
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                Cascade types control how operations propagate: PERSIST, MERGE, REMOVE, REFRESH, DETACH, ALL. Fetch types control when data is loaded: LAZY (load when accessed) vs EAGER (load immediately). Choose LAZY for better performance unless eager loading is needed.
              </p>
              <div style={{
                backgroundColor: '#1e1e1e',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <SyntaxHighlighter code={`@Entity
public class Order {
    @Id
    @GeneratedValue
    private Long id;

    // Cascade all operations to items
    @OneToMany(mappedBy = "order",
               cascade = CascadeType.ALL,
               fetch = FetchType.LAZY)
    private List<OrderItem> items;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id")
    private Customer customer;
}`} />
              </div>
            </div>

            {/* Key Points */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #374151'
            }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Key Points
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                @OneToMany: Parent entity has collection of child entities. @ManyToOne: Child entity references parent entity. @OneToOne: One entity associated with exactly one other entity. @ManyToMany: Multiple entities on both sides, requires join table. Cascade types control operations propagation (PERSIST, MERGE, REMOVE, etc.). Fetch types: LAZY (load when accessed) vs EAGER (load immediately). mappedBy attribute defines bidirectional relationship owner. @JoinColumn specifies foreign key column.
              </p>
              <div style={{
                backgroundColor: '#1e1e1e',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <SyntaxHighlighter code={`// @OneToOne with shared primary key
@Entity
public class User {
    @Id @GeneratedValue
    private Long id;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserProfile profile;
}

@Entity
public class UserProfile {
    @Id @GeneratedValue
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}

// Bidirectional helper methods (best practice)
public void addEmployee(Employee emp) {
    employees.add(emp);
    emp.setDepartment(this);
}

public void removeEmployee(Employee emp) {
    employees.remove(emp);
    emp.setDepartment(null);
}`} />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Session Management */}
        {activeSection === 'session' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Session Diagram */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #374151',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <SessionDiagram />
              <EntityStatesDiagram />
            </div>

            {/* Session Lifecycle */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #374151'
            }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Session Lifecycle
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                Session is a lightweight, non-thread-safe object representing a single unit of work. It contains first-level cache and manages entity lifecycle. Sessions should be opened for each request/transaction and closed when done. Use try-with-resources for automatic cleanup.
              </p>
              <div style={{
                backgroundColor: '#1e1e1e',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <SyntaxHighlighter code={`// Session usage (per request)
Session session = factory.openSession();
try {
    Transaction tx = session.beginTransaction();

    // Operations here
    User user = session.get(User.class, 1L);
    user.setName("Updated Name");

    tx.commit();
} finally {
    session.close();
}

// Try-with-resources (auto-close)
try (Session session = factory.openSession()) {
    Transaction tx = session.beginTransaction();
    // operations
    tx.commit();
}`} />
              </div>
            </div>

            {/* save() vs persist() */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #374151'
            }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                save() vs persist()
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                save() returns the generated identifier immediately and can be used outside a transaction (though not recommended). persist() is void and requires a transaction context. Both make an object persistent, but persist() is the JPA standard method.
              </p>
              <div style={{
                backgroundColor: '#1e1e1e',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <SyntaxHighlighter code={`Session session = factory.openSession();
Transaction tx = session.beginTransaction();

// save() - returns generated ID
Long id = (Long) session.save(new User("john"));
System.out.println("Generated ID: " + id);

// persist() - void, doesn't return ID
User jane = new User("jane");
session.persist(jane);
// Access ID after flush
session.flush();
System.out.println("Jane's ID: " + jane.getId());

tx.commit();`} />
              </div>
            </div>

            {/* get() vs load() */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #374151'
            }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                get() vs load()
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                get() hits the database immediately and returns null if entity not found. load() returns a proxy object and only hits the database when a property is accessed (lazy loading). load() throws ObjectNotFoundException if entity not found when accessed.
              </p>
              <div style={{
                backgroundColor: '#1e1e1e',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <SyntaxHighlighter code={`Session session = factory.openSession();

// get() - immediate DB hit, returns null if not found
User user1 = session.get(User.class, 1L);
if (user1 != null) {
    System.out.println(user1.getName());
}

// load() - returns proxy, lazy loads
// throws exception if not found when accessed
User user2 = session.load(User.class, 2L);
// DB hit happens here when accessing property
System.out.println(user2.getName());`} />
              </div>
            </div>

            {/* Entity States */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #374151'
            }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Entity States
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                Transient: newly created object, not associated with Session or database. Persistent: associated with a Session, changes are tracked and synchronized. Detached: was persistent but Session is closed, changes not tracked. Use merge() to re-attach detached entities.
              </p>
              <div style={{
                backgroundColor: '#1e1e1e',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <SyntaxHighlighter code={`// Transient state
User transient = new User("bob");

// Persistent state - after save()
session.save(transient);
transient.setEmail("bob@example.com"); // Change tracked

// Flush to synchronize with DB
session.flush();

// Detached state - after close()
session.close();

// Re-attach with merge()
Session newSession = factory.openSession();
User managed = (User) newSession.merge(transient);`} />
              </div>
            </div>

            {/* Key Points */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #374151'
            }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Key Points
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                SessionFactory: Heavy object, thread-safe, created once per application. Session: Light object, not thread-safe, one per request/transaction. First-level cache: Automatic, associated with Session. Entity states: Transient (not in DB), Persistent (managed), Detached (was persistent). save() vs persist(): save() returns ID immediately. get() vs load(): get() hits DB immediately, load() returns proxy. update() vs merge(): update() for detached entities, merge() creates copy. Always close Session in finally block or use try-with-resources.
              </p>
              <div style={{
                backgroundColor: '#1e1e1e',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <SyntaxHighlighter code={`// update() vs merge() comparison
Session session1 = factory.openSession();
Transaction tx1 = session1.beginTransaction();
User user = session1.get(User.class, 1L);
tx1.commit();
session1.close(); // user is now detached

// Option 1: update() - reattaches same object
Session session2 = factory.openSession();
Transaction tx2 = session2.beginTransaction();
user.setName("Updated");
session2.update(user); // reattaches 'user'
tx2.commit();
session2.close();

// Option 2: merge() - returns new managed copy
Session session3 = factory.openSession();
Transaction tx3 = session3.beginTransaction();
user.setName("Merged");
User managed = (User) session3.merge(user);
// 'managed' is persistent, 'user' is still detached
tx3.commit();
session3.close();`} />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Caching */}
        {activeSection === 'caching' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Caching Diagram */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #374151',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <CachingDiagram />
            </div>

            {/* First-Level Cache */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #374151'
            }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                First-Level Cache
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                First-level cache is enabled by default and associated with the Session. It caches entities within the same session - multiple get() calls for the same ID return the same object instance. Cache is cleared when session is closed.
              </p>
              <div style={{
                backgroundColor: '#1e1e1e',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <SyntaxHighlighter code={`Session session = factory.openSession();

// First load - hits database
User user1 = session.get(User.class, 1L);

// Second load - hits first-level cache (no SQL)
User user2 = session.get(User.class, 1L);

// Same object instance
System.out.println(user1 == user2); // true

// Clear first-level cache
session.clear();

// This will hit database again
User user3 = session.get(User.class, 1L);`} />
              </div>
            </div>

            {/* Second-Level Cache */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #374151'
            }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Second-Level Cache
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                Second-level cache is optional and SessionFactory-scoped, shared across sessions. Requires third-party providers like EhCache, Infinispan, or Hazelcast. Enable with @Cacheable annotation and configure cache concurrency strategy.
              </p>
              <div style={{
                backgroundColor: '#1e1e1e',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <SyntaxHighlighter code={`// Enable entity for second-level cache
@Entity
@Cacheable
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Product {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
}

// Configuration (hibernate.cfg.xml)
<property name="hibernate.cache.use_second_level_cache">
    true
</property>
<property name="hibernate.cache.region.factory_class">
    org.hibernate.cache.jcache.JCacheRegionFactory
</property>`} />
              </div>
            </div>

            {/* Query Cache */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #374151'
            }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Query Cache
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                Query cache stores query results and must be enabled explicitly. Useful for queries that are run frequently with the same parameters. Results are invalidated when underlying tables are modified.
              </p>
              <div style={{
                backgroundColor: '#1e1e1e',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <SyntaxHighlighter code={`// Enable query cache in configuration
<property name="hibernate.cache.use_query_cache">
    true
</property>

// Using query cache
List<Product> products = session
    .createQuery("FROM Product WHERE price < :maxPrice")
    .setParameter("maxPrice", 100.0)
    .setCacheable(true)
    .setCacheRegion("productQueries")
    .list();

// Second execution hits cache
List<Product> cachedProducts = session
    .createQuery("FROM Product WHERE price < :maxPrice")
    .setParameter("maxPrice", 100.0)
    .setCacheable(true)
    .list();`} />
              </div>
            </div>

            {/* Cache Eviction */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #374151'
            }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Cache Eviction
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                Evict specific entities or entire regions from cache when data becomes stale. Use SessionFactory.getCache() methods for second-level cache eviction. First-level cache uses Session.evict() or Session.clear().
              </p>
              <div style={{
                backgroundColor: '#1e1e1e',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <SyntaxHighlighter code={`// First-level cache eviction
session.evict(product);  // Evict specific entity
session.clear();          // Clear entire session cache

// Second-level cache eviction
Cache cache = sessionFactory.getCache();

// Evict specific entity
cache.evict(Product.class, productId);

// Evict all of entity type
cache.evictEntityRegion(Product.class);

// Evict query cache region
cache.evictQueryRegion("productQueries");

// Evict all caches
cache.evictAllRegions();`} />
              </div>
            </div>

            {/* Batch Fetching */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #374151'
            }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Batch Fetching
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                Use @BatchSize to fetch multiple entities in batches, avoiding N+1 query problems. When accessing a lazy collection, Hibernate fetches multiple collections in a single query based on the batch size.
              </p>
              <div style={{
                backgroundColor: '#1e1e1e',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <SyntaxHighlighter code={`@Entity
public class Department {
    @OneToMany(mappedBy = "department")
    @BatchSize(size = 10)  // Fetch in batches of 10
    private List<Employee> employees;
}

// Without batch: N+1 queries
// With batch: 1 + (N/10) queries

// Alternative: Join fetch
List<Department> depts = session
    .createQuery(
        "FROM Department d JOIN FETCH d.employees",
        Department.class)
    .getResultList();`} />
              </div>
            </div>

            {/* Key Points */}
            <div style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #374151'
            }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Key Points
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                First-level cache: Enabled by default, Session-scoped, cannot be disabled. Second-level cache: Optional, SessionFactory-scoped, requires configuration. Cache providers: EhCache, Infinispan, Hazelcast, Redis. Cache concurrency strategies: READ_ONLY, NONSTRICT_READ_WRITE, READ_WRITE, TRANSACTIONAL. Query cache: Caches query results, must enable explicitly. Cache eviction methods: evict(), clear(), evictAll(). Use @Cacheable and @Cache annotations. Cache only read-mostly entities to avoid stale data.
              </p>
              <div style={{
                backgroundColor: '#1e1e1e',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #374151'
              }}>
                <SyntaxHighlighter code={`// Cache concurrency strategies
@Entity
@Cache(usage = CacheConcurrencyStrategy.READ_ONLY)
public class Country { /* immutable reference data */ }

@Entity
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Product { /* read-mostly, occasional writes */ }

@Entity
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BlogPost { /* eventual consistency OK */ }

// Statistics to monitor cache performance
Statistics stats = sessionFactory.getStatistics();
stats.setStatisticsEnabled(true);

long hitCount = stats.getSecondLevelCacheHitCount();
long missCount = stats.getSecondLevelCacheMissCount();
double hitRatio = (double) hitCount / (hitCount + missCount);
System.out.println("L2 Cache hit ratio: " + hitRatio);`} />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Hibernate

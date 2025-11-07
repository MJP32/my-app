import { useState } from 'react'

// Simple syntax highlighter for Java code
const SyntaxHighlighter = ({ code }) => {
  const highlightJava = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    // Protect comments
    highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    // Protect strings
    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    // Apply syntax highlighting
    highlighted = highlighted
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ArrayList|HashMap|Optional|Stream|Exception|Session|SessionFactory|Transaction|Query|Criteria|Entity|Table|Column|Id|GeneratedValue|OneToMany|ManyToOne|ManyToMany|OneToOne|JoinColumn|Cascade|Fetch|Lazy|Eager)\b/g, '<span style="color: #4ec9b0;">$1</span>')
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

function Hibernate({ onBack }) {
  const [selectedTopic, setSelectedTopic] = useState(null)

  const topics = [
    {
      id: 1,
      name: 'Hibernate Basics & ORM',
      icon: '🔧',
      color: '#8b5cf6',
      description: 'Object-Relational Mapping fundamentals',
      content: {
        explanation: 'Hibernate is an Object-Relational Mapping (ORM) framework that maps Java objects to database tables. It eliminates boilerplate JDBC code, provides automatic table creation, caching mechanisms, and supports database independence. Hibernate implements JPA (Java Persistence API) specification and simplifies database operations through entity management.',
        keyPoints: [
          'ORM: Maps Java objects to database tables automatically',
          'Eliminates boilerplate JDBC code - no manual SQL queries needed',
          'Database independence - change database by changing configuration',
          'Automatic table creation from entity classes',
          'Built-in caching (first-level and second-level cache)',
          'Lazy loading for better performance',
          'HQL (Hibernate Query Language) - object-oriented query language',
          'Criteria API for type-safe queries'
        ],
        codeExample: `// Entity Class
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
}

// Using Hibernate
SessionFactory factory = new Configuration()
    .configure("hibernate.cfg.xml")
    .addAnnotatedClass(User.class)
    .buildSessionFactory();

Session session = factory.openSession();
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
session.close();`
      }
    },
    {
      id: 2,
      name: 'Entity Relationships',
      icon: '🔗',
      color: '#10b981',
      description: 'OneToMany, ManyToOne, ManyToMany mappings',
      content: {
        explanation: 'Hibernate supports various relationship mappings between entities: @OneToMany (parent has collection of children), @ManyToOne (child references parent), @OneToOne (one-to-one relationship), and @ManyToMany (many-to-many with join table). These relationships can be bidirectional or unidirectional and support cascading operations.',
        keyPoints: [
          '@OneToMany: Parent entity has collection of child entities',
          '@ManyToOne: Child entity references parent entity',
          '@OneToOne: One entity associated with exactly one other entity',
          '@ManyToMany: Multiple entities on both sides, requires join table',
          'Cascade types control operations propagation (PERSIST, MERGE, REMOVE, etc.)',
          'Fetch types: LAZY (load when accessed) vs EAGER (load immediately)',
          'mappedBy attribute defines bidirectional relationship owner',
          '@JoinColumn specifies foreign key column'
        ],
        codeExample: `// One-to-Many / Many-to-One
@Entity
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
}

// Many-to-Many
@Entity
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
}`
      }
    },
    {
      id: 3,
      name: 'Session Management',
      icon: '⚙️',
      color: '#3b82f6',
      description: 'SessionFactory, Session, and Transaction handling',
      content: {
        explanation: 'SessionFactory is a heavyweight, thread-safe object created once per application that creates Session objects. Session is a lightweight, non-thread-safe object representing a single unit of work. Session contains first-level cache and manages entity lifecycle (transient, persistent, detached). Proper session and transaction management is crucial for data consistency.',
        keyPoints: [
          'SessionFactory: Heavy object, thread-safe, created once per application',
          'Session: Light object, not thread-safe, one per request/transaction',
          'First-level cache: Automatic, associated with Session',
          'Entity states: Transient (not in DB), Persistent (managed), Detached (was persistent)',
          'save() vs persist(): save() returns ID immediately',
          'get() vs load(): get() hits DB immediately, load() returns proxy',
          'update() vs merge(): update() for detached entities, merge() creates copy',
          'Always close Session in finally block or use try-with-resources'
        ],
        codeExample: `// SessionFactory setup (once per application)
SessionFactory factory = new Configuration()
    .configure("hibernate.cfg.xml")
    .addAnnotatedClass(User.class)
    .buildSessionFactory();

// Session usage (per request)
Session session = factory.openSession();
try {
    Transaction tx = session.beginTransaction();

    // save() - returns generated ID
    Long id = (Long) session.save(new User("john"));

    // persist() - void, doesn't return ID
    session.persist(new User("jane"));

    // get() - immediate DB hit, returns null if not found
    User user1 = session.get(User.class, 1L);

    // load() - returns proxy, lazy loads, throws exception if not found
    User user2 = session.load(User.class, 2L);

    // Entity states
    User transient = new User("bob");  // Transient
    session.save(transient);  // Now persistent
    session.flush();
    session.close();  // Now detached

    tx.commit();
} finally {
    session.close();
}

// Try-with-resources (auto-close)
try (Session session = factory.openSession()) {
    Transaction tx = session.beginTransaction();
    // operations
    tx.commit();
}`
      }
    },
    {
      id: 4,
      name: 'Caching Strategies',
      icon: '💾',
      color: '#ef4444',
      description: 'First-level, second-level, and query cache',
      content: {
        explanation: 'Hibernate provides multiple caching layers to reduce database hits. First-level cache is enabled by default and associated with Session. Second-level cache is optional, shared across sessions, and requires third-party providers like EhCache. Query cache stores query results. Proper caching dramatically improves application performance.',
        keyPoints: [
          'First-level cache: Enabled by default, Session-scoped, cannot be disabled',
          'Second-level cache: Optional, SessionFactory-scoped, requires configuration',
          'Cache providers: EhCache, Infinispan, Hazelcast, Redis',
          'Cache concurrency strategies: READ_ONLY, NONSTRICT_READ_WRITE, READ_WRITE, TRANSACTIONAL',
          'Query cache: Caches query results, must enable explicitly',
          'Cache eviction methods: evict(), clear(), evictAll()',
          'Use @Cacheable and @Cache annotations',
          'Cache only read-mostly entities to avoid stale data'
        ],
        codeExample: `// Enable entity for second-level cache
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
<property name="hibernate.cache.use_second_level_cache">true</property>
<property name="hibernate.cache.region.factory_class">
    org.hibernate.cache.jcache.JCacheRegionFactory
</property>

// Using cache
Session session = factory.openSession();

// First load - hits database
Product p1 = session.get(Product.class, 1L);

// Second load - hits cache (no SQL)
Product p2 = session.get(Product.class, 1L);

// Cache eviction
sessionFactory.getCache().evict(Product.class, 1L);  // Evict specific
sessionFactory.getCache().evictEntityRegion(Product.class);  // Evict all

// Query cache
session.createQuery("FROM Product")
    .setCacheable(true)
    .setCacheRegion("productQueries")
    .list();

// Batch fetching to avoid N+1
@Entity
public class Department {
    @OneToMany(mappedBy = "department")
    @BatchSize(size = 10)  // Fetch in batches of 10
    private List<Employee> employees;
}`
      }
    }
  ]

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#f5f3ff', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
        >
          ← Back to Frameworks
        </button>

        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: '1rem 0 0.5rem 0'
        }}>
          🔧 Hibernate ORM
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#6b7280', margin: 0 }}>
          Object-Relational Mapping framework for Java applications
        </p>
      </div>

      {!selectedTopic ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                border: `3px solid ${topic.color}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = `0 0 0 4px ${topic.color}40, 0 12px 24px rgba(0,0,0,0.2)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{topic.icon}</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                {topic.name}
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: '1.6' }}>
                {topic.description}
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedTopic(null)}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              backgroundColor: selectedTopic.color,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '1.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            ← Back to Topics
          </button>

          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            border: `3px solid ${selectedTopic.color}`,
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '3rem' }}>{selectedTopic.icon}</div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1f2937', margin: 0 }}>
                {selectedTopic.name}
              </h2>
            </div>

            <div style={{ fontSize: '1.05rem', color: '#4b5563', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              {selectedTopic.content.explanation}
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
              Key Points:
            </h3>
            <ul style={{ color: '#4b5563', lineHeight: '1.8', marginBottom: '2rem' }}>
              {selectedTopic.content.keyPoints.map((point, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>{point}</li>
              ))}
            </ul>

            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
              Code Example:
            </h3>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.5rem',
              borderRadius: '8px',
              overflow: 'auto'
            }}>
              <SyntaxHighlighter code={selectedTopic.content.codeExample} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Hibernate

import { useState } from 'react'

function HibernateQuestions({ onBack }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  // Helper function to render formatted text with colors for bold sections
  const renderFormattedAnswer = (text) => {
    const lines = text.split('\n')
    const colors = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#ea580c', '#0891b2']
    let colorIndex = 0

    return lines.map((line, lineIndex) => {
      // Check if line starts with ** (bold section header)
      const boldMatch = line.match(/^\*\*(.+?):\*\*/)
      if (boldMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        return (
          <div key={lineIndex} style={{ marginTop: lineIndex > 0 ? '1rem' : 0 }}>
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.05rem'
            }}>
              {boldMatch[1]}:
            </span>
            {line.substring(boldMatch[0].length)}
          </div>
        )
      }

      // Check for numbered sections like **1. Title:**
      const numberedMatch = line.match(/^\*\*(\d+\.\s+.+?):\*\*/)
      if (numberedMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        return (
          <div key={lineIndex} style={{ marginTop: lineIndex > 0 ? '1rem' : 0 }}>
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.05rem'
            }}>
              {numberedMatch[1]}:
            </span>
            {line.substring(numberedMatch[0].length)}
          </div>
        )
      }

      // Regular line
      return <div key={lineIndex}>{line}</div>
    })
  }

  const questions = [
    {
      id: 1,
      category: 'Core Concepts',
      question: 'What is Hibernate and what are its advantages?',
      answer: `**What is Hibernate?**
- Object-Relational Mapping (ORM) framework for Java
- Maps Java objects to database tables automatically
- Implements JPA (Java Persistence API) specification
- Handles CRUD operations without writing SQL

**Advantages:**

**1. Eliminates Boilerplate Code:**
\`\`\`java
// Without Hibernate (JDBC)
Connection conn = DriverManager.getConnection(url);
PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE id=?");
ps.setInt(1, userId);
ResultSet rs = ps.executeQuery();
User user = new User();
if(rs.next()) {
    user.setId(rs.getInt("id"));
    user.setName(rs.getString("name"));
    // ... more fields
}

// With Hibernate
User user = session.get(User.class, userId);
\`\`\`

**2. Database Independence:**
- Change database by changing configuration
- No SQL code changes needed
- Supports MySQL, PostgreSQL, Oracle, etc.

**3. Automatic Table Creation:**
\`\`\`java
@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    // Hibernate creates table automatically
}
\`\`\`

**4. Caching:**
- First-level cache (Session)
- Second-level cache (SessionFactory)
- Query cache
- Reduces database hits significantly

**5. Lazy Loading:**
- Loads related objects only when accessed
- Improves performance for large object graphs

**6. Built-in Transactions:**
\`\`\`java
Transaction tx = session.beginTransaction();
session.save(user);
tx.commit();
\`\`\`

**7. HQL (Hibernate Query Language):**
- Object-oriented query language
- Database independent
- Translated to native SQL

\`\`\`java
Query query = session.createQuery("FROM User WHERE name = :name");
query.setParameter("name", "John");
List<User> users = query.list();
\`\`\`

**Disadvantages:**
- Learning curve
- Performance overhead (compared to raw SQL)
- Complex for very simple applications
- Debugging can be difficult`
    },
    {
      id: 2,
      category: 'Session Management',
      question: 'Explain Hibernate Session and SessionFactory',
      answer: `**SessionFactory:**
- Heavyweight object, created once per application
- Thread-safe, can be shared across threads
- Used to create Session objects
- Contains cached metadata about entity mappings

\`\`\`java
// Create once during application startup
SessionFactory factory = new Configuration()
    .configure("hibernate.cfg.xml")
    .addAnnotatedClass(User.class)
    .buildSessionFactory();
\`\`\`

**Session:**
- Lightweight object, created for each database operation
- NOT thread-safe, one per thread
- Represents single unit of work
- Contains first-level cache

\`\`\`java
// Create for each request
Session session = factory.openSession();
try {
    Transaction tx = session.beginTransaction();
    // Perform operations
    User user = new User("John");
    session.save(user);
    tx.commit();
} finally {
    session.close();
}
\`\`\`

**Key Differences:**

| SessionFactory | Session |
|----------------|---------|
| Heavy object | Light object |
| Thread-safe | Not thread-safe |
| Created once | Created per request |
| Immutable | Mutable |
| Contains metadata | Contains data |
| Second-level cache | First-level cache |

**Session Methods:**

**save() vs persist():**
\`\`\`java
// save() - returns generated ID immediately
Long id = (Long) session.save(user);

// persist() - doesn't return anything, void
session.persist(user);
// Use outside transaction with persist()
\`\`\`

**get() vs load():**
\`\`\`java
// get() - hits DB immediately, returns null if not found
User user = session.get(User.class, 1L);

// load() - returns proxy, lazy loads, throws exception if not found
User user = session.load(User.class, 1L);  // No DB hit
System.out.println(user.getName());  // DB hit here
\`\`\`

**update() vs merge():**
\`\`\`java
// update() - attaches detached entity to session
session.update(user);

// merge() - copies state to persistent entity
User managedUser = (User) session.merge(user);
\`\`\`

**Session States:**

**1. Transient:**
- Object created but not associated with session
- Not in database
\`\`\`java
User user = new User("John");  // Transient
\`\`\`

**2. Persistent:**
- Associated with session
- Any changes automatically saved to DB
\`\`\`java
session.save(user);  // Now persistent
user.setName("Jane");  // Auto-updated in DB on flush
\`\`\`

**3. Detached:**
- Was persistent but session closed
- Changes not tracked
\`\`\`java
session.close();  // user is now detached
user.setName("Bob");  // Not saved to DB
\`\`\`

**Best Practices:**
- One SessionFactory per database
- One Session per request/transaction
- Always close Session in finally block
- Use try-with-resources for automatic closing`
    },
    {
      id: 3,
      category: 'Relationships',
      question: 'Explain @OneToMany, @ManyToOne, @OneToOne, and @ManyToMany relationships',
      answer: `**@OneToMany / @ManyToOne:**
- Most common relationship
- Parent has collection of children
- Child has reference to parent

\`\`\`java
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
\`\`\`

**Database Schema:**
\`\`\`sql
-- employees table has foreign key
CREATE TABLE employees (
    id BIGINT PRIMARY KEY,
    name VARCHAR(100),
    department_id BIGINT,  -- Foreign key
    FOREIGN KEY (department_id) REFERENCES departments(id)
);
\`\`\`

**@OneToOne:**
- Each entity associated with exactly one instance of other entity
- Can be bidirectional or unidirectional

\`\`\`java
@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id")
    private UserProfile profile;
}

@Entity
public class UserProfile {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne(mappedBy = "profile")
    private User user;
}
\`\`\`

**@ManyToMany:**
- Multiple entities on both sides
- Requires join table

\`\`\`java
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
}
\`\`\`

**Database Schema:**
\`\`\`sql
-- Join table
CREATE TABLE student_course (
    student_id BIGINT,
    course_id BIGINT,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);
\`\`\`

**Cascade Types:**

\`\`\`java
@OneToMany(cascade = CascadeType.ALL)  // All operations
@OneToMany(cascade = CascadeType.PERSIST)  // Only save
@OneToMany(cascade = CascadeType.MERGE)  // Only merge
@OneToMany(cascade = CascadeType.REMOVE)  // Only delete
@OneToMany(cascade = CascadeType.REFRESH)  // Only refresh
@OneToMany(cascade = CascadeType.DETACH)  // Only detach
\`\`\`

**Fetch Types:**

\`\`\`java
// LAZY - load when accessed (default for collections)
@OneToMany(fetch = FetchType.LAZY)
private List<Employee> employees;

// EAGER - load immediately (default for single entities)
@ManyToOne(fetch = FetchType.EAGER)
private Department department;
\`\`\`

**Bidirectional Best Practice:**
\`\`\`java
// Always keep both sides in sync
public void addEmployee(Employee employee) {
    employees.add(employee);
    employee.setDepartment(this);
}

public void removeEmployee(Employee employee) {
    employees.remove(employee);
    employee.setDepartment(null);
}
\`\`\``
    },
    {
      id: 4,
      category: 'Fetching Strategies',
      question: 'What is the N+1 problem and how to solve it?',
      answer: `**What is N+1 Problem?**
- Executes 1 query to fetch N entities
- Then executes N additional queries to fetch related data
- Results in (N+1) total queries instead of 1 or 2

**Example:**
\`\`\`java
@Entity
public class Department {
    @OneToMany(mappedBy = "department", fetch = FetchType.LAZY)
    private List<Employee> employees;
}

// This causes N+1 problem
List<Department> depts = session.createQuery("FROM Department").list();  // 1 query
for(Department dept : depts) {
    dept.getEmployees().size();  // N queries (one per department)
}

// Total: 1 + N queries!
\`\`\`

**SQL Generated:**
\`\`\`sql
-- Query 1: Fetch all departments
SELECT * FROM departments;

-- Query 2: Fetch employees for dept 1
SELECT * FROM employees WHERE department_id = 1;

-- Query 3: Fetch employees for dept 2
SELECT * FROM employees WHERE department_id = 2;

-- ... N more queries
\`\`\`

**Solution 1: JOIN FETCH (Best)**
\`\`\`java
// Single query with JOIN
List<Department> depts = session.createQuery(
    "SELECT DISTINCT d FROM Department d " +
    "LEFT JOIN FETCH d.employees"
).list();

// SQL: SELECT * FROM departments d
//      LEFT JOIN employees e ON d.id = e.department_id
\`\`\`

**Solution 2: Entity Graph (JPA 2.1+)**
\`\`\`java
EntityGraph<Department> graph = em.createEntityGraph(Department.class);
graph.addSubgraph("employees");

Map<String, Object> hints = new HashMap<>();
hints.put("javax.persistence.fetchgraph", graph);

List<Department> depts = em.createQuery("FROM Department")
    .setHint("javax.persistence.fetchgraph", graph)
    .getResultList();
\`\`\`

**Solution 3: Batch Fetching**
\`\`\`java
@Entity
public class Department {
    @OneToMany(mappedBy = "department")
    @BatchSize(size = 10)  // Fetch in batches of 10
    private List<Employee> employees;
}

// Instead of N queries, executes N/10 queries
\`\`\`

**Solution 4: @Fetch(FetchMode.SUBSELECT)**
\`\`\`java
@Entity
public class Department {
    @OneToMany(mappedBy = "department")
    @Fetch(FetchMode.SUBSELECT)
    private List<Employee> employees;
}

// SQL: SELECT * FROM employees
//      WHERE department_id IN (SELECT id FROM departments)
// Only 2 queries instead of N+1
\`\`\`

**Solution 5: Projection (DTO)**
\`\`\`java
// Fetch only needed fields
List<Object[]> results = session.createQuery(
    "SELECT d.name, COUNT(e.id) " +
    "FROM Department d " +
    "LEFT JOIN d.employees e " +
    "GROUP BY d.name"
).list();
\`\`\`

**Comparison:**

| Solution | Queries | Use Case |
|----------|---------|----------|
| JOIN FETCH | 1 | Small result sets |
| Batch Fetching | N/batch_size | Large result sets |
| Subselect | 2 | Medium result sets |
| Entity Graph | 1-2 | JPA applications |

**Detecting N+1:**
- Enable SQL logging
- Use Hibernate statistics
- Use tools like P6Spy

\`\`\`properties
# hibernate.cfg.xml
hibernate.show_sql=true
hibernate.format_sql=true
hibernate.generate_statistics=true
\`\`\`

**Best Practices:**
- Use JOIN FETCH for small datasets
- Use @BatchSize for large datasets
- Always check generated SQL in development
- Use database query profiling tools`
    },
    {
      id: 5,
      category: 'Caching',
      question: 'Explain First Level and Second Level cache in Hibernate',
      answer: `**First Level Cache:**
- Enabled by default
- Associated with Session
- Scope: Single session only
- Automatically managed by Hibernate
- Cannot be disabled

**How it Works:**
\`\`\`java
Session session = factory.openSession();

// First load - hits database
User user1 = session.get(User.class, 1L);  // SELECT query

// Second load - hits cache (no SQL)
User user2 = session.get(User.class, 1L);  // No query!

// user1 == user2  (same object reference)

session.close();  // Cache cleared
\`\`\`

**First Level Cache Methods:**
\`\`\`java
session.evict(user);     // Remove specific object from cache
session.clear();         // Clear entire cache
session.flush();         // Sync cache with database
\`\`\`

**Second Level Cache:**
- Disabled by default, must configure
- Associated with SessionFactory
- Scope: All sessions (application-wide)
- Shared across sessions
- Requires third-party provider

**Configuration:**
\`\`\`xml
<!-- hibernate.cfg.xml -->
<property name="hibernate.cache.use_second_level_cache">true</property>
<property name="hibernate.cache.region.factory_class">
    org.hibernate.cache.jcache.JCacheRegionFactory
</property>
<property name="hibernate.cache.provider_class">
    org.ehcache.jsr107.EhcacheCachingProvider
</property>
\`\`\`

**Enable on Entity:**
\`\`\`java
@Entity
@Cacheable
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class User {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
}
\`\`\`

**Cache Concurrency Strategies:**

**1. READ_ONLY:**
- For data that never changes
- Best performance
- Example: Country codes, configuration

**2. NONSTRICT_READ_WRITE:**
- For data that changes rarely
- No guarantee of consistency
- Good for non-critical data

**3. READ_WRITE:**
- For data that changes frequently
- Maintains consistency
- Slight performance overhead

**4. TRANSACTIONAL:**
- Full transactional cache
- Requires JTA transaction manager
- Highest consistency, lowest performance

**Query Cache:**
- Caches query results
- Must enable explicitly

\`\`\`java
// Enable query cache
session.createQuery("FROM User")
    .setCacheable(true)
    .setCacheRegion("userQueries")
    .list();
\`\`\`

**Configuration:**
\`\`\`xml
<property name="hibernate.cache.use_query_cache">true</property>
\`\`\`

**Cache Comparison:**

| Feature | First Level | Second Level | Query Cache |
|---------|-------------|--------------|-------------|
| Scope | Session | SessionFactory | SessionFactory |
| Default | Enabled | Disabled | Disabled |
| Thread-safe | No | Yes | Yes |
| Configuration | None needed | Required | Required |
| Use Case | All queries | Frequently accessed entities | Frequently executed queries |

**Cache Eviction:**
\`\`\`java
// Evict specific entity
sessionFactory.getCache().evict(User.class, 1L);

// Evict all instances of entity
sessionFactory.getCache().evictEntityRegion(User.class);

// Evict all cached data
sessionFactory.getCache().evictAllRegions();
\`\`\`

**Popular Cache Providers:**
- EhCache (most common)
- Infinispan
- Hazelcast
- Redis (via spring-data-redis)

**Best Practices:**
- Use first-level cache for all entities (automatic)
- Use second-level cache only for read-mostly entities
- Don't cache frequently modified entities
- Monitor cache hit/miss ratio
- Set appropriate cache size limits
- Use query cache sparingly (can become stale)`
    }
  ]

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Core Concepts': '#8b5cf6',
      'Session Management': '#3b82f6',
      'Relationships': '#10b981',
      'Fetching Strategies': '#f59e0b',
      'Caching': '#ef4444'
    }
    return colors[category] || '#6b7280'
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f5f3ff', minHeight: '100vh' }}>
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
          ← Back to Questions
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: 0
        }}>
          🔧 Hibernate Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <p style={{
        fontSize: '1.1rem',
        color: '#4b5563',
        textAlign: 'center',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Master Hibernate ORM concepts including Session management, caching, and relationship mappings.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {questions.map((q) => (
          <div
            key={q.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              border: `3px solid ${expandedQuestion === q.id ? getCategoryColor(q.category) : '#e5e7eb'}`,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: expandedQuestion === q.id
                ? '0 8px 16px rgba(0,0,0,0.1)'
                : '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            <button
              onClick={() => toggleQuestion(q.id)}
              style={{
                width: '100%',
                padding: '1.5rem',
                backgroundColor: expandedQuestion === q.id
                  ? `${getCategoryColor(q.category)}15`
                  : 'white',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                if (expandedQuestion !== q.id) {
                  e.currentTarget.style.backgroundColor = '#f9fafb'
                }
              }}
              onMouseLeave={(e) => {
                if (expandedQuestion !== q.id) {
                  e.currentTarget.style.backgroundColor = 'white'
                }
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  backgroundColor: getCategoryColor(q.category),
                  color: 'white',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>
                  {q.category}
                </div>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  margin: 0
                }}>
                  Q{q.id}. {q.question}
                </h3>
              </div>
              <div style={{
                fontSize: '1.5rem',
                color: getCategoryColor(q.category),
                fontWeight: 'bold',
                marginLeft: '1rem',
                transform: expandedQuestion === q.id ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}>
                ▼
              </div>
            </button>

            {expandedQuestion === q.id && (
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#fafafa',
                borderTop: `2px solid ${getCategoryColor(q.category)}40`
              }}>
                <div style={{
                  fontSize: '1rem',
                  lineHeight: '1.8',
                  color: '#374151',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  textAlign: 'left'
                }}>
                  {renderFormattedAnswer(q.answer)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: '#dbeafe',
        borderRadius: '12px',
        border: '2px solid #3b82f6'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e40af', marginBottom: '0.5rem' }}>
          💡 Hibernate Interview Tips
        </h3>
        <ul style={{ color: '#1e3a8a', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Understand the difference between Session and SessionFactory</li>
          <li>Know when to use LAZY vs EAGER fetching</li>
          <li>Be aware of N+1 problem and how to solve it</li>
          <li>Understand caching strategies and their use cases</li>
          <li>Practice with relationship mappings (@OneToMany, @ManyToOne, etc.)</li>
        </ul>
      </div>
    </div>
  )
}

export default HibernateQuestions

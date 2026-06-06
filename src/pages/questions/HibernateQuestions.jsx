import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function HibernateQuestions({ onBack, breadcrumb, problemLimit }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const [activeCategory, setActiveCategory] = useState('All')
  const [activeDifficulty, setActiveDifficulty] = useState('All')
  const renderFormattedAnswer = (text) => {
    const lines = text.split('\n')
    const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']
    let colorIndex = 0
    const result = []
    let inCodeBlock = false
    let codeLines = []
    let codeLanguage = 'java'

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex]

      // Check for code block start/end
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          // Start of code block
          inCodeBlock = true
          codeLanguage = line.trim().substring(3) || 'java'
          codeLines = []
        } else {
          // End of code block
          inCodeBlock = false
          const codeString = codeLines.join('\n')
          result.push(
            <div key={`code-${lineIndex}`} style={{ margin: '1.5rem 0', textAlign: 'left' }}>
              <SyntaxHighlighter
                language={codeLanguage}
                style={vscDarkPlus}
                customStyle={{
                  borderRadius: '0.5rem',
                  fontSize: '0.9rem',
                  padding: '1rem',
                  textAlign: 'left',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  backgroundColor: '#000000'
                }}
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
          )
          codeLines = []
        }
        continue
      }

      if (inCodeBlock) {
        codeLines.push(line)
        continue
      }

      // Empty lines for spacing
      if (line.trim() === '') {
        result.push(<div key={lineIndex} style={{ height: '0.5rem' }}></div>)
        continue
      }

      // Bullet points (lines starting with - or •)
      const bulletMatch = line.match(/^(\s*)[-•]\s+(.+)$/)
      if (bulletMatch) {
        const indentLevel = bulletMatch[1].length
        const bulletContent = bulletMatch[2]
        result.push(
          <div
            key={lineIndex}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginLeft: `${indentLevel * 0.5 + 1}rem`,
              marginTop: '0.5rem',
              textAlign: 'left',
              lineHeight: '1.6'
            }}
          >
            <span style={{
              color: '#3b82f6',
              marginRight: '0.5rem',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              lineHeight: '1.4'
            }}>
              •
            </span>
            <span style={{ flex: 1 }}>{bulletContent}</span>
          </div>
        )
        continue
      }

      // Bold section headers (e.g., **What is RFQ?**)
      const boldMatch = line.match(/^\*\*(.+?):\*\*/)
      if (boldMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        result.push(
          <div
            key={lineIndex}
            style={{
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
              textAlign: 'left',
              paddingBottom: '0.25rem',
              borderBottom: `2px solid ${color}33`
            }}
          >
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.1rem',
              letterSpacing: '0.02em'
            }}>
              {boldMatch[1]}:
            </span>
            {line.substring(boldMatch[0].length)}
          </div>
        )
        continue
      }

      // Numbered section headers (e.g., **1. Client Initiates:**)
      const numberedMatch = line.match(/^\*\*(\d+\.\s+.+?):\*\*/)
      if (numberedMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        result.push(
          <div
            key={lineIndex}
            style={{
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
              textAlign: 'left',
              paddingBottom: '0.25rem',
              borderBottom: `2px solid ${color}33`
            }}
          >
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.1rem',
              letterSpacing: '0.02em'
            }}>
              {numberedMatch[1]}:
            </span>
            {line.substring(numberedMatch[0].length)}
          </div>
        )
        continue
      }

      // Regular text with subtle left padding
      result.push(
        <div
          key={lineIndex}
          style={{
            textAlign: 'left',
            marginTop: '0.25rem',
            paddingLeft: '0.5rem',
            lineHeight: '1.6',
            color: '#e5e7eb'
          }}
        >
          {line}
        </div>
      )
    }

    return result
  }

  const questions = [
    {
      id: 1,
      category: 'Core Concepts',
      difficulty: 'Easy',
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
      difficulty: 'Medium',
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
      difficulty: 'Medium',
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
      difficulty: 'Hard',
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
      difficulty: 'Medium',
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
    },
    {
      id: 6,
      category: 'Core Concepts',
      difficulty: 'Easy',
      question: 'What is ORM?',
      answer: `**ORM = Object-Relational Mapping**

A technique to map Java objects (classes) to database tables and back, so you can work with persistent data as plain Java objects instead of SQL strings and \`ResultSet\` rows.

**Without ORM (JDBC):**
\`\`\`java
ResultSet rs = ps.executeQuery();
while (rs.next()) {
    User u = new User();
    u.setId(rs.getLong("id"));
    u.setName(rs.getString("name"));
    // manual mapping every field...
}
\`\`\`

**With ORM (Hibernate):**
\`\`\`java
User u = session.get(User.class, 1L);   // one line
\`\`\`

**What ORM does for you:**
- Maps a class → table (\`@Entity\`, \`@Table\`)
- Maps a field → column (\`@Column\`)
- Maps a primary key → \`@Id\`
- Maps relationships (\`@OneToMany\`, \`@ManyToOne\`, \`@ManyToMany\`)
- Generates SQL automatically (INSERT/UPDATE/DELETE/SELECT)
- Manages object identity, caching, dirty checking, lazy loading
- Handles transactions and connection pooling

**Popular Java ORMs:**
- **Hibernate** — most popular, JPA implementation
- **EclipseLink** — reference JPA implementation
- **MyBatis** — semi-ORM (you still write SQL, it maps results)
- **Spring Data JPA** — abstraction on top of JPA/Hibernate

**Pros:**
- Eliminates boilerplate JDBC code
- Database independence (swap MySQL → PostgreSQL with config change)
- Object-oriented querying (HQL, Criteria API)
- Built-in caching

**Cons:**
- Learning curve
- Hidden performance cost (N+1, over-fetching) if used carelessly
- Complex queries sometimes need native SQL anyway`
    },
    {
      id: 7,
      category: 'Core Concepts',
      difficulty: 'Medium',
      question: 'What are the core interfaces in Hibernate?',
      answer: `Hibernate exposes a small set of core interfaces that you use to interact with the persistence layer:

**1. Configuration**
- Reads \`hibernate.cfg.xml\` / \`hibernate.properties\` and entity mappings
- Used once at startup to build the \`SessionFactory\`

\`\`\`java
Configuration cfg = new Configuration()
    .configure("hibernate.cfg.xml")
    .addAnnotatedClass(User.class);
\`\`\`

**2. SessionFactory**
- Heavyweight, **thread-safe**, immutable
- Created **once per database** at application startup
- Holds compiled metadata and the second-level cache
- Factory for \`Session\` objects

\`\`\`java
SessionFactory factory = cfg.buildSessionFactory();
\`\`\`

**3. Session**
- Lightweight, **NOT thread-safe** — one per request / unit of work
- Wraps a JDBC connection
- Holds the first-level cache
- Main interface for CRUD: \`save\`, \`get\`, \`load\`, \`update\`, \`delete\`, \`merge\`

\`\`\`java
Session session = factory.openSession();
\`\`\`

**4. Transaction**
- Single-threaded, short-lived
- Wraps the underlying JDBC/JTA transaction
- \`begin()\`, \`commit()\`, \`rollback()\`

\`\`\`java
Transaction tx = session.beginTransaction();
session.save(user);
tx.commit();
\`\`\`

**5. Query / TypedQuery**
- For HQL and JPQL queries with parameter binding

\`\`\`java
Query<User> q = session.createQuery("FROM User WHERE active = :a", User.class);
q.setParameter("a", true);
List<User> users = q.getResultList();
\`\`\`

**6. Criteria (JPA CriteriaBuilder)**
- Programmatic, type-safe query construction (no string concatenation)

\`\`\`java
CriteriaBuilder cb = session.getCriteriaBuilder();
CriteriaQuery<User> cq = cb.createQuery(User.class);
Root<User> root = cq.from(User.class);
cq.select(root).where(cb.equal(root.get("active"), true));
\`\`\`

**Summary table:**

| Interface | Lifetime | Thread-safe | Purpose |
|-----------|----------|-------------|---------|
| Configuration | Startup | N/A | Bootstrap |
| SessionFactory | Application | YES | Factory + L2 cache |
| Session | Per request | NO | CRUD + L1 cache |
| Transaction | Per unit-of-work | NO | Commit/rollback |
| Query | Per query | NO | HQL/JPQL execution |
| Criteria | Per query | NO | Programmatic queries |`
    },
    {
      id: 8,
      category: 'Core Concepts',
      difficulty: 'Medium',
      question: 'What is a Transaction in Hibernate? Which is thread-safe — Session or SessionFactory?',
      answer: `**Transaction = a unit of work that is either fully applied or fully rolled back (ACID).**

In Hibernate, every database operation must run inside a transaction — otherwise changes are not flushed/committed to the DB.

**Basic Pattern:**
\`\`\`java
Session session = factory.openSession();
Transaction tx = null;
try {
    tx = session.beginTransaction();

    User u = new User("Alice");
    session.save(u);

    tx.commit();          // flush + commit
} catch (Exception e) {
    if (tx != null) tx.rollback();
    throw e;
} finally {
    session.close();
}
\`\`\`

**ACID guarantees:**
- **Atomicity** — all or nothing
- **Consistency** — DB constraints upheld
- **Isolation** — concurrent transactions don't see each other's uncommitted state
- **Durability** — committed data survives crashes

**Transaction Isolation Levels** (set via JDBC / config):
- READ_UNCOMMITTED
- READ_COMMITTED (default for most DBs)
- REPEATABLE_READ
- SERIALIZABLE

---

**Thread Safety — Session vs SessionFactory:**

| Object | Thread-safe? | Why |
|--------|--------------|-----|
| **SessionFactory** | YES | Immutable after build; safe to share across threads |
| **Session** | NO | Holds first-level cache, JDBC connection, mutable state |

**Rule of thumb:**
- One \`SessionFactory\` **per database, per application** (singleton)
- One \`Session\` **per thread / per request / per unit of work** — never share

**Why Session isn't thread-safe:**
- Internal first-level cache is a plain HashMap
- Holds a single JDBC connection
- Dirty-checking state is per-object — concurrent modification = data corruption

**With Spring (\`@Transactional\`):**
\`\`\`java
@Service
public class UserService {
    @Transactional
    public void createUser(User u) {
        userRepo.save(u);     // Spring opens a Session, starts tx,
                              // commits or rolls back automatically
    }
}
\`\`\``
    },
    {
      id: 9,
      category: 'Core Concepts',
      difficulty: 'Easy',
      question: 'What is JPA and how is it different from Hibernate?',
      answer: `**JPA (Jakarta / Java Persistence API)** is a **specification** — a set of interfaces and annotations that define how Java objects should be persisted.

**Hibernate** is an **implementation** of that specification (plus its own extra features).

\`\`\`
JPA = the contract (interfaces)
Hibernate = one vendor's implementation of the contract
\`\`\`

**Other JPA implementations:**
- EclipseLink (reference implementation)
- OpenJPA
- DataNucleus

**Code looks almost identical — the difference is which API you import:**

\`\`\`java
// JPA-only (portable)
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;

EntityManager em = emf.createEntityManager();
em.persist(user);
em.find(User.class, 1L);
em.createQuery("FROM User").getResultList();
\`\`\`

\`\`\`java
// Hibernate-native (vendor-specific)
import org.hibernate.Session;
import org.hibernate.SessionFactory;

Session session = factory.openSession();
session.save(user);
session.get(User.class, 1L);
session.createQuery("FROM User").list();
\`\`\`

**Mapping JPA ↔ Hibernate:**

| JPA | Hibernate |
|-----|-----------|
| EntityManagerFactory | SessionFactory |
| EntityManager | Session |
| EntityTransaction | Transaction |
| \`em.persist()\` | \`session.save()\` |
| \`em.find()\` | \`session.get()\` |
| \`em.merge()\` | \`session.merge()\` |
| \`em.remove()\` | \`session.delete()\` |
| JPQL | HQL (superset of JPQL) |

**Differences in detail:**

| Aspect | JPA | Hibernate |
|--------|-----|-----------|
| Type | Specification | Implementation |
| Package | \`jakarta.persistence\` | \`org.hibernate\` |
| Query language | JPQL | HQL (superset) |
| Portable? | Yes (any JPA impl) | No (vendor lock-in) |
| Extra features | None — just the spec | Caching tiers, batch fetching, filters, envers, etc. |

**Best practice:**
- **Use JPA APIs when possible** for portability
- Drop down to Hibernate-specific features (e.g. \`@Filter\`, \`@BatchSize\`, \`Envers\`) only when needed`
    },
    {
      id: 10,
      category: 'Fetching Strategies',
      difficulty: 'Medium',
      question: 'Explain Lazy Loading vs Eager Loading in Hibernate',
      answer: `**Fetching strategy controls when related entities are loaded from the DB.**

**Lazy Loading (\`FetchType.LAZY\`)**
- Related data loaded **on first access**, not when the parent is loaded
- Returns a **proxy** (uninitialized stand-in)
- Saves memory & query time when the relation isn't always needed
- **Default for \`@OneToMany\` and \`@ManyToMany\`**

\`\`\`java
@Entity
class Department {
    @OneToMany(mappedBy = "dept", fetch = FetchType.LAZY)
    private List<Employee> employees;
}

Department d = session.get(Department.class, 1L);
// SQL: SELECT * FROM departments WHERE id = 1;
// employees NOT loaded yet

d.getEmployees().size();
// SQL: SELECT * FROM employees WHERE dept_id = 1;   (lazy fired here)
\`\`\`

**Eager Loading (\`FetchType.EAGER\`)**
- Related data loaded **immediately** with the parent (usually via JOIN)
- **Default for \`@ManyToOne\` and \`@OneToOne\`**

\`\`\`java
@Entity
class Employee {
    @ManyToOne(fetch = FetchType.EAGER)
    private Department dept;
}

Employee e = session.get(Employee.class, 1L);
// SQL: SELECT e.*, d.* FROM employees e
//      LEFT JOIN departments d ON e.dept_id = d.id WHERE e.id = 1;
\`\`\`

**Comparison:**

| Aspect | LAZY | EAGER |
|--------|------|-------|
| When loaded | On access | With parent |
| Initial query | Small (parent only) | Larger (JOIN) |
| Memory | Lower | Higher |
| Risk | \`LazyInitializationException\` after session closed | Loading unnecessary data + N+1 |
| Defaults | \`@OneToMany\`, \`@ManyToMany\` | \`@ManyToOne\`, \`@OneToOne\` |

**Common LAZY pitfall — LazyInitializationException:**
\`\`\`java
Department d;
try (Session s = factory.openSession()) {
    d = s.get(Department.class, 1L);
}
d.getEmployees().size();   // BOOM — session is closed
\`\`\`

**Fixes for LazyInitializationException:**

1. **JOIN FETCH** (preferred for known-needed relations):
   \`\`\`java
   SELECT d FROM Department d LEFT JOIN FETCH d.employees WHERE d.id = :id
   \`\`\`

2. **@EntityGraph**:
   \`\`\`java
   @EntityGraph(attributePaths = "employees")
   Optional<Department> findById(Long id);
   \`\`\`

3. **Open Session in View** (anti-pattern in REST APIs — keeps session open during rendering)

**Best practices:**
- **Default everything to LAZY**, eager-fetch only what you actually need via JOIN FETCH or EntityGraph
- Eager \`@ManyToOne\`/\`@OneToOne\` defaults are often wrong — override to LAZY for big graphs
- Watch out for N+1 when iterating LAZY collections`
    },
    {
      id: 11,
      category: 'Core Concepts',
      difficulty: 'Easy',
      question: 'Difference between HQL and SQL?',
      answer: `**SQL** operates on **tables and columns**.
**HQL (Hibernate Query Language)** operates on **entity classes and fields**.

\`\`\`sql
-- SQL — works on the table
SELECT id, first_name FROM users WHERE active = 1;
\`\`\`

\`\`\`java
// HQL — works on the entity class
session.createQuery("FROM User u WHERE u.active = true", User.class).getResultList();
\`\`\`

Hibernate **translates HQL to native SQL** at runtime, using the configured dialect (MySQL, PostgreSQL, Oracle, ...).

**Key differences:**

| Aspect | SQL | HQL |
|--------|-----|-----|
| Operates on | Tables, columns | Entities, fields |
| Case sensitivity | Mostly insensitive | Class/field names ARE case-sensitive |
| DB portable | NO (dialect-specific) | YES (same HQL across DBs) |
| Returns | Rows (\`ResultSet\`) | Java objects |
| Joins | Foreign keys | Object associations |

**Joins look different:**

\`\`\`sql
-- SQL
SELECT * FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE c.country = 'US';
\`\`\`

\`\`\`java
// HQL — joins via the object reference
"SELECT o FROM Order o JOIN o.customer c WHERE c.country = 'US'"
\`\`\`

**Parameter binding (both safe from SQL injection):**

\`\`\`java
// Named parameter
session.createQuery("FROM User u WHERE u.email = :email")
       .setParameter("email", input)
       .getResultList();

// Positional
session.createQuery("FROM User u WHERE u.email = ?1")
       .setParameter(1, input)
       .getResultList();
\`\`\`

**HQL also supports:**
- \`UPDATE\` / \`DELETE\` bulk operations
- \`JOIN FETCH\` (eager-load associations inline)
- Polymorphic queries: \`FROM Animal\` returns all subclasses

**Native SQL (when HQL isn't enough):**
\`\`\`java
session.createNativeQuery("SELECT * FROM users WHERE ...", User.class).getResultList();
\`\`\`

**JPQL vs HQL:**
- JPQL is the JPA standard query language
- HQL is Hibernate's superset of JPQL (more features, vendor-specific)`
    },
    {
      id: 12,
      category: 'Core Concepts',
      difficulty: 'Medium',
      question: 'What is the Criteria API?',
      answer: `**Criteria API = programmatic, type-safe query building.**

Instead of writing a query as a string, you build it from Java objects — caught by the compiler instead of failing at runtime.

\`\`\`java
// String-based HQL — typo isn't caught until runtime
session.createQuery("FROM Usr WHERE actiev = true");   // crashes at runtime
\`\`\`

\`\`\`java
// Criteria — caught at compile time
CriteriaBuilder cb = session.getCriteriaBuilder();
CriteriaQuery<User> cq = cb.createQuery(User.class);
Root<User> root = cq.from(User.class);
cq.select(root).where(cb.equal(root.get("active"), true));
List<User> users = session.createQuery(cq).getResultList();
\`\`\`

**Building blocks:**
- \`CriteriaBuilder cb\` — factory for predicates, expressions, joins
- \`CriteriaQuery<T> cq\` — the query
- \`Root<T> root\` — the FROM entity
- \`Predicate\` — WHERE conditions
- \`Order\` — ORDER BY

**Common operations:**

\`\`\`java
// WHERE name LIKE 'A%' AND age > 18
Predicate p1 = cb.like(root.get("name"), "A%");
Predicate p2 = cb.greaterThan(root.get("age"), 18);
cq.where(cb.and(p1, p2));

// ORDER BY createdAt DESC
cq.orderBy(cb.desc(root.get("createdAt")));

// JOIN
Join<Order, Customer> customer = root.join("customer");
cq.where(cb.equal(customer.get("country"), "US"));

// Projection (DTO)
cq.select(cb.construct(UserDTO.class, root.get("id"), root.get("name")));
\`\`\`

**Dynamic queries — the killer use case:**

\`\`\`java
List<Predicate> predicates = new ArrayList<>();
if (name != null) predicates.add(cb.like(root.get("name"), name + "%"));
if (minAge != null) predicates.add(cb.ge(root.get("age"), minAge));
if (active != null) predicates.add(cb.equal(root.get("active"), active));

cq.where(predicates.toArray(new Predicate[0]));
\`\`\`

Building this with HQL string concatenation is error-prone (extra ANDs, missing spaces). Criteria handles it cleanly.

**Criteria vs HQL:**

| Aspect | HQL | Criteria |
|--------|-----|----------|
| Style | String | Builder pattern |
| Type-safe | No | Yes |
| Readable for simple queries | Yes | More verbose |
| Dynamic queries | Painful | Natural |
| Refactor-friendly | No (string break) | Yes |

**Type-safe with JPA Metamodel:**
\`\`\`java
// Generated metamodel (User_) — no string field names
cq.where(cb.equal(root.get(User_.email), "a@b.com"));
\`\`\`

**Best practices:**
- Static queries → HQL or named queries (more readable)
- Dynamic queries with optional filters → Criteria API
- Most modern Spring apps use **Specifications** (Spring Data wrapper around Criteria) or **Querydsl** instead`
    },
    {
      id: 13,
      category: 'Mapping Annotations',
      difficulty: 'Easy',
      question: 'Explain @Entity, @Table, @Id, @GeneratedValue, and @Column annotations',
      answer: `These five annotations declare how a Java class maps to a database table.

\`\`\`java
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "first_name")
    private String firstName;
}
\`\`\`

**@Entity**
- Marks the class as a JPA entity (mapped to a table)
- Required for Hibernate to manage the class
- Class must have a no-arg constructor

**@Table(name = "...")**
- Specifies the table name
- **Optional** — if omitted, the table name defaults to the class name
- Also supports \`schema\`, \`catalog\`, \`uniqueConstraints\`, \`indexes\`

\`\`\`java
@Table(
    name = "users",
    schema = "public",
    uniqueConstraints = @UniqueConstraint(columnNames = {"email"}),
    indexes = @Index(name = "idx_email", columnList = "email")
)
\`\`\`

**@Id**
- Marks the primary key field — every entity **must** have one
- Can be on any type: Long, UUID, String, composite (\`@EmbeddedId\` / \`@IdClass\`)

**@GeneratedValue**
- Tells Hibernate how to generate the PK value
- Strategies:
  - \`IDENTITY\` — DB auto-increment (MySQL, PostgreSQL SERIAL)
  - \`SEQUENCE\` — DB sequence (PostgreSQL, Oracle)
  - \`TABLE\` — separate table holds counter (portable but slow)
  - \`AUTO\` — Hibernate picks based on dialect
  - \`UUID\` — random UUID (JPA 3.1+)

\`\`\`java
@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
@SequenceGenerator(name = "user_seq", sequenceName = "user_id_seq", allocationSize = 50)
private Long id;
\`\`\`

**@Column**
- Customizes the column mapping
- **Optional** — defaults to field name in snake_case

| Attribute | Purpose |
|-----------|---------|
| \`name\` | Column name |
| \`nullable\` | NOT NULL constraint |
| \`unique\` | UNIQUE constraint |
| \`length\` | VARCHAR length (default 255) |
| \`precision\`, \`scale\` | For \`BigDecimal\` |
| \`columnDefinition\` | Raw DDL override |
| \`insertable\`, \`updatable\` | Exclude from INSERT/UPDATE |

---

**"What if two fields map to the same column?"**

\`\`\`java
@Column(name = "email")
private String email;

@Column(name = "email")  // BAD — same column!
private String backupEmail;
\`\`\`

Hibernate will **throw an exception at startup**:
\`\`\`
org.hibernate.MappingException: Repeated column in mapping for entity: User column: email
\`\`\`

The fix is either:
- Map each field to a distinct column, or
- Mark one as read-only:

\`\`\`java
@Column(name = "email")
private String email;

@Column(name = "email", insertable = false, updatable = false)
private String backupEmail;     // read-only view of the same column
\`\`\`

**Best practices:**
- Always specify \`@Table(name = ...)\` and \`@Column(name = ...)\` explicitly — don't rely on naming conventions
- Use \`IDENTITY\` for MySQL, \`SEQUENCE\` for PostgreSQL/Oracle
- For \`SEQUENCE\`, set \`allocationSize\` > 1 to batch ID generation`
    },
    {
      id: 14,
      category: 'Core Concepts',
      difficulty: 'Easy',
      question: 'What is SQL injection and how does Hibernate prevent it?',
      answer: `**SQL injection** is when user input is concatenated into a SQL string, letting an attacker inject arbitrary SQL.

**Vulnerable JDBC code:**
\`\`\`java
String email = request.getParameter("email");
String sql = "SELECT * FROM users WHERE email = '" + email + "'";
statement.executeQuery(sql);
\`\`\`

**Attacker submits:**
\`\`\`
email = ' OR '1'='1
\`\`\`

**Resulting SQL:**
\`\`\`sql
SELECT * FROM users WHERE email = '' OR '1'='1';   -- returns ALL users
\`\`\`

Or worse: \`'; DROP TABLE users; --\`

---

**How Hibernate prevents it:**

**1. Parameter binding (the main defense)**

Hibernate uses **\`PreparedStatement\` with bind variables** under the hood. Values are sent **separately** from the SQL text — the DB never parses user input as SQL.

\`\`\`java
// SAFE — Hibernate binds 'email' as a parameter
session.createQuery("FROM User u WHERE u.email = :email", User.class)
       .setParameter("email", userInput)
       .getResultList();
\`\`\`

The generated SQL:
\`\`\`sql
SELECT * FROM users WHERE email = ?    -- ? is bound separately
\`\`\`

Whatever the user typed, it's treated as a single string value — never as SQL.

**2. Same protection in JPA / Spring Data:**

\`\`\`java
// Spring Data — derived query
User findByEmail(String email);

// @Query with named parameter
@Query("SELECT u FROM User u WHERE u.email = :email")
User findByEmail(@Param("email") String email);

// EntityManager
em.createQuery("FROM User u WHERE u.email = :email")
  .setParameter("email", email);
\`\`\`

All of these use bind parameters.

**3. Same protection even for native SQL:**

\`\`\`java
em.createNativeQuery("SELECT * FROM users WHERE email = :email")
  .setParameter("email", email)
  .getResultList();
\`\`\`

---

**Where you can STILL be vulnerable in Hibernate:**

**String concatenation in HQL:** (don't do this)
\`\`\`java
// VULNERABLE — same problem as raw JDBC
session.createQuery("FROM User WHERE email = '" + userInput + "'");
\`\`\`

**Native queries with concatenation:**
\`\`\`java
em.createNativeQuery("SELECT * FROM users WHERE email = '" + userInput + "'");
\`\`\`

**Dynamic table/column names:** Bind parameters can't substitute identifiers, only values. If you must inject a column name dynamically, **whitelist** it against a known set.

\`\`\`java
Set<String> allowedSortColumns = Set.of("name", "createdAt", "email");
if (!allowedSortColumns.contains(sortField)) throw new BadRequest();
session.createQuery("FROM User ORDER BY " + sortField);
\`\`\`

**Best practices:**
- **Always** use \`setParameter\` / named bindings — never concatenate user input into HQL or SQL
- Treat native queries with the same caution as raw JDBC
- Whitelist any value that must go into the SQL text itself (table names, column names, sort direction)`
    },
    {
      id: 15,
      category: 'Performance',
      difficulty: 'Medium',
      question: 'What is Batch Processing in Hibernate?',
      answer: `**Batch processing** groups many INSERT/UPDATE/DELETE statements into a single round-trip to the database, instead of one round-trip per row.

**Without batching:**
\`\`\`java
for (int i = 0; i < 1000; i++) {
    session.save(new User("user" + i));
}
tx.commit();
// 1000 separate INSERT round-trips
\`\`\`

**With batching enabled, this becomes ~20 batches of 50** — much faster.

---

**Configuration:**

\`\`\`properties
# application.properties (Spring Boot)
spring.jpa.properties.hibernate.jdbc.batch_size=50
spring.jpa.properties.hibernate.order_inserts=true
spring.jpa.properties.hibernate.order_updates=true
spring.jpa.properties.hibernate.jdbc.batch_versioned_data=true
\`\`\`

\`\`\`xml
<!-- hibernate.cfg.xml -->
<property name="hibernate.jdbc.batch_size">50</property>
<property name="hibernate.order_inserts">true</property>
<property name="hibernate.order_updates">true</property>
\`\`\`

**Why \`order_inserts/updates\`?**
Hibernate groups statements by table — without ordering, a mix of \`INSERT User\` and \`INSERT Order\` would force the batch to flush every time the table changes.

---

**Proper batch insert pattern — flush and clear periodically:**

\`\`\`java
@Transactional
public void bulkInsert(List<User> users) {
    int batchSize = 50;
    for (int i = 0; i < users.size(); i++) {
        em.persist(users.get(i));

        if (i % batchSize == 0 && i > 0) {
            em.flush();   // send batch to DB
            em.clear();   // detach managed entities (free memory + L1 cache)
        }
    }
}
\`\`\`

**Without \`flush() + clear()\`:**
- Hibernate keeps every entity in the first-level cache
- Memory grows unbounded → OutOfMemoryError
- Dirty checking gets slower with each entity

---

**Important caveat — \`GenerationType.IDENTITY\` defeats batching:**

\`\`\`java
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
\`\`\`

\`IDENTITY\` requires Hibernate to execute each INSERT immediately to get the generated ID back. **Batching is silently disabled.**

**Fix:** use \`SEQUENCE\` (PostgreSQL/Oracle) with \`allocationSize\`:

\`\`\`java
@Id
@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
@SequenceGenerator(name = "user_seq", sequenceName = "user_seq", allocationSize = 50)
private Long id;
\`\`\`

---

**StatelessSession — even faster for pure bulk loads:**

\`\`\`java
StatelessSession ss = sessionFactory.openStatelessSession();
Transaction tx = ss.beginTransaction();
for (User u : users) {
    ss.insert(u);
}
tx.commit();
ss.close();
\`\`\`

\`StatelessSession\`:
- No first-level cache
- No dirty checking
- No cascades
- No events
- Pure JDBC-level performance

Use when inserting millions of rows where you don't need any ORM features.

**Best practices:**
- Set \`batch_size\` to 20–100
- Use \`SEQUENCE\`, not \`IDENTITY\`, for batched inserts
- Always \`flush() + clear()\` periodically to avoid OOM
- Enable \`order_inserts\` and \`order_updates\`
- For pure bulk loads, prefer \`StatelessSession\` or native batch INSERT`
    }
  ]

  // Filter questions based on problemLimit (for Top 100/300 mode)
  const limitedQuestions = problemLimit ? questions.slice(0, problemLimit) : questions

  const questionsForCategoryCount = limitedQuestions.filter(q =>
    activeDifficulty === 'All' || q.difficulty === activeDifficulty
  )
  const categoryCounts = questionsForCategoryCount.reduce((acc, q) => {
    acc[q.category] = (acc[q.category] || 0) + 1
    return acc
  }, {})
  const availableCategories = ['All', ...Object.keys(categoryCounts).sort((a, b) => {
    const diff = categoryCounts[b] - categoryCounts[a]
    return diff !== 0 ? diff : a.localeCompare(b)
  })]

  const difficultyOrder = ['Easy', 'Medium', 'Hard']
  const difficultyCounts = limitedQuestions.reduce((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] || 0) + 1
    return acc
  }, {})
  const availableDifficulties = ['All', ...difficultyOrder.filter(d => difficultyCounts[d])]

  const displayQuestions = limitedQuestions.filter(q =>
    (activeCategory === 'All' || q.category === activeCategory) &&
    (activeDifficulty === 'All' || q.difficulty === activeDifficulty)
  )
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
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
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
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
        >
          ← Back to Questions
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#93c5fd',
          margin: 0
        }}>
          Hibernate Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

      <CollapsibleSidebar
        items={displayQuestions}
        selectedIndex={expandedQuestion ? displayQuestions.findIndex(q => q.id === expandedQuestion) : -1}
        onSelect={(index) => toggleQuestion(displayQuestions[index].id)}
        title="Questions"
        getItemLabel={(item) => `${item.id}. ${item.category}`}
        getItemIcon={() => '❓'}
        primaryColor="#3b82f6"
      />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'left',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Master Hibernate ORM concepts including Session management, caching, and relationship mappings.
      </p>


      {/* Difficulty Filter Tabs */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '0.75rem',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: '600', marginRight: '0.25rem' }}>Difficulty:</span>
        {availableDifficulties.map((diff) => {
          const isActive = activeDifficulty === diff
          const count = diff === 'All' ? limitedQuestions.length : (difficultyCounts[diff] || 0)
          const color = diff === 'Easy' ? '#22c55e' : diff === 'Medium' ? '#f59e0b' : diff === 'Hard' ? '#ef4444' : '#3b82f6'
          return (
            <button
              key={diff}
              onClick={() => setActiveDifficulty(diff)}
              style={{
                padding: '0.4rem 0.8rem',
                fontSize: '0.8rem',
                fontWeight: isActive ? '700' : '500',
                background: isActive ? `${color}25` : 'rgba(31, 41, 55, 0.6)',
                color: isActive ? color : '#9ca3af',
                border: `1px solid ${isActive ? color : '#374151'}`,
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = `${color}15`
                  e.currentTarget.style.color = color
                  e.currentTarget.style.borderColor = `${color}80`
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(31, 41, 55, 0.6)'
                  e.currentTarget.style.color = '#9ca3af'
                  e.currentTarget.style.borderColor = '#374151'
                }
              }}
            >
              <span>{diff}</span>
              <span style={{
                fontSize: '0.7rem',
                padding: '0.1rem 0.4rem',
                borderRadius: '999px',
                background: isActive ? color : '#374151',
                color: isActive ? '#fff' : '#9ca3af',
                fontWeight: '700',
                minWidth: '1.5rem',
                textAlign: 'center'
              }}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Category Filter Tabs */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #374151'
      }}>
        {availableCategories.map((cat) => {
          const isActive = activeCategory === cat
          const count = cat === 'All' ? questionsForCategoryCount.length : (categoryCounts[cat] || 0)
          const color = cat === 'All' ? '#3b82f6' : getCategoryColor(cat)
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.5rem 0.9rem',
                fontSize: '0.85rem',
                fontWeight: isActive ? '700' : '500',
                background: isActive ? `${color}25` : 'rgba(31, 41, 55, 0.6)',
                color: isActive ? color : '#9ca3af',
                border: `1px solid ${isActive ? color : '#374151'}`,
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = `${color}15`
                  e.currentTarget.style.color = color
                  e.currentTarget.style.borderColor = `${color}80`
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(31, 41, 55, 0.6)'
                  e.currentTarget.style.color = '#9ca3af'
                  e.currentTarget.style.borderColor = '#374151'
                }
              }}
            >
              <span>{cat}</span>
              <span style={{
                fontSize: '0.7rem',
                padding: '0.1rem 0.45rem',
                borderRadius: '999px',
                background: isActive ? color : '#374151',
                color: isActive ? '#fff' : '#9ca3af',
                fontWeight: '700',
                minWidth: '1.5rem',
                textAlign: 'center'
              }}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {displayQuestions.map((q) => (
          <div
            key={q.id}
            style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              borderRadius: '12px',
              border: `3px solid ${expandedQuestion === q.id ? getCategoryColor(q.category) : '#374151'}`,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: expandedQuestion === q.id
                ? '0 8px 16px rgba(0,0,0,0.3)'
                : '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <button
              onClick={() => toggleQuestion(q.id)}
              style={{
                width: '100%',
                padding: '1.5rem',
                backgroundColor: expandedQuestion === q.id
                  ? `${getCategoryColor(q.category)}15`
                  : 'transparent',
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
                  e.currentTarget.style.backgroundColor = '#374151'
                }
              }}
              onMouseLeave={(e) => {
                if (expandedQuestion !== q.id) {
                  e.currentTarget.style.backgroundColor = 'transparent'
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
                  color: '#e2e8f0',
                  margin: 0
                }}>
                  Q{q.id}. {q.question}
                </h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div onClick={(e) => e.stopPropagation()} style={{ transform: 'scale(0.85)' }}>
                  <CompletionCheckbox problemId={`HibernateQuestions-${q.id}`} />
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  color: getCategoryColor(q.category),
                  fontWeight: 'bold',
                  transform: expandedQuestion === q.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  ▼
                </div>
              </div>
            </button>

            {expandedQuestion === q.id && (
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#1e293b',
                borderTop: `2px solid ${getCategoryColor(q.category)}40`
              }}>
                <div style={{
                  fontSize: '1rem',
                  lineHeight: '1.8',
                  color: '#d1d5db',
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
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderRadius: '12px',
        border: '2px solid #6366f1'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#a5b4fc', marginBottom: '0.5rem' }}>
          💡 Hibernate Interview Tips
        </h3>
        <ul style={{ color: '#d1d5db', lineHeight: '1.8', margin: '0.5rem 0' }}>
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

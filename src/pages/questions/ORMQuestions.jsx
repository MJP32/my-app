import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function ORMQuestions({ onBack, breadcrumb, problemLimit }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

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
      category: 'Fundamentals',
      question: 'What is ORM and what are its advantages and disadvantages?',
      answer: `**What is ORM?**
- Object-Relational Mapping
- Technique to convert data between object-oriented code and relational databases
- Maps database tables to classes, rows to objects, columns to properties
- Bridges the "impedance mismatch" between OOP and relational data

**How ORM Works:**
\`\`\`
Database Table → Java Class
Table Row      → Object Instance
Column         → Object Property
Foreign Key    → Object Reference
\`\`\`

**Popular ORMs:**
- Java: Hibernate, JPA, MyBatis
- Python: SQLAlchemy, Django ORM
- Node.js: Sequelize, TypeORM, Prisma
- .NET: Entity Framework, Dapper

**Advantages:**

**1. Productivity:**
- Write less boilerplate code
- No manual SQL for CRUD operations
- Focus on business logic, not data access

**2. Maintainability:**
- Database schema changes require fewer code changes
- Type-safe queries (compile-time checking)
- Centralized mapping configuration

**3. Portability:**
- Database-agnostic code
- Switch databases with configuration change
- Same code works with MySQL, PostgreSQL, Oracle

**4. Features:**
- Caching (first-level, second-level)
- Lazy loading
- Dirty checking
- Transaction management

**Disadvantages:**

**1. Performance:**
- Generated SQL may not be optimal
- N+1 query problem
- Memory overhead for object mapping

**2. Learning Curve:**
- Complex configuration
- Understanding lazy loading behavior
- Debugging generated SQL

**3. Limited Control:**
- Complex queries harder to express
- May need native SQL for optimization
- ORM-specific quirks

**4. Abstraction Leakage:**
- Need to understand SQL anyway
- Debugging requires SQL knowledge
- Performance tuning needs database expertise

**When to Use ORM:**
- CRUD-heavy applications
- Rapid development needed
- Standard database operations
- Team familiarity with ORM

**When to Avoid:**
- Performance-critical queries
- Complex reporting/analytics
- Stored procedure heavy systems
- Simple applications (overkill)`
    },
    {
      id: 2,
      category: 'JPA',
      question: 'What is JPA and how does it relate to Hibernate?',
      answer: `**What is JPA?**
- Java Persistence API
- Specification (standard) for ORM in Java
- Defines annotations and interfaces
- Does NOT provide implementation

**What is Hibernate?**
- JPA implementation (provider)
- Most popular JPA implementation
- Has additional features beyond JPA spec
- Can be used with or without JPA

**Relationship:**
\`\`\`
JPA = Specification (Interface)
Hibernate = Implementation (Class)

Similar to:
JDBC = Specification
MySQL Driver = Implementation
\`\`\`

**Other JPA Implementations:**
- EclipseLink (Reference Implementation)
- OpenJPA
- TopLink

**JPA Annotations:**
\`\`\`java
@Entity                 // Marks class as entity
@Table(name = "users")  // Maps to table
@Id                     // Primary key
@GeneratedValue         // Auto-generate ID
@Column                 // Map to column
@OneToMany             // One-to-many relationship
@ManyToOne             // Many-to-one relationship
@JoinColumn            // Foreign key column
@Transient             // Not persisted
\`\`\`

**Basic Entity Example:**
\`\`\`java
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_name", nullable = false, length = 100)
    private String username;

    @Column(unique = true)
    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders;

    // Getters and setters
}
\`\`\`

**EntityManager (JPA):**
\`\`\`java
@PersistenceContext
private EntityManager em;

// Create
em.persist(user);

// Read
User user = em.find(User.class, 1L);

// Update (automatic dirty checking)
user.setName("New Name");

// Delete
em.remove(user);

// Query
List<User> users = em.createQuery(
    "SELECT u FROM User u WHERE u.age > :age", User.class)
    .setParameter("age", 18)
    .getResultList();
\`\`\`

**Session (Hibernate-specific):**
\`\`\`java
Session session = sessionFactory.openSession();

// Similar operations but Hibernate API
session.save(user);
session.get(User.class, 1L);
session.update(user);
session.delete(user);

// Hibernate Criteria (deprecated, use JPA Criteria)
session.createCriteria(User.class)
    .add(Restrictions.gt("age", 18))
    .list();
\`\`\`

**JPA vs Hibernate API:**

| JPA | Hibernate |
|-----|-----------|
| EntityManager | Session |
| EntityManagerFactory | SessionFactory |
| persist() | save() |
| merge() | update() |
| remove() | delete() |
| JPQL | HQL |

**Best Practice:**
- Use JPA annotations and EntityManager
- Keeps code portable
- Use Hibernate-specific features only when needed`
    },
    {
      id: 3,
      category: 'Mappings',
      question: 'Explain different entity relationship mappings in JPA',
      answer: `**Entity Relationships:**

**1. @OneToOne:**
\`\`\`java
// User has one Profile
@Entity
public class User {
    @Id
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id")
    private Profile profile;
}

@Entity
public class Profile {
    @Id
    private Long id;

    @OneToOne(mappedBy = "profile")
    private User user;
}
\`\`\`

**2. @OneToMany / @ManyToOne:**
\`\`\`java
// One Department has many Employees
@Entity
public class Department {
    @Id
    private Long id;

    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
    private List<Employee> employees = new ArrayList<>();
}

@Entity
public class Employee {
    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;
}
\`\`\`

**3. @ManyToMany:**
\`\`\`java
// Students have many Courses, Courses have many Students
@Entity
public class Student {
    @Id
    private Long id;

    @ManyToMany
    @JoinTable(
        name = "student_course",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private Set<Course> courses = new HashSet<>();
}

@Entity
public class Course {
    @Id
    private Long id;

    @ManyToMany(mappedBy = "courses")
    private Set<Student> students = new HashSet<>();
}
\`\`\`

**Key Concepts:**

**mappedBy:**
- Indicates the inverse side (non-owning)
- Points to the field in the owning entity
- Only one side owns the relationship

\`\`\`java
// Employee is the OWNING side (has foreign key)
@ManyToOne
@JoinColumn(name = "department_id")
private Department department;

// Department is the INVERSE side
@OneToMany(mappedBy = "department")  // "department" is the field name
private List<Employee> employees;
\`\`\`

**Cascade Types:**
\`\`\`java
@OneToMany(cascade = CascadeType.ALL)
// Operations cascade from parent to child

CascadeType.PERSIST   // Save child when parent saved
CascadeType.MERGE     // Update child when parent updated
CascadeType.REMOVE    // Delete child when parent deleted
CascadeType.REFRESH   // Refresh child when parent refreshed
CascadeType.DETACH    // Detach child when parent detached
CascadeType.ALL       // All of the above
\`\`\`

**Fetch Types:**
\`\`\`java
@ManyToOne(fetch = FetchType.LAZY)   // Load on demand
@ManyToOne(fetch = FetchType.EAGER)  // Load immediately

// Defaults:
@OneToOne   - EAGER
@ManyToOne  - EAGER
@OneToMany  - LAZY
@ManyToMany - LAZY
\`\`\`

**orphanRemoval:**
\`\`\`java
@OneToMany(mappedBy = "parent", orphanRemoval = true)
private List<Child> children;

// When child removed from list, it's deleted from DB
parent.getChildren().remove(child);  // Child deleted!
\`\`\`

**Bidirectional Helper Methods:**
\`\`\`java
public void addEmployee(Employee employee) {
    employees.add(employee);
    employee.setDepartment(this);  // Keep both sides in sync
}

public void removeEmployee(Employee employee) {
    employees.remove(employee);
    employee.setDepartment(null);
}
\`\`\``
    },
    {
      id: 4,
      category: 'Performance',
      question: 'What is the N+1 query problem and how do you solve it?',
      answer: `**What is N+1 Problem?**
- Performance issue with lazy loading
- 1 query to fetch N parent entities
- N additional queries to fetch child entities
- Total: N+1 queries (should be 1-2)

**Example of N+1:**
\`\`\`java
@Entity
public class Department {
    @OneToMany(mappedBy = "department", fetch = FetchType.LAZY)
    private List<Employee> employees;
}

// BAD: Causes N+1
List<Department> departments = em.createQuery(
    "SELECT d FROM Department d", Department.class)
    .getResultList();  // 1 query

for (Department dept : departments) {
    dept.getEmployees().size();  // N queries (one per department!)
}

// If 100 departments: 101 queries!
\`\`\`

**SQL Generated:**
\`\`\`sql
-- Query 1: Get all departments
SELECT * FROM department;

-- Query 2-101: Get employees for each department
SELECT * FROM employee WHERE department_id = 1;
SELECT * FROM employee WHERE department_id = 2;
SELECT * FROM employee WHERE department_id = 3;
... (97 more queries)
\`\`\`

**Solutions:**

**1. JOIN FETCH (Recommended):**
\`\`\`java
// GOOD: Single query with JOIN
List<Department> departments = em.createQuery(
    "SELECT d FROM Department d JOIN FETCH d.employees",
    Department.class)
    .getResultList();

// Only 1 query!
\`\`\`

**SQL Generated:**
\`\`\`sql
SELECT d.*, e.*
FROM department d
LEFT JOIN employee e ON d.id = e.department_id;
\`\`\`

**2. @EntityGraph:**
\`\`\`java
@Entity
@NamedEntityGraph(
    name = "Department.employees",
    attributeNodes = @NamedAttributeNode("employees")
)
public class Department { ... }

// Usage
EntityGraph graph = em.getEntityGraph("Department.employees");
List<Department> departments = em.createQuery(
    "SELECT d FROM Department d", Department.class)
    .setHint("javax.persistence.fetchgraph", graph)
    .getResultList();
\`\`\`

**3. @BatchSize (Hibernate):**
\`\`\`java
@OneToMany(mappedBy = "department")
@BatchSize(size = 25)  // Fetch 25 at a time
private List<Employee> employees;

// Instead of N queries, does ceiling(N/25) queries
\`\`\`

**4. Subselect Fetching:**
\`\`\`java
@OneToMany(mappedBy = "department")
@Fetch(FetchMode.SUBSELECT)
private List<Employee> employees;

// Fetches all children in one query using subselect
\`\`\`

**5. Spring Data JPA @Query:**
\`\`\`java
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    @Query("SELECT d FROM Department d JOIN FETCH d.employees")
    List<Department> findAllWithEmployees();
}
\`\`\`

**Detecting N+1:**

**1. Enable SQL Logging:**
\`\`\`properties
# application.properties
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
logging.level.org.hibernate.SQL=DEBUG
\`\`\`

**2. Use Hibernate Statistics:**
\`\`\`java
Statistics stats = sessionFactory.getStatistics();
stats.setStatisticsEnabled(true);
// Check stats.getQueryExecutionCount()
\`\`\`

**3. Tools:**
- Hypersistence Optimizer
- P6Spy
- Hibernate profilers

**Best Practices:**
- Default to LAZY fetching
- Use JOIN FETCH for known access patterns
- Use @EntityGraph for dynamic fetch strategies
- Monitor SQL queries in development
- Batch fetch for collections accessed in loops`
    },
    {
      id: 5,
      category: 'Caching',
      question: 'Explain First-Level and Second-Level Cache in Hibernate',
      answer: `**Hibernate Caching Levels:**

**First-Level Cache (L1):**
- Session-scoped cache
- Enabled by default (cannot disable)
- Associated with Session/EntityManager
- Cleared when session closes
- Also called "Session Cache"

\`\`\`java
Session session = sessionFactory.openSession();

// First query - hits database
User user1 = session.get(User.class, 1L);  // SQL executed

// Second query - from L1 cache (no SQL)
User user2 = session.get(User.class, 1L);  // NO SQL!

// Same object reference
System.out.println(user1 == user2);  // true

session.close();  // L1 cache cleared
\`\`\`

**L1 Cache Behavior:**
\`\`\`java
// Each session has its own L1 cache
Session session1 = sessionFactory.openSession();
Session session2 = sessionFactory.openSession();

User user1 = session1.get(User.class, 1L);  // SQL executed
User user2 = session2.get(User.class, 1L);  // SQL executed (different cache)

// Clearing L1 cache
session.clear();  // Clear entire cache
session.evict(user);  // Evict specific entity
\`\`\`

**Second-Level Cache (L2):**
- SessionFactory-scoped cache
- Shared across sessions
- Must be explicitly enabled
- Survives session boundaries
- Requires cache provider

**Enable L2 Cache:**
\`\`\`properties
# application.properties
spring.jpa.properties.hibernate.cache.use_second_level_cache=true
spring.jpa.properties.hibernate.cache.region.factory_class=
    org.hibernate.cache.jcache.JCacheRegionFactory
spring.jpa.properties.javax.cache.provider=
    org.ehcache.jsr107.EhcacheCachingProvider
\`\`\`

**Cache Provider Options:**
- EhCache (most popular)
- Hazelcast
- Infinispan
- Redis

**Mark Entities as Cacheable:**
\`\`\`java
@Entity
@Cacheable
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class User {
    @Id
    private Long id;
    private String name;
}
\`\`\`

**Cache Concurrency Strategies:**
\`\`\`java
CacheConcurrencyStrategy.READ_ONLY
// For immutable data
// Best performance
// No updates allowed

CacheConcurrencyStrategy.NONSTRICT_READ_WRITE
// For rarely changing data
// No strict transaction isolation
// Possible stale reads

CacheConcurrencyStrategy.READ_WRITE
// For frequently read, occasionally updated
// Uses soft locks
// Good consistency

CacheConcurrencyStrategy.TRANSACTIONAL
// Full transaction isolation
// Requires JTA
// Highest consistency, lowest performance
\`\`\`

**L2 Cache in Action:**
\`\`\`java
// Session 1
Session session1 = sessionFactory.openSession();
User user1 = session1.get(User.class, 1L);  // SQL executed, stored in L2
session1.close();

// Session 2 (new session, same factory)
Session session2 = sessionFactory.openSession();
User user2 = session2.get(User.class, 1L);  // From L2 cache, NO SQL!
session2.close();
\`\`\`

**Query Cache:**
\`\`\`properties
spring.jpa.properties.hibernate.cache.use_query_cache=true
\`\`\`

\`\`\`java
// Cache query results
List<User> users = session.createQuery(
    "SELECT u FROM User u WHERE u.active = true", User.class)
    .setCacheable(true)
    .list();
\`\`\`

**Cache Regions:**
\`\`\`java
@Cache(usage = READ_WRITE, region = "users")
public class User { }

// Configure region in ehcache.xml
<cache alias="users">
    <expiry>
        <ttl unit="seconds">300</ttl>
    </expiry>
    <heap unit="entries">1000</heap>
</cache>
\`\`\`

**Cache Summary:**

| Feature | L1 Cache | L2 Cache |
|---------|----------|----------|
| Scope | Session | SessionFactory |
| Default | Enabled | Disabled |
| Sharing | No | Yes |
| Config | None | Required |
| Best For | Repeated reads in session | Cross-session reads |

**Best Practices:**
- Use L2 cache for read-heavy, rarely-changing data
- Don't cache frequently updated entities
- Set appropriate TTL (time-to-live)
- Monitor cache hit ratios
- Consider memory usage`
    },
    {
      id: 6,
      category: 'States',
      question: 'What are the different entity states in JPA/Hibernate?',
      answer: `**Entity States:**

**1. Transient (New):**
- Just created with new operator
- Not associated with any session
- No database representation
- Will be garbage collected if not persisted

\`\`\`java
User user = new User();  // Transient
user.setName("John");
// No session association, no database record
\`\`\`

**2. Persistent (Managed):**
- Associated with a session
- Has database representation
- Changes automatically synchronized with database (dirty checking)
- Exists in first-level cache

\`\`\`java
Session session = sessionFactory.openSession();
Transaction tx = session.beginTransaction();

User user = new User();
user.setName("John");
session.persist(user);  // Now Persistent

user.setName("Jane");   // Auto-synced to DB at flush!

tx.commit();
session.close();
\`\`\`

**3. Detached:**
- Was persistent, but session closed
- Has database representation (has ID)
- Not associated with any session
- Changes NOT automatically synchronized

\`\`\`java
Session session1 = sessionFactory.openSession();
User user = session1.get(User.class, 1L);  // Persistent
session1.close();  // Now Detached

user.setName("New Name");  // NOT synced to DB!

// To sync, must re-attach:
Session session2 = sessionFactory.openSession();
session2.merge(user);  // Now Persistent again in session2
\`\`\`

**4. Removed:**
- Marked for deletion
- Still associated with session
- Will be deleted at flush/commit

\`\`\`java
Session session = sessionFactory.openSession();
Transaction tx = session.beginTransaction();

User user = session.get(User.class, 1L);  // Persistent
session.remove(user);  // Now Removed (scheduled for deletion)

tx.commit();  // DELETE executed
session.close();
\`\`\`

**State Transitions:**
\`\`\`
                    persist()
        Transient ────────────► Persistent
            │                       │
            │                       │ session.close()
            │                       ▼
            │                   Detached
            │                       │
            │                       │ merge()
            │                       ▼
            │                   Persistent
            │                       │
            │                       │ remove()
            │                       ▼
            └──────────────────► Removed
\`\`\`

**Methods and State Changes:**

| Method | From State | To State |
|--------|------------|----------|
| persist() | Transient | Persistent |
| merge() | Detached | Persistent |
| remove() | Persistent | Removed |
| detach() | Persistent | Detached |
| refresh() | Persistent | Persistent (reloaded) |

**persist() vs save() vs merge():**
\`\`\`java
// persist() - JPA standard
// Makes transient entity persistent
// Returns void
em.persist(user);

// save() - Hibernate specific
// Returns generated ID
Long id = session.save(user);

// merge() - For detached entities
// Returns NEW managed instance
User managedUser = em.merge(detachedUser);
// Note: detachedUser is still detached!
\`\`\`

**Common Mistake:**
\`\`\`java
// WRONG: Modifying detached entity expects auto-sync
Session session = sessionFactory.openSession();
User user = session.get(User.class, 1L);
session.close();

user.setName("New Name");  // Detached - won't sync!
// Need to merge in new session

// CORRECT:
Session session2 = sessionFactory.openSession();
Transaction tx = session2.beginTransaction();
session2.merge(user);  // Now persistent, will sync
tx.commit();
\`\`\`

**Dirty Checking:**
\`\`\`java
Session session = sessionFactory.openSession();
Transaction tx = session.beginTransaction();

User user = session.get(User.class, 1L);
user.setName("Updated");  // Change detected

// No explicit update() call needed!
tx.commit();  // UPDATE automatically executed
session.close();
\`\`\`

**Checking Entity State (Hibernate):**
\`\`\`java
PersistenceUnitUtil util = em.getEntityManagerFactory()
    .getPersistenceUnitUtil();

boolean isLoaded = util.isLoaded(entity);
boolean isManaged = em.contains(entity);
\`\`\``
    },
    {
      id: 7,
      category: 'Transactions',
      question: 'How does transaction management work with JPA/Hibernate?',
      answer: `**Transaction Basics:**
- Unit of work that must complete entirely or not at all
- ACID properties: Atomicity, Consistency, Isolation, Durability
- Required for data modifications

**JPA Transaction Management:**
\`\`\`java
EntityManager em = emf.createEntityManager();
EntityTransaction tx = em.getTransaction();

try {
    tx.begin();

    User user = new User();
    user.setName("John");
    em.persist(user);

    tx.commit();  // Changes saved to database
} catch (Exception e) {
    if (tx.isActive()) {
        tx.rollback();  // Undo all changes
    }
    throw e;
} finally {
    em.close();
}
\`\`\`

**Spring Declarative Transactions:**
\`\`\`java
@Service
public class UserService {

    @Transactional
    public void createUser(User user) {
        userRepository.save(user);
        // Auto-commit on success, auto-rollback on exception
    }
}
\`\`\`

**@Transactional Attributes:**
\`\`\`java
@Transactional(
    propagation = Propagation.REQUIRED,
    isolation = Isolation.READ_COMMITTED,
    timeout = 30,
    readOnly = false,
    rollbackFor = Exception.class,
    noRollbackFor = CustomException.class
)
\`\`\`

**Propagation Types:**
\`\`\`java
REQUIRED (default)
// Use existing transaction, or create new one
// Most common choice

REQUIRES_NEW
// Always create new transaction
// Suspend existing transaction
// Use for independent operations

SUPPORTS
// Use existing transaction if present
// Otherwise execute non-transactionally

NOT_SUPPORTED
// Execute non-transactionally
// Suspend existing transaction

MANDATORY
// Must run within existing transaction
// Throws exception if none exists

NEVER
// Must NOT run within transaction
// Throws exception if transaction exists

NESTED
// Execute within nested transaction
// Can rollback independently
\`\`\`

**Propagation Example:**
\`\`\`java
@Service
public class OrderService {

    @Autowired
    private AuditService auditService;

    @Transactional
    public void createOrder(Order order) {
        orderRepository.save(order);

        // If audit fails, order still saved (independent transaction)
        auditService.logAction("ORDER_CREATED");
    }
}

@Service
public class AuditService {

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void logAction(String action) {
        auditRepository.save(new AuditLog(action));
    }
}
\`\`\`

**Isolation Levels:**
\`\`\`java
READ_UNCOMMITTED
// Lowest isolation, dirty reads possible

READ_COMMITTED (default for most DBs)
// No dirty reads
// Non-repeatable reads possible

REPEATABLE_READ
// No dirty or non-repeatable reads
// Phantom reads possible

SERIALIZABLE
// Highest isolation
// No concurrency issues
// Lowest performance
\`\`\`

**Transaction Issues:**

**1. Dirty Read:**
\`\`\`
Transaction A: Updates user.name = "John" (not committed)
Transaction B: Reads user.name = "John" (uncommitted data!)
Transaction A: Rollback
Transaction B: Has stale/invalid data
\`\`\`

**2. Non-Repeatable Read:**
\`\`\`
Transaction A: Reads user.name = "John"
Transaction B: Updates user.name = "Jane" (commits)
Transaction A: Reads user.name = "Jane" (different!)
\`\`\`

**3. Phantom Read:**
\`\`\`
Transaction A: SELECT COUNT(*) WHERE age > 18 (returns 100)
Transaction B: INSERT new user with age 25 (commits)
Transaction A: SELECT COUNT(*) WHERE age > 18 (returns 101!)
\`\`\`

**@Transactional Gotchas:**

**1. Self-Invocation (Proxy Issue):**
\`\`\`java
@Service
public class UserService {

    @Transactional
    public void methodA() {
        methodB();  // Transaction NOT applied! (self-call)
    }

    @Transactional(propagation = REQUIRES_NEW)
    public void methodB() {
        // This won't create new transaction when called from methodA
    }
}

// Solution: Inject self or use AspectJ
\`\`\`

**2. Checked Exceptions:**
\`\`\`java
@Transactional  // Only rolls back on RuntimeException by default
public void process() throws IOException {
    throw new IOException();  // NO rollback!
}

// Fix:
@Transactional(rollbackFor = Exception.class)
public void process() throws IOException {
    throw new IOException();  // Now rolls back
}
\`\`\`

**3. readOnly for Performance:**
\`\`\`java
@Transactional(readOnly = true)
public List<User> getAllUsers() {
    return userRepository.findAll();
    // Hibernate skips dirty checking
    // Some DBs route to read replicas
}
\`\`\``
    },
    {
      id: 8,
      category: 'Best Practices',
      question: 'What are Hibernate/JPA best practices for production?',
      answer: `**Entity Design:**

**1. Use Lazy Loading by Default:**
\`\`\`java
@ManyToOne(fetch = FetchType.LAZY)  // Not EAGER
private Department department;

@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
private List<Order> orders;
\`\`\`

**2. Prefer Set over List for Collections:**
\`\`\`java
// List can have duplicates and ordering issues
@OneToMany
private Set<Order> orders = new HashSet<>();

// Override equals() and hashCode() properly
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof User)) return false;
    User user = (User) o;
    return id != null && id.equals(user.id);
}

@Override
public int hashCode() {
    return getClass().hashCode();  // Constant for all instances
}
\`\`\`

**3. Use @NaturalId for Business Keys:**
\`\`\`java
@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;

    @NaturalId
    @Column(unique = true)
    private String email;  // Business key
}
\`\`\`

**Query Optimization:**

**4. Always Use JOIN FETCH for Known Patterns:**
\`\`\`java
@Query("SELECT u FROM User u JOIN FETCH u.orders WHERE u.id = :id")
User findByIdWithOrders(@Param("id") Long id);
\`\`\`

**5. Use Projections for Read-Only Data:**
\`\`\`java
// Interface projection
public interface UserSummary {
    String getName();
    String getEmail();
}

@Query("SELECT u.name as name, u.email as email FROM User u")
List<UserSummary> findAllSummaries();

// DTO projection
@Query("SELECT new com.example.UserDTO(u.name, u.email) FROM User u")
List<UserDTO> findAllDTOs();
\`\`\`

**6. Pagination for Large Results:**
\`\`\`java
Page<User> findAll(Pageable pageable);

// Usage
Pageable page = PageRequest.of(0, 20, Sort.by("name"));
Page<User> users = userRepository.findAll(page);
\`\`\`

**Transaction Management:**

**7. Keep Transactions Short:**
\`\`\`java
@Transactional
public void processOrder(Order order) {
    // Quick database operations only
    orderRepository.save(order);
}

// Do NOT:
@Transactional
public void processOrder(Order order) {
    orderRepository.save(order);
    emailService.sendEmail();  // External call in transaction!
    paymentGateway.charge();   // Another external call!
}
\`\`\`

**8. Use readOnly for Queries:**
\`\`\`java
@Transactional(readOnly = true)
public List<User> findAllUsers() {
    return userRepository.findAll();
}
\`\`\`

**Performance:**

**9. Enable SQL Logging in Development:**
\`\`\`properties
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql=TRACE
\`\`\`

**10. Use Batch Processing:**
\`\`\`properties
spring.jpa.properties.hibernate.jdbc.batch_size=50
spring.jpa.properties.hibernate.order_inserts=true
spring.jpa.properties.hibernate.order_updates=true
\`\`\`

\`\`\`java
@Transactional
public void batchInsert(List<User> users) {
    for (int i = 0; i < users.size(); i++) {
        em.persist(users.get(i));
        if (i % 50 == 0) {
            em.flush();
            em.clear();  // Clear L1 cache to prevent memory issues
        }
    }
}
\`\`\`

**11. Use Second-Level Cache Wisely:**
\`\`\`java
// Cache read-heavy, rarely-changing entities
@Entity
@Cacheable
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Country { }  // Good candidate

// Don't cache frequently updated entities
public class Order { }  // Bad candidate
\`\`\`

**Common Mistakes to Avoid:**

**12. Don't Use EAGER Fetching:**
\`\`\`java
// BAD
@OneToMany(fetch = FetchType.EAGER)

// GOOD
@OneToMany(fetch = FetchType.LAZY)
\`\`\`

**13. Don't Ignore N+1:**
\`\`\`java
// BAD
for (Department d : departments) {
    d.getEmployees().size();  // N+1!
}

// GOOD
@Query("SELECT d FROM Department d JOIN FETCH d.employees")
List<Department> findAllWithEmployees();
\`\`\`

**14. Don't Use Open Session in View:**
\`\`\`properties
# Disable this anti-pattern
spring.jpa.open-in-view=false
\`\`\`

**15. Always Define equals/hashCode:**
\`\`\`java
// Use business key or ID-based implementation
// NEVER use auto-generated Lombok equals/hashCode
\`\`\``
    }
  ]

  // Filter questions based on problemLimit (for Top 100/300 mode)
  const displayQuestions = problemLimit ? questions.slice(0, problemLimit) : questions

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Fundamentals': '#8b5cf6',
      'JPA': '#3b82f6',
      'Mappings': '#10b981',
      'Performance': '#ef4444',
      'Caching': '#f59e0b',
      'States': '#ec4899',
      'Transactions': '#6366f1',
      'Best Practices': '#14b8a6'
    }
    return colors[category] || '#6b7280'
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #4c1d95, #111827)', minHeight: '100vh' }}>
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
            backgroundColor: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#7c3aed'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#8b5cf6'}
        >
          ← Back to Questions
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#c4b5fd',
          margin: 0
        }}>
          ORM Interview Questions
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
        Essential ORM interview questions covering JPA, Hibernate, entity mappings, caching, and performance optimization.
      </p>

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
                  <CompletionCheckbox problemId={`ORMQuestions-${q.id}`} />
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
        backgroundColor: 'rgba(139, 92, 246, 0.15)',
        borderRadius: '12px',
        border: '2px solid #8b5cf6'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#c4b5fd', marginBottom: '0.5rem' }}>
          ORM Interview Tips
        </h3>
        <ul style={{ color: '#d1d5db', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Understand the N+1 problem and be able to explain solutions</li>
          <li>Know the difference between entity states (transient, persistent, detached, removed)</li>
          <li>Be familiar with caching strategies and when to use them</li>
          <li>Understand transaction propagation and isolation levels</li>
          <li>Know when to use ORM vs native SQL queries</li>
        </ul>
      </div>
    </div>
  )
}

export default ORMQuestions

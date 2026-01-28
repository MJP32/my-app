import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

export default function SpringDataJPAQuestions({ onBack, breadcrumb }) {
  const [expandedQuestionId, setExpandedQuestionId] = useState(null)
  const categoryColor = '#10b981'

  const questions = [
    {
      id: 1,
      category: 'Repository',
      difficulty: 'Medium',
      question: 'Explain Spring Data JPA Repository hierarchy and query methods',
      answer: `**Spring Data JPA Repository Hierarchy:**

**1. Repository Interface:**
\`\`\`java
public interface Repository<T, ID> {
    // Marker interface
}
\`\`\`

**2. CrudRepository:**
\`\`\`java
public interface CrudRepository<T, ID> extends Repository<T, ID> {
    <S extends T> S save(S entity);
    <S extends T> Iterable<S> saveAll(Iterable<S> entities);
    Optional<T> findById(ID id);
    boolean existsById(ID id);
    Iterable<T> findAll();
    Iterable<T> findAllById(Iterable<ID> ids);
    long count();
    void deleteById(ID id);
    void delete(T entity);
    void deleteAllById(Iterable<? extends ID> ids);
    void deleteAll(Iterable<? extends T> entities);
    void deleteAll();
}
\`\`\`

**3. PagingAndSortingRepository:**
\`\`\`java
public interface PagingAndSortingRepository<T, ID>
        extends CrudRepository<T, ID> {
    Iterable<T> findAll(Sort sort);
    Page<T> findAll(Pageable pageable);
}
\`\`\`

**4. JpaRepository (Most Used):**
\`\`\`java
public interface JpaRepository<T, ID>
        extends PagingAndSortingRepository<T, ID> {
    List<T> findAll();
    List<T> findAll(Sort sort);
    <S extends T> List<S> saveAll(Iterable<S> entities);
    void flush();
    <S extends T> S saveAndFlush(S entity);
    void deleteInBatch(Iterable<T> entities);
    void deleteAllInBatch();
    T getOne(ID id);  // Returns proxy
    T getReferenceById(ID id);  // Returns proxy
}
\`\`\`

**Query Methods:**

**1. Method Name Derived Queries:**
\`\`\`java
public interface UserRepository extends JpaRepository<User, Long> {

    // Find by single property
    List<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    // Find by multiple properties
    List<User> findByFirstNameAndLastName(
        String firstName, String lastName);

    // Using operators
    List<User> findByAgeGreaterThan(int age);
    List<User> findByAgeLessThanEqual(int age);
    List<User> findByAgeBetween(int start, int end);

    // String operations
    List<User> findByUsernameStartingWith(String prefix);
    List<User> findByUsernameEndingWith(String suffix);
    List<User> findByUsernameContaining(String keyword);
    List<User> findByUsernameIgnoreCase(String username);

    // Collections
    List<User> findByRolesIn(List<Role> roles);
    List<User> findByRolesNotIn(List<Role> roles);

    // Null checks
    List<User> findByEmailIsNull();
    List<User> findByEmailIsNotNull();

    // Boolean
    List<User> findByActiveTrue();
    List<User> findByActiveFalse();

    // Ordering
    List<User> findByAgeOrderByUsernameAsc(int age);
    List<User> findByAgeOrderByUsernameDesc(int age);

    // Limiting results
    User findFirstByOrderByCreatedDateDesc();
    List<User> findTop10ByOrderByCreatedDateDesc();

    // Distinct
    List<User> findDistinctByLastName(String lastName);

    // Count
    long countByActive(boolean active);

    // Exists
    boolean existsByEmail(String email);

    // Delete
    long deleteByActive(boolean active);
    List<User> removeByActive(boolean active);
}
\`\`\`

**Method Name Keywords:**
| Keyword | Example | JPQL |
|---------|---------|------|
| And | findByFirstNameAndLastName | where x.firstName = ?1 and x.lastName = ?2 |
| Or | findByFirstNameOrLastName | where x.firstName = ?1 or x.lastName = ?2 |
| Between | findByAgeBetween | where x.age between ?1 and ?2 |
| LessThan | findByAgeLessThan | where x.age < ?1 |
| GreaterThan | findByAgeGreaterThan | where x.age > ?1 |
| Like | findByFirstNameLike | where x.firstName like ?1 |
| StartingWith | findByFirstNameStartingWith | where x.firstName like ?1% |
| EndingWith | findByFirstNameEndingWith | where x.firstName like %?1 |
| Containing | findByFirstNameContaining | where x.firstName like %?1% |
| In | findByAgeIn | where x.age in ?1 |
| NotIn | findByAgeNotIn | where x.age not in ?1 |
| OrderBy | findByAgeOrderByLastNameDesc | where x.age = ?1 order by x.lastName desc |

**Pagination and Sorting:**
\`\`\`java
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Page<User> getUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(pageable);
    }

    public Page<User> getUsersSorted(int page, int size) {
        Pageable pageable = PageRequest.of(page, size,
            Sort.by("lastName").ascending()
                .and(Sort.by("firstName").ascending()));
        return userRepository.findAll(pageable);
    }

    public Page<User> searchUsers(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findByUsernameContaining(
            keyword, pageable);
    }
}
\`\`\``
    },
    {
      id: 2,
      category: 'Custom Queries',
      difficulty: 'Hard',
      question: 'Write custom JPQL and native queries with Spring Data JPA',
      answer: `**Custom Queries:**

**1. @Query with JPQL:**
\`\`\`java
public interface UserRepository extends JpaRepository<User, Long> {

    // Simple JPQL
    @Query("SELECT u FROM User u WHERE u.email = ?1")
    Optional<User> findByEmailAddress(String email);

    // Named parameters
    @Query("SELECT u FROM User u WHERE u.firstName = :firstName " +
           "AND u.lastName = :lastName")
    List<User> findByFullName(
        @Param("firstName") String firstName,
        @Param("lastName") String lastName);

    // Join query
    @Query("SELECT u FROM User u JOIN u.roles r " +
           "WHERE r.name = :roleName")
    List<User> findByRoleName(@Param("roleName") String roleName);

    // Complex join with conditions
    @Query("SELECT DISTINCT u FROM User u " +
           "LEFT JOIN FETCH u.roles r " +
           "WHERE u.active = true " +
           "AND u.createdDate >= :startDate")
    List<User> findActiveUsersWithRoles(
        @Param("startDate") LocalDateTime startDate);

    // Projection
    @Query("SELECT u.username, u.email FROM User u " +
           "WHERE u.age > :age")
    List<Object[]> findUsernameAndEmail(@Param("age") int age);

    // DTO Projection
    @Query("SELECT new com.example.dto.UserDTO(u.id, u.username, u.email) " +
           "FROM User u WHERE u.active = true")
    List<UserDTO> findActiveUserDTOs();

    // Update query
    @Modifying
    @Query("UPDATE User u SET u.active = false WHERE u.lastLogin < :date")
    int deactivateInactiveUsers(@Param("date") LocalDateTime date);

    // Delete query
    @Modifying
    @Query("DELETE FROM User u WHERE u.active = false")
    int deleteInactiveUsers();

    // Pagination with JPQL
    @Query("SELECT u FROM User u WHERE u.department = :dept")
    Page<User> findByDepartment(
        @Param("dept") String department,
        Pageable pageable);
}
\`\`\`

**2. Native SQL Queries:**
\`\`\`java
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Simple native query
    @Query(value = "SELECT * FROM orders WHERE status = ?1",
           nativeQuery = true)
    List<Order> findByStatus(String status);

    // Named parameters
    @Query(value = "SELECT * FROM orders WHERE user_id = :userId " +
                   "AND created_date >= :fromDate",
           nativeQuery = true)
    List<Order> findUserOrders(
        @Param("userId") Long userId,
        @Param("fromDate") LocalDateTime fromDate);

    // Complex native query
    @Query(value = "SELECT o.*, u.username " +
                   "FROM orders o " +
                   "JOIN users u ON o.user_id = u.id " +
                   "WHERE o.total_amount > :amount " +
                   "ORDER BY o.created_date DESC",
           nativeQuery = true)
    List<Object[]> findHighValueOrders(@Param("amount") BigDecimal amount);

    // Native query with pagination
    @Query(value = "SELECT * FROM orders WHERE status = :status",
           countQuery = "SELECT count(*) FROM orders WHERE status = :status",
           nativeQuery = true)
    Page<Order> findByStatusPaged(
        @Param("status") String status,
        Pageable pageable);

    // Modifying native query
    @Modifying
    @Query(value = "UPDATE orders SET status = :newStatus " +
                   "WHERE status = :oldStatus",
           nativeQuery = true)
    int bulkUpdateStatus(
        @Param("oldStatus") String oldStatus,
        @Param("newStatus") String newStatus);
}
\`\`\`

**3. Named Queries:**
\`\`\`java
@Entity
@NamedQuery(
    name = "User.findByActiveStatus",
    query = "SELECT u FROM User u WHERE u.active = :active"
)
@NamedNativeQuery(
    name = "User.findTopSpenders",
    query = "SELECT u.* FROM users u " +
            "JOIN orders o ON u.id = o.user_id " +
            "GROUP BY u.id " +
            "HAVING SUM(o.total_amount) > :amount " +
            "ORDER BY SUM(o.total_amount) DESC",
    resultClass = User.class
)
public class User {
    // Entity fields
}

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByActiveStatus(@Param("active") boolean active);
    List<User> findTopSpenders(@Param("amount") BigDecimal amount);
}
\`\`\`

**4. Specifications (Dynamic Queries):**
\`\`\`java
public interface UserRepository
        extends JpaRepository<User, Long>,
                JpaSpecificationExecutor<User> {
}

public class UserSpecifications {

    public static Specification<User> hasFirstName(String firstName) {
        return (root, query, cb) ->
            cb.equal(root.get("firstName"), firstName);
    }

    public static Specification<User> hasAge(int age) {
        return (root, query, cb) ->
            cb.equal(root.get("age"), age);
    }

    public static Specification<User> isActive() {
        return (root, query, cb) ->
            cb.equal(root.get("active"), true);
    }

    public static Specification<User> hasRole(String roleName) {
        return (root, query, cb) -> {
            Join<User, Role> roleJoin = root.join("roles");
            return cb.equal(roleJoin.get("name"), roleName);
        };
    }
}

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> searchUsers(String firstName, Integer age, Boolean active) {
        Specification<User> spec = Specification.where(null);

        if (firstName != null) {
            spec = spec.and(UserSpecifications.hasFirstName(firstName));
        }
        if (age != null) {
            spec = spec.and(UserSpecifications.hasAge(age));
        }
        if (active != null && active) {
            spec = spec.and(UserSpecifications.isActive());
        }

        return userRepository.findAll(spec);
    }
}
\`\`\`

**5. QueryDSL:**
\`\`\`java
public interface UserRepository
        extends JpaRepository<User, Long>,
                QuerydslPredicateExecutor<User> {
}

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> findUsers(String username, Integer minAge) {
        QUser user = QUser.user;

        BooleanBuilder builder = new BooleanBuilder();

        if (username != null) {
            builder.and(user.username.containsIgnoreCase(username));
        }
        if (minAge != null) {
            builder.and(user.age.goe(minAge));
        }

        return (List<User>) userRepository.findAll(builder);
    }
}
\`\`\``
    },
    {
      id: 3,
      category: 'Entity Relationships',
      difficulty: 'Hard',
      question: 'Explain JPA entity relationships and best practices',
      answer: `**JPA Entity Relationships:**

**1. @OneToOne:**
\`\`\`java
// Bidirectional OneToOne
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL,
              fetch = FetchType.LAZY, orphanRemoval = true)
    private UserProfile profile;

    public void setProfile(UserProfile profile) {
        if (profile == null) {
            if (this.profile != null) {
                this.profile.setUser(null);
            }
        } else {
            profile.setUser(this);
        }
        this.profile = profile;
    }
}

@Entity
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String bio;
    private String avatarUrl;
}
\`\`\`

**2. @OneToMany / @ManyToOne:**
\`\`\`java
// Bidirectional OneToMany/ManyToOne
@Entity
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "department",
               cascade = CascadeType.ALL,
               orphanRemoval = true)
    private List<Employee> employees = new ArrayList<>();

    public void addEmployee(Employee employee) {
        employees.add(employee);
        employee.setDepartment(this);
    }

    public void removeEmployee(Employee employee) {
        employees.remove(employee);
        employee.setDepartment(null);
    }
}

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;
}
\`\`\`

**3. @ManyToMany:**
\`\`\`java
@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "student_course",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private Set<Course> courses = new HashSet<>();

    public void addCourse(Course course) {
        courses.add(course);
        course.getStudents().add(this);
    }

    public void removeCourse(Course course) {
        courses.remove(course);
        course.getStudents().remove(this);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Student)) return false;
        return id != null && id.equals(((Student) o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(mappedBy = "courses")
    private Set<Student> students = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Course)) return false;
        return id != null && id.equals(((Course) o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
\`\`\`

**4. @ManyToMany with Extra Columns:**
\`\`\`java
@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "student",
               cascade = CascadeType.ALL,
               orphanRemoval = true)
    private Set<Enrollment> enrollments = new HashSet<>();

    public void enroll(Course course, LocalDateTime enrollmentDate) {
        Enrollment enrollment = new Enrollment(this, course);
        enrollment.setEnrollmentDate(enrollmentDate);
        enrollments.add(enrollment);
        course.getEnrollments().add(enrollment);
    }
}

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "course",
               cascade = CascadeType.ALL,
               orphanRemoval = true)
    private Set<Enrollment> enrollments = new HashSet<>();
}

@Entity
public class Enrollment {
    @EmbeddedId
    private EnrollmentId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("studentId")
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("courseId")
    private Course course;

    private LocalDateTime enrollmentDate;
    private BigDecimal grade;

    private Enrollment() {}

    public Enrollment(Student student, Course course) {
        this.student = student;
        this.course = course;
        this.id = new EnrollmentId(student.getId(), course.getId());
    }
}

@Embeddable
public class EnrollmentId implements Serializable {
    private Long studentId;
    private Long courseId;

    // Constructor, equals, hashCode
}
\`\`\`

**Best Practices:**

**1. Use FetchType.LAZY:**
\`\`\`java
@ManyToOne(fetch = FetchType.LAZY)  // Always LAZY
@OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
\`\`\`

**2. Avoid N+1 Queries:**
\`\`\`java
// Use JOIN FETCH
@Query("SELECT d FROM Department d LEFT JOIN FETCH d.employees")
List<Department> findAllWithEmployees();

// Use @EntityGraph
@EntityGraph(attributePaths = {"employees"})
List<Department> findAll();
\`\`\`

**3. Implement equals() and hashCode():**
\`\`\`java
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof Entity)) return false;
    return id != null && id.equals(((Entity) o).id);
}

@Override
public int hashCode() {
    return getClass().hashCode();
}
\`\`\`

**4. Cascade Types:**
| Type | Description |
|------|-------------|
| PERSIST | Propagate persist operation |
| MERGE | Propagate merge operation |
| REMOVE | Propagate remove operation |
| REFRESH | Propagate refresh operation |
| DETACH | Propagate detach operation |
| ALL | All cascade operations |

**5. OrphanRemoval:**
\`\`\`java
@OneToMany(mappedBy = "parent",
           cascade = CascadeType.ALL,
           orphanRemoval = true)  // Delete child when removed from collection
private List<Child> children;
\`\`\``
    }
  ]

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
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
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

      // Bullet points (lines starting with •)
      const bulletMatch = line.match(/^(\s*)•\s+(.+)$/)
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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#10b981'
      case 'Medium': return '#f59e0b'
      case 'Hard': return '#ef4444'
      default: return '#6b7280'
    }
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
          textAlign: 'left',
            fontWeight: '600',
            backgroundColor: categoryColor,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
          onMouseLeave={(e) => e.target.style.backgroundColor = categoryColor}
        >
          ← Back to Questions
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#f9fafb',
          margin: 0
        }}>
          Spring Data JPA Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        {questions.map((q) => (
          <div
            key={q.id}
            style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              borderRadius: '12px',
              border: `3px solid ${categoryColor}60`,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: expandedQuestionId === q.id
                ? `0 0 0 4px ${categoryColor}30, 0 8px 16px rgba(0,0,0,0.3)`
                : '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <div
              onClick={() => setExpandedQuestionId(expandedQuestionId === q.id ? null : q.id)}
              style={{
                padding: '1.5rem',
                cursor: 'pointer',
                backgroundColor: expandedQuestionId === q.id ? `${categoryColor}25` : 'transparent',
                transition: 'background-color 0.2s ease'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1rem',
                marginBottom: '0.75rem'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '0.75rem',
                  flexWrap: 'wrap',
                  alignItems: 'center'
                }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: `${categoryColor}30`,
                    color: categoryColor,
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    {q.category}
                  </span>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: `${getDifficultyColor(q.difficulty)}30`,
                    color: getDifficultyColor(q.difficulty),
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    {q.difficulty}
                  </span>
                </div>
                <span style={{
                  fontSize: '1.5rem',
                  color: categoryColor,
                  transition: 'transform 0.3s ease',
                  transform: expandedQuestionId === q.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  display: 'inline-block'
                }}>
                  ▼
                </span>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#f9fafb',
                margin: 0
              }}>
                {q.question}
              </h3>
            </div>

            {expandedQuestionId === q.id && (
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#1e293b',
                borderTop: `2px solid ${categoryColor}40`,
                animation: 'fadeIn 0.3s ease'
              }}>
                <div style={{
                  fontSize: '1rem',
          textAlign: 'left',
                  lineHeight: '1.8',
                  color: '#d1d5db',
                  whiteSpace: 'pre-wrap'
                }}>
                  {renderFormattedAnswer(q.answer)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderRadius: '12px',
        border: `3px solid ${categoryColor}60`
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#f9fafb',
          marginBottom: '1rem'
        }}>
          💡 JPA Best Practices
        </h3>
        <ul style={{
          fontSize: '1rem',
          textAlign: 'left',
          lineHeight: '2',
          color: '#d1d5db',
          paddingLeft: '1.5rem'
        }}>
          <li><strong style={{ color: '#f9fafb' }}>Always use FetchType.LAZY</strong> to prevent loading unnecessary data</li>
          <li><strong style={{ color: '#f9fafb' }}>Avoid N+1 queries</strong> - use JOIN FETCH or @EntityGraph</li>
          <li><strong style={{ color: '#f9fafb' }}>Implement equals() and hashCode()</strong> correctly for entities</li>
          <li><strong style={{ color: '#f9fafb' }}>Use @Transactional</strong> on service layer, not on repository</li>
          <li><strong style={{ color: '#f9fafb' }}>Prefer method name queries</strong> for simple cases, @Query for complex</li>
          <li><strong style={{ color: '#f9fafb' }}>Use Specifications or QueryDSL</strong> for dynamic queries</li>
          <li><strong style={{ color: '#f9fafb' }}>Set appropriate cascade types</strong> - avoid CascadeType.ALL unless needed</li>
          <li><strong style={{ color: '#f9fafb' }}>Use orphanRemoval</strong> carefully - only for parent-child relationships</li>
          <li><strong style={{ color: '#f9fafb' }}>Enable query logging</strong> in development to detect issues early</li>
          <li><strong style={{ color: '#f9fafb' }}>Use database indexes</strong> on frequently queried columns</li>
        </ul>
      </div>
    </div>
  )
}

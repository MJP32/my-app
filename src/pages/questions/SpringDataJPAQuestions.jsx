import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

export default function SpringDataJPAQuestions({ onBack, breadcrumb, problemLimit }) {
  const [expandedQuestionId, setExpandedQuestionId] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeDifficulty, setActiveDifficulty] = useState('All')
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
    },
    {
      id: 4,
      category: 'Repository',
      difficulty: 'Medium',
      question: 'Deep dive into JpaRepository — interface design and customization',
      answer: `**JpaRepository — the workhorse of Spring Data JPA:**

\`\`\`java
public interface UserRepository extends JpaRepository<User, Long> { }
\`\`\`

That single line gives you ~20 ready-made methods: \`save\`, \`findById\`, \`findAll\`, \`delete\`, \`count\`, \`flush\`, \`saveAndFlush\`, batch ops, plus pagination/sorting.

**Repository Hierarchy:**

\`\`\`
Repository<T, ID>                  (marker — needed for component scan)
   ↑
CrudRepository<T, ID>              (CRUD methods)
   ↑
PagingAndSortingRepository<T, ID>  (adds Page<T> findAll(Pageable), findAll(Sort))
   ↑
JpaRepository<T, ID>               (List instead of Iterable, flush, batch ops)
\`\`\`

**Why JpaRepository over CrudRepository:**

- Returns \`List<T>\` instead of \`Iterable<T>\` (more useful)
- Adds \`flush()\` and \`saveAndFlush()\` for explicit DB sync
- Adds \`getReferenceById()\` (lazy proxy — only hits DB on field access)
- Batch operations: \`deleteAllInBatch()\`, \`deleteAllByIdInBatch()\`

**Custom Methods (3 ways):**

**1. Method-name derived queries:**
\`\`\`java
List<User> findByLastName(String lastName);
List<User> findByEmailContainingIgnoreCase(String fragment);
Optional<User> findByEmail(String email);
boolean existsByUsername(String username);
long countByActiveTrue();
List<User> findTop5ByOrderByCreatedAtDesc();
List<User> findFirst10ByStatusOrderByCreatedAtDesc(Status status);
\`\`\`

Spring parses the method name, generates the JPQL automatically.

**2. \`@Query\` for custom JPQL or native SQL:**
\`\`\`java
@Query("SELECT u FROM User u WHERE u.email = :email AND u.active = true")
Optional<User> findActiveByEmail(@Param("email") String email);

@Query(value = "SELECT * FROM users WHERE created_at > NOW() - INTERVAL '7 days'",
       nativeQuery = true)
List<User> findRecentUsers();

@Modifying
@Query("UPDATE User u SET u.active = false WHERE u.lastLogin < :cutoff")
int deactivateInactive(@Param("cutoff") Instant cutoff);
\`\`\`

**3. Custom Repository Implementation (escape hatch):**
\`\`\`java
// Define custom interface
public interface UserRepositoryCustom {
    List<User> searchByCustomCriteria(SearchCriteria criteria);
}

// Implement (must follow naming: <Repo>Impl)
@Repository
public class UserRepositoryCustomImpl implements UserRepositoryCustom {
    @PersistenceContext
    private EntityManager em;

    @Override
    public List<User> searchByCustomCriteria(SearchCriteria c) {
        // Use Criteria API or QueryDSL for type-safe dynamic queries
        return em.createQuery("...").getResultList();
    }
}

// Compose
public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom { }

userRepository.save(...);                    // from JpaRepository
userRepository.searchByCustomCriteria(...);  // from custom
\`\`\`

**Common Patterns:**

**Optional return:** Prefer \`Optional<T>\` over null:
\`\`\`java
Optional<User> findByEmail(String email);

Optional<User> u = repo.findByEmail("a@b.com");
u.ifPresent(this::process);
u.orElseThrow(() -> new UserNotFoundException("..."));
\`\`\`

**Projections (DTO instead of entity):**
\`\`\`java
public interface UserSummary {              // interface-based projection
    String getName();
    String getEmail();
}

List<UserSummary> findAllProjectedBy();   // returns lightweight projection
\`\`\`

**Specifications (dynamic queries):**
\`\`\`java
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> { }

Specification<User> active = (root, q, cb) -> cb.isTrue(root.get("active"));
Specification<User> recent = (root, q, cb) -> cb.greaterThan(root.get("createdAt"), cutoff);

repo.findAll(active.and(recent));
\`\`\`

**\`getReferenceById\` vs \`findById\`:**
\`\`\`java
User u1 = repo.findById(1L).orElseThrow();   // SELECT — full row loaded
User u2 = repo.getReferenceById(1L);          // proxy — no SQL until field accessed
order.setUser(u2);                            // JUST sets foreign key — no SELECT
repo.save(order);                             // single INSERT, no extra SELECT
\`\`\`

**Transaction Behavior:**

By default, JpaRepository methods are wrapped in \`@Transactional(readOnly=true)\` for reads, \`@Transactional\` for writes. Custom \`@Query\` UPDATE/DELETE need \`@Modifying\`.

**Naming convention strictness:**
\`\`\`java
findByName        ✓
findUsersByName   ✗ — "Users" must follow domain object structure
findByName_FirstName   ✓ — for nested properties (User.name.firstName)
\`\`\`

**Best Practices:**
- Return \`Optional<T>\` for single-result queries (not null)
- Use **projections / DTOs** when you don't need the full entity
- For complex queries, switch to \`@Query\` or **Specifications/QueryDSL**
- Avoid \`findAll()\` without pagination on large tables
- Use \`getReferenceById\` for foreign-key associations to avoid wasted SELECTs`
    },
    {
      id: 5,
      category: 'Pagination',
      difficulty: 'Medium',
      question: 'How does pagination work in Spring Data JPA?',
      answer: `**Pagination = returning a slice of a large result set, not the whole table.**

Spring Data JPA exposes pagination via the **\`Pageable\`** interface and **\`Page<T>\`** result type.

**Basic Usage:**

\`\`\`java
public interface UserRepository extends JpaRepository<User, Long> {
    Page<User> findByActiveTrue(Pageable pageable);
}

// Caller
Pageable pageable = PageRequest.of(0, 20);                        // page 0, size 20
Page<User> page = userRepo.findByActiveTrue(pageable);

page.getContent();          // List<User> for this page
page.getTotalElements();    // total rows in DB matching the query (extra COUNT query)
page.getTotalPages();        // total pages
page.getNumber();            // current page (0-indexed)
page.getSize();              // page size
page.hasNext();              // boolean
page.isLast();               // boolean
\`\`\`

**Spring auto-translates this into 2 SQL queries:**
\`\`\`sql
SELECT * FROM users WHERE active = true ORDER BY id LIMIT 20 OFFSET 0;
SELECT COUNT(*) FROM users WHERE active = true;
\`\`\`

**With Sorting:**

\`\`\`java
Pageable pageable = PageRequest.of(0, 20, Sort.by("createdAt").descending());

// Multi-field
Sort sort = Sort.by(
    Sort.Order.asc("lastName"),
    Sort.Order.desc("createdAt").nullsLast()
);
Pageable p = PageRequest.of(0, 20, sort);
\`\`\`

**REST Controller Integration:**

Spring auto-binds query params \`?page=2&size=20&sort=name,asc\`:
\`\`\`java
@GetMapping("/users")
public Page<User> list(Pageable pageable) {     // injected from query params
    return userRepo.findAll(pageable);
}
// GET /users?page=0&size=20&sort=name,asc&sort=age,desc
\`\`\`

**Slice<T> vs Page<T>:**

| Aspect | \`Page<T>\` | \`Slice<T>\` |
|--------|-----------|-------------|
| Total count | YES (extra COUNT query) | NO |
| hasNext() | Computed from total | Computed from over-fetching by 1 |
| Performance | Slower (count query) | Faster |
| Use case | Show "Page X of Y" | Infinite scroll / "Next" only |

\`\`\`java
Slice<User> slice = userRepo.findByActiveTrue(pageable);
slice.hasNext();              // true if more pages exist (no total count)
\`\`\`

**Pagination with @Query:**

\`\`\`java
// JPQL
@Query("SELECT u FROM User u WHERE u.email LIKE %:term%")
Page<User> searchByEmail(@Param("term") String term, Pageable pageable);

// Native — must provide a separate countQuery
@Query(value = "SELECT * FROM users WHERE email LIKE %:term%",
       countQuery = "SELECT count(*) FROM users WHERE email LIKE %:term%",
       nativeQuery = true)
Page<User> searchByEmailNative(@Param("term") String term, Pageable pageable);
\`\`\`

**The OFFSET Performance Problem:**

\`LIMIT 20 OFFSET 100000\` — the database still **scans 100,020 rows** and discards the first 100,000. Slow on large tables.

**Solution: Keyset (cursor) Pagination:**

Instead of OFFSET, paginate by remembering the last seen ID:
\`\`\`java
@Query("SELECT u FROM User u WHERE u.id > :lastId ORDER BY u.id ASC")
List<User> findNextBatch(@Param("lastId") Long lastId, Pageable pageable);

// First page: lastId = 0
// Each subsequent page: lastId = last item's id from previous page
\`\`\`

Performance is **O(log N)** via index seek, regardless of page depth.

Spring Data 3.1+ adds first-class support:
\`\`\`java
@Query("...")
Window<User> findFirst10By(ScrollPosition position);

ScrollPosition pos = ScrollPosition.offset();
Window<User> window = repo.findFirst10By(pos);
\`\`\`

**Counting Pitfalls:**

The COUNT query can be expensive on large tables. Optimizations:

**1. Skip the count when you don't need totals — use \`Slice\`.**

**2. Custom count query:**
\`\`\`java
@Query(value  = "SELECT * FROM users WHERE active = true",
       countQuery = "SELECT COUNT(id) FROM users WHERE active = true",
       nativeQuery = true)
Page<User> findActiveUsers(Pageable pageable);
\`\`\`

**3. Approximate counts (Postgres):**
\`\`\`sql
SELECT reltuples::bigint FROM pg_class WHERE relname = 'users';
\`\`\`

**Sorting with Joined Fields:**

\`\`\`java
Sort sort = Sort.by("address.city");   // navigate to nested property
PageRequest.of(0, 20, sort);
\`\`\`

This generates a JOIN. Beware N+1 issues — use \`@EntityGraph\` for eager loading:
\`\`\`java
@EntityGraph(attributePaths = "address")
Page<User> findAll(Pageable pageable);
\`\`\`

**Frontend Response Shape:**

\`\`\`json
{
  "content": [...],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 20,
    "sort": { "sorted": true, "unsorted": false }
  },
  "totalElements": 1245,
  "totalPages": 63,
  "last": false,
  "first": true,
  "number": 0,
  "size": 20,
  "numberOfElements": 20,
  "empty": false
}
\`\`\`

**Best Practices:**
- Always paginate large queries (avoid \`findAll()\` without limits)
- Use \`Slice\` over \`Page\` when you don't need totals — saves a COUNT query
- Use **keyset pagination** for very large datasets or deep scrolling
- Always provide a stable \`ORDER BY\` (use a unique column like \`id\` as tiebreaker)
- Set sensible defaults: \`@PageableDefault(size = 20)\`
- Cap maximum page size to prevent abuse: \`@PageableDefault(size = 20) Pageable p\`, then validate

**Default Page Limits:**
\`\`\`java
@GetMapping
public Page<User> list(@PageableDefault(size = 20, sort = "id") Pageable p) {
    return userRepo.findAll(p);
}

// In application.properties:
spring.data.web.pageable.default-page-size=20
spring.data.web.pageable.max-page-size=100
\`\`\``
    },
    {
      id: 6,
      category: 'Repository',
      difficulty: 'Easy',
      question: 'What is JpaRepository?',
      answer: `**\`JpaRepository<T, ID>\` is Spring Data's JPA-specific repository interface.** Extend it on an interface and Spring generates a full CRUD implementation at runtime — no implementation class to write.

\`\`\`java
public interface UserRepository extends JpaRepository<User, Long> {
}

// That's it — you now have ~30 methods: save, findById, findAll,
// deleteById, count, existsById, flush, saveAndFlush, etc.
\`\`\`

**Where it sits in the hierarchy:**
\`\`\`
Repository                          (marker — no methods)
  └── CrudRepository                (save, findById, deleteById, ...)
       └── PagingAndSortingRepository  (+ findAll(Pageable), findAll(Sort))
            └── JpaRepository        (+ flush, saveAndFlush, deleteInBatch, getReferenceById)
\`\`\`

**Built-in methods you get for free:**
- \`save(entity)\`, \`saveAll(entities)\`
- \`findById(id)\` → \`Optional<T>\`
- \`findAll()\`, \`findAll(Pageable)\`, \`findAll(Sort)\`
- \`existsById(id)\`, \`count()\`
- \`deleteById(id)\`, \`delete(entity)\`, \`deleteAll()\`
- \`flush()\`, \`saveAndFlush(entity)\`
- \`getReferenceById(id)\` — returns a lazy proxy (no SELECT)
- \`deleteAllInBatch()\` — single \`DELETE FROM\` (no per-entity events)

**Query derivation — Spring builds queries from method names:**

\`\`\`java
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByActiveTrueOrderByCreatedAtDesc();
    List<User> findByAgeBetween(int min, int max);
    long countByActive(boolean active);
    void deleteByEmail(String email);
}
\`\`\`

**Custom queries with @Query:**

\`\`\`java
@Query("SELECT u FROM User u WHERE u.email LIKE %:term%")
List<User> search(@Param("term") String term);

@Query(value = "SELECT * FROM users WHERE created_at > NOW() - INTERVAL '7 days'",
       nativeQuery = true)
List<User> recentUsers();
\`\`\`

**JpaRepository vs CrudRepository — what JpaRepository adds:**

| Method | CrudRepository | JpaRepository |
|--------|----------------|---------------|
| save | returns S | returns S |
| findAll | \`Iterable\` | \`List\` |
| **flush()** | NO | YES |
| **saveAndFlush()** | NO | YES |
| **deleteAllInBatch()** | NO | YES |
| **getReferenceById()** | NO | YES |

**When to use which:**
- \`CrudRepository\` — minimal CRUD, DB-agnostic
- \`JpaRepository\` — anything JPA-backed (99% of Spring Boot apps)
- \`PagingAndSortingRepository\` — when you need pagination but want to limit the API surface

**Best practices:**
- Default to \`JpaRepository\`
- Don't expose repositories directly in controllers — wrap in a service
- Use \`Optional\` return types for single-result finders`
    },
    {
      id: 7,
      category: 'Repository',
      difficulty: 'Medium',
      question: 'Difference between save() and saveAndFlush() in Spring Data JPA?',
      answer: `Both persist the entity, but they differ in **when the SQL actually hits the database**.

**\`save()\`**
- Marks the entity as persistent
- INSERT/UPDATE is **deferred** until the next flush
- Flush usually happens at **transaction commit** (or before a JPQL query that touches the same table)
- This is the normal, efficient path

**\`saveAndFlush()\`**
- Calls \`save()\` then **immediately calls \`flush()\`**
- SQL is sent to the DB right away (still inside the same transaction — not committed)
- Useful when you need the DB to see the change before the transaction ends

\`\`\`java
@Transactional
public void example() {
    userRepo.save(user);          // entity is managed; no SQL yet
    // ... other work ...
    // SQL runs here at commit  ← deferred

    userRepo.saveAndFlush(user);  // SQL runs IMMEDIATELY (still uncommitted)
}
\`\`\`

**When to use \`saveAndFlush\`:**

1. **You need the generated ID right now** and \`save()\` already returns it for \`IDENTITY\`, but for some flows you need other DB-computed columns (defaults, triggers) — \`flush()\` then \`refresh()\`.

2. **You need to run a native query that reads the row you just inserted** — without flush, the row isn't in the DB yet, so the query won't find it.

\`\`\`java
@Transactional
public void example(User u) {
    userRepo.saveAndFlush(u);   // INSERT now

    // Native query that bypasses the persistence context
    Long count = jdbc.queryForObject("SELECT COUNT(*) FROM users", Long.class);
}
\`\`\`

3. **You want validation/constraint violations to surface here**, not at commit time, so you can catch them in a specific try/catch block.

\`\`\`java
try {
    userRepo.saveAndFlush(user);  // throws ConstraintViolationException here
} catch (DataIntegrityViolationException e) {
    // handle duplicate email, etc.
}
\`\`\`

**Why \`save()\` is preferred 99% of the time:**

| Aspect | save() | saveAndFlush() |
|--------|--------|----------------|
| SQL timing | Deferred (commit) | Immediate |
| Batching | Works | Defeats batching |
| Performance | Better | Slower per call |
| Visibility to native queries | Only after flush | Right away |
| Use case | Normal writes | Special cases |

**Common pitfall — calling \`saveAndFlush\` in a loop kills batch performance:**

\`\`\`java
// BAD — 1000 immediate round-trips, no batching
for (User u : users) {
    userRepo.saveAndFlush(u);
}

// GOOD — batched at commit
for (User u : users) {
    userRepo.save(u);
}
\`\`\`

**Rule of thumb:**
- Default to \`save()\`
- Use \`saveAndFlush()\` only when something downstream in the same transaction needs the row visible in the DB`
    },
    {
      id: 8,
      category: 'Transactions',
      difficulty: 'Medium',
      question: 'Explain the different Transaction Propagation types in Spring',
      answer: `**Propagation defines how a \`@Transactional\` method behaves when called from another \`@Transactional\` method.**

The question is: when method B is called from inside an existing transaction, should B join that transaction, suspend it, or open a new one?

\`\`\`java
@Transactional(propagation = Propagation.REQUIRED)
public void method() { ... }
\`\`\`

**The 7 propagation types:**

**1. \`REQUIRED\` (default)** — Join the existing transaction, or start a new one.
- 99% of the time, this is what you want
- One transaction = all-or-nothing across all REQUIRED methods

\`\`\`
Tx A: methodA() → methodB() (REQUIRED) → both in same tx
       (no tx)   → methodB() (REQUIRED) → new tx
\`\`\`

**2. \`REQUIRES_NEW\`** — Always start a new transaction; suspend the outer one if present.
- The new tx commits/rolls back independently
- Useful for audit logs, sending notifications: you want them recorded even if the outer tx fails

\`\`\`java
@Transactional(propagation = Propagation.REQUIRES_NEW)
public void logAudit(AuditEntry e) { ... }
\`\`\`

**3. \`SUPPORTS\`** — Join the existing transaction if there is one; otherwise run non-transactionally.
- Useful for read-only methods that can run either way

**4. \`NOT_SUPPORTED\`** — Suspend the outer transaction; run non-transactionally.
- Use when calling code that absolutely must not be inside a transaction (e.g. external API call, long task)

**5. \`MANDATORY\`** — There MUST be an existing transaction, else throw \`IllegalTransactionStateException\`.
- Useful as a defensive check: "this method should only be called from within a transaction"

**6. \`NEVER\`** — There must NOT be an existing transaction, else throw exception.

**7. \`NESTED\`** — A savepoint inside the existing transaction.
- Inner rollback rolls back to the savepoint, outer can still commit
- Only works with JDBC savepoint support
- Outer rollback rolls back everything

**Comparison table:**

| Propagation | Existing tx | No tx |
|-------------|-------------|-------|
| REQUIRED (default) | Join | Create |
| REQUIRES_NEW | Suspend, create new | Create |
| SUPPORTS | Join | Run without tx |
| NOT_SUPPORTED | Suspend, run without | Run without tx |
| MANDATORY | Join | **Exception** |
| NEVER | **Exception** | Run without tx |
| NESTED | Savepoint | Create |

**Common pitfall — self-invocation breaks @Transactional:**

\`\`\`java
@Service
public class UserService {
    @Transactional
    public void outer() {
        inner();              // BAD — bypasses Spring's proxy
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void inner() { ... }   // REQUIRES_NEW is IGNORED here
}
\`\`\`

Spring's \`@Transactional\` works via a proxy. Calling \`this.inner()\` skips the proxy → no new transaction starts. **Fix:** call through a self-reference (\`AopContext.currentProxy()\`) or split into two beans.

**Best practices:**
- Default to \`REQUIRED\` — change only when you have a clear reason
- Use \`REQUIRES_NEW\` for audit/logging that must commit independently
- Use \`readOnly = true\` for query-only methods (hints DB, disables dirty checking)
- Avoid \`NESTED\` unless you really understand savepoints`
    },
    {
      id: 9,
      category: 'Relationships',
      difficulty: 'Medium',
      question: 'Difference between mappedBy and @JoinColumn?',
      answer: `In a bidirectional JPA relationship, **one side owns the foreign key, and one side mirrors it.** \`@JoinColumn\` belongs on the **owning side**. \`mappedBy\` belongs on the **inverse side**.

**The rule:**
- **\`@JoinColumn\`** → "I own the FK column. Here's its name."
- **\`mappedBy\`** → "I do NOT own the FK. The other side does — look at its field."

---

**Example — Department (1) ↔ (N) Employee:**

\`\`\`java
@Entity
public class Department {

    @Id @GeneratedValue
    private Long id;

    // INVERSE side — does NOT own the FK
    @OneToMany(mappedBy = "department")    // 👈 points to the field in Employee
    private List<Employee> employees = new ArrayList<>();
}

@Entity
public class Employee {

    @Id @GeneratedValue
    private Long id;

    // OWNING side — has the FK column
    @ManyToOne
    @JoinColumn(name = "department_id")    // 👈 actual FK column in employees table
    private Department department;
}
\`\`\`

**Resulting schema:**
\`\`\`sql
employees (
    id BIGINT PRIMARY KEY,
    department_id BIGINT REFERENCES departments(id)   -- FK lives HERE
);
\`\`\`

There's only **one** FK column, on the many-side. \`mappedBy = "department"\` tells JPA "the owning field is called \`department\` over in \`Employee\`."

---

**Why this matters — only the owning side writes the FK:**

\`\`\`java
Department dept = ...;
Employee emp = new Employee();

dept.getEmployees().add(emp);   // only updates the in-memory list
                                // FK in DB is NOT set!

emp.setDepartment(dept);        // sets the FK — this is what JPA persists
\`\`\`

Modifying the inverse side (\`dept.getEmployees()\`) **alone** does not update the database. You must set the owning side. The usual fix is a helper method that sets both:

\`\`\`java
public void addEmployee(Employee e) {
    employees.add(e);
    e.setDepartment(this);
}
\`\`\`

---

**Unidirectional — only one side, no \`mappedBy\` needed:**

\`\`\`java
@Entity
public class Department {
    @OneToMany
    @JoinColumn(name = "department_id")   // owning side, but on the "one" end
    private List<Employee> employees;
}
\`\`\`

Without \`mappedBy\`, Hibernate assumes you own the FK and either:
- Adds the FK column to Employee (if you used \`@JoinColumn\`), or
- Creates a separate **join table** \`department_employees\` (default, usually undesirable)

---

**@ManyToMany — owning side gets \`@JoinTable\`:**

\`\`\`java
@Entity
public class Student {
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
    @ManyToMany(mappedBy = "courses")    // inverse side
    private Set<Student> students;
}
\`\`\`

---

**Summary:**

| | mappedBy | @JoinColumn |
|---|----------|-------------|
| Goes on | Inverse side | Owning side |
| Owns FK? | No | Yes |
| Triggers DB write? | No (read-only view) | Yes |
| Required for bidirectional? | Yes | Yes (on the other side) |

**Rule of thumb:**
- For \`@OneToMany\` / \`@ManyToOne\` — the **many** side owns the FK (\`@JoinColumn\` there, \`mappedBy\` on the one)
- For \`@OneToOne\` — either side can own; pick the one that's more often queried by FK
- For \`@ManyToMany\` — pick a side as owning, put \`@JoinTable\` there, \`mappedBy\` on the other`
    },
    {
      id: 10,
      category: 'Queries',
      difficulty: 'Easy',
      question: 'When should you use a native query in JPA?',
      answer: `**Native query = raw SQL executed directly through JPA, instead of JPQL/HQL.**

\`\`\`java
@Query(value = "SELECT * FROM users WHERE created_at > NOW() - INTERVAL '7 days'",
       nativeQuery = true)
List<User> findRecent();
\`\`\`

**Default to JPQL. Reach for native SQL only when JPQL can't express what you need.**

---

**Good reasons to use native queries:**

**1. Database-specific SQL features JPQL doesn't support:**
- PostgreSQL: JSONB operators, window functions with complex frames, \`ON CONFLICT\`, CTEs in some JPA versions, full-text search
- MySQL: hints (\`USE INDEX\`)
- Oracle: \`CONNECT BY\`, hierarchical queries
- DB-specific date functions (\`DATE_TRUNC\`, \`EXTRACT\`)

\`\`\`java
@Query(value = """
    SELECT * FROM users
    WHERE preferences @> CAST(:filter AS jsonb)
    """, nativeQuery = true)
List<User> findByPreferenceJson(@Param("filter") String filter);
\`\`\`

**2. Performance-critical bulk operations:**
\`\`\`java
@Modifying
@Query(value = "UPDATE users SET last_seen = NOW() WHERE id IN (:ids)",
       nativeQuery = true)
int updateLastSeen(@Param("ids") List<Long> ids);
\`\`\`

**3. Reporting queries with aggregations / joins JPA mappings can't express cleanly:**
\`\`\`java
@Query(value = """
    SELECT u.country, COUNT(*) as cnt, AVG(o.total) as avg_order
    FROM users u
    JOIN orders o ON o.user_id = u.id
    WHERE o.created_at > :since
    GROUP BY u.country
    """, nativeQuery = true)
List<Object[]> countryReport(@Param("since") Instant since);
\`\`\`

**4. Working with stored procedures and database functions:**
\`\`\`java
@Query(value = "SELECT * FROM calculate_recommendations(:userId)", nativeQuery = true)
List<Recommendation> getRecommendations(@Param("userId") Long userId);
\`\`\`

**5. Queries that mix multiple unrelated entities or non-entity tables:**
\`\`\`java
@Query(value = """
    SELECT u.id, u.name, COUNT(o.id)
    FROM users u
    LEFT JOIN unmapped_orders_table o ON o.user_id = u.id
    GROUP BY u.id, u.name
    """, nativeQuery = true)
List<Object[]> userOrderCounts();
\`\`\`

---

**Reasons NOT to use native queries:**

- Loses **database portability** (locks you to one DB)
- Loses **type-safety** of JPQL entity references
- Hibernate cannot **dialect-translate** them
- Returns may need manual mapping to entities/DTOs
- **No second-level cache benefit**
- **No automatic dirty checking** for results

---

**Pagination requires a \`countQuery\`:**

\`\`\`java
@Query(value      = "SELECT * FROM users WHERE active = true",
       countQuery = "SELECT COUNT(*) FROM users WHERE active = true",
       nativeQuery = true)
Page<User> findActive(Pageable pageable);
\`\`\`

**Mapping to a DTO with \`@SqlResultSetMapping\`:**

\`\`\`java
@SqlResultSetMapping(
    name = "UserSummaryMapping",
    classes = @ConstructorResult(
        targetClass = UserSummary.class,
        columns = {
            @ColumnResult(name = "id", type = Long.class),
            @ColumnResult(name = "name", type = String.class)
        }
    )
)
\`\`\`

**Best practices:**
- Use **JPQL by default**; only switch to native when JPQL is too limited or too slow
- Always parameterize (\`:param\`) — never concatenate user input
- Keep native queries in repositories, not scattered through the codebase
- Document **why** native was needed — easier to revisit later`
    },
    {
      id: 11,
      category: 'Performance',
      difficulty: 'Medium',
      question: 'How do you perform a batch insert in Spring Data JPA? Inserting 100+ rows efficiently',
      answer: `**Problem:** \`saveAll(list)\` of 100 entities by default issues 100 separate INSERT round-trips. With batching configured properly, those collapse into 2–5 round-trips.

---

**Step 1 — Enable JDBC batching in \`application.properties\`:**

\`\`\`properties
spring.jpa.properties.hibernate.jdbc.batch_size=50
spring.jpa.properties.hibernate.order_inserts=true
spring.jpa.properties.hibernate.order_updates=true
spring.jpa.properties.hibernate.jdbc.batch_versioned_data=true

# Add to JDBC URL for PostgreSQL/MySQL — required for true batching
spring.datasource.url=jdbc:postgresql://localhost/db?reWriteBatchedInserts=true
\`\`\`

\`reWriteBatchedInserts=true\` rewrites \`N\` separate INSERTs into a **single multi-row INSERT** — a huge speedup.

---

**Step 2 — Don't use \`GenerationType.IDENTITY\`:**

\`\`\`java
// BAD — IDENTITY forces immediate per-row INSERT to get the generated ID
@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
\`\`\`

\`\`\`java
// GOOD — SEQUENCE batches IDs and INSERTs
@Id
@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
@SequenceGenerator(name = "user_seq", sequenceName = "user_seq", allocationSize = 50)
private Long id;
\`\`\`

---

**Step 3 — Write the batch correctly (flush + clear every N):**

\`\`\`java
@PersistenceContext
EntityManager em;

@Transactional
public void bulkInsert(List<User> users) {
    int batchSize = 50;
    for (int i = 0; i < users.size(); i++) {
        em.persist(users.get(i));

        if (i > 0 && i % batchSize == 0) {
            em.flush();   // send INSERTs to DB
            em.clear();   // detach managed entities (frees memory, avoids OOM)
        }
    }
    em.flush();           // final batch
    em.clear();
}
\`\`\`

**Why flush + clear?**
Without \`em.clear()\`, every entity stays in the first-level cache. With 100k rows, this is ~100k objects in memory plus growing dirty-checking cost. \`clear()\` detaches them.

---

**Step 4 — Don't use \`saveAndFlush\` in a loop:**

\`\`\`java
// BAD — defeats batching, immediate per-row round-trip
for (User u : users) {
    userRepo.saveAndFlush(u);
}

// OK — batches at commit
userRepo.saveAll(users);
\`\`\`

\`saveAll()\` is fine **once batching is configured** — it just calls \`save()\` in a loop.

---

**Verifying that batching is actually working:**

Enable Hibernate statistics:
\`\`\`properties
spring.jpa.properties.hibernate.generate_statistics=true
logging.level.org.hibernate.stat=DEBUG
\`\`\`

Look for: \`JDBC batches: 2\` (not \`JDBC executions: 100\`).

Or watch the DB: with PostgreSQL \`reWriteBatchedInserts=true\`, you should see one big INSERT with all values.

---

**Alternative — JdbcTemplate for max performance (skip JPA entirely):**

\`\`\`java
jdbc.batchUpdate(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    users,
    50,
    (ps, user) -> {
        ps.setString(1, user.getName());
        ps.setString(2, user.getEmail());
    }
);
\`\`\`

When inserting **millions** of rows for ETL/import, this is significantly faster than JPA.

---

**Alternative — \`StatelessSession\` for ORM-aware bulk loads without the overhead:**

\`\`\`java
StatelessSession ss = sessionFactory.openStatelessSession();
Transaction tx = ss.beginTransaction();
for (User u : users) ss.insert(u);
tx.commit();
ss.close();
\`\`\`

No first-level cache, no dirty checking, no cascades — just fast INSERTs.

---

**Best practices:**
- Set \`batch_size\` between 20 and 100
- Use \`SEQUENCE\`, never \`IDENTITY\`, for batched inserts
- Enable \`reWriteBatchedInserts=true\` (Postgres) or \`rewriteBatchedStatements=true\` (MySQL) in the JDBC URL
- Always \`flush() + clear()\` periodically in big loops
- For one-off ETL of millions of rows, use \`JdbcTemplate.batchUpdate\` instead of JPA`
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

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

      <CollapsibleSidebar
        items={displayQuestions}
        selectedIndex={expandedQuestionId ? displayQuestions.findIndex(q => q.id === expandedQuestionId) : -1}
        onSelect={(index) => setExpandedQuestionId(displayQuestions[index].id)}
        title="Questions"
        getItemLabel={(item) => `${item.id}. ${item.category}`}
        getItemIcon={() => '❓'}
        primaryColor="#3b82f6"
      />

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
          const color = cat === 'All' ? '#3b82f6' : '#3b82f6'
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

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        {displayQuestions.map((q) => (
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div onClick={(e) => e.stopPropagation()} style={{ transform: 'scale(0.85)' }}>
                    <CompletionCheckbox problemId={`SpringDataJPAQuestions-${q.id}`} />
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

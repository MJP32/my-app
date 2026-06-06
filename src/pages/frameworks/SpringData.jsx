import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

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
      .replace(/\b(String|List|ArrayList|Map|HashMap|Set|HashSet|Optional|Exception|Override|Integer|Long|BigDecimal|Component|Bean|Configuration|Autowired|Service|Repository|RestController|GetMapping|PostMapping|PutMapping|DeleteMapping|RequestMapping|PathVariable|RequestParam|RequestBody|ResponseEntity|Entity|Table|Id|GeneratedValue|GenerationType|Column|OneToMany|ManyToOne|OneToOne|ManyToMany|JoinColumn|JoinTable|CrudRepository|JpaRepository|PagingAndSortingRepository|Repository|Query|Param|Modifying|Transactional|EntityManager|PersistenceContext|Page|Pageable|Slice|Sort|PageRequest|Specification|Predicate|Root|CriteriaBuilder|CriteriaQuery|Join|EntityGraph|NamedQuery|EntityListeners|CreatedDate|LastModifiedDate|CreatedBy|LastModifiedBy|EnableJpaAuditing|AuditorAware|MappedSuperclass|EnableJpaRepositories|SpringBootApplication|SpringApplication|Instant|LocalDate|LocalDateTime|UUID|Stream)\b/g, '<span style="color: #4ec9b0;">$1</span>')
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

const cardStyle = {
  background: 'linear-gradient(to bottom right, #1f2937, #111827)',
  padding: '2rem',
  borderRadius: '12px',
  border: '1px solid #374151'
}

const codeBlockStyle = {
  backgroundColor: '#1e1e1e',
  padding: '1.25rem',
  borderRadius: '8px',
  border: '1px solid #374151'
}

function SpringData({ onBack, breadcrumb }) {
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #064e3b, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
              background: 'rgba(16, 185, 129, 0.2)',
              color: '#6ee7b7',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(16, 185, 129, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(16, 185, 129, 0.2)'
            }}
          >
            &larr; Back
          </button>
        </div>

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

        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '0.5rem',
          background: 'linear-gradient(to right, #6ee7b7, #34d399)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Spring Data
        </h1>
        <p style={{ color: '#d1d5db', textAlign: 'center', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Repositories, query derivation, pagination, and dynamic queries on top of JPA
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
            { id: 'overview', label: 'Overview' },
            { id: 'repositories', label: 'Repositories' },
            { id: 'queries', label: 'Query Methods' },
            { id: 'pagination', label: 'Pagination & Sort' },
            { id: 'specifications', label: 'Specifications' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '0.95rem',
                fontWeight: '600',
                backgroundColor: activeSection === tab.id ? '#10b981' : 'transparent',
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

        {/* OVERVIEW */}
        {activeSection === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                What is Spring Data?
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                Spring Data is an umbrella project that simplifies data access across many stores (relational, NoSQL,
                in-memory, search). The most-used module is <strong>Spring Data JPA</strong>, which lets you declare
                a repository interface and get a working implementation at runtime &mdash; no implementation class to write,
                no JDBC boilerplate.
              </p>
              <div style={{
                backgroundColor: '#064e3b',
                padding: '1rem',
                borderRadius: '8px',
                borderLeft: '4px solid #10b981'
              }}>
                <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
                  <strong>Core idea:</strong> declare <code>interface UserRepository extends JpaRepository&lt;User, Long&gt;</code>
                  and Spring generates the implementation &mdash; CRUD, derived queries from method names, pagination, sorting, and more.
                </p>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#d1d5db', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                Maven / Gradle Dependency
              </h3>
              <div style={codeBlockStyle}>
                <SyntaxHighlighter code={`// build.gradle
dependencies {
    implementation "org.springframework.boot:spring-boot-starter-data-jpa"
    runtimeOnly "org.postgresql:postgresql"        // or your driver
}

// Or Maven pom.xml
// <dependency>
//     <groupId>org.springframework.boot</groupId>
//     <artifactId>spring-boot-starter-data-jpa</artifactId>
// </dependency>`} />
              </div>
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Spring Data Modules
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                {[
                  { icon: '\u{1F4E6}', title: 'Spring Data JPA', desc: 'Relational databases via JPA/Hibernate. The most common module.' },
                  { icon: '\u{1F343}', title: 'Spring Data MongoDB', desc: 'MongoDB document store with the same repository abstraction.' },
                  { icon: '\u{26A1}', title: 'Spring Data Redis', desc: 'Key-value, pub/sub, and Redis-backed caching.' },
                  { icon: '\u{1F50D}', title: 'Spring Data Elasticsearch', desc: 'Full-text search and indexing on Elasticsearch.' },
                  { icon: '\u{1F310}', title: 'Spring Data REST', desc: 'Auto-expose repositories as HATEOAS-compliant REST endpoints.' },
                  { icon: '\u{1F4CA}', title: 'Spring Data Cassandra', desc: 'Wide-column store via Cassandra Query Language.' }
                ].map((feature, index) => (
                  <div key={index} style={{
                    backgroundColor: '#1f2937',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    border: '1px solid #374151'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{feature.icon}</div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.5rem' }}>
                      {feature.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#9ca3af', margin: 0 }}>
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Minimal Working Example
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                Entity + repository interface + service. That's it &mdash; no SQL, no DAO class, no JDBC.
              </p>
              <div style={codeBlockStyle}>
                <SyntaxHighlighter code={`@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    private String name;
    // getters & setters
}

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByNameContainingIgnoreCase(String fragment);
}

@Service
public class UserService {

    private final UserRepository userRepo;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public User register(String email, String name) {
        User u = new User();
        u.setEmail(email);
        u.setName(name);
        return userRepo.save(u);          // INSERT + return managed entity with generated id
    }

    public Optional<User> lookup(String email) {
        return userRepo.findByEmail(email);  // SELECT * FROM users WHERE email = ?
    }
}`} />
              </div>
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                What Spring Data Gives You
              </h2>
              <ul style={{ color: '#d1d5db', lineHeight: '2', paddingLeft: '1.5rem', margin: 0 }}>
                <li><strong>Generated repository implementations</strong> &mdash; no implementation class to write</li>
                <li><strong>Derived query methods</strong> &mdash; <code>findByEmailAndActiveTrue(...)</code> turns into SQL automatically</li>
                <li><strong><code>@Query</code></strong> &mdash; JPQL or native SQL when method names aren't enough</li>
                <li><strong>Pagination &amp; sorting</strong> &mdash; <code>Pageable</code>/<code>Page</code>/<code>Slice</code></li>
                <li><strong>Specifications &amp; Querydsl</strong> &mdash; type-safe dynamic queries</li>
                <li><strong>Projections</strong> &mdash; return DTOs instead of full entities</li>
                <li><strong>Auditing</strong> &mdash; <code>@CreatedDate</code>, <code>@LastModifiedBy</code></li>
                <li><strong>Transactions</strong> &mdash; <code>@Transactional</code> integration</li>
              </ul>
            </div>
          </div>
        )}

        {/* REPOSITORIES */}
        {activeSection === 'repositories' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                The Repository Hierarchy
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                Pick the interface that gives you the smallest API surface you need. They build on each other:
              </p>
              <div style={codeBlockStyle}>
                <SyntaxHighlighter code={`Repository<T, ID>                       // marker interface, no methods
    └─ CrudRepository<T, ID>             // save, findById, deleteById, count, ...
         └─ PagingAndSortingRepository<T, ID>   // + findAll(Pageable), findAll(Sort)
              └─ JpaRepository<T, ID>              // + flush, saveAndFlush, deleteAllInBatch,
                                                        //   getReferenceById, batch operations`} />
              </div>
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Methods You Get For Free
              </h2>
              <div style={codeBlockStyle}>
                <SyntaxHighlighter code={`public interface UserRepository extends JpaRepository<User, Long> {
    // no methods declared — you still get all of these:
}

// CrudRepository:
userRepo.save(user);                    // INSERT or UPDATE
userRepo.saveAll(users);                // batched save
Optional<User> u = userRepo.findById(1L);
boolean exists = userRepo.existsById(1L);
List<User> all = userRepo.findAll();
long n = userRepo.count();
userRepo.deleteById(1L);
userRepo.delete(user);
userRepo.deleteAll();

// PagingAndSortingRepository:
Page<User> page = userRepo.findAll(PageRequest.of(0, 20));
List<User> sorted = userRepo.findAll(Sort.by("createdAt").descending());

// JpaRepository extras:
userRepo.flush();                       // force pending SQL to DB
userRepo.saveAndFlush(user);            // INSERT/UPDATE now (still uncommitted)
userRepo.deleteAllInBatch();            // single DELETE FROM, no per-row events
User proxy = userRepo.getReferenceById(1L);  // lazy proxy, no SELECT until used`} />
              </div>
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                CrudRepository vs JpaRepository
              </h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#1f2937' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left', color: '#10b981', borderBottom: '2px solid #10b981' }}>Method</th>
                      <th style={{ padding: '0.75rem', textAlign: 'center', color: '#10b981', borderBottom: '2px solid #10b981' }}>CrudRepository</th>
                      <th style={{ padding: '0.75rem', textAlign: 'center', color: '#10b981', borderBottom: '2px solid #10b981' }}>JpaRepository</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['save / findById / delete', 'YES', 'YES'],
                      ['findAll() return type', 'Iterable', 'List'],
                      ['flush()', '—', 'YES'],
                      ['saveAndFlush()', '—', 'YES'],
                      ['deleteAllInBatch()', '—', 'YES'],
                      ['getReferenceById()', '—', 'YES'],
                      ['Pagination & Sort', '—', 'YES (via parent)']
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #374151' }}>
                        {row.map((cell, j) => (
                          <td key={j} style={{
                            padding: '0.6rem 0.75rem',
                            color: cell === 'YES' ? '#34d399' : cell === '—' ? '#6b7280' : '#d1d5db',
                            textAlign: j === 0 ? 'left' : 'center'
                          }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '1rem' }}>
                <strong>Rule of thumb:</strong> use <code>JpaRepository</code> for any JPA-backed app. Use
                <code> CrudRepository</code> only if you want to keep the API surface small and DB-agnostic.
              </p>
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Custom Repository Implementation
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                When a query needs <code>EntityManager</code>, joins to non-mapped tables, or imperative logic, split it
                into a custom fragment and Spring Data weaves them together.
              </p>
              <div style={codeBlockStyle}>
                <SyntaxHighlighter code={`// 1. Fragment interface
public interface UserRepositoryCustom {
    List<User> searchActiveByEmailPrefix(String prefix, int limit);
}

// 2. Fragment implementation (suffix must be "Impl" by default)
public class UserRepositoryCustomImpl implements UserRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<User> searchActiveByEmailPrefix(String prefix, int limit) {
        return em.createQuery(
                "SELECT u FROM User u WHERE u.active = true AND u.email LIKE :p",
                User.class)
            .setParameter("p", prefix + "%")
            .setMaxResults(limit)
            .getResultList();
    }
}

// 3. Compose into the main repository
public interface UserRepository
        extends JpaRepository<User, Long>, UserRepositoryCustom {
    // built-in + derived + custom methods all in one place
}`} />
              </div>
            </div>
          </div>
        )}

        {/* QUERY METHODS */}
        {activeSection === 'queries' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Derived Query Methods
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                Spring Data parses your method name and generates the query. Format:
                <code> findBy / readBy / queryBy / countBy / existsBy + Property + (Operator) + (And/Or + ...)</code>.
              </p>
              <div style={codeBlockStyle}>
                <SyntaxHighlighter code={`public interface UserRepository extends JpaRepository<User, Long> {

    // ---- Lookups ----
    Optional<User> findByEmail(String email);
    User findFirstByEmail(String email);

    // ---- Boolean operators ----
    List<User> findByActiveTrue();
    List<User> findByActiveTrueAndCountryEquals(String country);
    List<User> findByEmailOrUsername(String email, String username);

    // ---- String matching ----
    List<User> findByNameContainingIgnoreCase(String fragment);
    List<User> findByEmailStartingWith(String prefix);
    List<User> findByEmailEndingWith(String suffix);

    // ---- Numeric ranges ----
    List<User> findByAgeBetween(int min, int max);
    List<User> findByAgeGreaterThanEqual(int min);

    // ---- Date / null ----
    List<User> findByCreatedAtAfter(Instant since);
    List<User> findByDeletedAtIsNull();

    // ---- Collections ----
    List<User> findByIdIn(Collection<Long> ids);

    // ---- Ordering & limits ----
    List<User> findByActiveTrueOrderByCreatedAtDesc();
    List<User> findTop10ByOrderByScoreDesc();
    List<User> findFirst5ByCountryOrderByNameAsc(String country);

    // ---- Counting / existence ----
    long countByActiveTrue();
    boolean existsByEmail(String email);

    // ---- Deletion (requires @Modifying + @Transactional in callers) ----
    long deleteByDeletedAtBefore(Instant cutoff);
}`} />
              </div>
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                @Query &mdash; JPQL
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                When the method name would be unreadable, fall back to JPQL. Parameter binding by name or position &mdash;
                never concatenate input.
              </p>
              <div style={codeBlockStyle}>
                <SyntaxHighlighter code={`public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT o FROM Order o WHERE o.customer.id = :cid AND o.total > :min")
    List<Order> bigOrdersForCustomer(@Param("cid") Long customerId,
                                     @Param("min") BigDecimal min);

    @Query("SELECT new com.app.OrderSummary(o.id, o.total) FROM Order o WHERE o.status = 'OPEN'")
    List<OrderSummary> openOrderSummaries();

    @Query("SELECT o FROM Order o JOIN FETCH o.items WHERE o.id = :id")
    Optional<Order> findByIdWithItems(@Param("id") Long id);
}`} />
              </div>
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                @Query &mdash; Native SQL
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                Use when JPQL can't express what you need (DB-specific features, window functions, JSON operators).
              </p>
              <div style={codeBlockStyle}>
                <SyntaxHighlighter code={`@Query(value = """
    SELECT * FROM users
    WHERE preferences @> CAST(:filter AS jsonb)
    ORDER BY created_at DESC
    """, nativeQuery = true)
List<User> findByPreferenceJson(@Param("filter") String filter);

// Native pagination requires a separate countQuery
@Query(value      = "SELECT * FROM users WHERE active = true",
       countQuery = "SELECT count(*) FROM users WHERE active = true",
       nativeQuery = true)
Page<User> findActive(Pageable pageable);`} />
              </div>
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                @Modifying &mdash; Bulk Updates &amp; Deletes
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                Any <code>UPDATE</code>/<code>DELETE</code>/<code>INSERT</code> query needs <code>@Modifying</code> and must
                run inside a transaction. By default the persistence context is <em>not</em> flushed or cleared &mdash; managed
                entities can become stale.
              </p>
              <div style={codeBlockStyle}>
                <SyntaxHighlighter code={`@Modifying(clearAutomatically = true, flushAutomatically = true)
@Transactional
@Query("UPDATE User u SET u.lastSeen = :ts WHERE u.id IN :ids")
int updateLastSeen(@Param("ids") List<Long> ids, @Param("ts") Instant ts);

@Modifying
@Transactional
@Query("DELETE FROM Session s WHERE s.expiresAt < :cutoff")
int deleteExpired(@Param("cutoff") Instant cutoff);`} />
              </div>
            </div>
          </div>
        )}

        {/* PAGINATION & SORT */}
        {activeSection === 'pagination' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Pageable, Page, and Slice
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                Add a <code>Pageable</code> parameter to any repository method. Return <code>Page&lt;T&gt;</code> for total
                counts (extra COUNT query), or <code>Slice&lt;T&gt;</code> for infinite-scroll style (no count).
              </p>
              <div style={codeBlockStyle}>
                <SyntaxHighlighter code={`public interface UserRepository extends JpaRepository<User, Long> {
    Page<User> findByActiveTrue(Pageable pageable);
    Slice<User> findByCountry(String country, Pageable pageable);
}

// Caller
Pageable p = PageRequest.of(0, 20);
Page<User> page = userRepo.findByActiveTrue(p);

page.getContent();          // List<User> for this page
page.getTotalElements();    // total matching rows (extra COUNT)
page.getTotalPages();
page.getNumber();            // current page (0-indexed)
page.hasNext();
page.isLast();

// Underlying SQL
// SELECT * FROM users WHERE active = true ORDER BY id LIMIT 20 OFFSET 0;
// SELECT COUNT(*) FROM users WHERE active = true;`} />
              </div>
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Sorting
              </h2>
              <div style={codeBlockStyle}>
                <SyntaxHighlighter code={`// Single field
Pageable p = PageRequest.of(0, 20, Sort.by("createdAt").descending());

// Multi-field with NULL handling
Sort sort = Sort.by(
    Sort.Order.asc("lastName"),
    Sort.Order.desc("createdAt").nullsLast()
);
PageRequest.of(0, 20, sort);

// Navigate into related entities
Sort joined = Sort.by("address.city");`} />
              </div>
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                REST Controller Integration
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                Spring auto-binds query params <code>?page=0&amp;size=20&amp;sort=name,asc</code> to a
                <code> Pageable</code> argument.
              </p>
              <div style={codeBlockStyle}>
                <SyntaxHighlighter code={`@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepo;

    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping
    public Page<User> list(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        return userRepo.findAll(pageable);
    }
}

// GET /users?page=0&size=20&sort=name,asc&sort=age,desc

// Cap the maximum page size globally:
// application.properties
// spring.data.web.pageable.default-page-size=20
// spring.data.web.pageable.max-page-size=100`} />
              </div>
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Page vs Slice
              </h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#1f2937' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left', color: '#10b981', borderBottom: '2px solid #10b981' }}>Aspect</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', color: '#10b981', borderBottom: '2px solid #10b981' }}>Page&lt;T&gt;</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', color: '#10b981', borderBottom: '2px solid #10b981' }}>Slice&lt;T&gt;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Total element count', 'YES (extra COUNT query)', 'NO'],
                      ['hasNext()', 'Computed from total', 'Over-fetch by 1 to detect'],
                      ['Performance', 'Slower (count query)', 'Faster'],
                      ['Best for', '"Page X of Y" UI', 'Infinite scroll / "Next" only']
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #374151' }}>
                        {row.map((cell, j) => (
                          <td key={j} style={{ padding: '0.6rem 0.75rem', color: '#d1d5db' }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                The OFFSET Problem &amp; Keyset Pagination
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                <code>LIMIT 20 OFFSET 100000</code> still scans 100,020 rows. Deep pagination is slow. For large datasets,
                use <strong>keyset (cursor) pagination</strong>: paginate by the last seen ID instead of an offset.
              </p>
              <div style={codeBlockStyle}>
                <SyntaxHighlighter code={`@Query("SELECT u FROM User u WHERE u.id > :lastId ORDER BY u.id ASC")
List<User> findNextBatch(@Param("lastId") Long lastId, Pageable pageable);

// First page:    lastId = 0
// Subsequent:    lastId = last item's id from the previous page
// Index seek is O(log N) regardless of page depth.`} />
              </div>
            </div>
          </div>
        )}

        {/* SPECIFICATIONS */}
        {activeSection === 'specifications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Why Specifications?
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                Derived methods and <code>@Query</code> work for static queries. For <strong>dynamic search</strong>
                &mdash; where filters are optional and combine arbitrarily &mdash; string-building JPQL gets messy fast.
                Specifications give you a type-safe, composable wrapper over the JPA Criteria API.
              </p>
              <div style={{
                backgroundColor: '#064e3b',
                padding: '1rem',
                borderRadius: '8px',
                borderLeft: '4px solid #10b981'
              }}>
                <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
                  <strong>Use case:</strong> a search endpoint where each query param is optional &mdash; user filters by
                  any combination of name, country, status, date range.
                </p>
              </div>
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Step 1 &mdash; Extend JpaSpecificationExecutor
              </h2>
              <div style={codeBlockStyle}>
                <SyntaxHighlighter code={`public interface UserRepository
        extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
}

// You now have:
//   findAll(Specification<User> spec)
//   findAll(Specification<User> spec, Pageable pageable)
//   findAll(Specification<User> spec, Sort sort)
//   findOne(Specification<User> spec)
//   count(Specification<User> spec)`} />
              </div>
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Step 2 &mdash; Build Reusable Specifications
              </h2>
              <div style={codeBlockStyle}>
                <SyntaxHighlighter code={`public class UserSpecs {

    public static Specification<User> nameLike(String fragment) {
        return (root, query, cb) ->
            cb.like(cb.lower(root.get("name")), "%" + fragment.toLowerCase() + "%");
    }

    public static Specification<User> inCountry(String country) {
        return (root, query, cb) ->
            cb.equal(root.get("country"), country);
    }

    public static Specification<User> isActive() {
        return (root, query, cb) ->
            cb.isTrue(root.get("active"));
    }

    public static Specification<User> createdAfter(Instant since) {
        return (root, query, cb) ->
            cb.greaterThanOrEqualTo(root.get("createdAt"), since);
    }
}`} />
              </div>
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Step 3 &mdash; Compose Dynamically
              </h2>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
                Only filters that the caller actually provided get ANDed into the final query. No string concatenation,
                no rogue ANDs, no SQL injection risk.
              </p>
              <div style={codeBlockStyle}>
                <SyntaxHighlighter code={`public Page<User> search(UserSearchCriteria c, Pageable pageable) {

    Specification<User> spec = Specification.where(null);

    if (c.getNameFragment() != null)
        spec = spec.and(UserSpecs.nameLike(c.getNameFragment()));

    if (c.getCountry() != null)
        spec = spec.and(UserSpecs.inCountry(c.getCountry()));

    if (Boolean.TRUE.equals(c.getOnlyActive()))
        spec = spec.and(UserSpecs.isActive());

    if (c.getSince() != null)
        spec = spec.and(UserSpecs.createdAfter(c.getSince()));

    return userRepo.findAll(spec, pageable);
}`} />
              </div>
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Joins in Specifications
              </h2>
              <div style={codeBlockStyle}>
                <SyntaxHighlighter code={`public static Specification<Order> placedByCountry(String country) {
    return (root, query, cb) -> {
        Join<Order, Customer> customer = root.join("customer");
        return cb.equal(customer.get("country"), country);
    };
}

// For Page<T> with joins, Spring runs the COUNT query separately.
// Avoid JOIN FETCH inside a count query — use a CriteriaQuery.getResultType() check:
public static Specification<Order> withItemsFetched() {
    return (root, query, cb) -> {
        if (query.getResultType() != Long.class && query.getResultType() != long.class) {
            root.fetch("items", JoinType.LEFT);
        }
        return cb.conjunction();
    };
}`} />
              </div>
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
                Specifications vs Querydsl vs @Query
              </h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#1f2937' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left', color: '#10b981', borderBottom: '2px solid #10b981' }}>Approach</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', color: '#10b981', borderBottom: '2px solid #10b981' }}>Best For</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', color: '#10b981', borderBottom: '2px solid #10b981' }}>Type-safe?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Derived methods', 'Simple static lookups', 'Yes (method names)'],
                      ['@Query (JPQL)', 'Known static queries', 'No (string)'],
                      ['Specifications', 'Optional filters / search', 'Partial (string field names)'],
                      ['Querydsl', 'Heavy dynamic queries', 'Yes (Q-classes)']
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #374151' }}>
                        {row.map((cell, j) => (
                          <td key={j} style={{ padding: '0.6rem 0.75rem', color: '#d1d5db' }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '1rem' }}>
                Use the JPA Metamodel (<code>User_</code>) to make Specifications fully type-safe without string literals.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SpringData

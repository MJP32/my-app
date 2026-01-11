import { useState, useEffect, useRef } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

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
      .replace(/\b(String|List|ArrayList|HashMap|Optional|Stream|Exception|RuntimeException)\b/g, '<span style="color: #4ec9b0;">$1</span>')
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

function SecurityOWASP({ onBack, breadcrumb }) {
  const [selectedTopic, setSelectedTopic] = useState(null)

  const securityTopics = [
    {
      id: 1,
      name: 'OWASP Top 10',
      icon: '🔟',
      color: '#ef4444',
      description: 'Critical web application security risks',
      content: {
        explanation: 'The OWASP Top 10 is the industry standard for critical web application security risks. Understanding these vulnerabilities is essential for building secure applications. Each risk represents common attack vectors that can lead to data breaches, system compromise, or service disruption. Regular security assessments should check for all Top 10 vulnerabilities.',
        keyPoints: [
          'A01 Broken Access Control - 94% of apps tested had some form of broken access control',
          'A02 Cryptographic Failures - formerly Sensitive Data Exposure, includes SSL/TLS issues',
          'A03 Injection - SQL, NoSQL, OS command, LDAP injections remain critical',
          'A04 Insecure Design - missing or ineffective control design flaws',
          'A05 Security Misconfiguration - default configs, incomplete setups, cloud storage misconfigs',
          'A06 Vulnerable and Outdated Components - using components with known vulnerabilities',
          'A07 Identification and Authentication Failures - broken authentication, session management',
          'A08 Software and Data Integrity Failures - insecure deserialization, untrusted updates',
          'A09 Security Logging and Monitoring Failures - insufficient logging, delayed breach detection',
          'A10 Server-Side Request Forgery (SSRF) - fetching remote resources without validation'
        ],
        codeExample: `// A01: Broken Access Control Prevention
@RestController
@RequestMapping("/api/documents")
public class DocumentController {

  @GetMapping("/{id}")
  @PreAuthorize("hasPermission(#id, 'Document', 'READ')")
  public Document getDocument(@PathVariable Long id, Authentication auth) {
    // GOOD: Check ownership before returning
    Document doc = documentRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException());

    if (!doc.getOwnerId().equals(auth.getName())) {
      throw new AccessDeniedException("Not authorized");
    }
    return doc;
  }

  // BAD: No access control check
  @GetMapping("/bad/{id}")
  public Document getDocumentBad(@PathVariable Long id) {
    return documentRepository.findById(id).orElseThrow();
  }
}

// A03: SQL Injection Prevention
public class UserRepository {

  // BAD: SQL Injection vulnerable
  public User findByEmailBad(String email) {
    String sql = "SELECT * FROM users WHERE email = '" + email + "'";
    // Attacker input: ' OR '1'='1
    return jdbcTemplate.queryForObject(sql, userRowMapper);
  }

  // GOOD: Parameterized query
  public User findByEmailGood(String email) {
    String sql = "SELECT * FROM users WHERE email = ?";
    return jdbcTemplate.queryForObject(sql, userRowMapper, email);
  }

  // BEST: JPA/Hibernate
  @Query("SELECT u FROM User u WHERE u.email = :email")
  Optional<User> findByEmail(@Param("email") String email);
}

// A02: Cryptographic Failures Prevention
@Configuration
public class SecurityConfig {

  // GOOD: Strong TLS configuration
  @Bean
  public EmbeddedServletContainerCustomizer containerCustomizer() {
    return container -> {
      Ssl ssl = new Ssl();
      ssl.setEnabled(true);
      ssl.setProtocol("TLSv1.3");
      ssl.setCiphers(new String[]{
        "TLS_AES_256_GCM_SHA384",
        "TLS_AES_128_GCM_SHA256"
      });
      ssl.setKeyStore("classpath:keystore.jks");
      ssl.setKeyStorePassword("changeit");
      container.setSsl(ssl);
    };
  }
}

// A05: Security Misconfiguration Prevention
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      // Disable default credentials
      .csrf(csrf -> csrf.csrfTokenRepository(
        CookieCsrfTokenRepository.withHttpOnlyFalse()
      ))
      // Strict transport security
      .headers(headers -> headers
        .httpStrictTransportSecurity(hsts -> hsts
          .includeSubDomains(true)
          .maxAgeInSeconds(31536000)
        )
        .contentSecurityPolicy(csp -> csp
          .policyDirectives("default-src 'self'")
        )
      )
      // Remove version headers
      .headers().frameOptions().deny()
      .and()
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/public/**").permitAll()
        .anyRequest().authenticated()
      );

    return http.build();
  }
}

// A07: Authentication Failures Prevention
@Service
public class AuthenticationService {

  private final PasswordEncoder passwordEncoder;
  private final LoginAttemptService loginAttemptService;

  public void authenticate(String username, String password) {
    // Check if account is locked due to failed attempts
    if (loginAttemptService.isBlocked(username)) {
      throw new AccountLockedException("Too many failed attempts");
    }

    User user = userRepository.findByUsername(username)
      .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));

    // Use BCrypt password verification
    if (!passwordEncoder.matches(password, user.getPassword())) {
      loginAttemptService.loginFailed(username);
      throw new BadCredentialsException("Invalid credentials");
    }

    loginAttemptService.loginSucceeded(username);
  }
}

// A10: SSRF Prevention
@RestController
public class ImageProxyController {

  private static final List<String> ALLOWED_DOMAINS =
    Arrays.asList("trusted.com", "api.example.com");

  @GetMapping("/proxy/image")
  public ResponseEntity<byte[]> proxyImage(@RequestParam String url) {
    // GOOD: Validate URL before fetching
    try {
      URL targetUrl = new URL(url);

      // Check if domain is whitelisted
      if (!ALLOWED_DOMAINS.contains(targetUrl.getHost())) {
        throw new SecurityException("Domain not allowed");
      }

      // Prevent access to internal resources
      InetAddress address = InetAddress.getByName(targetUrl.getHost());
      if (address.isLoopbackAddress() || address.isLinkLocalAddress()) {
        throw new SecurityException("Cannot access internal resources");
      }

      // Fetch with timeout
      RestTemplate restTemplate = new RestTemplate();
      restTemplate.setRequestFactory(createRequestFactory(5000));
      byte[] imageBytes = restTemplate.getForObject(targetUrl.toURI(), byte[].class);

      return ResponseEntity.ok(imageBytes);
    } catch (Exception e) {
      throw new SecurityException("Invalid URL");
    }
  }
}`
      }
    },
    {
      id: 2,
      name: 'Secure Coding',
      icon: '🔒',
      color: '#3b82f6',
      description: 'Secure coding practices and principles',
      content: {
        explanation: 'Secure coding practices prevent vulnerabilities at the code level. Input validation ensures data meets expected format and constraints. Output encoding prevents injection attacks. Parameterized queries eliminate SQL injection. Secure defaults reduce misconfiguration risks. The principle of least privilege limits damage from compromised components. Defense in depth provides multiple security layers.',
        keyPoints: [
          'Input validation - validate all input at boundaries, whitelist over blacklist',
          'Output encoding - context-aware encoding for HTML, JavaScript, SQL, LDAP',
          'Parameterized queries - use prepared statements, never concatenate SQL',
          'Secure defaults - fail securely, deny by default, secure out-of-the-box',
          'Principle of least privilege - minimum necessary permissions',
          'Defense in depth - multiple layers of security controls'
        ],
        codeExample: `// Input Validation
@RestController
public class UserController {

  @PostMapping("/users")
  public User createUser(@Valid @RequestBody UserRequest request) {
    // Validation happens automatically via @Valid
    return userService.createUser(request);
  }
}

public class UserRequest {

  @NotBlank(message = "Email is required")
  @Email(message = "Email must be valid")
  private String email;

  @NotBlank(message = "Name is required")
  @Size(min = 2, max = 100, message = "Name must be 2-100 characters")
  @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Name contains invalid characters")
  private String name;

  @NotBlank(message = "Password is required")
  @Size(min = 8, max = 72, message = "Password must be 8-72 characters")
  @Pattern(
    regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$",
    message = "Password must contain uppercase, lowercase, digit, and special character"
  )
  private String password;

  @Min(value = 18, message = "Must be 18 or older")
  @Max(value = 150, message = "Age must be realistic")
  private Integer age;
}

// Custom validator
public class EmailValidator implements ConstraintValidator<ValidEmail, String> {

  private static final Pattern EMAIL_PATTERN = Pattern.compile(
    "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"
  );

  @Override
  public boolean isValid(String email, ConstraintValidatorContext context) {
    if (email == null || email.isEmpty()) {
      return false;
    }

    // Additional checks beyond regex
    if (email.length() > 254) return false;
    if (email.contains("..")) return false;

    return EMAIL_PATTERN.matcher(email).matches();
  }
}

// Output Encoding
@Service
public class ContentService {

  // HTML encoding
  public String renderUserContent(String userInput) {
    return HtmlUtils.htmlEscape(userInput);
  }

  // JavaScript encoding
  public String renderInJavaScript(String userInput) {
    return JavaScriptUtils.javaScriptEscape(userInput);
  }

  // URL encoding
  public String buildUrl(String userParam) {
    try {
      return URLEncoder.encode(userParam, StandardCharsets.UTF_8.toString());
    } catch (UnsupportedEncodingException e) {
      throw new RuntimeException(e);
    }
  }
}

// Parameterized Queries - JPA
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  // GOOD: Named parameter
  @Query("SELECT u FROM User u WHERE u.email = :email AND u.active = :active")
  Optional<User> findByEmailAndActive(
    @Param("email") String email,
    @Param("active") boolean active
  );

  // GOOD: Method name query
  List<User> findByNameContainingAndAgeGreaterThan(String name, int age);

  // GOOD: Native query with parameters
  @Query(value = "SELECT * FROM users WHERE created_date > ?1", nativeQuery = true)
  List<User> findRecentUsers(LocalDate date);
}

// Secure Defaults
@Configuration
public class SecurityDefaults {

  @Bean
  public SecurityFilterChain defaultSecurity(HttpSecurity http) throws Exception {
    http
      // Deny all by default
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/", "/public/**").permitAll()
        .anyRequest().authenticated()
      )
      // Secure session management
      .sessionManagement(session -> session
        .sessionCreationPolicy(SessionCreationPolicy.STATEFUL)
        .maximumSessions(1)
        .maxSessionsPreventsLogin(true)
      )
      // Enable all security headers by default
      .headers(headers -> headers
        .defaultsDisabled()
        .cacheControl(cache -> {})
        .contentTypeOptions(cto -> {})
        .frameOptions(frame -> frame.deny())
        .httpStrictTransportSecurity(hsts -> hsts
          .includeSubDomains(true)
          .maxAgeInSeconds(31536000)
        )
        .xssProtection(xss -> xss.block(true))
      );

    return http.build();
  }
}

// Principle of Least Privilege
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class MethodSecurityConfig {

  @Bean
  public MethodSecurityExpressionHandler expressionHandler() {
    DefaultMethodSecurityExpressionHandler handler =
      new DefaultMethodSecurityExpressionHandler();
    handler.setPermissionEvaluator(new CustomPermissionEvaluator());
    return handler;
  }
}

@Service
public class DocumentService {

  // User can only read their own documents
  @PreAuthorize("hasRole('USER')")
  public Document getDocument(Long id, String username) {
    Document doc = documentRepository.findById(id).orElseThrow();
    if (!doc.getOwner().equals(username)) {
      throw new AccessDeniedException("Not authorized");
    }
    return doc;
  }

  // Only admins can delete
  @PreAuthorize("hasRole('ADMIN')")
  public void deleteDocument(Long id) {
    documentRepository.deleteById(id);
  }

  // Role-based access with ownership check
  @PreAuthorize("hasRole('EDITOR') and @documentService.isOwner(#id, principal.username)")
  public Document updateDocument(Long id, DocumentUpdate update) {
    return documentRepository.save(update.apply(id));
  }

  public boolean isOwner(Long documentId, String username) {
    return documentRepository.findById(documentId)
      .map(doc -> doc.getOwner().equals(username))
      .orElse(false);
  }
}

// Defense in Depth
@Service
public class PaymentService {

  // Layer 1: Input validation
  public void processPayment(PaymentRequest request) {
    validatePaymentRequest(request);

    // Layer 2: Business logic validation
    if (request.getAmount() > getMaxTransactionLimit()) {
      throw new BusinessException("Amount exceeds limit");
    }

    // Layer 3: Authentication check
    if (!isUserAuthenticated()) {
      throw new SecurityException("Not authenticated");
    }

    // Layer 4: Authorization check
    if (!hasPaymentPermission()) {
      throw new AccessDeniedException("Not authorized");
    }

    // Layer 5: Encryption for sensitive data
    String encryptedCardNumber = encrypt(request.getCardNumber());

    // Layer 6: Audit logging
    auditLog.log("Payment processed", request.getUserId(), request.getAmount());

    // Layer 7: Transaction integrity
    executeInTransaction(() -> {
      paymentRepository.save(createPayment(request));
      accountService.debit(request.getAmount());
    });
  }
}`
      }
    },
    {
      id: 3,
      name: 'Authentication',
      icon: '🔑',
      color: '#10b981',
      description: 'Secure authentication implementation',
      content: {
        explanation: 'Authentication verifies user identity through credentials. BCrypt is the recommended password hashing algorithm with adaptive cost factor. Spring Security provides comprehensive authentication support. Session management prevents session fixation and hijacking. OAuth 2.0 enables secure third-party authentication. JWT tokens provide stateless authentication. Multi-Factor Authentication (MFA) adds an additional security layer.',
        keyPoints: [
          'BCrypt password hashing - adaptive work factor, automatic salt generation',
          'Spring Security - comprehensive authentication framework',
          'Session management - secure session creation, timeout, invalidation',
          'OAuth 2.0 - delegated authorization with JWT tokens',
          'JWT implementation - stateless tokens with expiration and refresh',
          'MFA - Time-based OTP (TOTP), SMS, email verification'
        ],
        codeExample: `// BCrypt Password Encoding
@Configuration
public class PasswordConfig {

  @Bean
  public PasswordEncoder passwordEncoder() {
    // BCrypt with strength 12 (2^12 rounds)
    return new BCryptPasswordEncoder(12);
  }
}

@Service
public class UserService {

  private final PasswordEncoder passwordEncoder;

  public User registerUser(UserRegistration registration) {
    // Hash password before storing
    String hashedPassword = passwordEncoder.encode(registration.getPassword());

    User user = new User();
    user.setEmail(registration.getEmail());
    user.setPassword(hashedPassword);

    return userRepository.save(user);
  }

  public boolean verifyPassword(String rawPassword, String encodedPassword) {
    return passwordEncoder.matches(rawPassword, encodedPassword);
  }
}

// Spring Security Authentication
@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/login", "/register").permitAll()
        .requestMatchers("/admin/**").hasRole("ADMIN")
        .anyRequest().authenticated()
      )
      .formLogin(form -> form
        .loginPage("/login")
        .defaultSuccessUrl("/dashboard")
        .failureUrl("/login?error=true")
        .permitAll()
      )
      .logout(logout -> logout
        .logoutUrl("/logout")
        .logoutSuccessUrl("/")
        .invalidateHttpSession(true)
        .deleteCookies("JSESSIONID")
      )
      .sessionManagement(session -> session
        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
        .invalidSessionUrl("/login")
        .maximumSessions(1)
        .maxSessionsPreventsLogin(true)
        .expiredUrl("/login?expired=true")
      );

    return http.build();
  }

  @Bean
  public AuthenticationManager authManager(HttpSecurity http) throws Exception {
    AuthenticationManagerBuilder builder =
      http.getSharedObject(AuthenticationManagerBuilder.class);

    builder
      .userDetailsService(userDetailsService())
      .passwordEncoder(passwordEncoder());

    return builder.build();
  }
}

@Service
public class CustomUserDetailsService implements UserDetailsService {

  @Override
  public UserDetails loadUserByUsername(String username)
      throws UsernameNotFoundException {
    User user = userRepository.findByEmail(username)
      .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    return org.springframework.security.core.userdetails.User
      .withUsername(user.getEmail())
      .password(user.getPassword())
      .authorities(user.getRoles().stream()
        .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
        .collect(Collectors.toList()))
      .accountExpired(false)
      .accountLocked(user.isLocked())
      .credentialsExpired(false)
      .disabled(!user.isActive())
      .build();
  }
}

// OAuth 2.0 with JWT
@Configuration
@EnableAuthorizationServer
public class OAuth2Config extends AuthorizationServerConfigurerAdapter {

  @Override
  public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
    clients.inMemory()
      .withClient("client-app")
      .secret(passwordEncoder().encode("secret"))
      .authorizedGrantTypes("authorization_code", "refresh_token")
      .scopes("read", "write")
      .accessTokenValiditySeconds(3600)
      .refreshTokenValiditySeconds(86400);
  }

  @Override
  public void configure(AuthorizationServerEndpointsConfigurer endpoints) {
    endpoints
      .tokenStore(tokenStore())
      .accessTokenConverter(accessTokenConverter())
      .authenticationManager(authenticationManager);
  }

  @Bean
  public TokenStore tokenStore() {
    return new JwtTokenStore(accessTokenConverter());
  }

  @Bean
  public JwtAccessTokenConverter accessTokenConverter() {
    JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
    converter.setSigningKey("secret-key");
    return converter;
  }
}

// JWT Implementation
@Service
public class JwtService {

  private static final String SECRET_KEY = "your-256-bit-secret-key-here";
  private static final long EXPIRATION_TIME = 86400000; // 24 hours

  public String generateToken(UserDetails userDetails) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("roles", userDetails.getAuthorities());

    return Jwts.builder()
      .setClaims(claims)
      .setSubject(userDetails.getUsername())
      .setIssuedAt(new Date(System.currentTimeMillis()))
      .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
      .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
      .compact();
  }

  public boolean validateToken(String token, UserDetails userDetails) {
    String username = extractUsername(token);
    return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
  }

  private String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  private boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    Claims claims = Jwts.parser()
      .setSigningKey(SECRET_KEY)
      .parseClaimsJws(token)
      .getBody();
    return claimsResolver.apply(claims);
  }
}

// Multi-Factor Authentication (TOTP)
@Service
public class MfaService {

  private static final String ISSUER = "MyApp";

  public String generateSecretKey() {
    SecureRandom random = new SecureRandom();
    byte[] bytes = new byte[20];
    random.nextBytes(bytes);
    return new String(Base32.encode(bytes));
  }

  public String getQRCodeUrl(String username, String secretKey) {
    return String.format(
      "otpauth://totp/%s:%s?secret=%s&issuer=%s",
      ISSUER, username, secretKey, ISSUER
    );
  }

  public boolean verifyCode(String secretKey, int code) {
    long currentTime = System.currentTimeMillis() / 1000 / 30;

    // Check current and adjacent time windows
    for (int i = -1; i <= 1; i++) {
      int generatedCode = generateTOTP(secretKey, currentTime + i);
      if (generatedCode == code) {
        return true;
      }
    }
    return false;
  }

  private int generateTOTP(String secretKey, long time) {
    byte[] key = Base32.decode(secretKey);
    byte[] timeBytes = ByteBuffer.allocate(8).putLong(time).array();

    try {
      Mac hmac = Mac.getInstance("HmacSHA1");
      hmac.init(new SecretKeySpec(key, "HmacSHA1"));
      byte[] hash = hmac.doFinal(timeBytes);

      int offset = hash[hash.length - 1] & 0xf;
      int truncatedHash = ((hash[offset] & 0x7f) << 24)
        | ((hash[offset + 1] & 0xff) << 16)
        | ((hash[offset + 2] & 0xff) << 8)
        | (hash[offset + 3] & 0xff);

      return truncatedHash % 1000000;
    } catch (Exception e) {
      throw new RuntimeException("Error generating TOTP", e);
    }
  }
}`
      }
    },
    {
      id: 4,
      name: 'Authorization',
      icon: '🛡️',
      color: '#8b5cf6',
      description: 'Access control and authorization',
      content: {
        explanation: 'Authorization determines what authenticated users can access. Role-Based Access Control (RBAC) assigns permissions through roles. Spring Security @PreAuthorize enables method-level security. Method security validates permissions before execution. Access Control Lists (ACLs) provide fine-grained object-level permissions. Proper authorization prevents privilege escalation and unauthorized access.',
        keyPoints: [
          'RBAC implementation - users assigned roles, roles have permissions',
          'Spring Security @PreAuthorize - declarative method security',
          'Method security - validate access at service layer',
          'Access control lists - fine-grained object-level permissions'
        ],
        codeExample: `// RBAC Implementation
@Entity
public class User {
  @Id
  private Long id;
  private String email;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
    name = "user_roles",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "role_id")
  )
  private Set<Role> roles = new HashSet<>();
}

@Entity
public class Role {
  @Id
  private Long id;
  private String name; // ROLE_USER, ROLE_ADMIN, ROLE_MANAGER

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
    name = "role_permissions",
    joinColumns = @JoinColumn(name = "role_id"),
    inverseJoinColumns = @JoinColumn(name = "permission_id")
  )
  private Set<Permission> permissions = new HashSet<>();
}

@Entity
public class Permission {
  @Id
  private Long id;
  private String name; // READ_DOCUMENTS, WRITE_DOCUMENTS, DELETE_USERS
}

// Spring Security @PreAuthorize
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class MethodSecurityConfig extends GlobalMethodSecurityConfiguration {

  @Override
  protected MethodSecurityExpressionHandler createExpressionHandler() {
    DefaultMethodSecurityExpressionHandler handler =
      new DefaultMethodSecurityExpressionHandler();
    handler.setPermissionEvaluator(new CustomPermissionEvaluator());
    return handler;
  }
}

@Service
public class DocumentService {

  // Role-based authorization
  @PreAuthorize("hasRole('ADMIN')")
  public void deleteAllDocuments() {
    documentRepository.deleteAll();
  }

  // Multiple roles allowed
  @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
  public List<Document> getAllDocuments() {
    return documentRepository.findAll();
  }

  // Permission-based authorization
  @PreAuthorize("hasAuthority('WRITE_DOCUMENTS')")
  public Document createDocument(Document document) {
    return documentRepository.save(document);
  }

  // Complex expression with custom evaluator
  @PreAuthorize("hasRole('USER') and @documentSecurity.isOwner(#id, principal.username)")
  public Document updateDocument(Long id, DocumentUpdate update) {
    Document doc = documentRepository.findById(id).orElseThrow();
    update.apply(doc);
    return documentRepository.save(doc);
  }

  // Method parameter validation
  @PreAuthorize("#username == principal.username or hasRole('ADMIN')")
  public List<Document> getUserDocuments(String username) {
    return documentRepository.findByOwner(username);
  }

  // Return value filtering
  @PostFilter("filterObject.owner == principal.username or hasRole('ADMIN')")
  public List<Document> getAllUserDocuments() {
    return documentRepository.findAll();
  }

  // Combined conditions
  @PreAuthorize("hasRole('MANAGER') and #document.department == principal.department")
  public Document approveDocument(Document document) {
    document.setApproved(true);
    return documentRepository.save(document);
  }
}

// Custom Permission Evaluator
@Component
public class CustomPermissionEvaluator implements PermissionEvaluator {

  @Autowired
  private DocumentRepository documentRepository;

  @Override
  public boolean hasPermission(
      Authentication auth,
      Object targetDomainObject,
      Object permission) {

    if (auth == null || targetDomainObject == null || !(permission instanceof String)) {
      return false;
    }

    String targetType = targetDomainObject.getClass().getSimpleName();
    return hasPrivilege(auth, targetType, permission.toString());
  }

  @Override
  public boolean hasPermission(
      Authentication auth,
      Serializable targetId,
      String targetType,
      Object permission) {

    if (auth == null || targetType == null || !(permission instanceof String)) {
      return false;
    }

    return hasPrivilege(auth, targetType, permission.toString());
  }

  private boolean hasPrivilege(
      Authentication auth,
      String targetType,
      String permission) {

    return auth.getAuthorities().stream()
      .anyMatch(grantedAuth ->
        grantedAuth.getAuthority().equals(permission) ||
        grantedAuth.getAuthority().equals("ROLE_ADMIN")
      );
  }
}

@Component("documentSecurity")
public class DocumentSecurityService {

  @Autowired
  private DocumentRepository documentRepository;

  public boolean isOwner(Long documentId, String username) {
    return documentRepository.findById(documentId)
      .map(doc -> doc.getOwner().equals(username))
      .orElse(false);
  }

  public boolean canRead(Long documentId, Authentication auth) {
    Document doc = documentRepository.findById(documentId).orElse(null);
    if (doc == null) return false;

    // Owners can read
    if (doc.getOwner().equals(auth.getName())) {
      return true;
    }

    // Shared with user
    if (doc.getSharedWith().contains(auth.getName())) {
      return true;
    }

    // Admins can read all
    return auth.getAuthorities().stream()
      .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
  }
}

// Access Control Lists (ACL)
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class AclConfig {

  @Bean
  public AclPermissionEvaluator aclPermissionEvaluator(
      AclService aclService) {
    return new AclPermissionEvaluator(aclService);
  }

  @Bean
  public JdbcMutableAclService aclService(
      DataSource dataSource,
      LookupStrategy lookupStrategy,
      AclCache aclCache) {

    return new JdbcMutableAclService(
      dataSource,
      lookupStrategy,
      aclCache
    );
  }
}

@Service
public class AclSecuredService {

  @Autowired
  private MutableAclService aclService;

  @PreAuthorize("hasPermission(#id, 'com.example.Document', 'READ')")
  public Document getDocument(Long id) {
    return documentRepository.findById(id).orElseThrow();
  }

  public void grantPermission(Document document, String username, Permission permission) {
    MutableAcl acl = (MutableAcl) aclService.readAclById(
      new ObjectIdentityImpl(document)
    );

    UserDetails user = userDetailsService.loadUserByUsername(username);
    PrincipalSid sid = new PrincipalSid(user.getUsername());

    acl.insertAce(acl.getEntries().size(), permission, sid, true);
    aclService.updateAcl(acl);
  }

  public void revokePermission(Document document, String username) {
    MutableAcl acl = (MutableAcl) aclService.readAclById(
      new ObjectIdentityImpl(document)
    );

    acl.getEntries().stream()
      .filter(ace -> ace.getSid().equals(new PrincipalSid(username)))
      .forEach(ace -> acl.deleteAce(acl.getEntries().indexOf(ace)));

    aclService.updateAcl(acl);
  }
}`
      }
    },
    {
      id: 5,
      name: 'Encryption',
      icon: '🔐',
      color: '#f59e0b',
      description: 'Data encryption and key management',
      content: {
        explanation: 'Encryption protects data confidentiality through cryptographic algorithms. TLS/SSL secures data in transit between client and server. AES (Advanced Encryption Standard) encrypts data at rest with symmetric keys. RSA provides asymmetric encryption for key exchange. Hardware Security Modules (HSM) protect cryptographic keys. Proper key management is critical - keys must be rotated, stored securely, and never hardcoded.',
        keyPoints: [
          'TLS/SSL configuration - TLS 1.3, strong cipher suites, certificate management',
          'AES encryption - 256-bit keys for data at rest, GCM mode for authenticated encryption',
          'RSA - 2048-bit minimum for asymmetric encryption and signatures',
          'Key management - rotation schedules, secure storage, HSM integration',
          'HSM - hardware-based key storage and cryptographic operations',
          'Data at rest/in transit - encrypt sensitive data in all states'
        ],
        codeExample: `// TLS/SSL Configuration
@Configuration
public class TlsConfig {

  @Bean
  public EmbeddedServletContainerCustomizer containerCustomizer() {
    return container -> {
      Ssl ssl = new Ssl();
      ssl.setEnabled(true);
      ssl.setProtocol("TLSv1.3");

      // Strong cipher suites only
      ssl.setCiphers(new String[]{
        "TLS_AES_256_GCM_SHA384",
        "TLS_AES_128_GCM_SHA256",
        "TLS_CHACHA20_POLY1305_SHA256"
      });

      ssl.setKeyStore("classpath:keystore.p12");
      ssl.setKeyStorePassword(getKeystorePassword());
      ssl.setKeyStoreType("PKCS12");
      ssl.setKeyAlias("tomcat");

      container.setSsl(ssl);
    };
  }

  private String getKeystorePassword() {
    // Load from secure location, never hardcode
    return System.getenv("KEYSTORE_PASSWORD");
  }
}

// AES Encryption Service
@Service
public class EncryptionService {

  private static final String ALGORITHM = "AES/GCM/NoPadding";
  private static final int GCM_TAG_LENGTH = 128;
  private static final int GCM_IV_LENGTH = 12;

  private final SecretKey secretKey;

  public EncryptionService() {
    this.secretKey = loadOrGenerateKey();
  }

  private SecretKey loadOrGenerateKey() {
    // In production, load from HSM or secure key store
    String keyString = System.getenv("ENCRYPTION_KEY");
    if (keyString != null) {
      byte[] decodedKey = Base64.getDecoder().decode(keyString);
      return new SecretKeySpec(decodedKey, "AES");
    }

    // Generate new key
    try {
      KeyGenerator keyGen = KeyGenerator.getInstance("AES");
      keyGen.init(256, SecureRandom.getInstanceStrong());
      return keyGen.generateKey();
    } catch (NoSuchAlgorithmException e) {
      throw new RuntimeException("Failed to generate key", e);
    }
  }

  public String encrypt(String plaintext) throws Exception {
    byte[] iv = new byte[GCM_IV_LENGTH];
    SecureRandom.getInstanceStrong().nextBytes(iv);

    GCMParameterSpec parameterSpec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);
    Cipher cipher = Cipher.getInstance(ALGORITHM);
    cipher.init(Cipher.ENCRYPT_MODE, secretKey, parameterSpec);

    byte[] cipherText = cipher.doFinal(plaintext.getBytes(StandardCharsets.UTF_8));

    // Combine IV and ciphertext
    byte[] combined = new byte[iv.length + cipherText.length];
    System.arraycopy(iv, 0, combined, 0, iv.length);
    System.arraycopy(cipherText, 0, combined, iv.length, cipherText.length);

    return Base64.getEncoder().encodeToString(combined);
  }

  public String decrypt(String ciphertext) throws Exception {
    byte[] decoded = Base64.getDecoder().decode(ciphertext);

    // Extract IV and ciphertext
    byte[] iv = new byte[GCM_IV_LENGTH];
    byte[] cipherText = new byte[decoded.length - GCM_IV_LENGTH];
    System.arraycopy(decoded, 0, iv, 0, iv.length);
    System.arraycopy(decoded, iv.length, cipherText, 0, cipherText.length);

    GCMParameterSpec parameterSpec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);
    Cipher cipher = Cipher.getInstance(ALGORITHM);
    cipher.init(Cipher.DECRYPT_MODE, secretKey, parameterSpec);

    byte[] plainText = cipher.doFinal(cipherText);
    return new String(plainText, StandardCharsets.UTF_8);
  }
}

// RSA Encryption
@Service
public class RsaEncryptionService {

  private final KeyPair keyPair;

  public RsaEncryptionService() throws Exception {
    KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
    keyGen.initialize(2048, SecureRandom.getInstanceStrong());
    this.keyPair = keyGen.generateKeyPair();
  }

  public String encryptWithPublicKey(String plaintext) throws Exception {
    Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
    cipher.init(Cipher.ENCRYPT_MODE, keyPair.getPublic());

    byte[] cipherText = cipher.doFinal(
      plaintext.getBytes(StandardCharsets.UTF_8)
    );

    return Base64.getEncoder().encodeToString(cipherText);
  }

  public String decryptWithPrivateKey(String ciphertext) throws Exception {
    Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
    cipher.init(Cipher.DECRYPT_MODE, keyPair.getPrivate());

    byte[] plainText = cipher.doFinal(
      Base64.getDecoder().decode(ciphertext)
    );

    return new String(plainText, StandardCharsets.UTF_8);
  }

  public String sign(String data) throws Exception {
    Signature signature = Signature.getInstance("SHA256withRSA");
    signature.initSign(keyPair.getPrivate());
    signature.update(data.getBytes(StandardCharsets.UTF_8));

    byte[] signatureBytes = signature.sign();
    return Base64.getEncoder().encodeToString(signatureBytes);
  }

  public boolean verify(String data, String signatureStr) throws Exception {
    Signature signature = Signature.getInstance("SHA256withRSA");
    signature.initVerify(keyPair.getPublic());
    signature.update(data.getBytes(StandardCharsets.UTF_8));

    byte[] signatureBytes = Base64.getDecoder().decode(signatureStr);
    return signature.verify(signatureBytes);
  }
}

// JPA Attribute Encryption
@Converter
public class CreditCardEncryptor implements AttributeConverter<String, String> {

  @Autowired
  private EncryptionService encryptionService;

  @Override
  public String convertToDatabaseColumn(String attribute) {
    if (attribute == null) return null;

    try {
      return encryptionService.encrypt(attribute);
    } catch (Exception e) {
      throw new RuntimeException("Error encrypting data", e);
    }
  }

  @Override
  public String convertToEntityAttribute(String dbData) {
    if (dbData == null) return null;

    try {
      return encryptionService.decrypt(dbData);
    } catch (Exception e) {
      throw new RuntimeException("Error decrypting data", e);
    }
  }
}

@Entity
public class Payment {

  @Id
  private Long id;

  @Convert(converter = CreditCardEncryptor.class)
  private String creditCardNumber;

  @Convert(converter = CreditCardEncryptor.class)
  private String cvv;

  private BigDecimal amount;
}

// Key Management Service
@Service
public class KeyManagementService {

  private static final String KEY_STORE_TYPE = "PKCS12";
  private static final String KEY_STORE_PATH = "/secure/keystore.p12";

  public SecretKey rotateKey(String keyAlias) throws Exception {
    // Generate new key
    KeyGenerator keyGen = KeyGenerator.getInstance("AES");
    keyGen.init(256, SecureRandom.getInstanceStrong());
    SecretKey newKey = keyGen.generateKey();

    // Store in keystore
    KeyStore keyStore = loadKeyStore();
    KeyStore.SecretKeyEntry keyEntry = new KeyStore.SecretKeyEntry(newKey);
    KeyStore.ProtectionParameter protection =
      new KeyStore.PasswordProtection(getKeyStorePassword().toCharArray());

    keyStore.setEntry(keyAlias, keyEntry, protection);
    saveKeyStore(keyStore);

    // Log rotation event (without exposing key)
    auditLog.log("Key rotated: " + keyAlias);

    return newKey;
  }

  private KeyStore loadKeyStore() throws Exception {
    KeyStore keyStore = KeyStore.getInstance(KEY_STORE_TYPE);
    try (FileInputStream fis = new FileInputStream(KEY_STORE_PATH)) {
      keyStore.load(fis, getKeyStorePassword().toCharArray());
    }
    return keyStore;
  }

  private void saveKeyStore(KeyStore keyStore) throws Exception {
    try (FileOutputStream fos = new FileOutputStream(KEY_STORE_PATH)) {
      keyStore.store(fos, getKeyStorePassword().toCharArray());
    }
  }

  private String getKeyStorePassword() {
    return System.getenv("KEYSTORE_PASSWORD");
  }
}`
      }
    },
    {
      id: 6,
      name: 'SQL Injection Prevention',
      icon: '💉',
      color: '#ec4899',
      description: 'Preventing SQL injection attacks',
      content: {
        explanation: 'SQL injection occurs when untrusted input is concatenated into SQL queries, allowing attackers to manipulate query logic. PreparedStatement with parameterized queries is the primary defense. JPA/Hibernate provides a safe abstraction layer. Input sanitization validates and cleanifies user input. Never concatenate user input directly into SQL. Use whitelisting for dynamic elements like column names or table names.',
        keyPoints: [
          'PreparedStatement - uses parameterized queries with bound parameters',
          'JPA/Hibernate - ORM frameworks prevent injection through abstraction',
          'Input sanitization - validate, escape, whitelist user input',
          'Safe query construction - never concatenate user input into SQL'
        ],
        codeExample: `// SQL Injection Vulnerability Examples
public class VulnerableRepository {

  // VULNERABLE: String concatenation
  public User findUserBad(String email) {
    String sql = "SELECT * FROM users WHERE email = '" + email + "'";
    // Attack: ' OR '1'='1' --
    // Result: SELECT * FROM users WHERE email = '' OR '1'='1' --'
    return jdbcTemplate.queryForObject(sql, userRowMapper);
  }

  // VULNERABLE: String formatting
  public List<User> searchUsersBad(String keyword) {
    String sql = String.format(
      "SELECT * FROM users WHERE name LIKE '%%%s%%'",
      keyword
    );
    // Attack: %'; DROP TABLE users; --
    return jdbcTemplate.query(sql, userRowMapper);
  }
}

// PreparedStatement - SAFE
public class SafeJdbcRepository {

  @Autowired
  private JdbcTemplate jdbcTemplate;

  // SAFE: Parameterized query
  public User findUserByEmail(String email) {
    String sql = "SELECT * FROM users WHERE email = ?";
    return jdbcTemplate.queryForObject(sql, userRowMapper, email);
  }

  // SAFE: Named parameters
  public User findUserByEmailNamed(String email) {
    String sql = "SELECT * FROM users WHERE email = :email";
    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("email", email);

    return namedParameterJdbcTemplate.queryForObject(
      sql,
      params,
      userRowMapper
    );
  }

  // SAFE: Multiple parameters
  public List<User> findUsersByAgeRange(int minAge, int maxAge) {
    String sql = "SELECT * FROM users WHERE age BETWEEN ? AND ?";
    return jdbcTemplate.query(sql, userRowMapper, minAge, maxAge);
  }

  // SAFE: IN clause with parameters
  public List<User> findUsersByIds(List<Long> ids) {
    String sql = "SELECT * FROM users WHERE id IN (:ids)";
    MapSqlParameterSource params = new MapSqlParameterSource();
    params.addValue("ids", ids);

    return namedParameterJdbcTemplate.query(sql, params, userRowMapper);
  }
}

// JPA/Hibernate - SAFE
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  // SAFE: Derived query methods
  Optional<User> findByEmail(String email);

  List<User> findByNameContaining(String keyword);

  List<User> findByAgeBetween(int minAge, int maxAge);

  // SAFE: JPQL with named parameters
  @Query("SELECT u FROM User u WHERE u.email = :email AND u.active = :active")
  Optional<User> findByEmailAndActive(
    @Param("email") String email,
    @Param("active") boolean active
  );

  // SAFE: Native query with parameters
  @Query(
    value = "SELECT * FROM users WHERE created_date > :date",
    nativeQuery = true
  )
  List<User> findUsersCreatedAfter(@Param("date") LocalDate date);

  // SAFE: Complex query with multiple parameters
  @Query("""
    SELECT u FROM User u
    WHERE u.department = :dept
    AND u.salary > :minSalary
    AND u.active = true
  """)
  List<User> findActiveUsersByDepartmentAndSalary(
    @Param("dept") String department,
    @Param("minSalary") BigDecimal minSalary
  );
}

// Input Sanitization
@Service
public class InputSanitizationService {

  // Validate email format
  public String validateEmail(String email) {
    if (!email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")) {
      throw new ValidationException("Invalid email format");
    }
    return email;
  }

  // Whitelist for allowed values
  public String validateOrderColumn(String column) {
    Set<String> allowedColumns = Set.of("id", "name", "email", "created_date");

    if (!allowedColumns.contains(column.toLowerCase())) {
      throw new ValidationException("Invalid column name");
    }

    return column;
  }

  // Escape special characters for LIKE queries
  public String escapeLikePattern(String pattern) {
    return pattern
      .replace("\\\\", "\\\\\\\\")  // Escape backslash
      .replace("%", "\\\\%")         // Escape percent
      .replace("_", "\\\\_");        // Escape underscore
  }

  // Numeric validation
  public int validatePositiveInteger(String value) {
    try {
      int number = Integer.parseInt(value);
      if (number <= 0) {
        throw new ValidationException("Must be positive");
      }
      return number;
    } catch (NumberFormatException e) {
      throw new ValidationException("Invalid number format");
    }
  }
}

// Safe Dynamic Query Construction
@Service
public class DynamicQueryService {

  @Autowired
  private EntityManager entityManager;

  public List<User> searchUsers(UserSearchCriteria criteria) {
    CriteriaBuilder cb = entityManager.getCriteriaBuilder();
    CriteriaQuery<User> query = cb.createQuery(User.class);
    Root<User> user = query.from(User.class);

    List<Predicate> predicates = new ArrayList<>();

    // All parameters are safely bound
    if (criteria.getEmail() != null) {
      predicates.add(cb.equal(user.get("email"), criteria.getEmail()));
    }

    if (criteria.getMinAge() != null) {
      predicates.add(cb.greaterThanOrEqualTo(user.get("age"), criteria.getMinAge()));
    }

    if (criteria.getNamePattern() != null) {
      predicates.add(cb.like(
        user.get("name"),
        "%" + escapeLikePattern(criteria.getNamePattern()) + "%"
      ));
    }

    query.where(predicates.toArray(new Predicate[0]));

    // Safe ordering with whitelist
    if (criteria.getOrderBy() != null) {
      String orderColumn = validateOrderColumn(criteria.getOrderBy());
      query.orderBy(
        criteria.isDescending()
          ? cb.desc(user.get(orderColumn))
          : cb.asc(user.get(orderColumn))
      );
    }

    return entityManager.createQuery(query).getResultList();
  }

  private String validateOrderColumn(String column) {
    Set<String> allowed = Set.of("id", "email", "name", "createdDate");
    if (!allowed.contains(column)) {
      throw new ValidationException("Invalid order column");
    }
    return column;
  }

  private String escapeLikePattern(String pattern) {
    return pattern.replace("%", "\\\\%").replace("_", "\\\\_");
  }
}

// Stored Procedures (when necessary)
@Repository
public class StoredProcedureRepository {

  @Autowired
  private EntityManager entityManager;

  public User getUserById(Long userId) {
    StoredProcedureQuery query = entityManager
      .createStoredProcedureQuery("get_user_by_id", User.class)
      .registerStoredProcedureParameter(1, Long.class, ParameterMode.IN)
      .setParameter(1, userId);

    query.execute();
    return (User) query.getSingleResult();
  }
}`
      }
    },
    {
      id: 7,
      name: 'XSS Protection',
      icon: '⚠️',
      color: '#06b6d4',
      description: 'Cross-Site Scripting prevention',
      content: {
        explanation: 'Cross-Site Scripting (XSS) injects malicious scripts into web pages viewed by users. Content Security Policy (CSP) restricts resource loading to trusted sources. Output encoding converts dangerous characters to safe representations. DOM-based XSS occurs when JavaScript processes untrusted data. Stored XSS persists in databases. Reflected XSS comes from request parameters. Always encode output based on context (HTML, JavaScript, URL).',
        keyPoints: [
          'Content Security Policy - defines trusted sources for scripts, styles, images',
          'Output encoding - HTML entity encoding, JavaScript encoding, URL encoding',
          'DOM-based XSS - sanitize data before DOM manipulation',
          'Stored/reflected XSS prevention - encode all user-generated content'
        ],
        codeExample: `// Content Security Policy Configuration
@Configuration
@EnableWebSecurity
public class CspConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .headers(headers -> headers
        .contentSecurityPolicy(csp -> csp
          .policyDirectives(
            "default-src 'self'; " +
            "script-src 'self' 'nonce-{nonce}' https://trusted-cdn.com; " +
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
            "img-src 'self' data: https:; " +
            "font-src 'self' https://fonts.gstatic.com; " +
            "connect-src 'self' https://api.example.com; " +
            "frame-ancestors 'none'; " +
            "base-uri 'self'; " +
            "form-action 'self'"
          )
        )
        .xssProtection(xss -> xss
          .headerValue(XXssProtectionHeaderWriter.HeaderValue.ENABLED_MODE_BLOCK)
        )
        .contentTypeOptions(cto -> {})  // X-Content-Type-Options: nosniff
      );

    return http.build();
  }
}

// Output Encoding for HTML
@Service
public class HtmlEncodingService {

  public String encodeForHtml(String input) {
    if (input == null) return "";

    return HtmlUtils.htmlEscape(input);
    // Converts: <script>alert('xss')</script>
    // To: &lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;
  }

  public String encodeForHtmlAttribute(String input) {
    if (input == null) return "";

    return input
      .replace("&", "&amp;")
      .replace("<", "&lt;")
      .replace(">", "&gt;")
      .replace('"', "&quot;")
      .replace("'", "&#x27;")
      .replace("/", "&#x2F;");
  }
}

// Thymeleaf Template (Auto-escaping)
/*
SAFE: Thymeleaf auto-escapes by default
<p th:text="$userInput"></p>
Output: &lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;

UNSAFE: Unescaped HTML (only for trusted content)
<p th:utext="$trustedHtml"></p>

SAFE: Attribute encoding
<input type="text" th:value="$userInput" />

SAFE: JavaScript encoding
<script th:inline="javascript">
  var user = 'default';
</script>

SAFE: URL encoding
<a th:href="@search">Search</a>
*/

// JavaScript Encoding
@Service
public class JavaScriptEncodingService {

  public String encodeForJavaScript(String input) {
    if (input == null) return "";

    return JavaScriptUtils.javaScriptEscape(input);
  }

  public String safeJsonString(String input) {
    try {
      ObjectMapper mapper = new ObjectMapper();
      return mapper.writeValueAsString(input);
    } catch (JsonProcessingException e) {
      throw new RuntimeException("JSON encoding failed", e);
    }
  }
}

// DOM-based XSS Prevention
@RestController
public class SafeApiController {

  // SAFE: Return JSON, let framework handle encoding
  @GetMapping("/api/user/{id}")
  public UserDto getUser(@PathVariable Long id) {
    User user = userService.findById(id);
    return new UserDto(
      user.getId(),
      user.getEmail(),
      user.getName()  // Framework automatically encodes
    );
  }

  // UNSAFE: Returning raw HTML
  @GetMapping("/unsafe/profile")
  public String getUserProfileBad(@RequestParam String name) {
    return "<h1>Welcome " + name + "</h1>";  // XSS vulnerable
  }

  // SAFE: Encoded HTML response
  @GetMapping("/safe/profile")
  public String getUserProfileGood(@RequestParam String name) {
    String encodedName = HtmlUtils.htmlEscape(name);
    return "<h1>Welcome " + encodedName + "</h1>";
  }
}

// Input Sanitization with OWASP Java Encoder
@Service
public class SanitizationService {

  public String sanitizeForHtml(String input) {
    return Encode.forHtml(input);
  }

  public String sanitizeForHtmlAttribute(String input) {
    return Encode.forHtmlAttribute(input);
  }

  public String sanitizeForJavaScript(String input) {
    return Encode.forJavaScript(input);
  }

  public String sanitizeForCss(String input) {
    return Encode.forCssString(input);
  }

  public String sanitizeForUrl(String input) {
    return Encode.forUriComponent(input);
  }
}

// Stored XSS Prevention
@Service
public class CommentService {

  @Autowired
  private CommentRepository commentRepository;

  public Comment createComment(String userId, String content) {
    // Sanitize before storing
    String sanitized = sanitizeUserContent(content);

    Comment comment = new Comment();
    comment.setUserId(userId);
    comment.setContent(sanitized);
    comment.setCreatedAt(LocalDateTime.now());

    return commentRepository.save(comment);
  }

  private String sanitizeUserContent(String content) {
    // Remove dangerous HTML tags
    content = content.replaceAll("<script[^>]*>.*?</script>", "");
    content = content.replaceAll("<iframe[^>]*>.*?</iframe>", "");
    content = content.replaceAll("javascript:", "");
    content = content.replaceAll("on\\w+\\s*=", "");  // Remove event handlers

    // Encode remaining content
    return HtmlUtils.htmlEscape(content);
  }

  public List<CommentDto> getComments() {
    return commentRepository.findAll().stream()
      .map(comment -> new CommentDto(
        comment.getId(),
        comment.getUserId(),
        HtmlUtils.htmlEscape(comment.getContent()),  // Double encode for safety
        comment.getCreatedAt()
      ))
      .collect(Collectors.toList());
  }
}

// Reflected XSS Prevention
@RestController
public class SearchController {

  @GetMapping("/search")
  public String search(@RequestParam String query, Model model) {
    // UNSAFE: Reflected XSS
    // return "You searched for: " + query;

    // SAFE: Encode reflected input
    String encodedQuery = HtmlUtils.htmlEscape(query);
    model.addAttribute("query", encodedQuery);

    List<Result> results = searchService.search(query);
    model.addAttribute("results", results);

    return "search-results";  // Thymeleaf template with auto-escaping
  }
}

// CSP Nonce Generation
@Component
public class CspNonceFilter extends OncePerRequestFilter {

  @Override
  protected void doFilterInternal(
      HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {

    // Generate unique nonce per request
    String nonce = generateNonce();
    request.setAttribute("cspNonce", nonce);

    // Add CSP header with nonce
    String csp = "default-src 'self'; " +
                 "script-src 'self' 'nonce-" + nonce + "'; " +
                 "style-src 'self' 'unsafe-inline'";

    response.setHeader("Content-Security-Policy", csp);

    filterChain.doFilter(request, response);
  }

  private String generateNonce() {
    byte[] nonce = new byte[16];
    new SecureRandom().nextBytes(nonce);
    return Base64.getEncoder().encodeToString(nonce);
  }
}

/*
Template using CSP nonce
<script th:attr="nonce=NONCE">
  This script is allowed by CSP
  console.log('Safe script');
</script>
*/`
      }
    },
    {
      id: 8,
      name: 'Security Testing',
      icon: '🧪',
      color: '#84cc16',
      description: 'Security testing tools and practices',
      content: {
        explanation: 'Security testing identifies vulnerabilities before attackers exploit them. Static Application Security Testing (SAST) analyzes source code for vulnerabilities. Fortify and SonarQube detect security issues during development. Dynamic Application Security Testing (DAST) tests running applications. OWASP ZAP performs penetration testing. Dependency scanning identifies vulnerable libraries. Regular security testing should be integrated into CI/CD pipelines.',
        keyPoints: [
          'Fortify SAST - static analysis for security vulnerabilities in source code',
          'DAST tools - test running applications for security flaws',
          'Sonar Security - quality gates with security rules',
          'ZAP - OWASP Zed Attack Proxy for penetration testing',
          'Dependency scanning - identify vulnerable libraries (Snyk, OWASP Dependency-Check)',
          'Penetration testing - manual security testing by experts'
        ],
        codeExample: `// Maven Security Plugins Configuration
/*
<build>
  <plugins>
    <!-- OWASP Dependency Check -->
    <plugin>
      <groupId>org.owasp</groupId>
      <artifactId>dependency-check-maven</artifactId>
      <version>8.4.0</version>
      <configuration>
        <failBuildOnCVSS>7</failBuildOnCVSS>
        <suppressionFile>dependency-check-suppressions.xml</suppressionFile>
      </configuration>
      <executions>
        <execution>
          <goals>
            <goal>check</goal>
          </goals>
        </execution>
      </executions>
    </plugin>

    <!-- FindSecBugs (SpotBugs security plugin) -->
    <plugin>
      <groupId>com.github.spotbugs</groupId>
      <artifactId>spotbugs-maven-plugin</artifactId>
      <version>4.7.3</version>
      <configuration>
        <effort>Max</effort>
        <threshold>Low</threshold>
        <plugins>
          <plugin>
            <groupId>com.h3xstream.findsecbugs</groupId>
            <artifactId>findsecbugs-plugin</artifactId>
            <version>1.12.0</version>
          </plugin>
        </plugins>
      </configuration>
    </plugin>

    <!-- SonarQube Security Scanner -->
    <plugin>
      <groupId>org.sonarsource.scanner.maven</groupId>
      <artifactId>sonar-maven-plugin</artifactId>
      <version>3.9.1.2184</version>
    </plugin>
  </plugins>
</build>
*/

// Security Test Cases
@SpringBootTest
class SecurityTest {

  @Autowired
  private MockMvc mockMvc;

  @Test
  void testSqlInjectionPrevention() throws Exception {
    String sqlInjection = "' OR '1'='1' --";

    mockMvc.perform(get("/api/users")
        .param("email", sqlInjection))
      .andExpect(status().isNotFound());  // Should not return data
  }

  @Test
  void testXssPrevention() throws Exception {
    String xssPayload = "<script>alert('xss')</script>";

    MvcResult result = mockMvc.perform(post("/api/comments")
        .contentType(MediaType.APPLICATION_JSON)
        .content("{\\"content\\":\\"" + xssPayload + "\\"}"))
      .andExpect(status().isCreated())
      .andReturn();

    String response = result.getResponse().getContentAsString();
    assertFalse(response.contains("<script>"));
    assertTrue(response.contains("&lt;script&gt;") ||
               response.contains("\\\\u003cscript\\\\u003e"));
  }

  @Test
  void testCsrfProtection() throws Exception {
    mockMvc.perform(post("/api/transfer")
        .param("amount", "1000")
        .param("to", "attacker"))
      .andExpect(status().isForbidden());  // No CSRF token
  }

  @Test
  void testAuthenticationRequired() throws Exception {
    mockMvc.perform(get("/api/admin/users"))
      .andExpect(status().isUnauthorized());
  }

  @Test
  void testAuthorizationEnforced() throws Exception {
    mockMvc.perform(get("/api/admin/users")
        .with(user("regular-user").roles("USER")))
      .andExpect(status().isForbidden());
  }

  @Test
  void testPasswordStrength() {
    assertThrows(ValidationException.class, () -> {
      userService.registerUser("user@test.com", "weak");
    });
  }

  @Test
  void testSecureHeaders() throws Exception {
    mockMvc.perform(get("/"))
      .andExpect(header().exists("X-Content-Type-Options"))
      .andExpect(header().string("X-Content-Type-Options", "nosniff"))
      .andExpect(header().exists("X-Frame-Options"))
      .andExpect(header().exists("Content-Security-Policy"))
      .andExpect(header().exists("Strict-Transport-Security"));
  }
}

// ZAP Security Scanning (CI/CD Integration)
/*
# Docker command to run ZAP scan
docker run -t owasp/zap2docker-stable zap-baseline.py \\
  -t https://your-app.com \\
  -r zap-report.html \\
  -J zap-report.json

# GitHub Actions workflow
name: Security Scan
on: [push]
jobs:
  zap-scan:
    runs-on: ubuntu-latest
    steps:
      - name: ZAP Scan
        uses: zaproxy/action-baseline@v0.7.0
        with:
          target: 'https://your-app.com'
          rules_file_name: '.zap/rules.tsv'
          fail_action: true
*/

// Dependency Vulnerability Check
@Test
void checkVulnerableDependencies() {
  // Run: mvn dependency-check:check
  // Fails build if CVSS score >= 7

  // dependency-check-suppressions.xml
  /*
  <suppressions>
    <suppress>
      <cve>CVE-2021-12345</cve>
      <reason>False positive - not used in our code</reason>
    </suppress>
  </suppressions>
  */
}

// SonarQube Security Hotspots
/*
sonar.projectKey=my-project
sonar.sources=src/main/java
sonar.java.binaries=target/classes

# Security rules
sonar.java.security.hotspot=CRITICAL
sonar.java.security.vulnerability=BLOCKER

# Run analysis
mvn clean verify sonar:sonar \\
  -Dsonar.host.url=http://sonarqube:9000 \\
  -Dsonar.login=token
*/

// Penetration Testing Checklist
/*
1. Authentication Testing:
   - Brute force protection
   - Password policy enforcement
   - Session timeout
   - Multi-factor authentication

2. Authorization Testing:
   - Horizontal privilege escalation
   - Vertical privilege escalation
   - Path traversal
   - IDOR vulnerabilities

3. Input Validation:
   - SQL injection
   - XSS (stored, reflected, DOM)
   - XXE (XML External Entity)
   - Command injection

4. Session Management:
   - Session fixation
   - Session hijacking
   - Cookie security (HttpOnly, Secure, SameSite)
   - CSRF protection

5. Cryptography:
   - Weak algorithms (MD5, SHA1)
   - Insecure SSL/TLS configuration
   - Sensitive data exposure
   - Key management

6. Configuration:
   - Default credentials
   - Debug mode enabled
   - Error message disclosure
   - Unnecessary services enabled

7. Business Logic:
   - Race conditions
   - Parameter manipulation
   - Workflow bypass
   - Rate limiting
*/

// Security Integration Test
@SpringBootTest
@AutoConfigureMockMvc
class SecurityIntegrationTest {

  @Test
  void testCompleteSecurityFlow() throws Exception {
    // 1. Ensure HTTPS redirect
    mockMvc.perform(get("http://localhost/api/users"))
      .andExpect(status().is3xxRedirection())
      .andExpect(header().string("Location", startsWith("https://")));

    // 2. Test authentication
    mockMvc.perform(post("/login")
        .param("username", "admin")
        .param("password", "Admin@123"))
      .andExpect(status().is3xxRedirection())
      .andExpect(authenticated());

    // 3. Test authorization
    mockMvc.perform(get("/admin/dashboard")
        .with(user("admin").roles("ADMIN")))
      .andExpect(status().isOk());

    // 4. Test CSRF protection
    mockMvc.perform(post("/api/transfer")
        .with(csrf())
        .param("amount", "100"))
      .andExpect(status().isOk());

    // 5. Test secure logout
    mockMvc.perform(post("/logout").with(csrf()))
      .andExpect(status().is3xxRedirection())
      .andExpect(unauthenticated());
  }
}`
      }
    }
  ]

  const selectedTopicRef = useRef(selectedTopic)
  useEffect(() => {
    selectedTopicRef.current = selectedTopic
  }, [selectedTopic])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedTopicRef.current) {
          e.preventDefault()
          e.stopImmediatePropagation()
          setSelectedTopic(null)
          return
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '95%',
      margin: '120px auto 0',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      border: '3px solid rgba(239, 68, 68, 0.4)'
    }}>
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
        >
          ← Back to Menu
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          🔒 Security & OWASP
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{
        backgroundColor: 'rgba(239, 68, 68, 0.05)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(239, 68, 68, 0.3)',
        marginBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.3rem',
          color: '#374151',
          fontWeight: '500',
          margin: 0,
          lineHeight: '1.8',
          textAlign: 'center'
        }}>
          Comprehensive security guide covering OWASP Top 10 vulnerabilities, secure coding practices, authentication,
          authorization, encryption, SQL injection prevention, XSS protection, and security testing tools.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedTopic ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {!selectedTopic ? (
          securityTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.05)',
                padding: '2rem',
                borderRadius: '12px',
                border: '2px solid rgba(239, 68, 68, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'
                e.currentTarget.style.borderColor = topic.color
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 8px 16px ${topic.color}33`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{topic.icon}</div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: topic.color,
                  margin: '0 0 0.5rem 0'
                }}>
                  {topic.name}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {topic.description}
                </p>
              </div>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: '600',
                color: topic.color,
                marginTop: '1rem'
              }}>
                Click to explore →
              </div>
            </div>
          ))
        ) : (
          <>
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1.5rem'
              }}>
                Security Topics
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {securityTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    style={{
                      backgroundColor: selectedTopic?.id === topic.id
                        ? `${topic.color}15`
                        : 'rgba(239, 68, 68, 0.05)',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: selectedTopic?.id === topic.id
                        ? `3px solid ${topic.color}`
                        : '2px solid rgba(239, 68, 68, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedTopic?.id !== topic.id) {
                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'
                        e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedTopic?.id !== topic.id) {
                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.05)'
                        e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)'
                      }
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>{topic.icon}</span>
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: selectedTopic?.id === topic.id ? topic.color : '#1f2937'
                      }}>
                        {topic.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: selectedTopic.color,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: '2rem' }}>{selectedTopic.icon}</span>
                {selectedTopic.name}
              </h3>

              <div style={{
                backgroundColor: `${selectedTopic.color}08`,
                padding: '1.5rem',
                borderRadius: '12px',
                border: `2px solid ${selectedTopic.color}33`,
                marginBottom: '1.5rem'
              }}>
                <p style={{
                  fontSize: '1rem',
                  color: '#374151',
                  fontWeight: '500',
                  margin: 0,
                  lineHeight: '1.7',
                  textAlign: 'justify'
                }}>
                  {selectedTopic.content.explanation}
                </p>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                border: `2px solid ${selectedTopic.color}33`,
                marginBottom: '1.5rem'
              }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: selectedTopic.color,
                  margin: '0 0 1rem 0'
                }}>
                  📌 Key Points
                </h4>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {selectedTopic.content.keyPoints.map((point, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        padding: '0.75rem',
                        backgroundColor: `${selectedTopic.color}08`,
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        color: '#374151',
                        lineHeight: '1.6'
                      }}
                    >
                      <span style={{
                        color: selectedTopic.color,
                        fontWeight: '700',
                        fontSize: '1.2rem',
                        lineHeight: '1'
                      }}>
                        •
                      </span>
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: selectedTopic.color,
                  margin: '0 0 1rem 0'
                }}>
                  💻 Code Examples
                </h4>
                <div style={{
                  backgroundColor: '#1e293b',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '2px solid #334155'
                }}>
                  <SyntaxHighlighter code={selectedTopic.content.codeExample} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SecurityOWASP

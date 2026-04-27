import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

export default function SpringSecurityQuestions({ onBack, breadcrumb, problemLimit }) {
  const [expandedQuestionId, setExpandedQuestionId] = useState(null)
  const categoryColor = '#10b981'

  const questions = [
    {
      id: 1,
      category: 'Authentication',
      difficulty: 'Medium',
      question: 'Explain Spring Security Authentication and Authorization flow',
      answer: `**Spring Security Authentication Flow:**

**1. Authentication Request:**
User submits credentials (username/password) via login form

**2. AuthenticationFilter:**
Intercepts the request (e.g., UsernamePasswordAuthenticationFilter)
\`\`\`java
@Override
public Authentication attemptAuthentication(
        HttpServletRequest request,
        HttpServletResponse response) {

    String username = request.getParameter("username");
    String password = request.getParameter("password");

    UsernamePasswordAuthenticationToken authToken =
        new UsernamePasswordAuthenticationToken(username, password);

    return authenticationManager.authenticate(authToken);
}
\`\`\`

**3. AuthenticationManager:**
Delegates to AuthenticationProvider
\`\`\`java
public interface AuthenticationManager {
    Authentication authenticate(Authentication authentication)
        throws AuthenticationException;
}
\`\`\`

**4. AuthenticationProvider:**
Performs actual authentication
\`\`\`java
@Component
public class CustomAuthenticationProvider
        implements AuthenticationProvider {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication auth)
            throws AuthenticationException {

        String username = auth.getName();
        String password = auth.getCredentials().toString();

        UserDetails user = userDetailsService
            .loadUserByUsername(username);

        if (passwordEncoder.matches(password, user.getPassword())) {
            return new UsernamePasswordAuthenticationToken(
                username, password, user.getAuthorities());
        }

        throw new BadCredentialsException("Invalid credentials");
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class
            .isAssignableFrom(authentication);
    }
}
\`\`\`

**5. UserDetailsService:**
Loads user from database
\`\`\`java
@Service
public class CustomUserDetailsService
        implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException(
                "User not found: " + username));

        return org.springframework.security.core.userdetails.User
            .builder()
            .username(user.getUsername())
            .password(user.getPassword())
            .authorities(user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList()))
            .accountExpired(false)
            .accountLocked(false)
            .credentialsExpired(false)
            .disabled(false)
            .build();
    }
}
\`\`\`

**6. SecurityContext:**
Stores authenticated user
\`\`\`java
Authentication authentication =
    SecurityContextHolder.getContext().getAuthentication();

String username = authentication.getName();
Collection<? extends GrantedAuthority> authorities =
    authentication.getAuthorities();
\`\`\`

**Authorization:**

**Method Security:**
\`\`\`java
@Configuration
@EnableMethodSecurity
public class MethodSecurityConfig {
}

@Service
public class BankService {

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteAccount(Long id) {
        // Only ADMIN can delete
    }

    @PreAuthorize("hasAuthority('WRITE_PRIVILEGE')")
    public void updateBalance(Long id, BigDecimal amount) {
        // Requires WRITE_PRIVILEGE
    }

    @PostAuthorize("returnObject.owner == authentication.name")
    public Account getAccount(Long id) {
        // User can only see their own account
    }

    @PreAuthorize("#username == authentication.name")
    public void changePassword(String username, String newPassword) {
        // Users can only change their own password
    }
}
\`\`\`

**URL-based Security:**
\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/home", "/register").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN")
                .requestMatchers("/api/**").hasAuthority("API_ACCESS")
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .permitAll()
            )
            .logout(logout -> logout
                .permitAll()
            );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
\`\`\``
    },
    {
      id: 2,
      category: 'JWT',
      difficulty: 'Hard',
      question: 'Implement JWT authentication in Spring Security',
      answer: `**JWT Authentication Implementation:**

**1. Dependencies:**
\`\`\`xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
\`\`\`

**2. JWT Utility:**
\`\`\`java
@Component
public class JwtTokenProvider {

    @Value("\${jwt.secret}")
    private String jwtSecret;

    @Value("\${jwt.expiration}")
    private long jwtExpirationMs;

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(Authentication authentication) {
        UserDetails userDetails =
            (UserDetails) authentication.getPrincipal();

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
            .setSubject(userDetails.getUsername())
            .claim("authorities", userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()))
            .setIssuedAt(now)
            .setExpiration(expiryDate)
            .signWith(getSigningKey(), SignatureAlgorithm.HS512)
            .compact();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        }
        return false;
    }
}
\`\`\`

**3. JWT Authentication Filter:**
\`\`\`java
@Component
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        try {
            String jwt = getJwtFromRequest(request);

            if (StringUtils.hasText(jwt) &&
                    tokenProvider.validateToken(jwt)) {

                String username = tokenProvider
                    .getUsernameFromToken(jwt);

                UserDetails userDetails = userDetailsService
                    .loadUserByUsername(username);

                UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                        userDetails, null,
                        userDetails.getAuthorities());

                authentication.setDetails(
                    new WebAuthenticationDetailsSource()
                        .buildDetails(request));

                SecurityContextHolder.getContext()
                    .setAuthentication(authentication);
            }
        } catch (Exception ex) {
            logger.error("Could not set user authentication", ex);
        }

        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) &&
                bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
\`\`\`

**4. Security Configuration:**
\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthFilter;

    @Autowired
    private JwtAuthenticationEntryPoint authEntryPoint;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint(authEntryPoint))
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter,
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
\`\`\`

**5. Authentication Controller:**
\`\`\`java
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager
            .authenticate(new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
            ));

        SecurityContextHolder.getContext()
            .setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody SignupRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest()
                .body("Username is already taken");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRoles(Collections.singleton(new Role("ROLE_USER")));

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }
}
\`\`\`

**application.yml:**
\`\`\`yaml
jwt:
  secret: dGhpc0lzQVZlcnlTZWNyZXRLZXlGb3JKV1RUb2tlbkdlbmVyYXRpb24=
  expiration: 86400000  # 24 hours
\`\`\``
    },
    {
      id: 3,
      category: 'OAuth2',
      difficulty: 'Hard',
      question: 'Implement OAuth2 with Spring Security',
      answer: `**OAuth2 Implementation:**

**1. Dependencies:**
\`\`\`xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-client</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
</dependency>
\`\`\`

**2. OAuth2 Client Configuration:**
\`\`\`yaml
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: your-google-client-id
            client-secret: your-google-client-secret
            scope:
              - email
              - profile
          github:
            client-id: your-github-client-id
            client-secret: your-github-client-secret
            scope:
              - user:email
              - read:user
        provider:
          google:
            authorization-uri: https://accounts.google.com/o/oauth2/auth
            token-uri: https://oauth2.googleapis.com/token
            user-info-uri: https://www.googleapis.com/oauth2/v3/userinfo
            user-name-attribute: sub
\`\`\`

**3. Security Configuration:**
\`\`\`java
@Configuration
@EnableWebSecurity
public class OAuth2SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/login**", "/error").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth2 -> oauth2
                .loginPage("/login")
                .defaultSuccessUrl("/dashboard", true)
                .failureUrl("/login?error=true")
                .userInfoEndpoint(userInfo -> userInfo
                    .userService(customOAuth2UserService())
                )
            )
            .logout(logout -> logout
                .logoutSuccessUrl("/")
                .invalidateHttpSession(true)
                .clearAuthentication(true)
                .deleteCookies("JSESSIONID")
            );

        return http.build();
    }

    @Bean
    public OAuth2UserService<OAuth2UserRequest, OAuth2User>
            customOAuth2UserService() {
        return new CustomOAuth2UserService();
    }
}
\`\`\`

**4. Custom OAuth2 User Service:**
\`\`\`java
@Service
public class CustomOAuth2UserService
        extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest)
            throws OAuth2AuthenticationException {

        OAuth2User oauth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration()
            .getRegistrationId();
        String email = oauth2User.getAttribute("email");

        User user = userRepository.findByEmail(email)
            .orElseGet(() -> {
                User newUser = new User();
                newUser.setEmail(email);
                newUser.setProvider(registrationId);
                newUser.setRoles(Collections.singleton(
                    new Role("ROLE_USER")));
                return userRepository.save(newUser);
            });

        return new CustomOAuth2User(oauth2User, user);
    }
}
\`\`\`

**5. Resource Server Configuration:**
\`\`\`java
@Configuration
@EnableWebSecurity
public class ResourceServerConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                    .jwtAuthenticationConverter(jwtAuthConverter())
                )
            );

        return http.build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthConverter() {
        JwtGrantedAuthoritiesConverter grantedAuthorities =
            new JwtGrantedAuthoritiesConverter();
        grantedAuthorities.setAuthoritiesClaimName("roles");
        grantedAuthorities.setAuthorityPrefix("ROLE_");

        JwtAuthenticationConverter jwtConverter =
            new JwtAuthenticationConverter();
        jwtConverter.setJwtGrantedAuthoritiesConverter(
            grantedAuthorities);

        return jwtConverter;
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        return JwtDecoders.fromIssuerLocation(
            "https://your-auth-server.com");
    }
}
\`\`\`

**6. Controller with OAuth2:**
\`\`\`java
@RestController
@RequestMapping("/api")
public class UserController {

    @GetMapping("/user")
    public Map<String, Object> user(
            @AuthenticationPrincipal OAuth2User principal) {

        Map<String, Object> user = new HashMap<>();
        user.put("name", principal.getAttribute("name"));
        user.put("email", principal.getAttribute("email"));
        user.put("picture", principal.getAttribute("picture"));

        return user;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(
            @AuthenticationPrincipal Jwt jwt) {

        String username = jwt.getClaimAsString("preferred_username");
        List<String> roles = jwt.getClaimAsStringList("roles");

        return ResponseEntity.ok(Map.of(
            "username", username,
            "roles", roles
        ));
    }
}
\`\`\`

**OAuth2 Flow:**
1. User clicks "Login with Google"
2. Redirected to Google's authorization server
3. User authenticates and grants permissions
4. Google redirects back with authorization code
5. Spring Security exchanges code for access token
6. Access token used to fetch user info
7. User authenticated and session created

**Grant Types:**
- **Authorization Code**: Web applications (most secure)
- **Implicit**: Single-page apps (deprecated)
- **Password**: Trusted applications only
- **Client Credentials**: Service-to-service
- **Refresh Token**: Get new access token`
    },
    {
      id: 4,
      category: 'Filter Chain',
      difficulty: 'Medium',
      question: 'How does the Spring Security Filter Chain work?',
      answer: `**Spring Security Filter Chain:**

**1. DelegatingFilterProxy:**
Servlet container bridge that delegates to Spring-managed filter bean
\`\`\`java
// Registered automatically by Spring Boot
// Delegates to "springSecurityFilterChain" bean
// Lives in servlet container, delegates to Spring context
\`\`\`

**2. FilterChainProxy:**
Main entry point that holds one or more SecurityFilterChain instances
\`\`\`java
// Spring Boot auto-configures this
// Iterates through filter chains to find matching one
// Only the FIRST matching chain processes the request
\`\`\`

**3. Default Filter Ordering:**
\`\`\`java
// Filters execute in this order:
// 1. ChannelProcessingFilter       - HTTP/HTTPS redirect
// 2. SecurityContextPersistenceFilter - Load SecurityContext
// 3. ConcurrentSessionFilter       - Track active sessions
// 4. LogoutFilter                  - Process /logout
// 5. UsernamePasswordAuthenticationFilter - Form login
// 6. BasicAuthenticationFilter     - HTTP Basic auth
// 7. BearerTokenAuthenticationFilter - OAuth2/JWT
// 8. RequestCacheAwareFilter       - Restore saved request
// 9. SecurityContextHolderAwareRequestFilter
// 10. AnonymousAuthenticationFilter - Set anonymous auth
// 11. SessionManagementFilter      - Session fixation
// 12. ExceptionTranslationFilter   - Convert exceptions
// 13. FilterSecurityInterceptor    - URL authorization
\`\`\`

**4. Custom Filter Example:**
\`\`\`java
@Component
public class RequestLoggingFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        long start = System.currentTimeMillis();
        String path = request.getRequestURI();

        try {
            filterChain.doFilter(request, response);
        } finally {
            long duration = System.currentTimeMillis() - start;
            logger.info("{} {} - {}ms - status {}",
                request.getMethod(), path, duration,
                response.getStatus());
        }
    }
}
\`\`\`

**5. Registering Custom Filter:**
\`\`\`java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http)
        throws Exception {
    http
        // Add BEFORE a specific filter
        .addFilterBefore(new RequestLoggingFilter(),
            UsernamePasswordAuthenticationFilter.class)
        // Add AFTER a specific filter
        .addFilterAfter(new AuditFilter(),
            FilterSecurityInterceptor.class)
        // Add AT the position of a filter (replaces it)
        .addFilterAt(new CustomAuthFilter(),
            UsernamePasswordAuthenticationFilter.class)
        .authorizeHttpRequests(auth -> auth
            .anyRequest().authenticated());

    return http.build();
}
\`\`\`

**Key Points:**
- Filters execute in a fixed order regardless of registration order
- Each filter can short-circuit the chain (e.g., return 401)
- \`OncePerRequestFilter\` guarantees single execution per request
- Multiple SecurityFilterChain beans can coexist for different URL patterns`
    },
    {
      id: 5,
      category: 'CSRF',
      difficulty: 'Medium',
      question: 'What is CSRF and how does Spring Security protect against it?',
      answer: `**CSRF (Cross-Site Request Forgery):**

**1. The Attack:**
A malicious site tricks a logged-in user's browser into sending requests to your app
\`\`\`html
<!-- Attacker's site: evil.com -->
<form action="https://bank.com/transfer" method="POST">
    <input type="hidden" name="to" value="attacker" />
    <input type="hidden" name="amount" value="10000" />
</form>
<script>document.forms[0].submit();</script>
<!-- Browser auto-sends the bank's session cookie -->
\`\`\`

**2. Spring's Defense - Synchronizer Token:**
\`\`\`java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http)
        throws Exception {
    http
        .csrf(csrf -> csrf
            // Default: HttpSessionCsrfTokenRepository
            // Stores token in session, expects _csrf param
            .csrfTokenRepository(
                CookieCsrfTokenRepository.withHttpOnlyFalse())
            // Ignore specific paths
            .ignoringRequestMatchers("/api/webhooks/**")
        );

    return http.build();
}
\`\`\`

**3. How It Works:**
\`\`\`java
// 1. Server generates a random token per session
// 2. Token embedded in forms as hidden field:
//    <input type="hidden" name="_csrf" value="abc123..." />
// 3. Token also sent as header: X-CSRF-TOKEN
// 4. Server validates token on every state-changing request
//    (POST, PUT, DELETE, PATCH)
// 5. GET requests are NOT checked (should be idempotent)
\`\`\`

**4. Thymeleaf Auto-Includes Token:**
\`\`\`html
<!-- Thymeleaf automatically adds the hidden field -->
<form th:action="@{/transfer}" method="post">
    <!-- _csrf hidden input auto-generated -->
    <input type="text" name="amount" />
    <button type="submit">Transfer</button>
</form>
\`\`\`

**5. JavaScript SPA with Cookie Approach:**
\`\`\`javascript
// CookieCsrfTokenRepository sets XSRF-TOKEN cookie
// JavaScript reads cookie and sends as X-XSRF-TOKEN header

fetch('/api/transfer', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
    },
    body: JSON.stringify({ to: 'user2', amount: 100 })
});
\`\`\`

**6. When to Disable CSRF:**
\`\`\`java
// Stateless APIs using JWT (no cookies = no CSRF risk)
http.csrf(csrf -> csrf.disable());
// Only safe when NOT using cookie-based auth
\`\`\``
    },
    {
      id: 6,
      category: 'Password Encoding',
      difficulty: 'Easy',
      question: 'How does password encoding work in Spring Security?',
      answer: `**Password Encoding in Spring Security:**

**1. PasswordEncoder Interface:**
\`\`\`java
public interface PasswordEncoder {
    String encode(CharSequence rawPassword);
    boolean matches(CharSequence rawPassword,
                    String encodedPassword);
    default boolean upgradeEncoding(String encodedPassword) {
        return false;
    }
}
\`\`\`

**2. BCryptPasswordEncoder (Recommended):**
\`\`\`java
@Bean
public PasswordEncoder passwordEncoder() {
    // Strength 10 is default (4-31), higher = slower
    return new BCryptPasswordEncoder(12);
}

// Usage
PasswordEncoder encoder = new BCryptPasswordEncoder(12);
String hashed = encoder.encode("myPassword");
// $2a$12$LJ3m4ys3... (includes salt automatically)

boolean matches = encoder.matches("myPassword", hashed);
// true
\`\`\`

**3. DelegatingPasswordEncoder (Flexible):**
\`\`\`java
@Bean
public PasswordEncoder passwordEncoder() {
    return PasswordEncoderFactories
        .createDelegatingPasswordEncoder();
    // Default: bcrypt
    // Supports: {bcrypt}, {scrypt}, {argon2},
    //           {pbkdf2}, {noop}, {sha256}
}

// Stored format: {bcrypt}$2a$10$abc...
// Allows migrating from old hash algorithms
\`\`\`

**4. Registration Flow:**
\`\`\`java
@Service
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    public User registerUser(String username,
                             String rawPassword) {
        User user = new User();
        user.setUsername(username);
        // ALWAYS encode before storing
        user.setPassword(
            passwordEncoder.encode(rawPassword));
        return userRepository.save(user);
    }
}
\`\`\`

**5. Why BCrypt?**
- Includes salt automatically (no separate salt column)
- Adaptive: increase strength as hardware gets faster
- Intentionally slow: ~100ms per hash at strength 10
- Same password produces different hashes each time

**Never do this:**
\`\`\`java
// WRONG - plain text
user.setPassword("myPassword");

// WRONG - fast hash, easily cracked
user.setPassword(DigestUtils.md5Hex("myPassword"));
user.setPassword(DigestUtils.sha256Hex("myPassword"));

// RIGHT
user.setPassword(passwordEncoder.encode("myPassword"));
\`\`\``
    },
    {
      id: 7,
      category: 'SecurityContext',
      difficulty: 'Medium',
      question: 'How does SecurityContextHolder work and how is it stored across requests?',
      answer: `**SecurityContextHolder:**

**1. What It Holds:**
\`\`\`java
// SecurityContextHolder -> SecurityContext -> Authentication
Authentication auth = SecurityContextHolder
    .getContext().getAuthentication();

String username = auth.getName();
Object principal = auth.getPrincipal();     // UserDetails
Object credentials = auth.getCredentials(); // password (usually null after auth)
Collection<? extends GrantedAuthority> roles =
    auth.getAuthorities();
boolean authenticated = auth.isAuthenticated();
\`\`\`

**2. Storage Strategies:**
\`\`\`java
// MODE_THREADLOCAL (default)
// Each thread has its own SecurityContext
// Perfect for servlet-per-request model
SecurityContextHolder.setStrategyName(
    SecurityContextHolder.MODE_THREADLOCAL);

// MODE_INHERITABLETHREADLOCAL
// Child threads inherit parent's SecurityContext
// Useful for @Async methods
SecurityContextHolder.setStrategyName(
    SecurityContextHolder.MODE_INHERITABLETHREADLOCAL);

// MODE_GLOBAL
// Single context shared across all threads
// Rarely used (standalone apps)
SecurityContextHolder.setStrategyName(
    SecurityContextHolder.MODE_GLOBAL);
\`\`\`

**3. How It Persists Across Requests (Stateful):**
\`\`\`java
// SecurityContextPersistenceFilter (deprecated in 6.x)
// or SecurityContextHolderFilter (new)

// Request arrives:
// 1. Load SecurityContext from HttpSession
// 2. Set it on SecurityContextHolder (ThreadLocal)
// 3. Request processed with auth available
// 4. After response, save SecurityContext back to session
// 5. Clear ThreadLocal

// Session attribute key:
// SPRING_SECURITY_CONTEXT
\`\`\`

**4. Stateless (JWT) - No Persistence:**
\`\`\`java
// With SessionCreationPolicy.STATELESS:
// 1. JwtAuthenticationFilter reads token from header
// 2. Validates and creates Authentication object
// 3. Sets it on SecurityContextHolder
// 4. Request processed
// 5. SecurityContext cleared (not saved to session)
// 6. Next request: repeat from step 1
\`\`\`

**5. Accessing in Controller:**
\`\`\`java
@RestController
public class UserController {

    // Option 1: SecurityContextHolder directly
    @GetMapping("/me")
    public String currentUser() {
        Authentication auth = SecurityContextHolder
            .getContext().getAuthentication();
        return auth.getName();
    }

    // Option 2: Inject Principal
    @GetMapping("/me2")
    public String currentUser(Principal principal) {
        return principal.getName();
    }

    // Option 3: @AuthenticationPrincipal
    @GetMapping("/me3")
    public String currentUser(
            @AuthenticationPrincipal UserDetails user) {
        return user.getUsername();
    }

    // Option 4: Authentication parameter
    @GetMapping("/me4")
    public String currentUser(Authentication auth) {
        return auth.getName();
    }
}
\`\`\`

**6. @Async and SecurityContext:**
\`\`\`java
@Configuration
@EnableAsync
public class AsyncConfig {

    @Bean
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor =
            new ThreadPoolTaskExecutor();
        // Propagate SecurityContext to async threads
        executor.setTaskDecorator(
            new DelegatingSecurityContextTaskDecorator());
        executor.initialize();
        return executor;
    }
}
\`\`\``
    },
    {
      id: 8,
      category: 'CORS',
      difficulty: 'Easy',
      question: 'How do you configure CORS in Spring Security?',
      answer: `**CORS Configuration in Spring Security:**

**1. Why CORS Matters:**
Browsers block requests from a different origin (domain, port, or protocol). Your React app on localhost:3000 calling your API on localhost:8080 is cross-origin.

**2. Spring Security CORS Config:**
\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        http
            .cors(cors -> cors
                .configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .anyRequest().authenticated());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of(
            "https://myapp.com",
            "http://localhost:3000"
        ));
        config.setAllowedMethods(List.of(
            "GET", "POST", "PUT", "DELETE", "OPTIONS"
        ));
        config.setAllowedHeaders(List.of(
            "Authorization", "Content-Type", "X-Requested-With"
        ));
        config.setExposedHeaders(List.of(
            "Authorization"
        ));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L); // Cache preflight 1 hour

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
\`\`\`

**3. Per-Controller CORS:**
\`\`\`java
@RestController
@CrossOrigin(
    origins = "https://myapp.com",
    maxAge = 3600)
public class ApiController {

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/api/data")
    public ResponseEntity<?> getData() {
        return ResponseEntity.ok(data);
    }
}
\`\`\`

**4. Common Mistakes:**
\`\`\`java
// WRONG: allowCredentials + wildcard origin
config.setAllowedOrigins(List.of("*"));
config.setAllowCredentials(true); // ERROR!

// RIGHT: use allowedOriginPatterns for wildcards
config.setAllowedOriginPatterns(List.of("https://*.myapp.com"));
config.setAllowCredentials(true); // OK
\`\`\`

**Key Points:**
- Spring Security's CORS filter must run BEFORE security filters
- Always configure CORS in SecurityFilterChain, not just @CrossOrigin
- Preflight (OPTIONS) requests must be permitted
- \`allowCredentials(true)\` needed for cookies/Authorization headers`
    },
    {
      id: 9,
      category: 'Session Management',
      difficulty: 'Medium',
      question: 'How do you prevent session fixation and manage concurrent sessions?',
      answer: `**Session Security in Spring Security:**

**1. Session Fixation Protection:**
\`\`\`java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http)
        throws Exception {
    http
        .sessionManagement(session -> session
            // migrateSession (default) - create new session,
            // copy attributes from old session
            .sessionFixation().migrateSession()

            // changeSessionId - Servlet 3.1+, keeps same
            // session but changes ID (most efficient)
            // .sessionFixation().changeSessionId()

            // newSession - create brand new session,
            // old attributes NOT copied
            // .sessionFixation().newSession()

            // none - DANGEROUS: no protection
            // .sessionFixation().none()
        );

    return http.build();
}
\`\`\`

**2. What Is Session Fixation?**
\`\`\`java
// Attack scenario:
// 1. Attacker gets a valid session ID from your app
// 2. Tricks victim into using that session ID
//    (e.g., link with JSESSIONID in URL)
// 3. Victim logs in with attacker's session ID
// 4. Attacker now has an authenticated session
//
// Fix: Change session ID after login (migrateSession)
\`\`\`

**3. Concurrent Session Control:**
\`\`\`java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http)
        throws Exception {
    http
        .sessionManagement(session -> session
            .maximumSessions(1)
            // true = block new login
            // false (default) = expire old session
            .maxSessionsPreventsLogin(false)
            .expiredSessionStrategy(event -> {
                HttpServletResponse response =
                    event.getResponse();
                response.setStatus(401);
                response.getWriter().write(
                    "Session expired: logged in elsewhere");
            })
        );

    return http.build();
}

// REQUIRED: register HttpSessionEventPublisher
@Bean
public HttpSessionEventPublisher httpSessionEventPublisher() {
    return new HttpSessionEventPublisher();
}
\`\`\`

**4. Session Cookie Configuration:**
\`\`\`yaml
server:
  servlet:
    session:
      timeout: 30m
      cookie:
        http-only: true    # JS cannot read cookie
        secure: true       # Only sent over HTTPS
        same-site: strict  # No cross-site requests
        name: SESSIONID    # Custom cookie name
        max-age: 1800      # Cookie lifetime in seconds
\`\`\`

**5. Stateless for REST APIs:**
\`\`\`java
http
    .sessionManagement(session -> session
        .sessionCreationPolicy(
            SessionCreationPolicy.STATELESS))
    // STATELESS: never create or use HttpSession
    // No session fixation risk
    // No concurrent session issue
    // Must authenticate every request (JWT/API key)
\`\`\``
    },
    {
      id: 10,
      category: 'Exception Handling',
      difficulty: 'Medium',
      question: 'How do you handle security exceptions (401/403) in Spring Security?',
      answer: `**Security Exception Handling:**

**1. Two Types of Security Exceptions:**
\`\`\`java
// AuthenticationException -> 401 Unauthorized
//   User is not authenticated (no credentials or invalid)

// AccessDeniedException -> 403 Forbidden
//   User is authenticated but lacks permission
\`\`\`

**2. Custom Handlers:**
\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        http
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint(
                    new CustomAuthEntryPoint())
                .accessDeniedHandler(
                    new CustomAccessDeniedHandler())
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated());

        return http.build();
    }
}
\`\`\`

**3. AuthenticationEntryPoint (401):**
\`\`\`java
@Component
public class CustomAuthEntryPoint
        implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException)
            throws IOException {

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(
            new ObjectMapper().writeValueAsString(Map.of(
                "status", 401,
                "error", "Unauthorized",
                "message", "Authentication required",
                "path", request.getRequestURI(),
                "timestamp", Instant.now().toString()
            ))
        );
    }
}
\`\`\`

**4. AccessDeniedHandler (403):**
\`\`\`java
@Component
public class CustomAccessDeniedHandler
        implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request,
            HttpServletResponse response,
            AccessDeniedException accessDeniedException)
            throws IOException {

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);

        Authentication auth = SecurityContextHolder
            .getContext().getAuthentication();

        response.getWriter().write(
            new ObjectMapper().writeValueAsString(Map.of(
                "status", 403,
                "error", "Forbidden",
                "message", "You do not have permission",
                "user", auth != null ? auth.getName() : "unknown",
                "path", request.getRequestURI()
            ))
        );
    }
}
\`\`\`

**5. ExceptionTranslationFilter Flow:**
\`\`\`java
// How Spring Security handles exceptions internally:
//
// 1. ExceptionTranslationFilter wraps the filter chain
//    in a try-catch
//
// 2. If AuthenticationException:
//    a. Clear SecurityContext
//    b. Save current request (for redirect after login)
//    c. Call AuthenticationEntryPoint.commence()
//
// 3. If AccessDeniedException:
//    a. If user is anonymous -> treat as AuthenticationException
//    b. If user is authenticated -> call AccessDeniedHandler
//
// The filter sits AFTER authorization filters so it catches
// exceptions from FilterSecurityInterceptor
\`\`\``
    },
    {
      id: 11,
      category: 'Method Security',
      difficulty: 'Hard',
      question: 'Explain @PreAuthorize vs @Secured vs @RolesAllowed with custom permission evaluators',
      answer: `**Method Security Annotations:**

**1. Comparison:**
\`\`\`java
// @PreAuthorize - Most powerful, SpEL expressions
// @PostAuthorize - Check AFTER method runs
// @Secured - Simple role list, Spring-specific
// @RolesAllowed - Simple role list, JSR-250 standard
\`\`\`

**2. Enable All Three:**
\`\`\`java
@Configuration
@EnableMethodSecurity(
    prePostEnabled = true,   // @PreAuthorize, @PostAuthorize
    securedEnabled = true,   // @Secured
    jsr250Enabled = true     // @RolesAllowed
)
public class MethodSecurityConfig { }
\`\`\`

**3. @PreAuthorize - Full SpEL Power:**
\`\`\`java
@Service
public class OrderService {

    // Simple role check
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteOrder(Long id) { }

    // Multiple roles
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public void approveOrder(Long id) { }

    // Access method parameters
    @PreAuthorize("#order.customerId == authentication.principal.id")
    public void updateOrder(Order order) { }

    // Complex logic
    @PreAuthorize(
        "hasRole('ADMIN') or " +
        "(hasRole('USER') and #userId == authentication.principal.id)")
    public Order getOrder(Long userId, Long orderId) { }

    // Custom permission
    @PreAuthorize("hasPermission(#id, 'Order', 'DELETE')")
    public void cancelOrder(Long id) { }
}
\`\`\`

**4. @Secured vs @RolesAllowed:**
\`\`\`java
@Service
public class ProductService {

    // @Secured: Spring-specific, needs ROLE_ prefix
    @Secured("ROLE_ADMIN")
    public void deleteProduct(Long id) { }

    @Secured({"ROLE_ADMIN", "ROLE_MANAGER"})
    public void updatePrice(Long id, BigDecimal price) { }

    // @RolesAllowed: JSR-250, no ROLE_ prefix needed
    @RolesAllowed("ADMIN")
    public void deleteCategory(Long id) { }

    @RolesAllowed({"ADMIN", "MANAGER"})
    public void updateStock(Long id, int quantity) { }
}
// Note: @Secured and @RolesAllowed do NOT support SpEL
// They only support simple role-based checks
\`\`\`

**5. Custom PermissionEvaluator:**
\`\`\`java
@Component
public class OrderPermissionEvaluator
        implements PermissionEvaluator {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public boolean hasPermission(
            Authentication auth,
            Object target, Object permission) {

        if (target instanceof Order order) {
            String perm = (String) permission;
            Long userId = ((CustomUser) auth.getPrincipal()).getId();

            return switch (perm) {
                case "READ" -> order.getCustomerId().equals(userId)
                    || hasRole(auth, "ADMIN");
                case "UPDATE" -> order.getCustomerId().equals(userId)
                    && order.getStatus() == Status.DRAFT;
                case "DELETE" -> hasRole(auth, "ADMIN");
                default -> false;
            };
        }
        return false;
    }

    @Override
    public boolean hasPermission(
            Authentication auth,
            Serializable targetId, String targetType,
            Object permission) {

        if ("Order".equals(targetType)) {
            Order order = orderRepository
                .findById((Long) targetId).orElse(null);
            return order != null &&
                hasPermission(auth, order, permission);
        }
        return false;
    }

    private boolean hasRole(Authentication auth, String role) {
        return auth.getAuthorities().stream()
            .anyMatch(a -> a.getAuthority()
                .equals("ROLE_" + role));
    }
}
\`\`\`

**6. Register and Use:**
\`\`\`java
@Configuration
@EnableMethodSecurity
public class MethodSecurityConfig {

    @Bean
    public DefaultMethodSecurityExpressionHandler
            expressionHandler(
                OrderPermissionEvaluator evaluator) {
        DefaultMethodSecurityExpressionHandler handler =
            new DefaultMethodSecurityExpressionHandler();
        handler.setPermissionEvaluator(evaluator);
        return handler;
    }
}

@Service
public class OrderService {

    // Uses hasPermission with target ID and type
    @PreAuthorize("hasPermission(#orderId, 'Order', 'READ')")
    public Order getOrder(Long orderId) {
        return orderRepository.findById(orderId)
            .orElseThrow();
    }

    // Uses hasPermission with object
    @PreAuthorize("hasPermission(#order, 'UPDATE')")
    public Order updateOrder(Order order) {
        return orderRepository.save(order);
    }
}
\`\`\``
    },
    {
      id: 12,
      category: 'Stateless vs Stateful',
      difficulty: 'Medium',
      question: 'When should you use stateless (JWT) vs stateful (session) authentication?',
      answer: `**Stateless vs Stateful Authentication:**

**1. Stateful (Session-Based):**
\`\`\`java
@Bean
public SecurityFilterChain sessionBased(HttpSecurity http)
        throws Exception {
    http
        .sessionManagement(session -> session
            .sessionCreationPolicy(
                SessionCreationPolicy.IF_REQUIRED)
            .maximumSessions(1))
        .csrf(csrf -> csrf
            .csrfTokenRepository(
                CookieCsrfTokenRepository.withHttpOnlyFalse()))
        .formLogin(form -> form
            .loginPage("/login")
            .defaultSuccessUrl("/dashboard"));

    return http.build();
}
// Flow: Login -> Server creates session -> JSESSIONID cookie
// Every request: browser sends cookie automatically
\`\`\`

**2. Stateless (JWT-Based):**
\`\`\`java
@Bean
public SecurityFilterChain jwtBased(HttpSecurity http)
        throws Exception {
    http
        .sessionManagement(session -> session
            .sessionCreationPolicy(
                SessionCreationPolicy.STATELESS))
        .csrf(csrf -> csrf.disable())
        .addFilterBefore(jwtFilter,
            UsernamePasswordAuthenticationFilter.class);

    return http.build();
}
// Flow: Login -> Server returns JWT -> Client stores token
// Every request: client sends Authorization: Bearer <token>
\`\`\`

**3. Comparison:**

**Scalability:**
- Session: Needs sticky sessions or shared store (Redis)
- JWT: Any server handles any request (no shared state)

**Logout:**
- Session: server.invalidateSession() - instant
- JWT: Token valid until expiry; need a blocklist for forced revoke

**Security:**
- Session: CSRF vulnerable (cookie auto-sent) - need CSRF token
- JWT: No CSRF if using Authorization header (not cookie)

**Performance:**
- Session: DB/Redis lookup per request to load session
- JWT: CPU cost to validate signature (no I/O)

**Size:**
- Session: Small cookie (~32 bytes)
- JWT: Large token (~800+ bytes with claims)

**4. When to Use Stateful:**
\`\`\`java
// - Server-rendered apps (Thymeleaf, JSP)
// - Monolith with single server
// - Need instant logout / revocation
// - Admin portals with tight session control
// - Already have Redis for session sharing
\`\`\`

**5. When to Use Stateless:**
\`\`\`java
// - REST APIs consumed by SPA / mobile
// - Microservices (pass JWT between services)
// - Horizontal scaling without shared state
// - Cross-domain authentication needed
// - Third-party API access
\`\`\`

**6. Hybrid Approach:**
\`\`\`java
// Use BOTH in the same app
@Bean
@Order(1)
public SecurityFilterChain apiChain(HttpSecurity http)
        throws Exception {
    http
        .securityMatcher("/api/**")
        .sessionManagement(s -> s.sessionCreationPolicy(
            SessionCreationPolicy.STATELESS))
        .csrf(csrf -> csrf.disable())
        .addFilterBefore(jwtFilter,
            UsernamePasswordAuthenticationFilter.class)
        .authorizeHttpRequests(auth -> auth
            .anyRequest().authenticated());
    return http.build();
}

@Bean
@Order(2)
public SecurityFilterChain webChain(HttpSecurity http)
        throws Exception {
    http
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/login").permitAll()
            .anyRequest().authenticated())
        .formLogin(form -> form.loginPage("/login"));
    return http.build();
}
// /api/** uses JWT, everything else uses sessions
\`\`\``
    }
  ]

  // Filter questions based on problemLimit (for Top 100/300 mode)
  const displayQuestions = problemLimit ? questions.slice(0, problemLimit) : questions

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
          color: '#93c5fd',
          margin: 0
        }}>
          Spring Security Questions
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
              border: `3px solid #374151`,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: expandedQuestionId === q.id
                ? `0 0 0 4px ${categoryColor}20, 0 8px 16px rgba(0,0,0,0.3)`
                : '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <div
              onClick={() => setExpandedQuestionId(expandedQuestionId === q.id ? null : q.id)}
              style={{
                padding: '1.5rem',
                cursor: 'pointer',
                backgroundColor: expandedQuestionId === q.id ? '#374151' : 'transparent',
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
                    backgroundColor: `${categoryColor}20`,
                    color: categoryColor,
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    {q.category}
                  </span>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: `${getDifficultyColor(q.difficulty)}20`,
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
                    <CompletionCheckbox problemId={`SpringSecurityQuestions-${q.id}`} />
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
                color: '#e2e8f0',
                margin: 0
              }}>
                {q.question}
              </h3>
            </div>

            {expandedQuestionId === q.id && (
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#1e293b',
                borderTop: `2px solid ${categoryColor}20`,
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
        background: 'rgba(99, 102, 241, 0.15)',
        borderRadius: '12px',
        border: `3px solid #374151`
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#93c5fd',
          marginBottom: '1rem'
        }}>
          Security Best Practices
        </h3>
        <ul style={{
          fontSize: '1rem',
          textAlign: 'left',
          lineHeight: '2',
          color: '#d1d5db',
          paddingLeft: '1.5rem'
        }}>
          <li><strong>Always use HTTPS</strong> in production for encrypted communication</li>
          <li><strong>Never store passwords in plain text</strong> - use BCrypt or Argon2</li>
          <li><strong>Enable CSRF protection</strong> for stateful applications</li>
          <li><strong>Use secure session management</strong> - HttpOnly, Secure, SameSite cookies</li>
          <li><strong>Implement rate limiting</strong> to prevent brute force attacks</li>
          <li><strong>Use JWT with short expiration</strong> and refresh tokens</li>
          <li><strong>Validate and sanitize all inputs</strong> to prevent injection attacks</li>
          <li><strong>Apply principle of least privilege</strong> - minimum required permissions</li>
          <li><strong>Enable security headers</strong> (X-Frame-Options, X-XSS-Protection, CSP)</li>
          <li><strong>Implement proper logout</strong> - invalidate sessions/tokens completely</li>
        </ul>
      </div>
    </div>
  )
}

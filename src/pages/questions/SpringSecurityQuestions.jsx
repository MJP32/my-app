import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

export default function SpringSecurityQuestions({ onBack, breadcrumb }) {
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
    }
  ]

  const renderFormattedAnswer = (answer) => {
    const parts = answer.split(/(\*\*.*?\*\*|`[^`]+`|```[\s\S]*?```)/g)

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const code = part.slice(3, -3)
        const lines = code.split('\n')
        const language = lines[0].trim()
        const codeContent = lines.slice(1).join('\n')

        return (
          <pre key={index} style={{
            backgroundColor: '#1e293b',
            color: '#e2e8f0',
            padding: '1rem',
            borderRadius: '8px',
            overflowX: 'auto',
            margin: '1rem 0',
            border: '2px solid #334155'
          }}>
            {language && (
              <div style={{
                color: '#94a3b8',
                fontSize: '0.75rem',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                fontWeight: '600'
              }}>
                {language}
              </div>
            )}
            <code style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              {codeContent}
            </code>
          </pre>
        )
      }

      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} style={{ color: '#e2e8f0', fontSize: '1.05rem' }}>
            {part.slice(2, -2)}
          </strong>
        )
      }

      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={index} style={{
            backgroundColor: '#374151',
            color: '#f472b6',
            padding: '0.2rem 0.4rem',
            borderRadius: '4px',
            fontSize: '0.9rem',
            fontFamily: 'monospace',
            border: '1px solid #4b5563'
          }}>
            {part.slice(1, -1)}
          </code>
        )
      }

      return <span key={index}>{part}</span>
    })
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

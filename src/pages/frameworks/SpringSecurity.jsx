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
      .replace(/\b(String|List|ArrayList|Map|HashMap|Set|HashSet|Optional|Exception|Override|Integer|Long|Collection|Collections|Arrays|Object|Serializable|Component|Bean|Configuration|Autowired|Service|Repository|Controller|RestController|RequestMapping|PostMapping|GetMapping|PutMapping|DeleteMapping|RequestBody|PathVariable|ResponseEntity|HttpStatus|CrossOrigin|SecurityFilterChain|HttpSecurity|WebSecurityCustomizer|AuthenticationManager|AuthenticationProvider|UserDetailsService|UserDetails|GrantedAuthority|SimpleGrantedAuthority|BCryptPasswordEncoder|PasswordEncoder|SecurityContextHolder|Authentication|UsernamePasswordAuthenticationToken|SecurityContext|DaoAuthenticationProvider|OncePerRequestFilter|HttpServletRequest|HttpServletResponse|FilterChain|ServletException|IOException|CorsConfiguration|CorsConfigurationSource|UrlBasedCorsConfigurationSource|SessionCreationPolicy|PreAuthorize|PostAuthorize|Secured|RolesAllowed|EnableWebSecurity|EnableMethodSecurity|EnableGlobalMethodSecurity|OAuth2ResourceServer|JwtDecoder|NimbusJwtDecoder|JwtAuthenticationConverter|JwtGrantedAuthoritiesConverter|RegisteredClient|RegisteredClientRepository|InMemoryRegisteredClientRepository|ClientSettings|TokenSettings|AuthorizationServerSettings|Claims|Jwts|SignatureAlgorithm|Keys|SecretKey|Date|CsrfToken|CsrfTokenRequestAttributeHandler|CookieCsrfTokenRepository|CsrfTokenRepository|HttpSessionCsrfTokenRepository|AuthenticationEntryPoint|AccessDeniedHandler|AuthenticationSuccessHandler|AuthenticationFailureHandler|SavedRequestAwareAuthenticationSuccessHandler|SimpleUrlAuthenticationFailureHandler|RememberMeServices|PersistentTokenBasedRememberMeServices|JdbcTokenRepositoryImpl|DataSource|User|Role|Permission|Authority|RoleHierarchy|RoleHierarchyImpl|SecurityExpressionHandler|MethodSecurityExpressionHandler|DefaultMethodSecurityExpressionHandler|PermissionEvaluator)\b/g, '<span style="color: #4ec9b0;">$1</span>')
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

const SpringSecurityArchitectureDiagram = () => (
  <svg viewBox="0 0 1100 820" style={{ width: '100%', height: 'auto', borderRadius: '0.75rem', background: '#0f172a' }}>
    <defs>
      <marker id="ss-arrow" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
      </marker>
      <marker id="ss-arrow-red" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f87171" />
      </marker>
      <marker id="ss-arrow-green" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
      <linearGradient id="ss-grad-client" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" /><stop offset="100%" stopColor="#1e40af" stopOpacity="0.15" /></linearGradient>
      <linearGradient id="ss-grad-filter" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" /><stop offset="100%" stopColor="#d97706" stopOpacity="0.1" /></linearGradient>
      <linearGradient id="ss-grad-auth" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" /><stop offset="100%" stopColor="#dc2626" stopOpacity="0.1" /></linearGradient>
      <linearGradient id="ss-grad-authz" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" /><stop offset="100%" stopColor="#7c3aed" stopOpacity="0.1" /></linearGradient>
      <linearGradient id="ss-grad-app" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity="0.3" /><stop offset="100%" stopColor="#059669" stopOpacity="0.15" /></linearGradient>
    </defs>

    {/* Title */}
    <text x="550" y="32" textAnchor="middle" fill="#f1f5f9" fontSize="18" fontWeight="bold" fontFamily="monospace">Spring Security Architecture &mdash; Request Flow</text>

    {/* ── Layer 1: Client ── */}
    <rect x="30" y="52" width="200" height="80" rx="12" fill="url(#ss-grad-client)" stroke="#3b82f6" strokeWidth="1.5" />
    <text x="130" y="78" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="bold" fontFamily="monospace">HTTP Client</text>
    <text x="130" y="98" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">Browser / Mobile / API</text>
    <text x="130" y="118" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">GET /api/users</text>
    <text x="130" y="128" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">Authorization: Bearer &lt;jwt&gt;</text>

    {/* Arrow: Client → DelegatingFilterProxy */}
    <line x1="230" y1="92" x2="278" y2="92" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#ss-arrow)" />

    {/* ── Layer 2: Servlet Container ── */}
    <rect x="282" y="52" width="200" height="80" rx="12" fill="url(#ss-grad-filter)" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="382" y="75" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold" fontFamily="monospace">Servlet Container</text>
    <text x="382" y="95" textAnchor="middle" fill="#d1d5db" fontSize="10" fontFamily="monospace">DelegatingFilterProxy</text>
    <text x="382" y="112" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">delegates to Spring</text>

    {/* Arrow: DelegatingFilterProxy → FilterChainProxy */}
    <line x1="482" y1="92" x2="530" y2="92" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#ss-arrow)" />

    {/* ── Layer 3: FilterChainProxy ── */}
    <rect x="534" y="52" width="220" height="80" rx="12" fill="url(#ss-grad-filter)" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="644" y="75" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold" fontFamily="monospace">FilterChainProxy</text>
    <text x="644" y="95" textAnchor="middle" fill="#d1d5db" fontSize="10" fontFamily="monospace">Selects SecurityFilterChain</text>
    <text x="644" y="112" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">by request matcher</text>

    {/* Arrow: FilterChainProxy → Response */}
    <line x1="754" y1="92" x2="802" y2="92" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#ss-arrow)" />

    {/* Response box */}
    <rect x="806" y="52" width="170" height="80" rx="12" fill="url(#ss-grad-app)" stroke="#10b981" strokeWidth="1.5" />
    <text x="891" y="78" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="bold" fontFamily="monospace">Application</text>
    <text x="891" y="96" textAnchor="middle" fill="#d1d5db" fontSize="10" fontFamily="monospace">DispatcherServlet</text>
    <text x="891" y="113" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">@RestController</text>

    {/* Step badges on top-level boxes */}
    <circle cx="30" cy="52" r="9" fill="#3b82f6" stroke="#0f172a" strokeWidth="1.5" />
    <text x="30" y="55" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="monospace">1</text>
    <circle cx="806" cy="52" r="9" fill="#06b6d4" stroke="#0f172a" strokeWidth="1.5" />
    <text x="806" y="55" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="monospace">6</text>

    {/* ── Main SecurityFilterChain box ── */}
    <rect x="30" y="160" width="1045" height="340" rx="14" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="6,4" />
    <text x="50" y="185" fill="#94a3b8" fontSize="13" fontWeight="bold" fontFamily="monospace">SecurityFilterChain (ordered filters)</text>

    {/* Filter 1: SecurityContextPersistenceFilter */}
    <rect x="50" y="200" width="175" height="65" rx="10" fill="url(#ss-grad-filter)" stroke="#f59e0b" strokeWidth="1.2" />
    <text x="137" y="222" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">SecurityContext</text>
    <text x="137" y="237" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">PersistenceFilter</text>
    <text x="137" y="255" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">Load/save context</text>

    <line x1="225" y1="232" x2="248" y2="232" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#ss-arrow)" />

    {/* Filter 2: CsrfFilter */}
    <rect x="252" y="200" width="140" height="65" rx="10" fill="url(#ss-grad-filter)" stroke="#f59e0b" strokeWidth="1.2" />
    <text x="322" y="225" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">CsrfFilter</text>
    <text x="322" y="245" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">Validate CSRF token</text>
    <text x="322" y="258" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">POST/PUT/DELETE</text>

    <line x1="392" y1="232" x2="415" y2="232" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#ss-arrow)" />

    {/* Filter 3: CorsFilter */}
    <rect x="419" y="200" width="140" height="65" rx="10" fill="url(#ss-grad-filter)" stroke="#f59e0b" strokeWidth="1.2" />
    <text x="489" y="225" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">CorsFilter</text>
    <text x="489" y="245" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">Cross-origin policy</text>
    <text x="489" y="258" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">preflight &amp; headers</text>

    <line x1="559" y1="232" x2="582" y2="232" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#ss-arrow)" />

    {/* Filter 4: UsernamePasswordAuthFilter */}
    <rect x="586" y="200" width="175" height="65" rx="10" fill="url(#ss-grad-auth)" stroke="#ef4444" strokeWidth="1.2" />
    <text x="673" y="222" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold" fontFamily="monospace">UsernamePassword</text>
    <text x="673" y="237" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold" fontFamily="monospace">AuthFilter</text>
    <text x="673" y="255" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">Form login</text>

    <line x1="761" y1="232" x2="784" y2="232" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#ss-arrow)" />

    {/* Filter 5: BearerTokenAuthFilter / JWT */}
    <rect x="788" y="200" width="175" height="65" rx="10" fill="url(#ss-grad-auth)" stroke="#ef4444" strokeWidth="1.2" />
    <text x="875" y="222" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold" fontFamily="monospace">BearerToken</text>
    <text x="875" y="237" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold" fontFamily="monospace">AuthFilter (JWT)</text>
    <text x="875" y="255" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">OAuth2 / JWT token</text>

    {/* ── Second row of filters ── */}
    <line x1="875" y1="265" x2="875" y2="290" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#ss-arrow)" />

    {/* Filter 6: ExceptionTranslationFilter */}
    <rect x="788" y="294" width="175" height="65" rx="10" fill="url(#ss-grad-filter)" stroke="#f59e0b" strokeWidth="1.2" />
    <text x="875" y="316" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">ExceptionTranslation</text>
    <text x="875" y="331" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">Filter</text>
    <text x="875" y="349" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">401 / 403 handling</text>

    <line x1="788" y1="326" x2="765" y2="326" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#ss-arrow)" />

    {/* Filter 7: AuthorizationFilter */}
    <rect x="586" y="294" width="175" height="65" rx="10" fill="url(#ss-grad-authz)" stroke="#8b5cf6" strokeWidth="1.2" />
    <text x="673" y="319" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontWeight="bold" fontFamily="monospace">AuthorizationFilter</text>
    <text x="673" y="339" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">hasRole / hasAuthority</text>
    <text x="673" y="352" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">requestMatchers rules</text>

    {/* Step badges on filter boxes */}
    <circle cx="50" cy="200" r="9" fill="#ec4899" stroke="#0f172a" strokeWidth="1.5" />
    <text x="50" y="203" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="monospace">8</text>
    <circle cx="252" cy="200" r="9" fill="#f59e0b" stroke="#0f172a" strokeWidth="1.5" />
    <text x="252" y="203" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="monospace">2</text>
    <circle cx="419" cy="200" r="9" fill="#f59e0b" stroke="#0f172a" strokeWidth="1.5" />
    <text x="419" y="203" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="monospace">2</text>
    <circle cx="586" cy="200" r="9" fill="#ef4444" stroke="#0f172a" strokeWidth="1.5" />
    <text x="586" y="203" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="monospace">3</text>
    <circle cx="788" cy="200" r="9" fill="#ef4444" stroke="#0f172a" strokeWidth="1.5" />
    <text x="788" y="203" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="monospace">3</text>
    <circle cx="788" cy="294" r="9" fill="#f97316" stroke="#0f172a" strokeWidth="1.5" />
    <text x="788" y="297" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="monospace">7</text>
    <circle cx="586" cy="294" r="9" fill="#8b5cf6" stroke="#0f172a" strokeWidth="1.5" />
    <text x="586" y="297" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="monospace">4</text>

    {/* ── Authentication Manager subsystem ── */}
    <rect x="50" y="294" width="520" height="190" rx="12" fill="rgba(239,68,68,0.06)" stroke="#ef4444" strokeWidth="1" strokeDasharray="5,3" />
    <text x="70" y="316" fill="#fca5a5" fontSize="12" fontWeight="bold" fontFamily="monospace">Authentication Manager</text>

    {/* AuthenticationProvider */}
    <rect x="70" y="328" width="200" height="55" rx="8" fill="url(#ss-grad-auth)" stroke="#ef4444" strokeWidth="1" />
    <text x="170" y="350" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold" fontFamily="monospace">DaoAuthentication</text>
    <text x="170" y="365" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold" fontFamily="monospace">Provider</text>
    <text x="170" y="378" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">verify credentials</text>

    {/* UserDetailsService */}
    <rect x="290" y="328" width="160" height="55" rx="8" fill="url(#ss-grad-auth)" stroke="#ef4444" strokeWidth="1" />
    <text x="370" y="352" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold" fontFamily="monospace">UserDetailsService</text>
    <text x="370" y="370" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">load user from DB</text>

    {/* Arrow: Provider → UserDetailsService */}
    <line x1="270" y1="355" x2="288" y2="355" stroke="#f87171" strokeWidth="1.5" markerEnd="url(#ss-arrow-red)" />

    {/* PasswordEncoder */}
    <rect x="70" y="400" width="160" height="50" rx="8" fill="url(#ss-grad-auth)" stroke="#ef4444" strokeWidth="1" />
    <text x="150" y="422" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold" fontFamily="monospace">PasswordEncoder</text>
    <text x="150" y="438" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">BCrypt / Argon2</text>

    {/* SecurityContextHolder */}
    <rect x="290" y="400" width="160" height="50" rx="8" fill="url(#ss-grad-auth)" stroke="#ef4444" strokeWidth="1" />
    <text x="370" y="420" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold" fontFamily="monospace">SecurityContext</text>
    <text x="370" y="436" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold" fontFamily="monospace">Holder</text>
    <text x="370" y="448" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">ThreadLocal storage</text>

    {/* Arrow: Provider → PasswordEncoder */}
    <line x1="170" y1="383" x2="170" y2="398" stroke="#f87171" strokeWidth="1.5" markerEnd="url(#ss-arrow-red)" />

    {/* Arrow: Provider → SecurityContextHolder */}
    <line x1="270" y1="375" x2="310" y2="398" stroke="#4ade80" strokeWidth="1.5" markerEnd="url(#ss-arrow-green)" />
    <text x="305" y="386" fill="#4ade80" fontSize="8" fontFamily="monospace">success</text>

    {/* JWT subsystem */}
    <rect x="480" y="328" width="80" height="55" rx="8" fill="url(#ss-grad-filter)" stroke="#f59e0b" strokeWidth="1" />
    <text x="520" y="352" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">JWT</text>
    <text x="520" y="365" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">Provider</text>
    <text x="520" y="378" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">decode token</text>

    {/* Arrow JWT → SecurityContextHolder */}
    <line x1="520" y1="383" x2="452" y2="405" stroke="#4ade80" strokeWidth="1.5" markerEnd="url(#ss-arrow-green)" />

    {/* ── Data Flow Summary ── */}
    <rect x="30" y="520" width="1045" height="290" rx="14" fill="rgba(30,41,59,0.5)" stroke="#334155" strokeWidth="1" />
    <text x="550" y="548" textAnchor="middle" fill="#f1f5f9" fontSize="14" fontWeight="bold" fontFamily="monospace">Request Lifecycle &mdash; Step by Step</text>

    {/* Step card backgrounds — column 1 */}
    <rect x="48" y="568" width="490" height="40" rx="8" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.3)" strokeWidth="1" />
    <rect x="48" y="568" width="3" height="40" rx="1.5" fill="#3b82f6" opacity="0.8" />
    <rect x="48" y="613" width="490" height="40" rx="8" fill="rgba(245,158,11,0.12)" stroke="rgba(245,158,11,0.3)" strokeWidth="1" />
    <rect x="48" y="613" width="3" height="40" rx="1.5" fill="#f59e0b" opacity="0.8" />
    <rect x="48" y="658" width="490" height="40" rx="8" fill="rgba(239,68,68,0.12)" stroke="rgba(239,68,68,0.3)" strokeWidth="1" />
    <rect x="48" y="658" width="3" height="40" rx="1.5" fill="#ef4444" opacity="0.8" />
    <rect x="48" y="703" width="490" height="40" rx="8" fill="rgba(139,92,246,0.12)" stroke="rgba(139,92,246,0.3)" strokeWidth="1" />
    <rect x="48" y="703" width="3" height="40" rx="1.5" fill="#8b5cf6" opacity="0.8" />
    {/* Step card backgrounds — column 2 */}
    <rect x="548" y="568" width="520" height="40" rx="8" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
    <rect x="548" y="568" width="3" height="40" rx="1.5" fill="#10b981" opacity="0.8" />
    <rect x="548" y="613" width="520" height="40" rx="8" fill="rgba(6,182,212,0.12)" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
    <rect x="548" y="613" width="3" height="40" rx="1.5" fill="#06b6d4" opacity="0.8" />
    <rect x="548" y="658" width="520" height="40" rx="8" fill="rgba(249,115,22,0.12)" stroke="rgba(249,115,22,0.3)" strokeWidth="1" />
    <rect x="548" y="658" width="3" height="40" rx="1.5" fill="#f97316" opacity="0.8" />
    <rect x="548" y="703" width="520" height="40" rx="8" fill="rgba(236,72,153,0.12)" stroke="rgba(236,72,153,0.3)" strokeWidth="1" />
    <rect x="548" y="703" width="3" height="40" rx="1.5" fill="#ec4899" opacity="0.8" />

    {/* Steps */}
    {/* Step 1 */}
    <circle cx="70" cy="585" r="14" fill="#3b82f6" />
    <text x="70" y="590" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="monospace">1</text>
    <text x="92" y="590" fill="#93c5fd" fontSize="10" fontWeight="bold" fontFamily="monospace">HTTP Request</text>
    <text x="92" y="604" fill="#94a3b8" fontSize="9" fontFamily="monospace">Client sends request with credentials or token</text>

    {/* Step 2 */}
    <circle cx="70" cy="630" r="14" fill="#f59e0b" />
    <text x="70" y="635" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="monospace">2</text>
    <text x="92" y="635" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">CSRF &amp; CORS Validation</text>
    <text x="92" y="649" fill="#94a3b8" fontSize="9" fontFamily="monospace">CsrfFilter validates token, CorsFilter checks origin</text>

    {/* Step 3 */}
    <circle cx="70" cy="675" r="14" fill="#ef4444" />
    <text x="70" y="680" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="monospace">3</text>
    <text x="92" y="680" fill="#fca5a5" fontSize="10" fontWeight="bold" fontFamily="monospace">Authentication</text>
    <text x="92" y="694" fill="#94a3b8" fontSize="9" fontFamily="monospace">AuthenticationManager verifies identity via provider chain</text>

    {/* Step 4 */}
    <circle cx="70" cy="720" r="14" fill="#8b5cf6" />
    <text x="70" y="725" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="monospace">4</text>
    <text x="92" y="725" fill="#c4b5fd" fontSize="10" fontWeight="bold" fontFamily="monospace">Authorization</text>
    <text x="92" y="739" fill="#94a3b8" fontSize="9" fontFamily="monospace">AuthorizationFilter checks roles/authorities against rules</text>

    {/* Steps column 2 */}
    {/* Step 5 */}
    <circle cx="570" cy="585" r="14" fill="#10b981" />
    <text x="570" y="590" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="monospace">5</text>
    <text x="592" y="590" fill="#6ee7b7" fontSize="10" fontWeight="bold" fontFamily="monospace">Method Security</text>
    <text x="592" y="604" fill="#94a3b8" fontSize="9" fontFamily="monospace">@PreAuthorize / @PostAuthorize on service methods</text>

    {/* Step 6 */}
    <circle cx="570" cy="630" r="14" fill="#06b6d4" />
    <text x="570" y="635" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="monospace">6</text>
    <text x="592" y="635" fill="#67e8f9" fontSize="10" fontWeight="bold" fontFamily="monospace">Controller Execution</text>
    <text x="592" y="649" fill="#94a3b8" fontSize="9" fontFamily="monospace">DispatcherServlet routes to @RestController handler</text>

    {/* Step 7 */}
    <circle cx="570" cy="675" r="14" fill="#f97316" />
    <text x="570" y="680" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="monospace">7</text>
    <text x="592" y="680" fill="#fdba74" fontSize="10" fontWeight="bold" fontFamily="monospace">Exception Handling</text>
    <text x="592" y="694" fill="#94a3b8" fontSize="9" fontFamily="monospace">ExceptionTranslationFilter converts to 401/403 responses</text>

    {/* Step 8 */}
    <circle cx="570" cy="720" r="14" fill="#ec4899" />
    <text x="570" y="725" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="monospace">8</text>
    <text x="592" y="725" fill="#f9a8d4" fontSize="10" fontWeight="bold" fontFamily="monospace">SecurityContext Cleanup</text>
    <text x="592" y="739" fill="#94a3b8" fontSize="9" fontFamily="monospace">Context cleared from ThreadLocal after response sent</text>

    {/* Legend */}
    <rect x="50" y="760" width="12" height="12" rx="2" fill="#f59e0b" opacity="0.5" />
    <text x="68" y="771" fill="#94a3b8" fontSize="9" fontFamily="monospace">Servlet Filters</text>
    <rect x="180" y="760" width="12" height="12" rx="2" fill="#ef4444" opacity="0.5" />
    <text x="198" y="771" fill="#94a3b8" fontSize="9" fontFamily="monospace">Authentication</text>
    <rect x="310" y="760" width="12" height="12" rx="2" fill="#8b5cf6" opacity="0.5" />
    <text x="328" y="771" fill="#94a3b8" fontSize="9" fontFamily="monospace">Authorization</text>
    <rect x="440" y="760" width="12" height="12" rx="2" fill="#10b981" opacity="0.5" />
    <text x="458" y="771" fill="#94a3b8" fontSize="9" fontFamily="monospace">Application</text>
    <rect x="560" y="760" width="12" height="12" rx="2" fill="#3b82f6" opacity="0.5" />
    <text x="578" y="771" fill="#94a3b8" fontSize="9" fontFamily="monospace">Client</text>

    {/* Flow arrows legend */}
    <line x1="680" y1="766" x2="710" y2="766" stroke="#4ade80" strokeWidth="2" markerEnd="url(#ss-arrow-green)" />
    <text x="718" y="770" fill="#94a3b8" fontSize="9" fontFamily="monospace">Success path</text>
    <line x1="830" y1="766" x2="860" y2="766" stroke="#f87171" strokeWidth="2" markerEnd="url(#ss-arrow-red)" />
    <text x="868" y="770" fill="#94a3b8" fontSize="9" fontFamily="monospace">Internal delegation</text>
  </svg>
)

function SpringSecurity({ onBack, breadcrumb }) {
  const [activeSection, setActiveSection] = useState('basic')

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
            background: 'rgba(239, 68, 68, 0.2)',
            color: '#fca5a5',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(239, 68, 68, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(239, 68, 68, 0.2)'
          }}
        >
          Back
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
        background: 'linear-gradient(to right, #ef4444, #f97316)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Spring Security
      </h1>
      <p style={{ color: '#d1d5db', textAlign: 'center', marginBottom: '2rem', fontSize: '1.1rem' }}>
        Comprehensive authentication, authorization, and protection for Spring applications
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
          { id: 'basic', label: 'Basic' },
          { id: 'overview', label: 'Overview' },
          { id: 'authentication', label: 'Authentication' },
          { id: 'authorization', label: 'Authorization' },
          { id: 'jwt', label: 'JWT' },
          { id: 'oauth2', label: 'OAuth2' },
          { id: 'csrf-cors', label: 'CSRF & CORS' },
          { id: 'method-security', label: 'Method Security' },
          { id: 'stateless-stateful', label: 'Stateless vs Stateful' },
          { id: 'custom-overrides', label: 'Custom Overrides' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            style={{
              padding: '0.75rem 1.25rem',
              fontSize: '0.95rem',
              fontWeight: '600',
              backgroundColor: activeSection === tab.id ? '#ef4444' : 'transparent',
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

      {/* Basic Tab */}
      {activeSection === 'basic' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Step 1: Add Dependencies */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h2 style={{ color: '#fbbf24', marginBottom: '0.5rem', fontSize: '1.3rem' }}>Step 1: Add Dependencies</h2>
            <p style={{ color: '#d1d5db', lineHeight: '1.8', marginBottom: '1rem' }}>
              Adding <code style={{ color: '#fca5a5' }}>spring-boot-starter-security</code> immediately secures your entire application. Every endpoint requires authentication, a default login form appears, and a random password is printed to the console.
            </p>
            <div style={{ backgroundColor: '#0d1117', padding: '1.5rem', borderRadius: '8px', border: '1px solid #1e3a5f', overflowX: 'auto' }}>
              <SyntaxHighlighter code={`<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<!-- For JWT support (optional) -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.5</version>
</dependency>

// What happens immediately after adding the dependency:
// 1. ALL endpoints require authentication
// 2. A default login form appears at /login
// 3. Default user: "user", password: printed in console
//    Using generated security password: 8f4e2b1a-...
// 4. CSRF protection is enabled
// 5. Session fixation protection is enabled
// 6. Security headers (X-Frame-Options, etc.) are added`} />
            </div>
          </div>

          {/* Step 2: How Authentication Works */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h2 style={{ color: '#fbbf24', marginBottom: '0.5rem', fontSize: '1.3rem' }}>Step 2: How Authentication Works</h2>
            <p style={{ color: '#d1d5db', lineHeight: '1.8', marginBottom: '1rem' }}>
              Authentication answers <strong style={{ color: '#fca5a5' }}>&quot;Who are you?&quot;</strong> &mdash; The user provides credentials (username + password), Spring verifies them against a <code style={{ color: '#fca5a5' }}>UserDetailsService</code>, and if valid, stores the authenticated principal in the <code style={{ color: '#fca5a5' }}>SecurityContextHolder</code>.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              {[
                { step: '1', title: 'User submits credentials', desc: 'Login form or API sends username + password' },
                { step: '2', title: 'AuthenticationFilter intercepts', desc: 'UsernamePasswordAuthenticationFilter extracts credentials' },
                { step: '3', title: 'AuthenticationManager delegates', desc: 'Passes to AuthenticationProvider for verification' },
                { step: '4', title: 'UserDetailsService loads user', desc: 'Fetches user from DB, LDAP, or in-memory store' },
                { step: '5', title: 'Password verification', desc: 'PasswordEncoder.matches() compares hashed passwords' },
                { step: '6', title: 'SecurityContext stored', desc: 'Authenticated principal available for the request' }
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  padding: '1rem'
                }}>
                  <div style={{ color: '#ef4444', fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.25rem' }}>{item.step}</div>
                  <div style={{ color: '#fbbf24', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{item.title}</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.85rem' }}>{item.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#0d1117', padding: '1.5rem', borderRadius: '8px', border: '1px solid #1e3a5f', overflowX: 'auto' }}>
              <SyntaxHighlighter code={`// Step 2a: Define how users are loaded
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        // Load user from your database
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException(
                "User not found: " + username));

        // Convert your User entity to Spring's UserDetails
        return org.springframework.security.core.userdetails.User
            .withUsername(user.getUsername())
            .password(user.getPassword())     // already hashed
            .roles(user.getRoles().toArray(new String[0]))
            .build();
    }
}

// Step 2b: Configure password encoder
@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // industry standard
    }
}

// Step 2c: When registering a new user, hash the password
@Service
public class UserRegistrationService {
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private UserRepository userRepository;

    public User register(String username, String rawPassword) {
        User user = new User();
        user.setUsername(username);
        // NEVER store plain text — always hash
        user.setPassword(passwordEncoder.encode(rawPassword));
        user.setRoles(Set.of("USER"));
        return userRepository.save(user);
    }
}`} />
            </div>
          </div>

          {/* Step 3: How Authorization Works */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h2 style={{ color: '#fbbf24', marginBottom: '0.5rem', fontSize: '1.3rem' }}>Step 3: How Authorization Works</h2>
            <p style={{ color: '#d1d5db', lineHeight: '1.8', marginBottom: '1rem' }}>
              Authorization answers <strong style={{ color: '#fca5a5' }}>&quot;What are you allowed to do?&quot;</strong> &mdash; After authentication succeeds, Spring checks if the user has the required role or authority to access a URL or method. This is configured in two places: URL-based rules in <code style={{ color: '#fca5a5' }}>SecurityFilterChain</code> and method-level annotations.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', padding: '1rem' }}>
                <h4 style={{ color: '#60a5fa', marginBottom: '0.5rem' }}>URL-Based (SecurityFilterChain)</h4>
                <ul style={{ color: '#d1d5db', fontSize: '0.9rem', lineHeight: '1.8', paddingLeft: '1.2rem', margin: 0 }}>
                  <li><code style={{ color: '#fca5a5' }}>permitAll()</code> &mdash; no auth needed</li>
                  <li><code style={{ color: '#fca5a5' }}>authenticated()</code> &mdash; any logged-in user</li>
                  <li><code style={{ color: '#fca5a5' }}>hasRole(&quot;ADMIN&quot;)</code> &mdash; specific role</li>
                  <li><code style={{ color: '#fca5a5' }}>hasAuthority(&quot;WRITE&quot;)</code> &mdash; specific permission</li>
                </ul>
              </div>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', padding: '1rem' }}>
                <h4 style={{ color: '#34d399', marginBottom: '0.5rem' }}>Method-Based (Annotations)</h4>
                <ul style={{ color: '#d1d5db', fontSize: '0.9rem', lineHeight: '1.8', paddingLeft: '1.2rem', margin: 0 }}>
                  <li><code style={{ color: '#fca5a5' }}>@PreAuthorize</code> &mdash; check before method</li>
                  <li><code style={{ color: '#fca5a5' }}>@PostAuthorize</code> &mdash; check after method</li>
                  <li><code style={{ color: '#fca5a5' }}>@Secured</code> &mdash; simple role check</li>
                  <li><code style={{ color: '#fca5a5' }}>@RolesAllowed</code> &mdash; JSR-250 standard</li>
                </ul>
              </div>
            </div>
            <div style={{ backgroundColor: '#0d1117', padding: '1.5rem', borderRadius: '8px', border: '1px solid #1e3a5f', overflowX: 'auto' }}>
              <SyntaxHighlighter code={`// URL-based authorization rules
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                // Public endpoints — no login required
                .requestMatchers("/", "/login", "/register",
                    "/api/public/**").permitAll()
                // Static resources
                .requestMatchers("/css/**", "/js/**",
                    "/images/**").permitAll()
                // Role-based access
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/orders/**")
                    .hasAnyRole("TRADER", "ADMIN")
                // Authority-based (finer-grained)
                .requestMatchers(HttpMethod.DELETE, "/api/**")
                    .hasAuthority("DELETE_PRIVILEGE")
                // Everything else requires authentication
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")         // custom login page
                .defaultSuccessUrl("/dashboard")
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login?logout")
                .deleteCookies("JSESSIONID")
            );

        return http.build();
    }
}

// Method-level authorization
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @GetMapping
    @PreAuthorize("hasRole('TRADER') or hasRole('ADMIN')")
    public List<Order> getOrders() {
        return orderService.findAll();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteOrder(@PathVariable Long id) {
        orderService.delete(id);
    }

    // Access method arguments in authorization
    @GetMapping("/user/{userId}")
    @PreAuthorize("#userId == authentication.principal.id")
    public List<Order> getUserOrders(@PathVariable Long userId) {
        return orderService.findByUserId(userId);
    }
}`} />
            </div>
          </div>

          {/* Step 4: Complete Minimal Setup */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h2 style={{ color: '#fbbf24', marginBottom: '0.5rem', fontSize: '1.3rem' }}>Step 4: Complete Minimal Setup</h2>
            <p style={{ color: '#d1d5db', lineHeight: '1.8', marginBottom: '1rem' }}>
              Here&apos;s the minimum you need to get Spring Security working with a database-backed login. This example uses form-based login with BCrypt password hashing.
            </p>
            <div style={{ backgroundColor: '#0d1117', padding: '1.5rem', borderRadius: '8px', border: '1px solid #1e3a5f', overflowX: 'auto' }}>
              <SyntaxHighlighter code={`// 1. User entity
@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;  // BCrypt hash

    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> roles = new HashSet<>();

    // getters, setters...
}

// 2. Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}

// 3. UserDetailsService (loads user from DB)
@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException(username));
        return org.springframework.security.core.userdetails.User
            .withUsername(user.getUsername())
            .password(user.getPassword())
            .roles(user.getRoles().toArray(new String[0]))
            .build();
    }
}

// 4. Security configuration (ties it all together)
@Configuration
@EnableWebSecurity
@EnableMethodSecurity  // enables @PreAuthorize
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/login", "/register",
                    "/css/**").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/dashboard", true)
                .permitAll()
            )
            .logout(logout -> logout
                .logoutSuccessUrl("/login?logout")
                .permitAll()
            );
        return http.build();
    }
}

// 5. Registration endpoint
@RestController
public class AuthController {
    @Autowired private UserRepository userRepo;
    @Autowired private PasswordEncoder encoder;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest req) {
        User user = new User();
        user.setUsername(req.getUsername());
        user.setPassword(encoder.encode(req.getPassword()));
        user.setRoles(Set.of("USER"));
        userRepo.save(user);
        return "User registered successfully";
    }
}

// That's it! Spring Security now:
// ✓ Shows login form at /login
// ✓ Authenticates against your database
// ✓ Hashes passwords with BCrypt
// ✓ Protects all endpoints (except /login, /register)
// ✓ Restricts /admin/** to ADMIN role
// ✓ Manages sessions and logout`} />
            </div>
          </div>

          {/* Step 5: Authentication vs Authorization Summary */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h2 style={{ color: '#fbbf24', marginBottom: '0.5rem', fontSize: '1.3rem' }}>Authentication vs Authorization</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '1.25rem' }}>
                <h3 style={{ color: '#fca5a5', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Authentication (AuthN)</h3>
                <ul style={{ color: '#d1d5db', fontSize: '0.9rem', lineHeight: '2', paddingLeft: '1.2rem', margin: 0 }}>
                  <li><strong style={{ color: '#fbbf24' }}>What:</strong> Verifying identity (&quot;Who are you?&quot;)</li>
                  <li><strong style={{ color: '#fbbf24' }}>When:</strong> First &mdash; happens before authorization</li>
                  <li><strong style={{ color: '#fbbf24' }}>How:</strong> Username/password, JWT token, OAuth2, LDAP</li>
                  <li><strong style={{ color: '#fbbf24' }}>Key class:</strong> <code style={{ color: '#fca5a5' }}>AuthenticationManager</code></li>
                  <li><strong style={{ color: '#fbbf24' }}>Stores in:</strong> <code style={{ color: '#fca5a5' }}>SecurityContextHolder</code></li>
                  <li><strong style={{ color: '#fbbf24' }}>HTTP code:</strong> 401 Unauthorized</li>
                </ul>
              </div>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', padding: '1.25rem' }}>
                <h3 style={{ color: '#93c5fd', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Authorization (AuthZ)</h3>
                <ul style={{ color: '#d1d5db', fontSize: '0.9rem', lineHeight: '2', paddingLeft: '1.2rem', margin: 0 }}>
                  <li><strong style={{ color: '#fbbf24' }}>What:</strong> Checking permissions (&quot;Can you do this?&quot;)</li>
                  <li><strong style={{ color: '#fbbf24' }}>When:</strong> Second &mdash; happens after authentication</li>
                  <li><strong style={{ color: '#fbbf24' }}>How:</strong> Roles, authorities, SpEL expressions</li>
                  <li><strong style={{ color: '#fbbf24' }}>Key class:</strong> <code style={{ color: '#fca5a5' }}>AuthorizationManager</code></li>
                  <li><strong style={{ color: '#fbbf24' }}>Configured in:</strong> <code style={{ color: '#fca5a5' }}>SecurityFilterChain</code> + annotations</li>
                  <li><strong style={{ color: '#fbbf24' }}>HTTP code:</strong> 403 Forbidden</li>
                </ul>
              </div>
            </div>
            <div style={{ backgroundColor: '#0d1117', padding: '1.5rem', borderRadius: '8px', border: '1px solid #1e3a5f', overflowX: 'auto' }}>
              <SyntaxHighlighter code={`// The flow for every request:
//
// Request → [Filter Chain]
//   │
//   ├─ 1. AuthenticationFilter
//   │     └─ Is there a valid session/token?
//   │        ├─ NO  → 401 Unauthorized (redirect to /login)
//   │        └─ YES → Store in SecurityContextHolder
//   │
//   ├─ 2. AuthorizationFilter
//   │     └─ Does the user have the required role/authority?
//   │        ├─ NO  → 403 Forbidden
//   │        └─ YES → Continue
//   │
//   └─ 3. Your Controller
//         └─ @PreAuthorize checks (if any)
//            └─ Business logic executes

// Accessing the authenticated user in your code:
@GetMapping("/me")
public String whoAmI() {
    // Option 1: SecurityContextHolder (works anywhere)
    Authentication auth = SecurityContextHolder
        .getContext().getAuthentication();
    String username = auth.getName();
    Collection<? extends GrantedAuthority> roles =
        auth.getAuthorities();

    return "User: " + username + ", Roles: " + roles;
}

// Option 2: Method parameter injection (in controllers)
@GetMapping("/profile")
public UserProfile getProfile(
        @AuthenticationPrincipal UserDetails user) {
    return userService.getProfile(user.getUsername());
}

// Option 3: Principal parameter
@GetMapping("/dashboard")
public String dashboard(Principal principal) {
    return "Welcome, " + principal.getName();
}

// Role vs Authority:
// ROLE = high-level group  (ROLE_ADMIN, ROLE_TRADER)
//   - hasRole("ADMIN") → checks for ROLE_ADMIN
// AUTHORITY = fine-grained  (READ, WRITE, DELETE)
//   - hasAuthority("WRITE") → checks for exact string`} />
            </div>
          </div>

        </div>
      )}

      {/* Overview Tab */}
      {activeSection === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h2 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.3rem' }}>Security Filter Chain Architecture</h2>
            <p style={{ color: '#d1d5db', lineHeight: '1.8', marginBottom: '1rem' }}>
              Spring Security is built on a chain of servlet filters. Every HTTP request passes through the <strong style={{ color: '#fca5a5' }}>DelegatingFilterProxy</strong>, which delegates to a <strong style={{ color: '#fca5a5' }}>FilterChainProxy</strong> managing one or more <strong style={{ color: '#fca5a5' }}>SecurityFilterChain</strong> instances. Each chain contains ordered filters for authentication, authorization, CSRF protection, session management, and more.
            </p>
            <p style={{ color: '#d1d5db', lineHeight: '1.8' }}>
              Key filters in order: <strong style={{ color: '#93c5fd' }}>SecurityContextPersistenceFilter</strong> &rarr; <strong style={{ color: '#93c5fd' }}>CsrfFilter</strong> &rarr; <strong style={{ color: '#93c5fd' }}>UsernamePasswordAuthenticationFilter</strong> &rarr; <strong style={{ color: '#93c5fd' }}>BasicAuthenticationFilter</strong> &rarr; <strong style={{ color: '#93c5fd' }}>AuthorizationFilter</strong> &rarr; <strong style={{ color: '#93c5fd' }}>ExceptionTranslationFilter</strong>.
            </p>
          </div>

          {/* Architecture Diagram */}
          <div style={{ background: 'rgba(15, 23, 42, 0.8)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h2 style={{ color: '#60a5fa', margin: '0 0 1rem 0', fontSize: '1.25rem' }}>
              Security Filter Chain &mdash; Full Architecture
            </h2>
            <SpringSecurityArchitectureDiagram />
            <p style={{ color: '#9ca3af', margin: '1rem 0 0 0', textAlign: 'center', fontSize: '0.9rem' }}>
              Every HTTP request flows through the ordered filter chain: CSRF/CORS validation, authentication (form login or JWT), authorization checks, and exception translation before reaching your application controllers.
            </p>
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>Basic SecurityFilterChain Configuration</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN")
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/dashboard")
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login?logout")
                .deleteCookies("JSESSIONID")
            );

        return http.build();
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>Custom UserDetailsService</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException(
                "User not found: " + username));

        return new org.springframework.security.core.userdetails.User(
            user.getUsername(),
            user.getPassword(),
            user.isEnabled(),
            true, true, true,
            getAuthorities(user.getRoles())
        );
    }

    private Collection<? extends GrantedAuthority> getAuthorities(
            Set<Role> roles) {
        return roles.stream()
            .map(role -> new SimpleGrantedAuthority(
                "ROLE_" + role.getName()))
            .collect(Collectors.toList());
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>Password Encoder Configuration</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Configuration
public class PasswordConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        // BCrypt with strength 12 (2^12 iterations)
        return new BCryptPasswordEncoder(12);
    }

    // Delegating encoder for migration scenarios
    @Bean
    public PasswordEncoder delegatingPasswordEncoder() {
        Map<String, PasswordEncoder> encoders = new HashMap<>();
        encoders.put("bcrypt", new BCryptPasswordEncoder());
        encoders.put("sha256", new StandardPasswordEncoder());

        DelegatingPasswordEncoder delegating =
            new DelegatingPasswordEncoder("bcrypt", encoders);
        delegating.setDefaultPasswordEncoderForMatches(
            new BCryptPasswordEncoder());
        return delegating;
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>Multiple Security Filter Chains</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Configuration
@EnableWebSecurity
public class MultiChainSecurityConfig {

    // Chain 1: API endpoints - stateless JWT
    @Bean
    @Order(1)
    public SecurityFilterChain apiFilterChain(HttpSecurity http)
            throws Exception {
        http
            .securityMatcher("/api/**")
            .authorizeHttpRequests(auth -> auth
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS))
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                    .jwtAuthenticationConverter(
                        jwtAuthConverter())));
        return http.build();
    }

    // Chain 2: Web UI - form login with sessions
    @Bean
    @Order(2)
    public SecurityFilterChain webFilterChain(HttpSecurity http)
            throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/css/**", "/js/**")
                    .permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login").permitAll());
        return http.build();
    }
}`} />
          </div>
        </div>
      )}

      {/* Authentication Tab */}
      {activeSection === 'authentication' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h2 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.3rem' }}>Authentication Flow</h2>
            <p style={{ color: '#d1d5db', lineHeight: '1.8' }}>
              Authentication verifies <strong style={{ color: '#fca5a5' }}>who</strong> the user is. The <strong style={{ color: '#93c5fd' }}>AuthenticationManager</strong> delegates to one or more <strong style={{ color: '#93c5fd' }}>AuthenticationProvider</strong> instances. Each provider uses a <strong style={{ color: '#93c5fd' }}>UserDetailsService</strong> to load user data and a <strong style={{ color: '#93c5fd' }}>PasswordEncoder</strong> to verify credentials. On success, an <strong style={{ color: '#93c5fd' }}>Authentication</strong> object is stored in the <strong style={{ color: '#93c5fd' }}>SecurityContextHolder</strong>.
            </p>
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>Custom AuthenticationProvider</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Component
public class CustomAuthenticationProvider
        implements AuthenticationProvider {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication auth)
            throws AuthenticationException {
        String username = auth.getName();
        String password = auth.getCredentials().toString();

        UserDetails user = userDetailsService
            .loadUserByUsername(username);

        if (!passwordEncoder.matches(password,
                user.getPassword())) {
            throw new BadCredentialsException(
                "Invalid password");
        }

        if (!user.isEnabled()) {
            throw new DisabledException("Account is disabled");
        }

        return new UsernamePasswordAuthenticationToken(
            user, password, user.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authType) {
        return UsernamePasswordAuthenticationToken.class
            .isAssignableFrom(authType);
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>DaoAuthenticationProvider Setup</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Configuration
public class AuthProviderConfig {

    @Bean
    public AuthenticationManager authenticationManager(
            HttpSecurity http,
            PasswordEncoder passwordEncoder,
            UserDetailsService userDetailsService) throws Exception {

        DaoAuthenticationProvider provider =
            new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);

        // Hide whether username or password was wrong
        provider.setHideUserNotFoundExceptions(true);

        return new ProviderManager(provider);
    }

    // AuthenticationManager bean for injection
    @Bean
    public AuthenticationManager authManager(
            AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>Custom UserDetails Implementation</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`public class CustomUserDetails implements UserDetails {

    private final String username;
    private final String password;
    private final boolean enabled;
    private final boolean accountNonLocked;
    private final Set<GrantedAuthority> authorities;

    public CustomUserDetails(User user) {
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.enabled = user.isEnabled();
        this.accountNonLocked = !user.isLocked();
        this.authorities = user.getRoles().stream()
            .flatMap(role -> {
                List<GrantedAuthority> perms = new ArrayList<>();
                perms.add(new SimpleGrantedAuthority(
                    "ROLE_" + role.getName()));
                role.getPermissions().forEach(p ->
                    perms.add(new SimpleGrantedAuthority(
                        p.getName())));
                return perms.stream();
            })
            .collect(Collectors.toSet());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
    @Override public String getPassword() { return password; }
    @Override public String getUsername() { return username; }
    @Override public boolean isEnabled() { return enabled; }
    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }
    @Override
    public boolean isAccountNonExpired() { return true; }
    @Override
    public boolean isCredentialsNonExpired() { return true; }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>Authentication Success &amp; Failure Handlers</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Component
public class CustomAuthSuccessHandler
        extends SavedRequestAwareAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) throws IOException {

        // Log successful login
        String username = authentication.getName();
        log.info("Successful login: {}", username);

        // Redirect based on role
        Collection<? extends GrantedAuthority> authorities =
            authentication.getAuthorities();

        if (authorities.stream().anyMatch(a ->
                a.getAuthority().equals("ROLE_ADMIN"))) {
            response.sendRedirect("/admin/dashboard");
        } else {
            super.onAuthenticationSuccess(
                request, response, authentication);
        }
    }
}

@Component
public class CustomAuthFailureHandler
        extends SimpleUrlAuthenticationFailureHandler {

    @Autowired
    private LoginAttemptService loginAttemptService;

    @Override
    public void onAuthenticationFailure(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException exception)
            throws IOException, ServletException {

        String username = request.getParameter("username");
        loginAttemptService.recordFailure(username);

        if (loginAttemptService.isBlocked(username)) {
            response.sendRedirect(
                "/login?error=blocked");
        } else {
            super.onAuthenticationFailure(
                request, response, exception);
        }
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>In-Memory &amp; JDBC Authentication</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Configuration
public class UserStoreConfig {

    // In-memory users (dev/testing only)
    @Bean
    public UserDetailsService inMemoryUsers(
            PasswordEncoder encoder) {
        UserDetails admin = User.builder()
            .username("admin")
            .password(encoder.encode("admin123"))
            .roles("ADMIN", "USER")
            .build();

        UserDetails user = User.builder()
            .username("user")
            .password(encoder.encode("user123"))
            .roles("USER")
            .build();

        return new InMemoryUserDetailsManager(admin, user);
    }

    // JDBC-backed users (production)
    @Bean
    public UserDetailsService jdbcUsers(DataSource dataSource) {
        JdbcUserDetailsManager manager =
            new JdbcUserDetailsManager(dataSource);

        manager.setUsersByUsernameQuery(
            "SELECT username, password, enabled " +
            "FROM users WHERE username = ?");
        manager.setAuthoritiesByUsernameQuery(
            "SELECT u.username, r.role_name " +
            "FROM users u JOIN user_roles r " +
            "ON u.id = r.user_id WHERE u.username = ?");

        return manager;
    }
}`} />
          </div>
        </div>
      )}

      {/* Authorization Tab */}
      {activeSection === 'authorization' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h2 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.3rem' }}>URL-Based Authorization</h2>
            <p style={{ color: '#d1d5db', lineHeight: '1.8' }}>
              Authorization determines <strong style={{ color: '#fca5a5' }}>what</strong> an authenticated user can do. Spring Security supports URL-based rules via <strong style={{ color: '#93c5fd' }}>requestMatchers</strong>, role hierarchies, and custom <strong style={{ color: '#93c5fd' }}>AuthorizationManager</strong> implementations. Rules are evaluated top-to-bottom &mdash; the first match wins.
            </p>
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>Role-Based Access Control</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Bean
public SecurityFilterChain securityFilterChain(
        HttpSecurity http) throws Exception {
    http.authorizeHttpRequests(auth -> auth
        // Public endpoints
        .requestMatchers(
            "/", "/login", "/register",
            "/css/**", "/js/**", "/images/**")
            .permitAll()

        // Role-based access
        .requestMatchers("/api/admin/**")
            .hasRole("ADMIN")
        .requestMatchers("/api/manager/**")
            .hasAnyRole("ADMIN", "MANAGER")
        .requestMatchers("/api/user/**")
            .hasAnyRole("USER", "ADMIN", "MANAGER")

        // HTTP method-specific rules
        .requestMatchers(HttpMethod.GET, "/api/reports/**")
            .hasAuthority("READ_REPORTS")
        .requestMatchers(HttpMethod.POST, "/api/reports/**")
            .hasAuthority("CREATE_REPORTS")
        .requestMatchers(HttpMethod.DELETE, "/api/**")
            .hasRole("ADMIN")

        // Everything else requires authentication
        .anyRequest().authenticated()
    );

    return http.build();
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>Role Hierarchy</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Configuration
public class RoleHierarchyConfig {

    // ADMIN > MANAGER > USER > GUEST
    // An ADMIN automatically has all lower roles
    @Bean
    public RoleHierarchy roleHierarchy() {
        return RoleHierarchyImpl.withDefaultRolePrefix()
            .role("ADMIN").implies("MANAGER")
            .role("MANAGER").implies("USER")
            .role("USER").implies("GUEST")
            .build();
    }

    // Wire hierarchy into method security
    @Bean
    public DefaultMethodSecurityExpressionHandler
            methodSecurityExpressionHandler(
                RoleHierarchy roleHierarchy) {
        DefaultMethodSecurityExpressionHandler handler =
            new DefaultMethodSecurityExpressionHandler();
        handler.setRoleHierarchy(roleHierarchy);
        return handler;
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>Custom AuthorizationManager</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Component
public class IpBasedAuthorizationManager
        implements AuthorizationManager<RequestAuthorizationContext> {

    private final Set<String> trustedIps = Set.of(
        "10.0.0.0/8", "192.168.1.0/24", "127.0.0.1");

    @Override
    public AuthorizationDecision check(
            Supplier<Authentication> authentication,
            RequestAuthorizationContext context) {

        String clientIp = context.getRequest()
            .getRemoteAddr();

        boolean isTrusted = trustedIps.stream()
            .anyMatch(range -> isInRange(clientIp, range));

        boolean isAuthenticated = authentication.get()
            .isAuthenticated();

        return new AuthorizationDecision(
            isAuthenticated && isTrusted);
    }

    private boolean isInRange(String ip, String cidr) {
        // CIDR range check implementation
        if (!cidr.contains("/")) {
            return ip.equals(cidr);
        }
        // Subnet mask comparison logic
        return InetAddressUtils.isInRange(ip, cidr);
    }
}

// Usage in SecurityFilterChain
@Bean
public SecurityFilterChain filterChain(HttpSecurity http,
        IpBasedAuthorizationManager ipAuthManager)
        throws Exception {
    http.authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/internal/**")
            .access(ipAuthManager)
        .anyRequest().authenticated());
    return http.build();
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>Custom Access Denied &amp; Entry Point Handlers</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Component
public class CustomAccessDeniedHandler
        implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request,
            HttpServletResponse response,
            AccessDeniedException ex)
            throws IOException {
        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.setContentType("application/json");
        response.getWriter().write(
            "{\\"error\\": \\"Access denied\\", " +
            "\\"message\\": \\"Insufficient permissions\\"}");
    }
}

@Component
public class CustomAuthEntryPoint
        implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException ex)
            throws IOException {
        response.setStatus(
            HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json");
        response.getWriter().write(
            "{\\"error\\": \\"Unauthorized\\", " +
            "\\"message\\": \\"Authentication required\\"}");
    }
}

// Wire into filter chain
@Bean
public SecurityFilterChain filterChain(HttpSecurity http)
        throws Exception {
    http.exceptionHandling(ex -> ex
        .accessDeniedHandler(
            new CustomAccessDeniedHandler())
        .authenticationEntryPoint(
            new CustomAuthEntryPoint()));
    return http.build();
}`} />
          </div>
        </div>
      )}

      {/* JWT Tab */}
      {activeSection === 'jwt' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h2 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.3rem' }}>JWT Authentication</h2>
            <p style={{ color: '#d1d5db', lineHeight: '1.8' }}>
              JSON Web Tokens enable <strong style={{ color: '#fca5a5' }}>stateless authentication</strong>. A JWT contains three parts: <strong style={{ color: '#93c5fd' }}>Header</strong> (algorithm), <strong style={{ color: '#93c5fd' }}>Payload</strong> (claims like sub, exp, roles), and <strong style={{ color: '#93c5fd' }}>Signature</strong> (HMAC or RSA). The server issues a token on login; the client sends it in the <code style={{ color: '#fbbf24', background: '#1e1e2e', padding: '0.1rem 0.3rem', borderRadius: '0.25rem' }}>Authorization: Bearer</code> header on every request.
            </p>
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>JWT Utility Class</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Component
public class JwtTokenProvider {

    @Value("\${jwt.secret}")
    private String secretKey;

    @Value("\${jwt.expiration:3600000}") // 1 hour
    private long validityInMs;

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64
            .decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(Authentication auth) {
        UserDetails user = (UserDetails) auth.getPrincipal();

        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", user.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toList()));

        return Jwts.builder()
            .setClaims(claims)
            .setSubject(user.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date(
                System.currentTimeMillis() + validityInMs))
            .signWith(getSigningKey(),
                SignatureAlgorithm.HS256)
            .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token,
            Function<Claims, T> resolver) {
        Claims claims = Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
        return resolver.apply(claims);
    }

    public boolean isTokenValid(String token,
            UserDetails userDetails) {
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername())
            && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token)
            .before(new Date());
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>JWT Authentication Filter</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Component
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider jwtProvider;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request
            .getHeader("Authorization");

        if (authHeader == null
                || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = authHeader.substring(7);
        String username = jwtProvider
            .extractUsername(jwt);

        if (username != null
                && SecurityContextHolder.getContext()
                    .getAuthentication() == null) {

            UserDetails userDetails = userDetailsService
                .loadUserByUsername(username);

            if (jwtProvider.isTokenValid(
                    jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                        userDetails, null,
                        userDetails.getAuthorities());

                authToken.setDetails(
                    new WebAuthenticationDetailsSource()
                        .buildDetails(request));

                SecurityContextHolder.getContext()
                    .setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>SecurityFilterChain with JWT</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Configuration
@EnableWebSecurity
public class JwtSecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtFilter;

    @Autowired
    private CustomAuthEntryPoint authEntryPoint;

    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session
                .sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/auth/login",
                    "/api/auth/register",
                    "/api/auth/refresh")
                    .permitAll()
                .requestMatchers("/api/admin/**")
                    .hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint(authEntryPoint))
            .addFilterBefore(jwtFilter,
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>Auth Controller with Token Refresh</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private AuthenticationManager authManager;
    @Autowired private JwtTokenProvider jwtProvider;
    @Autowired private RefreshTokenService refreshService;

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {
        Authentication auth = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()));

        String accessToken = jwtProvider
            .generateToken(auth);
        String refreshToken = refreshService
            .createRefreshToken(request.getUsername());

        return ResponseEntity.ok(new AuthResponse(
            accessToken, refreshToken, "Bearer"));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(
            @RequestBody RefreshRequest request) {
        return refreshService
            .findByToken(request.getRefreshToken())
            .map(refreshService::verifyExpiration)
            .map(token -> {
                String accessToken = jwtProvider
                    .generateTokenForUser(
                        token.getUser().getUsername());
                return ResponseEntity.ok(
                    new AuthResponse(accessToken,
                        request.getRefreshToken(),
                        "Bearer"));
            })
            .orElseThrow(() -> new TokenRefreshException(
                "Invalid refresh token"));
    }
}`} />
          </div>
        </div>
      )}

      {/* OAuth2 Tab */}
      {activeSection === 'oauth2' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h2 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.3rem' }}>OAuth2 &amp; OpenID Connect</h2>
            <p style={{ color: '#d1d5db', lineHeight: '1.8' }}>
              OAuth2 provides delegated authorization. Key grant types: <strong style={{ color: '#fca5a5' }}>Authorization Code</strong> (web apps), <strong style={{ color: '#fca5a5' }}>Client Credentials</strong> (service-to-service), <strong style={{ color: '#fca5a5' }}>PKCE</strong> (SPAs/mobile). Spring Security supports both <strong style={{ color: '#93c5fd' }}>OAuth2 Client</strong> (consume protected APIs) and <strong style={{ color: '#93c5fd' }}>OAuth2 Resource Server</strong> (protect your APIs with tokens).
            </p>
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>OAuth2 Resource Server with JWT</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Configuration
@EnableWebSecurity
public class ResourceServerConfig {

    @Bean
    public SecurityFilterChain resourceServerChain(
            HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**")
                    .permitAll()
                .requestMatchers("/api/admin/**")
                    .hasAuthority("SCOPE_admin")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                    .decoder(jwtDecoder())
                    .jwtAuthenticationConverter(
                        jwtAuthConverter())
                )
            );

        return http.build();
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder
            .withJwkSetUri(
                "https://auth-server/.well-known/jwks.json")
            .build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthConverter() {
        JwtGrantedAuthoritiesConverter authorities =
            new JwtGrantedAuthoritiesConverter();
        authorities.setAuthorityPrefix("ROLE_");
        authorities.setAuthoritiesClaimName("roles");

        JwtAuthenticationConverter converter =
            new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(
            authorities);
        return converter;
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>OAuth2 Login with Social Providers</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Configuration
@EnableWebSecurity
public class OAuth2LoginConfig {

    @Bean
    public SecurityFilterChain oauth2LoginChain(
            HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/login/**")
                    .permitAll()
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth2 -> oauth2
                .loginPage("/login")
                .userInfoEndpoint(userInfo -> userInfo
                    .userService(customOAuth2UserService()))
                .successHandler(oAuth2SuccessHandler())
                .failureUrl("/login?error=oauth2")
            );

        return http.build();
    }

    @Bean
    public OAuth2UserService<OAuth2UserRequest,
            OAuth2User> customOAuth2UserService() {
        return new CustomOAuth2UserService();
    }
}

// application.yml configuration:
// spring.security.oauth2.client.registration:
//   google:
//     client-id: \${GOOGLE_CLIENT_ID}
//     client-secret: \${GOOGLE_CLIENT_SECRET}
//     scope: openid, profile, email
//   github:
//     client-id: \${GITHUB_CLIENT_ID}
//     client-secret: \${GITHUB_CLIENT_SECRET}
//     scope: user:email, read:user`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>Custom OAuth2UserService</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Service
public class CustomOAuth2UserService
        extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request)
            throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(request);

        String provider = request.getClientRegistration()
            .getRegistrationId(); // "google", "github"
        String providerId = oAuth2User.getName();
        String email = oAuth2User
            .getAttribute("email");
        String name = oAuth2User
            .getAttribute("name");

        // Find or create local user
        User user = userRepository
            .findByProviderAndProviderId(
                provider, providerId)
            .orElseGet(() -> {
                User newUser = new User();
                newUser.setProvider(provider);
                newUser.setProviderId(providerId);
                newUser.setEmail(email);
                newUser.setName(name);
                newUser.setRole("ROLE_USER");
                return userRepository.save(newUser);
            });

        return new CustomOAuth2User(
            oAuth2User, user.getRoles());
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>OAuth2 Client Credentials (Service-to-Service)</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Configuration
public class OAuth2ClientConfig {

    // WebClient with automatic token management
    @Bean
    public WebClient webClient(
            ReactiveClientRegistrationRepository clients,
            ServerOAuth2AuthorizedClientRepository authClients) {
        ServerOAuth2AuthorizedClientExchangeFilterFunction
            oauth2 = new ServerOAuth2AuthorizedClientExchangeFilterFunction(
                clients, authClients);
        oauth2.setDefaultClientRegistrationId(
            "internal-service");

        return WebClient.builder()
            .filter(oauth2)
            .build();
    }

    // RestTemplate alternative
    @Bean
    public RestTemplate oauth2RestTemplate(
            OAuth2AuthorizedClientManager clientManager) {
        OAuth2ClientHttpRequestInterceptor interceptor =
            new OAuth2ClientHttpRequestInterceptor(
                clientManager);
        interceptor.setClientRegistrationId(
            "internal-service");

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getInterceptors().add(interceptor);
        return restTemplate;
    }
}

// application.yml:
// spring.security.oauth2.client.registration:
//   internal-service:
//     provider: auth-server
//     client-id: my-service
//     client-secret: \${SERVICE_SECRET}
//     authorization-grant-type: client_credentials
//     scope: read, write`} />
          </div>
        </div>
      )}

      {/* CSRF & CORS Tab */}
      {activeSection === 'csrf-cors' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h2 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.3rem' }}>CSRF &amp; CORS Protection</h2>
            <p style={{ color: '#d1d5db', lineHeight: '1.8' }}>
              <strong style={{ color: '#fca5a5' }}>CSRF</strong> (Cross-Site Request Forgery) protection prevents malicious sites from submitting requests on behalf of authenticated users. Spring Security generates a unique token per session that must be included in state-changing requests. <strong style={{ color: '#fca5a5' }}>CORS</strong> (Cross-Origin Resource Sharing) controls which domains can make requests to your API. Both are critical for web application security.
            </p>
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>CORS Configuration</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // Allowed origins
        config.setAllowedOrigins(List.of(
            "https://myapp.com",
            "https://admin.myapp.com"));

        // Or use patterns for subdomains
        config.setAllowedOriginPatterns(
            List.of("https://*.myapp.com"));

        // Allowed HTTP methods
        config.setAllowedMethods(List.of(
            "GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Allowed headers
        config.setAllowedHeaders(List.of(
            "Authorization", "Content-Type",
            "X-Requested-With", "Accept"));

        // Expose headers to client
        config.setExposedHeaders(List.of(
            "X-Total-Count", "X-Page-Number"));

        // Allow cookies/auth headers
        config.setAllowCredentials(true);

        // Cache preflight response (1 hour)
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration(
            "/api/**", config);
        return source;
    }
}

// Wire into SecurityFilterChain
@Bean
public SecurityFilterChain filterChain(
        HttpSecurity http) throws Exception {
    http.cors(cors -> cors
        .configurationSource(corsConfigurationSource()));
    return http.build();
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>CSRF Token Configuration</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Configuration
public class CsrfConfig {

    // Default: HttpSession-based CSRF token
    @Bean
    public SecurityFilterChain sessionCsrf(
            HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf
            .csrfTokenRepository(
                new HttpSessionCsrfTokenRepository())
            .csrfTokenRequestHandler(
                new CsrfTokenRequestAttributeHandler())
            // Ignore CSRF for specific paths
            .ignoringRequestMatchers(
                "/api/webhooks/**",
                "/api/public/**")
        );
        return http.build();
    }

    // Cookie-based CSRF for SPAs (React, Angular)
    @Bean
    public SecurityFilterChain spaCsrf(
            HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf
            .csrfTokenRepository(
                CookieCsrfTokenRepository
                    .withHttpOnlyFalse())
            .csrfTokenRequestHandler(
                new SpaCsrfTokenRequestHandler())
        );
        return http.build();
    }
}

// SPA token handler reads from header or parameter
final class SpaCsrfTokenRequestHandler
        extends CsrfTokenRequestAttributeHandler {

    private final CsrfTokenRequestHandler delegate =
        new XorCsrfTokenRequestAttributeHandler();

    @Override
    public void handle(HttpServletRequest request,
            HttpServletResponse response,
            Supplier<CsrfToken> csrfToken) {
        this.delegate.handle(
            request, response, csrfToken);
    }

    @Override
    public String resolveCsrfTokenValue(
            HttpServletRequest request,
            CsrfToken csrfToken) {
        String header = request
            .getHeader(csrfToken.getHeaderName());
        return (header != null) ? header
            : this.delegate.resolveCsrfTokenValue(
                request, csrfToken);
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>Combined CSRF + CORS for REST API</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http) throws Exception {
        http
            // CORS - allow frontend origin
            .cors(cors -> cors
                .configurationSource(corsSource()))

            // CSRF - cookie-based for SPA
            .csrf(csrf -> csrf
                .csrfTokenRepository(
                    CookieCsrfTokenRepository
                        .withHttpOnlyFalse())
                // Disable CSRF for stateless API endpoints
                .ignoringRequestMatchers("/api/auth/**"))

            .sessionManagement(session -> session
                .sessionCreationPolicy(
                    SessionCreationPolicy.IF_REQUIRED))

            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated());

        return http.build();
    }

    private CorsConfigurationSource corsSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(
            List.of("https://frontend.myapp.com"));
        config.setAllowedMethods(
            List.of("GET", "POST", "PUT", "DELETE"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>CSRF with Thymeleaf &amp; JavaScript</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`// Thymeleaf form (automatic CSRF token injection):
// <form th:action="@{/api/submit}" method="post">
//   <input type="hidden"
//     th:name="\${_csrf.parameterName}"
//     th:value="\${_csrf.token}" />
// </form>

// JavaScript: read CSRF cookie and send as header
// const csrfToken = document.cookie
//   .split('; ')
//   .find(row => row.startsWith('XSRF-TOKEN='))
//   ?.split('=')[1];
//
// fetch('/api/data', {
//   method: 'POST',
//   headers: {
//     'X-XSRF-TOKEN': csrfToken,
//     'Content-Type': 'application/json'
//   },
//   credentials: 'include',
//   body: JSON.stringify(data)
// });

// Spring controller to expose CSRF token via API
@RestController
public class CsrfController {

    @GetMapping("/api/csrf")
    public CsrfToken csrf(CsrfToken token) {
        // Spring auto-resolves CsrfToken parameter
        return token;
    }
}`} />
          </div>
        </div>
      )}

      {/* Method Security Tab */}
      {activeSection === 'method-security' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h2 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.3rem' }}>Method-Level Security</h2>
            <p style={{ color: '#d1d5db', lineHeight: '1.8' }}>
              Method security applies authorization rules directly on service methods using annotations. <strong style={{ color: '#fca5a5' }}>@PreAuthorize</strong> checks before execution, <strong style={{ color: '#fca5a5' }}>@PostAuthorize</strong> checks after (can reference return value), <strong style={{ color: '#fca5a5' }}>@Secured</strong> uses role names, and <strong style={{ color: '#fca5a5' }}>@RolesAllowed</strong> is the JSR-250 standard. Enable with <code style={{ color: '#fbbf24', background: '#1e1e2e', padding: '0.1rem 0.3rem', borderRadius: '0.25rem' }}>@EnableMethodSecurity</code>.
            </p>
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>Enable Method Security</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Configuration
@EnableMethodSecurity(
    prePostEnabled = true,   // @PreAuthorize, @PostAuthorize
    securedEnabled = true,   // @Secured
    jsr250Enabled = true     // @RolesAllowed
)
public class MethodSecurityConfig {
    // Method security is enabled globally
    // No additional beans needed for basic usage
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>@PreAuthorize &amp; @PostAuthorize</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Service
public class DocumentService {

    // Simple role check
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteAllDocuments() {
        repository.deleteAll();
    }

    // Multiple roles
    @PreAuthorize("hasAnyRole('ADMIN', 'EDITOR')")
    public Document createDocument(Document doc) {
        return repository.save(doc);
    }

    // SpEL with method parameters
    @PreAuthorize(
        "#username == authentication.name " +
        "or hasRole('ADMIN')")
    public List<Document> getDocumentsByUser(
            String username) {
        return repository.findByOwner(username);
    }

    // Check parameter properties
    @PreAuthorize(
        "#doc.department == " +
        "authentication.principal.department")
    public Document updateDocument(Document doc) {
        return repository.save(doc);
    }

    // PostAuthorize - check return value
    @PostAuthorize(
        "returnObject.owner == authentication.name " +
        "or hasRole('ADMIN')")
    public Document getDocument(Long id) {
        return repository.findById(id)
            .orElseThrow(() ->
                new NotFoundException("Not found"));
    }

    // Combined pre and post
    @PreAuthorize("hasRole('USER')")
    @PostAuthorize(
        "returnObject.confidentialityLevel <= " +
        "authentication.principal.clearanceLevel")
    public Document getClassifiedDocument(Long id) {
        return repository.findById(id).orElseThrow();
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>@Secured &amp; @RolesAllowed</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Service
public class UserService {

    // @Secured - Spring-specific
    @Secured("ROLE_ADMIN")
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    @Secured({"ROLE_ADMIN", "ROLE_MANAGER"})
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // @RolesAllowed - JSR-250 standard (portable)
    @RolesAllowed("ADMIN")
    public void resetPassword(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow();
        user.setPassword(
            encoder.encode(generateTempPassword()));
        userRepository.save(user);
    }

    @RolesAllowed({"USER", "ADMIN"})
    public User getProfile(Long userId) {
        return userRepository.findById(userId)
            .orElseThrow();
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>Custom Security Expressions</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`// Custom permission evaluator
@Component
public class CustomPermissionEvaluator
        implements PermissionEvaluator {

    @Autowired
    private DocumentRepository docRepo;

    @Override
    public boolean hasPermission(Authentication auth,
            Object targetDomainObject, Object permission) {
        if (targetDomainObject instanceof Document doc) {
            String perm = (String) permission;
            String username = auth.getName();

            return switch (perm) {
                case "READ" ->
                    doc.isPublic()
                    || doc.getOwner().equals(username);
                case "WRITE" ->
                    doc.getOwner().equals(username);
                case "DELETE" ->
                    doc.getOwner().equals(username)
                    || hasRole(auth, "ADMIN");
                default -> false;
            };
        }
        return false;
    }

    @Override
    public boolean hasPermission(Authentication auth,
            Serializable targetId, String targetType,
            Object permission) {
        Document doc = docRepo
            .findById((Long) targetId).orElse(null);
        if (doc == null) return false;
        return hasPermission(auth, doc, permission);
    }

    private boolean hasRole(Authentication auth,
            String role) {
        return auth.getAuthorities().stream()
            .anyMatch(a -> a.getAuthority()
                .equals("ROLE_" + role));
    }
}

// Register evaluator
@Configuration
@EnableMethodSecurity
public class MethodSecurityConfig {

    @Bean
    public DefaultMethodSecurityExpressionHandler
            expressionHandler(
                CustomPermissionEvaluator evaluator) {
        DefaultMethodSecurityExpressionHandler handler =
            new DefaultMethodSecurityExpressionHandler();
        handler.setPermissionEvaluator(evaluator);
        return handler;
    }
}

// Usage in service
@Service
public class DocumentService {

    @PreAuthorize(
        "hasPermission(#id, 'Document', 'READ')")
    public Document getDocument(Long id) {
        return repository.findById(id).orElseThrow();
    }

    @PreAuthorize(
        "hasPermission(#doc, 'WRITE')")
    public Document updateDocument(Document doc) {
        return repository.save(doc);
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', margin: '0', overflowX: 'auto', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }}>SpEL Expressions Cheat Sheet</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`// Common SpEL expressions for @PreAuthorize

// Role checks
@PreAuthorize("hasRole('ADMIN')")
@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")

// Authority checks (no ROLE_ prefix)
@PreAuthorize("hasAuthority('DELETE_USER')")
@PreAuthorize("hasAnyAuthority('READ', 'WRITE')")

// Authentication checks
@PreAuthorize("isAuthenticated()")
@PreAuthorize("isFullyAuthenticated()") // not remember-me
@PreAuthorize("isAnonymous()")

// Access principal properties
@PreAuthorize(
    "authentication.principal.department == 'ENGINEERING'")
@PreAuthorize(
    "#userId == authentication.principal.id")

// Combine with AND/OR/NOT
@PreAuthorize(
    "hasRole('USER') and #age >= 18")
@PreAuthorize(
    "hasRole('ADMIN') or " +
    "(hasRole('USER') and #doc.owner == authentication.name)")
@PreAuthorize(
    "!hasRole('GUEST')")

// Collection filtering with @PreFilter/@PostFilter
@PostFilter(
    "filterObject.owner == authentication.name")
public List<Document> getAllDocuments() {
    return repository.findAll();
    // Returns only docs owned by current user
}

@PreFilter(
    "filterObject.status != 'ARCHIVED'")
public void deleteDocuments(List<Document> docs) {
    repository.deleteAll(docs);
    // Only non-archived docs reach this method
}`} />
          </div>
        </div>
      )}

      {/* Stateless vs Stateful Tab */}
      {activeSection === 'stateless-stateful' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h2 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.3rem' }}>Stateful (Session-Based) vs Stateless (Token-Based)</h2>
            <p style={{ color: '#d1d5db', lineHeight: '1.8' }}>
              Spring Security supports both models. <strong style={{ color: '#fca5a5' }}>Stateful</strong> stores a session on the server and sends a <code style={{ color: '#fbbf24', background: '#1e1e2e', padding: '0.1rem 0.3rem', borderRadius: '0.25rem' }}>JSESSIONID</code> cookie to the browser. <strong style={{ color: '#fca5a5' }}>Stateless</strong> sends a signed JWT with every request and the server keeps nothing between calls.
            </p>
          </div>

          {/* Comparison Table */}
          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #374151' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#94a3b8', fontWeight: 600 }}>Aspect</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#8b5cf6', fontWeight: 600 }}>Stateful (Session)</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#10b981', fontWeight: 600 }}>Stateless (JWT)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Storage', 'Server-side HttpSession', 'Client-side token (header/cookie)'],
                  ['Scalability', 'Sticky sessions or shared session store (Redis)', 'Any server can handle any request'],
                  ['Logout', 'Invalidate session on server', 'Token lives until expiry; needs blocklist for forced revoke'],
                  ['CSRF', 'Vulnerable (cookie auto-sent) &mdash; needs CSRF token', 'Not vulnerable if token is in Authorization header'],
                  ['Authentication', 'Login once, session cookie auto-sent', 'Token sent explicitly on every request'],
                  ['Session Hijacking', 'Possible if cookie stolen', 'Possible if token stolen; mitigate with short expiry + refresh tokens'],
                  ['Spring Config', 'Default &mdash; no extra config', 'SessionCreationPolicy.STATELESS + JWT filter'],
                  ['Best For', 'Server-rendered apps (Thymeleaf, JSP)', 'REST APIs, microservices, SPAs']
                ].map(([aspect, stateful, stateless], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #374151' }}>
                    <td style={{ padding: '0.75rem', color: '#fbbf24', fontWeight: 600 }}>{aspect}</td>
                    <td style={{ padding: '0.75rem', color: '#d1d5db' }} dangerouslySetInnerHTML={{ __html: stateful }} />
                    <td style={{ padding: '0.75rem', color: '#d1d5db' }} dangerouslySetInnerHTML={{ __html: stateless }} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stateful Config */}
          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#8b5cf6', fontWeight: 600, fontSize: '0.95rem' }}>Stateful &mdash; Session-Based Config</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Configuration
@EnableWebSecurity
public class StatefulSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        http
            // Session is created and used (default)
            .sessionManagement(session -> session
                .sessionCreationPolicy(
                    SessionCreationPolicy.IF_REQUIRED)
                .maximumSessions(1)          // one session per user
                .maxSessionsPreventsLogin(true))
            .csrf(csrf -> csrf
                .csrfTokenRepository(
                    CookieCsrfTokenRepository
                        .withHttpOnlyFalse()))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/login", "/register")
                    .permitAll()
                .anyRequest().authenticated())
            .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/dashboard"));

        return http.build();
    }
}`} />
          </div>

          {/* Stateless Config */}
          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.95rem' }}>Stateless &mdash; JWT-Based Config</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Configuration
@EnableWebSecurity
public class StatelessSecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        http
            // No session at all
            .sessionManagement(session -> session
                .sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS))
            .csrf(csrf -> csrf.disable()) // no cookies = no CSRF
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated())
            // JWT filter runs before UsernamePasswordAuthenticationFilter
            .addFilterBefore(jwtFilter,
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}`} />
          </div>

          {/* When to use which */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h3 style={{ color: '#fbbf24', marginBottom: '0.75rem', fontSize: '1.1rem' }}>When to Use Which</h3>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <h4 style={{ color: '#8b5cf6', marginBottom: '0.5rem' }}>Choose Stateful When</h4>
                <ul style={{ color: '#d1d5db', lineHeight: '2', paddingLeft: '1.25rem', margin: 0 }}>
                  <li>Server-rendered pages (Thymeleaf, JSP)</li>
                  <li>Simple monolith with one server</li>
                  <li>Need instant logout / session revocation</li>
                  <li>Already using Spring Session with Redis</li>
                </ul>
              </div>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <h4 style={{ color: '#10b981', marginBottom: '0.5rem' }}>Choose Stateless When</h4>
                <ul style={{ color: '#d1d5db', lineHeight: '2', paddingLeft: '1.25rem', margin: 0 }}>
                  <li>REST APIs consumed by SPAs or mobile</li>
                  <li>Microservices behind a gateway</li>
                  <li>Horizontal scaling without shared state</li>
                  <li>Cross-domain / cross-service authentication</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Overrides Tab */}
      {activeSection === 'custom-overrides' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h2 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.3rem' }}>Why Override Spring Security Defaults?</h2>
            <p style={{ color: '#d1d5db', lineHeight: '1.8' }}>
              Spring Security ships sensible defaults, but real applications almost always need to replace them. Overriding lets you control <strong style={{ color: '#fca5a5' }}>where users come from</strong>, <strong style={{ color: '#fca5a5' }}>how errors look</strong>, <strong style={{ color: '#fca5a5' }}>what happens after login</strong>, and <strong style={{ color: '#fca5a5' }}>how permissions are evaluated</strong> &mdash; without forking the framework.
            </p>
          </div>

          {/* UserDetailsService */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h3 style={{ color: '#ef4444', marginBottom: '0.25rem', fontSize: '1.1rem' }}>UserDetailsService</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem' }}>Default: in-memory user with a random password printed to console</p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <h4 style={{ color: '#fbbf24', marginBottom: '0.5rem' }}>Why Override</h4>
                <ul style={{ color: '#d1d5db', lineHeight: '2', paddingLeft: '1.25rem', margin: 0 }}>
                  <li>Load users from your database, LDAP, or external API</li>
                  <li>Include custom fields (department, permissions, tenant ID)</li>
                  <li>Enforce account rules (locked, expired, disabled)</li>
                </ul>
              </div>
            </div>
            <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
              <SyntaxHighlighter code={`@Service
public class CustomUserDetailsService
        implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        User user = userRepository.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException(
                "No account for " + username));

        return org.springframework.security.core.userdetails.User
            .builder()
            .username(user.getEmail())
            .password(user.getPasswordHash())
            .authorities(user.getRoles().stream()
                .map(r -> new SimpleGrantedAuthority(r.getName()))
                .toList())
            .accountLocked(user.isLocked())
            .disabled(!user.isEmailVerified())
            .build();
    }
}`} />
            </div>
          </div>

          {/* AuthenticationProvider */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h3 style={{ color: '#ef4444', marginBottom: '0.25rem', fontSize: '1.1rem' }}>AuthenticationProvider</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem' }}>Default: DaoAuthenticationProvider that calls UserDetailsService + PasswordEncoder</p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <h4 style={{ color: '#fbbf24', marginBottom: '0.5rem' }}>Why Override</h4>
                <ul style={{ color: '#d1d5db', lineHeight: '2', paddingLeft: '1.25rem', margin: 0 }}>
                  <li>Add multi-factor authentication (OTP, TOTP)</li>
                  <li>Authenticate against external systems (LDAP, SSO, legacy DB)</li>
                  <li>Support multiple credential types in one app</li>
                  <li>Add login throttling or IP-based blocking</li>
                </ul>
              </div>
            </div>
            <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
              <SyntaxHighlighter code={`@Component
public class MfaAuthenticationProvider
        implements AuthenticationProvider {

    @Autowired private UserDetailsService userDetailsService;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private TotpService totpService;

    @Override
    public Authentication authenticate(Authentication auth)
            throws AuthenticationException {

        String username = auth.getName();
        String password = auth.getCredentials().toString();

        // Extract OTP from custom token details
        MfaAuthDetails details = (MfaAuthDetails) auth.getDetails();
        String otp = details.getOtp();

        UserDetails user = userDetailsService
            .loadUserByUsername(username);

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new BadCredentialsException("Bad password");
        }

        if (!totpService.verify(username, otp)) {
            throw new BadCredentialsException("Invalid OTP");
        }

        return new UsernamePasswordAuthenticationToken(
            user, null, user.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class
            .isAssignableFrom(authentication);
    }
}`} />
            </div>
          </div>

          {/* AuthenticationEntryPoint */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h3 style={{ color: '#ef4444', marginBottom: '0.25rem', fontSize: '1.1rem' }}>AuthenticationEntryPoint</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem' }}>Default: redirects to /login page (or returns basic WWW-Authenticate header)</p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <h4 style={{ color: '#fbbf24', marginBottom: '0.5rem' }}>Why Override</h4>
                <ul style={{ color: '#d1d5db', lineHeight: '2', paddingLeft: '1.25rem', margin: 0 }}>
                  <li>Return JSON 401 instead of an HTML redirect for APIs</li>
                  <li>Include error codes your frontend can parse</li>
                  <li>Log unauthorized access attempts for security monitoring</li>
                </ul>
              </div>
            </div>
            <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
              <SyntaxHighlighter code={`@Component
public class JsonAuthEntryPoint
        implements AuthenticationEntryPoint {

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public void commence(HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException ex) throws IOException {

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        response.getWriter().write(mapper.writeValueAsString(Map.of(
            "status", 401,
            "error", "Unauthorized",
            "message", "Authentication required",
            "path", request.getRequestURI()
        )));
    }
}

// Register it
http.exceptionHandling(ex -> ex
    .authenticationEntryPoint(new JsonAuthEntryPoint()));`} />
            </div>
          </div>

          {/* AccessDeniedHandler */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h3 style={{ color: '#ef4444', marginBottom: '0.25rem', fontSize: '1.1rem' }}>AccessDeniedHandler</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem' }}>Default: returns a plain 403 Forbidden page</p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <h4 style={{ color: '#fbbf24', marginBottom: '0.5rem' }}>Why Override</h4>
                <ul style={{ color: '#d1d5db', lineHeight: '2', paddingLeft: '1.25rem', margin: 0 }}>
                  <li>Return structured JSON for API consumers</li>
                  <li>Log which user attempted to access which resource</li>
                  <li>Trigger security alerts for suspicious access patterns</li>
                </ul>
              </div>
            </div>
            <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
              <SyntaxHighlighter code={`@Component
public class JsonAccessDeniedHandler
        implements AccessDeniedHandler {

    @Autowired private SecurityAuditService auditService;

    @Override
    public void handle(HttpServletRequest request,
            HttpServletResponse response,
            AccessDeniedException ex) throws IOException {

        Authentication auth = SecurityContextHolder
            .getContext().getAuthentication();

        // Audit the forbidden attempt
        auditService.logForbidden(auth.getName(),
            request.getRequestURI());

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);

        response.getWriter().write(new ObjectMapper()
            .writeValueAsString(Map.of(
                "status", 403,
                "error", "Forbidden",
                "message", "Insufficient permissions",
                "user", auth.getName(),
                "path", request.getRequestURI()
            )));
    }
}

// Register it
http.exceptionHandling(ex -> ex
    .accessDeniedHandler(new JsonAccessDeniedHandler()));`} />
            </div>
          </div>

          {/* OncePerRequestFilter */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h3 style={{ color: '#ef4444', marginBottom: '0.25rem', fontSize: '1.1rem' }}>OncePerRequestFilter (Custom Filters)</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem' }}>Default: no custom filters in the chain</p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <h4 style={{ color: '#fbbf24', marginBottom: '0.5rem' }}>Why Override</h4>
                <ul style={{ color: '#d1d5db', lineHeight: '2', paddingLeft: '1.25rem', margin: 0 }}>
                  <li>Add JWT validation filter for stateless APIs</li>
                  <li>Inject tenant context for multi-tenant apps</li>
                  <li>Add rate limiting, request logging, or API key validation</li>
                  <li>Sanitize or validate headers before they reach controllers</li>
                </ul>
              </div>
            </div>
            <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
              <SyntaxHighlighter code={`@Component
public class TenantFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain)
            throws ServletException, IOException {

        String tenantId = request.getHeader("X-Tenant-Id");

        if (tenantId == null) {
            response.sendError(400, "Missing X-Tenant-Id header");
            return;
        }

        TenantContext.setCurrentTenant(tenantId);
        try {
            chain.doFilter(request, response);
        } finally {
            TenantContext.clear();
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        // Skip for public endpoints
        return request.getRequestURI().startsWith("/public");
    }
}

// Register in filter chain
http.addFilterAfter(tenantFilter,
    UsernamePasswordAuthenticationFilter.class);`} />
            </div>
          </div>

          {/* PermissionEvaluator */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h3 style={{ color: '#ef4444', marginBottom: '0.25rem', fontSize: '1.1rem' }}>PermissionEvaluator</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem' }}>Default: always returns false for hasPermission() calls</p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <h4 style={{ color: '#fbbf24', marginBottom: '0.5rem' }}>Why Override</h4>
                <ul style={{ color: '#d1d5db', lineHeight: '2', paddingLeft: '1.25rem', margin: 0 }}>
                  <li>Domain-level access control (user owns this document?)</li>
                  <li>Go beyond simple roles to object-level permissions</li>
                  <li>Centralize authorization logic instead of scattering if-checks</li>
                </ul>
              </div>
            </div>
            <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
              <SyntaxHighlighter code={`@Component
public class DomainPermissionEvaluator
        implements PermissionEvaluator {

    @Autowired private DocumentRepository docRepo;

    @Override
    public boolean hasPermission(Authentication auth,
            Object target, Object permission) {

        if (target instanceof Document doc) {
            String user = auth.getName();
            return switch ((String) permission) {
                case "READ"   -> doc.isPublic()
                                 || doc.getOwner().equals(user);
                case "WRITE"  -> doc.getOwner().equals(user);
                case "DELETE" -> doc.getOwner().equals(user)
                                 || hasRole(auth, "ADMIN");
                default       -> false;
            };
        }
        return false;
    }

    @Override
    public boolean hasPermission(Authentication auth,
            Serializable id, String type, Object perm) {
        Document doc = docRepo.findById((Long) id).orElse(null);
        return doc != null && hasPermission(auth, doc, perm);
    }

    private boolean hasRole(Authentication a, String role) {
        return a.getAuthorities().stream()
            .anyMatch(g -> g.getAuthority().equals("ROLE_" + role));
    }
}

// Usage with @PreAuthorize
@PreAuthorize("hasPermission(#docId, 'Document', 'READ')")
public Document getDocument(Long docId) { ... }`} />
            </div>
          </div>

          {/* SuccessHandler / FailureHandler */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h3 style={{ color: '#ef4444', marginBottom: '0.25rem', fontSize: '1.1rem' }}>AuthenticationSuccessHandler &amp; FailureHandler</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem' }}>Default: redirect to / on success, redirect to /login?error on failure</p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <h4 style={{ color: '#fbbf24', marginBottom: '0.5rem' }}>Why Override</h4>
                <ul style={{ color: '#d1d5db', lineHeight: '2', paddingLeft: '1.25rem', margin: 0 }}>
                  <li>Return a JWT in the response body instead of redirecting</li>
                  <li>Record last-login timestamp, IP address, login count</li>
                  <li>Redirect users to role-specific dashboards</li>
                  <li>Lock accounts after N failed attempts</li>
                </ul>
              </div>
            </div>
            <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
              <SyntaxHighlighter code={`@Component
public class CustomSuccessHandler
        implements AuthenticationSuccessHandler {

    @Autowired private UserRepository userRepo;
    @Autowired private JwtTokenProvider jwtProvider;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication auth) throws IOException {

        // Update last login
        User user = userRepo.findByEmail(auth.getName()).get();
        user.setLastLogin(Instant.now());
        user.setLoginCount(user.getLoginCount() + 1);
        userRepo.save(user);

        // Return JWT
        String token = jwtProvider.generateToken(auth);
        response.setContentType("application/json");
        response.getWriter().write(
            new ObjectMapper().writeValueAsString(
                Map.of("token", token)));
    }
}

@Component
public class CustomFailureHandler
        implements AuthenticationFailureHandler {

    @Autowired private LoginAttemptService attemptService;

    @Override
    public void onAuthenticationFailure(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException ex) throws IOException {

        String username = request.getParameter("username");
        attemptService.recordFailure(username);

        if (attemptService.isBlocked(username)) {
            response.setStatus(429);
            response.getWriter().write("Account locked for 15 min");
            return;
        }

        response.setStatus(401);
        response.getWriter().write("Invalid credentials");
    }
}`} />
            </div>
          </div>

          {/* Summary table */}
          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <h3 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '1.1rem' }}>Quick Reference</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #374151' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#94a3b8', fontWeight: 600 }}>Class to Override</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#94a3b8', fontWeight: 600 }}>Default Behavior</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#94a3b8', fontWeight: 600 }}>Override When You Need</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['UserDetailsService', 'In-memory user, random password', 'Database / LDAP / external user store'],
                  ['AuthenticationProvider', 'Password-only via DaoAuthProvider', 'MFA, OTP, external SSO, multiple auth methods'],
                  ['AuthenticationEntryPoint', 'Redirect to /login or WWW-Authenticate', 'JSON 401 responses for REST APIs'],
                  ['AccessDeniedHandler', 'Plain 403 HTML page', 'JSON 403 responses, audit logging'],
                  ['OncePerRequestFilter', 'No custom filters', 'JWT filter, tenant context, rate limiting'],
                  ['PermissionEvaluator', 'Always returns false', 'Object-level permissions (owner checks)'],
                  ['SuccessHandler', 'Redirect to /', 'Return JWT, record login, role-based redirect'],
                  ['FailureHandler', 'Redirect to /login?error', 'Account lockout, JSON error, audit trail']
                ].map(([cls, def, override], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #374151' }}>
                    <td style={{ padding: '0.75rem', color: '#fbbf24', fontWeight: 600, fontFamily: 'monospace', fontSize: '0.85rem' }}>{cls}</td>
                    <td style={{ padding: '0.75rem', color: '#94a3b8' }}>{def}</td>
                    <td style={{ padding: '0.75rem', color: '#d1d5db' }}>{override}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      </div>
    </div>
  )
}

export default SpringSecurity

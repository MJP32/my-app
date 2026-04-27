import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

// Auto-Configuration Flow Diagram
const AutoConfigDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Spring Boot Auto-Configuration Flow</text>
    <rect x="30" y="50" width="100" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="80" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">@SpringBoot</text>
    <text x="80" y="92" textAnchor="middle" fill="white" fontSize="8">Application</text>
    <rect x="155" y="50" width="100" height="50" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="205" y="75" textAnchor="middle" fill="white" fontSize="8">Scan</text>
    <text x="205" y="88" textAnchor="middle" fill="white" fontSize="8">spring.factories</text>
    <rect x="280" y="50" width="100" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="330" y="75" textAnchor="middle" fill="white" fontSize="8">@Conditional</text>
    <text x="330" y="88" textAnchor="middle" fill="white" fontSize="8">Evaluation</text>
    <rect x="405" y="50" width="100" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="455" y="75" textAnchor="middle" fill="white" fontSize="8">Bean</text>
    <text x="455" y="88" textAnchor="middle" fill="white" fontSize="8">Registration</text>
    <rect x="530" y="50" width="100" height="50" rx="6" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="580" y="80" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Ready!</text>
    <line x1="130" y1="75" x2="150" y2="75" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <line x1="255" y1="75" x2="275" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="380" y1="75" x2="400" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="505" y1="75" x2="525" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="130" textAnchor="middle" fill="#64748b" fontSize="9">Classpath scanning &rarr; Conditional checks &rarr; Auto-configured beans</text>
  </svg>
)

// Starter Dependencies Diagram
const StarterDependenciesDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Spring Boot Starter Dependencies</text>
    <rect x="250" y="40" width="200" height="40" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="350" y="65" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">spring-boot-starter-web</text>
    <rect x="50" y="100" width="120" height="35" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="110" y="122" textAnchor="middle" fill="#4ade80" fontSize="9">Tomcat</text>
    <rect x="190" y="100" width="120" height="35" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="250" y="122" textAnchor="middle" fill="#a78bfa" fontSize="9">Spring MVC</text>
    <rect x="330" y="100" width="120" height="35" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="390" y="122" textAnchor="middle" fill="#fbbf24" fontSize="9">Jackson JSON</text>
    <rect x="470" y="100" width="120" height="35" rx="4" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="1"/>
    <text x="530" y="122" textAnchor="middle" fill="#f472b6" fontSize="9">Validation</text>
    <line x1="250" y1="80" x2="110" y2="95" stroke="#64748b" strokeWidth="1"/>
    <line x1="300" y1="80" x2="250" y2="95" stroke="#64748b" strokeWidth="1"/>
    <line x1="400" y1="80" x2="390" y2="95" stroke="#64748b" strokeWidth="1"/>
    <line x1="450" y1="80" x2="530" y2="95" stroke="#64748b" strokeWidth="1"/>
    <text x="350" y="160" textAnchor="middle" fill="#64748b" fontSize="9">One declaration &rarr; All compatible dependencies included</text>
  </svg>
)

// Embedded Server Diagram
const EmbeddedServerDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Embedded Server Architecture</text>
    <rect x="150" y="45" width="400" height="90" rx="8" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="350" y="65" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">application.jar</text>
    <rect x="170" y="75" width="100" height="45" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="220" y="95" textAnchor="middle" fill="#a78bfa" fontSize="9">Your Code</text>
    <text x="220" y="110" textAnchor="middle" fill="#c4b5fd" fontSize="8">Controllers, Services</text>
    <rect x="290" y="75" width="100" height="45" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="340" y="95" textAnchor="middle" fill="#4ade80" fontSize="9">Spring Boot</text>
    <text x="340" y="110" textAnchor="middle" fill="#86efac" fontSize="8">Auto-config</text>
    <rect x="410" y="75" width="120" height="45" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="470" y="95" textAnchor="middle" fill="#fbbf24" fontSize="9">Tomcat/Jetty</text>
    <text x="470" y="110" textAnchor="middle" fill="#fcd34d" fontSize="8">Embedded Server</text>
    <rect x="580" y="70" width="80" height="55" rx="4" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="620" y="95" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">JRE</text>
    <text x="620" y="110" textAnchor="middle" fill="#67e8f9" fontSize="8">java -jar</text>
    <line x1="550" y1="97" x2="575" y2="97" stroke="#22d3ee" strokeWidth="2"/>
    <text x="350" y="150" textAnchor="middle" fill="#64748b" fontSize="9">Self-contained JAR &bull; No external server needed &bull; Simple deployment</text>
  </svg>
)

// Actuator Endpoints Diagram
const ActuatorDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Spring Boot Actuator Endpoints</text>
    <rect x="250" y="40" width="200" height="35" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="350" y="63" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">/actuator</text>
    <rect x="50" y="95" width="90" height="50" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="95" y="115" textAnchor="middle" fill="#4ade80" fontSize="9">/health</text>
    <text x="95" y="130" textAnchor="middle" fill="#86efac" fontSize="7">Liveness</text>
    <rect x="155" y="95" width="90" height="50" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="200" y="115" textAnchor="middle" fill="#60a5fa" fontSize="9">/metrics</text>
    <text x="200" y="130" textAnchor="middle" fill="#93c5fd" fontSize="7">JVM/HTTP</text>
    <rect x="260" y="95" width="90" height="50" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="305" y="115" textAnchor="middle" fill="#a78bfa" fontSize="9">/info</text>
    <text x="305" y="130" textAnchor="middle" fill="#c4b5fd" fontSize="7">Build info</text>
    <rect x="365" y="95" width="90" height="50" rx="4" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="1"/>
    <text x="410" y="115" textAnchor="middle" fill="#f472b6" fontSize="9">/loggers</text>
    <text x="410" y="130" textAnchor="middle" fill="#f9a8d4" fontSize="7">Dynamic logs</text>
    <rect x="470" y="95" width="90" height="50" rx="4" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="1"/>
    <text x="515" y="115" textAnchor="middle" fill="#22d3ee" fontSize="9">/prometheus</text>
    <text x="515" y="130" textAnchor="middle" fill="#67e8f9" fontSize="7">Scrape</text>
    <rect x="575" y="95" width="90" height="50" rx="4" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="1"/>
    <text x="620" y="115" textAnchor="middle" fill="#f87171" fontSize="9">/env</text>
    <text x="620" y="130" textAnchor="middle" fill="#fca5a5" fontSize="7">Config</text>
    <line x1="250" y1="75" x2="95" y2="90" stroke="#64748b" strokeWidth="1"/>
    <line x1="300" y1="75" x2="200" y2="90" stroke="#64748b" strokeWidth="1"/>
    <line x1="350" y1="75" x2="305" y2="90" stroke="#64748b" strokeWidth="1"/>
    <line x1="400" y1="75" x2="410" y2="90" stroke="#64748b" strokeWidth="1"/>
    <line x1="450" y1="75" x2="515" y2="90" stroke="#64748b" strokeWidth="1"/>
    <line x1="450" y1="75" x2="620" y2="90" stroke="#64748b" strokeWidth="1"/>
    <text x="350" y="165" textAnchor="middle" fill="#64748b" fontSize="9">Production-ready monitoring &bull; Kubernetes probes &bull; Observability</text>
  </svg>
)

// DevTools Diagram
const DevToolsDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">DevTools Fast Restart Architecture</text>
    <rect x="50" y="50" width="140" height="70" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="120" y="75" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Base ClassLoader</text>
    <text x="120" y="92" textAnchor="middle" fill="#93c5fd" fontSize="8">Dependencies</text>
    <text x="120" y="106" textAnchor="middle" fill="#93c5fd" fontSize="8">(Stable)</text>
    <rect x="220" y="50" width="140" height="70" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="290" y="75" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Restart ClassLoader</text>
    <text x="290" y="92" textAnchor="middle" fill="#86efac" fontSize="8">Your Code</text>
    <text x="290" y="106" textAnchor="middle" fill="#86efac" fontSize="8">(Reloads fast)</text>
    <rect x="400" y="50" width="100" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="450" y="80" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">File Watcher</text>
    <text x="450" y="100" textAnchor="middle" fill="#fcd34d" fontSize="8">Trigger restart</text>
    <rect x="540" y="50" width="120" height="70" rx="6" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="2"/>
    <text x="600" y="75" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">LiveReload</text>
    <text x="600" y="92" textAnchor="middle" fill="#f9a8d4" fontSize="8">Browser refresh</text>
    <text x="600" y="106" textAnchor="middle" fill="#f9a8d4" fontSize="8">on change</text>
    <path d="M 400 85 Q 340 130 290 120" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="5"/>
    <text x="350" y="145" textAnchor="middle" fill="#64748b" fontSize="9">Code change &rarr; 5-10s restart (vs 30-60s full restart)</text>
  </svg>
)

// Configuration Properties Diagram
const ConfigPropertiesDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Configuration Property Precedence</text>
    <rect x="50" y="45" width="100" height="40" rx="4" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="100" y="65" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Command Line</text>
    <text x="100" y="78" textAnchor="middle" fill="white" fontSize="7">Highest</text>
    <rect x="165" y="45" width="100" height="40" rx="4" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="215" y="65" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Env Variables</text>
    <text x="215" y="78" textAnchor="middle" fill="white" fontSize="7">APP_NAME</text>
    <rect x="280" y="45" width="100" height="40" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="330" y="65" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">application.yml</text>
    <text x="330" y="78" textAnchor="middle" fill="white" fontSize="7">Profile-specific</text>
    <rect x="395" y="45" width="100" height="40" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="445" y="65" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">application.yml</text>
    <text x="445" y="78" textAnchor="middle" fill="white" fontSize="7">Default</text>
    <rect x="510" y="45" width="100" height="40" rx="4" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="560" y="65" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">@Value default</text>
    <text x="560" y="78" textAnchor="middle" fill="white" fontSize="7">Lowest</text>
    <line x1="100" y1="90" x2="100" y2="105" stroke="#ef4444" strokeWidth="2"/>
    <line x1="215" y1="90" x2="215" y2="105" stroke="#f59e0b" strokeWidth="2"/>
    <line x1="330" y1="90" x2="330" y2="105" stroke="#22c55e" strokeWidth="2"/>
    <line x1="445" y1="90" x2="445" y2="105" stroke="#3b82f6" strokeWidth="2"/>
    <line x1="560" y1="90" x2="560" y2="105" stroke="#8b5cf6" strokeWidth="2"/>
    <rect x="150" y="110" width="400" height="45" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="350" y="130" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">@ConfigurationProperties(prefix = &quot;app&quot;)</text>
    <text x="350" y="145" textAnchor="middle" fill="#c4b5fd" fontSize="8">Type-safe binding with validation</text>
    <text x="350" y="170" textAnchor="middle" fill="#64748b" fontSize="9">Same binary &rarr; Different environments via configuration</text>
  </svg>
)

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
      .replace(/\b(String|List|ArrayList|Set|HashSet|Map|HashMap|Optional|Stream|Exception|SpringBootApplication|EnableAutoConfiguration|ComponentScan|Configuration|Component|Service|Repository|Controller|RestController|Autowired|Qualifier|Primary|Value|Bean|RequestMapping|GetMapping|PostMapping|PutMapping|DeleteMapping|PatchMapping|PathVariable|RequestParam|RequestBody|ResponseBody|ResponseStatus|Entity|Table|Column|Id|GeneratedValue|Transactional|Query|ConditionalOnClass|ConditionalOnMissingBean|ConditionalOnProperty|Profile|ConfigurationProperties|SpringApplication|ResponseEntity|HttpStatus|ObjectMapper|WebMvcConfigurer|SecurityFilterChain|HttpSecurity|WebClient|RestTemplate|JdbcTemplate|DataSource|Environment|ApplicationContext|ApplicationRunner|CommandLineRunner|ExceptionHandler|ControllerAdvice|Valid|NotNull|NotBlank|Size|Min|Max|Pattern|Override|Integer|Long|BigDecimal|LocalDate|Date|Duration|Scheduled|Async|EnableScheduling|EnableAsync|Cacheable|CacheEvict|EnableCaching)\b/g, '<span style="color: #4ec9b0;">$1</span>')
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

function SpringBoot({ onBack, onPrevious, onNext, previousName, nextName, breadcrumb }) {
  const [activeSection, setActiveSection] = useState('auto-config')

  const tabs = [
    { id: 'auto-config', label: 'Auto-Configuration' },
    { id: 'starters', label: 'Starters' },
    { id: 'embedded-servers', label: 'Embedded Servers' },
    { id: 'actuator', label: 'Actuator' },
    { id: 'devtools', label: 'DevTools' },
    { id: 'config-properties', label: 'Config Properties' },
    { id: 'annotations', label: 'Annotations' }
  ]

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onBack}
            style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s ease' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#16a34a'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#22c55e'}
          >
            &larr; Back
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {onPrevious && (
            <button
              onClick={onPrevious}
              style={{ padding: '0.75rem 1.25rem', background: 'rgba(74, 222, 128, 0.2)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '0.5rem', color: '#4ade80', cursor: 'pointer', fontSize: '0.95rem' }}
            >
              &larr; {previousName}
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              style={{ padding: '0.75rem 1.25rem', background: 'rgba(74, 222, 128, 0.2)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '0.5rem', color: '#4ade80', cursor: 'pointer', fontSize: '0.95rem' }}
            >
              {nextName} &rarr;
            </button>
          )}
        </div>
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

      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '0.5rem', background: 'linear-gradient(to right, #4ade80, #22c55e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Spring Boot
      </h1>
      <p style={{ color: '#d1d5db', textAlign: 'center', marginBottom: '2rem', fontSize: '1.1rem' }}>
        Opinionated framework for building production-ready Spring applications with minimal configuration
      </p>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '2rem', borderBottom: '2px solid #374151', overflowX: 'auto', flexWrap: 'nowrap' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            style={{
              padding: '0.75rem 1.25rem',
              fontSize: '0.95rem',
              fontWeight: '600',
              backgroundColor: activeSection === tab.id ? '#22c55e' : 'transparent',
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

      {/* Auto-Configuration Tab */}
      {activeSection === 'auto-config' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h2 style={{ color: '#4ade80', marginBottom: '1rem', fontSize: '1.3rem' }}>Auto-Configuration</h2>
            <p style={{ color: '#d1d5db', lineHeight: '1.8' }}>
              Spring Boot&apos;s auto-configuration dramatically reduces boilerplate by intelligently configuring your application based on classpath dependencies. <strong style={{ color: '#86efac' }}>@SpringBootApplication</strong> combines @Configuration, @EnableAutoConfiguration, and @ComponentScan. Conditional annotations apply configuration only when conditions are met.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}><AutoConfigDiagram /></div>
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#22c55e', fontWeight: 600, fontSize: '0.95rem' }}>How It Works</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@SpringBootApplication
// Equivalent to: @Configuration + @EnableAutoConfiguration + @ComponentScan
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}

// Exclude specific auto-configurations
@SpringBootApplication(exclude = {
    DataSourceAutoConfiguration.class,
    SecurityAutoConfiguration.class
})
public class LightweightApp {
    public static void main(String[] args) {
        SpringApplication.run(LightweightApp.class, args);
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#22c55e', fontWeight: 600, fontSize: '0.95rem' }}>Custom Auto-Configuration</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`// Custom auto-configuration class
@Configuration
@ConditionalOnClass(DataSource.class)
@ConditionalOnProperty(prefix = "app.cache", name = "enabled", havingValue = "true")
public class CacheAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("users", "products");
    }
}

// Run with --debug to see auto-configuration report
// java -jar app.jar --debug`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#22c55e', fontWeight: 600, fontSize: '0.95rem' }}>Feature Toggle via @ConditionalOnProperty</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Configuration
@ConditionalOnProperty(
    prefix = "app.notifications",
    name = "enabled",
    havingValue = "true",
    matchIfMissing = false
)
public class NotificationConfig {

    @Bean
    @ConditionalOnProperty(name = "app.notifications.type", havingValue = "email")
    public NotificationService emailNotificationService() {
        return new EmailNotificationService();
    }

    @Bean
    @ConditionalOnProperty(name = "app.notifications.type", havingValue = "sms")
    public NotificationService smsNotificationService() {
        return new SmsNotificationService();
    }
}`} />
          </div>
        </div>
      )}

      {/* Starters Tab */}
      {activeSection === 'starters' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h2 style={{ color: '#3b82f6', marginBottom: '1rem', fontSize: '1.3rem' }}>Starter Dependencies</h2>
            <p style={{ color: '#d1d5db', lineHeight: '1.8' }}>
              Curated dependency sets providing everything needed for specific use cases in one package. The <strong style={{ color: '#93c5fd' }}>Bill of Materials (BOM)</strong> manages compatible versions across all included libraries. One declaration pulls in server, serialization, validation, and more.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}><StarterDependenciesDiagram /></div>
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#3b82f6', fontWeight: 600, fontSize: '0.95rem' }}>Basic Starter Setup</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>XML</span>
            </div>
            <SyntaxHighlighter code={`<!-- pom.xml - Starter Dependencies -->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
</parent>

<dependencies>
    <!-- Web starter: Tomcat + Spring MVC + Jackson -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <!-- No version needed - managed by parent BOM -->
</dependencies>`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#3b82f6', fontWeight: 600, fontSize: '0.95rem' }}>Swap Tomcat for Jetty</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>XML</span>
            </div>
            <SyntaxHighlighter code={`<!-- Exclude Tomcat and use Jetty instead -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#3b82f6', fontWeight: 600, fontSize: '0.95rem' }}>Typical Microservice Dependencies</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>XML</span>
            </div>
            <SyntaxHighlighter code={`<dependencies>
    <!-- REST API -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <!-- Database -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <!-- Security -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <!-- Monitoring -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
    <!-- Testing -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#3b82f6', fontWeight: 600, fontSize: '0.95rem' }}>Spring Data JPA &mdash; Zero Implementation</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`// With spring-boot-starter-data-jpa, this just works:
@Entity
public class Product {
    @Id @GeneratedValue
    private Long id;
    private String name;
    private BigDecimal price;
}

// Spring Data JPA repository - zero implementation needed
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContaining(String name);
    List<Product> findByPriceLessThan(BigDecimal price);

    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :min AND :max")
    List<Product> findInPriceRange(@Param("min") BigDecimal min,
                                   @Param("max") BigDecimal max);
}`} />
          </div>
        </div>
      )}

      {/* Embedded Servers Tab */}
      {activeSection === 'embedded-servers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h2 style={{ color: '#8b5cf6', marginBottom: '1rem', fontSize: '1.3rem' }}>Embedded Servers</h2>
            <p style={{ color: '#d1d5db', lineHeight: '1.8' }}>
              Spring Boot packages the web server directly in your application JAR. Run with a simple <code style={{ color: '#fbbf24', background: '#1e1e2e', padding: '0.1rem 0.3rem', borderRadius: '0.25rem' }}>java -jar</code> command &mdash; no separate server installation needed. Choose from <strong style={{ color: '#a78bfa' }}>Tomcat</strong> (default), <strong style={{ color: '#a78bfa' }}>Jetty</strong>, <strong style={{ color: '#a78bfa' }}>Undertow</strong>, or <strong style={{ color: '#a78bfa' }}>Reactor Netty</strong>.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}><EmbeddedServerDiagram /></div>
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#8b5cf6', fontWeight: 600, fontSize: '0.95rem' }}>Executable JAR with SSL</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`// Build and run as executable JAR
// mvn clean package
// java -jar target/myapp-1.0.0.jar

// Customize embedded server via application.yml
// server:
//   port: 8443
//   ssl:
//     key-store: classpath:keystore.p12
//     key-store-password: secret
//     key-store-type: PKCS12
//   compression:
//     enabled: true
//     mime-types: application/json,text/html

@SpringBootApplication
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
        // Embedded Tomcat starts automatically on port 8443
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#8b5cf6', fontWeight: 600, fontSize: '0.95rem' }}>Docker &mdash; Minimal Container</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Dockerfile</span>
            </div>
            <SyntaxHighlighter code={`# Dockerfile - minimal container with embedded server
FROM eclipse-temurin:21-jre-alpine
COPY target/myapp-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

# Build and run:
# docker build -t myapp .
# docker run -p 8080:8080 myapp

# No Tomcat installation needed!
# No WAR deployment!
# No server configuration files!`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#8b5cf6', fontWeight: 600, fontSize: '0.95rem' }}>Server Customization &amp; Switching</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`// Programmatic server customization
@Bean
public WebServerFactoryCustomizer<TomcatServletWebServerFactory>
        tomcatCustomizer() {
    return factory -> {
        factory.setPort(8080);
        factory.addConnectorCustomizers(connector -> {
            connector.setMaxPostSize(10 * 1024 * 1024); // 10MB
        });
    };
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#8b5cf6', fontWeight: 600, fontSize: '0.95rem' }}>Production Tuning</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>YAML</span>
            </div>
            <SyntaxHighlighter code={`// Production server tuning in application.yml
// server:
//   tomcat:
//     threads:
//       max: 200          # Max worker threads
//       min-spare: 20     # Min idle threads
//     max-connections: 8192
//     accept-count: 100   # Queue when all threads busy
//     connection-timeout: 20000
//   shutdown: graceful     # Wait for active requests
// spring:
//   lifecycle:
//     timeout-per-shutdown-phase: 30s`} />
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h3 style={{ color: '#fbbf24', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Server Comparison</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #374151' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#94a3b8', fontWeight: 600 }}>Server</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#94a3b8', fontWeight: 600 }}>Best For</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Tomcat (default)', 'Full Servlet support, broad compatibility, proven production use'],
                  ['Jetty', 'Lightweight, excellent async I/O, ideal for WebSocket and long-polling'],
                  ['Undertow', 'High-performance, non-blocking I/O, lowest memory footprint'],
                  ['Reactor Netty', 'Spring WebFlux, fully non-blocking, optimal for reactive apps']
                ].map(([server, desc], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #374151' }}>
                    <td style={{ padding: '0.75rem', color: '#a78bfa', fontWeight: 600 }}>{server}</td>
                    <td style={{ padding: '0.75rem', color: '#d1d5db' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Actuator Tab */}
      {activeSection === 'actuator' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h2 style={{ color: '#f59e0b', marginBottom: '1rem', fontSize: '1.3rem' }}>Actuator</h2>
            <p style={{ color: '#d1d5db', lineHeight: '1.8' }}>
              Production-ready monitoring, management, and diagnostics through HTTP endpoints. Built on <strong style={{ color: '#fcd34d' }}>Micrometer</strong> for vendor-neutral metrics. Exports to Prometheus, Grafana, Datadog, and CloudWatch. Provides health checks for Kubernetes liveness and readiness probes.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}><ActuatorDiagram /></div>
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#f59e0b', fontWeight: 600, fontSize: '0.95rem' }}>Setup &amp; Configuration</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>YAML</span>
            </div>
            <SyntaxHighlighter code={`// Add actuator dependency
// <dependency>
//     <groupId>org.springframework.boot</groupId>
//     <artifactId>spring-boot-starter-actuator</artifactId>
// </dependency>

// application.yml - expose endpoints
// management:
//   endpoints:
//     web:
//       exposure:
//         include: health,metrics,info,prometheus
//   endpoint:
//     health:
//       show-details: when_authorized
//       probes:
//         enabled: true

// GET /actuator/health
// { "status": "UP",
//   "components": {
//     "db": { "status": "UP" },
//     "diskSpace": { "status": "UP" }
//   }
// }`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#f59e0b', fontWeight: 600, fontSize: '0.95rem' }}>Custom Health Indicator</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Component
public class PaymentGatewayHealthIndicator
        implements HealthIndicator {

    @Autowired
    private PaymentGatewayClient gateway;

    @Override
    public Health health() {
        try {
            boolean reachable = gateway.ping();
            if (reachable) {
                return Health.up()
                    .withDetail("provider", "Stripe")
                    .withDetail("latency", "45ms")
                    .build();
            }
            return Health.down()
                .withDetail("error", "Gateway unreachable")
                .build();
        } catch (Exception e) {
            return Health.down(e).build();
        }
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#f59e0b', fontWeight: 600, fontSize: '0.95rem' }}>Custom Metrics with Micrometer</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Service
public class OrderService {

    private final Counter orderCounter;
    private final Timer orderTimer;

    public OrderService(MeterRegistry registry) {
        this.orderCounter = Counter.builder("orders.placed")
            .tag("type", "online")
            .description("Total orders placed")
            .register(registry);
        this.orderTimer = Timer.builder("orders.processing.time")
            .description("Order processing duration")
            .register(registry);
    }

    public Order placeOrder(OrderRequest request) {
        return orderTimer.record(() -> {
            Order order = processOrder(request);
            orderCounter.increment();
            return order;
        });
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#f59e0b', fontWeight: 600, fontSize: '0.95rem' }}>Secure Actuator Endpoints</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Configuration
public class ActuatorSecurityConfig {

    @Bean
    public SecurityFilterChain actuatorSecurity(HttpSecurity http)
            throws Exception {
        return http
            .securityMatcher("/actuator/**")
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/health/**").permitAll()
                .requestMatchers("/actuator/prometheus").permitAll()
                .requestMatchers("/actuator/**").hasRole("ADMIN")
            )
            .httpBasic(Customizer.withDefaults())
            .build();
    }
}

// Separate management port for internal-only access
// management:
//   server:
//     port: 9090    # Different from app port 8080
//   endpoints:
//     web:
//       base-path: /manage`} />
          </div>
        </div>
      )}

      {/* DevTools Tab */}
      {activeSection === 'devtools' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h2 style={{ color: '#ec4899', marginBottom: '1rem', fontSize: '1.3rem' }}>DevTools</h2>
            <p style={{ color: '#d1d5db', lineHeight: '1.8' }}>
              Development productivity features including <strong style={{ color: '#f9a8d4' }}>automatic restart</strong> (5-10s vs 30-60s full restart), <strong style={{ color: '#f9a8d4' }}>LiveReload</strong> browser refresh, and development-optimized property defaults. Uses a two-classloader architecture: stable dependencies stay loaded while only your code reloads.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}><DevToolsDiagram /></div>
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ec4899', fontWeight: 600, fontSize: '0.95rem' }}>Setup</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>XML</span>
            </div>
            <SyntaxHighlighter code={`<!-- Add DevTools as optional dependency -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>  <!-- Not included in prod JAR -->
</dependency>

// DevTools auto-detects and enables:
// 1. Automatic restart on code changes
// 2. LiveReload server on port 35729
// 3. Development-friendly defaults:
//    - Template caching disabled
//    - H2 console enabled
//    - Detailed error pages shown`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ec4899', fontWeight: 600, fontSize: '0.95rem' }}>Configuration Options</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>YAML</span>
            </div>
            <SyntaxHighlighter code={`// application-dev.yml - DevTools configuration
// spring:
//   devtools:
//     restart:
//       enabled: true
//       additional-paths: src/main/java
//       exclude: static/**,public/**,templates/**
//       poll-interval: 1s
//       quiet-period: 400ms
//     livereload:
//       enabled: true
//       port: 35729
//     remote:
//       secret: mydev-secret  # For remote debugging

// Disable restart programmatically
// System.setProperty("spring.devtools.restart.enabled", "false");

// IntelliJ: Enable Build > Build Project Automatically
// Eclipse: Project > Build Automatically (enabled by default)`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#ec4899', fontWeight: 600, fontSize: '0.95rem' }}>Common Pitfall &mdash; @PostConstruct on Every Restart</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`// PITFALL: Expensive @PostConstruct runs on every restart
@Service
public class DataLoader {
    @PostConstruct
    public void init() {
        // BAD: Loads 10MB of data on every code change restart
        loadReferenceData();
    }
}

// FIX: Use ApplicationRunner with conditional loading
@Component
public class DataLoader implements ApplicationRunner {
    @Override
    public void run(ApplicationArguments args) {
        if (!isDataLoaded()) {
            loadReferenceData(); // Only loads when needed
        }
    }
}`} />
          </div>
        </div>
      )}

      {/* Config Properties Tab */}
      {activeSection === 'config-properties' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h2 style={{ color: '#14b8a6', marginBottom: '1rem', fontSize: '1.3rem' }}>Configuration Properties</h2>
            <p style={{ color: '#d1d5db', lineHeight: '1.8' }}>
              Type-safe externalized configuration enabling the same binary to work across environments. <strong style={{ color: '#5eead4' }}>@ConfigurationProperties</strong> binds external config to strongly-typed Java objects with validation. Clear precedence: command-line args &gt; env variables &gt; application.yml &gt; defaults.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}><ConfigPropertiesDiagram /></div>
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#14b8a6', fontWeight: 600, fontSize: '0.95rem' }}>Type-Safe Config with Validation</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Configuration
@ConfigurationProperties(prefix = "app")
@Validated
public class AppProperties {

    @NotBlank
    private String name;

    @Min(1) @Max(65535)
    private int port = 8080;

    private final Security security = new Security();

    public static class Security {
        @NotBlank
        private String jwtSecret;
        private Duration tokenExpiration = Duration.ofHours(24);
        // getters and setters
    }
    // getters and setters
}

// application.yml
// app:
//   name: MyService
//   port: 8080
//   security:
//     jwt-secret: \${JWT_SECRET}
//     token-expiration: 24h`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#14b8a6', fontWeight: 600, fontSize: '0.95rem' }}>Immutable Config with Records</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`// Immutable configuration with constructor binding
@ConfigurationProperties(prefix = "app.cache")
public record CacheProperties(
    @DefaultValue("true") boolean enabled,
    @DefaultValue("300s") Duration ttl,
    @DefaultValue("1000") int maxSize,
    List<String> cacheNames
) {}

// application.yml
// app:
//   cache:
//     enabled: true
//     ttl: 5m              # Duration parsing
//     max-size: 5000
//     cache-names:
//       - users
//       - products
//       - sessions

// Relaxed binding - all equivalent:
// app.cache.max-size    (kebab-case - recommended)
// app.cache.maxSize     (camelCase)
// APP_CACHE_MAX_SIZE    (env variable)
// app.cache.max_size    (underscore)`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#14b8a6', fontWeight: 600, fontSize: '0.95rem' }}>Feature Toggles</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@ConfigurationProperties(prefix = "app.features")
public class FeatureFlags {
    private boolean newCheckout = false;
    private boolean darkMode = false;
    private boolean betaApi = false;
    // getters and setters
}

@RestController
public class CheckoutController {

    @Autowired
    private FeatureFlags features;

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody Order order) {
        if (features.isNewCheckout()) {
            return newCheckoutFlow(order);
        }
        return legacyCheckoutFlow(order);
    }
}

// Toggle without code change or restart:
// APP_FEATURES_NEW_CHECKOUT=true docker restart myapp`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#14b8a6', fontWeight: 600, fontSize: '0.95rem' }}>Profile-Specific Configuration</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>YAML</span>
            </div>
            <SyntaxHighlighter code={`// application.yml (shared defaults)
// app:
//   name: MyService
//   cache:
//     ttl: 5m

// application-dev.yml
// app:
//   cache:
//     ttl: 10s   # Short TTL for development
// spring:
//   jpa:
//     show-sql: true

// application-prod.yml
// app:
//   cache:
//     ttl: 1h   # Long TTL for production
// spring:
//   jpa:
//     show-sql: false

// Activate profile:
// java -jar app.jar --spring.profiles.active=prod
// SPRING_PROFILES_ACTIVE=prod docker run myapp`} />
          </div>
        </div>
      )}

      {/* Annotations Tab */}
      {activeSection === 'annotations' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #374151' }}>
            <h2 style={{ color: '#6366f1', marginBottom: '1rem', fontSize: '1.3rem' }}>Spring Boot Annotations</h2>
            <p style={{ color: '#d1d5db', lineHeight: '1.8' }}>
              Declarative annotations for application bootstrapping, dependency injection, web endpoints, data access, and conditional configuration.
            </p>
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.95rem' }}>Core Application</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@SpringBootApplication
// Equivalent to all three:
// @Configuration
// @EnableAutoConfiguration
// @ComponentScan(basePackages = "com.myapp")
public class Application {
    public static void main(String[] args) {
        ApplicationContext ctx = SpringApplication.run(Application.class, args);
        // ctx now contains all auto-configured and scanned beans
    }
}

@Configuration
public class AppConfig {
    @Bean  // Explicitly declares a Spring-managed bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.95rem' }}>Stereotype Annotations</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`// Layered architecture with stereotype annotations
@RestController  // = @Controller + @ResponseBody
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired private OrderService orderService;

    @GetMapping("/{id}")
    public Order getOrder(@PathVariable Long id) {
        return orderService.findById(id);
    }
}

@Service  // Business logic layer
public class OrderService {
    @Autowired private OrderRepository orderRepo;

    @Transactional
    public Order findById(Long id) {
        return orderRepo.findById(id)
            .orElseThrow(() -> new OrderNotFoundException(id));
    }
}

@Repository  // Data access + exception translation
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomerId(Long customerId);
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.95rem' }}>Dependency Injection</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`// Constructor injection (recommended - immutable, testable)
@Service
public class NotificationService {

    private final EmailSender emailSender;
    private final SmsSender smsSender;

    // @Autowired optional with single constructor
    public NotificationService(EmailSender emailSender,
                                SmsSender smsSender) {
        this.emailSender = emailSender;
        this.smsSender = smsSender;
    }
}

// @Qualifier for multiple implementations
@Configuration
public class SenderConfig {
    @Bean @Primary
    public EmailSender defaultSender() { return new SmtpSender(); }

    @Bean("ses")
    public EmailSender sesSender() { return new AwsSesSender(); }
}

@Service
public class BulkMailService {
    public BulkMailService(@Qualifier("ses") EmailSender sender) {
        // Uses AWS SES instead of default SMTP
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.95rem' }}>Web/REST Annotations</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping                    // GET /api/users?page=0&size=20
    public Page<User> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return userService.findAll(PageRequest.of(page, size));
    }

    @GetMapping("/{id}")           // GET /api/users/42
    public User getById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @PostMapping                   // POST /api/users (JSON body)
    @ResponseStatus(HttpStatus.CREATED)
    public User create(@Valid @RequestBody CreateUserRequest request) {
        return userService.create(request);
    }

    @DeleteMapping("/{id}")        // DELETE /api/users/42
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.95rem' }}>JPA/Data Annotations</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @CreatedDate
    private LocalDateTime createdAt;
}

@Service
public class ProductService {
    @Transactional(readOnly = true) // Read-only optimizations
    public Product findById(Long id) {
        return repo.findById(id).orElseThrow();
    }

    @Transactional // Write transaction - rollback on exception
    public Product create(Product product) {
        return repo.save(product);
    }
}`} />
          </div>

          <div style={{ background: '#1e1e2e', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #374151', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.95rem' }}>Conditional Annotations</span>
              <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>Java</span>
            </div>
            <SyntaxHighlighter code={`// Profile-specific beans
@Configuration
public class StorageConfig {

    @Bean
    @Profile("dev")
    public FileStorage localStorage() {
        return new LocalFileStorage("/tmp/uploads");
    }

    @Bean
    @Profile("prod")
    public FileStorage s3Storage() {
        return new S3FileStorage("my-bucket");
    }
}

// Conditional auto-configuration
@Configuration
@ConditionalOnClass(RedisTemplate.class) // Only if Redis on classpath
public class CacheConfig {

    @Bean
    @ConditionalOnMissingBean(CacheManager.class)
    @ConditionalOnProperty(name = "app.cache.type", havingValue = "redis")
    public CacheManager redisCacheManager(RedisConnectionFactory cf) {
        return RedisCacheManager.builder(cf)
            .cacheDefaults(RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(30)))
            .build();
    }
}`} />
          </div>
        </div>
      )}

      </div>
  )
}

export default SpringBoot

import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import useVoiceConceptNavigation from '../../hooks/useVoiceConceptNavigation'

const FRAMEWORK_COLORS = {
  primary: '#4ade80',
  primaryHover: '#86efac',
  bg: 'rgba(16, 185, 129, 0.1)',
  border: 'rgba(16, 185, 129, 0.3)',
  arrow: '#10b981',
  hoverBg: 'rgba(16, 185, 129, 0.2)',
  topicBg: 'rgba(16, 185, 129, 0.2)'
}

// Background colors for subtopic descriptions
const SUBTOPIC_COLORS = [
  { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.3)' },
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// Simple syntax highlighter for Java code
const SyntaxHighlighter = ({ code }) => {
  const highlightJava = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '<')
      .replace(/>/g, '>')

    // Store protected content with placeholders
    const protectedContent = []
    let placeholder = 0

    // Protect comments first
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

    // Apply syntax highlighting to remaining code
    highlighted = highlighted
      // Keywords - purple
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null)\b/g, '<span style="color: #c586c0;">$1</span>')

      // Boolean and primitives - blue
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')

      // Types and classes - light green
      .replace(/\b(String|List|ArrayList|LinkedList|HashMap|TreeMap|HashSet|TreeSet|Map|Set|Queue|Deque|Collection|Arrays|Collections|Thread|Runnable|Executor|ExecutorService|CompletableFuture|Stream|Optional|Path|Files|Pattern|Matcher|StringBuilder|StringBuffer|Integer|Double|Float|Long|Short|Byte|Character|Boolean|Object|System|Math|Scanner|BufferedReader|FileReader|FileWriter|PrintWriter|InputStream|OutputStream|Exception|RuntimeException|IOException|SQLException|WeakReference|SoftReference|PhantomReference|ReferenceQueue)\b/g, '<span style="color: #4ec9b0;">$1</span>')

      // Annotations - yellow
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')

      // Numbers - light green
      .replace(/\b(\d+\.?\d*[fLdD]?)\b/g, '<span style="color: #b5cea8;">$1</span>')

      // Method calls - yellow
      .replace(/\b([a-z_]\w*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')

    // Restore protected content
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

// =============================================================================
// STARTUP-SEQUENCE DIAGRAMS
// =============================================================================

// Vertical numbered timeline shared by refresh() and Boot run() diagrams
const StepTimeline = ({ title, steps, highlight = [], accent = '#06b6d4' }) => {
  const top = 56, gap = 48, hi = new Set(highlight)
  const height = top + steps.length * gap + 10
  return (
    <svg viewBox={`0 0 820 ${height}`} style={{ width: '100%', maxWidth: '820px', height: 'auto' }}>
      <text x="410" y="28" textAnchor="middle" fill="#94a3b8" fontSize="15" fontWeight="bold">{title}</text>
      <line x1="44" y1={top - 6} x2="44" y2={top + (steps.length - 1) * gap + 6} stroke="#334155" strokeWidth="2" />
      {steps.map(([n, name, sub], i) => {
        const y = top + i * gap
        const on = hi.has(n)
        return (
          <g key={n}>
            {i < steps.length - 1 && (
              <line x1="44" y1={y + 16} x2="44" y2={y + gap - 16} stroke={accent} strokeWidth="2" markerEnd="url(#stArrow)" />
            )}
            <circle cx="44" cy={y} r="15" fill={on ? accent : '#1e293b'} stroke={on ? accent : '#475569'} strokeWidth="2" />
            <text x="44" y={y + 4} textAnchor="middle" fill={on ? '#0f172a' : '#cbd5e1'} fontSize="12" fontWeight="bold">{n}</text>
            <rect x="74" y={y - 17} width="724" height="34" rx="7" fill={on ? 'rgba(6,182,212,0.16)' : 'rgba(30,41,59,0.7)'} stroke={on ? accent : '#334155'} strokeWidth="1.5" />
            <text x="88" y={y - 1} fill="#e2e8f0" fontSize="13" fontWeight="600" fontFamily="monospace">{name}</text>
            <text x="88" y={y + 13} fill="#94a3b8" fontSize="11">{sub}</text>
          </g>
        )
      })}
      <defs>
        <marker id="stArrow" markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto">
          <path d="M1,1 L4,6 L7,1" fill="none" stroke={accent} strokeWidth="1.5" />
        </marker>
      </defs>
    </svg>
  )
}

const RefreshLifecycleDiagram = () => (
  <StepTimeline
    title="AbstractApplicationContext.refresh() — 12 steps"
    accent="#06b6d4"
    highlight={['5', '6', '11']}
    steps={[
      ['1', 'prepareRefresh()', 'set active flag, validate required properties'],
      ['2', 'obtainFreshBeanFactory()', 'create factory + LOAD all bean definitions (no instances yet)'],
      ['3', 'prepareBeanFactory()', 'configure factory, register built-in beans'],
      ['4', 'postProcessBeanFactory()', 'subclass hook (web contexts)'],
      ['5', 'invokeBeanFactoryPostProcessors()', 'modify DEFINITIONS · parse @Configuration · resolve @Value'],
      ['6', 'registerBeanPostProcessors()', 'register instance hooks (autowiring, @PostConstruct, AOP)'],
      ['7', 'initMessageSource()', 'i18n message handling'],
      ['8', 'initApplicationEventMulticaster()', 'event publishing mechanism'],
      ['9', 'onRefresh()', 'subclass hook — Boot starts the embedded web server'],
      ['10', 'registerListeners()', 'register ApplicationListener beans'],
      ['11', 'finishBeanFactoryInitialization()', 'INSTANTIATE all non-lazy singletons (your beans)'],
      ['12', 'finishRefresh()', 'start Lifecycle beans · publish ContextRefreshedEvent']
    ]}
  />
)

const BootRunDiagram = () => (
  <StepTimeline
    title="SpringApplication.run() — Boot startup"
    accent="#22c55e"
    highlight={['7', '9', '10']}
    steps={[
      ['1', 'create SpringApplication', 'deduce web type · load initializers & listeners'],
      ['2', 'starting()', 'run-listeners signal start'],
      ['3', 'prepare Environment', 'profiles · property sources · application.yml · args'],
      ['4', 'print banner', ''],
      ['5', 'create ApplicationContext', 'instance matching the web type'],
      ['6', 'prepare context', 'apply initializers · register primary sources'],
      ['7', 'refresh()', 'auto-configuration · create beans · start web server'],
      ['8', 'started()', 'publish ApplicationStartedEvent'],
      ['9', 'run Runners', 'ApplicationRunner / CommandLineRunner beans'],
      ['10', 'ready()', 'publish ApplicationReadyEvent — now serving']
    ]}
  />
)

// Horizontal snake flow for a single bean's creation
const BeanCreationDiagram = () => {
  const box = (x, y, w, title, sub, fill, stroke) => (
    <g>
      <rect x={x} y={y} width={w} height="54" rx="8" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <text x={x + w / 2} y={y + 22} textAnchor="middle" fill="#e2e8f0" fontSize="12.5" fontWeight="600">{title}</text>
      <text x={x + w / 2} y={y + 40} textAnchor="middle" fill="#94a3b8" fontSize="10.5">{sub}</text>
    </g>
  )
  const dim = { fill: 'rgba(30,41,59,0.8)', stroke: '#475569' }
  const proxy = { fill: 'rgba(245,158,11,0.18)', stroke: '#f59e0b' }
  const ready = { fill: 'rgba(34,197,94,0.18)', stroke: '#22c55e' }
  return (
    <svg viewBox="0 0 820 300" style={{ width: '100%', maxWidth: '820px', height: 'auto' }}>
      <defs>
        <marker id="bcArrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
          <path d="M1,1 L7,4.5 L1,8" fill="none" stroke="#64748b" strokeWidth="1.6" />
        </marker>
      </defs>
      <text x="410" y="26" textAnchor="middle" fill="#94a3b8" fontSize="15" fontWeight="bold">Single bean creation order</text>
      {/* Row 1 (left -> right) */}
      {box(20, 60, 178, '1 · Instantiate', 'constructor injection', dim.fill, dim.stroke)}
      {box(228, 60, 178, '2 · Populate', '@Autowired fields/setters', dim.fill, dim.stroke)}
      {box(436, 60, 178, '3 · Aware callbacks', 'BeanNameAware, *ContextAware', dim.fill, dim.stroke)}
      {box(644, 60, 156, '4 · BPP before', '@PostConstruct runs', dim.fill, dim.stroke)}
      <line x1="198" y1="87" x2="226" y2="87" stroke="#64748b" strokeWidth="1.8" markerEnd="url(#bcArrow)" />
      <line x1="406" y1="87" x2="434" y2="87" stroke="#64748b" strokeWidth="1.8" markerEnd="url(#bcArrow)" />
      <line x1="614" y1="87" x2="642" y2="87" stroke="#64748b" strokeWidth="1.8" markerEnd="url(#bcArrow)" />
      {/* Down connector */}
      <line x1="722" y1="114" x2="722" y2="160" stroke="#64748b" strokeWidth="1.8" markerEnd="url(#bcArrow)" />
      {/* Row 2 (right -> left) */}
      {box(644, 166, 156, '5 · Initialization', 'afterPropertiesSet / init-method', dim.fill, dim.stroke)}
      {box(416, 166, 198, '6 · BPP after', 'AOP / @Transactional PROXY created', proxy.fill, proxy.stroke)}
      {box(228, 166, 158, '7 · READY', 'cached singleton', ready.fill, ready.stroke)}
      <line x1="642" y1="193" x2="616" y2="193" stroke="#64748b" strokeWidth="1.8" markerEnd="url(#bcArrow)" />
      <line x1="414" y1="193" x2="388" y2="193" stroke="#64748b" strokeWidth="1.8" markerEnd="url(#bcArrow)" />
      <text x="410" y="270" textAnchor="middle" fill="#64748b" fontSize="11">Destruction (reverse): @PreDestroy → DisposableBean.destroy() → custom destroy-method</text>
    </svg>
  )
}

// Two-phase timeline: definitions vs instances
const PostProcessorDiagram = () => (
  <svg viewBox="0 0 820 250" style={{ width: '100%', maxWidth: '820px', height: 'auto' }}>
    <defs>
      <marker id="ppArrow" markerWidth="10" markerHeight="10" refX="6" refY="5" orient="auto">
        <path d="M1,1 L8,5 L1,9" fill="none" stroke="#64748b" strokeWidth="1.8" />
      </marker>
    </defs>
    <text x="410" y="26" textAnchor="middle" fill="#94a3b8" fontSize="15" fontWeight="bold">Post-processors: definitions vs instances</text>
    {/* Timeline arrow */}
    <line x1="30" y1="70" x2="790" y2="70" stroke="#475569" strokeWidth="2" markerEnd="url(#ppArrow)" />
    <text x="30" y="58" fill="#64748b" fontSize="11">context.refresh() timeline →</text>
    {/* Divider: instantiation begins */}
    <line x1="410" y1="50" x2="410" y2="210" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5 4" />
    <text x="410" y="228" textAnchor="middle" fill="#f59e0b" fontSize="11">singleton instantiation begins</text>
    {/* Left phase: definitions */}
    <text x="200" y="98" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">Phase 1 — bean DEFINITIONS loaded</text>
    <rect x="60" y="112" width="300" height="70" rx="10" fill="rgba(56,189,248,0.15)" stroke="#38bdf8" strokeWidth="1.5" />
    <text x="210" y="140" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="700" fontFamily="monospace">BeanFactoryPostProcessor</text>
    <text x="210" y="160" textAnchor="middle" fill="#94a3b8" fontSize="11">edits metadata / BeanDefinitions</text>
    <text x="210" y="174" textAnchor="middle" fill="#94a3b8" fontSize="11">@Configuration parsing, @Value resolution</text>
    {/* Right phase: instances */}
    <text x="610" y="98" textAnchor="middle" fill="#f472b6" fontSize="12" fontWeight="bold">Phase 2 — bean INSTANCES created</text>
    <rect x="460" y="112" width="300" height="70" rx="10" fill="rgba(244,114,182,0.15)" stroke="#f472b6" strokeWidth="1.5" />
    <text x="610" y="140" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="700" fontFamily="monospace">BeanPostProcessor</text>
    <text x="610" y="160" textAnchor="middle" fill="#94a3b8" fontSize="11">wraps each instance during init</text>
    <text x="610" y="174" textAnchor="middle" fill="#94a3b8" fontSize="11">@PostConstruct, AOP / @Transactional proxies</text>
  </svg>
)

// Small by default, expands to full size on hover
const HoverZoomDiagram = ({ children }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={hovered ? '' : 'Hover to enlarge'}
      style={{
        maxWidth: hovered ? '820px' : '340px',
        margin: '0 auto',
        transition: 'max-width 0.35s ease',
        cursor: hovered ? 'zoom-out' : 'zoom-in'
      }}
    >
      {children}
    </div>
  )
}

function Spring({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'core-container',
      name: 'Core Container',
      icon: '🌱',
      color: '#10b981',
      description: 'IoC container managing bean lifecycle, dependency injection, and configuration',
      details: [
        {
          name: 'Overview',
          explanation: `The Spring Core Container is the foundational IoC container that manages the complete lifecycle of application objects (beans), providing sophisticated dependency management and configuration capabilities.

How It Works:
- Container reads configuration metadata from XML files, Java annotations, or Java code configurations
- BeanFactory provides basic container functionality with lazy bean initialization
- ApplicationContext extends BeanFactory with enterprise features like eager initialization, internationalization, and event publication
- IoC principle inverts control flow - container injects dependencies rather than your code creating them

Key Features:
- Automatic dependency injection eliminating manual object creation and wiring
- Lifecycle management from bean instantiation through initialization to destruction
- Support for multiple configuration styles (annotations, Java config, XML)
- Component scanning for automatic bean discovery
- Profile-based configuration for environment-specific beans`,
          codeExample: `// Basic Spring Configuration with Java Config
@Configuration
public class AppConfig {

  @Bean
  public UserService userService() {
    return new UserServiceImpl(userRepository());
  }

  @Bean
  public UserRepository userRepository() {
    return new JpaUserRepository();
  }
}

// Using ApplicationContext to Bootstrap Application
public class Application {
  public static void main(String[] args) {
    ApplicationContext context =
      new AnnotationConfigApplicationContext(AppConfig.class);

    UserService userService = context.getBean(UserService.class);
    userService.processUser();
  }
}`
        },
        {
          name: 'Best Practices',
          explanation: `Best Practices:
- Prefer annotation-based configuration (@Configuration, @Bean) over XML for type safety and refactoring support
- Use constructor injection for required dependencies to ensure complete bean initialization
- Leverage component scanning (@ComponentScan) for automatic bean discovery
- Organize beans with profiles for environment-specific configurations
- Use @Lazy judiciously for expensive-to-initialize beans that might not be needed

Common Pitfalls:
- Creating ApplicationContext instances manually instead of letting Spring Boot manage it
- Mixing configuration styles excessively (XML, annotations, Java config) making code harder to understand
- Injecting prototype-scoped beans into singletons without proper handling, resulting in singleton behavior
- Circular dependencies complicating initialization and requiring setter injection workarounds

When to Use:
The Core Container is fundamental to every Spring application - from simple utilities to complex enterprise systems requiring sophisticated dependency management and lifecycle control.`
        }
      ]
    },
    {
      id: 'dependency-injection',
      name: 'Dependency Injection',
      icon: '💉',
      color: '#3b82f6',
      description: 'Core design pattern for decoupling components through IoC',
      details: [
        {
          name: 'Overview',
          explanation: `Dependency Injection is Spring's core design pattern that implements Inversion of Control by having the container inject dependencies into objects rather than objects creating their own dependencies.

How It Works:
- Spring container creates objects and injects their dependencies automatically
- Constructor injection provides dependencies through class constructors (recommended)
- Setter injection sets dependencies through setter methods after object creation
- Field injection uses @Autowired to inject directly into fields (not recommended)
- @Autowired annotation tells Spring to automatically resolve and inject dependencies by type

Key Features:
- Decouples code from specific implementations enabling easy swapping
- Dramatically improves testability through mock/stub injection
- Promotes single responsibility by removing dependency lifecycle management
- Supports @Qualifier for disambiguating multiple beans of same type
- Enables injection of collections, Optional dependencies, and property values with @Value`
        },
        {
          name: 'Injection Types',
          explanation: `Constructor Injection (Recommended):
- Dependencies are provided through class constructor
- Makes dependencies explicit and enables immutability with final fields
- Best for required dependencies

Setter Injection:
- Dependencies set through setter methods after object creation
- Use for optional dependencies with reasonable defaults

Field Injection (Not Recommended):
- Uses @Autowired directly on fields
- Makes testing harder and hides dependencies
- Avoid in production code`,
          codeExample: `// Constructor injection (recommended)
@Service
public class OrderService {
  private final OrderRepository orderRepository;
  private final PaymentService paymentService;

  @Autowired
  public OrderService(OrderRepository orderRepository,
                      PaymentService paymentService) {
    this.orderRepository = orderRepository;
    this.paymentService = paymentService;
  }
}

// Field injection (not recommended)
@Service
public class NotificationService {
  @Autowired
  private EmailSender emailSender;
}

// Setter injection
@Service
public class ReportService {
  private DataSource dataSource;

  @Autowired
  public void setDataSource(DataSource dataSource) {
    this.dataSource = dataSource;
  }
}`
        },
        {
          name: 'Best Practices',
          explanation: `Best Practices:
- Prefer constructor injection for required dependencies - makes them explicit and enables immutability with final fields
- Use setter injection only for optional dependencies with reasonable defaults
- Avoid field injection as it makes testing harder and hides dependencies
- Use @Qualifier or @Primary to resolve ambiguity when multiple beans of same type exist
- Keep constructors focused on dependency injection, avoiding complex logic

Common Pitfalls:
- Field injection makes unit testing difficult without reflection - use constructor injection instead
- Constructor with more than 5 parameters indicates violation of single responsibility principle
- Injecting implementation classes instead of interfaces reduces flexibility and testability
- Not using @Qualifier when multiple beans exist causes NoUniqueBeanDefinitionException
- Circular dependencies indicate design problems - refactor to break the cycle`
        }
      ]
    },
    {
      id: 'bean-lifecycle',
      name: 'Bean Lifecycle',
      icon: '🔄',
      color: '#8b5cf6',
      description: 'Managing bean creation, initialization, and destruction',
      details: [
        {
          name: 'Overview',
          explanation: `Spring provides comprehensive bean lifecycle management with hooks to execute custom logic at various points from bean creation to destruction, essential for proper resource initialization and cleanup.

How It Works:
- Lifecycle phases: instantiation -> dependency injection -> initialization -> ready for use -> destruction
- @PostConstruct annotation executes after dependency injection (JSR-250 standard, preferred)
- @PreDestroy annotation executes before bean destruction for cleanup
- Alternative: InitializingBean/DisposableBean interfaces or custom init/destroy methods in @Bean
- Awareness interfaces (BeanNameAware, ApplicationContextAware) provide container access

Key Features:
- Multiple initialization mechanisms: @PostConstruct, InitializingBean, custom init-method
- Multiple destruction mechanisms: @PreDestroy, DisposableBean, custom destroy-method
- Initialization order follows dependency graph automatically
- Support for lazy initialization with @Lazy annotation
- Explicit ordering control with @DependsOn annotation`
        },
        {
          name: 'Lifecycle Methods',
          explanation: `Real-World Use Cases:
- Initialization: Database connection pools, message broker connections, cache warming, background threads, service discovery registration
- Destruction: Closing database connections gracefully, flushing caches, completing pending operations, releasing file handles
- Resource management: Thread pools, network connections, external service clients
- Startup configuration: Loading external configuration, validating environment`,
          codeExample: `// Lifecycle with @PostConstruct and @PreDestroy
@Component
public class DatabaseConnection {

  @PostConstruct
  public void init() {
    System.out.println("Initializing database connection");
    // Connect to database
  }

  @PreDestroy
  public void cleanup() {
    System.out.println("Closing database connection");
    // Close connection
  }
}

// Using interfaces
@Component
public class CacheManager implements InitializingBean, DisposableBean {

  @Override
  public void afterPropertiesSet() throws Exception {
    System.out.println("Cache warming up");
  }

  @Override
  public void destroy() throws Exception {
    System.out.println("Clearing cache");
  }
}

// Custom lifecycle methods
@Configuration
public class LifecycleConfig {

  @Bean(initMethod = "start", destroyMethod = "stop")
  public ConnectionPool connectionPool() {
    return new HikariConnectionPool();
  }
}`
        },
        {
          name: 'Best Practices',
          explanation: `Best Practices:
- Prefer @PostConstruct/@PreDestroy over interfaces for standard approach with less coupling
- Keep initialization logic idempotent to handle container restarts safely
- Ensure cleanup logic handles exceptions gracefully to prevent cascade failures
- Use @Lazy for expensive-to-create beans that might not be needed
- Document initialization requirements and dependencies clearly

Common Pitfalls:
- Performing blocking I/O or expensive operations in constructors instead of @PostConstruct
- Forgetting @PreDestroy cleanup leading to resource leaks (connections, file handles)
- Assuming specific initialization order without @DependsOn configuration
- Not handling exceptions in lifecycle methods preventing startup/shutdown
- Using InitializingBean/DisposableBean interfaces unnecessarily, coupling code to Spring`
        }
      ]
    },
    {
      id: 'startup-sequence',
      name: 'Startup Sequence',
      icon: '⚙️',
      color: '#06b6d4',
      description: 'What actually happens when Spring loads: context refresh, post-processors, bean creation order, and Spring Boot run()',
      details: [
        {
          name: 'Overview',
          diagram: PostProcessorDiagram,
          explanation: `When a Spring application "loads," the ApplicationContext is built and refreshed in a fixed, well-defined order. Understanding this sequence explains when your beans are created, when configuration is applied, and where you can hook in.

The big picture (in order):
1. Bootstrap - SpringApplication.run() (Boot) or you construct an ApplicationContext directly.
2. Environment is prepared - property sources, profiles, and command-line args are resolved.
3. Bean definitions are loaded - component scanning, @Configuration parsing, and (in Boot) auto-configuration register BeanDefinitions. Nothing is instantiated yet; these are just blueprints.
4. BeanFactoryPostProcessors run - they can modify bean DEFINITIONS before any bean is created (e.g. property placeholder resolution, @Configuration enhancement).
5. BeanPostProcessors are registered - they will wrap/modify bean INSTANCES as they are created.
6. Non-lazy singletons are instantiated - in dependency order, each goes through the full creation lifecycle.
7. Context finishes - lifecycle beans start, ContextRefreshedEvent is published.
8. (Boot) ApplicationRunner / CommandLineRunner beans execute, then the app is ready.

Key distinction:
- BeanFactoryPostProcessor = operates on definitions/metadata, BEFORE instantiation.
- BeanPostProcessor = operates on instances, DURING initialization.`,
          codeExample: `// Two entry points produce the same refresh lifecycle:

// 1) Spring Boot - the common case
@SpringBootApplication
public class MyApp {
  public static void main(String[] args) {
    SpringApplication.run(MyApp.class, args);  // builds + refreshes context
  }
}

// 2) Plain Spring - constructing a context refreshes it immediately
ApplicationContext ctx =
    new AnnotationConfigApplicationContext(AppConfig.class);

// Observe ordering with an event listener:
@Component
class StartupLogger {
  @EventListener
  public void onReady(ApplicationReadyEvent e) {
    System.out.println("Context fully started and ready");
  }
}`
        },
        {
          name: 'ApplicationContext.refresh()',
          diagram: RefreshLifecycleDiagram,
          explanation: `At the heart of startup is AbstractApplicationContext.refresh() - a single synchronized method that runs these steps in this exact order:

1. prepareRefresh() - set start time, active flag; validate required properties.
2. obtainFreshBeanFactory() - create the BeanFactory and LOAD all bean definitions (scanning, @Configuration, imports). Still no instances.
3. prepareBeanFactory() - configure the factory: register the bean expression resolver, ApplicationContextAwareProcessor, environment beans, etc.
4. postProcessBeanFactory() - subclass hook to register extra BeanPostProcessors (web contexts use this).
5. invokeBeanFactoryPostProcessors() - run all BeanFactoryPostProcessors and BeanDefinitionRegistryPostProcessors. This is where @Configuration classes are parsed (ConfigurationClassPostProcessor) and @Value placeholders are resolved against definitions.
6. registerBeanPostProcessors() - find and register all BeanPostProcessors so they can wrap beans created later (AutowiredAnnotationBeanPostProcessor, CommonAnnotationBeanPostProcessor for @PostConstruct, AOP's AnnotationAwareAspectJAutoProxyCreator).
7. initMessageSource() - set up i18n message handling.
8. initApplicationEventMulticaster() - set up the event publishing mechanism.
9. onRefresh() - subclass hook (e.g. Boot creates/starts the embedded web server here).
10. registerListeners() - register ApplicationListener beans.
11. finishBeanFactoryInitialization() - instantiate ALL remaining non-lazy singletons (this is the big one - your beans get created here).
12. finishRefresh() - start Lifecycle beans, publish ContextRefreshedEvent, clear caches.

If anything throws, the context destroys already-created singletons and rethrows - startup fails fast.`,
          codeExample: `// Simplified from AbstractApplicationContext (Spring framework)
public void refresh() throws BeansException {
  synchronized (this.startupShutdownMonitor) {
    prepareRefresh();
    ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory();
    prepareBeanFactory(beanFactory);
    try {
      postProcessBeanFactory(beanFactory);
      invokeBeanFactoryPostProcessors(beanFactory);   // modify DEFINITIONS
      registerBeanPostProcessors(beanFactory);        // register instance hooks
      initMessageSource();
      initApplicationEventMulticaster();
      onRefresh();                                    // e.g. start web server
      registerListeners();
      finishBeanFactoryInitialization(beanFactory);   // create singletons
      finishRefresh();                                // publish events, start
    } catch (BeansException ex) {
      destroyBeans();
      cancelRefresh(ex);
      throw ex;
    }
  }
}`
        },
        {
          name: 'Single Bean Creation Order',
          diagram: BeanCreationDiagram,
          explanation: `During step 11 (finishBeanFactoryInitialization), each non-lazy singleton is created in dependency order via getBean -> doGetBean -> createBean. For one bean, the precise order is:

1. Resolve & instantiate - choose a constructor (resolving constructor-injected dependencies first), call it. The raw instance now exists.
2. Populate properties - inject @Autowired fields/setters (AutowiredAnnotationBeanPostProcessor). Dependencies are created on demand if not yet present.
3. Aware callbacks - BeanNameAware, BeanFactoryAware, then ApplicationContextAware (via ApplicationContextAwareProcessor).
4. BeanPostProcessor.postProcessBeforeInitialization() - runs for every BPP. This is where @PostConstruct executes (CommonAnnotationBeanPostProcessor).
5. Initialization - afterPropertiesSet() (InitializingBean), then the custom init-method.
6. BeanPostProcessor.postProcessAfterInitialization() - runs for every BPP. This is where AOP proxies are created (the returned object may be a PROXY wrapping your bean), and where @Async/@Transactional wrappers are applied.
7. Bean is fully initialized and cached as a singleton, ready for use.

Destruction (on context close) runs in reverse: @PreDestroy -> DisposableBean.destroy() -> custom destroy-method.

This is why @Transactional and AOP only work through the proxy returned in step 6 - self-invocation calls the raw 'this', bypassing the proxy.`,
          codeExample: `@Component
public class ReportService implements ApplicationContextAware {

  private final DataSource ds;

  // (1) constructor injection - resolved & called first
  public ReportService(DataSource ds) { this.ds = ds; }

  // (2) field injection happens after construction
  @Autowired private Clock clock;

  // (3) Aware callback
  @Override
  public void setApplicationContext(ApplicationContext ctx) { /* ... */ }

  // (4) @PostConstruct - via BeanPostProcessor BEFORE init
  @PostConstruct
  public void init() { /* warm caches, validate config */ }

  // (5) then afterPropertiesSet()/init-method if present
  // (6) then AOP/@Transactional proxy is applied around the bean
}

// Order of hooks for one bean:
// constructor -> @Autowired -> *Aware -> @PostConstruct
//   -> afterPropertiesSet -> init-method -> (proxy) -> READY`
        },
        {
          name: 'Spring Boot run() Sequence',
          diagram: BootRunDiagram,
          explanation: `SpringApplication.run() wraps the refresh with Boot-specific startup steps, all firing SpringApplicationRunListener events you can observe:

1. Create SpringApplication - deduce the web application type (SERVLET, REACTIVE, or NONE) from the classpath; load ApplicationContextInitializers and ApplicationListeners from spring.factories / META-INF/spring.
2. starting() - run listeners signal start.
3. Prepare Environment - build the Environment, bind command-line args and property sources, activate profiles; fire environmentPrepared(). application.properties / application.yml are loaded here.
4. Print the banner.
5. Create the ApplicationContext - instance matching the web type (e.g. AnnotationConfigServletWebServerApplicationContext).
6. Prepare the context - apply initializers, register the primary source/bean definitions; fire contextPrepared() and contextLoaded().
7. refresh() - the standard ApplicationContext refresh runs (loads definitions, runs auto-configuration via @EnableAutoConfiguration, creates beans, starts the embedded web server in onRefresh()).
8. afterRefresh() + started() - context is refreshed; publish ApplicationStartedEvent.
9. Run ApplicationRunner and CommandLineRunner beans - your post-startup code.
10. ready() - publish ApplicationReadyEvent; the application is now serving.

Auto-configuration is the Boot-specific magic that happens inside step 7: @SpringBootApplication -> @EnableAutoConfiguration imports AutoConfiguration classes, each guarded by @ConditionalOnClass / @ConditionalOnMissingBean so beans are only created when relevant and not already defined.`,
          codeExample: `@SpringBootApplication   // = @Configuration + @ComponentScan + @EnableAutoConfiguration
public class StoreApp {
  public static void main(String[] args) {
    SpringApplication.run(StoreApp.class, args);
  }
}

// Hook into the post-startup phase:
@Component
public class DataSeeder implements CommandLineRunner {
  private final ProductRepository repo;
  public DataSeeder(ProductRepository repo) { this.repo = repo; }

  @Override
  public void run(String... args) {
    // runs AFTER the context is refreshed and beans are ready (step 9)
    if (repo.count() == 0) repo.saveAll(defaultProducts());
  }
}

// Observe the lifecycle via events:
@Component
class Lifecycle {
  @EventListener(ApplicationReadyEvent.class)
  void ready() { System.out.println("Serving requests now"); }
}

// Customize startup before refresh:
//   new SpringApplicationBuilder(StoreApp.class)
//       .web(WebApplicationType.SERVLET)
//       .listeners(event -> { /* ... */ })
//       .run(args);`
        }
      ]
    },
    {
      id: 'aop-support',
      name: 'AOP Support',
      icon: '🎯',
      color: '#f59e0b',
      description: 'Aspect-Oriented Programming for cross-cutting concerns',
      details: [
        {
          name: 'Overview',
          explanation: `Aspect-Oriented Programming modularizes cross-cutting concerns (logging, security, transactions) into reusable aspects, keeping business logic clean by separating concerns that cut across multiple layers.

How It Works:
- Spring AOP uses proxy-based approach with JDK dynamic proxies (interfaces) or CGLIB (classes)
- @Aspect annotation defines aspects containing advice methods
- Advice types: @Before, @After, @AfterReturning, @AfterThrowing, @Around
- Pointcut expressions select which methods advice applies to: execution(), within(), @annotation()
- Proxy intercepts method calls, executes advice, then proceeds to actual method

Key Features:
- Declarative cross-cutting concern management without code duplication
- Rich pointcut expression language for precise method selection
- Multiple advice types for different interception points
- Support for aspect ordering with @Order when multiple aspects apply
- Built-in support for transactions (@Transactional) and security (@PreAuthorize)`
        },
        {
          name: 'Advice Types',
          explanation: `Real-World Use Cases:
- Logging: Method entry/exit, parameters, and execution time across service layers
- Performance monitoring: Measuring execution time and collecting metrics
- Security: Implementing authorization checks and authentication
- Transaction management: Declarative transaction boundaries
- Caching: Automatic caching of method results
- Auditing: Recording changes to sensitive data
- Rate limiting: Controlling API call frequency`,
          codeExample: `@Aspect
@Component
public class LoggingAspect {

  @Before("execution(* com.example.service.*.*(..))")
  public void logBefore(JoinPoint joinPoint) {
    System.out.println("Before: " + joinPoint.getSignature().getName());
  }

  @AfterReturning(
    pointcut = "execution(* com.example.service.*.*(..))",
    returning = "result")
  public void logAfterReturning(JoinPoint joinPoint, Object result) {
    System.out.println("After returning: " + result);
  }

  @Around("@annotation(Transactional)")
  public Object logExecutionTime(ProceedingJoinPoint joinPoint)
      throws Throwable {
    long start = System.currentTimeMillis();
    Object proceed = joinPoint.proceed();
    long executionTime = System.currentTimeMillis() - start;
    System.out.println(joinPoint.getSignature() +
                       " executed in " + executionTime + "ms");
    return proceed;
  }
}`
        },
        {
          name: 'How Spring Uses AOP Internally',
          explanation: `Spring itself relies heavily on AOP to power many of its core features. When you use these annotations, Spring creates proxies behind the scenes that wrap your beans with aspect-like behavior:

@Transactional - Transaction Management:
- Spring creates a proxy around your bean using TransactionInterceptor
- The proxy opens a transaction before the method, commits on success, and rolls back on exception
- This is why @Transactional doesn't work on private methods or self-invocation - the call bypasses the proxy

@Cacheable / @CacheEvict / @CachePut - Caching:
- CacheInterceptor wraps methods to check the cache before execution
- On cache hit, the actual method is never invoked - the proxy returns the cached result directly

@Async - Asynchronous Execution:
- AsyncAnnotationBeanPostProcessor creates a proxy that submits the method call to a TaskExecutor
- The caller gets a Future/CompletableFuture immediately while the method runs on a different thread

@PreAuthorize / @Secured - Security:
- Spring Security's MethodSecurityInterceptor uses AOP to check authorization before method execution
- Evaluates SpEL expressions or role checks and throws AccessDeniedException if unauthorized

@Retryable (Spring Retry):
- RetryOperationsInterceptor wraps the method call in a retry loop
- Catches specified exceptions and re-executes with configurable backoff

@Validated - Method Validation:
- MethodValidationInterceptor validates method parameters and return values using Bean Validation
- Throws ConstraintViolationException on validation failures

Why This Matters:
- All proxy-based features share the same limitations: no private methods, no self-invocation, no final classes (with CGLIB)
- Understanding that these are AOP proxies explains why calling this.save() from within the same bean skips @Transactional
- When debugging, the proxy is visible in stack traces as $$EnhancerBySpringCGLIB or $Proxy`,
          codeExample: `// These annotations ALL work through AOP proxies:

@Service
public class OrderService {

  // Spring creates a TransactionInterceptor proxy
  @Transactional
  public Order createOrder(OrderRequest request) {
    Order order = orderRepository.save(new Order(request));
    inventoryService.reserve(order.getItems());
    return order;
  }

  // CacheInterceptor proxy - skips method on cache hit
  @Cacheable(value = "orders", key = "#id")
  public Order getOrder(Long id) {
    return orderRepository.findById(id).orElseThrow();
  }

  // AsyncAnnotationInterceptor proxy - runs on separate thread
  @Async
  public CompletableFuture<Void> sendConfirmation(Order order) {
    emailService.send(order.getCustomerEmail(), "Order Confirmed");
    return CompletableFuture.completedFuture(null);
  }

  // MethodSecurityInterceptor proxy - checks access
  @PreAuthorize("hasRole('ADMIN')")
  public void cancelOrder(Long orderId) {
    orderRepository.deleteById(orderId);
  }

  // RetryOperationsInterceptor proxy - retries on failure
  @Retryable(value = RuntimeException.class, maxAttempts = 3,
             backoff = @Backoff(delay = 1000))
  public PaymentResult processPayment(Payment payment) {
    return paymentGateway.charge(payment);
  }
}

// COMMON PITFALL: Self-invocation bypasses ALL proxies
@Service
public class ReportService {

  @Transactional  // THIS WON'T WORK when called from generate()
  public void save(Report report) {
    reportRepository.save(report);
  }

  public void generate() {
    Report report = buildReport();
    this.save(report);  // Direct call - bypasses proxy!
    // Fix: inject self or use ApplicationContext.getBean()
  }
}`
        },
        {
          name: 'Best Practices',
          explanation: `Best Practices:
- Keep aspects focused on single concerns (separate logging, security, transaction aspects)
- Use appropriate advice types - prefer @Before/@After over @Around when possible
- Make pointcuts precise to avoid unintended method interception
- Use annotation-based pointcuts (@Loggable, @Audited) for clearer intent
- Document aspect behavior clearly as it's less visible than direct method calls
- Test aspects independently from business logic

Common Pitfalls:
- Aspects don't work on private methods or final classes due to CGLIB limitations
- Self-invocation bypasses proxy and aspects - refactor to call through another bean
- Forgetting @EnableAspectJAutoProxy in configuration disables AOP
- Overly broad pointcuts intercepting too many methods, impacting performance
- Forgetting ProceedingJoinPoint.proceed() in @Around advice prevents method execution
- Not handling exceptions in aspects, breaking application flow`
        }
      ]
    },
    {
      id: 'transaction-management',
      name: 'Transaction Management',
      icon: '💰',
      color: '#ec4899',
      description: 'Declarative and programmatic transaction handling',
      details: [
        {
          name: 'Overview',
          explanation: `Spring's transaction management provides a consistent programming model across different transaction APIs (JDBC, JPA, Hibernate, JTA), abstracting complexity and enabling focus on business logic through declarative or programmatic approaches.

How It Works:
- @Transactional annotation triggers proxy creation managing transaction lifecycle
- Proxy starts transaction before method, commits on success, rolls back on exception
- Propagation levels define how transactions relate: REQUIRED, REQUIRES_NEW, MANDATORY, SUPPORTS
- Isolation levels control concurrent visibility: READ_UNCOMMITTED, READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE
- Rollback rules specify which exceptions trigger rollback (runtime exceptions by default)

Key Features:
- Declarative transaction management separating transaction logic from business logic
- Consistent API across JDBC, JPA, Hibernate, JTA, JMS
- Configurable propagation, isolation, timeout, and read-only optimization
- Rollback rule customization with rollbackFor and noRollbackFor
- Programmatic transaction support with TransactionTemplate for complex scenarios`
        },
        {
          name: 'Declarative Transactions',
          explanation: `Real-World Use Cases:
- Money transfers: Ensuring atomic debit and credit operations
- Order processing: Spanning inventory updates, order creation, payment processing
- Batch operations: Rolling back all changes if any operation fails
- Event-driven systems: Publishing messages only if database changes succeed
- Audit logging: Using REQUIRES_NEW to persist logs even if main transaction rolls back`,
          codeExample: `@Service
public class TransferService {

  @Autowired
  private AccountRepository accountRepository;

  @Transactional(propagation = Propagation.REQUIRED,
                 isolation = Isolation.READ_COMMITTED,
                 rollbackFor = Exception.class)
  public void transferMoney(Long fromId, Long toId, BigDecimal amount) {
    Account from = accountRepository.findById(fromId)
      .orElseThrow(() -> new AccountNotFoundException());
    Account to = accountRepository.findById(toId)
      .orElseThrow(() -> new AccountNotFoundException());

    from.withdraw(amount);
    to.deposit(amount);

    accountRepository.save(from);
    accountRepository.save(to);
  }
}

// Programmatic transaction
@Service
public class BatchProcessor {

  @Autowired
  private TransactionTemplate transactionTemplate;

  public void processBatch(List<Item> items) {
    transactionTemplate.execute(status -> {
      try {
        items.forEach(this::processItem);
        return null;
      } catch (Exception e) {
        status.setRollbackOnly();
        throw e;
      }
    });
  }
}`
        },
        {
          name: 'Propagation Behaviors',
          explanation: `Propagation defines how a transactional method participates in an existing transaction (or starts its own) when called from another transactional context. It is set via @Transactional(propagation = Propagation.XXX); the default is REQUIRED.

The 7 propagation behaviors:
- REQUIRED (default): Join the current transaction if one exists, otherwise start a new one. The common choice for business logic - everything commits or rolls back together.
- REQUIRES_NEW: Always start a NEW transaction, suspending the current one until the new one completes. The new transaction commits/rolls back independently. Use for audit logs that must persist even if the caller rolls back.
- NESTED: Run within a nested transaction using a JDBC savepoint if a current transaction exists; otherwise behaves like REQUIRED. The inner work can roll back to the savepoint without aborting the outer transaction. Requires a savepoint-capable DataSource.
- SUPPORTS: Join the current transaction if one exists; otherwise run non-transactionally. Use for read methods that work either way.
- NOT_SUPPORTED: Suspend any current transaction and run non-transactionally. Use for long-running, non-critical work you do not want holding locks.
- MANDATORY: Must run inside an existing transaction; throw IllegalTransactionStateException if none exists. Enforces that a caller already opened a transaction.
- NEVER: Must NOT run inside a transaction; throw an exception if one exists.

Key point: REQUIRES_NEW and NOT_SUPPORTED actually SUSPEND the outer transaction (the transaction manager must support suspension). NESTED uses savepoints, so it shares the same physical connection as the outer transaction.`,
          codeExample: `@Service
public class OrderService {

  @Autowired private PaymentService payment;
  @Autowired private AuditService audit;

  // REQUIRED (default): inventory + order commit together
  @Transactional
  public void placeOrder(Order order) {
    reserveInventory(order);   // joins this transaction
    payment.charge(order);     // joins this transaction
    audit.log("order placed"); // REQUIRES_NEW - see below
  }
}

@Service
public class AuditService {

  // REQUIRES_NEW: log survives even if placeOrder() rolls back
  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public void log(String message) {
    auditRepository.save(new AuditEntry(message));
  }
}

@Service
public class LineItemService {

  // NESTED: a bad line item rolls back to the savepoint,
  // the rest of the order can still commit
  @Transactional(propagation = Propagation.NESTED)
  public void addLineItem(LineItem item) {
    lineItemRepository.save(item);
  }
}

// MANDATORY: caller MUST already be in a transaction
@Transactional(propagation = Propagation.MANDATORY)
public void appendToBatch(Item item) { ... }

// NEVER: fails fast if called inside a transaction
@Transactional(propagation = Propagation.NEVER)
public Report buildReport() { ... }`
        },
        {
          name: 'Isolation Levels',
          explanation: `Isolation controls how concurrent transactions see each other's uncommitted/committed changes, trading consistency against concurrency. Set via @Transactional(isolation = Isolation.XXX). The default delegates to the underlying database (often READ_COMMITTED for PostgreSQL/Oracle, REPEATABLE_READ for MySQL InnoDB).

The concurrency anomalies isolation prevents:
- Dirty read: reading another transaction's UNCOMMITTED change that may be rolled back.
- Non-repeatable read: re-reading a row returns different values because another transaction committed an UPDATE in between.
- Phantom read: re-running a range query returns new rows because another transaction committed an INSERT in between.

The levels (weakest to strongest):
- READ_UNCOMMITTED: allows dirty, non-repeatable, and phantom reads. Highest concurrency, least safe - rarely used.
- READ_COMMITTED: prevents dirty reads; non-repeatable and phantom reads still possible. The common production default.
- REPEATABLE_READ: prevents dirty and non-repeatable reads; phantoms may still occur (though InnoDB largely prevents them via next-key locks).
- SERIALIZABLE: prevents all three; transactions behave as if executed one at a time. Strongest and safest, but lowest concurrency and most deadlock-prone.

Higher isolation = stronger guarantees but more locking/contention. Choose the weakest level that still preserves correctness for your use case.`,
          codeExample: `@Service
public class InventoryService {

  // READ_COMMITTED: never see uncommitted stock changes
  @Transactional(isolation = Isolation.READ_COMMITTED)
  public int availableStock(Long productId) {
    return stockRepository.countAvailable(productId);
  }

  // REPEATABLE_READ: the same row reads consistently for the
  // whole transaction (no non-repeatable reads)
  @Transactional(isolation = Isolation.REPEATABLE_READ)
  public void reconcile(Long productId) {
    int before = stockRepository.countAvailable(productId);
    // ... business logic ...
    int after  = stockRepository.countAvailable(productId);
    // before == after, even if other tx committed updates
  }

  // SERIALIZABLE: strongest - prevents phantom reads too,
  // at the cost of concurrency. Use for critical invariants.
  @Transactional(isolation = Isolation.SERIALIZABLE)
  public void enforceStockLimit(Long productId, int max) {
    if (stockRepository.countAvailable(productId) < max) {
      stockRepository.addStock(productId, 1);
    }
  }
}

// Anomaly prevention by level:
//                     dirty   non-repeatable   phantom
// READ_UNCOMMITTED      yes         yes           yes
// READ_COMMITTED        no          yes           yes
// REPEATABLE_READ       no          no            maybe
// SERIALIZABLE          no          no            no`
        },
        {
          name: 'Rollback Rules',
          explanation: `Rollback rules decide which exceptions cause a transaction to roll back. By default Spring rolls back ONLY on unchecked exceptions (RuntimeException and Error) and commits on checked exceptions (e.g. IOException, SQLException). This surprises many developers.

Customizing rollback behavior:
- rollbackFor = SomeCheckedException.class - also roll back on the listed checked exceptions.
- noRollbackFor = SomeRuntimeException.class - commit (do NOT roll back) even though an unchecked exception was thrown.
- You can pass class arrays to cover multiple exception types.

Programmatic control:
- TransactionAspectSupport.currentTransactionStatus().setRollbackOnly() forces a rollback without throwing.
- Once a transaction is marked rollback-only, any attempt to commit it throws UnexpectedRollbackException.

Critical gotchas:
- Catching an exception and NOT rethrowing it means Spring never sees it, so no rollback happens - the transaction commits.
- In a REQUIRED inner method, throwing an exception marks the WHOLE shared transaction rollback-only; the outer method then fails with UnexpectedRollbackException even if it catches the inner exception. Use REQUIRES_NEW for truly independent units.`,
          codeExample: `@Service
public class BillingService {

  // Default: rolls back on RuntimeException/Error,
  // but NOT on checked exceptions like InvoiceException
  @Transactional
  public void chargeDefault(Invoice inv) throws InvoiceException {
    save(inv);
    if (inv.isInvalid()) throw new InvoiceException(); // COMMITS! (checked)
  }

  // Roll back on the checked exception too
  @Transactional(rollbackFor = InvoiceException.class)
  public void charge(Invoice inv) throws InvoiceException {
    save(inv);
    if (inv.isInvalid()) throw new InvoiceException(); // now rolls back
  }

  // Do NOT roll back for a specific runtime exception
  @Transactional(noRollbackFor = NotifyException.class)
  public void chargeAndNotify(Invoice inv) {
    save(inv);
    notifyUser(inv);  // if this throws NotifyException, invoice still commits
  }

  // Programmatic rollback without throwing
  @Transactional
  public void process(Invoice inv) {
    save(inv);
    if (inv.needsReview()) {
      TransactionAspectSupport.currentTransactionStatus()
                              .setRollbackOnly();
    }
  }
}`
        },
        {
          name: 'Best Practices',
          explanation: `Best Practices:
- Apply @Transactional at service layer, not repositories or controllers
- Keep transactions short to minimize lock duration and improve scalability
- Use read-only transactions for queries to enable database optimizations
- Be explicit about rollback rules with rollbackFor for checked exceptions
- Use appropriate propagation: REQUIRED for business logic, REQUIRES_NEW for independent operations
- Handle exceptions properly to ensure correct rollback behavior

Common Pitfalls:
- @Transactional only works on public methods and external calls due to proxy limitations
- Self-invocation bypasses proxy and transaction management - refactor to separate bean
- Catching exceptions without rethrowing defeats rollback mechanism
- Checked exceptions don't trigger rollback by default - use rollbackFor
- Opening new transactions unnecessarily with REQUIRES_NEW causes performance issues
- Lazy loading outside transactions causes LazyInitializationException
- Not considering isolation levels leading to dirty reads or lost updates`
        }
      ]
    },
    {
      id: 'auto-configuration',
      name: 'Auto-Configuration',
      icon: '🚀',
      color: '#14b8a6',
      description: 'Spring Boot intelligent bean configuration based on classpath',
      details: [
        {
          name: 'Overview',
          explanation: `Spring Boot's auto-configuration dramatically reduces boilerplate by intelligently configuring your application based on classpath dependencies, automatically creating beans and sensible defaults without explicit configuration.

How It Works:
- Conditional annotations (@ConditionalOnClass, @ConditionalOnMissingBean, @ConditionalOnProperty) apply configuration only when conditions are met
- @SpringBootApplication combines @Configuration, @EnableAutoConfiguration, and @ComponentScan in one annotation
- Detects dependencies on classpath and configures appropriate beans (e.g., H2 triggers embedded database configuration)
- Order of precedence: explicit configuration > property overrides > auto-configuration
- Uses spring.factories file to discover auto-configuration classes

Key Features:
- Intelligent bean creation based on classpath scanning and conditional logic
- Sensible defaults eliminating manual configuration for common patterns
- Selective exclusion of auto-configurations via exclude attribute
- Integration with Actuator's conditions endpoint to inspect applied configurations
- Support for custom auto-configuration classes following same patterns`
        },
        {
          name: 'Configuration Examples',
          explanation: `Real-World Use Cases:
- Microservices architectures: Quickly spinning up multiple services with consistent configurations
- REST APIs: Automatic configuration of web server, JSON processing, validation
- Database access: Auto-configuring data sources, JPA, transaction management
- Security: Setting up authentication, authorization with minimal configuration
- Messaging: Configuring message brokers, templates, and listeners`,
          codeExample: `// @SpringBootApplication = @Configuration + @EnableAutoConfiguration + @ComponentScan
@SpringBootApplication
public class MyApplication {
  public static void main(String[] args) {
    SpringApplication.run(MyApplication.class, args);
  }
}

// Custom auto-configuration
@Configuration
@ConditionalOnClass(DataSource.class)
@ConditionalOnMissingBean(DataSource.class)
public class DataSourceAutoConfiguration {

  @Bean
  public DataSource dataSource() {
    HikariDataSource dataSource = new HikariDataSource();
    dataSource.setJdbcUrl("jdbc:h2:mem:testdb");
    dataSource.setUsername("sa");
    return dataSource;
  }
}

// Conditional beans
@Configuration
public class MyConfiguration {

  @Bean
  @ConditionalOnProperty(name = "app.feature.enabled", havingValue = "true")
  public FeatureService featureService() {
    return new FeatureService();
  }

  @Bean
  @Profile("dev")
  public DataSource devDataSource() {
    return new H2DataSource();
  }
}

// Excluding auto-configurations
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class CustomApplication {
  public static void main(String[] args) {
    SpringApplication.run(CustomApplication.class, args);
  }
}`
        },
        {
          name: 'Best Practices',
          explanation: `Best Practices:
- Understand what's being configured using --debug flag or Actuator's conditions endpoint
- Selectively exclude unwanted auto-configurations using exclude attribute
- Create custom auto-configuration classes for organization-specific patterns
- Document deviations from auto-configuration defaults
- Use @ConditionalOnProperty for feature toggles in custom configurations

Common Pitfalls:
- Over-relying on auto-configuration without understanding underlying Spring concepts causes debugging confusion
- Conflicting configurations between auto-configuration and explicit configuration
- Not understanding order of precedence leading to unexpected behavior
- Assuming all dependencies will auto-configure when conditions aren't met
- Forgetting to exclude auto-configurations when providing custom implementations`
        }
      ]
    },
    {
      id: 'actuator',
      name: 'Actuator',
      icon: '📊',
      color: '#6366f1',
      description: 'Production-ready monitoring and management endpoints',
      details: [
        {
          name: 'Overview',
          explanation: `Spring Boot Actuator provides production-ready features for monitoring and managing your application. It exposes operational information about the running application via HTTP endpoints or JMX beans.

Key Endpoints:
- /health - Application health status and dependencies
- /info - Application information
- /metrics - Application metrics (JVM, HTTP, custom)
- /env - Environment properties
- /beans - All Spring beans in context
- /mappings - Request mappings
- /loggers - Logger configuration

Features:
- Health indicators for databases, message brokers, custom services
- Prometheus and Micrometer integration for metrics
- Customizable endpoint exposure and security
- Custom health indicators and metrics`
        },
        {
          name: 'Custom Health & Metrics',
          explanation: `Custom Health Indicators allow you to add application-specific health checks for external services, databases, or any resource your application depends on.

Custom Metrics let you track business-specific data like order counts, processing times, or cache hit rates.`,
          codeExample: `// Custom health indicator
@Component
public class CustomHealthIndicator implements HealthIndicator {

  @Override
  public Health health() {
    boolean healthy = checkExternalService();
    if (healthy) {
      return Health.up()
        .withDetail("service", "available")
        .build();
    }
    return Health.down()
      .withDetail("service", "unavailable")
      .withDetail("error", "Connection timeout")
      .build();
  }
}

// Custom metrics
@Service
public class OrderService {

  private final Counter orderCounter;
  private final Timer orderTimer;

  public OrderService(MeterRegistry registry) {
    this.orderCounter = Counter.builder("orders.created")
      .description("Total orders created")
      .tag("type", "online")
      .register(registry);

    this.orderTimer = Timer.builder("orders.processing.time")
      .description("Order processing time")
      .register(registry);
  }

  public Order createOrder(Order order) {
    return orderTimer.record(() -> {
      Order saved = orderRepository.save(order);
      orderCounter.increment();
      return saved;
    });
  }
}

// Custom actuator endpoint
@Component
@Endpoint(id = "custom")
public class CustomEndpoint {

  @ReadOperation
  public Map<String, Object> customInfo() {
    Map<String, Object> info = new HashMap<>();
    info.put("version", "1.0.0");
    info.put("environment", "production");
    return info;
  }
}`
        }
      ]
    },
    {
      id: 'spring-data-jpa',
      name: 'Spring Data JPA',
      icon: '💾',
      color: '#10b981',
      description: 'Repository abstraction for JPA-based data access',
      details: [
        {
          name: 'Entity Modeling',
          explanation: `Spring Data JPA provides repository abstraction for JPA, dramatically reducing boilerplate code for data access. It supports derived query methods, custom queries, specifications, and pagination.

Entity modeling uses JPA annotations to map Java objects to database tables. Key annotations include @Entity, @Table, @Id, @Column, @OneToMany, @ManyToOne, and auditing annotations like @CreatedDate.`,
          codeExample: `@Entity
@Table(name = "users", indexes = {
  @Index(name = "idx_email", columnList = "email"),
  @Index(name = "idx_username", columnList = "username")
})
@EntityListeners(AuditingEntityListener.class)
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true, length = 100)
  private String username;

  @Column(nullable = false, unique = true)
  private String email;

  @Enumerated(EnumType.STRING)
  private UserRole role;

  @CreatedDate
  @Column(nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @Version
  private Long version; // Optimistic locking

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Order> orders = new ArrayList<>();
}`
        },
        {
          name: 'Repository Patterns',
          explanation: `Spring Data repositories eliminate boilerplate code by automatically implementing common data access patterns. Query methods can be derived from method names or defined with @Query annotation.`,
          codeExample: `public interface UserRepository extends JpaRepository<User, Long>,
                                         JpaSpecificationExecutor<User> {

  // Derived query methods
  Optional<User> findByUsername(String username);
  Optional<User> findByEmail(String email);
  List<User> findByRoleAndCreatedAtAfter(UserRole role, LocalDateTime date);

  // Count and exists methods
  long countByRole(UserRole role);
  boolean existsByUsername(String username);

  // Custom JPQL queries
  @Query("SELECT u FROM User u WHERE u.email LIKE %:domain")
  List<User> findByEmailDomain(@Param("domain") String domain);

  @Query("SELECT u FROM User u JOIN FETCH u.orders WHERE u.id = :id")
  Optional<User> findByIdWithOrders(@Param("id") Long id);

  // Native SQL
  @Query(value = "SELECT * FROM users WHERE created_at > :date",
         nativeQuery = true)
  List<User> findUsersCreatedAfter(@Param("date") LocalDateTime date);

  // Modifying queries
  @Modifying
  @Query("UPDATE User u SET u.email = :email WHERE u.username = :username")
  int updateEmailByUsername(@Param("username") String username,
                            @Param("email") String email);
}`
        },
        {
          name: 'Specifications',
          explanation: `Specifications enable dynamic query building with type-safe criteria. They are composable, allowing complex queries to be built from simple building blocks.`,
          codeExample: `public class UserSpecifications {

  public static Specification<User> hasUsername(String username) {
    return (root, query, cb) ->
      username == null ? null : cb.equal(root.get("username"), username);
  }

  public static Specification<User> hasRole(UserRole role) {
    return (root, query, cb) ->
      role == null ? null : cb.equal(root.get("role"), role);
  }

  public static Specification<User> createdBetween(
      LocalDateTime start, LocalDateTime end) {
    return (root, query, cb) -> {
      if (start == null && end == null) return null;
      if (start == null) return cb.lessThanOrEqualTo(root.get("createdAt"), end);
      if (end == null) return cb.greaterThanOrEqualTo(root.get("createdAt"), start);
      return cb.between(root.get("createdAt"), start, end);
    };
  }
}

// Usage
@Service
public class UserSearchService {
  public List<User> searchUsers(UserSearchCriteria criteria) {
    Specification<User> spec = Specification.where(null);

    if (criteria.getUsername() != null) {
      spec = spec.and(UserSpecifications.hasUsername(criteria.getUsername()));
    }
    if (criteria.getRole() != null) {
      spec = spec.and(UserSpecifications.hasRole(criteria.getRole()));
    }

    return userRepository.findAll(spec);
  }
}`
        }
      ]
    },
    {
      id: 'spring-mvc',
      name: 'Spring MVC',
      icon: '🎨',
      color: '#3b82f6',
      description: 'Web MVC framework for building RESTful APIs',
      details: [
        {
          name: 'Controllers',
          explanation: `Spring MVC provides a comprehensive framework for building web applications and RESTful APIs. Controllers handle incoming requests, process data, and return responses.

@RestController combines @Controller and @ResponseBody, making it ideal for REST APIs that return JSON/XML directly.`,
          codeExample: `@RestController
@RequestMapping("/api/v1/products")
@Validated
public class ProductController {

  @Autowired
  private ProductService productService;

  @GetMapping("/{id}")
  public ResponseEntity<ProductDTO> getProduct(@PathVariable Long id) {
    ProductDTO product = productService.findById(id);
    return ResponseEntity.ok(product);
  }

  @GetMapping
  public ResponseEntity<Page<ProductDTO>> getAllProducts(
      @RequestParam(required = false) String category,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "20") int size) {

    Pageable pageable = PageRequest.of(page, size);
    return ResponseEntity.ok(productService.findAll(category, pageable));
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ResponseEntity<ProductDTO> createProduct(
      @Valid @RequestBody CreateProductRequest request) {

    ProductDTO created = productService.create(request);
    URI location = ServletUriComponentsBuilder
      .fromCurrentRequest()
      .path("/{id}")
      .buildAndExpand(created.getId())
      .toUri();

    return ResponseEntity.created(location).body(created);
  }

  @PutMapping("/{id}")
  public ResponseEntity<ProductDTO> updateProduct(
      @PathVariable Long id,
      @Valid @RequestBody UpdateProductRequest request) {
    return ResponseEntity.ok(productService.update(id, request));
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
    productService.delete(id);
    return ResponseEntity.noContent().build();
  }
}`
        },
        {
          name: 'Validation',
          explanation: `Request validation uses Bean Validation (JSR-380) annotations. Spring automatically validates @Valid annotated parameters and returns 400 Bad Request for validation failures.`,
          codeExample: `@Data
public class CreateProductRequest {

  @NotBlank(message = "Product name is required")
  @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
  private String name;

  @NotBlank(message = "Description is required")
  @Size(max = 500)
  private String description;

  @NotNull(message = "Price is required")
  @DecimalMin(value = "0.01", message = "Price must be greater than 0")
  @Digits(integer = 10, fraction = 2)
  private BigDecimal price;

  @NotNull
  @Min(0)
  private Integer stockQuantity;

  @NotBlank
  @Pattern(regexp = "^[A-Z]{3,10}$", message = "Invalid category code")
  private String categoryCode;

  @Email(message = "Invalid email format")
  private String contactEmail;

  @Valid
  @NotEmpty(message = "At least one specification is required")
  private List<ProductSpecification> specifications;
}`
        },
        {
          name: 'Exception Handling',
          explanation: `Global exception handling with @RestControllerAdvice provides centralized error handling across all controllers, returning consistent error responses.`,
          codeExample: `@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public ErrorResponse handleResourceNotFound(
      ResourceNotFoundException ex, WebRequest request) {

    return ErrorResponse.builder()
      .timestamp(LocalDateTime.now())
      .status(HttpStatus.NOT_FOUND.value())
      .error("Not Found")
      .message(ex.getMessage())
      .path(request.getDescription(false).replace("uri=", ""))
      .build();
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ValidationErrorResponse handleValidationExceptions(
      MethodArgumentNotValidException ex) {

    Map<String, String> errors = new HashMap<>();
    ex.getBindingResult().getAllErrors().forEach(error -> {
      String fieldName = ((FieldError) error).getField();
      String errorMessage = error.getDefaultMessage();
      errors.put(fieldName, errorMessage);
    });

    return ValidationErrorResponse.builder()
      .timestamp(LocalDateTime.now())
      .status(HttpStatus.BAD_REQUEST.value())
      .error("Validation Failed")
      .validationErrors(errors)
      .build();
  }
}`
        }
      ]
    },
    {
      id: 'spring-security',
      name: 'Spring Security',
      icon: '🔒',
      color: '#ef4444',
      description: 'Authentication and authorization framework',
      details: [
        {
          name: 'Configuration',
          explanation: `Spring Security provides comprehensive authentication and authorization support. The SecurityFilterChain configures security rules including which endpoints require authentication and what authentication methods to use.`,
          codeExample: `@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

  @Autowired
  private UserDetailsService userDetailsService;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .csrf(csrf -> csrf.disable()) // Disable for REST APIs
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/public/**").permitAll()
        .requestMatchers("/api/admin/**").hasRole("ADMIN")
        .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN")
        .anyRequest().authenticated()
      )
      .httpBasic(Customizer.withDefaults())
      .sessionManagement(session -> session
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      );

    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(12);
  }
}`
        },
        {
          name: 'JWT Authentication',
          explanation: `JWT (JSON Web Token) provides stateless authentication for REST APIs. The token contains claims about the user and is validated on each request.`,
          codeExample: `@Service
public class JwtService {

  @Value("\${jwt.secret}")
  private String secret;

  @Value("\${jwt.expiration}")
  private Long expiration;

  public String generateToken(UserDetails userDetails) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("roles", userDetails.getAuthorities().stream()
      .map(GrantedAuthority::getAuthority)
      .collect(Collectors.toList()));

    return Jwts.builder()
      .setClaims(claims)
      .setSubject(userDetails.getUsername())
      .setIssuedAt(new Date())
      .setExpiration(new Date(System.currentTimeMillis() + expiration))
      .signWith(getSigningKey(), SignatureAlgorithm.HS256)
      .compact();
  }

  public Boolean isTokenValid(String token, UserDetails userDetails) {
    final String username = extractUsername(token);
    return (username.equals(userDetails.getUsername())
        && !isTokenExpired(token));
  }
}`
        },
        {
          name: 'Method Security',
          explanation: `Method-level security with @PreAuthorize enables fine-grained access control on individual methods using SpEL expressions.`,
          codeExample: `@RestController
@RequestMapping("/api/products")
public class ProductController {

  // Role-based authorization
  @GetMapping
  @PreAuthorize("hasRole('USER')")
  public List<Product> getAllProducts() {
    return productService.findAll();
  }

  // Multiple roles
  @PostMapping
  @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
  public Product createProduct(@RequestBody Product product) {
    return productService.save(product);
  }

  // Custom SpEL expression
  @PutMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN') or @productSecurity.isOwner(#id)")
  public Product updateProduct(@PathVariable Long id,
                                @RequestBody Product product) {
    return productService.update(id, product);
  }

  // Post-authorization check
  @GetMapping("/{id}")
  @PostAuthorize("returnObject.ownerId == authentication.principal.id or hasRole('ADMIN')")
  public Product getProduct(@PathVariable Long id) {
    return productService.findById(id);
  }
}`
        }
      ]
    },
    {
      id: 'spring-cloud',
      name: 'Spring Cloud',
      icon: '☁️',
      color: '#8b5cf6',
      description: 'Microservices patterns: discovery, config, gateway, resilience',
      details: [
        {
          name: 'Service Discovery',
          explanation: `Eureka enables service discovery where services register themselves and discover other services dynamically without hardcoded URLs.`,
          codeExample: `// Eureka Server
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {
  public static void main(String[] args) {
    SpringApplication.run(EurekaServerApplication.class, args);
  }
}

// Eureka Client
@SpringBootApplication
@EnableDiscoveryClient
public class ProductServiceApplication {
  public static void main(String[] args) {
    SpringApplication.run(ProductServiceApplication.class, args);
  }
}

// Service communication using service name
@RestController
@RequestMapping("/api/products")
public class ProductController {

  @Autowired
  private RestTemplate restTemplate;

  @GetMapping("/{id}/orders")
  public List<Order> getProductOrders(@PathVariable Long id) {
    // Using service name instead of hardcoded URL
    String url = "http://order-service/api/orders/product/" + id;
    return restTemplate.exchange(
      url, HttpMethod.GET, null,
      new ParameterizedTypeReference<List<Order>>() {}
    ).getBody();
  }
}

// RestTemplate with Load Balancing
@Configuration
public class RestTemplateConfig {
  @Bean
  @LoadBalanced
  public RestTemplate restTemplate() {
    return new RestTemplate();
  }
}`
        },
        {
          name: 'Circuit Breaker',
          explanation: `Resilience4j provides fault tolerance with circuit breakers, retries, rate limiters, and bulkheads to prevent cascade failures in microservices.`,
          codeExample: `// Circuit Breaker implementation
@Service
public class OrderService {

  @Autowired
  private RestTemplate restTemplate;

  @CircuitBreaker(name = "orderService", fallbackMethod = "getOrdersFallback")
  @Retry(name = "orderService")
  @RateLimiter(name = "orderService")
  public List<Order> getOrders(Long userId) {
    String url = "http://order-service/api/orders/user/" + userId;
    return restTemplate.exchange(
      url, HttpMethod.GET, null,
      new ParameterizedTypeReference<List<Order>>() {}
    ).getBody();
  }

  // Fallback method
  public List<Order> getOrdersFallback(Long userId, Throwable throwable) {
    System.err.println("Fallback triggered: " + throwable.getMessage());
    return Collections.emptyList();
  }
}

// Configuration in application.yml
/*
resilience4j:
  circuitbreaker:
    instances:
      orderService:
        sliding-window-size: 10
        failure-rate-threshold: 50
        wait-duration-in-open-state: 10s
  retry:
    instances:
      orderService:
        max-attempts: 3
        wait-duration: 1s
*/`
        },
        {
          name: 'API Gateway',
          explanation: `Spring Cloud Gateway provides API routing, filtering, load balancing, and cross-cutting concerns like authentication at the edge of your microservices architecture.`,
          codeExample: `// Gateway Application
@SpringBootApplication
public class ApiGatewayApplication {
  public static void main(String[] args) {
    SpringApplication.run(ApiGatewayApplication.class, args);
  }
}

// application.yml configuration
/*
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/users/**
          filters:
            - StripPrefix=1
            - name: CircuitBreaker
              args:
                name: userService
                fallbackUri: forward:/fallback/users

        - id: order-service
          uri: lb://order-service
          predicates:
            - Path=/api/orders/**
          filters:
            - name: Retry
              args:
                retries: 3
                statuses: BAD_GATEWAY
*/

// Custom Global Filter
@Component
public class LoggingGlobalFilter implements GlobalFilter, Ordered {

  @Override
  public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
    System.out.println("Request: " + exchange.getRequest().getPath());
    long startTime = System.currentTimeMillis();

    return chain.filter(exchange).then(Mono.fromRunnable(() -> {
      long duration = System.currentTimeMillis() - startTime;
      System.out.println("Response in " + duration + "ms");
    }));
  }

  @Override
  public int getOrder() { return -1; }
}`
        }
      ]
    },
    {
      id: 'spring-batch',
      name: 'Spring Batch',
      icon: '⚙️',
      color: '#f59e0b',
      description: 'Robust batch processing framework for enterprise applications',
      details: [
        {
          name: 'Job Configuration',
          explanation: `Spring Batch provides a robust framework for batch processing with job and step abstractions. Jobs consist of steps that can be executed sequentially, conditionally, or in parallel.`,
          codeExample: `@Configuration
@EnableBatchProcessing
public class BatchConfig {

  @Autowired
  private JobBuilderFactory jobBuilderFactory;

  @Autowired
  private StepBuilderFactory stepBuilderFactory;

  // Simple Job with Single Step
  @Bean
  public Job importUserJob(Step importUserStep) {
    return jobBuilderFactory.get("importUserJob")
      .incrementer(new RunIdIncrementer())
      .listener(jobExecutionListener())
      .start(importUserStep)
      .build();
  }

  @Bean
  public Step importUserStep(ItemReader<UserDTO> reader,
                             ItemProcessor<UserDTO, User> processor,
                             ItemWriter<User> writer) {
    return stepBuilderFactory.get("importUserStep")
      .<UserDTO, User>chunk(100)
      .reader(reader)
      .processor(processor)
      .writer(writer)
      .faultTolerant()
      .skipLimit(10)
      .skip(Exception.class)
      .retryLimit(3)
      .retry(Exception.class)
      .build();
  }

  // Conditional Flow
  @Bean
  public Job conditionalJob() {
    return jobBuilderFactory.get("conditionalJob")
      .start(step1())
      .on("COMPLETED").to(step2())
      .from(step1()).on("FAILED").to(errorStep())
      .end()
      .build();
  }
}`
        },
        {
          name: 'Reader/Processor/Writer',
          explanation: `The chunk-oriented processing model reads items in chunks, processes each item, and writes the processed items together for efficiency.`,
          codeExample: `// CSV File Reader
@Bean
public FlatFileItemReader<UserDTO> csvReader() {
  return new FlatFileItemReaderBuilder<UserDTO>()
    .name("csvReader")
    .resource(new ClassPathResource("users.csv"))
    .delimited()
    .names("id", "firstName", "lastName", "email", "age")
    .linesToSkip(1)
    .fieldSetMapper(new BeanWrapperFieldSetMapper<>() {{
      setTargetType(UserDTO.class);
    }})
    .build();
}

// Item Processor
@Component
public class UserItemProcessor implements ItemProcessor<UserDTO, User> {

  @Override
  public User process(UserDTO dto) throws Exception {
    if (!isValid(dto)) {
      return null; // Skip invalid items
    }

    User user = new User();
    user.setUsername(dto.getFirstName() + "." + dto.getLastName());
    user.setEmail(dto.getEmail().toLowerCase());
    user.setCreatedAt(LocalDateTime.now());
    return user;
  }
}

// Database Writer
@Bean
public JdbcBatchItemWriter<User> databaseWriter(DataSource dataSource) {
  return new JdbcBatchItemWriterBuilder<User>()
    .dataSource(dataSource)
    .sql("INSERT INTO users (username, email, created_at) " +
         "VALUES (:username, :email, :createdAt)")
    .beanMapped()
    .build();
}`
        },
        {
          name: 'Error Handling',
          explanation: `Spring Batch provides comprehensive error handling with skip policies, retry mechanisms, and listeners for monitoring batch job execution.`,
          codeExample: `// Fault-Tolerant Step
@Bean
public Step faultTolerantStep() {
  return stepBuilderFactory.get("faultTolerantStep")
    .<UserDTO, User>chunk(100)
    .reader(csvReader())
    .processor(userProcessor())
    .writer(databaseWriter())
    .faultTolerant()
    .skipLimit(50)
    .skip(ValidationException.class)
    .skip(FlatFileParseException.class)
    .retryLimit(3)
    .retry(DeadlockLoserDataAccessException.class)
    .listener(skipListener())
    .build();
}

// Skip Listener
@Component
public class CustomSkipListener implements SkipListener<UserDTO, User> {

  @Override
  public void onSkipInRead(Throwable t) {
    logger.warn("Skipped during read: {}", t.getMessage());
  }

  @Override
  public void onSkipInProcess(UserDTO item, Throwable t) {
    logger.warn("Skipped during process: {}", item);
    logSkippedItem(item, t);
  }

  @Override
  public void onSkipInWrite(User item, Throwable t) {
    logger.warn("Skipped during write: {}", item);
  }
}`
        }
      ]
    },
    {
      id: 'spring-annotations',
      name: 'Spring Annotations',
      icon: '@',
      color: '#ec4899',
      description: 'Comprehensive guide to commonly used Spring annotations',
      details: [
        {
          name: 'Core Annotations',
          explanation: `Core Spring annotations define beans and their relationships. These annotations are the foundation of Spring's dependency injection.`,
          codeExample: `// @Configuration - Contains bean definitions
@Configuration
public class AppConfig {
  @Bean
  public UserService userService() {
    return new UserServiceImpl();
  }
}

// @Component - Generic Spring-managed component
@Component
public class UtilityComponent { }

// @Service - Service layer specialization
@Service
public class OrderService {
  private final OrderRepository orderRepository;

  public OrderService(OrderRepository orderRepository) {
    this.orderRepository = orderRepository;
  }
}

// @Repository - Data access layer
@Repository
public interface UserRepository extends JpaRepository<User, Long> { }

// @Autowired - Dependency injection
@Service
public class NotificationService {
  @Autowired
  private EmailSender emailSender;
}

// @Qualifier - Specify which bean
@Service
public class PaymentService {
  public PaymentService(@Qualifier("stripeGateway") PaymentGateway gateway) {
    this.paymentGateway = gateway;
  }
}

// @Value - Inject properties
@Component
public class AppSettings {
  @Value("\${app.name}")
  private String appName;

  @Value("\${app.max.connections:100}") // With default
  private int maxConnections;
}`
        },
        {
          name: 'Web Annotations',
          explanation: `Spring MVC annotations handle web requests, mapping URLs to controller methods and managing request/response processing.`,
          codeExample: `// @RestController - @Controller + @ResponseBody
@RestController
@RequestMapping("/api/products")
public class ProductController {

  // @GetMapping
  @GetMapping("/{id}")
  public Product getProduct(@PathVariable Long id) {
    return productService.findById(id);
  }

  // @PostMapping with validation
  @PostMapping
  public Product createProduct(@Valid @RequestBody ProductDTO dto) {
    return productService.create(dto);
  }

  // @RequestParam for query parameters
  @GetMapping("/search")
  public List<Product> search(
    @RequestParam String query,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(required = false) String category) {
    return productService.search(query, page, category);
  }
}

// @ExceptionHandler - Handle exceptions
@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(ResourceNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public ErrorResponse handleNotFound(ResourceNotFoundException ex) {
    return new ErrorResponse(ex.getMessage());
  }
}

// @CrossOrigin - Enable CORS
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ApiController { }`
        },
        {
          name: 'Transaction & Cache',
          explanation: `Transaction and caching annotations provide declarative control over data consistency and performance optimization.`,
          codeExample: `// @Transactional - Transaction management
@Service
public class OrderService {

  @Transactional
  public Order createOrder(OrderRequest request) {
    Order order = orderRepository.save(new Order(request));
    inventoryService.reserveItems(order.getItems());
    return order;
  }

  @Transactional(readOnly = true)
  public Order getOrder(Long id) {
    return orderRepository.findById(id).orElseThrow();
  }

  @Transactional(propagation = Propagation.REQUIRES_NEW)
  public void logActivity(String activity) {
    activityRepository.save(new Activity(activity));
  }
}

// @Cacheable - Cache method results
@Service
public class ProductService {

  @Cacheable(value = "products", key = "#id")
  public Product findById(Long id) {
    return productRepository.findById(id).orElse(null);
  }

  @CachePut(value = "products", key = "#result.id")
  public Product updateProduct(Long id, ProductDTO dto) {
    Product product = productRepository.findById(id).orElseThrow();
    product.update(dto);
    return productRepository.save(product);
  }

  @CacheEvict(value = "products", key = "#id")
  public void deleteProduct(Long id) {
    productRepository.deleteById(id);
  }
}

// @Scheduled - Schedule method execution
@Component
public class ScheduledTasks {
  @Scheduled(fixedRate = 5000) // Every 5 seconds
  public void reportStatus() { }

  @Scheduled(cron = "0 0 2 * * ?") // Daily at 2 AM
  public void dailyCleanup() { }
}`
        },
        {
          name: 'Bean Scope & Lifecycle',
          explanation: `Scope annotations control how many instances Spring creates. Lifecycle annotations hook into bean creation and destruction phases. Understanding scopes is critical for stateful vs stateless services.`,
          codeExample: `// @Scope - Control bean instantiation
@Component
@Scope("singleton")  // DEFAULT - one instance per container
public class AppConfig { }

@Component
@Scope("prototype")  // New instance every time requested
public class ShoppingCart { }

// Web scopes (require web-aware ApplicationContext)
@Component
@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class RequestContext { }  // One per HTTP request

@Component
@Scope(value = "session", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class UserSession { }  // One per HTTP session

// @PostConstruct / @PreDestroy - Lifecycle callbacks
@Service
public class ConnectionPool {
  private List<Connection> connections;

  @PostConstruct  // Called after injection, before use
  public void init() {
    connections = new ArrayList<>();
    for (int i = 0; i < 10; i++) {
      connections.add(createConnection());
    }
    System.out.println("Pool initialized with 10 connections");
  }

  @PreDestroy  // Called before bean is removed
  public void cleanup() {
    connections.forEach(Connection::close);
    System.out.println("All connections closed");
  }
}

// @Lazy - Delay initialization until first use
@Configuration
public class ExpensiveConfig {
  @Bean
  @Lazy  // Not created at startup, only when injected
  public HeavyService heavyService() {
    return new HeavyService();  // Expensive init
  }
}

// @DependsOn - Control initialization order
@Component
@DependsOn({"databaseMigration", "cacheWarmer"})
public class AppStartupService { }

// @Order / @Priority - Control execution order
@Component
@Order(1)  // Lower = higher priority
public class SecurityFilter implements Filter { }

@Component
@Order(2)
public class LoggingFilter implements Filter { }`
        },
        {
          name: 'Conditional & Profile',
          explanation: `Conditional annotations control when beans and configurations are loaded. @Profile activates beans for specific environments. @Conditional provides fine-grained control based on classpath, properties, or custom conditions.`,
          codeExample: `// @Profile - Environment-specific beans
@Configuration
@Profile("dev")
public class DevConfig {
  @Bean
  public DataSource dataSource() {
    return new EmbeddedDatabaseBuilder()
      .setType(EmbeddedDatabaseType.H2).build();
  }
}

@Configuration
@Profile("prod")
public class ProdConfig {
  @Bean
  public DataSource dataSource() {
    HikariDataSource ds = new HikariDataSource();
    ds.setJdbcUrl("jdbc:postgresql://prod-db:5432/app");
    return ds;
  }
}

// @Profile on component
@Service
@Profile("!test")  // Active in all profiles EXCEPT test
public class EmailService implements NotificationService { }

@Service
@Profile("test")
public class MockEmailService implements NotificationService { }

// @ConditionalOnProperty
@Configuration
@ConditionalOnProperty(
    name = "feature.caching.enabled",
    havingValue = "true",
    matchIfMissing = false
)
public class CacheConfig {
  @Bean
  public CacheManager cacheManager() {
    return new ConcurrentMapCacheManager("orders", "users");
  }
}

// @ConditionalOnClass - Only if class is on classpath
@Configuration
@ConditionalOnClass(name = "io.lettuce.core.RedisClient")
public class RedisConfig {
  @Bean
  public RedisTemplate<String, Object> redisTemplate() {
    return new RedisTemplate<>();
  }
}

// @ConditionalOnMissingBean - Only if no other bean exists
@Configuration
public class DefaultConfig {
  @Bean
  @ConditionalOnMissingBean(NotificationService.class)
  public NotificationService defaultNotification() {
    return new ConsoleNotificationService();
  }
}

// @ConditionalOnBean - Only if another bean exists
@Bean
@ConditionalOnBean(DataSource.class)
public JdbcTemplate jdbcTemplate(DataSource ds) {
  return new JdbcTemplate(ds);
}`
        },
        {
          name: 'Validation Annotations',
          explanation: `Bean Validation (JSR-380) annotations validate input data declaratively. Spring auto-validates @Valid parameters and returns 400 errors. Custom validators can be created for complex rules.`,
          codeExample: `// Bean Validation on DTOs
public class OrderRequest {
  @NotNull(message = "Symbol is required")
  @Size(min = 1, max = 10)
  private String symbol;

  @NotNull @Positive(message = "Quantity must be positive")
  private Integer quantity;

  @NotNull @DecimalMin("0.01")
  private BigDecimal price;

  @Email(message = "Invalid email format")
  private String traderEmail;

  @Pattern(regexp = "BUY|SELL", message = "Side must be BUY or SELL")
  private String side;

  @Future(message = "Expiry must be in the future")
  private LocalDateTime expiryTime;

  @Size(min = 1, max = 5, message = "1 to 5 tags allowed")
  private List<@NotBlank String> tags;
}

// Nested validation with @Valid
public class PortfolioRequest {
  @NotBlank private String name;

  @Valid  // Validates each item in the list
  @Size(min = 1, message = "At least one holding required")
  private List<HoldingRequest> holdings;
}

// Validation groups - validate different fields per operation
public interface OnCreate {}
public interface OnUpdate {}

public class UserDTO {
  @Null(groups = OnCreate.class)       // No ID on create
  @NotNull(groups = OnUpdate.class)    // ID required on update
  private Long id;

  @NotBlank(groups = {OnCreate.class, OnUpdate.class})
  private String username;

  @NotBlank(groups = OnCreate.class)   // Required on create only
  private String password;
}

// Controller with validation groups
@PostMapping
public User create(
    @Validated(OnCreate.class) @RequestBody UserDTO dto) { }

@PutMapping("/{id}")
public User update(
    @Validated(OnUpdate.class) @RequestBody UserDTO dto) { }

// Custom validator
@Target({FIELD})
@Retention(RUNTIME)
@Constraint(validatedBy = ValidTickerValidator.class)
public @interface ValidTicker {
  String message() default "Invalid ticker symbol";
  Class<?>[] groups() default {};
  Class<?>[] payload() default {};
}

public class ValidTickerValidator
    implements ConstraintValidator<ValidTicker, String> {
  @Override
  public boolean isValid(String value, ConstraintValidatorContext ctx) {
    return value != null && value.matches("^[A-Z]{1,5}$");
  }
}`
        },
        {
          name: 'Async & Event Annotations',
          explanation: `@Async enables asynchronous method execution on a separate thread. @EventListener decouples components via application events. @Retryable adds automatic retry logic for transient failures.`,
          codeExample: `// @Async - Run method on a separate thread
@Configuration
@EnableAsync
public class AsyncConfig {
  @Bean
  public Executor taskExecutor() {
    ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
    executor.setCorePoolSize(5);
    executor.setMaxPoolSize(10);
    executor.setQueueCapacity(100);
    executor.setThreadNamePrefix("async-");
    return executor;
  }
}

@Service
public class ReportService {
  @Async  // Returns immediately, runs in background
  public CompletableFuture<Report> generateReport(String type) {
    Report report = buildReport(type);  // slow
    return CompletableFuture.completedFuture(report);
  }

  @Async("taskExecutor")  // Use specific executor
  public void sendNotification(String userId, String msg) {
    // Runs on async-* thread
    emailService.send(userId, msg);
  }
}

// @EventListener - Loosely coupled event handling
public class OrderCreatedEvent {
  private final Order order;
  public OrderCreatedEvent(Order order) { this.order = order; }
  public Order getOrder() { return order; }
}

@Service
public class OrderService {
  @Autowired private ApplicationEventPublisher publisher;

  @Transactional
  public Order createOrder(OrderRequest req) {
    Order order = orderRepository.save(new Order(req));
    publisher.publishEvent(new OrderCreatedEvent(order));
    return order;
  }
}

// Multiple listeners react to the same event
@Component
public class OrderEventHandlers {
  @EventListener
  public void sendConfirmation(OrderCreatedEvent event) {
    emailService.sendConfirmation(event.getOrder());
  }

  @EventListener
  @Async  // Async listener
  public void updateAnalytics(OrderCreatedEvent event) {
    analyticsService.trackOrder(event.getOrder());
  }

  @TransactionalEventListener(phase = AFTER_COMMIT)
  public void afterOrderCommitted(OrderCreatedEvent event) {
    // Only fires after transaction commits successfully
    notificationService.notifyTrader(event.getOrder());
  }
}

// @Retryable - Auto-retry on failure (spring-retry)
@Service
public class ExternalApiService {
  @Retryable(
    value = {HttpServerErrorException.class},
    maxAttempts = 3,
    backoff = @Backoff(delay = 1000, multiplier = 2)
  )
  public MarketData fetchPrices(String symbol) {
    return restTemplate.getForObject(
      "/api/prices/" + symbol, MarketData.class);
  }

  @Recover  // Fallback when all retries fail
  public MarketData fallback(HttpServerErrorException e,
      String symbol) {
    return cachedPrices.get(symbol);
  }
}`
        },
        {
          name: 'Security Annotations',
          explanation: `Spring Security annotations control access at the method and class level. @PreAuthorize supports SpEL expressions for complex authorization rules. @Secured provides simpler role-based access.`,
          codeExample: `// @EnableMethodSecurity - Enable annotation-based security
@Configuration
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfig { }

// @PreAuthorize - SpEL expression before method executes
@Service
public class AccountService {
  @PreAuthorize("hasRole('ADMIN')")
  public void deleteAccount(Long id) { }

  @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
  public List<Account> getAllAccounts() { }

  // Access method arguments in SpEL
  @PreAuthorize("#userId == authentication.principal.id " +
      "or hasRole('ADMIN')")
  public Account getAccount(Long userId) { }

  @PreAuthorize("@authService.canAccessPortfolio(" +
      "authentication, #portfolioId)")
  public Portfolio getPortfolio(Long portfolioId) { }
}

// @PostAuthorize - Check AFTER method executes
@PostAuthorize("returnObject.owner == authentication.name")
public Order getOrder(Long orderId) {
  return orderRepository.findById(orderId).orElseThrow();
}

// @PreFilter / @PostFilter - Filter collections
@PreFilter("filterObject.owner == authentication.name")
public void deleteOrders(List<Order> orders) {
  orderRepository.deleteAll(orders);  // Only user's orders
}

@PostFilter("filterObject.visibility == 'PUBLIC' " +
    "or filterObject.owner == authentication.name")
public List<Report> getReports() {
  return reportRepository.findAll();
}

// @Secured - Simpler role-based (no SpEL)
@Secured("ROLE_ADMIN")
public void adminOnly() { }

@Secured({"ROLE_ADMIN", "ROLE_TRADER"})
public void tradersAndAdmins() { }

// @RolesAllowed - JSR-250 standard (same as @Secured)
@RolesAllowed("ADMIN")
public void jsr250Admin() { }

// @WithMockUser - Testing secured methods
@Test
@WithMockUser(username = "trader", roles = {"TRADER"})
void testPlaceOrder() {
  // Runs as if authenticated user "trader" with ROLE_TRADER
  orderService.placeOrder(new OrderRequest("AAPL", 100));
}`
        },
        {
          name: 'JPA & Data Annotations',
          explanation: `JPA annotations map Java objects to database tables. Spring Data annotations add auditing, query derivation, and custom repository behavior. These eliminate most boilerplate SQL and mapping code.`,
          codeExample: `// Entity mapping
@Entity
@Table(name = "trades",
    indexes = @Index(columnList = "symbol,tradeDate"))
public class Trade {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 10)
  private String symbol;

  @Enumerated(EnumType.STRING)
  private Side side;  // BUY, SELL

  @Column(precision = 19, scale = 4)
  private BigDecimal price;

  @Temporal(TemporalType.TIMESTAMP)
  private Date tradeDate;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "trader_id")
  private Trader trader;

  @OneToMany(mappedBy = "trade", cascade = CascadeType.ALL,
      orphanRemoval = true)
  private List<Fill> fills = new ArrayList<>();

  @Version  // Optimistic locking
  private Long version;

  @CreatedDate  // Spring Data auditing
  private LocalDateTime createdAt;

  @LastModifiedDate
  private LocalDateTime updatedAt;

  @Transient  // Not persisted to DB
  private BigDecimal unrealizedPnL;
}

// Embeddable value objects
@Embeddable
public class Money {
  @Column(precision = 19, scale = 4)
  private BigDecimal amount;
  @Column(length = 3)
  private String currency;
}

@Entity
public class Order {
  @Embedded
  @AttributeOverrides({
    @AttributeOverride(name = "amount",
        column = @Column(name = "order_amount")),
    @AttributeOverride(name = "currency",
        column = @Column(name = "order_currency"))
  })
  private Money totalValue;
}

// Spring Data repository with query methods
public interface TradeRepository extends JpaRepository<Trade, Long> {
  // Derived query from method name
  List<Trade> findBySymbolAndSideOrderByTradeDateDesc(
      String symbol, Side side);

  // @Query with JPQL
  @Query("SELECT t FROM Trade t WHERE t.trader.id = :traderId " +
      "AND t.tradeDate >= :since")
  List<Trade> findRecentTrades(@Param("traderId") Long traderId,
      @Param("since") LocalDateTime since);

  // Native SQL query
  @Query(value = "SELECT symbol, SUM(quantity) as total " +
      "FROM trades GROUP BY symbol", nativeQuery = true)
  List<Object[]> getPositionSummary();

  // @Modifying for UPDATE/DELETE queries
  @Modifying
  @Transactional
  @Query("UPDATE Trade t SET t.side = :status WHERE t.id = :id")
  int updateStatus(@Param("id") Long id, @Param("status") String status);

  // Projections
  @EntityGraph(attributePaths = {"trader", "fills"})
  Optional<Trade> findWithDetailsById(Long id);
}`
        },
        {
          name: 'Testing Annotations',
          explanation: `Spring testing annotations bootstrap the application context for integration tests. @MockBean replaces real beans with mocks. @DataJpaTest loads only JPA components for repository testing.`,
          codeExample: `// @SpringBootTest - Full integration test
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class OrderControllerIntegrationTest {
  @Autowired private TestRestTemplate restTemplate;
  @MockBean private OrderService orderService;

  @Test
  void shouldReturnOrders() {
    when(orderService.findAll())
        .thenReturn(List.of(new Order("AAPL", 100)));

    ResponseEntity<List> response = restTemplate
        .getForEntity("/api/orders", List.class);

    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
  }
}

// @WebMvcTest - Test only web layer (no DB, no services)
@WebMvcTest(OrderController.class)
class OrderControllerTest {
  @Autowired private MockMvc mockMvc;
  @MockBean private OrderService orderService;

  @Test
  void shouldCreateOrder() throws Exception {
    mockMvc.perform(post("/api/orders")
        .contentType(MediaType.APPLICATION_JSON)
        .content("{\\"symbol\\":\\"AAPL\\",\\"quantity\\":100}"))
      .andExpect(status().isCreated())
      .andExpect(jsonPath("$.symbol").value("AAPL"));
  }
}

// @DataJpaTest - Test only JPA repositories
@DataJpaTest
class TradeRepositoryTest {
  @Autowired private TestEntityManager entityManager;
  @Autowired private TradeRepository tradeRepository;

  @Test
  void shouldFindBySymbol() {
    entityManager.persist(new Trade("AAPL", Side.BUY, 100));
    entityManager.flush();

    List<Trade> trades = tradeRepository
        .findBySymbolAndSideOrderByTradeDateDesc("AAPL", Side.BUY);
    assertThat(trades).hasSize(1);
  }
}

// @TestConfiguration - Override beans for tests only
@TestConfiguration
public class TestConfig {
  @Bean
  public Clock clock() {
    return Clock.fixed(Instant.parse("2024-01-15T09:30:00Z"),
        ZoneId.of("America/New_York"));
  }
}

// Slice test annotations:
// @WebFluxTest     - WebFlux controllers only
// @JsonTest        - JSON serialization/deserialization
// @RestClientTest  - REST client testing
// @JdbcTest        - JDBC repository testing

// @DirtiesContext - Reset context after test
@Test
@DirtiesContext(methodMode = AFTER_METHOD)
void testThatModifiesContext() { }

// @Sql - Execute SQL before/after test
@Test
@Sql("/test-data/orders.sql")
@Sql(scripts = "/cleanup.sql",
    executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
void testWithPreloadedData() { }`
        }
      ]
    }
  ]

  useVoiceConceptNavigation(concepts, setSelectedConceptIndex, setSelectedDetailIndex)

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (selectedConceptIndex !== null) {
          setSelectedConceptIndex(null)
          setSelectedDetailIndex(0)
        } else {
          onBack()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

  const handlePreviousConcept = () => {
    if (selectedConceptIndex > 0) {
      setSelectedConceptIndex(selectedConceptIndex - 1)
      setSelectedDetailIndex(0)
    }
  }

  const handleNextConcept = () => {
    if (selectedConceptIndex < concepts.length - 1) {
      setSelectedConceptIndex(selectedConceptIndex + 1)
      setSelectedDetailIndex(0)
    }
  }

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'Frameworks', icon: '🛠️', onClick: onBack }
    ]

    if (selectedConcept) {
      stack.push({ name: 'Spring Framework', icon: '🌱', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'Spring Framework', icon: '🌱' })
    }

    return stack
  }

  const handleBreadcrumbClick = (index) => {
    const stack = buildBreadcrumbStack()
    if (stack[index].onClick) {
      stack[index].onClick()
    }
  }

  const containerStyle = {
    minHeight: '100vh',
    background: 'var(--bg-primary)',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }

  const headerStyle = {
    maxWidth: '1400px',
    margin: '0 auto 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  }

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #86efac, #4ade80)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(16, 185, 129, 0.2)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '0.5rem',
    color: '#4ade80',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  const navButtonStyle = {
    padding: '0.75rem 1.25rem',
    background: 'rgba(16, 185, 129, 0.2)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '0.5rem',
    color: '#4ade80',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            style={backButtonStyle}
            onClick={onBack}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            ← Back to Frameworks
          </button>
          <h1 style={titleStyle}>Spring Framework</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {onPrevious && (
            <button
              style={navButtonStyle}
              onClick={onPrevious}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              ← {previousName}
            </button>
          )}
          {onNext && (
            <button
              style={navButtonStyle}
              onClick={onNext}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={FRAMEWORK_COLORS}
        />
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {concepts.map((concept, index) => (
          <div
            key={concept.id}
            onClick={() => setSelectedConceptIndex(index)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: `1px solid ${concept.color}40`,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = `0 20px 40px ${concept.color}20`
              e.currentTarget.style.borderColor = concept.color
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.borderColor = `${concept.color}40`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{concept.icon}</span>
              <h3 style={{ color: concept.color, margin: 0, fontSize: '1.25rem' }}>{concept.name}</h3>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>{concept.description}</p>
            <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
              {concept.details.length} topics - Click to explore
            </div>
          </div>
        ))}
      </div>

      {/* Collapsible Sidebar for quick concept navigation */}
      <CollapsibleSidebar
        items={concepts}
        selectedIndex={selectedConceptIndex ?? -1}
        onSelect={(index) => {
          setSelectedConceptIndex(index)
          setSelectedDetailIndex(0)
        }}
        title="Concepts"
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.icon}
        primaryColor={FRAMEWORK_COLORS.primary}
      />


      {/* Concept Detail Modal */}
      {selectedConcept && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => setSelectedConceptIndex(null)}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              borderRadius: '1rem',
              padding: '2rem',
              width: '95vw', maxWidth: '1400px', height: '90vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu || onBack}
              colors={FRAMEWORK_COLORS}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #334155' }}>
              <h2 style={{ color: selectedConcept.color, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
                <span>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button onClick={handlePreviousConcept} disabled={selectedConceptIndex === 0} style={{ padding: '0.4rem 0.75rem', background: 'rgba(100, 116, 139, 0.2)', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '0.375rem', color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8', cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer', fontSize: '0.8rem' }}>←</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>{selectedConceptIndex + 1}/{concepts.length}</span>
                <button onClick={handleNextConcept} disabled={selectedConceptIndex === concepts.length - 1} style={{ padding: '0.4rem 0.75rem', background: 'rgba(100, 116, 139, 0.2)', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '0.375rem', color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8', cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer', fontSize: '0.8rem' }}>→</button>
                <button onClick={() => setSelectedConceptIndex(null)} style={{ padding: '0.4rem 0.75rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.375rem', color: '#f87171', cursor: 'pointer', fontSize: '0.8rem', marginLeft: '0.5rem' }}>✕</button>
              </div>
            </div>

            {/* Subtopic Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button key={i} onClick={() => setSelectedDetailIndex(i)} style={{ padding: '0.5rem 1rem', background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)', border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`, borderRadius: '0.5rem', color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', fontWeight: selectedDetailIndex === i ? '600' : '400', transition: 'all 0.2s' }}>{detail.name}</button>
              ))}
            </div>

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              return (
                <div>
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{detail.name}</h3>
                  <div style={{ color: '#e2e8f0', lineHeight: '1.8', marginBottom: '1rem', background: colorScheme.bg, border: `1px solid ${colorScheme.border}`, borderRadius: '0.5rem', padding: '1rem', textAlign: 'left', whiteSpace: 'pre-wrap' }}>{detail.explanation}</div>
                  {detail.diagram && (
                    <div style={{ marginTop: '0.5rem', marginBottom: '1.5rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '0.75rem', padding: '1rem', border: '1px solid #334155', overflow: 'auto' }}>
                      <HoverZoomDiagram>
                        {(() => { const DiagramComponent = detail.diagram; return <DiagramComponent /> })()}
                      </HoverZoomDiagram>
                    </div>
                  )}
                  {detail.codeExample && (
                    <div style={{ marginTop: '1.5rem' }}>
                      <h4 style={{ color: '#4ade80', marginBottom: '0.75rem', fontSize: '1rem' }}>Code Example</h4>
                      <div style={{ background: '#1e293b', borderRadius: '0.5rem', padding: '1rem', border: '1px solid #334155', overflow: 'auto' }}>
                        <SyntaxHighlighter code={detail.codeExample} />
                      </div>
                    </div>
                  )}
                </div>
              )
            })()}

          </div>
        </div>
      )}
    </div>
  )
}

export default Spring

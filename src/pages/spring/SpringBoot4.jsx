/**
 * Spring Boot 4
 *
 * Spring Boot 4.0 / Spring Framework 7 features: API versioning, HTTP service
 * clients, built-in resilience, BeanRegistrar, JSpecify, Jackson 3, modular
 * starters, and testing changes.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const SPRING_BOOT4_COLORS = {
  primary: '#22c55e',
  primaryHover: '#4ade80',
  bg: 'rgba(34, 197, 94, 0.1)',
  border: 'rgba(34, 197, 94, 0.3)',
  arrow: '#22c55e',
  hoverBg: 'rgba(34, 197, 94, 0.2)',
  topicBg: 'rgba(34, 197, 94, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]


// =============================================================================
// MAIN COMPONENT
// =============================================================================

function SpringBoot4({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'about-spring-boot-4',
      name: 'About Spring Boot 4',
      icon: '🌱',
      color: '#64748b',
      description: 'Spring Boot 4.0 (November 2025) is a new generation built on Spring Framework 7, Spring Security 7 and Jakarta EE 11. It keeps the Java 17 baseline while embracing Java 25.',
      details: [
        {
          name: 'Platform Baselines',
          explanation: 'Spring Boot 4 moves the whole stack forward together. Java 17 remains the minimum, so most Boot 3 apps can upgrade without changing JDK, but the Jakarta EE 11 move means a Servlet 6.1 container is required. Kotlin users need 2.2+, and Gradle 9 is supported alongside 8.14+.',
          codeExample: `// Spring Boot 4.0 baselines
//
//   Spring Framework   7.0
//   Spring Security    7.0
//   Java               17+  (Java 25 fully supported)
//   Jakarta EE         11   (Servlet 6.1, Persistence 3.2, Validation 3.1)
//   Kotlin             2.2+
//   Gradle             8.14+ or 9
//   JSON               Jackson 3 (Jackson 2 deprecated)
//
// Embedded servers: Tomcat 11 and Jetty 12.1
// Undertow support is dropped (not yet Servlet 6.1 compatible)`
        },
        {
          name: 'Headline Features',
          explanation: 'Most of the new programming-model features come from Spring Framework 7, with Boot adding auto-configuration and properties for them. The biggest migration work is usually Jackson 3, the renamed starters, and the testing changes.',
          codeExample: `// New in Spring Framework 7 / Spring Boot 4
//
//   First-class API versioning          @GetMapping(version = "2.0")
//   HTTP service clients                 @ImportHttpServices
//   Built-in resilience                  @Retryable, @ConcurrencyLimit
//   Programmatic bean registration       BeanRegistrar
//   JSpecify null safety                 @NullMarked, @Nullable
//   Jackson 3                            tools.jackson.*
//   Modular auto-configuration           spring-boot-starter-webmvc ...
//   RestTestClient                       fluent test client for MVC
//   OpenTelemetry starter                spring-boot-starter-opentelemetry`
        }
      ]
    },
    {
      id: 'api-versioning',
      name: 'API Versioning',
      icon: '🔢',
      color: '#3b82f6',
      description: 'Spring MVC and WebFlux now support REST API versioning natively. Map handlers by version and choose how clients send it: header, query parameter, path segment, or media type.',
      details: [
        {
          name: 'Versioned Handler Methods',
          explanation: 'Before Spring 7, versioning meant duplicating URL prefixes or writing custom request conditions. Now the mapping annotations have a version attribute, and Spring resolves the requested version, validates it against supported versions, and routes to the matching method.',
          codeExample: `@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping(path = "/{id}", version = "1.0")
    public UserDTOv1 getUserV1(@PathVariable Long id) {
        User user = service.find(id);
        return new UserDTOv1(id, user.getName());
    }

    @GetMapping(path = "/{id}", version = "2.0")
    public UserDTOv2 getUserV2(@PathVariable Long id) {
        User user = service.find(id);
        return new UserDTOv2(id, user.getFirstName(), user.getLastName());
    }
}`
        },
        {
          name: 'Choosing a Strategy',
          explanation: 'Spring Boot auto-configures versioning from spring.mvc.apiversion.* (or spring.webflux.apiversion.*). For more control, or to combine strategies in a specific order, implement configureApiVersioning in a WebMvcConfigurer. Custom ApiVersionResolver, ApiVersionParser and ApiVersionDeprecationHandler beans are picked up automatically.',
          codeExample: `# application.properties - version from a request header
spring.mvc.apiversion.default=1.0
spring.mvc.apiversion.use.header=X-Version

// Or configure it in code
@Configuration
public class ApiVersioningConfig implements WebMvcConfigurer {
    @Override
    public void configureApiVersioning(ApiVersionConfigurer configurer) {
        configurer.useMediaTypeParameterVersioning();
    }
}

// Client request
//   GET /api/users/42
//   X-Version: 2.0`
        }
      ]
    },
    {
      id: 'http-service-clients',
      name: 'HTTP Service Clients',
      icon: '🔌',
      color: '#06b6d4',
      description: 'Declare a REST client as an annotated Java interface and let Spring Boot create the implementation bean, backed by RestClient or WebClient.',
      details: [
        {
          name: '@HttpExchange Interfaces',
          explanation: 'HTTP interfaces existed in Spring 6, but you had to build each proxy by hand with HttpServiceProxyFactory. Spring 7 adds @ImportHttpServices to register interface clients in bulk (optionally grouped, with shared configuration per group), and Spring Boot 4 auto-configures them and exposes connection settings as properties.',
          codeExample: `@HttpExchange(url = "https://jsonplaceholder.typicode.com", accept = "application/json")
public interface TodoService {

    @GetExchange("/todos")
    List<Todo> getAllTodos();

    @GetExchange("/todos/{id}")
    Todo getTodoById(@PathVariable Long id);

    @PostExchange("/todos")
    Todo createTodo(@RequestBody Todo todo);
}

@Configuration(proxyBeanMethods = false)
@ImportHttpServices(TodoService.class)
public class HttpClientConfig { }

// Inject and call it like any bean
@Service
class TodoReport {
    TodoReport(TodoService todos) { ... }
}`
        }
      ]
    },
    {
      id: 'resilience',
      name: 'Built-in Resilience',
      icon: '🔁',
      color: '#ef4444',
      description: 'Retry and concurrency throttling are now part of Spring Framework core, enabled with @EnableResilientMethods. No separate Spring Retry dependency is needed.',
      details: [
        {
          name: '@Retryable & @ConcurrencyLimit',
          explanation: '@Retryable retries a method on failure with configurable attempts, exponential backoff, maximum delay, and jitter. It works for reactive return types too. @ConcurrencyLimit caps how many threads can run a method at once, which protects downstream systems, and is especially useful with virtual threads, where thread-pool size no longer limits concurrency.',
          codeExample: `@Configuration
@EnableResilientMethods
public class ResilienceConfig { }

@Service
public class ExternalApiService {

    @Retryable(
        maxAttempts = 4,
        delay = 500,
        multiplier = 2.0,
        maxDelay = 5000,
        jitter = 100
    )
    public String fetchData(String id) {
        return externalApi.getData(id);
    }

    @ConcurrencyLimit(2)
    public String performHeavyOperation(String taskId) {
        return heavyComputation(taskId);
    }
}`
        }
      ]
    },
    {
      id: 'core-container',
      name: 'Core Container',
      icon: '🧩',
      color: '#8b5cf6',
      description: 'BeanRegistrar adds a flexible, AOT-friendly way to register beans programmatically, and JSpecify annotations bring standardized null safety across the Spring portfolio.',
      details: [
        {
          name: 'BeanRegistrar',
          explanation: 'Registering beans conditionally or in loops used to mean BeanDefinitionRegistryPostProcessor and low-level bean definitions. A BeanRegistrar receives a BeanRegistry and the Environment and registers beans with a concise, type-safe API. It works with AOT processing and GraalVM native images.',
          codeExample: `public class MessageServiceRegistrar implements BeanRegistrar {
    @Override
    public void register(BeanRegistry registry, Environment env) {
        String messageType = env.getProperty("app.message-type", "email");
        switch (messageType.toLowerCase()) {
            case "email" -> registry.registerBean("messageService",
                EmailMessageService.class,
                spec -> spec.description("Email service"));
            case "sms" -> registry.registerBean("messageService",
                SmsMessageService.class,
                spec -> spec.description("SMS service"));
        }
    }
}

@Configuration
@Import(MessageServiceRegistrar.class)
public class AppConfig { }`
        },
        {
          name: 'JSpecify Null Safety',
          explanation: 'Spring replaces its own @Nullable/@NonNullApi annotations with the JSpecify standard. Mark a package @NullMarked so everything is non-null by default, then annotate the exceptions with @Nullable. IDEs, NullAway and Kotlin all understand these annotations, so null bugs are caught at build time.',
          codeExample: `// package-info.java
@NullMarked
package com.example.coffeeshop;

import org.jspecify.annotations.NullMarked;

// UserService.java - non-null unless marked otherwise
public User findById(Long id) {
    return userRepository.findById(id)
        .orElseThrow(() -> new UserNotFoundException(id));
}

public List<User> search(@Nullable String name) {
    if (name == null) {
        return userRepository.findAll();
    }
    return userRepository.findByName(name);
}`
        }
      ]
    },
    {
      id: 'jackson-3',
      name: 'Jackson 3',
      icon: '📄',
      color: '#f59e0b',
      description: 'Spring Boot 4 defaults to Jackson 3: new tools.jackson packages, unchecked exceptions, ISO-8601 dates by default, and renamed Boot integration classes and properties.',
      details: [
        {
          name: 'What Changes',
          explanation: 'Jackson 3 moves to the tools.jackson package (annotations stay in com.fasterxml.jackson.annotation), throws unchecked JacksonException, and writes dates as ISO-8601 strings instead of numeric timestamps by default. Boot now auto-configures a JsonMapper (and XmlMapper) rather than a generic ObjectMapper. Jackson 2 still works but its support is deprecated.',
          codeExample: `// Jackson 2 (Boot 3)                    Jackson 3 (Boot 4)
// com.fasterxml.jackson.databind.*  ->  tools.jackson.databind.*
// ObjectMapper bean                 ->  JsonMapper bean
// checked JsonProcessingException   ->  unchecked JacksonException
//
// Boot class renames
// Jackson2ObjectMapperBuilderCustomizer -> JsonMapperBuilderCustomizer
// @JsonComponent                         -> @JacksonComponent
// @JsonMixin                             -> @JacksonMixin
//
// Property renames
// spring.jackson.read.*  / spring.jackson.parser.*  -> spring.jackson.json.read.*
// spring.jackson.write.*                            -> spring.jackson.json.write.*`
        },
        {
          name: 'Customizing the Mapper',
          explanation: 'Customize the auto-configured mapper with a JsonMapperBuilderCustomizer bean. Annotations such as @JsonView and @JsonProperty keep working as before.',
          codeExample: `@Configuration
class JsonConfig {
    @Bean
    JsonMapperBuilderCustomizer jsonCustomizer() {
        return builder -> builder
            .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
    }
}

public record Donut(
    @JsonView(Views.Summary.class) Long id,
    @JsonView(Views.Summary.class) String name,
    @JsonView(Views.Public.class)  BigDecimal price
) {}`
        }
      ]
    },
    {
      id: 'modularization',
      name: 'Modular Starters',
      icon: '📦',
      color: '#10b981',
      description: 'The monolithic spring-boot-autoconfigure jar is split into focused modules, one per technology, with consistently named starters and matching test starters.',
      details: [
        {
          name: 'New Module Layout',
          explanation: 'Every technology now has its own module (spring-boot-<technology>) with root package org.springframework.boot.<technology>, and a starter named spring-boot-starter-<technology>. Applications only pull in the auto-configuration they use, which shrinks the classpath, speeds startup, and makes native images smaller. If you want a quick upgrade first, the classic starters bring back the old all-in-one behavior.',
          codeExample: `<!-- Renamed starters -->
<!-- spring-boot-starter-web           ->  spring-boot-starter-webmvc      -->
<!-- spring-boot-starter-web-services  ->  spring-boot-starter-webservices -->

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webmvc</artifactId>
</dependency>

<!-- Each technology has a matching test starter -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webmvc-test</artifactId>
    <scope>test</scope>
</dependency>

<!-- Migration shortcut: the old all-in-one auto-configuration -->
<!-- spring-boot-starter-classic, spring-boot-starter-test-classic -->`
        }
      ]
    },
    {
      id: 'testing',
      name: 'Testing Changes',
      icon: '🧪',
      color: '#ec4899',
      description: 'RestTestClient brings a fluent test API to Spring MVC, @MockBean is gone in favor of @MockitoBean, and MockMvc must now be requested explicitly.',
      details: [
        {
          name: 'RestTestClient',
          explanation: 'RestTestClient offers the fluent request/assert style of WebTestClient for blocking Spring MVC apps. Bind it to a single controller for fast unit tests, to MockMvc, or to a running server for end-to-end tests.',
          codeExample: `@ExtendWith(MockitoExtension.class)
class TodoControllerTest {
    @Mock
    private TodoService todoService;
    private RestTestClient client;

    @BeforeEach
    void setUp() {
        client = RestTestClient.bindToController(new TodoController(todoService)).build();
    }

    @Test
    void shouldGetAllTodos() {
        when(todoService.findAll())
            .thenReturn(List.of(new Todo(1L, "Learn Spring", false)));

        client.get()
            .uri("/api/todos")
            .exchange()
            .expectStatus().isOk()
            .expectBody()
            .jsonPath("$[0].title").isEqualTo("Learn Spring");
    }
}`
        },
        {
          name: 'Migration Notes for Tests',
          explanation: 'Several test conveniences were removed or made explicit. @MockBean and @SpyBean are replaced by the Spring Framework @MockitoBean and @MockitoSpyBean. @SpringBootTest no longer sets up MockMvc on its own, and TestRestTemplate needs an annotation plus its own module.',
          codeExample: `// Boot 3                          Boot 4
// @MockBean                    ->  @MockitoBean
// @SpyBean                     ->  @MockitoSpyBean

@SpringBootTest
@AutoConfigureMockMvc            // now required for MockMvc
class OrderApiTest {

    @Autowired MockMvc mvc;

    @MockitoBean PaymentGateway gateway;
}

// TestRestTemplate: add @AutoConfigureTestRestTemplate
// and the spring-boot-resttestclient dependency`
        }
      ]
    },
    {
      id: 'observability',
      name: 'Observability & More',
      icon: '📡',
      color: '#a855f7',
      description: 'A dedicated OpenTelemetry starter, plus a list of removals and behavior changes worth checking before upgrading.',
      details: [
        {
          name: 'OpenTelemetry Starter',
          explanation: 'spring-boot-starter-opentelemetry brings in everything needed to export metrics and traces over OTLP, wired through Micrometer. Point it at a collector with the management.otlp properties.',
          codeExample: `<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-opentelemetry</artifactId>
</dependency>

# application.properties
management.otlp.metrics.export.url=http://otel-collector:4318/v1/metrics
management.opentelemetry.tracing.export.otlp.endpoint=http://otel-collector:4318/v1/traces
management.tracing.sampling.probability=1.0`
        },
        {
          name: 'Removals & Behavior Changes',
          explanation: 'Check these before upgrading. Most have a direct replacement, but some (Undertow, Spock, launch scripts) mean changing tools.',
          codeExample: `// Removed in Spring Boot 4.0
//   Undertow embedded server        -> use Tomcat or Jetty
//   @MockBean / @SpyBean            -> @MockitoBean / @MockitoSpyBean
//   Spock integration               (Spock does not yet support Groovy 5)
//   Embedded launch scripts for executable jars
//   Spring Session Hazelcast / MongoDB modules (now maintained elsewhere)
//
// Behavior changes
//   Spring Batch runs in-memory by default
//     -> add spring-boot-starter-batch-jdbc for a database job repository
//   Elasticsearch RestClient replaced by Rest5Client
//   Jackson 3 is the default JSON library`
        }
      ]
    }
  ]

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

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

  // =============================================================================
  // BREADCRUMB CONFIGURATION
  // =============================================================================

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'Frameworks', icon: '🌱', page: 'Frameworks' },
      { name: 'Spring Boot 4', icon: '🚀', page: 'Spring Boot 4' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index, item) => {
    if (index === 0) {
      onBack()
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)
    }
  }

  // =============================================================================
  // KEYBOARD NAVIGATION
  // =============================================================================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (selectedConcept) {
          setSelectedConceptIndex(null)
        } else {
          onBack()
        }
      } else if (e.key === 'ArrowLeft' && selectedConceptIndex !== null) {
        e.preventDefault()
        handlePreviousConcept()
      } else if (e.key === 'ArrowRight' && selectedConceptIndex !== null) {
        e.preventDefault()
        handleNextConcept()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

  // =============================================================================
  // STYLES
  // =============================================================================

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #14532d 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #4ade80, #22c55e)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(34, 197, 94, 0.2)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    borderRadius: '0.5rem',
    color: '#4ade80',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Spring Boot 4</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(34, 197, 94, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Back to Frameworks
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={SPRING_BOOT4_COLORS}
        />
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
        primaryColor={SPRING_BOOT4_COLORS.primary}
      />


      {/* Concept Cards Grid */}
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
            onClick={() => { setSelectedConceptIndex(index); setSelectedDetailIndex(0) }}
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

      {/* Modal for Selected Concept */}
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
              colors={SPRING_BOOT4_COLORS}
            />

            {/* Modal Header with Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #334155'
            }}>
              <h2 style={{
                color: selectedConcept.color,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.25rem'
              }}>
                <span>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button
                  onClick={handlePreviousConcept}
                  disabled={selectedConceptIndex === 0}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >&larr;</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>
                  {selectedConceptIndex + 1}/{concepts.length}
                </span>
                <button
                  onClick={handleNextConcept}
                  disabled={selectedConceptIndex === concepts.length - 1}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >&rarr;</button>
                <button
                  onClick={() => setSelectedConceptIndex(null)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '0.375rem',
                    color: '#f87171',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    marginLeft: '0.5rem'
                  }}
                >X</button>
              </div>
            </div>

            {/* Subtopic Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDetailIndex(i)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)',
                    border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`,
                    borderRadius: '0.5rem',
                    color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: selectedDetailIndex === i ? '600' : '400',
                    transition: 'all 0.2s'
                  }}
                >
                  {detail.name}
                </button>
              ))}
            </div>

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = detail.diagram || selectedConcept.diagram
              return (
                <div>
                  {/* Diagram */}
                  {DiagramComponent && (
                    <div style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      border: '1px solid #334155'
                    }}>
                      <DiagramComponent />
                    </div>
                  )}

                  {/* Detail Name */}
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                    {detail.name}
                  </h3>

                  {/* Explanation */}
                  <p style={{
                    color: '#e2e8f0',
                    lineHeight: '1.8',
                    marginBottom: '1rem',
                    background: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'left'
                  }}>
                    {detail.explanation}
                  </p>

                  {/* Code Example */}
                  {detail.codeExample && (
                    <SyntaxHighlighter
                      language="java"
                      style={vscDarkPlus}
                      customStyle={{
                        padding: '1rem',
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.8rem',
                        border: '1px solid #334155',
                        background: '#0f172a'
                      }}
                      codeTagProps={{ style: { background: 'transparent' } }}
                    >
                      {detail.codeExample}
                    </SyntaxHighlighter>
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

export default SpringBoot4

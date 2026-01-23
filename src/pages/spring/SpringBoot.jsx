import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

const FRAMEWORK_COLORS = {
  primary: '#4ade80',
  primaryHover: '#86efac',
  bg: 'rgba(74, 222, 128, 0.1)',
  border: 'rgba(74, 222, 128, 0.3)',
  arrow: '#22c55e',
  hoverBg: 'rgba(74, 222, 128, 0.2)',
  topicBg: 'rgba(74, 222, 128, 0.2)'
}

// Background colors for subtopic descriptions
const SUBTOPIC_COLORS = [
  { bg: 'rgba(74, 222, 128, 0.15)', border: 'rgba(74, 222, 128, 0.3)' },
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

function SpringBoot({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'auto-configuration',
      name: 'Auto-Configuration',
      icon: '⚙️',
      color: '#4ade80',
      description: 'Intelligent bean configuration based on classpath dependencies and conditional logic',
      details: [
        {
          name: 'How It Works',
          explanation: 'Spring Boot\'s auto-configuration dramatically reduces boilerplate by intelligently configuring your application based on classpath dependencies. Conditional annotations (@ConditionalOnClass, @ConditionalOnMissingBean, @ConditionalOnProperty) apply configuration only when conditions are met. @SpringBootApplication combines @Configuration, @EnableAutoConfiguration, and @ComponentScan in one annotation. Uses spring.factories file to discover auto-configuration classes.'
        },
        {
          name: 'Key Features',
          explanation: 'Intelligent bean creation based on classpath scanning and conditional logic. Sensible defaults eliminating manual configuration for common patterns. Selective exclusion of auto-configurations via exclude attribute. Integration with Actuator\'s conditions endpoint to inspect applied configurations. Support for custom auto-configuration classes following same patterns.'
        },
        {
          name: 'Real-World Use Cases',
          explanation: 'Microservices architectures: Quickly spinning up multiple services with consistent configurations. REST APIs: Automatic configuration of web server, JSON processing, validation. Database access: Auto-configuring data sources, JPA, transaction management. Security: Setting up authentication, authorization with minimal configuration. Messaging: Configuring message brokers, templates, and listeners.'
        },
        {
          name: 'Best Practices',
          explanation: 'Understand what\'s being configured using --debug flag or Actuator\'s conditions endpoint. Selectively exclude unwanted auto-configurations using exclude attribute. Create custom auto-configuration classes for organization-specific patterns. Document deviations from auto-configuration defaults. Use @ConditionalOnProperty for feature toggles in custom configurations.'
        },
        {
          name: 'Common Pitfalls',
          explanation: 'Over-relying on auto-configuration without understanding underlying Spring concepts causes debugging confusion. Conflicting configurations between auto-configuration and explicit configuration. Not understanding order of precedence leading to unexpected behavior. Assuming all dependencies will auto-configure when conditions aren\'t met. Forgetting to exclude auto-configurations when providing custom implementations.'
        },
        {
          name: 'When to Use',
          explanation: 'Use auto-configuration for rapid application development, microservices, and standard patterns. Essential for reducing boilerplate in REST APIs, data access, security, and messaging. Most valuable when following Spring Boot conventions. Order of precedence: explicit configuration > property overrides > auto-configuration.'
        }
      ]
    },
    {
      id: 'starter-dependencies',
      name: 'Starter Dependencies',
      icon: '📦',
      color: '#3b82f6',
      description: 'Curated dependency sets providing everything needed for specific use cases in one package',
      details: [
        {
          name: 'How It Works',
          explanation: 'Spring Boot starters are carefully curated dependency sets providing everything needed for specific use cases. Each starter bundles related dependencies for a specific technical capability or pattern. Bill of Materials (BOM) manages compatible versions across all included libraries. Transitive dependencies automatically include everything needed (server, serialization, validation). Version upgrades happen together when upgrading Spring Boot version.'
        },
        {
          name: 'Key Features',
          explanation: '"Batteries included" approach with all necessary dependencies in one declaration. Automatic version compatibility eliminating dependency conflict resolution. Modular composition allowing mixing starters for needed functionality. Transitive dependency management including servers, libraries, and utilities. Support for exclusions and customization when needed.'
        },
        {
          name: 'Common Starters',
          explanation: 'spring-boot-starter-web: REST APIs (Tomcat, Spring MVC, Jackson, Validation). spring-boot-starter-data-jpa: Relational DB (Hibernate, Spring Data JPA, JDBC). spring-boot-starter-security: Authentication and authorization. spring-boot-starter-test: Testing (JUnit 5, Mockito, AssertJ, Spring Test). spring-boot-starter-actuator: Monitoring (metrics, health checks, endpoints). spring-boot-starter-webflux: Reactive web (Reactor Netty, Spring WebFlux).'
        },
        {
          name: 'Real-World Use Cases',
          explanation: 'Microservices: Quickly composing web, data, security, and actuator starters for complete service. REST APIs: spring-boot-starter-web provides server, MVC, JSON, and validation instantly. Data access: spring-boot-starter-data-jpa for relational or spring-boot-starter-data-mongodb for NoSQL. Messaging: spring-boot-starter-kafka or spring-boot-starter-amqp for event-driven architectures. Testing: spring-boot-starter-test bundles JUnit, Mockito, AssertJ for comprehensive test support.'
        },
        {
          name: 'Best Practices',
          explanation: 'Include only starters actually needed to keep application lean and focused. Review transitive dependencies to understand what\'s being included. Use exclusion mechanisms when swapping implementations (e.g., Tomcat to Jetty). Consider creating custom starters for organization-specific patterns. Check Spring Boot documentation for specific library versions in each starter.'
        },
        {
          name: 'Common Pitfalls',
          explanation: 'Adding too many starters bloats application and increases startup time. Starter auto-configurations may conflict with explicit configuration. Not understanding transitive dependencies leading to unexpected libraries. Forgetting to exclude default implementations when providing alternatives. Version conflicts when mixing Spring Boot starters with non-Boot dependencies.'
        }
      ]
    },
    {
      id: 'embedded-servers',
      name: 'Embedded Servers',
      icon: '🌐',
      color: '#8b5cf6',
      description: 'Self-contained web servers packaged directly in your application JAR',
      details: [
        {
          name: 'How It Works',
          explanation: 'Spring Boot\'s embedded servers revolutionize deployment by including the web server directly in your application JAR. Web server (Tomcat, Jetty, Undertow, Reactor Netty) packaged inside application JAR. Application runs with simple java -jar command without separate server deployment. Server lifecycle managed by Spring Boot application context. Same server version embedded ensuring consistency across environments.'
        },
        {
          name: 'Key Features',
          explanation: 'Self-contained executable JARs eliminating WAR deployment to external servers. Simplified deployment with no separate server installation or configuration. Consistent server versions across development, testing, and production. Trivial containerization requiring only JRE and application JAR. Instant application startup from IDE or command line.'
        },
        {
          name: 'Available Servers',
          explanation: 'Tomcat (default): Full Servlet support, extensive documentation, proven production use. Jetty: Lightweight, excellent async I/O, ideal for WebSocket and long-polling. Undertow: High-performance, non-blocking I/O, lowest memory footprint, best for microservices. Reactor Netty: Built for Spring WebFlux, fully non-blocking, optimal for high-concurrency reactive apps.'
        },
        {
          name: 'Real-World Use Cases',
          explanation: 'Microservices: Deploying dozens or hundreds of independent services with embedded servers. Containerization: Docker and Kubernetes deployments with minimal container images. Cloud platforms: AWS Elastic Beanstalk, Google App Engine, Azure App Service compatibility. Standalone tools: Admin utilities and monitoring tools needing HTTP interface. Development: Rapid application testing without external server setup.'
        },
        {
          name: 'Best Practices',
          explanation: 'Choose server based on needs: Tomcat (default, broad compatibility), Undertow (performance), Jetty (WebSocket), Reactor Netty (reactive). Configure thread pools, connection limits, and timeouts for production. Use externalized configuration for server settings allowing tuning without rebuild. Consider reverse proxy (Nginx) for SSL termination, load balancing, security in production. Monitor memory usage and resource consumption per server choice.'
        },
        {
          name: 'Common Pitfalls',
          explanation: 'Assuming default settings are production-ready without tuning thread pools and connection limits. High memory overhead when running multiple instances on same host. Blocking I/O operations on server threads in high-concurrency scenarios. Not implementing graceful shutdown in containerized environments. Ignoring resource management since server and application share same JVM.'
        }
      ]
    },
    {
      id: 'actuator',
      name: 'Actuator',
      icon: '📊',
      color: '#f59e0b',
      description: 'Production-ready monitoring, management, and diagnostic features through HTTP endpoints',
      details: [
        {
          name: 'How It Works',
          explanation: 'Spring Boot Actuator provides production-ready monitoring, management, and diagnostic features. Exposes operational information through HTTP endpoints (/actuator/*) and JMX. Built on Micrometer metrics facade providing vendor-neutral instrumentation. Health check system monitors application components (database, disk, message brokers). Metrics collection includes JVM stats, HTTP requests, database pools, custom metrics. Exports to multiple monitoring systems (Prometheus, Grafana, Datadog, CloudWatch).'
        },
        {
          name: 'Key Features',
          explanation: 'Comprehensive health checks with detailed component status for orchestration platforms. Vendor-neutral metrics collection exportable to multiple monitoring systems. Dynamic logging level adjustment without application restart. Custom endpoints and health indicators for application-specific monitoring. Thread dumps, heap dumps, and bean inspection for debugging. Auto-configuration visibility showing applied configurations.'
        },
        {
          name: 'Common Endpoints',
          explanation: '/actuator/health: Component health checks for Kubernetes probes. /actuator/metrics: JVM, HTTP, database metrics for performance monitoring. /actuator/prometheus: Prometheus-formatted metrics for scraping. /actuator/info: Version, build, git commit information. /actuator/loggers: Dynamic log level modification without restart. /actuator/env: Environment properties for configuration debugging. /actuator/beans: Spring beans and dependencies for DI understanding. /actuator/threaddump: Thread dump for deadlock troubleshooting.'
        },
        {
          name: 'Real-World Use Cases',
          explanation: 'Microservices: Centralized monitoring across dozens of services with Prometheus/Grafana integration. Kubernetes: Health endpoints for liveness and readiness probes. Production debugging: Adjusting log levels, capturing heap dumps, analyzing thread states. Performance monitoring: Tracking HTTP requests, database connections, JVM metrics. Observability: Foundation for monitoring, logging, and tracing practices. SLI/SLO implementation: Tracking Service Level Indicators and Objectives.'
        },
        {
          name: 'Best Practices',
          explanation: 'Secure endpoints with Spring Security requiring authentication for management access. Selectively expose only needed endpoints rather than all endpoints. Integrate with Prometheus for metrics collection and Grafana for visualization. Create custom health indicators for critical external dependencies. Use metric tags for filtering and aggregation in monitoring systems. Cache expensive health check operations to avoid overhead.'
        },
        {
          name: 'Common Pitfalls',
          explanation: 'Exposing endpoints publicly without security leaks sensitive information and enables DoS attacks. Relying solely on health checks without proper logging and distributed tracing. Enabling /shutdown endpoint accidentally allowing external termination. Expensive operations in health indicators impacting load balancer health checks. Not considering performance overhead of metrics collection and heap dumps under high load.'
        }
      ]
    },
    {
      id: 'devtools',
      name: 'DevTools',
      icon: '🛠️',
      color: '#ec4899',
      description: 'Development productivity features including automatic restart and LiveReload',
      details: [
        {
          name: 'How It Works',
          explanation: 'Spring Boot DevTools accelerates development with automatic application restart, LiveReload browser refresh, and development-optimized property defaults. Two-classloader architecture: application code (frequently changing) and dependencies (stable). Monitors classpath for changes and restarts only application classloader (5-10 seconds vs 30-60 seconds full restart). LiveReload integration automatically refreshes browser on static resource changes. Automatically disabled when application is packaged and deployed to production.'
        },
        {
          name: 'Key Features',
          explanation: 'Intelligent fast restart reloading only changed application code, not dependencies. LiveReload browser extension integration for instant frontend feedback. Development-optimized defaults (disabled caching, H2 console, detailed errors). Configurable exclusion patterns for resources that shouldn\'t trigger restarts. Remote DevTools support for cloud development with security configuration.'
        },
        {
          name: 'Real-World Use Cases',
          explanation: 'REST API development: Modifying controllers and testing immediately without manual restart. Full-stack development: LiveReload keeping browser synchronized with backend and frontend changes. Rapid prototyping: Fast iteration cycle enabling flow state during active development. Configuration experimentation: Quick testing of property changes without long restart cycles. Debugging: Fast restart for testing theories and fixes.'
        },
        {
          name: 'Configuration Options',
          explanation: 'spring.devtools.restart.enabled=true enables automatic restart. spring.devtools.restart.additional-paths adds extra directories to watch. spring.devtools.restart.exclude specifies patterns to ignore. spring.devtools.livereload.enabled=true enables browser refresh. spring.devtools.livereload.port=35729 configures LiveReload port. Remote DevTools requires spring.devtools.remote.secret configuration.'
        },
        {
          name: 'Best Practices',
          explanation: 'Add as optional dependency ensuring exclusion from production builds. Configure exclusion patterns for static assets that shouldn\'t trigger restarts. Use with IDE\'s build-on-save feature for optimal experience. Set up development profile with additional debugging properties. Configure remote DevTools with security for cloud development scenarios.'
        },
        {
          name: 'Common Pitfalls',
          explanation: 'Classloader architecture causing issues with libraries using reflection or assuming specific classloader. Automatic restart triggered by irrelevant file changes without proper exclusions. @PostConstruct and lifecycle methods invoked on each restart, not just once. Static field values lost on restart without explicit preservation. Not configuring IDE for automatic build preventing DevTools from working.'
        }
      ]
    },
    {
      id: 'configuration-properties',
      name: 'Configuration Properties',
      icon: '⚙️',
      color: '#14b8a6',
      description: 'Type-safe externalized configuration enabling environment-specific deployments',
      details: [
        {
          name: 'How It Works',
          explanation: 'Spring Boot\'s configuration properties provide type-safe externalized configuration enabling the same binary to work across environments. @ConfigurationProperties binds external configuration to strongly-typed Java objects. Well-defined precedence: command-line args > environment variables > application.properties/yml > defaults. Profile-specific files (application-dev.yml, application-prod.yml) for per-environment overrides. Bean Validation (JSR-303/JSR-380) integration for declarative configuration validation at startup.'
        },
        {
          name: 'Key Features',
          explanation: 'Type-safe configuration with compile-time checking and IDE autocomplete. Centralized configuration management avoiding scattered @Value annotations. Multiple configuration sources with clear precedence order. Profile-based environment-specific configuration. Validation support catching misconfiguration at startup with clear error messages. Integration with ConfigMap and Secrets in Kubernetes.'
        },
        {
          name: 'Real-World Use Cases',
          explanation: 'Environment-varying values: Database connections, API endpoints, feature flags, rate limits. Microservices configuration: Service discovery endpoints, circuit breaker thresholds, retry policies. Feature toggles: Enabling/disabling functionality without code changes. Security: Externalized credentials, JWT secrets, API keys via environment variables. Cloud-native apps: Kubernetes ConfigMap and Secrets integration. Performance tuning: Cache TTLs, thread pool sizes, timeout values.'
        },
        {
          name: 'Property Binding',
          explanation: '@ConfigurationProperties(prefix = "app") binds properties starting with "app." Nested objects supported with dot notation (app.security.jwt-secret). Lists and maps can be bound from YAML or properties files. Relaxed binding allows different formats (app.jwt-secret, APP_JWT_SECRET, app.jwtSecret). Duration and DataSize types have special parsing (10s, 10MB). Constructor binding with @ConstructorBinding for immutable configuration objects.'
        },
        {
          name: 'Best Practices',
          explanation: 'Group related properties into nested objects for organization (app.security.jwt-secret). Provide sensible defaults where possible for optional configuration. Validate all properties with JSR-303 annotations catching errors early. Use @ConfigurationProperties instead of scattered @Value for maintainability. Document properties with Javadoc or generate metadata for IDE support. Store sensitive values in environment variables or secret managers, never in version control.'
        },
        {
          name: 'Common Pitfalls',
          explanation: 'Committing sensitive configuration to version control instead of using environment variables. Property name binding confusion - understand Spring Boot\'s flexible binding conventions. Over-using profiles creating configuration management complexity. Bypassing validation by making everything optional with defaults - fail fast instead. Mixing @Value and @ConfigurationProperties inconsistently. Not understanding property precedence leading to unexpected values.'
        }
      ]
    },
    {
      id: 'spring-boot-annotations',
      name: 'Spring Boot Annotations',
      icon: '🏷️',
      color: '#6366f1',
      description: 'Declarative configuration annotations for application bootstrapping and component management',
      details: [
        {
          name: 'Core Application',
          explanation: '@SpringBootApplication - Combines @Configuration, @EnableAutoConfiguration, and @ComponentScan. Entry point for Spring Boot apps. @EnableAutoConfiguration - Tells Spring Boot to automatically configure beans based on classpath dependencies. @ComponentScan - Scans for Spring components (@Component, @Service, @Repository, @Controller) in specified packages. @Configuration - Marks class as source of bean definitions, replacing XML configuration.'
        },
        {
          name: 'Stereotype Annotations',
          explanation: '@Component - Generic Spring-managed component, base annotation for all stereotypes. @Service - Business logic layer, semantic marker for service classes. @Repository - Data access layer, enables exception translation for persistence exceptions. @Controller - Web layer for MVC controllers returning views. @RestController - Combines @Controller + @ResponseBody for REST APIs returning JSON/XML.'
        },
        {
          name: 'Dependency Injection',
          explanation: '@Autowired - Injects dependencies automatically by type (constructor, field, or setter injection). @Qualifier - Disambiguates when multiple beans of same type exist. @Primary - Marks bean as primary candidate when multiple beans qualify. @Value - Injects values from properties files or SpEL expressions. @Bean - Declares a method as a bean producer in @Configuration classes.'
        },
        {
          name: 'Web/REST Annotations',
          explanation: '@RequestMapping - Maps HTTP requests to handler methods (class or method level). @GetMapping, @PostMapping, @PutMapping, @DeleteMapping, @PatchMapping - Shortcuts for specific HTTP methods. @PathVariable - Extracts values from URI path (e.g., /users/{id}). @RequestParam - Extracts query parameters from URL. @RequestBody - Binds HTTP request body to method parameter (JSON to object). @ResponseBody - Writes return value directly to HTTP response body. @ResponseStatus - Sets HTTP status code for response.'
        },
        {
          name: 'JPA/Data Annotations',
          explanation: '@Entity - Marks class as JPA entity mapped to database table. @Table - Specifies table name and schema. @Id - Marks primary key field. @GeneratedValue - Configures primary key generation strategy. @Column - Customizes column mapping (name, nullable, length). @Transactional - Manages transaction boundaries. @Query - Custom JPQL or native SQL queries in repositories.'
        },
        {
          name: 'Conditional Annotations',
          explanation: '@ConditionalOnClass - Applies configuration only if specified class is on classpath. @ConditionalOnMissingBean - Applies only if specified bean doesn\'t exist. @ConditionalOnProperty - Applies based on property value. @Profile - Activates beans only for specific profiles (dev, prod, test). These annotations enable selective configuration based on runtime conditions.'
        }
      ]
    }
  ]

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
      { name: 'Frameworks', icon: '🌱', onClick: onBack }
    ]

    if (selectedConcept) {
      stack.push({ name: 'Spring Boot', icon: '🚀', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'Spring Boot', icon: '🚀' })
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
    background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 50%, #0f172a 100%)',
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
    background: 'rgba(74, 222, 128, 0.2)',
    border: '1px solid rgba(74, 222, 128, 0.3)',
    borderRadius: '0.5rem',
    color: '#4ade80',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  const navButtonStyle = {
    padding: '0.75rem 1.25rem',
    background: 'rgba(74, 222, 128, 0.2)',
    border: '1px solid rgba(74, 222, 128, 0.3)',
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
              e.currentTarget.style.background = 'rgba(74, 222, 128, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(74, 222, 128, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            ← Back to Frameworks
          </button>
          <h1 style={titleStyle}>Spring Boot</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {onPrevious && (
            <button
              style={navButtonStyle}
              onClick={onPrevious}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(74, 222, 128, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(74, 222, 128, 0.2)'
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
                e.currentTarget.style.background = 'rgba(74, 222, 128, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(74, 222, 128, 0.2)'
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
              {concept.details.length} topics • Click to explore
            </div>
          </div>
        ))}
      </div>

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
              maxWidth: '1200px',
              maxHeight: '92vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
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
                  <p style={{ color: '#e2e8f0', lineHeight: '1.8', marginBottom: '1rem', background: colorScheme.bg, border: `1px solid ${colorScheme.border}`, borderRadius: '0.5rem', padding: '1rem', textAlign: 'left' }}>{detail.explanation}</p>
                </div>
              )
            })()}

          </div>
        </div>
      )}
    </div>
  )
}

export default SpringBoot

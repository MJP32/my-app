// Global search index for the application
// This file creates a comprehensive searchable index of all content

// Define category groups locally to avoid circular imports
const categoryGroups = {
  'Java': {
    icon: '☕',
    color: '#f59e0b',
    items: ['Core Java', 'Java 8', 'Java 11', 'Java 15', 'Java 21', 'Java 24']
  },
  'Design': {
    icon: '🎨',
    color: '#8b5cf6',
    items: ['Design Patterns', 'Microservice Design Patterns', 'Class', 'System Design', 'Module', 'Function', 'Interface', 'Event Driven Architecture', 'Domain Driven Design', 'L3 System Design', 'L4 System Design', 'L5 System Design']
  },
  'System Design Topics': {
    icon: '🏗️',
    color: '#8b5cf6',
    items: ['Load Balancing', 'Caching Strategies', 'Database Sharding', 'CAP Theorem', 'Consistency Patterns', 'API Design', 'Message Queues', 'CDN', 'Database Replication', 'Scaling', 'Proxies', 'Data Partitioning', 'SQL vs NoSQL', 'Consistent Hashing', 'WebSockets', 'Blob Storage', 'Microservices', 'Event-Driven']
  },
  'Databases': {
    icon: '🗃️',
    color: '#3b82f6',
    items: ['SQL', 'NoSQL', 'Oracle', 'ORM', 'Redis', 'PL/SQL', 'StoredProcedures', 'DatabaseOptimization', 'PostgreSQL', 'SQLFundamentals', 'Hibernate']
  },
  'Frameworks': {
    icon: '🌱',
    color: '#ec4899',
    items: ['Spring', 'Spring Boot', 'REST API', 'Dependency Injection', 'gRPC', 'SOAP', 'React', 'Angular', 'GraphQL', 'Actuator', 'Zipkin', 'Spring Batch', 'Spring Security', 'Ehcache']
  },
  'DevOps': {
    icon: '🛠️',
    color: '#0ea5e9',
    items: ['DevOps', 'Deployment', 'Docker', 'Kubernetes', 'Testing', 'CI/CD', 'Agile Scrum', 'Production Support', 'TeamCity', 'Jenkins', 'Prometheus', 'Grafana', 'Ansible', 'Unix Scripting', 'Java Flight Recorder', 'JMeter', 'Dynatrace']
  },
  'Messaging': {
    icon: '📨',
    color: '#f43f5e',
    items: ['Kafka', 'Apache Flink', 'Solace', 'RabbitMQ', 'MuleSoft']
  },
  'Security': {
    icon: '🔒',
    color: '#ef4444',
    items: ['Security OWASP', 'JWT', 'OAuth', 'OAuth2']
  },
  'Cloud': {
    icon: '☁️',
    color: '#0ea5e9',
    items: ['AWS', 'GCP', 'Azure']
  },
  'Python': {
    icon: '🐍',
    color: '#3b82f6',
    items: ['Python', 'Core Python', 'Python OOP', 'Index Slicing', 'Bitwise Operations', 'List Comprehension', 'Lambda', 'Bisect Functions', 'Python Advanced', 'Data Science', 'Machine Learning', 'Web Frameworks', 'Async Python', 'Python Set Operations', 'Python Dict Operations', 'Python Tuples', 'Python Map Functions', 'Python String Methods', 'Python Heaps', 'Python Pitfalls', 'Python Regex', 'Python Combinations', 'Itertools', 'Collections Module', 'Python Deque', 'Python Counter', 'Python DefaultDict', 'Python NamedTuple', 'Python ChainMap', 'Sorting Functions', 'LeetCode Patterns', 'DP Patterns', 'Sorting Algorithms', 'String Algorithms', 'Math Functions', 'Builtin Functions', 'Functools', 'Copy Module', 'Decorators', 'Generators']
  },
  'eTrading': {
    icon: '💹',
    color: '#f59e0b',
    items: ['eTrading', 'RFQ Systems', 'Fixed Income Trading', 'Aeron Messaging', 'Low Latency', 'Latency Measurement', 'Order Management', 'Execution Algorithms', 'Automated Hedging', 'FIX Protocol', 'Java Trading', 'Risk Management', 'Price Contribution', 'Distributed Systems', 'Disruptor Pattern']
  },
  'Projects': {
    icon: '📁',
    color: '#f59e0b',
    items: ['Var/CVar', 'Var/CVar - Advanced', 'Var/CVar 3', 'Dark Pool Matching Engine', 'Dark Pool Matching Engine - Basic', 'Dark Pool Engine 3', 'Medi/Health', 'Monolith to Microservice', 'Financial Banking']
  },
  'Practice': {
    icon: '💪',
    color: '#10b981',
    hasSubcategories: true,
    subcategories: {
      'Data Structures': {
        icon: '📊',
        items: ['Arrays', 'Strings', 'Linked Lists', 'Stacks', 'Queues', 'Hash Tables', 'Trees', 'Binary Trees', 'Binary Search Trees', 'Heaps', 'Graphs', 'Tries']
      },
      'Algorithms': {
        icon: '🎯',
        items: ['Searching', 'Binary Search', 'Sorting', 'Recursion', 'Dynamic Programming', 'Dynamic Programming Patterns', 'Greedy Algorithms', 'Famous Algorithms', 'Union Find', 'Trie', 'Two Pointers', 'Sliding Window', 'Backtracking']
      },
      'Java Features': {
        icon: '☕',
        items: ['Streams', 'Streams Advanced', 'Lambdas', 'Lambdas Advanced', 'Functional Interfaces', 'Collections Framework', 'Optional']
      },
      'Concurrency': {
        icon: '🔀',
        items: ['Concurrency', 'Multithreading']
      },
      'Core Java Fundamentals': {
        icon: '⚙️',
        items: ['Object-Oriented Programming', 'Exception Handling', 'File I/O', 'JVM Internals', 'Memory Management', 'Data Structures', 'Strings', 'Generics']
      },
      'System Design': {
        icon: '🛠️',
        items: ['Design Patterns Practice', 'LRU Cache', 'Rate Limiter', 'Design Problems']
      },
      'Frameworks': {
        icon: '🌱',
        items: ['Spring Annotations Questions']
      }
    }
  }
}

// Create comprehensive search index
export const createSearchIndex = () => {
  const searchIndex = []

  // Add top-level categories
  Object.entries(categoryGroups).forEach(([categoryName, categoryData]) => {
    searchIndex.push({
      id: `category-${categoryName}`,
      type: 'category',
      title: categoryName,
      description: `${categoryData.icon} ${categoryName} - Main category`,
      icon: categoryData.icon,
      color: categoryData.color,
      path: [categoryName],
      breadcrumb: categoryName,
      keywords: [categoryName.toLowerCase()],
      navigateTo: () => ({ type: 'category', value: categoryName })
    })

    // Add subcategories if they exist
    if (categoryData.hasSubcategories && categoryData.subcategories) {
      Object.entries(categoryData.subcategories).forEach(([subName, subData]) => {
        searchIndex.push({
          id: `subcategory-${categoryName}-${subName}`,
          type: 'subcategory',
          title: subName,
          description: `${subData.icon} ${subName} - ${subData.items.length} items`,
          icon: subData.icon,
          color: categoryData.color,
          path: [categoryName, subName],
          breadcrumb: `${categoryName} → ${subName}`,
          keywords: [subName.toLowerCase(), categoryName.toLowerCase()],
          navigateTo: () => ({ type: 'subcategory', category: categoryName, subcategory: subName })
        })

        // Add items within subcategories
        subData.items.forEach(item => {
          searchIndex.push({
            id: `item-${categoryName}-${subName}-${item}`,
            type: 'component',
            title: item,
            description: `${item} - Practice component`,
            icon: subData.icon,
            color: categoryData.color,
            path: [categoryName, subName, item],
            breadcrumb: `${categoryName} → ${subName} → ${item}`,
            keywords: [item.toLowerCase(), subName.toLowerCase(), categoryName.toLowerCase()],
            navigateTo: () => ({ type: 'component', value: item })
          })
        })
      })
    } else {
      // Add regular category items
      categoryData.items.forEach(item => {
        searchIndex.push({
          id: `item-${categoryName}-${item}`,
          type: 'component',
          title: item,
          description: `${item} - ${categoryName} component`,
          icon: categoryData.icon,
          color: categoryData.color,
          path: [categoryName, item],
          breadcrumb: `${categoryName} → ${item}`,
          keywords: [item.toLowerCase(), categoryName.toLowerCase()],
          navigateTo: () => ({ type: 'component', value: item })
        })
      })
    }
  })

  // Add detailed component descriptions from optionGroups
  const detailedComponents = [
    // Core Programming
    { value: 'Core Java', title: 'Core Java', description: 'Comprehensive Java programming fundamentals including OOP principles, collections framework, exception handling, multithreading, and JVM internals.', keywords: ['java', 'oop', 'collections', 'multithreading', 'jvm', 'programming', 'fundamentals'] },
    { value: 'Java 8', title: 'Java 8', description: 'Java 8 features including lambda expressions, streams API, optional, method references, and functional programming.', keywords: ['java8', 'lambda', 'streams', 'optional', 'functional', 'programming'] },
    { value: 'Java 11', title: 'Java 11', description: 'Java 11 LTS features including HTTP client, local variable type inference, and module system.', keywords: ['java11', 'http', 'client', 'modules', 'lts'] },
    { value: 'Java 21', title: 'Java 21', description: 'Java 21 LTS with virtual threads, pattern matching, record patterns, and structured concurrency.', keywords: ['java21', 'virtual', 'threads', 'loom', 'pattern', 'matching', 'records'] },
    // Frameworks
    { value: 'Spring', title: 'Spring Framework', description: 'Spring framework including dependency injection, AOP, MVC, and enterprise application development.', keywords: ['spring', 'dependency', 'injection', 'aop', 'mvc', 'framework'] },
    { value: 'Spring Boot', title: 'Spring Boot', description: 'Opinionated framework for rapid application development with auto-configuration and embedded servers.', keywords: ['springboot', 'boot', 'auto', 'configuration', 'starter', 'actuator'] },
    { value: 'REST API', title: 'REST API', description: 'RESTful web services design with HTTP methods, status codes, and API best practices.', keywords: ['rest', 'api', 'restful', 'http', 'web', 'services', 'endpoint'] },
    { value: 'Dependency Injection', title: 'Dependency Injection', description: 'DI design pattern with IoC containers, constructor injection, and Spring DI.', keywords: ['dependency', 'injection', 'ioc', 'inversion', 'control', 'di'] },
    { value: 'Hibernate', title: 'Hibernate', description: 'Hibernate ORM framework for Java persistence, entity mapping, and database operations.', keywords: ['hibernate', 'orm', 'jpa', 'persistence', 'entity', 'mapping'] },
    { value: 'gRPC', title: 'gRPC', description: 'High-performance RPC framework using Protocol Buffers and HTTP/2.', keywords: ['grpc', 'rpc', 'protobuf', 'protocol', 'buffers', 'http2', 'streaming'] },
    { value: 'SOAP', title: 'SOAP', description: 'SOAP web services with WSDL, XML messaging, and WS-Security.', keywords: ['soap', 'wsdl', 'xml', 'web', 'services', 'ws-security'] },
    { value: 'React', title: 'React', description: 'React JavaScript library for building user interfaces with components and hooks.', keywords: ['react', 'javascript', 'jsx', 'components', 'hooks', 'frontend', 'ui'] },
    { value: 'Angular', title: 'Angular', description: 'Full-featured TypeScript framework for building scalable single-page applications with components, services, and dependency injection.', keywords: ['angular', 'typescript', 'components', 'directives', 'services', 'dependency injection', 'rxjs', 'ngrx', 'routing', 'guards', 'pipes', 'modules'] },
    { value: 'GraphQL', title: 'GraphQL', description: 'Query language for APIs with strong typing, schema-first design, and real-time subscriptions.', keywords: ['graphql', 'query', 'mutation', 'subscription', 'schema', 'resolver', 'apollo', 'dataloader', 'n+1', 'introspection', 'sdl', 'fragments'] },
    { value: 'Actuator', title: 'Actuator', description: 'Spring Boot Actuator for monitoring, health checks, and production-ready features.', keywords: ['actuator', 'monitoring', 'health', 'metrics', 'prometheus', 'production'] },
    { value: 'Zipkin', title: 'Zipkin', description: 'Distributed tracing system for monitoring microservice architectures.', keywords: ['zipkin', 'tracing', 'distributed', 'sleuth', 'micrometer', 'observability', 'spans'] },
    { value: 'Spring Batch', title: 'Spring Batch', description: 'Batch processing framework for enterprise jobs with chunk-oriented processing.', keywords: ['spring batch', 'batch', 'chunk', 'job', 'step', 'reader', 'processor', 'writer', 'itemreader', 'itemwriter', 'tasklet', 'scheduling'] },
    { value: 'Spring Security', title: 'Spring Security', description: 'Authentication and authorization framework for securing Spring applications with JWT, OAuth2, and CSRF protection.', keywords: ['spring security', 'authentication', 'authorization', 'jwt', 'oauth2', 'csrf', 'cors', 'filter chain', 'password encoder', 'bcrypt', 'role', 'permission', 'method security', 'preauthorize'] },
    { value: 'Ehcache', title: 'Ehcache', description: 'Java-based caching library with tiered storage, Spring Cache integration, and Hibernate L2 cache support.', keywords: ['ehcache', 'cache', 'caching', 'jcache', 'jsr-107', 'tiered', 'heap', 'offheap', 'disk', 'ttl', 'tti', 'eviction', 'spring cache', 'cacheable', 'hibernate l2', 'second level cache', 'terracotta', 'distributed cache'] },
    // Databases
    { value: 'SQL', title: 'SQL', description: 'Structured Query Language for database operations, joins, indexing, and optimization.', keywords: ['sql', 'database', 'query', 'joins', 'indexing', 'optimization'] },
    { value: 'NoSQL', title: 'NoSQL', description: 'NoSQL databases including MongoDB, Cassandra, and document/key-value stores.', keywords: ['nosql', 'mongodb', 'cassandra', 'document', 'keyvalue', 'database'] },
    { value: 'Redis', title: 'Redis', description: 'In-memory data store for caching, session management, and real-time applications.', keywords: ['redis', 'cache', 'caching', 'inmemory', 'key', 'value', 'pub', 'sub'] },
    { value: 'PostgreSQL', title: 'PostgreSQL', description: 'Advanced open-source relational database with JSONB, full-text search, and extensions.', keywords: ['postgresql', 'postgres', 'pg', 'relational', 'database', 'jsonb'] },
    { value: 'PL/SQL', title: 'PL/SQL', description: 'Oracle procedural language extension for SQL with stored procedures and triggers.', keywords: ['plsql', 'pl', 'sql', 'oracle', 'stored', 'procedure', 'trigger'] },
    { value: 'StoredProcedures', title: 'Stored Procedures', description: 'Database stored procedures, functions, and server-side programming.', keywords: ['stored', 'procedures', 'functions', 'database', 'server', 'side'] },
    { value: 'DatabaseOptimization', title: 'Database Optimization', description: 'Database performance tuning, query optimization, and indexing strategies.', keywords: ['database', 'optimization', 'performance', 'tuning', 'indexing', 'query'] },
    { value: 'SQLFundamentals', title: 'SQL Fundamentals', description: 'SQL basics including SELECT, INSERT, UPDATE, DELETE, and fundamental operations.', keywords: ['sql', 'fundamentals', 'basics', 'select', 'insert', 'update', 'delete'] },
    // DevOps
    { value: 'Docker', title: 'Docker', description: 'Containerization with Docker including images, containers, networking, and orchestration.', keywords: ['docker', 'container', 'containerization', 'images', 'networking', 'orchestration'] },
    { value: 'Kubernetes', title: 'Kubernetes', description: 'Container orchestration with Kubernetes including pods, services, deployments, and scaling.', keywords: ['kubernetes', 'k8s', 'orchestration', 'pods', 'services', 'deployments', 'scaling'] },
    { value: 'CI/CD', title: 'CI/CD', description: 'Continuous integration and deployment with Jenkins, GitHub Actions, GitLab CI, and ArgoCD.', keywords: ['ci', 'cd', 'cicd', 'jenkins', 'github', 'actions', 'gitlab', 'pipeline', 'continuous'] },
    { value: 'Prometheus', title: 'Prometheus', description: 'Prometheus monitoring and alerting toolkit for metrics collection and time-series data.', keywords: ['prometheus', 'monitoring', 'metrics', 'alerting', 'time-series', 'grafana'] },
    { value: 'Grafana', title: 'Grafana', description: 'Grafana dashboards for visualizing metrics, logs, and monitoring data.', keywords: ['grafana', 'dashboard', 'visualization', 'monitoring', 'metrics', 'panels'] },
    { value: 'TeamCity', title: 'TeamCity', description: 'TeamCity CI/CD server for build automation and continuous integration.', keywords: ['teamcity', 'ci', 'cd', 'build', 'automation', 'jetbrains'] },
    { value: 'Jenkins', title: 'Jenkins', description: 'Jenkins automation server for continuous integration and delivery pipelines.', keywords: ['jenkins', 'ci', 'cd', 'pipeline', 'automation', 'build'] },
    { value: 'Ansible', title: 'Ansible', description: 'Ansible automation for configuration management, provisioning, and deployment.', keywords: ['ansible', 'automation', 'configuration', 'management', 'provisioning', 'playbook'] },
    { value: 'Unix Scripting', title: 'Unix Scripting', description: 'Unix shell scripting with bash, command-line tools, and system administration.', keywords: ['unix', 'scripting', 'bash', 'shell', 'linux', 'command', 'line'] },
    { value: 'Java Flight Recorder', title: 'Java Flight Recorder', description: 'Java Flight Recorder for profiling, diagnostics, and performance monitoring.', keywords: ['jfr', 'flight', 'recorder', 'profiling', 'diagnostics', 'performance', 'java'] },
    { value: 'JMeter', title: 'JMeter', description: 'Apache JMeter for load testing, performance testing, and stress testing applications.', keywords: ['jmeter', 'load', 'testing', 'performance', 'stress', 'benchmark'] },
    { value: 'Dynatrace', title: 'Dynatrace', description: 'Dynatrace application performance monitoring and observability platform.', keywords: ['dynatrace', 'apm', 'monitoring', 'observability', 'performance', 'tracing'] },
    // Messaging
    { value: 'Kafka', title: 'Apache Kafka', description: 'Distributed streaming platform for building real-time data pipelines and streaming applications.', keywords: ['kafka', 'streaming', 'messaging', 'distributed', 'realtime', 'pipelines'] },
    { value: 'Apache Flink', title: 'Apache Flink', description: 'Stream processing framework for real-time analytics and event-driven applications.', keywords: ['flink', 'stream', 'processing', 'realtime', 'analytics', 'event', 'driven'] },
    { value: 'RabbitMQ', title: 'RabbitMQ', description: 'AMQP message broker with flexible routing and high availability.', keywords: ['rabbitmq', 'rabbit', 'amqp', 'message', 'broker', 'queue'] },
    { value: 'Solace', title: 'Solace', description: 'Enterprise event mesh platform for hybrid cloud messaging.', keywords: ['solace', 'pubsub', 'event', 'mesh', 'messaging', 'enterprise'] },
    { value: 'MuleSoft', title: 'MuleSoft', description: 'Integration platform for connecting applications, data, and APIs.', keywords: ['mulesoft', 'mule', 'integration', 'api', 'esb', 'anypoint'] },
    // Security
    { value: 'JWT', title: 'JWT', description: 'JSON Web Tokens for stateless authentication and authorization.', keywords: ['jwt', 'json', 'web', 'token', 'authentication', 'authorization', 'bearer'] },
    { value: 'OAuth', title: 'OAuth', description: 'OAuth authentication and authorization framework for secure API access.', keywords: ['oauth', 'authentication', 'authorization', 'token', 'openid', 'connect'] },
    { value: 'OAuth2', title: 'OAuth2', description: 'OAuth 2.0 authorization framework with grant types and token management.', keywords: ['oauth2', 'authorization', 'code', 'grant', 'client', 'credentials', 'pkce'] },
    // Cloud
    { value: 'AWS', title: 'Amazon Web Services', description: 'AWS cloud services including EC2, S3, Lambda, RDS, and cloud architecture.', keywords: ['aws', 'amazon', 'cloud', 'ec2', 's3', 'lambda', 'rds', 'architecture'] },
    { value: 'GCP', title: 'Google Cloud Platform', description: 'Google Cloud services including Compute Engine, BigQuery, GKE, and Cloud Functions.', keywords: ['gcp', 'google', 'cloud', 'bigquery', 'gke', 'compute', 'engine'] },
    { value: 'Azure', title: 'Microsoft Azure', description: 'Microsoft Azure cloud services including VMs, AKS, Azure SQL, and Active Directory.', keywords: ['azure', 'microsoft', 'cloud', 'aks', 'active', 'directory', 'virtual'] },
    // Design
    { value: 'Design Patterns', title: 'Design Patterns', description: 'Gang of Four design patterns including creational, structural, and behavioral patterns.', keywords: ['design', 'patterns', 'gof', 'creational', 'structural', 'behavioral'] },
    { value: 'Microservice Design Patterns', title: 'Microservice Design Patterns', description: 'Microservice architecture patterns including API gateway, circuit breaker, and service mesh.', keywords: ['microservice', 'architecture', 'api', 'gateway', 'circuit', 'breaker', 'service', 'mesh'] },
    { value: 'System Design', title: 'System Design', description: 'System architecture with scalability, high availability, load balancing, and caching.', keywords: ['system', 'design', 'architecture', 'scalability', 'availability', 'distributed'] },
    { value: 'Load Balancing', title: 'Load Balancing', description: 'Load balancing algorithms and strategies for distributing traffic.', keywords: ['load', 'balancing', 'round', 'robin', 'nginx', 'haproxy', 'traffic'] },
    { value: 'Caching Strategies', title: 'Caching Strategies', description: 'Caching patterns including write-through, write-back, and cache-aside.', keywords: ['caching', 'cache', 'redis', 'memcached', 'cdn', 'eviction', 'ttl'] },
    { value: 'CAP Theorem', title: 'CAP Theorem', description: 'CAP theorem explaining consistency, availability, and partition tolerance trade-offs.', keywords: ['cap', 'theorem', 'consistency', 'availability', 'partition', 'tolerance'] },
    // Projects
    { value: 'Var/CVar', title: 'VaR/CVaR', description: 'Value at Risk and Conditional Value at Risk calculations for financial risk management.', keywords: ['var', 'cvar', 'risk', 'financial', 'value', 'conditional'] },
    { value: 'Dark Pool Matching Engine', title: 'Dark Pool Matching Engine', description: 'Dark pool trading system with order matching algorithms and liquidity optimization.', keywords: ['dark', 'pool', 'matching', 'engine', 'trading', 'order', 'book'] },
    { value: 'Financial Banking', title: 'Financial Banking', description: 'Financial transaction processing, payment systems, and banking domain concepts.', keywords: ['financial', 'banking', 'payment', 'transaction', 'settlement'] },
    // eTrading
    { value: 'eTrading', title: 'eTrading', description: 'Electronic trading systems and platforms for financial markets.', keywords: ['etrading', 'electronic', 'trading', 'financial', 'markets', 'exchange'] },
    { value: 'FIX Protocol', title: 'FIX Protocol', description: 'Financial Information eXchange protocol for electronic trading communication.', keywords: ['fix', 'protocol', 'financial', 'information', 'exchange', 'trading'] },
    { value: 'Low Latency', title: 'Low Latency', description: 'Low-latency system design for high-frequency trading and real-time applications.', keywords: ['low', 'latency', 'performance', 'nanoseconds', 'hft', 'fast'] },
    // Python
    { value: 'Python', title: 'Python', description: 'Python programming language fundamentals and advanced concepts.', keywords: ['python', 'programming', 'scripting', 'language'] },
    { value: 'Dynamic Programming', title: 'Dynamic Programming', description: 'Optimization problems using memoization and tabulation techniques.', keywords: ['dynamic', 'programming', 'dp', 'memoization', 'tabulation', 'optimization'] },
    // Threading
    { value: 'Threading Questions', title: 'Threading Questions', description: 'Threading and concurrency interview questions covering race conditions, deadlocks, producer-consumer, volatile, thread pools, virtual threads, semaphores, and GIL.', keywords: ['threading', 'concurrency', 'deadlock', 'race condition', 'synchronization', 'thread pool', 'volatile', 'producer consumer', 'gil', 'semaphore', 'countdownlatch', 'completablefuture', 'virtual threads', 'livelock', 'atomic'] }
  ]

  // Enhance existing entries with detailed descriptions
  detailedComponents.forEach(component => {
    const existingIndex = searchIndex.findIndex(item => 
      item.title === component.title || item.title === component.value
    )
    
    if (existingIndex !== -1) {
      searchIndex[existingIndex].description = component.description
      searchIndex[existingIndex].keywords = [
        ...searchIndex[existingIndex].keywords,
        ...component.keywords
      ]
    }
  })

  // Add sub-page section entries for concept cards within pages
  const subPageSections = [
    // Spring ecosystem
    { page: 'Spring', sectionId: 'core-container', title: 'Core Container', icon: '🌱', keywords: ['ioc', 'container', 'bean', 'spring'] },
    { page: 'Spring', sectionId: 'dependency-injection', title: 'Dependency Injection', icon: '🌱', keywords: ['di', 'injection', 'autowired', 'spring'] },
    { page: 'Spring', sectionId: 'bean-lifecycle', title: 'Bean Lifecycle', icon: '🌱', keywords: ['bean', 'lifecycle', 'init', 'destroy', 'spring'] },
    { page: 'Spring', sectionId: 'aop-support', title: 'AOP Support', icon: '🌱', keywords: ['aop', 'aspect', 'pointcut', 'advice', 'spring'] },
    { page: 'Spring', sectionId: 'transaction-management', title: 'Transaction Management', icon: '🌱', keywords: ['transaction', 'transactional', 'rollback', 'spring'] },
    { page: 'Spring', sectionId: 'auto-configuration', title: 'Auto Configuration', icon: '🌱', keywords: ['auto', 'configuration', 'spring'] },
    { page: 'Spring', sectionId: 'actuator', title: 'Spring Actuator', icon: '🌱', keywords: ['actuator', 'health', 'metrics', 'spring'] },
    { page: 'Spring', sectionId: 'spring-data-jpa', title: 'Spring Data JPA', icon: '🌱', keywords: ['data', 'jpa', 'repository', 'spring'] },
    { page: 'Spring', sectionId: 'spring-mvc', title: 'Spring MVC', icon: '🌱', keywords: ['mvc', 'controller', 'web', 'spring'] },
    { page: 'Spring', sectionId: 'spring-security', title: 'Spring Security', icon: '🌱', keywords: ['security', 'authentication', 'authorization', 'spring'] },
    { page: 'Spring', sectionId: 'spring-cloud', title: 'Spring Cloud', icon: '🌱', keywords: ['cloud', 'eureka', 'config', 'gateway', 'spring'] },
    { page: 'Spring', sectionId: 'spring-batch', title: 'Spring Batch', icon: '🌱', keywords: ['batch', 'job', 'step', 'chunk', 'spring'] },
    { page: 'Spring', sectionId: 'spring-annotations', title: 'Spring Annotations', icon: '🌱', keywords: ['annotations', 'component', 'service', 'spring'] },

    // Spring Boot
    { page: 'Spring Boot', sectionId: 'auto-configuration', title: 'Auto-Configuration', icon: '🚀', keywords: ['auto', 'configuration', 'conditional', 'spring boot'] },
    { page: 'Spring Boot', sectionId: 'starter-dependencies', title: 'Starter Dependencies', icon: '🚀', keywords: ['starter', 'dependencies', 'pom', 'spring boot'] },
    { page: 'Spring Boot', sectionId: 'embedded-servers', title: 'Embedded Servers', icon: '🚀', keywords: ['embedded', 'tomcat', 'jetty', 'server', 'spring boot'] },
    { page: 'Spring Boot', sectionId: 'actuator', title: 'Spring Boot Actuator', icon: '🚀', keywords: ['actuator', 'health', 'metrics', 'spring boot'] },
    { page: 'Spring Boot', sectionId: 'devtools', title: 'DevTools', icon: '🚀', keywords: ['devtools', 'livereload', 'restart', 'spring boot'] },
    { page: 'Spring Boot', sectionId: 'configuration-properties', title: 'Configuration Properties', icon: '🚀', keywords: ['configuration', 'properties', 'yaml', 'spring boot'] },
    { page: 'Spring Boot', sectionId: 'spring-boot-annotations', title: 'Spring Boot Annotations', icon: '🚀', keywords: ['annotations', 'springbootapplication', 'spring boot'] },

    // REST API
    { page: 'REST API', sectionId: 'rest-principles', title: 'REST Principles', icon: '🌐', keywords: ['rest', 'principles', 'stateless', 'uniform'] },
    { page: 'REST API', sectionId: 'http-methods', title: 'HTTP Methods & Status Codes', icon: '🌐', keywords: ['http', 'get', 'post', 'put', 'delete', 'status'] },
    { page: 'REST API', sectionId: 'resource-design', title: 'Resource Design', icon: '🌐', keywords: ['resource', 'uri', 'naming', 'rest'] },
    { page: 'REST API', sectionId: 'spring-boot-rest', title: 'Spring Boot REST', icon: '🌐', keywords: ['spring', 'boot', 'restcontroller', 'rest'] },
    { page: 'REST API', sectionId: 'api-security', title: 'API Security', icon: '🌐', keywords: ['api', 'security', 'oauth', 'jwt', 'rest'] },
    { page: 'REST API', sectionId: 'api-documentation', title: 'API Documentation', icon: '🌐', keywords: ['swagger', 'openapi', 'documentation', 'rest'] },
    { page: 'REST API', sectionId: 'api-best-practices', title: 'API Best Practices', icon: '🌐', keywords: ['best', 'practices', 'versioning', 'pagination', 'rest'] },

    // gRPC
    { page: 'gRPC', sectionId: 'grpc-fundamentals', title: 'gRPC Fundamentals', icon: '⚡', keywords: ['grpc', 'fundamentals', 'protobuf', 'http2'] },
    { page: 'gRPC', sectionId: 'grpc-server', title: 'gRPC Server Implementation', icon: '⚡', keywords: ['grpc', 'server', 'implementation', 'service'] },
    { page: 'gRPC', sectionId: 'grpc-client', title: 'gRPC Client Implementation', icon: '⚡', keywords: ['grpc', 'client', 'stub', 'channel'] },
    { page: 'gRPC', sectionId: 'streaming', title: 'gRPC Streaming', icon: '⚡', keywords: ['grpc', 'streaming', 'bidirectional', 'server-streaming'] },

    // Hibernate
    { page: 'Hibernate', sectionId: 'hibernate-basics', title: 'Hibernate Basics & ORM', icon: '🗄️', keywords: ['hibernate', 'orm', 'jpa', 'basics'] },
    { page: 'Hibernate', sectionId: 'entity-relationships', title: 'Entity Relationships', icon: '🗄️', keywords: ['entity', 'relationship', 'onetomany', 'manytoone', 'hibernate'] },
    { page: 'Hibernate', sectionId: 'session-management', title: 'Session Management', icon: '🗄️', keywords: ['session', 'entitymanager', 'persistence', 'hibernate'] },
    { page: 'Hibernate', sectionId: 'caching-strategies', title: 'Caching Strategies', icon: '🗄️', keywords: ['cache', 'caching', 'l1', 'l2', 'hibernate'] },

    // SOAP
    { page: 'SOAP', sectionId: 'soap-fundamentals', title: 'SOAP Fundamentals', icon: '📦', keywords: ['soap', 'fundamentals', 'xml', 'envelope'] },
    { page: 'SOAP', sectionId: 'jax-ws-implementation', title: 'JAX-WS Implementation', icon: '📦', keywords: ['jax-ws', 'implementation', 'web service', 'soap'] },
    { page: 'SOAP', sectionId: 'wsdl-client-generation', title: 'WSDL & Client Generation', icon: '📦', keywords: ['wsdl', 'client', 'generation', 'soap'] },
    { page: 'SOAP', sectionId: 'soap-client-error-handling', title: 'SOAP Client & Error Handling', icon: '📦', keywords: ['soap', 'client', 'error', 'fault'] },

    // SQL
    { page: 'SQL', sectionId: 'query-optimization', title: 'SQL Query Optimization', icon: '🗃️', keywords: ['query', 'optimization', 'explain', 'sql'] },
    { page: 'SQL', sectionId: 'database-design', title: 'Database Design', icon: '🗃️', keywords: ['database', 'design', 'normalization', 'schema', 'sql'] },
    { page: 'SQL', sectionId: 'transactions', title: 'Transactions & ACID', icon: '🗃️', keywords: ['transaction', 'acid', 'isolation', 'sql'] },
    { page: 'SQL', sectionId: 'performance-tuning', title: 'SQL Performance Tuning', icon: '🗃️', keywords: ['performance', 'tuning', 'indexing', 'sql'] },
    { page: 'SQL', sectionId: 'advanced-sql', title: 'Advanced SQL Features', icon: '🗃️', keywords: ['advanced', 'window', 'cte', 'recursive', 'sql'] },
    { page: 'SQL', sectionId: 'replication-ha', title: 'Replication & High Availability', icon: '🗃️', keywords: ['replication', 'high availability', 'failover', 'sql'] },
    { page: 'SQL', sectionId: 'security', title: 'SQL Security & Access Control', icon: '🗃️', keywords: ['security', 'access', 'control', 'permissions', 'sql'] },
    { page: 'SQL', sectionId: 'data-warehousing', title: 'Data Warehousing & Analytics', icon: '🗃️', keywords: ['data', 'warehousing', 'analytics', 'olap', 'sql'] },

    // NoSQL
    { page: 'NoSQL', sectionId: 'mongodb', title: 'MongoDB', icon: '🍃', keywords: ['mongodb', 'document', 'nosql'] },
    { page: 'NoSQL', sectionId: 'cassandra', title: 'Apache Cassandra', icon: '🍃', keywords: ['cassandra', 'wide column', 'nosql'] },
    { page: 'NoSQL', sectionId: 'redis', title: 'Redis (NoSQL)', icon: '🍃', keywords: ['redis', 'cache', 'nosql'] },
    { page: 'NoSQL', sectionId: 'dynamodb', title: 'Amazon DynamoDB', icon: '🍃', keywords: ['dynamodb', 'aws', 'nosql'] },
    { page: 'NoSQL', sectionId: 'document-stores', title: 'Document Stores', icon: '🍃', keywords: ['document', 'stores', 'nosql'] },
    { page: 'NoSQL', sectionId: 'key-value-stores', title: 'Key-Value Stores', icon: '🍃', keywords: ['key-value', 'stores', 'nosql'] },
    { page: 'NoSQL', sectionId: 'column-family', title: 'Column-Family Databases', icon: '🍃', keywords: ['column', 'family', 'nosql'] },
    { page: 'NoSQL', sectionId: 'graph-databases', title: 'Graph Databases', icon: '🍃', keywords: ['graph', 'neo4j', 'nosql'] },

    // Oracle
    { page: 'Oracle', sectionId: 'plsql', title: 'Oracle PL/SQL Programming', icon: '🏛️', keywords: ['plsql', 'oracle', 'programming'] },
    { page: 'Oracle', sectionId: 'performance-tuning', title: 'Oracle Performance Tuning', icon: '🏛️', keywords: ['performance', 'tuning', 'oracle'] },
    { page: 'Oracle', sectionId: 'rac-ha', title: 'Oracle RAC & High Availability', icon: '🏛️', keywords: ['rac', 'high availability', 'oracle'] },
    { page: 'Oracle', sectionId: 'security', title: 'Oracle Security & Auditing', icon: '🏛️', keywords: ['security', 'auditing', 'oracle'] },
    { page: 'Oracle', sectionId: 'data-warehousing', title: 'Oracle Data Warehousing', icon: '🏛️', keywords: ['data', 'warehousing', 'oracle'] },
    { page: 'Oracle', sectionId: 'advanced-features', title: 'Oracle Advanced Features', icon: '🏛️', keywords: ['advanced', 'features', 'oracle'] },
    { page: 'Oracle', sectionId: 'oracle-cloud', title: 'Oracle Cloud & Exadata', icon: '🏛️', keywords: ['cloud', 'exadata', 'oracle'] },
    { page: 'Oracle', sectionId: 'dba-operations', title: 'DBA Operations', icon: '🏛️', keywords: ['dba', 'operations', 'backup', 'oracle'] },

    // Redis
    { page: 'Redis', sectionId: 'data-structures', title: 'Redis Data Structures', icon: '🔴', keywords: ['data', 'structures', 'strings', 'hash', 'redis'] },
    { page: 'Redis', sectionId: 'persistence', title: 'Redis Persistence', icon: '🔴', keywords: ['persistence', 'rdb', 'aof', 'redis'] },
    { page: 'Redis', sectionId: 'caching', title: 'Redis Caching Strategies', icon: '🔴', keywords: ['caching', 'cache', 'eviction', 'redis'] },
    { page: 'Redis', sectionId: 'clustering', title: 'Redis Clustering & HA', icon: '🔴', keywords: ['clustering', 'sentinel', 'ha', 'redis'] },
    { page: 'Redis', sectionId: 'transactions', title: 'Redis Transactions & Lua', icon: '🔴', keywords: ['transactions', 'lua', 'multi', 'exec', 'redis'] },
    { page: 'Redis', sectionId: 'pubsub', title: 'Redis Pub/Sub & Messaging', icon: '🔴', keywords: ['pubsub', 'messaging', 'subscribe', 'redis'] },
    { page: 'Redis', sectionId: 'use-cases', title: 'Redis Common Use Cases', icon: '🔴', keywords: ['use cases', 'session', 'leaderboard', 'redis'] },
    { page: 'Redis', sectionId: 'performance', title: 'Redis Performance', icon: '🔴', keywords: ['performance', 'best practices', 'redis'] },

    // ORM
    { page: 'ORM', sectionId: 'hibernate', title: 'Hibernate Framework (ORM)', icon: '🔗', keywords: ['hibernate', 'orm', 'framework'] },
    { page: 'ORM', sectionId: 'jpa', title: 'JPA (Java Persistence API)', icon: '🔗', keywords: ['jpa', 'persistence', 'api', 'orm'] },
    { page: 'ORM', sectionId: 'entity-mapping', title: 'Entity Mapping', icon: '🔗', keywords: ['entity', 'mapping', 'annotations', 'orm'] },
    { page: 'ORM', sectionId: 'query-optimization', title: 'ORM Query Optimization', icon: '🔗', keywords: ['query', 'optimization', 'jpql', 'orm'] },
    { page: 'ORM', sectionId: 'caching', title: 'ORM Caching Strategies', icon: '🔗', keywords: ['caching', 'l2', 'cache', 'orm'] },
    { page: 'ORM', sectionId: 'transaction-management', title: 'ORM Transaction Management', icon: '🔗', keywords: ['transaction', 'management', 'orm'] },
    { page: 'ORM', sectionId: 'lazy-eager', title: 'Lazy/Eager Loading', icon: '🔗', keywords: ['lazy', 'eager', 'loading', 'fetch', 'orm'] },
    { page: 'ORM', sectionId: 'n-plus-one', title: 'N+1 Problem', icon: '🔗', keywords: ['n+1', 'problem', 'batch', 'fetch', 'orm'] },

    // Stored Procedures
    { page: 'StoredProcedures', sectionId: 'stored-procedures', title: 'Stored Procedures', icon: '📋', keywords: ['stored', 'procedures', 'create', 'execute'] },
    { page: 'StoredProcedures', sectionId: 'functions', title: 'User-Defined Functions', icon: '📋', keywords: ['functions', 'udf', 'scalar', 'table'] },
    { page: 'StoredProcedures', sectionId: 'triggers', title: 'Database Triggers', icon: '📋', keywords: ['triggers', 'before', 'after', 'insert'] },
    { page: 'StoredProcedures', sectionId: 'cursors', title: 'Cursors', icon: '📋', keywords: ['cursors', 'fetch', 'declare', 'open'] },
    { page: 'StoredProcedures', sectionId: 'dynamic-sql', title: 'Dynamic SQL', icon: '📋', keywords: ['dynamic', 'sql', 'execute', 'prepare'] },
    { page: 'StoredProcedures', sectionId: 'packages', title: 'Packages (Oracle/PL/SQL)', icon: '📋', keywords: ['packages', 'oracle', 'plsql', 'spec'] },
    { page: 'StoredProcedures', sectionId: 'transactions', title: 'Transactions in Procedures', icon: '📋', keywords: ['transactions', 'commit', 'rollback', 'savepoint'] },
    { page: 'StoredProcedures', sectionId: 'debugging', title: 'Debugging & Testing', icon: '📋', keywords: ['debugging', 'testing', 'procedures'] },

    // Database Optimization
    { page: 'DatabaseOptimization', sectionId: 'query-optimization', title: 'DB Query Optimization', icon: '⚡', keywords: ['query', 'optimization', 'database'] },
    { page: 'DatabaseOptimization', sectionId: 'indexing', title: 'Indexing Strategies', icon: '⚡', keywords: ['indexing', 'index', 'btree', 'database'] },
    { page: 'DatabaseOptimization', sectionId: 'execution-plans', title: 'Execution Plans', icon: '⚡', keywords: ['execution', 'plans', 'explain', 'database'] },
    { page: 'DatabaseOptimization', sectionId: 'performance-tuning', title: 'DB Performance Tuning', icon: '⚡', keywords: ['performance', 'tuning', 'database'] },
    { page: 'DatabaseOptimization', sectionId: 'profiling', title: 'Profiling & Monitoring', icon: '⚡', keywords: ['profiling', 'monitoring', 'slow query', 'database'] },
    { page: 'DatabaseOptimization', sectionId: 'data-modeling', title: 'Data Modeling for Performance', icon: '⚡', keywords: ['data', 'modeling', 'denormalization', 'database'] },
    { page: 'DatabaseOptimization', sectionId: 'write-optimization', title: 'Write Optimization', icon: '⚡', keywords: ['write', 'optimization', 'bulk', 'insert', 'database'] },
    { page: 'DatabaseOptimization', sectionId: 'caching', title: 'Database Caching', icon: '⚡', keywords: ['caching', 'query cache', 'database'] },

    // SQL Fundamentals
    { page: 'SQLFundamentals', sectionId: 'sql-vocabulary', title: 'SQL Vocabulary', icon: '📖', keywords: ['sql', 'vocabulary', 'ddl', 'dml'] },
    { page: 'SQLFundamentals', sectionId: 'joins', title: 'JOIN Types', icon: '📖', keywords: ['join', 'inner', 'outer', 'left', 'right', 'sql'] },
    { page: 'SQLFundamentals', sectionId: 'subqueries', title: 'Subqueries', icon: '📖', keywords: ['subquery', 'subqueries', 'nested', 'sql'] },
    { page: 'SQLFundamentals', sectionId: 'cte', title: 'CTEs (WITH Clause)', icon: '📖', keywords: ['cte', 'common table expression', 'with', 'sql'] },
    { page: 'SQLFundamentals', sectionId: 'aggregates', title: 'Aggregate Functions', icon: '📖', keywords: ['aggregate', 'sum', 'count', 'avg', 'group by', 'sql'] },
    { page: 'SQLFundamentals', sectionId: 'window-functions', title: 'Window Functions', icon: '📖', keywords: ['window', 'functions', 'over', 'partition', 'rank', 'sql'] },
    { page: 'SQLFundamentals', sectionId: 'schema-management', title: 'Schema Management', icon: '📖', keywords: ['schema', 'create', 'alter', 'table', 'sql'] },
    { page: 'SQLFundamentals', sectionId: 'essential-operations', title: 'Essential SQL Operations', icon: '📖', keywords: ['select', 'insert', 'update', 'delete', 'operations', 'sql'] },

    // PL/SQL
    { page: 'PL/SQL', sectionId: 'plsql-basics', title: 'PL/SQL Fundamentals', icon: '🏛️', keywords: ['plsql', 'fundamentals', 'blocks', 'variables'] },
    { page: 'PL/SQL', sectionId: 'procedures-functions', title: 'PL/SQL Procedures & Functions', icon: '🏛️', keywords: ['procedures', 'functions', 'plsql'] },
    { page: 'PL/SQL', sectionId: 'cursors', title: 'PL/SQL Cursors', icon: '🏛️', keywords: ['cursors', 'fetch', 'plsql'] },
    { page: 'PL/SQL', sectionId: 'exception-handling', title: 'PL/SQL Exception Handling', icon: '🏛️', keywords: ['exception', 'handling', 'raise', 'plsql'] },
    { page: 'PL/SQL', sectionId: 'packages', title: 'PL/SQL Packages', icon: '🏛️', keywords: ['packages', 'spec', 'body', 'plsql'] },
    { page: 'PL/SQL', sectionId: 'triggers', title: 'PL/SQL Triggers', icon: '🏛️', keywords: ['triggers', 'before', 'after', 'plsql'] },
    { page: 'PL/SQL', sectionId: 'collections', title: 'PL/SQL Collections', icon: '🏛️', keywords: ['collections', 'varray', 'nested table', 'plsql'] },
    { page: 'PL/SQL', sectionId: 'dynamic-sql', title: 'PL/SQL Dynamic SQL', icon: '🏛️', keywords: ['dynamic', 'sql', 'execute immediate', 'plsql'] },
    { page: 'PL/SQL', sectionId: 'performance', title: 'PL/SQL Performance', icon: '🏛️', keywords: ['performance', 'bulk collect', 'forall', 'plsql'] },
    { page: 'PL/SQL', sectionId: 'advanced-features', title: 'PL/SQL Advanced Features', icon: '🏛️', keywords: ['advanced', 'pipelining', 'plsql'] },

    // Apache Kafka
    { page: 'Kafka', sectionId: 'producers', title: 'Kafka Producers', icon: '📨', keywords: ['producer', 'send', 'acks', 'kafka'] },
    { page: 'Kafka', sectionId: 'kafka-cluster', title: 'Kafka Cluster', icon: '📨', keywords: ['cluster', 'broker', 'partition', 'replication', 'kafka'] },
    { page: 'Kafka', sectionId: 'consumers', title: 'Kafka Consumers', icon: '📨', keywords: ['consumer', 'consumer group', 'offset', 'kafka'] },
    { page: 'Kafka', sectionId: 'stream-processing', title: 'Kafka Streams', icon: '📨', keywords: ['streams', 'stream processing', 'ktable', 'kafka'] },
    { page: 'Kafka', sectionId: 'schema-registry', title: 'Schema Registry', icon: '📨', keywords: ['schema', 'registry', 'avro', 'compatibility', 'kafka'] },
    { page: 'Kafka', sectionId: 'connect', title: 'Kafka Connect', icon: '📨', keywords: ['connect', 'connector', 'source', 'sink', 'kafka'] },
    { page: 'Kafka', sectionId: 'monitoring', title: 'Kafka Monitoring & Operations', icon: '📨', keywords: ['monitoring', 'operations', 'jmx', 'lag', 'kafka'] },

    // Apache Flink
    { page: 'Apache Flink', sectionId: 'stream-processing', title: 'Flink Stream Processing', icon: '🌊', keywords: ['stream', 'processing', 'datastream', 'flink'] },
    { page: 'Apache Flink', sectionId: 'stateful-computing', title: 'Flink Stateful Computing', icon: '🌊', keywords: ['stateful', 'state', 'keyed', 'flink'] },
    { page: 'Apache Flink', sectionId: 'fault-tolerance', title: 'Flink Fault Tolerance', icon: '🌊', keywords: ['fault', 'tolerance', 'checkpoint', 'savepoint', 'flink'] },
    { page: 'Apache Flink', sectionId: 'table-sql', title: 'Flink Table API & SQL', icon: '🌊', keywords: ['table', 'sql', 'api', 'flink'] },
    { page: 'Apache Flink', sectionId: 'deployment', title: 'Flink Deployment & Scaling', icon: '🌊', keywords: ['deployment', 'scaling', 'yarn', 'kubernetes', 'flink'] },
    { page: 'Apache Flink', sectionId: 'connectors', title: 'Flink Connectors & Integration', icon: '🌊', keywords: ['connectors', 'integration', 'kafka', 'flink'] },
    { page: 'Apache Flink', sectionId: 'performance', title: 'Flink Performance & Optimization', icon: '🌊', keywords: ['performance', 'optimization', 'memory', 'flink'] },
    { page: 'Apache Flink', sectionId: 'use-cases', title: 'Flink Use Cases', icon: '🌊', keywords: ['use cases', 'applications', 'flink'] },

    // TeamCity
    { page: 'TeamCity', sectionId: 'fundamentals', title: 'TeamCity Fundamentals', icon: '🏗️', keywords: ['teamcity', 'fundamentals', 'build'] },
    { page: 'TeamCity', sectionId: 'pipelines', title: 'TeamCity Build Pipelines', icon: '🏗️', keywords: ['pipelines', 'build', 'chain', 'teamcity'] },
    { page: 'TeamCity', sectionId: 'kotlin-dsl', title: 'TeamCity Kotlin DSL', icon: '🏗️', keywords: ['kotlin', 'dsl', 'configuration', 'teamcity'] },
    { page: 'TeamCity', sectionId: 'agents', title: 'TeamCity Agent Management', icon: '🏗️', keywords: ['agents', 'build agents', 'teamcity'] },
    { page: 'TeamCity', sectionId: 'docker', title: 'TeamCity Docker Integration', icon: '🏗️', keywords: ['docker', 'container', 'teamcity'] },
    { page: 'TeamCity', sectionId: 'testing', title: 'TeamCity Testing & Reporting', icon: '🏗️', keywords: ['testing', 'reporting', 'coverage', 'teamcity'] },
    { page: 'TeamCity', sectionId: 'security', title: 'TeamCity Security & Secrets', icon: '🏗️', keywords: ['security', 'secrets', 'credentials', 'teamcity'] },
    { page: 'TeamCity', sectionId: 'integrations', title: 'TeamCity Integrations', icon: '🏗️', keywords: ['integrations', 'github', 'jira', 'teamcity'] },

    // Unix Scripting
    { page: 'Unix Scripting', sectionId: 'shell-fundamentals', title: 'Shell Scripting Fundamentals', icon: '🐧', keywords: ['shell', 'bash', 'fundamentals', 'unix'] },
    { page: 'Unix Scripting', sectionId: 'text-processing', title: 'Text Processing', icon: '🐧', keywords: ['text', 'processing', 'grep', 'sed', 'awk', 'unix'] },
    { page: 'Unix Scripting', sectionId: 'file-system', title: 'File System & Permissions', icon: '🐧', keywords: ['file', 'system', 'permissions', 'chmod', 'unix'] },
    { page: 'Unix Scripting', sectionId: 'process-management', title: 'Process & System Management', icon: '🐧', keywords: ['process', 'system', 'management', 'ps', 'unix'] },
    { page: 'Unix Scripting', sectionId: 'networking', title: 'Networking & Diagnostics', icon: '🐧', keywords: ['networking', 'curl', 'netstat', 'unix'] },
    { page: 'Unix Scripting', sectionId: 'automation-patterns', title: 'Automation Patterns', icon: '🐧', keywords: ['automation', 'cron', 'patterns', 'unix'] },

    // CI/CD
    { page: 'CI/CD', sectionId: 'pipeline-overview', title: 'Pipeline Architecture', icon: '🔄', keywords: ['pipeline', 'architecture', 'cicd'] },
    { page: 'CI/CD', sectionId: 'branching', title: 'Branching Strategies', icon: '🔄', keywords: ['branching', 'gitflow', 'trunk', 'cicd'] },
    { page: 'CI/CD', sectionId: 'artifact-management', title: 'Artifact Management', icon: '🔄', keywords: ['artifact', 'management', 'nexus', 'cicd'] },
    { page: 'CI/CD', sectionId: 'environment-promotion', title: 'Environment Promotion', icon: '🔄', keywords: ['environment', 'promotion', 'staging', 'cicd'] },
    { page: 'CI/CD', sectionId: 'jenkins', title: 'Jenkins Pipelines', icon: '🔄', keywords: ['jenkins', 'pipeline', 'jenkinsfile', 'cicd'] },
    { page: 'CI/CD', sectionId: 'gitlab-cicd', title: 'GitLab CI/CD', icon: '🔄', keywords: ['gitlab', 'cicd', 'pipeline'] },
    { page: 'CI/CD', sectionId: 'github-actions', title: 'GitHub Actions', icon: '🔄', keywords: ['github', 'actions', 'workflow', 'cicd'] },
    { page: 'CI/CD', sectionId: 'gitops', title: 'GitOps & ArgoCD', icon: '🔄', keywords: ['gitops', 'argocd', 'flux', 'cicd'] },
    { page: 'CI/CD', sectionId: 'testing', title: 'Testing in CI/CD', icon: '🔄', keywords: ['testing', 'unit', 'integration', 'cicd'] },
    { page: 'CI/CD', sectionId: 'best-practices', title: 'CI/CD Best Practices', icon: '🔄', keywords: ['best practices', 'cicd'] },

    // Microservice Design Patterns
    { page: 'Microservice Design Patterns', sectionId: 'api-gateway', title: 'API Gateway Pattern', icon: '🏗️', keywords: ['api', 'gateway', 'routing', 'microservice'] },
    { page: 'Microservice Design Patterns', sectionId: 'circuit-breaker', title: 'Circuit Breaker Pattern', icon: '🏗️', keywords: ['circuit', 'breaker', 'resilience', 'microservice'] },
    { page: 'Microservice Design Patterns', sectionId: 'service-discovery', title: 'Service Discovery', icon: '🏗️', keywords: ['service', 'discovery', 'eureka', 'consul', 'microservice'] },
    { page: 'Microservice Design Patterns', sectionId: 'saga-pattern', title: 'Saga Pattern', icon: '🏗️', keywords: ['saga', 'orchestration', 'choreography', 'microservice'] },
    { page: 'Microservice Design Patterns', sectionId: 'cqrs', title: 'CQRS (Microservices)', icon: '🏗️', keywords: ['cqrs', 'command', 'query', 'microservice'] },
    { page: 'Microservice Design Patterns', sectionId: 'event-sourcing', title: 'Event Sourcing (Microservices)', icon: '🏗️', keywords: ['event', 'sourcing', 'event store', 'microservice'] },
    { page: 'Microservice Design Patterns', sectionId: 'sidecar', title: 'Sidecar Pattern', icon: '🏗️', keywords: ['sidecar', 'proxy', 'envoy', 'microservice'] },

    // Event Driven Architecture
    { page: 'Event Driven Architecture', sectionId: 'pub-sub', title: 'Publish-Subscribe (Pub/Sub)', icon: '📡', keywords: ['pub', 'sub', 'publish', 'subscribe', 'event driven'] },
    { page: 'Event Driven Architecture', sectionId: 'event-sourcing', title: 'Event Sourcing (EDA)', icon: '📡', keywords: ['event', 'sourcing', 'event store', 'event driven'] },
    { page: 'Event Driven Architecture', sectionId: 'cqrs', title: 'CQRS Pattern (EDA)', icon: '📡', keywords: ['cqrs', 'command', 'query', 'event driven'] },
    { page: 'Event Driven Architecture', sectionId: 'saga-pattern', title: 'Saga Pattern (EDA)', icon: '📡', keywords: ['saga', 'distributed', 'transaction', 'event driven'] },
    { page: 'Event Driven Architecture', sectionId: 'event-brokers', title: 'Event Broker Comparison', icon: '📡', keywords: ['event', 'broker', 'comparison', 'kafka', 'rabbitmq'] },

    // L3 System Design
    { page: 'L3 System Design', sectionId: 'library-management', title: 'Library Management System', icon: '📚', keywords: ['library', 'management', 'system design'] },
    { page: 'L3 System Design', sectionId: 'deck-of-cards', title: 'Deck of Cards', icon: '📚', keywords: ['deck', 'cards', 'system design'] },
    { page: 'L3 System Design', sectionId: 'vending-machine', title: 'Vending Machine', icon: '📚', keywords: ['vending', 'machine', 'system design'] },
    { page: 'L3 System Design', sectionId: 'atm', title: 'ATM System', icon: '📚', keywords: ['atm', 'banking', 'system design'] },
    { page: 'L3 System Design', sectionId: 'todo-api', title: 'Todo List API', icon: '📚', keywords: ['todo', 'list', 'api', 'system design'] },
    { page: 'L3 System Design', sectionId: 'blog-api', title: 'Blog Post API', icon: '📚', keywords: ['blog', 'post', 'api', 'system design'] },
    { page: 'L3 System Design', sectionId: 'user-api', title: 'User Management API', icon: '📚', keywords: ['user', 'management', 'api', 'system design'] },
    { page: 'L3 System Design', sectionId: 'lru-cache', title: 'LRU Cache (L3)', icon: '📚', keywords: ['lru', 'cache', 'system design'] },
    { page: 'L3 System Design', sectionId: 'leaderboard', title: 'Leaderboard System', icon: '📚', keywords: ['leaderboard', 'ranking', 'system design'] },
    { page: 'L3 System Design', sectionId: 'autocomplete', title: 'Autocomplete System', icon: '📚', keywords: ['autocomplete', 'typeahead', 'system design'] },
    { page: 'L3 System Design', sectionId: 'task-scheduler', title: 'Task Scheduler', icon: '📚', keywords: ['task', 'scheduler', 'cron', 'system design'] },

    // L4 System Design
    { page: 'L4 System Design', sectionId: 'url-shortener', title: 'URL Shortener (bit.ly)', icon: '🏢', keywords: ['url', 'shortener', 'bitly', 'system design'] },
    { page: 'L4 System Design', sectionId: 'chat-app', title: 'Chat Application', icon: '🏢', keywords: ['chat', 'application', 'messaging', 'system design'] },
    { page: 'L4 System Design', sectionId: 'social-feed', title: 'Social Media Feed', icon: '🏢', keywords: ['social', 'media', 'feed', 'system design'] },
    { page: 'L4 System Design', sectionId: 'file-storage', title: 'File Storage (Dropbox)', icon: '🏢', keywords: ['file', 'storage', 'dropbox', 'system design'] },
    { page: 'L4 System Design', sectionId: 'web-crawler', title: 'Web Crawler', icon: '🏢', keywords: ['web', 'crawler', 'spider', 'system design'] },
    { page: 'L4 System Design', sectionId: 'parking-lot', title: 'Parking Lot System', icon: '🏢', keywords: ['parking', 'lot', 'system design'] },
    { page: 'L4 System Design', sectionId: 'food-delivery', title: 'Food Delivery (Uber Eats)', icon: '🏢', keywords: ['food', 'delivery', 'uber eats', 'system design'] },

    // LRU Cache
    { page: 'LRU Cache', sectionId: 'lru-algorithm', title: 'LRU Algorithm', icon: '🧠', keywords: ['lru', 'algorithm', 'eviction', 'cache'] },
    { page: 'LRU Cache', sectionId: 'data-structures', title: 'LRU Data Structures', icon: '🧠', keywords: ['data structures', 'hashmap', 'linked list', 'cache'] },
    { page: 'LRU Cache', sectionId: 'implementation', title: 'LRU Implementation', icon: '🧠', keywords: ['implementation', 'code', 'lru', 'cache'] },
    { page: 'LRU Cache', sectionId: 'thread-safety', title: 'LRU Thread Safety', icon: '🧠', keywords: ['thread', 'safety', 'concurrent', 'cache'] },
    { page: 'LRU Cache', sectionId: 'ttl-expiry', title: 'TTL & Expiry', icon: '🧠', keywords: ['ttl', 'expiry', 'time to live', 'cache'] },
    { page: 'LRU Cache', sectionId: 'lfu-cache', title: 'LFU Cache', icon: '🧠', keywords: ['lfu', 'least frequently', 'cache'] },
    { page: 'LRU Cache', sectionId: 'distributed-cache', title: 'Distributed Cache', icon: '🧠', keywords: ['distributed', 'cache', 'memcached', 'redis'] },

    // Rate Limiter
    { page: 'Rate Limiter', sectionId: 'token-bucket', title: 'Token Bucket Algorithm', icon: '🚦', keywords: ['token', 'bucket', 'algorithm', 'rate limiter'] },
    { page: 'Rate Limiter', sectionId: 'leaky-bucket', title: 'Leaky Bucket Algorithm', icon: '🚦', keywords: ['leaky', 'bucket', 'algorithm', 'rate limiter'] },
    { page: 'Rate Limiter', sectionId: 'fixed-window', title: 'Fixed Window Counter', icon: '🚦', keywords: ['fixed', 'window', 'counter', 'rate limiter'] },
    { page: 'Rate Limiter', sectionId: 'sliding-window', title: 'Sliding Window Algorithms', icon: '🚦', keywords: ['sliding', 'window', 'rate limiter'] },
    { page: 'Rate Limiter', sectionId: 'distributed', title: 'Distributed Rate Limiting', icon: '🚦', keywords: ['distributed', 'redis', 'rate limiter'] },
    { page: 'Rate Limiter', sectionId: 'scaling', title: 'Rate Limiter Scaling', icon: '🚦', keywords: ['scaling', 'best practices', 'rate limiter'] },

    // Netflix
    { page: 'Netflix', sectionId: 'architecture', title: 'Netflix System Architecture', icon: '🎬', keywords: ['architecture', 'system', 'netflix'] },
    { page: 'Netflix', sectionId: 'cdn', title: 'Netflix CDN & Content Delivery', icon: '🎬', keywords: ['cdn', 'content', 'delivery', 'open connect', 'netflix'] },
    { page: 'Netflix', sectionId: 'encoding', title: 'Netflix Video Encoding', icon: '🎬', keywords: ['encoding', 'video', 'transcoding', 'netflix'] },
    { page: 'Netflix', sectionId: 'recommendations', title: 'Netflix Recommendation System', icon: '🎬', keywords: ['recommendation', 'algorithm', 'personalization', 'netflix'] },
    { page: 'Netflix', sectionId: 'microservices', title: 'Netflix Microservices', icon: '🎬', keywords: ['microservices', 'zuul', 'eureka', 'netflix'] },
    { page: 'Netflix', sectionId: 'scalability', title: 'Netflix Scalability & Resilience', icon: '🎬', keywords: ['scalability', 'resilience', 'chaos', 'netflix'] },

    // Instagram
    { page: 'Instagram', sectionId: 'feed-generation', title: 'Instagram Feed Generation', icon: '📸', keywords: ['feed', 'generation', 'timeline', 'instagram'] },
    { page: 'Instagram', sectionId: 'image-storage', title: 'Instagram Image Storage & CDN', icon: '📸', keywords: ['image', 'storage', 'cdn', 'instagram'] },
    { page: 'Instagram', sectionId: 'database-design', title: 'Instagram Database Design', icon: '📸', keywords: ['database', 'design', 'sharding', 'instagram'] },
    { page: 'Instagram', sectionId: 'scaling', title: 'Instagram Scaling Architecture', icon: '📸', keywords: ['scaling', 'architecture', 'instagram'] },
    { page: 'Instagram', sectionId: 'stories', title: 'Instagram Stories Architecture', icon: '📸', keywords: ['stories', 'architecture', 'instagram'] },
    { page: 'Instagram', sectionId: 'notifications', title: 'Instagram Notifications & Search', icon: '📸', keywords: ['notifications', 'search', 'instagram'] },
  ]

  subPageSections.forEach(section => {
    searchIndex.push({
      id: `section-${section.page}-${section.sectionId}`,
      type: 'section',
      title: section.title,
      description: `${section.title} - ${section.page}`,
      icon: section.icon,
      path: [section.page, section.title],
      breadcrumb: `${section.page} \u2192 ${section.title}`,
      keywords: section.keywords,
      navigateTo: () => ({ type: 'section', page: section.page, sectionId: section.sectionId })
    })
  })

  return searchIndex
}

// Search function with fuzzy matching and ranking
export const searchContent = (query, searchIndex) => {
  if (!query || query.trim().length === 0) {
    return []
  }

  const normalizedQuery = query.toLowerCase().trim()
  const queryWords = normalizedQuery.split(/\s+/)
  
  const results = searchIndex
    .map(item => {
      let score = 0
      let matchedTerms = []

      // Exact title match (highest priority)
      if (item.title.toLowerCase() === normalizedQuery) {
        score += 1000
        matchedTerms.push(item.title)
      }

      // Title starts with query (very high priority)
      else if (item.title.toLowerCase().startsWith(normalizedQuery)) {
        score += 500
        matchedTerms.push(item.title)
      }

      // Title contains query as whole word
      else if (new RegExp(`\\b${normalizedQuery}\\b`, 'i').test(item.title)) {
        score += 300
        matchedTerms.push(item.title)
      }

      // Title contains query anywhere
      else if (item.title.toLowerCase().includes(normalizedQuery)) {
        score += 100
        matchedTerms.push(item.title)
      }

      // Check individual words in title (only for multi-word queries)
      if (queryWords.length > 1) {
        let wordMatchCount = 0
        queryWords.forEach(word => {
          if (word.length > 2 && item.title.toLowerCase().includes(word)) {
            wordMatchCount++
            matchedTerms.push(word)
          }
        })
        score += wordMatchCount * 50
      }

      // Exact keyword match
      item.keywords.forEach(keyword => {
        if (keyword === normalizedQuery) {
          score += 400
          matchedTerms.push(keyword)
        } else if (keyword.startsWith(normalizedQuery)) {
          score += 200
          matchedTerms.push(keyword)
        } else if (new RegExp(`\\b${normalizedQuery}\\b`, 'i').test(keyword)) {
          score += 150
          matchedTerms.push(keyword)
        } else if (keyword.includes(normalizedQuery) && normalizedQuery.length > 3) {
          score += 50
          matchedTerms.push(keyword)
        }
      })

      // Description matches (lower priority, only for longer queries)
      if (normalizedQuery.length > 3 && item.description.toLowerCase().includes(normalizedQuery)) {
        score += 10
        matchedTerms.push('description')
      }

      // Breadcrumb matches
      if (item.breadcrumb.toLowerCase().includes(normalizedQuery)) {
        score += 20
        matchedTerms.push('breadcrumb')
      }

      // Boost score based on item type
      if (item.type === 'component') score += 30  // Components are what users usually want
      if (item.type === 'section') score += 25     // Sections within pages
      if (item.type === 'subcategory') score += 20
      if (item.type === 'category') score += 10

      return {
        ...item,
        score,
        matchedTerms: [...new Set(matchedTerms)],
        highlightedTitle: highlightMatches(item.title, queryWords),
        highlightedDescription: highlightMatches(item.description, queryWords)
      }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10) // Limit to top 10 results

  return results
}

// Helper function to highlight matching terms
const highlightMatches = (text, queryWords) => {
  let highlighted = text
  queryWords.forEach(word => {
    const regex = new RegExp(`(${word})`, 'gi')
    highlighted = highlighted.replace(regex, '<mark>$1</mark>')
  })
  return highlighted
}

// Group results by type for better display
export const groupSearchResults = (results) => {
  const grouped = {
    categories: [],
    subcategories: [],
    components: []
  }

  results.forEach(result => {
    if (result.type === 'category') {
      grouped.categories.push(result)
    } else if (result.type === 'subcategory') {
      grouped.subcategories.push(result)
    } else {
      grouped.components.push(result)
    }
  })

  return grouped
}

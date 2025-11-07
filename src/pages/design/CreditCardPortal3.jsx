import React, { useState } from 'react';
import {
  ChevronDown, ChevronRight, Database, Cloud, Lock, AlertCircle, Check, Users,
  CreditCard, TrendingUp, Zap, Server, Globe, Shield, Activity, Layers,
  GitBranch, Box, FileText, BarChart, Network, Cpu, HardDrive, ArrowRight
} from 'lucide-react';

export default function CreditCardPortal3({ onBack }) {
  const [activeTab, setActiveTab] = useState('main');
  const [expandedLayers, setExpandedLayers] = useState({});
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [selectedCQRSComponent, setSelectedCQRSComponent] = useState(null);

  const toggleLayer = (layer) => {
    setExpandedLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  // Helper function to get complete Tailwind classes (Tailwind JIT requires complete class names)
  const getLayerBadgeClasses = (color) => {
    const colorMap = {
      'blue': 'px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-semibold',
      'purple': 'px-2 py-0.5 bg-purple-100 text-purple-800 rounded text-xs font-semibold',
      'green': 'px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-semibold',
      'orange': 'px-2 py-0.5 bg-orange-100 text-orange-800 rounded text-xs font-semibold',
      'pink': 'px-2 py-0.5 bg-pink-100 text-pink-800 rounded text-xs font-semibold',
      'amber': 'px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs font-semibold',
      'indigo': 'px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded text-xs font-semibold',
      'red': 'px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs font-semibold',
      'slate': 'px-2 py-0.5 bg-slate-100 text-slate-800 rounded text-xs font-semibold'
    };
    return colorMap[color] || 'px-2 py-0.5 bg-gray-100 text-gray-800 rounded text-xs font-semibold';
  };

  // CQRS Component Details for Interactive Diagram
  const cqrsComponentDetails = {
    'bfflayer': {
      name: 'BFF Layer (Backend for Frontend)',
      type: 'Presentation Layer',
      description: 'Backend for Frontend pattern providing customized APIs for each client type. Aggregates microservice calls and transforms data for optimal client consumption.',
      technologies: ['React Web App', 'iOS (Swift)', 'Android (Kotlin)', 'Admin Dashboard', 'REST APIs'],
      responsibilities: [
        'Client-specific API aggregation and transformation',
        'Request routing to appropriate microservices',
        'Response formatting optimized for each platform',
        'Client-side caching and state management',
        'Integration with 3rd party APIs'
      ],
      metrics: '30M+ requests/day across all client types'
    },
    'apigateway': {
      name: 'API Gateway',
      type: 'Gateway Layer',
      description: 'Kong API Gateway serving as the single entry point for all client requests. Handles authentication, rate limiting, load balancing, and security.',
      technologies: ['Kong Gateway', 'WAF (Web Application Firewall)', 'OAuth 2.0', 'JWT', 'Redis (Rate Limiting)'],
      responsibilities: [
        'OAuth 2.0 + JWT authentication and authorization',
        'Rate limiting using Redis (1000 req/min per user)',
        'DDoS protection and WAF filtering',
        'Load balancing across microservice instances',
        'Request/response logging and monitoring',
        'SSL/TLS termination'
      ],
      metrics: '30M+ req/day, <5ms gateway latency'
    },
    'commandservices': {
      name: 'Command Services',
      type: 'Write Side - Business Logic',
      description: 'Microservices handling write operations (POST/PUT/DELETE). Implements Saga Orchestration for distributed transactions and ensures idempotency.',
      technologies: ['Spring Boot', 'Saga Orchestrator', 'Spring Data JPA', 'Redis (Idempotency)', 'Resilience4j'],
      responsibilities: [
        'Card Application processing with Saga pattern',
        'Account Service operations (create, update, close)',
        'Payment Processing with idempotency keys (24h TTL)',
        'Business rule validation and enforcement',
        'Distributed transaction coordination',
        'Command validation and authorization'
      ],
      metrics: '347 txn/sec average, 1735 txn/sec peak'
    },
    'txprocessor': {
      name: 'Transaction Processor',
      type: 'Write Side - Core Engine',
      description: 'Real-time transaction processing engine with integrated XGBoost ML fraud detection. Implements Event Sourcing for complete audit trail.',
      technologies: ['Spring Boot', 'XGBoost ML', 'Event Sourcing', 'Python (ML Model)', 'Redis Cache'],
      responsibilities: [
        'Real-time transaction authorization',
        'XGBoost ML fraud detection (<100ms scoring)',
        'Event Sourcing for immutable transaction log',
        'Balance calculations and updates',
        'Fraud score calculation (0-100 risk score)',
        'Transaction state management'
      ],
      metrics: '<100ms transaction latency, 98% fraud detection accuracy'
    },
    'writedb': {
      name: 'Write Databases',
      type: 'Data Layer - Write Optimized',
      description: 'Database cluster optimized for write operations. Uses PostgreSQL for ACID transactions and MongoDB for high-volume document storage.',
      technologies: ['PostgreSQL (Primary + 2 Replicas)', 'MongoDB Atlas (5 Shards)', 'Database per Service', 'ACID Transactions'],
      responsibilities: [
        'ACID transaction guarantees for financial operations',
        'Normalized schema for data integrity',
        'Write-optimized indexing strategy',
        'Sharding for horizontal scalability (MongoDB)',
        'Replication for high availability',
        'Database per microservice pattern'
      ],
      metrics: '30M txn/day writes, <50ms write latency (p95)'
    },
    'queryservices': {
      name: 'Query Services',
      type: 'Read Side - Query Handlers',
      description: 'Microservices handling read operations (GET). Optimized for fast queries using caching and specialized read databases.',
      technologies: ['Spring Boot', 'Spring WebFlux (Reactive)', 'Redis (L1 Cache)', 'Caffeine (L2 Cache)', 'Circuit Breaker'],
      responsibilities: [
        'Account balance retrieval (<1ms via Redis)',
        'Transaction history queries (Elasticsearch)',
        'Rewards and points calculation (cached)',
        'Statement generation and PDF export',
        'Search functionality across transaction history',
        'Real-time dashboard data aggregation'
      ],
      metrics: '10M reads/day, <10ms query latency (p99)'
    },
    'analytics': {
      name: 'Analytics & Reporting',
      type: 'Read Side - Analytics Engine',
      description: 'Real-time analytics and reporting system using Kafka Streams for stream processing and InfluxDB for time-series data.',
      technologies: ['Kafka Streams', 'InfluxDB', 'Grafana', 'Apache Spark (Batch)', 'Tableau'],
      responsibilities: [
        'Real-time spending analytics and trends',
        'Kafka Streams aggregations (windowed)',
        'Time-series metrics storage (InfluxDB)',
        'Report generation (daily, monthly, yearly)',
        'Dashboard data for Grafana visualization',
        'Predictive analytics for spending patterns'
      ],
      metrics: 'Real-time processing, 15-min lag for analytics'
    },
    'readdb': {
      name: 'Read Databases',
      type: 'Data Layer - Read Optimized',
      description: 'Database cluster optimized for read operations. Uses Elasticsearch for search, InfluxDB for time-series, and Redis for ultra-fast caching.',
      technologies: ['Elasticsearch (Search)', 'InfluxDB (Time-series)', 'Redis Enterprise (Cache)', 'PostgreSQL Replicas'],
      responsibilities: [
        'Elasticsearch for full-text search (transaction history)',
        'InfluxDB for real-time metrics and time-series data',
        'Redis cache for hot data (<1ms latency)',
        'Denormalized schemas for query optimization',
        'Read replicas for load distribution',
        'Query result caching and invalidation'
      ],
      metrics: '10M reads/day, 90% cache hit rate, <1ms cache reads'
    },
    'eventbus': {
      name: 'Event Bus (Apache Kafka)',
      type: 'Messaging Infrastructure',
      description: '3-node Kafka cluster enabling event-driven architecture. Decouples write and read sides with publish-subscribe pattern.',
      technologies: ['Apache Kafka', 'Kafka Streams', 'Schema Registry (Avro)', 'Zookeeper', 'Consumer Groups'],
      responsibilities: [
        'Event publishing from command side (30M events/day)',
        'Event distribution to multiple consumers',
        'Topics: ApplicationCreated, TransactionPosted, PaymentProcessed, FraudAlert, BalanceUpdated',
        'Message ordering and delivery guarantees',
        'Consumer group management (Data Pipeline, Notification, Analytics)',
        'Event schema evolution via Schema Registry'
      ],
      metrics: '30M events/day, Replication Factor: 3, <10ms publish latency'
    },
    'eventstore': {
      name: 'Event Store',
      type: 'Data Layer - Immutable Log',
      description: 'Append-only event log storing all system events. Enables event replay, audit trail, and temporal queries for compliance.',
      technologies: ['PostgreSQL (Append-only)', 'Event Sourcing', 'Partitioning (by year)', 'JSONB Storage'],
      responsibilities: [
        'Immutable storage of all domain events',
        'Event replay for rebuilding application state',
        'Audit trail for regulatory compliance (PCI DSS)',
        'Temporal queries (state at time T)',
        'Disaster recovery via event replay',
        'Debugging and troubleshooting support'
      ],
      metrics: '30M events/day stored, Never UPDATE or DELETE'
    },
    'notifications': {
      name: 'Notification Service',
      type: 'Supporting Service',
      description: 'Real-time notification system delivering alerts via Email, SMS, and Push notifications. Subscribes to Kafka events for trigger-based messaging.',
      technologies: ['Spring Boot', 'Twilio (SMS)', 'SendGrid (Email)', 'Firebase (Push)', 'Redis (Deduplication)'],
      responsibilities: [
        'Real-time transaction alerts (Email/SMS/Push)',
        'Fraud detection alerts (<1 min notification)',
        'Payment confirmations and receipts',
        'Statement availability notifications',
        'Promotional and marketing messages',
        'Notification deduplication via Redis'
      ],
      metrics: '5M notifications/day, <1 min delivery for fraud alerts'
    },
    'projections': {
      name: 'Projections (Denormalizer)',
      type: 'Read Side - Event Handlers',
      description: 'Event handlers that subscribe to Kafka events and update read-optimized databases. Implements eventual consistency between write and read sides.',
      technologies: ['Spring Boot', 'Kafka Consumer', 'Spring Data Elasticsearch', 'Spring Data Redis', 'Spring Data InfluxDB'],
      responsibilities: [
        'Subscribe to Kafka events (Consumer Groups)',
        'Denormalize data for read-optimized schemas',
        'Update Elasticsearch indices for search',
        'Update InfluxDB for time-series metrics',
        'Update Redis cache with latest data',
        'Handle event ordering and idempotency'
      ],
      metrics: '30M events/day processed, 5-15 min eventual consistency lag'
    }
  };

  // System Design Layers - High Level
  const architectureLayers = [
    {
      id: 'client',
      name: '1. Client Applications Layer',
      color: 'from-blue-500 to-blue-600',
      icon: Globe,
      pattern: 'BFF Pattern (Backend for Frontend)',
      components: [
        'Web Application (React/Angular)',
        'Mobile Apps (iOS/Android - Native)',
        '3rd Party Integration APIs',
        'Admin Dashboard'
      ],
      keyPoints: [
        'BFF Pattern: Separate backend for web vs mobile (different data needs)',
        'Web: Full feature set, desktop optimized',
        'Mobile: Optimized payload, offline-first, biometric auth',
        '3rd Party: OAuth 2.0, rate-limited APIs'
      ]
    },
    {
      id: 'gateway',
      name: '2. API Gateway & Security Layer',
      color: 'from-purple-500 to-purple-600',
      icon: Lock,
      pattern: 'API Gateway Pattern',
      components: [
        'Load Balancer (AWS ALB / NGINX)',
        'Web Application Firewall (WAF)',
        'API Gateway (Kong / AWS API Gateway)',
        'Rate Limiter (Token Bucket - Redis)',
        'Request Router',
        'Auth Service (OAuth 2.0 + JWT)'
      ],
      keyPoints: [
        'Load Balancer: Distributes 30M+ requests/day across gateway instances',
        'WAF: Protects against SQL injection, XSS, DDoS (Layer 7)',
        'Rate Limiter: Token bucket algorithm, 1000 req/min per user',
        'Auth: JWT tokens (15 min expiry), refresh tokens (7 days)',
        'Interview tip: Explain how gateway reduces coupling between clients and services'
      ]
    },
    {
      id: 'core',
      name: '3. Core Business Services',
      color: 'from-green-500 to-green-600',
      icon: CreditCard,
      pattern: 'API Composition + Saga Pattern',
      components: [
        'Card Application Service (Saga Orchestrator)',
        'Account Service (CQRS)',
        'Payment Processing Service (Idempotent)'
      ],
      keyPoints: [
        'API Composition: Gateway calls multiple services, aggregates responses',
        'Saga Pattern: Distributed transaction across Card App → Credit Bureau → Account',
        'Each service has its own database (Database per Service pattern)',
        'Idempotency: Prevents duplicate charges (idempotency key in Redis, 24h TTL)',
        'Interview tip: Emphasize how Saga handles failures with compensating transactions'
      ]
    },
    {
      id: 'transaction',
      name: '4. Transaction Services',
      color: 'from-orange-500 to-orange-600',
      icon: Zap,
      pattern: 'Event Sourcing Pattern',
      components: [
        'Transaction Processor',
        'Fraud Detection Engine (Real-time)',
        'History Manager',
        'Event Store (Immutable Log - PostgreSQL)'
      ],
      keyPoints: [
        'Event Sourcing: Every transaction is an immutable event',
        'Event Store: Append-only table, can replay to rebuild state',
        'Fraud Detection: ML model (XGBoost) scores each transaction &lt;100ms',
        '30M transactions/day = 347 txns/sec (peak 5x = 1735 txns/sec)',
        'Interview tip: Explain how Event Sourcing provides audit trail for compliance'
      ]
    },
    {
      id: 'analytics',
      name: '5. Analytics & Reporting Services',
      color: 'from-pink-500 to-pink-600',
      icon: BarChart,
      pattern: 'CQRS Pattern (Read/Write Separation)',
      components: [
        'Data Pipeline (Kafka Streams)',
        'Aggregator (Real-time Stats)',
        'Report Generator'
      ],
      keyPoints: [
        'CQRS: Write to MongoDB/PostgreSQL, Read from Elasticsearch/InfluxDB',
        'Write Model: Optimized for transactions (MongoDB sharded)',
        'Read Model: Optimized for queries (Elasticsearch for search, InfluxDB for stats)',
        'Eventual Consistency: 5-15 min lag acceptable for analytics',
        'Interview tip: Explain trade-off between consistency and performance'
      ]
    },
    {
      id: 'eventbus',
      name: '6. Event Bus & Messaging',
      color: 'from-amber-500 to-amber-600',
      icon: GitBranch,
      pattern: 'Event-Driven Architecture',
      components: [
        'Apache Kafka (3-node cluster)',
        'Topics: ApplicationCreated, TransactionPosted, PaymentProcessed, FraudAlert',
        'Consumer Groups (Data Pipeline, Notification, Analytics)',
        'Notification Service (Email/SMS/Push)'
      ],
      keyPoints: [
        'Kafka: 30M events/day, 3 brokers, replication factor 3',
        'Partitioning: 10 partitions per topic (parallelism)',
        'Consumer Groups: Multiple consumers process events in parallel',
        'Guarantees: At-least-once delivery, idempotent consumers',
        'Interview tip: Explain how Kafka decouples services and enables scalability'
      ]
    },
    {
      id: 'data',
      name: '7. Data Layer (Polyglot Persistence)',
      color: 'from-indigo-500 to-indigo-600',
      icon: Database,
      pattern: 'Database per Service + Polyglot Persistence',
      components: [
        'Transaction DB: MongoDB (Sharded ×5)',
        'Account DB: PostgreSQL (Primary + 2 Read Replicas)',
        'Application DB: PostgreSQL (Partitioned by status)',
        'Analytics DB: InfluxDB (Time-series)',
        'Cache: Redis Cluster (3M + 3R)',
        'Warehouse: Snowflake (Multi-TB)',
        'Search: Elasticsearch (3-node)'
      ],
      keyPoints: [
        'MongoDB: 10M users / 5 shards = 2M per shard, 6M writes/day per shard',
        'PostgreSQL: Strong consistency for account balances (ACID)',
        'Redis: &lt;1ms latency, 100K ops/sec, LRU eviction',
        'Sharding strategy: Hash on user_id (even distribution)',
        'Interview tip: Justify each database choice based on use case'
      ]
    },
    {
      id: 'observability',
      name: '8. Observability & Monitoring',
      color: 'from-slate-500 to-slate-600',
      icon: Activity,
      pattern: 'Observability Pattern',
      components: [
        'Metrics: Prometheus + Grafana',
        'Logging: ELK Stack (Elasticsearch, Logstash, Kibana)',
        'Tracing: Jaeger (Distributed Tracing)',
        'Alerting: PagerDuty'
      ],
      keyPoints: [
        'Prometheus: Scrapes metrics every 15s, 30-day retention',
        'Distributed Tracing: Traces requests across 10+ services',
        'Centralized Logging: 100GB logs/day, 7-day retention hot, 90-day cold',
        'Alerts: Latency >500ms, Error rate >1%, CPU >80%',
        'Interview tip: Emphasize importance for debugging distributed systems'
      ]
    },
    {
      id: 'external',
      name: '9. External Services',
      color: 'from-red-500 to-red-600',
      icon: Cloud,
      pattern: 'Circuit Breaker Pattern',
      components: [
        'Payment Gateway (Stripe/Square)',
        'Credit Bureau API (Equifax/Experian)',
        'Circuit Breaker (Hystrix/Resilience4j)'
      ],
      keyPoints: [
        'Circuit Breaker: Prevents cascade failures when external service is down',
        'States: Closed (normal) → Open (failing) → Half-Open (testing)',
        'Fallback: Credit check fails → Manual review queue',
        'Timeout: 3s max for external calls, 3 retries with exponential backoff',
        'Interview tip: Explain how this improves system resilience'
      ]
    }
  ];

  // Detailed Component Connections
  const detailedConnections = [
    {
      from: 'Web/Mobile',
      to: 'Load Balancer',
      description: 'HTTPS requests',
      color: 'blue'
    },
    {
      from: 'Load Balancer',
      to: 'API Gateway',
      description: 'Distributed load',
      color: 'purple'
    },
    {
      from: 'API Gateway',
      to: 'Core Services',
      description: 'Authenticated requests',
      color: 'green'
    },
    {
      from: 'Core Services',
      to: 'Event Bus',
      description: 'Publish events',
      color: 'amber'
    },
    {
      from: 'Event Bus',
      to: 'Analytics Services',
      description: 'Consume events',
      color: 'pink'
    }
  ];

  // Feature Flows with detailed steps
  const featureFlows = [
    {
      id: 'application',
      name: '1. Credit Card Application Flow',
      color: 'bg-blue-50 border-l-4 border-blue-500',
      icon: CreditCard,
      estimatedTime: '5-10 seconds',
      steps: [
        {
          layer: 'Client',
          step: 'User submits application via web/mobile',
          details: 'Form validation on client side, HTTPS POST to /api/applications',
          color: 'blue'
        },
        {
          layer: 'Gateway',
          step: 'API Gateway validates JWT token, rate limits',
          details: 'Check: Token valid? User within rate limit (10 apps/day)?',
          color: 'purple'
        },
        {
          layer: 'Core Services',
          step: 'Card Application Service receives request (Saga Orchestrator)',
          details: 'Initiates distributed Saga transaction',
          color: 'green'
        },
        {
          layer: 'Core Services',
          step: 'Saga Step 1: Call Credit Bureau API (with Circuit Breaker)',
          details: 'External API call, 3s timeout, 3 retries. If fails → compensate',
          color: 'green'
        },
        {
          layer: 'Core Services',
          step: 'Saga Step 2: Account Service creates account',
          details: 'Write to PostgreSQL (Account DB)',
          color: 'green'
        },
        {
          layer: 'Transaction Services',
          step: 'Event Store: ApplicationCreated event written (Event Sourcing)',
          details: 'Immutable event log in PostgreSQL append-only table',
          color: 'orange'
        },
        {
          layer: 'Event Bus',
          step: 'Publish ApplicationCreated to Kafka',
          details: 'Topic: applications, Partition: hash(user_id)',
          color: 'amber'
        },
        {
          layer: 'Event Bus',
          step: 'Consumers process event: Notification Service sends email',
          details: 'Asynchronous, decoupled from main flow',
          color: 'amber'
        },
        {
          layer: 'Observability',
          step: 'Jaeger traces entire flow, Prometheus records latency',
          details: 'Distributed trace ID propagated through all services',
          color: 'slate'
        }
      ],
      patterns: ['Saga Pattern', 'Event Sourcing', 'Circuit Breaker', 'CQRS'],
      interviewTips: [
        'Emphasize Saga Pattern for distributed transactions without 2PC',
        'Explain compensating transactions if Credit Bureau fails (delete account)',
        'Highlight Circuit Breaker preventing cascade failures',
        'Mention idempotency: duplicate submissions detected via request ID'
      ]
    },
    {
      id: 'transaction',
      name: '2. Post Transaction Flow',
      color: 'bg-green-50 border-l-4 border-green-500',
      icon: Zap,
      estimatedTime: '&lt;100ms',
      steps: [
        {
          layer: 'External',
          step: 'Transaction arrives from payment network (Visa/Mastercard)',
          details: 'Merchant swipes card → Payment network → Our API',
          color: 'red'
        },
        {
          layer: 'Gateway',
          step: 'API Gateway receives POST /api/transactions',
          details: 'Rate limiting bypassed for payment network (trusted source)',
          color: 'purple'
        },
        {
          layer: 'Transaction Services',
          step: 'Transaction Processor validates transaction',
          details: 'Check: Card active? Sufficient balance? Duplicate?',
          color: 'orange'
        },
        {
          layer: 'Transaction Services',
          step: 'Parallel: Fraud Detection Engine scores transaction',
          details: 'ML model (XGBoost) inference &lt;50ms, returns risk score 0-100',
          color: 'orange'
        },
        {
          layer: 'Data Layer',
          step: 'Write to MongoDB (Transaction DB) - sharded by user_id',
          details: 'Shard selection: hash(user_id) % 5, write acknowledged',
          color: 'indigo'
        },
        {
          layer: 'Transaction Services',
          step: 'Event Store: TransactionPosted event written',
          details: 'Event Sourcing: Immutable record of state change',
          color: 'orange'
        },
        {
          layer: 'Event Bus',
          step: 'Publish TransactionPosted + FraudAlert (if risky) to Kafka',
          details: 'Topics: transactions, fraud-alerts',
          color: 'amber'
        },
        {
          layer: 'Analytics Services',
          step: 'Consumers update read models asynchronously',
          details: 'Data Pipeline → Elasticsearch, Aggregator → InfluxDB',
          color: 'pink'
        },
        {
          layer: 'Core Services',
          step: 'Account Service updates balance (eventual consistency)',
          details: 'CQRS: Write model updated asynchronously',
          color: 'green'
        },
        {
          layer: 'Data Layer',
          step: 'Redis cache invalidated for user account',
          details: 'Cache-aside pattern: delete key, next read will cache-miss',
          color: 'indigo'
        }
      ],
      patterns: ['Event Sourcing', 'CQRS', 'Sharding', 'Cache-Aside'],
      interviewTips: [
        'Highlight &lt;100ms latency requirement for transaction posting',
        'Explain parallel fraud detection (non-blocking)',
        'Emphasize MongoDB sharding for horizontal scaling (10M users)',
        'Discuss eventual consistency trade-off (balance updates async)',
        'Mention Event Sourcing provides complete audit trail'
      ]
    },
    {
      id: 'payment',
      name: '3. Payment Processing & View Balance Flow',
      color: 'bg-purple-50 border-l-4 border-purple-500',
      icon: CreditCard,
      estimatedTime: '2-5 seconds',
      steps: [
        {
          layer: 'Client',
          step: 'User initiates payment via web/mobile',
          details: 'POST /api/payments with amount, card_id, idempotency_key',
          color: 'blue'
        },
        {
          layer: 'Core Services',
          step: 'Payment Service checks idempotency key in Redis',
          details: 'If exists: return cached response (prevents double-charge)',
          color: 'green'
        },
        {
          layer: 'Core Services',
          step: 'Payment Service calls external Payment Gateway (Circuit Breaker)',
          details: 'Stripe API: Create charge, 5s timeout, retry with backoff',
          color: 'green'
        },
        {
          layer: 'External',
          step: 'Payment Gateway processes payment',
          details: 'External service, PCI compliance handled by Stripe',
          color: 'red'
        },
        {
          layer: 'Transaction Services',
          step: 'Event Store: PaymentProcessed event written',
          details: 'Event Sourcing: Immutable record',
          color: 'orange'
        },
        {
          layer: 'Event Bus',
          step: 'Publish PaymentProcessed to Kafka',
          details: 'Consumed by Account Service, Notification Service, Analytics',
          color: 'amber'
        },
        {
          layer: 'Core Services',
          step: 'User views balance: Account Service (CQRS Read path)',
          details: 'GET /api/accounts/{id}/balance',
          color: 'green'
        },
        {
          layer: 'Data Layer',
          step: 'Check Redis cache first (Cache-Aside)',
          details: 'Cache hit: return &lt;1ms. Cache miss: query PostgreSQL',
          color: 'indigo'
        },
        {
          layer: 'Data Layer',
          step: 'If cache miss: Query PostgreSQL Read Replica',
          details: 'Read replica: No impact on write performance',
          color: 'indigo'
        },
        {
          layer: 'Data Layer',
          step: 'Cache result in Redis (TTL: 5 min)',
          details: 'Next read will be &lt;1ms from cache',
          color: 'indigo'
        }
      ],
      patterns: ['Idempotency', 'Circuit Breaker', 'CQRS', 'Cache-Aside'],
      interviewTips: [
        'Emphasize idempotency key (UUID) prevents duplicate charges',
        'Explain Circuit Breaker protects against Stripe outages',
        'Highlight CQRS: Separate read/write paths for performance',
        'Discuss cache-aside pattern: &lt;1ms for cached reads',
        'Mention read replicas: Scale read traffic independently'
      ]
    },
    {
      id: 'stats',
      name: '4. View Daily/Weekly/Monthly Stats Flow',
      color: 'bg-pink-50 border-l-4 border-pink-500',
      icon: BarChart,
      estimatedTime: '&lt;200ms',
      steps: [
        {
          layer: 'Client',
          step: 'User requests stats dashboard',
          details: 'GET /api/analytics/stats?period=daily|weekly|monthly',
          color: 'blue'
        },
        {
          layer: 'Gateway',
          step: 'API Gateway routes to Analytics Service',
          details: 'Read-only request, no authentication of write operations',
          color: 'purple'
        },
        {
          layer: 'Analytics Services',
          step: 'Aggregator service receives request',
          details: 'CQRS Read Model: Queries pre-aggregated data',
          color: 'pink'
        },
        {
          layer: 'Data Layer',
          step: 'Query InfluxDB (Time-series DB) for stats',
          details: 'Optimized for time-range queries, windowed aggregations',
          color: 'indigo'
        },
        {
          layer: 'Analytics Services',
          step: 'Data Pipeline continuously updates InfluxDB',
          details: 'Kafka Streams: Real-time ETL from transactions topic',
          color: 'pink'
        },
        {
          layer: 'Data Layer',
          step: 'For historical data: Query Snowflake',
          details: 'Multi-TB warehouse, queries 2+ years of data',
          color: 'indigo'
        },
        {
          layer: 'Analytics Services',
          step: 'Return aggregated stats to client',
          details: 'JSON response: {daily: {...}, weekly: {...}, monthly: {...}}',
          color: 'pink'
        }
      ],
      patterns: ['CQRS', 'Time-series DB', 'Stream Processing', 'Data Warehouse'],
      interviewTips: [
        'Emphasize CQRS: Stats queries don\'t impact transaction processing',
        'Explain InfluxDB choice: Optimized for time-series aggregations',
        'Highlight Kafka Streams: Real-time ETL (5-15 min eventual consistency)',
        'Discuss Snowflake: Handles historical analytics (2+ years)',
        'Mention pre-aggregation: Calculate stats in background, serve cached'
      ]
    }
  ];

  // Tech Stack by Layer with Interview Points
  const techStack = [
    {
      layer: 'Client Layer',
      technologies: [
        {
          name: 'React/Angular',
          reason: 'Component-based, virtual DOM, rich ecosystem',
          interviewPoint: 'Mention SPA benefits: Fast interactions, better UX'
        },
        {
          name: 'React Native',
          reason: 'Cross-platform mobile, code reuse, native performance',
          interviewPoint: 'Explain trade-off: Faster development vs pure native'
        }
      ]
    },
    {
      layer: 'API Gateway',
      technologies: [
        {
          name: 'Kong / AWS API Gateway',
          reason: 'Built-in rate limiting, auth plugins, routing, minimal config',
          interviewPoint: 'Highlight how it centralizes cross-cutting concerns'
        },
        {
          name: 'NGINX',
          reason: 'High-performance load balancer, 10K+ concurrent connections',
          interviewPoint: 'Mention Layer 4 (TCP) vs Layer 7 (HTTP) load balancing'
        },
        {
          name: 'Redis (Rate Limiting)',
          reason: 'Atomic INCR operation, &lt;1ms latency, Token Bucket algorithm',
          interviewPoint: 'Explain Token Bucket: Allows bursts, fair over time'
        }
      ]
    },
    {
      layer: 'Core Services',
      technologies: [
        {
          name: 'Spring Boot (Java)',
          reason: 'Microservices framework, easy deployment, extensive ecosystem',
          interviewPoint: 'Mention Spring Cloud for service discovery, config'
        },
        {
          name: 'FastAPI (Python)',
          reason: 'High performance, async support, auto API docs',
          interviewPoint: 'Good for ML services (fraud detection)'
        }
      ]
    },
    {
      layer: 'Event Bus',
      technologies: [
        {
          name: 'Apache Kafka',
          reason: 'High throughput (30M events/day), durability, replay capability',
          interviewPoint: 'Highlight: Partitioning for parallelism, consumer groups'
        }
      ]
    },
    {
      layer: 'Transaction DB',
      technologies: [
        {
          name: 'MongoDB (Sharded)',
          reason: 'High write throughput (6M/shard/day), auto-sharding, flexible schema',
          interviewPoint: 'Discuss sharding strategy: Hash on user_id for even distribution'
        }
      ]
    },
    {
      layer: 'Account DB',
      technologies: [
        {
          name: 'PostgreSQL',
          reason: 'ACID compliance, strong consistency for balances, read replicas',
          interviewPoint: 'Explain why ACID needed for financial data (balances)'
        }
      ]
    },
    {
      layer: 'Cache',
      technologies: [
        {
          name: 'Redis Cluster',
          reason: '&lt;1ms latency, atomic ops, pub/sub, LRU eviction',
          interviewPoint: 'Mention cache-aside pattern, TTL strategy'
        }
      ]
    },
    {
      layer: 'Analytics',
      technologies: [
        {
          name: 'InfluxDB',
          reason: 'Time-series optimized, windowed aggregations, fast queries',
          interviewPoint: 'Perfect for daily/weekly/monthly stats use case'
        },
        {
          name: 'Snowflake',
          reason: 'Multi-TB scale, auto-scaling, separates compute from storage',
          interviewPoint: 'Discuss: Don\'t impact production DB with analytics queries'
        },
        {
          name: 'Elasticsearch',
          reason: 'Full-text search, faceted search, sub-second queries',
          interviewPoint: 'Explain inverted index, great for transaction search'
        }
      ]
    }
  ];

  // Capacity Estimates for Interview
  const capacityEstimates = {
    title: 'Capacity Planning (10M Users)',
    calculations: [
      {
        metric: 'Transactions per day',
        calculation: '10M users × 3 txns/day = 30M txns/day',
        perSecond: '30M / 86400s ≈ 347 txns/sec',
        peak: 'Peak (5x) = 1,735 txns/sec',
        infrastructure: 'MongoDB: 5 shards × 6M txns/day = handle 347 txns/sec easily'
      },
      {
        metric: 'Account views per day',
        calculation: '10M users × 1 view/day = 10M views/day',
        perSecond: '10M / 86400s ≈ 116 views/sec',
        peak: 'Peak (10x) = 1,160 views/sec',
        infrastructure: 'PostgreSQL: 2 read replicas + Redis cache = handle 1K+ reads/sec'
      },
      {
        metric: 'Storage (Transactions)',
        calculation: '30M txns/day × 1KB per txn = 30GB/day',
        yearly: '30GB × 365 = 10.95TB/year',
        sharding: 'Per shard: 10.95TB / 5 = 2.19TB/shard/year (manageable)',
        infrastructure: 'MongoDB: Each shard handles 2TB comfortably'
      },
      {
        metric: 'Kafka Throughput',
        calculation: '30M events/day × 2KB per event = 60GB/day',
        perSecond: '60GB / 86400s ≈ 694KB/sec',
        infrastructure: 'Kafka: 3 brokers can handle 100MB/sec easily'
      },
      {
        metric: 'Cache Memory (Redis)',
        calculation: 'Hot data: 10% of users active = 1M users',
        memory: '1M users × 10KB (account + recent txns) = 10GB',
        infrastructure: 'Redis Cluster: 3 masters × 8GB = 24GB (2.4x overhead for safety)'
      }
    ]
  };

  // Security & Compliance Points
  const securityCompliance = [
    {
      aspect: 'PCI DSS Compliance',
      points: [
        'Tokenization: Credit card numbers never stored, use tokens from Stripe',
        'Encryption: AES-256 at rest, TLS 1.3 in transit',
        'Network segmentation: DMZ for API Gateway, private subnet for services',
        'Access control: Least privilege, role-based access (RBAC)',
        'Audit trail: Event Sourcing provides immutable log of all state changes'
      ]
    },
    {
      aspect: 'Data Privacy (GDPR)',
      points: [
        'Right to be forgotten: Soft delete + anonymize events in Event Store',
        'Data minimization: Only collect necessary data',
        'Encryption: Personal data encrypted at rest and in transit',
        'Access logs: Track who accessed what data (compliance audits)'
      ]
    },
    {
      aspect: 'Authentication & Authorization',
      points: [
        'OAuth 2.0 + OpenID Connect for authentication',
        'JWT tokens: Short-lived (15 min), refresh tokens (7 days)',
        'MFA: Two-factor authentication for high-value operations',
        'API keys: For 3rd party integrations, scoped permissions',
        'Rate limiting: Prevent brute-force attacks'
      ]
    },
    {
      aspect: 'Fraud Prevention',
      points: [
        'Real-time ML scoring: XGBoost model, &lt;100ms inference',
        'Velocity checks: Max 10 txns/hour per card',
        'Geolocation: Flag transactions from unusual locations',
        'Device fingerprinting: Track device IDs',
        'Manual review queue: Flagged transactions reviewed by humans'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 px-5 py-2.5 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 font-medium rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            ← Back to Projects
          </button>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Credit Card Portal</h1>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold uppercase tracking-wide">Interview Ready</span>
          </div>
          <p className="text-xl text-gray-600 mb-6 font-light">
            System design for 10M users · 30M transactions/day · CQRS · Event Sourcing · Saga patterns
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">CQRS Pattern</span>
            <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-100">Event Sourcing</span>
            <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-100">Saga Pattern</span>
            <span className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium border border-orange-100">Circuit Breaker</span>
            <span className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-100">Database Sharding</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b-2 border-gray-100 overflow-x-auto pb-0">
          {['main', 'diagram', 'detailed', 'flows', 'cqrs', 'techstack', 'dataflow', 'api'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600 -mb-0.5'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab === 'main' && 'Architecture'}
              {tab === 'diagram' && 'Component Diagram'}
              {tab === 'detailed' && 'Detailed Design'}
              {tab === 'flows' && 'Feature Flows'}
              {tab === 'cqrs' && 'CQRS Pattern'}
              {tab === 'techstack' && 'Tech Stack'}
              {tab === 'dataflow' && 'Data Flow'}
              {tab === 'api' && 'API Endpoints'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'main' && (
          <div className="space-y-8">
            {/* System Overview */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Layers className="w-6 h-6 text-blue-600" />
                </div>
                System Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-700 mb-4">Requirements</h3>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2 text-gray-700"><span className="text-blue-500 font-bold">•</span><span>10,000,000 active users</span></li>
                    <li className="flex items-start gap-2 text-gray-700"><span className="text-blue-500 font-bold">•</span><span>3 transactions per user per day</span></li>
                    <li className="flex items-start gap-2 text-gray-700"><span className="text-blue-500 font-bold">•</span><span>1 account view per user per day</span></li>
                    <li className="flex items-start gap-2 text-gray-700"><span className="text-blue-500 font-bold">•</span><span>Credit card applications</span></li>
                    <li className="flex items-start gap-2 text-gray-700"><span className="text-blue-500 font-bold">•</span><span>Payment processing</span></li>
                    <li className="flex items-start gap-2 text-gray-700"><span className="text-blue-500 font-bold">•</span><span>Daily/Weekly/Monthly statistics</span></li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                  <h3 className="text-lg font-bold text-green-700 mb-4">Design Patterns</h3>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2 text-gray-700"><span className="text-green-500 font-bold">•</span><span>CQRS: Read/Write separation</span></li>
                    <li className="flex items-start gap-2 text-gray-700"><span className="text-green-500 font-bold">•</span><span>Event Sourcing: Immutable event log</span></li>
                    <li className="flex items-start gap-2 text-gray-700"><span className="text-green-500 font-bold">•</span><span>Saga: Distributed transactions</span></li>
                    <li className="flex items-start gap-2 text-gray-700"><span className="text-green-500 font-bold">•</span><span>Circuit Breaker: Fault tolerance</span></li>
                    <li className="flex items-start gap-2 text-gray-700"><span className="text-green-500 font-bold">•</span><span>Database Sharding: Horizontal scaling</span></li>
                    <li className="flex items-start gap-2 text-gray-700"><span className="text-green-500 font-bold">•</span><span>Cache-Aside: Performance optimization</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Architecture Layers */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                9-Layer Architecture
              </h2>
              <p className="text-gray-600 mb-8">
                Click each layer to view detailed components and interview talking points
              </p>

              <div className="space-y-4">
                {architectureLayers.map((layer) => {
                  const Icon = layer.icon;
                  return (
                    <div key={layer.id}>
                      <button
                        onClick={() => toggleLayer(layer.id)}
                        className={`w-full p-5 rounded-xl bg-gradient-to-r ${layer.color} text-white font-semibold flex items-center gap-4 hover:shadow-lg transition-all border border-white/20`}
                      >
                        <div className="p-2 bg-white/20 rounded-lg">
                          <Icon size={22} />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-bold text-lg">{layer.name}</div>
                          <div className="text-sm opacity-90 font-normal">Pattern: {layer.pattern}</div>
                        </div>
                        {expandedLayers[layer.id] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-lg">{layer.components.length} components</span>
                      </button>

                      {expandedLayers[layer.id] && (
                        <div className="bg-gray-50 mt-3 p-6 rounded-xl border border-gray-200 ml-0 md:ml-6">
                          {/* Components */}
                          <h4 className="text-gray-900 font-bold mb-4 flex items-center gap-2">
                            <Box className="w-5 h-5 text-blue-600" />
                            Components
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                            {layer.components.map((comp, i) => (
                              <div key={i} className="flex items-start gap-2 text-gray-700 text-sm bg-white p-3 rounded-lg border border-gray-100">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                                <span>{comp}</span>
                              </div>
                            ))}
                          </div>

                          {/* Key Interview Points */}
                          <h4 className="text-gray-900 font-bold mb-4 mt-8 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-amber-600" />
                            Interview Talking Points
                          </h4>
                          <div className="space-y-3">
                            {layer.keyPoints.map((point, i) => (
                              <div key={i} className="flex gap-3 bg-white p-4 rounded-lg border border-amber-100">
                                <Check className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                                <p className="text-gray-700 text-sm leading-relaxed">{point}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Capacity Planning */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                {capacityEstimates.title}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {capacityEstimates.calculations.map((calc, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{calc.metric}</h3>
                    <div className="space-y-2.5">
                      <p className="text-sm text-gray-700"><span className="font-semibold text-gray-900">Calculation:</span> {calc.calculation}</p>
                      <p className="text-sm text-gray-700"><span className="font-semibold text-gray-900">Per second:</span> {calc.perSecond}</p>
                      <p className="text-sm text-gray-700"><span className="font-semibold text-gray-900">Peak load:</span> {calc.peak}</p>
                      {calc.yearly && <p className="text-sm text-gray-700"><span className="font-semibold text-gray-900">Yearly:</span> {calc.yearly}</p>}
                      {calc.sharding && <p className="text-sm text-gray-700"><span className="font-semibold text-gray-900">Per shard:</span> {calc.sharding}</p>}
                      {calc.memory && <p className="text-sm text-gray-700"><span className="font-semibold text-gray-900">Memory:</span> {calc.memory}</p>}
                      <div className="pt-3 mt-3 border-t border-gray-100">
                        <p className="text-sm text-green-700 font-medium flex items-start gap-2">
                          <Check size={18} className="flex-shrink-0 mt-0.5" />
                          <span>{calc.infrastructure}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'diagram' && (
          <div className="space-y-6">
            {/* Component Diagram Overview */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <div className="p-2 bg-indigo-600 rounded-lg">
                  <Network className="w-7 h-7 text-white" />
                </div>
                Component Relationship Diagram
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Visual representation showing how all components interact with each other. Follow the arrows to understand data flow and dependencies.
              </p>
            </div>

            {/* Legend */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                Diagram Legend
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-sm text-gray-700">Client Layer</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
                  <span className="text-sm text-gray-700">Gateway Layer</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-700">Services Layer</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span className="text-sm text-gray-700">Transaction Layer</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-pink-500 rounded"></div>
                  <span className="text-sm text-gray-700">Analytics Layer</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-amber-500 rounded"></div>
                  <span className="text-sm text-gray-700">Event Bus</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-indigo-500 rounded"></div>
                  <span className="text-sm text-gray-700">Data Layer</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm text-gray-700">External Services</span>
                </div>
              </div>
            </div>

            {/* Main Diagram */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg overflow-x-auto">
              <div className="min-w-[1000px]">
                {/* Layer 1: Client Layer */}
                <div className="mb-8">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-t-lg font-bold text-lg flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Layer 1: Client Applications
                  </div>
                  <div className="grid grid-cols-4 gap-4 p-6 bg-blue-50 rounded-b-lg border-2 border-blue-200">
                    <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-blue-300">
                      <div className="font-semibold text-blue-900 mb-2">Web App</div>
                      <div className="text-xs text-gray-600">React/Angular</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-blue-300">
                      <div className="font-semibold text-blue-900 mb-2">Mobile App</div>
                      <div className="text-xs text-gray-600">iOS/Android</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-blue-300">
                      <div className="font-semibold text-blue-900 mb-2">3rd Party API</div>
                      <div className="text-xs text-gray-600">OAuth 2.0</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-blue-300">
                      <div className="font-semibold text-blue-900 mb-2">Admin Dashboard</div>
                      <div className="text-xs text-gray-600">Internal Tools</div>
                    </div>
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center mb-8">
                  <div className="flex flex-col items-center">
                    <ChevronDown className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-500 font-medium">HTTPS Requests</span>
                    <ChevronDown className="w-8 h-8 text-gray-400" />
                  </div>
                </div>

                {/* Layer 2: Gateway Layer */}
                <div className="mb-8">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-t-lg font-bold text-lg flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Layer 2: API Gateway & Security
                  </div>
                  <div className="grid grid-cols-3 gap-4 p-6 bg-purple-50 rounded-b-lg border-2 border-purple-200">
                    <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-purple-300">
                      <div className="font-semibold text-purple-900 mb-2">Load Balancer</div>
                      <div className="text-xs text-gray-600">NGINX / AWS ALB</div>
                      <div className="text-xs text-purple-700 mt-1">→ Distributes Traffic</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-purple-300">
                      <div className="font-semibold text-purple-900 mb-2">API Gateway</div>
                      <div className="text-xs text-gray-600">Kong / AWS Gateway</div>
                      <div className="text-xs text-purple-700 mt-1">→ Routes Requests</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-purple-300">
                      <div className="font-semibold text-purple-900 mb-2">Auth Service</div>
                      <div className="text-xs text-gray-600">OAuth 2.0 + JWT</div>
                      <div className="text-xs text-purple-700 mt-1">→ Validates Tokens</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 p-6 bg-purple-50 rounded-b-lg border-2 border-t-0 border-purple-200">
                    <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-purple-300">
                      <div className="font-semibold text-purple-900 mb-2">Rate Limiter</div>
                      <div className="text-xs text-gray-600">Redis + Token Bucket</div>
                      <div className="text-xs text-purple-700 mt-1">→ 1000 req/min/user</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-purple-300">
                      <div className="font-semibold text-purple-900 mb-2">WAF</div>
                      <div className="text-xs text-gray-600">Web Application Firewall</div>
                      <div className="text-xs text-purple-700 mt-1">→ Blocks Attacks</div>
                    </div>
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center mb-8">
                  <div className="flex flex-col items-center">
                    <ChevronDown className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-500 font-medium">Authenticated Requests</span>
                    <ChevronDown className="w-8 h-8 text-gray-400" />
                  </div>
                </div>

                {/* Layer 3 & 4: Core Services + Transaction Services (Side by Side) */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {/* Core Services */}
                  <div>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-t-lg font-bold text-lg flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Layer 3: Core Services
                    </div>
                    <div className="space-y-4 p-6 bg-green-50 rounded-b-lg border-2 border-green-200">
                      <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-green-300">
                        <div className="font-semibold text-green-900 mb-2">Card Application Service</div>
                        <div className="text-xs text-gray-600">Saga Orchestrator</div>
                        <div className="text-xs text-green-700 mt-1">→ Manages Applications</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-green-300">
                        <div className="font-semibold text-green-900 mb-2">Account Service</div>
                        <div className="text-xs text-gray-600">CQRS Pattern</div>
                        <div className="text-xs text-green-700 mt-1">→ Manages Accounts</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-green-300">
                        <div className="font-semibold text-green-900 mb-2">Payment Service</div>
                        <div className="text-xs text-gray-600">Idempotent API</div>
                        <div className="text-xs text-green-700 mt-1">→ Processes Payments</div>
                      </div>
                    </div>
                  </div>

                  {/* Transaction Services */}
                  <div>
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-t-lg font-bold text-lg flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Layer 4: Transaction Services
                    </div>
                    <div className="space-y-4 p-6 bg-orange-50 rounded-b-lg border-2 border-orange-200">
                      <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-orange-300">
                        <div className="font-semibold text-orange-900 mb-2">Transaction Processor</div>
                        <div className="text-xs text-gray-600">Validates Transactions</div>
                        <div className="text-xs text-orange-700 mt-1">→ 347 txn/sec avg</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-orange-300">
                        <div className="font-semibold text-orange-900 mb-2">Fraud Detection</div>
                        <div className="text-xs text-gray-600">ML Model (XGBoost)</div>
                        <div className="text-xs text-orange-700 mt-1">→ &lt;100ms scoring</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-orange-300">
                        <div className="font-semibold text-orange-900 mb-2">Event Store</div>
                        <div className="text-xs text-gray-600">PostgreSQL Append-Only</div>
                        <div className="text-xs text-orange-700 mt-1">→ Immutable Events</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bidirectional Arrows */}
                <div className="flex justify-around mb-8">
                  <div className="flex flex-col items-center">
                    <ChevronDown className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-500 font-medium text-center">Writes to<br/>Databases</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <ChevronDown className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-500 font-medium text-center">Publishes<br/>Events</span>
                    <ChevronDown className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="flex flex-col items-center">
                    <ChevronDown className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-500 font-medium text-center">Reads from<br/>Cache/DB</span>
                  </div>
                </div>

                {/* Layer 5 & 6: Analytics + Event Bus (Side by Side) */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {/* Analytics Services */}
                  <div>
                    <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-t-lg font-bold text-lg flex items-center gap-2">
                      <BarChart className="w-5 h-5" />
                      Layer 5: Analytics
                    </div>
                    <div className="space-y-4 p-6 bg-pink-50 rounded-b-lg border-2 border-pink-200">
                      <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-pink-300">
                        <div className="font-semibold text-pink-900 mb-2">Data Pipeline</div>
                        <div className="text-xs text-gray-600">Kafka Streams ETL</div>
                        <div className="text-xs text-pink-700 mt-1">→ Real-time Processing</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-pink-300">
                        <div className="font-semibold text-pink-900 mb-2">Aggregator</div>
                        <div className="text-xs text-gray-600">Real-time Stats</div>
                        <div className="text-xs text-pink-700 mt-1">→ Pre-aggregation</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-pink-300">
                        <div className="font-semibold text-pink-900 mb-2">Report Generator</div>
                        <div className="text-xs text-gray-600">Daily/Weekly/Monthly</div>
                        <div className="text-xs text-pink-700 mt-1">→ Business Intelligence</div>
                      </div>
                    </div>
                  </div>

                  {/* Event Bus */}
                  <div>
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-t-lg font-bold text-lg flex items-center gap-2">
                      <GitBranch className="w-5 h-5" />
                      Layer 6: Event Bus
                    </div>
                    <div className="space-y-4 p-6 bg-amber-50 rounded-b-lg border-2 border-amber-200">
                      <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-amber-300">
                        <div className="font-semibold text-amber-900 mb-2">Apache Kafka</div>
                        <div className="text-xs text-gray-600">3-node Cluster</div>
                        <div className="text-xs text-amber-700 mt-1">→ 30M events/day</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-amber-300">
                        <div className="font-semibold text-amber-900 mb-2">Topics</div>
                        <div className="text-xs text-gray-600">ApplicationCreated</div>
                        <div className="text-xs text-gray-600">TransactionPosted</div>
                        <div className="text-xs text-gray-600">PaymentProcessed</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-amber-300">
                        <div className="font-semibold text-amber-900 mb-2">Consumer Groups</div>
                        <div className="text-xs text-gray-600">Data Pipeline</div>
                        <div className="text-xs text-gray-600">Notification Service</div>
                        <div className="text-xs text-gray-600">Analytics</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center mb-8">
                  <div className="flex flex-col items-center">
                    <ChevronDown className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-500 font-medium">Stores Data</span>
                    <ChevronDown className="w-8 h-8 text-gray-400" />
                  </div>
                </div>

                {/* Layer 7: Data Layer */}
                <div className="mb-8">
                  <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-4 py-2 rounded-t-lg font-bold text-lg flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Layer 7: Data Layer (Polyglot Persistence)
                  </div>
                  <div className="grid grid-cols-4 gap-4 p-6 bg-indigo-50 rounded-b-lg border-2 border-indigo-200">
                    <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-indigo-300">
                      <div className="font-semibold text-indigo-900 mb-2">MongoDB</div>
                      <div className="text-xs text-gray-600">Transaction DB</div>
                      <div className="text-xs text-indigo-700 mt-1">5 Shards</div>
                      <div className="text-xs text-indigo-700">2M users/shard</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-indigo-300">
                      <div className="font-semibold text-indigo-900 mb-2">PostgreSQL</div>
                      <div className="text-xs text-gray-600">Account DB</div>
                      <div className="text-xs text-indigo-700 mt-1">1 Primary</div>
                      <div className="text-xs text-indigo-700">2 Read Replicas</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-indigo-300">
                      <div className="font-semibold text-indigo-900 mb-2">Redis Cluster</div>
                      <div className="text-xs text-gray-600">Cache Layer</div>
                      <div className="text-xs text-indigo-700 mt-1">3 Masters</div>
                      <div className="text-xs text-indigo-700">3 Replicas</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-indigo-300">
                      <div className="font-semibold text-indigo-900 mb-2">InfluxDB</div>
                      <div className="text-xs text-gray-600">Analytics DB</div>
                      <div className="text-xs text-indigo-700 mt-1">Time-series</div>
                      <div className="text-xs text-indigo-700">Real-time stats</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 p-6 bg-indigo-50 rounded-b-lg border-2 border-t-0 border-indigo-200">
                    <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-indigo-300">
                      <div className="font-semibold text-indigo-900 mb-2">Elasticsearch</div>
                      <div className="text-xs text-gray-600">Search Engine</div>
                      <div className="text-xs text-indigo-700 mt-1">3-node cluster</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-indigo-300">
                      <div className="font-semibold text-indigo-900 mb-2">Snowflake</div>
                      <div className="text-xs text-gray-600">Data Warehouse</div>
                      <div className="text-xs text-indigo-700 mt-1">Multi-TB storage</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-indigo-300">
                      <div className="font-semibold text-indigo-900 mb-2">PostgreSQL</div>
                      <div className="text-xs text-gray-600">Event Store</div>
                      <div className="text-xs text-indigo-700 mt-1">Append-only log</div>
                    </div>
                  </div>
                </div>

                {/* Layer 8: External Services */}
                <div className="mb-8">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-t-lg font-bold text-lg flex items-center gap-2">
                    <Cloud className="w-5 h-5" />
                    Layer 8: External Services (with Circuit Breaker)
                  </div>
                  <div className="grid grid-cols-3 gap-4 p-6 bg-red-50 rounded-b-lg border-2 border-red-200">
                    <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-red-300">
                      <div className="font-semibold text-red-900 mb-2">Payment Gateway</div>
                      <div className="text-xs text-gray-600">Stripe / Square</div>
                      <div className="text-xs text-red-700 mt-1">→ PCI Compliance</div>
                      <div className="text-xs text-red-700">→ 5s timeout</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-red-300">
                      <div className="font-semibold text-red-900 mb-2">Credit Bureau</div>
                      <div className="text-xs text-gray-600">Equifax / Experian</div>
                      <div className="text-xs text-red-700 mt-1">→ Credit Checks</div>
                      <div className="text-xs text-red-700">→ 3s timeout</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-red-300">
                      <div className="font-semibold text-red-900 mb-2">Circuit Breaker</div>
                      <div className="text-xs text-gray-600">Resilience4j</div>
                      <div className="text-xs text-red-700 mt-1">→ Prevents Cascade</div>
                      <div className="text-xs text-red-700">→ Fallback Logic</div>
                    </div>
                  </div>
                </div>

                {/* Layer 9: Observability (Spans Across All) */}
                <div>
                  <div className="bg-gradient-to-r from-slate-500 to-slate-600 text-white px-4 py-2 rounded-t-lg font-bold text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Layer 9: Observability (Cross-Cutting Concern)
                  </div>
                  <div className="grid grid-cols-4 gap-4 p-6 bg-slate-50 rounded-b-lg border-2 border-slate-200">
                    <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-slate-300">
                      <div className="font-semibold text-slate-900 mb-2">Prometheus</div>
                      <div className="text-xs text-gray-600">Metrics Collection</div>
                      <div className="text-xs text-slate-700 mt-1">→ 15s scrape interval</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-slate-300">
                      <div className="font-semibold text-slate-900 mb-2">Grafana</div>
                      <div className="text-xs text-gray-600">Visualization</div>
                      <div className="text-xs text-slate-700 mt-1">→ Real-time dashboards</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-slate-300">
                      <div className="font-semibold text-slate-900 mb-2">ELK Stack</div>
                      <div className="text-xs text-gray-600">Centralized Logging</div>
                      <div className="text-xs text-slate-700 mt-1">→ 100GB logs/day</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-slate-300">
                      <div className="font-semibold text-slate-900 mb-2">Jaeger</div>
                      <div className="text-xs text-gray-600">Distributed Tracing</div>
                      <div className="text-xs text-slate-700 mt-1">→ End-to-end traces</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Component Relationships */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Network className="w-6 h-6 text-indigo-600" />
                Key Component Relationships
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-4 text-lg">Synchronous Communication</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">
                        <span className="font-semibold">Client → API Gateway:</span> HTTPS REST calls
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">
                        <span className="font-semibold">API Gateway → Services:</span> Internal HTTP/gRPC
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">
                        <span className="font-semibold">Services → Databases:</span> Connection pooling (100 conns/service)
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">
                        <span className="font-semibold">Services → External APIs:</span> Circuit breaker protected
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border-2 border-amber-200">
                  <h4 className="font-bold text-amber-900 mb-4 text-lg">Asynchronous Communication</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">
                        <span className="font-semibold">Services → Kafka:</span> Publish events (at-least-once)
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">
                        <span className="font-semibold">Kafka → Consumers:</span> Consumer groups with parallel processing
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">
                        <span className="font-semibold">Data Pipeline → Read DBs:</span> CQRS eventual consistency (5-15 min)
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">
                        <span className="font-semibold">Event Store → Kafka:</span> Event sourcing → event bus
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Flow Patterns */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-200 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <GitBranch className="w-6 h-6 text-indigo-600" />
                Critical Data Flow Patterns
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border-2 border-green-200 shadow-sm">
                  <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Write Path (CQRS)
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>1. Client sends command</div>
                    <div>2. Service validates & writes to DB</div>
                    <div>3. Event published to Kafka</div>
                    <div>4. Consumers update read models</div>
                    <div className="text-green-700 font-semibold mt-2">→ Optimized for throughput</div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border-2 border-blue-200 shadow-sm">
                  <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Read Path (CQRS)
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>1. Client sends query</div>
                    <div>2. Check Redis cache (L1)</div>
                    <div>3. If miss: Query read replica (L2)</div>
                    <div>4. Cache result with TTL</div>
                    <div className="text-blue-700 font-semibold mt-2">→ Optimized for speed</div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border-2 border-orange-200 shadow-sm">
                  <h4 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Event Flow
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>1. Service creates event</div>
                    <div>2. Stores in Event Store</div>
                    <div>3. Publishes to Kafka topic</div>
                    <div>4. Multiple consumers process</div>
                    <div className="text-orange-700 font-semibold mt-2">→ Decoupled services</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flow Diagram with Patterns */}
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-8 border-2 border-indigo-300 shadow-lg">
              <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Network className="w-8 h-8 text-indigo-300" />
                Component Flow Diagram with Patterns
              </h3>
              <p className="text-indigo-200 mb-8 text-lg">
                Follow the arrows to see how requests flow through the system. Each arrow is labeled with the design pattern being used.
              </p>

              <div className="bg-white rounded-xl p-8 overflow-x-auto">
                <div className="min-w-[1200px]">
                  {/* Row 1: Client to Gateway */}
                  <div className="mb-12">
                    <div className="flex items-center justify-center gap-6">
                      {/* Client */}
                      <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                        <Globe className="w-8 h-8 mx-auto mb-2" />
                        <div className="font-bold text-lg">Client Apps</div>
                        <div className="text-xs mt-1">Web/Mobile/API</div>
                      </div>

                      {/* Arrow with Pattern */}
                      <div className="flex-1 relative">
                        <div className="border-t-4 border-purple-500 relative">
                          <div className="absolute right-0 top-0 transform -translate-y-1/2">
                            <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-purple-500"></div>
                          </div>
                        </div>
                        <div className="bg-purple-100 border-2 border-purple-500 rounded-lg px-4 py-2 text-center mt-2">
                          <div className="font-bold text-purple-900 text-sm">API Gateway Pattern</div>
                          <div className="text-xs text-purple-700">Single entry point</div>
                          <div className="text-xs text-purple-700">HTTPS / TLS 1.3</div>
                        </div>
                      </div>

                      {/* Gateway */}
                      <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                        <Lock className="w-8 h-8 mx-auto mb-2" />
                        <div className="font-bold text-lg">API Gateway</div>
                        <div className="text-xs mt-1">Auth + Rate Limit</div>
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Gateway to Services (Fork) */}
                  <div className="mb-12">
                    <div className="flex justify-center mb-8">
                      <div className="text-center">
                        <ChevronDown className="w-12 h-12 text-gray-400 mx-auto" />
                        <div className="bg-green-100 border-2 border-green-500 rounded-lg px-4 py-2 mt-2">
                          <div className="font-bold text-green-900 text-sm">API Composition</div>
                          <div className="text-xs text-green-700">Routes to microservices</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      {/* Card Service */}
                      <div>
                        <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg text-center">
                          <CreditCard className="w-8 h-8 mx-auto mb-2" />
                          <div className="font-bold">Card Service</div>
                          <div className="text-xs mt-1">Saga Orchestrator</div>
                        </div>
                        <div className="bg-green-100 border-2 border-green-500 rounded-lg px-3 py-2 mt-3 text-center">
                          <div className="font-bold text-green-900 text-xs">Saga Pattern</div>
                          <div className="text-xs text-green-700">Distributed TX</div>
                        </div>
                      </div>

                      {/* Account Service */}
                      <div>
                        <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg text-center">
                          <Users className="w-8 h-8 mx-auto mb-2" />
                          <div className="font-bold">Account Service</div>
                          <div className="text-xs mt-1">CQRS Pattern</div>
                        </div>
                        <div className="bg-green-100 border-2 border-green-500 rounded-lg px-3 py-2 mt-3 text-center">
                          <div className="font-bold text-green-900 text-xs">CQRS Pattern</div>
                          <div className="text-xs text-green-700">Read/Write Split</div>
                        </div>
                      </div>

                      {/* Transaction Service */}
                      <div>
                        <div className="bg-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
                          <Zap className="w-8 h-8 mx-auto mb-2" />
                          <div className="font-bold">Transaction Service</div>
                          <div className="text-xs mt-1">Event Sourcing</div>
                        </div>
                        <div className="bg-orange-100 border-2 border-orange-500 rounded-lg px-3 py-2 mt-3 text-center">
                          <div className="font-bold text-orange-900 text-xs">Event Sourcing</div>
                          <div className="text-xs text-orange-700">Immutable Log</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Services to Data/Events (Split) */}
                  <div className="mb-12">
                    <div className="grid grid-cols-2 gap-12">
                      {/* Left: Database Path */}
                      <div>
                        <div className="flex justify-center mb-6">
                          <div className="text-center">
                            <ChevronDown className="w-12 h-12 text-gray-400 mx-auto" />
                            <div className="bg-indigo-100 border-2 border-indigo-500 rounded-lg px-4 py-2 mt-2">
                              <div className="font-bold text-indigo-900 text-sm">Database per Service</div>
                              <div className="text-xs text-indigo-700">No shared DB</div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-indigo-500 text-white p-4 rounded-lg shadow-lg text-center">
                            <Database className="w-6 h-6 mx-auto mb-2" />
                            <div className="font-bold text-sm">MongoDB</div>
                            <div className="text-xs">Transactions</div>
                          </div>
                          <div className="bg-indigo-500 text-white p-4 rounded-lg shadow-lg text-center">
                            <Database className="w-6 h-6 mx-auto mb-2" />
                            <div className="font-bold text-sm">PostgreSQL</div>
                            <div className="text-xs">Accounts</div>
                          </div>
                        </div>

                        <div className="bg-indigo-100 border-2 border-indigo-500 rounded-lg px-3 py-2 mt-3 text-center">
                          <div className="font-bold text-indigo-900 text-xs">Polyglot Persistence</div>
                          <div className="text-xs text-indigo-700">Right tool for job</div>
                        </div>
                      </div>

                      {/* Right: Event Bus Path */}
                      <div>
                        <div className="flex justify-center mb-6">
                          <div className="text-center">
                            <ChevronDown className="w-12 h-12 text-gray-400 mx-auto" />
                            <div className="bg-amber-100 border-2 border-amber-500 rounded-lg px-4 py-2 mt-2">
                              <div className="font-bold text-amber-900 text-sm">Publish-Subscribe</div>
                              <div className="text-xs text-amber-700">Async Events</div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-amber-500 text-white p-6 rounded-xl shadow-lg text-center">
                          <GitBranch className="w-8 h-8 mx-auto mb-2" />
                          <div className="font-bold text-lg">Apache Kafka</div>
                          <div className="text-xs mt-1">Event Bus</div>
                        </div>

                        <div className="bg-amber-100 border-2 border-amber-500 rounded-lg px-3 py-2 mt-3 text-center">
                          <div className="font-bold text-amber-900 text-xs">Event-Driven Architecture</div>
                          <div className="text-xs text-amber-700">Decoupled services</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Kafka to Consumers */}
                  <div className="mb-12">
                    <div className="flex justify-center mb-6">
                      <div className="text-center">
                        <ChevronDown className="w-12 h-12 text-gray-400 mx-auto" />
                        <div className="bg-pink-100 border-2 border-pink-500 rounded-lg px-4 py-2 mt-2">
                          <div className="font-bold text-pink-900 text-sm">Consumer Groups</div>
                          <div className="text-xs text-pink-700">Parallel processing</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      {/* Analytics Consumer */}
                      <div>
                        <div className="bg-pink-500 text-white p-5 rounded-xl shadow-lg text-center">
                          <BarChart className="w-7 h-7 mx-auto mb-2" />
                          <div className="font-bold">Analytics</div>
                          <div className="text-xs mt-1">Data Pipeline</div>
                        </div>
                        <div className="flex justify-center mt-4">
                          <ChevronDown className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="bg-indigo-500 text-white p-4 rounded-lg shadow-lg text-center mt-2">
                          <div className="font-bold text-sm">InfluxDB</div>
                          <div className="text-xs">Time-series</div>
                        </div>
                        <div className="bg-pink-100 border-2 border-pink-500 rounded-lg px-3 py-2 mt-2 text-center">
                          <div className="font-bold text-pink-900 text-xs">Materialized View</div>
                        </div>
                      </div>

                      {/* Notification Consumer */}
                      <div>
                        <div className="bg-pink-500 text-white p-5 rounded-xl shadow-lg text-center">
                          <Server className="w-7 h-7 mx-auto mb-2" />
                          <div className="font-bold">Notification</div>
                          <div className="text-xs mt-1">Email/SMS/Push</div>
                        </div>
                        <div className="flex justify-center mt-4">
                          <ChevronDown className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg text-center mt-2">
                          <div className="font-bold text-sm">External APIs</div>
                          <div className="text-xs">SendGrid/Twilio</div>
                        </div>
                        <div className="bg-red-100 border-2 border-red-500 rounded-lg px-3 py-2 mt-2 text-center">
                          <div className="font-bold text-red-900 text-xs">Circuit Breaker</div>
                        </div>
                      </div>

                      {/* Account Update Consumer */}
                      <div>
                        <div className="bg-pink-500 text-white p-5 rounded-xl shadow-lg text-center">
                          <Activity className="w-7 h-7 mx-auto mb-2" />
                          <div className="font-bold">Account Updater</div>
                          <div className="text-xs mt-1">Balance sync</div>
                        </div>
                        <div className="flex justify-center mt-4">
                          <ChevronDown className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="bg-indigo-500 text-white p-4 rounded-lg shadow-lg text-center mt-2">
                          <div className="font-bold text-sm">PostgreSQL</div>
                          <div className="text-xs">Account DB</div>
                        </div>
                        <div className="bg-pink-100 border-2 border-pink-500 rounded-lg px-3 py-2 mt-2 text-center">
                          <div className="font-bold text-pink-900 text-xs">Eventual Consistency</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 5: Caching Layer */}
                  <div className="mb-8">
                    <div className="border-t-4 border-gray-300 pt-8">
                      <div className="text-center mb-6">
                        <h4 className="font-bold text-gray-900 text-xl mb-2">Read Path (Queries)</h4>
                        <p className="text-gray-600 text-sm">Optimized for low latency</p>
                      </div>

                      <div className="flex items-center justify-center gap-6">
                        {/* Client Query */}
                        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg w-32 text-center">
                          <div className="font-bold text-sm">Client Query</div>
                          <div className="text-xs mt-1">GET Request</div>
                        </div>

                        <ArrowRight className="w-8 h-8 text-gray-400" />

                        {/* Gateway */}
                        <div className="bg-purple-500 text-white p-4 rounded-lg shadow-lg w-32 text-center">
                          <div className="font-bold text-sm">Gateway</div>
                        </div>

                        <ArrowRight className="w-8 h-8 text-gray-400" />

                        {/* Account Service */}
                        <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg w-32 text-center">
                          <div className="font-bold text-sm">Service</div>
                        </div>

                        <ArrowRight className="w-8 h-8 text-gray-400" />

                        {/* Redis Cache */}
                        <div className="bg-red-400 text-white p-4 rounded-lg shadow-lg w-32 text-center">
                          <div className="font-bold text-sm">Redis</div>
                          <div className="text-xs mt-1">&lt;1ms</div>
                        </div>

                        <div className="text-center">
                          <div className="text-gray-500 font-bold mb-2">If miss ↓</div>
                          <div className="bg-indigo-500 text-white p-4 rounded-lg shadow-lg w-32 text-center">
                            <div className="font-bold text-sm">PostgreSQL</div>
                            <div className="text-xs mt-1">Read Replica</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-100 border-2 border-blue-500 rounded-lg px-6 py-3 mt-6 text-center max-w-md mx-auto">
                        <div className="font-bold text-blue-900 text-sm">Cache-Aside Pattern</div>
                        <div className="text-xs text-blue-700 mt-1">Check cache first, fallback to DB</div>
                        <div className="text-xs text-blue-700">90% cache hit rate = 10x speedup</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pattern Summary */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-indigo-600" />
                Design Patterns Used (Flow Summary)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Pattern 1 */}
                <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">1</div>
                    <h4 className="font-bold text-purple-900">API Gateway</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">Single entry point for all clients</p>
                  <div className="text-xs text-purple-700">
                    <div>✓ Auth, rate limiting, routing</div>
                    <div>✓ Decouples clients from services</div>
                  </div>
                </div>

                {/* Pattern 2 */}
                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">2</div>
                    <h4 className="font-bold text-green-900">Saga Pattern</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">Distributed transactions</p>
                  <div className="text-xs text-green-700">
                    <div>✓ Compensating transactions</div>
                    <div>✓ No 2-phase commit needed</div>
                  </div>
                </div>

                {/* Pattern 3 */}
                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">3</div>
                    <h4 className="font-bold text-green-900">CQRS</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">Read/Write separation</p>
                  <div className="text-xs text-green-700">
                    <div>✓ Optimized for different workloads</div>
                    <div>✓ Scale reads independently</div>
                  </div>
                </div>

                {/* Pattern 4 */}
                <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">4</div>
                    <h4 className="font-bold text-orange-900">Event Sourcing</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">Immutable event log</p>
                  <div className="text-xs text-orange-700">
                    <div>✓ Complete audit trail</div>
                    <div>✓ Replay events to rebuild state</div>
                  </div>
                </div>

                {/* Pattern 5 */}
                <div className="bg-indigo-50 p-6 rounded-xl border-2 border-indigo-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">5</div>
                    <h4 className="font-bold text-indigo-900">Database per Service</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">No shared databases</p>
                  <div className="text-xs text-indigo-700">
                    <div>✓ Independent scaling</div>
                    <div>✓ Polyglot persistence</div>
                  </div>
                </div>

                {/* Pattern 6 */}
                <div className="bg-amber-50 p-6 rounded-xl border-2 border-amber-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-white font-bold">6</div>
                    <h4 className="font-bold text-amber-900">Event-Driven</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">Pub/Sub messaging</p>
                  <div className="text-xs text-amber-700">
                    <div>✓ Services decoupled</div>
                    <div>✓ Async processing</div>
                  </div>
                </div>

                {/* Pattern 7 */}
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">7</div>
                    <h4 className="font-bold text-blue-900">Cache-Aside</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">Read-through caching</p>
                  <div className="text-xs text-blue-700">
                    <div>✓ Check cache first</div>
                    <div>✓ Fallback to database</div>
                  </div>
                </div>

                {/* Pattern 8 */}
                <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">8</div>
                    <h4 className="font-bold text-red-900">Circuit Breaker</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">Fault tolerance</p>
                  <div className="text-xs text-red-700">
                    <div>✓ Prevents cascade failures</div>
                    <div>✓ Graceful degradation</div>
                  </div>
                </div>

                {/* Pattern 9 */}
                <div className="bg-pink-50 p-6 rounded-xl border-2 border-pink-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center text-white font-bold">9</div>
                    <h4 className="font-bold text-pink-900">Materialized View</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">Pre-computed results</p>
                  <div className="text-xs text-pink-700">
                    <div>✓ Fast analytics queries</div>
                    <div>✓ Eventual consistency OK</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interview Talking Points */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-8 border-2 border-yellow-300 shadow-sm">
              <h3 className="text-2xl font-bold text-yellow-900 mb-6 flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                Key Points to Emphasize in Interviews
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-3">Component Interactions:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-2"><span className="text-yellow-600">•</span><span>Each layer has clear responsibilities (separation of concerns)</span></li>
                    <li className="flex gap-2"><span className="text-yellow-600">•</span><span>Services communicate via well-defined interfaces</span></li>
                    <li className="flex gap-2"><span className="text-yellow-600">•</span><span>Event bus decouples services (async communication)</span></li>
                    <li className="flex gap-2"><span className="text-yellow-600">•</span><span>Database per service pattern (no shared databases)</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-3">Scalability & Resilience:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-2"><span className="text-yellow-600">•</span><span>Horizontal scaling at every layer (stateless services)</span></li>
                    <li className="flex gap-2"><span className="text-yellow-600">•</span><span>Circuit breaker prevents cascade failures</span></li>
                    <li className="flex gap-2"><span className="text-yellow-600">•</span><span>Redis cache reduces DB load by 90%</span></li>
                    <li className="flex gap-2"><span className="text-yellow-600">•</span><span>Read replicas scale read traffic independently</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'detailed' && (
          <div className="space-y-6">
            {/* CQRS Detailed Explanation */}
            <div className="bg-slate-800/50 rounded-lg p-6 border border-cyan-500/30 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-4">📊 CQRS Pattern - Detailed Architecture</h2>
              <p className="text-gray-400 mb-6">
                Command Query Responsibility Segregation: Separate models for reading and writing data
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Write Model */}
                <div className="bg-gradient-to-br from-red-900/50 to-red-800/50 p-6 rounded-lg border border-red-500/30">
                  <h3 className="text-red-200 font-bold text-lg mb-4 flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    Write Model (Commands)
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                      <ArrowRight className="w-4 h-4 text-red-400" />
                      <span>Clients send commands (POST/PUT/DELETE)</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <ArrowRight className="w-4 h-4 text-red-400" />
                      <span>Command Handlers validate and execute</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <ArrowRight className="w-4 h-4 text-red-400" />
                      <span>Write to optimized DBs (MongoDB, PostgreSQL)</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <ArrowRight className="w-4 h-4 text-red-400" />
                      <span>Publish events to Kafka</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <ArrowRight className="w-4 h-4 text-red-400" />
                      <span>Event subscribers update Read Model async</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-red-950/50 rounded border border-red-500/20">
                    <p className="text-xs text-gray-300">
                      <strong className="text-red-300">Interview Tip:</strong> Explain that writes are optimized for throughput,
                      not query performance. MongoDB sharding handles 30M writes/day easily.
                    </p>
                  </div>
                </div>

                {/* Read Model */}
                <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 p-6 rounded-lg border border-blue-500/30">
                  <h3 className="text-blue-200 font-bold text-lg mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Read Model (Queries)
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                      <ArrowRight className="w-4 h-4 text-blue-400" />
                      <span>Clients send queries (GET)</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <ArrowRight className="w-4 h-4 text-blue-400" />
                      <span>Query Handlers read from optimized DBs</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <ArrowRight className="w-4 h-4 text-blue-400" />
                      <span>Redis cache (L1) → PostgreSQL replicas (L2)</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <ArrowRight className="w-4 h-4 text-blue-400" />
                      <span>Elasticsearch for search, InfluxDB for stats</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <ArrowRight className="w-4 h-4 text-blue-400" />
                      <span>Zero impact on write performance</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-950/50 rounded border border-blue-500/20">
                    <p className="text-xs text-gray-300">
                      <strong className="text-blue-300">Interview Tip:</strong> Highlight eventual consistency (5-15 min lag acceptable).
                      Reads scale independently via replicas and caching.
                    </p>
                  </div>
                </div>
              </div>

              {/* Event Flow */}
              <div className="mt-6 bg-amber-900/30 p-4 rounded-lg border border-amber-500/30">
                <h4 className="text-amber-300 font-semibold mb-3 flex items-center gap-2">
                  <GitBranch className="w-4 h-4" />
                  Event Flow (Write → Read Synchronization)
                </h4>
                <div className="flex items-center gap-2 text-sm text-gray-300 overflow-x-auto pb-2">
                  <span className="bg-red-900/50 px-3 py-1 rounded">Command</span>
                  <ArrowRight className="w-4 h-4" />
                  <span className="bg-orange-900/50 px-3 py-1 rounded">Write DB</span>
                  <ArrowRight className="w-4 h-4" />
                  <span className="bg-orange-900/50 px-3 py-1 rounded">Event Store</span>
                  <ArrowRight className="w-4 h-4" />
                  <span className="bg-amber-900/50 px-3 py-1 rounded">Kafka</span>
                  <ArrowRight className="w-4 h-4" />
                  <span className="bg-blue-900/50 px-3 py-1 rounded">Event Subscribers</span>
                  <ArrowRight className="w-4 h-4" />
                  <span className="bg-blue-900/50 px-3 py-1 rounded">Read DBs</span>
                </div>
              </div>
            </div>

            {/* Event Sourcing Explanation */}
            <div className="bg-slate-800/50 rounded-lg p-6 border border-cyan-500/30 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-4">📝 Event Sourcing Pattern - Immutable Event Log</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/20">
                  <h3 className="text-green-300 font-semibold mb-2">Benefits</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>✓ Complete audit trail</li>
                    <li>✓ Can replay events to rebuild state</li>
                    <li>✓ Temporal queries (state at time T)</li>
                    <li>✓ Easy debugging (event history)</li>
                    <li>✓ Compliance (PCI DSS, GDPR)</li>
                  </ul>
                </div>
                <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500/20">
                  <h3 className="text-orange-300 font-semibold mb-2">Implementation</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• PostgreSQL append-only table</li>
                    <li>• Events: ApplicationCreated, TransactionPosted, PaymentProcessed</li>
                    <li>• Never UPDATE or DELETE, only INSERT</li>
                    <li>• Partition by year for performance</li>
                  </ul>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/20">
                  <h3 className="text-purple-300 font-semibold mb-2">Interview Points</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Immutability ensures data integrity</li>
                    <li>• Replay events for disaster recovery</li>
                    <li>• Build new projections anytime</li>
                    <li>• Trade-off: Storage vs auditability</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Security & Compliance */}
            <div className="bg-slate-800/50 rounded-lg p-6 border border-cyan-500/30 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-cyan-400" />
                Security & Compliance
              </h2>
              <div className="space-y-4">
                {securityCompliance.map((sec, i) => (
                  <div key={i} className="bg-slate-700/50 p-4 rounded-lg border border-cyan-500/20">
                    <h3 className="text-cyan-300 font-semibold mb-3">{sec.aspect}</h3>
                    <div className="space-y-2">
                      {sec.points.map((point, j) => (
                        <div key={j} className="flex gap-2 text-gray-300 text-sm">
                          <Check className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'flows' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-lg p-6 border border-cyan-500/30 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-4">🔄 Feature Flows - Step-by-Step</h2>
              <p className="text-gray-400 mb-6">
                Detailed flows for the 4 main features. Each step shows the layer, action, and technical details.
                Perfect for explaining during your interview.
              </p>

              {featureFlows.map((flow, idx) => {
                const FlowIcon = flow.icon;
                return (
                  <div key={flow.id} className={`rounded-lg p-6 ${flow.color} mb-6`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg">
                          <FlowIcon className="w-6 h-6 text-slate-700" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900">{flow.name}</h3>
                          <p className="text-slate-600 text-sm">Estimated time: {flow.estimatedTime}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedFlow(selectedFlow === flow.id ? null : flow.id)}
                        className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2"
                      >
                        {selectedFlow === flow.id ? (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            Collapse
                          </>
                        ) : (
                          <>
                            <ChevronRight className="w-4 h-4" />
                            Expand Flow
                          </>
                        )}
                      </button>
                    </div>

                    {selectedFlow === flow.id && (
                      <>
                        {/* Flow Steps */}
                        <div className="bg-white/80 rounded-lg p-4 mb-4">
                          <h4 className="font-semibold text-slate-800 mb-3">Flow Steps</h4>
                          <div className="space-y-3">
                            {flow.steps.map((step, i) => (
                              <div key={i} className="flex gap-3">
                                <div className="flex-shrink-0 w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                  {i + 1}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={getLayerBadgeClasses(step.color)}>
                                      {step.layer}
                                    </span>
                                    <span className="text-slate-800 font-semibold">{step.step}</span>
                                  </div>
                                  <p className="text-slate-600 text-sm">{step.details}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Patterns Used */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-slate-800 mb-2">Design Patterns Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {flow.patterns.map((pattern, i) => (
                              <span key={i} className="px-3 py-1 bg-slate-800 text-white rounded-full text-sm font-semibold">
                                {pattern}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Interview Tips */}
                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                          <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Interview Tips
                          </h4>
                          <ul className="space-y-1">
                            {flow.interviewTips.map((tip, i) => (
                              <li key={i} className="text-yellow-800 text-sm flex gap-2">
                                <span className="text-yellow-600">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'cqrs' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                CQRS Pattern Implementation
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Command Query Responsibility Segregation (CQRS) separates read and write operations for optimal performance,
                scalability, and data consistency. The Credit Card Portal 3 uses CQRS with Event Sourcing to handle 30M transactions/day
                (347 txns/sec average, 1735 txns/sec peak) across 10M active users.
              </p>

              {/* CQRS Architecture Diagram */}
              <div className="bg-white rounded-xl p-8 border-2 border-blue-200 mb-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">CQRS Architecture Flow - Portal 3</h3>

                <svg viewBox="0 0 1400 900" className="w-full h-auto">
                  <defs>
                    {/* Gradients */}
                    <linearGradient id="p3ClientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="p3CommandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#047857', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="p3QueryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#be185d', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="p3EventGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="p3DbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#6d28d9', stopOpacity: 1 }} />
                    </linearGradient>

                    {/* Arrow markers */}
                    <marker id="p3ArrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
                    </marker>
                    <marker id="p3ArrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
                    </marker>
                    <marker id="p3ArrowPink" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" fill="#ec4899" />
                    </marker>
                    <marker id="p3ArrowOrange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
                    </marker>
                    <marker id="p3ArrowPurple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6" />
                    </marker>
                    <marker id="p3ArrowCyan" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" fill="#06b6d4" />
                    </marker>
                  </defs>

                  {/* BFF Layer - CLICKABLE */}
                  <g onClick={() => setSelectedCQRSComponent('bfflayer')} style={{ cursor: 'pointer' }}>
                    <rect
                      x="20" y="80" width="180" height="120" rx="8"
                      fill="url(#p3ClientGrad)"
                      stroke={selectedCQRSComponent === 'bfflayer' ? '#60a5fa' : '#60a5fa'}
                      strokeWidth={selectedCQRSComponent === 'bfflayer' ? '4' : '2'}
                      style={{ opacity: selectedCQRSComponent === 'bfflayer' ? 1 : 0.9 }}
                      className="hover:opacity-100 transition-all"
                    />
                    <text x="110" y="110" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>📱 BFF Layer</text>
                    <text x="110" y="130" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>Web App (React)</text>
                    <text x="110" y="145" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>Mobile (iOS/Android)</text>
                    <text x="110" y="160" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>Admin Dashboard</text>
                    <text x="110" y="175" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>3rd Party APIs</text>
                  </g>

                  {/* API Gateway - CLICKABLE */}
                  <g onClick={() => setSelectedCQRSComponent('apigateway')} style={{ cursor: 'pointer' }}>
                    <rect
                      x="20" y="240" width="180" height="140" rx="8"
                      fill="url(#p3ClientGrad)"
                      stroke={selectedCQRSComponent === 'apigateway' ? '#60a5fa' : '#60a5fa'}
                      strokeWidth={selectedCQRSComponent === 'apigateway' ? '4' : '2'}
                      style={{ opacity: selectedCQRSComponent === 'apigateway' ? 1 : 0.9 }}
                      className="hover:opacity-100 transition-all"
                    />
                    <text x="110" y="270" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>🚪 API Gateway</text>
                    <text x="110" y="290" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>Kong Gateway</text>
                    <text x="110" y="305" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>WAF + DDoS</text>
                    <text x="110" y="320" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>OAuth 2.0 + JWT</text>
                    <text x="110" y="335" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>Rate Limiter (Redis)</text>
                    <text x="110" y="350" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>30M+ req/day</text>
                    <text x="110" y="365" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>Load Balancing</text>
                  </g>

                  {/* Arrow: BFF to Gateway */}
                  <path d="M 110 200 L 110 240" stroke="#3b82f6" strokeWidth="3" fill="none" markerEnd="url(#p3ArrowBlue)" />
                  <text x="130" y="225" fontSize="10" fill="#3b82f6" fontWeight="bold">HTTPS</text>

                  {/* COMMAND SIDE */}
                  <rect x="260" y="40" width="420" height="380" rx="12" fill="rgba(16, 185, 129, 0.05)" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
                  <text x="470" y="70" fontSize="16" fontWeight="bold" fill="#10b981" textAnchor="middle">COMMAND SIDE (Write)</text>

                  {/* Command Services - CLICKABLE */}
                  <g onClick={() => setSelectedCQRSComponent('commandservices')} style={{ cursor: 'pointer' }}>
                    <rect
                      x="290" y="100" width="180" height="140" rx="8"
                      fill="url(#p3CommandGrad)"
                      stroke={selectedCQRSComponent === 'commandservices' ? '#34d399' : '#34d399'}
                      strokeWidth={selectedCQRSComponent === 'commandservices' ? '4' : '2'}
                      style={{ opacity: selectedCQRSComponent === 'commandservices' ? 1 : 0.9 }}
                      className="hover:opacity-100 transition-all"
                    />
                    <text x="380" y="125" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>⚡ Command Services</text>
                    <text x="380" y="145" fontSize="10" fill="#d1fae5" textAnchor="middle" style={{ pointerEvents: 'none' }}>Card Application</text>
                    <text x="380" y="160" fontSize="10" fill="#d1fae5" textAnchor="middle" style={{ pointerEvents: 'none' }}>(Saga Orchestrator)</text>
                    <text x="380" y="180" fontSize="10" fill="#d1fae5" textAnchor="middle" style={{ pointerEvents: 'none' }}>Account Service</text>
                    <text x="380" y="195" fontSize="10" fill="#d1fae5" textAnchor="middle" style={{ pointerEvents: 'none' }}>Payment Processing</text>
                    <text x="380" y="210" fontSize="10" fill="#d1fae5" textAnchor="middle" style={{ pointerEvents: 'none' }}>(Idempotent)</text>
                    <text x="380" y="225" fontSize="10" fill="#d1fae5" textAnchor="middle" style={{ pointerEvents: 'none' }}>347 txn/sec avg</text>
                  </g>

                  {/* Transaction Processor - CLICKABLE */}
                  <g onClick={() => setSelectedCQRSComponent('txprocessor')} style={{ cursor: 'pointer' }}>
                    <rect
                      x="490" y="100" width="170" height="120" rx="8"
                      fill="url(#p3CommandGrad)"
                      stroke={selectedCQRSComponent === 'txprocessor' ? '#34d399' : '#34d399'}
                      strokeWidth={selectedCQRSComponent === 'txprocessor' ? '4' : '2'}
                      style={{ opacity: selectedCQRSComponent === 'txprocessor' ? 1 : 0.9 }}
                      className="hover:opacity-100 transition-all"
                    />
                    <text x="575" y="125" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>⚙️ Transaction</text>
                    <text x="575" y="140" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>Processor</text>
                    <text x="575" y="160" fontSize="10" fill="#d1fae5" textAnchor="middle" style={{ pointerEvents: 'none' }}>Event Sourcing</text>
                    <text x="575" y="175" fontSize="10" fill="#d1fae5" textAnchor="middle" style={{ pointerEvents: 'none' }}>Fraud Detection</text>
                    <text x="575" y="190" fontSize="10" fill="#d1fae5" textAnchor="middle" style={{ pointerEvents: 'none' }}>(XGBoost ML)</text>
                    <text x="575" y="205" fontSize="10" fill="#d1fae5" textAnchor="middle" style={{ pointerEvents: 'none' }}>&lt;100ms latency</text>
                  </g>

                  {/* Write Databases - CLICKABLE */}
                  <g onClick={() => setSelectedCQRSComponent('writedb')} style={{ cursor: 'pointer' }}>
                    <rect
                      x="290" y="270" width="370" height="135" rx="8"
                      fill="url(#p3DbGrad)"
                      stroke={selectedCQRSComponent === 'writedb' ? '#a78bfa' : '#a78bfa'}
                      strokeWidth={selectedCQRSComponent === 'writedb' ? '4' : '2'}
                      style={{ opacity: selectedCQRSComponent === 'writedb' ? 1 : 0.9 }}
                      className="hover:opacity-100 transition-all"
                    />
                    <text x="475" y="295" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>💾 Write Side - 4 Databases</text>
                    <text x="475" y="315" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>🟢 MongoDB Transaction DB (5 shards, 2M users/shard)</text>
                    <text x="475" y="330" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>🔵 PostgreSQL Account DB (1 Primary + 2 Replicas)</text>
                    <text x="475" y="345" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>🟣 PostgreSQL Event Store (Append-only)</text>
                    <text x="475" y="360" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>🔴 Redis (Idempotency Keys + Rate Limiting)</text>
                    <text x="475" y="380" fontSize="9" fill="#10b981" fontWeight="bold" fontStyle="italic" style={{ pointerEvents: 'none' }}>Optimized for Consistency & Durability</text>
                    <text x="475" y="395" fontSize="9" fill="#c4b5fd" fontStyle="italic" style={{ pointerEvents: 'none' }}>Normalized Schema • ACID Transactions</text>
                  </g>

                  {/* Arrow: Gateway to Command Services */}
                  <path d="M 200 280 L 260 200 L 290 160" stroke="#10b981" strokeWidth="3" fill="none" markerEnd="url(#p3ArrowGreen)" />
                  <text x="215" y="235" fontSize="10" fill="#10b981" fontWeight="bold">POST/PUT</text>
                  <text x="215" y="250" fontSize="10" fill="#10b981">DELETE</text>

                  {/* Arrow: Command Services to DB */}
                  <path d="M 380 240 L 380 270" stroke="#8b5cf6" strokeWidth="3" fill="none" markerEnd="url(#p3ArrowPurple)" />
                  <text x="400" y="260" fontSize="10" fill="#8b5cf6" fontWeight="bold">Write</text>

                  {/* Arrow: Transaction Processor to DB */}
                  <path d="M 575 220 L 575 270" stroke="#8b5cf6" strokeWidth="3" fill="none" markerEnd="url(#p3ArrowPurple)" />
                  <text x="595" y="250" fontSize="10" fill="#8b5cf6" fontWeight="bold">Store</text>

                  {/* QUERY SIDE */}
                  <rect x="260" y="480" width="420" height="380" rx="12" fill="rgba(236, 72, 153, 0.05)" stroke="#ec4899" strokeWidth="2" strokeDasharray="5,5" />
                  <text x="470" y="510" fontSize="16" fontWeight="bold" fill="#ec4899" textAnchor="middle">QUERY SIDE (Read)</text>

                  {/* Query Services - CLICKABLE */}
                  <g onClick={() => setSelectedCQRSComponent('queryservices')} style={{ cursor: 'pointer' }}>
                    <rect
                      x="290" y="540" width="180" height="140" rx="8"
                      fill="url(#p3QueryGrad)"
                      stroke={selectedCQRSComponent === 'queryservices' ? '#f9a8d4' : '#f9a8d4'}
                      strokeWidth={selectedCQRSComponent === 'queryservices' ? '4' : '2'}
                      style={{ opacity: selectedCQRSComponent === 'queryservices' ? 1 : 0.9 }}
                      className="hover:opacity-100 transition-all"
                    />
                    <text x="380" y="565" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>🔍 Query Services</text>
                    <text x="380" y="585" fontSize="10" fill="#fce7f3" textAnchor="middle" style={{ pointerEvents: 'none' }}>GetAccountBalance</text>
                    <text x="380" y="600" fontSize="10" fill="#fce7f3" textAnchor="middle" style={{ pointerEvents: 'none' }}>GetTransactions</text>
                    <text x="380" y="615" fontSize="10" fill="#fce7f3" textAnchor="middle" style={{ pointerEvents: 'none' }}>SearchHistory</text>
                    <text x="380" y="630" fontSize="10" fill="#fce7f3" textAnchor="middle" style={{ pointerEvents: 'none' }}>GetRewards</text>
                    <text x="380" y="645" fontSize="10" fill="#fce7f3" textAnchor="middle" style={{ pointerEvents: 'none' }}>GenerateReport</text>
                    <text x="380" y="660" fontSize="10" fill="#fce7f3" textAnchor="middle" style={{ pointerEvents: 'none' }}>10M reads/day</text>
                  </g>

                  {/* Analytics & Reporting - CLICKABLE */}
                  <g onClick={() => setSelectedCQRSComponent('analytics')} style={{ cursor: 'pointer' }}>
                    <rect
                      x="490" y="540" width="170" height="120" rx="8"
                      fill="url(#p3QueryGrad)"
                      stroke={selectedCQRSComponent === 'analytics' ? '#f9a8d4' : '#f9a8d4'}
                      strokeWidth={selectedCQRSComponent === 'analytics' ? '4' : '2'}
                      style={{ opacity: selectedCQRSComponent === 'analytics' ? 1 : 0.9 }}
                      className="hover:opacity-100 transition-all"
                    />
                    <text x="575" y="565" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>📊 Analytics</text>
                    <text x="575" y="580" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>& Reporting</text>
                    <text x="575" y="600" fontSize="10" fill="#fce7f3" textAnchor="middle" style={{ pointerEvents: 'none' }}>Data Pipeline</text>
                    <text x="575" y="615" fontSize="10" fill="#fce7f3" textAnchor="middle" style={{ pointerEvents: 'none' }}>(Kafka Streams)</text>
                    <text x="575" y="630" fontSize="10" fill="#fce7f3" textAnchor="middle" style={{ pointerEvents: 'none' }}>Real-time Stats</text>
                    <text x="575" y="645" fontSize="10" fill="#fce7f3" textAnchor="middle" style={{ pointerEvents: 'none' }}>Report Generator</text>
                  </g>

                  {/* Read Databases - CLICKABLE */}
                  <g onClick={() => setSelectedCQRSComponent('readdb')} style={{ cursor: 'pointer' }}>
                    <rect
                      x="290" y="710" width="370" height="135" rx="8"
                      fill="url(#p3DbGrad)"
                      stroke={selectedCQRSComponent === 'readdb' ? '#a78bfa' : '#a78bfa'}
                      strokeWidth={selectedCQRSComponent === 'readdb' ? '4' : '2'}
                      style={{ opacity: selectedCQRSComponent === 'readdb' ? 1 : 0.9 }}
                      className="hover:opacity-100 transition-all"
                    />
                    <text x="475" y="735" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>📊 Read Side - 4 Databases</text>
                    <text x="475" y="755" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>🔴 Redis Cache (10% hot data, 92% hit rate)</text>
                    <text x="475" y="770" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>🟡 Elasticsearch (3-node cluster, full-text search)</text>
                    <text x="475" y="785" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>🟣 InfluxDB (Time-series, 1-sec granularity)</text>
                    <text x="475" y="800" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>🔵 Snowflake (Multi-TB warehouse, nightly ETL)</text>
                    <text x="475" y="820" fontSize="9" fill="#ec4899" fontWeight="bold" fontStyle="italic" style={{ pointerEvents: 'none' }}>Optimized for Query Speed & Denormalization</text>
                    <text x="475" y="835" fontSize="9" fill="#c4b5fd" fontStyle="italic" style={{ pointerEvents: 'none' }}>Eventual Consistency • 5-15 min lag acceptable</text>
                  </g>

                  {/* Arrow: Gateway to Query Services */}
                  <path d="M 200 340 L 260 520 L 290 610" stroke="#ec4899" strokeWidth="3" fill="none" markerEnd="url(#p3ArrowPink)" />
                  <text x="215" y="430" fontSize="10" fill="#ec4899" fontWeight="bold">GET</text>
                  <text x="215" y="445" fontSize="10" fill="#ec4899">Queries</text>

                  {/* Arrow: Query Services to Read DB */}
                  <path d="M 380 680 L 380 710" stroke="#8b5cf6" strokeWidth="3" fill="none" markerEnd="url(#p3ArrowPurple)" />
                  <text x="400" y="700" fontSize="10" fill="#8b5cf6" fontWeight="bold">Read</text>

                  {/* Arrow: Analytics to Read DB */}
                  <path d="M 575 660 L 575 710" stroke="#8b5cf6" strokeWidth="3" fill="none" markerEnd="url(#p3ArrowPurple)" />
                  <text x="595" y="690" fontSize="10" fill="#8b5cf6" fontWeight="bold">Query</text>

                  {/* EVENT BUS - CLICKABLE */}
                  <g onClick={() => setSelectedCQRSComponent('eventbus')} style={{ cursor: 'pointer' }}>
                    <rect
                      x="760" y="350" width="240" height="240" rx="8"
                      fill="url(#p3EventGrad)"
                      stroke={selectedCQRSComponent === 'eventbus' ? '#fbbf24' : '#fbbf24'}
                      strokeWidth={selectedCQRSComponent === 'eventbus' ? '5' : '3'}
                      style={{ opacity: selectedCQRSComponent === 'eventbus' ? 1 : 0.9 }}
                      className="hover:opacity-100 transition-all"
                    />
                    <text x="880" y="385" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>📡 Event Bus</text>
                    <text x="880" y="405" fontSize="13" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>Apache Kafka</text>
                    <text x="880" y="425" fontSize="11" fill="#fef3c7" textAnchor="middle" style={{ pointerEvents: 'none' }}>(3-node cluster)</text>
                    <text x="880" y="455" fontSize="10" fill="#fef3c7" fontWeight="bold" textAnchor="middle" style={{ pointerEvents: 'none' }}>Topics (30M events/day):</text>
                    <text x="880" y="475" fontSize="10" fill="#fef3c7" textAnchor="middle" style={{ pointerEvents: 'none' }}>• ApplicationCreated</text>
                    <text x="880" y="490" fontSize="10" fill="#fef3c7" textAnchor="middle" style={{ pointerEvents: 'none' }}>• TransactionPosted</text>
                    <text x="880" y="505" fontSize="10" fill="#fef3c7" textAnchor="middle" style={{ pointerEvents: 'none' }}>• PaymentProcessed</text>
                    <text x="880" y="520" fontSize="10" fill="#fef3c7" textAnchor="middle" style={{ pointerEvents: 'none' }}>• FraudAlert</text>
                    <text x="880" y="535" fontSize="10" fill="#fef3c7" textAnchor="middle" style={{ pointerEvents: 'none' }}>• BalanceUpdated</text>
                    <text x="880" y="555" fontSize="9" fill="#fde68a" textAnchor="middle" fontStyle="italic" style={{ pointerEvents: 'none' }}>Consumer Groups:</text>
                    <text x="880" y="570" fontSize="9" fill="#fde68a" textAnchor="middle" fontStyle="italic" style={{ pointerEvents: 'none' }}>Data Pipeline, Notification, Analytics</text>
                  </g>

                  {/* Arrow: Command to Event Bus */}
                  <path d="M 680 240 L 760 420" stroke="#f59e0b" strokeWidth="3" fill="none" markerEnd="url(#p3ArrowOrange)" />
                  <text x="700" y="320" fontSize="10" fill="#f59e0b" fontWeight="bold">Publish</text>
                  <text x="700" y="335" fontSize="10" fill="#f59e0b">Events</text>

                  {/* Arrow: Event Bus to Query Side */}
                  <path d="M 760 530 L 680 610" stroke="#f59e0b" strokeWidth="3" fill="none" markerEnd="url(#p3ArrowOrange)" />
                  <text x="705" y="565" fontSize="10" fill="#f59e0b" fontWeight="bold">Subscribe</text>
                  <text x="705" y="580" fontSize="10" fill="#f59e0b">& Update</text>

                  {/* Event Store - CLICKABLE */}
                  <g onClick={() => setSelectedCQRSComponent('eventstore')} style={{ cursor: 'pointer' }}>
                    <rect
                      x="1070" y="200" width="180" height="110" rx="8"
                      fill="url(#p3DbGrad)"
                      stroke={selectedCQRSComponent === 'eventstore' ? '#a78bfa' : '#a78bfa'}
                      strokeWidth={selectedCQRSComponent === 'eventstore' ? '4' : '2'}
                      style={{ opacity: selectedCQRSComponent === 'eventstore' ? 1 : 0.9 }}
                      className="hover:opacity-100 transition-all"
                    />
                    <text x="1160" y="230" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>📝 Event Store</text>
                    <text x="1160" y="250" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>PostgreSQL</text>
                    <text x="1160" y="265" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>Immutable Log</text>
                    <text x="1160" y="280" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>Append-only Table</text>
                    <text x="1160" y="295" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>Event Replay</text>
                  </g>

                  {/* Arrow: Event Bus to Event Store */}
                  <path d="M 1000 380 L 1070 270" stroke="#8b5cf6" strokeWidth="3" fill="none" markerEnd="url(#p3ArrowPurple)" />
                  <text x="1020" y="320" fontSize="10" fill="#8b5cf6" fontWeight="bold">Store</text>

                  {/* Notification Service - CLICKABLE */}
                  <g onClick={() => setSelectedCQRSComponent('notifications')} style={{ cursor: 'pointer' }}>
                    <rect
                      x="1070" y="410" width="180" height="90" rx="8"
                      fill="rgba(6, 182, 212, 0.3)"
                      stroke={selectedCQRSComponent === 'notifications' ? '#06b6d4' : '#06b6d4'}
                      strokeWidth={selectedCQRSComponent === 'notifications' ? '4' : '2'}
                      style={{ opacity: selectedCQRSComponent === 'notifications' ? 1 : 0.9 }}
                      className="hover:opacity-100 transition-all"
                    />
                    <text x="1160" y="440" fontSize="12" fontWeight="bold" fill="#06b6d4" textAnchor="middle" style={{ pointerEvents: 'none' }}>🔔 Notifications</text>
                    <text x="1160" y="460" fontSize="10" fill="#cffafe" textAnchor="middle" style={{ pointerEvents: 'none' }}>Email / SMS / Push</text>
                    <text x="1160" y="475" fontSize="10" fill="#cffafe" textAnchor="middle" style={{ pointerEvents: 'none' }}>Real-time Alerts</text>
                    <text x="1160" y="490" fontSize="10" fill="#cffafe" textAnchor="middle" style={{ pointerEvents: 'none' }}>Fraud Alerts</text>
                  </g>

                  {/* Arrow: Event Bus to Notifications */}
                  <path d="M 1000 470 L 1070 460" stroke="#06b6d4" strokeWidth="2" fill="none" markerEnd="url(#p3ArrowCyan)" strokeDasharray="5,5" />

                  {/* Projections/Denormalizer - CLICKABLE */}
                  <g onClick={() => setSelectedCQRSComponent('projections')} style={{ cursor: 'pointer' }}>
                    <rect
                      x="1070" y="570" width="180" height="90" rx="8"
                      fill="rgba(236, 72, 153, 0.3)"
                      stroke={selectedCQRSComponent === 'projections' ? '#ec4899' : '#ec4899'}
                      strokeWidth={selectedCQRSComponent === 'projections' ? '4' : '2'}
                      style={{ opacity: selectedCQRSComponent === 'projections' ? 1 : 0.9 }}
                      className="hover:opacity-100 transition-all"
                    />
                    <text x="1160" y="600" fontSize="12" fontWeight="bold" fill="#ec4899" textAnchor="middle" style={{ pointerEvents: 'none' }}>🔄 Projections</text>
                    <text x="1160" y="620" fontSize="10" fill="#fce7f3" textAnchor="middle" style={{ pointerEvents: 'none' }}>Event Handlers</text>
                    <text x="1160" y="635" fontSize="10" fill="#fce7f3" textAnchor="middle" style={{ pointerEvents: 'none' }}>Denormalize Data</text>
                    <text x="1160" y="650" fontSize="10" fill="#fce7f3" textAnchor="middle" style={{ pointerEvents: 'none' }}>Update Read Models</text>
                  </g>

                  {/* Arrow: Event Bus to Projections */}
                  <path d="M 1000 530 L 1070 615" stroke="#ec4899" strokeWidth="3" fill="none" markerEnd="url(#p3ArrowPink)" />

                  {/* Arrow: Projections to Read DB */}
                  <path d="M 1070 650 L 800 750 L 660 770" stroke="#ec4899" strokeWidth="2" fill="none" markerEnd="url(#p3ArrowPink)" strokeDasharray="5,5" />
                  <text x="850" y="705" fontSize="10" fill="#ec4899" fontWeight="bold">Update</text>

                  {/* Labels */}
                  <text x="700" y="30" fontSize="18" fontWeight="bold" fill="#f59e0b" textAnchor="middle">⚡ EVENTUAL CONSISTENCY</text>
                  <text x="700" y="880" fontSize="12" fill="#6b7280" textAnchor="middle">30M txn/day • 347 txn/sec avg • 1735 txn/sec peak • 10M active users</text>
                </svg>
              </div>

              {/* Component Details Panel */}
              {selectedCQRSComponent && cqrsComponentDetails[selectedCQRSComponent] && (
                <div className="mt-6 bg-gradient-to-br from-purple-900/40 to-purple-800/40 rounded-xl p-6 border-2 border-purple-400 animate-fade-in">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-1">
                        {cqrsComponentDetails[selectedCQRSComponent].name}
                      </h4>
                      <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-semibold">
                        {cqrsComponentDetails[selectedCQRSComponent].type}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedCQRSComponent(null)}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      <span className="text-2xl">×</span>
                    </button>
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {cqrsComponentDetails[selectedCQRSComponent].description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h5 className="text-purple-400 font-bold mb-2 flex items-center gap-2">
                        <span>🔧</span> Technologies
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {cqrsComponentDetails[selectedCQRSComponent].technologies.map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-purple-700/50 text-purple-200 rounded text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-cyan-400 font-bold mb-2 flex items-center gap-2">
                        <span>📊</span> Metrics
                      </h5>
                      <p className="text-gray-300 text-sm bg-cyan-900/30 px-3 py-2 rounded border border-cyan-700/30">
                        {cqrsComponentDetails[selectedCQRSComponent].metrics}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-green-400 font-bold mb-2 flex items-center gap-2">
                      <span>✓</span> Responsibilities
                    </h5>
                    <ul className="space-y-1">
                      {cqrsComponentDetails[selectedCQRSComponent].responsibilities.map((resp, i) => (
                        <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                          <span className="text-green-400 mt-1">→</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 pt-4 border-t border-purple-500/30">
                    <p className="text-gray-400 text-xs italic">
                      💡 Click on other components in the diagram to view their details
                    </p>
                  </div>
                </div>
              )}

              {/* Key Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                  <h4 className="text-gray-900 font-bold mb-3 flex items-center gap-2 text-lg">
                    <ArrowRight className="w-5 h-5 text-green-600" />
                    Command Side (Write) Benefits
                  </h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>ACID Transactions:</strong> PostgreSQL ensures data consistency for financial operations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Saga Pattern:</strong> Distributed transactions across Card App → Credit Bureau → Account</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Idempotency:</strong> Redis-based idempotency keys prevent duplicate charges (24h TTL)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Event Sourcing:</strong> Immutable event log provides complete audit trail for compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Fraud Detection:</strong> XGBoost ML model scores transactions in &lt;100ms</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border border-pink-200">
                  <h4 className="text-gray-900 font-bold mb-3 flex items-center gap-2 text-lg">
                    <ArrowRight className="w-5 h-5 text-pink-600" />
                    Query Side (Read) Benefits
                  </h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 font-bold">•</span>
                      <span><strong>Optimized for Reads:</strong> Denormalized data in Elasticsearch, InfluxDB, Redis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 font-bold">•</span>
                      <span><strong>Redis Cache:</strong> Ultra-fast queries with &lt;1ms latency for recent transactions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 font-bold">•</span>
                      <span><strong>Elasticsearch:</strong> Full-text search and complex queries across transaction history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 font-bold">•</span>
                      <span><strong>InfluxDB:</strong> Time-series data for real-time analytics and reporting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-600 font-bold">•</span>
                      <span><strong>Eventual Consistency:</strong> 5-15 min lag acceptable for analytics (not critical path)</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Example Flow */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-blue-200">
                <h4 className="text-gray-900 font-bold mb-4 flex items-center gap-2 text-lg">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Example Flow: Credit Card Payment ($2,450 - Business Class Flight)
                </h4>
                <div className="space-y-3 text-gray-700 text-sm font-mono bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-start gap-3">
                    <span className="text-green-600 font-bold whitespace-nowrap">1. COMMAND:</span>
                    <span>User submits payment of $2,450.00 → API Gateway (JWT auth) → Payment Processing Service validates amount → Fraud Detection (XGBoost) scores transaction (98% safe, &lt;100ms) → Write to PostgreSQL → Publish "PaymentProcessed" event to Kafka</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-orange-500 font-bold whitespace-nowrap">2. EVENT BUS:</span>
                    <span>Kafka receives event → (a) Event Store saves immutable log, (b) Notification Service sends SMS confirmation, (c) Projections triggered for read models</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-pink-600 font-bold whitespace-nowrap">3. PROJECTION:</span>
                    <span>Projection handlers denormalize transaction data → Update Elasticsearch (searchable history), InfluxDB (real-time stats), Redis cache (fast access for recent txn)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-pink-600 font-bold whitespace-nowrap">4. QUERY:</span>
                    <span>User refreshes dashboard (GET request) → API Gateway → Query Service → Redis cache hit (&lt;1ms) → Returns updated balance ($8,905.50) and recent transactions including $2,450 payment</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold whitespace-nowrap">5. ANALYTICS:</span>
                    <span>Kafka Streams aggregates spending data → InfluxDB stores metrics → Real-time dashboard shows: Travel spending +$2,450, Monthly total $11,855.45, Fraud score 98%</span>
                  </div>
                </div>
              </div>

              {/* Technology Stack */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                  <h5 className="text-gray-900 font-bold mb-3 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-green-600" />
                    Command Side
                  </h5>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">→</span>
                      <span>Spring Boot Microservices</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">→</span>
                      <span>PostgreSQL (Primary + Replicas)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">→</span>
                      <span>MongoDB Atlas (Sharded)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">→</span>
                      <span>Spring Data JPA</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">→</span>
                      <span>Saga Pattern (Orchestration)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">→</span>
                      <span>XGBoost ML (Fraud Detection)</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                  <h5 className="text-gray-900 font-bold mb-3 flex items-center gap-2">
                    <GitBranch className="w-5 h-5 text-orange-600" />
                    Event Bus
                  </h5>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-orange-600">→</span>
                      <span>Apache Kafka (3-node cluster)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-600">→</span>
                      <span>30M events/day</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-600">→</span>
                      <span>Replication Factor: 3</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-600">→</span>
                      <span>Kafka Streams (Processing)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-600">→</span>
                      <span>Schema Registry (Avro)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-600">→</span>
                      <span>Consumer Groups</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                  <h5 className="text-gray-900 font-bold mb-3 flex items-center gap-2">
                    <BarChart className="w-5 h-5 text-pink-600" />
                    Query Side
                  </h5>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-pink-600">→</span>
                      <span>Elasticsearch (Search)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-600">→</span>
                      <span>InfluxDB (Time-series)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-600">→</span>
                      <span>Redis Enterprise (Cache)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-600">→</span>
                      <span>Kafka Streams (Aggregation)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-600">→</span>
                      <span>Projections (Event Handlers)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-600">→</span>
                      <span>Denormalized Data Models</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interview Tips */}
              <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                <h4 className="text-gray-900 font-bold mb-4 flex items-center gap-2 text-lg">
                  <Check className="w-5 h-5 text-blue-600" />
                  Interview Talking Points
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <h5 className="text-blue-700 font-semibold mb-2">Why CQRS?</h5>
                    <p className="text-gray-700 text-sm">
                      "We chose CQRS because reads and writes have different optimization requirements.
                      Writes need ACID transactions for financial integrity, while reads need speed and
                      flexible querying. Separating them allows independent scaling—we can add read replicas
                      without affecting write throughput."
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <h5 className="text-blue-700 font-semibold mb-2">Trade-offs</h5>
                    <p className="text-gray-700 text-sm">
                      "The main trade-off is eventual consistency. Analytics may lag 5-15 minutes behind
                      real-time transactions. We mitigate this with Redis caching for recent data (&lt;1ms)
                      and clear UX indicators when data is being updated. For critical reads like balance
                      checks, we query the write database directly."
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <h5 className="text-blue-700 font-semibold mb-2">Event Sourcing</h5>
                    <p className="text-gray-700 text-sm">
                      "Event Sourcing provides an immutable audit log—crucial for financial compliance.
                      Every transaction is an event we can replay to rebuild state. If our read model gets
                      corrupted, we replay events from the Event Store. This also enables time-travel
                      debugging and compliance audits."
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <h5 className="text-blue-700 font-semibold mb-2">Scalability</h5>
                    <p className="text-gray-700 text-sm">
                      "We handle 347 txn/sec average, 1735 txn/sec peak. Command side uses MongoDB sharding
                      for horizontal scaling. Query side uses Elasticsearch clusters and Redis caching.
                      Kafka decouples the two sides—we can scale each independently based on load patterns.
                      Read-heavy? Add more Elasticsearch nodes. Write-heavy? Scale MongoDB shards."
                    </p>
                  </div>
                </div>
              </div>

              {/* Database Mapping to CQRS */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 border-2 border-indigo-200 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Database className="w-7 h-7 text-indigo-600" />
                  7-Database Architecture Mapped to CQRS Pattern
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  The Credit Card Portal uses <span className="font-semibold text-indigo-600">polyglot persistence</span> with 7 specialized databases mapped to the CQRS pattern.
                  Each database serves specific access patterns in either the <span className="font-semibold text-green-600">Command (Write) Side</span> or <span className="font-semibold text-pink-600">Query (Read) Side</span>.
                </p>

                {/* Write Side Databases */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                    <span className="text-2xl">✍️</span>
                    Command Side (Write) Databases
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* MongoDB Transaction DB */}
                    <div className="bg-white rounded-lg p-5 border-2 border-green-300 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-3">
                        <HardDrive className="w-5 h-5 text-green-600" />
                        <h5 className="text-lg font-bold text-gray-900">MongoDB Transaction DB</h5>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-green-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">Role:</span> Primary write store for all transactions</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">Config:</span> 5 shards, 2M users/shard, userId sharding key</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">CQRS:</span> Receives writes from Command Services, publishes events to Kafka</span>
                        </div>
                        <div className="bg-green-50 px-3 py-2 rounded border border-green-200 mt-2">
                          <span className="text-green-700 font-semibold text-xs">Write: 8ms latency • 1,735 txn/sec peak</span>
                        </div>
                      </div>
                    </div>

                    {/* PostgreSQL Account DB */}
                    <div className="bg-white rounded-lg p-5 border-2 border-blue-300 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-3">
                        <Database className="w-5 h-5 text-blue-600" />
                        <h5 className="text-lg font-bold text-gray-900">PostgreSQL Account DB</h5>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">Role:</span> ACID transactions for account balances & limits</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">Config:</span> 1 Primary + 2 Read Replicas (sync + async replication)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">CQRS:</span> Command Services write to Primary, Query Services read from Replicas</span>
                        </div>
                        <div className="bg-blue-50 px-3 py-2 rounded border border-blue-200 mt-2">
                          <span className="text-blue-700 font-semibold text-xs">Write: 12ms (primary) • Read: 3ms (replicas)</span>
                        </div>
                      </div>
                    </div>

                    {/* PostgreSQL Event Store */}
                    <div className="bg-white rounded-lg p-5 border-2 border-indigo-300 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-5 h-5 text-indigo-600" />
                        <h5 className="text-lg font-bold text-gray-900">PostgreSQL Event Store</h5>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-indigo-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">Role:</span> Immutable append-only log of all domain events</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-indigo-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">Config:</span> Partitioned by timestamp, indexed by eventId/aggregateId</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-indigo-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">CQRS:</span> Event Sourcing - Command Side appends events, Query Side replays for projections</span>
                        </div>
                        <div className="bg-indigo-50 px-3 py-2 rounded border border-indigo-200 mt-2">
                          <span className="text-indigo-700 font-semibold text-xs">Write: 5ms • Infinite retention (archival to S3)</span>
                        </div>
                      </div>
                    </div>

                    {/* Redis Cache */}
                    <div className="bg-white rounded-lg p-5 border-2 border-red-300 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-5 h-5 text-red-600" />
                        <h5 className="text-lg font-bold text-gray-900">Redis Cluster (Write Path)</h5>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-red-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">Role:</span> Idempotency keys & rate limiting (write validation)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-red-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">Config:</span> 3 Masters + 3 Replicas, 16,384 hash slots</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-red-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">CQRS:</span> Command Side checks idempotency (24h TTL) before writes</span>
                        </div>
                        <div className="bg-red-50 px-3 py-2 rounded border border-red-200 mt-2">
                          <span className="text-red-700 font-semibold text-xs">&lt;1ms latency • 100K ops/sec per node</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Read Side Databases */}
                <div>
                  <h4 className="text-xl font-bold text-pink-700 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📖</span>
                    Query Side (Read) Databases
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Redis Cache (Read) */}
                    <div className="bg-white rounded-lg p-5 border-2 border-pink-300 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-5 h-5 text-pink-600" />
                        <h5 className="text-lg font-bold text-gray-900">Redis Cluster (Read Path)</h5>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-pink-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">Role:</span> Ultra-fast cache for hot data (sessions, balances, recent txns)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-pink-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">Data:</span> 10% hot data, 5min TTL (balances), 1min TTL (transactions)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-pink-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">CQRS:</span> Query Services hit cache first, cache invalidated by Kafka events</span>
                        </div>
                        <div className="bg-pink-50 px-3 py-2 rounded border border-pink-200 mt-2">
                          <span className="text-pink-700 font-semibold text-xs">&lt;1ms reads • 92% cache hit rate</span>
                        </div>
                      </div>
                    </div>

                    {/* Elasticsearch */}
                    <div className="bg-white rounded-lg p-5 border-2 border-yellow-300 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-3">
                        <Network className="w-5 h-5 text-yellow-600" />
                        <h5 className="text-lg font-bold text-gray-900">Elasticsearch</h5>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-yellow-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">Role:</span> Full-text search across transaction history & merchants</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-yellow-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">Config:</span> 3-node cluster, 5 shards per index, rolling monthly indices</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-yellow-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">CQRS:</span> Async indexing from Kafka events (5-10s lag), denormalized docs</span>
                        </div>
                        <div className="bg-yellow-50 px-3 py-2 rounded border border-yellow-200 mt-2">
                          <span className="text-yellow-700 font-semibold text-xs">Search: 20ms (p50) • Index: 5K docs/sec</span>
                        </div>
                      </div>
                    </div>

                    {/* InfluxDB */}
                    <div className="bg-white rounded-lg p-5 border-2 border-purple-300 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-3">
                        <Activity className="w-5 h-5 text-purple-600" />
                        <h5 className="text-lg font-bold text-gray-900">InfluxDB Analytics</h5>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">Role:</span> Real-time time-series metrics & KPIs</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">Config:</span> 1-second granularity, 90-day retention (raw), continuous queries for aggregation</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">CQRS:</span> Async writes from Kafka (1s lag), powers Grafana dashboards</span>
                        </div>
                        <div className="bg-purple-50 px-3 py-2 rounded border border-purple-200 mt-2">
                          <span className="text-purple-700 font-semibold text-xs">Write: 250K points/sec • Query: 50ms</span>
                        </div>
                      </div>
                    </div>

                    {/* Snowflake */}
                    <div className="bg-white rounded-lg p-5 border-2 border-cyan-300 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-3">
                        <Box className="w-5 h-5 text-cyan-600" />
                        <h5 className="text-lg font-bold text-gray-900">Snowflake Warehouse</h5>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-cyan-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">Role:</span> Historical analytics, BI reports, ML training data</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-cyan-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">Config:</span> Multi-TB storage, 5+ years retention, separate virtual warehouses</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-cyan-600 font-bold mt-0.5">•</span>
                          <span className="text-gray-700"><span className="font-semibold">CQRS:</span> Nightly batch ETL from MongoDB (2 AM, 2-hour window), NOT real-time</span>
                        </div>
                        <div className="bg-cyan-50 px-3 py-2 rounded border border-cyan-200 mt-2">
                          <span className="text-cyan-700 font-semibold text-xs">Query: 5-30s • ETL: Nightly batch</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CQRS Flow Summary */}
                <div className="bg-gradient-to-r from-green-100 via-orange-100 to-pink-100 rounded-xl p-6 border-2 border-gray-300 mt-8">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-gray-700" />
                    CQRS Data Flow: Write → Event Bus → Read
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="bg-green-600 text-white px-2 py-1 rounded font-bold text-xs whitespace-nowrap">STEP 1</span>
                      <span className="text-gray-800"><span className="font-bold text-green-700">Command Side Writes:</span> POST /payment → Command Service validates → Writes to PostgreSQL Account (balance) + MongoDB Transaction (txn record) + Event Store (domain event) + Redis (idempotency)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-orange-600 text-white px-2 py-1 rounded font-bold text-xs whitespace-nowrap">STEP 2</span>
                      <span className="text-gray-800"><span className="font-bold text-orange-700">Event Bus (Kafka):</span> TransactionAuthorized event published to Kafka topic → Multiple consumers subscribe (Query Side projections, Notification Service, Analytics)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-pink-600 text-white px-2 py-1 rounded font-bold text-xs whitespace-nowrap">STEP 3</span>
                      <span className="text-gray-800"><span className="font-bold text-pink-700">Query Side Projections:</span> Kafka consumers update read models → Elasticsearch (search index, 5-10s lag) + InfluxDB (metrics, 1s lag) + Redis cache (invalidate + update) + Snowflake (nightly batch ETL)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded font-bold text-xs whitespace-nowrap">STEP 4</span>
                      <span className="text-gray-800"><span className="font-bold text-blue-700">Query Side Reads:</span> GET /transactions → Query Service → Check Redis cache (92% hit rate) → If miss: Query Elasticsearch or PostgreSQL replica → Return denormalized data to client</span>
                    </div>
                  </div>
                </div>

                {/* Key Insight */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 mt-6 text-white">
                  <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <span>💡</span> Key CQRS Insight
                  </h4>
                  <p className="text-indigo-100 leading-relaxed">
                    <strong className="text-white">Why 7 databases in CQRS?</strong> Each database is optimized for its access pattern. Write databases (MongoDB, PostgreSQL) prioritize
                    <span className="text-yellow-300 font-semibold"> consistency and durability</span>. Read databases (Elasticsearch, InfluxDB, Redis) prioritize
                    <span className="text-yellow-300 font-semibold"> query speed and denormalization</span>. Event Store provides the <span className="text-yellow-300 font-semibold">immutable audit trail</span> connecting both sides.
                    Kafka decouples writes from reads, enabling <span className="text-yellow-300 font-semibold">independent scaling</span> and <span className="text-yellow-300 font-semibold">eventual consistency</span> (5-15 min lag acceptable for analytics).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'techstack' && (
          <div className="space-y-6">
            {/* Tech Stack by Layer */}
            <div className="bg-slate-800/50 rounded-lg p-6 border border-cyan-500/30 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-4">🛠️ Technology Stack by Layer</h2>
              <p className="text-gray-400 mb-6">
                Technologies chosen for each layer with rationale and interview talking points
              </p>

              <div className="space-y-4">
                {techStack.map((layer, i) => (
                  <div key={i} className="bg-slate-700/50 p-4 rounded-lg border border-cyan-500/20">
                    <h3 className="text-cyan-300 font-bold text-lg mb-3">{layer.layer}</h3>
                    <div className="space-y-3">
                      {layer.technologies.map((tech, j) => (
                        <div key={j} className="bg-slate-800/50 p-3 rounded border border-cyan-500/10">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-white font-semibold">{tech.name}</h4>
                          </div>
                          <p className="text-gray-400 text-sm mb-2">
                            <span className="text-gray-500">Why:</span> {tech.reason}
                          </p>
                          <div className="bg-green-900/30 px-3 py-2 rounded border border-green-500/20">
                            <p className="text-green-300 text-sm">
                              <span className="font-semibold">Interview Point:</span> {tech.interviewPoint}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scaling Strategy */}
            <div className="bg-slate-800/50 rounded-lg p-6 border border-cyan-500/30 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Network className="w-6 h-6 text-cyan-400" />
                Scaling Strategy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 p-4 rounded-lg border border-blue-500/30">
                  <h3 className="text-blue-300 font-semibold mb-3">Horizontal Scaling</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex gap-2">
                      <Check className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                      <span>API Gateway: 5+ instances behind load balancer</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                      <span>Microservices: 3-5 instances per service (auto-scaling)</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                      <span>MongoDB: 5 shards, each with 3 replicas</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                      <span>PostgreSQL: 1 primary + 2 read replicas per service</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                      <span>Redis: 3 master + 3 replica cluster</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 p-4 rounded-lg border border-green-500/30">
                  <h3 className="text-green-300 font-semibold mb-3">Performance Optimizations</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex gap-2">
                      <Check className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                      <span>Redis caching: &lt;1ms reads, 90% cache hit rate</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                      <span>Database indexing: 99% queries &lt;100ms</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                      <span>Connection pooling: 100 connections per service</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                      <span>Async processing: Kafka for non-blocking operations</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                      <span>CDN: Static assets served from edge locations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Interview Cheat Sheet */}
            <div className="bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 rounded-lg p-6 border border-yellow-500/30">
              <h2 className="text-2xl font-bold text-yellow-200 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Quick Interview Cheat Sheet
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-yellow-300 font-semibold mb-2">Key Numbers to Remember</h3>
                  <ul className="text-gray-200 text-sm space-y-1">
                    <li>• 10M users, 30M txns/day = 347 txns/sec</li>
                    <li>• Peak load: 5x = 1,735 txns/sec</li>
                    <li>• MongoDB: 5 shards × 2M users/shard</li>
                    <li>• Storage: 30GB/day, 11TB/year</li>
                    <li>• Cache: 10GB Redis for 10% hot data</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-yellow-300 font-semibold mb-2">Must-Mention Patterns</h3>
                  <ul className="text-gray-200 text-sm space-y-1">
                    <li>• CQRS: Read/Write separation</li>
                    <li>• Event Sourcing: Audit trail</li>
                    <li>• Saga: Distributed transactions</li>
                    <li>• Circuit Breaker: Fault tolerance</li>
                    <li>• Database Sharding: Horizontal scale</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dataflow' && (
          <div className="space-y-8">
            {/* Database Architecture Overview */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-cyan-500 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Database className="w-8 h-8 text-cyan-400" />
                Multi-Database Architecture & Data Flow
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                The Credit Card Portal uses a <span className="text-cyan-400 font-semibold">polyglot persistence</span> strategy with 7 specialized databases,
                each optimized for specific access patterns. This architecture supports <span className="text-yellow-300 font-semibold">10M users</span> across
                multiple countries with <span className="text-green-400 font-semibold">30M+ requests/day</span>.
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <div className="text-cyan-400 text-3xl font-bold">10M+</div>
                  <div className="text-gray-300 text-sm">Total Users</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="text-green-400 text-3xl font-bold">347/sec</div>
                  <div className="text-gray-300 text-sm">Avg Transactions</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="text-yellow-400 text-3xl font-bold">99.99%</div>
                  <div className="text-gray-300 text-sm">Availability SLA</div>
                </div>
              </div>
            </div>

            {/* Database Details - All 7 Databases */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* MongoDB Transaction DB */}
              <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-xl p-6 border border-green-500/50 hover:border-green-400 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <HardDrive className="w-6 h-6 text-green-400" />
                  <h3 className="text-2xl font-bold text-green-300">MongoDB Transaction DB</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-lg text-sm font-semibold">Sharded Cluster</span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-lg text-sm font-semibold">Write-Heavy</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-green-500/20">
                    <h4 className="text-green-300 font-semibold mb-2">Configuration</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <span className="text-green-400">5 Shards</span> for horizontal scaling</li>
                      <li>• <span className="text-green-400">2M users/shard</span> (10M total capacity)</li>
                      <li>• Sharding key: <code className="text-cyan-300">userId</code></li>
                      <li>• 3-node replica set per shard (1 primary, 2 secondaries)</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-green-500/20">
                    <h4 className="text-green-300 font-semibold mb-2">Stores</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <span className="font-semibold text-white">Transaction records</span> (purchases, payments, refunds)</li>
                      <li>• <span className="font-semibold text-white">Fraud scores</span> (XGBoost ML model outputs)</li>
                      <li>• <span className="font-semibold text-white">Transaction metadata</span> (merchant, location, timestamp)</li>
                      <li>• Indexed by: userId, transactionId, timestamp</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-green-500/20">
                    <h4 className="text-green-300 font-semibold mb-2">Performance</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Avg write latency: <span className="text-green-400">8ms</span></li>
                      <li>• Peak throughput: <span className="text-green-400">1,735 txn/sec</span></li>
                      <li>• Storage: ~500GB per shard</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* PostgreSQL Account DB */}
              <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 rounded-xl p-6 border border-blue-500/50 hover:border-blue-400 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-6 h-6 text-blue-400" />
                  <h3 className="text-2xl font-bold text-blue-300">PostgreSQL Account DB</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-semibold">Primary-Replica</span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-semibold">ACID</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-500/20">
                    <h4 className="text-blue-300 font-semibold mb-2">Configuration</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <span className="text-blue-400">1 Primary</span> (all writes)</li>
                      <li>• <span className="text-blue-400">2 Read Replicas</span> (load balanced reads)</li>
                      <li>• Synchronous replication to replica 1</li>
                      <li>• Asynchronous replication to replica 2</li>
                      <li>• Auto-failover with Patroni + etcd</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-500/20">
                    <h4 className="text-blue-300 font-semibold mb-2">Stores</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <span className="font-semibold text-white">User accounts</span> (10M users)</li>
                      <li>• <span className="font-semibold text-white">Credit card details</span> (encrypted)</li>
                      <li>• <span className="font-semibold text-white">Account balances</span> (real-time)</li>
                      <li>• <span className="font-semibold text-white">Credit limits</span> and available credit</li>
                      <li>• Strong consistency for financial data</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-500/20">
                    <h4 className="text-blue-300 font-semibold mb-2">Performance</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Read latency: <span className="text-blue-400">3ms</span> (replicas)</li>
                      <li>• Write latency: <span className="text-blue-400">12ms</span> (primary)</li>
                      <li>• 70% reads served by replicas</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Redis Cluster Cache Layer */}
              <div className="bg-gradient-to-br from-red-900/40 to-red-800/40 rounded-xl p-6 border border-red-500/50 hover:border-red-400 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-red-400" />
                  <h3 className="text-2xl font-bold text-red-300">Redis Cluster Cache</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-lg text-sm font-semibold">In-Memory</span>
                    <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-lg text-sm font-semibold">Sub-ms</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-red-500/20">
                    <h4 className="text-red-300 font-semibold mb-2">Configuration</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <span className="text-red-400">3 Master nodes</span> (hash slots)</li>
                      <li>• <span className="text-red-400">3 Replica nodes</span> (1 per master)</li>
                      <li>• 16,384 hash slots distributed across masters</li>
                      <li>• Automatic failover with Redis Sentinel</li>
                      <li>• Persistent snapshots + AOF (Append-Only File)</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-red-500/20">
                    <h4 className="text-red-300 font-semibold mb-2">Caches</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <span className="font-semibold text-white">User sessions</span> (JWT tokens, 24h TTL)</li>
                      <li>• <span className="font-semibold text-white">Account data</span> (hot 10%, 5min TTL)</li>
                      <li>• <span className="font-semibold text-white">Recent transactions</span> (last 10, 1min TTL)</li>
                      <li>• <span className="font-semibold text-white">Rate limiting counters</span> (1000 req/min per user)</li>
                      <li>• <span className="font-semibold text-white">Idempotency keys</span> (24h TTL)</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-red-500/20">
                    <h4 className="text-red-300 font-semibold mb-2">Performance</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Latency: <span className="text-red-400">&lt;1ms</span></li>
                      <li>• Cache hit rate: <span className="text-red-400">92%</span></li>
                      <li>• Throughput: 100K ops/sec per node</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* InfluxDB Analytics DB */}
              <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 rounded-xl p-6 border border-purple-500/50 hover:border-purple-400 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-6 h-6 text-purple-400" />
                  <h3 className="text-2xl font-bold text-purple-300">InfluxDB Analytics</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm font-semibold">Time-Series</span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm font-semibold">Real-time</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-500/20">
                    <h4 className="text-purple-300 font-semibold mb-2">Configuration</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <span className="text-purple-400">Single node</span> (optimized for time-series)</li>
                      <li>• Retention policy: 90 days raw data</li>
                      <li>• Continuous queries for downsampling</li>
                      <li>• Aggregated data retained for 2 years</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-500/20">
                    <h4 className="text-purple-300 font-semibold mb-2">Stores</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <span className="font-semibold text-white">Transaction metrics</span> (volume, latency, errors)</li>
                      <li>• <span className="font-semibold text-white">System performance</span> (CPU, memory, I/O)</li>
                      <li>• <span className="font-semibold text-white">Business KPIs</span> (approval rate, fraud rate)</li>
                      <li>• <span className="font-semibold text-white">User activity</span> (logins, API calls)</li>
                      <li>• Granularity: 1-second intervals</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-500/20">
                    <h4 className="text-purple-300 font-semibold mb-2">Performance</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Write throughput: <span className="text-purple-400">250K points/sec</span></li>
                      <li>• Query latency: <span className="text-purple-400">50ms</span> (avg)</li>
                      <li>• Real-time dashboards with Grafana</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Elasticsearch Search Engine */}
              <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/40 rounded-xl p-6 border border-yellow-500/50 hover:border-yellow-400 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Network className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-2xl font-bold text-yellow-300">Elasticsearch</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-lg text-sm font-semibold">3-Node Cluster</span>
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-lg text-sm font-semibold">Full-Text</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-yellow-500/20">
                    <h4 className="text-yellow-300 font-semibold mb-2">Configuration</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <span className="text-yellow-400">3 data nodes</span> (master-eligible)</li>
                      <li>• 5 shards per index, 1 replica per shard</li>
                      <li>• Rolling indices: 1 per month</li>
                      <li>• Index Lifecycle Management (ILM)</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-yellow-500/20">
                    <h4 className="text-yellow-300 font-semibold mb-2">Stores</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <span className="font-semibold text-white">Transaction search index</span> (last 12 months)</li>
                      <li>• <span className="font-semibold text-white">Merchant directory</span> (full-text search)</li>
                      <li>• <span className="font-semibold text-white">User query logs</span> (audit trail)</li>
                      <li>• <span className="font-semibold text-white">Fraud investigation data</span></li>
                      <li>• Fields: merchant, category, amount, date, description</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-yellow-500/20">
                    <h4 className="text-yellow-300 font-semibold mb-2">Performance</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Search latency: <span className="text-yellow-400">20ms</span> (p50)</li>
                      <li>• Index rate: <span className="text-yellow-400">5K docs/sec</span></li>
                      <li>• Autocomplete latency: &lt;10ms</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Snowflake Data Warehouse */}
              <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/40 rounded-xl p-6 border border-cyan-500/50 hover:border-cyan-400 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Box className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-2xl font-bold text-cyan-300">Snowflake Warehouse</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg text-sm font-semibold">Cloud DW</span>
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg text-sm font-semibold">Multi-TB</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-500/20">
                    <h4 className="text-cyan-300 font-semibold mb-2">Configuration</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <span className="text-cyan-400">Multi-cluster warehouse</span> (auto-scaling)</li>
                      <li>• Separate virtual warehouses for ETL, BI, ML</li>
                      <li>• Storage: Multi-TB (5+ years historical data)</li>
                      <li>• Time Travel: 90 days</li>
                      <li>• Zero-copy cloning for dev/test</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-500/20">
                    <h4 className="text-cyan-300 font-semibold mb-2">Stores</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <span className="font-semibold text-white">Historical transactions</span> (5+ years)</li>
                      <li>• <span className="font-semibold text-white">User behavior data</span> (clicks, sessions)</li>
                      <li>• <span className="font-semibold text-white">Aggregated analytics</span> (daily/monthly rollups)</li>
                      <li>• <span className="font-semibold text-white">ML training datasets</span> (fraud models)</li>
                      <li>• <span className="font-semibold text-white">Compliance reports</span> (regulatory data)</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-500/20">
                    <h4 className="text-cyan-300 font-semibold mb-2">Performance</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• ETL: <span className="text-cyan-400">Nightly batch</span> (2-hour window)</li>
                      <li>• Query latency: <span className="text-cyan-400">5-30s</span> (complex aggregations)</li>
                      <li>• Concurrent users: 50+ analysts</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* PostgreSQL Event Store */}
              <div className="bg-gradient-to-br from-indigo-900/40 to-indigo-800/40 rounded-xl p-6 border border-indigo-500/50 hover:border-indigo-400 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-indigo-400" />
                  <h3 className="text-2xl font-bold text-indigo-300">PostgreSQL Event Store</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg text-sm font-semibold">Append-Only</span>
                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg text-sm font-semibold">Event Sourcing</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-indigo-500/20">
                    <h4 className="text-indigo-300 font-semibold mb-2">Configuration</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <span className="text-indigo-400">Append-only log</span> (immutable events)</li>
                      <li>• Single primary with streaming replication</li>
                      <li>• Partitioned by timestamp (monthly partitions)</li>
                      <li>• Indexed by: eventId, aggregateId, timestamp</li>
                      <li>• Write-Ahead Log (WAL) for durability</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-indigo-500/20">
                    <h4 className="text-indigo-300 font-semibold mb-2">Stores</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <span className="font-semibold text-white">Domain events</span> (CardApplied, TransactionAuthorized)</li>
                      <li>• <span className="font-semibold text-white">Command audit log</span> (who/what/when)</li>
                      <li>• <span className="font-semibold text-white">State transitions</span> (account lifecycle)</li>
                      <li>• <span className="font-semibold text-white">Saga state</span> (distributed transaction status)</li>
                      <li>• Never updated or deleted (compliance requirement)</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-indigo-500/20">
                    <h4 className="text-indigo-300 font-semibold mb-2">Performance</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Write latency: <span className="text-indigo-400">5ms</span></li>
                      <li>• Event replay: Rebuild aggregates from events</li>
                      <li>• Retention: Indefinite (archival to S3 after 3 years)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Flow Diagram */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-purple-500 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <ArrowRight className="w-8 h-8 text-purple-400" />
                End-to-End Data Flow
              </h2>

              {/* Purchase Transaction Flow */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-purple-300 mb-4">Scenario: User Makes a Purchase</h3>
                <div className="space-y-4">
                  {[
                    {
                      step: '1',
                      title: 'Transaction Request',
                      desc: 'User swipes card at merchant POS',
                      details: 'API Gateway receives authorization request with card details, amount, merchant info',
                      color: 'blue'
                    },
                    {
                      step: '2',
                      title: 'Cache Check (Redis)',
                      desc: 'Check Redis for user session, recent transactions, rate limits',
                      details: 'If cached: <1ms response. Cache miss: Continue to PostgreSQL Account DB',
                      color: 'red'
                    },
                    {
                      step: '3',
                      title: 'Account Verification (PostgreSQL)',
                      desc: 'Query Account DB for user balance, credit limit, account status',
                      details: 'Read from replica (70% of reads). Check available credit = credit_limit - current_balance',
                      color: 'blue'
                    },
                    {
                      step: '4',
                      title: 'Fraud Detection',
                      desc: 'XGBoost ML model scores transaction for fraud risk',
                      details: 'Input: amount, merchant, location, time, user history. Output: Risk score 0-100',
                      color: 'orange'
                    },
                    {
                      step: '5',
                      title: 'Authorization Decision',
                      desc: 'Approve or decline based on balance + fraud score',
                      details: 'If approved: Continue to step 6. If declined: Return error, log to Event Store',
                      color: 'green'
                    },
                    {
                      step: '6',
                      title: 'Write Transaction (MongoDB)',
                      desc: 'Insert transaction record to MongoDB shard based on userId',
                      details: 'Shard key: userId. Document includes: txnId, amount, merchant, timestamp, fraudScore',
                      color: 'green'
                    },
                    {
                      step: '7',
                      title: 'Update Balance (PostgreSQL)',
                      desc: 'Deduct amount from available credit in Account DB (primary)',
                      details: 'ACID transaction: UPDATE accounts SET balance = balance + amount WHERE userId = ?',
                      color: 'blue'
                    },
                    {
                      step: '8',
                      title: 'Event Sourcing (Event Store)',
                      desc: 'Append TransactionAuthorized event to Event Store',
                      details: 'Immutable log entry with eventId, aggregateId (userId), payload, timestamp',
                      color: 'indigo'
                    },
                    {
                      step: '9',
                      title: 'Cache Update (Redis)',
                      desc: 'Invalidate old balance cache, cache new transaction',
                      details: 'Set TTL: balance (5min), recent_txns (1min). Update rate limit counter',
                      color: 'red'
                    },
                    {
                      step: '10',
                      title: 'Index for Search (Elasticsearch)',
                      desc: 'Async job indexes transaction to Elasticsearch',
                      details: 'User can search transactions by merchant, date, amount within seconds',
                      color: 'yellow'
                    },
                    {
                      step: '11',
                      title: 'Real-time Metrics (InfluxDB)',
                      desc: 'Write transaction metrics for dashboards',
                      details: 'Metrics: transaction_count, approval_rate, avg_amount, latency_p99',
                      color: 'purple'
                    },
                    {
                      step: '12',
                      title: 'Nightly ETL (Snowflake)',
                      desc: 'Batch ETL copies transactions to Snowflake',
                      details: 'Runs at 2 AM. Copy last 24 hours from MongoDB → Snowflake. Used for BI reports, ML training',
                      color: 'cyan'
                    }
                  ].map((flow, idx) => (
                    <div key={idx} className={`flex gap-4 items-start bg-slate-800/50 rounded-lg p-4 border border-${flow.color}-500/30`}>
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-${flow.color}-500/20 border-2 border-${flow.color}-500 flex items-center justify-center text-${flow.color}-300 font-bold`}>
                        {flow.step}
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-lg font-bold text-${flow.color}-300 mb-1`}>{flow.title}</h4>
                        <p className="text-gray-300 text-sm mb-2">{flow.desc}</p>
                        <p className="text-gray-400 text-xs italic">{flow.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Flow Summary */}
              <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-xl p-6 border border-purple-500/50">
                <h3 className="text-xl font-bold text-purple-300 mb-4">Data Flow Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-purple-300 font-semibold mb-2">Write Path (Hot)</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>1. PostgreSQL Account DB → Balance check</li>
                      <li>2. MongoDB Transaction DB → Store transaction</li>
                      <li>3. PostgreSQL Event Store → Audit log</li>
                      <li>4. Redis Cache → Invalidate + update</li>
                      <li><span className="text-green-400 font-semibold">Total latency: ~100ms</span></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-purple-300 font-semibold mb-2">Async Path (Cold)</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>5. Elasticsearch → Search indexing (5-10s delay)</li>
                      <li>6. InfluxDB → Real-time metrics (1s delay)</li>
                      <li>7. Snowflake → Batch ETL (nightly, 2-hour window)</li>
                      <li><span className="text-cyan-400 font-semibold">Non-blocking, eventual consistency</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Why 7 Databases? */}
              <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 rounded-xl p-6 border border-yellow-500/50 mt-6">
                <h3 className="text-xl font-bold text-yellow-300 mb-4">🤔 Why Use 7 Different Databases?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-yellow-300 font-semibold mb-2">Polyglot Persistence Benefits</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <span className="font-semibold">Optimized for access patterns</span>: Each DB excels at its workload</li>
                      <li>• <span className="font-semibold">Scalability</span>: Scale write-heavy vs read-heavy DBs independently</li>
                      <li>• <span className="font-semibold">Performance</span>: Redis sub-ms, MongoDB 8ms writes, Snowflake complex analytics</li>
                      <li>• <span className="font-semibold">Compliance</span>: Event Store provides immutable audit trail</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-orange-300 font-semibold mb-2">Trade-offs</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <span className="text-red-400">Complexity</span>: More moving parts, operational overhead</li>
                      <li>• <span className="text-red-400">Consistency</span>: Eventual consistency across databases</li>
                      <li>• <span className="text-red-400">Data sync</span>: ETL pipelines, CDC (Change Data Capture) required</li>
                      <li>• <span className="text-green-400">Worth it</span> for 10M users, 30M+ req/day, 99.99% SLA</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Database Comparison Table */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-blue-500 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-6">Database Comparison Matrix</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-blue-500">
                      <th className="text-left py-3 px-4 text-blue-300 font-semibold">Database</th>
                      <th className="text-left py-3 px-4 text-blue-300 font-semibold">Type</th>
                      <th className="text-left py-3 px-4 text-blue-300 font-semibold">Primary Use Case</th>
                      <th className="text-left py-3 px-4 text-blue-300 font-semibold">Consistency</th>
                      <th className="text-left py-3 px-4 text-blue-300 font-semibold">Latency</th>
                      <th className="text-left py-3 px-4 text-blue-300 font-semibold">Scale</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700 hover:bg-green-900/20">
                      <td className="py-3 px-4 font-semibold text-green-300">MongoDB</td>
                      <td className="py-3 px-4">Document (NoSQL)</td>
                      <td className="py-3 px-4">Transaction records</td>
                      <td className="py-3 px-4">Eventual</td>
                      <td className="py-3 px-4 text-green-400">8ms</td>
                      <td className="py-3 px-4">Horizontal (Sharding)</td>
                    </tr>
                    <tr className="border-b border-gray-700 hover:bg-blue-900/20">
                      <td className="py-3 px-4 font-semibold text-blue-300">PostgreSQL (Account)</td>
                      <td className="py-3 px-4">Relational (SQL)</td>
                      <td className="py-3 px-4">User accounts, balances</td>
                      <td className="py-3 px-4 text-green-400">Strong (ACID)</td>
                      <td className="py-3 px-4 text-blue-400">3-12ms</td>
                      <td className="py-3 px-4">Vertical + Replicas</td>
                    </tr>
                    <tr className="border-b border-gray-700 hover:bg-red-900/20">
                      <td className="py-3 px-4 font-semibold text-red-300">Redis</td>
                      <td className="py-3 px-4">In-Memory (KV)</td>
                      <td className="py-3 px-4">Cache, sessions</td>
                      <td className="py-3 px-4">Eventual</td>
                      <td className="py-3 px-4 text-green-400">&lt;1ms</td>
                      <td className="py-3 px-4">Horizontal (Cluster)</td>
                    </tr>
                    <tr className="border-b border-gray-700 hover:bg-purple-900/20">
                      <td className="py-3 px-4 font-semibold text-purple-300">InfluxDB</td>
                      <td className="py-3 px-4">Time-Series</td>
                      <td className="py-3 px-4">Metrics, monitoring</td>
                      <td className="py-3 px-4">Eventual</td>
                      <td className="py-3 px-4 text-purple-400">50ms</td>
                      <td className="py-3 px-4">Vertical</td>
                    </tr>
                    <tr className="border-b border-gray-700 hover:bg-yellow-900/20">
                      <td className="py-3 px-4 font-semibold text-yellow-300">Elasticsearch</td>
                      <td className="py-3 px-4">Search Engine</td>
                      <td className="py-3 px-4">Full-text search</td>
                      <td className="py-3 px-4">Eventual</td>
                      <td className="py-3 px-4 text-yellow-400">20ms</td>
                      <td className="py-3 px-4">Horizontal (Shards)</td>
                    </tr>
                    <tr className="border-b border-gray-700 hover:bg-cyan-900/20">
                      <td className="py-3 px-4 font-semibold text-cyan-300">Snowflake</td>
                      <td className="py-3 px-4">Data Warehouse</td>
                      <td className="py-3 px-4">Analytics, BI, ML</td>
                      <td className="py-3 px-4">Eventual</td>
                      <td className="py-3 px-4 text-cyan-400">5-30s</td>
                      <td className="py-3 px-4">Auto-scaling (Cloud)</td>
                    </tr>
                    <tr className="border-b border-gray-700 hover:bg-indigo-900/20">
                      <td className="py-3 px-4 font-semibold text-indigo-300">PostgreSQL (Event)</td>
                      <td className="py-3 px-4">Relational (SQL)</td>
                      <td className="py-3 px-4">Event sourcing, audit</td>
                      <td className="py-3 px-4 text-green-400">Strong (ACID)</td>
                      <td className="py-3 px-4 text-indigo-400">5ms</td>
                      <td className="py-3 px-4">Vertical (Append-only)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* API Endpoints Tab */}
        {activeTab === 'api' && (
          <div className="space-y-8">
            {/* API Overview */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-8 border border-blue-500 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Globe className="w-8 h-8 text-blue-400" />
                RESTful API Endpoints
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                The Credit Card Portal exposes a comprehensive REST API organized by domain. All endpoints follow REST conventions,
                use OAuth 2.0 + JWT authentication, and return JSON responses. Rate limiting: <span className="text-yellow-300 font-semibold">1000 req/min per user</span>.
              </p>

              {/* API Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="text-blue-400 text-3xl font-bold">30M+</div>
                  <div className="text-gray-300 text-sm">Requests/Day</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="text-green-400 text-3xl font-bold">&lt;50ms</div>
                  <div className="text-gray-300 text-sm">Avg Response Time</div>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <div className="text-purple-400 text-3xl font-bold">99.95%</div>
                  <div className="text-gray-300 text-sm">Success Rate</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="text-yellow-400 text-3xl font-bold">OAuth 2.0</div>
                  <div className="text-gray-300 text-sm">+ JWT Auth</div>
                </div>
              </div>
            </div>

            {/* Account Management APIs */}
            <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-7 h-7 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Account Management</h3>
              </div>

              <div className="space-y-4">
                {/* GET Account Details */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded font-bold text-sm">GET</span>
                      <code className="text-sm font-mono text-gray-800">/api/v1/accounts/{`{accountId}`}</code>
                    </div>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">Read Side</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Retrieve account details including balance, credit limit, and status.</p>
                  <div className="bg-white rounded p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Response (200 OK):</p>
                    <pre className="text-xs text-gray-700 overflow-x-auto"><code>{`{
  "accountId": "ACC-1234567890",
  "userId": "USR-9876543210",
  "status": "ACTIVE",
  "creditLimit": 10000.00,
  "availableCredit": 7500.00,
  "currentBalance": 2500.00,
  "lastStatementDate": "2024-01-01",
  "paymentDueDate": "2024-01-25",
  "minPaymentDue": 50.00
}`}</code></pre>
                  </div>
                </div>

                {/* POST Create Account */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded font-bold text-sm">POST</span>
                      <code className="text-sm font-mono text-gray-800">/api/v1/accounts</code>
                    </div>
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-semibold">Write Side</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Create a new credit card account (triggers Saga orchestration).</p>
                  <div className="bg-white rounded p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Request Body:</p>
                    <pre className="text-xs text-gray-700 overflow-x-auto mb-3"><code>{`{
  "userId": "USR-9876543210",
  "productType": "PLATINUM",
  "requestedCreditLimit": 15000.00,
  "employmentStatus": "EMPLOYED",
  "annualIncome": 75000.00
}`}</code></pre>
                    <p className="text-xs font-semibold text-gray-500 mb-2">Response (202 Accepted):</p>
                    <pre className="text-xs text-gray-700 overflow-x-auto"><code>{`{
  "applicationId": "APP-1234567890",
  "status": "PENDING_APPROVAL",
  "message": "Application submitted for review"
}`}</code></pre>
                  </div>
                </div>

                {/* PATCH Update Account */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded font-bold text-sm">PATCH</span>
                      <code className="text-sm font-mono text-gray-800">/api/v1/accounts/{`{accountId}`}</code>
                    </div>
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-semibold">Write Side</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Update account settings (address, phone, email).</p>
                  <div className="bg-white rounded p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Request Body:</p>
                    <pre className="text-xs text-gray-700 overflow-x-auto"><code>{`{
  "email": "newemail@example.com",
  "phone": "+1-555-0123",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  }
}`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction APIs */}
            <div className="bg-white rounded-xl p-6 border-2 border-green-200 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-7 h-7 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-900">Transactions</h3>
              </div>

              <div className="space-y-4">
                {/* POST Process Transaction */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded font-bold text-sm">POST</span>
                      <code className="text-sm font-mono text-gray-800">/api/v1/transactions</code>
                    </div>
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-semibold">Write Side</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Process a credit card transaction with fraud detection (&lt;100ms).</p>
                  <div className="bg-white rounded p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Request Body:</p>
                    <pre className="text-xs text-gray-700 overflow-x-auto mb-3"><code>{`{
  "accountId": "ACC-1234567890",
  "amount": 125.50,
  "currency": "USD",
  "merchantId": "MER-9876543210",
  "merchantName": "Amazon.com",
  "merchantCategory": "RETAIL",
  "transactionType": "PURCHASE",
  "idempotencyKey": "TXN-UUID-12345"
}`}</code></pre>
                    <p className="text-xs font-semibold text-gray-500 mb-2">Response (200 OK):</p>
                    <pre className="text-xs text-gray-700 overflow-x-auto"><code>{`{
  "transactionId": "TXN-1234567890",
  "status": "APPROVED",
  "authorizationCode": "AUTH-987654",
  "fraudScore": 12,
  "fraudReason": null,
  "availableCredit": 7374.50,
  "processedAt": "2024-01-15T10:30:00Z"
}`}</code></pre>
                  </div>
                </div>

                {/* GET Transaction History */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded font-bold text-sm">GET</span>
                      <code className="text-sm font-mono text-gray-800">/api/v1/accounts/{`{accountId}`}/transactions</code>
                    </div>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">Read Side</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Retrieve paginated transaction history with filters.</p>
                  <div className="bg-white rounded p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Query Parameters:</p>
                    <pre className="text-xs text-gray-700 overflow-x-auto mb-3"><code>{`?startDate=2024-01-01&endDate=2024-01-31&page=0&size=20&sort=date,desc`}</code></pre>
                    <p className="text-xs font-semibold text-gray-500 mb-2">Response (200 OK):</p>
                    <pre className="text-xs text-gray-700 overflow-x-auto"><code>{`{
  "transactions": [
    {
      "transactionId": "TXN-1234567890",
      "date": "2024-01-15T10:30:00Z",
      "merchantName": "Amazon.com",
      "amount": 125.50,
      "status": "POSTED",
      "category": "RETAIL"
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 45,
  "totalPages": 3
}`}</code></pre>
                  </div>
                </div>

                {/* POST Dispute Transaction */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded font-bold text-sm">POST</span>
                      <code className="text-sm font-mono text-gray-800">/api/v1/transactions/{`{transactionId}`}/dispute</code>
                    </div>
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-semibold">Write Side</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Initiate a dispute for a transaction.</p>
                  <div className="bg-white rounded p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Request Body:</p>
                    <pre className="text-xs text-gray-700 overflow-x-auto"><code>{`{
  "reason": "FRAUDULENT",
  "description": "I did not authorize this transaction",
  "contactPhone": "+1-555-0123"
}`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment APIs */}
            <div className="bg-white rounded-xl p-6 border-2 border-purple-200 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-7 h-7 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-900">Payments</h3>
              </div>

              <div className="space-y-4">
                {/* POST Make Payment */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded font-bold text-sm">POST</span>
                      <code className="text-sm font-mono text-gray-800">/api/v1/payments</code>
                    </div>
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-semibold">Write Side</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Make a payment towards credit card balance (with idempotency).</p>
                  <div className="bg-white rounded p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Request Body:</p>
                    <pre className="text-xs text-gray-700 overflow-x-auto mb-3"><code>{`{
  "accountId": "ACC-1234567890",
  "amount": 500.00,
  "paymentMethod": "BANK_ACCOUNT",
  "bankAccountId": "BA-1234567890",
  "paymentType": "STATEMENT_BALANCE",
  "scheduledDate": "2024-01-25",
  "idempotencyKey": "PAY-UUID-12345"
}`}</code></pre>
                    <p className="text-xs font-semibold text-gray-500 mb-2">Response (201 Created):</p>
                    <pre className="text-xs text-gray-700 overflow-x-auto"><code>{`{
  "paymentId": "PAY-1234567890",
  "status": "SCHEDULED",
  "confirmationNumber": "CONF-987654",
  "scheduledDate": "2024-01-25",
  "estimatedPosting": "2024-01-26"
}`}</code></pre>
                  </div>
                </div>

                {/* GET Payment History */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded font-bold text-sm">GET</span>
                      <code className="text-sm font-mono text-gray-800">/api/v1/accounts/{`{accountId}`}/payments</code>
                    </div>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">Read Side</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Retrieve payment history for an account.</p>
                  <div className="bg-white rounded p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Response (200 OK):</p>
                    <pre className="text-xs text-gray-700 overflow-x-auto"><code>{`{
  "payments": [
    {
      "paymentId": "PAY-1234567890",
      "amount": 500.00,
      "status": "POSTED",
      "paymentDate": "2024-01-26",
      "paymentMethod": "BANK_ACCOUNT"
    }
  ]
}`}</code></pre>
                  </div>
                </div>

                {/* DELETE Cancel Payment */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded font-bold text-sm">DELETE</span>
                      <code className="text-sm font-mono text-gray-800">/api/v1/payments/{`{paymentId}`}</code>
                    </div>
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-semibold">Write Side</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Cancel a scheduled payment (only if status is SCHEDULED).</p>
                  <div className="bg-white rounded p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Response (200 OK):</p>
                    <pre className="text-xs text-gray-700 overflow-x-auto"><code>{`{
  "paymentId": "PAY-1234567890",
  "status": "CANCELLED",
  "message": "Payment cancelled successfully"
}`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Rewards APIs */}
            <div className="bg-white rounded-xl p-6 border-2 border-yellow-200 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-7 h-7 text-yellow-600" />
                <h3 className="text-2xl font-bold text-gray-900">Rewards & Offers</h3>
              </div>

              <div className="space-y-4">
                {/* GET Rewards Balance */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded font-bold text-sm">GET</span>
                      <code className="text-sm font-mono text-gray-800">/api/v1/accounts/{`{accountId}`}/rewards</code>
                    </div>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">Read Side</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Get current rewards balance and redemption options.</p>
                  <div className="bg-white rounded p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Response (200 OK):</p>
                    <pre className="text-xs text-gray-700 overflow-x-auto"><code>{`{
  "totalPoints": 15750,
  "cashValue": 157.50,
  "pointsEarned30Days": 2500,
  "pointsRedeemed30Days": 0,
  "tier": "PLATINUM",
  "tierBenefits": ["5x points on travel", "Airport lounge access"]
}`}</code></pre>
                  </div>
                </div>

                {/* POST Redeem Rewards */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded font-bold text-sm">POST</span>
                      <code className="text-sm font-mono text-gray-800">/api/v1/rewards/redeem</code>
                    </div>
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-semibold">Write Side</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Redeem rewards points for cash back or statement credit.</p>
                  <div className="bg-white rounded p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Request Body:</p>
                    <pre className="text-xs text-gray-700 overflow-x-auto"><code>{`{
  "accountId": "ACC-1234567890",
  "points": 10000,
  "redemptionType": "STATEMENT_CREDIT"
}`}</code></pre>
                  </div>
                </div>

                {/* GET Available Offers */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded font-bold text-sm">GET</span>
                      <code className="text-sm font-mono text-gray-800">/api/v1/offers</code>
                    </div>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">Read Side</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Get personalized offers and promotions.</p>
                  <div className="bg-white rounded p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Response (200 OK):</p>
                    <pre className="text-xs text-gray-700 overflow-x-auto"><code>{`{
  "offers": [
    {
      "offerId": "OFF-1234567890",
      "title": "10% back at Amazon",
      "description": "Earn 10% cashback on Amazon purchases",
      "expiryDate": "2024-02-28",
      "category": "RETAIL"
    }
  ]
}`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics APIs */}
            <div className="bg-white rounded-xl p-6 border-2 border-cyan-200 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <BarChart className="w-7 h-7 text-cyan-600" />
                <h3 className="text-2xl font-bold text-gray-900">Analytics & Reporting</h3>
              </div>

              <div className="space-y-4">
                {/* GET Spending Analytics */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded font-bold text-sm">GET</span>
                      <code className="text-sm font-mono text-gray-800">/api/v1/accounts/{`{accountId}`}/analytics/spending</code>
                    </div>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">Read Side</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Get spending analytics by category and time period.</p>
                  <div className="bg-white rounded p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Query Parameters:</p>
                    <pre className="text-xs text-gray-700 overflow-x-auto mb-3"><code>{`?period=MONTHLY&year=2024&month=1`}</code></pre>
                    <p className="text-xs font-semibold text-gray-500 mb-2">Response (200 OK):</p>
                    <pre className="text-xs text-gray-700 overflow-x-auto"><code>{`{
  "period": "2024-01",
  "totalSpending": 2500.00,
  "categoryBreakdown": [
    {"category": "RETAIL", "amount": 1200.00, "percentage": 48},
    {"category": "DINING", "amount": 600.00, "percentage": 24},
    {"category": "TRAVEL", "amount": 400.00, "percentage": 16},
    {"category": "OTHER", "amount": 300.00, "percentage": 12}
  ],
  "topMerchants": [
    {"name": "Amazon.com", "amount": 800.00, "transactions": 12},
    {"name": "Uber", "amount": 250.00, "transactions": 8}
  ]
}`}</code></pre>
                  </div>
                </div>

                {/* GET Statement */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded font-bold text-sm">GET</span>
                      <code className="text-sm font-mono text-gray-800">/api/v1/accounts/{`{accountId}`}/statements/{`{statementId}`}</code>
                    </div>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">Read Side</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">Download monthly statement as PDF.</p>
                  <div className="bg-white rounded p-3 border border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Response (200 OK):</p>
                    <pre className="text-xs text-gray-700 overflow-x-auto"><code>{`Content-Type: application/pdf
Content-Disposition: attachment; filename="statement-2024-01.pdf"`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Handling */}
            <div className="bg-gradient-to-br from-red-900 to-pink-900 rounded-2xl p-8 border border-red-500 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-red-400" />
                Error Handling
              </h2>

              <div className="space-y-4">
                {/* Standard Error Response */}
                <div className="bg-slate-900/50 rounded-lg p-4 border border-red-500/30">
                  <h4 className="text-red-300 font-semibold mb-3">Standard Error Response Format</h4>
                  <pre className="text-sm text-gray-300 overflow-x-auto"><code>{`{
  "timestamp": "2024-01-15T10:30:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Invalid account ID format",
  "path": "/api/v1/accounts/invalid-id",
  "requestId": "REQ-UUID-12345"
}`}</code></pre>
                </div>

                {/* Common Error Codes */}
                <div className="bg-slate-900/50 rounded-lg p-4 border border-red-500/30">
                  <h4 className="text-red-300 font-semibold mb-3">Common HTTP Status Codes</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-slate-800/50 rounded p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs font-bold">400</span>
                        <span className="text-white font-semibold">Bad Request</span>
                      </div>
                      <p className="text-gray-400 text-xs">Invalid request parameters or body</p>
                    </div>
                    <div className="bg-slate-800/50 rounded p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs font-bold">401</span>
                        <span className="text-white font-semibold">Unauthorized</span>
                      </div>
                      <p className="text-gray-400 text-xs">Missing or invalid authentication</p>
                    </div>
                    <div className="bg-slate-800/50 rounded p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded text-xs font-bold">403</span>
                        <span className="text-white font-semibold">Forbidden</span>
                      </div>
                      <p className="text-gray-400 text-xs">Insufficient permissions</p>
                    </div>
                    <div className="bg-slate-800/50 rounded p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs font-bold">404</span>
                        <span className="text-white font-semibold">Not Found</span>
                      </div>
                      <p className="text-gray-400 text-xs">Resource does not exist</p>
                    </div>
                    <div className="bg-slate-800/50 rounded p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded text-xs font-bold">429</span>
                        <span className="text-white font-semibold">Too Many Requests</span>
                      </div>
                      <p className="text-gray-400 text-xs">Rate limit exceeded (1000 req/min)</p>
                    </div>
                    <div className="bg-slate-800/50 rounded p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs font-bold">500</span>
                        <span className="text-white font-semibold">Internal Server Error</span>
                      </div>
                      <p className="text-gray-400 text-xs">Server-side error occurred</p>
                    </div>
                  </div>
                </div>

                {/* Rate Limiting */}
                <div className="bg-slate-900/50 rounded-lg p-4 border border-yellow-500/30">
                  <h4 className="text-yellow-300 font-semibold mb-3">Rate Limiting Headers</h4>
                  <pre className="text-sm text-gray-300 overflow-x-auto"><code>{`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 847
X-RateLimit-Reset: 1705320000`}</code></pre>
                </div>
              </div>
            </div>

            {/* Authentication */}
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-8 border border-indigo-500 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Lock className="w-8 h-8 text-indigo-400" />
                Authentication & Authorization
              </h2>

              <div className="space-y-4">
                {/* OAuth 2.0 Flow */}
                <div className="bg-slate-900/50 rounded-lg p-4 border border-indigo-500/30">
                  <h4 className="text-indigo-300 font-semibold mb-3">OAuth 2.0 + JWT Flow</h4>
                  <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
                    <li>Client requests authorization from user</li>
                    <li>User grants permission, client receives authorization code</li>
                    <li>Client exchanges code for access token (JWT) + refresh token</li>
                    <li>Client includes JWT in Authorization header for API requests</li>
                    <li>API Gateway validates JWT signature and expiry</li>
                    <li>Use refresh token to get new access token when expired</li>
                  </ol>
                </div>

                {/* JWT Token Structure */}
                <div className="bg-slate-900/50 rounded-lg p-4 border border-indigo-500/30">
                  <h4 className="text-indigo-300 font-semibold mb-3">JWT Token Structure</h4>
                  <pre className="text-sm text-gray-300 overflow-x-auto mb-3"><code>{`{
  "header": {
    "alg": "RS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "USR-9876543210",
    "accountId": "ACC-1234567890",
    "roles": ["CUSTOMER"],
    "iss": "https://auth.creditcard.com",
    "exp": 1705320000,
    "iat": 1705316400
  }
}`}</code></pre>
                </div>

                {/* Authorization Header */}
                <div className="bg-slate-900/50 rounded-lg p-4 border border-indigo-500/30">
                  <h4 className="text-indigo-300 font-semibold mb-3">API Request with JWT</h4>
                  <pre className="text-sm text-gray-300 overflow-x-auto"><code>{`GET /api/v1/accounts/ACC-1234567890 HTTP/1.1
Host: api.creditcard.com
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json`}</code></pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

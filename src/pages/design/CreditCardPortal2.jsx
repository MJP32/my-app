import React, { useState } from 'react';
import {
  ChevronDown, ChevronRight, Database, Cloud, Lock, AlertCircle, Check, Users,
  CreditCard, TrendingUp, Zap, Eye, EyeOff, Download, Bell, Settings,
  ArrowUpRight, ArrowDownLeft, Calendar, DollarSign, Shield, Star,
  Filter, Search, MoreHorizontal, RefreshCw, PlusCircle, Activity, Award
} from 'lucide-react';

export default function CreditCardPortal2({ onBack }) {
  const [activeTab, setActiveTab] = useState('portal');
  const [expandedLayers, setExpandedLayers] = useState({});
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showBalance, setShowBalance] = useState(true);
  const [selectedCard, setSelectedCard] = useState(0);
  const [transactionFilter, setTransactionFilter] = useState('all');
  const [selectedCQRSComponent, setSelectedCQRSComponent] = useState(null);

  const toggleLayer = (layer) => {
    setExpandedLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  // Enhanced credit card data with premium features
  const creditCards = [
    {
      id: 1,
      name: 'Diamond Elite',
      number: '•••• •••• •••• 9876',
      fullNumber: '4532 8765 4321 9876',
      type: 'Visa Infinite',
      balance: 5247.80,
      limit: 50000,
      availableCredit: 44752.20,
      dueDate: '2024-11-15',
      minPayment: 157.43,
      rewards: 45780,
      color: 'from-cyan-600 to-cyan-800',
      status: 'Premium',
      fraudScore: 98
    },
    {
      id: 2,
      name: 'Platinum Business',
      number: '•••• •••• •••• 3456',
      fullNumber: '5432 1234 8765 3456',
      type: 'Mastercard World',
      balance: 8905.50,
      limit: 75000,
      availableCredit: 66094.50,
      dueDate: '2024-11-20',
      minPayment: 267.17,
      rewards: 67890,
      color: 'from-purple-600 to-purple-800',
      status: 'Business',
      fraudScore: 95
    }
  ];

  // Enhanced transaction data with fraud detection
  const transactions = [
    {
      id: 1,
      date: '2024-10-16',
      merchant: 'Apple Store',
      category: 'Electronics',
      amount: -1299.99,
      status: 'Posted',
      icon: '🍎',
      cardId: 1,
      fraudScore: 92,
      location: 'New York, NY'
    },
    {
      id: 2,
      date: '2024-10-15',
      merchant: 'Business Class Flight',
      category: 'Travel',
      amount: -2450.00,
      status: 'Posted',
      icon: '✈️',
      cardId: 2,
      fraudScore: 98,
      location: 'JFK Airport'
    },
    {
      id: 3,
      date: '2024-10-14',
      merchant: 'Payment Received',
      category: 'Payment',
      amount: 5000.00,
      status: 'Posted',
      icon: '💎',
      cardId: 1,
      fraudScore: 100,
      location: 'Online'
    },
    {
      id: 4,
      date: '2024-10-13',
      merchant: 'AWS Cloud Services',
      category: 'Business',
      amount: -789.45,
      status: 'Posted',
      icon: '☁️',
      cardId: 2,
      fraudScore: 97,
      location: 'Online'
    },
    {
      id: 5,
      date: '2024-10-12',
      merchant: 'Luxury Hotel',
      category: 'Travel',
      amount: -675.99,
      status: 'Pending',
      icon: '🏨',
      cardId: 1,
      fraudScore: 85,
      location: 'Miami, FL'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Posted': 'bg-green-100 text-green-800 border-green-200',
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Declined': 'bg-red-100 text-red-800 border-red-200'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusStyles[status] || statusStyles['Posted']}`}>
        {status}
      </span>
    );
  };

  const getFraudScoreBadge = (score) => {
    if (score >= 95) return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">✓ Verified</span>;
    if (score >= 85) return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">⚠ Review</span>;
    return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">🚨 Alert</span>;
  };

  const layers = [
    {
      id: 'ml',
      name: 'Advanced ML & AI Layer',
      color: 'from-cyan-500 to-cyan-600',
      components: ['Fraud Detection ML Model', 'Spending Pattern Analysis', 'Anomaly Detection Engine', 'Risk Scoring Service'],
      icon: Activity
    },
    {
      id: 'client',
      name: 'Client Layer',
      color: 'from-blue-500 to-blue-600',
      components: ['Progressive Web App', 'Native Mobile Apps (iOS/Android)', 'Admin Dashboard', '3rd Party Integration APIs'],
      icon: Cloud
    },
    {
      id: 'gateway',
      name: 'API Gateway & Security',
      color: 'from-purple-500 to-purple-600',
      components: ['Kong API Gateway', 'OAuth 2.0 + JWT Auth', 'WAF + DDoS Protection', 'Rate Limiter (Redis)', 'API Versioning'],
      icon: Lock
    },
    {
      id: 'core',
      name: 'Core Business Services',
      color: 'from-green-500 to-green-600',
      components: ['Premium Card Service', 'Advanced Account Management', 'Smart Payment Processor', 'Real-time Fraud Detection', 'Rewards Optimization Engine'],
      icon: CreditCard
    },
    {
      id: 'analytics',
      name: 'Advanced Analytics Platform',
      color: 'from-pink-500 to-pink-600',
      components: ['Real-time Dashboard (InfluxDB)', 'Predictive Analytics (TensorFlow)', 'Customer Insights Engine', 'Automated Reporting'],
      icon: TrendingUp
    },
    {
      id: 'eventbus',
      name: 'Event Streaming Platform',
      color: 'from-amber-500 to-amber-600',
      components: ['Apache Kafka Cluster', 'Topics: FraudAlert, TransactionStream, RewardsUpdated', 'Stream Processing (Kafka Streams)', 'Event Replay Capability'],
      icon: Zap
    },
    {
      id: 'data',
      name: 'Multi-Database Architecture',
      color: 'from-indigo-500 to-indigo-600',
      components: ['PostgreSQL Cluster (Primary + Replicas)', 'MongoDB Atlas (Sharded)', 'Redis Enterprise (Caching)', 'Elasticsearch (Search)', 'Snowflake (Data Warehouse)', 'Neo4j (Fraud Graph)'],
      icon: Database
    },
    {
      id: 'observability',
      name: 'Observability & Monitoring',
      color: 'from-purple-700 to-purple-800',
      components: ['Datadog (APM)', 'ELK Stack (Logs)', 'Grafana (Dashboards)', 'PagerDuty (Alerts)', 'OpenTelemetry (Tracing)'],
      icon: AlertCircle
    }
  ];

  const keyTalkingPoints = {
    main: [
      "Advanced Fraud Detection: ML models (XGBoost, Neural Networks) analyze transaction patterns in real-time with <50ms latency. Fraud score calculated per transaction.",
      "Premium Features: Enhanced rewards optimization, personalized spending insights, automated savings recommendations, and VIP concierge services.",
      "Graph Database Integration: Neo4j tracks relationships between cards, merchants, and locations to identify sophisticated fraud rings and patterns.",
      "Real-time Analytics: InfluxDB + Kafka Streams provide live spending dashboards, budget alerts, and predictive cash flow analysis.",
      "Zero-Downtime Deployments: Blue-green deployment strategy with Kubernetes, A/B testing capabilities, and automated rollback on errors."
    ],
    detailed: [
      "Microservices Architecture: 25+ independent services, each with its own database (database per service pattern), deployed on Kubernetes clusters.",
      "Advanced Caching Strategy: Multi-tier caching with Redis (L1), CDN (L2), and client-side caching (L3). Cache invalidation via Kafka events.",
      "ML Pipeline: Real-time feature extraction → Model inference (TensorFlow Serving) → Fraud score calculation → Alert generation (all under 50ms).",
      "Premium Rewards Engine: Dynamic rewards calculation based on spending patterns, merchant partnerships, and user preferences. Optimizes reward redemption.",
      "Advanced Security: Biometric authentication, behavioral analytics, device fingerprinting, and transaction tokenization for PCI DSS compliance."
    ]
  };

  const cqrsComponentDetails = {
    'client': {
      name: 'Client Applications',
      type: 'Presentation Layer',
      description: 'Web and Mobile applications that users interact with',
      technologies: ['React', 'Angular', 'iOS (Swift)', 'Android (Kotlin)'],
      responsibilities: [
        'User interface and experience',
        'Client-side validation',
        'State management',
        'API communication'
      ],
      metrics: '15M monthly active users'
    },
    'apigateway': {
      name: 'API Gateway',
      type: 'Entry Point',
      description: 'Single entry point for all client requests with security, routing, and rate limiting',
      technologies: ['Kong API Gateway', 'JWT', 'OAuth 2.0', 'Redis (Rate Limiting)'],
      responsibilities: [
        'Authentication and authorization',
        'Request routing to appropriate services',
        'Rate limiting (1000 req/min per user)',
        'Load balancing across service instances',
        'SSL termination'
      ],
      metrics: '30M+ requests/day, 99.99% uptime'
    },
    'commandhandler': {
      name: 'Command Handler',
      type: 'Command Side (Write)',
      description: 'Processes write operations (POST/PUT/DELETE) with business logic validation',
      technologies: ['Spring Boot', 'Java 21', 'Spring Validation', 'Hibernate'],
      responsibilities: [
        'ProcessPayment - validates and executes payments',
        'CreateTransaction - creates new transaction records',
        'UpdateBalance - updates account balances',
        'ApplyRewards - calculates and applies reward points',
        'Business rule validation',
        'Idempotency checking (Redis, 24h TTL)'
      ],
      metrics: 'Handles 15M transactions/day'
    },
    'writedb': {
      name: 'Write Database',
      type: 'Data Store (Write)',
      description: 'Optimized for write operations with ACID compliance',
      technologies: ['PostgreSQL (Primary + Replicas)', 'ACID Transactions', 'Normalized Schema'],
      responsibilities: [
        'Store transaction data with ACID guarantees',
        'Maintain referential integrity',
        'Support complex business transactions',
        'Provide strong consistency for writes'
      ],
      metrics: 'Primary + 3 replicas, 50TB data, <10ms write latency'
    },
    'queryhandler': {
      name: 'Query Handler',
      type: 'Query Side (Read)',
      description: 'Processes read operations (GET) from optimized read models',
      technologies: ['Spring Boot', 'Spring WebFlux (Reactive)', 'Caching'],
      responsibilities: [
        'GetTransactions - retrieve transaction history',
        'GetAccountBalance - fetch current balance',
        'GetRewardsStats - calculate rewards data',
        'SearchTransactions - full-text search across history',
        'Redis cache layer for hot data (<1ms)'
      ],
      metrics: 'Handles 10M queries/day, avg 5ms response time'
    },
    'readdb': {
      name: 'Read Database',
      type: 'Data Store (Read)',
      description: 'Optimized for read operations with denormalized data',
      technologies: ['MongoDB (Documents)', 'Elasticsearch (Search)', 'Redis (Cache)'],
      responsibilities: [
        'MongoDB: Denormalized transaction documents for fast reads',
        'Elasticsearch: Full-text search and complex aggregations',
        'Redis: Cache layer for recent transactions (<1ms)',
        'Support high-volume concurrent reads'
      ],
      metrics: 'MongoDB: 100TB sharded, Elasticsearch: 20 nodes, Redis: 99.99% hit rate'
    },
    'eventbus': {
      name: 'Event Bus (Kafka)',
      type: 'Message Broker',
      description: 'Decouples command and query sides with event streaming',
      technologies: ['Apache Kafka', 'Avro Schema Registry', 'Kafka Streams'],
      responsibilities: [
        'Publish events from Command side',
        'Topics: PaymentProcessed, TransactionCreated, BalanceUpdated, RewardsApplied, FraudDetected',
        'Consumer groups for different subscribers',
        'Event ordering and durability',
        'Replay capability for recovery'
      ],
      metrics: '30M events/day, 3 brokers, replication factor 3, 7-day retention'
    },
    'eventstore': {
      name: 'Event Store',
      type: 'Audit Log',
      description: 'Immutable log of all events for compliance and replay',
      technologies: ['PostgreSQL', 'Append-only Table', 'Partitioning by Date'],
      responsibilities: [
        'Store every event immutably',
        'Enable event replay to rebuild state',
        'Provide audit trail for compliance',
        'Support time-travel debugging',
        'Never delete, only append'
      ],
      metrics: '500M+ events stored, 200GB/month growth, 10-year retention'
    },
    'projections': {
      name: 'Projections',
      type: 'Event Processor',
      description: 'Transforms events into denormalized read models',
      technologies: ['Kafka Streams', 'Spring Cloud Stream', 'Event Handlers'],
      responsibilities: [
        'Subscribe to Kafka events',
        'Denormalize data for read optimization',
        'Update MongoDB transaction documents',
        'Update Elasticsearch search indices',
        'Refresh Redis cache',
        'Handle eventual consistency'
      ],
      metrics: 'Processes 30M events/day, 5-15 min lag acceptable'
    },
    'mlfraud': {
      name: 'ML Fraud Detection',
      type: 'Analytics Service',
      description: 'Real-time machine learning fraud scoring',
      technologies: ['XGBoost', 'Neural Networks', 'TensorFlow Serving', 'Python'],
      responsibilities: [
        'Real-time transaction scoring (<50ms)',
        'Feature extraction from transaction data',
        'Fraud score calculation (0-100)',
        'Alert generation for suspicious activity',
        'Model retraining with new fraud patterns'
      ],
      metrics: '<50ms latency, 98% accuracy, detects 1M+ fraud attempts/month'
    },
    'analytics': {
      name: 'Analytics',
      type: 'Reporting Service',
      description: 'Real-time metrics and business intelligence',
      technologies: ['InfluxDB', 'Grafana', 'Apache Superset', 'Kafka Streams'],
      responsibilities: [
        'Real-time dashboard metrics',
        'Spending trends and forecasting',
        'Cashflow predictions',
        'Automated reporting (daily/weekly/monthly)',
        'Anomaly detection in spending patterns'
      ],
      metrics: '1000+ dashboards, 10K+ queries/day, real-time data refresh'
    }
  };

  const featureFlows = [
    {
      name: 'Real-time Fraud Detection',
      color: 'bg-red-100 border-l-4 border-red-500',
      steps: [
        '1. Transaction initiated from merchant POS',
        '2. API Gateway receives transaction request',
        '3. Parallel processing pipeline:',
        '   → Feature extraction service prepares ML inputs',
        '   → Fraud Detection ML model scores transaction (<50ms)',
        '   → Graph database checks merchant/location patterns',
        '   → Historical analysis from InfluxDB (user spending patterns)',
        '4. Risk score calculated (0-100 scale)',
        '5. If score < 85: Transaction flagged for review',
        '6. If score < 70: Transaction auto-declined + SMS alert',
        '7. FraudAlert event published to Kafka',
        '8. Real-time dashboard updated via WebSocket',
        '9. All data logged to ELK for compliance audit'
      ],
      patterns: ['Machine Learning', 'Graph Database', 'Real-time Processing', 'Event-Driven Architecture']
    },
    {
      name: 'Premium Rewards Optimization',
      color: 'bg-purple-100 border-l-4 border-purple-500',
      steps: [
        '1. User views rewards dashboard',
        '2. Rewards Engine analyzes:',
        '   → Current points balance',
        '   → Spending categories and patterns',
        '   → Available merchant partnerships',
        '   → Expiring rewards and promotions',
        '3. ML model predicts best redemption options',
        '4. Personalized recommendations generated:',
        '   → Travel rewards (flights, hotels)',
        '   → Cashback opportunities',
        '   → Gift cards with bonuses',
        '   → Charitable donations with matching',
        '5. User selects redemption option',
        '6. Rewards transaction processed with idempotency',
        '7. Account updated in real-time',
        '8. Confirmation sent via push notification'
      ],
      patterns: ['Personalization', 'ML Recommendations', 'Idempotency', 'Real-time Updates']
    },
    {
      name: 'Advanced Analytics Dashboard',
      color: 'bg-blue-100 border-l-4 border-blue-500',
      steps: [
        '1. User opens analytics dashboard',
        '2. WebSocket connection established for live updates',
        '3. Data aggregation from multiple sources:',
        '   → Redis cache: Recent transactions (<1ms)',
        '   → InfluxDB: Time-series spending data',
        '   → Elasticsearch: Transaction search and filters',
        '   → Snowflake: Historical trends (1-2 years)',
        '4. Real-time processing:',
        '   → Spending by category (pie charts)',
        '   → Monthly trends (line graphs)',
        '   → Budget tracking vs. goals',
        '   → Cashflow predictions (ML model)',
        '5. Interactive visualizations with Grafana',
        '6. Export options: PDF, CSV, Excel',
        '7. Scheduled reports via email/SMS',
        '8. All queries traced with OpenTelemetry'
      ],
      patterns: ['Real-time Analytics', 'Time-Series Data', 'Multi-source Aggregation', 'Predictive Analytics']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg transition-all flex items-center gap-2 shadow-lg"
          >
            ← Back to Projects
          </button>
        )}

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-white">💎 Credit Card Portal 2</h1>
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 rounded-full text-sm font-bold">PREMIUM</span>
          </div>
          <p className="text-gray-300">Next-Generation Credit Card Platform • Advanced ML Fraud Detection • Premium Features • 15M Users</p>
          <div className="flex gap-2 mt-4 flex-wrap">
            <span className="px-3 py-1 bg-cyan-900/50 text-cyan-300 rounded-full text-sm">💎 Premium Portal</span>
            <span className="px-3 py-1 bg-red-900/50 text-red-300 rounded-full text-sm">🤖 AI-Powered Fraud Detection</span>
            <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm">📊 Advanced Analytics</span>
            <span className="px-3 py-1 bg-green-900/50 text-green-300 rounded-full text-sm">🔄 Real-time Processing</span>
            <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm">🎁 Smart Rewards</span>
          </div>
        </div>

        <div className="flex gap-4 mb-8 border-b border-gray-700 overflow-x-auto">
          {['portal', 'system-design', 'main', 'detailed', 'flows', 'cqrs'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab === 'portal' && '💎 Premium Portal'}
              {tab === 'system-design' && '🎯 System Design'}
              {tab === 'main' && '🏗️ Architecture'}
              {tab === 'detailed' && '📊 Advanced Features'}
              {tab === 'flows' && '🔄 Feature Flows'}
              {tab === 'cqrs' && '⚡ CQRS Pattern'}
            </button>
          ))}
        </div>

        {activeTab === 'portal' && (
          <div className="space-y-8">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 rounded-xl p-6 border border-purple-500/30 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    Welcome back, Premium Member
                    <Award className="w-6 h-6 text-yellow-400" />
                  </h2>
                  <p className="text-gray-300">Your elite credit card management experience</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 bg-purple-700 hover:bg-purple-600 rounded-lg transition-colors relative">
                    <Bell className="w-5 h-5 text-gray-300" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <button className="p-2 bg-purple-700 hover:bg-purple-600 rounded-lg transition-colors">
                    <Settings className="w-5 h-5 text-gray-300" />
                  </button>
                </div>
              </div>

              {/* Enhanced Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/30 rounded-lg">
                      <DollarSign className="w-5 h-5 text-green-300" />
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Total Available</p>
                      <p className="text-white font-bold text-lg">{formatCurrency(creditCards.reduce((sum, card) => sum + card.availableCredit, 0))}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-500/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/30 rounded-lg">
                      <CreditCard className="w-5 h-5 text-blue-300" />
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Current Balance</p>
                      <p className="text-white font-bold text-lg">{formatCurrency(creditCards.reduce((sum, card) => sum + card.balance, 0))}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-lg p-4 border border-yellow-500/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-500/30 rounded-lg">
                      <Star className="w-5 h-5 text-yellow-300" />
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Premium Points</p>
                      <p className="text-white font-bold text-lg">{creditCards.reduce((sum, card) => sum + card.rewards, 0).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/30 rounded-lg">
                      <Shield className="w-5 h-5 text-purple-300" />
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Fraud Protection</p>
                      <p className="text-white font-bold text-lg">Active 🛡️</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Credit Cards Section */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-purple-500/30 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-purple-400" />
                  Premium Credit Cards
                </h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg transition-colors shadow-lg">
                  <PlusCircle className="w-4 h-4" />
                  Apply for Elite Card
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {creditCards.map((card, index) => (
                  <div
                    key={card.id}
                    className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${card.color} text-white cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                      selectedCard === index ? 'ring-4 ring-purple-400 ring-opacity-50' : ''
                    }`}
                    onClick={() => setSelectedCard(index)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold flex items-center gap-2">
                          {card.name}
                          <Star className="w-4 h-4 text-yellow-300" />
                        </h4>
                        <p className="text-white/80 text-sm">{card.type}</p>
                        <p className="text-white/60 text-xs mt-1">Fraud Score: {card.fraudScore}% {getFraudScoreBadge(card.fraudScore)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowBalance(!showBalance);
                          }}
                          className="p-1 hover:bg-white/20 rounded transition-colors"
                        >
                          {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button className="p-1 hover:bg-white/20 rounded transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-2xl font-mono tracking-wider">
                        {showBalance ? card.number : '•••• •••• •••• ••••'}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-white/70 text-xs uppercase tracking-wide">Balance</p>
                        <p className="text-lg font-bold">
                          {showBalance ? formatCurrency(card.balance) : '••••••'}
                        </p>
                      </div>
                      <div>
                        <p className="text-white/70 text-xs uppercase tracking-wide">Available</p>
                        <p className="text-lg font-bold">
                          {showBalance ? formatCurrency(card.availableCredit) : '••••••'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white/70 text-xs">Status</p>
                          <p className="text-sm font-semibold">{card.status}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/70 text-xs">Rewards</p>
                          <p className="text-sm font-semibold">{card.rewards.toLocaleString()} pts</p>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Transaction History with Fraud Scores */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-purple-500/30 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Activity className="w-6 h-6 text-cyan-400" />
                  Recent Transactions with Fraud Detection
                </h3>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-3 py-1 bg-purple-700 hover:bg-purple-600 text-gray-300 rounded-lg transition-colors">
                    <Search className="w-4 h-4" />
                    Search
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1 bg-purple-700 hover:bg-purple-600 text-gray-300 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-purple-900/30 rounded-lg border border-purple-500/20 hover:bg-purple-900/40 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-700/50 rounded-full flex items-center justify-center text-xl">
                        {transaction.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{transaction.merchant}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-gray-400 text-sm">{transaction.category}</p>
                          <span className="text-gray-500">•</span>
                          <p className="text-gray-400 text-sm">{new Date(transaction.date).toLocaleDateString()}</p>
                          <span className="text-gray-500">•</span>
                          <p className="text-gray-400 text-sm">{transaction.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`font-bold text-lg ${
                          transaction.amount > 0 ? 'text-green-400' : 'text-white'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusBadge(transaction.status)}
                          {getFraudScoreBadge(transaction.fraudScore)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Quick Actions */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-purple-500/30 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-400" />
                Premium Actions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg transition-all transform hover:scale-105 shadow-lg">
                  <DollarSign className="w-6 h-6" />
                  <div className="text-left">
                    <p className="font-semibold">Smart Payment</p>
                    <p className="text-purple-100 text-sm">AI-optimized payment</p>
                  </div>
                </button>

                <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white rounded-lg transition-all transform hover:scale-105 shadow-lg">
                  <Shield className="w-6 h-6" />
                  <div className="text-left">
                    <p className="font-semibold">Fraud Alerts</p>
                    <p className="text-cyan-100 text-sm">Real-time protection</p>
                  </div>
                </button>

                <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white rounded-lg transition-all transform hover:scale-105 shadow-lg">
                  <Star className="w-6 h-6" />
                  <div className="text-left">
                    <p className="font-semibold">Optimize Rewards</p>
                    <p className="text-yellow-100 text-sm">Maximize your points</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'system-design' && (
          <div className="space-y-6">
            {/* Requirements Section */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-purple-500/30 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span>📋</span> Functional Requirements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-lg p-4 border border-blue-500/20">
                  <h3 className="text-blue-300 font-bold mb-3 flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Core Features
                  </h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span><strong>Apply for credit card:</strong> Submit and process new credit card applications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span><strong>Create & access bank account:</strong> Manage user accounts and authentication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span><strong>Post transactions:</strong> Process transactions via 3rd party API (Stripe)</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 rounded-lg p-4 border border-purple-500/20">
                  <h3 className="text-purple-300 font-bold mb-3 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Analytics & Reporting
                  </h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span><strong>View card balance:</strong> Real-time balance inquiries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span><strong>Transaction history:</strong> Complete audit trail of all transactions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span><strong>Payment processing:</strong> Handle credit card payments securely</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span><strong>Stats reporting:</strong> Daily, weekly, and monthly analytics</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Non-Functional Requirements */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-purple-500/30 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Shield className="text-green-400" />
                Non-Functional Requirements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-lg p-4 border border-green-500/20">
                  <h3 className="text-green-300 font-bold mb-3">🚀 Scalability</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• 300M users (US region)</li>
                    <li>• Local region deployment</li>
                    <li>• USD currency only</li>
                    <li>• Horizontal scaling</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 rounded-lg p-4 border border-yellow-500/20">
                  <h3 className="text-yellow-300 font-bold mb-3">✓ Consistency</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• ACID-compliant database</li>
                    <li>• Highly consistent</li>
                    <li>• No overcharging</li>
                    <li>• No lost payments</li>
                    <li>• Track all activity before commit</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-red-900/30 to-red-800/30 rounded-lg p-4 border border-red-500/20">
                  <h3 className="text-red-300 font-bold mb-3">🛡️ Reliability</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Highly reliable (no data loss)</li>
                    <li>• &lt;10 hour outage/year</li>
                    <li>• &lt;1s load time (accounts/history)</li>
                    <li>• Secure payments (PCI DSS)</li>
                    <li>• Fraud detection</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* API Workflows */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-purple-500/30 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Zap className="text-cyan-400" />
                API Workflows
              </h2>

              <div className="space-y-4">
                {/* CreateApplication */}
                <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 rounded-lg p-5 border-l-4 border-blue-400">
                  <h3 className="text-white font-bold mb-3 text-lg flex items-center gap-2">
                    <span className="text-blue-400">1.</span> CreateApplication()
                  </h3>
                  <div className="space-y-2 text-sm text-gray-300 font-mono">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="w-4 h-4 text-blue-400" />
                      <span>Client → Load Balancer → Applications Management Service</span>
                    </div>
                    <div className="ml-6 text-gray-400">
                      <div>• Store application in queue</div>
                      <div>• Verify applicant details (credit check, identity verification)</div>
                      <div>• Notify user of success or failure</div>
                    </div>
                  </div>
                </div>

                {/* Create/Load Account */}
                <div className="bg-gradient-to-r from-purple-900/40 to-purple-800/40 rounded-lg p-5 border-l-4 border-purple-400">
                  <h3 className="text-white font-bold mb-3 text-lg flex items-center gap-2">
                    <span className="text-purple-400">2.</span> Create/LoadAccount()
                  </h3>
                  <div className="space-y-2 text-sm text-gray-300 font-mono">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="w-4 h-4 text-purple-400" />
                      <span>Client → Load Balancer → Accounts DB</span>
                    </div>
                    <div className="ml-6 text-gray-400">
                      <div>• Access accounts table (sharded by userId)</div>
                      <div>• Create new account or load existing</div>
                      <div>• Return account details to client</div>
                    </div>
                  </div>
                </div>

                {/* PostTransaction */}
                <div className="bg-gradient-to-r from-green-900/40 to-green-800/40 rounded-lg p-5 border-l-4 border-green-400">
                  <h3 className="text-white font-bold mb-3 text-lg flex items-center gap-2">
                    <span className="text-green-400">3.</span> PostTransaction()
                  </h3>
                  <div className="space-y-2 text-sm text-gray-300 font-mono">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="w-4 h-4 text-green-400" />
                      <span>Client → Load Balancer → Transactions Management Service</span>
                    </div>
                    <div className="ml-6 text-gray-400">
                      <div>• Validate transaction</div>
                      <div>• If successful, update account balance in DB</div>
                      <div>• Return transaction confirmation</div>
                    </div>
                  </div>
                </div>

                {/* ProcessPayment */}
                <div className="bg-gradient-to-r from-orange-900/40 to-orange-800/40 rounded-lg p-5 border-l-4 border-orange-400">
                  <h3 className="text-white font-bold mb-3 text-lg flex items-center gap-2">
                    <span className="text-orange-400">4.</span> ProcessPayment() - Two Part System
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-orange-300 font-semibold mb-2">Part 1: Payment Storage</h4>
                      <div className="space-y-2 text-sm text-gray-300 font-mono ml-4">
                        <div className="flex items-center gap-2">
                          <ArrowUpRight className="w-4 h-4 text-orange-400" />
                          <span>Client → API Gateway/LB → Payment Service</span>
                        </div>
                        <div className="ml-6 text-gray-400">
                          <div>• Store payment event in storage</div>
                          <div>• Return acknowledgment to client</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-orange-300 font-semibold mb-2">Part 2: Payment Execution</h4>
                      <div className="space-y-2 text-sm text-gray-300 font-mono ml-4">
                        <div className="flex items-center gap-2">
                          <ArrowUpRight className="w-4 h-4 text-orange-400" />
                          <span>Payment Event Storage → Payment Executor</span>
                        </div>
                        <div className="ml-6 text-gray-400">
                          <div>• Create job in processing queue</div>
                          <div>• Update Payments DB with status tracking:</div>
                          <div className="ml-4 space-y-1 mt-1">
                            <div>- orderID (idempotency key)</div>
                            <div>- userId</div>
                            <div>- lastUpdatedTime</div>
                            <div>- status: WAITING | SUCCESS | FAIL | PROCESSING</div>
                          </div>
                          <div className="mt-2">• Payment Executor calls Stripe API</div>
                          <div>• Stripe sends completion notification</div>
                          <div>• Update DB status to SUCCESS</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* UserPaymentActivityReport */}
                <div className="bg-gradient-to-r from-cyan-900/40 to-cyan-800/40 rounded-lg p-5 border-l-4 border-cyan-400">
                  <h3 className="text-white font-bold mb-3 text-lg flex items-center gap-2">
                    <span className="text-cyan-400">5.</span> UserPaymentActivityReportBuilding()
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-cyan-300 font-semibold mb-2">Report Generation</h4>
                      <div className="space-y-2 text-sm text-gray-300 font-mono ml-4">
                        <div className="text-gray-400 space-y-1">
                          <div>• Job scheduler checks users needing reports</div>
                          <div>• Add jobs to queue for report generation</div>
                          <div>• Reporting Service pulls from queue</div>
                          <div>• Creates report and stores in Reports DB</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-cyan-300 font-semibold mb-2">Architecture Approaches</h4>
                      <div className="space-y-2 text-sm text-gray-300 ml-4">
                        <div className="bg-cyan-900/30 p-2 rounded">
                          <strong className="text-cyan-200">Brute Force:</strong> Query DB for activity (last month/week/day)
                        </div>
                        <div className="bg-cyan-900/30 p-2 rounded">
                          <strong className="text-cyan-200">Lambda Architecture:</strong> Batch processing with MapReduce (overkill for current data volume)
                        </div>
                        <div className="bg-green-900/30 p-2 rounded border border-green-500/30">
                          <strong className="text-green-200">✓ Real-time (Selected):</strong> Kafka subscriber (Reporting Service) aggregates data from Payment Order queue → writes to Cassandra Reports DB
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ViewReport */}
                <div className="bg-gradient-to-r from-pink-900/40 to-pink-800/40 rounded-lg p-5 border-l-4 border-pink-400">
                  <h3 className="text-white font-bold mb-3 text-lg flex items-center gap-2">
                    <span className="text-pink-400">6.</span> ViewReport()
                  </h3>
                  <div className="space-y-2 text-sm text-gray-300 font-mono">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="w-4 h-4 text-pink-400" />
                      <span>User loads website/app → Pull data from Reports DB</span>
                    </div>
                    <div className="ml-6 text-gray-400">
                      <div>• Fetch pre-generated reports (daily/weekly/monthly)</div>
                      <div>• Display analytics and spending patterns</div>
                      <div>• Real-time refresh as new data comes in</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* High Level Design */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-purple-500/30 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Cloud className="text-blue-400" />
                High Level Design (HLD)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-lg p-4 border border-blue-500/20">
                  <h3 className="text-blue-300 font-bold mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Client Layer
                  </h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Web & Mobile App interfaces</li>
                    <li>• Progressive Web App (PWA)</li>
                    <li>• Seamless user experience</li>
                    <li>• Responsive design</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 rounded-lg p-4 border border-purple-500/20">
                  <h3 className="text-purple-300 font-bold mb-3 flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    API Gateway
                  </h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Single entry point for all requests</li>
                    <li>• Security and access control</li>
                    <li>• Rate limiting</li>
                    <li>• Load balancing</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-lg p-4 border border-green-500/20">
                  <h3 className="text-green-300 font-bold mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Authentication Service
                  </h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• User registration & login</li>
                    <li>• OAuth 2.0 + JWT</li>
                    <li>• Access control</li>
                    <li>• Token-based authentication</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/30 rounded-lg p-4 border border-cyan-500/20">
                  <h3 className="text-cyan-300 font-bold mb-3 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Card Management Service
                  </h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Credit card applications</li>
                    <li>• Account information</li>
                    <li>• Balance tracking</li>
                    <li>• Transaction history</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/30 rounded-lg p-4 border border-orange-500/20">
                  <h3 className="text-orange-300 font-bold mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Payment Processing Service
                  </h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Integration with Stripe API</li>
                    <li>• Secure transaction processing</li>
                    <li>• PCI DSS compliance</li>
                    <li>• Payment gateway integration</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-pink-900/30 to-pink-800/30 rounded-lg p-4 border border-pink-500/20">
                  <h3 className="text-pink-300 font-bold mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Reporting Service
                  </h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Aggregates transaction data</li>
                    <li>• Daily/Weekly/Monthly reports</li>
                    <li>• Business intelligence</li>
                    <li>• Analytics dashboards</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-indigo-900/30 to-indigo-800/30 rounded-lg p-4 border border-indigo-500/20">
                  <h3 className="text-indigo-300 font-bold mb-3 flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Database Layer
                  </h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• User data storage</li>
                    <li>• Account information</li>
                    <li>• Transaction records</li>
                    <li>• Secure & scalable</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-red-900/30 to-red-800/30 rounded-lg p-4 border border-red-500/20">
                  <h3 className="text-red-300 font-bold mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Monitoring & Resilience
                  </h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Load balancers (no SPOF)</li>
                    <li>• Exponential backoff</li>
                    <li>• Dead letter queues</li>
                    <li>• Nightly reconciliation jobs</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Deep Dive */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-purple-500/30 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Eye className="text-cyan-400" />
                Deep Dive: Production Considerations
              </h2>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-900/40 to-purple-800/40 rounded-lg p-4 border-l-4 border-purple-400">
                  <h3 className="text-purple-300 font-bold mb-3">🔄 Scalability & Availability</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• All components horizontally scalable</li>
                    <li>• Load balancers at every tier</li>
                    <li>• No single point of failure (SPOF)</li>
                    <li>• Multiple replicas for each service</li>
                    <li>• Auto-scaling based on demand</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-red-900/40 to-red-800/40 rounded-lg p-4 border-l-4 border-red-400">
                  <h3 className="text-red-300 font-bold mb-3">🚨 Error Handling & Recovery</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Exponential backoff:</strong> Retry failed requests with increasing delays</li>
                    <li>• <strong>Dead letter queues (DLQ):</strong> Capture failed messages for analysis</li>
                    <li>• <strong>Circuit breakers:</strong> Prevent cascading failures</li>
                    <li>• <strong>Graceful degradation:</strong> Maintain partial functionality during outages</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 rounded-lg p-4 border-l-4 border-blue-400">
                  <h3 className="text-blue-300 font-bold mb-3">🔍 Data Reconciliation</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Nightly reconciliation jobs:</strong> Run for every user account</li>
                    <li>• Compare event log activity with database values</li>
                    <li>• Detect syncing issues, dropped requests, or code problems</li>
                    <li>• Automated alerts for discrepancies</li>
                    <li>• Audit trail for compliance</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-green-900/40 to-green-800/40 rounded-lg p-4 border-l-4 border-green-400">
                  <h3 className="text-green-300 font-bold mb-3">⚡ Performance Optimization</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Caching:</strong> Static data cached at multiple layers (Redis, CDN)</li>
                    <li>• <strong>Data replication:</strong> All data backed up and synced with primary</li>
                    <li>• <strong>Read/Write separation:</strong> Cassandra for write-heavy transactions, separate DB for queries</li>
                    <li>• <strong>Database optimization:</strong> Proper indexing, query optimization</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-purple-500/30 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Settings className="text-yellow-400" />
                Technology Stack
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/30 rounded-lg p-4 border border-orange-500/20">
                  <h3 className="text-orange-300 font-bold mb-3">💳 Payment Processing</h3>
                  <div className="space-y-2 text-sm">
                    <div className="bg-orange-900/40 px-3 py-2 rounded text-orange-100">
                      <strong>Stripe:</strong> Payment API integration
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 rounded-lg p-4 border border-purple-500/20">
                  <h3 className="text-purple-300 font-bold mb-3">📡 Message Broker</h3>
                  <div className="space-y-2 text-sm">
                    <div className="bg-purple-900/40 px-3 py-2 rounded text-purple-100">
                      <strong>Kafka:</strong> Payment execution queue
                    </div>
                    <div className="bg-purple-900/40 px-3 py-2 rounded text-purple-100">
                      <strong>Kafka Streams:</strong> User activity aggregation
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-lg p-4 border border-blue-500/20">
                  <h3 className="text-blue-300 font-bold mb-3">💾 ACID Database</h3>
                  <div className="space-y-2 text-sm">
                    <div className="bg-blue-900/40 px-3 py-2 rounded text-blue-100">
                      <strong>MySQL:</strong> Primary transactional database
                    </div>
                    <div className="text-gray-400 text-xs mt-2">
                      Strong consistency, ACID compliance
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/30 rounded-lg p-4 border border-cyan-500/20">
                  <h3 className="text-cyan-300 font-bold mb-3">📊 Payment Events Storage</h3>
                  <div className="space-y-2 text-sm">
                    <div className="bg-cyan-900/40 px-3 py-2 rounded text-cyan-100">
                      <strong>Time Series DB</strong> or
                    </div>
                    <div className="bg-cyan-900/40 px-3 py-2 rounded text-cyan-100">
                      <strong>DynamoDB:</strong> Fast queries by timestamp
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-lg p-4 border border-green-500/20">
                  <h3 className="text-green-300 font-bold mb-3">📄 Reports Storage</h3>
                  <div className="space-y-2 text-sm">
                    <div className="bg-green-900/40 px-3 py-2 rounded text-green-100">
                      <strong>MongoDB:</strong> Document/object storage
                    </div>
                    <div className="text-gray-400 text-xs mt-2">
                      Flexible schema for report objects
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-pink-900/30 to-pink-800/30 rounded-lg p-4 border border-pink-500/20">
                  <h3 className="text-pink-300 font-bold mb-3">⚙️ Reporting Service</h3>
                  <div className="space-y-2 text-sm">
                    <div className="bg-pink-900/40 px-3 py-2 rounded text-pink-100">
                      <strong>Apache Spark:</strong> Automated reports from Kafka
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 rounded-lg p-4 border border-yellow-500/20">
                  <h3 className="text-yellow-300 font-bold mb-3">🔒 Security</h3>
                  <div className="space-y-2 text-sm">
                    <div className="bg-yellow-900/40 px-3 py-2 rounded text-yellow-100">
                      RESTful HTTPS
                    </div>
                    <div className="bg-yellow-900/40 px-3 py-2 rounded text-yellow-100">
                      Token-based authentication
                    </div>
                    <div className="bg-yellow-900/40 px-3 py-2 rounded text-yellow-100">
                      Firewall for internal services
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-900/30 to-indigo-800/30 rounded-lg p-4 border border-indigo-500/20">
                  <h3 className="text-indigo-300 font-bold mb-3">📈 Write-Heavy DB</h3>
                  <div className="space-y-2 text-sm">
                    <div className="bg-indigo-900/40 px-3 py-2 rounded text-indigo-100">
                      <strong>Cassandra:</strong> Transactions database
                    </div>
                    <div className="text-gray-400 text-xs mt-2">
                      Handles high write throughput
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-900/30 to-red-800/30 rounded-lg p-4 border border-red-500/20">
                  <h3 className="text-red-300 font-bold mb-3">🔍 Query DB</h3>
                  <div className="space-y-2 text-sm">
                    <div className="bg-red-900/40 px-3 py-2 rounded text-red-100">
                      Separate DB for read queries
                    </div>
                    <div className="text-gray-400 text-xs mt-2">
                      Optimized for viewing reports
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Design Decisions */}
            <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 rounded-xl p-6 border-2 border-purple-400">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Star className="text-yellow-400" />
                Key Design Decisions & Rationale
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-400/30">
                  <h3 className="text-purple-300 font-bold mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    Why Kafka for Event Bus?
                  </h3>
                  <p className="text-gray-300 text-sm">
                    High throughput message broker with event replay capability. Enables real-time data streaming for reporting and decouples payment processing from analytics.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-400/30">
                  <h3 className="text-purple-300 font-bold mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    Why MySQL + Cassandra?
                  </h3>
                  <p className="text-gray-300 text-sm">
                    MySQL for ACID-compliant transactions (no data loss), Cassandra for write-heavy transaction logs. Polyglot persistence for optimal performance.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-400/30">
                  <h3 className="text-purple-300 font-bold mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    Why Two-Part Payment Processing?
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Decouples payment submission from execution. Provides immediate acknowledgment to users while ensuring reliability with queue-based processing and status tracking.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-400/30">
                  <h3 className="text-purple-300 font-bold mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    Why Nightly Reconciliation?
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Ensures data integrity by comparing event logs with database state. Catches any discrepancies from dropped requests, network issues, or bugs before they become major problems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'main' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/30 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-4">🏗️ Advanced Architecture (Click to Expand)</h2>
              <div className="space-y-3">
                {layers.map((layer) => {
                  const Icon = layer.icon;
                  return (
                    <div key={layer.id} className="group">
                      <button
                        onClick={() => toggleLayer(layer.id)}
                        className={`w-full p-4 rounded-lg bg-gradient-to-r ${layer.color} text-white font-semibold flex items-center gap-3 hover:shadow-lg hover:scale-105 transition-all`}
                      >
                        <Icon size={24} />
                        <span className="flex-1 text-left">{layer.name}</span>
                        {expandedLayers[layer.id] ? <ChevronDown /> : <ChevronRight />}
                        <span className="text-sm opacity-75">({layer.components.length} components)</span>
                      </button>
                      {expandedLayers[layer.id] && (
                        <div className="bg-purple-900/30 mt-2 p-4 rounded-lg border-l-4 border-purple-400 ml-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {layer.components.map((comp, i) => (
                              <div key={i} className="flex items-center gap-2 text-gray-300">
                                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                                {comp}
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

            <div className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/30 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="text-yellow-400" /> Key Advanced Features
              </h3>
              <div className="space-y-3">
                {keyTalkingPoints.main.map((point, i) => (
                  <div key={i} className="flex gap-3 bg-purple-900/30 p-3 rounded-lg border border-purple-500/20">
                    <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
                    <p className="text-gray-300">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'detailed' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/30 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-4">📊 Advanced Technical Features</h2>
              <div className="space-y-3">
                {keyTalkingPoints.detailed.map((point, i) => (
                  <div key={i} className="flex gap-3 bg-purple-900/30 p-3 rounded-lg border border-purple-500/20">
                    <Check className="text-cyan-400 flex-shrink-0 mt-1" size={20} />
                    <p className="text-gray-300 text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'flows' && (
          <div className="space-y-6">
            {featureFlows.map((flow, idx) => (
              <div key={idx} className={`rounded-lg p-6 border-l-4 ${flow.color} backdrop-blur-sm bg-white/5`}>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-2xl font-bold text-white">{idx + 1}. {flow.name}</h3>
                </div>
                <div className="bg-purple-900/30 rounded-lg p-4 mb-4 border border-purple-500/20">
                  <div className="space-y-2 text-gray-300 text-sm font-mono">
                    {flow.steps.map((step, i) => (
                      <div key={i} className={step.startsWith('   ') ? 'ml-6 text-gray-400' : ''}>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {flow.patterns.map((pattern, i) => (
                    <span key={i} className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-semibold">
                      {pattern}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'cqrs' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-purple-500/30 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="text-yellow-400" />
                CQRS Pattern Implementation
              </h2>
              <p className="text-gray-300 mb-6">
                Command Query Responsibility Segregation (CQRS) separates read and write operations for optimal performance,
                scalability, and data consistency. The Credit Card Portal uses CQRS with Event Sourcing for high-throughput
                transaction processing and real-time analytics.
              </p>

              {/* CQRS Architecture Diagram */}
              <div className="bg-gradient-to-br from-slate-900 to-purple-900/30 rounded-xl p-8 border-2 border-purple-500/40 mb-6">
                <h3 className="text-xl font-bold text-white mb-6 text-center">CQRS Architecture Flow</h3>

                <svg viewBox="0 0 1200 800" className="w-full h-auto">
                  <defs>
                    {/* Gradients */}
                    <linearGradient id="clientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="commandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#b91c1c', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="queryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#047857', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="eventGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="dbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#6d28d9', stopOpacity: 1 }} />
                    </linearGradient>

                    {/* Arrow markers */}
                    <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
                    </marker>
                    <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
                    </marker>
                    <marker id="arrowOrange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
                    </marker>
                    <marker id="arrowPurple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6" />
                    </marker>
                    <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
                    </marker>
                  </defs>

                  {/* Client/User - CLICKABLE */}
                  <g onClick={() => setSelectedCQRSComponent('client')} style={{ cursor: 'pointer' }}>
                    <rect
                      x="20" y="350" width="140" height="100" rx="8"
                      fill="url(#clientGrad)"
                      stroke={selectedCQRSComponent === 'client' ? '#60a5fa' : '#60a5fa'}
                      strokeWidth={selectedCQRSComponent === 'client' ? '4' : '2'}
                      style={{ opacity: selectedCQRSComponent === 'client' ? 1 : 0.9 }}
                      className="hover:opacity-100 transition-all"
                    />
                    <text x="90" y="390" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>👤 Client</text>
                    <text x="90" y="410" fontSize="11" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>Web/Mobile</text>
                    <text x="90" y="425" fontSize="11" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>App</text>
                  </g>

                  {/* API Gateway - CLICKABLE */}
                  <g onClick={() => setSelectedCQRSComponent('apigateway')} style={{ cursor: 'pointer' }}>
                    <rect
                      x="220" y="330" width="140" height="140" rx="8"
                      fill="url(#clientGrad)"
                      stroke={selectedCQRSComponent === 'apigateway' ? '#60a5fa' : '#60a5fa'}
                      strokeWidth={selectedCQRSComponent === 'apigateway' ? '4' : '2'}
                      style={{ opacity: selectedCQRSComponent === 'apigateway' ? 1 : 0.9 }}
                      className="hover:opacity-100 transition-all"
                    />
                    <text x="290" y="360" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>🚪 API Gateway</text>
                    <text x="290" y="380" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>Kong</text>
                    <text x="290" y="400" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>Auth/JWT</text>
                    <text x="290" y="420" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>Rate Limiting</text>
                    <text x="290" y="440" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>Load Balancing</text>
                  </g>

                  {/* Arrow: Client to API Gateway */}
                  <path d="M 160 400 L 220 400" stroke="#3b82f6" strokeWidth="3" fill="none" markerEnd="url(#arrowBlue)" />
                  <text x="190" y="395" fontSize="10" fill="#60a5fa" textAnchor="middle">HTTP</text>

                  {/* COMMAND SIDE */}
                  <rect x="420" y="60" width="320" height="340" rx="12" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
                  <text x="580" y="90" fontSize="16" fontWeight="bold" fill="#ef4444" textAnchor="middle">COMMAND SIDE (Write)</text>

                  {/* Command Handler - CLICKABLE */}
                  <g onClick={() => setSelectedCQRSComponent('commandhandler')} style={{ cursor: 'pointer' }}>
                    <rect
                      x="450" y="120" width="260" height="120" rx="8"
                      fill="url(#commandGrad)"
                      stroke={selectedCQRSComponent === 'commandhandler' ? '#f87171' : '#f87171'}
                      strokeWidth={selectedCQRSComponent === 'commandhandler' ? '4' : '2'}
                      style={{ opacity: selectedCQRSComponent === 'commandhandler' ? 1 : 0.9 }}
                      className="hover:opacity-100 transition-all"
                    />
                    <text x="580" y="150" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>⚡ Command Handler</text>
                    <text x="580" y="170" fontSize="11" fill="#fee" textAnchor="middle" style={{ pointerEvents: 'none' }}>ProcessPayment</text>
                    <text x="580" y="185" fontSize="11" fill="#fee" textAnchor="middle" style={{ pointerEvents: 'none' }}>CreateTransaction</text>
                    <text x="580" y="200" fontSize="11" fill="#fee" textAnchor="middle" style={{ pointerEvents: 'none' }}>UpdateBalance</text>
                    <text x="580" y="215" fontSize="11" fill="#fee" textAnchor="middle" style={{ pointerEvents: 'none' }}>ApplyRewards</text>
                  </g>

                  {/* Write Database - CLICKABLE */}
                  <g onClick={() => setSelectedCQRSComponent('writedb')} style={{ cursor: 'pointer' }}>
                    <rect
                      x="450" y="270" width="260" height="100" rx="8"
                      fill="url(#dbGrad)"
                      stroke={selectedCQRSComponent === 'writedb' ? '#a78bfa' : '#a78bfa'}
                      strokeWidth={selectedCQRSComponent === 'writedb' ? '4' : '2'}
                      style={{ opacity: selectedCQRSComponent === 'writedb' ? 1 : 0.9 }}
                      className="hover:opacity-100 transition-all"
                    />
                    <text x="580" y="300" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>💾 Write DB</text>
                    <text x="580" y="320" fontSize="11" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>PostgreSQL</text>
                    <text x="580" y="335" fontSize="11" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>(Normalized)</text>
                    <text x="580" y="350" fontSize="11" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>ACID Transactions</text>
                  </g>

                  {/* Arrow: API Gateway to Command Handler */}
                  <path d="M 360 350 L 420 240 L 450 180" stroke="#ef4444" strokeWidth="3" fill="none" markerEnd="url(#arrowRed)" />
                  <text x="380" y="280" fontSize="10" fill="#ef4444" fontWeight="bold">POST/PUT</text>
                  <text x="380" y="295" fontSize="10" fill="#ef4444">Commands</text>

                  {/* Arrow: Command Handler to Write DB */}
                  <path d="M 580 240 L 580 270" stroke="#8b5cf6" strokeWidth="3" fill="none" markerEnd="url(#arrowPurple)" />
                  <text x="600" y="260" fontSize="10" fill="#8b5cf6" fontWeight="bold">Write</text>

                  {/* QUERY SIDE */}
                  <rect x="420" y="440" width="320" height="340" rx="12" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
                  <text x="580" y="470" fontSize="16" fontWeight="bold" fill="#10b981" textAnchor="middle">QUERY SIDE (Read)</text>

                  {/* Query Handler - CLICKABLE */}
                  <g onClick={() => setSelectedCQRSComponent('queryhandler')} style={{ cursor: 'pointer' }}>
                    <rect
                      x="450" y="490" width="260" height="120" rx="8"
                      fill="url(#queryGrad)"
                      stroke={selectedCQRSComponent === 'queryhandler' ? '#34d399' : '#34d399'}
                      strokeWidth={selectedCQRSComponent === 'queryhandler' ? '4' : '2'}
                      style={{ opacity: selectedCQRSComponent === 'queryhandler' ? 1 : 0.9 }}
                      className="hover:opacity-100 transition-all"
                    />
                    <text x="580" y="520" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>🔍 Query Handler</text>
                    <text x="580" y="540" fontSize="11" fill="#d1fae5" textAnchor="middle" style={{ pointerEvents: 'none' }}>GetTransactions</text>
                    <text x="580" y="555" fontSize="11" fill="#d1fae5" textAnchor="middle" style={{ pointerEvents: 'none' }}>GetAccountBalance</text>
                    <text x="580" y="570" fontSize="11" fill="#d1fae5" textAnchor="middle" style={{ pointerEvents: 'none' }}>GetRewardsStats</text>
                    <text x="580" y="585" fontSize="11" fill="#d1fae5" textAnchor="middle" style={{ pointerEvents: 'none' }}>SearchTransactions</text>
                  </g>

                  {/* Read Database - CLICKABLE */}
                  <g onClick={() => setSelectedCQRSComponent('readdb')} style={{ cursor: 'pointer' }}>
                    <rect
                      x="450" y="640" width="260" height="110" rx="8"
                      fill="url(#dbGrad)"
                      stroke={selectedCQRSComponent === 'readdb' ? '#a78bfa' : '#a78bfa'}
                      strokeWidth={selectedCQRSComponent === 'readdb' ? '4' : '2'}
                      style={{ opacity: selectedCQRSComponent === 'readdb' ? 1 : 0.9 }}
                      className="hover:opacity-100 transition-all"
                    />
                    <text x="580" y="670" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>📊 Read DB</text>
                    <text x="580" y="690" fontSize="11" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>MongoDB (Documents)</text>
                    <text x="580" y="705" fontSize="11" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>Elasticsearch (Search)</text>
                    <text x="580" y="720" fontSize="11" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>Redis (Cache)</text>
                    <text x="580" y="735" fontSize="11" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>(Denormalized)</text>
                  </g>

                  {/* Arrow: API Gateway to Query Handler */}
                  <path d="M 360 450 L 420 520 L 450 550" stroke="#10b981" strokeWidth="3" fill="none" markerEnd="url(#arrowGreen)" />
                  <text x="380" y="485" fontSize="10" fill="#10b981" fontWeight="bold">GET</text>
                  <text x="380" y="500" fontSize="10" fill="#10b981">Queries</text>

                  {/* Arrow: Query Handler to Read DB */}
                  <path d="M 580 610 L 580 640" stroke="#8b5cf6" strokeWidth="3" fill="none" markerEnd="url(#arrowPurple)" />
                  <text x="600" y="630" fontSize="10" fill="#8b5cf6" fontWeight="bold">Read</text>

                  {/* EVENT BUS - CLICKABLE */}
                  <g onClick={() => setSelectedCQRSComponent('eventbus')} style={{ cursor: 'pointer' }}>
                    <rect
                      x="800" y="300" width="180" height="200" rx="8"
                      fill="url(#eventGrad)"
                      stroke={selectedCQRSComponent === 'eventbus' ? '#fbbf24' : '#fbbf24'}
                      strokeWidth={selectedCQRSComponent === 'eventbus' ? '5' : '3'}
                      style={{ opacity: selectedCQRSComponent === 'eventbus' ? 1 : 0.9 }}
                      className="hover:opacity-100 transition-all"
                    />
                    <text x="890" y="330" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>📡 Event Bus</text>
                    <text x="890" y="350" fontSize="12" fill="#fff" textAnchor="middle" style={{ pointerEvents: 'none' }}>Apache Kafka</text>
                    <text x="890" y="380" fontSize="10" fill="#fef3c7" textAnchor="middle" style={{ pointerEvents: 'none' }}>Topics:</text>
                    <text x="890" y="395" fontSize="10" fill="#fef3c7" textAnchor="middle" style={{ pointerEvents: 'none' }}>• PaymentProcessed</text>
                    <text x="890" y="410" fontSize="10" fill="#fef3c7" textAnchor="middle" style={{ pointerEvents: 'none' }}>• TransactionCreated</text>
                    <text x="890" y="425" fontSize="10" fill="#fef3c7" textAnchor="middle" style={{ pointerEvents: 'none' }}>• BalanceUpdated</text>
                    <text x="890" y="440" fontSize="10" fill="#fef3c7" textAnchor="middle" style={{ pointerEvents: 'none' }}>• RewardsApplied</text>
                    <text x="890" y="455" fontSize="10" fill="#fef3c7" textAnchor="middle" style={{ pointerEvents: 'none' }}>• FraudDetected</text>
                    <text x="890" y="480" fontSize="9" fill="#fde68a" textAnchor="middle" fontStyle="italic" style={{ pointerEvents: 'none' }}>Event Sourcing</text>
                  </g>

                  {/* Arrow: Command Handler to Event Bus */}
                  <path d="M 710 180 L 800 350" stroke="#f59e0b" strokeWidth="3" fill="none" markerEnd="url(#arrowOrange)" />
                  <text x="730" y="250" fontSize="10" fill="#f59e0b" fontWeight="bold">Publish</text>
                  <text x="730" y="265" fontSize="10" fill="#f59e0b">Events</text>

                  {/* Arrow: Event Bus to Query Handler */}
                  <path d="M 800 450 L 710 550" stroke="#f59e0b" strokeWidth="3" fill="none" markerEnd="url(#arrowOrange)" />
                  <text x="730" y="490" fontSize="10" fill="#f59e0b" fontWeight="bold">Subscribe</text>
                  <text x="730" y="505" fontSize="10" fill="#f59e0b">& Update</text>

                  {/* Event Store - CLICKABLE */}
                  <g onClick={() => setSelectedCQRSComponent('eventstore')} style={{ cursor: 'pointer' }}>
                    <rect
                      x="1020" y="350" width="160" height="100" rx="8"
                      fill="url(#dbGrad)"
                      stroke={selectedCQRSComponent === 'eventstore' ? '#a78bfa' : '#a78bfa'}
                      strokeWidth={selectedCQRSComponent === 'eventstore' ? '4' : '2'}
                      style={{ opacity: selectedCQRSComponent === 'eventstore' ? 1 : 0.9 }}
                      className="hover:opacity-100 transition-all"
                    />
                    <text x="1100" y="380" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle" style={{ pointerEvents: 'none' }}>📝 Event Store</text>
                    <text x="1100" y="400" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>PostgreSQL</text>
                    <text x="1100" y="415" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>Immutable Log</text>
                    <text x="1100" y="430" fontSize="10" fill="#ddd" textAnchor="middle" style={{ pointerEvents: 'none' }}>Event Replay</text>
                  </g>

                  {/* Arrow: Event Bus to Event Store */}
                  <path d="M 980 400 L 1020 400" stroke="#8b5cf6" strokeWidth="3" fill="none" markerEnd="url(#arrowPurple)" />
                  <text x="1000" y="395" fontSize="10" fill="#8b5cf6" fontWeight="bold">Store</text>

                  {/* Projections/Denormalizer - CLICKABLE */}
                  <g onClick={() => setSelectedCQRSComponent('projections')} style={{ cursor: 'pointer' }}>
                    <rect
                      x="780" y="560" width="220" height="90" rx="8"
                      fill="rgba(16, 185, 129, 0.3)"
                      stroke={selectedCQRSComponent === 'projections' ? '#10b981' : '#10b981'}
                      strokeWidth={selectedCQRSComponent === 'projections' ? '4' : '2'}
                      style={{ opacity: selectedCQRSComponent === 'projections' ? 1 : 0.9 }}
                      className="hover:opacity-100 transition-all"
                    />
                    <text x="890" y="590" fontSize="12" fontWeight="bold" fill="#10b981" textAnchor="middle" style={{ pointerEvents: 'none' }}>🔄 Projections</text>
                    <text x="890" y="610" fontSize="10" fill="#d1fae5" textAnchor="middle" style={{ pointerEvents: 'none' }}>Event Handlers</text>
                    <text x="890" y="625" fontSize="10" fill="#d1fae5" textAnchor="middle" style={{ pointerEvents: 'none' }}>Denormalize Data</text>
                    <text x="890" y="640" fontSize="10" fill="#d1fae5" textAnchor="middle" style={{ pointerEvents: 'none' }}>Update Read Models</text>
                  </g>

                  {/* Arrow: Event Bus to Projections */}
                  <path d="M 890 500 L 890 560" stroke="#10b981" strokeWidth="3" fill="none" markerEnd="url(#arrowGreen)" />

                  {/* Arrow: Projections to Read DB */}
                  <path d="M 780 630 L 710 690" stroke="#10b981" strokeWidth="3" fill="none" markerEnd="url(#arrowGreen)" />
                  <text x="730" y="660" fontSize="10" fill="#10b981" fontWeight="bold">Update</text>

                  {/* ML Fraud Detection - CLICKABLE */}
                  <g onClick={() => setSelectedCQRSComponent('mlfraud')} style={{ cursor: 'pointer' }}>
                    <rect
                      x="800" y="80" width="180" height="80" rx="8"
                      fill="rgba(6, 182, 212, 0.3)"
                      stroke={selectedCQRSComponent === 'mlfraud' ? '#06b6d4' : '#06b6d4'}
                      strokeWidth={selectedCQRSComponent === 'mlfraud' ? '4' : '2'}
                      style={{ opacity: selectedCQRSComponent === 'mlfraud' ? 1 : 0.9 }}
                      className="hover:opacity-100 transition-all"
                    />
                    <text x="890" y="110" fontSize="12" fontWeight="bold" fill="#06b6d4" textAnchor="middle" style={{ pointerEvents: 'none' }}>🤖 ML Fraud</text>
                    <text x="890" y="130" fontSize="10" fill="#cffafe" textAnchor="middle" style={{ pointerEvents: 'none' }}>Detection Service</text>
                    <text x="890" y="145" fontSize="10" fill="#cffafe" textAnchor="middle" style={{ pointerEvents: 'none' }}>Real-time Scoring</text>
                  </g>

                  {/* Arrow: Event Bus to ML Service */}
                  <path d="M 890 300 L 890 160" stroke="#06b6d4" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue)" strokeDasharray="5,5" />

                  {/* Analytics - CLICKABLE */}
                  <g onClick={() => setSelectedCQRSComponent('analytics')} style={{ cursor: 'pointer' }}>
                    <rect
                      x="1020" y="560" width="160" height="80" rx="8"
                      fill="rgba(236, 72, 153, 0.3)"
                      stroke={selectedCQRSComponent === 'analytics' ? '#ec4899' : '#ec4899'}
                      strokeWidth={selectedCQRSComponent === 'analytics' ? '4' : '2'}
                      style={{ opacity: selectedCQRSComponent === 'analytics' ? 1 : 0.9 }}
                      className="hover:opacity-100 transition-all"
                    />
                    <text x="1100" y="590" fontSize="12" fontWeight="bold" fill="#ec4899" textAnchor="middle" style={{ pointerEvents: 'none' }}>📊 Analytics</text>
                    <text x="1100" y="610" fontSize="10" fill="#fce7f3" textAnchor="middle" style={{ pointerEvents: 'none' }}>InfluxDB</text>
                    <text x="1100" y="625" fontSize="10" fill="#fce7f3" textAnchor="middle" style={{ pointerEvents: 'none' }}>Real-time Metrics</text>
                  </g>

                  {/* Arrow: Event Bus to Analytics */}
                  <path d="M 980 480 L 1020 590" stroke="#ec4899" strokeWidth="2" fill="none" markerEnd="url(#arrowRed)" strokeDasharray="5,5" />

                  {/* Labels */}
                  <text x="600" y="30" fontSize="18" fontWeight="bold" fill="#fbbf24" textAnchor="middle">⚡ EVENTUAL CONSISTENCY</text>
                  <text x="600" y="50" fontSize="12" fill="#a3a3a3" textAnchor="middle">Commands are processed immediately, queries reflect eventual state</text>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-lg p-4 border border-red-500/30">
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                    <ArrowUpRight className="w-5 h-5 text-red-400" />
                    Command Side Benefits
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Optimized for writes with ACID transactions</li>
                    <li>• Business logic validation in one place</li>
                    <li>• Event sourcing for complete audit trail</li>
                    <li>• Easy to scale write operations independently</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30">
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                    <ArrowDownLeft className="w-5 h-5 text-green-400" />
                    Query Side Benefits
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Optimized for reads with denormalized data</li>
                    <li>• Multiple read models for different use cases</li>
                    <li>• Redis caching for ultra-fast queries (&lt;1ms)</li>
                    <li>• Elasticsearch for complex searches</li>
                  </ul>
                </div>
              </div>

              {/* Example Flow */}
              <div className="bg-purple-900/30 rounded-lg p-6 border border-purple-500/20">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  Example: Credit Card Payment Flow
                </h4>
                <div className="space-y-3 text-gray-300 text-sm font-mono">
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 font-bold">1. COMMAND:</span>
                    <span>User submits payment of $1,299.99 → API Gateway → Command Handler validates → Write to PostgreSQL → Publish "PaymentProcessed" event to Kafka</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-orange-400 font-bold">2. EVENT:</span>
                    <span>Kafka event triggers: (a) Event Store saves immutable log, (b) ML Fraud Detection analyzes transaction, (c) Projections update read models</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">3. PROJECTION:</span>
                    <span>Projection handlers denormalize data → Update MongoDB (transaction history), Elasticsearch (searchable), Redis cache (fast access)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">4. QUERY:</span>
                    <span>User refreshes dashboard → API Gateway → Query Handler → Read from Redis cache (1ms) → Returns updated balance and transaction</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold">5. ANALYTICS:</span>
                    <span>InfluxDB receives metrics → Real-time dashboard shows spending trends → Fraud score displayed (98% safe)</span>
                  </div>
                </div>
              </div>

              {/* Technology Stack */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <h5 className="text-white font-bold mb-2">Command Side</h5>
                  <div className="space-y-1 text-gray-300 text-sm">
                    <div>• Spring Boot Microservices</div>
                    <div>• PostgreSQL (Write DB)</div>
                    <div>• Spring Data JPA</div>
                    <div>• Hibernate Validation</div>
                  </div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <h5 className="text-white font-bold mb-2">Event Bus</h5>
                  <div className="space-y-1 text-gray-300 text-sm">
                    <div>• Apache Kafka</div>
                    <div>• Schema Registry (Avro)</div>
                    <div>• Kafka Streams</div>
                    <div>• Event Sourcing</div>
                  </div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <h5 className="text-white font-bold mb-2">Query Side</h5>
                  <div className="space-y-1 text-gray-300 text-sm">
                    <div>• MongoDB (Documents)</div>
                    <div>• Elasticsearch (Search)</div>
                    <div>• Redis (Cache)</div>
                    <div>• InfluxDB (Metrics)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

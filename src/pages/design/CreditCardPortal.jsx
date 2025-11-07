import React, { useState } from 'react';
import {
  ChevronDown, ChevronRight, Database, Cloud, Lock, AlertCircle, Check, Users,
  CreditCard, TrendingUp, Zap, Eye, EyeOff, Download, Bell, Settings,
  ArrowUpRight, ArrowDownLeft, Calendar, DollarSign, Shield, Star,
  Filter, Search, MoreHorizontal, RefreshCw, PlusCircle
} from 'lucide-react';

export default function CreditCardPortal({ onBack }) {
  const [activeTab, setActiveTab] = useState('portal');
  const [expandedLayers, setExpandedLayers] = useState({});
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showBalance, setShowBalance] = useState(true);
  const [selectedCard, setSelectedCard] = useState(0);
  const [transactionFilter, setTransactionFilter] = useState('all');

  const toggleLayer = (layer) => {
    setExpandedLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  // Mock credit card data
  const creditCards = [
    {
      id: 1,
      name: 'Platinum Rewards',
      number: '•••• •••• •••• 1234',
      fullNumber: '4532 1234 5678 1234',
      type: 'Visa',
      balance: 2847.50,
      limit: 15000,
      availableCredit: 12152.50,
      dueDate: '2024-11-15',
      minPayment: 85.00,
      rewards: 12450,
      color: 'from-purple-600 to-purple-800',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Cashback Plus',
      number: '•••• •••• •••• 5678',
      fullNumber: '5432 9876 5432 5678',
      type: 'Mastercard',
      balance: 1205.75,
      limit: 8000,
      availableCredit: 6794.25,
      dueDate: '2024-11-20',
      minPayment: 45.00,
      rewards: 8750,
      color: 'from-blue-600 to-blue-800',
      status: 'Active'
    }
  ];

  // Mock transaction data
  const transactions = [
    {
      id: 1,
      date: '2024-10-16',
      merchant: 'Amazon.com',
      category: 'Shopping',
      amount: -89.99,
      status: 'Posted',
      icon: '🛒',
      cardId: 1
    },
    {
      id: 2,
      date: '2024-10-15',
      merchant: 'Starbucks',
      category: 'Dining',
      amount: -12.45,
      status: 'Posted',
      icon: '☕',
      cardId: 1
    },
    {
      id: 3,
      date: '2024-10-14',
      merchant: 'Payment - Thank You',
      category: 'Payment',
      amount: 500.00,
      status: 'Posted',
      icon: '💳',
      cardId: 1
    },
    {
      id: 4,
      date: '2024-10-13',
      merchant: 'Gas Station',
      category: 'Gas',
      amount: -45.20,
      status: 'Posted',
      icon: '⛽',
      cardId: 2
    },
    {
      id: 5,
      date: '2024-10-12',
      merchant: 'Netflix',
      category: 'Entertainment',
      amount: -15.99,
      status: 'Posted',
      icon: '🎬',
      cardId: 2
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

  const layers = [
    {
      id: 'client',
      name: 'Client Layer',
      color: 'from-blue-500 to-blue-600',
      components: ['Web App', 'Mobile App', '3rd Party APIs'],
      icon: Cloud
    },
    {
      id: 'gateway',
      name: 'API Gateway Layer',
      color: 'from-purple-500 to-purple-600',
      components: ['Load Balancer', 'WAF', 'API Gateway', 'Rate Limiter', 'Auth Service'],
      icon: Lock
    },
    {
      id: 'core',
      name: 'Core Services',
      color: 'from-green-500 to-green-600',
      components: ['Card Application Service', 'Account Service', 'Payment Processing Service', 'Fraud Detection Service'],
      icon: CreditCard
    },
    {
      id: 'transaction',
      name: 'Transaction Services',
      color: 'from-orange-500 to-orange-600',
      components: ['Transaction Processor', 'History Manager', 'Event Store (Immutable Log)'],
      icon: Zap
    },
    {
      id: 'analytics',
      name: 'Analytics Services',
      color: 'from-pink-500 to-pink-600',
      components: ['Data Pipeline (ETL)', 'Aggregator', 'Report Generator'],
      icon: TrendingUp
    },
    {
      id: 'eventbus',
      name: 'Event Bus & Messaging',
      color: 'from-amber-500 to-amber-600',
      components: ['Apache Kafka', 'Topics: ApplicationCreated', 'TransactionPosted', 'PaymentProcessed', 'FraudAlert'],
      icon: Zap
    },
    {
      id: 'data',
      name: 'Data Layer',
      color: 'from-indigo-500 to-indigo-600',
      components: ['MongoDB (Sharded ×5)', 'PostgreSQL (+ Replicas)', 'Redis Cluster (6 nodes)', 'InfluxDB', 'Elasticsearch', 'Snowflake'],
      icon: Database
    },
    {
      id: 'observability',
      name: 'Observability & Monitoring',
      color: 'from-purple-700 to-purple-800',
      components: ['Prometheus (Metrics)', 'ELK Stack (Logs)', 'Jaeger (Distributed Tracing)', 'PagerDuty (Alerts)'],
      icon: AlertCircle
    },
    {
      id: 'external',
      name: 'External Services',
      color: 'from-red-500 to-red-600',
      components: ['Payment Gateway (Stripe)', 'Credit Bureau API', 'Email/SMS/Push Providers'],
      icon: Cloud
    }
  ];

  const keyTalkingPoints = {
    main: [
      "CQRS Pattern: Write path (commands) → Kafka → Read path (projections). Separate databases optimized for each. Write to MongoDB/PostgreSQL, read from Elasticsearch/InfluxDB/Snowflake",
      "Event Sourcing: Every state change is immutable event. Event Store captures all commands executed. Can replay to rebuild state for audits/recovery",
      "Write Model: Fast writes to optimized DBs (MongoDB for throughput). Read Model: Elasticsearch for search, InfluxDB for stats, Snowflake for warehouse",
      "Eventual Consistency: Reads lag writes by 5-15 min via async event subscribers, but queries are sub-100ms. Trade eventual consistency for performance",
      "Saga Pattern: Distributed transactions without 2PC. Card App → Credit Bureau, Payment Service → Payment Gateway (with circuit breaker fallback)"
    ],
    detailed: [
      "API Gateway routes COMMANDS to write handlers, QUERIES to read handlers - separates traffic patterns",
      "Write path: Kafka publishes events to Event Store (immutable), then subscribers replicate to read stores asynchronously",
      "Read path: Cache-aside from Redis, then PostgreSQL replicas (for consistency), Elasticsearch (for search), InfluxDB (for stats)",
      "Multi-database strategy: MongoDB for transaction writes (10M users, sharded), PostgreSQL for account state (ACID), Elasticsearch for search, InfluxDB for real-time, Snowflake for warehouse",
      "Event subscribers sync write→read: Data Pipeline (Kafka → Elasticsearch/Snowflake), Aggregator (Kafka → InfluxDB), Report Generator (reads from both)"
    ]
  };

  const techStack = [
    { layer: 'API Gateway', tech: 'Kong / AWS API Gateway', why: 'Built-in rate limiting, auth, routing; reduces implementation effort' },
    { layer: 'Core Services', tech: 'Spring Boot (Java) / FastAPI (Python)', why: 'Microservices framework, easy deployment, extensive ecosystem' },
    { layer: 'Fraud Detection', tech: 'Python (scikit-learn, XGBoost, TensorFlow)', why: 'ML models for real-time anomaly detection, sub-100ms inference' },
    { layer: 'Event Bus', tech: 'Apache Kafka (3 nodes)', why: 'High throughput (30M/day), durability, replay capability, consumer groups' },
    { layer: 'Event Store', tech: 'PostgreSQL (Append-only table)', why: 'Immutable event log, ACID compliance, supports full event replay for audits' },
    { layer: 'Transaction DB', tech: 'MongoDB Sharded (5 shards)', why: 'High write throughput (6M/shard), automatic sharding, flexible schema' },
    { layer: 'Account DB', tech: 'PostgreSQL + 2 Read Replicas', why: 'ACID compliance, strong consistency for balances, replicas for query load' },
    { layer: 'Cache', tech: 'Redis Cluster (3M + 3R)', why: '<1ms latency, atomic ops for balance, pub/sub for real-time updates' },
    { layer: 'Stream Processing', tech: 'Apache Flink / Kafka Streams', why: 'Real-time ETL, handles out-of-order events, stateful processing' },
    { layer: 'Real-time Stats', tech: 'InfluxDB', why: 'Time-series optimized, rolling time-windows (daily/weekly/monthly), fast aggregations' },
    { layer: 'Historical Analytics', tech: 'Snowflake (Multi-TB)', why: 'Scales to 2+ years data, auto-scaling compute, separates from production' },
    { layer: 'Full-text Search', tech: 'Elasticsearch (3-node)', why: 'Sub-second full-text search across billions of transactions, faceted search' },
    { layer: 'Logging', tech: 'ELK Stack (Elasticsearch, Logstash, Kibana)', why: 'Centralized logging from all services, compliance audit trail, debugging' },
    { layer: 'Metrics', tech: 'Prometheus + Grafana', why: 'Time-series metrics, alerting rules, beautiful dashboards' },
    { layer: 'Distributed Tracing', tech: 'Jaeger', why: 'Trace requests across services, identify bottlenecks, latency analysis' },
    { layer: 'Alerting', tech: 'PagerDuty / Alertmanager', why: 'On-call escalation, integrations with Slack/SMS, incident management' },
    { layer: 'Report Generation', tech: 'Jupyter Notebooks / Tableau', why: 'Ad-hoc analysis by data scientists, scheduled reports, visualizations' },
    { layer: 'External Payment', tech: 'Stripe / Square API', why: 'PCI compliance, fraud protection, supports multiple card types' },
    { layer: 'External Credit Check', tech: 'Equifax / Experian API', why: 'Industry standard credit bureaus, circuit breaker fallback to manual review' }
  ];

  const featureFlows = [
    {
      name: 'Credit Card Application',
      color: 'bg-blue-100 border-l-4 border-blue-500',
      steps: [
        '1. User submits application via Web/Mobile',
        '2. API Gateway authenticates, rate-limits, routes request',
        '3. Card Application Service (Saga Orchestrator) receives',
        '4. Distributed Saga coordinates:',
        '   → Fraud Detection Service scores applicant (parallel ML)',
        '   → Credit Bureau API queried (with circuit breaker)',
        '   → Account Service creates account record',
        '5. Event Store: ApplicationCreated event written (immutable)',
        '6. ApplicationCreated published to Kafka',
        '7. Event subscribers consume:',
        '   → Notification Service sends email confirmation',
        '   → Data Pipeline enriches for analytics',
        '   → Aggregator begins tracking application metrics',
        '8. Logs sent to ELK Stack, metrics to Prometheus',
        '9. User can track status in Account Service (read replica query)'
      ],
      patterns: ['Saga Pattern', 'Event Sourcing', 'Circuit Breaker', 'Distributed Tracing']
    },
    {
      name: 'Post Transaction',
      color: 'bg-green-100 border-l-4 border-green-500',
      steps: [
        '1. Transaction arrives from payment network → API Gateway',
        '2. Transaction Processor receives',
        '3. Parallel execution:',
        '   → Fraud Detection scores transaction (ML models, <100ms)',
        '   → Transaction Processor posts to MongoDB (sharded)',
        '4. Event Store: TransactionPosted event written (audit log)',
        '5. TransactionPosted + FraudAlert events published to Kafka',
        '6. Event subscribers (fan-out pattern):',
        '   → Account Service: Updates balance (eventual consistency)',
        '   → History Manager: Appends to transaction history',
        '   → Data Pipeline: Starts stream processing (Kafka Streams)',
        '   → Aggregator: Updates real-time stats',
        '   → Elasticsearch: Indexes for full-text search',
        '   → Notification Service: Sends SMS alert if fraud detected',
        '7. Redis cache invalidated for this user\'s account',
        '8. Monitoring: Jaeger traces entire request, Prometheus records latency'
      ],
      patterns: ['Event Sourcing', 'CQRS', 'Parallel Processing', 'Stream Processing']
    },
    {
      name: 'View Card Balance & Transactions',
      color: 'bg-purple-100 border-l-4 border-purple-500',
      steps: [
        '1. User requests balance/history via mobile app',
        '2. API Gateway routes to Account Service (for balance)',
        '3. Account Service check READ path (CQRS):',
        '   → Redis cache first (cache-aside, <1ms)',
        '   → If miss: PostgreSQL read replica queried',
        '   → Result cached in Redis (TTL: 5 min)',
        '4. Transaction search via Elasticsearch:',
        '   → Full-text search on merchant name, date range, amount',
        '   → Faceted aggregations (by category, merchant, date)',
        '   → Results from indexed copy (5 min lag vs live)',
        '5. Historical stats from InfluxDB (real-time aggregates)',
        '6. Data aggregated and returned in <100ms',
        '7. Zero impact on transaction processing - separate read stores',
        '8. Request traced with Jaeger, metrics sent to Prometheus'
      ],
      patterns: ['CQRS Pattern', 'Read Replicas', 'Cache-Aside Pattern', 'Search Index']
    },
    {
      name: 'Payment Processing & View Stats',
      color: 'bg-orange-100 border-l-4 border-orange-500',
      steps: [
        '1. User initiates payment from portal',
        '2. API Gateway validates and routes',
        '3. Payment Processing Service (Idempotent):',
        '   → Generates idempotency key (prevents double-charging)',
        '   → Fraud Detection scores payment',
        '   → Calls Payment Gateway (Stripe) with circuit breaker',
        '4. On success:',
        '   → Event Store: PaymentProcessed event written',
        '   → PaymentProcessed published to Kafka',
        '   → Account Service updates balance (eventual consistency)',
        '5. Event subscribers:',
        '   → Notification Service sends confirmation',
        '   → Data Pipeline processes for analytics',
        '   → Aggregator updates payment statistics',
        '   → Report Generator queues update to Snowflake',
        '6. User views stats:',
        '   → Real-time: Query Aggregator results from InfluxDB',
        '   → Historical: Query Snowflake for trends (2+ years)',
        '   → Custom reports: Generated by Report Generator from Snowflake data',
        '7. All data logged to ELK, traced with Jaeger, monitored by Prometheus'
      ],
      patterns: ['Saga Pattern', 'Idempotency', 'Circuit Breaker', 'Event Sourcing', 'Analytics Pipeline']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all flex items-center gap-2"
          >
            ← Back to Projects
          </button>
        )}

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">💳 Credit Card Portal</h1>
          <p className="text-gray-400">Modern Credit Card Management & System Design Architecture • 10M Users • 20+ Components</p>
          <div className="flex gap-2 mt-4 flex-wrap">
            <span className="px-3 py-1 bg-pink-900/50 text-pink-300 rounded-full text-sm">User Portal</span>
            <span className="px-3 py-1 bg-green-900/50 text-green-300 rounded-full text-sm">CQRS Pattern</span>
            <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm">Event Sourcing</span>
            <span className="px-3 py-1 bg-orange-900/50 text-orange-300 rounded-full text-sm">Saga Pattern</span>
            <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm">Circuit Breaker</span>
          </div>
        </div>

        <div className="flex gap-4 mb-8 border-b border-gray-700 overflow-x-auto">
          {['portal', 'main', 'detailed', 'flows', 'techstack'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab === 'portal' && '💳 Portal'}
              {tab === 'main' && '🏗️ Architecture'}
              {tab === 'detailed' && '📊 Detailed'}
              {tab === 'flows' && '🔄 Flows'}
              {tab === 'techstack' && '🛠️ Tech Stack'}
            </button>
          ))}
        </div>

        {activeTab === 'portal' && (
          <div className="space-y-8">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6 border border-gray-600">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Welcome back, Michael</h2>
                  <p className="text-gray-300">Manage your credit cards and track your spending</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                    <Bell className="w-5 h-5 text-gray-300" />
                  </button>
                  <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                    <Settings className="w-5 h-5 text-gray-300" />
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-700/50 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <DollarSign className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Available Credit</p>
                      <p className="text-white font-bold text-lg">{formatCurrency(creditCards.reduce((sum, card) => sum + card.availableCredit, 0))}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <CreditCard className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Total Balance</p>
                      <p className="text-white font-bold text-lg">{formatCurrency(creditCards.reduce((sum, card) => sum + card.balance, 0))}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Star className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Rewards Points</p>
                      <p className="text-white font-bold text-lg">{creditCards.reduce((sum, card) => sum + card.rewards, 0).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500/20 rounded-lg">
                      <Calendar className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Next Due Date</p>
                      <p className="text-white font-bold text-lg">Nov 15</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Credit Cards Section */}
            <div className="bg-slate-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-blue-400" />
                  Your Credit Cards
                </h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  <PlusCircle className="w-4 h-4" />
                  Apply for New Card
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {creditCards.map((card, index) => (
                  <div
                    key={card.id}
                    className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${card.color} text-white cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                      selectedCard === index ? 'ring-4 ring-blue-400 ring-opacity-50' : ''
                    }`}
                    onClick={() => setSelectedCard(index)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold">{card.name}</h4>
                        <p className="text-white/80 text-sm">{card.type}</p>
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
                          <p className="text-white/70 text-xs">Due Date</p>
                          <p className="text-sm font-semibold">{new Date(card.dueDate).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/70 text-xs">Min Payment</p>
                          <p className="text-sm font-semibold">{formatCurrency(card.minPayment)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Card decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction History Section */}
            <div className="bg-slate-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                  Recent Transactions
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select
                      value={transactionFilter}
                      onChange={(e) => setTransactionFilter(e.target.value)}
                      className="bg-slate-700 text-white border border-gray-600 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Transactions</option>
                      <option value="shopping">Shopping</option>
                      <option value="dining">Dining</option>
                      <option value="gas">Gas</option>
                      <option value="entertainment">Entertainment</option>
                    </select>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-1 bg-slate-700 hover:bg-slate-600 text-gray-300 rounded-lg transition-colors">
                    <Search className="w-4 h-4" />
                    Search
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1 bg-slate-700 hover:bg-slate-600 text-gray-300 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {transactions
                  .filter(transaction =>
                    transactionFilter === 'all' ||
                    transaction.category.toLowerCase() === transactionFilter
                  )
                  .map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-gray-600 hover:bg-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center text-xl">
                          {transaction.icon}
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{transaction.merchant}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <p className="text-gray-400 text-sm">{transaction.category}</p>
                            <span className="text-gray-500">•</span>
                            <p className="text-gray-400 text-sm">{new Date(transaction.date).toLocaleDateString()}</p>
                            <span className="text-gray-500">•</span>
                            <p className="text-gray-400 text-sm">
                              {creditCards.find(card => card.id === transaction.cardId)?.name}
                            </p>
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
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {transaction.amount > 0 ? (
                            <ArrowDownLeft className="w-5 h-5 text-green-400" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mt-6 flex justify-center">
                <button className="flex items-center gap-2 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  Load More Transactions
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-400" />
                Quick Actions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all transform hover:scale-105">
                  <DollarSign className="w-6 h-6" />
                  <div className="text-left">
                    <p className="font-semibold">Make Payment</p>
                    <p className="text-blue-100 text-sm">Pay your balance</p>
                  </div>
                </button>

                <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-all transform hover:scale-105">
                  <Shield className="w-6 h-6" />
                  <div className="text-left">
                    <p className="font-semibold">Freeze Card</p>
                    <p className="text-green-100 text-sm">Temporarily disable</p>
                  </div>
                </button>

                <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg transition-all transform hover:scale-105">
                  <Star className="w-6 h-6" />
                  <div className="text-left">
                    <p className="font-semibold">Redeem Rewards</p>
                    <p className="text-purple-100 text-sm">Use your points</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'main' && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">🏗️ High-Level Architecture (Click to Expand)</h2>
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
                        <div className="bg-slate-700 mt-2 p-4 rounded-lg border-l-4 border-white ml-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {layer.components.map((comp, i) => (
                              <div key={i} className="flex items-center gap-2 text-gray-300">
                                <div className="w-2 h-2 bg-white rounded-full" />
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

            <div className="bg-slate-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="text-yellow-400" /> Key Points to Emphasize
              </h3>
              <div className="space-y-3">
                {keyTalkingPoints.main.map((point, i) => (
                  <div key={i} className="flex gap-3 bg-slate-700 p-3 rounded-lg">
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
            <div className="bg-slate-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">📊 CQRS Architecture - Detailed Design (20+ Components)</h2>
              <p className="text-gray-400 mb-6">Separated Read & Write models with Event Sourcing for audit trail</p>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-red-900 to-red-800 rounded-lg border-l-4 border-red-400">
                  <h4 className="font-bold text-red-200 mb-2">WRITE MODEL (Commands)</h4>
                  <div className="text-gray-300 text-sm grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>🔹 Clients → API Gateway (validation)</div>
                    <div>🔹 Card App Service (Saga, command handler)</div>
                    <div>🔹 Account Service (command handler)</div>
                    <div>🔹 Payment Service (command handler, idempotent)</div>
                    <div>🔹 Fraud Detection Service (parallel scoring)</div>
                    <div>🔹 Transaction Processor (command handler)</div>
                    <div>🔹 Event Store (immutable event log)</div>
                    <div>🔹 MongoDB (Sharded ×5 write optimized)</div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-bold text-blue-200 mb-2">READ MODEL (Queries)</h4>
                  <div className="text-gray-300 text-sm grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>🔹 Clients → API Gateway (read route)</div>
                    <div>🔹 Account Service (read handlers)</div>
                    <div>🔹 History Manager (read projection)</div>
                    <div>🔹 Redis Cache (cache-aside, &lt;1ms)</div>
                    <div>🔹 PostgreSQL Replicas (read-only)</div>
                    <div>🔹 Elasticsearch (full-text index)</div>
                    <div>🔹 InfluxDB (real-time stats)</div>
                    <div>🔹 Snowflake (historical warehouse)</div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-amber-900 to-amber-800 rounded-lg border-l-4 border-amber-400">
                  <h4 className="font-bold text-amber-200 mb-2">EVENT BUS & SYNCHRONIZATION</h4>
                  <div className="text-gray-300 text-sm grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>🔹 Apache Kafka Event Bus (message broker)</div>
                    <div>🔹 Topics: ApplicationCreated, TransactionPosted, PaymentProcessed, FraudAlert</div>
                    <div>🔹 Data Pipeline (Kafka Streams ETL)</div>
                    <div>🔹 Aggregator (real-time stat generator)</div>
                    <div>🔹 Report Generator (historical reporter)</div>
                    <div>🔹 Notification Service (event consumer)</div>
                    <div>🔹 Event subscribers write to READ databases</div>
                    <div>🔹 Eventual consistency: 5-15 min lag from write to read</div>
                  </div>
                </div>

                <div className="p-4 bg-slate-700 rounded-lg">
                  <h4 className="font-bold text-white mb-2">🔒 TRANSACTION FLOW (CQRS Example)</h4>
                  <div className="text-gray-300 text-sm space-y-2">
                    <div><span className="font-semibold text-red-400">[WRITE]</span> User posts transaction → Command sent to Transaction Processor</div>
                    <div><span className="font-semibold text-red-400">[WRITE]</span> Command Handler validates & posts to MongoDB (write DB)</div>
                    <div><span className="font-semibold text-red-400">[WRITE]</span> TransactionPosted event generated & stored in Event Store</div>
                    <div><span className="font-semibold text-orange-400">[EVENT]</span> Event published to Kafka immediately</div>
                    <div><span className="font-semibold text-blue-400">[ASYNC]</span> Event subscribers process (History Manager → PostgreSQL, Data Pipeline → Elasticsearch)</div>
                    <div><span className="font-semibold text-blue-400">[READ]</span> When user queries balance: Read from Redis (cache), or PostgreSQL replica (fresh read)</div>
                    <div><span className="font-semibold text-blue-400">[READ]</span> Search transactions: Query Elasticsearch (indexed, fast)</div>
                    <div><span className="font-semibold text-gray-400">⚡ Write: &lt;100ms, Read: &lt;50ms (cache) or &lt;200ms (fresh)</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">💡 Architecture Decisions</h3>
              <div className="space-y-3">
                {keyTalkingPoints.detailed.map((point, i) => (
                  <div key={i} className="flex gap-3 bg-slate-700 p-3 rounded-lg">
                    <Check className="text-green-400 flex-shrink-0 mt-1" size={20} />
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
              <div key={idx} className={`rounded-lg p-6 border-l-4 ${flow.color}`}>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">{idx + 1}. {flow.name}</h3>
                </div>
                <div className="bg-white/80 rounded-lg p-4 mb-4">
                  <div className="space-y-2 text-slate-800 text-sm font-mono">
                    {flow.steps.map((step, i) => (
                      <div key={i} className={step.startsWith('   ') ? 'ml-6 text-gray-700' : ''}>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {flow.patterns.map((pattern, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-900 text-white rounded-full text-xs font-semibold">
                      {pattern}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'techstack' && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-lg overflow-hidden border border-gray-700">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
                <h2 className="text-2xl font-bold text-white">🛠️ Technology Stack by Layer</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-700">
                      <th className="px-4 py-3 text-left text-gray-300 font-semibold">Layer</th>
                      <th className="px-4 py-3 text-left text-gray-300 font-semibold">Technology</th>
                      <th className="px-4 py-3 text-left text-gray-300 font-semibold">Why This Choice?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {techStack.map((item, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-slate-700/50' : 'bg-slate-800'}>
                        <td className="px-4 py-3 text-gray-300 font-semibold">{item.layer}</td>
                        <td className="px-4 py-3 text-blue-300">{item.tech}</td>
                        <td className="px-4 py-3 text-gray-400 text-xs">{item.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">🎯 Interview Emphasis Points</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-bold text-green-400 mb-2">Scalability</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>✓ 10M users on sharded MongoDB (6M writes/shard/day)</li>
                    <li>✓ 30M transactions/day handled by Kafka (347 txns/sec avg)</li>
                    <li>✓ Read replicas + Redis for 10M account views/day</li>
                    <li>✓ Elasticsearch indexes billions of transactions</li>
                  </ul>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-400 mb-2">High Availability</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>✓ Circuit breaker pattern for external APIs</li>
                    <li>✓ Saga pattern for distributed transactions</li>
                    <li>✓ Event sourcing for replay/recovery</li>
                    <li>✓ Kafka ensures no event loss</li>
                  </ul>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-bold text-purple-400 mb-2">Observability</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>✓ Distributed tracing (Jaeger) across all services</li>
                    <li>✓ Centralized logging (ELK Stack) for audit trails</li>
                    <li>✓ Metrics & alerting (Prometheus + PagerDuty)</li>
                    <li>✓ Identifies bottlenecks automatically</li>
                  </ul>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-bold text-pink-400 mb-2">Performance</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>✓ CQRS separates read/write (no contention)</li>
                    <li>✓ Cache-aside pattern (50-150ms saved per query)</li>
                    <li>✓ API responses in &lt;100ms</li>
                    <li>✓ Fraud detection in parallel (&lt;100ms ML inference)</li>
                  </ul>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-bold text-orange-400 mb-2">Security & Compliance</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>✓ Event sourcing = immutable audit trail</li>
                    <li>✓ API Gateway enforces auth + rate limits</li>
                    <li>✓ Encryption at rest & in transit</li>
                    <li>✓ PCI compliance via tokenization</li>
                  </ul>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h4 className="font-bold text-cyan-400 mb-2">Analytics & Insights</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>✓ Real-time stats via InfluxDB aggregates</li>
                    <li>✓ Historical trends in Snowflake (2+ years)</li>
                    <li>✓ ML fraud detection with scikit-learn/XGBoost</li>
                    <li>✓ Custom reports via Jupyter/Tableau</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

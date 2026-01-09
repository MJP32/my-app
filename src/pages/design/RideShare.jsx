import React, { useState } from 'react';
import {
  ChevronDown, ChevronRight, MapPin, Users, Zap, Shield, Activity,
  AlertCircle, Check, Server, Database, Globe, Cloud, Network, Radio,
  Clock, TrendingUp, Layers, GitBranch, Box, FileText, Navigation
} from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';

export default function RideShare({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('architecture');
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Fault Tolerance Components
  const faultToleranceComponents = [
    {
      id: 'load-balancing',
      name: 'Load Balancing & Auto-Scaling',
      icon: Network,
      color: 'from-blue-500 to-blue-600',
      components: [
        'AWS Application Load Balancer (ALB)',
        'NGINX Layer 7 Load Balancer',
        'Auto Scaling Groups (Min: 5, Max: 50 instances)',
        'Health Check Endpoints (/health, /ready)',
        'Connection Draining (30s timeout)'
      ],
      faultTolerance: [
        'Multi-AZ deployment across 3 availability zones',
        'Auto-scaling based on CPU (>70%) and request count (>1000/min)',
        'Unhealthy instance replacement within 2 minutes',
        'Zero-downtime deployments with blue-green strategy',
        'Sticky sessions disabled for stateless architecture'
      ],
      metrics: 'Target: 99.95% uptime, Handles 50K concurrent connections'
    },
    {
      id: 'service-mesh',
      name: 'Service Mesh & Circuit Breakers',
      icon: GitBranch,
      color: 'from-purple-500 to-purple-600',
      components: [
        'Istio Service Mesh',
        'Envoy Sidecar Proxies',
        'Circuit Breaker (Hystrix/Resilience4j)',
        'Retry Logic with Exponential Backoff',
        'Bulkhead Pattern for Resource Isolation'
      ],
      faultTolerance: [
        'Circuit Breaker: Open after 5 consecutive failures',
        'Half-Open state: Test with 3 requests after 30s',
        'Timeout: 5s for driver matching, 3s for payment',
        'Retry: 3 attempts with exponential backoff (100ms, 200ms, 400ms)',
        'Fallback: Degraded mode - manual driver assignment'
      ],
      metrics: 'Prevents cascade failures, Reduces latency from 2s to 500ms'
    },
    {
      id: 'database-replication',
      name: 'Database Replication & Sharding',
      icon: Database,
      color: 'from-green-500 to-green-600',
      components: [
        'PostgreSQL Primary-Replica Setup (1 Primary + 3 Replicas)',
        'MongoDB Sharded Cluster (5 shards, 3 replicas each)',
        'Redis Sentinel (3 masters + 3 replicas)',
        'Cassandra Ring (9 nodes, RF=3)',
        'Automatic Failover with Patroni'
      ],
      faultTolerance: [
        'PostgreSQL: Automatic failover to replica in <30s',
        'MongoDB: Writes continue if 2/3 replicas available',
        'Redis Sentinel: Promotes replica to master automatically',
        'Cassandra: No single point of failure, quorum reads/writes',
        'Cross-region replication for disaster recovery'
      ],
      metrics: 'RPO: 1 minute, RTO: 30 seconds, 99.99% data durability'
    },
    {
      id: 'caching',
      name: 'Multi-Layer Caching Strategy',
      icon: Zap,
      color: 'from-orange-500 to-orange-600',
      components: [
        'CDN Cache (CloudFront) - Static Assets',
        'Redis Cache (L1) - Hot Data',
        'Application Cache (L2) - Caffeine',
        'Database Query Cache (L3)',
        'Cache Invalidation via Pub/Sub'
      ],
      faultTolerance: [
        'CDN: 200+ edge locations, automatic failover',
        'Redis: Sentinel for HA, async replication',
        'Cache-aside pattern: Application continues if cache fails',
        'Write-through for critical data (user profiles)',
        'TTL-based expiration + event-driven invalidation'
      ],
      metrics: 'Cache hit rate: 95%, Latency reduction: 10x faster'
    },
    {
      id: 'message-queue',
      name: 'Message Queue & Event Streaming',
      icon: Radio,
      color: 'from-pink-500 to-pink-600',
      components: [
        'Apache Kafka (9 brokers, 3-node ZooKeeper)',
        'RabbitMQ for transactional messages',
        'Amazon SQS for dead letter queues',
        'Amazon SNS for fan-out notifications',
        'Kafka Streams for real-time processing'
      ],
      faultTolerance: [
        'Kafka: Replication factor 3, min in-sync replicas 2',
        'Consumer groups: Multiple consumers for parallelism',
        'Dead Letter Queue: Retry failed messages 3 times',
        'At-least-once delivery guarantee',
        'Idempotent producers and consumers'
      ],
      metrics: 'Throughput: 100K messages/sec, Lag: <100ms'
    },
    {
      id: 'geospatial',
      name: 'Geospatial Services & Routing',
      icon: MapPin,
      color: 'from-cyan-500 to-cyan-600',
      components: [
        'Redis Geospatial Index (GEORADIUS)',
        'Google S2 Geometry Library',
        'H3 Hexagonal Hierarchical Geospatial Indexing',
        'PostGIS for polygon searches',
        'GraphHopper for route optimization'
      ],
      faultTolerance: [
        'Distributed geospatial index across 5 Redis shards',
        'Fallback to PostGIS if Redis fails',
        'Pre-computed routes cached for 1 hour',
        'Real-time traffic data from multiple sources',
        'Graceful degradation: Use straight-line distance if routing fails'
      ],
      metrics: 'Match radius: 5km, Match time: <500ms, 99.9% accuracy'
    },
    {
      id: 'monitoring',
      name: 'Monitoring & Observability',
      icon: Activity,
      color: 'from-red-500 to-red-600',
      components: [
        'Prometheus + Grafana for metrics',
        'ELK Stack for centralized logging',
        'Jaeger for distributed tracing',
        'PagerDuty for alerting',
        'AWS CloudWatch for infrastructure metrics'
      ],
      faultTolerance: [
        'Multi-region Prometheus with federation',
        'Log retention: 30 days hot, 1 year cold (S3)',
        'Trace sampling: 10% in production, 100% in staging',
        'Alerts: Latency >1s, Error rate >1%, Downtime >1min',
        'Self-healing: Auto-restart failed containers'
      ],
      metrics: 'MTTD: <1 minute, MTTR: <5 minutes'
    }
  ];

  // Real-time Matching Algorithm
  const matchingAlgorithm = {
    title: 'Real-Time Driver-Rider Matching',
    steps: [
      {
        step: '1. Rider Request',
        description: 'Rider submits pickup location and destination',
        latency: '<100ms',
        details: 'POST /api/rides with lat/lng coordinates',
        faultTolerance: 'Retry 3 times if request fails, fallback to phone booking'
      },
      {
        step: '2. Geospatial Query',
        description: 'Find available drivers within 5km radius',
        latency: '<200ms',
        details: 'Redis GEORADIUS query: GEORADIUS drivers:available {lat} {lng} 5 km WITHDIST',
        faultTolerance: 'If Redis fails, query PostGIS (slower but reliable)'
      },
      {
        step: '3. Driver Scoring',
        description: 'Score drivers based on distance, rating, ETA',
        latency: '<100ms',
        details: 'Score = (1/distance) * 0.5 + rating * 0.3 + (1/ETA) * 0.2',
        faultTolerance: 'Parallel scoring across multiple threads'
      },
      {
        step: '4. Match Assignment',
        description: 'Assign highest-scoring driver, send push notification',
        latency: '<200ms',
        details: 'Optimistic locking with version check to prevent double-booking',
        faultTolerance: 'If driver rejects, reassign to next best in <5s'
      },
      {
        step: '5. Real-Time Updates',
        description: 'WebSocket connection for live driver location',
        latency: '<1s updates',
        details: 'Driver location streamed via WebSocket, buffered to reduce bandwidth',
        faultTolerance: 'Fallback to HTTP long-polling if WebSocket fails'
      }
    ]
  };

  // System Scale
  const systemScale = {
    title: 'System Scale & Capacity',
    metrics: [
      {
        metric: 'Daily Active Users',
        value: '10 Million',
        calculation: '5M riders + 5M drivers',
        infrastructure: '50 application servers, 10 PostgreSQL replicas'
      },
      {
        metric: 'Concurrent Rides',
        value: '500,000',
        calculation: 'Peak: 10M users * 10% utilization * 50% peak multiplier',
        infrastructure: 'Redis: 100K ops/sec, Kafka: 50K messages/sec'
      },
      {
        metric: 'Requests per Second',
        value: '200,000 RPS',
        calculation: 'Location updates (100K RPS) + API calls (100K RPS)',
        infrastructure: 'Load balancers: 5 instances, Auto-scaling: 20-50 app servers'
      },
      {
        metric: 'Database Writes',
        value: '50,000 writes/sec',
        calculation: 'Ride updates + driver locations + payments',
        infrastructure: 'MongoDB sharded: 10K writes/shard/sec across 5 shards'
      },
      {
        metric: 'Data Storage',
        value: '50 TB',
        calculation: 'Rides: 20TB, Locations: 15TB, Payments: 10TB, Logs: 5TB',
        infrastructure: 'S3 for cold storage, EBS for hot data'
      }
    ]
  };

  // Disaster Recovery
  const disasterRecovery = {
    title: 'Disaster Recovery & Business Continuity',
    strategies: [
      {
        scenario: 'Single Server Failure',
        impact: 'Minimal - Load redistributed',
        recovery: 'Auto-scaling launches replacement in 2-3 minutes',
        rto: '<5 minutes',
        rpo: '0 (no data loss)'
      },
      {
        scenario: 'Database Primary Failure',
        impact: 'Read-only mode for 30 seconds',
        recovery: 'Patroni promotes replica to primary automatically',
        rto: '<30 seconds',
        rpo: '<1 minute'
      },
      {
        scenario: 'Availability Zone Outage',
        impact: '33% capacity reduction',
        recovery: 'Traffic rerouted to healthy AZs, auto-scaling compensates',
        rto: '<2 minutes',
        rpo: '<5 minutes'
      },
      {
        scenario: 'Region Outage',
        impact: 'Service degraded to backup region',
        recovery: 'DNS failover to secondary region (us-west-2)',
        rto: '<15 minutes',
        rpo: '<10 minutes'
      },
      {
        scenario: 'Complete System Compromise',
        impact: 'Full outage',
        recovery: 'Restore from daily backups, rebuild infrastructure from IaC',
        rto: '<4 hours',
        rpo: '<24 hours'
      }
    ]
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)' }}>
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {onBack && (
            <button
              onClick={onBack}
              className="mb-8 px-5 py-2.5 bg-gray-800 border-2 border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-medium rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              ← Back to Projects
            </button>
          )}

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Fault-Tolerant Ride Share</h1>
              <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-lg text-xs font-bold uppercase tracking-wide">High Availability</span>
            </div>
            <p className="text-xl text-gray-300 mb-6 font-light">
              Production-grade ride sharing platform · 10M users · 500K concurrent rides · 99.99% uptime
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-4 py-2 bg-blue-900/30 text-blue-400 rounded-lg text-sm font-medium border border-blue-700">Multi-AZ Deployment</span>
              <span className="px-4 py-2 bg-green-900/30 text-green-400 rounded-lg text-sm font-medium border border-green-700">Auto-Scaling</span>
              <span className="px-4 py-2 bg-purple-900/30 text-purple-400 rounded-lg text-sm font-medium border border-purple-700">Circuit Breakers</span>
              <span className="px-4 py-2 bg-orange-900/30 text-orange-400 rounded-lg text-sm font-medium border border-orange-700">Real-Time Matching</span>
              <span className="px-4 py-2 bg-pink-900/30 text-pink-400 rounded-lg text-sm font-medium border border-pink-700">Geospatial Indexing</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b-2 border-gray-700 overflow-x-auto pb-0" style={{ backgroundColor: '#1f2937' }}>
            {['architecture', 'diagram', 'matching', 'scale', 'recovery'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                  activeTab === tab
                    ? 'text-blue-400 bg-blue-900/30 border-b-2 border-blue-400 -mb-0.5'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                }`}
              >
                {tab === 'architecture' && 'Fault Tolerance'}
                {tab === 'diagram' && 'Component Diagram'}
                {tab === 'matching' && 'Real-Time Matching'}
                {tab === 'scale' && 'Scale & Capacity'}
                {tab === 'recovery' && 'Disaster Recovery'}
              </button>
            ))}
          </div>

          {/* Component Diagram Tab */}
          {activeTab === 'diagram' && (
            <div className="space-y-8">
              {/* Legend */}
              <div className="bg-gradient-to-br from-gray-900/30 to-gray-800/30 rounded-2xl p-6 border-2 border-gray-700 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Layers className="w-7 h-7 text-gray-300" />
                  Component Architecture Legend
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 bg-blue-900/30 p-3 rounded-lg border-2 border-blue-700">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="font-semibold text-blue-400">Client Layer</span>
                  </div>
                  <div className="flex items-center gap-3 bg-purple-900/30 p-3 rounded-lg border-2 border-purple-700">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <span className="font-semibold text-purple-400">Gateway</span>
                  </div>
                  <div className="flex items-center gap-3 bg-indigo-900/30 p-3 rounded-lg border-2 border-indigo-700">
                    <div className="w-4 h-4 bg-indigo-500 rounded"></div>
                    <span className="font-semibold text-indigo-400">Service Mesh</span>
                  </div>
                  <div className="flex items-center gap-3 bg-green-900/30 p-3 rounded-lg border-2 border-green-700">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="font-semibold text-green-400">Application Services</span>
                  </div>
                  <div className="flex items-center gap-3 bg-cyan-900/30 p-3 rounded-lg border-2 border-cyan-700">
                    <div className="w-4 h-4 bg-cyan-500 rounded"></div>
                    <span className="font-semibold text-cyan-400">Geospatial</span>
                  </div>
                  <div className="flex items-center gap-3 bg-pink-900/30 p-3 rounded-lg border-2 border-pink-700">
                    <div className="w-4 h-4 bg-pink-500 rounded"></div>
                    <span className="font-semibold text-pink-400">Message Bus</span>
                  </div>
                  <div className="flex items-center gap-3 bg-yellow-900/30 p-3 rounded-lg border-2 border-yellow-700">
                    <div className="w-4 h-4 bg-yellow-600 rounded"></div>
                    <span className="font-semibold text-yellow-400">Data Stores</span>
                  </div>
                  <div className="flex items-center gap-3 bg-orange-900/30 p-3 rounded-lg border-2 border-orange-700">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span className="font-semibold text-orange-400">External Services</span>
                  </div>
                  <div className="flex items-center gap-3 bg-red-900/30 p-3 rounded-lg border-2 border-red-700">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="font-semibold text-red-400">Observability</span>
                  </div>
                </div>
              </div>

              {/* Main Component Diagram */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border-2 border-slate-600 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <Box className="w-8 h-8 text-blue-400" />
                  System Component Architecture
                </h2>

                {/* Layer 1: Client Layer */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Layer 1: Client Applications
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-500 p-4 rounded-xl shadow-lg border-2 border-blue-300">
                      <div className="text-white font-bold text-lg mb-1">Rider Mobile App</div>
                      <div className="text-blue-100 text-sm">iOS/Android • React Native</div>
                    </div>
                    <div className="bg-blue-500 p-4 rounded-xl shadow-lg border-2 border-blue-300">
                      <div className="text-white font-bold text-lg mb-1">Driver Mobile App</div>
                      <div className="text-blue-100 text-sm">iOS/Android • Real-time GPS</div>
                    </div>
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center my-4">
                  <div className="text-white text-2xl">↓</div>
                </div>

                {/* Layer 2: Gateway Layer */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Layer 2: API Gateway & Load Balancing
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-purple-500 p-4 rounded-xl shadow-lg border-2 border-purple-300">
                      <div className="text-white font-bold text-lg mb-1">AWS ALB</div>
                      <div className="text-purple-100 text-sm">Multi-AZ • Auto-scaling</div>
                    </div>
                    <div className="bg-purple-500 p-4 rounded-xl shadow-lg border-2 border-purple-300">
                      <div className="text-white font-bold text-lg mb-1">API Gateway</div>
                      <div className="text-purple-100 text-sm">Rate Limiting • Auth • TLS</div>
                    </div>
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center my-4">
                  <div className="text-white text-2xl">↓</div>
                </div>

                {/* Layer 3: Service Mesh */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-indigo-300 mb-4 flex items-center gap-2">
                    <Network className="w-5 h-5" />
                    Layer 3: Service Mesh & Resilience
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-indigo-500 p-4 rounded-xl shadow-lg border-2 border-indigo-300">
                      <div className="text-white font-bold text-lg mb-1">Istio</div>
                      <div className="text-indigo-100 text-sm">Traffic Management</div>
                    </div>
                    <div className="bg-indigo-500 p-4 rounded-xl shadow-lg border-2 border-indigo-300">
                      <div className="text-white font-bold text-lg mb-1">Envoy Proxy</div>
                      <div className="text-indigo-100 text-sm">Sidecar Pattern</div>
                    </div>
                    <div className="bg-indigo-500 p-4 rounded-xl shadow-lg border-2 border-indigo-300">
                      <div className="text-white font-bold text-lg mb-1">Circuit Breaker</div>
                      <div className="text-indigo-100 text-sm">Resilience4j</div>
                    </div>
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center my-4">
                  <div className="text-white text-2xl">↓</div>
                </div>

                {/* Layer 4: Application Services */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    Layer 4: Microservices
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-green-500 p-4 rounded-xl shadow-lg border-2 border-green-300">
                      <div className="text-white font-bold text-lg mb-1">Ride Service</div>
                      <div className="text-green-100 text-sm">Booking • Status</div>
                    </div>
                    <div className="bg-green-500 p-4 rounded-xl shadow-lg border-2 border-green-300">
                      <div className="text-white font-bold text-lg mb-1">Driver Service</div>
                      <div className="text-green-100 text-sm">Availability • Location</div>
                    </div>
                    <div className="bg-green-500 p-4 rounded-xl shadow-lg border-2 border-green-300">
                      <div className="text-white font-bold text-lg mb-1">Matching Service</div>
                      <div className="text-green-100 text-sm">AI-based Matching</div>
                    </div>
                    <div className="bg-green-500 p-4 rounded-xl shadow-lg border-2 border-green-300">
                      <div className="text-white font-bold text-lg mb-1">Payment Service</div>
                      <div className="text-green-100 text-sm">Processing • Wallet</div>
                    </div>
                    <div className="bg-green-500 p-4 rounded-xl shadow-lg border-2 border-green-300">
                      <div className="text-white font-bold text-lg mb-1">Notification Service</div>
                      <div className="text-green-100 text-sm">Push • SMS • Email</div>
                    </div>
                    <div className="bg-green-500 p-4 rounded-xl shadow-lg border-2 border-green-300">
                      <div className="text-white font-bold text-lg mb-1">User Service</div>
                      <div className="text-green-100 text-sm">Profile • Auth</div>
                    </div>
                  </div>
                </div>

                {/* Arrows Down - Split to Geospatial and Message Bus */}
                <div className="flex justify-around my-4">
                  <div className="text-white text-2xl">↓</div>
                  <div className="text-white text-2xl">↓</div>
                </div>

                {/* Layer 5 & 6: Geospatial and Message Bus (Side by Side) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Geospatial Services */}
                  <div>
                    <h3 className="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Layer 5: Geospatial
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-cyan-500 p-4 rounded-xl shadow-lg border-2 border-cyan-300">
                        <div className="text-white font-bold text-lg mb-1">Redis GEO</div>
                        <div className="text-cyan-100 text-sm">GEORADIUS • 5km search</div>
                      </div>
                      <div className="bg-cyan-500 p-4 rounded-xl shadow-lg border-2 border-cyan-300">
                        <div className="text-white font-bold text-lg mb-1">PostGIS</div>
                        <div className="text-cyan-100 text-sm">Polygon searches</div>
                      </div>
                      <div className="bg-cyan-500 p-4 rounded-xl shadow-lg border-2 border-cyan-300">
                        <div className="text-white font-bold text-lg mb-1">GraphHopper</div>
                        <div className="text-cyan-100 text-sm">Route optimization</div>
                      </div>
                    </div>
                  </div>

                  {/* Message Bus */}
                  <div>
                    <h3 className="text-xl font-bold text-pink-300 mb-4 flex items-center gap-2">
                      <Radio className="w-5 h-5" />
                      Layer 6: Event Bus
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-pink-500 p-4 rounded-xl shadow-lg border-2 border-pink-300">
                        <div className="text-white font-bold text-lg mb-1">Kafka</div>
                        <div className="text-pink-100 text-sm">Event Streaming • 100K/sec</div>
                      </div>
                      <div className="bg-pink-500 p-4 rounded-xl shadow-lg border-2 border-pink-300">
                        <div className="text-white font-bold text-lg mb-1">RabbitMQ</div>
                        <div className="text-pink-100 text-sm">Transactional messages</div>
                      </div>
                      <div className="bg-pink-500 p-4 rounded-xl shadow-lg border-2 border-pink-300">
                        <div className="text-white font-bold text-lg mb-1">SQS/SNS</div>
                        <div className="text-pink-100 text-sm">Dead letter queue</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center my-4">
                  <div className="text-white text-2xl">↓</div>
                </div>

                {/* Layer 7: Data Stores */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Layer 7: Data Persistence
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-yellow-600 p-4 rounded-xl shadow-lg border-2 border-yellow-400">
                      <div className="text-white font-bold text-lg mb-1">PostgreSQL</div>
                      <div className="text-yellow-100 text-sm">Primary + 3 Replicas</div>
                    </div>
                    <div className="bg-yellow-600 p-4 rounded-xl shadow-lg border-2 border-yellow-400">
                      <div className="text-white font-bold text-lg mb-1">MongoDB</div>
                      <div className="text-yellow-100 text-sm">5 Shards • 3 Replicas</div>
                    </div>
                    <div className="bg-yellow-600 p-4 rounded-xl shadow-lg border-2 border-yellow-400">
                      <div className="text-white font-bold text-lg mb-1">Redis</div>
                      <div className="text-yellow-100 text-sm">Cache • Sentinel HA</div>
                    </div>
                    <div className="bg-yellow-600 p-4 rounded-xl shadow-lg border-2 border-yellow-400">
                      <div className="text-white font-bold text-lg mb-1">Cassandra</div>
                      <div className="text-yellow-100 text-sm">9 Nodes • RF=3</div>
                    </div>
                  </div>
                </div>

                {/* Layer 8: External Services */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-orange-300 mb-4 flex items-center gap-2">
                    <Cloud className="w-5 h-5" />
                    Layer 8: External Integrations
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-orange-500 p-4 rounded-xl shadow-lg border-2 border-orange-300">
                      <div className="text-white font-bold text-lg mb-1">Maps API</div>
                      <div className="text-orange-100 text-sm">Google Maps • Routing</div>
                    </div>
                    <div className="bg-orange-500 p-4 rounded-xl shadow-lg border-2 border-orange-300">
                      <div className="text-white font-bold text-lg mb-1">Payment Gateway</div>
                      <div className="text-orange-100 text-sm">Stripe • PayPal</div>
                    </div>
                    <div className="bg-orange-500 p-4 rounded-xl shadow-lg border-2 border-orange-300">
                      <div className="text-white font-bold text-lg mb-1">Push Notifications</div>
                      <div className="text-orange-100 text-sm">FCM • APNs</div>
                    </div>
                  </div>
                </div>

                {/* Layer 9: Observability */}
                <div>
                  <h3 className="text-xl font-bold text-red-300 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Layer 9: Monitoring & Observability
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-red-500 p-4 rounded-xl shadow-lg border-2 border-red-300">
                      <div className="text-white font-bold text-lg mb-1">Prometheus</div>
                      <div className="text-red-100 text-sm">Metrics Collection</div>
                    </div>
                    <div className="bg-red-500 p-4 rounded-xl shadow-lg border-2 border-red-300">
                      <div className="text-white font-bold text-lg mb-1">Grafana</div>
                      <div className="text-red-100 text-sm">Dashboards</div>
                    </div>
                    <div className="bg-red-500 p-4 rounded-xl shadow-lg border-2 border-red-300">
                      <div className="text-white font-bold text-lg mb-1">ELK Stack</div>
                      <div className="text-red-100 text-sm">Centralized Logging</div>
                    </div>
                    <div className="bg-red-500 p-4 rounded-xl shadow-lg border-2 border-red-300">
                      <div className="text-white font-bold text-lg mb-1">Jaeger</div>
                      <div className="text-red-100 text-sm">Distributed Tracing</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Component Flow Diagram with Patterns */}
              <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-8 border-2 border-indigo-700 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <Network className="w-8 h-8 text-indigo-300" />
                  Component Flow with Design Patterns
                </h2>

                {/* Flow 1: Client to Gateway */}
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-6 flex-wrap">
                    <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Globe className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Client Apps</div>
                      <div className="text-sm text-blue-100">Rider & Driver</div>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <div className="border-t-4 border-purple-400 relative">
                        <div className="absolute right-0 top-0 transform -translate-y-1/2">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-purple-400"></div>
                        </div>
                      </div>
                      <div className="bg-purple-900/30 border-2 border-purple-700 rounded-lg px-4 py-2 text-center mt-2">
                        <div className="font-bold text-purple-300 text-sm">API Gateway Pattern</div>
                        <div className="text-xs text-purple-400">Single entry point • HTTPS/TLS 1.3</div>
                      </div>
                    </div>

                    <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Shield className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">API Gateway</div>
                      <div className="text-sm text-purple-100">ALB + Auth</div>
                    </div>
                  </div>
                </div>

                {/* Flow 2: Gateway to Service Mesh */}
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-6 flex-wrap">
                    <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Shield className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">API Gateway</div>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <div className="border-t-4 border-indigo-400 relative">
                        <div className="absolute right-0 top-0 transform -translate-y-1/2">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-indigo-400"></div>
                        </div>
                      </div>
                      <div className="bg-indigo-900/30 border-2 border-indigo-700 rounded-lg px-4 py-2 text-center mt-2">
                        <div className="font-bold text-indigo-300 text-sm">Service Mesh Pattern</div>
                        <div className="text-xs text-indigo-400">Sidecar Proxy • mTLS</div>
                      </div>
                    </div>

                    <div className="bg-indigo-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Network className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Istio/Envoy</div>
                      <div className="text-sm text-indigo-100">Service Mesh</div>
                    </div>
                  </div>
                </div>

                {/* Flow 3: Service Mesh to Microservices */}
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-6 flex-wrap">
                    <div className="bg-indigo-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Network className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Service Mesh</div>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <div className="border-t-4 border-green-400 relative">
                        <div className="absolute right-0 top-0 transform -translate-y-1/2">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-green-400"></div>
                        </div>
                      </div>
                      <div className="bg-green-900/30 border-2 border-green-700 rounded-lg px-4 py-2 text-center mt-2">
                        <div className="font-bold text-green-300 text-sm">Circuit Breaker Pattern</div>
                        <div className="text-xs text-green-400">Fault Tolerance • Resilience4j</div>
                      </div>
                    </div>

                    <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Server className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Microservices</div>
                      <div className="text-sm text-green-100">Ride/Driver/Payment</div>
                    </div>
                  </div>
                </div>

                {/* Flow 4: Matching Service to Geospatial */}
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-6 flex-wrap">
                    <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Server className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Matching Service</div>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <div className="border-t-4 border-cyan-400 relative">
                        <div className="absolute right-0 top-0 transform -translate-y-1/2">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-cyan-400"></div>
                        </div>
                      </div>
                      <div className="bg-cyan-900/30 border-2 border-cyan-700 rounded-lg px-4 py-2 text-center mt-2">
                        <div className="font-bold text-cyan-300 text-sm">Geospatial Indexing</div>
                        <div className="text-xs text-cyan-400">GEORADIUS • {'<500ms'} • 5km radius</div>
                      </div>
                    </div>

                    <div className="bg-cyan-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <MapPin className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Redis GEO</div>
                      <div className="text-sm text-cyan-100">PostGIS Fallback</div>
                    </div>
                  </div>
                </div>

                {/* Flow 5: Services to Kafka */}
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-6 flex-wrap">
                    <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Server className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">All Services</div>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <div className="border-t-4 border-pink-400 relative">
                        <div className="absolute right-0 top-0 transform -translate-y-1/2">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-pink-400"></div>
                        </div>
                      </div>
                      <div className="bg-pink-900/30 border-2 border-pink-700 rounded-lg px-4 py-2 text-center mt-2">
                        <div className="font-bold text-pink-300 text-sm">Event-Driven Architecture</div>
                        <div className="text-xs text-pink-400">Pub/Sub • Async • 100K msgs/sec</div>
                      </div>
                    </div>

                    <div className="bg-pink-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Radio className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Kafka/RabbitMQ</div>
                      <div className="text-sm text-pink-100">Event Streaming</div>
                    </div>
                  </div>
                </div>

                {/* Flow 6: Services to Databases */}
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-6 flex-wrap">
                    <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Server className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Services</div>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <div className="border-t-4 border-yellow-400 relative">
                        <div className="absolute right-0 top-0 transform -translate-y-1/2">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-yellow-400"></div>
                        </div>
                      </div>
                      <div className="bg-yellow-900/30 border-2 border-yellow-700 rounded-lg px-4 py-2 text-center mt-2">
                        <div className="font-bold text-yellow-300 text-sm">Database per Service</div>
                        <div className="text-xs text-yellow-400">Polyglot Persistence • No Shared DB</div>
                      </div>
                    </div>

                    <div className="bg-yellow-600 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Database className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Data Stores</div>
                      <div className="text-sm text-yellow-100">PG/Mongo/Redis</div>
                    </div>
                  </div>
                </div>

                {/* Flow 7: Cache-Aside Pattern */}
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-6 flex-wrap">
                    <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Server className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Services</div>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <div className="border-t-4 border-orange-400 relative">
                        <div className="absolute right-0 top-0 transform -translate-y-1/2">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-orange-400"></div>
                        </div>
                      </div>
                      <div className="bg-orange-900/30 border-2 border-orange-700 rounded-lg px-4 py-2 text-center mt-2">
                        <div className="font-bold text-orange-300 text-sm">Cache-Aside Pattern</div>
                        <div className="text-xs text-orange-400">95% hit rate • 10x faster</div>
                      </div>
                    </div>

                    <div className="bg-yellow-600 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Zap className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Redis Cache</div>
                      <div className="text-sm text-yellow-100">L1/L2/L3 Caching</div>
                    </div>
                  </div>
                </div>

                {/* Flow 8: Distributed Tracing */}
                <div>
                  <div className="flex items-center justify-center gap-6 flex-wrap">
                    <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Server className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">All Services</div>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <div className="border-t-4 border-red-400 relative">
                        <div className="absolute right-0 top-0 transform -translate-y-1/2">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-red-400"></div>
                        </div>
                      </div>
                      <div className="bg-red-900/30 border-2 border-red-700 rounded-lg px-4 py-2 text-center mt-2">
                        <div className="font-bold text-red-300 text-sm">Distributed Tracing</div>
                        <div className="text-xs text-red-400">OpenTelemetry • Jaeger • 10% sampling</div>
                      </div>
                    </div>

                    <div className="bg-red-500 text-white p-6 rounded-xl shadow-lg w-48 text-center">
                      <Activity className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-bold text-lg">Observability</div>
                      <div className="text-sm text-red-100">Metrics/Logs/Traces</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Design Patterns Summary */}
              <div className="bg-gradient-to-br from-slate-900/30 to-slate-800/30 rounded-2xl p-8 border-2 border-slate-700 shadow-lg">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <FileText className="w-8 h-8 text-slate-300" />
                  Design Patterns Applied
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-800 p-6 rounded-xl border-2 border-purple-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-purple-500 text-white rounded-lg flex items-center justify-center font-bold text-lg">1</div>
                      <h3 className="text-lg font-bold text-white">API Gateway</h3>
                    </div>
                    <p className="text-sm text-gray-300">Single entry point for all client requests with authentication, rate limiting, and request routing.</p>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-2 border-indigo-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-indigo-500 text-white rounded-lg flex items-center justify-center font-bold text-lg">2</div>
                      <h3 className="text-lg font-bold text-white">Service Mesh</h3>
                    </div>
                    <p className="text-sm text-gray-300">Sidecar proxy pattern (Envoy) for service-to-service communication with mTLS and traffic management.</p>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-2 border-green-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-500 text-white rounded-lg flex items-center justify-center font-bold text-lg">3</div>
                      <h3 className="text-lg font-bold text-white">Circuit Breaker</h3>
                    </div>
                    <p className="text-sm text-gray-300">Prevents cascade failures by opening circuit after consecutive failures and testing with half-open state.</p>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-2 border-cyan-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-cyan-500 text-white rounded-lg flex items-center justify-center font-bold text-lg">4</div>
                      <h3 className="text-lg font-bold text-white">Geospatial Indexing</h3>
                    </div>
                    <p className="text-sm text-gray-300">Redis GEORADIUS for sub-500ms driver matching within 5km radius with PostGIS fallback.</p>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-2 border-pink-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-pink-500 text-white rounded-lg flex items-center justify-center font-bold text-lg">5</div>
                      <h3 className="text-lg font-bold text-white">Event-Driven</h3>
                    </div>
                    <p className="text-sm text-gray-300">Asynchronous communication via Kafka pub/sub for loose coupling and scalability (100K msgs/sec).</p>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-2 border-yellow-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-yellow-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">6</div>
                      <h3 className="text-lg font-bold text-white">Database per Service</h3>
                    </div>
                    <p className="text-sm text-gray-300">Polyglot persistence - each service owns its database (PostgreSQL, MongoDB, Cassandra, Redis).</p>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-2 border-orange-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-orange-500 text-white rounded-lg flex items-center justify-center font-bold text-lg">7</div>
                      <h3 className="text-lg font-bold text-white">Cache-Aside</h3>
                    </div>
                    <p className="text-sm text-gray-300">Multi-layer caching (CDN/Redis/App) with 95% hit rate and 10x latency reduction.</p>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-2 border-red-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-red-500 text-white rounded-lg flex items-center justify-center font-bold text-lg">8</div>
                      <h3 className="text-lg font-bold text-white">Distributed Tracing</h3>
                    </div>
                    <p className="text-sm text-gray-300">OpenTelemetry + Jaeger for request tracing across microservices with 10% production sampling.</p>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-xl border-2 border-blue-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-lg">9</div>
                      <h3 className="text-lg font-bold text-white">Auto-Scaling</h3>
                    </div>
                    <p className="text-sm text-gray-300">Horizontal scaling based on CPU (&gt;70%) and request count (&gt;1000/min) with 5-50 instances.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Architecture Tab */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              {faultToleranceComponents.map((component) => {
                const Icon = component.icon;
                return (
                  <div key={component.id}>
                    <button
                      onClick={() => toggleSection(component.id)}
                      className={`w-full p-5 rounded-xl bg-gradient-to-r ${component.color} text-white font-semibold flex items-center gap-4 hover:shadow-lg transition-all border border-white/20`}
                    >
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Icon size={22} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-bold text-lg">{component.name}</div>
                        <div className="text-sm opacity-90 font-normal">{component.metrics}</div>
                      </div>
                      {expandedSections[component.id] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>

                    {expandedSections[component.id] && (
                      <div className="bg-gray-800 mt-3 p-6 rounded-xl border border-gray-700">
                        {/* Components */}
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                          <Box className="w-5 h-5 text-blue-400" />
                          Components
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                          {component.components.map((comp, i) => (
                            <div key={i} className="flex items-start gap-2 text-gray-300 text-sm bg-gray-900 p-3 rounded-lg border border-gray-700">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                              <span>{comp}</span>
                            </div>
                          ))}
                        </div>

                        {/* Fault Tolerance Strategies */}
                        <h4 className="text-white font-bold mb-4 mt-8 flex items-center gap-2">
                          <Shield className="w-5 h-5 text-green-400" />
                          Fault Tolerance Strategies
                        </h4>
                        <div className="space-y-3">
                          {component.faultTolerance.map((strategy, i) => (
                            <div key={i} className="flex gap-3 bg-gray-900 p-4 rounded-lg border border-green-900">
                              <Check className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
                              <p className="text-gray-300 text-sm leading-relaxed">{strategy}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Matching Tab */}
          {activeTab === 'matching' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-900/30 to-gray-800/30 rounded-2xl p-8 border border-gray-700 shadow-sm">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-blue-900/30 rounded-lg">
                    <Navigation className="w-6 h-6 text-blue-400" />
                  </div>
                  {matchingAlgorithm.title}
                </h2>
                <div className="space-y-4">
                  {matchingAlgorithm.steps.map((step, i) => (
                    <div key={i} className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-white">{step.step}</h3>
                            <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-semibold">{step.latency}</span>
                          </div>
                          <p className="text-gray-300 mb-3">{step.description}</p>
                          <div className="bg-blue-900/30 p-3 rounded-lg mb-3">
                            <p className="text-sm text-blue-300 font-mono">{step.details}</p>
                          </div>
                          <div className="bg-green-900/30 p-3 rounded-lg border border-green-700">
                            <p className="text-sm text-green-300">
                              <span className="font-semibold">Fault Tolerance:</span> {step.faultTolerance}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Scale Tab */}
          {activeTab === 'scale' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-2xl p-8 border border-blue-700 shadow-sm">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  {systemScale.title}
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {systemScale.metrics.map((metric, i) => (
                    <div key={i} className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                      <h3 className="text-lg font-bold text-white mb-4">{metric.metric}</h3>
                      <div className="space-y-2.5">
                        <p className="text-3xl font-bold text-blue-400">{metric.value}</p>
                        <p className="text-sm text-gray-300"><span className="font-semibold text-white">Calculation:</span> {metric.calculation}</p>
                        <div className="pt-3 mt-3 border-t border-gray-700">
                          <p className="text-sm text-green-400 font-medium flex items-start gap-2">
                            <Check size={18} className="flex-shrink-0 mt-0.5" />
                            <span>{metric.infrastructure}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Recovery Tab */}
          {activeTab === 'recovery' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-2xl p-8 border border-red-700 shadow-sm">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-red-600 rounded-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  {disasterRecovery.title}
                </h2>
                <div className="space-y-4">
                  {disasterRecovery.strategies.map((strategy, i) => (
                    <div key={i} className="bg-gray-800 p-6 rounded-xl border border-red-700 shadow-sm">
                      <h3 className="text-lg font-bold text-white mb-4">{strategy.scenario}</h3>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-400 uppercase font-semibold mb-1">RTO (Recovery Time)</p>
                          <p className="text-lg font-bold text-orange-400">{strategy.rto}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase font-semibold mb-1">RPO (Data Loss)</p>
                          <p className="text-lg font-bold text-orange-400">{strategy.rpo}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-300"><span className="font-semibold text-white">Impact:</span> {strategy.impact}</p>
                        <div className="bg-green-900/30 p-3 rounded-lg border border-green-700">
                          <p className="text-sm text-green-300">
                            <span className="font-semibold">Recovery:</span> {strategy.recovery}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

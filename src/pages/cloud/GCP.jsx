import Breadcrumb from '../../components/Breadcrumb'
import { useState } from 'react'

function GCP({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedService, setSelectedService] = useState(null)

  const services = [
    {
      name: 'Compute Engine',
      icon: '🖥️',
      category: 'Compute',
      description: 'Scalable, high-performance virtual machines running in Google\'s innovative data centers',
      detailedDescription: 'Google Compute Engine delivers VMs that start quickly and have persistent disk storage and consistent performance. Create custom machine types to optimize for your specific needs. Features live migration of VMs with zero downtime and automatic restart on host maintenance.',
      keyFeatures: ['Custom Machine Types', 'Preemptible VMs (80% discount)', 'Live Migration', 'Committed Use Discounts'],
      useCases: ['High-Performance Computing', 'Machine Learning', 'Genomics', 'Financial Modeling'],
      pricing: 'Starting at $0.01/hour for f1-micro, sustained use discounts up to 30%, preemptible at 80% off'
    },
    {
      name: 'Cloud Storage',
      icon: '📦',
      category: 'Storage',
      description: 'Unified object storage with unmatched durability, availability, and scalability',
      detailedDescription: 'Google Cloud Storage offers 99.999999999% durability across multiple storage classes. Automatic data encryption at rest, class transitions, and object lifecycle management. Integrated with BigQuery, Dataflow, and AI services for seamless data processing.',
      keyFeatures: ['Multi-Regional & Dual-Regional', 'Lifecycle Management', 'Versioning & Retention', 'Uniform & Fine-Grained ACL'],
      useCases: ['Data Lakes', 'Content Delivery', 'Backup & Disaster Recovery', 'Archive Storage'],
      pricing: 'Standard: $0.020/GB/month, Nearline: $0.010/GB, Coldline: $0.004/GB, Archive: $0.0012/GB'
    },
    {
      name: 'Cloud Functions',
      icon: '⚡',
      category: 'Compute',
      description: 'Event-driven serverless compute platform that scales automatically from zero to planet-scale',
      detailedDescription: 'Google Cloud Functions executes code in response to events without managing servers. Supports Node.js, Python, Go, Java, .NET, Ruby, and PHP. Automatic scaling, built-in security, and seamless integration with Google services. Second-generation offers longer timeouts and larger instances.',
      keyFeatures: ['Automatic Scaling', 'Event-Driven Triggers', 'VPC Connector Support', 'Cloud Run Integration'],
      useCases: ['Webhooks', 'Data Processing', 'IoT', 'Mobile Backends'],
      pricing: '2M invocations/month free, then $0.40/million. Compute: $0.0000025/GB-second'
    },
    {
      name: 'Cloud SQL',
      icon: '🗄️',
      category: 'Database',
      description: 'Fully managed relational database service for MySQL, PostgreSQL, and SQL Server',
      detailedDescription: 'Google Cloud SQL makes it easy to set up, maintain, and administer databases. Automated backups, replication, encryption, and capacity increases. Integrates with App Engine, Compute Engine, and Kubernetes. Supports up to 96 cores and 624 GB RAM per instance.',
      keyFeatures: ['Automated Backups & Failover', 'Point-in-Time Recovery', 'Read Replicas', 'Private IP Support'],
      useCases: ['Web Applications', 'E-commerce Platforms', 'CRM Systems', 'ERP Solutions'],
      pricing: 'db-f1-micro: $0.0150/hour. db-n1-standard-1: $0.0960/hour with 30% sustained use discount'
    },
    {
      name: 'Firestore',
      icon: '🔥',
      category: 'Database',
      description: 'Flexible, scalable NoSQL cloud database with real-time synchronization',
      detailedDescription: 'Cloud Firestore is a NoSQL document database with live synchronization and offline support. Automatically scales with your app, supports ACID transactions, and provides powerful querying. Native iOS, Android, and Web SDKs. Strong consistency guarantees.',
      keyFeatures: ['Real-time Updates', 'Offline Persistence', 'Multi-Region Replication', 'ACID Transactions'],
      useCases: ['Mobile Apps', 'Real-time Collaboration', 'User Profiles', 'Gaming Leaderboards'],
      pricing: 'Free tier: 1GB storage, 10GB bandwidth/day, 50K reads, 20K writes, 20K deletes per day'
    },
    {
      name: 'BigQuery',
      icon: '📊',
      category: 'Analytics',
      description: 'Serverless, highly scalable data warehouse with built-in machine learning',
      detailedDescription: 'BigQuery is Google\'s flagship data analytics platform that can scan terabytes in seconds and petabytes in minutes. SQL-based analysis with built-in ML functions (BigQuery ML), streaming inserts, and geospatial analysis. No infrastructure to manage, pay only for queries.',
      keyFeatures: ['Petabyte-Scale Analysis', 'Built-in ML (BQML)', 'Real-time Analytics', 'Federated Queries'],
      useCases: ['Business Intelligence', 'Log Analytics', 'IoT Analytics', 'Predictive Analytics'],
      pricing: 'Storage: $0.020/GB/month active, $0.010/GB long-term. Queries: $5/TB processed'
    },
    {
      name: 'GKE',
      icon: '☸️',
      category: 'Containers',
      description: 'Enterprise-grade managed Kubernetes service with Google\'s operational expertise',
      detailedDescription: 'Google Kubernetes Engine (GKE) is a managed Kubernetes service that provides automated upgrades, repairs, and scaling. Built on Google\'s 15+ years of container experience. Autopilot mode handles all cluster management. Integrates with Cloud Monitoring, Logging, and Binary Authorization.',
      keyFeatures: ['Autopilot Mode', 'Auto-Scaling & Auto-Repair', 'Workload Identity', 'Multi-Cluster Mesh'],
      useCases: ['Microservices', 'Hybrid Cloud', 'CI/CD Pipelines', 'Batch Processing'],
      pricing: 'Autopilot: $0.10/pod-hour. Standard: $0.10/cluster/hour + node compute costs'
    },
    {
      name: 'Pub/Sub',
      icon: '📨',
      category: 'Messaging',
      description: 'Asynchronous messaging service for building event-driven systems and streaming analytics',
      detailedDescription: 'Cloud Pub/Sub provides global message delivery with sub-second latency. At-least-once delivery, optional ordering keys, and message retention up to 7 days. Scales to millions of messages per second. Integrates with Dataflow for stream processing and BigQuery for analytics.',
      keyFeatures: ['Global Message Bus', 'Exactly-Once Delivery', 'Message Filtering', 'Dead Letter Topics'],
      useCases: ['Event-Driven Architectures', 'Streaming Analytics', 'Asynchronous Workflows', 'Real-time Updates'],
      pricing: 'First 10GB/month free, then $0.06/GB for throughput, $0.05/GB for storage'
    },
    {
      name: 'Cloud Run',
      icon: '🏃',
      category: 'Compute',
      description: 'Fully managed compute platform for deploying containerized applications that scale automatically',
      detailedDescription: 'Cloud Run executes stateless containers on Google\'s infrastructure. Auto-scales from zero to thousands of instances. Supports any language, library, or binary. Built on Knative open standard. Request-based pricing with 180-second timeout. CPU is only allocated during request processing.',
      keyFeatures: ['Scale to Zero', 'Custom Domains & TLS', 'WebSocket Support', 'Traffic Splitting'],
      useCases: ['Serverless APIs', 'Microservices', 'Data Processing', 'Web Applications'],
      pricing: '2M requests/month free. Then $0.40/million requests + $0.00002400/vCPU-second'
    },
    {
      name: 'Cloud Monitoring',
      icon: '📈',
      category: 'Operations',
      description: 'Full observability for cloud-native applications with metrics, logs, and traces',
      detailedDescription: 'Cloud Monitoring (formerly Stackdriver) provides comprehensive monitoring for Google Cloud, AWS, and on-premises infrastructure. Custom metrics, dashboards, alerting policies, and SLO monitoring. Integrates with Cloud Logging, Trace, and Profiler for full observability stack.',
      keyFeatures: ['Custom Metrics', 'Uptime Monitoring', 'Alerting Policies', 'SLO Management'],
      useCases: ['Infrastructure Monitoring', 'Application Performance', 'SRE Practices', 'Anomaly Detection'],
      pricing: 'Free tier: 150MB ingestion/month. Premium: $0.2580/MB for metrics ingestion'
    },
    {
      name: 'IAM',
      icon: '🔐',
      category: 'Security',
      description: 'Fine-grained identity and access management with integrated security and compliance',
      detailedDescription: 'Cloud IAM provides unified access control across all Google Cloud services. Predefined roles for common use cases, custom roles for specific needs. Service accounts for service-to-service authentication. Organization policies enforce governance. Audit logs track all access.',
      keyFeatures: ['Predefined & Custom Roles', 'Service Accounts', 'Organization Policies', 'Audit Logging'],
      useCases: ['Access Control', 'Compliance', 'Service Authentication', 'Resource Hierarchy'],
      pricing: 'Free - No charge for IAM'
    },
    {
      name: 'API Gateway',
      icon: '🚪',
      category: 'API Management',
      description: 'Fully managed gateway to secure, monitor, and manage APIs on Google Cloud',
      detailedDescription: 'API Gateway enables you to create, secure, and monitor APIs for serverless backends on Cloud Functions and Cloud Run. OpenAPI spec support, authentication via service accounts or Firebase, rate limiting, and request validation. Integrated with Cloud Monitoring and Logging.',
      keyFeatures: ['OpenAPI Specification', 'Authentication & Authorization', 'Rate Limiting & Quotas', 'API Versioning'],
      useCases: ['Serverless APIs', 'Mobile Backends', 'Third-Party Integration', 'API Monetization'],
      pricing: 'Free tier: 2M calls/month. Then $3.00/million API calls + $0.20/GB data transfer'
    },
    {
      name: 'Cloud Spanner',
      icon: '🔧',
      category: 'Database',
      description: 'Fully managed, horizontally scalable, relational database with global consistency',
      detailedDescription: 'Cloud Spanner is Google\'s fully managed, mission-critical relational database service offering transactional consistency at global scale. Combines benefits of relational database structure with non-relational horizontal scale. 99.999% availability SLA, external consistency, and automatic sharding.',
      keyFeatures: ['Global Consistency', 'Horizontal Scaling', '99.999% SLA', 'SQL Support'],
      useCases: ['Financial Systems', 'Global Supply Chain', 'Gaming Platforms', 'Retail Systems'],
      pricing: 'Regional: $0.30/node/hour + $0.30/GB storage. Multi-region: $0.90/node/hour'
    },
    {
      name: 'Dataflow',
      icon: '🌊',
      category: 'Analytics',
      description: 'Fully managed stream and batch data processing service based on Apache Beam',
      detailedDescription: 'Cloud Dataflow is a unified stream and batch data processing service. Automated resource management with autoscaling, built-in monitoring and diagnostics. Write pipelines in Java, Python, or Go. Supports exactly-once processing, windowing, and watermarks for streaming data.',
      keyFeatures: ['Auto-Scaling', 'Unified Batch & Streaming', 'Apache Beam SDK', 'Shuffle Service'],
      useCases: ['ETL Pipelines', 'Real-time Analytics', 'Data Integration', 'Anomaly Detection'],
      pricing: 'Batch: $0.056/vCPU-hour + $0.003557/GB-hour. Streaming: $0.069/vCPU-hour'
    },
    {
      name: 'Memorystore',
      icon: '⚡',
      category: 'Database',
      description: 'Fully managed in-memory data store service for Redis and Memcached',
      detailedDescription: 'Cloud Memorystore provides fully managed Redis and Memcached for sub-millisecond data access. High availability with 99.9% SLA, automatic failover, and Redis persistence options (RDB and AOF). Supports Redis 6.x with modules like RedisJSON, RedisBloom, and RedisTimeSeries.',
      keyFeatures: ['Redis & Memcached', 'High Availability', 'Import/Export', 'VPC Peering'],
      useCases: ['Application Caching', 'Session Management', 'Gaming Leaderboards', 'Real-time Analytics'],
      pricing: 'Redis Basic (M1): $0.049/GB-hour. Standard: $0.064/GB-hour with replication'
    },
    {
      name: 'Cloud Tasks',
      icon: '📋',
      category: 'Compute',
      description: 'Fully managed service for managing distributed task queues',
      detailedDescription: 'Cloud Tasks lets you separate out pieces of work that can be performed independently, asynchronously. Create tasks, add them to a queue, and configure the queue to dispatch to Cloud Functions, App Engine, Cloud Run, or any HTTP endpoint. Rate limiting, retry logic, and task scheduling.',
      keyFeatures: ['Task Scheduling', 'Rate Limiting', 'Retry Configuration', 'HTTP & App Engine Targets'],
      useCases: ['Background Processing', 'Workflow Orchestration', 'Asynchronous Operations', 'Rate-Limited APIs'],
      pricing: 'First 1M operations/month free. Then $0.40/million queue operations'
    },
    {
      name: 'Workflows',
      icon: '🔄',
      category: 'Integration',
      description: 'Orchestrate and automate Google Cloud and HTTP-based API services',
      detailedDescription: 'Cloud Workflows orchestrates and automates Google Cloud and HTTP-based services with serverless workflows. Define workflows in YAML or JSON, includes built-in error handling, retry policies, and conditional execution. Integrates with Cloud Functions, Cloud Run, and external APIs.',
      keyFeatures: ['YAML/JSON Definition', 'Error Handling', 'Conditional Logic', 'Service Integration'],
      useCases: ['ETL Orchestration', 'Incident Response', 'Release Automation', 'Data Processing Pipelines'],
      pricing: 'First 5,000 internal steps free. Then $0.01/1,000 internal steps'
    },
    {
      name: 'Cloud Composer',
      icon: '🎵',
      category: 'Analytics',
      description: 'Fully managed workflow orchestration service built on Apache Airflow',
      detailedDescription: 'Cloud Composer is a managed workflow orchestration service powered by Apache Airflow. Author, schedule, and monitor workflows using Python. Native integration with BigQuery, Dataflow, Dataproc, Datastore, Cloud Storage, and Pub/Sub. Support for custom operators and plugins.',
      keyFeatures: ['Apache Airflow', 'Python DAGs', 'Auto-Scaling', 'Private IP Environments'],
      useCases: ['Complex ETL', 'ML Training Pipelines', 'Data Warehouse Refresh', 'Multi-Cloud Workflows'],
      pricing: 'Environment: $0.074/vCPU/hour + $0.0123/GB/hour + $0.18/GB database storage'
    },
    {
      name: 'Artifact Registry',
      icon: '📦',
      category: 'Developer Tools',
      description: 'Universal package manager for container images and language packages',
      detailedDescription: 'Artifact Registry is a single place for managing container images and language packages (Maven, npm, Python, etc.). Native integration with CI/CD tools, vulnerability scanning, and fine-grained access control. Regional and multi-regional repositories with replication.',
      keyFeatures: ['Multi-Format Support', 'Vulnerability Scanning', 'VPC Service Controls', 'Repository Replication'],
      useCases: ['Container Management', 'Package Distribution', 'CI/CD Pipelines', 'Dependency Management'],
      pricing: 'First 0.5GB storage free. Standard: $0.10/GB/month + network egress'
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #0c4a6e, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
    <div style={{
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        gap: '1rem',
        flexWrap: 'wrap',
        borderBottom: '3px solid #4285F4',
        paddingBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onBack}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: '#0ea5e9',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(14, 165, 233, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0ea5e9'}
          >
            ← Back to Cloud
          </button>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '2.5rem',
              fontWeight: '800',
              background: 'linear-gradient(to right, #7dd3fc, #38bdf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Google Cloud Platform (GCP)
            </h1>
            {currentSubcategory && (
              <span style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                borderRadius: '6px',
                marginTop: '0.25rem',
                display: 'inline-block'
              }}>
                {currentSubcategory}
              </span>
            )}
            <p style={{
              margin: '0.5rem 0 0 0',
              color: '#666',
              fontSize: '1.1rem'
            }}>
              Build, innovate, and scale with Google Cloud
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {onPrevious && (
            <button
              onClick={onPrevious}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
            >
              ← {previousName}
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      {/* Services Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {services.map((service) => (
          <div
            key={service.name}
            onClick={() => setSelectedService(selectedService === service.name ? null : service.name)}
            style={{
              padding: '1.5rem',
              backgroundColor: selectedService === service.name ? '#F1F8FF' : 'white',
              border: `2px solid ${selectedService === service.name ? '#4285F4' : '#e5e7eb'}`,
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: selectedService === service.name
                ? '0 8px 16px rgba(66, 133, 244, 0.2)'
                : '0 2px 4px rgba(0,0,0,0.05)',
              transform: selectedService === service.name ? 'translateY(-4px)' : 'translateY(0)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '2rem' }}>{service.icon}</span>
              <div>
                <h3 style={{
                  margin: 0,
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#202124'
                }}>
                  {service.name}
                </h3>
                <span style={{
                  fontSize: '0.75rem',
                  color: '#4285F4',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {service.category}
                </span>
              </div>
            </div>

            <p style={{
              margin: '0.75rem 0',
              color: '#666',
              fontSize: '0.9rem',
              lineHeight: '1.5'
            }}>
              {service.description}
            </p>

            {selectedService === service.name && (
              <div style={{
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '2px solid #4285F433'
              }}>
                <p style={{
                  margin: '0 0 1rem 0',
                  color: '#444',
                  fontSize: '0.9rem',
                  lineHeight: '1.6'
                }}>
                  {service.detailedDescription}
                </p>

                <h4 style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: '#202124',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Key Features
                </h4>
                <ul style={{
                  margin: '0 0 1rem 0',
                  paddingLeft: '1.25rem',
                  color: '#666',
                  fontSize: '0.85rem',
                  lineHeight: '1.8'
                }}>
                  {service.keyFeatures.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>

                <h4 style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: '#202124',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Common Use Cases
                </h4>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  {service.useCases.map((useCase, idx) => (
                    <span key={idx} style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#4285F422',
                      color: '#4285F4',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      borderRadius: '12px',
                      border: '1px solid #4285F444'
                    }}>
                      {useCase}
                    </span>
                  ))}
                </div>

                <h4 style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: '#202124',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Pricing
                </h4>
                <p style={{
                  margin: 0,
                  color: '#10b981',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  lineHeight: '1.6'
                }}>
                  {service.pricing}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div style={{
        marginTop: '3rem',
        padding: '1.5rem',
        backgroundColor: '#F8F9FA',
        borderRadius: '12px',
        borderLeft: '4px solid #4285F4'
      }}>
        <h3 style={{
          margin: '0 0 0.75rem 0',
          fontSize: '1.1rem',
          fontWeight: '700',
          color: '#202124'
        }}>
          About Google Cloud Platform
        </h3>
        <p style={{
          margin: 0,
          color: '#666',
          fontSize: '0.95rem',
          lineHeight: '1.6'
        }}>
          Google Cloud Platform (GCP) provides cloud computing services that run on the same infrastructure
          that Google uses internally for its end-user products. GCP offers a wide range of services including
          computing, data storage, data analytics, and machine learning, helping businesses transform and build
          what's next with secure infrastructure, developer-friendly tools, and advanced AI/ML capabilities.
        </p>
      </div>
    </div>
    </div>
  )
}

export default GCP

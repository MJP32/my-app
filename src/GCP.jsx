import { useState } from 'react'

function GCP({ onBack }) {
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
    }
  ]

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        marginBottom: '2rem',
        borderBottom: '3px solid #4285F4',
        paddingBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <button
            onClick={onBack}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              backgroundColor: '#4285F4',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            ← Back
          </button>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#202124',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <span style={{ fontSize: '3rem' }}>☁️</span>
              Google Cloud Platform (GCP)
            </h1>
            <p style={{
              margin: '0.5rem 0 0 0',
              color: '#666',
              fontSize: '1.1rem'
            }}>
              Build, innovate, and scale with Google Cloud
            </p>
          </div>
        </div>
      </div>

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
  )
}

export default GCP

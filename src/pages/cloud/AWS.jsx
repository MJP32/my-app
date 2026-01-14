import Breadcrumb from '../../components/Breadcrumb'
import { useState } from 'react'

function AWS({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedService, setSelectedService] = useState(null)

  const services = [
    {
      name: 'EC2',
      icon: '🖥️',
      category: 'Compute',
      description: 'Elastic Compute Cloud - Resizable virtual servers in the cloud with complete control over computing resources',
      detailedDescription: 'Amazon EC2 provides secure, resizable compute capacity in the cloud. Launch virtual machines with Linux or Windows, scale up or down automatically, and pay only for what you use. Choose from 500+ instance types optimized for different workloads.',
      keyFeatures: ['Auto Scaling Groups', 'Elastic Load Balancing', '500+ Instance Types', 'EBS & Instance Store'],
      useCases: ['Web Applications', 'Batch Processing', 'Gaming Servers', 'Enterprise Applications'],
      pricing: 'Pay-per-second (Linux) or per-hour (Windows), starting from $0.0116/hour for t3.micro'
    },
    {
      name: 'S3',
      icon: '📦',
      category: 'Storage',
      description: 'Simple Storage Service - Industry-leading object storage built to store and retrieve any amount of data from anywhere',
      detailedDescription: 'Amazon S3 offers 99.999999999% (11 9s) durability and stores data for millions of applications. Store unlimited data with automatic encryption, versioning, and lifecycle management. Integrate with AWS Lambda for event-driven processing.',
      keyFeatures: ['99.999999999% Durability', 'Versioning & Replication', 'Lifecycle Policies', 'Static Website Hosting'],
      useCases: ['Data Lakes', 'Backup & Archive', 'Content Distribution', 'Big Data Analytics'],
      pricing: 'Starting at $0.023/GB per month for S3 Standard, with tiered pricing for infrequent access'
    },
    {
      name: 'Lambda',
      icon: '⚡',
      category: 'Compute',
      description: 'Serverless compute service that runs code in response to events without provisioning or managing servers',
      detailedDescription: 'AWS Lambda lets you run code without thinking about servers. Automatically scales from a few requests per day to thousands per second. Supports Node.js, Python, Java, Go, Ruby, .NET, and custom runtimes. Integrates with 200+ AWS services.',
      keyFeatures: ['Automatic Scaling', 'Pay Per Request', 'Sub-second Billing', '15-minute Max Execution'],
      useCases: ['Real-time File Processing', 'API Backends', 'Data Transformation', 'IoT Backends'],
      pricing: '1M free requests/month, then $0.20 per 1M requests + $0.0000166667 per GB-second'
    },
    {
      name: 'RDS',
      icon: '🗄️',
      category: 'Database',
      description: 'Relational Database Service - Managed database service supporting MySQL, PostgreSQL, MariaDB, Oracle, and SQL Server',
      detailedDescription: 'Amazon RDS makes it easy to set up, operate, and scale relational databases. Automated backups, software patching, monitoring, and hardware provisioning. Multi-AZ deployments for high availability with automatic failover.',
      keyFeatures: ['Automated Backups', 'Multi-AZ Deployment', 'Read Replicas', 'Automatic Failover'],
      useCases: ['Web Applications', 'E-commerce', 'Mobile Games', 'Enterprise Apps'],
      pricing: 'db.t3.micro at $0.017/hour with 20GB storage included in free tier'
    },
    {
      name: 'DynamoDB',
      icon: '⚙️',
      category: 'Database',
      description: 'Fully managed NoSQL database with single-digit millisecond performance at any scale',
      detailedDescription: 'Amazon DynamoDB is a key-value and document database delivering consistent performance at any scale. Built-in security, backup and restore, and in-memory caching. Serverless with automatic scaling, global tables for multi-region replication.',
      keyFeatures: ['Single-Digit MS Latency', 'Auto Scaling', 'Global Tables', 'DynamoDB Streams'],
      useCases: ['Gaming Leaderboards', 'Shopping Carts', 'Mobile Apps', 'IoT Applications'],
      pricing: 'Free tier: 25GB storage, 25 WCU, 25 RCU. On-demand: $1.25/million writes, $0.25/million reads'
    },
    {
      name: 'VPC',
      icon: '🌐',
      category: 'Networking',
      description: 'Virtual Private Cloud - Isolated virtual network where you can launch AWS resources with complete control',
      detailedDescription: 'Amazon VPC lets you provision a logically isolated section of AWS Cloud. Define your own IP address range, create subnets, configure route tables, and network gateways. Connect to on-premises networks via VPN or Direct Connect.',
      keyFeatures: ['Private Subnets', 'Security Groups', 'Network ACLs', 'VPN & Direct Connect'],
      useCases: ['Hybrid Cloud', 'Multi-tier Web Apps', 'Secure Applications', 'Disaster Recovery'],
      pricing: 'No charge for VPC itself. Pay for NAT Gateway ($0.045/hour), VPN ($0.05/hour), and data transfer'
    },
    {
      name: 'ECS',
      icon: '🐳',
      category: 'Containers',
      description: 'Elastic Container Service - Fully managed container orchestration service for Docker containers',
      detailedDescription: 'Amazon ECS is highly scalable, fast container management service. Launch and stop Docker containers with simple API calls. Integrate with ELB, CloudWatch, IAM, and VPC. Choose EC2 launch type for control or Fargate for serverless.',
      keyFeatures: ['AWS Fargate Support', 'Service Auto Scaling', 'ELB Integration', 'Task Definitions'],
      useCases: ['Microservices', 'Batch Processing', 'ML Training', 'Web Applications'],
      pricing: 'No additional charge for ECS. Pay for AWS resources (EC2, EBS). Fargate: $0.04048/vCPU/hour'
    },
    {
      name: 'SNS',
      icon: '📨',
      category: 'Messaging',
      description: 'Simple Notification Service - Fully managed pub/sub messaging and mobile push notification service',
      detailedDescription: 'Amazon SNS enables application-to-application (A2A) and application-to-person (A2P) messaging. Fan-out messages to multiple subscribers including SQS, Lambda, HTTP endpoints, email, and SMS. Message filtering and delivery retries.',
      keyFeatures: ['Fan-out Pattern', 'Message Filtering', 'SMS & Email', 'Mobile Push Notifications'],
      useCases: ['Event Notifications', 'Alert Systems', 'Workflow Systems', 'Mobile Engagement'],
      pricing: 'Free tier: 1M publishes, 1M notifications. Then $0.50 per 1M requests'
    },
    {
      name: 'SQS',
      icon: '📬',
      category: 'Messaging',
      description: 'Simple Queue Service - Fully managed message queuing service for decoupling microservices',
      detailedDescription: 'Amazon SQS offers unlimited throughput, storing messages reliably. Standard queues provide best-effort ordering, FIFO queues ensure exactly-once processing. Long polling, dead-letter queues, and message retention up to 14 days.',
      keyFeatures: ['Standard & FIFO Queues', 'Dead Letter Queues', 'Long Polling', '14-day Retention'],
      useCases: ['Decoupling Microservices', 'Job Queues', 'Order Processing', 'Buffer Requests'],
      pricing: 'Free tier: 1M requests/month. Standard: $0.40/million requests, FIFO: $0.50/million'
    },
    {
      name: 'CloudWatch',
      icon: '📊',
      category: 'Monitoring',
      description: 'Comprehensive monitoring and observability service for AWS resources and applications',
      detailedDescription: 'Amazon CloudWatch collects and tracks metrics, monitors log files, sets alarms, and automatically reacts to changes. Get system-wide visibility with unified view of AWS resources, applications, and services running on AWS and on-premises.',
      keyFeatures: ['Metrics & Alarms', 'Log Aggregation', 'Dashboards', 'Events & Insights'],
      useCases: ['Resource Monitoring', 'Application Performance', 'Log Analysis', 'Anomaly Detection'],
      pricing: 'Free tier: 10 metrics, 10 alarms, 5GB log ingestion. Metrics: $0.30/metric/month'
    },
    {
      name: 'IAM',
      icon: '🔐',
      category: 'Security',
      description: 'Identity and Access Management - Securely manage access to AWS services and resources',
      detailedDescription: 'AWS IAM enables secure control over access to AWS resources. Create and manage users, groups, and roles with fine-grained permissions. Enable MFA, temporary security credentials, and identity federation with SAML 2.0 and OIDC.',
      keyFeatures: ['Users & Groups', 'IAM Roles', 'MFA Support', 'Policy-Based Access'],
      useCases: ['Access Control', 'Federated Access', 'Cross-Account Access', 'Service Permissions'],
      pricing: 'Free - No additional charge for IAM'
    },
    {
      name: 'API Gateway',
      icon: '🚪',
      category: 'Application Integration',
      description: 'Fully managed service to create, publish, maintain, monitor, and secure APIs at any scale',
      detailedDescription: 'Amazon API Gateway handles all tasks involved in accepting and processing up to hundreds of thousands of concurrent API calls. Traffic management, authorization, access control, monitoring, and API version management. Integrate with Lambda, EC2, and other AWS services.',
      keyFeatures: ['REST & WebSocket APIs', 'API Keys & Throttling', 'Request Validation', 'Usage Plans'],
      useCases: ['Serverless APIs', 'Microservices', 'Mobile Backends', 'API Monetization'],
      pricing: 'Free tier: 1M API calls/month for 12 months. Then $3.50 per million API calls'
    },
    {
      name: 'EKS',
      icon: '☸️',
      category: 'Containers',
      description: 'Fully managed Kubernetes service that makes it easy to run Kubernetes on AWS without managing control plane',
      detailedDescription: 'Amazon EKS runs the Kubernetes control plane across multiple AWS availability zones. Automatically detects and replaces unhealthy control plane nodes. Integrates with AWS services like ELB, IAM, VPC, and CloudWatch. Supports EC2, Fargate, and Outposts deployment options.',
      keyFeatures: ['Managed Control Plane', 'Fargate Integration', 'EKS Anywhere', 'Auto Mode (Preview)'],
      useCases: ['Containerized Applications', 'Hybrid Deployments', 'Machine Learning', 'Batch Processing'],
      pricing: '$0.10 per hour per cluster + EC2/Fargate pricing for worker nodes'
    },
    {
      name: 'Kinesis',
      icon: '🌊',
      category: 'Analytics',
      description: 'Real-time streaming data platform for ingesting and processing data at any scale',
      detailedDescription: 'Amazon Kinesis makes it easy to collect, process, and analyze streaming data in real-time. Kinesis Data Streams for custom applications, Kinesis Data Firehose for loading into AWS data stores, Kinesis Data Analytics for SQL queries on streams, and Kinesis Video Streams for video processing.',
      keyFeatures: ['Real-time Processing', 'Auto-Scaling', 'Replay Capability', 'Enhanced Fan-Out'],
      useCases: ['Real-time Analytics', 'Log Processing', 'IoT Data Streams', 'Clickstream Analysis'],
      pricing: 'Data Streams: $0.015/shard-hour + $0.014/million PUT units. Firehose: $0.029/GB ingested'
    },
    {
      name: 'ElastiCache',
      icon: '⚡',
      category: 'Database',
      description: 'Fully managed in-memory caching service supporting Redis and Memcached',
      detailedDescription: 'Amazon ElastiCache offers fully managed Redis and Memcached for microsecond latency and high throughput. Automatic failover, backup and restore, and cross-region replication. Redis supports data structures, pub/sub, and Lua scripting. Memcached for simple caching use cases.',
      keyFeatures: ['Redis & Memcached', 'Auto Failover', 'Backup & Restore', 'Global Datastore'],
      useCases: ['Session Management', 'Real-time Analytics', 'Leaderboards', 'Database Caching'],
      pricing: 'cache.t3.micro: $0.017/hour. cache.r6g.large: $0.177/hour + data transfer'
    },
    {
      name: 'Step Functions',
      icon: '🔄',
      category: 'Application Integration',
      description: 'Visual workflow service to coordinate distributed applications and microservices',
      detailedDescription: 'AWS Step Functions coordinates multiple AWS services into serverless workflows. Build applications using visual workflows with automatic error handling, retry logic, and parallel execution. Supports Standard (long-running) and Express (high-volume, short duration) workflows.',
      keyFeatures: ['Visual Workflow Designer', 'Error Handling', 'Standard & Express Workflows', 'AWS Service Integration'],
      useCases: ['Order Processing', 'ETL Jobs', 'Machine Learning Pipelines', 'Microservices Orchestration'],
      pricing: 'Standard: $25 per million state transitions. Express: $1 per million requests + duration'
    },
    {
      name: 'Aurora',
      icon: '🌅',
      category: 'Database',
      description: 'MySQL and PostgreSQL-compatible relational database with 5x performance improvement',
      detailedDescription: 'Amazon Aurora is a cloud-native database that combines performance and availability of commercial databases at 1/10th the cost. Up to 128TB auto-scaling storage, 15 read replicas, global database for cross-region replication, and serverless v2 for automatic scaling.',
      keyFeatures: ['5x MySQL, 3x PostgreSQL Speed', 'Serverless v2', 'Global Database', '15 Read Replicas'],
      useCases: ['Enterprise Applications', 'SaaS Applications', 'Gaming Backends', 'Multi-tenant Apps'],
      pricing: 'Serverless: $0.12/ACU-hour + storage. Provisioned: db.r6g.large at $0.29/hour'
    },
    {
      name: 'Athena',
      icon: '🔍',
      category: 'Analytics',
      description: 'Serverless interactive query service to analyze data in S3 using standard SQL',
      detailedDescription: 'Amazon Athena is an interactive query service that makes it easy to analyze data directly in S3 using standard SQL. No infrastructure to manage, pay per query. Supports CSV, JSON, Parquet, ORC, and Avro formats. Integrate with QuickSight for visualization.',
      keyFeatures: ['Serverless SQL Queries', 'ANSI SQL Support', 'Partition Projection', 'Federated Queries'],
      useCases: ['Log Analysis', 'Ad-Hoc Queries', 'Data Lake Analytics', 'Business Intelligence'],
      pricing: '$5 per TB of data scanned. Compressed and columnar formats reduce costs'
    },
    {
      name: 'Cognito',
      icon: '👤',
      category: 'Security',
      description: 'User authentication and authorization service with support for social and enterprise identity providers',
      detailedDescription: 'Amazon Cognito provides authentication, authorization, and user management for web and mobile apps. User pools for sign-up/sign-in, identity pools for AWS access, support for SAML, OAuth 2.0, and social providers (Google, Facebook, Amazon). Advanced security features include adaptive authentication and compromised credentials checking.',
      keyFeatures: ['User & Identity Pools', 'Multi-Factor Auth', 'Social Identity Providers', 'Advanced Security'],
      useCases: ['Mobile Apps', 'Web Applications', 'B2C Identity', 'Serverless Apps'],
      pricing: 'Free tier: 50,000 MAUs. Then $0.0055/MAU for user pools'
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)',
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
        borderBottom: '3px solid #FF9900',
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
              Amazon Web Services (AWS)
            </h1>
            {currentSubcategory && (
              <span style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                backgroundColor: '#374151',
                color: '#9ca3af',
                borderRadius: '6px',
                marginTop: '0.25rem',
                display: 'inline-block'
              }}>
                {currentSubcategory}
              </span>
            )}
            <p style={{
              margin: '0.5rem 0 0 0',
              color: '#9ca3af',
              fontSize: '1.1rem'
            }}>
              Cloud computing platform with 200+ services
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
              backgroundColor: selectedService === service.name ? '#2d3748' : '#1f2937',
              border: `2px solid ${selectedService === service.name ? '#FF9900' : '#374151'}`,
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: selectedService === service.name
                ? '0 8px 16px rgba(255, 153, 0, 0.2)'
                : '0 2px 4px rgba(0,0,0,0.2)',
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
                  color: 'white'
                }}>
                  {service.name}
                </h3>
                <span style={{
                  fontSize: '0.75rem',
                  color: '#FF9900',
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
              color: '#9ca3af',
              fontSize: '0.9rem',
              lineHeight: '1.5'
            }}>
              {service.description}
            </p>

            {selectedService === service.name && (
              <div style={{
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '2px solid #374151'
              }}>
                <p style={{
                  margin: '0 0 1rem 0',
                  color: '#9ca3af',
                  fontSize: '0.9rem',
                  lineHeight: '1.6'
                }}>
                  {service.detailedDescription}
                </p>

                <h4 style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Key Features
                </h4>
                <ul style={{
                  margin: '0 0 1rem 0',
                  paddingLeft: '1.25rem',
                  color: '#9ca3af',
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
                  color: 'white',
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
                      backgroundColor: '#FF990033',
                      color: '#FF9900',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      borderRadius: '12px',
                      border: '1px solid #FF990066'
                    }}>
                      {useCase}
                    </span>
                  ))}
                </div>

                <h4 style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: 'white',
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
        backgroundColor: '#1f2937',
        borderRadius: '12px',
        borderLeft: '4px solid #FF9900',
        border: '1px solid #374151'
      }}>
        <h3 style={{
          margin: '0 0 0.75rem 0',
          fontSize: '1.1rem',
          fontWeight: '700',
          color: 'white'
        }}>
          About AWS
        </h3>
        <p style={{
          margin: 0,
          color: '#9ca3af',
          fontSize: '0.95rem',
          lineHeight: '1.6'
        }}>
          Amazon Web Services (AWS) is the world's most comprehensive and broadly adopted cloud platform,
          offering over 200 fully featured services from data centers globally. Millions of customers—including
          the fastest-growing startups, largest enterprises, and leading government agencies—use AWS to lower costs,
          become more agile, and innovate faster.
        </p>
      </div>
    </div>
    </div>
  )
}

export default AWS

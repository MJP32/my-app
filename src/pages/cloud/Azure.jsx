import Breadcrumb from '../../components/Breadcrumb'
import { useState } from 'react'

function Azure({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedService, setSelectedService] = useState(null)

  const services = [
    {
      name: 'Virtual Machines',
      icon: '🖥️',
      category: 'Compute',
      description: 'Scalable, on-demand computing resources with comprehensive support for Linux and Windows workloads',
      detailedDescription: 'Azure Virtual Machines provide the flexibility of virtualization without the overhead of physical hardware. Choose from 700+ VM sizes across general purpose, compute optimized, memory optimized, storage optimized, GPU, and HPC categories. Features Azure Hybrid Benefit for Windows Server and SQL Server licenses.',
      keyFeatures: ['700+ VM Sizes', 'Availability Zones', 'VM Scale Sets', 'Azure Spot VMs (90% discount)'],
      useCases: ['Enterprise Applications', 'Dev/Test Environments', 'SAP Workloads', 'High-Performance Computing'],
      pricing: 'B1s (1 vCPU, 1GB RAM) at $0.0104/hour. Pay-as-you-go or reserved instances (up to 72% savings)'
    },
    {
      name: 'Blob Storage',
      icon: '📦',
      category: 'Storage',
      description: 'Massively scalable object storage for unstructured data with intelligent tiering',
      detailedDescription: 'Azure Blob Storage is optimized for storing massive amounts of unstructured data including text and binary data. Supports hot, cool, and archive access tiers with automatic lifecycle management. Data Lake Storage Gen2 combines file system semantics with Blob storage scale and pricing.',
      keyFeatures: ['Hot/Cool/Archive Tiers', 'Lifecycle Management', 'Immutable Storage', 'Change Feed'],
      useCases: ['Data Lakes', 'Backup & Disaster Recovery', 'Media Streaming', 'Machine Learning'],
      pricing: 'Hot: $0.0184/GB, Cool: $0.01/GB, Archive: $0.00099/GB per month'
    },
    {
      name: 'Azure Functions',
      icon: '⚡',
      category: 'Compute',
      description: 'Event-driven serverless compute that scales automatically and only charges for compute time used',
      detailedDescription: 'Azure Functions executes code in response to triggers including HTTP requests, timers, queue messages, and database changes. Supports C#, Java, JavaScript, TypeScript, Python, and PowerShell. Durable Functions provides stateful workflows. Premium plan offers VNet integration and unlimited execution time.',
      keyFeatures: ['Consumption Plan', 'Durable Functions', 'KEDA Scaling', 'Premium Plan with VNet'],
      useCases: ['Webhooks', 'File Processing', 'IoT Data Processing', 'Scheduled Tasks'],
      pricing: 'First 1M executions free, then $0.20/million executions + $0.000016/GB-s'
    },
    {
      name: 'Azure SQL Database',
      icon: '🗄️',
      category: 'Database',
      description: 'Intelligent, fully managed relational database with AI-powered optimization and built-in security',
      detailedDescription: 'Azure SQL Database is a fully managed PaaS database engine with 99.99% SLA. AI-powered automatic tuning, threat detection, and vulnerability assessments. Hyperscale tier supports up to 100TB databases. Serverless compute tier auto-pauses during inactivity. Built-in high availability and backups.',
      keyFeatures: ['Auto-Tuning & Threat Detection', 'Hyperscale (100TB)', 'Serverless Compute', 'Active Geo-Replication'],
      useCases: ['Modern Cloud Applications', 'SaaS Applications', 'Business Intelligence', 'Data Warehousing'],
      pricing: 'Serverless: $0.000145/vCore-second when active. Basic: $4.90/month. General Purpose: from $0.54/hour'
    },
    {
      name: 'Cosmos DB',
      icon: '🌍',
      category: 'Database',
      description: 'Globally distributed, multi-model NoSQL database with guaranteed low latency and five consistency levels',
      detailedDescription: 'Azure Cosmos DB is Microsoft\'s proprietary globally-distributed database service with turnkey global distribution. Supports multiple data models (document, key-value, graph, column-family) through multiple APIs (SQL, MongoDB, Cassandra, Gremlin, Table). Offers industry-leading SLAs for latency, throughput, consistency, and availability.',
      keyFeatures: ['Global Distribution', 'Multi-API Support', 'Five Consistency Levels', 'Serverless & Autoscale'],
      useCases: ['Real-time Applications', 'IoT & Telemetry', 'Personalization Engines', 'Gaming Leaderboards'],
      pricing: 'Serverless: $0.28/million RUs + $0.25/GB storage. Provisioned: $0.00008/RU-hour'
    },
    {
      name: 'AKS',
      icon: '☸️',
      category: 'Containers',
      description: 'Fully managed Kubernetes service with simplified deployment and management',
      detailedDescription: 'Azure Kubernetes Service (AKS) simplifies deploying managed Kubernetes clusters. Integrated with Azure DevOps, Azure Active Directory, and Azure Monitor. Features Virtual Nodes for burst scaling using Azure Container Instances, Azure Policy integration, and open-source GitOps with Flux.',
      keyFeatures: ['Free Control Plane', 'Virtual Nodes (ACI)', 'Azure Policy Integration', 'GitOps with Flux'],
      useCases: ['Microservices Architecture', 'Machine Learning Pipelines', 'Batch Processing', 'Event-Driven Apps'],
      pricing: 'Free cluster management. Pay only for agent node VMs, storage, and networking'
    },
    {
      name: 'Service Bus',
      icon: '📨',
      category: 'Integration',
      description: 'Reliable cloud messaging service for simple hybrid integration and decoupling applications',
      detailedDescription: 'Azure Service Bus is a fully managed enterprise message broker with message queues and publish-subscribe topics. Supports AMQP, JMS 2.0, and HTTP/REST. Features message sessions, dead-lettering, scheduled delivery, duplicate detection, and transactions. Premium tier offers dedicated resources and VNet integration.',
      keyFeatures: ['FIFO Guarantees', 'Transaction Support', 'Duplicate Detection', 'Premium with VNet'],
      useCases: ['Order Processing', 'Financial Transactions', 'Decoupling Applications', 'Load Leveling'],
      pricing: 'Basic: $0.05/million operations. Standard: $10/month + $0.80/million ops. Premium: $667.35/month'
    },
    {
      name: 'Event Grid',
      icon: '📡',
      category: 'Integration',
      description: 'Intelligent event routing service with reactive programming model using publish-subscribe',
      detailedDescription: 'Azure Event Grid simplifies event-based applications with reliable event delivery at massive scale. Built-in events from Azure services (Blob Storage, Resource Groups, Event Hubs). Advanced filtering for routing events to different endpoints. CloudEvents 1.0 schema support. Sub-second delivery latency.',
      keyFeatures: ['Advanced Filtering', 'CloudEvents Schema', 'Dead-Lettering', 'Event Domains'],
      useCases: ['Serverless Architectures', 'Ops Automation', 'Application Integration', 'Event-Driven Workflows'],
      pricing: 'First 100,000 operations/month free, then $0.60 per million operations'
    },
    {
      name: 'App Service',
      icon: '🌐',
      category: 'Web',
      description: 'Fully managed platform for building, deploying, and scaling web apps with built-in DevOps',
      detailedDescription: 'Azure App Service enables you to build and host web apps, mobile backends, and RESTful APIs. Supports .NET, Java, Node.js, Python, PHP, and containers. Built-in authentication, autoscaling, deployment slots for staging, and integration with Azure DevOps and GitHub Actions. App Service Environment for isolated, high-scale scenarios.',
      keyFeatures: ['Built-in CI/CD', 'Deployment Slots', 'Auto Scaling', 'Custom Domains & SSL'],
      useCases: ['Web Applications', 'REST APIs', 'Mobile Backends', 'Microservices'],
      pricing: 'Free tier: 10 apps, 1GB storage. Basic B1: $0.075/hour. Premium P1V3: $0.223/hour'
    },
    {
      name: 'Azure Monitor',
      icon: '📊',
      category: 'Management',
      description: 'Comprehensive monitoring solution for maximizing availability and performance',
      detailedDescription: 'Azure Monitor collects, analyzes, and acts on telemetry from cloud and on-premises environments. Application Insights provides APM for developers. Log Analytics workspace for querying and analyzing log data. Workbooks for data visualization. Action groups for automated responses to alerts.',
      keyFeatures: ['Application Insights', 'Log Analytics', 'Workbooks & Dashboards', 'Smart Alerts'],
      useCases: ['Application Performance Monitoring', 'Infrastructure Monitoring', 'Log Analytics', 'Capacity Planning'],
      pricing: 'First 5GB/month free. Then $2.76/GB for Log Analytics ingestion'
    },
    {
      name: 'Azure AD',
      icon: '🔐',
      category: 'Security',
      description: 'Enterprise identity service providing SSO, multi-factor authentication, and conditional access',
      detailedDescription: 'Azure Active Directory (Azure AD) is Microsoft\'s cloud-based identity and access management service. Provides SSO to thousands of SaaS applications. Multi-factor authentication, conditional access policies, and identity protection. B2B for partner access, B2C for customer identity. Integration with Windows, Office 365, and Azure services.',
      keyFeatures: ['Single Sign-On', 'Multi-Factor Auth', 'Conditional Access', 'Identity Protection'],
      useCases: ['Enterprise SSO', 'Zero Trust Security', 'B2B Collaboration', 'Customer Identity (B2C)'],
      pricing: 'Free tier included. Premium P1: $6/user/month. Premium P2: $9/user/month'
    },
    {
      name: 'API Management',
      icon: '🚪',
      category: 'Integration',
      description: 'Full lifecycle API management platform to publish, secure, and analyze APIs',
      detailedDescription: 'Azure API Management provides a complete platform for publishing, securing, transforming, maintaining, and monitoring APIs. Developer portal for API discovery and testing. Policy-based transformations including rate limiting, caching, and request/response manipulation. Self-hosted gateway for hybrid and multi-cloud scenarios. Built-in OAuth 2.0 and Azure AD integration.',
      keyFeatures: ['Developer Portal', 'Policy-Based Transformations', 'OAuth & Azure AD', 'Self-Hosted Gateway'],
      useCases: ['API Monetization', 'Legacy System Integration', 'Microservices Gateway', 'Partner APIs'],
      pricing: 'Consumption: $5/million calls + $0.03/GB. Developer: $49.70/month. Premium: $2,795.50/month'
    },
    {
      name: 'Container Apps',
      icon: '📦',
      category: 'Containers',
      description: 'Fully managed serverless container service with built-in autoscaling and traffic splitting',
      detailedDescription: 'Azure Container Apps runs microservices and containerized applications on a serverless platform. Built on Kubernetes and open-source technologies like Dapr, KEDA, and Envoy. Scale to zero capability, integrated ingress and service discovery, and support for both HTTP and event-driven workloads.',
      keyFeatures: ['Scale to Zero', 'KEDA Autoscaling', 'Dapr Integration', 'Revisions & Traffic Splitting'],
      useCases: ['API Endpoints', 'Background Processing', 'Event-Driven Apps', 'Microservices'],
      pricing: 'vCPU: $0.000024/second. Memory: $0.000002375/GiB-second. First 180,000 vCPU-seconds free'
    },
    {
      name: 'Logic Apps',
      icon: '🔄',
      category: 'Integration',
      description: 'Automated workflows and business process integration with 400+ connectors',
      detailedDescription: 'Azure Logic Apps automates workflows and integrates apps, data, services, and systems. Visual designer with 400+ pre-built connectors for SaaS, on-premises, and custom APIs. Supports standard workflows (code-centric) and consumption workflows (visual designer). Built-in enterprise integration for B2B scenarios.',
      keyFeatures: ['400+ Connectors', 'Visual Designer', 'Enterprise Integration', 'Stateful & Stateless'],
      useCases: ['Enterprise Integration', 'B2B Workflows', 'Data Synchronization', 'Automated Tasks'],
      pricing: 'Consumption: $0.000125/action. Standard: $0.21/workflow/day + execution costs'
    },
    {
      name: 'SignalR Service',
      icon: '📡',
      category: 'Web',
      description: 'Real-time messaging service for building responsive web applications',
      detailedDescription: 'Azure SignalR Service simplifies adding real-time web functionality. Supports WebSocket, Server-Sent Events, and long polling. Automatic scaling to handle millions of connections. Built-in authentication via Azure AD. Integrate with Azure Functions for serverless real-time apps.',
      keyFeatures: ['WebSocket Support', 'Auto-Scaling', 'Serverless Mode', 'Azure AD Integration'],
      useCases: ['Chat Applications', 'Live Dashboards', 'Notifications', 'Collaborative Tools'],
      pricing: 'Free tier: 20 units/day, 20K messages. Standard: $49.72/unit/month + messages'
    },
    {
      name: 'Redis Cache',
      icon: '⚡',
      category: 'Database',
      description: 'Enterprise-grade Redis caching service with high throughput and low latency',
      detailedDescription: 'Azure Cache for Redis provides fully managed Redis with enterprise features. Supports OSS Redis, Redis Enterprise, and Redis Enterprise Flash. Active geo-replication across regions, zone redundancy for high availability, and Redis modules (RedisJSON, RedisBloom, RedisTimeSeries, RedisSearch).',
      keyFeatures: ['Redis Enterprise', 'Geo-Replication', 'Zone Redundancy', 'Redis Modules'],
      useCases: ['Session Caching', 'Content Caching', 'Real-time Analytics', 'Message Queuing'],
      pricing: 'Basic C0 (250MB): $16.80/month. Standard C6 (53GB): $1,002.60/month. Premium available'
    },
    {
      name: 'Data Factory',
      icon: '🏭',
      category: 'Analytics',
      description: 'Hybrid data integration service to orchestrate and automate data movement and transformation',
      detailedDescription: 'Azure Data Factory is a cloud-based ETL and data integration service. Create, schedule, and orchestrate data workflows at scale. Connect to 90+ data sources with native connectors. Mapping data flows for code-free transformations, and integration runtime for hybrid scenarios.',
      keyFeatures: ['90+ Connectors', 'Visual ETL Designer', 'Mapping Data Flows', 'Hybrid Integration Runtime'],
      useCases: ['Data Migration', 'ETL Pipelines', 'Data Warehousing', 'Big Data Processing'],
      pricing: 'Orchestration: $1/1,000 activity runs. Data movement: $0.25/DIU-hour. Mapping flows: $0.274/vCore-hour'
    },
    {
      name: 'Synapse Analytics',
      icon: '📊',
      category: 'Analytics',
      description: 'Limitless analytics service combining enterprise data warehousing and big data analytics',
      detailedDescription: 'Azure Synapse brings together data integration, enterprise data warehousing, and big data analytics. Unified experience for ingesting, preparing, managing, and serving data. Serverless and dedicated resource models, integrated Apache Spark, and SQL engines. Built-in Power BI and machine learning.',
      keyFeatures: ['Unified Workspace', 'Serverless SQL', 'Apache Spark Pools', 'Data Lake Integration'],
      useCases: ['Data Warehousing', 'Big Data Processing', 'Real-time Analytics', 'Machine Learning'],
      pricing: 'Serverless SQL: $5/TB processed. Dedicated pool: DW100c at $1.20/hour. Apache Spark: $0.20/vCore/hour'
    },
    {
      name: 'Front Door',
      icon: '🚪',
      category: 'Networking',
      description: 'Modern cloud CDN with global load balancing and application acceleration',
      detailedDescription: 'Azure Front Door is a global, scalable entry-point leveraging Microsoft\'s global edge network. Application acceleration with anycast, SSL offload, WAF protection, and URL-based routing. Standard tier for CDN scenarios, Premium tier adds Private Link and advanced security.',
      keyFeatures: ['Global Load Balancing', 'WAF Protection', 'SSL Offload', 'Private Link (Premium)'],
      useCases: ['Global Websites', 'Application Acceleration', 'API Gateway', 'Security at Edge'],
      pricing: 'Standard: $35/month + $0.06/GB outbound. Premium: $330/month + $0.14/GB outbound'
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
        borderBottom: '3px solid #0078D4',
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
              fontSize: '2.5rem',
              fontWeight: '800',
              background: 'linear-gradient(to right, #7dd3fc, #38bdf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              ☁️ Microsoft Azure
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

      <p style={{
        fontSize: '1.2rem',
        color: '#4b5563',
        textAlign: 'center',
        marginBottom: '2rem',
        lineHeight: '1.8'
      }}>
        Invent with purpose using Microsoft's cloud platform
      </p>

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
              backgroundColor: selectedService === service.name ? '#F0F6FF' : 'white',
              border: `2px solid ${selectedService === service.name ? '#0078D4' : '#e5e7eb'}`,
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: selectedService === service.name
                ? '0 8px 16px rgba(0, 120, 212, 0.2)'
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
                  color: '#0078D4'
                }}>
                  {service.name}
                </h3>
                <span style={{
                  fontSize: '0.75rem',
                  color: '#50E6FF',
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
                borderTop: '2px solid #0078D433'
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
                  color: '#0078D4',
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
                  color: '#0078D4',
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
                      backgroundColor: '#0078D422',
                      color: '#0078D4',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      borderRadius: '12px',
                      border: '1px solid #0078D444'
                    }}>
                      {useCase}
                    </span>
                  ))}
                </div>

                <h4 style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: '#0078D4',
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
        backgroundColor: '#F5F5F5',
        borderRadius: '12px',
        borderLeft: '4px solid #0078D4'
      }}>
        <h3 style={{
          margin: '0 0 0.75rem 0',
          fontSize: '1.1rem',
          fontWeight: '700',
          color: '#0078D4'
        }}>
          About Microsoft Azure
        </h3>
        <p style={{
          margin: 0,
          color: '#666',
          fontSize: '0.95rem',
          lineHeight: '1.6'
        }}>
          Microsoft Azure is a cloud computing platform with an ever-expanding set of services to help you
          build solutions to meet your business goals. Azure services support everything from simple to complex,
          offering tools for compute, storage, networking, AI, IoT, and more. With Azure, you can build, run,
          and manage applications across multiple clouds, on-premises, and at the edge with the tools and
          frameworks of your choice.
        </p>
      </div>
      </div>
    </div>
  )
}

export default Azure

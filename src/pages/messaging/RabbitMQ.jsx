import { useState, useEffect } from 'react'

function RabbitMQ({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory }) {
  const [selectedConcept, setSelectedConcept] = useState(null)

  // Handle Escape key for modal navigation
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation() // Prevent event from reaching parent handlers

        if (selectedConcept) {
          // If viewing a concept, go back to concept list
          setSelectedConcept(null)
        } else {
          // If on concept list, close the modal
          onBack()
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [selectedConcept, onBack])

  const concepts = [
    {
      id: 'broker',
      name: 'RabbitMQ Broker',
      icon: '🐰',
      color: '#10b981',
      description: 'Reliable, scalable message broker implementing AMQP protocol with support for multiple messaging patterns, high availability clustering, and enterprise-grade features',
      details: [
        {
          name: 'Connection Management',
          explanation: 'Configure connection factory with host, port, credentials, and virtual host. Connection pooling with automatic recovery enabled. Set connection timeout, heartbeat interval, and network recovery settings. Create named connections for better monitoring. Channel management for publishing and consuming. Resource lifecycle tracking and graceful shutdown.'
        },
        {
          name: 'Publisher Confirms',
          explanation: 'Enable publisher confirms for guaranteed message delivery. Broker acknowledges message receipt. Wait for confirmations synchronously or handle asynchronously. Track message delivery with correlation IDs. Batch confirmations for high throughput. Retry logic for failed publishes. Transaction support for atomic operations.'
        },
        {
          name: 'High Availability',
          explanation: 'Connect to multiple broker addresses for failover. Primary and backup broker configuration. Automatic reconnection on connection loss. Topology recovery reapplies exchanges, queues, and bindings. Network partition handling. Zero downtime during broker restarts. Client-side load balancing across cluster nodes.'
        }
      ]
    },
    {
      id: 'exchanges',
      name: 'Exchanges',
      icon: '🔄',
      color: '#3b82f6',
      description: 'Message routing engines supporting direct, topic, fanout, and headers exchange types for flexible message distribution patterns and complex routing topologies',
      details: [
        {
          name: 'Direct Exchange',
          explanation: 'Route messages to queues based on exact routing key match. One-to-one message routing. Declare durable exchanges for persistence. Bind queues with specific routing keys. Ideal for targeted message delivery. Use for priority-based routing. Supports multiple bindings per queue for different keys.'
        },
        {
          name: 'Topic Exchange',
          explanation: 'Pattern-based routing with wildcard matching. Use * to match one word, # to match zero or more words. Hierarchical routing keys (e.g., kern.error, app.info). Multiple consumers with different pattern subscriptions. Flexible pub/sub patterns. Dynamic routing based on message characteristics. Log aggregation and event streaming.'
        },
        {
          name: 'Fanout Exchange',
          explanation: 'Broadcast messages to all bound queues. Routing key is ignored. Perfect for pub/sub scenarios. All subscribers receive all messages. Use for notifications, alerts, cache invalidation. Fan-out pattern for parallel processing. Duplicate messages across multiple consumers for redundancy.'
        },
        {
          name: 'Headers Exchange',
          explanation: 'Route based on message header attributes instead of routing key. Match any header (x-match: any) or all headers (x-match: all). Complex routing rules with multiple conditions. Content-based routing. Metadata-driven message distribution. Flexible routing without key constraints.'
        }
      ]
    },
    {
      id: 'queues',
      name: 'Queues',
      icon: '📥',
      color: '#8b5cf6',
      description: 'Message storage and delivery with durable persistence, priority support, consumer acknowledgments, and quality-of-service controls for reliable message processing',
      details: [
        {
          name: 'Durable Queues',
          explanation: 'Queues survive broker restarts when declared durable. Persistent messages stored to disk. Configure message TTL for automatic expiration. Set max queue length to prevent overflow. Lazy mode for large queues stores messages on disk. Priority levels (0-255) for message ordering. Auto-delete queues removed when unused.'
        },
        {
          name: 'Consumer Acknowledgment',
          explanation: 'Manual acknowledgment ensures reliable message processing. Prefetch count (QoS) controls concurrent message delivery. basicAck confirms successful processing. basicNack rejects with optional requeue. Multiple acknowledgment for batch processing. Unacked messages redelivered on consumer failure. Auto-ack for high-throughput scenarios.'
        },
        {
          name: 'Priority Queues',
          explanation: 'Define max priority level when declaring queue (0-255). Publish messages with priority property. Higher priority messages consumed first. Balance priority with fairness. Use for urgent task processing. SLA-based message handling. Emergency notification delivery. Limited performance impact with proper tuning.'
        },
        {
          name: 'Dead Letter Exchanges',
          explanation: 'Route rejected or expired messages to dead letter exchange. Configure x-dead-letter-exchange argument on queue. Capture failed processing attempts. Implement retry logic with delayed requeue. Analyze problematic messages. Prevent poison message blocking. Track message rejection reasons in headers.'
        }
      ]
    },
    {
      id: 'bindings',
      name: 'Bindings',
      icon: '🔗',
      color: '#3b82f6',
      description: 'Flexible routing configuration connecting exchanges to queues with pattern-based, header-based, or direct routing rules that can be dynamically managed at runtime',
      details: [
        {
          name: 'Queue Bindings',
          explanation: 'Bind queues to exchanges with routing keys or patterns. Multiple bindings per queue for different routing rules. Exchange-to-exchange bindings for complex topologies. Dynamic binding creation and removal at runtime. Topic patterns with wildcards (* and #). Direct bindings for specific keys. Fanout bindings ignore routing keys.'
        },
        {
          name: 'Dynamic Routing',
          explanation: 'Add or remove bindings without restarting broker. Runtime topology changes for flexible routing. Bind and unbind operations via API or management UI. Support for A/B testing and canary deployments. Temporary bindings for ad-hoc consumers. Version-based routing for service upgrades. Blue-green deployment support.'
        },
        {
          name: 'Routing Patterns',
          explanation: 'Topic exchange supports hierarchical patterns. Use dots to separate routing key segments. Wildcard * matches exactly one word. Wildcard # matches zero or more words. Example: logs.*.error, events.orders.#. Multiple patterns per binding. Combine patterns for complex routing logic.'
        }
      ]
    },
    {
      id: 'clustering',
      name: 'Clustering',
      icon: '🔧',
      color: '#ef4444',
      description: 'Distributed cluster architecture with quorum queues, mirrored queues, automatic failover, and Raft-based consensus for high availability and data safety across multiple nodes',
      details: [
        {
          name: 'Cluster Formation',
          explanation: 'Multiple RabbitMQ nodes form a single logical broker. Nodes share users, virtual hosts, exchanges, and bindings. Erlang clustering for node communication. Automatic node discovery with plugins. Client connects to any node in cluster. Load distribution across nodes. Network partition handling strategies.'
        },
        {
          name: 'Quorum Queues',
          explanation: 'Replicated queues using Raft consensus protocol. Replicate to majority of nodes for data safety. Automatic leader election on node failure. Poison message handling with delivery limits. At-least-once delivery guarantees. No message loss on node failures. Better than classic mirrored queues. Recommended for critical workloads.'
        },
        {
          name: 'Mirrored Queues (Classic HA)',
          explanation: 'Legacy HA with master-mirror replication. Configure via policies (ha-mode: all, exactly, nodes). Automatic synchronization of new mirrors. Master failover promotes mirror. Synchronous replication for consistency. Performance impact with many mirrors. Use quorum queues for new deployments. Policy-based HA configuration.'
        },
        {
          name: 'Federation & Shovel',
          explanation: 'Federation connects brokers across data centers. Asynchronous message replication between clusters. Shovel moves messages between queues or exchanges. Cross-region redundancy. Disaster recovery configurations. WAN-friendly message distribution. Loose coupling between geographically distributed brokers.'
        }
      ]
    },
    {
      id: 'management',
      name: 'Management & Monitoring',
      icon: '📊',
      color: '#14b8a6',
      description: 'Comprehensive web-based management interface and REST API for monitoring cluster health, managing resources, viewing metrics, and configuring policies across the broker',
      details: [
        {
          name: 'Management API',
          explanation: 'RESTful HTTP API for broker operations. Endpoints for queues, exchanges, bindings, connections. JSON responses for easy integration. Basic authentication or OAuth. List resources, get statistics, create/delete entities. Automate broker configuration. Integration with CI/CD pipelines. Programmatic policy management.'
        },
        {
          name: 'Monitoring & Metrics',
          explanation: 'Real-time metrics via management UI and API. Message rates (publish, deliver, ack). Queue depth and consumer counts. Memory and disk usage tracking. Connection and channel statistics. Prometheus exporter for metrics scraping. Alerting on thresholds (memory, disk, queue length). Grafana dashboards for visualization.'
        },
        {
          name: 'Policy Management',
          explanation: 'Define policies for automatic queue configuration. Pattern-based policy application (regex). Set HA mode, TTL, max-length, message expiry. Apply to queues or exchanges matching pattern. Runtime policy updates without queue recreation. Priority-based policy application. Operator policies override user policies. Centralized configuration management.'
        },
        {
          name: 'Health Checks',
          explanation: 'HTTP health check endpoints for load balancers. Node aliveness checks for monitoring. Cluster health status. Alarms for resource thresholds (memory, disk). Virtual host-specific health checks. Readiness and liveness probes for Kubernetes. Circuit breaker integration. Automated recovery procedures.'
        }
      ]
    }
  ]

  return (
    <div style={{ padding: '2rem', maxWidth: '1600px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onBack}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            ← Back to Menu
          </button>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#1f2937',
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              🐰 RabbitMQ
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
        marginBottom: '3rem',
        lineHeight: '1.8'
      }}>
        Robust AMQP message broker supporting multiple messaging patterns with powerful routing capabilities.
        Features exchanges, queues, and bindings for flexible message distribution, clustering for high availability,
        and comprehensive management tools for operations and monitoring.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedConcept ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {selectedConcept ? (
          <>
            {/* Sidebar */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <button
                onClick={() => setSelectedConcept(null)}
                style={{
                  padding: '0.75rem',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginBottom: '0.5rem'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
              >
                ← Back to All Concepts
              </button>
              {concepts.map((concept) => (
                <div
                  key={concept.id}
                  onClick={() => setSelectedConcept(concept)}
                  style={{
                    padding: '1rem',
                    backgroundColor: selectedConcept.id === concept.id ? concept.color + '20' : '#f9fafb',
                    border: `2px solid ${selectedConcept.id === concept.id ? concept.color : '#e5e7eb'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedConcept.id !== concept.id) {
                      e.currentTarget.style.backgroundColor = concept.color + '10'
                      e.currentTarget.style.borderColor = concept.color
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedConcept.id !== concept.id) {
                      e.currentTarget.style.backgroundColor = '#f9fafb'
                      e.currentTarget.style.borderColor = '#e5e7eb'
                    }
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{concept.icon}</div>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#1f2937'
                  }}>
                    {concept.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Main content */}
            <div>
              <div style={{
                backgroundColor: selectedConcept.color + '10',
                padding: '2rem',
                borderRadius: '12px',
                border: `3px solid ${selectedConcept.color}40`,
                marginBottom: '2rem'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{selectedConcept.icon}</div>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  {selectedConcept.name}
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#4b5563',
                  lineHeight: '1.8'
                }}>
                  {selectedConcept.description}
                </p>
              </div>

              <div style={{
                display: 'grid',
                gap: '1.5rem'
              }}>
                {selectedConcept.details.map((detail, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: 'white',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: `2px solid ${selectedConcept.color}30`,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.75rem'
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: selectedConcept.color,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        fontWeight: '700'
                      }}>
                        {index + 1}
                      </div>
                      <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        color: '#1f2937',
                        margin: 0
                      }}>
                        {detail.name}
                      </h3>
                    </div>
                    <p style={{
                      fontSize: '1rem',
                      color: '#4b5563',
                      lineHeight: '1.7',
                      margin: 0
                    }}>
                      {detail.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          concepts.map((concept) => (
            <div
              key={concept.id}
              onClick={() => setSelectedConcept(concept)}
              style={{
                backgroundColor: concept.color + '10',
                padding: '2rem',
                borderRadius: '12px',
                border: `3px solid ${concept.color}40`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{concept.icon}</div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '0.75rem'
              }}>
                {concept.name}
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#4b5563',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                {concept.description}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                color: concept.color,
                fontWeight: '600'
              }}>
                <span>Learn more</span>
                <span>→</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default RabbitMQ

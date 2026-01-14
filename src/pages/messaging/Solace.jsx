import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function Solace({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
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
      name: 'Solace Broker',
      icon: '🔥',
      color: '#10b981',
      description: 'Enterprise-grade message broker providing high-performance, reliable messaging infrastructure with built-in high availability',
      details: [
        {
          name: 'Session Management',
          explanation: 'Create and manage connections to Solace broker. Configure connection properties including host, VPN name, credentials. Session represents conversation with broker. Connection pooling for efficiency. Automatic reconnection strategies. Resource lifecycle management.'
        },
        {
          name: 'High Availability',
          explanation: 'Multiple broker URLs for failover. Primary and backup broker configuration. Automatic reconnection on failure. Reapply subscriptions after reconnect. Transparent failover for applications. Zero message loss during broker failover. Session event handlers for connection monitoring.'
        },
        {
          name: 'Performance Tuning',
          explanation: 'Configure acknowledgment window sizes for throughput. TCP no-delay for low latency. Socket buffer sizing for high-volume workloads. Message callback on reactor thread. Disable unnecessary features. Balance between latency and throughput. Optimize for specific use case.'
        }
      ]
    },
    {
      id: 'eventportal',
      name: 'Event Portal',
      icon: '🌐',
      color: '#ef4444',
      description: 'Event-driven architecture management platform for designing, documenting, and governing event streams',
      details: [
        {
          name: 'Event Catalog',
          explanation: 'Central repository for event schemas and definitions. JSON Schema, Avro, Protobuf support. Version management for schemas. Event metadata and documentation. Searchable catalog of all events. Consumer and producer discovery. API-driven schema registration.'
        },
        {
          name: 'Runtime Discovery',
          explanation: 'Automatically discover events flowing through broker. Monitor topics and payloads in real-time. Identify undocumented events. Track event publishers and consumers. Generate schema from runtime data. Visualize event flows. Alert on schema drift.'
        },
        {
          name: 'Governance & Lifecycle',
          explanation: 'Event approval workflows and policies. Ownership and responsibility assignment. Deprecation policies for old events. State management (draft, approved, deprecated). Version control and migration paths. Consumer impact analysis. Compliance and audit trails.'
        }
      ]
    },
    {
      id: 'messagevpn',
      name: 'Message VPN',
      icon: '🔐',
      color: '#3b82f6',
      description: 'Virtual private networking within Solace broker enabling multi-tenancy, security isolation, and resource management',
      details: [
        {
          name: 'VPN Configuration',
          explanation: 'Multiple isolated VPNs on single broker. Production and development separation. Per-VPN authentication and authorization. Independent message routing. Isolated message stores. Multi-tenancy for different applications. Environment segmentation.'
        },
        {
          name: 'Access Control',
          explanation: 'ACL-based permission model per VPN. Publish/subscribe permissions by topic. Client username and client name restrictions. Connection limits. Topic and queue access control. Fine-grained security policies. LDAP/Kerberos integration.'
        },
        {
          name: 'Resource Limits',
          explanation: 'Quota management per VPN. Max connections, queues, topics. Spool usage limits (disk space). Message rate throttling. Client profile settings. Prevent resource exhaustion. Fair resource allocation. Monitoring and alerting on limits.'
        }
      ]
    },
    {
      id: 'queuestopics',
      name: 'Queues & Topics',
      icon: '📬',
      color: '#8b5cf6',
      description: 'Flexible messaging patterns supporting publish-subscribe with topics and point-to-point with queues',
      details: [
        {
          name: 'Topic Publishing',
          explanation: 'Hierarchical topic structure (e.g., commerce/orders/created). Wildcards for subscriptions (* and >). Dynamic topic routing. Direct messaging pattern. Low-latency pub-sub. Fan-out to multiple subscribers. Topic-based filtering.'
        },
        {
          name: 'Queue Consumers',
          explanation: 'Durable queues for guaranteed delivery. Client acknowledgment for reliability. Flow control to prevent overwhelm. Multiple consumers for load balancing. Exclusive or non-exclusive access. Message redelivery on nack. Dead message queue for failures.'
        },
        {
          name: 'Topic to Queue Mapping',
          explanation: 'Attract topic messages to queues. Queue subscriptions to topic patterns. Convert pub-sub to point-to-point. Persistent storage for topic messages. Decoupling publishers from consumers. Flexible routing rules. Dynamic subscription management.'
        }
      ]
    },
    {
      id: 'persistent',
      name: 'Persistent Messaging',
      icon: '💾',
      color: '#3b82f6',
      description: 'Enterprise-grade message persistence with guaranteed delivery, transactional support, and disk-based spooling',
      details: [
        {
          name: 'Guaranteed Delivery',
          explanation: 'Persistent message delivery mode. Acknowledgment from broker confirms spooling. Correlation keys for tracking. Delivery guarantees even on failure. Message persistence to disk. No message loss. Publisher flow control.'
        },
        {
          name: 'Transactional Publishing',
          explanation: 'ACID transactions for message publishing. Multiple messages in single transaction. Atomic commit or rollback. Transacted sessions. Coordinated publishing across queues. Exactly-once semantics. Consistency guarantees for distributed workflows.'
        },
        {
          name: 'Message Spooling',
          explanation: 'Disk-based message storage. High-throughput spooling engine. Configurable spool size limits. Message TTL (time-to-live). Overflow to disk. Persistent queues and topics. Survive broker restarts. Large message backlogs supported.'
        }
      ]
    },
    {
      id: 'replay',
      name: 'Replay & Time Travel',
      icon: '⏮️',
      color: '#14b8a6',
      description: 'Advanced message replay capabilities enabling time-travel debugging and historical data analysis',
      details: [
        {
          name: 'Message Replay',
          explanation: 'Replay messages from specific point in time. Reprocess historical events. Recover from application errors. Debug production issues. Replay from date/time or message ID. Fast-forward through message log. State reconstruction.'
        },
        {
          name: 'Time-Based Replay',
          explanation: 'Specify exact timestamp for replay start. Replay time ranges (e.g., yesterdays trading session). Event sourcing patterns. Temporal queries on message streams. Reconstruct state at any point in time. Historical analytics.'
        },
        {
          name: 'Replay with Filtering',
          explanation: 'Selective replay with message selectors. Filter by message properties. Replay only relevant subset. Reduce processing overhead. Focus on specific event types. SQL-like filter expressions. Combine time ranges with filters.'
        }
      ]
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #7c2d12, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
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
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d97706'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}
            >
              ← Back to Messaging
            </button>
            <div>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                background: 'linear-gradient(to right, #fcd34d, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 0,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                Solace PubSub+
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

      <Breadcrumb breadcrumb={breadcrumb} />

      <p style={{
        fontSize: '1.2rem',
        color: '#9ca3af',
        textAlign: 'center',
        marginBottom: '3rem',
        lineHeight: '1.8'
      }}>
        Advanced event broker platform combining messaging, streaming, and event management with enterprise-grade reliability.
        Features message VPNs for multi-tenancy, replay for time-travel debugging, and Event Portal for event governance.
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
                ← Back to Categories
              </button>
              {concepts.map((concept) => (
                <div
                  key={concept.id}
                  onClick={() => setSelectedConcept(concept)}
                  style={{
                    padding: '1rem',
                    backgroundColor: selectedConcept.id === concept.id ? concept.color + '20' : '#1f2937',
                    border: `2px solid ${selectedConcept.id === concept.id ? concept.color : '#374151'}`,
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
                      e.currentTarget.style.backgroundColor = '#1f2937'
                      e.currentTarget.style.borderColor = '#374151'
                    }
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{concept.icon}</div>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#e5e7eb'
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
                  color: '#f3f4f6',
                  marginBottom: '1rem'
                }}>
                  {selectedConcept.name}
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#9ca3af',
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
                      backgroundColor: '#1f2937',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: `2px solid ${selectedConcept.color}30`,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
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
                        color: '#f3f4f6',
                        margin: 0
                      }}>
                        {detail.name}
                      </h3>
                    </div>
                    <p style={{
                      fontSize: '1rem',
                      color: '#9ca3af',
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
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.3)'
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
                color: '#f3f4f6',
                marginBottom: '0.75rem'
              }}>
                {concept.name}
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#9ca3af',
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
    </div>
  )
}

export default Solace

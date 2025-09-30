import { useState } from 'react'

function DarkPoolMatchingEngineBasic({ onBack }) {
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const renderDiagram = (diagram) => {
    if (!diagram) return null

    return (
      <div style={{
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
        backgroundColor: '#f8fafc',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '2px solid #e2e8f0'
      }}>
        <h4 style={{
          fontSize: '1.1rem',
          fontWeight: '700',
          color: '#1f2937',
          margin: '0 0 1rem 0',
          textAlign: 'center'
        }}>
          📊 {diagram.title}
        </h4>
        <svg width="100%" height="300" viewBox="0 0 750 300" style={{ overflow: 'visible' }}>
          {/* Draw connections first (so they appear behind boxes) */}
          {diagram.connections.map((conn, idx) => {
            const fromEl = diagram.elements[conn.from]
            const toEl = diagram.elements[conn.to]
            const fromX = fromEl.x + (fromEl.width || 120) / 2
            const fromY = fromEl.y + (fromEl.height || 60) / 2
            const toX = toEl.x + (toEl.width || 120) / 2
            const toY = toEl.y + (toEl.height || 60) / 2

            return (
              <line
                key={idx}
                x1={fromX}
                y1={fromY}
                x2={toX}
                y2={toY}
                stroke="#64748b"
                strokeWidth="3"
                strokeDasharray={conn.style === 'dashed' ? '5,5' : '0'}
                markerEnd="url(#arrowhead)"
              />
            )
          })}

          {/* Arrow marker definition */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#64748b" />
            </marker>
          </defs>

          {/* Draw elements */}
          {diagram.elements.map((el, idx) => (
            <g key={idx}>
              <rect
                x={el.x}
                y={el.y}
                width={el.width || 120}
                height={el.height || 60}
                rx="8"
                ry="8"
                fill={el.color}
                stroke="#1e293b"
                strokeWidth="2"
                style={{
                  filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                }}
              />
              <text
                x={el.x + (el.width || 120) / 2}
                y={el.y + (el.height || 60) / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="14"
                fontWeight="600"
                style={{ userSelect: 'none' }}
              >
                {el.label.split('\n').map((line, lineIdx) => (
                  <tspan
                    key={lineIdx}
                    x={el.x + (el.width || 120) / 2}
                    dy={lineIdx === 0 ? 0 : 16}
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          ))}
        </svg>
      </div>
    )
  }

  const achievements = [
    {
      id: 'technical-discussions',
      title: '🎯 Technical Leadership & Requirements Analysis',
      summary: 'Led technical discussions with rates trading desk for real-time analytics solutions',
      details: [
        'Led technical discussions with rates trading desk to analyze complex risk calculation requirements and design streaming solutions for real-time analytics',
        'Enabled traders to capture market opportunities 3x faster through optimized technical architecture',
        'Bridged gap between trading desk requirements and technical implementation',
        'Designed streaming solutions aligned with business objectives and risk management needs'
      ],
      impact: '3x faster market opportunity capture',
      technologies: ['Requirements Analysis', 'Solution Architecture', 'Trading Systems', 'Risk Analytics'],
      diagram: {
        title: 'Requirements to Implementation Flow',
        elements: [
          { label: 'Trading Desk\nRequirements', x: 100, y: 100, color: '#3b82f6' },
          { label: 'Technical\nAnalysis', x: 300, y: 100, color: '#8b5cf6' },
          { label: 'Solution\nDesign', x: 500, y: 100, color: '#10b981' },
          { label: 'Implementation', x: 700, y: 100, color: '#f59e0b' }
        ],
        connections: [
          { from: 0, to: 1 },
          { from: 1, to: 2 },
          { from: 2, to: 3 }
        ]
      }
    },
    {
      id: 'kafka-streaming',
      title: '🚀 Kafka-Based Streaming Platform',
      summary: 'Architected high-throughput streaming platform for real-time risk calculations',
      details: [
        'Architected Kafka-based streaming platform processing millions of messages for real-time risk calculations',
        'Supporting $3B+ daily notional trading volume with enterprise-grade reliability',
        'Achieved 99.999% uptime (less than 5 minutes downtime per year)',
        'Designed for horizontal scalability and fault tolerance across distributed systems'
      ],
      impact: '$3B+ daily trading volume, 99.999% uptime',
      technologies: ['Apache Kafka', 'Distributed Systems', 'Event Streaming', 'High Availability'],
      diagram: {
        title: 'Kafka Streaming Architecture',
        elements: [
          { label: 'Market Data\nProducers', x: 100, y: 80, color: '#3b82f6' },
          { label: 'Trade Events\nProducers', x: 100, y: 200, color: '#3b82f6' },
          { label: 'Kafka\nCluster', x: 350, y: 140, color: '#ef4444', width: 150, height: 80 },
          { label: 'Risk\nConsumers', x: 600, y: 80, color: '#10b981' },
          { label: 'Analytics\nConsumers', x: 600, y: 200, color: '#10b981' }
        ],
        connections: [
          { from: 0, to: 2 },
          { from: 1, to: 2 },
          { from: 2, to: 3 },
          { from: 2, to: 4 }
        ]
      }
    },
    {
      id: 'event-processing',
      title: '⚡ High-Volume Event Processing System',
      summary: 'Delivered scalable event processing for intraday risk computation',
      details: [
        'Delivered event processing system handling 5M+ messages/day for intraday risk computation',
        'Real-time processing of trade events, market data updates, and risk calculations',
        'Implemented efficient message routing and processing pipelines with intelligent load balancing',
        'Optimized throughput and latency for time-sensitive financial calculations',
        'Built message deduplication and idempotency mechanisms to ensure data integrity',
        'Implemented circuit breakers and fallback mechanisms for resilient processing',
        'Created monitoring dashboards showing real-time message throughput and processing latency',
        'Designed event schema evolution strategy allowing backward-compatible message format changes'
      ],
      impact: '5M+ messages/day processing capacity',
      technologies: ['Event Processing', 'Message Queues', 'Real-time Computing', 'Risk Systems'],
      diagram: {
        title: 'Event Processing Pipeline',
        elements: [
          { label: 'Trade\nEvents', x: 50, y: 80, color: '#3b82f6', width: 100 },
          { label: 'Market\nData', x: 50, y: 160, color: '#3b82f6', width: 100 },
          { label: 'Position\nUpdates', x: 50, y: 240, color: '#3b82f6', width: 100 },
          { label: 'Event\nRouter', x: 250, y: 160, color: '#8b5cf6', width: 120, height: 70 },
          { label: 'Risk\nCalculator', x: 480, y: 80, color: '#10b981', width: 110 },
          { label: 'P&L\nEngine', x: 480, y: 160, color: '#10b981', width: 110 },
          { label: 'Position\nTracker', x: 480, y: 240, color: '#10b981', width: 110 }
        ],
        connections: [
          { from: 0, to: 3 },
          { from: 1, to: 3 },
          { from: 2, to: 3 },
          { from: 3, to: 4 },
          { from: 3, to: 5 },
          { from: 3, to: 6 }
        ]
      }
    },
    {
      id: 'apache-flink',
      title: '🌊 Apache Flink Complex Event Processing',
      summary: 'Implemented Flink for millisecond-latency market data processing',
      details: [
        'Implemented Apache Flink for complex event processing in rates trading systems',
        'Reduced market data latency from seconds to milliseconds - critical for trading decisions',
        'Built stateful stream processing for complex financial calculations',
        'Enabled real-time aggregations, windowing, and pattern detection on market data'
      ],
      impact: 'Latency: seconds → milliseconds',
      technologies: ['Apache Flink', 'Stream Processing', 'Complex Event Processing', 'Market Data'],
      diagram: {
        title: 'Flink Stream Processing Pipeline',
        elements: [
          { label: 'Market Data\nStream', x: 100, y: 140, color: '#3b82f6' },
          { label: 'Flink\nProcessing', x: 300, y: 140, color: '#8b5cf6', width: 140, height: 80 },
          { label: 'Windowing &\nAggregation', x: 300, y: 60, color: '#ec4899' },
          { label: 'Pattern\nDetection', x: 300, y: 220, color: '#ec4899' },
          { label: 'Risk\nCalculations', x: 550, y: 140, color: '#10b981' }
        ],
        connections: [
          { from: 0, to: 1 },
          { from: 1, to: 2, style: 'dashed' },
          { from: 1, to: 3, style: 'dashed' },
          { from: 1, to: 4 }
        ]
      }
    },
    {
      id: 'fault-tolerant',
      title: '🛡️ Fault-Tolerant Stream Processing',
      summary: 'Developed exactly-once semantics ensuring zero data loss',
      details: [
        'Developed fault-tolerant stream processing with exactly-once semantics for financial data',
        'Ensuring zero data loss through distributed checkpointing and state management',
        '100% accuracy in P&L calculations - critical for financial compliance and regulatory requirements',
        'Implemented idempotent processing and transactional guarantees across distributed systems',
        'Built automatic recovery mechanisms with state restoration from latest checkpoints',
        'Designed distributed state backends using RocksDB for efficient state storage and retrieval',
        'Created monitoring and alerting for checkpoint failures and recovery scenarios',
        'Implemented exactly-once delivery guarantees between Kafka and downstream systems',
        'Developed comprehensive testing framework for fault injection and recovery validation'
      ],
      impact: 'Zero data loss, 100% P&L accuracy',
      technologies: ['Fault Tolerance', 'Exactly-Once Semantics', 'State Management', 'Financial Compliance'],
      diagram: {
        title: 'Fault-Tolerant Processing Architecture',
        elements: [
          { label: 'Kafka\nSource', x: 80, y: 140, color: '#3b82f6' },
          { label: 'Stream\nProcessor', x: 280, y: 140, color: '#8b5cf6', width: 130, height: 70 },
          { label: 'Checkpoint\nStorage', x: 280, y: 50, color: '#f59e0b', width: 130 },
          { label: 'State\nBackend', x: 280, y: 230, color: '#f59e0b', width: 130 },
          { label: 'Database\nSink', x: 500, y: 140, color: '#10b981' }
        ],
        connections: [
          { from: 0, to: 1 },
          { from: 1, to: 2, style: 'dashed' },
          { from: 1, to: 3, style: 'dashed' },
          { from: 1, to: 4 }
        ]
      }
    },
    {
      id: 'position-pnl',
      title: '📊 Real-Time Position & P&L Monitoring',
      summary: 'Built monitoring engine improving desk profitability by 12%',
      details: [
        'Built real-time position and P&L monitoring engine for rates trading desk',
        'Providing instant visibility into trading positions and profit/loss metrics across all asset classes',
        'Improved trading decisions through real-time analytics, risk insights, and market exposure tracking',
        'Increased desk profitability by 12% through better risk management and opportunity identification',
        'Implemented real-time Greeks calculation for swaptions and bonds portfolio',
        'Created aggregated views showing desk-level, trader-level, and instrument-level P&L',
        'Built alerting system for position limits, risk thresholds, and unusual P&L movements',
        'Integrated with market data feeds for mark-to-market valuations in real-time',
        'Designed historical P&L attribution analysis showing profit drivers by risk factor'
      ],
      impact: '12% increase in desk profitability',
      technologies: ['Real-time Analytics', 'P&L Calculation', 'Risk Monitoring', 'Trading Systems'],
      diagram: {
        title: 'Real-Time Position & P&L Monitoring System',
        elements: [
          { label: 'Trade\nFeed', x: 50, y: 100, color: '#3b82f6', width: 100 },
          { label: 'Market\nData', x: 50, y: 200, color: '#3b82f6', width: 100 },
          { label: 'Position\nEngine', x: 250, y: 100, color: '#8b5cf6', width: 120 },
          { label: 'P&L\nCalculator', x: 250, y: 200, color: '#8b5cf6', width: 120 },
          { label: 'Real-time\nDashboard', x: 480, y: 80, color: '#10b981', width: 120 },
          { label: 'Risk\nAlerts', x: 480, y: 170, color: '#ef4444', width: 120 },
          { label: 'Historical\nAnalytics', x: 480, y: 230, color: '#10b981', width: 120 }
        ],
        connections: [
          { from: 0, to: 2 },
          { from: 1, to: 2 },
          { from: 1, to: 3 },
          { from: 2, to: 3 },
          { from: 2, to: 4 },
          { from: 3, to: 4 },
          { from: 3, to: 5 },
          { from: 3, to: 6 }
        ]
      }
    },
    {
      id: 'spring-reactor',
      title: '⚛️ Reactive Programming with Spring Reactor',
      summary: 'Leveraged reactive programming for high-frequency trading systems',
      details: [
        'Leveraged Spring Reactor for reactive programming in high-frequency trading systems',
        'Handling 50K+ trades per second during peak market volatility periods',
        'Non-blocking, asynchronous processing for maximum throughput and resource efficiency',
        'Back-pressure handling to prevent system overload during unexpected market spikes',
        'Implemented reactive streams for end-to-end non-blocking data flow',
        'Built reactive REST APIs using WebFlux for real-time trade execution',
        'Designed operator chains for complex event transformations with minimal latency',
        'Created custom schedulers optimized for financial processing workloads',
        'Implemented reactive error handling and retry strategies for transient failures'
      ],
      impact: '50K+ trades/second capacity',
      technologies: ['Spring Reactor', 'Reactive Programming', 'High-Frequency Trading', 'Non-blocking I/O'],
      diagram: {
        title: 'Reactive Trading System Architecture',
        elements: [
          { label: 'Trade\nRequests', x: 80, y: 80, color: '#3b82f6', width: 100 },
          { label: 'Market\nEvents', x: 80, y: 200, color: '#3b82f6', width: 100 },
          { label: 'WebFlux\nController', x: 270, y: 80, color: '#8b5cf6', width: 120 },
          { label: 'Reactor\nPipeline', x: 270, y: 200, color: '#8b5cf6', width: 120 },
          { label: 'Validation', x: 270, y: 140, color: '#ec4899', width: 90, height: 50 },
          { label: 'Execution\nEngine', x: 500, y: 140, color: '#10b981', width: 110 }
        ],
        connections: [
          { from: 0, to: 2 },
          { from: 1, to: 3 },
          { from: 2, to: 4 },
          { from: 3, to: 4 },
          { from: 4, to: 5 }
        ]
      }
    },
    {
      id: 'oracle-coherence',
      title: '⚡ Oracle Coherence Caching Solution',
      summary: 'Implemented distributed caching reducing latency by 80%',
      details: [
        'Implemented caching solution using Oracle Coherence reducing market data access latency by 80%',
        'Directly improving trading execution speed through faster data access',
        'Distributed in-memory data grid for high-performance caching',
        'Real-time data synchronization across multiple trading applications'
      ],
      impact: '80% latency reduction',
      technologies: ['Oracle Coherence', 'Distributed Caching', 'In-Memory Data Grid', 'Performance Optimization'],
      diagram: {
        title: 'Coherence Caching Architecture',
        elements: [
          { label: 'Trading App 1', x: 100, y: 60, color: '#3b82f6' },
          { label: 'Trading App 2', x: 100, y: 140, color: '#3b82f6' },
          { label: 'Trading App 3', x: 100, y: 220, color: '#3b82f6' },
          { label: 'Coherence\nCache Grid', x: 350, y: 140, color: '#f59e0b', width: 150, height: 80 },
          { label: 'Database', x: 600, y: 140, color: '#6b7280' }
        ],
        connections: [
          { from: 0, to: 3 },
          { from: 1, to: 3 },
          { from: 2, to: 3 },
          { from: 3, to: 4 }
        ]
      }
    },
    {
      id: 'distributed-caching',
      title: '🗄️ Distributed Caching Layer',
      summary: 'Designed caching layer reducing database load by 90%',
      details: [
        'Designed distributed caching layer reducing database load by 90%',
        'Significantly improved response times for data-intensive operations across trading applications',
        'Implemented intelligent cache invalidation strategies ensuring data consistency',
        'Multi-tier caching architecture with L1 (local), L2 (distributed) for optimal performance',
        'Built cache warming strategies for frequently accessed reference data',
        'Designed TTL-based and event-driven cache eviction policies',
        'Implemented read-through and write-through caching patterns for database synchronization',
        'Created cache monitoring and metrics for hit rates, eviction rates, and performance analysis',
        'Optimized memory usage with compression and serialization strategies'
      ],
      impact: '90% database load reduction',
      technologies: ['Distributed Caching', 'Cache Invalidation', 'Database Optimization', 'Performance Tuning'],
      diagram: {
        title: 'Multi-Tier Distributed Caching Architecture',
        elements: [
          { label: 'Application\nNode 1', x: 70, y: 60, color: '#3b82f6', width: 100 },
          { label: 'Application\nNode 2', x: 70, y: 150, color: '#3b82f6', width: 100 },
          { label: 'Application\nNode 3', x: 70, y: 240, color: '#3b82f6', width: 100 },
          { label: 'L1 Cache', x: 200, y: 60, color: '#ec4899', width: 90, height: 50 },
          { label: 'L1 Cache', x: 200, y: 150, color: '#ec4899', width: 90, height: 50 },
          { label: 'L1 Cache', x: 200, y: 240, color: '#ec4899', width: 90, height: 50 },
          { label: 'L2 Distributed\nCache Cluster', x: 370, y: 130, color: '#8b5cf6', width: 140, height: 80 },
          { label: 'Database', x: 600, y: 150, color: '#6b7280', width: 100 }
        ],
        connections: [
          { from: 0, to: 3 },
          { from: 1, to: 4 },
          { from: 2, to: 5 },
          { from: 3, to: 6 },
          { from: 4, to: 6 },
          { from: 5, to: 6 },
          { from: 6, to: 7 }
        ]
      }
    },
    {
      id: 'restful-apis',
      title: '🔌 RESTful APIs for Risk Metrics',
      summary: 'Created APIs enabling integration with 20+ trading applications',
      details: [
        'Created RESTful APIs for real-time risk metrics and position visualization',
        'Enabling front-office integration with 20+ trading applications and systems',
        'Standardized API contracts using OpenAPI/Swagger specifications for risk data consumption',
        'Real-time streaming endpoints using Server-Sent Events for live market data and risk calculations',
        'Implemented OAuth2 and JWT-based authentication for secure API access',
        'Built rate limiting and throttling mechanisms to protect backend systems',
        'Designed versioned API endpoints ensuring backward compatibility',
        'Created comprehensive API documentation with examples and integration guides',
        'Implemented WebSocket endpoints for bi-directional real-time communication',
        'Built API gateway with request routing, load balancing, and circuit breaking'
      ],
      impact: '20+ application integrations',
      technologies: ['RESTful APIs', 'API Design', 'System Integration', 'Risk Metrics'],
      diagram: {
        title: 'API Integration Architecture',
        elements: [
          { label: 'Trading UI', x: 50, y: 50, color: '#3b82f6', width: 100 },
          { label: 'Risk App', x: 50, y: 130, color: '#3b82f6', width: 100 },
          { label: 'Analytics', x: 50, y: 210, color: '#3b82f6', width: 100 },
          { label: 'API\nGateway', x: 250, y: 130, color: '#8b5cf6', width: 120, height: 70 },
          { label: 'Risk API', x: 480, y: 70, color: '#10b981', width: 110 },
          { label: 'Position API', x: 480, y: 150, color: '#10b981', width: 110 },
          { label: 'Market\nData API', x: 480, y: 230, color: '#10b981', width: 110 }
        ],
        connections: [
          { from: 0, to: 3 },
          { from: 1, to: 3 },
          { from: 2, to: 3 },
          { from: 3, to: 4 },
          { from: 3, to: 5 },
          { from: 3, to: 6 }
        ]
      }
    },
    {
      id: 'risk-visualization',
      title: '📈 Enhanced Risk Visualization',
      summary: 'Direct collaboration delivering visualization for $10B+ portfolio',
      details: [
        'Direct collaboration with rates trading desk resulted in enhanced risk visualization',
        'For swaptions and bonds portfolio worth $10B+ notional value',
        'Real-time dashboards showing Greeks (Delta, Gamma, Vega, Theta), sensitivities, and risk exposures',
        'Interactive visualizations enabling rapid risk assessment and decision-making',
        'Built heat maps showing risk concentrations by maturity, currency, and counterparty',
        'Designed drill-down capabilities from portfolio to individual position level',
        'Implemented scenario analysis tools for stress testing and what-if analysis',
        'Created real-time P&L attribution charts showing profit drivers by risk factor',
        'Built limit monitoring displays with visual indicators for threshold breaches',
        'Integrated with Excel via API for ad-hoc analysis and custom reporting'
      ],
      impact: '$10B+ portfolio visualization',
      technologies: ['Data Visualization', 'Risk Management', 'Swaptions', 'Fixed Income Trading'],
      diagram: {
        title: 'Risk Visualization Platform',
        elements: [
          { label: 'Position\nData', x: 70, y: 80, color: '#3b82f6', width: 100 },
          { label: 'Market\nData', x: 70, y: 160, color: '#3b82f6', width: 100 },
          { label: 'Greeks\nCalculator', x: 70, y: 240, color: '#3b82f6', width: 100 },
          { label: 'Risk\nAggregation\nEngine', x: 260, y: 160, color: '#8b5cf6', width: 130, height: 80 },
          { label: 'Dashboard\nUI', x: 490, y: 80, color: '#10b981', width: 110 },
          { label: 'Heat Maps', x: 490, y: 160, color: '#10b981', width: 110 },
          { label: 'Scenario\nAnalysis', x: 490, y: 240, color: '#10b981', width: 110 }
        ],
        connections: [
          { from: 0, to: 3 },
          { from: 1, to: 3 },
          { from: 2, to: 3 },
          { from: 3, to: 4 },
          { from: 3, to: 5 },
          { from: 3, to: 6 }
        ]
      }
    }
  ]

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '95%',
      margin: '120px auto 0',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      border: '3px solid rgba(16, 185, 129, 0.4)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          ← Back to Menu
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          🌊 Dark Pool Matching Engine - Basic
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <div style={{
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(16, 185, 129, 0.3)',
        marginBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.3rem',
          color: '#374151',
          fontWeight: '500',
          margin: 0,
          lineHeight: '1.8',
          textAlign: 'center'
        }}>
          Enterprise-grade streaming platform and real-time risk analytics for rates trading operations.
          Processing millions of events daily with high availability and fault tolerance for $10B+ portfolio management.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '2px solid rgba(16, 185, 129, 0.3)',
              overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            {/* Header - Always Visible */}
            <div
              onClick={() => toggleSection(achievement.id)}
              style={{
                padding: '1.5rem',
                backgroundColor: expandedSections[achievement.id]
                  ? 'rgba(16, 185, 129, 0.1)'
                  : 'rgba(16, 185, 129, 0.05)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = expandedSections[achievement.id]
                  ? 'rgba(16, 185, 129, 0.1)'
                  : 'rgba(16, 185, 129, 0.05)'
              }}
            >
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#059669',
                  margin: '0 0 0.5rem 0',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  {achievement.title}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#6b7280',
                  margin: 0,
                  fontWeight: '500'
                }}>
                  {achievement.summary}
                </p>
                <div style={{
                  marginTop: '0.75rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: 'rgba(34, 197, 94, 0.15)',
                  borderRadius: '8px',
                  display: 'inline-block'
                }}>
                  <span style={{
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    color: '#047857'
                  }}>
                    💪 Impact: {achievement.impact}
                  </span>
                </div>
              </div>
              <div style={{
                fontSize: '1.5rem',
                color: '#059669',
                marginLeft: '1rem',
                transition: 'transform 0.3s ease',
                transform: expandedSections[achievement.id] ? 'rotate(180deg)' : 'rotate(0deg)'
              }}>
                ▼
              </div>
            </div>

            {/* Expandable Content */}
            {expandedSections[achievement.id] && (
              <div style={{
                padding: '1.5rem',
                backgroundColor: 'white',
                borderTop: '2px solid rgba(16, 185, 129, 0.2)',
                animation: 'slideDown 0.3s ease-out'
              }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  margin: '0 0 1rem 0'
                }}>
                  📋 Detailed Achievements
                </h4>
                <ul style={{
                  margin: '0 0 1.5rem 0',
                  padding: '0 0 0 1.5rem',
                  listStyle: 'none'
                }}>
                  {achievement.details.map((detail, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: '1rem',
                        color: '#374151',
                        marginBottom: '0.75rem',
                        lineHeight: '1.6',
                        paddingLeft: '1.5rem',
                        position: 'relative',
                        textAlign: 'left'
                      }}
                    >
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: '#10b981',
                        fontWeight: '700'
                      }}>
                        ✓
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>

                {/* Render technical diagram if it exists */}
                {achievement.diagram && renderDiagram(achievement.diagram)}

                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  margin: '0 0 1rem 0'
                }}>
                  🛠️ Technologies & Skills
                </h4>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  {achievement.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        color: '#1e40af',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        border: '1px solid rgba(59, 130, 246, 0.3)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default DarkPoolMatchingEngineBasic
import { useState, useEffect, useRef } from 'react'

const ModernDiagram = ({ components, onComponentClick, title, width = 1400, height = 800, containerWidth = 1800, focusedIndex }) => {
  const [hoveredComponent, setHoveredComponent] = useState(null)

  return (
    <div style={{
      width: '100%',
      maxWidth: `${containerWidth}px`,
      margin: '0 auto',
      backgroundColor: '#f8fafc',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
      border: '2px solid #e2e8f0'
    }}>
      <h3 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '1.75rem',
        fontWeight: '800',
        color: '#1e293b',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        {title}
      </h3>

      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#059669" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.9"/>
          </linearGradient>

          {/* Arrow markers */}
          <marker id="arrowSolid" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#1e293b" />
          </marker>
          <marker id="arrowDashed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Architectural layer backgrounds */}
        <g opacity="0.1">
          <rect x="50" y="180" width="420" height="200" rx="16" fill="#3b82f6" />
          <text x="260" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af" opacity="0.6">
            Layer 1
          </text>

          <rect x="550" y="80" width="420" height="560" rx="16" fill="#10b981" />
          <text x="760" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="#059669" opacity="0.6">
            Layer 2
          </text>

          <rect x="1050" y="180" width="420" height="520" rx="16" fill="#8b5cf6" />
          <text x="1260" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7c3aed" opacity="0.6">
            Layer 3
          </text>
        </g>

        {/* Connecting lines with arrows and labels */}
        <g fill="none">
          <line x1="430" y1="300" x2="580" y2="200" stroke="#1e293b" strokeWidth="3" strokeOpacity="0.8" markerEnd="url(#arrowSolid)"/>
          <text x="505" y="240" fontSize="11" fontWeight="600" fill="#1e293b" textAnchor="middle">
            interacts
          </text>

          <line x1="430" y1="300" x2="580" y2="400" stroke="#1e293b" strokeWidth="3" strokeOpacity="0.8" markerEnd="url(#arrowSolid)"/>
          <text x="505" y="360" fontSize="11" fontWeight="600" fill="#1e293b" textAnchor="middle">
            uses
          </text>

          <line x1="930" y1="200" x2="1080" y2="300" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="1005" y="240" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            depends
          </text>

          <line x1="930" y1="400" x2="1080" y2="500" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="1005" y="460" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            provides
          </text>

          <line x1="430" y1="500" x2="580" y2="600" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="505" y="560" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            extends
          </text>

          <line x1="930" y1="500" x2="760" y2="600" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="845" y="560" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            integrates
          </text>
        </g>

        {/* Component rectangles */}
        {components.map((component, index) => {
          const isFocused = focusedIndex === index
          const isHovered = hoveredComponent === component.id
          const isHighlighted = isFocused || isHovered

          return (
          <g key={component.id}>
            {/* Focused ring indicator */}
            {isFocused && (
              <rect
                x={component.x - 6}
                y={component.y - 6}
                width={component.width + 12}
                height={component.height + 12}
                rx="16"
                ry="16"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="4"
                style={{
                  opacity: 0.9,
                  filter: 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.6))'
                }}
              />
            )}
            <rect
              x={component.x}
              y={component.y}
              width={component.width}
              height={component.height}
              rx="12"
              ry="12"
              fill={`url(#${component.color}Gradient)`}
              stroke={isHighlighted ? '#1e293b' : '#64748b'}
              strokeWidth={isHighlighted ? '4' : '2'}
              style={{
                cursor: 'pointer',
                filter: isHighlighted ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                transform: isHighlighted ? 'scale(1.05)' : 'scale(1)',
                transformOrigin: `${component.x + component.width/2}px ${component.y + component.height/2}px`,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={() => setHoveredComponent(component.id)}
              onMouseLeave={() => setHoveredComponent(null)}
              onClick={() => onComponentClick && onComponentClick(component)}
            />

            {/* Icon */}
            <text
              x={component.x + component.width/2}
              y={component.y + 40}
              textAnchor="middle"
              fontSize="52"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {component.icon}
            </text>

            {/* Title */}
            <text
              x={component.x + component.width/2}
              y={component.y + 85}
              textAnchor="middle"
              fontSize="20"
              fontWeight="700"
              fill="white"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {component.title}
            </text>

            {/* Details */}
            {component.details && component.details.map((detail, idx) => (
              <text
                key={idx}
                x={component.x + component.width/2}
                y={component.y + 115 + (idx * 18)}
                textAnchor="middle"
                fontSize="12"
                fontWeight="500"
                fill="rgba(255,255,255,0.9)"
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              >
                {detail}
              </text>
            ))}

          </g>
        )})}
      </svg>
    </div>
  )
}

function DarkPoolMatchingEngine({ onBack }) {
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [focusedComponentIndex, setFocusedComponentIndex] = useState(0)

  const components = [
    {
      id: 'order-ingestion', x: 80, y: 140, width: 350, height: 200,
      icon: '📥', title: 'Order Ingestion Gateway', color: 'blue',
      details: ['FIX 4.4/5.0 Protocol', 'Sub-microsecond Latency', '1M+ Orders/sec', 'Multi-venue Support', 'Order Validation', 'Risk Checks'],
      description: 'High-performance order ingestion system supporting multiple protocols with ultra-low latency processing and comprehensive risk validation.'
    },
    {
      id: 'matching-engine', x: 480, y: 140, width: 350, height: 200,
      icon: '⚡', title: 'Core Matching Engine', color: 'green',
      details: ['Price-Time Priority', 'Hidden Liquidity', 'Iceberg Orders', 'TWAP/VWAP Algo', 'Anti-Gaming Logic', 'Order Book Depth'],
      description: 'Advanced matching algorithms with sophisticated order types, anti-gaming protection, and institutional-grade execution quality.'
    },
    {
      id: 'liquidity-pool', x: 880, y: 140, width: 350, height: 200,
      icon: '🌊', title: 'Dark Liquidity Pool', color: 'purple',
      details: ['Hidden Order Book', 'Institutional Blocks', '$500M+ Daily Volume', 'Cross-venue Liquidity', 'Size Discovery', 'Price Improvement'],
      description: 'Deep liquidity aggregation from institutional sources with advanced size discovery and minimal market impact execution.'
    },
    {
      id: 'smart-routing', x: 280, y: 380, width: 350, height: 200,
      icon: '🧠', title: 'Smart Order Router', color: 'red',
      details: ['ML-Based Routing', 'Venue Selection', 'Cost Analysis', 'Impact Prediction', 'Dynamic Allocation', 'Execution Analytics'],
      description: 'Machine learning-powered routing system optimizing execution across multiple venues with predictive cost analysis.'
    },
    {
      id: 'risk-management', x: 680, y: 380, width: 350, height: 200,
      icon: '🛡️', title: 'Risk Management', color: 'orange',
      details: ['Real-time Monitoring', 'Position Limits', 'Credit Checks', 'Compliance Rules', 'Anomaly Detection', 'Circuit Breakers'],
      description: 'Comprehensive risk framework with real-time monitoring, automated controls, and regulatory compliance validation.'
    },
    {
      id: 'analytics-engine', x: 480, y: 620, width: 350, height: 200,
      icon: '📊', title: 'Analytics & Reporting', color: 'teal',
      details: ['Transaction Cost Analysis', 'Market Impact Studies', 'Performance Attribution', 'Regulatory Reporting', 'Custom Dashboards', 'API Integration'],
      description: 'Advanced analytics platform providing comprehensive execution analysis, regulatory reporting, and performance insights.'
    }
  ]

  // Set initial focus on mount
  useEffect(() => {
    setFocusedComponentIndex(0)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentIsModalOpen = isModalOpenRef.current
      console.log(' KeyDown:', e.key, 'isModalOpen:', currentIsModalOpen)

      // Handle Escape to close modal or go back to menu
      if (e.key === 'Escape') {
        if (currentIsModalOpen) {
          e.preventDefault()
          e.stopImmediatePropagation()
          closeModal()
          return
        }
        return
      }

      if (isModalOpen) {
        // Modal is open, don't handle other keys
        return
      }

      // Navigation when modal is closed
      const componentCount = components.length

      switch(e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault()
          setFocusedComponentIndex((prev) => (prev + 1) % componentCount)
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          setFocusedComponentIndex((prev) => (prev - 1 + componentCount) % componentCount)
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (components[focusedComponentIndex]) {
            handleComponentClick(components[focusedComponentIndex].id)
          }
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [focusedComponentIndex])

  const handleComponentClick = (component) => {
    setSelectedComponent(component)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedComponent(null)
    setSelectedConcept(null)
  }

  const featureDetails = {
    'FIX 4.4/5.0 Protocol': 'Industry-standard Financial Information eXchange protocol supporting both legacy (4.4) and modern (5.0) versions. Provides low-latency message encoding/decoding with extensive field validation and session management for institutional trading.',
    'Sub-microsecond Latency': 'Optimized processing pipeline achieving end-to-end latency under 1 microsecond (< 1µs). Uses kernel bypass techniques (DPDK), CPU pinning, memory-mapped I/O, and lock-free data structures to minimize processing overhead.',
    '1M+ Orders/sec': 'Horizontal scaling architecture supporting over 1 million order messages per second. Implements sharded order queues, parallel processing pools, and zero-copy networking to handle institutional volumes.',
    'Multi-venue Support': 'Unified gateway connecting to 120+ trading venues including lit exchanges, dark pools, and alternative trading systems. Venue-specific adaptors handle protocol differences, session management, and failover logic.',
    'Order Validation': 'Comprehensive pre-trade validation including symbol verification, price reasonability checks, quantity limits, trading hours validation, and duplicate order detection. Rejects invalid orders before market submission.',
    'Risk Checks': 'Real-time risk assessment on every order including position limits, margin requirements, concentration limits, credit checks, and regulatory constraints. Blocks orders exceeding risk thresholds automatically.',
    'Price-Time Priority': 'Standard matching algorithm giving priority to best-priced orders first, then time priority for orders at the same price. Ensures fair execution and transparent price discovery in the dark pool.',
    'Hidden Liquidity': 'Non-displayed order book where orders are not visible to other market participants until execution. Prevents information leakage and market impact for large institutional orders.',
    'Iceberg Orders': 'Large orders with only a small portion displayed, with the remainder hidden. As the visible portion executes, new tranches are automatically revealed, minimizing market impact.',
    'TWAP/VWAP Algo': 'Time-Weighted Average Price and Volume-Weighted Average Price algorithmic strategies. TWAP spreads orders evenly over time, while VWAP targets historical volume patterns to minimize market impact.',
    'Anti-Gaming Logic': 'Sophisticated detection algorithms identifying predatory trading behavior, order stuffing, quote manipulation, and layering. Automatically delays or rejects suspicious orders to protect institutional clients.',
    'Order Book Depth': 'Full depth-of-book visibility with 20 price levels on both bid and ask sides. Provides institutional traders with complete market context while maintaining anonymity of individual orders.',
    'Hidden Order Book': 'Completely non-displayed order book where all resting liquidity is invisible to market participants. Orders only become visible at execution, preventing front-running and information leakage.',
    'Institutional Blocks': 'Specialized handling for large block trades (typically 10,000+ shares or $200K+ value). Uses size discovery protocols, reference pricing from lit markets, and negotiation workflows.',
    '$500M+ Daily Volume': 'Average daily trading volume exceeding $500 million across all instruments. High liquidity depth enables execution of large institutional orders without significant market impact.',
    'Cross-venue Liquidity': 'Aggregated liquidity from multiple dark pools and internal crossing networks. Smart routing identifies best execution opportunities across fragmented liquidity sources.',
    'Size Discovery': 'Anonymous protocols allowing counterparties to discover mutual interest in large orders without revealing size or direction. Uses ping orders, indication of interest (IOI), and negotiation workflows.',
    'Price Improvement': 'Execution at better prices than displayed on public markets. Uses mid-point pricing, reference pricing from multiple venues, and spread capture to provide 2-3 basis points average improvement.',
    'ML-Based Routing': 'Machine learning models predict optimal venue selection based on historical fill rates, execution quality, and market conditions. Models retrain continuously on recent execution data to adapt to changing markets.',
    'Venue Selection': 'Dynamic routing to 120+ trading venues based on instrument, order size, urgency, and market conditions. Considers venue fill rates, fees, speed, and historical execution quality.',
    'Cost Analysis': 'Real-time calculation of expected execution costs including exchange fees, market impact, timing risk, and opportunity cost. Provides pre-trade cost estimates and post-trade analysis.',
    'Impact Prediction': 'Statistical models estimate market impact of order execution based on order size, spread, volatility, and liquidity. Uses historical market data and order flow analysis.',
    'Dynamic Allocation': 'Adaptive order splitting across multiple venues based on real-time liquidity, fill rates, and market conditions. Continuously rebalances allocation to optimize execution quality.',
    'Execution Analytics': 'Comprehensive post-trade analysis measuring execution quality vs. arrival price, VWAP, implementation shortfall, and opportunity cost. Generates detailed performance reports.',
    'Real-time Monitoring': 'Continuous surveillance of all trading activity with 50M+ risk checks per day. Sub-10 nanosecond response times for critical alerts. Dashboard displays positions, exposures, and limit utilization.',
    'Position Limits': 'Pre-configured maximum position sizes by symbol, sector, and portfolio. Hard limits prevent traders from exceeding authorized risk levels. Automatically blocks orders that would breach limits.',
    'Credit Checks': 'Real-time verification of counterparty credit limits and margin requirements before order acceptance. Integrates with prime broker systems for credit line management.',
    'Compliance Rules': 'Automated enforcement of regulatory requirements including best execution, short sale restrictions, wash trade detection, and market manipulation prevention. 100% compliance rate.',
    'Anomaly Detection': 'Machine learning models identify unusual trading patterns, fat finger errors, system malfunctions, and potential market abuse. 99.7% alert accuracy with minimal false positives.',
    'Circuit Breakers': 'Automatic trading halts triggered by extreme price movements, unusual volatility, or system anomalies. Prevents runaway algorithms and protects against flash crash scenarios.',
    'Transaction Cost Analysis': 'Detailed breakdown of execution costs including market impact, timing costs, opportunity costs, commissions, and fees. Compares actual execution vs. multiple benchmarks.',
    'Market Impact Studies': 'Statistical analysis measuring price impact of order execution across different strategies, venues, and market conditions. Quantifies temporary and permanent market impact.',
    'Performance Attribution': 'Decomposition of trading performance into venue selection, timing, sizing, and execution quality components. Identifies which routing decisions added or destroyed value.',
    'Regulatory Reporting': 'Automated generation of required regulatory reports including MiFID II transaction reports, CAT reporting, Form PF, and audit trails. 500+ reports generated daily.',
    'Custom Dashboards': 'Configurable real-time dashboards displaying execution metrics, cost analysis, fill rates, and venue performance. Web-based interface with drill-down capabilities.',
    'API Integration': 'RESTful APIs and FIX protocol interfaces for programmatic access to analytics data, historical executions, and real-time metrics. Supports integration with client systems.'
  }

  // Use refs to access current modal state in event handler
  const isModalOpenRef = useRef(isModalOpen)
  useEffect(() => {
    isModalOpenRef.current = isModalOpen
  }, [isModalOpen])


  return (
    <div style={{
      padding: '2rem',
      maxWidth: '2000px',
      margin: '120px auto 0',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      border: '3px solid rgba(59, 130, 246, 0.4)'
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
          🌊 Dark Pool Matching Engine
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <div style={{
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '2px solid rgba(59, 130, 246, 0.2)',
        marginBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.1rem',
          color: '#374151',
          fontWeight: '500',
          margin: 0,
          lineHeight: '1.6',
          textAlign: 'center'
        }}>
          Advanced institutional trading platform providing anonymous execution with minimal market impact.
          Features sophisticated matching algorithms, deep liquidity aggregation, and enterprise-grade risk controls
          for large block trading with sub-microsecond latency.
        </p>
      </div>

      <ModernDiagram
        components={components}
        onComponentClick={handleComponentClick}
        title="Dark Pool Architecture Overview"
        width={1400}
        height={800}
        containerWidth={1800}
      
        focusedIndex={focusedComponentIndex}
      />

      <div style={{
        marginTop: '3rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem'
      }}>
        <div style={{
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '2px solid rgba(59, 130, 246, 0.3)'
        }}>
          <h3 style={{
            color: '#1e40af',
            fontSize: '1.25rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            🏛️ Regulatory Compliance
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '0.5rem',
            fontSize: '0.9rem'
          }}>
            <div>• MiFID II Best Execution</div>
            <div>• Reg NMS Compliance</div>
            <div>• ESMA Dark Pool Rules</div>
            <div>• SEC Alternative Trading System</div>
            <div>• Real-time Trade Reporting</div>
            <div>• Audit Trail Maintenance</div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '2px solid rgba(139, 92, 246, 0.3)'
        }}>
          <h3 style={{
            color: '#7c3aed',
            fontSize: '1.25rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            🔧 Advanced Features
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '0.5rem',
            fontSize: '0.9rem'
          }}>
            <div>• Iceberg & Hidden Orders</div>
            <div>• TWAP/VWAP Algorithms</div>
            <div>• Cross-venue Liquidity</div>
            <div>• Anti-gaming Protection</div>
            <div>• Size Discovery Protocol</div>
            <div>• Price Improvement Engine</div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedComponent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2.5rem',
            borderRadius: '16px',
            maxWidth: selectedConcept ? '1400px' : '1000px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '3px solid rgba(59, 130, 246, 0.4)',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: '#1f2937',
                margin: 0,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                {selectedComponent.icon} {selectedComponent.title}
              </h2>
              <button
                onClick={closeModal}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '2px solid rgba(59, 130, 246, 0.2)',
              marginBottom: '2rem'
            }}>
              <p style={{
                fontSize: '1.1rem',
                color: '#374151',
                fontWeight: '500',
                margin: 0,
                lineHeight: '1.6'
              }}>
                {selectedComponent.description}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: selectedConcept ? '400px 1fr' : '1fr',
              gap: '2rem'
            }}>
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  Key Features
                </h3>
                <div style={{
                  display: 'grid',
                  gap: '0.75rem'
                }}>
                  {selectedComponent.details.map((detail, idx) => (
                    <div key={idx} style={{
                      backgroundColor: selectedConcept?.name === detail ? 'rgba(34, 197, 94, 0.25)' : 'rgba(34, 197, 94, 0.1)',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: selectedConcept?.name === detail ? '2px solid rgba(34, 197, 94, 0.5)' : '2px solid rgba(34, 197, 94, 0.2)',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      color: '#166534',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedConcept?.name !== detail) {
                        e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.2)'
                      }
                      e.currentTarget.style.transform = 'translateX(4px)'
                    }}
                    onMouseLeave={(e) => {
                      if (selectedConcept?.name !== detail) {
                        e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.1)'
                      }
                      e.currentTarget.style.transform = 'translateX(0)'
                    }}
                    onClick={() => setSelectedConcept({ name: detail })}
                    >
                      • {detail}
                    </div>
                  ))}
                </div>
              </div>

              {selectedConcept && (
                <div style={{
                  backgroundColor: '#f8fafc',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <h4 style={{
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      color: '#1e293b',
                      margin: 0
                    }}>
                      {selectedConcept.name}
                    </h4>
                    <button
                      onClick={() => setSelectedConcept(null)}
                      style={{
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        backgroundColor: '#6b7280',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      ✕
                    </button>
                  </div>

                  <p style={{
                    fontSize: '0.95rem',
                    color: '#475569',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {featureDetails[selectedConcept.name] || 'No detailed information available.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DarkPoolMatchingEngine

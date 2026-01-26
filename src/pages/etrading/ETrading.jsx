import { useState } from 'react'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'
import Breadcrumb from '../../components/Breadcrumb'

const ETRADING_COLORS = {
  primary: '#4ade80',
  primaryHover: '#86efac',
  bg: 'rgba(34, 197, 94, 0.1)',
  border: 'rgba(34, 197, 94, 0.3)',
  arrow: '#22c55e',
  hoverBg: 'rgba(34, 197, 94, 0.2)',
  topicBg: 'rgba(34, 197, 94, 0.2)'
}

function ETrading({ onBack, onSelectItem, breadcrumb }) {
  const etradingItems = [
    {
      id: 'RFQ Systems',
      name: 'RFQ Systems',
      icon: '💬',
      color: '#22c55e',
      description: 'Request-for-Quote systems via Tradeweb, Bloomberg, and MarketAxess. Electronic customer RFQ workflows with auto-quoting engines, competitive quote generation using real-time market data, spread calculation, and automated response mechanisms. Covers D2C (dealer-to-customer) and D2D (dealer-to-dealer) trading flows.'
    },
    {
      id: 'Fixed Income Trading',
      name: 'Fixed Income Trading',
      icon: '📜',
      color: '#3b82f6',
      description: 'US Treasury Bonds, USD Interest Rate Swaps, Credit Default Swaps, and Rates trading. Multi-tiered electronic trading systems including voice, click-to-trade, and fully automated execution. Covers yield curve construction, bond pricing models, duration/convexity calculations, and swap valuation.'
    },
    {
      id: 'Order Management',
      name: 'Order Management System',
      icon: '📋',
      color: '#f59e0b',
      description: 'Complete order lifecycle management from inception to settlement. Order routing logic, execution workflows, partial fills handling, and trade booking to back-office systems. OMS integration with EMS, PMS, and trading platforms via FIX. Covers order types, time-in-force, and regulatory reporting (MiFID II, CAT).'
    },
    {
      id: 'Execution Algorithms',
      name: 'Execution Algorithms',
      icon: '🎯',
      color: '#ef4444',
      description: 'Algorithmic execution strategies including TWAP, VWAP, POV (Percentage of Volume), Implementation Shortfall, and Iceberg orders. Smart order routing (SOR) across lit and dark venues. Market impact modeling, transaction cost analysis (TCA), and optimal execution benchmarks. Covers algo parameter tuning and A/B testing.'
    },
    {
      id: 'Automated Hedging',
      name: 'Automated Hedging',
      icon: '🔄',
      color: '#8b5cf6',
      description: 'Automatic hedging of customer trades with delta, gamma, and vega hedging strategies. Risk-neutral position management using futures, options, and swaps. Real-time Greeks calculation, hedge ratio optimization, and basis risk management. Covers portfolio hedging, cross-asset hedging, and hedge accounting.'
    },
    {
      id: 'Price Contribution',
      name: 'Real-time Pricing',
      icon: '💰',
      color: '#ec4899',
      description: 'Real-time price contribution to ECNs, MTFs, and trading venues. Price calculation engines using market data, inventory, and risk parameters. Market making strategies with bid-ask spread optimization, quote skewing, and inventory management. Covers price discovery, fair value calculation, and quote throttling.'
    },
    {
      id: 'Low Latency',
      name: 'Low Latency Systems',
      icon: '🚀',
      color: '#06b6d4',
      description: 'Ultra-low latency architectures achieving sub-100 microsecond execution. Kernel bypass with DPDK/RDMA, lock-free data structures, memory-mapped files, and CPU pinning. Hardware timestamping, FPGA acceleration, and co-location strategies. Covers JVM tuning, GC avoidance, and mechanical sympathy principles.'
    },
    {
      id: 'Aeron Messaging',
      name: 'Aeron Messaging',
      icon: '⚡',
      color: '#f97316',
      description: 'High-performance, low-latency messaging with Aeron achieving millions of messages per second. UDP unicast/multicast transport, IPC for inter-process communication, and Aeron Cluster for fault-tolerant replication. Covers publication/subscription patterns, back-pressure handling, and archive for message replay.'
    },
    {
      id: 'FIX Protocol',
      name: 'FIX Protocol',
      icon: '📡',
      color: '#10b981',
      description: 'Financial Information eXchange protocol - the industry standard for trading connectivity. FIX 4.2/4.4/5.0 SP2 message formats, session management (logon, heartbeat, sequence reset), and execution reports. Covers FIX engines (QuickFIX/J), FIXML, FIX Orchestra, and drop copy connections for regulatory compliance.'
    },
    {
      id: 'Java Trading',
      name: 'Java for Trading',
      icon: '☕',
      color: '#fbbf24',
      description: 'Java for high-frequency trading: multithreading with ExecutorService and ForkJoinPool, concurrent collections (ConcurrentHashMap, CopyOnWriteArrayList), and lock-free programming with Atomics. Spring Boot microservices with reactive streams. Covers object pooling, off-heap memory, Chronicle Queue, and Agrona primitives.'
    },
    {
      id: 'Distributed Systems',
      name: 'Distributed Systems',
      icon: '🌐',
      color: '#a855f7',
      description: 'Distributed computing for trading infrastructure: event-driven architectures with Kafka/Solace, CQRS and event sourcing patterns, and saga orchestration. Consensus algorithms (Raft, Paxos), distributed caching with Hazelcast/Redis, and service mesh. Covers CAP theorem trade-offs, idempotency, and exactly-once delivery.'
    },
    {
      id: 'Risk Management',
      name: 'Risk Management',
      icon: '🛡️',
      color: '#64748b',
      description: 'Pre-trade risk controls: position limits, notional limits, and fat-finger checks. Post-trade analytics: VaR, CVaR, stress testing, and scenario analysis. Real-time P&L monitoring, Greeks aggregation, and counterparty credit risk. Covers regulatory capital (Basel III), margin calculations, and kill switches for circuit breakers.'
    },
    {
      id: 'Disruptor Pattern',
      name: 'Disruptor Pattern',
      icon: '💫',
      color: '#22c55e',
      description: 'LMAX Disruptor for ultra-low latency inter-thread messaging achieving 25M+ ops/sec. Ring buffer with pre-allocated events, lock-free sequences with cache line padding, and configurable wait strategies. Covers single/multi-producer sequencers, event handler pipelines, memory barriers, and false sharing prevention.'
    }
  ]

  const { focusedIndex, itemRefs } = useKeyboardNavigation({
    items: etradingItems,
    onSelect: (item) => onSelectItem(item.id),
    onBack,
    enabled: true,
    gridColumns: 1,
    loop: true
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #14532d, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={onBack}
              style={{
                background: '#22c55e',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500',
                fontSize: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#16a34a'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#22c55e'
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              ← Back to Menu
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #4ade80, #22c55e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              📈 eTrading
            </h1>
          </div>
        </div>

        {/* Breadcrumb */}
        <Breadcrumb
          breadcrumbStack={[
            { name: 'eTrading', icon: '📈' }
          ]}
          colors={ETRADING_COLORS}
        />

        <p style={{
          fontSize: '1.2rem',
          color: '#d1d5db',
          textAlign: 'center',
          marginBottom: '3rem',
          lineHeight: '1.8'
        }}>
          Master electronic trading systems, protocols, and low-latency architectures used in financial markets.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem'
        }}>
          {etradingItems.map((item, index) => (
            <button
              key={item.id}
              ref={(el) => itemRefs.current[index] = el}
              onClick={() => onSelectItem(item.id)}
              tabIndex={focusedIndex === index ? 0 : -1}
              role="link"
              aria-label={`${item.name}. ${item.description}`}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                border: `2px solid ${item.color}`,
                cursor: 'pointer',
                transition: 'all 0.3s',
                transform: focusedIndex === index ? 'translateY(-0.5rem)' : 'translateY(0)',
                boxShadow: focusedIndex === index
                  ? `0 25px 50px -12px ${item.color}50`
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                textAlign: 'left',
                width: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-0.5rem)'
                e.currentTarget.style.boxShadow = `0 25px 50px -12px ${item.color}50`
              }}
              onMouseLeave={(e) => {
                if (focusedIndex !== index) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <span style={{ fontSize: '2.5rem' }}>{item.icon}</span>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#4ade80',
                  marginBottom: '0.25rem'
                }}>
                  {item.name}
                </h3>
              </div>

              <p style={{
                fontSize: '0.9rem',
                color: '#d1d5db',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                {item.description}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '0.5rem',
                fontSize: '0.9rem',
                color: item.color,
                fontWeight: '600',
                paddingTop: '0.75rem',
                borderTop: '1px solid #374151'
              }}>
                <span>Explore Topic</span>
                <span>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ETrading

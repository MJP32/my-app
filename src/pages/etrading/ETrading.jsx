import { useState, useEffect } from 'react'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import { useTheme } from '../../contexts/ThemeContext'

const ETRADING_COLORS = {
  primary: '#4ade80',
  primaryHover: '#86efac',
  bg: 'rgba(34, 197, 94, 0.1)',
  border: 'rgba(34, 197, 94, 0.3)',
  arrow: '#22c55e',
  hoverBg: 'rgba(34, 197, 94, 0.2)',
  topicBg: 'rgba(34, 197, 94, 0.2)'
}

const categories = {
  all: { label: 'All', ids: null },
  trading: { label: 'Trading & Pricing', ids: ['RFQ Systems', 'Fixed Income Trading', 'Order Management', 'Price Contribution'] },
  execution: { label: 'Execution & Risk', ids: ['Execution Algorithms', 'Automated Hedging', 'Risk Management'] },
  infrastructure: { label: 'Low Latency Systems', ids: ['Low Latency', 'Latency Measurement', 'Java Trading', 'Disruptor Pattern'] },
  messaging: { label: 'Protocols & Messaging', ids: ['FIX Protocol', 'Aeron Messaging', 'Distributed Systems'] }
}

function ETrading({ onBack, onSelectItem, breadcrumb, initialCategory, onInitialCategoryUsed }) {
  const { isDark } = useTheme()
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'all')

  useEffect(() => {
    if (initialCategory && onInitialCategoryUsed) {
      onInitialCategoryUsed()
    }
  }, [initialCategory, onInitialCategoryUsed])

  const etradingItems = [
    // Trading & Pricing
    {
      id: 'RFQ Systems',
      name: 'RFQ Systems',
      icon: '\u{1F4AC}',
      color: '#22c55e',
      description: 'Request-for-Quote systems via Tradeweb, Bloomberg, and MarketAxess. Electronic customer RFQ workflows with auto-quoting engines, competitive quote generation using real-time market data, spread calculation, and automated response mechanisms. Covers D2C (dealer-to-customer) and D2D (dealer-to-dealer) trading flows.'
    },
    {
      id: 'Fixed Income Trading',
      name: 'Fixed Income Trading',
      icon: '\u{1F4DC}',
      color: '#3b82f6',
      description: 'US Treasury Bonds, USD Interest Rate Swaps, Credit Default Swaps, and Rates trading. Multi-tiered electronic trading systems including voice, click-to-trade, and fully automated execution. Covers yield curve construction, bond pricing models, duration/convexity calculations, and swap valuation.'
    },
    {
      id: 'Order Management',
      name: 'Order Management System',
      icon: '\u{1F4CB}',
      color: '#f59e0b',
      description: 'Complete order lifecycle management from inception to settlement. Order routing logic, execution workflows, partial fills handling, and trade booking to back-office systems. OMS integration with EMS, PMS, and trading platforms via FIX. Covers order types, time-in-force, and regulatory reporting (MiFID II, CAT).'
    },
    {
      id: 'Price Contribution',
      name: 'Real-time Pricing',
      icon: '\u{1F4B0}',
      color: '#ec4899',
      description: 'Real-time price contribution to ECNs, MTFs, and trading venues. Price calculation engines using market data, inventory, and risk parameters. Market making strategies with bid-ask spread optimization, quote skewing, and inventory management. Covers price discovery, fair value calculation, and quote throttling.'
    },
    // Execution & Risk
    {
      id: 'Execution Algorithms',
      name: 'Execution Algorithms',
      icon: '\u{1F3AF}',
      color: '#ef4444',
      description: 'Algorithmic execution strategies including TWAP, VWAP, POV (Percentage of Volume), Implementation Shortfall, and Iceberg orders. Smart order routing (SOR) across lit and dark venues. Market impact modeling, transaction cost analysis (TCA), and optimal execution benchmarks. Covers algo parameter tuning and A/B testing.'
    },
    {
      id: 'Automated Hedging',
      name: 'Automated Hedging',
      icon: '\u{1F504}',
      color: '#8b5cf6',
      description: 'Automatic hedging of customer trades with delta, gamma, and vega hedging strategies. Risk-neutral position management using futures, options, and swaps. Real-time Greeks calculation, hedge ratio optimization, and basis risk management. Covers portfolio hedging, cross-asset hedging, and hedge accounting.'
    },
    {
      id: 'Risk Management',
      name: 'Risk Management',
      icon: '\u{1F6E1}\uFE0F',
      color: '#64748b',
      description: 'Pre-trade risk controls: position limits, notional limits, and fat-finger checks. Post-trade analytics: VaR, CVaR, stress testing, and scenario analysis. Real-time P&L monitoring, Greeks aggregation, and counterparty credit risk. Covers regulatory capital (Basel III), margin calculations, and kill switches for circuit breakers.'
    },
    // Low Latency Systems
    {
      id: 'Low Latency',
      name: 'Low Latency Systems',
      icon: '\u{1F680}',
      color: '#06b6d4',
      description: 'Ultra-low latency architectures achieving sub-100 microsecond execution. Kernel bypass with DPDK/RDMA, lock-free data structures, memory-mapped files, and CPU pinning. Hardware timestamping, FPGA acceleration, and co-location strategies. Covers JVM tuning, GC avoidance, and mechanical sympathy principles.'
    },
    {
      id: 'Latency Measurement',
      name: 'Latency Measurement',
      icon: '\u23F1\uFE0F',
      color: '#f59e0b',
      description: 'Comprehensive latency measurement in trading systems. Hardware timestamping with NIC precision, System.nanoTime() for application-level measurement, JMH benchmarking, and percentile analysis (p50, p95, p99, p99.9). Covers JFR profiling, tcpdump/Wireshark with hardware timestamps, Chronicle latency tracking, and production monitoring for sub-microsecond accuracy.'
    },
    {
      id: 'Java Trading',
      name: 'Java for Trading',
      icon: '\u2615',
      color: '#fbbf24',
      description: 'Java for high-frequency trading: multithreading with ExecutorService and ForkJoinPool, concurrent collections (ConcurrentHashMap, CopyOnWriteArrayList), and lock-free programming with Atomics. Spring Boot microservices with reactive streams. Covers object pooling, off-heap memory, Chronicle Queue, and Agrona primitives.'
    },
    {
      id: 'Disruptor Pattern',
      name: 'Disruptor Pattern',
      icon: '\u{1F4AB}',
      color: '#22c55e',
      description: 'LMAX Disruptor for ultra-low latency inter-thread messaging achieving 25M+ ops/sec. Ring buffer with pre-allocated events, lock-free sequences with cache line padding, and configurable wait strategies. Covers single/multi-producer sequencers, event handler pipelines, memory barriers, and false sharing prevention.'
    },
    // Protocols & Messaging
    {
      id: 'FIX Protocol',
      name: 'FIX Protocol',
      icon: '\u{1F4E1}',
      color: '#10b981',
      description: 'Financial Information eXchange protocol - the industry standard for trading connectivity. FIX 4.2/4.4/5.0 SP2 message formats, session management (logon, heartbeat, sequence reset), and execution reports. Covers FIX engines (QuickFIX/J), FIXML, FIX Orchestra, and drop copy connections for regulatory compliance.'
    },
    {
      id: 'Aeron Messaging',
      name: 'Aeron Messaging',
      icon: '\u26A1',
      color: '#f97316',
      description: 'High-performance, low-latency messaging with Aeron achieving millions of messages per second. UDP unicast/multicast transport, IPC for inter-process communication, and Aeron Cluster for fault-tolerant replication. Covers publication/subscription patterns, back-pressure handling, and archive for message replay.'
    },
    {
      id: 'Distributed Systems',
      name: 'Distributed Systems',
      icon: '\u{1F310}',
      color: '#a855f7',
      description: 'Distributed computing for trading infrastructure: event-driven architectures with Kafka/Solace, CQRS and event sourcing patterns, and saga orchestration. Consensus algorithms (Raft, Paxos), distributed caching with Hazelcast/Redis, and service mesh. Covers CAP theorem trade-offs, idempotency, and exactly-once delivery.'
    }
  ]

  const filteredItems = activeCategory === 'all'
    ? etradingItems
    : etradingItems.filter(item => categories[activeCategory].ids.includes(item.id))

  const { focusedIndex, itemRefs } = useKeyboardNavigation({
    items: filteredItems,
    onSelect: (item) => onSelectItem(item.id),
    onBack,
    enabled: true,
    gridColumns: 2,
    loop: true
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark
        ? 'linear-gradient(to bottom right, #111827, #14532d, #111827)'
        : 'linear-gradient(to bottom right, #f8fafc, #dcfce7, #f8fafc)',
      color: isDark ? 'white' : '#1f2937',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <Breadcrumb
          breadcrumbStack={[
            { name: 'eTrading', icon: '\u{1F4C8}' }
          ]}
          colors={ETRADING_COLORS}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
        />

        {/* Collapsible Sidebar for quick topic navigation */}
        <CollapsibleSidebar
          items={filteredItems}
          selectedIndex={-1}
          onSelect={(index) => onSelectItem(filteredItems[index].id)}
          title="Topics"
          getItemLabel={(item) => item.name}
          getItemIcon={(item) => item.icon}
          primaryColor={ETRADING_COLORS.primary}
        />

        <p style={{
          fontSize: '1.2rem',
          color: isDark ? '#d1d5db' : '#4b5563',
          textAlign: 'center',
          marginBottom: '3rem',
          lineHeight: '1.8'
        }}>
          Master electronic trading systems, protocols, and low-latency architectures used in financial markets.
        </p>

        {/* Tab bar for category filtering */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '2px solid #374151', overflowX: 'auto' }}>
          {Object.entries(categories).map(([key, cat]) => (
            <button key={key} onClick={() => setActiveCategory(key)}
              style={{
                padding: '1rem 1.5rem', fontSize: '1rem', fontWeight: '600',
                backgroundColor: activeCategory === key ? '#22c55e' : 'transparent',
                color: activeCategory === key ? 'white' : '#9ca3af',
                border: 'none', borderRadius: '8px 8px 0 0', cursor: 'pointer',
                transition: 'all 0.2s ease', whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => { if (activeCategory !== key) { e.target.style.backgroundColor = '#374151'; e.target.style.color = '#d1d5db' } }}
              onMouseLeave={(e) => { if (activeCategory !== key) { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#9ca3af' } }}
            >{cat.label}</button>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredItems.map((item, index) => (
            <button
              key={item.id}
              ref={(el) => itemRefs.current[index] = el}
              onClick={() => onSelectItem(item.id)}
              tabIndex={focusedIndex === index ? 0 : -1}
              role="link"
              aria-label={`${item.name}. ${item.description}`}
              style={{
                background: isDark
                  ? 'linear-gradient(to bottom right, #1f2937, #111827)'
                  : 'linear-gradient(to bottom right, #ffffff, #f9fafb)',
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
                  color: isDark ? '#4ade80' : '#16a34a',
                  marginBottom: '0.25rem'
                }}>
                  {item.name}
                </h3>
              </div>

              <p style={{
                fontSize: '0.9rem',
                color: isDark ? '#d1d5db' : '#4b5563',
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
                borderTop: isDark ? '1px solid #374151' : '1px solid #e5e7eb'
              }}>
                <span>Explore Topic</span>
                <span>{'\u2192'}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ETrading

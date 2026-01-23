import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function EtradingQuestions({ onBack, breadcrumb }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const renderFormattedAnswer = (text) => {
    const lines = text.split('\n')
    const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']
    let colorIndex = 0

    return lines.map((line, lineIndex) => {
      const boldMatch = line.match(/^\*\*(.+?):\*\*/)
      if (boldMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        return (
          <div key={lineIndex} style={{ marginTop: lineIndex > 0 ? '1rem' : 0 }}>
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.05rem'
            }}>
              {boldMatch[1]}:
            </span>
            {line.substring(boldMatch[0].length)}
          </div>
        )
      }

      const numberedMatch = line.match(/^\*\*(\d+\.\s+.+?):\*\*/)
      if (numberedMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        return (
          <div key={lineIndex} style={{ marginTop: lineIndex > 0 ? '1rem' : 0 }}>
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.05rem'
            }}>
              {numberedMatch[1]}:
            </span>
            {line.substring(numberedMatch[0].length)}
          </div>
        )
      }

      return <div key={lineIndex}>{line}</div>
    })
  }

  const questions = [
    {
      id: 1,
      category: 'RFQ Systems',
      question: 'What is an RFQ (Request for Quote) system and how does it work in electronic trading?',
      answer: `**What is RFQ?**
- Request for Quote - client asks dealers for prices on a specific trade
- Used heavily in fixed income, FX, and derivatives markets
- Alternatives to order-driven markets (order books)
- Common platforms: Tradeweb, Bloomberg, MarketAxess

**RFQ Workflow:**

**1. Client Initiates:**
- Client sends RFQ specifying instrument, quantity, direction (buy/sell)
- May request from single dealer (directed) or multiple dealers (competitive)
- Typical RFQ timeout: 30-60 seconds

**2. Dealer Receives:**
- RFQ routed to dealer's auto-quoting or manual trading systems
- System performs credit checks, inventory analysis, risk assessment
- Calculates appropriate bid/offer based on market conditions

**3. Quote Generation:**
- Auto-quoter generates price within milliseconds
- Considers: market data, inventory position, client tier, volatility
- Applies spread based on trade size and market conditions

**4. Client Response:**
- Client receives quotes from multiple dealers
- Compares prices, selects best quote
- Executes or lets quotes expire

**Quote Validity:**
- Quotes typically valid for 2-10 seconds
- Client must accept within validity window
- Expired quotes require new RFQ

**Key Metrics:**
- Quote rate (% of RFQs responded to)
- Win rate (% of quotes accepted)
- Response latency (time to generate quote)
- Quote-to-trade ratio`
    },
    {
      id: 2,
      category: 'FIX Protocol',
      question: 'Explain the FIX Protocol and its importance in trading systems',
      answer: `**What is FIX?**
- Financial Information eXchange protocol
- Industry standard for electronic trading communication
- Text-based, tag=value format
- Versions: FIX 4.0, 4.2, 4.4, 5.0 (FIXT)

**FIX Message Structure:**

\`\`\`
8=FIX.4.4|9=178|35=D|49=SENDER|56=TARGET|34=12|52=20240115-10:30:00|
11=ORDER123|21=1|55=AAPL|54=1|38=1000|40=2|44=150.00|59=0|10=128|
\`\`\`

**Key Tags:**

**Header Tags:**
- 8 = BeginString (FIX version)
- 9 = BodyLength
- 35 = MsgType (D=NewOrder, 8=ExecutionReport)
- 49 = SenderCompID
- 56 = TargetCompID
- 34 = MsgSeqNum

**Order Tags:**
- 11 = ClOrdID (client order ID)
- 55 = Symbol
- 54 = Side (1=Buy, 2=Sell)
- 38 = OrderQty
- 40 = OrdType (1=Market, 2=Limit)
- 44 = Price

**Message Types:**
- D = New Order Single
- G = Order Cancel/Replace
- F = Order Cancel Request
- 8 = Execution Report
- 9 = Order Cancel Reject
- A = Logon
- 5 = Logout
- 0 = Heartbeat

**Session Management:**
- Logon/Logout handshake
- Heartbeat for connection monitoring
- Sequence number tracking
- Gap fill for message recovery

**FIX Engine Responsibilities:**
- Session management and authentication
- Message parsing and validation
- Sequence number management
- Message persistence and recovery
- Checksum validation`
    },
    {
      id: 3,
      category: 'Low Latency',
      question: 'What techniques are used to achieve low latency in trading systems?',
      answer: `**Low Latency Techniques:**

**1. Network Optimization:**
- Kernel bypass (DPDK, Solarflare OpenOnload)
- Direct memory access (RDMA)
- Colocation - servers in exchange data centers
- Dedicated network lines, microwave/laser links
- TCP tuning: Nagle disabled, socket buffers optimized

**2. Lock-Free Data Structures:**
- Avoid mutex/synchronized blocks
- Use CAS (Compare-And-Swap) operations
- Ring buffers (Disruptor pattern)
- Single-writer principle

\`\`\`java
// Lock-free queue using Disruptor
RingBuffer<OrderEvent> ringBuffer = RingBuffer.createSingleProducer(
    OrderEvent::new,
    1024,
    new BusySpinWaitStrategy()
);
\`\`\`

**3. Memory Management:**
- Object pooling to avoid GC
- Off-heap memory (ByteBuffer.allocateDirect)
- Flyweight pattern for messages
- Pre-allocated arrays instead of collections

**4. JVM Optimization:**
- G1GC or ZGC with tuned settings
- -XX:+AlwaysPreTouch
- -XX:+UseNUMA
- JIT warmup before trading hours
- Escape analysis optimization

**5. Code-Level Optimizations:**
- Primitive types over boxed types
- Array access over collection iteration
- Final fields for JIT optimization
- Avoid allocations in hot paths
- Batch operations where possible

**6. Hardware:**
- Low-latency NICs (Solarflare, Mellanox)
- NVMe storage
- CPU pinning and isolation
- NUMA-aware memory allocation

**Typical Latencies:**
- Ultra-low latency: < 10 microseconds
- Low latency: 10-100 microseconds
- Standard: 1-10 milliseconds`
    },
    {
      id: 4,
      category: 'Order Management',
      question: 'Describe the components of an Order Management System (OMS)',
      answer: `**OMS Core Components:**

**1. Order Entry:**
- Validate order parameters
- Credit/risk checks
- Regulatory compliance checks
- Client identification and permissions

**2. Order Routing:**
- Smart order routing (SOR)
- Venue selection based on liquidity, fees, latency
- Order splitting across venues
- Child order generation

**3. Order State Machine:**
\`\`\`
NEW → PENDING → WORKING → PARTIALLY_FILLED → FILLED
                    ↓
              CANCELLED/REJECTED
\`\`\`

**4. Execution Management:**
- Track fills and partial fills
- Average price calculation
- Slippage monitoring
- Fill allocation to client accounts

**5. Position Management:**
- Real-time position updates
- P&L calculation
- Position limits monitoring
- Inventory tracking

**Key OMS Functions:**

**Order Lifecycle:**
- New order submission
- Order modification (price, quantity)
- Order cancellation
- Order replacement (cancel/replace)

**Risk Controls:**
- Pre-trade risk checks
- Position limits
- Fat finger checks
- Market impact limits
- Credit limits

**Reporting:**
- Real-time order status
- Execution reports
- Trade confirmations
- End-of-day reports
- Regulatory reporting (MiFID II, CAT)

**Integration Points:**
- Front-end trading UI
- FIX connectivity to venues
- Market data feeds
- Risk management systems
- Clearing and settlement`
    },
    {
      id: 5,
      category: 'Market Making',
      question: 'How do electronic market making systems work?',
      answer: `**Market Making Fundamentals:**

**What is Market Making?**
- Providing continuous bid and offer prices
- Earning the bid-ask spread
- Providing liquidity to the market
- Managing inventory risk

**Auto-Quoting System Components:**

**1. Price Engine:**
- Calculate fair value from market data
- Apply bid-offer spread
- Adjust for inventory position
- Factor in volatility and market conditions

**2. Inventory Manager:**
- Track current position
- Skew prices to reduce inventory
- Set position limits
- Trigger hedging when needed

**3. Risk Manager:**
- Real-time P&L monitoring
- Greeks calculation (delta, gamma, vega)
- Exposure limits
- Kill switch for market stress

**Pricing Formula:**
\`\`\`
Mid Price = Theoretical Fair Value
Bid = Mid - (BaseSpread/2) - InventorySkew - VolatilityAdjustment
Offer = Mid + (BaseSpread/2) + InventorySkew + VolatilityAdjustment
\`\`\`

**Inventory Skew:**
- Long position → lower bid, lower offer (discourage buying)
- Short position → higher bid, higher offer (discourage selling)
- Neutral position → symmetric quotes

**Spread Factors:**
- Base spread for the instrument
- Client tier (tighter for top clients)
- Trade size (wider for large trades)
- Market volatility
- Time of day
- Inventory position

**Hedging Strategies:**
- Delta hedging with underlying
- Cross-asset hedging
- Aggregated hedging (net positions)
- Real-time vs batch hedging

**Key Metrics:**
- Spread captured
- Inventory turnover
- Win rate on RFQs
- P&L per trade
- Sharpe ratio`
    },
    {
      id: 6,
      category: 'Aeron Messaging',
      question: 'What is Aeron and why is it used in trading systems?',
      answer: `**What is Aeron?**
- High-performance messaging library
- Developed by Real Logic (Martin Thompson)
- Ultra-low latency, high throughput
- Used in trading, market data, inter-process communication

**Key Features:**

**1. Transport Types:**
- UDP Unicast - point-to-point
- UDP Multicast - one-to-many broadcast
- IPC (Inter-Process Communication) - same machine
- All achieve sub-microsecond latency

**2. Zero-Copy Design:**
- Messages not copied between buffers
- Direct memory access
- Flyweight pattern for message parsing
- Reduces GC pressure

**3. Reliable UDP:**
- NAK-based reliability (negative acknowledgments)
- Flow control prevents overwhelming consumers
- Message ordering guaranteed within stream
- Heartbeats for liveness detection

**Basic Usage:**

\`\`\`java
// Publisher
Aeron aeron = Aeron.connect();
Publication publication = aeron.addPublication("aeron:udp?endpoint=localhost:40123", 1001);

UnsafeBuffer buffer = new UnsafeBuffer(ByteBuffer.allocateDirect(256));
buffer.putStringWithoutLengthAscii(0, "Order:BUY,AAPL,100,150.00");
publication.offer(buffer, 0, messageLength);

// Subscriber
Subscription subscription = aeron.addSubscription("aeron:udp?endpoint=localhost:40123", 1001);

FragmentHandler handler = (buffer, offset, length, header) -> {
    String message = buffer.getStringWithoutLengthAscii(offset, length);
    processOrder(message);
};

while (running) {
    subscription.poll(handler, 10);
}
\`\`\`

**Use Cases in Trading:**
- Market data distribution
- Order routing between components
- Inter-process communication
- Cluster replication

**Performance:**
- < 1 microsecond latency
- Millions of messages per second
- Consistent latency (low jitter)
- Scales across cores`
    },
    {
      id: 7,
      category: 'Risk Management',
      question: 'What pre-trade and post-trade risk controls are essential in trading systems?',
      answer: `**Pre-Trade Risk Controls:**

**1. Order Validation:**
- Valid symbol/instrument check
- Price reasonability (within % of market)
- Quantity within allowed range
- Side validation (buy/sell)

**2. Fat Finger Checks:**
- Maximum order size limits
- Price deviation from market
- Notional value limits
- Rate limiting (orders per second)

**3. Position Limits:**
- Net position limits per instrument
- Gross position limits
- Sector/portfolio limits
- End-of-day limits

**4. Credit Checks:**
- Available credit/buying power
- Margin requirements
- Collateral validation
- Counterparty limits

**5. Regulatory Checks:**
- Short selling restrictions
- Circuit breaker status
- Trading halts
- Market hours validation

**Post-Trade Risk Controls:**

**1. Real-Time Monitoring:**
- P&L monitoring
- Position tracking
- Exposure calculations
- Greeks monitoring (delta, gamma, vega, theta)

**2. Limit Monitoring:**
- VaR (Value at Risk) limits
- Stress test limits
- Concentration limits
- Stop-loss triggers

**3. Kill Switches:**
- Cancel all orders
- Prevent new orders
- Close positions
- Disconnect from venues

**Implementation Pattern:**

\`\`\`java
public class RiskCheck {
    public RiskCheckResult validate(Order order) {
        // Fat finger checks
        if (order.getQuantity() > MAX_ORDER_SIZE) {
            return RiskCheckResult.reject("Exceeds max order size");
        }

        // Price check
        double marketPrice = marketData.getPrice(order.getSymbol());
        double deviation = Math.abs(order.getPrice() - marketPrice) / marketPrice;
        if (deviation > MAX_PRICE_DEVIATION) {
            return RiskCheckResult.reject("Price deviation too high");
        }

        // Position limit check
        double newPosition = positionManager.getPosition(order.getSymbol())
            + order.getSignedQuantity();
        if (Math.abs(newPosition) > getPositionLimit(order.getSymbol())) {
            return RiskCheckResult.reject("Would breach position limit");
        }

        return RiskCheckResult.approve();
    }
}
\`\`\``
    },
    {
      id: 8,
      category: 'Execution Algorithms',
      question: 'Explain common execution algorithms like TWAP and VWAP',
      answer: `**What are Execution Algorithms?**
- Automated strategies to execute large orders
- Minimize market impact
- Achieve benchmark prices
- Reduce information leakage

**1. TWAP (Time-Weighted Average Price):**

**Strategy:**
- Slice order into equal parts
- Execute at regular time intervals
- Simple, predictable execution

\`\`\`java
public class TWAPAlgorithm {
    public List<ChildOrder> slice(Order parent, int slices, Duration duration) {
        int quantityPerSlice = parent.getQuantity() / slices;
        Duration interval = duration.dividedBy(slices);

        List<ChildOrder> children = new ArrayList<>();
        Instant startTime = Instant.now();

        for (int i = 0; i < slices; i++) {
            ChildOrder child = new ChildOrder();
            child.setQuantity(quantityPerSlice);
            child.setScheduledTime(startTime.plus(interval.multipliedBy(i)));
            children.add(child);
        }
        return children;
    }
}
\`\`\`

**Pros:** Simple, low market impact for liquid stocks
**Cons:** Doesn't adapt to market conditions

**2. VWAP (Volume-Weighted Average Price):**

**Strategy:**
- Execute proportionally to historical volume
- Higher volume periods = more execution
- Benchmark: day's VWAP

**Volume Profile:**
\`\`\`
9:30-10:00  | ████████████ 15%
10:00-11:00 | ████████ 10%
11:00-12:00 | ██████ 8%
12:00-13:00 | ████ 5%
13:00-14:00 | ██████ 8%
14:00-15:00 | ██████████ 12%
15:00-16:00 | ████████████████████ 25%
\`\`\`

**3. Implementation Shortfall:**
- Minimize slippage from decision price
- Aggressive at start, passive later
- Adapts to market momentum

**4. POV (Percentage of Volume):**
- Execute as % of market volume
- Example: 10% of market volume
- Adapts to actual trading activity

**5. Iceberg/Reserve Orders:**
- Show only portion of order (display quantity)
- Replenish as displayed quantity fills
- Hide true order size from market

**Algorithm Selection Factors:**
- Order urgency
- Market liquidity
- Information sensitivity
- Price benchmark
- Market conditions`
    },
    {
      id: 9,
      category: 'Fixed Income Trading',
      question: 'What are the unique challenges of electronic fixed income trading?',
      answer: `**Fixed Income Market Characteristics:**

**1. Market Structure:**
- Primarily dealer-to-client (D2C) market
- Less transparent than equities
- Many instruments per issuer (multiple bonds)
- Lower trading frequency per bond
- RFQ-based rather than order book

**2. Instrument Complexity:**
- Thousands of bond issues per issuer
- Each with different maturity, coupon, features
- Callable/puttable features
- Floating rate structures
- Credit risk considerations

**3. Liquidity Challenges:**
- Many bonds rarely trade
- Wide bid-ask spreads for illiquid bonds
- Concentrated liquidity in on-the-run issues
- Size discovery difficult

**Electronic Trading Solutions:**

**1. RFQ Platforms:**
- Tradeweb, Bloomberg, MarketAxess
- Multi-dealer competition
- Price transparency
- Audit trail

**2. All-to-All Trading:**
- Buy-side to buy-side trading
- Increases liquidity pool
- Platform: MarketAxess Open Trading

**3. Portfolio Trading:**
- Trade basket of bonds as single transaction
- Reduces execution risk
- Better pricing for package

**Pricing Challenges:**

\`\`\`java
public class BondPricer {
    public double calculatePrice(Bond bond, double yield) {
        double price = 0;
        double discountFactor;

        // Present value of coupon payments
        for (CashFlow cf : bond.getCashFlows()) {
            discountFactor = 1 / Math.pow(1 + yield/2, cf.getPeriods());
            price += cf.getAmount() * discountFactor;
        }

        // Add accrued interest for dirty price
        return price + calculateAccruedInterest(bond);
    }
}
\`\`\`

**Key Metrics:**
- Yield spread vs benchmark
- Duration and convexity
- Credit spread
- Z-spread, OAS

**Regulatory Considerations:**
- TRACE reporting (US)
- MiFID II transparency (EU)
- Best execution requirements`
    },
    {
      id: 10,
      category: 'System Architecture',
      question: 'Describe the architecture of a typical electronic trading system',
      answer: `**Trading System Architecture:**

**1. Market Data Layer:**
- Real-time price feeds (Reuters, Bloomberg)
- Normalized data model
- Low-latency distribution
- Conflation for slow consumers

**2. Order Management System (OMS):**
- Order lifecycle management
- Position tracking
- Risk checks
- Execution reports

**3. Execution Management System (EMS):**
- Smart order routing
- Algorithm execution
- Venue connectivity
- FIX engine

**4. Risk Management:**
- Pre-trade checks
- Real-time exposure
- P&L calculation
- Limit monitoring

**5. Pricing Engine:**
- Fair value calculation
- Spread management
- Auto-quoting logic
- Market making

**Component Communication:**

\`\`\`
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Market     │────▶│  Pricing    │────▶│  Quote      │
│  Data Feed  │     │  Engine     │     │  Publisher  │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Client     │────▶│  OMS        │────▶│  Execution  │
│  UI/API     │     │             │     │  Venues     │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Risk       │
                    │  Management │
                    └─────────────┘
\`\`\`

**Technology Stack:**
- Languages: Java, C++, Kotlin
- Messaging: Aeron, Chronicle Queue, Kafka
- Database: kdb+, TimescaleDB, Redis
- Protocols: FIX, proprietary binary

**High Availability:**
- Active-passive or active-active clusters
- Database replication
- Message replay capability
- Disaster recovery site

**Monitoring:**
- Latency histograms
- Order flow metrics
- Error rates
- Position dashboards

**Performance Requirements:**
- Order processing: < 100 microseconds
- Market data: < 10 microseconds
- Quote generation: < 1 millisecond
- 99.99% uptime`
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #14532d, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <button
            onClick={onBack}
            style={{
              background: '#22c55e',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#16a34a'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#22c55e'}
          >
            ← Back to Questions
          </button>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #4ade80, #22c55e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            📈 eTrading Interview Questions
          </h1>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} />

        <p style={{
          color: '#9ca3af',
          marginBottom: '2rem',
          fontSize: '1.1rem'
        }}>
          Master electronic trading concepts, protocols, and low-latency architectures for trading system interviews.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {questions.map((q) => (
            <div
              key={q.id}
              style={{
                background: 'linear-gradient(to right, #1f2937, #111827)',
                borderRadius: '12px',
                border: expandedQuestion === q.id ? '2px solid #22c55e' : '2px solid #374151',
                overflow: 'hidden',
                transition: 'all 0.3s'
              }}
            >
              <button
                onClick={() => setExpandedQuestion(expandedQuestion === q.id ? null : q.id)}
                style={{
                  width: '100%',
                  padding: '1.5rem',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: 'white'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <div style={{ flex: 1 }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(34, 197, 94, 0.2)',
                      color: '#4ade80',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem'
                    }}>
                      {q.category}
                    </span>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: '#e5e7eb',
                      lineHeight: '1.5'
                    }}>
                      {q.question}
                    </h3>
                  </div>
                  <span style={{
                    fontSize: '1.5rem',
                    color: '#4ade80',
                    transform: expandedQuestion === q.id ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s'
                  }}>
                    ▼
                  </span>
                </div>
              </button>

              {expandedQuestion === q.id && (
                <div style={{
                  padding: '0 1.5rem 1.5rem',
                  borderTop: '1px solid #374151'
                }}>
                  <div style={{
                    paddingTop: '1.5rem',
                    color: '#d1d5db',
                    lineHeight: '1.8',
                    fontSize: '1rem',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {renderFormattedAnswer(q.answer)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EtradingQuestions

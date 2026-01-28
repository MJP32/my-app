import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

function EtradingQuestions({ onBack, breadcrumb }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const renderFormattedAnswer = (text) => {
    const lines = text.split('\n')
    const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']
    let colorIndex = 0
    const result = []
    let inCodeBlock = false
    let codeLines = []
    let codeLanguage = 'java'

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex]

      // Check for code block start/end
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          // Start of code block
          inCodeBlock = true
          codeLanguage = line.trim().substring(3) || 'java'
          codeLines = []
        } else {
          // End of code block
          inCodeBlock = false
          const codeString = codeLines.join('\n')
          result.push(
            <div key={`code-${lineIndex}`} style={{ margin: '1rem 0' }}>
              <SyntaxHighlighter
                language={codeLanguage}
                style={vscDarkPlus}
                customStyle={{
                  borderRadius: '0.5rem',
                  fontSize: '0.9rem',
                  padding: '1rem'
                }}
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
          )
          codeLines = []
        }
        continue
      }

      if (inCodeBlock) {
        codeLines.push(line)
        continue
      }

      // Regular text formatting
      const boldMatch = line.match(/^\*\*(.+?):\*\*/)
      if (boldMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        result.push(
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
        continue
      }

      const numberedMatch = line.match(/^\*\*(\d+\.\s+.+?):\*\*/)
      if (numberedMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        result.push(
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
        continue
      }

      result.push(<div key={lineIndex}>{line}</div>)
    }

    return result
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
    },
    {
      id: 11,
      category: 'Latency Measurement',
      question: 'How do you measure and track latency in production trading systems?',
      answer: `**Latency Measurement Fundamentals:**

**1. Key Timestamp Points:**
- T1: NIC Arrival (hardware timestamp)
- T2: Application Receive (System.nanoTime)
- T3: Processing Start
- T4: Processing Complete
- T5: NIC Transmit (hardware timestamp)

**2. Hardware Timestamping:**
- Uses NIC to record precise packet times
- Eliminates kernel jitter (50-200μs)
- Requires PTP-capable NIC (Intel X710, Mellanox)
- Sub-microsecond accuracy
- Linux SO_TIMESTAMPING socket option

**Measurement Tools:**

**System.nanoTime():**
\`\`\`java
long start = System.nanoTime();
processOrder(order);
long latencyNs = System.nanoTime() - start;

// Track in histogram
latencyHistogram.recordValue(latencyNs);
\`\`\`

**JMH Microbenchmarking:**
\`\`\`java
@Benchmark
@BenchmarkMode(Mode.SampleTime)
@OutputTimeUnit(TimeUnit.MICROSECONDS)
public void parseOrder() {
    parser.parse(fixMessage);
}
\`\`\`

**HdrHistogram for Percentiles:**
\`\`\`java
Histogram histogram = new Histogram(3600000000000L, 3);
histogram.recordValue(latencyNs);

System.out.printf("p50:  %d μs%n", histogram.getValueAtPercentile(50.0));
System.out.printf("p99:  %d μs%n", histogram.getValueAtPercentile(99.0));
System.out.printf("p99.9: %d μs%n", histogram.getValueAtPercentile(99.9));
\`\`\`

**3. Production Monitoring:**
- Chronicle Queue with timestamps
- JFR (Java Flight Recorder) - <1% overhead
- Custom latency events
- Percentile dashboards (p50, p95, p99, p99.9)

**4. Network Analysis:**
- tcpdump with --time-stamp-precision=nano
- Wireshark for request-response correlation
- TAP/SPAN for passive monitoring

**Key Metrics:**
- Median (p50) - typical case
- p99 - worst 1% of trades
- p99.9 - tail latency
- Maximum - worst case
- Standard deviation - consistency

**Common Pitfalls:**
- Coordinated omission - missing latencies during pauses
- Measurement overhead - nanoTime() costs ~20-50ns
- Clock drift across servers
- GC pauses skewing results`
    },
    {
      id: 12,
      category: 'Smart Order Routing',
      question: 'Explain Smart Order Routing (SOR) and its implementation',
      answer: `**What is Smart Order Routing?**
- Automatically route orders to best execution venue
- Considers price, liquidity, fees, latency
- Dynamically adapts to market conditions
- Required by best execution regulations

**Routing Factors:**

**1. Price:**
- Best bid/offer across venues
- Effective price after fees
- Hidden liquidity detection
- Mid-point matching

**2. Liquidity:**
- Displayed depth at each venue
- Historical fill rates
- Market share by venue
- Time of day patterns

**3. Venue Characteristics:**
- Maker/taker fee structure
- Fill probability
- Latency to venue
- Dark pool vs lit market

**4. Order Type:**
- Aggressive (marketable) vs passive
- Size relative to displayed liquidity
- Urgency/time sensitivity

**SOR Algorithm:**

\`\`\`java
public class SmartOrderRouter {
    public List<ChildOrder> route(Order parent) {
        // Get market data from all venues
        List<VenueQuote> quotes = marketData.getAllQuotes(parent.getSymbol());

        // Score each venue
        List<VenueScore> scores = new ArrayList<>();
        for (VenueQuote quote : quotes) {
            double score = calculateVenueScore(quote, parent);
            scores.add(new VenueScore(quote.getVenue(), score));
        }

        // Sort by score (best first)
        scores.sort(Comparator.comparingDouble(VenueScore::getScore).reversed());

        // Split order across top venues
        return splitOrder(parent, scores);
    }

    private double calculateVenueScore(VenueQuote quote, Order order) {
        double priceScore = calculatePriceScore(quote, order);
        double liquidityScore = calculateLiquidityScore(quote, order);
        double feeScore = calculateFeeScore(quote, order);
        double latencyScore = calculateLatencyScore(quote);
        double fillProbability = getHistoricalFillRate(quote.getVenue());

        return (priceScore * 0.4) +
               (liquidityScore * 0.25) +
               (feeScore * 0.15) +
               (latencyScore * 0.1) +
               (fillProbability * 0.1);
    }
}
\`\`\`

**Venue Types:**

**Lit Markets:**
- Displayed orders, transparent pricing
- NYSE, NASDAQ, BATS
- Public price discovery
- May reveal trading intent

**Dark Pools:**
- Hidden orders, no pre-trade transparency
- Reduce market impact for large orders
- Midpoint execution common
- Examples: Sigma X, Liquidnet, IEX

**Routing Strategies:**

**1. Price-Time Priority:**
- Route to best price first
- Then to venue with earliest timestamp
- Simple, predictable

**2. Liquidity Seeking:**
- Route to venues with highest fill probability
- Consider hidden liquidity indicators
- Adaptive based on historical data

**3. Cost Optimization:**
- Minimize total costs (fees + spread + impact)
- Balance maker rebates vs taker fees
- Consider payment for order flow

**4. Latency Arbitrage Protection:**
- Avoid stale quotes
- Use sub-millisecond quote timestamps
- Cancel-replace on quote updates

**Monitoring SOR Performance:**
- Fill rate by venue
- Effective spread captured
- Price improvement vs NBBO
- Routing decision time
- Venue response latency`
    },
    {
      id: 13,
      category: 'Dark Pools',
      question: 'What are dark pools and how do they work?',
      answer: `**What are Dark Pools?**
- Private trading venues
- Orders not displayed publicly
- No pre-trade transparency
- Reduce market impact for large orders
- Also called Alternative Trading Systems (ATS)

**Types of Dark Pools:**

**1. Broker-Dealer Owned:**
- Internal crossing of client orders
- Examples: Goldman Sachs Sigma X, Morgan Stanley MS Pool
- Inventory internalization
- May trade against proprietary positions

**2. Exchange-Owned:**
- Run by public exchanges
- Examples: NYSE American Equities, NASDAQ Private Market
- Regulatory oversight similar to lit markets

**3. Independent/Consortium:**
- Operated by independent firms
- Examples: Liquidnet, IEX, BIDS
- Focus on institutional investors
- Often have minimum order sizes

**4. Electronic Market Makers:**
- Citadel Connect, Virtu MatchIt
- High-frequency trading firms
- Provide liquidity to dark pool

**Matching Logic:**

**Midpoint Matching:**
\`\`\`java
public class DarkPoolMatcher {
    public Match attemptMatch(Order buy, Order sell) {
        // Get NBBO (National Best Bid Offer)
        Quote nbbo = marketData.getNBBO(buy.getSymbol());

        // Calculate midpoint
        double midpoint = (nbbo.getBid() + nbbo.getAsk()) / 2.0;

        // Both orders must cross at midpoint
        if (buy.getPrice() >= midpoint && sell.getPrice() <= midpoint) {
            int fillQty = Math.min(buy.getQuantity(), sell.getQuantity());

            return new Match(
                buy,
                sell,
                fillQty,
                midpoint,  // execution price
                Instant.now()
            );
        }

        return null;
    }
}
\`\`\`

**Reference Price Models:**
- NBBO midpoint (most common)
- VWAP over last N seconds
- Last sale price
- Arrival price (price when order entered)

**Advantages:**

**For Buy-Side:**
- Reduced market impact
- Price improvement (midpoint vs spread)
- Hide trading intentions
- Better for large orders

**For Sell-Side:**
- Client order flow
- Potential profit from spread capture
- Rebates/internalization revenue

**Disadvantages:**

**Information Leakage:**
- Order info may leak to predatory traders
- Front-running risk
- "Pinging" to detect large orders

**Adverse Selection:**
- May trade against better-informed counterparty
- Toxic flow from HFT
- Stale price risk

**Liquidity Risk:**
- No guarantee of execution
- May need to route to lit markets eventually
- Limited transparency

**Regulatory Requirements:**

**Form ATS (US):**
- Register with SEC
- Fair access rules
- Transparency in operations
- Order handling disclosures

**Trade Reporting:**
- Must report trades within 10 seconds
- FINRA TRACE for fixed income
- Consolidated tape for equities

**IEX Speed Bump:**
- 350 microsecond delay
- Prevents latency arbitrage
- All participants see prices at same time
- Protects against stale quote arbitrage

**Dark Pool Indicators:**
\`\`\`java
public class DarkPoolIndicator {
    // Some dark pools provide "hints" about hidden liquidity

    public enum IndicatorType {
        SMALL,      // < 5000 shares
        MEDIUM,     // 5000-50000 shares
        LARGE,      // > 50000 shares
        NONE
    }

    public IndicatorType getLiquidityIndicator(String symbol) {
        int hiddenSize = getHiddenOrderSize(symbol);

        if (hiddenSize > 50000) return IndicatorType.LARGE;
        if (hiddenSize > 5000) return IndicatorType.MEDIUM;
        if (hiddenSize > 0) return IndicatorType.SMALL;
        return IndicatorType.NONE;
    }
}
\`\`\``
    },
    {
      id: 14,
      category: 'Co-location',
      question: 'What is co-location and why is it important in trading?',
      answer: `**What is Co-location?**
- Placing trading servers in exchange data centers
- Minimizes network latency to exchange
- Physical proximity to matching engine
- Typically same building or adjacent facility

**Latency Advantage:**

**Without Co-location:**
\`\`\`
Trading Firm Office → Internet → Exchange
~5-50 milliseconds round-trip
\`\`\`

**With Co-location:**
\`\`\`
Co-lo Server → Exchange Switch → Matching Engine
~50-200 microseconds round-trip
\`\`\`

**Speed Improvement: 100-1000x faster**

**Co-location Benefits:**

**1. Market Data:**
- Receive price updates faster
- First to see order book changes
- Critical for market making
- Arbitrage opportunities

**2. Order Routing:**
- Submit orders faster
- Better queue position
- Higher fill rates
- First in line for liquidity

**3. Latency Arbitrage:**
- Exploit price differences across venues
- Cancel stale quotes before being hit
- Race to execution

**Cost Structure:**

**Exchange Fees:**
- Rack space rental: $2,000-15,000/month
- Power and cooling: $500-2,000/month
- Cross-connects: $500-1,000/month per connection
- Market data feeds: $5,000-50,000/month

**Hardware:**
- Servers: $10,000-50,000 each
- Low-latency NICs: $2,000-5,000
- Switches: $50,000-200,000
- Total setup: $100,000-1,000,000+

**Network Topology:**

\`\`\`
Co-location Data Center:

┌─────────────────────────────────────┐
│  Exchange Matching Engine           │
└───────────┬─────────────────────────┘
            │ Direct Fiber
┌───────────┴─────────────────────────┐
│  Core Switch (1-10 microseconds)    │
└───┬───────┬───────┬─────────────────┘
    │       │       │
┌───┴───┐ ┌─┴────┐ ┌┴──────────┐
│ Firm A│ │ Firm B│ │ Firm C    │
│ Rack  │ │ Rack  │ │ Rack      │
└───────┘ └───────┘ └───────────┘
\`\`\`

**Proximity Hosting Tiers:**

**Premium Cabinets:**
- Closest to matching engine
- Shortest fiber runs (~5 meters)
- Highest cost
- Reserved for HFT firms

**Standard Cabinets:**
- Within same data center
- Longer fiber runs (~50-200 meters)
- Moderate cost
- Most institutional traders

**Near Proximity:**
- Adjacent building
- Dedicated fiber connection
- Lower cost
- Still sub-millisecond latency

**Technical Considerations:**

**1. Cable Length Equalization:**
- All participants get equal cable length
- Fairness requirement by exchanges
- Prevents advantage from physical location

**2. Atomic Clock Synchronization:**
- PTP (Precision Time Protocol)
- GPS/GNSS reference
- Sub-microsecond accuracy
- Critical for trade timestamps

**3. Power and Cooling:**
- Redundant power supplies
- Uninterruptible power (UPS)
- Advanced cooling for high-density racks
- Environmental monitoring

**4. Network Redundancy:**
- Multiple cross-connects
- Diverse fiber paths
- Failover mechanisms
- Backup connectivity

**Major Co-location Centers:**

**Equities:**
- NYSE Mahwah, NJ (NY4)
- NASDAQ Carteret, NJ (NY5)
- CME Aurora, IL (CH1)
- Bats Weehawken, NJ

**Futures:**
- CME Group data centers
- ICE Basildon, UK
- Eurex Frankfurt

**FX:**
- EBS/CME
- Thomson Reuters Matching
- Distributed globally

**Regulatory Aspects:**

**Fair Access:**
- Exchanges must offer co-location to all members
- Equal treatment requirements
- Cannot discriminate on price
- Published pricing schedules

**MiFID II (Europe):**
- Transparency requirements
- Fee schedules must be public
- Non-discriminatory access
- Regular audits

**Performance Monitoring:**

\`\`\`java
public class CoLocationMetrics {
    public void measureLatency() {
        // One-way network latency
        long t1_send = getHardwareTimestamp();
        sendOrder(order);
        long t2_ack = getHardwareTimestamp();

        long oneWayLatency = (t2_ack - t1_send) / 2;

        System.out.printf("Network latency: %d μs%n",
            oneWayLatency / 1000);

        // Should be < 100 microseconds for good co-lo
        if (oneWayLatency > 100_000) {
            alert("High co-location latency detected!");
        }
    }
}
\`\`\``
    },
    {
      id: 15,
      category: 'FIX Protocol',
      question: 'How do you handle FIX session recovery and message gap fills?',
      answer: `**FIX Session Recovery:**

**Session States:**
\`\`\`
DISCONNECTED → LOGON → ACTIVE → LOGOUT → DISCONNECTED
                  ↑                ↓
                  └─ RESEND_REQUEST ─┘
\`\`\`

**Sequence Number Management:**

**Normal Flow:**
\`\`\`
Client                     Server
  │                          │
  │  Logon (MsgSeqNum=1)    │
  │─────────────────────────→│
  │                          │
  │  Logon (MsgSeqNum=1)    │
  │←─────────────────────────│
  │                          │
  │  NewOrder (MsgSeqNum=2) │
  │─────────────────────────→│
  │                          │
  │  ExecReport (MsgSeqNum=2)│
  │←─────────────────────────│
\`\`\`

**Gap Detection:**

\`\`\`java
public class FIXSessionManager {
    private int expectedSeqNum = 1;

    public void onMessage(FIXMessage msg) {
        int receivedSeqNum = msg.getSeqNum();

        if (receivedSeqNum == expectedSeqNum) {
            // Normal case - in sequence
            processMessage(msg);
            expectedSeqNum++;
        }
        else if (receivedSeqNum < expectedSeqNum) {
            // Duplicate - already processed
            handleDuplicate(msg);
        }
        else {
            // Gap detected - missing messages
            int gapStart = expectedSeqNum;
            int gapEnd = receivedSeqNum - 1;

            // Queue this message for later
            queueMessage(msg);

            // Request missing messages
            sendResendRequest(gapStart, gapEnd);
        }
    }
}
\`\`\`

**Resend Request (MsgType=2):**

\`\`\`
Tag 7 (BeginSeqNo) = 10
Tag 16 (EndSeqNo) = 15

Requests messages 10-15 to be resent
EndSeqNo = 0 means "send all messages from BeginSeqNo onwards"
\`\`\`

**Gap Fill Message (MsgType=4):**

\`\`\`java
public class GapFillHandler {
    public void handleGapFill(int beginSeq, int endSeq) {
        // Gap fill for admin messages that don't need replay
        // (heartbeats, test requests, sequence resets)

        FIXMessage gapFill = new FIXMessage();
        gapFill.setMsgType("4");  // SequenceReset
        gapFill.setSeqNum(beginSeq);
        gapFill.setField(36, endSeq + 1);  // NewSeqNo
        gapFill.setField(123, "Y");  // GapFillFlag

        send(gapFill);

        // Update expected sequence to EndSeqNo + 1
        expectedSeqNum = endSeq + 1;
    }
}
\`\`\`

**Message Persistence:**

\`\`\`java
public class FIXMessageStore {
    private final Map<Integer, FIXMessage> outgoingMessages =
        new ConcurrentHashMap<>();

    public void storeOutgoingMessage(FIXMessage msg) {
        int seqNum = msg.getSeqNum();
        outgoingMessages.put(seqNum, msg);

        // Also persist to disk/database
        database.save(msg);
    }

    public List<FIXMessage> getMessagesForResend(int begin, int end) {
        List<FIXMessage> messages = new ArrayList<>();

        for (int i = begin; i <= end; i++) {
            FIXMessage msg = outgoingMessages.get(i);

            if (msg == null) {
                // Try loading from database
                msg = database.load(i);
            }

            if (msg != null) {
                if (isAdminMessage(msg)) {
                    // Skip admin messages in resend
                    continue;
                }

                // Set PossDupFlag for resent messages
                msg.setField(43, "Y");
                messages.add(msg);
            }
        }

        return messages;
    }
}
\`\`\`

**Sequence Reset (MsgType=4):**

**Two modes:**

**1. Gap Fill (GapFillFlag=Y):**
- Skip over admin messages
- Don't replay heartbeats, test requests
- Update sequence number without sending messages

**2. Reset (GapFillFlag=N):**
- Start fresh with new sequence numbers
- Used after maintenance or disaster recovery
- Requires agreement from both sides

**Disaster Recovery:**

\`\`\`java
public void recoverFromDisaster() {
    // Lost all in-memory state, need to rebuild

    // 1. Load last sequence numbers from database
    int lastSentSeq = database.getLastSentSeqNum();
    int lastReceivedSeq = database.getLastReceivedSeqNum();

    // 2. Reconnect with sequence reset
    FIXMessage logon = new FIXMessage();
    logon.setMsgType("A");  // Logon
    logon.setSeqNum(1);
    logon.setField(141, "Y");  // ResetSeqNumFlag

    // 3. Counterparty agrees to reset
    // Both sides start from sequence 1

    send(logon);
}
\`\`\`

**Best Practices:**

**1. Heartbeat Management:**
- Send heartbeat if no message in HeartBtInt seconds
- Expect heartbeat from counterparty
- Disconnect if 2-3 heartbeats missed

**2. Test Requests:**
- Send if heartbeat overdue
- Expect response (Heartbeat) within timeout
- Initiate disconnect/reconnect if no response

**3. Message Validation:**
- Check required fields present
- Validate field types and ranges
- Checksum validation (tag 10)
- BodyLength validation (tag 9)

**4. PossDupFlag Handling:**
- Set on all resent messages
- Recipient checks for duplicates
- May need idempotency checks

**Recovery Scenarios:**

**Scenario 1: Missed Message**
\`\`\`
Client expects: 10
Receives: 12
Action: Send ResendRequest(10,11)
\`\`\`

**Scenario 2: Many Missed Messages**
\`\`\`
Client expects: 10
Receives: 100
Action: Send ResendRequest(10,0)  // 0 = all
\`\`\`

**Scenario 3: Reconnection**
\`\`\`
Client reconnects after crash
Client sequence: 50 (from database)
Send: Logon with MsgSeqNum=50
Server will compare to expected sequence
If mismatch: ResendRequest or SequenceReset
\`\`\``
    },
    {
      id: 16,
      category: 'Disruptor Pattern',
      question: 'Explain the LMAX Disruptor pattern and its advantages',
      answer: `**What is the Disruptor?**
- Lock-free ring buffer for inter-thread messaging
- Developed by LMAX Exchange for trading system
- Achieves 25M+ messages/second
- Consistent sub-microsecond latency
- Avoids locks, CAS operations minimal

**Core Concepts:**

**1. Ring Buffer:**
- Pre-allocated array of events
- Fixed size (power of 2 for fast modulo)
- Events recycled (object pooling)
- No GC during operation

\`\`\`java
// Ring buffer with 1024 slots (must be power of 2)
RingBuffer<OrderEvent> ringBuffer = RingBuffer.createSingleProducer(
    OrderEvent::new,      // Event factory
    1024,                 // Buffer size
    new BusySpinWaitStrategy()
);
\`\`\`

**2. Sequences:**
- Long counters tracking positions
- Producer sequence: next write position
- Consumer sequence: last processed position
- Cache line padded to prevent false sharing

**3. Wait Strategies:**

**BusySpinWaitStrategy:**
- Lowest latency (~50ns)
- Spins in tight loop
- Wastes CPU cycles
- Best for ultra-low latency

**YieldingWaitStrategy:**
- Thread.yield() when waiting
- Better CPU utilization than busy spin
- Still low latency

**SleepingWaitStrategy:**
- Progressive backoff with sleep
- Best for throughput over latency
- Saves CPU

**BlockingWaitStrategy:**
- Uses locks and conditions
- Lowest CPU usage
- Higher latency

**Basic Usage:**

\`\`\`java
// 1. Define Event
public class OrderEvent {
    private long orderId;
    private String symbol;
    private int quantity;
    private double price;

    // Getters, setters
}

// 2. Create Ring Buffer
EventFactory<OrderEvent> factory = OrderEvent::new;
int bufferSize = 1024;

Disruptor<OrderEvent> disruptor = new Disruptor<>(
    factory,
    bufferSize,
    Executors.defaultThreadFactory()
);

// 3. Define Event Handler
public class OrderHandler implements EventHandler<OrderEvent> {
    @Override
    public void onEvent(OrderEvent event, long sequence, boolean endOfBatch) {
        // Process order
        processOrder(event.getOrderId(), event.getSymbol());

        // endOfBatch = true for last event in current batch
        if (endOfBatch) {
            flushBatch();
        }
    }
}

// 4. Connect Handler and Start
disruptor.handleEventsWith(new OrderHandler());
disruptor.start();

// 5. Publish Events
RingBuffer<OrderEvent> ringBuffer = disruptor.getRingBuffer();

long sequence = ringBuffer.next();  // Claim next slot
try {
    OrderEvent event = ringBuffer.get(sequence);
    event.setOrderId(12345);
    event.setSymbol("AAPL");
    event.setQuantity(100);
    event.setPrice(150.00);
} finally {
    ringBuffer.publish(sequence);  // Make available to consumers
}
\`\`\`

**Dependency Graph:**

**Sequential:**
\`\`\`java
// Handler3 runs after Handler1 and Handler2 complete
disruptor.handleEventsWith(handler1, handler2)
         .then(handler3);
\`\`\`

**Parallel:**
\`\`\`java
// Handler1 and Handler2 run in parallel
disruptor.handleEventsWith(handler1, handler2);
\`\`\`

**Diamond:**
\`\`\`java
// Validation and Enrichment run parallel,
// then Matching runs after both
disruptor.handleEventsWith(validationHandler, enrichmentHandler)
         .then(matchingHandler);
\`\`\`

**Why It's Fast:**

**1. No Locks:**
- Single writer eliminates contention
- CAS only for multi-producer
- Consumers track own sequence

**2. Cache-Line Padding:**
\`\`\`java
class Sequence {
    // Padded to 64 bytes (cache line size)
    protected long p1, p2, p3, p4, p5, p6, p7;
    protected volatile long value;
    protected long p8, p9, p10, p11, p12, p13, p14;
}
\`\`\`
- Prevents false sharing
- Each sequence in own cache line
- No cache line bouncing

**3. Memory Barriers:**
- Volatile for visibility
- Ordered writes
- No need for full memory fence

**4. Object Pooling:**
- Events pre-allocated
- No allocation in hot path
- Zero GC during operation

**5. Batching:**
- Process multiple events per wakeup
- Amortize context switch cost
- Higher throughput

**Multi-Producer Pattern:**

\`\`\`java
// Multiple producers need CAS
RingBuffer<OrderEvent> ringBuffer = RingBuffer.createMultiProducer(
    OrderEvent::new,
    1024,
    new YieldingWaitStrategy()
);

// Publishing is same, but uses CAS internally
long sequence = ringBuffer.next();
try {
    OrderEvent event = ringBuffer.get(sequence);
    // Set event fields
} finally {
    ringBuffer.publish(sequence);
}
\`\`\`

**Production Monitoring:**

\`\`\`java
public class DisruptorMetrics {
    private final RingBuffer<?> ringBuffer;

    public long getBufferUtilization() {
        long cursor = ringBuffer.getCursor();
        long minSequence = ringBuffer.getMinimumGatingSequence();

        long bufferSize = ringBuffer.getBufferSize();
        long used = cursor - minSequence;

        return (used * 100) / bufferSize;  // Percentage
    }

    public boolean isBacklogged() {
        return getBufferUtilization() > 80;
    }
}
\`\`\`

**Common Use Cases:**
- Order routing pipeline
- Market data distribution
- Event sourcing
- Inter-thread communication
- Matching engine
- Complex event processing`
    },
    {
      id: 17,
      category: 'Market Data',
      question: 'How do you normalize and handle market data from multiple sources?',
      answer: `**Market Data Challenges:**

**1. Multiple Protocols:**
- Reuters RMDS (Reuters Market Data System)
- Bloomberg B-PIPE
- ICE/NYSE proprietary feeds
- NASDAQ TotalView-ITCH
- CME MDP 3.0 (Market Data Protocol)

**2. Different Schemas:**
- Field names vary by provider
- Units differ (cents vs dollars)
- Timestamp formats vary
- Symbol naming conventions

**3. Latency Requirements:**
- Market data must be nanosecond-accurate
- Order of updates matters
- Conflation for slow consumers

**Normalization Architecture:**

\`\`\`
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Reuters  │ │Bloomberg │ │  NASDAQ  │
│   Feed   │ │   Feed   │ │   Feed   │
└────┬─────┘ └────┬─────┘ └────┬─────┘
     │            │            │
     ▼            ▼            ▼
┌────────────────────────────────────┐
│      Protocol Adapters             │
│  (Parse native format)             │
└────────────┬───────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│   Normalization Layer              │
│   (Convert to common model)        │
└────────────┬───────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│   Distribution Layer               │
│   (Aeron, Multicast, IPC)          │
└────────────┬───────────────────────┘
             │
             ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Pricing  │ │  Risk    │ │  UI      │
│ Engine   │ │ Engine   │ │          │
└──────────┘ └──────────┘ └──────────┘
\`\`\`

**Normalized Market Data Model:**

\`\`\`java
public class Quote {
    private final String symbol;          // Normalized symbol
    private final long timestamp;         // Nanos since epoch
    private final double bidPrice;        // Always in dollars
    private final double askPrice;
    private final long bidSize;
    private final long askSize;
    private final String source;          // "REUTERS", "BLOOMBERG"
    private final int feedId;             // Internal feed identifier

    // Derived fields
    public double getMidPrice() {
        return (bidPrice + askPrice) / 2.0;
    }

    public double getSpread() {
        return askPrice - bidPrice;
    }
}
\`\`\`

**Feed Handler Pattern:**

\`\`\`java
public class ReutersFeedHandler implements FeedHandler {
    private final MarketDataNormalizer normalizer;

    @Override
    public void onMessage(byte[] message) {
        // Parse Reuters-specific format
        ReutersUpdate update = parseReuters(message);

        // Normalize to common model
        Quote quote = normalizer.normalize(
            update.getRic(),              // Reuters symbol
            update.getBid() / 100.0,      // Reuters uses cents
            update.getAsk() / 100.0,
            update.getBidSize(),
            update.getAskSize(),
            "REUTERS"
        );

        // Publish normalized quote
        publishQuote(quote);
    }
}
\`\`\`

**Symbol Mapping:**

\`\`\`java
public class SymbolMapper {
    // Maps vendor symbols to normalized symbols
    private final Map<String, String> symbolMap = new ConcurrentHashMap<>();

    public SymbolMapper() {
        // Reuters RIC to normalized
        symbolMap.put("AAPL.O", "AAPL");
        symbolMap.put("AAPL.OQ", "AAPL");

        // Bloomberg to normalized
        symbolMap.put("AAPL US Equity", "AAPL");

        // NASDAQ to normalized
        symbolMap.put("AAPL", "AAPL");
    }

    public String normalize(String vendorSymbol, String source) {
        String key = source + ":" + vendorSymbol;
        return symbolMap.getOrDefault(key, vendorSymbol);
    }
}
\`\`\`

**Conflation:**

\`\`\`java
public class Conflator {
    private final Map<String, Quote> latestQuotes =
        new ConcurrentHashMap<>();
    private final ScheduledExecutorService scheduler;

    public Conflator(int publishIntervalMs) {
        // Publish conflated updates every N milliseconds
        scheduler = Executors.newScheduledThreadPool(1);
        scheduler.scheduleAtFixedRate(
            this::publishConflated,
            publishIntervalMs,
            publishIntervalMs,
            TimeUnit.MILLISECONDS
        );
    }

    public void onQuote(Quote quote) {
        // Always keep latest quote
        latestQuotes.put(quote.getSymbol(), quote);
    }

    private void publishConflated() {
        // Send batch of latest quotes
        List<Quote> toPublish = new ArrayList<>(latestQuotes.values());
        latestQuotes.clear();

        for (Quote quote : toPublish) {
            publish(quote);
        }
    }
}
\`\`\`

**Arbitrage Detection:**

\`\`\`java
public class CrossFeedArbitrage {
    public void onQuote(Quote quote) {
        String symbol = quote.getSymbol();

        // Get quotes from all sources
        Quote reuters = getLatestQuote(symbol, "REUTERS");
        Quote bloomberg = getLatestQuote(symbol, "BLOOMBERG");

        if (reuters != null && bloomberg != null) {
            // Check for arbitrage opportunity
            if (reuters.getBidPrice() > bloomberg.getAskPrice()) {
                double profit = reuters.getBidPrice() - bloomberg.getAskPrice();

                if (profit > ARBITRAGE_THRESHOLD) {
                    alertArbitrage(symbol, profit);
                }
            }
        }
    }
}
\`\`\`

**Sequence Number Tracking:**

\`\`\`java
public class SequenceValidator {
    private final Map<String, Long> lastSequence =
        new ConcurrentHashMap<>();

    public boolean validateSequence(String feedId, long sequence) {
        Long expected = lastSequence.get(feedId);

        if (expected == null) {
            // First message from this feed
            lastSequence.put(feedId, sequence);
            return true;
        }

        if (sequence == expected + 1) {
            // In sequence
            lastSequence.put(feedId, sequence);
            return true;
        } else if (sequence <= expected) {
            // Duplicate or out of order
            log.warn("Duplicate sequence: {} expected {}",
                sequence, expected + 1);
            return false;
        } else {
            // Gap detected
            long gap = sequence - expected - 1;
            log.error("Sequence gap: {} messages missing", gap);
            requestRetransmit(feedId, expected + 1, sequence - 1);
            return false;
        }
    }
}
\`\`\`

**Latency Tracking:**

\`\`\`java
public void trackMarketDataLatency(Quote quote) {
    long now = System.nanoTime();
    long feedLatency = now - quote.getTimestamp();

    // Record latency
    latencyHistogram.recordValue(feedLatency);

    // Alert if slow
    if (feedLatency > 10_000_000) {  // > 10ms
        alert("Slow market data from " + quote.getSource() +
              ": " + (feedLatency / 1_000_000) + "ms");
    }
}
\`\`\``
    },
    {
      id: 18,
      category: 'Position Management',
      question: 'How do you implement real-time position keeping in trading systems?',
      answer: `**Position Keeping Fundamentals:**

**Position Components:**
\`\`\`java
public class Position {
    private final String symbol;
    private long quantity;           // Net position (+ long, - short)
    private double averagePrice;     // Volume-weighted average
    private double realizedPnL;      // From closed trades
    private double unrealizedPnL;    // Mark-to-market on open position

    // Intraday tracking
    private long buyQuantity;        // Total bought today
    private long sellQuantity;       // Total sold today
    private double buyNotional;      // Total buy value
    private double sellNotional;     // Total sell value

    // Risk metrics
    private double deltaEquivalent;  // For derivatives
    private double notionalExposure;
}
\`\`\`

**Position Updates:**

\`\`\`java
public class PositionManager {
    private final Map<String, Position> positions =
        new ConcurrentHashMap<>();

    public void onFill(Fill fill) {
        String symbol = fill.getSymbol();
        Position position = positions.computeIfAbsent(
            symbol,
            k -> new Position(symbol)
        );

        synchronized (position) {
            // Update quantity
            long signedQty = fill.getSide() == Side.BUY ?
                fill.getQuantity() : -fill.getQuantity();

            long oldQty = position.getQuantity();
            long newQty = oldQty + signedQty;

            // Calculate realized P&L if reducing position
            if (Math.abs(newQty) < Math.abs(oldQty)) {
                double realizedPnL = calculateRealizedPnL(
                    position,
                    fill
                );
                position.addRealizedPnL(realizedPnL);
            }

            // Update average price
            if (isIncreasingPosition(oldQty, newQty)) {
                double newAvgPrice = calculateNewAveragePrice(
                    position.getQuantity(),
                    position.getAveragePrice(),
                    fill.getQuantity(),
                    fill.getPrice()
                );
                position.setAveragePrice(newAvgPrice);
            }

            position.setQuantity(newQty);

            // Update intraday stats
            if (fill.getSide() == Side.BUY) {
                position.addBuyQuantity(fill.getQuantity());
                position.addBuyNotional(
                    fill.getQuantity() * fill.getPrice()
                );
            } else {
                position.addSellQuantity(fill.getQuantity());
                position.addSellNotional(
                    fill.getQuantity() * fill.getPrice()
                );
            }

            // Publish position update
            publishPositionUpdate(position);
        }
    }

    private double calculateNewAveragePrice(
            long oldQty, double oldAvg,
            long newQty, double newPrice) {

        double oldNotional = Math.abs(oldQty) * oldAvg;
        double newNotional = newQty * newPrice;
        long totalQty = Math.abs(oldQty) + newQty;

        return (oldNotional + newNotional) / totalQty;
    }

    private double calculateRealizedPnL(Position position, Fill fill) {
        // P&L = (Exit Price - Entry Price) * Quantity
        double entryPrice = position.getAveragePrice();
        double exitPrice = fill.getPrice();
        long closedQty = Math.min(
            Math.abs(position.getQuantity()),
            fill.getQuantity()
        );

        double pnl = (exitPrice - entryPrice) * closedQty;

        // If short position, invert P&L
        if (position.getQuantity() < 0) {
            pnl = -pnl;
        }

        return pnl;
    }
}
\`\`\`

**Mark-to-Market:**

\`\`\`java
public class PnLCalculator {
    private final MarketData marketData;

    public void updateUnrealizedPnL(Position position) {
        Quote quote = marketData.getQuote(position.getSymbol());

        if (quote == null) return;

        // Use mid-price for mark-to-market
        double markPrice = quote.getMidPrice();
        long quantity = position.getQuantity();

        double unrealizedPnL =
            (markPrice - position.getAveragePrice()) * quantity;

        position.setUnrealizedPnL(unrealizedPnL);

        // Total P&L
        double totalPnL = position.getRealizedPnL() + unrealizedPnL;
        position.setTotalPnL(totalPnL);
    }

    public double getPortfolioPnL() {
        return positions.values().stream()
            .mapToDouble(Position::getTotalPnL)
            .sum();
    }
}
\`\`\`

**Position Limits:**

\`\`\`java
public class PositionLimitChecker {
    private final Map<String, Long> symbolLimits = new HashMap<>();
    private long portfolioLimitNotional = 10_000_000; // $10M

    public CheckResult checkLimits(String symbol, long proposedQty) {
        Position current = getPosition(symbol);
        long newQty = current.getQuantity() + proposedQty;

        // Symbol-level limit
        long limit = symbolLimits.getOrDefault(symbol, 10000L);
        if (Math.abs(newQty) > limit) {
            return CheckResult.reject(
                "Exceeds symbol limit: " + limit
            );
        }

        // Portfolio-level limit
        double portfolioNotional = calculatePortfolioNotional();
        if (portfolioNotional > portfolioLimitNotional) {
            return CheckResult.reject(
                "Exceeds portfolio notional limit"
            );
        }

        return CheckResult.approve();
    }
}
\`\`\`

**SOD/EOD Processing:**

\`\`\`java
public void endOfDay() {
    for (Position position : positions.values()) {
        // Save positions to database
        database.savePosition(position);

        // Generate EOD reports
        EODReport report = new EODReport();
        report.setSymbol(position.getSymbol());
        report.setQuantity(position.getQuantity());
        report.setRealizedPnL(position.getRealizedPnL());
        report.setUnrealizedPnL(position.getUnrealizedPnL());
        report.setBuyQuantity(position.getBuyQuantity());
        report.setSellQuantity(position.getSellQuantity());

        // Reset intraday counters
        position.resetIntradayStats();

        // Realized P&L stays (accumulates)
        // Unrealized P&L recalculated at SOD with new prices
    }
}

public void startOfDay() {
    // Load overnight positions from clearing
    List<Position> overnightPositions = database.loadPositions();

    for (Position position : overnightPositions) {
        positions.put(position.getSymbol(), position);

        // Recalculate unrealized P&L with opening prices
        updateUnrealizedPnL(position);
    }
}
\`\`\``
    },
    {
      id: 19,
      category: 'Drop Copy',
      question: 'What is a drop copy connection and how is it implemented?',
      answer: `**What is Drop Copy?**
- Duplicate stream of execution reports
- Sent to third party (clearing firm, regulator, client)
- Regulatory requirement in many jurisdictions
- Real-time trade reporting
- Audit trail and compliance

**Drop Copy Use Cases:**

**1. Clearing Firms:**
- Receive all trades in real-time
- Calculate margin requirements
- Manage credit exposure
- Settlement processing

**2. Regulatory Reporting:**
- CAT (Consolidated Audit Trail) in US
- MiFID II transaction reporting in EU
- Real-time surveillance

**3. Client Notification:**
- Institutional clients monitor their trades
- Independent of executing broker UI
- Reconciliation

**FIX Drop Copy Architecture:**

\`\`\`
┌──────────────┐
│   Trading    │
│   System     │
└───────┬──────┘
        │
        ├──────────────────────────────┐
        │                              │
        ▼                              ▼
┌──────────────┐              ┌──────────────┐
│  Primary     │              │  Drop Copy   │
│  FIX Session │              │  FIX Session │
│  (Client)    │              │  (Clearing)  │
└──────────────┘              └──────────────┘
\`\`\`

**Implementation:**

\`\`\`java
public class DropCopyManager {
    private final List<DropCopySession> dropCopySessions =
        new CopyOnWriteArrayList<>();

    public void registerDropCopy(DropCopySession session) {
        dropCopySessions.add(session);
    }

    public void onExecutionReport(ExecutionReport execReport) {
        // Send to primary client
        primarySession.send(execReport);

        // Send to all drop copy sessions
        for (DropCopySession session : dropCopySessions) {
            if (session.isActive()) {
                // Clone the execution report
                ExecutionReport dropCopy = execReport.clone();

                // Optionally filter by account
                if (session.shouldReceive(execReport)) {
                    session.send(dropCopy);
                }
            }
        }
    }
}

public class DropCopySession {
    private final String sessionId;
    private final Set<String> accountFilter;
    private final FIXSession fixSession;

    public boolean shouldReceive(ExecutionReport execReport) {
        // If no filter, send all trades
        if (accountFilter.isEmpty()) {
            return true;
        }

        // Otherwise only send trades for specified accounts
        return accountFilter.contains(execReport.getAccount());
    }

    public void send(ExecutionReport execReport) {
        // Add ExecType and OrdStatus
        FIXMessage msg = new FIXMessage();
        msg.setMsgType("8");  // Execution Report

        // Header
        msg.setField(49, senderCompID);  // SenderCompID
        msg.setField(56, targetCompID);  // TargetCompID

        // Order identifiers
        msg.setField(11, execReport.getClOrdID());
        msg.setField(37, execReport.getOrderID());
        msg.setField(17, execReport.getExecID());

        // Execution details
        msg.setField(150, execReport.getExecType());
        msg.setField(39, execReport.getOrdStatus());
        msg.setField(54, execReport.getSide());
        msg.setField(55, execReport.getSymbol());

        // Quantities
        msg.setField(38, execReport.getOrderQty());
        msg.setField(32, execReport.getLastQty());
        msg.setField(31, execReport.getLastPx());
        msg.setField(14, execReport.getCumQty());
        msg.setField(6, execReport.getAvgPx());

        // Timestamps
        msg.setField(60, execReport.getTransactTime());

        fixSession.send(msg);
    }
}
\`\`\`

**Drop Copy Filtering:**

\`\`\`java
public class DropCopyFilter {
    public enum FilterType {
        ALL,           // All trades
        ACCOUNT,       // Specific accounts only
        SYMBOL,        // Specific symbols only
        EXEC_TYPE      // Specific execution types (fill, cancel, etc.)
    }

    private final FilterType filterType;
    private final Set<String> allowedValues;

    public boolean accept(ExecutionReport execReport) {
        switch (filterType) {
            case ALL:
                return true;

            case ACCOUNT:
                return allowedValues.contains(execReport.getAccount());

            case SYMBOL:
                return allowedValues.contains(execReport.getSymbol());

            case EXEC_TYPE:
                return allowedValues.contains(execReport.getExecType());

            default:
                return false;
        }
    }
}
\`\`\`

**Performance Considerations:**

\`\`\`java
public class AsyncDropCopy {
    private final ExecutorService executor =
        Executors.newSingleThreadExecutor();

    private final BlockingQueue<ExecutionReport> queue =
        new LinkedBlockingQueue<>(10000);

    public AsyncDropCopy() {
        // Background thread processes drop copy
        executor.submit(() -> {
            while (true) {
                try {
                    ExecutionReport execReport = queue.take();
                    sendToDropCopySessions(execReport);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        });
    }

    public void onExecutionReport(ExecutionReport execReport) {
        // Non-blocking - queue for async processing
        boolean offered = queue.offer(execReport);

        if (!offered) {
            log.error("Drop copy queue full - dropping message");
            metrics.incrementDroppedMessages();
        }
    }

    private void sendToDropCopySessions(ExecutionReport execReport) {
        for (DropCopySession session : dropCopySessions) {
            try {
                session.send(execReport);
            } catch (Exception e) {
                log.error("Failed to send drop copy", e);
                // Don't let one failed session affect others
            }
        }
    }
}
\`\`\`

**Regulatory Requirements:**

**CAT (Consolidated Audit Trail):**
- Must report all orders and executions
- < 1 second reporting requirement
- Includes timestamps, account, symbol
- Lifecycle: New, Cancel, Replace, Fill

**MiFID II:**
- Transaction reporting within 1 minute
- RTS 22 format
- Trade venue, timestamp, instrument
- Counterparty information

**Drop Copy Reconciliation:**

\`\`\`java
public class DropCopyReconciliation {
    public void reconcile() {
        // Compare primary session vs drop copy
        Set<String> primaryExecIDs = getPrimaryExecutions();
        Set<String> dropCopyExecIDs = getDropCopyExecutions();

        // Check for missing executions in drop copy
        Set<String> missing = new HashSet<>(primaryExecIDs);
        missing.removeAll(dropCopyExecIDs);

        if (!missing.isEmpty()) {
            alert("Drop copy missing " + missing.size() + " executions");

            // Resend missing executions
            for (String execID : missing) {
                ExecutionReport execReport = getExecution(execID);
                resendToDropCopy(execReport);
            }
        }
    }
}
\`\`\``
    },
    {
      id: 20,
      category: 'Chronicle Queue',
      question: 'Why is Chronicle Queue used in trading systems and how does it work?',
      answer: `**What is Chronicle Queue?**
- Ultra-low latency persistent messaging
- Memory-mapped file storage
- Achieves 500ns median latency
- Used for order journals, market data recording
- Provides audit trail and replay capability

**Key Features:**

**1. Memory-Mapped Files:**
- Direct memory access via mmap()
- Zero-copy writes
- OS handles disk I/O asynchronously
- Data survives process crashes

**2. Sequential Writes:**
- Append-only structure
- No random I/O
- SSD/NVMe friendly
- Millions of messages per second

**3. Lock-Free Design:**
- CAS-based coordination
- Multiple readers supported
- Single writer (typical) or multi-writer
- No GC during operation

**Basic Usage:**

\`\`\`java
// Create queue
String queuePath = "/mnt/fast-disk/trading-orders";
try (ChronicleQueue queue = ChronicleQueue.singleBuilder(queuePath)
        .rollCycle(RollCycles.HOURLY)  // New file every hour
        .build()) {

    // Producer - write orders
    ExcerptAppender appender = queue.acquireAppender();

    appender.writeDocument(wire -> {
        wire.write("orderId").text("ORDER-12345");
        wire.write("symbol").text("AAPL");
        wire.write("side").text("BUY");
        wire.write("quantity").int32(100);
        wire.write("price").float64(150.50);
        wire.write("timestamp").int64(System.nanoTime());
    });

    // Consumer - read orders
    ExcerptTailer tailer = queue.createTailer();

    while (tailer.readDocument(wire -> {
        String orderId = wire.read("orderId").text();
        String symbol = wire.read("symbol").text();
        String side = wire.read("side").text();
        int quantity = wire.read("quantity").int32();
        double price = wire.read("price").float64();
        long timestamp = wire.read("timestamp").int64();

        processOrder(orderId, symbol, side, quantity, price);
    })) {
        // Continue reading
    }
}
\`\`\`

**Order Journal Pattern:**

\`\`\`java
public class OrderJournal {
    private final ChronicleQueue queue;
    private final ExcerptAppender appender;

    public OrderJournal(String path) {
        this.queue = ChronicleQueue.singleBuilder(path)
            .rollCycle(RollCycles.DAILY)
            .build();
        this.appender = queue.acquireAppender();
    }

    public void journalNewOrder(Order order) {
        long timestamp = System.nanoTime();

        appender.writeDocument(wire -> {
            wire.write("eventType").text("NEW_ORDER");
            wire.write("orderId").text(order.getOrderId());
            wire.write("symbol").text(order.getSymbol());
            wire.write("side").int32(order.getSide().ordinal());
            wire.write("quantity").int32(order.getQuantity());
            wire.write("price").float64(order.getPrice());
            wire.write("timestamp").int64(timestamp);
        });
    }

    public void journalFill(Fill fill) {
        appender.writeDocument(wire -> {
            wire.write("eventType").text("FILL");
            wire.write("orderId").text(fill.getOrderId());
            wire.write("fillId").text(fill.getFillId());
            wire.write("quantity").int32(fill.getQuantity());
            wire.write("price").float64(fill.getPrice());
            wire.write("timestamp").int64(System.nanoTime());
        });
    }

    public void journalCancel(String orderId) {
        appender.writeDocument(wire -> {
            wire.write("eventType").text("CANCEL");
            wire.write("orderId").text(orderId);
            wire.write("timestamp").int64(System.nanoTime());
        });
    }
}
\`\`\`

**Replay for Recovery:**

\`\`\`java
public class OrderBookRecovery {
    public OrderBook recoverFromJournal(String journalPath) {
        OrderBook orderBook = new OrderBook();

        try (ChronicleQueue queue =
                ChronicleQueue.singleBuilder(journalPath).build()) {

            ExcerptTailer tailer = queue.createTailer();

            // Replay all events
            while (tailer.readDocument(wire -> {
                String eventType = wire.read("eventType").text();

                switch (eventType) {
                    case "NEW_ORDER":
                        String orderId = wire.read("orderId").text();
                        String symbol = wire.read("symbol").text();
                        int side = wire.read("side").int32();
                        int quantity = wire.read("quantity").int32();
                        double price = wire.read("price").float64();

                        orderBook.addOrder(new Order(
                            orderId, symbol, Side.values()[side],
                            quantity, price
                        ));
                        break;

                    case "FILL":
                        orderId = wire.read("orderId").text();
                        int fillQty = wire.read("quantity").int32();
                        orderBook.fillOrder(orderId, fillQty);
                        break;

                    case "CANCEL":
                        orderId = wire.read("orderId").text();
                        orderBook.cancelOrder(orderId);
                        break;
                }
            })) {
                // Continue replay
            }
        }

        return orderBook;
    }
}
\`\`\`

**Tailer Positioning:**

\`\`\`java
// Start from beginning
ExcerptTailer tailer = queue.createTailer();
tailer.toStart();

// Start from end (real-time only)
tailer.toEnd();

// Start from specific index
long index = savedPosition;
tailer.moveToIndex(index);

// Save position for resume
long currentIndex = tailer.index();
database.savePosition(currentIndex);
\`\`\`

**Performance Optimization:**

\`\`\`java
// Batching for throughput
public void writeBatch(List<Order> orders) {
    ExcerptAppender appender = queue.acquireAppender();

    // Write multiple documents in batch
    try (DocumentContext dc = appender.writingDocument()) {
        for (Order order : orders) {
            Wire wire = dc.wire();
            wire.write("orderId").text(order.getOrderId());
            wire.write("symbol").text(order.getSymbol());
            // ... other fields
        }
    }
}

// Method writer for zero-GC
public interface OrderEvents {
    void newOrder(String orderId, String symbol,
                  int side, int quantity, double price);
    void fill(String orderId, String fillId,
              int quantity, double price);
    void cancel(String orderId);
}

ExcerptAppender appender = queue.acquireAppender();
OrderEvents events = appender.methodWriter(OrderEvents.class);

// Zero allocation calls
events.newOrder("ORDER-123", "AAPL", 1, 100, 150.50);
events.fill("ORDER-123", "FILL-456", 100, 150.50);
\`\`\`

**Use Cases in Trading:**

**1. Order Journal:**
- Persist all order events
- Recover order book after crash
- Audit trail for compliance

**2. Market Data Recording:**
- Record tick-by-tick data
- Replay for backtesting
- Historical analysis

**3. Inter-Process Communication:**
- Replace Aeron for persistent messaging
- Survives process restarts
- Order routing between components

**4. Trade Blotter:**
- Immutable execution record
- EOD reconciliation
- Regulatory reporting`
    },
    {
      id: 21,
      category: 'Order Book Matching',
      question: 'Implement a high-performance limit order book with price-time priority matching',
      answer: `**Order Book Fundamentals:**

**Matching Rules:**
- Price-Time Priority (FIFO at same price)
- Best bid/ask at top of book
- Market orders execute immediately against book
- Limit orders rest in book until matched or cancelled

**Data Structures:**

\`\`\`java
public class OrderBook {
    // Buy side - max heap (highest price first)
    private final TreeMap<Double, PriceLevel> bids =
        new TreeMap<>(Comparator.reverseOrder());

    // Sell side - min heap (lowest price first)
    private final TreeMap<Double, PriceLevel> asks =
        new TreeMap<>();

    // Fast order lookup
    private final Map<String, Order> orderIndex =
        new ConcurrentHashMap<>();

    // For real-time stats
    private volatile double lastTradePrice;
    private volatile long lastTradeTime;
}

// Price level holds all orders at a specific price
public class PriceLevel {
    private final double price;
    private final Queue<Order> orders = new LinkedList<>();
    private long totalQuantity;

    public void addOrder(Order order) {
        orders.offer(order);
        totalQuantity += order.getRemainingQuantity();
    }

    public Order removeFirstOrder() {
        Order order = orders.poll();
        if (order != null) {
            totalQuantity -= order.getRemainingQuantity();
        }
        return order;
    }

    public boolean isEmpty() {
        return orders.isEmpty();
    }

    public long getTotalQuantity() {
        return totalQuantity;
    }
}
\`\`\`

**Core Matching Algorithm:**

\`\`\`java
public class MatchingEngine {
    private final OrderBook orderBook;

    public List<Fill> addOrder(Order order) {
        List<Fill> fills = new ArrayList<>();

        if (order.getSide() == Side.BUY) {
            fills = matchBuyOrder(order);
        } else {
            fills = matchSellOrder(order);
        }

        // If order not fully filled, add remainder to book
        if (order.getRemainingQuantity() > 0) {
            orderBook.addOrder(order);
        }

        return fills;
    }

    private List<Fill> matchBuyOrder(Order buyOrder) {
        List<Fill> fills = new ArrayList<>();

        // Match against asks (sell side)
        while (buyOrder.getRemainingQuantity() > 0) {
            PriceLevel bestAsk = orderBook.getBestAsk();

            if (bestAsk == null) {
                break; // No more sellers
            }

            // Check price cross
            if (buyOrder.isMarketOrder() ||
                buyOrder.getPrice() >= bestAsk.getPrice()) {

                // Execute trade
                Order sellOrder = bestAsk.getFirstOrder();
                Fill fill = executeTrade(buyOrder, sellOrder, bestAsk.getPrice());
                fills.add(fill);

                // Update orders
                buyOrder.reduceQuantity(fill.getQuantity());
                sellOrder.reduceQuantity(fill.getQuantity());

                // Remove fully filled sell order
                if (sellOrder.getRemainingQuantity() == 0) {
                    bestAsk.removeFirstOrder();
                    orderBook.removeOrder(sellOrder.getOrderId());
                }

                // Remove empty price level
                if (bestAsk.isEmpty()) {
                    orderBook.removePriceLevel(Side.SELL, bestAsk.getPrice());
                }
            } else {
                break; // Price doesn't cross
            }
        }

        return fills;
    }

    private Fill executeTrade(Order buy, Order sell, double price) {
        long quantity = Math.min(
            buy.getRemainingQuantity(),
            sell.getRemainingQuantity()
        );

        Fill fill = new Fill();
        fill.setFillId(generateFillId());
        fill.setBuyOrderId(buy.getOrderId());
        fill.setSellOrderId(sell.getOrderId());
        fill.setPrice(price);
        fill.setQuantity(quantity);
        fill.setTimestamp(System.nanoTime());

        // Publish fill to both sides
        publishFill(buy.getOrderId(), fill);
        publishFill(sell.getOrderId(), fill);

        return fill;
    }
}
\`\`\`

**Order Cancellation:**

\`\`\`java
public boolean cancelOrder(String orderId) {
    Order order = orderBook.getOrder(orderId);

    if (order == null) {
        return false; // Order not found
    }

    // Remove from price level
    PriceLevel level = orderBook.getPriceLevel(
        order.getSide(),
        order.getPrice()
    );

    if (level != null) {
        level.removeOrder(order);

        if (level.isEmpty()) {
            orderBook.removePriceLevel(order.getSide(), order.getPrice());
        }
    }

    // Remove from index
    orderBook.removeOrder(orderId);

    return true;
}
\`\`\`

**Order Modification (Cancel/Replace):**

\`\`\`java
public List<Fill> modifyOrder(String orderId, double newPrice, long newQuantity) {
    // Cancel existing order
    Order oldOrder = orderBook.getOrder(orderId);

    if (oldOrder == null) {
        throw new OrderNotFoundException(orderId);
    }

    // Cancel loses time priority
    cancelOrder(orderId);

    // Create new order with new parameters
    Order newOrder = new Order();
    newOrder.setOrderId(generateNewOrderId());
    newOrder.setSymbol(oldOrder.getSymbol());
    newOrder.setSide(oldOrder.getSide());
    newOrder.setPrice(newPrice);
    newOrder.setQuantity(newQuantity);

    // Add as new order (goes to back of queue at price level)
    return addOrder(newOrder);
}
\`\`\`

**Book Snapshot:**

\`\`\`java
public class BookSnapshot {
    public List<Level> getBids;
    public List<Level> getAsks;

    public static class Level {
        public double price;
        public long quantity;
        public int orderCount;
    }
}

public BookSnapshot getSnapshot(int depth) {
    BookSnapshot snapshot = new BookSnapshot();

    // Top N bid levels
    snapshot.bids = orderBook.getBids().entrySet().stream()
        .limit(depth)
        .map(entry -> new Level(
            entry.getKey(),
            entry.getValue().getTotalQuantity(),
            entry.getValue().getOrderCount()
        ))
        .collect(Collectors.toList());

    // Top N ask levels
    snapshot.asks = orderBook.getAsks().entrySet().stream()
        .limit(depth)
        .map(entry -> new Level(
            entry.getKey(),
            entry.getValue().getTotalQuantity(),
            entry.getValue().getOrderCount()
        ))
        .collect(Collectors.toList());

    return snapshot;
}
\`\`\`

**Performance Optimizations:**

**1. Lock-Free Updates:**
\`\`\`java
// Use single-threaded matching engine
// All operations on one thread eliminates locks
ExecutorService matchingThread = Executors.newSingleThreadExecutor();

matchingThread.submit(() -> {
    addOrder(order);
});
\`\`\`

**2. Object Pooling:**
\`\`\`java
private final ObjectPool<Fill> fillPool = new ObjectPool<>(Fill::new, 10000);

private Fill executeTrade(Order buy, Order sell, double price) {
    Fill fill = fillPool.borrowObject();
    fill.reset();
    fill.setBuyOrderId(buy.getOrderId());
    // ...
    return fill;
}
\`\`\`

**3. Fast Price Level Access:**
- TreeMap for sorted prices: O(log n)
- HashMap for O(1) order lookup
- LinkedList for FIFO within price level

**Typical Performance:**
- Add order: 1-5 microseconds
- Cancel order: 1-3 microseconds
- Match order: 2-10 microseconds
- Snapshot: 5-20 microseconds`
    },
    {
      id: 22,
      category: 'FPGA Acceleration',
      question: 'Explain FPGA acceleration in trading systems and when to use it',
      answer: `**What is FPGA?**
- Field Programmable Gate Array
- Reconfigurable hardware chip
- Custom logic circuits for specific tasks
- Nanosecond-level latency (<100ns)
- Parallel processing

**FPGA vs CPU:**

\`\`\`
CPU (Software):
- Sequential execution
- ~1-10 microsecond latency
- Flexible, easy to change
- Higher power consumption
- Context switches, interrupts

FPGA (Hardware):
- Parallel execution
- ~10-100 nanosecond latency
- Fixed logic, expensive to change
- Lower power consumption
- Deterministic, no OS overhead
\`\`\`

**Common FPGA Use Cases:**

**1. Market Data Feed Handler:**
- Parse binary market data protocols
- Normalize data from multiple feeds
- Update order book in hardware
- Faster than software by 10-100x

**2. Order Routing:**
- Pre-trade risk checks in hardware
- FIX message parsing
- Smart order routing decisions
- Direct to exchange via kernel bypass

**3. Tick-to-Trade:**
- Receive market data tick
- Run trading strategy logic
- Generate and send order
- Complete cycle in <500 nanoseconds

**FPGA Architecture:**

\`\`\`
┌─────────────────────────────────────┐
│         FPGA Chip                   │
│                                     │
│  ┌──────────┐     ┌──────────┐    │
│  │ FIX      │────▶│ Risk     │    │
│  │ Parser   │     │ Check    │    │
│  └──────────┘     └──────────┘    │
│       │                 │          │
│       ▼                 ▼          │
│  ┌──────────┐     ┌──────────┐    │
│  │ Strategy │────▶│ Order    │    │
│  │ Logic    │     │ Gen      │    │
│  └──────────┘     └──────────┘    │
│                        │           │
└────────────────────────┼───────────┘
                         ▼
                    Network (10G/40G)
\`\`\`

**Hardware Description Language (HDL):**

\`\`\`verilog
// Verilog example - FIX price parser
module fix_price_parser (
    input wire clk,
    input wire [7:0] data_in,
    input wire valid,
    output reg [63:0] price_out,
    output reg price_valid
);

    reg [2:0] state;
    reg [63:0] accumulated_price;
    reg [3:0] decimal_position;

    always @(posedge clk) begin
        if (valid) begin
            case (state)
                PARSE_INTEGER: begin
                    if (data_in == ".") begin
                        state <= PARSE_DECIMAL;
                    end else if (data_in >= "0" && data_in <= "9") begin
                        accumulated_price <= accumulated_price * 10 +
                                           (data_in - "0");
                    end
                end

                PARSE_DECIMAL: begin
                    if (data_in >= "0" && data_in <= "9") begin
                        accumulated_price <= accumulated_price * 10 +
                                           (data_in - "0");
                        decimal_position <= decimal_position + 1;
                    end else begin
                        price_out <= accumulated_price;
                        price_valid <= 1;
                        state <= IDLE;
                    end
                end
            endcase
        end
    end
endmodule
\`\`\`

**Software-FPGA Interface:**

\`\`\`java
public class FPGAInterface {
    // Memory-mapped I/O to FPGA
    private final long FPGA_BASE_ADDRESS = 0xC0000000L;
    private final long ORDER_WRITE_OFFSET = 0x1000;
    private final long FILL_READ_OFFSET = 0x2000;

    private final Unsafe unsafe = getUnsafe();

    public void sendOrderToFPGA(Order order) {
        long address = FPGA_BASE_ADDRESS + ORDER_WRITE_OFFSET;

        // Write order directly to FPGA memory
        unsafe.putLong(address, order.getOrderId());
        unsafe.putLong(address + 8, order.getSymbol().hashCode());
        unsafe.putInt(address + 16, order.getSide().ordinal());
        unsafe.putInt(address + 20, order.getQuantity());
        unsafe.putDouble(address + 24, order.getPrice());

        // Trigger FPGA processing (write to control register)
        unsafe.putInt(FPGA_BASE_ADDRESS, 1);
    }

    public Fill readFillFromFPGA() {
        long address = FPGA_BASE_ADDRESS + FILL_READ_OFFSET;

        // Poll for fill ready flag
        while ((unsafe.getInt(address) & 0x1) == 0) {
            // Busy wait
        }

        Fill fill = new Fill();
        fill.setFillId(unsafe.getLong(address + 8));
        fill.setQuantity(unsafe.getInt(address + 16));
        fill.setPrice(unsafe.getDouble(address + 20));

        return fill;
    }
}
\`\`\`

**Advantages:**

**1. Extreme Low Latency:**
- 10-100x faster than software
- Deterministic timing
- No jitter from OS/GC

**2. High Throughput:**
- Process millions of messages/second
- Parallel processing pipelines
- No CPU bottleneck

**3. Lower Power:**
- More efficient than CPU
- Important for data center costs

**Disadvantages:**

**1. Development Cost:**
- Requires HDL expertise (Verilog/VHDL)
- Long development cycles (months)
- Expensive debugging/testing

**2. Inflexibility:**
- Hard to change strategy logic
- Firmware updates complex
- Not suitable for rapid iteration

**3. High Capital Cost:**
- FPGA cards: $10,000-100,000+
- Development tools: $50,000+
- Specialized engineers

**4. Complexity:**
- Hardware-software integration
- Timing closure challenges
- Limited debugging visibility

**When to Use FPGA:**

**Use FPGA When:**
- Latency < 1 microsecond required
- Strategy is stable, won't change often
- High message rate (millions/sec)
- Competitive advantage from speed
- Budget allows ($500k+ investment)

**Use CPU/Software When:**
- Latency < 100 microseconds acceptable
- Strategy changes frequently
- Complex decision logic
- Rapid development needed
- Limited budget

**Hybrid Approach:**

\`\`\`
FPGA: Fast path
- Market data parsing
- Pre-trade risk checks
- Simple strategies (market making)

CPU: Slow path
- Complex strategies
- Risk aggregation
- Reporting and analytics
- Administration
\`\`\`

**Major FPGA Vendors:**
- Xilinx (Alveo, UltraScale+)
- Intel/Altera (Stratix, Arria)
- Cisco (Exeter platform)

**Development Tools:**
- Vivado (Xilinx)
- Quartus (Intel)
- High-Level Synthesis (C to HDL)

**Typical Latencies:**
- Market data parse: 50-100ns
- Risk check: 20-50ns
- Order generation: 30-80ns
- Total tick-to-trade: 200-500ns`
    },
    {
      id: 23,
      category: 'Market Microstructure',
      question: 'Explain adverse selection, toxic flow, and how market makers protect against them',
      answer: `**Adverse Selection:**

**Definition:**
- Trading with a better-informed counterparty
- Losing money systematically to informed traders
- Market maker's biggest risk

**Example Scenario:**
\`\`\`
Market Maker quotes: Bid $100.00, Ask $100.10

Informed trader knows stock about to drop to $99:
- Sells to market maker at $100.00 (market maker buys)
- Stock drops to $99
- Market maker loses $1.00 per share

Informed trader had information asymmetry
Market maker suffered adverse selection
\`\`\`

**Toxic Flow Detection:**

\`\`\`java
public class ToxicFlowDetector {
    private final Map<String, ClientMetrics> clientMetrics =
        new ConcurrentHashMap<>();

    public boolean isToxicFlow(Order order, String clientId) {
        ClientMetrics metrics = clientMetrics.get(clientId);

        // 1. Win rate too high (client consistently profitable)
        if (metrics.getWinRate() > 0.65) {
            return true;
        }

        // 2. Adverse price movement after fills
        double avgPriceMove = metrics.getAvgPriceMovementAfterTrade();
        if (Math.abs(avgPriceMove) > 0.005) { // 50 bps
            return true;
        }

        // 3. Trade size correlation with price direction
        if (metrics.getSizeDirectionCorrelation() > 0.7) {
            return true;
        }

        // 4. Unusual timing patterns
        if (isLatencyArbitrage(order, metrics)) {
            return true;
        }

        return false;
    }

    private boolean isLatencyArbitrage(Order order, ClientMetrics metrics) {
        // Order came right after market data update
        long timeSinceLastTick = System.nanoTime() - lastMarketDataTime;

        // HFT arbitrage typically < 100 microseconds
        if (timeSinceLastTick < 100_000) {
            return true;
        }

        return false;
    }
}
\`\`\`

**Market Maker Protection Strategies:**

**1. Wider Spreads for Toxic Flow:**
\`\`\`java
public double calculateSpread(String clientId, String symbol) {
    double baseSpread = getBaseSpread(symbol);

    // Increase spread for toxic clients
    ToxicityScore score = getToxicityScore(clientId);

    double spreadMultiplier = 1.0;

    if (score.getLevel() == ToxicityLevel.HIGH) {
        spreadMultiplier = 3.0;  // 3x wider spread
    } else if (score.getLevel() == ToxicityLevel.MEDIUM) {
        spreadMultiplier = 1.5;
    }

    return baseSpread * spreadMultiplier;
}
\`\`\`

**2. Quote Fading (Pull Quotes):**
\`\`\`java
public void onMarketDataUpdate(Quote newQuote) {
    double priceChange = Math.abs(newQuote.getMid() - lastMid);
    double changePercent = priceChange / lastMid;

    // If price moves significantly, pull quotes temporarily
    if (changePercent > 0.001) {  // 10 bps
        pullQuotes();

        // Re-quote after brief pause to avoid stale quotes
        scheduler.schedule(() -> {
            updateQuotes();
        }, 100, TimeUnit.MICROSECONDS);
    }
}
\`\`\`

**3. Last Look / Hold Time:**
\`\`\`java
public boolean acceptTrade(Trade trade) {
    // Hold trade for brief period before acceptance
    long holdTimeNs = 100_000; // 100 microseconds

    Quote currentQuote = getCurrentMarketQuote(trade.getSymbol());
    Quote quoteAtTradeTime = getHistoricalQuote(trade.getTimestamp());

    // Reject if price moved against us during hold time
    if (trade.getSide() == Side.BUY) {
        if (currentQuote.getAsk() > quoteAtTradeTime.getAsk() * 1.0002) {
            return false; // Price moved up 2 bps, reject
        }
    } else {
        if (currentQuote.getBid() < quoteAtTradeTime.getBid() * 0.9998) {
            return false; // Price moved down 2 bps, reject
        }
    }

    return true;
}
\`\`\`

**4. Inventory-Based Pricing:**
\`\`\`java
public Quote generateQuote(String symbol) {
    double fairValue = getFairValue(symbol);
    double baseSpread = getBaseSpread(symbol);

    long inventory = getInventory(symbol);
    long inventoryLimit = getInventoryLimit(symbol);

    // Skew prices to reduce inventory
    double inventoryRatio = (double) inventory / inventoryLimit;
    double skew = inventoryRatio * 0.01; // 1% max skew

    // If long, lower both bid and ask
    double bid = fairValue - (baseSpread / 2) - skew;
    double ask = fairValue + (baseSpread / 2) - skew;

    return new Quote(symbol, bid, ask);
}
\`\`\`

**5. Client Segmentation:**
\`\`\`java
public enum ClientTier {
    TIER_1_INSTITUTIONAL,  // Best prices
    TIER_2_RETAIL,          // Standard prices
    TIER_3_TOXIC_HFT       // Worst prices or no quote
}

public Quote getQuoteForClient(String clientId, String symbol) {
    ClientTier tier = getClientTier(clientId);

    Quote baseQuote = generateQuote(symbol);

    switch (tier) {
        case TIER_1_INSTITUTIONAL:
            return baseQuote; // Tight spread

        case TIER_2_RETAIL:
            return widenSpread(baseQuote, 1.5);

        case TIER_3_TOXIC_HFT:
            return widenSpread(baseQuote, 3.0);
            // Or return null (no quote)
    }
}
\`\`\`

**Information Leakage Detection:**

\`\`\`java
public class InformationLeakageDetector {
    public void detectPinging(String clientId) {
        List<Order> recentOrders = getRecentOrders(clientId);

        // Detect small orders to test liquidity
        long smallOrderCount = recentOrders.stream()
            .filter(o -> o.getQuantity() < 100) // IOC orders
            .filter(o -> o.getTimeInForce() == TimeInForce.IOC)
            .count();

        if (smallOrderCount > 10 within 1 second) {
            // Client is "pinging" to detect hidden liquidity
            flagClient(clientId, "PINGING_DETECTED");
        }
    }

    public void detectOrderbookProbing(String clientId) {
        // Detect pattern: small order, cancel, repeat
        // Used to discover hidden orders in dark pools

        int cancelRate = getCancelRate(clientId);

        if (cancelRate > 80%) { // 80%+ cancellation rate
            flagClient(clientId, "PROBING_DETECTED");
        }
    }
}
\`\`\`

**Metrics for Adverse Selection:**

**Fill Ratio:**
\`\`\`
Fill Ratio = Fills / Quotes Sent

Low fill ratio = good (selective about trades)
High fill ratio = bad (getting picked off)
\`\`\`

**Effective Spread Captured:**
\`\`\`
Spread Captured = (Sell Price - Buy Price) / 2

Should be close to quoted spread
Lower = adverse selection eating profit
\`\`\`

**Post-Trade Price Movement:**
\`\`\`
Price Movement = Abs(Price after 100ms - Fill Price)

Higher = getting picked off by informed traders
Lower = trading with uninformed flow
\`\`\`

**Regulatory Considerations:**

**Last Look Controversy:**
- FX market practice
- Controversial for fairness
- Some venues ban it
- Transparency required

**Best Execution:**
- Must balance speed vs price
- Can't discriminate unfairly
- Need documented policy`
    },
    {
      id: 24,
      category: 'Multi-threaded Order Processing',
      question: 'Design a multi-threaded order processing system that maintains FIFO guarantees',
      answer: `**Challenge:**
- Process orders in parallel for throughput
- Maintain FIFO ordering per symbol
- Avoid race conditions and deadlocks
- Minimize contention and locks

**Partitioning Strategy:**

**Symbol-Based Partitioning:**
\`\`\`java
public class PartitionedOrderProcessor {
    private final int numPartitions = 16; // Power of 2
    private final ExecutorService[] executors;
    private final Disruptor<OrderEvent>[] disruptors;

    public PartitionedOrderProcessor() {
        executors = new ExecutorService[numPartitions];
        disruptors = new Disruptor[numPartitions];

        for (int i = 0; i < numPartitions; i++) {
            // Dedicated thread per partition
            executors[i] = Executors.newSingleThreadExecutor(
                new ThreadFactory() {
                    public Thread newThread(Runnable r) {
                        Thread t = new Thread(r);
                        t.setName("OrderProcessor-" + i);
                        // Pin to specific CPU core
                        setThreadAffinity(t, i);
                        return t;
                    }
                }
            );

            // Disruptor ring buffer per partition
            disruptors[i] = new Disruptor<>(
                OrderEvent::new,
                1024, // Buffer size
                executors[i],
                ProducerType.MULTI,
                new BusySpinWaitStrategy()
            );

            // Attach handler
            disruptors[i].handleEventsWith(
                new OrderEventHandler(i)
            );

            disruptors[i].start();
        }
    }

    public void submitOrder(Order order) {
        // Hash symbol to partition
        int partition = getPartition(order.getSymbol());

        // Publish to partition's ring buffer
        RingBuffer<OrderEvent> ringBuffer =
            disruptors[partition].getRingBuffer();

        long sequence = ringBuffer.next();
        try {
            OrderEvent event = ringBuffer.get(sequence);
            event.setOrder(order);
        } finally {
            ringBuffer.publish(sequence);
        }
    }

    private int getPartition(String symbol) {
        // Consistent hashing
        int hash = symbol.hashCode();
        return Math.abs(hash) % numPartitions;
    }
}
\`\`\`

**Order Event Handler (Single-Threaded per Partition):**

\`\`\`java
public class OrderEventHandler implements EventHandler<OrderEvent> {
    private final int partitionId;
    private final Map<String, OrderBook> orderBooks = new HashMap<>();

    public OrderEventHandler(int partitionId) {
        this.partitionId = partitionId;
    }

    @Override
    public void onEvent(OrderEvent event, long sequence, boolean endOfBatch) {
        Order order = event.getOrder();

        // Get or create order book for symbol
        OrderBook book = orderBooks.computeIfAbsent(
            order.getSymbol(),
            k -> new OrderBook(k)
        );

        // Process order (single-threaded, no locks needed)
        switch (order.getType()) {
            case NEW:
                List<Fill> fills = book.addOrder(order);
                publishFills(fills);
                break;

            case CANCEL:
                boolean cancelled = book.cancelOrder(order.getOrderId());
                publishCancelConfirm(order, cancelled);
                break;

            case MODIFY:
                fills = book.modifyOrder(
                    order.getOrderId(),
                    order.getPrice(),
                    order.getQuantity()
                );
                publishFills(fills);
                break;
        }

        // Batch processing optimization
        if (endOfBatch) {
            flushMarketData();
        }
    }
}
\`\`\`

**Cross-Partition Coordination (Rare Case):**

\`\`\`java
public class CrossPartitionCoordinator {
    // Use this only for operations requiring multiple symbols

    public void executeBasketOrder(List<Order> basketOrders) {
        // Group by partition
        Map<Integer, List<Order>> partitionGroups =
            basketOrders.stream()
                .collect(Collectors.groupingBy(
                    o -> getPartition(o.getSymbol())
                ));

        // Sort partitions to avoid deadlock (always acquire in order)
        List<Integer> sortedPartitions = new ArrayList<>(
            partitionGroups.keySet()
        );
        Collections.sort(sortedPartitions);

        // Acquire locks in order
        List<Lock> locks = new ArrayList<>();
        for (int partition : sortedPartitions) {
            Lock lock = partitionLocks[partition];
            lock.lock();
            locks.add(lock);
        }

        try {
            // Process all orders atomically
            for (Map.Entry<Integer, List<Order>> entry :
                    partitionGroups.entrySet()) {
                for (Order order : entry.getValue()) {
                    processOrder(order);
                }
            }
        } finally {
            // Release locks in reverse order
            Collections.reverse(locks);
            locks.forEach(Lock::unlock);
        }
    }
}
\`\`\`

**Work Stealing for Load Balancing:**

\`\`\`java
public class WorkStealingOrderProcessor {
    private final ForkJoinPool pool = new ForkJoinPool(
        16, // Parallelism
        ForkJoinPool.defaultForkJoinWorkerThreadFactory,
        null,
        true  // Async mode for better work stealing
    );

    public void processOrderBatch(List<Order> orders) {
        // Group by symbol to maintain FIFO
        Map<String, List<Order>> ordersBySymbol =
            orders.stream().collect(Collectors.groupingBy(Order::getSymbol));

        // Process each symbol's orders in parallel
        List<CompletableFuture<Void>> futures = new ArrayList<>();

        for (Map.Entry<String, List<Order>> entry :
                ordersBySymbol.entrySet()) {
            CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
                processOrdersForSymbol(entry.getKey(), entry.getValue());
            }, pool);

            futures.add(future);
        }

        // Wait for all symbols to complete
        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
            .join();
    }

    private void processOrdersForSymbol(String symbol, List<Order> orders) {
        OrderBook book = getOrderBook(symbol);

        // Process in FIFO order (single-threaded per symbol)
        for (Order order : orders) {
            book.addOrder(order);
        }
    }
}
\`\`\`

**Thread Affinity (CPU Pinning):**

\`\`\`java
public class ThreadAffinity {
    public static void setThreadAffinity(Thread thread, int coreId) {
        try {
            // Linux-specific via JNA/JNI
            long mask = 1L << coreId;

            // Call pthread_setaffinity_np or sched_setaffinity
            CLibrary.INSTANCE.sched_setaffinity(
                thread.getId(),
                Long.BYTES,
                mask
            );
        } catch (Exception e) {
            log.warn("Failed to set thread affinity", e);
        }
    }
}

// Benefit: Reduces cache misses, more consistent latency
\`\`\`

**Backpressure Handling:**

\`\`\`java
public class BackpressureHandler {
    private final AtomicInteger queueDepth = new AtomicInteger(0);
    private final int QUEUE_LIMIT = 10000;

    public boolean submitOrder(Order order) {
        int depth = queueDepth.incrementAndGet();

        if (depth > QUEUE_LIMIT) {
            queueDepth.decrementAndGet();

            // Reject order due to backpressure
            rejectOrder(order, "System overloaded");
            return false;
        }

        try {
            // Submit to ring buffer
            publishOrder(order);
            return true;
        } finally {
            queueDepth.decrementAndGet();
        }
    }

    // Alternative: Apply backpressure by rate limiting
    private final RateLimiter rateLimiter = RateLimiter.create(100_000);

    public void submitWithRateLimit(Order order) {
        if (!rateLimiter.tryAcquire()) {
            rejectOrder(order, "Rate limit exceeded");
            return;
        }

        submitOrder(order);
    }
}
\`\`\`

**Performance Metrics:**

**Throughput:**
- Single partition: 500k-1M orders/sec
- 16 partitions: 8-16M orders/sec
- Depends on order complexity

**Latency:**
- Median: 1-5 microseconds
- p99: 10-50 microseconds
- p99.9: 50-200 microseconds

**Best Practices:**

1. **Partition by Symbol** - Natural ordering boundary
2. **Single Thread per Partition** - No locks needed
3. **CPU Pinning** - Reduce cache misses
4. **Batch Processing** - Amortize overhead
5. **Monitor Queue Depth** - Backpressure indicator
6. **Bounded Queues** - Prevent memory exhaustion`
    },
    {
      id: 25,
      category: 'Trade Surveillance',
      question: 'How do you detect market manipulation patterns like spoofing, layering, and wash trading?',
      answer: `**Market Manipulation Types:**

**1. Spoofing:**
- Place large orders with no intent to execute
- Create false impression of supply/demand
- Cancel before execution
- Illegal under Dodd-Frank Act

**2. Layering:**
- Multiple orders at different price levels
- Create artificial price pressure
- Cancel outer layers, execute inner orders
- Similar to spoofing but more sophisticated

**3. Wash Trading:**
- Buy and sell to yourself
- Create false volume/activity
- No change in beneficial ownership
- Prohibited by SEC

**Spoofing Detection:**

\`\`\`java
public class SpoofingDetector {
    public boolean detectSpoofing(String accountId, String symbol) {
        List<Order> recentOrders = getRecentOrders(accountId, symbol);

        // Pattern: Large order -> Cancel before fill -> Opposite trade

        for (int i = 0; i < recentOrders.size() - 1; i++) {
            Order order1 = recentOrders.get(i);
            Order order2 = recentOrders.get(i + 1);

            // Check for spoof pattern
            if (isSpoofPattern(order1, order2)) {
                double orderRatio = (double) order1.getQuantity() /
                                   order2.getQuantity();

                // Large order cancelled, small opposite order executed
                if (order1.getStatus() == OrderStatus.CANCELLED &&
                    order2.getStatus() == OrderStatus.FILLED &&
                    order1.getSide() != order2.getSide() &&
                    orderRatio > 10.0) {

                    // Time between orders < 5 seconds
                    long timeDiff = order2.getTimestamp() - order1.getTimestamp();
                    if (timeDiff < 5_000_000_000L) { // 5 seconds in nanos
                        return true;
                    }
                }
            }
        }

        return false;
    }

    public SpoofingMetrics calculateMetrics(String accountId) {
        List<Order> orders = getAllOrders(accountId);

        long totalOrders = orders.size();
        long cancelledOrders = orders.stream()
            .filter(o -> o.getStatus() == OrderStatus.CANCELLED)
            .count();

        double cancelRate = (double) cancelledOrders / totalOrders;

        // High cancel rate (>80%) is suspicious
        // Especially if orders large and quickly cancelled

        long avgTimeToCancel = orders.stream()
            .filter(o -> o.getStatus() == OrderStatus.CANCELLED)
            .mapToLong(o -> o.getCancelTime() - o.getCreateTime())
            .average()
            .orElse(0);

        return new SpoofingMetrics(cancelRate, avgTimeToCancel);
    }
}
\`\`\`

**Layering Detection:**

\`\`\`java
public class LayeringDetector {
    public boolean detectLayering(String accountId, String symbol) {
        // Get order book snapshots over time
        List<OrderBookSnapshot> snapshots = getSnapshots(symbol);

        for (OrderBookSnapshot snapshot : snapshots) {
            // Check for multiple orders from same account
            Map<String, List<Order>> ordersByAccount =
                snapshot.getAllOrders().stream()
                    .collect(Collectors.groupingBy(Order::getAccountId));

            List<Order> accountOrders = ordersByAccount.get(accountId);

            if (accountOrders == null || accountOrders.size() < 3) {
                continue;
            }

            // Layering pattern: Multiple orders on one side,
            // execution on opposite side

            long buys = accountOrders.stream()
                .filter(o -> o.getSide() == Side.BUY)
                .count();

            long sells = accountOrders.stream()
                .filter(o -> o.getSide() == Side.SELL)
                .count();

            // Imbalance: 5+ orders on one side
            if (buys >= 5 && sells == 0) {
                // Check if opposite side trade executed shortly after
                if (hasOppositeTrade(accountId, symbol, Side.SELL,
                        snapshot.getTimestamp())) {
                    return true;
                }
            } else if (sells >= 5 && buys == 0) {
                if (hasOppositeTrade(accountId, symbol, Side.BUY,
                        snapshot.getTimestamp())) {
                    return true;
                }
            }
        }

        return false;
    }

    private boolean hasOppositeTrade(String accountId, String symbol,
                                     Side side, long afterTimestamp) {
        List<Fill> fills = getFills(accountId, symbol);

        return fills.stream()
            .anyMatch(f -> f.getSide() == side &&
                          f.getTimestamp() > afterTimestamp &&
                          f.getTimestamp() < afterTimestamp + 60_000_000_000L);
    }
}
\`\`\`

**Wash Trading Detection:**

\`\`\`java
public class WashTradingDetector {
    public boolean detectWashTrading(String accountId) {
        List<Fill> fills = getAllFills(accountId);

        // Group fills by symbol and timestamp proximity
        for (Fill fill1 : fills) {
            for (Fill fill2 : fills) {
                if (fill1.getFillId().equals(fill2.getFillId())) {
                    continue;
                }

                // Same symbol, opposite sides
                if (fill1.getSymbol().equals(fill2.getSymbol()) &&
                    fill1.getSide() != fill2.getSide()) {

                    // Similar quantity
                    double qtyDiff = Math.abs(
                        fill1.getQuantity() - fill2.getQuantity()
                    );
                    if (qtyDiff / fill1.getQuantity() < 0.05) { // 5% diff

                        // Similar price
                        double priceDiff = Math.abs(
                            fill1.getPrice() - fill2.getPrice()
                        );
                        if (priceDiff / fill1.getPrice() < 0.002) { // 20 bps

                            // Close in time (within 1 minute)
                            long timeDiff = Math.abs(
                                fill1.getTimestamp() - fill2.getTimestamp()
                            );
                            if (timeDiff < 60_000_000_000L) {
                                // Potential wash trade
                                return true;
                            }
                        }
                    }
                }
            }
        }

        return false;
    }

    public boolean detectCrossAccountWash(String account1, String account2) {
        // Check if two accounts are related (same beneficial owner)

        if (!areRelatedAccounts(account1, account2)) {
            return false;
        }

        // Check for matching trades between related accounts
        List<Fill> fills1 = getAllFills(account1);
        List<Fill> fills2 = getAllFills(account2);

        for (Fill f1 : fills1) {
            for (Fill f2 : fills2) {
                if (isMatchingTrade(f1, f2)) {
                    return true; // Wash trade across accounts
                }
            }
        }

        return false;
    }
}
\`\`\`

**Quote Stuffing Detection:**

\`\`\`java
public class QuoteStuffingDetector {
    public boolean detectQuoteStuffing(String accountId) {
        List<Order> orders = getRecentOrders(accountId);

        // Count orders in last second
        long now = System.nanoTime();
        long oneSecondAgo = now - 1_000_000_000L;

        long ordersInLastSecond = orders.stream()
            .filter(o -> o.getTimestamp() > oneSecondAgo)
            .count();

        // More than 1000 orders per second is suspicious
        if (ordersInLastSecond > 1000) {
            // Check if most are cancelled
            long cancelled = orders.stream()
                .filter(o -> o.getTimestamp() > oneSecondAgo)
                .filter(o -> o.getStatus() == OrderStatus.CANCELLED)
                .count();

            double cancelRate = (double) cancelled / ordersInLastSecond;

            if (cancelRate > 0.95) { // 95%+ cancelled
                return true; // Quote stuffing
            }
        }

        return false;
    }
}
\`\`\`

**Surveillance Dashboard:**

\`\`\`java
public class SurveillanceAlerts {
    public void generateAlerts() {
        List<String> accounts = getAllActiveAccounts();

        for (String accountId : accounts) {
            // Run all detectors
            if (spoofingDetector.detectSpoofing(accountId)) {
                createAlert(accountId, AlertType.SPOOFING, Severity.HIGH);
            }

            if (layeringDetector.detectLayering(accountId)) {
                createAlert(accountId, AlertType.LAYERING, Severity.HIGH);
            }

            if (washTradingDetector.detectWashTrading(accountId)) {
                createAlert(accountId, AlertType.WASH_TRADING, Severity.CRITICAL);
            }

            // Calculate metrics
            double cancelRate = getCancelRate(accountId);
            if (cancelRate > 0.85) {
                createAlert(accountId, AlertType.HIGH_CANCEL_RATE,
                    Severity.MEDIUM);
            }

            // Order-to-trade ratio
            double otRatio = getOrderToTradeRatio(accountId);
            if (otRatio > 100) { // 100:1 ratio
                createAlert(accountId, AlertType.HIGH_OT_RATIO,
                    Severity.MEDIUM);
            }
        }
    }

    public void createAlert(String accountId, AlertType type,
                           Severity severity) {
        Alert alert = new Alert();
        alert.setAccountId(accountId);
        alert.setType(type);
        alert.setSeverity(severity);
        alert.setTimestamp(Instant.now());

        // Send to compliance team
        complianceQueue.publish(alert);

        // Log for audit
        auditLog.write(alert);
    }
}
\`\`\`

**Machine Learning Approach:**

\`\`\`java
public class MLSurveillance {
    private final RandomForest model;

    public double calculateManipulationScore(String accountId) {
        // Extract features
        double[] features = extractFeatures(accountId);

        // Features:
        // - Cancel rate
        // - Order-to-trade ratio
        // - Average time to cancel
        // - Order size variance
        // - Fill rate
        // - Price impact
        // - Time of day patterns
        // - Order placement speed

        // Predict manipulation probability (0-1)
        double score = model.predict(features);

        return score;
    }

    private double[] extractFeatures(String accountId) {
        return new double[] {
            getCancelRate(accountId),
            getOrderToTradeRatio(accountId),
            getAvgTimeToCancel(accountId),
            getOrderSizeStdDev(accountId),
            getFillRate(accountId),
            getAvgPriceImpact(accountId),
            getTimeOfDayEntropy(accountId),
            getOrderPlacementSpeed(accountId)
        };
    }
}
\`\`\`

**Regulatory Reporting:**
- Must report suspicious activity to FINRA/SEC
- Maintain audit trail for 7 years
- Real-time surveillance required
- False positive rate important`
    },
    {
      id: 26,
      category: 'Kafka for Trading',
      question: 'Design a Kafka-based architecture for real-time trade feed distribution with exactly-once semantics',
      answer: `**Requirements:**
- Real-time trade distribution to consumers
- Exactly-once delivery (no duplicates, no losses)
- Partitioning for scalability
- Replay capability
- Low latency (< 10ms end-to-end)

**Kafka Topic Design:**

\`\`\`
Topics:
- trades.all - All trades across all symbols
- trades.equities - Equity trades only
- trades.{symbol} - Per-symbol topics for hot symbols
- trades.dlq - Dead letter queue for failed messages

Partitions:
- Partition by symbol for ordering guarantee
- 100 partitions for horizontal scaling
\`\`\`

**Producer with Exactly-Once:**

\`\`\`java
public class TradeProducer {
    private final KafkaProducer<String, Trade> producer;

    public TradeProducer() {
        Properties props = new Properties();
        props.put("bootstrap.servers", "kafka1:9092,kafka2:9092");
        props.put("key.serializer", StringSerializer.class.getName());
        props.put("value.serializer", TradeSerializer.class.getName());

        // Exactly-once configuration
        props.put("enable.idempotence", "true");
        props.put("acks", "all");
        props.put("retries", Integer.MAX_VALUE);
        props.put("max.in.flight.requests.per.connection", "5");

        // Transactional ID for exactly-once across topics
        props.put("transactional.id", "trade-producer-1");

        // Compression
        props.put("compression.type", "lz4");

        // Low latency
        props.put("linger.ms", "0");
        props.put("batch.size", "0");

        producer = new KafkaProducer<>(props);
        producer.initTransactions();
    }

    public void publishTrade(Trade trade) {
        try {
            producer.beginTransaction();

            // Send to multiple topics atomically
            String symbol = trade.getSymbol();

            // Main topic (partitioned by symbol)
            ProducerRecord<String, Trade> record1 = new ProducerRecord<>(
                "trades.all",
                symbol, // Key for partitioning
                trade
            );

            // Symbol-specific topic
            ProducerRecord<String, Trade> record2 = new ProducerRecord<>(
                "trades." + symbol,
                trade.getTradeId(),
                trade
            );

            // Send both
            producer.send(record1);
            producer.send(record2);

            // Commit transaction
            producer.commitTransaction();

        } catch (Exception e) {
            producer.abortTransaction();
            throw new RuntimeException("Failed to publish trade", e);
        }
    }

    public void publishBatch(List<Trade> trades) {
        try {
            producer.beginTransaction();

            for (Trade trade : trades) {
                ProducerRecord<String, Trade> record = new ProducerRecord<>(
                    "trades.all",
                    trade.getSymbol(),
                    trade
                );

                // Async send for batching
                producer.send(record);
            }

            producer.commitTransaction();

        } catch (Exception e) {
            producer.abortTransaction();
            throw new RuntimeException("Batch publish failed", e);
        }
    }
}
\`\`\`

**Consumer with Exactly-Once:**

\`\`\`java
public class TradeConsumer {
    private final KafkaConsumer<String, Trade> consumer;

    public TradeConsumer(String consumerGroup) {
        Properties props = new Properties();
        props.put("bootstrap.servers", "kafka1:9092,kafka2:9092");
        props.put("group.id", consumerGroup);
        props.put("key.deserializer", StringDeserializer.class.getName());
        props.put("value.deserializer", TradeDeserializer.class.getName());

        // Exactly-once consumption
        props.put("isolation.level", "read_committed");
        props.put("enable.auto.commit", "false");

        // Performance tuning
        props.put("fetch.min.bytes", "1");
        props.put("fetch.max.wait.ms", "100");

        consumer = new KafkaConsumer<>(props);
        consumer.subscribe(Arrays.asList("trades.all"));
    }

    public void consumeTrades() {
        while (true) {
            ConsumerRecords<String, Trade> records =
                consumer.poll(Duration.ofMillis(100));

            // Process records
            for (ConsumerRecord<String, Trade> record : records) {
                Trade trade = record.value();

                try {
                    // Process trade
                    processTrade(trade);

                    // Store in database (idempotent)
                    storeTrade(trade);

                    // Manual commit for exactly-once
                    consumer.commitSync(Collections.singletonMap(
                        new TopicPartition(record.topic(), record.partition()),
                        new OffsetAndMetadata(record.offset() + 1)
                    ));

                } catch (Exception e) {
                    // Send to DLQ
                    sendToDeadLetterQueue(trade, e);
                }
            }
        }
    }

    private void processTrade(Trade trade) {
        // Idempotent processing using trade ID
        if (isDuplicate(trade.getTradeId())) {
            return; // Skip duplicate
        }

        // Business logic
        updatePosition(trade);
        calculatePnL(trade);
        publishToRiskSystem(trade);

        // Mark as processed
        markProcessed(trade.getTradeId());
    }
}
\`\`\`

**Kafka Streams for Aggregations:**

\`\`\`java
public class TradeAggregator {
    public void runAggregations() {
        Properties props = new Properties();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, "trade-aggregator");
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "kafka1:9092");
        props.put(StreamsConfig.PROCESSING_GUARANTEE_CONFIG,
            StreamsConfig.EXACTLY_ONCE_V2);

        StreamsBuilder builder = new StreamsBuilder();

        // Source: trades
        KStream<String, Trade> trades = builder.stream("trades.all");

        // Aggregate by symbol - 1 minute windows
        KTable<Windowed<String>, TradeStats> stats = trades
            .groupByKey()
            .windowedBy(TimeWindows.of(Duration.ofMinutes(1)))
            .aggregate(
                TradeStats::new,
                (symbol, trade, stats) -> {
                    stats.addTrade(trade);
                    return stats;
                },
                Materialized.with(Serdes.String(), new TradeStatsSerde())
            );

        // Output to new topic
        stats.toStream()
            .map((key, value) -> KeyValue.pair(key.key(), value))
            .to("trade-stats", Produced.with(Serdes.String(),
                new TradeStatsSerde()));

        KafkaStreams streams = new KafkaStreams(builder.build(), props);
        streams.start();
    }
}

public class TradeStats {
    private long tradeCount;
    private double totalVolume;
    private double vwapPrice;
    private double high;
    private double low;

    public void addTrade(Trade trade) {
        tradeCount++;
        totalVolume += trade.getQuantity() * trade.getPrice();
        vwapPrice = totalVolume / tradeCount;
        high = Math.max(high, trade.getPrice());
        low = Math.min(low, trade.getPrice());
    }
}
\`\`\`

**Partitioning Strategy:**

\`\`\`java
public class SymbolPartitioner implements Partitioner {
    @Override
    public int partition(String topic, Object key, byte[] keyBytes,
                        Object value, byte[] valueBytes, Cluster cluster) {

        int numPartitions = cluster.partitionCountForTopic(topic);

        if (key == null) {
            // Round robin if no key
            return ThreadLocalRandom.current().nextInt(numPartitions);
        }

        String symbol = (String) key;

        // Hash symbol to partition
        int partition = Math.abs(symbol.hashCode()) % numPartitions;

        // Hot symbols get dedicated partitions
        if (isHotSymbol(symbol)) {
            partition = getHotSymbolPartition(symbol);
        }

        return partition;
    }

    private boolean isHotSymbol(String symbol) {
        return symbol.equals("AAPL") || symbol.equals("TSLA") ||
               symbol.equals("AMZN");
    }
}
\`\`\`

**Monitoring and Metrics:**

\`\`\`java
public class KafkaMetrics {
    private final MeterRegistry registry;

    public void recordProducerMetrics(KafkaProducer<?, ?> producer) {
        Map<MetricName, ? extends Metric> metrics = producer.metrics();

        for (Map.Entry<MetricName, ? extends Metric> entry : metrics.entrySet()) {
            MetricName name = entry.getKey();
            Metric metric = entry.getValue();

            // Record key metrics
            if (name.name().equals("record-send-rate")) {
                registry.gauge("kafka.producer.send.rate", metric.metricValue());
            }
            if (name.name().equals("request-latency-avg")) {
                registry.gauge("kafka.producer.latency.avg", metric.metricValue());
            }
        }
    }

    public void trackConsumerLag(KafkaConsumer<?, ?> consumer) {
        // Get current offsets
        Set<TopicPartition> assignments = consumer.assignment();

        for (TopicPartition partition : assignments) {
            long currentOffset = consumer.position(partition);
            long endOffset = consumer.endOffsets(
                Collections.singleton(partition)
            ).get(partition);

            long lag = endOffset - currentOffset;

            registry.gauge("kafka.consumer.lag",
                Tags.of("partition", String.valueOf(partition.partition())),
                lag
            );

            // Alert if lag > 10000
            if (lag > 10000) {
                alertHighLag(partition, lag);
            }
        }
    }
}
\`\`\`

**Replay Capability:**

\`\`\`java
public class TradeReplay {
    public void replayTrades(String symbol, Instant start, Instant end) {
        Properties props = new Properties();
        props.put("bootstrap.servers", "kafka1:9092");
        props.put("group.id", "replay-" + UUID.randomUUID());
        props.put("enable.auto.commit", "false");

        KafkaConsumer<String, Trade> consumer = new KafkaConsumer<>(props);

        // Assign specific partition
        int partition = getPartitionForSymbol(symbol);
        TopicPartition tp = new TopicPartition("trades.all", partition);
        consumer.assign(Collections.singleton(tp));

        // Find offset for start timestamp
        Map<TopicPartition, Long> timestampMap = new HashMap<>();
        timestampMap.put(tp, start.toEpochMilli());

        Map<TopicPartition, OffsetAndTimestamp> offsets =
            consumer.offsetsForTimes(timestampMap);

        long startOffset = offsets.get(tp).offset();
        consumer.seek(tp, startOffset);

        // Consume until end timestamp
        while (true) {
            ConsumerRecords<String, Trade> records = consumer.poll(
                Duration.ofMillis(100)
            );

            for (ConsumerRecord<String, Trade> record : records) {
                Trade trade = record.value();

                if (trade.getTimestamp().isAfter(end)) {
                    return; // Reached end time
                }

                // Replay trade
                replayTrade(trade);
            }
        }
    }
}
\`\`\`

**Performance:**
- Producer latency: 1-5ms
- Consumer lag: < 100ms
- Throughput: 100k-1M trades/second
- Retention: 7 days (configurable)`
    },
    {
      id: 27,
      category: 'Pre-trade Risk',
      question: 'Implement comprehensive pre-trade risk checks with circuit breakers and kill switches',
      answer: `**Risk Check Architecture:**

\`\`\`java
public class PreTradeRiskEngine {
    private final List<RiskCheck> riskChecks = new ArrayList<>();
    private final CircuitBreaker circuitBreaker;
    private final KillSwitch killSwitch;

    public PreTradeRiskEngine() {
        // Register risk checks in order of speed (fastest first)
        riskChecks.add(new KillSwitchCheck());
        riskChecks.add(new FatFingerCheck());
        riskChecks.add(new PositionLimitCheck());
        riskChecks.add(new NotionalLimitCheck());
        riskChecks.add(new CreditLimitCheck());
        riskChecks.add(new RateLimitCheck());
        riskChecks.add(new ConcentrationCheck());
        riskChecks.add(new MarketStateCheck());

        this.circuitBreaker = new CircuitBreaker();
        this.killSwitch = new KillSwitch();
    }

    public RiskResult validateOrder(Order order) {
        long startTime = System.nanoTime();

        try {
            // Run all checks
            for (RiskCheck check : riskChecks) {
                RiskResult result = check.validate(order);

                if (!result.isApproved()) {
                    recordRejection(order, check, result);
                    return result;
                }
            }

            // All checks passed
            recordApproval(order, System.nanoTime() - startTime);
            return RiskResult.approve();

        } catch (Exception e) {
            // Risk check failure - reject for safety
            return RiskResult.reject("Risk check system error");
        }
    }
}
\`\`\`

**Individual Risk Checks:**

\`\`\`java
public class FatFingerCheck implements RiskCheck {
    private final double MAX_PRICE_DEVIATION = 0.10;  // 10%
    private final long MAX_QUANTITY = 1_000_000;
    private final double MAX_NOTIONAL = 50_000_000;  // $50M

    @Override
    public RiskResult validate(Order order) {
        // Price reasonability
        Quote marketQuote = getMarketQuote(order.getSymbol());

        if (marketQuote != null) {
            double midPrice = marketQuote.getMid();
            double deviation = Math.abs(order.getPrice() - midPrice) / midPrice;

            if (deviation > MAX_PRICE_DEVIATION) {
                return RiskResult.reject(
                    "Price deviates " + (deviation * 100) + "% from market"
                );
            }
        }

        // Quantity check
        if (order.getQuantity() > MAX_QUANTITY) {
            return RiskResult.reject(
                "Quantity " + order.getQuantity() + " exceeds max " + MAX_QUANTITY
            );
        }

        // Notional check
        double notional = order.getQuantity() * order.getPrice();
        if (notional > MAX_NOTIONAL) {
            return RiskResult.reject(
                "Notional $" + notional + " exceeds max $" + MAX_NOTIONAL
            );
        }

        return RiskResult.approve();
    }
}

public class PositionLimitCheck implements RiskCheck {
    private final Map<String, Long> symbolLimits;
    private final long globalNetLimit;

    @Override
    public RiskResult validate(Order order) {
        String symbol = order.getSymbol();

        // Current position
        long currentPosition = getPosition(symbol);

        // Calculate new position if order fills
        long signedQty = order.getSide() == Side.BUY ?
            order.getQuantity() : -order.getQuantity();
        long newPosition = currentPosition + signedQty;

        // Symbol limit
        Long symbolLimit = symbolLimits.get(symbol);
        if (symbolLimit != null && Math.abs(newPosition) > symbolLimit) {
            return RiskResult.reject(
                "Would breach symbol limit: " + symbolLimit
            );
        }

        // Global net limit
        long globalPosition = getGlobalNetPosition() + signedQty;
        if (Math.abs(globalPosition) > globalNetLimit) {
            return RiskResult.reject("Would breach global net limit");
        }

        return RiskResult.approve();
    }
}

public class RateLimitCheck implements RiskCheck {
    private final RateLimiter orderRateLimiter;
    private final RateLimiter notionalRateLimiter;

    public RateLimitCheck() {
        // 1000 orders per second
        orderRateLimiter = RateLimiter.create(1000.0);

        // $100M notional per second
        notionalRateLimiter = RateLimiter.create(100_000_000.0);
    }

    @Override
    public RiskResult validate(Order order) {
        // Order rate limit
        if (!orderRateLimiter.tryAcquire()) {
            return RiskResult.reject("Order rate limit exceeded");
        }

        // Notional rate limit
        double notional = order.getQuantity() * order.getPrice();
        if (!notionalRateLimiter.tryAcquire(notional)) {
            return RiskResult.reject("Notional rate limit exceeded");
        }

        return RiskResult.approve();
    }
}
\`\`\`

**Circuit Breaker:**

\`\`\`java
public class CircuitBreaker {
    private enum State { CLOSED, OPEN, HALF_OPEN }

    private volatile State state = State.CLOSED;
    private final AtomicInteger failureCount = new AtomicInteger(0);
    private final AtomicInteger successCount = new AtomicInteger(0);
    private volatile long openedAt;

    private final int FAILURE_THRESHOLD = 10;
    private final int SUCCESS_THRESHOLD = 5;
    private final long TIMEOUT_MS = 60_000; // 1 minute

    public boolean allowRequest() {
        switch (state) {
            case CLOSED:
                return true;

            case OPEN:
                // Check if timeout expired
                if (System.currentTimeMillis() - openedAt > TIMEOUT_MS) {
                    transitionToHalfOpen();
                    return true;
                }
                return false;

            case HALF_OPEN:
                return true;

            default:
                return false;
        }
    }

    public void recordSuccess() {
        if (state == State.HALF_OPEN) {
            if (successCount.incrementAndGet() >= SUCCESS_THRESHOLD) {
                transitionToClosed();
            }
        } else if (state == State.CLOSED) {
            failureCount.set(0);
        }
    }

    public void recordFailure() {
        if (state == State.HALF_OPEN) {
            transitionToOpen();
        } else if (state == State.CLOSED) {
            if (failureCount.incrementAndGet() >= FAILURE_THRESHOLD) {
                transitionToOpen();
            }
        }
    }

    private void transitionToOpen() {
        state = State.OPEN;
        openedAt = System.currentTimeMillis();
        failureCount.set(0);
        successCount.set(0);
        alert("Circuit breaker OPEN - rejecting all orders");
    }

    private void transitionToHalfOpen() {
        state = State.HALF_OPEN;
        successCount.set(0);
        alert("Circuit breaker HALF_OPEN - testing recovery");
    }

    private void transitionToClosed() {
        state = State.CLOSED;
        failureCount.set(0);
        successCount.set(0);
        alert("Circuit breaker CLOSED - normal operation");
    }
}
\`\`\`

**Kill Switch:**

\`\`\`java
public class KillSwitch {
    private final AtomicBoolean enabled = new AtomicBoolean(false);
    private final Map<String, AtomicBoolean> symbolKillSwitches =
        new ConcurrentHashMap<>();

    // Reasons for activation
    private volatile String activationReason;
    private volatile Instant activatedAt;

    public void activate(String reason) {
        enabled.set(true);
        activationReason = reason;
        activatedAt = Instant.now();

        // Cancel all working orders
        cancelAllOrders();

        // Alert
        sendCriticalAlert("KILL SWITCH ACTIVATED: " + reason);

        // Log
        auditLog.critical("Kill switch activated", reason);
    }

    public void deactivate(String approver) {
        enabled.set(false);

        auditLog.info("Kill switch deactivated by " + approver);
        sendAlert("Kill switch deactivated");
    }

    public void activateForSymbol(String symbol, String reason) {
        symbolKillSwitches.computeIfAbsent(symbol, k -> new AtomicBoolean())
            .set(true);

        cancelOrdersForSymbol(symbol);
        sendAlert("Kill switch activated for " + symbol + ": " + reason);
    }

    public boolean isActive() {
        return enabled.get();
    }

    public boolean isActiveForSymbol(String symbol) {
        AtomicBoolean symbolSwitch = symbolKillSwitches.get(symbol);
        return symbolSwitch != null && symbolSwitch.get();
    }

    private void cancelAllOrders() {
        List<Order> workingOrders = getAllWorkingOrders();

        for (Order order : workingOrders) {
            try {
                cancelOrder(order.getOrderId());
            } catch (Exception e) {
                log.error("Failed to cancel order " + order.getOrderId(), e);
            }
        }
    }

    // Automatic triggers
    public void checkAutomaticTriggers() {
        // P&L drop
        double pnl = getCurrentPnL();
        if (pnl < -5_000_000) { // -$5M
            activate("P&L dropped below -$5M: " + pnl);
        }

        // Position breach
        long maxPosition = getMaxPositionAcrossSymbols();
        if (maxPosition > 10_000_000) {
            activate("Position breach: " + maxPosition);
        }

        // Error rate
        double errorRate = getOrderErrorRate();
        if (errorRate > 0.25) { // 25% errors
            activate("High error rate: " + errorRate);
        }

        // Exchange connectivity
        if (!isExchangeConnected()) {
            activate("Exchange disconnected");
        }
    }
}
\`\`\`

**Real-Time Risk Dashboard:**

\`\`\`java
public class RiskDashboard {
    public RiskSnapshot getRiskSnapshot() {
        RiskSnapshot snapshot = new RiskSnapshot();

        // Positions
        snapshot.setNetPosition(getGlobalNetPosition());
        snapshot.setGrossPosition(getGlobalGrossPosition());
        snapshot.setTopPositions(getTopPositions(10));

        // P&L
        snapshot.setRealizedPnL(getRealizedPnL());
        snapshot.setUnrealizedPnL(getUnrealizedPnL());
        snapshot.setTotalPnL(getTotalPnL());

        // Limits
        snapshot.setPositionUtilization(getPositionUtilization());
        snapshot.setCreditUtilization(getCreditUtilization());

        // Circuit breakers
        snapshot.setCircuitBreakerState(circuitBreaker.getState());
        snapshot.setKillSwitchActive(killSwitch.isActive());

        // Metrics
        snapshot.setOrdersPerSecond(getOrderRate());
        snapshot.setRejectRate(getRejectRate());

        return snapshot;
    }

    public void publishMetrics() {
        // Real-time WebSocket updates to UI
        wsServer.broadcast("risk", getRiskSnapshot());

        // Prometheus metrics
        registry.gauge("risk.pnl.total", getTotalPnL());
        registry.gauge("risk.position.net", getGlobalNetPosition());
        registry.gauge("risk.reject.rate", getRejectRate());
    }
}
\`\`\`

**Performance:**
- Risk check latency: 1-10 microseconds
- Circuit breaker overhead: < 100 nanoseconds
- Kill switch activation: < 1 millisecond`
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
                    whiteSpace: 'pre-wrap',
                    textAlign: 'left'
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

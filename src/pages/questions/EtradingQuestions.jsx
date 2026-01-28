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

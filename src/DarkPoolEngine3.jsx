import { useState, useEffect } from 'react'

// Simple syntax highlighter for Java code
const SyntaxHighlighter = ({ code }) => {
  const highlightJava = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    // Protect comments
    highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    // Protect strings
    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    // Apply syntax highlighting
    highlighted = highlighted
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null|enum)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ArrayList|HashMap|Optional|Stream|Exception|RuntimeException|LocalDate|LocalDateTime|UUID|BigDecimal)\b/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')
      .replace(/\b(\d+\.?\d*[fLdD]?)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/\b([a-z_]\w*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')

    protectedContent.forEach(({ id, replacement }) => {
      highlighted = highlighted.replace(id, replacement)
    })

    return highlighted
  }

  return (
    <pre style={{
      margin: 0,
      fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
      fontSize: '0.85rem',
      lineHeight: '1.6',
      color: '#d4d4d4',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word'
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightJava(code) }} />
    </pre>
  )
}

function DarkPoolEngine3({ onBack }) {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedTopic) {
          setSelectedTopic(null)
        } else {
          onBack()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedTopic, onBack])

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  // Parse code into sections
  const parseCodeSections = (code) => {
    const sections = []
    const lines = code.split('\n')
    let currentSection = null
    let currentCode = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      // Check for section headers (lines with ═ and ✦)
      if (line.includes('═══════') && lines[i + 1]?.includes('✦')) {
        // Save previous section
        if (currentSection) {
          sections.push({
            title: currentSection,
            code: currentCode.join('\n')
          })
        }
        // Start new section
        const titleLine = lines[i + 1]
        currentSection = titleLine.replace(/\/\/\s*✦\s*/g, '').trim()
        currentCode = []
        continue
      }

      // Skip separator lines
      if (line.includes('═══════')) {
        continue
      }

      // Add code to current section
      if (currentSection) {
        currentCode.push(line)
      }
    }

    // Add last section
    if (currentSection && currentCode.length > 0) {
      sections.push({
        title: currentSection,
        code: currentCode.join('\n')
      })
    }

    return sections
  }

  const topics = [
    {
      id: 0,
      title: '🏗️ Technical Architecture',
      color: '#6366f1',
      description: 'Complete dark pool matching engine architecture',
      diagram: () => (
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
          <svg viewBox="0 0 1200 800" style={{ width: '100%', maxWidth: '1200px', height: 'auto' }}>
            <defs>
              <linearGradient id="darkBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#1e3a8a', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#0891b2', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
              </linearGradient>
            </defs>

            {/* Layer 1: Trading Clients */}
            <rect x="50" y="20" width="1100" height="80" fill="url(#darkBlueGradient)" rx="8" />
            <text x="600" y="50" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 1: Trading Clients</text>
            <text x="275" y="75" textAnchor="middle" fill="white" fontSize="14">💻 Web Terminal</text>
            <text x="600" y="75" textAnchor="middle" fill="white" fontSize="14">📱 Mobile App</text>
            <text x="925" y="75" textAnchor="middle" fill="white" fontSize="14">🔌 FIX Gateway</text>

            {/* Layer 2: API Gateway + WebSocket */}
            <rect x="50" y="120" width="1100" height="60" fill="url(#cyanGradient)" rx="8" />
            <text x="500" y="155" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 2: API Gateway</text>
            <text x="850" y="155" textAnchor="middle" fill="white" fontSize="16">+ WebSocket</text>

            {/* Layer 3: Trading Services */}
            <rect x="50" y="200" width="1100" height="100" fill="url(#darkBlueGradient)" rx="8" />
            <text x="600" y="225" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 3: Trading Services</text>
            <text x="152" y="260" textAnchor="middle" fill="white" fontSize="12">Order Match</text>
            <text x="332" y="260" textAnchor="middle" fill="white" fontSize="12">Smart Route</text>
            <text x="512" y="260" textAnchor="middle" fill="white" fontSize="12">Liquidity</text>
            <text x="692" y="260" textAnchor="middle" fill="white" fontSize="12">Pre-Trade Risk</text>
            <text x="332" y="285" textAnchor="middle" fill="white" fontSize="12">Market Data</text>
            <text x="692" y="285" textAnchor="middle" fill="white" fontSize="12">Position Mgmt</text>

            {/* Layer 4: Kafka Streaming */}
            <rect x="50" y="320" width="1100" height="60" fill="url(#cyanGradient)" rx="8" />
            <text x="600" y="355" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 4: Kafka Streaming</text>

            {/* Layer 5: Databases */}
            <rect x="50" y="400" width="1100" height="100" fill="url(#darkBlueGradient)" rx="8" />
            <text x="600" y="425" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 5: Data Storage</text>
            <text x="180" y="455" textAnchor="middle" fill="white" fontSize="13">PostgreSQL</text>
            <text x="380" y="455" textAnchor="middle" fill="white" fontSize="13">Oracle</text>
            <text x="580" y="455" textAnchor="middle" fill="white" fontSize="13">TimescaleDB</text>
            <text x="780" y="455" textAnchor="middle" fill="white" fontSize="13">Redis</text>
            <text x="980" y="455" textAnchor="middle" fill="white" fontSize="13">Coherence</text>

            {/* Layer 6: Compliance */}
            <rect x="50" y="520" width="1100" height="60" fill="url(#cyanGradient)" rx="8" />
            <text x="600" y="555" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 6: Compliance & Audit (Reg ATS)</text>

            {/* Layer 7: Real-time Monitoring */}
            <rect x="50" y="600" width="1100" height="80" fill="url(#darkBlueGradient)" rx="8" />
            <text x="600" y="625" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 7: Real-time Monitoring</text>
            <text x="300" y="655" textAnchor="middle" fill="white" fontSize="14">⚡ Prometheus</text>
            <text x="600" y="655" textAnchor="middle" fill="white" fontSize="14">📊 Grafana</text>
            <text x="900" y="655" textAnchor="middle" fill="white" fontSize="14">🔍 Jaeger</text>

            {/* Arrows showing real-time data flow */}
            <path d="M 600 100 L 600 120" stroke="#06b6d4" strokeWidth="3" markerEnd="url(#arrowheadCyan)" />
            <path d="M 600 180 L 600 200" stroke="#06b6d4" strokeWidth="3" markerEnd="url(#arrowheadCyan)" />
            <path d="M 600 300 L 600 320" stroke="#06b6d4" strokeWidth="3" markerEnd="url(#arrowheadCyan)" />
            <path d="M 600 380 L 600 400" stroke="#06b6d4" strokeWidth="3" markerEnd="url(#arrowheadCyan)" />
            <path d="M 600 500 L 600 520" stroke="#06b6d4" strokeWidth="3" markerEnd="url(#arrowheadCyan)" />
            <path d="M 600 580 L 600 600" stroke="#06b6d4" strokeWidth="3" markerEnd="url(#arrowheadCyan)" />

            {/* FIX Protocol indicator */}
            <text x="1050" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">FIX 4.4</text>

            <defs>
              <marker id="arrowheadCyan" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#06b6d4" />
              </marker>
            </defs>
          </svg>
        </div>
      ),
      content: {
        overview: 'Advanced dark pool trading system with sophisticated order matching algorithms, smart order routing, liquidity optimization, and minimal market impact execution. Features real-time order book management, IOI processing, and regulatory compliance.',
        keyPoints: [
          'Microservices architecture with Spring Boot',
          'High-performance order matching engine',
          'Smart order routing algorithms',
          'Real-time order book management',
          'IOI (Indication of Interest) processing',
          'Market impact analysis',
          'Liquidity optimization',
          'FIX protocol integration',
          'Regulatory compliance (Reg ATS)',
          'Ultra-low latency processing'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Architecture Overview & Technology Stack
// ═══════════════════════════════════════════════════════════════════════════

/*
 * ARCHITECTURE OVERVIEW:
 * ----------------------
 * 1. Order Ingestion Layer (FIX Gateway)
 * 2. Order Validation & Risk Checks
 * 3. Matching Engine Core
 * 4. Smart Order Router
 * 5. Execution Management
 * 6. Market Data Distribution
 * 7. Regulatory Reporting
 * 8. Analytics & Monitoring
 *
 * TECHNOLOGY STACK:
 * -----------------
 * • Spring Boot 3.2 - Microservices framework
 * • Kafka - Event streaming platform
 * • Redis - In-memory order book
 * • PostgreSQL - Trade storage
 * • Chronicle Queue - Ultra-low latency messaging
 * • Hazelcast - Distributed cache
 * • QuickFIX/J - FIX protocol engine
 */

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Core Matching Engine & Order Processing
// ═══════════════════════════════════════════════════════════════════════════

@Service
@Slf4j
public class DarkPoolMatchingEngine {

    private final OrderBook orderBook;
    private final ExecutionService executionService;
    private final MarketImpactCalculator impactCalculator;
    private final LiquidityProvider liquidityProvider;

    @Async("matchingExecutor")
    public CompletableFuture<MatchResult> processOrder(Order order) {
        // Validate order
        ValidationResult validation = validateOrder(order);
        if (!validation.isValid()) {
            return CompletableFuture.completedFuture(
                MatchResult.rejected(order, validation.getReason())
            );
        }

        // Calculate market impact
        MarketImpact impact = impactCalculator.calculate(order);
        if (impact.exceedsThreshold()) {
            return routeToAlternativeVenue(order);
        }

        // Attempt matching
        return matchOrder(order);
    }

    private CompletableFuture<MatchResult> matchOrder(Order order) {
        // Lock order book for matching
        Lock lock = orderBook.getLock(order.getSymbol());
        lock.lock();
        try {
            List<Match> matches = findMatches(order);

            if (matches.isEmpty()) {
                // Add to order book
                orderBook.add(order);
                return CompletableFuture.completedFuture(
                    MatchResult.queued(order)
                );
            }

            // Execute matches
            List<Execution> executions = executionService.execute(matches);
            return CompletableFuture.completedFuture(
                MatchResult.filled(order, executions)
            );

        } finally {
            lock.unlock();
        }
    }
}

@Component
public class OrderBook {

    // Price-time priority matching
    private final ConcurrentHashMap<String, PriceLevel> buyOrders;
    private final ConcurrentHashMap<String, PriceLevel> sellOrders;
    private final ReentrantLock bookLock;

    public List<Match> findMatches(Order order) {
        List<Match> matches = new ArrayList<>();
        PriceLevel level = order.isBuy() ?
            sellOrders.get(order.getSymbol()) :
            buyOrders.get(order.getSymbol());

        if (level == null) return matches;

        BigDecimal remainingQty = order.getQuantity();

        for (Order counterOrder : level.getOrders()) {
            if (!canMatch(order, counterOrder)) continue;

            BigDecimal matchQty = remainingQty.min(
                counterOrder.getRemainingQuantity()
            );

            matches.add(new Match(
                order,
                counterOrder,
                matchQty,
                calculateMatchPrice(order, counterOrder)
            ));

            remainingQty = remainingQty.subtract(matchQty);
            if (remainingQty.compareTo(BigDecimal.ZERO) == 0) break;
        }

        return matches;
    }

    private boolean canMatch(Order order1, Order order2) {
        // Check price compatibility
        if (order1.isBuy() && order2.isSell()) {
            return order1.getPrice().compareTo(order2.getPrice()) >= 0;
        } else if (order1.isSell() && order2.isBuy()) {
            return order1.getPrice().compareTo(order2.getPrice()) <= 0;
        }
        return false;
    }

    private BigDecimal calculateMatchPrice(Order aggressor, Order passive) {
        // Passive order gets price priority
        return passive.getPrice();
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Smart Order Routing & Liquidity Optimization
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class SmartOrderRouter {

    private final List<VenueConnector> venues;
    private final LiquidityAnalyzer liquidityAnalyzer;

    public RoutingDecision route(Order order) {
        // Analyze available liquidity
        Map<Venue, LiquiditySnapshot> liquidity =
            liquidityAnalyzer.analyze(order.getSymbol());

        // Calculate optimal routing strategy
        RoutingStrategy strategy = determineStrategy(order, liquidity);

        switch (strategy.getType()) {
            case INTERNAL_ONLY:
                return RoutingDecision.internal();

            case SPLIT_ORDER:
                return splitAcrossVenues(order, liquidity);

            case SWEEP:
                return sweepVenues(order, liquidity);

            case ICEBERG:
                return createIcebergStrategy(order);

            default:
                return RoutingDecision.internal();
        }
    }

    private RoutingDecision splitAcrossVenues(
        Order order,
        Map<Venue, LiquiditySnapshot> liquidity
    ) {
        List<OrderSlice> slices = new ArrayList<>();
        BigDecimal remaining = order.getQuantity();

        // Allocate to venues based on liquidity and cost
        for (Map.Entry<Venue, LiquiditySnapshot> entry : liquidity.entrySet()) {
            Venue venue = entry.getKey();
            LiquiditySnapshot snapshot = entry.getValue();

            BigDecimal allocation = calculateAllocation(
                remaining,
                snapshot,
                venue.getFeeSchedule()
            );

            slices.add(new OrderSlice(venue, allocation, order.getPrice()));
            remaining = remaining.subtract(allocation);

            if (remaining.compareTo(BigDecimal.ZERO) == 0) break;
        }

        return RoutingDecision.split(slices);
    }
}

@Service
public class MarketImpactCalculator {

    public MarketImpact calculate(Order order) {
        // Get market data
        MarketDepth depth = getMarketDepth(order.getSymbol());
        HistoricalVolume volume = getHistoricalVolume(order.getSymbol());

        // Calculate participation rate
        BigDecimal participationRate = order.getQuantity()
            .divide(volume.getAverageDailyVolume(), 4, RoundingMode.HALF_UP);

        // Estimate price impact using Kyle's lambda model
        BigDecimal lambda = calculateLambda(depth, volume);
        BigDecimal impact = lambda.multiply(order.getQuantity());

        // Adjust for market volatility
        BigDecimal volatility = calculateVolatility(order.getSymbol());
        impact = impact.multiply(BigDecimal.ONE.add(volatility));

        return new MarketImpact(
            impact,
            participationRate,
            isAcceptable(impact, order)
        );
    }

    private BigDecimal calculateLambda(
        MarketDepth depth,
        HistoricalVolume volume
    ) {
        // Kyle's lambda: price impact per unit volume
        BigDecimal spread = depth.getBidAskSpread();
        BigDecimal dailyVolume = volume.getAverageDailyVolume();

        return spread.divide(dailyVolume.multiply(new BigDecimal("2")),
            8, RoundingMode.HALF_UP);
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ IOI Processing & Trade Negotiation
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class IOIProcessor {

    @KafkaListener(topics = "ioi-events")
    public void processIOI(IOIMessage ioi) {
        // Validate IOI
        if (!isValidIOI(ioi)) {
            log.warn("Invalid IOI received: {}", ioi);
            return;
        }

        // Match against standing orders
        List<Order> potentialMatches = findPotentialMatches(ioi);

        for (Order order : potentialMatches) {
            // Calculate match score
            double score = calculateMatchScore(ioi, order);

            if (score > MATCH_THRESHOLD) {
                // Send IOI to counterparty
                notifyCounterparty(order.getClientId(), ioi);
            }
        }
    }

    private double calculateMatchScore(IOIMessage ioi, Order order) {
        double score = 0.0;

        // Symbol match (required)
        if (!ioi.getSymbol().equals(order.getSymbol())) {
            return 0.0;
        }

        // Price compatibility
        if (isPriceCompatible(ioi, order)) {
            score += 40.0;
        }

        // Size compatibility
        double sizeMatch = calculateSizeMatch(
            ioi.getQuantity(),
            order.getQuantity()
        );
        score += sizeMatch * 30.0;

        // Timing
        if (isTimingCompatible(ioi, order)) {
            score += 20.0;
        }

        // Client preferences
        if (meetsClientPreferences(ioi, order)) {
            score += 10.0;
        }

        return score;
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Trade Execution & Settlement
// ═══════════════════════════════════════════════════════════════════════════

@Service
@Transactional
public class ExecutionService {

    private final ExecutionRepository executionRepository;
    private final KafkaTemplate<String, ExecutionReport> kafkaTemplate;

    public List<Execution> execute(List<Match> matches) {
        List<Execution> executions = new ArrayList<>();

        for (Match match : matches) {
            try {
                Execution execution = createExecution(match);

                // Persist execution
                executionRepository.save(execution);

                // Send execution reports
                sendExecutionReport(execution.getBuyOrder(), execution);
                sendExecutionReport(execution.getSellOrder(), execution);

                // Update order status
                updateOrderStatus(execution);

                executions.add(execution);

            } catch (Exception e) {
                log.error("Failed to execute match: {}", match, e);
                rollbackMatch(match);
            }
        }

        return executions;
    }

    private Execution createExecution(Match match) {
        return Execution.builder()
            .executionId(generateExecutionId())
            .buyOrder(match.getBuyOrder())
            .sellOrder(match.getSellOrder())
            .symbol(match.getSymbol())
            .quantity(match.getQuantity())
            .price(match.getPrice())
            .executionTime(Instant.now())
            .venue("DARK_POOL_3")
            .status(ExecutionStatus.FILLED)
            .build();
    }

    private void sendExecutionReport(Order order, Execution execution) {
        ExecutionReport report = ExecutionReport.builder()
            .orderId(order.getOrderId())
            .clientId(order.getClientId())
            .execType(ExecType.TRADE)
            .orderStatus(OrderStatus.FILLED)
            .lastQty(execution.getQuantity())
            .lastPx(execution.getPrice())
            .leavesQty(order.getRemainingQuantity())
            .cumQty(order.getFilledQuantity())
            .avgPx(order.getAveragePrice())
            .transactTime(execution.getExecutionTime())
            .build();

        kafkaTemplate.send("execution-reports", order.getOrderId(), report);
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Regulatory Reporting & Compliance (SEC, FINRA, CAT)
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class RegulatoryReportingService {

    // Reg ATS compliance - Rule 301(b)(5)
    @Scheduled(cron = "0 0 1 * * ?") // Daily at 1 AM
    public void generateATSReport() {
        LocalDate reportDate = LocalDate.now().minusDays(1);

        ATSReport report = ATSReport.builder()
            .reportDate(reportDate)
            .tradingVolume(calculateTradingVolume(reportDate))
            .numberOfTrades(countTrades(reportDate))
            .topSecurities(getTopSecurities(reportDate, 10))
            .participantCount(countActiveParticipants(reportDate))
            .build();

        // Submit to SEC via EDGAR
        submitToSEC(report);
    }

    // CAT (Consolidated Audit Trail) reporting
    @Async
    public void reportToCAT(Execution execution) {
        CATReport report = CATReport.builder()
            .eventType("MEOT") // Order Execution
            .symbol(execution.getSymbol())
            .orderID(execution.getBuyOrder().getOrderId())
            .quantity(execution.getQuantity())
            .price(execution.getPrice())
            .eventTimestamp(execution.getExecutionTime())
            .firmDesignatedID(execution.getBuyOrder().getClientId())
            .build();

        catReportingClient.submit(report);
    }

    // Trade reporting to FINRA
    @Async
    public void reportToFINRA(Execution execution) {
        if (requiresFINRAReporting(execution)) {
            FINRAReport report = FINRAReport.builder()
                .symbol(execution.getSymbol())
                .quantity(execution.getQuantity())
                .price(execution.getPrice())
                .tradeDate(LocalDate.now())
                .tradeTime(execution.getExecutionTime())
                .capacity("PRINCIPAL")
                .build();

            finraReportingClient.submit(report);
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ System Performance & Health Monitoring
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class PerformanceMonitor {

    private final MeterRegistry meterRegistry;

    public void recordOrderLatency(Order order, long latencyNanos) {
        Timer.builder("order.processing.latency")
            .tag("symbol", order.getSymbol())
            .tag("side", order.getSide().name())
            .register(meterRegistry)
            .record(latencyNanos, TimeUnit.NANOSECONDS);
    }

    public void recordMatchRate(String symbol, double rate) {
        Gauge.builder("matching.rate", () -> rate)
            .tag("symbol", symbol)
            .register(meterRegistry);
    }

    public void recordFillRate(double fillRate) {
        meterRegistry.gauge("order.fill.rate", fillRate);
    }

    @Scheduled(fixedRate = 1000) // Every second
    public void publishMetrics() {
        Metrics metrics = Metrics.builder()
            .ordersPerSecond(calculateOrdersPerSecond())
            .matchesPerSecond(calculateMatchesPerSecond())
            .averageLatency(calculateAverageLatency())
            .fillRate(calculateFillRate())
            .spread(calculateAverageSpread())
            .timestamp(Instant.now())
            .build();

        metricsPublisher.publish(metrics);
    }
}`
      }
    },
    {
      id: 1,
      title: '⚡ Order Types & Matching',
      color: '#10b981',
      description: 'Advanced order types and matching algorithms',
      content: {
        overview: 'Comprehensive order type support with sophisticated matching algorithms for optimal execution.',
        keyPoints: [
          'Market orders - immediate execution',
          'Limit orders - price-time priority',
          'Iceberg orders - hidden liquidity',
          'VWAP orders - volume-weighted execution',
          'TWAP orders - time-weighted execution',
          'Peg orders - dynamic pricing',
          'IOC/FOK orders - time-in-force',
          'Minimum quantity orders'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Order Matching Service & Algorithm Router
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class OrderMatchingService {

    private final OrderBook orderBook;
    private final VWAPCalculator vwapCalculator;
    private final PriceService priceService;

    public MatchResult matchOrder(Order order) {
        return switch (order.getType()) {
            case MARKET -> matchMarketOrder(order);
            case LIMIT -> matchLimitOrder(order);
            case ICEBERG -> matchIcebergOrder(order);
            case VWAP -> matchVWAPOrder(order);
            case TWAP -> matchTWAPOrder(order);
            case PEG -> matchPegOrder(order);
            case IOC -> matchIOCOrder(order);
            case FOK -> matchFOKOrder(order);
            default -> throw new UnsupportedOrderTypeException(order.getType());
        };
    }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Market & Limit Order Matching with Price-Time Priority
// ═══════════════════════════════════════════════════════════════════════════

    private MatchResult matchMarketOrder(Order order) {
        // Market orders execute immediately at best available price
        List<Order> counterOrders = orderBook.getBestOrders(
            order.getSymbol(),
            order.getSide().opposite()
        );

        if (counterOrders.isEmpty()) {
            return MatchResult.rejected(order, "No liquidity available");
        }

        return executeAgainstOrders(order, counterOrders);
    }

    private MatchResult matchLimitOrder(Order order) {
        // Price-time priority matching
        List<Order> eligibleOrders = orderBook.findEligibleOrders(
            order.getSymbol(),
            order.getSide().opposite(),
            order.getPrice()
        );

        if (eligibleOrders.isEmpty()) {
            // No matches, add to book
            orderBook.add(order);
            return MatchResult.queued(order);
        }

        // Sort by price then time
        eligibleOrders.sort(Comparator
            .comparing(Order::getPrice)
            .thenComparing(Order::getTimestamp));

        return executeAgainstOrders(order, eligibleOrders);
    }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Iceberg Order Matching with Hidden Liquidity
// ═══════════════════════════════════════════════════════════════════════════

    private MatchResult matchIcebergOrder(Order order) {
        // Only display portion is visible in order book
        IcebergOrder iceberg = (IcebergOrder) order;
        BigDecimal displayQty = iceberg.getDisplayQuantity();
        BigDecimal hiddenQty = iceberg.getHiddenQuantity();

        // Create visible order
        Order visibleOrder = Order.builder()
            .symbol(order.getSymbol())
            .side(order.getSide())
            .price(order.getPrice())
            .quantity(displayQty)
            .type(OrderType.LIMIT)
            .build();

        MatchResult result = matchLimitOrder(visibleOrder);

        if (result.isFilled() && hiddenQty.compareTo(BigDecimal.ZERO) > 0) {
            // Replenish visible quantity from hidden
            BigDecimal newDisplay = hiddenQty.min(iceberg.getDisplayQuantity());
            iceberg.setDisplayQuantity(newDisplay);
            iceberg.setHiddenQuantity(hiddenQty.subtract(newDisplay));

            // Re-queue the order
            orderBook.add(iceberg);
        }

        return result;
    }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ VWAP & TWAP Algorithmic Execution Strategies
// ═══════════════════════════════════════════════════════════════════════════

    private MatchResult matchVWAPOrder(Order order) {
        // Volume-weighted average price execution
        VWAPOrder vwapOrder = (VWAPOrder) order;
        LocalTime startTime = vwapOrder.getStartTime();
        LocalTime endTime = vwapOrder.getEndTime();

        // Calculate target participation rate
        Duration duration = Duration.between(startTime, endTime);
        HistoricalVolume historicalVolume =
            vwapCalculator.getExpectedVolume(order.getSymbol(), duration);

        BigDecimal targetParticipation = order.getQuantity()
            .divide(historicalVolume.getExpectedVolume(), 4, RoundingMode.HALF_UP);

        // Create child orders based on volume curve
        List<Order> childOrders = createVWAPSlices(
            order,
            targetParticipation,
            duration
        );

        // Schedule child orders
        return scheduleOrders(childOrders);
    }

    private MatchResult matchTWAPOrder(Order order) {
        // Time-weighted average price execution
        TWAPOrder twapOrder = (TWAPOrder) order;
        Duration duration = Duration.between(
            twapOrder.getStartTime(),
            twapOrder.getEndTime()
        );

        // Divide equally across time intervals
        int slices = twapOrder.getNumberOfSlices();
        BigDecimal sliceQuantity = order.getQuantity()
            .divide(new BigDecimal(slices), 0, RoundingMode.HALF_UP);

        Duration interval = duration.dividedBy(slices);

        // Create equally-sized time slices
        List<Order> childOrders = new ArrayList<>();
        LocalTime currentTime = twapOrder.getStartTime();

        for (int i = 0; i < slices; i++) {
            Order childOrder = Order.builder()
                .symbol(order.getSymbol())
                .side(order.getSide())
                .price(order.getPrice())
                .quantity(sliceQuantity)
                .type(OrderType.LIMIT)
                .scheduledTime(currentTime)
                .build();

            childOrders.add(childOrder);
            currentTime = currentTime.plus(interval);
        }

        return scheduleOrders(childOrders);
    }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Advanced Order Types: Peg, IOC, and Fill-or-Kill
// ═══════════════════════════════════════════════════════════════════════════

    private MatchResult matchPegOrder(Order order) {
        // Peg order price moves with reference price
        PegOrder pegOrder = (PegOrder) order;
        BigDecimal referencePrice = getReferencePrice(
            order.getSymbol(),
            pegOrder.getPegType()
        );

        BigDecimal offset = pegOrder.getOffset();
        BigDecimal effectivePrice = referencePrice.add(offset);

        // Create limit order at calculated price
        Order limitOrder = Order.builder()
            .symbol(order.getSymbol())
            .side(order.getSide())
            .price(effectivePrice)
            .quantity(order.getQuantity())
            .type(OrderType.LIMIT)
            .build();

        return matchLimitOrder(limitOrder);
    }

    private MatchResult matchIOCOrder(Order order) {
        // Immediate or Cancel - execute immediately or cancel
        MatchResult result = matchLimitOrder(order);

        if (result.isPartiallyFilled()) {
            // Cancel unfilled portion
            BigDecimal unfilledQty = order.getQuantity()
                .subtract(result.getFilledQuantity());

            return MatchResult.partiallyCancelled(
                order,
                result.getExecutions(),
                unfilledQty
            );
        }

        return result;
    }

    private MatchResult matchFOKOrder(Order order) {
        // Fill or Kill - must fill completely or cancel
        List<Order> counterOrders = orderBook.findEligibleOrders(
            order.getSymbol(),
            order.getSide().opposite(),
            order.getPrice()
        );

        BigDecimal totalAvailable = counterOrders.stream()
            .map(Order::getQuantity)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (totalAvailable.compareTo(order.getQuantity()) < 0) {
            // Cannot fill completely, cancel
            return MatchResult.rejected(order, "Insufficient liquidity for FOK");
        }

        // Can fill completely
        return executeAgainstOrders(order, counterOrders);
    }

    private BigDecimal getReferencePrice(String symbol, PegType pegType) {
        return switch (pegType) {
            case PRIMARY_PEG -> priceService.getNBBO(symbol).getMidPrice();
            case MARKET_PEG -> priceService.getLastTrade(symbol).getPrice();
            case MIDPOINT_PEG -> priceService.getNBBO(symbol).getMidPrice();
            case OPENING_PEG -> priceService.getOpeningPrice(symbol);
        };
    }
}`
      }
    },
    {
      id: 2,
      title: '🔐 FIX Protocol Gateway',
      color: '#8b5cf6',
      description: 'FIX protocol integration for order routing',
      content: {
        overview: 'High-performance FIX protocol gateway for institutional order flow with support for FIX 4.2, 4.4, and 5.0.',
        keyPoints: [
          'QuickFIX/J integration',
          'Session management and recovery',
          'Message validation and parsing',
          'Order entry and execution reports',
          'Market data distribution',
          'Drop copy support',
          'Sequence number management',
          'Heartbeat and test requests'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ FIX Protocol Gateway Session Management
// ═══════════════════════════════════════════════════════════════════════════

@Service
@Slf4j
public class FIXGateway extends MessageCracker implements Application {

    private final OrderService orderService;
    private final SessionManager sessionManager;
    private final Map<String, Session> activeSessions = new ConcurrentHashMap<>();

    @Override
    public void onCreate(SessionID sessionID) {
        log.info("FIX session created: {}", sessionID);
        sessionManager.registerSession(sessionID);
    }

    @Override
    public void onLogon(SessionID sessionID) {
        log.info("FIX logon: {}", sessionID);
        activeSessions.put(sessionID.toString(), Session.lookupSession(sessionID));

        // Send initial heartbeat
        sendHeartbeat(sessionID);
    }

    @Override
    public void onLogout(SessionID sessionID) {
        log.info("FIX logout: {}", sessionID);
        activeSessions.remove(sessionID.toString());
    }

    @Override
    public void toApp(Message message, SessionID sessionID)
            throws DoNotSend {
        log.debug("Sending message: {} to session: {}", message, sessionID);
    }

    @Override
    public void fromApp(Message message, SessionID sessionID)
            throws FieldNotFound, IncorrectDataFormat,
                   IncorrectTagValue, UnsupportedMessageType {
        crack(message, sessionID);
    }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ New Order Single Handler (FIX Message Type 35=D)
// ═══════════════════════════════════════════════════════════════════════════

    @Handler
    public void onMessage(NewOrderSingle message, SessionID sessionID)
            throws FieldNotFound {

        String clOrdID = message.getClOrdID().getValue();
        String symbol = message.getSymbol().getValue();
        char side = message.getSide().getValue();
        char ordType = message.getOrdType().getValue();

        try {
            // Build internal order
            Order order = Order.builder()
                .clientOrderId(clOrdID)
                .symbol(symbol)
                .side(convertSide(side))
                .type(convertOrderType(ordType))
                .quantity(message.getOrderQty().getValue())
                .price(ordType == OrdType.LIMIT ?
                    message.getPrice().getValue() : null)
                .timeInForce(convertTimeInForce(
                    message.getTimeInForce().getValue()))
                .sessionId(sessionID.toString())
                .build();

            // Validate order
            ValidationResult validation = orderService.validate(order);
            if (!validation.isValid()) {
                sendOrderReject(sessionID, clOrdID, validation.getReason());
                return;
            }

            // Send acknowledgment
            sendExecutionReport(sessionID, order, ExecType.NEW,
                OrdStatus.NEW, "Order accepted");

            // Submit to matching engine
            orderService.submit(order)
                .thenAccept(result -> handleOrderResult(sessionID, order, result))
                .exceptionally(ex -> {
                    sendOrderReject(sessionID, clOrdID, ex.getMessage());
                    return null;
                });

        } catch (Exception e) {
            log.error("Error processing new order: {}", clOrdID, e);
            sendOrderReject(sessionID, clOrdID, e.getMessage());
        }
    }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Order Cancel & Replace Handlers (FIX Messages 35=F, 35=G)
// ═══════════════════════════════════════════════════════════════════════════

    @Handler
    public void onMessage(OrderCancelRequest message, SessionID sessionID)
            throws FieldNotFound {

        String origClOrdID = message.getOrigClOrdID().getValue();
        String clOrdID = message.getClOrdID().getValue();
        String symbol = message.getSymbol().getValue();

        try {
            // Cancel order
            CancelResult result = orderService.cancel(origClOrdID);

            if (result.isSuccess()) {
                sendCancelConfirmation(sessionID, origClOrdID, clOrdID);
            } else {
                sendCancelReject(sessionID, origClOrdID, clOrdID,
                    result.getReason());
            }

        } catch (Exception e) {
            log.error("Error canceling order: {}", origClOrdID, e);
            sendCancelReject(sessionID, origClOrdID, clOrdID, e.getMessage());
        }
    }

    @Handler
    public void onMessage(OrderCancelReplaceRequest message, SessionID sessionID)
            throws FieldNotFound {

        String origClOrdID = message.getOrigClOrdID().getValue();
        String clOrdID = message.getClOrdID().getValue();

        try {
            // Build replacement order
            Order replacement = Order.builder()
                .clientOrderId(clOrdID)
                .symbol(message.getSymbol().getValue())
                .quantity(message.getOrderQty().getValue())
                .price(message.getPrice().getValue())
                .build();

            // Replace order
            ReplaceResult result = orderService.replace(origClOrdID, replacement);

            if (result.isSuccess()) {
                sendExecutionReport(sessionID, replacement,
                    ExecType.REPLACED, OrdStatus.REPLACED,
                    "Order replaced");
            } else {
                sendCancelReject(sessionID, origClOrdID, clOrdID,
                    result.getReason());
            }

        } catch (Exception e) {
            log.error("Error replacing order: {}", origClOrdID, e);
            sendCancelReject(sessionID, origClOrdID, clOrdID, e.getMessage());
        }
    }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Execution Report Generator (FIX Message Type 35=8)
// ═══════════════════════════════════════════════════════════════════════════

    private void sendExecutionReport(
        SessionID sessionID,
        Order order,
        char execType,
        char ordStatus,
        String text
    ) {
        try {
            ExecutionReport report = new ExecutionReport(
                new OrderID(order.getOrderId()),
                new ExecID(generateExecId()),
                new ExecType(execType),
                new OrdStatus(ordStatus),
                new Side(convertSide(order.getSide())),
                new LeavesQty(order.getRemainingQuantity()),
                new CumQty(order.getFilledQuantity()),
                new AvgPx(order.getAveragePrice())
            );

            report.set(new ClOrdID(order.getClientOrderId()));
            report.set(new Symbol(order.getSymbol()));
            report.set(new OrderQty(order.getQuantity()));
            report.set(new LastQty(BigDecimal.ZERO));
            report.set(new LastPx(BigDecimal.ZERO));
            report.set(new TransactTime(LocalDateTime.now()));
            report.set(new Text(text));

            Session.sendToTarget(report, sessionID);

        } catch (SessionNotFound e) {
            log.error("Session not found: {}", sessionID, e);
        }
    }

    private void sendExecutionReportFill(
        SessionID sessionID,
        Order order,
        Execution execution
    ) {
        try {
            ExecutionReport report = new ExecutionReport(
                new OrderID(order.getOrderId()),
                new ExecID(execution.getExecutionId()),
                new ExecType(ExecType.TRADE),
                new OrdStatus(order.isFullyFilled() ?
                    OrdStatus.FILLED : OrdStatus.PARTIALLY_FILLED),
                new Side(convertSide(order.getSide())),
                new LeavesQty(order.getRemainingQuantity()),
                new CumQty(order.getFilledQuantity()),
                new AvgPx(order.getAveragePrice())
            );

            report.set(new ClOrdID(order.getClientOrderId()));
            report.set(new Symbol(order.getSymbol()));
            report.set(new OrderQty(order.getQuantity()));
            report.set(new LastQty(execution.getQuantity()));
            report.set(new LastPx(execution.getPrice()));
            report.set(new TransactTime(execution.getExecutionTime()));

            Session.sendToTarget(report, sessionID);

        } catch (SessionNotFound e) {
            log.error("Session not found: {}", sessionID, e);
        }
    }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Order Rejection & Result Handling
// ═══════════════════════════════════════════════════════════════════════════

    private void sendOrderReject(
        SessionID sessionID,
        String clOrdID,
        String reason
    ) {
        try {
            ExecutionReport reject = new ExecutionReport(
                new OrderID("NONE"),
                new ExecID(generateExecId()),
                new ExecType(ExecType.REJECTED),
                new OrdStatus(OrdStatus.REJECTED),
                new Side(Side.BUY),
                new LeavesQty(BigDecimal.ZERO),
                new CumQty(BigDecimal.ZERO),
                new AvgPx(BigDecimal.ZERO)
            );

            reject.set(new ClOrdID(clOrdID));
            reject.set(new Text(reason));
            reject.set(new TransactTime(LocalDateTime.now()));

            Session.sendToTarget(reject, sessionID);

        } catch (SessionNotFound e) {
            log.error("Session not found: {}", sessionID, e);
        }
    }

    private void handleOrderResult(
        SessionID sessionID,
        Order order,
        OrderResult result
    ) {
        if (result.isFullyFilled() || result.isPartiallyFilled()) {
            for (Execution execution : result.getExecutions()) {
                sendExecutionReportFill(sessionID, order, execution);
            }
        }
    }

    private String generateExecId() {
        return "EXEC" + System.nanoTime();
    }
}`
      }
    },
    {
      id: 3,
      title: '📊 Liquidity Analysis',
      color: '#f59e0b',
      description: 'Real-time liquidity monitoring and optimization',
      content: {
        overview: 'Advanced liquidity analysis engine for monitoring market depth, detecting liquidity patterns, and optimizing order placement.',
        keyPoints: [
          'Real-time order book depth analysis',
          'Liquidity heatmap generation',
          'Hidden liquidity detection',
          'Optimal execution timing',
          'Volume profile analysis',
          'Spread analysis and prediction',
          'Liquidity cost estimation',
          'Cross-venue liquidity aggregation'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Real-Time Liquidity Monitoring & Snapshot Generation
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class LiquidityAnalysisEngine {

    private final MarketDataService marketDataService;
    private final RedisTemplate<String, LiquiditySnapshot> redisTemplate;

    @Scheduled(fixedRate = 100) // Every 100ms
    public void analyzeLiquidity() {
        List<String> activeSymbols = getActiveSymbols();

        for (String symbol : activeSymbols) {
            LiquiditySnapshot snapshot = calculateLiquiditySnapshot(symbol);
            publishSnapshot(snapshot);
            cacheSnapshot(symbol, snapshot);
        }
    }

    private LiquiditySnapshot calculateLiquiditySnapshot(String symbol) {
        OrderBook orderBook = marketDataService.getOrderBook(symbol);

        return LiquiditySnapshot.builder()
            .symbol(symbol)
            .timestamp(Instant.now())
            .bidDepth(calculateDepth(orderBook.getBids()))
            .askDepth(calculateDepth(orderBook.getAsks()))
            .spread(calculateSpread(orderBook))
            .imbalance(calculateImbalance(orderBook))
            .depthProfile(generateDepthProfile(orderBook))
            .liquidityScore(calculateLiquidityScore(orderBook))
            .build();
    }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Market Depth Calculation & Order Book Imbalance
// ═══════════════════════════════════════════════════════════════════════════

    private Map<BigDecimal, BigDecimal> calculateDepth(List<PriceLevel> levels) {
        Map<BigDecimal, BigDecimal> depth = new TreeMap<>();
        BigDecimal cumulative = BigDecimal.ZERO;

        for (PriceLevel level : levels) {
            cumulative = cumulative.add(level.getQuantity());
            depth.put(level.getPrice(), cumulative);
        }

        return depth;
    }

    private BigDecimal calculateSpread(OrderBook orderBook) {
        BigDecimal bestBid = orderBook.getBestBid().getPrice();
        BigDecimal bestAsk = orderBook.getBestAsk().getPrice();
        return bestAsk.subtract(bestBid);
    }

    private BigDecimal calculateImbalance(OrderBook orderBook) {
        BigDecimal bidVolume = orderBook.getBids().stream()
            .map(PriceLevel::getQuantity)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal askVolume = orderBook.getAsks().stream()
            .map(PriceLevel::getQuantity)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal total = bidVolume.add(askVolume);
        if (total.compareTo(BigDecimal.ZERO) == 0) return BigDecimal.ZERO;

        return bidVolume.subtract(askVolume).divide(total, 4, RoundingMode.HALF_UP);
    }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Optimal Execution Timing Analysis
// ═══════════════════════════════════════════════════════════════════════════

    public OptimalExecutionTime findOptimalExecutionTime(Order order) {
        String symbol = order.getSymbol();
        List<LiquiditySnapshot> historical = getHistoricalSnapshots(symbol,
            Duration.ofHours(1));

        // Analyze liquidity patterns
        Map<LocalTime, BigDecimal> liquidityByTime = new HashMap<>();
        Map<LocalTime, BigDecimal> spreadByTime = new HashMap<>();

        for (LiquiditySnapshot snapshot : historical) {
            LocalTime time = snapshot.getTimestamp().atZone(ZoneId.systemDefault())
                .toLocalTime();
            LocalTime bucket = time.withMinute((time.getMinute() / 5) * 5)
                .withSecond(0).withNano(0);

            liquidityByTime.merge(bucket, snapshot.getLiquidityScore(),
                BigDecimal::add);
            spreadByTime.merge(bucket, snapshot.getSpread(),
                BigDecimal::add);
        }

        // Find optimal time window
        LocalTime optimalTime = liquidityByTime.entrySet().stream()
            .max(Comparator.comparing(entry ->
                entry.getValue().divide(spreadByTime.get(entry.getKey()),
                    4, RoundingMode.HALF_UP)))
            .map(Map.Entry::getKey)
            .orElse(LocalTime.now());

        return OptimalExecutionTime.builder()
            .time(optimalTime)
            .expectedLiquidity(liquidityByTime.get(optimalTime))
            .expectedSpread(spreadByTime.get(optimalTime))
            .confidence(calculateConfidence(historical))
            .build();
    }
}`
      }
    },
    {
      id: 4,
      title: '🎯 Pre-Trade Risk Controls',
      color: '#ef4444',
      description: 'Comprehensive pre-trade risk management',
      content: {
        overview: 'Real-time pre-trade risk controls to prevent erroneous orders and ensure compliance with risk limits.',
        keyPoints: [
          'Order size limits',
          'Price collar checks',
          'Position limit enforcement',
          'Concentration risk monitoring',
          'Credit limit checks',
          'Self-trade prevention',
          'Duplicate order detection',
          'Market manipulation detection'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Pre-Trade Risk Validation Framework
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class PreTradeRiskService {

    private final RiskLimitRepository riskLimitRepository;
    private final PositionService positionService;
    private final MarketDataService marketDataService;

    public ValidationResult validate(Order order) {
        List<RiskCheck> checks = List.of(
            this::checkOrderSize,
            this::checkPriceCollar,
            this::checkPositionLimit,
            this::checkCreditLimit,
            this::checkSelfTrade,
            this::checkDuplicateOrder,
            this::checkManipulation
        );

        for (RiskCheck check : checks) {
            ValidationResult result = check.validate(order);
            if (!result.isValid()) {
                return result;
            }
        }

        return ValidationResult.valid();
    }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Order Size & Price Collar Validation
// ═══════════════════════════════════════════════════════════════════════════

    private ValidationResult checkOrderSize(Order order) {
        RiskLimits limits = riskLimitRepository.findByClientId(
            order.getClientId());

        if (order.getQuantity().compareTo(limits.getMaxOrderSize()) > 0) {
            return ValidationResult.invalid(
                "Order size exceeds maximum: " + limits.getMaxOrderSize()
            );
        }

        BigDecimal notionalValue = order.getQuantity()
            .multiply(order.getPrice() != null ?
                order.getPrice() : getCurrentPrice(order.getSymbol()));

        if (notionalValue.compareTo(limits.getMaxNotional()) > 0) {
            return ValidationResult.invalid(
                "Order notional exceeds maximum: " + limits.getMaxNotional()
            );
        }

        return ValidationResult.valid();
    }

    private ValidationResult checkPriceCollar(Order order) {
        if (order.getType() == OrderType.MARKET) {
            return ValidationResult.valid(); // No price to check
        }

        BigDecimal referencePrice = getCurrentPrice(order.getSymbol());
        RiskLimits limits = riskLimitRepository.findByClientId(
            order.getClientId());

        BigDecimal maxDeviation = referencePrice
            .multiply(limits.getPriceCollarPercent())
            .divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP);

        BigDecimal lowerBound = referencePrice.subtract(maxDeviation);
        BigDecimal upperBound = referencePrice.add(maxDeviation);

        if (order.getPrice().compareTo(lowerBound) < 0 ||
            order.getPrice().compareTo(upperBound) > 0) {
            return ValidationResult.invalid(
                String.format("Price %s outside collar [%s, %s]",
                    order.getPrice(), lowerBound, upperBound)
            );
        }

        return ValidationResult.valid();
    }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Position & Credit Limit Enforcement
// ═══════════════════════════════════════════════════════════════════════════

    private ValidationResult checkPositionLimit(Order order) {
        Position currentPosition = positionService.getPosition(
            order.getClientId(),
            order.getSymbol()
        );

        BigDecimal newPosition = calculateNewPosition(currentPosition, order);
        RiskLimits limits = riskLimitRepository.findByClientId(
            order.getClientId());

        if (newPosition.abs().compareTo(limits.getMaxPosition()) > 0) {
            return ValidationResult.invalid(
                "Order would exceed position limit: " + limits.getMaxPosition()
            );
        }

        return ValidationResult.valid();
    }

    private ValidationResult checkCreditLimit(Order order) {
        CreditStatus credit = getCreditStatus(order.getClientId());
        BigDecimal orderValue = order.getQuantity()
            .multiply(order.getPrice() != null ?
                order.getPrice() : getCurrentPrice(order.getSymbol()));

        BigDecimal availableCredit = credit.getTotalLimit()
            .subtract(credit.getUsedCredit());

        if (orderValue.compareTo(availableCredit) > 0) {
            return ValidationResult.invalid(
                "Insufficient credit. Available: " + availableCredit
            );
        }

        return ValidationResult.valid();
    }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Self-Trade Prevention & Duplicate Detection
// ═══════════════════════════════════════════════════════════════════════════

    private ValidationResult checkSelfTrade(Order order) {
        List<Order> counterOrders = orderBook.findOrders(
            order.getSymbol(),
            order.getSide().opposite()
        );

        boolean hasSelfTrade = counterOrders.stream()
            .anyMatch(o -> o.getClientId().equals(order.getClientId()));

        if (hasSelfTrade) {
            return ValidationResult.invalid("Self-trade detected");
        }

        return ValidationResult.valid();
    }

    private ValidationResult checkDuplicateOrder(Order order) {
        List<Order> recentOrders = getRecentOrders(
            order.getClientId(),
            Duration.ofSeconds(5)
        );

        boolean isDuplicate = recentOrders.stream()
            .anyMatch(o ->
                o.getSymbol().equals(order.getSymbol()) &&
                o.getSide().equals(order.getSide()) &&
                o.getQuantity().equals(order.getQuantity()) &&
                Objects.equals(o.getPrice(), order.getPrice())
            );

        if (isDuplicate) {
            return ValidationResult.invalid("Duplicate order detected");
        }

        return ValidationResult.valid();
    }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Market Manipulation Detection (Layering & Spoofing)
// ═══════════════════════════════════════════════════════════════════════════

    private ValidationResult checkManipulation(Order order) {
        // Check for potential layering/spoofing
        List<Order> recentOrders = getRecentOrders(
            order.getClientId(),
            Duration.ofMinutes(1)
        );

        long sameSideCount = recentOrders.stream()
            .filter(o -> o.getSymbol().equals(order.getSymbol()))
            .filter(o -> o.getSide().equals(order.getSide()))
            .count();

        if (sameSideCount > 10) {
            // Flag for review
            flagForReview(order, "Potential layering pattern");
        }

        return ValidationResult.valid();
    }
}`
      }
    },
    {
      id: 5,
      title: '📈 Performance Monitoring',
      color: '#06b6d4',
      description: 'Real-time performance metrics and monitoring',
      content: {
        overview: 'Comprehensive performance monitoring and analytics for tracking system health and trading metrics.',
        keyPoints: [
          'Order-to-execution latency tracking',
          'Fill rate monitoring',
          'Matching engine throughput',
          'Price improvement metrics',
          'Liquidity capture rate',
          'System health monitoring',
          'Alert management',
          'Real-time dashboards'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ AOP-Based Latency Monitoring
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class PerformanceMonitoringService {

    private final MeterRegistry meterRegistry;
    private final MetricsPublisher metricsPublisher;

    @Aspect
    @Component
    public static class LatencyMonitor {

        @Around("execution(* com.darkpool.matching.*.*(..))")
        public Object monitorLatency(ProceedingJoinPoint joinPoint)
                throws Throwable {
            long startTime = System.nanoTime();

            try {
                return joinPoint.proceed();
            } finally {
                long duration = System.nanoTime() - startTime;
                recordLatency(joinPoint.getSignature().getName(), duration);
            }
        }

        private void recordLatency(String operation, long nanos) {
            Timer.builder("operation.latency")
                .tag("operation", operation)
                .register(meterRegistry)
                .record(nanos, TimeUnit.NANOSECONDS);
        }
    }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Real-Time Performance Metrics Calculation
// ═══════════════════════════════════════════════════════════════════════════

    @Scheduled(fixedRate = 1000)
    public void calculateMetrics() {
        PerformanceMetrics metrics = PerformanceMetrics.builder()
            .timestamp(Instant.now())
            .ordersPerSecond(calculateOrderRate())
            .matchesPerSecond(calculateMatchRate())
            .fillRate(calculateFillRate())
            .averageLatency(calculateAverageLatency())
            .p50Latency(calculatePercentileLatency(0.5))
            .p95Latency(calculatePercentileLatency(0.95))
            .p99Latency(calculatePercentileLatency(0.99))
            .priceImprovement(calculatePriceImprovement())
            .build();

        metricsPublisher.publish(metrics);
        checkAlerts(metrics);
    }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Performance Alert & Threshold Monitoring
// ═══════════════════════════════════════════════════════════════════════════

    private void checkAlerts(PerformanceMetrics metrics) {
        if (metrics.getP99Latency() > Duration.ofMillis(10)) {
            alertService.alert(Alert.builder()
                .severity(Severity.WARNING)
                .message("P99 latency exceeds 10ms")
                .metric("p99_latency")
                .value(metrics.getP99Latency().toNanos())
                .build());
        }

        if (metrics.getFillRate() < 0.80) {
            alertService.alert(Alert.builder()
                .severity(Severity.WARNING)
                .message("Fill rate below 80%")
                .metric("fill_rate")
                .value(metrics.getFillRate())
                .build());
        }
    }
}`
      }
    },
    {
      id: 6,
      title: '🔄 Event Streaming',
      color: '#ec4899',
      description: 'Kafka-based event streaming architecture',
      content: {
        overview: 'High-throughput event streaming for order flow, executions, and market data distribution.',
        keyPoints: [
          'Order event streaming',
          'Execution report distribution',
          'Market data fan-out',
          'Audit trail logging',
          'Event sourcing pattern',
          'CQRS implementation',
          'Real-time analytics',
          'Replay capabilities'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Kafka Topic Configuration & Partitioning
// ═══════════════════════════════════════════════════════════════════════════

@Configuration
public class KafkaConfiguration {

    @Bean
    public NewTopic orderEventsTopic() {
        return TopicBuilder.name("order-events")
            .partitions(10)
            .replicas(3)
            .config("retention.ms", "86400000") // 1 day
            .config("compression.type", "lz4")
            .build();
    }

    @Bean
    public NewTopic executionReportsTopic() {
        return TopicBuilder.name("execution-reports")
            .partitions(10)
            .replicas(3)
            .build();
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Order Event Producer & Publishing
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class OrderEventProducer {

    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;

    public void publishOrderEvent(Order order, OrderEventType eventType) {
        OrderEvent event = OrderEvent.builder()
            .orderId(order.getOrderId())
            .clientId(order.getClientId())
            .symbol(order.getSymbol())
            .side(order.getSide())
            .quantity(order.getQuantity())
            .price(order.getPrice())
            .eventType(eventType)
            .timestamp(Instant.now())
            .build();

        kafkaTemplate.send("order-events", order.getSymbol(), event);
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Execution Report Consumer & Position Updates
// ═══════════════════════════════════════════════════════════════════════════

@Service
public class ExecutionReportConsumer {

    @KafkaListener(
        topics = "execution-reports",
        groupId = "position-service",
        concurrency = "3"
    )
    public void consumeExecution(ExecutionReport report) {
        positionService.updatePosition(report);
    }
}`
      }
    }
  ]

  const renderTopicContent = (topic) => {
    const codeSections = parseCodeSections(topic.content.codeExample)

    return (
      <div style={{
        padding: '2rem',
        maxWidth: '1600px',
        margin: '0 auto',
        backgroundColor: '#f9fafb',
        minHeight: '100vh'
      }}>
        {/* Back button */}
        <button
          onClick={() => setSelectedTopic(null)}
          style={{
            padding: '0.875rem 1.75rem',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: 'white',
            color: '#374151',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            cursor: 'pointer',
            marginBottom: '2rem',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#f9fafb'
            e.target.style.borderColor = topic.color
            e.target.style.transform = 'translateX(-4px)'
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'white'
            e.target.style.borderColor = '#e5e7eb'
            e.target.style.transform = 'translateX(0)'
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>←</span>
          <span>Back to Topics</span>
        </button>

        {/* Two-column layout: Sidebar + Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: '2rem'
        }}>
          {/* Left sidebar - Topic list */}
          <div style={{ position: 'sticky', top: '2rem', height: 'fit-content' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Dark Pool Topics
            </h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {topics.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTopic(t.id)}
                  style={{
                    backgroundColor: selectedTopic === t.id ? `${t.color}15` : 'white',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: selectedTopic === t.id ? `3px solid ${t.color}` : '2px solid #e5e7eb',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    if (selectedTopic !== t.id) {
                      e.currentTarget.style.backgroundColor = '#f9fafb'
                      e.currentTarget.style.borderColor = t.color
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedTopic !== t.id) {
                      e.currentTarget.style.backgroundColor = 'white'
                      e.currentTarget.style.borderColor = '#e5e7eb'
                    }
                  }}
                >
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: selectedTopic === t.id ? t.color : '#374151',
                    marginBottom: '0.25rem'
                  }}>
                    {t.title}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#6b7280',
                    lineHeight: '1.3'
                  }}>
                    {t.description.substring(0, 60)}...
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right content area */}
          <div>

        {/* Topic header */}
        <div style={{
          background: `linear-gradient(135deg, ${topic.color} 0%, ${topic.color}dd 100%)`,
          color: 'white',
          padding: '2.5rem',
          borderRadius: '16px',
          marginBottom: '2rem',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translate(30%, -30%)'
          }} />
          <h2 style={{
            margin: 0,
            fontSize: '2.5rem',
            fontWeight: '800',
            marginBottom: '0.75rem',
            position: 'relative',
            zIndex: 1
          }}>
            {topic.title}
          </h2>
          <p style={{
            margin: 0,
            fontSize: '1.2rem',
            opacity: 0.95,
            position: 'relative',
            zIndex: 1,
            fontWeight: '400'
          }}>
            {topic.description}
          </p>
        </div>

        {/* Diagram */}
        {topic.diagram && topic.diagram()}

        {/* Overview card */}
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: topic.color
            }} />
            <h3 style={{
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937'
            }}>
              Overview
            </h3>
          </div>
          <p style={{
            margin: 0,
            fontSize: '1.05rem',
            lineHeight: '1.7',
            color: '#4b5563'
          }}>
            {topic.content.overview}
          </p>
        </div>

        {/* Key Features grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {topic.content.keyPoints.map((point, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '1.25rem',
                transition: 'all 0.2s ease',
                cursor: 'default',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = topic.color
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = `0 8px 16px -4px ${topic.color}40`
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}>
                <div style={{
                  flexShrink: 0,
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  backgroundColor: `${topic.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: topic.color,
                  fontWeight: '700',
                  fontSize: '0.875rem'
                }}>
                  {index + 1}
                </div>
                <p style={{
                  margin: 0,
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  color: '#374151',
                  fontWeight: '500'
                }}>
                  {point}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Implementation sections */}
        <div style={{
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: topic.color
            }} />
            <h3 style={{
              margin: 0,
              fontSize: '1.75rem',
              fontWeight: '700',
              color: '#1f2937'
            }}>
              Implementation Details
            </h3>
          </div>

          {codeSections.map((section, index) => {
            const sectionId = `section-${index}`
            const isExpanded = expandedSections[sectionId]

            return (
              <div
                key={index}
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  marginBottom: '1rem',
                  overflow: 'hidden',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Section header - clickable */}
                <div
                  onClick={() => toggleSection(sectionId)}
                  style={{
                    padding: '1.25rem 1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: isExpanded ? `${topic.color}08` : 'white',
                    transition: 'all 0.2s ease',
                    borderBottom: isExpanded ? `2px solid ${topic.color}20` : 'none'
                  }}
                  onMouseOver={(e) => {
                    if (!isExpanded) {
                      e.currentTarget.style.backgroundColor = '#f9fafb'
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isExpanded) {
                      e.currentTarget.style.backgroundColor = 'white'
                    }
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: `${topic.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: topic.color,
                      fontWeight: '700',
                      fontSize: '1rem'
                    }}>
                      {index + 1}
                    </div>
                    <h4 style={{
                      margin: 0,
                      fontSize: '1.15rem',
                      fontWeight: '600',
                      color: '#1f2937'
                    }}>
                      {section.title}
                    </h4>
                  </div>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: isExpanded ? topic.color : '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    color: isExpanded ? 'white' : '#6b7280',
                    fontSize: '1.25rem',
                    fontWeight: '700'
                  }}>
                    {isExpanded ? '−' : '+'}
                  </div>
                </div>

                {/* Section content - expandable */}
                {isExpanded && (
                  <div style={{
                    backgroundColor: '#1e1e1e',
                    padding: '1.5rem',
                    overflow: 'auto'
                  }}>
                    <SyntaxHighlighter code={section.code} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Expand/Collapse all button */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <button
            onClick={() => {
              const allExpanded = {}
              codeSections.forEach((_, index) => {
                allExpanded[`section-${index}`] = true
              })
              setExpandedSections(allExpanded)
            }}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '0.95rem',
              fontWeight: '600',
              backgroundColor: topic.color,
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: `0 4px 12px -2px ${topic.color}60`
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = `0 6px 16px -2px ${topic.color}80`
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = `0 4px 12px -2px ${topic.color}60`
            }}
          >
            Expand All
          </button>
          <button
            onClick={() => setExpandedSections({})}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '0.95rem',
              fontWeight: '600',
              backgroundColor: 'white',
              color: '#374151',
              border: '2px solid #e5e7eb',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#f9fafb'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'white'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            Collapse All
          </button>
        </div>
          </div>
        </div>
      </div>
    )
  }

  if (selectedTopic !== null) {
    const topic = topics.find(t => t.id === selectedTopic)
    return renderTopicContent(topic)
  }

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          fontWeight: '600',
          backgroundColor: '#f3f4f6',
          color: '#374151',
          border: '2px solid #e5e7eb',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '2rem',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#e5e7eb'
          e.target.style.transform = 'translateY(-2px)'
          e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)'
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#f3f4f6'
          e.target.style.transform = 'translateY(0)'
          e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      >
        ← Back to Menu
      </button>

      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          margin: 0,
          fontSize: '2.5rem',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          🌊 Dark Pool Engine 3
        </h1>
        <p style={{
          margin: 0,
          fontSize: '1.2rem',
          color: '#6b7280'
        }}>
          Advanced Alternative Trading System
        </p>
      </div>

      {/* Topic cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem'
      }}>
        {topics.map((topic) => (
          <div
            key={topic.id}
            onClick={() => setSelectedTopic(topic.id)}
            style={{
              backgroundColor: 'white',
              border: `3px solid ${topic.color}`,
              borderRadius: '12px',
              padding: '1.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = `0 12px 24px ${topic.color}40`
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            <h3 style={{
              margin: '0 0 0.75rem 0',
              fontSize: '1.5rem',
              fontWeight: '700',
              color: topic.color
            }}>
              {topic.title}
            </h3>
            <p style={{
              margin: 0,
              fontSize: '1rem',
              color: '#6b7280',
              lineHeight: '1.5'
            }}>
              {topic.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DarkPoolEngine3

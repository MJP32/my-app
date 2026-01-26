import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { useTheme } from '../../contexts/ThemeContext'

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
    <pre className="m-0 font-mono text-sm leading-relaxed text-gray-300 whitespace-pre-wrap break-words">
      <code dangerouslySetInnerHTML={{ __html: highlightJava(code) }} />
    </pre>
  )
}

export default function DarkPoolEngine3({ onBack, breadcrumb }) {
  const { colors } = useTheme()
  const [activeTab, setActiveTab] = useState('architecture')
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const tabs = [
    { id: 'architecture', label: '🏗️ Architecture', icon: '🏗️' },
    { id: 'matching', label: '⚡ Order Matching', icon: '⚡' },
    { id: 'fix', label: '🔐 FIX Protocol', icon: '🔐' },
    { id: 'liquidity', label: '📊 Liquidity', icon: '📊' },
    { id: 'risk', label: '🎯 Risk Controls', icon: '🎯' },
    { id: 'performance', label: '📈 Performance', icon: '📈' },
    { id: 'streaming', label: '🔄 Event Streaming', icon: '🔄' }
  ]

  // Parse code into sections
  const parseCodeSections = (code) => {
    const sections = []
    const lines = code.split('\n')
    let currentSection = null
    let currentCode = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (line.includes('═══════') && lines[i + 1]?.includes('✦')) {
        if (currentSection) {
          sections.push({
            title: currentSection,
            code: currentCode.join('\n')
          })
        }
        const titleLine = lines[i + 1]
        currentSection = titleLine.replace(/\/\/\s*✦\s*/g, '').trim()
        currentCode = []
        continue
      }

      if (line.includes('═══════')) {
        continue
      }

      if (currentSection) {
        currentCode.push(line)
      }
    }

    if (currentSection && currentCode.length > 0) {
      sections.push({
        title: currentSection,
        code: currentCode.join('\n')
      })
    }

    return sections
  }

  const renderArchitecture = () => (
    <div className="space-y-8">
      {/* Architecture Diagram */}
      <div className="flex justify-center mb-8">
        <svg viewBox="0 0 1200 800" className="w-full max-w-6xl h-auto">
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

          <rect x="50" y="20" width="1100" height="80" fill="url(#darkBlueGradient)" rx="8" />
          <text x="600" y="50" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 1: Trading Clients</text>
          <text x="275" y="75" textAnchor="middle" fill="white" fontSize="14">💻 Web Terminal</text>
          <text x="600" y="75" textAnchor="middle" fill="white" fontSize="14">📱 Mobile App</text>
          <text x="925" y="75" textAnchor="middle" fill="white" fontSize="14">🔌 FIX Gateway</text>

          <rect x="50" y="120" width="1100" height="60" fill="url(#cyanGradient)" rx="8" />
          <text x="500" y="155" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 2: API Gateway</text>
          <text x="850" y="155" textAnchor="middle" fill="white" fontSize="16">+ WebSocket</text>

          <rect x="50" y="200" width="1100" height="100" fill="url(#darkBlueGradient)" rx="8" />
          <text x="600" y="225" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 3: Trading Services</text>
          <text x="152" y="260" textAnchor="middle" fill="white" fontSize="12">Order Match</text>
          <text x="332" y="260" textAnchor="middle" fill="white" fontSize="12">Smart Route</text>
          <text x="512" y="260" textAnchor="middle" fill="white" fontSize="12">Liquidity</text>
          <text x="692" y="260" textAnchor="middle" fill="white" fontSize="12">Pre-Trade Risk</text>
          <text x="332" y="285" textAnchor="middle" fill="white" fontSize="12">Market Data</text>
          <text x="692" y="285" textAnchor="middle" fill="white" fontSize="12">Position Mgmt</text>

          <rect x="50" y="320" width="1100" height="60" fill="url(#cyanGradient)" rx="8" />
          <text x="600" y="355" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 4: Kafka Streaming</text>

          <rect x="50" y="400" width="1100" height="100" fill="url(#darkBlueGradient)" rx="8" />
          <text x="600" y="425" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 5: Data Storage</text>
          <text x="180" y="455" textAnchor="middle" fill="white" fontSize="13">PostgreSQL</text>
          <text x="380" y="455" textAnchor="middle" fill="white" fontSize="13">Oracle</text>
          <text x="580" y="455" textAnchor="middle" fill="white" fontSize="13">TimescaleDB</text>
          <text x="780" y="455" textAnchor="middle" fill="white" fontSize="13">Redis</text>
          <text x="980" y="455" textAnchor="middle" fill="white" fontSize="13">Coherence</text>

          <rect x="50" y="520" width="1100" height="60" fill="url(#cyanGradient)" rx="8" />
          <text x="600" y="555" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">{`Layer 6: Compliance & Audit (Reg ATS)`}</text>

          <rect x="50" y="600" width="1100" height="80" fill="url(#darkBlueGradient)" rx="8" />
          <text x="600" y="625" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 7: Real-time Monitoring</text>
          <text x="300" y="655" textAnchor="middle" fill="white" fontSize="14">⚡ Prometheus</text>
          <text x="600" y="655" textAnchor="middle" fill="white" fontSize="14">📊 Grafana</text>
          <text x="900" y="655" textAnchor="middle" fill="white" fontSize="14">🔍 Jaeger</text>

          <path d="M 600 100 L 600 120" stroke="#06b6d4" strokeWidth="3" />
          <path d="M 600 180 L 600 200" stroke="#06b6d4" strokeWidth="3" />
          <path d="M 600 300 L 600 320" stroke="#06b6d4" strokeWidth="3" />
          <path d="M 600 380 L 600 400" stroke="#06b6d4" strokeWidth="3" />
          <path d="M 600 500 L 600 520" stroke="#06b6d4" strokeWidth="3" />
          <path d="M 600 580 L 600 600" stroke="#06b6d4" strokeWidth="3" />

          <text x="1050" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">FIX 4.4</text>
        </svg>
      </div>

      {/* Overview */}
      <div style={{ backgroundColor: colors.bgSecondary, borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '2rem', borderLeft: '4px solid' }} className="border-l-4 border-blue-600">
        <h3 style={{ color: colors.textPrimary }} className="text-2xl font-bold mb-4 flex items-center gap-3">
          <span className="text-3xl">🏗️</span>
          Technical Architecture
        </h3>
        <p style={{ color: colors.textSecondary }} className="text-lg leading-relaxed mb-6">
          Advanced dark pool trading system with sophisticated order matching algorithms, smart order routing,
          liquidity optimization, and minimal market impact execution. Features real-time order book management,
          IOI processing, and regulatory compliance.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {[
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
          ].map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <span className="text-blue-600 font-bold text-sm mt-0.5">{idx + 1}</span>
              <span style={{ color: colors.textPrimary }} className="text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Code */}
      {renderCodeSections(`// ═══════════════════════════════════════════════════════════════════════════
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
        ValidationResult validation = validateOrder(order);
        if (!validation.isValid()) {
            return CompletableFuture.completedFuture(
                MatchResult.rejected(order, validation.getReason())
            );
        }

        MarketImpact impact = impactCalculator.calculate(order);
        if (impact.exceedsThreshold()) {
            return routeToAlternativeVenue(order);
        }

        return matchOrder(order);
    }

    private CompletableFuture<MatchResult> matchOrder(Order order) {
        Lock lock = orderBook.getLock(order.getSymbol());
        lock.lock();
        try {
            List<Match> matches = findMatches(order);

            if (matches.isEmpty()) {
                orderBook.add(order);
                return CompletableFuture.completedFuture(
                    MatchResult.queued(order)
                );
            }

            List<Execution> executions = executionService.execute(matches);
            return CompletableFuture.completedFuture(
                MatchResult.filled(order, executions)
            );

        } finally {
            lock.unlock();
        }
    }
}`)}
    </div>
  )

  const renderMatching = () => (
    <div className="space-y-8">
      <div style={{ backgroundColor: colors.bgSecondary, borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '2rem', borderLeft: '4px solid' }} className="border-l-4 border-green-600">
        <h3 style={{ color: colors.textPrimary }} className="text-2xl font-bold mb-4 flex items-center gap-3">
          <span className="text-3xl">⚡</span>
          Order Types & Matching Algorithms
        </h3>
        <p style={{ color: colors.textSecondary }} className="text-lg leading-relaxed mb-6">
          Comprehensive order type support with sophisticated matching algorithms for optimal execution.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Market orders - immediate execution',
            'Limit orders - price-time priority',
            'Iceberg orders - hidden liquidity',
            'VWAP orders - volume-weighted execution',
            'TWAP orders - time-weighted execution',
            'Peg orders - dynamic pricing',
            'IOC/FOK orders - time-in-force',
            'Minimum quantity orders'
          ].map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <span className="text-green-600 font-bold text-sm mt-0.5">{idx + 1}</span>
              <span style={{ color: colors.textPrimary }} className="text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {renderCodeSections(`// ═══════════════════════════════════════════════════════════════════════════
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
        List<Order> eligibleOrders = orderBook.findEligibleOrders(
            order.getSymbol(),
            order.getSide().opposite(),
            order.getPrice()
        );

        if (eligibleOrders.isEmpty()) {
            orderBook.add(order);
            return MatchResult.queued(order);
        }

        eligibleOrders.sort(Comparator
            .comparing(Order::getPrice)
            .thenComparing(Order::getTimestamp));

        return executeAgainstOrders(order, eligibleOrders);
    }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ VWAP & TWAP Algorithmic Execution Strategies
// ═══════════════════════════════════════════════════════════════════════════

    private MatchResult matchVWAPOrder(Order order) {
        VWAPOrder vwapOrder = (VWAPOrder) order;
        LocalTime startTime = vwapOrder.getStartTime();
        LocalTime endTime = vwapOrder.getEndTime();

        Duration duration = Duration.between(startTime, endTime);
        HistoricalVolume historicalVolume =
            vwapCalculator.getExpectedVolume(order.getSymbol(), duration);

        BigDecimal targetParticipation = order.getQuantity()
            .divide(historicalVolume.getExpectedVolume(), 4, RoundingMode.HALF_UP);

        List<Order> childOrders = createVWAPSlices(
            order,
            targetParticipation,
            duration
        );

        return scheduleOrders(childOrders);
    }`)}
    </div>
  )

  const renderFIX = () => (
    <div className="space-y-8">
      <div style={{ backgroundColor: colors.bgSecondary, borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '2rem', borderLeft: '4px solid' }} className="border-l-4 border-purple-600">
        <h3 style={{ color: colors.textPrimary }} className="text-2xl font-bold mb-4 flex items-center gap-3">
          <span className="text-3xl">🔐</span>
          FIX Protocol Gateway
        </h3>
        <p style={{ color: colors.textSecondary }} className="text-lg leading-relaxed mb-6">
          High-performance FIX protocol gateway for institutional order flow with support for FIX 4.2, 4.4, and 5.0.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            'QuickFIX/J integration',
            'Session management and recovery',
            'Message validation and parsing',
            'Order entry and execution reports',
            'Market data distribution',
            'Drop copy support',
            'Sequence number management',
            'Heartbeat and test requests'
          ].map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <span className="text-purple-600 font-bold text-sm mt-0.5">{idx + 1}</span>
              <span style={{ color: colors.textPrimary }} className="text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {renderCodeSections(`// ═══════════════════════════════════════════════════════════════════════════
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
        sendHeartbeat(sessionID);
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

            ValidationResult validation = orderService.validate(order);
            if (!validation.isValid()) {
                sendOrderReject(sessionID, clOrdID, validation.getReason());
                return;
            }

            sendExecutionReport(sessionID, order, ExecType.NEW,
                OrdStatus.NEW, "Order accepted");

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
}`)}
    </div>
  )

  const renderLiquidity = () => (
    <div className="space-y-8">
      <div style={{ backgroundColor: colors.bgSecondary, borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '2rem', borderLeft: '4px solid' }} className="border-l-4 border-amber-600">
        <h3 style={{ color: colors.textPrimary }} className="text-2xl font-bold mb-4 flex items-center gap-3">
          <span className="text-3xl">📊</span>
          Liquidity Analysis Engine
        </h3>
        <p style={{ color: colors.textSecondary }} className="text-lg leading-relaxed mb-6">
          Advanced liquidity analysis engine for monitoring market depth, detecting liquidity patterns,
          and optimizing order placement.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Real-time order book depth analysis',
            'Liquidity heatmap generation',
            'Hidden liquidity detection',
            'Optimal execution timing',
            'Volume profile analysis',
            'Spread analysis and prediction',
            'Liquidity cost estimation',
            'Cross-venue liquidity aggregation'
          ].map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
              <span className="text-amber-600 font-bold text-sm mt-0.5">{idx + 1}</span>
              <span style={{ color: colors.textPrimary }} className="text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {renderCodeSections(`// ═══════════════════════════════════════════════════════════════════════════
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
}`)}
    </div>
  )

  const renderRisk = () => (
    <div className="space-y-8">
      <div style={{ backgroundColor: colors.bgSecondary, borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '2rem', borderLeft: '4px solid' }} className="border-l-4 border-red-600">
        <h3 style={{ color: colors.textPrimary }} className="text-2xl font-bold mb-4 flex items-center gap-3">
          <span className="text-3xl">🎯</span>
          Pre-Trade Risk Controls
        </h3>
        <p style={{ color: colors.textSecondary }} className="text-lg leading-relaxed mb-6">
          Real-time pre-trade risk controls to prevent erroneous orders and ensure compliance with risk limits.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Order size limits',
            'Price collar checks',
            'Position limit enforcement',
            'Concentration risk monitoring',
            'Credit limit checks',
            'Self-trade prevention',
            'Duplicate order detection',
            'Market manipulation detection'
          ].map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <span className="text-red-600 font-bold text-sm mt-0.5">{idx + 1}</span>
              <span style={{ color: colors.textPrimary }} className="text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {renderCodeSections(`// ═══════════════════════════════════════════════════════════════════════════
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
}`)}
    </div>
  )

  const renderPerformance = () => (
    <div className="space-y-8">
      <div style={{ backgroundColor: colors.bgSecondary, borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '2rem', borderLeft: '4px solid' }} className="border-l-4 border-cyan-600">
        <h3 style={{ color: colors.textPrimary }} className="text-2xl font-bold mb-4 flex items-center gap-3">
          <span className="text-3xl">📈</span>
          Performance Monitoring
        </h3>
        <p style={{ color: colors.textSecondary }} className="text-lg leading-relaxed mb-6">
          Comprehensive performance monitoring and analytics for tracking system health and trading metrics.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Order-to-execution latency tracking',
            'Fill rate monitoring',
            'Matching engine throughput',
            'Price improvement metrics',
            'Liquidity capture rate',
            'System health monitoring',
            'Alert management',
            'Real-time dashboards'
          ].map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-cyan-50 rounded-lg">
              <span className="text-cyan-600 font-bold text-sm mt-0.5">{idx + 1}</span>
              <span style={{ color: colors.textPrimary }} className="text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {renderCodeSections(`// ═══════════════════════════════════════════════════════════════════════════
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
}`)}
    </div>
  )

  const renderStreaming = () => (
    <div className="space-y-8">
      <div style={{ backgroundColor: colors.bgSecondary, borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '2rem', borderLeft: '4px solid' }} className="border-l-4 border-pink-600">
        <h3 style={{ color: colors.textPrimary }} className="text-2xl font-bold mb-4 flex items-center gap-3">
          <span className="text-3xl">🔄</span>
          Event Streaming Architecture
        </h3>
        <p style={{ color: colors.textSecondary }} className="text-lg leading-relaxed mb-6">
          High-throughput event streaming for order flow, executions, and market data distribution.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Order event streaming',
            'Execution report distribution',
            'Market data fan-out',
            'Audit trail logging',
            'Event sourcing pattern',
            'CQRS implementation',
            'Real-time analytics',
            'Replay capabilities'
          ].map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-pink-50 rounded-lg">
              <span className="text-pink-600 font-bold text-sm mt-0.5">{idx + 1}</span>
              <span style={{ color: colors.textPrimary }} className="text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {renderCodeSections(`// ═══════════════════════════════════════════════════════════════════════════
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
}`)}
    </div>
  )

  const renderCodeSections = (code) => {
    const sections = parseCodeSections(code)

    return (
      <div className="space-y-4">
        <h4 style={{ color: colors.textPrimary }} className="text-xl font-bold mb-4">Implementation Details</h4>
        {sections.map((section, index) => {
          const sectionId = `${activeTab}-section-${index}`
          const isExpanded = expandedSections[sectionId]

          return (
            <div key={index} style={{ backgroundColor: colors.bgSecondary, border: `1px solid ${colors.border}` }} className="rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleSection(sectionId)}
                style={{ backgroundColor: colors.bgSecondary, color: colors.textPrimary }}
                className="w-full px-6 py-4 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold text-sm">
                    {index + 1}
                  </span>
                  <span style={{ color: colors.textPrimary }} className="text-lg font-semibold">{section.title}</span>
                </div>
                <span style={{ color: colors.textSecondary }} className="text-2xl">{isExpanded ? '−' : '+'}</span>
              </button>

              {isExpanded && (
                <div className="bg-gray-900 p-6">
                  <SyntaxHighlighter code={section.code} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.bgPrimary }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            style={{
              marginBottom: '1.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: colors.bgSecondary,
              color: colors.textPrimary,
              borderRadius: '0.5rem',
              border: 'none',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}
          >
            <span>←</span>
            <span>Back to Projects</span>
          </button>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-8 text-white">
            <h1 className="text-4xl font-bold mb-3">🌊 Dark Pool Engine 3</h1>
            <p className="text-xl opacity-90">Advanced Alternative Trading System</p>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} />

        {/* Tabs */}
        <div style={{ backgroundColor: colors.bgSecondary, borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '0.5rem', marginBottom: '2rem' }}>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-fit px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label.split(' ').slice(1).join(' ')}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'architecture' && renderArchitecture()}
          {activeTab === 'matching' && renderMatching()}
          {activeTab === 'fix' && renderFIX()}
          {activeTab === 'liquidity' && renderLiquidity()}
          {activeTab === 'risk' && renderRisk()}
          {activeTab === 'performance' && renderPerformance()}
          {activeTab === 'streaming' && renderStreaming()}
        </div>
      </div>
    </div>
  )
}

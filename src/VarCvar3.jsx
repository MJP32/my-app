import { useState, useEffect } from 'react'

const SyntaxHighlighter = ({ code }) => {
  const highlightJava = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    highlighted = highlighted
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null|double|int|long|boolean)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ArrayList|Map|HashMap|Set|BigDecimal|LocalDate|Stream|Optional|Collectors|CompletableFuture|Flux|Mono|KafkaTemplate|RestController|Service|Autowired|GetMapping|PostMapping|RequestBody|ResponseEntity|LocalDateTime|Duration)\b/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')
      .replace(/\b(\d+\.?\d*[fFdDlL]?)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/\b([a-z_]\w*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')

    protectedContent.forEach(({ id, replacement }) => {
      highlighted = highlighted.replace(id, replacement)
    })

    return highlighted
  }

  return (
    <pre style={{
      backgroundColor: '#1e1e1e',
      color: '#d4d4d4',
      padding: '1rem',
      borderRadius: '8px',
      overflowX: 'auto',
      fontSize: '0.9rem',
      lineHeight: '1.5',
      border: '2px solid #ef4444',
      fontFamily: 'Consolas, Monaco, "Courier New", monospace',
      whiteSpace: 'pre',
      textAlign: 'left',
      margin: 0
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightJava(code) }} />
    </pre>
  )
}

function VarCvar3({ onBack }) {
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
      color: '#dc2626',
      description: 'Complete system architecture for enterprise VaR/CVaR risk management platform',
      diagram: () => (
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
          <svg viewBox="0 0 1200 800" style={{ width: '100%', maxWidth: '1200px', height: 'auto' }}>
            <defs>
              <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="indigoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
              </linearGradient>
            </defs>

            {/* Layer 1: Client Apps */}
            <rect x="50" y="20" width="1100" height="80" fill="url(#purpleGradient)" rx="8" />
            <text x="600" y="50" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 1: Client Applications</text>
            <text x="240" y="75" textAnchor="middle" fill="white" fontSize="14">📊 Risk Dashboard</text>
            <text x="600" y="75" textAnchor="middle" fill="white" fontSize="14">📱 Mobile App</text>
            <text x="960" y="75" textAnchor="middle" fill="white" fontSize="14">🔧 Admin Portal</text>

            {/* Layer 2: API Gateway */}
            <rect x="50" y="120" width="1100" height="60" fill="url(#indigoGradient)" rx="8" />
            <text x="600" y="155" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 2: API Gateway (Kong)</text>

            {/* Layer 3: Microservices */}
            <rect x="50" y="200" width="1100" height="100" fill="url(#purpleGradient)" rx="8" />
            <text x="600" y="225" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 3: Microservices</text>
            <text x="160" y="260" textAnchor="middle" fill="white" fontSize="12">VaR Calc</text>
            <text x="340" y="260" textAnchor="middle" fill="white" fontSize="12">Portfolio</text>
            <text x="520" y="260" textAnchor="middle" fill="white" fontSize="12">Market Data</text>
            <text x="700" y="260" textAnchor="middle" fill="white" fontSize="12">Risk Reporting</text>
            <text x="160" y="285" textAnchor="middle" fill="white" fontSize="12">Backtesting</text>
            <text x="520" y="285" textAnchor="middle" fill="white" fontSize="12">Stress Testing</text>

            {/* Layer 4: Kafka */}
            <rect x="50" y="320" width="1100" height="60" fill="url(#indigoGradient)" rx="8" />
            <text x="600" y="355" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 4: Kafka Event Streaming</text>

            {/* Layer 5: Databases */}
            <rect x="50" y="400" width="1100" height="100" fill="url(#purpleGradient)" rx="8" />
            <text x="600" y="425" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 5: Data & Caching</text>
            <text x="160" y="455" textAnchor="middle" fill="white" fontSize="13">PostgreSQL</text>
            <text x="340" y="455" textAnchor="middle" fill="white" fontSize="13">Oracle</text>
            <text x="520" y="455" textAnchor="middle" fill="white" fontSize="13">TimescaleDB</text>
            <text x="700" y="455" textAnchor="middle" fill="white" fontSize="13">Redis</text>
            <text x="880" y="455" textAnchor="middle" fill="white" fontSize="13">S3</text>
            <text x="1040" y="455" textAnchor="middle" fill="white" fontSize="13">Elasticsearch</text>

            {/* Layer 6: Security */}
            <rect x="50" y="520" width="1100" height="60" fill="url(#indigoGradient)" rx="8" />
            <text x="600" y="555" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 6: Security & Compliance</text>

            {/* Layer 7: Monitoring */}
            <rect x="50" y="600" width="1100" height="80" fill="url(#purpleGradient)" rx="8" />
            <text x="600" y="625" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Layer 7: Monitoring & Observability</text>
            <text x="325" y="655" textAnchor="middle" fill="white" fontSize="14">📊 Prometheus</text>
            <text x="600" y="655" textAnchor="middle" fill="white" fontSize="14">📈 Grafana</text>
            <text x="875" y="655" textAnchor="middle" fill="white" fontSize="14">🔍 ELK Stack</text>

            {/* Arrows showing data flow */}
            <path d="M 600 100 L 600 120" stroke="#a855f7" strokeWidth="3" markerEnd="url(#arrowhead)" />
            <path d="M 600 180 L 600 200" stroke="#a855f7" strokeWidth="3" markerEnd="url(#arrowhead)" />
            <path d="M 600 300 L 600 320" stroke="#a855f7" strokeWidth="3" markerEnd="url(#arrowhead)" />
            <path d="M 600 380 L 600 400" stroke="#a855f7" strokeWidth="3" markerEnd="url(#arrowhead)" />
            <path d="M 600 500 L 600 520" stroke="#a855f7" strokeWidth="3" markerEnd="url(#arrowhead)" />
            <path d="M 600 580 L 600 600" stroke="#a855f7" strokeWidth="3" markerEnd="url(#arrowhead)" />

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#a855f7" />
              </marker>
            </defs>
          </svg>
        </div>
      ),
      content: {
        overview: 'Comprehensive technical architecture for an enterprise-grade VaR/CVaR risk management platform serving hedge funds, asset managers, and financial institutions. Multi-layer architecture with real-time risk calculation, portfolio analytics, stress testing, and regulatory reporting.',
        keyPoints: [
          'Layer 1: User Interfaces (Risk Dashboard, Mobile Alerts, Admin Portal)',
          'Layer 2: API Gateway (Kong/AWS) with rate limiting',
          'Layer 3: Microservices (VaR Calculation, Portfolio Service, Market Data, Risk Reporting)',
          'Layer 4: Event Streaming (Kafka for real-time market data)',
          'Layer 5: Data & Caching (PostgreSQL for positions, Redis for real-time prices, TimescaleDB for historical data)',
          'Layer 6: Security & Compliance (Encryption at rest/transit, Audit Logging, Regulatory Reporting)',
          'Layer 7: Monitoring & Observability (Prometheus, Grafana, ELK Stack)',
          'Multi-region deployment with high availability',
          'Real-time risk calculation engine',
          'Comprehensive backtesting and stress testing frameworks'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Layer 1: User Interfaces
// ═══════════════════════════════════════════════════════════════════════════

/**
 * USER INTERFACE LAYER
 * --------------------
 * Three primary client applications for risk management
 *
 * 1. Risk Dashboard (React Web)
 *    - Real-time VaR/CVaR monitoring
 *    - Portfolio risk analytics
 *    - Interactive charts and heatmaps
 *    - Drill-down analysis
 *
 * 2. Mobile Alerts (React Native)
 *    - Push notifications for risk breaches
 *    - Quick portfolio overview
 *    - Emergency position liquidation
 *
 * 3. Admin Portal
 *    - Risk model configuration
 *    - User and permission management
 *    - Audit trail and compliance reports
 */

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Layer 2: API Gateway (Kong / AWS API Gateway)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * API GATEWAY RESPONSIBILITIES
 * ----------------------------
 * • OAuth2/JWT Authentication
 * • Rate Limiting (10000 req/min for market data)
 * • SSL Termination (TLS 1.3)
 * • Request Routing to microservices
 * • API Versioning (/v1, /v2)
 * • WebSocket support for real-time streaming
 */

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Layer 3: Microservices Architecture
// ═══════════════════════════════════════════════════════════════════════════

/**
 * CORE SERVICES
 * -------------
 * 1. VaR Calculation Service (Port 8081)
 *    - Historical VaR, Monte Carlo VaR, Parametric VaR
 *    - Real-time risk metric calculation
 *    - Technology: Spring Boot, Reactor, WebFlux
 *
 * 2. Portfolio Service (Port 8082)
 *    - Position management
 *    - Portfolio aggregation
 *    - Marginal VaR calculation
 *
 * 3. Market Data Service (Port 8083)
 *    - Real-time price streaming
 *    - Historical data retrieval
 *    - Technology: WebSocket, Redis Pub/Sub
 *
 * 4. Risk Reporting Service (Port 8084)
 *    - Regulatory reports (Basel III, SEC)
 *    - Custom risk analytics
 *    - PDF/Excel generation
 *
 * 5. Backtesting Service (Port 8085)
 *    - VaR model validation
 *    - Kupiec test, Traffic light test
 *    - Exception tracking
 *
 * 6. Stress Testing Service (Port 8086)
 *    - Historical scenario replay
 *    - Hypothetical stress scenarios
 *    - Sensitivity analysis
 */

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Layer 4: Event Streaming (Kafka)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * KAFKA TOPICS
 * ------------
 * • market-prices - Real-time market data (100k msg/sec)
 * • var-calculations - Calculated VaR metrics
 * • position-updates - Portfolio changes
 * • risk-alerts - Breach notifications
 * • audit-logs - Compliance trail
 *
 * Configuration:
 * • Partitions: 20 per topic
 * • Replication: 3x for HA
 * • Retention: 30 days
 */

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Layer 5: Data & Caching Layer
// ═══════════════════════════════════════════════════════════════════════════

/**
 * POLYGLOT PERSISTENCE
 * --------------------
 * 1. PostgreSQL - Portfolio positions, trades, users
 * 2. TimescaleDB - Time-series market data, VaR history
 * 3. Redis - Real-time prices cache, user sessions
 * 4. S3 - Risk reports, compliance documents
 * 5. Elasticsearch - Full-text search, log aggregation
 */

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Layer 6: Security & Compliance
// ═══════════════════════════════════════════════════════════════════════════

/**
 * SECURITY MEASURES
 * -----------------
 * • Encryption: AES-256 at rest, TLS 1.3 in transit
 * • Authentication: OAuth2, MFA for admin access
 * • Authorization: RBAC with fine-grained permissions
 * • Audit Logging: Immutable audit trail in blockchain
 * • Regulatory Reporting: Basel III, SEC, FINRA compliance
 */

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Layer 7: Monitoring & Observability
// ═══════════════════════════════════════════════════════════════════════════

/**
 * OBSERVABILITY STACK
 * -------------------
 * • Prometheus - Metrics (VaR calc time, throughput)
 * • Grafana - Real-time dashboards
 * • ELK Stack - Centralized logging
 * • Jaeger - Distributed tracing
 * • PagerDuty - Alerting and incident management
 */`
      }
    },
    {
      id: 1,
      title: '📊 Historical VaR',
      color: '#ef4444',
      description: 'Non-parametric VaR using historical price movements',
      content: {
        overview: 'Historical VaR calculates risk by analyzing actual historical price movements over a lookback period. This non-parametric method sorts historical returns and identifies the return at the desired confidence level percentile.',
        keyPoints: [
          'Non-parametric approach - no distribution assumptions',
          'Uses actual historical returns data',
          'Typical lookback: 252 trading days (1 year)',
          'Confidence levels: 95%, 99%, 99.9%',
          'Simple to implement and explain',
          'Reflects actual market conditions',
          'Portfolio return aggregation',
          'Rolling window for continuous monitoring'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Historical VaR Configuration
// ═══════════════════════════════════════════════════════════════════════════
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class HistoricalVarService {
  private static final int LOOKBACK_DAYS = 252; // 1 year
  private static final double CONFIDENCE_LEVEL = 0.99; // 99% confidence

// ═══════════════════════════════════════════════════════════════════════════
// ✦ VaR Calculation Logic
// ═══════════════════════════════════════════════════════════════════════════
  public BigDecimal calculateHistoricalVaR(List<BigDecimal> returns) {
    List<BigDecimal> sortedReturns = returns.stream()
      .sorted()
      .collect(Collectors.toList());

    int varIndex = (int) Math.ceil((1 - CONFIDENCE_LEVEL) * sortedReturns.size());
    BigDecimal var = sortedReturns.get(varIndex);

    System.out.println("99% VaR: " + var);
    return var;
  }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Portfolio Returns Calculation
// ═══════════════════════════════════════════════════════════════════════════
  public List<BigDecimal> calculatePortfolioReturns(
      Map<String, List<BigDecimal>> assetPrices,
      Map<String, BigDecimal> weights) {

    List<BigDecimal> portfolioReturns = new ArrayList<>();
    int periods = assetPrices.values().iterator().next().size();

    for (int i = 1; i < periods; i++) {
      BigDecimal portfolioReturn = BigDecimal.ZERO;

      for (Map.Entry<String, List<BigDecimal>> entry : assetPrices.entrySet()) {
        String asset = entry.getKey();
        BigDecimal weight = weights.get(asset);
        BigDecimal assetReturn = calculateReturn(
          entry.getValue().get(i - 1),
          entry.getValue().get(i)
        );
        portfolioReturn = portfolioReturn.add(weight.multiply(assetReturn));
      }
      portfolioReturns.add(portfolioReturn);
    }
    return portfolioReturns;
  }

  private BigDecimal calculateReturn(BigDecimal oldPrice, BigDecimal newPrice) {
    return newPrice.subtract(oldPrice).divide(oldPrice, 6, BigDecimal.ROUND_HALF_UP);
  }
}`
      }
    },
    {
      id: 2,
      title: '🎲 Monte Carlo VaR',
      color: '#f97316',
      description: 'Simulation-based VaR using random sampling',
      content: {
        overview: 'Monte Carlo VaR uses random sampling and statistical modeling to simulate thousands of potential future portfolio values. This method is particularly effective for complex portfolios with non-linear instruments.',
        keyPoints: [
          'Simulation-based probabilistic approach',
          'Handles non-linear instruments and derivatives',
          'Typical simulations: 10,000 to 100,000 paths',
          'Gaussian or custom return distributions',
          'Correlation matrix for multi-asset portfolios',
          'Parallel processing for performance',
          'Cholesky decomposition for correlations',
          'Confidence intervals from simulation results'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Monte Carlo Configuration
// ═══════════════════════════════════════════════════════════════════════════
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class MonteCarloVarService {
  private static final int SIMULATIONS = 10000;
  private static final double CONFIDENCE_LEVEL = 0.99;
  private static final int TIME_HORIZON_DAYS = 1;

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Simulation Engine
// ═══════════════════════════════════════════════════════════════════════════
  public BigDecimal calculateMonteCarloVaR(
      BigDecimal portfolioValue,
      BigDecimal meanReturn,
      BigDecimal volatility) {

    List<BigDecimal> simulatedReturns = new ArrayList<>();
    Random random = ThreadLocalRandom.current();

    for (int i = 0; i < SIMULATIONS; i++) {
      double z = random.nextGaussian();
      double simulatedReturn = meanReturn.doubleValue() +
        volatility.doubleValue() * z * Math.sqrt(TIME_HORIZON_DAYS);

      simulatedReturns.add(BigDecimal.valueOf(simulatedReturn));
    }

    Collections.sort(simulatedReturns);
    int varIndex = (int) Math.ceil((1 - CONFIDENCE_LEVEL) * SIMULATIONS);
    BigDecimal varReturn = simulatedReturns.get(varIndex);

    BigDecimal var = portfolioValue.multiply(varReturn.abs());
    System.out.println("Monte Carlo VaR (99%): " + var);
    return var;
  }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Multi-Asset Simulation with Correlation
// ═══════════════════════════════════════════════════════════════════════════
  public BigDecimal calculateMultiAssetVaR(
      Map<String, BigDecimal> positions,
      Map<String, BigDecimal> means,
      Map<String, BigDecimal> volatilities,
      double[][] correlationMatrix) {

    List<BigDecimal> portfolioValues = new ArrayList<>();

    for (int i = 0; i < SIMULATIONS; i++) {
      BigDecimal totalValue = BigDecimal.ZERO;
      int assetIndex = 0;

      for (String asset : positions.keySet()) {
        double z = generateCorrelatedRandomNumber(correlationMatrix, assetIndex);
        double return_ = means.get(asset).doubleValue() +
          volatilities.get(asset).doubleValue() * z;

        BigDecimal assetValue = positions.get(asset)
          .multiply(BigDecimal.valueOf(1 + return_));
        totalValue = totalValue.add(assetValue);
        assetIndex++;
      }
      portfolioValues.add(totalValue);
    }

    BigDecimal initialValue = positions.values().stream()
      .reduce(BigDecimal.ZERO, BigDecimal::add);

    List<BigDecimal> losses = portfolioValues.stream()
      .map(v -> initialValue.subtract(v))
      .sorted()
      .collect(Collectors.toList());

    int varIndex = (int) Math.ceil(CONFIDENCE_LEVEL * SIMULATIONS);
    return losses.get(varIndex);
  }

  private double generateCorrelatedRandomNumber(double[][] corrMatrix, int index) {
    return ThreadLocalRandom.current().nextGaussian();
  }
}`
      }
    },
    {
      id: 3,
      title: '⚠️ Conditional VaR (CVaR)',
      color: '#fb923c',
      description: 'Expected Shortfall beyond VaR threshold',
      content: {
        overview: 'CVaR (also called Expected Shortfall) measures the expected loss given that the loss exceeds the VaR threshold. It provides a more comprehensive risk measure by considering the tail risk beyond VaR.',
        keyPoints: [
          'Also known as Expected Shortfall (ES)',
          'Measures average loss beyond VaR',
          'Coherent risk measure (sub-additive)',
          'Better for extreme tail risk',
          'Regulatory preferred (Basel III)',
          'Considers severity of losses',
          'Average of worst losses',
          'More conservative than VaR'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ CVaR Service Configuration
// ═══════════════════════════════════════════════════════════════════════════
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CvarService {
  private static final double CONFIDENCE_LEVEL = 0.99;

// ═══════════════════════════════════════════════════════════════════════════
// ✦ CVaR Calculation
// ═══════════════════════════════════════════════════════════════════════════
  public Map<String, BigDecimal> calculateVarAndCvar(List<BigDecimal> returns) {
    List<BigDecimal> sortedReturns = returns.stream()
      .sorted()
      .collect(Collectors.toList());

    int varIndex = (int) Math.ceil((1 - CONFIDENCE_LEVEL) * sortedReturns.size());
    BigDecimal var = sortedReturns.get(varIndex);

    List<BigDecimal> tailLosses = sortedReturns.subList(0, varIndex + 1);
    BigDecimal cvar = tailLosses.stream()
      .reduce(BigDecimal.ZERO, BigDecimal::add)
      .divide(BigDecimal.valueOf(tailLosses.size()), 6, BigDecimal.ROUND_HALF_UP);

    Map<String, BigDecimal> result = new HashMap<>();
    result.put("VaR", var);
    result.put("CVaR", cvar);

    System.out.println("99% VaR: " + var);
    System.out.println("99% CVaR: " + cvar);
    return result;
  }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ REST API Endpoint
// ═══════════════════════════════════════════════════════════════════════════
  @RestController
  public class RiskController {
    @Autowired
    private CvarService cvarService;

    @PostMapping("/api/risk/cvar")
    public ResponseEntity<Map<String, BigDecimal>> calculateCvar(
        @RequestBody List<BigDecimal> returns) {

      Map<String, BigDecimal> metrics = cvarService.calculateVarAndCvar(returns);
      return ResponseEntity.ok(metrics);
    }
  }
}`
      }
    },
    {
      id: 4,
      title: '⚡ Real-time VaR Streaming',
      color: '#f59e0b',
      description: 'Continuous VaR calculation with reactive streams',
      content: {
        overview: 'Real-time VaR continuously recalculates risk metrics as market data streams in. Uses reactive programming with Spring WebFlux and Kafka for high-throughput, low-latency risk monitoring.',
        keyPoints: [
          'Reactive programming with Spring WebFlux',
          'Kafka streaming for market data',
          'Rolling window calculations',
          'Sub-second latency updates',
          'WebSocket push to clients',
          'Back-pressure handling',
          'Event-driven architecture',
          'Real-time risk alerts'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Reactive VaR Service Setup
// ═══════════════════════════════════════════════════════════════════════════
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import java.math.BigDecimal;
import java.time.Duration;
import java.util.*;

@Service
public class RealtimeVarService {
  private final Queue<BigDecimal> rollingWindow = new LinkedList<>();
  private static final int WINDOW_SIZE = 100;

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Streaming VaR Calculation
// ═══════════════════════════════════════════════════════════════════════════
  public Flux<BigDecimal> streamVaR(Flux<BigDecimal> priceStream) {
    return priceStream
      .window(2, 1)
      .flatMap(window -> window.collectList())
      .filter(prices -> prices.size() == 2)
      .map(prices -> calculateReturn(prices.get(0), prices.get(1)))
      .map(this::updateRollingWindow)
      .filter(returns -> returns.size() >= WINDOW_SIZE)
      .map(this::calculateVaR);
  }

  private BigDecimal calculateReturn(BigDecimal oldPrice, BigDecimal newPrice) {
    return newPrice.subtract(oldPrice).divide(oldPrice, 6, BigDecimal.ROUND_HALF_UP);
  }

  private List<BigDecimal> updateRollingWindow(BigDecimal newReturn) {
    rollingWindow.add(newReturn);
    if (rollingWindow.size() > WINDOW_SIZE) {
      rollingWindow.poll();
    }
    return new ArrayList<>(rollingWindow);
  }

  private BigDecimal calculateVaR(List<BigDecimal> returns) {
    List<BigDecimal> sorted = new ArrayList<>(returns);
    Collections.sort(sorted);
    int varIndex = (int) Math.ceil(0.01 * sorted.size());
    return sorted.get(varIndex);
  }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Kafka Integration
// ═══════════════════════════════════════════════════════════════════════════
  @Service
  public class VarStreamingService {
    @Autowired
    private KafkaTemplate<String, BigDecimal> kafkaTemplate;

    public void publishVaR(Flux<BigDecimal> varStream) {
      varStream
        .delayElements(Duration.ofMillis(100))
        .subscribe(var -> kafkaTemplate.send("var-metrics", var));
    }
  }
}`
      }
    },
    {
      id: 5,
      title: '💼 Portfolio VaR',
      color: '#eab308',
      description: 'Multi-asset portfolio risk with correlations',
      content: {
        overview: 'Portfolio VaR calculates the aggregate risk of a multi-asset portfolio, accounting for correlations between assets. This is crucial for understanding diversification benefits and total portfolio risk exposure.',
        keyPoints: [
          'Multi-asset aggregation',
          'Correlation matrix integration',
          'Variance-covariance approach',
          'Portfolio weights calculation',
          'Diversification benefits',
          'Asset class contributions',
          'Risk decomposition',
          'Incremental VaR analysis'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Portfolio Entity and Configuration
// ═══════════════════════════════════════════════════════════════════════════
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.*;

public class Portfolio {
  private Map<String, Position> positions = new HashMap<>();

  public void addPosition(String asset, BigDecimal quantity, BigDecimal price) {
    positions.put(asset, new Position(asset, quantity, price));
  }

  public BigDecimal getTotalValue() {
    return positions.values().stream()
      .map(p -> p.quantity.multiply(p.price))
      .reduce(BigDecimal.ZERO, BigDecimal::add);
  }
}

class Position {
  String asset;
  BigDecimal quantity;
  BigDecimal price;

  Position(String asset, BigDecimal quantity, BigDecimal price) {
    this.asset = asset;
    this.quantity = quantity;
    this.price = price;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Portfolio VaR Calculation
// ═══════════════════════════════════════════════════════════════════════════
@Service
public class PortfolioVarService {

  public BigDecimal calculatePortfolioVaR(
      Portfolio portfolio,
      Map<String, BigDecimal> volatilities,
      double[][] correlationMatrix) {

    Map<String, BigDecimal> weights = calculateWeights(portfolio);
    BigDecimal portfolioVolatility = calculatePortfolioVolatility(
      weights, volatilities, correlationMatrix);

    BigDecimal zScore = BigDecimal.valueOf(2.33); // 99% confidence
    BigDecimal var = portfolio.getTotalValue()
      .multiply(portfolioVolatility)
      .multiply(zScore);

    System.out.println("Portfolio VaR (99%): " + var);
    return var;
  }

  private Map<String, BigDecimal> calculateWeights(Portfolio portfolio) {
    BigDecimal totalValue = portfolio.getTotalValue();
    Map<String, BigDecimal> weights = new HashMap<>();

    portfolio.positions.forEach((asset, position) -> {
      BigDecimal positionValue = position.quantity.multiply(position.price);
      weights.put(asset, positionValue.divide(totalValue, 6, BigDecimal.ROUND_HALF_UP));
    });

    return weights;
  }

  private BigDecimal calculatePortfolioVolatility(
      Map<String, BigDecimal> weights,
      Map<String, BigDecimal> volatilities,
      double[][] correlationMatrix) {

    BigDecimal variance = BigDecimal.ZERO;
    List<String> assets = new ArrayList<>(weights.keySet());

    for (int i = 0; i < assets.size(); i++) {
      for (int j = 0; j < assets.size(); j++) {
        String asset1 = assets.get(i);
        String asset2 = assets.get(j);

        BigDecimal term = weights.get(asset1)
          .multiply(weights.get(asset2))
          .multiply(volatilities.get(asset1))
          .multiply(volatilities.get(asset2))
          .multiply(BigDecimal.valueOf(correlationMatrix[i][j]));

        variance = variance.add(term);
      }
    }

    return BigDecimal.valueOf(Math.sqrt(variance.doubleValue()));
  }
}`
      }
    },
    {
      id: 6,
      title: '✅ Backtesting Framework',
      color: '#84cc16',
      description: 'VaR model validation and accuracy testing',
      content: {
        overview: 'Backtesting validates VaR model accuracy by comparing predicted VaR thresholds against actual historical losses. Tracks exception rates and performs statistical tests to ensure model reliability.',
        keyPoints: [
          'Exception counting methodology',
          'Kupiec test (Likelihood Ratio)',
          'Traffic light approach (Basel)',
          'Christoffersen test for independence',
          'Expected vs actual exception rate',
          'Statistical significance testing',
          'Model performance scoring',
          'Regulatory compliance validation'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Backtesting Service Configuration
// ═══════════════════════════════════════════════════════════════════════════
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@Service
public class BacktestingService {
  private static final double EXPECTED_EXCEPTION_RATE = 0.01; // 1% for 99% VaR

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Exception Counting and Validation
// ═══════════════════════════════════════════════════════════════════════════
  public BacktestResult performBacktest(
      List<BigDecimal> actualReturns,
      List<BigDecimal> varEstimates) {

    int exceptions = 0;
    List<LocalDate> exceptionDates = new ArrayList<>();

    for (int i = 0; i < actualReturns.size(); i++) {
      if (actualReturns.get(i).compareTo(varEstimates.get(i)) < 0) {
        exceptions++;
        exceptionDates.add(LocalDate.now().minusDays(actualReturns.size() - i));
      }
    }

    double actualExceptionRate = (double) exceptions / actualReturns.size();
    boolean passed = Math.abs(actualExceptionRate - EXPECTED_EXCEPTION_RATE) < 0.005;

    BacktestResult result = new BacktestResult(
      exceptions,
      actualExceptionRate,
      EXPECTED_EXCEPTION_RATE,
      passed,
      exceptionDates
    );

    System.out.println("Backtest Results:");
    System.out.println("Exceptions: " + exceptions);
    System.out.println("Exception Rate: " + actualExceptionRate);
    System.out.println("Test Passed: " + passed);

    return result;
  }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Kupiec Test (Likelihood Ratio Test)
// ═══════════════════════════════════════════════════════════════════════════
  public boolean performKupiecTest(int exceptions, int observations) {
    double p = (double) exceptions / observations;
    double likelihood = -2 * Math.log(
      Math.pow(EXPECTED_EXCEPTION_RATE, exceptions) *
      Math.pow(1 - EXPECTED_EXCEPTION_RATE, observations - exceptions)
    ) + 2 * Math.log(
      Math.pow(p, exceptions) * Math.pow(1 - p, observations - exceptions)
    );

    double criticalValue = 3.84; // Chi-square at 95% confidence
    boolean passed = likelihood < criticalValue;

    System.out.println("Kupiec LR Statistic: " + likelihood);
    System.out.println("Critical Value: " + criticalValue);
    System.out.println("Test Passed: " + passed);

    return passed;
  }
}

class BacktestResult {
  int exceptions;
  double actualRate;
  double expectedRate;
  boolean passed;
  List<LocalDate> exceptionDates;

  BacktestResult(int exceptions, double actualRate, double expectedRate,
                 boolean passed, List<LocalDate> exceptionDates) {
    this.exceptions = exceptions;
    this.actualRate = actualRate;
    this.expectedRate = expectedRate;
    this.passed = passed;
    this.exceptionDates = exceptionDates;
  }
}`
      }
    },
    {
      id: 7,
      title: '🔥 Stress Testing',
      color: '#22c55e',
      description: 'Extreme scenario analysis and tail risk',
      content: {
        overview: 'Stress testing evaluates portfolio performance under extreme market conditions and worst-case scenarios. Includes historical scenario replay and hypothetical stress scenarios to assess tail risk.',
        keyPoints: [
          'Historical scenario replay (2008, COVID)',
          'Hypothetical stress scenarios',
          'Interest rate shocks',
          'Volatility spikes',
          'Market crash simulations',
          'Multi-factor stress tests',
          'Reverse stress testing',
          'Scenario impact analysis'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Stress Testing Service
// ═══════════════════════════════════════════════════════════════════════════
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.*;

@Service
public class StressTestingService {

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Historical Scenario Replay
// ═══════════════════════════════════════════════════════════════════════════
  public Map<String, BigDecimal> runHistoricalScenarios(Portfolio portfolio) {
    Map<String, BigDecimal> scenarioResults = new HashMap<>();

    // 2008 Financial Crisis
    Map<String, BigDecimal> crisis2008 = new HashMap<>();
    crisis2008.put("EQUITY", BigDecimal.valueOf(-0.45));
    crisis2008.put("BOND", BigDecimal.valueOf(-0.15));
    crisis2008.put("COMMODITY", BigDecimal.valueOf(-0.35));
    scenarioResults.put("Financial Crisis 2008",
      applyScenario(portfolio, crisis2008));

    // COVID-19 March 2020
    Map<String, BigDecimal> covid2020 = new HashMap<>();
    covid2020.put("EQUITY", BigDecimal.valueOf(-0.30));
    covid2020.put("BOND", BigDecimal.valueOf(0.05));
    covid2020.put("COMMODITY", BigDecimal.valueOf(-0.25));
    scenarioResults.put("COVID-19 Crash",
      applyScenario(portfolio, covid2020));

    return scenarioResults;
  }

  private BigDecimal applyScenario(Portfolio portfolio,
                                   Map<String, BigDecimal> shocks) {
    BigDecimal portfolioImpact = BigDecimal.ZERO;

    portfolio.positions.forEach((asset, position) -> {
      String assetClass = getAssetClass(asset);
      BigDecimal shock = shocks.getOrDefault(assetClass, BigDecimal.ZERO);
      BigDecimal impact = position.quantity
        .multiply(position.price)
        .multiply(shock);
      portfolioImpact.add(impact);
    });

    return portfolioImpact;
  }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Hypothetical Stress Scenarios
// ═══════════════════════════════════════════════════════════════════════════
  public Map<String, BigDecimal> runHypotheticalScenarios(Portfolio portfolio) {
    Map<String, BigDecimal> results = new HashMap<>();

    // Interest Rate Shock
    results.put("IR +200bps", calculateInterestRateShock(portfolio, 0.02));

    // Volatility Spike
    results.put("Vol +50%", calculateVolatilityShock(portfolio, 0.50));

    // Market Crash
    results.put("Market -25%", calculateMarketCrash(portfolio, -0.25));

    return results;
  }

  private BigDecimal calculateInterestRateShock(Portfolio portfolio, double shock) {
    // Simplified duration-based calculation
    return portfolio.getTotalValue().multiply(BigDecimal.valueOf(shock * 5));
  }

  private BigDecimal calculateVolatilityShock(Portfolio portfolio, double volIncrease) {
    return portfolio.getTotalValue().multiply(BigDecimal.valueOf(volIncrease * 0.1));
  }

  private BigDecimal calculateMarketCrash(Portfolio portfolio, double marketMove) {
    return portfolio.getTotalValue().multiply(BigDecimal.valueOf(marketMove));
  }

  private String getAssetClass(String asset) {
    if (asset.contains("STOCK") || asset.contains("EQUITY")) return "EQUITY";
    if (asset.contains("BOND")) return "BOND";
    return "COMMODITY";
  }
}`
      }
    },
    {
      id: 8,
      title: '📉 Marginal VaR',
      color: '#10b981',
      description: 'Position-level risk contribution analysis',
      content: {
        overview: 'Marginal VaR measures the contribution of each position to the total portfolio VaR. Essential for risk attribution, position limits, and understanding which assets drive portfolio risk.',
        keyPoints: [
          'Risk contribution by position',
          'Incremental VaR calculation',
          'Component VaR decomposition',
          'Position sensitivity analysis',
          'Risk attribution framework',
          'Position limit enforcement',
          'Marginal vs incremental distinction',
          'Risk-adjusted returns'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Marginal VaR Service
// ═══════════════════════════════════════════════════════════════════════════
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.*;

@Service
public class MarginalVarService {

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Marginal VaR Calculation
// ═══════════════════════════════════════════════════════════════════════════
  public Map<String, BigDecimal> calculateMarginalVaR(
      Portfolio portfolio,
      Map<String, BigDecimal> volatilities,
      double[][] correlationMatrix) {

    BigDecimal baseVaR = calculatePortfolioVaR(portfolio, volatilities, correlationMatrix);
    Map<String, BigDecimal> marginalVaRs = new HashMap<>();

    for (String asset : portfolio.positions.keySet()) {
      BigDecimal delta = BigDecimal.valueOf(0.01); // 1% change

      Portfolio modifiedPortfolio = portfolio.clone();
      Position position = modifiedPortfolio.positions.get(asset);
      position.quantity = position.quantity.multiply(BigDecimal.ONE.add(delta));

      BigDecimal newVaR = calculatePortfolioVaR(
        modifiedPortfolio, volatilities, correlationMatrix);

      BigDecimal marginalVaR = newVaR.subtract(baseVaR).divide(delta, 6, BigDecimal.ROUND_HALF_UP);
      marginalVaRs.put(asset, marginalVaR);

      System.out.println("Marginal VaR for " + asset + ": " + marginalVaR);
    }

    return marginalVaRs;
  }

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Component VaR (Risk Contribution)
// ═══════════════════════════════════════════════════════════════════════════
  public Map<String, BigDecimal> calculateComponentVaR(
      Portfolio portfolio,
      Map<String, BigDecimal> marginalVaRs) {

    Map<String, BigDecimal> componentVaRs = new HashMap<>();
    BigDecimal totalValue = portfolio.getTotalValue();

    for (String asset : portfolio.positions.keySet()) {
      Position position = portfolio.positions.get(asset);
      BigDecimal positionValue = position.quantity.multiply(position.price);
      BigDecimal weight = positionValue.divide(totalValue, 6, BigDecimal.ROUND_HALF_UP);

      BigDecimal componentVaR = marginalVaRs.get(asset).multiply(weight);
      componentVaRs.put(asset, componentVaR);

      System.out.println("Component VaR for " + asset + ": " + componentVaR);
    }

    return componentVaRs;
  }

  private BigDecimal calculatePortfolioVaR(
      Portfolio portfolio,
      Map<String, BigDecimal> volatilities,
      double[][] correlationMatrix) {
    // Reuse from PortfolioVarService
    return BigDecimal.ZERO; // Placeholder
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
              VaR/CVaR Topics
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
          background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          💹 VaR/CVaR Risk Management System
        </h1>
        <p style={{
          margin: 0,
          fontSize: '1.2rem',
          color: '#6b7280'
        }}>
          Enterprise Financial Risk Analytics Platform
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

export default VarCvar3

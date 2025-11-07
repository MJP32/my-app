import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, Code, Database, Cloud, Monitor, Zap, Server, GitBranch, BarChart, Target, Settings, AlertCircle, ArrowLeft } from 'lucide-react';
import { KEYS, FocusManager, AriaUtils } from '../../utils/keyboardNavigation.js';
import { FocusManager as FocusManagerUtil } from '../../utils/focusManagement.js';

const highlightCode = (code) => {
  // Clean input: remove legacy inline HTML markup from code strings (e.g., <span>, <font>, style/color attributes)
  // but preserve Java generics like <T> by only removing known wrapper tags.
  code = code
    .replace(/<\s*(?:span|font)[^>]*>/gi, '')
    .replace(/<\s*\/\s*(?:span|font)\s*>/gi, '')
    .replace(/\s*(?:style|color|bgcolor)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');

  // Simple Java tokenizer that emits class-based tokens (no inline styles).
  // Uses placeholders for comments/strings to avoid nested replacements.
  let highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const placeholders = [];
  const store = (html) => {
    placeholders.push(html);
    return `___P${placeholders.length - 1}___`;
  };

  // Comments (multiline first, then single-line)
  highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, (m) => store(`<span class="token comment">${m}</span>`));
  highlighted = highlighted.replace(/\/\/.*$/gm, (m) => store(`<span class="token comment">${m}</span>`));

  // Strings and char literals
  highlighted = highlighted.replace(/"(?:\\.|[^"\\])*"/g, (m) => store(`<span class="token string">${m}</span>`));
  highlighted = highlighted.replace(/'(?:\\.|[^'\\])+'/g, (m) => store(`<span class="token char">${m}</span>`));

  // Annotations like @Override (store so later punctuation replacement won't touch our markup)
  highlighted = highlighted.replace(/@\w+/g, (m) => store(`<span class="token annotation">${m}</span>`));

  // Numbers
  highlighted = highlighted.replace(/\b\d+(?:\.\d+)?\b/g, (m) => store(`<span class="token number">${m}</span>`));

  // Booleans and null
  highlighted = highlighted.replace(/\b(true|false|null)\b/g, (m) => store(`<span class="token boolean">${m}</span>`));

  // Keywords (Java)
  const keywords = '\n    abstract assert boolean break byte case catch char class const continue default do double else enum export extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try var void volatile while';
  const kwRegex = new RegExp('\\\b(' + keywords.trim().split(/\s+/).join('|') + ')\\\b', 'g');
  highlighted = highlighted.replace(kwRegex, (m) => store(`<span class="token keyword">${m}</span>`));

  // Class names (simple heuristic: capitalized identifiers)
  highlighted = highlighted.replace(/\b([A-Z][A-Za-z0-9_]*)\b/g, (m) => store(`<span class="token class-name">${m}</span>`));

  // Function / method names: identifier followed by '('
  highlighted = highlighted.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, (m) => store(`<span class="token function">${m}</span>`));

  // Punctuation/operators - leave as-is but give class for styling if desired
  // (we'll wrap a few common symbols)
  highlighted = highlighted.replace(/([{}()[\];,.<>+\-*/=%!:|&^~?]+)/g, (m) => `<span class="token punctuation">${m}</span>`);

  // Restore placeholders
  highlighted = highlighted.replace(/___P(\d+)___/g, (_, n) => placeholders[Number(n)]);

  // Sanitize: remove any leftover inline styles or color attributes and <font> tags
  // Remove attributes: style="..." or color='...' or bgcolor="..."
  highlighted = highlighted.replace(/\s*(?:style|color|bgcolor)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');
  // Remove <font ...> and </font>
  highlighted = highlighted.replace(/<\s*font[^>]*>/gi, '');
  highlighted = highlighted.replace(/<\s*\/\s*font\s*>/gi, '');

  return highlighted;
};

const TechnicalDetails = ({ onBack }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const [expandedSubItems, setExpandedSubItems] = useState({});
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [focusedItemIndex, setFocusedItemIndex] = useState(0);
  const [focusedSubItemIndex, setFocusedSubItemIndex] = useState(-1); // -1 means not in sub-items
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);
  const backButtonRef = useRef(null);
  const itemRefs = useRef([]);
  const subItemRefs = useRef({});
  const componentRef = useRef(null);

  const toggleExpand = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleSubExpand = (parentIndex, subIndex) => {
    const key = `${parentIndex}-${subIndex}`;
    setExpandedSubItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Keyboard navigation with hierarchical support
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't handle if typing in input fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      // Don't handle if the event is coming from a button click
      // This prevents keyboard handlers from interfering with button interactions
      if (e.target.tagName === 'BUTTON' && (e.key === KEYS.ENTER || e.key === KEYS.SPACE)) {
        return;
      }

      // Don't handle if we're in the middle of a click event
      if (e.isTrusted === false) {
        return;
      }

      // Back button shortcut
      if ((e.key === 'b' || e.key === 'B') && backButtonRef.current) {
        e.preventDefault();
        backButtonRef.current.focus();
        return;
      }

      // Escape to go back
      if (e.key === KEYS.ESCAPE) {
        e.preventDefault();
        onBack();
        return;
      }

      // Determine if we're currently in sub-items or main items
      const isInSubItems = focusedSubItemIndex >= 0;
      const currentMainSection = technicalPoints[focusedItemIndex];
      const isMainSectionExpanded = expandedItems[focusedItemIndex];

      // Arrow key navigation
      if (e.key === KEYS.ARROW_DOWN) {
        e.preventDefault();

        if (isInSubItems) {
          // Navigate within sub-items
          const maxSubIndex = currentMainSection.subSections ? currentMainSection.subSections.length - 1 : -1;
          if (focusedSubItemIndex < maxSubIndex) {
            setFocusedSubItemIndex(prev => prev + 1);
          } else {
            // Move to next main section and exit sub-items
            setFocusedSubItemIndex(-1);
            setFocusedItemIndex(prev => Math.min(prev + 1, technicalPoints.length - 1));
          }
        } else {
          // Navigate main sections
          if (isMainSectionExpanded && currentMainSection.subSections && currentMainSection.subSections.length > 0) {
            // Enter sub-items of current expanded section
            setFocusedSubItemIndex(0);
          } else {
            // Move to next main section
            setFocusedItemIndex(prev => Math.min(prev + 1, technicalPoints.length - 1));
          }
        }
      } else if (e.key === KEYS.ARROW_UP) {
        e.preventDefault();

        if (isInSubItems) {
          if (focusedSubItemIndex > 0) {
            // Navigate within sub-items
            setFocusedSubItemIndex(prev => prev - 1);
          } else {
            // Exit sub-items and go to main section
            setFocusedSubItemIndex(-1);
          }
        } else {
          // Navigate main sections
          setFocusedItemIndex(prev => Math.max(prev - 1, 0));
        }
      } else if (e.key === KEYS.ENTER || e.key === KEYS.SPACE) {
        e.preventDefault();

        if (isInSubItems) {
          // Toggle sub-item expansion
          toggleSubExpand(focusedItemIndex, focusedSubItemIndex);
          AriaUtils.announce(expandedSubItems[`${focusedItemIndex}-${focusedSubItemIndex}`] ? 'Sub-section collapsed' : 'Sub-section expanded');
        } else {
          // Toggle main section expansion
          toggleExpand(focusedItemIndex);
          AriaUtils.announce(expandedItems[focusedItemIndex] ? 'Section collapsed' : 'Section expanded');
        }
      } else if (e.key === KEYS.ARROW_LEFT && isInSubItems) {
        // Left arrow exits sub-items
        e.preventDefault();
        setFocusedSubItemIndex(-1);
        AriaUtils.announce('Exited sub-sections');
      } else if (e.key === KEYS.ARROW_RIGHT && !isInSubItems && isMainSectionExpanded && currentMainSection.subSections && currentMainSection.subSections.length > 0) {
        // Right arrow enters sub-items
        e.preventDefault();
        setFocusedSubItemIndex(0);
        AriaUtils.announce('Entered sub-sections');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [focusedItemIndex, focusedSubItemIndex, expandedItems, expandedSubItems, onBack]);

  // Handle programmatic focus when keyboard navigation changes focus
  useEffect(() => {
    if (isKeyboardUser) {
      if (focusedSubItemIndex >= 0) {
        // Focus on sub-item
        const subItemKey = `${focusedItemIndex}-${focusedSubItemIndex}`;
        const subItemElement = subItemRefs.current[subItemKey];
        if (subItemElement) {
          subItemElement.focus();
        }
      } else {
        // Focus on main item
        const mainItemElement = itemRefs.current[focusedItemIndex];
        if (mainItemElement) {
          mainItemElement.focus();
        }
      }
    }
  }, [focusedItemIndex, focusedSubItemIndex, isKeyboardUser]);

  // Auto-focus is handled by App.jsx - no need to duplicate here
  // useEffect(() => {
  //   if (componentRef.current) {
  //     // Focus the back button as the first interactive element
  //     setTimeout(() => {
  //       if (backButtonRef.current) {
  //         backButtonRef.current.focus();
  //         FocusManagerUtil.announce('VaR/CVaR technical details loaded. Use arrow keys to navigate sections, Enter to expand, B for back button, Escape to return to main menu.', 'polite');
  //       }
  //     }, 150);
  //   }
  // }, []);

  // Detect keyboard usage
  useEffect(() => {
    const handleKeyDown = () => setIsKeyboardUser(true);
    const handleMouseDown = () => setIsKeyboardUser(false);

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Color themes for different topics
  const topicColors = [
    { primary: '#3b82f6', secondary: '#eff6ff', accent: '#1e40af' }, // Blue - Requirements Analysis
    { primary: '#059669', secondary: '#ecfdf5', accent: '#047857' }, // Green - Platform Architecture
    { primary: '#7c3aed', secondary: '#f3e8ff', accent: '#5b21b6' }, // Purple - Monitoring
    { primary: '#dc2626', secondary: '#fef2f2', accent: '#991b1b' }, // Red - Microservices
    { primary: '#ea580c', secondary: '#fff7ed', accent: '#c2410c' }, // Orange - Risk Analytics
    { primary: '#0891b2', secondary: '#f0f9ff', accent: '#0e7490' }, // Cyan - Real-time Monitoring
    { primary: '#7c2d12', secondary: '#fef7f0', accent: '#92400e' }, // Brown - Data Pipelines
    { primary: '#be123c', secondary: '#fdf2f8', accent: '#9f1239' }, // Rose - Messaging
    { primary: '#4338ca', secondary: '#eef2ff', accent: '#3730a3' }, // Indigo - Performance
    { primary: '#059669', secondary: '#f0fdf4', accent: '#047857' }  // Emerald - Cloud Infrastructure
  ];

  const technicalPoints = [
    {
      icon: <GitBranch className="w-5 h-5" />,
      title: "Engaged directly with rates trading desk and risk managers to analyze complex VaR/CVaR calculation requirements",
      colorTheme: topicColors[0],
      subSections: [
        {
          icon: <Target className="w-4 h-4" />,
          title: "What did this accomplish",
          content: {
            items: [
              "Reduced requirements gathering time from 2 weeks to 3 days through structured domain modeling",
              "Achieved 95% first-time acceptance rate on technical designs by trading desk",
              "Enabled traders to customize risk calculations without IT intervention",
              "Decreased time-to-market for new risk metrics from 3 months to 2 weeks"
            ]
          }
        },
        {
          icon: <Settings className="w-4 h-4" />,
          title: "Technical implementation",
          content: {
            items: [
              "Created domain models using DDD with bounded contexts: TradingContext, RiskContext, MarketDataContext",
              "Implemented requirement patterns as Spring components with configurable parameters",
              "Built configurable risk calculation engines using Strategy pattern for different VaR methodologies",
              "Designed RESTful API contracts with OpenAPI 3.0 specifications for trader integration"
            ],
            code: `/**
 * CLASS: Core Java class demonstrating object-oriented design principles
 * - Encapsulation: Private fields with controlled access
 * - Inheritance: Extends Spring Component capabilities
 * - Polymorphism: Implements VaRStrategy interface for flexible calculation methods
 * - Abstraction: Hides complex VaR calculation details behind simple interface
 */
@Component  // Spring annotation for dependency injection and IoC container management
public class HistoricalVaRCalculator implements VaRStrategy {

    // CLASS FIELDS: Instance variables demonstrating data encapsulation
    @Value("\${risk.var.confidence-level:0.99}")  // Dependency injection from properties
    private double confidenceLevel;  // Encapsulated field - accessed via methods only

    @Value("\${risk.var.historical-days:252}")
    private int historicalDays;  // Business rule: 252 trading days = 1 year

    // INTERFACE: VaRStrategy defines contract for different calculation methods
    // This demonstrates interface segregation principle - clients depend on abstractions
    @Override  // FUNCTION: Method override from VaRStrategy interface
    public VaRResult calculate(Portfolio portfolio) {
        /**
         * FUNCTION: Core business method demonstrating:
         * - Single Responsibility: Only calculates VaR
         * - Open/Closed: Extensible via strategy pattern
         * - Dependency Inversion: Depends on Portfolio abstraction, not concrete class
         */

        // MODULE: Risk calculation logic organized in cohesive, loosely coupled modules
        RiskEngine riskEngine = createRiskEngine();  // Factory method pattern

        // FUNCTION: Private helper method for calculation steps
        List<Double> returns = calculateHistoricalReturns(portfolio);

        // CLASS: Using Java Collections framework classes
        Collections.sort(returns);  // Static method call on Collections class

        // FUNCTION: Mathematical calculation using class methods
        double varValue = calculatePercentile(returns, confidenceLevel);

        // CLASS: Builder pattern for creating immutable result objects
        return VaRResult.builder()
            .value(varValue)
            .confidenceLevel(confidenceLevel)
            .portfolioId(portfolio.getId())
            .calculationDate(LocalDate.now())  // CLASS: Using Java time API
            .build();
    }

    /**
     * FUNCTION: Private helper method demonstrating method encapsulation
     * - Access modifier controls visibility (private = internal implementation)
     * - Return type and parameters define function signature
     * - Single responsibility: only calculates historical returns
     */
    private List<Double> calculateHistoricalReturns(Portfolio portfolio) {
        // MODULE: Data access layer - separate concern from business logic
        return portfolioDataService.getHistoricalPrices(portfolio, historicalDays)
            .stream()  // FUNCTION: Using Java 8+ functional programming
            .map(this::calculateDailyReturn)  // METHOD REFERENCE: Function composition
            .collect(Collectors.toList());  // CLASS: Collectors utility class
    }

    /**
     * INTERFACE: Functional interface example (can be lambda)
     * Function<Price, Double> represents a function that takes Price and returns Double
     */
    private double calculateDailyReturn(Price price) {
        // FUNCTION: Pure function - no side effects, deterministic output
        return (price.getCurrent() - price.getPrevious()) / price.getPrevious();
    }

    /**
     * MODULE: Factory method pattern for creating risk engine instances
     * Demonstrates modular design where different risk engines can be plugged in
     */
    private RiskEngine createRiskEngine() {
        // CLASS: Conditional instantiation based on configuration
        switch (riskEngineType) {
            case "MONTE_CARLO":
                return new MonteCarloRiskEngine();  // CLASS: Concrete implementation
            case "HISTORICAL":
                return new HistoricalRiskEngine();  // CLASS: Different implementation
            default:
                throw new IllegalArgumentException("Unknown risk engine type");
        }
    }
}`
          }
        },
        {
          icon: <AlertCircle className="w-4 h-4" />,
          title: "Challenges",
          content: {
            items: [
              "Challenge: Traders used inconsistent terminology across desks → Solution: Created ubiquitous language dictionary with 200+ terms",
              "Challenge: Conflicting requirements from different trading desks → Solution: Implemented feature flags for desk-specific calculations",
              "Challenge: Non-technical stakeholders struggled with API specs → Solution: Built interactive Swagger UI with example requests",
              "Challenge: Frequent requirement changes → Solution: Implemented configuration-driven architecture with hot-reload capability"
            ]
          }
        }
      ]
    },
    {
      icon: <Server className="w-5 h-5" />,
      title: "Architected and built enterprise VaR/CVaR risk calculation platform processing real-time market data, supporting $2B+ daily trading decisions with 99.99% accuracy",
      colorTheme: topicColors[1],
      subSections: [
        {
          icon: <Target className="w-4 h-4" />,
          title: "What did this accomplish",
          content: {
            items: [
              "Achieved 99.99% uptime (only 52 minutes downtime annually) supporting critical trading operations",
              "Processed $2B+ in daily trading volumes without a single calculation error in production",
              "Reduced regulatory audit findings from 15 to 0 through automated accuracy validation",
              "Enabled real-time risk-based trading decisions vs end-of-day batch processing"
            ]
          }
        },
        {
          icon: <Settings className="w-4 h-4" />,
          title: "Technical implementation",
          content: {
            items: [
              "Deployed across 3 AWS availability zones with Spring Cloud LoadBalancer",
              "Implemented circuit breakers using Resilience4j with fallback methods",
              "Database replication with Oracle RAC for zero downtime",
              "Built automated reconciliation service comparing calculations against Bloomberg MARS"
            ],
            code: `@CircuitBreaker(name = "market-data", fallbackMethod = "getCachedMarketData")
@Retry(name = "market-data", maxAttempts = 3)
public MarketData fetchRealTimeData(String instrumentId) {
    return marketDataClient.fetch(instrumentId);
}

@Component
public class AccuracyValidator {
    @Scheduled(fixedDelay = 300000) // Every 5 minutes
    public void validateCalculations() {
        var internalResults = getLatestCalculations();
        var bloombergResults = bloombergClient.getMARSResults();
        reconciliationService.compare(internalResults, bloombergResults);
    }
}`
          }
        },
        {
          icon: <AlertCircle className="w-4 h-4" />,
          title: "Challenges",
          content: {
            items: [
              "Challenge: Network partitions causing split-brain scenarios → Solution: Implemented Raft consensus algorithm for leader election",
              "Challenge: Data inconsistency across zones during high volatility → Solution: Event sourcing with eventual consistency model",
              "Challenge: Memory pressure during market opens → Solution: Off-heap memory allocation and object pooling",
              "Challenge: Reconciliation failures with Bloomberg → Solution: Implemented fuzzy matching with configurable tolerance levels"
            ]
          }
        }
      ]
    },
    {
      icon: <Monitor className="w-5 h-5" />,
      title: "Implemented real-time monitoring dashboards using Prometheus/Grafana for API performance tracking",
      colorTheme: topicColors[2],
      subSections: [
        {
          icon: <Target className="w-4 h-4" />,
          title: "What did this accomplish",
          content: {
            items: [
              "Reduced mean time to detection (MTTD) from 15 minutes to 30 seconds",
              "Decreased incident resolution time by 75% through actionable alerts",
              "Prevented 20+ potential outages through proactive monitoring",
              "Enabled business users to self-monitor their portfolio calculations"
            ]
          }
        },
        {
          icon: <Settings className="w-4 h-4" />,
          title: "Technical implementation",
          content: {
            items: [
              "Configured Micrometer with custom metrics for business KPIs",
              "Created 15 Grafana dashboards with role-based access control",
              "Implemented custom alerting rules with PagerDuty integration",
              "Built API performance tracking with percentile distributions"
            ],
            code: `@Configuration
public class MetricsConfig {
    @Bean
    public MeterRegistryCustomizer<MeterRegistry> metricsCustomizer() {
        return registry -> registry.config()
            .commonTags("application", "risk-platform")
            .commonTags("region", getAwsRegion());
    }
}

@RestController
public class RiskController {
    private final MeterRegistry meterRegistry;

    @GetMapping("/calculate/{portfolioId}")
    @Timed(value = "var.calculation", percentiles = {0.5, 0.95, 0.99})
    public VaRResult calculateVaR(@PathVariable String portfolioId) {
        return Metrics.timer("var.calculation")
            .tag("portfolio.type", getPortfolioType(portfolioId))
            .record(() -> varService.calculate(portfolioId));
    }
}`
          }
        },
        {
          icon: <AlertCircle className="w-4 h-4" />,
          title: "Challenges",
          content: {
            items: [
              "Challenge: High cardinality metrics causing Prometheus OOM → Solution: Implemented metric aggregation and sampling strategies",
              "Challenge: Dashboard performance with 1M+ data points → Solution: Pre-aggregated metrics using recording rules",
              "Challenge: Alert fatigue from noisy metrics → Solution: Implemented smart alerting with anomaly detection",
              "Challenge: Grafana dashboard version control → Solution: Automated dashboard provisioning via Terraform"
            ]
          }
        }
      ]
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Designed event-driven microservices using Spring Boot for risk computations, reducing calculation time from 30 minutes to under 2 minutes",
      colorTheme: topicColors[3],
      subSections: [
        {
          icon: <Target className="w-4 h-4" />,
          title: "What did this accomplish",
          content: {
            items: [
              "Enabled near real-time risk updates vs 30-minute batch cycles",
              "Increased trader satisfaction score from 6/10 to 9/10",
              "Reduced infrastructure costs by 40% through efficient resource utilization",
              "Allowed risk-based automated trading strategies previously impossible with slow calculations"
            ]
          }
        },
        {
          icon: <Settings className="w-4 h-4" />,
          title: "Technical implementation",
          content: {
            items: [
              "Decomposed monolith into 12 microservices with bounded contexts",
              "Implemented event streaming with Spring Cloud Stream",
              "Parallel processing using ForkJoinPool with dynamic thread sizing",
              "In-memory computation grid with Hazelcast for distributed calculations"
            ],
            code: `@SpringBootApplication
@EnableAsync
public class RiskCalculationService {
    @Bean
    public TaskExecutor riskCalculationExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(Runtime.getRuntime().availableProcessors());
        executor.setMaxPoolSize(Runtime.getRuntime().availableProcessors() * 2);
        executor.setQueueCapacity(1000);
        executor.setThreadNamePrefix("risk-calc-");
        return executor;
    }

    @EventListener
    @Async("riskCalculationExecutor")
    public void handlePositionUpdate(PositionUpdatedEvent event) {
        var chunks = partitionPortfolio(event.getPortfolio(), 1000);
        var futures = chunks.stream()
            .map(chunk -> CompletableFuture.supplyAsync(
                () -> calculateChunkVaR(chunk), riskCalculationExecutor))
            .collect(Collectors.toList());

        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
            .thenApply(v -> aggregateResults(futures))
            .thenAccept(result -> publishResult(result));
    }
}`
          }
        },
        {
          icon: <AlertCircle className="w-4 h-4" />,
          title: "Challenges",
          content: {
            items: [
              "Challenge: Data consistency across microservices → Solution: Implemented Saga pattern with compensating transactions",
              "Challenge: Service discovery overhead → Solution: Client-side load balancing with Ribbon and caching",
              "Challenge: Debugging distributed transactions → Solution: Distributed tracing with Sleuth and Zipkin",
              "Challenge: Managing 12 service deployments → Solution: GitOps with ArgoCD and progressive rollouts"
            ]
          }
        }
      ]
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Implemented complex risk analytics with Java and optimized PL/SQL procedures for derivatives pricing, improving accuracy by 15%",
      colorTheme: topicColors[4],
      subSections: [
        {
          icon: <Target className="w-4 h-4" />,
          title: "What did this accomplish",
          content: {
            items: [
              "Reduced pricing discrepancies with market from ±5% to ±0.5%",
              "Enabled trading of exotic derivatives worth $500M+ annually",
              "Cut derivative pricing time from 10 seconds to 500ms per instrument",
              "Achieved regulatory approval for internal pricing models"
            ]
          }
        },
        {
          icon: <Settings className="w-4 h-4" />,
          title: "Technical implementation",
          content: {
            items: [
              "Built Monte Carlo engine with 100,000 paths for path-dependent options",
              "Implemented finite difference methods for American options",
              "Optimized PL/SQL with bulk operations and parallel execution",
              "Created caching layer for frequently used volatility surfaces"
            ],
            code: `@Component
public class MonteCarloEngine {
    private final ForkJoinPool customThreadPool = new ForkJoinPool(32);

    public BigDecimal priceExoticOption(ExoticOption option, MarketData data) {
        try {
            return customThreadPool.submit(() ->
                IntStream.range(0, 100_000)
                    .parallel()
                    .mapToObj(i -> {
                        var path = generatePath(option, data, new MersenneTwister(i));
                        return calculatePayoff(option, path);
                    })
                    .reduce(BigDecimal.ZERO, BigDecimal::add)
                    .divide(BigDecimal.valueOf(100_000), MathContext.DECIMAL128)
            ).get();
        } catch (Exception e) {
            throw new PricingException("Monte Carlo simulation failed", e);
        }
    }
}

-- Optimized PL/SQL procedure
CREATE OR REPLACE PROCEDURE calc_yield_curve_parallel(
    p_curve_date DATE,
    p_currency VARCHAR2
) AS
BEGIN
    DBMS_PARALLEL_EXECUTE.CREATE_TASK('YIELD_CURVE_CALC');
    DBMS_PARALLEL_EXECUTE.CREATE_CHUNKS_BY_ROWID(
        task_name => 'YIELD_CURVE_CALC',
        table_owner => 'RISK',
        table_name => 'MARKET_RATES',
        by_rowid => TRUE,
        chunk_size => 10000
    );
    -- Parallel execution logic
END;`
          }
        },
        {
          icon: <AlertCircle className="w-4 h-4" />,
          title: "Challenges",
          content: {
            items: [
              "Challenge: Random number generation bottleneck → Solution: Implemented SIMD-optimized Mersenne Twister",
              "Challenge: Memory overflow with large option portfolios → Solution: Streaming calculations with bounded queues",
              "Challenge: Numerical instability in extreme scenarios → Solution: Adaptive mesh refinement for PDE solvers",
              "Challenge: Database locks during bulk calculations → Solution: Partitioned tables with parallel DML"
            ]
          }
        }
      ]
    },
    {
      icon: <BarChart className="w-5 h-5" />,
      title: "Developed real-time risk monitoring solutions for rates products and swaps across 50+ currency pairs",
      colorTheme: topicColors[5],
      subSections: [
        {
          icon: <Target className="w-4 h-4" />,
          title: "What did this accomplish",
          content: {
            items: [
              "Enabled traders to monitor risk exposure in real-time vs hourly updates",
              "Prevented $10M+ in potential losses through instant limit breach alerts",
              "Supported expansion into emerging market currencies increasing revenue by 20%",
              "Reduced manual risk report generation from 2 hours to instant access"
            ]
          }
        },
        {
          icon: <Settings className="w-4 h-4" />,
          title: "Technical implementation",
          content: {
            items: [
              "Built WebSocket infrastructure supporting 5000+ concurrent connections",
              "Implemented FX rate triangulation for cross-currency calculations",
              "Created real-time P&L aggregation across multiple trading books",
              "Developed custom STOMP protocol for efficient data streaming"
            ],
            code: `@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic/risk", "/queue/alerts");
        config.setApplicationDestinationPrefixes("/app");
        config.setCacheLimit(1024 * 1024); // 1MB cache per connection
    }
}

@MessageMapping("/risk/subscribe/{portfolioId}")
@SendToUser("/topic/risk/updates")
public Flux<RiskUpdate> streamRiskUpdates(@PathVariable String portfolioId) {
    return Flux.interval(Duration.ofSeconds(1))
        .map(tick -> calculateIncrementalRisk(portfolioId))
        .filter(update -> update.hasChanged())
        .doOnNext(update -> auditRiskChange(update));
}`
          }
        },
        {
          icon: <AlertCircle className="w-4 h-4" />,
          title: "Challenges",
          content: {
            items: [
              "Challenge: WebSocket connection drops during network issues → Solution: Implemented reconnection with message replay",
              "Challenge: Cross-currency rate inconsistencies → Solution: Built arbitrage-free rate construction algorithm",
              "Challenge: Memory leaks with long-lived connections → Solution: Weak reference caching with TTL",
              "Challenge: Real-time aggregation performance → Solution: Pre-computed materialized views with delta updates"
            ]
          }
        }
      ]
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: "Built high-performance data pipelines using functional programming, processing 10M+ market data points per minute",
      colorTheme: topicColors[6],
      subSections: [
        {
          icon: <Target className="w-4 h-4" />,
          title: "What did this accomplish",
          content: {
            items: [
              "Achieved sub-millisecond latency for market data processing",
              "Handled 10x traffic spike during volatile markets without degradation",
              "Reduced data infrastructure costs by 60% through efficient processing",
              "Enabled alpha generation strategies requiring ultra-low latency data"
            ]
          }
        },
        {
          icon: <Settings className="w-4 h-4" />,
          title: "Technical implementation",
          content: {
            items: [
              "Implemented lock-free ring buffer using LMAX Disruptor",
              "Built zero-copy serialization with Kryo and direct ByteBuffers",
              "Used Chronicle Map for off-heap storage of 100M+ price points",
              "Designed parallel stream processing with custom ForkJoinPool"
            ],
            code: `/**
 * CLASS: High-performance market data processing pipeline
 * Demonstrates advanced Java concepts for real-time financial data processing
 * - Class design with composition over inheritance
 * - Generic types for type safety and reusability
 * - Functional programming with method references
 * - Concurrent programming patterns for high-throughput processing
 */
public class MarketDataPipeline {

    // CLASS FIELDS: Final fields for immutability and thread safety
    private final Disruptor<MarketDataEvent> disruptor;  // Generic type parameter <T>
    private final ChronicleMap<String, MarketData> offHeapCache;  // Generic Map interface

    /**
     * FUNCTION: Constructor demonstrating builder pattern and dependency injection
     * Shows proper initialization of complex objects with configuration
     */
    public MarketDataPipeline() {
        // CLASS: Using Disruptor library for lock-free concurrent programming
        this.disruptor = new Disruptor<>(
            MarketDataEvent::new,  // METHOD REFERENCE: Functional interface implementation
            1024 * 1024, // 1M events ring buffer - power of 2 for performance
            DaemonThreadFactory.INSTANCE,  // CLASS: Factory pattern for thread creation
            ProducerType.MULTI,  // ENUM: Type-safe constants instead of magic numbers
            new YieldingWaitStrategy()  // CLASS: Strategy pattern for different wait strategies
        );

        // CLASS: Builder pattern for complex object construction
        this.offHeapCache = ChronicleMap
            .of(String.class, MarketData.class)  // Generic type specification
            .entries(100_000_000L)  // 100M entries for massive scale
            .averageKeySize(20)  // Memory optimization parameters
            .averageValueSize(200)
            .create();  // FUNCTION: Factory method to create configured instance
    }

    /**
     * FUNCTION: Core processing method demonstrating functional programming
     * Uses Java 8+ streams for declarative data processing pipeline
     *
     * @param stream - INPUT: Stream of raw market data (functional interface)
     * Benefits of functional approach:
     * - Immutable operations reduce bugs
     * - Parallel processing for performance
     * - Composable operations for maintainability
     */
    public void processMarketDataStream(Stream<RawMarketData> stream) {
        stream.parallel()  // FUNCTION: Parallel processing for multi-core utilization
            .filter(this::isValid)  // METHOD REFERENCE: Predicate functional interface
            .map(this::enrichWithMetadata)  // METHOD REFERENCE: Function transformation
            .collect(Collectors.groupingByConcurrent(  // CLASS: Concurrent collector
                RawMarketData::getInstrumentId,  // METHOD REFERENCE: Key extractor function
                ConcurrentHashMap::new,  // METHOD REFERENCE: Map supplier function
                Collectors.collectingAndThen(  // FUNCTION: Downstream collector composition
                    Collectors.toList(),  // CLASS: Built-in collector for aggregation
                    list -> aggregateToOHLC(list)  // LAMBDA: Transformation function
                )
            ))
            .forEach((instrumentId, ohlc) -> {  // LAMBDA: Consumer functional interface
                publishToDisruptor(ohlc);  // FUNCTION: Async event publishing
                offHeapCache.put(instrumentId, ohlc);  // INTERFACE: Map.put() method
            });
    }

    /**
     * FUNCTION: Validation method demonstrating predicate pattern
     * Pure function - no side effects, deterministic behavior
     */
    private boolean isValid(RawMarketData data) {
        // FUNCTION: Business logic encapsulated in reusable method
        return data != null
            && data.getPrice() > 0
            && data.getTimestamp() != null
            && data.getInstrumentId() != null;
    }

    /**
     * FUNCTION: Data enrichment method showing transformation pattern
     * Demonstrates single responsibility principle - one clear purpose
     */
    private MarketData enrichWithMetadata(RawMarketData raw) {
        // CLASS: Builder pattern for creating enriched data objects
        return MarketData.builder()
            .price(raw.getPrice())
            .volume(raw.getVolume())
            .timestamp(raw.getTimestamp())
            .instrumentId(raw.getInstrumentId())
            .exchange(raw.getExchange())
            .processingTime(System.currentTimeMillis())  // Add processing metadata
            .build();
    }

    /**
     * INTERFACE: Functional interface for OHLC aggregation
     * Could be implemented as lambda: List<MarketData> -> OHLCData
     */
    private OHLCData aggregateToOHLC(List<MarketData> prices) {
        // FUNCTION: Statistical aggregation using functional programming
        DoubleSummaryStatistics stats = prices.stream()
            .mapToDouble(MarketData::getPrice)  // METHOD REFERENCE: Extract price
            .summaryStatistics();  // CLASS: Built-in statistical collector

        // CLASS: Immutable data object with fluent builder
        return OHLCData.builder()
            .open(prices.get(0).getPrice())  // First price
            .high(stats.getMax())  // Maximum price
            .low(stats.getMin())   // Minimum price
            .close(prices.get(prices.size() - 1).getPrice())  // Last price
            .volume(prices.stream().mapToLong(MarketData::getVolume).sum())
            .build();
    }

    /**
     * MODULE: Event publishing to other system modules
     * Demonstrates loose coupling through event-driven architecture
     */
    private void publishToDisruptor(OHLCData ohlc) {
        // INTERFACE: Disruptor's RingBuffer for lock-free publishing
        disruptor.publishEvent((event, sequence) -> event.setData(ohlc));
    }
}`
          }
        },
        {
          icon: <AlertCircle className="w-4 h-4" />,
          title: "Challenges",
          content: {
            items: [
              "Challenge: GC pauses during high throughput → Solution: Off-heap memory and object pooling",
              "Challenge: Backpressure during market volatility → Solution: Adaptive batching with flow control",
              "Challenge: Data quality issues from multiple sources → Solution: Multi-stage validation pipeline with quarantine",
              "Challenge: Memory-mapped file corruption → Solution: Checksumming and automatic recovery mechanism"
            ]
          }
        }
      ]
    },
    {
      icon: <Server className="w-5 h-5" />,
      title: "Integrated RabbitMQ messaging for asynchronous workflows, achieving 5x throughput improvement",
      colorTheme: topicColors[7],
      subSections: [
        {
          icon: <Target className="w-4 h-4" />,
          title: "What did this accomplish",
          content: {
            items: [
              "Increased message throughput from 10K to 50K messages per second",
              "Achieved zero message loss during RabbitMQ cluster failures",
              "Reduced end-to-end calculation latency by 80% through async processing",
              "Enabled horizontal scaling of risk calculations across 20 nodes"
            ]
          }
        },
        {
          icon: <Settings className="w-4 h-4" />,
          title: "Technical implementation",
          content: {
            items: [
              "Configured RabbitMQ cluster with 3 nodes and mirrored queues",
              "Implemented priority queues with 10 levels for urgent calculations",
              "Optimized prefetch count and consumer concurrency settings",
              "Built custom retry mechanism with exponential backoff"
            ],
            code: `@Configuration
public class RabbitMQConfig {
    @Bean
    public ConnectionFactory connectionFactory() {
        CachingConnectionFactory factory = new CachingConnectionFactory();
        factory.setAddresses("rmq1:5672,rmq2:5672,rmq3:5672");
        factory.setChannelCacheSize(100);
        factory.setConnectionCacheSize(10);
        factory.setPublisherConfirmType(ConfirmType.CORRELATED);
        return factory;
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMandatory(true);
        template.setConfirmCallback((correlationData, ack, cause) -> {
            if (!ack) {
                log.error("Message not delivered: {}", cause);
                republishToDeadLetter(correlationData);
            }
        });

        // Custom retry interceptor
        template.setRetryTemplate(retryTemplate());
        return template;
    }

    @Bean
    public SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory() {
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory());
        factory.setConcurrentConsumers(10);
        factory.setMaxConcurrentConsumers(20);
        factory.setPrefetchCount(50);
        factory.setDefaultRequeueRejected(false);
        factory.setAdviceChain(retryInterceptor());
        return factory;
    }
}`
          }
        },
        {
          icon: <AlertCircle className="w-4 h-4" />,
          title: "Challenges",
          content: {
            items: [
              "Challenge: Message ordering requirements → Solution: Consistent hashing with single consumer per partition key",
              "Challenge: Memory pressure with large messages → Solution: Claim check pattern with S3 for payloads >1MB",
              "Challenge: Poison message blocking queues → Solution: Dead letter exchange with automated alerting",
              "Challenge: Network partitions causing duplicates → Solution: Idempotency keys with Redis deduplication"
            ]
          }
        }
      ]
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Reduced risk calculation latency by 60% through optimization",
      colorTheme: topicColors[8],
      subSections: [
        {
          icon: <Target className="w-4 h-4" />,
          title: "What did this accomplish",
          content: {
            items: [
              "Enabled traders to execute trades within market windows previously missed",
              "Reduced infrastructure requirements by 40% through efficiency gains",
              "Achieved <100ms P99 latency for risk calculations",
              "Improved trader decision speed leading to $5M+ additional revenue"
            ]
          }
        },
        {
          icon: <Settings className="w-4 h-4" />,
          title: "Technical implementation",
          content: {
            items: [
              "Implemented multi-tier caching strategy with Caffeine and Redis",
              "Optimized database queries with covering indexes and partitioning",
              "JVM tuning for low-latency GC with G1GC and region sizing",
              "Connection pooling optimization with HikariCP"
            ],
            code: `@Configuration
public class CacheConfig {
    @Bean
    public CacheManager cacheManager() {
        SimpleCacheManager cacheManager = new SimpleCacheManager();
        cacheManager.setCaches(Arrays.asList(
            buildCache("varCache", 10000, 15, TimeUnit.MINUTES),
            buildCache("marketDataCache", 50000, 1, TimeUnit.MINUTES),
            buildCache("portfolioCache", 5000, 30, TimeUnit.MINUTES)
        ));
        return cacheManager;
    }

    private Cache buildCache(String name, int maxSize, long ttl, TimeUnit unit) {
        return new CaffeineCache(name,
            Caffeine.newBuilder()
                .maximumSize(maxSize)
                .expireAfterWrite(ttl, unit)
                .recordStats()
                .build());
    }
}

// JVM flags for optimization
// -XX:+UseG1GC
// -XX:MaxGCPauseMillis=50
// -XX:G1HeapRegionSize=32m
// -XX:+ParallelRefProcEnabled
// -XX:+AlwaysPreTouch
// -Xms16g -Xmx16g

// Database optimization
CREATE INDEX idx_portfolio_calc_covering
ON portfolio_calculations(portfolio_id, calc_date, calc_type)
INCLUDE (var_result, cvar_result, calc_metadata)
WHERE calc_date >= DATEADD(day, -30, GETDATE());`
          }
        },
        {
          icon: <AlertCircle className="w-4 h-4" />,
          title: "Challenges",
          content: {
            items: [
              "Challenge: Cache invalidation complexity → Solution: Event-driven cache eviction with TTL fallback",
              "Challenge: Hot partitions in database → Solution: Composite partition key with hash distribution",
              "Challenge: GC pauses during market open → Solution: Pre-touch memory pages and object pooling",
              "Challenge: Network latency to database → Solution: Read replicas with smart routing"
            ]
          }
        }
      ]
    },
    {
      icon: <Cloud className="w-5 h-5" />,
      title: "Designed AWS cloud infrastructure for scalable risk calculation workloads, cutting costs by 40%",
      colorTheme: topicColors[9],
      subSections: [
        {
          icon: <Target className="w-4 h-4" />,
          title: "What did this accomplish",
          content: {
            items: [
              "Reduced infrastructure costs from $200K to $120K monthly",
              "Achieved auto-scaling from 10 to 200 instances within 2 minutes",
              "Maintained 99.99% availability across all AWS regions",
              "Enabled disaster recovery with 15-minute RTO and 5-minute RPO"
            ]
          }
        },
        {
          icon: <Settings className="w-4 h-4" />,
          title: "Technical implementation",
          content: {
            items: [
              "Designed auto-scaling EC2 clusters with custom CloudWatch metrics",
              "Implemented S3 data lifecycle with intelligent tiering",
              "Built serverless EOD calculations using Step Functions and Lambda",
              "Containerized services with EKS and Fargate for burst capacity"
            ],
            code: `# Terraform infrastructure as code
resource "aws_autoscaling_group" "risk_calc_asg" {
  name                = "risk-calculation-cluster"
  min_size            = 10
  max_size            = 200
  desired_capacity    = var.base_capacity
  target_group_arns   = [aws_lb_target_group.risk_api.arn]

  mixed_instances_policy {
    instances_distribution {
      on_demand_base_capacity = 10
      spot_allocation_strategy = "capacity-optimized"
      spot_instance_pools = 3
    }

    launch_template {
      launch_template_specification {
        launch_template_id = aws_launch_template.risk_calc.id
        version = "$Latest"
      }

      override {
        instance_type = "c5.4xlarge"
        weighted_capacity = 1
      }

      override {
        instance_type = "c5a.4xlarge"
        weighted_capacity = 1
      }
    }
  }

  enabled_metrics = [
    "GroupMinSize",
    "GroupMaxSize",
    "GroupDesiredCapacity",
    "GroupInServiceInstances"
  ]

  tag {
    key                 = "Name"
    value               = "risk-calc-node"
    propagate_at_launch = true
  }
}

# Auto-scaling policy
resource "aws_autoscaling_policy" "risk_calc_policy" {
  name                   = "risk-calc-target-tracking"
  autoscaling_group_name = aws_autoscaling_group.risk_calc_asg.name
  policy_type           = "TargetTrackingScaling"

  target_tracking_configuration {
    target_value = 70.0

    customized_metric_specification {
      metric_dimension {
        name  = "QueueName"
        value = "RiskCalculationQueue"
      }
      metric_name = "ApproximateNumberOfMessagesVisible"
      namespace   = "AWS/SQS"
      statistic   = "Average"
    }
  }
}`
          }
        },
        {
          icon: <AlertCircle className="w-4 h-4" />,
          title: "Challenges",
          content: {
            items: [
              "Challenge: Spot instance terminations during calculations → Solution: Checkpointing to S3 with automatic resume",
              "Challenge: Cross-region data transfer costs → Solution: Regional data replication with eventual consistency",
              "Challenge: Lambda cold starts affecting SLAs → Solution: Provisioned concurrency and container reuse",
              "Challenge: Kubernetes pod scheduling delays → Solution: Cluster autoscaler with overprovisioning"
            ]
          }
        }
      ]
    }
  ];

  const techStack = ["Java 15", "Spring Boot", "Oracle", "PL/SQL", "RabbitMQ", "AWS", "Docker", "Kubernetes", "Microservices"];

  return (
    <div
      ref={componentRef}
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: '#f8fafc',
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
      <div style={{ marginBottom: '3rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '2.5rem',
          borderRadius: '16px',
          color: 'white',
          marginBottom: '2rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          position: 'relative'
        }}>
          {onBack && (
            <button
              ref={backButtonRef}
              onClick={(e) => {
                e.stopPropagation();
                onBack();
              }}
              aria-label="Go back to main menu"
              style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '8px',
                padding: '0.75rem',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(10px)',
                ...(isKeyboardUser && {
                  outline: '3px solid rgba(255, 255, 255, 0.8)',
                  outlineOffset: '2px'
                })
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(0)';
              }}
              onFocus={() => setIsKeyboardUser(true)}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Menu
            </button>
          )}
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            VaR/CVaR Risk Calculation Platform
          </h1>
          <p style={{
            fontSize: '1.25rem',
            opacity: 0.95,
            lineHeight: '1.7'
          }}>
            Enterprise-grade risk analytics system processing real-time market data for $2B+ daily trading decisions
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          justifyContent: 'center'
        }}>
          {techStack.map((tech, index) => (
            <span key={index} style={{
              padding: '0.75rem 1.25rem',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              color: 'white',
              borderRadius: '25px',
              fontSize: '0.875rem',
              fontWeight: '600',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {technicalPoints.map((point, index) => (
          <div key={index} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: `0 4px 6px -1px ${point.colorTheme.primary}20, 0 2px 4px -1px ${point.colorTheme.primary}10`,
            border: `2px solid ${point.colorTheme.primary}30`,
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}>
            <button
              ref={el => itemRefs.current[index] = el}
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(index);
              }}
              aria-expanded={expandedItems[index]}
              aria-label={`${point.title} - ${expandedItems[index] ? 'Expanded' : 'Collapsed'}`}
              style={{
                width: '100%',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: expandedItems[index] ? `${point.colorTheme.secondary}` : 'white',
                border: focusedItemIndex === index && focusedSubItemIndex === -1 && isKeyboardUser ? `3px solid ${point.colorTheme.primary}` : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                borderBottom: expandedItems[index] ? `2px solid ${point.colorTheme.primary}40` : 'none',
                outline: focusedItemIndex === index && focusedSubItemIndex === -1 && isKeyboardUser ? `2px solid ${point.colorTheme.primary}` : 'none',
                outlineOffset: '2px',
                transform: focusedItemIndex === index && isKeyboardUser ? 'scale(1.02)' : 'scale(1)'
              }}
              onMouseEnter={(e) => {
                if (!expandedItems[index]) {
                  e.target.style.backgroundColor = `${point.colorTheme.secondary}50`;
                }
              }}
              onMouseLeave={(e) => {
                if (!expandedItems[index]) {
                  e.target.style.backgroundColor = 'white';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left', flex: 1 }}>
                <div style={{
                  color: point.colorTheme.primary,
                  backgroundColor: point.colorTheme.secondary,
                  padding: '0.75rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px solid ${point.colorTheme.primary}20`
                }}>
                  {point.icon}
                </div>
                <span style={{
                  fontWeight: '600',
                  color: '#1f2937',
                  fontSize: '1.1rem',
                  lineHeight: '1.5'
                }}>
                  {point.title}
                </span>
              </div>
              <div style={{ color: '#9ca3af', marginLeft: '1rem' }}>
                {expandedItems[index] ? <ChevronDown className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
              </div>
            </button>

            {expandedItems[index] && (
              <div style={{ borderTop: '1px solid #e5e7eb' }}>
                {point.subSections.map((subSection, subIndex) => (
                  <div key={subIndex} style={{
                    borderBottom: subIndex < point.subSections.length - 1 ? '1px solid #f3f4f6' : 'none'
                  }}>
                    <button
                      ref={el => subItemRefs.current[`${index}-${subIndex}`] = el}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubExpand(index, subIndex);
                      }}
                      aria-expanded={expandedSubItems[`${index}-${subIndex}`]}
                      aria-label={`${subSection.title} - ${expandedSubItems[`${index}-${subIndex}`] ? 'Expanded' : 'Collapsed'}`}
                      style={{
                        width: '100%',
                        padding: '1.25rem 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: expandedSubItems[`${index}-${subIndex}`] ? '#f8fafc' : 'white',
                        border: focusedItemIndex === index && focusedSubItemIndex === subIndex && isKeyboardUser ? '3px solid #3b82f6' : 'none',
                        outline: focusedItemIndex === index && focusedSubItemIndex === subIndex && isKeyboardUser ? '2px solid #3b82f6' : 'none',
                        outlineOffset: '2px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!expandedSubItems[`${index}-${subIndex}`]) {
                          e.target.style.backgroundColor = '#f9fafb';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!expandedSubItems[`${index}-${subIndex}`]) {
                          e.target.style.backgroundColor = 'white';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          color: subSection.title === "What did this accomplish" ? "#059669" :
                               subSection.title === "Technical implementation" ? "#3b82f6" : "#ea580c",
                          backgroundColor: subSection.title === "What did this accomplish" ? "#ecfdf5" :
                                         subSection.title === "Technical implementation" ? "#eff6ff" : "#fff7ed",
                          padding: '0.5rem',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {subSection.icon}
                        </div>
                        <span style={{
                          fontWeight: '600',
                          color: '#374151',
                          fontSize: '1rem'
                        }}>
                          {subSection.title}
                        </span>
                      </div>
                      <div style={{ color: '#9ca3af' }}>
                        {expandedSubItems[`${index}-${subIndex}`] ?
                          <ChevronDown className="w-5 h-5" /> :
                          <ChevronRight className="w-5 h-5" />
                        }
                      </div>
                    </button>

                    {expandedSubItems[`${index}-${subIndex}`] && (
                      <div style={{
                        padding: '2rem',
                        backgroundColor: '#f8fafc',
                        borderTop: '1px solid #e5e7eb'
                      }}>
                        <ul style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '1rem',
                          marginBottom: '1.5rem',
                          listStyle: 'none',
                          padding: 0
                        }}>
                          {subSection.content.items.map((item, itemIndex) => (
                            <li key={itemIndex} style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.75rem',
                              padding: '1rem',
                              backgroundColor: 'white',
                              borderRadius: '8px',
                              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                              border: '1px solid #e5e7eb'
                            }}>
                              <span style={{
                                color: '#3b82f6',
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                                marginTop: '0.125rem',
                                minWidth: '0.75rem'
                              }}>
                                •
                              </span>
                              <span style={{
                                color: '#374151',
                                lineHeight: '1.6',
                                fontSize: '0.95rem'
                              }}>
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                        {subSection.content.code && (
                          <div style={{
                            backgroundColor: '#0d1117',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            overflowX: 'auto',
                            border: '1px solid #30363d',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}>
                            <pre style={{
                              fontSize: '0.875rem',
                              fontFamily: '"Fira Code", "JetBrains Mono", "Consolas", "Monaco", monospace',
                              lineHeight: '1.6',
                              margin: 0,
                              whiteSpace: 'pre',
                              textAlign: 'left',
                              tabSize: 4
                            }}>
                              <code dangerouslySetInnerHTML={{
                                __html: highlightCode(subSection.content.code)
                              }} />
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Design Patterns panel */}
      <div style={{ marginTop: '3rem' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ margin: 0, marginBottom: '0.75rem' }}>Design Patterns</h3>
          <p style={{ marginTop: 0, color: '#6b7280' }}>Creational, Structural, Behavioral and Architectural patterns — click a pattern to view details.</p>

          {/* Patterns data (kept simple, driven by UI below) */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <div style={{ minWidth: 220 }}>
              <strong>Creational Patterns</strong>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                <button onClick={() => setSelectedPattern('singleton')} style={{ padding: '0.4rem 0.6rem', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff' }}>Singleton</button>
                <button onClick={() => setSelectedPattern('factory')} style={{ padding: '0.4rem 0.6rem', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff' }}>Factory</button>
                <button onClick={() => setSelectedPattern('builder')} style={{ padding: '0.4rem 0.6rem', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff' }}>Builder</button>
                <button onClick={() => setSelectedPattern('prototype')} style={{ padding: '0.4rem 0.6rem', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff' }}>Prototype</button>
              </div>
            </div>

            <div style={{ minWidth: 220 }}>
              <strong>Structural Patterns</strong>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                <button onClick={() => setSelectedPattern('adapter')} style={{ padding: '0.4rem 0.6rem', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff' }}>Adapter</button>
                <button onClick={() => setSelectedPattern('decorator')} style={{ padding: '0.4rem 0.6rem', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff' }}>Decorator</button>
                <button onClick={() => setSelectedPattern('facade')} style={{ padding: '0.4rem 0.6rem', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff' }}>Facade</button>
              </div>
            </div>

            <div style={{ minWidth: 220 }}>
              <strong>Behavioral Patterns</strong>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                <button onClick={() => setSelectedPattern('observer')} style={{ padding: '0.4rem 0.6rem', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff' }}>Observer</button>
                <button onClick={() => setSelectedPattern('strategy')} style={{ padding: '0.4rem 0.6rem', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff' }}>Strategy</button>
                <button onClick={() => setSelectedPattern('command')} style={{ padding: '0.4rem 0.6rem', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff' }}>Command</button>
                <button onClick={() => setSelectedPattern('state')} style={{ padding: '0.4rem 0.6rem', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff' }}>State</button>
              </div>
            </div>

            <div style={{ minWidth: 220 }}>
              <strong>Architectural Patterns</strong>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                <button onClick={() => setSelectedPattern('mvc')} style={{ padding: '0.4rem 0.6rem', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff' }}>MVC</button>
              </div>
            </div>
          </div>

          {/* Selected pattern details */}
          <div style={{ marginTop: '1rem' }}>
            {selectedPattern ? (
              <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: 8, border: '1px solid #e5e7eb' }}>
                {selectedPattern === 'singleton' && (
                  <div>
                    <h4>Singleton — creational</h4>
                    <ul>
                      <li>Thread Safety • Lazy Loading • Instance Control</li>
                      <li>Use when a single shared instance is required across the app</li>
                    </ul>
                  </div>
                )}
                {selectedPattern === 'factory' && (
                  <div>
                    <h4>Factory — creational</h4>
                    <ul>
                      <li>Object Creation • Type Safety • Flexibility</li>
                      <li>Encapsulate object instantiation behind interfaces</li>
                    </ul>
                  </div>
                )}
                {selectedPattern === 'builder' && (
                  <div>
                    <h4>Builder — creational</h4>
                    <ul>
                      <li>Complex Objects • Method Chaining • Immutability</li>
                      <li>Good for constructing objects with many optional parameters</li>
                    </ul>
                  </div>
                )}
                {selectedPattern === 'prototype' && (
                  <div>
                    <h4>Prototype — creational</h4>
                    <ul>
                      <li>Object Cloning • Dynamic Creation • Performance</li>
                      <li>Use cloning to create new instances with similar state</li>
                    </ul>
                  </div>
                )}

                {selectedPattern === 'adapter' && (
                  <div>
                    <h4>Adapter — structural</h4>
                    <ul>
                      <li>Interface Compatibility • Legacy Integration • Wrapper</li>
                    </ul>
                  </div>
                )}
                {selectedPattern === 'decorator' && (
                  <div>
                    <h4>Decorator — structural</h4>
                    <ul>
                      <li>Dynamic Behavior • Composition • Extensibility</li>
                    </ul>
                  </div>
                )}
                {selectedPattern === 'facade' && (
                  <div>
                    <h4>Facade — structural</h4>
                    <ul>
                      <li>Simplified Interface • Subsystem Hiding • Unified API</li>
                    </ul>
                  </div>
                )}

                {selectedPattern === 'observer' && (
                  <div>
                    <h4>Observer — behavioral</h4>
                    <ul>
                      <li>Event Handling • Loose Coupling • Notifications</li>
                    </ul>
                  </div>
                )}
                {selectedPattern === 'strategy' && (
                  <div>
                    <h4>Strategy — behavioral</h4>
                    <ul>
                      <li>Algorithm Selection • Runtime Switching • Polymorphism</li>
                    </ul>
                  </div>
                )}
                {selectedPattern === 'command' && (
                  <div>
                    <h4>Command — behavioral</h4>
                    <ul>
                      <li>Action Encapsulation • Undo/Redo • Queuing</li>
                    </ul>
                  </div>
                )}
                {selectedPattern === 'state' && (
                  <div>
                    <h4>State — behavioral</h4>
                    <ul>
                      <li>State Management • Behavior Switching • Context Delegation</li>
                    </ul>
                  </div>
                )}

                {selectedPattern === 'mvc' && (
                  <div>
                    <h4>MVC — architectural</h4>
                    <ul>
                      <li>Separation of Concerns • Maintainability • Testability</li>
                    </ul>
                  </div>
                )}

                <div style={{ marginTop: '0.75rem' }}>
                  <button onClick={() => setSelectedPattern(null)} style={{ padding: '0.4rem 0.6rem', borderRadius: 6 }}>Close</button>
                </div>
              </div>
            ) : (
              <div style={{ color: '#9ca3af' }}>Select a pattern to view details.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalDetails;
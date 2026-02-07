import { useState, useEffect, useRef } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

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
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ArrayList|HashMap|Optional|Stream|Exception|RuntimeException)\b/g, '<span style="color: #4ec9b0;">$1</span>')
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
      whiteSpace: 'pre',
      overflowX: 'auto',
      textAlign: 'left',
      padding: 0
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightJava(code) }} />
    </pre>
  )
}

function ProductionSupport({ onBack, breadcrumb }) {
  const [selectedTopic, setSelectedTopic] = useState(null)

  const productionSupportTopics = [
    {
      id: 1,
      name: 'Incident Management',
      icon: '🚨',
      color: '#ef4444',
      description: 'Handling production incidents effectively',
      content: {
        explanation: 'Incident Management is the structured process of identifying, categorizing, prioritizing, and resolving production issues to restore normal service operation as quickly as possible. It follows ITIL best practices with clear severity levels (P0-P4), escalation paths, and communication protocols. Effective incident management minimizes business impact, maintains customer trust, and ensures rapid resolution through well-defined procedures, war rooms, and post-incident reviews.',
        keyPoints: [
          'Severity levels: P0 (Critical - system down), P1 (High - major impact), P2 (Medium), P3 (Low), P4 (Cosmetic)',
          'Incident lifecycle: Detection → Triage → Assignment → Investigation → Resolution → Closure → Post-mortem',
          'War room protocols: Incident commander, technical leads, customer support liaison',
          'Communication templates: Status updates every 30 min for P0, hourly for P1',
          'Escalation matrix: Auto-escalate P0 after 15 min, P1 after 1 hour without progress',
          'Incident tracking: JIRA/ServiceNow tickets with timeline, impact assessment, resolution steps',
          'Bridge calls: Dedicated conference line, shared screen for logs/metrics',
          'Post-incident reviews within 48 hours: Root cause, timeline, action items, prevention measures'
        ],
        codeExample: `// Incident Classification Matrix
/*
┌──────────┬─────────────┬──────────────┬────────────┬──────────────┐
│ Severity │ Definition  │ Response Time│ Resolution │ Escalation   │
├──────────┼─────────────┼──────────────┼────────────┼──────────────┤
│ P0       │ System Down │ Immediate    │ 1 hour     │ VP Eng + CEO │
│          │ Revenue loss│ 24/7 on-call │            │ Auto-page    │
├──────────┼─────────────┼──────────────┼────────────┼──────────────┤
│ P1       │ Major Impact│ 15 minutes   │ 4 hours    │ Director     │
│          │ >50% users  │              │            │              │
├──────────┼─────────────┼──────────────┼────────────┼──────────────┤
│ P2       │ Partial     │ 1 hour       │ 24 hours   │ Team Lead    │
│          │ <50% users  │              │            │              │
├──────────┼─────────────┼──────────────┼────────────┼──────────────┤
│ P3       │ Minor       │ 4 hours      │ 1 week     │ None         │
│          │ Workaround  │              │            │              │
└──────────┴─────────────┴──────────────┴────────────┴──────────────┘
*/

// Incident Response Service
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class IncidentResponseService {

  private static final Logger logger = LoggerFactory.getLogger(IncidentResponseService.class);

  private final NotificationService notificationService;
  private final IncidentRepository incidentRepository;

  public enum IncidentSeverity {
    P0("Critical", 0, "Immediate", "1 hour"),
    P1("High", 15, "15 minutes", "4 hours"),
    P2("Medium", 60, "1 hour", "24 hours"),
    P3("Low", 240, "4 hours", "1 week"),
    P4("Cosmetic", 1440, "Next sprint", "30 days");

    private final String description;
    private final int responseMinutes;
    private final String responseTime;
    private final String resolutionTarget;

    IncidentSeverity(String description, int responseMinutes,
                     String responseTime, String resolutionTarget) {
      this.description = description;
      this.responseMinutes = responseMinutes;
      this.responseTime = responseTime;
      this.resolutionTarget = resolutionTarget;
    }
  }

  public Incident createIncident(String title, String description,
                                 IncidentSeverity severity) {
    Incident incident = new Incident();
    incident.setTitle(title);
    incident.setDescription(description);
    incident.setSeverity(severity);
    incident.setStatus(IncidentStatus.OPEN);
    incident.setCreatedAt(Instant.now());
    incident.setResponseDeadline(
      Instant.now().plus(severity.responseMinutes, ChronoUnit.MINUTES)
    );

    // Alert based on severity
    if (severity == IncidentSeverity.P0) {
      notificationService.pageOnCall("P0-CRITICAL: " + title);
      notificationService.emailExecutives(incident);
      notificationService.createWarRoom(incident);
      logger.error("[P0] CRITICAL INCIDENT: {}", title);
    } else if (severity == IncidentSeverity.P1) {
      notificationService.pageOnCall("P1-HIGH: " + title);
      notificationService.alertTeamLeads(incident);
      logger.warn("[P1] HIGH PRIORITY INCIDENT: {}", title);
    }

    return incidentRepository.save(incident);
  }

  public void updateIncidentStatus(Long incidentId, String update) {
    Incident incident = incidentRepository.findById(incidentId)
      .orElseThrow(() -> new IncidentNotFoundException(incidentId));

    incident.addUpdate(update, Instant.now());

    // Auto-escalate if overdue
    if (incident.isOverdue() && !incident.isEscalated()) {
      escalateIncident(incident);
    }

    incidentRepository.save(incident);

    // Send status update
    if (incident.getSeverity() == IncidentSeverity.P0) {
      notificationService.sendStatusUpdate(incident, update);
    }
  }

  private void escalateIncident(Incident incident) {
    logger.warn("Escalating incident: {}", incident.getId());
    incident.setEscalated(true);

    switch (incident.getSeverity()) {
      case P0:
        notificationService.alertCEO(incident);
        notificationService.alertVPEngineering(incident);
        break;
      case P1:
        notificationService.alertDirector(incident);
        break;
      case P2:
        notificationService.alertTeamLead(incident);
        break;
    }
  }

  public void resolveIncident(Long incidentId, String resolution) {
    Incident incident = incidentRepository.findById(incidentId)
      .orElseThrow(() -> new IncidentNotFoundException(incidentId));

    incident.setStatus(IncidentStatus.RESOLVED);
    incident.setResolution(resolution);
    incident.setResolvedAt(Instant.now());

    Duration duration = Duration.between(
      incident.getCreatedAt(),
      incident.getResolvedAt()
    );

    logger.info("Incident {} resolved in {} minutes",
      incidentId, duration.toMinutes());

    incidentRepository.save(incident);

    // Schedule post-mortem for P0/P1
    if (incident.getSeverity() == IncidentSeverity.P0 ||
        incident.getSeverity() == IncidentSeverity.P1) {
      schedulePostMortem(incident);
    }
  }

  private void schedulePostMortem(Incident incident) {
    // Schedule within 48 hours
    Instant postMortemDate = Instant.now().plus(48, ChronoUnit.HOURS);
    logger.info("Post-mortem scheduled for {}", postMortemDate);

    notificationService.schedulePostMortem(incident, postMortemDate);
  }
}

// Incident Communication Template
public class IncidentCommunication {

  public static String getStatusUpdateTemplate(Incident incident) {
    return String.format("""
      INCIDENT STATUS UPDATE

      Severity: %s
      Title: %s
      Started: %s
      Duration: %d minutes

      CURRENT STATUS:
      %s

      CUSTOMER IMPACT:
      %s

      NEXT UPDATE: %s

      Incident Commander: %s
      """,
      incident.getSeverity(),
      incident.getTitle(),
      incident.getCreatedAt(),
      incident.getDurationMinutes(),
      incident.getCurrentStatus(),
      incident.getCustomerImpact(),
      incident.getNextUpdateTime(),
      incident.getIncidentCommander()
    );
  }
}

// Incident Tracking
@Entity
public class Incident {
  @Id
  @GeneratedValue
  private Long id;

  private String title;
  private String description;

  @Enumerated(EnumType.STRING)
  private IncidentSeverity severity;

  @Enumerated(EnumType.STRING)
  private IncidentStatus status;

  private Instant createdAt;
  private Instant responseDeadline;
  private Instant resolvedAt;

  private String incidentCommander;
  private String resolution;
  private boolean escalated;

  @OneToMany(cascade = CascadeType.ALL)
  private List<IncidentUpdate> updates = new ArrayList<>();

  public boolean isOverdue() {
    return Instant.now().isAfter(responseDeadline)
      && status != IncidentStatus.RESOLVED;
  }

  public long getDurationMinutes() {
    Instant end = resolvedAt != null ? resolvedAt : Instant.now();
    return Duration.between(createdAt, end).toMinutes();
  }
}

// Output example:
/*
2025-09-30 14:23:45 ERROR [P0] CRITICAL INCIDENT: Payment Processing Down
2025-09-30 14:23:46 INFO  War room created: https://zoom.us/j/incident-12345
2025-09-30 14:23:47 WARN  CEO, VP Engineering paged
2025-09-30 14:53:12 INFO  Status Update: Database connection pool exhausted
2025-09-30 15:12:33 INFO  Incident 12345 resolved in 49 minutes
2025-09-30 15:12:34 INFO  Post-mortem scheduled for 2025-10-02 15:12:00
*/`
      }
    },
    {
      id: 2,
      name: 'Root Cause Analysis',
      icon: '🔍',
      color: '#f59e0b',
      description: 'Identifying underlying problem causes',
      content: {
        explanation: 'Root Cause Analysis (RCA) is a systematic process to identify the fundamental cause of incidents, not just symptoms. The 5 Whys technique repeatedly asks why until reaching the root cause. Fishbone diagrams categorize causes (people, process, technology, environment). RCA prevents recurring incidents by addressing underlying issues. Post-mortem documents include timeline, root cause, contributing factors, action items with owners, and lessons learned for knowledge sharing.',
        keyPoints: [
          '5 Whys methodology: Ask "why" 5 times to drill down from symptom to root cause',
          'Fishbone diagram (Ishikawa): Categories - People, Process, Technology, Environment',
          'Blameless post-mortems: Focus on system failures, not individual blame',
          'Timeline reconstruction: Detailed sequence of events with timestamps',
          'Contributing factors vs. root cause: Multiple factors can contribute to single root cause',
          'Action items: Concrete, measurable steps with owners and deadlines',
          'Prevention measures: Code changes, monitoring improvements, process updates',
          'Knowledge sharing: Document lessons learned, update runbooks, team training'
        ],
        codeExample: `// 5 Whys Root Cause Analysis Example

/*
INCIDENT: Payment processing failed for 45 minutes

WHY #1: Why did payment processing fail?
→ Database queries were timing out

WHY #2: Why were database queries timing out?
→ Database connection pool was exhausted (all 50 connections in use)

WHY #3: Why was the connection pool exhausted?
→ Connections weren't being returned to the pool

WHY #4: Why weren't connections being returned?
→ Exception in transaction code prevented proper connection closure

WHY #5: Why did the exception prevent connection closure?
→ Missing try-finally block in PaymentProcessor.java

ROOT CAUSE: Improper resource management - database connections not
            closed in finally block

CONTRIBUTING FACTORS:
- No connection pool monitoring alerts
- Code review missed the try-finally pattern
- Integration tests didn't catch connection leak
*/

// RCA Template - Post-Mortem Document
public class RootCauseAnalysisTemplate {

  public String generatePostMortem(Incident incident, RCAFindings findings) {
    return """
      ═══════════════════════════════════════════════════
      POST-MORTEM REPORT
      ═══════════════════════════════════════════════════

      INCIDENT SUMMARY
      ----------------
      Incident ID: %s
      Date: %s
      Duration: %d minutes
      Severity: %s
      Incident Commander: %s

      CUSTOMER IMPACT
      ---------------
      Affected Users: %s
      Revenue Impact: $%,.2f
      User Experience: %s

      TIMELINE
      --------
      %s

      ROOT CAUSE
      ----------
      %s

      5 WHYS ANALYSIS
      ---------------
      %s

      CONTRIBUTING FACTORS
      -------------------
      %s

      WHAT WENT WELL
      --------------
      %s

      WHAT WENT POORLY
      ----------------
      %s

      ACTION ITEMS
      ------------
      %s

      PREVENTION MEASURES
      -------------------
      %s

      LESSONS LEARNED
      ---------------
      %s

      """.formatted(
        incident.getId(),
        incident.getCreatedAt(),
        incident.getDurationMinutes(),
        incident.getSeverity(),
        incident.getIncidentCommander(),
        findings.getAffectedUsers(),
        findings.getRevenueImpact(),
        findings.getUserExperience(),
        findings.getTimeline(),
        findings.getRootCause(),
        findings.getFiveWhysAnalysis(),
        findings.getContributingFactors(),
        findings.getWhatWentWell(),
        findings.getWhatWentPoorly(),
        findings.getActionItems(),
        findings.getPreventionMeasures(),
        findings.getLessonsLearned()
      );
  }
}

// Fishbone Diagram Implementation
public class FishboneAnalysis {

  public enum Category {
    PEOPLE("People - Skills, Training, Staffing"),
    PROCESS("Process - Procedures, Workflow, Documentation"),
    TECHNOLOGY("Technology - Code, Infrastructure, Tools"),
    ENVIRONMENT("Environment - External factors, Dependencies");

    private final String description;
    Category(String description) { this.description = description; }
  }

  private Map<Category, List<String>> causes = new HashMap<>();

  public void addCause(Category category, String cause) {
    causes.computeIfAbsent(category, k -> new ArrayList<>()).add(cause);
  }

  public String generateDiagram() {
    StringBuilder sb = new StringBuilder();
    sb.append("FISHBONE DIAGRAM - Root Cause Analysis\\n");
    sb.append("Problem: Database Connection Pool Exhaustion\\n\\n");

    causes.forEach((category, causeList) -> {
      sb.append(category.description).append(":\\n");
      causeList.forEach(cause ->
        sb.append("  → ").append(cause).append("\\n")
      );
      sb.append("\\n");
    });

    return sb.toString();
  }
}

// Example Fishbone Analysis
FishboneAnalysis fishbone = new FishboneAnalysis();

// People
fishbone.addCause(Category.PEOPLE,
  "Developer unfamiliar with connection pool best practices");
fishbone.addCause(Category.PEOPLE,
  "Code reviewer missed resource management issue");

// Process
fishbone.addCause(Category.PROCESS,
  "No mandatory try-finally pattern in coding standards");
fishbone.addCause(Category.PROCESS,
  "Code review checklist doesn't include resource cleanup");
fishbone.addCause(Category.PROCESS,
  "No performance testing in CI/CD pipeline");

// Technology
fishbone.addCause(Category.TECHNOLOGY,
  "Database connection pool size too small (50 connections)");
fishbone.addCause(Category.TECHNOLOGY,
  "No connection leak detection enabled");
fishbone.addCause(Category.TECHNOLOGY,
  "Missing connection pool monitoring alerts");

// Environment
fishbone.addCause(Category.ENVIRONMENT,
  "Production traffic spike during sale event");
fishbone.addCause(Category.ENVIRONMENT,
  "Database under higher load than expected");

System.out.println(fishbone.generateDiagram());

// Corrective Action Tracking
@Entity
public class ActionItem {
  @Id
  @GeneratedValue
  private Long id;

  private Long incidentId;
  private String description;
  private String owner;
  private LocalDate dueDate;

  @Enumerated(EnumType.STRING)
  private ActionStatus status;

  private String category; // Prevention, Detection, Response

  public enum ActionStatus {
    OPEN, IN_PROGRESS, COMPLETED, CANCELLED
  }
}

// Action Items from RCA
List<ActionItem> actionItems = List.of(
  new ActionItem()
    .setDescription("Add try-finally to all database operations")
    .setOwner("Backend Team")
    .setCategory("Prevention")
    .setDueDate(LocalDate.now().plusDays(7)),

  new ActionItem()
    .setDescription("Enable connection leak detection in HikariCP")
    .setOwner("DevOps")
    .setCategory("Detection")
    .setDueDate(LocalDate.now().plusDays(3)),

  new ActionItem()
    .setDescription("Add Prometheus alert for connection pool > 80% usage")
    .setOwner("SRE Team")
    .setCategory("Detection")
    .setDueDate(LocalDate.now().plusDays(5)),

  new ActionItem()
    .setDescription("Update code review checklist with resource management")
    .setOwner("Tech Lead")
    .setCategory("Prevention")
    .setDueDate(LocalDate.now().plusDays(2)),

  new ActionItem()
    .setDescription("Increase connection pool to 200 connections")
    .setOwner("DBA")
    .setCategory("Prevention")
    .setDueDate(LocalDate.now().plusDays(1))
);

// Actual code fix from RCA
// BEFORE (Bug):
public void processPayment(Payment payment) {
  Connection conn = dataSource.getConnection();
  try {
    // Process payment
    PreparedStatement stmt = conn.prepareStatement(
      "INSERT INTO payments VALUES (?, ?, ?)"
    );
    stmt.setLong(1, payment.getId());
    stmt.setBigDecimal(2, payment.getAmount());
    stmt.execute();

    // If exception occurs here, connection never closed!
  } catch (SQLException e) {
    throw new PaymentException("Payment failed", e);
  }
}

// AFTER (Fixed):
public void processPayment(Payment payment) {
  Connection conn = null;
  try {
    conn = dataSource.getConnection();
    PreparedStatement stmt = conn.prepareStatement(
      "INSERT INTO payments VALUES (?, ?, ?)"
    );
    stmt.setLong(1, payment.getId());
    stmt.setBigDecimal(2, payment.getAmount());
    stmt.execute();
  } catch (SQLException e) {
    throw new PaymentException("Payment failed", e);
  } finally {
    // Always close connection
    if (conn != null) {
      try {
        conn.close();
      } catch (SQLException e) {
        logger.error("Failed to close connection", e);
      }
    }
  }
}

// Or better: Use try-with-resources
public void processPayment(Payment payment) {
  try (Connection conn = dataSource.getConnection();
       PreparedStatement stmt = conn.prepareStatement(
         "INSERT INTO payments VALUES (?, ?, ?)")) {

    stmt.setLong(1, payment.getId());
    stmt.setBigDecimal(2, payment.getAmount());
    stmt.execute();

  } catch (SQLException e) {
    throw new PaymentException("Payment failed", e);
  }
  // Connection automatically closed
}`
      }
    },
    {
      id: 3,
      name: 'Troubleshooting Techniques',
      icon: '🔧',
      color: '#3b82f6',
      description: 'Debugging production systems',
      content: {
        explanation: 'Troubleshooting production issues requires systematic approaches and powerful diagnostic tools. Log analysis with grep, awk, and centralized logging (ELK stack) reveals patterns. Thread dumps diagnose deadlocks and performance issues. Heap dumps identify memory leaks. JVM tools (jstack, jmap, jstat) provide runtime insights. Distributed tracing (Zipkin, Jaeger) tracks requests across microservices. The key is hypothesis-driven debugging: form hypotheses, gather evidence, test assumptions, and iterate until root cause is found.',
        keyPoints: [
          'Log analysis: grep patterns, awk for parsing, tail -f for real-time monitoring',
          'Thread dumps (jstack): Identify deadlocks, thread starvation, infinite loops',
          'Heap dumps (jmap): Memory leak analysis, object retention, garbage collection issues',
          'JVM monitoring: jstat for GC stats, jconsole/VisualVM for real-time metrics',
          'Distributed tracing: Zipkin/Jaeger for microservice request flow',
          'Network debugging: tcpdump, netstat, curl for connectivity issues',
          'Database troubleshooting: Slow query logs, EXPLAIN plans, connection pool monitoring',
          'Hypothesis-driven approach: Theory → Evidence → Test → Refine'
        ],
        codeExample: `// Log Analysis Commands and Scripts

// 1. Find errors in last hour
grep -i error application.log | \\
  awk -v date="$(date -d '1 hour ago' '+%Y-%m-%d %H:%M:%S')" \\
  '$0 >= date'

// 2. Count errors by type
grep ERROR application.log | \\
  awk '{print $5}' | \\
  sort | uniq -c | sort -rn

// 3. Extract stack traces
awk '/Exception/,/^[^\\t]/' application.log

// 4. Find slow requests (>1000ms)
grep "Request completed" application.log | \\
  awk '$NF > 1000 {print $0}' | \\
  sort -k12 -rn

// 5. Monitor logs in real-time with filtering
tail -f application.log | grep -E 'ERROR|WARN|Exception'

// Java Log Analysis Service
import org.springframework.stereotype.Service;

@Service
public class LogAnalysisService {

  // Analyze logs programmatically
  public LogAnalysisResult analyzeApplicationLogs(Path logFile)
      throws IOException {

    Map<String, Integer> errorCounts = new HashMap<>();
    List<String> recentErrors = new ArrayList<>();
    long totalRequests = 0;
    long errorRequests = 0;
    List<Long> responseTimes = new ArrayList<>();

    try (BufferedReader reader = Files.newBufferedReader(logFile)) {
      String line;
      while ((line = reader.readLine()) != null) {
        if (line.contains("ERROR")) {
          errorRequests++;
          String errorType = extractErrorType(line);
          errorCounts.merge(errorType, 1, Integer::sum);
          recentErrors.add(line);
        }

        if (line.contains("Request completed")) {
          totalRequests++;
          Long responseTime = extractResponseTime(line);
          responseTimes.add(responseTime);
        }
      }
    }

    return new LogAnalysisResult(
      totalRequests,
      errorRequests,
      calculatePercentile(responseTimes, 95),
      errorCounts,
      recentErrors.stream().limit(10).collect(Collectors.toList())
    );
  }

  private String extractErrorType(String logLine) {
    // Extract exception class name
    Pattern pattern = Pattern.compile("([A-Z]\\\\w+Exception)");
    Matcher matcher = pattern.matcher(logLine);
    return matcher.find() ? matcher.group(1) : "Unknown";
  }

  private Long extractResponseTime(String logLine) {
    Pattern pattern = Pattern.compile("duration=(\\\\d+)ms");
    Matcher matcher = pattern.matcher(logLine);
    return matcher.find() ? Long.parseLong(matcher.group(1)) : 0L;
  }

  private double calculatePercentile(List<Long> values, int percentile) {
    Collections.sort(values);
    int index = (int) Math.ceil(percentile / 100.0 * values.size()) - 1;
    return values.get(index);
  }
}

// Thread Dump Analysis
/*
# Generate thread dump
jstack <pid> > thread-dump.txt

# Or send SIGQUIT (Linux)
kill -3 <pid>

# Analyze thread dump for deadlock
grep -A 20 "deadlock" thread-dump.txt

# Find threads in BLOCKED state
grep -B 5 "BLOCKED" thread-dump.txt

# Count threads by state
grep "java.lang.Thread.State" thread-dump.txt | \\
  sort | uniq -c | sort -rn
*/

// Thread Dump Analyzer
public class ThreadDumpAnalyzer {

  public ThreadDumpReport analyzeThreadDump(String threadDumpPath)
      throws IOException {

    Map<String, Integer> threadStates = new HashMap<>();
    List<String> blockedThreads = new ArrayList<>();
    boolean deadlockDetected = false;

    String content = Files.readString(Path.of(threadDumpPath));

    // Check for deadlock
    if (content.contains("Found one Java-level deadlock")) {
      deadlockDetected = true;
    }

    // Parse thread states
    Pattern statePattern = Pattern.compile(
      "java.lang.Thread.State: (\\\\w+)"
    );
    Matcher matcher = statePattern.matcher(content);

    while (matcher.find()) {
      String state = matcher.group(1);
      threadStates.merge(state, 1, Integer::sum);
    }

    return new ThreadDumpReport(
      threadStates,
      deadlockDetected,
      blockedThreads
    );
  }
}

// Heap Dump Analysis
/*
# Generate heap dump
jmap -dump:live,format=b,file=heap-dump.hprof <pid>

# Or use JVM flag for automatic heap dump on OOM
-XX:+HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=/var/logs/heapdump.hprof

# Analyze with Eclipse Memory Analyzer (MAT)
# Look for:
# - Leak suspects
# - Dominator tree
# - Duplicate classes
# - Retained heap size
*/

// Memory Leak Detection
@Service
public class MemoryLeakDetector {

  private final MeterRegistry meterRegistry;

  public void monitorHeapUsage() {
    Gauge.builder("jvm.memory.heap.used.percentage", this,
      detector -> {
        MemoryMXBean memoryBean = ManagementFactory.getMemoryMXBean();
        MemoryUsage heapUsage = memoryBean.getHeapMemoryUsage();
        return (double) heapUsage.getUsed() / heapUsage.getMax() * 100;
      })
      .register(meterRegistry);
  }

  @Scheduled(fixedRate = 60000)
  public void checkForMemoryLeak() {
    MemoryMXBean memoryBean = ManagementFactory.getMemoryMXBean();
    MemoryUsage heapUsage = memoryBean.getHeapMemoryUsage();

    double usedPercentage =
      (double) heapUsage.getUsed() / heapUsage.getMax() * 100;

    if (usedPercentage > 90) {
      logger.warn("High heap usage: {}%. Possible memory leak!",
        usedPercentage);

      // Trigger heap dump
      generateHeapDump();
    }
  }

  private void generateHeapDump() {
    try {
      MBeanServer server = ManagementFactory.getPlatformMBeanServer();
      HotSpotDiagnosticMXBean mxBean = ManagementFactory.newPlatformMXBeanProxy(
        server,
        "com.sun.management:type=HotSpotDiagnostic",
        HotSpotDiagnosticMXBean.class
      );

      String filename = "/tmp/heap-dump-" + System.currentTimeMillis() + ".hprof";
      mxBean.dumpHeap(filename, true);

      logger.info("Heap dump created: {}", filename);
    } catch (Exception e) {
      logger.error("Failed to create heap dump", e);
    }
  }
}

// Distributed Tracing with Zipkin
@Configuration
public class TracingConfig {

  @Bean
  public Sampler defaultSampler() {
    // Sample 100% of requests
    return Sampler.ALWAYS_SAMPLE;
  }
}

@Service
public class PaymentService {

  @NewSpan(name = "process-payment")
  public void processPayment(@SpanTag("payment.id") Long paymentId) {
    // Automatically traced
    validatePayment(paymentId);
    chargeCustomer(paymentId);
    sendConfirmation(paymentId);
  }

  @NewSpan
  private void validatePayment(Long paymentId) {
    // Child span
  }
}

// Database Troubleshooting
/*
-- Find slow queries
SELECT query, mean_exec_time, calls
FROM pg_stat_statements
WHERE mean_exec_time > 1000
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Analyze query plan
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 12345;

-- Check for missing indexes
SELECT schemaname, tablename, indexname
FROM pg_indexes
WHERE schemaname = 'public'
  AND indexname IS NULL;

-- Monitor active connections
SELECT count(*) as active_connections
FROM pg_stat_activity
WHERE state = 'active';
*/

// Connection Pool Monitoring
@Service
public class ConnectionPoolMonitor {

  @Autowired
  private HikariDataSource dataSource;

  @Scheduled(fixedRate = 30000)
  public void monitorConnectionPool() {
    HikariPoolMXBean poolBean = dataSource.getHikariPoolMXBean();

    int activeConnections = poolBean.getActiveConnections();
    int idleConnections = poolBean.getIdleConnections();
    int totalConnections = poolBean.getTotalConnections();
    int threadsAwaitingConnection = poolBean.getThreadsAwaitingConnection();

    logger.info("Connection Pool Stats - Active: {}, Idle: {}, Total: {}, Waiting: {}",
      activeConnections, idleConnections, totalConnections, threadsAwaitingConnection);

    // Alert if pool is exhausted
    if (threadsAwaitingConnection > 0) {
      logger.warn("Connection pool exhausted! {} threads waiting",
        threadsAwaitingConnection);
    }

    // Alert if usage > 80%
    double usagePercent = (double) activeConnections / totalConnections * 100;
    if (usagePercent > 80) {
      logger.warn("High connection pool usage: {}%", usagePercent);
    }
  }
}`
      }
    },
    {
      id: 4,
      name: 'On-Call Procedures',
      icon: '📞',
      color: '#8b5cf6',
      description: 'Managing on-call rotations and escalations',
      content: {
        explanation: 'On-call procedures ensure 24/7 coverage for production systems with clear responsibilities, escalation paths, and response protocols. PagerDuty or similar tools manage rotations, alerts, and escalations. On-call engineers are the first responders for incidents, following runbooks for common issues. Handoff procedures ensure smooth transitions. On-call compensation, rotation fairness, and burnout prevention are important. Weekly on-call reviews share knowledge and improve processes.',
        keyPoints: [
          'Rotation schedule: Weekly rotations with primary and secondary on-call engineers',
          'PagerDuty integration: Phone calls, SMS, push notifications with acknowledgment required',
          'Escalation policy: Primary (5 min) → Secondary (10 min) → Manager (15 min) → Director',
          'Runbook access: Centralized wiki with step-by-step procedures for common incidents',
          'Response SLA: Acknowledge within 5 minutes, provide status update within 15 minutes',
          'Handoff protocol: Summary email with open incidents, ongoing issues, areas of concern',
          'On-call compensation: Time-and-a-half for pages, comp time for after-hours work',
          'Burnout prevention: Max 1 week per month, auto-skip if on vacation, incident load balancing'
        ],
        codeExample: `// On-Call Schedule Configuration

// PagerDuty Integration
import com.pagerduty.client.PagerDutyClient;

@Service
public class OnCallService {

  private final PagerDutyClient pagerDutyClient;

  public OnCallSchedule getCurrentOnCall() {
    // Get current on-call engineers
    OnCallSchedule schedule = pagerDutyClient.getOnCallSchedule(
      "PRODUCTION_SCHEDULE"
    );

    return schedule;
  }

  public void pageOnCall(String message, IncidentSeverity severity) {
    OnCallSchedule schedule = getCurrentOnCall();

    Incident incident = pagerDutyClient.createIncident(
      message,
      severity,
      schedule.getPrimaryEngineerId()
    );

    logger.info("Paged on-call engineer: {} for incident: {}",
      schedule.getPrimaryEngineer().getName(),
      incident.getId()
    );

    // Start escalation timer
    scheduleEscalation(incident, schedule);
  }

  private void scheduleEscalation(Incident incident, OnCallSchedule schedule) {
    // Escalate to secondary after 5 minutes if not acknowledged
    scheduler.schedule(() -> {
      if (!incident.isAcknowledged()) {
        logger.warn("Escalating incident {} to secondary on-call",
          incident.getId());

        pagerDutyClient.escalateIncident(
          incident.getId(),
          schedule.getSecondaryEngineerId()
        );
      }
    }, 5, TimeUnit.MINUTES);

    // Escalate to manager after 10 minutes
    scheduler.schedule(() -> {
      if (!incident.isAcknowledged()) {
        logger.error("Escalating incident {} to manager",
          incident.getId());

        pagerDutyClient.escalateIncident(
          incident.getId(),
          schedule.getManagerId()
        );
      }
    }, 10, TimeUnit.MINUTES);
  }
}

// Runbook System
@Service
public class RunbookService {

  private final Map<String, Runbook> runbooks = new HashMap<>();

  @PostConstruct
  public void loadRunbooks() {
    // Load runbooks from wiki or database
    runbooks.put("DATABASE_CONNECTION_POOL_EXHAUSTED",
      new Runbook()
        .setTitle("Database Connection Pool Exhausted")
        .setPriority("P0")
        .setSteps(List.of(
          "1. Check connection pool metrics in Grafana",
          "2. Identify long-running transactions: SELECT * FROM pg_stat_activity",
          "3. Kill blocking queries if necessary: SELECT pg_terminate_backend(pid)",
          "4. Increase connection pool size temporarily if needed",
          "5. Check for connection leaks in application logs",
          "6. Review recent deployments for connection management issues",
          "7. Create incident ticket and page database team if issue persists"
        ))
        .setEscalationPath("DBA Team → Database Director")
        .setRelatedLinks(List.of(
          "https://wiki.company.com/runbooks/db-connection-pool",
          "https://grafana.company.com/d/database-metrics"
        ))
    );

    runbooks.put("HIGH_CPU_USAGE",
      new Runbook()
        .setTitle("High CPU Usage (>80%)")
        .setPriority("P1")
        .setSteps(List.of(
          "1. Check CPU metrics in Datadog/Grafana",
          "2. Identify high CPU processes: top or htop",
          "3. Generate thread dump: jstack <pid> > /tmp/thread-dump.txt",
          "4. Look for infinite loops or excessive computation",
          "5. Check for traffic spike in load balancer metrics",
          "6. Consider scaling horizontally (add instances)",
          "7. Review recent code changes for CPU-intensive operations"
        ))
    );

    runbooks.put("MEMORY_LEAK",
      new Runbook()
        .setTitle("Memory Leak / OutOfMemoryError")
        .setPriority("P0")
        .setSteps(List.of(
          "1. Check heap usage in JMX console",
          "2. Generate heap dump: jmap -dump:live,format=b,file=heap.hprof <pid>",
          "3. Restart affected instances to restore service",
          "4. Analyze heap dump with Eclipse MAT offline",
          "5. Look for object retention and leak suspects",
          "6. Check for unbounded caches or collections",
          "7. Review recent changes for memory management issues"
        ))
    );
  }

  public Runbook getRunbook(String incidentType) {
    return runbooks.getOrDefault(incidentType,
      runbooks.get("GENERIC_INCIDENT"));
  }

  public void displayRunbook(String incidentType) {
    Runbook runbook = getRunbook(incidentType);

    System.out.println("╔═══════════════════════════════════════╗");
    System.out.println("║  RUNBOOK: " + runbook.getTitle());
    System.out.println("╚═══════════════════════════════════════╝");
    System.out.println("Priority: " + runbook.getPriority());
    System.out.println();
    System.out.println("STEPS:");
    runbook.getSteps().forEach(System.out::println);
    System.out.println();
    System.out.println("ESCALATION PATH: " + runbook.getEscalationPath());
    System.out.println();
    System.out.println("RELATED LINKS:");
    runbook.getRelatedLinks().forEach(link ->
      System.out.println("  → " + link)
    );
  }
}

// On-Call Handoff Report
@Service
public class OnCallHandoffService {

  public String generateHandoffReport() {
    OnCallShift currentShift = getCurrentShift();

    return """
      ═══════════════════════════════════════
      ON-CALL HANDOFF REPORT
      ═══════════════════════════════════════

      FROM: %s
      TO: %s
      DATE: %s

      INCIDENTS THIS WEEK
      -------------------
      Total Incidents: %d
      P0: %d, P1: %d, P2: %d, P3: %d

      OPEN INCIDENTS
      --------------
      %s

      ONGOING ISSUES
      --------------
      %s

      AREAS OF CONCERN
      ----------------
      %s

      RECENT DEPLOYMENTS
      ------------------
      %s

      SYSTEM STATUS
      -------------
      %s

      NOTES
      -----
      %s

      """.formatted(
        currentShift.getPrimaryEngineer(),
        currentShift.getNextPrimaryEngineer(),
        LocalDateTime.now(),
        currentShift.getTotalIncidents(),
        currentShift.getP0Count(),
        currentShift.getP1Count(),
        currentShift.getP2Count(),
        currentShift.getP3Count(),
        currentShift.getOpenIncidents(),
        currentShift.getOngoingIssues(),
        currentShift.getAreasOfConcern(),
        currentShift.getRecentDeployments(),
        currentShift.getSystemStatus(),
        currentShift.getNotes()
      );
  }
}

// Alert Routing Configuration
@Configuration
public class AlertRoutingConfig {

  @Bean
  public AlertRouter configureAlertRouting() {
    return AlertRouter.builder()
      // Critical database alerts
      .route("database.connections.exhausted")
        .toSchedule("DATABASE_ONCALL")
        .withSeverity(IncidentSeverity.P0)
        .withEscalationMinutes(5)

      // Application errors
      .route("application.error.rate.high")
        .toSchedule("BACKEND_ONCALL")
        .withSeverity(IncidentSeverity.P1)
        .withEscalationMinutes(10)

      // Infrastructure issues
      .route("infrastructure.*.critical")
        .toSchedule("SRE_ONCALL")
        .withSeverity(IncidentSeverity.P0)
        .withEscalationMinutes(5)

      // Business metrics
      .route("business.revenue.drop")
        .toSchedule("ONCALL_PRIMARY")
        .withSeverity(IncidentSeverity.P0)
        .withEscalationMinutes(3)
        .andNotify("executives@company.com")

      .build();
  }
}

// On-Call Metrics
@Service
public class OnCallMetricsService {

  public OnCallMetrics calculateMetrics(LocalDate startDate, LocalDate endDate) {
    List<Incident> incidents = incidentRepository.findByDateRange(
      startDate, endDate
    );

    Map<String, Integer> incidentsByEngineer = incidents.stream()
      .collect(Collectors.groupingBy(
        Incident::getAssignedEngineer,
        Collectors.collectingAndThen(Collectors.counting(), Long::intValue)
      ));

    double avgResponseTime = incidents.stream()
      .mapToLong(Incident::getResponseTimeMinutes)
      .average()
      .orElse(0.0);

    double avgResolutionTime = incidents.stream()
      .filter(i -> i.getStatus() == IncidentStatus.RESOLVED)
      .mapToLong(Incident::getResolutionTimeMinutes)
      .average()
      .orElse(0.0);

    long totalPages = incidents.size();
    long afterHoursPages = incidents.stream()
      .filter(i -> isAfterHours(i.getCreatedAt()))
      .count();

    return new OnCallMetrics(
      incidentsByEngineer,
      avgResponseTime,
      avgResolutionTime,
      totalPages,
      afterHoursPages
    );
  }

  private boolean isAfterHours(Instant timestamp) {
    LocalTime time = LocalDateTime.ofInstant(
      timestamp, ZoneId.systemDefault()
    ).toLocalTime();

    // After hours: before 8am or after 6pm, or weekends
    return time.isBefore(LocalTime.of(8, 0)) ||
           time.isAfter(LocalTime.of(18, 0)) ||
           LocalDateTime.ofInstant(timestamp, ZoneId.systemDefault())
             .getDayOfWeek().getValue() > 5;
  }
}

// Example Runbook Output:
/*
╔═══════════════════════════════════════╗
║  RUNBOOK: Database Connection Pool Exhausted
╚═══════════════════════════════════════╝
Priority: P0

STEPS:
1. Check connection pool metrics in Grafana
2. Identify long-running transactions: SELECT * FROM pg_stat_activity
3. Kill blocking queries if necessary: SELECT pg_terminate_backend(pid)
4. Increase connection pool size temporarily if needed
5. Check for connection leaks in application logs
6. Review recent deployments for connection management issues
7. Create incident ticket and page database team if issue persists

ESCALATION PATH: DBA Team → Database Director

RELATED LINKS:
  → https://wiki.company.com/runbooks/db-connection-pool
  → https://grafana.company.com/d/database-metrics
*/`
      }
    },
    {
      id: 5,
      name: 'SLA Management',
      icon: '⏱️',
      color: '#10b981',
      description: 'Service Level Agreements and monitoring',
      content: {
        explanation: 'Service Level Agreements (SLAs) define expected service quality with measurable metrics like uptime, response time, and error rate. SLA targets (e.g., 99.9% uptime = 43 minutes downtime per month) set customer expectations. Service Level Objectives (SLOs) are internal targets slightly higher than SLAs to provide buffer. Service Level Indicators (SLIs) are actual measured metrics. Error budgets allow controlled risk-taking: if SLO is 99.9% uptime, 0.1% downtime is acceptable for deployments and experiments.',
        keyPoints: [
          'SLA (Service Level Agreement): External commitments to customers with penalties',
          'SLO (Service Level Objective): Internal targets, typically stricter than SLA',
          'SLI (Service Level Indicator): Actual measured metrics (uptime, latency, error rate)',
          'Uptime tiers: 99% (3.65 days/year), 99.9% (8.76 hours/year), 99.99% (52 min/year)',
          'Error budget: Acceptable downtime (100% - SLO) for deployments and experiments',
          'Multi-window SLA: Different targets for different time windows (monthly, quarterly)',
          'Response time SLA: p95 latency < 200ms, p99 < 500ms',
          'Availability calculation: (Total time - Downtime) / Total time × 100'
        ],
        codeExample: `// SLA Configuration and Tracking

// SLA Definitions
@Configuration
public class SLAConfig {

  @Bean
  public Map<String, SLA> configureSLAs() {
    Map<String, SLA> slas = new HashMap<>();

    // API Availability SLA
    slas.put("API_AVAILABILITY", SLA.builder()
      .name("API Availability")
      .target(99.9)  // 99.9% uptime
      .measurement(SLAMeasurement.UPTIME)
      .window(SLAWindow.MONTHLY)
      .penalty("10% monthly fee credit per 0.1% below SLA")
      .build()
    );

    // Response Time SLA
    slas.put("API_RESPONSE_TIME", SLA.builder()
      .name("API Response Time")
      .target(200)  // 200ms p95 latency
      .percentile(95)
      .measurement(SLAMeasurement.LATENCY)
      .window(SLAWindow.MONTHLY)
      .penalty("5% monthly fee credit if exceeded")
      .build()
    );

    // Error Rate SLA
    slas.put("API_ERROR_RATE", SLA.builder()
      .name("API Error Rate")
      .target(0.1)  // <0.1% error rate
      .measurement(SLAMeasurement.ERROR_RATE)
      .window(SLAWindow.MONTHLY)
      .penalty("5% monthly fee credit if exceeded")
      .build()
    );

    return slas;
  }

  @Bean
  public Map<String, SLO> configureSLOs() {
    Map<String, SLO> slos = new HashMap<>();

    // Internal SLO more strict than SLA
    slos.put("API_AVAILABILITY", SLO.builder()
      .name("API Availability")
      .target(99.95)  // Higher than 99.9% SLA
      .sli("http_request_success_rate")
      .window(SLOWindow.ROLLING_30_DAYS)
      .alertThreshold(99.92)  // Alert before SLA breach
      .build()
    );

    slos.put("API_LATENCY", SLO.builder()
      .name("API Latency p95")
      .target(150)  // 150ms, lower than 200ms SLA
      .percentile(95)
      .sli("http_request_duration_p95")
      .window(SLOWindow.ROLLING_30_DAYS)
      .alertThreshold(180)
      .build()
    );

    return slos;
  }
}

// SLA Tracking Service
@Service
public class SLATrackingService {

  private final MeterRegistry meterRegistry;
  private final IncidentRepository incidentRepository;

  // Track SLI metrics
  public void recordRequest(long durationMs, boolean success) {
    // Record request duration
    meterRegistry.timer("http.request.duration",
      "success", String.valueOf(success)
    ).record(durationMs, TimeUnit.MILLISECONDS);

    // Record success/failure
    meterRegistry.counter("http.request.total",
      "success", String.valueOf(success)
    ).increment();
  }

  // Calculate current SLA compliance
  public SLACompliance calculateSLACompliance(String slaName,
                                              LocalDate startDate,
                                              LocalDate endDate) {
    SLA sla = slaConfig.getSLA(slaName);

    switch (sla.getMeasurement()) {
      case UPTIME:
        return calculateUptimeSLA(sla, startDate, endDate);
      case LATENCY:
        return calculateLatencySLA(sla, startDate, endDate);
      case ERROR_RATE:
        return calculateErrorRateSLA(sla, startDate, endDate);
      default:
        throw new IllegalArgumentException("Unknown measurement type");
    }
  }

  private SLACompliance calculateUptimeSLA(SLA sla,
                                           LocalDate startDate,
                                           LocalDate endDate) {
    // Calculate total minutes in period
    long totalMinutes = Duration.between(
      startDate.atStartOfDay(),
      endDate.atTime(LocalTime.MAX)
    ).toMinutes();

    // Calculate downtime from incidents
    List<Incident> incidents = incidentRepository.findByDateRange(
      startDate, endDate
    );

    long downtimeMinutes = incidents.stream()
      .mapToLong(Incident::getDurationMinutes)
      .sum();

    // Calculate uptime percentage
    double uptimePercent =
      ((totalMinutes - downtimeMinutes) / (double) totalMinutes) * 100;

    boolean compliant = uptimePercent >= sla.getTarget();
    double buffer = uptimePercent - sla.getTarget();

    return new SLACompliance(
      sla.getName(),
      uptimePercent,
      sla.getTarget(),
      compliant,
      buffer,
      downtimeMinutes
    );
  }

  private SLACompliance calculateLatencySLA(SLA sla,
                                            LocalDate startDate,
                                            LocalDate endDate) {
    // Query Prometheus for p95 latency
    String query = String.format(
      "histogram_quantile(0.95, http_request_duration_bucket[30d])"
    );

    double p95Latency = prometheusClient.query(query);
    boolean compliant = p95Latency <= sla.getTarget();
    double buffer = sla.getTarget() - p95Latency;

    return new SLACompliance(
      sla.getName(),
      p95Latency,
      sla.getTarget(),
      compliant,
      buffer,
      0
    );
  }

  private SLACompliance calculateErrorRateSLA(SLA sla,
                                              LocalDate startDate,
                                              LocalDate endDate) {
    // Calculate error rate
    String successQuery = "sum(increase(http_request_total{success='true'}[30d]))";
    String totalQuery = "sum(increase(http_request_total[30d]))";

    double successRequests = prometheusClient.query(successQuery);
    double totalRequests = prometheusClient.query(totalQuery);

    double errorRate = ((totalRequests - successRequests) / totalRequests) * 100;
    boolean compliant = errorRate <= sla.getTarget();
    double buffer = sla.getTarget() - errorRate;

    return new SLACompliance(
      sla.getName(),
      errorRate,
      sla.getTarget(),
      compliant,
      buffer,
      0
    );
  }
}

// Error Budget Calculation
@Service
public class ErrorBudgetService {

  // Calculate remaining error budget
  public ErrorBudget calculateErrorBudget(String sloName) {
    SLO slo = sloConfig.getSLO(sloName);

    // Calculate allowed downtime (error budget)
    // For 99.95% SLO over 30 days: 0.05% = 21.6 minutes
    long totalMinutes = 30 * 24 * 60; // 30 days
    double allowedDowntimeMinutes =
      totalMinutes * ((100 - slo.getTarget()) / 100);

    // Calculate actual downtime
    LocalDate endDate = LocalDate.now();
    LocalDate startDate = endDate.minusDays(30);

    List<Incident> incidents = incidentRepository.findByDateRange(
      startDate, endDate
    );

    long actualDowntimeMinutes = incidents.stream()
      .mapToLong(Incident::getDurationMinutes)
      .sum();

    // Calculate remaining budget
    double remainingBudget = allowedDowntimeMinutes - actualDowntimeMinutes;
    double budgetUsedPercent =
      (actualDowntimeMinutes / allowedDowntimeMinutes) * 100;

    // Determine status
    ErrorBudgetStatus status;
    if (budgetUsedPercent < 50) {
      status = ErrorBudgetStatus.HEALTHY;
    } else if (budgetUsedPercent < 80) {
      status = ErrorBudgetStatus.WARNING;
    } else if (budgetUsedPercent < 100) {
      status = ErrorBudgetStatus.CRITICAL;
    } else {
      status = ErrorBudgetStatus.EXHAUSTED;
    }

    return new ErrorBudget(
      slo.getName(),
      allowedDowntimeMinutes,
      actualDowntimeMinutes,
      remainingBudget,
      budgetUsedPercent,
      status
    );
  }

  // Error budget policy enforcement
  public boolean canDeploy(String service) {
    ErrorBudget budget = calculateErrorBudget(service + "_AVAILABILITY");

    // Freeze deployments if error budget exhausted
    if (budget.getStatus() == ErrorBudgetStatus.EXHAUSTED) {
      logger.warn("Deployment blocked: Error budget exhausted for {}", service);
      return false;
    }

    // Require approval if critical
    if (budget.getStatus() == ErrorBudgetStatus.CRITICAL) {
      logger.warn("Deployment requires approval: Error budget critical for {}",
        service);
      // Notify for approval
      return false;
    }

    return true;
  }
}

// SLA Dashboard Data
public class SLADashboard {

  public String generateDashboard() {
    return """
      ═══════════════════════════════════════════════════
      SLA COMPLIANCE DASHBOARD - September 2025
      ═══════════════════════════════════════════════════

      API AVAILABILITY
      ----------------
      SLA Target:     99.90%
      SLO Target:     99.95%
      Actual:         99.97%
      Status:         ✅ COMPLIANT
      Downtime:       13 minutes (of 43 allowed)
      Buffer:         +30 minutes

      API RESPONSE TIME (p95)
      -----------------------
      SLA Target:     200ms
      SLO Target:     150ms
      Actual:         142ms
      Status:         ✅ COMPLIANT
      Buffer:         +8ms

      API ERROR RATE
      --------------
      SLA Target:     <0.10%
      SLO Target:     <0.05%
      Actual:         0.03%
      Status:         ✅ COMPLIANT
      Buffer:         0.02%

      ERROR BUDGET STATUS
      -------------------
      Total Budget:   21.6 minutes (30 days)
      Used:           8.2 minutes (38%)
      Remaining:      13.4 minutes (62%)
      Status:         🟢 HEALTHY

      Deployment Status: ✅ APPROVED

      RECENT INCIDENTS AFFECTING SLA
      ------------------------------
      2025-09-15 14:23 - Database connection pool (5 min) - P0
      2025-09-22 03:45 - Memory leak OOM (3.2 min) - P1

      """;
  }
}

// Uptime Calculation Table
/*
┌──────────┬──────────────┬──────────────┬──────────────┐
│ SLA      │ Downtime/Year│ Downtime/Mon │ Downtime/Week│
├──────────┼──────────────┼──────────────┼──────────────┤
│ 90%      │ 36.5 days    │ 72 hours     │ 16.8 hours   │
│ 95%      │ 18.25 days   │ 36 hours     │ 8.4 hours    │
│ 99%      │ 3.65 days    │ 7.2 hours    │ 1.68 hours   │
│ 99.9%    │ 8.76 hours   │ 43.2 minutes │ 10.1 minutes │
│ 99.95%   │ 4.38 hours   │ 21.6 minutes │ 5.04 minutes │
│ 99.99%   │ 52.6 minutes │ 4.32 minutes │ 1.01 minutes │
│ 99.999%  │ 5.26 minutes │ 25.9 seconds │ 6.05 seconds │
└──────────┴──────────────┴──────────────┴──────────────┘
*/`
      }
    },
    {
      id: 6,
      name: 'Monitoring & Alerts',
      icon: '📊',
      color: '#06b6d4',
      description: 'System observability and alerting',
      content: {
        explanation: 'Monitoring and alerting provide observability into production systems through metrics, logs, and traces. Prometheus collects time-series metrics with PromQL queries. Grafana visualizes metrics in dashboards. Alert rules detect anomalies and trigger notifications. The Four Golden Signals (latency, traffic, errors, saturation) provide comprehensive system health view. Alert fatigue prevention requires tuning thresholds, using alert grouping, and implementing proper severity levels. Good alerts are actionable, clearly defined, and avoid false positives.',
        keyPoints: [
          'Four Golden Signals: Latency (response time), Traffic (requests/sec), Errors (error rate), Saturation (resource usage)',
          'Prometheus: Time-series database with pull-based metric collection via /metrics endpoint',
          'Grafana: Visualization platform for metrics with customizable dashboards',
          'Alert rules: Threshold-based (CPU > 80%), rate-based (error rate increase), absence-based (service down)',
          'Alert routing: Severity-based routing to different channels (Slack, PagerDuty, email)',
          'Alert fatigue prevention: Proper thresholds, grouping, silencing, snoozing',
          'RED metrics: Rate (requests/sec), Errors (error rate), Duration (latency)',
          'USE metrics: Utilization (% busy), Saturation (queue depth), Errors (error count)'
        ],
        codeExample: `// Prometheus Metrics Configuration

// Spring Boot Actuator + Prometheus
@Configuration
public class MetricsConfig {

  @Bean
  public MeterRegistryCustomizer<MeterRegistry> metricsCommonTags() {
    return registry -> registry.config()
      .commonTags("application", "payment-service")
      .commonTags("environment", "production")
      .commonTags("region", "us-east-1");
  }
}

// Custom Metrics
@Service
public class PaymentService {

  private final Counter paymentCounter;
  private final Timer paymentTimer;
  private final Gauge activePayments;
  private final MeterRegistry meterRegistry;

  public PaymentService(MeterRegistry meterRegistry) {
    this.meterRegistry = meterRegistry;

    // Counter: Total payments processed
    this.paymentCounter = Counter.builder("payments.processed.total")
      .description("Total number of payments processed")
      .tag("status", "success")
      .register(meterRegistry);

    // Timer: Payment processing duration
    this.paymentTimer = Timer.builder("payments.processing.duration")
      .description("Payment processing time")
      .publishPercentiles(0.5, 0.95, 0.99)
      .register(meterRegistry);

    // Gauge: Active payment processing count
    this.activePayments = Gauge.builder("payments.active.count",
        this::getActivePaymentCount)
      .description("Number of payments currently being processed")
      .register(meterRegistry);
  }

  public void processPayment(Payment payment) {
    Timer.Sample sample = Timer.start(meterRegistry);

    try {
      // Process payment
      chargeCustomer(payment);

      // Record success
      paymentCounter.increment();

    } catch (PaymentException e) {
      // Record failure
      Counter.builder("payments.processed.total")
        .tag("status", "failure")
        .tag("error_type", e.getClass().getSimpleName())
        .register(meterRegistry)
        .increment();

      throw e;

    } finally {
      // Record duration
      sample.stop(paymentTimer);
    }
  }

  private int getActivePaymentCount() {
    // Return current active payment count
    return paymentProcessor.getActiveCount();
  }
}

// Prometheus Metric Exposition
/*
# HELP payments_processed_total Total number of payments processed
# TYPE payments_processed_total counter
payments_processed_total{status="success"} 15234.0
payments_processed_total{status="failure",error_type="PaymentDeclined"} 123.0

# HELP payments_processing_duration Payment processing time
# TYPE payments_processing_duration summary
payments_processing_duration{quantile="0.5"} 0.142
payments_processing_duration{quantile="0.95"} 0.287
payments_processing_duration{quantile="0.99"} 0.512
payments_processing_duration_count 15234.0
payments_processing_duration_sum 2145.234

# HELP payments_active_count Number of payments currently being processed
# TYPE payments_active_count gauge
payments_active_count 12.0
*/

// PromQL Queries for Monitoring

/*
# Request rate (requests per second)
rate(http_requests_total[5m])

# Error rate percentage
sum(rate(http_requests_total{status=~"5.."}[5m]))
/
sum(rate(http_requests_total[5m])) * 100

# p95 latency
histogram_quantile(0.95,
  rate(http_request_duration_seconds_bucket[5m])
)

# CPU usage percentage
100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# Memory usage percentage
(node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes)
/
node_memory_MemTotal_bytes * 100

# Database connection pool usage
hikaricp_connections_active / hikaricp_connections_max * 100

# Error budget burn rate
1 - (
  sum(rate(http_requests_total{status=~"2.."}[30d]))
  /
  sum(rate(http_requests_total[30d]))
)
*/

// Alert Rules Configuration (Prometheus alerting)
/*
# alerts.yml
groups:
  - name: production_alerts
    interval: 30s
    rules:
      # High error rate
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{status=~"5.."}[5m]))
          /
          sum(rate(http_requests_total[5m])) * 100 > 1
        for: 5m
        labels:
          severity: critical
          team: backend
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value }}% (threshold: 1%)"

      # High latency
      - alert: HighLatency
        expr: |
          histogram_quantile(0.95,
            rate(http_request_duration_seconds_bucket[5m])
          ) > 0.5
        for: 10m
        labels:
          severity: warning
          team: backend
        annotations:
          summary: "High p95 latency detected"
          description: "p95 latency is {{ $value }}s (threshold: 0.5s)"

      # Service down
      - alert: ServiceDown
        expr: up{job="payment-service"} == 0
        for: 1m
        labels:
          severity: critical
          team: sre
        annotations:
          summary: "Service is down"
          description: "{{ $labels.instance }} is unreachable"

      # High CPU usage
      - alert: HighCPUUsage
        expr: |
          100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 15m
        labels:
          severity: warning
          team: sre
        annotations:
          summary: "High CPU usage"
          description: "CPU usage is {{ $value }}% on {{ $labels.instance }}"

      # Database connection pool exhaustion
      - alert: ConnectionPoolNearExhaustion
        expr: |
          hikaricp_connections_active / hikaricp_connections_max * 100 > 80
        for: 5m
        labels:
          severity: warning
          team: backend
        annotations:
          summary: "Connection pool near exhaustion"
          description: "Connection pool usage is {{ $value }}%"

      # Disk space low
      - alert: DiskSpaceLow
        expr: |
          (node_filesystem_avail_bytes / node_filesystem_size_bytes) * 100 < 10
        for: 5m
        labels:
          severity: warning
          team: sre
        annotations:
          summary: "Low disk space"
          description: "Only {{ $value }}% disk space available"

      # Error budget exhaustion
      - alert: ErrorBudgetCritical
        expr: |
          (1 - (
            sum(rate(http_requests_total{status=~"2.."}[30d]))
            /
            sum(rate(http_requests_total[30d]))
          )) > 0.0008  # 80% of 0.1% error budget
        for: 1h
        labels:
          severity: critical
          team: engineering
        annotations:
          summary: "Error budget critical"
          description: "80% of error budget consumed"
*/

// Alert Manager Configuration
/*
# alertmanager.yml
global:
  slack_api_url: 'https://hooks.slack.com/services/XXX'

route:
  receiver: 'default'
  group_by: ['alertname', 'severity']
  group_wait: 10s
  group_interval: 5m
  repeat_interval: 4h

  routes:
    # Critical alerts to PagerDuty
    - match:
        severity: critical
      receiver: pagerduty
      continue: true

    # Warning alerts to Slack
    - match:
        severity: warning
      receiver: slack-warnings

    # Info alerts to email
    - match:
        severity: info
      receiver: email

receivers:
  - name: 'default'
    slack_configs:
      - channel: '#alerts'
        text: '{{ range .Alerts }}{{ .Annotations.summary }}\\n{{ end }}'

  - name: 'pagerduty'
    pagerduty_configs:
      - service_key: 'YOUR_PAGERDUTY_KEY'

  - name: 'slack-warnings'
    slack_configs:
      - channel: '#warnings'
        title: 'Warning Alert'
        text: '{{ .CommonAnnotations.description }}'

  - name: 'email'
    email_configs:
      - to: 'oncall@company.com'
        subject: '{{ .GroupLabels.alertname }}'
*/

// Grafana Dashboard Configuration (JSON)
/*
{
  "dashboard": {
    "title": "Production Monitoring Dashboard",
    "panels": [
      {
        "title": "Request Rate",
        "targets": [{
          "expr": "sum(rate(http_requests_total[5m]))",
          "legendFormat": "Requests/sec"
        }]
      },
      {
        "title": "Error Rate %",
        "targets": [{
          "expr": "sum(rate(http_requests_total{status=~\\"5..\\"}[5m])) / sum(rate(http_requests_total[5m])) * 100"
        }]
      },
      {
        "title": "Latency Percentiles",
        "targets": [
          {
            "expr": "histogram_quantile(0.50, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "p50"
          },
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "p95"
          },
          {
            "expr": "histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "p99"
          }
        ]
      }
    ]
  }
}
*/

// Custom Health Indicators
@Component
public class DatabaseHealthIndicator implements HealthIndicator {

  @Autowired
  private DataSource dataSource;

  @Override
  public Health health() {
    try (Connection conn = dataSource.getConnection()) {
      Statement stmt = conn.createStatement();
      ResultSet rs = stmt.executeQuery("SELECT 1");

      if (rs.next()) {
        return Health.up()
          .withDetail("database", "PostgreSQL")
          .withDetail("status", "reachable")
          .build();
      }
    } catch (SQLException e) {
      return Health.down()
        .withDetail("error", e.getMessage())
        .build();
    }

    return Health.down().build();
  }
}`
      }
    },
    {
      id: 7,
      name: 'Critical Infrastructure',
      icon: '🏗️',
      color: '#ec4899',
      description: 'High availability and disaster recovery',
      content: {
        explanation: 'Critical infrastructure ensures system reliability through redundancy, failover mechanisms, and disaster recovery planning. High Availability (HA) uses multiple instances across availability zones with load balancing. Database replication (master-slave, multi-master) prevents data loss. Backup strategies follow 3-2-1 rule: 3 copies, 2 different media, 1 offsite. Circuit breakers prevent cascading failures. Disaster Recovery Plans (DRP) define Recovery Time Objective (RTO) and Recovery Point Objective (RPO). Chaos engineering proactively tests resilience.',
        keyPoints: [
          'High Availability: Multiple instances across availability zones with load balancers',
          'Database replication: Master-slave for read scaling, multi-master for write availability',
          'Backup strategy: 3-2-1 rule (3 copies, 2 media types, 1 offsite location)',
          'Circuit breakers: Prevent cascading failures by failing fast when dependencies are down',
          'RTO (Recovery Time Objective): Maximum acceptable downtime',
          'RPO (Recovery Point Objective): Maximum acceptable data loss (backup frequency)',
          'Disaster Recovery Plan: Documented procedures, regular drills, runbooks',
          'Chaos engineering: Netflix Chaos Monkey, fault injection, game days'
        ],
        codeExample: `// High Availability Architecture

// Load Balancer Health Check Endpoint
@RestController
@RequestMapping("/health")
public class HealthCheckController {

  @Autowired
  private DataSource dataSource;

  @Autowired
  private RedisTemplate<String, String> redisTemplate;

  @GetMapping
  public ResponseEntity<HealthStatus> healthCheck() {
    boolean dbHealthy = checkDatabase();
    boolean cacheHealthy = checkCache();
    boolean diskHealthy = checkDiskSpace();

    if (dbHealthy && cacheHealthy && diskHealthy) {
      return ResponseEntity.ok(new HealthStatus("UP"));
    } else {
      // Return 503 so load balancer removes instance
      return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
        .body(new HealthStatus("DOWN"));
    }
  }

  private boolean checkDatabase() {
    try (Connection conn = dataSource.getConnection()) {
      return conn.isValid(5); // 5 second timeout
    } catch (SQLException e) {
      logger.error("Database health check failed", e);
      return false;
    }
  }

  private boolean checkCache() {
    try {
      redisTemplate.opsForValue().set("health_check", "ok", 10, TimeUnit.SECONDS);
      return true;
    } catch (Exception e) {
      logger.error("Cache health check failed", e);
      return false;
    }
  }

  private boolean checkDiskSpace() {
    File root = new File("/");
    long usableSpace = root.getUsableSpace();
    long totalSpace = root.getTotalSpace();
    double usagePercent = (1 - (double) usableSpace / totalSpace) * 100;

    return usagePercent < 90; // Fail if disk >90% full
  }
}

// Circuit Breaker Pattern (Resilience4j)
@Configuration
public class CircuitBreakerConfig {

  @Bean
  public CircuitBreakerRegistry circuitBreakerRegistry() {
    CircuitBreakerConfig config = CircuitBreakerConfig.custom()
      .failureRateThreshold(50)  // Open if 50% failure rate
      .waitDurationInOpenState(Duration.ofSeconds(30))
      .slidingWindowSize(10)
      .minimumNumberOfCalls(5)
      .permittedNumberOfCallsInHalfOpenState(3)
      .build();

    return CircuitBreakerRegistry.of(config);
  }
}

@Service
public class ExternalPaymentService {

  @Autowired
  private CircuitBreakerRegistry circuitBreakerRegistry;

  @CircuitBreaker(name = "paymentProvider", fallbackMethod = "fallbackPayment")
  public PaymentResult processPayment(Payment payment) {
    // Call external payment provider
    return paymentProviderClient.charge(payment);
  }

  // Fallback method when circuit is open
  private PaymentResult fallbackPayment(Payment payment, Exception e) {
    logger.warn("Payment provider circuit open, queuing payment", e);

    // Queue payment for later processing
    paymentQueue.add(payment);

    return PaymentResult.queued("Payment queued for processing");
  }
}

// Database Replication Configuration
/*
# PostgreSQL Master-Slave Replication

# Master (postgresql.conf)
wal_level = replica
max_wal_senders = 3
wal_keep_segments = 64

# Slave (postgresql.conf)
hot_standby = on

# Slave (recovery.conf)
standby_mode = on
primary_conninfo = 'host=master-db port=5432 user=replicator'
trigger_file = '/tmp/postgresql.trigger'
*/

// Database Failover Service
@Service
public class DatabaseFailoverService {

  @Autowired
  @Qualifier("masterDataSource")
  private DataSource masterDataSource;

  @Autowired
  @Qualifier("slaveDataSource")
  private DataSource slaveDataSource;

  private volatile boolean masterHealthy = true;

  @Scheduled(fixedRate = 10000)
  public void checkMasterHealth() {
    try (Connection conn = masterDataSource.getConnection()) {
      Statement stmt = conn.createStatement();
      stmt.execute("SELECT 1");

      if (!masterHealthy) {
        logger.info("Master database recovered");
        masterHealthy = true;
      }
    } catch (SQLException e) {
      if (masterHealthy) {
        logger.error("Master database down, failing over to slave", e);
        masterHealthy = false;

        // Trigger failover
        notificationService.alert("Database failover triggered");
      }
    }
  }

  public DataSource getDataSource() {
    return masterHealthy ? masterDataSource : slaveDataSource;
  }
}

// Backup and Restore Strategy
@Service
public class BackupService {

  private static final String BACKUP_DIR = "/var/backups/database";
  private static final String S3_BUCKET = "company-backups";

  // Daily backup (3-2-1 strategy)
  @Scheduled(cron = "0 0 2 * * *") // 2 AM daily
  public void performDailyBackup() {
    String timestamp = LocalDateTime.now()
      .format(DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss"));

    String backupFile = BACKUP_DIR + "/backup_" + timestamp + ".sql";

    try {
      // 1. Create local backup (Copy 1, Media 1 - Local disk)
      executeBackup(backupFile);

      // 2. Copy to NAS (Copy 2, Media 2 - Network storage)
      copyToNAS(backupFile);

      // 3. Upload to S3 (Copy 3, Offsite)
      uploadToS3(backupFile);

      // Verify backup integrity
      verifyBackup(backupFile);

      // Delete old backups (retain 30 days)
      cleanupOldBackups(30);

      logger.info("Backup completed successfully: {}", backupFile);

    } catch (Exception e) {
      logger.error("Backup failed", e);
      notificationService.alert("CRITICAL: Database backup failed");
    }
  }

  private void executeBackup(String backupFile) throws IOException {
    ProcessBuilder pb = new ProcessBuilder(
      "pg_dump",
      "-h", "localhost",
      "-U", "postgres",
      "-F", "c",  // Custom format (compressed)
      "-f", backupFile,
      "production_db"
    );

    Process process = pb.start();
    int exitCode = process.waitFor();

    if (exitCode != 0) {
      throw new IOException("pg_dump failed with exit code " + exitCode);
    }
  }

  private void verifyBackup(String backupFile) throws IOException {
    // Verify backup can be read
    ProcessBuilder pb = new ProcessBuilder(
      "pg_restore",
      "--list",
      backupFile
    );

    Process process = pb.start();
    int exitCode = process.waitFor();

    if (exitCode != 0) {
      throw new IOException("Backup verification failed");
    }

    logger.info("Backup verified: {}", backupFile);
  }

  public void restoreFromBackup(String backupFile) throws IOException {
    logger.warn("Starting database restore from: {}", backupFile);

    // 1. Stop application
    shutdownApplication();

    // 2. Drop existing database
    dropDatabase();

    // 3. Create fresh database
    createDatabase();

    // 4. Restore from backup
    ProcessBuilder pb = new ProcessBuilder(
      "pg_restore",
      "-h", "localhost",
      "-U", "postgres",
      "-d", "production_db",
      "-v",
      backupFile
    );

    Process process = pb.start();
    int exitCode = process.waitFor();

    if (exitCode != 0) {
      throw new IOException("Restore failed with exit code " + exitCode);
    }

    // 5. Restart application
    startApplication();

    logger.info("Database restored successfully from: {}", backupFile);
  }
}

// Disaster Recovery Plan
public class DisasterRecoveryPlan {

  /*
  ═══════════════════════════════════════════════════
  DISASTER RECOVERY PLAN
  ═══════════════════════════════════════════════════

  OBJECTIVES
  ----------
  RTO (Recovery Time Objective): 4 hours
  RPO (Recovery Point Objective): 1 hour (hourly backups)

  SCENARIOS
  ---------

  1. DATABASE CORRUPTION
     - Detection: Application errors, data inconsistencies
     - Impact: Complete service outage
     - Recovery Steps:
       a. Identify last known good backup (check backup logs)
       b. Notify stakeholders of outage and recovery timeline
       c. Restore from latest backup (automated via runbook)
       d. Replay transaction logs since backup (minimize data loss)
       e. Verify data integrity
       f. Restart application services
       g. Monitor for issues
     - Estimated Recovery Time: 2 hours

  2. COMPLETE DATA CENTER FAILURE
     - Detection: All instances unreachable
     - Impact: Complete service outage
     - Recovery Steps:
       a. Activate DR site in alternate region
       b. Update DNS to point to DR site
       c. Restore database from S3 backup to DR database
       d. Start application instances in DR region
       e. Verify functionality
       f. Communicate status to customers
     - Estimated Recovery Time: 4 hours

  3. SECURITY BREACH / RANSOMWARE
     - Detection: Security alerts, encrypted files
     - Impact: Potential data loss, service outage
     - Recovery Steps:
       a. Isolate affected systems immediately
       b. Assess extent of breach
       c. Restore from clean backup (prior to breach)
       d. Apply security patches
       e. Reset all credentials
       f. Conduct forensic analysis
       g. Notify affected parties per compliance requirements
     - Estimated Recovery Time: 8-24 hours

  COMMUNICATION PLAN
  ------------------
  - Executive Team: Immediate phone call
  - Engineering Team: Slack #incidents + PagerDuty
  - Customers: Status page update within 15 minutes
  - Updates: Every 30 minutes until resolved

  CONTACT LIST
  ------------
  - CTO: John Doe (555-1234)
  - VP Engineering: Jane Smith (555-5678)
  - Database Admin: Bob Johnson (555-9012)
  - Security Lead: Alice Williams (555-3456)

  TESTING SCHEDULE
  ----------------
  - Quarterly DR drills (full failover test)
  - Monthly backup restore verification
  - Annual tabletop exercises
  */

  public void executeDRPlan(DisasterScenario scenario) {
    logger.error("EXECUTING DISASTER RECOVERY PLAN: {}", scenario);

    switch (scenario) {
      case DATABASE_CORRUPTION:
        handleDatabaseCorruption();
        break;
      case DATA_CENTER_FAILURE:
        handleDataCenterFailure();
        break;
      case SECURITY_BREACH:
        handleSecurityBreach();
        break;
    }
  }

  private void handleDatabaseCorruption() {
    // 1. Identify backup
    String latestBackup = backupService.getLatestBackup();

    // 2. Notify stakeholders
    notificationService.sendIncidentUpdate(
      "Database corruption detected. Restoring from backup: " + latestBackup
    );

    // 3. Restore
    backupService.restoreFromBackup(latestBackup);

    // 4. Verify
    verifyDataIntegrity();

    // 5. Restart services
    applicationManager.restart();
  }
}

// Chaos Engineering - Simulating Failures
@Service
@Profile("chaos-testing")
public class ChaosMonkey {

  @Scheduled(fixedRate = 3600000) // Every hour
  public void injectChaos() {
    Random random = new Random();
    int chaos = random.nextInt(100);

    if (chaos < 10) { // 10% chance
      injectRandomFailure();
    }
  }

  private void injectRandomFailure() {
    List<Runnable> failures = List.of(
      this::slowDownDatabase,
      this::causeMemoryPressure,
      this::simulateNetworkLatency,
      this::throwRandomExceptions
    );

    failures.get(new Random().nextInt(failures.size())).run();
  }

  private void slowDownDatabase() {
    logger.warn("CHAOS: Injecting database latency");
    // Add artificial delay to database calls
  }
}`
      }
    }
  ]

  const selectedTopicRef = useRef(selectedTopic)
  useEffect(() => {
    selectedTopicRef.current = selectedTopic
  }, [selectedTopic])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedTopicRef.current) {
          e.preventDefault()
          e.stopImmediatePropagation()
          setSelectedTopic(null)
          return
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '95%',
      margin: '120px auto 0',
      background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)',
      borderRadius: '16px',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      border: '3px solid #374151'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: 'white',
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          🚨 Production Support
        </h1>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

      <div style={{
        backgroundColor: '#1f2937',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid #374151',
        marginBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.3rem',
          color: '#9ca3af',
          fontWeight: '500',
          margin: 0,
          lineHeight: '1.8',
          textAlign: 'center'
        }}>
          Complete production support guide covering incident management, root cause analysis, troubleshooting techniques,
          on-call procedures, SLA management, monitoring and alerts, and critical infrastructure for high availability.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedTopic ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {!selectedTopic ? (
          productionSupportTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              style={{
                backgroundColor: '#1f2937',
                padding: '2rem',
                borderRadius: '12px',
                border: '2px solid #374151',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#374151'
                e.currentTarget.style.borderColor = topic.color
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 8px 16px ${topic.color}33`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1f2937'
                e.currentTarget.style.borderColor = '#374151'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{topic.icon}</div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: topic.color,
                  margin: '0 0 0.5rem 0'
                }}>
                  {topic.name}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#9ca3af',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {topic.description}
                </p>
              </div>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: '600',
                color: topic.color,
                marginTop: '1rem'
              }}>
                Click to explore →
              </div>
            </div>
          ))
        ) : (
          <>
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'white',
                marginBottom: '1.5rem'
              }}>
                Support Topics
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {productionSupportTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    style={{
                      backgroundColor: selectedTopic?.id === topic.id
                        ? `${topic.color}15`
                        : '#1f2937',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: selectedTopic?.id === topic.id
                        ? `3px solid ${topic.color}`
                        : '2px solid #374151',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedTopic?.id !== topic.id) {
                        e.currentTarget.style.backgroundColor = '#374151'
                        e.currentTarget.style.borderColor = '#4b5563'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedTopic?.id !== topic.id) {
                        e.currentTarget.style.backgroundColor = '#1f2937'
                        e.currentTarget.style.borderColor = '#374151'
                      }
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>{topic.icon}</span>
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: selectedTopic?.id === topic.id ? topic.color : 'white'
                      }}>
                        {topic.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: selectedTopic.color,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: '2rem' }}>{selectedTopic.icon}</span>
                {selectedTopic.name}
              </h3>

              <div style={{
                backgroundColor: '#1f2937',
                padding: '1.5rem',
                borderRadius: '12px',
                border: `2px solid #374151`,
                marginBottom: '1.5rem'
              }}>
                <p style={{
                  fontSize: '1rem',
                  color: '#9ca3af',
                  fontWeight: '500',
                  margin: 0,
                  lineHeight: '1.7',
                  textAlign: 'justify'
                }}>
                  {selectedTopic.content.explanation}
                </p>
              </div>

              <div style={{
                backgroundColor: '#1f2937',
                padding: '1.5rem',
                borderRadius: '12px',
                border: `2px solid #374151`,
                marginBottom: '1.5rem'
              }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: selectedTopic.color,
                  margin: '0 0 1rem 0'
                }}>
                  📌 Key Points
                </h4>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {selectedTopic.content.keyPoints.map((point, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        padding: '0.75rem',
                        backgroundColor: '#374151',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        color: '#9ca3af',
                        lineHeight: '1.6'
                      }}
                    >
                      <span style={{
                        color: selectedTopic.color,
                        fontWeight: '700',
                        fontSize: '1.2rem',
                        lineHeight: '1'
                      }}>
                        •
                      </span>
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: selectedTopic.color,
                  margin: '0 0 1rem 0'
                }}>
                  💻 Code Examples
                </h4>
                <div style={{
                  backgroundColor: '#1e293b',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '2px solid #334155'
                }}>
                  <SyntaxHighlighter code={selectedTopic.content.codeExample} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductionSupport

import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import CompletionCheckbox from '../../components/CompletionCheckbox'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const TOPIC_COLORS = {
  primary: '#f59e0b',
  primaryHover: '#fbbf24',
  bg: 'rgba(245, 158, 11, 0.1)',
  border: 'rgba(245, 158, 11, 0.3)',
  arrow: '#f59e0b',
  hoverBg: 'rgba(245, 158, 11, 0.2)',
  topicBg: 'rgba(245, 158, 11, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// =============================================================================
// CUSTOM SYNTAX HIGHLIGHTER
// =============================================================================

const SyntaxHighlighter = ({ code }) => {
  const highlightCode = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    highlighted = highlighted.replace(/(\/\/.*$|#.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
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
      .replace(/\b(public|private|protected|static|final|class|interface|new|return|if|else|for|while|try|catch|void|import|package|this|null|true|false|throws|throw|extends|implements|int|long|double|boolean)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(Job|Step|JobBuilder|StepBuilder|JobRepository|Partitioner|FlatFileItemReader|FlatFileItemReaderBuilder|FlatFileItemWriter|JdbcBatchItemWriter|JdbcBatchItemWriterBuilder|ItemProcessor|ItemReader|ItemWriter|ExecutionContext|TaskExecutor|ThreadPoolTaskExecutor|PlatformTransactionManager|StepScope|BeanWrapperFieldSetMapper|FileSystemResource|PathMatchingResourcePatternResolver|Resource|DataSource|ChunkListener|ChunkContext|StepExecution|JobParameters|JobParametersBuilder|JobLauncher|TransientDataAccessException|FlatFileParseException|ValidationException|DeadlockLoserDataAccessException|AtomicLong|Logger|LoggerFactory|Instant|HashMap|Map|Stream|Files|Path|Configuration|EnableBatchProcessing|Component|Bean|Value|Override|String|Integer|Long)\b/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #b5cea8;">$1</span>')

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
      <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
    </pre>
  )
}

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const BatchArchitectureDiagram = ({ onClickConcept }) => (
  <svg viewBox="0 0 900 340" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="csvGradSB" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="partGradSB" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="workerGradSB" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="procGradSB" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="writerGradSB" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#db2777', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="dbGradSB" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#0891b2', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowSB" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
      </marker>
      <marker id="arrowSBGreen" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
      </marker>
      <marker id="arrowSBGray" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
      </marker>
      <style>{`
        .sb-clickable { cursor: pointer; transition: opacity 0.2s; }
        .sb-clickable:hover { opacity: 0.8; filter: brightness(1.2); }
      `}</style>
    </defs>

    <text x="450" y="20" fontSize="13" fontWeight="700" fill="#fbbf24" textAnchor="middle">Spring Batch Partitioned Processing Pipeline</text>
    <text x="450" y="38" fontSize="10" fill="#64748b" textAnchor="middle">Click any component to view its code and details</text>

    {/* CSV Files → Core Config (index 0) */}
    <g className="sb-clickable" onClick={() => onClickConcept(0)}>
      <rect x="20" y="70" width="110" height="100" rx="10" fill="url(#csvGradSB)" />
      <text x="75" y="93" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">CSV Files</text>
      <text x="75" y="111" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">10M rows</text>
      <text x="75" y="128" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">file1.csv</text>
      <text x="75" y="145" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">file2.csv ...</text>
      <text x="75" y="163" fontSize="7" fill="white" opacity="0.6" textAnchor="middle">click: Core Config</text>
    </g>

    {/* Arrow CSV -> Partitioner */}
    <line x1="130" y1="120" x2="175" y2="120" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowSB)" />
    <text x="152" y="110" fontSize="8" fill="#94a3b8" textAnchor="middle">split</text>

    {/* Partitioner (index 1) */}
    <g className="sb-clickable" onClick={() => onClickConcept(1)}>
      <rect x="180" y="70" width="120" height="100" rx="10" fill="url(#partGradSB)" />
      <text x="240" y="93" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Partitioner</text>
      <text x="240" y="111" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">gridSize=10</text>
      <text x="240" y="128" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">By file or</text>
      <text x="240" y="145" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">by line range</text>
      <text x="240" y="163" fontSize="7" fill="white" opacity="0.6" textAnchor="middle">click: Partitioner</text>
    </g>

    {/* Arrow Partitioner -> Workers */}
    <line x1="300" y1="100" x2="345" y2="80" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowSB)" />
    <line x1="300" y1="120" x2="345" y2="120" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowSB)" />
    <line x1="300" y1="140" x2="345" y2="160" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowSB)" />

    {/* Worker Steps / Reader (index 2) */}
    <g className="sb-clickable" onClick={() => onClickConcept(2)}>
      <rect x="350" y="55" width="140" height="130" rx="10" fill="url(#workerGradSB)" />
      <text x="420" y="78" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Reader</text>
      <text x="420" y="96" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Thread 1: chunk[0..999]</text>
      <text x="420" y="112" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Thread 2: chunk[0..999]</text>
      <text x="420" y="128" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Thread 3: chunk[0..999]</text>
      <text x="420" y="144" fontSize="9" fill="white" opacity="0.6" textAnchor="middle">... Thread 8</text>
      <text x="420" y="162" fontSize="8" fill="#fbbf24" textAnchor="middle">@StepScope per thread</text>
      <text x="420" y="178" fontSize="7" fill="white" opacity="0.6" textAnchor="middle">click: Reader</text>
    </g>

    {/* Arrow Workers -> Processor */}
    <line x1="490" y1="120" x2="535" y2="120" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowSBGreen)" />
    <text x="512" y="110" fontSize="8" fill="#94a3b8" textAnchor="middle">items</text>

    {/* Processor (index 3) */}
    <g className="sb-clickable" onClick={() => onClickConcept(3)}>
      <rect x="540" y="75" width="110" height="90" rx="10" fill="url(#procGradSB)" />
      <text x="595" y="98" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Processor</text>
      <text x="595" y="116" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Transform</text>
      <text x="595" y="133" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Validate</text>
      <text x="595" y="150" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Filter nulls</text>
      <text x="595" y="161" fontSize="7" fill="white" opacity="0.6" textAnchor="middle">click: Processor</text>
    </g>

    {/* Arrow Processor -> Writer */}
    <line x1="650" y1="120" x2="695" y2="120" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowSBGreen)" />
    <text x="672" y="110" fontSize="8" fill="#94a3b8" textAnchor="middle">batch</text>

    {/* Writer (index 4) */}
    <g className="sb-clickable" onClick={() => onClickConcept(4)}>
      <rect x="700" y="75" width="90" height="90" rx="10" fill="url(#writerGradSB)" />
      <text x="745" y="98" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Writer</text>
      <text x="745" y="116" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">JDBC</text>
      <text x="745" y="133" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Batch Insert</text>
      <text x="745" y="150" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Upsert</text>
      <text x="745" y="161" fontSize="7" fill="white" opacity="0.6" textAnchor="middle">click: Writer</text>
    </g>

    {/* Arrow Writer -> DB */}
    <line x1="790" y1="120" x2="825" y2="120" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowSBGreen)" />

    {/* DB / Performance (index 5) */}
    <g className="sb-clickable" onClick={() => onClickConcept(5)}>
      <rect x="830" y="80" width="60" height="80" rx="10" fill="url(#dbGradSB)" />
      <text x="860" y="108" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">DB</text>
      <text x="860" y="126" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Output</text>
      <text x="860" y="143" fontSize="9" fill="white" opacity="0.8" textAnchor="middle">Table</text>
      <text x="860" y="155" fontSize="7" fill="white" opacity="0.6" textAnchor="middle">click: Perf</text>
    </g>

    {/* ── Cross-cutting concerns row ── */}
    <line x1="20" y1="210" x2="890" y2="210" stroke="#374151" strokeWidth="1" strokeDasharray="4,3" />
    <text x="450" y="230" fontSize="10" fill="#94a3b8" textAnchor="middle" fontWeight="600">Cross-cutting Concerns (click to explore)</text>

    {/* Fault Tolerance (index 6) */}
    <g className="sb-clickable" onClick={() => onClickConcept(6)}>
      <rect x="60" y="248" width="200" height="55" rx="8" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="1.5" />
      <text x="160" y="270" fontSize="11" fontWeight="600" fill="#fca5a5" textAnchor="middle">Fault Tolerance</text>
      <text x="160" y="288" fontSize="9" fill="#94a3b8" textAnchor="middle">retry(3) + skip(500) + restart</text>
    </g>

    {/* Performance (index 5) */}
    <g className="sb-clickable" onClick={() => onClickConcept(5)}>
      <rect x="290" y="248" width="200" height="55" rx="8" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" strokeWidth="1.5" />
      <text x="390" y="270" fontSize="11" fontWeight="600" fill="#67e8f9" textAnchor="middle">Performance Tuning</text>
      <text x="390" y="288" fontSize="9" fill="#94a3b8" textAnchor="middle">HikariCP + G1GC + chunk sizing</text>
    </g>

    {/* Monitoring (index 7) */}
    <g className="sb-clickable" onClick={() => onClickConcept(7)}>
      <rect x="520" y="248" width="200" height="55" rx="8" fill="rgba(249, 115, 22, 0.15)" stroke="#f97316" strokeWidth="1.5" />
      <text x="620" y="270" fontSize="11" fontWeight="600" fill="#fdba74" textAnchor="middle">Monitoring</text>
      <text x="620" y="288" fontSize="9" fill="#94a3b8" textAnchor="middle">ChunkListener + AtomicLong</text>
    </g>

    {/* Core Config (index 0) */}
    <g className="sb-clickable" onClick={() => onClickConcept(0)}>
      <rect x="750" y="248" width="130" height="55" rx="8" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="815" y="270" fontSize="11" fontWeight="600" fill="#fbbf24" textAnchor="middle">Core Config</text>
      <text x="815" y="288" fontSize="9" fill="#94a3b8" textAnchor="middle">Job + Step + Executor</text>
    </g>

    {/* Summary bar */}
    <rect x="20" y="315" width="870" height="22" rx="6" fill="rgba(245, 158, 11, 0.1)" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1" />
    <text x="450" y="330" fontSize="9" fill="#fbbf24" textAnchor="middle">
      Throughput = CHUNK_SIZE (1000) x THREAD_COUNT (8) rows/commit | ~500K-1M rows/min with 8 threads
    </text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function SpringBatchProcess({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'core-config',
      name: 'Core Configuration',
      icon: '\u2699\uFE0F',
      color: '#f59e0b',
      description: 'Job and Step configuration for partitioned multi-threaded chunked processing. Partition files across threads, process chunks in parallel, write in batches.',
      details: [
        {
          name: 'Job & Step Configuration',
          explanation: 'The core strategy is Partitioned Multi-threaded Chunked Processing \u2014 partition files across threads, process chunks in parallel, write in batches. CHUNK_SIZE=1000, THREAD_COUNT=8, GRID_SIZE=10.',
          codeExample: `@Configuration
@EnableBatchProcessing
public class CsvBatchConfig {

    private static final int CHUNK_SIZE = 1000;
    private static final int THREAD_COUNT = 8;
    private static final int GRID_SIZE = 10;

    @Bean
    public Job csvImportJob(JobRepository jobRepository,
                            Step partitionedStep) {
        return new JobBuilder("csvImportJob", jobRepository)
                .start(partitionedStep)
                .build();
    }

    @Bean
    public Step partitionedStep(JobRepository jobRepository,
                                Partitioner partitioner,
                                Step workerStep,
                                TaskExecutor taskExecutor) {
        return new StepBuilder("partitionedStep", jobRepository)
                .partitioner("workerStep", partitioner)
                .step(workerStep)
                .gridSize(GRID_SIZE)
                .taskExecutor(taskExecutor)
                .build();
    }

    @Bean
    public Step workerStep(JobRepository jobRepository,
                           PlatformTransactionManager txManager,
                           ItemReader<MyRecord> csvReader,
                           ItemProcessor<MyRecord, MyRecord> processor,
                           ItemWriter<MyRecord> jdbcWriter) {
        return new StepBuilder("workerStep", jobRepository)
                .<MyRecord, MyRecord>chunk(CHUNK_SIZE, txManager)
                .reader(csvReader)
                .processor(processor)
                .writer(jdbcWriter)
                .build();
    }

    @Bean
    public TaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(THREAD_COUNT);
        executor.setMaxPoolSize(THREAD_COUNT);
        executor.setQueueCapacity(0);
        executor.setThreadNamePrefix("batch-worker-");
        executor.setWaitForTasksToCompleteOnShutdown(true);
        executor.initialize();
        return executor;
    }
}`
        },
        {
          name: 'Thread Pool Executor',
          explanation: 'The ThreadPoolTaskExecutor manages worker threads. Core pool matches CPU cores, queue capacity buffers excess work. WaitForTasksToCompleteOnShutdown ensures graceful shutdown.',
          codeExample: `@Bean
public TaskExecutor taskExecutor() {
    ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
    executor.setCorePoolSize(THREAD_COUNT);     // Match CPU cores
    executor.setMaxPoolSize(THREAD_COUNT);      // No burst expansion
    executor.setQueueCapacity(0);               // Direct handoff
    executor.setThreadNamePrefix("batch-worker-");
    executor.setWaitForTasksToCompleteOnShutdown(true);
    executor.initialize();
    return executor;
}

// Why these settings?
// - corePoolSize = maxPoolSize = THREAD_COUNT
//   Each partition gets its own thread, no dynamic scaling needed
// - queueCapacity = 0
//   Direct handoff: if all threads are busy, caller blocks
//   Prevents OOM from unbounded queueing
// - waitForTasksToCompleteOnShutdown = true
//   JVM shutdown hook waits for in-flight chunks to finish
//   Prevents partial writes and data corruption`
        }
      ]
    },
    {
      id: 'partitioner',
      name: 'Partitioner',
      icon: '\uD83D\uDCC2',
      color: '#3b82f6',
      description: 'Splits the workload across multiple threads. Strategy A: partition by file. Strategy B: partition a single large file by line range.',
      details: [
        {
          name: 'Multi-File Partitioner',
          explanation: 'Strategy A: Partition by file \u2014 each CSV file becomes a separate partition. Good when you have many files to process in parallel.',
          codeExample: `@Component
public class MultiFilePartitioner implements Partitioner {

    @Value("\${input.dir}")
    private String inputDir;

    @Override
    public Map<String, ExecutionContext> partition(int gridSize) {
        Map<String, ExecutionContext> partitions = new HashMap<>();

        Resource[] resources = new PathMatchingResourcePatternResolver()
                .getResources("file:" + inputDir + "/*.csv");

        for (int i = 0; i < resources.length; i++) {
            ExecutionContext ctx = new ExecutionContext();
            ctx.putString("fileName", resources[i].getFilename());
            ctx.putString("filePath",
                    resources[i].getFile().getAbsolutePath());
            partitions.put("partition-" + i, ctx);
        }
        return partitions;   // Each entry = 1 worker step
    }
}`
        },
        {
          name: 'Line Range Partitioner',
          explanation: 'Strategy B: Partition a single large file by line range. Pre-scans line count, divides evenly across gridSize partitions. Each partition gets a startLine and endLine in its ExecutionContext.',
          codeExample: `@Component
public class LineRangePartitioner implements Partitioner {

    @Value("\${input.file}")
    private String filePath;

    @Override
    public Map<String, ExecutionContext> partition(int gridSize) {
        long totalLines = Files.lines(Path.of(filePath)).count();
        long linesPerPartition = totalLines / gridSize;

        Map<String, ExecutionContext> partitions = new HashMap<>();
        for (int i = 0; i < gridSize; i++) {
            ExecutionContext ctx = new ExecutionContext();
            long start = i * linesPerPartition;
            long end = (i == gridSize - 1)
                    ? totalLines
                    : (i + 1) * linesPerPartition;
            ctx.putLong("startLine", start);
            ctx.putLong("endLine", end);
            ctx.putString("filePath", filePath);
            partitions.put("partition-" + i, ctx);
        }
        return partitions;
    }
}

// Example: 10M line file, gridSize=10
// partition-0: lines 0 - 999,999
// partition-1: lines 1,000,000 - 1,999,999
// ...
// partition-9: lines 9,000,000 - 9,999,999`
        }
      ]
    },
    {
      id: 'reader',
      name: 'Reader',
      icon: '\uD83D\uDCD6',
      color: '#10b981',
      description: 'Thread-safe CSV reader using @StepScope to ensure each worker thread gets its own isolated reader instance, preventing race conditions.',
      details: [
        {
          name: 'Thread-Safe CSV Reader',
          explanation: '@StepScope is CRITICAL \u2014 each thread gets its own reader instance. Without it, threads share a single instance leading to race conditions. The reader uses stepExecutionContext values injected by the partitioner.',
          codeExample: `@Bean
@StepScope
public FlatFileItemReader<MyRecord> csvReader(
        @Value("#{stepExecutionContext['filePath']}") String filePath) {

    return new FlatFileItemReaderBuilder<MyRecord>()
            .name("csvReader")
            .resource(new FileSystemResource(filePath))
            .delimited()
            .names("id", "name", "amount", "date")
            .fieldSetMapper(new BeanWrapperFieldSetMapper<>() {{
                setTargetType(MyRecord.class);
            }})
            .linesToSkip(1)  // Skip CSV header row
            .build();
}

// WHY @StepScope IS CRITICAL:
//
// Without @StepScope (BROKEN - shared state!):
//   @Bean
//   public FlatFileItemReader<MyRecord> csvReader() { ... }
//   // All 8 threads share ONE reader instance
//   // Thread 1 reads line 5, Thread 2 reads line 6
//   // Race condition: lines skipped or duplicated!
//
// With @StepScope (CORRECT):
//   @Bean @StepScope
//   public FlatFileItemReader<MyRecord> csvReader(...) { ... }
//   // Each partition step gets its OWN reader instance
//   // Thread 1 reads partition-0 file independently
//   // Thread 2 reads partition-1 file independently
//   // No shared state = thread safe`
        }
      ]
    },
    {
      id: 'processor',
      name: 'Processor',
      icon: '\uD83D\uDD04',
      color: '#8b5cf6',
      description: 'Stateless item processor for thread safety. Transforms, validates, and filters records. Returning null skips the record.',
      details: [
        {
          name: 'Stateless Item Processor',
          explanation: 'Processors must be stateless for thread safety \u2014 NO instance state. Returning null skips the record. Keep processing logic fast since it runs for every row.',
          codeExample: `@Component
public class MyItemProcessor
        implements ItemProcessor<MyRecord, MyRecord> {

    // NO instance fields! Stateless for thread safety.

    @Override
    public MyRecord process(MyRecord item) throws Exception {
        // Validate
        if (item.getAmount() == null || item.getAmount() < 0) {
            return null;  // Returning null = skip this record
        }

        // Transform
        item.setName(item.getName().trim().toUpperCase());
        item.setProcessedAt(Instant.now());

        // Enrich
        item.setCategory(categorize(item.getAmount()));

        return item;  // Pass to writer
    }

    private String categorize(double amount) {
        if (amount > 10000) return "HIGH";
        if (amount > 1000)  return "MEDIUM";
        return "LOW";
    }
}

// THREAD SAFETY RULES:
// 1. NO instance variables (no fields)
// 2. All state is local to the process() method
// 3. If you need shared state, use AtomicLong or ConcurrentHashMap
// 4. Return null to skip bad records (don't throw)
// 5. Keep it fast - this runs for EVERY row`
        }
      ]
    },
    {
      id: 'writer',
      name: 'Writer',
      icon: '\uD83D\uDCBE',
      color: '#ec4899',
      description: 'JDBC batch writer with efficient batch inserts, automatic property-to-column mapping, and upsert support via ON CONFLICT.',
      details: [
        {
          name: 'JDBC Batch Writer',
          explanation: 'JdbcBatchItemWriter performs efficient batch inserts. Uses beanMapped() for automatic property-to-column mapping. ON CONFLICT handles upserts. Also @StepScope for thread safety.',
          codeExample: `@Bean
@StepScope
public JdbcBatchItemWriter<MyRecord> jdbcWriter(DataSource dataSource) {
    return new JdbcBatchItemWriterBuilder<MyRecord>()
            .dataSource(dataSource)
            .sql("INSERT INTO processed_records " +
                 "(id, name, amount, date, category, processed_at) " +
                 "VALUES (:id, :name, :amount, :date, " +
                 ":category, :processedAt) " +
                 "ON CONFLICT (id) DO UPDATE SET " +
                 "name = EXCLUDED.name, " +
                 "amount = EXCLUDED.amount")
            .beanMapped()   // Auto-map MyRecord fields to :params
            .build();
}

// HOW beanMapped() WORKS:
// MyRecord.getId()      -> :id
// MyRecord.getName()    -> :name
// MyRecord.getAmount()  -> :amount
// MyRecord.getDate()    -> :date
//
// BATCH INSERT PERFORMANCE:
// Without batching: 10M individual INSERTs = very slow
// With CHUNK_SIZE=1000: 10K batch INSERTs = fast!
// Each chunk commits as a single transaction
//
// UPSERT with ON CONFLICT:
// If record already exists (by id), update it
// Enables safe restarts: re-running won't create duplicates`
        }
      ]
    },
    {
      id: 'performance',
      name: 'Performance Tuning',
      icon: '\uD83D\uDE80',
      color: '#06b6d4',
      description: 'Chunk size, thread count, connection pool, and JVM tuning for optimal throughput when processing 10M rows.',
      details: [
        {
          name: 'Chunk Size & Threading',
          explanation: 'Total throughput \u2248 CHUNK_SIZE \u00D7 THREAD_COUNT rows/commit. Recommended: CHUNK_SIZE 500-2000 (larger = fewer transactions, more memory), THREADS = Runtime.getRuntime().availableProcessors().',
          codeExample: `# application.yml - DataSource Configuration
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    hikari:
      maximum-pool-size: 20       # >= THREAD_COUNT + 2
      minimum-idle: 10
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000

# Spring Batch meta-table settings
  batch:
    jdbc:
      initialize-schema: always
    job:
      enabled: false              # Don't auto-run on startup

# TUNING GUIDELINES:
# -------------------------------------------------
# CHUNK_SIZE | Tradeoff
# -------------------------------------------------
#    100     | Safe, low memory, many transactions
#    500     | Good balance for most cases
#   1000     | Recommended: fewer commits, good throughput
#   2000     | High throughput, higher memory usage
#   5000+    | Risky: large rollbacks on failure
# -------------------------------------------------
# THREAD_COUNT = Runtime.getRuntime().availableProcessors()
# CONNECTION_POOL >= THREAD_COUNT + 2 (for meta tables)`
        },
        {
          name: 'JVM Tuning',
          explanation: 'For large heap processing, use G1 or ZGC garbage collector. Set initial and max heap appropriately for 10M row processing.',
          codeExample: `# JVM Flags for 10M Row Batch Processing

# G1 Garbage Collector (Java 11+)
java -Xms4g -Xmx8g \\
     -XX:+UseG1GC \\
     -XX:MaxGCPauseMillis=200 \\
     -XX:ParallelGCThreads=8 \\
     -XX:ConcGCThreads=4 \\
     -jar batch-app.jar

# ZGC (Java 17+, ultra-low pause)
java -Xms4g -Xmx8g \\
     -XX:+UseZGC \\
     -XX:+ZGenerational \\
     -jar batch-app.jar

# Memory Breakdown for 10M rows:
# - 1000 rows/chunk x 1KB/row = ~1MB per chunk in memory
# - 8 threads x 1MB = ~8MB active data
# - Spring Batch metadata + overhead = ~500MB
# - Recommended heap: 4-8 GB
#
# Monitoring:
# -XX:+PrintGCDetails -XX:+PrintGCDateStamps
# -Xlog:gc*:file=gc.log:time,uptime,level,tags`
        }
      ]
    },
    {
      id: 'fault-tolerance',
      name: 'Fault Tolerance & Restart',
      icon: '\uD83D\uDEE1\uFE0F',
      color: '#ef4444',
      description: 'Retry for transient DB errors, skip for bad CSV lines, noRollback for validation exceptions. Built-in restartability via job meta tables.',
      details: [
        {
          name: 'Retry & Skip Policies',
          explanation: 'Spring Batch stores job state in its meta tables \u2014 restartability is built in. Configure retry for transient DB errors, skip for bad CSV lines, noRollback for validation exceptions.',
          codeExample: `@Bean
public Step workerStep(JobRepository jobRepository,
                       PlatformTransactionManager txManager,
                       ItemReader<MyRecord> csvReader,
                       ItemProcessor<MyRecord, MyRecord> processor,
                       ItemWriter<MyRecord> jdbcWriter) {
    return new StepBuilder("workerStep", jobRepository)
            .<MyRecord, MyRecord>chunk(1000, txManager)
            .reader(csvReader)
            .processor(processor)
            .writer(jdbcWriter)
            .faultTolerant()
            // Retry transient DB errors (deadlocks, timeouts)
            .retry(TransientDataAccessException.class)
            .retry(DeadlockLoserDataAccessException.class)
            .retryLimit(3)
            // Skip bad CSV lines (up to 1000 bad records)
            .skip(FlatFileParseException.class)
            .skip(ValidationException.class)
            .skipLimit(1000)
            // Don't rollback on validation errors
            .noRollback(ValidationException.class)
            .build();
}

// RESTART: Re-run the same job after failure
JobParameters params = new JobParametersBuilder()
        .addString("inputFile", "/data/input.csv")
        .addLong("timestamp", System.currentTimeMillis())
        .toJobParameters();

// First run: processes partitions 0-4, fails on partition 5
jobLauncher.run(csvImportJob, params);

// Restart: Spring Batch reads BATCH_STEP_EXECUTION table
// Skips completed partitions 0-4, resumes from partition 5
jobLauncher.run(csvImportJob, params);`
        }
      ]
    },
    {
      id: 'monitoring',
      name: 'Monitoring',
      icon: '\uD83D\uDCCA',
      color: '#f97316',
      description: 'ChunkListener tracks processing progress with thread-safe counters. Logs every 100K rows to show progress without log flooding.',
      details: [
        {
          name: 'Chunk Listener Metrics',
          explanation: 'ChunkListener tracks processing progress. Uses AtomicLong for thread-safe counting. Logs every 100K rows to avoid log flooding while still showing progress.',
          codeExample: `@Component
public class BatchMetricsListener implements ChunkListener {

    private static final Logger log =
            LoggerFactory.getLogger(BatchMetricsListener.class);

    private final AtomicLong totalProcessed = new AtomicLong(0);
    private final AtomicLong totalErrors = new AtomicLong(0);
    private final Instant startTime = Instant.now();

    @Override
    public void beforeChunk(ChunkContext context) {
        // No-op: could start a timer here
    }

    @Override
    public void afterChunk(ChunkContext context) {
        StepExecution stepExecution =
                context.getStepContext().getStepExecution();
        long count = totalProcessed.addAndGet(
                stepExecution.getWriteCount());

        // Log every 100K rows to avoid log flooding
        if (count % 100_000 < 1000) {
            long elapsed = Instant.now().getEpochSecond()
                    - startTime.getEpochSecond();
            double rowsPerSec = elapsed > 0
                    ? (double) count / elapsed : 0;

            log.info("Progress: {} rows processed, " +
                     "{} errors, {:.0f} rows/sec, " +
                     "elapsed: {}s",
                     count, totalErrors.get(),
                     rowsPerSec, elapsed);
        }
    }

    @Override
    public void afterChunkError(ChunkContext context) {
        totalErrors.incrementAndGet();
        log.warn("Chunk error in step: {}",
                context.getStepContext().getStepName());
    }
}

// Sample output:
// INFO  Progress: 100000 rows processed, 0 errors, 12500 rows/sec, elapsed: 8s
// INFO  Progress: 200000 rows processed, 2 errors, 13333 rows/sec, elapsed: 15s
// ...
// INFO  Progress: 10000000 rows processed, 47 errors, 14285 rows/sec, elapsed: 700s`
        }
      ]
    }
  ]

  // =============================================================================
  // NAVIGATION HANDLERS
  // =============================================================================

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  const handlePreviousConcept = () => {
    if (selectedConceptIndex > 0) {
      setSelectedConceptIndex(selectedConceptIndex - 1)
      setSelectedDetailIndex(0)
    }
  }

  const handleNextConcept = () => {
    if (selectedConceptIndex < concepts.length - 1) {
      setSelectedConceptIndex(selectedConceptIndex + 1)
      setSelectedDetailIndex(0)
    }
  }

  // =============================================================================
  // BREADCRUMB CONFIGURATION
  // =============================================================================

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'System Design', icon: '\uD83C\uDFD7\uFE0F', page: 'System Design' },
      { name: 'Spring Batch Process', icon: '\u2699\uFE0F', page: 'Spring Batch Process' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index) => {
    if (index === 0) {
      onBack()
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)
    }
  }

  // =============================================================================
  // KEYBOARD NAVIGATION
  // =============================================================================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (selectedConcept) {
          setSelectedConceptIndex(null)
        } else {
          onBack()
        }
      } else if (e.key === 'ArrowLeft' && selectedConceptIndex !== null) {
        e.preventDefault()
        handlePreviousConcept()
      } else if (e.key === 'ArrowRight' && selectedConceptIndex !== null) {
        e.preventDefault()
        handleNextConcept()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

  // =============================================================================
  // STYLES
  // =============================================================================

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #111827, #1a2332, #111827)',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }

  const headerStyle = {
    maxWidth: '1400px',
    margin: '0 auto 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  }

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(245, 158, 11, 0.2)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    borderRadius: '0.5rem',
    color: '#fbbf24',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Spring Batch: 10M CSV Row Processing</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(245, 158, 11, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(245, 158, 11, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          &larr; Back to System Design
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={TOPIC_COLORS}
        />
      </div>

      {/* Collapsible Sidebar for quick concept navigation */}
      <CollapsibleSidebar
        items={concepts}
        selectedIndex={selectedConceptIndex ?? -1}
        onSelect={(index) => {
          setSelectedConceptIndex(index)
          setSelectedDetailIndex(0)
        }}
        title="Concepts"
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.icon}
        primaryColor={TOPIC_COLORS.primary}
      />

      {/* Architecture Overview */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid #374151'
        }}>
          <h2 style={{ color: '#fbbf24', margin: '0 0 1rem 0', fontSize: '1.25rem' }}>
            Spring Batch Partitioned Processing Architecture
          </h2>
          <BatchArchitectureDiagram onClickConcept={(i) => { setSelectedConceptIndex(i); setSelectedDetailIndex(0); }} />
          <p style={{ color: '#9ca3af', margin: '1rem 0 0 0', textAlign: 'center', fontSize: '0.9rem' }}>
            A partitioned multi-threaded chunked processing pipeline for efficiently importing 10M CSV rows into a database using Spring Batch.
          </p>
        </div>
      </div>

      {/* Concept Cards Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {concepts.map((concept, index) => (
          <div
            key={concept.id}
            onClick={() => setSelectedConceptIndex(index)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: `1px solid ${concept.color}40`,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = `0 20px 40px ${concept.color}20`
              e.currentTarget.style.borderColor = concept.color
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.borderColor = `${concept.color}40`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div onClick={(e) => e.stopPropagation()} style={{ transform: 'scale(0.9)' }}>
                <CompletionCheckbox problemId={`SpringBatchProcess-${concept.id}`} />
              </div>
              <span style={{ fontSize: '2.5rem' }}>{concept.icon}</span>
              <h3 style={{ color: concept.color, margin: 0, fontSize: '1.25rem' }}>{concept.name}</h3>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>{concept.description}</p>
            <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
              {concept.details.length} topics - Click to explore
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Selected Concept */}
      {selectedConcept && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => setSelectedConceptIndex(null)}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              borderRadius: '1rem',
              padding: '2rem',
              maxWidth: '1400px', height: '90vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`,
              width: '100%'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu || onBack}
              colors={TOPIC_COLORS}
            />

            {/* Modal Header with Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #334155'
            }}>
              <h2 style={{
                color: selectedConcept.color,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.25rem'
              }}>
                <span>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button
                  onClick={handlePreviousConcept}
                  disabled={selectedConceptIndex === 0}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >&larr;</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>
                  {selectedConceptIndex + 1}/{concepts.length}
                </span>
                <button
                  onClick={handleNextConcept}
                  disabled={selectedConceptIndex === concepts.length - 1}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >&rarr;</button>
                <button
                  onClick={() => setSelectedConceptIndex(null)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '0.375rem',
                    color: '#f87171',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    marginLeft: '0.5rem'
                  }}
                >X</button>
              </div>
            </div>

            {/* Subtopic Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDetailIndex(i)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)',
                    border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`,
                    borderRadius: '0.5rem',
                    color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: selectedDetailIndex === i ? '600' : '400',
                    transition: 'all 0.2s'
                  }}
                >
                  {detail.name}
                </button>
              ))}
            </div>

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              return (
                <div>
                  {/* Detail Name */}
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                    {detail.name}
                  </h3>

                  {/* Explanation */}
                  <p style={{
                    color: '#e2e8f0',
                    lineHeight: '1.8',
                    marginBottom: '1rem',
                    background: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'left'
                  }}>
                    {detail.explanation}
                  </p>

                  {/* Code Example */}
                  {detail.codeExample && (
                    <div style={{
                      padding: '1rem',
                      margin: 0,
                      borderRadius: '0.5rem',
                      fontSize: '0.8rem',
                      border: '1px solid #334155',
                      background: '#0f172a'
                    }}>
                      <SyntaxHighlighter code={detail.codeExample} />
                    </div>
                  )}
                </div>
              )
            })()}

          </div>
        </div>
      )}
    </div>
  )
}

export default SpringBatchProcess

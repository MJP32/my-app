import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

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
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|super|this|null|default)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean|var)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ArrayList|Map|HashMap|Optional|Exception|Override|Integer|Long|Component|Bean|Configuration|Autowired|Job|Step|JobBuilderFactory|StepBuilderFactory|ItemReader|ItemProcessor|ItemWriter|FlatFileItemReader|FlatFileItemWriter|JdbcCursorItemReader|JpaPagingItemReader|JsonItemReader|JdbcBatchItemWriter|JpaItemWriter|CompositeItemProcessor|CompositeItemWriter|ValidatingItemProcessor|StepContribution|ChunkContext|RepeatStatus|JobExecution|StepExecution|JobParameters|JobParametersBuilder|JobLauncher|JobRepository|PlatformTransactionManager|TaskExecutor|SimpleAsyncTaskExecutor|ThreadPoolTaskExecutor|DelimitedLineTokenizer|BeanWrapperFieldSetMapper|DefaultLineMapper|BeanPropertyItemSqlParameterSourceProvider|SkipPolicy|RetryPolicy|SimpleRetryPolicy|SkipListener|JobExecutionListener|StepExecutionListener|ChunkListener|ExecutionContext|RunIdIncrementer|FlowBuilder|Flow|JobParametersValidator|DefaultJobParametersValidator|CommandLineJobRunner|BatchStatus|ExitStatus|LineMapper|FieldSet|FieldSetMapper|Resource|Value|Scheduled|RestController|RequestMapping|ResponseEntity|PathVariable|DataSource|StaxEventItemReader|StaxEventItemWriter|ClassPathResource|FileSystemResource|BeanPropertyItemSqlParameterSourceProvider)\b/g, '<span style="color: #4ec9b0;">$1</span>')
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

function SpringBatch({ onBack, breadcrumb }) {
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #064e3b, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
        >
          Back to Frameworks
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          background: 'linear-gradient(to right, #6ee7b7, #34d399)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: 0
        }}>
          Spring Batch
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        A lightweight, comprehensive framework for robust batch processing in Java enterprise applications
      </p>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        borderBottom: '2px solid #374151',
        overflowX: 'auto'
      }}>
        {['overview', 'jobs', 'readers', 'processors', 'writers', 'fault', 'scheduling'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSection(tab)}
            style={{
              padding: '1rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: activeSection === tab ? '#f59e0b' : 'transparent',
              color: activeSection === tab ? 'white' : '#9ca3af',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textTransform: 'capitalize',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (activeSection !== tab) {
                e.target.style.backgroundColor = '#374151'
                e.target.style.color = '#d1d5db'
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== tab) {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = '#9ca3af'
              }
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Section */}
      {activeSection === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              What is Spring Batch?
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Spring Batch is a lightweight, comprehensive batch framework designed to enable the development of
              robust batch applications vital for daily operations of enterprise systems. It provides reusable
              functions essential for processing large volumes of records, including logging/tracing, transaction
              management, job processing statistics, job restart, skip, and resource management.
            </p>
            <div style={{
              backgroundColor: '#064e3b',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #f59e0b'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
                <strong>Key Benefit:</strong> Chunk-oriented processing that reads, processes, and writes data in configurable chunks within a single transaction, providing automatic commit intervals and rollback on failure.
              </p>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#d1d5db', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
              Getting Started - Maven Dependency
            </h3>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// build.gradle
dependencies {
    implementation "org.springframework.boot:spring-boot-starter-batch"
    implementation "org.springframework.boot:spring-boot-starter-jdbc"
    runtimeOnly "com.h2database:h2" // For job repository metadata
    testImplementation "org.springframework.batch:spring-batch-test"
}

// Or Maven pom.xml
// <dependency>
//     <groupId>org.springframework.boot</groupId>
//     <artifactId>spring-boot-starter-batch</artifactId>
// </dependency>
// <dependency>
//     <groupId>org.springframework.boot</groupId>
//     <artifactId>spring-boot-starter-jdbc</artifactId>
// </dependency>`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Architecture: Job &rarr; Step &rarr; (Reader &rarr; Processor &rarr; Writer)
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {[
                { icon: '\u{1F4CB}', title: 'Job', desc: 'Top-level entity representing a complete batch process. A Job is composed of one or more Steps and can be parameterized and restarted.' },
                { icon: '\u{1F9E9}', title: 'Step', desc: 'An independent, sequential phase within a Job. Each Step encapsulates a reader, processor, and writer (chunk-oriented) or a single Tasklet.' },
                { icon: '\u{1F4E5}', title: 'ItemReader', desc: 'Reads input data one item at a time from a data source (CSV file, database, message queue, etc.).' },
                { icon: '\u{2699}\u{FE0F}', title: 'ItemProcessor', desc: 'Transforms, validates, or filters each item. Return null to skip an item. Optional component.' },
                { icon: '\u{1F4E4}', title: 'ItemWriter', desc: 'Writes processed items in chunks to a data target (database, file, message queue, etc.).' },
                { icon: '\u{1F4E6}', title: 'Chunk', desc: 'A configurable number of items read, processed, and written together in a single transaction boundary.' }
              ].map((feature, index) => (
                <div key={index} style={{
                  backgroundColor: '#1f2937',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #374151'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{feature.icon}</div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.5rem' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#9ca3af', margin: 0 }}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Minimal Batch Application
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              A complete Spring Batch application that reads from a CSV file, transforms each record, and writes to a database:
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`@SpringBootApplication
@EnableBatchProcessing
public class BatchApplication {

    public static void main(String[] args) {
        SpringApplication.run(BatchApplication.class, args);
    }
}

@Configuration
public class ImportJobConfig {

    @Autowired
    private JobBuilderFactory jobBuilderFactory;

    @Autowired
    private StepBuilderFactory stepBuilderFactory;

    @Bean
    public Job importJob(Step importStep) {
        return jobBuilderFactory.get("importJob")
            .incrementer(new RunIdIncrementer())
            .start(importStep)
            .build();
    }

    @Bean
    public Step importStep(ItemReader<PersonCsv> reader,
                           ItemProcessor<PersonCsv, Person> processor,
                           ItemWriter<Person> writer) {
        return stepBuilderFactory.get("importStep")
            .<PersonCsv, Person>chunk(100) // commit every 100 items
            .reader(reader)
            .processor(processor)
            .writer(writer)
            .build();
    }
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Chunk-Oriented Processing Model
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Spring Batch reads items one at a time using the ItemReader, hands each to the ItemProcessor, and
              collects processed items into a chunk. When the chunk reaches the configured size, the entire chunk
              is passed to the ItemWriter to be written in a single transaction.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// Pseudocode for chunk-oriented processing:
// List items = new ArrayList();
// for (int i = 0; i < chunkSize; i++) {
//     Object item = itemReader.read();
//     if (item == null) break;  // no more data
//     Object processed = itemProcessor.process(item);
//     if (processed != null) {  // null means skip
//         items.add(processed);
//     }
// }
// itemWriter.write(items);  // write entire chunk at once

// Configuring chunk size in a Step
@Bean
public Step processOrdersStep(ItemReader<Order> reader,
                               ItemProcessor<Order, OrderSummary> processor,
                               ItemWriter<OrderSummary> writer) {
    return stepBuilderFactory.get("processOrdersStep")
        .<Order, OrderSummary>chunk(250) // 250 items per transaction
        .reader(reader)
        .processor(processor)
        .writer(writer)
        .build();
}

// Tasklet-based Step (for non-chunk operations)
@Bean
public Step cleanupStep() {
    return stepBuilderFactory.get("cleanupStep")
        .tasklet((StepContribution contribution, ChunkContext chunkContext) -> {
            // Execute arbitrary logic (e.g., delete temp files)
            Files.deleteIfExists(Path.of("/tmp/batch-staging"));
            return RepeatStatus.FINISHED;
        })
        .build();
}`} />
            </div>
          </div>
        </div>
      )}

      {/* Jobs Section */}
      {activeSection === 'jobs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Simple Job Configuration
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              A Job is the top-level batch entity. It is composed of Steps that execute sequentially or conditionally.
              Jobs are identified by name and can accept parameters to vary behavior between runs.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`@Configuration
public class SimpleJobConfig {

    @Autowired
    private JobBuilderFactory jobBuilderFactory;

    @Autowired
    private StepBuilderFactory stepBuilderFactory;

    @Bean
    public Job dailyReportJob(Step extractStep,
                               Step transformStep,
                               Step loadStep) {
        return jobBuilderFactory.get("dailyReportJob")
            .incrementer(new RunIdIncrementer())
            .preventRestart() // Job cannot be restarted once complete
            .start(extractStep)
            .next(transformStep)
            .next(loadStep)
            .build();
    }

    // Sequential multi-step job with a validator
    @Bean
    public Job validatedJob(Step step1, Step step2) {
        return jobBuilderFactory.get("validatedJob")
            .incrementer(new RunIdIncrementer())
            .validator(new DefaultJobParametersValidator(
                new String[]{"inputFile"},   // required params
                new String[]{"outputDir"}    // optional params
            ))
            .start(step1)
            .next(step2)
            .build();
    }
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Conditional Flows
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Use conditional logic to determine which Step to execute next based on the exit status of a previous Step.
              This enables branching logic, error-handling flows, and decision-based routing.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`@Bean
public Job conditionalFlowJob(Step validateStep,
                               Step processStep,
                               Step errorStep,
                               Step reportStep) {
    return jobBuilderFactory.get("conditionalFlowJob")
        .incrementer(new RunIdIncrementer())
        .start(validateStep)
            .on("FAILED").to(errorStep)     // If validation fails
            .from(validateStep)
            .on("*").to(processStep)        // Any other status
            .from(processStep)
            .on("COMPLETED").to(reportStep) // After processing
            .from(processStep)
            .on("FAILED").fail()            // Stop the job on failure
        .end()
        .build();
}

// Custom ExitStatus for more granular control
@Bean
public Step validateStep() {
    return stepBuilderFactory.get("validateStep")
        .tasklet((contribution, chunkContext) -> {
            boolean valid = performValidation();
            if (!valid) {
                contribution.setExitStatus(
                    new ExitStatus("INVALID_DATA"));
            }
            return RepeatStatus.FINISHED;
        })
        .build();
}

// Decider-based flow for complex routing
@Bean
public Job deciderJob(Step initStep,
                      Step evenStep,
                      Step oddStep) {
    return jobBuilderFactory.get("deciderJob")
        .incrementer(new RunIdIncrementer())
        .start(initStep)
        .next((JobExecution jobExecution, StepExecution stepExecution) -> {
            int count = stepExecution.getReadCount();
            return new FlowExecutionStatus(
                count % 2 == 0 ? "EVEN" : "ODD");
        })
        .on("EVEN").to(evenStep)
        .on("ODD").to(oddStep)
        .end()
        .build();
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Parallel Steps
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Execute multiple Steps concurrently using split flows. Each flow runs on a separate thread, and the
              Job waits for all parallel flows to complete before proceeding.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`@Bean
public Job parallelJob(Step loadCustomersStep,
                        Step loadOrdersStep,
                        Step loadProductsStep,
                        Step aggregateStep) {

    // Define parallel flows
    Flow customersFlow = new FlowBuilder<SimpleFlow>("customersFlow")
        .start(loadCustomersStep).build();

    Flow ordersFlow = new FlowBuilder<SimpleFlow>("ordersFlow")
        .start(loadOrdersStep).build();

    Flow productsFlow = new FlowBuilder<SimpleFlow>("productsFlow")
        .start(loadProductsStep).build();

    // Split into parallel execution
    Flow parallelFlow = new FlowBuilder<SimpleFlow>("parallelFlow")
        .split(new SimpleAsyncTaskExecutor())
        .add(customersFlow, ordersFlow, productsFlow)
        .build();

    return jobBuilderFactory.get("parallelJob")
        .incrementer(new RunIdIncrementer())
        .start(parallelFlow)
        .next(aggregateStep) // Runs after all parallel steps complete
        .end()
        .build();
}

// Multi-threaded Step (partition within a single Step)
@Bean
public Step multiThreadedStep(ItemReader<Record> reader,
                               ItemProcessor<Record, Record> processor,
                               ItemWriter<Record> writer) {
    return stepBuilderFactory.get("multiThreadedStep")
        .<Record, Record>chunk(100)
        .reader(reader)
        .processor(processor)
        .writer(writer)
        .taskExecutor(new SimpleAsyncTaskExecutor())
        .throttleLimit(4) // Max 4 concurrent threads
        .build();
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Job Parameters and Listeners
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Job parameters provide runtime configuration and ensure job instance uniqueness. Listeners allow you
              to hook into the Job and Step lifecycle for logging, auditing, and cleanup.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// Accessing Job Parameters in a reader bean (late-binding)
@Bean
@StepScope
public FlatFileItemReader<Customer> reader(
        @Value("#{jobParameters['inputFile']}") String inputFile) {
    return new FlatFileItemReaderBuilder<Customer>()
        .name("customerReader")
        .resource(new FileSystemResource(inputFile))
        .delimited()
        .names("id", "name", "email")
        .targetType(Customer.class)
        .build();
}

// Launching a Job with parameters
@Component
public class JobRunner {

    @Autowired
    private JobLauncher jobLauncher;

    @Autowired
    private Job importJob;

    public void runJob(String filePath) throws Exception {
        JobParameters params = new JobParametersBuilder()
            .addString("inputFile", filePath)
            .addLocalDateTime("runTime", LocalDateTime.now())
            .addLong("run.id", System.currentTimeMillis())
            .toJobParameters();

        JobExecution execution = jobLauncher.run(importJob, params);
        System.out.println("Job Status: " + execution.getStatus());
    }
}

// Job Execution Listener
@Component
public class JobCompletionListener implements JobExecutionListener {

    @Override
    public void beforeJob(JobExecution jobExecution) {
        System.out.println("Job " + jobExecution.getJobInstance().getJobName()
            + " starting with params: " + jobExecution.getJobParameters());
    }

    @Override
    public void afterJob(JobExecution jobExecution) {
        if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
            System.out.println("Job completed successfully!");
        } else if (jobExecution.getStatus() == BatchStatus.FAILED) {
            System.out.println("Job FAILED: "
                + jobExecution.getAllFailureExceptions());
        }
    }
}

// Registering the listener on a Job
@Bean
public Job listenedJob(Step step1, JobCompletionListener listener) {
    return jobBuilderFactory.get("listenedJob")
        .incrementer(new RunIdIncrementer())
        .listener(listener)
        .start(step1)
        .build();
}`} />
            </div>
          </div>
        </div>
      )}

      {/* Readers Section */}
      {activeSection === 'readers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              FlatFileItemReader (CSV / Delimited Files)
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              The most common reader for processing flat files. Supports delimited (CSV, TSV) and fixed-width formats.
              Uses a LineMapper to convert each line into a domain object.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`@Bean
@StepScope
public FlatFileItemReader<Customer> csvReader(
        @Value("#{jobParameters['inputFile']}") String inputFile) {

    return new FlatFileItemReaderBuilder<Customer>()
        .name("customerCsvReader")
        .resource(new ClassPathResource(inputFile))
        .linesToSkip(1) // Skip CSV header row
        .delimited()
        .delimiter(",")
        .names("id", "firstName", "lastName", "email", "balance")
        .fieldSetMapper(new BeanWrapperFieldSetMapper<>() {{
            setTargetType(Customer.class);
        }})
        .build();
}

// Manual configuration with DefaultLineMapper
@Bean
public FlatFileItemReader<Transaction> transactionReader() {
    FlatFileItemReader<Transaction> reader = new FlatFileItemReader<>();
    reader.setResource(new ClassPathResource("transactions.csv"));
    reader.setLinesToSkip(1);

    DefaultLineMapper<Transaction> lineMapper = new DefaultLineMapper<>();

    DelimitedLineTokenizer tokenizer = new DelimitedLineTokenizer();
    tokenizer.setNames("txnId", "amount", "currency", "date", "type");
    tokenizer.setDelimiter("|"); // Pipe-delimited

    BeanWrapperFieldSetMapper<Transaction> fieldMapper =
        new BeanWrapperFieldSetMapper<>();
    fieldMapper.setTargetType(Transaction.class);

    lineMapper.setLineTokenizer(tokenizer);
    lineMapper.setFieldSetMapper(fieldMapper);
    reader.setLineMapper(lineMapper);

    return reader;
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              JdbcCursorItemReader (Database - Cursor)
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Opens a database cursor and streams rows one at a time. Efficient for large result sets since it does
              not load all rows into memory. Uses a standard JDBC ResultSet under the hood.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`@Bean
public JdbcCursorItemReader<Order> orderCursorReader(DataSource dataSource) {
    return new JdbcCursorItemReaderBuilder<Order>()
        .name("orderCursorReader")
        .dataSource(dataSource)
        .sql("SELECT id, customer_id, total, status, created_at " +
             "FROM orders WHERE status = ? ORDER BY created_at")
        .preparedStatementSetter(ps -> ps.setString(1, "PENDING"))
        .rowMapper((rs, rowNum) -> {
            Order order = new Order();
            order.setId(rs.getLong("id"));
            order.setCustomerId(rs.getLong("customer_id"));
            order.setTotal(rs.getBigDecimal("total"));
            order.setStatus(rs.getString("status"));
            order.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
            return order;
        })
        .fetchSize(500)       // JDBC fetch size hint
        .maxRows(10000)       // Maximum rows to read
        .saveState(true)      // Enable restart capability
        .build();
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              JpaPagingItemReader (Database - JPA Paging)
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Reads data from a database using JPA queries in pages. Each page is a separate query, making it
              suitable for multi-threaded Steps. Unlike the cursor reader, it does not hold an open cursor.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`@Bean
@StepScope
public JpaPagingItemReader<Invoice> invoicePagingReader(
        EntityManagerFactory entityManagerFactory,
        @Value("#{jobParameters['minAmount']}") Double minAmount) {

    Map<String, Object> params = new HashMap<>();
    params.put("minAmount", minAmount);
    params.put("status", "UNPAID");

    return new JpaPagingItemReaderBuilder<Invoice>()
        .name("invoicePagingReader")
        .entityManagerFactory(entityManagerFactory)
        .queryString(
            "SELECT i FROM Invoice i " +
            "WHERE i.amount >= :minAmount AND i.status = :status " +
            "ORDER BY i.dueDate ASC")
        .parameterValues(params)
        .pageSize(50)  // Number of items per page query
        .build();
}

// Using a native query
@Bean
public JpaPagingItemReader<Product> nativeQueryReader(
        EntityManagerFactory emf) {
    return new JpaPagingItemReaderBuilder<Product>()
        .name("productReader")
        .entityManagerFactory(emf)
        .queryString("SELECT p FROM Product p WHERE p.stock < 10")
        .pageSize(100)
        .build();
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              JsonItemReader and Custom ItemReader
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Spring Batch provides a JsonItemReader for reading JSON arrays. For any data source not covered by
              built-in readers, you can implement the ItemReader interface directly.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// JSON Array Reader
@Bean
public JsonItemReader<Employee> jsonReader() {
    return new JsonItemReaderBuilder<Employee>()
        .name("employeeJsonReader")
        .resource(new ClassPathResource("employees.json"))
        .jsonObjectReader(new JacksonJsonObjectReader<>(Employee.class))
        .build();
}

// Custom ItemReader - reading from a REST API
@Component
@StepScope
public class RestApiItemReader implements ItemReader<ApiRecord> {

    private final RestTemplate restTemplate;
    private int currentPage = 0;
    private List<ApiRecord> currentBatch;
    private int currentIndex = 0;

    public RestApiItemReader(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public ApiRecord read() throws Exception {
        // Fetch next page if current batch is exhausted
        if (currentBatch == null || currentIndex >= currentBatch.size()) {
            currentBatch = fetchNextPage();
            currentIndex = 0;
            if (currentBatch == null || currentBatch.isEmpty()) {
                return null; // Signal end of data
            }
        }
        return currentBatch.get(currentIndex++);
    }

    private List<ApiRecord> fetchNextPage() {
        String url = String.format(
            "https://api.example.com/records?page=%d&size=100",
            currentPage++);
        ApiResponse response = restTemplate
            .getForObject(url, ApiResponse.class);
        return response != null ? response.getData() : null;
    }
}`} />
            </div>
          </div>
        </div>
      )}

      {/* Processors Section */}
      {activeSection === 'processors' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Basic ItemProcessor - Transformation
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              An ItemProcessor transforms an input item into an output item. The input and output types can be different,
              enabling type-safe transformations. Return null from the process method to filter (skip) an item.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// Simple transformation processor
@Component
public class PersonProcessor implements ItemProcessor<PersonCsv, Person> {

    @Override
    public Person process(PersonCsv item) throws Exception {
        // Transform CSV record into domain entity
        Person person = new Person();
        person.setFullName(
            item.getFirstName().trim() + " " + item.getLastName().trim());
        person.setEmail(item.getEmail().toLowerCase().trim());
        person.setRegisteredAt(LocalDateTime.now());
        person.setStatus("ACTIVE");
        return person;
    }
}

// Filtering processor - return null to skip items
@Component
public class ActiveCustomerFilter
        implements ItemProcessor<Customer, Customer> {

    @Override
    public Customer process(Customer customer) throws Exception {
        // Return null to skip inactive customers
        if (customer.getLastLoginDate() == null ||
            customer.getLastLoginDate()
                .isBefore(LocalDate.now().minusYears(1))) {
            return null; // Filtered out - will not be written
        }
        return customer;
    }
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              CompositeItemProcessor
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Chain multiple processors together in sequence. Each processor's output becomes the next processor's input.
              If any processor returns null, the item is skipped entirely.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`@Bean
public CompositeItemProcessor<RawOrder, EnrichedOrder> compositeProcessor() {
    CompositeItemProcessor<RawOrder, EnrichedOrder> composite =
        new CompositeItemProcessor<>();

    composite.setDelegates(List.of(
        validationProcessor(),    // Step 1: Validate
        enrichmentProcessor(),    // Step 2: Enrich with external data
        transformProcessor()      // Step 3: Transform to output type
    ));

    return composite;
}

@Bean
public ItemProcessor<RawOrder, RawOrder> validationProcessor() {
    return order -> {
        if (order.getTotal() == null || order.getTotal().signum() <= 0) {
            return null; // Skip invalid orders
        }
        if (order.getCustomerId() == null) {
            return null; // Skip orders with no customer
        }
        return order;
    };
}

@Bean
public ItemProcessor<RawOrder, RawOrder> enrichmentProcessor() {
    return order -> {
        // Look up customer details from external service
        CustomerDetails details = customerService
            .findById(order.getCustomerId());
        order.setCustomerName(details.getName());
        order.setCustomerTier(details.getTier());
        return order;
    };
}

@Bean
public ItemProcessor<RawOrder, EnrichedOrder> transformProcessor() {
    return rawOrder -> {
        EnrichedOrder enriched = new EnrichedOrder();
        enriched.setOrderId(rawOrder.getId());
        enriched.setCustomerName(rawOrder.getCustomerName());
        enriched.setTotalWithTax(
            rawOrder.getTotal().multiply(new BigDecimal("1.08")));
        enriched.setProcessedAt(LocalDateTime.now());
        return enriched;
    };
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              ValidatingItemProcessor
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              A built-in processor that validates items using a Spring Validator. Invalid items throw a
              ValidationException, which can be handled by the skip policy or cause the step to fail.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`@Bean
public ValidatingItemProcessor<Trade> validatingProcessor() {
    ValidatingItemProcessor<Trade> processor =
        new ValidatingItemProcessor<>();

    processor.setValidator(new SpringValidator<>(tradeValidator()));
    processor.setFilter(true); // Filter instead of throwing exception

    return processor;
}

@Bean
public Validator tradeValidator() {
    return new Validator() {
        @Override
        public boolean supports(Class<?> clazz) {
            return Trade.class.isAssignableFrom(clazz);
        }

        @Override
        public void validate(Object target, Errors errors) {
            Trade trade = (Trade) target;
            if (trade.getQuantity() <= 0) {
                errors.rejectValue("quantity",
                    "invalid.quantity",
                    "Quantity must be positive");
            }
            if (trade.getPrice() == null ||
                trade.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
                errors.rejectValue("price",
                    "invalid.price",
                    "Price must be positive");
            }
            if (trade.getSymbol() == null ||
                trade.getSymbol().isBlank()) {
                errors.rejectValue("symbol",
                    "missing.symbol",
                    "Symbol is required");
            }
        }
    };
}

// Using Bean Validation (JSR 380) annotations
@Bean
public BeanValidatingItemProcessor<Employee> beanValidatingProcessor()
        throws Exception {
    BeanValidatingItemProcessor<Employee> processor =
        new BeanValidatingItemProcessor<>();
    processor.setFilter(false); // Throw exception on invalid items
    processor.afterPropertiesSet();
    return processor;
}

// Employee class with Bean Validation annotations:
// public class Employee {
//     @NotNull private Long id;
//     @NotBlank private String name;
//     @Email private String email;
//     @Positive private BigDecimal salary;
// }`} />
            </div>
          </div>
        </div>
      )}

      {/* Writers Section */}
      {activeSection === 'writers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              JdbcBatchItemWriter
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Writes items to a relational database using JDBC batch operations. This is the most efficient way to
              insert or update large numbers of rows, as it uses JDBC batch statements under the hood.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`@Bean
public JdbcBatchItemWriter<Customer> jdbcWriter(DataSource dataSource) {
    return new JdbcBatchItemWriterBuilder<Customer>()
        .dataSource(dataSource)
        .sql("INSERT INTO customers (id, name, email, tier, created_at) " +
             "VALUES (:id, :name, :email, :tier, :createdAt)")
        .itemSqlParameterSourceProvider(
            new BeanPropertyItemSqlParameterSourceProvider<>())
        .build();
}

// Using named parameters with a custom mapper
@Bean
public JdbcBatchItemWriter<Order> orderWriter(DataSource dataSource) {
    return new JdbcBatchItemWriterBuilder<Order>()
        .dataSource(dataSource)
        .sql("INSERT INTO orders (order_id, customer_id, total, status) " +
             "VALUES (:orderId, :customerId, :total, :status) " +
             "ON CONFLICT (order_id) DO UPDATE " +
             "SET total = :total, status = :status")
        .itemSqlParameterSourceProvider(
            new BeanPropertyItemSqlParameterSourceProvider<>())
        .assertUpdates(true) // Verify each item was written
        .build();
}

// Using positional parameters (? placeholders)
@Bean
public JdbcBatchItemWriter<LogEntry> logWriter(DataSource dataSource) {
    return new JdbcBatchItemWriterBuilder<LogEntry>()
        .dataSource(dataSource)
        .sql("INSERT INTO audit_log (timestamp, level, message, source) " +
             "VALUES (?, ?, ?, ?)")
        .itemPreparedStatementSetter((item, ps) -> {
            ps.setTimestamp(1, Timestamp.valueOf(item.getTimestamp()));
            ps.setString(2, item.getLevel());
            ps.setString(3, item.getMessage());
            ps.setString(4, item.getSource());
        })
        .build();
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              FlatFileItemWriter (CSV / Delimited Output)
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Writes processed items to a flat file in delimited or formatted text. Supports headers, footers,
              append mode, and transactional writes (rollback on chunk failure).
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`@Bean
public FlatFileItemWriter<Report> csvWriter() {
    return new FlatFileItemWriterBuilder<Report>()
        .name("reportCsvWriter")
        .resource(new FileSystemResource("output/report.csv"))
        .headerCallback(writer ->
            writer.write("ID,Name,Total,Date,Status"))
        .delimited()
        .delimiter(",")
        .names("id", "name", "total", "date", "status")
        .footerCallback(writer ->
            writer.write("# Generated: " + LocalDateTime.now()))
        .build();
}

// Formatted output (fixed-width)
@Bean
public FlatFileItemWriter<Account> formattedWriter() {
    return new FlatFileItemWriterBuilder<Account>()
        .name("accountWriter")
        .resource(new FileSystemResource("output/accounts.txt"))
        .formatted()
        .format("%-10s %-30s %15.2f %s")
        .names("accountId", "holderName", "balance", "currency")
        .shouldDeleteIfExists(true)  // Overwrite existing file
        .build();
}

// Append to existing file
@Bean
@StepScope
public FlatFileItemWriter<AuditEntry> auditWriter(
        @Value("#{jobParameters['outputFile']}") String outputFile) {
    return new FlatFileItemWriterBuilder<AuditEntry>()
        .name("auditWriter")
        .resource(new FileSystemResource(outputFile))
        .delimited()
        .names("timestamp", "action", "userId", "details")
        .append(true)            // Append to existing file
        .shouldDeleteIfEmpty(true) // Delete file if no items written
        .build();
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              JpaItemWriter and CompositeItemWriter
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              JpaItemWriter persists items using JPA EntityManager (merge by default). CompositeItemWriter delegates
              to multiple writers, allowing you to write the same items to multiple destinations simultaneously.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// JPA Writer
@Bean
public JpaItemWriter<Product> jpaWriter(
        EntityManagerFactory entityManagerFactory) {
    JpaItemWriter<Product> writer = new JpaItemWriter<>();
    writer.setEntityManagerFactory(entityManagerFactory);
    writer.setUsePersist(true); // Use persist instead of merge
    return writer;
}

// Composite Writer - write to database AND file simultaneously
@Bean
public CompositeItemWriter<OrderSummary> compositeWriter(
        JdbcBatchItemWriter<OrderSummary> dbWriter,
        FlatFileItemWriter<OrderSummary> fileWriter) {

    CompositeItemWriter<OrderSummary> composite =
        new CompositeItemWriter<>();
    composite.setDelegates(List.of(dbWriter, fileWriter));
    return composite;
}

// Custom ItemWriter - sending to a message queue
@Component
public class KafkaItemWriter<T> implements ItemWriter<T> {

    private final KafkaTemplate<String, T> kafkaTemplate;
    private final String topic;

    public KafkaItemWriter(KafkaTemplate<String, T> kafkaTemplate,
                           String topic) {
        this.kafkaTemplate = kafkaTemplate;
        this.topic = topic;
    }

    @Override
    public void write(List<? extends T> items) throws Exception {
        for (T item : items) {
            kafkaTemplate.send(topic, item);
        }
        kafkaTemplate.flush(); // Ensure all messages are sent
    }
}`} />
            </div>
          </div>
        </div>
      )}

      {/* Fault Tolerance Section */}
      {activeSection === 'fault' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Skip Policies
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Skip policies allow a Step to continue processing when certain exceptions occur, rather than failing
              the entire job. You can specify which exceptions are skippable and set a maximum skip count.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`@Bean
public Step faultTolerantStep(ItemReader<Trade> reader,
                               ItemProcessor<Trade, Trade> processor,
                               ItemWriter<Trade> writer) {
    return stepBuilderFactory.get("faultTolerantStep")
        .<Trade, Trade>chunk(100)
        .reader(reader)
        .processor(processor)
        .writer(writer)
        .faultTolerant()
        // Skip up to 10 parsing errors during read
        .skipLimit(10)
        .skip(FlatFileParseException.class)
        .skip(ValidationException.class)
        // Never skip these critical errors
        .noSkip(FileNotFoundException.class)
        .noSkip(DataIntegrityViolationException.class)
        .build();
}

// Custom SkipPolicy for more complex skip logic
@Component
public class ConditionalSkipPolicy implements SkipPolicy {

    private static final int MAX_SKIP = 50;

    @Override
    public boolean shouldSkip(Throwable t, long skipCount) {
        if (t instanceof FileNotFoundException) {
            return false; // Never skip - fail the job
        }
        if (t instanceof FlatFileParseException) {
            return skipCount < MAX_SKIP;
        }
        if (t instanceof ValidationException) {
            return skipCount < MAX_SKIP;
        }
        return false; // Don't skip unknown exceptions
    }
}

// Using the custom skip policy
@Bean
public Step customSkipStep(ItemReader<Trade> reader,
                            ItemWriter<Trade> writer,
                            ConditionalSkipPolicy skipPolicy) {
    return stepBuilderFactory.get("customSkipStep")
        .<Trade, Trade>chunk(100)
        .reader(reader)
        .writer(writer)
        .faultTolerant()
        .skipPolicy(skipPolicy)
        .build();
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Retry Policies
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Retry policies automatically re-attempt failed operations for transient errors like network timeouts
              or temporary database connection issues. Retries happen at the item level within the chunk.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`@Bean
public Step retryableStep(ItemReader<Payment> reader,
                           ItemProcessor<Payment, Payment> processor,
                           ItemWriter<Payment> writer) {
    return stepBuilderFactory.get("retryableStep")
        .<Payment, Payment>chunk(50)
        .reader(reader)
        .processor(processor)
        .writer(writer)
        .faultTolerant()
        // Retry configuration
        .retryLimit(3)
        .retry(DeadlockLoserDataAccessException.class)
        .retry(OptimisticLockingFailureException.class)
        .retry(ConnectTimeoutException.class)
        // No retry on these
        .noRetry(ValidationException.class)
        .noRetry(IllegalArgumentException.class)
        // Combine with skip for items that fail after retries
        .skipLimit(5)
        .skip(ConnectTimeoutException.class)
        .build();
}

// Custom retry policy with backoff
@Bean
public Step advancedRetryStep(ItemReader<Payment> reader,
                               ItemWriter<Payment> writer) {
    // Retry template with exponential backoff
    Map<Class<? extends Throwable>, Boolean> retryableExceptions =
        new HashMap<>();
    retryableExceptions.put(DeadlockLoserDataAccessException.class, true);
    retryableExceptions.put(ConnectTimeoutException.class, true);

    SimpleRetryPolicy retryPolicy =
        new SimpleRetryPolicy(5, retryableExceptions);

    return stepBuilderFactory.get("advancedRetryStep")
        .<Payment, Payment>chunk(50)
        .reader(reader)
        .writer(writer)
        .faultTolerant()
        .retryPolicy(retryPolicy)
        .backOffPolicy(new ExponentialBackOffPolicy() {{
            setInitialInterval(1000);  // 1 second
            setMultiplier(2.0);        // Double each retry
            setMaxInterval(30000);     // Cap at 30 seconds
        }})
        .build();
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Skip Listeners and Restart
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Skip listeners track which items were skipped and why. The restart capability allows a failed job
              to resume from where it left off, using execution context state persisted in the JobRepository.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// Skip Listener to log and track skipped items
@Component
public class TradeSkipListener implements SkipListener<Trade, Trade> {

    private final JdbcTemplate jdbcTemplate;

    public TradeSkipListener(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void onSkipInRead(Throwable t) {
        // Log items that failed during reading
        jdbcTemplate.update(
            "INSERT INTO skip_log (phase, error, timestamp) VALUES (?, ?, ?)",
            "READ", t.getMessage(), LocalDateTime.now());
    }

    @Override
    public void onSkipInProcess(Trade item, Throwable t) {
        // Log items that failed during processing
        jdbcTemplate.update(
            "INSERT INTO skip_log (phase, item_id, error, timestamp) " +
            "VALUES (?, ?, ?, ?)",
            "PROCESS", item.getId(), t.getMessage(), LocalDateTime.now());
    }

    @Override
    public void onSkipInWrite(Trade item, Throwable t) {
        // Log items that failed during writing
        jdbcTemplate.update(
            "INSERT INTO skip_log (phase, item_id, error, timestamp) " +
            "VALUES (?, ?, ?, ?)",
            "WRITE", item.getId(), t.getMessage(), LocalDateTime.now());
    }
}

// Registering skip listener on a Step
@Bean
public Step stepWithSkipListener(ItemReader<Trade> reader,
                                  ItemWriter<Trade> writer,
                                  TradeSkipListener skipListener) {
    return stepBuilderFactory.get("stepWithSkipListener")
        .<Trade, Trade>chunk(100)
        .reader(reader)
        .writer(writer)
        .faultTolerant()
        .skipLimit(20)
        .skip(ValidationException.class)
        .listener(skipListener)
        .build();
}

// Restart configuration
// Jobs are restartable by default. Execution context is saved per chunk.
// On restart, the reader resumes from the last committed chunk.
@Bean
public Job restartableJob(Step step1) {
    return jobBuilderFactory.get("restartableJob")
        .incrementer(new RunIdIncrementer())
        // .preventRestart() // Uncomment to disable restart
        .start(step1)
        .build();
}

// Step-level restart limit
@Bean
public Step limitedRestartStep(ItemReader<Record> reader,
                                ItemWriter<Record> writer) {
    return stepBuilderFactory.get("limitedRestartStep")
        .<Record, Record>chunk(100)
        .reader(reader)
        .writer(writer)
        .startLimit(3) // Allow only 3 restart attempts for this step
        .allowStartIfComplete(false) // Skip step if already completed
        .build();
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Chunk-Level Transactions
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Each chunk executes within a single transaction. If writing a chunk fails, the entire chunk is rolled
              back and optionally retried or skipped item by item.
            </p>
            <div style={{
              backgroundColor: '#064e3b',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #f59e0b'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
                <strong>Transaction Flow:</strong> BEGIN &rarr; Read chunk of N items &rarr; Process each item &rarr; Write all items &rarr; COMMIT.
                If the write fails, the transaction is rolled back. With fault tolerance enabled, items can be retried or skipped individually.
              </p>
            </div>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151',
              marginTop: '1rem'
            }}>
              <SyntaxHighlighter code={`// Custom transaction attributes on a Step
@Bean
public Step transactionalStep(ItemReader<Account> reader,
                               ItemWriter<Account> writer,
                               PlatformTransactionManager txManager) {
    DefaultTransactionAttribute txAttr =
        new DefaultTransactionAttribute();
    txAttr.setIsolationLevel(
        TransactionDefinition.ISOLATION_READ_COMMITTED);
    txAttr.setTimeout(30); // 30-second transaction timeout

    return stepBuilderFactory.get("transactionalStep")
        .transactionManager(txManager)
        .<Account, Account>chunk(200)
        .reader(reader)
        .writer(writer)
        .transactionAttribute(txAttr)
        .build();
}

// No-rollback for specific exceptions
@Bean
public Step noRollbackStep(ItemReader<Record> reader,
                            ItemWriter<Record> writer) {
    return stepBuilderFactory.get("noRollbackStep")
        .<Record, Record>chunk(100)
        .reader(reader)
        .writer(writer)
        .faultTolerant()
        .noRollback(ValidationException.class)
        .build();
}`} />
            </div>
          </div>
        </div>
      )}

      {/* Scheduling Section */}
      {activeSection === 'scheduling' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              @Scheduled - Cron-Based Launching
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              The simplest approach to scheduling batch jobs is using Spring's @Scheduled annotation with
              cron expressions. The job runs within the same application at specified intervals.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`@Configuration
@EnableScheduling
public class BatchSchedulerConfig {

    @Autowired
    private JobLauncher jobLauncher;

    @Autowired
    private Job dailyReportJob;

    @Autowired
    private Job hourlyAggregationJob;

    // Run every day at 2:00 AM
    @Scheduled(cron = "0 0 2 * * *")
    public void runDailyReport() throws Exception {
        JobParameters params = new JobParametersBuilder()
            .addLocalDateTime("runTime", LocalDateTime.now())
            .addString("reportDate",
                LocalDate.now().minusDays(1).toString())
            .toJobParameters();

        JobExecution execution = jobLauncher.run(dailyReportJob, params);
        System.out.println("Daily report status: "
            + execution.getStatus());
    }

    // Run every hour at minute 0
    @Scheduled(cron = "0 0 * * * *")
    public void runHourlyAggregation() throws Exception {
        JobParameters params = new JobParametersBuilder()
            .addLong("run.id", System.currentTimeMillis())
            .toJobParameters();

        jobLauncher.run(hourlyAggregationJob, params);
    }

    // Run every 30 minutes with fixed delay
    @Scheduled(fixedDelay = 1800000)
    public void runPeriodicCleanup() throws Exception {
        JobParameters params = new JobParametersBuilder()
            .addLong("run.id", System.currentTimeMillis())
            .toJobParameters();

        jobLauncher.run(cleanupJob, params);
    }
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              REST-Triggered Jobs
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Expose a REST endpoint to trigger batch jobs on demand. This is useful for admin interfaces,
              manual re-runs, and integration with external orchestration tools.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`@RestController
@RequestMapping("/api/batch")
public class BatchController {

    @Autowired
    private JobLauncher jobLauncher;

    @Autowired
    private JobLauncher asyncJobLauncher;

    @Autowired
    private Job importJob;

    @Autowired
    private JobExplorer jobExplorer;

    // Synchronous launch - waits for completion
    @PostMapping("/run/import")
    public ResponseEntity<Map<String, Object>> runImportJob(
            @RequestParam String inputFile) {
        try {
            JobParameters params = new JobParametersBuilder()
                .addString("inputFile", inputFile)
                .addLong("run.id", System.currentTimeMillis())
                .toJobParameters();

            JobExecution execution = jobLauncher.run(importJob, params);

            Map<String, Object> response = new HashMap<>();
            response.put("jobId", execution.getJobId());
            response.put("status", execution.getStatus().toString());
            response.put("startTime", execution.getStartTime());
            response.put("endTime", execution.getEndTime());
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", e.getMessage()));
        }
    }

    // Asynchronous launch - returns immediately
    @PostMapping("/run/import/async")
    public ResponseEntity<Map<String, Object>> runImportJobAsync(
            @RequestParam String inputFile) throws Exception {
        JobParameters params = new JobParametersBuilder()
            .addString("inputFile", inputFile)
            .addLong("run.id", System.currentTimeMillis())
            .toJobParameters();

        JobExecution execution = asyncJobLauncher.run(importJob, params);

        return ResponseEntity.accepted().body(Map.of(
            "jobExecutionId", execution.getId(),
            "status", "STARTED",
            "message", "Job launched asynchronously"
        ));
    }

    // Check job status
    @GetMapping("/status/{executionId}")
    public ResponseEntity<Map<String, Object>> getJobStatus(
            @PathVariable Long executionId) {
        JobExecution execution = jobExplorer.getJobExecution(executionId);
        if (execution == null) {
            return ResponseEntity.notFound().build();
        }

        Map<String, Object> status = new HashMap<>();
        status.put("jobName", execution.getJobInstance().getJobName());
        status.put("status", execution.getStatus().toString());
        status.put("startTime", execution.getStartTime());
        status.put("endTime", execution.getEndTime());
        status.put("exitCode", execution.getExitStatus().getExitCode());
        return ResponseEntity.ok(status);
    }
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Async JobLauncher Configuration
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              By default, JobLauncher runs jobs synchronously. Configure an async launcher to run jobs in a
              background thread, returning control to the caller immediately.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`@Configuration
public class AsyncBatchConfig {

    @Bean
    public JobLauncher asyncJobLauncher(JobRepository jobRepository) {
        SimpleJobLauncher launcher = new SimpleJobLauncher();
        launcher.setJobRepository(jobRepository);

        // Use a thread pool for async execution
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(2);
        executor.setMaxPoolSize(5);
        executor.setQueueCapacity(10);
        executor.setThreadNamePrefix("batch-async-");
        executor.initialize();

        launcher.setTaskExecutor(executor);
        return launcher;
    }

    // Prevent auto-start of batch jobs on application startup
    // application.yml:
    // spring:
    //   batch:
    //     job:
    //       enabled: false  // Don't auto-run jobs at startup
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              CommandLineJobRunner and Spring Cloud Task
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              For short-lived batch applications that run as standalone processes (e.g., triggered by a scheduler
              or container orchestrator), use CommandLineJobRunner or Spring Cloud Task for enhanced lifecycle management.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// Running a job from the command line:
// java -jar batch-app.jar --spring.batch.job.names=importJob \\
//   inputFile=/data/customers.csv

// CommandLineRunner approach for programmatic control
@Component
public class BatchJobRunner implements CommandLineRunner {

    @Autowired
    private JobLauncher jobLauncher;

    @Autowired
    private ApplicationContext context;

    @Override
    public void run(String... args) throws Exception {
        // Parse command line arguments
        String jobName = args.length > 0 ? args[0] : "defaultJob";

        Job job = context.getBean(jobName, Job.class);

        JobParameters params = new JobParametersBuilder()
            .addLong("run.id", System.currentTimeMillis())
            .addString("inputDir", args.length > 1 ? args[1] : "/data")
            .toJobParameters();

        JobExecution execution = jobLauncher.run(job, params);

        // Exit with appropriate code
        if (execution.getStatus() == BatchStatus.FAILED) {
            System.exit(1);
        }
    }
}

// Spring Cloud Task integration for managed lifecycle
// build.gradle: implementation "org.springframework.cloud:spring-cloud-starter-task"

@SpringBootApplication
@EnableBatchProcessing
@EnableTask
public class CloudTaskBatchApp {

    public static void main(String[] args) {
        SpringApplication.run(CloudTaskBatchApp.class, args);
    }
}

// Spring Cloud Task automatically:
// - Records task execution start/end in a database
// - Maps batch job exit status to task exit code
// - Supports task execution via Spring Cloud Data Flow
// - Provides lifecycle events for monitoring and alerting`} />
            </div>
            <div style={{
              backgroundColor: '#064e3b',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #f59e0b',
              marginTop: '1rem'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
                <strong>Production Tip:</strong> In Kubernetes or cloud environments, prefer short-lived batch
                applications launched as CronJobs over long-running applications with @Scheduled. This gives
                better resource utilization, isolation, and scaling characteristics.
              </p>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default SpringBatch

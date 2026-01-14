import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function ExceptionHandling({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showSolution, setShowSolution] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [userCode, setUserCode] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [language, setLanguage] = useState(getPreferredLanguage())
  const [showDrawing, setShowDrawing] = useState(false)
  const [currentDrawing, setCurrentDrawing] = useState(null)
  const [expandedSections, setExpandedSections] = useState({
    Easy: true,
    Medium: true,
    Hard: true
  })

  useEffect(() => {
    const handleProgressUpdate = () => setRefreshKey(prev => prev + 1)
    window.addEventListener('progressUpdate', handleProgressUpdate)
    return () => window.removeEventListener('progressUpdate', handleProgressUpdate)
  }, [])

  useEffect(() => {
    const handleLanguageChange = (e) => {
      setLanguage(e.detail)
      if (selectedQuestion) {
        setUserCode(selectedQuestion.code[e.detail].starterCode)
      }
    }
    window.addEventListener('languageChange', handleLanguageChange)
    return () => window.removeEventListener('languageChange', handleLanguageChange)
  }, [selectedQuestion])

  const questions = [
    {
      id: 1,
      title: 'Custom Exception Hierarchy',
      difficulty: 'Easy',
      description: 'Design a custom exception hierarchy for a banking application. Create InsufficientFundsException (checked) with balance info and implement proper exception constructors with messages and causes.',
      examples: [
        { input: 'withdraw(500) with balance 300', output: 'InsufficientFundsException: Cannot withdraw 500.00, balance is 300.00' },
        { input: 'withdraw(200) with balance 300', output: 'Success, new balance: 100.00' }
      ],
      code: {
        java: {
          starterCode: `// Base exception for banking operations
class BankingException extends Exception {
    // TODO: Add constructors with message and cause
    public BankingException(String message) {

    }

    public BankingException(String message, Throwable cause) {

    }
}

// Checked exception: Insufficient funds
class InsufficientFundsException extends BankingException {
    private double balance;
    private double amount;

    // TODO: Implement constructor that creates meaningful error message
    public InsufficientFundsException(double balance, double amount) {

    }

    public double getBalance() { return balance; }
    public double getAmount() { return amount; }
    public double getShortfall() { return amount - balance; }
}

class BankAccount {
    private double balance;

    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }

    // TODO: Implement withdraw - throw InsufficientFundsException if amount > balance
    public void withdraw(double amount) throws InsufficientFundsException {

    }

    public double getBalance() { return balance; }
}`,
          solution: `// Base exception for banking operations
class BankingException extends Exception {
    public BankingException(String message) {
        super(message);
    }

    public BankingException(String message, Throwable cause) {
        super(message, cause);
    }
}

// Checked exception: Insufficient funds
class InsufficientFundsException extends BankingException {
    private double balance;
    private double amount;

    public InsufficientFundsException(double balance, double amount) {
        super(String.format("Cannot withdraw %.2f, balance is %.2f", amount, balance));
        this.balance = balance;
        this.amount = amount;
    }

    public double getBalance() { return balance; }
    public double getAmount() { return amount; }
    public double getShortfall() { return amount - balance; }
}

class BankAccount {
    private double balance;

    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }

    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }

        if (amount > balance) {
            throw new InsufficientFundsException(balance, amount);
        }

        balance -= amount;
    }

    public double getBalance() { return balance; }
}`
        },
        python: {
          starterCode: `# Custom exception hierarchy in Python
class BankingException(Exception):
    """Base exception for banking operations"""
    pass

class InsufficientFundsException(BankingException):
    def __init__(self, balance, amount):
        # TODO: Store balance and amount, create error message
        self.balance = balance
        self.amount = amount
        # TODO: Call super with formatted message

class BankAccount:
    def __init__(self, initial_balance):
        self.balance = initial_balance

    def withdraw(self, amount):
        # TODO: Implement withdraw with validation
        pass

    def get_balance(self):
        return self.balance`,
          solution: `# Custom exception hierarchy in Python
class BankingException(Exception):
    """Base exception for banking operations"""
    pass

class InsufficientFundsException(BankingException):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(f"Cannot withdraw {amount:.2f}, balance is {balance:.2f}")

    def get_shortfall(self):
        return self.amount - self.balance

class BankAccount:
    def __init__(self, initial_balance):
        self.balance = initial_balance

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")

        if amount > self.balance:
            raise InsufficientFundsException(self.balance, amount)

        self.balance -= amount

    def get_balance(self):
        return self.balance

# Test
account = BankAccount(500.0)
try:
    account.withdraw(200)
    print(f"Withdrawn 200, balance: {account.get_balance()}")
    account.withdraw(500)
except InsufficientFundsException as e:
    print(f"Error: {e}")
    print(f"Shortfall: {e.get_shortfall()}")`
        }
      },
      explanation: 'Create custom exception hierarchy extending Exception (checked) or RuntimeException (unchecked). Include constructors for message and cause. Store relevant data in exception fields for caller to inspect. Use String.format() for clear error messages.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 2,
      title: 'Try-With-Resources Pattern',
      difficulty: 'Easy',
      description: 'Create a DatabaseConnection class that implements AutoCloseable. Demonstrate proper resource management using try-with-resources to ensure cleanup even if exceptions occur.',
      examples: [
        { input: 'try-with-resources with connection', output: 'Connection opened, query executed, connection closed automatically' },
        { input: 'Connection without try-with-resources', output: 'Must manually call close() in finally block' }
      ],
      code: {
        java: {
          starterCode: `class DatabaseConnection implements AutoCloseable {
    private String url;
    private boolean connected;

    public DatabaseConnection(String url) throws Exception {
        this.url = url;
        this.connected = true;
        System.out.println("Opening connection to " + url);
    }

    public void executeQuery(String query) throws Exception {
        if (!connected) {
            throw new IllegalStateException("Connection is closed");
        }
        System.out.println("Executing query: " + query);
    }

    // TODO: Implement close() method to clean up resources
    @Override
    public void close() throws Exception {

    }
}

class Main {
    public static void main(String[] args) {
        // TODO: Use try-with-resources to automatically close connection
        // Create connection to "db://localhost", execute "SELECT * FROM users"
    }
}`,
          solution: `class DatabaseConnection implements AutoCloseable {
    private String url;
    private boolean connected;

    public DatabaseConnection(String url) throws Exception {
        this.url = url;
        this.connected = true;
        System.out.println("Opening connection to " + url);
    }

    public void executeQuery(String query) throws Exception {
        if (!connected) {
            throw new IllegalStateException("Connection is closed");
        }
        System.out.println("Executing query: " + query);
    }

    @Override
    public void close() throws Exception {
        if (connected) {
            System.out.println("Closing connection to " + url);
            connected = false;
        }
    }
}

class Main {
    public static void main(String[] args) {
        // Try-with-resources automatically calls close()
        try (DatabaseConnection conn = new DatabaseConnection("db://localhost")) {
            conn.executeQuery("SELECT * FROM users");
            // Connection automatically closed, even if exception occurs
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`
        },
        python: {
          starterCode: `# Context manager (Python's try-with-resources)
class DatabaseConnection:
    def __init__(self, url):
        self.url = url
        self.connected = False

    # TODO: Implement __enter__ to open connection
    def __enter__(self):
        pass

    # TODO: Implement __exit__ to close connection
    def __exit__(self, exc_type, exc_val, exc_tb):
        pass

    def execute_query(self, query):
        if not self.connected:
            raise Exception("Connection is closed")
        print(f"Executing query: {query}")

# TODO: Use 'with' statement for automatic cleanup`,
          solution: `# Context manager (Python's try-with-resources)
class DatabaseConnection:
    def __init__(self, url):
        self.url = url
        self.connected = False

    def __enter__(self):
        self.connected = True
        print(f"Opening connection to {self.url}")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.connected:
            print(f"Closing connection to {self.url}")
            self.connected = False
        return False  # Don't suppress exceptions

    def execute_query(self, query):
        if not self.connected:
            raise Exception("Connection is closed")
        print(f"Executing query: {query}")

# Use 'with' statement for automatic cleanup
with DatabaseConnection("db://localhost") as conn:
    conn.execute_query("SELECT * FROM users")
    # Connection automatically closed`
        }
      },
      explanation: 'Implement AutoCloseable interface and override close() method. Use try-with-resources: try (Resource r = new Resource()) { }. Resource is automatically closed when block exits, even if exception occurs. Can declare multiple resources separated by semicolons.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 3,
      title: 'Multi-Catch Exception Handling',
      difficulty: 'Medium',
      description: 'Implement error handling that catches multiple exception types efficiently using multi-catch blocks (Java 7+). Handle IOException and SQLException with the same handler.',
      examples: [
        { input: 'source = "file://data.txt"', output: 'Data access error: File error' },
        { input: 'source = "db://users"', output: 'Data access error: Database error' }
      ],
      code: {
        java: {
          starterCode: `import java.io.*;
import java.sql.*;

class DataProcessor {
    // TODO: Implement processData with multi-catch to handle both IOException and SQLException
    public void processData(String source) {
        try {
            if (source.startsWith("file://")) {
                throw new IOException("File error: " + source);
            } else if (source.startsWith("db://")) {
                throw new SQLException("Database error: " + source);
            }
            System.out.println("Processed: " + source);
        } catch (/* TODO: Add multi-catch for IOException | SQLException */ Exception e) {
            // Handle both types the same way
            System.out.println("Data access error: " + e.getMessage());
        }
    }
}`,
          solution: `import java.io.*;
import java.sql.*;

class DataProcessor {
    public void processData(String source) {
        try {
            if (source.startsWith("file://")) {
                throw new IOException("File error: " + source);
            } else if (source.startsWith("db://")) {
                throw new SQLException("Database error: " + source);
            }
            System.out.println("Processed: " + source);
        } catch (IOException | SQLException e) {
            // Multi-catch: Handle both types the same way
            System.out.println("Data access error: " + e.getMessage());
        }
    }
}

// Can also use multi-catch with specific handlers
class AdvancedProcessor {
    public void process(String source) {
        try {
            // operations
        } catch (FileNotFoundException | EOFException e) {
            // Handle file-specific exceptions
        } catch (SQLException | DataAccessException e) {
            // Handle database exceptions
        } catch (Exception e) {
            // Catch-all for other exceptions
        }
    }
}`
        },
        python: {
          starterCode: `# Multi-exception handling in Python
class DataProcessor:
    def process_data(self, source):
        try:
            if source.startswith("file://"):
                raise IOError(f"File error: {source}")
            elif source.startswith("db://"):
                raise RuntimeError(f"Database error: {source}")
            print(f"Processed: {source}")
        except (/* TODO: Add tuple of exception types */):
            # Handle both types the same way
            print(f"Data access error: {e}")`,
          solution: `# Multi-exception handling in Python
class DataProcessor:
    def process_data(self, source):
        try:
            if source.startswith("file://"):
                raise IOError(f"File error: {source}")
            elif source.startswith("db://"):
                raise RuntimeError(f"Database error: {source}")
            print(f"Processed: {source}")
        except (IOError, RuntimeError) as e:
            # Handle both types the same way
            print(f"Data access error: {e}")

# Test
processor = DataProcessor()
processor.process_data("file://data.txt")
processor.process_data("db://users")
processor.process_data("valid-source")`
        }
      },
      explanation: 'Multi-catch syntax: catch (ExceptionType1 | ExceptionType2 e). Exception variable is implicitly final. Use when multiple exception types require same handling. Order matters - catch most specific first. Cannot use multi-catch with exceptions in same inheritance hierarchy.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 4,
      title: 'Exception Chaining and Suppressed Exceptions',
      difficulty: 'Medium',
      description: 'Learn exception chaining (initCause, constructor with cause) and suppressed exceptions in try-with-resources. Understand how to preserve the original exception stack trace.',
      examples: [
        { input: 'Chain exceptions with cause', output: 'New exception wraps original, both stack traces preserved' },
        { input: 'try-with-resources with exception', output: 'Primary exception + suppressed close() exception' }
      ],
      code: {
        java: {
          starterCode: `class DataService {
    // Exception chaining
    public void loadData(String id) throws Exception {
        try {
            // Simulate database error
            throw new SQLException("Database connection failed");
        } catch (SQLException e) {
            // TODO: Chain exception - wrap in custom exception with cause
            throw new Exception("Failed to load data for ID: " + id);
        }
    }
}

// Suppressed exceptions
class Resource implements AutoCloseable {
    private String name;

    public Resource(String name) {
        this.name = name;
    }

    public void doWork() throws Exception {
        throw new Exception("Error during work");
    }

    @Override
    public void close() throws Exception {
        throw new Exception("Error during close");
    }
}

class Main {
    public static void main(String[] args) {
        // TODO: Use try-with-resources and catch suppressed exceptions
    }
}`,
          solution: `import java.sql.*;

class DataService {
    // Exception chaining
    public void loadData(String id) throws Exception {
        try {
            // Simulate database error
            throw new SQLException("Database connection failed");
        } catch (SQLException e) {
            // Chain exception - preserves original stack trace
            Exception wrapped = new Exception("Failed to load data for ID: " + id, e);
            throw wrapped;
        }
    }
}

// Suppressed exceptions
class Resource implements AutoCloseable {
    private String name;

    public Resource(String name) {
        this.name = name;
    }

    public void doWork() throws Exception {
        throw new Exception("Error during work");
    }

    @Override
    public void close() throws Exception {
        throw new Exception("Error during close");
    }
}

class Main {
    public static void main(String[] args) {
        // Try-with-resources with multiple exceptions
        try (Resource r = new Resource("DB")) {
            r.doWork();  // Throws exception
            // close() also throws - becomes suppressed
        } catch (Exception e) {
            System.out.println("Primary: " + e.getMessage());

            // Get suppressed exceptions
            for (Throwable suppressed : e.getSuppressed()) {
                System.out.println("Suppressed: " + suppressed.getMessage());
            }
        }
    }
}`
        },
        python: {
          starterCode: `# Exception chaining in Python
class DataService:
    def load_data(self, id):
        try:
            # Simulate error
            raise ConnectionError("Database connection failed")
        except ConnectionError as e:
            # TODO: Chain exception using 'raise ... from e'
            raise Exception(f"Failed to load data for ID: {id}")

# Context manager with multiple exceptions
class Resource:
    def __init__(self, name):
        self.name = name

    def __enter__(self):
        return self

    def do_work(self):
        raise Exception("Error during work")

    def __exit__(self, exc_type, exc_val, exc_tb):
        # TODO: Raise exception in __exit__, see how Python handles it
        raise Exception("Error during close")`,
          solution: `# Exception chaining in Python
class DataService:
    def load_data(self, id):
        try:
            # Simulate error
            raise ConnectionError("Database connection failed")
        except ConnectionError as e:
            # Chain exception using 'raise ... from e'
            raise Exception(f"Failed to load data for ID: {id}") from e

# Context manager with multiple exceptions
class Resource:
    def __init__(self, name):
        self.name = name

    def __enter__(self):
        return self

    def do_work(self):
        raise Exception("Error during work")

    def __exit__(self, exc_type, exc_val, exc_tb):
        # Exception in __exit__ suppresses original
        # Use return False to not suppress
        raise Exception("Error during close")

# Test
try:
    with Resource("DB") as r:
        r.do_work()
except Exception as e:
    print(f"Exception: {e}")
    print(f"Cause: {e.__cause__}")
    print(f"Context: {e.__context__}")`
        }
      },
      explanation: 'Exception chaining: new Exception(message, cause) or initCause(). Access via getCause(). Suppressed exceptions occur in try-with-resources when both try block and close() throw. Access via getSuppressed(). Preserves all exception information for debugging.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(n) where n is chain depth'
    },
    {
      id: 5,
      title: 'Retry with Exponential Backoff',
      difficulty: 'Hard',
      description: 'Implement a retry mechanism with exponential backoff for handling transient failures. The operation should retry up to maxRetries times with increasing delays between attempts.',
      examples: [
        { input: 'maxRetries=3, delay=100ms', output: 'Retries with delays: 100ms, 200ms, 400ms' },
        { input: 'Operation succeeds on attempt 2', output: 'Returns result without further retries' }
      ],
      code: {
        java: {
          starterCode: `import java.util.concurrent.*;

class RetryableOperation {
    private int maxRetries;
    private long initialDelayMs;

    public RetryableOperation(int maxRetries, long initialDelayMs) {
        this.maxRetries = maxRetries;
        this.initialDelayMs = initialDelayMs;
    }

    // TODO: Implement executeWithRetry with exponential backoff
    public <T> T executeWithRetry(Callable<T> operation) throws Exception {
        int attempt = 0;
        long delay = initialDelayMs;

        while (true) {
            try {
                System.out.println("Attempt " + (attempt + 1));
                // TODO: Call operation.call() and return result

            } catch (Exception e) {
                attempt++;

                // TODO: Check if max retries exceeded, if so rethrow

                // TODO: Sleep for delay, then double the delay (exponential backoff)
            }
        }
    }
}`,
          solution: `import java.util.concurrent.*;

class RetryableOperation {
    private int maxRetries;
    private long initialDelayMs;

    public RetryableOperation(int maxRetries, long initialDelayMs) {
        this.maxRetries = maxRetries;
        this.initialDelayMs = initialDelayMs;
    }

    public <T> T executeWithRetry(Callable<T> operation) throws Exception {
        int attempt = 0;
        long delay = initialDelayMs;

        while (true) {
            try {
                System.out.println("Attempt " + (attempt + 1));
                return operation.call();

            } catch (Exception e) {
                attempt++;

                if (attempt >= maxRetries) {
                    System.out.println("Max retries exceeded");
                    throw e;
                }

                System.out.println("Retry after " + delay + "ms. Error: " + e.getMessage());
                Thread.sleep(delay);
                delay *= 2;  // Exponential backoff
            }
        }
    }
}

class Main {
    private static int attemptCount = 0;

    public static void main(String[] args) throws Exception {
        RetryableOperation retry = new RetryableOperation(3, 100);

        try {
            String result = retry.executeWithRetry(() -> {
                attemptCount++;
                if (attemptCount < 3) {
                    throw new Exception("Temporary failure");
                }
                return "Success!";
            });
            System.out.println("Result: " + result);
        } catch (Exception e) {
            System.out.println("Final error: " + e.getMessage());
        }
    }
}`
        },
        python: {
          starterCode: `import time

class RetryableOperation:
    def __init__(self, max_retries, initial_delay_ms):
        self.max_retries = max_retries
        self.initial_delay_ms = initial_delay_ms

    def execute_with_retry(self, operation):
        attempt = 0
        delay = self.initial_delay_ms / 1000  # Convert to seconds

        while True:
            try:
                print(f"Attempt {attempt + 1}")
                # TODO: Call operation() and return result
                pass
            except Exception as e:
                attempt += 1

                # TODO: Check if max retries exceeded

                # TODO: Sleep and double delay (exponential backoff)
                pass`,
          solution: `import time

class RetryableOperation:
    def __init__(self, max_retries, initial_delay_ms):
        self.max_retries = max_retries
        self.initial_delay_ms = initial_delay_ms

    def execute_with_retry(self, operation):
        attempt = 0
        delay = self.initial_delay_ms / 1000  # Convert to seconds

        while True:
            try:
                print(f"Attempt {attempt + 1}")
                return operation()
            except Exception as e:
                attempt += 1

                if attempt >= self.max_retries:
                    print("Max retries exceeded")
                    raise

                print(f"Retry after {delay*1000:.0f}ms. Error: {e}")
                time.sleep(delay)
                delay *= 2  # Exponential backoff

# Test
retry = RetryableOperation(3, 100)
attempt_count = 0

def flaky_operation():
    global attempt_count
    attempt_count += 1
    if attempt_count < 3:
        raise Exception("Temporary failure")
    return "Success!"

result = retry.execute_with_retry(flaky_operation)
print(f"Result: {result}")`
        }
      },
      explanation: 'Exponential backoff: retry with delays that double each time (100ms, 200ms, 400ms). Use Thread.sleep(delay) then delay *= 2. Limit retries with maxRetries counter. Use Callable<T> for operations that return values. Add jitter (randomness) in production to avoid thundering herd.',
      timeComplexity: 'O(2^n) total wait time',
      spaceComplexity: 'O(1)'
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`ExceptionHandling-${q.id}`)).length
    return { completed, total: questions.length, percentage: Math.round((completed / questions.length) * 100) }
  }

  const stats = getCompletionStats()

  // Group questions by difficulty
  const groupedQuestions = {
    Easy: questions.filter(q => q.difficulty === 'Easy'),
    Medium: questions.filter(q => q.difficulty === 'Medium'),
    Hard: questions.filter(q => q.difficulty === 'Hard')
  }

  const selectQuestion = (question) => {
    setSelectedQuestion(question)
    setShowSolution(false)
    setShowExplanation(false)
    setUserCode(question.code[language].starterCode)
    setOutput('')
    setShowDrawing(false)
  }

  const toggleSection = (difficulty) => {
    setExpandedSections(prev => ({ ...prev, [difficulty]: !prev[difficulty] }))
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '#10b981'
      case 'Medium': return '#f59e0b'
      case 'Hard': return '#ef4444'
      default: return '#6b7280'
    }
  }

  if (selectedQuestion) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', color: 'white', padding: '1.5rem' }}>
      <div style={{ padding: '2rem', maxWidth: '1800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setSelectedQuestion(null)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d97706'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}>
            ← Back to Java
          </button>
          <LanguageToggle />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Problem Description */}
          <div style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2rem', borderRadius: '12px', border: '2px solid #374151', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: '#fbbf24', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <CompletionCheckbox problemId={`ExceptionHandling-${selectedQuestion.id}`} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.75rem' }}>Description</h3>
              <p style={{ fontSize: '1rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.description}</p>
            </div>

            {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.75rem' }}>Examples</h3>
                {selectedQuestion.examples.map((example, idx) => (
                  <div key={idx} style={{ backgroundColor: '#374151', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #374151', color: '#d1d5db' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#fbbf24' }}>Input:</strong> <code style={{ color: '#d1d5db' }}>{example.input}</code>
                    </div>
                    <div>
                      <strong style={{ color: '#fbbf24' }}>Output:</strong> <code style={{ color: '#d1d5db' }}>{example.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedQuestion.explanation && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.75rem' }}>Explanation</h3>
                <p style={{ fontSize: '0.95rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.explanation}</p>
              </div>
            )}

            {(selectedQuestion.timeComplexity || selectedQuestion.spaceComplexity) && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#374151', borderRadius: '8px', border: '1px solid #374151' }}>
                <h3 style={{ fontSize: '1rem', color: '#fbbf24', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Space: {selectedQuestion.spaceComplexity}</div>}
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', border: '2px solid #e5e7eb', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedQuestion.code[language].solution) }} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
              <button onClick={() => setUserCode(selectedQuestion.code[language].starterCode)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Reset Code
              </button>
            </div>

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #e5e7eb', borderRadius: '8px', resize: 'none', lineHeight: '1.5' }} spellCheck={false} />

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#374151', marginBottom: '0.5rem' }}>Output</h3>
                <pre style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'auto', fontSize: '0.875rem', maxHeight: '150px' }}>{output}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          ← Back
        </button>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem' }}>⚠️ Exception Handling</h1>
        <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>Master Java exception handling, custom exceptions, and error recovery patterns</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem 2rem', backgroundColor: '#1f2937', borderRadius: '12px', border: '2px solid #374151' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6' }}>{stats.completed}/{stats.total}</div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>Completed</div>
          </div>
          <div style={{ padding: '1rem 2rem', backgroundColor: '#1f2937', borderRadius: '12px', border: '2px solid #374151' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{stats.percentage}%</div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>Progress</div>
          </div>
        </div>
      </div>

      {Object.entries(groupedQuestions).map(([difficulty, difficultyQuestions]) => (
        difficultyQuestions.length > 0 && (
          <div key={difficulty} style={{ marginBottom: '2rem' }}>
            <button onClick={() => toggleSection(difficulty)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', backgroundColor: '#1f2937', border: '2px solid #374151', borderRadius: '12px', cursor: 'pointer', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: getDifficultyColor(difficulty) }}>{difficulty}</span>
                <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>({difficultyQuestions.length} problems)</span>
              </div>
              <span style={{ fontSize: '1.25rem', color: '#9ca3af' }}>{expandedSections[difficulty] ? '▼' : '▶'}</span>
            </button>

            {expandedSections[difficulty] && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem' }}>
                {difficultyQuestions.map((question) => (
                  <div key={question.id} onClick={() => selectQuestion(question)} style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '12px', border: '2px solid #374151', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0, flex: 1 }}>{question.id}. {question.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ transform: 'scale(0.85)' }}>
                          <CompletionCheckbox problemId={`ExceptionHandling-${question.id}`} />
                        </div>
                        {question.leetcodeUrl && (
                          <a
                            href={question.leetcodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ padding: '0.25rem 0.75rem', backgroundColor: '#FFA116', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '0.75rem', fontWeight: '600', display: 'inline-block' }}
                          >
                            LeetCode ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      ))}
    </div>
  )
}

export default ExceptionHandling

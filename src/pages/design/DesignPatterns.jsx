import { useState, useEffect, useRef } from 'react'
import { useModalFocus } from '../../hooks/useModalFocus'

// Simple syntax highlighter for Java code
const SyntaxHighlighter = ({ code }) => {
  const highlightJava = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    // Store protected content with placeholders
    const protectedContent = []
    let placeholder = 0

    // Protect comments first
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

    // Apply syntax highlighting to remaining code
    highlighted = highlighted
      // Keywords - purple
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null)\b/g, '<span style="color: #c586c0;">$1</span>')

      // Boolean and primitives - blue
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')

      // Types and classes - light green
      .replace(/\b(String|List|ArrayList|LinkedList|HashMap|TreeMap|HashSet|TreeSet|Map|Set|Queue|Deque|Collection|Arrays|Collections|Thread|Runnable|Executor|ExecutorService|CompletableFuture|Stream|Optional|Path|Files|Pattern|Matcher|StringBuilder|StringBuffer|Integer|Double|Float|Long|Short|Byte|Character|Boolean|Object|System|Math|Scanner|BufferedReader|FileReader|FileWriter|PrintWriter|InputStream|OutputStream|Exception|RuntimeException|IOException|SQLException|WeakReference|SoftReference|PhantomReference|ReferenceQueue)\b/g, '<span style="color: #4ec9b0;">$1</span>')

      // Annotations - yellow
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')

      // Numbers - light green
      .replace(/\b(\d+\.?\d*[fLdD]?)\b/g, '<span style="color: #b5cea8;">$1</span>')

      // Method calls - yellow
      .replace(/\b([a-z_]\w*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')

    // Restore protected content
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

function DesignPatterns({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})

  // Comprehensive modal focus management
  const { modalRef, firstFocusableRef } = useModalFocus(onBack)

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }))
  }

  const parseCodeSections = (code) => {
    const sections = []
    const lines = code.split('\n')
    let currentSection = null
    let currentContent = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.includes('// ═══════════════════════════════════════════════════════════════════════════')) {
        if (currentSection) {
          sections.push({
            title: currentSection,
            code: currentContent.join('\n')
          })
          currentContent = []
        }

        if (i + 1 < lines.length && lines[i + 1].includes('// ✦')) {
          currentSection = lines[i + 1].replace('// ✦', '').trim()
          i += 2
          continue
        }
      }

      if (currentSection) {
        currentContent.push(line)
      }
    }

    if (currentSection && currentContent.length > 0) {
      sections.push({
        title: currentSection,
        code: currentContent.join('\n')
      })
    }

    return sections
  }

  const designPatterns = [
    {
      name: 'Singleton',
      icon: '🔒',
      description: 'Ensures class has only one instance with global access point. Lazy initialization, thread-safe implementations (double-check locking, enum). Used for configuration managers, logging, caching. Caution: can hinder testability and create hidden dependencies.',
      diagram: () => (
        <svg viewBox="0 0 600 350" style={{ width: '100%', maxWidth: '600px', height: 'auto', margin: '2rem auto', display: 'block' }}>
          <defs>
            <linearGradient id="singletonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrowSing" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#6366f1" />
            </marker>
          </defs>
          <text x="300" y="30" fontSize="18" fontWeight="bold" fill="#6366f1" textAnchor="middle">Singleton Pattern</text>
          <rect x="200" y="70" width="200" height="150" rx="12" fill="url(#singletonGrad)" stroke="#4f46e5" strokeWidth="3" />
          <text x="300" y="100" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">Singleton Class</text>
          <rect x="220" y="120" width="160" height="30" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
          <text x="300" y="140" fontSize="12" fontWeight="600" fill="#6366f1" textAnchor="middle">- instance: Singleton</text>
          <line x1="220" y1="160" x2="380" y2="160" stroke="#6366f1" strokeWidth="2" />
          <rect x="220" y="170" width="160" height="30" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
          <text x="300" y="190" fontSize="12" fontWeight="600" fill="#6366f1" textAnchor="middle">+ getInstance()</text>
          <rect x="50" y="100" width="100" height="60" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
          <text x="100" y="125" fontSize="13" fontWeight="600" fill="#6366f1" textAnchor="middle">Client A</text>
          <text x="100" y="145" fontSize="11" fill="#6b7280" textAnchor="middle">Requests</text>
          <rect x="450" y="100" width="100" height="60" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
          <text x="500" y="125" fontSize="13" fontWeight="600" fill="#6366f1" textAnchor="middle">Client B</text>
          <text x="500" y="145" fontSize="11" fill="#6b7280" textAnchor="middle">Requests</text>
          <line x1="150" y1="130" x2="200" y2="130" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowSing)" />
          <line x1="450" y1="130" x2="400" y2="130" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowSing)" />
          <rect x="200" y="270" width="200" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
          <text x="300" y="295" fontSize="14" fontWeight="600" fill="#f59e0b" textAnchor="middle">Single Instance</text>
          <text x="300" y="312" fontSize="11" fill="#6b7280" textAnchor="middle">All clients get same object</text>
          <line x1="300" y1="220" x2="300" y2="270" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
          <text x="300" y="340" fontSize="12" fill="#6b7280" textAnchor="middle" fontStyle="italic">
            One instance shared across entire application
          </text>
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Eager Initialization - Thread-Safe by Default
// ═══════════════════════════════════════════════════════════════════════════

public class DatabaseConnection {
  private static final DatabaseConnection instance = new DatabaseConnection();

  private DatabaseConnection() {
    // Private constructor prevents instantiation
  }

  public static DatabaseConnection getInstance() {
    return instance;
  }
}

// Usage
DatabaseConnection db1 = DatabaseConnection.getInstance();
DatabaseConnection db2 = DatabaseConnection.getInstance();
System.out.println(db1 == db2);  // Output: true - same instance

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Lazy Initialization with Double-Check Locking
// ═══════════════════════════════════════════════════════════════════════════

public class LazyDbConnection {
  private static volatile LazyDbConnection instance;

  private LazyDbConnection() {}

  public static LazyDbConnection getInstance() {
    if (instance == null) {  // First check (no locking)
      synchronized (LazyDbConnection.class) {
        if (instance == null) {  // Second check (with locking)
          instance = new LazyDbConnection();
        }
      }
    }
    return instance;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Best Approach - Enum Singleton (Joshua Bloch)
// ═══════════════════════════════════════════════════════════════════════════

public enum ConfigManager {
  INSTANCE;

  private String config;

  public void setConfig(String config) {
    this.config = config;
  }

  public String getConfig() {
    return config;
  }
}

// Usage
ConfigManager.INSTANCE.setConfig("production");
System.out.println(ConfigManager.INSTANCE.getConfig());
// Output: production

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Real-World JDK Examples
// ═══════════════════════════════════════════════════════════════════════════

// java.lang.Runtime - provides single Runtime instance
Runtime runtime = Runtime.getRuntime();
System.out.println("Available processors: " + runtime.availableProcessors());

// java.awt.Desktop - singleton Desktop instance
Desktop desktop = Desktop.getDesktop();

// Output: Available processors: 8`
    },
    {
      name: 'Factory Method',
      icon: '🏭',
      description: 'Defines interface for creating objects, letting subclasses decide which class to instantiate. Defers instantiation to subclasses. Promotes loose coupling. Common in frameworks - DocumentFactory, ConnectionFactory. Alternative to direct constructor calls.',
      diagram: () => (
        <svg viewBox="0 0 700 400" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '2rem auto', display: 'block' }}>
          <defs>
            <linearGradient id="factoryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrowFactory" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
            </marker>
          </defs>

          <text x="350" y="30" fontSize="18" fontWeight="bold" fill="#10b981" textAnchor="middle">Factory Method Pattern</text>

          {/* Creator Abstract Class */}
          <rect x="250" y="60" width="200" height="100" rx="10" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
          <text x="350" y="85" fontSize="14" fontWeight="bold" fill="#047857" textAnchor="middle">«abstract»</text>
          <text x="350" y="105" fontSize="15" fontWeight="bold" fill="#047857" textAnchor="middle">Creator</text>
          <line x1="260" y1="115" x2="440" y2="115" stroke="#10b981" strokeWidth="1.5" />
          <text x="350" y="135" fontSize="12" fill="#047857" textAnchor="middle">+ factoryMethod()</text>
          <text x="350" y="150" fontSize="12" fill="#047857" textAnchor="middle">+ operation()</text>

          {/* Concrete Creators */}
          <rect x="100" y="220" width="160" height="80" rx="8" fill="url(#factoryGrad)" stroke="#059669" strokeWidth="2" />
          <text x="180" y="245" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">PDFCreator</text>
          <line x1="110" y1="255" x2="250" y2="255" stroke="white" strokeWidth="1" />
          <text x="180" y="275" fontSize="11" fill="white" textAnchor="middle">+ factoryMethod()</text>
          <text x="180" y="290" fontSize="10" fill="#d1fae5" textAnchor="middle">return PDFDoc</text>

          <rect x="440" y="220" width="160" height="80" rx="8" fill="url(#factoryGrad)" stroke="#059669" strokeWidth="2" />
          <text x="520" y="245" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">WordCreator</text>
          <line x1="450" y1="255" x2="590" y2="255" stroke="white" strokeWidth="1" />
          <text x="520" y="275" fontSize="11" fill="white" textAnchor="middle">+ factoryMethod()</text>
          <text x="520" y="290" fontSize="10" fill="#d1fae5" textAnchor="middle">return WordDoc</text>

          {/* Inheritance arrows */}
          <line x1="180" y1="220" x2="300" y2="160" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowFactory)" strokeDasharray="none" />
          <polygon points="295,165 300,160 305,165" fill="white" stroke="#10b981" strokeWidth="2" />
          <line x1="520" y1="220" x2="400" y2="160" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowFactory)" strokeDasharray="none" />
          <polygon points="395,165 400,160 405,165" fill="white" stroke="#10b981" strokeWidth="2" />

          {/* Product boxes */}
          <rect x="120" y="330" width="120" height="50" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
          <text x="180" y="352" fontSize="13" fontWeight="600" fill="#f59e0b" textAnchor="middle">PDFDocument</text>
          <text x="180" y="368" fontSize="10" fill="#92400e" textAnchor="middle">Product A</text>

          <rect x="460" y="330" width="120" height="50" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
          <text x="520" y="352" fontSize="13" fontWeight="600" fill="#f59e0b" textAnchor="middle">WordDocument</text>
          <text x="520" y="368" fontSize="10" fill="#92400e" textAnchor="middle">Product B</text>

          {/* Creation arrows */}
          <line x1="180" y1="300" x2="180" y2="330" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arrowFactory)" />
          <line x1="520" y1="300" x2="520" y2="330" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arrowFactory)" />
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Abstract Creator and Product
// ═══════════════════════════════════════════════════════════════════════════

// Product interface
interface Document {
  void open();
  void save();
}

// Creator with factory method
abstract class Application {
  // Factory method - subclasses override
  abstract Document createDocument();

  public void newDocument() {
    Document doc = createDocument();
    doc.open();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Concrete Implementations
// ═══════════════════════════════════════════════════════════════════════════

// Concrete products
class PDFDocument implements Document {
  public void open() { System.out.println("Opening PDF document"); }
  public void save() { System.out.println("Saving PDF document"); }
}

class WordDocument implements Document {
  public void open() { System.out.println("Opening Word document"); }
  public void save() { System.out.println("Saving Word document"); }
}

// Concrete creators
class PDFApplication extends Application {
  Document createDocument() {
    return new PDFDocument();
  }
}

class WordApplication extends Application {
  Document createDocument() {
    return new WordDocument();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Usage and Benefits
// ═══════════════════════════════════════════════════════════════════════════

// Usage
Application pdfApp = new PDFApplication();
pdfApp.newDocument();  // Output: Opening PDF document

Application wordApp = new WordApplication();
wordApp.newDocument();  // Output: Opening Word document

// Benefits:
// - Decouples client code from concrete classes
// - Easy to add new product types
// - Single Responsibility: creation logic separated

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Real-World Examples
// ═══════════════════════════════════════════════════════════════════════════

// java.util.Calendar.getInstance()
Calendar calendar = Calendar.getInstance();

// java.text.NumberFormat.getInstance()
NumberFormat formatter = NumberFormat.getInstance();

// javax.xml.parsers.DocumentBuilderFactory
DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
DocumentBuilder builder = factory.newDocumentBuilder();`
    },
    {
      name: 'Builder',
      icon: '🏗️',
      description: 'Constructs complex objects step by step. Separates object construction from representation. Same construction process can create different representations. Useful for objects with many optional parameters. Fluent API pattern.',
      diagram: () => (
        <svg viewBox="0 0 650 350" style={{ width: '100%', maxWidth: '650px', height: 'auto', margin: '2rem auto', display: 'block' }}>
          <defs>
            <linearGradient id="builderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrowBuilder" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#f59e0b" />
            </marker>
          </defs>

          <text x="325" y="30" fontSize="18" fontWeight="bold" fill="#f59e0b" textAnchor="middle">Builder Pattern</text>

          {/* Client */}
          <rect x="40" y="80" width="120" height="60" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
          <text x="100" y="107" fontSize="14" fontWeight="bold" fill="#92400e" textAnchor="middle">Client</text>
          <text x="100" y="125" fontSize="11" fill="#92400e" textAnchor="middle">Uses Builder</text>

          {/* Builder */}
          <rect x="240" y="70" width="160" height="110" rx="8" fill="url(#builderGrad)" stroke="#d97706" strokeWidth="2" />
          <text x="320" y="95" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Builder</text>
          <line x1="250" y1="105" x2="390" y2="105" stroke="white" strokeWidth="1" />
          <text x="320" y="125" fontSize="11" fill="white" textAnchor="middle">setName()</text>
          <text x="320" y="142" fontSize="11" fill="white" textAnchor="middle">setAge()</text>
          <text x="320" y="159" fontSize="11" fill="white" textAnchor="middle">setEmail()</text>
          <text x="320" y="176" fontSize="11" fill="white" textAnchor="middle">build()</text>

          {/* Product */}
          <rect x="480" y="80" width="130" height="100" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
          <text x="545" y="105" fontSize="14" fontWeight="bold" fill="#1e40af" textAnchor="middle">Product</text>
          <line x1="490" y1="115" x2="600" y2="115" stroke="#3b82f6" strokeWidth="1" />
          <text x="545" y="135" fontSize="10" fill="#1e40af" textAnchor="middle">- name</text>
          <text x="545" y="150" fontSize="10" fill="#1e40af" textAnchor="middle">- age</text>
          <text x="545" y="165" fontSize="10" fill="#1e40af" textAnchor="middle">- email</text>

          {/* Construction steps */}
          <rect x="200" y="230" width="250" height="90" rx="8" fill="#f3f4f6" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="3,3" />
          <text x="325" y="252" fontSize="13" fontWeight="600" fill="#374151" textAnchor="middle">Construction Steps</text>
          <text x="230" y="272" fontSize="11" fill="#6b7280">1. new Builder()</text>
          <text x="230" y="288" fontSize="11" fill="#6b7280">2. setName("John")</text>
          <text x="230" y="304" fontSize="11" fill="#6b7280">3. setAge(30)</text>
          <line x1="160" y1="110" x2="240" y2="110" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowBuilder)" />
          <line x1="400" y1="130" x2="480" y2="130" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBuilder)" />
          <text x="440" y="125" fontSize="10" fill="#3b82f6">builds</text>
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Product Class with Private Constructor
// ═══════════════════════════════════════════════════════════════════════════

public class User {
  // Required parameters
  private final String username;
  private final String email;

  // Optional parameters
  private final String firstName;
  private final String lastName;
  private final int age;
  private final String phone;

  private User(UserBuilder builder) {
    this.username = builder.username;
    this.email = builder.email;
    this.firstName = builder.firstName;
    this.lastName = builder.lastName;
    this.age = builder.age;
    this.phone = builder.phone;
  }

  // Getters
  public String getUsername() { return username; }
  public String getEmail() { return email; }
  // ... other getters

  // ═══════════════════════════════════════════════════════════════════════════
  // ✦ Builder Class with Fluent API
  // ═══════════════════════════════════════════════════════════════════════════

  public static class UserBuilder {
    // Required parameters
    private final String username;
    private final String email;

    // Optional parameters - initialized to default values
    private String firstName = "";
    private String lastName = "";
    private int age = 0;
    private String phone = "";

    public UserBuilder(String username, String email) {
      this.username = username;
      this.email = email;
    }

    public UserBuilder firstName(String firstName) {
      this.firstName = firstName;
      return this;
    }

    public UserBuilder lastName(String lastName) {
      this.lastName = lastName;
      return this;
    }

    public UserBuilder age(int age) {
      this.age = age;
      return this;
    }

    public UserBuilder phone(String phone) {
      this.phone = phone;
      return this;
    }

    public User build() {
      return new User(this);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
// ✦ Usage Examples
// ═══════════════════════════════════════════════════════════════════════════

  public String toString() {
    return "User{username='" + username + "', email='" + email +
           "', firstName='" + firstName + "', lastName='" + lastName +
           "', age=" + age + ", phone='" + phone + "'}";
  }
}

// Usage - Fluent API
User user1 = new User.UserBuilder("john_doe", "john@example.com")
  .firstName("John")
  .lastName("Doe")
  .age(30)
  .phone("555-1234")
  .build();

User user2 = new User.UserBuilder("jane_smith", "jane@example.com")
  .firstName("Jane")
  .build();

System.out.println(user1);
System.out.println(user2);

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Real-World JDK Examples
// ═══════════════════════════════════════════════════════════════════════════

// StringBuilder
StringBuilder sb = new StringBuilder()
  .append("Hello")
  .append(" ")
  .append("World");

// Stream.Builder
Stream<String> stream = Stream.<String>builder()
  .add("one")
  .add("two")
  .add("three")
  .build();

// Output:
// User{username='john_doe', email='john@example.com', firstName='John', lastName='Doe', age=30, phone='555-1234'}
// User{username='jane_smith', email='jane@example.com', firstName='Jane', lastName='', age=0, phone=''}`
    },
    {
      name: 'Prototype',
      icon: '🧬',
      description: 'Creates objects by cloning existing instances. Avoids expensive initialization. Useful when object creation is costly. Implements Cloneable interface in Java. Shallow vs deep copy considerations.',
      diagram: () => (
        <svg viewBox="0 0 700 380" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '20px 0' }}>
          <defs>
            <linearGradient id="prototypeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#0891b2', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrowPrototype" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#0891b2" />
            </marker>
          </defs>

          {/* Prototype Interface */}
          <rect x="250" y="30" width="200" height="80" fill="url(#prototypeGrad)" stroke="#0891b2" strokeWidth="2" rx="5" />
          <text x="350" y="55" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">«interface»</text>
          <text x="350" y="75" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Cloneable</text>
          <line x1="260" y1="85" x2="440" y2="85" stroke="white" strokeWidth="1" />
          <text x="350" y="102" textAnchor="middle" fill="white" fontSize="14">+ clone(): Object</text>

          {/* Concrete Prototype */}
          <rect x="250" y="160" width="200" height="100" fill="url(#prototypeGrad)" stroke="#0891b2" strokeWidth="2" rx="5" />
          <text x="350" y="185" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Shape</text>
          <line x1="260" y1="195" x2="440" y2="195" stroke="white" strokeWidth="1" />
          <text x="265" y="212" fill="white" fontSize="13">- type: String</text>
          <text x="265" y="228" fill="white" fontSize="13">- color: String</text>
          <line x1="260" y1="235" x2="440" y2="235" stroke="white" strokeWidth="1" />
          <text x="265" y="252" fill="white" fontSize="13">+ clone(): Shape</text>

          {/* Implements arrow */}
          <line x1="350" y1="110" x2="350" y2="160" stroke="#0891b2" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowPrototype)" />

          {/* Original Object */}
          <rect x="50" y="300" width="150" height="70" fill="#ecfeff" stroke="#06b6d4" strokeWidth="2" rx="5" />
          <text x="125" y="325" textAnchor="middle" fill="#0891b2" fontSize="14" fontWeight="bold">Original</text>
          <text x="125" y="345" textAnchor="middle" fill="#0e7490" fontSize="12">type: "Circle"</text>
          <text x="125" y="360" textAnchor="middle" fill="#0e7490" fontSize="12">color: "red"</text>

          {/* Clone Arrow 1 */}
          <path d="M 200 335 L 280 220" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowPrototype)" />
          <text x="230" y="270" fill="#0891b2" fontSize="13" fontWeight="bold">clone()</text>

          {/* Cloned Objects */}
          <rect x="280" y="300" width="150" height="70" fill="#ecfeff" stroke="#06b6d4" strokeWidth="2" rx="5" />
          <text x="355" y="325" textAnchor="middle" fill="#0891b2" fontSize="14" fontWeight="bold">Clone 1</text>
          <text x="355" y="345" textAnchor="middle" fill="#0e7490" fontSize="12">type: "Circle"</text>
          <text x="355" y="360" textAnchor="middle" fill="#0e7490" fontSize="12">color: "blue"</text>

          <rect x="500" y="300" width="150" height="70" fill="#ecfeff" stroke="#06b6d4" strokeWidth="2" rx="5" />
          <text x="575" y="325" textAnchor="middle" fill="#0891b2" fontSize="14" fontWeight="bold">Clone 2</text>
          <text x="575" y="345" textAnchor="middle" fill="#0e7490" fontSize="12">type: "Circle"</text>
          <text x="575" y="360" textAnchor="middle" fill="#0e7490" fontSize="12">color: "green"</text>

          {/* Clone Arrows */}
          <path d="M 360 260 L 355 300" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowPrototype)" />
          <path d="M 380 230 L 575 300" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowPrototype)" />
          <text x="440" y="260" fill="#0891b2" fontSize="13" fontWeight="bold">clone()</text>
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Prototype Interface and Implementation
// ═══════════════════════════════════════════════════════════════════════════

public class Shape implements Cloneable {
  private String type;
  private String color;
  private int x;
  private int y;

  public Shape(String type) {
    this.type = type;
  }

  public void setColor(String color) { this.color = color; }
  public void setPosition(int x, int y) {
    this.x = x;
    this.y = y;
  }

  // Clone method
  @Override
  public Shape clone() {
    try {
      return (Shape) super.clone();
    } catch (CloneNotSupportedException e) {
      return null;
    }
  }

  @Override
  public String toString() {
    return type + " at (" + x + "," + y + ") color: " + color;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Deep Copy with Prototype
// ═══════════════════════════════════════════════════════════════════════════

class Database implements Cloneable {
  private String name;
  private List<String> tables;

  public Database(String name) {
    this.name = name;
    this.tables = new ArrayList<>();
  }

  public void addTable(String table) {
    tables.add(table);
  }

  // Deep clone - creates new ArrayList
  @Override
  public Database clone() {
    try {
      Database cloned = (Database) super.clone();
      cloned.tables = new ArrayList<>(this.tables);
      return cloned;
    } catch (CloneNotSupportedException e) {
      return null;
    }
  }

  public String toString() {
    return "Database{name='" + name + "', tables=" + tables + "}";
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Usage and Benefits
// ═══════════════════════════════════════════════════════════════════════════

// Usage
Shape circle = new Shape("Circle");
circle.setColor("red");
circle.setPosition(10, 20);

// Clone the circle
Shape clonedCircle = circle.clone();
clonedCircle.setColor("blue");
clonedCircle.setPosition(30, 40);

System.out.println(circle);        // Output: Circle at (10,20) color: red
System.out.println(clonedCircle);  // Output: Circle at (30,40) color: blue

// Deep copy example
Database db1 = new Database("ProductionDB");
db1.addTable("users");
db1.addTable("orders");

Database db2 = db1.clone();
db2.addTable("products");

System.out.println(db1);  // Output: Database{name='ProductionDB', tables=[users, orders]}
System.out.println(db2);  // Output: Database{name='ProductionDB', tables=[users, orders, products]}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Prototype Registry Pattern
// ═══════════════════════════════════════════════════════════════════════════

class ShapeRegistry {
  private Map<String, Shape> registry = new HashMap<>();

  public void addShape(String key, Shape shape) {
    registry.put(key, shape);
  }

  public Shape getShape(String key) {
    Shape prototype = registry.get(key);
    return prototype != null ? prototype.clone() : null;
  }
}

// Usage
ShapeRegistry registry = new ShapeRegistry();
registry.addShape("redCircle", new Shape("Circle"));
registry.getShape("redCircle").setColor("red");

Shape redCircle1 = registry.getShape("redCircle");
Shape redCircle2 = registry.getShape("redCircle");
// Each call returns a new cloned instance`
    },
    {
      name: 'Abstract Factory',
      icon: '🏢',
      description: 'Provides interface for creating families of related objects without specifying concrete classes. Factory of factories. Ensures created objects are compatible. Used in UI toolkits (Windows/Mac widgets), database access layers.',
      diagram: () => (
        <svg viewBox="0 0 800 500" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '20px 0' }}>
          <defs>
            <linearGradient id="abstractFactoryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#6d28d9', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrowAbstractFactory" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#6d28d9" />
            </marker>
          </defs>

          {/* Abstract Factory */}
          <rect x="300" y="20" width="200" height="90" fill="url(#abstractFactoryGrad)" stroke="#6d28d9" strokeWidth="2" rx="5" />
          <text x="400" y="45" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">«interface»</text>
          <text x="400" y="65" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">GUIFactory</text>
          <line x1="310" y1="75" x2="490" y2="75" stroke="white" strokeWidth="1" />
          <text x="315" y="92" fill="white" fontSize="13">+ createButton(): Button</text>
          <text x="315" y="105" fill="white" fontSize="13">+ createCheckbox(): Checkbox</text>

          {/* Concrete Factories */}
          <rect x="120" y="170" width="180" height="90" fill="url(#abstractFactoryGrad)" stroke="#6d28d9" strokeWidth="2" rx="5" />
          <text x="210" y="195" textAnchor="middle" fill="white" fontSize="17" fontWeight="bold">WindowsFactory</text>
          <line x1="130" y1="205" x2="290" y2="205" stroke="white" strokeWidth="1" />
          <text x="130" y="222" fill="white" fontSize="12">+ createButton(): Button</text>
          <text x="130" y="237" fill="white" fontSize="12">+ createCheckbox(): Checkbox</text>
          <text x="135" y="253" fill="#ddd6fe" fontSize="11" fontStyle="italic">→ new WindowsButton()</text>

          <rect x="500" y="170" width="180" height="90" fill="url(#abstractFactoryGrad)" stroke="#6d28d9" strokeWidth="2" rx="5" />
          <text x="590" y="195" textAnchor="middle" fill="white" fontSize="17" fontWeight="bold">MacFactory</text>
          <line x1="510" y1="205" x2="670" y2="205" stroke="white" strokeWidth="1" />
          <text x="510" y="222" fill="white" fontSize="12">+ createButton(): Button</text>
          <text x="510" y="237" fill="white" fontSize="12">+ createCheckbox(): Checkbox</text>
          <text x="515" y="253" fill="#ddd6fe" fontSize="11" fontStyle="italic">→ new MacButton()</text>

          {/* Inheritance arrows from concrete factories to abstract */}
          <line x1="210" y1="170" x2="350" y2="110" stroke="#6d28d9" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowAbstractFactory)" />
          <line x1="590" y1="170" x2="450" y2="110" stroke="#6d28d9" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowAbstractFactory)" />

          {/* Abstract Products */}
          <rect x="90" y="330" width="150" height="70" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" rx="5" />
          <text x="165" y="355" textAnchor="middle" fill="#6d28d9" fontSize="15" fontWeight="bold">«interface»</text>
          <text x="165" y="375" textAnchor="middle" fill="#6d28d9" fontSize="16" fontWeight="bold">Button</text>
          <text x="100" y="392" fill="#5b21b6" fontSize="12">+ render()</text>

          <rect x="280" y="330" width="150" height="70" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" rx="5" />
          <text x="355" y="355" textAnchor="middle" fill="#6d28d9" fontSize="15" fontWeight="bold">«interface»</text>
          <text x="355" y="375" textAnchor="middle" fill="#6d28d9" fontSize="16" fontWeight="bold">Checkbox</text>
          <text x="290" y="392" fill="#5b21b6" fontSize="12">+ check()</text>

          {/* Concrete Products - Windows */}
          <rect x="50" y="440" width="150" height="50" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" rx="5" />
          <text x="125" y="460" textAnchor="middle" fill="#6d28d9" fontSize="14" fontWeight="bold">WindowsButton</text>
          <text x="60" y="478" fill="#5b21b6" fontSize="11">Windows-style UI</text>

          <rect x="220" y="440" width="150" height="50" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" rx="5" />
          <text x="295" y="460" textAnchor="middle" fill="#6d28d9" fontSize="14" fontWeight="bold">WindowsCheckbox</text>
          <text x="230" y="478" fill="#5b21b6" fontSize="11">Windows-style UI</text>

          {/* Concrete Products - Mac */}
          <rect x="430" y="440" width="150" height="50" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" rx="5" />
          <text x="505" y="460" textAnchor="middle" fill="#6d28d9" fontSize="14" fontWeight="bold">MacButton</text>
          <text x="450" y="478" fill="#5b21b6" fontSize="11">Mac-style UI</text>

          <rect x="600" y="440" width="150" height="50" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" rx="5" />
          <text x="675" y="460" textAnchor="middle" fill="#6d28d9" fontSize="14" fontWeight="bold">MacCheckbox</text>
          <text x="620" y="478" fill="#5b21b6" fontSize="11">Mac-style UI</text>

          {/* Create arrows from factories to products */}
          <path d="M 210 260 L 125 330" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arrowAbstractFactory)" />
          <path d="M 210 260 L 295 330" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arrowAbstractFactory)" />

          <path d="M 590 260 L 505 330" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arrowAbstractFactory)" />
          <path d="M 590 260 L 675 330" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arrowAbstractFactory)" />

          {/* Implementation arrows from concrete products to interfaces */}
          <line x1="125" y1="440" x2="145" y2="400" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5,5" />
          <line x1="295" y1="440" x2="340" y2="400" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5,5" />
          <line x1="505" y1="440" x2="185" y2="400" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5,5" />
          <line x1="675" y1="440" x2="370" y2="400" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5,5" />

          {/* Labels */}
          <text x="150" y="295" fill="#6d28d9" fontSize="12" fontWeight="bold">creates →</text>
          <text x="530" y="295" fill="#6d28d9" fontSize="12" fontWeight="bold">creates →</text>
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Abstract Products
// ═══════════════════════════════════════════════════════════════════════════

// Abstract product interfaces
interface Button {
  void render();
  void click();
}

interface Checkbox {
  void render();
  void check();
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Concrete Products - Windows Family
// ═══════════════════════════════════════════════════════════════════════════

class WindowsButton implements Button {
  public void render() {
    System.out.println("Rendering Windows-style button");
  }
  public void click() {
    System.out.println("Windows button clicked");
  }
}

class WindowsCheckbox implements Checkbox {
  public void render() {
    System.out.println("Rendering Windows-style checkbox");
  }
  public void check() {
    System.out.println("Windows checkbox checked");
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Concrete Products - Mac Family
// ═══════════════════════════════════════════════════════════════════════════

class MacButton implements Button {
  public void render() {
    System.out.println("Rendering Mac-style button");
  }
  public void click() {
    System.out.println("Mac button clicked");
  }
}

class MacCheckbox implements Checkbox {
  public void render() {
    System.out.println("Rendering Mac-style checkbox");
  }
  public void check() {
    System.out.println("Mac checkbox checked");
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Abstract Factory and Concrete Factories
// ═══════════════════════════════════════════════════════════════════════════

interface GUIFactory {
  Button createButton();
  Checkbox createCheckbox();
}

class WindowsFactory implements GUIFactory {
  public Button createButton() {
    return new WindowsButton();
  }
  public Checkbox createCheckbox() {
    return new WindowsCheckbox();
  }
}

class MacFactory implements GUIFactory {
  public Button createButton() {
    return new MacButton();
  }
  public Checkbox createCheckbox() {
    return new MacCheckbox();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Client Code and Usage
// ═══════════════════════════════════════════════════════════════════════════

class Application {
  private Button button;
  private Checkbox checkbox;

  public Application(GUIFactory factory) {
    button = factory.createButton();
    checkbox = factory.createCheckbox();
  }

  public void render() {
    button.render();
    checkbox.render();
  }
}

// Usage
String osName = System.getProperty("os.name").toLowerCase();
GUIFactory factory;

if (osName.contains("win")) {
  factory = new WindowsFactory();
} else {
  factory = new MacFactory();
}

Application app = new Application(factory);
app.render();

// Output on Windows:
// Rendering Windows-style button
// Rendering Windows-style checkbox

// Output on Mac:
// Rendering Mac-style button
// Rendering Mac-style checkbox`
    },
    {
      name: 'Adapter',
      icon: '🔌',
      description: 'Converts interface of class into another interface clients expect. Allows incompatible interfaces to work together. Class adapter (inheritance) vs Object adapter (composition). Used in legacy code integration, third-party library wrapping.',
      diagram: () => (
        <svg viewBox="0 0 700 400" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '20px 0' }}>
          <defs>
            <linearGradient id="adapterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrowAdapter" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#d97706" />
            </marker>
          </defs>

          {/* Client */}
          <rect x="30" y="150" width="140" height="70" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="5" />
          <text x="100" y="175" textAnchor="middle" fill="#d97706" fontSize="16" fontWeight="bold">Client</text>
          <line x1="40" y1="185" x2="160" y2="185" stroke="#f59e0b" strokeWidth="1" />
          <text x="45" y="202" fill="#b45309" fontSize="13">Uses Target</text>
          <text x="45" y="215" fill="#b45309" fontSize="13">Interface</text>

          {/* Target Interface */}
          <rect x="250" y="30" width="180" height="80" fill="url(#adapterGrad)" stroke="#d97706" strokeWidth="2" rx="5" />
          <text x="340" y="55" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">«interface»</text>
          <text x="340" y="75" textAnchor="middle" fill="white" fontSize="17" fontWeight="bold">MediaPlayer</text>
          <line x1="260" y1="85" x2="420" y2="85" stroke="white" strokeWidth="1" />
          <text x="265" y="102" fill="white" fontSize="13">+ play(type, file)</text>

          {/* Adapter */}
          <rect x="250" y="160" width="180" height="100" fill="url(#adapterGrad)" stroke="#d97706" strokeWidth="2" rx="5" />
          <text x="340" y="185" textAnchor="middle" fill="white" fontSize="17" fontWeight="bold">MediaAdapter</text>
          <line x1="260" y1="195" x2="420" y2="195" stroke="white" strokeWidth="1" />
          <text x="265" y="212" fill="white" fontSize="12">- adaptee: AdvancedMediaPlayer</text>
          <line x1="260" y1="220" x2="420" y2="220" stroke="white" strokeWidth="1" />
          <text x="265" y="237" fill="white" fontSize="12">+ play(type, file)</text>
          <text x="270" y="252" fill="#fef3c7" fontSize="11" fontStyle="italic">→ adaptee.playMp4()</text>

          {/* Adaptee */}
          <rect x="500" y="160" width="180" height="100" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="5" />
          <text x="590" y="185" textAnchor="middle" fill="#d97706" fontSize="16" fontWeight="bold">AdvancedMediaPlayer</text>
          <line x1="510" y1="195" x2="670" y2="195" stroke="#f59e0b" strokeWidth="1" />
          <text x="515" y="212" fill="#b45309" fontSize="12">(Incompatible Interface)</text>
          <line x1="510" y1="220" x2="670" y2="220" stroke="#f59e0b" strokeWidth="1" />
          <text x="515" y="237" fill="#b45309" fontSize="12">+ playMp4(file)</text>
          <text x="515" y="252" fill="#b45309" fontSize="12">+ playVlc(file)</text>

          {/* Client uses Target */}
          <path d="M 170 185 L 250 70" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowAdapter)" />
          <text x="185" y="120" fill="#d97706" fontSize="12" fontWeight="bold">uses</text>

          {/* Adapter implements Target */}
          <line x1="340" y1="110" x2="340" y2="160" stroke="#d97706" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowAdapter)" />

          {/* Adapter wraps Adaptee */}
          <path d="M 430 210 L 500 210" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrowAdapter)" />
          <text x="440" y="200" fill="#d97706" fontSize="12" fontWeight="bold">wraps</text>

          {/* Labels */}
          <text x="250" y="320" fill="#92400e" fontSize="14" fontWeight="bold">Adapter Pattern:</text>
          <text x="250" y="340" fill="#78350f" fontSize="12">Converts AdvancedMediaPlayer interface</text>
          <text x="250" y="355" fill="#78350f" fontSize="12">to MediaPlayer interface that client expects</text>
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Target Interface and Adaptee
// ═══════════════════════════════════════════════════════════════════════════

// Target interface - what client expects
interface MediaPlayer {
  void play(String audioType, String fileName);
}

// Adaptee - existing interface that needs adaptation
class AdvancedMediaPlayer {
  public void playMp4(String fileName) {
    System.out.println("Playing mp4 file: " + fileName);
  }

  public void playVlc(String fileName) {
    System.out.println("Playing vlc file: " + fileName);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Adapter Implementation
// ═══════════════════════════════════════════════════════════════════════════

class MediaAdapter implements MediaPlayer {
  private AdvancedMediaPlayer advancedPlayer;

  public MediaAdapter(String audioType) {
    advancedPlayer = new AdvancedMediaPlayer();
  }

  @Override
  public void play(String audioType, String fileName) {
    if (audioType.equalsIgnoreCase("mp4")) {
      advancedPlayer.playMp4(fileName);
    } else if (audioType.equalsIgnoreCase("vlc")) {
      advancedPlayer.playVlc(fileName);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Enhanced MediaPlayer with Adapter
// ═══════════════════════════════════════════════════════════════════════════

class AudioPlayer implements MediaPlayer {
  private MediaAdapter adapter;

  @Override
  public void play(String audioType, String fileName) {
    // Built-in support for mp3
    if (audioType.equalsIgnoreCase("mp3")) {
      System.out.println("Playing mp3 file: " + fileName);
    }
    // Use adapter for other formats
    else if (audioType.equalsIgnoreCase("mp4") ||
             audioType.equalsIgnoreCase("vlc")) {
      adapter = new MediaAdapter(audioType);
      adapter.play(audioType, fileName);
    } else {
      System.out.println("Invalid media type: " + audioType);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Usage and Real-World Examples
// ═══════════════════════════════════════════════════════════════════════════

// Usage
AudioPlayer player = new AudioPlayer();
player.play("mp3", "song.mp3");    // Output: Playing mp3 file: song.mp3
player.play("mp4", "video.mp4");   // Output: Playing mp4 file: video.mp4
player.play("vlc", "movie.vlc");   // Output: Playing vlc file: movie.vlc
player.play("avi", "clip.avi");    // Output: Invalid media type: avi

// Real-world JDK examples:
// InputStreamReader adapts InputStream to Reader
InputStreamReader reader = new InputStreamReader(System.in);

// Arrays.asList() adapts array to List
List<String> list = Arrays.asList("one", "two", "three");

// Collections.enumeration() adapts Iterator to Enumeration
Enumeration<String> enumeration = Collections.enumeration(list);`
    },
    {
      name: 'Decorator',
      icon: '🎨',
      description: 'Attaches additional responsibilities to object dynamically. Flexible alternative to subclassing. Wraps objects in decorator classes. Chain multiple decorators. Used in I/O streams (BufferedReader, InputStreamReader).',
      diagram: () => (
        <svg viewBox="0 0 750 450" style={{ width: '100%', maxWidth: '750px', height: 'auto', margin: '20px 0' }}>
          <defs>
            <linearGradient id="decoratorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrowDecorator" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#059669" />
            </marker>
          </defs>

          {/* Component Interface */}
          <rect x="280" y="20" width="190" height="80" fill="url(#decoratorGrad)" stroke="#059669" strokeWidth="2" rx="5" />
          <text x="375" y="45" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">«interface»</text>
          <text x="375" y="65" textAnchor="middle" fill="white" fontSize="17" fontWeight="bold">Coffee</text>
          <line x1="290" y1="75" x2="460" y2="75" stroke="white" strokeWidth="1" />
          <text x="295" y="92" fill="white" fontSize="12">+ getDescription()</text>

          {/* Concrete Component */}
          <rect x="80" y="170" width="160" height="70" fill="#d1fae5" stroke="#10b981" strokeWidth="2" rx="5" />
          <text x="160" y="195" textAnchor="middle" fill="#059669" fontSize="16" fontWeight="bold">SimpleCoffee</text>
          <line x1="90" y1="205" x2="230" y2="205" stroke="#10b981" strokeWidth="1" />
          <text x="95" y="222" fill="#047857" fontSize="12">+ getDescription()</text>
          <text x="95" y="235" fill="#047857" fontSize="11">"Simple coffee"</text>

          {/* Abstract Decorator */}
          <rect x="310" y="170" width="130" height="90" fill="url(#decoratorGrad)" stroke="#059669" strokeWidth="2" rx="5" />
          <text x="375" y="195" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">«abstract»</text>
          <text x="375" y="212" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">Decorator</text>
          <line x1="320" y1="222" x2="430" y2="222" stroke="white" strokeWidth="1" />
          <text x="320" y="237" fill="white" fontSize="11">- coffee: Coffee</text>
          <line x1="320" y1="242" x2="430" y2="242" stroke="white" strokeWidth="1" />
          <text x="320" y="256" fill="white" fontSize="11">+ getDescription()</text>

          {/* Concrete Decorators */}
          <rect x="490" y="300" width="120" height="65" fill="#d1fae5" stroke="#10b981" strokeWidth="2" rx="5" />
          <text x="550" y="322" textAnchor="middle" fill="#059669" fontSize="14" fontWeight="bold">MilkDecorator</text>
          <line x1="500" y1="330" x2="600" y2="330" stroke="#10b981" strokeWidth="1" />
          <text x="505" y="345" fill="#047857" fontSize="11">+ getDescription()</text>
          <text x="505" y="358" fill="#047857" fontSize="10">+ " + Milk"</text>

          <rect x="630" y="300" width="110" height="65" fill="#d1fae5" stroke="#10b981" strokeWidth="2" rx="5" />
          <text x="685" y="322" textAnchor="middle" fill="#059669" fontSize="14" fontWeight="bold">SugarDecorator</text>
          <line x1="640" y1="330" x2="730" y2="330" stroke="#10b981" strokeWidth="1" />
          <text x="645" y="345" fill="#047857" fontSize="11">+ getDescription()</text>
          <text x="645" y="358" fill="#047857" fontSize="10">+ " + Sugar"</text>

          {/* Implements arrows */}
          <line x1="160" y1="170" x2="320" y2="100" stroke="#059669" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowDecorator)" />
          <line x1="375" y1="100" x2="375" y2="170" stroke="#059669" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowDecorator)" />

          {/* Decorator extends arrows */}
          <line x1="550" y1="300" x2="400" y2="260" stroke="#059669" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowDecorator)" />
          <line x1="685" y1="300" x2="420" y2="260" stroke="#059669" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowDecorator)" />

          {/* Has-a composition */}
          <path d="M 310 215 L 240 205" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowDecorator)" />
          <text x="255" y="200" fill="#059669" fontSize="11" fontWeight="bold">wraps</text>

          {/* Wrapping Example */}
          <rect x="50" y="350" width="380" height="80" fill="#f0fdf4" stroke="#10b981" strokeWidth="2" rx="5" strokeDasharray="5,5" />
          <text x="60" y="370" fill="#047857" fontSize="13" fontWeight="bold">Wrapping Example:</text>
          <text x="60" y="388" fill="#065f46" fontSize="12">Coffee c = new SimpleCoffee();</text>
          <text x="60" y="403" fill="#065f46" fontSize="12">c = new MilkDecorator(c);</text>
          <text x="60" y="418" fill="#065f46" fontSize="12">c = new SugarDecorator(c);</text>

          <text x="240" y="370" fill="#047857" fontSize="13" fontWeight="bold">Result:</text>
          <text x="240" y="388" fill="#065f46" fontSize="12">"Simple coffee"</text>
          <text x="240" y="403" fill="#065f46" fontSize="12">"Simple coffee + Milk"</text>
          <text x="240" y="418" fill="#065f46" fontSize="12">"... + Milk + Sugar"</text>
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Component Interface and Concrete Component
// ═══════════════════════════════════════════════════════════════════════════

// Component interface
interface Coffee {
  String getDescription();
  double getCost();
}

// Concrete component
class SimpleCoffee implements Coffee {
  @Override
  public String getDescription() {
    return "Simple coffee";
  }

  @Override
  public double getCost() {
    return 2.0;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Abstract Decorator
// ═══════════════════════════════════════════════════════════════════════════

abstract class CoffeeDecorator implements Coffee {
  protected Coffee decoratedCoffee;

  public CoffeeDecorator(Coffee coffee) {
    this.decoratedCoffee = coffee;
  }

  @Override
  public String getDescription() {
    return decoratedCoffee.getDescription();
  }

  @Override
  public double getCost() {
    return decoratedCoffee.getCost();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Concrete Decorators
// ═══════════════════════════════════════════════════════════════════════════

class MilkDecorator extends CoffeeDecorator {
  public MilkDecorator(Coffee coffee) {
    super(coffee);
  }

  @Override
  public String getDescription() {
    return decoratedCoffee.getDescription() + ", milk";
  }

  @Override
  public double getCost() {
    return decoratedCoffee.getCost() + 0.5;
  }
}

class SugarDecorator extends CoffeeDecorator {
  public SugarDecorator(Coffee coffee) {
    super(coffee);
  }

  @Override
  public String getDescription() {
    return decoratedCoffee.getDescription() + ", sugar";
  }

  @Override
  public double getCost() {
    return decoratedCoffee.getCost() + 0.2;
  }
}

class WhipDecorator extends CoffeeDecorator {
  public WhipDecorator(Coffee coffee) {
    super(coffee);
  }

  @Override
  public String getDescription() {
    return decoratedCoffee.getDescription() + ", whip";
  }

  @Override
  public double getCost() {
    return decoratedCoffee.getCost() + 0.7;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Usage and Chaining Decorators
// ═══════════════════════════════════════════════════════════════════════════

// Usage - Chain decorators
Coffee coffee = new SimpleCoffee();
System.out.println(coffee.getDescription() + " $" + coffee.getCost());
// Output: Simple coffee $2.0

Coffee milkCoffee = new MilkDecorator(coffee);
System.out.println(milkCoffee.getDescription() + " $" + milkCoffee.getCost());
// Output: Simple coffee, milk $2.5

Coffee fancyCoffee = new WhipDecorator(
  new SugarDecorator(
    new MilkDecorator(
      new SimpleCoffee()
    )
  )
);
System.out.println(fancyCoffee.getDescription() + " $" + fancyCoffee.getCost());
// Output: Simple coffee, milk, sugar, whip $3.4

// Real-world JDK example - I/O Streams
BufferedReader reader = new BufferedReader(
  new InputStreamReader(
    new FileInputStream("file.txt")
  )
);`
    },
    {
      name: 'Facade',
      icon: '🎭',
      description: 'Provides simplified interface to complex subsystem. Hides complexity from clients. Decouples client from subsystem components. Used in library APIs, framework integration. Makes subsystem easier to use.',
      diagram: () => (
        <svg viewBox="0 0 700 420" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '20px 0' }}>
          <defs>
            <linearGradient id="facadeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrowFacade" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#2563eb" />
            </marker>
          </defs>

          {/* Client */}
          <rect x="30" y="180" width="120" height="60" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="5" />
          <text x="90" y="205" textAnchor="middle" fill="#2563eb" fontSize="16" fontWeight="bold">Client</text>
          <text x="90" y="225" textAnchor="middle" fill="#1e40af" fontSize="12">Simple API</text>

          {/* Facade */}
          <rect x="240" y="150" width="180" height="120" fill="url(#facadeGrad)" stroke="#2563eb" strokeWidth="2" rx="5" />
          <text x="330" y="180" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">ComputerFacade</text>
          <line x1="250" y1="190" x2="410" y2="190" stroke="white" strokeWidth="1" />
          <text x="255" y="207" fill="white" fontSize="13">- cpu: CPU</text>
          <text x="255" y="222" fill="white" fontSize="13">- memory: Memory</text>
          <text x="255" y="237" fill="white" fontSize="13">- hardDrive: HardDrive</text>
          <line x1="250" y1="243" x2="410" y2="243" stroke="white" strokeWidth="1" />
          <text x="255" y="260" fill="white" fontSize="13">+ start()</text>

          {/* Complex Subsystem */}
          <rect x="500" y="40" width="180" height="350" fill="#f0f9ff" stroke="#3b82f6" strokeWidth="2" rx="5" strokeDasharray="5,5" />
          <text x="590" y="30" textAnchor="middle" fill="#1e40af" fontSize="14" fontWeight="bold">Complex Subsystem</text>

          {/* CPU */}
          <rect x="520" y="60" width="140" height="80" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="5" />
          <text x="590" y="85" textAnchor="middle" fill="#2563eb" fontSize="15" fontWeight="bold">CPU</text>
          <line x1="530" y1="95" x2="650" y2="95" stroke="#3b82f6" strokeWidth="1" />
          <text x="535" y="110" fill="#1e40af" fontSize="11">+ freeze()</text>
          <text x="535" y="124" fill="#1e40af" fontSize="11">+ jump(position)</text>
          <text x="535" y="137" fill="#1e40af" fontSize="11">+ execute()</text>

          {/* Memory */}
          <rect x="520" y="160" width="140" height="65" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="5" />
          <text x="590" y="183" textAnchor="middle" fill="#2563eb" fontSize="15" fontWeight="bold">Memory</text>
          <line x1="530" y1="193" x2="650" y2="193" stroke="#3b82f6" strokeWidth="1" />
          <text x="535" y="207" fill="#1e40af" fontSize="11">+ load(pos, data)</text>
          <text x="535" y="220" fill="#1e40af" fontSize="11">+ read()</text>

          {/* HardDrive */}
          <rect x="520" y="245" width="140" height="65" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="5" />
          <text x="590" y="268" textAnchor="middle" fill="#2563eb" fontSize="15" fontWeight="bold">HardDrive</text>
          <line x1="530" y1="278" x2="650" y2="278" stroke="#3b82f6" strokeWidth="1" />
          <text x="535" y="292" fill="#1e40af" fontSize="11">+ read(lba, size)</text>
          <text x="535" y="305" fill="#1e40af" fontSize="11">+ write()</text>

          {/* Graphics */}
          <rect x="520" y="330" width="140" height="45" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="5" />
          <text x="590" y="350" textAnchor="middle" fill="#2563eb" fontSize="15" fontWeight="bold">Graphics</text>
          <text x="535" y="368" fill="#1e40af" fontSize="11">+ render()</text>

          {/* Client uses Facade */}
          <path d="M 150 210 L 240 210" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowFacade)" />
          <text x="165" y="200" fill="#2563eb" fontSize="12" fontWeight="bold">uses</text>

          {/* Facade coordinates subsystems */}
          <path d="M 420 180 L 520 100" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowFacade)" />
          <path d="M 420 200 L 520 192" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowFacade)" />
          <path d="M 420 220 L 520 277" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowFacade)" />
          <path d="M 420 240 L 520 352" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowFacade)" />

          {/* Label */}
          <text x="30" y="350" fill="#1e3a8a" fontSize="13" fontWeight="bold">Benefit:</text>
          <text x="30" y="368" fill="#1e40af" fontSize="12">Client calls one simple method: start()</text>
          <text x="30" y="384" fill="#1e40af" fontSize="12">Facade coordinates all complex subsystems</text>
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Complex Subsystem Classes
// ═══════════════════════════════════════════════════════════════════════════

// Complex subsystem components
class CPU {
  public void freeze() {
    System.out.println("CPU: Freezing processor");
  }

  public void jump(long position) {
    System.out.println("CPU: Jumping to position " + position);
  }

  public void execute() {
    System.out.println("CPU: Executing instructions");
  }
}

class Memory {
  public void load(long position, byte[] data) {
    System.out.println("Memory: Loading data at position " + position);
  }
}

class HardDrive {
  public byte[] read(long lba, int size) {
    System.out.println("HardDrive: Reading " + size + " bytes from sector " + lba);
    return new byte[size];
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Facade Class - Simplified Interface
// ═══════════════════════════════════════════════════════════════════════════

class ComputerFacade {
  private CPU cpu;
  private Memory memory;
  private HardDrive hardDrive;

  public ComputerFacade() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
  }

  // Simplified method that coordinates subsystems
  public void start() {
    System.out.println("Starting computer...");
    cpu.freeze();
    memory.load(0, hardDrive.read(0, 1024));
    cpu.jump(0);
    cpu.execute();
    System.out.println("Computer started successfully!");
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Banking System Facade Example
// ═══════════════════════════════════════════════════════════════════════════

// Subsystems
class Account {
  public void debit(double amount) {
    System.out.println("Account: Debiting $" + amount);
  }
  public void credit(double amount) {
    System.out.println("Account: Crediting $" + amount);
  }
}

class SecurityCheck {
  public boolean validate(String pin) {
    System.out.println("SecurityCheck: Validating PIN");
    return true;
  }
}

class LedgerService {
  public void updateLedger(String transaction) {
    System.out.println("LedgerService: Recording transaction - " + transaction);
  }
}

// Facade
class BankingFacade {
  private Account account;
  private SecurityCheck security;
  private LedgerService ledger;

  public BankingFacade() {
    this.account = new Account();
    this.security = new SecurityCheck();
    this.ledger = new LedgerService();
  }

  public void withdraw(String pin, double amount) {
    if (security.validate(pin)) {
      account.debit(amount);
      ledger.updateLedger("Withdrawal: $" + amount);
      System.out.println("Withdrawal successful");
    }
  }

  public void deposit(double amount) {
    account.credit(amount);
    ledger.updateLedger("Deposit: $" + amount);
    System.out.println("Deposit successful");
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Usage Examples
// ═══════════════════════════════════════════════════════════════════════════

// Without facade - complex
CPU cpu = new CPU();
Memory memory = new Memory();
HardDrive hardDrive = new HardDrive();
cpu.freeze();
memory.load(0, hardDrive.read(0, 1024));
cpu.jump(0);
cpu.execute();

// With facade - simple
ComputerFacade computer = new ComputerFacade();
computer.start();

// Banking facade usage
BankingFacade bank = new BankingFacade();
bank.deposit(1000);
bank.withdraw("1234", 500);

// Output:
// Starting computer...
// CPU: Freezing processor
// HardDrive: Reading 1024 bytes from sector 0
// Memory: Loading data at position 0
// CPU: Jumping to position 0
// CPU: Executing instructions
// Computer started successfully!`
    },
    {
      name: 'Proxy',
      icon: '🛡️',
      description: 'Provides placeholder/surrogate for another object to control access. Virtual proxy (lazy loading), Protection proxy (access control), Remote proxy (remote objects), Cache proxy. Used in ORM frameworks, security layers, lazy initialization.',
      diagram: () => (
        <svg viewBox="0 0 700 380" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '20px 0' }}>
          <defs>
            <linearGradient id="proxyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrowProxy" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#dc2626" />
            </marker>
          </defs>

          {/* Subject Interface */}
          <rect x="280" y="20" width="150" height="70" fill="url(#proxyGrad)" stroke="#dc2626" strokeWidth="2" rx="5" />
          <text x="355" y="45" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">«interface»</text>
          <text x="355" y="65" textAnchor="middle" fill="white" fontSize="17" fontWeight="bold">Image</text>
          <text x="290" y="85" fill="white" fontSize="13">+ display()</text>

          {/* Proxy */}
          <rect x="100" y="170" width="180" height="110" fill="url(#proxyGrad)" stroke="#dc2626" strokeWidth="2" rx="5" />
          <text x="190" y="195" textAnchor="middle" fill="white" fontSize="17" fontWeight="bold">ImageProxy</text>
          <line x1="110" y1="205" x2="270" y2="205" stroke="white" strokeWidth="1" />
          <text x="115" y="222" fill="white" fontSize="12">- filename: String</text>
          <text x="115" y="237" fill="white" fontSize="12">- realImage: RealImage</text>
          <line x1="110" y1="243" x2="270" y2="243" stroke="white" strokeWidth="1" />
          <text x="115" y="260" fill="white" fontSize="12">+ display()</text>
          <text x="120" y="274" fill="#fee2e2" fontSize="11" fontStyle="italic">Lazy loading control</text>

          {/* Real Subject */}
          <rect x="430" y="170" width="180" height="110" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="5" />
          <text x="520" y="195" textAnchor="middle" fill="#dc2626" fontSize="17" fontWeight="bold">RealImage</text>
          <line x1="440" y1="205" x2="600" y2="205" stroke="#ef4444" strokeWidth="1" />
          <text x="445" y="222" fill="#b91c1c" fontSize="12">- filename: String</text>
          <line x1="440" y1="228" x2="600" y2="228" stroke="#ef4444" strokeWidth="1" />
          <text x="445" y="245" fill="#b91c1c" fontSize="12">- loadFromDisk()</text>
          <text x="445" y="260" fill="#b91c1c" fontSize="12">+ display()</text>
          <text x="450" y="274" fill="#991b1b" fontSize="11" fontStyle="italic">Expensive to create</text>

          {/* Client */}
          <rect x="30" y="40" width="130" height="60" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="5" />
          <text x="95" y="65" textAnchor="middle" fill="#dc2626" fontSize="16" fontWeight="bold">Client</text>
          <text x="95" y="85" textAnchor="middle" fill="#b91c1c" fontSize="11">Uses Image</text>

          {/* Implements arrows */}
          <line x1="190" y1="170" x2="310" y2="90" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowProxy)" />
          <line x1="520" y1="170" x2="400" y2="90" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowProxy)" />

          {/* Client uses Image */}
          <path d="M 160 70 L 280 55" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowProxy)" />
          <text x="195" y="60" fill="#dc2626" fontSize="11" fontWeight="bold">uses</text>

          {/* Proxy delegates to RealSubject */}
          <path d="M 280 225 L 430 225" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrowProxy)" />
          <text x="320" y="215" fill="#dc2626" fontSize="12" fontWeight="bold">delegates to</text>

          {/* Flow diagram */}
          <rect x="50" y="320" width="600" height="50" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" rx="5" strokeDasharray="5,5" />
          <text x="60" y="340" fill="#991b1b" fontSize="13" fontWeight="bold">Flow:</text>
          <text x="60" y="357" fill="#7f1d1d" fontSize="12">1. Client → Proxy.display()  2. Proxy checks if realImage exists  3. If not, create RealImage  4. Delegate to realImage.display()</text>
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Subject Interface and Real Subject
// ═══════════════════════════════════════════════════════════════════════════

// Subject interface
interface Image {
  void display();
}

// Real subject - expensive to create
class RealImage implements Image {
  private String filename;

  public RealImage(String filename) {
    this.filename = filename;
    loadFromDisk();
  }

  private void loadFromDisk() {
    System.out.println("Loading image: " + filename);
  }

  @Override
  public void display() {
    System.out.println("Displaying image: " + filename);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Virtual Proxy - Lazy Loading
// ═══════════════════════════════════════════════════════════════════════════

class ImageProxy implements Image {
  private String filename;
  private RealImage realImage;

  public ImageProxy(String filename) {
    this.filename = filename;
  }

  @Override
  public void display() {
    // Lazy initialization - create only when needed
    if (realImage == null) {
      realImage = new RealImage(filename);
    }
    realImage.display();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Protection Proxy - Access Control
// ═══════════════════════════════════════════════════════════════════════════

interface BankAccount {
  void withdraw(double amount);
  double getBalance();
}

class RealBankAccount implements BankAccount {
  private double balance = 1000.0;

  @Override
  public void withdraw(double amount) {
    balance -= amount;
    System.out.println("Withdrew $" + amount + ". Balance: $" + balance);
  }

  @Override
  public double getBalance() {
    return balance;
  }
}

class ProtectedBankAccount implements BankAccount {
  private RealBankAccount realAccount;
  private String userRole;

  public ProtectedBankAccount(String userRole) {
    this.realAccount = new RealBankAccount();
    this.userRole = userRole;
  }

  @Override
  public void withdraw(double amount) {
    if (userRole.equals("OWNER")) {
      realAccount.withdraw(amount);
    } else {
      System.out.println("Access denied: Insufficient privileges");
    }
  }

  @Override
  public double getBalance() {
    if (userRole.equals("OWNER") || userRole.equals("VIEWER")) {
      return realAccount.getBalance();
    } else {
      System.out.println("Access denied");
      return 0.0;
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Caching Proxy
// ═══════════════════════════════════════════════════════════════════════════

interface DataService {
  String getData(String key);
}

class DatabaseService implements DataService {
  @Override
  public String getData(String key) {
    System.out.println("Fetching data from database for key: " + key);
    return "Data for " + key;
  }
}

class CachingProxy implements DataService {
  private DatabaseService dbService;
  private Map<String, String> cache;

  public CachingProxy() {
    this.dbService = new DatabaseService();
    this.cache = new HashMap<>();
  }

  @Override
  public String getData(String key) {
    if (cache.containsKey(key)) {
      System.out.println("Returning cached data for key: " + key);
      return cache.get(key);
    }

    String data = dbService.getData(key);
    cache.put(key, data);
    return data;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Usage Examples
// ═══════════════════════════════════════════════════════════════════════════

// Virtual proxy - lazy loading
Image image = new ImageProxy("photo.jpg");
// Image not loaded yet
image.display();  // Now image is loaded and displayed
image.display();  // Image already loaded, just displayed

// Protection proxy
BankAccount ownerAccount = new ProtectedBankAccount("OWNER");
ownerAccount.withdraw(100);  // Success

BankAccount guestAccount = new ProtectedBankAccount("GUEST");
guestAccount.withdraw(100);  // Access denied

// Caching proxy
DataService service = new CachingProxy();
service.getData("user123");  // Fetches from database
service.getData("user123");  // Returns from cache`
    },
    {
      name: 'Observer',
      icon: '👁️',
      description: 'Defines one-to-many dependency between objects. When one object changes state, all dependents notified automatically. Publisher-Subscriber model. Used in event handling systems, MVC architecture, reactive programming.',
      diagram: () => (
        <svg viewBox="0 0 700 400" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '2rem auto', display: 'block' }}>
          <defs>
            <linearGradient id="observerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrowObserver" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#8b5cf6" />
            </marker>
          </defs>

          <text x="350" y="30" fontSize="18" fontWeight="bold" fill="#8b5cf6" textAnchor="middle">Observer Pattern</text>

          {/* Subject */}
          <rect x="250" y="70" width="200" height="100" rx="10" fill="url(#observerGrad)" stroke="#7c3aed" strokeWidth="2" />
          <text x="350" y="95" fontSize="15" fontWeight="bold" fill="white" textAnchor="middle">Subject</text>
          <line x1="260" y1="105" x2="440" y2="105" stroke="white" strokeWidth="1" />
          <text x="350" y="125" fontSize="11" fill="white" textAnchor="middle">+ attach(Observer)</text>
          <text x="350" y="142" fontSize="11" fill="white" textAnchor="middle">+ detach(Observer)</text>
          <text x="350" y="159" fontSize="11" fill="white" textAnchor="middle">+ notify()</text>

          {/* Observers */}
          <rect x="80" y="250" width="140" height="80" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
          <text x="150" y="275" fontSize="14" fontWeight="bold" fill="#6d28d9" textAnchor="middle">Observer A</text>
          <line x1="90" y1="285" x2="210" y2="285" stroke="#8b5cf6" strokeWidth="1" />
          <text x="150" y="305" fontSize="11" fill="#6d28d9" textAnchor="middle">+ update()</text>

          <rect x="280" y="250" width="140" height="80" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
          <text x="350" y="275" fontSize="14" fontWeight="bold" fill="#6d28d9" textAnchor="middle">Observer B</text>
          <line x1="290" y1="285" x2="410" y2="285" stroke="#8b5cf6" strokeWidth="1" />
          <text x="350" y="305" fontSize="11" fill="#6d28d9" textAnchor="middle">+ update()</text>

          <rect x="480" y="250" width="140" height="80" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
          <text x="550" y="275" fontSize="14" fontWeight="bold" fill="#6d28d9" textAnchor="middle">Observer C</text>
          <line x1="490" y1="285" x2="610" y2="285" stroke="#8b5cf6" strokeWidth="1" />
          <text x="550" y="305" fontSize="11" fill="#6d28d9" textAnchor="middle">+ update()</text>

          {/* Notification arrows */}
          <line x1="150" y1="250" x2="300" y2="170" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrowObserver)" strokeDasharray="5,3" />
          <line x1="350" y1="250" x2="350" y2="170" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrowObserver)" strokeDasharray="5,3" />
          <line x1="550" y1="250" x2="400" y2="170" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrowObserver)" strokeDasharray="5,3" />

          <text x="200" y="210" fontSize="11" fill="#ef4444" fontWeight="600">notify()</text>
          <text x="420" y="210" fontSize="11" fill="#ef4444" fontWeight="600">notify()</text>

          {/* Note */}
          <rect x="200" y="355" width="300" height="35" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="350" y="377" fontSize="12" fill="#92400e" textAnchor="middle">When Subject changes, all Observers are notified</text>
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Observer Interface and Subject
// ═══════════════════════════════════════════════════════════════════════════

// Observer interface
interface Observer {
  void update(String message);
}

// Subject (Observable)
class Subject {
  private List<Observer> observers = new ArrayList<>();
  private String state;

  public void attach(Observer observer) {
    observers.add(observer);
  }

  public void detach(Observer observer) {
    observers.remove(observer);
  }

  public void setState(String state) {
    this.state = state;
    notifyAllObservers();
  }

  private void notifyAllObservers() {
    for (Observer observer : observers) {
      observer.update(state);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Concrete Observers
// ═══════════════════════════════════════════════════════════════════════════

class EmailNotifier implements Observer {
  private String email;

  public EmailNotifier(String email) {
    this.email = email;
  }

  @Override
  public void update(String message) {
    System.out.println("Email to " + email + ": " + message);
  }
}

class SMSNotifier implements Observer {
  private String phoneNumber;

  public SMSNotifier(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  @Override
  public void update(String message) {
    System.out.println("SMS to " + phoneNumber + ": " + message);
  }
}

class PushNotifier implements Observer {
  private String deviceId;

  public PushNotifier(String deviceId) {
    this.deviceId = deviceId;
  }

  @Override
  public void update(String message) {
    System.out.println("Push to device " + deviceId + ": " + message);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Real-World Example - Stock Market
// ═══════════════════════════════════════════════════════════════════════════

class Stock extends Subject {
  private String symbol;
  private double price;

  public Stock(String symbol, double price) {
    this.symbol = symbol;
    this.price = price;
  }

  public void setPrice(double price) {
    this.price = price;
    setState(symbol + " price changed to $" + price);
  }

  public double getPrice() {
    return price;
  }
}

class StockInvestor implements Observer {
  private String name;

  public StockInvestor(String name) {
    this.name = name;
  }

  @Override
  public void update(String message) {
    System.out.println("Investor " + name + " notified: " + message);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Usage and Benefits
// ═══════════════════════════════════════════════════════════════════════════

// Basic usage
Subject newsPublisher = new Subject();

Observer emailObserver = new EmailNotifier("user@example.com");
Observer smsObserver = new SMSNotifier("555-1234");
Observer pushObserver = new PushNotifier("device123");

newsPublisher.attach(emailObserver);
newsPublisher.attach(smsObserver);
newsPublisher.attach(pushObserver);

newsPublisher.setState("Breaking News: Market reaches all-time high!");
// Output:
// Email to user@example.com: Breaking News: Market reaches all-time high!
// SMS to 555-1234: Breaking News: Market reaches all-time high!
// Push to device123: Breaking News: Market reaches all-time high!

// Stock market example
Stock appleStock = new Stock("AAPL", 150.0);

Observer investor1 = new StockInvestor("John");
Observer investor2 = new StockInvestor("Jane");

appleStock.attach(investor1);
appleStock.attach(investor2);

appleStock.setPrice(155.0);
// Output:
// Investor John notified: AAPL price changed to $155.0
// Investor Jane notified: AAPL price changed to $155.0

appleStock.detach(investor1);
appleStock.setPrice(160.0);
// Output:
// Investor Jane notified: AAPL price changed to $160.0

// JDK example
PropertyChangeSupport support = new PropertyChangeSupport(this);
support.addPropertyChangeListener(evt -> {
  System.out.println("Property changed: " + evt.getPropertyName());
});`
    },
    {
      name: 'Strategy',
      icon: '🎯',
      description: 'Defines family of algorithms, encapsulates each one, makes them interchangeable. Algorithm varies independently from clients. Eliminates conditional statements. Used in sorting algorithms, payment processing, compression algorithms.',
      diagram: () => (
        <svg viewBox="0 0 650 380" style={{ width: '100%', maxWidth: '650px', height: 'auto', margin: '2rem auto', display: 'block' }}>
          <defs>
            <linearGradient id="strategyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#db2777', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrowStrategy" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#ec4899" />
            </marker>
          </defs>

          <text x="325" y="30" fontSize="18" fontWeight="bold" fill="#ec4899" textAnchor="middle">Strategy Pattern</text>

          {/* Context */}
          <rect x="40" y="80" width="140" height="90" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
          <text x="110" y="105" fontSize="14" fontWeight="bold" fill="#92400e" textAnchor="middle">Context</text>
          <line x1="50" y1="115" x2="170" y2="115" stroke="#f59e0b" strokeWidth="1" />
          <text x="110" y="135" fontSize="11" fill="#92400e" textAnchor="middle">- strategy</text>
          <text x="110" y="153" fontSize="11" fill="#92400e" textAnchor="middle">+ setStrategy()</text>
          <text x="110" y="167" fontSize="11" fill="#92400e" textAnchor="middle">+ execute()</text>

          {/* Strategy Interface */}
          <rect x="260" y="80" width="150" height="70" rx="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
          <text x="335" y="105" fontSize="13" fontWeight="bold" fill="#9f1239" textAnchor="middle">«interface»</text>
          <text x="335" y="125" fontSize="14" fontWeight="bold" fill="#9f1239" textAnchor="middle">Strategy</text>
          <text x="335" y="143" fontSize="11" fill="#9f1239" textAnchor="middle">+ execute()</text>

          {/* Concrete Strategies */}
          <rect x="120" y="240" width="130" height="70" rx="8" fill="url(#strategyGrad)" stroke="#db2777" strokeWidth="2" />
          <text x="185" y="265" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">StrategyA</text>
          <line x1="130" y1="275" x2="240" y2="275" stroke="white" strokeWidth="1" />
          <text x="185" y="295" fontSize="11" fill="white" textAnchor="middle">+ execute()</text>

          <rect x="270" y="240" width="130" height="70" rx="8" fill="url(#strategyGrad)" stroke="#db2777" strokeWidth="2" />
          <text x="335" y="265" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">StrategyB</text>
          <line x1="280" y1="275" x2="390" y2="275" stroke="white" strokeWidth="1" />
          <text x="335" y="295" fontSize="11" fill="white" textAnchor="middle">+ execute()</text>

          <rect x="420" y="240" width="130" height="70" rx="8" fill="url(#strategyGrad)" stroke="#db2777" strokeWidth="2" />
          <text x="485" y="265" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">StrategyC</text>
          <line x1="430" y1="275" x2="540" y2="275" stroke="white" strokeWidth="1" />
          <text x="485" y="295" fontSize="11" fill="white" textAnchor="middle">+ execute()</text>

          {/* Relationships */}
          <line x1="180" y1="125" x2="260" y2="125" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowStrategy)" />
          <text x="220" y="115" fontSize="10" fill="#ec4899">uses</text>

          {/* Implements arrows */}
          <line x1="185" y1="240" x2="300" y2="150" stroke="#ec4899" strokeWidth="2" strokeDasharray="5,5" />
          <polygon points="295,155 300,150 305,155" fill="white" stroke="#ec4899" strokeWidth="2" />
          <line x1="335" y1="240" x2="335" y2="150" stroke="#ec4899" strokeWidth="2" strokeDasharray="5,5" />
          <polygon points="330,155 335,150 340,155" fill="white" stroke="#ec4899" strokeWidth="2" />
          <line x1="485" y1="240" x2="370" y2="150" stroke="#ec4899" strokeWidth="2" strokeDasharray="5,5" />
          <polygon points="365,155 370,150 375,155" fill="white" stroke="#ec4899" strokeWidth="2" />

          {/* Note */}
          <rect x="180" y="340" width="290" height="30" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="325" y="360" fontSize="11" fill="#1e40af" textAnchor="middle">Algorithms can be switched at runtime</text>
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Strategy Interface and Concrete Strategies
// ═══════════════════════════════════════════════════════════════════════════

// Strategy interface
interface PaymentStrategy {
  void pay(double amount);
}

// Concrete strategies
class CreditCardStrategy implements PaymentStrategy {
  private String cardNumber;
  private String cvv;

  public CreditCardStrategy(String cardNumber, String cvv) {
    this.cardNumber = cardNumber;
    this.cvv = cvv;
  }

  @Override
  public void pay(double amount) {
    System.out.println("Paid $" + amount + " using Credit Card ending in " +
                      cardNumber.substring(cardNumber.length() - 4));
  }
}

class PayPalStrategy implements PaymentStrategy {
  private String email;

  public PayPalStrategy(String email) {
    this.email = email;
  }

  @Override
  public void pay(double amount) {
    System.out.println("Paid $" + amount + " using PayPal account: " + email);
  }
}

class BitcoinStrategy implements PaymentStrategy {
  private String walletAddress;

  public BitcoinStrategy(String walletAddress) {
    this.walletAddress = walletAddress;
  }

  @Override
  public void pay(double amount) {
    System.out.println("Paid $" + amount + " using Bitcoin wallet: " +
                      walletAddress.substring(0, 8) + "...");
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Context Class
// ═══════════════════════════════════════════════════════════════════════════

class ShoppingCart {
  private List<String> items = new ArrayList<>();
  private double total = 0;
  private PaymentStrategy paymentStrategy;

  public void addItem(String item, double price) {
    items.add(item);
    total += price;
  }

  public void setPaymentStrategy(PaymentStrategy strategy) {
    this.paymentStrategy = strategy;
  }

  public void checkout() {
    if (paymentStrategy == null) {
      System.out.println("Please select a payment method");
      return;
    }
    System.out.println("Items: " + items);
    paymentStrategy.pay(total);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Sorting Strategy Example
// ═══════════════════════════════════════════════════════════════════════════

interface SortStrategy {
  void sort(int[] array);
}

class BubbleSortStrategy implements SortStrategy {
  @Override
  public void sort(int[] array) {
    System.out.println("Sorting using Bubble Sort");
    // Bubble sort implementation
    for (int i = 0; i < array.length - 1; i++) {
      for (int j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          int temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
    }
  }
}

class QuickSortStrategy implements SortStrategy {
  @Override
  public void sort(int[] array) {
    System.out.println("Sorting using Quick Sort");
    quickSort(array, 0, array.length - 1);
  }

  private void quickSort(int[] arr, int low, int high) {
    if (low < high) {
      int pi = partition(arr, low, high);
      quickSort(arr, low, pi - 1);
      quickSort(arr, pi + 1, high);
    }
  }

  private int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
  }
}

class SortContext {
  private SortStrategy strategy;

  public void setStrategy(SortStrategy strategy) {
    this.strategy = strategy;
  }

  public void performSort(int[] array) {
    strategy.sort(array);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Usage Examples
// ═══════════════════════════════════════════════════════════════════════════

// Payment strategy usage
ShoppingCart cart = new ShoppingCart();
cart.addItem("Laptop", 1200.0);
cart.addItem("Mouse", 25.0);

// Pay with credit card
cart.setPaymentStrategy(new CreditCardStrategy("1234-5678-9012-3456", "123"));
cart.checkout();
// Output: Items: [Laptop, Mouse]
// Output: Paid $1225.0 using Credit Card ending in 3456

// Change strategy to PayPal
cart.setPaymentStrategy(new PayPalStrategy("user@example.com"));
cart.checkout();
// Output: Items: [Laptop, Mouse]
// Output: Paid $1225.0 using PayPal account: user@example.com

// Sorting strategy usage
SortContext sorter = new SortContext();
int[] data = {64, 34, 25, 12, 22, 11, 90};

sorter.setStrategy(new BubbleSortStrategy());
sorter.performSort(data);  // Output: Sorting using Bubble Sort

sorter.setStrategy(new QuickSortStrategy());
sorter.performSort(data);  // Output: Sorting using Quick Sort`
    },
    {
      name: 'Command',
      icon: '⚡',
      description: 'Encapsulates request as an object. Parameterizes clients with different requests. Queue or log requests. Support undoable operations. Used in GUI actions, transaction systems, macro recording.',
      diagram: () => (
        <svg viewBox="0 0 750 450" style={{ width: '100%', maxWidth: '750px', height: 'auto', margin: '20px 0' }}>
          <defs>
            <linearGradient id="commandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#64748b', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#475569', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrowCommand" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#475569" />
            </marker>
          </defs>

          {/* Command Interface */}
          <rect x="300" y="20" width="150" height="80" fill="url(#commandGrad)" stroke="#475569" strokeWidth="2" rx="5" />
          <text x="375" y="45" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">«interface»</text>
          <text x="375" y="65" textAnchor="middle" fill="white" fontSize="17" fontWeight="bold">Command</text>
          <line x1="310" y1="75" x2="440" y2="75" stroke="white" strokeWidth="1" />
          <text x="315" y="92" fill="white" fontSize="12">+ execute()</text>

          {/* Concrete Commands */}
          <rect x="150" y="160" width="140" height="90" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" rx="5" />
          <text x="220" y="185" textAnchor="middle" fill="#475569" fontSize="15" fontWeight="bold">WriteCommand</text>
          <line x1="160" y1="195" x2="280" y2="195" stroke="#64748b" strokeWidth="1" />
          <text x="165" y="210" fill="#334155" fontSize="11">- receiver: TextEditor</text>
          <text x="165" y="224" fill="#334155" fontSize="11">- content: String</text>
          <line x1="160" y1="230" x2="280" y2="230" stroke="#64748b" strokeWidth="1" />
          <text x="165" y="244" fill="#334155" fontSize="11">+ execute()</text>

          <rect x="310" y="160" width="130" height="90" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" rx="5" />
          <text x="375" y="185" textAnchor="middle" fill="#475569" fontSize="15" fontWeight="bold">CopyCommand</text>
          <line x1="320" y1="195" x2="430" y2="195" stroke="#64748b" strokeWidth="1" />
          <text x="325" y="210" fill="#334155" fontSize="11">- receiver: TextEditor</text>
          <line x1="320" y1="216" x2="430" y2="216" stroke="#64748b" strokeWidth="1" />
          <text x="325" y="230" fill="#334155" fontSize="11">+ execute()</text>
          <text x="325" y="244" fill="#334155" fontSize="11">+ undo()</text>

          <rect x="460" y="160" width="140" height="90" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" rx="5" />
          <text x="530" y="185" textAnchor="middle" fill="#475569" fontSize="15" fontWeight="bold">DeleteCommand</text>
          <line x1="470" y1="195" x2="590" y2="195" stroke="#64748b" strokeWidth="1" />
          <text x="475" y="210" fill="#334155" fontSize="11">- receiver: TextEditor</text>
          <line x1="470" y1="216" x2="590" y2="216" stroke="#64748b" strokeWidth="1" />
          <text x="475" y="230" fill="#334155" fontSize="11">+ execute()</text>
          <text x="475" y="244" fill="#334155" fontSize="11">+ undo()</text>

          {/* Implements arrows */}
          <line x1="220" y1="160" x2="340" y2="100" stroke="#475569" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowCommand)" />
          <line x1="375" y1="100" x2="375" y2="160" stroke="#475569" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowCommand)" />
          <line x1="530" y1="160" x2="410" y2="100" stroke="#475569" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowCommand)" />

          {/* Invoker */}
          <rect x="50" y="180" width="130" height="70" fill="url(#commandGrad)" stroke="#475569" strokeWidth="2" rx="5" />
          <text x="115" y="205" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">Invoker</text>
          <line x1="60" y1="215" x2="170" y2="215" stroke="white" strokeWidth="1" />
          <text x="65" y="230" fill="white" fontSize="11">- command: Command</text>
          <text x="65" y="244" fill="white" fontSize="11">+ executeCommand()</text>

          {/* Receiver */}
          <rect x="550" y="320" width="150" height="90" fill="url(#commandGrad)" stroke="#475569" strokeWidth="2" rx="5" />
          <text x="625" y="345" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">TextEditor</text>
          <text x="560" y="365" fill="white" fontSize="12">(Receiver)</text>
          <line x1="560" y1="372" x2="690" y2="372" stroke="white" strokeWidth="1" />
          <text x="565" y="387" fill="white" fontSize="11">+ write(content)</text>
          <text x="565" y="402" fill="white" fontSize="11">+ delete(length)</text>

          {/* Invoker holds command */}
          <path d="M 150 215 L 310 205" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowCommand)" />
          <text x="210" y="205" fill="#475569" fontSize="11" fontWeight="bold">holds</text>

          {/* Commands call receiver */}
          <path d="M 290 225 L 550 355" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arrowCommand)" />
          <path d="M 440 225 L 550 355" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arrowCommand)" />
          <path d="M 590 250 L 615 320" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arrowCommand)" />
          <text x="450" y="290" fill="#475569" fontSize="11" fontWeight="bold">calls →</text>

          {/* Flow */}
          <rect x="50" y="320" width="450" height="90" fill="#f8fafc" stroke="#64748b" strokeWidth="2" rx="5" strokeDasharray="5,5" />
          <text x="60" y="340" fill="#1e293b" fontSize="13" fontWeight="bold">Command Pattern Flow:</text>
          <text x="60" y="358" fill="#334155" fontSize="11">1. Client creates Command object with Receiver reference</text>
          <text x="60" y="372" fill="#334155" fontSize="11">2. Client passes Command to Invoker</text>
          <text x="60" y="386" fill="#334155" fontSize="11">3. Invoker.executeCommand() calls command.execute()</text>
          <text x="60" y="400" fill="#334155" fontSize="11">4. Command calls appropriate method on Receiver</text>
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Command Interface and Receiver
// ═══════════════════════════════════════════════════════════════════════════

// Command interface
interface Command {
  void execute();
  void undo();
}

// Receiver - Text editor
class TextEditor {
  private StringBuilder text = new StringBuilder();

  public void write(String content) {
    text.append(content);
    System.out.println("Text: " + text);
  }

  public void deleteLast(int length) {
    int start = text.length() - length;
    if (start >= 0) {
      text.delete(start, text.length());
      System.out.println("Text: " + text);
    }
  }

  public String getText() {
    return text.toString();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Concrete Commands
// ═══════════════════════════════════════════════════════════════════════════

class WriteCommand implements Command {
  private TextEditor editor;
  private String content;

  public WriteCommand(TextEditor editor, String content) {
    this.editor = editor;
    this.content = content;
  }

  @Override
  public void execute() {
    editor.write(content);
  }

  @Override
  public void undo() {
    editor.deleteLast(content.length());
  }
}

class DeleteCommand implements Command {
  private TextEditor editor;
  private int length;
  private String deletedText;

  public DeleteCommand(TextEditor editor, int length) {
    this.editor = editor;
    this.length = length;
  }

  @Override
  public void execute() {
    String text = editor.getText();
    int start = text.length() - length;
    if (start >= 0) {
      deletedText = text.substring(start);
      editor.deleteLast(length);
    }
  }

  @Override
  public void undo() {
    if (deletedText != null) {
      editor.write(deletedText);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Invoker with Undo/Redo Support
// ═══════════════════════════════════════════════════════════════════════════

class CommandInvoker {
  private Stack<Command> history = new Stack<>();
  private Stack<Command> redoStack = new Stack<>();

  public void execute(Command command) {
    command.execute();
    history.push(command);
    redoStack.clear();  // Clear redo stack on new command
  }

  public void undo() {
    if (!history.isEmpty()) {
      Command command = history.pop();
      command.undo();
      redoStack.push(command);
    } else {
      System.out.println("Nothing to undo");
    }
  }

  public void redo() {
    if (!redoStack.isEmpty()) {
      Command command = redoStack.pop();
      command.execute();
      history.push(command);
    } else {
      System.out.println("Nothing to redo");
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Smart Home Example
// ═══════════════════════════════════════════════════════════════════════════

class Light {
  private boolean on = false;

  public void turnOn() {
    on = true;
    System.out.println("Light is ON");
  }

  public void turnOff() {
    on = false;
    System.out.println("Light is OFF");
  }
}

class LightOnCommand implements Command {
  private Light light;

  public LightOnCommand(Light light) {
    this.light = light;
  }

  @Override
  public void execute() {
    light.turnOn();
  }

  @Override
  public void undo() {
    light.turnOff();
  }
}

class LightOffCommand implements Command {
  private Light light;

  public LightOffCommand(Light light) {
    this.light = light;
  }

  @Override
  public void execute() {
    light.turnOff();
  }

  @Override
  public void undo() {
    light.turnOn();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Usage Examples
// ═══════════════════════════════════════════════════════════════════════════

// Text editor usage
TextEditor editor = new TextEditor();
CommandInvoker invoker = new CommandInvoker();

invoker.execute(new WriteCommand(editor, "Hello "));
// Output: Text: Hello

invoker.execute(new WriteCommand(editor, "World!"));
// Output: Text: Hello World!

invoker.undo();
// Output: Text: Hello

invoker.redo();
// Output: Text: Hello World!

invoker.execute(new WriteCommand(editor, " How are you?"));
// Output: Text: Hello World! How are you?

invoker.undo();
// Output: Text: Hello World!

// Smart home usage
Light livingRoomLight = new Light();
CommandInvoker remote = new CommandInvoker();

remote.execute(new LightOnCommand(livingRoomLight));
// Output: Light is ON

remote.execute(new LightOffCommand(livingRoomLight));
// Output: Light is OFF

remote.undo();
// Output: Light is ON`
    },
    {
      name: 'Template Method',
      icon: '📋',
      description: 'Defines skeleton of algorithm in base class, letting subclasses override specific steps. Invariant parts in base class, variant parts in subclasses. Hollywood Principle: "Don\'t call us, we\'ll call you". Used in frameworks, abstract classes.',
      diagram: () => (
        <svg viewBox="0 0 700 450" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '20px 0' }}>
          <defs>
            <linearGradient id="templateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#fb923c', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrowTemplate" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#f97316" />
            </marker>
          </defs>

          {/* Abstract Class */}
          <rect x="230" y="30" width="240" height="180" fill="url(#templateGrad)" stroke="#f97316" strokeWidth="2" rx="5" />
          <text x="350" y="55" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">«abstract»</text>
          <text x="350" y="75" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">DataProcessor</text>
          <line x1="240" y1="85" x2="460" y2="85" stroke="white" strokeWidth="1" />
          <text x="245" y="102" fill="white" fontSize="13" fontWeight="bold">+ process() {'{'}</text>
          <text x="255" y="117" fill="#fed7aa" fontSize="11">loadData();</text>
          <text x="255" y="130" fill="#fed7aa" fontSize="11">validateData();</text>
          <text x="255" y="143" fill="#fed7aa" fontSize="11">processData();</text>
          <text x="255" y="156" fill="#fed7aa" fontSize="11">saveData();</text>
          <text x="245" y="170" fill="white" fontSize="13" fontWeight="bold">{'}'}</text>
          <line x1="240" y1="175" x2="460" y2="175" stroke="white" strokeWidth="1" />
          <text x="245" y="190" fill="white" fontSize="11">+ validateData() - concrete</text>
          <text x="245" y="203" fill="#fed7aa" fontSize="11" fontStyle="italic">+ loadData() - abstract</text>

          {/* Concrete Classes */}
          <rect x="80" y="280" width="200" height="100" fill="#ffedd5" stroke="#fb923c" strokeWidth="2" rx="5" />
          <text x="180" y="305" textAnchor="middle" fill="#f97316" fontSize="16" fontWeight="bold">CSVDataProcessor</text>
          <line x1="90" y1="315" x2="270" y2="315" stroke="#fb923c" strokeWidth="1" />
          <text x="95" y="332" fill="#c2410c" fontSize="12">+ loadData()</text>
          <text x="105" y="347" fill="#9a3412" fontSize="11" fontStyle="italic">→ Load from CSV</text>
          <text x="95" y="362" fill="#c2410c" fontSize="12">+ processData()</text>
          <text x="95" y="375" fill="#c2410c" fontSize="12">+ saveData()</text>

          <rect x="320" y="280" width="200" height="100" fill="#ffedd5" stroke="#fb923c" strokeWidth="2" rx="5" />
          <text x="420" y="305" textAnchor="middle" fill="#f97316" fontSize="16" fontWeight="bold">XMLDataProcessor</text>
          <line x1="330" y1="315" x2="510" y2="315" stroke="#fb923c" strokeWidth="1" />
          <text x="335" y="332" fill="#c2410c" fontSize="12">+ loadData()</text>
          <text x="345" y="347" fill="#9a3412" fontSize="11" fontStyle="italic">→ Load from XML</text>
          <text x="335" y="362" fill="#c2410c" fontSize="12">+ processData()</text>
          <text x="335" y="375" fill="#c2410c" fontSize="12">+ saveData()</text>

          <rect x="560" y="280" width="120" height="100" fill="#ffedd5" stroke="#fb923c" strokeWidth="2" rx="5" />
          <text x="620" y="305" textAnchor="middle" fill="#f97316" fontSize="15" fontWeight="bold">JSONData</text>
          <text x="620" y="321" textAnchor="middle" fill="#f97316" fontSize="15" fontWeight="bold">Processor</text>
          <line x1="570" y1="330" x2="670" y2="330" stroke="#fb923c" strokeWidth="1" />
          <text x="575" y="347" fill="#c2410c" fontSize="11">+ loadData()</text>
          <text x="575" y="360" fill="#9a3412" fontSize="10" fontStyle="italic">→ Load JSON</text>
          <text x="575" y="372" fill="#c2410c" fontSize="11">+ processData()</text>

          {/* Inheritance arrows */}
          <line x1="180" y1="280" x2="300" y2="210" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowTemplate)" />
          <line x1="420" y1="280" x2="370" y2="210" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowTemplate)" />
          <line x1="620" y1="280" x2="440" y2="210" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowTemplate)" />

          {/* Algorithm flow */}
          <rect x="50" y="410" width="600" height="30" fill="#fff7ed" stroke="#fb923c" strokeWidth="2" rx="5" strokeDasharray="5,5" />
          <text x="60" y="428" fill="#9a3412" fontSize="12" fontWeight="bold">Template Method defines algorithm structure; Subclasses provide specific implementations</text>
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Abstract Class with Template Method
// ═══════════════════════════════════════════════════════════════════════════

abstract class DataProcessor {
  // Template method - defines algorithm skeleton
  public final void process() {
    loadData();
    validateData();
    processData();
    saveData();
    if (shouldNotify()) {
      sendNotification();
    }
  }

  // Abstract methods - must be implemented by subclasses
  protected abstract void loadData();
  protected abstract void processData();
  protected abstract void saveData();

  // Concrete methods - common implementation
  protected void validateData() {
    System.out.println("Validating data...");
  }

  // Hook method - optional override
  protected boolean shouldNotify() {
    return true;
  }

  protected void sendNotification() {
    System.out.println("Sending notification...");
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Concrete Implementations
// ═══════════════════════════════════════════════════════════════════════════

class CSVDataProcessor extends DataProcessor {
  @Override
  protected void loadData() {
    System.out.println("Loading data from CSV file");
  }

  @Override
  protected void processData() {
    System.out.println("Processing CSV data");
  }

  @Override
  protected void saveData() {
    System.out.println("Saving CSV data to database");
  }
}

class JSONDataProcessor extends DataProcessor {
  @Override
  protected void loadData() {
    System.out.println("Loading data from JSON file");
  }

  @Override
  protected void processData() {
    System.out.println("Processing JSON data");
  }

  @Override
  protected void saveData() {
    System.out.println("Saving JSON data to database");
  }

  @Override
  protected boolean shouldNotify() {
    return false;  // Override hook method
  }
}

class XMLDataProcessor extends DataProcessor {
  @Override
  protected void loadData() {
    System.out.println("Loading data from XML file");
  }

  @Override
  protected void processData() {
    System.out.println("Parsing and processing XML data");
  }

  @Override
  protected void saveData() {
    System.out.println("Saving XML data to database");
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Beverage Example
// ═══════════════════════════════════════════════════════════════════════════

abstract class Beverage {
  // Template method
  final void prepareRecipe() {
    boilWater();
    brew();
    pourInCup();
    if (customerWantsCondiments()) {
      addCondiments();
    }
  }

  abstract void brew();
  abstract void addCondiments();

  void boilWater() {
    System.out.println("Boiling water");
  }

  void pourInCup() {
    System.out.println("Pouring into cup");
  }

  // Hook method
  boolean customerWantsCondiments() {
    return true;
  }
}

class Tea extends Beverage {
  @Override
  void brew() {
    System.out.println("Steeping the tea");
  }

  @Override
  void addCondiments() {
    System.out.println("Adding lemon");
  }
}

class Coffee extends Beverage {
  @Override
  void brew() {
    System.out.println("Dripping coffee through filter");
  }

  @Override
  void addCondiments() {
    System.out.println("Adding sugar and milk");
  }

  @Override
  boolean customerWantsCondiments() {
    return false;  // No condiments
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Usage Examples
// ═══════════════════════════════════════════════════════════════════════════

// Data processor usage
DataProcessor csvProcessor = new CSVDataProcessor();
csvProcessor.process();
// Output:
// Loading data from CSV file
// Validating data...
// Processing CSV data
// Saving CSV data to database
// Sending notification...

System.out.println("---");

DataProcessor jsonProcessor = new JSONDataProcessor();
jsonProcessor.process();
// Output:
// Loading data from JSON file
// Validating data...
// Processing JSON data
// Saving JSON data to database
// (no notification - hook method returned false)

System.out.println("---");

// Beverage usage
Beverage tea = new Tea();
tea.prepareRecipe();
// Output:
// Boiling water
// Steeping the tea
// Pouring into cup
// Adding lemon

System.out.println("---");

Beverage coffee = new Coffee();
coffee.prepareRecipe();
// Output:
// Boiling water
// Dripping coffee through filter
// Pouring into cup
// (no condiments - hook method returned false)`
    },
    {
      name: 'State',
      icon: '🔄',
      description: 'Allows object to alter behavior when internal state changes. Object appears to change its class. Encapsulates state-specific behavior. Eliminates large conditional statements. Used in workflow engines, game character states, TCP connections.',
      diagram: () => (
        <svg viewBox="0 0 700 480" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '20px 0' }}>
          <defs>
            <linearGradient id="stateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#84cc16', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#65a30d', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrowState" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#65a30d" />
            </marker>
          </defs>

          {/* Context */}
          <rect x="280" y="20" width="140" height="80" fill="url(#stateGrad)" stroke="#65a30d" strokeWidth="2" rx="5" />
          <text x="350" y="45" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">VendingMachine</text>
          <text x="290" y="62" fill="white" fontSize="11">(Context)</text>
          <line x1="290" y1="70" x2="410" y2="70" stroke="white" strokeWidth="1" />
          <text x="295" y="85" fill="white" fontSize="11">- currentState</text>
          <text x="295" y="96" fill="white" fontSize="11">+ insertCoin()</text>

          {/* State Interface */}
          <rect x="280" y="140" width="140" height="70" fill="#ecfccb" stroke="#84cc16" strokeWidth="2" rx="5" />
          <text x="350" y="160" textAnchor="middle" fill="#65a30d" fontSize="14" fontWeight="bold">«interface»</text>
          <text x="350" y="178" textAnchor="middle" fill="#65a30d" fontSize="15" fontWeight="bold">State</text>
          <line x1="290" y1="188" x2="410" y2="188" stroke="#84cc16" strokeWidth="1" />
          <text x="295" y="202" fill="#4d7c0f" fontSize="11">+ handle()</text>

          {/* Concrete States */}
          <rect x="50" y="270" width="130" height="70" fill="#ecfccb" stroke="#84cc16" strokeWidth="2" rx="5" />
          <text x="115" y="295" textAnchor="middle" fill="#65a30d" fontSize="14" fontWeight="bold">NoCoinState</text>
          <line x1="60" y1="305" x2="170" y2="305" stroke="#84cc16" strokeWidth="1" />
          <text x="65" y="320" fill="#4d7c0f" fontSize="11">+ insertCoin()</text>
          <text x="70" y="333" fill="#3f6212" fontSize="10" fontStyle="italic">→ HasCoinState</text>

          <rect x="200" y="270" width="130" height="70" fill="#ecfccb" stroke="#84cc16" strokeWidth="2" rx="5" />
          <text x="265" y="295" textAnchor="middle" fill="#65a30d" fontSize="14" fontWeight="bold">HasCoinState</text>
          <line x1="210" y1="305" x2="320" y2="305" stroke="#84cc16" strokeWidth="1" />
          <text x="215" y="320" fill="#4d7c0f" fontSize="11">+ selectProduct()</text>
          <text x="220" y="333" fill="#3f6212" fontSize="10" fontStyle="italic">→ SoldState</text>

          <rect x="350" y="270" width="130" height="70" fill="#ecfccb" stroke="#84cc16" strokeWidth="2" rx="5" />
          <text x="415" y="295" textAnchor="middle" fill="#65a30d" fontSize="14" fontWeight="bold">SoldState</text>
          <line x1="360" y1="305" x2="470" y2="305" stroke="#84cc16" strokeWidth="1" />
          <text x="365" y="320" fill="#4d7c0f" fontSize="11">+ dispense()</text>
          <text x="370" y="333" fill="#3f6212" fontSize="10" fontStyle="italic">→ NoCoinState</text>

          <rect x="500" y="270" width="130" height="70" fill="#ecfccb" stroke="#84cc16" strokeWidth="2" rx="5" />
          <text x="565" y="295" textAnchor="middle" fill="#65a30d" fontSize="14" fontWeight="bold">SoldOutState</text>
          <line x1="510" y1="305" x2="620" y2="305" stroke="#84cc16" strokeWidth="1" />
          <text x="515" y="320" fill="#4d7c0f" fontSize="11">+ insertCoin()</text>
          <text x="520" y="333" fill="#3f6212" fontSize="10" fontStyle="italic">→ Error msg</text>

          {/* Context has State */}
          <path d="M 350 100 L 350 140" stroke="#65a30d" strokeWidth="2" markerEnd="url(#arrowState)" />
          <text x="360" y="125" fill="#65a30d" fontSize="11" fontWeight="bold">has</text>

          {/* Implements arrows */}
          <line x1="115" y1="270" x2="300" y2="210" stroke="#65a30d" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowState)" />
          <line x1="265" y1="270" x2="330" y2="210" stroke="#65a30d" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowState)" />
          <line x1="415" y1="270" x2="370" y2="210" stroke="#65a30d" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowState)" />
          <line x1="565" y1="270" x2="400" y2="210" stroke="#65a30d" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowState)" />

          {/* State transitions */}
          <path d="M 180 295 L 200 295" stroke="#84cc16" strokeWidth="2" markerEnd="url(#arrowState)" />
          <text x="185" y="288" fill="#65a30d" fontSize="9">insert</text>

          <path d="M 330 295 L 350 295" stroke="#84cc16" strokeWidth="2" markerEnd="url(#arrowState)" />
          <text x="335" y="288" fill="#65a30d" fontSize="9">select</text>

          <path d="M 415 340 Q 265 380 115 340" stroke="#84cc16" strokeWidth="2" markerEnd="url(#arrowState)" fill="none" />
          <text x="240" y="395" fill="#65a30d" fontSize="9">dispense (if items left)</text>

          {/* Note */}
          <rect x="50" y="390" width="600" height="80" fill="#f7fee7" stroke="#84cc16" strokeWidth="2" rx="5" strokeDasharray="5,5" />
          <text x="60" y="410" fill="#3f6212" fontSize="13" fontWeight="bold">State Pattern Benefits:</text>
          <text x="60" y="428" fill="#4d7c0f" fontSize="11">• Each state is encapsulated in its own class</text>
          <text x="60" y="443" fill="#4d7c0f" fontSize="11">• State-specific behavior is localized and easy to modify</text>
          <text x="60" y="458" fill="#4d7c0f" fontSize="11">• State transitions are explicit and controlled by state objects</text>
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ State Interface and Context
// ═══════════════════════════════════════════════════════════════════════════

// State interface
interface State {
  void insertCoin(VendingMachine machine);
  void ejectCoin(VendingMachine machine);
  void selectProduct(VendingMachine machine);
  void dispense(VendingMachine machine);
}

// Context
class VendingMachine {
  private State noCoinState;
  private State hasCoinState;
  private State soldState;
  private State soldOutState;

  private State currentState;
  private int count;

  public VendingMachine(int count) {
    this.count = count;
    noCoinState = new NoCoinState();
    hasCoinState = new HasCoinState();
    soldState = new SoldState();
    soldOutState = new SoldOutState();

    currentState = count > 0 ? noCoinState : soldOutState;
  }

  public void insertCoin() { currentState.insertCoin(this); }
  public void ejectCoin() { currentState.ejectCoin(this); }
  public void selectProduct() { currentState.selectProduct(this); }
  public void dispense() { currentState.dispense(this); }

  public void setState(State state) { this.currentState = state; }
  public State getNoCoinState() { return noCoinState; }
  public State getHasCoinState() { return hasCoinState; }
  public State getSoldState() { return soldState; }
  public State getSoldOutState() { return soldOutState; }

  public void releaseProduct() {
    if (count > 0) {
      count--;
      System.out.println("Product dispensed. Remaining: " + count);
    }
  }

  public int getCount() { return count; }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Concrete States
// ═══════════════════════════════════════════════════════════════════════════

class NoCoinState implements State {
  @Override
  public void insertCoin(VendingMachine machine) {
    System.out.println("Coin inserted");
    machine.setState(machine.getHasCoinState());
  }

  @Override
  public void ejectCoin(VendingMachine machine) {
    System.out.println("No coin to eject");
  }

  @Override
  public void selectProduct(VendingMachine machine) {
    System.out.println("Insert coin first");
  }

  @Override
  public void dispense(VendingMachine machine) {
    System.out.println("Pay first");
  }
}

class HasCoinState implements State {
  @Override
  public void insertCoin(VendingMachine machine) {
    System.out.println("Coin already inserted");
  }

  @Override
  public void ejectCoin(VendingMachine machine) {
    System.out.println("Coin returned");
    machine.setState(machine.getNoCoinState());
  }

  @Override
  public void selectProduct(VendingMachine machine) {
    System.out.println("Product selected");
    machine.setState(machine.getSoldState());
  }

  @Override
  public void dispense(VendingMachine machine) {
    System.out.println("Select product first");
  }
}

class SoldState implements State {
  @Override
  public void insertCoin(VendingMachine machine) {
    System.out.println("Please wait, dispensing product");
  }

  @Override
  public void ejectCoin(VendingMachine machine) {
    System.out.println("Product already selected");
  }

  @Override
  public void selectProduct(VendingMachine machine) {
    System.out.println("Already dispensing");
  }

  @Override
  public void dispense(VendingMachine machine) {
    machine.releaseProduct();
    if (machine.getCount() > 0) {
      machine.setState(machine.getNoCoinState());
    } else {
      System.out.println("Machine sold out!");
      machine.setState(machine.getSoldOutState());
    }
  }
}

class SoldOutState implements State {
  @Override
  public void insertCoin(VendingMachine machine) {
    System.out.println("Machine sold out. Returning coin.");
  }

  @Override
  public void ejectCoin(VendingMachine machine) {
    System.out.println("No coin to eject");
  }

  @Override
  public void selectProduct(VendingMachine machine) {
    System.out.println("Sold out");
  }

  @Override
  public void dispense(VendingMachine machine) {
    System.out.println("Sold out");
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Usage Example
// ═══════════════════════════════════════════════════════════════════════════

// Usage
VendingMachine machine = new VendingMachine(2);

machine.insertCoin();
// Output: Coin inserted

machine.selectProduct();
// Output: Product selected

machine.dispense();
// Output: Product dispensed. Remaining: 1

machine.insertCoin();
// Output: Coin inserted

machine.ejectCoin();
// Output: Coin returned

machine.selectProduct();
// Output: Insert coin first

machine.insertCoin();
// Output: Coin inserted

machine.selectProduct();
// Output: Product selected

machine.dispense();
// Output: Product dispensed. Remaining: 0
// Output: Machine sold out!

machine.insertCoin();
// Output: Machine sold out. Returning coin.`
    },
    {
      name: 'Chain of Responsibility',
      icon: '⛓️',
      description: 'Passes request along chain of handlers. Each handler decides to process or pass to next. Decouples sender and receiver. Dynamic chain configuration. Used in event bubbling, logging frameworks, authorization chains.',
      diagram: () => (
        <svg viewBox="0 0 750 400" style={{ width: '100%', maxWidth: '750px', height: 'auto', margin: '20px 0' }}>
          <defs>
            <linearGradient id="chainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#b45309', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrowChain" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#b45309" />
            </marker>
          </defs>

          {/* Handler Interface */}
          <rect x="300" y="20" width="150" height="80" fill="url(#chainGrad)" stroke="#b45309" strokeWidth="2" rx="5" />
          <text x="375" y="45" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">«interface»</text>
          <text x="375" y="65" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Handler</text>
          <line x1="310" y1="75" x2="440" y2="75" stroke="white" strokeWidth="1" />
          <text x="315" y="92" fill="white" fontSize="12">+ handleRequest()</text>

          {/* Concrete Handlers */}
          <rect x="50" y="170" width="150" height="90" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="5" />
          <text x="125" y="195" textAnchor="middle" fill="#d97706" fontSize="15" fontWeight="bold">Level1Support</text>
          <line x1="60" y1="205" x2="190" y2="205" stroke="#d97706" strokeWidth="1" />
          <text x="65" y="220" fill="#92400e" fontSize="11">- nextHandler</text>
          <line x1="60" y1="226" x2="190" y2="226" stroke="#d97706" strokeWidth="1" />
          <text x="65" y="241" fill="#92400e" fontSize="11">+ handleRequest()</text>
          <text x="70" y="254" fill="#78350f" fontSize="10" fontStyle="italic">Priority ≤ 1</text>

          <rect x="250" y="170" width="150" height="90" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="5" />
          <text x="325" y="195" textAnchor="middle" fill="#d97706" fontSize="15" fontWeight="bold">Level2Support</text>
          <line x1="260" y1="205" x2="390" y2="205" stroke="#d97706" strokeWidth="1" />
          <text x="265" y="220" fill="#92400e" fontSize="11">- nextHandler</text>
          <line x1="260" y1="226" x2="390" y2="226" stroke="#d97706" strokeWidth="1" />
          <text x="265" y="241" fill="#92400e" fontSize="11">+ handleRequest()</text>
          <text x="270" y="254" fill="#78350f" fontSize="10" fontStyle="italic">Priority ≤ 2</text>

          <rect x="450" y="170" width="150" height="90" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="5" />
          <text x="525" y="195" textAnchor="middle" fill="#d97706" fontSize="15" fontWeight="bold">Level3Support</text>
          <line x1="460" y1="205" x2="590" y2="205" stroke="#d97706" strokeWidth="1" />
          <text x="465" y="220" fill="#92400e" fontSize="11">- nextHandler</text>
          <line x1="460" y1="226" x2="590" y2="226" stroke="#d97706" strokeWidth="1" />
          <text x="465" y="241" fill="#92400e" fontSize="11">+ handleRequest()</text>
          <text x="470" y="254" fill="#78350f" fontSize="10" fontStyle="italic">All priorities</text>

          {/* Implements arrows */}
          <line x1="125" y1="170" x2="320" y2="100" stroke="#b45309" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowChain)" />
          <line x1="325" y1="170" x2="360" y2="100" stroke="#b45309" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowChain)" />
          <line x1="525" y1="170" x2="410" y2="100" stroke="#b45309" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowChain)" />

          {/* Chain connections */}
          <path d="M 200 215 L 250 215" stroke="#d97706" strokeWidth="3" markerEnd="url(#arrowChain)" />
          <path d="M 400 215 L 450 215" stroke="#d97706" strokeWidth="3" markerEnd="url(#arrowChain)" />

          <text x="210" y="210" fill="#d97706" fontSize="11" fontWeight="bold">next</text>
          <text x="410" y="210" fill="#d97706" fontSize="11" fontWeight="bold">next</text>

          {/* Client */}
          <ellipse cx="125" cy="330" rx="70" ry="35" fill="url(#chainGrad)" stroke="#b45309" strokeWidth="2" />
          <text x="125" y="335" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">Client</text>

          {/* Client sends request */}
          <path d="M 125 295 L 125 260" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrowChain)" />
          <text x="135" y="280" fill="#d97706" fontSize="12" fontWeight="bold">request</text>

          {/* Flow description */}
          <rect x="250" y="310" width="450" height="80" fill="#fffbeb" stroke="#d97706" strokeWidth="2" rx="5" strokeDasharray="5,5" />
          <text x="260" y="330" fill="#78350f" fontSize="13" fontWeight="bold">Chain Flow:</text>
          <text x="260" y="348" fill="#92400e" fontSize="11">1. Request enters at Level1Support</text>
          <text x="260" y="363" fill="#92400e" fontSize="11">2. If handler can't process, passes to next handler</text>
          <text x="260" y="378" fill="#92400e" fontSize="11">3. Process continues until a handler processes it or chain ends</text>
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Handler Interface and Abstract Handler
// ═══════════════════════════════════════════════════════════════════════════

// Handler interface
interface SupportHandler {
  void setNext(SupportHandler handler);
  void handleRequest(String issue, int priority);
}

// Abstract handler
abstract class AbstractSupportHandler implements SupportHandler {
  protected SupportHandler nextHandler;

  @Override
  public void setNext(SupportHandler handler) {
    this.nextHandler = handler;
  }

  protected void passToNext(String issue, int priority) {
    if (nextHandler != null) {
      nextHandler.handleRequest(issue, priority);
    } else {
      System.out.println("No handler available for: " + issue);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Concrete Handlers
// ═══════════════════════════════════════════════════════════════════════════

class Level1Support extends AbstractSupportHandler {
  @Override
  public void handleRequest(String issue, int priority) {
    if (priority <= 1) {
      System.out.println("Level 1 Support handled: " + issue);
    } else {
      System.out.println("Level 1 Support: Escalating to Level 2");
      passToNext(issue, priority);
    }
  }
}

class Level2Support extends AbstractSupportHandler {
  @Override
  public void handleRequest(String issue, int priority) {
    if (priority <= 2) {
      System.out.println("Level 2 Support handled: " + issue);
    } else {
      System.out.println("Level 2 Support: Escalating to Level 3");
      passToNext(issue, priority);
    }
  }
}

class Level3Support extends AbstractSupportHandler {
  @Override
  public void handleRequest(String issue, int priority) {
    if (priority <= 3) {
      System.out.println("Level 3 Support handled: " + issue);
    } else {
      System.out.println("Level 3 Support: Escalating to Manager");
      passToNext(issue, priority);
    }
  }
}

class ManagerSupport extends AbstractSupportHandler {
  @Override
  public void handleRequest(String issue, int priority) {
    System.out.println("Manager handled critical issue: " + issue);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Logging Chain Example
// ═══════════════════════════════════════════════════════════════════════════

abstract class Logger {
  public static int INFO = 1;
  public static int DEBUG = 2;
  public static int ERROR = 3;

  protected int level;
  protected Logger nextLogger;

  public void setNextLogger(Logger nextLogger) {
    this.nextLogger = nextLogger;
  }

  public void logMessage(int level, String message) {
    if (this.level <= level) {
      write(message);
    }
    if (nextLogger != null) {
      nextLogger.logMessage(level, message);
    }
  }

  abstract protected void write(String message);
}

class ConsoleLogger extends Logger {
  public ConsoleLogger(int level) {
    this.level = level;
  }

  @Override
  protected void write(String message) {
    System.out.println("Console Logger: " + message);
  }
}

class FileLogger extends Logger {
  public FileLogger(int level) {
    this.level = level;
  }

  @Override
  protected void write(String message) {
    System.out.println("File Logger: " + message);
  }
}

class ErrorLogger extends Logger {
  public ErrorLogger(int level) {
    this.level = level;
  }

  @Override
  protected void write(String message) {
    System.out.println("Error Logger: " + message);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Usage Examples
// ═══════════════════════════════════════════════════════════════════════════

// Support chain usage
SupportHandler level1 = new Level1Support();
SupportHandler level2 = new Level2Support();
SupportHandler level3 = new Level3Support();
SupportHandler manager = new ManagerSupport();

level1.setNext(level2);
level2.setNext(level3);
level3.setNext(manager);

level1.handleRequest("Password reset", 1);
// Output: Level 1 Support handled: Password reset

level1.handleRequest("Database connection issue", 2);
// Output: Level 1 Support: Escalating to Level 2
// Output: Level 2 Support handled: Database connection issue

level1.handleRequest("Server crash", 3);
// Output: Level 1 Support: Escalating to Level 2
// Output: Level 2 Support: Escalating to Level 3
// Output: Level 3 Support handled: Server crash

level1.handleRequest("Data breach", 4);
// Output: Level 1 Support: Escalating to Level 2
// Output: Level 2 Support: Escalating to Level 3
// Output: Level 3 Support: Escalating to Manager
// Output: Manager handled critical issue: Data breach

// Logging chain usage
Logger consoleLogger = new ConsoleLogger(Logger.INFO);
Logger fileLogger = new FileLogger(Logger.DEBUG);
Logger errorLogger = new ErrorLogger(Logger.ERROR);

consoleLogger.setNextLogger(fileLogger);
fileLogger.setNextLogger(errorLogger);

consoleLogger.logMessage(Logger.INFO, "This is an information");
// Output: Console Logger: This is an information
// Output: File Logger: This is an information

consoleLogger.logMessage(Logger.DEBUG, "This is a debug message");
// Output: File Logger: This is a debug message

consoleLogger.logMessage(Logger.ERROR, "This is an error");
// Output: Console Logger: This is an error
// Output: File Logger: This is an error
// Output: Error Logger: This is an error`
    },
    {
      name: 'Mediator',
      icon: '🤝',
      description: 'Defines object that encapsulates how set of objects interact. Promotes loose coupling by keeping objects from referring to each other explicitly. Centralizes complex communications. Used in chat applications, air traffic control, UI components.',
      diagram: () => (
        <svg viewBox="0 0 700 450" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '20px 0' }}>
          <defs>
            <linearGradient id="mediatorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#9333ea', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrowMediator" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#9333ea" />
            </marker>
          </defs>

          {/* Mediator */}
          <rect x="275" y="180" width="150" height="90" fill="url(#mediatorGrad)" stroke="#9333ea" strokeWidth="3" rx="5" />
          <text x="350" y="205" textAnchor="middle" fill="white" fontSize="17" fontWeight="bold">ChatMediator</text>
          <text x="285" y="222" fill="white" fontSize="12">(Central Hub)</text>
          <line x1="285" y1="230" x2="415" y2="230" stroke="white" strokeWidth="1" />
          <text x="290" y="247" fill="white" fontSize="11">- users: List</text>
          <text x="290" y="260" fill="white" fontSize="11">+ sendMessage()</text>

          {/* Colleague/User classes */}
          <rect x="50" y="50" width="120" height="70" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2" rx="5" />
          <text x="110" y="75" textAnchor="middle" fill="#9333ea" fontSize="14" fontWeight="bold">User: Alice</text>
          <line x1="60" y1="85" x2="160" y2="85" stroke="#a855f7" strokeWidth="1" />
          <text x="65" y="100" fill="#7e22ce" fontSize="11">+ send(msg)</text>
          <text x="65" y="113" fill="#7e22ce" fontSize="11">+ receive(msg)</text>

          <rect x="530" y="50" width="120" height="70" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2" rx="5" />
          <text x="590" y="75" textAnchor="middle" fill="#9333ea" fontSize="14" fontWeight="bold">User: Bob</text>
          <line x1="540" y1="85" x2="640" y2="85" stroke="#a855f7" strokeWidth="1" />
          <text x="545" y="100" fill="#7e22ce" fontSize="11">+ send(msg)</text>
          <text x="545" y="113" fill="#7e22ce" fontSize="11">+ receive(msg)</text>

          <rect x="50" y="330" width="120" height="70" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2" rx="5" />
          <text x="110" y="355" textAnchor="middle" fill="#9333ea" fontSize="14" fontWeight="bold">User: Charlie</text>
          <line x1="60" y1="365" x2="160" y2="365" stroke="#a855f7" strokeWidth="1" />
          <text x="65" y="380" fill="#7e22ce" fontSize="11">+ send(msg)</text>
          <text x="65" y="393" fill="#7e22ce" fontSize="11">+ receive(msg)</text>

          <rect x="530" y="330" width="120" height="70" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2" rx="5" />
          <text x="590" y="355" textAnchor="middle" fill="#9333ea" fontSize="14" fontWeight="bold">User: Diana</text>
          <line x1="540" y1="365" x2="640" y2="365" stroke="#a855f7" strokeWidth="1" />
          <text x="545" y="380" fill="#7e22ce" fontSize="11">+ send(msg)</text>
          <text x="545" y="393" fill="#7e22ce" fontSize="11">+ receive(msg)</text>

          {/* Communication arrows - from users to mediator */}
          <path d="M 170 85 L 275 210" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowMediator)" />
          <path d="M 530 85 L 425 210" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowMediator)" />
          <path d="M 170 365 L 275 240" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowMediator)" />
          <path d="M 530 365 L 425 240" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowMediator)" />

          {/* Broadcast arrows - from mediator to users */}
          <path d="M 300 180 L 150 120" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="5,5" markerEnd="url(#arrowMediator)" />
          <path d="M 400 180 L 550 120" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="5,5" markerEnd="url(#arrowMediator)" />
          <path d="M 300 270 L 150 330" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="5,5" markerEnd="url(#arrowMediator)" />
          <path d="M 400 270 L 550 330" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="5,5" markerEnd="url(#arrowMediator)" />

          {/* Labels */}
          <text x="195" y="140" fill="#a855f7" fontSize="10" fontWeight="bold">send</text>
          <text x="460" y="140" fill="#a855f7" fontSize="10" fontWeight="bold">send</text>
          <text x="190" y="295" fill="#9333ea" fontSize="9" fontStyle="italic">broadcast</text>
          <text x="465" y="295" fill="#9333ea" fontSize="9" fontStyle="italic">broadcast</text>

          {/* Note */}
          <text x="250" y="20" fill="#7e22ce" fontSize="13" fontWeight="bold">All communication goes through Mediator</text>
          <text x="220" y="37" fill="#6b21a8" fontSize="11">Users don't communicate directly with each other</text>
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Mediator Interface and Concrete Mediator
// ═══════════════════════════════════════════════════════════════════════════

// Mediator interface
interface ChatMediator {
  void sendMessage(String message, User user);
  void addUser(User user);
}

// Concrete mediator
class ChatRoom implements ChatMediator {
  private List<User> users = new ArrayList<>();

  @Override
  public void addUser(User user) {
    users.add(user);
  }

  @Override
  public void sendMessage(String message, User sender) {
    for (User user : users) {
      // Don't send message to sender
      if (user != sender) {
        user.receive(message);
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Colleague Classes
// ═══════════════════════════════════════════════════════════════════════════

abstract class User {
  protected ChatMediator mediator;
  protected String name;

  public User(ChatMediator mediator, String name) {
    this.mediator = mediator;
    this.name = name;
  }

  public abstract void send(String message);
  public abstract void receive(String message);
}

class ChatUser extends User {
  public ChatUser(ChatMediator mediator, String name) {
    super(mediator, name);
  }

  @Override
  public void send(String message) {
    System.out.println(name + " sending: " + message);
    mediator.sendMessage(message, this);
  }

  @Override
  public void receive(String message) {
    System.out.println(name + " received: " + message);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Air Traffic Control Example
// ═══════════════════════════════════════════════════════════════════════════

interface ATCMediator {
  void registerRunway(Runway runway);
  void registerFlight(Flight flight);
  boolean isRunwayAvailable();
  void setRunwayAvailable(boolean available);
}

class AirTrafficControl implements ATCMediator {
  private Flight flight;
  private Runway runway;
  private boolean runwayAvailable = true;

  @Override
  public void registerRunway(Runway runway) {
    this.runway = runway;
  }

  @Override
  public void registerFlight(Flight flight) {
    this.flight = flight;
  }

  @Override
  public boolean isRunwayAvailable() {
    return runwayAvailable;
  }

  @Override
  public void setRunwayAvailable(boolean available) {
    this.runwayAvailable = available;
  }
}

class Flight {
  private ATCMediator atcMediator;
  private String flightNumber;

  public Flight(ATCMediator atcMediator, String flightNumber) {
    this.atcMediator = atcMediator;
    this.flightNumber = flightNumber;
  }

  public void requestLanding() {
    if (atcMediator.isRunwayAvailable()) {
      System.out.println(flightNumber + ": Landing permission granted");
      atcMediator.setRunwayAvailable(false);
    } else {
      System.out.println(flightNumber + ": Runway busy, waiting...");
    }
  }

  public void completeLanding() {
    System.out.println(flightNumber + ": Landing complete");
    atcMediator.setRunwayAvailable(true);
  }
}

class Runway {
  private ATCMediator atcMediator;

  public Runway(ATCMediator atcMediator) {
    this.atcMediator = atcMediator;
    atcMediator.registerRunway(this);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Usage Examples
// ═══════════════════════════════════════════════════════════════════════════

// Chat room usage
ChatMediator chatRoom = new ChatRoom();

User user1 = new ChatUser(chatRoom, "Alice");
User user2 = new ChatUser(chatRoom, "Bob");
User user3 = new ChatUser(chatRoom, "Charlie");

chatRoom.addUser(user1);
chatRoom.addUser(user2);
chatRoom.addUser(user3);

user1.send("Hello everyone!");
// Output: Alice sending: Hello everyone!
// Output: Bob received: Hello everyone!
// Output: Charlie received: Hello everyone!

user2.send("Hi Alice!");
// Output: Bob sending: Hi Alice!
// Output: Alice received: Hi Alice!
// Output: Charlie received: Hi Alice!

// Air traffic control usage
ATCMediator atc = new AirTrafficControl();
Runway runway = new Runway(atc);

Flight flight1 = new Flight(atc, "AA123");
Flight flight2 = new Flight(atc, "UA456");

atc.registerFlight(flight1);
atc.registerFlight(flight2);

flight1.requestLanding();
// Output: AA123: Landing permission granted

flight2.requestLanding();
// Output: UA456: Runway busy, waiting...

flight1.completeLanding();
// Output: AA123: Landing complete

flight2.requestLanding();
// Output: UA456: Landing permission granted`
    },
    {
      name: 'Memento',
      icon: '💾',
      description: 'Captures and externalizes object\'s internal state without violating encapsulation. Allows object to be restored to previous state. Used in undo mechanisms, transaction rollback, game save points.',
      diagram: () => (
        <svg viewBox="0 0 700 420" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '20px 0' }}>
          <defs>
            <linearGradient id="mementoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#db2777', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrowMemento" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#db2777" />
            </marker>
          </defs>

          {/* Originator */}
          <rect x="50" y="150" width="180" height="120" fill="url(#mementoGrad)" stroke="#db2777" strokeWidth="2" rx="5" />
          <text x="140" y="175" textAnchor="middle" fill="white" fontSize="17" fontWeight="bold">TextEditor</text>
          <text x="60" y="192" fill="white" fontSize="12">(Originator)</text>
          <line x1="60" y1="200" x2="220" y2="200" stroke="white" strokeWidth="1" />
          <text x="65" y="217" fill="white" fontSize="12">- content: String</text>
          <text x="65" y="232" fill="white" fontSize="12">- cursor: int</text>
          <line x1="60" y1="238" x2="220" y2="238" stroke="white" strokeWidth="1" />
          <text x="65" y="253" fill="white" fontSize="12">+ save(): Memento</text>
          <text x="65" y="266" fill="white" fontSize="12">+ restore(Memento)</text>

          {/* Memento */}
          <rect x="310" y="150" width="160" height="120" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="5" />
          <text x="390" y="175" textAnchor="middle" fill="#ec4899" fontSize="17" fontWeight="bold">EditorMemento</text>
          <text x="320" y="192" fill="#db2777" fontSize="12">(Memento)</text>
          <line x1="320" y1="200" x2="460" y2="200" stroke="#ec4899" strokeWidth="1" />
          <text x="325" y="217" fill="#be185d" fontSize="12">- content: String</text>
          <text x="325" y="232" fill="#be185d" fontSize="12">- cursor: int</text>
          <line x1="320" y1="238" x2="460" y2="238" stroke="#ec4899" strokeWidth="1" />
          <text x="325" y="253" fill="#be185d" fontSize="12">+ getContent()</text>
          <text x="325" y="266" fill="#be185d" fontSize="12">+ getCursor()</text>

          {/* Caretaker */}
          <rect x="510" y="165" width="160" height="90" fill="url(#mementoGrad)" stroke="#db2777" strokeWidth="2" rx="5" />
          <text x="590" y="190" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">History</text>
          <text x="520" y="207" fill="white" fontSize="12">(Caretaker)</text>
          <line x1="520" y1="215" x2="660" y2="215" stroke="white" strokeWidth="1" />
          <text x="525" y="232" fill="white" fontSize="11">- mementos: Stack</text>
          <text x="525" y="246" fill="white" fontSize="11">+ push(Memento)</text>

          {/* Creates arrow */}
          <path d="M 230 210 L 310 210" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowMemento)" />
          <text x="250" y="202" fill="#db2777" fontSize="12" fontWeight="bold">creates</text>

          {/* Caretaker stores Memento */}
          <path d="M 510 210 L 470 210" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowMemento)" />
          <text x="475" y="202" fill="#db2777" fontSize="12" fontWeight="bold">stores</text>

          {/* Flow diagram */}
          <rect x="50" y="300" width="620" height="100" fill="#fdf2f8" stroke="#ec4899" strokeWidth="2" rx="5" strokeDasharray="5,5" />
          <text x="60" y="320" fill="#9f1239" fontSize="13" fontWeight="bold">Memento Pattern Flow:</text>

          <text x="60" y="340" fill="#be185d" fontSize="12" fontWeight="bold">Save State:</text>
          <text x="60" y="355" fill="#9f1239" fontSize="11">1. Client calls editor.save() → 2. Originator creates Memento with current state →</text>
          <text x="60" y="368" fill="#9f1239" fontSize="11">3. Caretaker stores Memento in history</text>

          <text x="380" y="340" fill="#be185d" fontSize="12" fontWeight="bold">Restore State:</text>
          <text x="380" y="355" fill="#9f1239" fontSize="11">1. Caretaker retrieves Memento →</text>
          <text x="380" y="368" fill="#9f1239" fontSize="11">2. editor.restore(memento) →</text>
          <text x="380" y="381" fill="#9f1239" fontSize="11">3. Originator restores its state</text>

          {/* Timeline */}
          <rect x="70" y="30" width="560" height="80" fill="#fef2f9" stroke="#f9a8d4" strokeWidth="2" rx="5" />
          <text x="340" y="50" textAnchor="middle" fill="#be185d" fontSize="14" fontWeight="bold">Timeline (Undo/Redo)</text>

          <circle cx="110" cy="75" r="15" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
          <text x="110" y="81" textAnchor="middle" fill="#db2777" fontSize="11" fontWeight="bold">T1</text>

          <circle cx="230" cy="75" r="15" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
          <text x="230" y="81" textAnchor="middle" fill="#db2777" fontSize="11" fontWeight="bold">T2</text>

          <circle cx="350" cy="75" r="15" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
          <text x="350" y="81" textAnchor="middle" fill="#db2777" fontSize="11" fontWeight="bold">T3</text>

          <circle cx="470" cy="75" r="15" fill="#ec4899" stroke="#db2777" strokeWidth="2" />
          <text x="470" y="81" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">T4</text>

          <circle cx="590" cy="75" r="15" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
          <text x="590" y="81" textAnchor="middle" fill="#db2777" fontSize="11" fontWeight="bold">T5</text>

          <path d="M 125 75 L 215 75" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowMemento)" />
          <path d="M 245 75 L 335 75" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowMemento)" />
          <path d="M 365 75 L 455 75" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowMemento)" />
          <path d="M 485 75 L 575 75" stroke="#ec4899" strokeWidth="2" strokeDasharray="3,3" />

          <text x="80" y="105" fill="#9f1239" fontSize="10">State 1</text>
          <text x="200" y="105" fill="#9f1239" fontSize="10">State 2</text>
          <text x="320" y="105" fill="#9f1239" fontSize="10">State 3</text>
          <text x="430" y="105" fill="#9f1239" fontSize="10" fontWeight="bold">Current</text>
          <text x="560" y="105" fill="#9f1239" fontSize="10">Future</text>
        </svg>
      ),
      codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Memento, Originator, and Caretaker
// ═══════════════════════════════════════════════════════════════════════════

// Memento - stores state
class EditorMemento {
  private final String content;
  private final int cursorPosition;

  public EditorMemento(String content, int cursorPosition) {
    this.content = content;
    this.cursorPosition = cursorPosition;
  }

  public String getContent() {
    return content;
  }

  public int getCursorPosition() {
    return cursorPosition;
  }
}

// Originator - creates and restores from memento
class TextEditor {
  private String content;
  private int cursorPosition;

  public void write(String text) {
    content = (content == null ? "" : content) + text;
    cursorPosition = content.length();
    System.out.println("Content: " + content);
  }

  public void setCursor(int position) {
    this.cursorPosition = position;
  }

  public EditorMemento save() {
    System.out.println("Saving state...");
    return new EditorMemento(content, cursorPosition);
  }

  public void restore(EditorMemento memento) {
    this.content = memento.getContent();
    this.cursorPosition = memento.getCursorPosition();
    System.out.println("Restored content: " + content);
  }

  public String getContent() {
    return content;
  }
}

// Caretaker - manages mementos
class EditorHistory {
  private Stack<EditorMemento> history = new Stack<>();

  public void save(TextEditor editor) {
    history.push(editor.save());
  }

  public void undo(TextEditor editor) {
    if (!history.isEmpty()) {
      editor.restore(history.pop());
    } else {
      System.out.println("No more states to restore");
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Game State Example
// ═══════════════════════════════════════════════════════════════════════════

class GameMemento {
  private final int level;
  private final int score;
  private final int lives;

  public GameMemento(int level, int score, int lives) {
    this.level = level;
    this.score = score;
    this.lives = lives;
  }

  public int getLevel() { return level; }
  public int getScore() { return score; }
  public int getLives() { return lives; }
}

class Game {
  private int level;
  private int score;
  private int lives;

  public Game() {
    this.level = 1;
    this.score = 0;
    this.lives = 3;
  }

  public void play() {
    level++;
    score += 100;
    System.out.println("Playing... Level: " + level + ", Score: " + score + ", Lives: " + lives);
  }

  public void loseLife() {
    lives--;
    System.out.println("Lost a life! Lives remaining: " + lives);
  }

  public GameMemento save() {
    System.out.println("Game saved!");
    return new GameMemento(level, score, lives);
  }

  public void restore(GameMemento memento) {
    this.level = memento.getLevel();
    this.score = memento.getScore();
    this.lives = memento.getLives();
    System.out.println("Game restored! Level: " + level + ", Score: " + score + ", Lives: " + lives);
  }
}

class GameSaveManager {
  private List<GameMemento> saves = new ArrayList<>();

  public void save(Game game) {
    saves.add(game.save());
  }

  public void restore(Game game, int saveIndex) {
    if (saveIndex >= 0 && saveIndex < saves.size()) {
      game.restore(saves.get(saveIndex));
    } else {
      System.out.println("Invalid save index");
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Usage Examples
// ═══════════════════════════════════════════════════════════════════════════

// Text editor usage
TextEditor editor = new TextEditor();
EditorHistory history = new EditorHistory();

editor.write("Hello ");
history.save(editor);
// Output: Content: Hello
// Output: Saving state...

editor.write("World");
history.save(editor);
// Output: Content: Hello World
// Output: Saving state...

editor.write("!");
// Output: Content: Hello World!

history.undo(editor);
// Output: Restored content: Hello World

history.undo(editor);
// Output: Restored content: Hello

// Game save usage
Game game = new Game();
GameSaveManager saveManager = new GameSaveManager();

game.play();
// Output: Playing... Level: 2, Score: 100, Lives: 3

saveManager.save(game);
// Output: Game saved!

game.play();
// Output: Playing... Level: 3, Score: 200, Lives: 3

game.play();
// Output: Playing... Level: 4, Score: 300, Lives: 3

game.loseLife();
// Output: Lost a life! Lives remaining: 2

game.loseLife();
// Output: Lost a life! Lives remaining: 1

saveManager.restore(game, 0);
// Output: Game restored! Level: 2, Score: 100, Lives: 3`
    }
  ]

  const categories = [
    {
      id: 'creational',
      name: 'Creational Patterns',
      icon: '🏗️',
      color: '#6366f1',
      description: 'Object creation mechanisms - how objects are instantiated',
      patternIds: [0, 1, 2, 3, 4] // Singleton, Factory Method, Builder, Prototype, Abstract Factory
    },
    {
      id: 'structural',
      name: 'Structural Patterns',
      icon: '🔧',
      color: '#8b5cf6',
      description: 'Object composition - how classes and objects are composed to form larger structures',
      patternIds: [5, 6, 7, 8] // Adapter, Decorator, Facade, Proxy
    },
    {
      id: 'behavioral',
      name: 'Behavioral Patterns',
      icon: '🎯',
      color: '#a855f7',
      description: 'Object communication and responsibility - how objects communicate and distribute responsibility',
      patternIds: [9, 10, 11, 12, 13, 14, 15, 16] // Observer, Strategy, Command, Template Method, State, Chain of Responsibility, Mediator, Memento
    }
  ]

  // Use refs to access current state in event handler
  const selectedConceptRef = useRef(selectedConcept)
  const selectedCategoryRef = useRef(selectedCategory)

  useEffect(() => {
    selectedConceptRef.current = selectedConcept
  }, [selectedConcept])

  useEffect(() => {
    selectedCategoryRef.current = selectedCategory
  }, [selectedCategory])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentSelectedConcept = selectedConceptRef.current
      const currentSelectedCategory = selectedCategoryRef.current

      // Handle Escape to go back
      if (e.key === 'Escape') {
        // If category modal is open, close it
        if (currentSelectedCategory) {
          e.preventDefault()
          e.stopImmediatePropagation()
          setSelectedCategory(null)
          setSelectedConcept(null)
          return
        }
        // Otherwise if concept is selected, close it
        if (currentSelectedConcept) {
          e.preventDefault()
          e.stopImmediatePropagation()
          setSelectedConcept(null)
          return
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept)
  }

  return (
    <>
    <div
      ref={modalRef}
      onClick={(e) => e.stopPropagation()}
      style={{
        padding: '2rem',
        maxWidth: '1600px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
        border: '3px solid rgba(99, 102, 241, 0.4)'
      }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            ref={firstFocusableRef}
            onClick={onBack}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            ← Back to Menu
          </button>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#1f2937',
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              🎨 Design Patterns
            </h1>
            {currentSubcategory && (
              <span style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                borderRadius: '6px',
                marginTop: '0.25rem',
                display: 'inline-block'
              }}>
                {currentSubcategory}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {onPrevious && (
            <button
              onClick={onPrevious}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
            >
              ← {previousName}
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      <div style={{
        backgroundColor: 'rgba(99, 102, 241, 0.05)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(99, 102, 241, 0.3)',
        marginBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.3rem',
          color: '#374151',
          fontWeight: '500',
          margin: 0,
          lineHeight: '1.8',
          textAlign: 'center'
        }}>
          Design patterns are reusable solutions to common software design problems. They represent best practices evolved over time
          and provide a shared vocabulary for developers to communicate architectural decisions effectively.
        </p>
      </div>

      {!selectedConcept && (
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto 3rem',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '16px',
          border: '3px solid rgba(99, 102, 241, 0.3)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#6366f1',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            Design Pattern Categories
          </h3>
          <svg viewBox="0 0 1200 700" style={{ width: '100%', height: 'auto' }}>
            <defs>
              <linearGradient id="creationalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#818cf8', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="structuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#a78bfa', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="behavioralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#c084fc', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
              </linearGradient>
              <filter id="shadow">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.2"/>
              </filter>
            </defs>

            {/* Connecting Lines */}
            <line x1="300" y1="180" x2="600" y2="400" stroke="#e0e7ff" strokeWidth="3" strokeDasharray="8,4" />
            <line x1="900" y1="180" x2="600" y2="400" stroke="#e0e7ff" strokeWidth="3" strokeDasharray="8,4" />

            {/* Creational Patterns (Top Left) */}
            <g filter="url(#shadow)" onClick={(e) => { e.stopPropagation(); setSelectedCategory('creational'); }} style={{ cursor: 'pointer' }}>
              <rect x="50" y="50" width="500" height="280" rx="20" fill="url(#creationalGrad)" opacity="0.95" />
              <text x="300" y="90" fontSize="28" fontWeight="bold" fill="white" textAnchor="middle">🏗️ Creational Patterns</text>
              <text x="300" y="120" fontSize="16" fill="white" opacity="0.9" textAnchor="middle">Object Creation Mechanisms</text>

              <rect x="70" y="140" width="140" height="50" rx="8" fill="white" opacity="0.95" />
              <text x="140" y="170" fontSize="15" fontWeight="600" fill="#6366f1" textAnchor="middle">🔒 Singleton</text>

              <rect x="230" y="140" width="140" height="50" rx="8" fill="white" opacity="0.95" />
              <text x="300" y="170" fontSize="15" fontWeight="600" fill="#6366f1" textAnchor="middle">🏭 Factory Method</text>

              <rect x="390" y="140" width="140" height="50" rx="8" fill="white" opacity="0.95" />
              <text x="460" y="170" fontSize="15" fontWeight="600" fill="#6366f1" textAnchor="middle">🏗️ Builder</text>

              <rect x="70" y="210" width="140" height="50" rx="8" fill="white" opacity="0.95" />
              <text x="140" y="240" fontSize="15" fontWeight="600" fill="#6366f1" textAnchor="middle">🧬 Prototype</text>

              <rect x="230" y="210" width="140" height="50" rx="8" fill="white" opacity="0.95" />
              <text x="300" y="240" fontSize="15" fontWeight="600" fill="#6366f1" textAnchor="middle">🎨 Abstract Factory</text>

              <rect x="390" y="210" width="140" height="50" rx="8" fill="white" opacity="0.95" />
              <text x="460" y="240" fontSize="15" fontWeight="600" fill="#6366f1" textAnchor="middle">⚡ Object Pool</text>
            </g>

            {/* Structural Patterns (Top Right) */}
            <g filter="url(#shadow)" onClick={(e) => { e.stopPropagation(); setSelectedCategory('structural'); }} style={{ cursor: 'pointer' }}>
              <rect x="650" y="50" width="500" height="280" rx="20" fill="url(#structuralGrad)" opacity="0.95" />
              <text x="900" y="90" fontSize="28" fontWeight="bold" fill="white" textAnchor="middle">🔧 Structural Patterns</text>
              <text x="900" y="120" fontSize="16" fill="white" opacity="0.9" textAnchor="middle">Object Composition</text>

              <rect x="670" y="140" width="140" height="50" rx="8" fill="white" opacity="0.95" />
              <text x="740" y="170" fontSize="15" fontWeight="600" fill="#8b5cf6" textAnchor="middle">🔌 Adapter</text>

              <rect x="830" y="140" width="140" height="50" rx="8" fill="white" opacity="0.95" />
              <text x="900" y="170" fontSize="15" fontWeight="600" fill="#8b5cf6" textAnchor="middle">🎁 Decorator</text>

              <rect x="990" y="140" width="140" height="50" rx="8" fill="white" opacity="0.95" />
              <text x="1060" y="170" fontSize="15" fontWeight="600" fill="#8b5cf6" textAnchor="middle">🏛️ Facade</text>

              <rect x="750" y="210" width="140" height="50" rx="8" fill="white" opacity="0.95" />
              <text x="820" y="240" fontSize="15" fontWeight="600" fill="#8b5cf6" textAnchor="middle">🎭 Proxy</text>

              <rect x="910" y="210" width="140" height="50" rx="8" fill="white" opacity="0.95" />
              <text x="980" y="240" fontSize="15" fontWeight="600" fill="#8b5cf6" textAnchor="middle">🌉 Bridge</text>
            </g>

            {/* Behavioral Patterns (Bottom Center) */}
            <g filter="url(#shadow)" onClick={(e) => { e.stopPropagation(); setSelectedCategory('behavioral'); }} style={{ cursor: 'pointer' }}>
              <rect x="200" y="400" width="800" height="280" rx="20" fill="url(#behavioralGrad)" opacity="0.95" />
              <text x="600" y="440" fontSize="28" fontWeight="bold" fill="white" textAnchor="middle">🎯 Behavioral Patterns</text>
              <text x="600" y="470" fontSize="16" fill="white" opacity="0.9" textAnchor="middle">Object Communication & Responsibility</text>

              <rect x="220" y="490" width="160" height="50" rx="8" fill="white" opacity="0.95" />
              <text x="300" y="520" fontSize="14" fontWeight="600" fill="#a855f7" textAnchor="middle">👁️ Observer</text>

              <rect x="400" y="490" width="160" height="50" rx="8" fill="white" opacity="0.95" />
              <text x="480" y="520" fontSize="14" fontWeight="600" fill="#a855f7" textAnchor="middle">🎲 Strategy</text>

              <rect x="580" y="490" width="160" height="50" rx="8" fill="white" opacity="0.95" />
              <text x="660" y="520" fontSize="14" fontWeight="600" fill="#a855f7" textAnchor="middle">⚙️ Command</text>

              <rect x="760" y="490" width="200" height="50" rx="8" fill="white" opacity="0.95" />
              <text x="860" y="520" fontSize="14" fontWeight="600" fill="#a855f7" textAnchor="middle">📋 Template Method</text>

              <rect x="220" y="560" width="160" height="50" rx="8" fill="white" opacity="0.95" />
              <text x="300" y="590" fontSize="14" fontWeight="600" fill="#a855f7" textAnchor="middle">🔄 State</text>

              <rect x="400" y="560" width="200" height="50" rx="8" fill="white" opacity="0.95" />
              <text x="500" y="590" fontSize="14" fontWeight="600" fill="#a855f7" textAnchor="middle">⛓️ Chain of Responsibility</text>

              <rect x="620" y="560" width="160" height="50" rx="8" fill="white" opacity="0.95" />
              <text x="700" y="590" fontSize="14" fontWeight="600" fill="#a855f7" textAnchor="middle">🤝 Mediator</text>

              <rect x="800" y="560" width="160" height="50" rx="8" fill="white" opacity="0.95" />
              <text x="880" y="590" fontSize="14" fontWeight="600" fill="#a855f7" textAnchor="middle">🔖 Memento</text>
            </g>
          </svg>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedConcept ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {!selectedConcept ? (
          designPatterns.map((pattern, idx) => (
            <div
              key={idx}
              onClick={() => handleConceptClick(pattern)}
              style={{
                backgroundColor: 'rgba(99, 102, 241, 0.05)',
                padding: '2rem',
                borderRadius: '12px',
                border: '2px solid rgba(99, 102, 241, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.1)'
                e.currentTarget.style.borderColor = '#6366f1'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(99, 102, 241, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{pattern.icon}</div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: '#6366f1',
                  margin: '0 0 0.5rem 0'
                }}>
                  {pattern.name}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {pattern.description.substring(0, 100)}...
                </p>
              </div>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: '600',
                color: '#6366f1',
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
                color: '#1f2937',
                marginBottom: '1.5rem'
              }}>
                Design Patterns
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {designPatterns.map((pattern, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleConceptClick(pattern)}
                    style={{
                      backgroundColor: selectedConcept?.name === pattern.name
                        ? 'rgba(99, 102, 241, 0.15)'
                        : 'rgba(99, 102, 241, 0.05)',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: selectedConcept?.name === pattern.name
                        ? '3px solid #6366f1'
                        : '2px solid rgba(99, 102, 241, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedConcept?.name !== pattern.name) {
                        e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.1)'
                        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedConcept?.name !== pattern.name) {
                        e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.05)'
                        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)'
                      }
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>{pattern.icon}</span>
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: selectedConcept?.name === pattern.name ? '#6366f1' : '#1f2937'
                      }}>
                        {pattern.name}
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
                color: '#6366f1',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: '2rem' }}>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h3>

              {selectedConcept.diagram && (
                <div style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '2px solid rgba(99, 102, 241, 0.2)',
                  marginBottom: '1.5rem'
                }}>
                  {selectedConcept.diagram()}
                </div>
              )}

              <div style={{
                backgroundColor: 'rgba(99, 102, 241, 0.08)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '2px solid rgba(99, 102, 241, 0.3)',
                marginBottom: '1.5rem'
              }}>
                <p style={{
                  fontSize: '1rem',
                  color: '#374151',
                  fontWeight: '500',
                  margin: 0,
                  lineHeight: '1.7',
                  textAlign: 'justify'
                }}>
                  {selectedConcept.description}
                </p>
              </div>

              <div>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#6366f1',
                  margin: '0 0 1rem 0'
                }}>
                  💻 Code Examples
                </h4>
                {(() => {
                  const sections = parseCodeSections(selectedConcept.codeExample)
                  if (sections.length === 0) {
                    return (
                      <div style={{
                        backgroundColor: '#1e293b',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: '2px solid #334155'
                      }}>
                        <SyntaxHighlighter code={selectedConcept.codeExample} />
                      </div>
                    )
                  }
                  return (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      {sections.map((section, index) => {
                        const sectionKey = `${selectedConcept.name}-${index}`
                        const isExpanded = expandedSections[sectionKey]
                        return (
                          <div
                            key={index}
                            style={{
                              backgroundColor: 'white',
                              borderRadius: '12px',
                              border: '2px solid rgba(99, 102, 241, 0.3)',
                              overflow: 'hidden'
                            }}
                          >
                            <button
                              onClick={() => toggleSection(sectionKey)}
                              style={{
                                width: '100%',
                                padding: '1.25rem',
                                backgroundColor: isExpanded ? 'rgba(99, 102, 241, 0.15)' : 'white',
                                border: 'none',
                                borderBottom: isExpanded ? '2px solid rgba(99, 102, 241, 0.3)' : 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                transition: 'all 0.2s ease',
                                textAlign: 'left'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.15)'
                              }}
                              onMouseLeave={(e) => {
                                if (!isExpanded) {
                                  e.currentTarget.style.backgroundColor = 'white'
                                }
                              }}
                            >
                              <span style={{
                                fontSize: '1.05rem',
                                fontWeight: '700',
                                color: '#6366f1'
                              }}>
                                {section.title}
                              </span>
                              <span style={{
                                fontSize: '1.5rem',
                                color: '#6366f1',
                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s ease'
                              }}>
                                ▼
                              </span>
                            </button>
                            {isExpanded && (
                              <div style={{
                                backgroundColor: '#1e293b',
                                padding: '1.5rem'
                              }}>
                                <SyntaxHighlighter code={section.code} />
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )
                })()}
              </div>
            </div>
          </>
        )}
      </div>
    </div>

    {/* Category Modal Overlay */}
    {selectedCategory && (() => {
      const category = categories.find(c => c.id === selectedCategory)
      if (!category) return null

      const categoryPatterns = category.patternIds.map(id => designPatterns[id])
      const currentPattern = selectedConcept || categoryPatterns[0]

      return (
        <div
          onClick={() => {
            setSelectedCategory(null)
            setSelectedConcept(null)
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '1400px',
              width: '90%',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            {/* Modal Header */}
            <div style={{
              backgroundColor: category.color,
              padding: '1.5rem 2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                color: 'white',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span>{category.icon}</span>
                {category.name}
              </h2>
              <button
                onClick={() => {
                  setSelectedCategory(null)
                  setSelectedConcept(null)
                }}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '2rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div style={{
              display: 'flex',
              flex: 1,
              overflow: 'hidden'
            }}>
              {/* Sidebar */}
              <div style={{
                width: '300px',
                backgroundColor: '#f9fafb',
                borderRight: '2px solid #e5e7eb',
                padding: '1.5rem',
                overflowY: 'auto'
              }}>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280',
                  marginBottom: '1.5rem',
                  lineHeight: '1.6'
                }}>
                  {category.description}
                </p>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  {categoryPatterns.map((pattern, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedConcept(pattern)}
                      style={{
                        backgroundColor: currentPattern?.name === pattern.name
                          ? category.color
                          : 'white',
                        color: currentPattern?.name === pattern.name
                          ? 'white'
                          : '#374151',
                        border: `2px solid ${category.color}`,
                        padding: '1rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                        fontSize: '0.95rem',
                        fontWeight: '600'
                      }}
                      onMouseEnter={(e) => {
                        if (currentPattern?.name !== pattern.name) {
                          e.currentTarget.style.backgroundColor = `${category.color}15`
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (currentPattern?.name !== pattern.name) {
                          e.currentTarget.style.backgroundColor = 'white'
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.2rem' }}>{pattern.icon}</span>
                        <span>{pattern.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Area */}
              <div style={{
                flex: 1,
                padding: '2rem',
                overflowY: 'auto'
              }}>
                {currentPattern && (
                  <>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1.5rem'
                    }}>
                      <span style={{ fontSize: '3rem' }}>{currentPattern.icon}</span>
                      <h3 style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: category.color,
                        margin: 0
                      }}>
                        {currentPattern.name}
                      </h3>
                    </div>

                    <p style={{
                      fontSize: '1.1rem',
                      color: '#6b7280',
                      lineHeight: '1.8',
                      marginBottom: '2rem'
                    }}>
                      {currentPattern.description}
                    </p>

                    {/* Pattern Diagram */}
                    {currentPattern.diagram && (
                      <div style={{ marginBottom: '2rem' }}>
                        {currentPattern.diagram()}
                      </div>
                    )}

                    {/* Code Example */}
                    {currentPattern.codeExample && (
                      <div style={{ marginBottom: '1.5rem' }}>
                        {(() => {
                          const codeSections = parseCodeSections(currentPattern.codeExample)
                          return codeSections.map((section, idx) => {
                            const sectionKey = `modal-${currentPattern.name}-${idx}`
                            const isExpanded = expandedSections[sectionKey]

                            return (
                              <div key={idx} style={{ marginBottom: '1.5rem' }}>
                                <button
                                  onClick={() => toggleSection(sectionKey)}
                                  style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1rem 1.5rem',
                                    backgroundColor: isExpanded ? `${category.color}15` : 'white',
                                    border: `2px solid ${category.color}`,
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    textAlign: 'left'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = `${category.color}15`
                                  }}
                                  onMouseLeave={(e) => {
                                    if (!isExpanded) {
                                      e.currentTarget.style.backgroundColor = 'white'
                                    }
                                  }}
                                >
                                  <span style={{
                                    fontSize: '1.05rem',
                                    fontWeight: '700',
                                    color: category.color
                                  }}>
                                    {section.title}
                                  </span>
                                  <span style={{
                                    fontSize: '1.5rem',
                                    color: category.color,
                                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.2s ease'
                                  }}>
                                    ▼
                                  </span>
                                </button>
                                {isExpanded && (
                                  <div style={{
                                    marginTop: '1rem',
                                    backgroundColor: '#f9fafb',
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb'
                                  }}>
                                    <SyntaxHighlighter code={section.code} />
                                  </div>
                                )}
                              </div>
                            )
                          })
                        })()}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    })()}
    </>
  )
}

export default DesignPatterns

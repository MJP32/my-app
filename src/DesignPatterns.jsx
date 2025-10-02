import { useState, useEffect, useRef } from 'react'

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

function DesignPatterns({ onBack }) {
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})

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

  // Use ref to access current selectedConcept in event handler
  const selectedConceptRef = useRef(selectedConcept)
  useEffect(() => {
    selectedConceptRef.current = selectedConcept
  }, [selectedConcept])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentSelectedConcept = selectedConceptRef.current

      // Handle Escape to go back
      if (e.key === 'Escape') {
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
    <div style={{
      padding: '2rem',
      maxWidth: '95%',
      margin: '120px auto 0',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      border: '3px solid rgba(99, 102, 241, 0.4)'
    }}>
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
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          ← Back to Menu
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          🎨 Design Patterns
        </h1>
        <div style={{ width: '120px' }}></div>
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
            <g filter="url(#shadow)">
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
            <g filter="url(#shadow)">
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
            <g filter="url(#shadow)">
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
  )
}

export default DesignPatterns

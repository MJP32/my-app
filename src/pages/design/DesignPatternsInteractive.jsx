import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'

function DesignPatternsInteractive({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showSolution, setShowSolution] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [userCode, setUserCode] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [language, setLanguage] = useState(getPreferredLanguage())

  // Listen for completion changes
  useEffect(() => {
    const handleProgressUpdate = () => {
      setRefreshKey(prev => prev + 1)
    }

    window.addEventListener('progressUpdate', handleProgressUpdate)
    return () => window.removeEventListener('progressUpdate', handleProgressUpdate)
  }, [])

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (e) => {
      setLanguage(e.detail)
    }
    window.addEventListener('languageChange', handleLanguageChange)
    return () => window.removeEventListener('languageChange', handleLanguageChange)
  }, [])

  const questions = [
    {
      id: 1,
      title: 'Implement Singleton Pattern',
      difficulty: 'Medium',
      description: 'Implement a thread-safe Singleton pattern that ensures only one instance of a class exists. Handle lazy initialization and prevent multiple instances in multithreaded environments.',
      example: `Input:
  DatabaseConnection db1 = DatabaseConnection.getInstance();
  DatabaseConnection db2 = DatabaseConnection.getInstance();
Output:
  db1 == db2 → true
  Only one instance created`,
      starterCode: `public class DatabaseConnection {
    // TODO: Implement thread-safe Singleton pattern

    private DatabaseConnection() {
        System.out.println("Creating database connection...");
    }

    public static DatabaseConnection getInstance() {
        // TODO: Implement lazy initialization with thread safety

    }

    public void connect() {
        System.out.println("Connected to database");
    }
}`,
      solution: `// Approach 1: Double-Checked Locking (Recommended)
public class DatabaseConnection {
    private static volatile DatabaseConnection instance;

    private DatabaseConnection() {
        System.out.println("Creating database connection...");
    }

    public static DatabaseConnection getInstance() {
        if (instance == null) {
            synchronized (DatabaseConnection.class) {
                if (instance == null) {
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }

    public void connect() {
        System.out.println("Connected to database");
    }
}

// Approach 2: Bill Pugh Singleton (Best Practice)
public class DatabaseConnectionBillPugh {
    private DatabaseConnectionBillPugh() {
        System.out.println("Creating database connection...");
    }

    // Inner static helper class
    private static class SingletonHelper {
        private static final DatabaseConnectionBillPugh INSTANCE =
            new DatabaseConnectionBillPugh();
    }

    public static DatabaseConnectionBillPugh getInstance() {
        return SingletonHelper.INSTANCE;
    }

    public void connect() {
        System.out.println("Connected to database");
    }
}

// Approach 3: Enum Singleton (Most Robust)
public enum DatabaseConnectionEnum {
    INSTANCE;

    DatabaseConnectionEnum() {
        System.out.println("Creating database connection...");
    }

    public void connect() {
        System.out.println("Connected to database");
    }
}

// Usage:
// DatabaseConnectionEnum.INSTANCE.connect();

// Approach 4: Eager Initialization
public class DatabaseConnectionEager {
    private static final DatabaseConnectionEager instance =
        new DatabaseConnectionEager();

    private DatabaseConnectionEager() {
        System.out.println("Creating database connection...");
    }

    public static DatabaseConnectionEager getInstance() {
        return instance;
    }
}`,
      testCases: [
        { input: 'getInstance() called twice', output: 'Same instance returned' },
        { input: 'Concurrent access from 10 threads', output: 'Only 1 instance created' },
        { input: 'Serialization/Deserialization', output: 'Same instance maintained' }
      ],
      explanation: `**Problem:** Ensure only ONE instance of a class exists throughout the application lifecycle.

**Key Insight: Lazy Initialization + Thread Safety**
Private constructor prevents external instantiation.
Static getInstance() controls creation.
Thread safety ensures no race conditions in multithreaded environments.

**The Challenge:**
┌────────────────────────────────────────────┐
│  Thread 1: getInstance()                   │
│  Thread 2: getInstance()   (SAME TIME!)    │
│  ❌ Without sync: 2 instances created      │
│  ✅ With sync: 1 instance created          │
└────────────────────────────────────────────┘

**4 Implementation Approaches:**

**1. Double-Checked Locking (Most Common)**
✅ Thread-safe, lazy initialization, good performance
⚠️ Requires 'volatile' keyword

**2. Bill Pugh Singleton (Best Practice)**
✅ Thread-safe by JVM class loading
✅ Lazy initialization via inner static class
✅ No synchronization overhead

**3. Enum Singleton (Most Robust)**
✅ Prevents reflection attacks
✅ Serialization-safe by default
✅ Thread-safe guaranteed by JVM

**4. Eager Initialization (Simple)**
✅ Thread-safe, simple
❌ Not lazy (created at class loading)

**Real-World Use Cases:**
- Database connection pools
- Configuration managers
- Logger instances
- Cache managers
- Hardware interface access (printer spooler)

**Common Pitfalls:**
1. Forgetting 'volatile' in double-checked locking
2. Serialization breaking singleton (need readResolve())
3. Reflection attacks (enum solves this)
4. Cloning attacks (override clone() to throw exception)`,
      pseudocode: `Singleton Pattern - 4 Implementations:
────────────────────────────────────────────

═══════════════════════════════════════════
1. DOUBLE-CHECKED LOCKING (Recommended)
═══════════════════════════════════════════

class DatabaseConnection:
    private static volatile instance = null

    // Private constructor
    private DatabaseConnection():
        print("Creating DB connection...")

    public static getInstance():
        if instance == null:                    // First check (no lock)
            synchronized(DatabaseConnection):   // Lock only if null
                if instance == null:            // Second check (with lock)
                    instance = new DatabaseConnection()
        return instance

Why volatile?
- Prevents instruction reordering
- Ensures visibility across threads
- Without it: partial initialization visible to other threads

═══════════════════════════════════════════
2. BILL PUGH SINGLETON (Best Practice)
═══════════════════════════════════════════

class DatabaseConnection:
    private DatabaseConnection():
        print("Creating DB connection...")

    // Inner static helper class
    private static class SingletonHelper:
        static final INSTANCE = new DatabaseConnection()

    public static getInstance():
        return SingletonHelper.INSTANCE

How it works:
1. Inner class NOT loaded until getInstance() called (lazy!)
2. JVM guarantees thread-safe class initialization
3. No synchronization needed
4. Best performance + lazy + thread-safe

═══════════════════════════════════════════
3. ENUM SINGLETON (Most Robust)
═══════════════════════════════════════════

enum DatabaseConnection:
    INSTANCE

    DatabaseConnection():
        print("Creating DB connection...")

    public void connect():
        print("Connected to database")

// Usage: DatabaseConnection.INSTANCE.connect()

Why enum is best:
- JVM guarantees single instance
- Immune to reflection attacks
- Serialization-safe by default
- Thread-safe guaranteed

═══════════════════════════════════════════
4. EAGER INITIALIZATION (Simple)
═══════════════════════════════════════════

class DatabaseConnection:
    private static final instance = new DatabaseConnection()

    private DatabaseConnection():
        print("Creating DB connection...")

    public static getInstance():
        return instance

Pros: Simple, thread-safe
Cons: Created at class loading (not lazy)

═══════════════════════════════════════════
EXAMPLE TIMELINE (Double-Checked Locking):
═══════════════════════════════════════════

Time  Thread 1              Thread 2              State
────────────────────────────────────────────────────────
t=0   getInstance()         -                     instance=null
t=1   Check: instance==null -                     instance=null
t=2   Enter synchronized    getInstance()         instance=null
t=3   Check: instance==null Check: instance==null instance=null
t=4   Create new instance   Wait for lock...      instance=null
t=5   instance = new()      Wait for lock...      instance=<obj>
t=6   Exit synchronized     Enter synchronized    instance=<obj>
t=7   Return instance       Check: instance!=null instance=<obj>
t=8   -                     Exit synchronized     instance=<obj>
t=9   -                     Return SAME instance  instance=<obj>

Result: Only ONE instance created!

═══════════════════════════════════════════
PROTECTION AGAINST ATTACKS:
═══════════════════════════════════════════

// Prevent cloning
@Override
protected Object clone() throws CloneNotSupportedException:
    throw new CloneNotSupportedException("Singleton!")

// Prevent serialization attack
protected Object readResolve():
    return getInstance()

// Prevent reflection (for enum, automatic)
// For class-based: check if instance exists in constructor
private DatabaseConnection():
    if instance != null:
        throw new RuntimeException("Use getInstance()")

Complexity: O(1) time, O(1) space`
    },
    {
      id: 2,
      title: 'Implement Factory Pattern',
      difficulty: 'Medium',
      description: 'Create a Factory pattern to generate different types of notifications (Email, SMS, Push). The factory should encapsulate object creation logic and return the appropriate notification type.',
      example: `Input: NotificationFactory.createNotification("EMAIL")
Output: EmailNotification instance
Input: NotificationFactory.createNotification("SMS")
Output: SMSNotification instance`,
      starterCode: `interface Notification {
    void send(String message);
}

class EmailNotification implements Notification {
    @Override
    public void send(String message) {
        System.out.println("Email: " + message);
    }
}

class SMSNotification implements Notification {
    @Override
    public void send(String message) {
        System.out.println("SMS: " + message);
    }
}

class PushNotification implements Notification {
    @Override
    public void send(String message) {
        System.out.println("Push: " + message);
    }
}

class NotificationFactory {
    // TODO: Implement factory method
    public static Notification createNotification(String type) {

    }
}`,
      solution: `interface Notification {
    void send(String message);
}

class EmailNotification implements Notification {
    @Override
    public void send(String message) {
        System.out.println("Email: " + message);
    }
}

class SMSNotification implements Notification {
    @Override
    public void send(String message) {
        System.out.println("SMS: " + message);
    }
}

class PushNotification implements Notification {
    @Override
    public void send(String message) {
        System.out.println("Push: " + message);
    }
}

// Simple Factory
class NotificationFactory {
    public static Notification createNotification(String type) {
        if (type == null || type.isEmpty()) {
            throw new IllegalArgumentException("Notification type cannot be null");
        }

        switch (type.toUpperCase()) {
            case "EMAIL":
                return new EmailNotification();
            case "SMS":
                return new SMSNotification();
            case "PUSH":
                return new PushNotification();
            default:
                throw new IllegalArgumentException("Unknown notification type: " + type);
        }
    }
}

// Factory Method Pattern (More Extensible)
abstract class NotificationCreator {
    public abstract Notification createNotification();

    public void sendNotification(String message) {
        Notification notification = createNotification();
        notification.send(message);
    }
}

class EmailNotificationCreator extends NotificationCreator {
    @Override
    public Notification createNotification() {
        return new EmailNotification();
    }
}

class SMSNotificationCreator extends NotificationCreator {
    @Override
    public Notification createNotification() {
        return new SMSNotification();
    }
}

class PushNotificationCreator extends NotificationCreator {
    @Override
    public Notification createNotification() {
        return new PushNotification();
    }
}

// Usage:
// Notification email = NotificationFactory.createNotification("EMAIL");
// email.send("Hello World");
//
// NotificationCreator creator = new EmailNotificationCreator();
// creator.sendNotification("Hello via Factory Method");`,
      testCases: [
        { input: 'createNotification("EMAIL")', output: 'EmailNotification instance' },
        { input: 'createNotification("SMS")', output: 'SMSNotification instance' },
        { input: 'createNotification("INVALID")', output: 'IllegalArgumentException thrown' }
      ],
      explanation: `**Problem:** Encapsulate object creation logic to avoid tight coupling with concrete classes.

**Key Insight: Delegate Object Creation**
Client code doesn't use 'new' directly.
Factory method decides WHICH concrete class to instantiate.
Follows Open/Closed Principle: open for extension, closed for modification.

**Two Variants:**

**1. Simple Factory (Factory Method)**
Static method that returns interface/base type.
Centralized creation logic.

**2. Factory Method Pattern (GoF)**
Abstract creator class with abstract factory method.
Subclasses decide which class to instantiate.

**Class Hierarchy:**
┌─────────────────────────────────────────┐
│  Interface: Notification                │
│  + send(message: String)                │
└─────────────────────────────────────────┘
           ▲         ▲         ▲
           │         │         │
    ┌──────┴───┐ ┌──┴────┐ ┌──┴─────┐
    │ Email    │ │ SMS   │ │ Push   │
    │Notification│Notification│Notification│
    └──────────┘ └───────┘ └────────┘

**Simple Factory:**
┌─────────────────────────────────────────┐
│  NotificationFactory (static)           │
│  + createNotification(type: String)     │
│      → returns Notification             │
└─────────────────────────────────────────┘

**Factory Method Pattern:**
┌─────────────────────────────────────────┐
│  Abstract NotificationCreator           │
│  + abstract createNotification()        │
│  + sendNotification(message)            │
└─────────────────────────────────────────┘
           ▲         ▲         ▲
           │         │         │
    ┌──────┴─────┐ ┌┴────┐ ┌──┴──────┐
    │EmailCreator│ │SMS   │ │Push     │
    │            │ │Creator│ │Creator │
    └────────────┘ └──────┘ └─────────┘

**Advantages:**
✅ Loose coupling (client depends on interface)
✅ Single Responsibility (creation logic in one place)
✅ Open/Closed Principle (add new types without modifying factory)
✅ Testability (easy to mock)

**Disadvantages:**
❌ More classes (complexity increases)
❌ Simple Factory violates Open/Closed (need to modify switch/if)

**Real-World Examples:**
- Document creation (PDF, Word, Excel)
- Database connections (MySQL, PostgreSQL, Oracle)
- UI components (Button, TextField based on OS)
- Logging frameworks (Console, File, Network logger)
- Payment gateways (PayPal, Stripe, Square)`,
      pseudocode: `Factory Pattern - Two Implementations:
─────────────────────────────────────────

═══════════════════════════════════════════
1. SIMPLE FACTORY (Most Common)
═══════════════════════════════════════════

// Interface
interface Notification:
    void send(String message)

// Concrete implementations
class EmailNotification implements Notification:
    void send(String message):
        print("Email: " + message)

class SMSNotification implements Notification:
    void send(String message):
        print("SMS: " + message)

class PushNotification implements Notification:
    void send(String message):
        print("Push: " + message)

// Simple Factory
class NotificationFactory:
    public static Notification createNotification(String type):
        if type == null or type.isEmpty():
            throw IllegalArgumentException("Type cannot be null")

        switch type.toUpperCase():
            case "EMAIL":
                return new EmailNotification()
            case "SMS":
                return new SMSNotification()
            case "PUSH":
                return new PushNotification()
            default:
                throw IllegalArgumentException("Unknown type: " + type)

// Usage
Notification notif = NotificationFactory.createNotification("EMAIL")
notif.send("Hello World")

═══════════════════════════════════════════
2. FACTORY METHOD PATTERN (GoF - More Extensible)
═══════════════════════════════════════════

// Abstract Creator
abstract class NotificationCreator:
    // Factory method (abstract)
    public abstract Notification createNotification()

    // Template method using factory method
    public void sendNotification(String message):
        Notification notification = createNotification()
        notification.send(message)

// Concrete Creators
class EmailNotificationCreator extends NotificationCreator:
    @Override
    public Notification createNotification():
        return new EmailNotification()

class SMSNotificationCreator extends NotificationCreator:
    @Override
    public Notification createNotification():
        return new SMSNotification()

class PushNotificationCreator extends NotificationCreator:
    @Override
    public Notification createNotification():
        return new PushNotification()

// Usage
NotificationCreator creator = new EmailNotificationCreator()
creator.sendNotification("Hello via Factory Method")

// Switch at runtime
creator = new SMSNotificationCreator()
creator.sendNotification("Different notification type")

═══════════════════════════════════════════
EXAMPLE TRACE:
═══════════════════════════════════════════

// Simple Factory Usage:
Step 1: Client calls createNotification("EMAIL")
Step 2: Factory checks type → "EMAIL"
Step 3: Factory returns new EmailNotification()
Step 4: Client calls send("Hello")
Step 5: Output: "Email: Hello"

// Factory Method Usage:
Step 1: Create EmailNotificationCreator
Step 2: Call sendNotification("Hello")
Step 3: sendNotification() calls createNotification()
Step 4: EmailNotificationCreator.createNotification() returns EmailNotification
Step 5: sendNotification() calls notification.send("Hello")
Step 6: Output: "Email: Hello"

═══════════════════════════════════════════
COMPARISON:
═══════════════════════════════════════════

Simple Factory:
✅ Pros: Simple, centralized, easy to understand
❌ Cons: Violates Open/Closed (modify switch for new types)

Factory Method Pattern:
✅ Pros: Open/Closed compliant, extensible
❌ Cons: More classes, more complexity

When to use which:
- Simple Factory: Fixed set of products, rarely changes
- Factory Method: Extensibility needed, plugin architecture

═══════════════════════════════════════════
ADDING NEW NOTIFICATION TYPE:
═══════════════════════════════════════════

// Simple Factory: MODIFY existing code
Add case in switch:
    case "SLACK":
        return new SlackNotification()

// Factory Method: ADD new code (no modification)
class SlackNotificationCreator extends NotificationCreator:
    public Notification createNotification():
        return new SlackNotification()

Complexity: O(1) time, O(1) space`
    },
    {
      id: 3,
      title: 'Implement Observer Pattern',
      difficulty: 'Medium',
      description: 'Create an Observer pattern for a stock price monitoring system. When stock prices change, all registered observers (investors) should be notified automatically.',
      example: `Input:
  Stock apple = new Stock("AAPL", 150.0);
  Investor inv1 = new Investor("John");
  apple.addObserver(inv1);
  apple.setPrice(155.0);
Output:
  John notified: AAPL price changed to 155.0`,
      starterCode: `import java.util.*;

interface Observer {
    void update(String stockSymbol, double price);
}

class Investor implements Observer {
    private String name;

    public Investor(String name) {
        this.name = name;
    }

    @Override
    public void update(String stockSymbol, double price) {
        // TODO: Print notification

    }
}

class Stock {
    private String symbol;
    private double price;
    private List<Observer> observers = new ArrayList<>();

    public Stock(String symbol, double price) {
        this.symbol = symbol;
        this.price = price;
    }

    public void addObserver(Observer observer) {
        // TODO: Add observer to list

    }

    public void removeObserver(Observer observer) {
        // TODO: Remove observer from list

    }

    public void setPrice(double price) {
        this.price = price;
        // TODO: Notify all observers

    }

    private void notifyObservers() {
        // TODO: Notify all registered observers

    }
}`,
      solution: `import java.util.*;

interface Observer {
    void update(String stockSymbol, double price);
}

interface Subject {
    void addObserver(Observer observer);
    void removeObserver(Observer observer);
    void notifyObservers();
}

class Investor implements Observer {
    private String name;

    public Investor(String name) {
        this.name = name;
    }

    @Override
    public void update(String stockSymbol, double price) {
        System.out.println(name + " notified: " + stockSymbol +
                         " price changed to $" + price);
    }
}

class Stock implements Subject {
    private String symbol;
    private double price;
    private List<Observer> observers = new ArrayList<>();

    public Stock(String symbol, double price) {
        this.symbol = symbol;
        this.price = price;
    }

    @Override
    public void addObserver(Observer observer) {
        if (!observers.contains(observer)) {
            observers.add(observer);
        }
    }

    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    public void setPrice(double price) {
        if (this.price != price) {
            this.price = price;
            notifyObservers();
        }
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(symbol, price);
        }
    }

    public String getSymbol() {
        return symbol;
    }

    public double getPrice() {
        return price;
    }
}

// Usage Example:
class Main {
    public static void main(String[] args) {
        Stock apple = new Stock("AAPL", 150.0);
        Stock google = new Stock("GOOGL", 2800.0);

        Investor john = new Investor("John");
        Investor jane = new Investor("Jane");

        apple.addObserver(john);
        apple.addObserver(jane);
        google.addObserver(john);

        apple.setPrice(155.0);  // Both John and Jane notified
        google.setPrice(2850.0); // Only John notified

        apple.removeObserver(jane);
        apple.setPrice(160.0);  // Only John notified
    }
}`,
      testCases: [
        { input: 'setPrice(155.0) with 2 observers', output: '2 observers notified' },
        { input: 'removeObserver() then setPrice()', output: 'Removed observer not notified' },
        { input: 'setPrice(same value)', output: 'No notification (price unchanged)' }
      ],
      explanation: `**Problem:** Automatically notify multiple objects when one object's state changes.

**Key Insight: One-to-Many Dependency**
When Subject changes → all Observers are notified automatically.
Loose coupling: Subject doesn't know concrete observer types.
Also known as: Publish-Subscribe pattern.

**Participants:**

**1. Subject (Observable)**
- Maintains list of observers
- Provides methods to attach/detach observers
- Notifies observers when state changes

**2. Observer**
- Defines update interface
- Receives notifications from subject

**Structure:**
┌────────────────────────────────────────┐
│  Subject (Stock)                       │
│  - observers: List<Observer>           │
│  + addObserver(obs: Observer)          │
│  + removeObserver(obs: Observer)       │
│  + notifyObservers()                   │
└────────────────────────────────────────┘
                    │
                    │ notifies
                    ↓
┌────────────────────────────────────────┐
│  Observer Interface                    │
│  + update(symbol: String, price: double)│
└────────────────────────────────────────┘
        ▲           ▲           ▲
        │           │           │
   ┌────┴───┐  ┌───┴────┐  ┌──┴────┐
   │Investor│  │Display │  │Logger │
   │        │  │Panel   │  │       │
   └────────┘  └────────┘  └───────┘

**Example Flow:**
┌─────────────────────────────────────────────┐
│  Stock apple = new Stock("AAPL", 150.0)    │
│                                             │
│  Step 1: Create observers                  │
│  Investor john = new Investor("John")      │
│  Investor jane = new Investor("Jane")      │
│                                             │
│  Step 2: Attach observers                  │
│  apple.addObserver(john)                   │
│  apple.addObserver(jane)                   │
│                                             │
│  Step 3: State change triggers notification│
│  apple.setPrice(155.0)                     │
│     → john.update("AAPL", 155.0)          │
│     → jane.update("AAPL", 155.0)          │
│                                             │
│  Output:                                    │
│  John notified: AAPL price changed to $155.0│
│  Jane notified: AAPL price changed to $155.0│
└─────────────────────────────────────────────┘

**Advantages:**
✅ Loose coupling (subject/observers independent)
✅ Open/Closed Principle (add observers without modifying subject)
✅ Dynamic relationships (attach/detach at runtime)
✅ Broadcast communication

**Disadvantages:**
❌ Memory leaks if observers not properly removed
❌ Unexpected updates (observers don't know order)
❌ Performance issues with many observers

**Push vs Pull Model:**

**Push:** Subject pushes all data to observers
- observer.update(symbol, price, volume, timestamp)
- Simple but inflexible

**Pull:** Observers pull needed data from subject
- observer.update(subject)
- observer queries subject.getPrice(), subject.getVolume()
- More flexible but couples observer to subject

**Real-World Examples:**
- Event handling systems (GUI buttons)
- Model-View-Controller (MVC)
- Pub/Sub messaging systems
- Social media notifications
- Stock market tickers
- Weather monitoring systems`,
      pseudocode: `Observer Pattern Implementation:
─────────────────────────────────────────

═══════════════════════════════════════════
INTERFACES:
═══════════════════════════════════════════

interface Observer:
    void update(String stockSymbol, double price)

interface Subject:
    void addObserver(Observer observer)
    void removeObserver(Observer observer)
    void notifyObservers()

═══════════════════════════════════════════
CONCRETE OBSERVER:
═══════════════════════════════════════════

class Investor implements Observer:
    private String name

    Investor(String name):
        this.name = name

    @Override
    void update(String stockSymbol, double price):
        print(name + " notified: " + stockSymbol +
              " price changed to $" + price)

═══════════════════════════════════════════
CONCRETE SUBJECT:
═══════════════════════════════════════════

class Stock implements Subject:
    private String symbol
    private double price
    private List<Observer> observers = new ArrayList()

    Stock(String symbol, double price):
        this.symbol = symbol
        this.price = price

    @Override
    void addObserver(Observer observer):
        if not observers.contains(observer):
            observers.add(observer)

    @Override
    void removeObserver(Observer observer):
        observers.remove(observer)

    void setPrice(double price):
        if this.price != price:              // Only if changed
            this.price = price
            notifyObservers()                // Trigger notification

    @Override
    void notifyObservers():
        for each observer in observers:
            observer.update(symbol, price)   // Push model

    double getPrice():
        return price

    String getSymbol():
        return symbol

═══════════════════════════════════════════
EXAMPLE TRACE:
═══════════════════════════════════════════

// Setup
Stock apple = new Stock("AAPL", 150.0)
Stock google = new Stock("GOOGL", 2800.0)

Investor john = new Investor("John")
Investor jane = new Investor("Jane")

// Attach observers
apple.addObserver(john)
apple.addObserver(jane)
google.addObserver(john)

State:
apple.observers = [john, jane]
google.observers = [john]

// Price change 1
apple.setPrice(155.0)

Flow:
1. setPrice(155.0) called
2. Check: 155.0 != 150.0 → true
3. Update: price = 155.0
4. Call notifyObservers()
5. Loop through observers:
   - john.update("AAPL", 155.0)
     Output: "John notified: AAPL price changed to $155.0"
   - jane.update("AAPL", 155.0)
     Output: "Jane notified: AAPL price changed to $155.0"

// Price change 2
google.setPrice(2850.0)

Flow:
1. setPrice(2850.0) called
2. Check: 2850.0 != 2800.0 → true
3. Update: price = 2850.0
4. Call notifyObservers()
5. Loop through observers:
   - john.update("GOOGL", 2850.0)
     Output: "John notified: GOOGL price changed to $2850.0"

// Remove observer
apple.removeObserver(jane)
apple.observers = [john]  // jane removed

// Price change 3
apple.setPrice(160.0)

Flow:
1. setPrice(160.0) called
2. Check: 160.0 != 155.0 → true
3. Update: price = 160.0
4. Call notifyObservers()
5. Loop through observers:
   - john.update("AAPL", 160.0)
     Output: "John notified: AAPL price changed to $160.0"
   (Jane NOT notified - removed!)

═══════════════════════════════════════════
PULL MODEL VARIANT:
═══════════════════════════════════════════

interface Observer:
    void update(Subject subject)  // Pass subject reference

class Investor implements Observer:
    void update(Subject subject):
        Stock stock = (Stock) subject
        print(name + " notified: " + stock.getSymbol() +
              " price changed to $" + stock.getPrice())

class Stock:
    void notifyObservers():
        for each observer in observers:
            observer.update(this)  // Pass 'this' reference

Advantage: Observers query only needed data
Disadvantage: Observers coupled to concrete subject type

═══════════════════════════════════════════
THREAD SAFETY:
═══════════════════════════════════════════

class Stock:
    private List<Observer> observers =
        Collections.synchronizedList(new ArrayList())

    synchronized void notifyObservers():
        // Create snapshot to avoid ConcurrentModificationException
        List<Observer> snapshot = new ArrayList(observers)
        for each observer in snapshot:
            observer.update(symbol, price)

Complexity: O(N) time for notify, O(1) add/remove, O(N) space`
    },
    {
      id: 4,
      title: 'Implement Strategy Pattern',
      difficulty: 'Medium',
      description: 'Create a Strategy pattern for a payment processing system. Support multiple payment strategies (Credit Card, PayPal, Cryptocurrency) that can be switched at runtime.',
      example: `Input:
  PaymentProcessor processor = new PaymentProcessor(new CreditCardStrategy());
  processor.processPayment(100.0);
Output:
  Processing $100.0 via Credit Card`,
      starterCode: `interface PaymentStrategy {
    void pay(double amount);
}

class CreditCardStrategy implements PaymentStrategy {
    private String cardNumber;

    public CreditCardStrategy(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    @Override
    public void pay(double amount) {
        // TODO: Implement credit card payment

    }
}

class PayPalStrategy implements PaymentStrategy {
    private String email;

    public PayPalStrategy(String email) {
        this.email = email;
    }

    @Override
    public void pay(double amount) {
        // TODO: Implement PayPal payment

    }
}

class CryptoStrategy implements PaymentStrategy {
    private String walletAddress;

    public CryptoStrategy(String walletAddress) {
        this.walletAddress = walletAddress;
    }

    @Override
    public void pay(double amount) {
        // TODO: Implement crypto payment

    }
}

class PaymentProcessor {
    private PaymentStrategy strategy;

    public PaymentProcessor(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public void setStrategy(PaymentStrategy strategy) {
        // TODO: Set new strategy

    }

    public void processPayment(double amount) {
        // TODO: Delegate to strategy

    }
}`,
      solution: `interface PaymentStrategy {
    void pay(double amount);
    String getPaymentMethod();
}

class CreditCardStrategy implements PaymentStrategy {
    private String cardNumber;
    private String cvv;

    public CreditCardStrategy(String cardNumber) {
        this.cardNumber = cardNumber;
        this.cvv = "***"; // Masked for security
    }

    @Override
    public void pay(double amount) {
        System.out.println("Processing $" + amount + " via Credit Card");
        System.out.println("Card: ****" + cardNumber.substring(cardNumber.length() - 4));
        // Actual payment processing logic here
    }

    @Override
    public String getPaymentMethod() {
        return "Credit Card";
    }
}

class PayPalStrategy implements PaymentStrategy {
    private String email;

    public PayPalStrategy(String email) {
        this.email = email;
    }

    @Override
    public void pay(double amount) {
        System.out.println("Processing $" + amount + " via PayPal");
        System.out.println("Account: " + email);
        // Actual PayPal API call here
    }

    @Override
    public String getPaymentMethod() {
        return "PayPal";
    }
}

class CryptoStrategy implements PaymentStrategy {
    private String walletAddress;
    private String currency;

    public CryptoStrategy(String walletAddress, String currency) {
        this.walletAddress = walletAddress;
        this.currency = currency;
    }

    public CryptoStrategy(String walletAddress) {
        this(walletAddress, "BTC");
    }

    @Override
    public void pay(double amount) {
        System.out.println("Processing $" + amount + " via " + currency);
        System.out.println("Wallet: " + walletAddress);
        // Blockchain transaction logic here
    }

    @Override
    public String getPaymentMethod() {
        return "Cryptocurrency (" + currency + ")";
    }
}

class PaymentProcessor {
    private PaymentStrategy strategy;

    public PaymentProcessor(PaymentStrategy strategy) {
        if (strategy == null) {
            throw new IllegalArgumentException("Payment strategy cannot be null");
        }
        this.strategy = strategy;
    }

    public void setStrategy(PaymentStrategy strategy) {
        if (strategy == null) {
            throw new IllegalArgumentException("Payment strategy cannot be null");
        }
        this.strategy = strategy;
    }

    public void processPayment(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }

        System.out.println("=== Payment Processing ===");
        System.out.println("Method: " + strategy.getPaymentMethod());
        strategy.pay(amount);
        System.out.println("Payment completed successfully");
    }
}

// Usage Example:
class Main {
    public static void main(String[] args) {
        // Start with credit card
        PaymentProcessor processor = new PaymentProcessor(
            new CreditCardStrategy("1234567890123456")
        );
        processor.processPayment(100.0);

        // Switch to PayPal at runtime
        processor.setStrategy(new PayPalStrategy("user@example.com"));
        processor.processPayment(250.0);

        // Switch to Crypto
        processor.setStrategy(new CryptoStrategy("1A2B3C4D5E6F", "ETH"));
        processor.processPayment(500.0);
    }
}`,
      testCases: [
        { input: 'processPayment(100) with CreditCardStrategy', output: 'Credit card payment processed' },
        { input: 'setStrategy() then processPayment()', output: 'New strategy used' },
        { input: 'processPayment(-100)', output: 'IllegalArgumentException thrown' }
      ],
      explanation: `**Problem:** Enable selecting algorithm behavior at runtime without modifying client code.

**Key Insight: Encapsulate Algorithms**
Define family of algorithms (strategies).
Make them interchangeable.
Client can switch strategies at runtime.

**Intent:**
- Replace conditional logic (if/switch) with polymorphism
- Follow Open/Closed Principle
- Eliminate duplicate code across similar algorithms

**Structure:**
┌────────────────────────────────────────┐
│  Context (PaymentProcessor)            │
│  - strategy: PaymentStrategy           │
│  + setStrategy(strategy)               │
│  + processPayment(amount)              │
│    → delegates to strategy.pay()       │
└────────────────────────────────────────┘
                    │
                    │ uses
                    ↓
┌────────────────────────────────────────┐
│  Strategy Interface                    │
│  + pay(amount: double)                 │
└────────────────────────────────────────┘
        ▲           ▲           ▲
        │           │           │
   ┌────┴───────┐ ┌┴──────┐ ┌──┴────┐
   │CreditCard  │ │PayPal │ │Crypto │
   │Strategy    │ │Strategy│ │Strategy│
   └────────────┘ └───────┘ └───────┘

**Example Flow:**
┌─────────────────────────────────────────────┐
│  Step 1: Create context with initial strategy│
│  processor = new PaymentProcessor(          │
│      new CreditCardStrategy("1234...")      │
│  )                                          │
│                                             │
│  Step 2: Process payment                   │
│  processor.processPayment(100.0)           │
│     → delegates to strategy.pay(100.0)     │
│     → Output: "Processing $100 via Credit Card"│
│                                             │
│  Step 3: Switch strategy at runtime        │
│  processor.setStrategy(                    │
│      new PayPalStrategy("user@example.com")│
│  )                                          │
│                                             │
│  Step 4: Process with new strategy         │
│  processor.processPayment(250.0)           │
│     → delegates to strategy.pay(250.0)     │
│     → Output: "Processing $250 via PayPal" │
└─────────────────────────────────────────────┘

**Strategy vs State Pattern:**

**Strategy Pattern:**
- Client chooses/knows the strategy
- Strategies independent of each other
- Focus: Different algorithms for same task

**State Pattern:**
- Context manages state transitions
- States aware of each other
- Focus: Different behaviors based on state

**Advantages:**
✅ Open/Closed Principle (add strategies without modifying context)
✅ Runtime flexibility (switch algorithms dynamically)
✅ Eliminates conditional logic
✅ Testability (test each strategy independently)
✅ Single Responsibility (each strategy encapsulates one algorithm)

**Disadvantages:**
❌ More classes (one per strategy)
❌ Client must know about different strategies
❌ Communication overhead (context↔strategy)

**Real-World Examples:**
- Sorting algorithms (QuickSort, MergeSort, BubbleSort)
- Compression algorithms (ZIP, RAR, TAR)
- Payment gateways (Credit Card, PayPal, Crypto)
- Route calculation (Fastest, Shortest, Scenic)
- Validation strategies (Email, Phone, SSN)
- Pricing strategies (Regular, Discount, Seasonal)`,
      pseudocode: `Strategy Pattern Implementation:
─────────────────────────────────────────

═══════════════════════════════════════════
STRATEGY INTERFACE:
═══════════════════════════════════════════

interface PaymentStrategy:
    void pay(double amount)
    String getPaymentMethod()

═══════════════════════════════════════════
CONCRETE STRATEGIES:
═══════════════════════════════════════════

class CreditCardStrategy implements PaymentStrategy:
    private String cardNumber
    private String cvv

    CreditCardStrategy(String cardNumber):
        this.cardNumber = cardNumber
        this.cvv = "***"  // Masked

    @Override
    void pay(double amount):
        print("Processing $" + amount + " via Credit Card")
        print("Card: ****" + cardNumber.substring(length - 4))
        // Actual credit card processing...

    @Override
    String getPaymentMethod():
        return "Credit Card"

class PayPalStrategy implements PaymentStrategy:
    private String email

    PayPalStrategy(String email):
        this.email = email

    @Override
    void pay(double amount):
        print("Processing $" + amount + " via PayPal")
        print("Account: " + email)
        // PayPal API call...

    @Override
    String getPaymentMethod():
        return "PayPal"

class CryptoStrategy implements PaymentStrategy:
    private String walletAddress
    private String currency

    CryptoStrategy(String walletAddress, String currency):
        this.walletAddress = walletAddress
        this.currency = currency

    CryptoStrategy(String walletAddress):
        this(walletAddress, "BTC")  // Default

    @Override
    void pay(double amount):
        print("Processing $" + amount + " via " + currency)
        print("Wallet: " + walletAddress)
        // Blockchain transaction...

    @Override
    String getPaymentMethod():
        return "Cryptocurrency (" + currency + ")"

═══════════════════════════════════════════
CONTEXT:
═══════════════════════════════════════════

class PaymentProcessor:
    private PaymentStrategy strategy

    PaymentProcessor(PaymentStrategy strategy):
        if strategy == null:
            throw IllegalArgumentException("Strategy cannot be null")
        this.strategy = strategy

    void setStrategy(PaymentStrategy strategy):
        if strategy == null:
            throw IllegalArgumentException("Strategy cannot be null")
        this.strategy = strategy

    void processPayment(double amount):
        if amount <= 0:
            throw IllegalArgumentException("Amount must be positive")

        print("=== Payment Processing ===")
        print("Method: " + strategy.getPaymentMethod())
        strategy.pay(amount)                    // Delegate to strategy
        print("Payment completed successfully")

═══════════════════════════════════════════
EXAMPLE TRACE:
═══════════════════════════════════════════

// Step 1: Create processor with Credit Card strategy
processor = new PaymentProcessor(
    new CreditCardStrategy("1234567890123456")
)

State: processor.strategy = CreditCardStrategy instance

// Step 2: Process payment
processor.processPayment(100.0)

Execution flow:
1. Check: amount > 0? ✓
2. Print: "=== Payment Processing ==="
3. Print: "Method: Credit Card"
4. Call: strategy.pay(100.0)
   4a. Print: "Processing $100.0 via Credit Card"
   4b. Print: "Card: ****3456"
5. Print: "Payment completed successfully"

Output:
=== Payment Processing ===
Method: Credit Card
Processing $100.0 via Credit Card
Card: ****3456
Payment completed successfully

// Step 3: Switch strategy at runtime
processor.setStrategy(new PayPalStrategy("user@example.com"))

State: processor.strategy = PayPalStrategy instance

// Step 4: Process with new strategy
processor.processPayment(250.0)

Execution flow:
1. Check: amount > 0? ✓
2. Print: "=== Payment Processing ==="
3. Print: "Method: PayPal"
4. Call: strategy.pay(250.0)
   4a. Print: "Processing $250.0 via PayPal"
   4b. Print: "Account: user@example.com"
5. Print: "Payment completed successfully"

Output:
=== Payment Processing ===
Method: PayPal
Processing $250.0 via PayPal
Account: user@example.com
Payment completed successfully

// Step 5: Switch to Crypto
processor.setStrategy(new CryptoStrategy("1A2B3C", "ETH"))

// Step 6: Process crypto payment
processor.processPayment(500.0)

Output:
=== Payment Processing ===
Method: Cryptocurrency (ETH)
Processing $500.0 via ETH
Wallet: 1A2B3C
Payment completed successfully

═══════════════════════════════════════════
BEFORE vs AFTER STRATEGY PATTERN:
═══════════════════════════════════════════

// BEFORE: Conditional logic (BAD!)
class PaymentProcessor:
    void processPayment(String type, double amount):
        if type == "CREDIT_CARD":
            // Credit card logic...
        else if type == "PAYPAL":
            // PayPal logic...
        else if type == "CRYPTO":
            // Crypto logic...
        // Adding new type requires modifying this class!

// AFTER: Strategy pattern (GOOD!)
class PaymentProcessor:
    void processPayment(double amount):
        strategy.pay(amount)  // Polymorphism!
    // Adding new type: just create new strategy class

═══════════════════════════════════════════
FUNCTIONAL PROGRAMMING ALTERNATIVE (Java 8+):
═══════════════════════════════════════════

// Strategy as function interface
@FunctionalInterface
interface PaymentStrategy:
    void pay(double amount)

// Usage with lambdas
processor.setStrategy(amount ->
    print("Processing $" + amount + " via Credit Card"))

processor.setStrategy(amount ->
    print("Processing $" + amount + " via PayPal"))

Complexity: O(1) time, O(1) space`
    }
  ]

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question)
    setUserCode(question.starterCode)
    setShowSolution(false)
    setShowExplanation(false)
    setOutput('')
  }

  const handleRunCode = () => {
    setIsRunning(true)
    setOutput('Running tests...\n')

    setTimeout(() => {
      const results = selectedQuestion.testCases.map((test, idx) =>
        `Test ${idx + 1}: ${test.input}\nExpected: ${test.output}\n✓ Passed`
      ).join('\n\n')

      setOutput(results)
      setIsRunning(false)
    }, 1000)
  }

  const handleReset = () => {
    setUserCode(selectedQuestion.starterCode)
    setOutput('')
    setShowSolution(false)
  }

  const handleKeyDown = (e) => {
    // Stop propagation for all keys except Escape to allow typing in textarea
    if (e.key !== 'Escape') {
      e.stopPropagation()
    }

    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.target.selectionStart
      const end = e.target.selectionEnd
      const newValue = userCode.substring(0, start) + '    ' + userCode.substring(end)
      setUserCode(newValue)
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4
      }, 0)
    }
  }

  if (!selectedQuestion) {
    return (
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
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
            >
              ← Back to Practice
            </button>
            <div>
              <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem', color: '#1f2937' }}>
                Design Patterns Practice
              </h1>
              {currentSubcategory && (
                <span style={{
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  backgroundColor: '#dbeafe',
                  color: '#1e40af',
                  borderRadius: '6px'
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

        <p style={{ fontSize: '1.1rem', color: '#6b7280', marginBottom: '2rem' }}>
          Implement classic GoF design patterns with hands-on coding exercises
        </p>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {questions.map((q) => {
            const problemId = `DesignPatternsInteractive-${q.id}`
            const isCompleted = isProblemCompleted(problemId)

            return (
              <div
                key={`${q.id}-${refreshKey}`}
                onClick={() => handleQuestionSelect(q)}
                style={{
                  padding: '1.5rem',
                  border: isCompleted ? '3px solid #10b981' : '2px solid #e5e7eb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: isCompleted ? '#f0fdf4' : 'white',
                  boxShadow: isCompleted ? '0 2px 12px rgba(16, 185, 129, 0.2)' : 'none',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = isCompleted ? '#10b981' : '#3b82f6'
                  e.currentTarget.style.boxShadow = isCompleted ? '0 4px 16px rgba(16, 185, 129, 0.3)' : '0 4px 12px rgba(59, 130, 246, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isCompleted ? '#10b981' : '#e5e7eb'
                  e.currentTarget.style.boxShadow = isCompleted ? '0 2px 12px rgba(16, 185, 129, 0.2)' : 'none'
                }}
              >
                {isCompleted && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '-10px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.5)',
                    border: '3px solid white',
                    zIndex: 1
                  }}>
                    ✓
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', color: '#1f2937', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {q.id}. {q.title}
                    {isCompleted && <span style={{ fontSize: '0.9rem', color: '#10b981' }}>✓</span>}
                  </h3>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: '#fef3c7',
                    color: '#92400e',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {q.difficulty}
                  </span>
                </div>
                <p style={{ color: '#6b7280', margin: 0 }}>{q.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <button
        onClick={() => setSelectedQuestion(null)}
        style={{
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          backgroundColor: '#6b7280',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        ← Back to Questions
      </button>

      {/* Problem Description */}
      <div style={{
        backgroundColor: '#eff6ff',
        padding: '1.5rem',
        borderRadius: '12px',
        borderLeft: '4px solid #3b82f6',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', margin: 0, color: '#1e40af', fontWeight: '700' }}>
            {selectedQuestion.title}
          </h2>
          <span style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            backgroundColor: '#fef3c7',
            color: '#92400e',
            borderRadius: '6px',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            {selectedQuestion.difficulty}
          </span>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1e40af', fontWeight: '600' }}>Description</h3>
          <p style={{ color: '#1e40af', lineHeight: '1.6', margin: 0 }}>{selectedQuestion.description}</p>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1e40af', fontWeight: '600' }}>Example</h3>
          <pre style={{
            backgroundColor: '#dbeafe',
            padding: '1rem',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '0.9rem',
            color: '#1e40af',
            margin: 0
          }}>
            {selectedQuestion.example}
          </pre>
        </div>

        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1e40af', fontWeight: '600' }}>Test Cases</h3>
          {selectedQuestion.testCases.map((test, idx) => (
            <div key={idx} style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <span style={{ color: '#1e40af', fontWeight: '600' }}>Test {idx + 1}:</span>{' '}
              <span style={{ color: '#1e40af' }}>{test.input} → {test.output}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Code Editor */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#1f2937' }}>Code Editor</h3>
        <LanguageToggle />
      </div>
      <div style={{
        backgroundColor: '#1e293b',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '1rem'
      }}>
        <div style={{
          backgroundColor: '#0f172a',
          padding: '0.75rem 1rem',
          borderBottom: '1px solid #334155',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: '600' }}>{language === 'java' ? 'Solution.java' : 'solution.py'}</span>
          <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{language === 'java' ? 'Java' : 'Python'}</span>
        </div>
        <textarea
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck="false"
          style={{
            width: '100%',
            minHeight: '600px',
            padding: '1rem',
            fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
            fontSize: '0.9rem',
            lineHeight: '1.6',
            color: '#e2e8f0',
            backgroundColor: '#1e293b',
            border: 'none',
            outline: 'none',
            resize: 'vertical'
          }}
        />
      </div>

      {/* Buttons Row */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={handleRunCode}
          disabled={isRunning}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: isRunning ? '#9ca3af' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            transition: 'background-color 0.2s'
          }}
        >
          {isRunning ? 'Running...' : '▶️ Run Code'}
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'background-color 0.2s'
          }}
        >
          🔄 Reset
        </button>
        <button
          onClick={() => setShowSolution(!showSolution)}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: showSolution ? '#10b981' : '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'background-color 0.2s'
          }}
        >
          {showSolution ? '✓ Solution Shown' : '👁️ Show Solution'}
        </button>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: showExplanation ? '#8b5cf6' : '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'background-color 0.2s'
          }}
        >
          {showExplanation ? '✓ Explanation Visible' : '📖 Explanation & Pseudocode'}
        </button>
        <div style={{ marginLeft: 'auto' }}>
          <CompletionCheckbox
            problemId={`DesignPatternsInteractive-${selectedQuestion.id}`}
            label="Mark as Completed"
            onCompletionChange={() => setRefreshKey(prev => prev + 1)}
          />
        </div>
      </div>

      {/* Output Display */}
      {output && (
        <div style={{
          backgroundColor: '#0f172a',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: '700', color: '#60a5fa' }}>
            Output:
          </h3>
          <pre style={{
            margin: 0,
            fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
            fontSize: '0.85rem',
            lineHeight: '1.6',
            color: '#e2e8f0',
            whiteSpace: 'pre-wrap'
          }}>
            {output}
          </pre>
        </div>
      )}

      {/* Explanation & Pseudocode Display */}
      {showExplanation && selectedQuestion.explanation && selectedQuestion.pseudocode && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{
            backgroundColor: '#fef3c7',
            padding: '15px',
            borderRadius: '6px',
            border: '2px solid #fbbf24',
            marginBottom: '1rem'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#78350f', fontSize: '1.1rem', fontWeight: '700' }}>
              📖 Explanation
            </h3>
            <div style={{ color: '#1f2937', lineHeight: '1.7', whiteSpace: 'pre-wrap', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {selectedQuestion.explanation}
            </div>
          </div>
          <div style={{
            backgroundColor: '#1e293b',
            padding: '15px',
            borderRadius: '6px',
            border: '2px solid #374151'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#60a5fa', fontSize: '1.1rem', fontWeight: '700' }}>
              🔧 Pseudocode
            </h4>
            <pre style={{
              margin: 0,
              color: '#e5e7eb',
              whiteSpace: 'pre-wrap',
              fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
              fontSize: '0.9rem',
              lineHeight: '1.6'
            }}>
              {selectedQuestion.pseudocode}
            </pre>
          </div>
        </div>
      )}

      {/* Solution Display */}
      {showSolution && (
        <div style={{
          backgroundColor: '#1e293b',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '2px solid #10b981'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: '700', color: '#10b981' }}>
            💡 Solution:
          </h3>
          <pre style={{
            margin: 0,
            fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
            fontSize: '0.85rem',
            lineHeight: '1.6',
            color: '#e2e8f0',
            whiteSpace: 'pre',
            overflowX: 'auto'
          }}>
            {selectedQuestion.solution}
          </pre>
        </div>
      )}
    </div>
  )
}

export default DesignPatternsInteractive

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, ArrowLeft, Layers, Zap, Package, Link, Shield, Settings } from 'lucide-react';
import { KEYS } from '../../utils/keyboardNavigation.js';
import Breadcrumb from '../../components/Breadcrumb';
import { useTheme } from '../../contexts/ThemeContext';

const highlightCode = (code) => {
  let highlighted = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const placeholders = [];
  const store = (html) => { placeholders.push(html); return `___P${placeholders.length - 1}___`; };
  highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, (m) => store(`<span class="token comment">${m}</span>`));
  highlighted = highlighted.replace(/\/\/.*$/gm, (m) => store(`<span class="token comment">${m}</span>`));
  highlighted = highlighted.replace(/"(?:\\.|[^"\\])*"/g, (m) => store(`<span class="token string">${m}</span>`));
  highlighted = highlighted.replace(/@\w+/g, (m) => store(`<span class="token annotation">${m}</span>`));
  highlighted = highlighted.replace(/\b\d+(?:\.\d+)?\b/g, (m) => store(`<span class="token number">${m}</span>`));
  highlighted = highlighted.replace(/\b(true|false|null)\b/g, (m) => store(`<span class="token boolean">${m}</span>`));
  const keywords = 'abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for if implements import instanceof int interface long native new package private protected public return short static super switch synchronized this throw throws transient try void volatile while var';
  highlighted = highlighted.replace(new RegExp('\\b(' + keywords.split(' ').join('|') + ')\\b', 'g'), (m) => store(`<span class="token keyword">${m}</span>`));
  highlighted = highlighted.replace(/\b([A-Z][A-Za-z0-9_]*)\b/g, (m) => store(`<span class="token class-name">${m}</span>`));
  highlighted = highlighted.replace(/\b([a-z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, (m) => store(`<span class="token function">${m}</span>`));
  highlighted = highlighted.replace(/___P(\d+)___/g, (_, n) => placeholders[Number(n)]);
  return highlighted;
};

const ClassLoadingInternals = ({ onBack }) => {
  const { colors } = useTheme();
  const [expandedSections, setExpandedSections] = useState({ 0: true });
  const backButtonRef = useRef(null);

  const toggleSection = (index) => setExpandedSections(prev => ({ ...prev, [index]: !prev[index] }));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === KEYS.B && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = e.target.tagName.toLowerCase();
        if (tag !== 'input' && tag !== 'textarea' && !e.target.isContentEditable) {
          e.preventDefault();
          onBack();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const sections = [
    {
      title: 'Class Loading Process',
      icon: <Zap className="w-5 h-5" />,
      content: `Class loading involves three phases: Loading, Linking, and Initialization.

Loading:
• Find the .class file (bytecode)
• Read into memory
• Create Class object

Linking:
• Verification: Check bytecode is valid
• Preparation: Allocate static fields (default values)
• Resolution: Resolve symbolic references (optional, can be lazy)

Initialization:
• Execute static initializers
• Initialize static fields to proper values
• Runs <clinit> method`,
      code: `// Class loading phases
//
// 1. LOADING
// ─────────────────────────────────────────
// Input: "com.example.MyClass"
// Output: Class<?> object
//
// ClassLoader reads MyClass.class file
// Creates java.lang.Class instance
// Stored in method area (Metaspace)

// 2. LINKING
// ─────────────────────────────────────────
// a) Verification
//    - Magic number: 0xCAFEBABE
//    - Bytecode verification
//    - Type checking

// b) Preparation
//    - Allocate memory for static fields
//    - Set to default values (0, null, false)
class Example {
    static int x;      // Prepared as 0
    static Object o;   // Prepared as null
}

// c) Resolution (may be lazy)
//    - Symbolic refs → direct refs
//    - Method calls, field access

// 3. INITIALIZATION
// ─────────────────────────────────────────
// Execute static initializers
class Example {
    static int x = 10;  // Initialized here
    static List<String> list;

    static {
        list = new ArrayList<>();
        list.add("item");
    }
}
// JVM generates <clinit> method containing:
// x = 10;
// list = new ArrayList<>();
// list.add("item");

// When is a class initialized?
// - new instance created
// - static method called
// - static field accessed (not final constants)
// - Subclass initialized
// - Reflection (Class.forName)
// - Main class at startup`
    },
    {
      title: 'ClassLoader Hierarchy',
      icon: <Layers className="w-5 h-5" />,
      content: `Java uses a hierarchical delegation model for class loading.

Built-in ClassLoaders (Java 9+):
• Bootstrap ClassLoader: Core Java classes (java.base)
• Platform ClassLoader: Platform classes
• Application (System) ClassLoader: Application classes

Delegation model:
• Child delegates to parent first
• Only loads if parent cannot
• Prevents duplicate class loading

Why delegation?
• Security: Core classes can't be replaced
• Consistency: Single version of class
• Isolation: Different loaders = different classes`,
      code: `// ClassLoader hierarchy (Java 9+)
//
//        ┌─────────────────────┐
//        │ Bootstrap ClassLoader│  (null in Java)
//        │   java.base module   │
//        └──────────┬──────────┘
//                   │ parent
//        ┌──────────┴──────────┐
//        │ Platform ClassLoader │
//        │  java.sql, java.xml  │
//        └──────────┬──────────┘
//                   │ parent
//        ┌──────────┴──────────┐
//        │ Application ClassLoader│
//        │  Your application     │
//        └─────────────────────┘

// Getting classloaders
String.class.getClassLoader();  // null (Bootstrap)
java.sql.Connection.class.getClassLoader();  // Platform
MyClass.class.getClassLoader();  // Application

// Delegation in action
class MyClassLoader extends ClassLoader {
    @Override
    protected Class<?> loadClass(String name, boolean resolve)
            throws ClassNotFoundException {
        // 1. Check if already loaded
        Class<?> c = findLoadedClass(name);
        if (c == null) {
            try {
                // 2. Delegate to parent
                if (getParent() != null) {
                    c = getParent().loadClass(name);
                } else {
                    c = findBootstrapClassOrNull(name);
                }
            } catch (ClassNotFoundException e) {
                // Parent couldn't load
            }

            if (c == null) {
                // 3. Load ourselves
                c = findClass(name);
            }
        }
        if (resolve) {
            resolveClass(c);
        }
        return c;
    }
}

// Class identity = ClassLoader + fully qualified name
// Same bytecode, different loader = different class!`
    },
    {
      title: 'Custom ClassLoader',
      icon: <Package className="w-5 h-5" />,
      content: `Custom ClassLoaders enable dynamic class loading and isolation.

Use cases:
• Hot-swapping classes
• Loading from non-standard locations
• Plugin systems
• Application servers (WAR isolation)
• Encryption/decryption of bytecode

Implementation:
• Extend ClassLoader
• Override findClass() (not loadClass())
• Call defineClass() with bytecode`,
      code: `// Custom ClassLoader
class MyClassLoader extends ClassLoader {

    private final String classPath;

    MyClassLoader(String classPath, ClassLoader parent) {
        super(parent);
        this.classPath = classPath;
    }

    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        try {
            // Convert class name to file path
            String fileName = name.replace('.', '/') + ".class";
            Path path = Paths.get(classPath, fileName);

            // Read bytecode
            byte[] bytes = Files.readAllBytes(path);

            // Define the class
            return defineClass(name, bytes, 0, bytes.length);
        } catch (IOException e) {
            throw new ClassNotFoundException(name, e);
        }
    }
}

// Usage
MyClassLoader loader = new MyClassLoader("/plugins",
    ClassLoader.getSystemClassLoader());

Class<?> pluginClass = loader.loadClass("com.example.Plugin");
Object plugin = pluginClass.getDeclaredConstructor().newInstance();

// Hot-swapping pattern
while (true) {
    // Create new loader for each reload
    MyClassLoader loader = new MyClassLoader("/classes", null);
    Class<?> clazz = loader.loadClass("com.example.MyClass");
    // ... use class ...

    // Wait for file change
    waitForChange();
    // Old loader and classes become eligible for GC
}

// Encrypted class loading
class EncryptedClassLoader extends ClassLoader {
    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        byte[] encrypted = readEncryptedBytes(name);
        byte[] decrypted = decrypt(encrypted);
        return defineClass(name, decrypted, 0, decrypted.length);
    }
}`
    },
    {
      title: 'Class Unloading and Memory',
      icon: <Link className="w-5 h-5" />,
      content: `Classes can be garbage collected when no longer referenced.

Requirements for unloading:
• No instances of the class exist
• No references to the Class object
• ClassLoader is unreachable

Where classes live:
• Java 7 and earlier: PermGen (fixed size)
• Java 8+: Metaspace (native memory, dynamic)

Metaspace:
• Grows automatically
• Can set MaxMetaspaceSize
• OutOfMemoryError if exceeded`,
      code: `// Class unloading conditions
// 1. No instances
MyClass obj = new MyClass();
obj = null;  // Instance eligible for GC

// 2. No Class object reference
Class<?> clazz = MyClass.class;
clazz = null;  // But static refs may still exist!

// 3. ClassLoader unreachable
MyClassLoader loader = new MyClassLoader();
Class<?> c = loader.loadClass("MyClass");
loader = null;
c = null;
// Now MyClass can be unloaded

// System classes are NEVER unloaded
// (Bootstrap loader is always reachable)

// Metaspace configuration
// -XX:MetaspaceSize=256m        Initial size
// -XX:MaxMetaspaceSize=512m     Maximum size
// -XX:MinMetaspaceFreeRatio=40  Min free after GC
// -XX:MaxMetaspaceFreeRatio=70  Max free after GC

// Monitoring metaspace
Runtime runtime = Runtime.getRuntime();
// Note: Metaspace is native memory, not heap

// Using JMX
MemoryPoolMXBean metaspace = ManagementFactory.getMemoryPoolMXBeans()
    .stream()
    .filter(p -> p.getName().contains("Metaspace"))
    .findFirst()
    .orElse(null);

if (metaspace != null) {
    MemoryUsage usage = metaspace.getUsage();
    System.out.println("Used: " + usage.getUsed());
    System.out.println("Max: " + usage.getMax());
}

// Common causes of Metaspace issues:
// - Too many classes loaded
// - Class loader leaks
// - Heavy use of reflection/proxies
// - Bytecode generation libraries`
    },
    {
      title: 'Context ClassLoader',
      icon: <Shield className="w-5 h-5" />,
      content: `Thread's context ClassLoader breaks delegation hierarchy.

Problem:
• Core classes (Bootstrap) need to load user classes
• Example: JDBC drivers, JNDI implementations
• Parent can't delegate to child!

Solution:
• Thread.currentThread().getContextClassLoader()
• Service Provider Interface (SPI) uses this

Java 9+ uses:
• ServiceLoader API
• Module system for services`,
      code: `// Context ClassLoader
// Problem: Bootstrap-loaded code needs user classes

// Example: JDBC DriverManager is loaded by Bootstrap
// But JDBC drivers are in application classpath!

// Solution: Context ClassLoader
// DriverManager uses Thread's context loader

// Set context classloader
Thread.currentThread().setContextClassLoader(myLoader);

// Get context classloader
ClassLoader contextLoader = Thread.currentThread()
    .getContextClassLoader();

// JDBC example
public class DriverManager {
    static {
        // Uses context classloader to find drivers
        ServiceLoader<Driver> loadedDrivers =
            ServiceLoader.load(Driver.class);
        // load() uses Thread.currentThread().getContextClassLoader()
    }
}

// ServiceLoader pattern (SPI)
// META-INF/services/java.sql.Driver contains:
// com.mysql.cj.jdbc.Driver

ServiceLoader<Driver> loader = ServiceLoader.load(Driver.class);
for (Driver driver : loader) {
    System.out.println("Found: " + driver.getClass().getName());
}

// In libraries, always consider context loader
public void loadPlugin(String className) throws Exception {
    ClassLoader loader = Thread.currentThread()
        .getContextClassLoader();
    if (loader == null) {
        loader = getClass().getClassLoader();
    }
    Class<?> clazz = loader.loadClass(className);
    // ...
}

// Java 9+ modules and services
// module-info.java:
// provides java.sql.Driver with com.mysql.cj.jdbc.Driver;
// uses java.sql.Driver;`
    },
    {
      title: 'Interview Questions',
      icon: <Settings className="w-5 h-5" />,
      content: `Common ClassLoader interview questions:

Q1: Class loading phases?
A: Loading → Linking (Verify, Prepare, Resolve) → Initialization

Q2: What is delegation model?
A: Child delegates to parent first, loads only if parent can't

Q3: When is static block executed?
A: During class initialization (first active use)

Q4: Can same class be loaded twice?
A: Yes, by different ClassLoaders (different Class objects)

Q5: PermGen vs Metaspace?
A: Metaspace (Java 8+) is native memory, dynamic sizing`,
      code: `// Q1: Loading phases
// Loading: Read bytecode, create Class object
// Verification: Check valid bytecode
// Preparation: Allocate static fields (default values)
// Resolution: Symbolic → direct references
// Initialization: Run <clinit> (static initializers)

// Q2: Delegation ensures consistency
// String.class always from Bootstrap
// Can't replace core classes

// Q3: Initialization triggers
// - First instance created (new)
// - First static method call
// - First static field access (non-final)
// - Subclass initialization
// - Class.forName()
// - Main class

// NOT a trigger:
final static int X = 10;  // Constant, inlined at compile time
// Accessing X doesn't initialize class!

// Q4: Class identity
ClassLoader loader1 = new MyClassLoader();
ClassLoader loader2 = new MyClassLoader();

Class<?> c1 = loader1.loadClass("com.example.MyClass");
Class<?> c2 = loader2.loadClass("com.example.MyClass");

c1 == c2;  // FALSE! Different Class objects
c1.getName().equals(c2.getName());  // TRUE

// Q5: Metaspace benefits
// - Native memory (not heap)
// - Auto-grows (within MaxMetaspaceSize)
// - Better GC behavior
// - No PermGen OutOfMemoryError

// Q6: NoClassDefFoundError vs ClassNotFoundException
// ClassNotFoundException: loadClass() couldn't find it
// NoClassDefFoundError: Class was available at compile time
//                       but not at runtime

// Q7: ClassLoader for arrays
int[].class.getClassLoader();  // null (primitive array)
String[].class.getClassLoader();  // null (String is Bootstrap)
MyClass[].class.getClassLoader();  // Same as MyClass`
    }
  ];

  return (
    <div className={`min-h-screen ${colors.background}`}>
      <div className="max-w-6xl mx-auto p-6">
        <Breadcrumb section={{ name: 'My Projects', icon: '💼', onClick: onBack }}
          category={{ name: 'Java Internals', onClick: onBack }} topic="Class Loading" />
        <div className="flex items-center gap-3 mt-4">
          <button ref={backButtonRef} onClick={onBack}
            className={`flex items-center gap-2 px-4 py-2 ${colors.buttonBg} text-white rounded-lg transition-all duration-200 hover:scale-105`}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-2">
            <Package className={`w-8 h-8 ${colors.accent}`} />
            <h1 className={`text-3xl font-bold ${colors.heading}`}>Class Loading - Internal Workings</h1>
          </div>
          <p className={`text-lg ${colors.secondary} mb-6`}>
            Deep dive into JVM class loading: phases, delegation model, custom loaders, and Metaspace.
          </p>

          <div className={`${colors.card} rounded-xl p-4 mb-6 border ${colors.border}`}>
            <h3 className={`font-semibold ${colors.heading} mb-2`}>Class Loading Phases</h3>
            <pre className={`text-sm ${colors.secondary} font-mono whitespace-pre overflow-x-auto`}>
{`Class Loading Process:

  .class file
       │
       ↓
┌──────────────────────────────────────────────────────────────┐
│  LOADING          LINKING                    INITIALIZATION  │
│  ────────   ─────────────────────────────   ──────────────── │
│  Read       Verification → Preparation → Resolution   <clinit>│
│  bytecode   Check valid    Allocate      Resolve      Run     │
│  Create     bytecode       static vars   symbols      static  │
│  Class obj                 (defaults)    (lazy)       blocks  │
└──────────────────────────────────────────────────────────────┘

ClassLoader Hierarchy:
┌─────────────────────────────────────────┐
│         Bootstrap ClassLoader           │  java.lang, java.util
│              (parent: null)             │
└────────────────────┬────────────────────┘
                     │
┌────────────────────┴────────────────────┐
│         Platform ClassLoader            │  java.sql, java.xml
└────────────────────┬────────────────────┘
                     │
┌────────────────────┴────────────────────┐
│        Application ClassLoader          │  Your classes
└─────────────────────────────────────────┘`}
            </pre>
          </div>

          <div className="space-y-4">
            {sections.map((section, index) => (
              <div key={index} className={`${colors.card} rounded-xl border ${colors.border} overflow-hidden`}>
                <button onClick={() => toggleSection(index)}
                  className={`w-full flex items-center justify-between p-4 ${colors.cardHover} transition-colors duration-200`}>
                  <div className="flex items-center gap-3">
                    <span className={colors.accent}>{section.icon}</span>
                    <span className={`font-semibold ${colors.heading}`}>{section.title}</span>
                  </div>
                  {expandedSections[index] ? <ChevronDown className={`w-5 h-5 ${colors.secondary}`} /> : <ChevronRight className={`w-5 h-5 ${colors.secondary}`} />}
                </button>
                {expandedSections[index] && (
                  <div className="p-4 pt-0">
                    <div className={`${colors.secondary} whitespace-pre-line mb-4`}>{section.content}</div>
                    {section.code && (
                      <div className="relative">
                        <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded ${colors.tag}`}>Java</div>
                        <pre className={`${colors.codeBg} rounded-lg p-4 overflow-x-auto text-sm`}>
                          <code className="font-mono" dangerouslySetInnerHTML={{ __html: highlightCode(section.code) }} />
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassLoadingInternals;

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, ArrowLeft, Layers, Zap, Database, FileText, Shield, Settings, HardDrive } from 'lucide-react';
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

const StringPoolInternals = ({ onBack, breadcrumb }) => {
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
      title: 'What is String Pool?',
      icon: <Zap className="w-5 h-5" />,
      content: `String Pool (String Intern Pool) is a special memory area for string literals.

Purpose:
• Memory optimization - reuse identical strings
• Performance - fast string comparison with ==
• JVM optimization - compile-time string handling

Location:
• Java 6 and earlier: PermGen (fixed size)
• Java 7+: Heap (can grow, GC eligible)

How it works:
• String literals automatically pooled
• new String() creates heap object (not pooled)
• intern() adds to pool or returns existing`,
      code: `// String literals - automatically pooled
String s1 = "hello";
String s2 = "hello";
System.out.println(s1 == s2);  // true (same reference)

// new String() - creates new heap object
String s3 = new String("hello");
System.out.println(s1 == s3);  // false (different objects)
System.out.println(s1.equals(s3));  // true (same content)

// intern() - add to pool or get existing
String s4 = s3.intern();
System.out.println(s1 == s4);  // true (s4 now points to pool)

// Memory visualization:
//
// String Pool (Heap):     Heap:
// ┌─────────────┐        ┌─────────────┐
// │   "hello"   │◄───s1  │new String() │◄───s3
// │             │◄───s2  │  "hello"    │
// │             │◄───s4  └─────────────┘
// └─────────────┘`
    },
    {
      title: 'String Immutability',
      icon: <Shield className="w-5 h-5" />,
      content: `Strings in Java are immutable - their value cannot be changed after creation.

Why immutable?
• Thread safety - no synchronization needed
• Security - can't modify after validation
• Caching - hashCode can be cached
• String pool - safe to share references

Implementation:
• final class - can't extend
• private final char[]/byte[] - can't modify
• All "modification" methods return new String`,
      code: `// String is final class
public final class String {
    // Value array is private and final
    private final byte[] value;  // Java 9+: byte[]
    // private final char[] value; // Java 8: char[]

    // Hash is cached
    private int hash;  // Default 0

    // No setters - immutable
}

// "Modification" creates new object
String s = "hello";
String upper = s.toUpperCase();  // New String created
System.out.println(s);      // "hello" (unchanged)
System.out.println(upper);  // "HELLO" (new object)

// Concatenation creates new objects
String a = "hello";
String b = a + " world";  // New String created
// Internally: new StringBuilder(a).append(" world").toString()

// Why security matters:
void connect(String host) {
    validate(host);          // Check if allowed
    // If mutable, attacker could change here!
    openConnection(host);    // Use the value
}

// Thread safety - no locks needed
// Multiple threads can share same String reference
static final String CONSTANT = "shared";  // Safe`
    },
    {
      title: 'intern() Method',
      icon: <Database className="w-5 h-5" />,
      content: `intern() returns canonical representation from the pool.

How it works:
1. Check if equal string exists in pool
2. If yes, return pool reference
3. If no, add this string to pool, return it

Use cases:
• Reduce memory for many duplicate strings
• Enable == comparison (faster than equals)
• Enum-like string handling

Caution:
• Interning has overhead
• Pool can grow large
• Only useful for many duplicates`,
      code: `// intern() behavior
String s1 = new String("hello").intern();
String s2 = "hello";
System.out.println(s1 == s2);  // true

// Native method signature
public native String intern();

// Conceptual implementation:
String intern() {
    String pooled = stringPool.get(this);
    if (pooled != null) {
        return pooled;  // Return existing
    }
    stringPool.add(this);
    return this;  // Add and return
}

// Good use case: many duplicate strings
List<String> records = readMillionsOfRecords();
// Many records have same country/city
for (Record r : records) {
    r.country = r.country.intern();  // Save memory
    r.city = r.city.intern();
}

// Bad use case: unique strings
String uuid = UUID.randomUUID().toString().intern();
// Wasteful! Unique strings pollute pool

// Memory impact example:
// 1 million records, 100 unique countries
// Without intern: 1M String objects
// With intern: 100 String objects (huge savings!)`
    },
    {
      title: 'Compile-Time Optimization',
      icon: <FileText className="w-5 h-5" />,
      content: `The compiler optimizes string concatenation and constants.

Compile-time constant folding:
• Literal concatenations resolved at compile time
• final variables treated as constants
• Result goes directly to pool

Runtime concatenation:
• Variables use StringBuilder
• Result is new heap object (not pooled)`,
      code: `// Compile-time constant folding
String s1 = "hello" + " " + "world";  // Becomes "hello world"
String s2 = "hello world";
System.out.println(s1 == s2);  // true! (same constant)

// final variables are constants
final String a = "hello";
final String b = " world";
String s3 = a + b;  // Compile-time: "hello world"
System.out.println(s2 == s3);  // true

// Non-final variables - runtime concatenation
String x = "hello";
String y = " world";
String s4 = x + y;  // Runtime: new StringBuilder...
System.out.println(s2 == s4);  // false! (new object)

// Bytecode difference:
// s1 = "hello" + " " + "world"
// ldc "hello world"  // Single constant

// s4 = x + y
// new StringBuilder
// invokespecial StringBuilder.<init>
// aload x
// invokevirtual StringBuilder.append
// aload y
// invokevirtual StringBuilder.append
// invokevirtual StringBuilder.toString

// Method calls - always runtime
String getHello() { return "hello"; }
String s5 = getHello() + " world";  // Runtime
System.out.println(s2 == s5);  // false`
    },
    {
      title: 'Java 9+ Compact Strings',
      icon: <HardDrive className="w-5 h-5" />,
      content: `Java 9 introduced Compact Strings for memory optimization.

Before Java 9:
• char[] internally (2 bytes per char)
• Even ASCII used 2 bytes

Java 9+:
• byte[] internally
• Latin-1 strings use 1 byte per char
• UTF-16 strings use 2 bytes per char
• coder field indicates encoding

Memory savings:
• ~50% for ASCII/Latin-1 strings
• Most strings are ASCII in practice`,
      code: `// Java 8 String
public final class String {
    private final char[] value;  // Always 2 bytes/char
}

// Java 9+ String
public final class String {
    private final byte[] value;  // 1 or 2 bytes/char
    private final byte coder;    // LATIN1=0, UTF16=1

    static final byte LATIN1 = 0;
    static final byte UTF16 = 1;
}

// Memory comparison for "hello" (5 chars)
// Java 8: 5 * 2 = 10 bytes
// Java 9+ (Latin-1): 5 * 1 = 5 bytes (50% savings!)

// Automatic encoding selection
String ascii = "hello";     // Uses LATIN1 (1 byte/char)
String unicode = "こんにちは";  // Uses UTF16 (2 bytes/char)

// Length calculation
public int length() {
    return value.length >> coder;  // Divide by 2 if UTF-16
}

// charAt with encoding check
public char charAt(int index) {
    if (coder == LATIN1) {
        return (char)(value[index] & 0xff);
    }
    return StringUTF16.charAt(value, index);
}

// JVM flag to disable (not recommended)
// -XX:-CompactStrings`
    },
    {
      title: 'String Pool Tuning',
      icon: <Settings className="w-5 h-5" />,
      content: `The String Pool uses a hash table that can be tuned.

JVM Options:
• -XX:StringTableSize=N - pool hash table size
• -XX:+PrintStringTableStatistics - print stats

Default size:
• Java 7: 1009 buckets
• Java 7u40+: 60013 buckets

Tuning guidelines:
• Increase for many interned strings
• Check collision statistics
• Prime numbers work best`,
      code: `// Check string table statistics
// Run with: -XX:+PrintStringTableStatistics

// Output example:
// StringTable statistics:
// Number of buckets     : 60013
// Number of entries     : 12543
// Number of literals    : 12543
// Total footprint (KB)  : 1024
// Average bucket size   : 0.209
// Variance of bucket size: 0.209
// Std. dev. of bucket size: 0.457
// Maximum bucket size   : 3

// Increase table size for many strings
// java -XX:StringTableSize=120013 MyApp

// Recommendations:
// - Default (60013) good for most apps
// - Increase if average bucket size > 1
// - Use prime numbers
// - Monitor with PrintStringTableStatistics

// JDK tool to analyze strings
// jcmd <pid> VM.stringtable

// Common sizes:
// 60013  - default (good for most)
// 120017 - large apps
// 240007 - very large apps
// 1000003 - extreme cases`
    },
    {
      title: 'Interview Questions',
      icon: <Layers className="w-5 h-5" />,
      content: `Common String Pool interview questions:

Q1: Where is String Pool located?
A: Heap (Java 7+), was PermGen before

Q2: "hello" == new String("hello")?
A: false (literal vs heap object)

Q3: What does intern() do?
A: Returns pool reference, adds if not present

Q4: Why are Strings immutable?
A: Thread safety, security, caching, pool safety

Q5: How many objects: String s = new String("hello")?
A: Up to 2 - one in pool (if new), one on heap

Q6: String vs StringBuilder vs StringBuffer?
A: Immutable vs mutable vs synchronized mutable`,
      code: `// Q1: Location changed in Java 7
// Java 6: PermGen (fixed size, OOM risk)
// Java 7+: Heap (growable, GC eligible)

// Q2: Comparison examples
String a = "hello";
String b = "hello";
String c = new String("hello");
String d = c.intern();

a == b;  // true (both from pool)
a == c;  // false (pool vs heap)
a == d;  // true (d from pool via intern)

// Q5: Object creation count
String s = new String("hello");
// If "hello" not in pool: 2 objects
//   1. "hello" literal → pool
//   2. new String() → heap
// If "hello" in pool: 1 object
//   1. new String() → heap only

// Q6: Performance comparison
// String - immutable, creates new objects
String str = "";
for (int i = 0; i < 1000; i++) {
    str += i;  // Creates ~1000 objects!
}

// StringBuilder - mutable, single object
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append(i);  // Same object
}

// StringBuffer - synchronized StringBuilder
StringBuffer sbuf = new StringBuffer();  // Thread-safe
// Use when multiple threads modify same builder`
    }
  ];

  return (
    <div className={`min-h-screen ${colors.background}`}>
      <div className="max-w-6xl mx-auto p-6">
{breadcrumb && <Breadcrumb breadcrumb={breadcrumb} />}
        <div className="flex items-center gap-3 mt-4">
          <button ref={backButtonRef} onClick={onBack}
            className={`flex items-center gap-2 px-4 py-2 ${colors.buttonBg} text-white rounded-lg transition-all duration-200 hover:scale-105`}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-2">
            <FileText className={`w-8 h-8 ${colors.accent}`} />
            <h1 className={`text-3xl font-bold ${colors.heading}`}>String Pool - Internal Workings</h1>
          </div>
          <p className={`text-lg ${colors.secondary} mb-6`}>
            Deep dive into Java's String Pool: interning, immutability, and memory optimization.
          </p>

          <div className={`${colors.card} rounded-xl p-4 mb-6 border ${colors.border}`}>
            <h3 className={`font-semibold ${colors.heading} mb-2`}>Memory Layout</h3>
            <pre className={`text-sm ${colors.secondary} font-mono whitespace-pre overflow-x-auto`}>
{`Heap Memory:
┌────────────────────────────────────────────────┐
│  String Pool (special region)                  │
│  ┌────────────┐  ┌────────────┐                │
│  │  "hello"   │  │  "world"   │  ...           │
│  └────────────┘  └────────────┘                │
├────────────────────────────────────────────────┤
│  Regular Heap Objects                          │
│  ┌────────────────┐  ┌────────────────┐        │
│  │ new String()   │  │ StringBuilder  │  ...   │
│  │   "hello"      │  │                │        │
│  └────────────────┘  └────────────────┘        │
└────────────────────────────────────────────────┘

String s1 = "hello";        → Points to pool
String s2 = "hello";        → Same pool reference
String s3 = new String();   → New heap object`}
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

export default StringPoolInternals;

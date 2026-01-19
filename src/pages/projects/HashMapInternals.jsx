import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, Code, Database, Zap, ArrowLeft, Hash, Box, Link, TreeDeciduous } from 'lucide-react';
import { KEYS } from '../../utils/keyboardNavigation.js';
import Breadcrumb from '../../components/Breadcrumb';
import { useTheme } from '../../contexts/ThemeContext';

const highlightCode = (code) => {
  code = code
    .replace(/<\s*(?:span|font)[^>]*>/gi, '')
    .replace(/<\s*\/\s*(?:span|font)\s*>/gi, '')
    .replace(/\s*(?:style|color|bgcolor)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');

  let highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const placeholders = [];
  const store = (html) => {
    placeholders.push(html);
    return `___P${placeholders.length - 1}___`;
  };

  highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, (m) => store(`<span class="token comment">${m}</span>`));
  highlighted = highlighted.replace(/\/\/.*$/gm, (m) => store(`<span class="token comment">${m}</span>`));
  highlighted = highlighted.replace(/"(?:\\.|[^"\\])*"/g, (m) => store(`<span class="token string">${m}</span>`));
  highlighted = highlighted.replace(/'(?:\\.|[^'\\])+'/g, (m) => store(`<span class="token char">${m}</span>`));
  highlighted = highlighted.replace(/@\w+/g, (m) => store(`<span class="token annotation">${m}</span>`));
  highlighted = highlighted.replace(/\b\d+(?:\.\d+)?\b/g, (m) => store(`<span class="token number">${m}</span>`));
  highlighted = highlighted.replace(/\b(true|false|null)\b/g, (m) => store(`<span class="token boolean">${m}</span>`));

  const keywords = 'abstract assert boolean break byte case catch char class const continue default do double else enum export extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try var void volatile while';
  const kwRegex = new RegExp('\\b(' + keywords.trim().split(/\\s+/).join('|') + ')\\b', 'g');
  highlighted = highlighted.replace(kwRegex, (m) => store(`<span class="token keyword">${m}</span>`));
  highlighted = highlighted.replace(/\b([A-Z][A-Za-z0-9_]*)\b/g, (m) => store(`<span class="token class-name">${m}</span>`));
  highlighted = highlighted.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, (m) => store(`<span class="token function">${m}</span>`));
  highlighted = highlighted.replace(/([{}()[\];,.<>+\-*/=%!:|&^~?]+)/g, (m) => `<span class="token punctuation">${m}</span>`);
  highlighted = highlighted.replace(/___P(\d+)___/g, (_, n) => placeholders[Number(n)]);

  return highlighted;
};

const HashMapInternals = ({ onBack, breadcrumb }) => {
  const { colors } = useTheme();
  const [expandedSections, setExpandedSections] = useState({ 0: true });
  const backButtonRef = useRef(null);

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

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
      title: 'HashMap Overview',
      icon: <Hash className="w-5 h-5" />,
      content: `HashMap is a hash table-based implementation of the Map interface. It stores key-value pairs and provides O(1) average time complexity for get() and put() operations.

Key Characteristics:
• Allows one null key and multiple null values
• Not synchronized (use ConcurrentHashMap for thread-safety)
• Does not maintain insertion order (use LinkedHashMap for that)
• Default initial capacity: 16, Load factor: 0.75`,
      code: `// Basic HashMap usage
Map<String, Integer> map = new HashMap<>();
map.put("apple", 1);
map.put("banana", 2);
map.put("cherry", 3);

int value = map.get("apple"); // O(1) average
boolean exists = map.containsKey("banana"); // O(1) average`
    },
    {
      title: 'Internal Data Structure',
      icon: <Box className="w-5 h-5" />,
      content: `HashMap uses an array of Node objects (buckets). Each Node contains:
• hash: The hash value of the key
• key: The actual key object
• value: The value associated with the key
• next: Reference to the next node (for collision handling)

The array is called "table" and its length is always a power of 2.`,
      code: `// Simplified Node structure (actual implementation)
static class Node<K,V> implements Map.Entry<K,V> {
    final int hash;      // Cached hash code
    final K key;         // The key
    V value;             // The value
    Node<K,V> next;      // Next node in the bucket (linked list)

    Node(int hash, K key, V value, Node<K,V> next) {
        this.hash = hash;
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

// HashMap internal structure
transient Node<K,V>[] table;  // The bucket array
transient int size;            // Number of key-value pairs
int threshold;                 // Resize threshold (capacity * loadFactor)
final float loadFactor;        // Default 0.75`
    },
    {
      title: 'Hash Function & Index Calculation',
      icon: <Zap className="w-5 h-5" />,
      content: `HashMap uses a two-step process to determine bucket index:

1. Compute hash: Spreads higher bits of hashCode to lower bits
2. Calculate index: Uses bitwise AND with (capacity - 1)

Why (n-1) & hash instead of hash % n?
• Bitwise AND is faster than modulo
• Works because capacity is always a power of 2
• Example: n=16, n-1=15 (binary: 1111), hash & 15 gives values 0-15`,
      code: `// Hash computation (Java 8+)
static final int hash(Object key) {
    int h;
    // XOR high bits with low bits to spread hash
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}

// Index calculation
int index = (n - 1) & hash;  // n is table length

// Example:
// hashCode = 123456789
// h >>> 16 = 1883 (upper 16 bits shifted down)
// hash = 123456789 ^ 1883 = 123458534
// If n = 16: index = 123458534 & 15 = 6`
    },
    {
      title: 'put() Operation',
      icon: <Database className="w-5 h-5" />,
      content: `The put() operation follows these steps:

1. Calculate hash of the key
2. Find bucket index using (n-1) & hash
3. If bucket is empty, create new Node
4. If bucket has nodes:
   a. Check if first node matches key → update value
   b. If TreeNode, use tree insertion
   c. Otherwise, traverse linked list:
      - If key found, update value
      - If not found, append new Node
5. Check if size > threshold → resize`,
      code: `// Simplified put() implementation
public V put(K key, V value) {
    int hash = hash(key);
    int index = (table.length - 1) & hash;

    Node<K,V> first = table[index];

    // Case 1: Empty bucket
    if (first == null) {
        table[index] = new Node<>(hash, key, value, null);
    }
    // Case 2: Bucket has nodes
    else {
        Node<K,V> e = first;
        // Check if key already exists
        if (first.hash == hash &&
            (first.key == key || key.equals(first.key))) {
            // Update existing
            V oldValue = first.value;
            first.value = value;
            return oldValue;
        }
        // Traverse linked list
        while (e.next != null) {
            e = e.next;
            if (e.hash == hash &&
                (e.key == key || key.equals(e.key))) {
                V oldValue = e.value;
                e.value = value;
                return oldValue;
            }
        }
        // Add new node at end
        e.next = new Node<>(hash, key, value, null);
    }

    size++;
    if (size > threshold) resize();
    return null;
}`
    },
    {
      title: 'get() Operation',
      icon: <Code className="w-5 h-5" />,
      content: `The get() operation is straightforward:

1. Calculate hash of the key
2. Find bucket index
3. If bucket is empty, return null
4. Check first node - if matches, return value
5. If TreeNode, use tree search
6. Otherwise, traverse linked list until key found or end reached

Time Complexity:
• Best case: O(1) - key is first in bucket
• Average case: O(1) - with good hash distribution
• Worst case: O(log n) - with tree, O(n) - with list (pre-Java 8)`,
      code: `// Simplified get() implementation
public V get(Object key) {
    int hash = hash(key);
    int index = (table.length - 1) & hash;

    Node<K,V> first = table[index];

    // Empty bucket
    if (first == null) {
        return null;
    }

    // Check first node
    if (first.hash == hash &&
        (first.key == key || key.equals(first.key))) {
        return first.value;
    }

    // Traverse rest of bucket
    Node<K,V> e = first.next;
    while (e != null) {
        if (e.hash == hash &&
            (e.key == key || key.equals(e.key))) {
            return e.value;
        }
        e = e.next;
    }

    return null; // Key not found
}`
    },
    {
      title: 'Collision Handling',
      icon: <Link className="w-5 h-5" />,
      content: `When two keys have the same bucket index (collision), HashMap uses chaining:

Before Java 8:
• Simple linked list in each bucket
• Worst case O(n) for search

Java 8+ Optimization:
• Linked list when bucket size < 8
• Converts to Red-Black Tree when bucket size >= 8
• Converts back to list when size <= 6
• Worst case improved to O(log n)

The treeification threshold (8) is chosen because:
• Poisson distribution shows probability of 8+ collisions is 0.00000006
• Tree overhead not worth it for smaller buckets`,
      code: `// Tree threshold constants
static final int TREEIFY_THRESHOLD = 8;   // Convert to tree
static final int UNTREEIFY_THRESHOLD = 6; // Convert back to list
static final int MIN_TREEIFY_CAPACITY = 64; // Min table size for tree

// TreeNode structure (extends Node)
static final class TreeNode<K,V> extends Node<K,V> {
    TreeNode<K,V> parent;
    TreeNode<K,V> left;
    TreeNode<K,V> right;
    TreeNode<K,V> prev;    // For unlinking
    boolean red;           // Red-Black tree color

    // Tree operations: find, put, remove, rotateLeft, rotateRight, etc.
}

// Treeify a bucket (when size >= 8)
final void treeifyBin(Node<K,V>[] tab, int hash) {
    if (tab == null || tab.length < MIN_TREEIFY_CAPACITY) {
        resize(); // Resize instead if table too small
    } else {
        // Convert linked list to tree
        // ... tree construction logic
    }
}`
    },
    {
      title: 'Resizing (Rehashing)',
      icon: <TreeDeciduous className="w-5 h-5" />,
      content: `When size exceeds threshold (capacity × loadFactor), HashMap doubles its capacity:

Resize triggers when:
• size > threshold (e.g., > 12 for default capacity 16)
• During treeification if capacity < 64

Resize process:
1. Create new array with 2× capacity
2. Rehash all entries to new positions
3. Entries either stay at same index or move to (index + oldCapacity)

Why double? Power of 2 ensures efficient index calculation with bitwise AND.`,
      code: `// Simplified resize logic
final Node<K,V>[] resize() {
    Node<K,V>[] oldTab = table;
    int oldCap = oldTab.length;        // e.g., 16
    int newCap = oldCap << 1;          // Double: 32
    int newThr = newCap * loadFactor;  // New threshold

    Node<K,V>[] newTab = new Node[newCap];
    table = newTab;

    // Rehash all entries
    for (int j = 0; j < oldCap; j++) {
        Node<K,V> e = oldTab[j];
        if (e != null) {
            oldTab[j] = null; // Help GC

            if (e.next == null) {
                // Single node - just recalculate position
                newTab[e.hash & (newCap - 1)] = e;
            } else {
                // Multiple nodes - split into two lists
                Node<K,V> loHead = null, loTail = null; // Stay at index
                Node<K,V> hiHead = null, hiTail = null; // Move to index+oldCap

                do {
                    // Check if high bit is set
                    if ((e.hash & oldCap) == 0) {
                        // Stays at same index
                        if (loTail == null) loHead = e;
                        else loTail.next = e;
                        loTail = e;
                    } else {
                        // Moves to index + oldCap
                        if (hiTail == null) hiHead = e;
                        else hiTail.next = e;
                        hiTail = e;
                    }
                } while ((e = e.next) != null);

                if (loTail != null) {
                    loTail.next = null;
                    newTab[j] = loHead;
                }
                if (hiTail != null) {
                    hiTail.next = null;
                    newTab[j + oldCap] = hiHead;
                }
            }
        }
    }
    return newTab;
}`
    },
    {
      title: 'Interview Questions',
      icon: <Database className="w-5 h-5" />,
      content: `Common HashMap interview questions:

Q1: How does HashMap handle null keys?
A: Null key always goes to index 0 (hash of null is 0).

Q2: Why is capacity always a power of 2?
A: Enables fast index calculation using bitwise AND instead of modulo.

Q3: What happens if two objects have same hashCode?
A: They go to same bucket; equals() is used to differentiate.

Q4: Why override both hashCode() and equals()?
A: HashMap uses hashCode for bucket, equals for key comparison.

Q5: Is HashMap thread-safe?
A: No. Use ConcurrentHashMap or Collections.synchronizedMap().`,
      code: `// Q6: What's wrong with this code?
class Person {
    String name;
    int age;

    // Missing hashCode() and equals() overrides!
}

Map<Person, String> map = new HashMap<>();
Person p1 = new Person("John", 25);
map.put(p1, "Engineer");

Person p2 = new Person("John", 25);
String job = map.get(p2);  // Returns null! Different objects

// Fix: Override hashCode() and equals()
@Override
public int hashCode() {
    return Objects.hash(name, age);
}

@Override
public boolean equals(Object obj) {
    if (this == obj) return true;
    if (!(obj instanceof Person)) return false;
    Person other = (Person) obj;
    return age == other.age && Objects.equals(name, other.name);
}

// Q7: HashMap vs Hashtable vs ConcurrentHashMap?
// HashMap: Not synchronized, allows null
// Hashtable: Synchronized (legacy), no null
// ConcurrentHashMap: Concurrent, segment locking, no null`
    }
  ];

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: colors.background }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            ref={backButtonRef}
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: colors.card,
              color: colors.primary
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
{breadcrumb && <Breadcrumb breadcrumb={breadcrumb} />}
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: colors.text }}>
            HashMap - Internal Workings
          </h1>
          <p className="text-lg" style={{ color: colors.textSecondary }}>
            Deep dive into Java HashMap implementation - essential for technical interviews
          </p>
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Time Complexity', value: 'O(1) avg' },
            { label: 'Default Capacity', value: '16' },
            { label: 'Load Factor', value: '0.75' },
            { label: 'Tree Threshold', value: '8' }
          ].map((fact, i) => (
            <div
              key={i}
              className="p-4 rounded-lg text-center"
              style={{ backgroundColor: colors.card }}
            >
              <div className="text-2xl font-bold" style={{ color: colors.primary }}>
                {fact.value}
              </div>
              <div className="text-sm" style={{ color: colors.textSecondary }}>
                {fact.label}
              </div>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden"
              style={{ backgroundColor: colors.card }}
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full flex items-center gap-3 p-4 text-left transition-colors hover:opacity-80"
              >
                <span style={{ color: colors.primary }}>{section.icon}</span>
                <span className="flex-1 font-semibold" style={{ color: colors.text }}>
                  {section.title}
                </span>
                {expandedSections[index] ? (
                  <ChevronDown className="w-5 h-5" style={{ color: colors.textSecondary }} />
                ) : (
                  <ChevronRight className="w-5 h-5" style={{ color: colors.textSecondary }} />
                )}
              </button>

              {expandedSections[index] && (
                <div className="px-4 pb-4 border-t" style={{ borderColor: colors.border }}>
                  <div className="mt-4 whitespace-pre-line" style={{ color: colors.textSecondary }}>
                    {section.content}
                  </div>
                  {section.code && (
                    <pre
                      className="mt-4 p-4 rounded-lg overflow-x-auto text-sm"
                      style={{ backgroundColor: colors.background }}
                    >
                      <code
                        dangerouslySetInnerHTML={{ __html: highlightCode(section.code) }}
                        style={{ color: colors.text }}
                      />
                    </pre>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Visual Diagram */}
        <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: colors.card }}>
          <h3 className="text-xl font-bold mb-4" style={{ color: colors.text }}>
            Visual: HashMap Structure
          </h3>
          <pre
            className="text-xs md:text-sm overflow-x-auto p-4 rounded"
            style={{ backgroundColor: colors.background, color: colors.textSecondary }}
          >
{`HashMap Internal Structure:

table[] (bucket array, size = 16)
┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
│  0  │  1  │  2  │  3  │  4  │  5  │  6  │  7  │  8  │  9  │ 10  │ 11  │ 12  │ 13  │ 14  │ 15  │
└──┬──┴─────┴──┬──┴─────┴─────┴──┬──┴─────┴─────┴─────┴─────┴──┬──┴─────┴─────┴─────┴─────┴─────┘
   │           │                 │                             │
   ▼           ▼                 ▼                             ▼
┌──────┐   ┌──────┐          ┌──────┐                      ┌──────┐
│ K: A │   │ K: B │          │ K: C │                      │ K: D │
│ V: 1 │   │ V: 2 │          │ V: 3 │                      │ V: 4 │
│next:─┼─┐ └──────┘          │next:─┼─┐                    └──────┘
└──────┘ │                   └──────┘ │
         ▼                            ▼
     ┌──────┐                     ┌──────┐     Collision!
     │ K: E │                     │ K: F │     Same bucket,
     │ V: 5 │                     │ V: 6 │     linked list
     └──────┘                     │next:─┼─┐
                                  └──────┘ │
                                           ▼
                                       ┌──────┐
                                       │ K: G │
                                       │ V: 7 │
                                       └──────┘

When bucket size >= 8, converts to Red-Black Tree:

           ┌──────┐
           │ K: C │ (Black)
           │ V: 3 │
           └──┬───┘
         ┌───┴───┐
         ▼       ▼
     ┌──────┐ ┌──────┐
     │ K: A │ │ K: F │ (Red)
     └──────┘ └──┬───┘
             ┌───┴───┐
             ▼       ▼
         ┌──────┐ ┌──────┐
         │ K: D │ │ K: G │
         └──────┘ └──────┘`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default HashMapInternals;

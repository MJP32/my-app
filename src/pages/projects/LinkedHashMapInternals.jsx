import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, ArrowLeft, Layers, Zap, Link, Database, RotateCcw, Settings } from 'lucide-react';
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

const LinkedHashMapInternals = ({ onBack }) => {
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
      title: 'Why LinkedHashMap?',
      icon: <Zap className="w-5 h-5" />,
      content: `LinkedHashMap extends HashMap with predictable iteration order.

Two ordering modes:
• Insertion order (default) - iterates in order elements were added
• Access order - most recently accessed elements come last (for LRU cache)

Key benefits:
• All HashMap O(1) operations
• Predictable iteration order
• Perfect for LRU cache implementation
• Maintains insertion order for JSON serialization

Use cases:
• LRU Cache with removeEldestEntry()
• Maintaining insertion order
• Ordered JSON output
• Request/response logging`,
      code: `// HashMap - unpredictable order
Map<String, Integer> hashMap = new HashMap<>();
hashMap.put("one", 1);
hashMap.put("two", 2);
hashMap.put("three", 3);
// Iteration order: unpredictable!

// LinkedHashMap - insertion order
Map<String, Integer> linkedMap = new LinkedHashMap<>();
linkedMap.put("one", 1);
linkedMap.put("two", 2);
linkedMap.put("three", 3);
// Iteration order: one, two, three (guaranteed)

// Access-order LinkedHashMap (for LRU)
Map<String, Integer> accessOrder = new LinkedHashMap<>(16, 0.75f, true);
accessOrder.put("one", 1);
accessOrder.put("two", 2);
accessOrder.put("three", 3);
accessOrder.get("one");  // Access "one"
// Iteration order: two, three, one (one moved to end)`
    },
    {
      title: 'Internal Structure',
      icon: <Layers className="w-5 h-5" />,
      content: `LinkedHashMap adds a doubly-linked list on top of HashMap's structure.

Key differences from HashMap:
• Entry extends HashMap.Node with before/after pointers
• head/tail pointers track linked list
• afterNodeAccess() called on get (if access-order)
• afterNodeInsertion() checks removeEldestEntry()

The linked list threads through all entries:
head ←→ entry1 ←→ entry2 ←→ entry3 ←→ tail

Hash table structure remains unchanged - same O(1) lookup.`,
      code: `// LinkedHashMap structure
public class LinkedHashMap<K,V> extends HashMap<K,V> {
    // Doubly-linked list pointers
    transient LinkedHashMap.Entry<K,V> head;
    transient LinkedHashMap.Entry<K,V> tail;

    // Access order flag
    final boolean accessOrder;

    // Extended entry with list pointers
    static class Entry<K,V> extends HashMap.Node<K,V> {
        Entry<K,V> before, after;  // Linked list

        Entry(int hash, K key, V value, Node<K,V> next) {
            super(hash, key, value, next);
        }
    }

    public LinkedHashMap() {
        super();
        accessOrder = false;  // Insertion order
    }

    public LinkedHashMap(int initialCapacity, float loadFactor,
                         boolean accessOrder) {
        super(initialCapacity, loadFactor);
        this.accessOrder = accessOrder;
    }
}

// Visual representation:
// Hash Table:          Linked List:
// [0] → entry1         head → entry1 ↔ entry2 ↔ entry3 → tail
// [1] → null                    ↑                 ↑
// [2] → entry2 → entry3         before/after pointers
// [3] → null`
    },
    {
      title: 'Access-Order Mode',
      icon: <RotateCcw className="w-5 h-5" />,
      content: `Access-order mode moves accessed entries to the end of the list.

Triggered by:
• get() - if accessOrder is true
• put() - updating existing key
• putIfAbsent(), compute(), merge(), etc.

Perfect for LRU cache:
• Most recently used → end of list
• Least recently used → head of list
• removeEldestEntry() can evict head

Implementation:
• afterNodeAccess() moves entry to tail
• Uses unlink + link to tail pattern`,
      code: `// afterNodeAccess - moves entry to tail
void afterNodeAccess(Node<K,V> e) {
    LinkedHashMap.Entry<K,V> last;
    if (accessOrder && (last = tail) != e) {
        LinkedHashMap.Entry<K,V> p = (LinkedHashMap.Entry<K,V>)e;
        LinkedHashMap.Entry<K,V> b = p.before;
        LinkedHashMap.Entry<K,V> a = p.after;

        p.after = null;  // Will be new tail

        // Unlink from current position
        if (b == null)
            head = a;
        else
            b.after = a;
        if (a != null)
            a.before = b;
        else
            last = b;

        // Link at tail
        if (last == null)
            head = p;
        else {
            p.before = last;
            last.after = p;
        }
        tail = p;
        ++modCount;
    }
}

// Example:
// Before get("B"): A ↔ B ↔ C
// After get("B"):  A ↔ C ↔ B (B moved to end)`
    },
    {
      title: 'LRU Cache Implementation',
      icon: <Database className="w-5 h-5" />,
      content: `LinkedHashMap is perfect for LRU cache - just override removeEldestEntry().

removeEldestEntry() is called after each put:
• Return true to remove eldest (head) entry
• Return false to keep all entries

Classic LRU pattern:
• Fixed maximum size
• Access order mode
• Remove eldest when size exceeds max`,
      code: `// LRU Cache using LinkedHashMap
public class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private final int maxSize;

    public LRUCache(int maxSize) {
        // accessOrder = true for LRU behavior
        super(maxSize, 0.75f, true);
        this.maxSize = maxSize;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > maxSize;  // Remove when over capacity
    }
}

// Usage
LRUCache<String, Integer> cache = new LRUCache<>(3);
cache.put("a", 1);  // [a:1]
cache.put("b", 2);  // [a:1, b:2]
cache.put("c", 3);  // [a:1, b:2, c:3]
cache.get("a");     // Access a → [b:2, c:3, a:1]
cache.put("d", 4);  // Over capacity! Remove b → [c:3, a:1, d:4]

// Thread-safe LRU Cache
Map<K, V> syncCache = Collections.synchronizedMap(new LRUCache<>(100));

// Java 8+ alternative using computeIfAbsent
cache.computeIfAbsent("key", k -> expensiveComputation(k));`
    },
    {
      title: 'Iteration Order Guarantee',
      icon: <Link className="w-5 h-5" />,
      content: `LinkedHashMap guarantees iteration order based on mode.

Insertion order (default):
• Elements returned in order added
• Re-inserting same key doesn't change order
• Useful for maintaining configuration order

Access order:
• Recently accessed elements come last
• Useful for cache implementations

Iteration uses the linked list, not hash table:
• Start at head, follow after pointers
• O(n) iteration, predictable order`,
      code: `// Insertion order - re-insert doesn't change order
LinkedHashMap<String, Integer> map = new LinkedHashMap<>();
map.put("first", 1);
map.put("second", 2);
map.put("third", 3);
map.put("first", 100);  // Update, doesn't move!

for (String key : map.keySet()) {
    System.out.println(key);
}
// Output: first, second, third (original order)

// Access order - access changes order
LinkedHashMap<String, Integer> accessMap =
    new LinkedHashMap<>(16, 0.75f, true);
accessMap.put("first", 1);
accessMap.put("second", 2);
accessMap.put("third", 3);
accessMap.get("first");  // Access moves to end

for (String key : accessMap.keySet()) {
    System.out.println(key);
}
// Output: second, third, first

// Iteration implementation
public Set<K> keySet() {
    return new LinkedKeySet();  // Uses linked list
}

// LinkedKeyIterator follows before/after links
final class LinkedKeyIterator extends LinkedHashIterator
    implements Iterator<K> {
    public final K next() { return nextNode().getKey(); }
}`
    },
    {
      title: 'Performance Characteristics',
      icon: <Settings className="w-5 h-5" />,
      content: `LinkedHashMap has same time complexity as HashMap with slight overhead.

Time complexities:
• get(): O(1) + linked list maintenance
• put(): O(1) + linked list maintenance
• remove(): O(1) + linked list maintenance
• iteration: O(n) - follows linked list

Space overhead:
• 2 extra pointers per entry (before/after)
• Head and tail pointers

Trade-offs:
• Slightly more memory than HashMap
• Slightly slower mutations (list maintenance)
• Much faster iteration than HashMap
• Guaranteed iteration order`,
      code: `// Memory comparison per entry:

// HashMap.Node:
// - hash: 4 bytes
// - key reference: 8 bytes
// - value reference: 8 bytes
// - next: 8 bytes
// Total: ~28 bytes + object overhead

// LinkedHashMap.Entry:
// - All of above: ~28 bytes
// - before: 8 bytes
// - after: 8 bytes
// Total: ~44 bytes + object overhead

// Performance comparison:
Map<String, Integer> hashMap = new HashMap<>();
Map<String, Integer> linkedHashMap = new LinkedHashMap<>();

// Both O(1) for basic operations
hashMap.put("key", 1);        // O(1)
linkedHashMap.put("key", 1);  // O(1) + list update

hashMap.get("key");           // O(1)
linkedHashMap.get("key");     // O(1)

// Iteration - LinkedHashMap slightly faster
// HashMap: iterate array + skip null buckets
// LinkedHashMap: follow linked list (no skipping)`
    },
    {
      title: 'Interview Questions',
      icon: <Database className="w-5 h-5" />,
      content: `Common LinkedHashMap interview questions:

Q1: HashMap vs LinkedHashMap?
A: LinkedHashMap maintains insertion/access order

Q2: How to implement LRU cache?
A: Extend LinkedHashMap with accessOrder=true, override removeEldestEntry()

Q3: What is accessOrder parameter?
A: If true, iteration order is access order (for LRU)

Q4: Does put() change order in insertion mode?
A: No, re-inserting same key keeps original position

Q5: Time complexity?
A: Same as HashMap O(1), with slight constant overhead

Q6: Thread safety?
A: Not thread-safe, use Collections.synchronizedMap()`,
      code: `// Q2: Complete LRU Cache for interviews
class LRUCache<K, V> {
    private final int capacity;
    private final LinkedHashMap<K, V> cache;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new LinkedHashMap<K, V>(capacity, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
                return size() > capacity;
            }
        };
    }

    public V get(K key) {
        return cache.getOrDefault(key, null);
    }

    public void put(K key, V value) {
        cache.put(key, value);
    }
}

// Q4: Insertion order doesn't change on update
LinkedHashMap<String, Integer> map = new LinkedHashMap<>();
map.put("a", 1);
map.put("b", 2);
map.put("a", 10);  // Updates value, keeps position
// Order: a, b (not b, a)

// Q6: Thread-safe wrapper
Map<K, V> threadSafe = Collections.synchronizedMap(
    new LinkedHashMap<>(16, 0.75f, true)
);`
    }
  ];

  return (
    <div className={`min-h-screen ${colors.background}`}>
      <div className="max-w-6xl mx-auto p-6">
        <Breadcrumb section={{ name: 'My Projects', icon: '💼', onClick: onBack }}
          category={{ name: 'Java Internals', onClick: onBack }} topic="LinkedHashMap - Internal Workings" />
        <div className="flex items-center gap-3 mt-4">
          <button ref={backButtonRef} onClick={onBack}
            className={`flex items-center gap-2 px-4 py-2 ${colors.buttonBg} text-white rounded-lg transition-all duration-200 hover:scale-105`}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-2">
            <Link className={`w-8 h-8 ${colors.accent}`} />
            <h1 className={`text-3xl font-bold ${colors.heading}`}>LinkedHashMap - Internal Workings</h1>
          </div>
          <p className={`text-lg ${colors.secondary} mb-6`}>
            Deep dive into Java's LinkedHashMap: insertion/access order, LRU cache implementation, and internal structure.
          </p>

          <div className={`${colors.card} rounded-xl p-4 mb-6 border ${colors.border}`}>
            <h3 className={`font-semibold ${colors.heading} mb-2`}>Structure Overview</h3>
            <pre className={`text-sm ${colors.secondary} font-mono whitespace-pre overflow-x-auto`}>
{`LinkedHashMap = HashMap + Doubly-Linked List

Hash Table (for O(1) lookup):
┌─────┬─────┬─────┬─────┬─────┐
│  0  │  1  │  2  │  3  │ ... │
└──┬──┴─────┴──┬──┴─────┴─────┘
   │           │
   ▼           ▼
 entry1     entry2 → entry3

Linked List (for order):
head ──→ entry1 ←──→ entry2 ←──→ entry3 ←── tail
         (first)                 (last)

Each Entry has: before, after, next (bucket chain)`}
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

export default LinkedHashMapInternals;

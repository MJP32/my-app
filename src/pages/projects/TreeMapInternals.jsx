import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, ArrowLeft, Layers, Zap, GitBranch, RotateCcw, Search, Settings } from 'lucide-react';
import { KEYS } from '../../utils/keyboardNavigation.js';
import Breadcrumb from '../../components/Breadcrumb';
import { useTheme } from '../../contexts/ThemeContext';

const highlightCode = (code) => {
  let highlighted = code.replace(/&/g, '&amp;').replace(/</g, '<').replace(/>/g, '>');
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

const TreeMapInternals = ({ onBack, breadcrumb }) => {
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
      title: 'Why TreeMap?',
      icon: <Zap className="w-5 h-5" />,
      content: `TreeMap maintains keys in sorted order using a Red-Black Tree.

Key features:
• Sorted iteration (natural order or Comparator)
• O(log n) for get, put, remove
• NavigableMap methods (floor, ceiling, higher, lower)
• Range views (subMap, headMap, tailMap)

Use cases:
• Need sorted keys
• Range queries
• Floor/ceiling lookups
• Implementing caches with eviction`,
      code: `// TreeMap - sorted keys
TreeMap<String, Integer> map = new TreeMap<>();
map.put("banana", 2);
map.put("apple", 1);
map.put("cherry", 3);

// Iteration is sorted!
for (String key : map.keySet()) {
    System.out.println(key);
}
// Output: apple, banana, cherry

// NavigableMap methods
map.firstKey();           // "apple"
map.lastKey();            // "cherry"
map.lowerKey("banana");   // "apple" (strictly less)
map.floorKey("banana");   // "banana" (less or equal)
map.higherKey("banana");  // "cherry" (strictly greater)
map.ceilingKey("banana"); // "banana" (greater or equal)

// Range views
SortedMap<String, Integer> sub = map.subMap("apple", "cherry");
// Contains: apple, banana (cherry excluded)

// Custom comparator
TreeMap<String, Integer> desc = new TreeMap<>(Comparator.reverseOrder());
desc.put("a", 1);
desc.put("b", 2);
// Iteration: b, a (descending)`
    },
    {
      title: 'Red-Black Tree Structure',
      icon: <GitBranch className="w-5 h-5" />,
      content: `TreeMap uses a self-balancing Red-Black Tree.

Red-Black Tree properties:
1. Every node is red or black
2. Root is always black
3. Leaves (NIL) are black
4. Red node's children are black (no red-red)
5. All paths have same black height

These properties guarantee O(log n) height:
• At most 2x the minimum path length
• Height ≤ 2 * log₂(n+1)`,
      code: `// TreeMap Entry structure
static final class Entry<K,V> implements Map.Entry<K,V> {
    K key;
    V value;
    Entry<K,V> left;
    Entry<K,V> right;
    Entry<K,V> parent;
    boolean color = BLACK;  // New entries are BLACK

    Entry(K key, V value, Entry<K,V> parent) {
        this.key = key;
        this.value = value;
        this.parent = parent;
    }
}

// TreeMap structure
public class TreeMap<K,V> extends AbstractMap<K,V>
    implements NavigableMap<K,V> {

    private final Comparator<? super K> comparator;
    private transient Entry<K,V> root;
    private transient int size = 0;
    private transient int modCount = 0;

    private static final boolean RED   = false;
    private static final boolean BLACK = true;
}

// Visual Red-Black Tree:
//           8(B)
//          /    \\
//       4(R)     12(R)
//       /  \\     /  \\
//    2(B)  6(B) 10(B) 14(B)
//
// B = Black, R = Red
// All paths root→leaf have same black count (3)`
    },
    {
      title: 'Insertion with Rebalancing',
      icon: <RotateCcw className="w-5 h-5" />,
      content: `Insertion may violate Red-Black properties. Fixed with rotations and recoloring.

Insert process:
1. BST insert (new node is RED)
2. Fix violations bottom-up

Violation cases (uncle analysis):
• Case 1: Uncle is RED → recolor
• Case 2: Uncle is BLACK, zigzag → rotate to Case 3
• Case 3: Uncle is BLACK, straight → rotate + recolor`,
      code: `// BST insert then fix
public V put(K key, V value) {
    Entry<K,V> t = root;
    if (t == null) {
        root = new Entry<>(key, value, null);
        size = 1;
        return null;
    }

    // BST insert
    int cmp;
    Entry<K,V> parent;
    do {
        parent = t;
        cmp = compare(key, t.key);
        if (cmp < 0)
            t = t.left;
        else if (cmp > 0)
            t = t.right;
        else
            return t.setValue(value);  // Key exists
    } while (t != null);

    Entry<K,V> e = new Entry<>(key, value, parent);
    if (cmp < 0)
        parent.left = e;
    else
        parent.right = e;

    fixAfterInsertion(e);  // Fix RB violations
    size++;
    return null;
}

// Fix Red-Black violations
private void fixAfterInsertion(Entry<K,V> x) {
    x.color = RED;

    while (x != null && x != root && x.parent.color == RED) {
        if (parentOf(x) == leftOf(parentOf(parentOf(x)))) {
            Entry<K,V> uncle = rightOf(parentOf(parentOf(x)));
            if (colorOf(uncle) == RED) {
                // Case 1: Uncle is red - recolor
                setColor(parentOf(x), BLACK);
                setColor(uncle, BLACK);
                setColor(parentOf(parentOf(x)), RED);
                x = parentOf(parentOf(x));
            } else {
                if (x == rightOf(parentOf(x))) {
                    // Case 2: Zigzag - rotate
                    x = parentOf(x);
                    rotateLeft(x);
                }
                // Case 3: Straight - rotate + recolor
                setColor(parentOf(x), BLACK);
                setColor(parentOf(parentOf(x)), RED);
                rotateRight(parentOf(parentOf(x)));
            }
        } else {
            // Mirror cases...
        }
    }
    root.color = BLACK;
}`
    },
    {
      title: 'Tree Rotations',
      icon: <RotateCcw className="w-5 h-5" />,
      content: `Rotations maintain BST property while rebalancing.

Left Rotation:
• Right child becomes parent
• Parent becomes left child
• Right child's left subtree moves

Right Rotation:
• Left child becomes parent
• Parent becomes right child
• Left child's right subtree moves`,
      code: `// Left rotation
//     x                y
//    / \\     →       / \\
//   a   y           x   c
//      / \\        / \\
//     b   c      a   b

private void rotateLeft(Entry<K,V> p) {
    if (p != null) {
        Entry<K,V> r = p.right;
        p.right = r.left;
        if (r.left != null)
            r.left.parent = p;
        r.parent = p.parent;
        if (p.parent == null)
            root = r;
        else if (p.parent.left == p)
            p.parent.left = r;
        else
            p.parent.right = r;
        r.left = p;
        p.parent = r;
    }
}

// Right rotation
//       y              x
//      / \\    →      / \\
//     x   c         a   y
//    / \\              / \\
//   a   b            b   c

private void rotateRight(Entry<K,V> p) {
    if (p != null) {
        Entry<K,V> l = p.left;
        p.left = l.right;
        if (l.right != null)
            l.right.parent = p;
        l.parent = p.parent;
        if (p.parent == null)
            root = l;
        else if (p.parent.right == p)
            p.parent.right = l;
        else
            p.parent.left = l;
        l.right = p;
        p.parent = l;
    }
}`
    },
    {
      title: 'Search Operations',
      icon: <Search className="w-5 h-5" />,
      content: `All search operations are O(log n) using BST traversal.

Basic operations:
• get() - standard BST search
• containsKey() - check existence

NavigableMap operations:
• floorEntry() - greatest ≤ key
• ceilingEntry() - smallest ≥ key
• lowerEntry() - greatest < key
• higherEntry() - smallest > key`,
      code: `// BST search - O(log n)
public V get(Object key) {
    Entry<K,V> p = getEntry(key);
    return (p == null ? null : p.value);
}

final Entry<K,V> getEntry(Object key) {
    if (comparator != null)
        return getEntryUsingComparator(key);

    Comparable<? super K> k = (Comparable<? super K>) key;
    Entry<K,V> p = root;
    while (p != null) {
        int cmp = k.compareTo(p.key);
        if (cmp < 0)
            p = p.left;
        else if (cmp > 0)
            p = p.right;
        else
            return p;
    }
    return null;
}

// Floor entry - greatest key ≤ given key
final Entry<K,V> getFloorEntry(K key) {
    Entry<K,V> p = root;
    while (p != null) {
        int cmp = compare(key, p.key);
        if (cmp > 0) {
            if (p.right != null)
                p = p.right;
            else
                return p;  // p.key < key, no right child
        } else if (cmp < 0) {
            if (p.left != null)
                p = p.left;
            else
                return null;  // All keys > given key
        } else {
            return p;  // Exact match
        }
    }
    return null;
}

// Usage examples
TreeMap<Integer, String> map = new TreeMap<>();
map.put(1, "one"); map.put(3, "three"); map.put(5, "five");

map.floorKey(4);    // 3
map.ceilingKey(4);  // 5
map.lowerKey(3);    // 1
map.higherKey(3);   // 5`
    },
    {
      title: 'Interview Questions',
      icon: <Settings className="w-5 h-5" />,
      content: `Common TreeMap interview questions:

Q1: TreeMap vs HashMap?
A: TreeMap sorted O(log n); HashMap unsorted O(1)

Q2: What tree does TreeMap use?
A: Red-Black Tree (self-balancing BST)

Q3: Time complexity?
A: O(log n) for get, put, remove

Q4: Can TreeMap have null keys?
A: No! Needs comparison (throws NPE)

Q5: TreeMap vs TreeSet?
A: TreeSet is TreeMap with dummy values`,
      code: `// Q1: TreeMap vs HashMap comparison
HashMap<String, Integer> hash = new HashMap<>();
TreeMap<String, Integer> tree = new TreeMap<>();

// HashMap: O(1) average, unsorted
// TreeMap: O(log n), sorted

// Q3: Time complexity
// put()    - O(log n)
// get()    - O(log n)
// remove() - O(log n)
// containsKey() - O(log n)
// firstKey()/lastKey() - O(log n)
// subMap() - O(log n) to create view

// Q4: Null handling
TreeMap<String, Integer> map = new TreeMap<>();
map.put(null, 1);  // NullPointerException!
// HashMap allows one null key

// Custom comparator can handle nulls:
TreeMap<String, Integer> nullSafe = new TreeMap<>(
    Comparator.nullsFirst(Comparator.naturalOrder())
);

// Q5: TreeSet implementation
public class TreeSet<E> {
    private transient NavigableMap<E,Object> m;
    private static final Object PRESENT = new Object();

    public TreeSet() {
        this(new TreeMap<>());
    }

    public boolean add(E e) {
        return m.put(e, PRESENT) == null;
    }
}`
    }
  ];

  return (
    <div className={`min-h-screen ${colors.background}`}>
      <div className="max-w-6xl mx-auto p-6">
{breadcrumb && <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />}
        <div className="flex items-center gap-3 mt-4">
          <button ref={backButtonRef} onClick={onBack}
            className={`flex items-center gap-2 px-4 py-2 ${colors.buttonBg} text-white rounded-lg transition-all duration-200 hover:scale-105`}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-2">
            <GitBranch className={`w-8 h-8 ${colors.accent}`} />
            <h1 className={`text-3xl font-bold ${colors.heading}`}>TreeMap - Internal Workings</h1>
          </div>
          <p className={`text-lg ${colors.secondary} mb-6`}>
            Deep dive into TreeMap: Red-Black tree implementation, rotations, and NavigableMap operations.
          </p>

          <div className={`${colors.card} rounded-xl p-4 mb-6 border ${colors.border}`}>
            <h3 className={`font-semibold ${colors.heading} mb-2`}>Red-Black Tree Properties</h3>
            <pre className={`text-sm ${colors.secondary} font-mono whitespace-pre overflow-x-auto`}>
{`Red-Black Tree:
         8(B)                  B = Black, R = Red
        /    \\
     4(R)    12(R)             Rules:
     /  \\    /   \\             1. Node is RED or BLACK
  2(B) 6(B) 10(B) 14(B)        2. Root is BLACK
                               3. Leaves (NIL) are BLACK
Time Complexity:               4. RED nodes have BLACK children
├─ get():      O(log n)        5. Equal black height on all paths
├─ put():      O(log n)
├─ remove():   O(log n)        Height ≤ 2 * log₂(n+1)
└─ iteration:  O(n)`}
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

export default TreeMapInternals;

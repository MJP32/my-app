import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, ArrowLeft, Layers, Zap, Database, Settings, TrendingUp, Copy, Scissors, Activity } from 'lucide-react';
import { KEYS } from '../../utils/keyboardNavigation.js';
import Breadcrumb from '../../components/Breadcrumb';
import { useTheme } from '../../contexts/ThemeContext';

const highlightCode = (code) => {
  let highlighted = code
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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

const ArrayListInternals = ({ onBack }) => {
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
      title: 'Why ArrayList?',
      icon: <Zap className="w-5 h-5" />,
      content: `ArrayList is the most commonly used List implementation in Java, providing dynamic array functionality.

Key advantages:
• O(1) random access by index
• Dynamic resizing - grows automatically
• Contiguous memory - cache friendly
• Simple and efficient for most use cases

When to use ArrayList:
• Frequent random access (get by index)
• Mostly appending elements
• Iterating through elements
• When you know approximate size

When NOT to use:
• Frequent insertions/deletions in middle
• Need thread safety (use CopyOnWriteArrayList)
• Fixed size needed (use array)`,
      code: `// ArrayList vs Array
String[] array = new String[10];  // Fixed size
ArrayList<String> list = new ArrayList<>();  // Dynamic

// ArrayList vs LinkedList
ArrayList<Integer> arrayList = new ArrayList<>();
// O(1) get, O(n) insert middle, O(1) amortized add

LinkedList<Integer> linkedList = new LinkedList<>();
// O(n) get, O(1) insert middle*, O(1) add
// *if you have the node reference

// Common operations
list.add("element");          // O(1) amortized
list.get(0);                  // O(1)
list.set(0, "new");          // O(1)
list.remove(0);              // O(n) - shifts elements
list.contains("element");     // O(n)
list.size();                 // O(1)`
    },
    {
      title: 'Internal Structure',
      icon: <Layers className="w-5 h-5" />,
      content: `ArrayList is backed by an Object[] array that grows dynamically.

Key internal fields:
• elementData: Object[] - the backing array
• size: int - number of elements (not capacity!)
• modCount: int - structural modification counter (for fail-fast)

Default capacity: 10 (when first element added)
Empty ArrayList: capacity = 0 (no allocation)

Important distinction:
• size = number of actual elements
• capacity = length of internal array
• size <= capacity always`,
      code: `// Simplified ArrayList structure
public class ArrayList<E> {
    // Backing array - stores actual elements
    transient Object[] elementData;

    // Number of elements (NOT capacity)
    private int size;

    // For fail-fast iterators
    protected transient int modCount = 0;

    // Default initial capacity
    private static final int DEFAULT_CAPACITY = 10;

    // Empty array instances
    private static final Object[] EMPTY_ELEMENTDATA = {};
    private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};

    // Constructors
    public ArrayList() {
        // Start with empty array, allocate on first add
        this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
    }

    public ArrayList(int initialCapacity) {
        if (initialCapacity > 0) {
            this.elementData = new Object[initialCapacity];
        } else if (initialCapacity == 0) {
            this.elementData = EMPTY_ELEMENTDATA;
        } else {
            throw new IllegalArgumentException();
        }
    }
}`
    },
    {
      title: 'Growth Strategy',
      icon: <TrendingUp className="w-5 h-5" />,
      content: `ArrayList grows by 50% (1.5x) when capacity is exceeded.

Growth formula: newCapacity = oldCapacity + (oldCapacity >> 1)
• 10 → 15 → 22 → 33 → 49 → 73 → ...

Why 1.5x and not 2x?
• 1.5x allows memory reuse in some allocators
• 2x can lead to memory fragmentation
• Good balance between growth and memory efficiency

Amortized O(1) analysis:
• Most adds: O(1) - just store in array
• Occasional resize: O(n) - copy all elements
• Over n operations: total work = O(n)
• Per operation: O(n)/n = O(1) amortized`,
      code: `// Growth mechanism
private void grow(int minCapacity) {
    int oldCapacity = elementData.length;

    // New capacity = old + old/2 (50% growth)
    int newCapacity = oldCapacity + (oldCapacity >> 1);

    // Ensure minimum capacity
    if (newCapacity - minCapacity < 0)
        newCapacity = minCapacity;

    // Check for overflow
    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);

    // Copy to new array
    elementData = Arrays.copyOf(elementData, newCapacity);
}

// Add operation
public boolean add(E e) {
    modCount++;
    add(e, elementData, size);
    return true;
}

private void add(E e, Object[] elementData, int s) {
    if (s == elementData.length)
        elementData = grow();  // Resize if full
    elementData[s] = e;
    size = s + 1;
}

// Capacity growth example:
// add 11th element to size-10 list:
// oldCapacity = 10
// newCapacity = 10 + 5 = 15
// Copy 10 elements to new array of size 15`
    },
    {
      title: 'Add Operations',
      icon: <Database className="w-5 h-5" />,
      content: `ArrayList supports adding at end (fast) or at specific index (slow).

add(E e) - Add at end:
• O(1) amortized - may trigger resize
• Most common operation

add(int index, E e) - Add at index:
• O(n) - must shift elements right
• Slower, avoid in hot paths

addAll(Collection c):
• O(n) where n = collection size
• May trigger single resize`,
      code: `// Add at end - O(1) amortized
public boolean add(E e) {
    modCount++;
    final int s = size;
    Object[] elementData = this.elementData;

    if (s == elementData.length)
        elementData = grow();  // Resize if needed

    elementData[s] = e;
    size = s + 1;
    return true;
}

// Add at index - O(n)
public void add(int index, E element) {
    rangeCheckForAdd(index);
    modCount++;
    final int s = size;
    Object[] elementData = this.elementData;

    if (s == elementData.length)
        elementData = grow();

    // Shift elements right - this is O(n)!
    System.arraycopy(elementData, index,
                     elementData, index + 1,
                     s - index);

    elementData[index] = element;
    size = s + 1;
}

// Example: add at index 2 in [A, B, C, D, E]
// Step 1: Shift [C, D, E] right → [A, B, _, C, D, E]
// Step 2: Insert X at index 2 → [A, B, X, C, D, E]`
    },
    {
      title: 'Remove Operations',
      icon: <Scissors className="w-5 h-5" />,
      content: `Remove operations shift elements left, making them O(n).

remove(int index):
• O(n) - shifts elements left
• Returns removed element

remove(Object o):
• O(n) - linear search + shift
• Returns boolean

clear():
• O(n) - nulls all elements for GC
• Doesn't shrink array

Note: ArrayList never shrinks automatically!
Use trimToSize() to reclaim memory.`,
      code: `// Remove by index - O(n)
public E remove(int index) {
    Objects.checkIndex(index, size);
    final Object[] es = elementData;

    E oldValue = (E) es[index];
    fastRemove(es, index);

    return oldValue;
}

private void fastRemove(Object[] es, int i) {
    modCount++;
    final int newSize = size - 1;

    if (newSize > i)
        // Shift elements left
        System.arraycopy(es, i + 1, es, i, newSize - i);

    es[size = newSize] = null;  // Clear for GC
}

// Remove by object - O(n)
public boolean remove(Object o) {
    final Object[] es = elementData;
    final int size = this.size;

    // Linear search
    int i = 0;
    if (o == null) {
        for (; i < size; i++)
            if (es[i] == null) break;
    } else {
        for (; i < size; i++)
            if (o.equals(es[i])) break;
    }

    if (i < size) {
        fastRemove(es, i);
        return true;
    }
    return false;
}

// Trim to size - reclaim unused memory
public void trimToSize() {
    modCount++;
    if (size < elementData.length) {
        elementData = (size == 0)
            ? EMPTY_ELEMENTDATA
            : Arrays.copyOf(elementData, size);
    }
}`
    },
    {
      title: 'Get/Set Operations',
      icon: <Activity className="w-5 h-5" />,
      content: `Get and Set are O(1) - direct array access.

This is ArrayList's main advantage:
• Random access in constant time
• No traversal needed
• Cache-friendly memory layout

Bounds checking:
• Throws IndexOutOfBoundsException
• Uses Objects.checkIndex (Java 9+)`,
      code: `// Get - O(1)
public E get(int index) {
    Objects.checkIndex(index, size);
    return elementData(index);
}

E elementData(int index) {
    return (E) elementData[index];
}

// Set - O(1)
public E set(int index, E element) {
    Objects.checkIndex(index, size);
    E oldValue = elementData(index);
    elementData[index] = element;
    return oldValue;
}

// Contains - O(n) linear search
public boolean contains(Object o) {
    return indexOf(o) >= 0;
}

public int indexOf(Object o) {
    return indexOfRange(o, 0, size);
}

int indexOfRange(Object o, int start, int end) {
    Object[] es = elementData;
    if (o == null) {
        for (int i = start; i < end; i++)
            if (es[i] == null) return i;
    } else {
        for (int i = start; i < end; i++)
            if (o.equals(es[i])) return i;
    }
    return -1;
}`
    },
    {
      title: 'Fail-Fast Iterator',
      icon: <Settings className="w-5 h-5" />,
      content: `ArrayList iterators are fail-fast using modCount.

Modification during iteration throws ConcurrentModificationException.

modCount tracks structural modifications:
• add(), remove(), clear()
• NOT set() - doesn't change structure

Iterator checks modCount on each operation.
If changed, throws exception.

Note: Fail-fast is best-effort, not guaranteed!`,
      code: `// Iterator implementation
private class Itr implements Iterator<E> {
    int cursor;       // Index of next element
    int lastRet = -1; // Index of last returned
    int expectedModCount = modCount;  // Snapshot

    public boolean hasNext() {
        return cursor != size;
    }

    public E next() {
        checkForComodification();  // Check modCount
        int i = cursor;
        if (i >= size)
            throw new NoSuchElementException();
        Object[] elementData = ArrayList.this.elementData;
        cursor = i + 1;
        return (E) elementData[lastRet = i];
    }

    final void checkForComodification() {
        if (modCount != expectedModCount)
            throw new ConcurrentModificationException();
    }
}

// This throws ConcurrentModificationException:
List<String> list = new ArrayList<>(Arrays.asList("a", "b", "c"));
for (String s : list) {
    if (s.equals("b")) {
        list.remove(s);  // Modifies during iteration!
    }
}

// Safe removal using iterator:
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    if (it.next().equals("b")) {
        it.remove();  // Safe - uses iterator's remove
    }
}

// Or use removeIf (Java 8+):
list.removeIf(s -> s.equals("b"));`
    },
    {
      title: 'ArrayList vs LinkedList',
      icon: <Copy className="w-5 h-5" />,
      content: `When to use each:

ArrayList advantages:
• O(1) random access
• Better cache locality
• Less memory per element
• Faster iteration

LinkedList advantages:
• O(1) add/remove at ends (as Deque)
• O(1) insert/remove with iterator position
• No resize overhead
• Stable references

In practice:
• ArrayList is almost always faster
• LinkedList only wins for queue/deque operations
• Memory overhead of LinkedList nodes is significant`,
      code: `// Memory comparison for 1000 integers:

// ArrayList:
// - Object header: ~12 bytes
// - elementData reference: ~8 bytes
// - size field: 4 bytes
// - Array: 1000 * 4 bytes = 4000 bytes
// Total: ~4024 bytes + array overhead

// LinkedList:
// - Each node: ~40 bytes (prev, next, element, overhead)
// - 1000 nodes = ~40,000 bytes
// Total: ~40,000 bytes (10x more!)

// Performance comparison:
ArrayList<Integer> arrayList = new ArrayList<>();
LinkedList<Integer> linkedList = new LinkedList<>();

// Random access - ArrayList wins
arrayList.get(500);   // O(1)
linkedList.get(500);  // O(n) - traverse 500 nodes

// Add at end - Both O(1)
arrayList.add(x);     // O(1) amortized
linkedList.add(x);    // O(1)

// Add at beginning - LinkedList wins
arrayList.add(0, x);  // O(n) - shift all elements
linkedList.addFirst(x); // O(1)

// Iteration - ArrayList wins (cache locality)
for (Integer i : arrayList) {}  // Fast
for (Integer i : linkedList) {} // Slower (pointer chasing)`
    },
    {
      title: 'Interview Questions',
      icon: <Database className="w-5 h-5" />,
      content: `Common ArrayList interview questions:

Q1: How does ArrayList grow?
A: By 50% (newCap = oldCap + oldCap/2)

Q2: Default capacity?
A: 10 (allocated on first add, not at construction)

Q3: Why not grow by 2x?
A: 1.5x allows memory reuse, less fragmentation

Q4: ArrayList vs Vector?
A: Vector is synchronized (thread-safe but slower)

Q5: How to make ArrayList thread-safe?
A: Collections.synchronizedList() or CopyOnWriteArrayList

Q6: Does ArrayList shrink?
A: No, call trimToSize() manually

Q7: Time complexity of add(index, element)?
A: O(n) due to element shifting`,
      code: `// Q1: Initial capacity optimization
// BAD - many resizes
ArrayList<Integer> list = new ArrayList<>();
for (int i = 0; i < 10000; i++) {
    list.add(i);  // Multiple resizes
}

// GOOD - single allocation
ArrayList<Integer> list = new ArrayList<>(10000);
for (int i = 0; i < 10000; i++) {
    list.add(i);  // No resizes
}

// Q5: Thread-safe ArrayList options

// Option 1: Synchronized wrapper
List<String> syncList = Collections.synchronizedList(new ArrayList<>());
// Must synchronize on iteration:
synchronized (syncList) {
    for (String s : syncList) { }
}

// Option 2: CopyOnWriteArrayList (read-heavy)
List<String> cowList = new CopyOnWriteArrayList<>();
// Safe iteration, expensive writes

// Q7: Efficient removal patterns
// BAD - O(n²) due to shifting on each remove
for (int i = 0; i < list.size(); i++) {
    if (shouldRemove(list.get(i))) {
        list.remove(i--);
    }
}

// GOOD - O(n) using removeIf
list.removeIf(item -> shouldRemove(item));`
    }
  ];

  return (
    <div className={`min-h-screen ${colors.background}`}>
      <div className="max-w-6xl mx-auto p-6">
        <Breadcrumb
          section={{ name: 'My Projects', icon: '💼', onClick: onBack }}
          category={{ name: 'Java Internals', onClick: onBack }}
          topic="ArrayList - Internal Workings"
        />
        <div className="flex items-center gap-3 mt-4">
          <button ref={backButtonRef} onClick={onBack}
            className={`flex items-center gap-2 px-4 py-2 ${colors.buttonBg} text-white rounded-lg transition-all duration-200 hover:scale-105`}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-2">
            <Database className={`w-8 h-8 ${colors.accent}`} />
            <h1 className={`text-3xl font-bold ${colors.heading}`}>ArrayList - Internal Workings</h1>
          </div>
          <p className={`text-lg ${colors.secondary} mb-6`}>
            Deep dive into Java's ArrayList: dynamic array, growth strategy, and performance characteristics.
          </p>

          <div className={`${colors.card} rounded-xl p-4 mb-6 border ${colors.border}`}>
            <h3 className={`font-semibold ${colors.heading} mb-2`}>Time Complexity</h3>
            <pre className={`text-sm ${colors.secondary} font-mono whitespace-pre overflow-x-auto`}>
{`Operation          | Time    | Notes
-------------------|---------|----------------------------------
get(index)         | O(1)    | Direct array access
set(index, e)      | O(1)    | Direct array access
add(e)             | O(1)*   | Amortized - may trigger resize
add(index, e)      | O(n)    | Shifts elements right
remove(index)      | O(n)    | Shifts elements left
remove(Object)     | O(n)    | Linear search + shift
contains(Object)   | O(n)    | Linear search
size()             | O(1)    | Returns stored field
isEmpty()          | O(1)    | Checks size == 0`}
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

export default ArrayListInternals;

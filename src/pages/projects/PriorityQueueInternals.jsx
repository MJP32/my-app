import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, ArrowLeft, Layers, Zap, ArrowUpDown, Plus, Minus, Settings } from 'lucide-react';
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

const PriorityQueueInternals = ({ onBack, breadcrumb }) => {
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
      title: 'Binary Heap Fundamentals',
      icon: <Zap className="w-5 h-5" />,
      content: `PriorityQueue is backed by a binary min-heap stored in an array.

Binary Heap properties:
• Complete binary tree (filled level by level)
• Heap property: parent ≤ children (min-heap)
• Stored in array (no pointers needed)

Array representation:
• Parent of i: (i - 1) / 2
• Left child of i: 2*i + 1
• Right child of i: 2*i + 2

Time complexity:
• offer/add: O(log n)
• poll/remove: O(log n)
• peek: O(1)
• contains: O(n)`,
      code: `// PriorityQueue structure
public class PriorityQueue<E> {
    transient Object[] queue;  // The heap array
    int size;
    private final Comparator<? super E> comparator;
    transient int modCount;

    private static final int DEFAULT_INITIAL_CAPACITY = 11;
}

// Array representation of heap:
//            1              Index:  0
//          /   \\
//         3     2           Index:  1, 2
//        / \\   / \\
//       7   4 5   6         Index:  3, 4, 5, 6
//
// Array: [1, 3, 2, 7, 4, 5, 6]
//
// Parent of index 4 (value 4): (4-1)/2 = 1 (value 3)
// Children of index 1 (value 3): 2*1+1=3, 2*1+2=4

// Basic usage
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(5);
pq.offer(1);
pq.offer(3);
pq.poll();  // Returns 1 (smallest)
pq.poll();  // Returns 3
pq.poll();  // Returns 5

// Max-heap using comparator
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(
    Collections.reverseOrder()
);
maxHeap.offer(1);
maxHeap.offer(5);
maxHeap.offer(3);
maxHeap.poll();  // Returns 5 (largest)`
    },
    {
      title: 'Sift Up (Insertion)',
      icon: <Plus className="w-5 h-5" />,
      content: `When adding an element, place it at the end and "sift up" to restore heap property.

Sift Up process:
1. Add element at end of array (next available position)
2. Compare with parent
3. If smaller than parent, swap
4. Repeat until heap property satisfied or reached root

This is O(log n) - at most tree height swaps.`,
      code: `// offer() - add element
public boolean offer(E e) {
    if (e == null)
        throw new NullPointerException();
    modCount++;
    int i = size;
    if (i >= queue.length)
        grow(i + 1);  // Resize if needed
    siftUp(i, e);
    size = i + 1;
    return true;
}

// Sift up - restore heap property after insert
private void siftUp(int k, E x) {
    if (comparator != null)
        siftUpUsingComparator(k, x, queue, comparator);
    else
        siftUpComparable(k, x, queue);
}

private static <T> void siftUpComparable(int k, T x, Object[] es) {
    Comparable<? super T> key = (Comparable<? super T>) x;
    while (k > 0) {
        int parent = (k - 1) >>> 1;  // Parent index
        Object e = es[parent];
        if (key.compareTo((T) e) >= 0)
            break;  // Heap property satisfied
        es[k] = e;  // Move parent down
        k = parent;
    }
    es[k] = key;
}

// Visual: Insert 2 into [1, 3, 4, 7, 5]
//
// Step 1: Add at end     Step 2: Compare with parent (5)
//       1                       1
//      / \\                     / \\
//     3   4                   3   4
//    / \\ /                   / \\ /
//   7  5 2                  7  5 2    (2 < 5, swap)
//
// Step 3: Swap            Step 4: Compare with parent (4)
//       1                       1
//      / \\                     / \\
//     3   4                   3   2    (2 < 4, swap)
//    / \\ /                   / \\ /
//   7  5 2                  7  5 4
//
// Final: [1, 3, 2, 7, 5, 4]`
    },
    {
      title: 'Sift Down (Removal)',
      icon: <Minus className="w-5 h-5" />,
      content: `When removing the root (min element), replace with last element and "sift down".

Sift Down process:
1. Return root element (min)
2. Move last element to root
3. Compare with smaller child
4. If larger than smaller child, swap
5. Repeat until heap property satisfied or reached leaf

This is O(log n) - at most tree height swaps.`,
      code: `// poll() - remove and return min
public E poll() {
    final Object[] es = queue;
    final E result = (E) es[0];
    if (result != null) {
        modCount++;
        final int n = --size;
        final E x = (E) es[n];
        es[n] = null;
        if (n > 0) {
            siftDown(0, x);  // Restore heap
        }
    }
    return result;
}

// Sift down - restore heap property after removal
private void siftDown(int k, E x) {
    if (comparator != null)
        siftDownUsingComparator(k, x, queue, size, comparator);
    else
        siftDownComparable(k, x, queue, size);
}

private static <T> void siftDownComparable(int k, T x, Object[] es, int n) {
    Comparable<? super T> key = (Comparable<? super T>) x;
    int half = n >>> 1;  // Loop while non-leaf
    while (k < half) {
        int child = (k << 1) + 1;  // Left child
        Object c = es[child];
        int right = child + 1;
        // Pick smaller child
        if (right < n && ((Comparable<? super T>) c).compareTo((T) es[right]) > 0)
            c = es[child = right];
        if (key.compareTo((T) c) <= 0)
            break;  // Heap property OK
        es[k] = c;  // Move child up
        k = child;
    }
    es[k] = key;
}

// Visual: Remove from [1, 3, 2, 7, 5, 4]
//
// Step 1: Remove 1, move 4 to root
//       4
//      / \\
//     3   2
//    / \\
//   7   5
//
// Step 2: Compare 4 with children (3,2), swap with 2
//       2
//      / \\
//     3   4
//    / \\
//   7   5
//
// Final: [2, 3, 4, 7, 5]`
    },
    {
      title: 'Heapify (Build Heap)',
      icon: <Layers className="w-5 h-5" />,
      content: `Building a heap from an array can be done in O(n) time using heapify.

Naive approach:
• Insert elements one by one: O(n log n)

Heapify (Floyd's algorithm):
• Start from last non-leaf node
• Sift down each node
• O(n) total time (not O(n log n)!)

Why O(n)?
• Most nodes are near bottom (do little work)
• Few nodes at top (do most work)
• Sum converges to O(n)`,
      code: `// Constructor with collection - uses heapify
public PriorityQueue(Collection<? extends E> c) {
    if (c instanceof SortedSet<?>) {
        // Already sorted, just copy
        SortedSet<? extends E> ss = (SortedSet<? extends E>) c;
        this.comparator = (Comparator<? super E>) ss.comparator();
        initElementsFromCollection(ss);
    } else if (c instanceof PriorityQueue<?>) {
        PriorityQueue<? extends E> pq = (PriorityQueue<? extends E>) c;
        this.comparator = (Comparator<? super E>) pq.comparator();
        initFromPriorityQueue(pq);
    } else {
        this.comparator = null;
        initFromCollection(c);
    }
}

private void initFromCollection(Collection<? extends E> c) {
    initElementsFromCollection(c);
    heapify();
}

// Heapify - O(n) to build heap
private void heapify() {
    final Object[] es = queue;
    int n = size;
    int i = (n >>> 1) - 1;  // Last non-leaf
    // Sift down from last non-leaf to root
    for (; i >= 0; i--)
        siftDown(i, (E) es[i]);
}

// Visual: Heapify [4, 7, 2, 5, 1, 3]
//
// Initial (not a valid heap):
//        4              Start at index 2 (last non-leaf)
//       / \\
//      7   2
//     / \\ /
//    5  1 3
//
// Sift down index 2 (value 2): OK, 2 < 3
// Sift down index 1 (value 7): swap with 1
//        4
//       / \\
//      1   2
//     / \\ /
//    5  7 3
//
// Sift down index 0 (value 4): swap with 1
//        1
//       / \\
//      4   2
//     / \\ /
//    5  7 3
//
// Sift down 4: swap with 5? No, 4 < 5
// Final: [1, 4, 2, 5, 7, 3] - valid min-heap!`
    },
    {
      title: 'Common Use Cases',
      icon: <ArrowUpDown className="w-5 h-5" />,
      content: `PriorityQueue is essential for many algorithms:

1. Dijkstra's shortest path
2. K-th largest/smallest element
3. Merge K sorted lists
4. Task scheduling
5. Huffman coding
6. Median finding (two heaps)`,
      code: `// 1. K-th largest element
public int findKthLargest(int[] nums, int k) {
    // Min-heap of size k
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    for (int num : nums) {
        pq.offer(num);
        if (pq.size() > k) {
            pq.poll();  // Remove smallest
        }
    }
    return pq.peek();  // K-th largest
}

// 2. Merge K sorted lists
public ListNode mergeKLists(ListNode[] lists) {
    PriorityQueue<ListNode> pq = new PriorityQueue<>(
        (a, b) -> a.val - b.val
    );
    for (ListNode list : lists) {
        if (list != null) pq.offer(list);
    }

    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    while (!pq.isEmpty()) {
        ListNode node = pq.poll();
        curr.next = node;
        curr = curr.next;
        if (node.next != null) {
            pq.offer(node.next);
        }
    }
    return dummy.next;
}

// 3. Median finder (two heaps)
class MedianFinder {
    PriorityQueue<Integer> maxHeap;  // Left half
    PriorityQueue<Integer> minHeap;  // Right half

    public MedianFinder() {
        maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        minHeap = new PriorityQueue<>();
    }

    public void addNum(int num) {
        maxHeap.offer(num);
        minHeap.offer(maxHeap.poll());
        if (minHeap.size() > maxHeap.size()) {
            maxHeap.offer(minHeap.poll());
        }
    }

    public double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.peek();
        }
        return (maxHeap.peek() + minHeap.peek()) / 2.0;
    }
}`
    },
    {
      title: 'Interview Questions',
      icon: <Settings className="w-5 h-5" />,
      content: `Common PriorityQueue interview questions:

Q1: What data structure backs PriorityQueue?
A: Binary min-heap stored in array

Q2: Time complexity of operations?
A: offer/poll O(log n), peek O(1)

Q3: How to create a max-heap?
A: Use Collections.reverseOrder() comparator

Q4: Can PriorityQueue have null elements?
A: No, throws NullPointerException

Q5: Is PriorityQueue thread-safe?
A: No, use PriorityBlockingQueue for concurrency`,
      code: `// Q1: Heap array structure
// Parent: (i-1)/2, Left: 2i+1, Right: 2i+2

// Q2: Time complexities
// offer()  - O(log n) - sift up
// poll()   - O(log n) - sift down
// peek()   - O(1)     - just return root
// add()    - O(log n) - same as offer
// remove() - O(n)     - need to find element first
// contains() - O(n)   - linear search

// Q3: Max-heap creation
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(
    Collections.reverseOrder()
);
// Or:
PriorityQueue<Integer> maxHeap2 = new PriorityQueue<>(
    (a, b) -> b - a
);

// Q4: No nulls allowed
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(null);  // NullPointerException!

// Q5: Thread-safe alternative
PriorityBlockingQueue<Integer> pbq = new PriorityBlockingQueue<>();
// Thread-safe, blocking operations

// Q6: Custom object ordering
class Task {
    int priority;
    String name;
}

PriorityQueue<Task> taskQueue = new PriorityQueue<>(
    Comparator.comparingInt(t -> t.priority)
);

// Q7: PriorityQueue vs TreeSet
// PriorityQueue: duplicates allowed, O(1) min access
// TreeSet: no duplicates, O(log n) for all ops`
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
            <ArrowUpDown className={`w-8 h-8 ${colors.accent}`} />
            <h1 className={`text-3xl font-bold ${colors.heading}`}>PriorityQueue - Internal Workings</h1>
          </div>
          <p className={`text-lg ${colors.secondary} mb-6`}>
            Deep dive into PriorityQueue: binary heap implementation, sift up/down operations, and heapify algorithm.
          </p>

          <div className={`${colors.card} rounded-xl p-4 mb-6 border ${colors.border}`}>
            <h3 className={`font-semibold ${colors.heading} mb-2`}>Binary Heap in Array</h3>
            <pre className={`text-sm ${colors.secondary} font-mono whitespace-pre overflow-x-auto`}>
{`Binary Min-Heap:
           1                    Array: [1, 3, 2, 7, 4, 5, 6]
         /   \\                  Index:  0  1  2  3  4  5  6
        3     2
       / \\   / \\                Parent of i:    (i - 1) / 2
      7   4 5   6               Left child:     2 * i + 1
                                Right child:    2 * i + 2
Time Complexity:
├─ offer()/add():  O(log n)    Sift up
├─ poll()/remove(): O(log n)   Sift down
├─ peek():         O(1)        Return root
└─ heapify():      O(n)        Build heap from array`}
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

export default PriorityQueueInternals;

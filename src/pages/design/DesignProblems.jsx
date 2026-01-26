import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const TOPIC_COLORS = {
  primary: '#3b82f6',
  primaryHover: '#60a5fa',
  bg: 'rgba(59, 130, 246, 0.1)',
  border: 'rgba(59, 130, 246, 0.3)',
  arrow: '#3b82f6',
  hoverBg: 'rgba(59, 130, 246, 0.2)',
  topicBg: 'rgba(59, 130, 246, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const HashMapDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="bucketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowHash" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">HashMap with Separate Chaining</text>
    <text x="50" y="55" fontSize="12" fontWeight="600" fill="#9ca3af">Buckets Array</text>
    <rect x="50" y="65" width="80" height="35" rx="4" fill="url(#bucketGrad)" />
    <text x="90" y="88" fontSize="11" fill="white" textAnchor="middle">[0]</text>
    <rect x="50" y="105" width="80" height="35" rx="4" fill="url(#bucketGrad)" />
    <text x="90" y="128" fontSize="11" fill="white" textAnchor="middle">[1]</text>
    <rect x="50" y="145" width="80" height="35" rx="4" fill="url(#bucketGrad)" />
    <text x="90" y="168" fontSize="11" fill="white" textAnchor="middle">[2]</text>
    <rect x="180" y="65" width="100" height="35" rx="6" fill="url(#nodeGrad)" />
    <text x="230" y="88" fontSize="10" fill="white" textAnchor="middle">k:1, v:A</text>
    <rect x="310" y="65" width="100" height="35" rx="6" fill="url(#nodeGrad)" />
    <text x="360" y="88" fontSize="10" fill="white" textAnchor="middle">k:8, v:B</text>
    <rect x="180" y="145" width="100" height="35" rx="6" fill="url(#nodeGrad)" />
    <text x="230" y="168" fontSize="10" fill="white" textAnchor="middle">k:2, v:C</text>
    <line x1="130" y1="82" x2="180" y2="82" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowHash)" />
    <line x1="280" y1="82" x2="310" y2="82" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowHash)" />
    <line x1="130" y1="162" x2="180" y2="162" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowHash)" />
    <text x="90" y="128" fontSize="9" fill="#6b7280" textAnchor="middle">null</text>
    <rect x="500" y="55" width="260" height="120" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="2" />
    <text x="630" y="85" fontSize="13" fontWeight="600" fill="#f59e0b" textAnchor="middle">hash(key) % capacity</text>
    <text x="630" y="110" fontSize="11" fill="#9ca3af" textAnchor="middle">Determines bucket index</text>
    <text x="630" y="135" fontSize="11" fill="#9ca3af" textAnchor="middle">Collisions handled via chaining</text>
    <text x="630" y="160" fontSize="10" fill="#6b7280" textAnchor="middle">O(1) avg, O(n) worst case</text>
  </svg>
)

const ArrayListDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="arrayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="newArrayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">ArrayList Dynamic Resizing</text>
    <text x="50" y="55" fontSize="11" fontWeight="600" fill="#9ca3af">Original (capacity=4)</text>
    <rect x="50" y="65" width="50" height="45" rx="4" fill="url(#arrayGrad)" stroke="#7c3aed" strokeWidth="2" />
    <text x="75" y="93" fontSize="12" fill="white" textAnchor="middle">A</text>
    <rect x="105" y="65" width="50" height="45" rx="4" fill="url(#arrayGrad)" stroke="#7c3aed" strokeWidth="2" />
    <text x="130" y="93" fontSize="12" fill="white" textAnchor="middle">B</text>
    <rect x="160" y="65" width="50" height="45" rx="4" fill="url(#arrayGrad)" stroke="#7c3aed" strokeWidth="2" />
    <text x="185" y="93" fontSize="12" fill="white" textAnchor="middle">C</text>
    <rect x="215" y="65" width="50" height="45" rx="4" fill="url(#arrayGrad)" stroke="#7c3aed" strokeWidth="2" />
    <text x="240" y="93" fontSize="12" fill="white" textAnchor="middle">D</text>
    <text x="320" y="93" fontSize="24" fill="#f59e0b" textAnchor="middle">{`->`}</text>
    <text x="320" y="120" fontSize="10" fill="#9ca3af" textAnchor="middle">resize(2x)</text>
    <text x="420" y="55" fontSize="11" fontWeight="600" fill="#9ca3af">New Array (capacity=8)</text>
    <rect x="420" y="65" width="40" height="45" rx="4" fill="url(#newArrayGrad)" stroke="#059669" strokeWidth="2" />
    <text x="440" y="93" fontSize="12" fill="white" textAnchor="middle">A</text>
    <rect x="465" y="65" width="40" height="45" rx="4" fill="url(#newArrayGrad)" stroke="#059669" strokeWidth="2" />
    <text x="485" y="93" fontSize="12" fill="white" textAnchor="middle">B</text>
    <rect x="510" y="65" width="40" height="45" rx="4" fill="url(#newArrayGrad)" stroke="#059669" strokeWidth="2" />
    <text x="530" y="93" fontSize="12" fill="white" textAnchor="middle">C</text>
    <rect x="555" y="65" width="40" height="45" rx="4" fill="url(#newArrayGrad)" stroke="#059669" strokeWidth="2" />
    <text x="575" y="93" fontSize="12" fill="white" textAnchor="middle">D</text>
    <rect x="600" y="65" width="40" height="45" rx="4" fill="#374151" stroke="#4b5563" strokeWidth="2" strokeDasharray="4,2" />
    <rect x="645" y="65" width="40" height="45" rx="4" fill="#374151" stroke="#4b5563" strokeWidth="2" strokeDasharray="4,2" />
    <rect x="690" y="65" width="40" height="45" rx="4" fill="#374151" stroke="#4b5563" strokeWidth="2" strokeDasharray="4,2" />
    <rect x="735" y="65" width="40" height="45" rx="4" fill="#374151" stroke="#4b5563" strokeWidth="2" strokeDasharray="4,2" />
    <text x="400" y="160" fontSize="11" fill="#6b7280" textAnchor="middle">Amortized O(1) add | O(n) insert/remove | O(1) random access</text>
  </svg>
)

const CircularBufferDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="bufferGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#db2777', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Circular Buffer (Ring Buffer)</text>
    <circle cx="180" cy="110" r="70" fill="none" stroke="#374151" strokeWidth="22" />
    <path d="M 180 40 A 70 70 0 0 1 250 110" fill="none" stroke="url(#bufferGrad)" strokeWidth="22" />
    <path d="M 250 110 A 70 70 0 0 1 180 180" fill="none" stroke="url(#bufferGrad)" strokeWidth="22" />
    <circle cx="180" cy="40" r="10" fill="#10b981" />
    <text x="180" y="20" fontSize="10" fill="#10b981" textAnchor="middle">head</text>
    <circle cx="180" cy="180" r="10" fill="#f59e0b" />
    <text x="180" y="200" fontSize="10" fill="#f59e0b" textAnchor="middle">tail</text>
    <text x="215" y="70" fontSize="11" fill="white" textAnchor="middle">A</text>
    <text x="240" y="110" fontSize="11" fill="white" textAnchor="middle">B</text>
    <text x="215" y="150" fontSize="11" fill="white" textAnchor="middle">C</text>
    <rect x="380" y="50" width="380" height="120" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="2" />
    <text x="570" y="80" fontSize="13" fontWeight="600" fill="#ec4899" textAnchor="middle">Ring Buffer Operations</text>
    <text x="400" y="105" fontSize="11" fill="#9ca3af">write(data): Add at tail, advance tail</text>
    <text x="400" y="125" fontSize="11" fill="#9ca3af">read(): Remove from head, advance head</text>
    <text x="400" y="145" fontSize="11" fill="#9ca3af">Wrap around: (index + 1) % capacity</text>
  </svg>
)

const ThreadSafeCounterDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="threadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#0891b2', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="counterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowThread" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Thread-Safe Counter with Synchronization</text>
    <rect x="50" y="50" width="100" height="45" rx="6" fill="url(#threadGrad)" />
    <text x="100" y="78" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Thread 1</text>
    <rect x="50" y="105" width="100" height="45" rx="6" fill="url(#threadGrad)" />
    <text x="100" y="133" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Thread 2</text>
    <rect x="50" y="160" width="100" height="45" rx="6" fill="url(#threadGrad)" />
    <text x="100" y="188" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Thread 3</text>
    <rect x="250" y="85" width="120" height="70" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="2" />
    <text x="310" y="115" fontSize="11" fontWeight="600" fill="#9ca3af" textAnchor="middle">synchronized</text>
    <text x="310" y="135" fontSize="10" fill="#6b7280" textAnchor="middle">or AtomicInteger</text>
    <rect x="470" y="75" width="140" height="90" rx="10" fill="url(#counterGrad)" stroke="#d97706" strokeWidth="3" />
    <text x="540" y="110" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">Counter</text>
    <text x="540" y="140" fontSize="22" fontWeight="bold" fill="white" textAnchor="middle">42</text>
    <line x1="150" y1="72" x2="250" y2="100" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowThread)" />
    <line x1="150" y1="127" x2="250" y2="120" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowThread)" />
    <line x1="150" y1="182" x2="250" y2="140" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowThread)" />
    <line x1="370" y1="120" x2="470" y2="120" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowThread)" />
    <text x="690" y="120" fontSize="11" fill="#6b7280" textAnchor="middle">One at a time</text>
  </svg>
)

const LFUCacheDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="freqGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="cacheGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#14b8a6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#0d9488', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">LFU Cache - Frequency Buckets</text>
    <text x="50" y="55" fontSize="11" fontWeight="600" fill="#9ca3af">Frequency Buckets</text>
    <rect x="50" y="65" width="90" height="35" rx="6" fill="url(#freqGrad)" />
    <text x="95" y="88" fontSize="11" fill="white" textAnchor="middle">freq=1</text>
    <rect x="50" y="110" width="90" height="35" rx="6" fill="url(#freqGrad)" />
    <text x="95" y="133" fontSize="11" fill="white" textAnchor="middle">freq=2</text>
    <rect x="50" y="155" width="90" height="35" rx="6" fill="url(#freqGrad)" />
    <text x="95" y="178" fontSize="11" fill="white" textAnchor="middle">freq=3</text>
    <rect x="180" y="65" width="65" height="35" rx="4" fill="url(#cacheGrad)" />
    <text x="212" y="88" fontSize="10" fill="white" textAnchor="middle">k:D</text>
    <rect x="255" y="65" width="65" height="35" rx="4" fill="url(#cacheGrad)" />
    <text x="287" y="88" fontSize="10" fill="white" textAnchor="middle">k:E</text>
    <rect x="180" y="110" width="65" height="35" rx="4" fill="url(#cacheGrad)" />
    <text x="212" y="133" fontSize="10" fill="white" textAnchor="middle">k:B</text>
    <rect x="180" y="155" width="65" height="35" rx="4" fill="url(#cacheGrad)" />
    <text x="212" y="178" fontSize="10" fill="white" textAnchor="middle">k:A</text>
    <line x1="140" y1="82" x2="180" y2="82" stroke="#f59e0b" strokeWidth="2" />
    <line x1="140" y1="127" x2="180" y2="127" stroke="#f59e0b" strokeWidth="2" />
    <line x1="140" y1="172" x2="180" y2="172" stroke="#f59e0b" strokeWidth="2" />
    <rect x="400" y="55" width="360" height="130" rx="8" fill="#1f2937" stroke="#374151" strokeWidth="2" />
    <text x="580" y="85" fontSize="13" fontWeight="600" fill="#6366f1" textAnchor="middle">LFU Cache Strategy</text>
    <text x="420" y="110" fontSize="11" fill="#9ca3af">Evict least frequently used item</text>
    <text x="420" y="135" fontSize="11" fill="#9ca3af">Tie-breaker: LRU within same frequency</text>
    <text x="420" y="160" fontSize="11" fill="#9ca3af">minFreq tracks lowest bucket with items</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function DesignProblems({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'hashmap',
      name: 'Design HashMap',
      icon: '#',
      color: '#3b82f6',
      description: 'Design a HashMap with put, get, and remove operations. Handle collisions using chaining (linked lists). Support dynamic resizing when load factor exceeds threshold.',
      diagram: HashMapDiagram,
      details: [
        {
          name: 'Core Structure',
          explanation: 'A HashMap uses an array of buckets where each bucket can contain a linked list of key-value pairs. The hash function converts a key to an array index using hash(key) % capacity. When multiple keys hash to the same index (collision), they are stored in a linked list at that bucket. The load factor (size/capacity) determines when to resize - typically at 0.75 to maintain O(1) performance.',
          codeExample: `class MyHashMap {
    private class Node {
        int key, value;
        Node next;
        Node(int k, int v) { key = k; value = v; }
    }

    private Node[] buckets;
    private int size, capacity;
    private static final double LOAD_FACTOR = 0.75;

    public MyHashMap() {
        capacity = 16;
        buckets = new Node[capacity];
        size = 0;
    }

    private int hash(int key) {
        return Math.abs(key) % capacity;
    }
}`
        },
        {
          name: 'Put Operation',
          explanation: 'The put operation first checks if resizing is needed (when load factor > 0.75). It calculates the bucket index using the hash function, then searches the chain for an existing key. If found, it updates the value; otherwise, it adds a new node at the head of the chain. This ensures O(1) average time complexity for insertions.',
          codeExample: `public void put(int key, int value) {
    if (size >= capacity * LOAD_FACTOR) {
        resize();
    }

    int index = hash(key);
    Node curr = buckets[index];

    // Check if key exists - update value
    while (curr != null) {
        if (curr.key == key) {
            curr.value = value;
            return;
        }
        curr = curr.next;
    }

    // Add new node at head of chain
    Node newNode = new Node(key, value);
    newNode.next = buckets[index];
    buckets[index] = newNode;
    size++;
}`
        },
        {
          name: 'Get & Remove',
          explanation: 'Get operation traverses the chain at the computed bucket index until it finds the matching key or reaches the end. Remove operation is similar but requires tracking the previous node to update the chain links. Both operations are O(1) average time assuming a good hash function distributes keys evenly.',
          codeExample: `public int get(int key) {
    int index = hash(key);
    Node curr = buckets[index];

    while (curr != null) {
        if (curr.key == key) return curr.value;
        curr = curr.next;
    }
    return -1; // Not found
}

public void remove(int key) {
    int index = hash(key);
    Node curr = buckets[index], prev = null;

    while (curr != null) {
        if (curr.key == key) {
            if (prev == null) buckets[index] = curr.next;
            else prev.next = curr.next;
            size--;
            return;
        }
        prev = curr;
        curr = curr.next;
    }
}`
        },
        {
          name: 'Dynamic Resizing',
          explanation: 'When the load factor exceeds the threshold, the HashMap doubles its capacity and rehashes all existing entries. This is crucial because without resizing, chains grow long and operations degrade to O(n). The resize operation itself is O(n) but is amortized O(1) per put operation since it happens infrequently.',
          codeExample: `private void resize() {
    int newCapacity = capacity * 2;
    Node[] newBuckets = new Node[newCapacity];

    // Rehash all entries
    for (Node head : buckets) {
        Node curr = head;
        while (curr != null) {
            Node next = curr.next;

            // Compute new index with new capacity
            int newIndex = Math.abs(curr.key) % newCapacity;
            curr.next = newBuckets[newIndex];
            newBuckets[newIndex] = curr;

            curr = next;
        }
    }

    buckets = newBuckets;
    capacity = newCapacity;
}`
        }
      ]
    },
    {
      id: 'arraylist',
      name: 'Design ArrayList',
      icon: '[]',
      color: '#8b5cf6',
      description: 'Design a dynamic array that automatically grows when full. Implement add, get, remove, and size operations with amortized O(1) insertion.',
      diagram: ArrayListDiagram,
      details: [
        {
          name: 'Core Structure',
          explanation: 'An ArrayList uses a fixed-size internal array that grows dynamically. It tracks both the current size (number of elements) and capacity (array length). When the array is full, it creates a new array with doubled capacity and copies all elements. This doubling strategy ensures amortized O(1) insertion.',
          codeExample: `class MyArrayList {
    private int[] data;
    private int size;
    private int capacity;
    private static final int INITIAL_CAPACITY = 10;

    public MyArrayList() {
        capacity = INITIAL_CAPACITY;
        data = new int[capacity];
        size = 0;
    }

    public int size() {
        return size;
    }

    public boolean isEmpty() {
        return size == 0;
    }
}`
        },
        {
          name: 'Add & Resize',
          explanation: 'The add operation checks if the array is full, triggers a resize if needed, then places the new element at index [size] and increments size. The resize operation creates a new array of double capacity and copies all existing elements. While a single resize is O(n), the amortized cost per add is O(1) because resizes happen exponentially less frequently.',
          codeExample: `public void add(int val) {
    if (size == capacity) {
        resize(capacity * 2);
    }
    data[size++] = val;
}

private void resize(int newCapacity) {
    int[] newData = new int[newCapacity];
    for (int i = 0; i < size; i++) {
        newData[i] = data[i];
    }
    data = newData;
    capacity = newCapacity;
}

// Amortized analysis: n adds cost O(n) total
// Copies: 1 + 2 + 4 + ... + n = 2n
// Per operation: 2n / n = O(1)`
        },
        {
          name: 'Get & Set',
          explanation: 'Get and set operations provide O(1) random access by directly indexing into the underlying array. Bounds checking is essential to prevent IndexOutOfBoundsException. This constant-time access is the key advantage of array-based lists over linked lists.',
          codeExample: `public int get(int index) {
    if (index < 0 || index >= size) {
        throw new IndexOutOfBoundsException(
            "Index: " + index + ", Size: " + size
        );
    }
    return data[index];
}

public void set(int index, int val) {
    if (index < 0 || index >= size) {
        throw new IndexOutOfBoundsException(
            "Index: " + index + ", Size: " + size
        );
    }
    data[index] = val;
}`
        },
        {
          name: 'Remove & Insert',
          explanation: 'Remove requires shifting all elements after the removed index left by one position, making it O(n) worst case. Similarly, inserting at a specific index requires shifting elements right. Optional shrinking when size drops to 1/4 capacity saves memory and prevents thrashing (alternating grow/shrink).',
          codeExample: `public void remove(int index) {
    if (index < 0 || index >= size) {
        throw new IndexOutOfBoundsException("Index: " + index);
    }

    // Shift elements left
    for (int i = index; i < size - 1; i++) {
        data[i] = data[i + 1];
    }
    size--;

    // Optional: shrink at 1/4 capacity
    if (size > 0 && size == capacity / 4) {
        resize(capacity / 2);
    }
}

public void addAt(int index, int val) {
    if (size == capacity) resize(capacity * 2);

    // Shift elements right
    for (int i = size; i > index; i--) {
        data[i] = data[i - 1];
    }
    data[index] = val;
    size++;
}`
        }
      ]
    },
    {
      id: 'circular-buffer',
      name: 'Circular Buffer',
      icon: 'O',
      color: '#ec4899',
      description: 'Design a fixed-size ring buffer with O(1) write and read operations. When full, oldest data is overwritten. Perfect for streaming, logging, and producer-consumer patterns.',
      diagram: CircularBufferDiagram,
      details: [
        {
          name: 'Core Structure',
          explanation: 'A circular buffer uses a fixed-size array with two pointers: writePos (where new data goes) and readPos (where oldest data is). Both pointers wrap around using modulo arithmetic: (pos + 1) % capacity. This creates a "ring" effect where the end connects to the beginning, enabling efficient FIFO operations without shifting elements.',
          codeExample: `class CircularBuffer {
    private int[] buffer;
    private int writePos;
    private int readPos;
    private int count;
    private int capacity;

    public CircularBuffer(int capacity) {
        this.capacity = capacity;
        buffer = new int[capacity];
        writePos = 0;
        readPos = 0;
        count = 0;
    }

    public boolean isEmpty() { return count == 0; }
    public boolean isFull() { return count == capacity; }
    public int size() { return count; }
}`
        },
        {
          name: 'Write Operation',
          explanation: 'Write places data at the current writePos, then advances writePos using modulo wraparound. If the buffer is full, it also advances readPos (overwriting the oldest data). This ensures the buffer never grows beyond its fixed capacity while always accepting new data.',
          codeExample: `public void write(int value) {
    buffer[writePos] = value;
    writePos = (writePos + 1) % capacity;

    if (count < capacity) {
        count++;
    } else {
        // Buffer full - overwrite oldest, advance read
        readPos = (readPos + 1) % capacity;
    }
}

// Example: capacity=3
// write(1): [1,_,_] writePos=1, readPos=0, count=1
// write(2): [1,2,_] writePos=2, readPos=0, count=2
// write(3): [1,2,3] writePos=0, readPos=0, count=3 (full)
// write(4): [4,2,3] writePos=1, readPos=1, count=3
// Now oldest is 2, not 1`
        },
        {
          name: 'Read Operation',
          explanation: 'Read retrieves data at readPos, advances readPos with modulo wraparound, and decrements count. It throws an exception if the buffer is empty. The peek operation is similar but does not advance readPos or modify count.',
          codeExample: `public int read() {
    if (isEmpty()) {
        throw new IllegalStateException("Buffer is empty");
    }

    int value = buffer[readPos];
    readPos = (readPos + 1) % capacity;
    count--;

    return value;
}

public int peek() {
    if (isEmpty()) {
        throw new IllegalStateException("Buffer is empty");
    }
    return buffer[readPos];
}

public void clear() {
    writePos = 0;
    readPos = 0;
    count = 0;
}`
        },
        {
          name: 'Thread-Safe Version',
          explanation: 'For multi-threaded scenarios, synchronization is needed. A simple approach uses a lock object. For blocking producer-consumer patterns, use wait/notify to block writers when full and readers when empty, enabling efficient thread coordination.',
          codeExample: `class CircularBufferThreadSafe {
    private final Object lock = new Object();
    // ... other fields ...

    public void write(int value) {
        synchronized (lock) {
            buffer[writePos] = value;
            writePos = (writePos + 1) % capacity;
            if (count < capacity) count++;
            else readPos = (readPos + 1) % capacity;
        }
    }

    public int read() {
        synchronized (lock) {
            if (isEmpty()) throw new IllegalStateException();
            int value = buffer[readPos];
            readPos = (readPos + 1) % capacity;
            count--;
            return value;
        }
    }
}`
        }
      ]
    },
    {
      id: 'thread-safe-counter',
      name: 'Thread-Safe Counter',
      icon: '++',
      color: '#06b6d4',
      description: 'Design a counter that multiple threads can safely increment/decrement concurrently. Explore different synchronization mechanisms: synchronized, AtomicInteger, and locks.',
      diagram: ThreadSafeCounterDiagram,
      details: [
        {
          name: 'The Race Condition Problem',
          explanation: 'A simple count++ is NOT atomic - it involves read, increment, and write operations. Without synchronization, concurrent threads can interleave these operations, causing lost updates. For example, if two threads read count=5 simultaneously, both add 1 and write 6, one increment is lost.',
          codeExample: `// BROKEN - Not thread-safe!
class BrokenCounter {
    private int count = 0;

    public void increment() {
        count++;  // NOT ATOMIC!
        // Actually: temp = count; temp = temp + 1; count = temp;
    }
}

// Race condition example:
// Thread A: read count (5)
// Thread B: read count (5)
// Thread A: add 1 (6)
// Thread B: add 1 (6)
// Thread A: write 6
// Thread B: write 6
// Result: 6, Expected: 7 - Lost update!`
        },
        {
          name: 'synchronized Solution',
          explanation: 'The synchronized keyword uses the object\'s intrinsic lock (monitor). Only one thread can hold the lock at a time, ensuring mutual exclusion. It\'s simple but blocks all readers during writes and has some overhead from lock acquisition.',
          codeExample: `class CounterSynchronized {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }

    public synchronized void decrement() {
        count--;
    }

    public synchronized int get() {
        return count;
    }

    public synchronized void reset() {
        count = 0;
    }
}

// How it works:
// Thread A: acquire lock -> count++ -> release lock
// Thread B: waiting... acquire lock -> count++ -> release`
        },
        {
          name: 'AtomicInteger Solution',
          explanation: 'AtomicInteger uses hardware-level Compare-And-Swap (CAS) operations. It\'s lock-free and non-blocking, making it faster under high contention. CAS reads the current value, computes the new value, then atomically updates only if the value hasn\'t changed.',
          codeExample: `import java.util.concurrent.atomic.AtomicInteger;

class CounterAtomic {
    private AtomicInteger count = new AtomicInteger(0);

    public void increment() {
        count.incrementAndGet();  // Atomic!
    }

    public void decrement() {
        count.decrementAndGet();
    }

    public int get() {
        return count.get();
    }

    public void add(int value) {
        count.addAndGet(value);
    }

    // CAS loop internally:
    // do { current = get(); next = current + 1; }
    // while (!compareAndSet(current, next));
}`
        },
        {
          name: 'ReentrantLock & ReadWriteLock',
          explanation: 'ReentrantLock provides more control than synchronized: tryLock with timeout, fairness option (FIFO ordering), and interruptible waits. ReadWriteLock allows multiple concurrent readers but exclusive writers, ideal when reads >> writes.',
          codeExample: `import java.util.concurrent.locks.*;

class CounterReadWriteLock {
    private int count = 0;
    private ReadWriteLock rwLock = new ReentrantReadWriteLock();
    private Lock readLock = rwLock.readLock();
    private Lock writeLock = rwLock.writeLock();

    public void increment() {
        writeLock.lock();
        try {
            count++;
        } finally {
            writeLock.unlock(); // MUST unlock in finally!
        }
    }

    public int get() {
        readLock.lock(); // Multiple readers allowed
        try {
            return count;
        } finally {
            readLock.unlock();
        }
    }
}`
        }
      ]
    },
    {
      id: 'lfu-cache',
      name: 'LFU Cache',
      icon: 'LFU',
      color: '#6366f1',
      description: 'Design a Least Frequently Used cache with O(1) get and put operations. Evict the least frequently used item when full, using LRU as tie-breaker for same frequency.',
      diagram: LFUCacheDiagram,
      details: [
        {
          name: 'Core Data Structures',
          explanation: 'LFU Cache requires three maps: keyToValue (stores values), keyToFreq (tracks access frequency), and freqToKeys (maps frequency to ordered set of keys). The freqToKeys uses LinkedHashSet or doubly linked list for O(1) removal and LRU ordering within each frequency bucket.',
          codeExample: `class LFUCache {
    private int capacity;
    private int minFreq;
    private Map<Integer, Integer> keyToValue;
    private Map<Integer, Integer> keyToFreq;
    private Map<Integer, LinkedHashSet<Integer>> freqToKeys;

    public LFUCache(int capacity) {
        this.capacity = capacity;
        this.minFreq = 0;
        this.keyToValue = new HashMap<>();
        this.keyToFreq = new HashMap<>();
        this.freqToKeys = new HashMap<>();
    }
}

// Example state:
// keyToValue: {1->A, 2->B, 3->C}
// keyToFreq: {1->3, 2->1, 3->2}
// freqToKeys: {1->[2], 2->[3], 3->[1]}
// minFreq: 1 (key 2 is LFU)`
        },
        {
          name: 'Get Operation',
          explanation: 'Get retrieves the value and updates the key\'s frequency. It removes the key from its current frequency bucket, adds it to the next frequency bucket, and updates minFreq if the old bucket is now empty. All operations are O(1) with proper data structures.',
          codeExample: `public int get(int key) {
    if (!keyToValue.containsKey(key)) {
        return -1;
    }

    updateFrequency(key);
    return keyToValue.get(key);
}

private void updateFrequency(int key) {
    int oldFreq = keyToFreq.get(key);
    int newFreq = oldFreq + 1;

    // Remove from old frequency bucket
    freqToKeys.get(oldFreq).remove(key);

    // Update minFreq if old bucket is now empty
    if (freqToKeys.get(oldFreq).isEmpty() && oldFreq == minFreq) {
        minFreq = newFreq;
    }

    // Add to new frequency bucket
    keyToFreq.put(key, newFreq);
    freqToKeys.putIfAbsent(newFreq, new LinkedHashSet<>());
    freqToKeys.get(newFreq).add(key);
}`
        },
        {
          name: 'Put Operation',
          explanation: 'Put handles three cases: update existing key (just update value and frequency), insert when under capacity (add with frequency 1), or insert when at capacity (evict LFU first). The eviction removes the first key from the minFreq bucket (LRU among same frequency).',
          codeExample: `public void put(int key, int value) {
    if (capacity == 0) return;

    // Case 1: Update existing key
    if (keyToValue.containsKey(key)) {
        keyToValue.put(key, value);
        updateFrequency(key);
        return;
    }

    // Case 2: Evict if at capacity
    if (keyToValue.size() >= capacity) {
        // Remove LRU key from minimum frequency bucket
        int evictKey = freqToKeys.get(minFreq).iterator().next();
        freqToKeys.get(minFreq).remove(evictKey);
        keyToValue.remove(evictKey);
        keyToFreq.remove(evictKey);
    }

    // Case 3: Insert new key with frequency 1
    keyToValue.put(key, value);
    keyToFreq.put(key, 1);
    freqToKeys.putIfAbsent(1, new LinkedHashSet<>());
    freqToKeys.get(1).add(key);
    minFreq = 1;  // New key always has freq 1
}`
        },
        {
          name: 'Python Implementation',
          explanation: 'Python\'s OrderedDict maintains insertion order and supports O(1) popitem(last=False) for removing the oldest item. This makes the LFU implementation cleaner by using OrderedDict for each frequency bucket instead of manually managing doubly linked lists.',
          codeExample: `from collections import defaultdict, OrderedDict

class LFUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.min_freq = 0
        self.key_to_val = {}
        self.key_to_freq = {}
        self.freq_to_keys = defaultdict(OrderedDict)

    def get(self, key: int) -> int:
        if key not in self.key_to_val:
            return -1
        self._update_frequency(key)
        return self.key_to_val[key]

    def put(self, key: int, value: int) -> None:
        if self.capacity == 0: return

        if key in self.key_to_val:
            self.key_to_val[key] = value
            self._update_frequency(key)
            return

        if len(self.key_to_val) >= self.capacity:
            # popitem(last=False) removes oldest (LRU)
            evict_key, _ = self.freq_to_keys[self.min_freq].popitem(last=False)
            del self.key_to_val[evict_key]
            del self.key_to_freq[evict_key]

        self.key_to_val[key] = value
        self.key_to_freq[key] = 1
        self.freq_to_keys[1][key] = None
        self.min_freq = 1`
        }
      ]
    }
  ]

  // =============================================================================
  // NAVIGATION HANDLERS
  // =============================================================================

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  const handlePreviousConcept = () => {
    if (selectedConceptIndex > 0) {
      setSelectedConceptIndex(selectedConceptIndex - 1)
      setSelectedDetailIndex(0)
    }
  }

  const handleNextConcept = () => {
    if (selectedConceptIndex < concepts.length - 1) {
      setSelectedConceptIndex(selectedConceptIndex + 1)
      setSelectedDetailIndex(0)
    }
  }

  // =============================================================================
  // BREADCRUMB CONFIGURATION
  // =============================================================================

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'Practice', icon: '🏋️', page: 'Practice' },
      { name: 'Design Problems', icon: '🔧', page: 'Design Problems' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index) => {
    if (index === 0) {
      onBack()
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)
    }
  }

  // =============================================================================
  // KEYBOARD NAVIGATION
  // =============================================================================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (selectedConcept) {
          setSelectedConceptIndex(null)
        } else {
          onBack()
        }
      } else if (e.key === 'ArrowLeft' && selectedConceptIndex !== null) {
        e.preventDefault()
        handlePreviousConcept()
      } else if (e.key === 'ArrowRight' && selectedConceptIndex !== null) {
        e.preventDefault()
        handleNextConcept()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

  // =============================================================================
  // STYLES
  // =============================================================================

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }

  const headerStyle = {
    maxWidth: '1400px',
    margin: '0 auto 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  }

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(59, 130, 246, 0.2)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '0.5rem',
    color: '#60a5fa',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>System Design Problems</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Back to Practice
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          colors={TOPIC_COLORS}
        />
      </div>

      {/* Concept Cards Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {concepts.map((concept, index) => (
          <div
            key={concept.id}
            onClick={() => setSelectedConceptIndex(index)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: `1px solid ${concept.color}40`,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = `0 20px 40px ${concept.color}20`
              e.currentTarget.style.borderColor = concept.color
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.borderColor = `${concept.color}40`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: concept.color,
                background: `${concept.color}20`,
                padding: '0.5rem 0.75rem',
                borderRadius: '0.5rem',
                fontFamily: 'monospace'
              }}>{concept.icon}</span>
              <h3 style={{ color: concept.color, margin: 0, fontSize: '1.25rem' }}>{concept.name}</h3>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>{concept.description}</p>
            <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
              {concept.details.length} topics - Click to explore
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Selected Concept */}
      {selectedConcept && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => setSelectedConceptIndex(null)}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              borderRadius: '1rem',
              padding: '2rem',
              maxWidth: '1200px',
              width: '100%',
              maxHeight: '92vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              colors={TOPIC_COLORS}
            />

            {/* Modal Header with Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #334155'
            }}>
              <h2 style={{
                color: selectedConcept.color,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.25rem'
              }}>
                <span style={{
                  fontFamily: 'monospace',
                  background: `${selectedConcept.color}20`,
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem'
                }}>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button
                  onClick={handlePreviousConcept}
                  disabled={selectedConceptIndex === 0}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >Prev</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>
                  {selectedConceptIndex + 1}/{concepts.length}
                </span>
                <button
                  onClick={handleNextConcept}
                  disabled={selectedConceptIndex === concepts.length - 1}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >Next</button>
                <button
                  onClick={() => setSelectedConceptIndex(null)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '0.375rem',
                    color: '#f87171',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    marginLeft: '0.5rem'
                  }}
                >Close</button>
              </div>
            </div>

            {/* Subtopic Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDetailIndex(i)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)',
                    border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`,
                    borderRadius: '0.5rem',
                    color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: selectedDetailIndex === i ? '600' : '400',
                    transition: 'all 0.2s'
                  }}
                >
                  {detail.name}
                </button>
              ))}
            </div>

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = selectedConcept.diagram
              return (
                <div>
                  {/* Diagram */}
                  {DiagramComponent && selectedDetailIndex === 0 && (
                    <div style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      border: '1px solid #334155'
                    }}>
                      <DiagramComponent />
                    </div>
                  )}

                  {/* Detail Name */}
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                    {detail.name}
                  </h3>

                  {/* Explanation */}
                  <p style={{
                    color: '#e2e8f0',
                    lineHeight: '1.8',
                    marginBottom: '1rem',
                    background: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'left'
                  }}>
                    {detail.explanation}
                  </p>

                  {/* Code Example */}
                  {detail.codeExample && (
                    <SyntaxHighlighter
                      language="java"
                      style={vscDarkPlus}
                      customStyle={{
                        padding: '1rem',
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.8rem',
                        border: '1px solid #334155',
                        background: '#0f172a'
                      }}
                      codeTagProps={{ style: { background: 'transparent' } }}
                    >
                      {detail.codeExample}
                    </SyntaxHighlighter>
                  )}
                </div>
              )
            })()}

          </div>
        </div>
      )}
    </div>
  )
}

export default DesignProblems

import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted, getUserCode } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'

function LRUCache({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
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
      const newLanguage = e.detail
      setLanguage(newLanguage)
      if (selectedQuestion) {
        // Check if there's saved code for this language first
        const problemId = `LRUCache-${selectedQuestion.id}`
        const savedCode = getUserCode(problemId, newLanguage)
        setUserCode(savedCode || selectedQuestion.code[newLanguage].starterCode)
      }
    }
    window.addEventListener('languageChange', handleLanguageChange)
    return () => window.removeEventListener('languageChange', handleLanguageChange)
  }, [selectedQuestion])

  const questions = [
    {
      id: 1,
      title: 'Basic LRU Cache',
      difficulty: 'Medium',
      description: 'Implement a Least Recently Used (LRU) cache with get and put operations. When the cache reaches capacity, evict the least recently used item. Use a doubly linked list and hash map for O(1) operations.',
      example: `LRUCache cache = new LRUCache(2); // capacity = 2
cache.put(1, 1);
cache.put(2, 2);
cache.get(1);    // returns 1
cache.put(3, 3); // evicts key 2
cache.get(2);    // returns -1 (not found)
cache.put(4, 4); // evicts key 1
cache.get(1);    // returns -1 (not found)
cache.get(3);    // returns 3
cache.get(4);    // returns 4`,
      code: {
        java: {
          starterCode: `class LRUCache {

    public LRUCache(int capacity) {

    }

    public int get(int key) {

    }

    public void put(int key, int value) {

    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache obj = new LRUCache(capacity);
 * int param_1 = obj.get(key);
 * obj.put(key,value);
 */`,
          solution: `class LRUCache {
    private class Node {
        int key;
        int value;
        Node prev;
        Node next;

        Node(int k, int v) {
            key = k;
            value = v;
        }
    }

    private Map<Integer, Node> cache;
    private int capacity;
    private Node head; // Dummy head
    private Node tail; // Dummy tail

    public LRUCache(int capacity) {
        this.capacity = capacity;
        cache = new HashMap<>();

        // Create dummy head and tail
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        Node node = cache.get(key);
        if (node == null) {
            return -1;
        }

        // Move to head (most recently used)
        moveToHead(node);
        return node.value;
    }

    public void put(int key, int value) {
        Node node = cache.get(key);

        if (node == null) {
            // Create new node
            Node newNode = new Node(key, value);
            cache.put(key, newNode);
            addToHead(newNode);

            // Check capacity
            if (cache.size() > capacity) {
                Node removed = removeTail();
                cache.remove(removed.key);
            }
        } else {
            // Update existing node
            node.value = value;
            moveToHead(node);
        }
    }

    // Add node right after head
    private void addToHead(Node node) {
        node.prev = head;
        node.next = head.next;

        head.next.prev = node;
        head.next = node;
    }

    // Remove node from list
    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    // Move existing node to head
    private void moveToHead(Node node) {
        removeNode(node);
        addToHead(node);
    }

    // Remove least recently used node (before tail)
    private Node removeTail() {
        Node node = tail.prev;
        removeNode(node);
        return node;
    }
}

// Using LinkedHashMap (Java built-in)
class LRUCacheSimple extends LinkedHashMap<Integer, Integer> {
    private int capacity;

    public LRUCacheSimple(int capacity) {
        super(capacity, 0.75f, true); // accessOrder = true
        this.capacity = capacity;
    }

    public int get(int key) {
        return super.getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        super.put(key, value);
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }
}

// With additional size tracking
class LRUCacheWithSize {
    private class Node {
        int key;
        int value;
        int size;
        Node prev;
        Node next;

        Node(int k, int v, int s) {
            key = k;
            value = v;
            size = s;
        }
    }

    private Map<Integer, Node> cache;
    private int maxSize;
    private int currentSize;
    private Node head;
    private Node tail;

    public LRUCacheWithSize(int maxSize) {
        this.maxSize = maxSize;
        this.currentSize = 0;
        cache = new HashMap<>();

        head = new Node(0, 0, 0);
        tail = new Node(0, 0, 0);
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        Node node = cache.get(key);
        if (node == null) {
            return -1;
        }

        moveToHead(node);
        return node.value;
    }

    public void put(int key, int value, int size) {
        Node node = cache.get(key);

        if (node != null) {
            // Update existing
            currentSize -= node.size;
            node.value = value;
            node.size = size;
            currentSize += size;
            moveToHead(node);
        } else {
            // Add new
            Node newNode = new Node(key, value, size);
            cache.put(key, newNode);
            addToHead(newNode);
            currentSize += size;

            // Evict until within capacity
            while (currentSize > maxSize) {
                Node removed = removeTail();
                cache.remove(removed.key);
                currentSize -= removed.size;
            }
        }
    }

    private void addToHead(Node node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void moveToHead(Node node) {
        removeNode(node);
        addToHead(node);
    }

    private Node removeTail() {
        Node node = tail.prev;
        removeNode(node);
        return node;
    }
}`
        },
        python: {
          starterCode: `class LRUCache:
    class Node:
        def __init__(self, k, v):
            self.key = k
            self.value = v
            self.prev = None
            self.next = None

    def __init__(self, capacity: int):
        # TODO: Initialize cache and dummy nodes
        pass

    def get(self, key: int) -> int:
        # TODO: Get value and move to front
        return -1

    def put(self, key: int, value: int) -> None:
        # TODO: Add/update and evict if needed
        pass

    # Helper methods
    def _move_to_head(self, node):
        # TODO: Move node to front (most recently used)
        pass

    def _remove_node(self, node):
        # TODO: Remove node from list
        pass

    def _remove_tail(self):
        # TODO: Remove least recently used node
        return None`,
          solution: `class LRUCache:
    class Node:
        def __init__(self, k, v):
            self.key = k
            self.value = v
            self.prev = None
            self.next = None

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}

        # Create dummy head and tail
        self.head = self.Node(0, 0)
        self.tail = self.Node(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1

        node = self.cache[key]
        # Move to head (most recently used)
        self._move_to_head(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            # Update existing node
            node = self.cache[key]
            node.value = value
            self._move_to_head(node)
        else:
            # Create new node
            new_node = self.Node(key, value)
            self.cache[key] = new_node
            self._add_to_head(new_node)

            # Check capacity
            if len(self.cache) > self.capacity:
                removed = self._remove_tail()
                del self.cache[removed.key]

    # Add node right after head
    def _add_to_head(self, node):
        node.prev = self.head
        node.next = self.head.next

        self.head.next.prev = node
        self.head.next = node

    # Remove node from list
    def _remove_node(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    # Move existing node to head
    def _move_to_head(self, node):
        self._remove_node(node)
        self._add_to_head(node)

    # Remove least recently used node (before tail)
    def _remove_tail(self):
        node = self.tail.prev
        self._remove_node(node)
        return node


# Using OrderedDict (Python built-in)
from collections import OrderedDict

class LRUCacheSimple(OrderedDict):
    def __init__(self, capacity: int):
        super().__init__()
        self.capacity = capacity

    def get(self, key: int) -> int:
        if key not in self:
            return -1
        # Move to end (most recently used)
        self.move_to_end(key)
        return self[key]

    def put(self, key: int, value: int) -> None:
        if key in self:
            # Move to end
            self.move_to_end(key)
        self[key] = value
        if len(self) > self.capacity:
            # Remove oldest (first item)
            self.popitem(last=False)


# With additional size tracking
class LRUCacheWithSize:
    class Node:
        def __init__(self, k, v, s):
            self.key = k
            self.value = v
            self.size = s
            self.prev = None
            self.next = None

    def __init__(self, max_size: int):
        self.max_size = max_size
        self.current_size = 0
        self.cache = {}

        self.head = self.Node(0, 0, 0)
        self.tail = self.Node(0, 0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1

        node = self.cache[key]
        self._move_to_head(node)
        return node.value

    def put(self, key: int, value: int, size: int) -> None:
        if key in self.cache:
            # Update existing
            node = self.cache[key]
            self.current_size -= node.size
            node.value = value
            node.size = size
            self.current_size += size
            self._move_to_head(node)
        else:
            # Add new
            new_node = self.Node(key, value, size)
            self.cache[key] = new_node
            self._add_to_head(new_node)
            self.current_size += size

            # Evict until within capacity
            while self.current_size > self.max_size:
                removed = self._remove_tail()
                del self.cache[removed.key]
                self.current_size -= removed.size

    def _add_to_head(self, node):
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _move_to_head(self, node):
        self._remove_node(node)
        self._add_to_head(node)

    def _remove_tail(self):
        node = self.tail.prev
        self._remove_node(node)
        return node`
        }
      },
      testCases: [
        { input: 'capacity=2, put(1,1), put(2,2), get(1), put(3,3), get(2)', output: 'get(1): 1, get(2): -1' },
        { input: 'capacity=1, put(2,1), get(2), put(3,2), get(2), get(3)', output: 'get(2): 1 then -1, get(3): 2' },
        { input: 'capacity=2, put(2,1), put(2,2), get(2), put(1,1), put(4,1), get(2)', output: 'get(2): 2 then -1' }
      ],
      explanation: `**Problem:** Implement LRU (Least Recently Used) cache with O(1) get and put operations.

**Key Insight: Doubly Linked List + Hash Map**
Hash Map: O(1) lookup by key
Doubly Linked List: O(1) reordering (move to front, remove from back)

**Data Structure:**
┌─────────────────────────────────────────────┐
│  HashMap: key → Node                        │
│  {1: Node1, 2: Node2, 3: Node3}             │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Doubly Linked List (MRU → LRU):            │
│  head ⇄ Node3 ⇄ Node1 ⇄ Node2 ⇄ tail       │
│  (dummy) ← most recent    least → (dummy)  │
└─────────────────────────────────────────────┘

**Why Doubly Linked List?**
- Move node to head: O(1) with prev/next pointers
- Remove node: O(1) with direct access
- Remove tail: O(1) to evict LRU

**Operations:**

1. **get(key):**
   - Lookup in HashMap → O(1)
   - If found: move node to head (mark as recently used)
   - Return value

2. **put(key, value):**
   - If key exists: update value, move to head
   - If new: create node, add to head
   - If capacity exceeded: remove tail node (LRU)

**Example Trace:**
Capacity = 2

put(1, 1):
  cache: {1: Node1}
  list: head ⇄ [1:1] ⇄ tail

put(2, 2):
  cache: {1: Node1, 2: Node2}
  list: head ⇄ [2:2] ⇄ [1:1] ⇄ tail

get(1):
  Move [1:1] to head
  list: head ⇄ [1:1] ⇄ [2:2] ⇄ tail
  return 1

put(3, 3):
  Capacity full! Remove LRU ([2:2])
  cache: {1: Node1, 3: Node3}
  list: head ⇄ [3:3] ⇄ [1:1] ⇄ tail

get(2):
  Not found → return -1

**Why Dummy Head/Tail?**
Simplifies edge cases:
- No null checks for prev/next
- Always valid head.next and tail.prev
- Consistent insertion/removal logic

**Advantages:**
✓ O(1) get and put operations
✓ Simple eviction policy
✓ Predictable memory usage

**Disadvantages:**
✗ Extra space for doubly linked list pointers
✗ Cache pollution (one-time access = long retention)
✗ No consideration for access frequency

**Real-World Use Cases:**
- Browser cache (recently viewed pages)
- Database query cache
- CDN edge caching
- Operating system page replacement

**Complexity:**
- get(): O(1) time, O(1) space
- put(): O(1) time, O(1) space
- Space: O(capacity) for cache + linked list`,
      pseudocode: `LRU Cache Algorithm:
-------------------
// Node structure
class Node:
    int key
    int value
    Node prev
    Node next

// Initialization
LRUCache(capacity):
    this.capacity = capacity
    this.cache = HashMap<Integer, Node>()

    // Dummy head and tail
    this.head = new Node(0, 0)
    this.tail = new Node(0, 0)
    head.next = tail
    tail.prev = head

// Get value
get(key):
    if key not in cache:
        return -1

    node = cache[key]
    moveToHead(node)  // Mark as recently used
    return node.value

// Put key-value
put(key, value):
    if key in cache:
        // Update existing
        node = cache[key]
        node.value = value
        moveToHead(node)
    else:
        // Add new node
        newNode = new Node(key, value)
        cache[key] = newNode
        addToHead(newNode)

        // Check capacity
        if cache.size() > capacity:
            // Evict LRU (tail.prev)
            removed = removeTail()
            cache.remove(removed.key)

// Add node right after head (most recent)
addToHead(node):
    node.prev = head
    node.next = head.next

    head.next.prev = node
    head.next = node

// Remove node from list
removeNode(node):
    node.prev.next = node.next
    node.next.prev = node.prev

// Move node to head (mark as recently used)
moveToHead(node):
    removeNode(node)
    addToHead(node)

// Remove least recently used (tail.prev)
removeTail():
    node = tail.prev
    removeNode(node)
    return node

Example Trace:
--------------
LRUCache(capacity=2)
  head ⇄ tail
  cache: {}

put(1, 1):
  addToHead(Node1)
  head ⇄ [1:1] ⇄ tail
  cache: {1: Node1}

put(2, 2):
  addToHead(Node2)
  head ⇄ [2:2] ⇄ [1:1] ⇄ tail
  cache: {1: Node1, 2: Node2}

get(1):
  node = cache[1]
  moveToHead(node):
    removeNode([1:1]) → head ⇄ [2:2] ⇄ tail
    addToHead([1:1]) → head ⇄ [1:1] ⇄ [2:2] ⇄ tail
  return 1

put(3, 3):
  cache.size() = 2 >= capacity
  removed = removeTail():
    node = tail.prev = [2:2]
    removeNode([2:2])
    head ⇄ [1:1] ⇄ tail
    return [2:2]
  cache.remove(2) → cache: {1: Node1}

  addToHead(Node3)
  head ⇄ [3:3] ⇄ [1:1] ⇄ tail
  cache: {1: Node1, 3: Node3}

get(2):
  2 not in cache → return -1

Simplified with LinkedHashMap (Java):
-------------------------------------
class LRUCacheSimple extends LinkedHashMap<Integer, Integer>:
    int capacity

    LRUCacheSimple(capacity):
        super(capacity, 0.75f, true)  // accessOrder = true
        this.capacity = capacity

    get(key):
        return super.getOrDefault(key, -1)

    put(key, value):
        super.put(key, value)

    removeEldestEntry(eldest):
        return size() > capacity  // Auto-evict when over capacity`
    },
    {
      id: 2,
      title: 'LRU Cache with Expiry',
      difficulty: 'Medium',
      description: 'Extend LRU cache to support time-based expiration. Items expire after a specified TTL (time to live) in addition to LRU eviction. Both get and put should check for expired entries.',
      example: `LRUCacheWithExpiry cache = new LRUCacheWithExpiry(2, 5); // capacity=2, ttl=5s
cache.put(1, 1, timestamp=1);
cache.put(2, 2, timestamp=2);
cache.get(1, timestamp=3);  // returns 1 (not expired)
cache.get(1, timestamp=7);  // returns -1 (expired after 5s)
cache.put(3, 3, timestamp=8);
cache.get(2, timestamp=9);  // returns -1 (expired)`,
      code: {
        java: {
          starterCode: `class LRUCacheWithExpiry {
    private class Node {
        int key;
        int value;
        long timestamp;
        Node prev;
        Node next;

        Node(int k, int v, long t) {
            key = k;
            value = v;
            timestamp = t;
        }
    }

    private Map<Integer, Node> cache;
    private int capacity;
    private long ttl;
    private Node head;
    private Node tail;

    public LRUCacheWithExpiry(int capacity, long ttl) {
        // TODO: Initialize with TTL support

    }

    public int get(int key, long timestamp) {
        // TODO: Get value and check expiry

        return -1;
    }

    public void put(int key, int value, long timestamp) {
        // TODO: Add/update with timestamp

    }

    private boolean isExpired(Node node, long currentTime) {
        // TODO: Check if node is expired

        return false;
    }
}`,
          solution: `class LRUCacheWithExpiry {
    private class Node {
        int key;
        int value;
        long timestamp;
        Node prev;
        Node next;

        Node(int k, int v, long t) {
            key = k;
            value = v;
            timestamp = t;
        }
    }

    private Map<Integer, Node> cache;
    private int capacity;
    private long ttl; // Time to live in seconds
    private Node head;
    private Node tail;

    public LRUCacheWithExpiry(int capacity, long ttl) {
        this.capacity = capacity;
        this.ttl = ttl;
        cache = new HashMap<>();

        head = new Node(0, 0, 0);
        tail = new Node(0, 0, 0);
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key, long timestamp) {
        Node node = cache.get(key);

        if (node == null) {
            return -1;
        }

        // Check if expired
        if (isExpired(node, timestamp)) {
            removeNode(node);
            cache.remove(key);
            return -1;
        }

        // Move to head (most recently used)
        moveToHead(node);
        return node.value;
    }

    public void put(int key, int value, long timestamp) {
        // Clean expired entries
        cleanExpired(timestamp);

        Node node = cache.get(key);

        if (node == null) {
            // Create new node
            Node newNode = new Node(key, value, timestamp);
            cache.put(key, newNode);
            addToHead(newNode);

            // Check capacity
            if (cache.size() > capacity) {
                Node removed = removeTail();
                cache.remove(removed.key);
            }
        } else {
            // Update existing node
            node.value = value;
            node.timestamp = timestamp;
            moveToHead(node);
        }
    }

    private boolean isExpired(Node node, long currentTime) {
        return (currentTime - node.timestamp) > ttl;
    }

    private void cleanExpired(long currentTime) {
        // Remove expired entries from tail (oldest)
        while (tail.prev != head && isExpired(tail.prev, currentTime)) {
            Node expired = removeTail();
            cache.remove(expired.key);
        }
    }

    private void addToHead(Node node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void moveToHead(Node node) {
        removeNode(node);
        addToHead(node);
    }

    private Node removeTail() {
        Node node = tail.prev;
        removeNode(node);
        return node;
    }
}

// With scheduled cleanup
class LRUCacheWithExpiryScheduled {
    private class Node {
        int key;
        int value;
        long expiryTime;
        Node prev;
        Node next;

        Node(int k, int v, long exp) {
            key = k;
            value = v;
            expiryTime = exp;
        }
    }

    private Map<Integer, Node> cache;
    private PriorityQueue<Node> expiryQueue; // Min heap by expiry time
    private int capacity;
    private long ttl;
    private Node head;
    private Node tail;

    public LRUCacheWithExpiryScheduled(int capacity, long ttl) {
        this.capacity = capacity;
        this.ttl = ttl;
        cache = new HashMap<>();
        expiryQueue = new PriorityQueue<>((a, b) ->
            Long.compare(a.expiryTime, b.expiryTime)
        );

        head = new Node(0, 0, 0);
        tail = new Node(0, 0, 0);
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key, long timestamp) {
        cleanExpired(timestamp);

        Node node = cache.get(key);
        if (node == null || node.expiryTime <= timestamp) {
            return -1;
        }

        moveToHead(node);
        return node.value;
    }

    public void put(int key, int value, long timestamp) {
        cleanExpired(timestamp);

        Node node = cache.get(key);
        long expiryTime = timestamp + ttl;

        if (node == null) {
            Node newNode = new Node(key, value, expiryTime);
            cache.put(key, newNode);
            addToHead(newNode);
            expiryQueue.offer(newNode);

            if (cache.size() > capacity) {
                Node removed = removeTail();
                cache.remove(removed.key);
            }
        } else {
            node.value = value;
            node.expiryTime = expiryTime;
            moveToHead(node);
        }
    }

    private void cleanExpired(long currentTime) {
        while (!expiryQueue.isEmpty() &&
               expiryQueue.peek().expiryTime <= currentTime) {
            Node expired = expiryQueue.poll();
            if (cache.containsKey(expired.key)) {
                removeNode(expired);
                cache.remove(expired.key);
            }
        }
    }

    private void addToHead(Node node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void moveToHead(Node node) {
        removeNode(node);
        addToHead(node);
    }

    private Node removeTail() {
        Node node = tail.prev;
        removeNode(node);
        return node;
    }
}

// With scheduled cleanup
class LRUCacheWithExpiryScheduled {
    private class Node {
        int key;
        int value;
        long expiryTime;
        Node prev;
        Node next;

        Node(int k, int v, long exp) {
            key = k;
            value = v;
            expiryTime = exp;
        }
    }

    private Map<Integer, Node> cache;
    private PriorityQueue<Node> expiryQueue; // Min heap by expiry time
    private int capacity;
    private long ttl;
    private Node head;
    private Node tail;

    public LRUCacheWithExpiryScheduled(int capacity, long ttl) {
        this.capacity = capacity;
        this.ttl = ttl;
        cache = new HashMap<>();
        expiryQueue = new PriorityQueue<>((a, b) ->
            Long.compare(a.expiryTime, b.expiryTime)
        );

        head = new Node(0, 0, 0);
        tail = new Node(0, 0, 0);
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key, long timestamp) {
        cleanExpired(timestamp);

        Node node = cache.get(key);
        if (node == null || node.expiryTime <= timestamp) {
            return -1;
        }

        moveToHead(node);
        return node.value;
    }

    public void put(int key, int value, long timestamp) {
        cleanExpired(timestamp);

        Node node = cache.get(key);
        long expiryTime = timestamp + ttl;

        if (node == null) {
            Node newNode = new Node(key, value, expiryTime);
            cache.put(key, newNode);
            addToHead(newNode);
            expiryQueue.offer(newNode);

            if (cache.size() > capacity) {
                Node removed = removeTail();
                cache.remove(removed.key);
            }
        } else {
            node.value = value;
            node.expiryTime = expiryTime;
            moveToHead(node);
        }
    }

    private void cleanExpired(long currentTime) {
        while (!expiryQueue.isEmpty() &&
               expiryQueue.peek().expiryTime <= currentTime) {
            Node expired = expiryQueue.poll();
            if (cache.containsKey(expired.key)) {
                removeNode(expired);
                cache.remove(expired.key);
            }
        }
    }

    private void addToHead(Node node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void moveToHead(Node node) {
        removeNode(node);
        addToHead(node);
    }

    private Node removeTail() {
        Node node = tail.prev;
        removeNode(node);
        return node;
    }
}`
        },
        python: {
          starterCode: `class LRUCacheWithExpiry:
    class Node:
        def __init__(self, k, v, t):
            self.key = k
            self.value = v
            self.timestamp = t
            self.prev = None
            self.next = None

    def __init__(self, capacity: int, ttl: int):
        # TODO: Initialize with TTL support
        pass

    def get(self, key: int, timestamp: int) -> int:
        # TODO: Get value and check expiry
        return -1

    def put(self, key: int, value: int, timestamp: int) -> None:
        # TODO: Add/update with timestamp
        pass

    def _is_expired(self, node, current_time: int) -> bool:
        # TODO: Check if node is expired
        return False`,
          solution: `class LRUCacheWithExpiry:
    class Node:
        def __init__(self, k, v, t):
            self.key = k
            self.value = v
            self.timestamp = t
            self.prev = None
            self.next = None

    def __init__(self, capacity: int, ttl: int):
        self.capacity = capacity
        self.ttl = ttl  # Time to live in seconds
        self.cache = {}

        self.head = self.Node(0, 0, 0)
        self.tail = self.Node(0, 0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int, timestamp: int) -> int:
        if key not in self.cache:
            return -1

        node = self.cache[key]

        # Check if expired
        if self._is_expired(node, timestamp):
            self._remove_node(node)
            del self.cache[key]
            return -1

        # Move to head (most recently used)
        self._move_to_head(node)
        return node.value

    def put(self, key: int, value: int, timestamp: int) -> None:
        # Clean expired entries
        self._clean_expired(timestamp)

        if key in self.cache:
            # Update existing node
            node = self.cache[key]
            node.value = value
            node.timestamp = timestamp
            self._move_to_head(node)
        else:
            # Create new node
            new_node = self.Node(key, value, timestamp)
            self.cache[key] = new_node
            self._add_to_head(new_node)

            # Check capacity
            if len(self.cache) > self.capacity:
                removed = self._remove_tail()
                del self.cache[removed.key]

    def _is_expired(self, node, current_time: int) -> bool:
        return (current_time - node.timestamp) > self.ttl

    def _clean_expired(self, current_time: int):
        # Remove expired entries from tail (oldest)
        while self.tail.prev != self.head and self._is_expired(self.tail.prev, current_time):
            expired = self._remove_tail()
            del self.cache[expired.key]

    def _add_to_head(self, node):
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _move_to_head(self, node):
        self._remove_node(node)
        self._add_to_head(node)

    def _remove_tail(self):
        node = self.tail.prev
        self._remove_node(node)
        return node


# With scheduled cleanup using heap
import heapq

class LRUCacheWithExpiryScheduled:
    class Node:
        def __init__(self, k, v, exp):
            self.key = k
            self.value = v
            self.expiry_time = exp
            self.prev = None
            self.next = None

    def __init__(self, capacity: int, ttl: int):
        self.capacity = capacity
        self.ttl = ttl
        self.cache = {}
        self.expiry_queue = []  # Min heap by expiry time

        self.head = self.Node(0, 0, 0)
        self.tail = self.Node(0, 0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int, timestamp: int) -> int:
        self._clean_expired(timestamp)

        if key not in self.cache:
            return -1

        node = self.cache[key]
        if node.expiry_time <= timestamp:
            return -1

        self._move_to_head(node)
        return node.value

    def put(self, key: int, value: int, timestamp: int) -> None:
        self._clean_expired(timestamp)

        expiry_time = timestamp + self.ttl

        if key in self.cache:
            node = self.cache[key]
            node.value = value
            node.expiry_time = expiry_time
            self._move_to_head(node)
        else:
            new_node = self.Node(key, value, expiry_time)
            self.cache[key] = new_node
            self._add_to_head(new_node)
            heapq.heappush(self.expiry_queue, (expiry_time, key))

            if len(self.cache) > self.capacity:
                removed = self._remove_tail()
                del self.cache[removed.key]

    def _clean_expired(self, current_time: int):
        while self.expiry_queue and self.expiry_queue[0][0] <= current_time:
            _, key = heapq.heappop(self.expiry_queue)
            if key in self.cache:
                node = self.cache[key]
                self._remove_node(node)
                del self.cache[key]

    def _add_to_head(self, node):
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _move_to_head(self, node):
        self._remove_node(node)
        self._add_to_head(node)

    def _remove_tail(self):
        node = self.tail.prev
        self._remove_node(node)
        return node`
        }
      },
      testCases: [
        { input: 'capacity=2, ttl=5, put(1,1,t=0), get(1,t=4), get(1,t=6)', output: 'get(1,t=4): 1, get(1,t=6): -1' },
        { input: 'capacity=2, ttl=3, put(1,1,t=1), put(2,2,t=2), get(1,t=5)', output: 'get(1,t=5): -1' },
        { input: 'capacity=1, ttl=10, put(1,1,t=0), get(1,t=5)', output: 'get(1,t=5): 1' }
      ],
      explanation: `**Problem:** LRU cache with time-based expiration (TTL = Time To Live).

**Key Insight: Dual Eviction Policy**
Items evicted by BOTH:
1. LRU policy (capacity limit)
2. TTL expiry (time-based)

**Data Structure Enhancement:**
Each node stores:
- key, value
- timestamp (creation/last update time)
- prev, next pointers

**Two Eviction Triggers:**

1. **Capacity Eviction (LRU):**
   Same as basic LRU - remove tail when full

2. **TTL Expiry:**
   currentTime - node.timestamp > TTL → expired

**Expiry Check Strategies:**

**Strategy 1: Lazy Expiry (on access)**
Check expiry only during get/put:
- get(key): if expired, remove and return -1
- put(key): clean expired entries first

**Strategy 2: Active Expiry (priority queue)**
Use min-heap sorted by expiry time:
- Periodically clean expired entries
- O(log N) to find next expired item

**Example Timeline:**
Capacity=2, TTL=5 seconds

t=0: put(1, 1, t=0)
  cache: {1: Node(val=1, ts=0)}
  list: head ⇄ [1:1,t=0] ⇄ tail

t=2: put(2, 2, t=2)
  cache: {1: Node1, 2: Node2}
  list: head ⇄ [2:2,t=2] ⇄ [1:1,t=0] ⇄ tail

t=4: get(1, t=4)
  Check expiry: 4 - 0 = 4 < 5 ✓ (not expired)
  Move to head
  list: head ⇄ [1:1,t=0] ⇄ [2:2,t=2] ⇄ tail
  return 1

t=6: get(1, t=6)
  Check expiry: 6 - 0 = 6 > 5 ✗ (EXPIRED!)
  Remove from cache
  cache: {2: Node2}
  return -1

t=8: get(2, t=8)
  Check expiry: 8 - 2 = 6 > 5 ✗ (EXPIRED!)
  return -1

**Cleanup Strategies:**

**Lazy Cleanup (Simple):**
pros: Simple, no background work
cons: Expired entries occupy memory until accessed

**Tail Cleanup (Optimized):**
Clean from tail (oldest) during put:
- Expired entries likely at tail
- O(K) where K = expired entries

**Priority Queue (Scheduled):**
Heap ordered by expiry time:
- O(log N) to find next expiry
- Good for active cleanup

**Advantages:**
✓ Prevents stale data access
✓ Automatic memory cleanup
✓ Flexible expiry policies

**Disadvantages:**
✗ Additional timestamp storage
✗ Cleanup overhead
✗ Complex eviction logic

**Use Cases:**
- Session storage (expire after inactivity)
- API response cache (TTL from headers)
- DNS cache
- OAuth token cache

**Complexity:**
- get(): O(1) + O(K) cleanup (K = expired entries)
- put(): O(1) + O(K) cleanup
- Space: O(capacity) + timestamps`,
      pseudocode: `LRU Cache with Expiry:
-----------------------
// Node with timestamp
class Node:
    int key
    int value
    long timestamp  // Creation time
    Node prev
    Node next

// Initialization
LRUCacheWithExpiry(capacity, ttl):
    this.capacity = capacity
    this.ttl = ttl  // Time to live in seconds
    this.cache = HashMap<Integer, Node>()
    this.head = new Node(0, 0, 0)
    this.tail = new Node(0, 0, 0)
    head.next = tail
    tail.prev = head

// Get with expiry check
get(key, currentTime):
    if key not in cache:
        return -1

    node = cache[key]

    // Check if expired
    if isExpired(node, currentTime):
        removeNode(node)
        cache.remove(key)
        return -1

    // Not expired - move to head
    moveToHead(node)
    return node.value

// Put with cleanup
put(key, value, currentTime):
    // Clean expired entries from tail (oldest)
    cleanExpired(currentTime)

    if key in cache:
        // Update existing
        node = cache[key]
        node.value = value
        node.timestamp = currentTime  // Refresh timestamp
        moveToHead(node)
    else:
        // Add new node
        newNode = new Node(key, value, currentTime)
        cache[key] = newNode
        addToHead(newNode)

        // Check capacity
        if cache.size() > capacity:
            removed = removeTail()
            cache.remove(removed.key)

// Check if entry expired
isExpired(node, currentTime):
    return (currentTime - node.timestamp) > ttl

// Clean expired from tail (oldest first)
cleanExpired(currentTime):
    while tail.prev != head AND isExpired(tail.prev, currentTime):
        expired = removeTail()
        cache.remove(expired.key)

Example Trace:
--------------
Capacity=2, TTL=5s

t=0: put(1, 1, t=0)
  head ⇄ [1:1,ts=0] ⇄ tail

t=2: put(2, 2, t=2)
  head ⇄ [2:2,ts=2] ⇄ [1:1,ts=0] ⇄ tail

t=4: get(1, t=4)
  isExpired([1:1,ts=0], t=4):
    4 - 0 = 4 ≤ 5 → false (not expired)
  moveToHead([1:1])
  head ⇄ [1:1,ts=0] ⇄ [2:2,ts=2] ⇄ tail
  return 1

t=6: get(1, t=6)
  isExpired([1:1,ts=0], t=6):
    6 - 0 = 6 > 5 → true (EXPIRED!)
  removeNode([1:1])
  cache.remove(1)
  head ⇄ [2:2,ts=2] ⇄ tail
  return -1

t=7: put(3, 3, t=7)
  cleanExpired(t=7):
    isExpired([2:2,ts=2], t=7):
      7 - 2 = 5 ≤ 5 → false (not expired yet)
  addToHead([3:3,ts=7])
  head ⇄ [3:3,ts=7] ⇄ [2:2,ts=2] ⇄ tail

t=8: put(4, 4, t=8)
  cleanExpired(t=8):
    isExpired([2:2,ts=2], t=8):
      8 - 2 = 6 > 5 → true (expired!)
    removeTail() → remove [2:2]
  head ⇄ [3:3,ts=7] ⇄ tail

  addToHead([4:4,ts=8])
  head ⇄ [4:4,ts=8] ⇄ [3:3,ts=7] ⇄ tail

With Priority Queue (Active Expiry):
------------------------------------
LRUCacheWithExpiryScheduled(capacity, ttl):
    this.expiryQueue = PriorityQueue<Node>()  // Min heap by expiry time
    // ... rest same as above

put(key, value, timestamp):
    cleanExpired(timestamp)

    if key not in cache:
        expiryTime = timestamp + ttl
        newNode = new Node(key, value, expiryTime)
        cache[key] = newNode
        addToHead(newNode)
        expiryQueue.offer(newNode)  // Add to heap
    // ... handle capacity

cleanExpired(currentTime):
    while expiryQueue is not empty AND expiryQueue.peek().expiryTime <= currentTime:
        expired = expiryQueue.poll()
        if expired.key in cache:  // May be already removed
            removeNode(expired)
            cache.remove(expired.key)

Comparison:
-----------
Lazy Cleanup:
  - Simple
  - Expired entries stay until accessed
  - O(1) get/put (no cleanup)

Tail Cleanup:
  - Moderate complexity
  - Clean oldest entries on put
  - O(K) cleanup where K = expired entries

Priority Queue:
  - Complex
  - Active cleanup by expiry time
  - O(log N) heap operations`
    },
    {
      id: 3,
      title: 'LFU Cache',
      difficulty: 'Medium',
      description: 'Implement a Least Frequently Used (LFU) cache. When capacity is reached, evict the least frequently used item. If there\'s a tie, evict the least recently used among them. Track both frequency and recency.',
      example: `LFUCache cache = new LFUCache(2);
cache.put(1, 1);   // freq: {1: [1]}
cache.put(2, 2);   // freq: {1: [1,2]}
cache.get(1);      // returns 1, freq: {1: [2], 2: [1]}
cache.put(3, 3);   // evicts key 2, freq: {1: [3], 2: [1]}
cache.get(2);      // returns -1 (not found)
cache.get(3);      // returns 3, freq: {1: [], 2: [1,3]}
cache.put(4, 4);   // evicts key 1, freq: {1: [4], 2: [3]}`,
      code: {
        java: {
          starterCode: `class LFUCache {
    private class Node {
        int key;
        int value;
        int freq;
        Node prev;
        Node next;

        Node(int k, int v) {
            key = k;
            value = v;
            freq = 1;
        }
    }

    private Map<Integer, Node> cache;
    private Map<Integer, Node> freqMap; // freq -> dummy head
    private int capacity;
    private int minFreq;

    public LFUCache(int capacity) {
        // TODO: Initialize LFU cache

    }

    public int get(int key) {
        // TODO: Get value and update frequency

        return -1;
    }

    public void put(int key, int value) {
        // TODO: Add/update and evict LFU if needed

    }

    private void updateFreq(Node node) {
        // TODO: Move node to higher frequency list

    }
}`,
          solution: `class LFUCache {
    private class Node {
        int key;
        int value;
        int freq;
        Node prev;
        Node next;

        Node(int k, int v) {
            key = k;
            value = v;
            freq = 1;
        }
    }

    private class DLList {
        Node head;
        Node tail;
        int size;

        DLList() {
            head = new Node(0, 0);
            tail = new Node(0, 0);
            head.next = tail;
            tail.prev = head;
            size = 0;
        }

        void add(Node node) {
            node.next = head.next;
            node.prev = head;
            head.next.prev = node;
            head.next = node;
            size++;
        }

        void remove(Node node) {
            node.prev.next = node.next;
            node.next.prev = node.prev;
            size--;
        }

        Node removeLast() {
            if (size > 0) {
                Node last = tail.prev;
                remove(last);
                return last;
            }
            return null;
        }
    }

    private Map<Integer, Node> cache;
    private Map<Integer, DLList> freqMap;
    private int capacity;
    private int minFreq;

    public LFUCache(int capacity) {
        this.capacity = capacity;
        this.minFreq = 0;
        cache = new HashMap<>();
        freqMap = new HashMap<>();
    }

    public int get(int key) {
        Node node = cache.get(key);
        if (node == null) {
            return -1;
        }

        updateFreq(node);
        return node.value;
    }

    public void put(int key, int value) {
        if (capacity == 0) return;

        Node node = cache.get(key);

        if (node != null) {
            // Update existing node
            node.value = value;
            updateFreq(node);
        } else {
            // Add new node
            if (cache.size() >= capacity) {
                // Evict LFU (and LRU if tie)
                DLList minFreqList = freqMap.get(minFreq);
                Node removed = minFreqList.removeLast();
                cache.remove(removed.key);
            }

            // Add new node with frequency 1
            Node newNode = new Node(key, value);
            cache.put(key, newNode);
            freqMap.putIfAbsent(1, new DLList());
            freqMap.get(1).add(newNode);
            minFreq = 1;
        }
    }

    private void updateFreq(Node node) {
        int freq = node.freq;
        DLList list = freqMap.get(freq);
        list.remove(node);

        // Update minFreq if needed
        if (freq == minFreq && list.size == 0) {
            minFreq++;
        }

        // Add to next frequency list
        node.freq++;
        freqMap.putIfAbsent(node.freq, new DLList());
        freqMap.get(node.freq).add(node);
    }
}

// Simplified version using LinkedHashSet
class LFUCacheSimple {
    private class Node {
        int key;
        int value;
        int freq;

        Node(int k, int v) {
            key = k;
            value = v;
            freq = 1;
        }
    }

    private Map<Integer, Node> cache;
    private Map<Integer, LinkedHashSet<Integer>> freqMap;
    private int capacity;
    private int minFreq;

    public LFUCacheSimple(int capacity) {
        this.capacity = capacity;
        this.minFreq = 0;
        cache = new HashMap<>();
        freqMap = new HashMap<>();
    }

    public int get(int key) {
        if (!cache.containsKey(key)) {
            return -1;
        }

        Node node = cache.get(key);
        updateFreq(node);
        return node.value;
    }

    public void put(int key, int value) {
        if (capacity == 0) return;

        if (cache.containsKey(key)) {
            Node node = cache.get(key);
            node.value = value;
            updateFreq(node);
        } else {
            if (cache.size() >= capacity) {
                // Evict LFU item
                LinkedHashSet<Integer> minSet = freqMap.get(minFreq);
                int keyToRemove = minSet.iterator().next();
                minSet.remove(keyToRemove);
                cache.remove(keyToRemove);
            }

            Node newNode = new Node(key, value);
            cache.put(key, newNode);
            freqMap.putIfAbsent(1, new LinkedHashSet<>());
            freqMap.get(1).add(key);
            minFreq = 1;
        }
    }

    private void updateFreq(Node node) {
        int freq = node.freq;
        freqMap.get(freq).remove(node.key);

        if (freq == minFreq && freqMap.get(freq).isEmpty()) {
            minFreq++;
        }

        node.freq++;
        freqMap.putIfAbsent(node.freq, new LinkedHashSet<>());
        freqMap.get(node.freq).add(node.key);
    }
}`
        },
        python: {
          starterCode: `class LFUCache:
    class Node:
        def __init__(self, k, v):
            self.key = k
            self.value = v
            self.freq = 1
            self.prev = None
            self.next = None

    def __init__(self, capacity: int):
        # TODO: Initialize LFU cache
        pass

    def get(self, key: int) -> int:
        # TODO: Get value and update frequency
        return -1

    def put(self, key: int, value: int) -> None:
        # TODO: Add/update and evict LFU if needed
        pass

    def _update_freq(self, node):
        # TODO: Move node to higher frequency list
        pass`,
          solution: `class LFUCache:
    class Node:
        def __init__(self, k, v):
            self.key = k
            self.value = v
            self.freq = 1
            self.prev = None
            self.next = None

    class DLList:
        class Node:
            def __init__(self, k, v):
                self.key = k
                self.value = v
                self.prev = None
                self.next = None

        def __init__(self):
            self.head = LFUCache.Node(0, 0)
            self.tail = LFUCache.Node(0, 0)
            self.head.next = self.tail
            self.tail.prev = self.head
            self.size = 0

        def add(self, node):
            node.next = self.head.next
            node.prev = self.head
            self.head.next.prev = node
            self.head.next = node
            self.size += 1

        def remove(self, node):
            node.prev.next = node.next
            node.next.prev = node.prev
            self.size -= 1

        def remove_last(self):
            if self.size > 0:
                last = self.tail.prev
                self.remove(last)
                return last
            return None

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.min_freq = 0
        self.cache = {}
        self.freq_map = {}

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1

        node = self.cache[key]
        self._update_freq(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        if self.capacity == 0:
            return

        if key in self.cache:
            # Update existing node
            node = self.cache[key]
            node.value = value
            self._update_freq(node)
        else:
            # Add new node
            if len(self.cache) >= self.capacity:
                # Evict LFU (and LRU if tie)
                min_freq_list = self.freq_map[self.min_freq]
                removed = min_freq_list.remove_last()
                del self.cache[removed.key]

            # Add new node with frequency 1
            new_node = self.Node(key, value)
            self.cache[key] = new_node
            if 1 not in self.freq_map:
                self.freq_map[1] = self.DLList()
            self.freq_map[1].add(new_node)
            self.min_freq = 1

    def _update_freq(self, node):
        freq = node.freq
        freq_list = self.freq_map[freq]
        freq_list.remove(node)

        # Update min_freq if needed
        if freq == self.min_freq and freq_list.size == 0:
            self.min_freq += 1

        # Add to next frequency list
        node.freq += 1
        if node.freq not in self.freq_map:
            self.freq_map[node.freq] = self.DLList()
        self.freq_map[node.freq].add(node)


# Simplified version using OrderedDict
from collections import OrderedDict, defaultdict

class LFUCacheSimple:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.min_freq = 0
        self.cache = {}  # key -> (value, freq)
        self.freq_map = defaultdict(OrderedDict)  # freq -> OrderedDict of keys

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1

        value, freq = self.cache[key]
        self._update_freq(key, value, freq)
        return value

    def put(self, key: int, value: int) -> None:
        if self.capacity == 0:
            return

        if key in self.cache:
            _, freq = self.cache[key]
            self._update_freq(key, value, freq)
        else:
            if len(self.cache) >= self.capacity:
                # Evict LFU item
                evict_key, _ = self.freq_map[self.min_freq].popitem(last=False)
                del self.cache[evict_key]

            self.cache[key] = (value, 1)
            self.freq_map[1][key] = None
            self.min_freq = 1

    def _update_freq(self, key: int, value: int, freq: int):
        del self.freq_map[freq][key]

        if freq == self.min_freq and not self.freq_map[freq]:
            self.min_freq += 1

        new_freq = freq + 1
        self.cache[key] = (value, new_freq)
        self.freq_map[new_freq][key] = None`
        }
      },
      testCases: [
        { input: 'capacity=2, put(1,1), put(2,2), get(1), put(3,3), get(2)', output: 'get(1): 1, get(2): -1' },
        { input: 'capacity=2, put(2,1), put(3,2), get(2), get(3), put(4,4), get(2)', output: 'get(2): 1 then 1' },
        { input: 'capacity=1, put(2,1), get(2)', output: 'get(2): 1' }
      ],
      explanation: `**Problem:** Implement LFU (Least Frequently Used) cache - evict item with lowest access frequency.

**Key Insight: Track Both Frequency AND Recency**
When tie in frequency → evict LRU (least recently used among them)

**Data Structures:**
1. **cache:** HashMap<key, Node> → O(1) lookup
2. **freqMap:** HashMap<freq, DoublyLinkedList> → O(1) get list by frequency
3. **minFreq:** Track minimum frequency for eviction

**Node Structure:**
- key, value
- freq (access count)
- prev, next (for doubly linked list within frequency)

**Frequency Lists:**
┌─────────────────────────────────────────┐
│  freqMap:                                │
│  1 → [Node3 ⇄ Node1]  (freq=1)          │
│  2 → [Node2]          (freq=2)          │
│  3 → [Node4 ⇄ Node5]  (freq=3)          │
└─────────────────────────────────────────┘
         ↑
       minFreq = 1 (evict from this list)

**Operations:**

**get(key):**
1. If not found → return -1
2. If found → increment frequency:
   - Remove from current freq list
   - Add to (freq+1) list
   - Update minFreq if needed
3. Return value

**put(key, value):**
1. If key exists → update value, increment freq
2. If new key:
   - If at capacity → evict LFU item:
     * Remove last node from minFreq list
     * If tie in freq → LRU within that freq
   - Add new node with freq=1
   - Set minFreq = 1

**Example Trace:**
Capacity = 2

put(1, 1):
  freq=1
  freqMap: {1: [Node1]}
  minFreq = 1

put(2, 2):
  freq=1
  freqMap: {1: [Node2, Node1]}  // Node2 at head (MRU)
  minFreq = 1

get(1):
  Found Node1 (freq=1)
  Update freq: 1 → 2
  freqMap: {1: [Node2], 2: [Node1]}
  minFreq = 1 (freq 1 still has Node2)
  return 1

put(3, 3):
  Capacity full! Evict LFU:
    minFreq = 1 → evict from freq 1 list
    Remove Node2 (LRU in freq 1)
  Add Node3 (freq=1)
  freqMap: {1: [Node3], 2: [Node1]}
  minFreq = 1

get(2):
  Not found → return -1

get(3):
  Found Node3 (freq=1)
  Update freq: 1 → 2
  freqMap: {1: [], 2: [Node3, Node1]}
  minFreq = 2 (freq 1 is empty!)
  return 3

put(4, 4):
  Capacity full! Evict LFU:
    minFreq = 2 → evict from freq 2 list
    Remove Node1 (LRU in freq 2: at tail)
  Add Node4 (freq=1)
  freqMap: {1: [Node4], 2: [Node3]}
  minFreq = 1

**Updating minFreq:**
When removing node from freq list:
- If freq == minFreq AND list is empty → minFreq++
- New nodes always have freq=1 → minFreq = 1

**Why Doubly Linked List per Frequency?**
- Insert at head (MRU): O(1)
- Remove from tail (LRU): O(1)
- Remove arbitrary node: O(1)

**Advantages:**
✓ Evicts truly least-used items
✓ Resistant to one-time access bursts
✓ Better for repeated access patterns

**Disadvantages:**
✗ Complex implementation
✗ More memory (frequency tracking)
✗ New items easily evicted (freq=1)

**LRU vs LFU:**
┌──────────────┬─────────────┬─────────────┐
│              │ LRU         │ LFU         │
├──────────────┼─────────────┼─────────────┤
│ Evicts       │ Oldest      │ Least used  │
│ Good for     │ Temporal    │ Frequency   │
│ Complexity   │ Simple      │ Complex     │
│ New item     │ Protected   │ Vulnerable  │
│ Burst access │ Vulnerable  │ Protected   │
└──────────────┴─────────────┴─────────────┘

**Use Cases:**
- Content popularity tracking
- Ad serving (frequency caps)
- Video streaming (popular content)
- Database query cache (hot queries)

**Complexity:**
- get(): O(1) average
- put(): O(1) average
- Space: O(capacity) + frequency lists`,
      pseudocode: `LFU Cache Algorithm:
--------------------
// Node with frequency
class Node:
    int key
    int value
    int freq
    Node prev
    Node next

// Doubly linked list for each frequency
class DLList:
    Node head, tail  // Dummy nodes
    int size

    add(node):
        // Add to head (MRU)
        node.next = head.next
        node.prev = head
        head.next.prev = node
        head.next = node
        size++

    remove(node):
        node.prev.next = node.next
        node.next.prev = node.prev
        size--

    removeLast():
        // Remove from tail (LRU)
        if size > 0:
            last = tail.prev
            remove(last)
            return last
        return null

// Initialization
LFUCache(capacity):
    this.capacity = capacity
    this.cache = HashMap<Integer, Node>()
    this.freqMap = HashMap<Integer, DLList>()  // freq → list
    this.minFreq = 0

// Get value
get(key):
    if key not in cache:
        return -1

    node = cache[key]
    updateFreq(node)  // Increment frequency
    return node.value

// Put key-value
put(key, value):
    if capacity == 0:
        return

    if key in cache:
        // Update existing
        node = cache[key]
        node.value = value
        updateFreq(node)
    else:
        // Add new node
        if cache.size() >= capacity:
            // Evict LFU (and LRU if tie)
            minFreqList = freqMap[minFreq]
            removed = minFreqList.removeLast()  // LRU in minFreq
            cache.remove(removed.key)

        // Add new node with freq=1
        newNode = new Node(key, value, freq=1)
        cache[key] = newNode

        if 1 not in freqMap:
            freqMap[1] = new DLList()
        freqMap[1].add(newNode)

        minFreq = 1

// Update node frequency
updateFreq(node):
    freq = node.freq
    freqList = freqMap[freq]
    freqList.remove(node)

    // Update minFreq if current freq list is empty
    if freq == minFreq AND freqList.size == 0:
        minFreq++

    // Move to next frequency list
    node.freq++
    if node.freq not in freqMap:
        freqMap[node.freq] = new DLList()
    freqMap[node.freq].add(node)

Example Trace:
--------------
Capacity=2

put(1, 1):
  newNode = Node(1, 1, freq=1)
  freqMap[1].add(Node1)
  freqMap: {1: [Node1]}
  minFreq = 1

put(2, 2):
  newNode = Node(2, 2, freq=1)
  freqMap[1].add(Node2)  // Add to head
  freqMap: {1: head ⇄ Node2 ⇄ Node1 ⇄ tail}
  minFreq = 1

get(1):
  node = cache[1]  // Node1, freq=1
  updateFreq(Node1):
    freqMap[1].remove(Node1)
    freqMap: {1: [Node2]}  // Only Node2 left
    freq=1, minFreq=1, list not empty → minFreq stays 1
    node.freq = 2
    freqMap[2].add(Node1)
    freqMap: {1: [Node2], 2: [Node1]}
  return 1

put(3, 3):
  cache.size() = 2 >= capacity
  Evict from minFreq=1:
    removed = freqMap[1].removeLast()  // Node2
    cache.remove(2)
  freqMap: {1: [], 2: [Node1]}

  newNode = Node(3, 3, freq=1)
  freqMap[1].add(Node3)
  freqMap: {1: [Node3], 2: [Node1]}
  minFreq = 1

get(2):
  2 not in cache → return -1

get(3):
  node = cache[3]  // Node3, freq=1
  updateFreq(Node3):
    freqMap[1].remove(Node3)
    freqMap: {1: [], 2: [Node1]}
    freq=1, minFreq=1, size=0 → minFreq = 2
    node.freq = 2
    freqMap[2].add(Node3)  // Add to head
    freqMap: {1: [], 2: head ⇄ Node3 ⇄ Node1 ⇄ tail}
  minFreq = 2
  return 3

put(4, 4):
  cache.size() = 2 >= capacity
  Evict from minFreq=2:
    removed = freqMap[2].removeLast()  // Node1 (LRU)
    cache.remove(1)
  freqMap: {1: [], 2: [Node3]}

  newNode = Node(4, 4, freq=1)
  freqMap[1].add(Node4)
  freqMap: {1: [Node4], 2: [Node3]}
  minFreq = 1

Simplified with LinkedHashSet:
-------------------------------
LFUCacheSimple(capacity):
    cache = HashMap<key, Node>()
    freqMap = HashMap<freq, LinkedHashSet<key>>()  // Insertion order = LRU
    minFreq = 0

get(key):
    if key not in cache:
        return -1
    updateFreq(key)
    return cache[key].value

updateFreq(key):
    node = cache[key]
    freq = node.freq

    // Remove from current freq set
    freqMap[freq].remove(key)
    if freq == minFreq AND freqMap[freq].isEmpty():
        minFreq++

    // Add to next freq set
    node.freq++
    freqMap.putIfAbsent(node.freq, new LinkedHashSet())
    freqMap[node.freq].add(key)

put(key, value):
    if capacity == 0:
        return

    if key in cache:
        cache[key].value = value
        updateFreq(key)
    else:
        if cache.size() >= capacity:
            // Evict: first item (oldest) in minFreq set
            evictKey = freqMap[minFreq].iterator().next()
            freqMap[minFreq].remove(evictKey)
            cache.remove(evictKey)

        cache[key] = Node(key, value, freq=1)
        freqMap.putIfAbsent(1, new LinkedHashSet())
        freqMap[1].add(key)
        minFreq = 1`
    },
    {
      id: 4,
      title: 'Design Browser History',
      difficulty: 'Medium',
      description: 'Design a browser history system with visit, back, and forward operations. Support navigating backward/forward by a given number of steps. Clear forward history when visiting a new page from the middle of history.',
      example: `BrowserHistory history = new BrowserHistory("leetcode.com");
history.visit("google.com");     // [leetcode.com, google.com]
history.visit("facebook.com");   // [leetcode.com, google.com, facebook.com]
history.visit("youtube.com");    // [leetcode.com, google.com, facebook.com, youtube.com]
history.back(1);                 // returns "facebook.com"
history.back(1);                 // returns "google.com"
history.forward(1);              // returns "facebook.com"
history.visit("linkedin.com");   // [leetcode.com, google.com, facebook.com, linkedin.com]
history.forward(2);              // returns "linkedin.com" (can't go forward)
history.back(2);                 // returns "google.com"`,
      code: {
        java: {
          starterCode: `class BrowserHistory {
    public BrowserHistory(String homepage) {
        // TODO: Initialize browser history

    }

    public void visit(String url) {
        // TODO: Visit new page, clear forward history

    }

    public String back(int steps) {
        // TODO: Go back steps, return current page

        return "";
    }

    public String forward(int steps) {
        // TODO: Go forward steps, return current page

        return "";
    }
}`,
          solution: `class BrowserHistory {
    private List<String> history;
    private int current;

    public BrowserHistory(String homepage) {
        history = new ArrayList<>();
        history.add(homepage);
        current = 0;
    }

    public void visit(String url) {
        // Remove all forward history
        while (history.size() > current + 1) {
            history.remove(history.size() - 1);
        }

        history.add(url);
        current++;
    }

    public String back(int steps) {
        current = Math.max(0, current - steps);
        return history.get(current);
    }

    public String forward(int steps) {
        current = Math.min(history.size() - 1, current + steps);
        return history.get(current);
    }
}

// Using doubly linked list
class BrowserHistoryDLL {
    private class Node {
        String url;
        Node prev;
        Node next;

        Node(String u) {
            url = u;
        }
    }

    private Node current;

    public BrowserHistoryDLL(String homepage) {
        current = new Node(homepage);
    }

    public void visit(String url) {
        Node newNode = new Node(url);
        current.next = newNode;
        newNode.prev = current;
        current = newNode;
    }

    public String back(int steps) {
        while (steps > 0 && current.prev != null) {
            current = current.prev;
            steps--;
        }
        return current.url;
    }

    public String forward(int steps) {
        while (steps > 0 && current.next != null) {
            current = current.next;
            steps--;
        }
        return current.url;
    }
}

// Using two stacks
class BrowserHistoryStacks {
    private Stack<String> backStack;
    private Stack<String> forwardStack;
    private String current;

    public BrowserHistoryStacks(String homepage) {
        backStack = new Stack<>();
        forwardStack = new Stack<>();
        current = homepage;
    }

    public void visit(String url) {
        backStack.push(current);
        current = url;
        forwardStack.clear();
    }

    public String back(int steps) {
        while (steps > 0 && !backStack.isEmpty()) {
            forwardStack.push(current);
            current = backStack.pop();
            steps--;
        }
        return current;
    }

    public String forward(int steps) {
        while (steps > 0 && !forwardStack.isEmpty()) {
            backStack.push(current);
            current = forwardStack.pop();
            steps--;
        }
        return current;
    }

    public String getCurrentUrl() {
        return current;
    }

    public boolean canGoBack() {
        return !backStack.isEmpty();
    }

    public boolean canGoForward() {
        return !forwardStack.isEmpty();
    }
}

// With history limit
class BrowserHistoryLimited {
    private List<String> history;
    private int current;
    private int maxSize;

    public BrowserHistoryLimited(String homepage, int maxSize) {
        this.maxSize = maxSize;
        history = new ArrayList<>();
        history.add(homepage);
        current = 0;
    }

    public void visit(String url) {
        // Remove forward history
        while (history.size() > current + 1) {
            history.remove(history.size() - 1);
        }

        history.add(url);
        current++;

        // Maintain size limit
        if (history.size() > maxSize) {
            history.remove(0);
            current--;
        }
    }

    public String back(int steps) {
        current = Math.max(0, current - steps);
        return history.get(current);
    }

    public String forward(int steps) {
        current = Math.min(history.size() - 1, current + steps);
        return history.get(current);
    }

    public List<String> getHistory() {
        return new ArrayList<>(history);
    }
}`
        },
        python: {
          starterCode: `class BrowserHistory:
    def __init__(self, homepage: str):
        # TODO: Initialize browser history
        pass

    def visit(self, url: str) -> None:
        # TODO: Visit new page, clear forward history
        pass

    def back(self, steps: int) -> str:
        # TODO: Go back steps, return current page
        return ""

    def forward(self, steps: int) -> str:
        # TODO: Go forward steps, return current page
        return ""`,
          solution: `class BrowserHistory:
    def __init__(self, homepage: str):
        self.history = [homepage]
        self.current = 0

    def visit(self, url: str) -> None:
        # Remove all forward history
        self.history = self.history[:self.current + 1]
        self.history.append(url)
        self.current += 1

    def back(self, steps: int) -> str:
        self.current = max(0, self.current - steps)
        return self.history[self.current]

    def forward(self, steps: int) -> str:
        self.current = min(len(self.history) - 1, self.current + steps)
        return self.history[self.current]


# Using doubly linked list
class BrowserHistoryDLL:
    class Node:
        def __init__(self, url: str):
            self.url = url
            self.prev = None
            self.next = None

    def __init__(self, homepage: str):
        self.current = self.Node(homepage)

    def visit(self, url: str) -> None:
        new_node = self.Node(url)
        self.current.next = new_node
        new_node.prev = self.current
        self.current = new_node

    def back(self, steps: int) -> str:
        while steps > 0 and self.current.prev is not None:
            self.current = self.current.prev
            steps -= 1
        return self.current.url

    def forward(self, steps: int) -> str:
        while steps > 0 and self.current.next is not None:
            self.current = self.current.next
            steps -= 1
        return self.current.url


# Using two stacks
class BrowserHistoryStacks:
    def __init__(self, homepage: str):
        self.back_stack = []
        self.forward_stack = []
        self.current = homepage

    def visit(self, url: str) -> None:
        self.back_stack.append(self.current)
        self.current = url
        self.forward_stack.clear()

    def back(self, steps: int) -> str:
        while steps > 0 and self.back_stack:
            self.forward_stack.append(self.current)
            self.current = self.back_stack.pop()
            steps -= 1
        return self.current

    def forward(self, steps: int) -> str:
        while steps > 0 and self.forward_stack:
            self.back_stack.append(self.current)
            self.current = self.forward_stack.pop()
            steps -= 1
        return self.current

    def get_current_url(self) -> str:
        return self.current

    def can_go_back(self) -> bool:
        return len(self.back_stack) > 0

    def can_go_forward(self) -> bool:
        return len(self.forward_stack) > 0


# With history limit
class BrowserHistoryLimited:
    def __init__(self, homepage: str, max_size: int):
        self.max_size = max_size
        self.history = [homepage]
        self.current = 0

    def visit(self, url: str) -> None:
        # Remove forward history
        self.history = self.history[:self.current + 1]
        self.history.append(url)
        self.current += 1

        # Maintain size limit
        if len(self.history) > self.max_size:
            self.history.pop(0)
            self.current -= 1

    def back(self, steps: int) -> str:
        self.current = max(0, self.current - steps)
        return self.history[self.current]

    def forward(self, steps: int) -> str:
        self.current = min(len(self.history) - 1, self.current + steps)
        return self.history[self.current]

    def get_history(self) -> list:
        return self.history.copy()`
        }
      },
      testCases: [
        { input: 'visit("google.com"), back(1)', output: 'back: "leetcode.com"' },
        { input: 'visit("google.com"), visit("facebook.com"), back(1), forward(1)', output: 'forward: "facebook.com"' },
        { input: 'visit("a"), visit("b"), back(1), visit("c"), forward(1)', output: 'forward: "c"' }
      ],
      explanation: `**Problem:** Design browser history with back/forward navigation.

**Key Insight: Track Current Position in History**
Linear history with a current pointer.
Visiting new page from middle → delete forward history.

**Data Structures:**

**Option 1: ArrayList**
- history: List<String>
- current: int (index pointer)

**Option 2: Doubly Linked List**
- current: Node pointer
- Navigate via prev/next pointers

**Option 3: Two Stacks**
- backStack: Stack of previous pages
- forwardStack: Stack of next pages
- current: String (current page)

**Operations:**

**visit(url):**
1. Clear all forward history
2. Add url to history
3. Move current forward

**back(steps):**
1. Move current backward by steps
2. Stop at beginning if needed
3. Return current page

**forward(steps):**
1. Move current forward by steps
2. Stop at end if needed
3. Return current page

**Example with ArrayList:**
Homepage = "leetcode.com"

visit("google.com"):
  history: ["leetcode.com", "google.com"]
  current = 1  (points to "google.com")

visit("facebook.com"):
  history: ["leetcode.com", "google.com", "facebook.com"]
  current = 2

visit("youtube.com"):
  history: ["leetcode.com", "google.com", "facebook.com", "youtube.com"]
  current = 3

back(1):
  current = 2  (now at "facebook.com")
  return "facebook.com"

back(1):
  current = 1  (now at "google.com")
  return "google.com"

forward(1):
  current = 2  (now at "facebook.com")
  return "facebook.com"

visit("linkedin.com"):
  Clear forward: remove "youtube.com"
  history: ["leetcode.com", "google.com", "facebook.com", "linkedin.com"]
  current = 3

forward(2):
  current = min(3, 3 + 2) = 3  (can't go forward)
  return "linkedin.com"

back(2):
  current = max(0, 3 - 2) = 1
  return "google.com"

**Clear Forward History:**
When visiting from middle position:
┌────────────────────────────────────┐
│ Before visit("x") at current=2:    │
│ [a, b, c, d, e]                    │
│        ↑ current                   │
└────────────────────────────────────┘
┌────────────────────────────────────┐
│ After visit("x"):                  │
│ [a, b, c, x]                       │
│           ↑ current                │
│ (d, e deleted)                     │
└────────────────────────────────────┘

**Implementation Comparisons:**

**ArrayList:**
pros: Simple, O(1) navigation
cons: O(n) to clear forward history

**Doubly Linked List:**
pros: O(1) all operations
cons: More complex, extra space

**Two Stacks:**
pros: Natural back/forward semantics
cons: O(n) for multi-step navigation

**Advantages:**
✓ Simple history navigation
✓ Memory efficient (only URLs)
✓ O(1) or O(steps) operations

**Use Cases:**
- Web browser history
- Undo/redo systems
- Text editor navigation
- File explorer back/forward

**Complexity:**
- ArrayList: visit O(n), back/forward O(1)
- DLL: all operations O(1)
- Two Stacks: all operations O(steps)
- Space: O(history size)`,
      pseudocode: `Browser History Algorithm:
--------------------------
// ArrayList Implementation
class BrowserHistory:
    List<String> history
    int current

// Initialization
BrowserHistory(homepage):
    history = new ArrayList()
    history.add(homepage)
    current = 0

// Visit new page
visit(url):
    // Remove all forward history
    while history.size() > current + 1:
        history.remove(history.size() - 1)

    // Add new page
    history.add(url)
    current++

// Go back
back(steps):
    current = max(0, current - steps)
    return history[current]

// Go forward
forward(steps):
    current = min(history.size() - 1, current + steps)
    return history[current]

Example Trace (ArrayList):
--------------------------
BrowserHistory("leetcode.com")
  history: ["leetcode.com"]
  current = 0

visit("google.com"):
  Remove forward: none
  history: ["leetcode.com", "google.com"]
  current = 1

visit("facebook.com"):
  Remove forward: none
  history: ["leetcode.com", "google.com", "facebook.com"]
  current = 2

visit("youtube.com"):
  Remove forward: none
  history: ["leetcode.com", "google.com", "facebook.com", "youtube.com"]
  current = 3

back(1):
  current = max(0, 3 - 1) = 2
  return history[2] = "facebook.com"

back(1):
  current = max(0, 2 - 1) = 1
  return history[1] = "google.com"

forward(1):
  current = min(3, 1 + 1) = 2
  return history[2] = "facebook.com"

visit("linkedin.com"):
  Remove forward: remove youtube.com
  history: ["leetcode.com", "google.com", "facebook.com"]
  current = 2
  Add linkedin.com:
  history: ["leetcode.com", "google.com", "facebook.com", "linkedin.com"]
  current = 3

forward(2):
  current = min(3, 3 + 2) = 3
  return history[3] = "linkedin.com"

back(2):
  current = max(0, 3 - 2) = 1
  return history[1] = "google.com"

Doubly Linked List Implementation:
-----------------------------------
class BrowserHistoryDLL:
    class Node:
        String url
        Node prev
        Node next

    Node current

BrowserHistory(homepage):
    current = new Node(homepage)

visit(url):
    newNode = new Node(url)
    current.next = newNode  // Clear forward history
    newNode.prev = current
    current = newNode

back(steps):
    while steps > 0 AND current.prev != null:
        current = current.prev
        steps--
    return current.url

forward(steps):
    while steps > 0 AND current.next != null:
        current = current.next
        steps--
    return current.url

Two Stacks Implementation:
---------------------------
class BrowserHistoryStacks:
    Stack<String> backStack
    Stack<String> forwardStack
    String current

BrowserHistory(homepage):
    backStack = new Stack()
    forwardStack = new Stack()
    current = homepage

visit(url):
    backStack.push(current)
    current = url
    forwardStack.clear()  // Clear forward history

back(steps):
    while steps > 0 AND not backStack.isEmpty():
        forwardStack.push(current)
        current = backStack.pop()
        steps--
    return current

forward(steps):
    while steps > 0 AND not forwardStack.isEmpty():
        backStack.push(current)
        current = forwardStack.pop()
        steps--
    return current

Example Trace (Two Stacks):
----------------------------
BrowserHistory("leetcode.com")
  backStack: []
  current: "leetcode.com"
  forwardStack: []

visit("google.com"):
  backStack.push("leetcode.com") → ["leetcode.com"]
  current = "google.com"
  forwardStack.clear() → []

visit("facebook.com"):
  backStack: ["leetcode.com", "google.com"]
  current: "facebook.com"

back(1):
  forwardStack.push("facebook.com") → ["facebook.com"]
  current = backStack.pop() = "google.com"
  backStack: ["leetcode.com"]
  return "google.com"

forward(1):
  backStack.push("google.com") → ["leetcode.com", "google.com"]
  current = forwardStack.pop() = "facebook.com"
  forwardStack: []
  return "facebook.com"

visit("linkedin.com"):
  backStack.push("facebook.com") → ["leetcode.com", "google.com", "facebook.com"]
  current = "linkedin.com"
  forwardStack.clear() → []

With History Limit:
-------------------
class BrowserHistoryLimited:
    List<String> history
    int current
    int maxSize

visit(url):
    // Remove forward history
    while history.size() > current + 1:
        history.remove(history.size() - 1)

    history.add(url)
    current++

    // Maintain size limit
    if history.size() > maxSize:
        history.remove(0)  // Remove oldest
        current--

Comparison:
-----------
ArrayList:
  - Simple
  - O(1) navigation
  - O(n) clear forward (visit)

Doubly Linked List:
  - O(1) all operations
  - More complex
  - Extra space for pointers

Two Stacks:
  - Natural back/forward semantics
  - O(steps) for navigation
  - Good for undo/redo systems`
    }
  ]

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question)
    const problemId = `LRUCache-${question.id}`
    const savedCode = getUserCode(problemId, language)
    setUserCode(savedCode || question.code[language].starterCode)
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
    setUserCode(selectedQuestion.code[language].starterCode)
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
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', color: 'white' }}>
        <button
          onClick={onBack}
          style={{
            marginBottom: '2rem',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          ← Back to Practice
        </button>

        <Breadcrumb breadcrumb={breadcrumb} />

        <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>
          LRU Cache & Variants Practice
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#6b7280', marginBottom: '2rem' }}>
          Master cache eviction policies: LRU, LFU, expiry-based, and browser history
        </p>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {questions.map((q) => {
            const isCompleted = isProblemCompleted(`LRUCache-${q.id}`)
            return (
              <div
                key={`${q.id}-${refreshKey}`}
                onClick={() => handleQuestionSelect(q)}
                style={{
                  padding: '1.5rem',
                  border: isCompleted ? '3px solid #10b981' : '2px solid #374151',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: isCompleted ? 'rgba(16, 185, 129, 0.15)' : 'rgba(30, 41, 59, 0.8)',
                  boxShadow: isCompleted ? '0 2px 12px rgba(16, 185, 129, 0.2)' : 'none',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = isCompleted ? '#10b981' : '#3b82f6'
                  e.currentTarget.style.boxShadow = isCompleted ? '0 4px 16px rgba(16, 185, 129, 0.3)' : '0 4px 12px rgba(59, 130, 246, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isCompleted ? '#10b981' : '#374151'
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
                  <h3 style={{ fontSize: '1.25rem', color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
          backgroundColor: '#2563eb',
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
        <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'white' }}>Code Editor</h3>
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
            backgroundColor: '#2563eb',
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
            problemId={`LRUCache-${selectedQuestion.id}`}
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
            <div style={{ color: '#78350f', lineHeight: '1.7', whiteSpace: 'pre-wrap', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
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
            {selectedQuestion.code[language].solution}
          </pre>
        </div>
      )}
    </div>
  )
}

export default LRUCache

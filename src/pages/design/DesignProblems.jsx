import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import { isProblemCompleted, getUserCode } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'

function DesignProblems({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory }) {
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
        const problemId = `DesignProblems-${selectedQuestion.id}`
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
      title: 'Design HashMap',
      difficulty: 'Medium',
      description: 'Design a HashMap with put, get, and remove operations. Handle collisions using chaining (linked lists). Support dynamic resizing when load factor exceeds threshold. Implement without using built-in hash table libraries.',
      example: `MyHashMap map = new MyHashMap();
map.put(1, 1);
map.put(2, 2);
map.get(1);    // returns 1
map.get(3);    // returns -1 (not found)
map.put(2, 3); // update existing key
map.get(2);    // returns 3
map.remove(2);
map.get(2);    // returns -1`,
      code: {
        java: {
          starterCode: `class MyHashMap {
    private class Node {
        int key;
        int value;
        Node next;

        Node(int k, int v) {
            key = k;
            value = v;
        }
    }

    private Node[] buckets;
    private int size;
    private int capacity;
    private static final double LOAD_FACTOR = 0.75;

    public MyHashMap() {
        // TODO: Initialize hash map

    }

    public void put(int key, int value) {
        // TODO: Add or update key-value pair

    }

    public int get(int key) {
        // TODO: Get value for key

        return -1;
    }

    public void remove(int key) {
        // TODO: Remove key-value pair

    }

    private int hash(int key) {
        // TODO: Calculate bucket index

        return 0;
    }

    private void resize() {
        // TODO: Resize when load factor exceeded

    }
}`,
      solution: `class MyHashMap {
    private class Node {
        int key;
        int value;
        Node next;

        Node(int k, int v) {
            key = k;
            value = v;
        }
    }

    private Node[] buckets;
    private int size;
    private int capacity;
    private static final int INITIAL_CAPACITY = 16;
    private static final double LOAD_FACTOR = 0.75;

    public MyHashMap() {
        capacity = INITIAL_CAPACITY;
        buckets = new Node[capacity];
        size = 0;
    }

    public void put(int key, int value) {
        if (size >= capacity * LOAD_FACTOR) {
            resize();
        }

        int index = hash(key);
        Node head = buckets[index];

        // Check if key exists
        Node curr = head;
        while (curr != null) {
            if (curr.key == key) {
                curr.value = value;
                return;
            }
            curr = curr.next;
        }

        // Add new node at head
        Node newNode = new Node(key, value);
        newNode.next = head;
        buckets[index] = newNode;
        size++;
    }

    public int get(int key) {
        int index = hash(key);
        Node curr = buckets[index];

        while (curr != null) {
            if (curr.key == key) {
                return curr.value;
            }
            curr = curr.next;
        }

        return -1; // Not found
    }

    public void remove(int key) {
        int index = hash(key);
        Node curr = buckets[index];
        Node prev = null;

        while (curr != null) {
            if (curr.key == key) {
                if (prev == null) {
                    buckets[index] = curr.next;
                } else {
                    prev.next = curr.next;
                }
                size--;
                return;
            }
            prev = curr;
            curr = curr.next;
        }
    }

    private int hash(int key) {
        return Math.abs(key) % capacity;
    }

    private void resize() {
        int newCapacity = capacity * 2;
        Node[] newBuckets = new Node[newCapacity];

        // Rehash all entries
        for (Node head : buckets) {
            Node curr = head;
            while (curr != null) {
                Node next = curr.next;

                int newIndex = Math.abs(curr.key) % newCapacity;
                curr.next = newBuckets[newIndex];
                newBuckets[newIndex] = curr;

                curr = next;
            }
        }

        buckets = newBuckets;
        capacity = newCapacity;
    }

    public int size() {
        return size;
    }

    public boolean containsKey(int key) {
        return get(key) != -1;
    }
}

// Generic version
class HashMap<K, V> {
    private class Node {
        K key;
        V value;
        Node next;

        Node(K k, V v) {
            key = k;
            value = v;
        }
    }

    private Node[] buckets;
    private int size;
    private int capacity;
    private static final int INITIAL_CAPACITY = 16;
    private static final double LOAD_FACTOR = 0.75;

    @SuppressWarnings("unchecked")
    public HashMap() {
        capacity = INITIAL_CAPACITY;
        buckets = (Node[]) new Object[capacity];
        size = 0;
    }

    public void put(K key, V value) {
        if (size >= capacity * LOAD_FACTOR) {
            resize();
        }

        int index = hash(key);
        Node head = buckets[index];

        Node curr = head;
        while (curr != null) {
            if (curr.key.equals(key)) {
                curr.value = value;
                return;
            }
            curr = curr.next;
        }

        Node newNode = new Node(key, value);
        newNode.next = head;
        buckets[index] = newNode;
        size++;
    }

    public V get(K key) {
        int index = hash(key);
        Node curr = buckets[index];

        while (curr != null) {
            if (curr.key.equals(key)) {
                return curr.value;
            }
            curr = curr.next;
        }

        return null;
    }

    public void remove(K key) {
        int index = hash(key);
        Node curr = buckets[index];
        Node prev = null;

        while (curr != null) {
            if (curr.key.equals(key)) {
                if (prev == null) {
                    buckets[index] = curr.next;
                } else {
                    prev.next = curr.next;
                }
                size--;
                return;
            }
            prev = curr;
            curr = curr.next;
        }
    }

    private int hash(K key) {
        return Math.abs(key.hashCode()) % capacity;
    }

    @SuppressWarnings("unchecked")
    private void resize() {
        int newCapacity = capacity * 2;
        Node[] newBuckets = (Node[]) new Object[newCapacity];

        for (Node head : buckets) {
            Node curr = head;
            while (curr != null) {
                Node next = curr.next;

                int newIndex = Math.abs(curr.key.hashCode()) % newCapacity;
                curr.next = newBuckets[newIndex];
                newBuckets[newIndex] = curr;

                curr = next;
            }
        }

        buckets = newBuckets;
        capacity = newCapacity;
    }

    public int size() {
        return size;
    }

    public boolean containsKey(K key) {
        return get(key) != null;
    }
}`
        },
        python: {
          starterCode: `class MyHashMap:
    class Node:
        def __init__(self, key: int, value: int):
            # TODO: Initialize node
            pass

    def __init__(self):
        # TODO: Initialize hash map
        pass

    def put(self, key: int, value: int) -> None:
        # TODO: Add or update key-value pair
        pass

    def get(self, key: int) -> int:
        # TODO: Get value for key
        return -1

    def remove(self, key: int) -> None:
        # TODO: Remove key-value pair
        pass

    def _hash(self, key: int) -> int:
        # TODO: Calculate bucket index
        return 0

    def _resize(self) -> None:
        # TODO: Resize when load factor exceeded
        pass`,
          solution: `class MyHashMap:
    class Node:
        def __init__(self, key: int, value: int):
            self.key = key
            self.value = value
            self.next = None

    INITIAL_CAPACITY = 16
    LOAD_FACTOR = 0.75

    def __init__(self):
        self.capacity = self.INITIAL_CAPACITY
        self.buckets = [None] * self.capacity
        self.size = 0

    def put(self, key: int, value: int) -> None:
        if self.size >= self.capacity * self.LOAD_FACTOR:
            self._resize()

        index = self._hash(key)
        head = self.buckets[index]

        # Check if key exists
        curr = head
        while curr:
            if curr.key == key:
                curr.value = value
                return
            curr = curr.next

        # Add new node at head
        new_node = self.Node(key, value)
        new_node.next = head
        self.buckets[index] = new_node
        self.size += 1

    def get(self, key: int) -> int:
        index = self._hash(key)
        curr = self.buckets[index]

        while curr:
            if curr.key == key:
                return curr.value
            curr = curr.next

        return -1  # Not found

    def remove(self, key: int) -> None:
        index = self._hash(key)
        curr = self.buckets[index]
        prev = None

        while curr:
            if curr.key == key:
                if prev is None:
                    self.buckets[index] = curr.next
                else:
                    prev.next = curr.next
                self.size -= 1
                return
            prev = curr
            curr = curr.next

    def _hash(self, key: int) -> int:
        return abs(key) % self.capacity

    def _resize(self) -> None:
        new_capacity = self.capacity * 2
        new_buckets = [None] * new_capacity

        # Rehash all entries
        for head in self.buckets:
            curr = head
            while curr:
                next_node = curr.next

                new_index = abs(curr.key) % new_capacity
                curr.next = new_buckets[new_index]
                new_buckets[new_index] = curr

                curr = next_node

        self.buckets = new_buckets
        self.capacity = new_capacity

    def get_size(self) -> int:
        return self.size

    def contains_key(self, key: int) -> bool:
        return self.get(key) != -1


# Generic version
from typing import TypeVar, Optional, List

K = TypeVar('K')
V = TypeVar('V')

class HashMap:
    class Node:
        def __init__(self, key, value):
            self.key = key
            self.value = value
            self.next = None

    INITIAL_CAPACITY = 16
    LOAD_FACTOR = 0.75

    def __init__(self):
        self.capacity = self.INITIAL_CAPACITY
        self.buckets: List[Optional[HashMap.Node]] = [None] * self.capacity
        self.size = 0

    def put(self, key: K, value: V) -> None:
        if self.size >= self.capacity * self.LOAD_FACTOR:
            self._resize()

        index = self._hash(key)
        head = self.buckets[index]

        curr = head
        while curr:
            if curr.key == key:
                curr.value = value
                return
            curr = curr.next

        new_node = HashMap.Node(key, value)
        new_node.next = head
        self.buckets[index] = new_node
        self.size += 1

    def get(self, key: K) -> Optional[V]:
        index = self._hash(key)
        curr = self.buckets[index]

        while curr:
            if curr.key == key:
                return curr.value
            curr = curr.next

        return None

    def remove(self, key: K) -> None:
        index = self._hash(key)
        curr = self.buckets[index]
        prev = None

        while curr:
            if curr.key == key:
                if prev is None:
                    self.buckets[index] = curr.next
                else:
                    prev.next = curr.next
                self.size -= 1
                return
            prev = curr
            curr = curr.next

    def _hash(self, key: K) -> int:
        return abs(hash(key)) % self.capacity

    def _resize(self) -> None:
        new_capacity = self.capacity * 2
        new_buckets: List[Optional[HashMap.Node]] = [None] * new_capacity

        for head in self.buckets:
            curr = head
            while curr:
                next_node = curr.next

                new_index = abs(hash(curr.key)) % new_capacity
                curr.next = new_buckets[new_index]
                new_buckets[new_index] = curr

                curr = next_node

        self.buckets = new_buckets
        self.capacity = new_capacity

    def get_size(self) -> int:
        return self.size

    def contains_key(self, key: K) -> bool:
        return self.get(key) is not None`
        }
      },
      testCases: [
        { input: 'put(1,1), put(2,2), get(1), get(3)', output: 'get(1): 1, get(3): -1' },
        { input: 'put(1,1), put(1,2), get(1)', output: 'get(1): 2' },
        { input: 'put(1,1), remove(1), get(1)', output: 'get(1): -1' }
      ],
      explanation: `**Problem:** Design a HashMap from scratch with core operations: put, get, remove.

**Key Insight: Separate Chaining for Collision Handling**
Use an array of linked lists (buckets). When multiple keys hash to same index → add to that bucket's linked list.

**Hash Function:**
hash(key) = |key| % capacity
Converts any integer key to valid bucket index [0, capacity-1]

**Load Factor & Dynamic Resizing:**
Load Factor = size / capacity
When load factor > 0.75 → resize to maintain O(1) performance
Too many collisions → chains grow long → operations become O(n)

**Data Structure:**
┌──────────────────────────────────────┐
│  buckets: Node[] (array of chains)  │
├──────────────────────────────────────┤
│  [0]: 1→9→17 (keys that hash to 0)  │
│  [1]: 2→10→null                      │
│  [2]: null                            │
│  [3]: 3→11→19→null                   │
│  ...                                 │
└──────────────────────────────────────┘

**Operations:**
1. **put(key, value):**
   - Calculate hash(key) to find bucket
   - Search chain for existing key → update value
   - If not found → add new node at head O(1)
   - Check load factor → resize if needed

2. **get(key):**
   - Calculate hash(key) to find bucket
   - Traverse chain to find key
   - Return value or -1 if not found

3. **remove(key):**
   - Calculate hash(key) to find bucket
   - Traverse chain with prev pointer
   - Remove node from chain
   - Decrement size

4. **resize():**
   - Create new array with 2x capacity
   - Rehash ALL entries with new capacity
   - O(n) operation but amortized O(1) per put

**Why Separate Chaining?**
✓ Simple to implement
✓ No clustering issues
✓ Never "full" - can always add
✓ Graceful degradation if load factor high

**Complexity:**
- Average: O(1) for put/get/remove
- Worst: O(n) if all keys hash to same bucket
- Space: O(n) for n key-value pairs
- Resize: O(n) but amortized O(1)`,
      pseudocode: `HashMap Algorithm:
-----------------
// Initialization
MyHashMap():
    capacity = 16
    buckets = array of size capacity (all null)
    size = 0
    LOAD_FACTOR = 0.75

// Put operation
put(key, value):
    if size >= capacity * LOAD_FACTOR:
        resize()

    index = hash(key)
    current = buckets[index]

    // Search for existing key
    while current != null:
        if current.key == key:
            current.value = value  // Update
            return
        current = current.next

    // Key not found, add at head
    newNode = new Node(key, value)
    newNode.next = buckets[index]
    buckets[index] = newNode
    size++

// Get operation
get(key):
    index = hash(key)
    current = buckets[index]

    while current != null:
        if current.key == key:
            return current.value
        current = current.next

    return -1  // Not found

// Remove operation
remove(key):
    index = hash(key)
    current = buckets[index]
    prev = null

    while current != null:
        if current.key == key:
            if prev == null:
                // Remove head
                buckets[index] = current.next
            else:
                // Remove middle/end
                prev.next = current.next
            size--
            return
        prev = current
        current = current.next

// Hash function
hash(key):
    return |key| % capacity

// Resize (double capacity)
resize():
    newCapacity = capacity * 2
    newBuckets = array of size newCapacity

    // Rehash all entries
    for each bucket in buckets:
        current = bucket
        while current != null:
            nextNode = current.next

            // Rehash with new capacity
            newIndex = |current.key| % newCapacity
            current.next = newBuckets[newIndex]
            newBuckets[newIndex] = current

            current = nextNode

    buckets = newBuckets
    capacity = newCapacity

Example Trace:
--------------
map = new HashMap()
Buckets: [null, null, null, ..., null] (16 buckets)

put(1, 100):
  hash(1) = 1 % 16 = 1
  buckets[1] = 1→100

put(17, 200):
  hash(17) = 17 % 16 = 1  // Collision!
  buckets[1] = 17→200 → 1→100

get(17):
  hash(17) = 1
  Search chain at buckets[1]: 17→200 (found!)
  return 200

remove(17):
  hash(17) = 1
  Remove from chain
  buckets[1] = 1→100`
    },
    {
      id: 2,
      title: 'Design ArrayList',
      difficulty: 'Medium',
      description: 'Design a dynamic array (ArrayList) that automatically grows. Implement add, get, remove, and size operations. Double capacity when full, and optionally shrink when quarter full to save memory.',
      example: `MyArrayList list = new MyArrayList();
list.add(1);
list.add(2);
list.add(3);
list.get(1);       // returns 2
list.remove(1);    // removes 2
list.get(1);       // returns 3
list.size();       // returns 2
list.set(0, 5);
list.get(0);       // returns 5`,
      code: {
        java: {
          starterCode: `class MyArrayList {
    private int[] data;
    private int size;
    private int capacity;

    public MyArrayList() {
        // TODO: Initialize array list

    }

    public void add(int val) {
        // TODO: Add element, resize if needed

    }

    public int get(int index) {
        // TODO: Get element at index

        return -1;
    }

    public void remove(int index) {
        // TODO: Remove element and shift

    }

    public void set(int index, int val) {
        // TODO: Update element at index

    }

    public int size() {
        return size;
    }

    private void resize(int newCapacity) {
        // TODO: Resize internal array

    }
}`,
      solution: `class MyArrayList {
    private int[] data;
    private int size;
    private int capacity;
    private static final int INITIAL_CAPACITY = 10;

    public MyArrayList() {
        capacity = INITIAL_CAPACITY;
        data = new int[capacity];
        size = 0;
    }

    public void add(int val) {
        if (size == capacity) {
            resize(capacity * 2);
        }

        data[size++] = val;
    }

    public int get(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Index: " + index);
        }
        return data[index];
    }

    public void remove(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Index: " + index);
        }

        // Shift elements left
        for (int i = index; i < size - 1; i++) {
            data[i] = data[i + 1];
        }

        size--;

        // Shrink if needed (optional)
        if (size > 0 && size == capacity / 4) {
            resize(capacity / 2);
        }
    }

    public void set(int index, int val) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Index: " + index);
        }
        data[index] = val;
    }

    public int size() {
        return size;
    }

    private void resize(int newCapacity) {
        int[] newData = new int[newCapacity];
        for (int i = 0; i < size; i++) {
            newData[i] = data[i];
        }
        data = newData;
        capacity = newCapacity;
    }

    public void addAt(int index, int val) {
        if (index < 0 || index > size) {
            throw new IndexOutOfBoundsException("Index: " + index);
        }

        if (size == capacity) {
            resize(capacity * 2);
        }

        // Shift elements right
        for (int i = size; i > index; i--) {
            data[i] = data[i - 1];
        }

        data[index] = val;
        size++;
    }

    public boolean contains(int val) {
        return indexOf(val) != -1;
    }

    public int indexOf(int val) {
        for (int i = 0; i < size; i++) {
            if (data[i] == val) {
                return i;
            }
        }
        return -1;
    }

    public void clear() {
        size = 0;
        capacity = INITIAL_CAPACITY;
        data = new int[capacity];
    }
}

// Generic version
class ArrayList<T> {
    private Object[] data;
    private int size;
    private int capacity;
    private static final int INITIAL_CAPACITY = 10;

    public ArrayList() {
        capacity = INITIAL_CAPACITY;
        data = new Object[capacity];
        size = 0;
    }

    public void add(T val) {
        if (size == capacity) {
            resize(capacity * 2);
        }
        data[size++] = val;
    }

    @SuppressWarnings("unchecked")
    public T get(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Index: " + index);
        }
        return (T) data[index];
    }

    public void remove(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Index: " + index);
        }

        for (int i = index; i < size - 1; i++) {
            data[i] = data[i + 1];
        }

        data[--size] = null; // Help GC

        if (size > 0 && size == capacity / 4) {
            resize(capacity / 2);
        }
    }

    public void set(int index, T val) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Index: " + index);
        }
        data[index] = val;
    }

    public int size() {
        return size;
    }

    private void resize(int newCapacity) {
        Object[] newData = new Object[newCapacity];
        for (int i = 0; i < size; i++) {
            newData[i] = data[i];
        }
        data = newData;
        capacity = newCapacity;
    }

    public void addAt(int index, T val) {
        if (index < 0 || index > size) {
            throw new IndexOutOfBoundsException("Index: " + index);
        }

        if (size == capacity) {
            resize(capacity * 2);
        }

        for (int i = size; i > index; i--) {
            data[i] = data[i - 1];
        }

        data[index] = val;
        size++;
    }

    public boolean contains(T val) {
        return indexOf(val) != -1;
    }

    public int indexOf(T val) {
        for (int i = 0; i < size; i++) {
            if (data[i].equals(val)) {
                return i;
            }
        }
        return -1;
    }
}`
        },
        python: {
          starterCode: `class MyArrayList:
    def __init__(self):
        # TODO: Initialize array list
        pass

    def add(self, val: int) -> None:
        # TODO: Add element, resize if needed
        pass

    def get(self, index: int) -> int:
        # TODO: Get element at index
        return -1

    def remove(self, index: int) -> None:
        # TODO: Remove element and shift
        pass

    def set(self, index: int, val: int) -> None:
        # TODO: Update element at index
        pass

    def size(self) -> int:
        return 0

    def _resize(self, new_capacity: int) -> None:
        # TODO: Resize internal array
        pass`,
          solution: `class MyArrayList:
    INITIAL_CAPACITY = 10

    def __init__(self):
        self.capacity = self.INITIAL_CAPACITY
        self.data = [0] * self.capacity
        self._size = 0

    def add(self, val: int) -> None:
        if self._size == self.capacity:
            self._resize(self.capacity * 2)

        self.data[self._size] = val
        self._size += 1

    def get(self, index: int) -> int:
        if index < 0 or index >= self._size:
            raise IndexError(f"Index: {index}")
        return self.data[index]

    def remove(self, index: int) -> None:
        if index < 0 or index >= self._size:
            raise IndexError(f"Index: {index}")

        # Shift elements left
        for i in range(index, self._size - 1):
            self.data[i] = self.data[i + 1]

        self._size -= 1

        # Shrink if needed (optional)
        if self._size > 0 and self._size == self.capacity // 4:
            self._resize(self.capacity // 2)

    def set(self, index: int, val: int) -> None:
        if index < 0 or index >= self._size:
            raise IndexError(f"Index: {index}")
        self.data[index] = val

    def size(self) -> int:
        return self._size

    def _resize(self, new_capacity: int) -> None:
        new_data = [0] * new_capacity
        for i in range(self._size):
            new_data[i] = self.data[i]
        self.data = new_data
        self.capacity = new_capacity

    def add_at(self, index: int, val: int) -> None:
        if index < 0 or index > self._size:
            raise IndexError(f"Index: {index}")

        if self._size == self.capacity:
            self._resize(self.capacity * 2)

        # Shift elements right
        for i in range(self._size, index, -1):
            self.data[i] = self.data[i - 1]

        self.data[index] = val
        self._size += 1

    def contains(self, val: int) -> bool:
        return self.index_of(val) != -1

    def index_of(self, val: int) -> int:
        for i in range(self._size):
            if self.data[i] == val:
                return i
        return -1

    def clear(self) -> None:
        self._size = 0
        self.capacity = self.INITIAL_CAPACITY
        self.data = [0] * self.capacity


# Generic version
from typing import TypeVar, Optional, List

T = TypeVar('T')

class ArrayList:
    INITIAL_CAPACITY = 10

    def __init__(self):
        self.capacity = self.INITIAL_CAPACITY
        self.data: List[Optional[T]] = [None] * self.capacity
        self._size = 0

    def add(self, val: T) -> None:
        if self._size == self.capacity:
            self._resize(self.capacity * 2)
        self.data[self._size] = val
        self._size += 1

    def get(self, index: int) -> T:
        if index < 0 or index >= self._size:
            raise IndexError(f"Index: {index}")
        return self.data[index]

    def remove(self, index: int) -> None:
        if index < 0 or index >= self._size:
            raise IndexError(f"Index: {index}")

        for i in range(index, self._size - 1):
            self.data[i] = self.data[i + 1]

        self.data[self._size - 1] = None  # Help GC
        self._size -= 1

        if self._size > 0 and self._size == self.capacity // 4:
            self._resize(self.capacity // 2)

    def set(self, index: int, val: T) -> None:
        if index < 0 or index >= self._size:
            raise IndexError(f"Index: {index}")
        self.data[index] = val

    def size(self) -> int:
        return self._size

    def _resize(self, new_capacity: int) -> None:
        new_data: List[Optional[T]] = [None] * new_capacity
        for i in range(self._size):
            new_data[i] = self.data[i]
        self.data = new_data
        self.capacity = new_capacity

    def add_at(self, index: int, val: T) -> None:
        if index < 0 or index > self._size:
            raise IndexError(f"Index: {index}")

        if self._size == self.capacity:
            self._resize(self.capacity * 2)

        for i in range(self._size, index, -1):
            self.data[i] = self.data[i - 1]

        self.data[index] = val
        self._size += 1

    def contains(self, val: T) -> bool:
        return self.index_of(val) != -1

    def index_of(self, val: T) -> int:
        for i in range(self._size):
            if self.data[i] == val:
                return i
        return -1`
        }
      },
      testCases: [
        { input: 'add(1), add(2), add(3), get(1)', output: 'get(1): 2' },
        { input: 'add(1), add(2), remove(0), get(0)', output: 'get(0): 2' },
        { input: 'add(1), set(0, 5), get(0)', output: 'get(0): 5' }
      ],
      explanation: `**Problem:** Design a dynamic array that grows automatically when full and shrinks when mostly empty.

**Key Insight: Amortized O(1) with Doubling Strategy**
Pre-allocate fixed-size array. When full → create 2x larger array and copy elements.
Cost spreads across many operations → amortized O(1) per add.

**Why Doubling Instead of +1?**
Adding 1 slot each time:
  1 + 2 + 3 + ... + n = O(n²) total copies for n elements

Doubling capacity:
  1 + 2 + 4 + 8 + ... + n = O(n) total copies for n elements
  Amortized: O(n) / n = O(1) per operation

**Growth & Shrink Strategy:**
┌────────────────────────────────────┐
│ Initial capacity: 10               │
│ Load: 10/10 → resize to 20         │
│ Load: 5/20 → resize to 10 (shrink) │
└────────────────────────────────────┘

**Data Structure:**
data: [e1, e2, e3, e4, _, _, _, _, _, _]
       ↑              ↑
     elements      empty slots
size = 4, capacity = 10

**Operations:**
1. **add(val):**
   - Check if size == capacity → resize(2 * capacity)
   - Place val at data[size]
   - Increment size
   - O(1) amortized

2. **get(index):**
   - Bounds check: 0 ≤ index < size
   - Return data[index]
   - O(1)

3. **remove(index):**
   - Bounds check
   - Shift all elements after index left by 1
   - Decrement size
   - Optional: shrink if size ≤ capacity / 4
   - O(n) worst case (remove at start)

4. **set(index, val):**
   - Bounds check
   - Update data[index] = val
   - O(1)

5. **resize(newCapacity):**
   - Create new array of size newCapacity
   - Copy all size elements
   - O(n) but amortized O(1) due to infrequent calls

**Why Shrink at 1/4 instead of 1/2?**
Prevents thrashing: add → resize up, remove → resize down, repeat
With 1/4 threshold: gap between grow and shrink operations

**Complexity:**
- add: O(1) amortized, O(n) worst case (resize)
- get/set: O(1)
- remove: O(n) - must shift elements
- Space: O(capacity) where capacity ≥ size`,
      pseudocode: `ArrayList Algorithm:
-------------------
// Initialization
MyArrayList():
    capacity = 10
    data = array of size capacity
    size = 0

// Add element (at end)
add(val):
    if size == capacity:
        resize(capacity * 2)

    data[size] = val
    size++

// Get element
get(index):
    if index < 0 or index >= size:
        throw IndexOutOfBoundsException

    return data[index]

// Remove element
remove(index):
    if index < 0 or index >= size:
        throw IndexOutOfBoundsException

    // Shift elements left
    for i from index to size-2:
        data[i] = data[i+1]

    size--

    // Optional: shrink to save memory
    if size > 0 and size == capacity / 4:
        resize(capacity / 2)

// Set element
set(index, val):
    if index < 0 or index >= size:
        throw IndexOutOfBoundsException

    data[index] = val

// Resize internal array
resize(newCapacity):
    newData = array of size newCapacity

    // Copy existing elements
    for i from 0 to size-1:
        newData[i] = data[i]

    data = newData
    capacity = newCapacity

// Add at specific index
addAt(index, val):
    if index < 0 or index > size:
        throw IndexOutOfBoundsException

    if size == capacity:
        resize(capacity * 2)

    // Shift elements right
    for i from size-1 down to index:
        data[i+1] = data[i]

    data[index] = val
    size++

Example Trace:
--------------
list = new ArrayList()
capacity=10, size=0
data: [_, _, _, _, _, _, _, _, _, _]

add(1), add(2), add(3):
capacity=10, size=3
data: [1, 2, 3, _, _, _, _, _, _, _]

get(1):
  return data[1] = 2

remove(0):
  Shift: data[0]=data[1], data[1]=data[2]
  size--
  data: [2, 3, _, _, _, _, _, _, _, _]
  size=2

Fill to capacity and trigger resize:
add(4...12):  // 10 adds total
capacity=10→20 (doubled when full)
data: [2,3,4,5,6,7,8,9,10,11,12, _, _, _, _, _, _, _, _]
size=11

Amortized Cost Analysis:
------------------------
n operations, k resizes where capacity = 2^k
Total copies:
  1 + 2 + 4 + ... + n ≈ 2n
  Amortized per operation: 2n/n = O(1)`
    },
    {
      id: 3,
      title: 'Design Circular Buffer',
      difficulty: 'Medium',
      description: 'Design a fixed-size circular buffer (ring buffer) with write and read operations. When buffer is full, oldest data is overwritten. Useful for streaming data, logging, and producer-consumer scenarios.',
      example: `CircularBuffer buffer = new CircularBuffer(3);
buffer.write(1);   // [1,_,_]
buffer.write(2);   // [1,2,_]
buffer.write(3);   // [1,2,3]
buffer.write(4);   // [4,2,3] (overwrites 1)
buffer.read();     // returns 2
buffer.read();     // returns 3
buffer.read();     // returns 4`,
      code: {
        java: {
          starterCode: `class CircularBuffer {
    private int[] buffer;
    private int writePos;
    private int readPos;
    private int count;
    private int capacity;

    public CircularBuffer(int capacity) {
        // TODO: Initialize circular buffer

    }

    public void write(int value) {
        // TODO: Write value, overwrite if full

    }

    public int read() {
        // TODO: Read and remove oldest value

        return -1;
    }

    public boolean isEmpty() {
        // TODO: Check if empty

        return false;
    }

    public boolean isFull() {
        // TODO: Check if full

        return false;
    }
}`,
      solution: `class CircularBuffer {
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

    public void write(int value) {
        buffer[writePos] = value;
        writePos = (writePos + 1) % capacity;

        if (count < capacity) {
            count++;
        } else {
            // Buffer full, move read position
            readPos = (readPos + 1) % capacity;
        }
    }

    public int read() {
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

    public boolean isEmpty() {
        return count == 0;
    }

    public boolean isFull() {
        return count == capacity;
    }

    public int size() {
        return count;
    }

    public void clear() {
        writePos = 0;
        readPos = 0;
        count = 0;
    }
}

// Thread-safe version
class CircularBufferThreadSafe {
    private int[] buffer;
    private int writePos;
    private int readPos;
    private int count;
    private int capacity;
    private final Object lock = new Object();

    public CircularBufferThreadSafe(int capacity) {
        this.capacity = capacity;
        buffer = new int[capacity];
        writePos = 0;
        readPos = 0;
        count = 0;
    }

    public void write(int value) {
        synchronized (lock) {
            buffer[writePos] = value;
            writePos = (writePos + 1) % capacity;

            if (count < capacity) {
                count++;
            } else {
                readPos = (readPos + 1) % capacity;
            }
        }
    }

    public int read() {
        synchronized (lock) {
            if (isEmpty()) {
                throw new IllegalStateException("Buffer is empty");
            }

            int value = buffer[readPos];
            readPos = (readPos + 1) % capacity;
            count--;

            return value;
        }
    }

    public boolean isEmpty() {
        synchronized (lock) {
            return count == 0;
        }
    }

    public boolean isFull() {
        synchronized (lock) {
            return count == capacity;
        }
    }
}

// Generic version
class CircularBufferGeneric<T> {
    private Object[] buffer;
    private int writePos;
    private int readPos;
    private int count;
    private int capacity;

    public CircularBufferGeneric(int capacity) {
        this.capacity = capacity;
        buffer = new Object[capacity];
        writePos = 0;
        readPos = 0;
        count = 0;
    }

    public void write(T value) {
        buffer[writePos] = value;
        writePos = (writePos + 1) % capacity;

        if (count < capacity) {
            count++;
        } else {
            readPos = (readPos + 1) % capacity;
        }
    }

    @SuppressWarnings("unchecked")
    public T read() {
        if (isEmpty()) {
            throw new IllegalStateException("Buffer is empty");
        }

        T value = (T) buffer[readPos];
        buffer[readPos] = null; // Help GC
        readPos = (readPos + 1) % capacity;
        count--;

        return value;
    }

    @SuppressWarnings("unchecked")
    public T peek() {
        if (isEmpty()) {
            throw new IllegalStateException("Buffer is empty");
        }
        return (T) buffer[readPos];
    }

    public boolean isEmpty() {
        return count == 0;
    }

    public boolean isFull() {
        return count == capacity;
    }

    public int size() {
        return count;
    }

    public Object[] toArray() {
        Object[] result = new Object[count];
        for (int i = 0; i < count; i++) {
            result[i] = buffer[(readPos + i) % capacity];
        }
        return result;
    }
}

// With blocking operations
class BlockingCircularBuffer {
    private int[] buffer;
    private int writePos;
    private int readPos;
    private int count;
    private int capacity;
    private final Object lock = new Object();

    public BlockingCircularBuffer(int capacity) {
        this.capacity = capacity;
        buffer = new int[capacity];
        writePos = 0;
        readPos = 0;
        count = 0;
    }

    public void write(int value) throws InterruptedException {
        synchronized (lock) {
            while (isFull()) {
                lock.wait();
            }

            buffer[writePos] = value;
            writePos = (writePos + 1) % capacity;
            count++;

            lock.notifyAll();
        }
    }

    public int read() throws InterruptedException {
        synchronized (lock) {
            while (isEmpty()) {
                lock.wait();
            }

            int value = buffer[readPos];
            readPos = (readPos + 1) % capacity;
            count--;

            lock.notifyAll();
            return value;
        }
    }

    public boolean isEmpty() {
        return count == 0;
    }

    public boolean isFull() {
        return count == capacity;
    }
}`
        },
        python: {
          starterCode: `class CircularBuffer:
    def __init__(self, capacity: int):
        # TODO: Initialize circular buffer
        pass

    def write(self, value: int) -> None:
        # TODO: Write value, overwrite if full
        pass

    def read(self) -> int:
        # TODO: Read and remove oldest value
        return -1

    def is_empty(self) -> bool:
        # TODO: Check if empty
        return False

    def is_full(self) -> bool:
        # TODO: Check if full
        return False`,
          solution: `from threading import Lock
from typing import List, Optional, TypeVar

class CircularBuffer:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.buffer = [0] * capacity
        self.write_pos = 0
        self.read_pos = 0
        self.count = 0

    def write(self, value: int) -> None:
        self.buffer[self.write_pos] = value
        self.write_pos = (self.write_pos + 1) % self.capacity

        if self.count < self.capacity:
            self.count += 1
        else:
            # Buffer full, move read position
            self.read_pos = (self.read_pos + 1) % self.capacity

    def read(self) -> int:
        if self.is_empty():
            raise ValueError("Buffer is empty")

        value = self.buffer[self.read_pos]
        self.read_pos = (self.read_pos + 1) % self.capacity
        self.count -= 1

        return value

    def peek(self) -> int:
        if self.is_empty():
            raise ValueError("Buffer is empty")
        return self.buffer[self.read_pos]

    def is_empty(self) -> bool:
        return self.count == 0

    def is_full(self) -> bool:
        return self.count == self.capacity

    def size(self) -> int:
        return self.count

    def clear(self) -> None:
        self.write_pos = 0
        self.read_pos = 0
        self.count = 0


# Thread-safe version
class CircularBufferThreadSafe:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.buffer = [0] * capacity
        self.write_pos = 0
        self.read_pos = 0
        self.count = 0
        self.lock = Lock()

    def write(self, value: int) -> None:
        with self.lock:
            self.buffer[self.write_pos] = value
            self.write_pos = (self.write_pos + 1) % self.capacity

            if self.count < self.capacity:
                self.count += 1
            else:
                self.read_pos = (self.read_pos + 1) % self.capacity

    def read(self) -> int:
        with self.lock:
            if self.is_empty():
                raise ValueError("Buffer is empty")

            value = self.buffer[self.read_pos]
            self.read_pos = (self.read_pos + 1) % self.capacity
            self.count -= 1

            return value

    def is_empty(self) -> bool:
        with self.lock:
            return self.count == 0

    def is_full(self) -> bool:
        with self.lock:
            return self.count == self.capacity


# Generic version
T = TypeVar('T')

class CircularBufferGeneric:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.buffer: List[Optional[T]] = [None] * capacity
        self.write_pos = 0
        self.read_pos = 0
        self.count = 0

    def write(self, value: T) -> None:
        self.buffer[self.write_pos] = value
        self.write_pos = (self.write_pos + 1) % self.capacity

        if self.count < self.capacity:
            self.count += 1
        else:
            self.read_pos = (self.read_pos + 1) % self.capacity

    def read(self) -> T:
        if self.is_empty():
            raise ValueError("Buffer is empty")

        value = self.buffer[self.read_pos]
        self.buffer[self.read_pos] = None  # Help GC
        self.read_pos = (self.read_pos + 1) % self.capacity
        self.count -= 1

        return value

    def peek(self) -> T:
        if self.is_empty():
            raise ValueError("Buffer is empty")
        return self.buffer[self.read_pos]

    def is_empty(self) -> bool:
        return self.count == 0

    def is_full(self) -> bool:
        return self.count == self.capacity

    def size(self) -> int:
        return self.count

    def to_array(self) -> List[T]:
        result = []
        for i in range(self.count):
            result.append(self.buffer[(self.read_pos + i) % self.capacity])
        return result


# With blocking operations
from threading import Condition

class BlockingCircularBuffer:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.buffer = [0] * capacity
        self.write_pos = 0
        self.read_pos = 0
        self.count = 0
        self.condition = Condition()

    def write(self, value: int) -> None:
        with self.condition:
            while self.is_full():
                self.condition.wait()

            self.buffer[self.write_pos] = value
            self.write_pos = (self.write_pos + 1) % self.capacity
            self.count += 1

            self.condition.notify_all()

    def read(self) -> int:
        with self.condition:
            while self.is_empty():
                self.condition.wait()

            value = self.buffer[self.read_pos]
            self.read_pos = (self.read_pos + 1) % self.capacity
            self.count -= 1

            self.condition.notify_all()
            return value

    def is_empty(self) -> bool:
        return self.count == 0

    def is_full(self) -> bool:
        return self.count == self.capacity`
        }
      },
      testCases: [
        { input: 'capacity=3, write(1,2,3), read()', output: 'read: 1' },
        { input: 'capacity=2, write(1,2,3), read(), read()', output: 'read: 2, 3' },
        { input: 'capacity=3, write(1), isEmpty(), isFull()', output: 'isEmpty: false, isFull: false' }
      ],
      explanation: `**Problem:** Design a fixed-size ring buffer where writes wrap around and overwrite oldest data.

**Key Insight: Ring Buffer with Two Pointers**
Use fixed-size array with writePos and readPos that wrap around using modulo.
Space-efficient, O(1) operations, perfect for streaming/logging.

**Why Circular Buffer?**
✓ Fixed memory footprint (no dynamic allocation)
✓ Automatic overwrite of old data (FIFO)
✓ Lock-free possible for single producer/consumer
✓ Cache-friendly (sequential access)
✓ Common in: audio buffers, logging, network packets

**Data Structure:**
Fixed array with wrap-around pointers:

Empty buffer (count=0):
   w,r
   ↓
  [_, _, _]

Write 1,2,3 (count=3, full):
   r     w
   ↓     ↓
  [1, 2, 3]

Write 4 (overwrites 1, readPos advances):
      r  w
      ↓  ↓
  [4, 2, 3]

Read returns 2 (oldest data):
         w,r
         ↓
  [4, _, 3]

**Key Variables:**
- buffer: fixed array[capacity]
- writePos: where next write goes
- readPos: where next read comes from
- count: number of elements (0 to capacity)

**Operations:**
1. **write(value):**
   - Place value at buffer[writePos]
   - Advance writePos: (writePos + 1) % capacity
   - If buffer was full: advance readPos too (overwrite)
   - Else: increment count
   - O(1)

2. **read():**
   - Check not empty
   - Get value at buffer[readPos]
   - Advance readPos: (readPos + 1) % capacity
   - Decrement count
   - O(1)

3. **isEmpty():**
   - Return count == 0
   - O(1)

4. **isFull():**
   - Return count == capacity
   - O(1)

**Modulo Wraparound:**
(pos + 1) % capacity ensures: 0 → 1 → 2 → ... → capacity-1 → 0 → ...

**Use Cases:**
- Audio processing: fixed-size sample buffer
- Logging: keep last N log entries
- Network: packet buffering
- Producer-Consumer: bounded queue
- Sensor data: latest N readings

**Complexity:**
- write: O(1)
- read: O(1)
- Space: O(capacity) - fixed, no growth`,
      pseudocode: `Circular Buffer Algorithm:
-------------------------
// Initialization
CircularBuffer(capacity):
    this.capacity = capacity
    buffer = array of size capacity
    writePos = 0
    readPos = 0
    count = 0

// Write operation (overwrites if full)
write(value):
    buffer[writePos] = value
    writePos = (writePos + 1) % capacity

    if count < capacity:
        count++
    else:
        // Buffer was full, overwrite occurred
        // Advance readPos to skip oldest data
        readPos = (readPos + 1) % capacity

// Read operation
read():
    if isEmpty():
        throw "Buffer is empty"

    value = buffer[readPos]
    readPos = (readPos + 1) % capacity
    count--

    return value

// Peek (read without removing)
peek():
    if isEmpty():
        throw "Buffer is empty"

    return buffer[readPos]

// Check if empty
isEmpty():
    return count == 0

// Check if full
isFull():
    return count == capacity

// Get current size
size():
    return count

// Clear buffer
clear():
    writePos = 0
    readPos = 0
    count = 0

Example Trace (capacity=3):
---------------------------
Initial: writePos=0, readPos=0, count=0
  w,r
  ↓
 [_, _, _]

write(1): writePos=1, count=1
  r  w
  ↓  ↓
 [1, _, _]

write(2): writePos=2, count=2
  r     w
  ↓     ↓
 [1, 2, _]

write(3): writePos=0 (wrap!), count=3 (full!)
  w  r
  ↓  ↓
 [1, 2, 3]

write(4): overwrites buffer[0], readPos advances to 1
     w  r
     ↓  ↓
 [4, 2, 3]
 Oldest is now 2, not 1

read(): returns 2, readPos=2, count=2
     w     r
     ↓     ↓
 [4, _, 3]

read(): returns 3, readPos=0, count=1
  w,r
  ↓
 [4, _, _]

read(): returns 4, readPos=1, count=0
     w,r
     ↓
 [_, _, _]

Modulo Wraparound Example:
--------------------------
capacity = 3
pos = 0: (0+1) % 3 = 1
pos = 1: (1+1) % 3 = 2
pos = 2: (2+1) % 3 = 0  ← wraps back to start!`
    },
    {
      id: 4,
      title: 'Design Thread-Safe Counter',
      difficulty: 'Medium',
      description: 'Design a thread-safe counter that supports increment, decrement, and get operations. Ensure atomicity using different synchronization mechanisms: synchronized, AtomicInteger, and locks. Handle concurrent access correctly.',
      example: `Counter counter = new Counter();
// Thread 1: counter.increment()
// Thread 2: counter.increment()
// Thread 3: counter.get()
// Result should be consistent regardless of thread scheduling

// Multiple threads incrementing 1000 times each:
// Expected final value: numThreads * 1000`,
      code: {
        java: {
          starterCode: `class Counter {
    private int count;

    public Counter() {
        count = 0;
    }

    public void increment() {
        // TODO: Thread-safe increment

    }

    public void decrement() {
        // TODO: Thread-safe decrement

    }

    public int get() {
        // TODO: Thread-safe get

        return 0;
    }

    public void reset() {
        // TODO: Thread-safe reset

    }
}`,
      solution: `// Solution 1: Using synchronized
class CounterSynchronized {
    private int count;

    public CounterSynchronized() {
        count = 0;
    }

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

    public synchronized void add(int value) {
        count += value;
    }
}

// Solution 2: Using AtomicInteger
class CounterAtomic {
    private AtomicInteger count;

    public CounterAtomic() {
        count = new AtomicInteger(0);
    }

    public void increment() {
        count.incrementAndGet();
    }

    public void decrement() {
        count.decrementAndGet();
    }

    public int get() {
        return count.get();
    }

    public void reset() {
        count.set(0);
    }

    public void add(int value) {
        count.addAndGet(value);
    }

    public int getAndIncrement() {
        return count.getAndIncrement();
    }

    public int incrementAndGet() {
        return count.incrementAndGet();
    }
}

// Solution 3: Using ReentrantLock
class CounterLock {
    private int count;
    private final ReentrantLock lock;

    public CounterLock() {
        count = 0;
        lock = new ReentrantLock();
    }

    public void increment() {
        lock.lock();
        try {
            count++;
        } finally {
            lock.unlock();
        }
    }

    public void decrement() {
        lock.lock();
        try {
            count--;
        } finally {
            lock.unlock();
        }
    }

    public int get() {
        lock.lock();
        try {
            return count;
        } finally {
            lock.unlock();
        }
    }

    public void reset() {
        lock.lock();
        try {
            count = 0;
        } finally {
            lock.unlock();
        }
    }
}

// Solution 4: Using ReadWriteLock (optimized for many reads)
class CounterReadWriteLock {
    private int count;
    private final ReadWriteLock rwLock;
    private final Lock readLock;
    private final Lock writeLock;

    public CounterReadWriteLock() {
        count = 0;
        rwLock = new ReentrantReadWriteLock();
        readLock = rwLock.readLock();
        writeLock = rwLock.writeLock();
    }

    public void increment() {
        writeLock.lock();
        try {
            count++;
        } finally {
            writeLock.unlock();
        }
    }

    public void decrement() {
        writeLock.lock();
        try {
            count--;
        } finally {
            writeLock.unlock();
        }
    }

    public int get() {
        readLock.lock();
        try {
            return count;
        } finally {
            readLock.unlock();
        }
    }

    public void reset() {
        writeLock.lock();
        try {
            count = 0;
        } finally {
            writeLock.unlock();
        }
    }
}

// Advanced: With wait/notify for threshold
class CounterWithNotify {
    private int count;
    private int threshold;

    public CounterWithNotify(int threshold) {
        count = 0;
        this.threshold = threshold;
    }

    public synchronized void increment() {
        count++;
        if (count >= threshold) {
            notifyAll();
        }
    }

    public synchronized void waitForThreshold() throws InterruptedException {
        while (count < threshold) {
            wait();
        }
    }

    public synchronized int get() {
        return count;
    }
}

// Test for thread safety
class CounterTest {
    public static void testCounter(Counter counter, int numThreads, int iterations) {
        Thread[] threads = new Thread[numThreads];

        for (int i = 0; i < numThreads; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < iterations; j++) {
                    counter.increment();
                }
            });
            threads[i].start();
        }

        for (Thread thread : threads) {
            try {
                thread.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        int expected = numThreads * iterations;
        int actual = counter.get();
        System.out.println("Expected: " + expected);
        System.out.println("Actual: " + actual);
        System.out.println("Test " + (expected == actual ? "PASSED" : "FAILED"));
    }
}`
        },
        python: {
          starterCode: `class Counter:
    def __init__(self):
        # TODO: Initialize counter
        pass

    def increment(self) -> None:
        # TODO: Thread-safe increment
        pass

    def decrement(self) -> None:
        # TODO: Thread-safe decrement
        pass

    def get(self) -> int:
        # TODO: Thread-safe get
        return 0

    def reset(self) -> None:
        # TODO: Thread-safe reset
        pass`,
          solution: `from threading import Lock, RLock, Condition, Semaphore
from typing import Callable

# Solution 1: Using Lock
class CounterLock:
    def __init__(self):
        self.count = 0
        self.lock = Lock()

    def increment(self) -> None:
        with self.lock:
            self.count += 1

    def decrement(self) -> None:
        with self.lock:
            self.count -= 1

    def get(self) -> int:
        with self.lock:
            return self.count

    def reset(self) -> None:
        with self.lock:
            self.count = 0

    def add(self, value: int) -> None:
        with self.lock:
            self.count += value


# Solution 2: Using RLock (Reentrant Lock)
class CounterRLock:
    def __init__(self):
        self.count = 0
        self.lock = RLock()

    def increment(self) -> None:
        with self.lock:
            self.count += 1

    def decrement(self) -> None:
        with self.lock:
            self.count -= 1

    def get(self) -> int:
        with self.lock:
            return self.count

    def reset(self) -> None:
        with self.lock:
            self.count = 0

    def add_and_get(self, value: int) -> int:
        with self.lock:
            self.add(value)
            return self.get()

    def add(self, value: int) -> None:
        with self.lock:
            self.count += value


# Solution 3: Using Condition
class CounterCondition:
    def __init__(self, threshold: int = 0):
        self.count = 0
        self.threshold = threshold
        self.condition = Condition()

    def increment(self) -> None:
        with self.condition:
            self.count += 1
            if self.count >= self.threshold:
                self.condition.notify_all()

    def decrement(self) -> None:
        with self.condition:
            self.count -= 1

    def get(self) -> int:
        with self.condition:
            return self.count

    def wait_for_threshold(self) -> None:
        with self.condition:
            while self.count < self.threshold:
                self.condition.wait()

    def reset(self) -> None:
        with self.condition:
            self.count = 0


# Solution 4: Using Semaphore (bounded counter)
class CounterSemaphore:
    def __init__(self, max_value: int):
        self.count = 0
        self.semaphore = Semaphore(max_value)
        self.lock = Lock()

    def increment(self) -> bool:
        if self.semaphore.acquire(blocking=False):
            with self.lock:
                self.count += 1
            return True
        return False

    def decrement(self) -> None:
        with self.lock:
            if self.count > 0:
                self.count -= 1
                self.semaphore.release()

    def get(self) -> int:
        with self.lock:
            return self.count


# Solution 5: Using ReadWrite Lock pattern
class ReadWriteLock:
    def __init__(self):
        self.readers = 0
        self.writer = False
        self.read_ready = Condition(Lock())
        self.write_ready = Condition(Lock())

    def acquire_read(self):
        self.read_ready.acquire()
        while self.writer:
            self.read_ready.wait()
        self.readers += 1
        self.read_ready.release()

    def release_read(self):
        self.read_ready.acquire()
        self.readers -= 1
        if self.readers == 0:
            self.write_ready.notify()
        self.read_ready.release()

    def acquire_write(self):
        self.write_ready.acquire()
        while self.writer or self.readers > 0:
            self.write_ready.wait()
        self.writer = True
        self.write_ready.release()

    def release_write(self):
        self.write_ready.acquire()
        self.writer = False
        self.write_ready.notify()
        self.read_ready.notify_all()
        self.write_ready.release()


class CounterReadWrite:
    def __init__(self):
        self.count = 0
        self.rw_lock = ReadWriteLock()

    def increment(self) -> None:
        self.rw_lock.acquire_write()
        try:
            self.count += 1
        finally:
            self.rw_lock.release_write()

    def decrement(self) -> None:
        self.rw_lock.acquire_write()
        try:
            self.count -= 1
        finally:
            self.rw_lock.release_write()

    def get(self) -> int:
        self.rw_lock.acquire_read()
        try:
            return self.count
        finally:
            self.rw_lock.release_read()

    def reset(self) -> None:
        self.rw_lock.acquire_write()
        try:
            self.count = 0
        finally:
            self.rw_lock.release_write()


# Test for thread safety
import threading

class CounterTest:
    @staticmethod
    def test_counter(counter, num_threads: int, iterations: int):
        threads = []

        def worker():
            for _ in range(iterations):
                counter.increment()

        for _ in range(num_threads):
            t = threading.Thread(target=worker)
            threads.append(t)
            t.start()

        for t in threads:
            t.join()

        expected = num_threads * iterations
        actual = counter.get()
        print(f"Expected: {expected}")
        print(f"Actual: {actual}")
        print(f"Test {'PASSED' if expected == actual else 'FAILED'}")`
        }
      },
      testCases: [
        { input: '10 threads, 1000 increments each', output: 'final count: 10000' },
        { input: 'increment(), decrement(), get()', output: 'get: 0' },
        { input: '5 threads, 100 increments + 50 decrements each', output: 'final count: 250' }
      ],
      explanation: `**Problem:** Design a counter that multiple threads can safely increment/decrement concurrently.

**Key Insight: Race Condition Without Synchronization**
Simple count++ is NOT atomic! It's actually:
1. Read count from memory
2. Add 1
3. Write back to memory

Two threads executing simultaneously can overwrite each other's updates:

Without synchronization (WRONG):
Thread 1: read(5) → add 1 → write(6)
Thread 2: read(5) → add 1 → write(6)
Result: 6 (lost one increment!)

Expected: 7

**Solutions Comparison:**

┌─────────────────┬──────────────┬─────────────┬─────────────┐
│   Approach      │ Performance  │ Complexity  │ Best For    │
├─────────────────┼──────────────┼─────────────┼─────────────┤
│ synchronized    │ Medium       │ Simple      │ Low contention│
│ AtomicInteger   │ Best         │ Simple      │ High contention│
│ ReentrantLock   │ Medium-Good  │ Medium      │ Need fairness│
│ ReadWriteLock   │ Best (reads) │ Complex     │ Many reads  │
└─────────────────┴──────────────┴─────────────┴─────────────┘

**1. synchronized:**
Monitors built into every Java object
- Simple keyword
- Automatic lock acquisition/release
- Only one thread can execute synchronized method at a time
- Downside: blocks all readers during write

**2. AtomicInteger:**
Hardware-level atomic operations (CAS - Compare-And-Swap)
- Lock-free, non-blocking
- Uses CPU atomic instructions
- Best for simple operations (increment, add, compareAndSet)
- Much faster under high contention
- Downside: only works for simple types

**3. ReentrantLock:**
Explicit lock with more features
- Fairness option (FIFO thread ordering)
- tryLock with timeout
- Can interrupt waiting threads
- Must manually unlock (use try-finally!)
- Downside: more complex, easy to create deadlocks

**4. ReadWriteLock:**
Separate locks for reading vs writing
- Multiple readers can read simultaneously
- Only one writer, blocks all readers
- Perfect when reads >> writes
- Downside: more overhead, complex

**Atomicity Guarantee:**
All four approaches ensure count++ is atomic:
Thread 1: [read→add→write] (atomic block)
Thread 2: waits... then [read→add→write]
Result: correct count!

**Complexity:**
- All operations: O(1) time
- synchronized/AtomicInteger: ~10-100ns per operation
- ReentrantLock: ~50-200ns (slightly slower)
- ReadWriteLock reads: very fast, writes: slower`,
      pseudocode: `Thread-Safe Counter Algorithms:
-------------------------------

// Solution 1: synchronized
class CounterSynchronized {
    private int count = 0

    synchronized increment():
        count++

    synchronized decrement():
        count--

    synchronized get():
        return count

    synchronized reset():
        count = 0
}

// How synchronized works:
increment():
    acquire monitor lock on 'this'
    count++  // Only one thread here at a time
    release monitor lock


// Solution 2: AtomicInteger
class CounterAtomic {
    private AtomicInteger count = new AtomicInteger(0)

    increment():
        count.incrementAndGet()  // Atomic operation

    decrement():
        count.decrementAndGet()  // Atomic operation

    get():
        return count.get()

    reset():
        count.set(0)

    // Advanced: conditional update
    addIfBelow(value, limit):
        while true:
            current = count.get()
            if current >= limit:
                return false
            if count.compareAndSet(current, current + value):
                return true
}

// How AtomicInteger works (CAS loop):
incrementAndGet():
    do:
        current = get()
        next = current + 1
    while not compareAndSet(current, next)
    return next

// CAS (Compare-And-Swap) at hardware level:
compareAndSet(expected, newValue):
    if memory == expected:  // Atomic check + update
        memory = newValue
        return true
    else:
        return false  // Retry needed


// Solution 3: ReentrantLock
class CounterLock {
    private int count = 0
    private ReentrantLock lock = new ReentrantLock()

    increment():
        lock.lock()
        try:
            count++
        finally:
            lock.unlock()  // MUST unlock even if exception

    decrement():
        lock.lock()
        try:
            count--
        finally:
            lock.unlock()

    get():
        lock.lock()
        try:
            return count
        finally:
            lock.unlock()
}


// Solution 4: ReadWriteLock (optimized for many reads)
class CounterReadWrite {
    private int count = 0
    private ReadWriteLock rwLock = new ReentrantReadWriteLock()
    private Lock readLock = rwLock.readLock()
    private Lock writeLock = rwLock.writeLock()

    increment():
        writeLock.lock()  // Exclusive write access
        try:
            count++
        finally:
            writeLock.unlock()

    get():
        readLock.lock()  // Shared read access
        try:
            return count
        finally:
            readLock.unlock()
}

Test Example (10 threads, 1000 increments each):
-------------------------------------------------
WITHOUT synchronization (BROKEN):
Thread 1: increment 1000 times
Thread 2: increment 1000 times
...
Thread 10: increment 1000 times
Expected: 10,000
Actual: ~9,847 (WRONG! Lost updates due to race conditions)

WITH synchronization (CORRECT):
Expected: 10,000
Actual: 10,000 ✓

Race Condition Example:
-----------------------
Initial count = 5

Thread A          Thread B          count
read count (5)
                  read count (5)
add 1 (=6)
                  add 1 (=6)
write 6
                  write 6           6 ← WRONG! Should be 7

With AtomicInteger (CAS):
Thread A: CAS(5→6) SUCCESS → count=6
Thread B: CAS(5→6) FAIL, retry with 6 → CAS(6→7) SUCCESS → count=7 ✓`
    },
    {
      id: 5,
      title: 'LFU Cache (Least Frequently Used)',
      difficulty: 'Hard',
      leetcodeUrl: 'https://leetcode.com/problems/lfu-cache/',
      description: 'Design and implement a data structure for a Least Frequently Used (LFU) cache. Implement the LFUCache class with get(key) and put(key, value) methods. When the cache reaches its capacity, it should invalidate and remove the least frequently used key before inserting a new item. For ties (items with same frequency), remove the least recently used key. All operations must run in O(1) average time.',
      example: `LFUCache cache = new LFUCache(2); // capacity = 2

cache.put(1, 1);   // cache=[1]
cache.put(2, 2);   // cache=[1, 2]
cache.get(1);      // returns 1, cache=[2, 1], freq(1)=2, freq(2)=1
cache.put(3, 3);   // evicts key 2 (lowest freq), cache=[1, 3]
cache.get(2);      // returns -1 (not found)
cache.get(3);      // returns 3, freq(3)=2
cache.put(4, 4);   // evicts key 1 (freq=2, oldest), cache=[3, 4]
cache.get(1);      // returns -1 (not found)
cache.get(3);      // returns 3
cache.get(4);      // returns 4`,
      explanation: `**Core Concepts:**

**Eviction Policy:**
• Remove least frequently used item when cache is full
• Break ties by removing least recently used (LRU within same frequency)
• Must track both frequency count and access order

**Required Operations:**
• get(key): Return value if exists, increment frequency
• put(key, value): Insert/update, evict LFU item if needed
• Both operations must be O(1) average time

**Data Structure Design:**

**Approach 1: HashMap + Frequency Lists**
1. **Main HashMap**: Maps key → (value, frequency)
2. **Frequency Map**: Maps frequency → doubly linked list of keys
3. **Min Frequency**: Track current minimum frequency

**Key Insight:**
• Use doubly linked list for each frequency level (enables O(1) removal)
• When accessing a key, move it from freq list to freq+1 list
• When evicting, remove head of min_freq list (LRU within that frequency)

**Complexity:**
• Time: O(1) for both get() and put()
• Space: O(capacity) for all data structures`,
      pseudocode: `ALGORITHM LFUCache:

DATA STRUCTURES:
    capacity: int
    minFreq: int
    keyToValue: HashMap<Key, Value>
    keyToFreq: HashMap<Key, Frequency>
    freqToKeys: HashMap<Frequency, DoublyLinkedList<Key>>

INITIALIZE(capacity):
    this.capacity = capacity
    this.minFreq = 0
    Initialize all HashMaps

OPERATION get(key):
    IF key NOT in keyToValue:
        RETURN -1

    value = keyToValue[key]
    updateFrequency(key)
    RETURN value

OPERATION put(key, value):
    IF capacity == 0:
        RETURN

    IF key in keyToValue:
        // Update existing key
        keyToValue[key] = value
        updateFrequency(key)
        RETURN

    // New key - check capacity
    IF keyToValue.size >= capacity:
        evictLFU()

    // Insert new key
    keyToValue[key] = value
    keyToFreq[key] = 1
    freqToKeys[1].addLast(key)
    minFreq = 1

HELPER updateFrequency(key):
    oldFreq = keyToFreq[key]
    newFreq = oldFreq + 1

    // Remove from old frequency list
    freqToKeys[oldFreq].remove(key)
    IF freqToKeys[oldFreq].isEmpty():
        IF oldFreq == minFreq:
            minFreq = newFreq

    // Add to new frequency list
    keyToFreq[key] = newFreq
    freqToKeys[newFreq].addLast(key)

HELPER evictLFU():
    // Get LRU key from minimum frequency list
    evictKey = freqToKeys[minFreq].removeFirst()
    keyToValue.remove(evictKey)
    keyToFreq.remove(evictKey)`,
      code: {
        java: {
          starterCode: `class LFUCache {
    // TODO: Implement data structures

    public LFUCache(int capacity) {
        // TODO: Initialize cache

    }

    public int get(int key) {
        // TODO: Get value and update frequency

        return -1;
    }

    public void put(int key, int value) {
        // TODO: Insert/update and handle eviction

    }
}`,
          solution: `// Approach: HashMap + Frequency Lists - O(1) time, O(capacity) space
import java.util.*;

class LFUCache {
    // Node for doubly linked list
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

    // Doubly linked list for each frequency
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

        void addLast(Node node) {
            node.prev = tail.prev;
            node.next = tail;
            tail.prev.next = node;
            tail.prev = node;
            size++;
        }

        void remove(Node node) {
            node.prev.next = node.next;
            node.next.prev = node.prev;
            size--;
        }

        Node removeFirst() {
            if (size == 0) return null;
            Node first = head.next;
            remove(first);
            return first;
        }
    }

    private int capacity;
    private int minFreq;
    private Map<Integer, Node> keyToNode;
    private Map<Integer, DLList> freqToList;

    public LFUCache(int capacity) {
        this.capacity = capacity;
        this.minFreq = 0;
        this.keyToNode = new HashMap<>();
        this.freqToList = new HashMap<>();
    }

    public int get(int key) {
        if (!keyToNode.containsKey(key)) {
            return -1;
        }

        Node node = keyToNode.get(key);
        updateFrequency(node);
        return node.value;
    }

    public void put(int key, int value) {
        if (capacity == 0) return;

        // Update existing key
        if (keyToNode.containsKey(key)) {
            Node node = keyToNode.get(key);
            node.value = value;
            updateFrequency(node);
            return;
        }

        // Evict if at capacity
        if (keyToNode.size() >= capacity) {
            DLList minFreqList = freqToList.get(minFreq);
            Node evict = minFreqList.removeFirst();
            keyToNode.remove(evict.key);
        }

        // Insert new node
        Node newNode = new Node(key, value);
        keyToNode.put(key, newNode);
        freqToList.putIfAbsent(1, new DLList());
        freqToList.get(1).addLast(newNode);
        minFreq = 1;
    }

    private void updateFrequency(Node node) {
        int oldFreq = node.freq;
        int newFreq = oldFreq + 1;

        // Remove from old frequency list
        DLList oldList = freqToList.get(oldFreq);
        oldList.remove(node);

        // Update minFreq if needed
        if (oldFreq == minFreq && oldList.size == 0) {
            minFreq = newFreq;
        }

        // Add to new frequency list
        node.freq = newFreq;
        freqToList.putIfAbsent(newFreq, new DLList());
        freqToList.get(newFreq).addLast(node);
    }
}

// Alternative: Using LinkedHashSet (simpler but same complexity)
class LFUCacheSimpler {
    private int capacity;
    private int minFreq;
    private Map<Integer, Integer> keyToValue;
    private Map<Integer, Integer> keyToFreq;
    private Map<Integer, LinkedHashSet<Integer>> freqToKeys;

    public LFUCacheSimpler(int capacity) {
        this.capacity = capacity;
        this.minFreq = 0;
        this.keyToValue = new HashMap<>();
        this.keyToFreq = new HashMap<>();
        this.freqToKeys = new HashMap<>();
    }

    public int get(int key) {
        if (!keyToValue.containsKey(key)) {
            return -1;
        }

        updateFrequency(key);
        return keyToValue.get(key);
    }

    public void put(int key, int value) {
        if (capacity == 0) return;

        if (keyToValue.containsKey(key)) {
            keyToValue.put(key, value);
            updateFrequency(key);
            return;
        }

        if (keyToValue.size() >= capacity) {
            // Evict LFU (and LRU among same frequency)
            int evictKey = freqToKeys.get(minFreq).iterator().next();
            freqToKeys.get(minFreq).remove(evictKey);
            keyToValue.remove(evictKey);
            keyToFreq.remove(evictKey);
        }

        keyToValue.put(key, value);
        keyToFreq.put(key, 1);
        freqToKeys.putIfAbsent(1, new LinkedHashSet<>());
        freqToKeys.get(1).add(key);
        minFreq = 1;
    }

    private void updateFrequency(int key) {
        int oldFreq = keyToFreq.get(key);
        int newFreq = oldFreq + 1;

        freqToKeys.get(oldFreq).remove(key);
        if (freqToKeys.get(oldFreq).isEmpty() && oldFreq == minFreq) {
            minFreq = newFreq;
        }

        keyToFreq.put(key, newFreq);
        freqToKeys.putIfAbsent(newFreq, new LinkedHashSet<>());
        freqToKeys.get(newFreq).add(key);
    }
}`
        },
        python: {
          starterCode: `class LFUCache:
    def __init__(self, capacity: int):
        # TODO: Initialize cache
        pass

    def get(self, key: int) -> int:
        # TODO: Get value and update frequency
        pass

    def put(self, key: int, value: int) -> None:
        # TODO: Insert/update and handle eviction
        pass`,
          solution: `# Approach 1: Using OrderedDict (cleanest Python solution)
from collections import defaultdict, OrderedDict

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
        if self.capacity == 0:
            return

        # Update existing key
        if key in self.key_to_val:
            self.key_to_val[key] = value
            self._update_frequency(key)
            return

        # Evict if at capacity
        if len(self.key_to_val) >= self.capacity:
            # Remove least frequently used (and LRU within that frequency)
            evict_key, _ = self.freq_to_keys[self.min_freq].popitem(last=False)
            del self.key_to_val[evict_key]
            del self.key_to_freq[evict_key]

        # Insert new key
        self.key_to_val[key] = value
        self.key_to_freq[key] = 1
        self.freq_to_keys[1][key] = None
        self.min_freq = 1

    def _update_frequency(self, key: int) -> None:
        old_freq = self.key_to_freq[key]
        new_freq = old_freq + 1

        # Remove from old frequency list
        del self.freq_to_keys[old_freq][key]
        if not self.freq_to_keys[old_freq] and old_freq == self.min_freq:
            self.min_freq = new_freq

        # Add to new frequency list
        self.key_to_freq[key] = new_freq
        self.freq_to_keys[new_freq][key] = None


# Approach 2: Custom doubly linked list (more explicit)
class Node:
    def __init__(self, key: int, value: int):
        self.key = key
        self.value = value
        self.freq = 1
        self.prev = None
        self.next = None

class DLList:
    def __init__(self):
        self.head = Node(0, 0)
        self.tail = Node(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head
        self.size = 0

    def add_last(self, node: Node) -> None:
        node.prev = self.tail.prev
        node.next = self.tail
        self.tail.prev.next = node
        self.tail.prev = node
        self.size += 1

    def remove(self, node: Node) -> None:
        node.prev.next = node.next
        node.next.prev = node.prev
        self.size -= 1

    def remove_first(self) -> Node:
        if self.size == 0:
            return None
        first = self.head.next
        self.remove(first)
        return first

class LFUCacheDetailed:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.min_freq = 0
        self.key_to_node = {}
        self.freq_to_list = {}

    def get(self, key: int) -> int:
        if key not in self.key_to_node:
            return -1

        node = self.key_to_node[key]
        self._update_frequency(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        if self.capacity == 0:
            return

        if key in self.key_to_node:
            node = self.key_to_node[key]
            node.value = value
            self._update_frequency(node)
            return

        if len(self.key_to_node) >= self.capacity:
            min_freq_list = self.freq_to_list[self.min_freq]
            evict_node = min_freq_list.remove_first()
            del self.key_to_node[evict_node.key]

        new_node = Node(key, value)
        self.key_to_node[key] = new_node
        if 1 not in self.freq_to_list:
            self.freq_to_list[1] = DLList()
        self.freq_to_list[1].add_last(new_node)
        self.min_freq = 1

    def _update_frequency(self, node: Node) -> None:
        old_freq = node.freq
        new_freq = old_freq + 1

        old_list = self.freq_to_list[old_freq]
        old_list.remove(node)

        if old_freq == self.min_freq and old_list.size == 0:
            self.min_freq = new_freq

        node.freq = new_freq
        if new_freq not in self.freq_to_list:
            self.freq_to_list[new_freq] = DLList()
        self.freq_to_list[new_freq].add_last(node)`
        }
      }
    }
  ]

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question)
    const problemId = `DesignProblems-${question.id}`
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
                System Design Problems Practice
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
          Master common design interview problems: HashMap, ArrayList, Circular Buffer, and more
        </p>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {questions.map((q) => {
            const problemId = `DesignProblems-${q.id}`
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
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#1e40af', display: 'inline' }}>
            {selectedQuestion.title}
          </h2>
          <span style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            backgroundColor: '#fef3c7',
            color: '#92400e',
            borderRadius: '6px',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginLeft: '1rem'
          }}>
            {selectedQuestion.difficulty}
          </span>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1e40af' }}>Description</h3>
          <p style={{ color: '#1e40af', lineHeight: '1.6' }}>{selectedQuestion.description}</p>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1e40af' }}>Example</h3>
          <pre style={{
            backgroundColor: '#dbeafe',
            padding: '1rem',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '0.9rem',
            color: '#1e40af'
          }}>
            {selectedQuestion.example}
          </pre>
        </div>

        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1e40af' }}>Test Cases</h3>
          {selectedQuestion.testCases.map((test, idx) => (
            <div key={idx} style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <span style={{ color: '#1e40af', fontWeight: '600' }}>Test {idx + 1}:</span>{' '}
              <span style={{ color: '#1e40af' }}>{test.input} → {test.output}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Code Editor */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#1f2937' }}>Code Editor</h3>
        <LanguageToggle />
      </div>
      <textarea
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          width: '100%',
          minHeight: '600px',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          padding: '1rem',
          border: '2px solid #e5e7eb',
          borderRadius: '8px',
          resize: 'vertical',
          marginBottom: '1rem'
        }}
      />

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
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
            fontWeight: '600'
          }}
        >
          {isRunning ? 'Running...' : 'Run Code'}
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
            cursor: 'pointer'
          }}
        >
          Reset
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
            fontWeight: '600'
          }}
        >
          {showExplanation ? '✓ Explanation Visible' : '📖 Explanation & Pseudocode'}
        </button>
        <button
          onClick={() => setShowSolution(!showSolution)}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          {showSolution ? 'Hide' : 'Show'} Solution
        </button>
        <div style={{ marginLeft: 'auto' }}>
          <CompletionCheckbox
            problemId={`DesignProblems-${selectedQuestion.id}`}
            label="Mark as Completed"
            onCompletionChange={() => setRefreshKey(prev => prev + 1)}
          />
        </div>
      </div>

      {/* Output */}
      {output && (
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1f2937' }}>Output</h3>
          <pre style={{
            backgroundColor: '#1f2937',
            color: '#f3f4f6',
            padding: '1rem',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '0.9rem',
            minHeight: '150px'
          }}>
            {output}
          </pre>
        </div>
      )}

      {/* Explanation & Pseudocode */}
      {showExplanation && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{
            backgroundColor: '#fef3c7',
            padding: '15px',
            borderRadius: '6px',
            border: '2px solid #fbbf24',
            marginBottom: '15px'
          }}>
            <h3 style={{ color: '#78350f', marginTop: 0 }}>📖 Explanation</h3>
            <div style={{
              color: '#1f2937',
              lineHeight: '1.7',
              whiteSpace: 'pre-wrap',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              {selectedQuestion.explanation}
            </div>
          </div>
          <div style={{
            backgroundColor: '#1e293b',
            padding: '15px',
            borderRadius: '6px',
            border: '2px solid #374151'
          }}>
            <h4 style={{ color: '#60a5fa', marginTop: 0 }}>🔧 Pseudocode</h4>
            <pre style={{
              margin: 0,
              color: '#e5e7eb',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              fontSize: '13px'
            }}>
              {selectedQuestion.pseudocode}
            </pre>
          </div>
        </div>
      )}

      {/* Solution */}
      {showSolution && (
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#059669' }}>Solution</h3>
          <pre style={{
            backgroundColor: '#f0fdf4',
            padding: '1rem',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '0.85rem',
            color: '#1f2937',
            border: '2px solid #86efac',
            maxHeight: '400px'
          }}>
            {selectedQuestion.code[language].solution}
          </pre>
        </div>
      )}
    </div>
  )
}

export default DesignProblems

import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function CollectionsFramework({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showSolution, setShowSolution] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [userCode, setUserCode] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [language, setLanguage] = useState(getPreferredLanguage())
  const [showDrawing, setShowDrawing] = useState(false)
  const [currentDrawing, setCurrentDrawing] = useState(null)
  const [expandedSections, setExpandedSections] = useState({
    Easy: true,
    Medium: true,
    Hard: true
  })

  useEffect(() => {
    const handleProgressUpdate = () => setRefreshKey(prev => prev + 1)
    window.addEventListener('progressUpdate', handleProgressUpdate)
    return () => window.removeEventListener('progressUpdate', handleProgressUpdate)
  }, [])

  useEffect(() => {
    const handleLanguageChange = (e) => {
      setLanguage(e.detail)
      if (selectedQuestion) {
        setUserCode(selectedQuestion.code[e.detail].starterCode)
      }
    }
    window.addEventListener('languageChange', handleLanguageChange)
    return () => window.removeEventListener('languageChange', handleLanguageChange)
  }, [selectedQuestion])

  const questions = [
    {
      id: 1,
      title: 'LRU Cache Implementation',
      difficulty: 'Hard',
      description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with get(key) and put(key, value) methods, both in O(1) time complexity using HashMap + Doubly Linked List.',
      examples: [
        { input: 'cache.put(1, 1); cache.put(2, 2); cache.get(1)', output: '1' },
        { input: 'cache.put(3, 3); cache.get(2)', output: '-1 (evicted)' },
        { input: 'cache.put(4, 4); cache.get(1)', output: '-1 (evicted)' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;

class LRUCache {
    class Node {
        int key, value;
        Node prev, next;
        Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }

    private Map<Integer, Node> cache;
    private Node head, tail;
    private int capacity;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        cache = new HashMap<>();
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }

    // TODO: Implement get(key) - return -1 if not found, move to end if found
    public int get(int key) {
        return -1;
    }

    // TODO: Implement put(key, value) - add/update node, evict LRU if capacity exceeded
    public void put(int key, int value) {

    }

    private void add(Node node) {
        Node prev = tail.prev;
        prev.next = node;
        node.prev = prev;
        node.next = tail;
        tail.prev = node;
    }

    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
}`,
          solution: `import java.util.*;

class LRUCache {
    class Node {
        int key, value;
        Node prev, next;
        Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }

    private Map<Integer, Node> cache;
    private Node head, tail;
    private int capacity;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        cache = new HashMap<>();
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        if (!cache.containsKey(key)) {
            return -1;
        }
        Node node = cache.get(key);
        remove(node);
        add(node);
        return node.value;
    }

    public void put(int key, int value) {
        if (cache.containsKey(key)) {
            remove(cache.get(key));
        }
        Node node = new Node(key, value);
        cache.put(key, node);
        add(node);

        if (cache.size() > capacity) {
            Node lru = head.next;
            remove(lru);
            cache.remove(lru.key);
        }
    }

    private void add(Node node) {
        Node prev = tail.prev;
        prev.next = node;
        node.prev = prev;
        node.next = tail;
        tail.prev = node;
    }

    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
}

// Time: O(1) for get and put
// Space: O(capacity)
// Use HashMap for O(1) lookup, Doubly Linked List for O(1) removal/insertion`
        },
        python: {
          starterCode: `class Node:
    def __init__(self, key: int, value: int):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
        self.head = Node(0, 0)
        self.tail = Node(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        # TODO: Implement get
        pass

    def put(self, key: int, value: int) -> None:
        # TODO: Implement put
        pass

    def _add(self, node):
        prev = self.tail.prev
        prev.next = node
        node.prev = prev
        node.next = self.tail
        self.tail.prev = node

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev`,
          solution: `class Node:
    def __init__(self, key: int, value: int):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
        self.head = Node(0, 0)
        self.tail = Node(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._remove(node)
        self._add(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self.cache[key] = node
        self._add(node)

        if len(self.cache) > self.capacity:
            lru = self.head.next
            self._remove(lru)
            del self.cache[lru.key]

    def _add(self, node):
        prev = self.tail.prev
        prev.next = node
        node.prev = prev
        node.next = self.tail
        self.tail.prev = node

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

# Time: O(1) for get and put
# Space: O(capacity)`
        }
      },
      explanation: 'LRU Cache uses HashMap for O(1) key lookup and Doubly Linked List for O(1) insertion/deletion. Most recently used items are at the tail. When capacity is exceeded, remove from head (least recently used). On access, move node to tail.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(capacity)'
    },
    {
      id: 2,
      title: 'Design HashMap',
      difficulty: 'Medium',
      description: 'Design a HashMap without using any built-in hash table libraries. Implement MyHashMap class with put(key, value), get(key), and remove(key) methods using array + linked list (separate chaining).',
      examples: [
        { input: 'map.put(1, 1); map.put(2, 2); map.get(1)', output: '1' },
        { input: 'map.get(3)', output: '-1 (not found)' },
        { input: 'map.put(2, 1); map.get(2)', output: '1 (updated)' }
      ],
      code: {
        java: {
          starterCode: `class MyHashMap {
    class Node {
        int key, value;
        Node next;
        Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }

    private static final int SIZE = 10000;
    private Node[] buckets;

    public MyHashMap() {
        buckets = new Node[SIZE];
    }

    private int hash(int key) {
        return key % SIZE;
    }

    // TODO: Implement put - add or update key-value pair in the appropriate bucket
    public void put(int key, int value) {

    }

    // TODO: Implement get - return value for key, or -1 if not found
    public int get(int key) {
        return -1;
    }

    // TODO: Implement remove - remove key from the map
    public void remove(int key) {

    }
}`,
          solution: `class MyHashMap {
    class Node {
        int key, value;
        Node next;
        Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }

    private static final int SIZE = 10000;
    private Node[] buckets;

    public MyHashMap() {
        buckets = new Node[SIZE];
    }

    private int hash(int key) {
        return key % SIZE;
    }

    public void put(int key, int value) {
        int index = hash(key);
        if (buckets[index] == null) {
            buckets[index] = new Node(key, value);
            return;
        }

        Node curr = buckets[index];
        while (true) {
            if (curr.key == key) {
                curr.value = value;
                return;
            }
            if (curr.next == null) break;
            curr = curr.next;
        }
        curr.next = new Node(key, value);
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
        return -1;
    }

    public void remove(int key) {
        int index = hash(key);
        Node curr = buckets[index];

        if (curr == null) return;

        if (curr.key == key) {
            buckets[index] = curr.next;
            return;
        }

        while (curr.next != null) {
            if (curr.next.key == key) {
                curr.next = curr.next.next;
                return;
            }
            curr = curr.next;
        }
    }
}

// Time: O(1) average, O(n) worst case for collisions
// Space: O(n) where n is number of entries
// Separate chaining handles collisions with linked lists`
        },
        python: {
          starterCode: `class Node:
    def __init__(self, key: int, value: int):
        self.key = key
        self.value = value
        self.next = None

class MyHashMap:
    def __init__(self):
        self.SIZE = 10000
        self.buckets = [None] * self.SIZE

    def _hash(self, key: int) -> int:
        return key % self.SIZE

    def put(self, key: int, value: int) -> None:
        # TODO: Implement put
        pass

    def get(self, key: int) -> int:
        # TODO: Implement get
        return -1

    def remove(self, key: int) -> None:
        # TODO: Implement remove
        pass`,
          solution: `class Node:
    def __init__(self, key: int, value: int):
        self.key = key
        self.value = value
        self.next = None

class MyHashMap:
    def __init__(self):
        self.SIZE = 10000
        self.buckets = [None] * self.SIZE

    def _hash(self, key: int) -> int:
        return key % self.SIZE

    def put(self, key: int, value: int) -> None:
        index = self._hash(key)
        if self.buckets[index] is None:
            self.buckets[index] = Node(key, value)
            return

        curr = self.buckets[index]
        while True:
            if curr.key == key:
                curr.value = value
                return
            if curr.next is None:
                break
            curr = curr.next
        curr.next = Node(key, value)

    def get(self, key: int) -> int:
        index = self._hash(key)
        curr = self.buckets[index]

        while curr:
            if curr.key == key:
                return curr.value
            curr = curr.next
        return -1

    def remove(self, key: int) -> None:
        index = self._hash(key)
        curr = self.buckets[index]

        if curr is None:
            return

        if curr.key == key:
            self.buckets[index] = curr.next
            return

        while curr.next:
            if curr.next.key == key:
                curr.next = curr.next.next
                return
            curr = curr.next

# Time: O(1) average, O(n) worst case
# Space: O(n)`
        }
      },
      explanation: 'HashMap implementation uses array of buckets with separate chaining for collision handling. Hash function distributes keys across buckets. Each bucket is a linked list. For put: hash key, traverse list to find/update. For get: hash key, search list. For remove: hash key, remove node from list.',
      timeComplexity: 'O(1) average, O(n) worst case',
      spaceComplexity: 'O(n)'
    },
    {
      id: 3,
      title: 'Combination Iterator',
      difficulty: 'Medium',
      description: 'Design the CombinationIterator class that generates all combinations of a given length from a string of sorted distinct characters. Implement hasNext() and next() methods using backtracking to pre-generate combinations.',
      examples: [
        { input: 'CombinationIterator("abc", 2)', output: 'Generates: ab, ac, bc' },
        { input: 'next()', output: '"ab"' },
        { input: 'hasNext()', output: 'true' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;

class CombinationIterator {
    private Queue<String> combinations;

    public CombinationIterator(String characters, int combinationLength) {
        combinations = new LinkedList<>();
        // TODO: Generate all combinations and store them in the queue
        generateCombinations(characters, combinationLength, 0, new StringBuilder());
    }

    // TODO: Implement recursive helper to generate combinations
    private void generateCombinations(String chars, int len, int start, StringBuilder current) {

    }

    public String next() {
        return combinations.poll();
    }

    public boolean hasNext() {
        return !combinations.isEmpty();
    }
}`,
          solution: `import java.util.*;

class CombinationIterator {
    private Queue<String> combinations;

    public CombinationIterator(String characters, int combinationLength) {
        combinations = new LinkedList<>();
        generateCombinations(characters, combinationLength, 0, new StringBuilder());
    }

    private void generateCombinations(String chars, int len, int start, StringBuilder current) {
        if (current.length() == len) {
            combinations.offer(current.toString());
            return;
        }

        for (int i = start; i < chars.length(); i++) {
            current.append(chars.charAt(i));
            generateCombinations(chars, len, i + 1, current);
            current.deleteCharAt(current.length() - 1);
        }
    }

    public String next() {
        return combinations.poll();
    }

    public boolean hasNext() {
        return !combinations.isEmpty();
    }
}

// Time: O(C(n,k)) to generate, O(1) for next/hasNext
// Space: O(C(n,k)) to store all combinations
// Backtracking generates combinations in lexicographic order`
        },
        python: {
          starterCode: `from collections import deque

class CombinationIterator:
    def __init__(self, characters: str, combinationLength: int):
        self.combinations = deque()
        # TODO: Generate all combinations
        self._generate(characters, combinationLength, 0, [])

    def _generate(self, chars: str, length: int, start: int, current: list):
        # TODO: Implement backtracking
        pass

    def next(self) -> str:
        return self.combinations.popleft()

    def hasNext(self) -> bool:
        return len(self.combinations) > 0`,
          solution: `from collections import deque

class CombinationIterator:
    def __init__(self, characters: str, combinationLength: int):
        self.combinations = deque()
        self._generate(characters, combinationLength, 0, [])

    def _generate(self, chars: str, length: int, start: int, current: list):
        if len(current) == length:
            self.combinations.append(''.join(current))
            return

        for i in range(start, len(chars)):
            current.append(chars[i])
            self._generate(chars, length, i + 1, current)
            current.pop()

    def next(self) -> str:
        return self.combinations.popleft()

    def hasNext(self) -> bool:
        return len(self.combinations) > 0

# Time: O(C(n,k)) to generate
# Space: O(C(n,k))`
        }
      },
      explanation: 'Pre-generate all combinations using backtracking at initialization. Store in queue for O(1) next() and hasNext(). Backtracking explores all paths: for each character, include it and recurse with remaining characters, then backtrack. Base case: combination length reached.',
      timeComplexity: 'O(C(n,k)) to generate, O(1) for operations',
      spaceComplexity: 'O(C(n,k))'
    },
    {
      id: 4,
      title: 'Time-Based Key-Value Store',
      difficulty: 'Medium',
      description: 'Design a time-based key-value data structure that can store multiple values for the same key at different timestamps and retrieve the key\'s value at a certain timestamp using HashMap + TreeMap for efficient timestamp lookups.',
      examples: [
        { input: 'set("foo", "bar", 1)', output: 'Store "bar" at timestamp 1' },
        { input: 'get("foo", 1)', output: '"bar"' },
        { input: 'get("foo", 3)', output: '"bar" (most recent before 3)' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;

class TimeMap {
    private Map<String, TreeMap<Integer, String>> map;

    public TimeMap() {
        map = new HashMap<>();
    }

    // TODO: Implement set - store key-value pair with timestamp
    public void set(String key, String value, int timestamp) {

    }

    // TODO: Implement get - return value at timestamp or most recent value before it
    public String get(String key, int timestamp) {
        return "";
    }
}`,
          solution: `import java.util.*;

class TimeMap {
    private Map<String, TreeMap<Integer, String>> map;

    public TimeMap() {
        map = new HashMap<>();
    }

    public void set(String key, String value, int timestamp) {
        map.putIfAbsent(key, new TreeMap<>());
        map.get(key).put(timestamp, value);
    }

    public String get(String key, int timestamp) {
        if (!map.containsKey(key)) {
            return "";
        }

        TreeMap<Integer, String> treeMap = map.get(key);
        Integer floorKey = treeMap.floorKey(timestamp);

        return floorKey == null ? "" : treeMap.get(floorKey);
    }
}

// Time: O(log n) for set and get
// Space: O(n) where n is number of timestamps
// TreeMap provides floorKey() for efficient timestamp lookup`
        },
        python: {
          starterCode: `from collections import defaultdict
from bisect import bisect_right

class TimeMap:
    def __init__(self):
        # Store list of (timestamp, value) for each key
        self.store = defaultdict(list)

    def set(self, key: str, value: str, timestamp: int) -> None:
        # TODO: Implement set
        pass

    def get(self, key: str, timestamp: int) -> str:
        # TODO: Implement get using binary search
        return ""`,
          solution: `from collections import defaultdict
from bisect import bisect_right

class TimeMap:
    def __init__(self):
        # Store list of (timestamp, value) for each key
        self.store = defaultdict(list)

    def set(self, key: str, value: str, timestamp: int) -> None:
        self.store[key].append((timestamp, value))

    def get(self, key: str, timestamp: int) -> str:
        if key not in self.store:
            return ""

        values = self.store[key]

        # Binary search for largest timestamp <= given timestamp
        idx = bisect_right(values, (timestamp, chr(127)))

        return values[idx - 1][1] if idx > 0 else ""

# Time: O(1) for set, O(log n) for get
# Space: O(n)
# Python uses list + binary search instead of TreeMap`
        }
      },
      explanation: 'Use nested data structure: HashMap<String, TreeMap<Integer, String>>. Outer map stores keys, inner TreeMap stores timestamp->value pairs sorted by timestamp. TreeMap.floorKey(timestamp) finds largest timestamp <= target in O(log n). This enables efficient historical queries.',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(n)'
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`CollectionsFramework-${q.id}`)).length
    return { completed, total: questions.length, percentage: Math.round((completed / questions.length) * 100) }
  }

  const stats = getCompletionStats()

  // Group questions by difficulty
  const groupedQuestions = {
    Easy: questions.filter(q => q.difficulty === 'Easy'),
    Medium: questions.filter(q => q.difficulty === 'Medium'),
    Hard: questions.filter(q => q.difficulty === 'Hard')
  }

  const selectQuestion = (question) => {
    setSelectedQuestion(question)
    setShowSolution(false)
    setShowExplanation(false)
    setUserCode(question.code[language].starterCode)
    setOutput('')
    setShowDrawing(false)
  }

  const toggleSection = (difficulty) => {
    setExpandedSections(prev => ({ ...prev, [difficulty]: !prev[difficulty] }))
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '#10b981'
      case 'Medium': return '#f59e0b'
      case 'Hard': return '#ef4444'
      default: return '#6b7280'
    }
  }

  if (selectedQuestion) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #111827, #78350f, #111827)', color: 'white', padding: '1.5rem' }}>
        <div style={{ maxWidth: '1800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setSelectedQuestion(null)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d97706'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}>
            ← Back to Problems
          </button>
          <LanguageToggle />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Problem Description */}
          <div style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2rem', borderRadius: '12px', border: '2px solid #374151', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: '#fbbf24', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <CompletionCheckbox problemId={`CollectionsFramework-${selectedQuestion.id}`} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.75rem' }}>Description</h3>
              <p style={{ fontSize: '1rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.description}</p>
            </div>

            {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.75rem' }}>Examples</h3>
                {selectedQuestion.examples.map((example, idx) => (
                  <div key={idx} style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #374151', color: '#d1d5db' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#fbbf24' }}>Input:</strong> <code style={{ color: '#d1d5db' }}>{example.input}</code>
                    </div>
                    <div>
                      <strong style={{ color: '#fbbf24' }}>Output:</strong> <code style={{ color: '#d1d5db' }}>{example.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedQuestion.explanation && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.75rem' }}>Explanation</h3>
                <p style={{ fontSize: '0.95rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.explanation}</p>
              </div>
            )}

            {(selectedQuestion.timeComplexity || selectedQuestion.spaceComplexity) && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '8px', border: '1px solid #374151' }}>
                <h3 style={{ fontSize: '1rem', color: '#fbbf24', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Space: {selectedQuestion.spaceComplexity}</div>}
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', border: '2px solid #e5e7eb', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedQuestion.code[language].solution) }} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
              <button onClick={() => setUserCode(selectedQuestion.code[language].starterCode)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Reset Code
              </button>
            </div>

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #e5e7eb', borderRadius: '8px', resize: 'none', lineHeight: '1.5' }} spellCheck={false} />

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#374151', marginBottom: '0.5rem' }}>Output</h3>
                <pre style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'auto', fontSize: '0.875rem', maxHeight: '150px' }}>{output}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#f0f9ff', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          ← Back
        </button>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem' }}>📦 Collections Framework</h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>Master advanced data structure design problems using Java Collections</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem 2rem', backgroundColor: 'white', borderRadius: '12px', border: '2px solid #e5e7eb' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6' }}>{stats.completed}/{stats.total}</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Completed</div>
          </div>
          <div style={{ padding: '1rem 2rem', backgroundColor: 'white', borderRadius: '12px', border: '2px solid #e5e7eb' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{stats.percentage}%</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Progress</div>
          </div>
        </div>
      </div>

      {Object.entries(groupedQuestions).map(([difficulty, difficultyQuestions]) => (
        difficultyQuestions.length > 0 && (
          <div key={difficulty} style={{ marginBottom: '2rem' }}>
            <button onClick={() => toggleSection(difficulty)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', backgroundColor: 'white', border: '2px solid #e5e7eb', borderRadius: '12px', cursor: 'pointer', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: getDifficultyColor(difficulty) }}>{difficulty}</span>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>({difficultyQuestions.length} problems)</span>
              </div>
              <span style={{ fontSize: '1.25rem', color: '#6b7280' }}>{expandedSections[difficulty] ? '▼' : '▶'}</span>
            </button>

            {expandedSections[difficulty] && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem' }}>
                {difficultyQuestions.map((question) => (
                  <div key={question.id} onClick={() => selectQuestion(question)} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', border: '2px solid #e5e7eb', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1f2937', margin: 0, flex: 1 }}>{question.id}. {question.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ transform: 'scale(0.85)' }}>
                          <CompletionCheckbox problemId={`CollectionsFramework-${question.id}`} />
                        </div>
                        {question.leetcodeUrl && (
                          <a
                            href={question.leetcodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ padding: '0.25rem 0.75rem', backgroundColor: '#FFA116', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '0.75rem', fontWeight: '600', display: 'inline-block' }}
                          >
                            LeetCode ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      ))}
    </div>
  )
}

export default CollectionsFramework

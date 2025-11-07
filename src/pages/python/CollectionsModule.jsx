import { useState } from 'react'

// Simple syntax highlighter for Python code
const SyntaxHighlighter = ({ code }) => {
  const highlightPython = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    highlighted = highlighted.replace(/(#.*$)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    highlighted = highlighted
      .replace(/\b(def|class|if|elif|else|for|while|in|not|and|or|is|return|yield|import|from|as|try|except|finally|with|lambda|None|pass|break|continue)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(True|False|None)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(print|len|range|enumerate|zip|map|filter|sorted|sum|max|min|list|dict|set|tuple|Counter|defaultdict|OrderedDict|ChainMap|deque|namedtuple|most_common|update|total|elements)\b/g, '<span style="color: #dcdcaa;">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #b5cea8;">$1</span>')

    protectedContent.forEach(({ id, replacement }) => {
      highlighted = highlighted.replace(id, replacement)
    })

    return highlighted
  }

  return (
    <pre style={{
      margin: 0,
      fontFamily: '"Fira Code", "Consolas", "Monaco", "Courier New", monospace',
      fontSize: '0.9rem',
      lineHeight: '1.7',
      color: '#e2e8f0',
      whiteSpace: 'pre',
      overflowX: 'auto',
      padding: '1.25rem'
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightPython(code) }} />
    </pre>
  )
}

function CollectionsModule({ onBack }) {
  const [selectedConcept, setSelectedConcept] = useState(null)

  const concepts = [
    {
      id: 'counter',
      name: 'Counter',
      icon: '🔢',
      color: '#3b82f6',
      description: 'Count hashable objects - frequency analysis made easy',
      explanation: 'Counter is a dict subclass for counting hashable objects. It provides convenient methods for frequency analysis, most common elements, and arithmetic operations.',
      complexity: 'Time: O(n) for creation, O(1) for access | Space: O(k) where k is unique items',
      codeExample: `from collections import Counter

# Creating a Counter
words = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']
counter = Counter(words)
print(counter)  # Counter({'apple': 3, 'banana': 2, 'cherry': 1})

# Most common elements
print(counter.most_common(2))  # [('apple', 3), ('banana', 2)]

# Accessing counts (returns 0 for missing keys)
print(counter['apple'])    # 3
print(counter['orange'])   # 0 (not KeyError!)

# Update with more data
counter.update(['apple', 'date'])
print(counter)  # Counter({'apple': 4, 'banana': 2, 'cherry': 1, 'date': 1})

# Arithmetic operations
c1 = Counter(a=3, b=1)
c2 = Counter(a=1, b=2)
print(c1 + c2)  # Counter({'a': 4, 'b': 3})
print(c1 - c2)  # Counter({'a': 2}) (keeps only positive counts)
print(c1 & c2)  # Counter({'a': 1, 'b': 1}) (intersection: min)
print(c1 | c2)  # Counter({'a': 3, 'b': 2}) (union: max)

# Elements - get list of elements
c = Counter(a=2, b=3)
print(list(c.elements()))  # ['a', 'a', 'b', 'b', 'b']

# Practical: Find most common character in string
text = "hello world"
char_freq = Counter(text)
print(char_freq.most_common(3))  # [('l', 3), ('o', 2), ('h', 1)]`
    },
    {
      id: 'defaultdict',
      name: 'defaultdict',
      icon: '🗂️',
      color: '#10b981',
      description: 'Dict with default values - never get KeyError again',
      explanation: 'defaultdict is a dict subclass that calls a factory function to supply missing values. No more KeyError or checking if key exists before updating.',
      complexity: 'Time: O(1) for access | Space: O(n)',
      codeExample: `from collections import defaultdict

# defaultdict(default_factory) - specify default value type
dd = defaultdict(int)  # default value is 0
dd['a'] += 1
dd['b'] += 2
print(dd)  # defaultdict(<class 'int'>, {'a': 1, 'b': 2})
print(dd['c'])  # 0 (auto-created!)

# With list - group items
dd_list = defaultdict(list)
pairs = [('color', 'blue'), ('color', 'red'), ('size', 'large'), ('size', 'small')]
for key, value in pairs:
    dd_list[key].append(value)
print(dd_list)
# defaultdict(<class 'list'>, {'color': ['blue', 'red'], 'size': ['large', 'small']})

# With set - avoid duplicates
dd_set = defaultdict(set)
edges = [('A', 'B'), ('A', 'C'), ('B', 'C'), ('A', 'B')]
for src, dst in edges:
    dd_set[src].add(dst)
print(dd_set)  # defaultdict(<class 'set'>, {'A': {'B', 'C'}, 'B': {'C'}})

# Custom default factory
def zero():
    return 0

dd_custom = defaultdict(zero)
dd_custom['x'] += 5
print(dd_custom)  # defaultdict(<function zero>, {'x': 5})

# Practical: Group students by grade
students = [('Alice', 'A'), ('Bob', 'B'), ('Charlie', 'A'), ('David', 'B')]
by_grade = defaultdict(list)
for name, grade in students:
    by_grade[grade].append(name)
print(dict(by_grade))  # {'A': ['Alice', 'Charlie'], 'B': ['Bob', 'David']}`
    },
    {
      id: 'ordereddict',
      name: 'OrderedDict',
      icon: '📋',
      color: '#8b5cf6',
      description: 'Dict that remembers insertion order (legacy, dict is ordered in Python 3.7+)',
      explanation: 'OrderedDict maintains insertion order and has additional methods like move_to_end(). Note: Regular dicts are ordered since Python 3.7+, but OrderedDict has extra features.',
      complexity: 'Time: O(1) for access, O(n) for equality check | Space: O(n)',
      codeExample: `from collections import OrderedDict

# Maintains insertion order (though regular dict does this in Python 3.7+)
od = OrderedDict()
od['b'] = 2
od['a'] = 1
od['c'] = 3
print(od)  # OrderedDict([('b', 2), ('a', 1), ('c', 3)])

# move_to_end(key, last=True) - reorder items
od.move_to_end('a')
print(od)  # OrderedDict([('b', 2), ('c', 3), ('a', 1)])

od.move_to_end('b', last=False)  # Move to beginning
print(od)  # OrderedDict([('b', 2), ('c', 3), ('a', 1)])

# popitem(last=True) - remove and return in LIFO/FIFO order
print(od.popitem())  # ('a', 1) - LIFO by default
print(od.popitem(last=False))  # ('b', 2) - FIFO

# Equality comparison considers order (unlike regular dict in Python 3.7)
d1 = {'a': 1, 'b': 2}
d2 = {'b': 2, 'a': 1}
print(d1 == d2)  # True (regular dict ignores order)

od1 = OrderedDict([('a', 1), ('b', 2)])
od2 = OrderedDict([('b', 2), ('a', 1)])
print(od1 == od2)  # False (OrderedDict checks order)

# Practical: LRU Cache implementation (simplified)
class LRUCache:
    def __init__(self, capacity):
        self.cache = OrderedDict()
        self.capacity = capacity

    def get(self, key):
        if key in self.cache:
            self.cache.move_to_end(key)  # Mark as recently used
            return self.cache[key]
        return -1

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # Remove oldest

lru = LRUCache(2)
lru.put('a', 1)
lru.put('b', 2)
print(lru.cache)  # OrderedDict([('a', 1), ('b', 2)])`
    },
    {
      id: 'deque',
      name: 'deque',
      icon: '↔️',
      color: '#f59e0b',
      description: 'Double-ended queue - fast append/pop from both ends',
      explanation: 'deque (pronounced "deck") is a list-like container optimized for fast O(1) appends and pops from both ends. Use it for queues, stacks, and sliding windows.',
      complexity: 'Time: O(1) for append/pop from ends, O(n) for insert/delete middle | Space: O(n)',
      codeExample: `from collections import deque

# Create deque
dq = deque([1, 2, 3])
print(dq)  # deque([1, 2, 3])

# Append/pop from right (like list)
dq.append(4)
print(dq)  # deque([1, 2, 3, 4])
print(dq.pop())  # 4

# Append/pop from left (O(1) unlike list!)
dq.appendleft(0)
print(dq)  # deque([0, 1, 2, 3])
print(dq.popleft())  # 0

# Rotate (shift elements)
dq = deque([1, 2, 3, 4, 5])
dq.rotate(2)  # Rotate right
print(dq)  # deque([4, 5, 1, 2, 3])
dq.rotate(-1)  # Rotate left
print(dq)  # deque([5, 1, 2, 3, 4])

# Max length - automatically discards from opposite end
dq = deque(maxlen=3)
for i in range(5):
    dq.append(i)
    print(dq)
# deque([0], maxlen=3)
# deque([0, 1], maxlen=3)
# deque([0, 1, 2], maxlen=3)
# deque([1, 2, 3], maxlen=3)  # 0 was discarded
# deque([2, 3, 4], maxlen=3)  # 1 was discarded

# Extend from both sides
dq = deque([3, 4])
dq.extend([5, 6])        # Add to right
dq.extendleft([2, 1])    # Add to left (reverses order!)
print(dq)  # deque([1, 2, 3, 4, 5, 6])

# Practical: Sliding window maximum
def sliding_window_max(nums, k):
    """Find maximum in each window of size k"""
    dq = deque()  # Store indices
    result = []

    for i, num in enumerate(nums):
        # Remove elements outside window
        while dq and dq[0] <= i - k:
            dq.popleft()
        # Remove smaller elements (they won't be max)
        while dq and nums[dq[-1]] < num:
            dq.pop()
        dq.append(i)

        if i >= k - 1:
            result.append(nums[dq[0]])
    return result

print(sliding_window_max([1, 3, -1, -3, 5, 3, 6, 7], 3))
# [3, 3, 5, 5, 6, 7]`
    },
    {
      id: 'namedtuple',
      name: 'namedtuple',
      icon: '📛',
      color: '#ec4899',
      description: 'Lightweight object with named fields - readable tuples',
      explanation: 'namedtuple creates tuple subclasses with named fields. Access elements by name instead of index for better readability. Immutable and memory-efficient.',
      complexity: 'Time: O(1) for access | Space: Same as tuple',
      codeExample: `from collections import namedtuple

# Create a namedtuple type
Point = namedtuple('Point', ['x', 'y'])
p1 = Point(10, 20)
print(p1)  # Point(x=10, y=20)
print(p1.x, p1.y)  # 10 20
print(p1[0], p1[1])  # 10 20 (still works like tuple)

# Alternative syntax
Person = namedtuple('Person', 'name age city')
alice = Person('Alice', 30, 'NYC')
print(alice)  # Person(name='Alice', age=30, city='NYC')

# Immutable (like regular tuple)
# alice.age = 31  # AttributeError!

# Create from iterable
data = ['Bob', 25, 'LA']
bob = Person._make(data)
print(bob)  # Person(name='Bob', age=25, city='LA')

# Convert to dict
print(alice._asdict())  # {'name': 'Alice', 'age': 30, 'city': 'NYC'}

# Replace values (creates new instance)
alice_new = alice._replace(age=31)
print(alice_new)  # Person(name='Alice', age=31, city='NYC')
print(alice)  # Person(name='Alice', age=30, city='NYC') (unchanged)

# Fields and defaults
print(Person._fields)  # ('name', 'age', 'city')

# namedtuple with defaults (Python 3.7+)
Employee = namedtuple('Employee', 'name title salary', defaults=[50000])
emp1 = Employee('John', 'Developer')  # salary defaults to 50000
print(emp1)  # Employee(name='John', title='Developer', salary=50000)

# Practical: Return multiple values with names
def get_stats(numbers):
    Stats = namedtuple('Stats', 'mean median min max')
    sorted_nums = sorted(numbers)
    return Stats(
        mean=sum(numbers) / len(numbers),
        median=sorted_nums[len(sorted_nums) // 2],
        min=sorted_nums[0],
        max=sorted_nums[-1]
    )

stats = get_stats([1, 5, 3, 9, 2])
print(f"Mean: {stats.mean}, Median: {stats.median}")
# Mean: 4.0, Median: 3`
    },
    {
      id: 'chainmap',
      name: 'ChainMap',
      icon: '🔗',
      color: '#6366f1',
      description: 'Group multiple dicts into single view - layered lookups',
      explanation: 'ChainMap groups multiple dictionaries into a single view. Lookups search each dict in order. Useful for managing nested contexts like scopes.',
      complexity: 'Time: O(n) worst case for lookup where n is number of maps | Space: O(1) additional',
      codeExample: `from collections import ChainMap

# Combine multiple dicts
defaults = {'color': 'blue', 'user': 'guest'}
overrides = {'color': 'red'}
config = ChainMap(overrides, defaults)

print(config['color'])  # 'red' (from overrides)
print(config['user'])   # 'guest' (from defaults)

# Modifications affect first map only
config['theme'] = 'dark'
print(overrides)  # {'color': 'red', 'theme': 'dark'}
print(defaults)   # {'color': 'blue', 'user': 'guest'} (unchanged)

# Access underlying maps
print(config.maps)  # [{'color': 'red', 'theme': 'dark'}, {'color': 'blue', 'user': 'guest'}]

# Add new child context
child_config = config.new_child({'size': 'large'})
print(child_config['size'])   # 'large'
print(child_config['color'])  # 'red'
print(child_config.maps)
# [{'size': 'large'}, {'color': 'red', 'theme': 'dark'}, {'color': 'blue', 'user': 'guest'}]

# Practical: Scope management (like variables in functions)
# Global scope
global_vars = {'x': 10, 'y': 20}

# Function scope
def my_function():
    local_vars = {'x': 5, 'z': 30}  # Local x shadows global x
    scope = ChainMap(local_vars, global_vars)
    print(scope['x'])  # 5 (local)
    print(scope['y'])  # 20 (global)
    print(scope['z'])  # 30 (local)

my_function()

# Practical: Command-line args > env vars > defaults
import os
defaults = {'debug': False, 'port': 8000}
env_vars = {'port': os.getenv('PORT', 3000)}
cli_args = {'debug': True}  # Simulating --debug flag

settings = ChainMap(cli_args, env_vars, defaults)
print(f"Debug: {settings['debug']}, Port: {settings['port']}")
# Debug: True, Port: 3000

# Parents property - all maps except first
settings_parent = settings.parents
print(settings_parent.maps)  # [{'port': 3000}, {'debug': False, 'port': 8000}]`
    }
  ]

  if (selectedConcept) {
    const concept = concepts.find(c => c.id === selectedConcept)
    return (
      <div style={{
        padding: '2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        backgroundColor: '#f8fafc',
        minHeight: '100vh'
      }}>
        <button
          onClick={() => setSelectedConcept(null)}
          style={{
            marginBottom: '2rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
        >
          ← Back to Collections
        </button>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '3rem' }}>{concept.icon}</span>
            <div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: '#1f2937',
                margin: 0,
                marginBottom: '0.5rem'
              }}>
                {concept.name}
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: '#6b7280',
                margin: 0
              }}>
                {concept.description}
              </p>
            </div>
          </div>

          <div style={{
            padding: '1rem',
            backgroundColor: '#f3f4f6',
            borderLeft: '4px solid ' + concept.color,
            borderRadius: '6px',
            marginBottom: '1.5rem'
          }}>
            <p style={{ margin: 0, color: '#374151', lineHeight: '1.7' }}>
              <strong>💡 Explanation:</strong> {concept.explanation}
            </p>
          </div>

          <div style={{
            padding: '1rem',
            backgroundColor: '#fef3c7',
            borderLeft: '4px solid #f59e0b',
            borderRadius: '6px',
            marginBottom: '2rem'
          }}>
            <p style={{ margin: 0, color: '#78350f', fontWeight: '600' }}>
              ⚡ Complexity: {concept.complexity}
            </p>
          </div>

          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '0.75rem 1.25rem',
              backgroundColor: '#334155',
              borderBottom: '1px solid #475569'
            }}>
              <span style={{ color: '#94a3b8', fontSize: '0.875rem', fontWeight: '600' }}>
                Python Example
              </span>
            </div>
            <SyntaxHighlighter code={concept.codeExample} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      <button
        onClick={onBack}
        style={{
          marginBottom: '2rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          fontWeight: '600',
          backgroundColor: '#6b7280',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
      >
        ← Back to Python
      </button>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '800',
          color: '#1f2937',
          marginBottom: '1rem'
        }}>
          🗂️ Collections Module
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#6b7280',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          Master Python's specialized container datatypes. More powerful alternatives to built-in dict, list, set, and tuple.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem'
      }}>
        {concepts.map((concept) => (
          <div
            key={concept.id}
            onClick={() => setSelectedConcept(concept.id)}
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: `3px solid ${concept.color}`,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = `0 0 0 4px ${concept.color}40, 0 12px 24px rgba(0,0,0,0.2)`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{concept.icon}</span>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#1f2937',
                margin: 0
              }}>
                {concept.name}
              </h3>
            </div>
            <p style={{
              fontSize: '0.95rem',
              color: '#6b7280',
              lineHeight: '1.6',
              margin: 0
            }}>
              {concept.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CollectionsModule

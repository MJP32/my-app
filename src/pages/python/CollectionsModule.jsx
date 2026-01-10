import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

function CollectionsModule({ onBack, breadcrumb }) {
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (conceptIndex, sectionIndex) => {
    const key = `${conceptIndex}-${sectionIndex}`
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const parseCodeSections = (codeString) => {
    const sections = codeString.split('\n\n')
    return sections.map((section, index) => ({
      id: index,
      code: section.trim()
    }))
  }

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
        position: 'fixed',
        inset: '0',
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        zIndex: '50',
        overflowY: 'auto'
      }}>
        <div style={{
          background: 'linear-gradient(to bottom right, #111827, #1f2937)',
          borderRadius: '0.75rem',
          maxWidth: '72rem',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '2px solid #3b82f6',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}>
          <div style={{
            position: 'sticky',
            top: '0',
            background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
            padding: '1.5rem',
            borderTopLeftRadius: '0.75rem',
            borderTopRightRadius: '0.75rem',
            borderBottom: '2px solid #60a5fa',
            zIndex: '10'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <span style={{ fontSize: '3rem' }}>{concept.icon}</span>
                <h2 style={{
                  fontSize: '1.875rem',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  {concept.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedConcept(null)}
                style={{
                  background: '#dc2626',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '1rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#b91c1c'
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#dc2626'
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              >
                Close
              </button>
            </div>
          </div>

          <div style={{ padding: '2rem' }}>
            <div style={{
              background: '#1f2937',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              border: '1px solid #3b82f6'
            }}>
              <p style={{ margin: 0, marginBottom: '0.75rem', color: '#93c5fd', fontSize: '1.1rem' }}>
                {concept.description}
              </p>
              <p style={{ margin: 0, color: '#d1d5db', lineHeight: '1.7' }}>
                <strong style={{ color: '#60a5fa' }}>Explanation:</strong> {concept.explanation}
              </p>
            </div>

            <div style={{
              background: '#1f2937',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              border: '1px solid #f59e0b'
            }}>
              <p style={{ margin: 0, color: '#fbbf24', fontWeight: '600' }}>
                ⚡ Complexity: {concept.complexity}
              </p>
            </div>

            <div style={{
              backgroundColor: '#1e293b',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #3b82f6'
            }}>
              <div style={{
                padding: '0.75rem 1.25rem',
                backgroundColor: '#334155',
                borderBottom: '1px solid #475569'
              }}>
                <span style={{ color: '#93c5fd', fontSize: '0.875rem', fontWeight: '600' }}>
                  Python Example
                </span>
              </div>
              <div style={{ padding: '1rem' }}>
                {parseCodeSections(concept.codeExample).map((section, idx) => (
                  <div key={section.id} style={{ marginBottom: '1rem' }}>
                    <button
                      onClick={() => toggleSection(concepts.findIndex(c => c.id === selectedConcept), idx)}
                      style={{
                        width: '100%',
                        background: '#2563eb',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        marginBottom: '0.5rem',
                        textAlign: 'left',
                        fontWeight: '500',
                        fontSize: '1rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#1d4ed8'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#2563eb'
                      }}
                    >
                      {expandedSections[`${concepts.findIndex(c => c.id === selectedConcept)}-${idx}`] ? '▼' : '▶'} Code Block {idx + 1}
                    </button>
                    {expandedSections[`${concepts.findIndex(c => c.id === selectedConcept)}-${idx}`] && (
                      <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
                        customStyle={{
                          padding: '1.5rem',
                          borderRadius: '0.5rem',
                          fontSize: '0.9rem',
                          border: '1px solid #3b82f6'
                        }}
                      >
                        {section.code}
                      </SyntaxHighlighter>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <button
              onClick={onBack}
              style={{
                background: '#2563eb',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500',
                fontSize: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1d4ed8'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2563eb'
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              ← Back to Python Topics
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🗂️ Collections Module
            </h1>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} />

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{
            fontSize: '1.2rem',
            color: '#d1d5db',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Master Python's specialized container datatypes. More powerful alternatives to built-in dict, list, set, and tuple.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {concepts.map((concept) => (
            <div
              key={concept.id}
              onClick={() => setSelectedConcept(concept.id)}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                border: '2px solid #3b82f6',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#60a5fa'
                e.currentTarget.style.transform = 'translateY(-0.5rem)'
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(59, 130, 246, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {concept.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '0.75rem',
                color: '#93c5fd'
              }}>
                {concept.name}
              </h3>
              <p style={{
                color: '#d1d5db',
                textAlign: 'center',
                fontSize: '0.875rem',
                lineHeight: '1.6'
              }}>
                {concept.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CollectionsModule

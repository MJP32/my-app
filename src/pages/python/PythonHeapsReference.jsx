import { useState } from 'react'

function PythonHeapsReference({ onBack }) {
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const heapMethods = [
    {
      id: 'heapify',
      name: 'heapq.heapify()',
      category: 'Creation',
      signature: 'heapq.heapify(x)',
      description: 'Transform list x into a heap, in-place, in linear time.',
      parameters: [
        { name: 'x', type: 'list', description: 'List to transform into a min heap' }
      ],
      returns: 'None (modifies list in-place)',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      examples: [
        {
          title: 'Basic Usage',
          code: `import heapq

# Create a min heap from a list
nums = [5, 7, 9, 1, 3]
heapq.heapify(nums)
print(nums)  # Output: [1, 3, 9, 7, 5]

# The smallest element is now at index 0
print(nums[0])  # Output: 1`
        },
        {
          title: 'Heap Property',
          code: `import heapq

# After heapify, heap property is maintained:
# For index i: parent = (i-1)//2, left = 2*i+1, right = 2*i+2
# Parent is always <= children

nums = [10, 20, 30, 5, 15]
heapq.heapify(nums)
print(nums)  # [5, 10, 30, 20, 15]

# Verify: nums[0] <= nums[1] and nums[0] <= nums[2]
print(f"Parent {nums[0]} <= Left child {nums[1]}")  # True
print(f"Parent {nums[0]} <= Right child {nums[2]}")  # True`
        }
      ],
      notes: [
        'Creates a min heap (smallest element at root)',
        'Modifies the list in-place',
        'Does not return anything',
        'For max heap, negate all values before heapify',
        'Heap property: parent <= children'
      ],
      useCases: [
        'Initialize a priority queue',
        'Prepare data for heap-based algorithms',
        'Convert unsorted data to heap structure'
      ]
    },
    {
      id: 'heappush',
      name: 'heapq.heappush()',
      category: 'Insertion',
      signature: 'heapq.heappush(heap, item)',
      description: 'Push the value item onto the heap, maintaining the heap invariant.',
      parameters: [
        { name: 'heap', type: 'list', description: 'Heap to push item onto' },
        { name: 'item', type: 'any', description: 'Item to add to the heap' }
      ],
      returns: 'None (modifies heap in-place)',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      examples: [
        {
          title: 'Adding Elements',
          code: `import heapq

heap = []
heapq.heappush(heap, 5)
heapq.heappush(heap, 3)
heapq.heappush(heap, 7)
heapq.heappush(heap, 1)

print(heap)  # Output: [1, 3, 7, 5]
print(heap[0])  # Smallest element: 1`
        },
        {
          title: 'Building Priority Queue',
          code: `import heapq

# Task priority queue (lower number = higher priority)
tasks = []
heapq.heappush(tasks, (2, "Medium priority task"))
heapq.heappush(tasks, (1, "High priority task"))
heapq.heappush(tasks, (3, "Low priority task"))

# Get highest priority task
priority, task = heapq.heappop(tasks)
print(task)  # "High priority task"`
        },
        {
          title: 'With Tuples',
          code: `import heapq

# Heap of tuples (compared by first element)
heap = []
heapq.heappush(heap, (5, 'five'))
heapq.heappush(heap, (2, 'two'))
heapq.heappush(heap, (8, 'eight'))

print(heap[0])  # (2, 'two') - smallest by first element`
        }
      ],
      notes: [
        'Maintains heap property automatically',
        'Uses "bubble up" or "sift up" algorithm',
        'For max heap, push negative values: heappush(heap, -item)',
        'Can push tuples for priority queues'
      ],
      useCases: [
        'Implementing priority queues',
        'Adding elements to a heap dynamically',
        'Stream processing with heap'
      ]
    },
    {
      id: 'heappop',
      name: 'heapq.heappop()',
      category: 'Removal',
      signature: 'heapq.heappop(heap)',
      description: 'Pop and return the smallest item from the heap, maintaining the heap invariant.',
      parameters: [
        { name: 'heap', type: 'list', description: 'Non-empty heap to pop from' }
      ],
      returns: 'Smallest item from the heap',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      examples: [
        {
          title: 'Basic Usage',
          code: `import heapq

heap = [1, 3, 5, 7, 9]
smallest = heapq.heappop(heap)
print(smallest)  # 1
print(heap)      # [3, 7, 5, 9]

# Pop again
next_smallest = heapq.heappop(heap)
print(next_smallest)  # 3`
        },
        {
          title: 'Processing All Elements',
          code: `import heapq

heap = [5, 2, 8, 1, 9, 3]
heapq.heapify(heap)

# Pop all elements in sorted order
result = []
while heap:
    result.append(heapq.heappop(heap))

print(result)  # [1, 2, 3, 5, 8, 9]`
        },
        {
          title: 'Error Handling',
          code: `import heapq

heap = []
try:
    item = heapq.heappop(heap)
except IndexError:
    print("Cannot pop from empty heap")

# Safe version
if heap:
    item = heapq.heappop(heap)
else:
    item = None`
        }
      ],
      notes: [
        'Raises IndexError if heap is empty',
        'Always check if heap is non-empty before popping',
        'Uses "bubble down" or "sift down" algorithm',
        'For max heap, negate returned value: -heappop(max_heap)'
      ],
      useCases: [
        'Getting minimum/maximum element',
        'Processing items in priority order',
        'Implementing heap sort'
      ]
    },
    {
      id: 'heappushpop',
      name: 'heapq.heappushpop()',
      category: 'Combined',
      signature: 'heapq.heappushpop(heap, item)',
      description: 'Push item on the heap, then pop and return the smallest item.',
      parameters: [
        { name: 'heap', type: 'list', description: 'Heap to operate on' },
        { name: 'item', type: 'any', description: 'Item to push before popping' }
      ],
      returns: 'The smallest item (may be the pushed item)',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      examples: [
        {
          title: 'Basic Usage',
          code: `import heapq

heap = [2, 4, 6, 8]
result = heapq.heappushpop(heap, 3)
print(result)  # 2 (smallest after push)
print(heap)    # [3, 4, 6, 8]`
        },
        {
          title: 'Optimization Example',
          code: `import heapq

heap = [5, 7, 9]

# If item < heap[0], returns item immediately
result = heapq.heappushpop(heap, 1)
print(result)  # 1 (pushed item is smallest)
print(heap)    # [5, 7, 9] (unchanged!)

# More efficient than:
# heapq.heappush(heap, item)
# result = heapq.heappop(heap)`
        },
        {
          title: 'Maintaining Top K',
          code: `import heapq

# Keep only 3 largest elements
heap = [10, 20, 30]  # Current top 3
new_value = 25

if new_value > heap[0]:
    # Replace smallest if new value is larger
    removed = heapq.heappushpop(heap, new_value)
    print(f"Removed {removed}, added {new_value}")
    print(f"Top 3: {sorted(heap, reverse=True)}")`
        }
      ],
      notes: [
        'More efficient than separate push and pop',
        'If item < heap[0], returns item without modifying heap',
        'Equivalent to: heappush(heap, item) + heappop(heap)',
        'Useful for maintaining fixed-size heaps'
      ],
      useCases: [
        'Maintaining top/bottom K elements',
        'Sliding window problems',
        'Online algorithms'
      ]
    },
    {
      id: 'heapreplace',
      name: 'heapq.heapreplace()',
      category: 'Combined',
      signature: 'heapq.heapreplace(heap, item)',
      description: 'Pop and return the smallest item, then push the new item.',
      parameters: [
        { name: 'heap', type: 'list', description: 'Non-empty heap to operate on' },
        { name: 'item', type: 'any', description: 'Item to push after popping' }
      ],
      returns: 'The smallest item that was popped',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      examples: [
        {
          title: 'Basic Usage',
          code: `import heapq

heap = [2, 4, 6, 8]
result = heapq.heapreplace(heap, 5)
print(result)  # 2 (popped item)
print(heap)    # [4, 5, 6, 8]`
        },
        {
          title: 'Fixed-Size Heap',
          code: `import heapq

# Maintain heap of size 3
heap = [1, 3, 5]

# Stream of values
stream = [7, 2, 8, 4]

for value in stream:
    if len(heap) >= 3:
        removed = heapq.heapreplace(heap, value)
        print(f"Removed {removed}, added {value}")
    else:
        heapq.heappush(heap, value)

print(f"Final heap: {heap}")`
        },
        {
          title: 'Error Handling',
          code: `import heapq

heap = []
try:
    result = heapq.heapreplace(heap, 5)
except IndexError:
    print("Cannot replace in empty heap")
    # Use heappush instead
    heapq.heappush(heap, 5)`
        }
      ],
      notes: [
        'Raises IndexError if heap is empty',
        'More efficient than separate pop and push',
        'Heap size remains the same',
        'Different from heappushpop (pop first, then push)'
      ],
      useCases: [
        'Maintaining fixed-size sliding window',
        'Streaming data with bounded memory',
        'Replacing elements in priority queue'
      ]
    },
    {
      id: 'nsmallest',
      name: 'heapq.nsmallest()',
      category: 'Query',
      signature: 'heapq.nsmallest(n, iterable, key=None)',
      description: 'Return a list with the n smallest elements from the dataset.',
      parameters: [
        { name: 'n', type: 'int', description: 'Number of smallest elements to return' },
        { name: 'iterable', type: 'iterable', description: 'Dataset to find smallest elements from' },
        { name: 'key', type: 'function', description: 'Optional function to extract comparison key', optional: true }
      ],
      returns: 'List of n smallest elements in ascending order',
      timeComplexity: 'O(n log k) where k = min(n, len(iterable))',
      spaceComplexity: 'O(n)',
      examples: [
        {
          title: 'Basic Usage',
          code: `import heapq

nums = [5, 2, 8, 1, 9, 3, 7, 4, 6]
smallest_3 = heapq.nsmallest(3, nums)
print(smallest_3)  # [1, 2, 3]

# Returns in ascending order
smallest_5 = heapq.nsmallest(5, nums)
print(smallest_5)  # [1, 2, 3, 4, 5]`
        },
        {
          title: 'With Key Function',
          code: `import heapq

# Find 3 shortest strings
words = ['apple', 'pie', 'banana', 'cat', 'dog', 'elephant']
shortest = heapq.nsmallest(3, words, key=len)
print(shortest)  # ['pie', 'cat', 'dog']

# Find 3 people with lowest age
people = [
    {'name': 'Alice', 'age': 30},
    {'name': 'Bob', 'age': 25},
    {'name': 'Charlie', 'age': 35},
    {'name': 'David', 'age': 20}
]
youngest = heapq.nsmallest(3, people, key=lambda x: x['age'])
print([p['name'] for p in youngest])  # ['David', 'Bob', 'Alice']`
        },
        {
          title: 'Performance Comparison',
          code: `import heapq

nums = list(range(1000000))

# For small n, nsmallest is efficient
n = 10
result = heapq.nsmallest(n, nums)  # O(n log k) where k=10

# For large n, sorting might be better
# If n > len(nums) / 2, consider: sorted(nums)[:n]

# Rule of thumb:
# - Use nsmallest for small n
# - Use sorted()[:n] for n close to len(nums)`
        }
      ],
      notes: [
        'Returns elements in ascending order',
        'Efficient for small n relative to dataset size',
        'Can use key function for complex comparisons',
        'For n=1, equivalent to min(iterable)',
        'For large n, sorted(iterable)[:n] may be faster'
      ],
      useCases: [
        'Finding top-K smallest elements',
        'Getting bottom performers',
        'Selecting minimum values with custom comparison'
      ]
    },
    {
      id: 'nlargest',
      name: 'heapq.nlargest()',
      category: 'Query',
      signature: 'heapq.nlargest(n, iterable, key=None)',
      description: 'Return a list with the n largest elements from the dataset.',
      parameters: [
        { name: 'n', type: 'int', description: 'Number of largest elements to return' },
        { name: 'iterable', type: 'iterable', description: 'Dataset to find largest elements from' },
        { name: 'key', type: 'function', description: 'Optional function to extract comparison key', optional: true }
      ],
      returns: 'List of n largest elements in descending order',
      timeComplexity: 'O(n log k) where k = min(n, len(iterable))',
      spaceComplexity: 'O(n)',
      examples: [
        {
          title: 'Basic Usage',
          code: `import heapq

nums = [5, 2, 8, 1, 9, 3, 7, 4, 6]
largest_3 = heapq.nlargest(3, nums)
print(largest_3)  # [9, 8, 7]

# Returns in descending order
largest_5 = heapq.nlargest(5, nums)
print(largest_5)  # [9, 8, 7, 6, 5]`
        },
        {
          title: 'Top Performers',
          code: `import heapq

# Find top 3 students by score
students = [
    {'name': 'Alice', 'score': 85},
    {'name': 'Bob', 'score': 92},
    {'name': 'Charlie', 'score': 78},
    {'name': 'David', 'score': 95},
    {'name': 'Eve', 'score': 88}
]

top_students = heapq.nlargest(3, students, key=lambda x: x['score'])
for student in top_students:
    print(f"{student['name']}: {student['score']}")
# David: 95
# Bob: 92
# Eve: 88`
        },
        {
          title: 'Multiple Criteria',
          code: `import heapq

# Find highest priority tasks (by priority, then by urgency)
tasks = [
    (3, 2, 'Task A'),  # (priority, urgency, name)
    (5, 1, 'Task B'),
    (3, 4, 'Task C'),
    (5, 3, 'Task D'),
    (4, 2, 'Task E')
]

# Tuples compared element by element
top_tasks = heapq.nlargest(3, tasks)
for priority, urgency, name in top_tasks:
    print(f"{name}: P{priority}, U{urgency}")`
        }
      ],
      notes: [
        'Returns elements in descending order',
        'Efficient for small n relative to dataset size',
        'Can use key function for custom comparisons',
        'For n=1, equivalent to max(iterable)',
        'For large n, sorted(iterable, reverse=True)[:n] may be faster'
      ],
      useCases: [
        'Finding top-K largest elements',
        'Leaderboards and rankings',
        'Getting best performers',
        'Top-N queries'
      ]
    },
    {
      id: 'merge',
      name: 'heapq.merge()',
      category: 'Utility',
      signature: 'heapq.merge(*iterables, key=None, reverse=False)',
      description: 'Merge multiple sorted inputs into a single sorted output.',
      parameters: [
        { name: '*iterables', type: 'iterables', description: 'Multiple sorted iterables to merge' },
        { name: 'key', type: 'function', description: 'Optional function to extract comparison key', optional: true },
        { name: 'reverse', type: 'bool', description: 'If True, merge in descending order', optional: true }
      ],
      returns: 'Iterator over sorted values',
      timeComplexity: 'O(n log k) where n = total elements, k = number of iterables',
      spaceComplexity: 'O(k) for heap of iterators',
      examples: [
        {
          title: 'Merge Sorted Lists',
          code: `import heapq

list1 = [1, 3, 5, 7]
list2 = [2, 4, 6, 8]
list3 = [0, 9, 10]

# Merge into single sorted sequence
merged = list(heapq.merge(list1, list2, list3))
print(merged)  # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`
        },
        {
          title: 'Merge Log Files',
          code: `import heapq
from datetime import datetime

# Sorted log files by timestamp
logs1 = [
    (datetime(2024, 1, 1, 10, 0), "Server started"),
    (datetime(2024, 1, 1, 10, 5), "Request received")
]
logs2 = [
    (datetime(2024, 1, 1, 10, 2), "Database connected"),
    (datetime(2024, 1, 1, 10, 7), "Response sent")
]

# Merge logs in chronological order
all_logs = heapq.merge(logs1, logs2, key=lambda x: x[0])
for timestamp, message in all_logs:
    print(f"{timestamp}: {message}")`
        },
        {
          title: 'Descending Order',
          code: `import heapq

# Already sorted in descending order
nums1 = [9, 7, 5, 3, 1]
nums2 = [8, 6, 4, 2]

# Merge in descending order
merged = list(heapq.merge(nums1, nums2, reverse=True))
print(merged)  # [9, 8, 7, 6, 5, 4, 3, 2, 1]`
        },
        {
          title: 'Lazy Evaluation',
          code: `import heapq

# merge() returns iterator (lazy evaluation)
list1 = range(0, 1000000, 2)  # Even numbers
list2 = range(1, 1000000, 2)  # Odd numbers

# Only creates iterator, doesn't process all elements
merged = heapq.merge(list1, list2)

# Process only what you need
first_10 = [next(merged) for _ in range(10)]
print(first_10)  # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]`
        }
      ],
      notes: [
        'Returns an iterator (lazy evaluation)',
        'Input iterables must already be sorted',
        'More efficient than concatenating and sorting',
        'Useful for merging large files',
        'Maintains sort stability'
      ],
      useCases: [
        'Merging sorted files',
        'Combining sorted streams',
        'K-way merge sort',
        'Log file aggregation'
      ]
    }
  ]

  const categories = [...new Set(heapMethods.map(m => m.category))]

  const filteredMethods = heapMethods.filter(method =>
    method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    method.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleBackClick = () => {
    if (selectedMethod) {
      setSelectedMethod(null)
    } else {
      onBack()
    }
  }

  if (selectedMethod) {
    return (
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <button
          onClick={handleBackClick}
          style={{
            marginBottom: '1.5rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#3776ab',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          ← Back to Methods
        </button>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          {/* Header */}
          <div style={{ marginBottom: '2rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
              <h1 style={{ margin: 0, color: '#1e293b', fontSize: '2rem' }}>{selectedMethod.name}</h1>
              <span style={{
                padding: '0.25rem 0.75rem',
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                {selectedMethod.category}
              </span>
            </div>
            <p style={{ color: '#64748b', fontSize: '1.1rem', margin: '0.5rem 0 0 0' }}>
              {selectedMethod.description}
            </p>
          </div>

          {/* Signature */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#1e293b', marginBottom: '0.75rem', fontSize: '1.25rem' }}>Signature</h3>
            <pre style={{
              backgroundColor: '#1e293b',
              color: '#e2e8f0',
              padding: '1rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'monospace',
              margin: 0,
              overflow: 'auto'
            }}>
              {selectedMethod.signature}
            </pre>
          </div>

          {/* Parameters */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#1e293b', marginBottom: '0.75rem', fontSize: '1.25rem' }}>Parameters</h3>
            {selectedMethod.parameters.map((param, idx) => (
              <div key={idx} style={{
                backgroundColor: '#f8fafc',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '0.5rem',
                borderLeft: '4px solid #3776ab'
              }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                  <code style={{
                    backgroundColor: '#e0e7ff',
                    color: '#3730a3',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {param.name}
                  </code>
                  <span style={{ color: '#64748b', fontSize: '0.875rem' }}>
                    ({param.type})
                    {param.optional && <span style={{ color: '#f59e0b' }}> - optional</span>}
                  </span>
                </div>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem' }}>{param.description}</p>
              </div>
            ))}
          </div>

          {/* Returns */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#1e293b', marginBottom: '0.75rem', fontSize: '1.25rem' }}>Returns</h3>
            <div style={{
              backgroundColor: '#dcfce7',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #16a34a'
            }}>
              <p style={{ color: '#166534', margin: 0, fontWeight: '500' }}>{selectedMethod.returns}</p>
            </div>
          </div>

          {/* Complexity */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#1e293b', marginBottom: '0.75rem', fontSize: '1.25rem' }}>Complexity</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{
                backgroundColor: '#fef3c7',
                padding: '1rem',
                borderRadius: '8px',
                borderLeft: '4px solid #f59e0b'
              }}>
                <div style={{ color: '#92400e', fontWeight: '600', marginBottom: '0.25rem' }}>Time Complexity</div>
                <code style={{ color: '#78350f' }}>{selectedMethod.timeComplexity}</code>
              </div>
              <div style={{
                backgroundColor: '#e0e7ff',
                padding: '1rem',
                borderRadius: '8px',
                borderLeft: '4px solid #6366f1'
              }}>
                <div style={{ color: '#3730a3', fontWeight: '600', marginBottom: '0.25rem' }}>Space Complexity</div>
                <code style={{ color: '#312e81' }}>{selectedMethod.spaceComplexity}</code>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#1e293b', marginBottom: '0.75rem', fontSize: '1.25rem' }}>Examples</h3>
            {selectedMethod.examples.map((example, idx) => (
              <div key={idx} style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#475569', marginBottom: '0.5rem', fontSize: '1rem' }}>{example.title}</h4>
                <pre style={{
                  backgroundColor: '#1e293b',
                  color: '#e2e8f0',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  overflow: 'auto',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  <code>{example.code}</code>
                </pre>
              </div>
            ))}
          </div>

          {/* Important Notes */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#1e293b', marginBottom: '0.75rem', fontSize: '1.25rem' }}>Important Notes</h3>
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              {selectedMethod.notes.map((note, idx) => (
                <li key={idx} style={{ color: '#475569', marginBottom: '0.5rem', lineHeight: '1.6' }}>
                  {note}
                </li>
              ))}
            </ul>
          </div>

          {/* Use Cases */}
          <div>
            <h3 style={{ color: '#1e293b', marginBottom: '0.75rem', fontSize: '1.25rem' }}>Common Use Cases</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {selectedMethod.useCases.map((useCase, idx) => (
                <div key={idx} style={{
                  backgroundColor: '#f0fdf4',
                  color: '#166534',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  border: '1px solid #bbf7d0'
                }}>
                  {useCase}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <button
        onClick={handleBackClick}
        style={{
          marginBottom: '1.5rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: '#3776ab',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '600'
        }}
      >
        ← Back to Python Topics
      </button>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>📚</span> Python heapq Module Reference
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem', margin: 0 }}>
          Complete documentation for all heapq module methods with examples and complexity analysis
        </p>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search methods... (e.g., 'nsmallest', 'push', 'merge')"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = '#3776ab'}
          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
        />
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {categories.map((category) => {
          const count = heapMethods.filter(m => m.category === category).length
          return (
            <div key={category} style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#e0e7ff',
              color: '#3730a3',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              {category} ({count})
            </div>
          )
        })}
      </div>

      {/* Methods Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => setSelectedMethod(method)}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.2s',
              border: '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
              e.currentTarget.style.borderColor = '#3776ab'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
              e.currentTarget.style.borderColor = 'transparent'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.25rem' }}>{method.name}</h3>
              <span style={{
                padding: '0.25rem 0.5rem',
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                {method.category}
              </span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1rem' }}>
              {method.description}
            </p>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#64748b' }}>
              <div>
                <span style={{ fontWeight: '600' }}>Time:</span> {method.timeComplexity}
              </div>
              <div>
                <span style={{ fontWeight: '600' }}>Space:</span> {method.spaceComplexity}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMethods.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#94a3b8',
          fontSize: '1.1rem'
        }}>
          No methods found matching "{searchTerm}"
        </div>
      )}
    </div>
  )
}

export default PythonHeapsReference

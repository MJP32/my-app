import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

function Itertools({ onBack, breadcrumb }) {
  const [selectedConcept, setSelectedConcept] = useState(null)

  const parseCodeSections = (codeString) => {
    const sections = codeString.split('\n\n')
    return sections.map((section, index) => ({
      id: index,
      code: section.trim()
    }))
  }

  const concepts = [
    {
      id: 'infinite-iterators',
      name: 'Infinite Iterators',
      icon: '∞',
      color: '#3b82f6',
      description: 'count(), cycle(), repeat() - Create infinite sequences',
      explanation: 'Infinite iterators generate values endlessly. Use them with caution and always have a termination condition.',
      complexity: 'Time: O(1) per iteration | Space: O(1)',
      codeExample: `from itertools import count, cycle, repeat

# count(start=0, step=1) - infinite counter
counter = count(10, 2)  # 10, 12, 14, 16, ...
print(list(zip(range(5), counter)))  # [(0, 10), (1, 12), (2, 14), (3, 16), (4, 18)]

# cycle(iterable) - repeat sequence infinitely
colors = cycle(['red', 'green', 'blue'])
print([next(colors) for _ in range(7)])  # ['red', 'green', 'blue', 'red', 'green', 'blue', 'red']

# repeat(object, times=None) - repeat value
print(list(repeat('A', 4)))  # ['A', 'A', 'A', 'A']

# Practical: Round-robin scheduling
tasks = ['T1', 'T2', 'T3']
scheduler = cycle(tasks)
schedule = [next(scheduler) for _ in range(10)]
print(schedule)  # ['T1', 'T2', 'T3', 'T1', 'T2', 'T3', 'T1', 'T2', 'T3', 'T1']`
    },
    {
      id: 'combinatorics',
      name: 'Combinatorics',
      icon: '🎲',
      color: '#8b5cf6',
      description: 'permutations(), combinations(), product() - Generate all possible arrangements',
      explanation: 'Create all permutations, combinations, and cartesian products of sequences.',
      complexity: 'Time: O(n!) for permutations, O(n^k) for product | Space: O(r) per iteration',
      codeExample: `from itertools import permutations, combinations, combinations_with_replacement, product

# permutations(iterable, r=None) - all orderings
print(list(permutations('ABC', 2)))
# [('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'C'), ('C', 'A'), ('C', 'B')]

# combinations(iterable, r) - unique selections (order doesn't matter)
print(list(combinations('ABC', 2)))
# [('A', 'B'), ('A', 'C'), ('B', 'C')]

# combinations_with_replacement(iterable, r) - allow repeats
print(list(combinations_with_replacement('AB', 2)))
# [('A', 'A'), ('A', 'B'), ('B', 'B')]

# product(*iterables, repeat=1) - cartesian product
print(list(product('AB', '12')))
# [('A', '1'), ('A', '2'), ('B', '1'), ('B', '2')]

print(list(product('AB', repeat=2)))
# [('A', 'A'), ('A', 'B'), ('B', 'A'), ('B', 'B')]

# Practical: Generate all phone number combinations
digits = product('123', repeat=3)
phone_numbers = [''.join(combo) for combo in list(digits)[:5]]
print(phone_numbers)  # ['111', '112', '113', '121', '122']`
    },
    {
      id: 'slicing-filtering',
      name: 'Slicing & Filtering',
      icon: '✂️',
      color: '#10b981',
      description: 'islice(), filterfalse(), compress(), dropwhile(), takewhile()',
      explanation: 'Efficiently slice, filter, and extract portions of iterators without materializing the entire sequence.',
      complexity: 'Time: O(n) | Space: O(1) - lazy evaluation',
      codeExample: `from itertools import islice, filterfalse, compress, dropwhile, takewhile

data = range(1, 21)  # 1 to 20

# islice(iterable, start, stop, step) - lazy slicing
print(list(islice(data, 5)))  # [1, 2, 3, 4, 5]
print(list(islice(data, 2, 10, 2)))  # [3, 5, 7, 9]

# filterfalse(predicate, iterable) - opposite of filter
is_even = lambda x: x % 2 == 0
print(list(filterfalse(is_even, range(10))))  # [1, 3, 5, 7, 9]

# compress(data, selectors) - filter by boolean mask
letters = 'ABCDEFG'
selectors = [1, 0, 1, 0, 1, 1, 0]
print(list(compress(letters, selectors)))  # ['A', 'C', 'E', 'F']

# dropwhile(predicate, iterable) - drop elements while predicate is true
nums = [1, 4, 6, 4, 1]
print(list(dropwhile(lambda x: x < 5, nums)))  # [6, 4, 1] (stops at first False)

# takewhile(predicate, iterable) - take elements while predicate is true
print(list(takewhile(lambda x: x < 5, nums)))  # [1, 4]

# Practical: Process file until marker
lines = ['header', 'data1', 'data2', '---END---', 'footer']
content = list(takewhile(lambda x: x != '---END---', lines))
print(content)  # ['header', 'data1', 'data2']`
    },
    {
      id: 'grouping-accumulating',
      name: 'Grouping & Accumulating',
      icon: '📊',
      color: '#f59e0b',
      description: 'groupby(), accumulate() - Group consecutive items and running totals',
      explanation: 'Group consecutive items by key function or compute running totals/products.',
      complexity: 'Time: O(n) | Space: O(k) where k is group size',
      codeExample: `from itertools import groupby, accumulate
import operator

# groupby(iterable, key=None) - groups consecutive items by key
data = [('A', 1), ('A', 2), ('B', 3), ('B', 4), ('C', 5)]
for key, group in groupby(data, key=lambda x: x[0]):
    print(f"{key}: {list(group)}")
# A: [('A', 1), ('A', 2)]
# B: [('B', 3), ('B', 4)]
# C: [('C', 5)]

# Must be sorted by key first for non-consecutive grouping
words = ['apple', 'ant', 'banana', 'bear', 'cat']
sorted_words = sorted(words, key=lambda x: x[0])
for letter, group in groupby(sorted_words, key=lambda x: x[0]):
    print(f"{letter}: {list(group)}")

# accumulate(iterable, func=operator.add, initial=None) - running totals
nums = [1, 2, 3, 4, 5]
print(list(accumulate(nums)))  # [1, 3, 6, 10, 15] (cumulative sum)

print(list(accumulate(nums, operator.mul)))  # [1, 2, 6, 24, 120] (factorial)

print(list(accumulate(nums, max)))  # [1, 2, 3, 4, 5] (running max)

# Practical: Running balance in bank account
transactions = [100, -20, -30, 50, -10]
balance = list(accumulate(transactions, initial=0))
print(balance)  # [0, 100, 80, 50, 100, 90]`
    },
    {
      id: 'chaining-zipping',
      name: 'Chaining & Zipping',
      icon: '🔗',
      color: '#ec4899',
      description: 'chain(), zip_longest(), tee() - Combine and duplicate iterators',
      explanation: 'Combine multiple iterators or create independent copies of a single iterator.',
      complexity: 'Time: O(n) | Space: O(1) for chain, O(n) for tee',
      codeExample: `from itertools import chain, zip_longest, tee

# chain(*iterables) - concatenate iterators
list1 = [1, 2, 3]
list2 = ['a', 'b', 'c']
list3 = [True, False]
print(list(chain(list1, list2, list3)))  # [1, 2, 3, 'a', 'b', 'c', True, False]

# chain.from_iterable(iterable) - flatten one level
nested = [[1, 2], [3, 4], [5]]
print(list(chain.from_iterable(nested)))  # [1, 2, 3, 4, 5]

# zip_longest(*iterables, fillvalue=None) - zip with padding
names = ['Alice', 'Bob', 'Charlie']
scores = [95, 87]
print(list(zip_longest(names, scores, fillvalue=0)))
# [('Alice', 95), ('Bob', 87), ('Charlie', 0)]

# tee(iterable, n=2) - create n independent iterators
data = range(5)
iter1, iter2 = tee(data, 2)
print(list(iter1))  # [0, 1, 2, 3, 4]
print(list(iter2))  # [0, 1, 2, 3, 4]

# Practical: Pairwise iteration (sliding window of 2)
def pairwise(iterable):
    a, b = tee(iterable)
    next(b, None)
    return zip(a, b)

nums = [1, 2, 3, 4, 5]
print(list(pairwise(nums)))  # [(1, 2), (2, 3), (3, 4), (4, 5)]`
    },
    {
      id: 'advanced-patterns',
      name: 'Advanced Patterns',
      icon: '🚀',
      color: '#6366f1',
      description: 'starmap(), batched(), pairwise() - Advanced iterator utilities',
      explanation: 'Specialized itertools for complex iteration patterns and batch processing.',
      complexity: 'Time: O(n) | Space: O(batch_size)',
      codeExample: `from itertools import starmap, islice
import operator

# starmap(function, iterable) - map function with unpacked arguments
pairs = [(2, 3), (4, 5), (6, 7)]
print(list(starmap(operator.mul, pairs)))  # [6, 20, 42]
print(list(starmap(pow, pairs)))  # [8, 1024, 279936]

# Custom batched function (batched is in Python 3.12+)
def batched(iterable, n):
    """Batch data into lists of length n"""
    iterator = iter(iterable)
    while batch := list(islice(iterator, n)):
        yield batch

data = range(10)
print(list(batched(data, 3)))  # [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]]

# Practical: Moving average
def moving_average(iterable, n=3):
    """Calculate moving average with window size n"""
    from itertools import islice, tee
    iterators = tee(iterable, n)
    for i, it in enumerate(iterators):
        for _ in range(i):
            next(it, None)
    windows = zip(*iterators)
    return (sum(window) / n for window in windows)

nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
print(list(moving_average(nums, 3)))  # [2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0]

# Practical: Flatten nested lists
def flatten(nested_list):
    from itertools import chain
    return chain.from_iterable(nested_list)

matrix = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]
print(list(flatten(matrix)))  # [1, 2, 3, 4, 5, 6, 7, 8, 9]`
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
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: '#93c5fd'
              }}>
                Overview
              </h3>
              <div style={{
                color: '#d1d5db',
                lineHeight: '1.7',
                marginBottom: '1rem'
              }}>
                <strong style={{ color: '#60a5fa' }}>Description:</strong> {concept.description}
              </div>
              <div style={{
                color: '#d1d5db',
                lineHeight: '1.7',
                marginBottom: '1rem'
              }}>
                <strong style={{ color: '#60a5fa' }}>Explanation:</strong> {concept.explanation}
              </div>
              <div style={{
                color: '#fbbf24',
                fontWeight: '600'
              }}>
                <strong>⚡ Complexity:</strong> {concept.complexity}
              </div>
            </div>

            <div style={{
              background: '#1f2937',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              border: '1px solid #3b82f6'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: '#93c5fd'
              }}>
                Code Examples
              </h3>
              {parseCodeSections(concept.codeExample).map(
                (section, idx) => (
                  <div key={section.id} style={{ marginBottom: '1rem' }}>
                    <div
                      style={{
                        width: '100%',
                        background: '#2563eb',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        marginBottom: '0.5rem',
                        textAlign: 'left',
                        fontWeight: '500',
                        fontSize: '1rem'
                      }}
                    >
                      Code Block {idx + 1}
                    </div>
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
                  </div>
                )
              )}
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
              ← Back to Python
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🔄 Itertools Module
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
            Master Python's itertools for efficient iteration patterns. Build complex iterators from simple building blocks.
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
                fontSize: '0.875rem'
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

export default Itertools

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
      .replace(/\b(print|len|range|enumerate|zip|map|filter|sorted|sum|max|min|list|dict|set|tuple|itertools|chain|cycle|repeat|count|islice|combinations|permutations|product|groupby|accumulate|compress|dropwhile|takewhile|filterfalse|starmap|tee|zip_longest)\b/g, '<span style="color: #dcdcaa;">$1</span>')
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

function Itertools({ onBack }) {
  const [selectedConcept, setSelectedConcept] = useState(null)

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
          ← Back to Itertools
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
          🔄 Itertools Module
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#6b7280',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          Master Python's itertools for efficient iteration patterns. Build complex iterators from simple building blocks.
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

export default Itertools

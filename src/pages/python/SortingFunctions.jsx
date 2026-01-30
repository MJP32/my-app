import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

function SortingFunctions({ onBack, breadcrumb }) {
  const [selectedConcept, setSelectedConcept] = useState(null)

  // Compute extended breadcrumb when a concept is selected
  const activeBreadcrumb = selectedConcept ? {
    onMainMenu: breadcrumb?.onMainMenu,
    section: breadcrumb.section,
    category: breadcrumb.category,
    subcategory: {
      name: breadcrumb.topic,
      onClick: () => setSelectedConcept(null)
    },
    topic: selectedConcept.name,
    colors: breadcrumb.colors
  } : breadcrumb

  const parseCodeSections = (codeString) => {
    const sections = codeString.split('\n\n')
    return sections.map((section, index) => ({
      id: index,
      code: section.trim()
    }))
  }

  const concepts = [
    {
      id: 'sorted-vs-sort',
      name: 'sorted() vs list.sort()',
      icon: '🔤',
      color: '#3b82f6',
      description: 'Understand the difference between sorted() function and list.sort() method',
      explanation: 'sorted() returns a new sorted list and works on any iterable. list.sort() modifies the list in-place and only works on lists. Both are stable sorts (preserve order of equal elements).',
      complexity: 'Time: O(n log n) | Space: sorted() O(n), sort() O(1)',
      codeExample: `# sorted() - returns new sorted list (works on any iterable)
nums = [3, 1, 4, 1, 5, 9, 2]
sorted_nums = sorted(nums)
print(sorted_nums)  # [1, 1, 2, 3, 4, 5, 9]
print(nums)         # [3, 1, 4, 1, 5, 9, 2] (original unchanged)

# Works on any iterable
print(sorted("python"))  # ['h', 'n', 'o', 'p', 't', 'y']
print(sorted({3, 1, 2})) # [1, 2, 3]

# list.sort() - modifies list in-place
nums = [3, 1, 4, 1, 5, 9, 2]
nums.sort()
print(nums)  # [1, 1, 2, 3, 4, 5, 9]

# sort() returns None!
result = nums.sort()
print(result)  # None

# Reverse sorting
nums = [3, 1, 4, 1, 5, 9, 2]
print(sorted(nums, reverse=True))  # [9, 5, 4, 3, 2, 1, 1]

nums.sort(reverse=True)
print(nums)  # [9, 5, 4, 3, 2, 1, 1]

# When to use which?
# Use sorted() when:
# - You need to preserve original list
# - Working with non-list iterables
# - You need the sorted result as return value

# Use sort() when:
# - Memory efficiency is important (no copy)
# - You want to modify list in place
# - Working with large lists`
    },
    {
      id: 'key-functions',
      name: 'Key Functions & Lambda',
      icon: '🔑',
      color: '#10b981',
      description: 'Custom sorting with key parameter and lambda functions',
      explanation: 'The key parameter accepts a function that extracts a comparison key from each element. This is more efficient than custom comparison functions.',
      complexity: 'Time: O(n log n) | Space: O(n) for key extraction',
      codeExample: `# Sort by string length
words = ['python', 'is', 'awesome', 'and', 'powerful']
print(sorted(words, key=len))
# ['is', 'and', 'python', 'awesome', 'powerful']

# Sort by absolute value
nums = [-5, -1, -3, 2, 4, -2]
print(sorted(nums, key=abs))
# [-1, 2, -2, -3, 4, -5]

# Sort strings case-insensitive
words = ['banana', 'Apple', 'cherry', 'Date']
print(sorted(words))  # ['Apple', 'Date', 'banana', 'cherry'] (ASCII order)
print(sorted(words, key=str.lower))  # ['Apple', 'banana', 'cherry', 'Date']

# Sort by last character
words = ['apple', 'kiwi', 'orange', 'grape']
print(sorted(words, key=lambda x: x[-1]))
# ['orange', 'apple', 'grape', 'kiwi']

# Sort tuples by second element
students = [('Alice', 85), ('Bob', 92), ('Charlie', 78), ('David', 92)]
print(sorted(students, key=lambda x: x[1]))
# [('Charlie', 78), ('Alice', 85), ('Bob', 92), ('David', 92)]

# Sort by multiple criteria (name if score is same)
print(sorted(students, key=lambda x: (x[1], x[0])))
# [('Charlie', 78), ('Alice', 85), ('Bob', 92), ('David', 92)]

# Reverse only the key (not the whole sort)
print(sorted(students, key=lambda x: -x[1]))  # Negate for numbers
# [('Bob', 92), ('David', 92), ('Alice', 85), ('Charlie', 78)]

# Using operator module (more efficient than lambda)
from operator import itemgetter, attrgetter

print(sorted(students, key=itemgetter(1)))  # Sort by score
print(sorted(students, key=itemgetter(1, 0)))  # Sort by score, then name`
    },
    {
      id: 'dict-sorting',
      name: 'Sorting Dictionaries',
      icon: '📖',
      color: '#8b5cf6',
      description: 'Sort dictionaries by keys, values, or custom criteria',
      explanation: 'Dictionaries maintain insertion order (Python 3.7+). You can sort by keys or values and create a new sorted dict, or use sorted() to get sorted items.',
      complexity: 'Time: O(n log n) | Space: O(n)',
      codeExample: `# Sample dictionary
scores = {'Alice': 85, 'Bob': 92, 'Charlie': 78, 'David': 92}

# Sort by keys (alphabetically)
sorted_by_key = dict(sorted(scores.items()))
print(sorted_by_key)
# {'Alice': 85, 'Bob': 92, 'Charlie': 78, 'David': 92}

# Sort by keys (reverse)
sorted_by_key_rev = dict(sorted(scores.items(), reverse=True))
print(sorted_by_key_rev)
# {'David': 92, 'Charlie': 78, 'Bob': 92, 'Alice': 85}

# Sort by values (ascending)
sorted_by_value = dict(sorted(scores.items(), key=lambda item: item[1]))
print(sorted_by_value)
# {'Charlie': 78, 'Alice': 85, 'Bob': 92, 'David': 92}

# Sort by values (descending)
sorted_by_value_desc = dict(sorted(scores.items(), key=lambda item: item[1], reverse=True))
print(sorted_by_value_desc)
# {'Bob': 92, 'David': 92, 'Alice': 85, 'Charlie': 78}

# Sort by value, then by key (for ties)
sorted_complex = dict(sorted(scores.items(), key=lambda item: (item[1], item[0])))
print(sorted_complex)
# {'Charlie': 78, 'Alice': 85, 'Bob': 92, 'David': 92}

# Get only keys in sorted order
print(sorted(scores.keys()))  # ['Alice', 'Bob', 'Charlie', 'David']

# Get only values in sorted order
print(sorted(scores.values()))  # [78, 85, 92, 92]

# Using operator.itemgetter (more efficient)
from operator import itemgetter
sorted_by_value = dict(sorted(scores.items(), key=itemgetter(1)))

# Top N items by value
from heapq import nlargest
top_2 = dict(nlargest(2, scores.items(), key=itemgetter(1)))
print(top_2)  # {'Bob': 92, 'David': 92}

# Nested dict sorting
data = {
    'item1': {'price': 100, 'stock': 5},
    'item2': {'price': 50, 'stock': 10},
    'item3': {'price': 75, 'stock': 3}
}
sorted_by_price = dict(sorted(data.items(), key=lambda x: x[1]['price']))
print(sorted_by_price)
# {'item2': {...}, 'item3': {...}, 'item1': {...}}`
    },
    {
      id: 'complex-sorting',
      name: 'Multi-Level & Complex Sorting',
      icon: '🎯',
      color: '#f59e0b',
      description: 'Sort by multiple keys, custom objects, and complex criteria',
      explanation: 'Python uses tuple comparison for multi-level sorting. You can sort by multiple attributes and mix ascending/descending orders.',
      complexity: 'Time: O(n log n) | Space: O(n)',
      codeExample: `# Sort by multiple keys (tuple comparison)
students = [
    ('Alice', 'A', 85),
    ('Bob', 'B', 92),
    ('Charlie', 'A', 92),
    ('David', 'B', 85)
]

# Sort by grade (index 2), then name (index 0)
sorted_students = sorted(students, key=lambda x: (x[2], x[0]))
print(sorted_students)
# [('Alice', 'A', 85), ('David', 'B', 85), ('Bob', 'B', 92), ('Charlie', 'A', 92)]

# Sort by section, then grade (descending), then name
sorted_complex = sorted(students, key=lambda x: (x[1], -x[2], x[0]))
print(sorted_complex)
# [('Charlie', 'A', 92), ('Alice', 'A', 85), ('Bob', 'B', 92), ('David', 'B', 85)]

# Custom class sorting
class Person:
    def __init__(self, name, age, salary):
        self.name = name
        self.age = age
        self.salary = salary

    def __repr__(self):
        return f"Person({self.name}, {self.age}, ${self.salary})"

people = [
    Person('Alice', 30, 75000),
    Person('Bob', 25, 80000),
    Person('Charlie', 30, 70000)
]

# Sort by age, then salary (descending)
from operator import attrgetter
sorted_people = sorted(people, key=lambda p: (p.age, -p.salary))
print(sorted_people)
# [Person(Bob, 25, $80000), Person(Alice, 30, $75000), Person(Charlie, 30, $70000)]

# Using attrgetter (more efficient)
sorted_by_name = sorted(people, key=attrgetter('name'))
sorted_by_age_salary = sorted(people, key=attrgetter('age', 'salary'))

# Stable sort - chained sorting (inefficient but sometimes needed)
# First sort by secondary key, then by primary key
people_copy = people.copy()
people_copy.sort(key=attrgetter('salary'), reverse=True)  # Secondary
people_copy.sort(key=attrgetter('age'))  # Primary (stable, preserves salary order)
print(people_copy)

# Sort with None values (push to end)
data = [5, None, 2, None, 8, 1]
sorted_data = sorted(data, key=lambda x: (x is None, x))
print(sorted_data)  # [1, 2, 5, 8, None, None]

# Case-insensitive with secondary case-sensitive sort
words = ['apple', 'Apple', 'banana', 'Banana', 'cherry']
sorted_words = sorted(words, key=lambda x: (x.lower(), x))
print(sorted_words)  # ['apple', 'Apple', 'banana', 'Banana', 'cherry']`
    },
    {
      id: 'custom-comparison',
      name: 'Custom Comparison Functions',
      icon: '⚖️',
      color: '#ec4899',
      description: 'Advanced sorting with functools.cmp_to_key and custom comparators',
      explanation: 'For complex comparison logic that cannot be expressed with a key function, use cmp_to_key to convert old-style comparison functions.',
      complexity: 'Time: O(n log n) with higher constant factor | Space: O(n)',
      codeExample: `from functools import cmp_to_key

# Custom comparison function (returns -1, 0, or 1)
def compare_length_then_alpha(a, b):
    """Sort by length first, then alphabetically"""
    if len(a) != len(b):
        return len(a) - len(b)  # Shorter first
    if a < b:
        return -1
    elif a > b:
        return 1
    else:
        return 0

words = ['python', 'is', 'awesome', 'and', 'fun']
sorted_words = sorted(words, key=cmp_to_key(compare_length_then_alpha))
print(sorted_words)  # ['is', 'and', 'fun', 'python', 'awesome']

# Version string sorting (e.g., '1.2.10' vs '1.2.9')
def compare_versions(v1, v2):
    """Compare version strings numerically"""
    parts1 = [int(x) for x in v1.split('.')]
    parts2 = [int(x) for x in v2.split('.')]

    # Pad shorter version with zeros
    max_len = max(len(parts1), len(parts2))
    parts1.extend([0] * (max_len - len(parts1)))
    parts2.extend([0] * (max_len - len(parts2)))

    if parts1 < parts2:
        return -1
    elif parts1 > parts2:
        return 1
    return 0

versions = ['1.2.10', '1.2.9', '1.10.0', '1.2.1', '2.0.0']
sorted_versions = sorted(versions, key=cmp_to_key(compare_versions))
print(sorted_versions)  # ['1.2.1', '1.2.9', '1.2.10', '1.10.0', '2.0.0']

# Practical: Sort playing cards by custom rules
# Order: Rank (2-10, J, Q, K, A), then Suit (♣, ♦, ♥, ♠)
def compare_cards(card1, card2):
    rank_order = {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
                  '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14}
    suit_order = {'♣': 1, '♦': 2, '♥': 3, '♠': 4}

    rank1, suit1 = card1[:-1], card1[-1]
    rank2, suit2 = card2[:-1], card2[-1]

    if rank_order[rank1] != rank_order[rank2]:
        return rank_order[rank1] - rank_order[rank2]
    return suit_order[suit1] - suit_order[suit2]

cards = ['A♠', '2♣', 'K♥', '2♦', 'A♣', 'K♠']
sorted_cards = sorted(cards, key=cmp_to_key(compare_cards))
print(sorted_cards)  # ['2♣', '2♦', 'K♥', 'K♠', 'A♣', 'A♠']

# Locale-aware sorting (for international text)
import locale
# locale.setlocale(locale.LC_ALL, 'en_US.UTF-8')
# sorted_intl = sorted(words, key=locale.strxfrm)`
    },
    {
      id: 'performance-tips',
      name: 'Performance & Best Practices',
      icon: '⚡',
      color: '#6366f1',
      description: 'Sorting performance tips, stability, and common pitfalls',
      explanation: 'Python uses Timsort (hybrid stable sort). Understanding performance characteristics and best practices helps write efficient sorting code.',
      complexity: 'Time: O(n log n) average, O(n) best case | Space: O(n)',
      codeExample: `# Timsort is optimized for partially sorted data
# Already sorted or reverse sorted: O(n) time!
sorted_data = list(range(1000000))
import time

start = time.time()
sorted(sorted_data)  # Very fast!
print(f"Sorted data: {time.time() - start:.4f}s")

start = time.time()
sorted(sorted_data, reverse=True)  # Also fast!
print(f"Reverse sorted: {time.time() - start:.4f}s")

# Key function is called only ONCE per element (efficient)
# Bad: lambda called multiple times during comparison
# Good: result cached

# Prefer operator functions over lambda (faster)
from operator import itemgetter, attrgetter

students = [('Alice', 85), ('Bob', 92), ('Charlie', 78)]

# Slower
sorted(students, key=lambda x: x[1])

# Faster
sorted(students, key=itemgetter(1))

# Stability: Equal elements maintain original order
data = [('a', 1), ('b', 1), ('c', 2), ('d', 1)]
sorted_data = sorted(data, key=lambda x: x[1])
print(sorted_data)
# [('a', 1), ('b', 1), ('d', 1), ('c', 2)]  # Original order preserved!

# Use stability for multi-level sorting (alternative approach)
students = [('Alice', 'A', 85), ('Bob', 'B', 92), ('Charlie', 'A', 92)]

# Sort by grade, then section (using stability)
students.sort(key=lambda x: x[1])  # First by section
students.sort(key=lambda x: x[2])  # Then by grade (stable!)
print(students)

# Decorate-Sort-Undecorate (DSU) pattern (rarely needed now)
# Old way to avoid repeated key function calls
data = ['python', 'is', 'awesome']
decorated = [(len(word), word) for word in data]  # Decorate
decorated.sort()  # Sort
result = [word for _, word in decorated]  # Undecorate
# Now just use: sorted(data, key=len)

# Sorting large datasets: consider external sorting or databases

# Common pitfalls
# 1. Don't sort dict.values() if you need keys
scores = {'Alice': 85, 'Bob': 92}
# Wrong: sorted(scores.values())  # [85, 92] - lost keys!
# Right: sorted(scores.items(), key=lambda x: x[1])

# 2. Remember sort() returns None
nums = [3, 1, 2]
# result = nums.sort()  # Wrong! result is None
nums.sort()  # Right! Check nums

# 3. Use sorted() for chaining
nums = [3, 1, 2]
result = sorted(nums)[:3]  # OK: returns list
# nums.sort()[:3]  # Error! sort() returns None

# 4. Sorting with None values
data = [5, None, 2, 8]
# sorted(data)  # TypeError in Python 3
sorted(data, key=lambda x: (x is None, x or 0))  # OK`
    }
  ]

  if (selectedConcept) {
    const concept = concepts.find(c => c.id === selectedConcept)
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
          <button
            onClick={() => setSelectedConcept(null)}
            style={{
              marginBottom: '2rem',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#1d4ed8'
              e.target.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#2563eb'
              e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
          >
            ← Back to Sorting
          </button>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            borderRadius: '0.75rem',
            padding: '2rem',
            border: '2px solid #3b82f6',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '3rem' }}>{concept.icon}</span>
              <div>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  color: '#93c5fd',
                  margin: 0,
                  marginBottom: '0.5rem'
                }}>
                  {concept.name}
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#d1d5db',
                  margin: 0
                }}>
                  {concept.description}
                </p>
              </div>
            </div>

            <div style={{
              padding: '1rem',
              background: '#1f2937',
              borderLeft: '4px solid #3b82f6',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem',
              border: '1px solid #3b82f6'
            }}>
              <p style={{ margin: 0, color: '#d1d5db', lineHeight: '1.7' }}>
                <strong style={{ color: '#93c5fd' }}>💡 Explanation:</strong> {concept.explanation}
              </p>
            </div>

            <div style={{
              padding: '1rem',
              background: '#1f2937',
              borderLeft: '4px solid #60a5fa',
              borderRadius: '0.5rem',
              marginBottom: '2rem',
              border: '1px solid #3b82f6'
            }}>
              <p style={{ margin: 0, color: '#93c5fd', fontWeight: '600' }}>
                ⚡ Complexity: {concept.complexity}
              </p>
            </div>

            <div style={{
              backgroundColor: '#1e293b',
              borderRadius: '0.5rem',
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
                        margin: 0,
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem',
                        background: 'none',
                        backgroundColor: 'transparent',
                        padding: 0
                      }}
                    >
                      {section.code}
                    </SyntaxHighlighter>
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
              🔤 Sorting Functions
            </h1>
          </div>
        </div>

        <Breadcrumb breadcrumb={activeBreadcrumb} onMainMenu={breadcrumb?.onMainMenu} />

        <div style={{ textAlign: 'left', marginBottom: '3rem' }}>
          <p style={{
            fontSize: '1.2rem',
            color: '#d1d5db',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Master Python sorting with sorted(), sort(), key functions, and advanced techniques. Learn to sort lists, dictionaries, and complex objects efficiently.
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
                textAlign: 'left',
                marginBottom: '0.75rem',
                color: '#93c5fd'
              }}>
                {concept.name}
              </h3>
              <p style={{
                color: '#d1d5db',
                textAlign: 'left',
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

export default SortingFunctions

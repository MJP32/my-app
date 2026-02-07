import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function IndexSlicing({ onBack, breadcrumb }) {
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

  const parseCodeSections = (code) => {
    const sections = []
    const lines = code.split('\n')
    let currentSection = null
    let currentContent = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.includes('# ═══════════════════════════════════════════════════════════════')) {
        if (currentSection) {
          sections.push({
            title: currentSection,
            code: currentContent.join('\n')
          })
          currentContent = []
        }

        if (i + 1 < lines.length && lines[i + 1].includes('# ✦')) {
          currentSection = lines[i + 1].replace('# ✦', '').trim()
          i += 2
          continue
        }
      }

      if (currentSection) {
        currentContent.push(line)
      }
    }

    if (currentSection && currentContent.length > 0) {
      sections.push({
        title: currentSection,
        code: currentContent.join('\n')
      })
    }

    return sections
  }

  const concepts = [
    {
      name: 'Basic Indexing',
      icon: '📍',
      explanation: `**Core Concept:**
• Access individual elements using zero-based indexing
• Positive indices count from the beginning: 0, 1, 2, 3...
• Negative indices count from the end: -1, -2, -3...
• Works with strings, lists, tuples, and any sequence type

**Syntax:**
• sequence[index] - Access single element
• index must be an integer
• IndexError raised if index out of range

**Positive Indexing:**
• Starts at 0 for first element
• Last element is at index len(sequence) - 1
• Example: [10, 20, 30] has indices 0, 1, 2

**Negative Indexing:**
• -1 refers to last element
• -2 refers to second-to-last element
• Convenient for accessing from end without knowing length
• Example: list[-1] gets last element

**Use Cases:**
• Accessing specific elements in arrays
• Getting first or last character of string
• Working with matrix elements
• Implementing algorithms that need element access`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Positive indexing - counting from start
# ═══════════════════════════════════════════════════════════════
text = "Python"
print(f"First character: {text[0]}")    # P
print(f"Second character: {text[1]}")   # y
print(f"Third character: {text[2]}")    # t

numbers = [10, 20, 30, 40, 50]
print(f"First number: {numbers[0]}")    # 10
print(f"Third number: {numbers[2]}")    # 30


# ═══════════════════════════════════════════════════════════════
# ✦ Negative indexing - counting from end
# ═══════════════════════════════════════════════════════════════
text = "Python"
print(f"Last character: {text[-1]}")        # n
print(f"Second to last: {text[-2]}")        # o
print(f"Third from end: {text[-3]}")        # h

numbers = [10, 20, 30, 40, 50]
print(f"Last number: {numbers[-1]}")        # 50
print(f"Second to last: {numbers[-2]}")     # 40


# ═══════════════════════════════════════════════════════════════
# ✦ Index relationship
# ═══════════════════════════════════════════════════════════════
data = ['a', 'b', 'c', 'd', 'e']
# Indices:  0    1    2    3    4
# Negative: -5   -4   -3   -2   -1

print(f"data[0] = {data[0]}")      # a
print(f"data[-5] = {data[-5]}")    # a (same element)
print(f"data[4] = {data[4]}")      # e
print(f"data[-1] = {data[-1]}")    # e (same element)


# ═══════════════════════════════════════════════════════════════
# ✦ Index errors
# ═══════════════════════════════════════════════════════════════
numbers = [1, 2, 3]
print(f"Valid: {numbers[2]}")       # 3

try:
    print(numbers[5])               # IndexError
except IndexError as e:
    print(f"Error: {e}")            # list index out of range


# ═══════════════════════════════════════════════════════════════
# ✦ Practical examples
# ═══════════════════════════════════════════════════════════════
# Get file extension
filename = "document.pdf"
extension = filename[-3:]
print(f"Extension: {extension}")    # pdf

# Get first and last elements
scores = [85, 92, 78, 95, 88]
first_score = scores[0]
last_score = scores[-1]
print(f"First: {first_score}, Last: {last_score}")  # First: 85, Last: 88

# Access matrix element
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print(f"Element at [1][2]: {matrix[1][2]}")  # 6`
    },
    {
      name: 'Slice Notation',
      icon: '✂️',
      explanation: `**Core Concept:**
• Extract subsequences using [start:stop:step] notation
• Returns new sequence containing selected elements
• Does not modify original sequence
• Works with all sequence types (strings, lists, tuples)

**Syntax:**
• sequence[start:stop:step]
• start - Beginning index (inclusive), default 0
• stop - Ending index (exclusive), default len(sequence)
• step - Increment between elements, default 1

**Default Values:**
• Omit start: slice from beginning
• Omit stop: slice to end
• Omit step: use step of 1
• All optional: [:] creates shallow copy

**Step Parameter:**
• Positive step - move forward
• Negative step - move backward (reverse)
• step=2 - every other element
• step=-1 - reverse sequence

**Important:**
• stop index is NOT included in result
• Negative indices work in slices
• Out-of-range indices don't raise errors (clamped)
• Empty slice returns empty sequence`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Basic slicing [start:stop]
# ═══════════════════════════════════════════════════════════════
text = "Python Programming"
print(text[0:6])        # Python (chars 0-5)
print(text[7:18])       # Programming (chars 7-17)
print(text[7:])         # Programming (from 7 to end)
print(text[:6])         # Python (from start to 5)
print(text[:])          # Python Programming (full copy)

numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(numbers[2:7])     # [2, 3, 4, 5, 6]
print(numbers[:5])      # [0, 1, 2, 3, 4]
print(numbers[5:])      # [5, 6, 7, 8, 9]


# ═══════════════════════════════════════════════════════════════
# ✦ Step parameter [start:stop:step]
# ═══════════════════════════════════════════════════════════════
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Every 2nd element
print(numbers[::2])     # [0, 2, 4, 6, 8]

# Every 3rd element
print(numbers[::3])     # [0, 3, 6, 9]

# Slice with step
print(numbers[1:8:2])   # [1, 3, 5, 7]

# Reverse with negative step
print(numbers[::-1])    # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]


# ═══════════════════════════════════════════════════════════════
# ✦ Negative indices in slices
# ═══════════════════════════════════════════════════════════════
text = "Python"
print(text[-4:-1])      # tho (from -4 to -2)
print(text[-3:])        # hon (last 3 chars)
print(text[:-2])        # Pyth (all but last 2)
print(text[-5:-2])      # yth

numbers = [10, 20, 30, 40, 50]
print(numbers[-3:])     # [30, 40, 50]
print(numbers[:-2])     # [10, 20, 30]
print(numbers[-4:-1])   # [20, 30, 40]


# ═══════════════════════════════════════════════════════════════
# ✦ Common patterns
# ═══════════════════════════════════════════════════════════════
data = [1, 2, 3, 4, 5, 6, 7, 8]

# First 3 elements
first_three = data[:3]
print(f"First 3: {first_three}")            # [1, 2, 3]

# Last 3 elements
last_three = data[-3:]
print(f"Last 3: {last_three}")              # [6, 7, 8]

# Everything except first and last
middle = data[1:-1]
print(f"Middle: {middle}")                  # [2, 3, 4, 5, 6, 7]

# Reverse
reversed_data = data[::-1]
print(f"Reversed: {reversed_data}")         # [8, 7, 6, 5, 4, 3, 2, 1]

# Even indices
evens = data[::2]
print(f"Even indices: {evens}")             # [1, 3, 5, 7]

# Odd indices
odds = data[1::2]
print(f"Odd indices: {odds}")               # [2, 4, 6, 8]


# ═══════════════════════════════════════════════════════════════
# ✦ String slicing examples
# ═══════════════════════════════════════════════════════════════
url = "https://www.example.com/page"

# Extract protocol
protocol = url[:5]
print(f"Protocol: {protocol}")              # https

# Extract domain (simplified)
domain = url[8:23]
print(f"Domain: {domain}")                  # www.example.com

# Reverse string
reversed_url = url[::-1]
print(f"Reversed: {reversed_url}")          # egap/moc.elpmaxe.www//:sptth


# ═══════════════════════════════════════════════════════════════
# ✦ List modification with slices
# ═══════════════════════════════════════════════════════════════
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Replace slice
numbers[2:5] = [20, 30, 40]
print(numbers)          # [0, 1, 20, 30, 40, 5, 6, 7, 8, 9]

# Delete slice
numbers = [0, 1, 2, 3, 4, 5]
del numbers[1:4]
print(numbers)          # [0, 4, 5]

# Insert elements
numbers = [1, 2, 5, 6]
numbers[2:2] = [3, 4]
print(numbers)          # [1, 2, 3, 4, 5, 6]


# ═══════════════════════════════════════════════════════════════
# ✦ Practical applications
# ═══════════════════════════════════════════════════════════════
# Get file name without extension
filename = "document.pdf"
name = filename[:-4]
print(f"Name: {name}")                      # document

# Palindrome check
word = "radar"
is_palindrome = word == word[::-1]
print(f"{word} is palindrome: {is_palindrome}")  # True

# Extract every nth element
data = list(range(20))
every_fifth = data[::5]
print(f"Every 5th: {every_fifth}")          # [0, 5, 10, 15]

# Split list into chunks (first half, second half)
numbers = list(range(10))
mid = len(numbers) // 2
first_half = numbers[:mid]
second_half = numbers[mid:]
print(f"First half: {first_half}")          # [0, 1, 2, 3, 4]
print(f"Second half: {second_half}")        # [5, 6, 7, 8, 9]`
    },
    {
      name: 'Advanced Slicing',
      icon: '🎯',
      explanation: `**Core Concept:**
• Advanced techniques for complex slicing operations
• Combining multiple slicing patterns
• Using slice objects for reusable slice operations
• Performance considerations and best practices

**Slice Objects:**
• slice(start, stop, step) creates reusable slice
• Can be assigned to variables and reused
• Useful for complex or repeated slicing operations
• Same behavior as slice notation

**Multidimensional Slicing:**
• NumPy arrays support fancy slicing
• Can slice multiple dimensions simultaneously
• Boolean indexing for conditional selection
• Fancy indexing with integer arrays

**Performance Tips:**
• Slicing creates new sequence (memory cost)
• Use views when possible (NumPy)
• Iterators for large sequences
• List comprehensions vs slicing

**Common Pitfalls:**
• Forgetting stop is exclusive
• Modifying during iteration
• Shallow vs deep copy with nested structures
• Step sign determines direction`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Slice objects
# ═══════════════════════════════════════════════════════════════
# Create reusable slices
first_three = slice(0, 3)
last_three = slice(-3, None)
every_other = slice(None, None, 2)
reverse = slice(None, None, -1)

data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(data[first_three])        # [0, 1, 2]
print(data[last_three])         # [7, 8, 9]
print(data[every_other])        # [0, 2, 4, 6, 8]
print(data[reverse])            # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

# Named slices for readability
HEADER = slice(0, 10)
BODY = slice(10, -10)
FOOTER = slice(-10, None)

message = list(range(50))
header = message[HEADER]
body = message[BODY]
footer = message[FOOTER]
print(f"Header: {header}")      # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]


# ═══════════════════════════════════════════════════════════════
# ✦ Complex slicing patterns
# ═══════════════════════════════════════════════════════════════
# Skip patterns
numbers = list(range(20))

# Every 3rd element starting from index 1
pattern1 = numbers[1::3]
print(f"Every 3rd from 1: {pattern1}")      # [1, 4, 7, 10, 13, 16, 19]

# Reverse every 2nd
pattern2 = numbers[::-2]
print(f"Reverse every 2nd: {pattern2}")     # [19, 17, 15, 13, 11, 9, 7, 5, 3, 1]

# Middle section, every other
pattern3 = numbers[5:15:2]
print(f"Middle every 2nd: {pattern3}")      # [5, 7, 9, 11, 13]


# ═══════════════════════════════════════════════════════════════
# ✦ Nested sequence slicing
# ═══════════════════════════════════════════════════════════════
matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
]

# Get first 2 rows
first_two_rows = matrix[:2]
print(f"First 2 rows: {first_two_rows}")    # [[1, 2, 3, 4], [5, 6, 7, 8]]

# Get specific column (3rd column)
third_column = [row[2] for row in matrix]
print(f"3rd column: {third_column}")        # [3, 7, 11, 15]

# Get submatrix (2x2 from top-left)
submatrix = [row[:2] for row in matrix[:2]]
print(f"Submatrix: {submatrix}")            # [[1, 2], [5, 6]]


# ═══════════════════════════════════════════════════════════════
# ✦ String manipulation with slicing
# ═══════════════════════════════════════════════════════════════
# Capitalize every other word
text = "python is an amazing programming language"
words = text.split()
capitalized = [w.upper() if i % 2 == 0 else w for i, w in enumerate(words)]
result = ' '.join(capitalized)
print(result)           # PYTHON is AN amazing PROGRAMMING language

# Remove vowels using slice-like logic
text = "Hello World"
vowels = "aeiouAEIOU"
no_vowels = ''.join([c for c in text if c not in vowels])
print(no_vowels)        # Hll Wrld

# Rotate string
text = "Python"
n = 2  # rotate by 2 positions
rotated = text[n:] + text[:n]
print(f"Rotated: {rotated}")                # thonPy


# ═══════════════════════════════════════════════════════════════
# ✦ Memory-efficient slicing
# ═══════════════════════════════════════════════════════════════
# Using itertools for large sequences
from itertools import islice

# Instead of data[100:200] for huge lists
large_data = range(1000000)
chunk = list(islice(large_data, 100, 200))
print(f"Chunk length: {len(chunk)}")        # 100

# Generator for memory efficiency
def slice_generator(data, start, stop, step=1):
    for i in range(start, stop, step):
        yield data[i]

data = list(range(1000))
gen = slice_generator(data, 10, 20, 2)
print(list(gen))        # [10, 12, 14, 16, 18]


# ═══════════════════════════════════════════════════════════════
# ✦ Practical applications
# ═══════════════════════════════════════════════════════════════
# Parse fixed-width file format
record = "John      Doe       30  Engineer  "
FIRST_NAME = slice(0, 10)
LAST_NAME = slice(10, 20)
AGE = slice(20, 24)
TITLE = slice(24, 34)

first = record[FIRST_NAME].strip()
last = record[LAST_NAME].strip()
age = int(record[AGE].strip())
title = record[TITLE].strip()
print(f"{first} {last}, {age}, {title}")    # John Doe, 30, Engineer

# Circular buffer using slicing
buffer = [1, 2, 3, 4, 5]
buffer_size = len(buffer)

def circular_slice(data, start, length):
    if start + length <= len(data):
        return data[start:start+length]
    else:
        return data[start:] + data[:(start+length) % len(data)]

result = circular_slice(buffer, 3, 4)
print(f"Circular: {result}")                # [4, 5, 1, 2]

# Sliding window
def sliding_window(data, window_size):
    for i in range(len(data) - window_size + 1):
        yield data[i:i+window_size]

numbers = [1, 2, 3, 4, 5, 6]
windows = list(sliding_window(numbers, 3))
print(f"Windows: {windows}")                # [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6]]


# ═══════════════════════════════════════════════════════════════
# ✦ Shallow vs deep copy consideration
# ═══════════════════════════════════════════════════════════════
# Shallow copy with slice
original = [[1, 2], [3, 4]]
copy = original[:]
copy[0][0] = 99
print(f"Original: {original}")              # [[99, 2], [3, 4]] - modified!
print(f"Copy: {copy}")                      # [[99, 2], [3, 4]]

# Deep copy for nested structures
import copy
original = [[1, 2], [3, 4]]
deep_copy = copy.deepcopy(original)
deep_copy[0][0] = 99
print(f"Original: {original}")              # [[1, 2], [3, 4]] - unchanged
print(f"Deep copy: {deep_copy}")            # [[99, 2], [3, 4]]`
    }
  ]

  return (
    <>
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
                ✂️ Python Index Slicing
              </h1>
            </div>
          </div>

          <Breadcrumb breadcrumb={activeBreadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {concepts.map((concept, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedConcept(concept)}
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
                <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
                  {concept.icon}
                </div>

      {/* Collapsible Sidebar for quick concept navigation */}
      <CollapsibleSidebar
        items={concepts}
        selectedIndex={selectedConcept ? concepts.findIndex(c => c.id === selectedConcept.id) : -1}
        onSelect={(index) => setSelectedConcept(concepts[index])}
        title="Concepts"
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.icon}
        primaryColor={'#3b82f6'}
      />

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
                  textAlign: 'left',
                  fontSize: '0.875rem'
                }}>
                  Click to explore indexing and slicing techniques
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedConcept && (
        <div
          onClick={() => setSelectedConcept(null)}
          style={{
            position: 'fixed',
            inset: '0',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            zIndex: '50',
            overflowY: 'auto'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(to bottom right, #111827, #1f2937)',
              borderRadius: '0.75rem',
              width: '95vw', maxWidth: '1400px', height: '90vh',
              overflowY: 'auto',
              border: '2px solid #3b82f6',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
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
                  <span style={{ fontSize: '3rem' }}>{selectedConcept.icon}</span>
                  <h2 style={{
                    fontSize: '1.875rem',
                    fontWeight: 'bold',
                    color: 'white'
                  }}>
                    {selectedConcept.name}
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

            <div style={{
              padding: '2rem'
            }}>
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
                {selectedConcept.explanation.split('\n\n').map((section, idx) => {
                  if (section.startsWith('**') && section.includes(':**')) {
                    const headerMatch = section.match(/\*\*(.*?):\*\*/)
                    if (headerMatch) {
                      const header = headerMatch[1]
                      const content = section.substring(headerMatch[0].length).trim()

                      return (
                        <div key={idx} style={{ marginBottom: '1.5rem' }}>
                          <h4 style={{
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            color: '#60a5fa',
                            marginBottom: '0.75rem'
                          }}>
                            {header}
                          </h4>
                          <div style={{
                            paddingLeft: '1.25rem',
                            color: '#d1d5db',
                            fontSize: '0.95rem',
                            lineHeight: '1.8'
                          }}>
                            {content.split('\n').map((line, lineIdx) => {
                              if (line.trim().startsWith('•')) {
                                return (
                                  <div key={lineIdx} style={{
                                    display: 'flex',
                                    marginBottom: '0.5rem'
                                  }}>
                                    <span style={{ color: '#3b82f6', marginRight: '0.75rem' }}>•</span>
                                    <span>{line.trim().substring(1).trim()}</span>
                                  </div>
                                )
                              }
                              return line.trim() ? <div key={lineIdx} style={{ marginBottom: '0.5rem' }}>{line}</div> : null
                            })}
                          </div>
                        </div>
                      )
                    }
                  }
                  return null
                })}
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
                {selectedConcept.codeExample && (() => {
                  const sections = parseCodeSections(selectedConcept.codeExample)
                  return sections.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {sections.map((section, idx) => (
                        <div key={idx} style={{
                          backgroundColor: '#1e293b',
                          borderRadius: '0.5rem',
                          overflow: 'hidden',
                          border: '1px solid #3b82f6'
                        }}>
                          <div
                            style={{
                              width: '100%',
                              padding: '1rem 1.5rem',
                              background: '#2563eb',
                              color: 'white',
                              fontSize: '1rem',
                              fontWeight: '500',
                              display: 'flex',
                              alignItems: 'center',
                              textAlign: 'left'
                            }}
                          >
                            <span>💻 {section.title}</span>
                          </div>

                          <div style={{ padding: 0 }}>
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
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{
                      backgroundColor: '#1e293b',
                      padding: 0,
                      borderRadius: '0.5rem',
                      border: '1px solid #3b82f6'
                    }}>
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
                        {selectedConcept.codeExample}
                      </SyntaxHighlighter>
                    </div>
                  )
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default IndexSlicing

import { useState, useEffect } from 'react'

// Simple syntax highlighter for Python code
const SyntaxHighlighter = ({ code }) => {
  const highlightPython = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    // Protect comments
    highlighted = highlighted.replace(/(#.*$)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    // Protect strings
    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    // Apply syntax highlighting
    highlighted = highlighted
      // Keywords - purple
      .replace(/\b(def|class|if|elif|else|for|while|in|not|and|or|is|return|yield|import|from|as|try|except|finally|with|lambda|None|pass|break|continue|raise|assert|global|nonlocal)\b/g, '<span style="color: #c586c0;">$1</span>')

      // Boolean and special - blue
      .replace(/\b(True|False|None)\b/g, '<span style="color: #569cd6;">$1</span>')

      // Built-in functions - yellow
      .replace(/\b(print|len|range|enumerate|zip|map|filter|sorted|reversed|sum|max|min|abs|all|any|chr|ord|int|str|float|list|dict|set|tuple|type|isinstance|hasattr|getattr|setattr|open|input)\b/g, '<span style="color: #dcdcaa;">$1</span>')

      // Numbers - light green
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #b5cea8;">$1</span>')

    // Restore protected content
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
      textAlign: 'left',
      padding: '1.25rem'
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightPython(code) }} />
    </pre>
  )
}

function IndexSlicing({ onBack }) {
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }))
  }

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
        padding: '2rem',
        maxWidth: '95%',
        margin: '120px auto 0',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
        border: '3px solid rgba(55, 118, 171, 0.4)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <button
            onClick={onBack}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: '#3776ab',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(55, 118, 171, 0.3)'
            }}
          >
            ← Back to Python Topics
          </button>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#1f2937',
            margin: 0
          }}>
            ✂️ Python Index Slicing
          </h1>
          <div style={{ width: '150px' }}></div>
        </div>

        <div style={{
          backgroundColor: 'rgba(55, 118, 171, 0.05)',
          padding: '2.5rem 10rem',
          borderRadius: '16px',
          border: '3px solid rgba(55, 118, 171, 0.3)',
          marginBottom: '2rem'
        }}>
          <p style={{
            fontSize: '1.3rem',
            color: '#374151',
            fontWeight: '500',
            margin: 0,
            lineHeight: '1.8',
            textAlign: 'center'
          }}>
            Master Python sequence indexing and slicing: positive/negative indices, slice notation [start:stop:step], and advanced slicing techniques.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {concepts.map((concept, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedConcept(concept)}
              style={{
                backgroundColor: 'rgba(55, 118, 171, 0.05)',
                padding: '2rem',
                borderRadius: '16px',
                border: '3px solid rgba(55, 118, 171, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15)'
                e.currentTarget.style.borderColor = 'rgba(55, 118, 171, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                e.currentTarget.style.borderColor = 'rgba(55, 118, 171, 0.3)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
                {concept.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#3776ab',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {concept.name}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#6b7280',
                lineHeight: '1.6',
                textAlign: 'center'
              }}>
                {concept.explanation?.substring(0, 150)}...
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedConcept && (
        <div
          onClick={() => setSelectedConcept(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem',
            backdropFilter: 'blur(4px)'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '90vw',
              maxHeight: '90vh',
              width: '1200px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '3px solid rgba(55, 118, 171, 0.4)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{
              padding: '1.5rem 2rem',
              borderBottom: '2px solid rgba(55, 118, 171, 0.2)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'rgba(55, 118, 171, 0.05)'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#3776ab',
                margin: 0
              }}>
                {selectedConcept.icon} {selectedConcept.name}
              </h2>
              <button
                onClick={() => setSelectedConcept(null)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  backgroundColor: 'transparent',
                  color: '#6b7280',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{
              padding: '2rem',
              overflowY: 'auto',
              flex: 1
            }}>
              <div style={{
                backgroundColor: 'rgba(55, 118, 171, 0.05)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '2px solid rgba(55, 118, 171, 0.2)',
                marginBottom: '2rem'
              }}>
                {selectedConcept.explanation.split('\n\n').map((section, idx) => {
                  if (section.startsWith('**') && section.includes(':**')) {
                    const headerMatch = section.match(/\*\*(.*?):\*\*/)
                    if (headerMatch) {
                      const header = headerMatch[1]
                      const content = section.substring(headerMatch[0].length).trim()

                      return (
                        <div key={idx} style={{ marginBottom: '1.5rem' }}>
                          <h3 style={{
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            color: '#3776ab',
                            marginBottom: '0.75rem'
                          }}>
                            {header}
                          </h3>
                          <div style={{
                            paddingLeft: '1.25rem',
                            color: '#4b5563',
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
                                    <span style={{ color: '#3776ab', marginRight: '0.75rem' }}>•</span>
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

              {selectedConcept.codeExample && (() => {
                const sections = parseCodeSections(selectedConcept.codeExample)
                return sections.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {sections.map((section, idx) => {
                      const sectionKey = `${selectedConcept.name}-${idx}`
                      const isExpanded = expandedSections[sectionKey]

                      return (
                        <div key={idx} style={{
                          backgroundColor: '#1e293b',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          border: '2px solid #334155'
                        }}>
                          <button
                            onClick={() => toggleSection(sectionKey)}
                            style={{
                              width: '100%',
                              padding: '1rem 1.5rem',
                              backgroundColor: '#334155',
                              border: 'none',
                              color: '#60a5fa',
                              fontSize: '1rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <span>💻 {section.title}</span>
                            <span style={{ fontSize: '1.2rem' }}>
                              {isExpanded ? '▼' : '▶'}
                            </span>
                          </button>

                          {isExpanded && (
                            <div style={{ padding: 0 }}>
                              <SyntaxHighlighter code={section.code} />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div style={{
                    backgroundColor: '#1e293b',
                    padding: 0,
                    borderRadius: '12px',
                    border: '2px solid #334155'
                  }}>
                    <SyntaxHighlighter code={selectedConcept.codeExample} />
                  </div>
                )
              })()}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default IndexSlicing

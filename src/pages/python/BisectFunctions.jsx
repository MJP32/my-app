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
      .replace(/\b(print|len|range|enumerate|zip|map|filter|sorted|sum|max|min|list|dict|set|tuple|bisect|bisect_left|bisect_right|insort|insort_left|insort_right)\b/g, '<span style="color: #dcdcaa;">$1</span>')
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

function BisectFunctions({ onBack }) {
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
          sections.push({ title: currentSection, code: currentContent.join('\n') })
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
      sections.push({ title: currentSection, code: currentContent.join('\n') })
    }

    return sections
  }

  const concepts = [
    {
      name: 'Bisect Module Overview',
      icon: '🔍',
      explanation: `**Core Concept:**
• Binary search operations on sorted sequences
• O(log n) time complexity for searching
• Built-in Python standard library module
• Works with any sorted sequence (list, tuple, etc.)
• Maintains sorted order during insertion

**Key Functions:**
• bisect_left(a, x): Find leftmost insertion point
• bisect_right(a, x): Find rightmost insertion point (alias: bisect)
• insort_left(a, x): Insert x in sorted list (left)
• insort_right(a, x): Insert x in sorted list (right)

**Time Complexity:**
• Search operations: O(log n)
• Insertion operations: O(n) - due to list insertion
• Binary search portion: O(log n)

**Prerequisites:**
• List must be sorted before using bisect
• Works with any comparable elements
• Undefined behavior on unsorted lists

**Common Use Cases:**
• Finding insertion points in sorted arrays
• Implementing sorted collections
• Range queries in sorted data
• Efficient duplicate handling
• Building interval trees`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Import and basic setup
# ═══════════════════════════════════════════════════════════════
import bisect

# Create a sorted list
sorted_list = [1, 3, 4, 4, 6, 8, 10]
print("Sorted list:", sorted_list)


# ═══════════════════════════════════════════════════════════════
# ✦ Quick function overview
# ═══════════════════════════════════════════════════════════════
# bisect_left: Returns leftmost insertion index
left_pos = bisect.bisect_left(sorted_list, 4)
print(f"bisect_left(4): {left_pos}")  # 2 (before existing 4s)

# bisect_right: Returns rightmost insertion index
right_pos = bisect.bisect_right(sorted_list, 4)
print(f"bisect_right(4): {right_pos}")  # 4 (after existing 4s)

# bisect is alias for bisect_right
pos = bisect.bisect(sorted_list, 4)
print(f"bisect(4): {pos}")  # 4 (same as bisect_right)


# ═══════════════════════════════════════════════════════════════
# ✦ Visual representation
# ═══════════════════════════════════════════════════════════════
# Searching for value 4 in: [1, 3, 4, 4, 6, 8, 10]
#                           0  1  2  3  4  5   6   <- indices
#
# bisect_left(4)  points to index 2 (before the 4s)
#                           |
#                           v
#                       [1, 3, 4, 4, 6, 8, 10]
#
# bisect_right(4) points to index 4 (after the 4s)
#                               |
#                               v
#                       [1, 3, 4, 4, 6, 8, 10]


# ═══════════════════════════════════════════════════════════════
# ✦ Testing with new values
# ═══════════════════════════════════════════════════════════════
# Value not in list
print(f"bisect_left(5): {bisect.bisect_left(sorted_list, 5)}")   # 4
print(f"bisect_right(5): {bisect.bisect_right(sorted_list, 5)}") # 4

# Value at boundaries
print(f"bisect_left(1): {bisect.bisect_left(sorted_list, 1)}")   # 0
print(f"bisect_left(10): {bisect.bisect_left(sorted_list, 10)}") # 6
print(f"bisect_left(0): {bisect.bisect_left(sorted_list, 0)}")   # 0
print(f"bisect_left(20): {bisect.bisect_left(sorted_list, 20)}") # 7`
    },
    {
      name: 'bisect_left() - Leftmost Position',
      icon: '⬅️',
      explanation: `**Core Concept:**
• Finds leftmost insertion point for value x
• Returns index where x should be inserted before existing equal values
• If x already exists, returns index of first occurrence
• Useful for finding start of range of equal values

**Syntax:**
• bisect_left(a, x, lo=0, hi=len(a))
• a: sorted list
• x: value to search for
• lo, hi: optional search bounds

**Behavior:**
• Returns index i where a[i-1] < x <= a[i]
• If x not in list, returns where it would be inserted
• If x in list, returns index of first x
• Maintains sorted order if x is inserted at returned index

**Use Cases:**
• Check if element exists: a[i] == x after bisect_left
• Find first occurrence of x
• Count elements less than x
• Implement lower_bound (like C++ STL)

**Comparison with bisect_right:**
• bisect_left: Before existing equal values
• bisect_right: After existing equal values
• For unique values, both return same index`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Basic bisect_left usage
# ═══════════════════════════════════════════════════════════════
import bisect

numbers = [1, 3, 3, 3, 5, 7, 9]

# Find leftmost position for 3
pos = bisect.bisect_left(numbers, 3)
print(f"bisect_left(3): {pos}")  # 1 (before all 3s)

# Find leftmost position for value not in list
pos = bisect.bisect_left(numbers, 4)
print(f"bisect_left(4): {pos}")  # 4 (between 3s and 5)

# At boundaries
pos = bisect.bisect_left(numbers, 0)
print(f"bisect_left(0): {pos}")  # 0 (before all elements)

pos = bisect.bisect_left(numbers, 10)
print(f"bisect_left(10): {pos}")  # 7 (after all elements)


# ═══════════════════════════════════════════════════════════════
# ✦ Check if element exists
# ═══════════════════════════════════════════════════════════════
def contains(arr, x):
    """Check if x exists in sorted array using bisect_left"""
    i = bisect.bisect_left(arr, x)
    return i < len(arr) and arr[i] == x

data = [2, 4, 6, 8, 10, 12, 14]
print(contains(data, 8))   # True
print(contains(data, 7))   # False
print(contains(data, 2))   # True
print(contains(data, 15))  # False


# ═══════════════════════════════════════════════════════════════
# ✦ Find first occurrence
# ═══════════════════════════════════════════════════════════════
def find_first(arr, x):
    """Find index of first occurrence of x, or -1 if not found"""
    i = bisect.bisect_left(arr, x)
    if i < len(arr) and arr[i] == x:
        return i
    return -1

values = [1, 2, 2, 2, 3, 4, 5]
print(f"First occurrence of 2: {find_first(values, 2)}")  # 1
print(f"First occurrence of 4: {find_first(values, 4)}")  # 5
print(f"First occurrence of 6: {find_first(values, 6)}")  # -1


# ═══════════════════════════════════════════════════════════════
# ✦ Count elements less than x
# ═══════════════════════════════════════════════════════════════
def count_less_than(arr, x):
    """Count how many elements are less than x"""
    return bisect.bisect_left(arr, x)

nums = [1, 3, 5, 7, 9, 11, 13]
print(f"Elements < 7: {count_less_than(nums, 7)}")   # 3
print(f"Elements < 10: {count_less_than(nums, 10)}") # 5
print(f"Elements < 1: {count_less_than(nums, 1)}")   # 0


# ═══════════════════════════════════════════════════════════════
# ✦ Using lo and hi parameters
# ═══════════════════════════════════════════════════════════════
data = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

# Search only in indices 2 to 7
pos = bisect.bisect_left(data, 11, lo=2, hi=7)
print(f"bisect_left(11) in range [2:7]: {pos}")  # 5

# Search in first half
pos = bisect.bisect_left(data, 7, hi=5)
print(f"bisect_left(7) in first 5 elements: {pos}")  # 3


# ═══════════════════════════════════════════════════════════════
# ✦ Comparison with bisect_right
# ═══════════════════════════════════════════════════════════════
arr = [1, 2, 2, 2, 3, 4]

left = bisect.bisect_left(arr, 2)
right = bisect.bisect_right(arr, 2)

print(f"bisect_left(2): {left}")   # 1 (before 2s)
print(f"bisect_right(2): {right}") # 4 (after 2s)
print(f"Number of 2s: {right - left}")  # 3`
    },
    {
      name: 'bisect_right() - Rightmost Position',
      icon: '➡️',
      explanation: `**Core Concept:**
• Finds rightmost insertion point for value x
• Returns index where x should be inserted after existing equal values
• If x already exists, returns index after last occurrence
• Default bisect function (bisect is alias for bisect_right)

**Syntax:**
• bisect_right(a, x, lo=0, hi=len(a))
• bisect(a, x, lo=0, hi=len(a))  # Alias
• a: sorted list
• x: value to search for
• lo, hi: optional search bounds

**Behavior:**
• Returns index i where a[i-1] <= x < a[i]
• If x not in list, returns where it would be inserted
• If x in list, returns index after last x
• Maintains sorted order if x is inserted at returned index

**Use Cases:**
• Find position after last occurrence
• Count elements less than or equal to x
• Implement upper_bound (like C++ STL)
• Maintain sorted order with duplicates allowed

**Common Pattern:**
• bisect_right is default when order doesn't matter
• Use bisect_left when you need to find/check existence
• bisect_right keeps newer duplicates at end`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Basic bisect_right usage
# ═══════════════════════════════════════════════════════════════
import bisect

numbers = [1, 3, 3, 3, 5, 7, 9]

# Find rightmost position for 3
pos = bisect.bisect_right(numbers, 3)
print(f"bisect_right(3): {pos}")  # 4 (after all 3s)

# bisect is alias for bisect_right
pos = bisect.bisect(numbers, 3)
print(f"bisect(3): {pos}")  # 4 (same as bisect_right)

# Find rightmost position for value not in list
pos = bisect.bisect_right(numbers, 4)
print(f"bisect_right(4): {pos}")  # 4 (same as bisect_left for non-existent)


# ═══════════════════════════════════════════════════════════════
# ✦ Count elements less than or equal to x
# ═══════════════════════════════════════════════════════════════
def count_lte(arr, x):
    """Count elements less than or equal to x"""
    return bisect.bisect_right(arr, x)

nums = [1, 3, 5, 7, 9, 11, 13]
print(f"Elements <= 7: {count_lte(nums, 7)}")   # 4
print(f"Elements <= 10: {count_lte(nums, 10)}") # 5
print(f"Elements <= 13: {count_lte(nums, 13)}") # 7


# ═══════════════════════════════════════════════════════════════
# ✦ Find last occurrence
# ═══════════════════════════════════════════════════════════════
def find_last(arr, x):
    """Find index of last occurrence of x, or -1 if not found"""
    i = bisect.bisect_right(arr, x)
    if i > 0 and arr[i - 1] == x:
        return i - 1
    return -1

values = [1, 2, 2, 2, 3, 4, 5]
print(f"Last occurrence of 2: {find_last(values, 2)}")  # 3
print(f"Last occurrence of 4: {find_last(values, 4)}")  # 5
print(f"Last occurrence of 6: {find_last(values, 6)}")  # -1


# ═══════════════════════════════════════════════════════════════
# ✦ Count occurrences of x
# ═══════════════════════════════════════════════════════════════
def count_occurrences(arr, x):
    """Count how many times x appears in sorted array"""
    left = bisect.bisect_left(arr, x)
    right = bisect.bisect_right(arr, x)
    return right - left

data = [1, 2, 2, 2, 3, 3, 4, 5, 5, 5, 5]
print(f"Count of 2: {count_occurrences(data, 2)}")  # 3
print(f"Count of 5: {count_occurrences(data, 5)}")  # 4
print(f"Count of 3: {count_occurrences(data, 3)}")  # 2
print(f"Count of 6: {count_occurrences(data, 6)}")  # 0


# ═══════════════════════════════════════════════════════════════
# ✦ Find range of equal values
# ═══════════════════════════════════════════════════════════════
def find_range(arr, x):
    """Find [start, end] indices of all occurrences of x"""
    left = bisect.bisect_left(arr, x)
    right = bisect.bisect_right(arr, x)
    if left == right:
        return None  # x not found
    return [left, right - 1]

arr = [1, 3, 5, 5, 5, 7, 9]
print(f"Range of 5: {find_range(arr, 5)}")  # [2, 4]
print(f"Range of 3: {find_range(arr, 3)}")  # [1, 1]
print(f"Range of 6: {find_range(arr, 6)}")  # None


# ═══════════════════════════════════════════════════════════════
# ✦ Using with lo and hi bounds
# ═══════════════════════════════════════════════════════════════
data = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

# Search in specific range
pos = bisect.bisect_right(data, 11, lo=3, hi=8)
print(f"bisect_right(11) in range [3:8]: {pos}")  # 6

# Efficient range search
pos = bisect.bisect_right(data, 10, hi=6)
print(f"bisect_right(10) in first 6 elements: {pos}")  # 5`
    },
    {
      name: 'insort_left() & insort_right()',
      icon: '➕',
      explanation: `**Core Concept:**
• Insert element into sorted list while maintaining order
• insort_left: Insert before existing equal values
• insort_right: Insert after existing equal values
• Modifies list in-place (no return value)

**Syntax:**
• insort_left(a, x, lo=0, hi=len(a))
• insort_right(a, x, lo=0, hi=len(a))
• insort(a, x) is alias for insort_right

**Time Complexity:**
• Finding position: O(log n) via binary search
• List insertion: O(n) to shift elements
• Overall: O(n)

**Behavior:**
• Finds insertion point using bisect_left/bisect_right
• Inserts element at that position
• All elements shift right
• List remains sorted

**Use Cases:**
• Maintaining sorted list with insertions
• Building sorted collections incrementally
• Priority queues with duplicates
• Sorted streaming data

**Alternatives:**
• For many insertions, consider heapq or sorted()
• For large datasets, use SortedList from sortedcontainers
• insort is O(n), sorting after all insertions can be O(n log n)`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Basic insort_left usage
# ═══════════════════════════════════════════════════════════════
import bisect

# insort_left: Insert before equal values
arr1 = [1, 3, 3, 3, 5, 7]
bisect.insort_left(arr1, 3)
print(f"After insort_left(3): {arr1}")  # [1, 3, 3, 3, 3, 5, 7]

# Insert at beginning
bisect.insort_left(arr1, 0)
print(f"After insort_left(0): {arr1}")  # [0, 1, 3, 3, 3, 3, 5, 7]

# Insert at end
bisect.insort_left(arr1, 10)
print(f"After insort_left(10): {arr1}")  # [0, 1, 3, 3, 3, 3, 5, 7, 10]


# ═══════════════════════════════════════════════════════════════
# ✦ Basic insort_right usage
# ═══════════════════════════════════════════════════════════════
# insort_right: Insert after equal values
arr2 = [1, 3, 3, 3, 5, 7]
bisect.insort_right(arr2, 3)
print(f"After insort_right(3): {arr2}")  # [1, 3, 3, 3, 3, 5, 7]

# insort is alias for insort_right
bisect.insort(arr2, 4)
print(f"After insort(4): {arr2}")  # [1, 3, 3, 3, 3, 4, 5, 7]


# ═══════════════════════════════════════════════════════════════
# ✦ Comparison: insort_left vs insort_right
# ═══════════════════════════════════════════════════════════════
# With timestamps to show order
class Item:
    def __init__(self, value, timestamp):
        self.value = value
        self.timestamp = timestamp

    def __lt__(self, other):
        return self.value < other.value

    def __repr__(self):
        return f"({self.value},t{self.timestamp})"

# Using insort_left (newer items before older)
left_list = []
bisect.insort_left(left_list, Item(5, 1))
bisect.insort_left(left_list, Item(5, 2))
bisect.insort_left(left_list, Item(5, 3))
print(f"insort_left: {left_list}")  # [(5,t3), (5,t2), (5,t1)]

# Using insort_right (newer items after older)
right_list = []
bisect.insort_right(right_list, Item(5, 1))
bisect.insort_right(right_list, Item(5, 2))
bisect.insort_right(right_list, Item(5, 3))
print(f"insort_right: {right_list}")  # [(5,t1), (5,t2), (5,t3)]


# ═══════════════════════════════════════════════════════════════
# ✦ Building sorted list incrementally
# ═══════════════════════════════════════════════════════════════
def build_sorted_list(values):
    """Build sorted list by inserting values one by one"""
    sorted_list = []
    for val in values:
        bisect.insort(sorted_list, val)
    return sorted_list

unsorted = [5, 2, 8, 1, 9, 3, 7]
result = build_sorted_list(unsorted)
print(f"Built sorted list: {result}")  # [1, 2, 3, 5, 7, 8, 9]


# ═══════════════════════════════════════════════════════════════
# ✦ Maintaining sorted list with insertions
# ═══════════════════════════════════════════════════════════════
class SortedList:
    def __init__(self):
        self.data = []

    def insert(self, value):
        """Insert value maintaining sorted order"""
        bisect.insort(self.data, value)

    def __repr__(self):
        return str(self.data)

sl = SortedList()
for num in [5, 2, 8, 1, 9, 3]:
    sl.insert(num)
    print(f"After inserting {num}: {sl}")


# ═══════════════════════════════════════════════════════════════
# ✦ Using lo and hi bounds
# ═══════════════════════════════════════════════════════════════
# Insert in specific range
arr = [1, 3, 5, 7, 9, 11, 13]
bisect.insort_left(arr, 6, lo=2, hi=5)
print(f"After bounded insert: {arr}")


# ═══════════════════════════════════════════════════════════════
# ✦ Performance consideration
# ═══════════════════════════════════════════════════════════════
# Method 1: Insert as we go (O(n²) for n insertions)
def method1(values):
    result = []
    for val in values:
        bisect.insort(result, val)
    return result

# Method 2: Insert all, then sort (O(n log n))
def method2(values):
    result = list(values)
    result.sort()
    return result

# For small or streaming data: use insort
# For large batch data: use sort()

values = [5, 2, 8, 1, 9, 3, 7]
print(f"Method 1 result: {method1(values)}")
print(f"Method 2 result: {method2(values)}")`
    },
    {
      name: 'Practical Applications',
      icon: '💡',
      explanation: `**Common Use Cases:**

**1. Membership Testing in Sorted Data:**
• Check if element exists: O(log n) vs O(n) linear search
• Find duplicates efficiently
• Range membership queries

**2. Maintaining Sorted Collections:**
• Streaming data that needs to stay sorted
• Priority queues with duplicates
• Leaderboards, rankings

**3. Range Queries:**
• Find elements in range [a, b]
• Count elements greater/less than threshold
• Percentile calculations

**4. Finding Closest Values:**
• Find nearest neighbor in sorted data
• Closest element to target
• Floor and ceiling operations

**5. Merging Sorted Lists:**
• Insert elements from one sorted list into another
• Merge intervals
• Union of sorted sequences

**6. Grade/Score Calculations:**
• Assign grades based on score ranges
• Bucket classification
• Histogram generation

**Performance Tips:**
• Binary search: O(log n) - very fast even for large lists
• Insertion: O(n) - consider alternatives for many insertions
• For heavy insertion workload: use heapq or SortedList
• For batch operations: collect then sort() is often faster`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Fast membership testing
# ═══════════════════════════════════════════════════════════════
import bisect

def is_member(sorted_list, target):
    """O(log n) membership test using binary search"""
    i = bisect.bisect_left(sorted_list, target)
    return i < len(sorted_list) and sorted_list[i] == target

data = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
print(is_member(data, 11))  # True
print(is_member(data, 12))  # False


# ═══════════════════════════════════════════════════════════════
# ✦ Range queries
# ═══════════════════════════════════════════════════════════════
def count_in_range(arr, low, high):
    """Count elements in range [low, high]"""
    left = bisect.bisect_left(arr, low)
    right = bisect.bisect_right(arr, high)
    return right - left

def get_range(arr, low, high):
    """Get all elements in range [low, high]"""
    left = bisect.bisect_left(arr, low)
    right = bisect.bisect_right(arr, high)
    return arr[left:right]

scores = [65, 72, 78, 82, 85, 88, 90, 92, 95, 98]
print(f"Scores 80-90: {count_in_range(scores, 80, 90)}")  # 4
print(f"Scores in range: {get_range(scores, 80, 90)}")    # [82, 85, 88, 90]


# ═══════════════════════════════════════════════════════════════
# ✦ Finding closest values
# ═══════════════════════════════════════════════════════════════
def find_closest(arr, target):
    """Find value closest to target in sorted array"""
    if not arr:
        return None

    i = bisect.bisect_left(arr, target)

    # Target would be at index i
    if i == 0:
        return arr[0]
    if i == len(arr):
        return arr[-1]

    # Check both neighbors
    before = arr[i - 1]
    after = arr[i]

    if abs(before - target) <= abs(after - target):
        return before
    return after

numbers = [1, 5, 10, 15, 20, 25, 30]
print(f"Closest to 12: {find_closest(numbers, 12)}")  # 10
print(f"Closest to 13: {find_closest(numbers, 13)}")  # 15
print(f"Closest to 23: {find_closest(numbers, 23)}")  # 25


# ═══════════════════════════════════════════════════════════════
# ✦ Floor and ceiling operations
# ═══════════════════════════════════════════════════════════════
def floor(arr, x):
    """Find largest element <= x"""
    i = bisect.bisect_right(arr, x)
    return arr[i - 1] if i > 0 else None

def ceiling(arr, x):
    """Find smallest element >= x"""
    i = bisect.bisect_left(arr, x)
    return arr[i] if i < len(arr) else None

data = [10, 20, 30, 40, 50, 60]
print(f"Floor of 35: {floor(data, 35)}")      # 30
print(f"Ceiling of 35: {ceiling(data, 35)}")  # 40
print(f"Floor of 50: {floor(data, 50)}")      # 50
print(f"Ceiling of 50: {ceiling(data, 50)}")  # 50


# ═══════════════════════════════════════════════════════════════
# ✦ Grade assignment system
# ═══════════════════════════════════════════════════════════════
def assign_grade(score):
    """Assign letter grade based on score"""
    breakpoints = [60, 70, 80, 90]
    grades = ['F', 'D', 'C', 'B', 'A']
    i = bisect.bisect(breakpoints, score)
    return grades[i]

# Test grade assignment
test_scores = [55, 65, 75, 85, 95, 100]
for score in test_scores:
    print(f"Score {score}: Grade {assign_grade(score)}")


# ═══════════════════════════════════════════════════════════════
# ✦ Maintaining top K elements
# ═══════════════════════════════════════════════════════════════
class TopK:
    def __init__(self, k):
        self.k = k
        self.data = []

    def add(self, value):
        """Add value, keep only top k"""
        bisect.insort(self.data, value)
        if len(self.data) > self.k:
            self.data.pop(0)  # Remove smallest

    def get_top_k(self):
        return self.data

top3 = TopK(3)
for num in [5, 2, 8, 1, 9, 3, 7]:
    top3.add(num)
    print(f"After {num}: Top 3 = {top3.get_top_k()}")


# ═══════════════════════════════════════════════════════════════
# ✦ Interval scheduling
# ═══════════════════════════════════════════════════════════════
def max_overlapping_intervals(intervals):
    """Find maximum number of overlapping intervals"""
    events = []
    for start, end in intervals:
        bisect.insort(events, (start, 1))   # Start event
        bisect.insort(events, (end, -1))    # End event

    max_overlap = current = 0
    for time, delta in events:
        current += delta
        max_overlap = max(max_overlap, current)

    return max_overlap

meetings = [(1, 4), (2, 6), (5, 7), (8, 9)]
print(f"Max overlapping: {max_overlapping_intervals(meetings)}")  # 2`
    },
    {
      name: 'Advanced Patterns',
      icon: '🎯',
      explanation: `**Advanced Use Cases:**

**1. Custom Key Functions:**
• Search on object attributes
• Complex comparison logic
• Multi-field sorting

**2. Maintaining Invariants:**
• Sorted order with constraints
• Unique sorted lists
• Range-limited collections

**3. Statistical Operations:**
• Median maintenance in stream
• Percentile tracking
• Running statistics

**4. Time Series Data:**
• Timestamp-based queries
• Event ordering
• Log analysis

**5. Optimization Techniques:**
• Batch operations
• Caching insertion points
• Hybrid approaches

**Design Patterns:**
• Decorator pattern for key extraction
• Strategy pattern for comparison
• Iterator pattern for range queries

**Common Pitfalls:**
• Using on unsorted data (undefined behavior)
• O(n) insertion cost for many elements
• Not considering alternatives (heapq, SortedContainers)
• Forgetting lo/hi bounds for optimization`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Using key functions with custom objects
# ═══════════════════════════════════════════════════════════════
import bisect
from dataclasses import dataclass
from typing import List

@dataclass
class Student:
    name: str
    score: int

    def __repr__(self):
        return f"{self.name}({self.score})"

# Approach 1: Make object comparable
@dataclass
class ComparableStudent:
    name: str
    score: int

    def __lt__(self, other):
        return self.score < other.score

    def __repr__(self):
        return f"{self.name}({self.score})"

students = []
bisect.insort(students, ComparableStudent("Alice", 85))
bisect.insort(students, ComparableStudent("Bob", 92))
bisect.insort(students, ComparableStudent("Charlie", 78))
bisect.insort(students, ComparableStudent("Diana", 88))
print(f"Sorted students: {students}")


# ═══════════════════════════════════════════════════════════════
# ✦ Bisect with key function (Python 3.10+)
# ═══════════════════════════════════════════════════════════════
# Note: bisect with key parameter requires Python 3.10+
# For older versions, use workaround below

# Python 3.10+ approach
students_list = [
    Student("Alice", 85),
    Student("Bob", 92),
    Student("Charlie", 78)
]

# Find position to insert student with score 88
# pos = bisect.bisect_left(students_list, 88, key=lambda s: s.score)


# ═══════════════════════════════════════════════════════════════
# ✦ Workaround for older Python versions
# ═══════════════════════════════════════════════════════════════
class KeyWrapper:
    def __init__(self, value, key):
        self.value = value
        self.key = key

    def __lt__(self, other):
        return self.key < other.key

def bisect_left_key(arr, x, key):
    """bisect_left with key function for Python < 3.10"""
    wrapped = [KeyWrapper(item, key(item)) for item in arr]
    target = KeyWrapper(None, x)
    return bisect.bisect_left(wrapped, target)

scores_only = [78, 85, 92]
pos = bisect_left_key(students_list, 88, key=lambda s: s.score)
print(f"Position to insert score 88: {pos}")


# ═══════════════════════════════════════════════════════════════
# ✦ Maintaining median in data stream
# ═══════════════════════════════════════════════════════════════
class MedianFinder:
    def __init__(self):
        self.data = []

    def add_num(self, num):
        """Add number maintaining sorted order"""
        bisect.insort(self.data, num)

    def find_median(self):
        """Find median in O(1) after insertion"""
        n = len(self.data)
        if n == 0:
            return None
        if n % 2 == 1:
            return self.data[n // 2]
        else:
            return (self.data[n // 2 - 1] + self.data[n // 2]) / 2

mf = MedianFinder()
for num in [5, 15, 1, 3, 8]:
    mf.add_num(num)
    print(f"After {num}: median = {mf.find_median()}, data = {mf.data}")


# ═══════════════════════════════════════════════════════════════
# ✦ Time-based event log queries
# ═══════════════════════════════════════════════════════════════
class EventLog:
    def __init__(self):
        self.events = []  # List of (timestamp, event) tuples

    def log_event(self, timestamp, event):
        """Log event with timestamp"""
        bisect.insort(self.events, (timestamp, event))

    def get_events_in_range(self, start_time, end_time):
        """Get all events in time range"""
        start_idx = bisect.bisect_left(self.events, (start_time, ''))
        end_idx = bisect.bisect_right(self.events, (end_time, '~'))
        return self.events[start_idx:end_idx]

log = EventLog()
log.log_event(100, "user_login")
log.log_event(150, "page_view")
log.log_event(200, "purchase")
log.log_event(250, "user_logout")

print(f"Events 120-220: {log.get_events_in_range(120, 220)}")


# ═══════════════════════════════════════════════════════════════
# ✦ Unique sorted list (no duplicates)
# ═══════════════════════════════════════════════════════════════
class UniqueSortedList:
    def __init__(self):
        self.data = []

    def add(self, value):
        """Add value only if not already present"""
        i = bisect.bisect_left(self.data, value)
        if i == len(self.data) or self.data[i] != value:
            self.data.insert(i, value)
            return True
        return False

    def __repr__(self):
        return str(self.data)

unique = UniqueSortedList()
for num in [5, 2, 8, 2, 5, 1, 8, 3]:
    added = unique.add(num)
    print(f"Add {num}: {added}, List: {unique}")


# ═══════════════════════════════════════════════════════════════
# ✦ Percentile calculation
# ═══════════════════════════════════════════════════════════════
def percentile(sorted_data, p):
    """Calculate p-th percentile (p from 0 to 100)"""
    if not sorted_data:
        return None
    k = (len(sorted_data) - 1) * p / 100
    f = int(k)
    c = f + 1
    if c >= len(sorted_data):
        return sorted_data[-1]
    return sorted_data[f] + (k - f) * (sorted_data[c] - sorted_data[f])

def add_and_percentile(data, value, p):
    """Add value and compute percentile"""
    bisect.insort(data, value)
    return percentile(data, p)

data = []
for score in [85, 92, 78, 88, 95, 72, 90]:
    p50 = add_and_percentile(data, score, 50)
    p95 = add_and_percentile(data, score, 95)
    print(f"After {score}: 50th={p50:.1f}, 95th={p95:.1f}")`
    }
  ]

  const codeSections = selectedConcept ? parseCodeSections(concepts[selectedConcept].codeExample) : []

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#f0fdf4', minHeight: '100vh' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <button
          onClick={() => {
            if (selectedConcept !== null) {
              setSelectedConcept(null)
            } else {
              onBack()
            }
          }}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: '#059669',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#047857'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#059669'}
        >
          ← {selectedConcept !== null ? 'Back to Concepts' : 'Back to Python'}
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <span>🔍</span>
          <span>Bisect Functions</span>
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      {selectedConcept === null ? (
        <>
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            border: '2px solid #059669'
          }}>
            <h2 style={{ color: '#059669', marginTop: 0 }}>About Bisect Module</h2>
            <p style={{ color: '#4b5563', lineHeight: '1.8', marginBottom: '1rem' }}>
              The <code style={{ backgroundColor: '#e5e7eb', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>bisect</code> module
              provides support for maintaining a list in sorted order without having to sort the list after each insertion.
              It implements binary search algorithms with O(log n) time complexity for search operations.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
                <strong style={{ color: '#059669' }}>Time Complexity:</strong>
                <p style={{ margin: '0.5rem 0 0 0', color: '#4b5563' }}>O(log n) for search, O(n) for insertion</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
                <strong style={{ color: '#059669' }}>Built-in Module:</strong>
                <p style={{ margin: '0.5rem 0 0 0', color: '#4b5563' }}>No installation needed - import bisect</p>
              </div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {concepts.map((concept, index) => (
              <button
                key={index}
                onClick={() => setSelectedConcept(index)}
                style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '3px solid #059669',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(5, 150, 105, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{concept.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                  {concept.name}
                </h3>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#059669',
                  fontWeight: '600',
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>Learn More</span>
                  <span>→</span>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', border: '2px solid #059669' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3rem' }}>{concepts[selectedConcept].icon}</div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>
              {concepts[selectedConcept].name}
            </h2>
          </div>

          <div style={{
            backgroundColor: '#f0fdf4',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            borderLeft: '4px solid #059669'
          }}>
            <div style={{ whiteSpace: 'pre-line', color: '#374151', lineHeight: '1.8' }}>
              {concepts[selectedConcept].explanation.split('\n').map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  const text = line.slice(2, -2)
                  return <div key={i} style={{ fontWeight: '700', color: '#059669', marginTop: i > 0 ? '1rem' : 0, marginBottom: '0.5rem' }}>{text}</div>
                }
                if (line.startsWith('•')) {
                  return <div key={i} style={{ marginLeft: '1.5rem', marginBottom: '0.25rem' }}>{line}</div>
                }
                return <div key={i} style={{ marginBottom: '0.5rem' }}>{line}</div>
              })}
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
              Code Examples
            </h3>

            {codeSections.length > 0 ? (
              codeSections.map((section, idx) => (
                <div key={idx} style={{ marginBottom: '1.5rem' }}>
                  <button
                    onClick={() => toggleSection(`${selectedConcept}-${idx}`)}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      backgroundColor: '#059669',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: '600',
                      textAlign: 'left',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#047857'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#059669'}
                  >
                    <span>{section.title}</span>
                    <span>{expandedSections[`${selectedConcept}-${idx}`] ? '▼' : '▶'}</span>
                  </button>
                  {expandedSections[`${selectedConcept}-${idx}`] && (
                    <div style={{
                      backgroundColor: '#1e293b',
                      borderRadius: '0 0 8px 8px',
                      overflow: 'hidden'
                    }}>
                      <SyntaxHighlighter code={section.code} />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div style={{
                backgroundColor: '#1e293b',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <SyntaxHighlighter code={concepts[selectedConcept].codeExample} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default BisectFunctions

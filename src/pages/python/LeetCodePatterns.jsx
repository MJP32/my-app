import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// Custom theme based on vscDarkPlus with no line backgrounds
const customTheme = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: '#1e1e1e',
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    background: 'transparent',
  },
}

function LeetCodePatterns({ onBack, breadcrumb }) {
  const [selectedPattern, setSelectedPattern] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
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

  const categories = [
    {
      id: 'array-string',
      name: 'Array & String',
      icon: '📝',
      color: '#3b82f6',
      description: 'Fundamental patterns for array manipulation and string processing',
      patternIds: ['two-pointers', 'sliding-window', 'rolling-hash', 'kmp', 'prefix-sum', 'dutch-national-flag', 'kadane', 'cyclic-sort']
    },
    {
      id: 'trees-graphs',
      name: 'Trees & Graphs',
      icon: '🌳',
      color: '#10b981',
      description: 'Traversal and pathfinding algorithms for tree and graph structures',
      patternIds: ['tree-dfs', 'tree-bfs', 'graph-traversal', 'union-find', 'topological-sort', 'dijkstra', 'a-star', 'bellman-ford']
    },
    {
      id: 'search-sort',
      name: 'Search & Sort',
      icon: '🔍',
      color: '#f59e0b',
      description: 'Efficient searching and sorting techniques',
      patternIds: ['binary-search', 'fast-slow-pointers', 'matrix-traversal']
    },
    {
      id: 'dynamic-programming',
      name: 'Dynamic Programming',
      icon: '🧩',
      color: '#8b5cf6',
      description: 'Breaking complex problems into overlapping subproblems',
      patternIds: ['dynamic-programming']
    },
    {
      id: 'data-structures',
      name: 'Advanced Data Structures',
      icon: '🏗️',
      color: '#ec4899',
      description: 'Specialized data structures for efficient operations',
      patternIds: ['monotonic-stack', 'trie', 'binary-indexed-tree', 'segment-tree', 'top-k-elements']
    },
    {
      id: 'backtracking',
      name: 'Backtracking & Recursion',
      icon: '🔄',
      color: '#14b8a6',
      description: 'Systematic exploration of solution spaces',
      patternIds: ['backtracking']
    },
    {
      id: 'math-bit',
      name: 'Math & Bit Manipulation',
      icon: '🔢',
      color: '#f97316',
      description: 'Mathematical tricks and bitwise operations',
      patternIds: ['bit-manipulation', 'boyer-moore-voting', 'reservoir-sampling']
    },
    {
      id: 'greedy-intervals',
      name: 'Greedy & Intervals',
      icon: '🎯',
      color: '#ef4444',
      description: 'Optimal local choices and interval-based problems',
      patternIds: ['greedy', 'merge-intervals']
    }
  ]

  const patterns = [
    {
      id: 'two-pointers',
      name: 'Two Pointers',
      icon: '👉👈',
      color: '#3b82f6',
      category: 'Array & String',
      description: 'Use two pointers moving toward each other or in the same direction',
      whenToUse: [
        'Sorted array problems',
        'Finding pairs with a target sum',
        'Reversing arrays/strings',
        'Removing duplicates',
        'Palindrome checking'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      codeExample: `# Pattern: Two pointers from both ends
def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1

    while left < right:
        current_sum = arr[left] + arr[right]

        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1  # Need larger sum
        else:
            right -= 1  # Need smaller sum

    return [-1, -1]

# Pattern: Two pointers same direction (fast & slow)
def remove_duplicates(arr):
    if not arr:
        return 0

    slow = 0  # Position for next unique element

    for fast in range(1, len(arr)):
        if arr[fast] != arr[slow]:
            slow += 1
            arr[slow] = arr[fast]

    return slow + 1  # Length of unique elements

# Pattern: Palindrome check
def is_palindrome(s):
    left, right = 0, len(s) - 1

    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1

    return True

# Example: 3Sum problem
def three_sum(nums):
    nums.sort()
    result = []

    for i in range(len(nums) - 2):
        # Skip duplicates for first number
        if i > 0 and nums[i] == nums[i-1]:
            continue

        left, right = i + 1, len(nums) - 1

        while left < right:
            total = nums[i] + nums[left] + nums[right]

            if total == 0:
                result.append([nums[i], nums[left], nums[right]])

                # Skip duplicates
                while left < right and nums[left] == nums[left+1]:
                    left += 1
                while left < right and nums[right] == nums[right-1]:
                    right -= 1

                left += 1
                right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1

    return result`,
      commonProblems: [
        'Two Sum II (sorted array)',
        'Three Sum',
        'Remove Duplicates from Sorted Array',
        'Valid Palindrome',
        'Container With Most Water',
        'Trapping Rain Water'
      ]
    },
    {
      id: 'sliding-window',
      name: 'Sliding Window',
      icon: '🪟',
      color: '#10b981',
      category: 'Array & String',
      description: 'Maintain a window of elements and slide it through the array',
      whenToUse: [
        'Contiguous subarrays/substrings',
        'Fixed or dynamic window size',
        'Maximum/minimum in window',
        'Longest/shortest substring problems',
        'Finding all anagrams'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(k) where k is window size',
      codeExample: `# Pattern: Fixed size window
def max_sum_subarray(arr, k):
    """Maximum sum of k consecutive elements"""
    window_sum = sum(arr[:k])
    max_sum = window_sum

    for i in range(k, len(arr)):
        # Slide window: remove left, add right
        window_sum = window_sum - arr[i-k] + arr[i]
        max_sum = max(max_sum, window_sum)

    return max_sum

# Pattern: Dynamic window (expand/contract)
def longest_substring_k_distinct(s, k):
    """Longest substring with at most k distinct chars"""
    char_count = {}
    left = 0
    max_length = 0

    for right in range(len(s)):
        # Expand window
        char_count[s[right]] = char_count.get(s[right], 0) + 1

        # Contract window if needed
        while len(char_count) > k:
            char_count[s[left]] -= 1
            if char_count[s[left]] == 0:
                del char_count[s[left]]
            left += 1

        max_length = max(max_length, right - left + 1)

    return max_length

# Pattern: Find all anagrams
def find_anagrams(s, p):
    """Find all start indices of p's anagrams in s"""
    from collections import Counter

    result = []
    p_count = Counter(p)
    window_count = Counter()

    for i in range(len(s)):
        # Add right character
        window_count[s[i]] += 1

        # Remove left character if window too large
        if i >= len(p):
            if window_count[s[i - len(p)]] == 1:
                del window_count[s[i - len(p)]]
            else:
                window_count[s[i - len(p)]] -= 1

        # Check if window matches
        if window_count == p_count:
            result.append(i - len(p) + 1)

    return result

# Pattern: Longest substring without repeating chars
def length_longest_substring(s):
    char_index = {}
    left = 0
    max_length = 0

    for right in range(len(s)):
        if s[right] in char_index:
            # Move left pointer past the duplicate
            left = max(left, char_index[s[right]] + 1)

        char_index[s[right]] = right
        max_length = max(max_length, right - left + 1)

    return max_length`,
      commonProblems: [
        'Maximum Sum Subarray of Size K',
        'Longest Substring Without Repeating Characters',
        'Minimum Window Substring',
        'Find All Anagrams in a String',
        'Longest Substring with K Distinct Characters',
        'Sliding Window Maximum'
      ]
    },
    {
      id: 'rolling-hash',
      name: 'Rolling Hash (Rabin-Karp)',
      icon: '#️⃣',
      color: '#0d9488',
      category: 'String',
      description: 'Efficient string matching using polynomial hash that can be updated in O(1) when sliding window',
      whenToUse: [
        'Substring search (pattern matching)',
        'Finding duplicate substrings',
        'Longest repeating substring',
        'String comparison in O(1)',
        'Detecting plagiarism/similarity'
      ],
      timeComplexity: 'O(n) average, O(n*m) worst case',
      spaceComplexity: 'O(1) for basic, O(n) for storing hashes',
      codeExample: `# Rolling Hash Fundamentals
# Hash formula: hash = (c0 * base^(n-1) + c1 * base^(n-2) + ... + cn-1) % mod

class RollingHash:
    def __init__(self, base=26, mod=10**9 + 7):
        self.base = base
        self.mod = mod

    def compute_hash(self, s):
        """Compute hash of entire string"""
        h = 0
        for char in s:
            h = (h * self.base + ord(char)) % self.mod
        return h

    def roll(self, old_hash, old_char, new_char, length):
        """
        Update hash by removing old_char and adding new_char
        old_hash: current hash value
        old_char: character leaving the window (leftmost)
        new_char: character entering the window (rightmost)
        length: window size
        """
        # Remove contribution of old_char
        # old_char was multiplied by base^(length-1)
        power = pow(self.base, length - 1, self.mod)
        new_hash = (old_hash - ord(old_char) * power) % self.mod

        # Shift and add new_char
        new_hash = (new_hash * self.base + ord(new_char)) % self.mod

        return new_hash

# Pattern: Rabin-Karp String Matching
def rabin_karp(text, pattern):
    """Find all occurrences of pattern in text"""
    if len(pattern) > len(text):
        return []

    base = 26
    mod = 10**9 + 7
    n, m = len(text), len(pattern)

    # Compute base^(m-1) for rolling
    power = pow(base, m - 1, mod)

    # Compute hash of pattern and first window
    pattern_hash = 0
    window_hash = 0
    for i in range(m):
        pattern_hash = (pattern_hash * base + ord(pattern[i])) % mod
        window_hash = (window_hash * base + ord(text[i])) % mod

    result = []

    for i in range(n - m + 1):
        # Check if hashes match
        if pattern_hash == window_hash:
            # Verify actual match (avoid hash collision)
            if text[i:i+m] == pattern:
                result.append(i)

        # Roll the hash to next window
        if i < n - m:
            # Remove leftmost, add rightmost
            window_hash = (window_hash - ord(text[i]) * power) % mod
            window_hash = (window_hash * base + ord(text[i + m])) % mod

    return result

# Pattern: Longest Duplicate Substring (Binary Search + Rolling Hash)
def longestDupSubstring(s):
    """Find longest substring that appears at least twice"""
    base = 26
    mod = 2**63 - 1  # Large prime
    n = len(s)

    def search(length):
        """Check if duplicate substring of given length exists"""
        if length == 0:
            return ""

        # Compute hash of first window
        h = 0
        power = pow(base, length - 1, mod)

        for i in range(length):
            h = (h * base + ord(s[i])) % mod

        seen = {h: [0]}  # hash -> list of starting indices

        for i in range(1, n - length + 1):
            # Roll hash
            h = (h - ord(s[i-1]) * power) % mod
            h = (h * base + ord(s[i + length - 1])) % mod

            if h in seen:
                # Verify to avoid collision
                for j in seen[h]:
                    if s[j:j+length] == s[i:i+length]:
                        return s[i:i+length]
                seen[h].append(i)
            else:
                seen[h] = [i]

        return ""

    # Binary search on length
    left, right = 0, n - 1
    result = ""

    while left <= right:
        mid = (left + right) // 2
        dup = search(mid)

        if dup:
            result = dup
            left = mid + 1
        else:
            right = mid - 1

    return result

# Pattern: Repeated String Match
def repeatedStringMatch(a, b):
    """
    Minimum times to repeat 'a' such that 'b' is a substring
    Returns -1 if impossible
    """
    # We need at least ceil(len(b) / len(a)) copies of a
    times = (len(b) + len(a) - 1) // len(a)

    # Build string and check
    repeated = a * times

    # Use rolling hash to find b in repeated
    if b in repeated:
        return times

    # Try one more copy
    repeated += a
    if b in repeated:
        return times + 1

    return -1

# Pattern: Distinct Echo Substrings
def distinctEchoSubstrings(text):
    """Count substrings that can be written as a+a (concatenation of same string)"""
    n = len(text)
    base = 26
    mod = 10**9 + 7

    seen = set()

    # Try all even lengths
    for length in range(2, n + 1, 2):
        half = length // 2

        # Compute initial hashes for both halves
        h1 = h2 = 0
        power = pow(base, half - 1, mod)

        for i in range(half):
            h1 = (h1 * base + ord(text[i])) % mod
            h2 = (h2 * base + ord(text[half + i])) % mod

        if h1 == h2 and text[:half] == text[half:length]:
            seen.add(text[:half])

        # Slide window
        for i in range(1, n - length + 1):
            # Roll h1
            h1 = (h1 - ord(text[i-1]) * power) % mod
            h1 = (h1 * base + ord(text[i + half - 1])) % mod

            # Roll h2
            h2 = (h2 - ord(text[i + half - 1]) * power) % mod
            h2 = (h2 * base + ord(text[i + length - 1])) % mod

            if h1 == h2:
                substr = text[i:i+half]
                if text[i:i+half] == text[i+half:i+length]:
                    seen.add(substr)

    return len(seen)

# Pattern: Find All Anagrams using Rolling Hash
def findAnagramsHash(s, p):
    """Find all anagram indices using character frequency as hash"""
    from collections import Counter

    if len(p) > len(s):
        return []

    p_count = Counter(p)
    window = Counter(s[:len(p)])
    result = []

    if window == p_count:
        result.append(0)

    for i in range(len(p), len(s)):
        # Add new char
        window[s[i]] += 1

        # Remove old char
        left_char = s[i - len(p)]
        window[left_char] -= 1
        if window[left_char] == 0:
            del window[left_char]

        if window == p_count:
            result.append(i - len(p) + 1)

    return result`,
      commonProblems: [
        'Implement strStr() / Find the Index of the First Occurrence',
        'Longest Duplicate Substring',
        'Repeated String Match',
        'Shortest Palindrome',
        'Distinct Echo Substrings',
        'Longest Happy Prefix'
      ]
    },
    {
      id: 'kmp',
      name: 'KMP (Knuth-Morris-Pratt)',
      icon: '🔤',
      color: '#7c3aed',
      category: 'String',
      description: 'Linear time pattern matching using prefix function to avoid redundant comparisons',
      whenToUse: [
        'Pattern matching in strings',
        'Finding all occurrences of pattern',
        'Longest prefix which is also suffix',
        'String periodicity problems',
        'Repeated substring patterns'
      ],
      timeComplexity: 'O(n + m)',
      spaceComplexity: 'O(m) for prefix table',
      codeExample: `# KMP Algorithm Fundamentals
# Key insight: Use information from previous matches to skip comparisons

def compute_lps(pattern):
    """
    Compute Longest Proper Prefix which is also Suffix (LPS) array
    lps[i] = length of longest proper prefix of pattern[0..i]
             which is also a suffix of pattern[0..i]

    Example: pattern = "AABAACAABAA"
    lps = [0, 1, 0, 1, 2, 0, 1, 2, 3, 4, 5]

    For "AABAA": longest prefix = suffix = "AA", so lps[4] = 2
    """
    m = len(pattern)
    lps = [0] * m
    length = 0  # Length of previous longest prefix suffix
    i = 1

    while i < m:
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                # Try shorter prefix
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1

    return lps

# Pattern: KMP String Matching
def kmp_search(text, pattern):
    """Find all occurrences of pattern in text"""
    if not pattern:
        return [0]
    if not text or len(pattern) > len(text):
        return []

    n, m = len(text), len(pattern)
    lps = compute_lps(pattern)
    result = []

    i = 0  # Index for text
    j = 0  # Index for pattern

    while i < n:
        if text[i] == pattern[j]:
            i += 1
            j += 1

            if j == m:
                # Found match at index i - j
                result.append(i - j)
                # Continue searching using LPS
                j = lps[j - 1]
        else:
            if j != 0:
                # Use LPS to skip comparisons
                j = lps[j - 1]
            else:
                i += 1

    return result

# Pattern: Implement strStr() - LeetCode 28
def strStr(haystack, needle):
    """Return index of first occurrence, -1 if not found"""
    if not needle:
        return 0

    n, m = len(haystack), len(needle)
    if m > n:
        return -1

    lps = compute_lps(needle)
    i = j = 0

    while i < n:
        if haystack[i] == needle[j]:
            i += 1
            j += 1
            if j == m:
                return i - j
        else:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1

    return -1

# Pattern: Shortest Palindrome - LeetCode 214
def shortestPalindrome(s):
    """
    Add characters in front to make palindrome
    Key: Find longest palindromic prefix using KMP
    """
    if not s:
        return s

    # Create pattern: s + '#' + reverse(s)
    # Find LPS of this to get longest palindromic prefix
    rev = s[::-1]
    combined = s + '#' + rev

    lps = compute_lps(combined)

    # lps[-1] gives length of longest palindromic prefix
    longest_palindrome_prefix = lps[-1]

    # Add reverse of remaining suffix to front
    to_add = rev[:len(s) - longest_palindrome_prefix]

    return to_add + s

# Pattern: Repeated Substring Pattern - LeetCode 459
def repeatedSubstringPattern(s):
    """
    Check if s can be formed by repeating a substring
    Key: If s = pattern * k, then s is in (s + s)[1:-1]
    Using KMP: check if len(s) % (len(s) - lps[-1]) == 0
    """
    n = len(s)
    lps = compute_lps(s)

    # Length of the repeating pattern
    pattern_len = n - lps[-1]

    # Check if pattern divides string evenly and is not the whole string
    return lps[-1] > 0 and n % pattern_len == 0

# Pattern: Longest Happy Prefix - LeetCode 1392
def longestPrefix(s):
    """
    Find longest prefix which is also suffix (but not the whole string)
    This is exactly what LPS gives us!
    """
    lps = compute_lps(s)
    return s[:lps[-1]]

# Pattern: Count occurrences of pattern
def countOccurrences(text, pattern):
    """Count how many times pattern appears in text"""
    return len(kmp_search(text, pattern))

# Pattern: Find period of string
def findPeriod(s):
    """
    Find shortest period p such that s consists of p repeated
    If no period exists, return len(s)
    """
    n = len(s)
    lps = compute_lps(s)

    period = n - lps[-1]

    # Check if it's a valid period
    if n % period == 0:
        return period
    return n

# Pattern: Rotate String - LeetCode 796
def rotateString(s, goal):
    """
    Check if s can become goal after some rotations
    Key: goal is in s + s (if same length)
    """
    if len(s) != len(goal):
        return False

    # Use KMP to check if goal is in s + s
    return kmp_search(s + s, goal) != []

# Pattern: Count prefix-suffix pairs
def countPrefixSuffixPairs(s):
    """
    Count all (i, j) where s[0:i] == s[n-i:n] (proper prefix = suffix)
    Uses LPS array
    """
    lps = compute_lps(s)

    # Follow the LPS chain from the end
    pairs = []
    length = lps[-1]

    while length > 0:
        pairs.append(length)
        length = lps[length - 1]

    return pairs

# Z-Algorithm (related to KMP)
def z_function(s):
    """
    z[i] = length of longest substring starting at i
           that matches a prefix of s

    Example: s = "aabxaab"
    z = [0, 1, 0, 0, 3, 1, 0]
    z[4] = 3 because s[4:7] = "aab" matches prefix s[0:3] = "aab"
    """
    n = len(s)
    z = [0] * n
    l, r = 0, 0

    for i in range(1, n):
        if i < r:
            z[i] = min(r - i, z[i - l])

        while i + z[i] < n and s[z[i]] == s[i + z[i]]:
            z[i] += 1

        if i + z[i] > r:
            l, r = i, i + z[i]

    return z

# Pattern matching using Z-function
def z_search(text, pattern):
    """Find all occurrences using Z-algorithm"""
    combined = pattern + '$' + text
    z = z_function(combined)
    m = len(pattern)

    result = []
    for i in range(m + 1, len(combined)):
        if z[i] == m:
            result.append(i - m - 1)

    return result`,
      commonProblems: [
        'Implement strStr() / Find the Index of the First Occurrence',
        'Shortest Palindrome',
        'Repeated Substring Pattern',
        'Longest Happy Prefix',
        'Rotate String',
        'Find the Index of the First Occurrence in a String'
      ]
    },
    {
      id: 'fast-slow-pointers',
      name: 'Fast & Slow Pointers',
      icon: '🐢🐇',
      color: '#f59e0b',
      category: 'Linked List',
      description: 'Two pointers moving at different speeds (Floyd\'s Cycle Detection)',
      whenToUse: [
        'Detecting cycles in linked lists',
        'Finding middle of linked list',
        'Finding cycle start position',
        'Palindrome linked list',
        'Happy Number problem'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      codeExample: `# Pattern: Cycle detection
def has_cycle(head):
    """Detect if linked list has a cycle"""
    slow = fast = head

    while fast and fast.next:
        slow = slow.next       # Move 1 step
        fast = fast.next.next  # Move 2 steps

        if slow == fast:
            return True  # Cycle detected

    return False

# Pattern: Find cycle start
def detect_cycle_start(head):
    """Find the node where cycle begins"""
    slow = fast = head

    # Detect if cycle exists
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

        if slow == fast:
            break
    else:
        return None  # No cycle

    # Find cycle start
    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next

    return slow

# Pattern: Find middle of linked list
def find_middle(head):
    """Find middle node (for even length, return 2nd middle)"""
    slow = fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    return slow

# Pattern: Palindrome linked list
def is_palindrome(head):
    """Check if linked list is palindrome"""
    if not head or not head.next:
        return True

    # Find middle
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    # Reverse second half
    prev = None
    while slow:
        next_node = slow.next
        slow.next = prev
        prev = slow
        slow = next_node

    # Compare both halves
    left, right = head, prev
    while right:  # Only check second half
        if left.val != right.val:
            return False
        left = left.next
        right = right.next

    return True

# Pattern: Happy Number
def is_happy(n):
    """Check if number is happy"""
    def get_next(num):
        total = 0
        while num > 0:
            digit = num % 10
            total += digit * digit
            num //= 10
        return total

    slow = fast = n

    while True:
        slow = get_next(slow)
        fast = get_next(get_next(fast))

        if fast == 1:
            return True
        if slow == fast:
            return False  # Cycle detected`,
      commonProblems: [
        'Linked List Cycle',
        'Linked List Cycle II',
        'Middle of the Linked List',
        'Palindrome Linked List',
        'Happy Number',
        'Reorder List'
      ]
    },
    {
      id: 'merge-intervals',
      name: 'Merge Intervals',
      icon: '📊',
      color: '#8b5cf6',
      category: 'Array',
      description: 'Merge overlapping intervals or find conflicts',
      whenToUse: [
        'Overlapping intervals',
        'Meeting room problems',
        'Interval conflicts',
        'Minimum platforms needed',
        'Insert new interval'
      ],
      timeComplexity: 'O(n log n) for sorting',
      spaceComplexity: 'O(n)',
      codeExample: `# Pattern: Merge overlapping intervals
def merge(intervals):
    """Merge all overlapping intervals"""
    if not intervals:
        return []

    # Sort by start time
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for current in intervals[1:]:
        last = merged[-1]

        if current[0] <= last[1]:  # Overlap
            # Merge intervals
            last[1] = max(last[1], current[1])
        else:
            # No overlap, add new interval
            merged.append(current)

    return merged

# Pattern: Insert interval
def insert(intervals, newInterval):
    """Insert and merge a new interval"""
    result = []
    i = 0
    n = len(intervals)

    # Add all intervals before newInterval
    while i < n and intervals[i][1] < newInterval[0]:
        result.append(intervals[i])
        i += 1

    # Merge overlapping intervals
    while i < n and intervals[i][0] <= newInterval[1]:
        newInterval[0] = min(newInterval[0], intervals[i][0])
        newInterval[1] = max(newInterval[1], intervals[i][1])
        i += 1

    result.append(newInterval)

    # Add remaining intervals
    while i < n:
        result.append(intervals[i])
        i += 1

    return result

# Pattern: Meeting rooms
def can_attend_meetings(intervals):
    """Check if person can attend all meetings"""
    intervals.sort(key=lambda x: x[0])

    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i-1][1]:
            return False  # Overlap found

    return True

# Pattern: Minimum meeting rooms
def min_meeting_rooms(intervals):
    """Minimum number of meeting rooms needed"""
    if not intervals:
        return 0

    start_times = sorted([i[0] for i in intervals])
    end_times = sorted([i[1] for i in intervals])

    rooms = 0
    max_rooms = 0
    start_ptr = end_ptr = 0

    while start_ptr < len(intervals):
        if start_times[start_ptr] < end_times[end_ptr]:
            rooms += 1  # Need new room
            max_rooms = max(max_rooms, rooms)
            start_ptr += 1
        else:
            rooms -= 1  # Room freed
            end_ptr += 1

    return max_rooms

# Pattern: Interval intersection
def interval_intersection(A, B):
    """Find intersection of two interval lists"""
    result = []
    i = j = 0

    while i < len(A) and j < len(B):
        # Find intersection
        start = max(A[i][0], B[j][0])
        end = min(A[i][1], B[j][1])

        if start <= end:  # Valid intersection
            result.append([start, end])

        # Move pointer of interval that ends first
        if A[i][1] < B[j][1]:
            i += 1
        else:
            j += 1

    return result`,
      commonProblems: [
        'Merge Intervals',
        'Insert Interval',
        'Meeting Rooms',
        'Meeting Rooms II',
        'Interval List Intersections',
        'Non-overlapping Intervals'
      ]
    },
    {
      id: 'cyclic-sort',
      name: 'Cyclic Sort',
      icon: '🔄',
      color: '#ec4899',
      category: 'Array',
      description: 'Sort array by placing each element at its correct index',
      whenToUse: [
        'Array contains numbers in range [1, n]',
        'Finding missing numbers',
        'Finding duplicate numbers',
        'First missing positive',
        'Numbers in continuous range'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      codeExample: `# Pattern: Cyclic sort
def cyclic_sort(nums):
    """Sort array where nums[i] should be at index nums[i] - 1"""
    i = 0
    while i < len(nums):
        correct_idx = nums[i] - 1

        # If number is not at correct position, swap
        if nums[i] != nums[correct_idx]:
            nums[i], nums[correct_idx] = nums[correct_idx], nums[i]
        else:
            i += 1

    return nums

# Pattern: Find missing number
def find_missing_number(nums):
    """Find missing number in range [0, n]"""
    i = 0
    n = len(nums)

    # Cyclic sort (place each number at its index)
    while i < n:
        correct_idx = nums[i]
        if nums[i] < n and nums[i] != nums[correct_idx]:
            nums[i], nums[correct_idx] = nums[correct_idx], nums[i]
        else:
            i += 1

    # Find first index where number doesn't match
    for i in range(n):
        if nums[i] != i:
            return i

    return n  # All numbers present, missing is n

# Pattern: Find all missing numbers
def find_disappeared_numbers(nums):
    """Find all numbers missing from [1, n]"""
    i = 0

    # Cyclic sort
    while i < len(nums):
        correct_idx = nums[i] - 1
        if nums[i] != nums[correct_idx]:
            nums[i], nums[correct_idx] = nums[correct_idx], nums[i]
        else:
            i += 1

    # Collect missing numbers
    missing = []
    for i in range(len(nums)):
        if nums[i] != i + 1:
            missing.append(i + 1)

    return missing

# Pattern: Find duplicate number
def find_duplicate(nums):
    """Find the duplicate number (array has n+1 elements in range [1, n])"""
    i = 0

    while i < len(nums):
        correct_idx = nums[i] - 1

        if nums[i] != nums[correct_idx]:
            nums[i], nums[correct_idx] = nums[correct_idx], nums[i]
        else:
            i += 1

    # The duplicate will be at an incorrect position
    for i in range(len(nums)):
        if nums[i] != i + 1:
            return nums[i]

# Pattern: First missing positive
def first_missing_positive(nums):
    """Find smallest missing positive integer"""
    n = len(nums)

    # Place each positive number at its correct index
    for i in range(n):
        while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:
            correct_idx = nums[i] - 1
            nums[i], nums[correct_idx] = nums[correct_idx], nums[i]

    # Find first missing positive
    for i in range(n):
        if nums[i] != i + 1:
            return i + 1

    return n + 1  # All [1, n] present`,
      commonProblems: [
        'Missing Number',
        'Find All Numbers Disappeared in an Array',
        'Find the Duplicate Number',
        'Find All Duplicates in an Array',
        'First Missing Positive',
        'Set Mismatch'
      ]
    },
    {
      id: 'top-k-elements',
      name: 'Top K Elements',
      icon: '🏆',
      color: '#ef4444',
      category: 'Heap',
      description: 'Use heap to efficiently find top/bottom K elements',
      whenToUse: [
        'Finding K largest/smallest elements',
        'K most frequent elements',
        'Kth largest element',
        'K closest points',
        'Top K frequent words'
      ],
      timeComplexity: 'O(n log k)',
      spaceComplexity: 'O(k)',
      codeExample: `import heapq

# Pattern: K largest elements (use min heap of size k)
def find_k_largest(nums, k):
    """Find k largest elements"""
    # Maintain min heap of size k
    min_heap = []

    for num in nums:
        heapq.heappush(min_heap, num)

        if len(min_heap) > k:
            heapq.heappop(min_heap)  # Remove smallest

    return list(min_heap)

# Pattern: Kth largest element
def find_kth_largest(nums, k):
    """Find kth largest element"""
    min_heap = []

    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)

    return min_heap[0]  # Root is kth largest

# Pattern: K closest points to origin
def k_closest(points, k):
    """Find k closest points to origin"""
    # Use max heap (negate distances)
    max_heap = []

    for x, y in points:
        dist = -(x*x + y*y)  # Negate for max heap

        if len(max_heap) < k:
            heapq.heappush(max_heap, (dist, [x, y]))
        elif dist > max_heap[0][0]:
            heapq.heapreplace(max_heap, (dist, [x, y]))

    return [point for _, point in max_heap]

# Pattern: Top K frequent elements
def top_k_frequent(nums, k):
    """Find k most frequent elements"""
    from collections import Counter

    count = Counter(nums)

    # Use min heap with frequency
    return heapq.nlargest(k, count.keys(), key=count.get)

# Alternative: Using bucket sort for O(n) time
def top_k_frequent_bucket(nums, k):
    from collections import Counter

    count = Counter(nums)
    # bucket[i] contains elements with frequency i
    bucket = [[] for _ in range(len(nums) + 1)]

    for num, freq in count.items():
        bucket[freq].append(num)

    result = []
    # Iterate from highest frequency
    for i in range(len(bucket) - 1, 0, -1):
        result.extend(bucket[i])
        if len(result) >= k:
            return result[:k]

    return result

# Pattern: K closest numbers to target
def find_k_closest(arr, k, x):
    """Find k numbers closest to x in sorted array"""
    # Use max heap storing absolute differences
    max_heap = []

    for num in arr:
        diff = -abs(num - x)  # Negate for max heap

        if len(max_heap) < k:
            heapq.heappush(max_heap, (diff, num))
        elif diff > max_heap[0][0]:
            heapq.heapreplace(max_heap, (diff, num))

    return sorted([num for _, num in max_heap])

# Pattern: Kth smallest element in sorted matrix
def kth_smallest_matrix(matrix, k):
    """Find kth smallest in row and column sorted matrix"""
    n = len(matrix)
    min_heap = []

    # Add first element of each row
    for r in range(min(k, n)):
        heapq.heappush(min_heap, (matrix[r][0], r, 0))

    count = 0
    result = 0

    while min_heap:
        result, r, c = heapq.heappop(min_heap)
        count += 1

        if count == k:
            return result

        # Add next element in same row
        if c + 1 < len(matrix[r]):
            heapq.heappush(min_heap, (matrix[r][c+1], r, c+1))

    return result`,
      commonProblems: [
        'Kth Largest Element in Array',
        'Top K Frequent Elements',
        'K Closest Points to Origin',
        'Kth Smallest Element in Sorted Matrix',
        'Find K Closest Elements',
        'Top K Frequent Words'
      ]
    },
    {
      id: 'binary-search',
      name: 'Modified Binary Search',
      icon: '🔍',
      color: '#06b6d4',
      category: 'Array',
      description: 'Binary search variations for different scenarios',
      whenToUse: [
        'Sorted arrays',
        'Finding target or closest value',
        'Rotated sorted arrays',
        'First/last occurrence',
        'Search in 2D matrix'
      ],
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      codeExample: `# Pattern: Standard binary search
def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = left + (right - left) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1

# Pattern: First occurrence
def find_first(arr, target):
    left, right = 0, len(arr) - 1
    result = -1

    while left <= right:
        mid = left + (right - left) // 2

        if arr[mid] == target:
            result = mid
            right = mid - 1  # Continue searching left
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return result

# Pattern: Search in rotated sorted array
def search_rotated(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2

        if nums[mid] == target:
            return mid

        # Determine which half is sorted
        if nums[left] <= nums[mid]:  # Left half sorted
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:  # Right half sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1

# Pattern: Find peak element
def find_peak_element(nums):
    left, right = 0, len(nums) - 1

    while left < right:
        mid = left + (right - left) // 2

        if nums[mid] > nums[mid + 1]:
            # Peak is on left side (including mid)
            right = mid
        else:
            # Peak is on right side
            left = mid + 1

    return left

# Pattern: Search 2D matrix (row & col sorted)
def search_matrix(matrix, target):
    if not matrix or not matrix[0]:
        return False

    # Start from top-right corner
    row, col = 0, len(matrix[0]) - 1

    while row < len(matrix) and col >= 0:
        if matrix[row][col] == target:
            return True
        elif matrix[row][col] > target:
            col -= 1  # Move left
        else:
            row += 1  # Move down

    return False

# Pattern: Find minimum in rotated sorted array
def find_min_rotated(nums):
    left, right = 0, len(nums) - 1

    while left < right:
        mid = left + (right - left) // 2

        if nums[mid] > nums[right]:
            # Minimum is in right half
            left = mid + 1
        else:
            # Minimum is in left half (including mid)
            right = mid

    return nums[left]

# Pattern: Find square root (binary search on answer)
def my_sqrt(x):
    if x < 2:
        return x

    left, right = 1, x // 2

    while left <= right:
        mid = left + (right - left) // 2
        square = mid * mid

        if square == x:
            return mid
        elif square < x:
            left = mid + 1
        else:
            right = mid - 1

    return right  # Floor value`,
      commonProblems: [
        'Binary Search',
        'Search in Rotated Sorted Array',
        'Find First and Last Position in Sorted Array',
        'Search a 2D Matrix',
        'Find Minimum in Rotated Sorted Array',
        'Peak Index in Mountain Array'
      ]
    },
    {
      id: 'tree-dfs',
      name: 'Tree DFS',
      icon: '🌳',
      color: '#22c55e',
      category: 'Tree',
      description: 'Depth-First Search for tree problems',
      whenToUse: [
        'Tree traversal (inorder, preorder, postorder)',
        'Path sum problems',
        'Maximum depth',
        'Tree diameter',
        'Validate BST'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h) where h is height',
      codeExample: `# Pattern: Preorder traversal (Root -> Left -> Right)
def preorder_traversal(root):
    result = []

    def dfs(node):
        if not node:
            return
        result.append(node.val)  # Visit root first
        dfs(node.left)
        dfs(node.right)

    dfs(root)
    return result

# Pattern: Inorder traversal (Left -> Root -> Right)
def inorder_traversal(root):
    result = []

    def dfs(node):
        if not node:
            return
        dfs(node.left)
        result.append(node.val)  # Visit root in middle
        dfs(node.right)

    dfs(root)
    return result

# Pattern: Postorder traversal (Left -> Right -> Root)
def postorder_traversal(root):
    result = []

    def dfs(node):
        if not node:
            return
        dfs(node.left)
        dfs(node.right)
        result.append(node.val)  # Visit root last

    dfs(root)
    return result

# Pattern: Maximum depth
def max_depth(root):
    if not root:
        return 0

    left_depth = max_depth(root.left)
    right_depth = max_depth(root.right)

    return 1 + max(left_depth, right_depth)

# Pattern: Path sum
def has_path_sum(root, target_sum):
    if not root:
        return False

    # Leaf node
    if not root.left and not root.right:
        return root.val == target_sum

    remaining = target_sum - root.val
    return (has_path_sum(root.left, remaining) or
            has_path_sum(root.right, remaining))

# Pattern: All root-to-leaf paths
def binary_tree_paths(root):
    if not root:
        return []

    paths = []

    def dfs(node, path):
        if not node.left and not node.right:  # Leaf
            paths.append(path + str(node.val))
            return

        if node.left:
            dfs(node.left, path + str(node.val) + "->")
        if node.right:
            dfs(node.right, path + str(node.val) + "->")

    dfs(root, "")
    return paths

# Pattern: Diameter of tree
def diameter_of_tree(root):
    diameter = 0

    def height(node):
        nonlocal diameter
        if not node:
            return 0

        left = height(node.left)
        right = height(node.right)

        # Update diameter (path through this node)
        diameter = max(diameter, left + right)

        return 1 + max(left, right)

    height(root)
    return diameter

# Pattern: Validate BST
def is_valid_bst(root):
    def validate(node, min_val, max_val):
        if not node:
            return True

        if node.val <= min_val or node.val >= max_val:
            return False

        return (validate(node.left, min_val, node.val) and
                validate(node.right, node.val, max_val))

    return validate(root, float('-inf'), float('inf'))

# Pattern: Lowest Common Ancestor
def lowest_common_ancestor(root, p, q):
    if not root or root == p or root == q:
        return root

    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)

    if left and right:
        return root  # Found both in different subtrees

    return left if left else right`,
      commonProblems: [
        'Binary Tree Paths',
        'Maximum Depth of Binary Tree',
        'Path Sum',
        'Diameter of Binary Tree',
        'Validate Binary Search Tree',
        'Lowest Common Ancestor'
      ]
    },
    {
      id: 'tree-bfs',
      name: 'Tree BFS',
      icon: '🌊',
      color: '#0ea5e9',
      category: 'Tree',
      description: 'Breadth-First Search for level-order tree problems',
      whenToUse: [
        'Level-order traversal',
        'Find level with max sum',
        'Right/left side view',
        'Level averages',
        'Zigzag traversal'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(w) where w is max width',
      codeExample: `from collections import deque

# Pattern: Level order traversal
def level_order(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        current_level = []

        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(current_level)

    return result

# Pattern: Right side view
def right_side_view(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)

        for i in range(level_size):
            node = queue.popleft()

            # Add rightmost node of each level
            if i == level_size - 1:
                result.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

    return result

# Pattern: Zigzag level order
def zigzag_level_order(root):
    if not root:
        return []

    result = []
    queue = deque([root])
    left_to_right = True

    while queue:
        level_size = len(queue)
        current_level = deque()

        for _ in range(level_size):
            node = queue.popleft()

            # Add to appropriate end based on direction
            if left_to_right:
                current_level.append(node.val)
            else:
                current_level.appendleft(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(list(current_level))
        left_to_right = not left_to_right

    return result

# Pattern: Average of levels
def average_of_levels(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        level_sum = 0

        for _ in range(level_size):
            node = queue.popleft()
            level_sum += node.val

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(level_sum / level_size)

    return result

# Pattern: Minimum depth
def min_depth(root):
    if not root:
        return 0

    queue = deque([(root, 1)])

    while queue:
        node, depth = queue.popleft()

        # First leaf node found
        if not node.left and not node.right:
            return depth

        if node.left:
            queue.append((node.left, depth + 1))
        if node.right:
            queue.append((node.right, depth + 1))

    return 0

# Pattern: Connect level order siblings
def connect_siblings(root):
    if not root:
        return root

    queue = deque([root])

    while queue:
        level_size = len(queue)
        prev = None

        for _ in range(level_size):
            node = queue.popleft()

            if prev:
                prev.next = node
            prev = node

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

    return root`,
      commonProblems: [
        'Binary Tree Level Order Traversal',
        'Binary Tree Zigzag Level Order',
        'Average of Levels in Binary Tree',
        'Binary Tree Right Side View',
        'Minimum Depth of Binary Tree',
        'Populating Next Right Pointers'
      ]
    },
    {
      id: 'backtracking',
      name: 'Backtracking',
      icon: '🔙',
      color: '#f97316',
      category: 'Recursion',
      description: 'Explore all possibilities by trying and backtracking',
      whenToUse: [
        'Generate all combinations/permutations',
        'Subsets problems',
        'N-Queens, Sudoku',
        'Word search in grid',
        'Generate parentheses'
      ],
      timeComplexity: 'Exponential O(2^n) or O(n!)',
      spaceComplexity: 'O(n) for recursion stack',
      codeExample: `# Pattern: Subsets (power set)
def subsets(nums):
    result = []

    def backtrack(start, path):
        result.append(path[:])  # Add current subset

        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)  # Recurse
            path.pop()  # Backtrack

    backtrack(0, [])
    return result

# Pattern: Permutations
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        result = []

        def backtrack(current):
            # Base case: if current permutation is complete
            if len(current) == len(nums):
                result.append(current[:])  # Add a copy
                return

            # Try adding each number that's not already used
            for num in nums:
                if num not in current:
                    current.append(num)
                    backtrack(current)
                    current.pop()  # Backtrack

        backtrack([])
        return result

# Example:
# nums = [1,2,3]
# Output: [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]

# Alternative with visited set (faster):
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        result = []
        visited = set()

        def backtrack(current):
            if len(current) == len(nums):
                result.append(current[:])
                return

            for num in nums:
                if num not in visited:
                    current.append(num)
                    visited.add(num)
                    backtrack(current)
                    current.pop()
                    visited.remove(num)

        backtrack([])
        return result

# Using swap (in-place):
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        result = []

        def backtrack(i):
            if i == len(nums):
                result.append(nums[:])
                return

            for j in range(i, len(nums)):
                # Swap
                nums[i], nums[j] = nums[j], nums[i]
                backtrack(i + 1)
                # Swap back
                nums[i], nums[j] = nums[j], nums[i]

        backtrack(0)
        return result

# Which one to use:
# First: Simple, easy to understand
# Second: Faster (O(1) set operations)
# Third: Most efficient in-place swapping

# Pattern: Combination sum
def combination_sum(candidates, target):
    result = []

    def backtrack(start, path, remaining):
        if remaining == 0:
            result.append(path[:])
            return
        if remaining < 0:
            return

        for i in range(start, len(candidates)):
            path.append(candidates[i])
            # Can reuse same element
            backtrack(i, path, remaining - candidates[i])
            path.pop()

    backtrack(0, [], target)
    return result

# Pattern: Generate parentheses
def generate_parentheses(n):
    result = []

    def backtrack(path, open_count, close_count):
        if len(path) == 2 * n:
            result.append(path)
            return

        # Can add open paren if haven't used all
        if open_count < n:
            backtrack(path + '(', open_count + 1, close_count)

        # Can add close paren if it matches an open
        if close_count < open_count:
            backtrack(path + ')', open_count, close_count + 1)

    backtrack('', 0, 0)
    return result

# Pattern: Word search in grid
def exist(board, word):
    rows, cols = len(board), len(board[0])

    def backtrack(r, c, index):
        if index == len(word):
            return True

        if (r < 0 or r >= rows or c < 0 or c >= cols or
            board[r][c] != word[index]):
            return False

        # Mark as visited
        temp = board[r][c]
        board[r][c] = '#'

        # Explore neighbors
        found = (backtrack(r+1, c, index+1) or
                backtrack(r-1, c, index+1) or
                backtrack(r, c+1, index+1) or
                backtrack(r, c-1, index+1))

        # Restore
        board[r][c] = temp

        return found

    for r in range(rows):
        for c in range(cols):
            if backtrack(r, c, 0):
                return True

    return False

# Pattern: N-Queens
def solve_n_queens(n):
    result = []
    board = [['.'] * n for _ in range(n)]

    def is_safe(row, col):
        # Check column
        for i in range(row):
            if board[i][col] == 'Q':
                return False

        # Check diagonal
        i, j = row - 1, col - 1
        while i >= 0 and j >= 0:
            if board[i][j] == 'Q':
                return False
            i -= 1
            j -= 1

        # Check anti-diagonal
        i, j = row - 1, col + 1
        while i >= 0 and j < n:
            if board[i][j] == 'Q':
                return False
            i -= 1
            j += 1

        return True

    def backtrack(row):
        if row == n:
            result.append([''.join(row) for row in board])
            return

        for col in range(n):
            if is_safe(row, col):
                board[row][col] = 'Q'
                backtrack(row + 1)
                board[row][col] = '.'

    backtrack(0)
    return result`,
      commonProblems: [
        'Subsets',
        'Permutations',
        'Combination Sum',
        'Generate Parentheses',
        'Word Search',
        'N-Queens'
      ]
    },
    {
      id: 'dynamic-programming',
      name: 'Dynamic Programming',
      icon: '📈',
      color: '#a855f7',
      category: 'DP',
      description: 'Break down problems using memoization or tabulation',
      whenToUse: [
        'Optimization problems (max/min)',
        'Counting problems',
        'Overlapping subproblems',
        'Optimal substructure',
        'Decision-making at each step'
      ],
      timeComplexity: 'Varies (often O(n²))',
      spaceComplexity: 'O(n) or O(n²)',
      codeExample: `# Pattern: 1D DP (Fibonacci)
def fib(n):
    if n <= 1:
        return n

    dp = [0] * (n + 1)
    dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]

    return dp[n]

# Space optimized
def fib_optimized(n):
    if n <= 1:
        return n

    prev2, prev1 = 0, 1

    for _ in range(2, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current

    return prev1

# Pattern: Climbing stairs
def climb_stairs(n):
    """Ways to climb n stairs (1 or 2 steps at a time)"""
    if n <= 2:
        return n

    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2

    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]

    return dp[n]

# Pattern: House Robber
def rob(nums):
    """Max money robbing non-adjacent houses"""
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]

    prev2 = 0  # dp[i-2]
    prev1 = nums[0]  # dp[i-1]

    for i in range(1, len(nums)):
        # Either rob current + prev2, or skip current
        current = max(nums[i] + prev2, prev1)
        prev2 = prev1
        prev1 = current

    return prev1

# Pattern: Coin Change (unbounded knapsack)
def coin_change(coins, amount):
    """Minimum coins needed to make amount"""
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0

    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1

# Pattern: Longest Increasing Subsequence
def length_of_lis(nums):
    """Length of longest increasing subsequence"""
    if not nums:
        return 0

    dp = [1] * len(nums)

    for i in range(1, len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)

# Pattern: 0/1 Knapsack
def knapsack(weights, values, capacity):
    """Maximum value with weight capacity"""
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(1, capacity + 1):
            if weights[i-1] <= w:
                # Max of: include item or exclude item
                dp[i][w] = max(
                    values[i-1] + dp[i-1][w - weights[i-1]],
                    dp[i-1][w]
                )
            else:
                dp[i][w] = dp[i-1][w]

    return dp[n][capacity]

# Pattern: Longest Common Subsequence
def longest_common_subsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    return dp[m][n]

# Pattern: Edit Distance
def min_distance(word1, word2):
    """Minimum operations to convert word1 to word2"""
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Base cases
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],    # Delete
                    dp[i][j-1],    # Insert
                    dp[i-1][j-1]   # Replace
                )

    return dp[m][n]

# Pattern: Maximum Subarray (Kadane's)
def max_subarray(nums):
    """Maximum sum of contiguous subarray"""
    max_current = max_global = nums[0]

    for num in nums[1:]:
        max_current = max(num, max_current + num)
        max_global = max(max_global, max_current)

    return max_global`,
      commonProblems: [
        'Climbing Stairs',
        'House Robber',
        'Coin Change',
        'Longest Increasing Subsequence',
        '0/1 Knapsack',
        'Longest Common Subsequence',
        'Edit Distance'
      ]
    },
    {
      id: 'monotonic-stack',
      name: 'Monotonic Stack',
      icon: '📚',
      color: '#64748b',
      category: 'Stack',
      description: 'Stack maintaining monotonic order for next greater/smaller',
      whenToUse: [
        'Next greater/smaller element',
        'Largest rectangle in histogram',
        'Trapping rain water',
        'Stock span problems',
        'Daily temperatures'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      codeExample: `# Pattern: Next greater element
def next_greater_element(nums):
    """Find next greater element for each element"""
    result = [-1] * len(nums)
    stack = []  # Store indices

    for i in range(len(nums)):
        # While current is greater than stack top
        while stack and nums[i] > nums[stack[-1]]:
            idx = stack.pop()
            result[idx] = nums[i]

        stack.append(i)

    return result

# Pattern: Daily temperatures
def daily_temperatures(temperatures):
    """Days until warmer temperature"""
    result = [0] * len(temperatures)
    stack = []  # Monotonic decreasing stack

    for i, temp in enumerate(temperatures):
        while stack and temp > temperatures[stack[-1]]:
            prev_idx = stack.pop()
            result[prev_idx] = i - prev_idx

        stack.append(i)

    return result

# Pattern: Largest rectangle in histogram
def largest_rectangle_area(heights):
    """Largest rectangle area in histogram"""
    stack = []
    max_area = 0

    for i, h in enumerate(heights):
        start = i

        # Pop taller bars and calculate area
        while stack and stack[-1][1] > h:
            idx, height = stack.pop()
            area = height * (i - idx)
            max_area = max(max_area, area)
            start = idx

        stack.append((start, h))

    # Process remaining bars
    for i, h in stack:
        area = h * (len(heights) - i)
        max_area = max(max_area, area)

    return max_area

# Pattern: Trapping rain water (monotonic stack approach)
def trap(height):
    """Amount of water trapped after rain"""
    stack = []
    water = 0

    for i, h in enumerate(height):
        while stack and h > height[stack[-1]]:
            bottom = stack.pop()

            if not stack:
                break

            # Calculate trapped water
            left = stack[-1]
            width = i - left - 1
            bounded_height = min(h, height[left]) - height[bottom]
            water += width * bounded_height

        stack.append(i)

    return water

# Pattern: Remove k digits
def remove_k_digits(num, k):
    """Remove k digits to get smallest number"""
    stack = []

    for digit in num:
        # Remove larger digits
        while k > 0 and stack and stack[-1] > digit:
            stack.pop()
            k -= 1

        stack.append(digit)

    # Remove remaining k digits from end
    stack = stack[:-k] if k > 0 else stack

    # Remove leading zeros and return
    return ''.join(stack).lstrip('0') or '0'

# Pattern: Stock span
def calculate_span(prices):
    """Stock span for each day"""
    span = [1] * len(prices)
    stack = []  # Monotonic decreasing stack

    for i, price in enumerate(prices):
        # Pop prices smaller or equal
        while stack and prices[stack[-1]] <= price:
            stack.pop()

        # Span is distance to previous greater
        span[i] = i + 1 if not stack else i - stack[-1]
        stack.append(i)

    return span

# Pattern: Sum of subarray minimums
def sum_subarray_mins(arr):
    """Sum of minimum of all subarrays"""
    MOD = 10**9 + 7
    n = len(arr)

    # Find previous and next smaller elements
    left = [0] * n  # Distance to previous smaller
    right = [0] * n  # Distance to next smaller

    stack = []

    # Previous smaller
    for i in range(n):
        while stack and arr[stack[-1]] > arr[i]:
            stack.pop()
        left[i] = i + 1 if not stack else i - stack[-1]
        stack.append(i)

    stack = []

    # Next smaller
    for i in range(n - 1, -1, -1):
        while stack and arr[stack[-1]] >= arr[i]:
            stack.pop()
        right[i] = n - i if not stack else stack[-1] - i
        stack.append(i)

    # Calculate sum
    result = 0
    for i in range(n):
        result = (result + arr[i] * left[i] * right[i]) % MOD

    return result`,
      commonProblems: [
        'Next Greater Element',
        'Daily Temperatures',
        'Largest Rectangle in Histogram',
        'Trapping Rain Water',
        'Remove K Digits',
        'Sum of Subarray Minimums'
      ]
    },
    {
      id: 'graph-traversal',
      name: 'Graph Traversal',
      icon: '🕸️',
      color: '#84cc16',
      category: 'Graph',
      description: 'BFS/DFS for graph problems',
      whenToUse: [
        'Connected components',
        'Shortest path (BFS)',
        'Cycle detection',
        'Island problems',
        'Course schedule'
      ],
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      codeExample: `from collections import deque, defaultdict

# Pattern: DFS on graph
def dfs_graph(graph, start):
    """DFS traversal of graph"""
    visited = set()
    result = []

    def dfs(node):
        visited.add(node)
        result.append(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                dfs(neighbor)

    dfs(start)
    return result

# Pattern: BFS on graph
def bfs_graph(graph, start):
    """BFS traversal of graph"""
    visited = {start}
    queue = deque([start])
    result = []

    while queue:
        node = queue.popleft()
        result.append(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return result

# Pattern: Number of islands (DFS)
def num_islands(grid):
    """Count number of islands in grid"""
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        if (r < 0 or r >= rows or c < 0 or c >= cols or
            grid[r][c] == '0'):
            return

        grid[r][c] = '0'  # Mark as visited

        # Explore neighbors
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                dfs(r, c)
                count += 1

    return count

# Pattern: Course schedule (cycle detection)
def can_finish(num_courses, prerequisites):
    """Can finish all courses (detect cycle)"""
    graph = defaultdict(list)
    for course, prereq in prerequisites:
        graph[prereq].append(course)

    # 0 = unvisited, 1 = visiting, 2 = visited
    state = [0] * num_courses

    def has_cycle(course):
        if state[course] == 1:  # Currently visiting
            return True
        if state[course] == 2:  # Already visited
            return False

        state[course] = 1  # Mark as visiting

        for neighbor in graph[course]:
            if has_cycle(neighbor):
                return True

        state[course] = 2  # Mark as visited
        return False

    for course in range(num_courses):
        if has_cycle(course):
            return False

    return True

# Pattern: Clone graph
def clone_graph(node):
    """Deep copy of graph"""
    if not node:
        return None

    clones = {}  # old_node -> new_node

    def dfs(node):
        if node in clones:
            return clones[node]

        clone = Node(node.val)
        clones[node] = clone

        for neighbor in node.neighbors:
            clone.neighbors.append(dfs(neighbor))

        return clone

    return dfs(node)

# Pattern: Shortest path in grid (BFS)
def shortest_path_binary_matrix(grid):
    """Shortest path from top-left to bottom-right"""
    n = len(grid)

    if grid[0][0] == 1 or grid[n-1][n-1] == 1:
        return -1

    directions = [(-1,-1),(-1,0),(-1,1),(0,-1),
                  (0,1),(1,-1),(1,0),(1,1)]

    queue = deque([(0, 0, 1)])  # (row, col, distance)
    grid[0][0] = 1  # Mark as visited

    while queue:
        r, c, dist = queue.popleft()

        if r == n - 1 and c == n - 1:
            return dist

        for dr, dc in directions:
            nr, nc = r + dr, c + dc

            if (0 <= nr < n and 0 <= nc < n and
                grid[nr][nc] == 0):
                grid[nr][nc] = 1  # Mark visited
                queue.append((nr, nc, dist + 1))

    return -1

# Pattern: Word ladder (BFS shortest transformation)
def ladder_length(begin_word, end_word, word_list):
    """Minimum transformations from begin to end word"""
    word_set = set(word_list)

    if end_word not in word_set:
        return 0

    queue = deque([(begin_word, 1)])

    while queue:
        word, steps = queue.popleft()

        if word == end_word:
            return steps

        # Try all possible transformations
        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                next_word = word[:i] + c + word[i+1:]

                if next_word in word_set:
                    word_set.remove(next_word)
                    queue.append((next_word, steps + 1))

    return 0`,
      commonProblems: [
        'Number of Islands',
        'Clone Graph',
        'Course Schedule',
        'Pacific Atlantic Water Flow',
        'Shortest Path in Binary Matrix',
        'Word Ladder'
      ]
    },
    {
      id: 'union-find',
      name: 'Union Find',
      icon: '🔗',
      color: '#fb923c',
      category: 'Graph',
      description: 'Disjoint Set Union (DSU) for connectivity problems',
      whenToUse: [
        'Connected components',
        'Cycle detection in undirected graph',
        'Network connectivity',
        'Redundant connections',
        'Number of provinces'
      ],
      timeComplexity: 'O(α(n)) ≈ O(1) with path compression',
      spaceComplexity: 'O(n)',
      codeExample: `# Pattern: Union Find data structure
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = n  # Number of components

    def find(self, x):
        """Find with path compression"""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        """Union by rank"""
        root_x = self.find(x)
        root_y = self.find(y)

        if root_x == root_y:
            return False  # Already connected

        # Attach smaller tree under larger tree
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1

        self.count -= 1
        return True

    def connected(self, x, y):
        """Check if two nodes are connected"""
        return self.find(x) == self.find(y)

# Pattern: Number of connected components
def count_components(n, edges):
    """Count connected components in undirected graph"""
    uf = UnionFind(n)

    for u, v in edges:
        uf.union(u, v)

    return uf.count

# Pattern: Redundant connection (detect cycle)
def find_redundant_connection(edges):
    """Find edge that creates cycle"""
    n = len(edges)
    uf = UnionFind(n + 1)

    for u, v in edges:
        if not uf.union(u, v):
            return [u, v]  # This edge creates cycle

    return []

# Pattern: Number of provinces
def find_circle_num(is_connected):
    """Number of provinces in adjacency matrix"""
    n = len(is_connected)
    uf = UnionFind(n)

    for i in range(n):
        for j in range(i + 1, n):
            if is_connected[i][j]:
                uf.union(i, j)

    return uf.count

# Pattern: Accounts merge
def accounts_merge(accounts):
    """Merge accounts belonging to same person"""
    from collections import defaultdict

    email_to_id = {}
    email_to_name = {}

    uf = UnionFind(len(accounts))

    # Build graph
    for i, account in enumerate(accounts):
        name = account[0]

        for email in account[1:]:
            email_to_name[email] = name

            if email in email_to_id:
                uf.union(i, email_to_id[email])
            else:
                email_to_id[email] = i

    # Group emails by component
    components = defaultdict(list)
    for email, idx in email_to_id.items():
        root = uf.find(idx)
        components[root].append(email)

    # Build result
    result = []
    for emails in components.values():
        name = email_to_name[emails[0]]
        result.append([name] + sorted(emails))

    return result

# Pattern: Earliest friends
def earliest_friends(logs, n):
    """Find earliest moment when everyone becomes friends"""
    logs.sort()  # Sort by timestamp
    uf = UnionFind(n)

    for timestamp, x, y in logs:
        uf.union(x, y)

        if uf.count == 1:  # All connected
            return timestamp

    return -1  # Not all connected

# Pattern: Number of operations to make connected
def make_connected(n, connections):
    """Min operations to make network connected"""
    if len(connections) < n - 1:
        return -1  # Not enough cables

    uf = UnionFind(n)

    for u, v in connections:
        uf.union(u, v)

    # Need (components - 1) operations
    return uf.count - 1

# Pattern: Graph Valid Tree
def valid_tree(n, edges):
    """Check if edges form a valid tree"""
    # Tree has exactly n-1 edges and no cycles
    if len(edges) != n - 1:
        return False

    uf = UnionFind(n)

    for u, v in edges:
        if not uf.union(u, v):
            return False  # Cycle detected

    return uf.count == 1  # All connected`,
      commonProblems: [
        'Number of Connected Components',
        'Redundant Connection',
        'Number of Provinces',
        'Accounts Merge',
        'Graph Valid Tree',
        'Satisfiability of Equality Equations'
      ]
    },
    {
      id: 'dp-linear',
      name: 'DP Pattern 1: Linear DP (1D)',
      icon: '📈',
      color: '#3b82f6',
      category: 'Dynamic Programming',
      description: 'Foundation of DP - breaking problems into subproblems',
      whenToUse: [
        'Single sequence problems',
        'Decisions at each step affect future',
        'Overlapping subproblems',
        'Can solve smaller version first'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n) or O(1) optimized',
      codeExample: `# Classic: Climbing Stairs
def climbStairs(n):
    if n <= 2:
        return n

    # dp[i] = ways to reach step i
    prev2, prev1 = 1, 2

    for i in range(3, n + 1):
        current = prev1 + prev2
        prev2, prev1 = prev1, current

    return prev1

# House Robber
def rob(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]

    # dp[i] = max money up to house i
    prev2, prev1 = nums[0], max(nums[0], nums[1])

    for i in range(2, len(nums)):
        current = max(prev1, prev2 + nums[i])
        prev2, prev1 = prev1, current

    return prev1

# Word Break
def wordBreak(s, wordDict):
    word_set = set(wordDict)
    dp = [False] * (len(s) + 1)
    dp[0] = True  # Empty string

    for i in range(1, len(s) + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break

    return dp[len(s)]`,
      commonProblems: [
        'Climbing Stairs',
        'House Robber',
        'Min Cost Climbing Stairs',
        'Word Break',
        'Decode Ways',
        'House Robber II'
      ]
    },
    {
      id: 'dp-lis',
      name: 'DP Pattern 2: Longest Increasing Subsequence',
      icon: '📊',
      color: '#10b981',
      category: 'Dynamic Programming',
      description: 'Finding longest increasing subsequence with O(n log n) optimization',
      whenToUse: [
        'Increasing/decreasing sequence problems',
        'Box stacking problems',
        'Version control applications',
        'Patience sorting'
      ],
      timeComplexity: 'O(n²) or O(n log n) with binary search',
      spaceComplexity: 'O(n)',
      codeExample: `# LIS - O(n²) solution
def lengthOfLIS(nums):
    if not nums:
        return 0

    n = len(nums)
    dp = [1] * n  # dp[i] = LIS ending at i

    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)

# LIS - O(n log n) with binary search
def lengthOfLIS_optimized(nums):
    from bisect import bisect_left

    tails = []  # tails[i] = smallest tail of LIS of length i+1

    for num in nums:
        pos = bisect_left(tails, num)
        if pos == len(tails):
            tails.append(num)
        else:
            tails[pos] = num

    return len(tails)

# Number of LIS
def findNumberOfLIS(nums):
    n = len(nums)
    lengths = [1] * n  # Length of LIS ending at i
    counts = [1] * n   # Number of LIS ending at i

    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                if lengths[j] + 1 > lengths[i]:
                    lengths[i] = lengths[j] + 1
                    counts[i] = counts[j]
                elif lengths[j] + 1 == lengths[i]:
                    counts[i] += counts[j]

    max_len = max(lengths)
    return sum(c for l, c in zip(lengths, counts) if l == max_len)`,
      commonProblems: [
        'Longest Increasing Subsequence',
        'Number of Longest Increasing Subsequence',
        'Russian Doll Envelopes',
        'Maximum Length of Pair Chain'
      ]
    },
    {
      id: 'dp-knapsack',
      name: 'DP Pattern 3: Knapsack',
      icon: '🎒',
      color: '#8b5cf6',
      category: 'Dynamic Programming',
      description: '0/1 and Unbounded Knapsack patterns',
      whenToUse: [
        'Subset selection with constraints',
        'Resource allocation',
        'Partitioning problems',
        'Combination/coin change'
      ],
      timeComplexity: 'O(n * target)',
      spaceComplexity: 'O(target)',
      codeExample: `# 0/1 Knapsack - Partition Equal Subset Sum
def canPartition(nums):
    total = sum(nums)
    if total % 2:
        return False

    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True

    for num in nums:
        # Traverse backwards for 0/1 knapsack
        for j in range(target, num - 1, -1):
            dp[j] = dp[j] or dp[j - num]

    return dp[target]

# Unbounded Knapsack - Coin Change
def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0

    # Traverse forwards for unbounded
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1

# Coin Change 2 - Number of combinations
def change(amount, coins):
    dp = [0] * (amount + 1)
    dp[0] = 1

    # Order matters: iterate coins first for combinations
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] += dp[i - coin]

    return dp[amount]

# Target Sum (0/1 variant)
def findTargetSumWays(nums, target):
    total = sum(nums)
    if abs(target) > total or (total + target) % 2:
        return 0

    # Transform to subset sum problem
    subset_sum = (total + target) // 2
    dp = [0] * (subset_sum + 1)
    dp[0] = 1

    for num in nums:
        for j in range(subset_sum, num - 1, -1):
            dp[j] += dp[j - num]

    return dp[subset_sum]`,
      commonProblems: [
        'Partition Equal Subset Sum',
        'Target Sum',
        'Coin Change',
        'Coin Change 2',
        'Combination Sum IV',
        'Perfect Squares',
        'Ones and Zeroes'
      ]
    },
    {
      id: 'dp-grid',
      name: 'DP Pattern 4: Grid DP',
      icon: '🔲',
      color: '#f59e0b',
      category: 'Dynamic Programming',
      description: '2D grid traversal with DP',
      whenToUse: [
        'Matrix path problems',
        'Robot movement',
        'Square/rectangle problems',
        '2D optimization'
      ],
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n) or O(n) optimized',
      codeExample: `# Unique Paths
def uniquePaths(m, n):
    dp = [[1] * n for _ in range(m)]

    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]

    return dp[m-1][n-1]

# Space optimized O(n)
def uniquePaths_optimized(m, n):
    dp = [1] * n

    for i in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j-1]

    return dp[n-1]

# Minimum Path Sum
def minPathSum(grid):
    m, n = len(grid), len(grid[0])

    for i in range(m):
        for j in range(n):
            if i == 0 and j == 0:
                continue
            elif i == 0:
                grid[i][j] += grid[i][j-1]
            elif j == 0:
                grid[i][j] += grid[i-1][j]
            else:
                grid[i][j] += min(grid[i-1][j], grid[i][j-1])

    return grid[m-1][n-1]

# Maximal Square
def maximalSquare(matrix):
    if not matrix:
        return 0

    m, n = len(matrix), len(matrix[0])
    dp = [[0] * n for _ in range(m)]
    max_side = 0

    for i in range(m):
        for j in range(n):
            if matrix[i][j] == '1':
                if i == 0 or j == 0:
                    dp[i][j] = 1
                else:
                    dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
                max_side = max(max_side, dp[i][j])

    return max_side * max_side`,
      commonProblems: [
        'Unique Paths',
        'Unique Paths II',
        'Minimum Path Sum',
        'Maximal Square',
        'Maximal Rectangle',
        'Triangle'
      ]
    },
    {
      id: 'dp-string',
      name: 'DP Pattern 5: String DP',
      icon: '📝',
      color: '#ef4444',
      category: 'Dynamic Programming',
      description: 'String matching and manipulation with DP',
      whenToUse: [
        'Two string comparison',
        'Edit distance problems',
        'Palindrome problems',
        'Pattern matching'
      ],
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n)',
      codeExample: `# Longest Common Subsequence
def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    return dp[m][n]

# Edit Distance
def minDistance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Base cases
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],    # Delete
                    dp[i][j-1],    # Insert
                    dp[i-1][j-1]   # Replace
                )

    return dp[m][n]

# Longest Palindromic Substring
def longestPalindrome(s):
    n = len(s)
    if n < 2:
        return s

    dp = [[False] * n for _ in range(n)]
    start, max_len = 0, 1

    # Every single character is palindrome
    for i in range(n):
        dp[i][i] = True

    # Check length 2
    for i in range(n - 1):
        if s[i] == s[i + 1]:
            dp[i][i + 1] = True
            start, max_len = i, 2

    # Check length 3+
    for length in range(3, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j] and dp[i + 1][j - 1]:
                dp[i][j] = True
                start, max_len = i, length

    return s[start:start + max_len]

# Wildcard Matching
def isMatch(s, p):
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True

    # Handle leading '*'
    for j in range(1, n + 1):
        if p[j-1] == '*':
            dp[0][j] = dp[0][j-1]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j-1] == '*':
                dp[i][j] = dp[i-1][j] or dp[i][j-1]
            elif p[j-1] == '?' or s[i-1] == p[j-1]:
                dp[i][j] = dp[i-1][j-1]

    return dp[m][n]`,
      commonProblems: [
        'Longest Common Subsequence',
        'Edit Distance',
        'Longest Palindromic Substring',
        'Palindromic Substrings',
        'Regular Expression Matching',
        'Wildcard Matching'
      ]
    },
    {
      id: 'dp-interval',
      name: 'DP Pattern 6: Interval DP',
      icon: '⏱️',
      color: '#ec4899',
      category: 'Dynamic Programming',
      description: 'Solving problems on ranges/intervals',
      whenToUse: [
        'Range optimization',
        'Matrix chain multiplication',
        'Palindrome partitioning',
        'Merge operations'
      ],
      timeComplexity: 'O(n³)',
      spaceComplexity: 'O(n²)',
      codeExample: `# Burst Balloons
def maxCoins(nums):
    nums = [1] + nums + [1]  # Add boundaries
    n = len(nums)
    dp = [[0] * n for _ in range(n)]

    # length is the gap between left and right
    for length in range(2, n):
        for left in range(n - length):
            right = left + length
            # Try bursting each balloon in (left, right)
            for i in range(left + 1, right):
                coins = nums[left] * nums[i] * nums[right]
                coins += dp[left][i] + dp[i][right]
                dp[left][right] = max(dp[left][right], coins)

    return dp[0][n-1]

# Minimum Cost Tree From Leaf Values
def mctFromLeafValues(arr):
    n = len(arr)
    dp = [[float('inf')] * n for _ in range(n)]
    max_val = [[0] * n for _ in range(n)]

    # Precompute max in each range
    for i in range(n):
        max_val[i][i] = arr[i]
        dp[i][i] = 0
        for j in range(i + 1, n):
            max_val[i][j] = max(max_val[i][j-1], arr[j])

    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            for k in range(i, j):
                dp[i][j] = min(
                    dp[i][j],
                    dp[i][k] + dp[k+1][j] + max_val[i][k] * max_val[k+1][j]
                )

    return dp[0][n-1]

# Palindrome Partitioning II
def minCut(s):
    n = len(s)
    # is_pal[i][j] = is s[i:j+1] palindrome
    is_pal = [[False] * n for _ in range(n)]

    for i in range(n):
        is_pal[i][i] = True

    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                is_pal[i][j] = (length == 2) or is_pal[i+1][j-1]

    # dp[i] = min cuts for s[0:i+1]
    dp = [i for i in range(n)]

    for i in range(n):
        if is_pal[0][i]:
            dp[i] = 0
        else:
            for j in range(i):
                if is_pal[j+1][i]:
                    dp[i] = min(dp[i], dp[j] + 1)

    return dp[n-1]`,
      commonProblems: [
        'Burst Balloons',
        'Minimum Score Triangulation of Polygon',
        'Minimum Cost Tree From Leaf Values',
        'Guess Number Higher or Lower II',
        'Palindrome Partitioning II'
      ]
    },
    {
      id: 'dp-state-machine',
      name: 'DP Pattern 7: State Machine DP',
      icon: '🔄',
      color: '#06b6d4',
      category: 'Dynamic Programming',
      description: 'Problems with state transitions',
      whenToUse: [
        'Stock trading problems',
        'State-based decisions',
        'Transaction limits',
        'Cooldown periods'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      codeExample: `# Best Time to Buy and Sell Stock
def maxProfit(prices):
    min_price = float('inf')
    max_profit = 0

    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)

    return max_profit

# Best Time to Buy and Sell Stock II (Unlimited)
def maxProfit_II(prices):
    profit = 0
    for i in range(1, len(prices)):
        if prices[i] > prices[i-1]:
            profit += prices[i] - prices[i-1]
    return profit

# Best Time to Buy and Sell Stock with Cooldown
def maxProfit_cooldown(prices):
    if not prices:
        return 0

    # States: hold, sold, rest
    hold = -prices[0]  # Holding stock
    sold = 0           # Just sold
    rest = 0           # Resting (can buy)

    for i in range(1, len(prices)):
        prev_hold, prev_sold, prev_rest = hold, sold, rest

        hold = max(prev_hold, prev_rest - prices[i])
        sold = prev_hold + prices[i]
        rest = max(prev_rest, prev_sold)

    return max(sold, rest)

# Best Time to Buy and Sell Stock IV (k transactions)
def maxProfit_k(k, prices):
    if not prices or k == 0:
        return 0

    n = len(prices)
    if k >= n // 2:  # Unlimited transactions
        return sum(max(0, prices[i+1] - prices[i]) for i in range(n-1))

    # buy[i][j] = max profit after at most i trans, on day j, holding
    # sell[i][j] = max profit after at most i trans, on day j, not holding
    buy = [[float('-inf')] * n for _ in range(k + 1)]
    sell = [[0] * n for _ in range(k + 1)]

    for i in range(1, k + 1):
        buy[i][0] = -prices[0]
        for j in range(1, n):
            buy[i][j] = max(buy[i][j-1], sell[i-1][j-1] - prices[j])
            sell[i][j] = max(sell[i][j-1], buy[i][j-1] + prices[j])

    return sell[k][n-1]`,
      commonProblems: [
        'Best Time to Buy and Sell Stock',
        'Best Time to Buy and Sell Stock II',
        'Best Time to Buy and Sell Stock III',
        'Best Time to Buy and Sell Stock IV',
        'Best Time to Buy and Sell Stock with Cooldown',
        'Best Time to Buy and Sell Stock with Transaction Fee'
      ]
    },
    {
      id: 'dp-tree',
      name: 'DP Pattern 8: Tree DP',
      icon: '🌳',
      color: '#22c55e',
      category: 'Dynamic Programming',
      description: 'DP on tree structures',
      whenToUse: [
        'Tree optimization',
        'Path problems in trees',
        'Subtree computations',
        'Parent-child decisions'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h) where h is height',
      codeExample: `# House Robber III
def rob(root):
    def dfs(node):
        if not node:
            return (0, 0)

        left = dfs(node.left)
        right = dfs(node.right)

        # Rob this node: can't rob children
        rob_current = node.val + left[1] + right[1]

        # Don't rob: take max of children
        not_rob = max(left) + max(right)

        return (rob_current, not_rob)

    return max(dfs(root))

# Binary Tree Maximum Path Sum
def maxPathSum(root):
    max_sum = float('-inf')

    def dfs(node):
        nonlocal max_sum
        if not node:
            return 0

        # Only take positive contributions
        left = max(0, dfs(node.left))
        right = max(0, dfs(node.right))

        # Path through this node
        max_sum = max(max_sum, node.val + left + right)

        # Return max path going down
        return node.val + max(left, right)

    dfs(root)
    return max_sum

# Diameter of Binary Tree
def diameterOfBinaryTree(root):
    diameter = 0

    def dfs(node):
        nonlocal diameter
        if not node:
            return 0

        left_height = dfs(node.left)
        right_height = dfs(node.right)

        # Update diameter
        diameter = max(diameter, left_height + right_height)

        # Return height
        return 1 + max(left_height, right_height)

    dfs(root)
    return diameter

# Binary Tree Cameras
def minCameraCover(root):
    # States: 0 = needs cover, 1 = has camera, 2 = covered
    cameras = 0

    def dfs(node):
        nonlocal cameras
        if not node:
            return 2  # Null is covered

        left = dfs(node.left)
        right = dfs(node.right)

        # If either child needs cover, put camera here
        if left == 0 or right == 0:
            cameras += 1
            return 1

        # If either child has camera, this is covered
        if left == 1 or right == 1:
            return 2

        # Both children covered, this needs cover
        return 0

    # If root needs cover, add camera
    return cameras + (1 if dfs(root) == 0 else 0)`,
      commonProblems: [
        'House Robber III',
        'Binary Tree Maximum Path Sum',
        'Diameter of Binary Tree',
        'Binary Tree Cameras',
        'Maximum Sum BST in Binary Tree'
      ]
    },
    {
      id: 'dp-digit',
      name: 'DP Pattern 9: Digit DP',
      icon: '🔢',
      color: '#a855f7',
      category: 'Dynamic Programming',
      description: 'Counting numbers with specific digit properties',
      whenToUse: [
        'Count numbers in range',
        'Digit constraints',
        'Number properties',
        'Combinatorial counting'
      ],
      timeComplexity: 'O(log N * digits)',
      spaceComplexity: 'O(log N)',
      codeExample: `# Count Numbers with Unique Digits
def countNumbersWithUniqueDigits(n):
    if n == 0:
        return 1
    if n == 1:
        return 10

    # First digit: 9 choices (1-9)
    # Second digit: 9 choices (0-9 except first)
    # Third digit: 8 choices, etc.
    result = 10
    unique_digits = 9
    available_digits = 9

    for i in range(2, n + 1):
        unique_digits *= available_digits
        result += unique_digits
        available_digits -= 1

    return result

# Numbers At Most N Given Digit Set
def atMostNGivenDigitSet(digits, n):
    s = str(n)
    k = len(s)
    d = len(digits)

    # Count numbers with fewer digits
    result = sum(d ** i for i in range(1, k))

    # Count numbers with same number of digits
    for i, char in enumerate(s):
        # Count valid digits less than current digit
        count = sum(1 for digit in digits if digit < char)
        result += count * (d ** (k - i - 1))

        # If no exact match, break
        if char not in digits:
            break
    else:
        # All digits matched
        result += 1

    return result

# Count Special Integers (no repeated digits)
def countSpecialNumbers(n):
    def count_up_to_digits(d, tight, used, s):
        if d == len(s):
            return 1

        result = 0
        limit = int(s[d]) if tight else 9

        for digit in range(0, limit + 1):
            if used & (1 << digit):  # Digit already used
                continue

            # Skip leading zeros
            if used == 0 and digit == 0 and d > 0:
                result += count_up_to_digits(
                    d + 1, False, 0, s
                )
            else:
                result += count_up_to_digits(
                    d + 1,
                    tight and (digit == limit),
                    used | (1 << digit),
                    s
                )

        return result

    s = str(n)
    total = count_up_to_digits(0, True, 0, s)

    # Add numbers with fewer digits
    for length in range(1, len(s)):
        if length == 1:
            total += 9
        else:
            # First digit: 1-9, rest: 0-9 except used
            result = 9
            for i in range(1, length):
                result *= (10 - i)
            total += result

    return total - 1  # Exclude 0`,
      commonProblems: [
        'Number of Digit One',
        'Count Numbers with Unique Digits',
        'Numbers At Most N Given Digit Set',
        'Count Special Integers',
        'Numbers With Repeated Digits'
      ]
    },
    {
      id: 'dp-game-theory',
      name: 'DP Pattern 10: Game Theory (Minimax)',
      icon: '🎮',
      color: '#f97316',
      category: 'Dynamic Programming',
      description: 'Two-player games with optimal play',
      whenToUse: [
        'Two-player games',
        'Optimal strategies',
        'Min-max decisions',
        'Adversarial scenarios'
      ],
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(n²)',
      codeExample: `# Stone Game
def stoneGame(piles):
    n = len(piles)
    # dp[i][j] = max stones first player gets more than second
    # in piles[i:j+1]
    dp = [[0] * n for _ in range(n)]

    # Base case: single pile
    for i in range(n):
        dp[i][i] = piles[i]

    # Fill diagonally
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            # Take left or right
            dp[i][j] = max(
                piles[i] - dp[i+1][j],  # Take left
                piles[j] - dp[i][j-1]   # Take right
            )

    return dp[0][n-1] > 0

# Predict the Winner
def predictTheWinner(nums):
    n = len(nums)
    dp = [[0] * n for _ in range(n)]

    for i in range(n):
        dp[i][i] = nums[i]

    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = max(
                nums[i] - dp[i+1][j],
                nums[j] - dp[i][j-1]
            )

    return dp[0][n-1] >= 0

# Stone Game II
def stoneGameII(piles):
    n = len(piles)
    # Suffix sum
    suffix = [0] * n
    suffix[-1] = piles[-1]
    for i in range(n-2, -1, -1):
        suffix[i] = suffix[i+1] + piles[i]

    # dp[i][m] = max stones starting at i with M=m
    from functools import lru_cache

    @lru_cache(None)
    def dp(i, m):
        if i >= n:
            return 0
        if i + 2 * m >= n:
            return suffix[i]

        max_stones = 0
        for x in range(1, 2 * m + 1):
            # Opponent gets dp(i+x, max(m, x))
            # We get total - opponent
            opponent = dp(i + x, max(m, x))
            max_stones = max(max_stones, suffix[i] - opponent)

        return max_stones

    return dp(0, 1)

# Can I Win
def canIWin(maxChoosableInteger, desiredTotal):
    if desiredTotal <= 0:
        return True
    if maxChoosableInteger * (maxChoosableInteger + 1) // 2 < desiredTotal:
        return False

    from functools import lru_cache

    @lru_cache(None)
    def can_win(used, total):
        if total <= 0:
            return False

        for i in range(1, maxChoosableInteger + 1):
            if used & (1 << i):
                continue

            # If opponent can't win after our move, we win
            if not can_win(used | (1 << i), total - i):
                return True

        return False

    return can_win(0, desiredTotal)`,
      commonProblems: [
        'Stone Game',
        'Stone Game II',
        'Stone Game III',
        'Predict the Winner',
        'Can I Win',
        'Stone Game IV'
      ]
    },
    {
      id: 'dp-bitmask',
      name: 'DP Pattern 11: Bitmask DP',
      icon: '🔣',
      color: '#6366f1',
      category: 'Dynamic Programming',
      description: 'Using bitmasks to track subsets',
      whenToUse: [
        'Small set problems (n ≤ 20)',
        'Subset tracking',
        'TSP variants',
        'Assignment problems'
      ],
      timeComplexity: 'O(n * 2^n)',
      spaceComplexity: 'O(2^n)',
      codeExample: `# Shortest Path Visiting All Nodes
def shortestPathLength(graph):
    n = len(graph)
    target = (1 << n) - 1

    # BFS with state (node, visited_mask)
    from collections import deque
    queue = deque([(i, 1 << i, 0) for i in range(n)])
    visited = {(i, 1 << i) for i in range(n)}

    while queue:
        node, mask, dist = queue.popleft()

        if mask == target:
            return dist

        for neighbor in graph[node]:
            new_mask = mask | (1 << neighbor)
            if (neighbor, new_mask) not in visited:
                visited.add((neighbor, new_mask))
                queue.append((neighbor, new_mask, dist + 1))

    return -1

# Partition to K Equal Sum Subsets
def canPartitionKSubsets(nums, k):
    total = sum(nums)
    if total % k:
        return False

    target = total // k
    nums.sort(reverse=True)

    if nums[0] > target:
        return False

    n = len(nums)
    dp = {}

    def dfs(mask, subset_sum):
        if mask == (1 << n) - 1:
            return True

        if mask in dp:
            return dp[mask]

        if subset_sum == target:
            # Start new subset
            result = dfs(mask, 0)
        else:
            result = False
            for i in range(n):
                if mask & (1 << i):
                    continue
                if subset_sum + nums[i] <= target:
                    if dfs(mask | (1 << i), subset_sum + nums[i]):
                        result = True
                        break

        dp[mask] = result
        return result

    return dfs(0, 0)

# TSP - Traveling Salesman Problem
def tsp(dist):
    n = len(dist)
    ALL = (1 << n) - 1

    # dp[mask][i] = min cost visiting cities in mask, ending at i
    dp = [[float('inf')] * n for _ in range(1 << n)]
    dp[1][0] = 0  # Start at city 0

    for mask in range(1 << n):
        for last in range(n):
            if not (mask & (1 << last)):
                continue
            if dp[mask][last] == float('inf'):
                continue

            for next_city in range(n):
                if mask & (1 << next_city):
                    continue

                new_mask = mask | (1 << next_city)
                dp[new_mask][next_city] = min(
                    dp[new_mask][next_city],
                    dp[mask][last] + dist[last][next_city]
                )

    # Return to start
    return min(dp[ALL][i] + dist[i][0] for i in range(1, n))

# Smallest Sufficient Team
def smallestSufficientTeam(req_skills, people):
    n = len(req_skills)
    skill_to_id = {skill: i for i, skill in enumerate(req_skills)}

    # Convert people skills to bitmask
    people_masks = []
    for person_skills in people:
        mask = 0
        for skill in person_skills:
            if skill in skill_to_id:
                mask |= (1 << skill_to_id[skill])
        people_masks.append(mask)

    target = (1 << n) - 1
    dp = {0: []}

    for i, mask in enumerate(people_masks):
        for prev_mask, team in list(dp.items()):
            new_mask = prev_mask | mask
            if new_mask not in dp or len(team) + 1 < len(dp[new_mask]):
                dp[new_mask] = team + [i]

    return dp[target]`,
      commonProblems: [
        'Shortest Path Visiting All Nodes',
        'Partition to K Equal Sum Subsets',
        'Find the Shortest Superstring',
        'Smallest Sufficient Team',
        'Number of Ways to Wear Different Hats to Each Other'
      ]
    },
    {
      id: 'dp-subsequence',
      name: 'DP Pattern 12: DP on Subsequences',
      icon: '📐',
      color: '#14b8a6',
      category: 'Dynamic Programming',
      description: 'Counting and finding subsequences',
      whenToUse: [
        'Subsequence counting',
        'Distinct subsequences',
        'Arithmetic sequences',
        'Pattern matching'
      ],
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(n)',
      codeExample: `# Distinct Subsequences
def numDistinct(s, t):
    m, n = len(s), len(t)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Empty t can be formed by any prefix of s
    for i in range(m + 1):
        dp[i][0] = 1

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            # Don't use s[i-1]
            dp[i][j] = dp[i-1][j]

            # Use s[i-1] if it matches t[j-1]
            if s[i-1] == t[j-1]:
                dp[i][j] += dp[i-1][j-1]

    return dp[m][n]

# Distinct Subsequences II (all distinct)
def distinctSubseqII(s):
    MOD = 10**9 + 7
    n = len(s)

    # dp[i] = number of distinct subsequences ending at i
    dp = [0] * n
    last = {}

    for i in range(n):
        # New subsequences: all previous + this char alone
        dp[i] = (sum(dp) + 1) % MOD

        # Subtract duplicates from last occurrence
        if s[i] in last:
            dp[i] = (dp[i] - dp[last[s[i]]] - 1) % MOD

        last[s[i]] = i

    return sum(dp) % MOD

# Arithmetic Slices II - Subsequence
def numberOfArithmeticSlices(nums):
    n = len(nums)
    total = 0

    # dp[i] = {diff: count of subsequences ending at i with diff}
    dp = [defaultdict(int) for _ in range(n)]

    for i in range(n):
        for j in range(i):
            diff = nums[i] - nums[j]

            # Extend sequences ending at j
            dp[i][diff] += dp[j][diff] + 1

            # Count valid sequences (length >= 3)
            total += dp[j][diff]

    return total

from collections import defaultdict

# Longest Arithmetic Subsequence
def longestArithSeqLength(nums):
    n = len(nums)
    if n <= 2:
        return n

    # dp[i][diff] = length of LAS ending at i with diff
    dp = [defaultdict(lambda: 1) for _ in range(n)]
    max_length = 2

    for i in range(1, n):
        for j in range(i):
            diff = nums[i] - nums[j]
            dp[i][diff] = dp[j][diff] + 1
            max_length = max(max_length, dp[i][diff])

    return max_length

# Number of Unique Good Subsequences
def numberOfUniqueGoodSubsequences(binary):
    MOD = 10**9 + 7
    has_zero = '0' in binary

    # dp = number of unique subsequences ending with 0/1
    ends_with_0 = 0
    ends_with_1 = 0

    for char in binary:
        if char == '0':
            # New subseq: all prev + "0"
            ends_with_0 = (ends_with_0 + ends_with_1) % MOD
        else:
            # New subseq: all prev + "1"
            ends_with_1 = (ends_with_0 + ends_with_1 + 1) % MOD

    result = (ends_with_0 + ends_with_1) % MOD
    return (result + has_zero) % MOD`,
      commonProblems: [
        'Distinct Subsequences',
        'Distinct Subsequences II',
        'Arithmetic Slices II - Subsequence',
        'Number of Unique Good Subsequences',
        'Constrained Subsequence Sum'
      ]
    },
    {
      id: 'dp-probability',
      name: 'DP Pattern 13: Probability DP',
      icon: '🎲',
      color: '#84cc16',
      category: 'Dynamic Programming',
      description: 'Computing probabilities with DP',
      whenToUse: [
        'Expected value problems',
        'Probability calculations',
        'Random walk',
        'Game simulations'
      ],
      timeComplexity: 'O(n * k)',
      spaceComplexity: 'O(n * k)',
      codeExample: `# Knight Probability in Chessboard
def knightProbability(n, k, row, column):
    directions = [
        (2, 1), (2, -1), (-2, 1), (-2, -1),
        (1, 2), (1, -2), (-1, 2), (-1, -2)
    ]

    # dp[r][c] = probability of being at (r, c)
    dp = [[0] * n for _ in range(n)]
    dp[row][column] = 1

    for _ in range(k):
        new_dp = [[0] * n for _ in range(n)]

        for r in range(n):
            for c in range(n):
                if dp[r][c] > 0:
                    for dr, dc in directions:
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < n and 0 <= nc < n:
                            new_dp[nr][nc] += dp[r][c] / 8

        dp = new_dp

    return sum(sum(row) for row in dp)

# New 21 Game
def new21Game(n, k, maxPts):
    if k == 0 or n >= k + maxPts:
        return 1.0

    # dp[i] = probability of getting exactly i points
    dp = [0.0] * (n + 1)
    dp[0] = 1.0

    window_sum = 1.0  # Sum of probabilities we can draw from
    result = 0.0

    for i in range(1, n + 1):
        dp[i] = window_sum / maxPts

        if i < k:
            window_sum += dp[i]
        else:
            result += dp[i]

        # Slide window
        if i - maxPts >= 0:
            window_sum -= dp[i - maxPts]

    return result

# Soup Servings
def soupServings(n):
    if n >= 5000:
        return 1.0

    # Round up to multiples of 25
    n = (n + 24) // 25

    from functools import lru_cache

    @lru_cache(None)
    def dp(a, b):
        # Base cases
        if a <= 0 and b <= 0:
            return 0.5
        if a <= 0:
            return 1.0
        if b <= 0:
            return 0.0

        # Four operations with equal probability
        return 0.25 * (
            dp(a - 4, b) +      # Serve 100ml A
            dp(a - 3, b - 1) +  # Serve 75ml A, 25ml B
            dp(a - 2, b - 2) +  # Serve 50ml A, 50ml B
            dp(a - 1, b - 3)    # Serve 25ml A, 75ml B
        )

    return dp(n, n)

# Toss Strange Coins
def probabilityOfHeads(prob, target):
    n = len(prob)
    # dp[i][j] = prob of j heads using first i coins
    dp = [[0.0] * (target + 1) for _ in range(n + 1)]
    dp[0][0] = 1.0

    for i in range(1, n + 1):
        for j in range(target + 1):
            # Tails
            dp[i][j] = dp[i-1][j] * (1 - prob[i-1])

            # Heads
            if j > 0:
                dp[i][j] += dp[i-1][j-1] * prob[i-1]

    return dp[n][target]`,
      commonProblems: [
        'Knight Probability in Chessboard',
        'New 21 Game',
        'Soup Servings',
        'Toss Strange Coins',
        'Probability of a Two Boxes Having The Same Number of Distinct Balls'
      ]
    },
    {
      id: 'trie',
      name: 'Trie (Prefix Tree)',
      icon: '🌳',
      color: '#8b5cf6',
      category: 'String',
      description: 'Tree-like data structure for efficient string prefix operations and autocomplete',
      whenToUse: [
        'Autocomplete/typeahead systems',
        'Spell checkers',
        'Word search in grid',
        'Prefix matching',
        'IP routing (longest prefix match)'
      ],
      timeComplexity: 'O(m) where m is key length',
      spaceComplexity: 'O(ALPHABET_SIZE * m * n)',
      codeExample: `# Pattern: Trie Implementation
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        """Insert word into trie - O(m)"""
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word):
        """Search for exact word - O(m)"""
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end

    def starts_with(self, prefix):
        """Check if any word starts with prefix - O(m)"""
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True

# Pattern: Word Search II (using Trie)
def findWords(board, words):
    """Find all words from list in the grid"""
    # Build trie from words
    trie = Trie()
    for word in words:
        trie.insert(word)

    rows, cols = len(board), len(board[0])
    result = set()

    def dfs(r, c, node, path):
        if node.is_end:
            result.add(path)

        if r < 0 or r >= rows or c < 0 or c >= cols:
            return

        char = board[r][c]
        if char not in node.children:
            return

        board[r][c] = '#'  # Mark visited
        next_node = node.children[char]

        for dr, dc in [(0,1), (0,-1), (1,0), (-1,0)]:
            dfs(r + dr, c + dc, next_node, path + char)

        board[r][c] = char  # Restore

    for r in range(rows):
        for c in range(cols):
            dfs(r, c, trie.root, "")

    return list(result)

# Pattern: Autocomplete System
class AutocompleteSystem:
    def __init__(self, sentences, times):
        self.trie = {}
        self.current = ""

        for sentence, count in zip(sentences, times):
            self._add(sentence, count)

    def _add(self, sentence, count):
        node = self.trie
        for char in sentence:
            if char not in node:
                node[char] = {}
            node = node[char]
        node['#'] = node.get('#', 0) + count

    def input(self, c):
        if c == '#':
            self._add(self.current, 1)
            self.current = ""
            return []

        self.current += c
        node = self.trie

        for char in self.current:
            if char not in node:
                return []
            node = node[char]

        # DFS to find all sentences
        results = []
        self._dfs(node, self.current, results)

        # Sort by frequency (desc) then alphabetically
        results.sort(key=lambda x: (-x[1], x[0]))
        return [r[0] for r in results[:3]]

    def _dfs(self, node, path, results):
        if '#' in node:
            results.append((path, node['#']))

        for char in node:
            if char != '#':
                self._dfs(node[char], path + char, results)`,
      commonProblems: [
        'Implement Trie (Prefix Tree)',
        'Word Search II',
        'Design Add and Search Words Data Structure',
        'Design Search Autocomplete System',
        'Replace Words',
        'Longest Word in Dictionary'
      ]
    },
    {
      id: 'topological-sort',
      name: 'Topological Sort',
      icon: '📊',
      color: '#06b6d4',
      category: 'Graph',
      description: 'Linear ordering of vertices in DAG where for every edge (u,v), u comes before v',
      whenToUse: [
        'Task scheduling with dependencies',
        'Build systems (makefile)',
        'Course prerequisites',
        'Package dependency resolution',
        'Detecting cycles in directed graph'
      ],
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      codeExample: `# Pattern: Topological Sort using DFS
def topological_sort_dfs(num_nodes, edges):
    """Return topological order or empty if cycle exists"""
    from collections import defaultdict

    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)

    # 0: unvisited, 1: visiting, 2: visited
    state = [0] * num_nodes
    result = []

    def dfs(node):
        if state[node] == 1:  # Cycle detected
            return False
        if state[node] == 2:  # Already processed
            return True

        state[node] = 1  # Mark visiting

        for neighbor in graph[node]:
            if not dfs(neighbor):
                return False

        state[node] = 2  # Mark visited
        result.append(node)
        return True

    for node in range(num_nodes):
        if state[node] == 0:
            if not dfs(node):
                return []  # Cycle exists

    return result[::-1]

# Pattern: Topological Sort using Kahn's Algorithm (BFS)
def topological_sort_bfs(num_nodes, edges):
    """Kahn's algorithm using indegree"""
    from collections import defaultdict, deque

    graph = defaultdict(list)
    indegree = [0] * num_nodes

    for u, v in edges:
        graph[u].append(v)
        indegree[v] += 1

    # Start with nodes having no dependencies
    queue = deque([i for i in range(num_nodes) if indegree[i] == 0])
    result = []

    while queue:
        node = queue.popleft()
        result.append(node)

        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    # If all nodes processed, no cycle
    return result if len(result) == num_nodes else []

# Pattern: Course Schedule
def canFinish(numCourses, prerequisites):
    """Check if possible to finish all courses"""
    return len(topological_sort_bfs(numCourses, prerequisites)) == numCourses

# Pattern: Course Schedule II
def findOrder(numCourses, prerequisites):
    """Return order to take courses"""
    # Reverse edges: [course, prereq] means prereq -> course
    edges = [(prereq, course) for course, prereq in prerequisites]
    return topological_sort_bfs(numCourses, edges)

# Pattern: Alien Dictionary
def alienOrder(words):
    """Derive alphabet order from sorted alien words"""
    from collections import defaultdict, deque

    # Build graph from adjacent word comparisons
    graph = defaultdict(set)
    indegree = {c: 0 for word in words for c in word}

    for i in range(len(words) - 1):
        w1, w2 = words[i], words[i + 1]
        min_len = min(len(w1), len(w2))

        # Invalid: prefix comes after longer word
        if len(w1) > len(w2) and w1[:min_len] == w2[:min_len]:
            return ""

        for j in range(min_len):
            if w1[j] != w2[j]:
                if w2[j] not in graph[w1[j]]:
                    graph[w1[j]].add(w2[j])
                    indegree[w2[j]] += 1
                break

    # Kahn's algorithm
    queue = deque([c for c in indegree if indegree[c] == 0])
    result = []

    while queue:
        char = queue.popleft()
        result.append(char)

        for neighbor in graph[char]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return "".join(result) if len(result) == len(indegree) else ""`,
      commonProblems: [
        'Course Schedule',
        'Course Schedule II',
        'Alien Dictionary',
        'Sequence Reconstruction',
        'Minimum Height Trees',
        'Parallel Courses'
      ]
    },
    {
      id: 'prefix-sum',
      name: 'Prefix Sum',
      icon: '➕',
      color: '#10b981',
      category: 'Array',
      description: 'Precompute cumulative sums to answer range queries in O(1)',
      whenToUse: [
        'Range sum queries',
        'Subarray sum problems',
        'Finding subarrays with target sum',
        '2D matrix sum queries',
        'Difference arrays for range updates'
      ],
      timeComplexity: 'O(n) preprocess, O(1) query',
      spaceComplexity: 'O(n)',
      codeExample: `# Pattern: Basic Prefix Sum
def build_prefix_sum(nums):
    """Build prefix sum array"""
    n = len(nums)
    prefix = [0] * (n + 1)

    for i in range(n):
        prefix[i + 1] = prefix[i] + nums[i]

    return prefix

def range_sum(prefix, left, right):
    """Get sum of nums[left:right+1] in O(1)"""
    return prefix[right + 1] - prefix[left]

# Pattern: Subarray Sum Equals K
def subarraySum(nums, k):
    """Count subarrays with sum = k"""
    from collections import defaultdict

    count = 0
    current_sum = 0
    prefix_counts = defaultdict(int)
    prefix_counts[0] = 1  # Empty prefix

    for num in nums:
        current_sum += num

        # If (current_sum - k) exists, we found subarrays
        count += prefix_counts[current_sum - k]

        prefix_counts[current_sum] += 1

    return count

# Pattern: Product of Array Except Self
def productExceptSelf(nums):
    """Product of all elements except self without division"""
    n = len(nums)
    result = [1] * n

    # Left products
    left_product = 1
    for i in range(n):
        result[i] = left_product
        left_product *= nums[i]

    # Right products
    right_product = 1
    for i in range(n - 1, -1, -1):
        result[i] *= right_product
        right_product *= nums[i]

    return result

# Pattern: 2D Prefix Sum (Matrix)
class NumMatrix:
    def __init__(self, matrix):
        if not matrix:
            return

        m, n = len(matrix), len(matrix[0])
        self.prefix = [[0] * (n + 1) for _ in range(m + 1)]

        for i in range(m):
            for j in range(n):
                self.prefix[i+1][j+1] = (
                    matrix[i][j] +
                    self.prefix[i][j+1] +
                    self.prefix[i+1][j] -
                    self.prefix[i][j]
                )

    def sumRegion(self, r1, c1, r2, c2):
        """Sum of rectangle (r1,c1) to (r2,c2) in O(1)"""
        return (
            self.prefix[r2+1][c2+1] -
            self.prefix[r1][c2+1] -
            self.prefix[r2+1][c1] +
            self.prefix[r1][c1]
        )

# Pattern: Difference Array (Range Updates)
class DifferenceArray:
    """Efficiently handle multiple range increment operations"""
    def __init__(self, n):
        self.diff = [0] * (n + 1)

    def add(self, left, right, val):
        """Add val to range [left, right] - O(1)"""
        self.diff[left] += val
        self.diff[right + 1] -= val

    def get_result(self):
        """Get final array after all operations - O(n)"""
        result = []
        current = 0
        for i in range(len(self.diff) - 1):
            current += self.diff[i]
            result.append(current)
        return result`,
      commonProblems: [
        'Range Sum Query - Immutable',
        'Range Sum Query 2D - Immutable',
        'Subarray Sum Equals K',
        'Product of Array Except Self',
        'Contiguous Array',
        'Maximum Size Subarray Sum Equals k'
      ]
    },
    {
      id: 'bit-manipulation',
      name: 'Bit Manipulation',
      icon: '🔢',
      color: '#f59e0b',
      category: 'Math',
      description: 'Efficient operations using binary representation of numbers',
      whenToUse: [
        'Single number problems (XOR)',
        'Power of 2 checks',
        'Counting set bits',
        'Subsets generation',
        'Swapping without temp variable'
      ],
      timeComplexity: 'O(1) to O(log n)',
      spaceComplexity: 'O(1)',
      codeExample: `# Pattern: Common Bit Operations
def get_bit(n, i):
    """Get i-th bit (0-indexed from right)"""
    return (n >> i) & 1

def set_bit(n, i):
    """Set i-th bit to 1"""
    return n | (1 << i)

def clear_bit(n, i):
    """Clear i-th bit to 0"""
    return n & ~(1 << i)

def toggle_bit(n, i):
    """Toggle i-th bit"""
    return n ^ (1 << i)

def count_set_bits(n):
    """Count number of 1s (Brian Kernighan's algorithm)"""
    count = 0
    while n:
        n &= (n - 1)  # Clear rightmost set bit
        count += 1
    return count

def is_power_of_two(n):
    """Check if n is power of 2"""
    return n > 0 and (n & (n - 1)) == 0

# Pattern: Single Number (XOR)
def singleNumber(nums):
    """Find element appearing once (others appear twice)"""
    result = 0
    for num in nums:
        result ^= num  # XOR cancels pairs
    return result

# Pattern: Single Number III
def singleNumber3(nums):
    """Find two elements appearing once"""
    # XOR all: gets xor of the two singles
    xor_all = 0
    for num in nums:
        xor_all ^= num

    # Find rightmost set bit (differs between the two)
    diff_bit = xor_all & (-xor_all)

    # Separate into two groups
    a = b = 0
    for num in nums:
        if num & diff_bit:
            a ^= num
        else:
            b ^= num

    return [a, b]

# Pattern: Counting Bits
def countBits(n):
    """Count bits for all numbers 0 to n"""
    dp = [0] * (n + 1)

    for i in range(1, n + 1):
        # dp[i] = dp[i >> 1] + (i & 1)
        dp[i] = dp[i >> 1] + (i & 1)

    return dp

# Pattern: Subsets using Bits
def subsets(nums):
    """Generate all subsets using bitmask"""
    n = len(nums)
    result = []

    for mask in range(1 << n):  # 0 to 2^n - 1
        subset = []
        for i in range(n):
            if mask & (1 << i):
                subset.append(nums[i])
        result.append(subset)

    return result

# Pattern: Reverse Bits
def reverseBits(n):
    """Reverse all 32 bits"""
    result = 0
    for i in range(32):
        bit = (n >> i) & 1
        result |= (bit << (31 - i))
    return result

# Pattern: Missing Number (XOR approach)
def missingNumber(nums):
    """Find missing number in [0, n]"""
    n = len(nums)
    result = n  # Start with n

    for i, num in enumerate(nums):
        result ^= i ^ num

    return result`,
      commonProblems: [
        'Single Number',
        'Single Number II',
        'Single Number III',
        'Counting Bits',
        'Reverse Bits',
        'Missing Number',
        'Power of Two'
      ]
    },
    {
      id: 'greedy',
      name: 'Greedy Algorithm',
      icon: '🎯',
      color: '#ef4444',
      category: 'Algorithm',
      description: 'Make locally optimal choices at each step hoping to find global optimum',
      whenToUse: [
        'Interval scheduling',
        'Activity selection',
        'Huffman coding',
        'Jump game problems',
        'Minimum coins/operations'
      ],
      timeComplexity: 'Usually O(n log n) due to sorting',
      spaceComplexity: 'O(1) to O(n)',
      codeExample: `# Pattern: Jump Game
def canJump(nums):
    """Can reach the last index?"""
    max_reach = 0

    for i, jump in enumerate(nums):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + jump)

    return True

# Pattern: Jump Game II
def jump(nums):
    """Minimum jumps to reach end"""
    n = len(nums)
    if n <= 1:
        return 0

    jumps = 0
    current_end = 0
    farthest = 0

    for i in range(n - 1):
        farthest = max(farthest, i + nums[i])

        if i == current_end:
            jumps += 1
            current_end = farthest

            if current_end >= n - 1:
                break

    return jumps

# Pattern: Gas Station
def canCompleteCircuit(gas, cost):
    """Find starting station to complete circuit"""
    total_tank = 0
    current_tank = 0
    start = 0

    for i in range(len(gas)):
        diff = gas[i] - cost[i]
        total_tank += diff
        current_tank += diff

        if current_tank < 0:
            start = i + 1
            current_tank = 0

    return start if total_tank >= 0 else -1

# Pattern: Task Scheduler
def leastInterval(tasks, n):
    """Minimum intervals to complete all tasks with cooldown"""
    from collections import Counter

    freq = Counter(tasks)
    max_freq = max(freq.values())
    max_count = sum(1 for f in freq.values() if f == max_freq)

    # (max_freq - 1) full cycles + last partial cycle
    result = (max_freq - 1) * (n + 1) + max_count

    return max(result, len(tasks))

# Pattern: Non-overlapping Intervals
def eraseOverlapIntervals(intervals):
    """Minimum removals to make non-overlapping"""
    if not intervals:
        return 0

    # Sort by end time
    intervals.sort(key=lambda x: x[1])

    count = 0
    prev_end = float('-inf')

    for start, end in intervals:
        if start >= prev_end:
            prev_end = end
        else:
            count += 1  # Remove this interval

    return count

# Pattern: Partition Labels
def partitionLabels(s):
    """Partition string so each letter appears in at most one part"""
    last = {c: i for i, c in enumerate(s)}

    result = []
    start = end = 0

    for i, c in enumerate(s):
        end = max(end, last[c])

        if i == end:
            result.append(end - start + 1)
            start = i + 1

    return result

# Pattern: Candy Distribution
def candy(ratings):
    """Minimum candies with higher rating = more than neighbors"""
    n = len(ratings)
    candies = [1] * n

    # Left to right
    for i in range(1, n):
        if ratings[i] > ratings[i-1]:
            candies[i] = candies[i-1] + 1

    # Right to left
    for i in range(n-2, -1, -1):
        if ratings[i] > ratings[i+1]:
            candies[i] = max(candies[i], candies[i+1] + 1)

    return sum(candies)`,
      commonProblems: [
        'Jump Game',
        'Jump Game II',
        'Gas Station',
        'Task Scheduler',
        'Non-overlapping Intervals',
        'Partition Labels',
        'Candy'
      ]
    },
    {
      id: 'kadane',
      name: "Kadane's Algorithm",
      icon: '📈',
      color: '#3b82f6',
      category: 'Array',
      description: 'Find maximum sum contiguous subarray in O(n) time',
      whenToUse: [
        'Maximum subarray sum',
        'Maximum product subarray',
        'Circular subarray problems',
        'Maximum sum with constraints',
        'Stock profit problems'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      codeExample: `# Pattern: Maximum Subarray (Kadane's Algorithm)
def maxSubArray(nums):
    """Find contiguous subarray with largest sum"""
    max_sum = nums[0]
    current_sum = nums[0]

    for i in range(1, len(nums)):
        # Either extend current subarray or start new
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)

    return max_sum

# Pattern: Maximum Subarray with indices
def maxSubArrayWithIndices(nums):
    """Return max sum and indices"""
    max_sum = nums[0]
    current_sum = nums[0]
    start = end = temp_start = 0

    for i in range(1, len(nums)):
        if nums[i] > current_sum + nums[i]:
            current_sum = nums[i]
            temp_start = i
        else:
            current_sum = current_sum + nums[i]

        if current_sum > max_sum:
            max_sum = current_sum
            start = temp_start
            end = i

    return max_sum, start, end

# Pattern: Maximum Product Subarray
def maxProduct(nums):
    """Find contiguous subarray with largest product"""
    max_prod = nums[0]
    min_prod = nums[0]  # Track min for negative numbers
    result = nums[0]

    for i in range(1, len(nums)):
        num = nums[i]

        # Swap if negative (negative * min = max)
        if num < 0:
            max_prod, min_prod = min_prod, max_prod

        max_prod = max(num, max_prod * num)
        min_prod = min(num, min_prod * num)

        result = max(result, max_prod)

    return result

# Pattern: Maximum Circular Subarray
def maxSubarraySumCircular(nums):
    """Maximum sum in circular array"""
    # Case 1: Max subarray is not circular (normal Kadane)
    max_kadane = maxSubArray(nums)

    # Case 2: Max subarray is circular
    # = total_sum - minimum_subarray
    total = sum(nums)

    # Find minimum subarray
    min_sum = nums[0]
    current_min = nums[0]

    for i in range(1, len(nums)):
        current_min = min(nums[i], current_min + nums[i])
        min_sum = min(min_sum, current_min)

    # If all negative, max_kadane is the answer
    if min_sum == total:
        return max_kadane

    return max(max_kadane, total - min_sum)

# Pattern: Maximum Sum of Two Non-Overlapping Subarrays
def maxSumTwoNoOverlap(nums, firstLen, secondLen):
    """Max sum of two non-overlapping subarrays"""
    n = len(nums)

    # Prefix sums
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i + 1] = prefix[i] + nums[i]

    def get_sum(i, length):
        return prefix[i + length] - prefix[i]

    result = 0
    max_first = 0
    max_second = 0

    for i in range(firstLen + secondLen, n + 1):
        # First array ends before second starts
        max_first = max(max_first, get_sum(i - firstLen - secondLen, firstLen))
        result = max(result, max_first + get_sum(i - secondLen, secondLen))

        # Second array ends before first starts
        max_second = max(max_second, get_sum(i - firstLen - secondLen, secondLen))
        result = max(result, max_second + get_sum(i - firstLen, firstLen))

    return result

# Pattern: Best Time to Buy and Sell Stock
def maxProfit(prices):
    """Single transaction max profit"""
    min_price = float('inf')
    max_profit = 0

    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)

    return max_profit`,
      commonProblems: [
        'Maximum Subarray',
        'Maximum Product Subarray',
        'Maximum Sum Circular Subarray',
        'Best Time to Buy and Sell Stock',
        'Maximum Sum of Two Non-Overlapping Subarrays',
        'Longest Turbulent Subarray'
      ]
    },
    {
      id: 'dijkstra',
      name: "Dijkstra's Algorithm",
      icon: '🛤️',
      color: '#14b8a6',
      category: 'Graph',
      description: 'Find shortest paths from source to all vertices in weighted graph (non-negative weights)',
      whenToUse: [
        'Shortest path with positive weights',
        'Network routing',
        'Maps/navigation',
        'Minimum cost problems',
        'Single source shortest path'
      ],
      timeComplexity: 'O((V + E) log V) with heap',
      spaceComplexity: 'O(V)',
      codeExample: `# Pattern: Dijkstra's Algorithm
import heapq
from collections import defaultdict

def dijkstra(graph, start, n):
    """
    Find shortest distances from start to all nodes
    graph: adjacency list {node: [(neighbor, weight), ...]}
    """
    dist = [float('inf')] * n
    dist[start] = 0

    # Min heap: (distance, node)
    heap = [(0, start)]

    while heap:
        d, node = heapq.heappop(heap)

        # Skip if we've found a better path
        if d > dist[node]:
            continue

        for neighbor, weight in graph[node]:
            new_dist = d + weight

            if new_dist < dist[neighbor]:
                dist[neighbor] = new_dist
                heapq.heappush(heap, (new_dist, neighbor))

    return dist

# Pattern: Network Delay Time
def networkDelayTime(times, n, k):
    """Time for signal to reach all nodes from k"""
    graph = defaultdict(list)
    for u, v, w in times:
        graph[u - 1].append((v - 1, w))

    dist = dijkstra(graph, k - 1, n)

    max_time = max(dist)
    return max_time if max_time != float('inf') else -1

# Pattern: Cheapest Flights Within K Stops
def findCheapestPrice(n, flights, src, dst, k):
    """Shortest path with at most k stops"""
    graph = defaultdict(list)
    for u, v, w in flights:
        graph[u].append((v, w))

    # (cost, stops, node)
    heap = [(0, 0, src)]
    # Best cost to reach node with given stops
    best = {}

    while heap:
        cost, stops, node = heapq.heappop(heap)

        if node == dst:
            return cost

        if stops > k:
            continue

        # Skip if we've reached this node with fewer stops at same/less cost
        if (node, stops) in best and best[(node, stops)] <= cost:
            continue
        best[(node, stops)] = cost

        for neighbor, price in graph[node]:
            heapq.heappush(heap, (cost + price, stops + 1, neighbor))

    return -1

# Pattern: Path with Minimum Effort
def minimumEffortPath(heights):
    """Find path with minimum maximum absolute difference"""
    rows, cols = len(heights), len(heights[0])

    # (effort, row, col)
    heap = [(0, 0, 0)]
    efforts = [[float('inf')] * cols for _ in range(rows)]
    efforts[0][0] = 0

    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

    while heap:
        effort, r, c = heapq.heappop(heap)

        if r == rows - 1 and c == cols - 1:
            return effort

        if effort > efforts[r][c]:
            continue

        for dr, dc in directions:
            nr, nc = r + dr, c + dc

            if 0 <= nr < rows and 0 <= nc < cols:
                new_effort = max(effort, abs(heights[nr][nc] - heights[r][c]))

                if new_effort < efforts[nr][nc]:
                    efforts[nr][nc] = new_effort
                    heapq.heappush(heap, (new_effort, nr, nc))

    return 0

# Pattern: Swim in Rising Water
def swimInWater(grid):
    """Minimum time to swim from top-left to bottom-right"""
    n = len(grid)

    # (max_depth, row, col)
    heap = [(grid[0][0], 0, 0)]
    visited = set()

    while heap:
        depth, r, c = heapq.heappop(heap)

        if r == n - 1 and c == n - 1:
            return depth

        if (r, c) in visited:
            continue
        visited.add((r, c))

        for dr, dc in [(0,1), (0,-1), (1,0), (-1,0)]:
            nr, nc = r + dr, c + dc

            if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in visited:
                heapq.heappush(heap, (max(depth, grid[nr][nc]), nr, nc))

    return 0`,
      commonProblems: [
        'Network Delay Time',
        'Cheapest Flights Within K Stops',
        'Path with Minimum Effort',
        'Swim in Rising Water',
        'Path With Maximum Minimum Value',
        'Shortest Path in Binary Matrix'
      ]
    },
    {
      id: 'binary-indexed-tree',
      name: 'Binary Indexed Tree (Fenwick)',
      icon: '🌲',
      color: '#8b5cf6',
      category: 'Data Structure',
      description: 'Efficiently update elements and calculate prefix sums in O(log n)',
      whenToUse: [
        'Range sum queries with updates',
        'Counting inversions',
        'Count smaller numbers after self',
        'Range frequency queries',
        'Dynamic cumulative frequency'
      ],
      timeComplexity: 'O(log n) update and query',
      spaceComplexity: 'O(n)',
      codeExample: `# Pattern: Binary Indexed Tree (Fenwick Tree)
class BIT:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)

    def update(self, i, delta):
        """Add delta to index i (1-indexed)"""
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)  # Add LSB

    def query(self, i):
        """Get sum from index 1 to i"""
        total = 0
        while i > 0:
            total += self.tree[i]
            i -= i & (-i)  # Remove LSB
        return total

    def range_query(self, left, right):
        """Get sum from left to right (1-indexed)"""
        return self.query(right) - self.query(left - 1)

# Pattern: Range Sum Query - Mutable
class NumArray:
    def __init__(self, nums):
        self.nums = nums
        self.n = len(nums)
        self.bit = BIT(self.n)

        for i, num in enumerate(nums):
            self.bit.update(i + 1, num)

    def update(self, index, val):
        delta = val - self.nums[index]
        self.nums[index] = val
        self.bit.update(index + 1, delta)

    def sumRange(self, left, right):
        return self.bit.range_query(left + 1, right + 1)

# Pattern: Count Smaller Numbers After Self
def countSmaller(nums):
    """For each num, count smaller elements to its right"""
    # Coordinate compression
    sorted_nums = sorted(set(nums))
    rank = {v: i + 1 for i, v in enumerate(sorted_nums)}

    n = len(nums)
    bit = BIT(len(sorted_nums))
    result = []

    # Process from right to left
    for i in range(n - 1, -1, -1):
        r = rank[nums[i]]
        # Count elements smaller than current (already processed)
        result.append(bit.query(r - 1))
        # Add current element
        bit.update(r, 1)

    return result[::-1]

# Pattern: Count of Range Sum
def countRangeSum(nums, lower, upper):
    """Count subarrays with sum in [lower, upper]"""
    # Use prefix sums + merge sort or BIT
    prefix = [0]
    for num in nums:
        prefix.append(prefix[-1] + num)

    # Coordinate compression
    sorted_prefix = sorted(set(prefix))
    rank = {v: i + 1 for i, v in enumerate(sorted_prefix)}

    bit = BIT(len(sorted_prefix))
    count = 0

    for p in prefix:
        # Count prefix sums in range [p - upper, p - lower]
        left_rank = rank.get(p - upper, 0)
        right_rank = rank.get(p - lower, 0)

        # Binary search for actual ranks
        import bisect
        left_idx = bisect.bisect_left(sorted_prefix, p - upper)
        right_idx = bisect.bisect_right(sorted_prefix, p - lower)

        if left_idx < right_idx:
            count += bit.query(right_idx) - bit.query(left_idx)

        bit.update(rank[p], 1)

    return count

# Pattern: 2D BIT (Fenwick Tree)
class BIT2D:
    def __init__(self, m, n):
        self.m, self.n = m, n
        self.tree = [[0] * (n + 1) for _ in range(m + 1)]

    def update(self, row, col, delta):
        i = row
        while i <= self.m:
            j = col
            while j <= self.n:
                self.tree[i][j] += delta
                j += j & (-j)
            i += i & (-i)

    def query(self, row, col):
        total = 0
        i = row
        while i > 0:
            j = col
            while j > 0:
                total += self.tree[i][j]
                j -= j & (-j)
            i -= i & (-i)
        return total`,
      commonProblems: [
        'Range Sum Query - Mutable',
        'Count of Smaller Numbers After Self',
        'Count of Range Sum',
        'Reverse Pairs',
        'Range Sum Query 2D - Mutable',
        'Create Sorted Array through Instructions'
      ]
    },
    {
      id: 'segment-tree',
      name: 'Segment Tree',
      icon: '🎄',
      color: '#ec4899',
      category: 'Data Structure',
      description: 'Tree data structure for efficient range queries and point/range updates',
      whenToUse: [
        'Range min/max/sum queries',
        'Range updates',
        'Interval scheduling',
        'Computational geometry',
        'Dynamic range queries'
      ],
      timeComplexity: 'O(log n) query and update',
      spaceComplexity: 'O(n)',
      codeExample: `# Pattern: Segment Tree for Range Sum
class SegmentTree:
    def __init__(self, nums):
        self.n = len(nums)
        self.tree = [0] * (2 * self.n)

        # Build tree
        for i in range(self.n):
            self.tree[self.n + i] = nums[i]

        for i in range(self.n - 1, 0, -1):
            self.tree[i] = self.tree[2*i] + self.tree[2*i + 1]

    def update(self, index, val):
        """Update value at index"""
        pos = self.n + index
        self.tree[pos] = val

        while pos > 1:
            pos //= 2
            self.tree[pos] = self.tree[2*pos] + self.tree[2*pos + 1]

    def query(self, left, right):
        """Sum of range [left, right)"""
        result = 0
        left += self.n
        right += self.n

        while left < right:
            if left % 2 == 1:
                result += self.tree[left]
                left += 1
            if right % 2 == 1:
                right -= 1
                result += self.tree[right]
            left //= 2
            right //= 2

        return result

# Pattern: Segment Tree for Range Minimum Query
class SegmentTreeMin:
    def __init__(self, nums):
        self.n = len(nums)
        self.tree = [float('inf')] * (2 * self.n)

        for i in range(self.n):
            self.tree[self.n + i] = nums[i]

        for i in range(self.n - 1, 0, -1):
            self.tree[i] = min(self.tree[2*i], self.tree[2*i + 1])

    def update(self, index, val):
        pos = self.n + index
        self.tree[pos] = val

        while pos > 1:
            pos //= 2
            self.tree[pos] = min(self.tree[2*pos], self.tree[2*pos + 1])

    def query(self, left, right):
        """Minimum in range [left, right)"""
        result = float('inf')
        left += self.n
        right += self.n

        while left < right:
            if left % 2 == 1:
                result = min(result, self.tree[left])
                left += 1
            if right % 2 == 1:
                right -= 1
                result = min(result, self.tree[right])
            left //= 2
            right //= 2

        return result

# Pattern: Segment Tree with Lazy Propagation
class SegmentTreeLazy:
    def __init__(self, nums):
        self.n = len(nums)
        self.tree = [0] * (4 * self.n)
        self.lazy = [0] * (4 * self.n)
        self._build(nums, 0, 0, self.n - 1)

    def _build(self, nums, node, start, end):
        if start == end:
            self.tree[node] = nums[start]
        else:
            mid = (start + end) // 2
            self._build(nums, 2*node + 1, start, mid)
            self._build(nums, 2*node + 2, mid + 1, end)
            self.tree[node] = self.tree[2*node + 1] + self.tree[2*node + 2]

    def _propagate(self, node, start, end):
        if self.lazy[node] != 0:
            self.tree[node] += (end - start + 1) * self.lazy[node]
            if start != end:
                self.lazy[2*node + 1] += self.lazy[node]
                self.lazy[2*node + 2] += self.lazy[node]
            self.lazy[node] = 0

    def update_range(self, left, right, val):
        """Add val to range [left, right]"""
        self._update_range(0, 0, self.n - 1, left, right, val)

    def _update_range(self, node, start, end, left, right, val):
        self._propagate(node, start, end)

        if start > right or end < left:
            return

        if left <= start and end <= right:
            self.lazy[node] += val
            self._propagate(node, start, end)
            return

        mid = (start + end) // 2
        self._update_range(2*node + 1, start, mid, left, right, val)
        self._update_range(2*node + 2, mid + 1, end, left, right, val)
        self.tree[node] = self.tree[2*node + 1] + self.tree[2*node + 2]

    def query(self, left, right):
        return self._query(0, 0, self.n - 1, left, right)

    def _query(self, node, start, end, left, right):
        self._propagate(node, start, end)

        if start > right or end < left:
            return 0

        if left <= start and end <= right:
            return self.tree[node]

        mid = (start + end) // 2
        return (self._query(2*node + 1, start, mid, left, right) +
                self._query(2*node + 2, mid + 1, end, left, right))`,
      commonProblems: [
        'Range Sum Query - Mutable',
        'Range Minimum Query',
        'Count of Range Sum',
        'Falling Squares',
        'My Calendar III',
        'The Skyline Problem'
      ]
    },
    {
      id: 'dutch-national-flag',
      name: 'Dutch National Flag',
      icon: '🇳🇱',
      color: '#f97316',
      category: 'Array',
      description: '3-way partitioning to sort array with 3 distinct values in one pass',
      whenToUse: [
        'Sort colors (0, 1, 2)',
        '3-way partitioning',
        'Quicksort with duplicates',
        'Segregate elements',
        'Move zeros/ones problems'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      codeExample: `# Pattern: Dutch National Flag (3-way partition)
def sortColors(nums):
    """
    Sort array with values 0, 1, 2 in one pass
    Maintain three regions:
    - [0, low): all 0s
    - [low, mid): all 1s
    - [mid, high]: unexplored
    - (high, n): all 2s
    """
    low = mid = 0
    high = len(nums) - 1

    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:  # nums[mid] == 2
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
            # Don't increment mid, need to check swapped value

# Pattern: 3-way Quicksort Partition
def three_way_partition(arr, pivot):
    """
    Partition array into three parts:
    - elements < pivot
    - elements == pivot
    - elements > pivot
    """
    low = mid = 0
    high = len(arr) - 1

    while mid <= high:
        if arr[mid] < pivot:
            arr[low], arr[mid] = arr[mid], arr[low]
            low += 1
            mid += 1
        elif arr[mid] == pivot:
            mid += 1
        else:
            arr[mid], arr[high] = arr[high], arr[mid]
            high -= 1

    return low, high  # Boundaries of pivot region

# Pattern: Move Zeros
def moveZeroes(nums):
    """Move all zeros to end, maintain relative order"""
    write = 0

    for read in range(len(nums)):
        if nums[read] != 0:
            nums[write], nums[read] = nums[read], nums[write]
            write += 1

# Pattern: Segregate Even and Odd
def segregateEvenOdd(arr):
    """Move all even numbers before odd numbers"""
    left = 0
    right = len(arr) - 1

    while left < right:
        while left < right and arr[left] % 2 == 0:
            left += 1
        while left < right and arr[right] % 2 == 1:
            right -= 1

        if left < right:
            arr[left], arr[right] = arr[right], arr[left]
            left += 1
            right -= 1

# Pattern: Sort Array By Parity
def sortArrayByParity(nums):
    """Even numbers first, then odd"""
    left = 0
    right = len(nums) - 1

    while left < right:
        if nums[left] % 2 > nums[right] % 2:
            nums[left], nums[right] = nums[right], nums[left]

        if nums[left] % 2 == 0:
            left += 1
        if nums[right] % 2 == 1:
            right -= 1

    return nums

# Pattern: Wiggle Sort
def wiggleSort(nums):
    """
    Rearrange: nums[0] <= nums[1] >= nums[2] <= nums[3]...
    """
    for i in range(len(nums) - 1):
        if (i % 2 == 0 and nums[i] > nums[i+1]) or \
           (i % 2 == 1 and nums[i] < nums[i+1]):
            nums[i], nums[i+1] = nums[i+1], nums[i]

# Pattern: Partition Array by Condition
def partition_by_condition(nums, condition):
    """
    Partition array based on condition function
    Returns index of first element not satisfying condition
    """
    write = 0

    for read in range(len(nums)):
        if condition(nums[read]):
            nums[write], nums[read] = nums[read], nums[write]
            write += 1

    return write`,
      commonProblems: [
        'Sort Colors',
        'Move Zeroes',
        'Sort Array By Parity',
        'Sort Array By Parity II',
        'Wiggle Sort',
        'Partition Array According to Given Pivot'
      ]
    },
    {
      id: 'boyer-moore-voting',
      name: 'Boyer-Moore Voting',
      icon: '🗳️',
      color: '#6366f1',
      category: 'Array',
      description: 'Find majority element (appears > n/2 times) in O(n) time O(1) space',
      whenToUse: [
        'Find majority element (> n/2)',
        'Find elements appearing > n/3 times',
        'Stream processing for frequent elements',
        'Memory-efficient counting'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      codeExample: `# Pattern: Boyer-Moore Voting Algorithm
def majorityElement(nums):
    """
    Find element appearing more than n/2 times
    Key insight: Cancel out different elements, majority survives
    """
    candidate = None
    count = 0

    for num in nums:
        if count == 0:
            candidate = num
            count = 1
        elif num == candidate:
            count += 1
        else:
            count -= 1

    return candidate

# Pattern: Majority Element II (n/3)
def majorityElement2(nums):
    """
    Find all elements appearing more than n/3 times
    At most 2 such elements can exist
    """
    candidate1 = candidate2 = None
    count1 = count2 = 0

    # Find potential candidates
    for num in nums:
        if num == candidate1:
            count1 += 1
        elif num == candidate2:
            count2 += 1
        elif count1 == 0:
            candidate1 = num
            count1 = 1
        elif count2 == 0:
            candidate2 = num
            count2 = 1
        else:
            count1 -= 1
            count2 -= 1

    # Verify candidates
    result = []
    threshold = len(nums) // 3

    if nums.count(candidate1) > threshold:
        result.append(candidate1)
    if candidate2 != candidate1 and nums.count(candidate2) > threshold:
        result.append(candidate2)

    return result

# Pattern: Majority Element (Generalized n/k)
def majorityElements_k(nums, k):
    """
    Find all elements appearing more than n/k times
    At most k-1 such elements can exist
    """
    from collections import defaultdict

    candidates = defaultdict(int)

    for num in nums:
        if num in candidates:
            candidates[num] += 1
        elif len(candidates) < k - 1:
            candidates[num] = 1
        else:
            # Decrease all counts
            to_remove = []
            for c in candidates:
                candidates[c] -= 1
                if candidates[c] == 0:
                    to_remove.append(c)
            for c in to_remove:
                del candidates[c]

    # Verify candidates
    result = []
    threshold = len(nums) // k

    for candidate in candidates:
        if nums.count(candidate) > threshold:
            result.append(candidate)

    return result

# Pattern: Check if Majority Element Exists
def isMajority(nums, target):
    """Check if target is majority element in sorted array"""
    # Binary search for first occurrence
    left = 0
    right = len(nums)

    while left < right:
        mid = (left + right) // 2
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid

    # Check if there are n/2 + 1 occurrences
    first = left
    if first + len(nums) // 2 < len(nums) and nums[first + len(nums) // 2] == target:
        return True
    return False

# Pattern: Online Majority Element In Subarray
class MajorityChecker:
    def __init__(self, arr):
        from collections import defaultdict
        import random

        self.arr = arr
        self.indices = defaultdict(list)

        for i, num in enumerate(arr):
            self.indices[num].append(i)

    def query(self, left, right, threshold):
        import random
        import bisect

        length = right - left + 1

        # Random sampling: try 20 times
        for _ in range(20):
            idx = random.randint(left, right)
            candidate = self.arr[idx]

            # Count using binary search
            indices = self.indices[candidate]
            left_idx = bisect.bisect_left(indices, left)
            right_idx = bisect.bisect_right(indices, right)

            if right_idx - left_idx >= threshold:
                return candidate

        return -1`,
      commonProblems: [
        'Majority Element',
        'Majority Element II',
        'Check If a Number Is Majority Element in a Sorted Array',
        'Online Majority Element In Subarray'
      ]
    },
    {
      id: 'reservoir-sampling',
      name: 'Reservoir Sampling',
      icon: '🎰',
      color: '#84cc16',
      category: 'Random',
      description: 'Randomly select k items from a stream of unknown size with equal probability',
      whenToUse: [
        'Random sampling from stream',
        'Unknown/infinite data size',
        'Memory-constrained sampling',
        'Linked list random node',
        'Random pick with weights'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(k)',
      codeExample: `# Pattern: Reservoir Sampling (k=1)
import random

def reservoir_sample_one(stream):
    """
    Select one random element from stream
    Each element has 1/n probability of being selected
    """
    result = None

    for i, item in enumerate(stream):
        # Select with probability 1/(i+1)
        if random.randint(0, i) == 0:
            result = item

    return result

# Pattern: Reservoir Sampling (k items)
def reservoir_sample_k(stream, k):
    """
    Select k random elements from stream
    Each element has k/n probability of being in result
    """
    reservoir = []

    for i, item in enumerate(stream):
        if i < k:
            reservoir.append(item)
        else:
            # Replace with probability k/(i+1)
            j = random.randint(0, i)
            if j < k:
                reservoir[j] = item

    return reservoir

# Pattern: Linked List Random Node
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def __init__(self, head):
        self.head = head

    def getRandom(self):
        """Return random node's value with equal probability"""
        result = None
        current = self.head
        i = 0

        while current:
            if random.randint(0, i) == 0:
                result = current.val
            current = current.next
            i += 1

        return result

# Pattern: Random Pick Index
class RandomPickIndex:
    def __init__(self, nums):
        self.nums = nums

    def pick(self, target):
        """Return random index of target (equal probability)"""
        result = -1
        count = 0

        for i, num in enumerate(self.nums):
            if num == target:
                count += 1
                if random.randint(1, count) == 1:
                    result = i

        return result

# Pattern: Random Pick with Weight
class RandomPickWithWeight:
    def __init__(self, w):
        self.prefix = []
        total = 0

        for weight in w:
            total += weight
            self.prefix.append(total)

        self.total = total

    def pickIndex(self):
        """Pick index with probability proportional to weight"""
        import bisect

        target = random.random() * self.total
        return bisect.bisect_left(self.prefix, target)

# Pattern: Random Pick with Blacklist
class RandomPickBlacklist:
    def __init__(self, n, blacklist):
        self.size = n - len(blacklist)
        self.mapping = {}

        blackset = set(blacklist)

        # Map blacklisted numbers in [0, size) to valid numbers in [size, n)
        available = n - 1
        for b in blacklist:
            if b < self.size:
                while available in blackset:
                    available -= 1
                self.mapping[b] = available
                available -= 1

    def pick(self):
        idx = random.randint(0, self.size - 1)
        return self.mapping.get(idx, idx)

# Pattern: Shuffle Array (Fisher-Yates)
class ShuffleArray:
    def __init__(self, nums):
        self.original = nums[:]
        self.nums = nums

    def reset(self):
        self.nums = self.original[:]
        return self.nums

    def shuffle(self):
        """Fisher-Yates shuffle - O(n)"""
        for i in range(len(self.nums) - 1, 0, -1):
            j = random.randint(0, i)
            self.nums[i], self.nums[j] = self.nums[j], self.nums[i]
        return self.nums`,
      commonProblems: [
        'Linked List Random Node',
        'Random Pick Index',
        'Random Pick with Weight',
        'Random Pick with Blacklist',
        'Shuffle an Array',
        'Random Point in Non-overlapping Rectangles'
      ]
    },
    {
      id: 'matrix-traversal',
      name: 'Matrix Traversal',
      icon: '🔲',
      color: '#0ea5e9',
      category: 'Array',
      description: 'Patterns for traversing 2D arrays in spiral, diagonal, and other orders',
      whenToUse: [
        'Spiral matrix traversal',
        'Diagonal traversal',
        'Snake/zigzag pattern',
        'Layer by layer processing',
        'Matrix rotation'
      ],
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(1) to O(m * n)',
      codeExample: `# Pattern: Spiral Matrix Traversal
def spiralOrder(matrix):
    """Traverse matrix in spiral order"""
    if not matrix:
        return []

    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1

    while top <= bottom and left <= right:
        # Traverse right
        for col in range(left, right + 1):
            result.append(matrix[top][col])
        top += 1

        # Traverse down
        for row in range(top, bottom + 1):
            result.append(matrix[row][right])
        right -= 1

        # Traverse left
        if top <= bottom:
            for col in range(right, left - 1, -1):
                result.append(matrix[bottom][col])
            bottom -= 1

        # Traverse up
        if left <= right:
            for row in range(bottom, top - 1, -1):
                result.append(matrix[row][left])
            left += 1

    return result

# Pattern: Generate Spiral Matrix
def generateMatrix(n):
    """Generate n x n spiral matrix"""
    matrix = [[0] * n for _ in range(n)]
    top, bottom = 0, n - 1
    left, right = 0, n - 1
    num = 1

    while top <= bottom and left <= right:
        for col in range(left, right + 1):
            matrix[top][col] = num
            num += 1
        top += 1

        for row in range(top, bottom + 1):
            matrix[row][right] = num
            num += 1
        right -= 1

        for col in range(right, left - 1, -1):
            matrix[bottom][col] = num
            num += 1
        bottom -= 1

        for row in range(bottom, top - 1, -1):
            matrix[row][left] = num
            num += 1
        left += 1

    return matrix

# Pattern: Diagonal Traversal
def findDiagonalOrder(mat):
    """Traverse matrix diagonally (zigzag)"""
    if not mat:
        return []

    m, n = len(mat), len(mat[0])
    result = []
    row, col = 0, 0
    going_up = True

    while len(result) < m * n:
        result.append(mat[row][col])

        if going_up:
            if col == n - 1:
                row += 1
                going_up = False
            elif row == 0:
                col += 1
                going_up = False
            else:
                row -= 1
                col += 1
        else:
            if row == m - 1:
                col += 1
                going_up = True
            elif col == 0:
                row += 1
                going_up = True
            else:
                row += 1
                col -= 1

    return result

# Pattern: Anti-diagonal Traversal
def diagonalTraversal(matrix):
    """Group elements by anti-diagonals"""
    if not matrix:
        return []

    m, n = len(matrix), len(matrix[0])
    diagonals = [[] for _ in range(m + n - 1)]

    for i in range(m):
        for j in range(n):
            diagonals[i + j].append(matrix[i][j])

    return diagonals

# Pattern: Rotate Matrix 90 degrees clockwise
def rotate(matrix):
    """Rotate matrix 90 degrees clockwise in-place"""
    n = len(matrix)

    # Transpose
    for i in range(n):
        for j in range(i, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

    # Reverse each row
    for row in matrix:
        row.reverse()

# Pattern: Set Matrix Zeroes
def setZeroes(matrix):
    """If element is 0, set entire row and column to 0"""
    m, n = len(matrix), len(matrix[0])
    first_row_zero = any(matrix[0][j] == 0 for j in range(n))
    first_col_zero = any(matrix[i][0] == 0 for i in range(m))

    # Use first row/col as markers
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0

    # Zero out based on markers
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][0] == 0 or matrix[0][j] == 0:
                matrix[i][j] = 0

    # Handle first row and column
    if first_row_zero:
        for j in range(n):
            matrix[0][j] = 0
    if first_col_zero:
        for i in range(m):
            matrix[i][0] = 0

# Pattern: Toeplitz Matrix
def isToeplitzMatrix(matrix):
    """Check if matrix is Toeplitz (same diagonal elements)"""
    m, n = len(matrix), len(matrix[0])

    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][j] != matrix[i-1][j-1]:
                return False

    return True`,
      commonProblems: [
        'Spiral Matrix',
        'Spiral Matrix II',
        'Diagonal Traverse',
        'Rotate Image',
        'Set Matrix Zeroes',
        'Toeplitz Matrix'
      ]
    },
    {
      id: 'a-star',
      name: 'A* Search',
      icon: '⭐',
      color: '#eab308',
      category: 'Graph',
      description: 'Informed search using heuristic to find shortest path efficiently',
      whenToUse: [
        'Pathfinding in games',
        'Navigation/maps',
        'Puzzle solving (8-puzzle)',
        'When good heuristic exists',
        'Need optimal path quickly'
      ],
      timeComplexity: 'O(E) with good heuristic',
      spaceComplexity: 'O(V)',
      codeExample: `# Pattern: A* Search Algorithm
import heapq

def a_star(start, goal, neighbors, heuristic):
    """
    A* search algorithm
    - neighbors(node): returns list of (neighbor, cost) tuples
    - heuristic(node): estimated cost from node to goal
    """
    # Priority queue: (f_score, node)
    # f_score = g_score + heuristic
    open_set = [(heuristic(start), start)]

    came_from = {}
    g_score = {start: 0}

    while open_set:
        _, current = heapq.heappop(open_set)

        if current == goal:
            # Reconstruct path
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            path.append(start)
            return path[::-1]

        for neighbor, cost in neighbors(current):
            tentative_g = g_score[current] + cost

            if neighbor not in g_score or tentative_g < g_score[neighbor]:
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g
                f_score = tentative_g + heuristic(neighbor)
                heapq.heappush(open_set, (f_score, neighbor))

    return None  # No path found

# Pattern: Grid Pathfinding with A*
def shortestPathAStar(grid, start, end):
    """Find shortest path in grid using A*"""
    rows, cols = len(grid), len(grid[0])

    def heuristic(pos):
        # Manhattan distance
        return abs(pos[0] - end[0]) + abs(pos[1] - end[1])

    def neighbors(pos):
        r, c = pos
        result = []
        for dr, dc in [(0,1), (0,-1), (1,0), (-1,0)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] != 1:
                result.append(((nr, nc), 1))
        return result

    return a_star(start, end, neighbors, heuristic)

# Pattern: 8-Puzzle Solver
def solve8Puzzle(board):
    """
    Solve 8-puzzle using A*
    board: 3x3 list with numbers 0-8 (0 is blank)
    """
    goal = ((1,2,3), (4,5,6), (7,8,0))
    start = tuple(tuple(row) for row in board)

    def heuristic(state):
        # Manhattan distance for all tiles
        distance = 0
        for i in range(3):
            for j in range(3):
                val = state[i][j]
                if val != 0:
                    goal_i, goal_j = (val - 1) // 3, (val - 1) % 3
                    distance += abs(i - goal_i) + abs(j - goal_j)
        return distance

    def find_blank(state):
        for i in range(3):
            for j in range(3):
                if state[i][j] == 0:
                    return i, j

    def neighbors(state):
        r, c = find_blank(state)
        result = []

        for dr, dc in [(0,1), (0,-1), (1,0), (-1,0)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < 3 and 0 <= nc < 3:
                # Swap blank with neighbor
                new_state = [list(row) for row in state]
                new_state[r][c], new_state[nr][nc] = new_state[nr][nc], new_state[r][c]
                result.append((tuple(tuple(row) for row in new_state), 1))

        return result

    return a_star(start, goal, neighbors, heuristic)

# Pattern: Sliding Puzzle
def slidingPuzzle(board):
    """Solve sliding puzzle (2x3 board)"""
    from collections import deque

    goal = "123450"
    start = "".join(str(c) for row in board for c in row)

    if start == goal:
        return 0

    # Neighbors of each position
    neighbors_map = {
        0: [1, 3], 1: [0, 2, 4], 2: [1, 5],
        3: [0, 4], 4: [1, 3, 5], 5: [2, 4]
    }

    queue = deque([(start, 0)])
    visited = {start}

    while queue:
        state, moves = queue.popleft()

        zero_idx = state.index('0')

        for neighbor_idx in neighbors_map[zero_idx]:
            new_state = list(state)
            new_state[zero_idx], new_state[neighbor_idx] = \
                new_state[neighbor_idx], new_state[zero_idx]
            new_state = "".join(new_state)

            if new_state == goal:
                return moves + 1

            if new_state not in visited:
                visited.add(new_state)
                queue.append((new_state, moves + 1))

    return -1`,
      commonProblems: [
        'Shortest Path in Binary Matrix',
        'Sliding Puzzle',
        '8 Puzzle Problem',
        'Minimum Knight Moves',
        'Cut Off Trees for Golf Event',
        'Open the Lock'
      ]
    },
    {
      id: 'bellman-ford',
      name: 'Bellman-Ford Algorithm',
      icon: '➖',
      color: '#dc2626',
      category: 'Graph',
      description: 'Single source shortest path that handles negative weights and detects negative cycles',
      whenToUse: [
        'Graphs with negative edge weights',
        'Detecting negative cycles',
        'Currency arbitrage detection',
        'When Dijkstra cannot be used',
        'Distance vector routing'
      ],
      timeComplexity: 'O(V * E)',
      spaceComplexity: 'O(V)',
      codeExample: `# Pattern: Bellman-Ford Algorithm
def bellman_ford(n, edges, source):
    """
    Find shortest paths from source to all vertices
    Handles negative weights, detects negative cycles

    Returns: (distances, has_negative_cycle)
    """
    dist = [float('inf')] * n
    dist[source] = 0

    # Relax all edges n-1 times
    for _ in range(n - 1):
        for u, v, weight in edges:
            if dist[u] != float('inf') and dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight

    # Check for negative cycle
    for u, v, weight in edges:
        if dist[u] != float('inf') and dist[u] + weight < dist[v]:
            return dist, True  # Negative cycle exists

    return dist, False

# Pattern: Cheapest Flights Within K Stops (Bellman-Ford variant)
def findCheapestPrice_bf(n, flights, src, dst, k):
    """
    Find cheapest flight with at most k stops
    Modified Bellman-Ford with limited iterations
    """
    dist = [float('inf')] * n
    dist[src] = 0

    # At most k+1 edges (k stops)
    for _ in range(k + 1):
        # Copy to avoid using updated values in same iteration
        temp = dist[:]

        for u, v, price in flights:
            if dist[u] != float('inf'):
                temp[v] = min(temp[v], dist[u] + price)

        dist = temp

    return dist[dst] if dist[dst] != float('inf') else -1

# Pattern: Negative Cycle Detection
def has_negative_cycle(n, edges):
    """Check if graph has negative cycle reachable from any vertex"""
    # Add a super source connected to all vertices with weight 0
    new_edges = edges + [(n, i, 0) for i in range(n)]

    dist = [float('inf')] * (n + 1)
    dist[n] = 0  # Super source

    # Relax n times (not n-1) since we added super source
    for _ in range(n):
        for u, v, weight in new_edges:
            if dist[u] != float('inf') and dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight

    # Check for negative cycle
    for u, v, weight in new_edges:
        if dist[u] != float('inf') and dist[u] + weight < dist[v]:
            return True

    return False

# Pattern: Find Negative Cycle
def find_negative_cycle(n, edges):
    """Find and return a negative cycle if exists"""
    dist = [0] * n  # Start with 0s to find any negative cycle
    parent = [-1] * n
    last_updated = -1

    for i in range(n):
        last_updated = -1
        for u, v, weight in edges:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                parent[v] = u
                last_updated = v

    if last_updated == -1:
        return []  # No negative cycle

    # Find a vertex in the cycle
    v = last_updated
    for _ in range(n):
        v = parent[v]

    # Extract cycle
    cycle = []
    current = v
    while True:
        cycle.append(current)
        current = parent[current]
        if current == v:
            break

    cycle.append(v)
    return cycle[::-1]

# Pattern: SPFA (Shortest Path Faster Algorithm)
def spfa(n, graph, source):
    """
    Optimized Bellman-Ford using queue
    Average case: O(E), Worst case: O(V*E)
    """
    from collections import deque

    dist = [float('inf')] * n
    dist[source] = 0
    in_queue = [False] * n
    count = [0] * n  # For negative cycle detection

    queue = deque([source])
    in_queue[source] = True

    while queue:
        u = queue.popleft()
        in_queue[u] = False

        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight

                if not in_queue[v]:
                    queue.append(v)
                    in_queue[v] = True
                    count[v] += 1

                    # Negative cycle if vertex queued n times
                    if count[v] >= n:
                        return None  # Negative cycle

    return dist

# Pattern: Currency Arbitrage Detection
def detectArbitrage(rates):
    """
    Detect if currency arbitrage is possible
    rates[i][j] = exchange rate from currency i to j
    """
    import math

    n = len(rates)

    # Convert to negative log for shortest path
    # log(a*b) = log(a) + log(b)
    # Arbitrage exists if product > 1, i.e., sum of logs > 0
    # So we look for negative cycle in -log(rates)

    edges = []
    for i in range(n):
        for j in range(n):
            if i != j and rates[i][j] > 0:
                edges.append((i, j, -math.log(rates[i][j])))

    return has_negative_cycle(n, edges)`,
      commonProblems: [
        'Cheapest Flights Within K Stops',
        'Network Delay Time',
        'Find Negative Cycle',
        'Currency Arbitrage',
        'Minimum Cost to Reach Destination in Time',
        'Path with Maximum Probability'
      ]
    }
  ]

  // Patterns are now logically grouped:
  // 1. Array & String: two-pointers, sliding-window, rolling-hash, kmp
  // 2. Linked List: fast-slow-pointers
  // 3. Array: merge-intervals, cyclic-sort
  // 4. Heap: top-k-elements
  // 5. Searching: binary-search
  // 6. Tree: tree-dfs, tree-bfs
  // 7. Recursion: backtracking
  // 8. Dynamic Programming: all dp-* patterns
  // 9. Stack: monotonic-stack
  // 10. Graph: graph-traversal, union-find

  if (selectedPattern) {
    const pattern = patterns.find(p => p.id === selectedPattern)

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
                <span style={{ fontSize: '3rem' }}>{pattern.icon}</span>
                <div>
                  <h2 style={{
                    fontSize: '1.875rem',
                    fontWeight: 'bold',
                    color: 'white',
                    margin: 0
                  }}>
                    {pattern.name}
                  </h2>
                  <div style={{
                    display: 'inline-block',
                    marginTop: '0.5rem',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {pattern.category}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedPattern(null)}
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

          {/* Description */}
          <div style={{
            background: '#1f2937',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            border: '1px solid #3b82f6'
          }}>
            <p style={{ fontSize: '1.2rem', color: '#d1d5db', margin: 0, fontWeight: '500', lineHeight: '1.625' }}>
              {pattern.description}
            </p>
          </div>

          {/* Complexity */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              padding: '1rem',
              background: '#1f2937',
              borderRadius: '0.5rem',
              border: '1px solid #3b82f6'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#9ca3af', fontWeight: '600', marginBottom: '0.25rem' }}>
                Time Complexity
              </div>
              <div style={{ fontSize: '1.1rem', color: '#93c5fd', fontWeight: '700' }}>
                {pattern.timeComplexity}
              </div>
            </div>
            <div style={{
              padding: '1rem',
              background: '#1f2937',
              borderRadius: '0.5rem',
              border: '1px solid #3b82f6'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#9ca3af', fontWeight: '600', marginBottom: '0.25rem' }}>
                Space Complexity
              </div>
              <div style={{ fontSize: '1.1rem', color: '#93c5fd', fontWeight: '700' }}>
                {pattern.spaceComplexity}
              </div>
            </div>
          </div>

          {/* When to Use + Visual */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            {/* When to Use - Left Side */}
            <div style={{
              background: '#1f2937',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              border: '1px solid #3b82f6'
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: '0.75rem',
                color: '#93c5fd'
              }}>
                When to Use
              </h3>
              <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.5', color: '#d1d5db', margin: 0 }}>
                {pattern.whenToUse.map((use, idx) => (
                  <li key={idx} style={{ fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                    {use}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual Representation - Right Side */}
            <div style={{
              background: '#1f2937',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              border: '1px solid #3b82f6',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                marginBottom: '0.75rem',
                color: '#93c5fd',
                alignSelf: 'flex-start'
              }}>
                Visual
              </h3>
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
              }}>
                {/* Two Pointers */}
                {pattern.id === 'two-pointers' && (
                  <svg width="280" height="80" viewBox="0 0 280 80">
                    {[0,1,2,3,4,5,6].map((i) => (
                      <rect key={i} x={10 + i * 38} y="25" width="32" height="32" rx="4" fill="#374151" stroke="#60a5fa" strokeWidth="2"/>
                    ))}
                    <polygon points="26,15 32,5 38,15" fill="#10b981"/>
                    <text x="32" y="70" textAnchor="middle" fill="#10b981" fontSize="12">L</text>
                    <polygon points="230,15 236,5 242,15" fill="#f59e0b"/>
                    <text x="236" y="70" textAnchor="middle" fill="#f59e0b" fontSize="12">R</text>
                    <path d="M 50 10 Q 140 -10 222 10" stroke="#60a5fa" strokeWidth="2" fill="none" strokeDasharray="4"/>
                  </svg>
                )}
                {/* Sliding Window */}
                {pattern.id === 'sliding-window' && (
                  <svg width="280" height="80" viewBox="0 0 280 80">
                    {[0,1,2,3,4,5,6].map((i) => (
                      <rect key={i} x={10 + i * 38} y="25" width="32" height="32" rx="4" fill={i >= 2 && i <= 4 ? '#3b82f6' : '#374151'} stroke="#60a5fa" strokeWidth="2"/>
                    ))}
                    <rect x="82" y="18" width="120" height="46" rx="6" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="6"/>
                    <path d="M 200 41 L 230 41" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)"/>
                    <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/></marker></defs>
                    <text x="140" y="75" textAnchor="middle" fill="#10b981" fontSize="11">window</text>
                  </svg>
                )}
                {/* Rolling Hash */}
                {pattern.id === 'rolling-hash' && (
                  <svg width="280" height="90" viewBox="0 0 280 90">
                    {['a','b','c','d','e','f'].map((c, i) => (
                      <g key={i}>
                        <rect x={15 + i * 42} y="10" width="36" height="32" rx="4" fill={i >= 1 && i <= 3 ? '#3b82f6' : '#374151'} stroke="#60a5fa" strokeWidth="2"/>
                        <text x={33 + i * 42} y="32" textAnchor="middle" fill="white" fontSize="14">{c}</text>
                      </g>
                    ))}
                    <text x="140" y="62" textAnchor="middle" fill="#10b981" fontSize="12">hash = (h - a·bⁿ⁻¹) · b + d</text>
                    <text x="140" y="82" textAnchor="middle" fill="#9ca3af" fontSize="11">O(1) update</text>
                  </svg>
                )}
                {/* KMP */}
                {pattern.id === 'kmp' && (
                  <svg width="280" height="90" viewBox="0 0 280 90">
                    <text x="10" y="20" fill="#9ca3af" fontSize="11">text:</text>
                    {['A','B','A','B','A','C'].map((c, i) => (
                      <g key={i}>
                        <rect x={50 + i * 36} y="8" width="30" height="24" rx="3" fill="#374151" stroke="#60a5fa" strokeWidth="1"/>
                        <text x={65 + i * 36} y="25" textAnchor="middle" fill="white" fontSize="12">{c}</text>
                      </g>
                    ))}
                    <text x="10" y="52" fill="#9ca3af" fontSize="11">pattern:</text>
                    {['A','B','A','C'].map((c, i) => (
                      <g key={i}>
                        <rect x={50 + i * 36} y="40" width="30" height="24" rx="3" fill="#10b981" stroke="#10b981" strokeWidth="1"/>
                        <text x={65 + i * 36} y="57" textAnchor="middle" fill="white" fontSize="12">{c}</text>
                      </g>
                    ))}
                    <text x="10" y="82" fill="#9ca3af" fontSize="11">LPS:</text>
                    {[0,0,1,0].map((n, i) => (
                      <text key={i} x={65 + i * 36} y="82" textAnchor="middle" fill="#f59e0b" fontSize="12">{n}</text>
                    ))}
                  </svg>
                )}
                {/* Fast Slow Pointers */}
                {pattern.id === 'fast-slow-pointers' && (
                  <svg width="280" height="80" viewBox="0 0 280 80">
                    {[0,1,2,3,4].map((i) => (
                      <g key={i}>
                        <circle cx={30 + i * 50} cy="40" r="18" fill="#374151" stroke="#60a5fa" strokeWidth="2"/>
                        {i < 4 && <path d={`M ${52 + i * 50} 40 L ${78 + i * 50} 40`} stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrowBlue)"/>}
                      </g>
                    ))}
                    <path d="M 248 40 Q 270 40 270 60 Q 270 80 140 80 Q 30 80 30 62" stroke="#60a5fa" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue)"/>
                    <text x="30" y="15" textAnchor="middle" fill="#10b981" fontSize="10">🐢</text>
                    <text x="130" y="15" textAnchor="middle" fill="#f59e0b" fontSize="10">🐇</text>
                    <defs><marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#60a5fa"/></marker></defs>
                  </svg>
                )}
                {/* Binary Search */}
                {pattern.id === 'binary-search' && (
                  <svg width="280" height="80" viewBox="0 0 280 80">
                    {[1,2,3,5,8,13,21].map((n, i) => (
                      <g key={i}>
                        <rect x={10 + i * 38} y="25" width="32" height="32" rx="4" fill={i === 3 ? '#10b981' : '#374151'} stroke="#60a5fa" strokeWidth="2"/>
                        <text x={26 + i * 38} y="46" textAnchor="middle" fill="white" fontSize="11">{n}</text>
                      </g>
                    ))}
                    <text x="26" y="70" textAnchor="middle" fill="#f59e0b" fontSize="10">L</text>
                    <text x="140" y="18" textAnchor="middle" fill="#10b981" fontSize="10">M</text>
                    <text x="254" y="70" textAnchor="middle" fill="#f59e0b" fontSize="10">R</text>
                  </svg>
                )}
                {/* Tree DFS */}
                {pattern.id === 'tree-dfs' && (
                  <svg width="280" height="100" viewBox="0 0 280 100">
                    <line x1="140" y1="25" x2="80" y2="55" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="140" y1="25" x2="200" y2="55" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="80" y1="55" x2="50" y2="85" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="80" y1="55" x2="110" y2="85" stroke="#60a5fa" strokeWidth="2"/>
                    <circle cx="140" cy="20" r="15" fill="#10b981" stroke="#10b981"/>
                    <circle cx="80" cy="55" r="15" fill="#3b82f6" stroke="#3b82f6"/>
                    <circle cx="200" cy="55" r="15" fill="#374151" stroke="#60a5fa" strokeWidth="2"/>
                    <circle cx="50" cy="85" r="15" fill="#374151" stroke="#60a5fa" strokeWidth="2"/>
                    <circle cx="110" cy="85" r="15" fill="#374151" stroke="#60a5fa" strokeWidth="2"/>
                    <text x="140" y="25" textAnchor="middle" fill="white" fontSize="11">1</text>
                    <text x="80" y="60" textAnchor="middle" fill="white" fontSize="11">2</text>
                    <text x="200" y="60" textAnchor="middle" fill="white" fontSize="11">5</text>
                    <text x="50" y="90" textAnchor="middle" fill="white" fontSize="11">3</text>
                    <text x="110" y="90" textAnchor="middle" fill="white" fontSize="11">4</text>
                  </svg>
                )}
                {/* Tree BFS */}
                {pattern.id === 'tree-bfs' && (
                  <svg width="280" height="100" viewBox="0 0 280 100">
                    <line x1="140" y1="25" x2="80" y2="55" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="140" y1="25" x2="200" y2="55" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="80" y1="55" x2="50" y2="85" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="80" y1="55" x2="110" y2="85" stroke="#60a5fa" strokeWidth="2"/>
                    <circle cx="140" cy="20" r="15" fill="#10b981" stroke="#10b981"/>
                    <circle cx="80" cy="55" r="15" fill="#3b82f6" stroke="#3b82f6"/>
                    <circle cx="200" cy="55" r="15" fill="#3b82f6" stroke="#3b82f6"/>
                    <circle cx="50" cy="85" r="15" fill="#374151" stroke="#60a5fa" strokeWidth="2"/>
                    <circle cx="110" cy="85" r="15" fill="#374151" stroke="#60a5fa" strokeWidth="2"/>
                    <text x="140" y="25" textAnchor="middle" fill="white" fontSize="11">1</text>
                    <text x="80" y="60" textAnchor="middle" fill="white" fontSize="11">2</text>
                    <text x="200" y="60" textAnchor="middle" fill="white" fontSize="11">3</text>
                    <text x="50" y="90" textAnchor="middle" fill="white" fontSize="11">4</text>
                    <text x="110" y="90" textAnchor="middle" fill="white" fontSize="11">5</text>
                  </svg>
                )}
                {/* Graph Traversal */}
                {pattern.id === 'graph-traversal' && (
                  <svg width="280" height="100" viewBox="0 0 280 100">
                    <line x1="60" y1="30" x2="140" y2="30" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="60" y1="30" x2="60" y2="70" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="140" y1="30" x2="220" y2="30" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="140" y1="30" x2="140" y2="70" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="60" y1="70" x2="140" y2="70" stroke="#60a5fa" strokeWidth="2"/>
                    <circle cx="60" cy="30" r="15" fill="#10b981"/>
                    <circle cx="140" cy="30" r="15" fill="#3b82f6"/>
                    <circle cx="220" cy="30" r="15" fill="#374151" stroke="#60a5fa" strokeWidth="2"/>
                    <circle cx="60" cy="70" r="15" fill="#3b82f6"/>
                    <circle cx="140" cy="70" r="15" fill="#374151" stroke="#60a5fa" strokeWidth="2"/>
                    <text x="60" y="35" textAnchor="middle" fill="white" fontSize="10">A</text>
                    <text x="140" y="35" textAnchor="middle" fill="white" fontSize="10">B</text>
                    <text x="220" y="35" textAnchor="middle" fill="white" fontSize="10">C</text>
                    <text x="60" y="75" textAnchor="middle" fill="white" fontSize="10">D</text>
                    <text x="140" y="75" textAnchor="middle" fill="white" fontSize="10">E</text>
                  </svg>
                )}
                {/* Union Find */}
                {pattern.id === 'union-find' && (
                  <svg width="280" height="100" viewBox="0 0 280 100">
                    <line x1="70" y1="25" x2="40" y2="60" stroke="#10b981" strokeWidth="2"/>
                    <line x1="70" y1="25" x2="100" y2="60" stroke="#10b981" strokeWidth="2"/>
                    <line x1="200" y1="25" x2="170" y2="60" stroke="#3b82f6" strokeWidth="2"/>
                    <line x1="200" y1="25" x2="230" y2="60" stroke="#3b82f6" strokeWidth="2"/>
                    <circle cx="70" cy="20" r="15" fill="#10b981"/>
                    <circle cx="40" cy="65" r="12" fill="#10b981" opacity="0.7"/>
                    <circle cx="100" cy="65" r="12" fill="#10b981" opacity="0.7"/>
                    <circle cx="200" cy="20" r="15" fill="#3b82f6"/>
                    <circle cx="170" cy="65" r="12" fill="#3b82f6" opacity="0.7"/>
                    <circle cx="230" cy="65" r="12" fill="#3b82f6" opacity="0.7"/>
                    <path d="M 100 40 Q 135 30 160 40" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4" fill="none"/>
                    <text x="135" y="90" textAnchor="middle" fill="#f59e0b" fontSize="11">union?</text>
                  </svg>
                )}
                {/* Backtracking */}
                {pattern.id === 'backtracking' && (
                  <svg width="280" height="100" viewBox="0 0 280 100">
                    <line x1="140" y1="15" x2="80" y2="45" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="140" y1="15" x2="200" y2="45" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="80" y1="45" x2="50" y2="75" stroke="#10b981" strokeWidth="2"/>
                    <line x1="80" y1="45" x2="110" y2="75" stroke="#ef4444" strokeWidth="2"/>
                    <line x1="200" y1="45" x2="200" y2="75" stroke="#60a5fa" strokeWidth="2"/>
                    <circle cx="140" cy="12" r="10" fill="#3b82f6"/>
                    <circle cx="80" cy="45" r="10" fill="#3b82f6"/>
                    <circle cx="200" cy="45" r="10" fill="#374151" stroke="#60a5fa"/>
                    <circle cx="50" cy="75" r="10" fill="#10b981"/>
                    <circle cx="110" cy="75" r="10" fill="#ef4444"/>
                    <text x="50" y="95" textAnchor="middle" fill="#10b981" fontSize="9">✓</text>
                    <text x="110" y="95" textAnchor="middle" fill="#ef4444" fontSize="9">✗</text>
                    <path d="M 115 70 Q 125 55 115 45" stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#arrowOrange)" strokeDasharray="3"/>
                    <defs><marker id="arrowOrange" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#f59e0b"/></marker></defs>
                  </svg>
                )}
                {/* Monotonic Stack */}
                {pattern.id === 'monotonic-stack' && (
                  <svg width="280" height="100" viewBox="0 0 280 100">
                    <rect x="30" y="20" width="80" height="70" rx="4" fill="none" stroke="#60a5fa" strokeWidth="2"/>
                    {[5,3,2,1].map((h, i) => (
                      <rect key={i} x="40" y={70 - i * 15} width="60" height="12" rx="2" fill="#3b82f6"/>
                    ))}
                    <text x="70" y="15" textAnchor="middle" fill="#9ca3af" fontSize="10">stack</text>
                    {[2,5,3,1,4].map((h, i) => (
                      <g key={i}>
                        <rect x={140 + i * 26} y={85 - h * 12} width="22" height={h * 12} fill="#374151" stroke="#60a5fa"/>
                        <text x={151 + i * 26} y="98" textAnchor="middle" fill="#9ca3af" fontSize="9">{h}</text>
                      </g>
                    ))}
                    <text x="200" y="15" textAnchor="middle" fill="#9ca3af" fontSize="10">heights</text>
                  </svg>
                )}
                {/* Dynamic Programming */}
                {(pattern.id === 'dynamic-programming' || pattern.id.startsWith('dp-')) && (
                  <svg width="280" height="100" viewBox="0 0 280 100">
                    {[0,1,2,3,4].map((i) => (
                      [0,1,2].map((j) => (
                        <g key={`${i}-${j}`}>
                          <rect x={30 + i * 46} y={15 + j * 28} width="40" height="24" rx="3"
                            fill={i <= 2 && j <= 1 ? '#3b82f6' : '#374151'}
                            stroke="#60a5fa" strokeWidth="1"/>
                          {i <= 2 && j <= 1 && (
                            <text x={50 + i * 46} y={32 + j * 28} textAnchor="middle" fill="white" fontSize="10">
                              {i + j}
                            </text>
                          )}
                        </g>
                      ))
                    ))}
                    <path d="M 95 27 L 125 27" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen)"/>
                    <path d="M 72 52 L 72 70" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen)"/>
                    <defs><marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#10b981"/></marker></defs>
                  </svg>
                )}
                {/* Top K Elements */}
                {pattern.id === 'top-k-elements' && (
                  <svg width="280" height="100" viewBox="0 0 280 100">
                    <line x1="140" y1="18" x2="100" y2="45" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="140" y1="18" x2="180" y2="45" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="100" y1="45" x2="75" y2="72" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="100" y1="45" x2="125" y2="72" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="180" y1="45" x2="155" y2="72" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="180" y1="45" x2="205" y2="72" stroke="#60a5fa" strokeWidth="2"/>
                    <circle cx="140" cy="15" r="13" fill="#10b981"/>
                    <circle cx="100" cy="45" r="13" fill="#3b82f6"/>
                    <circle cx="180" cy="45" r="13" fill="#3b82f6"/>
                    <circle cx="75" cy="72" r="11" fill="#374151" stroke="#60a5fa"/>
                    <circle cx="125" cy="72" r="11" fill="#374151" stroke="#60a5fa"/>
                    <circle cx="155" cy="72" r="11" fill="#374151" stroke="#60a5fa"/>
                    <circle cx="205" cy="72" r="11" fill="#374151" stroke="#60a5fa"/>
                    <text x="140" y="19" textAnchor="middle" fill="white" fontSize="10">9</text>
                    <text x="100" y="49" textAnchor="middle" fill="white" fontSize="10">7</text>
                    <text x="180" y="49" textAnchor="middle" fill="white" fontSize="10">5</text>
                    <text x="240" y="25" fill="#9ca3af" fontSize="10">heap</text>
                  </svg>
                )}
                {/* Merge Intervals */}
                {pattern.id === 'merge-intervals' && (
                  <svg width="280" height="90" viewBox="0 0 280 90">
                    <rect x="20" y="15" width="80" height="16" rx="3" fill="#3b82f6"/>
                    <rect x="70" y="35" width="60" height="16" rx="3" fill="#3b82f6"/>
                    <rect x="150" y="15" width="50" height="16" rx="3" fill="#10b981"/>
                    <text x="140" y="65" textAnchor="middle" fill="#f59e0b" fontSize="12">↓ merge</text>
                    <rect x="20" y="75" width="110" height="16" rx="3" fill="#10b981"/>
                    <rect x="150" y="75" width="50" height="16" rx="3" fill="#10b981"/>
                  </svg>
                )}
                {/* Cyclic Sort */}
                {pattern.id === 'cyclic-sort' && (
                  <svg width="280" height="80" viewBox="0 0 280 80">
                    {[3,1,5,4,2].map((n, i) => (
                      <g key={i}>
                        <rect x={20 + i * 50} y="20" width="40" height="35" rx="4" fill="#374151" stroke="#60a5fa" strokeWidth="2"/>
                        <text x={40 + i * 50} y="43" textAnchor="middle" fill="white" fontSize="14">{n}</text>
                        <text x={40 + i * 50} y="70" textAnchor="middle" fill="#9ca3af" fontSize="10">[{i}]</text>
                      </g>
                    ))}
                    <path d="M 40 15 Q 90 0 140 15" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="4"/>
                  </svg>
                )}
                {/* Trie */}
                {pattern.id === 'trie' && (
                  <svg width="280" height="100" viewBox="0 0 280 100">
                    <circle cx="140" cy="15" r="12" fill="#10b981"/>
                    <text x="140" y="19" textAnchor="middle" fill="white" fontSize="10">*</text>
                    <line x1="140" y1="27" x2="80" y2="47" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="140" y1="27" x2="200" y2="47" stroke="#60a5fa" strokeWidth="2"/>
                    <circle cx="80" cy="50" r="12" fill="#3b82f6"/>
                    <text x="80" y="54" textAnchor="middle" fill="white" fontSize="10">c</text>
                    <circle cx="200" cy="50" r="12" fill="#3b82f6"/>
                    <text x="200" y="54" textAnchor="middle" fill="white" fontSize="10">d</text>
                    <line x1="80" y1="62" x2="50" y2="82" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="80" y1="62" x2="110" y2="82" stroke="#60a5fa" strokeWidth="2"/>
                    <circle cx="50" cy="85" r="10" fill="#374151" stroke="#60a5fa"/>
                    <text x="50" y="89" textAnchor="middle" fill="white" fontSize="9">a</text>
                    <circle cx="110" cy="85" r="10" fill="#f59e0b"/>
                    <text x="110" y="89" textAnchor="middle" fill="white" fontSize="9">o</text>
                    <text x="240" y="55" fill="#9ca3af" fontSize="10">prefix</text>
                    <text x="240" y="70" fill="#9ca3af" fontSize="10">tree</text>
                  </svg>
                )}
                {/* Topological Sort */}
                {pattern.id === 'topological-sort' && (
                  <svg width="280" height="90" viewBox="0 0 280 90">
                    <defs><marker id="arrowTS" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#60a5fa"/></marker></defs>
                    <circle cx="40" cy="45" r="15" fill="#10b981"/>
                    <text x="40" y="50" textAnchor="middle" fill="white" fontSize="11">A</text>
                    <circle cx="100" cy="25" r="15" fill="#3b82f6"/>
                    <text x="100" y="30" textAnchor="middle" fill="white" fontSize="11">B</text>
                    <circle cx="100" cy="65" r="15" fill="#3b82f6"/>
                    <text x="100" y="70" textAnchor="middle" fill="white" fontSize="11">C</text>
                    <circle cx="170" cy="45" r="15" fill="#374151" stroke="#60a5fa" strokeWidth="2"/>
                    <text x="170" y="50" textAnchor="middle" fill="white" fontSize="11">D</text>
                    <circle cx="240" cy="45" r="15" fill="#374151" stroke="#60a5fa" strokeWidth="2"/>
                    <text x="240" y="50" textAnchor="middle" fill="white" fontSize="11">E</text>
                    <path d="M 55 40 L 82 28" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrowTS)"/>
                    <path d="M 55 50 L 82 62" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrowTS)"/>
                    <path d="M 115 30 L 152 42" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrowTS)"/>
                    <path d="M 115 60 L 152 48" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrowTS)"/>
                    <path d="M 185 45 L 222 45" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#arrowTS)"/>
                  </svg>
                )}
                {/* Prefix Sum */}
                {pattern.id === 'prefix-sum' && (
                  <svg width="280" height="90" viewBox="0 0 280 90">
                    <text x="10" y="25" fill="#9ca3af" fontSize="10">arr:</text>
                    {[2,4,1,3,5].map((n, i) => (
                      <g key={i}>
                        <rect x={45 + i * 44} y="10" width="38" height="24" rx="3" fill="#374151" stroke="#60a5fa" strokeWidth="1"/>
                        <text x={64 + i * 44} y="27" textAnchor="middle" fill="white" fontSize="11">{n}</text>
                      </g>
                    ))}
                    <text x="10" y="60" fill="#9ca3af" fontSize="10">pre:</text>
                    {[0,2,6,7,10,15].map((n, i) => (
                      <g key={i}>
                        <rect x={45 + i * 38} y="45" width="34" height="24" rx="3" fill="#10b981" stroke="#10b981" strokeWidth="1"/>
                        <text x={62 + i * 38} y="62" textAnchor="middle" fill="white" fontSize="10">{n}</text>
                      </g>
                    ))}
                    <text x="140" y="85" textAnchor="middle" fill="#f59e0b" fontSize="10">sum[i..j] = pre[j+1] - pre[i]</text>
                  </svg>
                )}
                {/* Bit Manipulation */}
                {pattern.id === 'bit-manipulation' && (
                  <svg width="280" height="80" viewBox="0 0 280 80">
                    {[1,0,1,1,0,1,0,0].map((b, i) => (
                      <g key={i}>
                        <rect x={20 + i * 30} y="20" width="26" height="30" rx="3" fill={b ? '#10b981' : '#374151'} stroke="#60a5fa" strokeWidth="1"/>
                        <text x={33 + i * 30} y="41" textAnchor="middle" fill="white" fontSize="14">{b}</text>
                        <text x={33 + i * 30} y="62" textAnchor="middle" fill="#9ca3af" fontSize="8">{7-i}</text>
                      </g>
                    ))}
                    <text x="140" y="78" textAnchor="middle" fill="#f59e0b" fontSize="10">XOR: a ^ a = 0, a ^ 0 = a</text>
                  </svg>
                )}
                {/* Greedy */}
                {pattern.id === 'greedy' && (
                  <svg width="280" height="90" viewBox="0 0 280 90">
                    {[0,1,2,3,4].map((i) => (
                      <g key={i}>
                        <rect x={30 + i * 48} y="25" width="40" height="40" rx="4" fill={i === 0 ? '#10b981' : i <= 2 ? '#3b82f6' : '#374151'} stroke="#60a5fa" strokeWidth="2"/>
                        <text x={50 + i * 48} y="50" textAnchor="middle" fill="white" fontSize="11">{[3,2,4,1,1][i]}</text>
                      </g>
                    ))}
                    <path d="M 70 70 L 118 70" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowGreedy)"/>
                    <path d="M 118 70 L 166 70" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowGreedy)"/>
                    <defs><marker id="arrowGreedy" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#f59e0b"/></marker></defs>
                    <text x="140" y="85" textAnchor="middle" fill="#10b981" fontSize="10">local optimal → global optimal</text>
                  </svg>
                )}
                {/* Kadane's Algorithm */}
                {pattern.id === 'kadane' && (
                  <svg width="280" height="90" viewBox="0 0 280 90">
                    {[-2,1,-3,4,-1,2,1,-5,4].map((n, i) => (
                      <g key={i}>
                        <rect x={10 + i * 29} y="15" width="26" height="26" rx="3" fill={i >= 3 && i <= 6 ? '#10b981' : '#374151'} stroke="#60a5fa" strokeWidth="1"/>
                        <text x={23 + i * 29} y="33" textAnchor="middle" fill="white" fontSize="10">{n}</text>
                      </g>
                    ))}
                    <rect x="97" y="45" width="120" height="20" rx="4" fill="none" stroke="#10b981" strokeWidth="2"/>
                    <text x="157" y="59" textAnchor="middle" fill="#10b981" fontSize="10">max sum = 6</text>
                    <text x="140" y="82" textAnchor="middle" fill="#f59e0b" fontSize="10">curr = max(num, curr + num)</text>
                  </svg>
                )}
                {/* Dijkstra's Algorithm */}
                {pattern.id === 'dijkstra' && (
                  <svg width="280" height="100" viewBox="0 0 280 100">
                    <defs><marker id="arrowDij" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#60a5fa"/></marker></defs>
                    <circle cx="50" cy="50" r="18" fill="#10b981"/>
                    <text x="50" y="55" textAnchor="middle" fill="white" fontSize="11">0</text>
                    <circle cx="130" cy="25" r="18" fill="#3b82f6"/>
                    <text x="130" y="30" textAnchor="middle" fill="white" fontSize="11">2</text>
                    <circle cx="130" cy="75" r="18" fill="#3b82f6"/>
                    <text x="130" y="80" textAnchor="middle" fill="white" fontSize="11">3</text>
                    <circle cx="210" cy="50" r="18" fill="#374151" stroke="#60a5fa" strokeWidth="2"/>
                    <text x="210" y="55" textAnchor="middle" fill="white" fontSize="11">5</text>
                    <path d="M 68 42 L 108 30" stroke="#60a5fa" strokeWidth="2"/>
                    <text x="85" y="32" fill="#f59e0b" fontSize="9">2</text>
                    <path d="M 68 58 L 108 70" stroke="#60a5fa" strokeWidth="2"/>
                    <text x="85" y="72" fill="#f59e0b" fontSize="9">3</text>
                    <path d="M 148 30 L 188 45" stroke="#60a5fa" strokeWidth="2"/>
                    <text x="170" y="32" fill="#f59e0b" fontSize="9">3</text>
                    <path d="M 148 70 L 188 55" stroke="#60a5fa" strokeWidth="2"/>
                    <text x="170" y="72" fill="#f59e0b" fontSize="9">2</text>
                  </svg>
                )}
                {/* Binary Indexed Tree */}
                {pattern.id === 'binary-indexed-tree' && (
                  <svg width="280" height="100" viewBox="0 0 280 100">
                    {[1,2,3,4,5,6,7,8].map((n, i) => (
                      <g key={i}>
                        <rect x={15 + i * 32} y="70" width="28" height="22" rx="2" fill="#374151" stroke="#60a5fa" strokeWidth="1"/>
                        <text x={29 + i * 32} y="85" textAnchor="middle" fill="white" fontSize="9">{n}</text>
                      </g>
                    ))}
                    <rect x="15" y="40" width="28" height="20" rx="2" fill="#10b981"/>
                    <rect x="47" y="40" width="60" height="20" rx="2" fill="#3b82f6"/>
                    <rect x="111" y="40" width="28" height="20" rx="2" fill="#10b981"/>
                    <rect x="143" y="40" width="124" height="20" rx="2" fill="#3b82f6"/>
                    <text x="140" y="20" textAnchor="middle" fill="#9ca3af" fontSize="10">BIT: O(log n) update & query</text>
                  </svg>
                )}
                {/* Segment Tree */}
                {pattern.id === 'segment-tree' && (
                  <svg width="280" height="100" viewBox="0 0 280 100">
                    <line x1="140" y1="18" x2="80" y2="40" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="140" y1="18" x2="200" y2="40" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="80" y1="48" x2="50" y2="70" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="80" y1="48" x2="110" y2="70" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="200" y1="48" x2="170" y2="70" stroke="#60a5fa" strokeWidth="2"/>
                    <line x1="200" y1="48" x2="230" y2="70" stroke="#60a5fa" strokeWidth="2"/>
                    <rect x="125" y="8" width="30" height="18" rx="3" fill="#10b981"/>
                    <text x="140" y="21" textAnchor="middle" fill="white" fontSize="9">36</text>
                    <rect x="65" y="38" width="30" height="18" rx="3" fill="#3b82f6"/>
                    <text x="80" y="51" textAnchor="middle" fill="white" fontSize="9">10</text>
                    <rect x="185" y="38" width="30" height="18" rx="3" fill="#3b82f6"/>
                    <text x="200" y="51" textAnchor="middle" fill="white" fontSize="9">26</text>
                    {[3,7,11,15].map((n, i) => (
                      <g key={i}>
                        <rect x={35 + i * 60} y="68" width="30" height="18" rx="3" fill="#374151" stroke="#60a5fa"/>
                        <text x={50 + i * 60} y="81" textAnchor="middle" fill="white" fontSize="9">{n}</text>
                      </g>
                    ))}
                    <text x="140" y="98" textAnchor="middle" fill="#f59e0b" fontSize="9">range sum/min/max</text>
                  </svg>
                )}
                {/* Dutch National Flag */}
                {pattern.id === 'dutch-national-flag' && (
                  <svg width="280" height="80" viewBox="0 0 280 80">
                    <text x="10" y="25" fill="#9ca3af" fontSize="9">before:</text>
                    {[2,0,1,2,0,1,0].map((n, i) => (
                      <rect key={i} x={55 + i * 30} y="10" width="26" height="22" rx="3" fill={n === 0 ? '#ef4444' : n === 1 ? '#f59e0b' : '#3b82f6'} stroke="none"/>
                    ))}
                    <text x="10" y="58" fill="#9ca3af" fontSize="9">after:</text>
                    {[0,0,0,1,1,2,2].map((n, i) => (
                      <rect key={i} x={55 + i * 30} y="42" width="26" height="22" rx="3" fill={n === 0 ? '#ef4444' : n === 1 ? '#f59e0b' : '#3b82f6'} stroke="none"/>
                    ))}
                    <text x="140" y="78" textAnchor="middle" fill="#10b981" fontSize="10">3-way partition</text>
                  </svg>
                )}
                {/* Boyer-Moore Voting */}
                {pattern.id === 'boyer-moore-voting' && (
                  <svg width="280" height="80" viewBox="0 0 280 80">
                    {[3,2,3,3,1,3].map((n, i) => (
                      <g key={i}>
                        <rect x={25 + i * 38} y="15" width="32" height="28" rx="4" fill={n === 3 ? '#10b981' : '#374151'} stroke="#60a5fa" strokeWidth="1"/>
                        <text x={41 + i * 38} y="34" textAnchor="middle" fill="white" fontSize="12">{n}</text>
                      </g>
                    ))}
                    <text x="140" y="60" textAnchor="middle" fill="#f59e0b" fontSize="10">count++/-- → candidate=3</text>
                    <text x="140" y="75" textAnchor="middle" fill="#10b981" fontSize="10">majority element: 3</text>
                  </svg>
                )}
                {/* Reservoir Sampling */}
                {pattern.id === 'reservoir-sampling' && (
                  <svg width="280" height="85" viewBox="0 0 280 85">
                    <text x="10" y="25" fill="#9ca3af" fontSize="9">stream:</text>
                    {[1,2,3,4,5].map((n, i) => (
                      <g key={i}>
                        <circle cx={65 + i * 40} cy="20" r="14" fill="#374151" stroke="#60a5fa" strokeWidth="1"/>
                        <text x={65 + i * 40} y="25" textAnchor="middle" fill="white" fontSize="11">{n}</text>
                      </g>
                    ))}
                    <text x="248" fill="#9ca3af" fontSize="14" y="25">...</text>
                    <rect x="90" y="50" width="100" height="28" rx="4" fill="#10b981" stroke="#10b981"/>
                    <text x="140" y="68" textAnchor="middle" fill="white" fontSize="10">reservoir[k]</text>
                    <path d="M 145 35 L 140 48" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3"/>
                    <text x="165" y="43" fill="#f59e0b" fontSize="9">P=k/n</text>
                  </svg>
                )}
                {/* Matrix Traversal */}
                {pattern.id === 'matrix-traversal' && (
                  <svg width="280" height="100" viewBox="0 0 280 100">
                    {[0,1,2,3].map((row) => (
                      [0,1,2,3].map((col) => (
                        <rect key={`${row}-${col}`} x={70 + col * 36} y={10 + row * 22} width="32" height="18" rx="2" fill="#374151" stroke="#60a5fa" strokeWidth="1"/>
                      ))
                    ))}
                    <path d="M 86 19 L 122 19 L 122 41 L 86 41 L 86 63 L 122 63 L 122 85 L 86 85" stroke="#10b981" strokeWidth="2" fill="none"/>
                    <path d="M 122 19 L 158 19" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowMat)"/>
                    <defs><marker id="arrowMat" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#f59e0b"/></marker></defs>
                    <text x="220" y="35" fill="#9ca3af" fontSize="10">spiral</text>
                    <text x="220" y="50" fill="#9ca3af" fontSize="10">diagonal</text>
                    <text x="220" y="65" fill="#9ca3af" fontSize="10">rotate</text>
                  </svg>
                )}
                {/* A* Search */}
                {pattern.id === 'a-star' && (
                  <svg width="280" height="100" viewBox="0 0 280 100">
                    {[0,1,2,3,4].map((row) => (
                      [0,1,2,3,4,5].map((col) => {
                        const isStart = row === 2 && col === 0
                        const isEnd = row === 2 && col === 5
                        const isWall = (row === 1 && col === 2) || (row === 2 && col === 2) || (row === 3 && col === 2)
                        const isPath = (row === 2 && col === 1) || (row === 1 && col === 1) || (row === 0 && col === 2) || (row === 0 && col === 3) || (row === 1 && col === 4) || (row === 2 && col === 4)
                        return (
                          <rect key={`${row}-${col}`} x={50 + col * 32} y={5 + row * 18} width="28" height="15" rx="2"
                            fill={isStart ? '#10b981' : isEnd ? '#f59e0b' : isWall ? '#1f2937' : isPath ? '#3b82f6' : '#374151'}
                            stroke="#60a5fa" strokeWidth="1"/>
                        )
                      })
                    ))}
                    <text x="64" y="52" textAnchor="middle" fill="white" fontSize="8">S</text>
                    <text x="226" y="52" textAnchor="middle" fill="white" fontSize="8">E</text>
                    <text x="140" y="98" textAnchor="middle" fill="#f59e0b" fontSize="9">f(n) = g(n) + h(n)</text>
                  </svg>
                )}
                {/* Bellman-Ford */}
                {pattern.id === 'bellman-ford' && (
                  <svg width="280" height="95" viewBox="0 0 280 95">
                    <defs><marker id="arrowBF" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#60a5fa"/></marker></defs>
                    <circle cx="50" cy="40" r="16" fill="#10b981"/>
                    <text x="50" y="45" textAnchor="middle" fill="white" fontSize="10">0</text>
                    <circle cx="130" cy="20" r="16" fill="#3b82f6"/>
                    <text x="130" y="25" textAnchor="middle" fill="white" fontSize="10">4</text>
                    <circle cx="130" cy="60" r="16" fill="#3b82f6"/>
                    <text x="130" y="65" textAnchor="middle" fill="white" fontSize="10">2</text>
                    <circle cx="210" cy="40" r="16" fill="#374151" stroke="#60a5fa" strokeWidth="2"/>
                    <text x="210" y="45" textAnchor="middle" fill="white" fontSize="10">5</text>
                    <path d="M 66 35 L 110 23" stroke="#60a5fa" strokeWidth="2"/>
                    <text x="85" y="23" fill="#f59e0b" fontSize="9">4</text>
                    <path d="M 66 45 L 110 57" stroke="#60a5fa" strokeWidth="2"/>
                    <text x="85" y="60" fill="#f59e0b" fontSize="9">2</text>
                    <path d="M 130" y1="36" x2="130" y2="44" stroke="#ef4444" strokeWidth="2"/>
                    <text x="142" y="42" fill="#ef4444" fontSize="8">-3</text>
                    <path d="M 146 25 L 190 37" stroke="#60a5fa" strokeWidth="2"/>
                    <text x="170" y="28" fill="#f59e0b" fontSize="9">3</text>
                    <text x="140" y="88" textAnchor="middle" fill="#ef4444" fontSize="9">handles negative edges</text>
                  </svg>
                )}
                {/* Default visual for patterns without specific SVG */}
                {!['two-pointers', 'sliding-window', 'rolling-hash', 'kmp', 'fast-slow-pointers', 'binary-search', 'tree-dfs', 'tree-bfs', 'graph-traversal', 'union-find', 'backtracking', 'monotonic-stack', 'dynamic-programming', 'top-k-elements', 'merge-intervals', 'cyclic-sort', 'trie', 'topological-sort', 'prefix-sum', 'bit-manipulation', 'greedy', 'kadane', 'dijkstra', 'binary-indexed-tree', 'segment-tree', 'dutch-national-flag', 'boyer-moore-voting', 'reservoir-sampling', 'matrix-traversal', 'a-star', 'bellman-ford'].includes(pattern.id) && !pattern.id.startsWith('dp-') && (
                  <div style={{
                    fontSize: '4rem',
                    opacity: 0.8
                  }}>
                    {pattern.icon}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Code Examples */}
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
              Implementation Examples
            </h3>
            {parseCodeSections(pattern.codeExample).map(
              (section, idx) => (
                <div key={section.id} style={{ marginBottom: '1rem' }}>
                  <button
                    onClick={() =>
                      toggleSection(
                        patterns.indexOf(pattern),
                        idx
                      )
                    }
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
                    {expandedSections[
                      `${patterns.indexOf(pattern)}-${idx}`
                    ]
                      ? '▼'
                      : '▶'}{' '}
                    Code Block {idx + 1}
                  </button>
                  {expandedSections[
                    `${patterns.indexOf(pattern)}-${idx}`
                  ] && (
                    <SyntaxHighlighter
                      language="python"
                      style={customTheme}
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
              )
            )}
          </div>

          {/* Common Problems */}
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
              Common LeetCode Problems
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
              {pattern.commonProblems.map((problem, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1rem 1.5rem',
                    background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                    border: '1px solid #3b82f6',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    color: '#d1d5db',
                    fontWeight: '500'
                  }}
                >
                  {problem}
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
              {selectedCategory
                ? `${categories.find(c => c.id === selectedCategory)?.icon} ${categories.find(c => c.id === selectedCategory)?.name}`
                : '🎯 LeetCode Patterns'}
            </h1>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} />

        <p style={{
          fontSize: '1.2rem',
          color: '#d1d5db',
          textAlign: 'center',
          marginBottom: '3rem',
          lineHeight: '1.8'
        }}>
          {selectedCategory
            ? `${categories.find(c => c.id === selectedCategory)?.description}`
            : 'Master common problem-solving patterns to tackle any coding interview question with confidence.'}
        </p>

        {/* Back to categories button */}
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              background: '#374151',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '1.5rem',
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = '#4b5563'}
            onMouseLeave={(e) => e.target.style.background = '#374151'}
          >
            ← Back to Categories
          </button>
        )}

        {/* Categories View */}
        {!selectedCategory && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                  padding: '2rem',
                  borderRadius: '0.75rem',
                  border: `2px solid ${category.color}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  textAlign: 'left',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-0.5rem)'
                  e.currentTarget.style.boxShadow = `0 25px 50px -12px ${category.color}40`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{ fontSize: '2.5rem' }}>{category.icon}</span>
                  <div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: category.color,
                      marginBottom: '0.25rem'
                    }}>
                      {category.name}
                    </h3>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#9ca3af'
                    }}>
                      {category.patternIds.length} patterns
                    </span>
                  </div>
                </div>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#d1d5db',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  {category.description}
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  {category.patternIds.slice(0, 4).map(id => {
                    const pattern = patterns.find(p => p.id === id)
                    return pattern ? (
                      <span
                        key={id}
                        style={{
                          padding: '0.25rem 0.5rem',
                          backgroundColor: '#374151',
                          borderRadius: '0.25rem',
                          fontSize: '0.75rem',
                          color: '#d1d5db'
                        }}
                      >
                        {pattern.name}
                      </span>
                    ) : null
                  })}
                  {category.patternIds.length > 4 && (
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: category.color,
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      color: 'white'
                    }}>
                      +{category.patternIds.length - 4} more
                    </span>
                  )}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  color: category.color,
                  fontWeight: '600',
                  marginTop: '1rem'
                }}>
                  <span>Explore</span>
                  <span>→</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Patterns within Category View */}
        {selectedCategory && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {categories
              .find(c => c.id === selectedCategory)
              ?.patternIds.map(patternId => {
                const pattern = patterns.find(p => p.id === patternId)
                if (!pattern) return null
                return (
                  <button
                    key={pattern.id}
                    onClick={() => setSelectedPattern(pattern.id)}
                    style={{
                      background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      border: '2px solid #3b82f6',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      textAlign: 'left',
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
                      fontSize: '2.5rem',
                      marginBottom: '1rem',
                      textAlign: 'center'
                    }}>
                      {pattern.icon}
                    </div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginBottom: '0.75rem',
                      color: '#93c5fd'
                    }}>
                      {pattern.name}
                    </h3>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#d1d5db',
                      lineHeight: '1.5',
                      textAlign: 'center',
                      marginBottom: '1rem'
                    }}>
                      {pattern.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid #374151',
                      fontSize: '0.8rem'
                    }}>
                      <div>
                        <span style={{ color: '#9ca3af' }}>Time: </span>
                        <span style={{ color: '#93c5fd' }}>{pattern.timeComplexity}</span>
                      </div>
                      <div>
                        <span style={{ color: '#9ca3af' }}>Space: </span>
                        <span style={{ color: '#93c5fd' }}>{pattern.spaceComplexity}</span>
                      </div>
                    </div>
                  </button>
                )
              })}
          </div>
        )}
      </div>
    </div>
  )
}

export default LeetCodePatterns

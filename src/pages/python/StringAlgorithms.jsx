import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

const customTheme = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: '#0d1117',
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    background: 'transparent',
  },
}

function StringAlgorithms({ onBack, breadcrumb }) {
  const [expandedAlgorithm, setExpandedAlgorithm] = useState(null)

  const parseCodeSections = (codeString) => {
    const sections = codeString.split('\n\n')
    return sections.map((section, index) => ({
      id: index,
      code: section.trim()
    }))
  }

  const algorithms = [
    {
      id: 1,
      name: 'Rabin-Karp Algorithm',
      icon: '🔢',
      color: '#3b82f6',
      difficulty: 'Medium',
      timeComplexity: 'O(n + m) average, O(nm) worst',
      spaceComplexity: 'O(1)',
      description: 'Uses hashing to find pattern matches. Rolling hash enables efficient substring comparison.',
      howItWorks: 'Computes a hash value for the pattern and for each window of text. If hashes match, verifies character by character. The rolling hash allows updating the hash in O(1) when sliding the window by one position.',
      keyInsight: 'Instead of comparing characters, compare hash values first. Only do character comparison when hashes match.',
      useCases: ['Plagiarism detection', 'Multiple pattern search', 'DNA sequence matching'],
      visualization: {
        type: 'rabin-karp',
        text: 'ABRACADABRA',
        pattern: 'ABR',
        patternHash: 294,
        base: 31,
        steps: [
          { pos: 0, window: 'ABR', hash: 294, patternHash: 294, match: true, action: 'Hash match! Verify chars → Found at 0' },
          { pos: 1, window: 'BRA', hash: 306, patternHash: 294, match: false, action: 'Hash mismatch, skip' },
          { pos: 2, window: 'RAC', hash: 338, patternHash: 294, match: false, action: 'Hash mismatch, skip' },
          { pos: 3, window: 'ACA', hash: 285, patternHash: 294, match: false, action: 'Hash mismatch, skip' },
          { pos: 4, window: 'CAD', hash: 297, patternHash: 294, match: false, action: 'Hash mismatch, skip' },
          { pos: 5, window: 'ADA', hash: 286, patternHash: 294, match: false, action: 'Hash mismatch, skip' },
          { pos: 6, window: 'DAB', hash: 295, patternHash: 294, match: false, action: 'Hash mismatch, skip' },
          { pos: 7, window: 'ABR', hash: 294, patternHash: 294, match: true, action: 'Hash match! Verify chars → Found at 7' }
        ]
      },
      code: `def rabin_karp(text, pattern):
    """
    Rabin-Karp algorithm using rolling hash.
    Time: O(n + m) average, O(nm) worst case
    Space: O(1)
    """
    if not pattern or not text or len(pattern) > len(text):
        return []

    d = 256  # Number of characters in alphabet
    q = 101  # A prime number for modulo
    m, n = len(pattern), len(text)
    h = pow(d, m - 1) % q  # d^(m-1) % q
    p_hash = 0  # Hash of pattern
    t_hash = 0  # Hash of current window
    result = []

    # Calculate initial hashes
    for i in range(m):
        p_hash = (d * p_hash + ord(pattern[i])) % q
        t_hash = (d * t_hash + ord(text[i])) % q

    # Slide pattern over text
    for i in range(n - m + 1):
        if p_hash == t_hash:
            # Hash match - verify character by character
            if text[i:i + m] == pattern:
                result.append(i)

        # Calculate hash for next window
        if i < n - m:
            t_hash = (d * (t_hash - ord(text[i]) * h) + ord(text[i + m])) % q
            if t_hash < 0:
                t_hash += q

    return result

# Example usage
text = "ABABDABACDABABCABAB"
pattern = "ABAB"
print(f"Pattern found at indices: {rabin_karp(text, pattern)}")
# Output: Pattern found at indices: [0, 10, 15]`
    },
    {
      id: 2,
      name: 'KMP (Knuth-Morris-Pratt)',
      icon: '🎯',
      color: '#10b981',
      difficulty: 'Medium',
      timeComplexity: 'O(n + m)',
      spaceComplexity: 'O(m)',
      description: 'Uses failure function (LPS array) to avoid redundant comparisons. Never re-examines characters.',
      howItWorks: 'Preprocesses the pattern to build an LPS (Longest Proper Prefix which is also Suffix) array. When a mismatch occurs, uses LPS to skip characters that are guaranteed to match, avoiding backtracking in the text.',
      keyInsight: 'The LPS array tells us: "If we fail at position j, we can continue matching from LPS[j-1] without rechecking earlier characters."',
      useCases: ['Text editors (find/replace)', 'Network packet inspection', 'Bioinformatics'],
      visualization: {
        type: 'kmp',
        text: 'ABABDABACDABABCABAB',
        pattern: 'ABABC',
        lps: [0, 0, 1, 2, 0],
        lpsExplanation: [
          { char: 'A', val: 0, why: 'First char, no proper prefix' },
          { char: 'B', val: 0, why: '"A" ≠ "B", no match' },
          { char: 'A', val: 1, why: '"A" = "A", prefix len 1' },
          { char: 'B', val: 2, why: '"AB" = "AB", prefix len 2' },
          { char: 'C', val: 0, why: '"C" ≠ "A", reset to 0' }
        ],
        steps: [
          { textPos: 0, patternPos: 0, status: 'match', note: 'A=A, continue' },
          { textPos: 1, patternPos: 1, status: 'match', note: 'B=B, continue' },
          { textPos: 2, patternPos: 2, status: 'match', note: 'A=A, continue' },
          { textPos: 3, patternPos: 3, status: 'match', note: 'B=B, continue' },
          { textPos: 4, patternPos: 4, status: 'mismatch', note: 'D≠C! Use LPS[3]=2, jump pattern to index 2' },
          { textPos: 4, patternPos: 2, status: 'mismatch', note: 'D≠A! Use LPS[1]=0, jump pattern to index 0' },
          { textPos: 10, patternPos: 0, status: 'found', note: '...Eventually found match at position 10!' }
        ]
      },
      code: `def compute_lps(pattern):
    """
    Compute Longest Proper Prefix which is also Suffix (LPS) array.
    LPS[i] = length of longest proper prefix of pattern[0..i]
             which is also a suffix of pattern[0..i]
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

def kmp_search(text, pattern):
    """
    KMP pattern matching algorithm.
    Time: O(n + m)
    Space: O(m) for LPS array
    """
    if not pattern or not text:
        return []

    n, m = len(text), len(pattern)
    lps = compute_lps(pattern)
    result = []

    i = 0  # Index for text
    j = 0  # Index for pattern

    while i < n:
        if pattern[j] == text[i]:
            i += 1
            j += 1

        if j == m:
            result.append(i - j)
            j = lps[j - 1]
        elif i < n and pattern[j] != text[i]:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1

    return result

# Example
text = "ABABDABACDABABCABAB"
pattern = "ABAB"
print(f"Pattern found at indices: {kmp_search(text, pattern)}")
# Output: Pattern found at indices: [0, 10, 15]

# Visualize LPS array
print(f"LPS array for '{pattern}': {compute_lps(pattern)}")
# Output: LPS array for 'ABAB': [0, 0, 1, 2]`
    },
    {
      id: 3,
      name: 'Z-Algorithm',
      icon: '⚡',
      color: '#f59e0b',
      difficulty: 'Medium',
      timeComplexity: 'O(n + m)',
      spaceComplexity: 'O(n + m)',
      description: 'Computes Z-array where Z[i] is the length of longest substring starting at i that matches a prefix.',
      howItWorks: 'For each position i, computes the length of the longest substring starting at i that matches a prefix of the string. Uses a "Z-box" optimization to avoid redundant comparisons by reusing previously computed values.',
      keyInsight: 'Concatenate pattern + "$" + text. Any Z-value equal to pattern length indicates a match.',
      useCases: ['Pattern matching', 'Finding periods in strings', 'String compression'],
      visualization: {
        type: 'z-algorithm',
        string: 'aabxaab',
        zArray: [7, 1, 0, 0, 3, 1, 0],
        zExplanation: [
          { idx: 0, val: 7, substr: 'aabxaab', why: 'Entire string matches itself (by definition)' },
          { idx: 1, val: 1, substr: 'a', why: '"a" matches prefix "a"' },
          { idx: 2, val: 0, substr: '', why: '"b" ≠ "a", no prefix match' },
          { idx: 3, val: 0, substr: '', why: '"x" ≠ "a", no prefix match' },
          { idx: 4, val: 3, substr: 'aab', why: '"aab" matches prefix "aab"!' },
          { idx: 5, val: 1, substr: 'a', why: '"a" matches prefix "a"' },
          { idx: 6, val: 0, substr: '', why: '"b" ≠ "a", no prefix match' }
        ],
        patternMatch: {
          pattern: 'aab',
          text: 'xaabxaab',
          concat: 'aab$xaabxaab',
          note: 'Z[i] = len(pattern) indicates match! Z[4]=3 and Z[8]=3 → matches at positions 1 and 5 in text'
        }
      },
      code: `def z_function(s):
    """
    Compute Z-array for string s.
    Z[i] = length of longest substring starting at i
           that is also a prefix of s.
    Time: O(n)
    Space: O(n)
    """
    n = len(s)
    z = [0] * n
    z[0] = n  # Entire string is prefix of itself

    l, r = 0, 0  # [l, r] is the rightmost segment match

    for i in range(1, n):
        if i < r:
            # We're inside a known matching segment
            z[i] = min(r - i, z[i - l])

        # Try to extend the match
        while i + z[i] < n and s[z[i]] == s[i + z[i]]:
            z[i] += 1

        # Update the rightmost segment
        if i + z[i] > r:
            l, r = i, i + z[i]

    return z

def z_search(text, pattern):
    """
    Pattern matching using Z-algorithm.
    Concatenate pattern + '$' + text and find Z-values equal to len(pattern).
    """
    concat = pattern + '$' + text
    z = z_function(concat)
    m = len(pattern)
    result = []

    for i in range(m + 1, len(concat)):
        if z[i] == m:
            result.append(i - m - 1)

    return result

# Example
text = "ABABDABACDABABCABAB"
pattern = "ABAB"
print(f"Pattern found at indices: {z_search(text, pattern)}")

# Visualize Z-array
s = "aabxaab"
print(f"Z-array for '{s}': {z_function(s)}")
# Output: Z-array for 'aabxaab': [7, 1, 0, 0, 3, 1, 0]`
    },
    {
      id: 4,
      name: 'Boyer-Moore Algorithm',
      icon: '🏃',
      color: '#8b5cf6',
      difficulty: 'Hard',
      timeComplexity: 'O(n/m) best, O(nm) worst',
      spaceComplexity: 'O(m + alphabet)',
      description: 'Scans pattern from right to left. Uses bad character and good suffix rules for large jumps.',
      howItWorks: 'Compares pattern from right to left. When mismatch occurs, uses two heuristics: Bad Character Rule (shift based on mismatched character) and Good Suffix Rule (shift based on matched suffix) to skip as many positions as possible.',
      keyInsight: 'By scanning right-to-left, mismatches often allow skipping multiple characters. Can achieve sublinear time in practice!',
      useCases: ['Text search in editors', 'grep command', 'Large text processing'],
      visualization: {
        type: 'boyer-moore',
        text: 'HERE IS A SIMPLE EXAMPLE',
        pattern: 'EXAMPLE',
        badCharTable: { E: 6, X: 5, A: 4, M: 3, P: 2, L: 1 },
        steps: [
          { pos: 0, comparison: 'S vs E', action: 'Mismatch! S not in pattern → shift by 7', shift: 7 },
          { pos: 7, comparison: 'I vs E', action: 'Mismatch! I not in pattern → shift by 7', shift: 7 },
          { pos: 14, comparison: 'E vs E', action: 'Match! Continue right-to-left...', shift: 0 },
          { pos: 14, comparison: 'L vs L', action: 'Match! Continue...', shift: 0 },
          { pos: 14, comparison: 'P vs P', action: 'Match! All chars match → Found!', shift: 0 }
        ],
        explanation: 'Compare right-to-left. Bad char rule: if mismatch char not in pattern, skip entire pattern length!'
      },
      code: `def boyer_moore(text, pattern):
    """
    Boyer-Moore algorithm with bad character heuristic.
    Time: O(n/m) best case, O(nm) worst case
    Space: O(alphabet_size)
    """
    def bad_char_table(pattern):
        """Build bad character shift table."""
        table = {}
        m = len(pattern)
        for i in range(m - 1):
            table[pattern[i]] = m - 1 - i
        return table

    if not pattern or not text or len(pattern) > len(text):
        return []

    n, m = len(text), len(pattern)
    bad_char = bad_char_table(pattern)
    result = []

    i = 0  # Alignment of pattern with text
    while i <= n - m:
        j = m - 1  # Start from rightmost character

        # Compare from right to left
        while j >= 0 and pattern[j] == text[i + j]:
            j -= 1

        if j < 0:
            # Pattern found
            result.append(i)
            i += 1  # Move to next position
        else:
            # Shift based on bad character rule
            char = text[i + j]
            shift = bad_char.get(char, m)
            i += max(1, shift - (m - 1 - j))

    return result

# Example
text = "ABABDABACDABABCABAB"
pattern = "ABAB"
print(f"Pattern found at indices: {boyer_moore(text, pattern)}")
# Output: Pattern found at indices: [0, 10, 15]`
    },
    {
      id: 5,
      name: 'Aho-Corasick Algorithm',
      icon: '🌲',
      color: '#ec4899',
      difficulty: 'Hard',
      timeComplexity: 'O(n + m + z)',
      spaceComplexity: 'O(m * alphabet)',
      description: 'Builds automaton from multiple patterns. Finds all pattern occurrences in single pass.',
      howItWorks: 'Builds a trie from all patterns, then adds failure links (similar to KMP) to create a finite automaton. Processes text in a single pass, following goto and failure transitions to find all pattern matches.',
      keyInsight: 'Combines trie structure with KMP-style failure links. Process text once to find ALL patterns simultaneously.',
      useCases: ['Multiple pattern matching', 'Virus scanning', 'Network intrusion detection', 'Spam filtering'],
      visualization: {
        type: 'aho-corasick',
        patterns: ['he', 'she', 'his', 'hers'],
        text: 'ushers',
        trieNodes: [
          { level: 0, char: 'root', children: ['h', 's'] },
          { level: 1, char: 'h', children: ['e', 'i'], output: [] },
          { level: 1, char: 's', children: ['h'], output: [] },
          { level: 2, char: 'e', children: ['r'], output: ['he'], fail: 'root' },
          { level: 2, char: 'i', children: ['s'], output: [], fail: 'root' },
          { level: 2, char: 'h', children: ['e'], output: [], fail: 'h' },
          { level: 3, char: 'r', children: ['s'], output: [], fail: 'root' },
          { level: 3, char: 's', children: [], output: ['his'], fail: 's' },
          { level: 3, char: 'e', children: [], output: ['she', 'he'], fail: 'e' },
          { level: 4, char: 's', children: [], output: ['hers'], fail: 's' }
        ],
        scanSteps: [
          { pos: 0, char: 'u', state: 'root', output: [], note: 'u not in trie, stay at root' },
          { pos: 1, char: 's', state: 's', output: [], note: 'Move to state s' },
          { pos: 2, char: 'h', state: 'sh', output: [], note: 'Move to state sh' },
          { pos: 3, char: 'e', state: 'she', output: ['she', 'he'], note: 'Found "she" and "he"!' },
          { pos: 4, char: 'r', state: 'her', output: [], note: 'Move to state her' },
          { pos: 5, char: 's', state: 'hers', output: ['hers'], note: 'Found "hers"!' }
        ]
      },
      code: `from collections import deque, defaultdict

class AhoCorasick:
    """
    Aho-Corasick algorithm for multiple pattern matching.
    Time: O(n + m + z) where z is number of matches
    Space: O(m * alphabet_size)
    """
    def __init__(self):
        self.goto = [{}]  # Goto function
        self.fail = [0]   # Failure function
        self.output = [[]]  # Output function

    def add_pattern(self, pattern, pattern_id):
        """Add a pattern to the automaton."""
        state = 0
        for char in pattern:
            if char not in self.goto[state]:
                self.goto[state][char] = len(self.goto)
                self.goto.append({})
                self.fail.append(0)
                self.output.append([])
            state = self.goto[state][char]
        self.output[state].append((pattern_id, pattern))

    def build(self):
        """Build failure links using BFS."""
        queue = deque()

        # Initialize failure for depth 1
        for char, state in self.goto[0].items():
            queue.append(state)
            self.fail[state] = 0

        # BFS to build failure links
        while queue:
            current = queue.popleft()
            for char, next_state in self.goto[current].items():
                queue.append(next_state)

                # Find failure state
                failure = self.fail[current]
                while failure and char not in self.goto[failure]:
                    failure = self.fail[failure]

                self.fail[next_state] = self.goto[failure].get(char, 0)

                # Merge outputs
                self.output[next_state] += self.output[self.fail[next_state]]

    def search(self, text):
        """Search for all patterns in text."""
        state = 0
        results = []

        for i, char in enumerate(text):
            while state and char not in self.goto[state]:
                state = self.fail[state]
            state = self.goto[state].get(char, 0)

            for pattern_id, pattern in self.output[state]:
                results.append((i - len(pattern) + 1, pattern_id, pattern))

        return results

# Example usage
ac = AhoCorasick()
patterns = ["he", "she", "his", "hers"]
for i, p in enumerate(patterns):
    ac.add_pattern(p, i)
ac.build()

text = "ushers"
matches = ac.search(text)
print(f"Text: '{text}'")
for pos, pid, pattern in matches:
    print(f"  Found '{pattern}' at index {pos}")`
    },
    {
      id: 6,
      name: 'Suffix Array',
      icon: '📚',
      color: '#06b6d4',
      difficulty: 'Hard',
      timeComplexity: 'O(n log n) construction',
      spaceComplexity: 'O(n)',
      description: 'Sorted array of all suffixes. Enables efficient substring search via binary search.',
      howItWorks: 'Creates an array containing starting indices of all suffixes, sorted lexicographically. Once built, any substring can be found using binary search in O(m log n) time.',
      keyInsight: 'All substrings are prefixes of suffixes. Sorting suffixes enables binary search for any pattern.',
      useCases: ['Substring search', 'Longest repeated substring', 'Burrows-Wheeler Transform', 'Data compression'],
      visualization: {
        type: 'suffix-array',
        string: 'banana',
        allSuffixes: [
          { idx: 0, suffix: 'banana', rank: 4 },
          { idx: 1, suffix: 'anana', rank: 3 },
          { idx: 2, suffix: 'nana', rank: 6 },
          { idx: 3, suffix: 'ana', rank: 2 },
          { idx: 4, suffix: 'na', rank: 5 },
          { idx: 5, suffix: 'a', rank: 1 }
        ],
        sortedSuffixes: [
          { rank: 1, idx: 5, suffix: 'a' },
          { rank: 2, idx: 3, suffix: 'ana' },
          { rank: 3, idx: 1, suffix: 'anana' },
          { rank: 4, idx: 0, suffix: 'banana' },
          { rank: 5, idx: 4, suffix: 'na' },
          { rank: 6, idx: 2, suffix: 'nana' }
        ],
        sa: [5, 3, 1, 0, 4, 2],
        searchExample: {
          pattern: 'ana',
          steps: [
            'Binary search in SA for "ana"',
            'SA[1]=3 → suffix "ana" matches!',
            'SA[2]=1 → suffix "anana" starts with "ana"!',
            'Found at indices: 1, 3'
          ]
        }
      },
      code: `def build_suffix_array(s):
    """
    Build suffix array using sorting.
    Time: O(n log n) with proper implementation
    Space: O(n)

    Returns array of starting indices of sorted suffixes.
    """
    n = len(s)
    # Create list of (suffix, index) pairs
    suffixes = [(s[i:], i) for i in range(n)]
    # Sort by suffix
    suffixes.sort(key=lambda x: x[0])
    # Return just the indices
    return [idx for _, idx in suffixes]

def search_suffix_array(text, pattern, sa):
    """
    Binary search in suffix array.
    Time: O(m log n) where m = len(pattern)
    """
    n = len(text)
    m = len(pattern)

    # Find leftmost occurrence
    left, right = 0, n
    while left < right:
        mid = (left + right) // 2
        suffix = text[sa[mid]:sa[mid] + m]
        if suffix < pattern:
            left = mid + 1
        else:
            right = mid
    first = left

    # Find rightmost occurrence
    right = n
    while left < right:
        mid = (left + right) // 2
        suffix = text[sa[mid]:sa[mid] + m]
        if suffix <= pattern:
            left = mid + 1
        else:
            right = mid
    last = left

    return [sa[i] for i in range(first, last)]

# Example
text = "banana"
sa = build_suffix_array(text)
print(f"Text: '{text}'")
print(f"Suffix Array: {sa}")
print("Sorted suffixes:")
for i, idx in enumerate(sa):
    print(f"  SA[{i}] = {idx}: '{text[idx:]}'")

# Search for pattern
pattern = "ana"
positions = search_suffix_array(text, pattern, sa)
print(f"\\nPattern '{pattern}' found at: {positions}")`
    },
    {
      id: 7,
      name: 'Longest Common Prefix (LCP) Array',
      icon: '🔗',
      color: '#22c55e',
      difficulty: 'Medium',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      description: 'LCP[i] stores length of longest common prefix between SA[i] and SA[i-1]. Used with suffix arrays.',
      howItWorks: 'Uses Kasai\'s algorithm: exploits the fact that LCP values can only decrease by at most 1 when moving to the next suffix in the original string order. This allows O(n) construction.',
      keyInsight: 'LCP + Suffix Array = Powerful combo. Max LCP value gives longest repeated substring.',
      useCases: ['Longest repeated substring', 'Number of distinct substrings', 'String comparison'],
      visualization: {
        type: 'lcp',
        string: 'banana',
        sa: [5, 3, 1, 0, 4, 2],
        lcp: [0, 1, 3, 0, 0, 2],
        suffixPairs: [
          { i: 0, suffix: 'a', prevSuffix: '-', lcp: 0, common: '', why: 'First element, no previous' },
          { i: 1, suffix: 'ana', prevSuffix: 'a', lcp: 1, common: 'a', why: '"a" is common prefix' },
          { i: 2, suffix: 'anana', prevSuffix: 'ana', lcp: 3, common: 'ana', why: '"ana" is common prefix!' },
          { i: 3, suffix: 'banana', prevSuffix: 'anana', lcp: 0, common: '', why: '"b" ≠ "a", no common' },
          { i: 4, suffix: 'na', prevSuffix: 'banana', lcp: 0, common: '', why: '"n" ≠ "b", no common' },
          { i: 5, suffix: 'nana', prevSuffix: 'na', lcp: 2, common: 'na', why: '"na" is common prefix' }
        ],
        application: {
          title: 'Finding Longest Repeated Substring',
          steps: [
            'Max LCP = 3 at index 2',
            'Suffixes: "ana" and "anana"',
            'Common prefix: "ana"',
            'Answer: "ana" appears twice!'
          ]
        }
      },
      code: `def build_lcp_array(text, sa):
    """
    Build LCP array using Kasai's algorithm.
    LCP[i] = length of longest common prefix between
             suffix at SA[i] and suffix at SA[i-1]
    Time: O(n)
    Space: O(n)
    """
    n = len(text)
    rank = [0] * n  # Inverse of suffix array
    lcp = [0] * n

    # Build rank array
    for i, suffix_idx in enumerate(sa):
        rank[suffix_idx] = i

    # Kasai's algorithm
    k = 0  # Current LCP length
    for i in range(n):
        if rank[i] == 0:
            k = 0
            continue

        j = sa[rank[i] - 1]  # Previous suffix in sorted order

        # Extend LCP
        while i + k < n and j + k < n and text[i + k] == text[j + k]:
            k += 1

        lcp[rank[i]] = k

        # Key insight: LCP can decrease by at most 1
        if k > 0:
            k -= 1

    return lcp

def longest_repeated_substring(text):
    """Find longest repeated substring using SA + LCP."""
    if not text:
        return ""

    sa = build_suffix_array(text)
    lcp = build_lcp_array(text, sa)

    max_lcp = max(lcp)
    if max_lcp == 0:
        return ""

    idx = lcp.index(max_lcp)
    return text[sa[idx]:sa[idx] + max_lcp]

# Example
text = "banana"
sa = build_suffix_array(text)
lcp = build_lcp_array(text, sa)

print(f"Text: '{text}'")
print(f"SA:  {sa}")
print(f"LCP: {lcp}")
print(f"\\nLongest repeated substring: '{longest_repeated_substring(text)}'")`
    },
    {
      id: 8,
      name: 'Manacher\'s Algorithm',
      icon: '🪞',
      color: '#f97316',
      difficulty: 'Hard',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      description: 'Finds all palindromic substrings in linear time. Handles both odd and even length palindromes.',
      howItWorks: 'Transforms string by inserting special characters between each character (handles even-length palindromes). Maintains the rightmost palindrome boundary and uses symmetry to avoid redundant comparisons.',
      keyInsight: 'Transform "abc" → "^#a#b#c#$". Use symmetry: if we know palindrome at mirror position, we can reuse that information.',
      useCases: ['Longest palindromic substring', 'Count palindromes', 'DNA analysis'],
      visualization: {
        type: 'manacher',
        original: 'babad',
        transformed: '^#b#a#b#a#d#$',
        pArray: [0, 0, 1, 0, 3, 0, 3, 0, 1, 0, 0],
        pExplanation: [
          { idx: 2, char: 'b', p: 1, palindrome: 'b', note: 'Single char palindrome' },
          { idx: 4, char: 'a', p: 3, palindrome: 'bab', note: 'Radius 3 → "bab" centered here!' },
          { idx: 6, char: 'b', p: 3, palindrome: 'aba', note: 'Radius 3 → "aba" centered here!' },
          { idx: 8, char: 'a', p: 1, palindrome: 'a', note: 'Single char palindrome' }
        ],
        steps: [
          { step: 1, note: 'Transform: "babad" → "^#b#a#b#a#d#$" (handles even-length palindromes)' },
          { step: 2, note: 'For each position, expand while chars match' },
          { step: 3, note: 'Use symmetry: if inside known palindrome, reuse mirror value' },
          { step: 4, note: 'Max P[i] = 3 at positions 4,6 → longest palindrome has length 3' }
        ],
        result: 'Longest palindrome: "bab" or "aba" (both length 3)'
      },
      code: `def manachers(s):
    """
    Manacher's algorithm for longest palindromic substring.
    Time: O(n)
    Space: O(n)
    """
    if not s:
        return ""

    # Transform: "abc" -> "^#a#b#c#$"
    # This handles both odd and even length palindromes
    t = '^#' + '#'.join(s) + '#$'
    n = len(t)
    p = [0] * n  # p[i] = radius of palindrome centered at i

    center = right = 0  # Center and right edge of rightmost palindrome

    for i in range(1, n - 1):
        if i < right:
            mirror = 2 * center - i
            p[i] = min(right - i, p[mirror])

        # Expand palindrome centered at i
        while t[i + p[i] + 1] == t[i - p[i] - 1]:
            p[i] += 1

        # Update center and right edge
        if i + p[i] > right:
            center, right = i, i + p[i]

    # Find the maximum
    max_len, center_idx = max((p[i], i) for i in range(1, n - 1))

    # Extract palindrome from original string
    start = (center_idx - max_len) // 2
    return s[start:start + max_len]

def count_palindromes(s):
    """Count all palindromic substrings."""
    if not s:
        return 0

    t = '^#' + '#'.join(s) + '#$'
    n = len(t)
    p = [0] * n
    center = right = 0

    for i in range(1, n - 1):
        if i < right:
            p[i] = min(right - i, p[2 * center - i])
        while t[i + p[i] + 1] == t[i - p[i] - 1]:
            p[i] += 1
        if i + p[i] > right:
            center, right = i, i + p[i]

    # Each p[i] contributes (p[i] + 1) // 2 palindromes
    return sum((r + 1) // 2 for r in p)

# Examples
s = "babad"
print(f"String: '{s}'")
print(f"Longest palindrome: '{manachers(s)}'")
print(f"Total palindromic substrings: {count_palindromes(s)}")`
    },
    {
      id: 9,
      name: 'Rolling Hash',
      icon: '🎲',
      color: '#a855f7',
      difficulty: 'Medium',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      description: 'Polynomial hash that can be updated in O(1) when sliding window. Foundation for Rabin-Karp.',
      howItWorks: 'Uses polynomial hashing: hash = s[0]*b^(n-1) + s[1]*b^(n-2) + ... + s[n-1]. When sliding window, subtract leftmost term, multiply by base, add new character. All in O(1).',
      keyInsight: 'hash(new) = (hash(old) - old_char * b^(m-1)) * b + new_char. Enables O(1) window sliding.',
      useCases: ['Substring comparison', 'Duplicate detection', 'String matching'],
      visualization: {
        type: 'rolling-hash',
        text: 'ABCDEF',
        windowSize: 3,
        base: 31,
        mod: 1000000007,
        steps: [
          { window: 'ABC', hash: 'A×31² + B×31 + C = 30814', removed: null, added: null },
          { window: 'BCD', hash: '(30814 - A×31²)×31 + D = 31845', removed: 'A', added: 'D' },
          { window: 'CDE', hash: '(31845 - B×31²)×31 + E = 32876', removed: 'B', added: 'E' },
          { window: 'DEF', hash: '(32876 - C×31²)×31 + F = 33907', removed: 'C', added: 'F' }
        ],
        formula: {
          initial: 'hash = Σ(char[i] × base^(n-1-i))',
          rolling: 'new_hash = (old_hash - leftChar × base^(n-1)) × base + rightChar',
          why: 'Update hash in O(1) instead of recomputing O(n)!'
        }
      },
      code: `class RollingHash:
    """
    Rolling hash for efficient substring hashing.
    Uses polynomial hashing: hash = s[0]*b^(n-1) + s[1]*b^(n-2) + ... + s[n-1]
    """
    def __init__(self, s, window_size, base=31, mod=10**9 + 7):
        self.s = s
        self.n = len(s)
        self.window = window_size
        self.base = base
        self.mod = mod

        # Precompute base^window for rolling
        self.base_power = pow(base, window_size - 1, mod)

        # Compute initial hash
        self.hash = 0
        for i in range(min(window_size, self.n)):
            self.hash = (self.hash * base + ord(s[i])) % mod

        self.left = 0  # Left index of window

    def slide(self):
        """Slide window one position to the right. Returns new hash."""
        if self.left + self.window >= self.n:
            return None

        # Remove leftmost character
        old_char = ord(self.s[self.left])
        self.hash = (self.hash - old_char * self.base_power) % self.mod

        # Add new rightmost character
        new_char = ord(self.s[self.left + self.window])
        self.hash = (self.hash * self.base + new_char) % self.mod

        self.left += 1
        return self.hash

    def get_hash(self):
        return self.hash

def find_duplicate_substrings(s, length):
    """Find all duplicate substrings of given length using rolling hash."""
    if length > len(s):
        return []

    seen = {}
    rh = RollingHash(s, length)

    # Check first window
    h = rh.get_hash()
    seen[h] = [0]

    duplicates = set()

    # Slide through string
    for i in range(1, len(s) - length + 1):
        h = rh.slide()
        if h is None:
            break

        if h in seen:
            # Verify (hash collision possible)
            substring = s[i:i + length]
            for prev_idx in seen[h]:
                if s[prev_idx:prev_idx + length] == substring:
                    duplicates.add(substring)
            seen[h].append(i)
        else:
            seen[h] = [i]

    return list(duplicates)

# Example
s = "banana"
for length in range(1, len(s)):
    dups = find_duplicate_substrings(s, length)
    if dups:
        print(f"Length {length} duplicates: {dups}")`
    },
    {
      id: 10,
      name: 'Trie (Prefix Tree)',
      icon: '🌳',
      color: '#14b8a6',
      difficulty: 'Medium',
      timeComplexity: 'O(m) per operation',
      spaceComplexity: 'O(alphabet * total_chars)',
      description: 'Tree structure for efficient prefix operations. Each node represents a character.',
      howItWorks: 'Each node contains links to child nodes (one per character). Words are stored by following paths from root to leaf. Searching, inserting, and prefix checking all take O(word_length) time.',
      keyInsight: 'All words with same prefix share the same path from root. Perfect for autocomplete and prefix-based operations.',
      useCases: ['Autocomplete', 'Spell checker', 'IP routing', 'Word games'],
      visualization: {
        type: 'trie',
        words: ['app', 'apple', 'apply', 'apt', 'bat'],
        operations: [
          { op: 'insert', word: 'app', steps: ['root→a (create)', 'a→p (create)', 'p→p (create, mark END)'] },
          { op: 'insert', word: 'apple', steps: ['root→a (exists)', 'a→p (exists)', 'p→p (exists)', 'p→l (create)', 'l→e (create, mark END)'] },
          { op: 'insert', word: 'apply', steps: ['root→a (exists)', '...→p→l (exists)', 'l→y (create, mark END)'] },
          { op: 'search', word: 'app', steps: ['root→a ✓', 'a→p ✓', 'p→p ✓ END', 'Found!'] },
          { op: 'search', word: 'ap', steps: ['root→a ✓', 'a→p ✓ (no END)', 'Not found (prefix only)'] },
          { op: 'startsWith', word: 'app', steps: ['root→a ✓', 'a→p ✓', 'p→p ✓', 'Prefix exists!'] }
        ],
        structure: {
          root: { children: ['a', 'b'], isEnd: false },
          a: { children: ['p'], isEnd: false },
          ap: { children: ['p', 't'], isEnd: false },
          app: { children: ['l'], isEnd: true, words: ['app'] },
          appl: { children: ['e', 'y'], isEnd: false },
          apple: { children: [], isEnd: true, words: ['apple'] },
          apply: { children: [], isEnd: true, words: ['apply'] },
          apt: { children: [], isEnd: true, words: ['apt'] },
          b: { children: ['a'], isEnd: false },
          ba: { children: ['t'], isEnd: false },
          bat: { children: [], isEnd: true, words: ['bat'] }
        }
      },
      code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False
        self.count = 0  # Words with this prefix

class Trie:
    """
    Prefix tree for efficient string operations.
    Time: O(m) for insert, search, prefix operations
    Space: O(alphabet_size * total_characters)
    """
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        """Insert a word into the trie."""
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
            node.count += 1
        node.is_end = True

    def search(self, word):
        """Check if word exists in trie."""
        node = self._find_node(word)
        return node is not None and node.is_end

    def starts_with(self, prefix):
        """Check if any word starts with prefix."""
        return self._find_node(prefix) is not None

    def count_prefix(self, prefix):
        """Count words with given prefix."""
        node = self._find_node(prefix)
        return node.count if node else 0

    def _find_node(self, prefix):
        """Find node corresponding to prefix."""
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node

    def autocomplete(self, prefix, limit=10):
        """Get words starting with prefix."""
        node = self._find_node(prefix)
        if not node:
            return []

        results = []
        self._dfs(node, prefix, results, limit)
        return results

    def _dfs(self, node, current, results, limit):
        if len(results) >= limit:
            return
        if node.is_end:
            results.append(current)
        for char, child in sorted(node.children.items()):
            self._dfs(child, current + char, results, limit)

# Example
trie = Trie()
words = ["apple", "app", "application", "apply", "banana", "band"]
for word in words:
    trie.insert(word)

print(f"Search 'app': {trie.search('app')}")
print(f"Search 'apt': {trie.search('apt')}")
print(f"Starts with 'app': {trie.starts_with('app')}")
print(f"Count prefix 'app': {trie.count_prefix('app')}")
print(f"Autocomplete 'app': {trie.autocomplete('app')}")`
    }
  ]

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '#10b981'
      case 'Medium': return '#f59e0b'
      case 'Hard': return '#ef4444'
      default: return '#6b7280'
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={onBack}
              style={{
                background: '#2563eb',
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
              onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
            >
              ← Back
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🔤 String Algorithms
            </h1>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} />

        <p style={{
          fontSize: '1.2rem',
          color: '#d1d5db',
          textAlign: 'center',
          marginBottom: '2rem',
          lineHeight: '1.8'
        }}>
          Master essential string pattern matching and manipulation algorithms with Python implementations.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <div style={{ padding: '0.75rem 1.5rem', backgroundColor: '#1e3a8a', borderRadius: '8px', border: '1px solid #3b82f6' }}>
            <span style={{ fontWeight: '700', color: '#60a5fa' }}>{algorithms.length}</span>
            <span style={{ color: '#93c5fd', marginLeft: '0.5rem' }}>Algorithms</span>
          </div>
          <div style={{ padding: '0.75rem 1.5rem', backgroundColor: '#064e3b', borderRadius: '8px', border: '1px solid #10b981' }}>
            <span style={{ fontWeight: '700', color: '#34d399' }}>O(n)</span>
            <span style={{ color: '#6ee7b7', marginLeft: '0.5rem' }}>Linear Time Solutions</span>
          </div>
        </div>

        {/* Algorithm Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {algorithms.map((algo) => (
            <div
              key={algo.id}
              style={{
                backgroundColor: '#1f2937',
                borderRadius: '12px',
                border: `2px solid ${expandedAlgorithm === algo.id ? algo.color : '#374151'}`,
                boxShadow: expandedAlgorithm === algo.id ? `0 0 0 3px ${algo.color}40` : '0 4px 12px rgba(0,0,0,0.3)',
                overflow: 'hidden',
                transition: 'all 0.2s'
              }}
            >
              {/* Header */}
              <button
                onClick={() => setExpandedAlgorithm(expandedAlgorithm === algo.id ? null : algo.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.25rem 1.5rem',
                  backgroundColor: expandedAlgorithm === algo.id ? `${algo.color}20` : '#1f2937',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (expandedAlgorithm !== algo.id) {
                    e.currentTarget.style.backgroundColor = '#374151'
                  }
                }}
                onMouseLeave={(e) => {
                  if (expandedAlgorithm !== algo.id) {
                    e.currentTarget.style.backgroundColor = '#1f2937'
                  }
                }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                <div style={{
                  fontSize: '2rem',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: `${algo.color}30`,
                  borderRadius: '10px'
                }}>
                  {algo.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'white', margin: 0 }}>
                      {algo.name}
                    </h3>
                    <span style={{
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      backgroundColor: getDifficultyColor(algo.difficulty) + '30',
                      color: getDifficultyColor(algo.difficulty)
                    }}>
                      {algo.difficulty}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#9ca3af', margin: 0, marginBottom: '0.5rem' }}>
                    {algo.description}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: '500' }}>Time:</span>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: '#34d399',
                        backgroundColor: '#064e3b',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px'
                      }}>{algo.timeComplexity}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: '500' }}>Space:</span>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: '#a78bfa',
                        backgroundColor: '#4c1d95',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px'
                      }}>{algo.spaceComplexity}</span>
                    </div>
                  </div>
                </div>
              </div>
              <span style={{ fontSize: '1.25rem', color: '#9ca3af', marginLeft: '1rem' }}>
                {expandedAlgorithm === algo.id ? '▼' : '▶'}
              </span>
            </button>

            {/* Expanded Content */}
            {expandedAlgorithm === algo.id && (
              <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
                {/* How It Works */}
                <div style={{
                  marginBottom: '1.5rem',
                  padding: '1.25rem',
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                  borderRadius: '12px',
                  border: '1px solid #3b82f6'
                }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#93c5fd', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.1rem' }}>🔍</span> How It Works
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: '#dbeafe', lineHeight: '1.7', margin: 0 }}>
                    {algo.howItWorks}
                  </p>
                  <div style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1rem',
                    backgroundColor: '#78350f',
                    borderRadius: '8px',
                    border: '1px solid #d97706',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem'
                  }}>
                    <span style={{ fontSize: '1rem' }}>💡</span>
                    <div>
                      <span style={{ fontWeight: '700', color: '#fcd34d', fontSize: '0.8rem' }}>Key Insight: </span>
                      <span style={{ color: '#fef3c7', fontSize: '0.85rem' }}>{algo.keyInsight}</span>
                    </div>
                  </div>
                </div>

                {/* Visual Diagram */}
                <div style={{
                  marginBottom: '1.5rem',
                  padding: '1.25rem',
                  backgroundColor: '#111827',
                  borderRadius: '12px',
                  border: '2px solid #374151'
                }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.1rem' }}>📊</span> Visual Example
                  </h4>

                  {/* Rabin-Karp Visualization */}
                  {algo.visualization.type === 'rabin-karp' && (
                    <div>
                      {/* Text and Pattern Display */}
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
                          Text: <span style={{ fontFamily: 'monospace', fontWeight: '700', color: '#d1d5db' }}>"{algo.visualization.text}"</span>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
                          Pattern: <span style={{ fontFamily: 'monospace', fontWeight: '700', color: algo.color }}>"{algo.visualization.pattern}"</span>
                          <span style={{ marginLeft: '1rem', backgroundColor: '#1e3a8a', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', color: '#93c5fd' }}>
                            hash = {algo.visualization.patternHash}
                          </span>
                        </div>
                      </div>

                      {/* Step by step visualization */}
                      <div style={{ backgroundColor: '#1f2937', borderRadius: '8px', border: '1px solid #374151', overflow: 'hidden' }}>
                        <div style={{ padding: '0.5rem 1rem', backgroundColor: '#374151', borderBottom: '1px solid #4b5563', fontSize: '0.8rem', fontWeight: '600', color: '#d1d5db' }}>
                          Sliding Window Steps
                        </div>
                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                          {algo.visualization.steps.map((step, idx) => (
                            <div key={idx} style={{
                              display: 'flex',
                              alignItems: 'center',
                              padding: '0.5rem 1rem',
                              borderBottom: '1px solid #374151',
                              backgroundColor: step.match ? '#064e3b' : '#1f2937',
                              gap: '1rem',
                              fontSize: '0.85rem'
                            }}>
                              <span style={{
                                width: '24px', height: '24px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                backgroundColor: step.match ? '#22c55e' : '#4b5563',
                                color: 'white',
                                borderRadius: '50%', fontSize: '0.7rem', fontWeight: '700'
                              }}>{idx + 1}</span>
                              <span style={{ fontFamily: 'monospace', fontWeight: '600', minWidth: '50px', color: '#9ca3af' }}>[{step.pos}]</span>
                              <span style={{
                                fontFamily: 'monospace',
                                padding: '0.2rem 0.5rem',
                                backgroundColor: step.match ? '#166534' : '#374151',
                                color: step.match ? '#86efac' : '#d1d5db',
                                borderRadius: '4px',
                                fontWeight: '600'
                              }}>"{step.window}"</span>
                              <span style={{ color: '#9ca3af' }}>hash={step.hash}</span>
                              <span style={{
                                marginLeft: 'auto',
                                fontSize: '0.8rem',
                                color: step.match ? '#4ade80' : '#9ca3af',
                                fontWeight: step.match ? '600' : '400'
                              }}>{step.action}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Rolling hash formula */}
                      <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#1e3a8a', borderRadius: '8px', fontSize: '0.8rem', border: '1px solid #3b82f6' }}>
                        <strong style={{ color: '#93c5fd' }}>Rolling Hash:</strong>
                        <span style={{ color: '#dbeafe', marginLeft: '0.5rem', fontFamily: 'monospace' }}>
                          new_hash = (old_hash - left_char × base²) × base + new_char
                        </span>
                      </div>
                    </div>
                  )}

                  {/* KMP Visualization */}
                  {algo.visualization.type === 'kmp' && (
                    <div>
                      {/* LPS Array Construction */}
                      <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.75rem' }}>
                          Step 1: Build LPS Array for pattern "{algo.visualization.pattern}"
                        </div>
                        <div style={{ display: 'flex', gap: '2px', marginBottom: '0.25rem' }}>
                          {algo.visualization.pattern.split('').map((char, idx) => (
                            <div key={idx} style={{
                              width: '60px', height: '36px',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              backgroundColor: algo.color, color: 'white',
                              fontWeight: '700', fontFamily: 'monospace', borderRadius: '4px 4px 0 0'
                            }}>{char}</div>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: '2px', marginBottom: '0.5rem' }}>
                          {algo.visualization.lps.map((val, idx) => (
                            <div key={idx} style={{
                              width: '60px', height: '32px',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              backgroundColor: val > 0 ? '#064e3b' : '#374151',
                              border: val > 0 ? '2px solid #22c55e' : '1px solid #4b5563',
                              color: val > 0 ? '#86efac' : '#9ca3af',
                              fontWeight: '700', fontFamily: 'monospace', borderRadius: '0 0 4px 4px'
                            }}>{val}</div>
                          ))}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '1rem' }}>Index: {algo.visualization.lps.map((_, i) => i).join('   ')}</div>

                        {/* LPS Explanation */}
                        <div style={{ backgroundColor: '#1f2937', borderRadius: '8px', border: '1px solid #374151', overflow: 'hidden' }}>
                          <div style={{ padding: '0.5rem 1rem', backgroundColor: '#374151', borderBottom: '1px solid #4b5563', fontSize: '0.8rem', fontWeight: '600', color: '#d1d5db' }}>
                            LPS[i] = Length of longest proper prefix that is also a suffix
                          </div>
                          {algo.visualization.lpsExplanation.map((item, idx) => (
                            <div key={idx} style={{
                              display: 'flex', alignItems: 'center', gap: '1rem',
                              padding: '0.4rem 1rem', borderBottom: '1px solid #374151', fontSize: '0.8rem'
                            }}>
                              <span style={{ fontFamily: 'monospace', fontWeight: '700', color: algo.color }}>{item.char}</span>
                              <span style={{
                                backgroundColor: item.val > 0 ? '#064e3b' : '#374151',
                                color: item.val > 0 ? '#86efac' : '#9ca3af',
                                padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '600'
                              }}>LPS={item.val}</span>
                              <span style={{ color: '#9ca3af' }}>{item.why}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Matching Process */}
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.75rem' }}>
                          Step 2: Search in text "{algo.visualization.text.substring(0, 15)}..."
                        </div>
                        <div style={{ backgroundColor: '#1f2937', borderRadius: '8px', border: '1px solid #374151', overflow: 'hidden' }}>
                          {algo.visualization.steps.map((step, idx) => (
                            <div key={idx} style={{
                              display: 'flex', alignItems: 'center', gap: '0.75rem',
                              padding: '0.5rem 1rem', borderBottom: '1px solid #374151',
                              backgroundColor: step.status === 'found' ? '#064e3b' : step.status === 'mismatch' ? '#7f1d1d' : '#1f2937',
                              fontSize: '0.8rem'
                            }}>
                              <span style={{
                                padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace', fontWeight: '600',
                                backgroundColor: step.status === 'match' ? '#1e3a8a' : step.status === 'mismatch' ? '#991b1b' : '#064e3b',
                                color: step.status === 'match' ? '#93c5fd' : step.status === 'mismatch' ? '#fca5a5' : '#86efac'
                              }}>
                                text[{step.textPos}] vs pattern[{step.patternPos}]
                              </span>
                              <span style={{ color: step.status === 'found' ? '#4ade80' : '#9ca3af', fontWeight: step.status === 'found' ? '600' : '400' }}>
                                {step.note}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Z-Algorithm Visualization */}
                  {algo.visualization.type === 'z-algorithm' && (
                    <div>
                      {/* String and Z-Array Display */}
                      <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.75rem' }}>
                          Computing Z-Array for "{algo.visualization.string}"
                        </div>
                        <div style={{ display: 'flex', gap: '2px', marginBottom: '0.25rem' }}>
                          {algo.visualization.string.split('').map((char, idx) => (
                            <div key={idx} style={{
                              width: '44px', height: '36px',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              backgroundColor: idx === 0 ? '#374151' : algo.color, color: 'white',
                              fontWeight: '700', fontFamily: 'monospace', borderRadius: '4px 4px 0 0'
                            }}>{char}</div>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          {algo.visualization.zArray.map((val, idx) => (
                            <div key={idx} style={{
                              width: '44px', height: '32px',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              backgroundColor: val > 0 ? '#78350f' : '#374151',
                              border: val > 0 ? '2px solid #f59e0b' : '1px solid #4b5563',
                              color: val > 0 ? '#fcd34d' : '#9ca3af',
                              fontWeight: '700', fontFamily: 'monospace', borderRadius: '0 0 4px 4px'
                            }}>{val}</div>
                          ))}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem' }}>
                          Z[i] = length of longest substring starting at i that matches a prefix
                        </div>
                      </div>

                      {/* Z-Array Explanation Table */}
                      <div style={{ backgroundColor: '#1f2937', borderRadius: '8px', border: '1px solid #374151', overflow: 'hidden', marginBottom: '1rem' }}>
                        <div style={{ padding: '0.5rem 1rem', backgroundColor: '#374151', borderBottom: '1px solid #4b5563', fontSize: '0.8rem', fontWeight: '600', color: '#d1d5db' }}>
                          Z-Value Breakdown
                        </div>
                        {algo.visualization.zExplanation.map((item, idx) => (
                          <div key={idx} style={{
                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                            padding: '0.4rem 1rem', borderBottom: '1px solid #374151', fontSize: '0.8rem',
                            backgroundColor: item.val >= 3 ? '#78350f' : '#1f2937'
                          }}>
                            <span style={{ fontFamily: 'monospace', fontWeight: '600', color: '#9ca3af' }}>Z[{item.idx}]</span>
                            <span style={{
                              backgroundColor: item.val > 0 ? '#78350f' : '#374151',
                              padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '700', color: item.val > 0 ? '#fcd34d' : '#9ca3af'
                            }}>{item.val}</span>
                            {item.substr && <span style={{ fontFamily: 'monospace', color: algo.color, fontWeight: '600' }}>"{item.substr}"</span>}
                            <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{item.why}</span>
                          </div>
                        ))}
                      </div>

                      {/* Pattern Matching Application */}
                      <div style={{ padding: '0.75rem', backgroundColor: '#1e3a8a', borderRadius: '8px', fontSize: '0.8rem' }}>
                        <div style={{ fontWeight: '600', color: '#93c5fd', marginBottom: '0.5rem' }}>Pattern Matching with Z-Algorithm:</div>
                        <div style={{ color: '#c4b5fd' }}>
                          <div>1. Concatenate: <code style={{ backgroundColor: '#dbeafe', padding: '0.1rem 0.3rem', borderRadius: '2px' }}>{algo.visualization.patternMatch.concat}</code></div>
                          <div style={{ marginTop: '0.25rem' }}>2. {algo.visualization.patternMatch.note}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Boyer-Moore Visualization */}
                  {algo.visualization.type === 'boyer-moore' && (
                    <div>
                      {/* Bad Character Table */}
                      <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.75rem' }}>
                          Bad Character Table for "{algo.visualization.pattern}"
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                          {Object.entries(algo.visualization.badCharTable).map(([char, shift]) => (
                            <div key={char} style={{
                              padding: '0.4rem 0.75rem',
                              backgroundColor: '#4c1d95',
                              border: '1px solid #c4b5fd',
                              borderRadius: '6px',
                              fontFamily: 'monospace',
                              fontSize: '0.8rem'
                            }}>
                              <span style={{ fontWeight: '700', color: algo.color }}>{char}</span>
                              <span style={{ color: '#9ca3af' }}> → shift </span>
                              <span style={{ fontWeight: '700', color: '#7c3aed' }}>{shift}</span>
                            </div>
                          ))}
                          <div style={{
                            padding: '0.4rem 0.75rem',
                            backgroundColor: '#fee2e2',
                            border: '1px solid #fca5a5',
                            borderRadius: '6px',
                            fontFamily: 'monospace',
                            fontSize: '0.8rem'
                          }}>
                            <span style={{ fontWeight: '700', color: '#dc2626' }}>*</span>
                            <span style={{ color: '#9ca3af' }}> → shift </span>
                            <span style={{ fontWeight: '700', color: '#dc2626' }}>{algo.visualization.pattern.length}</span>
                            <span style={{ color: '#9ca3af', fontSize: '0.7rem' }}> (not in pattern)</span>
                          </div>
                        </div>
                      </div>

                      {/* Step by Step Matching */}
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.75rem' }}>
                          Searching in "{algo.visualization.text}"
                        </div>
                        <div style={{ backgroundColor: '#1f2937', borderRadius: '8px', border: '1px solid #374151', overflow: 'hidden' }}>
                          <div style={{ padding: '0.5rem 1rem', backgroundColor: '#374151', borderBottom: '1px solid #4b5563', color: '#d1d5db', fontSize: '0.8rem', fontWeight: '600' }}>
                            Right-to-Left Comparison Steps
                          </div>
                          {algo.visualization.steps.map((step, idx) => (
                            <div key={idx} style={{
                              display: 'flex', alignItems: 'center', gap: '0.75rem',
                              padding: '0.5rem 1rem', borderBottom: '1px solid #374151',
                              backgroundColor: step.shift === 0 && step.comparison.includes('All') ? '#064e3b' : '#1f2937',
                              fontSize: '0.8rem'
                            }}>
                              <span style={{
                                padding: '0.15rem 0.4rem', borderRadius: '4px', fontFamily: 'monospace',
                                backgroundColor: '#4b5563', fontWeight: '600', fontSize: '0.75rem'
                              }}>pos={step.pos}</span>
                              <span style={{ fontFamily: 'monospace', color: '#9ca3af' }}>{step.comparison}</span>
                              <span style={{
                                color: step.shift > 0 ? '#dc2626' : '#15803d',
                                fontWeight: '500'
                              }}>{step.action}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={{ padding: '0.75rem', backgroundColor: '#4c1d95', borderRadius: '8px', fontSize: '0.8rem', color: '#c4b5fd' }}>
                        <strong>Key Advantage:</strong> {algo.visualization.explanation}
                      </div>
                    </div>
                  )}

                  {/* Aho-Corasick Visualization */}
                  {algo.visualization.type === 'aho-corasick' && (
                    <div>
                      {/* Patterns */}
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.5rem' }}>Patterns to search:</div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {algo.visualization.patterns.map((p, idx) => (
                            <span key={idx} style={{
                              padding: '0.35rem 0.75rem',
                              backgroundColor: algo.color,
                              color: 'white',
                              borderRadius: '6px',
                              fontFamily: 'monospace',
                              fontWeight: '600',
                              fontSize: '0.85rem'
                            }}>"{p}"</span>
                          ))}
                        </div>
                      </div>

                      {/* Automaton Scan Steps */}
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.75rem' }}>
                          Single-pass scan of "{algo.visualization.text}"
                        </div>
                        <div style={{ backgroundColor: '#1f2937', borderRadius: '8px', border: '1px solid #374151', overflow: 'hidden' }}>
                          <div style={{ padding: '0.5rem 1rem', backgroundColor: '#374151', borderBottom: '1px solid #4b5563', color: '#d1d5db', fontSize: '0.8rem', fontWeight: '600' }}>
                            Automaton State Transitions
                          </div>
                          {algo.visualization.scanSteps.map((step, idx) => (
                            <div key={idx} style={{
                              display: 'flex', alignItems: 'center', gap: '0.75rem',
                              padding: '0.5rem 1rem', borderBottom: '1px solid #374151',
                              backgroundColor: step.output.length > 0 ? '#831843' : '#1f2937',
                              fontSize: '0.8rem'
                            }}>
                              <span style={{
                                width: '24px', height: '24px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                backgroundColor: step.output.length > 0 ? algo.color : '#e5e7eb',
                                color: step.output.length > 0 ? 'white' : '#9ca3af',
                                borderRadius: '50%', fontSize: '0.7rem', fontWeight: '700'
                              }}>{step.pos}</span>
                              <span style={{ fontFamily: 'monospace', fontWeight: '700', color: '#d1d5db' }}>'{step.char}'</span>
                              <span style={{ color: '#9ca3af' }}>→ state</span>
                              <span style={{
                                fontFamily: 'monospace',
                                padding: '0.15rem 0.4rem',
                                backgroundColor: '#374151',
                                borderRadius: '4px',
                                fontWeight: '600'
                              }}>{step.state}</span>
                              {step.output.length > 0 && (
                                <span style={{
                                  marginLeft: 'auto',
                                  padding: '0.2rem 0.5rem',
                                  backgroundColor: '#fce7f3',
                                  color: '#be185d',
                                  borderRadius: '4px',
                                  fontWeight: '600'
                                }}>Found: {step.output.map(o => `"${o}"`).join(', ')}</span>
                              )}
                              <span style={{ color: '#9ca3af', fontSize: '0.75rem', marginLeft: step.output.length > 0 ? '0' : 'auto' }}>{step.note}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={{ padding: '0.75rem', backgroundColor: '#831843', borderRadius: '8px', fontSize: '0.8rem', color: '#f9a8d4' }}>
                        <strong>Result:</strong> Found all patterns in a single O(n) scan! Patterns can overlap and all are detected.
                      </div>
                    </div>
                  )}

                  {/* Suffix Array Visualization */}
                  {algo.visualization.type === 'suffix-array' && (
                    <div>
                      {/* All Suffixes */}
                      <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.75rem' }}>
                          Step 1: Extract all suffixes of "{algo.visualization.string}"
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                          {algo.visualization.allSuffixes.map((item, idx) => (
                            <div key={idx} style={{
                              padding: '0.5rem 0.75rem',
                              backgroundColor: '#f8fafc',
                              border: '1px solid #e5e7eb',
                              borderRadius: '6px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}>
                              <span style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                                <span style={{ color: '#9ca3af' }}>[{item.idx}]</span>
                                <span style={{ fontWeight: '600', marginLeft: '0.5rem' }}>"{item.suffix}"</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sorted Suffixes */}
                      <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.75rem' }}>
                          Step 2: Sort suffixes lexicographically → SA = [{algo.visualization.sa.join(', ')}]
                        </div>
                        <div style={{ backgroundColor: '#1f2937', borderRadius: '8px', border: '1px solid #374151', overflow: 'hidden' }}>
                          {algo.visualization.sortedSuffixes.map((item, idx) => (
                            <div key={idx} style={{
                              display: 'flex', alignItems: 'center', gap: '1rem',
                              padding: '0.4rem 1rem', borderBottom: '1px solid #374151', fontSize: '0.85rem'
                            }}>
                              <span style={{
                                backgroundColor: algo.color, color: 'white',
                                padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '700', fontFamily: 'monospace'
                              }}>SA[{idx}]={item.idx}</span>
                              <span style={{ fontFamily: 'monospace', fontWeight: '600' }}>"{item.suffix}"</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Search Example */}
                      <div style={{ padding: '0.75rem', backgroundColor: '#1e3a8a', borderRadius: '8px', fontSize: '0.8rem' }}>
                        <div style={{ fontWeight: '600', color: '#93c5fd', marginBottom: '0.5rem' }}>Binary Search for "{algo.visualization.searchExample.pattern}":</div>
                        {algo.visualization.searchExample.steps.map((step, idx) => (
                          <div key={idx} style={{ color: '#c4b5fd', marginLeft: '0.5rem' }}>{idx + 1}. {step}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* LCP Visualization */}
                  {algo.visualization.type === 'lcp' && (
                    <div>
                      {/* SA and LCP Arrays */}
                      <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.75rem' }}>
                          LCP Array for "{algo.visualization.string}" (with SA)
                        </div>
                        <div style={{ backgroundColor: '#1f2937', borderRadius: '8px', border: '1px solid #374151', overflow: 'hidden' }}>
                          <div style={{
                            display: 'grid', gridTemplateColumns: '40px 60px 100px 80px 1fr',
                            padding: '0.5rem 1rem', backgroundColor: '#374151', borderBottom: '1px solid #4b5563',
                            fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af'
                          }}>
                            <span>i</span>
                            <span>SA[i]</span>
                            <span>Suffix</span>
                            <span>LCP[i]</span>
                            <span>Explanation</span>
                          </div>
                          {algo.visualization.suffixPairs.map((item, idx) => (
                            <div key={idx} style={{
                              display: 'grid', gridTemplateColumns: '40px 60px 100px 80px 1fr',
                              padding: '0.5rem 1rem', borderBottom: '1px solid #374151', fontSize: '0.8rem',
                              backgroundColor: item.lcp >= 3 ? '#064e3b' : '#1f2937'
                            }}>
                              <span style={{ color: '#9ca3af' }}>{item.i}</span>
                              <span style={{
                                backgroundColor: algo.color, color: 'white',
                                padding: '0.1rem 0.3rem', borderRadius: '3px', fontWeight: '600', textAlign: 'center', width: 'fit-content'
                              }}>{algo.visualization.sa[item.i]}</span>
                              <span style={{ fontFamily: 'monospace', fontWeight: '600', color: '#d1d5db' }}>"{item.suffix}"</span>
                              <span style={{
                                backgroundColor: item.lcp > 0 ? '#064e3b' : '#374151',
                                padding: '0.1rem 0.4rem', borderRadius: '3px', fontWeight: '700',
                                color: item.lcp > 0 ? '#86efac' : '#9ca3af', textAlign: 'center', width: 'fit-content'
                              }}>{item.lcp}</span>
                              <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{item.why}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Application */}
                      <div style={{ padding: '0.75rem', backgroundColor: '#064e3b', borderRadius: '8px', fontSize: '0.8rem', border: '1px solid #10b981' }}>
                        <div style={{ fontWeight: '600', color: '#6ee7b7', marginBottom: '0.5rem' }}>{algo.visualization.application.title}:</div>
                        {algo.visualization.application.steps.map((step, idx) => (
                          <div key={idx} style={{ color: '#86efac', marginLeft: '0.5rem' }}>{idx + 1}. {step}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Manacher Visualization */}
                  {algo.visualization.type === 'manacher' && (
                    <div>
                      {/* Transformation */}
                      <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.75rem' }}>
                          Step 1: Transform string to handle even-length palindromes
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem', backgroundColor: '#1f2937', borderRadius: '8px', border: '1px solid #374151' }}>
                          <div>
                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Original</div>
                            <div style={{ fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: '700', color: '#d1d5db' }}>{algo.visualization.original}</div>
                          </div>
                          <div style={{ fontSize: '1.5rem', color: '#9ca3af' }}>→</div>
                          <div>
                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Transformed</div>
                            <div style={{ fontFamily: 'monospace', fontSize: '1rem', fontWeight: '700', color: algo.color }}>{algo.visualization.transformed}</div>
                          </div>
                        </div>
                      </div>

                      {/* P-Array explanation */}
                      <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.75rem' }}>
                          Step 2: Compute P-array (palindrome radius at each position)
                        </div>
                        <div style={{ backgroundColor: '#1f2937', borderRadius: '8px', border: '1px solid #374151', overflow: 'hidden' }}>
                          {algo.visualization.pExplanation.map((item, idx) => (
                            <div key={idx} style={{
                              display: 'flex', alignItems: 'center', gap: '1rem',
                              padding: '0.5rem 1rem', borderBottom: '1px solid #374151',
                              backgroundColor: item.p >= 3 ? '#78350f' : '#1f2937', fontSize: '0.85rem'
                            }}>
                              <span style={{
                                backgroundColor: algo.color, color: 'white',
                                padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace', fontWeight: '700'
                              }}>P[{item.idx}]={item.p}</span>
                              <span style={{ fontFamily: 'monospace', color: '#9ca3af' }}>center='{item.char}'</span>
                              <span style={{
                                backgroundColor: item.p >= 3 ? '#92400e' : '#374151',
                                color: item.p >= 3 ? '#fcd34d' : '#d1d5db',
                                padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: '600'
                              }}>"{item.palindrome}"</span>
                              <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>{item.note}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Algorithm Steps */}
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.5rem' }}>
                          Algorithm Process:
                        </div>
                        {algo.visualization.steps.map((step, idx) => (
                          <div key={idx} style={{ fontSize: '0.8rem', color: '#9ca3af', marginLeft: '0.5rem', marginBottom: '0.25rem' }}>
                            {step.step}. {step.note}
                          </div>
                        ))}
                      </div>

                      <div style={{ padding: '0.75rem', backgroundColor: '#fff7ed', borderRadius: '8px', fontSize: '0.85rem', color: '#9a3412', fontWeight: '600' }}>
                        {algo.visualization.result}
                      </div>
                    </div>
                  )}

                  {/* Rolling Hash Visualization */}
                  {algo.visualization.type === 'rolling-hash' && (
                    <div>
                      {/* Text string display */}
                      <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
                          Text: "{algo.visualization.text}" | Window Size: {algo.visualization.windowSize} | Base: {algo.visualization.base}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '2px' }}>
                          {algo.visualization.text.split('').map((c, i) => (
                            <div key={i} style={{
                              width: '32px',
                              height: '32px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#374151',
                              borderRadius: '4px',
                              fontFamily: 'monospace',
                              fontWeight: '600',
                              fontSize: '0.9rem'
                            }}>
                              {c}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Step-by-step sliding window */}
                      <div style={{ backgroundColor: '#1f2937', borderRadius: '8px', border: '1px solid #374151', overflow: 'hidden', marginBottom: '1rem' }}>
                        <div style={{ padding: '0.5rem 0.75rem', backgroundColor: '#1f2937', color: 'white', fontSize: '0.75rem', fontWeight: '600' }}>
                          📊 Sliding Window Steps
                        </div>
                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                          {algo.visualization.steps.map((step, idx) => (
                            <div key={idx} style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 2fr',
                              gap: '0.75rem',
                              padding: '0.75rem',
                              borderBottom: idx < algo.visualization.steps.length - 1 ? '1px solid #374151' : 'none',
                              backgroundColor: idx === 0 ? '#064e3b' : '#1f2937'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {step.removed && (
                                  <span style={{
                                    padding: '0.2rem 0.4rem',
                                    backgroundColor: '#7f1d1d',
                                    color: '#fca5a5',
                                    borderRadius: '4px',
                                    fontFamily: 'monospace',
                                    fontSize: '0.75rem',
                                    fontWeight: '600'
                                  }}>-{step.removed}</span>
                                )}
                                <span style={{
                                  padding: '0.3rem 0.6rem',
                                  backgroundColor: algo.color,
                                  color: 'white',
                                  borderRadius: '6px',
                                  fontFamily: 'monospace',
                                  fontWeight: '700',
                                  letterSpacing: '2px'
                                }}>{step.window}</span>
                                {step.added && (
                                  <span style={{
                                    padding: '0.2rem 0.4rem',
                                    backgroundColor: '#064e3b',
                                    color: '#86efac',
                                    borderRadius: '4px',
                                    fontFamily: 'monospace',
                                    fontSize: '0.75rem',
                                    fontWeight: '600'
                                  }}>+{step.added}</span>
                                )}
                              </div>
                              <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#9ca3af', display: 'flex', alignItems: 'center' }}>
                                {step.hash}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Formula explanation */}
                      <div style={{ backgroundColor: '#4c1d95', borderRadius: '8px', padding: '1rem', border: '1px solid #e9d5ff' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#7c3aed', marginBottom: '0.75rem' }}>🔢 Hash Formulas</div>
                        <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.8rem' }}>
                          <div>
                            <span style={{ color: '#9ca3af' }}>Initial: </span>
                            <code style={{ backgroundColor: '#ede9fe', padding: '0.2rem 0.4rem', borderRadius: '4px', color: '#c4b5fd' }}>{algo.visualization.formula.initial}</code>
                          </div>
                          <div>
                            <span style={{ color: '#9ca3af' }}>Rolling: </span>
                            <code style={{ backgroundColor: '#ede9fe', padding: '0.2rem 0.4rem', borderRadius: '4px', color: '#c4b5fd' }}>{algo.visualization.formula.rolling}</code>
                          </div>
                          <div style={{ marginTop: '0.5rem', padding: '0.5rem', backgroundColor: '#dcfce7', borderRadius: '6px', color: '#166534', fontWeight: '500' }}>
                            💡 {algo.visualization.formula.why}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Trie Visualization */}
                  {algo.visualization.type === 'trie' && (
                    <div>
                      {/* Words being stored */}
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
                          Words: {algo.visualization.words.map(w => (
                            <span key={w} style={{
                              display: 'inline-block',
                              padding: '0.2rem 0.5rem',
                              backgroundColor: '#134e4a',
                              border: '1px solid #99f6e4',
                              borderRadius: '4px',
                              marginRight: '0.5rem',
                              fontFamily: 'monospace',
                              color: '#0d9488'
                            }}>"{w}"</span>
                          ))}
                        </div>
                      </div>

                      {/* Visual Trie Structure */}
                      <div style={{
                        backgroundColor: '#1f2937',
                        borderRadius: '8px',
                        border: '1px solid #374151',
                        padding: '1rem',
                        marginBottom: '1rem',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', marginBottom: '0.75rem' }}>🌳 Trie Structure</div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <div style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#1f2937',
                            color: 'white',
                            borderRadius: '8px',
                            fontWeight: '700',
                            marginBottom: '0.25rem'
                          }}>root</div>
                          <div style={{ display: 'flex', gap: '3rem', marginTop: '0.5rem' }}>
                            {/* Branch a */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div style={{ width: '2px', height: '15px', backgroundColor: '#9ca3af' }}></div>
                              <div style={{ padding: '0.3rem 0.6rem', backgroundColor: algo.color, color: 'white', borderRadius: '6px', fontFamily: 'monospace', fontWeight: '700' }}>a</div>
                              <div style={{ width: '2px', height: '15px', backgroundColor: '#9ca3af' }}></div>
                              <div style={{ padding: '0.3rem 0.6rem', backgroundColor: algo.color, color: 'white', borderRadius: '6px', fontFamily: 'monospace', fontWeight: '700' }}>p</div>
                              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                  <div style={{ width: '2px', height: '15px', backgroundColor: '#9ca3af' }}></div>
                                  <div style={{ padding: '0.3rem 0.6rem', backgroundColor: '#dcfce7', border: '2px solid #22c55e', borderRadius: '6px', fontFamily: 'monospace', fontWeight: '700' }}>p✓</div>
                                  <div style={{ fontSize: '0.65rem', color: '#22c55e' }}>app</div>
                                  <div style={{ width: '2px', height: '15px', backgroundColor: '#9ca3af' }}></div>
                                  <div style={{ padding: '0.3rem 0.6rem', backgroundColor: algo.color, color: 'white', borderRadius: '6px', fontFamily: 'monospace', fontWeight: '700' }}>l</div>
                                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                      <div style={{ width: '2px', height: '15px', backgroundColor: '#9ca3af' }}></div>
                                      <div style={{ padding: '0.3rem 0.6rem', backgroundColor: '#dcfce7', border: '2px solid #22c55e', borderRadius: '6px', fontFamily: 'monospace', fontWeight: '700' }}>e✓</div>
                                      <div style={{ fontSize: '0.65rem', color: '#22c55e' }}>apple</div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                      <div style={{ width: '2px', height: '15px', backgroundColor: '#9ca3af' }}></div>
                                      <div style={{ padding: '0.3rem 0.6rem', backgroundColor: '#dcfce7', border: '2px solid #22c55e', borderRadius: '6px', fontFamily: 'monospace', fontWeight: '700' }}>y✓</div>
                                      <div style={{ fontSize: '0.65rem', color: '#22c55e' }}>apply</div>
                                    </div>
                                  </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                  <div style={{ width: '2px', height: '15px', backgroundColor: '#9ca3af' }}></div>
                                  <div style={{ padding: '0.3rem 0.6rem', backgroundColor: '#fef3c7', border: '2px solid #f59e0b', borderRadius: '6px', fontFamily: 'monospace', fontWeight: '700' }}>t✓</div>
                                  <div style={{ fontSize: '0.65rem', color: '#d97706' }}>apt</div>
                                </div>
                              </div>
                            </div>
                            {/* Branch b */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div style={{ width: '2px', height: '15px', backgroundColor: '#9ca3af' }}></div>
                              <div style={{ padding: '0.3rem 0.6rem', backgroundColor: '#f87171', color: 'white', borderRadius: '6px', fontFamily: 'monospace', fontWeight: '700' }}>b</div>
                              <div style={{ width: '2px', height: '15px', backgroundColor: '#9ca3af' }}></div>
                              <div style={{ padding: '0.3rem 0.6rem', backgroundColor: '#f87171', color: 'white', borderRadius: '6px', fontFamily: 'monospace', fontWeight: '700' }}>a</div>
                              <div style={{ width: '2px', height: '15px', backgroundColor: '#9ca3af' }}></div>
                              <div style={{ padding: '0.3rem 0.6rem', backgroundColor: '#dcfce7', border: '2px solid #22c55e', borderRadius: '6px', fontFamily: 'monospace', fontWeight: '700' }}>t✓</div>
                              <div style={{ fontSize: '0.65rem', color: '#22c55e' }}>bat</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Operations Step-by-Step */}
                      <div style={{ backgroundColor: '#1f2937', borderRadius: '8px', border: '1px solid #374151', overflow: 'hidden' }}>
                        <div style={{ padding: '0.5rem 0.75rem', backgroundColor: '#1f2937', color: 'white', fontSize: '0.75rem', fontWeight: '600' }}>
                          🔄 Operations Demo
                        </div>
                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                          {algo.visualization.operations.map((operation, idx) => (
                            <div key={idx} style={{
                              padding: '0.75rem',
                              borderBottom: idx < algo.visualization.operations.length - 1 ? '1px solid #374151' : 'none',
                              backgroundColor: operation.op === 'search' ? '#78350f' : operation.op === 'startsWith' ? '#1e3a8a' : '#1f2937'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <span style={{
                                  padding: '0.2rem 0.5rem',
                                  backgroundColor: operation.op === 'insert' ? '#064e3b' : operation.op === 'search' ? '#78350f' : '#1e3a8a',
                                  color: operation.op === 'insert' ? '#86efac' : operation.op === 'search' ? '#fcd34d' : '#93c5fd',
                                  borderRadius: '4px',
                                  fontSize: '0.7rem',
                                  fontWeight: '700',
                                  textTransform: 'uppercase'
                                }}>{operation.op}</span>
                                <span style={{ fontFamily: 'monospace', fontWeight: '600', color: '#d1d5db' }}>"{operation.word}"</span>
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', fontSize: '0.7rem' }}>
                                {operation.steps.map((step, stepIdx) => (
                                  <span key={stepIdx} style={{
                                    padding: '0.15rem 0.4rem',
                                    backgroundColor: step.includes('✓') || step.includes('Found') || step.includes('exists') ? '#064e3b' : step.includes('create') ? '#78350f' : '#374151',
                                    borderRadius: '3px',
                                    fontFamily: 'monospace',
                                    color: step.includes('✓') || step.includes('Found') || step.includes('exists') ? '#86efac' : step.includes('create') ? '#fcd34d' : '#9ca3af'
                                  }}>{step}</span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Use Cases */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#d1d5db', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1rem' }}>🎯</span> Common Use Cases
                  </h4>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {algo.useCases.map((useCase, idx) => (
                      <span key={idx} style={{
                        padding: '0.5rem 0.875rem',
                        background: `linear-gradient(135deg, ${algo.color}15 0%, ${algo.color}08 100%)`,
                        border: `1px solid ${algo.color}30`,
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        color: '#374151',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}>
                        <span style={{ color: algo.color }}>•</span>
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Code */}
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#d1d5db', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1rem' }}>🐍</span> Python Implementation
                  </h4>
                  {parseCodeSections(algo.code).map(
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
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        backgroundColor: '#1f2937',
        borderRadius: '16px',
        border: '2px solid #374151',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)'
      }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#d1d5db', marginBottom: '0.5rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <span>📊</span> Algorithm Comparison
        </h3>
        <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Choose the right algorithm based on your use case
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '0.9rem' }}>
            <thead>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left', backgroundColor: '#1e293b', color: 'white', fontWeight: '600', borderTopLeftRadius: '8px' }}>Algorithm</th>
                <th style={{ padding: '1rem', textAlign: 'center', backgroundColor: '#1e293b', color: 'white', fontWeight: '600' }}>Time</th>
                <th style={{ padding: '1rem', textAlign: 'center', backgroundColor: '#1e293b', color: 'white', fontWeight: '600' }}>Space</th>
                <th style={{ padding: '1rem', textAlign: 'left', backgroundColor: '#1e293b', color: 'white', fontWeight: '600', borderTopRightRadius: '8px' }}>Best For</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Rabin-Karp', time: 'O(n+m) avg', space: 'O(1)', use: 'Multiple patterns, plagiarism detection', color: '#3b82f6' },
                { name: 'KMP', time: 'O(n+m)', space: 'O(m)', use: 'Single pattern, guaranteed linear', color: '#10b981' },
                { name: 'Z-Algorithm', time: 'O(n+m)', space: 'O(n+m)', use: 'Pattern matching, periods', color: '#f59e0b' },
                { name: 'Boyer-Moore', time: 'O(n/m) best', space: 'O(m+σ)', use: 'Large alphabets, text editors', color: '#8b5cf6' },
                { name: 'Aho-Corasick', time: 'O(n+m+z)', space: 'O(m*σ)', use: 'Multiple patterns simultaneously', color: '#ec4899' },
                { name: 'Suffix Array', time: 'O(n log n)', space: 'O(n)', use: 'Many queries, substring search', color: '#06b6d4' },
                { name: 'Manacher\'s', time: 'O(n)', space: 'O(n)', use: 'Palindrome problems', color: '#f97316' }
              ].map((row, idx) => (
                <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#f8fafc' : 'white' }}>
                  <td style={{ padding: '0.875rem 1rem', borderBottom: '1px solid #e5e7eb', fontWeight: '600', color: '#d1d5db' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: row.color, marginRight: '0.5rem' }}></span>
                    {row.name}
                  </td>
                  <td style={{ padding: '0.875rem 1rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>
                    <span style={{ backgroundColor: '#d1fae5', color: '#059669', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600', fontFamily: 'monospace' }}>{row.time}</span>
                  </td>
                  <td style={{ padding: '0.875rem 1rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>
                    <span style={{ backgroundColor: '#ede9fe', color: '#7c3aed', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600', fontFamily: 'monospace' }}>{row.space}</span>
                  </td>
                  <td style={{ padding: '0.875rem 1rem', borderBottom: '1px solid #e5e7eb', color: '#9ca3af' }}>{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Tips */}
        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#1e3a8a', borderRadius: '8px', border: '1px solid #3b82f6' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#93c5fd', marginBottom: '0.5rem' }}>💡 Quick Selection Guide</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.75rem', fontSize: '0.85rem', color: '#dbeafe' }}>
            <div><strong style={{ color: '#93c5fd' }}>Single pattern?</strong> → Use KMP or Z-Algorithm</div>
            <div><strong style={{ color: '#93c5fd' }}>Multiple patterns?</strong> → Use Aho-Corasick</div>
            <div><strong style={{ color: '#93c5fd' }}>Large alphabet?</strong> → Use Boyer-Moore</div>
            <div><strong style={{ color: '#93c5fd' }}>Palindromes?</strong> → Use Manacher's</div>
            <div><strong style={{ color: '#93c5fd' }}>Many queries?</strong> → Build Suffix Array</div>
            <div><strong style={{ color: '#93c5fd' }}>Need simplicity?</strong> → Use Rabin-Karp</div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default StringAlgorithms

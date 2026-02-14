import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function PythonRegex({ onBack, breadcrumb }) {
  const [selectedConcept, setSelectedConcept] = useState(null)

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
      name: 'Core Functions',
      icon: '\uD83D\uDD0D',
      explanation: `**Core Concept:**
\u2022 Python's re module provides functions for regex pattern matching
\u2022 re.match() checks for a match only at the beginning of the string
\u2022 re.search() scans the entire string for the first match
\u2022 re.findall() returns a list of all non-overlapping matches
\u2022 re.fullmatch() requires the entire string to match the pattern

**Return Types:**
\u2022 match() and search() return a Match object or None
\u2022 findall() returns a list of strings (or tuples if groups exist)
\u2022 fullmatch() returns a Match object or None
\u2022 Match objects have .group(), .start(), .end(), .span() methods

**When to Use Each:**
\u2022 match() - validate that a string starts with a pattern
\u2022 search() - find first occurrence anywhere in the string
\u2022 findall() - extract all occurrences of a pattern
\u2022 fullmatch() - validate that the entire string matches a pattern
\u2022 finditer() - iterate over all matches as Match objects

**Key Tips:**
\u2022 Always use raw strings r"..." for patterns to avoid backslash issues
\u2022 Check for None before calling .group() on match results
\u2022 findall() with groups returns only the group contents, not the full match`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 match() - start of string
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
import re

# re.match() only checks the BEGINNING of the string
m = re.match(r"Hello", "Hello World")
print(m)                # <re.Match object; span=(0, 5), match='Hello'>
print(m.group())        # 'Hello'
print(m.start())        # 0
print(m.end())          # 5
print(m.span())         # (0, 5)

# match() fails if pattern is not at the start
m = re.match(r"World", "Hello World")
print(m)                # None  (World is not at position 0)

# Use match() with ^ anchoring (implicit at start)
m = re.match(r"\\d{3}", "123-abc")
print(m.group())        # '123'

m = re.match(r"\\d{3}", "abc-123")
print(m)                # None  (doesn't start with digits)

# Safe pattern: always check for None before .group()
text = "Python 3.12"
m = re.match(r"Python", text)
if m:
    print(f"Found: {m.group()}")  # Found: Python


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 search() - anywhere in string
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# re.search() scans the ENTIRE string for the first match
m = re.search(r"World", "Hello World")
print(m.group())        # 'World'
print(m.span())         # (6, 11)

# search() finds the first occurrence
m = re.search(r"\\d+", "abc 123 def 456")
print(m.group())        # '123'  (only the first match)
print(m.start())        # 4

# search() vs match() - key difference
text = "Error: File not found (code 404)"
print(re.match(r"\\d+", text))    # None (no digits at start)
print(re.search(r"\\d+", text))   # <Match: '404'> (found anywhere)

# Practical: extract first number from text
def first_number(text):
    m = re.search(r"-?\\d+\\.?\\d*", text)
    return float(m.group()) if m else None

print(first_number("Temperature: -12.5 degrees"))  # -12.5
print(first_number("No numbers here"))              # None


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 findall() - all occurrences
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# re.findall() returns a list of ALL non-overlapping matches
numbers = re.findall(r"\\d+", "abc 123 def 456 ghi 789")
print(numbers)          # ['123', '456', '789']

# Extract all words
words = re.findall(r"[a-zA-Z]+", "Hello, World! How are you?")
print(words)            # ['Hello', 'World', 'How', 'are', 'you']

# With groups: findall returns only the group content
emails = "Contact alice@mail.com or bob@work.org"
# Without groups - returns full match
print(re.findall(r"\\w+@\\w+\\.\\w+", emails))
# ['alice@mail.com', 'bob@work.org']

# With ONE group - returns list of group strings
print(re.findall(r"(\\w+)@\\w+\\.\\w+", emails))
# ['alice', 'bob']  (only the captured username)

# With MULTIPLE groups - returns list of tuples
print(re.findall(r"(\\w+)@(\\w+)\\.\\w+", emails))
# [('alice', 'mail'), ('bob', 'work')]

# finditer() for Match objects instead of strings
for m in re.finditer(r"\\d+", "10 apples, 20 oranges, 30 bananas"):
    print(f"Found '{m.group()}' at position {m.start()}-{m.end()}")
# Found '10' at position 0-2
# Found '20' at position 11-13
# Found '30' at position 23-25


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 fullmatch() - entire string
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# re.fullmatch() requires the ENTIRE string to match
# Equivalent to using ^ and $ anchors with match()

# Validate exact format
m = re.fullmatch(r"\\d{3}-\\d{4}", "123-4567")
print(m.group())        # '123-4567' (entire string matches)

m = re.fullmatch(r"\\d{3}-\\d{4}", "abc 123-4567 xyz")
print(m)                # None (extra text around pattern)

# Input validation examples
def is_valid_zip(code):
    return re.fullmatch(r"\\d{5}(-\\d{4})?", code) is not None

print(is_valid_zip("12345"))       # True
print(is_valid_zip("12345-6789"))  # True
print(is_valid_zip("1234"))        # False
print(is_valid_zip("12345-67"))    # False

# Comparison: match vs fullmatch
print(re.match(r"\\d+", "123abc"))     # Matches '123' (start only)
print(re.fullmatch(r"\\d+", "123abc")) # None (not entire string)
print(re.fullmatch(r"\\d+", "123"))    # Matches '123' (exact)`
    },
    {
      name: 'Character Classes & Quantifiers',
      icon: '\uD83D\uDCCB',
      explanation: `**Predefined Character Classes:**
\u2022 \\d - any digit [0-9]
\u2022 \\D - any non-digit [^0-9]
\u2022 \\w - any word character [a-zA-Z0-9_]
\u2022 \\W - any non-word character [^a-zA-Z0-9_]
\u2022 \\s - any whitespace [ \\t\\n\\r\\f\\v]
\u2022 \\S - any non-whitespace
\u2022 \\b - word boundary (between \\w and \\W)
\u2022 . (dot) - any character except newline

**Custom Character Classes:**
\u2022 [abc] - matches a, b, or c
\u2022 [^abc] - matches anything except a, b, c
\u2022 [a-z] - matches any lowercase letter
\u2022 [A-Za-z0-9] - matches letters and digits
\u2022 [\\[\\]] - matches literal brackets (escaped)
\u2022 Inside [...], most special chars are literal

**Quantifiers:**
\u2022 * - zero or more repetitions
\u2022 + - one or more repetitions
\u2022 ? - zero or one (optional)
\u2022 {n} - exactly n repetitions
\u2022 {n,} - n or more repetitions
\u2022 {n,m} - between n and m repetitions

**Greedy vs Lazy:**
\u2022 By default, quantifiers are greedy (match as much as possible)
\u2022 Adding ? makes them lazy (match as little as possible)
\u2022 *? +? ?? {n,m}? are lazy versions`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Predefined classes (\\d \\w \\s)
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
import re

# \\d matches any digit (equivalent to [0-9])
print(re.findall(r"\\d+", "Order #1234, total: $56.78"))
# ['1234', '56', '78']

# \\D matches any NON-digit
print(re.findall(r"\\D+", "abc123def456"))
# ['abc', 'def']

# \\w matches word characters [a-zA-Z0-9_]
print(re.findall(r"\\w+", "hello_world! foo-bar 123"))
# ['hello_world', 'foo', 'bar', '123']

# \\W matches non-word characters
print(re.findall(r"\\W+", "hello world! how?"))
# [' ', '! ', '?']

# \\s matches whitespace (space, tab, newline)
print(re.split(r"\\s+", "hello   world\\tnew\\nline"))
# ['hello', 'world', 'new', 'line']

# \\b matches word boundaries (zero-width)
text = "cat scatter category"
print(re.findall(r"\\bcat\\b", text))    # ['cat'] - whole word only
print(re.findall(r"cat", text))          # ['cat', 'cat', 'cat'] - all

# . (dot) matches any character except newline
print(re.findall(r"c.t", "cat cot cut c\\nt"))
# ['cat', 'cot', 'cut']  (c\\nt not matched - dot skips newline)


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Custom classes [...]
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# [abc] matches any single character in the set
print(re.findall(r"[aeiou]", "Hello World"))
# ['e', 'o', 'o']

# [^abc] matches any character NOT in the set
print(re.findall(r"[^aeiou\\s]+", "Hello World"))
# ['Hll', 'Wrld']  (consonant clusters)

# Ranges inside character classes
print(re.findall(r"[a-z]+", "Hello World 123"))
# ['ello', 'orld']
print(re.findall(r"[A-Za-z]+", "Hello World 123"))
# ['Hello', 'World']
print(re.findall(r"[0-9a-fA-F]+", "color: #ff00ab, id: 42"))
# ['ff00ab', '42']  (hex characters)

# Special characters are literal inside [...]
print(re.findall(r"[.?!]+", "Hello! How? Great."))
# ['!', '?', '.']  (no escaping needed for . inside [])

# Combining character classes
print(re.findall(r"[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}",
    "Email alice.smith+work@my-company.com today"))
# ['alice.smith+work@my-company.com']


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Quantifiers (* + ? {})
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# * = zero or more
print(re.findall(r"go*gle", "ggle gogle google gooogle"))
# ['ggle', 'gogle', 'google', 'gooogle']

# + = one or more
print(re.findall(r"go+gle", "ggle gogle google gooogle"))
# ['gogle', 'google', 'gooogle']  (ggle excluded - needs 1+ 'o')

# ? = zero or one (optional)
print(re.findall(r"colou?r", "color and colour"))
# ['color', 'colour']  (u is optional)

# {n} = exactly n times
print(re.findall(r"\\d{3}", "12 123 1234 12345"))
# ['123', '123', '123']

# {n,m} = between n and m times
print(re.findall(r"\\d{2,4}", "1 12 123 1234 12345"))
# ['12', '123', '1234', '1234']

# {n,} = n or more times
print(re.findall(r"\\d{3,}", "1 12 123 1234 12345"))
# ['123', '1234', '12345']

# Combining quantifiers
# Match phone numbers: optional country code + 10 digits
pattern = r"\\+?\\d{1,3}[\\s-]?\\d{3}[\\s-]?\\d{3}[\\s-]?\\d{4}"
phones = "Call +1 555-123-4567 or 555.987.6543"
print(re.findall(pattern, phones))


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Greedy vs lazy (? suffix)
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Greedy (default): match as MUCH as possible
html = "<b>bold</b> and <i>italic</i>"

# Greedy: .* grabs everything between first < and last >
print(re.findall(r"<.*>", html))
# ['<b>bold</b> and <i>italic</i>']  -- too much!

# Lazy: .*? grabs as LITTLE as possible
print(re.findall(r"<.*?>", html))
# ['<b>', '</b>', '<i>', '</i>']  -- each tag separately

# More examples of greedy vs lazy
text = "aXbXcXd"
print(re.search(r"a.*X", text).group())    # 'aXbXcX' (greedy)
print(re.search(r"a.*?X", text).group())   # 'aX' (lazy)

# Extract content between quotes
text = 'She said "hello" and "goodbye"'
# Greedy: captures everything between first and last quote
print(re.findall(r'"(.*)"', text))       # ['hello" and "goodbye']
# Lazy: captures each quoted string separately
print(re.findall(r'"(.*?)"', text))      # ['hello', 'goodbye']

# Practical: extract HTML tag content
html_text = "<title>My Page</title><body>Content</body>"
print(re.findall(r"<(\\w+)>(.*?)</\\1>", html_text))
# [('title', 'My Page'), ('body', 'Content')]`
    },
    {
      name: 'Groups & Capturing',
      icon: '\uD83D\uDCE6',
      explanation: `**Capturing Groups ():**
\u2022 Parentheses create capturing groups
\u2022 Access groups via match.group(n) where n starts at 1
\u2022 match.group(0) or match.group() returns the full match
\u2022 match.groups() returns tuple of all captured groups

**Named Groups (?P<name>...):**
\u2022 Give groups meaningful names for readability
\u2022 Access via match.group('name') or match['name']
\u2022 match.groupdict() returns a dictionary of named groups
\u2022 Reference in replacement: \\g<name>

**Non-Capturing Groups (?:...):**
\u2022 Group for alternation or quantifiers without capturing
\u2022 Useful when you need grouping but not extraction
\u2022 Does not affect group numbering

**Backreferences:**
\u2022 \\1, \\2, etc. refer back to captured group contents
\u2022 Match repeated text (e.g., duplicate words)
\u2022 (?P=name) references a named group
\u2022 Used in both patterns and replacement strings`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Basic groups
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
import re

# Parentheses () create capturing groups
m = re.search(r"(\\d{4})-(\\d{2})-(\\d{2})", "Date: 2025-12-25")
print(m.group(0))     # '2025-12-25' (full match)
print(m.group(1))     # '2025' (first group)
print(m.group(2))     # '12' (second group)
print(m.group(3))     # '25' (third group)
print(m.groups())     # ('2025', '12', '25') (all groups as tuple)

# Extract parts from a URL
url = "https://www.example.com:8080/path/page?q=search"
m = re.search(r"(https?)://([^/:]+)(?::(\\d+))?(/[^?]*)?(\\?.*)?", url)
print(f"Protocol: {m.group(1)}")   # https
print(f"Host:     {m.group(2)}")   # www.example.com
print(f"Port:     {m.group(3)}")   # 8080
print(f"Path:     {m.group(4)}")   # /path/page
print(f"Query:    {m.group(5)}")   # ?q=search

# Groups with findall - returns group contents only
text = "John (30), Jane (25), Bob (45)"
print(re.findall(r"(\\w+) \\((\\d+)\\)", text))
# [('John', '30'), ('Jane', '25'), ('Bob', '45')]

# Groups with alternation
pattern = r"(cat|dog|bird)s?"
print(re.findall(pattern, "I have cats, a dog, and birds"))
# ['cat', 'dog', 'bird']


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Named groups
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# (?P<name>...) creates named capturing groups
pattern = r"(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})"
m = re.search(pattern, "Born on 1990-06-15")

# Access by name
print(m.group('year'))    # '1990'
print(m.group('month'))   # '06'
print(m.group('day'))     # '15'
print(m['year'])          # '1990' (shorthand syntax)

# groupdict() returns all named groups as a dictionary
print(m.groupdict())
# {'year': '1990', 'month': '06', 'day': '15'}

# Named groups in log parsing
log = "2025-01-15 08:30:45 [ERROR] Connection timeout"
pattern = r"(?P<date>[\\d-]+) (?P<time>[\\d:]+) \\[(?P<level>\\w+)\\] (?P<msg>.+)"
m = re.search(pattern, log)
info = m.groupdict()
print(f"Level: {info['level']}, Message: {info['msg']}")
# Level: ERROR, Message: Connection timeout

# Named groups in sub() replacement
text = "2025-01-15"
result = re.sub(
    r"(?P<y>\\d{4})-(?P<m>\\d{2})-(?P<d>\\d{2})",
    r"\\g<d>/\\g<m>/\\g<y>",    # reference named groups
    text
)
print(result)  # '15/01/2025'


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Non-capturing groups
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# (?:...) groups without capturing - does not create a group
# Useful for alternation/quantifiers when you don't need the match

# Without non-capturing group - findall returns group content
print(re.findall(r"(https?://\\S+)", "Visit http://a.com or https://b.org"))
# ['http://a.com', 'https://b.org']

# With non-capturing group for alternation
# Match file extensions without capturing the group
files = "main.py data.csv app.js style.css notes.txt"
# Capturing group: returns only the extension
print(re.findall(r"\\w+\\.(py|js|css)", files))
# ['py', 'js', 'css']  -- only the captured group!

# Non-capturing group: returns full match
print(re.findall(r"\\w+\\.(?:py|js|css)", files))
# ['main.py', 'app.js', 'style.css']  -- full filenames!

# Non-capturing group with quantifier
# Match repeated patterns without cluttering groups
ip_pattern = r"(\\d{1,3})(?:\\.\\d{1,3}){3}"
m = re.search(ip_pattern, "Server at 192.168.1.100")
print(m.group(0))    # '192.168.1.100' (full match)
print(m.group(1))    # '192' (only first octet captured)


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Backreferences
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \\1, \\2 refer back to captured group content

# Find duplicate consecutive words
text = "This is is a test test of the the regex"
print(re.findall(r"\\b(\\w+)\\s+\\1\\b", text))
# ['is', 'test', 'the']

# Match matching HTML tags
html = "<h1>Title</h1> <p>Text</p> <h1>Bad</h2>"
print(re.findall(r"<(\\w+)>.*?</\\1>", html))
# ['h1', 'p']  -- <h1>Bad</h2> excluded (mismatched)

# Named backreference: (?P=name)
pattern = r"(?P<quote>['\"]).*?(?P=quote)"
text = '''He said "hello" and 'goodbye' today'''
print(re.findall(pattern, text))
# ['"', "'"]  (group captures the quote character)

# Backreferences in replacement strings
# Swap first and last name
text = "Smith, John"
result = re.sub(r"(\\w+), (\\w+)", r"\\2 \\1", text)
print(result)  # 'John Smith'

# Remove duplicate words
text = "the the quick brown fox fox"
result = re.sub(r"\\b(\\w+)\\s+\\1\\b", r"\\1", text)
print(result)  # 'the quick brown fox'`
    },
    {
      name: 'Substitution & Splitting',
      icon: '\uD83D\uDD04',
      explanation: `**re.sub(pattern, repl, string, count=0, flags=0):**
\u2022 Replace all matches of pattern with repl
\u2022 repl can be a string or a function
\u2022 count=0 replaces all; count=n replaces first n
\u2022 Use \\1, \\2 or \\g<name> in replacement strings
\u2022 Returns the modified string

**re.subn(pattern, repl, string, count=0, flags=0):**
\u2022 Same as sub() but returns (new_string, num_replacements)
\u2022 Useful when you need to know how many replacements occurred

**re.split(pattern, string, maxsplit=0, flags=0):**
\u2022 Split string by pattern occurrences
\u2022 maxsplit limits the number of splits
\u2022 Capturing groups in pattern are included in result
\u2022 More powerful than str.split()

**Function Replacement:**
\u2022 Pass a function as repl to sub()
\u2022 Function receives a Match object as argument
\u2022 Must return a string (the replacement)
\u2022 Enables dynamic, context-dependent replacements`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Basic sub()
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
import re

# Replace all digits with #
text = "Call 555-123-4567 or 555-987-6543"
print(re.sub(r"\\d", "#", text))
# 'Call ###-###-#### or ###-###-####'

# Replace with group references
# Reformat date from YYYY-MM-DD to DD/MM/YYYY
date = "Meeting on 2025-12-25 and 2026-01-15"
print(re.sub(r"(\\d{4})-(\\d{2})-(\\d{2})", r"\\3/\\2/\\1", date))
# 'Meeting on 25/12/2025 and 15/01/2026'

# Limit replacements with count parameter
text = "one two three four five"
print(re.sub(r"\\w+", "X", text, count=3))
# 'X X X four five'  (only first 3 replaced)

# subn() returns count of replacements
result, count = re.subn(r"\\d+", "N", "abc 1 def 2 ghi 3")
print(f"Result: '{result}', Replacements: {count}")
# Result: 'abc N def N ghi N', Replacements: 3

# Remove HTML tags
html = "<p>Hello <b>World</b>!</p>"
print(re.sub(r"<[^>]+>", "", html))
# 'Hello World!'

# Normalize whitespace
messy = "Hello    World  \\t\\n   Python"
print(re.sub(r"\\s+", " ", messy).strip())
# 'Hello World Python'


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Function replacement
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Pass a function as the replacement argument
# Function receives a Match object, must return a string

# Double all numbers in text
def double_number(match):
    num = int(match.group())
    return str(num * 2)

text = "I have 3 cats and 5 dogs"
print(re.sub(r"\\d+", double_number, text))
# 'I have 6 cats and 10 dogs'

# Convert temperature units
def celsius_to_fahrenheit(match):
    c = float(match.group(1))
    f = c * 9/5 + 32
    return f"{f:.1f}F"

text = "Water boils at 100C and freezes at 0C"
print(re.sub(r"(\\d+)C", celsius_to_fahrenheit, text))
# 'Water boils at 212.0F and freezes at 32.0F'

# Title case with regex
def title_word(match):
    return match.group().capitalize()

text = "the quick brown fox"
print(re.sub(r"\\b\\w+", title_word, text))
# 'The Quick Brown Fox'

# Mask sensitive data using lambda
text = "Card: 4111-2222-3333-4444, SSN: 123-45-6789"
# Mask all but last 4 digits of card
print(re.sub(r"\\d{4}-\\d{4}-\\d{4}-(\\d{4})",
    lambda m: f"****-****-****-{m.group(1)}", text))
# 'Card: ****-****-****-4444, SSN: 123-45-6789'


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 re.split()
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Split by multiple delimiters
text = "one,two;three:four|five"
print(re.split(r"[,;:|]", text))
# ['one', 'two', 'three', 'four', 'five']

# Split by whitespace (more flexible than str.split)
text = "hello   world\\tnew\\n\\nline"
print(re.split(r"\\s+", text))
# ['hello', 'world', 'new', 'line']

# maxsplit limits the number of splits
text = "a-b-c-d-e"
print(re.split(r"-", text, maxsplit=2))
# ['a', 'b', 'c-d-e']  (only 2 splits, rest stays)

# Capturing groups in split INCLUDES the delimiters
text = "one1two2three3four"
print(re.split(r"(\\d)", text))
# ['one', '1', 'two', '2', 'three', '3', 'four']

# vs non-capturing group - delimiters excluded
print(re.split(r"(?:\\d)", text))
# ['one', 'two', 'three', 'four']

# Split sentences (handle abbreviations)
text = "Dr. Smith went to Washington. He arrived at 3 p.m. It was sunny."
# Split on '. ' followed by uppercase letter
print(re.split(r"\\.\\s+(?=[A-Z])", text))
# ['Dr. Smith went to Washington', 'He arrived at 3 p.m', 'It was sunny.']


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Advanced substitution
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# CamelCase to snake_case conversion
def camel_to_snake(name):
    # Insert _ before uppercase letters that follow lowercase
    s = re.sub(r"([a-z])([A-Z])", r"\\1_\\2", name)
    # Insert _ before uppercase letters followed by lowercase (for acronyms)
    s = re.sub(r"([A-Z]+)([A-Z][a-z])", r"\\1_\\2", s)
    return s.lower()

print(camel_to_snake("myVariableName"))     # 'my_variable_name'
print(camel_to_snake("HTTPSConnection"))    # 'https_connection'
print(camel_to_snake("getHTTPResponse"))    # 'get_http_response'

# Template substitution with regex
template = "Hello {name}, your order #{id} ships on {date}"
values = {"name": "Alice", "id": "1234", "date": "Jan 15"}
result = re.sub(r"\\{(\\w+)\\}", lambda m: values.get(m.group(1), m.group(0)), template)
print(result)
# 'Hello Alice, your order #1234 ships on Jan 15'

# Clean and normalize text
def clean_text(text):
    text = re.sub(r"<[^>]+>", "", text)          # Remove HTML tags
    text = re.sub(r"\\s+", " ", text)              # Normalize whitespace
    text = re.sub(r"[^\\w\\s.,!?-]", "", text)     # Remove special chars
    return text.strip()

print(clean_text("<p>Hello   <b>World</b>! @#$ How's it?</p>"))
# 'Hello World! Hows it?'`
    },
    {
      name: 'Flags & Compilation',
      icon: '\u2699\uFE0F',
      explanation: `**Common Flags:**
\u2022 re.IGNORECASE (re.I) - case-insensitive matching
\u2022 re.MULTILINE (re.M) - ^ and $ match line boundaries
\u2022 re.DOTALL (re.S) - dot matches newline too
\u2022 re.VERBOSE (re.X) - allow comments and whitespace in pattern
\u2022 re.ASCII (re.A) - \\w, \\d, etc. match ASCII only

**re.compile():**
\u2022 Pre-compiles a pattern into a regex object
\u2022 Returns a Pattern object with match/search/findall methods
\u2022 Improves performance when using the same pattern repeatedly
\u2022 Makes code more readable with named patterns

**Combining Flags:**
\u2022 Use bitwise OR: re.I | re.M | re.S
\u2022 Inline syntax: (?i) (?m) (?s) (?x) in the pattern itself
\u2022 Multiple inline: (?ims) at the start of the pattern

**When to Use compile():**
\u2022 Pattern used in a loop or called many times
\u2022 Complex patterns that benefit from a descriptive variable name
\u2022 When you want to store the pattern as a reusable object
\u2022 Slight performance benefit from avoiding re-compilation`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Common flags
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
import re

# re.IGNORECASE (re.I) - case-insensitive matching
print(re.findall(r"python", "Python PYTHON python", re.I))
# ['Python', 'PYTHON', 'python']

print(re.search(r"hello world", "Hello World", re.IGNORECASE))
# <re.Match object; match='Hello World'>

# re.MULTILINE (re.M) - ^ and $ match at each line boundary
text = """First line
Second line
Third line"""

# Without MULTILINE: ^ only matches start of entire string
print(re.findall(r"^\\w+", text))
# ['First']

# With MULTILINE: ^ matches start of each line
print(re.findall(r"^\\w+", text, re.M))
# ['First', 'Second', 'Third']

# $ matches end of each line with MULTILINE
print(re.findall(r"\\w+$", text, re.M))
# ['line', 'line', 'line']

# re.DOTALL (re.S) - dot matches newline characters too
text = "<div>\\nHello\\nWorld\\n</div>"

# Without DOTALL: . does NOT match \\n
print(re.search(r"<div>(.*)</div>", text))       # None

# With DOTALL: . matches \\n too
m = re.search(r"<div>(.*)</div>", text, re.S)
print(m.group(1))    # '\\nHello\\nWorld\\n'


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 re.VERBOSE for readable patterns
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# re.VERBOSE (re.X) allows whitespace and comments in patterns
# Whitespace is ignored (use \\s or [ ] to match actual spaces)

# Complex pattern WITHOUT verbose - hard to read:
email_pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"

# Same pattern WITH verbose - self-documenting:
email_pattern = re.compile(r"""
    ^                       # Start of string
    [a-zA-Z0-9._%+-]+      # Username: letters, digits, special chars
    @                       # Literal @ symbol
    [a-zA-Z0-9.-]+         # Domain name
    \\.                     # Literal dot
    [a-zA-Z]{2,}           # TLD (at least 2 letters)
    $                       # End of string
""", re.VERBOSE)

print(email_pattern.match("user@example.com"))    # Match
print(email_pattern.match("bad@.com"))            # None

# Another verbose example: phone number pattern
phone_pattern = re.compile(r"""
    (?:                     # Optional country code
        \\+?                # Optional +
        \\d{1,3}            # 1-3 digits
        [\\s.-]?            # Optional separator
    )?
    \\(?                    # Optional opening paren
    \\d{3}                  # Area code (3 digits)
    \\)?                    # Optional closing paren
    [\\s.-]?               # Optional separator
    \\d{3}                  # First 3 digits
    [\\s.-]?               # Optional separator
    \\d{4}                  # Last 4 digits
""", re.VERBOSE)

for phone in ["+1 (555) 123-4567", "555.987.6543", "5551234567"]:
    m = phone_pattern.search(phone)
    print(f"{phone}: {'Match' if m else 'No match'}")


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 re.compile() for performance
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# re.compile() pre-compiles a pattern for reuse
# Returns a Pattern object with the same methods

# Compile once, use many times
number_pattern = re.compile(r"-?\\d+\\.?\\d*")
log_pattern = re.compile(
    r"(?P<date>[\\d-]+) (?P<time>[\\d:]+) \\[(?P<level>\\w+)\\] (?P<msg>.+)"
)

# Use compiled pattern's methods directly
text = "Prices: $10.50, $-3.25, $100"
print(number_pattern.findall(text))   # ['10.50', '-3.25', '100']

logs = [
    "2025-01-15 08:30:45 [ERROR] Connection failed",
    "2025-01-15 08:31:00 [INFO] Retry successful",
    "2025-01-15 08:32:10 [WARN] High latency detected",
]
for log in logs:
    m = log_pattern.match(log)
    if m:
        d = m.groupdict()
        print(f"[{d['level']}] {d['time']} - {d['msg']}")

# Pattern object attributes
p = re.compile(r"hello", re.I | re.M)
print(p.pattern)     # 'hello'
print(p.flags)       # 42 (numeric value of combined flags)

# Performance: compile avoids re-compiling in loops
import time
pattern_str = r"\\d{3}-\\d{3}-\\d{4}"
compiled = re.compile(pattern_str)
data = ["555-123-4567"] * 100000

# Compiled is faster for repeated use
start = time.time()
for item in data:
    compiled.match(item)
print(f"Compiled: {time.time() - start:.4f}s")


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Combining flags
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Combine flags with bitwise OR (|)
text = """Hello WORLD
Python REGEX
multi LINE"""

# IGNORECASE + MULTILINE: match "hello" at start of any line
pattern = re.compile(r"^[a-z]+", re.I | re.M)
print(pattern.findall(text))
# ['Hello', 'Python', 'multi']

# IGNORECASE + DOTALL + VERBOSE
html = "<DIV>\\nContent\\n</DIV>"
pattern = re.compile(r"""
    <div>       # Opening tag
    (.*)        # Content (including newlines with DOTALL)
    </div>      # Closing tag
""", re.I | re.S | re.X)
m = pattern.search(html)
print(m.group(1).strip())  # 'Content'

# Inline flags (within the pattern itself)
# (?i) = IGNORECASE, (?m) = MULTILINE, (?s) = DOTALL
print(re.findall(r"(?i)python", "Python PYTHON python"))
# ['Python', 'PYTHON', 'python']

# Inline flags apply to entire pattern
print(re.findall(r"(?im)^\\w+", "Hello\\nWorld"))
# ['Hello', 'World']`
    },
    {
      name: 'Common Patterns',
      icon: '\uD83E\uDDE9',
      explanation: `**Email Validation:**
\u2022 Basic: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$
\u2022 Check username, @ symbol, domain, and TLD
\u2022 Full RFC 5322 compliance is extremely complex

**URL Matching:**
\u2022 Match protocol, domain, port, path, query, fragment
\u2022 Handle http/https, www prefix, various TLDs
\u2022 Consider URL encoding (%20, etc.)

**Phone Numbers:**
\u2022 Handle multiple formats: (xxx) xxx-xxxx, xxx-xxx-xxxx
\u2022 Optional country code, various separators
\u2022 International formats vary widely

**IP Addresses:**
\u2022 IPv4: four octets (0-255) separated by dots
\u2022 Simple: \\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}
\u2022 Strict: validate each octet is 0-255

**Date Parsing:**
\u2022 Multiple formats: YYYY-MM-DD, MM/DD/YYYY, DD.MM.YYYY
\u2022 Validate month (01-12) and day (01-31) ranges
\u2022 Named groups make extraction cleaner

**Password Validation:**
\u2022 Use lookaheads (?=...) for multiple requirements
\u2022 Check length, uppercase, lowercase, digits, special chars
\u2022 Lookaheads assert without consuming characters`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Email & URL patterns
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
import re

# --- Email validation ---
email_pattern = re.compile(r"""
    ^
    [a-zA-Z0-9._%+-]+      # Username
    @
    [a-zA-Z0-9.-]+         # Domain
    \\.
    [a-zA-Z]{2,}           # TLD
    $
""", re.VERBOSE)

test_emails = [
    "user@example.com",          # Valid
    "alice.smith+work@mail.co",  # Valid
    "invalid.email",             # Invalid (no @)
    "@example.com",              # Invalid (no username)
    "user@.com",                 # Invalid (no domain)
]
for email in test_emails:
    valid = "valid" if email_pattern.match(email) else "INVALID"
    print(f"  {email:35s} -> {valid}")

# --- Extract all emails from text ---
text = "Contact alice@work.com or bob.smith@company.co.uk for info"
emails = re.findall(r"[\\w.+-]+@[\\w-]+\\.[\\w.]+", text)
print(f"Found emails: {emails}")
# ['alice@work.com', 'bob.smith@company.co.uk']

# --- URL matching ---
url_pattern = re.compile(r"""
    (?P<protocol>https?)://          # http or https
    (?P<domain>[\\w.-]+)             # Domain name
    (?::(?P<port>\\d+))?             # Optional port
    (?P<path>/[\\w./-]*)?            # Optional path
    (?:\\?(?P<query>[\\w=&%-]*))?     # Optional query string
    (?:\\#(?P<fragment>[\\w-]*))?     # Optional fragment
""", re.VERBOSE)

urls = [
    "https://www.example.com/path/page?q=search#section",
    "http://api.github.com:8080/users",
    "https://docs.python.org/3/library/re.html",
]
for url in urls:
    m = url_pattern.match(url)
    if m:
        d = m.groupdict()
        print(f"  {d['protocol']}://{d['domain']} path={d['path']}")


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Phone & IP patterns
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# --- Phone number extraction ---
phone_pattern = re.compile(r"""
    (?:\\+1[\\s.-]?)?               # Optional country code +1
    \\(?                            # Optional opening paren
    (?P<area>\\d{3})                # Area code
    \\)?                            # Optional closing paren
    [\\s.-]?                        # Optional separator
    (?P<exchange>\\d{3})            # Exchange
    [\\s.-]?                        # Optional separator
    (?P<number>\\d{4})              # Number
""", re.VERBOSE)

phones = [
    "555-123-4567",
    "(555) 123-4567",
    "+1 555.123.4567",
    "5551234567",
]
for phone in phones:
    m = phone_pattern.search(phone)
    if m:
        d = m.groupdict()
        print(f"  {phone:20s} -> ({d['area']}) {d['exchange']}-{d['number']}")

# --- IPv4 address validation ---
def is_valid_ipv4(ip):
    """Validate IPv4 address (each octet 0-255)"""
    pattern = re.compile(r"""
        ^
        (?:                     # Repeat 3 times: octet + dot
            (?:25[0-5]          # 250-255
            |2[0-4]\\d           # 200-249
            |[01]?\\d\\d?)       # 0-199
            \\.                  # Literal dot
        ){3}
        (?:25[0-5]              # Last octet (no trailing dot)
        |2[0-4]\\d
        |[01]?\\d\\d?)
        $
    """, re.VERBOSE)
    return pattern.match(ip) is not None

test_ips = ["192.168.1.1", "10.0.0.1", "255.255.255.255",
            "256.1.1.1", "1.2.3.999", "1.2.3"]
for ip in test_ips:
    print(f"  {ip:20s} -> {'valid' if is_valid_ipv4(ip) else 'INVALID'}")

# Extract all IPs from text (simple version)
text = "Server 192.168.1.100 connected to 10.0.0.1 via 172.16.0.1"
ips = re.findall(r"\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}", text)
print(f"Found IPs: {ips}")


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Date & time parsing
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Parse multiple date formats
def parse_date(text):
    """Extract date in various formats and normalize to YYYY-MM-DD"""
    patterns = [
        # YYYY-MM-DD
        r"(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})",
        # MM/DD/YYYY
        r"(?P<month>\\d{1,2})/(?P<day>\\d{1,2})/(?P<year>\\d{4})",
        # DD.MM.YYYY
        r"(?P<day>\\d{1,2})\\.(?P<month>\\d{1,2})\\.(?P<year>\\d{4})",
        # Month DD, YYYY
        r"(?P<month_name>\\w+) (?P<day>\\d{1,2}),? (?P<year>\\d{4})",
    ]
    for pattern in patterns:
        m = re.search(pattern, text)
        if m:
            d = m.groupdict()
            if 'month_name' in d:
                months = {"January":"01","February":"02","March":"03",
                          "April":"04","May":"05","June":"06",
                          "July":"07","August":"08","September":"09",
                          "October":"10","November":"11","December":"12"}
                d['month'] = months.get(d['month_name'], '00')
            return f"{d['year']}-{int(d['month']):02d}-{int(d['day']):02d}"
    return None

dates = ["2025-12-25", "12/25/2025", "25.12.2025", "December 25, 2025"]
for date in dates:
    print(f"  {date:25s} -> {parse_date(date)}")

# Extract time with optional seconds
time_pattern = r"(?P<hour>\\d{1,2}):(?P<min>\\d{2})(?::(?P<sec>\\d{2}))?"
times = ["08:30", "14:45:30", "9:05:00"]
for t in times:
    m = re.match(time_pattern, t)
    if m:
        print(f"  {t} -> {m.groupdict()}")


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Password & input validation
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Password validation using positive lookaheads
def validate_password(password):
    """
    Requirements: 8+ chars, uppercase, lowercase, digit, special char
    Lookaheads (?=...) assert without consuming characters
    """
    pattern = re.compile(r"""
        ^
        (?=.*[a-z])         # At least one lowercase letter
        (?=.*[A-Z])         # At least one uppercase letter
        (?=.*\\d)            # At least one digit
        (?=.*[!@#$%^&*])   # At least one special character
        .{8,}               # Minimum 8 characters total
        $
    """, re.VERBOSE)
    return pattern.match(password) is not None

passwords = [
    ("Pass123!", True),
    ("password", False),      # No uppercase, digit, or special
    ("Short1!", False),        # Too short (7 chars)
    ("NOLOWER1!", False),      # No lowercase
    ("Valid@Pass1", True),
]
for pwd, expected in passwords:
    result = validate_password(pwd)
    status = "PASS" if result == expected else "FAIL"
    print(f"  [{status}] {pwd:15s} -> {result}")

# Username validation
def is_valid_username(username):
    """3-20 chars, letters/digits/underscore, must start with letter"""
    return re.fullmatch(r"[a-zA-Z]\\w{2,19}", username) is not None

print(is_valid_username("john_doe"))     # True
print(is_valid_username("_invalid"))     # False (starts with _)
print(is_valid_username("ab"))           # False (too short)

# Credit card number validation (basic Luhn-compatible format)
def is_valid_card_format(card):
    """Check format: 16 digits, optionally separated by - or space"""
    clean = re.sub(r"[\\s-]", "", card)
    return re.fullmatch(r"\\d{16}", clean) is not None

print(is_valid_card_format("4111-1111-1111-1111"))  # True
print(is_valid_card_format("4111 1111 1111 1111"))  # True
print(is_valid_card_format("411111111111111"))       # False (15 digits)`
    }
  ]

  const codeSections = selectedConcept ? parseCodeSections(concepts[selectedConcept].codeExample) : []

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
              onClick={() => {
                if (selectedConcept !== null) {
                  setSelectedConcept(null)
                } else {
                  onBack()
                }
              }}
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
              {'\u2190'} {selectedConcept !== null ? 'Back to Concepts' : 'Back to Python Topics'}
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #8b5cf6, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Regular Expressions
            </h1>
          </div>
        </div>

        <Breadcrumb breadcrumb={activeBreadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

        <CollapsibleSidebar
          items={concepts}
          selectedIndex={selectedConcept !== null ? selectedConcept : -1}
          onSelect={(index) => setSelectedConcept(index)}
          title="Concepts"
          getItemLabel={(item) => item.name}
          getItemIcon={(item) => item.icon}
          primaryColor={'#7c3aed'}
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {concepts.map((concept, index) => (
            <div
              key={index}
              onClick={() => setSelectedConcept(index)}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                border: '2px solid #7c3aed',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#8b5cf6'
                e.currentTarget.style.transform = 'translateY(-0.5rem)'
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(124, 58, 237, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#7c3aed'
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
                color: '#c4b5fd'
              }}>
                {concept.name}
              </h3>
              <p style={{
                color: '#d1d5db',
                textAlign: 'left',
                fontSize: '0.875rem'
              }}>
                Click to explore regex concepts
              </p>
            </div>
          ))}
        </div>

        {selectedConcept !== null && (
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
              width: '95vw', maxWidth: '1400px', height: '90vh',
              overflowY: 'auto',
              border: '2px solid #7c3aed',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <div style={{
                position: 'sticky',
                top: '0',
                background: 'linear-gradient(to right, #7c3aed, #6d28d9)',
                padding: '1.5rem',
                borderTopLeftRadius: '0.75rem',
                borderTopRightRadius: '0.75rem',
                borderBottom: '2px solid #8b5cf6',
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
                    <span style={{ fontSize: '3rem' }}>{concepts[selectedConcept].icon}</span>
                    <h2 style={{
                      fontSize: '1.875rem',
                      fontWeight: 'bold',
                      color: 'white'
                    }}>
                      {concepts[selectedConcept].name}
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
                  border: '1px solid #7c3aed'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#c4b5fd'
                  }}>
                    Overview
                  </h3>
                  <div style={{
                    whiteSpace: 'pre-line',
                    color: '#d1d5db',
                    lineHeight: '1.8'
                  }}>
                    {concepts[selectedConcept].explanation.split('\n').map((line, i) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        const text = line.slice(2, -2)
                        return <div key={i} style={{ fontWeight: '700', color: '#c4b5fd', marginTop: i > 0 ? '1rem' : 0, marginBottom: '0.5rem' }}>{text}</div>
                      }
                      if (line.startsWith('\u2022')) {
                        return <div key={i} style={{ marginLeft: '1.5rem', marginBottom: '0.25rem' }}>{line}</div>
                      }
                      return <div key={i} style={{ marginBottom: '0.5rem' }}>{line}</div>
                    })}
                  </div>
                </div>

                <div style={{
                  background: '#1f2937',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  border: '1px solid #7c3aed'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#c4b5fd'
                  }}>
                    Code Examples
                  </h3>

                  {codeSections.length > 0 ? (
                    codeSections.map((section, idx) => (
                      <div key={idx} style={{ marginBottom: '1.5rem' }}>
                        <div
                          style={{
                            width: '100%',
                            padding: '1rem',
                            background: '#7c3aed',
                            color: 'white',
                            borderRadius: '8px 8px 0 0',
                            fontSize: '1rem',
                            fontWeight: '600',
                            textAlign: 'left'
                          }}
                        >
                          {section.title}
                        </div>
                        <div style={{
                          backgroundColor: '#1e293b',
                          borderRadius: '0 0 8px 8px',
                          overflow: 'hidden'
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
                            {section.code}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{
                      backgroundColor: '#1e293b',
                      borderRadius: '8px',
                      overflow: 'hidden'
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
                        {concepts[selectedConcept].codeExample}
                      </SyntaxHighlighter>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PythonRegex

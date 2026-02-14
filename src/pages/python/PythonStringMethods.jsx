import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function PythonStringMethods({ onBack, breadcrumb }) {
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
      name: 'Case Conversion',
      icon: '\uD83D\uDD24',
      explanation: `**Core Methods:**
\u2022 str.upper() \u2014 convert all characters to uppercase
\u2022 str.lower() \u2014 convert all characters to lowercase
\u2022 str.title() \u2014 capitalize the first letter of each word
\u2022 str.capitalize() \u2014 capitalize only the first character of the string
\u2022 str.swapcase() \u2014 swap uppercase to lowercase and vice versa
\u2022 str.casefold() \u2014 aggressive lowercase for case-insensitive comparison

**capitalize() vs title():**
\u2022 capitalize() only affects the very first character; the rest become lowercase
\u2022 title() capitalizes the first letter of every word
\u2022 "hello WORLD".capitalize() \u2192 "Hello world"
\u2022 "hello WORLD".title() \u2192 "Hello World"

**casefold() vs lower():**
\u2022 casefold() is more aggressive than lower()
\u2022 Handles special Unicode cases (e.g., German \u00DF)
\u2022 "\u00DF".casefold() \u2192 "ss" but "\u00DF".lower() \u2192 "\u00DF"
\u2022 Always prefer casefold() for case-insensitive comparisons

**Key Points:**
\u2022 All methods return a new string (strings are immutable)
\u2022 Time complexity: O(n) where n is string length
\u2022 Space complexity: O(n) for the new string
\u2022 isupper() / islower() check current case without modifying`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Basic case methods
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
text = "hello WORLD python"

print(text.upper())       # "HELLO WORLD PYTHON"
print(text.lower())       # "hello world python"
print(text.title())       # "Hello World Python"
print(text.capitalize())  # "Hello world python"
print(text.swapcase())    # "HELLO world PYTHON"

# Check current case
print("HELLO".isupper())  # True
print("hello".islower())  # True
print("Hello".isupper())  # False
print("Hello".islower())  # False

# Numbers and symbols are unaffected
print("abc123!@#".upper())  # "ABC123!@#"
print("ABC123!@#".lower())  # "abc123!@#"


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 capitalize() vs title()
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# capitalize(): ONLY first character uppercased, rest lowercased
print("hello WORLD".capitalize())     # "Hello world"
print("HELLO WORLD".capitalize())     # "Hello world"
print("  hello world".capitalize())   # "  hello world" (space is first char!)

# title(): First letter of EACH word uppercased
print("hello world python".title())   # "Hello World Python"
print("it's a test".title())          # "It'S A Test" (watch out!)
print("hello-world".title())          # "Hello-World" (hyphen = word boundary)

# title() gotcha with apostrophes
# title() treats any non-alpha char as a word boundary
text = "they're bill's friends"
print(text.title())                    # "They'Re Bill'S Friends"

# Better title case using string.capwords()
import string
print(string.capwords(text))           # "They're Bill's Friends"


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 casefold() for comparison
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# casefold() is more aggressive than lower()
# Handles Unicode case folding rules
print("Python".casefold())       # "python"
print("PYTHON".casefold())       # "python"

# German sharp s (where casefold differs from lower)
sharp_s = "\u00df"                       # German sharp s
print(sharp_s.lower())              # "\u00df" (unchanged)
print(sharp_s.casefold())           # "ss" (folded to "ss")

# Case-insensitive comparison: always use casefold()
s1 = "Stra\u00dfe"                       # German for "street"
s2 = "STRASSE"
print(s1.lower() == s2.lower())     # False!
print(s1.casefold() == s2.casefold())  # True!

# Case-insensitive search
def case_insensitive_in(needle, haystack):
    return needle.casefold() in haystack.casefold()

print(case_insensitive_in("python", "I Love PYTHON"))  # True


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Practical examples
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Normalize user input
user_input = "  JoHn DoE  "
normalized = user_input.strip().title()
print(normalized)  # "John Doe"

# Normalize list of names
names = ["john DOE", "JANE smith", "bob JONES"]
normalized_names = [name.strip().title() for name in names]
print(normalized_names)  # ['John Doe', 'Jane Smith', 'Bob Jones']

# Case-insensitive dictionary lookup
config = {"database": "postgres", "host": "localhost"}

def get_config(key, config_dict):
    key_lower = key.casefold()
    for k, v in config_dict.items():
        if k.casefold() == key_lower:
            return v
    return None

print(get_config("DATABASE", config))  # "postgres"

# Validate password requirements
password = "MyPassword123"
has_upper = any(c.isupper() for c in password)
has_lower = any(c.islower() for c in password)
print(f"Has upper: {has_upper}, Has lower: {has_lower}")  # True, True

# Acronym generator
phrase = "Application Programming Interface"
acronym = "".join(word[0].upper() for word in phrase.split())
print(acronym)  # "API"`
    },
    {
      name: 'Search & Find',
      icon: '\uD83D\uDD0D',
      explanation: `**Finding Substrings:**
\u2022 str.find(sub[, start[, end]]) \u2014 returns lowest index of sub, or -1 if not found
\u2022 str.rfind(sub[, start[, end]]) \u2014 returns highest index of sub, or -1 if not found
\u2022 str.index(sub[, start[, end]]) \u2014 like find(), but raises ValueError if not found
\u2022 str.rindex(sub[, start[, end]]) \u2014 like rfind(), but raises ValueError if not found

**Counting:**
\u2022 str.count(sub[, start[, end]]) \u2014 count non-overlapping occurrences of sub

**Prefix / Suffix Checks:**
\u2022 str.startswith(prefix[, start[, end]]) \u2014 True if string starts with prefix
\u2022 str.endswith(suffix[, start[, end]]) \u2014 True if string ends with suffix
\u2022 Both accept a tuple of strings to check multiple options

**Membership:**
\u2022 sub in str \u2014 True if sub is found anywhere in str (fastest for simple checks)

**find() vs index():**
\u2022 find() returns -1 on failure (safe, no exception)
\u2022 index() raises ValueError on failure (use when absence is an error)
\u2022 Prefer find() when you expect the substring might not exist

**Performance:**
\u2022 find/index/count: O(n*m) worst case, where n = string length, m = substring length
\u2022 "in" operator: O(n*m) worst case
\u2022 startswith/endswith: O(m) where m = prefix/suffix length`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 find() vs index()
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
text = "hello world, hello python"

# find() returns -1 if not found (safe)
print(text.find('hello'))      # 0 (first occurrence)
print(text.find('world'))      # 6
print(text.find('java'))       # -1 (not found)

# find() with start position
print(text.find('hello', 1))   # 13 (skips first, finds second)
print(text.find('hello', 5))   # 13

# find() with start and end
print(text.find('hello', 0, 5))  # 0 (found within range)
print(text.find('hello', 5, 12)) # -1 (not in range)

# index() raises ValueError if not found
print(text.index('world'))     # 6
# text.index('java')           # ValueError: substring not found

# Safe pattern with index: check first
substring = 'python'
if substring in text:
    pos = text.index(substring)
    print(f"Found '{substring}' at position {pos}")  # Found 'python' at 19

# Practical: extract text between delimiters
def extract_between(text, start_delim, end_delim):
    start = text.find(start_delim)
    if start == -1:
        return None
    start += len(start_delim)
    end = text.find(end_delim, start)
    if end == -1:
        return None
    return text[start:end]

html = "<title>My Page</title>"
print(extract_between(html, "<title>", "</title>"))  # "My Page"


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 rfind() & rindex()
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
text = "hello world, hello python, hello again"

# rfind() searches from the right (returns last occurrence)
print(text.rfind('hello'))     # 27 (last occurrence)
print(text.find('hello'))      # 0  (first occurrence)

# rfind() with bounds
print(text.rfind('hello', 0, 20))  # 13

# rindex() raises ValueError if not found
print(text.rindex('hello'))    # 27

# Practical: get file extension
filename = "archive.backup.tar.gz"
dot_pos = filename.rfind('.')
extension = filename[dot_pos + 1:] if dot_pos != -1 else ""
print(f"Extension: {extension}")  # "gz"

# Get filename without path
path = "/home/user/documents/report.pdf"
slash_pos = path.rfind('/')
name = path[slash_pos + 1:] if slash_pos != -1 else path
print(f"Filename: {name}")  # "report.pdf"

# Find all occurrences using a loop
def find_all(text, substring):
    positions = []
    start = 0
    while True:
        pos = text.find(substring, start)
        if pos == -1:
            break
        positions.append(pos)
        start = pos + 1  # Move past current match
    return positions

print(find_all("abcabcabc", "abc"))  # [0, 3, 6]
print(find_all(text, "hello"))       # [0, 13, 27]


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 count()
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
text = "banana"

# Count non-overlapping occurrences
print(text.count('a'))         # 3
print(text.count('an'))        # 2
print(text.count('ana'))       # 1 (non-overlapping!)

# Count with start and end
print(text.count('a', 2))      # 2 (from index 2 onward)
print(text.count('a', 2, 5))   # 2 (from index 2 to 4)

# Word frequency counter
sentence = "the cat sat on the mat the cat"
words = sentence.split()
word_counts = {}
for word in words:
    word_counts[word] = words.count(word)
print(word_counts)
# {'the': 3, 'cat': 2, 'sat': 1, 'on': 1, 'mat': 1}

# Better: use collections.Counter
from collections import Counter
print(Counter(words))
# Counter({'the': 3, 'cat': 2, 'sat': 1, 'on': 1, 'mat': 1})

# Count vowels in a string
def count_vowels(text):
    return sum(text.lower().count(v) for v in 'aeiou')

print(count_vowels("Hello World"))  # 3


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 startswith() & endswith()
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
filename = "report_2024.pdf"

# Basic usage
print(filename.startswith("report"))   # True
print(filename.endswith(".pdf"))       # True
print(filename.endswith(".txt"))       # False

# Check multiple prefixes/suffixes with a TUPLE
url = "https://api.example.com"
is_secure = url.startswith(('https://', 'ftps://'))
print(is_secure)  # True

image = "photo.jpg"
is_image = image.endswith(('.jpg', '.png', '.gif', '.webp'))
print(is_image)  # True

# With start/end parameters
text = "Hello, World!"
print(text.startswith("World", 7))     # True (check from index 7)
print(text.endswith("Hello", 0, 5))    # True (check slice [0:5])

# Filter files by extension
files = ["main.py", "test.py", "readme.md", "config.json", "app.js"]
python_files = [f for f in files if f.endswith('.py')]
print(python_files)  # ['main.py', 'test.py']

# Filter URLs by protocol
urls = [
    "https://google.com", "http://example.com",
    "ftp://files.server.com", "https://api.service.io"
]
secure = [u for u in urls if u.startswith('https://')]
print(secure)  # ['https://google.com', 'https://api.service.io']

# Case-insensitive startswith
def istartswith(text, prefix):
    return text.casefold().startswith(prefix.casefold())

print(istartswith("Hello World", "HELLO"))  # True`
    },
    {
      name: 'Strip & Trim',
      icon: '\u2702\uFE0F',
      explanation: `**Whitespace Removal:**
\u2022 str.strip() \u2014 remove leading and trailing whitespace
\u2022 str.lstrip() \u2014 remove leading (left) whitespace only
\u2022 str.rstrip() \u2014 remove trailing (right) whitespace only

**Character Removal:**
\u2022 str.strip(chars) \u2014 remove any characters in chars from both ends
\u2022 str.lstrip(chars) \u2014 remove from left end only
\u2022 str.rstrip(chars) \u2014 remove from right end only
\u2022 Note: chars is a SET of characters, not a prefix/suffix!

**Prefix/Suffix Removal (Python 3.9+):**
\u2022 str.removeprefix(prefix) \u2014 remove exact prefix string (not character set)
\u2022 str.removesuffix(suffix) \u2014 remove exact suffix string (not character set)

**strip(chars) vs removeprefix():**
\u2022 strip('abc') removes any of 'a', 'b', 'c' from ends
\u2022 removeprefix('abc') removes the exact string 'abc' from start
\u2022 "abcxyz".strip('abc') \u2192 "xyz" (removes a, b, c individually)
\u2022 "abcxyz".removeprefix('abc') \u2192 "xyz" (removes 'abc' as a whole)

**Key Points:**
\u2022 Whitespace includes: space, tab (\\t), newline (\\n), carriage return (\\r)
\u2022 strip() does NOT affect whitespace in the middle of the string
\u2022 All methods return new strings (immutable originals)
\u2022 Time: O(n), Space: O(n)`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Basic strip methods
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
text = "   hello world   "

# strip() removes whitespace from BOTH ends
print(f"'{text.strip()}'")        # 'hello world'

# lstrip() removes from LEFT only
print(f"'{text.lstrip()}'")       # 'hello world   '

# rstrip() removes from RIGHT only
print(f"'{text.rstrip()}'")       # '   hello world'

# Middle whitespace is NEVER affected
text2 = "  hello   world  "
print(f"'{text2.strip()}'")       # 'hello   world'

# Whitespace includes spaces, tabs, newlines
mixed = "\\n\\thello world\\n\\t"
print(f"'{mixed.strip()}'")       # 'hello world'

# Empty or all-whitespace strings
print(f"'{' '.strip()}'")         # ''
print(f"'{''.strip()}'")          # ''
print(f"'{'\\n\\t\\r'.strip()}'")   # ''


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Strip specific chars
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Strip specific characters (acts as a SET, not a substring!)
print("***hello***".strip('*'))        # "hello"
print("---hello---".strip('-'))        # "hello"
print("##hello##".lstrip('#'))         # "hello##"
print("##hello##".rstrip('#'))         # "##hello"

# Multiple character types: removes ANY of the chars
print("---###hello###---".strip('-#'))  # "hello"
print("abcxyzabc".strip('abc'))         # "xyz"

# IMPORTANT: strip(chars) removes individual characters, NOT a sequence
# This is a common gotcha!
print("abcba".strip('abc'))            # "" (removes a, b, c from ends)
print("abcxabc".strip('abc'))          # "x"

# Stripping brackets and quotes
print("(hello)".strip('()'))           # "hello"
print('"quoted text"'.strip('"'))      # "quoted text"
print("'single'".strip("'"))          # "single"

# Stripping punctuation from ends
text = "...Hello, World!..."
print(text.strip('.'))                  # "Hello, World!"
import string
print(text.strip(string.punctuation))  # "Hello, World"


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 removeprefix/removesuffix
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Python 3.9+ methods that remove EXACT prefix/suffix strings

# removeprefix() - remove exact prefix
print("TestCase".removeprefix("Test"))     # "Case"
print("TestCase".removeprefix("test"))     # "TestCase" (case-sensitive!)
print("TestCase".removeprefix("ABC"))      # "TestCase" (no match, unchanged)

# removesuffix() - remove exact suffix
print("report.txt".removesuffix(".txt"))   # "report"
print("report.txt".removesuffix(".pdf"))   # "report.txt" (no match)
print("archive.tar.gz".removesuffix(".gz"))  # "archive.tar"

# Contrast with strip() behavior
text = "httpserver"
print(text.strip("htp"))             # "server" (strips h, t, p chars)
print(text.removeprefix("http"))     # "server" (strips exact "http")

# strip() can over-strip!
url = "https://example.com"
# BAD: strip removes individual chars, not the whole prefix
print(url.lstrip("htps:/"))          # "example.com" (works by accident)
# But this fails:
url2 = "https://shop.example.com"
print(url2.lstrip("htps:/"))         # "op.example.com" (removed 'sh' too!)

# GOOD: removeprefix is exact
print(url2.removeprefix("https://"))  # "shop.example.com" (correct!)

# Pre-3.9 equivalent
def removeprefix(text, prefix):
    if text.startswith(prefix):
        return text[len(prefix):]
    return text

def removesuffix(text, suffix):
    if suffix and text.endswith(suffix):
        return text[:-len(suffix)]
    return text


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Common use cases
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Clean user input
email = "  user@example.com  "
clean_email = email.strip().lower()
print(clean_email)  # "user@example.com"

# Clean CSV data
csv_row = "  John Doe  ,  30  ,  Engineer  "
fields = [field.strip() for field in csv_row.split(',')]
print(fields)  # ['John Doe', '30', 'Engineer']

# Clean lines from a file
raw_lines = ["  line 1\\n", "  line 2  \\n", "\\tline 3\\n"]
clean_lines = [line.strip() for line in raw_lines]
print(clean_lines)  # ['line 1', 'line 2', 'line 3']

# Check if string is blank (empty or only whitespace)
def is_blank(s):
    return len(s.strip()) == 0

print(is_blank("   "))     # True
print(is_blank(" hi "))    # False
print(is_blank(""))         # True

# Remove BOM (Byte Order Mark) from file content
content = "\\ufeffHello World"
clean = content.lstrip("\\ufeff")
print(clean)  # "Hello World"

# Strip and validate
def clean_and_validate(value, max_length=100):
    cleaned = value.strip()
    if not cleaned:
        raise ValueError("Value cannot be empty")
    if len(cleaned) > max_length:
        raise ValueError(f"Value exceeds {max_length} characters")
    return cleaned

print(clean_and_validate("  hello  "))  # "hello"`
    },
    {
      name: 'Split & Join',
      icon: '\uD83D\uDD17',
      explanation: `**Splitting Strings:**
\u2022 str.split(sep=None, maxsplit=-1) \u2014 split on separator, default whitespace
\u2022 str.rsplit(sep=None, maxsplit=-1) \u2014 split from the right
\u2022 str.splitlines(keepends=False) \u2014 split on line boundaries
\u2022 str.partition(sep) \u2014 split into (before, sep, after) at first occurrence
\u2022 str.rpartition(sep) \u2014 split into (before, sep, after) at last occurrence

**Joining Strings:**
\u2022 str.join(iterable) \u2014 join elements of iterable with str as separator

**split() Behavior:**
\u2022 No args: splits on ANY whitespace, removes empty strings
\u2022 With sep: splits on exact sep, keeps empty strings
\u2022 "a  b".split() \u2192 ['a', 'b'] (whitespace collapsed)
\u2022 "a  b".split(' ') \u2192 ['a', '', 'b'] (empty string preserved)

**partition() vs split():**
\u2022 partition() always returns exactly 3 elements
\u2022 split() returns variable-length list
\u2022 partition() is ideal for key=value parsing

**Performance:**
\u2022 split(): O(n) time, O(n) space
\u2022 join(): O(n) time where n = total length of all strings
\u2022 join() is much faster than string concatenation in a loop`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 split() basics
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Default split: splits on ANY whitespace, removes empties
text = "  hello   world   python  "
print(text.split())       # ['hello', 'world', 'python']

# Split on specific delimiter
csv = "Alice,Bob,Charlie,Diana"
names = csv.split(',')
print(names)              # ['Alice', 'Bob', 'Charlie', 'Diana']

# KEY DIFFERENCE: split() vs split(' ')
text2 = "a  b  c"
print(text2.split())      # ['a', 'b', 'c'] (collapses whitespace)
print(text2.split(' '))   # ['a', '', 'b', '', 'c'] (preserves empties)

# Split with maxsplit
text3 = "one:two:three:four:five"
print(text3.split(':', 2))     # ['one', 'two', 'three:four:five']
print(text3.split(':', 1))     # ['one', 'two:three:four:five']

# splitlines() for multi-line text
multiline = "Line 1\\nLine 2\\nLine 3"
print(multiline.splitlines())           # ['Line 1', 'Line 2', 'Line 3']
print(multiline.splitlines(keepends=True))
# ['Line 1\\n', 'Line 2\\n', 'Line 3']

# splitlines handles various line endings
mixed_endings = "Line1\\nLine2\\r\\nLine3\\rLine4"
print(mixed_endings.splitlines())
# ['Line1', 'Line2', 'Line3', 'Line4']


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Advanced split
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# rsplit() - split from the right
path = "/usr/local/bin/python3"
print(path.rsplit('/', 1))     # ['/usr/local/bin', 'python3']
print(path.split('/', 1))      # ['', 'usr/local/bin/python3']

# Practical: get directory and filename
dir_path, filename = path.rsplit('/', 1)
print(f"Dir: {dir_path}, File: {filename}")

# Parse URL protocol
url = "https://www.example.com/path/to/page"
protocol, rest = url.split('://', 1)
print(f"Protocol: {protocol}")   # "https"
print(f"Rest: {rest}")           # "www.example.com/path/to/page"

# Unpack split results
first, *middle, last = "one two three four five".split()
print(f"First: {first}")     # "one"
print(f"Middle: {middle}")   # ['two', 'three', 'four']
print(f"Last: {last}")       # "five"

# Parse key=value configuration
config_line = "database = postgresql"
key, _, value = config_line.partition('=')
print(f"Key: '{key.strip()}', Value: '{value.strip()}'")

# Parse multiple key=value pairs
config_text = "host=localhost;port=5432;db=myapp"
pairs = config_text.split(';')
config = dict(pair.split('=') for pair in pairs)
print(config)  # {'host': 'localhost', 'port': '5432', 'db': 'myapp'}


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 join() patterns
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# join() is called on the SEPARATOR string
words = ['Python', 'is', 'awesome']
print(' '.join(words))          # "Python is awesome"
print(', '.join(words))         # "Python, is, awesome"
print(' -> '.join(words))       # "Python -> is -> awesome"
print(''.join(words))           # "Pythonisawesome"

# join() requires all elements to be strings
nums = [1, 2, 3, 4, 5]
# ', '.join(nums)              # TypeError!
print(', '.join(str(n) for n in nums))   # "1, 2, 3, 4, 5"
print(', '.join(map(str, nums)))         # "1, 2, 3, 4, 5"

# Build CSV row
fields = ['Alice', '30', 'Engineer', 'NYC']
csv_line = ','.join(fields)
print(csv_line)  # "Alice,30,Engineer,NYC"

# Build file path
parts = ['home', 'user', 'documents', 'file.txt']
path = '/'.join(parts)
print(path)  # "home/user/documents/file.txt"

# Normalize whitespace (collapse multiple spaces)
messy = "  hello    world   python  "
clean = ' '.join(messy.split())
print(clean)  # "hello world python"

# Why join() is faster than + concatenation
# BAD: O(n^2) - creates a new string each iteration
result = ""
for word in words:
    result += word + " "

# GOOD: O(n) - join() is optimized
result = ' '.join(words)

# Reverse words in a string
text = "hello world python"
reversed_words = ' '.join(text.split()[::-1])
print(reversed_words)  # "python world hello"


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 partition()
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# partition() always returns a 3-tuple: (before, sep, after)
url = "https://example.com/path"
protocol, sep, rest = url.partition('://')
print(f"Protocol: {protocol}")  # "https"
print(f"Rest: {rest}")          # "example.com/path"

# rpartition() splits at LAST occurrence
path = "/usr/local/bin/python"
directory, sep, filename = path.rpartition('/')
print(f"Dir: {directory}")      # "/usr/local/bin"
print(f"File: {filename}")      # "python"

# If separator not found
text = "hello world"
before, sep, after = text.partition('xyz')
print(f"before='{before}', sep='{sep}', after='{after}'")
# before='hello world', sep='', after=''

# Parse HTTP header
header = "Content-Type: application/json; charset=utf-8"
name, _, value = header.partition(':')
print(f"Header: {name.strip()}")   # "Content-Type"
print(f"Value: {value.strip()}")   # "application/json; charset=utf-8"

# Get file extension using rpartition
def get_extension(filename):
    name, dot, ext = filename.rpartition('.')
    return ext if dot else ''

print(get_extension("report.pdf"))      # "pdf"
print(get_extension("archive.tar.gz"))  # "gz"
print(get_extension("README"))          # ""`
    },
    {
      name: 'Replace & Translate',
      icon: '\uD83D\uDD04',
      explanation: `**Replacement Methods:**
\u2022 str.replace(old, new[, count]) \u2014 replace occurrences of old with new
\u2022 count parameter limits number of replacements
\u2022 replace('old', '') effectively deletes all occurrences

**Translation Methods:**
\u2022 str.maketrans(x[, y[, z]]) \u2014 create translation table
\u2022 str.translate(table) \u2014 apply character-level translation
\u2022 Much faster than multiple replace() calls for character mapping

**maketrans() Forms:**
\u2022 maketrans(dict) \u2014 dict mapping ordinals/chars to replacements
\u2022 maketrans(from, to) \u2014 1-to-1 character mapping
\u2022 maketrans(from, to, delete) \u2014 mapping + characters to delete

**Tab Expansion:**
\u2022 str.expandtabs(tabsize=8) \u2014 replace tab characters with spaces

**Performance:**
\u2022 replace(): O(n*m) time, O(n) space
\u2022 translate(): O(n) time, O(n) space
\u2022 translate() is faster for single-character replacements
\u2022 Use translate() when mapping many characters simultaneously

**Key Points:**
\u2022 replace() works with substrings of any length
\u2022 translate() works with individual characters only
\u2022 Both return new strings (immutable originals)
\u2022 Chaining replace() calls can cause unintended interactions`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 replace() basics
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
text = "hello world, hello python"

# Replace ALL occurrences
print(text.replace('hello', 'hi'))
# "hi world, hi python"

# Replace with count limit
print(text.replace('hello', 'hi', 1))
# "hi world, hello python"  (only first replaced)

# Remove substring (replace with empty string)
print("hello-world-python".replace('-', ''))
# "helloworldpython"

# Remove all spaces
print("h e l l o".replace(' ', ''))
# "hello"

# Case-sensitive by default
print("Hello HELLO hello".replace("hello", "hi"))
# "Hello HELLO hi"  (only lowercase matched)

# Chain multiple replacements
text2 = "I love cats and dogs"
result = text2.replace('cats', 'birds').replace('dogs', 'fish')
print(result)  # "I love birds and fish"

# WARNING: chaining can cause issues!
text3 = "aaa"
# Swapping a and b:
result = text3.replace('a', 'b').replace('b', 'a')
print(result)  # "aaa" (NOT "bbb"!) - second replace undoes first!


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Advanced replace
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Multiple replacements using a dictionary
def multi_replace(text, replacements):
    for old, new in replacements.items():
        text = text.replace(old, new)
    return text

fixes = {'colour': 'color', 'favourite': 'favorite', 'honour': 'honor'}
british = "My favourite colour brings honour"
american = multi_replace(british, fixes)
print(american)  # "My favorite color brings honor"

# Safe swap using a temporary placeholder
def safe_swap(text, a, b):
    placeholder = "\\x00SWAP\\x00"  # Unlikely to appear in text
    return text.replace(a, placeholder).replace(b, a).replace(placeholder, b)

print(safe_swap("cats and dogs", "cats", "dogs"))
# "dogs and cats"

# Escape HTML entities
def escape_html(text):
    return (text
        .replace('&', '&amp;')     # Must be first!
        .replace('<', '&lt;')
        .replace('>', '&gt;')
        .replace('"', '&quot;')
        .replace("'", '&#39;'))

print(escape_html('<script>alert("XSS")</script>'))
# &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;

# Normalize line endings
def normalize_newlines(text):
    return text.replace('\\r\\n', '\\n').replace('\\r', '\\n')

mixed = "line1\\r\\nline2\\rline3\\nline4"
print(normalize_newlines(mixed).splitlines())
# ['line1', 'line2', 'line3', 'line4']


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 translate() & maketrans()
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# maketrans(from, to) - 1-to-1 character mapping
# Both strings must be the same length!
table = str.maketrans('aeiou', '12345')
text = "hello world"
print(text.translate(table))  # "h2ll4 w4rld"

# maketrans with delete parameter (3rd argument)
# Characters in 3rd arg are deleted from result
table2 = str.maketrans('', '', 'aeiou')
print("hello world".translate(table2))  # "hll wrld"

# Remove all digits
remove_digits = str.maketrans('', '', '0123456789')
print("Order 12345 confirmed".translate(remove_digits))
# "Order  confirmed"

# Remove all punctuation
import string
remove_punct = str.maketrans('', '', string.punctuation)
print("Hello, World! How's it going?".translate(remove_punct))
# "Hello World Hows it going"

# maketrans with dictionary (most flexible form)
table3 = str.maketrans({
    'a': 'A',     # replace 'a' with 'A'
    'e': 'E',     # replace 'e' with 'E'
    'i': None,    # None = delete character
    'o': 'OO',    # can map to multi-char strings
})
print("hello".translate(table3))  # "hEllOO"

# ROT13 cipher
def rot13(text):
    lower = 'abcdefghijklmnopqrstuvwxyz'
    upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    rot_lower = lower[13:] + lower[:13]
    rot_upper = upper[13:] + upper[:13]
    table = str.maketrans(lower + upper, rot_lower + rot_upper)
    return text.translate(table)

print(rot13("Hello World"))   # "Uryyb Jbeyq"
print(rot13("Uryyb Jbeyq"))   # "Hello World" (self-inverse!)


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Practical transforms
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# expandtabs() - convert tabs to spaces
tsv = "Name\\tAge\\tCity"
print(tsv.expandtabs(8))      # "Name    Age     City"
print(tsv.expandtabs(12))     # "Name        Age         City"

# Align tabular data
rows = ["ID\\tName\\tScore", "1\\tAlice\\t95", "2\\tBob\\t87", "3\\tCharlie\\t92"]
for row in rows:
    print(row.expandtabs(12))
# ID          Name        Score
# 1           Alice       95
# 2           Bob         87
# 3           Charlie     92

# Slugify a string (for URLs)
def slugify(text):
    # Remove accents (simplified)
    table = str.maketrans('', '', string.punctuation)
    clean = text.translate(table).strip().lower()
    return '-'.join(clean.split())

print(slugify("Hello, World! This is a Test"))
# "hello-world-this-is-a-test"

# Clean text for indexing
def clean_for_search(text):
    # Remove punctuation, lowercase, normalize whitespace
    remove_punct = str.maketrans('', '', string.punctuation)
    return ' '.join(text.translate(remove_punct).lower().split())

print(clean_for_search("Hello, World! It's a GREAT day."))
# "hello world its a great day"

# Convert snake_case to camelCase
def snake_to_camel(name):
    parts = name.split('_')
    return parts[0] + ''.join(word.capitalize() for word in parts[1:])

print(snake_to_camel("get_user_name"))  # "getUserName"
print(snake_to_camel("my_variable"))    # "myVariable"`
    },
    {
      name: 'Validation & Formatting',
      icon: '\uD83D\uDCDD',
      explanation: `**Type Checking Methods:**
\u2022 str.isdigit() \u2014 True if all chars are digits (0-9, superscripts, etc.)
\u2022 str.isdecimal() \u2014 True if all chars are decimal digits (0-9 only)
\u2022 str.isnumeric() \u2014 True if all chars are numeric (digits, fractions, etc.)
\u2022 str.isalpha() \u2014 True if all chars are alphabetic (letters only)
\u2022 str.isalnum() \u2014 True if all chars are alphanumeric (letters or digits)
\u2022 str.isspace() \u2014 True if all chars are whitespace
\u2022 str.isidentifier() \u2014 True if valid Python identifier

**isdigit() vs isdecimal() vs isnumeric():**
\u2022 isdecimal(): most restrictive \u2014 only 0-9
\u2022 isdigit(): also includes superscripts (\u00B2, \u00B3) and subscripts
\u2022 isnumeric(): most permissive \u2014 includes fractions (\u00BD), roman numerals, etc.
\u2022 None handle negative numbers ("-1"), decimals ("1.5"), or spaces ("1 2")

**Alignment & Padding:**
\u2022 str.center(width[, fillchar]) \u2014 center within width
\u2022 str.ljust(width[, fillchar]) \u2014 left-justify within width
\u2022 str.rjust(width[, fillchar]) \u2014 right-justify within width
\u2022 str.zfill(width) \u2014 pad with zeros on the left

**Formatting:**
\u2022 f"..." \u2014 f-strings (Python 3.6+, recommended)
\u2022 str.format() \u2014 format method with placeholders
\u2022 Format specs: :.2f (decimals), :,d (thousands), :>10 (alignment)

**Key Points:**
\u2022 All is*() methods return False for empty strings
\u2022 zfill() preserves sign: "-42".zfill(5) \u2192 "-0042"
\u2022 f-strings support arbitrary expressions inside {}`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Type checking methods
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# isdigit() vs isdecimal() vs isnumeric()
print("123".isdigit())       # True
print("123".isdecimal())     # True
print("123".isnumeric())     # True

# Superscript digits: isdigit yes, isdecimal no
print("\u00b2\u00b3".isdigit())        # True  (superscript 2, 3)
print("\u00b2\u00b3".isdecimal())      # False
print("\u00b2\u00b3".isnumeric())      # True

# Fractions: only isnumeric
print("\u00bd".isnumeric())        # True  (fraction 1/2)
print("\u00bd".isdigit())          # False
print("\u00bd".isdecimal())        # False

# Common gotchas - these all return False!
print("123.45".isdigit())    # False (period)
print("-123".isdigit())      # False (minus sign)
print("12 34".isdigit())     # False (space)
print("".isdigit())          # False (empty string)

# isalpha() - letters only (including Unicode letters)
print("hello".isalpha())     # True
print("Hello".isalpha())     # True
print("hello123".isalpha())  # False (digits)
print("hello world".isalpha())  # False (space)

# isalnum() - letters OR digits
print("hello123".isalnum())  # True
print("hello".isalnum())     # True
print("123".isalnum())       # True
print("hello_123".isalnum()) # False (underscore)

# isspace() - whitespace only
print("   ".isspace())       # True
print(" \\t\\n ".isspace())   # True (tab + newline)
print(" a ".isspace())       # False


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Validation patterns
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Validate username: alphanumeric + underscore
def is_valid_username(username):
    if not username or len(username) < 3:
        return False
    return all(c.isalnum() or c == '_' for c in username)

print(is_valid_username("user_123"))    # True
print(is_valid_username("user-name"))   # False (hyphen)
print(is_valid_username("ab"))          # False (too short)

# Validate password strength
def check_password(password):
    if len(password) < 8:
        return False, "Must be at least 8 characters"
    checks = {
        'uppercase': any(c.isupper() for c in password),
        'lowercase': any(c.islower() for c in password),
        'digit': any(c.isdigit() for c in password),
        'special': any(not c.isalnum() for c in password)
    }
    missing = [k for k, v in checks.items() if not v]
    if missing:
        return False, f"Missing: {', '.join(missing)}"
    return True, "Strong password"

print(check_password("MyP@ss123"))   # (True, 'Strong password')
print(check_password("password"))    # (False, 'Missing: uppercase, digit, special')

# Check if string can be converted to number
def is_number(s):
    """Check if string represents a valid number (int or float)"""
    try:
        float(s)
        return True
    except ValueError:
        return False

print(is_number("123"))       # True
print(is_number("12.5"))      # True
print(is_number("-3.14"))     # True
print(is_number("1e10"))      # True (scientific notation)
print(is_number("abc"))       # False

# isidentifier() - valid Python variable name
print("my_var".isidentifier())     # True
print("_private".isidentifier())   # True
print("2fast".isidentifier())      # False (starts with digit)
print("my-var".isidentifier())     # False (hyphen)

# Check it's not a keyword too
import keyword
name = "class"
print(name.isidentifier() and not keyword.iskeyword(name))  # False


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Alignment & padding
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# ljust() - left justify (pad on right)
print("hello".ljust(10))          # "hello     "
print("hello".ljust(10, '.'))     # "hello....."

# rjust() - right justify (pad on left)
print("hello".rjust(10))          # "     hello"
print("hello".rjust(10, '.'))     # ".....hello"

# center() - center text
print("hello".center(11))         # "   hello   "
print("hello".center(11, '-'))    # "---hello---"
print("TITLE".center(30, '='))    # "============TITLE============="

# zfill() - zero padding (for numbers)
print("42".zfill(5))              # "00042"
print("3.14".zfill(7))            # "003.14"
print("-42".zfill(6))             # "-00042" (sign preserved!)

# Format a table
data = [
    ("Alice", 30, "Engineer"),
    ("Bob", 25, "Designer"),
    ("Charlotte", 35, "Manager")
]

headers = ("Name", "Age", "Role")
widths = (12, 5, 12)

# Print header
header = " | ".join(h.ljust(w) for h, w in zip(headers, widths))
print(header)
print("-" * len(header))

# Print rows
for name, age, role in data:
    row = f"{name.ljust(widths[0])} | {str(age).rjust(widths[1])} | {role.ljust(widths[2])}"
    print(row)
# Name         |   Age | Role
# --------------------------------
# Alice        |    30 | Engineer
# Bob          |    25 | Designer
# Charlotte    |    35 | Manager

# Zero-pad identifiers
for i in range(1, 6):
    print(f"INV-{str(i).zfill(6)}")
# INV-000001, INV-000002, ... INV-000005


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Format strings
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# f-strings (Python 3.6+) - RECOMMENDED
name, age = "Alice", 30
print(f"Name: {name}, Age: {age}")  # "Name: Alice, Age: 30"

# Expressions inside f-strings
x, y = 10, 20
print(f"{x} + {y} = {x + y}")      # "10 + 20 = 30"

# Number formatting
pi = 3.14159265359
print(f"Pi: {pi:.2f}")             # "Pi: 3.14"
print(f"Pi: {pi:.4f}")             # "Pi: 3.1416"

# Thousands separator
big = 1_000_000
print(f"Population: {big:,}")       # "Population: 1,000,000"
print(f"Population: {big:_}")       # "Population: 1_000_000"

# Percentage
ratio = 0.856
print(f"Score: {ratio:.1%}")        # "Score: 85.6%"

# Alignment with f-strings
print(f"{'left':<15}|")             # "left           |"
print(f"{'right':>15}|")            # "          right|"
print(f"{'center':^15}|")           # "    center     |"
print(f"{'padded':*^15}")           # "****padded*****"

# Zero-padding numbers
print(f"{42:05d}")                   # "00042"
print(f"{3.14:08.2f}")              # "00003.14"

# Debug mode (Python 3.8+)
value = 42
print(f"{value=}")                   # "value=42"
print(f"{value=:.2f}")              # "value=42.00"

# str.format() method (older style, still useful)
template = "Hello, {name}! You are {age} years old."
print(template.format(name="Bob", age=25))

# Positional args with format()
print("{0} {1} {0}".format("hello", "world"))
# "hello world hello"

# Format spec with format()
print("Pi is {:.4f}".format(3.14159))  # "Pi is 3.1416"
print("{:>10}".format("right"))        # "     right"`
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
              background: 'linear-gradient(to right, #f97316, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {'\uD83D\uDCDD'} String Methods
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
          primaryColor={'#f97316'}
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
                border: '2px solid #f97316',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#f59e0b'
                e.currentTarget.style.transform = 'translateY(-0.5rem)'
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(249, 115, 22, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#f97316'
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
                color: '#fdba74'
              }}>
                {concept.name}
              </h3>
              <p style={{
                color: '#d1d5db',
                textAlign: 'left',
                fontSize: '0.875rem'
              }}>
                Click to explore string method concepts
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
              border: '2px solid #f97316',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <div style={{
                position: 'sticky',
                top: '0',
                background: 'linear-gradient(to right, #ea580c, #d97706)',
                padding: '1.5rem',
                borderTopLeftRadius: '0.75rem',
                borderTopRightRadius: '0.75rem',
                borderBottom: '2px solid #fb923c',
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
                  border: '1px solid #f97316'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#fdba74'
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
                        return <div key={i} style={{ fontWeight: '700', color: '#fdba74', marginTop: i > 0 ? '1rem' : 0, marginBottom: '0.5rem' }}>{text}</div>
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
                  border: '1px solid #f97316'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#fdba74'
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
                            background: 'linear-gradient(to right, #ea580c, #d97706)',
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

export default PythonStringMethods

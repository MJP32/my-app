import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function PythonDictOperations({ onBack, breadcrumb }) {
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
      name: 'Basic Access (get, keys, values, items)',
      icon: '\uD83D\uDD11',
      explanation: `**Core Concept:**
\u2022 get() retrieves values safely without raising KeyError
\u2022 keys(), values(), items() return dynamic view objects
\u2022 View objects reflect changes to the underlying dictionary
\u2022 Membership testing with \`in\` checks keys (not values)
\u2022 Direct bracket access d[key] raises KeyError if key is missing

**Method Signatures:**
\u2022 dict.get(key, default=None) \u2192 value or default
\u2022 dict.keys() \u2192 dict_keys view object
\u2022 dict.values() \u2192 dict_values view object
\u2022 dict.items() \u2192 dict_items view of (key, value) tuples

**View Objects:**
\u2022 They are live references, not static copies
\u2022 Support set operations (keys & other_keys)
\u2022 Iterable and support \`in\` membership testing
\u2022 Convert to list with list() if snapshot needed

**When to Use:**
\u2022 get() when key might not exist (avoids try/except)
\u2022 keys() for iterating or checking membership
\u2022 values() for aggregation (sum, min, max)
\u2022 items() for iterating over key-value pairs together`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Basic get()
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
user = {"name": "Alice", "age": 30, "city": "NYC"}

# Safe access with get() - returns None if key missing
print(user.get("name"))       # "Alice"
print(user.get("email"))      # None (no KeyError!)

# Compare with bracket access
# print(user["email"])        # KeyError: 'email'

# get() is equivalent to:
value = user["name"] if "name" in user else None
print(value)                  # "Alice"


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 View objects
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
scores = {"math": 95, "english": 88, "science": 92}

# keys() returns a view of all keys
print(scores.keys())          # dict_keys(['math', 'english', 'science'])
print(list(scores.keys()))    # ['math', 'english', 'science']

# values() returns a view of all values
print(scores.values())        # dict_values([95, 88, 92])
print(sum(scores.values()))   # 275 (can aggregate directly)

# items() returns a view of (key, value) tuples
print(scores.items())
# dict_items([('math', 95), ('english', 88), ('science', 92)])

# Views are LIVE - they reflect changes
keys_view = scores.keys()
scores["history"] = 78
print(list(keys_view))        # ['math', 'english', 'science', 'history']

# Iterate over items (most common pattern)
for subject, score in scores.items():
    print(f"{subject}: {score}")

# Set operations on keys views
other = {"math": 100, "art": 90}
print(scores.keys() & other.keys())   # {'math'} (intersection)
print(scores.keys() | other.keys())   # all keys combined (union)


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Default values
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
config = {"host": "localhost", "port": 8080}

# Provide a custom default when key is missing
timeout = config.get("timeout", 30)
print(timeout)                # 30 (default used)

# Useful for nested access patterns
data = {"users": {"alice": {"role": "admin"}}}
role = data.get("users", {}).get("alice", {}).get("role", "guest")
print(role)                   # "admin"

# Safe nested access without chained get()
missing = data.get("users", {}).get("bob", {}).get("role", "guest")
print(missing)                # "guest" (all defaults used)

# Common pattern: accumulate with get()
word = "mississippi"
freq = {}
for ch in word:
    freq[ch] = freq.get(ch, 0) + 1
print(freq)  # {'m': 1, 'i': 4, 's': 4, 'p': 2}


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Membership testing
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
inventory = {"apples": 5, "bananas": 3, "oranges": 8}

# 'in' checks KEYS by default (O(1) average)
print("apples" in inventory)        # True
print("grapes" in inventory)        # False
print("apples" not in inventory)    # False

# To check values, use .values()
print(5 in inventory.values())      # True
print(10 in inventory.values())     # False

# To check key-value pairs, use .items()
print(("apples", 5) in inventory.items())   # True
print(("apples", 3) in inventory.items())   # False

# Common guard pattern before access
if "apples" in inventory:
    print(f"We have {inventory['apples']} apples")

# Prefer get() over 'in' + bracket access
count = inventory.get("grapes", 0)  # Cleaner than if/else
print(f"Grapes: {count}")           # Grapes: 0`
    },
    {
      name: 'Modification (update, pop, setdefault)',
      icon: '\u270F\uFE0F',
      explanation: `**Core Concept:**
\u2022 update() merges another dict or iterable of key-value pairs
\u2022 pop(key) removes and returns value for key
\u2022 popitem() removes and returns last inserted (key, value) pair
\u2022 setdefault() gets value or inserts default if key is missing
\u2022 del statement removes a key (raises KeyError if missing)

**Method Signatures:**
\u2022 dict.update(other) \u2192 None (modifies in place)
\u2022 dict.pop(key, default) \u2192 value (removes key)
\u2022 dict.popitem() \u2192 (key, value) tuple (LIFO order)
\u2022 dict.setdefault(key, default=None) \u2192 value
\u2022 del dict[key] \u2192 None (raises KeyError)

**Key Differences:**
\u2022 update() overwrites existing keys with new values
\u2022 pop() with default never raises KeyError
\u2022 pop() without default raises KeyError if key missing
\u2022 setdefault() only sets if key does NOT already exist
\u2022 del is a statement, not a method

**Merge Operators (Python 3.9+):**
\u2022 d1 | d2 creates a new merged dict
\u2022 d1 |= d2 updates d1 in place`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 update() & merge operators
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
defaults = {"theme": "dark", "lang": "en", "font_size": 14}
user_prefs = {"theme": "light", "font_size": 16}

# update() modifies dict in place (user_prefs overrides defaults)
config = defaults.copy()       # Don't modify original
config.update(user_prefs)
print(config)
# {'theme': 'light', 'lang': 'en', 'font_size': 16}

# update() also accepts keyword arguments
config.update(notifications=True, lang="fr")
print(config)
# {'theme': 'light', 'lang': 'fr', 'font_size': 16, 'notifications': True}

# update() accepts iterable of key-value pairs
config.update([("debug", False), ("version", "2.0")])
print(config.get("version"))  # "2.0"

# Merge operator | creates NEW dict (Python 3.9+)
merged = defaults | user_prefs
print(merged)  # {'theme': 'light', 'lang': 'en', 'font_size': 16}
print(defaults)  # Original unchanged!

# In-place merge operator |=
defaults_copy = defaults.copy()
defaults_copy |= user_prefs
print(defaults_copy)  # Same as merged

# ** unpacking merge (works in all Python 3.x)
merged_alt = {**defaults, **user_prefs}
print(merged_alt)  # {'theme': 'light', 'lang': 'en', 'font_size': 16}


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 pop() & popitem()
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
cart = {"apple": 3, "banana": 2, "orange": 5, "grape": 1}

# pop(key) removes key and returns its value
removed = cart.pop("banana")
print(removed)         # 2
print(cart)            # {'apple': 3, 'orange': 5, 'grape': 1}

# pop(key, default) returns default if key missing (no error)
missing = cart.pop("mango", 0)
print(missing)         # 0

# pop(key) without default raises KeyError if key missing
# cart.pop("mango")   # KeyError: 'mango'

# popitem() removes and returns last inserted pair (LIFO in 3.7+)
last_item = cart.popitem()
print(last_item)       # ('grape', 1)
print(cart)            # {'apple': 3, 'orange': 5}

# popitem() on empty dict raises KeyError
# {}.popitem()         # KeyError: 'popitem(): dictionary is empty'

# Use pop() to move a key from one dict to another
source = {"a": 1, "b": 2, "c": 3}
dest = {}
dest["b"] = source.pop("b")
print(source)          # {'a': 1, 'c': 3}
print(dest)            # {'b': 2}


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 setdefault()
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# setdefault(key, default) gets value if exists, otherwise sets and returns default
user = {"name": "Alice", "age": 30}

# Key exists: returns existing value, does NOT overwrite
result = user.setdefault("name", "Unknown")
print(result)          # "Alice" (existing value returned)
print(user)            # {'name': 'Alice', 'age': 30} (unchanged)

# Key missing: inserts default and returns it
result = user.setdefault("email", "none@example.com")
print(result)          # "none@example.com"
print(user)            # {'name': 'Alice', 'age': 30, 'email': 'none@example.com'}

# Perfect for building grouped data structures
words = ["apple", "ant", "banana", "bat", "cherry"]
by_letter = {}
for word in words:
    by_letter.setdefault(word[0], []).append(word)
print(by_letter)
# {'a': ['apple', 'ant'], 'b': ['banana', 'bat'], 'c': ['cherry']}

# setdefault with no default uses None
d = {}
d.setdefault("key")
print(d)               # {'key': None}


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 del keyword
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
data = {"a": 1, "b": 2, "c": 3, "d": 4}

# del removes a specific key (raises KeyError if missing)
del data["b"]
print(data)            # {'a': 1, 'c': 3, 'd': 4}

# Safe deletion pattern with 'in' check
if "z" in data:
    del data["z"]
# Or just use pop with default
data.pop("z", None)    # Returns None, no error

# clear() removes ALL keys
temp = {"x": 1, "y": 2}
temp.clear()
print(temp)            # {}
print(type(temp))      # <class 'dict'> (still a dict, just empty)

# del vs pop: del has no return value, pop returns the value
info = {"name": "Bob", "role": "dev"}
role = info.pop("role")        # Returns "dev" and removes
del info["name"]               # Just removes, returns nothing
print(info)                    # {}`
    },
    {
      name: 'Creation Patterns',
      icon: '\uD83C\uDFD7\uFE0F',
      explanation: `**Core Concept:**
\u2022 Dict literal {} is the most common and fastest way
\u2022 dict() constructor accepts keyword args or iterables
\u2022 dict.fromkeys() creates dict from keys with shared default
\u2022 zip() pairs two sequences into key-value tuples for dict()
\u2022 Dict comprehension {k: v for ...} for computed dicts

**Creation Methods:**
\u2022 {} literal: {"a": 1, "b": 2}
\u2022 dict(): dict(a=1, b=2) or dict([("a", 1), ("b", 2)])
\u2022 fromkeys(): dict.fromkeys(["a", "b"], 0)
\u2022 zip: dict(zip(keys, values))
\u2022 comprehension: {x: x**2 for x in range(5)}

**fromkeys() Gotcha:**
\u2022 All keys share the SAME default object
\u2022 Mutable defaults (list, dict) are shared references
\u2022 Use comprehension instead for mutable defaults

**Performance:**
\u2022 Literal {} is fastest (compiled to BUILD_MAP opcode)
\u2022 dict() constructor has function call overhead
\u2022 Comprehension is fast and flexible
\u2022 fromkeys() is efficient for uniform initialization`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Literal & constructor
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Dict literal - most common and fastest
user = {"name": "Alice", "age": 30, "active": True}
print(user)  # {'name': 'Alice', 'age': 30, 'active': True}

# Empty dict
empty1 = {}
empty2 = dict()
print(empty1 == empty2)  # True

# dict() constructor with keyword arguments
# Keys must be valid Python identifiers (strings only)
settings = dict(theme="dark", font_size=14, debug=False)
print(settings)  # {'theme': 'dark', 'font_size': 14, 'debug': False}

# dict() from list of tuples
pairs = [("x", 10), ("y", 20), ("z", 30)]
coords = dict(pairs)
print(coords)  # {'x': 10, 'y': 20, 'z': 30}

# dict() from list of lists (any iterable of pairs)
matrix_labels = dict([["row", 3], ["col", 4]])
print(matrix_labels)  # {'row': 3, 'col': 4}

# Copying a dict
original = {"a": 1, "b": 2}
shallow_copy = dict(original)   # Same as original.copy()
print(shallow_copy)             # {'a': 1, 'b': 2}
print(shallow_copy is original) # False (different object)


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 fromkeys()
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Create dict with all keys set to same value
keys = ["a", "b", "c", "d"]
zeros = dict.fromkeys(keys, 0)
print(zeros)  # {'a': 0, 'b': 0, 'c': 0, 'd': 0}

# Default value is None if not specified
flags = dict.fromkeys(["read", "write", "execute"])
print(flags)  # {'read': None, 'write': None, 'execute': None}

# fromkeys() from a string (each char becomes a key)
vowels = dict.fromkeys("aeiou", True)
print(vowels)  # {'a': True, 'e': True, 'i': True, 'o': True, 'u': True}

# WARNING: Mutable default is SHARED across all keys!
# This is a common bug:
bad = dict.fromkeys(["a", "b", "c"], [])
bad["a"].append(1)
print(bad)  # {'a': [1], 'b': [1], 'c': [1]}  <- ALL changed!

# Fix: use dict comprehension for mutable defaults
good = {k: [] for k in ["a", "b", "c"]}
good["a"].append(1)
print(good)  # {'a': [1], 'b': [], 'c': []}  <- Only 'a' changed


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 From zip()
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Pair two parallel lists into a dictionary
names = ["Alice", "Bob", "Charlie"]
scores = [95, 87, 92]

student_scores = dict(zip(names, scores))
print(student_scores)  # {'Alice': 95, 'Bob': 87, 'Charlie': 92}

# zip() stops at shortest sequence (no error)
keys = ["a", "b", "c"]
vals = [1, 2]
print(dict(zip(keys, vals)))  # {'a': 1, 'b': 2}  ('c' dropped)

# Combine enumerate with dict for index mapping
fruits = ["apple", "banana", "cherry"]
index_map = dict(enumerate(fruits))
print(index_map)  # {0: 'apple', 1: 'banana', 2: 'cherry'}

# Reverse mapping (value -> index)
fruit_to_idx = {fruit: i for i, fruit in enumerate(fruits)}
print(fruit_to_idx)  # {'apple': 0, 'banana': 1, 'cherry': 2}

# Multiple parallel lists
headers = ["Name", "Age", "City"]
row = ["Alice", 30, "NYC"]
record = dict(zip(headers, row))
print(record)  # {'Name': 'Alice', 'Age': 30, 'City': 'NYC'}


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Dict comprehension
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Basic dict comprehension
squares = {x: x ** 2 for x in range(6)}
print(squares)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# From existing dict - transform values
prices = {"apple": 1.50, "banana": 0.75, "cherry": 3.00}
doubled = {k: v * 2 for k, v in prices.items()}
print(doubled)  # {'apple': 3.0, 'banana': 1.5, 'cherry': 6.0}

# From string - character frequency
word = "hello"
freq = {ch: word.count(ch) for ch in set(word)}
print(freq)  # {'h': 1, 'e': 1, 'l': 2, 'o': 1}

# Convert list of dicts to lookup dict
users = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"},
    {"id": 3, "name": "Charlie"}
]
user_lookup = {u["id"]: u["name"] for u in users}
print(user_lookup)  # {1: 'Alice', 2: 'Bob', 3: 'Charlie'}`
    },
    {
      name: 'Dict Comprehensions',
      icon: '\uD83D\uDD04',
      explanation: `**Core Concept:**
\u2022 Dict comprehensions build dicts from iterables with {k: v for ...}
\u2022 Support conditions with if clause for filtering
\u2022 Can transform both keys and values in one expression
\u2022 Can invert (swap keys and values) a dictionary
\u2022 Support nested iteration for cross-product dicts

**Syntax:**
\u2022 Basic: {key_expr: val_expr for item in iterable}
\u2022 Filter: {k: v for k, v in d.items() if condition}
\u2022 Nested: {(i,j): val for i in A for j in B}

**vs List Comprehension:**
\u2022 List: [x**2 for x in range(5)] \u2192 [0, 1, 4, 9, 16]
\u2022 Dict: {x: x**2 for x in range(5)} \u2192 {0:0, 1:1, ...}
\u2022 Both support if/else and nested loops

**Best Practices:**
\u2022 Keep comprehensions readable (< 1 line ideally)
\u2022 Use regular loops for complex logic
\u2022 Duplicate keys: last value wins
\u2022 Comprehension creates a new dict (never modifies original)`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Filter by condition
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
scores = {"Alice": 95, "Bob": 67, "Charlie": 82, "Diana": 91, "Eve": 58}

# Keep only passing scores (>= 70)
passing = {name: score for name, score in scores.items() if score >= 70}
print(passing)  # {'Alice': 95, 'Charlie': 82, 'Diana': 91}

# Filter by key condition
short_names = {k: v for k, v in scores.items() if len(k) <= 3}
print(short_names)  # {'Bob': 67, 'Eve': 58}

# Filter with if/else on values (conditional expression)
grades = {name: ("Pass" if score >= 70 else "Fail")
          for name, score in scores.items()}
print(grades)
# {'Alice': 'Pass', 'Bob': 'Fail', 'Charlie': 'Pass', 'Diana': 'Pass', 'Eve': 'Fail'}

# Multiple conditions
honor_roll = {name: score for name, score in scores.items()
              if score >= 90 and len(name) > 3}
print(honor_roll)  # {'Alice': 95, 'Diana': 91}

# Filter None values from a dict
data = {"a": 1, "b": None, "c": 3, "d": None, "e": 5}
cleaned = {k: v for k, v in data.items() if v is not None}
print(cleaned)  # {'a': 1, 'c': 3, 'e': 5}

# Select specific keys (like SQL SELECT)
full_record = {"name": "Alice", "age": 30, "email": "a@b.com", "phone": "555-1234"}
wanted = {"name", "email"}
subset = {k: v for k, v in full_record.items() if k in wanted}
print(subset)  # {'name': 'Alice', 'email': 'a@b.com'}


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Transform values
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
prices_usd = {"laptop": 999, "phone": 699, "tablet": 449}

# Convert currency (USD to EUR at 0.85)
prices_eur = {item: round(price * 0.85, 2)
              for item, price in prices_usd.items()}
print(prices_eur)  # {'laptop': 849.15, 'phone': 594.15, 'tablet': 381.65}

# Transform keys (uppercase)
upper_prices = {k.upper(): v for k, v in prices_usd.items()}
print(upper_prices)  # {'LAPTOP': 999, 'PHONE': 699, 'TABLET': 449}

# Apply function to values
temps_c = {"NYC": 22, "London": 18, "Tokyo": 28, "Sydney": 15}
temps_f = {city: round(c * 9/5 + 32, 1)
           for city, c in temps_c.items()}
print(temps_f)  # {'NYC': 71.6, 'London': 64.4, 'Tokyo': 82.4, 'Sydney': 59.0}

# Normalize values (0 to 1 range)
raw = {"a": 10, "b": 30, "c": 20, "d": 40}
max_val = max(raw.values())
normalized = {k: round(v / max_val, 2) for k, v in raw.items()}
print(normalized)  # {'a': 0.25, 'b': 0.75, 'c': 0.5, 'd': 1.0}

# Trim whitespace from string values
messy = {"name": "  Alice  ", "city": " NYC ", "role": "  admin"}
clean = {k: v.strip() for k, v in messy.items()}
print(clean)  # {'name': 'Alice', 'city': 'NYC', 'role': 'admin'}


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Invert dict
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Simple inversion: swap keys and values
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print(inverted)  # {1: 'a', 2: 'b', 3: 'c'}

# WARNING: If values aren't unique, last key wins
colors = {"red": "#FF0000", "crimson": "#DC143C", "scarlet": "#FF0000"}
# "#FF0000" maps to both "red" and "scarlet"
inv = {v: k for k, v in colors.items()}
print(inv)  # {'#FF0000': 'scarlet', '#DC143C': 'crimson'} <- 'red' lost!

# Safe inversion when values may repeat: collect all keys per value
from collections import defaultdict
color_groups = defaultdict(list)
for k, v in colors.items():
    color_groups[v].append(k)
print(dict(color_groups))
# {'#FF0000': ['red', 'scarlet'], '#DC143C': ['crimson']}

# One-liner safe inversion with comprehension
inv_safe = {}
for k, v in colors.items():
    inv_safe.setdefault(v, []).append(k)
print(inv_safe)  # {'#FF0000': ['red', 'scarlet'], '#DC143C': ['crimson']}

# Bidirectional mapping
codes = {"US": "United States", "UK": "United Kingdom", "FR": "France"}
bidir = {}
bidir.update(codes)
bidir.update({v: k for k, v in codes.items()})
print(bidir["US"])              # "United States"
print(bidir["United States"])   # "US"


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Nested comprehension
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Multiplication table as nested dict
times_table = {
    i: {j: i * j for j in range(1, 4)}
    for i in range(1, 4)
}
print(times_table)
# {1: {1: 1, 2: 2, 3: 3}, 2: {1: 2, 2: 4, 3: 6}, 3: {1: 3, 2: 6, 3: 9}}
print(times_table[2][3])  # 6

# Flatten nested dict
flat = {f"{i}x{j}": i*j for i in range(1, 4) for j in range(1, 4)}
print(flat)
# {'1x1': 1, '1x2': 2, '1x3': 3, '2x1': 2, '2x2': 4, ...}

# Cross-product mapping
sizes = ["S", "M", "L"]
colors_list = ["red", "blue"]
products = {f"{c}-{s}": 0 for c in colors_list for s in sizes}
print(products)
# {'red-S': 0, 'red-M': 0, 'red-L': 0, 'blue-S': 0, 'blue-M': 0, 'blue-L': 0}

# Transform nested structure
students = {
    "Alice": {"math": 90, "english": 85},
    "Bob": {"math": 78, "english": 92}
}
averages = {name: sum(grades.values()) / len(grades)
            for name, grades in students.items()}
print(averages)  # {'Alice': 87.5, 'Bob': 85.0}`
    },
    {
      name: 'Counting & Grouping',
      icon: '\uD83D\uDCCA',
      explanation: `**Core Concept:**
\u2022 Frequency counting maps elements to their occurrence count
\u2022 Grouping maps keys to lists of associated elements
\u2022 Python provides multiple tools: get(), Counter, defaultdict, setdefault
\u2022 Counter is the most Pythonic approach for counting
\u2022 defaultdict is the most Pythonic approach for grouping

**Counter (collections.Counter):**
\u2022 Specialized dict subclass for counting hashable objects
\u2022 Counter("aabbcc") \u2192 Counter({'a': 2, 'b': 2, 'c': 2})
\u2022 .most_common(n) returns top n elements
\u2022 Supports arithmetic: +, -, &, | between Counters
\u2022 .elements() returns an iterator over repeated elements

**defaultdict (collections.defaultdict):**
\u2022 Dict subclass with automatic default value factory
\u2022 defaultdict(int) auto-creates 0 for missing keys
\u2022 defaultdict(list) auto-creates [] for missing keys
\u2022 defaultdict(set) auto-creates set() for missing keys
\u2022 Eliminates need for key existence checks

**When to Use What:**
\u2022 Counter: frequency counting, top-N, histogram
\u2022 defaultdict(list): grouping items by category
\u2022 setdefault: grouping when defaultdict is overkill
\u2022 get(key, 0) + 1: simple counting without imports`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Manual counting
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Method 1: Using get() with default 0
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
freq = {}
for word in words:
    freq[word] = freq.get(word, 0) + 1
print(freq)  # {'apple': 3, 'banana': 2, 'cherry': 1}

# Method 2: Using if/else check
freq2 = {}
for word in words:
    if word in freq2:
        freq2[word] += 1
    else:
        freq2[word] = 1
print(freq2)  # Same result

# Character frequency in a string
text = "hello world"
char_freq = {}
for ch in text:
    if ch != ' ':  # Skip spaces
        char_freq[ch] = char_freq.get(ch, 0) + 1
print(char_freq)  # {'h': 1, 'e': 1, 'l': 3, 'o': 2, 'w': 1, 'r': 1, 'd': 1}

# Find the most frequent element manually
max_word = max(freq, key=freq.get)
print(f"Most common: {max_word} ({freq[max_word]} times)")  # apple (3)


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Counter
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
from collections import Counter

# Count from list
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counter = Counter(words)
print(counter)  # Counter({'apple': 3, 'banana': 2, 'cherry': 1})

# Count from string
letter_count = Counter("mississippi")
print(letter_count)
# Counter({'s': 4, 'i': 4, 'p': 2, 'm': 1})

# most_common(n) returns top n elements as list of tuples
print(counter.most_common(2))  # [('apple', 3), ('banana', 2)]
print(counter.most_common())   # All, sorted by frequency

# Counter arithmetic
c1 = Counter("aabbc")
c2 = Counter("abcdd")
print(c1 + c2)   # Counter({'a': 3, 'b': 3, 'c': 2, 'd': 2})
print(c1 - c2)   # Counter({'a': 1, 'b': 1})  (drops zero/negative)
print(c1 & c2)   # Counter({'a': 1, 'b': 1, 'c': 1})  (intersection min)
print(c1 | c2)   # Counter({'a': 2, 'b': 2, 'd': 2, 'c': 1})  (union max)

# Check if one is subset/superset (anagram check)
def is_anagram(s1, s2):
    return Counter(s1) == Counter(s2)

print(is_anagram("listen", "silent"))  # True
print(is_anagram("hello", "world"))    # False

# total() returns sum of all counts (Python 3.10+)
c = Counter("banana")
print(sum(c.values()))  # 6 (works in all versions)

# elements() iterator repeats each element by its count
print(list(Counter(a=2, b=3).elements()))
# ['a', 'a', 'b', 'b', 'b']


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 defaultdict grouping
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
from collections import defaultdict

# Group words by first letter
words = ["apple", "avocado", "banana", "blueberry", "cherry", "cranberry"]
by_letter = defaultdict(list)
for word in words:
    by_letter[word[0]].append(word)
print(dict(by_letter))
# {'a': ['apple', 'avocado'], 'b': ['banana', 'blueberry'], 'c': ['cherry', 'cranberry']}

# Group numbers by even/odd
nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
parity = defaultdict(list)
for n in nums:
    parity["even" if n % 2 == 0 else "odd"].append(n)
print(dict(parity))  # {'odd': [1, 3, 5, 7, 9], 'even': [2, 4, 6, 8, 10]}

# Group records by category
transactions = [
    {"category": "food", "amount": 25},
    {"category": "transport", "amount": 15},
    {"category": "food", "amount": 30},
    {"category": "entertainment", "amount": 50},
    {"category": "transport", "amount": 20},
]
by_category = defaultdict(list)
for tx in transactions:
    by_category[tx["category"]].append(tx["amount"])
print(dict(by_category))
# {'food': [25, 30], 'transport': [15, 20], 'entertainment': [50]}

# Aggregate: total per category
totals = {cat: sum(amounts) for cat, amounts in by_category.items()}
print(totals)  # {'food': 55, 'transport': 35, 'entertainment': 50}

# defaultdict(int) for counting (alternative to Counter)
freq = defaultdict(int)
for word in ["a", "b", "a", "c", "b", "a"]:
    freq[word] += 1
print(dict(freq))  # {'a': 3, 'b': 2, 'c': 1}

# defaultdict(set) for unique grouping
tags = defaultdict(set)
items = [("apple", "fruit"), ("carrot", "vegetable"),
         ("apple", "healthy"), ("carrot", "orange")]
for item, tag in items:
    tags[item].add(tag)
print(dict(tags))  # {'apple': {'fruit', 'healthy'}, 'carrot': {'vegetable', 'orange'}}


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 setdefault grouping
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# setdefault() is a stdlib-only alternative to defaultdict
# Good when you don't want to import collections

# Group words by length
words = ["hi", "hey", "hello", "go", "bye", "good"]
by_length = {}
for word in words:
    by_length.setdefault(len(word), []).append(word)
print(by_length)
# {2: ['hi', 'go'], 3: ['hey', 'bye'], 5: ['hello'], 4: ['good']}

# Build adjacency list for a graph
edges = [(1, 2), (1, 3), (2, 3), (3, 4), (4, 1)]
graph = {}
for src, dst in edges:
    graph.setdefault(src, []).append(dst)
    graph.setdefault(dst, []).append(src)  # Undirected
print(graph)
# {1: [2, 3, 4], 2: [1, 3], 3: [1, 2, 4], 4: [3, 1]}

# Index documents by word (inverted index)
docs = {1: "the cat sat", 2: "the dog ran", 3: "cat and dog"}
index = {}
for doc_id, text in docs.items():
    for word in text.split():
        index.setdefault(word, []).append(doc_id)
print(index)
# {'the': [1, 2], 'cat': [1, 3], 'sat': [1], 'dog': [2, 3], 'ran': [2], 'and': [3]}`
    },
    {
      name: 'Advanced Patterns',
      icon: '\uD83E\uDDE9',
      explanation: `**Core Concept:**
\u2022 Merging strategies for combining multiple dictionaries
\u2022 Nested dict access and deep operations
\u2022 Dispatch tables replace long if/elif chains
\u2022 Sorted iteration over dict by keys or values
\u2022 OrderedDict, ChainMap for specialized use cases

**Merge Strategies:**
\u2022 | operator: creates new dict (Python 3.9+)
\u2022 ** unpacking: {**d1, **d2} (all Python 3)
\u2022 update(): modifies in place
\u2022 ChainMap: logical merge without copying

**Dispatch Tables:**
\u2022 Map strings/values to functions
\u2022 Replaces if/elif/else chains
\u2022 Easy to extend without modifying logic
\u2022 Common in command processors and calculators

**Sorted Iteration:**
\u2022 sorted(d) sorts by keys
\u2022 sorted(d.items(), key=lambda x: x[1]) sorts by values
\u2022 Dict preserves insertion order (Python 3.7+)
\u2022 OrderedDict adds equality based on order

**Deep Operations:**
\u2022 copy() is shallow (nested dicts share references)
\u2022 copy.deepcopy() for fully independent nested copies
\u2022 Recursive merge for nested dict structures`,
      codeExample: `# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Merge strategies (|, **, update)
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
base = {"host": "localhost", "port": 5432, "db": "mydb"}
overrides = {"port": 3306, "user": "admin"}

# Method 1: | operator (Python 3.9+) - creates new dict
merged1 = base | overrides
print(merged1)
# {'host': 'localhost', 'port': 3306, 'db': 'mydb', 'user': 'admin'}

# Method 2: ** unpacking - creates new dict (all Python 3)
merged2 = {**base, **overrides}
print(merged2)  # Same as merged1

# Method 3: update() - modifies in place
merged3 = base.copy()
merged3.update(overrides)
print(merged3)  # Same result, but base is unchanged

# Merging multiple dicts at once
env = {"DEBUG": True}
merged_all = {**base, **overrides, **env}
print(merged_all)
# {'host': 'localhost', 'port': 3306, 'db': 'mydb', 'user': 'admin', 'DEBUG': True}

# ChainMap: logical merge without copying (lazy lookup)
from collections import ChainMap
chain = ChainMap(overrides, base)   # First dict has priority
print(chain["port"])     # 3306 (from overrides)
print(chain["host"])     # "localhost" (from base)
print(chain["user"])     # "admin" (from overrides)
print(dict(chain))       # Materialized merged dict

# Deep merge for nested dicts (recursive)
def deep_merge(base, override):
    """Recursively merge override into base"""
    result = base.copy()
    for key, value in override.items():
        if key in result and isinstance(result[key], dict) and isinstance(value, dict):
            result[key] = deep_merge(result[key], value)
        else:
            result[key] = value
    return result

config1 = {"db": {"host": "localhost", "port": 5432}, "debug": False}
config2 = {"db": {"port": 3306, "name": "prod"}, "debug": True}
print(deep_merge(config1, config2))
# {'db': {'host': 'localhost', 'port': 3306, 'name': 'prod'}, 'debug': True}


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Nested access
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Deeply nested dict access
api_response = {
    "data": {
        "users": [
            {"id": 1, "profile": {"name": "Alice", "settings": {"theme": "dark"}}},
            {"id": 2, "profile": {"name": "Bob", "settings": {"theme": "light"}}}
        ],
        "meta": {"total": 2, "page": 1}
    }
}

# Direct access (risky - may raise KeyError or TypeError)
theme = api_response["data"]["users"][0]["profile"]["settings"]["theme"]
print(theme)  # "dark"

# Safe access with chained get()
safe = api_response.get("data", {}).get("users", [{}])[0]
safe = safe.get("profile", {}).get("settings", {}).get("theme", "default")
print(safe)  # "dark"

# Helper function for deep access by path
def deep_get(d, path, default=None):
    """Access nested dict by dot-separated path"""
    keys = path.split(".")
    for key in keys:
        if isinstance(d, dict):
            d = d.get(key, default)
        else:
            return default
    return d

# Note: doesn't handle list indexing, just dict keys
config = {"db": {"primary": {"host": "10.0.0.1", "port": 5432}}}
print(deep_get(config, "db.primary.host"))       # "10.0.0.1"
print(deep_get(config, "db.primary.password", "secret"))  # "secret"
print(deep_get(config, "db.replica.host", "none"))        # "none"

# Deep copy vs shallow copy
import copy
original = {"a": {"b": [1, 2, 3]}}
shallow = original.copy()
deep = copy.deepcopy(original)

shallow["a"]["b"].append(4)
print(original["a"]["b"])  # [1, 2, 3, 4] <- MODIFIED by shallow!
print(deep["a"]["b"])      # [1, 2, 3]    <- Independent


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Dispatch table
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# Instead of long if/elif chains, map keys to functions
import math

# Calculator dispatch table
operations = {
    "+": lambda a, b: a + b,
    "-": lambda a, b: a - b,
    "*": lambda a, b: a * b,
    "/": lambda a, b: a / b if b != 0 else float("inf"),
    "**": lambda a, b: a ** b,
    "%": lambda a, b: a % b,
}

def calculate(a, op, b):
    func = operations.get(op)
    if func is None:
        raise ValueError(f"Unknown operator: {op}")
    return func(a, b)

print(calculate(10, "+", 5))   # 15
print(calculate(10, "**", 3))  # 1000
print(calculate(10, "/", 3))   # 3.333...

# Command pattern - map strings to handler functions
def handle_start(): return "Starting..."
def handle_stop(): return "Stopping..."
def handle_status(): return "Running"
def handle_unknown(cmd): return f"Unknown: {cmd}"

commands = {
    "start": handle_start,
    "stop": handle_stop,
    "status": handle_status,
}

cmd = "start"
handler = commands.get(cmd, lambda: handle_unknown(cmd))
print(handler())  # "Starting..."

# HTTP status code messages
status_messages = {
    200: "OK",
    201: "Created",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
}
print(status_messages.get(404, "Unknown Status"))  # "Not Found"
print(status_messages.get(418, "Unknown Status"))  # "Unknown Status"


# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
# \u2726 Sorted iteration
# \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
population = {"Tokyo": 37_400_000, "Delhi": 30_290_000,
              "Shanghai": 27_058_000, "Sao Paulo": 22_043_000,
              "Mumbai": 20_411_000}

# Sort by keys (alphabetical)
for city in sorted(population):
    print(f"{city}: {population[city]:,}")
# Delhi: 30,290,000 ... (alphabetical order)

# Sort by values (ascending)
for city, pop in sorted(population.items(), key=lambda x: x[1]):
    print(f"{city}: {pop:,}")
# Mumbai, Sao Paulo, Shanghai, Delhi, Tokyo

# Sort by values (descending)
for city, pop in sorted(population.items(), key=lambda x: x[1], reverse=True):
    print(f"{city}: {pop:,}")
# Tokyo, Delhi, Shanghai, Sao Paulo, Mumbai

# Create sorted dict (preserves insertion order in Python 3.7+)
sorted_by_pop = dict(sorted(population.items(), key=lambda x: x[1], reverse=True))
print(sorted_by_pop)
# {'Tokyo': 37400000, 'Delhi': 30290000, 'Shanghai': 27058000, ...}

# Top N items
top_3 = dict(sorted(population.items(), key=lambda x: x[1], reverse=True)[:3])
print(top_3)
# {'Tokyo': 37400000, 'Delhi': 30290000, 'Shanghai': 27058000}

# Sort by complex key (e.g., second character of key)
data = {"banana": 1, "apple": 2, "cherry": 3}
by_second_char = dict(sorted(data.items(), key=lambda x: x[0][1]))
print(by_second_char)  # Sorted by second char: a(n), h(e), p(p)

# Min/max by value
richest = max(population, key=population.get)
smallest = min(population, key=population.get)
print(f"Largest: {richest}, Smallest: {smallest}")
# Largest: Tokyo, Smallest: Mumbai`
    }
  ]

  const codeSections = selectedConcept !== null ? parseCodeSections(concepts[selectedConcept].codeExample) : []

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
              background: 'linear-gradient(to right, #3b82f6, #0891b2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {'\uD83D\uDDFA\uFE0F'} Dictionary Operations
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
          primaryColor={'#3b82f6'}
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
                textAlign: 'left',
                fontSize: '0.875rem'
              }}>
                Click to explore dictionary operations
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
                    whiteSpace: 'pre-line',
                    color: '#d1d5db',
                    lineHeight: '1.8'
                  }}>
                    {concepts[selectedConcept].explanation.split('\n').map((line, i) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        const text = line.slice(2, -2)
                        return <div key={i} style={{ fontWeight: '700', color: '#93c5fd', marginTop: i > 0 ? '1rem' : 0, marginBottom: '0.5rem' }}>{text}</div>
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

                  {codeSections.length > 0 ? (
                    codeSections.map((section, idx) => (
                      <div key={idx} style={{ marginBottom: '1.5rem' }}>
                        <div
                          style={{
                            width: '100%',
                            padding: '1rem',
                            background: '#2563eb',
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

export default PythonDictOperations

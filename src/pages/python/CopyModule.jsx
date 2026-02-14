import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function CopyModule({ onBack, breadcrumb }) {
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
      name: 'Assignment vs Copy',
      icon: '🔗',
      explanation: `**Assignment (=) Does NOT Copy:**
• a = b makes a and b point to the SAME object
• Modifying one affects the other (for mutable types)
• This is called aliasing — two names for one object
• id(a) == id(b) after assignment

**Why This Matters:**
• Immutable types (int, str, tuple): aliasing is safe
• Mutable types (list, dict, set): aliasing causes bugs
• Passing mutables to functions creates aliases too
• Returning mutables exposes internal state

**Three Levels of "Copying":**
• Assignment: same object (no copy at all)
• Shallow copy: new outer object, shared inner objects
• Deep copy: fully independent recursive copy

**Key Rule:**
• If you modify a copy and the original changes → you have an alias, not a copy
• Always verify with id() or 'is' operator`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Assignment creates aliases, not copies
# ═══════════════════════════════════════════════════════════════
# Lists: assignment is aliasing
original = [1, 2, 3]
alias = original            # NOT a copy!

alias.append(4)
print(original)             # [1, 2, 3, 4] ← original changed!
print(alias is original)    # True (same object)
print(id(alias) == id(original))  # True

# Dicts: same problem
config = {"debug": True, "port": 8080}
backup = config             # alias, not copy!

backup["debug"] = False
print(config)               # {'debug': False, 'port': 8080} ← changed!


# ═══════════════════════════════════════════════════════════════
# ✦ Immutable types are safe from aliasing bugs
# ═══════════════════════════════════════════════════════════════
# Integers: reassignment creates new object
a = 42
b = a
b = 99
print(a)   # 42 (unchanged — integers are immutable)

# Strings: same safety
s1 = "hello"
s2 = s1
s2 = s2.upper()
print(s1)  # "hello" (unchanged)

# Tuples: immutable, so aliasing is safe
t1 = (1, 2, 3)
t2 = t1
# t2[0] = 99  # TypeError! Can't modify tuples

# BUT: tuple containing mutable objects is tricky!
t = ([1, 2], [3, 4])
t2 = t
t2[0].append(99)
print(t)   # ([1, 2, 99], [3, 4]) ← inner list was mutated!


# ═══════════════════════════════════════════════════════════════
# ✦ Function arguments are aliases
# ═══════════════════════════════════════════════════════════════
def add_item(lst, item):
    lst.append(item)     # modifies the original!
    return lst

my_list = [1, 2, 3]
result = add_item(my_list, 4)
print(my_list)       # [1, 2, 3, 4] ← modified!
print(result is my_list)  # True (same object)

# Safe version: copy inside the function
def add_item_safe(lst, item):
    new_lst = lst.copy()  # shallow copy
    new_lst.append(item)
    return new_lst

my_list = [1, 2, 3]
result = add_item_safe(my_list, 4)
print(my_list)       # [1, 2, 3] ← unchanged!
print(result)        # [1, 2, 3, 4]


# ═══════════════════════════════════════════════════════════════
# ✦ Quick identity check: is vs ==
# ═══════════════════════════════════════════════════════════════
a = [1, 2, 3]
b = a             # alias
c = [1, 2, 3]     # different object, same value

print(a == b)     # True  (same value)
print(a is b)     # True  (same object)
print(a == c)     # True  (same value)
print(a is c)     # False (different objects)

# Rule: 'is' checks identity, '==' checks equality
# After copying: a == copy is True, a is copy is False`
    },
    {
      name: 'Shallow Copy',
      icon: '📋',
      explanation: `**What Shallow Copy Does:**
• Creates a NEW outer container object
• Copies references to inner objects (NOT the objects themselves)
• Modifying the copy's structure doesn't affect the original
• But modifying shared inner objects affects both!

**Ways to Shallow Copy:**
• copy.copy(obj) — works for any object
• list.copy() or list(original) or original[:]
• dict.copy() or dict(original)
• set.copy() or set(original)

**When Shallow Copy Is Sufficient:**
• Flat lists/dicts (no nested mutables)
• When inner objects are immutable (int, str, tuple)
• When you only modify the outer structure

**When Shallow Copy Is NOT Enough:**
• Nested lists: [[1, 2], [3, 4]]
• Dicts with mutable values: {"a": [1, 2]}
• Any structure with shared mutable inner objects`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Shallow copy methods for lists
# ═══════════════════════════════════════════════════════════════
import copy

original = [1, 2, 3, 4, 5]

# Four ways to shallow copy a list
copy1 = copy.copy(original)
copy2 = original.copy()
copy3 = list(original)
copy4 = original[:]

# All are independent from original
copy1.append(6)
print(original)    # [1, 2, 3, 4, 5] ← unchanged!
print(copy1)       # [1, 2, 3, 4, 5, 6]
print(original is copy1)  # False (different objects)


# ═══════════════════════════════════════════════════════════════
# ✦ Shallow copy methods for dicts and sets
# ═══════════════════════════════════════════════════════════════
# Dict shallow copy
orig_dict = {"a": 1, "b": 2, "c": 3}
copy_dict = orig_dict.copy()     # or dict(orig_dict) or copy.copy(orig_dict)
copy_dict["d"] = 4
print(orig_dict)    # {'a': 1, 'b': 2, 'c': 3} ← unchanged

# Set shallow copy
orig_set = {1, 2, 3}
copy_set = orig_set.copy()      # or set(orig_set)
copy_set.add(4)
print(orig_set)     # {1, 2, 3} ← unchanged

# Dict with ** unpacking (also shallow)
d = {"x": 1, "y": 2}
d2 = {**d, "z": 3}   # shallow copy + add key
print(d)    # {'x': 1, 'y': 2}
print(d2)   # {'x': 1, 'y': 2, 'z': 3}


# ═══════════════════════════════════════════════════════════════
# ✦ The DANGER of shallow copy with nested structures
# ═══════════════════════════════════════════════════════════════
# Nested list: shallow copy shares inner lists!
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
shallow = matrix.copy()

# Modifying outer structure is safe
shallow.append([10, 11, 12])
print(len(matrix))   # 3 (unchanged)
print(len(shallow))  # 4

# But modifying INNER lists affects both!
shallow[0][0] = 999
print(matrix[0])     # [999, 2, 3] ← CHANGED! Inner list is shared!
print(shallow[0])    # [999, 2, 3]
print(matrix[0] is shallow[0])  # True (same inner object!)

# Dict with mutable values: same problem
original = {"scores": [95, 87, 92], "name": "Alice"}
shallow = original.copy()

shallow["scores"].append(100)
print(original["scores"])  # [95, 87, 92, 100] ← CHANGED!

# But reassigning the key is safe
shallow["name"] = "Bob"
print(original["name"])    # "Alice" (unchanged — strings are immutable)


# ═══════════════════════════════════════════════════════════════
# ✦ Visualizing shallow vs deep copy
# ═══════════════════════════════════════════════════════════════
original = [[1, 2], [3, 4]]
shallow = copy.copy(original)

# Check what's shared
print(f"Outer: original is shallow? {original is shallow}")           # False
print(f"Inner: original[0] is shallow[0]? {original[0] is shallow[0]}")  # True!
print(f"Inner: original[1] is shallow[1]? {original[1] is shallow[1]}")  # True!

# Memory layout:
# original ──→ [ ref_A, ref_B ]
# shallow  ──→ [ ref_A, ref_B ]  ← NEW list, SAME inner refs
#                 ↓       ↓
#              [1, 2]  [3, 4]   ← shared inner objects`
    },
    {
      name: 'Deep Copy',
      icon: '📦',
      explanation: `**What Deep Copy Does:**
• Creates a completely independent copy
• Recursively copies ALL nested objects
• No shared references between original and copy
• Modifying the copy NEVER affects the original

**How to Deep Copy:**
• copy.deepcopy(obj) — the only standard way
• No built-in shortcut like .copy() or [:]
• Handles circular references automatically

**Performance:**
• Slower than shallow copy (recursive traversal)
• Uses more memory (duplicates everything)
• Handles complex object graphs correctly

**When to Use Deep Copy:**
• Nested mutable structures (list of lists, dict of lists)
• Objects with complex internal state
• When you need a fully independent snapshot
• Undo/redo systems, state management

**When NOT Needed:**
• Flat structures with immutable elements
• When shallow copy is sufficient
• Performance-critical code with large structures`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Deep copy creates fully independent copies
# ═══════════════════════════════════════════════════════════════
import copy

# Nested list: deep copy is fully independent
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
deep = copy.deepcopy(matrix)

deep[0][0] = 999
print(matrix[0])     # [1, 2, 3] ← unchanged!
print(deep[0])       # [999, 2, 3]
print(matrix[0] is deep[0])  # False (different inner objects!)

# Dict with nested structures
config = {
    "database": {"host": "localhost", "ports": [5432, 5433]},
    "cache": {"ttl": 300, "backends": ["redis", "memcached"]}
}
backup = copy.deepcopy(config)

backup["database"]["ports"].append(5434)
backup["cache"]["ttl"] = 600

print(config["database"]["ports"])  # [5432, 5433] ← unchanged!
print(backup["database"]["ports"])  # [5432, 5433, 5434]
print(config["cache"]["ttl"])       # 300 ← unchanged!


# ═══════════════════════════════════════════════════════════════
# ✦ Deep copy handles circular references
# ═══════════════════════════════════════════════════════════════
# Circular reference: list contains itself
a = [1, 2]
a.append(a)         # a = [1, 2, [1, 2, [1, 2, ...]]]
print(a)            # [1, 2, [...]]

# deepcopy handles this correctly (no infinite loop)
b = copy.deepcopy(a)
print(b)            # [1, 2, [...]]
print(b[2] is b)    # True (circular ref preserved in copy)
print(b[2] is a)    # False (independent from original)

# Object graph with shared references
shared = [1, 2, 3]
original = {"a": shared, "b": shared}  # both point to same list
print(original["a"] is original["b"])  # True

deep = copy.deepcopy(original)
print(deep["a"] is deep["b"])          # True (sharing preserved!)
print(deep["a"] is original["a"])      # False (independent copy)


# ═══════════════════════════════════════════════════════════════
# ✦ Shallow vs Deep copy comparison
# ═══════════════════════════════════════════════════════════════
original = {"users": [{"name": "Alice", "scores": [95, 87]}]}

# Shallow copy
shallow = copy.copy(original)
shallow["users"][0]["scores"].append(100)
print(original["users"][0]["scores"])  # [95, 87, 100] ← CHANGED!

# Reset
original = {"users": [{"name": "Alice", "scores": [95, 87]}]}

# Deep copy
deep = copy.deepcopy(original)
deep["users"][0]["scores"].append(100)
print(original["users"][0]["scores"])  # [95, 87] ← safe!

# Summary:
# Assignment: original IS copy (same object)
# Shallow:    new outer, shared inner objects
# Deep:       new everything, fully independent


# ═══════════════════════════════════════════════════════════════
# ✦ Practical: undo system with deep copy
# ═══════════════════════════════════════════════════════════════
class Document:
    def __init__(self):
        self.content = []
        self._history = []

    def write(self, text):
        self._history.append(copy.deepcopy(self.content))
        self.content.append(text)

    def undo(self):
        if self._history:
            self.content = self._history.pop()

    def __repr__(self):
        return " | ".join(self.content)

doc = Document()
doc.write("Hello")
doc.write("World")
doc.write("Python")
print(doc)          # Hello | World | Python

doc.undo()
print(doc)          # Hello | World

doc.undo()
print(doc)          # Hello`
    },
    {
      name: 'Custom Copy Behavior',
      icon: '⚙️',
      explanation: `**__copy__(self):**
• Called by copy.copy() for shallow copying
• Define how your object is shallow-copied
• Return a new instance with appropriate sharing

**__deepcopy__(self, memo):**
• Called by copy.deepcopy() for deep copying
• memo dict tracks already-copied objects (prevents cycles)
• Use copy.deepcopy(attr, memo) for recursive deep copy
• Must pass memo to nested deepcopy calls

**The memo Dictionary:**
• Maps id(original) → copy for already-copied objects
• Prevents infinite recursion with circular references
• Handles shared references correctly
• Passed automatically — just forward it

**When to Customize:**
• Objects with external resources (files, connections)
• Objects with cached/computed attributes to skip
• Singletons or shared state that shouldn't be copied
• Objects with __slots__ instead of __dict__`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Custom __copy__ and __deepcopy__
# ═══════════════════════════════════════════════════════════════
import copy

class GameState:
    _instance_count = 0

    def __init__(self, board, players, turn=0):
        GameState._instance_count += 1
        self.id = GameState._instance_count
        self.board = board          # nested list (mutable)
        self.players = players      # list of dicts (mutable)
        self.turn = turn            # int (immutable)
        self._cache = {}            # skip when copying

    def __copy__(self):
        """Shallow copy: new GameState, shared board and players"""
        cls = self.__class__
        result = cls.__new__(cls)
        GameState._instance_count += 1
        result.id = GameState._instance_count
        result.board = self.board       # shared reference
        result.players = self.players   # shared reference
        result.turn = self.turn
        result._cache = {}              # fresh cache
        return result

    def __deepcopy__(self, memo):
        """Deep copy: fully independent GameState"""
        cls = self.__class__
        result = cls.__new__(cls)
        memo[id(self)] = result         # register before recursing
        GameState._instance_count += 1
        result.id = GameState._instance_count
        result.board = copy.deepcopy(self.board, memo)
        result.players = copy.deepcopy(self.players, memo)
        result.turn = self.turn
        result._cache = {}              # fresh cache (not copied)
        return result

    def __repr__(self):
        return f"GameState(id={self.id}, turn={self.turn})"

# Test it
board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
players = [{"name": "Alice", "score": 0}, {"name": "Bob", "score": 0}]
state = GameState(board, players)

# Shallow copy: shares board and players
shallow = copy.copy(state)
shallow.board[0][0] = 1
print(state.board[0])     # [1, 0, 0] ← affected!

# Deep copy: fully independent
board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
state = GameState(board, players)
deep = copy.deepcopy(state)
deep.board[0][0] = 1
print(state.board[0])     # [0, 0, 0] ← safe!


# ═══════════════════════════════════════════════════════════════
# ✦ Skipping uncopyable resources
# ═══════════════════════════════════════════════════════════════
class Connection:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.socket = self._connect()  # can't/shouldn't copy

    def _connect(self):
        return f"socket({self.host}:{self.port})"  # simulated

    def __copy__(self):
        """New connection with same config"""
        return Connection(self.host, self.port)

    def __deepcopy__(self, memo):
        """Same as shallow — always create new connection"""
        result = Connection(self.host, self.port)
        memo[id(self)] = result
        return result

    def __repr__(self):
        return f"Connection({self.host}:{self.port})"

conn = Connection("localhost", 5432)
conn2 = copy.deepcopy(conn)
print(conn)    # Connection(localhost:5432)
print(conn2)   # Connection(localhost:5432)
print(conn.socket is conn2.socket)  # False (new socket)


# ═══════════════════════════════════════════════════════════════
# ✦ Singleton pattern — prevent copying
# ═══════════════════════════════════════════════════════════════
class DatabasePool:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __copy__(self):
        return self  # return same instance

    def __deepcopy__(self, memo):
        return self  # return same instance

pool = DatabasePool()
pool_copy = copy.copy(pool)
pool_deep = copy.deepcopy(pool)
print(pool is pool_copy)     # True (same singleton)
print(pool is pool_deep)     # True (same singleton)


# ═══════════════════════════════════════════════════════════════
# ✦ Common patterns and pitfalls
# ═══════════════════════════════════════════════════════════════
# PITFALL: mutable default arguments
def add_item(item, lst=[]):     # BAD! Shared default list
    lst.append(item)
    return lst

print(add_item(1))   # [1]
print(add_item(2))   # [1, 2] ← bug! Same list reused

# FIX: use None and create inside
def add_item_safe(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst

# PITFALL: [[0] * 3] * 3 creates shared rows
grid_bad = [[0] * 3] * 3
grid_bad[0][0] = 1
print(grid_bad)  # [[1, 0, 0], [1, 0, 0], [1, 0, 0]] ← all rows changed!

# FIX: list comprehension creates independent rows
grid_good = [[0] * 3 for _ in range(3)]
grid_good[0][0] = 1
print(grid_good)  # [[1, 0, 0], [0, 0, 0], [0, 0, 0]] ← only row 0 changed`
    }
  ]

  const codeSections = selectedConcept !== null ? parseCodeSections(concepts[selectedConcept].codeExample) : []

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)',
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
              ← {selectedConcept !== null ? 'Back to Concepts' : 'Back to Python Topics'}
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              📋 Copy Module
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
                Click to explore copy concepts
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
                      if (line.startsWith('•')) {
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

export default CopyModule

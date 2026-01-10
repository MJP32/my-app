import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import Breadcrumb from '../../components/Breadcrumb'

function PythonDictOperations({ onBack, breadcrumb }) {
  const [selectedProblem, setSelectedProblem] = useState(null)
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

  const problems = [
    {
      id: 1,
      title: 'Dictionary get() Method',
      difficulty: 'Easy',
      description: 'Use the get() method to safely retrieve values from a dictionary with a default value if key doesn\'t exist.',
      code: {
        python: {
          starterCode: `def safe_get(dictionary, key, default=None):
    """
    Safely get value from dictionary using get() method.

    Args:
        dictionary: Dict to search
        key: Key to look for
        default: Default value if key not found

    Returns:
        Value for key, or default if not found

    Examples:
        >>> safe_get({'a': 1, 'b': 2}, 'a')
        1
        >>> safe_get({'a': 1, 'b': 2}, 'c', 0)
        0
    """
    pass`,
          solution: `def safe_get(dictionary, key, default=None):
    """
    Safely get value from dictionary.

    Multiple approaches:
    1. Using get() method (recommended)
    2. Using try-except
    3. Using conditional check
    """
    # Approach 1: Using get() method
    return dictionary.get(key, default)

    # Approach 2: Using try-except
    # try:
    #     return dictionary[key]
    # except KeyError:
    #     return default

    # Approach 3: Using conditional
    # return dictionary[key] if key in dictionary else default`
        }
      },
      testCases: [
        { input: '({\'a\': 1, \'b\': 2}, \'a\')', expected: '1' },
        { input: '({\'a\': 1, \'b\': 2}, \'c\', 0)', expected: '0' },
        { input: '({}, \'x\', \'default\')', expected: '\'default\'' },
        { input: '({\'name\': \'Alice\'}, \'name\')', expected: '\'Alice\'' }
      ],
      hints: `Use dictionary.get(key, default). Time: O(1), Space: O(1). This avoids KeyError exceptions.`
    },
    {
      id: 2,
      title: 'Dictionary keys(), values(), items()',
      difficulty: 'Easy',
      description: 'Extract all keys, values, or key-value pairs from a dictionary.',
      code: {
        python: {
          starterCode: `def dict_views(dictionary):
    """
    Return keys, values, and items from dictionary.

    Args:
        dictionary: Dict to extract from

    Returns:
        Tuple of (keys_list, values_list, items_list)

    Examples:
        >>> dict_views({'a': 1, 'b': 2})
        (['a', 'b'], [1, 2], [('a', 1), ('b', 2)])
    """
    pass`,
          solution: `def dict_views(dictionary):
    """
    Return keys, values, and items from dictionary.

    Multiple ways to use dict views:
    1. Using keys(), values(), items()
    2. Converting to lists
    3. Using unpacking
    """
    # Approach 1: Using dict methods and converting to lists
    keys_list = list(dictionary.keys())
    values_list = list(dictionary.values())
    items_list = list(dictionary.items())

    return (keys_list, values_list, items_list)

    # Alternative: Direct iteration
    # keys = [k for k in dictionary]
    # values = [dictionary[k] for k in dictionary]
    # items = [(k, v) for k, v in dictionary.items()]
    # return (keys, values, items)`
        }
      },
      testCases: [
        { input: '{\'a\': 1, \'b\': 2}', expected: '([\'a\', \'b\'], [1, 2], [(\'a\', 1), (\'b\', 2)])' },
        { input: '{\'x\': 10}', expected: '([\'x\'], [10], [(\'x\', 10)])' },
        { input: '{}', expected: '([], [], [])' }
      ],
      hints: `Use .keys(), .values(), and .items() methods. Convert to lists if needed. Time: O(n), Space: O(n)`
    },
    {
      id: 3,
      title: 'Dictionary update()',
      difficulty: 'Easy',
      description: 'Merge two dictionaries using the update() method or the | operator (Python 3.9+).',
      code: {
        python: {
          starterCode: `def merge_dicts(dict1, dict2):
    """
    Merge two dictionaries (dict2 values override dict1).

    Args:
        dict1: First dictionary
        dict2: Second dictionary

    Returns:
        Merged dictionary

    Examples:
        >>> merge_dicts({'a': 1, 'b': 2}, {'b': 3, 'c': 4})
        {'a': 1, 'b': 3, 'c': 4}
    """
    pass`,
          solution: `def merge_dicts(dict1, dict2):
    """
    Merge two dictionaries.

    Multiple approaches:
    1. Using update() method
    2. Using | operator (Python 3.9+)
    3. Using ** unpacking
    4. Using dict comprehension
    """
    # Approach 1: Using update() (modifies dict)
    result = dict1.copy()
    result.update(dict2)
    return result

    # Approach 2: Using | operator (Python 3.9+)
    # return dict1 | dict2

    # Approach 3: Using ** unpacking
    # return {**dict1, **dict2}

    # Approach 4: Using dict constructor
    # return dict(dict1, **dict2)`
        }
      },
      testCases: [
        { input: '({\'a\': 1, \'b\': 2}, {\'b\': 3, \'c\': 4})', expected: '{\'a\': 1, \'b\': 3, \'c\': 4}' },
        { input: '({\'x\': 1}, {\'y\': 2})', expected: '{\'x\': 1, \'y\': 2}' },
        { input: '({}, {\'a\': 1})', expected: '{\'a\': 1}' }
      ],
      hints: `Use update() method or | operator. dict2 values override dict1 for common keys. Time: O(len(dict1) + len(dict2)), Space: O(len(dict1) + len(dict2))`
    },
    {
      id: 4,
      title: 'Dictionary pop() and popitem()',
      difficulty: 'Easy',
      description: 'Remove and return items from dictionary using pop() and popitem() methods.',
      code: {
        python: {
          starterCode: `def remove_key(dictionary, key, default=None):
    """
    Remove and return value for key from dictionary.

    Args:
        dictionary: Dict to modify
        key: Key to remove
        default: Default value if key not found

    Returns:
        Value that was removed, or default

    Examples:
        >>> d = {'a': 1, 'b': 2}
        >>> remove_key(d, 'a')
        1
        >>> d
        {'b': 2}
    """
    pass`,
          solution: `def remove_key(dictionary, key, default=None):
    """
    Remove and return value for key.

    Multiple approaches:
    1. Using pop() method
    2. Using del and get
    3. Using popitem() for last item
    """
    # Approach 1: Using pop() (safe with default)
    return dictionary.pop(key, default)

    # Approach 2: Using del (raises KeyError if not found)
    # try:
    #     value = dictionary[key]
    #     del dictionary[key]
    #     return value
    # except KeyError:
    #     return default

    # For removing last item (LIFO order in Python 3.7+):
    # key, value = dictionary.popitem()
    # return value`
        }
      },
      testCases: [
        { input: '({\'a\': 1, \'b\': 2}, \'a\')', expected: '1' },
        { input: '({\'a\': 1, \'b\': 2}, \'c\', 0)', expected: '0' },
        { input: '({\'x\': 10}, \'x\')', expected: '10' }
      ],
      hints: `Use pop(key, default) to safely remove. popitem() removes last inserted item. Time: O(1), Space: O(1)`
    },
    {
      id: 5,
      title: 'Dictionary setdefault()',
      difficulty: 'Easy',
      description: 'Use setdefault() to get value or insert default if key doesn\'t exist.',
      code: {
        python: {
          starterCode: `def get_or_set(dictionary, key, default):
    """
    Get value for key, or set and return default if not found.

    Args:
        dictionary: Dict to search/modify
        key: Key to look for
        default: Default value to set if key not found

    Returns:
        Value for key (existing or newly set default)

    Examples:
        >>> d = {'a': 1}
        >>> get_or_set(d, 'a', 0)
        1
        >>> get_or_set(d, 'b', 0)
        0
        >>> d
        {'a': 1, 'b': 0}
    """
    pass`,
          solution: `def get_or_set(dictionary, key, default):
    """
    Get value or set default if key not found.

    Multiple approaches:
    1. Using setdefault() method
    2. Manual check and set
    3. Using defaultdict (different data structure)
    """
    # Approach 1: Using setdefault() (recommended)
    return dictionary.setdefault(key, default)

    # Approach 2: Manual check
    # if key not in dictionary:
    #     dictionary[key] = default
    # return dictionary[key]

    # Approach 3: Using get and set separately
    # value = dictionary.get(key)
    # if value is None:
    #     dictionary[key] = default
    #     value = default
    # return value`
        }
      },
      testCases: [
        { input: '({\'a\': 1}, \'a\', 0)', expected: '1' },
        { input: '({\'a\': 1}, \'b\', 0)', expected: '0' },
        { input: '({}, \'x\', [])', expected: '[]' }
      ],
      hints: `setdefault() both gets and sets in one operation. Useful for counting and grouping. Time: O(1), Space: O(1)`
    },
    {
      id: 6,
      title: 'Dictionary fromkeys()',
      difficulty: 'Easy',
      description: 'Create a new dictionary from a sequence of keys with a default value.',
      code: {
        python: {
          starterCode: `def create_dict_from_keys(keys, value=None):
    """
    Create dictionary with keys and default value.

    Args:
        keys: Sequence of keys
        value: Default value for all keys

    Returns:
        New dictionary with all keys set to value

    Examples:
        >>> create_dict_from_keys(['a', 'b', 'c'], 0)
        {'a': 0, 'b': 0, 'c': 0}
        >>> create_dict_from_keys([1, 2, 3])
        {1: None, 2: None, 3: None}
    """
    pass`,
          solution: `def create_dict_from_keys(keys, value=None):
    """
    Create dictionary from keys with default value.

    Multiple approaches:
    1. Using dict.fromkeys() class method
    2. Using dict comprehension
    3. Using loop
    """
    # Approach 1: Using fromkeys() (recommended)
    return dict.fromkeys(keys, value)

    # Approach 2: Using dict comprehension
    # return {key: value for key in keys}

    # Approach 3: Using loop
    # result = {}
    # for key in keys:
    #     result[key] = value
    # return result

    # Note: Be careful with mutable default values!
    # fromkeys(['a', 'b'], []) creates same list object for all keys`
        }
      },
      testCases: [
        { input: '([\'a\', \'b\', \'c\'], 0)', expected: '{\'a\': 0, \'b\': 0, \'c\': 0}' },
        { input: '([1, 2, 3])', expected: '{1: None, 2: None, 3: None}' },
        { input: '([], 5)', expected: '{}' }
      ],
      hints: `Use dict.fromkeys(keys, value). WARNING: All keys share same value object (matters for mutable values). Time: O(n), Space: O(n)`
    },
    {
      id: 7,
      title: 'Dictionary Comprehension with Conditions',
      difficulty: 'Medium',
      description: 'Create dictionaries using comprehension with filtering and transformation.',
      code: {
        python: {
          starterCode: `def filter_dict(dictionary, condition_fn):
    """
    Create new dict with items that satisfy condition.

    Args:
        dictionary: Input dictionary
        condition_fn: Function that takes (key, value) and returns bool

    Returns:
        Filtered dictionary

    Examples:
        >>> filter_dict({'a': 1, 'b': 2, 'c': 3}, lambda k, v: v > 1)
        {'b': 2, 'c': 3}
        >>> filter_dict({'x': 10, 'y': 20}, lambda k, v: k == 'x')
        {'x': 10}
    """
    pass`,
          solution: `def filter_dict(dictionary, condition_fn):
    """
    Filter dictionary using comprehension.

    Multiple approaches:
    1. Using dict comprehension with condition
    2. Using filter() with dict()
    3. Using loop
    """
    # Approach 1: Dict comprehension with condition
    return {k: v for k, v in dictionary.items() if condition_fn(k, v)}

    # Approach 2: Using filter()
    # return dict(filter(lambda item: condition_fn(item[0], item[1]),
    #                   dictionary.items()))

    # Approach 3: Using loop
    # result = {}
    # for k, v in dictionary.items():
    #     if condition_fn(k, v):
    #         result[k] = v
    # return result`
        }
      },
      testCases: [
        { input: '({\'a\': 1, \'b\': 2, \'c\': 3}, lambda k, v: v > 1)', expected: '{\'b\': 2, \'c\': 3}' },
        { input: '({\'x\': 10, \'y\': 20}, lambda k, v: k == \'x\')', expected: '{\'x\': 10}' },
        { input: '({1: \'a\', 2: \'b\', 3: \'c\'}, lambda k, v: k % 2 == 0)', expected: '{2: \'b\'}' }
      ],
      hints: `Use {k: v for k, v in dict.items() if condition}. Time: O(n), Space: O(n)`
    },
    {
      id: 8,
      title: 'Invert Dictionary (Swap Keys and Values)',
      difficulty: 'Medium',
      description: 'Create a new dictionary with keys and values swapped.',
      code: {
        python: {
          starterCode: `def invert_dict(dictionary):
    """
    Invert dictionary (swap keys and values).

    Args:
        dictionary: Input dictionary

    Returns:
        Dictionary with keys and values swapped

    Examples:
        >>> invert_dict({'a': 1, 'b': 2, 'c': 3})
        {1: 'a', 2: 'b', 3: 'c'}
        >>> invert_dict({'name': 'Alice', 'age': 30})
        {'Alice': 'name', 30: 'age'}
    """
    pass`,
          solution: `def invert_dict(dictionary):
    """
    Invert dictionary by swapping keys and values.

    Multiple approaches:
    1. Using dict comprehension
    2. Using zip with keys() and values()
    3. Using loop
    """
    # Approach 1: Dict comprehension (most concise)
    return {v: k for k, v in dictionary.items()}

    # Approach 2: Using zip
    # return dict(zip(dictionary.values(), dictionary.keys()))

    # Approach 3: Using loop
    # result = {}
    # for k, v in dictionary.items():
    #     result[v] = k
    # return result

    # Note: If values are not unique, later keys will override earlier ones
    # For multiple keys per value, use:
    # from collections import defaultdict
    # result = defaultdict(list)
    # for k, v in dictionary.items():
    #     result[v].append(k)
    # return dict(result)`
        }
      },
      testCases: [
        { input: '{\'a\': 1, \'b\': 2, \'c\': 3}', expected: '{1: \'a\', 2: \'b\', 3: \'c\'}' },
        { input: '{\'name\': \'Alice\', \'age\': 30}', expected: '{\'Alice\': \'name\', 30: \'age\'}' },
        { input: '{}', expected: '{}' }
      ],
      hints: `Use {v: k for k, v in dict.items()}. WARNING: If values aren't unique, some keys will be lost. Time: O(n), Space: O(n)`
    },
    {
      id: 9,
      title: 'Count Frequency using Dictionary',
      difficulty: 'Medium',
      description: 'Count frequency of elements in a list using a dictionary.',
      code: {
        python: {
          starterCode: `def count_frequency(items):
    """
    Count frequency of each item in list.

    Args:
        items: List of items to count

    Returns:
        Dictionary mapping item to its count

    Examples:
        >>> count_frequency([1, 2, 2, 3, 3, 3])
        {1: 1, 2: 2, 3: 3}
        >>> count_frequency(['a', 'b', 'a', 'c', 'a'])
        {'a': 3, 'b': 1, 'c': 1}
    """
    pass`,
          solution: `def count_frequency(items):
    """
    Count frequency of items.

    Multiple approaches:
    1. Using Counter from collections
    2. Using dict.get()
    3. Using dict.setdefault()
    4. Using defaultdict
    """
    # Approach 1: Using Counter (most Pythonic)
    from collections import Counter
    return dict(Counter(items))

    # Approach 2: Using get()
    # freq = {}
    # for item in items:
    #     freq[item] = freq.get(item, 0) + 1
    # return freq

    # Approach 3: Using setdefault()
    # freq = {}
    # for item in items:
    #     freq.setdefault(item, 0)
    #     freq[item] += 1
    # return freq

    # Approach 4: Using defaultdict
    # from collections import defaultdict
    # freq = defaultdict(int)
    # for item in items:
    #     freq[item] += 1
    # return dict(freq)`
        }
      },
      testCases: [
        { input: '[1, 2, 2, 3, 3, 3]', expected: '{1: 1, 2: 2, 3: 3}' },
        { input: '[\'a\', \'b\', \'a\', \'c\', \'a\']', expected: '{\'a\': 3, \'b\': 1, \'c\': 1}' },
        { input: '[]', expected: '{}' },
        { input: '[5, 5, 5, 5]', expected: '{5: 4}' }
      ],
      hints: `Use Counter from collections or dict.get(key, 0) + 1 pattern. Time: O(n), Space: O(unique items)`
    },
    {
      id: 10,
      title: 'Group Items by Key',
      difficulty: 'Medium',
      description: 'Group items in a list based on a key function using dictionary.',
      code: {
        python: {
          starterCode: `def group_by(items, key_fn):
    """
    Group items by result of key function.

    Args:
        items: List of items to group
        key_fn: Function that takes item and returns grouping key

    Returns:
        Dictionary mapping key to list of items

    Examples:
        >>> group_by([1, 2, 3, 4, 5, 6], lambda x: x % 2)
        {1: [1, 3, 5], 0: [2, 4, 6]}
        >>> group_by(['apple', 'banana', 'apricot', 'berry'], lambda x: x[0])
        {'a': ['apple', 'apricot'], 'b': ['banana', 'berry']}
    """
    pass`,
          solution: `def group_by(items, key_fn):
    """
    Group items by key function result.

    Multiple approaches:
    1. Using defaultdict
    2. Using setdefault()
    3. Using get()
    4. Using itertools.groupby()
    """
    # Approach 1: Using defaultdict (recommended)
    from collections import defaultdict
    groups = defaultdict(list)
    for item in items:
        key = key_fn(item)
        groups[key].append(item)
    return dict(groups)

    # Approach 2: Using setdefault()
    # groups = {}
    # for item in items:
    #     key = key_fn(item)
    #     groups.setdefault(key, []).append(item)
    # return groups

    # Approach 3: Using get()
    # groups = {}
    # for item in items:
    #     key = key_fn(item)
    #     if key not in groups:
    #         groups[key] = []
    #     groups[key].append(item)
    # return groups

    # Approach 4: Using itertools.groupby() (requires sorted input!)
    # from itertools import groupby
    # sorted_items = sorted(items, key=key_fn)
    # return {k: list(g) for k, g in groupby(sorted_items, key_fn)}`
        }
      },
      testCases: [
        { input: '([1, 2, 3, 4, 5, 6], lambda x: x % 2)', expected: '{1: [1, 3, 5], 0: [2, 4, 6]}' },
        { input: '([\'apple\', \'banana\', \'apricot\'], lambda x: x[0])', expected: '{\'a\': [\'apple\', \'apricot\'], \'b\': [\'banana\']}' },
        { input: '([], lambda x: x)', expected: '{}' }
      ],
      hints: `Use defaultdict(list) or setdefault() to group items. Time: O(n), Space: O(n)`
    },
    {
      id: 11,
      title: '767. Reorganize String',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/reorganize-string/',
      description: 'Rearrange characters in a string so that no two adjacent characters are the same. Use dictionary for frequency counting and heap for greedy selection.',
      code: {
        python: {
          starterCode: `def reorganizeString(s: str) -> str:
    """
    Rearrange string so no two adjacent chars are same.

    Args:
        s: Input string

    Returns:
        Reorganized string, or "" if impossible

    Examples:
        >>> reorganizeString("aab")
        "aba"
        >>> reorganizeString("aaab")
        ""
        >>> reorganizeString("vvvlo")
        "vlvov"

    Constraints:
        - 1 <= s.length <= 500
        - s consists of lowercase English letters
    """
    pass`,
          solution: `def reorganizeString(s: str) -> str:
    """
    Reorganize string using frequency counting and max heap.

    Algorithm:
    1. Count character frequencies using Counter (dict)
    2. Use max heap to greedily pick most frequent char
    3. Alternate characters to avoid adjacency
    4. Check if reorganization is possible

    Key insight: If max frequency > (n + 1) // 2, impossible
    """
    from collections import Counter
    import heapq

    # Count character frequencies
    freq = Counter(s)

    # Early termination: check if reorganization possible
    # Max freq should be at most (n + 1) // 2
    max_freq = max(freq.values())
    if max_freq > (len(s) + 1) // 2:
        return ""

    # Create max heap (negate counts for max heap behavior)
    max_heap = [(-count, char) for char, count in freq.items()]
    heapq.heapify(max_heap)

    result = []
    prev_count, prev_char = 0, ''

    while max_heap:
        # Pop most frequent character
        count, char = heapq.heappop(max_heap)
        result.append(char)

        # Add back previous character if it still has remaining count
        if prev_count < 0:
            heapq.heappush(max_heap, (prev_count, prev_char))

        # Update previous (decrement count since we used one)
        prev_count = count + 1  # count is negative, so +1 decreases magnitude
        prev_char = char

    reorganized = ''.join(result)

    # Verify no adjacent duplicates (should always pass with correct logic)
    return reorganized if len(reorganized) == len(s) else ""

# Alternative approach using Counter and sorting
def reorganizeString_alt(s: str) -> str:
    """Alternative: Sort by frequency and place chars."""
    from collections import Counter

    freq = Counter(s)
    max_freq = max(freq.values())

    # Check if possible
    if max_freq > (len(s) + 1) // 2:
        return ""

    # Sort characters by frequency (descending)
    sorted_chars = sorted(freq.items(), key=lambda x: -x[1])

    # Create result array
    result = [''] * len(s)
    idx = 0

    # Place characters
    for char, count in sorted_chars:
        for _ in range(count):
            result[idx] = char
            idx += 2  # Place at even indices first
            if idx >= len(s):
                idx = 1  # Then odd indices

    return ''.join(result)

# Time: O(n log k) where k is unique chars, Space: O(k)`
        }
      },
      testCases: [
        { input: '"aab"', expected: '"aba"' },
        { input: '"aaab"', expected: '""' },
        { input: '"vvvlo"', expected: '"vlvov" or "vovlv"' },
        { input: '"aabbcc"', expected: '"abcabc" or similar' }
      ],
      hints: `1. Use Counter to count frequencies. 2. Use max heap to greedily pick most frequent. 3. Check if max_freq > (n+1)//2 for early termination. Time: O(n log k), Space: O(k)`
    }
  ]

  const handleBackClick = () => {
    if (selectedProblem) {
      setSelectedProblem(null)
    } else {
      onBack()
    }
  }

  if (selectedProblem) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
        padding: '2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <button
            onClick={handleBackClick}
            style={{
              marginBottom: '1.5rem',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '500',
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
            ← Back to Problems
          </button>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            borderRadius: '0.75rem',
            padding: '2rem',
            border: '2px solid #3b82f6',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ margin: '0 0 0.5rem 0', color: '#93c5fd', fontSize: '1.875rem', fontWeight: 'bold' }}>{selectedProblem.title}</h2>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  backgroundColor: selectedProblem.difficulty === 'Easy' ? '#065f46' : selectedProblem.difficulty === 'Medium' ? '#92400e' : '#991b1b',
                  color: selectedProblem.difficulty === 'Easy' ? '#86efac' : selectedProblem.difficulty === 'Medium' ? '#fcd34d' : '#fca5a5'
                }}>
                  {selectedProblem.difficulty}
                </span>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <CompletionCheckbox
                  problemId={`PythonDictOps-${selectedProblem.id}`}
                  label="Mark as Completed"
                />
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#93c5fd', marginBottom: '0.75rem', fontSize: '1.25rem', fontWeight: '600' }}>Description</h3>
              <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>{selectedProblem.description}</p>
              {selectedProblem.leetcodeUrl && (
                <a
                  href={selectedProblem.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#ffa116',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#ff8c00'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#ffa116'}
                >
                  🔗 Solve on LeetCode
                </a>
              )}
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#93c5fd', marginBottom: '0.75rem', fontSize: '1.25rem', fontWeight: '600' }}>Python Solution</h3>
              {parseCodeSections(selectedProblem.code.python.starterCode).map(
                (section, idx) => (
                  <div key={section.id} style={{ marginBottom: '1rem' }}>
                    <button
                      onClick={() =>
                        toggleSection(
                          `starter-${problems.indexOf(selectedProblem)}`,
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
                        `starter-${problems.indexOf(selectedProblem)}-${idx}`
                      ]
                        ? '▼'
                        : '▶'}{' '}
                      Code Block {idx + 1}
                    </button>
                    {expandedSections[
                      `starter-${problems.indexOf(selectedProblem)}-${idx}`
                    ] && (
                      <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
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

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#93c5fd', marginBottom: '0.75rem', fontSize: '1.25rem', fontWeight: '600' }}>Test Cases</h3>
              {selectedProblem.testCases.map((tc, idx) => (
                <div key={idx} style={{
                  background: '#1f2937',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  marginBottom: '0.5rem',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  border: '1px solid #3b82f6',
                  color: '#d1d5db'
                }}>
                  <div><strong style={{ color: '#93c5fd' }}>Input:</strong> {tc.input}</div>
                  <div><strong style={{ color: '#86efac' }}>Expected:</strong> {tc.expected}</div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#93c5fd', marginBottom: '0.75rem', fontSize: '1.25rem', fontWeight: '600' }}>Hints</h3>
              <p style={{ color: '#d1d5db', background: '#1f2937', padding: '1rem', borderRadius: '0.5rem', lineHeight: '1.6', border: '1px solid #3b82f6' }}>
                💡 {selectedProblem.hints}
              </p>
            </div>

            <details style={{ marginTop: '2rem' }}>
              <summary style={{
                cursor: 'pointer',
                padding: '1rem',
                background: '#991b1b',
                borderRadius: '0.5rem',
                fontWeight: '600',
                color: '#fca5a5',
                border: '1px solid #ef4444'
              }}>
                Show Solution (Try solving first!)
              </summary>
              <div style={{ marginTop: '1rem' }}>
                {parseCodeSections(selectedProblem.code.python.solution).map(
                  (section, idx) => (
                    <div key={section.id} style={{ marginBottom: '1rem' }}>
                      <button
                        onClick={() =>
                          toggleSection(
                            `solution-${problems.indexOf(selectedProblem)}`,
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
                          `solution-${problems.indexOf(selectedProblem)}-${idx}`
                        ]
                          ? '▼'
                          : '▶'}{' '}
                        Code Block {idx + 1}
                      </button>
                      {expandedSections[
                        `solution-${problems.indexOf(selectedProblem)}-${idx}`
                      ] && (
                        <SyntaxHighlighter
                          language="python"
                          style={vscDarkPlus}
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
            </details>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <button
          onClick={handleBackClick}
          style={{
            marginBottom: '1.5rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '500',
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

        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            margin: '0 0 0.5rem 0',
            fontSize: '2.25rem',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>🗺️</span> Python Dictionary Operations
          </h1>
          <p style={{ color: '#d1d5db', fontSize: '1.1rem', margin: 0 }}>
            Master Python dictionary (map) operations including get, update, pop, setdefault, and more
          </p>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {problems.map((problem) => (
            <div
              key={problem.id}
              onClick={() => setSelectedProblem(problem)}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                cursor: 'pointer',
                border: '2px solid #3b82f6',
                transition: 'all 0.3s',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-0.5rem)'
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(59, 130, 246, 0.5)'
                e.currentTarget.style.borderColor = '#60a5fa'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                e.currentTarget.style.borderColor = '#3b82f6'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                <h3 style={{ margin: 0, color: '#93c5fd', fontSize: '1.125rem', fontWeight: 'bold' }}>{problem.title}</h3>
                <span style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  backgroundColor: problem.difficulty === 'Easy' ? '#065f46' : problem.difficulty === 'Medium' ? '#92400e' : '#991b1b',
                  color: problem.difficulty === 'Easy' ? '#86efac' : problem.difficulty === 'Medium' ? '#fcd34d' : '#fca5a5'
                }}>
                  {problem.difficulty}
                </span>
              </div>
              <p style={{ color: '#d1d5db', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PythonDictOperations

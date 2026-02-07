import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function PythonMapFunctions({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showSolution, setShowSolution] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [userCode, setUserCode] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [language, setLanguage] = useState(getPreferredLanguage())
  const [showDrawing, setShowDrawing] = useState(false)
  const [currentDrawing, setCurrentDrawing] = useState(null)

  useEffect(() => {
    const handleProgressUpdate = () => setRefreshKey(prev => prev + 1)
    window.addEventListener('progressUpdate', handleProgressUpdate)
    return () => window.removeEventListener('progressUpdate', handleProgressUpdate)
  }, [])

  useEffect(() => {
    const handleLanguageChange = (e) => {
      setLanguage(e.detail)
      if (selectedQuestion) {
        setUserCode(selectedQuestion.code[e.detail].starterCode)
      }
    }
    window.addEventListener('languageChange', handleLanguageChange)
    return () => window.removeEventListener('languageChange', handleLanguageChange)
  }, [selectedQuestion])

  const questions = [
    {
      id: 1,
      title: 'map() Function Basics',
      difficulty: 'Easy',
      description: 'Use map() to apply a function to all items in an iterable, returning an iterator.',
      examples: [
        { input: 'map(lambda x: x*2, [1,2,3])', output: '[2, 4, 6]' },
        { input: 'map(str, [1,2,3])', output: "['1', '2', '3']" },
        { input: 'map(lambda x,y: x+y, [1,2], [10,20])', output: '[11, 22]' }
      ],
      code: {
        python: {
          starterCode: `def map_examples():
    # map() returns an iterator, use list() to see results
    # Can pass multiple iterables to map with multi-argument function
    # Lazy evaluation - computation happens when you iterate

    # Your code here
    pass`,
          solution: `def map_examples():
    # Basic map usage
    numbers = [1, 2, 3, 4, 5]

    # Double all numbers
    doubled = list(map(lambda x: x * 2, numbers))
    # [2, 4, 6, 8, 10]

    # Convert to strings
    str_numbers = list(map(str, numbers))
    # ['1', '2', '3', '4', '5']

    # Square all numbers
    squared = list(map(lambda x: x**2, numbers))
    # [1, 4, 9, 16, 25]

    # Multiple iterables
    list1 = [1, 2, 3]
    list2 = [10, 20, 30]
    added = list(map(lambda x, y: x + y, list1, list2))
    # [11, 22, 33]

    # Map with custom function
    def celsius_to_fahrenheit(c):
        return (c * 9/5) + 32

    celsius = [0, 10, 20, 30, 40]
    fahrenheit = list(map(celsius_to_fahrenheit, celsius))
    # [32.0, 50.0, 68.0, 86.0, 104.0]

    return doubled, str_numbers, fahrenheit

# Time: O(n) where n is number of elements
# Space: O(n) if converting to list, O(1) for iterator`
        }
      },
      explanation: 'map() returns an iterator, use list() to see results. Can pass multiple iterables to map with multi-argument function. Lazy evaluation - computation happens when you iterate.',
      timeComplexity: 'O(n) to process n elements',
      spaceComplexity: 'O(1) for iterator, O(n) if converted to list'
    },
    {
      id: 2,
      title: 'filter() Function',
      difficulty: 'Easy',
      description: 'Use filter() to select elements from an iterable where a function returns True.',
      examples: [
        { input: 'filter(lambda x: x%2==0, [1,2,3,4])', output: '[2, 4]' },
        { input: 'filter(lambda x: x>5, [1,5,6,10])', output: '[6, 10]' },
        { input: 'filter(None, [0, 1, "", "hi", None])', output: '[1, "hi"]' }
      ],
      code: {
        python: {
          starterCode: `def filter_examples():
    # filter() returns iterator of elements where function is True
    # Use filter(None, iterable) to remove falsy values
    # filter() is lazy - only processes when iterated

    # Your code here
    pass`,
          solution: `def filter_examples():
    numbers = list(range(1, 21))

    # Filter even numbers
    evens = list(filter(lambda x: x % 2 == 0, numbers))
    # [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

    # Filter odd numbers
    odds = list(filter(lambda x: x % 2 != 0, numbers))
    # [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

    # Filter strings by length
    words = ['a', 'ab', 'abc', 'abcd', 'abcde']
    long_words = list(filter(lambda w: len(w) >= 3, words))
    # ['abc', 'abcd', 'abcde']

    # Filter None/falsy values
    mixed = [0, 1, '', 'hello', None, False, True, [], [1]]
    truthy_values = list(filter(None, mixed))
    # [1, 'hello', True, [1]]

    # Filter with custom function
    def is_positive_even(n):
        return n > 0 and n % 2 == 0

    pos_evens = list(filter(is_positive_even, range(-5, 10)))
    # [2, 4, 6, 8]

    return evens, long_words, truthy_values

# Time: O(n) to check all n elements
# Space: O(k) where k is number of elements passing filter`
        }
      },
      explanation: 'filter() returns iterator of elements where function is True. Use filter(None, iterable) to remove falsy values. filter() is lazy - only processes when iterated.',
      timeComplexity: 'O(n) to process n elements',
      spaceComplexity: 'O(1) for iterator, O(k) if converted to list (k = filtered count)'
    },
    {
      id: 3,
      title: 'reduce() Function (functools)',
      difficulty: 'Medium',
      description: 'Use reduce() to apply a function cumulatively to items, reducing to a single value.',
      examples: [
        { input: 'reduce(lambda x,y: x+y, [1,2,3,4])', output: '10' },
        { input: 'reduce(lambda x,y: x*y, [1,2,3,4])', output: '24' },
        { input: 'reduce(lambda x,y: x+y, [1,2,3], 10)', output: '16' }
      ],
      code: {
        python: {
          starterCode: `from functools import reduce

def reduce_examples():
    # reduce() requires import from functools
    # Third parameter is optional initial value
    # Useful for cumulative operations: sum, product, concat

    # Your code here
    pass`,
          solution: `from functools import reduce

def reduce_examples():
    numbers = [1, 2, 3, 4, 5]

    # Sum all numbers
    total = reduce(lambda acc, x: acc + x, numbers)
    # 15

    # Product of all numbers
    product = reduce(lambda acc, x: acc * x, numbers)
    # 120

    # Find maximum
    max_val = reduce(lambda acc, x: acc if acc > x else x, numbers)
    # 5

    # Sum with initial value
    total_plus_100 = reduce(lambda acc, x: acc + x, numbers, 100)
    # 115

    # Flatten list of lists
    nested = [[1, 2], [3, 4], [5, 6, 7]]
    flattened = reduce(lambda acc, lst: acc + lst, nested)
    # [1, 2, 3, 4, 5, 6, 7]

    # Count occurrences
    items = ['a', 'b', 'a', 'c', 'b', 'a']
    counts = reduce(
        lambda acc, item: {**acc, item: acc.get(item, 0) + 1},
        items,
        {}
    )
    # {'a': 3, 'b': 2, 'c': 1}

    return total, product, flattened, counts

# Time: O(n) - processes each element once
# Space: O(1) - constant space (accumulator)`
        }
      },
      explanation: 'reduce() requires import from functools. Third parameter is optional initial value. Useful for cumulative operations: sum, product, concat.',
      timeComplexity: 'O(n) where n is number of elements',
      spaceComplexity: 'O(1) for accumulator (may vary based on operation)'
    },
    {
      id: 4,
      title: 'zip() Function',
      difficulty: 'Easy',
      description: 'Use zip() to combine multiple iterables element-wise into tuples.',
      examples: [
        { input: 'zip([1,2,3], [4,5,6])', output: '[(1,4), (2,5), (3,6)]' },
        { input: 'zip([1,2], [10,20,30])', output: '[(1,10), (2,20)]' },
        { input: 'dict(zip(["a","b"], [1,2]))', output: "{'a':1, 'b':2}" }
      ],
      code: {
        python: {
          starterCode: `def zip_examples():
    # zip() stops at the shortest iterable
    # Use zip(*zipped) to unzip
    # Combine with dict() to create dictionaries

    # Your code here
    pass`,
          solution: `def zip_examples():
    # Basic zip
    list1 = [1, 2, 3]
    list2 = ['a', 'b', 'c']
    zipped = list(zip(list1, list2))
    # [(1, 'a'), (2, 'b'), (3, 'c')]

    # Zip three lists
    names = ['Alice', 'Bob', 'Charlie']
    ages = [25, 30, 35]
    cities = ['NYC', 'LA', 'Chicago']
    people = list(zip(names, ages, cities))
    # [('Alice', 25, 'NYC'), ('Bob', 30, 'LA'), ('Charlie', 35, 'Chicago')]

    # Stops at shortest
    short = [1, 2]
    long = [10, 20, 30, 40, 50]
    result = list(zip(short, long))
    # [(1, 10), (2, 20)]

    # Unzip (transpose)
    pairs = [(1, 'a'), (2, 'b'), (3, 'c')]
    nums, chars = zip(*pairs)
    # nums = (1, 2, 3)
    # chars = ('a', 'b', 'c')

    # Create dictionary
    keys = ['name', 'age', 'occupation']
    values = ['Alice', 30, 'Engineer']
    person_dict = dict(zip(keys, values))
    # {'name': 'Alice', 'age': 30, 'occupation': 'Engineer'}

    return zipped, people, person_dict

# Time: O(min(n1, n2, ...)) - stops at shortest iterable
# Space: O(1) for iterator, O(k) if converted to list`
        }
      },
      explanation: "zip() stops at the shortest iterable. Use zip(*zipped) to unzip. Combine with dict() to create dictionaries.",
      timeComplexity: 'O(min(n1, n2, ...)) where ni are iterable lengths',
      spaceComplexity: 'O(1) for iterator, O(k) if converted to list'
    },
    {
      id: 5,
      title: 'enumerate() Function',
      difficulty: 'Easy',
      description: 'Use enumerate() to get index-value pairs when iterating over a sequence.',
      examples: [
        { input: 'enumerate(["a","b","c"])', output: '[(0,"a"), (1,"b"), (2,"c")]' },
        { input: 'enumerate(["a","b"], start=1)', output: '[(1,"a"), (2,"b")]' },
        { input: 'dict(enumerate(["x","y"]))', output: '{0:"x", 1:"y"}' }
      ],
      code: {
        python: {
          starterCode: `def enumerate_examples():
    # enumerate() returns (index, value) tuples
    # Use start parameter to begin at different index
    # Useful for finding positions while iterating

    # Your code here
    pass`,
          solution: `def enumerate_examples():
    items = ['apple', 'banana', 'cherry', 'date', 'elderberry']

    # Basic enumeration
    indexed_items = list(enumerate(items))
    # [(0, 'apple'), (1, 'banana'), (2, 'cherry'), (3, 'date'), (4, 'elderberry')]

    # Start at 1
    one_indexed = list(enumerate(items, start=1))
    # [(1, 'apple'), (2, 'banana'), (3, 'cherry'), (4, 'date'), (5, 'elderberry')]

    # Find all indices of matching condition
    numbers = [10, 25, 30, 15, 40, 25, 50]
    indices_over_20 = [i for i, n in enumerate(numbers) if n > 20]
    # [1, 2, 4, 5, 6]

    # Get index and value pairs for filtering
    long_words = [(i, word) for i, word in enumerate(items) if len(word) > 5]
    # [(1, 'banana'), (2, 'cherry'), (4, 'elderberry')]

    # Create dictionary with custom keys
    word_to_pos = {word: i for i, word in enumerate(items)}
    # {'apple': 0, 'banana': 1, 'cherry': 2, 'date': 3, 'elderberry': 4}

    return indexed_items, long_words, word_to_pos

# Time: O(n) to enumerate n elements
# Space: O(1) for iterator, O(n) if converted to list`
        }
      },
      explanation: "enumerate() returns (index, value) tuples. Use start parameter to begin at different index. Useful for finding positions while iterating.",
      timeComplexity: 'O(n) where n is number of elements',
      spaceComplexity: 'O(1) for iterator, O(n) if converted to list'
    },
    {
      id: 6,
      title: 'any() and all() Functions',
      difficulty: 'Easy',
      description: 'Use any() to check if any element is True, all() to check if all elements are True.',
      examples: [
        { input: 'any([False, False, True])', output: 'True' },
        { input: 'all([True, True, False])', output: 'False' },
        { input: 'any(x>5 for x in [1,2,3])', output: 'False' },
        { input: 'all(x>0 for x in [1,2,3])', output: 'True' }
      ],
      code: {
        python: {
          starterCode: `def any_all_examples():
    # any() returns True if at least one element is truthy
    # all() returns True only if all elements are truthy
    # any([]) is False, all([]) is True

    # Your code here
    pass`,
          solution: `def any_all_examples():
    # any() - at least one True
    numbers = [1, 3, 5, 7, 8, 9]
    has_even = any(n % 2 == 0 for n in numbers)
    # True (8 is even)

    has_negative = any(n < 0 for n in numbers)
    # False (no negatives)

    # all() - all must be True
    all_positive = all(n > 0 for n in numbers)
    # True (all are positive)

    all_even = all(n % 2 == 0 for n in numbers)
    # False (not all are even)

    # Validate conditions
    scores = [85, 92, 78, 88, 95]

    # Check if anyone failed (score < 60)
    anyone_failed = any(score < 60 for score in scores)
    # False

    # Check if everyone passed
    everyone_passed = all(score >= 60 for score in scores)
    # True

    # Empty iterables
    print(any([]))   # False
    print(all([]))   # True (vacuous truth)

    return has_even, everyone_passed

# Time: O(n) worst case, but short-circuits
# Space: O(1) - constant space`
        }
      },
      explanation: "any() returns True if at least one element is truthy. all() returns True only if all elements are truthy. any([]) is False, all([]) is True.",
      timeComplexity: 'O(n) worst case, but short-circuits on first True/False',
      spaceComplexity: 'O(1) - constant space'
    },
    {
      id: 7,
      title: 'sorted() and reversed() Functions',
      difficulty: 'Easy',
      description: 'Use sorted() to create a sorted copy and reversed() to reverse an iterable.',
      examples: [
        { input: 'sorted([3,1,2])', output: '[1, 2, 3]' },
        { input: 'sorted([3,1,2], reverse=True)', output: '[3, 2, 1]' },
        { input: 'sorted(["ab","a","abc"], key=len)', output: '["a", "ab", "abc"]' }
      ],
      code: {
        python: {
          starterCode: `def sorted_reversed_examples():
    # sorted() creates NEW list, does not modify original
    # Use key parameter for custom sorting
    # reversed() returns iterator, not list

    # Your code here
    pass`,
          solution: `def sorted_reversed_examples():
    # Basic sorting
    numbers = [5, 2, 8, 1, 9, 3, 7]
    ascending = sorted(numbers)
    # [1, 2, 3, 5, 7, 8, 9]

    descending = sorted(numbers, reverse=True)
    # [9, 8, 7, 5, 3, 2, 1]

    # Sort strings
    words = ['banana', 'apple', 'cherry', 'date']
    alphabetical = sorted(words)
    # ['apple', 'banana', 'cherry', 'date']

    # Sort by length
    by_length = sorted(words, key=len)
    # ['date', 'apple', 'banana', 'cherry']

    # Sort by multiple criteria
    students = [
        ('Alice', 85),
        ('Bob', 92),
        ('Charlie', 85),
        ('David', 92)
    ]
    # Sort by score desc, then name asc
    sorted_students = sorted(students, key=lambda s: (-s[1], s[0]))
    # [('Bob', 92), ('David', 92), ('Alice', 85), ('Charlie', 85)]

    # reversed() function
    numbers = [1, 2, 3, 4, 5]
    reversed_nums = list(reversed(numbers))
    # [5, 4, 3, 2, 1]

    # Reverse string
    text = "Python"
    reversed_text = ''.join(reversed(text))
    # "nohtyP"

    return ascending, sorted_students, reversed_nums

# sorted() - Time: O(n log n), Space: O(n)
# reversed() - Time: O(1), Space: O(1) for iterator`
        }
      },
      explanation: "sorted() creates NEW list, does not modify original. Use key parameter for custom sorting. reversed() returns iterator, not list.",
      timeComplexity: 'sorted(): O(n log n), reversed(): O(1) for iterator',
      spaceComplexity: 'sorted(): O(n), reversed(): O(1) for iterator'
    },
    {
      id: 8,
      title: 'itertools.zip_longest()',
      difficulty: 'Medium',
      description: 'Use zip_longest() from itertools to zip iterables without stopping at the shortest.',
      examples: [
        { input: 'zip_longest([1,2], [10,20,30], fillvalue=0)', output: '[(1,10), (2,20), (0,30)]' },
        { input: 'zip_longest([1], [10,20], [100,200,300])', output: '[(1,10,100), (None,20,200), (None,None,300)]' }
      ],
      code: {
        python: {
          starterCode: `from itertools import zip_longest

def zip_longest_examples():
    # zip_longest() continues until longest iterable is exhausted
    # Use fillvalue parameter to specify what to fill with
    # Import from itertools module

    # Your code here
    pass`,
          solution: `from itertools import zip_longest

def zip_longest_examples():
    # Basic usage
    short = [1, 2, 3]
    long = [10, 20, 30, 40, 50]

    # With None fill (default)
    with_none = list(zip_longest(short, long))
    # [(1, 10), (2, 20), (3, 30), (None, 40), (None, 50)]

    # With custom fill value
    with_zero = list(zip_longest(short, long, fillvalue=0))
    # [(1, 10), (2, 20), (3, 30), (0, 40), (0, 50)]

    # Multiple iterables
    a = [1, 2]
    b = ['a', 'b', 'c']
    c = [10, 20, 30, 40]

    result = list(zip_longest(a, b, c, fillvalue='X'))
    # [(1, 'a', 10), (2, 'b', 20), ('X', 'c', 30), ('X', 'X', 40)]

    # Transpose jagged matrix (different row lengths)
    jagged = [
        [1, 2, 3],
        [4, 5],
        [6, 7, 8, 9]
    ]
    transposed = list(zip_longest(*jagged, fillvalue=0))
    # [(1, 4, 6), (2, 5, 7), (3, 0, 8), (0, 0, 9)]

    return with_zero, result, transposed

# Time: O(max(n1, n2, ...)) - processes to longest iterable
# Space: O(max(n1, n2, ...)) if converted to list`
        }
      },
      explanation: "zip_longest() continues until longest iterable is exhausted. Use fillvalue parameter to specify what to fill with. Import from itertools module.",
      timeComplexity: 'O(max(n1, n2, ...)) where ni are iterable lengths',
      spaceComplexity: 'O(1) for iterator, O(k) if converted to list'
    },
    {
      id: 9,
      title: 'starmap() from itertools',
      difficulty: 'Medium',
      description: 'Use starmap() to apply a function to argument tuples unpacked from an iterable.',
      examples: [
        { input: 'starmap(lambda x,y: x+y, [(1,2), (3,4)])', output: '[3, 7]' },
        { input: 'starmap(pow, [(2,3), (3,2)])', output: '[8, 9]' },
        { input: 'starmap(max, [(1,2,3), (5,1,2)])', output: '[3, 5]' }
      ],
      code: {
        python: {
          starterCode: `from itertools import starmap

def starmap_examples():
    # starmap() unpacks each iterable element as function arguments
    # Useful when you have tuples of arguments
    # More readable than lambda x: f(*x) with map()

    # Your code here
    pass`,
          solution: `from itertools import starmap

def starmap_examples():
    # Addition with unpacking
    pairs = [(1, 2), (3, 4), (5, 6), (7, 8)]
    sums = list(starmap(lambda x, y: x + y, pairs))
    # [3, 7, 11, 15]

    # Power calculation
    base_exp = [(2, 3), (3, 2), (5, 2), (10, 3)]
    powers = list(starmap(pow, base_exp))
    # [8, 9, 25, 1000]

    # Max of tuples
    number_sets = [(1, 5, 3), (9, 2, 7), (4, 8, 6)]
    maximums = list(starmap(max, number_sets))
    # [5, 9, 8]

    # Custom function with 3 arguments
    def calculate_volume(length, width, height):
        return length * width * height

    dimensions = [(2, 3, 4), (5, 6, 7), (1, 2, 3)]
    volumes = list(starmap(calculate_volume, dimensions))
    # [24, 210, 6]

    # Mathematical operations
    def hypotenuse(a, b):
        return (a**2 + b**2)**0.5

    right_triangles = [(3, 4), (5, 12), (8, 15)]
    hypotenuses = list(starmap(hypotenuse, right_triangles))
    # [5.0, 13.0, 17.0]

    return sums, powers, volumes

# Time: O(n) where n is number of tuples
# Space: O(1) for iterator, O(n) if converted to list`
        }
      },
      explanation: "starmap() unpacks each iterable element as function arguments. Useful when you have tuples of arguments. More readable than lambda x: f(*x) with map().",
      timeComplexity: 'O(n) where n is number of argument tuples',
      spaceComplexity: 'O(1) for iterator, O(n) if converted to list'
    },
    {
      id: 10,
      title: 'Combining Multiple Map Functions',
      difficulty: 'Hard',
      description: 'Master combining map, filter, reduce, and other functions for complex transformations.',
      examples: [
        { input: 'map then filter then reduce', output: 'Chained transformations' },
        { input: 'zip with map for parallel ops', output: 'Element-wise operations' }
      ],
      code: {
        python: {
          starterCode: `from functools import reduce
from itertools import starmap

def combining_map_functions():
    # Chain operations: filter → map → reduce
    # Use generator expressions for readability
    # Combine zip and map for parallel transformations

    # Your code here
    pass`,
          solution: `from functools import reduce
from itertools import starmap

def combining_map_functions():
    # Example 1: Filter, Map, Reduce pipeline
    numbers = list(range(1, 21))

    # Get sum of squares of even numbers
    evens = filter(lambda x: x % 2 == 0, numbers)
    squared = map(lambda x: x**2, evens)
    total = reduce(lambda acc, x: acc + x, squared)
    # 1540

    # Better with generator expression
    total2 = sum(x**2 for x in numbers if x % 2 == 0)
    # 1540

    # Example 2: Complex data processing
    students = [
        {'name': 'Alice', 'scores': [85, 90, 88]},
        {'name': 'Bob', 'scores': [92, 88, 95]},
        {'name': 'Charlie', 'scores': [78, 82, 80]}
    ]

    # Get average score for each student
    averages = list(map(
        lambda s: (s['name'], sum(s['scores']) / len(s['scores'])),
        students
    ))
    # [('Alice', 87.67), ('Bob', 91.67), ('Charlie', 80.0)]

    # Filter students with avg >= 85
    high_performers = list(filter(
        lambda x: x[1] >= 85,
        averages
    ))
    # [('Alice', 87.67), ('Bob', 91.67)]

    # Example 3: Parallel list operations
    prices = [100, 200, 300, 400]
    discounts = [0.1, 0.2, 0.15, 0.25]
    quantities = [2, 1, 3, 2]

    # Calculate total cost with discounts
    total_costs = list(starmap(
        lambda p, d, q: p * (1 - d) * q,
        zip(prices, discounts, quantities)
    ))
    # [180.0, 160.0, 765.0, 600.0]

    # Total revenue
    revenue = reduce(lambda acc, x: acc + x, total_costs)
    # 1705.0

    return total, high_performers, total_costs

# Time: Depends on chain complexity, typically O(n) per operation
# Space: O(n) if materializing results, O(1) for lazy evaluation`
        }
      },
      explanation: "Chain operations: filter → map → reduce. Use generator expressions for readability. Combine zip and map for parallel transformations.",
      timeComplexity: 'O(n×m) where n=elements, m=number of operations in chain',
      spaceComplexity: 'O(1) for iterators, O(n) if materializing intermediate results'
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`PythonMapFunctions-${q.id}`)).length
    return { completed, total: questions.length, percentage: Math.round((completed / questions.length) * 100) }
  }

  const stats = getCompletionStats()

  // Group questions by difficulty
  const groupedQuestions = {
    Easy: questions.filter(q => q.difficulty === 'Easy'),
    Medium: questions.filter(q => q.difficulty === 'Medium'),
    Hard: questions.filter(q => q.difficulty === 'Hard')
  }

  const selectQuestion = (question) => {
    setSelectedQuestion(question)
    setShowSolution(false)
    setShowExplanation(false)
    setUserCode(question.code[language].starterCode)
    setOutput('')
    setShowDrawing(false)
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '#10b981'
      case 'Medium': return '#f59e0b'
      case 'Hard': return '#ef4444'
      default: return '#6b7280'
    }
  }

  if (selectedQuestion) {
    return (
      <div style={{ padding: '2rem', maxWidth: '1800px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setSelectedQuestion(null)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}>
            ← Back to Python
          </button>
          <LanguageToggle />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Problem Description */}
          <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '12px', border: '2px solid #374151', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: 'white', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <CompletionCheckbox problemId={`PythonMapFunctions-${selectedQuestion.id}`} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '0.75rem' }}>Description</h3>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.6' }}>{selectedQuestion.description}</p>
            </div>

            {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '0.75rem' }}>Examples</h3>
                {selectedQuestion.examples.map((example, idx) => (
                  <div key={idx} style={{ backgroundColor: '#1f2937', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #374151', color: '#9ca3af' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: 'white' }}>Input:</strong> <code style={{ color: '#9ca3af' }}>{example.input}</code>
                    </div>
                    <div>
                      <strong style={{ color: 'white' }}>Output:</strong> <code style={{ color: '#9ca3af' }}>{example.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedQuestion.explanation && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '0.75rem' }}>Explanation</h3>
                <p style={{ fontSize: '0.95rem', color: '#9ca3af', lineHeight: '1.6' }}>{selectedQuestion.explanation}</p>
              </div>
            )}

            {(selectedQuestion.timeComplexity || selectedQuestion.spaceComplexity) && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#1f2937', borderRadius: '8px', border: '1px solid #374151' }}>
                <h3 style={{ fontSize: '1rem', color: 'white', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#9ca3af' }}>Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#9ca3af' }}>Space: {selectedQuestion.spaceComplexity}</div>}
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '12px', border: '2px solid #374151', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedQuestion.code[language].solution) }} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}>
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
              <button onClick={() => setUserCode(selectedQuestion.code[language].starterCode)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}>
                Reset Code
              </button>
            </div>

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5', backgroundColor: '#111827', color: '#9ca3af' }} spellCheck={false} />

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: 'white', marginBottom: '0.5rem' }}>Output</h3>
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
                  {output}
                </SyntaxHighlighter>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}>
          ← Back to Python
        </button>
      </div>

      <div style={{ textAlign: 'left', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem' }}>Python Map Functions</h1>
        <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>Master Python's functional programming tools: map(), filter(), reduce(), zip(), enumerate(), any(), all(), and more</p>

        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

        <CollapsibleSidebar
          items={questions}
          selectedIndex={selectedQuestion ? questions.findIndex(q => q.id === selectedQuestion.id) : -1}
          onSelect={(index) => selectQuestion(questions[index])}
          title="Problems"
          getItemLabel={(item) => item.title}
          getItemIcon={(item) => {
            const colors = { Easy: '🟢', Medium: '🟡', Hard: '🔴' };
            return colors[item.difficulty] || '⚪';
          }}
          primaryColor="#3b82f6"
        />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem 2rem', backgroundColor: '#1f2937', borderRadius: '12px', border: '2px solid #374151' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'white' }}>{stats.completed}/{stats.total}</div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>Completed</div>
          </div>
          <div style={{ padding: '1rem 2rem', backgroundColor: '#1f2937', borderRadius: '12px', border: '2px solid #374151' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{stats.percentage}%</div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>Progress</div>
          </div>
        </div>
      </div>

      {Object.entries(groupedQuestions).map(([difficulty, difficultyQuestions]) => (
        difficultyQuestions.length > 0 && (
          <div key={difficulty} style={{ marginBottom: '2rem' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', backgroundColor: '#1f2937', border: '2px solid #374151', borderRadius: '12px', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: getDifficultyColor(difficulty) }}>{difficulty}</span>
                <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>({difficultyQuestions.length} problems)</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem' }}>
              {difficultyQuestions.map((question) => (
                <div key={question.id} onClick={() => selectQuestion(question)} style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '12px', border: '2px solid #374151', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(55, 65, 81, 0.5)'; e.currentTarget.style.borderColor = '#4b5563' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#374151' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0, flex: 1 }}>{question.id}. {question.title}</h3>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                    <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ transform: 'scale(0.85)' }}>
                        <CompletionCheckbox problemId={`PythonMapFunctions-${question.id}`} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  )
}

export default PythonMapFunctions

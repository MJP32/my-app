import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function MapOperations({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
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
  const [expandedSections, setExpandedSections] = useState({
    Easy: true,
    Medium: true,
    Hard: true
  })

  useKeyboardNavigation({
    onBack,
    onPrevious,
    onNext,
    onPreviousSubcategory,
    onNextSubcategory,
    isQuestionView: !!selectedQuestion,
    setSelectedQuestion
  })

  useEffect(() => {
    const unsubscribe = isProblemCompleted.subscribe(() => {
      setRefreshKey(prev => prev + 1)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    setLanguage(getPreferredLanguage())
  }, [selectedQuestion])

  const questions = [
    {
      id: 1,
      title: 'Map - Square Numbers',
      difficulty: 'Easy',
      description: 'Given a list of numbers, use the map() function to return a new list containing the square of each number.',
      examples: [
        { input: '[1, 2, 3, 4, 5]', output: '[1, 4, 9, 16, 25]' },
        { input: '[10, 20, 30]', output: '[100, 400, 900]' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.stream.*;

class Solution {
    public List<Integer> squareNumbers(List<Integer> numbers) {
        // Use Stream map() to square each number

    }
}`,
          solution: `import java.util.*;
import java.util.stream.*;

class Solution {
    public List<Integer> squareNumbers(List<Integer> numbers) {
        return numbers.stream()
            .map(x -> x * x)
            .collect(Collectors.toList());
    }

    // Alternative using method reference
    public List<Integer> squareNumbersAlt(List<Integer> numbers) {
        return numbers.stream()
            .map(x -> Math.pow(x, 2))
            .map(Double::intValue)
            .collect(Collectors.toList());
    }
}`
        },
        python: {
          starterCode: `def square_numbers(numbers):
    # Use map() to square each number
    pass`,
          solution: `def square_numbers(numbers):
    return list(map(lambda x: x ** 2, numbers))

# Alternative solution
def square_numbers_alt(numbers):
    return list(map(lambda x: x * x, numbers))`
        }
      },
      explanation: 'Map transforms each element by applying a function. Python uses map() with lambda, Java uses Stream.map().',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    },
    {
      id: 2,
      title: 'Filter - Even Numbers',
      difficulty: 'Easy',
      description: 'Given a list of numbers, use the filter() function to return a new list containing only the even numbers.',
      examples: [
        { input: '[1, 2, 3, 4, 5, 6, 7, 8]', output: '[2, 4, 6, 8]' },
        { input: '[10, 15, 20, 25, 30]', output: '[10, 20, 30]' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.stream.*;

class Solution {
    public List<Integer> filterEvenNumbers(List<Integer> numbers) {
        // Use Stream filter() to get only even numbers

    }
}`,
          solution: `import java.util.*;
import java.util.stream.*;

class Solution {
    public List<Integer> filterEvenNumbers(List<Integer> numbers) {
        return numbers.stream()
            .filter(x -> x % 2 == 0)
            .collect(Collectors.toList());
    }
}`
        },
        python: {
          starterCode: `def filter_even_numbers(numbers):
    # Use filter() to get only even numbers
    pass`,
          solution: `def filter_even_numbers(numbers):
    return list(filter(lambda x: x % 2 == 0, numbers))`
        }
      },
      explanation: 'Filter selects elements that satisfy a condition. Python uses filter() with lambda, Java uses Stream.filter().',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(k) where k is filtered count'
    },
    {
      id: 3,
      title: 'Reduce - Sum of List',
      difficulty: 'Medium',
      description: 'Given a list of numbers, use the reduce() function from functools to calculate the sum of all numbers.',
      examples: [
        { input: '[1, 2, 3, 4, 5]', output: '15' },
        { input: '[10, 20, 30, 40]', output: '100' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.stream.*;

class Solution {
    public int sumWithReduce(List<Integer> numbers) {
        // Use Stream reduce() to sum all numbers

    }
}`,
          solution: `import java.util.*;
import java.util.stream.*;

class Solution {
    public int sumWithReduce(List<Integer> numbers) {
        return numbers.stream()
            .reduce(0, (acc, x) -> acc + x);
    }

    // Alternative using method reference
    public int sumWithReduceAlt(List<Integer> numbers) {
        return numbers.stream()
            .reduce(0, Integer::sum);
    }
}`
        },
        python: {
          starterCode: `from functools import reduce

def sum_with_reduce(numbers):
    # Use reduce() to sum all numbers
    pass`,
          solution: `from functools import reduce

def sum_with_reduce(numbers):
    return reduce(lambda acc, x: acc + x, numbers, 0)

# Alternative solution
def sum_with_reduce_alt(numbers):
    if not numbers:
        return 0
    return reduce(lambda acc, x: acc + x, numbers)`
        }
      },
      explanation: 'Reduce accumulates values by applying a function repeatedly. Python uses reduce() from functools, Java uses Stream.reduce().',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 4,
      title: 'Reduce - Product of List',
      difficulty: 'Medium',
      description: 'Given a list of numbers, use the reduce() function to calculate the product of all numbers.',
      examples: [
        { input: '[1, 2, 3, 4, 5]', output: '120' },
        { input: '[2, 3, 4]', output: '24' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.stream.*;

class Solution {
    public int productWithReduce(List<Integer> numbers) {
        // Use Stream reduce() to multiply all numbers

    }
}`,
          solution: `import java.util.*;
import java.util.stream.*;

class Solution {
    public int productWithReduce(List<Integer> numbers) {
        return numbers.stream()
            .reduce(1, (acc, x) -> acc * x);
    }
}`
        },
        python: {
          starterCode: `from functools import reduce

def product_with_reduce(numbers):
    # Use reduce() to multiply all numbers
    pass`,
          solution: `from functools import reduce

def product_with_reduce(numbers):
    return reduce(lambda acc, x: acc * x, numbers, 1)

# Alternative solution
def product_with_reduce_alt(numbers):
    if not numbers:
        return 1
    return reduce(lambda acc, x: acc * x, numbers)`
        }
      },
      explanation: 'Product is similar to sum but uses multiplication. Initial value should be 1 (not 0) to avoid zeroing out the result.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 5,
      title: 'Map + Filter - Square Even Numbers',
      difficulty: 'Medium',
      description: 'Given a list of numbers, use both filter() and map() to first filter even numbers, then square them.',
      examples: [
        { input: '[1, 2, 3, 4, 5, 6]', output: '[4, 16, 36]' },
        { input: '[10, 15, 20, 25]', output: '[100, 400]' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.stream.*;

class Solution {
    public List<Integer> squareEvenNumbers(List<Integer> numbers) {
        // First filter even numbers, then square them

    }
}`,
          solution: `import java.util.*;
import java.util.stream.*;

class Solution {
    public List<Integer> squareEvenNumbers(List<Integer> numbers) {
        return numbers.stream()
            .filter(x -> x % 2 == 0)
            .map(x -> x * x)
            .collect(Collectors.toList());
    }
}`
        },
        python: {
          starterCode: `def square_even_numbers(numbers):
    # First filter even numbers, then square them
    pass`,
          solution: `def square_even_numbers(numbers):
    evens = filter(lambda x: x % 2 == 0, numbers)
    return list(map(lambda x: x ** 2, evens))

# Alternative - chained in one line
def square_even_numbers_alt(numbers):
    return list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))`
        }
      },
      explanation: 'Chain operations by passing the result of filter() to map(). In Java, use method chaining on streams.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(k) where k is filtered count'
    },
    {
      id: 6,
      title: 'Zip - Combine Two Lists',
      difficulty: 'Easy',
      description: 'Given two lists of equal length, use the zip() function to combine them into a list of tuples.',
      examples: [
        { input: "names = ['Alice', 'Bob', 'Charlie'], ages = [25, 30, 35]", output: "[('Alice', 25), ('Bob', 30), ('Charlie', 35)]" },
        { input: "keys = ['a', 'b', 'c'], values = [1, 2, 3]", output: "[('a', 1), ('b', 2), ('c', 3)]" }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.stream.*;

class Solution {
    public List<Map.Entry<String, Integer>> combineLists(List<String> list1, List<Integer> list2) {
        // Combine the two lists into pairs

    }
}`,
          solution: `import java.util.*;
import java.util.stream.*;

class Solution {
    public List<Map.Entry<String, Integer>> combineLists(List<String> list1, List<Integer> list2) {
        return IntStream.range(0, Math.min(list1.size(), list2.size()))
            .mapToObj(i -> Map.entry(list1.get(i), list2.get(i)))
            .collect(Collectors.toList());
    }

    // Alternative: Return as Map
    public Map<String, Integer> combineToMap(List<String> keys, List<Integer> values) {
        return IntStream.range(0, Math.min(keys.size(), values.size()))
            .boxed()
            .collect(Collectors.toMap(keys::get, values::get));
    }
}`
        },
        python: {
          starterCode: `def combine_lists(list1, list2):
    # Use zip() to combine the two lists
    pass`,
          solution: `def combine_lists(list1, list2):
    return list(zip(list1, list2))

# Alternative with dict conversion
def combine_to_dict(keys, values):
    return dict(zip(keys, values))`
        }
      },
      explanation: 'Zip pairs elements from iterables. Python has built-in zip(), Java uses IntStream.range() with mapToObj().',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    },
    {
      id: 7,
      title: 'Any and All - Check Conditions',
      difficulty: 'Easy',
      description: 'Given a list of numbers, use any() to check if any number is even, and use all() to check if all numbers are positive.',
      examples: [
        { input: '[1, 3, 5, 7]', output: 'has_even=False, all_positive=True' },
        { input: '[2, 4, 6, 8]', output: 'has_even=True, all_positive=True' },
        { input: '[-1, 2, 3]', output: 'has_even=True, all_positive=False' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;

class Solution {
    public Map<String, Boolean> checkConditions(List<Integer> numbers) {
        // Return map with hasEven and allPositive

    }
}`,
          solution: `import java.util.*;

class Solution {
    public Map<String, Boolean> checkConditions(List<Integer> numbers) {
        boolean hasEven = numbers.stream().anyMatch(x -> x % 2 == 0);
        boolean allPositive = numbers.stream().allMatch(x -> x > 0);

        Map<String, Boolean> result = new HashMap<>();
        result.put("hasEven", hasEven);
        result.put("allPositive", allPositive);
        return result;
    }
}`
        },
        python: {
          starterCode: `def check_conditions(numbers):
    # Return tuple (has_even, all_positive)
    pass`,
          solution: `def check_conditions(numbers):
    has_even = any(x % 2 == 0 for x in numbers)
    all_positive = all(x > 0 for x in numbers)
    return (has_even, all_positive)

# Alternative with explicit map
def check_conditions_alt(numbers):
    has_even = any(map(lambda x: x % 2 == 0, numbers))
    all_positive = all(map(lambda x: x > 0, numbers))
    return (has_even, all_positive)`
        }
      },
      explanation: 'any() returns True if any element satisfies condition. all() returns True if all do. Java uses anyMatch() and allMatch().',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 8,
      title: 'Enumerate - Index with Value',
      difficulty: 'Easy',
      description: 'Given a list of strings, use enumerate() to create a list of tuples containing the index and value for each element.',
      examples: [
        { input: "['apple', 'banana', 'cherry']", output: "[(0, 'apple'), (1, 'banana'), (2, 'cherry')]" },
        { input: "['red', 'green', 'blue']", output: "[(0, 'red'), (1, 'green'), (2, 'blue')]" }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.stream.*;

class Solution {
    public List<Map.Entry<Integer, String>> enumerateList(List<String> items) {
        // Create list of index-value pairs

    }
}`,
          solution: `import java.util.*;
import java.util.stream.*;

class Solution {
    public List<Map.Entry<Integer, String>> enumerateList(List<String> items) {
        return IntStream.range(0, items.size())
            .mapToObj(i -> Map.entry(i, items.get(i)))
            .collect(Collectors.toList());
    }

    // Alternative with custom start index
    public List<Map.Entry<Integer, String>> enumerateListCustomStart(List<String> items, int start) {
        return IntStream.range(0, items.size())
            .mapToObj(i -> Map.entry(i + start, items.get(i)))
            .collect(Collectors.toList());
    }
}`
        },
        python: {
          starterCode: `def enumerate_list(items):
    # Use enumerate() to get index-value pairs
    pass`,
          solution: `def enumerate_list(items):
    return list(enumerate(items))

# With custom start index
def enumerate_list_custom_start(items, start=1):
    return list(enumerate(items, start=start))`
        }
      },
      explanation: 'enumerate() yields (index, value) tuples. Python has built-in enumerate(), Java uses IntStream.range() with mapToObj().',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`MapOperations-${q.id}`)).length
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

  const toggleSection = (difficulty) => {
    setExpandedSections(prev => ({ ...prev, [difficulty]: !prev[difficulty] }))
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
      <div style={{ padding: '2rem', maxWidth: '1800px', margin: '0 auto', backgroundColor: '#f0f9ff', minHeight: '100vh' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setSelectedQuestion(null)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            ← Back to Problems
          </button>
          <LanguageToggle />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Problem Description */}
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', border: '2px solid #e5e7eb', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: '#1f2937', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <CompletionCheckbox problemId={`MapOperations-${selectedQuestion.id}`} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '0.75rem' }}>Description</h3>
              <p style={{ fontSize: '1rem', color: '#6b7280', lineHeight: '1.6' }}>{selectedQuestion.description}</p>
            </div>

            {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '0.75rem' }}>Examples</h3>
                {selectedQuestion.examples.map((example, idx) => (
                  <div key={idx} style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #e5e7eb', color: '#1f2937' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#1f2937' }}>Input:</strong> <code style={{ color: '#1f2937' }}>{example.input}</code>
                    </div>
                    <div>
                      <strong style={{ color: '#1f2937' }}>Output:</strong> <code style={{ color: '#1f2937' }}>{example.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedQuestion.explanation && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '0.75rem' }}>Explanation</h3>
                <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: '1.6' }}>{selectedQuestion.explanation}</p>
              </div>
            )}

            {(selectedQuestion.timeComplexity || selectedQuestion.spaceComplexity) && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #dbeafe' }}>
                <h3 style={{ fontSize: '1rem', color: '#1e40af', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#1e40af' }}>Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#1e40af' }}>Space: {selectedQuestion.spaceComplexity}</div>}
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', border: '2px solid #e5e7eb', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedQuestion.code[language].solution) }} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
              <button onClick={() => setUserCode(selectedQuestion.code[language].starterCode)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Reset Code
              </button>
            </div>

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #e5e7eb', borderRadius: '8px', resize: 'none', lineHeight: '1.5' }} spellCheck={false} />

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#374151', marginBottom: '0.5rem' }}>Output</h3>
                <pre style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'auto', fontSize: '0.875rem', maxHeight: '150px' }}>{output}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#f0f9ff', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          ← Back
        </button>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem' }}>Map Operations</h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>Master functional programming: map, filter, reduce, zip, enumerate, any, and all</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem 2rem', backgroundColor: 'white', borderRadius: '12px', border: '2px solid #e5e7eb' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6' }}>{stats.completed}/{stats.total}</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Completed</div>
          </div>
          <div style={{ padding: '1rem 2rem', backgroundColor: 'white', borderRadius: '12px', border: '2px solid #e5e7eb' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{stats.percentage}%</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Progress</div>
          </div>
        </div>
      </div>

      {Object.entries(groupedQuestions).map(([difficulty, difficultyQuestions]) => (
        difficultyQuestions.length > 0 && (
          <div key={difficulty} style={{ marginBottom: '2rem' }}>
            <button onClick={() => toggleSection(difficulty)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', backgroundColor: 'white', border: '2px solid #e5e7eb', borderRadius: '12px', cursor: 'pointer', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: getDifficultyColor(difficulty) }}>{difficulty}</span>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>({difficultyQuestions.length} problems)</span>
              </div>
              <span style={{ fontSize: '1.25rem', color: '#6b7280' }}>{expandedSections[difficulty] ? '▼' : '▶'}</span>
            </button>

            {expandedSections[difficulty] && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem' }}>
                {difficultyQuestions.map((question) => (
                  <div key={question.id} onClick={() => selectQuestion(question)} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', border: '2px solid #e5e7eb', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1f2937', margin: 0, flex: 1 }}>{question.id}. {question.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ transform: 'scale(0.85)' }}>
                          <CompletionCheckbox problemId={`MapOperations-${question.id}`} />
                        </div>
                        {question.leetcodeUrl && (
                          <a
                            href={question.leetcodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ padding: '0.25rem 0.75rem', backgroundColor: '#FFA116', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '0.75rem', fontWeight: '600', display: 'inline-block' }}
                          >
                            LeetCode ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      ))}
    </div>
  )
}

export default MapOperations

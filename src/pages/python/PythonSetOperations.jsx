import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function PythonSetOperations({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
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
      title: 'Set Union',
      difficulty: 'Easy',
      description: 'Given two sets, return their union (all unique elements from both sets).',
      examples: [
        { input: 'set1 = {1, 2, 3}, set2 = {3, 4, 5}', output: '{1, 2, 3, 4, 5}' },
        { input: "set1 = {'a', 'b'}, set2 = {'c', 'd'}", output: "{'a', 'b', 'c', 'd'}" }
      ],
      code: {
        python: {
          starterCode: `def set_union(set1, set2):
    """
    Return the union of two sets.

    Args:
        set1: First set
        set2: Second set

    Returns:
        Set containing all unique elements from both sets

    Examples:
        >>> set_union({1, 2, 3}, {3, 4, 5})
        {1, 2, 3, 4, 5}
        >>> set_union({'a', 'b'}, {'c', 'd'})
        {'a', 'b', 'c', 'd'}
    """
    pass`,
          solution: `def set_union(set1, set2):
    """
    Return the union of two sets.

    Multiple approaches:
    1. Using | operator
    2. Using union() method
    3. Using set comprehension
    """
    # Approach 1: Using | operator
    return set1 | set2

    # Approach 2: Using union() method
    # return set1.union(set2)

    # Approach 3: Creating new set with both
    # return set(list(set1) + list(set2))`
        }
      },
      explanation: 'Use the | operator or union() method. Time: O(len(set1) + len(set2)), Space: O(len(set1) + len(set2))',
      timeComplexity: 'O(len(set1) + len(set2))',
      spaceComplexity: 'O(len(set1) + len(set2))'
    },
    {
      id: 2,
      title: 'Set Intersection',
      difficulty: 'Easy',
      description: 'Given two sets, return their intersection (elements common to both sets).',
      examples: [
        { input: 'set1 = {1, 2, 3}, set2 = {2, 3, 4}', output: '{2, 3}' },
        { input: "set1 = {'a', 'b', 'c'}, set2 = {'b', 'c', 'd'}", output: "{'b', 'c'}" }
      ],
      code: {
        python: {
          starterCode: `def set_intersection(set1, set2):
    """
    Return the intersection of two sets.

    Args:
        set1: First set
        set2: Second set

    Returns:
        Set containing elements common to both sets

    Examples:
        >>> set_intersection({1, 2, 3}, {2, 3, 4})
        {2, 3}
        >>> set_intersection({'a', 'b', 'c'}, {'b', 'c', 'd'})
        {'b', 'c'}
    """
    pass`,
          solution: `def set_intersection(set1, set2):
    """
    Return the intersection of two sets.

    Multiple approaches:
    1. Using & operator
    2. Using intersection() method
    3. Using set comprehension
    """
    # Approach 1: Using & operator
    return set1 & set2

    # Approach 2: Using intersection() method
    # return set1.intersection(set2)

    # Approach 3: Using set comprehension
    # return {x for x in set1 if x in set2}`
        }
      },
      explanation: 'Use the & operator or intersection() method. Time: O(min(len(set1), len(set2))), Space: O(min(len(set1), len(set2)))',
      timeComplexity: 'O(min(len(set1), len(set2)))',
      spaceComplexity: 'O(min(len(set1), len(set2)))'
    },
    {
      id: 3,
      title: 'Set Difference',
      difficulty: 'Easy',
      description: 'Given two sets, return the difference (elements in first set but not in second).',
      examples: [
        { input: 'set1 = {1, 2, 3}, set2 = {2, 3, 4}', output: '{1}' },
        { input: "set1 = {'a', 'b', 'c'}, set2 = {'b', 'c', 'd'}", output: "{'a'}" }
      ],
      code: {
        python: {
          starterCode: `def set_difference(set1, set2):
    """
    Return the difference of two sets (set1 - set2).

    Args:
        set1: First set
        set2: Second set

    Returns:
        Set containing elements in set1 but not in set2

    Examples:
        >>> set_difference({1, 2, 3}, {2, 3, 4})
        {1}
        >>> set_difference({'a', 'b', 'c'}, {'b', 'c', 'd'})
        {'a'}
    """
    pass`,
          solution: `def set_difference(set1, set2):
    """
    Return the difference of two sets.

    Multiple approaches:
    1. Using - operator
    2. Using difference() method
    3. Using set comprehension
    """
    # Approach 1: Using - operator
    return set1 - set2

    # Approach 2: Using difference() method
    # return set1.difference(set2)

    # Approach 3: Using set comprehension
    # return {x for x in set1 if x not in set2}`
        }
      },
      explanation: 'Use the - operator or difference() method. Time: O(len(set1)), Space: O(len(set1))',
      timeComplexity: 'O(len(set1))',
      spaceComplexity: 'O(len(set1))'
    },
    {
      id: 4,
      title: 'Symmetric Difference',
      difficulty: 'Easy',
      description: 'Given two sets, return the symmetric difference (elements in either set but not in both).',
      examples: [
        { input: 'set1 = {1, 2, 3}, set2 = {2, 3, 4}', output: '{1, 4}' },
        { input: "set1 = {'a', 'b'}, set2 = {'b', 'c'}", output: "{'a', 'c'}" }
      ],
      code: {
        python: {
          starterCode: `def symmetric_difference(set1, set2):
    """
    Return the symmetric difference of two sets.

    Args:
        set1: First set
        set2: Second set

    Returns:
        Set containing elements in either set but not in both

    Examples:
        >>> symmetric_difference({1, 2, 3}, {2, 3, 4})
        {1, 4}
        >>> symmetric_difference({'a', 'b'}, {'b', 'c'})
        {'a', 'c'}
    """
    pass`,
          solution: `def symmetric_difference(set1, set2):
    """
    Return the symmetric difference of two sets.

    Multiple approaches:
    1. Using ^ operator
    2. Using symmetric_difference() method
    3. Using union and intersection
    """
    # Approach 1: Using ^ operator
    return set1 ^ set2

    # Approach 2: Using symmetric_difference() method
    # return set1.symmetric_difference(set2)

    # Approach 3: Using union and intersection
    # return (set1 | set2) - (set1 & set2)

    # Approach 4: Using difference
    # return (set1 - set2) | (set2 - set1)`
        }
      },
      explanation: 'Use the ^ operator or symmetric_difference() method. Time: O(len(set1) + len(set2)), Space: O(len(set1) + len(set2))',
      timeComplexity: 'O(len(set1) + len(set2))',
      spaceComplexity: 'O(len(set1) + len(set2))'
    },
    {
      id: 5,
      title: 'Is Subset',
      difficulty: 'Easy',
      description: 'Check if one set is a subset of another (all elements of first set are in second set).',
      examples: [
        { input: 'set1 = {1, 2}, set2 = {1, 2, 3, 4}', output: 'True' },
        { input: 'set1 = {1, 5}, set2 = {1, 2, 3, 4}', output: 'False' }
      ],
      code: {
        python: {
          starterCode: `def is_subset(set1, set2):
    """
    Check if set1 is a subset of set2.

    Args:
        set1: First set (potential subset)
        set2: Second set (potential superset)

    Returns:
        True if all elements of set1 are in set2, False otherwise

    Examples:
        >>> is_subset({1, 2}, {1, 2, 3, 4})
        True
        >>> is_subset({1, 5}, {1, 2, 3, 4})
        False
    """
    pass`,
          solution: `def is_subset(set1, set2):
    """
    Check if set1 is a subset of set2.

    Multiple approaches:
    1. Using <= operator
    2. Using issubset() method
    3. Using all() and comprehension
    """
    # Approach 1: Using <= operator
    return set1 <= set2

    # Approach 2: Using issubset() method
    # return set1.issubset(set2)

    # Approach 3: Using all()
    # return all(elem in set2 for elem in set1)`
        }
      },
      explanation: 'Use the <= operator or issubset() method. Empty set is a subset of any set. Time: O(len(set1)), Space: O(1)',
      timeComplexity: 'O(len(set1))',
      spaceComplexity: 'O(1)'
    },
    {
      id: 6,
      title: 'Is Superset',
      difficulty: 'Easy',
      description: 'Check if one set is a superset of another (all elements of second set are in first set).',
      examples: [
        { input: 'set1 = {1, 2, 3, 4}, set2 = {1, 2}', output: 'True' },
        { input: 'set1 = {1, 2, 3}, set2 = {1, 5}', output: 'False' }
      ],
      code: {
        python: {
          starterCode: `def is_superset(set1, set2):
    """
    Check if set1 is a superset of set2.

    Args:
        set1: First set (potential superset)
        set2: Second set (potential subset)

    Returns:
        True if all elements of set2 are in set1, False otherwise

    Examples:
        >>> is_superset({1, 2, 3, 4}, {1, 2})
        True
        >>> is_superset({1, 2, 3}, {1, 5})
        False
    """
    pass`,
          solution: `def is_superset(set1, set2):
    """
    Check if set1 is a superset of set2.

    Multiple approaches:
    1. Using >= operator
    2. Using issuperset() method
    3. Using subset check reversed
    """
    # Approach 1: Using >= operator
    return set1 >= set2

    # Approach 2: Using issuperset() method
    # return set1.issuperset(set2)

    # Approach 3: Using issubset reversed
    # return set2.issubset(set1)`
        }
      },
      explanation: 'Use the >= operator or issuperset() method. Any set is a superset of empty set. Time: O(len(set2)), Space: O(1)',
      timeComplexity: 'O(len(set2))',
      spaceComplexity: 'O(1)'
    },
    {
      id: 7,
      title: 'Is Disjoint',
      difficulty: 'Easy',
      description: 'Check if two sets are disjoint (have no elements in common).',
      examples: [
        { input: 'set1 = {1, 2, 3}, set2 = {4, 5, 6}', output: 'True' },
        { input: 'set1 = {1, 2, 3}, set2 = {3, 4, 5}', output: 'False' }
      ],
      code: {
        python: {
          starterCode: `def is_disjoint(set1, set2):
    """
    Check if two sets are disjoint (no common elements).

    Args:
        set1: First set
        set2: Second set

    Returns:
        True if sets have no common elements, False otherwise

    Examples:
        >>> is_disjoint({1, 2, 3}, {4, 5, 6})
        True
        >>> is_disjoint({1, 2, 3}, {3, 4, 5})
        False
    """
    pass`,
          solution: `def is_disjoint(set1, set2):
    """
    Check if two sets are disjoint.

    Multiple approaches:
    1. Using isdisjoint() method
    2. Checking if intersection is empty
    3. Using any() with comprehension
    """
    # Approach 1: Using isdisjoint() method
    return set1.isdisjoint(set2)

    # Approach 2: Checking intersection
    # return len(set1 & set2) == 0

    # Approach 3: Using any()
    # return not any(elem in set2 for elem in set1)`
        }
      },
      explanation: 'Use the isdisjoint() method. Empty set is disjoint with any set. Time: O(min(len(set1), len(set2))), Space: O(1)',
      timeComplexity: 'O(min(len(set1), len(set2)))',
      spaceComplexity: 'O(1)'
    },
    {
      id: 8,
      title: 'Remove Duplicates from List',
      difficulty: 'Easy',
      description: 'Given a list with duplicates, use set to remove duplicates while preserving one occurrence of each element.',
      examples: [
        { input: 'lst = [1, 2, 2, 3, 3, 3, 4]', output: '[1, 2, 3, 4]' },
        { input: "lst = ['a', 'b', 'a', 'c']", output: "['a', 'b', 'c']" }
      ],
      code: {
        python: {
          starterCode: `def remove_duplicates(lst):
    """
    Remove duplicates from list using set.

    Args:
        lst: List with potential duplicates

    Returns:
        List with duplicates removed (order may not be preserved)

    Examples:
        >>> remove_duplicates([1, 2, 2, 3, 3, 3, 4])
        [1, 2, 3, 4]
        >>> remove_duplicates(['a', 'b', 'a', 'c'])
        ['a', 'b', 'c']
    """
    pass`,
          solution: `def remove_duplicates(lst):
    """
    Remove duplicates from list using set.

    Multiple approaches:
    1. Using set (doesn't preserve order)
    2. Using set with dict.fromkeys (preserves order in Python 3.7+)
    3. Using seen set (preserves order)
    """
    # Approach 1: Simple set conversion (doesn't preserve order)
    return list(set(lst))

    # Approach 2: Preserving order (Python 3.7+)
    # return list(dict.fromkeys(lst))

    # Approach 3: Manual with seen set (preserves order)
    # seen = set()
    # result = []
    # for item in lst:
    #     if item not in seen:
    #         seen.add(item)
    #         result.append(item)
    # return result`
        }
      },
      explanation: 'Convert list to set, then back to list. Time: O(n), Space: O(n). Note: order may not be preserved with simple set conversion.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`PythonSetOperations-${q.id}`)).length
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
      <div style={{ padding: '2rem', maxWidth: '1800px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)', minHeight: '100vh' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setSelectedQuestion(null)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}>
            ← Back to Problems
          </button>
          <LanguageToggle />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Problem Description */}
          <div style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2rem', borderRadius: '12px', border: '2px solid #3b82f6', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: '#93c5fd', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <CompletionCheckbox problemId={`PythonSetOperations-${selectedQuestion.id}`} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#93c5fd', marginBottom: '0.75rem' }}>Description</h3>
              <p style={{ fontSize: '1rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.description}</p>
            </div>

            {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#93c5fd', marginBottom: '0.75rem' }}>Examples</h3>
                {selectedQuestion.examples.map((example, idx) => (
                  <div key={idx} style={{ backgroundColor: '#1f2937', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #3b82f6', color: '#d1d5db' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#93c5fd' }}>Input:</strong> <code style={{ color: '#d1d5db' }}>{example.input}</code>
                    </div>
                    <div>
                      <strong style={{ color: '#93c5fd' }}>Output:</strong> <code style={{ color: '#d1d5db' }}>{example.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedQuestion.explanation && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#93c5fd', marginBottom: '0.75rem' }}>Explanation</h3>
                <p style={{ fontSize: '0.95rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.explanation}</p>
              </div>
            )}

            {(selectedQuestion.timeComplexity || selectedQuestion.spaceComplexity) && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#1f2937', borderRadius: '8px', border: '1px solid #3b82f6' }}>
                <h3 style={{ fontSize: '1rem', color: '#93c5fd', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Space: {selectedQuestion.spaceComplexity}</div>}
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2rem', borderRadius: '12px', border: '2px solid #3b82f6', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedQuestion.code[language].solution) }} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}>
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
              <button onClick={() => setUserCode(selectedQuestion.code[language].starterCode)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d97706'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}>
                Reset Code
              </button>
            </div>

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #3b82f6', borderRadius: '8px', resize: 'none', lineHeight: '1.5', backgroundColor: '#1f2937', color: '#d1d5db' }} spellCheck={false} />

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#93c5fd', marginBottom: '0.5rem' }}>Output</h3>
                <pre style={{ backgroundColor: '#1f2937', padding: '1rem', borderRadius: '8px', border: '1px solid #3b82f6', overflow: 'auto', fontSize: '0.875rem', maxHeight: '150px', color: '#d1d5db' }}>{output}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1d4ed8'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#2563eb'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
          ← Back to Python Topics
        </button>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(to right, #60a5fa, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>Python Set Operations</h1>
        <p style={{ fontSize: '1.2rem', color: '#d1d5db' }}>Master Python set operations including union, intersection, difference, and subset operations</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem 2rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '12px', border: '2px solid #3b82f6' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#60a5fa' }}>{stats.completed}/{stats.total}</div>
            <div style={{ fontSize: '0.875rem', color: '#d1d5db', marginTop: '0.25rem' }}>Completed</div>
          </div>
          <div style={{ padding: '1rem 2rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '12px', border: '2px solid #3b82f6' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{stats.percentage}%</div>
            <div style={{ fontSize: '0.875rem', color: '#d1d5db', marginTop: '0.25rem' }}>Progress</div>
          </div>
        </div>
      </div>

      {Object.entries(groupedQuestions).map(([difficulty, difficultyQuestions]) => (
        difficultyQuestions.length > 0 && (
          <div key={difficulty} style={{ marginBottom: '2rem' }}>
            <button onClick={() => toggleSection(difficulty)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', border: '2px solid #3b82f6', borderRadius: '12px', cursor: 'pointer', marginBottom: '1rem', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#60a5fa'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#3b82f6'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: getDifficultyColor(difficulty) }}>{difficulty}</span>
                <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>({difficultyQuestions.length} problems)</span>
              </div>
              <span style={{ fontSize: '1.25rem', color: '#d1d5db' }}>{expandedSections[difficulty] ? '▼' : '▶'}</span>
            </button>

            {expandedSections[difficulty] && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem' }}>
                {difficultyQuestions.map((question) => (
                  <div key={question.id} onClick={() => selectQuestion(question)} style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '1.5rem', borderRadius: '12px', border: '2px solid #3b82f6', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.5)'; e.currentTarget.style.borderColor = '#60a5fa' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#3b82f6' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#93c5fd', margin: 0, flex: 1 }}>{question.id}. {question.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#d1d5db', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ transform: 'scale(0.85)' }}>
                          <CompletionCheckbox problemId={`PythonSetOperations-${question.id}`} />
                        </div>
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

export default PythonSetOperations

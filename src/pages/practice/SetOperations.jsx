import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function SetOperations({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
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
      title: 'Set Union',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/intersection-of-two-arrays-ii/',
      description: 'Given two sets, return a new set containing all unique elements from both sets (union operation).',
      examples: [
        { input: 'set1 = {1, 2, 3, 4}, set2 = {3, 4, 5, 6}', output: '{1, 2, 3, 4, 5, 6}' },
        { input: "set1 = {'a', 'b', 'c'}, set2 = {'c', 'd', 'e'}", output: "{'a', 'b', 'c', 'd', 'e'}" }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;

class Solution {
    public Set<Integer> setUnion(Set<Integer> set1, Set<Integer> set2) {
        // Return the union of two sets

    }
}`,
          solution: `import java.util.*;

class Solution {
    public Set<Integer> setUnion(Set<Integer> set1, Set<Integer> set2) {
        // Approach 1: Using addAll (most direct)
        Set<Integer> result = new HashSet<>(set1);
        result.addAll(set2);
        return result;
    }

    // Alternative: Using Stream API
    public Set<Integer> setUnionStream(Set<Integer> set1, Set<Integer> set2) {
        Set<Integer> result = new HashSet<>(set1);
        set2.stream().forEach(result::add);
        return result;
    }
}`
        },
        python: {
          starterCode: `def set_union(set1, set2):
    """
    Return the union of two sets (all unique elements from both sets)

    Args:
        set1: First set
        set2: Second set

    Returns:
        Set containing all unique elements from both sets
    """
    pass`,
          solution: `def set_union(set1, set2):
    """
    Return the union of two sets (all unique elements from both sets)

    Approach 1: Using the | operator (most Pythonic)
    Time: O(len(set1) + len(set2))
    Space: O(len(set1) + len(set2))
    """
    return set1 | set2

# Alternative approaches:

def set_union_method(set1, set2):
    """
    Approach 2: Using the union() method
    """
    return set1.union(set2)

def set_union_update(set1, set2):
    """
    Approach 3: Using update() (modifies set1 in place)
    """
    result = set1.copy()
    result.update(set2)
    return result

# Examples
print(set_union({1, 2, 3}, {3, 4, 5}))  # {1, 2, 3, 4, 5}
print(set_union({'a', 'b'}, {'b', 'c'}))  # {'a', 'b', 'c'}`
        }
      },
      explanation: 'Union combines all unique elements from both sets. In Python use | operator or union() method. In Java use addAll() or Stream API.',
      timeComplexity: 'O(m + n)',
      spaceComplexity: 'O(m + n)'
    },
    {
      id: 2,
      title: 'Set Intersection',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/intersection-of-two-arrays/',
      description: 'Given two sets, return a new set containing only elements that exist in both sets (intersection operation).',
      examples: [
        { input: 'set1 = {1, 2, 3, 4}, set2 = {3, 4, 5, 6}', output: '{3, 4}' },
        { input: "set1 = {'a', 'b', 'c'}, set2 = {'c', 'd', 'e'}", output: "{'c'}" }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;

class Solution {
    public Set<Integer> setIntersection(Set<Integer> set1, Set<Integer> set2) {
        // Return the intersection of two sets

    }
}`,
          solution: `import java.util.*;

class Solution {
    public Set<Integer> setIntersection(Set<Integer> set1, Set<Integer> set2) {
        // Approach 1: Using retainAll
        Set<Integer> result = new HashSet<>(set1);
        result.retainAll(set2);
        return result;
    }

    // Alternative: Using Stream filter
    public Set<Integer> setIntersectionStream(Set<Integer> set1, Set<Integer> set2) {
        return set1.stream()
            .filter(set2::contains)
            .collect(Collectors.toSet());
    }
}`
        },
        python: {
          starterCode: `def set_intersection(set1, set2):
    """
    Return the intersection of two sets (elements common to both sets)

    Args:
        set1: First set
        set2: Second set

    Returns:
        Set containing elements present in both sets
    """
    pass`,
          solution: `def set_intersection(set1, set2):
    """
    Return the intersection of two sets (elements common to both sets)

    Approach 1: Using the & operator (most Pythonic)
    Time: O(min(len(set1), len(set2)))
    Space: O(min(len(set1), len(set2)))
    """
    return set1 & set2

# Alternative approaches:

def set_intersection_method(set1, set2):
    """
    Approach 2: Using the intersection() method
    """
    return set1.intersection(set2)

def set_intersection_comprehension(set1, set2):
    """
    Approach 3: Using set comprehension with filtering
    """
    return {x for x in set1 if x in set2}

# Examples
print(set_intersection({1, 2, 3, 4}, {3, 4, 5, 6}))  # {3, 4}
print(set_intersection({'a', 'b', 'c'}, {'c', 'd', 'e'}))  # {'c'}
print(set_intersection({1, 2, 3}, {4, 5, 6}))  # set()`
        }
      },
      explanation: 'Intersection returns elements common to both sets. Python uses & operator or intersection(). Java uses retainAll() or Stream filter.',
      timeComplexity: 'O(min(m, n))',
      spaceComplexity: 'O(min(m, n))'
    },
    {
      id: 3,
      title: 'Set Difference',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/find-the-difference/',
      description: 'Given two sets, return a new set containing elements that are in the first set but not in the second set (difference operation).',
      examples: [
        { input: 'set1 = {1, 2, 3, 4}, set2 = {3, 4, 5, 6}', output: '{1, 2}' },
        { input: "set1 = {'a', 'b', 'c', 'd'}, set2 = {'c', 'd', 'e'}", output: "{'a', 'b'}" }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;

class Solution {
    public Set<Integer> setDifference(Set<Integer> set1, Set<Integer> set2) {
        // Return elements in set1 but not in set2

    }
}`,
          solution: `import java.util.*;

class Solution {
    public Set<Integer> setDifference(Set<Integer> set1, Set<Integer> set2) {
        // Approach 1: Using removeAll
        Set<Integer> result = new HashSet<>(set1);
        result.removeAll(set2);
        return result;
    }

    // Alternative: Using Stream filter
    public Set<Integer> setDifferenceStream(Set<Integer> set1, Set<Integer> set2) {
        return set1.stream()
            .filter(x -> !set2.contains(x))
            .collect(Collectors.toSet());
    }
}`
        },
        python: {
          starterCode: `def set_difference(set1, set2):
    """
    Return the difference of two sets (elements in set1 but not in set2)

    Args:
        set1: First set
        set2: Second set

    Returns:
        Set containing elements in set1 but not in set2
    """
    pass`,
          solution: `def set_difference(set1, set2):
    """
    Return the difference of two sets (elements in set1 but not in set2)

    Approach 1: Using the - operator (most Pythonic)
    Time: O(len(set1))
    Space: O(len(set1))
    """
    return set1 - set2

# Alternative approaches:

def set_difference_method(set1, set2):
    """
    Approach 2: Using the difference() method
    """
    return set1.difference(set2)

def set_difference_comprehension(set1, set2):
    """
    Approach 3: Using set comprehension with filtering
    """
    return {x for x in set1 if x not in set2}

# Examples
print(set_difference({1, 2, 3, 4}, {3, 4, 5, 6}))  # {1, 2}
print(set_difference({'a', 'b', 'c', 'd'}, {'c', 'd', 'e'}))  # {'a', 'b'}
print(set_difference({1, 2, 3}, {1, 2, 3}))  # set()

# Note: Order matters!
print(set_difference({3, 4, 5, 6}, {1, 2, 3, 4}))  # {5, 6}`
        }
      },
      explanation: 'Difference returns elements in first set but not in second. Order matters! Python uses - operator. Java uses removeAll().',
      timeComplexity: 'O(m)',
      spaceComplexity: 'O(m)'
    },
    {
      id: 4,
      title: 'Set Symmetric Difference',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/',
      description: 'Given two sets, return a new set containing elements that are in either set but not in both (symmetric difference operation - XOR for sets).',
      examples: [
        { input: 'set1 = {1, 2, 3, 4}, set2 = {3, 4, 5, 6}', output: '{1, 2, 5, 6}' },
        { input: "set1 = {'a', 'b', 'c'}, set2 = {'c', 'd', 'e'}", output: "{'a', 'b', 'd', 'e'}" }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;

class Solution {
    public Set<Integer> symmetricDifference(Set<Integer> set1, Set<Integer> set2) {
        // Return elements in either set but not in both

    }
}`,
          solution: `import java.util.*;

class Solution {
    public Set<Integer> symmetricDifference(Set<Integer> set1, Set<Integer> set2) {
        // Approach 1: Using two difference operations
        Set<Integer> diff1 = new HashSet<>(set1);
        diff1.removeAll(set2);

        Set<Integer> diff2 = new HashSet<>(set2);
        diff2.removeAll(set1);

        Set<Integer> result = new HashSet<>(diff1);
        result.addAll(diff2);
        return result;
    }

    // Alternative: Using Stream
    public Set<Integer> symmetricDifferenceStream(Set<Integer> set1, Set<Integer> set2) {
        Set<Integer> union = new HashSet<>(set1);
        union.addAll(set2);

        Set<Integer> intersection = set1.stream()
            .filter(set2::contains)
            .collect(Collectors.toSet());

        union.removeAll(intersection);
        return union;
    }
}`
        },
        python: {
          starterCode: `def set_symmetric_difference(set1, set2):
    """
    Return the symmetric difference of two sets
    (elements in either set but not in both)

    Args:
        set1: First set
        set2: Second set

    Returns:
        Set containing elements in either set but not in both
    """
    pass`,
          solution: `def set_symmetric_difference(set1, set2):
    """
    Return the symmetric difference of two sets
    (elements in either set but not in both)

    Approach 1: Using the ^ operator (most Pythonic)
    Time: O(len(set1) + len(set2))
    Space: O(len(set1) + len(set2))
    """
    return set1 ^ set2

# Alternative approaches:

def set_symmetric_difference_method(set1, set2):
    """
    Approach 2: Using the symmetric_difference() method
    """
    return set1.symmetric_difference(set2)

def set_symmetric_difference_union_intersection(set1, set2):
    """
    Approach 3: Using union and intersection
    Symmetric difference = (A ∪ B) - (A ∩ B)
    """
    return (set1 | set2) - (set1 & set2)

def set_symmetric_difference_two_differences(set1, set2):
    """
    Approach 4: Using two difference operations
    Symmetric difference = (A - B) ∪ (B - A)
    """
    return (set1 - set2) | (set2 - set1)

# Examples
print(set_symmetric_difference({1, 2, 3, 4}, {3, 4, 5, 6}))  # {1, 2, 5, 6}
print(set_symmetric_difference({'a', 'b', 'c'}, {'c', 'd', 'e'}))  # {'a', 'b', 'd', 'e'}
print(set_symmetric_difference({1, 2, 3}, {1, 2, 3}))  # set()

# Real-world use case: Find differences between two datasets
old_users = {'alice', 'bob', 'charlie', 'david'}
new_users = {'bob', 'charlie', 'eve', 'frank'}
changed_users = set_symmetric_difference(old_users, new_users)
print(f"Users that changed: {changed_users}")  # {'alice', 'david', 'eve', 'frank'}`
        }
      },
      explanation: 'Symmetric difference returns elements in either set but not both. Equivalent to (A-B) ∪ (B-A) or (A∪B) - (A∩B). Python uses ^ operator.',
      timeComplexity: 'O(m + n)',
      spaceComplexity: 'O(m + n)'
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`SetOperations-${q.id}`)).length
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
              <CompletionCheckbox problemId={`SetOperations-${selectedQuestion.id}`} />
            </div>

            {selectedQuestion.leetcodeUrl && (
              <a href={selectedQuestion.leetcodeUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '0.5rem 1rem', backgroundColor: '#FFA116', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600' }}>
                View on LeetCode ↗
              </a>
            )}

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
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem' }}>Set Operations</h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>Master set operations: union, intersection, difference, and symmetric difference</p>

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
                          <CompletionCheckbox problemId={`SetOperations-${question.id}`} />
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

export default SetOperations

import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function Streams({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory }) {
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
      title: 'Transform with map()',
      difficulty: 'Easy',
      leetcodeUrl: '',
      description: 'Use map() to transform each element in a stream. Transform each number to a formatted string.',
      examples: [
        { input: '[1, 2, 3, 4, 5]', output: '["Number: 1", "Number: 2", "Number: 3", "Number: 4", "Number: 5"]' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.stream.*;

public class StreamMap {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // TODO: Transform each number to "Number: X" using map
        List<String> mapped = numbers.stream()
            // Your code here
            .collect(Collectors.toList());

        System.out.println("Mapped: " + mapped);
    }
}`,
          solution: `import java.util.*;
import java.util.stream.*;

public class StreamMap {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Transform each number to "Number: X" using map
        List<String> mapped = numbers.stream()
            .map(n -> "Number: " + n)
            .collect(Collectors.toList());

        System.out.println("Mapped: " + mapped);
    }
}`
        },
        python: {
          starterCode: `# Python equivalent
numbers = [1, 2, 3, 4, 5]

# TODO: Transform each number to "Number: X"
mapped = []  # Your code here

print("Mapped:", mapped)`,
          solution: `# Python equivalent
numbers = [1, 2, 3, 4, 5]

# Transform using map or list comprehension
mapped = list(map(lambda n: f"Number: {n}", numbers))
# Or: mapped = [f"Number: {n}" for n in numbers]

print("Mapped:", mapped)`
        }
      },
      explanation: 'Use map() to transform each element. map() applies a function to every element and returns a new stream.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    },
    {
      id: 2,
      title: 'Filter with filter()',
      difficulty: 'Easy',
      leetcodeUrl: '',
      description: 'Use filter() to select only elements that match a condition. Filter only the even numbers from a list.',
      examples: [
        { input: '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]', output: '[2, 4, 6, 8, 10]' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.stream.*;

public class StreamFilter {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // TODO: Filter only even numbers
        List<Integer> evens = numbers.stream()
            // Your code here
            .collect(Collectors.toList());

        System.out.println("Evens: " + evens);
    }
}`,
          solution: `import java.util.*;
import java.util.stream.*;

public class StreamFilter {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Filter only even numbers
        List<Integer> evens = numbers.stream()
            .filter(n -> n % 2 == 0)
            .collect(Collectors.toList());

        System.out.println("Evens: " + evens);
    }
}`
        },
        python: {
          starterCode: `# Python equivalent
numbers = list(range(1, 11))

# TODO: Filter only even numbers
evens = []  # Your code here

print("Evens:", evens)`,
          solution: `# Python equivalent
numbers = list(range(1, 11))

# Filter using filter() or list comprehension
evens = list(filter(lambda n: n % 2 == 0, numbers))
# Or: evens = [n for n in numbers if n % 2 == 0]

print("Evens:", evens)`
        }
      },
      explanation: 'Use filter() to select elements matching a predicate. filter() returns a stream of elements that satisfy the condition.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    },
    {
      id: 3,
      title: 'Aggregate with reduce()',
      difficulty: 'Medium',
      leetcodeUrl: '',
      description: 'Use reduce() to combine all elements into a single result. Calculate the sum of all numbers.',
      examples: [
        { input: '[1, 2, 3, 4, 5]', output: '15' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.stream.*;

public class StreamReduce {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // TODO: Sum all numbers using reduce
        int sum = 0; // Your code here

        System.out.println("Sum: " + sum);
    }
}`,
          solution: `import java.util.*;
import java.util.stream.*;

public class StreamReduce {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Sum all numbers using reduce
        int sum = numbers.stream()
            .reduce(0, (a, b) -> a + b);

        System.out.println("Sum: " + sum);
    }
}`
        },
        python: {
          starterCode: `# Python equivalent
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# TODO: Sum all numbers using reduce
sum_result = 0  # Your code here

print("Sum:", sum_result)`,
          solution: `# Python equivalent
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# Sum using reduce
sum_result = reduce(lambda a, b: a + b, numbers, 0)
# Or: sum_result = sum(numbers)

print("Sum:", sum_result)`
        }
      },
      explanation: 'Use reduce() to aggregate stream elements into a single value. reduce() combines elements using a binary operator.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 4,
      title: 'Complex Pipeline: filter + map + reduce',
      difficulty: 'Medium',
      leetcodeUrl: '',
      description: 'Combine multiple stream operations. Filter even numbers, square them, then sum the results.',
      examples: [
        { input: '[1, 2, 3, 4, 5, 6]', output: '56 (2² + 4² + 6² = 4 + 16 + 36)' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.stream.*;

public class StreamPipeline {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);

        // TODO: Filter evens, square them, then sum
        int sumOfSquares = 0; // Your code here (use filter, map, reduce)

        System.out.println("Sum of squares of evens: " + sumOfSquares);
    }
}`,
          solution: `import java.util.*;
import java.util.stream.*;

public class StreamPipeline {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);

        // Filter evens, square them, then sum
        int sumOfSquares = numbers.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * n)
            .reduce(0, Integer::sum);

        System.out.println("Sum of squares of evens: " + sumOfSquares);
    }
}`
        },
        python: {
          starterCode: `# Python equivalent
from functools import reduce

numbers = [1, 2, 3, 4, 5, 6]

# TODO: Filter evens, square them, then sum
sum_of_squares = 0  # Your code here

print("Sum of squares of evens:", sum_of_squares)`,
          solution: `# Python equivalent
from functools import reduce

numbers = [1, 2, 3, 4, 5, 6]

# Filter evens, square them, then sum
evens = filter(lambda n: n % 2 == 0, numbers)
squared = map(lambda n: n * n, evens)
sum_of_squares = reduce(lambda a, b: a + b, squared, 0)
# Or: sum_of_squares = sum(n*n for n in numbers if n % 2 == 0)

print("Sum of squares of evens:", sum_of_squares)`
        }
      },
      explanation: 'Chain stream operations to create processing pipelines. Each operation transforms the stream sequentially.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    }
  ]

  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Streams-${q.id}`)).length
    return { completed, total: questions.length, percentage: Math.round((completed / questions.length) * 100) }
  }

  const stats = getCompletionStats()

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
          <button onClick={() => setSelectedQuestion(null)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            ← Back to Problems
          </button>
          <LanguageToggle />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', border: '2px solid #e5e7eb', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: '#1f2937', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <CompletionCheckbox problemId={`Streams-${selectedQuestion.id}`} />
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
                <h3 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '0.75rem' }}>💡 Explanation</h3>
                <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: '1.6' }}>{selectedQuestion.explanation}</p>
              </div>
            )}

            {(selectedQuestion.timeComplexity || selectedQuestion.spaceComplexity) && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #dbeafe' }}>
                <h3 style={{ fontSize: '1rem', color: '#1e40af', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#1e40af' }}>⏱️ Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#1e40af' }}>💾 Space: {selectedQuestion.spaceComplexity}</div>}
              </div>
            )}
          </div>

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
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          ← Back
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem' }}>☕ Java Streams API</h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>Master the Streams API for functional-style data processing in Java</p>

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
                          <CompletionCheckbox problemId={`Streams-${question.id}`} />
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

export default Streams

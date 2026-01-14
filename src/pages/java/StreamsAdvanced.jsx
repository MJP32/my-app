import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function StreamsAdvanced({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
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
      title: 'Multi-Level Grouping',
      difficulty: 'Hard',
      leetcodeUrl: '',
      description: 'Group employees by department, then by salary range (low: <50k, mid: 50k-100k, high: >100k). Use nested Collectors.',
      examples: [
        { input: 'List of employees with department and salary', output: 'Map<String, Map<String, List<Employee>>>' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.stream.*;

public class MultiLevelGrouping {
    static class Employee {
        String name, department;
        double salary;
        Employee(String n, String d, double s) {
            name = n; department = d; salary = s;
        }
        String getDepartment() { return department; }
        String getSalaryRange() {
            if (salary < 50000) return "low";
            if (salary < 100000) return "mid";
            return "high";
        }
    }

    public static void main(String[] args) {
        List<Employee> employees = Arrays.asList(
            new Employee("Alice", "IT", 75000),
            new Employee("Bob", "IT", 120000),
            new Employee("Charlie", "HR", 45000)
        );

        // TODO: Group by department, then by salary range
        Map<String, Map<String, List<Employee>>> grouped = null;

        System.out.println(grouped);
    }
}`,
          solution: `import java.util.*;
import java.util.stream.*;

public class MultiLevelGrouping {
    static class Employee {
        String name, department;
        double salary;
        Employee(String n, String d, double s) {
            name = n; department = d; salary = s;
        }
        String getDepartment() { return department; }
        String getSalaryRange() {
            if (salary < 50000) return "low";
            if (salary < 100000) return "mid";
            return "high";
        }
    }

    public static void main(String[] args) {
        List<Employee> employees = Arrays.asList(
            new Employee("Alice", "IT", 75000),
            new Employee("Bob", "IT", 120000),
            new Employee("Charlie", "HR", 45000)
        );

        // Group by department, then by salary range
        Map<String, Map<String, List<Employee>>> grouped = employees.stream()
            .collect(Collectors.groupingBy(
                Employee::getDepartment,
                Collectors.groupingBy(Employee::getSalaryRange)
            ));

        System.out.println(grouped);
    }
}`
        },
        python: {
          starterCode: `# Python equivalent
from collections import defaultdict

class Employee:
    def __init__(self, name, department, salary):
        self.name = name
        self.department = department
        self.salary = salary

employees = [
    Employee("Alice", "IT", 75000),
    Employee("Bob", "IT", 120000),
    Employee("Charlie", "HR", 45000)
]

# TODO: Group by department, then by salary range
grouped = {}  # Your code here

print(grouped)`,
          solution: `# Python equivalent
from collections import defaultdict

class Employee:
    def __init__(self, name, department, salary):
        self.name = name
        self.department = department
        self.salary = salary

    def get_salary_range(self):
        if self.salary < 50000:
            return "low"
        elif self.salary < 100000:
            return "mid"
        return "high"

employees = [
    Employee("Alice", "IT", 75000),
    Employee("Bob", "IT", 120000),
    Employee("Charlie", "HR", 45000)
]

# Group by department, then by salary range
grouped = defaultdict(lambda: defaultdict(list))
for emp in employees:
    grouped[emp.department][emp.get_salary_range()].append(emp)

print(dict(grouped))`
        }
      },
      explanation: 'Use nested groupingBy collectors to create hierarchical groupings.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    },
    {
      id: 2,
      title: 'Parallel Streams',
      difficulty: 'Medium',
      leetcodeUrl: '',
      description: 'Use parallel streams for performance on large datasets. Calculate sum of squares in parallel.',
      examples: [
        { input: 'List of 1-1000000', output: 'Sum calculated using parallel processing' }
      ],
      code: {
        java: {
          starterCode: `import java.util.stream.*;

public class ParallelStream {
    public static void main(String[] args) {
        // TODO: Calculate sum of squares using parallel stream
        long sum = 0;

        System.out.println("Sum: " + sum);
    }
}`,
          solution: `import java.util.stream.*;

public class ParallelStream {
    public static void main(String[] args) {
        long sum = IntStream.rangeClosed(1, 1000000)
            .parallel()
            .mapToLong(n -> (long) n * n)
            .sum();

        System.out.println("Sum: " + sum);
    }
}`
        },
        python: {
          starterCode: `# Python with multiprocessing
sum_of_squares = 0  # TODO

print(f"Sum: {sum_of_squares}")`,
          solution: `# Python with multiprocessing
from multiprocessing import Pool

def square(n):
    return n * n

with Pool() as pool:
    squares = pool.map(square, range(1, 1000001))
    sum_of_squares = sum(squares)

print(f"Sum: {sum_of_squares}")`
        }
      },
      explanation: 'Parallel streams split work across threads for better performance on multi-core systems.',
      timeComplexity: 'O(n) parallelized',
      spaceComplexity: 'O(1)'
    },
    {
      id: 3,
      title: 'flatMap for Nested Structures',
      difficulty: 'Medium',
      leetcodeUrl: '',
      description: 'Use flatMap to flatten nested collections. Extract all words from nested sentence lists.',
      examples: [
        { input: '[["hello world"], ["java streams"]]', output: '["hello", "world", "java", "streams"]' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.stream.*;

public class FlatMapExample {
    public static void main(String[] args) {
        List<List<String>> nested = Arrays.asList(
            Arrays.asList("hello world"),
            Arrays.asList("java streams")
        );

        // TODO: Extract all words using flatMap
        List<String> words = null;

        System.out.println(words);
    }
}`,
          solution: `import java.util.*;
import java.util.stream.*;

public class FlatMapExample {
    public static void main(String[] args) {
        List<List<String>> nested = Arrays.asList(
            Arrays.asList("hello world"),
            Arrays.asList("java streams")
        );

        List<String> words = nested.stream()
            .flatMap(List::stream)
            .flatMap(s -> Arrays.stream(s.split(" ")))
            .collect(Collectors.toList());

        System.out.println(words);
    }
}`
        },
        python: {
          starterCode: `# Python equivalent
nested = [["hello world"], ["java streams"]]

# TODO: Extract all words
words = []

print(words)`,
          solution: `# Python equivalent
nested = [["hello world"], ["java streams"]]

words = [word for sublist in nested for sentence in sublist for word in sentence.split()]

print(words)`
        }
      },
      explanation: 'flatMap flattens nested structures by mapping each element to a stream.',
      timeComplexity: 'O(n*m)',
      spaceComplexity: 'O(n*m)'
    },
    {
      id: 4,
      title: 'Custom Collectors',
      difficulty: 'Hard',
      leetcodeUrl: '',
      description: 'Create a custom collector to accumulate into a custom data structure.',
      examples: [
        { input: 'List of strings', output: 'Custom Stats object with count and average length' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.stream.*;

public class CustomCollector {
    static class Stats {
        int count = 0;
        int totalLength = 0;
        void add(String s) { count++; totalLength += s.length(); }
        void merge(Stats o) { count += o.count; totalLength += o.totalLength; }
        double avg() { return count == 0 ? 0 : (double) totalLength / count; }
    }

    public static void main(String[] args) {
        List<String> words = Arrays.asList("apple", "banana", "cherry");

        // TODO: Create custom collector
        Stats stats = null;

        System.out.println("Count: " + stats.count + ", Avg: " + stats.avg());
    }
}`,
          solution: `import java.util.*;
import java.util.stream.*;
import java.util.function.*;

public class CustomCollector {
    static class Stats {
        int count = 0;
        int totalLength = 0;
        void add(String s) { count++; totalLength += s.length(); }
        void merge(Stats o) { count += o.count; totalLength += o.totalLength; }
        double avg() { return count == 0 ? 0 : (double) totalLength / count; }
    }

    public static void main(String[] args) {
        List<String> words = Arrays.asList("apple", "banana", "cherry");

        Stats stats = words.stream()
            .collect(Collector.of(
                Stats::new,
                Stats::add,
                (s1, s2) -> { s1.merge(s2); return s1; },
                Function.identity()
            ));

        System.out.println("Count: " + stats.count + ", Avg: " + stats.avg());
    }
}`
        },
        python: {
          starterCode: `# Python equivalent
class Stats:
    def __init__(self):
        self.count = 0
        self.total_length = 0

words = ["apple", "banana", "cherry"]

# TODO: Accumulate stats
stats = Stats()

print(f"Count: {stats.count}, Avg: {stats.total_length / stats.count if stats.count > 0 else 0}")`,
          solution: `# Python equivalent
class Stats:
    def __init__(self):
        self.count = 0
        self.total_length = 0

    def add(self, s):
        self.count += 1
        self.total_length += len(s)

words = ["apple", "banana", "cherry"]

stats = Stats()
for word in words:
    stats.add(word)

print(f"Count: {stats.count}, Avg: {stats.total_length / stats.count if stats.count > 0 else 0}")`
        }
      },
      explanation: 'Custom collectors define how stream elements accumulate into custom data structures.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    }
  ]

  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`StreamsAdvanced-${q.id}`)).length
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
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', color: 'white', padding: '1.5rem' }}>
      <div style={{ padding: '2rem', maxWidth: '1800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setSelectedQuestion(null)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d97706'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}>
            ← Back to Java
          </button>
          <LanguageToggle />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2rem', borderRadius: '12px', border: '2px solid #374151', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: '#fbbf24', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <CompletionCheckbox problemId={`StreamsAdvanced-${selectedQuestion.id}`} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.75rem' }}>Description</h3>
              <p style={{ fontSize: '1rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.description}</p>
            </div>

            {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.75rem' }}>Examples</h3>
                {selectedQuestion.examples.map((example, idx) => (
                  <div key={idx} style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #374151', color: '#d1d5db' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#fbbf24' }}>Input:</strong> <code style={{ color: '#d1d5db' }}>{example.input}</code>
                    </div>
                    <div>
                      <strong style={{ color: '#fbbf24' }}>Output:</strong> <code style={{ color: '#d1d5db' }}>{example.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedQuestion.explanation && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.75rem' }}>Explanation</h3>
                <p style={{ fontSize: '0.95rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.explanation}</p>
              </div>
            )}

            {(selectedQuestion.timeComplexity || selectedQuestion.spaceComplexity) && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '8px', border: '1px solid #374151' }}>
                <h3 style={{ fontSize: '1rem', color: '#fbbf24', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Space: {selectedQuestion.spaceComplexity}</div>}
              </div>
            )}
          </div>

          <div style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2rem', borderRadius: '12px', border: '2px solid #374151', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedQuestion.code[language].solution) }} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
              <button onClick={() => setUserCode(selectedQuestion.code[language].starterCode)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Reset Code
              </button>
            </div>

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5', backgroundColor: '#111827', color: '#d1d5db' }} spellCheck={false} />

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#fbbf24', marginBottom: '0.5rem' }}>Output</h3>
                <pre style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '1rem', borderRadius: '8px', border: '1px solid #374151', overflow: 'auto', fontSize: '0.875rem', maxHeight: '150px', color: '#d1d5db' }}>{output}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', color: 'white', padding: '1.5rem' }}>
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d97706'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}>
          ← Back
        </button>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', background: 'linear-gradient(to right, #fbbf24, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Java Streams Advanced</h1>
        <p style={{ fontSize: '1.2rem', color: '#d1d5db' }}>Master advanced Streams API techniques</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem 2rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '12px', border: '2px solid #374151' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#fbbf24' }}>{stats.completed}/{stats.total}</div>
            <div style={{ fontSize: '0.875rem', color: '#d1d5db', marginTop: '0.25rem' }}>Completed</div>
          </div>
          <div style={{ padding: '1rem 2rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '12px', border: '2px solid #374151' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{stats.percentage}%</div>
            <div style={{ fontSize: '0.875rem', color: '#d1d5db', marginTop: '0.25rem' }}>Progress</div>
          </div>
        </div>
      </div>

      {Object.entries(groupedQuestions).map(([difficulty, difficultyQuestions]) => (
        difficultyQuestions.length > 0 && (
          <div key={difficulty} style={{ marginBottom: '2rem' }}>
            <button onClick={() => toggleSection(difficulty)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', border: '2px solid #374151', borderRadius: '12px', cursor: 'pointer', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: getDifficultyColor(difficulty) }}>{difficulty}</span>
                <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>({difficultyQuestions.length} problems)</span>
              </div>
              <span style={{ fontSize: '1.25rem', color: '#d1d5db' }}>{expandedSections[difficulty] ? '▼' : '▶'}</span>
            </button>

            {expandedSections[difficulty] && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem' }}>
                {difficultyQuestions.map((question) => (
                  <div key={question.id} onClick={() => selectQuestion(question)} style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '12px', border: '2px solid #374151', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#f9fafb', margin: 0, flex: 1 }}>{question.id}. {question.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ transform: 'scale(0.85)' }}>
                          <CompletionCheckbox problemId={`StreamsAdvanced-${question.id}`} />
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
    </div>
  )
}

export default StreamsAdvanced

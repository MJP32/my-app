import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import BookmarkButton from '../../components/BookmarkButton.jsx'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function DataStructures({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb, breadcrumbStack, onBreadcrumbClick, pushBreadcrumb, breadcrumbColors }) {
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
      title: "Course Schedule (Cycle Detection)",
      leetcodeUrl: 'https://leetcode.com/problems/course-schedule/',
      description: "There are numCourses courses you have to take, labeled from 0 to numCourses - 1. Given prerequisites array, return true if you can finish all courses. Detect cycles using DFS.",
      explanation: `**Problem:** Determine if you can finish all courses given prerequisite dependencies. Return true if possible, false if there's a circular dependency (cycle).

**Real-World Analogy:**
- Courses: Math 101, CS 101, CS 201, CS 301
- Prerequisites: [[CS 201, CS 101], [CS 301, CS 201], [CS 101, Math 101]]
- Valid: Can complete in order: Math 101 → CS 101 → CS 201 → CS 301
- Invalid: [[CS 201, CS 101], [CS 101, CS 201]] (circular dependency)

**Problem Translation:**
This is a **directed graph cycle detection** problem:
- Each course is a node
- Prerequisite [a, b] means edge from a to b (b must be taken before a)
- Can finish all courses = graph is a DAG (Directed Acyclic Graph)
- Cannot finish = graph has a cycle

**Key Insight: Three-State DFS**
Track each node with 3 possible states:
- **0 (UNVISITED)**: Never explored this course
- **1 (VISITING)**: Currently exploring this course (in current DFS path)
- **2 (VISITED)**: Fully explored (already checked, no cycles found)

**How to Detect Cycles:**
If we encounter a node marked as VISITING (1) during DFS, we've found a back edge → cycle exists!

**Example:**
Prerequisites: [[1,0], [0,1]]
Graph: 1 → 0 → 1 (cycle)

DFS from course 1:
  Mark 1 as VISITING (1)
  Follow edge to 0
    Mark 0 as VISITING (1)
    Follow edge to 1
      1 is already VISITING (1) → CYCLE DETECTED! ✗

**Algorithm Steps:**
1. Build adjacency list from prerequisites
   - For [a, b]: add edge a → b (b is prerequisite of a)
2. Initialize visited array with all 0s (unvisited)
3. For each course:
   - If unvisited, run DFS cycle detection
   - If cycle found, return false immediately
4. If no cycles found after checking all courses, return true

**DFS Cycle Detection:**
1. If current course is VISITING (1) → cycle found, return true
2. If current course is VISITED (2) → already checked, return false
3. Mark current course as VISITING (1)
4. Recursively check all prerequisites:
   - If any prerequisite has a cycle, return true
5. Mark current course as VISITED (2)
6. Return false (no cycle in this path)

**Why This Works:**
- VISITING nodes represent the current DFS path
- If we reach a VISITING node again, we've created a loop
- VISITED nodes are safe shortcuts (already proven cycle-free)

**Complexity Analysis:**
- Time: O(V + E) where V = courses, E = prerequisite pairs
  - Build graph: O(E)
  - DFS visits each node once: O(V)
  - Process each edge once: O(E)
- Space: O(V + E)
  - Adjacency list: O(E)
  - Visited array: O(V)
  - Recursion stack: O(V) worst case

**Alternative Approaches:**
1. Kahn's Algorithm (BFS with indegree) - easier to understand
2. Union Find (less common for this problem)`,
      pseudocode: `Build Graph:
-----------------------
graph = adjacency list (array of lists)
for each prerequisite [a, b]:
    graph[a].add(b)  // b is prerequisite of a

visited = array of size numCourses, initialized to 0

Main Function:
-----------------------
canFinish(numCourses, prerequisites):
    for course from 0 to numCourses-1:
        if hasCycle(graph, visited, course):
            return false
    return true

DFS Cycle Detection:
-----------------------
hasCycle(graph, visited, course):
    // Cycle detected: found back edge
    if visited[course] == 1:
        return true

    // Already checked this path, no cycle
    if visited[course] == 2:
        return false

    // Mark as visiting (current path)
    visited[course] = 1

    // Check all prerequisites
    for prereq in graph[course]:
        if hasCycle(graph, visited, prereq):
            return true  // Cycle found in prerequisite chain

    // Mark as visited (fully explored)
    visited[course] = 2
    return false  // No cycle found

Example Walkthrough (No Cycle):
-----------------------
Prerequisites: [[1,0]]
Graph: 1 → 0

visited = [0, 0]

Check course 0:
  hasCycle(0):
    visited[0] = 1 (VISITING)
    No prerequisites
    visited[0] = 2 (VISITED)
    return false
visited = [2, 0]

Check course 1:
  hasCycle(1):
    visited[1] = 1 (VISITING)
    Check prerequisite 0:
      visited[0] = 2 (VISITED) → skip
    visited[1] = 2 (VISITED)
    return false
visited = [2, 2]

No cycles → return true

Example Walkthrough (Cycle Detected):
-----------------------
Prerequisites: [[1,0], [0,1]]
Graph: 1 → 0, 0 → 1

visited = [0, 0]

Check course 0:
  hasCycle(0):
    visited[0] = 1 (VISITING)
    Check prerequisite 1:
      hasCycle(1):
        visited[1] = 1 (VISITING)
        Check prerequisite 0:
          visited[0] = 1 (VISITING) ← CYCLE! ✗
          return true
        return true
    return true

Cycle detected → return false`,
      starterCode: `import java.util.*;

class Solution {
    // TODO: Implement canFinish using topological sort (DFS cycle detection)
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // Build adjacency list
        List<Integer>[] graph = new ArrayList[numCourses];
        for (int i = 0; i < numCourses; i++) {
            graph[i] = new ArrayList<>();
        }

        for (int[] prereq : prerequisites) {
            graph[prereq[0]].add(prereq[1]);
        }

        // 0: unvisited, 1: visiting, 2: visited
        int[] visited = new int[numCourses];

        for (int i = 0; i < numCourses; i++) {
            if (hasCycle(graph, visited, i)) {
                return false;
            }
        }

        return true;
    }

    // TODO: Implement hasCycle helper - return true if cycle detected
    private boolean hasCycle(List<Integer>[] graph, int[] visited, int course) {
        return false;
    }
}

class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();

        // Test case 1: [[1,0]] - can finish
        int[][] prereq1 = {{1, 0}};
        System.out.println(sol.canFinish(2, prereq1));  // true

        // Test case 2: [[1,0],[0,1]] - cycle detected
        int[][] prereq2 = {{1, 0}, {0, 1}};
        System.out.println(sol.canFinish(2, prereq2));  // false
    }
}`,
      solution: `import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // Build adjacency list
        List<Integer>[] graph = new ArrayList[numCourses];
        for (int i = 0; i < numCourses; i++) {
            graph[i] = new ArrayList<>();
        }

        for (int[] prereq : prerequisites) {
            graph[prereq[0]].add(prereq[1]);
        }

        // 0: unvisited, 1: visiting, 2: visited
        int[] visited = new int[numCourses];

        for (int i = 0; i < numCourses; i++) {
            if (hasCycle(graph, visited, i)) {
                return false;
            }
        }

        return true;
    }

    private boolean hasCycle(List<Integer>[] graph, int[] visited, int course) {
        if (visited[course] == 1) return true;  // Cycle detected
        if (visited[course] == 2) return false; // Already checked

        visited[course] = 1; // Mark as visiting

        for (int prereq : graph[course]) {
            if (hasCycle(graph, visited, prereq)) {
                return true;
            }
        }

        visited[course] = 2; // Mark as visited
        return false;
    }
}

class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();

        // Test case 1: [[1,0]] - can finish
        int[][] prereq1 = {{1, 0}};
        System.out.println(sol.canFinish(2, prereq1));  // true

        // Test case 2: [[1,0],[0,1]] - cycle detected
        int[][] prereq2 = {{1, 0}, {0, 1}};
        System.out.println(sol.canFinish(2, prereq2));  // false
    }
}`,
      expectedOutput: "true\nfalse"
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Data Structures-${q.id}`)).length
    return { completed, total: questions.length, percentage: Math.round((completed / questions.length) * 100) }
  }

  const stats = getCompletionStats()

  // Group questions by difficulty
  const groupedQuestions = {
    Easy: questions.filter(q => q.difficulty === 'Easy'),
    Medium: questions.filter(q => q.difficulty === 'Medium'),
    Hard: questions.filter(q => q.difficulty === 'Hard')
  }

  // Flatten visible questions for keyboard navigation
  const visibleQuestions = Object.entries(groupedQuestions)
    .filter(([difficulty]) => expandedSections[difficulty])
    .flatMap(([, qs]) => qs)

  // Keyboard navigation for problem list
  const { focusedIndex, setFocusedIndex, itemRefs } = useKeyboardNavigation({
    items: visibleQuestions,
    onSelect: (question) => selectQuestion(question),
    onEscape: onBack,
    enabled: !selectedQuestion && visibleQuestions.length > 0,
    gridColumns: 2,
    loop: true
  })

  // Get the index of a question in the visible list
  const getVisibleIndex = (question) => {
    return visibleQuestions.findIndex(q => q.id === question.id)
  }

  const selectQuestion = (question) => {
    setSelectedQuestion(question)
    setShowSolution(false)
    setShowExplanation(false)
    setUserCode(question.code[language].starterCode)
    setOutput('')
    setShowDrawing(false)
    // Load existing drawing for this problem
    const savedDrawing = localStorage.getItem(`drawing-DataStructures-${question.id}`)
    setCurrentDrawing(savedDrawing)
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
    // Create extended breadcrumb with problem title
    const problemBreadcrumb = {
      ...breadcrumb,
      category: { name: 'Data Structures', onClick: () => setSelectedQuestion(null) },
      topic: selectedQuestion.title
    }

    const problemBreadcrumbStack = breadcrumbStack
      ? [...breadcrumbStack.slice(0, -1), { name: 'Data Structures', page: null }, { name: selectedQuestion.title, page: null }]
      : null

    const handleProblemBreadcrumbClick = (index, item) => {
      if (problemBreadcrumbStack && index === problemBreadcrumbStack.length - 2) {
        setSelectedQuestion(null)
      } else if (onBreadcrumbClick) {
        onBreadcrumbClick(index, item)
      }
    }

    return (
      <div style={{ padding: '2rem', maxWidth: '1800px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setSelectedQuestion(null)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            ← Back to Data Structures
          </button>
          <LanguageToggle />
        </div>

        <Breadcrumb
          breadcrumb={problemBreadcrumb}
          breadcrumbStack={problemBreadcrumbStack}
          onBreadcrumbClick={handleProblemBreadcrumbClick}
          colors={breadcrumbColors}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Problem Description */}
          <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '12px', border: '2px solid #374151', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: 'white', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <CompletionCheckbox problemId={`Data Structures-${selectedQuestion.id}`} />
              <BookmarkButton problemId={`DataStructures-${selectedQuestion.id}`} problemData={{ title: selectedQuestion.title, difficulty: selectedQuestion.difficulty, category: 'DataStructures' }} />
            </div>

            {selectedQuestion.leetcodeUrl && (
              <a href={selectedQuestion.leetcodeUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '0.5rem 1rem', backgroundColor: '#FFA116', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600' }}>
                View on LeetCode ↗
              </a>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '0.75rem' }}>Description</h3>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.6' }}>{selectedQuestion.description}</p>
            </div>

            {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '0.75rem' }}>Examples</h3>
                {selectedQuestion.examples.map((example, idx) => (
                  <div key={idx} style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #374151', color: '#9ca3af' }}>
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
              <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#111827', borderRadius: '8px', border: '1px solid #374151' }}>
                <h3 style={{ fontSize: '1rem', color: 'white', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#9ca3af' }}>Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#9ca3af' }}>Space: {selectedQuestion.spaceComplexity}</div>}
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '12px', border: '2px solid #374151', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' , flexWrap: 'wrap' }}>
              <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedQuestion.code[language].solution) }} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
              <button onClick={() => setUserCode(selectedQuestion.code[language].starterCode)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Reset Code
              </button>
              <button onClick={() => setShowDrawing(true)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: currentDrawing ? '#8b5cf6' : '#6366f1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {currentDrawing ? 'View' : 'Draw'} Sketch
              </button>
            </div>

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5', backgroundColor: '#111827', color: '#d1d5db' }} spellCheck={false} />

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: 'white', marginBottom: '0.5rem' }}>Output</h3>
                <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #374151', overflow: 'auto', fontSize: '0.875rem', maxHeight: '150px', color: '#9ca3af' }}>{output}</pre>
              </div>
            )}
          </div>
        </div>
        {/* Drawing Canvas Modal */}
        <DrawingCanvas
          isOpen={showDrawing}
          onClose={() => {
            setShowDrawing(false)
            // Reload drawing in case it was updated
            const savedDrawing = localStorage.getItem(`drawing-DataStructures-${selectedQuestion.id}`)
            setCurrentDrawing(savedDrawing)
          }}
          problemId={`DataStructures-${selectedQuestion.id}`}
          existingDrawing={currentDrawing}
        />
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s ease' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'} onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}>
          ← Back
        </button>
      </div>

      <Breadcrumb
        breadcrumb={breadcrumb}
        breadcrumbStack={breadcrumbStack}
        onBreadcrumbClick={onBreadcrumbClick}
        colors={breadcrumbColors}
      />

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(to right, #93c5fd, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>Data Structures</h1>
        <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>Master data structures problems</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem 2rem', backgroundColor: '#1f2937', borderRadius: '12px', border: '2px solid #374151' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6' }}>{stats.completed}/{stats.total}</div>
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
            <button onClick={() => toggleSection(difficulty)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', backgroundColor: '#1f2937', border: '2px solid #374151', borderRadius: '12px', cursor: 'pointer', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: getDifficultyColor(difficulty) }}>{difficulty}</span>
                <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>({difficultyQuestions.length} problems)</span>
              </div>
              <span style={{ fontSize: '1.25rem', color: '#9ca3af' }}>{expandedSections[difficulty] ? '▼' : '▶'}</span>
            </button>

            {expandedSections[difficulty] && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem' }} role="list" aria-label={`${difficulty} problems`}>
                {difficultyQuestions.map((question) => {
                  const visibleIndex = getVisibleIndex(question)
                  const isFocused = focusedIndex === visibleIndex
                  return (
                  <div
                    key={question.id}
                    ref={(el) => { if (el) itemRefs.current[visibleIndex] = el }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${question.title}, ${question.difficulty} difficulty`}
                    className={isFocused ? 'problem-card-focused' : ''}
                    onClick={() => selectQuestion(question)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        selectQuestion(question)
                      }
                    }}
                    onFocus={() => setFocusedIndex(visibleIndex)}
                    style={{
                      backgroundColor: '#1f2937',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: isFocused ? '2px solid #60a5fa' : '2px solid #374151',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)'; e.currentTarget.style.borderColor = '#3b82f6' }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = isFocused ? '#60a5fa' : '#374151' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0, flex: 1 }}>{question.id}. {question.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ transform: 'scale(0.85)' }}>
                          <CompletionCheckbox problemId={`Data Structures-${question.id}`} />
                        </div>
                        <BookmarkButton size="small" problemId={`DataStructures-${question.id}`} problemData={{ title: question.title, difficulty: question.difficulty, category: 'DataStructures' }} />
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
                  )
                })}
              </div>
            )}
          </div>
        )
      ))}
    </div>
  )
}

export default DataStructures

#!/usr/bin/env python3
"""
Generate NeetCode category files with problems
"""

import os

# Define the categories and their problems
CATEGORIES = {
    "TwoPointers": {
        "name": "Two Pointers",
        "problems": [
            {"title": "Valid Palindrome", "difficulty": "Easy", "exists": True},
            {"title": "Two Sum II Input Array Is Sorted", "difficulty": "Medium", "exists": True},
            {"title": "3Sum", "difficulty": "Medium", "exists": True},
            {"title": "Container With Most Water", "difficulty": "Medium", "exists": True},
            {"title": "Trapping Rain Water", "difficulty": "Hard", "exists": True},
        ]
    },
    "SlidingWindow": {
        "name": "Sliding Window",
        "problems": [
            {"title": "Best Time to Buy And Sell Stock", "difficulty": "Easy", "exists": True},
            {"title": "Longest Substring Without Repeating Characters", "difficulty": "Medium", "exists": True},
            {"title": "Longest Repeating Character Replacement", "difficulty": "Medium", "exists": False},
            {"title": "Permutation In String", "difficulty": "Medium", "exists": False},
            {"title": "Minimum Window Substring", "difficulty": "Hard", "exists": False},
            {"title": "Sliding Window Maximum", "difficulty": "Hard", "exists": True},
        ]
    },
    "Backtracking": {
        "name": "Backtracking",
        "problems": [
            {"title": "Subsets", "difficulty": "Medium", "exists": True},
            {"title": "Combination Sum", "difficulty": "Medium", "exists": True},
            {"title": "Combination Sum II", "difficulty": "Medium", "exists": False},
            {"title": "Permutations", "difficulty": "Medium", "exists": True},
            {"title": "Subsets II", "difficulty": "Medium", "exists": False},
            {"title": "Generate Parentheses", "difficulty": "Medium", "exists": True},
            {"title": "Word Search", "difficulty": "Medium", "exists": True},
            {"title": "Palindrome Partitioning", "difficulty": "Medium", "exists": False},
            {"title": "Letter Combinations of a Phone Number", "difficulty": "Medium", "exists": True},
            {"title": "N Queens", "difficulty": "Hard", "exists": False},
        ]
    },
    "Intervals": {
        "name": "Intervals",
        "problems": [
            {"title": "Insert Interval", "difficulty": "Medium", "exists": False},
            {"title": "Merge Intervals", "difficulty": "Medium", "exists": True},
            {"title": "Non Overlapping Intervals", "difficulty": "Medium", "exists": False},
            {"title": "Meeting Rooms", "difficulty": "Easy", "exists": False},
            {"title": "Meeting Rooms II", "difficulty": "Medium", "exists": True},
            {"title": "Minimum Interval to Include Each Query", "difficulty": "Hard", "exists": False},
        ]
    },
    "MathGeometry": {
        "name": "Math & Geometry",
        "problems": [
            {"title": "Rotate Image", "difficulty": "Medium", "exists": False},
            {"title": "Spiral Matrix", "difficulty": "Medium", "exists": False},
            {"title": "Set Matrix Zeroes", "difficulty": "Medium", "exists": False},
            {"title": "Happy Number", "difficulty": "Easy", "exists": True},
            {"title": "Plus One", "difficulty": "Easy", "exists": False},
            {"title": "Pow(x, n)", "difficulty": "Medium", "exists": False},
            {"title": "Multiply Strings", "difficulty": "Medium", "exists": False},
            {"title": "Detect Squares", "difficulty": "Medium", "exists": False},
        ]
    },
    "BitManipulation": {
        "name": "Bit Manipulation",
        "problems": [
            {"title": "Single Number", "difficulty": "Easy", "exists": False},
            {"title": "Number of 1 Bits", "difficulty": "Easy", "exists": False},
            {"title": "Counting Bits", "difficulty": "Easy", "exists": False},
            {"title": "Reverse Bits", "difficulty": "Easy", "exists": False},
            {"title": "Missing Number", "difficulty": "Easy", "exists": False},
            {"title": "Sum of Two Integers", "difficulty": "Medium", "exists": False},
            {"title": "Reverse Integer", "difficulty": "Medium", "exists": False},
        ]
    },
    "AdvancedGraphs": {
        "name": "Advanced Graphs",
        "problems": [
            {"title": "Network Delay Time", "difficulty": "Medium", "exists": False},
            {"title": "Reconstruct Itinerary", "difficulty": "Hard", "exists": False},
            {"title": "Min Cost to Connect All Points", "difficulty": "Medium", "exists": False},
            {"title": "Swim In Rising Water", "difficulty": "Hard", "exists": False},
            {"title": "Alien Dictionary", "difficulty": "Hard", "exists": False},
            {"title": "Cheapest Flights Within K Stops", "difficulty": "Medium", "exists": False},
        ]
    }
}

# Template for category file
TEMPLATE = '''import {{ useState, useEffect }} from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import {{ isProblemCompleted }} from '../../services/progressService'
import {{ getPreferredLanguage }} from '../../services/languageService'
import {{ useKeyboardNavigation }} from '../../hooks/useKeyboardNavigation'

function {ComponentName}({{ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory }}) {{
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
  const [expandedSections, setExpandedSections] = useState({{
    Easy: true,
    Medium: true,
    Hard: true
  }})

  // Listen for completion changes
  useEffect(() => {{
    const handleProgressUpdate = () => {{
      setRefreshKey(prev => prev + 1)
    }}

    window.addEventListener('progressUpdate', handleProgressUpdate)
    return () => window.removeEventListener('progressUpdate', handleProgressUpdate)
  }}, [])

  // Listen for language changes
  useEffect(() => {{
    const handleLanguageChange = (e) => {{
      setLanguage(e.detail)
      if (selectedQuestion) {{
        setUserCode(selectedQuestion.code[e.detail].starterCode)
      }}
    }}
    window.addEventListener('languageChange', handleLanguageChange)
    return () => window.removeEventListener('languageChange', handleLanguageChange)
  }}, [selectedQuestion])

  const questions = [
{problems}
  ]

  const {{ focusedIndex, itemRefs }} = useKeyboardNavigation({{
    items: questions.filter(q => expandedSections[q.difficulty]),
    onSelect: (question) => {{
      setSelectedQuestion(question)
      setUserCode(question.code[language].starterCode)
      setShowSolution(false)
      setShowExplanation(false)
      setOutput('')
      setShowDrawing(false)
      setCurrentDrawing(null)
    }},
    onBack: selectedQuestion ? (() => setSelectedQuestion(null)) : onBack,
    enabled: true,
    gridColumns: 1,
    loop: true
  }})

  const toggleSection = (difficulty) => {{
    setExpandedSections(prev => ({{
      ...prev,
      [difficulty]: !prev[difficulty]
    }}))
  }}

  if (!selectedQuestion) {{
    const easyQuestions = questions.filter(q => q.difficulty === 'Easy')
    const mediumQuestions = questions.filter(q => q.difficulty === 'Medium')
    const hardQuestions = questions.filter(q => q.difficulty === 'Hard')

    return (
      <div style={{{{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}}}>
        <div style={{{{ marginBottom: '2rem' }}}}>
          <button
            onClick={{onBack}}
            style={{{{
              padding: '0.5rem 1rem',
              fontSize: '1rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}}}
          >
            ← Back to Practice
          </button>
        </div>

        <h1 style={{{{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '1rem' }}}}>
          {CategoryName}
        </h1>

        <p style={{{{ fontSize: '1.1rem', color: '#6b7280', marginBottom: '2rem' }}}}>
          Master {CategoryName.toLowerCase()} patterns with LeetCode-style problems
        </p>

        {{/* Easy Problems */}}
        {{easyQuestions.length > 0 && (
          <div style={{{{ marginBottom: '2rem' }}}}>
            <button
              onClick={{() => toggleSection('Easy')}}
              style={{{{
                width: '100%',
                padding: '1rem',
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#10b981',
                backgroundColor: '#d1fae5',
                border: '2px solid #10b981',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}}}
            >
              <span>🟢 Easy ({{easyQuestions.length}})</span>
              <span>{{expandedSections.Easy ? '▼' : '▶'}}</span>
            </button>

            {{expandedSections.Easy && (
              <div style={{{{ display: 'flex', flexDirection: 'column', gap: '1rem' }}}}>
                {{easyQuestions.map((q, index) => {{
                  const isCompleted = isProblemCompleted(`{CategoryName}-${{q.id}}`)
                  const overallIndex = questions.findIndex(question => question.id === q.id)
                  const isFocused = focusedIndex === overallIndex

                  return (
                    <button
                      key={{q.id}}
                      ref={{(el) => itemRefs.current[overallIndex] = el}}
                      onClick={{() => {{
                        setSelectedQuestion(q)
                        setUserCode(q.code[language].starterCode)
                        setShowSolution(false)
                        setShowExplanation(false)
                        setOutput('')
                        setShowDrawing(false)
                        setCurrentDrawing(null)
                      }}}}
                      tabIndex={{isFocused ? 0 : -1}}
                      style={{{{
                        padding: '1.5rem',
                        backgroundColor: isCompleted ? '#d1fae5' : 'white',
                        border: isFocused ? '3px solid #10b981' : isCompleted ? '2px solid #10b981' : '2px solid #e5e7eb',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        textAlign: 'left',
                        boxShadow: isFocused ? '0 0 0 4px rgba(16, 185, 129, 0.2)' : 'none'
                      }}}}
                    >
                      <div style={{{{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}}}>
                        <div style={{{{ display: 'flex', alignItems: 'center', gap: '1rem' }}}}>
                          <span style={{{{ fontSize: '1.5rem' }}}}></span>
                          <div>
                            <h3 style={{{{ fontSize: '1.2rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.25rem' }}}}>
                              {{q.title}}
                            </h3>
                            <span style={{{{ fontSize: '0.9rem', color: '#10b981', fontWeight: '600' }}}}>Easy</span>
                          </div>
                        </div>
                        {{isCompleted && <span style={{{{ fontSize: '1.5rem' }}}}>✅</span>}}
                      </div>
                    </button>
                  )
                }})}}
              </div>
            )}}
          </div>
        )}}

        {{/* Medium Problems */}}
        {{mediumQuestions.length > 0 && (
          <div style={{{{ marginBottom: '2rem' }}}}>
            <button
              onClick={{() => toggleSection('Medium')}}
              style={{{{
                width: '100%',
                padding: '1rem',
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#f59e0b',
                backgroundColor: '#fef3c7',
                border: '2px solid #f59e0b',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}}}
            >
              <span>🟡 Medium ({{mediumQuestions.length}})</span>
              <span>{{expandedSections.Medium ? '▼' : '▶'}}</span>
            </button>

            {{expandedSections.Medium && (
              <div style={{{{ display: 'flex', flexDirection: 'column', gap: '1rem' }}}}>
                {{mediumQuestions.map((q, index) => {{
                  const isCompleted = isProblemCompleted(`{CategoryName}-${{q.id}}`)
                  const overallIndex = questions.findIndex(question => question.id === q.id)
                  const isFocused = focusedIndex === overallIndex

                  return (
                    <button
                      key={{q.id}}
                      ref={{(el) => itemRefs.current[overallIndex] = el}}
                      onClick={{() => {{
                        setSelectedQuestion(q)
                        setUserCode(q.code[language].starterCode)
                        setShowSolution(false)
                        setShowExplanation(false)
                        setOutput('')
                        setShowDrawing(false)
                        setCurrentDrawing(null)
                      }}}}
                      tabIndex={{isFocused ? 0 : -1}}
                      style={{{{
                        padding: '1.5rem',
                        backgroundColor: isCompleted ? '#fef3c7' : 'white',
                        border: isFocused ? '3px solid #f59e0b' : isCompleted ? '2px solid #f59e0b' : '2px solid #e5e7eb',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        textAlign: 'left',
                        boxShadow: isFocused ? '0 0 0 4px rgba(245, 158, 11, 0.2)' : 'none'
                      }}}}
                    >
                      <div style={{{{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}}}>
                        <div style={{{{ display: 'flex', alignItems: 'center', gap: '1rem' }}}}>
                          <span style={{{{ fontSize: '1.5rem' }}}}>📖</span>
                          <div>
                            <h3 style={{{{ fontSize: '1.2rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.25rem' }}}}>
                              {{q.title}}
                            </h3>
                            <span style={{{{ fontSize: '0.9rem', color: '#f59e0b', fontWeight: '600' }}}}>Medium</span>
                          </div>
                        </div>
                        {{isCompleted && <span style={{{{ fontSize: '1.5rem' }}}}>✅</span>}}
                      </div>
                    </button>
                  )
                }})}}
              </div>
            )}}
          </div>
        )}}

        {{/* Hard Problems */}}
        {{hardQuestions.length > 0 && (
          <div style={{{{ marginBottom: '2rem' }}}}>
            <button
              onClick={{() => toggleSection('Hard')}}
              style={{{{
                width: '100%',
                padding: '1rem',
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#ef4444',
                backgroundColor: '#fee2e2',
                border: '2px solid #ef4444',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}}}
            >
              <span>🔴 Hard ({{hardQuestions.length}})</span>
              <span>{{expandedSections.Hard ? '▼' : '▶'}}</span>
            </button>

            {{expandedSections.Hard && (
              <div style={{{{ display: 'flex', flexDirection: 'column', gap: '1rem' }}}}>
                {{hardQuestions.map((q, index) => {{
                  const isCompleted = isProblemCompleted(`{CategoryName}-${{q.id}}`)
                  const overallIndex = questions.findIndex(question => question.id === q.id)
                  const isFocused = focusedIndex === overallIndex

                  return (
                    <button
                      key={{q.id}}
                      ref={{(el) => itemRefs.current[overallIndex] = el}}
                      onClick={{() => {{
                        setSelectedQuestion(q)
                        setUserCode(q.code[language].starterCode)
                        setShowSolution(false)
                        setShowExplanation(false)
                        setOutput('')
                        setShowDrawing(false)
                        setCurrentDrawing(null)
                      }}}}
                      tabIndex={{isFocused ? 0 : -1}}
                      style={{{{
                        padding: '1.5rem',
                        backgroundColor: isCompleted ? '#fee2e2' : 'white',
                        border: isFocused ? '3px solid #ef4444' : isCompleted ? '2px solid #ef4444' : '2px solid #e5e7eb',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        textAlign: 'left',
                        boxShadow: isFocused ? '0 0 0 4px rgba(239, 68, 68, 0.2)' : 'none'
                      }}}}
                    >
                      <div style={{{{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}}}>
                        <div style={{{{ display: 'flex', alignItems: 'center', gap: '1rem' }}}}>
                          <span style={{{{ fontSize: '1.5rem' }}}}>🔥</span>
                          <div>
                            <h3 style={{{{ fontSize: '1.2rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.25rem' }}}}>
                              {{q.title}}
                            </h3>
                            <span style={{{{ fontSize: '0.9rem', color: '#ef4444', fontWeight: '600' }}}}>Hard</span>
                          </div>
                        </div>
                        {{isCompleted && <span style={{{{ fontSize: '1.5rem' }}}}>✅</span>}}
                      </div>
                    </button>
                  )
                }})}}
              </div>
            )}}
          </div>
        )}}
      </div>
    )
  }}

  // Render selected question view - placeholder for now
  return (
    <div style={{{{ padding: '2rem' }}}}>
      <button onClick={{() => setSelectedQuestion(null)}}>← Back</button>
      <h2>{{selectedQuestion.title}}</h2>
      <p>Problem details to be implemented...</p>
      <div style={{{{ marginLeft: 'auto' }}}}>
        <CompletionCheckbox
          problemId={{`{CategoryName}-${{selectedQuestion.id}}`}}
          label="Mark as Completed"
          onCompletionChange={{() => setRefreshKey(prev => prev + 1)}}
        />
      </div>
    </div>
  )
}}

export default {ComponentName}
'''

def generate_problem_stub(problem, index):
    """Generate a problem stub"""
    return f'''    {{
      id: {index + 1},
      title: '{problem["title"]}',
      difficulty: '{problem["difficulty"]}',
      description: 'TODO: Add description',
      code: {{
        java: {{
          starterCode: `// TODO: Add Java starter code`,
          solution: `// TODO: Add Java solution`
        }},
        python: {{
          starterCode: `# TODO: Add Python starter code`,
          solution: `# TODO: Add Python solution`
        }}
      }},
      hints: 'TODO: Add hints',
      leetcodeUrl: 'https://leetcode.com/problems/{problem["title"].lower().replace(" ", "-").replace("(", "").replace(")", "").replace(",", "")}/'
    }}'''

def generate_category_file(file_name, category_data):
    """Generate a complete category file"""
    component_name = file_name.replace('.jsx', '')
    category_name = category_data["name"]

    # Generate problem stubs
    problems_code = ",\n".join([
        generate_problem_stub(p, i)
        for i, p in enumerate(category_data["problems"])
        if not p.get("exists", False)  # Only add new problems
    ])

    # Fill in the template
    content = TEMPLATE.format(
        ComponentName=component_name,
        CategoryName=category_name,
        problems=problems_code
    )

    return content

def main():
    """Generate all category files"""
    output_dir = "/mnt/c/Users/micha/Documents/dev/oct/my-app/src/pages/algorithms"

    for file_name, category_data in CATEGORIES.items():
        file_path = os.path.join(output_dir, f"{file_name}.jsx")
        content = generate_category_file(file_name, category_data)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f"✓ Generated {file_path}")

    print(f"\n{'='*60}")
    print(f"Generated {len(CATEGORIES)} category files")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()

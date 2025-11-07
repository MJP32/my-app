#!/usr/bin/env python3
"""
Build new SystemDesign.jsx in SlidingWindow format with enhanced card interface
"""

import json

def escape_jsx(text):
    """Escape text for JSX."""
    # Only escape backticks - don't escape $ as it doesn't need escaping in template literals
    return text.replace('`', '\\`')

def build_question(topic):
    """Convert a topic to question format."""
    java_code = escape_jsx(topic['javaCode'])
    explanation = escape_jsx(topic['explanation'])
    title = escape_jsx(topic['title'])
    description = escape_jsx(topic['description'])

    # Build key points array
    key_points_js = ',\n          '.join([f"'{escape_jsx(kp)}'" for kp in topic['keyPoints']])

    return f'''    {{
      id: {topic['id']},
      title: '{title}',
      description: '{description}',
      difficulty: '{topic['difficulty']}',
      explanation: `{explanation}`,
      keyPoints: [
          {key_points_js}
      ],
      javaCode: `{java_code}`,
      pythonCode: `# {title}
# Python implementation example
# See Java code for complete implementation details
`
    }}'''

def main():
    # Load topics
    with open('system_design_topics.json', 'r', encoding='utf-8') as f:
        topics = json.load(f)

    # Build questions array
    questions_js = ',\n'.join([build_question(topic) for topic in topics])

    # Read the template (SystemDesign.jsx template with placeholders)
    # Build content part by part
    header = '''import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function SystemDesign({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory }) {
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
'''

    body = '''  ]

  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`System Design-${q.id}`)).length
    return { completed, total: questions.length, percentage: Math.round((completed / questions.length) * 100) }
  }

  const groupedQuestions = () => {
    const groups = { Easy: [], Medium: [], Hard: [] }
    questions.forEach(q => groups[q.difficulty].push(q))
    return groups
  }

  const selectQuestion = (question) => {
    setSelectedQuestion(question)
    setShowSolution(false)
    setShowExplanation(false)
    setUserCode(language === 'java' ? question.javaCode : question.pythonCode || question.javaCode)
    setOutput('')
    setShowDrawing(false)
    setCurrentDrawing(null)
  }

  const toggleSection = (difficulty) => {
    setExpandedSections(prev => ({ ...prev, [difficulty]: !prev[difficulty] }))
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#22c55e'
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
              <CompletionCheckbox problemId={`System Design-${selectedQuestion.id}`} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '0.75rem' }}>Description</h3>
              <p style={{ fontSize: '1rem', color: '#6b7280', lineHeight: '1.6' }}>{selectedQuestion.description}</p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '0.75rem' }}>Explanation</h3>
              <p style={{ fontSize: '1rem', color: '#6b7280', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{selectedQuestion.explanation}</p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '0.75rem' }}>Key Points</h3>
              <ul style={{ fontSize: '1rem', color: '#6b7280', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                {selectedQuestion.keyPoints.map((point, idx) => (
                  <li key={idx} style={{ marginBottom: '0.5rem' }}>{point}</li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button
                onClick={() => setShowDrawing(!showDrawing)}
                style={{ padding: '0.75rem 1.5rem', backgroundColor: showDrawing ? '#10b981' : '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600' }}
              >
                {showDrawing ? '✓ Drawing' : '✏️ Draw Solution'}
              </button>
            </div>

            {showDrawing && (
              <div style={{ marginTop: '1.5rem' }}>
                <DrawingCanvas onSave={setCurrentDrawing} initialDrawing={currentDrawing} />
              </div>
            )}
          </div>

          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', border: '2px solid #e5e7eb', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#1f2937', marginBottom: '1rem' }}>Implementation</h3>
            </div>

            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              style={{ flex: 1, fontFamily: 'monospace', fontSize: '0.875rem', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px', resize: 'none', backgroundColor: '#1e1e1e', color: '#d4d4d4' }}
              spellCheck={false}
            />

            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => {
                  setShowSolution(!showSolution)
                  if (!showSolution) {
                    setUserCode(language === 'java' ? selectedQuestion.javaCode : selectedQuestion.pythonCode || selectedQuestion.javaCode)
                  }
                }}
                style={{ padding: '0.75rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600' }}
              >
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>

              <button
                onClick={() => setShowExplanation(!showExplanation)}
                style={{ padding: '0.75rem 1.5rem', backgroundColor: '#8b5cf6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600' }}
              >
                {showExplanation ? 'Hide' : 'Show'} Explanation
              </button>
            </div>

            {showExplanation && (
              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '8px', fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.6' }}>
                {selectedQuestion.explanation}
              </div>
            )}

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h4 style={{ fontSize: '1rem', color: '#374151', marginBottom: '0.5rem' }}>Output:</h4>
                <pre style={{ backgroundColor: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '8px', fontSize: '0.875rem', overflowX: 'auto' }}>
                  {output}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const stats = getCompletionStats()
  const grouped = groupedQuestions()

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#f0f9ff', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1e3a8a', margin: 0 }}>
            System Design
          </h1>
          <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            ← Back
          </button>
        </div>

        <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '200px', backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', border: '2px solid #3b82f6' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '0.5rem' }}>
              {stats.completed}/{stats.total}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Problems Completed</div>
          </div>

          <div style={{ flex: '1', minWidth: '200px', backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', border: '2px solid #10b981' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>
              {stats.percentage}%
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Completion Rate</div>
          </div>
        </div>
      </div>

      {Object.entries(grouped).map(([difficulty, difficultyQuestions]) => (
        difficultyQuestions.length > 0 && (
          <div key={difficulty} style={{ marginBottom: '2rem' }}>
            <button
              onClick={() => toggleSection(difficulty)}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', backgroundColor: 'white', border: '2px solid #e5e7eb', borderRadius: '12px', cursor: 'pointer', marginBottom: '1rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: getDifficultyColor(difficulty) }}>
                  {difficulty}
                </span>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {difficultyQuestions.length} problems
                </span>
              </div>
              <span style={{ fontSize: '1.5rem', color: '#6b7280' }}>
                {expandedSections[difficulty] ? '▼' : '▶'}
              </span>
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
                          <CompletionCheckbox problemId={`System Design-${question.id}`} />
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

export default SystemDesign
'''

    # Combine everything
    full_content = header + questions_js + body

    # Write the file
    output_file = '/mnt/c/Users/micha/Documents/dev/oct/my-app/src/pages/design/SystemDesign.jsx'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(full_content)

    print(f"✅ Generated {output_file}")
    print(f"   - {len(topics)} topics converted to questions")
    print(f"   - Enhanced card interface applied")
    print(f"   - SlidingWindow format with all standard features")

if __name__ == '__main__':
    main()

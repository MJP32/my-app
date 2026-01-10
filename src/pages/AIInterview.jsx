import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const API_BASE = 'http://localhost:3001';

const INTERVIEW_DATA = {
  overview: {
    title: "Meta AI-Enabled Coding Interview",
    duration: "60 minutes",
    format: "CoderPad + AI Chat Panel",
    languages: ["Java", "C++", "C#", "Python", "TypeScript"],
    models: [
      { name: "Claude Sonnet 4", speed: "Medium", capability: "High", note: "Recommended" },
      { name: "Claude Haiku 3.5", speed: "Fast", capability: "Medium", note: "" },
      { name: "GPT-4o", speed: "Medium", capability: "High", note: "" },
      { name: "GPT-4o mini", speed: "Fast", capability: "Medium", note: "" },
      { name: "Gemini 2.0 Pro", speed: "Medium", capability: "High", note: "" },
    ],
  },
  timeline: [
    { phase: "Setup & Environment", time: "~5 min", tasks: ["Get familiar with CoderPad", "Test AI chat panel", "Confirm rules with interviewer"] },
    { phase: "Problem Explanation", time: "~5-10 min", tasks: ["Listen to problem statement", "Ask clarifying questions", "Understand requirements & constraints"] },
    { phase: "Codebase Exploration", time: "~5-10 min", tasks: ["Review existing code structure", "Examine test files", "Run initial tests to see failures"] },
    { phase: "Debugging Phase", time: "~5-10 min", tasks: ["Fix bugs in helper functions", "Use AI to help diagnose", "Get helper tests passing"] },
    { phase: "Implementation Discussion", time: "~5 min", tasks: ["Consider algorithmic approaches", "Defend your choices", "Discuss trade-offs"] },
    { phase: "Main Implementation", time: "~15-20 min", tasks: ["Implement core solution", "Test incrementally", "Debug and iterate"] },
    { phase: "Complexity Analysis", time: "~5 min", tasks: ["Explain time complexity", "Explain space complexity", "Discuss optimizations"] },
  ],
  evaluation: [
    {
      criterion: "Problem Solving",
      weight: "25%",
      description: "Break down complex problems, use logical reasoning",
      tips: ["Ask clarifying questions upfront", "Think aloud about your approach", "Consider multiple solutions before coding"]
    },
    {
      criterion: "Code Quality",
      weight: "25%",
      description: "Clean, maintainable, efficient code following best practices",
      tips: ["Use meaningful variable names", "Write modular functions", "Handle edge cases explicitly"]
    },
    {
      criterion: "Verification",
      weight: "25%",
      description: "Write comprehensive tests, ensure reliability",
      tips: ["Run tests frequently", "Add edge case tests", "Verify AI-generated code thoroughly"]
    },
    {
      criterion: "Communication",
      weight: "25%",
      description: "Articulate thought process, collaborate effectively",
      tips: ["Narrate while AI generates code", "Explain design decisions", "Summarize progress periodically"]
    },
  ],
  practiceProblems: [
    {
      id: 1,
      title: "LRU Cache",
      difficulty: "Medium",
      type: "Design",
      description: "Design a data structure that follows LRU eviction policy",
      skills: ["Hash Map", "Doubly Linked List", "OOP Design"],
      leetcode: "https://leetcode.com/problems/lru-cache/",
      aiPractice: "Implement the basic structure yourself, then use AI to help with edge cases"
    },
    {
      id: 2,
      title: "Design Twitter",
      difficulty: "Medium",
      type: "Design",
      description: "Design a simplified Twitter with post, follow, and feed features",
      skills: ["System Design", "Data Structures", "API Design"],
      leetcode: "https://leetcode.com/problems/design-twitter/",
      aiPractice: "Build the core data model first, use AI for helper method scaffolding"
    },
    {
      id: 3,
      title: "Min Stack",
      difficulty: "Medium",
      type: "Design",
      description: "Design a stack that supports push, pop, and getMin in O(1)",
      skills: ["Stack", "Space-Time Tradeoffs"],
      leetcode: "https://leetcode.com/problems/min-stack/",
      aiPractice: "Great warmup - implement fully yourself, then review with AI"
    },
    {
      id: 4,
      title: "Design Browser History",
      difficulty: "Medium",
      type: "Design",
      description: "Implement browser back/forward navigation",
      skills: ["Stack/List", "State Management"],
      leetcode: "https://leetcode.com/problems/design-browser-history/",
      aiPractice: "Focus on edge cases for back/forward limits"
    },
    {
      id: 5,
      title: "Time Based Key-Value Store",
      difficulty: "Medium",
      type: "Design",
      description: "Key-value store with timestamp-based retrieval",
      skills: ["Binary Search", "Hash Map", "Design"],
      leetcode: "https://leetcode.com/problems/time-based-key-value-store/",
      aiPractice: "Implement binary search yourself, use AI for data structure setup"
    },
    {
      id: 6,
      title: "Maze Solver (Meta Confirmed)",
      difficulty: "Medium",
      type: "Graph",
      description: "BFS/DFS maze traversal with state tracking",
      skills: ["BFS", "DFS", "Path Reconstruction"],
      leetcode: "Custom - practice with any maze problem",
      aiPractice: "Focus on debugging existing BFS/DFS code and adding features"
    },
  ],
  tips: {
    do: [
      "Ask for the practice environment link from your recruiter",
      "Practice with CoderPad's specific quirks beforehand",
      "Think aloud while AI generates code",
      "Review every line of AI-generated code",
      "Write code yourself when it's faster than prompting",
      "Test incrementally as you build",
      "Manually clear the output panel between runs",
    ],
    dont: [
      "Blindly accept AI suggestions without review",
      "Use AI as a crutch - you can be marked down for this",
      "Forget to handle edge cases (bar is higher with AI help)",
      "Spend excessive time debugging AI output",
      "Let the output panel fool you - it doesn't auto-scroll",
      "Panic if 3/4 parts done - many pass with incomplete solutions",
    ],
  },
};

// AI Chat Component
function AIChat({ colors, mode = 'general', context = '', onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState({ configured: false, checked: false });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    checkAIStatus();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const checkAIStatus = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/ai/status`);
      const data = await res.json();
      setAiStatus({ ...data, checked: true });
    } catch {
      setAiStatus({ configured: false, checked: true, error: 'Server not available' });
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          mode,
          context
        })
      });

      const data = await res.json();

      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `Error: ${data.error}`,
          isError: true
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Failed to connect to AI service. Make sure the server is running.',
        isError: true
      }]);
    }

    setIsLoading(false);
  };

  const getModeTitle = () => {
    switch (mode) {
      case 'interviewer': return 'AI Interviewer';
      case 'code-review': return 'Code Review';
      case 'hint': return 'Get Hints';
      default: return 'AI Assistant';
    }
  };

  const getPlaceholder = () => {
    switch (mode) {
      case 'interviewer': return 'Ask a question or describe your approach...';
      case 'code-review': return 'Paste your code for review...';
      case 'hint': return 'Describe where you\'re stuck...';
      default: return 'Type your message...';
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: colors.bgSecondary,
      borderRadius: '12px',
      border: `1px solid ${colors.border}`,
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '1rem',
        borderBottom: `1px solid ${colors.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.bgTertiary || colors.bgPrimary
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.25rem' }}>🤖</span>
          <span style={{ fontWeight: '600', color: colors.textPrimary }}>{getModeTitle()}</span>
          <span style={{
            fontSize: '0.7rem',
            padding: '0.125rem 0.5rem',
            borderRadius: '9999px',
            backgroundColor: aiStatus.configured ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            color: aiStatus.configured ? '#4ade80' : '#f87171'
          }}>
            {aiStatus.configured ? 'Connected' : 'Not Configured'}
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: colors.textMuted,
              cursor: 'pointer',
              fontSize: '1.25rem'
            }}
          >
            ×
          </button>
        )}
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {!aiStatus.configured && aiStatus.checked && (
          <div style={{
            padding: '1rem',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '8px',
            fontSize: '0.875rem',
            color: '#fbbf24'
          }}>
            <strong>AI Not Configured</strong>
            <p style={{ margin: '0.5rem 0 0 0', color: 'rgba(253, 230, 138, 0.8)' }}>
              To enable AI features, set the <code style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>ANTHROPIC_API_KEY</code> environment variable and restart the server.
            </p>
          </div>
        )}

        {messages.length === 0 && aiStatus.configured && (
          <div style={{
            textAlign: 'center',
            color: colors.textMuted,
            padding: '2rem',
            fontSize: '0.875rem'
          }}>
            {mode === 'interviewer' && "Start your mock interview! I'll present problems and evaluate your approach."}
            {mode === 'code-review' && "Paste your code and I'll provide detailed feedback on correctness, efficiency, and style."}
            {mode === 'hint' && "Describe the problem you're working on and where you're stuck. I'll guide you without giving away the answer."}
            {mode === 'general' && "Ask me anything about coding interviews, algorithms, or data structures!"}
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              backgroundColor: msg.role === 'user'
                ? '#10b981'
                : msg.isError
                  ? 'rgba(239, 68, 68, 0.2)'
                  : colors.bgTertiary || colors.bgPrimary,
              color: msg.role === 'user' ? 'white' : msg.isError ? '#f87171' : colors.textPrimary,
              fontSize: '0.875rem',
              lineHeight: '1.5',
              whiteSpace: 'pre-wrap'
            }}
          >
            {msg.content}
          </div>
        ))}

        {isLoading && (
          <div style={{
            alignSelf: 'flex-start',
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            backgroundColor: colors.bgTertiary || colors.bgPrimary,
            color: colors.textMuted,
            fontSize: '0.875rem'
          }}>
            <span style={{ animation: 'pulse 1.5s infinite' }}>Thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '1rem',
        borderTop: `1px solid ${colors.border}`,
        display: 'flex',
        gap: '0.5rem'
      }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder={getPlaceholder()}
          disabled={!aiStatus.configured || isLoading}
          style={{
            flex: 1,
            padding: '0.75rem',
            borderRadius: '8px',
            border: `1px solid ${colors.border}`,
            backgroundColor: colors.bgPrimary,
            color: colors.textPrimary,
            fontSize: '0.875rem',
            resize: 'none',
            minHeight: '44px',
            maxHeight: '120px',
            fontFamily: 'inherit'
          }}
          rows={1}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || isLoading || !aiStatus.configured}
          style={{
            padding: '0.75rem 1.25rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: !input.trim() || isLoading || !aiStatus.configured ? colors.border : '#10b981',
            color: 'white',
            fontWeight: '600',
            cursor: !input.trim() || isLoading || !aiStatus.configured ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

// Code Analyzer Component
function CodeAnalyzer({ colors }) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [problemDescription, setProblemDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeCode = async () => {
    if (!code.trim()) return;

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const res = await fetch(`${API_BASE}/api/ai/analyze-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, problemDescription })
      });

      const data = await res.json();

      if (data.success) {
        setAnalysis(data.analysis);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to connect to server');
    }

    setIsLoading(false);
  };

  const getScoreColor = (score) => {
    if (score >= 8) return '#4ade80';
    if (score >= 6) return '#facc15';
    if (score >= 4) return '#fb923c';
    return '#f87171';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{
        backgroundColor: colors.bgSecondary,
        borderRadius: '12px',
        padding: '1.5rem',
        border: `1px solid ${colors.border}`
      }}>
        <h3 style={{ color: colors.textPrimary, marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>
          AI Code Analyzer
        </h3>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', color: colors.textSecondary, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
            Problem Description (optional)
          </label>
          <input
            type="text"
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
            placeholder="e.g., Two Sum - Find two numbers that add up to target"
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.bgPrimary,
              color: colors.textPrimary,
              fontSize: '0.875rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', color: colors.textSecondary, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.bgPrimary,
              color: colors.textPrimary,
              fontSize: '0.875rem'
            }}
          >
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="cpp">C++</option>
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', color: colors.textSecondary, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
            Your Code
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            style={{
              width: '100%',
              minHeight: '200px',
              padding: '1rem',
              borderRadius: '8px',
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.bgTertiary || '#0f172a',
              color: colors.textPrimary,
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              resize: 'vertical'
            }}
          />
        </div>

        <button
          onClick={analyzeCode}
          disabled={!code.trim() || isLoading}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: !code.trim() || isLoading ? colors.border : '#10b981',
            color: 'white',
            fontWeight: '600',
            cursor: !code.trim() || isLoading ? 'not-allowed' : 'pointer',
            fontSize: '0.875rem'
          }}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Code'}
        </button>
      </div>

      {error && (
        <div style={{
          padding: '1rem',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '8px',
          color: '#f87171',
          fontSize: '0.875rem'
        }}>
          {error}
        </div>
      )}

      {analysis && !analysis.parseError && (
        <div style={{
          backgroundColor: colors.bgSecondary,
          borderRadius: '12px',
          padding: '1.5rem',
          border: `1px solid ${colors.border}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h3 style={{ color: colors.textPrimary, fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>
              Analysis Results
            </h3>
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: getScoreColor(analysis.overallScore)
            }}>
              {analysis.overallScore}/10
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            {analysis.correctness && (
              <div style={{ padding: '1rem', backgroundColor: colors.bgTertiary || colors.bgPrimary, borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ color: colors.textSecondary, fontSize: '0.875rem' }}>Correctness</span>
                  <span style={{ color: getScoreColor(analysis.correctness.score), fontWeight: '600' }}>{analysis.correctness.score}/10</span>
                </div>
                <p style={{ color: colors.textMuted, fontSize: '0.75rem', margin: 0 }}>{analysis.correctness.feedback}</p>
              </div>
            )}

            {analysis.codeQuality && (
              <div style={{ padding: '1rem', backgroundColor: colors.bgTertiary || colors.bgPrimary, borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ color: colors.textSecondary, fontSize: '0.875rem' }}>Code Quality</span>
                  <span style={{ color: getScoreColor(analysis.codeQuality.score), fontWeight: '600' }}>{analysis.codeQuality.score}/10</span>
                </div>
                <p style={{ color: colors.textMuted, fontSize: '0.75rem', margin: 0 }}>{analysis.codeQuality.feedback}</p>
              </div>
            )}
          </div>

          {analysis.efficiency && (
            <div style={{ padding: '1rem', backgroundColor: colors.bgTertiary || colors.bgPrimary, borderRadius: '8px', marginBottom: '1rem' }}>
              <h4 style={{ color: colors.textPrimary, fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem' }}>Complexity Analysis</h4>
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '0.5rem' }}>
                <div>
                  <span style={{ color: colors.textMuted, fontSize: '0.75rem' }}>Time: </span>
                  <span style={{ color: '#60a5fa', fontWeight: '600' }}>{analysis.efficiency.timeComplexity}</span>
                </div>
                <div>
                  <span style={{ color: colors.textMuted, fontSize: '0.75rem' }}>Space: </span>
                  <span style={{ color: '#a78bfa', fontWeight: '600' }}>{analysis.efficiency.spaceComplexity}</span>
                </div>
              </div>
              <p style={{ color: colors.textMuted, fontSize: '0.75rem', margin: 0 }}>{analysis.efficiency.feedback}</p>
            </div>
          )}

          {analysis.edgeCases && (
            <div style={{ padding: '1rem', backgroundColor: colors.bgTertiary || colors.bgPrimary, borderRadius: '8px', marginBottom: '1rem' }}>
              <h4 style={{ color: colors.textPrimary, fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem' }}>Edge Cases</h4>
              {analysis.edgeCases.handled?.length > 0 && (
                <div style={{ marginBottom: '0.5rem' }}>
                  <span style={{ color: '#4ade80', fontSize: '0.75rem' }}>✓ Handled: </span>
                  <span style={{ color: colors.textMuted, fontSize: '0.75rem' }}>{analysis.edgeCases.handled.join(', ')}</span>
                </div>
              )}
              {analysis.edgeCases.missing?.length > 0 && (
                <div>
                  <span style={{ color: '#f87171', fontSize: '0.75rem' }}>✗ Missing: </span>
                  <span style={{ color: colors.textMuted, fontSize: '0.75rem' }}>{analysis.edgeCases.missing.join(', ')}</span>
                </div>
              )}
            </div>
          )}

          {analysis.suggestions?.length > 0 && (
            <div style={{ padding: '1rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px' }}>
              <h4 style={{ color: '#34d399', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem' }}>Suggestions</h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'rgba(167, 243, 208, 0.8)', fontSize: '0.75rem' }}>
                {analysis.suggestions.map((s, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{s}</li>)}
              </ul>
            </div>
          )}

          {analysis.summary && (
            <p style={{ color: colors.textSecondary, fontSize: '0.875rem', marginTop: '1rem', lineHeight: '1.6' }}>
              {analysis.summary}
            </p>
          )}
        </div>
      )}

      {analysis?.parseError && (
        <div style={{
          backgroundColor: colors.bgSecondary,
          borderRadius: '12px',
          padding: '1.5rem',
          border: `1px solid ${colors.border}`
        }}>
          <h3 style={{ color: colors.textPrimary, fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>
            Analysis
          </h3>
          <p style={{ color: colors.textSecondary, fontSize: '0.875rem', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
            {analysis.summary}
          </p>
        </div>
      )}
    </div>
  );
}

// Question Generator Component
function QuestionGenerator({ colors }) {
  const [difficulty, setDifficulty] = useState('medium');
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previousQuestions, setPreviousQuestions] = useState([]);

  const generateQuestion = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/ai/generate-question`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ difficulty, topic, previousQuestions })
      });

      const data = await res.json();

      if (data.success) {
        setQuestion(data.question);
        if (data.question.title) {
          setPreviousQuestions(prev => [...prev, data.question.title]);
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to connect to server');
    }

    setIsLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{
        backgroundColor: colors.bgSecondary,
        borderRadius: '12px',
        padding: '1.5rem',
        border: `1px solid ${colors.border}`
      }}>
        <h3 style={{ color: colors.textPrimary, marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>
          AI Question Generator
        </h3>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', color: colors.textSecondary, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              style={{
                padding: '0.75rem',
                borderRadius: '8px',
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.bgPrimary,
                color: colors.textPrimary,
                fontSize: '0.875rem'
              }}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', color: colors.textSecondary, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Topic (optional)
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Arrays, Trees, Dynamic Programming"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.bgPrimary,
                color: colors.textPrimary,
                fontSize: '0.875rem'
              }}
            />
          </div>
        </div>

        <button
          onClick={generateQuestion}
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: isLoading ? colors.border : '#8b5cf6',
            color: 'white',
            fontWeight: '600',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '0.875rem'
          }}
        >
          {isLoading ? 'Generating...' : 'Generate New Question'}
        </button>
      </div>

      {error && (
        <div style={{
          padding: '1rem',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '8px',
          color: '#f87171',
          fontSize: '0.875rem'
        }}>
          {error}
        </div>
      )}

      {question && (
        <div style={{
          backgroundColor: colors.bgSecondary,
          borderRadius: '12px',
          padding: '1.5rem',
          border: `1px solid ${colors.border}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <h3 style={{ color: colors.textPrimary, fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>
              {question.title || 'Generated Question'}
            </h3>
            {question.difficulty && (
              <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                backgroundColor: question.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.2)' :
                  question.difficulty === 'Medium' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                color: question.difficulty === 'Easy' ? '#4ade80' :
                  question.difficulty === 'Medium' ? '#facc15' : '#f87171'
              }}>
                {question.difficulty}
              </span>
            )}
          </div>

          {question.topics?.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {question.topics.map((t, i) => (
                <span key={i} style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  backgroundColor: colors.bgTertiary || colors.bgPrimary,
                  color: colors.textSecondary
                }}>
                  {t}
                </span>
              ))}
            </div>
          )}

          <div style={{
            padding: '1rem',
            backgroundColor: colors.bgTertiary || colors.bgPrimary,
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            <p style={{ color: colors.textPrimary, fontSize: '0.875rem', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-wrap' }}>
              {question.description}
            </p>
          </div>

          {question.examples?.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ color: colors.textPrimary, fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem' }}>Examples</h4>
              {question.examples.map((ex, i) => (
                <div key={i} style={{
                  padding: '0.75rem',
                  backgroundColor: colors.bgTertiary || colors.bgPrimary,
                  borderRadius: '8px',
                  marginBottom: '0.5rem',
                  fontFamily: 'monospace',
                  fontSize: '0.8rem'
                }}>
                  <div style={{ color: colors.textSecondary }}>Input: <span style={{ color: '#60a5fa' }}>{ex.input}</span></div>
                  <div style={{ color: colors.textSecondary }}>Output: <span style={{ color: '#4ade80' }}>{ex.output}</span></div>
                  {ex.explanation && (
                    <div style={{ color: colors.textMuted, marginTop: '0.5rem', fontFamily: 'inherit' }}>
                      {ex.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {question.constraints?.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ color: colors.textPrimary, fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Constraints</h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', color: colors.textSecondary, fontSize: '0.8rem' }}>
                {question.constraints.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          )}

          {question.hints?.length > 0 && (
            <details style={{ marginTop: '1rem' }}>
              <summary style={{ color: '#fbbf24', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600' }}>
                Show Hints
              </summary>
              <ol style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.25rem', color: 'rgba(253, 230, 138, 0.8)', fontSize: '0.8rem' }}>
                {question.hints.map((h, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{h}</li>)}
              </ol>
            </details>
          )}
        </div>
      )}
    </div>
  );
}

// Timer component
function Timer({ isRunning, onTimeUpdate, colors }) {
  const [seconds, setSeconds] = useState(3600);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          const newTime = s - 1;
          onTimeUpdate?.(newTime);
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, seconds, onTimeUpdate]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const isLow = seconds < 600;

  return (
    <div style={{
      fontFamily: 'monospace',
      fontSize: '1.5rem',
      letterSpacing: '0.05em',
      color: isLow ? '#f87171' : '#34d399',
      animation: isLow ? 'pulse 2s infinite' : 'none'
    }}>
      {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
    </div>
  );
}

// Tab navigation
function TabNav({ tabs, activeTab, onTabChange, colors }) {
  return (
    <div style={{
      display: 'flex',
      gap: '4px',
      padding: '4px',
      backgroundColor: colors.bgSecondary,
      borderRadius: '12px',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontWeight: '500',
            transition: 'all 0.2s',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: activeTab === tab.id ? '#10b981' : 'transparent',
            color: activeTab === tab.id ? 'white' : colors.textSecondary,
            boxShadow: activeTab === tab.id ? '0 4px 6px rgba(16, 185, 129, 0.2)' : 'none'
          }}
        >
          {tab.icon && <span style={{ marginRight: '0.5rem' }}>{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// Mock Interview Problems
const MOCK_PROBLEMS = [
  {
    id: 'lru-cache',
    title: 'LRU Cache',
    difficulty: 'Medium',
    timeLimit: 45,
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:
- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
- int get(int key) Return the value of the key if it exists, otherwise return -1.
- void put(int key, int value) Update the value of the key if it exists. Otherwise, add the key-value pair. If the number of keys exceeds the capacity, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.`,
    starterCode: `class LRUCache:
    def __init__(self, capacity: int):
        # TODO: Initialize your data structures
        pass

    def get(self, key: int) -> int:
        # TODO: Return value if exists, else -1
        # Remember to update "recently used"
        pass

    def put(self, key: int, value: int) -> None:
        # TODO: Add or update key-value
        # Evict LRU if over capacity
        pass

# Test your implementation
cache = LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
print(cache.get(1))    # returns 1
cache.put(3, 3)        # evicts key 2
print(cache.get(2))    # returns -1
cache.put(4, 4)        # evicts key 1
print(cache.get(1))    # returns -1
print(cache.get(3))    # returns 3
print(cache.get(4))    # returns 4`,
    hints: [
      'Think about what data structures give O(1) access - HashMap comes to mind',
      'For tracking "recently used" order, consider a doubly linked list',
      'The key insight: combine HashMap (O(1) lookup) with Doubly Linked List (O(1) removal/insertion)',
      'Move accessed items to the front of the list, remove from the back when evicting'
    ],
    testCases: [
      { input: 'LRUCache(2), put(1,1), put(2,2), get(1)', expected: '1' },
      { input: 'put(3,3), get(2)', expected: '-1 (evicted)' },
      { input: 'get(3), get(4)', expected: '3, 4' }
    ]
  },
  {
    id: 'maze-solver',
    title: 'Maze Solver with Keys',
    difficulty: 'Medium',
    timeLimit: 45,
    description: `You are given a maze represented as a 2D grid. Find the shortest path from Start to End.

The maze contains:
- 'S' = Start position
- 'E' = End position
- '.' = Empty cell (can walk through)
- '#' = Wall (cannot pass)
- 'a'-'f' = Keys (collect them)
- 'A'-'F' = Locked doors (need corresponding lowercase key)

Return the minimum number of steps to reach the End, or -1 if impossible.

Note: You can walk over keys without picking them up, but you need a key to pass through its corresponding door.`,
    starterCode: `from collections import deque

def shortest_path(maze):
    """
    Find shortest path from 'S' to 'E' in the maze.
    Returns minimum steps or -1 if impossible.
    """
    if not maze or not maze[0]:
        return -1

    rows, cols = len(maze), len(maze[0])

    # Find start position
    start = None
    for r in range(rows):
        for c in range(cols):
            if maze[r][c] == 'S':
                start = (r, c)
                break

    if not start:
        return -1

    # BFS - TODO: Implement with key tracking
    # State: (row, col, keys_collected)
    # keys_collected can be a frozenset for hashing

    queue = deque()
    visited = set()

    # TODO: Complete the BFS implementation

    return -1

# Test maze
maze = [
    ['S', '.', '.', '#', 'a'],
    ['#', '#', '.', '#', '.'],
    ['.', 'A', '.', '.', '.'],
    ['.', '#', '#', '#', '.'],
    ['.', '.', '.', '.', 'E']
]

print(shortest_path(maze))`,
    hints: [
      'Standard BFS, but state includes which keys you have collected',
      'State = (row, col, frozenset(keys)) - frozenset makes it hashable',
      'When you step on a key, add it to your key set',
      'When you hit a door, check if you have the matching lowercase key',
      'Use visited set with full state to avoid revisiting same position with same keys'
    ],
    testCases: [
      { input: 'Simple maze without keys', expected: 'Standard BFS path length' },
      { input: 'Maze with key and door', expected: 'Path through key first, then door' },
      { input: 'Impossible maze', expected: '-1' }
    ]
  },
  {
    id: 'rate-limiter',
    title: 'Design Rate Limiter',
    difficulty: 'Medium',
    timeLimit: 40,
    description: `Design a rate limiter that limits the number of requests a user can make in a given time window.

Implement the RateLimiter class:
- RateLimiter(int maxRequests, int windowSizeInSeconds) Initialize with max requests allowed per window
- bool allowRequest(string userId) Returns true if the request is allowed, false if rate limited

Requirements:
- Use sliding window algorithm for accurate limiting
- Handle multiple users independently
- Efficient memory usage`,
    starterCode: `import time
from collections import defaultdict, deque

class RateLimiter:
    def __init__(self, max_requests: int, window_seconds: int):
        """
        Initialize rate limiter.
        max_requests: Maximum requests allowed in the window
        window_seconds: Size of the sliding window in seconds
        """
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        # TODO: Initialize data structures for tracking requests

    def allow_request(self, user_id: str) -> bool:
        """
        Check if a request from user_id should be allowed.
        Returns True if allowed, False if rate limited.
        """
        current_time = time.time()

        # TODO: Implement sliding window rate limiting
        # 1. Remove expired timestamps from the window
        # 2. Check if under the limit
        # 3. If allowed, record this request

        return True  # Placeholder

# Test the rate limiter
limiter = RateLimiter(max_requests=3, window_seconds=10)

print(limiter.allow_request("user1"))  # True
print(limiter.allow_request("user1"))  # True
print(limiter.allow_request("user1"))  # True
print(limiter.allow_request("user1"))  # False - rate limited
print(limiter.allow_request("user2"))  # True - different user`,
    hints: [
      'Use a deque (double-ended queue) to store timestamps for each user',
      'For sliding window: remove timestamps older than (current_time - window_seconds)',
      'After cleanup, check if len(timestamps) < max_requests',
      'Use defaultdict(deque) to handle multiple users efficiently',
      'Consider memory: periodically clean up users with no recent requests'
    ],
    testCases: [
      { input: '3 requests within limit', expected: 'All True' },
      { input: '4th request immediately after', expected: 'False' },
      { input: 'Request after window expires', expected: 'True again' }
    ]
  },
  {
    id: 'two-sum',
    title: 'Two Sum (Warm-up)',
    difficulty: 'Easy',
    timeLimit: 15,
    description: `Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.

You may assume that each input has exactly one solution, and you may not use the same element twice.

Return the answer in any order.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1] (because nums[0] + nums[1] = 2 + 7 = 9)`,
    starterCode: `def two_sum(nums, target):
    """
    Find two indices where nums[i] + nums[j] == target
    Return [i, j] or [] if not found
    """
    # TODO: Implement O(n) solution using a hash map

    return []

# Test cases
print(two_sum([2, 7, 11, 15], 9))   # [0, 1]
print(two_sum([3, 2, 4], 6))        # [1, 2]
print(two_sum([3, 3], 6))           # [0, 1]`,
    hints: [
      'Brute force is O(n²) - can you do better?',
      'What if you stored numbers you\'ve seen in a hash map?',
      'For each number, check if (target - number) exists in your map',
      'Store value -> index mapping as you iterate'
    ],
    testCases: [
      { input: '[2,7,11,15], target=9', expected: '[0, 1]' },
      { input: '[3,2,4], target=6', expected: '[1, 2]' },
      { input: '[3,3], target=6', expected: '[0, 1]' }
    ]
  }
];

// Checklist component
function InterviewChecklist({ items, title, colors, onCheckChange }) {
  const [checked, setChecked] = useState({});

  const handleCheck = (index) => {
    const newChecked = { ...checked, [index]: !checked[index] };
    setChecked(newChecked);
    onCheckChange?.(Object.values(newChecked).filter(Boolean).length, items.length);
  };

  return (
    <div style={{
      backgroundColor: colors.bgSecondary,
      borderRadius: '12px',
      padding: '1rem',
      border: `1px solid ${colors.border}`
    }}>
      <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: colors.textPrimary, marginBottom: '0.75rem' }}>{title}</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {items.map((item, i) => (
          <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={checked[i] || false}
              onChange={() => handleCheck(i)}
              style={{ marginTop: '0.2rem', width: '14px', height: '14px', accentColor: '#10b981' }}
            />
            <span style={{
              fontSize: '0.8rem',
              color: checked[i] ? colors.textMuted : colors.textSecondary,
              textDecoration: checked[i] ? 'line-through' : 'none',
              lineHeight: '1.4'
            }}>
              {item}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

// Mock Interview Tab with full AI integration
function MockInterviewTab({ colors }) {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [code, setCode] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [codeAnalysis, setCodeAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [checklistProgress, setChecklistProgress] = useState({ completed: 0, total: 0 });
  // New state for enhanced AI features
  const [isRunning, setIsRunning] = useState(false);
  const [executionOutput, setExecutionOutput] = useState(null);
  const [executionEvaluation, setExecutionEvaluation] = useState(null);
  const [followUpQuestions, setFollowUpQuestions] = useState(null);
  const [isLoadingFollowUp, setIsLoadingFollowUp] = useState(false);
  const [optimization, setOptimization] = useState(null);
  const [isLoadingOptimization, setIsLoadingOptimization] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const timerRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  useEffect(() => {
    if (timerRunning && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(t => t - 1);
      }, 1000);
    } else if (timeRemaining === 0 && timerRunning) {
      setTimerRunning(false);
    }
    return () => clearInterval(timerRef.current);
  }, [timerRunning, timeRemaining]);

  const startInterview = (problem) => {
    setSelectedProblem(problem);
    setCode(problem.starterCode);
    setTimeRemaining(problem.timeLimit * 60);
    setShowHints(false);
    setCurrentHint(0);
    setCodeAnalysis(null);
    setChatMessages([{
      role: 'assistant',
      content: `Welcome to your mock interview! Today's problem is "${problem.title}" (${problem.difficulty}).\n\nYou have ${problem.timeLimit} minutes to solve this problem. I'll act as your interviewer - feel free to:\n- Ask clarifying questions\n- Discuss your approach before coding\n- Request hints if you're stuck\n- Ask me to review your code\n\nWhen you're ready, click "Start Timer" and begin. Good luck!`
    }]);
  };

  const resetInterview = () => {
    setSelectedProblem(null);
    setTimerRunning(false);
    setTimeRemaining(0);
    setCode('');
    setCodeAnalysis(null);
    setChatMessages([]);
    setChecklistProgress({ completed: 0, total: 0 });
  };

  const requestAIHint = async () => {
    if (!selectedProblem) return;

    setIsChatLoading(true);
    const hintRequest = `I'm working on the "${selectedProblem.title}" problem. Can you give me a hint without revealing the full solution? Here's my current progress:\n\n${code}`;

    setChatMessages(prev => [...prev, { role: 'user', content: 'Can I get a hint?' }]);

    try {
      const res = await fetch(`${API_BASE}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: hintRequest }],
          mode: 'hint',
          context: `Problem: ${selectedProblem.title}\nDescription: ${selectedProblem.description}`
        })
      });
      const data = await res.json();
      if (data.success) {
        setChatMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      }
    } catch (err) {
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: selectedProblem.hints[Math.min(currentHint, selectedProblem.hints.length - 1)],
        isOffline: true
      }]);
      setCurrentHint(h => Math.min(h + 1, selectedProblem.hints.length - 1));
    }
    setIsChatLoading(false);
  };

  const requestCodeReview = async () => {
    if (!code.trim()) return;

    setIsAnalyzing(true);
    setChatMessages(prev => [...prev, { role: 'user', content: 'Can you review my code?' }]);

    try {
      const res = await fetch(`${API_BASE}/api/ai/analyze-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language: 'python',
          problemDescription: `${selectedProblem.title}: ${selectedProblem.description}`
        })
      });
      const data = await res.json();
      if (data.success) {
        setCodeAnalysis(data.analysis);
        const reviewMessage = data.analysis.parseError
          ? data.analysis.summary
          : `**Code Review Results**\n\nOverall Score: ${data.analysis.overallScore}/10\n\n` +
            `Correctness: ${data.analysis.correctness?.score}/10\n` +
            `Code Quality: ${data.analysis.codeQuality?.score}/10\n\n` +
            `Time Complexity: ${data.analysis.efficiency?.timeComplexity}\n` +
            `Space Complexity: ${data.analysis.efficiency?.spaceComplexity}\n\n` +
            `${data.analysis.summary}`;
        setChatMessages(prev => [...prev, { role: 'assistant', content: reviewMessage }]);
      }
    } catch (err) {
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Unable to analyze code - server not available. Review your code manually for correctness, edge cases, and complexity.',
        isError: true
      }]);
    }
    setIsAnalyzing(false);
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;

    const userMessage = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsChatLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: chatMessages.concat({ role: 'user', content: userMessage }),
          mode: 'interviewer',
          context: `Problem: ${selectedProblem?.title}\nDescription: ${selectedProblem?.description}\n\nCandidate's current code:\n${code}`
        })
      });
      const data = await res.json();
      if (data.success) {
        setChatMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      }
    } catch (err) {
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: 'AI interviewer is offline. Continue working on your solution!',
        isError: true
      }]);
    }
    setIsChatLoading(false);
  };

  // Run code and get AI evaluation of the output
  const runCodeWithEvaluation = async () => {
    if (!code.trim() || isRunning) return;

    setIsRunning(true);
    setExecutionOutput(null);
    setExecutionEvaluation(null);
    setChatMessages(prev => [...prev, { role: 'user', content: '▶️ Running code...' }]);

    try {
      // First, execute the code
      const execRes = await fetch(`${API_BASE}/api/execute-python`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      const execData = await execRes.json();

      const output = execData.success ? execData.output : execData.error;
      setExecutionOutput({
        success: execData.success,
        output: output,
        error: execData.error
      });

      // Add output to chat
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: `**Code Execution ${execData.success ? 'Complete' : 'Error'}:**\n\`\`\`\n${output}\n\`\`\``,
        isOutput: true
      }]);

      // Now evaluate with AI
      if (execData.success) {
        const evalRes = await fetch(`${API_BASE}/api/ai/evaluate-output`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
            output,
            problemDescription: `${selectedProblem.title}: ${selectedProblem.description}`,
            testCases: selectedProblem.testCases
          })
        });
        const evalData = await evalRes.json();

        if (evalData.success) {
          setExecutionEvaluation(evalData.evaluation);
          const passedIcon = evalData.evaluation.passed ? '✅' : '❌';
          const evalMessage = evalData.evaluation.parseError
            ? evalData.evaluation.feedback
            : `${passedIcon} **AI Evaluation:** Score: ${evalData.evaluation.score}/100\n\n${evalData.evaluation.feedback}${evalData.evaluation.issues?.length > 0 ? `\n\n**Issues:**\n${evalData.evaluation.issues.map(i => `• ${i}`).join('\n')}` : ''}${evalData.evaluation.suggestions?.length > 0 ? `\n\n**Suggestions:**\n${evalData.evaluation.suggestions.map(s => `• ${s}`).join('\n')}` : ''}`;
          setChatMessages(prev => [...prev, { role: 'assistant', content: evalMessage }]);
        }
      }
    } catch (err) {
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Failed to run code. Make sure the server is running.',
        isError: true
      }]);
    }

    setIsRunning(false);
    setShowResults(true);
  };

  // Get AI-generated follow-up questions
  const getFollowUpQuestions = async () => {
    if (!code.trim() || isLoadingFollowUp) return;

    setIsLoadingFollowUp(true);
    setFollowUpQuestions(null);
    setChatMessages(prev => [...prev, { role: 'user', content: 'Can you give me some follow-up questions?' }]);

    try {
      const res = await fetch(`${API_BASE}/api/ai/follow-up-questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemTitle: selectedProblem.title,
          problemDescription: selectedProblem.description,
          code,
          complexity: codeAnalysis?.efficiency ? {
            time: codeAnalysis.efficiency.timeComplexity,
            space: codeAnalysis.efficiency.spaceComplexity
          } : null
        })
      });
      const data = await res.json();

      if (data.success) {
        setFollowUpQuestions(data.followUp);
        const questions = data.followUp.questions || [];
        const questionsMessage = `**Follow-up Questions for Your Interview:**\n\n${questions.map((q, i) =>
          `${i + 1}. **[${q.category || 'general'}]** ${q.question}`
        ).join('\n\n')}${data.followUp.overallAssessment ? `\n\n**Overall Assessment:** ${data.followUp.overallAssessment}` : ''}`;
        setChatMessages(prev => [...prev, { role: 'assistant', content: questionsMessage }]);
      }
    } catch (err) {
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Unable to generate follow-up questions. Try discussing with the interviewer instead!',
        isError: true
      }]);
    }

    setIsLoadingFollowUp(false);
  };

  // Get optimization suggestions
  const getOptimizationSuggestions = async () => {
    if (!code.trim() || isLoadingOptimization) return;

    setIsLoadingOptimization(true);
    setOptimization(null);
    setChatMessages(prev => [...prev, { role: 'user', content: 'How can I optimize my solution?' }]);

    try {
      const res = await fetch(`${API_BASE}/api/ai/optimize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language: 'python',
          problemDescription: `${selectedProblem.title}: ${selectedProblem.description}`,
          currentComplexity: codeAnalysis?.efficiency ? {
            time: codeAnalysis.efficiency.timeComplexity,
            space: codeAnalysis.efficiency.spaceComplexity
          } : null
        })
      });
      const data = await res.json();

      if (data.success) {
        setOptimization(data.optimization);
        const opt = data.optimization;
        let optMessage = `**Optimization Analysis:**\n\n`;

        if (opt.currentAnalysis) {
          optMessage += `**Current Complexity:**\n• Time: ${opt.currentAnalysis.timeComplexity}\n• Space: ${opt.currentAnalysis.spaceComplexity}\n`;
          if (opt.currentAnalysis.bottlenecks?.length > 0) {
            optMessage += `• Bottlenecks: ${opt.currentAnalysis.bottlenecks.join(', ')}\n`;
          }
        }

        if (opt.optimizations?.length > 0) {
          optMessage += `\n**Suggested Optimizations:**\n`;
          opt.optimizations.forEach((o, i) => {
            optMessage += `\n${i + 1}. **${o.title}**\n`;
            optMessage += `   ${o.description}\n`;
            if (o.impact) optMessage += `   Impact: ${o.impact}\n`;
            if (o.codeHint) optMessage += `   Hint: \`${o.codeHint}\`\n`;
          });
        }

        if (opt.optimalApproach) {
          optMessage += `\n**Optimal Approach:**\n`;
          optMessage += `• Time: ${opt.optimalApproach.timeComplexity}, Space: ${opt.optimalApproach.spaceComplexity}\n`;
          optMessage += `• ${opt.optimalApproach.description}\n`;
        }

        if (opt.alternativeApproaches?.length > 0) {
          optMessage += `\n**Alternative Approaches:**\n`;
          opt.alternativeApproaches.forEach(a => {
            optMessage += `• **${a.name}** (${a.complexity}): ${a.description}\n`;
          });
        }

        setChatMessages(prev => [...prev, { role: 'assistant', content: optMessage }]);
      }
    } catch (err) {
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Unable to analyze optimizations. Consider asking the interviewer about possible improvements.',
        isError: true
      }]);
    }

    setIsLoadingOptimization(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Problem selection view
  if (!selectedProblem) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '12px',
          padding: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🎯</span>
            <h3 style={{ color: '#a78bfa', fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>AI Mock Interview</h3>
          </div>
          <p style={{ color: 'rgba(196, 181, 253, 0.8)', fontSize: '0.875rem', margin: 0, lineHeight: '1.6' }}>
            Simulate a real AI-enabled coding interview. Select a problem below to start your timed mock interview
            with an AI interviewer who will guide you, provide hints, and review your code.
          </p>
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {MOCK_PROBLEMS.map(problem => (
            <button
              key={problem.id}
              onClick={() => startInterview(problem)}
              style={{
                textAlign: 'left',
                padding: '1.25rem',
                backgroundColor: colors.bgSecondary,
                borderRadius: '12px',
                border: `1px solid ${colors.border}`,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <h4 style={{ color: colors.textPrimary, fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                    {problem.title}
                  </h4>
                  <span style={{
                    fontSize: '0.7rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    backgroundColor: problem.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.2)' :
                      problem.difficulty === 'Medium' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    color: problem.difficulty === 'Easy' ? '#4ade80' :
                      problem.difficulty === 'Medium' ? '#facc15' : '#f87171'
                  }}>
                    {problem.difficulty}
                  </span>
                </div>
                <span style={{ color: colors.textMuted, fontSize: '0.8rem' }}>
                  {problem.timeLimit} min
                </span>
              </div>
              <p style={{ color: colors.textSecondary, fontSize: '0.8rem', margin: 0, lineHeight: '1.5' }}>
                {problem.description.split('\n')[0]}
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Active interview view
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Header with timer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        backgroundColor: colors.bgSecondary,
        borderRadius: '12px',
        border: `1px solid ${colors.border}`
      }}>
        <button
          onClick={resetInterview}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'transparent',
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
            color: colors.textSecondary,
            cursor: 'pointer',
            fontSize: '0.875rem'
          }}
        >
          ← Exit Interview
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            fontFamily: 'monospace',
            fontSize: '1.5rem',
            fontWeight: '700',
            color: timeRemaining < 300 ? '#f87171' : timeRemaining < 600 ? '#facc15' : '#34d399'
          }}>
            {formatTime(timeRemaining)}
          </div>
          <button
            onClick={() => setTimerRunning(!timerRunning)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: timerRunning ? '#ef4444' : '#10b981',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            {timerRunning ? 'Pause' : 'Start Timer'}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            fontSize: '0.75rem',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            backgroundColor: selectedProblem.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.2)' :
              selectedProblem.difficulty === 'Medium' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            color: selectedProblem.difficulty === 'Easy' ? '#4ade80' :
              selectedProblem.difficulty === 'Medium' ? '#facc15' : '#f87171'
          }}>
            {selectedProblem.difficulty}
          </span>
          <span style={{ color: colors.textPrimary, fontWeight: '600' }}>{selectedProblem.title}</span>
        </div>
      </div>

      {/* Main content - split view */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', minHeight: '600px' }}>
        {/* Left: Problem + Code Editor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Problem description */}
          <div style={{
            backgroundColor: colors.bgSecondary,
            borderRadius: '12px',
            padding: '1rem',
            border: `1px solid ${colors.border}`,
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            <h4 style={{ color: colors.textPrimary, fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Problem</h4>
            <pre style={{
              color: colors.textSecondary,
              fontSize: '0.8rem',
              whiteSpace: 'pre-wrap',
              margin: 0,
              fontFamily: 'inherit',
              lineHeight: '1.5'
            }}>
              {selectedProblem.description}
            </pre>
          </div>

          {/* Code editor */}
          <div style={{
            flex: 1,
            backgroundColor: colors.bgTertiary || '#0f172a',
            borderRadius: '12px',
            border: `1px solid ${colors.border}`,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              padding: '0.5rem 1rem',
              backgroundColor: colors.bgSecondary,
              borderBottom: `1px solid ${colors.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ color: colors.textMuted, fontSize: '0.75rem', fontFamily: 'monospace' }}>Python</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={requestAIHint}
                  disabled={isChatLoading}
                  style={{
                    padding: '0.25rem 0.75rem',
                    fontSize: '0.75rem',
                    backgroundColor: 'rgba(234, 179, 8, 0.2)',
                    color: '#facc15',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isChatLoading ? 'not-allowed' : 'pointer'
                  }}
                >
                  💡 Get Hint
                </button>
                <button
                  onClick={requestCodeReview}
                  disabled={isAnalyzing || !code.trim()}
                  style={{
                    padding: '0.25rem 0.75rem',
                    fontSize: '0.75rem',
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    color: '#34d399',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isAnalyzing || !code.trim() ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isAnalyzing ? '...' : '🔍 Review Code'}
                </button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{
                flex: 1,
                padding: '1rem',
                backgroundColor: 'transparent',
                color: colors.textPrimary,
                border: 'none',
                resize: 'none',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                lineHeight: '1.5',
                outline: 'none'
              }}
              spellCheck={false}
            />
          </div>

          {/* Test cases */}
          <div style={{
            backgroundColor: colors.bgSecondary,
            borderRadius: '12px',
            padding: '1rem',
            border: `1px solid ${colors.border}`
          }}>
            <h4 style={{ color: colors.textPrimary, fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Test Cases</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {selectedProblem.testCases.map((tc, i) => (
                <div key={i} style={{ fontSize: '0.75rem', color: colors.textSecondary }}>
                  <span style={{ color: colors.textMuted }}>Input: </span>{tc.input}
                  <span style={{ color: colors.textMuted, marginLeft: '0.5rem' }}>→ </span>
                  <span style={{ color: '#4ade80' }}>{tc.expected}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: AI Chat + Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* AI Chat */}
          <div style={{
            flex: 1,
            backgroundColor: colors.bgSecondary,
            borderRadius: '12px',
            border: `1px solid ${colors.border}`,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '0.75rem 1rem',
              backgroundColor: colors.bgTertiary || colors.bgPrimary,
              borderBottom: `1px solid ${colors.border}`,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>🤖</span>
              <span style={{ fontWeight: '600', color: colors.textPrimary, fontSize: '0.9rem' }}>AI Interviewer</span>
            </div>

            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    padding: '0.6rem 0.9rem',
                    borderRadius: '10px',
                    backgroundColor: msg.role === 'user' ? '#10b981' :
                      msg.isError ? 'rgba(239, 68, 68, 0.2)' :
                      msg.isOffline ? 'rgba(234, 179, 8, 0.2)' :
                      colors.bgTertiary || colors.bgPrimary,
                    color: msg.role === 'user' ? 'white' :
                      msg.isError ? '#f87171' :
                      msg.isOffline ? '#facc15' :
                      colors.textPrimary,
                    fontSize: '0.8rem',
                    lineHeight: '1.5',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {msg.content}
                </div>
              ))}
              {isChatLoading && (
                <div style={{
                  alignSelf: 'flex-start',
                  padding: '0.6rem 0.9rem',
                  borderRadius: '10px',
                  backgroundColor: colors.bgTertiary || colors.bgPrimary,
                  color: colors.textMuted,
                  fontSize: '0.8rem'
                }}>
                  Thinking...
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div style={{
              padding: '0.75rem',
              borderTop: `1px solid ${colors.border}`,
              display: 'flex',
              gap: '0.5rem'
            }}>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
                placeholder="Ask the interviewer..."
                style={{
                  flex: 1,
                  padding: '0.5rem 0.75rem',
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
                  backgroundColor: colors.bgPrimary,
                  color: colors.textPrimary,
                  fontSize: '0.8rem'
                }}
              />
              <button
                onClick={sendChatMessage}
                disabled={!chatInput.trim() || isChatLoading}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: !chatInput.trim() || isChatLoading ? colors.border : '#10b981',
                  color: 'white',
                  fontWeight: '600',
                  cursor: !chatInput.trim() || isChatLoading ? 'not-allowed' : 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                Send
              </button>
            </div>
          </div>

          {/* Interview Checklist */}
          <InterviewChecklist
            title={`Interview Checklist (${checklistProgress.completed}/${checklistProgress.total || 8})`}
            colors={colors}
            onCheckChange={(completed, total) => setChecklistProgress({ completed, total })}
            items={[
              'Asked clarifying questions about requirements',
              'Discussed approach before coding',
              'Identified edge cases',
              'Wrote working solution',
              'Tested with examples',
              'Reviewed code with AI',
              'Analyzed time complexity',
              'Analyzed space complexity'
            ]}
          />
        </div>
      </div>
    </div>
  );
}

// AI Interview Simulator Tab (chat only)
function AIInterviewTab({ colors }) {
  const [chatMode, setChatMode] = useState('interviewer');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '12px',
        padding: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem' }}>💬</span>
          <h3 style={{ color: '#a78bfa', fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>AI Chat Assistant</h3>
        </div>
        <p style={{ color: 'rgba(196, 181, 253, 0.8)', fontSize: '0.875rem', margin: 0, lineHeight: '1.6' }}>
          Chat with AI in different modes - get interview practice, code reviews, hints, or general help.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {[
          { id: 'interviewer', label: 'Interviewer', icon: '👔' },
          { id: 'hint', label: 'Get Hints', icon: '💡' },
          { id: 'code-review', label: 'Code Review', icon: '🔍' },
          { id: 'general', label: 'General Help', icon: '💬' }
        ].map(mode => (
          <button
            key={mode.id}
            onClick={() => setChatMode(mode.id)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: chatMode === mode.id ? '2px solid #8b5cf6' : `1px solid ${colors.border}`,
              backgroundColor: chatMode === mode.id ? 'rgba(139, 92, 246, 0.2)' : colors.bgSecondary,
              color: chatMode === mode.id ? '#a78bfa' : colors.textSecondary,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {mode.icon} {mode.label}
          </button>
        ))}
      </div>

      <div style={{ height: '500px' }}>
        <AIChat colors={colors} mode={chatMode} />
      </div>
    </div>
  );
}

// Overview section
function OverviewSection({ colors }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05))',
          borderRadius: '12px',
          padding: '1.25rem',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#34d399' }}>{INTERVIEW_DATA.overview.duration}</div>
          <div style={{ color: colors.textSecondary, marginTop: '0.25rem' }}>Total Duration</div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.05))',
          borderRadius: '12px',
          padding: '1.25rem',
          border: '1px solid rgba(59, 130, 246, 0.2)'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#60a5fa' }}>1</div>
          <div style={{ color: colors.textSecondary, marginTop: '0.25rem' }}>Extended Problem</div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.05))',
          borderRadius: '12px',
          padding: '1.25rem',
          border: '1px solid rgba(139, 92, 246, 0.2)'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#a78bfa' }}>4</div>
          <div style={{ color: colors.textSecondary, marginTop: '0.25rem' }}>Parts to Complete</div>
        </div>
      </div>

      <div style={{
        backgroundColor: colors.bgSecondary,
        borderRadius: '12px',
        padding: '1.5rem',
        border: `1px solid ${colors.border}`
      }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: colors.textPrimary, marginBottom: '1rem' }}>Available AI Models</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.75rem' }}>
          {INTERVIEW_DATA.overview.models.map(model => (
            <div key={model.name} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem',
              backgroundColor: colors.bgTertiary || colors.bgPrimary,
              borderRadius: '8px'
            }}>
              <span style={{ color: colors.textSecondary }}>{model.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '0.125rem 0.5rem',
                  borderRadius: '4px',
                  backgroundColor: model.speed === 'Fast' ? 'rgba(34, 197, 94, 0.2)' :
                    model.speed === 'Medium' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  color: model.speed === 'Fast' ? '#4ade80' :
                    model.speed === 'Medium' ? '#facc15' : '#f87171'
                }}>{model.speed}</span>
                {model.note && (
                  <span style={{ fontSize: '0.75rem', color: '#34d399' }}>{model.note}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        borderRadius: '12px',
        padding: '1.25rem'
      }}>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ fontSize: '1.5rem' }}>⚠️</div>
          <div>
            <div style={{ fontWeight: '600', color: '#fbbf24' }}>Critical Warning</div>
            <p style={{ color: 'rgba(253, 230, 138, 0.8)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              You can be marked down if you use AI as a crutch. Companies want to see you catch AI mistakes
              and make informed decisions. If you're fast at coding, just code directly—multiple candidates
              report their best rounds came from minimal AI use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tips section
function TipsSection({ colors }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
      <div style={{
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        borderRadius: '12px',
        padding: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: '1.5rem' }}>✓</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#34d399' }}>Do This</h3>
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {INTERVIEW_DATA.tips.do.map((tip, i) => (
            <li key={i} style={{ color: 'rgba(167, 243, 208, 0.8)', fontSize: '0.875rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span style={{ color: '#10b981', marginTop: '0.125rem' }}>→</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <div style={{
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '12px',
        padding: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: '1.5rem' }}>✗</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#f87171' }}>Avoid This</h3>
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {INTERVIEW_DATA.tips.dont.map((tip, i) => (
            <li key={i} style={{ color: 'rgba(254, 202, 202, 0.8)', fontSize: '0.875rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span style={{ color: '#ef4444', marginTop: '0.125rem' }}>→</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Main Component
export default function AIInterview({ onBack }) {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('mock-interview');

  const tabs = [
    { id: 'mock-interview', label: 'Mock Interview', icon: '🎯' },
    { id: 'ai-chat', label: 'AI Chat', icon: '💬' },
    { id: 'code-analyzer', label: 'Code Analyzer', icon: '🔬' },
    { id: 'question-gen', label: 'Question Gen', icon: '✨' },
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'tips', label: 'Tips', icon: '💡' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.bgPrimary,
      color: colors.textPrimary
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1.5rem'
      }}>
        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            marginBottom: '1.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: colors.bgSecondary,
            color: colors.textSecondary,
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          ← Back to Menu
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.25rem 0.75rem',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '9999px',
            color: '#a78bfa',
            fontSize: '0.875rem',
            marginBottom: '1rem'
          }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: '#a78bfa', borderRadius: '50%', animation: 'pulse 2s infinite' }}></span>
            AI-Powered Features
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            background: 'linear-gradient(90deg, #e2e8f0, #c4b5fd, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem'
          }}>
            AI Interview Prep
          </h1>
          <p style={{ color: colors.textSecondary, maxWidth: '600px', margin: '0 auto' }}>
            Practice with real AI assistance. Get code reviews, generate questions, and simulate the interview experience.
          </p>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} colors={colors} />
        </div>

        {/* Content */}
        <div style={{ minHeight: '500px' }}>
          {activeTab === 'mock-interview' && <MockInterviewTab colors={colors} />}
          {activeTab === 'ai-chat' && <AIInterviewTab colors={colors} />}
          {activeTab === 'code-analyzer' && <CodeAnalyzer colors={colors} />}
          {activeTab === 'question-gen' && <QuestionGenerator colors={colors} />}
          {activeTab === 'overview' && <OverviewSection colors={colors} />}
          {activeTab === 'tips' && <TipsSection colors={colors} />}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: `1px solid ${colors.border}`,
          textAlign: 'center'
        }}>
          <p style={{ color: colors.textMuted, fontSize: '0.875rem' }}>
            AI features require the server to be running with ANTHROPIC_API_KEY configured.
          </p>
        </div>
      </div>
    </div>
  );
}

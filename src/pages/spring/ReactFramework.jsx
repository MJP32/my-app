import { useState } from 'react'

// Simple syntax highlighter for JavaScript/JSX code
const SyntaxHighlighter = ({ code }) => {
  const highlightCode = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    // Protect comments
    highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    // Protect strings and JSX
    highlighted = highlighted.replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    // Apply syntax highlighting
    highlighted = highlighted
      .replace(/\b(import|export|default|from|const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|new|class|extends|async|await|yield|typeof|instanceof)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|null|undefined)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(useState|useEffect|useContext|useReducer|useCallback|useMemo|useRef|React|Component|PureComponent|Fragment|StrictMode|Suspense|lazy)\b/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/\b([a-z_]\w*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')
      .replace(/=&gt;/g, '<span style="color: #c586c0;">=&gt;</span>')

    protectedContent.forEach(({ id, replacement }) => {
      highlighted = highlighted.replace(id, replacement)
    })

    return highlighted
  }

  return (
    <pre style={{
      margin: 0,
      fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
      fontSize: '0.85rem',
      lineHeight: '1.6',
      color: '#d4d4d4',
      whiteSpace: 'pre',
      overflowX: 'auto',
      textAlign: 'left',
      padding: 0
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
    </pre>
  )
}

function ReactFramework({ onBack }) {
  const [selectedTopic, setSelectedTopic] = useState(null)

  const topics = [
    {
      id: 1,
      name: 'React Fundamentals',
      icon: '⚛️',
      color: '#06b6d4',
      description: 'Components, JSX, and virtual DOM',
      content: {
        explanation: 'React is a JavaScript library for building user interfaces, developed by Facebook. It uses a component-based architecture where UIs are built from independent, reusable pieces. React employs JSX syntax (JavaScript XML) for declarative UI definition and uses a virtual DOM for efficient rendering and updates.',
        keyPoints: [
          'Component-based architecture: UI built from reusable components',
          'JSX: JavaScript syntax extension for writing HTML-like code',
          'Virtual DOM: Efficient updates by diffing and patching',
          'One-way data flow: Props flow down, events bubble up',
          'Declarative: Describe what UI should look like, React handles how',
          'Functional components: Modern approach using hooks',
          'Class components: Legacy approach with lifecycle methods',
          'Composition over inheritance: Build complex UIs from simple components'
        ],
        codeExample: `// Functional Component with JSX
import React from 'react'

function Welcome({ name, age }) {
  return (
    &lt;div className="welcome"&gt;
      &lt;h1&gt;Hello, {name}!&lt;/h1&gt;
      &lt;p&gt;You are {age} years old.&lt;/p&gt;
    &lt;/div&gt;
  )
}

// Using the component
function App() {
  return (
    &lt;div&gt;
      &lt;Welcome name="John" age={25} /&gt;
      &lt;Welcome name="Jane" age={30} /&gt;
    &lt;/div&gt;
  )
}

// JSX compiles to React.createElement
// &lt;Welcome name="John" /&gt; becomes:
React.createElement(Welcome, { name: "John" })

// Component Composition
function UserCard({ user }) {
  return (
    &lt;div className="user-card"&gt;
      &lt;Avatar url={user.avatarUrl} /&gt;
      &lt;UserInfo name={user.name} email={user.email} /&gt;
      &lt;UserActions userId={user.id} /&gt;
    &lt;/div&gt;
  )
}

// Conditional Rendering
function Greeting({ isLoggedIn }) {
  return (
    &lt;div&gt;
      {isLoggedIn ? (
        &lt;h1&gt;Welcome back!&lt;/h1&gt;
      ) : (
        &lt;h1&gt;Please sign in.&lt;/h1&gt;
      )}
    &lt;/div&gt;
  )
}

// List Rendering
function TodoList({ todos }) {
  return (
    &lt;ul&gt;
      {todos.map(todo =&gt; (
        &lt;li key={todo.id}&gt;{todo.text}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  )
}`
      }
    },
    {
      id: 2,
      name: 'React Hooks',
      icon: '🎣',
      color: '#8b5cf6',
      description: 'useState, useEffect, and custom hooks',
      content: {
        explanation: 'Hooks are functions that let you use state and other React features in functional components. They were introduced in React 16.8 as a way to write components without classes. Hooks follow naming convention (useXxx) and have rules: only call at top level, only call from React functions.',
        keyPoints: [
          'useState: Add state to functional components',
          'useEffect: Perform side effects (data fetching, subscriptions)',
          'useContext: Access context values without nesting',
          'useReducer: Complex state logic similar to Redux',
          'useCallback: Memoize functions to prevent re-creation',
          'useMemo: Memoize expensive computations',
          'useRef: Access DOM elements and persist values',
          'Custom hooks: Extract reusable stateful logic'
        ],
        codeExample: `import { useState, useEffect, useCallback, useMemo, useRef } from 'react'

// useState - State management
function Counter() {
  const [count, setCount] = useState(0)

  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;Increment&lt;/button&gt;
      &lt;button onClick={() =&gt; setCount(prev =&gt; prev - 1)}&gt;Decrement&lt;/button&gt;
    &lt;/div&gt;
  )
}

// useEffect - Side effects
function DataFetcher({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() =&gt; {
    // Runs after render
    fetch(\`/api/users/\${userId}\`)
      .then(res =&gt; res.json())
      .then(data =&gt; {
        setUser(data)
        setLoading(false)
      })

    // Cleanup function
    return () =&gt; {
      // Cancel subscriptions, clear timers
    }
  }, [userId])  // Dependencies: re-run when userId changes

  if (loading) return &lt;div&gt;Loading...&lt;/div&gt;
  return &lt;div&gt;{user.name}&lt;/div&gt;
}

// useCallback - Memoize functions
function TodoList({ todos }) {
  const [filter, setFilter] = useState('all')

  // Memoized to prevent Child re-renders
  const handleToggle = useCallback((id) =&gt; {
    toggleTodo(id)
  }, [])  // Empty deps: function never changes

  return (
    &lt;div&gt;
      {todos.map(todo =&gt; (
        &lt;TodoItem key={todo.id} todo={todo} onToggle={handleToggle} /&gt;
      ))}
    &lt;/div&gt;
  )
}

// useMemo - Memoize expensive computations
function ExpensiveComponent({ items, filter }) {
  const filteredItems = useMemo(() =&gt; {
    console.log('Filtering...')
    return items.filter(item =&gt; item.category === filter)
  }, [items, filter])  // Only recompute when items or filter change

  return &lt;ul&gt;{filteredItems.map(item =&gt; &lt;li&gt;{item.name}&lt;/li&gt;)}&lt;/ul&gt;
}

// useRef - DOM access and persistent values
function TextInput() {
  const inputRef = useRef(null)

  const focusInput = () =&gt; {
    inputRef.current.focus()
  }

  return (
    &lt;div&gt;
      &lt;input ref={inputRef} type="text" /&gt;
      &lt;button onClick={focusInput}&gt;Focus Input&lt;/button&gt;
    &lt;/div&gt;
  )
}

// Custom Hook - Reusable logic
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() =&gt; {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : initialValue
  })

  useEffect(() =&gt; {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  return &lt;button onClick={() =&gt; setTheme(theme === 'light' ? 'dark' : 'light')}&gt;
    Toggle Theme
  &lt;/button&gt;
}`
      }
    },
    {
      id: 3,
      name: 'State Management',
      icon: '📦',
      color: '#10b981',
      description: 'Context API, useReducer, and Redux',
      content: {
        explanation: 'State management in React involves organizing and sharing data across components. For local state, use useState. For complex state logic, use useReducer. For sharing state across many components, use Context API or external libraries like Redux or Zustand. Each approach has trade-offs in complexity, performance, and dev experience.',
        keyPoints: [
          'Local state: useState for component-specific data',
          'Shared state: Lift state up to common ancestor',
          'Context API: Share global state without prop drilling',
          'useReducer: Complex state with actions (like Redux)',
          'Redux: Predictable state container with middleware',
          'Redux Toolkit: Modern Redux with less boilerplate',
          'Zustand/Jotai: Lightweight alternative state libraries',
          'React Query: Server state management and caching'
        ],
        codeExample: `import { createContext, useContext, useReducer } from 'react'

// Context API for global state
const ThemeContext = createContext()

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  return (
    &lt;ThemeContext.Provider value={{ theme, setTheme }}&gt;
      {children}
    &lt;/ThemeContext.Provider&gt;
  )
}

function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext)
  return &lt;button style={{ background: theme === 'dark' ? '#333' : '#fff' }}&gt;
    Toggle
  &lt;/button&gt;
}

// useReducer for complex state logic
const initialState = { count: 0, step: 1 }

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + state.step }
    case 'DECREMENT':
      return { ...state, count: state.count - state.step }
    case 'SET_STEP':
      return { ...state, step: action.payload }
    case 'RESET':
      return initialState
    default:
      throw new Error(\`Unknown action: \${action.type}\`)
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    &lt;div&gt;
      &lt;p&gt;Count: {state.count}&lt;/p&gt;
      &lt;button onClick={() =&gt; dispatch({ type: 'INCREMENT' })}&gt;+&lt;/button&gt;
      &lt;button onClick={() =&gt; dispatch({ type: 'DECREMENT' })}&gt;-&lt;/button&gt;
      &lt;input
        type="number"
        value={state.step}
        onChange={(e) =&gt; dispatch({ type: 'SET_STEP', payload: +e.target.value })}
      /&gt;
    &lt;/div&gt;
  )
}

// Redux-style pattern
import { configureStore, createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state =&gt; { state.value += 1 },
    decrement: state =&gt; { state.value -= 1 },
    incrementByAmount: (state, action) =&gt; {
      state.value += action.payload
    }
  }
})

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
})

// Usage with hooks
import { useSelector, useDispatch } from 'react-redux'

function ReduxCounter() {
  const count = useSelector(state =&gt; state.counter.value)
  const dispatch = useDispatch()

  return (
    &lt;div&gt;
      &lt;p&gt;{count}&lt;/p&gt;
      &lt;button onClick={() =&gt; dispatch(increment())}&gt;+&lt;/button&gt;
      &lt;button onClick={() =&gt; dispatch(decrement())}&gt;-&lt;/button&gt;
    &lt;/div&gt;
  )
}`
      }
    },
    {
      id: 4,
      name: 'Performance Optimization',
      icon: '⚡',
      color: '#ef4444',
      description: 'React.memo, code splitting, and lazy loading',
      content: {
        explanation: 'React applications can be optimized using various techniques. React.memo prevents unnecessary re-renders of components. useMemo and useCallback memoize values and functions. Code splitting with React.lazy loads components on demand. Virtualization renders only visible items in long lists. Proper key usage in lists prevents reconciliation issues.',
        keyPoints: [
          'React.memo: Memoize component to prevent re-renders',
          'useMemo: Memoize expensive computations',
          'useCallback: Memoize functions for stable references',
          'React.lazy: Dynamic import for code splitting',
          'Suspense: Handle loading states for lazy components',
          'Virtualization: Render only visible list items (react-window)',
          'Keys: Stable unique keys for list reconciliation',
          'Profiler API: Measure component render performance'
        ],
        codeExample: `import React, { memo, useMemo, useCallback, lazy, Suspense } from 'react'

// React.memo - Prevent unnecessary re-renders
const ExpensiveComponent = memo(({ data }) =&gt; {
  console.log('Rendering ExpensiveComponent')
  return &lt;div&gt;{data.value}&lt;/div&gt;
})

// Custom comparison function
const UserCard = memo(({ user }) =&gt; {
  return &lt;div&gt;{user.name}&lt;/div&gt;
}, (prevProps, nextProps) =&gt; {
  // Return true if props are equal (skip re-render)
  return prevProps.user.id === nextProps.user.id
})

// Code Splitting with React.lazy
const HeavyComponent = lazy(() =&gt; import('./HeavyComponent'))

function App() {
  return (
    &lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
      &lt;HeavyComponent /&gt;
    &lt;/Suspense&gt;
  )
}

// Route-based code splitting
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Home = lazy(() =&gt; import('./pages/Home'))
const Dashboard = lazy(() =&gt; import('./pages/Dashboard'))

function AppRouter() {
  return (
    &lt;BrowserRouter&gt;
      &lt;Suspense fallback={&lt;Spinner /&gt;}&gt;
        &lt;Routes&gt;
          &lt;Route path="/" element={&lt;Home /&gt;} /&gt;
          &lt;Route path="/dashboard" element={&lt;Dashboard /&gt;} /&gt;
        &lt;/Routes&gt;
      &lt;/Suspense&gt;
    &lt;/BrowserRouter&gt;
  )
}

// Virtualization with react-window
import { FixedSizeList } from 'react-window'

function VirtualList({ items }) {
  const Row = ({ index, style }) =&gt; (
    &lt;div style={style}&gt;{items[index].name}&lt;/div&gt;
  )

  return (
    &lt;FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    &gt;
      {Row}
    &lt;/FixedSizeList&gt;
  )
}

// Profiler API
import { Profiler } from 'react'

function onRenderCallback(
  id, // Component id
  phase, // "mount" or "update"
  actualDuration, // Time spent rendering
  baseDuration, // Estimated time without memoization
  startTime,
  commitTime
) {
  console.log(\`\${id} took \${actualDuration}ms to render\`)
}

function App() {
  return (
    &lt;Profiler id="App" onRender={onRenderCallback}&gt;
      &lt;MyComponent /&gt;
    &lt;/Profiler&gt;
  )
}

// Debouncing input
function SearchInput() {
  const [query, setQuery] = useState('')

  const debouncedSearch = useMemo(
    () =&gt; debounce((value) =&gt; {
      // API call
      fetch(\`/api/search?q=\${value}\`)
    }, 300),
    []
  )

  const handleChange = (e) =&gt; {
    setQuery(e.target.value)
    debouncedSearch(e.target.value)
  }

  return &lt;input value={query} onChange={handleChange} /&gt;
}`
      }
    }
  ]

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#cffafe', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
        >
          ← Back to Frameworks
        </button>

        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: '1rem 0 0.5rem 0'
        }}>
          ⚛️ React
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#6b7280', margin: 0 }}>
          JavaScript library for building user interfaces
        </p>
      </div>

      {!selectedTopic ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                border: `3px solid ${topic.color}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = `0 0 0 4px ${topic.color}40, 0 12px 24px rgba(0,0,0,0.2)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{topic.icon}</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                {topic.name}
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: '1.6' }}>
                {topic.description}
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedTopic(null)}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              backgroundColor: selectedTopic.color,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '1.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            ← Back to Topics
          </button>

          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            border: `3px solid ${selectedTopic.color}`,
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '3rem' }}>{selectedTopic.icon}</div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1f2937', margin: 0 }}>
                {selectedTopic.name}
              </h2>
            </div>

            <div style={{ fontSize: '1.05rem', color: '#4b5563', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              {selectedTopic.content.explanation}
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
              Key Points:
            </h3>
            <ul style={{ color: '#4b5563', lineHeight: '1.8', marginBottom: '2rem' }}>
              {selectedTopic.content.keyPoints.map((point, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>{point}</li>
              ))}
            </ul>

            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
              Code Example:
            </h3>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.5rem',
              borderRadius: '8px',
              overflow: 'auto'
            }}>
              <SyntaxHighlighter code={selectedTopic.content.codeExample} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReactFramework

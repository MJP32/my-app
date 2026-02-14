import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

const FRAMEWORK_COLORS = {
  primary: '#4ade80',
  primaryHover: '#86efac',
  bg: 'rgba(34, 197, 94, 0.1)',
  border: 'rgba(34, 197, 94, 0.3)',
  arrow: '#22c55e',
  hoverBg: 'rgba(34, 197, 94, 0.2)',
  topicBg: 'rgba(34, 197, 94, 0.2)'
}

// Background colors for subtopic descriptions
const SUBTOPIC_COLORS = [
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// Simple syntax highlighter for JavaScript/JSX code
const SyntaxHighlighter = ({ code }) => {
  const highlightCode = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '<')
      .replace(/>/g, '>')

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
      .replace(/=&gt;/g, '<span style="color: #c586c0;">=></span>')

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

function ReactFramework({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'react-fundamentals',
      name: 'React Fundamentals',
      icon: '⚛️',
      color: '#06b6d4',
      description: 'Components, JSX, and virtual DOM',
      details: [
        {
          name: 'Overview',
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
          ]
        },
        {
          name: 'Code Example',
          codeExample: `// Functional Component with JSX
import React from 'react'

function Welcome({ name, age }) {
  return (
    <div className="welcome">
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  )
}

// Using the component
function App() {
  return (
    <div>
      <Welcome name="John" age={25} />
      <Welcome name="Jane" age={30} />
    </div>
  )
}

// JSX compiles to React.createElement
// <Welcome name="John" /> becomes:
React.createElement(Welcome, { name: "John" })

// Component Composition
function UserCard({ user }) {
  return (
    <div className="user-card">
      <Avatar url={user.avatarUrl} />
      <UserInfo name={user.name} email={user.email} />
      <UserActions userId={user.id} />
    </div>
  )
}

// Conditional Rendering
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <h1>Please sign in.</h1>
      )}
    </div>
  )
}

// List Rendering
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  )
}`
        }
      ]
    },
    {
      id: 'react-hooks',
      name: 'React Hooks',
      icon: '🎣',
      color: '#8b5cf6',
      description: 'useState, useEffect, and custom hooks',
      details: [
        {
          name: 'Overview',
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
          ]
        },
        {
          name: 'Code Example',
          codeExample: `import { useState, useEffect, useCallback, useMemo, useRef } from 'react'

// useState - State management
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(prev => prev - 1)}>Decrement</button>
    </div>
  )
}

// useEffect - Side effects
function DataFetcher({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Runs after render
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setLoading(false)
      })

    // Cleanup function
    return () => {
      // Cancel subscriptions, clear timers
    }
  }, [userId])  // Dependencies: re-run when userId changes

  if (loading) return <div>Loading...</div>
  return <div>{user.name}</div>
}

// useCallback - Memoize functions
function TodoList({ todos }) {
  const [filter, setFilter] = useState('all')

  // Memoized to prevent Child re-renders
  const handleToggle = useCallback((id) => {
    toggleTodo(id)
  }, [])  // Empty deps: function never changes

  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
      ))}
    </div>
  )
}

// useMemo - Memoize expensive computations
function ExpensiveComponent({ items, filter }) {
  const filteredItems = useMemo(() => {
    console.log('Filtering...')
    return items.filter(item => item.category === filter)
  }, [items, filter])  // Only recompute when items or filter change

  return <ul>{filteredItems.map(item => <li>{item.name}</li>)}</ul>
}

// useRef - DOM access and persistent values
function TextInput() {
  const inputRef = useRef(null)

  const focusInput = () => {
    inputRef.current.focus()
  }

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  )
}

// Custom Hook - Reusable logic
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
    Toggle Theme
  </button>
}`
        }
      ]
    },
    {
      id: 'state-management',
      name: 'State Management',
      icon: '📦',
      color: '#10b981',
      description: 'Context API, useReducer, and Redux',
      details: [
        {
          name: 'Overview',
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
          ]
        },
        {
          name: 'Code Example',
          codeExample: `import { createContext, useContext, useReducer } from 'react'

// Context API for global state
const ThemeContext = createContext()

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext)
  return <button style={{ background: theme === 'dark' ? '#333' : '#fff' }}>
    Toggle
  </button>
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
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <input
        type="number"
        value={state.step}
        onChange={(e) => dispatch({ type: 'SET_STEP', payload: +e.target.value })}
      />
    </div>
  )
}

// Redux-style pattern
import { configureStore, createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1 },
    decrement: state => { state.value -= 1 },
    incrementByAmount: (state, action) => {
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
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
}`
        }
      ]
    },
    {
      id: 'performance-optimization',
      name: 'Performance Optimization',
      icon: '⚡',
      color: '#ef4444',
      description: 'React.memo, code splitting, and lazy loading',
      details: [
        {
          name: 'Overview',
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
          ]
        },
        {
          name: 'Code Example',
          codeExample: `import React, { memo, useMemo, useCallback, lazy, Suspense } from 'react'

// React.memo - Prevent unnecessary re-renders
const ExpensiveComponent = memo(({ data }) => {
  console.log('Rendering ExpensiveComponent')
  return <div>{data.value}</div>
})

// Custom comparison function
const UserCard = memo(({ user }) => {
  return <div>{user.name}</div>
}, (prevProps, nextProps) => {
  // Return true if props are equal (skip re-render)
  return prevProps.user.id === nextProps.user.id
})

// Code Splitting with React.lazy
const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}

// Route-based code splitting
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

// Virtualization with react-window
import { FixedSizeList } from 'react-window'

function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>{items[index].name}</div>
  )

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
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
    <Profiler id="App" onRender={onRenderCallback}>
      <MyComponent />
    </Profiler>
  )
}

// Debouncing input
function SearchInput() {
  const [query, setQuery] = useState('')

  const debouncedSearch = useMemo(
    () => debounce((value) => {
      // API call
      fetch(\`/api/search?q=\${value}\`)
    }, 300),
    []
  )

  const handleChange = (e) => {
    setQuery(e.target.value)
    debouncedSearch(e.target.value)
  }

  return <input value={query} onChange={handleChange} />
}`
        }
      ]
    }
  ]

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (selectedConceptIndex !== null) {
          setSelectedConceptIndex(null)
          setSelectedDetailIndex(0)
        } else {
          onBack()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

  const handlePreviousConcept = () => {
    if (selectedConceptIndex > 0) {
      setSelectedConceptIndex(selectedConceptIndex - 1)
      setSelectedDetailIndex(0)
    }
  }

  const handleNextConcept = () => {
    if (selectedConceptIndex < concepts.length - 1) {
      setSelectedConceptIndex(selectedConceptIndex + 1)
      setSelectedDetailIndex(0)
    }
  }

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'Frameworks', icon: '🧩', onClick: onBack }
    ]

    if (selectedConcept) {
      stack.push({ name: 'React', icon: '⚛️', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'React', icon: '⚛️' })
    }

    return stack
  }

  const handleBreadcrumbClick = (index) => {
    const stack = buildBreadcrumbStack()
    if (stack[index].onClick) {
      stack[index].onClick()
    }
  }

  const containerStyle = {
    minHeight: '100vh',
    background: 'var(--bg-primary)',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }

  const headerStyle = {
    maxWidth: '1400px',
    margin: '0 auto 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  }

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #86efac, #4ade80)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(34, 197, 94, 0.2)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    borderRadius: '0.5rem',
    color: '#4ade80',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  const navButtonStyle = {
    padding: '0.75rem 1.25rem',
    background: 'rgba(16, 185, 129, 0.2)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '0.5rem',
    color: '#4ade80',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            style={backButtonStyle}
            onClick={onBack}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(34, 197, 94, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            ← Back to Frameworks
          </button>
          <h1 style={titleStyle}>React</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {onPrevious && (
            <button
              style={navButtonStyle}
              onClick={onPrevious}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              ← {previousName}
            </button>
          )}
          {onNext && (
            <button
              style={navButtonStyle}
              onClick={onNext}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={FRAMEWORK_COLORS}
        />
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {concepts.map((concept, index) => (
          <div
            key={concept.id}
            onClick={() => setSelectedConceptIndex(index)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: `1px solid ${concept.color}40`,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = `0 20px 40px ${concept.color}20`
              e.currentTarget.style.borderColor = concept.color
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.borderColor = `${concept.color}40`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{concept.icon}</span>
              <h3 style={{ color: concept.color, margin: 0, fontSize: '1.25rem' }}>{concept.name}</h3>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>{concept.description}</p>
            <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
              {concept.details.length} topics • Click to explore
            </div>
          </div>
        ))}
      </div>

      {/* Collapsible Sidebar for quick concept navigation */}
      <CollapsibleSidebar
        items={concepts}
        selectedIndex={selectedConceptIndex ?? -1}
        onSelect={(index) => {
          setSelectedConceptIndex(index)
          setSelectedDetailIndex(0)
        }}
        title="Concepts"
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.icon}
        primaryColor={FRAMEWORK_COLORS.primary}
      />


      {/* Concept Detail Modal */}
      {selectedConcept && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => setSelectedConceptIndex(null)}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              borderRadius: '1rem',
              padding: '2rem',
              width: '95vw', maxWidth: '1400px', height: '90vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu || onBack}
              colors={FRAMEWORK_COLORS}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #334155' }}>
              <h2 style={{ color: selectedConcept.color, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
                <span>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button onClick={handlePreviousConcept} disabled={selectedConceptIndex === 0} style={{ padding: '0.4rem 0.75rem', background: 'rgba(100, 116, 139, 0.2)', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '0.375rem', color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8', cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer', fontSize: '0.8rem' }}>←</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>{selectedConceptIndex + 1}/{concepts.length}</span>
                <button onClick={handleNextConcept} disabled={selectedConceptIndex === concepts.length - 1} style={{ padding: '0.4rem 0.75rem', background: 'rgba(100, 116, 139, 0.2)', border: '1px solid rgba(100, 116, 139, 0.3)', borderRadius: '0.375rem', color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8', cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer', fontSize: '0.8rem' }}>→</button>
                <button onClick={() => setSelectedConceptIndex(null)} style={{ padding: '0.4rem 0.75rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.375rem', color: '#f87171', cursor: 'pointer', fontSize: '0.8rem', marginLeft: '0.5rem' }}>✕</button>
              </div>
            </div>

            {/* Subtopic Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button key={i} onClick={() => setSelectedDetailIndex(i)} style={{ padding: '0.5rem 1rem', background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)', border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`, borderRadius: '0.5rem', color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8', cursor: 'pointer', fontSize: '0.85rem', fontWeight: selectedDetailIndex === i ? '600' : '400', transition: 'all 0.2s' }}>{detail.name}</button>
              ))}
            </div>

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              return (
                <div>
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{detail.name}</h3>

                  {detail.explanation && (
                    <p style={{ color: '#e2e8f0', lineHeight: '1.8', marginBottom: '1rem', background: colorScheme.bg, border: `1px solid ${colorScheme.border}`, borderRadius: '0.5rem', padding: '1rem', textAlign: 'left' }}>{detail.explanation}</p>
                  )}

                  {detail.keyPoints && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ color: '#cbd5e1', marginBottom: '0.75rem', fontSize: '1rem' }}>Key Points:</h4>
                      <ul style={{ color: '#e2e8f0', lineHeight: '1.8', margin: 0, paddingLeft: '1.5rem', background: colorScheme.bg, border: `1px solid ${colorScheme.border}`, borderRadius: '0.5rem', padding: '1rem 1rem 1rem 2.5rem' }}>
                        {detail.keyPoints.map((point, idx) => (
                          <li key={idx} style={{ marginBottom: '0.5rem' }}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {detail.codeExample && (
                    <div>
                      <h4 style={{ color: '#cbd5e1', marginBottom: '0.75rem', fontSize: '1rem' }}>Code Example:</h4>
                      <div style={{
                        backgroundColor: '#064e3b',
                        border: `2px solid ${selectedConcept.color}`,
                        padding: '1.5rem',
                        borderRadius: '8px',
                        overflow: 'auto'
                      }}>
                        <SyntaxHighlighter code={detail.codeExample} />
                      </div>
                    </div>
                  )}
                </div>
              )
            })()}

          </div>
        </div>
      )}
    </div>
  )
}

export default ReactFramework

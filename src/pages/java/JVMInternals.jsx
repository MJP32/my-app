import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from "../../components/LanguageToggle.jsx"
import Breadcrumb from '../../components/Breadcrumb'
import { getUserCode, saveUserCode, isProblemCompleted } from '../../services/progressService'

function JVMInternals({ onBack, breadcrumb }) {
  const exercises = [
    {
      title: "String Pool and Interning",
      description: "Understand the difference between string literals (which go to the pool) and new String() (which creates heap objects). Use intern() to add strings to the pool.",
      starterCode: `public class StringPoolDemo {
    public static void main(String[] args) {
        String s1 = "hello";
        String s2 = "hello";
        String s3 = new String("hello");

        // TODO: Print s1 == s2 (should be true - same reference in pool)

        // TODO: Print s1 == s3 (should be false - different references)

        // TODO: Use intern() on s3 and compare with s1
        String s4 = s3.intern();
        System.out.println("s1 == s4: " + (s1 == s4));
    }
}`,
      solution: `public class StringPoolDemo {
    public static void main(String[] args) {
        String s1 = "hello";
        String s2 = "hello";
        String s3 = new String("hello");

        System.out.println("s1 == s2: " + (s1 == s2));  // true - both from pool
        System.out.println("s1 == s3: " + (s1 == s3));  // false - s3 from heap

        String s4 = s3.intern();
        System.out.println("s1 == s4: " + (s1 == s4));  // true - intern returns pool reference
    }
}`,
      expectedOutput: "s1 == s2: true\ns1 == s3: false\ns1 == s4: true"
    },
    {
      title: "ClassLoader Hierarchy",
      description: "Explore the ClassLoader hierarchy and understand parent delegation. Print the classloader for different classes.",
      starterCode: `public class ClassLoaderDemo {
    public static void main(String[] args) {
        // TODO: Get and print this class's ClassLoader

        // TODO: Print parent ClassLoader hierarchy

        // TODO: Print String's ClassLoader (Bootstrap - shows as null)
        System.out.println("String ClassLoader: " + String.class.getClassLoader());
    }
}`,
      solution: `public class ClassLoaderDemo {
    public static void main(String[] args) {
        ClassLoader appLoader = ClassLoaderDemo.class.getClassLoader();
        System.out.println("Application ClassLoader: " + appLoader);

        ClassLoader parent = appLoader.getParent();
        System.out.println("Platform ClassLoader: " + parent);

        ClassLoader grandParent = parent.getParent();
        System.out.println("Bootstrap ClassLoader: " + grandParent);

        System.out.println("String ClassLoader: " + String.class.getClassLoader());
    }
}`,
      expectedOutput: "Application ClassLoader: jdk.internal.loader.ClassLoaders$AppClassLoader@"
    },
    {
      title: "Understanding Bytecode Basics",
      description: "Write a simple method and understand it compiles to bytecode instructions like iload, iadd, and ireturn.",
      starterCode: `public class BytecodeDemo {
    // TODO: Implement add method that adds two integers
    public static int add(int a, int b) {
        return 0;
    }

    public static void main(String[] args) {
        int result = add(5, 3);
        System.out.println("5 + 3 = " + result);
    }
}

// The bytecode for add() will be:
// iload_0 (load parameter a)
// iload_1 (load parameter b)
// iadd (add them)
// ireturn (return result)`,
      solution: `public class BytecodeDemo {
    public static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        int result = add(5, 3);
        System.out.println("5 + 3 = " + result);
    }
}

// The bytecode for add() will be:
// iload_0 (load parameter a)
// iload_1 (load parameter b)
// iadd (add them)
// ireturn (return result)`,
      expectedOutput: "5 + 3 = 8"
    },
    {
      title: "JIT Compilation Warmup",
      description: "Demonstrate JIT compilation by calling a method many times. The JVM will compile hot methods to native code for better performance.",
      starterCode: `public class JITDemo {
    public static long fibonacci(int n) {
        if (n <= 1) return n;
        long prev = 0, curr = 1;
        for (int i = 2; i <= n; i++) {
            long next = prev + curr;
            prev = curr;
            curr = next;
        }
        return curr;
    }

    public static void main(String[] args) {
        // TODO: Warm up JIT by calling fibonacci many times
        for (int i = 0; i < 50000; i++) {
            fibonacci(20);
        }

        System.out.println("Warmed up JIT compiler");
        System.out.println("fib(30) = " + fibonacci(30));
    }
}`,
      solution: `public class JITDemo {
    public static long fibonacci(int n) {
        if (n <= 1) return n;
        long prev = 0, curr = 1;
        for (int i = 2; i <= n; i++) {
            long next = prev + curr;
            prev = curr;
            curr = next;
        }
        return curr;
    }

    public static void main(String[] args) {
        for (int i = 0; i < 50000; i++) {
            fibonacci(20);
        }

        System.out.println("Warmed up JIT compiler");
        System.out.println("fib(30) = " + fibonacci(30));
    }
}`,
      expectedOutput: "Warmed up JIT compiler\nfib(30) = 832040"
    }
  ]

  const [selectedExercise, setSelectedExercise] = useState(0)
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [showSolution, setShowSolution] = useState(false)
  const [language, setLanguage] = useState(getPreferredLanguage())
  const [isChecking, setIsChecking] = useState(false)

  // Load saved code for the selected exercise
  useEffect(() => {
    const exerciseId = `JVM Internals-${selectedExercise + 1}`
    const savedCode = getUserCode(exerciseId)
    setCode(savedCode || exercises[selectedExercise].starterCode)
    setShowSolution(false)
    setOutput('')
  }, [selectedExercise])

  // Auto-save code changes
  useEffect(() => {
    if (code && code !== exercises[selectedExercise].starterCode) {
      const exerciseId = `JVM Internals-${selectedExercise + 1}`
      const timeoutId = setTimeout(() => {
        saveUserCode(exerciseId, code)
      }, 1000)
      return () => clearTimeout(timeoutId)
    }
  }, [code, selectedExercise])

  const checkCode = async () => {
    setIsChecking(true)
    setOutput('Compiling and running...\n')

    try {
      const response = await fetch('http://localhost:3001/api/execute-java', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      })

      const data = await response.json()

      if (data.success) {
        const actualOutput = data.output.trim()
        const expectedOutput = exercises[selectedExercise].expectedOutput.trim()

        // For ClassLoader exercise, just check if it contains expected text
        if (selectedExercise === 1 && actualOutput.includes("Application ClassLoader")) {
          setOutput(`✅ Success! Output contains expected ClassLoader information.\n\nActual:\n${actualOutput}`)
        } else if (actualOutput === expectedOutput || actualOutput.startsWith(expectedOutput)) {
          setOutput(`✅ Success! Output matches expected result.\n\nExpected:\n${expectedOutput}\n\nActual:\n${actualOutput}`)
        } else {
          setOutput(`❌ Output doesn't match.\n\nExpected:\n${expectedOutput}\n\nActual:\n${actualOutput}`)
        }
      } else {
        setOutput(`❌ Error:\n${data.error}`)
      }
    } catch (error) {
      setOutput(`❌ Failed to connect to server. Make sure the Java execution server is running.\n\nError: ${error.message}`)
    }

    setIsChecking(false)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: '#7c3aed',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6d28d9'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
        >
          ← Back to Menu
        </button>
        <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '800', color: '#1f2937' }}>
          JVM Internals Practice
        </h1>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      {/* Exercise Selector */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {exercises.map((ex, idx) => {
          const exerciseId = `JVM Internals-${idx + 1}`
          const isCompleted = isProblemCompleted(exerciseId)

          return (
            <button
              key={idx}
              onClick={() => setSelectedExercise(idx)}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '0.95rem',
                fontWeight: '600',
                backgroundColor: selectedExercise === idx ? '#7c3aed' : '#1f2937',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: selectedExercise === idx ? '0 4px 12px rgba(124, 58, 237, 0.4)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (selectedExercise !== idx) {
                  e.currentTarget.style.backgroundColor = '#374151'
                }
              }}
              onMouseLeave={(e) => {
                if (selectedExercise !== idx) {
                  e.currentTarget.style.backgroundColor = '#1f2937'
                }
              }}
            >
              Exercise {idx + 1}{isCompleted && ' ✓'}
            </button>
          )
        })}
      </div>

      {/* Problem Description */}
      <div style={{
        backgroundColor: '#faf5ff',
        padding: '1.5rem',
        borderRadius: '12px',
        borderLeft: '4px solid #7c3aed',
        marginBottom: '1.5rem'
      }}>
        <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem', fontWeight: '700', color: '#5b21b6' }}>
          {exercises[selectedExercise].title}
        </h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#5b21b6', marginBottom: '1rem' }}>
          {exercises[selectedExercise].description}
        </p>
        <div style={{
          backgroundColor: '#ede9fe',
          padding: '1rem',
          borderRadius: '8px',
          marginTop: '1rem'
        }}>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem', fontWeight: '600', color: '#5b21b6' }}>
            Expected Output:
          </p>
          <pre style={{
            margin: 0,
            fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
            fontSize: '0.9rem',
            lineHeight: '1.6',
            color: '#5b21b6',
            whiteSpace: 'pre-wrap'
          }}>
            {exercises[selectedExercise].expectedOutput}
          </pre>
        </div>
      </div>

      {/* Code Editor */}
      <div style={{
        backgroundColor: '#1e293b',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '1rem'
      }}>
        <div style={{
          backgroundColor: '#0f172a',
          padding: '0.75rem 1rem',
          borderBottom: '1px solid #334155',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: '600' }}>Solution.java</span>
          <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Java</span>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              e.preventDefault()
              const start = e.target.selectionStart
              const end = e.target.selectionEnd
              const newValue = code.substring(0, start) + '    ' + code.substring(end)
              setCode(newValue)
              setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = start + 4
              }, 0)
            }
          }}
          spellCheck="false"
          style={{
            width: '100%',
            minHeight: '600px',
            padding: '1rem',
            fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
            fontSize: '0.9rem',
            lineHeight: '1.6',
            color: '#e2e8f0',
            backgroundColor: '#1e293b',
            border: 'none',
            outline: 'none',
            resize: 'vertical'
          }}
        />
      </div>

      {/* Run Code Button */}
      <button
        onClick={checkCode}
        disabled={isChecking}
        style={{
          width: '100%',
          padding: '0.875rem',
          fontSize: '1rem',
          fontWeight: '700',
          backgroundColor: isChecking ? '#6b7280' : '#7c3aed',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: isChecking ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s',
          marginBottom: '0.75rem'
        }}
        onMouseEnter={(e) => {
          if (!isChecking) e.currentTarget.style.backgroundColor = '#6d28d9'
        }}
        onMouseLeave={(e) => {
          if (!isChecking) e.currentTarget.style.backgroundColor = '#1d4ed8'
        }}
      >
        {isChecking ? '⏳ Running...' : '▶️ Run Code'}
      </button>

      {/* Show Solution + Completion Checkbox Row */}
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setShowSolution(!showSolution)}
          style={{
            flex: 1,
            padding: '0.75rem',
            fontSize: '0.95rem',
            fontWeight: '600',
            backgroundColor: showSolution ? '#10b981' : '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = showSolution ? '#059669' : '#4b5563'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = showSolution ? '#10b981' : '#6b7280'
          }}
        >
          {showSolution ? '✓ Solution Shown' : '👁️ Show Solution'}
        </button>
        <div style={{ marginLeft: 'auto' }}>
          <CompletionCheckbox
            problemId={`JVM Internals-${selectedExercise + 1}`}
            label="Mark as Completed"
          />
        </div>
      </div>

      {/* Output Display */}
      {output && (
        <div style={{
          backgroundColor: '#0f172a',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: '700', color: '#60a5fa' }}>
            Output:
          </h3>
          <pre style={{
            margin: 0,
            fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
            fontSize: '0.85rem',
            lineHeight: '1.6',
            color: '#e2e8f0',
            whiteSpace: 'pre-wrap'
          }}>
            {output}
          </pre>
        </div>
      )}

      {/* Solution Display */}
      {showSolution && (
        <div style={{
          backgroundColor: '#1e293b',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '2px solid #10b981'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: '700', color: '#10b981' }}>
            💡 Solution:
          </h3>
          <pre style={{
            margin: 0,
            fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
            fontSize: '0.85rem',
            lineHeight: '1.6',
            color: '#e2e8f0',
            whiteSpace: 'pre',
            overflowX: 'auto'
          }}>
            {exercises[selectedExercise].solution}
          </pre>
        </div>
      )}
    </div>
  )
}

export default JVMInternals

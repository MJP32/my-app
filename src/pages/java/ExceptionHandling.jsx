/**
 * Exception Handling - Java Exception Handling Concepts
 *
 * Covers custom exceptions, try-with-resources, multi-catch,
 * exception chaining, and retry patterns.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import { isProblemCompleted } from '../../services/progressService'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const EXCEPTION_COLORS = {
  primary: '#ef4444',
  primaryHover: '#f87171',
  bg: 'rgba(239, 68, 68, 0.1)',
  border: 'rgba(239, 68, 68, 0.3)',
  arrow: '#dc2626',
  hoverBg: 'rgba(239, 68, 68, 0.2)',
  topicBg: 'rgba(239, 68, 68, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const ExceptionHierarchyDiagram = () => (
  <svg viewBox="0 0 800 320" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Java Exception Hierarchy
    </text>

    {/* Throwable at top */}
    <rect x="325" y="45" width="150" height="40" rx="8" fill="#7c3aed" stroke="#a78bfa" strokeWidth="2"/>
    <text x="400" y="70" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Throwable</text>

    {/* Error and Exception branches */}
    <line x1="370" y1="85" x2="200" y2="125" stroke="#ef4444" strokeWidth="2"/>
    <line x1="430" y1="85" x2="600" y2="125" stroke="#ef4444" strokeWidth="2"/>

    <rect x="125" y="125" width="150" height="40" rx="8" fill="#dc2626" stroke="#ef4444" strokeWidth="2"/>
    <text x="200" y="150" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Error</text>

    <rect x="525" y="125" width="150" height="40" rx="8" fill="#ea580c" stroke="#f97316" strokeWidth="2"/>
    <text x="600" y="150" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Exception</text>

    {/* Error subtypes */}
    <line x1="200" y1="165" x2="120" y2="205" stroke="#ef4444" strokeWidth="1.5"/>
    <line x1="200" y1="165" x2="280" y2="205" stroke="#ef4444" strokeWidth="1.5"/>

    <rect x="45" y="205" width="150" height="35" rx="6" fill="rgba(220, 38, 38, 0.3)" stroke="#dc2626" strokeWidth="1"/>
    <text x="120" y="227" textAnchor="middle" fill="#fca5a5" fontSize="10">OutOfMemoryError</text>

    <rect x="205" y="205" width="150" height="35" rx="6" fill="rgba(220, 38, 38, 0.3)" stroke="#dc2626" strokeWidth="1"/>
    <text x="280" y="227" textAnchor="middle" fill="#fca5a5" fontSize="10">StackOverflowError</text>

    {/* Exception subtypes */}
    <line x1="600" y1="165" x2="480" y2="205" stroke="#ef4444" strokeWidth="1.5"/>
    <line x1="600" y1="165" x2="720" y2="205" stroke="#ef4444" strokeWidth="1.5"/>

    <rect x="395" y="205" width="170" height="35" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="480" y="227" textAnchor="middle" fill="#86efac" fontSize="10">RuntimeException</text>
    <text x="480" y="238" textAnchor="middle" fill="#64748b" fontSize="8">(unchecked)</text>

    <rect x="635" y="205" width="170" height="35" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="720" y="227" textAnchor="middle" fill="#93c5fd" fontSize="10">IOException, SQLException</text>
    <text x="720" y="238" textAnchor="middle" fill="#64748b" fontSize="8">(checked)</text>

    {/* RuntimeException subtypes */}
    <line x1="480" y1="240" x2="430" y2="270" stroke="#22c55e" strokeWidth="1"/>
    <line x1="480" y1="240" x2="530" y2="270" stroke="#22c55e" strokeWidth="1"/>

    <rect x="360" y="270" width="140" height="30" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="430" y="290" textAnchor="middle" fill="#86efac" fontSize="9">NullPointerException</text>

    <rect x="510" y="270" width="140" height="30" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="580" y="290" textAnchor="middle" fill="#86efac" fontSize="9">IllegalArgumentException</text>
  </svg>
)

const TryCatchFlowDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="flowArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
      <marker id="errorArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Try-Catch-Finally Flow
    </text>

    {/* Try block */}
    <rect x="50" y="50" width="150" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="125" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">try { }</text>
    <text x="125" y="95" textAnchor="middle" fill="#bfdbfe" fontSize="10">Execute code</text>

    {/* Normal flow arrow */}
    <line x1="200" y1="80" x2="295" y2="80" stroke="#4ade80" strokeWidth="2" markerEnd="url(#flowArrow)"/>
    <text x="247" y="70" textAnchor="middle" fill="#4ade80" fontSize="9">success</text>

    {/* Exception arrow down */}
    <line x1="125" y1="110" x2="125" y2="145" stroke="#ef4444" strokeWidth="2" markerEnd="url(#errorArrow)"/>
    <text x="145" y="135" fill="#ef4444" fontSize="9">exception</text>

    {/* Catch block */}
    <rect x="50" y="150" width="150" height="60" rx="8" fill="#dc2626" stroke="#ef4444" strokeWidth="2"/>
    <text x="125" y="175" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">catch { }</text>
    <text x="125" y="195" textAnchor="middle" fill="#fca5a5" fontSize="10">Handle exception</text>

    {/* Arrow from catch to finally */}
    <line x1="200" y1="180" x2="295" y2="130" stroke="#4ade80" strokeWidth="2" markerEnd="url(#flowArrow)"/>

    {/* Finally block */}
    <rect x="300" y="70" width="150" height="70" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="375" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">finally { }</text>
    <text x="375" y="115" textAnchor="middle" fill="#c4b5fd" fontSize="10">Always executes</text>
    <text x="375" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">cleanup resources</text>

    {/* Continue execution */}
    <line x1="450" y1="105" x2="545" y2="105" stroke="#4ade80" strokeWidth="2" markerEnd="url(#flowArrow)"/>

    <rect x="550" y="75" width="150" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="625" y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Continue</text>
    <text x="625" y="120" textAnchor="middle" fill="#bbf7d0" fontSize="10">Normal execution</text>
  </svg>
)

const TryWithResourcesDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="resArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Try-With-Resources Automatic Cleanup
    </text>

    {/* Resource creation */}
    <rect x="50" y="50" width="160" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="130" y="70" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">try (Resource r = ...)</text>
    <text x="130" y="88" textAnchor="middle" fill="#bfdbfe" fontSize="9">AutoCloseable</text>

    <line x1="210" y1="75" x2="275" y2="75" stroke="#4ade80" strokeWidth="2" markerEnd="url(#resArrow)"/>

    {/* Use resource */}
    <rect x="280" y="50" width="140" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="350" y="70" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Use Resource</text>
    <text x="350" y="88" textAnchor="middle" fill="#c4b5fd" fontSize="9">work with r</text>

    <line x1="420" y1="75" x2="485" y2="75" stroke="#4ade80" strokeWidth="2" markerEnd="url(#resArrow)"/>

    {/* Auto close */}
    <rect x="490" y="50" width="140" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="560" y="70" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Auto close()</text>
    <text x="560" y="88" textAnchor="middle" fill="#bbf7d0" fontSize="9">guaranteed</text>

    <line x1="630" y1="75" x2="695" y2="75" stroke="#4ade80" strokeWidth="2" markerEnd="url(#resArrow)"/>

    {/* Done */}
    <rect x="700" y="50" width="80" height="50" rx="8" fill="#059669" stroke="#34d399" strokeWidth="2"/>
    <text x="740" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Done</text>

    {/* Exception path */}
    <line x1="350" y1="100" x2="350" y2="140" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,3"/>
    <text x="365" y="125" fill="#ef4444" fontSize="9">exception</text>

    <rect x="280" y="145" width="140" height="40" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="1"/>
    <text x="350" y="170" textAnchor="middle" fill="#fca5a5" fontSize="10">close() still called!</text>
  </svg>
)

const ExceptionChainingDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="chainArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Exception Chaining - Preserving Root Cause
    </text>

    {/* Original exception */}
    <rect x="50" y="60" width="180" height="60" rx="8" fill="#dc2626" stroke="#ef4444" strokeWidth="2"/>
    <text x="140" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">SQLException</text>
    <text x="140" y="105" textAnchor="middle" fill="#fca5a5" fontSize="9">DB connection failed</text>

    <line x1="230" y1="90" x2="295" y2="90" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#chainArrow)"/>
    <text x="262" y="80" textAnchor="middle" fill="#f59e0b" fontSize="9">wrap</text>

    {/* Wrapper exception */}
    <rect x="300" y="60" width="200" height="60" rx="8" fill="#ea580c" stroke="#f97316" strokeWidth="2"/>
    <text x="400" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">DataAccessException</text>
    <text x="400" y="105" textAnchor="middle" fill="#fed7aa" fontSize="9">cause: SQLException</text>

    <line x1="500" y1="90" x2="565" y2="90" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#chainArrow)"/>
    <text x="532" y="80" textAnchor="middle" fill="#f59e0b" fontSize="9">throw</text>

    {/* Caller */}
    <rect x="570" y="60" width="180" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="660" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Caller</text>
    <text x="660" y="105" textAnchor="middle" fill="#c4b5fd" fontSize="9">e.getCause()</text>

    {/* Benefits */}
    <rect x="200" y="140" width="400" height="45" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="400" y="160" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Both stack traces preserved for debugging</text>
    <text x="400" y="175" textAnchor="middle" fill="#86efac" fontSize="9">new Exception(msg, cause) or initCause()</text>
  </svg>
)

const RetryPatternDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="retryArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
      <marker id="failArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Exponential Backoff Retry Pattern
    </text>

    {/* Attempt 1 */}
    <rect x="50" y="50" width="120" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="70" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Attempt 1</text>
    <text x="110" y="88" textAnchor="middle" fill="#bfdbfe" fontSize="9">Execute</text>

    <line x1="110" y1="100" x2="110" y2="125" stroke="#ef4444" strokeWidth="2" markerEnd="url(#failArrow)"/>

    {/* Wait 100ms */}
    <rect x="60" y="130" width="100" height="30" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="110" y="150" textAnchor="middle" fill="#fbbf24" fontSize="9">Wait 100ms</text>

    <line x1="160" y1="145" x2="195" y2="145" stroke="#4ade80" strokeWidth="2" markerEnd="url(#retryArrow)"/>

    {/* Attempt 2 */}
    <rect x="200" y="120" width="120" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="260" y="140" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Attempt 2</text>
    <text x="260" y="158" textAnchor="middle" fill="#bfdbfe" fontSize="9">Execute</text>

    <line x1="260" y1="170" x2="260" y2="195" stroke="#ef4444" strokeWidth="2" markerEnd="url(#failArrow)"/>

    {/* Wait 200ms */}
    <rect x="210" y="195" width="100" height="25" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="260" y="212" textAnchor="middle" fill="#fbbf24" fontSize="9">Wait 200ms</text>

    <line x1="310" y1="207" x2="345" y2="175" stroke="#4ade80" strokeWidth="2" markerEnd="url(#retryArrow)"/>

    {/* Attempt 3 */}
    <rect x="350" y="120" width="120" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="410" y="140" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Attempt 3</text>
    <text x="410" y="158" textAnchor="middle" fill="#bfdbfe" fontSize="9">Execute</text>

    {/* Success path */}
    <line x1="470" y1="145" x2="535" y2="145" stroke="#4ade80" strokeWidth="2" markerEnd="url(#retryArrow)"/>
    <text x="502" y="135" textAnchor="middle" fill="#4ade80" fontSize="9">success!</text>

    <rect x="540" y="120" width="100" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="590" y="140" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Return</text>
    <text x="590" y="158" textAnchor="middle" fill="#bbf7d0" fontSize="9">Result</text>

    {/* Formula */}
    <rect x="660" y="70" width="130" height="100" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="725" y="95" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Backoff Formula</text>
    <text x="725" y="115" textAnchor="middle" fill="#c4b5fd" fontSize="9">delay = initial * 2^n</text>
    <text x="725" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8">100ms, 200ms, 400ms...</text>
    <text x="725" y="155" textAnchor="middle" fill="#94a3b8" fontSize="8">+ optional jitter</text>
  </svg>
)

const CustomExceptionDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="extArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Custom Exception Hierarchy Design
    </text>

    {/* Base Exception */}
    <rect x="300" y="45" width="200" height="45" rx="8" fill="#7c3aed" stroke="#a78bfa" strokeWidth="2"/>
    <text x="400" y="65" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Exception (checked)</text>
    <text x="400" y="82" textAnchor="middle" fill="#c4b5fd" fontSize="9">or RuntimeException (unchecked)</text>

    {/* Extends arrow */}
    <line x1="400" y1="90" x2="400" y2="115" stroke="#22c55e" strokeWidth="2" markerEnd="url(#extArrow)"/>
    <text x="430" y="108" fill="#22c55e" fontSize="9">extends</text>

    {/* Domain Exception */}
    <rect x="275" y="120" width="250" height="50" rx="8" fill="#ea580c" stroke="#f97316" strokeWidth="2"/>
    <text x="400" y="140" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">BankingException</text>
    <text x="400" y="158" textAnchor="middle" fill="#fed7aa" fontSize="9">Domain-specific base exception</text>

    {/* Child exceptions */}
    <line x1="320" y1="170" x2="150" y2="190" stroke="#22c55e" strokeWidth="1.5"/>
    <line x1="400" y1="170" x2="400" y2="190" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="5,3"/>
    <line x1="480" y1="170" x2="650" y2="190" stroke="#22c55e" strokeWidth="1.5"/>

    {/* Specific exceptions - hints */}
    <text x="150" y="200" textAnchor="middle" fill="#94a3b8" fontSize="9">InsufficientFundsException</text>
    <text x="400" y="200" textAnchor="middle" fill="#64748b" fontSize="9">...</text>
    <text x="650" y="200" textAnchor="middle" fill="#94a3b8" fontSize="9">AccountNotFoundException</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function ExceptionHandling({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)
  const [refreshKey, setRefreshKey] = useState(0)
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [userCode, setUserCode] = useState('')
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    const handleProgressUpdate = () => setRefreshKey(prev => prev + 1)
    window.addEventListener('progressUpdate', handleProgressUpdate)
    return () => window.removeEventListener('progressUpdate', handleProgressUpdate)
  }, [])

  const openProblem = (problem) => { setSelectedProblem(problem); setUserCode(problem.starterCode); setShowSolution(false) }
  const closeProblem = () => { setSelectedProblem(null); setUserCode(''); setShowSolution(false) }

  const practiceProblems = [
    { id: 1, title: 'Custom Exception', difficulty: 'Easy', description: 'Create a custom exception class for validation errors with error code and message.', example: 'ValidationException extends RuntimeException',
      instructions: `Create a custom exception class.

**Requirements:**
1. Extend RuntimeException
2. Add errorCode field
3. Override getMessage()`,
      starterCode: `// TODO: Create ValidationException class
// - Field: String errorCode
// - Constructor: (String errorCode, String message)
// - Override getMessage() to include error code

public class ExceptionDemo {
    public static void validate(int age) {
        if (age < 0) {
            // throw new ValidationException("AGE_001", "Age cannot be negative");
        }
    }
    
    public static void main(String[] args) {
        try {
            validate(-5);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}`,
      solution: `class ValidationException extends RuntimeException {
    private String errorCode;
    
    public ValidationException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }
    
    public String getErrorCode() {
        return errorCode;
    }
    
    @Override
    public String getMessage() {
        return "[" + errorCode + "] " + super.getMessage();
    }
}

public class ExceptionDemo {
    public static void validate(int age) {
        if (age < 0) {
            throw new ValidationException("AGE_001", "Age cannot be negative");
        }
    }
    
    public static void main(String[] args) {
        try {
            validate(-5);
        } catch (ValidationException e) {
            System.out.println(e.getMessage()); // [AGE_001] Age cannot be negative
        }
    }
}`
    },
    { id: 2, title: 'Try-With-Resources', difficulty: 'Easy', description: 'Refactor code to use try-with-resources for automatic resource management.', example: 'try (FileReader fr = new FileReader(file)) {...}',
      instructions: `Use try-with-resources for auto-closing.

**Requirements:**
1. Refactor to use try-with-resources
2. Remove manual close() calls
3. Handle exceptions properly`,
      starterCode: `import java.io.*;

public class ResourceDemo {
    // BAD: Manual resource management
    public static String readFile(String path) {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader(path));
            return reader.readLine();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    
    // TODO: Refactor using try-with-resources
}`,
      solution: `import java.io.*;

public class ResourceDemo {
    // GOOD: Try-with-resources
    public static String readFile(String path) {
        try (BufferedReader reader = new BufferedReader(new FileReader(path))) {
            return reader.readLine();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        // reader.close() is called automatically
    }
    
    // Multiple resources
    public static void copyFile(String src, String dest) {
        try (FileInputStream in = new FileInputStream(src);
             FileOutputStream out = new FileOutputStream(dest)) {
            byte[] buffer = new byte[1024];
            int length;
            while ((length = in.read(buffer)) > 0) {
                out.write(buffer, 0, length);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}`
    },
    { id: 3, title: 'Exception Chaining', difficulty: 'Medium', description: 'Wrap low-level exceptions in application-specific exceptions while preserving the cause.', example: 'throw new ServiceException("Failed", cause)',
      instructions: `Chain exceptions to preserve root cause.

**Requirements:**
1. Create ServiceException
2. Wrap SQLException with ServiceException
3. Preserve original exception as cause`,
      starterCode: `import java.sql.*;

// TODO: Create ServiceException that wraps other exceptions

public class ExceptionChaining {
    public static void fetchUser(int id) {
        try {
            // Simulate database error
            throw new SQLException("Connection refused");
        } catch (SQLException e) {
            // TODO: Wrap in ServiceException, preserving cause
            throw new RuntimeException(e); // Replace this
        }
    }
    
    public static void main(String[] args) {
        try {
            fetchUser(1);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            System.out.println("Cause: " + e.getCause());
        }
    }
}`,
      solution: `import java.sql.*;

class ServiceException extends RuntimeException {
    public ServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}

public class ExceptionChaining {
    public static void fetchUser(int id) {
        try {
            throw new SQLException("Connection refused");
        } catch (SQLException e) {
            throw new ServiceException("Failed to fetch user " + id, e);
        }
    }
    
    public static void main(String[] args) {
        try {
            fetchUser(1);
        } catch (ServiceException e) {
            System.out.println("Error: " + e.getMessage());
            System.out.println("Cause: " + e.getCause().getMessage());
        }
    }
}`
    },
    { id: 4, title: 'Retry Pattern', difficulty: 'Medium', description: 'Implement a retry mechanism for transient failures with exponential backoff.', example: 'Retry 3 times with 1s, 2s, 4s delays',
      instructions: `Implement retry with exponential backoff.

**Requirements:**
1. Retry up to 3 times
2. Double delay between retries
3. Throw exception if all retries fail`,
      starterCode: `public class RetryDemo {
    // TODO: Implement retry with exponential backoff
    public static <T> T retry(int maxRetries, long initialDelay, Callable<T> action) {
        // Your implementation here
        return null;
    }
    
    public static void main(String[] args) {
        // retry(3, 1000, () -> callUnreliableService());
    }
}

interface Callable<T> {
    T call() throws Exception;
}`,
      solution: `public class RetryDemo {
    public static <T> T retry(int maxRetries, long initialDelay, Callable<T> action) throws Exception {
        int attempt = 0;
        long delay = initialDelay;
        
        while (true) {
            try {
                return action.call();
            } catch (Exception e) {
                attempt++;
                if (attempt >= maxRetries) {
                    throw new RuntimeException("Failed after " + maxRetries + " attempts", e);
                }
                System.out.println("Attempt " + attempt + " failed, retrying in " + delay + "ms");
                Thread.sleep(delay);
                delay *= 2; // Exponential backoff
            }
        }
    }
    
    public static void main(String[] args) throws Exception {
        int[] counter = {0};
        String result = retry(3, 1000, () -> {
            counter[0]++;
            if (counter[0] < 3) throw new RuntimeException("Transient error");
            return "Success on attempt " + counter[0];
        });
        System.out.println(result);
    }
}

interface Callable<T> {
    T call() throws Exception;
}`
    },
    { id: 5, title: 'Multi-Catch Block', difficulty: 'Easy', description: 'Consolidate multiple catch blocks using multi-catch syntax.', example: 'catch (IOException | SQLException e)',
      instructions: `Use multi-catch to handle multiple exceptions.

**Requirements:**
1. Combine similar exception handlers
2. Use pipe (|) syntax
3. Keep specific handlers separate if needed`,
      starterCode: `import java.io.*;
import java.sql.*;

public class MultiCatchDemo {
    // BAD: Duplicate catch blocks
    public static void process() {
        try {
            // Some operations
            throw new IOException("IO error");
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
            logError(e);
        } catch (RuntimeException e) {
            System.out.println("Error: " + e.getMessage());
            logError(e);
        }
    }
    
    // TODO: Refactor using multi-catch
    
    static void logError(Exception e) {
        System.err.println("Logged: " + e);
    }
}`,
      solution: `import java.io.*;
import java.sql.*;

public class MultiCatchDemo {
    // GOOD: Multi-catch for same handling
    public static void process() {
        try {
            throw new IOException("IO error");
        } catch (IOException | RuntimeException e) {
            System.out.println("Error: " + e.getMessage());
            logError(e);
        }
    }
    
    // Mix of multi-catch and specific handling
    public static void processWithSpecific() {
        try {
            // operations
        } catch (IOException | IllegalArgumentException e) {
            // Same handling for these
            System.out.println("Recoverable: " + e.getMessage());
        } catch (OutOfMemoryError e) {
            // Specific handling for OOM
            System.err.println("Critical: " + e.getMessage());
            System.exit(1);
        }
    }
    
    static void logError(Exception e) {
        System.err.println("Logged: " + e);
    }
}`
    }
  ]

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'custom-exceptions',
      name: 'Custom Exceptions',
      icon: '🏗️',
      color: '#f59e0b',
      description: 'Design and implement custom exception hierarchies for domain-specific error handling with meaningful error messages and context.',
      diagram: CustomExceptionDiagram,
      details: [
        {
          name: 'Exception Hierarchy Design',
          diagram: ExceptionHierarchyDiagram,
          explanation: 'Java exceptions form a hierarchy with Throwable at the root. Errors (OutOfMemoryError, StackOverflowError) represent unrecoverable JVM problems. Checked exceptions (IOException, SQLException) must be declared or caught. Unchecked exceptions (RuntimeException subclasses like NullPointerException) indicate programming errors. Choose checked exceptions when callers can meaningfully recover, unchecked for programming bugs.',
          codeExample: `// Checked exception - extends Exception
// Caller MUST handle or declare
public class InsufficientFundsException extends Exception {
    private final double balance;
    private final double amount;

    public InsufficientFundsException(double balance, double amount) {
        super(String.format("Cannot withdraw %.2f, balance is %.2f",
            amount, balance));
        this.balance = balance;
        this.amount = amount;
    }

    public double getShortfall() {
        return amount - balance;
    }
}

// Unchecked exception - extends RuntimeException
// Indicates programming error
public class InvalidAccountStateException extends RuntimeException {
    public InvalidAccountStateException(String message) {
        super(message);
    }
}`
        },
        {
          name: 'Base Exception Class',
          diagram: CustomExceptionDiagram,
          explanation: 'Create a base exception class for your domain to provide common functionality and enable catching all domain exceptions with a single catch block. Include constructors for message-only, message with cause, and cause-only scenarios. Store relevant context data as fields with getters.',
          codeExample: `// Base exception for banking operations
public class BankingException extends Exception {
    private final String transactionId;
    private final LocalDateTime timestamp;

    public BankingException(String message) {
        this(message, null, null);
    }

    public BankingException(String message, Throwable cause) {
        this(message, cause, null);
    }

    public BankingException(String message, Throwable cause,
                           String transactionId) {
        super(message, cause);
        this.transactionId = transactionId;
        this.timestamp = LocalDateTime.now();
    }

    public String getTransactionId() { return transactionId; }
    public LocalDateTime getTimestamp() { return timestamp; }
}`
        },
        {
          name: 'Specific Exception Classes',
          explanation: 'Create specific exception classes that extend your base exception to represent distinct error conditions. Include fields that provide context about the error. Use descriptive class names that clearly indicate the problem. Override getMessage() or use String.format() in constructor for clear error messages.',
          codeExample: `// Specific exception with context
public class InsufficientFundsException extends BankingException {
    private final double balance;
    private final double amount;

    public InsufficientFundsException(double balance, double amount) {
        super(String.format(
            "Cannot withdraw %.2f, available balance is %.2f",
            amount, balance));
        this.balance = balance;
        this.amount = amount;
    }

    public double getBalance() { return balance; }
    public double getAmount() { return amount; }
    public double getShortfall() { return amount - balance; }
}

// Usage in business logic
public void withdraw(double amount) throws InsufficientFundsException {
    if (amount > balance) {
        throw new InsufficientFundsException(balance, amount);
    }
    balance -= amount;
}

// Caller can access exception details
try {
    account.withdraw(500);
} catch (InsufficientFundsException e) {
    log.warn("Withdrawal failed: shortfall of {}", e.getShortfall());
    notifyUser("Need " + e.getShortfall() + " more to complete");
}`
        }
      ]
    },
    {
      id: 'try-with-resources',
      name: 'Try-With-Resources',
      icon: '🔒',
      color: '#3b82f6',
      description: 'Automatic resource management using AutoCloseable interface to ensure cleanup even when exceptions occur.',
      diagram: TryWithResourcesDiagram,
      details: [
        {
          name: 'AutoCloseable Interface',
          diagram: TryWithResourcesDiagram,
          explanation: 'Try-with-resources (Java 7+) automatically calls close() on resources when the try block exits, whether normally or via exception. Resources must implement AutoCloseable interface. Multiple resources are closed in reverse declaration order. This eliminates the need for explicit finally blocks for cleanup.',
          codeExample: `// Implement AutoCloseable
public class DatabaseConnection implements AutoCloseable {
    private final String url;
    private boolean connected = true;

    public DatabaseConnection(String url) {
        this.url = url;
        System.out.println("Opening connection to " + url);
    }

    public ResultSet executeQuery(String sql) {
        if (!connected) {
            throw new IllegalStateException("Connection closed");
        }
        // Execute query...
        return null;
    }

    @Override
    public void close() {
        if (connected) {
            System.out.println("Closing connection to " + url);
            connected = false;
        }
    }
}`
        },
        {
          name: 'Basic Usage Pattern',
          explanation: 'Declare resources in parentheses after try keyword. Resources are automatically closed when the block exits. You can declare multiple resources separated by semicolons. Each resource must be a final or effectively final variable. The close() method is called even if the try block throws an exception.',
          codeExample: `// Single resource
try (DatabaseConnection conn = new DatabaseConnection("db://localhost")) {
    conn.executeQuery("SELECT * FROM users");
    // Connection automatically closed here
} catch (Exception e) {
    System.err.println("Error: " + e.getMessage());
}

// Multiple resources - closed in reverse order
try (
    FileInputStream fis = new FileInputStream("input.txt");
    FileOutputStream fos = new FileOutputStream("output.txt");
    BufferedReader reader = new BufferedReader(new InputStreamReader(fis));
    BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(fos))
) {
    String line;
    while ((line = reader.readLine()) != null) {
        writer.write(line);
        writer.newLine();
    }
} // All resources closed: writer, reader, fos, fis`
        },
        {
          name: 'Effectively Final Variables (Java 9+)',
          explanation: 'Java 9 allows using effectively final variables in try-with-resources, not just declarations. This is useful when the resource is created earlier in the code. The variable must not be reassigned after initialization.',
          codeExample: `// Java 9+ - effectively final variable
DatabaseConnection conn = new DatabaseConnection("db://localhost");
BufferedReader reader = new BufferedReader(new FileReader("data.txt"));

// Can use existing variables if effectively final
try (conn; reader) {
    String data = reader.readLine();
    conn.executeQuery("INSERT INTO data VALUES ('" + data + "')");
}
// Both closed automatically

// This would NOT work - variable reassigned
DatabaseConnection conn2 = new DatabaseConnection("db://primary");
conn2 = new DatabaseConnection("db://secondary"); // reassigned!
// try (conn2) { } // Compile error: not effectively final`
        }
      ]
    },
    {
      id: 'multi-catch',
      name: 'Multi-Catch Handling',
      icon: '🎯',
      color: '#8b5cf6',
      description: 'Handle multiple exception types with the same handler using Java 7+ multi-catch syntax for cleaner code.',
      diagram: TryCatchFlowDiagram,
      details: [
        {
          name: 'Multi-Catch Syntax',
          diagram: TryCatchFlowDiagram,
          explanation: 'Multi-catch (Java 7+) allows handling multiple unrelated exception types with a single catch block using the pipe (|) operator. The exception types cannot be in the same inheritance hierarchy. The caught exception variable is implicitly final and cannot be reassigned.',
          codeExample: `// Multi-catch - handle multiple types the same way
public void processData(String source) {
    try {
        if (source.startsWith("file://")) {
            throw new FileNotFoundException("File: " + source);
        } else if (source.startsWith("db://")) {
            throw new SQLException("DB: " + source);
        } else if (source.startsWith("http://")) {
            throw new MalformedURLException("URL: " + source);
        }
        process(source);
    } catch (FileNotFoundException | SQLException | MalformedURLException e) {
        // Handle all three types the same way
        log.error("Data access error: {}", e.getMessage());
        sendAlert("Could not access: " + source);
    }
}

// The exception variable 'e' is implicitly final
// e = new Exception(); // Compile error!`
        },
        {
          name: 'Catch Block Ordering',
          explanation: 'When using multiple catch blocks, order them from most specific to most general. The compiler prevents catching a parent exception before its child. Use multi-catch for unrelated exceptions that need the same handling. Keep separate catch blocks for exceptions requiring different handling.',
          codeExample: `try {
    riskyOperation();
} catch (FileNotFoundException e) {
    // Most specific - handle file not found
    log.warn("File missing: {}", e.getMessage());
    createDefaultFile();

} catch (IOException e) {
    // More general - other IO errors
    log.error("IO error: {}", e.getMessage());
    throw new DataAccessException("IO failed", e);

} catch (SQLException | DataFormatException e) {
    // Multi-catch for unrelated types with same handling
    log.error("Data error: {}", e.getMessage());
    rollbackTransaction();

} catch (Exception e) {
    // Most general - catch-all for unexpected errors
    log.error("Unexpected error", e);
    throw new RuntimeException("Operation failed", e);
}

// This would be a compile error:
// catch (IOException e) { }
// catch (FileNotFoundException e) { } // Error: already caught by IOException`
        },
        {
          name: 'Rethrow with More Specific Type',
          explanation: 'Java 7+ compiler can determine the specific exception type when rethrowing in a catch block. This enables declaring the method to throw specific types even when catching a general Exception type, as long as all possible exceptions are listed in throws clause.',
          codeExample: `// Compiler determines specific types being rethrown
public void processFile(String path)
        throws FileNotFoundException, ParseException {
    try {
        FileReader reader = new FileReader(path);
        parseContent(reader); // throws ParseException
    } catch (Exception e) {
        log.error("Processing failed", e);
        // Compiler knows 'e' can only be FileNotFoundException
        // or ParseException based on try block analysis
        throw e; // Allowed even though catch is general
    }
}

// Without rethrow analysis, you'd need:
public void processFileOldWay(String path) throws Exception {
    try {
        FileReader reader = new FileReader(path);
        parseContent(reader);
    } catch (Exception e) {
        log.error("Failed", e);
        throw e; // Caller must handle generic Exception
    }
}`
        }
      ]
    },
    {
      id: 'exception-chaining',
      name: 'Exception Chaining',
      icon: '🔗',
      color: '#22c55e',
      description: 'Preserve original exception information while wrapping in domain-specific exceptions. Understand suppressed exceptions in try-with-resources.',
      diagram: ExceptionChainingDiagram,
      details: [
        {
          name: 'Chaining with Cause',
          diagram: ExceptionChainingDiagram,
          explanation: 'Exception chaining preserves the original exception stack trace while wrapping it in a higher-level, domain-appropriate exception. Use the constructor that accepts a Throwable cause, or call initCause() if the exception class lacks such a constructor. The original exception is accessible via getCause().',
          codeExample: `public class DataService {
    public User loadUser(String id) throws DataAccessException {
        try {
            return database.query("SELECT * FROM users WHERE id = ?", id);
        } catch (SQLException e) {
            // Chain: wrap low-level exception in domain exception
            throw new DataAccessException(
                "Failed to load user: " + id,
                e  // Original exception preserved as cause
            );
        }
    }
}

// Caller can access the chain
try {
    User user = service.loadUser("123");
} catch (DataAccessException e) {
    log.error("Data access failed: {}", e.getMessage());

    // Access original cause
    Throwable cause = e.getCause();
    if (cause instanceof SQLException) {
        SQLException sqlEx = (SQLException) cause;
        log.error("SQL State: {}, Error Code: {}",
            sqlEx.getSQLState(), sqlEx.getErrorCode());
    }

    // Print full chain
    e.printStackTrace(); // Shows both exceptions
}`
        },
        {
          name: 'Suppressed Exceptions',
          explanation: 'When an exception occurs in a try block AND the close() method also throws, Java saves the close() exception as a "suppressed" exception. The primary exception is thrown, with close() exceptions accessible via getSuppressed(). This prevents losing exception information.',
          codeExample: `// Resource that throws on close
public class ProblematicResource implements AutoCloseable {
    public void doWork() throws Exception {
        throw new Exception("Error during work");
    }

    @Override
    public void close() throws Exception {
        throw new Exception("Error during close");
    }
}

// Both exceptions are preserved
try (ProblematicResource r = new ProblematicResource()) {
    r.doWork(); // Throws "Error during work"
} catch (Exception e) {
    System.out.println("Primary: " + e.getMessage());
    // Output: Primary: Error during work

    // Access suppressed exceptions (from close())
    for (Throwable suppressed : e.getSuppressed()) {
        System.out.println("Suppressed: " + suppressed.getMessage());
        // Output: Suppressed: Error during close
    }
}

// Manually adding suppressed exceptions
Exception primary = new Exception("Primary failure");
Exception secondary = new Exception("Secondary issue");
primary.addSuppressed(secondary);
throw primary;`
        },
        {
          name: 'Best Practices',
          explanation: 'Always chain exceptions when wrapping lower-level exceptions to preserve debugging information. Use initCause() when the exception class does not have a cause constructor. Never swallow exceptions silently - at minimum, log them. Consider whether to expose the cause in the exception message or keep it internal.',
          codeExample: `// Good: Chain preserves original exception
try {
    externalService.call();
} catch (RemoteException e) {
    throw new ServiceException("Service call failed", e);
}

// Bad: Original exception lost
try {
    externalService.call();
} catch (RemoteException e) {
    throw new ServiceException("Service call failed"); // cause lost!
}

// Bad: Swallowing exception
try {
    externalService.call();
} catch (RemoteException e) {
    // Silent swallow - never do this!
}

// Using initCause() for legacy exceptions
try {
    legacyOperation();
} catch (LegacyException e) {
    ServiceException wrapped = new ServiceException("Operation failed");
    wrapped.initCause(e); // Set cause after construction
    throw wrapped;
}

// Logging and rethrowing
try {
    criticalOperation();
} catch (Exception e) {
    log.error("Critical operation failed", e); // Log with full stack
    throw new OperationException("Failed", e); // Rethrow wrapped
}`
        }
      ]
    },
    {
      id: 'retry-patterns',
      name: 'Retry Patterns',
      icon: '🔄',
      color: '#ef4444',
      description: 'Implement robust retry mechanisms with exponential backoff for handling transient failures in distributed systems.',
      diagram: RetryPatternDiagram,
      details: [
        {
          name: 'Exponential Backoff',
          diagram: RetryPatternDiagram,
          explanation: 'Exponential backoff increases wait time between retries exponentially (e.g., 100ms, 200ms, 400ms, 800ms). This prevents overwhelming a struggling service and reduces thundering herd problems. The formula is: delay = initialDelay * 2^attemptNumber. Always set a maximum retry count to prevent infinite loops.',
          codeExample: `public class RetryExecutor {
    private final int maxRetries;
    private final long initialDelayMs;
    private final long maxDelayMs;

    public RetryExecutor(int maxRetries, long initialDelayMs, long maxDelayMs) {
        this.maxRetries = maxRetries;
        this.initialDelayMs = initialDelayMs;
        this.maxDelayMs = maxDelayMs;
    }

    public <T> T executeWithRetry(Callable<T> operation) throws Exception {
        int attempt = 0;
        long delay = initialDelayMs;

        while (true) {
            try {
                return operation.call();
            } catch (Exception e) {
                attempt++;

                if (attempt >= maxRetries) {
                    throw new RetryExhaustedException(
                        "Max retries exceeded", e, attempt);
                }

                // Cap the delay
                delay = Math.min(delay, maxDelayMs);

                log.warn("Attempt {} failed, retrying in {}ms",
                    attempt, delay);

                Thread.sleep(delay);
                delay *= 2; // Exponential increase
            }
        }
    }
}`
        },
        {
          name: 'Adding Jitter',
          explanation: 'Jitter adds randomness to retry delays to prevent synchronized retries from multiple clients hitting the server simultaneously (thundering herd). Full jitter: random(0, delay). Equal jitter: delay/2 + random(0, delay/2). Decorrelated jitter: min(cap, random(base, prev_delay * 3)).',
          codeExample: `public class RetryWithJitter {
    private final Random random = new Random();

    // Full jitter: 0 to calculated delay
    private long fullJitter(long delay) {
        return random.nextLong(delay + 1);
    }

    // Equal jitter: half delay + random half
    private long equalJitter(long delay) {
        long half = delay / 2;
        return half + random.nextLong(half + 1);
    }

    public <T> T executeWithJitter(Callable<T> operation) throws Exception {
        int attempt = 0;
        long delay = 100; // initial delay ms

        while (attempt < maxRetries) {
            try {
                return operation.call();
            } catch (RetryableException e) {
                attempt++;

                // Apply jitter to prevent thundering herd
                long jitteredDelay = equalJitter(delay);

                log.info("Retry {} after {}ms (base: {}ms)",
                    attempt, jitteredDelay, delay);

                Thread.sleep(jitteredDelay);
                delay = Math.min(delay * 2, maxDelay);
            }
        }
        throw new RetryExhaustedException("All retries failed");
    }
}`
        },
        {
          name: 'Selective Retry',
          explanation: 'Not all exceptions should trigger a retry. Transient failures (network timeout, temporary unavailability) are good candidates. Permanent failures (authentication error, invalid input) should fail immediately. Create a policy to classify exceptions as retryable or non-retryable.',
          codeExample: `public class SelectiveRetryExecutor {
    private final Predicate<Exception> isRetryable;

    public SelectiveRetryExecutor(Predicate<Exception> isRetryable) {
        this.isRetryable = isRetryable;
    }

    // Default policy: network and timeout errors are retryable
    public static Predicate<Exception> defaultPolicy() {
        return e -> {
            if (e instanceof SocketTimeoutException) return true;
            if (e instanceof ConnectException) return true;
            if (e instanceof ServiceUnavailableException) return true;
            if (e instanceof SQLException) {
                // Retry on connection issues, not constraint violations
                String state = ((SQLException) e).getSQLState();
                return state != null && state.startsWith("08"); // connection
            }
            return false;
        };
    }

    public <T> T execute(Callable<T> operation) throws Exception {
        int attempt = 0;
        Exception lastException = null;

        while (attempt < maxRetries) {
            try {
                return operation.call();
            } catch (Exception e) {
                if (!isRetryable.test(e)) {
                    // Non-retryable - fail immediately
                    throw e;
                }
                lastException = e;
                attempt++;
                Thread.sleep(calculateDelay(attempt));
            }
        }
        throw new RetryExhaustedException("Retries exhausted", lastException);
    }
}`
        },
        {
          name: 'Circuit Breaker Integration',
          explanation: 'Combine retry logic with a circuit breaker pattern to prevent cascading failures. After too many failures, the circuit "opens" and fails fast without attempting the operation. After a timeout, it allows a test request through. This protects both client and server resources.',
          codeExample: `public class CircuitBreakerRetry<T> {
    private enum State { CLOSED, OPEN, HALF_OPEN }

    private State state = State.CLOSED;
    private int failureCount = 0;
    private long lastFailureTime = 0;

    private final int failureThreshold = 5;
    private final long resetTimeoutMs = 30000;
    private final int maxRetries = 3;

    public T execute(Callable<T> operation) throws Exception {
        if (state == State.OPEN) {
            if (System.currentTimeMillis() - lastFailureTime > resetTimeoutMs) {
                state = State.HALF_OPEN;
            } else {
                throw new CircuitOpenException("Circuit is open");
            }
        }

        try {
            T result = executeWithRetry(operation);
            onSuccess();
            return result;
        } catch (Exception e) {
            onFailure();
            throw e;
        }
    }

    private void onSuccess() {
        failureCount = 0;
        state = State.CLOSED;
    }

    private void onFailure() {
        failureCount++;
        lastFailureTime = System.currentTimeMillis();
        if (failureCount >= failureThreshold) {
            state = State.OPEN;
            log.warn("Circuit opened after {} failures", failureCount);
        }
    }
}`
        }
      ]
    }
  ]

  // =============================================================================
  // NAVIGATION HANDLERS
  // =============================================================================

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

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

  // =============================================================================
  // BREADCRUMB CONFIGURATION
  // =============================================================================

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'Java', icon: '☕', page: 'Java' },
      { name: 'Exception Handling', icon: '⚠️', page: 'Exception Handling' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index) => {
    if (index === 0) {
      onBack()
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)
    }
  }

  // =============================================================================
  // KEYBOARD NAVIGATION
  // =============================================================================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (selectedConceptIndex !== null) {
          setSelectedConceptIndex(null)
        } else {
          onBack()
        }
      } else if (e.key === 'ArrowLeft' && selectedConceptIndex !== null) {
        e.preventDefault()
        if (selectedConceptIndex > 0) {
          setSelectedConceptIndex(selectedConceptIndex - 1)
          setSelectedDetailIndex(0)
        }
      } else if (e.key === 'ArrowRight' && selectedConceptIndex !== null) {
        e.preventDefault()
        if (selectedConceptIndex < concepts.length - 1) {
          setSelectedConceptIndex(selectedConceptIndex + 1)
          setSelectedDetailIndex(0)
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack, concepts.length])

  // =============================================================================
  // STYLES
  // =============================================================================

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #450a0a 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #fca5a5, #ef4444)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(239, 68, 68, 0.2)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '0.5rem',
    color: '#fca5a5',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Exception Handling</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Back to Java
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={EXCEPTION_COLORS}
        />
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
        primaryColor={EXCEPTION_COLORS.primary}
      />


      {/* Practice Exercises Section */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem', background: 'rgba(15, 23, 42, 0.8)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
        <h2 style={{ color: '#ef4444', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span>📝</span> Practice Exercises</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>Click on an exercise to practice. Complete the code challenge and mark as done.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {practiceProblems.map((problem) => {
            const problemId = `ExceptionHandling-${problem.id}`
            const isCompleted = isProblemCompleted(problemId)
            return (
              <div key={problem.id} onClick={() => openProblem(problem)} style={{ background: isCompleted ? 'rgba(34, 197, 94, 0.1)' : 'rgba(30, 41, 59, 0.8)', borderRadius: '0.75rem', padding: '1rem', border: `1px solid ${isCompleted ? '#22c55e' : '#334155'}`, cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.2)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = isCompleted ? '#22c55e' : '#334155'; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h4 style={{ color: '#e2e8f0', margin: 0, fontSize: '0.95rem' }}>{problem.title}</h4>
                  <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '600', backgroundColor: problem.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.2)' : problem.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: problem.difficulty === 'Easy' ? '#22c55e' : problem.difficulty === 'Medium' ? '#f59e0b' : '#ef4444' }}>{problem.difficulty}</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0.5rem 0', lineHeight: '1.4' }}>{problem.description}</p>
                <p style={{ color: '#64748b', fontSize: '0.75rem', margin: '0.5rem 0', fontStyle: 'italic' }}>{problem.example}</p>
                <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: '500' }}>Click to practice →</span>
                  <div onClick={(e) => e.stopPropagation()}><CompletionCheckbox problemId={problemId} compact /></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Practice Problem Modal */}
      {selectedProblem && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }} onClick={closeProblem}>
          <div style={{ backgroundColor: '#1f2937', borderRadius: '1rem', width: '95vw', maxWidth: '1400px', height: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '2px solid #ef4444' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h2 style={{ color: '#e2e8f0', margin: 0, fontSize: '1.5rem' }}>{selectedProblem.title}</h2>
                <span style={{ padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', backgroundColor: selectedProblem.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.2)' : selectedProblem.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: selectedProblem.difficulty === 'Easy' ? '#22c55e' : selectedProblem.difficulty === 'Medium' ? '#f59e0b' : '#ef4444' }}>{selectedProblem.difficulty}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <CompletionCheckbox problemId={`ExceptionHandling-${selectedProblem.id}`} compact />
                <button onClick={closeProblem} style={{ padding: '0.5rem 1rem', backgroundColor: '#374151', color: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>✕ Close</button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem', borderRight: '1px solid #374151', overflowY: 'auto' }}>
                <h3 style={{ color: '#ef4444', marginTop: 0, marginBottom: '1rem' }}>📋 Instructions</h3>
                <div style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{selectedProblem.instructions.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} style={{ color: '#e2e8f0' }}>{part}</strong> : part)}</div>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedProblem.solution) }} style={{ padding: '0.5rem 1rem', backgroundColor: showSolution ? '#ef4444' : '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>{showSolution ? '🔒 Hide Solution' : '💡 Show Solution'}</button>
                  <button onClick={() => { setUserCode(selectedProblem.starterCode); setShowSolution(false) }} style={{ padding: '0.5rem 1rem', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>🔄 Reset Code</button>
                  <button onClick={() => navigator.clipboard.writeText(userCode)} style={{ padding: '0.5rem 1rem', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>📋 Copy Code</button>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                  <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'Consolas, Monaco, "Courier New", monospace', fontSize: '0.9rem', backgroundColor: '#111827', color: '#e2e8f0', border: '1px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5' }} spellCheck={false} />
                </div>
                <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.75rem', marginBottom: 0 }}>💡 Copy this code to your IDE to run and test. Mark as complete when you've solved it!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Concept Cards Grid */}
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
              {concept.details.length} topics - Click to explore
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Selected Concept */}
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
              colors={EXCEPTION_COLORS}
            />

            {/* Modal Header with Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #334155'
            }}>
              <h2 style={{
                color: selectedConcept.color,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.25rem'
              }}>
                <span>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button
                  onClick={handlePreviousConcept}
                  disabled={selectedConceptIndex === 0}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >&larr;</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>
                  {selectedConceptIndex + 1}/{concepts.length}
                </span>
                <button
                  onClick={handleNextConcept}
                  disabled={selectedConceptIndex === concepts.length - 1}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >&rarr;</button>
                <button
                  onClick={() => setSelectedConceptIndex(null)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '0.375rem',
                    color: '#f87171',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    marginLeft: '0.5rem'
                  }}
                >&times;</button>
              </div>
            </div>

            {/* Subtopic Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDetailIndex(i)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)',
                    border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`,
                    borderRadius: '0.5rem',
                    color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: selectedDetailIndex === i ? '600' : '400',
                    transition: 'all 0.2s'
                  }}
                >
                  {detail.name}
                </button>
              ))}
            </div>

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = detail.diagram || selectedConcept.diagram
              return (
                <div>
                  {/* Diagram */}
                  {DiagramComponent && (
                    <div style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      border: '1px solid #334155'
                    }}>
                      <DiagramComponent />
                    </div>
                  )}

                  {/* Detail Name */}
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                    {detail.name}
                  </h3>

                  {/* Explanation */}
                  <p style={{
                    color: '#e2e8f0',
                    lineHeight: '1.8',
                    marginBottom: '1rem',
                    background: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'left'
                  }}>
                    {detail.explanation}
                  </p>

                  {/* Code Example */}
                  {detail.codeExample && (
                    <SyntaxHighlighter
                      language="java"
                      style={vscDarkPlus}
                      customStyle={{
                        padding: '1rem',
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.8rem',
                        border: '1px solid #334155',
                        background: '#0f172a'
                      }}
                      codeTagProps={{ style: { background: 'transparent' } }}
                    >
                      {detail.codeExample}
                    </SyntaxHighlighter>
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

export default ExceptionHandling

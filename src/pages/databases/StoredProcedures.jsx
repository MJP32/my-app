import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import useVoiceConceptNavigation from '../../hooks/useVoiceConceptNavigation'

const DATABASE_COLORS = {
  primary: '#60a5fa',
  primaryHover: '#93c5fd',
  bg: 'rgba(59, 130, 246, 0.1)',
  border: 'rgba(59, 130, 246, 0.3)',
  arrow: '#3b82f6',
  hoverBg: 'rgba(59, 130, 246, 0.2)',
  topicBg: 'rgba(59, 130, 246, 0.2)'
}

// Background colors for subtopic descriptions
const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// Stored Procedures Diagram
const StoredProceduresDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Stored Procedure Architecture</text>
    <rect x="50" y="50" width="120" height="60" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="110" y="75" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Application</text>
    <text x="110" y="92" textAnchor="middle" fill="#c4b5fd" fontSize="7">CALL proc()</text>
    <rect x="200" y="50" width="150" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="275" y="70" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Stored Procedure</text>
    <text x="275" y="88" textAnchor="middle" fill="#fcd34d" fontSize="7">IN/OUT params</text>
    <text x="275" y="102" textAnchor="middle" fill="#fcd34d" fontSize="7">Precompiled</text>
    <rect x="380" y="50" width="120" height="60" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="440" y="75" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Database</text>
    <text x="440" y="92" textAnchor="middle" fill="#86efac" fontSize="7">Execute SQL</text>
    <rect x="530" y="50" width="120" height="60" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="590" y="75" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Results</text>
    <text x="590" y="92" textAnchor="middle" fill="#93c5fd" fontSize="7">OUT params</text>
    <line x1="170" y1="80" x2="195" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <line x1="350" y1="80" x2="375" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <line x1="500" y1="80" x2="525" y2="80" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="135" textAnchor="middle" fill="#64748b" fontSize="9">Single call • Reduced network trips • Cached execution plan</text>
  </svg>
)

// User-Defined Functions Diagram
const FunctionsDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">User-Defined Functions</text>
    <rect x="50" y="50" width="180" height="70" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="140" y="72" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Scalar Function</text>
    <text x="140" y="90" textAnchor="middle" fill="#93c5fd" fontSize="8">Returns single value</text>
    <text x="140" y="105" textAnchor="middle" fill="#93c5fd" fontSize="7">Used in expressions</text>
    <rect x="260" y="50" width="180" height="70" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="350" y="72" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Table-Valued</text>
    <text x="350" y="90" textAnchor="middle" fill="#86efac" fontSize="8">Returns result set</text>
    <text x="350" y="105" textAnchor="middle" fill="#86efac" fontSize="7">Used in FROM clause</text>
    <rect x="470" y="50" width="180" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="560" y="72" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Aggregate</text>
    <text x="560" y="90" textAnchor="middle" fill="#c4b5fd" fontSize="8">Custom aggregations</text>
    <text x="560" y="105" textAnchor="middle" fill="#c4b5fd" fontSize="7">GROUP BY support</text>
    <text x="350" y="145" textAnchor="middle" fill="#64748b" fontSize="9">DETERMINISTIC • RETURNS clause • No side effects • Reusable logic</text>
  </svg>
)

// Triggers Diagram
const TriggersDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Database Triggers</text>
    <rect x="50" y="50" width="150" height="55" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="125" y="72" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">BEFORE Trigger</text>
    <text x="125" y="90" textAnchor="middle" fill="#fca5a5" fontSize="7">Validate / Modify</text>
    <rect x="230" y="50" width="150" height="55" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="305" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">DML Operation</text>
    <text x="305" y="90" textAnchor="middle" fill="#fcd34d" fontSize="7">INSERT/UPDATE/DELETE</text>
    <rect x="410" y="50" width="150" height="55" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="485" y="72" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">AFTER Trigger</text>
    <text x="485" y="90" textAnchor="middle" fill="#86efac" fontSize="7">Audit / Cascade</text>
    <line x1="200" y1="77" x2="225" y2="77" stroke="#4ade80" strokeWidth="2"/>
    <line x1="380" y1="77" x2="405" y2="77" stroke="#4ade80" strokeWidth="2"/>
    <rect x="590" y="50" width="80" height="55" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="630" y="72" textAnchor="middle" fill="#a78bfa" fontSize="8" fontWeight="bold">INSTEAD</text>
    <text x="630" y="87" textAnchor="middle" fill="#c4b5fd" fontSize="7">OF</text>
    <rect x="150" y="120" width="400" height="40" rx="4" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="350" y="140" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">OLD.column / NEW.column access</text>
    <text x="350" y="155" textAnchor="middle" fill="#93c5fd" fontSize="7">Row-level vs Statement-level • Cascading considerations</text>
    <text x="350" y="175" textAnchor="middle" fill="#64748b" fontSize="9">Automatic execution • Audit logging • Data validation • Referential actions</text>
  </svg>
)

// Cursors Diagram
const CursorsDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Cursor Lifecycle</text>
    <rect x="50" y="55" width="100" height="45" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="100" y="82" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">DECLARE</text>
    <rect x="170" y="55" width="100" height="45" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="220" y="82" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">OPEN</text>
    <rect x="290" y="55" width="100" height="45" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="340" y="82" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">FETCH</text>
    <rect x="410" y="55" width="100" height="45" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="460" y="82" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">CLOSE</text>
    <rect x="530" y="55" width="120" height="45" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="590" y="82" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">DEALLOCATE</text>
    <line x1="150" y1="77" x2="165" y2="77" stroke="#4ade80" strokeWidth="2"/>
    <line x1="270" y1="77" x2="285" y2="77" stroke="#4ade80" strokeWidth="2"/>
    <path d="M 340 100 Q 340 120 340 130 Q 340 135 335 135 L 295 135 Q 290 135 290 130 L 290 100" stroke="#fbbf24" strokeWidth="1.5" fill="none" strokeDasharray="3"/>
    <text x="315" y="125" textAnchor="middle" fill="#fcd34d" fontSize="7">LOOP</text>
    <line x1="390" y1="77" x2="405" y2="77" stroke="#4ade80" strokeWidth="2"/>
    <line x1="510" y1="77" x2="525" y2="77" stroke="#4ade80" strokeWidth="2"/>
    <text x="350" y="155" textAnchor="middle" fill="#64748b" fontSize="9">Row-by-row processing • Prefer set-based operations when possible</text>
  </svg>
)

// Dynamic SQL Diagram
const DynamicSQLDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Dynamic SQL Execution</text>
    <rect x="50" y="50" width="180" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="140" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Build SQL String</text>
    <text x="140" y="90" textAnchor="middle" fill="#fcd34d" fontSize="7">Concatenation</text>
    <text x="140" y="105" textAnchor="middle" fill="#fcd34d" fontSize="7">+ Parameters</text>
    <rect x="260" y="50" width="180" height="70" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="350" y="72" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">EXECUTE IMMEDIATE</text>
    <text x="350" y="90" textAnchor="middle" fill="#86efac" fontSize="7">sp_executesql</text>
    <text x="350" y="105" textAnchor="middle" fill="#86efac" fontSize="7">USING bind vars</text>
    <rect x="470" y="50" width="180" height="70" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="560" y="72" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Runtime Execution</text>
    <text x="560" y="90" textAnchor="middle" fill="#93c5fd" fontSize="7">Parse → Plan</text>
    <text x="560" y="105" textAnchor="middle" fill="#93c5fd" fontSize="7">→ Execute</text>
    <line x1="230" y1="85" x2="255" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <line x1="440" y1="85" x2="465" y2="85" stroke="#4ade80" strokeWidth="2"/>
    <rect x="150" y="130" width="400" height="20" rx="4" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="1"/>
    <text x="350" y="145" textAnchor="middle" fill="#f87171" fontSize="9">Use parameterized queries to prevent SQL injection!</text>
  </svg>
)

// Packages Diagram
const PackagesDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Oracle Package Structure</text>
    <rect x="50" y="45" width="280" height="110" rx="6" fill="rgba(220, 38, 38, 0.2)" stroke="#dc2626" strokeWidth="2"/>
    <text x="190" y="65" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Package Specification</text>
    <text x="70" y="85" fill="#fca5a5" fontSize="8">PROCEDURE public_proc(...);</text>
    <text x="70" y="100" fill="#fca5a5" fontSize="8">FUNCTION public_func(...) RETURN;</text>
    <text x="70" y="115" fill="#fca5a5" fontSize="8">TYPE public_type IS ...;</text>
    <text x="70" y="130" fill="#fca5a5" fontSize="8">CONSTANT public_const := ...;</text>
    <text x="190" y="148" textAnchor="middle" fill="#fca5a5" fontSize="7">PUBLIC API</text>
    <rect x="370" y="45" width="280" height="110" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="510" y="65" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Package Body</text>
    <text x="390" y="85" fill="#93c5fd" fontSize="8">PROCEDURE private_helper(...);</text>
    <text x="390" y="100" fill="#93c5fd" fontSize="8">PROCEDURE public_proc(...) IS</text>
    <text x="390" y="115" fill="#93c5fd" fontSize="8">  BEGIN ... END;</text>
    <text x="390" y="130" fill="#93c5fd" fontSize="8">state_var NUMBER;</text>
    <text x="510" y="148" textAnchor="middle" fill="#93c5fd" fontSize="7">IMPLEMENTATION</text>
    <text x="350" y="175" textAnchor="middle" fill="#64748b" fontSize="9">Encapsulation • Session state • Overloading • Dependency management</text>
  </svg>
)

// Transactions in Procedures Diagram
const TransactionsProcDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Transaction Control in Procedures</text>
    <rect x="50" y="50" width="100" height="50" rx="6" fill="rgba(14, 165, 233, 0.3)" stroke="#0ea5e9" strokeWidth="2"/>
    <text x="100" y="80" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">BEGIN</text>
    <rect x="180" y="50" width="200" height="50" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="280" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">SQL Operations</text>
    <text x="280" y="88" textAnchor="middle" fill="#fcd34d" fontSize="7">SAVEPOINT for partial rollback</text>
    <rect x="410" y="40" width="100" height="35" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="460" y="62" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">COMMIT</text>
    <rect x="410" y="85" width="100" height="35" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="460" y="107" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">ROLLBACK</text>
    <rect x="540" y="50" width="120" height="50" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="600" y="72" textAnchor="middle" fill="#a78bfa" fontSize="8" fontWeight="bold">Isolation</text>
    <text x="600" y="88" textAnchor="middle" fill="#c4b5fd" fontSize="7">Level control</text>
    <line x1="150" y1="75" x2="175" y2="75" stroke="#4ade80" strokeWidth="2"/>
    <line x1="380" y1="65" x2="405" y2="57" stroke="#10b981" strokeWidth="2"/>
    <line x1="380" y1="85" x2="405" y2="102" stroke="#ef4444" strokeWidth="2"/>
    <text x="350" y="145" textAnchor="middle" fill="#64748b" fontSize="9">ACID • TRY...CATCH error handling • Keep transactions short</text>
  </svg>
)

// Debugging Diagram
const DebuggingDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Debugging Stored Procedures</text>
    <rect x="50" y="50" width="140" height="60" rx="6" fill="rgba(99, 102, 241, 0.3)" stroke="#6366f1" strokeWidth="2"/>
    <text x="120" y="72" textAnchor="middle" fill="#818cf8" fontSize="9" fontWeight="bold">PRINT/DEBUG</text>
    <text x="120" y="90" textAnchor="middle" fill="#a5b4fc" fontSize="7">Trace output</text>
    <rect x="210" y="50" width="140" height="60" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="280" y="72" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">IDE Debugger</text>
    <text x="280" y="90" textAnchor="middle" fill="#86efac" fontSize="7">Breakpoints/Step</text>
    <rect x="370" y="50" width="140" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="440" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Unit Testing</text>
    <text x="440" y="90" textAnchor="middle" fill="#fcd34d" fontSize="7">tSQLt/utPLSQL</text>
    <rect x="530" y="50" width="130" height="60" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="595" y="72" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Exec Plans</text>
    <text x="595" y="90" textAnchor="middle" fill="#fca5a5" fontSize="7">EXPLAIN ANALYZE</text>
    <text x="350" y="135" textAnchor="middle" fill="#64748b" fontSize="9">Log tables • CI/CD integration • Performance monitoring</text>
  </svg>
)

// SQL/PL-SQL syntax highlighter
const SyntaxHighlighter = ({ code }) => {
  const highlightCode = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    highlighted = highlighted.replace(/(--.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    highlighted = highlighted
      .replace(/\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|ON|AND|OR|NOT|IN|EXISTS|BETWEEN|LIKE|IS|NULL|AS|ORDER|BY|GROUP|HAVING|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|ALTER|DROP|INDEX|PRIMARY|KEY|FOREIGN|REFERENCES|UNIQUE|CONSTRAINT|DEFAULT|CASCADE|DISTINCT|UNION|ALL|CASE|WHEN|THEN|ELSE|END|WITH|OVER|PARTITION|BEGIN|DECLARE|EXCEPTION|RAISE|LOOP|EXIT|CURSOR|OPEN|CLOSE|FETCH|FOR|IF|ELSIF|PROCEDURE|FUNCTION|PACKAGE|BODY|RETURN|RETURNS|TYPE|RECORD|BULK|COLLECT|FORALL|EXECUTE|IMMEDIATE|TRIGGER|BEFORE|AFTER|EACH|ROW|PRAGMA|AUTONOMOUS_TRANSACTION|COMMIT|ROLLBACK|SAVEPOINT|OUT|INOUT|REPLACE|OR|RAISE_APPLICATION_ERROR|DBMS_OUTPUT|PUT_LINE|NO_DATA_FOUND|TOO_MANY_ROWS|DUP_VAL_ON_INDEX|OTHERS|SQLCODE|SQLERRM|ROWTYPE|NOTFOUND|FOUND|ISOPEN|ROWCOUNT|WHILE|CONTINUE|GOTO|LANGUAGE|PLPGSQL|VOLATILE|STABLE|IMMUTABLE|SECURITY|DEFINER|INVOKER|PERFORM|CALL|SIGNAL|SQLSTATE|DELIMITER|DETERMINISTIC|READS|SQL|DATA|MODIFIES|CONTAINS|LEAVE|ITERATE|HANDLER|CONDITION|REPEAT|UNTIL)\b/gi, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(NUMBER|VARCHAR2|VARCHAR|CHAR|DATE|TIMESTAMP|CLOB|BLOB|BOOLEAN|PLS_INTEGER|BINARY_INTEGER|SYS_REFCURSOR|INTEGER|INT|BIGINT|SMALLINT|NUMERIC|DECIMAL|REAL|FLOAT|DOUBLE|TEXT|SERIAL|BYTEA|JSON|JSONB|VOID|RECORD|SETOF|REGCLASS|INTERVAL)\b/gi, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #b5cea8;">$1</span>')

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

function StoredProcedures({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'stored-procedures',
      name: 'Stored Procedures',
      icon: '📜',
      color: '#8b5cf6',
      description: 'Precompiled SQL statements stored in the database for reusable business logic',
      diagram: StoredProceduresDiagram,
      details: [
        {
          name: 'Basic Syntax',
          explanation: 'CREATE PROCEDURE defines reusable SQL code blocks. Parameters can be IN (input), OUT (output), or INOUT (both). DELIMITER changes statement terminator for procedure body. BEGIN...END wraps multiple statements. CALL executes procedures. DROP PROCEDURE removes them.',
          codeExample: `-- Oracle stored procedure
CREATE OR REPLACE PROCEDURE update_salary(
  p_emp_id  IN  NUMBER,
  p_new_sal IN  NUMBER
) AS
BEGIN
  UPDATE employees
    SET salary = p_new_sal
    WHERE employee_id = p_emp_id;

  IF SQL%ROWCOUNT = 0 THEN
    RAISE_APPLICATION_ERROR(-20001,
      'Employee not found');
  END IF;
  COMMIT;
END update_salary;

-- Execute: CALL update_salary(101, 85000);`
        },
        {
          name: 'Parameter Types',
          explanation: 'IN parameters pass values into procedure (default). OUT parameters return values to caller. INOUT parameters both receive and return values. Use appropriate data types matching table columns. Default values provide flexibility. Named parameters improve readability.',
          codeExample: `-- PostgreSQL: IN, OUT, INOUT parameters
CREATE OR REPLACE PROCEDURE transfer_funds(
  IN  p_from_acct  INT,
  IN  p_to_acct    INT,
  IN  p_amount     NUMERIC,
  INOUT p_status   TEXT DEFAULT 'PENDING'
)
LANGUAGE plpgsql AS $$
BEGIN
  UPDATE accounts SET balance = balance - p_amount
    WHERE id = p_from_acct AND balance >= p_amount;
  IF NOT FOUND THEN
    p_status := 'FAILED: insufficient funds';
    RETURN;
  END IF;
  UPDATE accounts SET balance = balance + p_amount
    WHERE id = p_to_acct;
  p_status := 'SUCCESS';
END;
$$;`
        },
        {
          name: 'Control Flow',
          explanation: 'IF...THEN...ELSE for conditional logic. CASE statements for multiple conditions. WHILE, REPEAT, and LOOP for iteration. LEAVE exits loops early. ITERATE continues to next iteration. DECLARE defines local variables within procedures.',
          codeExample: `-- Oracle: control flow in a procedure
CREATE OR REPLACE PROCEDURE categorize_employees AS
  v_category VARCHAR2(20);
BEGIN
  FOR emp IN (SELECT employee_id, salary
              FROM employees) LOOP
    CASE
      WHEN emp.salary > 100000 THEN
        v_category := 'Senior';
      WHEN emp.salary > 60000 THEN
        v_category := 'Mid-Level';
      ELSE
        v_category := 'Junior';
    END CASE;

    UPDATE employees SET job_category = v_category
      WHERE employee_id = emp.employee_id;
  END LOOP;
  COMMIT;
END;`
        },
        {
          name: 'Error Handling',
          explanation: 'DECLARE HANDLER catches exceptions. SQLSTATE codes identify error types. CONTINUE handler proceeds after error. EXIT handler terminates procedure. SIGNAL raises custom errors. RESIGNAL re-throws exceptions. Use GET DIAGNOSTICS for error details.',
          codeExample: `-- PostgreSQL: exception handling
CREATE OR REPLACE PROCEDURE safe_insert_user(
  p_name  TEXT,
  p_email TEXT
)
LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO users(name, email)
    VALUES(p_name, p_email);

  RAISE NOTICE 'User % created', p_name;
EXCEPTION
  WHEN unique_violation THEN
    RAISE NOTICE 'Email % already exists', p_email;
  WHEN OTHERS THEN
    RAISE NOTICE 'Error: % %', SQLSTATE, SQLERRM;
    RAISE;  -- re-throw
END;
$$;`
        },
        {
          name: 'Performance Benefits',
          explanation: 'Precompiled execution plans reduce parsing overhead. Network traffic reduced with single call. Encapsulated logic prevents code duplication. Consistent execution across applications. Cached plans improve repeated execution. Reduced round trips to database server.'
        },
        {
          name: 'Security Considerations',
          explanation: 'DEFINER vs INVOKER security context. EXECUTE privilege controls who can run. SQL SECURITY clause sets execution context. Avoid dynamic SQL injection risks. Parameterized queries within procedures. Limit database user permissions appropriately.'
        }
      ]
    },
    {
      id: 'functions',
      name: 'User-Defined Functions',
      icon: '🔧',
      color: '#3b82f6',
      description: 'Custom functions that return values and can be used in SQL expressions',
      diagram: FunctionsDiagram,
      details: [
        {
          name: 'Scalar Functions',
          explanation: 'Return single value of any data type. Can be used in SELECT, WHERE, and expressions. DETERMINISTIC keyword indicates same input always gives same output. RETURNS clause specifies return type. Must contain RETURN statement. No side effects allowed in some databases.',
          codeExample: `-- Oracle: scalar function
CREATE OR REPLACE FUNCTION calc_tax(
  p_salary NUMBER
) RETURN NUMBER DETERMINISTIC AS
BEGIN
  RETURN CASE
    WHEN p_salary > 100000 THEN p_salary * 0.30
    WHEN p_salary > 50000  THEN p_salary * 0.20
    ELSE p_salary * 0.10
  END;
END;

-- Use in queries:
-- SELECT name, salary, calc_tax(salary) AS tax
--   FROM employees;`
        },
        {
          name: 'Table-Valued Functions',
          explanation: 'Return result sets as virtual tables. Inline TVFs contain single SELECT statement. Multi-statement TVFs build result in table variable. Can be used in FROM clause like regular tables. Enable parameterized views. Useful for complex data transformations.',
          codeExample: `-- PostgreSQL: table-returning function
CREATE OR REPLACE FUNCTION get_dept_report(
  p_dept_id INT
) RETURNS TABLE (
  emp_name  TEXT,
  salary    NUMERIC,
  rank_num  BIGINT
)
LANGUAGE plpgsql STABLE AS $$
BEGIN
  RETURN QUERY
    SELECT e.name, e.salary,
      RANK() OVER (ORDER BY e.salary DESC)
    FROM employees e
    WHERE e.department_id = p_dept_id;
END;
$$;
-- SELECT * FROM get_dept_report(60);`
        },
        {
          name: 'Aggregate Functions',
          explanation: 'Custom aggregations beyond built-in SUM, AVG, etc. Implement init, iterate, merge, and terminate methods. Process groups of rows to produce single value. Can be used with GROUP BY. Consider memory usage for large datasets. Window function compatibility varies.',
          codeExample: `-- PostgreSQL: custom aggregate function
CREATE OR REPLACE FUNCTION concat_agg_fn(
  state TEXT, val TEXT
) RETURNS TEXT
LANGUAGE plpgsql IMMUTABLE AS $$
BEGIN
  IF state IS NULL OR state = '' THEN
    RETURN val;
  ELSE
    RETURN state || ', ' || val;
  END IF;
END;
$$;

CREATE AGGREGATE string_agg_custom(TEXT) (
  SFUNC = concat_agg_fn,
  STYPE = TEXT,
  INITCOND = ''
);
-- SELECT dept, string_agg_custom(name)
--   FROM employees GROUP BY dept;`
        },
        {
          name: 'Function vs Procedure',
          explanation: 'Functions return values, procedures execute actions. Functions callable in SQL expressions, procedures via CALL. Functions typically read-only, procedures can modify data. Functions must have RETURN, procedures optional OUT params. Choose based on use case and database constraints.',
          codeExample: `-- Oracle FUNCTION: returns a value, used in SQL
CREATE OR REPLACE FUNCTION get_full_name(
  p_emp_id NUMBER
) RETURN VARCHAR2 AS
  v_name VARCHAR2(100);
BEGIN
  SELECT first_name || ' ' || last_name INTO v_name
    FROM employees WHERE employee_id = p_emp_id;
  RETURN v_name;
END;
-- SELECT get_full_name(101) FROM dual;

-- Oracle PROCEDURE: performs action, uses OUT
CREATE OR REPLACE PROCEDURE delete_old_orders(
  p_days IN NUMBER, p_count OUT NUMBER
) AS
BEGIN
  DELETE FROM orders
    WHERE order_date < SYSDATE - p_days;
  p_count := SQL%ROWCOUNT;
  COMMIT;
END;`
        },
        {
          name: 'Built-in Function Types',
          explanation: 'String functions: CONCAT, SUBSTRING, TRIM, REPLACE. Numeric: ROUND, FLOOR, CEILING, ABS. Date/Time: NOW, DATEADD, DATEDIFF, FORMAT. Conversion: CAST, CONVERT, COALESCE, NULLIF. Aggregate: COUNT, SUM, AVG, MIN, MAX. Window: ROW_NUMBER, RANK, LAG, LEAD.'
        },
        {
          name: 'Performance Tuning',
          explanation: 'Avoid functions on indexed columns in WHERE (prevents index usage). Mark DETERMINISTIC when appropriate for caching. Inline simple logic instead of function calls in hot paths. Pre-compute values where possible. Monitor function execution in query plans.'
        }
      ]
    },
    {
      id: 'triggers',
      name: 'Triggers',
      icon: '⚡',
      color: '#ef4444',
      description: 'Automatic actions executed in response to data modifications',
      diagram: TriggersDiagram,
      details: [
        {
          name: 'Trigger Types',
          explanation: 'BEFORE triggers execute before the operation. AFTER triggers execute after the operation. INSTEAD OF triggers replace the operation (views). Row-level triggers fire for each row. Statement-level triggers fire once per statement. Choose based on timing requirements.',
          codeExample: `-- Oracle BEFORE trigger: auto-set timestamps
CREATE OR REPLACE TRIGGER trg_orders_before
  BEFORE INSERT OR UPDATE ON orders
  FOR EACH ROW
BEGIN
  IF INSERTING THEN
    :NEW.created_at := SYSDATE;
  END IF;
  :NEW.updated_at := SYSDATE;
END;

-- PostgreSQL equivalent:
-- CREATE OR REPLACE FUNCTION set_timestamp()
-- RETURNS TRIGGER LANGUAGE plpgsql AS $$
-- BEGIN
--   NEW.updated_at := NOW();
--   RETURN NEW;
-- END; $$;
-- CREATE TRIGGER trg_timestamp BEFORE UPDATE
--   ON orders FOR EACH ROW
--   EXECUTE FUNCTION set_timestamp();`
        },
        {
          name: 'DML Triggers',
          explanation: 'INSERT triggers capture new data. UPDATE triggers access OLD and NEW values. DELETE triggers preserve deleted data. Combine multiple events: INSERT OR UPDATE. Access affected rows via special references. Useful for auditing and validation.',
          codeExample: `-- PostgreSQL: audit trigger with OLD/NEW
CREATE OR REPLACE FUNCTION audit_changes()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_log(table_name, operation,
      old_data, new_data, changed_by)
    VALUES(TG_TABLE_NAME, 'UPDATE',
      row_to_json(OLD), row_to_json(NEW),
      current_user);
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO audit_log(table_name, operation,
      old_data, changed_by)
    VALUES(TG_TABLE_NAME, 'DELETE',
      row_to_json(OLD), current_user);
    RETURN OLD;
  END IF;
END; $$;

CREATE TRIGGER trg_emp_audit
  AFTER UPDATE OR DELETE ON employees
  FOR EACH ROW EXECUTE FUNCTION audit_changes();`
        },
        {
          name: 'DDL Triggers',
          explanation: 'Fire on schema changes: CREATE, ALTER, DROP. Prevent unauthorized structural changes. Log schema modifications for compliance. Database-level vs server-level scope. Useful for change management and governance. Cannot be INSTEAD OF type.',
          codeExample: `-- PostgreSQL: event trigger for DDL auditing
CREATE OR REPLACE FUNCTION log_ddl_event()
RETURNS event_trigger LANGUAGE plpgsql AS $$
DECLARE
  obj RECORD;
BEGIN
  FOR obj IN SELECT * FROM
    pg_event_trigger_ddl_commands() LOOP
    INSERT INTO ddl_log(
      event, object_type, schema_name,
      object_name, command_tag
    ) VALUES (
      TG_EVENT, obj.object_type,
      obj.schema_name,
      obj.object_identity, obj.command_tag
    );
  END LOOP;
END; $$;

CREATE EVENT TRIGGER trg_ddl_audit
  ON ddl_command_end
  EXECUTE FUNCTION log_ddl_event();`
        },
        {
          name: 'Audit Triggers',
          explanation: 'Capture who, what, when for all changes. Store OLD and NEW values in audit tables. Include session info: user, timestamp, client. Implement soft deletes instead of hard deletes. Create audit trail for compliance (SOX, HIPAA). Consider performance impact of comprehensive logging.',
          codeExample: `-- Oracle: comprehensive audit trigger
CREATE OR REPLACE TRIGGER trg_salary_audit
  AFTER UPDATE OF salary ON employees
  FOR EACH ROW
DECLARE
  PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN
  INSERT INTO salary_audit(
    employee_id, old_salary, new_salary,
    changed_by, changed_at, ip_address
  ) VALUES (
    :OLD.employee_id,
    :OLD.salary, :NEW.salary,
    USER, SYSDATE,
    SYS_CONTEXT('USERENV', 'IP_ADDRESS')
  );
  COMMIT;
END;`
        },
        {
          name: 'Cascading Actions',
          explanation: 'Triggers can cause other triggers to fire. Set recursion limits to prevent infinite loops. Understand execution order with multiple triggers. Document trigger chains carefully. Test cascading behavior thoroughly. Consider foreign key CASCADE as alternative.'
        },
        {
          name: 'Best Practices',
          explanation: 'Keep trigger logic simple and fast. Avoid complex business logic in triggers. Document all triggers clearly. Test thoroughly with edge cases. Monitor trigger performance impact. Consider alternatives: constraints, application logic, scheduled jobs.'
        }
      ]
    },
    {
      id: 'cursors',
      name: 'Cursors',
      icon: '🔄',
      color: '#10b981',
      description: 'Row-by-row processing for complex procedural logic',
      diagram: CursorsDiagram,
      details: [
        {
          name: 'Cursor Basics',
          explanation: 'DECLARE cursor defines SELECT statement. OPEN executes the query. FETCH retrieves rows one at a time. CLOSE releases resources. DEALLOCATE removes cursor definition. Use loop with NOT FOUND handler for iteration.',
          codeExample: `-- Oracle: explicit cursor lifecycle
DECLARE
  CURSOR c_orders IS
    SELECT order_id, total_amount
      FROM orders WHERE status = 'PENDING';
  v_rec c_orders%ROWTYPE;
BEGIN
  OPEN c_orders;
  LOOP
    FETCH c_orders INTO v_rec;
    EXIT WHEN c_orders%NOTFOUND;
    -- Process each pending order
    UPDATE orders SET status = 'PROCESSING'
      WHERE order_id = v_rec.order_id;
  END LOOP;
  CLOSE c_orders;
  COMMIT;
END;`
        },
        {
          name: 'Cursor Types',
          explanation: 'STATIC cursors work on snapshot (insensitive to changes). DYNAMIC cursors reflect concurrent changes. KEYSET cursors detect updates but not inserts. FORWARD_ONLY cannot scroll backward. SCROLL cursors support FIRST, LAST, PRIOR, NEXT, ABSOLUTE, RELATIVE.',
          codeExample: `-- PostgreSQL: SCROLL cursor with navigation
CREATE OR REPLACE FUNCTION browse_products()
RETURNS VOID LANGUAGE plpgsql AS $$
DECLARE
  cur SCROLL CURSOR FOR
    SELECT name, price FROM products
    ORDER BY price DESC;
  v_name TEXT; v_price NUMERIC;
BEGIN
  OPEN cur;
  -- Move to first row
  FETCH FIRST FROM cur INTO v_name, v_price;
  RAISE NOTICE 'Most expensive: % ($%)', v_name, v_price;
  -- Jump to last row
  FETCH LAST FROM cur INTO v_name, v_price;
  RAISE NOTICE 'Cheapest: % ($%)', v_name, v_price;
  CLOSE cur;
END; $$;`
        },
        {
          name: 'Cursor Attributes',
          explanation: 'FOUND indicates successful fetch. NOT FOUND signals end of result set. ROW_COUNT shows affected rows. ISOPEN checks cursor state. Use attributes in CONTINUE/EXIT handlers. Different syntax across database systems.',
          codeExample: `-- Oracle: using cursor attributes
DECLARE
  CURSOR c_emps IS
    SELECT employee_id, salary FROM employees
      WHERE department_id = 60;
  v_id  NUMBER;
  v_sal NUMBER;
BEGIN
  OPEN c_emps;
  IF c_emps%ISOPEN THEN
    DBMS_OUTPUT.PUT_LINE('Cursor is open');
  END IF;

  LOOP
    FETCH c_emps INTO v_id, v_sal;
    EXIT WHEN c_emps%NOTFOUND;
  END LOOP;

  DBMS_OUTPUT.PUT_LINE(
    'Processed ' || c_emps%ROWCOUNT || ' rows');
  CLOSE c_emps;
END;`
        },
        {
          name: 'Performance Considerations',
          explanation: 'Cursors are slower than set-based operations. Process in batches to reduce overhead. Use server-side cursors for large datasets. Avoid cursors for simple UPDATE/DELETE. Consider BULK COLLECT for efficiency. Set-based thinking preferred in SQL.'
        },
        {
          name: 'When to Use Cursors',
          explanation: 'Row-by-row processing requirements. Calling procedures for each row. Complex logic not expressible in SQL. ETL transformations with conditional logic. Processing hierarchical data. Always prefer set-based operations when possible.'
        },
        {
          name: 'Cursor Alternatives',
          explanation: 'CTEs and window functions for many cursor patterns. MERGE statement for upsert operations. Temporary tables with set operations. Application-level processing for complex logic. Bulk operations with batch processing. Table variables for intermediate results.'
        }
      ]
    },
    {
      id: 'dynamic-sql',
      name: 'Dynamic SQL',
      icon: '🔨',
      color: '#f59e0b',
      description: 'Building and executing SQL statements at runtime',
      diagram: DynamicSQLDiagram,
      details: [
        {
          name: 'EXECUTE IMMEDIATE',
          explanation: 'Runs SQL string directly. No result set handling. Good for DDL and simple DML. String concatenation builds statement. Variable substitution with placeholders. Different syntax: EXEC, EXECUTE, sp_executesql.',
          codeExample: `-- Oracle: EXECUTE IMMEDIATE with bind vars
DECLARE
  v_table VARCHAR2(30) := 'temp_report';
  v_count NUMBER;
BEGIN
  -- DDL: no bind variables possible
  EXECUTE IMMEDIATE
    'CREATE TABLE ' || v_table
    || ' (id NUMBER, val VARCHAR2(100))';

  -- DML with USING for bind variables
  EXECUTE IMMEDIATE
    'INSERT INTO ' || v_table
    || ' VALUES (:1, :2)'
    USING 1, 'Hello World';

  -- Query with INTO
  EXECUTE IMMEDIATE
    'SELECT COUNT(*) FROM ' || v_table
    INTO v_count;

  DBMS_OUTPUT.PUT_LINE('Rows: ' || v_count);
  EXECUTE IMMEDIATE 'DROP TABLE ' || v_table;
END;`
        },
        {
          name: 'Parameterized Dynamic SQL',
          explanation: 'Use parameters instead of string concatenation. Prevents SQL injection attacks. Enables plan caching and reuse. sp_executesql in SQL Server, USING in Oracle. Named vs positional parameters. Type safety with explicit declarations.',
          codeExample: `-- PostgreSQL: parameterized dynamic SQL
CREATE OR REPLACE FUNCTION search_employees(
  p_column TEXT,
  p_value  TEXT
) RETURNS SETOF employees
LANGUAGE plpgsql STABLE AS $$
BEGIN
  -- Safe: column validated against whitelist
  IF p_column NOT IN ('name', 'email', 'dept') THEN
    RAISE EXCEPTION 'Invalid column: %', p_column;
  END IF;

  -- $1 is a bind parameter (safe from injection)
  RETURN QUERY EXECUTE
    format('SELECT * FROM employees WHERE %I = $1',
           p_column)
    USING p_value;
END;
$$;`
        },
        {
          name: 'Dynamic Pivoting',
          explanation: 'Build PIVOT columns from data values. Query metadata for column list. Generate column aliases dynamically. Useful for reporting with variable dimensions. Combine with temporary tables. Handle NULL values in pivot columns.',
          codeExample: `-- PostgreSQL: dynamic pivot with crosstab
CREATE OR REPLACE FUNCTION pivot_sales_report()
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
  v_columns TEXT;
  v_sql     TEXT;
BEGIN
  -- Build dynamic column list from data
  SELECT string_agg(
    DISTINCT format('SUM(CASE WHEN month = %L
      THEN amount END) AS %I', month, month),
    ', ')
    INTO v_columns
    FROM monthly_sales;

  v_sql := format(
    'SELECT product, %s FROM monthly_sales
     GROUP BY product ORDER BY product',
    v_columns);

  -- Execute or return the SQL
  RAISE NOTICE '%', v_sql;
  RETURN v_sql;
END;
$$;`
        },
        {
          name: 'Dynamic Table Names',
          explanation: 'Build table names from variables. Cannot use parameters for identifiers. Quote identifiers to prevent injection. Validate table names against catalog. Use QUOTENAME/QUOTE_IDENT functions. Consider security implications carefully.'
        },
        {
          name: 'SQL Injection Prevention',
          explanation: 'Always use parameterized queries for values. Validate and whitelist identifiers. Escape special characters properly. Least privilege database accounts. Input validation at application layer. Regular security audits and code reviews.'
        },
        {
          name: 'Debugging Dynamic SQL',
          explanation: 'Print statement before execution for review. Use TRY...CATCH for error details. Log generated SQL for troubleshooting. Test with representative data. Check execution plans of generated queries. Consider unit testing frameworks.'
        }
      ]
    },
    {
      id: 'packages',
      name: 'Packages (Oracle/PL/SQL)',
      icon: '📦',
      color: '#dc2626',
      description: 'Grouping related procedures, functions, and variables together',
      diagram: PackagesDiagram,
      details: [
        {
          name: 'Package Structure',
          explanation: 'Specification declares public interface. Body contains implementation. Separation enables information hiding. Compile specification and body separately. Forward declarations for mutual recursion. Package state persists for session duration.',
          codeExample: `-- Oracle Package: spec + body
CREATE OR REPLACE PACKAGE inventory_pkg AS
  -- Public constants
  c_low_stock CONSTANT NUMBER := 10;
  -- Public procedures
  PROCEDURE restock(p_product_id NUMBER, p_qty NUMBER);
  FUNCTION check_stock(p_product_id NUMBER)
    RETURN NUMBER;
END inventory_pkg;

CREATE OR REPLACE PACKAGE BODY inventory_pkg AS
  PROCEDURE restock(p_product_id NUMBER,
                    p_qty NUMBER) IS
  BEGIN
    UPDATE products SET quantity = quantity + p_qty
      WHERE product_id = p_product_id;
    COMMIT;
  END;

  FUNCTION check_stock(p_product_id NUMBER)
    RETURN NUMBER IS v_qty NUMBER;
  BEGIN
    SELECT quantity INTO v_qty FROM products
      WHERE product_id = p_product_id;
    RETURN v_qty;
  END;
END inventory_pkg;`
        },
        {
          name: 'Package Specification',
          explanation: 'Declares public procedures and functions. Defines public types and constants. Exposes cursor declarations. Acts as API contract. Changes require recompilation of dependents. Keep specification stable when possible.',
          codeExample: `CREATE OR REPLACE PACKAGE user_mgmt AS
  -- Public type
  TYPE user_rec IS RECORD (
    user_id   NUMBER,
    username  VARCHAR2(50),
    email     VARCHAR2(100)
  );
  TYPE user_list IS TABLE OF user_rec;

  -- Public API
  PROCEDURE create_user(
    p_name VARCHAR2, p_email VARCHAR2);
  PROCEDURE deactivate_user(p_user_id NUMBER);
  FUNCTION find_by_email(p_email VARCHAR2)
    RETURN user_rec;
  FUNCTION get_active_count RETURN NUMBER;
END user_mgmt;`
        },
        {
          name: 'Package Body',
          explanation: 'Implements declared subprograms. Contains private helper procedures. Initialization section runs once per session. Private variables maintain state. Can be recompiled without affecting specification. Implementation changes are transparent to callers.',
          codeExample: `CREATE OR REPLACE PACKAGE BODY user_mgmt AS
  -- Private: not visible outside package
  v_cache_count NUMBER := NULL;

  PROCEDURE log_action(p_msg VARCHAR2) IS
    PRAGMA AUTONOMOUS_TRANSACTION;
  BEGIN
    INSERT INTO activity_log(msg, ts)
      VALUES(p_msg, SYSDATE);
    COMMIT;
  END;

  -- Public implementations
  PROCEDURE create_user(
    p_name VARCHAR2, p_email VARCHAR2
  ) IS
  BEGIN
    INSERT INTO users(username, email, active)
      VALUES(p_name, p_email, 'Y');
    log_action('Created user: ' || p_name);
    v_cache_count := NULL; -- invalidate cache
    COMMIT;
  END;
  -- ... other implementations
END user_mgmt;`
        },
        {
          name: 'Package Variables',
          explanation: 'Package-level variables persist across calls. Private variables encapsulate state. Public constants shared across sessions. Consider memory implications. Use for caching frequently accessed data. Reset with package recompilation.'
        },
        {
          name: 'Overloading',
          explanation: 'Multiple procedures with same name, different parameters. Resolved by parameter count and types. Enables flexible APIs. Common pattern: different input formats. Cannot overload on return type alone. Document overloaded variants clearly.'
        },
        {
          name: 'Package Dependencies',
          explanation: 'Track dependencies with DBA_DEPENDENCIES. Invalid packages require recompilation. CASCADE option for dependent objects. Minimize cross-package dependencies. Use abstract interfaces where possible. Plan deployment order carefully.'
        }
      ]
    },
    {
      id: 'transactions',
      name: 'Transactions in Procedures',
      icon: '🔐',
      color: '#0ea5e9',
      description: 'Managing transaction boundaries within stored procedures',
      diagram: TransactionsProcDiagram,
      details: [
        {
          name: 'Transaction Control',
          explanation: 'BEGIN TRANSACTION starts explicit transaction. COMMIT saves changes permanently. ROLLBACK undoes all changes. SAVEPOINT creates intermediate restore point. ROLLBACK TO SAVEPOINT partial rollback. Auto-commit behavior varies by database.',
          codeExample: `-- Oracle: transaction with savepoints
BEGIN
  INSERT INTO orders(id, customer_id, total)
    VALUES(1001, 42, 250.00);
  SAVEPOINT after_order;

  INSERT INTO order_items(order_id, product_id, qty)
    VALUES(1001, 10, 2);
  INSERT INTO order_items(order_id, product_id, qty)
    VALUES(1001, 20, 1);

  -- Problem with last item? Partial rollback
  -- ROLLBACK TO after_order;

  COMMIT;
END;`
        },
        {
          name: 'Nested Transactions',
          explanation: 'Some databases support true nesting. SQL Server uses @@TRANCOUNT. Oracle savepoints simulate nesting. Inner commit may not persist until outer commits. Understand your database behavior. Test rollback scenarios thoroughly.',
          codeExample: `-- PostgreSQL: savepoints simulate nesting
CREATE OR REPLACE PROCEDURE process_batch()
LANGUAGE plpgsql AS $$
BEGIN
  -- Outer operation
  INSERT INTO batch_log(msg) VALUES('Start');

  -- Inner "transaction" via savepoint
  BEGIN
    SAVEPOINT inner_work;
    INSERT INTO results(val) VALUES('data1');
    -- If this fails, only inner work undone
  EXCEPTION WHEN OTHERS THEN
    ROLLBACK TO SAVEPOINT inner_work;
    INSERT INTO batch_log(msg)
      VALUES('Inner failed: ' || SQLERRM);
  END;

  INSERT INTO batch_log(msg) VALUES('Done');
  COMMIT;
END; $$;`
        },
        {
          name: 'Error Handling with Transactions',
          explanation: 'Wrap transaction in TRY...CATCH. Rollback in exception handler. Check @@TRANCOUNT before rollback. Avoid orphaned transactions. Log errors before rollback. Re-raise or return error information.',
          codeExample: `-- Oracle: exception handling with rollback
CREATE OR REPLACE PROCEDURE place_order(
  p_cust_id NUMBER, p_product_id NUMBER
) AS
  v_stock NUMBER;
BEGIN
  SELECT quantity INTO v_stock FROM products
    WHERE product_id = p_product_id FOR UPDATE;

  IF v_stock < 1 THEN
    RAISE_APPLICATION_ERROR(-20010, 'Out of stock');
  END IF;

  UPDATE products SET quantity = quantity - 1
    WHERE product_id = p_product_id;
  INSERT INTO orders(customer_id, product_id)
    VALUES(p_cust_id, p_product_id);
  COMMIT;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    RAISE;  -- re-throw to caller
END;`
        },
        {
          name: 'Isolation Levels',
          explanation: 'READ UNCOMMITTED allows dirty reads. READ COMMITTED default in most databases. REPEATABLE READ prevents non-repeatable reads. SERIALIZABLE highest isolation. SET TRANSACTION ISOLATION LEVEL per session. Consider locking implications.'
        },
        {
          name: 'Distributed Transactions',
          explanation: 'Span multiple databases or resources. Two-phase commit protocol. Coordinator manages participants. Increased complexity and latency. Consider eventual consistency alternatives. XA transactions in enterprise scenarios.'
        },
        {
          name: 'Performance Impact',
          explanation: 'Long transactions hold locks longer. Keep transactions short and focused. Batch large operations. Avoid user interaction during transactions. Monitor lock waits and deadlocks. Consider optimistic concurrency for read-heavy workloads.'
        }
      ]
    },
    {
      id: 'debugging',
      name: 'Debugging & Testing',
      icon: '🐛',
      color: '#6366f1',
      description: 'Techniques for debugging and testing stored procedures',
      diagram: DebuggingDiagram,
      details: [
        {
          name: 'Print Debugging',
          explanation: 'PRINT/DBMS_OUTPUT for trace messages. Output variable values at checkpoints. Show execution flow through procedure. Conditional debugging with debug flag. Remember to remove before production. Capture output in log tables for async review.',
          codeExample: `-- Oracle: DBMS_OUTPUT for tracing
CREATE OR REPLACE PROCEDURE debug_example(
  p_dept_id NUMBER
) AS
  v_count NUMBER;
  v_debug BOOLEAN := TRUE;
BEGIN
  IF v_debug THEN
    DBMS_OUTPUT.PUT_LINE(
      'START: dept=' || p_dept_id
      || ' time=' || TO_CHAR(SYSDATE, 'HH24:MI:SS'));
  END IF;

  SELECT COUNT(*) INTO v_count FROM employees
    WHERE department_id = p_dept_id;

  IF v_debug THEN
    DBMS_OUTPUT.PUT_LINE('Found ' || v_count || ' emps');
  END IF;
END;
-- SET SERVEROUTPUT ON; EXEC debug_example(60);`
        },
        {
          name: 'IDE Debugging',
          explanation: 'SQL Server Management Studio debugger. Oracle SQL Developer debugging. Set breakpoints in procedure code. Step through execution line by line. Inspect variable values. Watch expressions for complex debugging.'
        },
        {
          name: 'Unit Testing',
          explanation: 'tSQLt framework for SQL Server. utPLSQL for Oracle. Create test procedures with assertions. Setup and teardown for test data. Mock external dependencies. Integrate with CI/CD pipelines.',
          codeExample: `-- Oracle utPLSQL: unit test example
CREATE OR REPLACE PACKAGE test_inventory AS
  -- %suite(Inventory Tests)
  -- %test(Restock increases quantity)
  PROCEDURE test_restock;
END;

CREATE OR REPLACE PACKAGE BODY test_inventory AS
  PROCEDURE test_restock IS
    v_before NUMBER;
    v_after  NUMBER;
  BEGIN
    SELECT quantity INTO v_before FROM products
      WHERE product_id = 1;

    inventory_pkg.restock(1, 10);

    SELECT quantity INTO v_after FROM products
      WHERE product_id = 1;
    -- Assert new qty = old + 10
    IF v_after != v_before + 10 THEN
      RAISE_APPLICATION_ERROR(-20999,
        'Expected ' || (v_before+10)
        || ' got ' || v_after);
    END IF;
    ROLLBACK; -- cleanup test data
  END;
END;`
        },
        {
          name: 'Execution Plans',
          explanation: 'Analyze query plans within procedures. EXPLAIN/EXPLAIN ANALYZE for statement plans. Identify expensive operations. Check index usage. Monitor actual vs estimated rows. Plan cache behavior affects performance.'
        },
        {
          name: 'Logging Patterns',
          explanation: 'Log table for procedure execution history. Record input parameters and timing. Log errors with full context. Implement log levels (DEBUG, INFO, ERROR). Periodic log cleanup. Consider async logging for performance.'
        },
        {
          name: 'Common Issues',
          explanation: 'Parameter sniffing causes plan variability. NULL handling edge cases. Implicit type conversions. Transaction scope confusion. Cursor not closed on error. Division by zero and overflow. Off-by-one in loops.'
        }
      ]
    }
  ]

  useVoiceConceptNavigation(concepts, setSelectedConceptIndex, setSelectedDetailIndex)

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
      { name: 'Databases', icon: '🗃️', onClick: onBack }
    ]

    if (selectedConcept) {
      stack.push({ name: 'Stored Procedures', icon: '📜', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'Stored Procedures', icon: '📜' })
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
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #93c5fd, #60a5fa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(59, 130, 246, 0.2)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '0.5rem',
    color: '#60a5fa',
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
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            ← Back to Databases
          </button>
          <h1 style={titleStyle}>Stored Procedures</h1>
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
          colors={DATABASE_COLORS}
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
        primaryColor={DATABASE_COLORS.primary}
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
              colors={DATABASE_COLORS}
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
              const DiagramComponent = detail.diagram || selectedConcept.diagram
              return (
                <div>
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{detail.name}</h3>
                  {DiagramComponent && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                      <DiagramComponent />
                    </div>
                  )}
                  <p style={{ color: '#e2e8f0', lineHeight: '1.8', marginBottom: '1rem', background: colorScheme.bg, border: `1px solid ${colorScheme.border}`, borderRadius: '0.5rem', padding: '1rem', textAlign: 'left' }}>{detail.explanation}</p>
                  {detail.codeExample && (
                    <div style={{
                      backgroundColor: '#1e293b',
                      padding: '1.5rem',
                      borderRadius: '0.5rem',
                      borderLeft: `4px solid ${selectedConcept.color}`,
                      overflow: 'auto',
                      marginTop: '1rem'
                    }}>
                      <SyntaxHighlighter code={detail.codeExample} />
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

export default StoredProcedures

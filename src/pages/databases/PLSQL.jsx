import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

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

// PL/SQL Block Structure Diagram
const PLSQLBlockDiagram = () => (
  <svg viewBox="0 0 700 180" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">PL/SQL Block Structure</text>
    <rect x="150" y="40" width="400" height="120" rx="8" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2"/>
    <rect x="170" y="50" width="360" height="25" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="350" y="68" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">DECLARE (optional) - Variables, cursors, types</text>
    <rect x="170" y="80" width="360" height="35" rx="4" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="1"/>
    <text x="350" y="103" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">BEGIN (required) - Executable statements</text>
    <rect x="170" y="120" width="360" height="25" rx="4" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="1"/>
    <text x="350" y="138" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">EXCEPTION (optional) - Error handlers</text>
    <text x="350" y="155" textAnchor="middle" fill="#60a5fa" fontSize="8">END;</text>
    <text x="350" y="175" textAnchor="middle" fill="#64748b" fontSize="9">Anonymous blocks • Named blocks (procedures/functions) • Nested blocks</text>
  </svg>
)

// Procedures & Functions Diagram
const ProcFuncDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Procedures vs Functions</text>
    <rect x="50" y="50" width="280" height="80" rx="6" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2"/>
    <text x="190" y="72" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">PROCEDURE</text>
    <text x="190" y="92" textAnchor="middle" fill="#86efac" fontSize="8">Performs actions</text>
    <text x="190" y="107" textAnchor="middle" fill="#86efac" fontSize="8">OUT parameters for returns</text>
    <text x="190" y="122" textAnchor="middle" fill="#86efac" fontSize="7">CALL / EXECUTE to invoke</text>
    <rect x="370" y="50" width="280" height="80" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="510" y="72" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">FUNCTION</text>
    <text x="510" y="92" textAnchor="middle" fill="#93c5fd" fontSize="8">Returns a value</text>
    <text x="510" y="107" textAnchor="middle" fill="#93c5fd" fontSize="8">Use in SQL expressions</text>
    <text x="510" y="122" textAnchor="middle" fill="#93c5fd" fontSize="7">DETERMINISTIC for caching</text>
    <text x="350" y="150" textAnchor="middle" fill="#64748b" fontSize="9">IN / OUT / IN OUT parameters • Overloading in packages</text>
  </svg>
)

// Cursors Diagram
const PLSQLCursorDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">PL/SQL Cursors</text>
    <rect x="50" y="50" width="280" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="190" y="72" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Explicit Cursors</text>
    <text x="190" y="92" textAnchor="middle" fill="#c4b5fd" fontSize="8">DECLARE → OPEN → FETCH → CLOSE</text>
    <text x="190" y="107" textAnchor="middle" fill="#c4b5fd" fontSize="7">Full control • FOR loops</text>
    <rect x="370" y="50" width="280" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="510" y="72" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Implicit Cursors</text>
    <text x="510" y="92" textAnchor="middle" fill="#fcd34d" fontSize="8">SQL%ROWCOUNT, SQL%FOUND</text>
    <text x="510" y="107" textAnchor="middle" fill="#fcd34d" fontSize="7">Single-row queries • DML</text>
    <text x="350" y="145" textAnchor="middle" fill="#64748b" fontSize="9">REF CURSOR for dynamic queries • BULK COLLECT for performance</text>
  </svg>
)

// Exception Handling Diagram
const ExceptionDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">PL/SQL Exception Handling</text>
    <rect x="50" y="50" width="180" height="60" rx="6" fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth="2"/>
    <text x="140" y="72" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">Predefined</text>
    <text x="140" y="90" textAnchor="middle" fill="#fca5a5" fontSize="7">NO_DATA_FOUND</text>
    <text x="140" y="102" textAnchor="middle" fill="#fca5a5" fontSize="7">TOO_MANY_ROWS</text>
    <rect x="260" y="50" width="180" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="350" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">User-Defined</text>
    <text x="350" y="90" textAnchor="middle" fill="#fcd34d" fontSize="7">DECLARE exc EXCEPTION</text>
    <text x="350" y="102" textAnchor="middle" fill="#fcd34d" fontSize="7">RAISE exc</text>
    <rect x="470" y="50" width="180" height="60" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="560" y="72" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">WHEN OTHERS</text>
    <text x="560" y="90" textAnchor="middle" fill="#86efac" fontSize="7">SQLCODE, SQLERRM</text>
    <text x="560" y="102" textAnchor="middle" fill="#86efac" fontSize="7">RAISE_APPLICATION_ERROR</text>
    <text x="350" y="135" textAnchor="middle" fill="#64748b" fontSize="9">EXCEPTION_INIT pragma • Propagation hierarchy • RERAISE</text>
  </svg>
)

// Packages Diagram
const PLSQLPackageDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">PL/SQL Packages</text>
    <rect x="50" y="45" width="280" height="90" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="190" y="65" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Specification</text>
    <text x="190" y="85" textAnchor="middle" fill="#fca5a5" fontSize="8">Public API declaration</text>
    <text x="190" y="102" textAnchor="middle" fill="#fca5a5" fontSize="7">Types, constants, procedures</text>
    <text x="190" y="117" textAnchor="middle" fill="#fca5a5" fontSize="7">Visible to callers</text>
    <rect x="370" y="45" width="280" height="90" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="510" y="65" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Body</text>
    <text x="510" y="85" textAnchor="middle" fill="#93c5fd" fontSize="8">Implementation details</text>
    <text x="510" y="102" textAnchor="middle" fill="#93c5fd" fontSize="7">Private helpers</text>
    <text x="510" y="117" textAnchor="middle" fill="#93c5fd" fontSize="7">Session state variables</text>
    <text x="350" y="155" textAnchor="middle" fill="#64748b" fontSize="9">Encapsulation • Overloading • Initialization • Dependency tracking</text>
  </svg>
)

// Triggers Diagram
const PLSQLTriggerDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">PL/SQL Triggers</text>
    <rect x="50" y="50" width="180" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="140" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">DML Triggers</text>
    <text x="140" y="90" textAnchor="middle" fill="#fcd34d" fontSize="7">INSERT/UPDATE/DELETE</text>
    <text x="140" y="102" textAnchor="middle" fill="#fcd34d" fontSize="7">:OLD and :NEW</text>
    <rect x="260" y="50" width="180" height="60" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="350" y="72" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Timing</text>
    <text x="350" y="90" textAnchor="middle" fill="#c4b5fd" fontSize="7">BEFORE / AFTER</text>
    <text x="350" y="102" textAnchor="middle" fill="#c4b5fd" fontSize="7">FOR EACH ROW</text>
    <rect x="470" y="50" width="180" height="60" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="560" y="72" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Compound</text>
    <text x="560" y="90" textAnchor="middle" fill="#86efac" fontSize="7">Combines timing points</text>
    <text x="560" y="102" textAnchor="middle" fill="#86efac" fontSize="7">Avoid mutating table</text>
    <text x="350" y="135" textAnchor="middle" fill="#64748b" fontSize="9">Auditing • Validation • Derived columns • INSTEAD OF for views</text>
  </svg>
)

// Collections Diagram
const CollectionsDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">PL/SQL Collections</text>
    <rect x="50" y="50" width="180" height="70" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="140" y="72" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">Associative Array</text>
    <text x="140" y="90" textAnchor="middle" fill="#93c5fd" fontSize="7">INDEX BY VARCHAR2</text>
    <text x="140" y="105" textAnchor="middle" fill="#93c5fd" fontSize="7">Sparse • PL/SQL only</text>
    <rect x="260" y="50" width="180" height="70" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="350" y="72" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Nested Table</text>
    <text x="350" y="90" textAnchor="middle" fill="#86efac" fontSize="7">Unbounded</text>
    <text x="350" y="105" textAnchor="middle" fill="#86efac" fontSize="7">Can be column type</text>
    <rect x="470" y="50" width="180" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="560" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">VARRAY</text>
    <text x="560" y="90" textAnchor="middle" fill="#fcd34d" fontSize="7">Fixed max size</text>
    <text x="560" y="105" textAnchor="middle" fill="#fcd34d" fontSize="7">Dense • Ordered</text>
    <text x="350" y="145" textAnchor="middle" fill="#64748b" fontSize="9">BULK COLLECT • FORALL • Collection methods: COUNT, FIRST, LAST, DELETE</text>
  </svg>
)

// Dynamic SQL Diagram
const PLSQLDynamicDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Dynamic SQL in PL/SQL</text>
    <rect x="50" y="50" width="280" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="190" y="72" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">EXECUTE IMMEDIATE</text>
    <text x="190" y="92" textAnchor="middle" fill="#c4b5fd" fontSize="8">Simple dynamic SQL</text>
    <text x="190" y="107" textAnchor="middle" fill="#c4b5fd" fontSize="7">INTO / USING / RETURNING</text>
    <rect x="370" y="50" width="280" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="510" y="72" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">DBMS_SQL</text>
    <text x="510" y="92" textAnchor="middle" fill="#fcd34d" fontSize="8">Complex dynamic SQL</text>
    <text x="510" y="107" textAnchor="middle" fill="#fcd34d" fontSize="7">Parse • Bind • Execute • Fetch</text>
    <text x="350" y="145" textAnchor="middle" fill="#64748b" fontSize="9">Use bind variables to prevent injection • REF CURSOR for dynamic queries</text>
  </svg>
)

// Performance Diagram
const PLSQLPerfDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">PL/SQL Performance Optimization</text>
    <rect x="50" y="50" width="180" height="60" rx="6" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" strokeWidth="2"/>
    <text x="140" y="72" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">BULK COLLECT</text>
    <text x="140" y="90" textAnchor="middle" fill="#86efac" fontSize="7">Array fetching</text>
    <text x="140" y="102" textAnchor="middle" fill="#86efac" fontSize="7">LIMIT clause</text>
    <rect x="260" y="50" width="180" height="60" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="350" y="72" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">FORALL</text>
    <text x="350" y="90" textAnchor="middle" fill="#93c5fd" fontSize="7">Bulk DML</text>
    <text x="350" y="102" textAnchor="middle" fill="#93c5fd" fontSize="7">SAVE EXCEPTIONS</text>
    <rect x="470" y="50" width="180" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="560" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Native Compile</text>
    <text x="560" y="90" textAnchor="middle" fill="#fcd34d" fontSize="7">PLSQL_CODE_TYPE</text>
    <text x="560" y="102" textAnchor="middle" fill="#fcd34d" fontSize="7">10-30% faster</text>
    <text x="350" y="135" textAnchor="middle" fill="#64748b" fontSize="9">Reduce context switches • Use Result Cache • Avoid row-by-row processing</text>
  </svg>
)

// Advanced Features Diagram
const PLSQLAdvancedDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Advanced PL/SQL Features</text>
    <rect x="50" y="50" width="140" height="60" rx="6" fill="rgba(99, 102, 241, 0.3)" stroke="#6366f1" strokeWidth="2"/>
    <text x="120" y="72" textAnchor="middle" fill="#818cf8" fontSize="8" fontWeight="bold">Pipelined</text>
    <text x="120" y="90" textAnchor="middle" fill="#a5b4fc" fontSize="7">Stream rows</text>
    <rect x="210" y="50" width="140" height="60" rx="6" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="2"/>
    <text x="280" y="72" textAnchor="middle" fill="#f472b6" fontSize="8" fontWeight="bold">Parallel</text>
    <text x="280" y="90" textAnchor="middle" fill="#f9a8d4" fontSize="7">PARALLEL_ENABLE</text>
    <rect x="370" y="50" width="140" height="60" rx="6" fill="rgba(20, 184, 166, 0.3)" stroke="#14b8a6" strokeWidth="2"/>
    <text x="440" y="72" textAnchor="middle" fill="#2dd4bf" fontSize="8" fontWeight="bold">Result Cache</text>
    <text x="440" y="90" textAnchor="middle" fill="#5eead4" fontSize="7">Cache returns</text>
    <rect x="530" y="50" width="120" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="590" y="72" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">Edition</text>
    <text x="590" y="90" textAnchor="middle" fill="#fcd34d" fontSize="7">EBR upgrades</text>
    <text x="350" y="135" textAnchor="middle" fill="#64748b" fontSize="9">Object types • DBMS_SCHEDULER • UTL packages • Autonomous transactions</text>
  </svg>
)

function PLSQL({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'plsql-basics',
      name: 'PL/SQL Fundamentals',
      icon: '📦',
      color: '#3b82f6',
      description: 'Core PL/SQL concepts including blocks, variables, and control structures',
      diagram: PLSQLBlockDiagram,
      details: [
        {
          name: 'Block Structure',
          explanation: 'PL/SQL programs are organized into blocks with DECLARE (optional), BEGIN (required), EXCEPTION (optional), and END sections. Anonymous blocks execute immediately, while named blocks (procedures, functions) are stored and reusable. Blocks can be nested, with inner blocks having access to outer block variables.'
        },
        {
          name: 'Variables & Data Types',
          explanation: 'Declare variables in DECLARE section with name, datatype, and optional default value. Use %TYPE to inherit column data types and %ROWTYPE for entire row structures. Scalar types include NUMBER, VARCHAR2, DATE, BOOLEAN. Composite types include RECORD, TABLE, and VARRAY for complex data structures.'
        },
        {
          name: 'Control Structures',
          explanation: 'IF-THEN-ELSIF-ELSE for conditional logic. CASE statements for multi-way branching. LOOP, WHILE LOOP, and FOR LOOP for iteration. EXIT and EXIT WHEN to break from loops. CONTINUE and CONTINUE WHEN to skip iterations. GOTO for unconditional branching (use sparingly).'
        },
        {
          name: 'SQL in PL/SQL',
          explanation: 'Embed SELECT INTO for single-row queries. Use DML statements (INSERT, UPDATE, DELETE) directly. COMMIT and ROLLBACK for transaction control. SQL%ROWCOUNT returns affected rows. SQL%FOUND and SQL%NOTFOUND check query results. Implicit cursors handle single-row operations automatically.'
        },
        {
          name: 'Operators & Expressions',
          explanation: 'Arithmetic operators (+, -, *, /, **). Comparison operators (=, <>, <, >, <=, >=, BETWEEN, IN, LIKE, IS NULL). Logical operators (AND, OR, NOT). String concatenation with ||. NULL handling requires special attention as NULL propagates through expressions.'
        },
        {
          name: 'Comments & Documentation',
          explanation: 'Single-line comments with -- (double dash). Multi-line comments with /* */. Document program purpose, parameters, and return values. Use meaningful variable and procedure names. Follow naming conventions for maintainability. Add comments for complex business logic.'
        }
      ]
    },
    {
      id: 'procedures-functions',
      name: 'Procedures & Functions',
      icon: '⚙️',
      color: '#10b981',
      description: 'Creating and using stored procedures and functions',
      diagram: ProcFuncDiagram,
      details: [
        {
          name: 'Stored Procedures',
          explanation: 'CREATE OR REPLACE PROCEDURE for reusable code blocks. Parameters can be IN (input), OUT (output), or IN OUT (both). Use EXECUTE or CALL to invoke procedures. Procedures perform actions but do not return values directly. Encapsulate business logic for consistency and security.'
        },
        {
          name: 'Functions',
          explanation: 'CREATE OR REPLACE FUNCTION with RETURN clause. Must return a value of declared type. Can be used in SQL statements and expressions. Deterministic functions return same result for same inputs. Pipelined functions return rows incrementally for large datasets.'
        },
        {
          name: 'Parameter Modes',
          explanation: 'IN parameters are read-only (default mode). OUT parameters return values to caller. IN OUT parameters pass values both ways. Use NOCOPY hint for large parameters to avoid copying overhead. Default values make parameters optional. Named notation improves readability.'
        },
        {
          name: 'Overloading',
          explanation: 'Multiple procedures/functions with same name but different parameters. Compiler determines correct version based on argument types and count. Useful for handling different data types consistently. Only works within packages, not standalone procedures.'
        },
        {
          name: 'Invoker vs Definer Rights',
          explanation: 'AUTHID DEFINER (default) executes with creator permissions. AUTHID CURRENT_USER executes with caller permissions. Definer rights for consistent behavior, invoker rights for flexible security. Affects which schema objects are accessed and what privileges apply.'
        },
        {
          name: 'Dependencies & Invalidation',
          explanation: 'Stored programs depend on referenced objects. Changes to dependencies can invalidate programs. Use ALL_DEPENDENCIES to view dependency chains. DBMS_UTILITY.COMPILE_SCHEMA recompiles invalid objects. Fine-grained dependency tracking in Oracle 11g+ reduces invalidations.'
        }
      ]
    },
    {
      id: 'cursors',
      name: 'Cursors',
      icon: '🔄',
      color: '#8b5cf6',
      description: 'Working with explicit and implicit cursors for data retrieval',
      diagram: PLSQLCursorDiagram,
      details: [
        {
          name: 'Implicit Cursors',
          explanation: 'Oracle automatically creates cursors for DML and single-row SELECT. SQL%FOUND, SQL%NOTFOUND, SQL%ROWCOUNT, SQL%ISOPEN attributes. Simple to use but limited to single-row operations. TOO_MANY_ROWS exception if SELECT returns multiple rows.'
        },
        {
          name: 'Explicit Cursors',
          explanation: 'DECLARE cursor with SELECT statement. OPEN cursor to execute query. FETCH into variables or records. CLOSE cursor to release resources. Cursor attributes: %FOUND, %NOTFOUND, %ROWCOUNT, %ISOPEN. Use for multi-row result sets.'
        },
        {
          name: 'Cursor FOR Loops',
          explanation: 'Simplest way to process cursor results. Implicit OPEN, FETCH, CLOSE handling. Loop variable is implicitly declared as %ROWTYPE. Automatic exit when no more rows. Cannot use cursor attributes inside loop. Best practice for simple cursor processing.'
        },
        {
          name: 'Parameterized Cursors',
          explanation: 'Pass parameters to customize cursor query. Parameters defined in cursor declaration. Values provided when opening cursor. Enables cursor reuse with different filter criteria. Parameters are evaluated at OPEN time.'
        },
        {
          name: 'REF Cursors',
          explanation: 'Dynamic cursors that can point to different queries. SYS_REFCURSOR is a weak ref cursor type. Strong ref cursors have defined return type. Pass cursors between procedures. Return result sets to client applications. OPEN-FOR with dynamic SQL.'
        },
        {
          name: 'Cursor Variables',
          explanation: 'Cursor variables are pointers to cursor work areas. Can be passed as parameters. Support dynamic SQL with OPEN FOR. More flexible than static cursors. Memory efficient as they reference shared cursor cache.'
        }
      ]
    },
    {
      id: 'exception-handling',
      name: 'Exception Handling',
      icon: '🛡️',
      color: '#ef4444',
      description: 'Handling errors and exceptions in PL/SQL programs',
      diagram: ExceptionDiagram,
      details: [
        {
          name: 'Predefined Exceptions',
          explanation: 'NO_DATA_FOUND for empty SELECT INTO. TOO_MANY_ROWS for multi-row SELECT INTO. DUP_VAL_ON_INDEX for unique constraint violations. ZERO_DIVIDE for division by zero. VALUE_ERROR for conversion/size errors. INVALID_CURSOR for cursor operation errors.'
        },
        {
          name: 'User-Defined Exceptions',
          explanation: 'Declare exceptions in DECLARE section. RAISE to throw exception. Handle in EXCEPTION block with WHEN clause. Use PRAGMA EXCEPTION_INIT to associate with Oracle error numbers. Create meaningful exception names for business rules.'
        },
        {
          name: 'RAISE_APPLICATION_ERROR',
          explanation: 'Generate custom Oracle errors with error number (-20000 to -20999) and message. Propagates to calling application. More informative than generic exceptions. Include relevant context in error messages. Use error number ranges for categorization.'
        },
        {
          name: 'Exception Propagation',
          explanation: 'Unhandled exceptions propagate to enclosing block. WHEN OTHERS catches all exceptions. Use SQLCODE and SQLERRM to get error details. Re-raise with RAISE after logging. Outer blocks can handle inner block exceptions.'
        },
        {
          name: 'EXCEPTION_INIT Pragma',
          explanation: 'Associate user-defined exception with Oracle error code. Enable handling of specific Oracle errors by name. Syntax: PRAGMA EXCEPTION_INIT(exception_name, error_code). Makes code more readable than checking SQLCODE. Works with any Oracle error number.'
        },
        {
          name: 'Best Practices',
          explanation: 'Never use WHEN OTHERS without logging or re-raising. Log exception details for debugging. Use specific exception handlers before WHEN OTHERS. Avoid swallowing exceptions silently. Clean up resources in exception handlers. Consider transaction state when handling errors.'
        }
      ]
    },
    {
      id: 'packages',
      name: 'Packages',
      icon: '📚',
      color: '#f59e0b',
      description: 'Organizing code with packages for modularity and encapsulation',
      diagram: PLSQLPackageDiagram,
      details: [
        {
          name: 'Package Structure',
          explanation: 'Package specification declares public interface. Package body contains implementation. Specification compiled first, body can be changed independently. Public elements in spec, private elements only in body. Enables information hiding and modular design.'
        },
        {
          name: 'Package Specification',
          explanation: 'Declare types, variables, constants, cursors, procedures, and functions. Everything in spec is public and accessible. Forward declarations for procedures/functions. Acts as API contract. Changes require recompilation of dependent code.'
        },
        {
          name: 'Package Body',
          explanation: 'Implement procedures and functions declared in spec. Add private procedures and variables. Initialization section runs once per session. Can include private cursors and types. Body can change without affecting callers if spec unchanged.'
        },
        {
          name: 'Package State',
          explanation: 'Package variables persist for session duration. Initialized once when package first accessed. SERIALLY_REUSABLE pragma resets state between calls. Package state is session-specific, not shared. Use for caching and session-level settings.'
        },
        {
          name: 'Package Initialization',
          explanation: 'Code between BEGIN and END in body runs once. Initialize package variables and cache data. Executed when package first referenced. Handle exceptions in initialization section. Keep initialization lightweight for performance.'
        },
        {
          name: 'Built-in Packages',
          explanation: 'DBMS_OUTPUT for debugging messages. DBMS_SQL for dynamic SQL. DBMS_LOB for large object operations. UTL_FILE for file I/O. DBMS_SCHEDULER for job scheduling. DBMS_LOCK for application locks. Extensive Oracle-provided functionality.'
        }
      ]
    },
    {
      id: 'triggers',
      name: 'Triggers',
      icon: '⚡',
      color: '#14b8a6',
      description: 'Automating actions with database triggers',
      diagram: PLSQLTriggerDiagram,
      details: [
        {
          name: 'DML Triggers',
          explanation: 'Fire on INSERT, UPDATE, DELETE operations. BEFORE triggers validate or modify data. AFTER triggers for logging and cascading. Row-level (:NEW and :OLD) vs statement-level. Compound triggers combine multiple timing points. Use WHEN clause for conditional firing.'
        },
        {
          name: 'DDL Triggers',
          explanation: 'Fire on CREATE, ALTER, DROP statements. Monitor schema changes for auditing. Prevent unauthorized modifications. Access event attributes with ORA_DICT_OBJ_NAME, ORA_DICT_OBJ_TYPE. Useful for change tracking and security policies.'
        },
        {
          name: 'System Triggers',
          explanation: 'LOGON/LOGOFF for session tracking. STARTUP/SHUTDOWN for database events. SERVERERROR for error logging. DATABASE or SCHEMA level scope. Monitor and audit system-level activities. Useful for security and usage tracking.'
        },
        {
          name: 'INSTEAD OF Triggers',
          explanation: 'Execute instead of DML on views. Enable updates on complex views. Handle multi-table updates through single view. Determine what base table changes are needed. Make non-updatable views updatable.'
        },
        {
          name: 'Compound Triggers',
          explanation: 'Single trigger with multiple timing points. BEFORE STATEMENT, BEFORE EACH ROW, AFTER EACH ROW, AFTER STATEMENT. Share state between timing points. Solve mutating table problems. More efficient than multiple separate triggers.'
        },
        {
          name: 'Trigger Best Practices',
          explanation: 'Keep triggers small and fast. Avoid complex business logic in triggers. Beware of cascading trigger effects. Document trigger dependencies. Consider performance impact on DML. Use autonomous transactions for logging if needed.'
        }
      ]
    },
    {
      id: 'collections',
      name: 'Collections',
      icon: '📋',
      color: '#6366f1',
      description: 'Working with arrays and collection types',
      diagram: CollectionsDiagram,
      details: [
        {
          name: 'Associative Arrays',
          explanation: 'INDEX BY tables with flexible indexing. Can use PLS_INTEGER or VARCHAR2 as index. Sparse - elements do not need to be contiguous. No constructor needed, auto-initialized. Methods: EXISTS, COUNT, FIRST, LAST, PRIOR, NEXT, DELETE. Ideal for lookup tables and caching.'
        },
        {
          name: 'Nested Tables',
          explanation: 'Unbounded collections stored in database. Initialize with constructor function. Extend to add elements. Dense initially but can have gaps after DELETE. Can be column type in tables. Support set operations (MULTISET UNION, INTERSECT, EXCEPT).'
        },
        {
          name: 'VARRAYs',
          explanation: 'Variable-size arrays with maximum bound. Dense - no gaps in elements. Can be column type in tables. Less flexible than nested tables. Order is preserved. Good for small, bounded lists.'
        },
        {
          name: 'Collection Methods',
          explanation: 'COUNT returns number of elements. FIRST and LAST return boundary indexes. EXISTS checks if element exists. EXTEND adds elements to end. TRIM removes from end. DELETE removes specific elements. PRIOR and NEXT for navigation.'
        },
        {
          name: 'Bulk Operations',
          explanation: 'BULK COLLECT fetches multiple rows into collection. FORALL performs bulk DML operations. Significantly faster than row-by-row processing. SAVE EXCEPTIONS continues on errors. SQL%BULK_ROWCOUNT for individual row counts. Essential for performance optimization.'
        },
        {
          name: 'Collection Exceptions',
          explanation: 'COLLECTION_IS_NULL for uninitialized collection. NO_DATA_FOUND for missing element. SUBSCRIPT_BEYOND_COUNT for out of bounds. SUBSCRIPT_OUTSIDE_LIMIT for VARRAY limit. VALUE_ERROR for invalid index. Initialize collections before use.'
        }
      ]
    },
    {
      id: 'dynamic-sql',
      name: 'Dynamic SQL',
      icon: '🔧',
      color: '#ec4899',
      description: 'Building and executing SQL statements at runtime',
      diagram: PLSQLDynamicDiagram,
      details: [
        {
          name: 'EXECUTE IMMEDIATE',
          explanation: 'Execute dynamic SQL or PL/SQL. INTO clause for queries returning single row. USING clause for bind variables. RETURNING INTO for DML returning values. Simple syntax for one-time execution. Parses and executes each time.'
        },
        {
          name: 'DBMS_SQL Package',
          explanation: 'Full control over dynamic SQL execution. PARSE, BIND_VARIABLE, EXECUTE, FETCH steps. Handle unknown number of columns. Process DDL statements. More complex but more flexible. Use for truly dynamic requirements.'
        },
        {
          name: 'Native Dynamic SQL',
          explanation: 'Preferred over DBMS_SQL for most cases. Simpler syntax with EXECUTE IMMEDIATE. Better performance for static patterns. Type checking at compile time for binds. Easier to read and maintain.'
        },
        {
          name: 'Bind Variables',
          explanation: 'Use :placeholder syntax in dynamic SQL. Pass values with USING clause. Prevents SQL injection attacks. Enables cursor sharing and caching. Better performance than string concatenation. Named binds with USING...IN/OUT.'
        },
        {
          name: 'Dynamic Cursors',
          explanation: 'OPEN cursor_variable FOR dynamic_query. Process results with FETCH. REF CURSOR for unknown result structure. Return dynamic results to applications. Combine with DBMS_SQL for column discovery.'
        },
        {
          name: 'Security Considerations',
          explanation: 'Always use bind variables for user input. Never concatenate user input into SQL. Validate and sanitize identifiers. Use DBMS_ASSERT for identifier validation. Limit privileges of dynamic SQL users. Audit dynamic SQL usage.'
        }
      ]
    },
    {
      id: 'performance',
      name: 'Performance Optimization',
      icon: '🚀',
      color: '#0ea5e9',
      description: 'Techniques for writing efficient PL/SQL code',
      diagram: PLSQLPerfDiagram,
      details: [
        {
          name: 'Bulk Processing',
          explanation: 'BULK COLLECT reduces context switches. FORALL for bulk DML operations. LIMIT clause controls memory usage. 10x-100x faster than row-by-row. Essential for processing large data sets. Combine with collections for best results.'
        },
        {
          name: 'Reducing Context Switches',
          explanation: 'Each SQL statement in PL/SQL causes context switch. Minimize switches with bulk operations. Use single SQL statements when possible. PL/SQL engine to SQL engine overhead. Batch operations to reduce switches.'
        },
        {
          name: 'Native Compilation',
          explanation: 'PLSQL_CODE_TYPE = NATIVE compiles to machine code. Faster than interpreted execution. Best for computation-heavy code. Requires C compiler on server. Higher compilation time, faster runtime. Not all code benefits equally.'
        },
        {
          name: 'Function Result Cache',
          explanation: 'RESULT_CACHE clause on functions. Oracle caches function results. Automatically invalidated on data changes. Best for read-heavy, stable data. RELIES_ON clause specifies dependencies. Significant speedup for repeated calls.'
        },
        {
          name: 'Avoiding Common Pitfalls',
          explanation: 'Minimize function calls in SQL statements. Avoid unnecessary datatype conversions. Use appropriate collection types. Close cursors to free resources. Watch for implicit conversions. Profile before optimizing.'
        },
        {
          name: 'PL/SQL Profiler',
          explanation: 'DBMS_PROFILER for line-level timing. DBMS_HPROF for hierarchical profiling. Identify hotspots and bottlenecks. Measure before and after optimization. Focus on high-impact areas. Use DBMS_UTILITY.GET_TIME for simple timing.'
        }
      ]
    },
    {
      id: 'advanced-features',
      name: 'Advanced Features',
      icon: '🎓',
      color: '#a855f7',
      description: 'Advanced PL/SQL features for complex scenarios',
      diagram: PLSQLAdvancedDiagram,
      details: [
        {
          name: 'Object Types',
          explanation: 'CREATE TYPE for object-oriented programming. Attributes and methods in single structure. Inheritance with UNDER clause. Member functions and procedures. Constructor methods. MAP and ORDER methods for comparison. Store objects in tables.'
        },
        {
          name: 'Autonomous Transactions',
          explanation: 'PRAGMA AUTONOMOUS_TRANSACTION for independent transactions. Commit/rollback without affecting main transaction. Essential for logging in exception handlers. Useful for audit trails and error logging. Use sparingly - adds complexity.'
        },
        {
          name: 'Pipelined Functions',
          explanation: 'PIPELINED keyword on table functions. PIPE ROW returns rows incrementally. Caller receives rows as they are produced. Memory efficient for large result sets. Use with TABLE() in SQL queries. Better performance than collecting all results.'
        },
        {
          name: 'Parallel Execution',
          explanation: 'PARALLEL_ENABLE on functions. Enable parallel query to call function. Partition data for parallel processing. Careful with package state in parallel. DBMS_PARALLEL_EXECUTE for DIY parallelism.'
        },
        {
          name: 'Conditional Compilation',
          explanation: '$IF, $THEN, $ELSE, $END for compile-time decisions. DBMS_DB_VERSION for version-specific code. PLSQL_CCFLAGS for custom flags. $$PLSQL_UNIT, $$PLSQL_LINE for debugging. Different code paths for different environments.'
        },
        {
          name: 'Edition-Based Redefinition',
          explanation: 'Online application upgrades without downtime. Editioning views abstract table changes. Cross-edition triggers maintain data. Multiple code versions simultaneously. Gradual user migration to new edition.'
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
      { name: 'Databases', icon: '🗃️', onClick: onBack }
    ]

    if (selectedConcept) {
      stack.push({ name: 'PL/SQL', icon: '🗄️', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'PL/SQL', icon: '🗄️' })
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
          <h1 style={titleStyle}>PL/SQL</h1>
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
          onMainMenu={breadcrumb?.onMainMenu}
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
              onMainMenu={breadcrumb?.onMainMenu}
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
                </div>
              )
            })()}

          </div>
        </div>
      )}
    </div>
  )
}

export default PLSQL

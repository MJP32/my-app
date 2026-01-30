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
          explanation: 'CREATE PROCEDURE defines reusable SQL code blocks. Parameters can be IN (input), OUT (output), or INOUT (both). DELIMITER changes statement terminator for procedure body. BEGIN...END wraps multiple statements. CALL executes procedures. DROP PROCEDURE removes them.'
        },
        {
          name: 'Parameter Types',
          explanation: 'IN parameters pass values into procedure (default). OUT parameters return values to caller. INOUT parameters both receive and return values. Use appropriate data types matching table columns. Default values provide flexibility. Named parameters improve readability.'
        },
        {
          name: 'Control Flow',
          explanation: 'IF...THEN...ELSE for conditional logic. CASE statements for multiple conditions. WHILE, REPEAT, and LOOP for iteration. LEAVE exits loops early. ITERATE continues to next iteration. DECLARE defines local variables within procedures.'
        },
        {
          name: 'Error Handling',
          explanation: 'DECLARE HANDLER catches exceptions. SQLSTATE codes identify error types. CONTINUE handler proceeds after error. EXIT handler terminates procedure. SIGNAL raises custom errors. RESIGNAL re-throws exceptions. Use GET DIAGNOSTICS for error details.'
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
          explanation: 'Return single value of any data type. Can be used in SELECT, WHERE, and expressions. DETERMINISTIC keyword indicates same input always gives same output. RETURNS clause specifies return type. Must contain RETURN statement. No side effects allowed in some databases.'
        },
        {
          name: 'Table-Valued Functions',
          explanation: 'Return result sets as virtual tables. Inline TVFs contain single SELECT statement. Multi-statement TVFs build result in table variable. Can be used in FROM clause like regular tables. Enable parameterized views. Useful for complex data transformations.'
        },
        {
          name: 'Aggregate Functions',
          explanation: 'Custom aggregations beyond built-in SUM, AVG, etc. Implement init, iterate, merge, and terminate methods. Process groups of rows to produce single value. Can be used with GROUP BY. Consider memory usage for large datasets. Window function compatibility varies.'
        },
        {
          name: 'Function vs Procedure',
          explanation: 'Functions return values, procedures execute actions. Functions callable in SQL expressions, procedures via CALL. Functions typically read-only, procedures can modify data. Functions must have RETURN, procedures optional OUT params. Choose based on use case and database constraints.'
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
          explanation: 'BEFORE triggers execute before the operation. AFTER triggers execute after the operation. INSTEAD OF triggers replace the operation (views). Row-level triggers fire for each row. Statement-level triggers fire once per statement. Choose based on timing requirements.'
        },
        {
          name: 'DML Triggers',
          explanation: 'INSERT triggers capture new data. UPDATE triggers access OLD and NEW values. DELETE triggers preserve deleted data. Combine multiple events: INSERT OR UPDATE. Access affected rows via special references. Useful for auditing and validation.'
        },
        {
          name: 'DDL Triggers',
          explanation: 'Fire on schema changes: CREATE, ALTER, DROP. Prevent unauthorized structural changes. Log schema modifications for compliance. Database-level vs server-level scope. Useful for change management and governance. Cannot be INSTEAD OF type.'
        },
        {
          name: 'Audit Triggers',
          explanation: 'Capture who, what, when for all changes. Store OLD and NEW values in audit tables. Include session info: user, timestamp, client. Implement soft deletes instead of hard deletes. Create audit trail for compliance (SOX, HIPAA). Consider performance impact of comprehensive logging.'
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
          explanation: 'DECLARE cursor defines SELECT statement. OPEN executes the query. FETCH retrieves rows one at a time. CLOSE releases resources. DEALLOCATE removes cursor definition. Use loop with NOT FOUND handler for iteration.'
        },
        {
          name: 'Cursor Types',
          explanation: 'STATIC cursors work on snapshot (insensitive to changes). DYNAMIC cursors reflect concurrent changes. KEYSET cursors detect updates but not inserts. FORWARD_ONLY cannot scroll backward. SCROLL cursors support FIRST, LAST, PRIOR, NEXT, ABSOLUTE, RELATIVE.'
        },
        {
          name: 'Cursor Attributes',
          explanation: 'FOUND indicates successful fetch. NOT FOUND signals end of result set. ROW_COUNT shows affected rows. ISOPEN checks cursor state. Use attributes in CONTINUE/EXIT handlers. Different syntax across database systems.'
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
          explanation: 'Runs SQL string directly. No result set handling. Good for DDL and simple DML. String concatenation builds statement. Variable substitution with placeholders. Different syntax: EXEC, EXECUTE, sp_executesql.'
        },
        {
          name: 'Parameterized Dynamic SQL',
          explanation: 'Use parameters instead of string concatenation. Prevents SQL injection attacks. Enables plan caching and reuse. sp_executesql in SQL Server, USING in Oracle. Named vs positional parameters. Type safety with explicit declarations.'
        },
        {
          name: 'Dynamic Pivoting',
          explanation: 'Build PIVOT columns from data values. Query metadata for column list. Generate column aliases dynamically. Useful for reporting with variable dimensions. Combine with temporary tables. Handle NULL values in pivot columns.'
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
          explanation: 'Specification declares public interface. Body contains implementation. Separation enables information hiding. Compile specification and body separately. Forward declarations for mutual recursion. Package state persists for session duration.'
        },
        {
          name: 'Package Specification',
          explanation: 'Declares public procedures and functions. Defines public types and constants. Exposes cursor declarations. Acts as API contract. Changes require recompilation of dependents. Keep specification stable when possible.'
        },
        {
          name: 'Package Body',
          explanation: 'Implements declared subprograms. Contains private helper procedures. Initialization section runs once per session. Private variables maintain state. Can be recompiled without affecting specification. Implementation changes are transparent to callers.'
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
          explanation: 'BEGIN TRANSACTION starts explicit transaction. COMMIT saves changes permanently. ROLLBACK undoes all changes. SAVEPOINT creates intermediate restore point. ROLLBACK TO SAVEPOINT partial rollback. Auto-commit behavior varies by database.'
        },
        {
          name: 'Nested Transactions',
          explanation: 'Some databases support true nesting. SQL Server uses @@TRANCOUNT. Oracle savepoints simulate nesting. Inner commit may not persist until outer commits. Understand your database behavior. Test rollback scenarios thoroughly.'
        },
        {
          name: 'Error Handling with Transactions',
          explanation: 'Wrap transaction in TRY...CATCH. Rollback in exception handler. Check @@TRANCOUNT before rollback. Avoid orphaned transactions. Log errors before rollback. Re-raise or return error information.'
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
          explanation: 'PRINT/DBMS_OUTPUT for trace messages. Output variable values at checkpoints. Show execution flow through procedure. Conditional debugging with debug flag. Remember to remove before production. Capture output in log tables for async review.'
        },
        {
          name: 'IDE Debugging',
          explanation: 'SQL Server Management Studio debugger. Oracle SQL Developer debugging. Set breakpoints in procedure code. Step through execution line by line. Inspect variable values. Watch expressions for complex debugging.'
        },
        {
          name: 'Unit Testing',
          explanation: 'tSQLt framework for SQL Server. utPLSQL for Oracle. Create test procedures with assertions. Setup and teardown for test data. Mock external dependencies. Integrate with CI/CD pipelines.'
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

export default StoredProcedures

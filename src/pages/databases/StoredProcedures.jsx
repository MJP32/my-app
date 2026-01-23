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
              maxWidth: '1200px',
              maxHeight: '92vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
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
              return (
                <div>
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{detail.name}</h3>
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

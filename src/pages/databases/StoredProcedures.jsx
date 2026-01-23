import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function StoredProcedures({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConcept, setSelectedConcept] = useState(null)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()

        if (selectedConcept) {
          setSelectedConcept(null)
        } else {
          onBack()
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [selectedConcept, onBack])

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

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept)
  }

  const handleBackToGrid = () => {
    setSelectedConcept(null)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #4c1d95, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onBack}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7c3aed'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8b5cf6'}
          >
            ← Back to Databases
          </button>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '2rem',
              fontWeight: '800',
              background: 'linear-gradient(to right, #c4b5fd, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Stored Procedures & Functions
            </h1>
            {currentSubcategory && (
              <span style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                backgroundColor: '#4c1d95',
                color: '#c4b5fd',
                borderRadius: '6px',
                marginTop: '0.25rem',
                display: 'inline-block'
              }}>
                {currentSubcategory}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {onPrevious && (
            <button
              onClick={onPrevious}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
            >
              ← {previousName}
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedConcept ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {!selectedConcept ? (
          concepts.map((concept, idx) => (
            <div
              key={idx}
              onClick={() => handleConceptClick(concept)}
              style={{
                backgroundColor: `${concept.color}0D`,
                padding: '2rem',
                borderRadius: '12px',
                border: `2px solid ${concept.color}33`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 8px 24px ${concept.color}40`
                e.currentTarget.style.borderColor = `${concept.color}66`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = `${concept.color}33`
              }}
            >
              <div>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
                  {concept.icon}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: 'white',
                  margin: '0 0 0.5rem 0'
                }}>
                  {concept.name}
                </h3>
              </div>
              <p style={{
                fontSize: '0.95rem',
                color: '#9ca3af',
                margin: 0,
                lineHeight: '1.5'
              }}>
                {concept.description}
              </p>
            </div>
          ))
        ) : (
          <>
            {/* Sidebar */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <button
                onClick={handleBackToGrid}
                style={{
                  padding: '0.75rem 1rem',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  backgroundColor: '#1f2937',
                  color: 'white',
                  border: '2px solid #374151',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  marginBottom: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#374151'
                  e.currentTarget.style.borderColor = '#4b5563'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1f2937'
                  e.currentTarget.style.borderColor = '#374151'
                }}
              >
                ← Back to Categories
              </button>

              {concepts.map((concept) => (
                <div
                  key={concept.id}
                  onClick={() => handleConceptClick(concept)}
                  style={{
                    padding: '1rem',
                    borderRadius: '8px',
                    backgroundColor: selectedConcept.id === concept.id ? `${concept.color}1A` : '#1f2937',
                    border: `2px solid ${selectedConcept.id === concept.id ? concept.color : '#374151'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedConcept.id !== concept.id) {
                      e.currentTarget.style.backgroundColor = '#374151'
                      e.currentTarget.style.borderColor = '#4b5563'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedConcept.id !== concept.id) {
                      e.currentTarget.style.backgroundColor = '#1f2937'
                      e.currentTarget.style.borderColor = '#374151'
                    }
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                    {concept.icon}
                  </div>
                  <div style={{
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    color: 'white'
                  }}>
                    {concept.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Main content area */}
            <div>
              <div style={{
                backgroundColor: `${selectedConcept.color}0D`,
                padding: '2rem',
                borderRadius: '12px',
                border: `2px solid ${selectedConcept.color}33`,
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '3rem' }}>
                    {selectedConcept.icon}
                  </div>
                  <div>
                    <h2 style={{
                      fontSize: '2rem',
                      fontWeight: '800',
                      color: 'white',
                      margin: 0
                    }}>
                      {selectedConcept.name}
                    </h2>
                    <p style={{
                      fontSize: '1.1rem',
                      color: '#9ca3af',
                      margin: '0.5rem 0 0 0',
                      lineHeight: '1.6'
                    }}>
                      {selectedConcept.description}
                    </p>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gap: '1.5rem'
              }}>
                {selectedConcept.details.map((detail, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#1f2937',
                      padding: '1.5rem',
                      borderRadius: '10px',
                      border: '2px solid #374151',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = selectedConcept.color
                      e.currentTarget.style.boxShadow = `0 4px 12px ${selectedConcept.color}20`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#374151'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: 'white',
                      margin: '0 0 0.75rem 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{
                        backgroundColor: selectedConcept.color,
                        color: 'white',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        fontWeight: '700'
                      }}>
                        {idx + 1}
                      </span>
                      {detail.name}
                    </h3>
                    <p style={{
                      fontSize: '1rem',
                      color: '#9ca3af',
                      margin: 0,
                      lineHeight: '1.7',
                      paddingLeft: '2.25rem'
                    }}>
                      {detail.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      </div>
    </div>
  )
}

export default StoredProcedures

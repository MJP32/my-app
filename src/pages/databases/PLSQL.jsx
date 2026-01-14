import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function PLSQL({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConcept, setSelectedConcept] = useState(null)

  // Handle Escape key for modal navigation
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation() // Prevent event from reaching parent handlers

        if (selectedConcept) {
          // If viewing a concept, go back to concept list
          setSelectedConcept(null)
        } else {
          // If on concept list, close the modal
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
      id: 'plsql-basics',
      name: 'PL/SQL Fundamentals',
      icon: '📦',
      color: '#3b82f6',
      description: 'Core PL/SQL concepts including blocks, variables, and control structures',
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

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept)
  }

  const handleBackToGrid = () => {
    setSelectedConcept(null)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
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
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            ← Back to Databases
          </button>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '2rem',
              fontWeight: '800',
              background: 'linear-gradient(to right, #93c5fd, #60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              PL/SQL Mastery
            </h1>
            {currentSubcategory && (
              <span style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                backgroundColor: '#1e3a5f',
                color: '#93c5fd',
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

export default PLSQL

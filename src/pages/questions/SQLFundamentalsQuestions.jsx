import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function SQLFundamentalsQuestions({ onBack, breadcrumb, problemLimit, onNavigateTopic }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const [activeCategory, setActiveCategory] = useState('All')
  const [activeDifficulty, setActiveDifficulty] = useState('All')
  const renderFormattedAnswer = (text) => {
    const lines = text.split('\n')
    const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']
    let colorIndex = 0
    const result = []
    let inCodeBlock = false
    let codeLines = []
    let codeLanguage = 'sql'

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex]

      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true
          codeLanguage = line.trim().substring(3) || 'sql'
          codeLines = []
        } else {
          inCodeBlock = false
          const codeString = codeLines.join('\n')
          result.push(
            <div key={`code-${lineIndex}`} style={{ margin: '1.5rem 0', textAlign: 'left' }}>
              <SyntaxHighlighter
                language={codeLanguage}
                style={vscDarkPlus}
                customStyle={{ borderRadius: '0.5rem', fontSize: '0.9rem', padding: '1rem', textAlign: 'left', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)', backgroundColor: '#000000' }}
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
          )
          codeLines = []
        }
        continue
      }

      if (inCodeBlock) {
        codeLines.push(line)
        continue
      }

      if (line.trim() === '') {
        result.push(<div key={lineIndex} style={{ height: '0.5rem' }}></div>)
        continue
      }

      const bulletMatch = line.match(/^(\s*)-\s+(.+)$/)
      if (bulletMatch) {
        const indentLevel = bulletMatch[1].length
        const bulletContent = bulletMatch[2]
        result.push(
          <div key={lineIndex} style={{ display: 'flex', alignItems: 'flex-start', marginLeft: `${indentLevel * 0.5 + 1}rem`, marginTop: '0.5rem', textAlign: 'left', lineHeight: '1.6' }}>
            <span style={{ color: '#3b82f6', marginRight: '0.5rem', fontWeight: 'bold', fontSize: '1.2rem', lineHeight: '1.4' }}>•</span>
            <span style={{ flex: 1 }}>{bulletContent}</span>
          </div>
        )
        continue
      }

      const boldMatch = line.match(/^\*\*(.+?):\*\*/)
      if (boldMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        result.push(
          <div key={lineIndex} style={{ marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '700', color: color, fontSize: '1.1rem', textAlign: 'left' }}>
            {boldMatch[1]}:
          </div>
        )
        const remainder = line.substring(boldMatch[0].length).trim()
        if (remainder) {
          result.push(<div key={`${lineIndex}-rem`} style={{ textAlign: 'left', paddingLeft: '0.5rem', lineHeight: '1.6', color: '#e5e7eb' }}>{remainder}</div>)
        }
        continue
      }

      const numberedMatch = line.match(/^(\d+)\.\s/)
      if (numberedMatch) {
        result.push(
          <div key={lineIndex} style={{ display: 'flex', alignItems: 'flex-start', marginTop: '0.5rem', textAlign: 'left', lineHeight: '1.6' }}>
            <span style={{ color: '#f59e0b', marginRight: '0.5rem', fontWeight: 'bold', minWidth: '1.5rem' }}>{numberedMatch[1]}.</span>
            {line.substring(numberedMatch[0].length)}
          </div>
        )
        continue
      }

      result.push(
        <div key={lineIndex} style={{ textAlign: 'left', marginTop: '0.25rem', paddingLeft: '0.5rem', lineHeight: '1.6', color: '#e5e7eb' }}>{line}</div>
      )
    }
    return result
  }

  const questions = [
    {
      id: 1,
      category: 'Basics',
      question: 'What is the difference between DDL, DML, DCL, and TCL?',
      answer: `**DDL (Data Definition Language):**
- Defines database structure
- Commands: CREATE, ALTER, DROP, TRUNCATE
- Auto-commits (cannot rollback)

\`\`\`sql
CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(100));
ALTER TABLE users ADD COLUMN email VARCHAR(255);
DROP TABLE users;
TRUNCATE TABLE logs;  -- Faster than DELETE, resets auto-increment
\`\`\`

**DML (Data Manipulation Language):**
- Works with data in tables
- Commands: SELECT, INSERT, UPDATE, DELETE
- Can be rolled back within transaction

\`\`\`sql
SELECT * FROM users WHERE active = true;
INSERT INTO users (name, email) VALUES ('John', 'john@example.com');
UPDATE users SET status = 'inactive' WHERE last_login < '2023-01-01';
DELETE FROM users WHERE id = 5;
\`\`\`

**DCL (Data Control Language):**
- Controls access permissions
- Commands: GRANT, REVOKE

\`\`\`sql
GRANT SELECT, INSERT ON users TO analyst_role;
REVOKE DELETE ON users FROM junior_dev;
\`\`\`

**TCL (Transaction Control Language):**
- Manages transactions
- Commands: COMMIT, ROLLBACK, SAVEPOINT

\`\`\`sql
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;  -- Or ROLLBACK if error
\`\`\`

**Quick Reference:**
| Category | Purpose | Commands | Rollback? |
|----------|---------|----------|-----------|
| DDL | Structure | CREATE, ALTER, DROP | No |
| DML | Data | SELECT, INSERT, UPDATE, DELETE | Yes |
| DCL | Permissions | GRANT, REVOKE | No |
| TCL | Transactions | COMMIT, ROLLBACK, SAVEPOINT | N/A |`
    },
    {
      id: 2,
      category: 'Subqueries',
      question: 'What are the different types of subqueries?',
      answer: `**1. Scalar Subquery:**
Returns exactly ONE value (one row, one column).

\`\`\`sql
SELECT name, salary,
       salary - (SELECT AVG(salary) FROM employees) AS diff_from_avg
FROM employees;
\`\`\`

**2. Column Subquery:**
Returns one column, multiple rows. Use with IN, ANY, ALL.

\`\`\`sql
-- IN: Users who placed orders
SELECT name FROM users
WHERE id IN (SELECT DISTINCT user_id FROM orders);

-- NOT IN: Users without orders (careful with NULLs!)
SELECT name FROM users
WHERE id NOT IN (SELECT user_id FROM orders WHERE user_id IS NOT NULL);
\`\`\`

**3. Table Subquery (Derived Table):**
Returns a full table. Used in FROM clause.

\`\`\`sql
SELECT dept, avg_salary
FROM (
    SELECT department AS dept, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department
) AS dept_stats
WHERE avg_salary > 50000;
\`\`\`

**4. Correlated Subquery:**
References outer query. Executes once per outer row.

\`\`\`sql
-- Employees earning above their department average
SELECT name, salary, department
FROM employees e
WHERE salary > (
    SELECT AVG(salary) FROM employees
    WHERE department = e.department
);
\`\`\`

**5. EXISTS Subquery:**
Returns TRUE if subquery returns any rows. More efficient than IN for large datasets.

\`\`\`sql
-- Users who have orders (EXISTS)
SELECT name FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.user_id = u.id
);

-- Users without orders (NOT EXISTS)
SELECT name FROM users u
WHERE NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.user_id = u.id
);
\`\`\`

**EXISTS vs IN:**
- EXISTS stops at first match (faster for large subqueries)
- NOT EXISTS handles NULLs correctly
- IN can use index on subquery result

**ANY/ALL Operators:**
\`\`\`sql
-- Salary > ANY manager salary (> minimum)
SELECT name FROM employees
WHERE salary > ANY (SELECT salary FROM employees WHERE role = 'Manager');

-- Salary > ALL manager salaries (> maximum)
SELECT name FROM employees
WHERE salary > ALL (SELECT salary FROM employees WHERE role = 'Manager');
\`\`\``
    },
    {
      id: 3,
      category: 'Aggregates',
      question: 'Explain GROUP BY, HAVING, and aggregate functions',
      answer: `**Common Aggregate Functions:**
\`\`\`sql
SELECT
    COUNT(*) AS total_rows,           -- All rows
    COUNT(column) AS non_null_count,  -- Non-NULL values
    COUNT(DISTINCT col) AS unique,    -- Unique values
    SUM(amount) AS total,
    AVG(amount) AS average,
    MIN(amount) AS minimum,
    MAX(amount) AS maximum
FROM orders;
\`\`\`

**GROUP BY:**
Groups rows and calculates aggregates per group.

\`\`\`sql
SELECT department, COUNT(*) AS emp_count, AVG(salary) AS avg_salary
FROM employees
GROUP BY department;

-- Multiple columns
SELECT department, job_title, COUNT(*)
FROM employees
GROUP BY department, job_title;

-- With expressions
SELECT EXTRACT(YEAR FROM hire_date) AS year, COUNT(*)
FROM employees
GROUP BY EXTRACT(YEAR FROM hire_date);
\`\`\`

**HAVING vs WHERE:**
\`\`\`sql
-- WHERE: Filters ROWS before grouping
-- HAVING: Filters GROUPS after grouping

SELECT department, AVG(salary) AS avg_salary
FROM employees
WHERE status = 'active'        -- Filter rows first
GROUP BY department
HAVING AVG(salary) > 50000;    -- Filter groups after
\`\`\`

**Execution Order:**
1. FROM (tables)
2. WHERE (filter rows)
3. GROUP BY (create groups)
4. HAVING (filter groups)
5. SELECT (choose columns)
6. ORDER BY (sort)
7. LIMIT (restrict rows)

**ROLLUP and CUBE:**
\`\`\`sql
-- ROLLUP: Hierarchical subtotals
SELECT region, country, SUM(sales)
FROM sales_data
GROUP BY ROLLUP(region, country);
-- Produces: region+country, region only, grand total

-- CUBE: All combinations
SELECT region, product, SUM(sales)
FROM sales_data
GROUP BY CUBE(region, product);
-- Produces: all combinations including subtotals
\`\`\`

**STRING_AGG / GROUP_CONCAT:**
\`\`\`sql
-- PostgreSQL
SELECT department, STRING_AGG(name, ', ' ORDER BY name)
FROM employees
GROUP BY department;

-- MySQL
SELECT department, GROUP_CONCAT(name ORDER BY name SEPARATOR ', ')
FROM employees
GROUP BY department;
\`\`\``
    },
    {
      id: 4,
      category: 'Basics',
      question: 'What is NULL and how do you handle it?',
      answer: `**What is NULL:**
- Represents missing or unknown data
- NULL is NOT equal to anything (including NULL)
- NULL is NOT zero, empty string, or false

**Testing for NULL:**
\`\`\`sql
-- Correct
SELECT * FROM users WHERE phone IS NULL;
SELECT * FROM users WHERE phone IS NOT NULL;

-- WRONG (always returns 0 rows)
SELECT * FROM users WHERE phone = NULL;
SELECT * FROM users WHERE phone <> NULL;
\`\`\`

**NULL in Comparisons:**
\`\`\`sql
-- NULL comparisons return NULL (unknown), not true/false
SELECT 1 = NULL;      -- NULL
SELECT 1 <> NULL;     -- NULL
SELECT NULL = NULL;   -- NULL
\`\`\`

**COALESCE:**
Returns first non-NULL value.
\`\`\`sql
SELECT COALESCE(nickname, first_name, 'Guest') AS display_name
FROM users;

SELECT COALESCE(phone, email, 'No contact') AS contact
FROM users;
\`\`\`

**NULLIF:**
Returns NULL if arguments are equal.
\`\`\`sql
-- Avoid division by zero
SELECT total / NULLIF(count, 0) AS average
FROM stats;
\`\`\`

**NULL in Aggregates:**
\`\`\`sql
-- COUNT(*) counts all rows
-- COUNT(column) ignores NULLs
SELECT COUNT(*) AS all_rows, COUNT(phone) AS with_phone
FROM users;

-- AVG, SUM, etc. ignore NULLs
SELECT AVG(salary) FROM employees;  -- NULLs excluded
\`\`\`

**NULL in NOT IN (Dangerous!):**
\`\`\`sql
-- If subquery returns NULL, NOT IN returns 0 rows
SELECT * FROM a WHERE x NOT IN (SELECT x FROM b);
-- If b.x contains NULL, returns nothing!

-- Safe alternative: NOT EXISTS
SELECT * FROM a WHERE NOT EXISTS (SELECT 1 FROM b WHERE b.x = a.x);
\`\`\`

**NULL Ordering:**
\`\`\`sql
SELECT * FROM users ORDER BY phone NULLS LAST;   -- NULLs at end
SELECT * FROM users ORDER BY phone NULLS FIRST;  -- NULLs at start
\`\`\``
    },
    {
      id: 5,
      category: 'Basics',
      question: 'What is the SQL execution order?',
      answer: `**Written Order vs Execution Order:**

**Written (Syntax) Order:**
\`\`\`sql
SELECT column
FROM table
WHERE condition
GROUP BY column
HAVING condition
ORDER BY column
LIMIT n
\`\`\`

**Actual Execution Order:**
1. **FROM** - Get data from tables
2. **JOIN** - Combine tables
3. **WHERE** - Filter rows
4. **GROUP BY** - Create groups
5. **HAVING** - Filter groups
6. **SELECT** - Choose columns
7. **DISTINCT** - Remove duplicates
8. **ORDER BY** - Sort results
9. **LIMIT/OFFSET** - Restrict rows

**Why This Matters:**

\`\`\`sql
-- Can't use alias in WHERE (SELECT runs after WHERE)
SELECT name, salary * 12 AS annual
FROM employees
WHERE annual > 100000;  -- ERROR: annual not known yet

-- Must repeat expression
SELECT name, salary * 12 AS annual
FROM employees
WHERE salary * 12 > 100000;  -- Works

-- OR use subquery/CTE
SELECT * FROM (
    SELECT name, salary * 12 AS annual FROM employees
) sub
WHERE annual > 100000;  -- Works
\`\`\`

**HAVING vs WHERE:**
\`\`\`sql
-- WHERE runs BEFORE grouping (filters rows)
-- HAVING runs AFTER grouping (filters groups)

SELECT department, AVG(salary)
FROM employees
WHERE hire_date > '2020-01-01'  -- Filter rows first
GROUP BY department
HAVING AVG(salary) > 50000;     -- Filter groups after
\`\`\`

**ORDER BY Can Use Aliases:**
\`\`\`sql
-- ORDER BY runs after SELECT, so aliases work
SELECT name, salary * 12 AS annual
FROM employees
ORDER BY annual DESC;  -- Works!
\`\`\`

**Memory Hook:**
FROM → WHERE → GROUP → HAVING → SELECT → ORDER → LIMIT
"From Where Groups Having Selected Ordered Limits"`
    }
  ]

  // Filter questions based on problemLimit (for Top 100/300 mode)
  const limitedQuestions = problemLimit ? questions.slice(0, problemLimit) : questions

  const questionsForCategoryCount = limitedQuestions.filter(q =>
    activeDifficulty === 'All' || q.difficulty === activeDifficulty
  )
  const categoryCounts = questionsForCategoryCount.reduce((acc, q) => {
    acc[q.category] = (acc[q.category] || 0) + 1
    return acc
  }, {})
  const availableCategories = ['All', ...Object.keys(categoryCounts).sort((a, b) => {
    const diff = categoryCounts[b] - categoryCounts[a]
    return diff !== 0 ? diff : a.localeCompare(b)
  })]

  const difficultyOrder = ['Easy', 'Medium', 'Hard']
  const difficultyCounts = limitedQuestions.reduce((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] || 0) + 1
    return acc
  }, {})
  const availableDifficulties = ['All', ...difficultyOrder.filter(d => difficultyCounts[d])]

  const displayQuestions = limitedQuestions.filter(q =>
    (activeCategory === 'All' || q.category === activeCategory) &&
    (activeDifficulty === 'All' || q.difficulty === activeDifficulty)
  )
  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Basics': '#06b6d4',
      'JOINs': '#3b82f6',
      'Subqueries': '#8b5cf6',
      'CTEs': '#10b981',
      'Window Functions': '#ec4899',
      'Aggregates': '#f59e0b',
      'Performance': '#ef4444',
      'Transactions': '#6366f1'
    }
    return colors[category] || '#6b7280'
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #164e63, #111827)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <button
          onClick={onBack}
          style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#0891b2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          ← Back to Questions
        </button>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#22d3ee', margin: 0 }}>
          SQL Fundamentals Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

      <div style={{ margin: '1rem 0', padding: '1rem 1.25rem', backgroundColor: 'rgba(34, 211, 238, 0.08)', border: '1px solid rgba(34, 211, 238, 0.35)', borderRadius: '12px', color: '#e5e7eb' }}>
        JOINs, CTEs, window functions, indexes and ACID are covered in depth on the SQL Questions page, along with normalization, EXPLAIN plans, locking and stored procedures.
        {onNavigateTopic && (
          <button
            onClick={() => onNavigateTopic('SQL Questions')}
            style={{ marginLeft: '0.75rem', background: '#0891b2', color: 'white', border: 'none', padding: '0.4rem 0.9rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
          >
            Go to SQL Questions →
          </button>
        )}
      </div>

      <CollapsibleSidebar
        items={displayQuestions}
        selectedIndex={expandedQuestion ? displayQuestions.findIndex(q => q.id === expandedQuestion) : -1}
        onSelect={(index) => toggleQuestion(displayQuestions[index].id)}
        title="Questions"
        getItemLabel={(item) => `${item.id}. ${item.category}`}
        getItemIcon={() => '❓'}
        primaryColor="#3b82f6"
      />

      <p style={{ fontSize: '1.1rem', color: '#d1d5db', textAlign: 'left', marginBottom: '2rem', lineHeight: '1.6' }}>
        Core SQL interview questions covering command families, subqueries, aggregates, NULL semantics, and execution order.
      </p>


      {/* Difficulty Filter Tabs */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '0.75rem',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: '600', marginRight: '0.25rem' }}>Difficulty:</span>
        {availableDifficulties.map((diff) => {
          const isActive = activeDifficulty === diff
          const count = diff === 'All' ? limitedQuestions.length : (difficultyCounts[diff] || 0)
          const color = diff === 'Easy' ? '#22c55e' : diff === 'Medium' ? '#f59e0b' : diff === 'Hard' ? '#ef4444' : '#3b82f6'
          return (
            <button
              key={diff}
              onClick={() => setActiveDifficulty(diff)}
              style={{
                padding: '0.4rem 0.8rem',
                fontSize: '0.8rem',
                fontWeight: isActive ? '700' : '500',
                background: isActive ? `${color}25` : 'rgba(31, 41, 55, 0.6)',
                color: isActive ? color : '#9ca3af',
                border: `1px solid ${isActive ? color : '#374151'}`,
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = `${color}15`
                  e.currentTarget.style.color = color
                  e.currentTarget.style.borderColor = `${color}80`
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(31, 41, 55, 0.6)'
                  e.currentTarget.style.color = '#9ca3af'
                  e.currentTarget.style.borderColor = '#374151'
                }
              }}
            >
              <span>{diff}</span>
              <span style={{
                fontSize: '0.7rem',
                padding: '0.1rem 0.4rem',
                borderRadius: '999px',
                background: isActive ? color : '#374151',
                color: isActive ? '#fff' : '#9ca3af',
                fontWeight: '700',
                minWidth: '1.5rem',
                textAlign: 'center'
              }}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Category Filter Tabs */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #374151'
      }}>
        {availableCategories.map((cat) => {
          const isActive = activeCategory === cat
          const count = cat === 'All' ? questionsForCategoryCount.length : (categoryCounts[cat] || 0)
          const color = cat === 'All' ? '#3b82f6' : getCategoryColor(cat)
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.5rem 0.9rem',
                fontSize: '0.85rem',
                fontWeight: isActive ? '700' : '500',
                background: isActive ? `${color}25` : 'rgba(31, 41, 55, 0.6)',
                color: isActive ? color : '#9ca3af',
                border: `1px solid ${isActive ? color : '#374151'}`,
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = `${color}15`
                  e.currentTarget.style.color = color
                  e.currentTarget.style.borderColor = `${color}80`
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(31, 41, 55, 0.6)'
                  e.currentTarget.style.color = '#9ca3af'
                  e.currentTarget.style.borderColor = '#374151'
                }
              }}
            >
              <span>{cat}</span>
              <span style={{
                fontSize: '0.7rem',
                padding: '0.1rem 0.45rem',
                borderRadius: '999px',
                background: isActive ? color : '#374151',
                color: isActive ? '#fff' : '#9ca3af',
                fontWeight: '700',
                minWidth: '1.5rem',
                textAlign: 'center'
              }}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {displayQuestions.map((q) => (
          <div key={q.id} style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '12px', border: `3px solid ${expandedQuestion === q.id ? getCategoryColor(q.category) : '#374151'}`, overflow: 'hidden' }}>
            <button
              onClick={() => toggleQuestion(q.id)}
              style={{ width: '100%', padding: '1.5rem', backgroundColor: expandedQuestion === q.id ? `${getCategoryColor(q.category)}15` : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: getCategoryColor(q.category), color: 'white', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {q.category}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#e2e8f0', margin: 0 }}>
                  Q{q.id}. {q.question}
                </h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div onClick={(e) => e.stopPropagation()} style={{ transform: 'scale(0.85)' }}>
                  <CompletionCheckbox problemId={`SQLFundamentalsQuestions-${q.id}`} />
                </div>
                <div style={{ fontSize: '1.5rem', color: getCategoryColor(q.category), fontWeight: 'bold', transform: expandedQuestion === q.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                  ▼
                </div>
              </div>
            </button>
            {expandedQuestion === q.id && (
              <div style={{ padding: '1.5rem', backgroundColor: '#1e293b', borderTop: `2px solid ${getCategoryColor(q.category)}40` }}>
                <div style={{ fontSize: '1rem', lineHeight: '1.8', color: '#d1d5db', whiteSpace: 'pre-wrap', fontFamily: 'system-ui, -apple-system, sans-serif', textAlign: 'left' }}>
                  {renderFormattedAnswer(q.answer)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'rgba(6, 182, 212, 0.15)', borderRadius: '12px', border: '2px solid #06b6d4' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#22d3ee', marginBottom: '0.5rem' }}>
          SQL Interview Tips
        </h3>
        <ul style={{ color: '#d1d5db', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Practice writing queries by hand (whiteboard interviews)</li>
          <li>Know execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY</li>
          <li>Understand when to use JOINs vs subqueries vs CTEs</li>
          <li>Be comfortable with window functions for analytics queries</li>
          <li>Always consider NULL handling in your answers</li>
        </ul>
      </div>
    </div>
  )
}

export default SQLFundamentalsQuestions

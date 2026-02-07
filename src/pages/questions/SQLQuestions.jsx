import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function SQLQuestions({ onBack, breadcrumb, problemLimit }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

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

      // Check for code block start/end
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          // Start of code block
          inCodeBlock = true
          codeLanguage = line.trim().substring(3) || 'sql'
          codeLines = []
        } else {
          // End of code block
          inCodeBlock = false
          const codeString = codeLines.join('\n')
          result.push(
            <div key={`code-${lineIndex}`} style={{ margin: '1.5rem 0', textAlign: 'left' }}>
              <SyntaxHighlighter
                language={codeLanguage}
                style={vscDarkPlus}
                customStyle={{
                  borderRadius: '0.5rem',
                  fontSize: '0.9rem',
                  padding: '1rem',
                  textAlign: 'left',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  backgroundColor: '#000000'
                }}
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

      // Empty lines for spacing
      if (line.trim() === '') {
        result.push(<div key={lineIndex} style={{ height: '0.5rem' }}></div>)
        continue
      }

      // Bullet points (lines starting with -)
      const bulletMatch = line.match(/^(\s*)-\s+(.+)$/)
      if (bulletMatch) {
        const indentLevel = bulletMatch[1].length
        const bulletContent = bulletMatch[2]
        result.push(
          <div
            key={lineIndex}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginLeft: `${indentLevel * 0.5 + 1}rem`,
              marginTop: '0.5rem',
              textAlign: 'left',
              lineHeight: '1.6'
            }}
          >
            <span style={{
              color: '#3b82f6',
              marginRight: '0.5rem',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              lineHeight: '1.4'
            }}>
              •
            </span>
            <span style={{ flex: 1 }}>{bulletContent}</span>
          </div>
        )
        continue
      }

      // Bold section headers (e.g., **What is RFQ?**)
      const boldMatch = line.match(/^\*\*(.+?):\*\*/)
      if (boldMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        result.push(
          <div
            key={lineIndex}
            style={{
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
              textAlign: 'left',
              paddingBottom: '0.25rem',
              borderBottom: `2px solid ${color}33`
            }}
          >
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.1rem',
              letterSpacing: '0.02em'
            }}>
              {boldMatch[1]}:
            </span>
            {line.substring(boldMatch[0].length)}
          </div>
        )
        continue
      }

      // Numbered section headers (e.g., **1. Client Initiates:**)
      const numberedMatch = line.match(/^\*\*(\d+\.\s+.+?):\*\*/)
      if (numberedMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        result.push(
          <div
            key={lineIndex}
            style={{
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
              textAlign: 'left',
              paddingBottom: '0.25rem',
              borderBottom: `2px solid ${color}33`
            }}
          >
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.1rem',
              letterSpacing: '0.02em'
            }}>
              {numberedMatch[1]}:
            </span>
            {line.substring(numberedMatch[0].length)}
          </div>
        )
        continue
      }

      // Regular text with subtle left padding
      result.push(
        <div
          key={lineIndex}
          style={{
            textAlign: 'left',
            marginTop: '0.25rem',
            paddingLeft: '0.5rem',
            lineHeight: '1.6',
            color: '#e5e7eb'
          }}
        >
          {line}
        </div>
      )
    }

    return result
  }

  const questions = [
    {
      id: 1,
      category: 'Joins',
      question: 'Explain different types of SQL JOINs with examples',
      answer: `**INNER JOIN:**
- Returns only matching rows from both tables
- Most commonly used join

\`\`\`sql
SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id;
\`\`\`

**LEFT JOIN (LEFT OUTER JOIN):**
- Returns ALL rows from left table + matching rows from right table
- NULL for right table if no match

\`\`\`sql
SELECT e.name, d.department_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id;
-- Returns all employees, even if they have no department
\`\`\`

**RIGHT JOIN (RIGHT OUTER JOIN):**
- Returns ALL rows from right table + matching rows from left table
- NULL for left table if no match

\`\`\`sql
SELECT e.name, d.department_name
FROM employees e
RIGHT JOIN departments d ON e.dept_id = d.id;
-- Returns all departments, even if they have no employees
\`\`\`

**FULL OUTER JOIN:**
- Returns ALL rows from both tables
- NULL where there's no match
- Not supported in MySQL (use UNION of LEFT and RIGHT)

\`\`\`sql
SELECT e.name, d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.dept_id = d.id;
\`\`\`

**CROSS JOIN:**
- Cartesian product (every row from table1 with every row from table2)
- No ON clause needed
- rows = table1_rows × table2_rows

\`\`\`sql
SELECT e.name, d.department_name
FROM employees e
CROSS JOIN departments d;
\`\`\`

**SELF JOIN:**
- Join table to itself
- Used to compare rows within same table

\`\`\`sql
SELECT e1.name AS Employee, e2.name AS Manager
FROM employees e1
JOIN employees e2 ON e1.manager_id = e2.id;
\`\`\`

**Visual Representation:**
- INNER: Intersection (∩)
- LEFT: All of left + intersection
- RIGHT: All of right + intersection
- FULL: Union of both tables`
    },
    {
      id: 2,
      category: 'Subqueries',
      question: 'What is the difference between WHERE and HAVING clause?',
      answer: `**WHERE Clause:**
- Filters rows BEFORE grouping
- Cannot use aggregate functions (SUM, COUNT, AVG, etc.)
- Applied on individual rows
- Used with SELECT, UPDATE, DELETE

\`\`\`sql
SELECT name, salary
FROM employees
WHERE salary > 50000;  -- Filter before any grouping
\`\`\`

**HAVING Clause:**
- Filters groups AFTER grouping (GROUP BY)
- CAN use aggregate functions
- Applied on grouped results
- Must be used with GROUP BY

\`\`\`sql
SELECT dept_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY dept_id
HAVING AVG(salary) > 50000;  -- Filter groups
\`\`\`

**Key Differences:**

| WHERE | HAVING |
|-------|--------|
| Row-level filter | Group-level filter |
| Before GROUP BY | After GROUP BY |
| Cannot use aggregates | Can use aggregates |
| Acts on columns | Acts on groups |

**Complete Example:**
\`\`\`sql
SELECT dept_id, COUNT(*) as emp_count, AVG(salary) as avg_salary
FROM employees
WHERE active = 1              -- Filter: only active employees
GROUP BY dept_id              -- Group by department
HAVING COUNT(*) > 5           -- Filter: departments with >5 employees
  AND AVG(salary) > 50000;    -- and average salary > 50k
\`\`\`

**Execution Order:**
1. FROM - Get data from tables
2. WHERE - Filter individual rows
3. GROUP BY - Group the filtered rows
4. HAVING - Filter the groups
5. SELECT - Select columns
6. ORDER BY - Sort results

**Common Mistake:**
\`\`\`sql
-- WRONG - Can't use aggregate in WHERE
SELECT dept_id, AVG(salary)
FROM employees
WHERE AVG(salary) > 50000  -- ERROR!
GROUP BY dept_id;

-- CORRECT - Use HAVING for aggregates
SELECT dept_id, AVG(salary)
FROM employees
GROUP BY dept_id
HAVING AVG(salary) > 50000;  -- Correct
\`\`\``
    },
    {
      id: 3,
      category: 'Indexes',
      question: 'What is a Database Index and when should you use it?',
      answer: `**What is an Index?**
- Data structure that improves query performance
- Similar to book index - helps find data quickly
- Stores column values + pointers to actual rows
- Trade-off: Faster SELECT, slower INSERT/UPDATE/DELETE

**Types of Indexes:**

**1. Primary Key Index:**
- Automatically created on PRIMARY KEY
- Unique and NOT NULL
- One per table

**2. Unique Index:**
- Ensures column values are unique
- Can have NULL (unlike PRIMARY KEY)

**3. Composite Index:**
- Index on multiple columns
- Order matters! (col1, col2) ≠ (col2, col1)

\`\`\`sql
CREATE INDEX idx_name_dept ON employees(name, dept_id);
-- Helps: WHERE name='John' AND dept_id=5
-- Helps: WHERE name='John'
-- Doesn't help: WHERE dept_id=5 (only second column)
\`\`\`

**4. Full-Text Index:**
- For text search (LIKE, MATCH)
- Used for searching in large text columns

**When to Use Indexes:**

**✅ Use Index When:**
- Column frequently in WHERE clause
- Column frequently in JOIN conditions
- Column frequently in ORDER BY
- Column has high selectivity (many unique values)
- Table is large (millions of rows)
- Read-heavy operations

\`\`\`sql
-- Good candidates for index
SELECT * FROM orders WHERE customer_id = 123;  -- Frequent lookup
SELECT * FROM users WHERE email = 'test@example.com';  -- Unique search
\`\`\`

**❌ Don't Use Index When:**
- Small tables (few hundred rows)
- Column has low selectivity (few unique values, e.g., gender M/F)
- Table has frequent INSERT/UPDATE/DELETE
- Column rarely used in queries

**Index Performance:**

| Without Index | With Index |
|---------------|------------|
| O(n) - Full table scan | O(log n) - B-tree lookup |
| Slow for large tables | Fast even for millions of rows |

**Example:**
\`\`\`sql
-- Create index
CREATE INDEX idx_salary ON employees(salary);

-- This query now uses index (fast)
SELECT * FROM employees WHERE salary > 50000;

-- Check if index is used
EXPLAIN SELECT * FROM employees WHERE salary > 50000;
\`\`\`

**Index Overhead:**
- Each index takes disk space
- Slows down INSERT (must update index)
- Slows down UPDATE (if indexed column changes)
- Slows down DELETE (must update index)

**Best Practices:**
1. Don't over-index (max 4-5 per table)
2. Index foreign keys
3. Index columns used in WHERE, JOIN, ORDER BY
4. Use composite indexes for multi-column queries
5. Monitor slow queries and add indexes strategically
6. Drop unused indexes

**Viewing Indexes:**
\`\`\`sql
-- MySQL
SHOW INDEXES FROM employees;

-- PostgreSQL
\\d employees;
\`\`\``
    },
    {
      id: 4,
      category: 'Normalization',
      question: 'Explain Database Normalization and its Normal Forms',
      answer: `**What is Normalization?**
- Process of organizing database to reduce redundancy and dependency
- Divides large tables into smaller tables and links them using relationships
- Improves data integrity and reduces update anomalies

**Normal Forms:**

**1NF (First Normal Form):**
- Each column contains atomic (indivisible) values
- Each column contains values of single type
- Each column has unique name
- Order doesn't matter

\`\`\`sql
-- VIOLATION of 1NF (multi-valued column)
CREATE TABLE employees (
    id INT,
    name VARCHAR(100),
    phone VARCHAR(200)  -- '555-1234, 555-5678' - Multiple values!
);

-- CORRECT (1NF compliant)
CREATE TABLE employees (
    id INT,
    name VARCHAR(100)
);
CREATE TABLE employee_phones (
    employee_id INT,
    phone VARCHAR(20)
);
\`\`\`

**2NF (Second Normal Form):**
- Must be in 1NF
- All non-key columns fully dependent on PRIMARY KEY
- Eliminates partial dependency

\`\`\`sql
-- VIOLATION of 2NF
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    customer_name VARCHAR(100),  -- Depends only on order_id, not full key!
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- CORRECT (2NF compliant)
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_name VARCHAR(100)
);
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);
\`\`\`

**3NF (Third Normal Form):**
- Must be in 2NF
- No transitive dependency (non-key column depends on another non-key column)

\`\`\`sql
-- VIOLATION of 3NF
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    dept_id INT,
    dept_name VARCHAR(100)  -- Depends on dept_id, not on id directly!
);

-- CORRECT (3NF compliant)
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    dept_id INT
);
CREATE TABLE departments (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);
\`\`\`

**BCNF (Boyce-Codd Normal Form):**
- Stricter than 3NF
- Every determinant must be a candidate key
- Rarely violated if 3NF is properly applied

**Advantages of Normalization:**
✅ Eliminates data redundancy
✅ Ensures data integrity
✅ Easier to modify (update one place)
✅ Smaller database size
✅ Better organized

**Disadvantages:**
❌ More complex queries (need JOINs)
❌ Slower SELECT performance (multiple joins)
❌ More tables to manage

**Denormalization:**
- Intentionally adding redundancy for performance
- Used in data warehousing, reporting databases
- Trade-off: Faster reads, slower writes, more storage

**When to Denormalize:**
- Read-heavy applications
- Reporting/analytics databases
- Acceptable data redundancy
- Need for faster queries
- Example: Storing customer name in orders table to avoid JOIN`
    },
    {
      id: 5,
      category: 'Transactions',
      question: 'Explain ACID properties of database transactions',
      answer: `**ACID Properties:**

**A - Atomicity:**
- All operations in transaction succeed OR all fail
- "All or Nothing" principle
- If any operation fails, entire transaction is rolled back

Example:
\`\`\`sql
BEGIN TRANSACTION;
    UPDATE accounts SET balance = balance - 100 WHERE id = 1;  -- Withdraw
    UPDATE accounts SET balance = balance + 100 WHERE id = 2;  -- Deposit
COMMIT;  -- Both succeed or both fail
\`\`\`

If withdrawal succeeds but deposit fails, the withdrawal is rolled back.

**C - Consistency:**
- Database moves from one valid state to another valid state
- All constraints, triggers, cascades are honored
- Business rules are maintained

Example:
\`\`\`sql
-- Constraint: balance >= 0
BEGIN TRANSACTION;
    UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
    -- If this violates balance >= 0, transaction fails
ROLLBACK;
\`\`\`

**I - Isolation:**
- Concurrent transactions don't interfere with each other
- Each transaction appears to run in isolation
- Controlled by isolation levels

Example:
\`\`\`
Transaction 1: SELECT balance WHERE id=1  (reads $100)
Transaction 2: UPDATE balance = 150 WHERE id=1
Transaction 1: SELECT balance WHERE id=1  (still reads $100, not $150)
\`\`\`

**Isolation Levels:**

1. **READ UNCOMMITTED:**
   - Lowest isolation, highest performance
   - Dirty reads allowed (can read uncommitted data)

2. **READ COMMITTED:**
   - Default in most databases
   - No dirty reads
   - Non-repeatable reads possible

3. **REPEATABLE READ:**
   - No dirty reads, no non-repeatable reads
   - Phantom reads possible

4. **SERIALIZABLE:**
   - Highest isolation, lowest performance
   - No dirty, non-repeatable, or phantom reads
   - Transactions run as if sequential

**D - Durability:**
- Once committed, changes are permanent
- Survives system crashes
- Written to non-volatile storage (disk)

Example:
\`\`\`sql
BEGIN TRANSACTION;
    INSERT INTO orders VALUES (1, 'Product', 100);
COMMIT;  -- Data written to disk, survives power failure
\`\`\`

**Transaction Example:**
\`\`\`sql
-- Bank transfer (withdraw + deposit)
BEGIN TRANSACTION;
    -- Withdraw from account A
    UPDATE accounts
    SET balance = balance - 500
    WHERE account_id = 'A';

    -- Check if balance went negative (consistency)
    IF (SELECT balance FROM accounts WHERE account_id = 'A') < 0 THEN
        ROLLBACK;  -- Atomicity: undo withdrawal
    END IF;

    -- Deposit to account B
    UPDATE accounts
    SET balance = balance + 500
    WHERE account_id = 'B';

COMMIT;  -- Durability: changes permanent
\`\`\`

**Transaction Commands:**

\`\`\`sql
BEGIN TRANSACTION;     -- Start transaction
COMMIT;                -- Save changes permanently
ROLLBACK;              -- Undo all changes
SAVEPOINT sp1;         -- Create savepoint
ROLLBACK TO sp1;       -- Rollback to savepoint
\`\`\`

**Common Transaction Problems:**

1. **Dirty Read:**
   - Reading uncommitted data from another transaction

2. **Non-repeatable Read:**
   - Same SELECT returns different data within transaction

3. **Phantom Read:**
   - New rows appear in range query within transaction

4. **Lost Update:**
   - Two transactions update same data, one overwrites other

**Best Practices:**
- Keep transactions short
- Don't hold locks too long
- Use appropriate isolation level
- Handle deadlocks gracefully
- Use SAVEPOINT for partial rollbacks`
    },
    {
      id: 6,
      category: 'Performance',
      question: 'How would you optimize a slow SQL query?',
      answer: `**Step-by-Step Optimization Process:**

**1. Use EXPLAIN to analyze query:**
\`\`\`sql
EXPLAIN SELECT * FROM orders
WHERE customer_id = 123
ORDER BY created_at DESC;
\`\`\`

Look for:
- Type: ALL (full table scan) - BAD
- Type: index, range, ref, eq_ref - GOOD
- Rows: Number of rows scanned (lower is better)
- Extra: Using filesort, Using temporary - BAD

**2. Add Indexes:**

**Before (Slow):**
\`\`\`sql
-- Full table scan
SELECT * FROM users WHERE email = 'test@example.com';
\`\`\`

**After (Fast):**
\`\`\`sql
CREATE INDEX idx_email ON users(email);
SELECT * FROM users WHERE email = 'test@example.com';
\`\`\`

**3. Optimize WHERE Clause:**

**❌ Slow:**
\`\`\`sql
-- Function on column prevents index use
SELECT * FROM users WHERE YEAR(created_at) = 2024;
SELECT * FROM users WHERE UPPER(name) = 'JOHN';
\`\`\`

**✅ Fast:**
\`\`\`sql
-- Index can be used
SELECT * FROM users
WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01';

-- Create functional index or use LIKE
SELECT * FROM users WHERE name = 'John';
\`\`\`

**4. Avoid SELECT *:**

**❌ Slow:**
\`\`\`sql
SELECT * FROM users;  -- Returns all 50 columns
\`\`\`

**✅ Fast:**
\`\`\`sql
SELECT id, name, email FROM users;  -- Only needed columns
\`\`\`

**5. Use Proper JOIN Technique:**

**❌ Slow:**
\`\`\`sql
-- Cartesian product then filter
SELECT * FROM orders, customers
WHERE orders.customer_id = customers.id;
\`\`\`

**✅ Fast:**
\`\`\`sql
-- Explicit JOIN with index on customer_id
SELECT * FROM orders
INNER JOIN customers ON orders.customer_id = customers.id;
\`\`\`

**6. Limit Results:**

**❌ Slow:**
\`\`\`sql
SELECT * FROM logs ORDER BY created_at DESC;  -- Returns millions
\`\`\`

**✅ Fast:**
\`\`\`sql
SELECT * FROM logs
ORDER BY created_at DESC
LIMIT 100;  -- Only what you need
\`\`\`

**7. Use EXISTS instead of IN for subqueries:**

**❌ Slow:**
\`\`\`sql
SELECT * FROM customers
WHERE id IN (SELECT customer_id FROM orders WHERE total > 1000);
\`\`\`

**✅ Fast:**
\`\`\`sql
SELECT * FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o
    WHERE o.customer_id = c.id AND o.total > 1000
);
\`\`\`

**8. Avoid OR in WHERE (use UNION):**

**❌ Slow:**
\`\`\`sql
SELECT * FROM users
WHERE first_name = 'John' OR last_name = 'Smith';
-- Cannot use index efficiently
\`\`\`

**✅ Fast:**
\`\`\`sql
SELECT * FROM users WHERE first_name = 'John'
UNION
SELECT * FROM users WHERE last_name = 'Smith';
-- Each can use separate index
\`\`\`

**9. Use Covering Index:**

\`\`\`sql
-- Create index that includes all columns in query
CREATE INDEX idx_covering ON orders(customer_id, status, total);

-- Query satisfied entirely from index (no table lookup)
SELECT customer_id, status, total
FROM orders
WHERE customer_id = 123;
\`\`\`

**10. Optimize GROUP BY:**

**❌ Slow:**
\`\`\`sql
SELECT customer_id, COUNT(*)
FROM orders
GROUP BY customer_id
HAVING COUNT(*) > 5;
-- Full table scan + grouping
\`\`\`

**✅ Fast:**
\`\`\`sql
-- Add index on customer_id
CREATE INDEX idx_customer ON orders(customer_id);
SELECT customer_id, COUNT(*)
FROM orders
GROUP BY customer_id
HAVING COUNT(*) > 5;
\`\`\`

**11. Partition Large Tables:**

\`\`\`sql
-- Partition by year for faster queries on date ranges
CREATE TABLE logs (
    id INT,
    message TEXT,
    created_at DATE
) PARTITION BY RANGE (YEAR(created_at)) (
    PARTITION p2022 VALUES LESS THAN (2023),
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025)
);
\`\`\`

**12. Query Caching:**
- Use application-level cache (Redis, Memcached)
- Cache frequently accessed, rarely changed data
- Set appropriate TTL (Time To Live)

**Performance Monitoring Tools:**
- EXPLAIN / EXPLAIN ANALYZE
- Slow query log
- Performance schema
- Query profiling tools
- Database monitoring (New Relic, DataDog)

**Common Pitfalls:**
❌ No indexes on foreign keys
❌ Using wildcard at start of LIKE: \`LIKE '%text'\`
❌ Not using prepared statements (causes parsing overhead)
❌ Large OFFSET in pagination
❌ N+1 query problem in application code`
    },
    {
      id: 7,
      category: 'Advanced',
      question: 'Explain Window Functions (OVER clause) with examples',
      answer: `**What are Window Functions?**
- Perform calculations across set of rows related to current row
- Unlike GROUP BY, window functions don't collapse rows
- Each row retains its identity

**Basic Syntax:**
\`\`\`sql
function_name() OVER (
    PARTITION BY column1
    ORDER BY column2
    ROWS/RANGE frame_specification
)
\`\`\`

**Common Window Functions:**

**1. ROW_NUMBER():**
- Assigns unique sequential number to each row

\`\`\`sql
SELECT
    name,
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank
FROM employees;

-- Output:
-- John    | 100000 | 1
-- Sarah   | 95000  | 2
-- Mike    | 90000  | 3
\`\`\`

**2. RANK() and DENSE_RANK():**
- RANK(): Gaps in ranking for ties
- DENSE_RANK(): No gaps in ranking

\`\`\`sql
SELECT
    name,
    score,
    RANK() OVER (ORDER BY score DESC) AS rank,
    DENSE_RANK() OVER (ORDER BY score DESC) AS dense_rank
FROM students;

-- Output:
-- Alice | 95 | 1 | 1
-- Bob   | 95 | 1 | 1  (tie)
-- Carol | 90 | 3 | 2  (rank has gap, dense_rank doesn't)
\`\`\`

**3. PARTITION BY:**
- Divides result set into partitions

\`\`\`sql
-- Top salary per department
SELECT
    dept_name,
    name,
    salary,
    ROW_NUMBER() OVER (
        PARTITION BY dept_name
        ORDER BY salary DESC
    ) AS dept_rank
FROM employees;

-- Output:
-- Sales | John  | 80000 | 1
-- Sales | Sarah | 75000 | 2
-- IT    | Mike  | 90000 | 1
-- IT    | Lisa  | 85000 | 2
\`\`\`

**4. Aggregate Window Functions:**

\`\`\`sql
SELECT
    name,
    salary,
    dept_name,
    AVG(salary) OVER (PARTITION BY dept_name) AS dept_avg_salary,
    salary - AVG(salary) OVER (PARTITION BY dept_name) AS diff_from_avg
FROM employees;
\`\`\`

**5. LAG() and LEAD():**
- LAG: Access previous row
- LEAD: Access next row

\`\`\`sql
-- Compare with previous month's sales
SELECT
    month,
    sales,
    LAG(sales, 1) OVER (ORDER BY month) AS prev_month_sales,
    sales - LAG(sales, 1) OVER (ORDER BY month) AS growth
FROM monthly_sales;

-- Output:
-- Jan | 10000 | NULL  | NULL
-- Feb | 12000 | 10000 | 2000
-- Mar | 11000 | 12000 | -1000
\`\`\`

**6. Running Totals:**

\`\`\`sql
SELECT
    date,
    amount,
    SUM(amount) OVER (
        ORDER BY date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total
FROM transactions;
\`\`\`

**7. Moving Average:**

\`\`\`sql
-- 7-day moving average
SELECT
    date,
    sales,
    AVG(sales) OVER (
        ORDER BY date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS moving_avg_7day
FROM daily_sales;
\`\`\`

**Frame Specifications:**

\`\`\`sql
ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW  -- All previous + current
ROWS BETWEEN 3 PRECEDING AND CURRENT ROW           -- Last 3 + current
ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING   -- Current + all following
ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING           -- Previous + current + next
\`\`\`

**Real-World Example - Top N per Group:**

\`\`\`sql
-- Get top 3 highest-paid employees per department
WITH ranked_employees AS (
    SELECT
        name,
        dept_name,
        salary,
        ROW_NUMBER() OVER (
            PARTITION BY dept_name
            ORDER BY salary DESC
        ) AS rank
    FROM employees
)
SELECT name, dept_name, salary
FROM ranked_employees
WHERE rank <= 3;
\`\`\`

**Window Functions vs GROUP BY:**

| Window Functions | GROUP BY |
|------------------|----------|
| Preserves rows | Collapses rows |
| Can use aggregates + individual columns | Only aggregates or grouped columns |
| More flexible | Simpler |

**Use Cases:**
- Ranking (top N per category)
- Running totals and cumulative sums
- Moving averages
- Year-over-year comparisons
- Percentile calculations
- Gap and island problems`
    },
    {
      id: 8,
      category: 'Advanced',
      question: 'What are CTEs (Common Table Expressions) and when to use them?',
      answer: `**What is a CTE?**
- Temporary named result set
- Defined using WITH clause
- Exists only during query execution
- More readable than subqueries

**Basic Syntax:**
\`\`\`sql
WITH cte_name AS (
    SELECT columns FROM table WHERE condition
)
SELECT * FROM cte_name;
\`\`\`

**Simple CTE Example:**
\`\`\`sql
-- Without CTE (subquery)
SELECT *
FROM (
    SELECT dept_id, AVG(salary) AS avg_sal
    FROM employees
    GROUP BY dept_id
) AS dept_avg
WHERE avg_sal > 50000;

-- With CTE (cleaner)
WITH dept_avg AS (
    SELECT dept_id, AVG(salary) AS avg_sal
    FROM employees
    GROUP BY dept_id
)
SELECT * FROM dept_avg WHERE avg_sal > 50000;
\`\`\`

**Multiple CTEs:**
\`\`\`sql
WITH
    high_earners AS (
        SELECT * FROM employees WHERE salary > 100000
    ),
    dept_stats AS (
        SELECT dept_id, COUNT(*) AS emp_count
        FROM high_earners
        GROUP BY dept_id
    )
SELECT d.name, ds.emp_count
FROM departments d
JOIN dept_stats ds ON d.id = ds.dept_id;
\`\`\`

**Recursive CTE:**
- CTE that references itself
- Used for hierarchical or tree data

**Example 1: Generate Series**
\`\`\`sql
-- Generate numbers 1 to 10
WITH RECURSIVE numbers AS (
    SELECT 1 AS n      -- Base case
    UNION ALL
    SELECT n + 1       -- Recursive case
    FROM numbers
    WHERE n < 10       -- Termination condition
)
SELECT * FROM numbers;
\`\`\`

**Example 2: Organizational Hierarchy**
\`\`\`sql
WITH RECURSIVE employee_hierarchy AS (
    -- Base case: CEO (no manager)
    SELECT id, name, manager_id, 1 AS level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive case: employees reporting to previous level
    SELECT e.id, e.name, e.manager_id, eh.level + 1
    FROM employees e
    JOIN employee_hierarchy eh ON e.manager_id = eh.id
)
SELECT
    REPEAT('  ', level - 1) || name AS hierarchy,
    level
FROM employee_hierarchy
ORDER BY level, name;

-- Output:
-- CEO                    | 1
--   VP Sales             | 2
--     Sales Manager      | 3
--       Sales Rep 1      | 4
--       Sales Rep 2      | 4
--   VP Engineering       | 2
--     Dev Manager        | 3
\`\`\`

**Example 3: Bill of Materials (BOM)**
\`\`\`sql
-- Find all components of a product (including sub-components)
WITH RECURSIVE bom AS (
    -- Base: Top-level product
    SELECT id, name, parent_id, 1 AS depth
    FROM components
    WHERE id = 100  -- Product ID

    UNION ALL

    -- Recursive: Sub-components
    SELECT c.id, c.name, c.parent_id, b.depth + 1
    FROM components c
    JOIN bom b ON c.parent_id = b.id
)
SELECT * FROM bom;
\`\`\`

**When to Use CTEs:**

**✅ Use CTE When:**
- Need better readability than nested subqueries
- Same subquery used multiple times
- Recursive queries (hierarchies, graphs)
- Breaking complex query into logical steps
- Debugging complex queries (can query CTE separately)

**❌ Don't Use CTE When:**
- Simple one-time subquery
- Need to materialize result (use temp table instead)
- Performance critical (CTE might not be optimized)

**CTE vs Subquery vs Temp Table:**

| Feature | CTE | Subquery | Temp Table |
|---------|-----|----------|------------|
| Readability | High | Low | Medium |
| Reusable | Yes (in same query) | No | Yes (across queries) |
| Recursive | Yes | No | No |
| Performance | Similar to subquery | Similar to CTE | Can be better (indexed) |
| Persistence | Query duration | Query duration | Session duration |

**CTE vs VIEW:**

| Feature | CTE | VIEW |
|---------|-----|------|
| Scope | Single query | Database object |
| Performance | Not materialized | Not materialized |
| Security | No | Yes (grant permissions) |
| Reusability | Same query only | Across queries |

**Performance Tip:**
\`\`\`sql
-- CTE is evaluated every time it's referenced
WITH large_cte AS (
    SELECT * FROM huge_table WHERE condition
)
SELECT * FROM large_cte
UNION ALL
SELECT * FROM large_cte;  -- Evaluated TWICE!

-- Better: Use temp table for multiple references
CREATE TEMPORARY TABLE temp_result AS
SELECT * FROM huge_table WHERE condition;

SELECT * FROM temp_result
UNION ALL
SELECT * FROM temp_result;  -- Uses cached result
\`\`\`

**Real-World Use Case - Running Total:**
\`\`\`sql
WITH monthly_sales AS (
    SELECT
        DATE_TRUNC('month', sale_date) AS month,
        SUM(amount) AS total_sales
    FROM sales
    GROUP BY DATE_TRUNC('month', sale_date)
),
running_total AS (
    SELECT
        month,
        total_sales,
        SUM(total_sales) OVER (ORDER BY month) AS cumulative_sales
    FROM monthly_sales
)
SELECT * FROM running_total
ORDER BY month;
\`\`\``
    },
    {
      id: 9,
      category: 'Stored Procedures',
      question: 'What are Stored Procedures and when should you use them?',
      answer: `**What is a Stored Procedure?**
- Precompiled SQL code stored in database
- Can accept parameters and return results
- Executed on database server
- Reusable across applications

**Creating Stored Procedures:**

**MySQL:**
\`\`\`sql
DELIMITER //

CREATE PROCEDURE GetOrdersByCustomer(
    IN p_customer_id INT,
    OUT p_total_orders INT
)
BEGIN
    SELECT * FROM orders WHERE customer_id = p_customer_id;

    SELECT COUNT(*) INTO p_total_orders
    FROM orders WHERE customer_id = p_customer_id;
END //

DELIMITER ;

-- Call procedure
CALL GetOrdersByCustomer(123, @total);
SELECT @total;
\`\`\`

**PostgreSQL:**
\`\`\`sql
CREATE OR REPLACE FUNCTION get_customer_orders(
    p_customer_id INTEGER
)
RETURNS TABLE (
    order_id INTEGER,
    order_date DATE,
    total DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT o.id, o.order_date, o.total_amount
    FROM orders o
    WHERE o.customer_id = p_customer_id;
END;
$$ LANGUAGE plpgsql;

-- Call function
SELECT * FROM get_customer_orders(123);
\`\`\`

**SQL Server:**
\`\`\`sql
CREATE PROCEDURE GetCustomerOrders
    @CustomerId INT,
    @TotalOrders INT OUTPUT
AS
BEGIN
    SELECT * FROM Orders WHERE CustomerId = @CustomerId;

    SELECT @TotalOrders = COUNT(*)
    FROM Orders WHERE CustomerId = @CustomerId;
END;

-- Call procedure
DECLARE @Total INT;
EXEC GetCustomerOrders @CustomerId = 123, @TotalOrders = @Total OUTPUT;
SELECT @Total;
\`\`\`

**When to Use:**
✅ Complex business logic that needs to run on DB
✅ Batch operations for performance
✅ Security - grant execute without table access
✅ Code reuse across applications
✅ Reduce network roundtrips

**When NOT to Use:**
❌ Simple CRUD operations
❌ Logic that changes frequently
❌ When you need database portability
❌ Complex debugging needed

**Pros vs Cons:**
| Pros | Cons |
|------|------|
| Faster execution | Harder to version control |
| Less network traffic | Database-specific syntax |
| Better security | Difficult to debug |
| Encapsulation | Testing complexity |`
    },
    {
      id: 10,
      category: 'Triggers',
      question: 'What are Database Triggers and when should you use them?',
      answer: `**What is a Trigger?**
- Automatic SQL code executed in response to events
- Events: INSERT, UPDATE, DELETE
- Timing: BEFORE or AFTER the event
- Used for auditing, validation, maintaining derived data

**Creating Triggers:**

**MySQL:**
\`\`\`sql
-- Audit trigger
CREATE TRIGGER orders_audit_trigger
AFTER UPDATE ON orders
FOR EACH ROW
BEGIN
    INSERT INTO orders_audit (
        order_id,
        old_status,
        new_status,
        changed_at,
        changed_by
    ) VALUES (
        OLD.id,
        OLD.status,
        NEW.status,
        NOW(),
        CURRENT_USER()
    );
END;

-- Validation trigger
CREATE TRIGGER validate_order_total
BEFORE INSERT ON orders
FOR EACH ROW
BEGIN
    IF NEW.total_amount < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Order total cannot be negative';
    END IF;
END;
\`\`\`

**PostgreSQL:**
\`\`\`sql
-- Create function first
CREATE OR REPLACE FUNCTION audit_order_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' THEN
        INSERT INTO orders_audit (order_id, old_status, new_status, changed_at)
        VALUES (OLD.id, OLD.status, NEW.status, NOW());
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO orders_audit (order_id, old_status, action, changed_at)
        VALUES (OLD.id, OLD.status, 'DELETED', NOW());
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER orders_audit
AFTER UPDATE OR DELETE ON orders
FOR EACH ROW
EXECUTE FUNCTION audit_order_changes();
\`\`\`

**Common Use Cases:**

**1. Audit Logging:**
\`\`\`sql
CREATE TRIGGER employee_audit
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (table_name, record_id, action, old_value, new_value)
    VALUES ('employees', OLD.id, 'UPDATE',
            JSON_OBJECT('salary', OLD.salary),
            JSON_OBJECT('salary', NEW.salary));
END;
\`\`\`

**2. Maintaining Derived Data:**
\`\`\`sql
-- Update order total when items change
CREATE TRIGGER update_order_total
AFTER INSERT OR UPDATE OR DELETE ON order_items
FOR EACH ROW
BEGIN
    UPDATE orders
    SET total_amount = (
        SELECT SUM(quantity * price) FROM order_items WHERE order_id = COALESCE(NEW.order_id, OLD.order_id)
    )
    WHERE id = COALESCE(NEW.order_id, OLD.order_id);
END;
\`\`\`

**3. Cascading Updates:**
\`\`\`sql
CREATE TRIGGER cascade_status_update
AFTER UPDATE OF status ON orders
FOR EACH ROW
WHEN (NEW.status = 'CANCELLED')
BEGIN
    UPDATE order_items SET status = 'CANCELLED' WHERE order_id = NEW.id;
    UPDATE inventory SET quantity = quantity + oi.quantity
    FROM order_items oi WHERE oi.order_id = NEW.id;
END;
\`\`\`

**When to Use:**
✅ Audit trails
✅ Enforcing complex business rules
✅ Maintaining derived/denormalized data
✅ Automatic timestamps (created_at, updated_at)

**When NOT to Use:**
❌ Simple validation (use constraints)
❌ Complex business logic (use application layer)
❌ Performance-critical operations
❌ When behavior needs to be conditional

**Best Practices:**
• Keep triggers simple and fast
• Document all triggers
• Avoid recursive triggers
• Test trigger behavior thoroughly
• Consider impact on bulk operations`
    },
    {
      id: 11,
      category: 'Views',
      question: 'What are SQL Views and Materialized Views?',
      answer: `**What is a View?**
- Virtual table based on SELECT query
- Does not store data (except materialized views)
- Simplifies complex queries
- Provides security layer

**Creating Views:**

**Simple View:**
\`\`\`sql
CREATE VIEW active_customers AS
SELECT id, name, email, phone
FROM customers
WHERE status = 'ACTIVE';

-- Use like a table
SELECT * FROM active_customers WHERE name LIKE 'John%';
\`\`\`

**Complex View with Joins:**
\`\`\`sql
CREATE VIEW order_summary AS
SELECT
    o.id AS order_id,
    c.name AS customer_name,
    o.order_date,
    COUNT(oi.id) AS item_count,
    SUM(oi.quantity * oi.price) AS total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id, c.name, o.order_date;

-- Query the view
SELECT * FROM order_summary WHERE total_amount > 1000;
\`\`\`

**Updatable View:**
\`\`\`sql
-- Simple views can be updatable
CREATE VIEW customer_contacts AS
SELECT id, name, email, phone
FROM customers;

-- Can INSERT, UPDATE, DELETE through view
UPDATE customer_contacts SET phone = '555-1234' WHERE id = 1;
\`\`\`

**View with CHECK OPTION:**
\`\`\`sql
CREATE VIEW active_customers AS
SELECT * FROM customers WHERE status = 'ACTIVE'
WITH CHECK OPTION;

-- This fails - violates view condition
INSERT INTO active_customers (name, status) VALUES ('John', 'INACTIVE');
\`\`\`

**Materialized Views:**
- Stores query results physically
- Needs to be refreshed to update data
- Much faster for complex queries

**PostgreSQL Materialized View:**
\`\`\`sql
CREATE MATERIALIZED VIEW monthly_sales AS
SELECT
    DATE_TRUNC('month', order_date) AS month,
    product_id,
    SUM(quantity) AS total_quantity,
    SUM(amount) AS total_revenue
FROM orders
GROUP BY DATE_TRUNC('month', order_date), product_id;

-- Create index on materialized view
CREATE INDEX idx_monthly_sales_month ON monthly_sales(month);

-- Refresh materialized view
REFRESH MATERIALIZED VIEW monthly_sales;

-- Refresh concurrently (doesn't lock)
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales;
\`\`\`

**Oracle Materialized View:**
\`\`\`sql
CREATE MATERIALIZED VIEW sales_summary
BUILD IMMEDIATE
REFRESH FAST ON COMMIT
AS
SELECT product_id, SUM(quantity) AS total_qty
FROM order_items
GROUP BY product_id;
\`\`\`

**View vs Materialized View:**
| Feature | View | Materialized View |
|---------|------|-------------------|
| Stores data | No | Yes |
| Query performance | Slower | Faster |
| Data freshness | Always current | May be stale |
| Storage | None | Requires space |
| Indexable | No | Yes |
| Update complexity | None | Refresh needed |

**Use Cases:**
| View | Materialized View |
|------|-------------------|
| Security/access control | Complex aggregations |
| Simplify queries | Reporting dashboards |
| Backward compatibility | Data warehousing |
| Abstract schema changes | Caching expensive queries |`
    },
    {
      id: 12,
      category: 'Optimization',
      question: 'How do you analyze and read an EXPLAIN plan?',
      answer: `**EXPLAIN Plan Analysis:**

**Basic EXPLAIN:**
\`\`\`sql
EXPLAIN SELECT * FROM orders WHERE customer_id = 123;

-- PostgreSQL with more details
EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 123;

-- MySQL extended
EXPLAIN FORMAT=JSON SELECT * FROM orders WHERE customer_id = 123;
\`\`\`

**Key Columns in EXPLAIN:**

**1. type (MySQL) / Scan Type:**
\`\`\`
Best to Worst:
├── system    - Table has one row
├── const     - Single row match (primary key)
├── eq_ref    - One row per join (unique index)
├── ref       - Multiple rows, non-unique index
├── range     - Index range scan
├── index     - Full index scan
└── ALL       - Full table scan (WORST!)
\`\`\`

**Example Analysis:**
\`\`\`sql
EXPLAIN SELECT * FROM orders WHERE status = 'PENDING';

-- BAD: type = ALL (full table scan)
+----+-------------+--------+------+---------------+------+
| id | select_type | table  | type | possible_keys | rows |
+----+-------------+--------+------+---------------+------+
| 1  | SIMPLE      | orders | ALL  | NULL          | 50000|
+----+-------------+--------+------+---------------+------+

-- After adding index
CREATE INDEX idx_status ON orders(status);

-- GOOD: type = ref (index used)
+----+-------------+--------+------+---------------+------------+
| id | select_type | table  | type | possible_keys | rows       |
+----+-------------+--------+------+---------------+------------+
| 1  | SIMPLE      | orders | ref  | idx_status    | 500        |
+----+-------------+--------+------+---------------+------------+
\`\`\`

**2. key / Index Used:**
\`\`\`sql
EXPLAIN SELECT * FROM orders WHERE customer_id = 123 AND status = 'PENDING';

-- Check which index is actually used
+---------------+------+
| possible_keys | key  |
+---------------+------+
| idx_customer, | idx_customer_status |
| idx_status,   |      |
| idx_customer_status |
+---------------+------+
\`\`\`

**3. rows / Estimated Rows:**
\`\`\`
Lower is better
Compare with actual table size
High number + ALL type = problem
\`\`\`

**4. Extra / Additional Info:**
\`\`\`
Good:
├── Using index         - Covered by index (no table access)
├── Using where         - WHERE applied
└── Using index condition - Index condition pushdown

Bad:
├── Using filesort      - Extra sorting needed
├── Using temporary     - Temp table created
├── Using join buffer   - No index for join
└── Full scan on NULL key - Subquery issue
\`\`\`

**PostgreSQL EXPLAIN ANALYZE:**
\`\`\`sql
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT o.*, c.name
FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE o.status = 'PENDING';

-- Output:
Hash Join  (cost=1.23..45.67 rows=100 width=200) (actual time=0.5..2.3 rows=95 loops=1)
  Hash Cond: (o.customer_id = c.id)
  Buffers: shared hit=50
  ->  Seq Scan on orders o  (cost=0.00..35.00 rows=100 width=100)
        Filter: (status = 'PENDING')
        Rows Removed by Filter: 9900
  ->  Hash  (cost=1.10..1.10 rows=10 width=100)
        Buckets: 1024  Batches: 1  Memory Usage: 8kB
        ->  Seq Scan on customers c  (cost=0.00..1.10 rows=10 width=100)
Planning Time: 0.2 ms
Execution Time: 2.5 ms
\`\`\`

**Key Metrics:**
\`\`\`
cost=startup..total    - Estimated cost units
actual time            - Real execution time (ms)
rows                   - Rows returned
loops                  - Times operation executed
Buffers: shared hit    - Pages read from cache
Buffers: shared read   - Pages read from disk
\`\`\`

**Common Scan Types (PostgreSQL):**
\`\`\`
Seq Scan           - Full table scan
Index Scan         - B-tree index lookup
Index Only Scan    - Covered by index (best)
Bitmap Index Scan  - Multiple index conditions
Bitmap Heap Scan   - After bitmap index scan
\`\`\`

**Join Types:**
\`\`\`
Nested Loop    - Good for small datasets
Hash Join      - Good for larger datasets, equality
Merge Join     - Good for sorted data
\`\`\`

**Optimization Tips:**
1. Look for Seq Scan on large tables
2. Check for Using filesort/temporary
3. Compare estimated vs actual rows
4. Watch for high buffer reads (disk I/O)
5. Look at total execution time
6. Check if correct indexes are used`
    },
    {
      id: 13,
      category: 'Constraints',
      question: 'Explain different types of SQL constraints',
      answer: `**SQL Constraints:**
Rules enforced on table columns to ensure data integrity.

**1. PRIMARY KEY:**
\`\`\`sql
-- Single column
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

-- Composite primary key
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- Auto-increment
CREATE TABLE users (
    id SERIAL PRIMARY KEY,  -- PostgreSQL
    id INT AUTO_INCREMENT PRIMARY KEY,  -- MySQL
    name VARCHAR(100)
);
\`\`\`

**2. FOREIGN KEY:**
\`\`\`sql
CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
        ON DELETE CASCADE
        ON UPDATE SET NULL
);

-- Referential Actions:
-- CASCADE    - Delete/update child rows
-- SET NULL   - Set foreign key to NULL
-- SET DEFAULT - Set to default value
-- RESTRICT   - Prevent deletion (default)
-- NO ACTION  - Same as RESTRICT
\`\`\`

**3. UNIQUE:**
\`\`\`sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    username VARCHAR(50) UNIQUE
);

-- Composite unique
CREATE TABLE user_roles (
    user_id INT,
    role_id INT,
    UNIQUE (user_id, role_id)
);

-- Named constraint
ALTER TABLE users
ADD CONSTRAINT uk_email UNIQUE (email);
\`\`\`

**4. NOT NULL:**
\`\`\`sql
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT  -- NULL allowed
);

-- Add NOT NULL to existing column
ALTER TABLE products
ALTER COLUMN name SET NOT NULL;
\`\`\`

**5. CHECK:**
\`\`\`sql
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    age INT CHECK (age >= 18 AND age <= 120),
    salary DECIMAL(10,2) CHECK (salary > 0),
    hire_date DATE CHECK (hire_date <= CURRENT_DATE)
);

-- Named check constraint
CREATE TABLE orders (
    id INT PRIMARY KEY,
    status VARCHAR(20),
    CONSTRAINT chk_status CHECK (status IN ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'))
);

-- Multiple column check
CREATE TABLE products (
    id INT PRIMARY KEY,
    price DECIMAL(10,2),
    discount_price DECIMAL(10,2),
    CONSTRAINT chk_discount CHECK (discount_price <= price)
);
\`\`\`

**6. DEFAULT:**
\`\`\`sql
CREATE TABLE orders (
    id INT PRIMARY KEY,
    order_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'PENDING',
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PostgreSQL: Default with expression
CREATE TABLE logs (
    id UUID DEFAULT gen_random_uuid(),
    created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

**7. Adding/Dropping Constraints:**
\`\`\`sql
-- Add constraint
ALTER TABLE users
ADD CONSTRAINT fk_department
FOREIGN KEY (dept_id) REFERENCES departments(id);

ALTER TABLE products
ADD CONSTRAINT chk_price CHECK (price > 0);

-- Drop constraint
ALTER TABLE users DROP CONSTRAINT fk_department;
ALTER TABLE users DROP CONSTRAINT uk_email;

-- MySQL: Drop foreign key
ALTER TABLE orders DROP FOREIGN KEY fk_customer;
\`\`\`

**8. Viewing Constraints:**
\`\`\`sql
-- PostgreSQL
SELECT conname, contype, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'users'::regclass;

-- MySQL
SELECT * FROM information_schema.TABLE_CONSTRAINTS
WHERE TABLE_NAME = 'users';

-- SQL Server
SELECT * FROM sys.check_constraints
WHERE parent_object_id = OBJECT_ID('users');
\`\`\`

**Constraint Types Summary:**
| Constraint | Purpose | Multiple per Table |
|------------|---------|-------------------|
| PRIMARY KEY | Unique identifier | No (1 only) |
| FOREIGN KEY | Referential integrity | Yes |
| UNIQUE | Prevent duplicates | Yes |
| NOT NULL | Require value | Yes (per column) |
| CHECK | Custom validation | Yes |
| DEFAULT | Automatic value | Yes (per column) |`
    },
    {
      id: 14,
      category: 'Locking',
      question: 'Explain database locking and how to prevent deadlocks',
      answer: `**Database Locking:**

**Types of Locks:**

**1. Shared Lock (Read Lock):**
\`\`\`sql
-- Multiple transactions can read simultaneously
SELECT * FROM orders WHERE id = 1 FOR SHARE;

-- PostgreSQL
SELECT * FROM orders WHERE id = 1 FOR KEY SHARE;
\`\`\`

**2. Exclusive Lock (Write Lock):**
\`\`\`sql
-- Only one transaction can write
SELECT * FROM orders WHERE id = 1 FOR UPDATE;

-- Lock and skip locked rows
SELECT * FROM orders WHERE status = 'PENDING'
FOR UPDATE SKIP LOCKED
LIMIT 10;

-- Lock with no wait (fail immediately if locked)
SELECT * FROM orders WHERE id = 1 FOR UPDATE NOWAIT;
\`\`\`

**Lock Granularity:**
\`\`\`
Row-level    - Locks specific rows
Page-level   - Locks database pages
Table-level  - Locks entire table
Database     - Locks entire database
\`\`\`

**Deadlock Example:**
\`\`\`sql
-- Transaction 1:
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;  -- Locks row 1
-- waits for row 2...
UPDATE accounts SET balance = balance + 100 WHERE id = 2;  -- DEADLOCK!

-- Transaction 2:
BEGIN;
UPDATE accounts SET balance = balance - 50 WHERE id = 2;   -- Locks row 2
-- waits for row 1...
UPDATE accounts SET balance = balance + 50 WHERE id = 1;   -- DEADLOCK!
\`\`\`

**Preventing Deadlocks:**

**1. Consistent Lock Order:**
\`\`\`sql
-- Always lock in same order (by ID)
-- Transaction 1 and 2 both do:
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;  -- Lock row 1 first
UPDATE accounts SET balance = balance + 100 WHERE id = 2;  -- Then row 2
COMMIT;
\`\`\`

**2. Lock All Resources Upfront:**
\`\`\`sql
BEGIN;
-- Lock all needed rows first
SELECT * FROM accounts WHERE id IN (1, 2) FOR UPDATE;

-- Then do updates
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
\`\`\`

**3. Use NOWAIT or SKIP LOCKED:**
\`\`\`sql
-- Fail immediately if locked
BEGIN;
SELECT * FROM orders WHERE id = 1 FOR UPDATE NOWAIT;
-- Throws error if locked, no deadlock

-- Skip locked rows (for queue processing)
SELECT * FROM tasks WHERE status = 'PENDING'
FOR UPDATE SKIP LOCKED
LIMIT 1;
\`\`\`

**4. Set Lock Timeout:**
\`\`\`sql
-- PostgreSQL
SET lock_timeout = '5s';

-- MySQL
SET innodb_lock_wait_timeout = 5;

-- SQL Server
SET LOCK_TIMEOUT 5000;  -- milliseconds
\`\`\`

**5. Use Optimistic Locking:**
\`\`\`sql
-- Add version column
ALTER TABLE orders ADD COLUMN version INT DEFAULT 0;

-- Update with version check
UPDATE orders
SET status = 'SHIPPED', version = version + 1
WHERE id = 1 AND version = 5;

-- If 0 rows affected, concurrent modification occurred
\`\`\`

**Monitoring Locks:**

**PostgreSQL:**
\`\`\`sql
-- View current locks
SELECT * FROM pg_locks WHERE NOT granted;

-- View blocking queries
SELECT blocked_locks.pid AS blocked_pid,
       blocking_locks.pid AS blocking_pid,
       blocked_activity.query AS blocked_query
FROM pg_catalog.pg_locks blocked_locks
JOIN pg_catalog.pg_locks blocking_locks
  ON blocking_locks.locktype = blocked_locks.locktype
WHERE NOT blocked_locks.granted;
\`\`\`

**MySQL:**
\`\`\`sql
-- View locks
SHOW ENGINE INNODB STATUS;

-- View lock waits
SELECT * FROM information_schema.INNODB_LOCK_WAITS;

-- Kill blocking connection
KILL connection_id;
\`\`\`

**Deadlock Detection:**
\`\`\`sql
-- PostgreSQL: Check for deadlocks in logs
-- MySQL: SHOW ENGINE INNODB STATUS shows deadlock info
-- Databases automatically detect and rollback one transaction
\`\`\`

**Best Practices:**
• Keep transactions short
• Lock resources in consistent order
• Use appropriate isolation level
• Use row-level locking when possible
• Set reasonable lock timeouts
• Consider optimistic locking for low contention
• Monitor and analyze deadlock logs`
    },
    {
      id: 15,
      category: 'Partitioning',
      question: 'What is Table Partitioning and when should you use it?',
      answer: `**Table Partitioning:**
Dividing a large table into smaller, more manageable pieces while keeping it as a single logical table.

**Types of Partitioning:**

**1. Range Partitioning:**
\`\`\`sql
-- PostgreSQL
CREATE TABLE orders (
    id SERIAL,
    order_date DATE NOT NULL,
    customer_id INT,
    total_amount DECIMAL(10,2)
) PARTITION BY RANGE (order_date);

-- Create partitions
CREATE TABLE orders_2023 PARTITION OF orders
    FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');

CREATE TABLE orders_2024 PARTITION OF orders
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

-- MySQL
CREATE TABLE orders (
    id INT AUTO_INCREMENT,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10,2),
    PRIMARY KEY (id, order_date)
) PARTITION BY RANGE (YEAR(order_date)) (
    PARTITION p2022 VALUES LESS THAN (2023),
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);
\`\`\`

**2. List Partitioning:**
\`\`\`sql
-- PostgreSQL
CREATE TABLE orders (
    id SERIAL,
    region VARCHAR(20) NOT NULL,
    order_date DATE,
    total DECIMAL(10,2)
) PARTITION BY LIST (region);

CREATE TABLE orders_na PARTITION OF orders
    FOR VALUES IN ('US', 'CANADA', 'MEXICO');

CREATE TABLE orders_eu PARTITION OF orders
    FOR VALUES IN ('UK', 'GERMANY', 'FRANCE', 'SPAIN');

CREATE TABLE orders_apac PARTITION OF orders
    FOR VALUES IN ('JAPAN', 'CHINA', 'INDIA', 'AUSTRALIA');
\`\`\`

**3. Hash Partitioning:**
\`\`\`sql
-- PostgreSQL
CREATE TABLE orders (
    id SERIAL,
    customer_id INT NOT NULL,
    order_date DATE
) PARTITION BY HASH (customer_id);

CREATE TABLE orders_p0 PARTITION OF orders
    FOR VALUES WITH (MODULUS 4, REMAINDER 0);
CREATE TABLE orders_p1 PARTITION OF orders
    FOR VALUES WITH (MODULUS 4, REMAINDER 1);
CREATE TABLE orders_p2 PARTITION OF orders
    FOR VALUES WITH (MODULUS 4, REMAINDER 2);
CREATE TABLE orders_p3 PARTITION OF orders
    FOR VALUES WITH (MODULUS 4, REMAINDER 3);
\`\`\`

**4. Composite Partitioning:**
\`\`\`sql
-- Range-List partitioning
CREATE TABLE sales (
    id SERIAL,
    sale_date DATE NOT NULL,
    region VARCHAR(20) NOT NULL,
    amount DECIMAL(10,2)
) PARTITION BY RANGE (sale_date);

CREATE TABLE sales_2024 PARTITION OF sales
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01')
    PARTITION BY LIST (region);

CREATE TABLE sales_2024_na PARTITION OF sales_2024
    FOR VALUES IN ('US', 'CANADA');
CREATE TABLE sales_2024_eu PARTITION OF sales_2024
    FOR VALUES IN ('UK', 'GERMANY');
\`\`\`

**Managing Partitions:**
\`\`\`sql
-- Add new partition
CREATE TABLE orders_2025 PARTITION OF orders
    FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

-- Detach partition (for archiving)
ALTER TABLE orders DETACH PARTITION orders_2022;

-- Drop partition
DROP TABLE orders_2020;

-- Attach existing table as partition
ALTER TABLE orders ATTACH PARTITION orders_archive
    FOR VALUES FROM ('2020-01-01') TO ('2021-01-01');
\`\`\`

**Partition Pruning:**
\`\`\`sql
-- Query only scans relevant partition
EXPLAIN SELECT * FROM orders WHERE order_date = '2024-06-15';

-- Output shows: Seq Scan on orders_2024
-- Other partitions not scanned
\`\`\`

**When to Use Partitioning:**
✅ Very large tables (millions/billions of rows)
✅ Time-series data with date-based queries
✅ Data that can be easily segmented
✅ Need to archive/delete old data efficiently
✅ Improve query performance on specific ranges

**When NOT to Use:**
❌ Small tables
❌ Queries span all partitions
❌ No clear partitioning key
❌ Frequent cross-partition operations

**Benefits:**
| Benefit | Description |
|---------|-------------|
| Query performance | Partition pruning |
| Maintenance | Work on individual partitions |
| Archival | Easy to detach/drop old partitions |
| Parallelism | Parallel operations across partitions |
| Storage | Different storage for different partitions |`
    },
    {
      id: 16,
      category: 'Functions',
      question: 'What are Aggregate Functions vs Window Functions?',
      answer: `**Aggregate Functions:**
- Compute single value from multiple rows
- Collapse rows into groups (with GROUP BY)
- Examples: SUM, COUNT, AVG, MIN, MAX

\`\`\`sql
-- Basic aggregation
SELECT
    department,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary,
    SUM(salary) AS total_salary,
    MIN(salary) AS min_salary,
    MAX(salary) AS max_salary
FROM employees
GROUP BY department;

-- Result: One row per department
-- Sales    | 10 | 50000 | 500000 | 30000 | 80000
-- IT       | 15 | 75000 | 1125000| 45000 | 120000
\`\`\`

**Window Functions:**
- Compute value across set of rows
- Rows retain their individual identity
- Uses OVER() clause

\`\`\`sql
-- Same calculations but keeping all rows
SELECT
    name,
    department,
    salary,
    COUNT(*) OVER (PARTITION BY department) AS dept_count,
    AVG(salary) OVER (PARTITION BY department) AS dept_avg,
    SUM(salary) OVER (PARTITION BY department) AS dept_total
FROM employees;

-- Result: All rows preserved with computed values
-- John  | Sales | 50000 | 10 | 50000 | 500000
-- Jane  | Sales | 60000 | 10 | 50000 | 500000
-- Mike  | IT    | 75000 | 15 | 75000 | 1125000
\`\`\`

**Key Differences:**
| Aggregate | Window |
|-----------|--------|
| Collapses rows | Preserves rows |
| Requires GROUP BY | Uses OVER() |
| One result per group | One result per row |
| Can't access individual rows | Can access row values |

**Window Function Types:**

**1. Ranking Functions:**
\`\`\`sql
SELECT
    name,
    department,
    salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rank,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dense_rank,
    NTILE(4) OVER (PARTITION BY department ORDER BY salary DESC) AS quartile
FROM employees;

-- ROW_NUMBER: Always unique (1, 2, 3, 4...)
-- RANK: Gaps for ties (1, 1, 3, 4...)
-- DENSE_RANK: No gaps (1, 1, 2, 3...)
-- NTILE(n): Divides into n buckets
\`\`\`

**2. Value Functions:**
\`\`\`sql
SELECT
    name,
    month,
    sales,
    LAG(sales, 1) OVER (PARTITION BY name ORDER BY month) AS prev_month,
    LEAD(sales, 1) OVER (PARTITION BY name ORDER BY month) AS next_month,
    FIRST_VALUE(sales) OVER (PARTITION BY name ORDER BY month) AS first_sale,
    LAST_VALUE(sales) OVER (
        PARTITION BY name ORDER BY month
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS last_sale
FROM monthly_sales;
\`\`\`

**3. Aggregate Window Functions:**
\`\`\`sql
SELECT
    order_date,
    amount,
    -- Running total
    SUM(amount) OVER (ORDER BY order_date) AS running_total,

    -- 7-day moving average
    AVG(amount) OVER (
        ORDER BY order_date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS moving_avg_7d,

    -- Cumulative count
    COUNT(*) OVER (ORDER BY order_date) AS cumulative_count,

    -- Percent of total
    amount / SUM(amount) OVER () * 100 AS percent_of_total
FROM orders;
\`\`\`

**Frame Specifications:**
\`\`\`sql
-- ROWS: Physical rows
ROWS BETWEEN 3 PRECEDING AND CURRENT ROW

-- RANGE: Logical range (based on ORDER BY value)
RANGE BETWEEN INTERVAL '7' DAY PRECEDING AND CURRENT ROW

-- Common frames:
ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW  -- Running total
ROWS BETWEEN 3 PRECEDING AND 3 FOLLOWING          -- 7-row window
ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING  -- Entire partition
\`\`\`

**Practical Examples:**

**Running Total:**
\`\`\`sql
SELECT
    date,
    revenue,
    SUM(revenue) OVER (ORDER BY date) AS running_total
FROM daily_revenue;
\`\`\`

**Year-over-Year Comparison:**
\`\`\`sql
SELECT
    year,
    month,
    revenue,
    LAG(revenue, 12) OVER (ORDER BY year, month) AS last_year_revenue,
    revenue - LAG(revenue, 12) OVER (ORDER BY year, month) AS yoy_change
FROM monthly_revenue;
\`\`\`

**Top N per Group:**
\`\`\`sql
WITH ranked AS (
    SELECT *,
        ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn
    FROM employees
)
SELECT * FROM ranked WHERE rn <= 3;
\`\`\``
    }
  ]

  // Filter questions based on problemLimit (for Top 100/300 mode)
  const displayQuestions = problemLimit ? questions.slice(0, problemLimit) : questions

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Joins': '#3b82f6',
      'Subqueries': '#8b5cf6',
      'Indexes': '#10b981',
      'Normalization': '#f59e0b',
      'Transactions': '#ef4444',
      'Performance': '#ec4899',
      'Advanced': '#6366f1'
    }
    return colors[category] || '#6b7280'
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
        >
          ← Back to Questions
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#93c5fd',
          margin: 0
        }}>
          SQL Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

      <CollapsibleSidebar
        items={displayQuestions}
        selectedIndex={expandedQuestion ? displayQuestions.findIndex(q => q.id === expandedQuestion) : -1}
        onSelect={(index) => toggleQuestion(displayQuestions[index].id)}
        title="Questions"
        getItemLabel={(item) => `${item.id}. ${item.category}`}
        getItemIcon={() => '❓'}
        primaryColor="#3b82f6"
      />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'left',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Essential SQL interview questions covering JOINs, indexes, transactions, and query optimization.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {displayQuestions.map((q) => (
          <div
            key={q.id}
            style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              borderRadius: '12px',
              border: `3px solid ${expandedQuestion === q.id ? getCategoryColor(q.category) : '#374151'}`,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: expandedQuestion === q.id
                ? '0 8px 16px rgba(0,0,0,0.3)'
                : '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <button
              onClick={() => toggleQuestion(q.id)}
              style={{
                width: '100%',
                padding: '1.5rem',
                backgroundColor: expandedQuestion === q.id
                  ? `${getCategoryColor(q.category)}15`
                  : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                if (expandedQuestion !== q.id) {
                  e.currentTarget.style.backgroundColor = '#374151'
                }
              }}
              onMouseLeave={(e) => {
                if (expandedQuestion !== q.id) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  backgroundColor: getCategoryColor(q.category),
                  color: 'white',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>
                  {q.category}
                </div>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: '700',
                  color: '#e2e8f0',
                  margin: 0
                }}>
                  Q{q.id}. {q.question}
                </h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div onClick={(e) => e.stopPropagation()} style={{ transform: 'scale(0.85)' }}>
                  <CompletionCheckbox problemId={`SQLQuestions-${q.id}`} />
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  color: getCategoryColor(q.category),
                  fontWeight: 'bold',
                  transform: expandedQuestion === q.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  ▼
                </div>
              </div>
            </button>

            {expandedQuestion === q.id && (
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#1e293b',
                borderTop: `2px solid ${getCategoryColor(q.category)}40`
              }}>
                <div style={{
                  fontSize: '1rem',
                  lineHeight: '1.8',
                  color: '#d1d5db',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  textAlign: 'left'
                }}>
                  {renderFormattedAnswer(q.answer)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderRadius: '12px',
        border: '2px solid #6366f1'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#a5b4fc', marginBottom: '0.5rem' }}>
          SQL Interview Tips
        </h3>
        <ul style={{ color: '#d1d5db', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Practice writing queries by hand (whiteboard interviews common)</li>
          <li>Understand execution order: FROM - WHERE - GROUP BY - HAVING - SELECT - ORDER BY</li>
          <li>Know when to use indexes and their trade-offs</li>
          <li>Be familiar with EXPLAIN PLAN for query optimization</li>
          <li>Understand differences between SQL dialects (MySQL, PostgreSQL, Oracle)</li>
        </ul>
      </div>
    </div>
  )
}

export default SQLQuestions

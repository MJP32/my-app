import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

function SQLQuestions({ onBack, breadcrumb }) {
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
    }
  ]

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
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
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

      <Breadcrumb breadcrumb={breadcrumb} />

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
        {questions.map((q) => (
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
              <div style={{
                fontSize: '1.5rem',
                color: getCategoryColor(q.category),
                fontWeight: 'bold',
                marginLeft: '1rem',
                transform: expandedQuestion === q.id ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}>
                ▼
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

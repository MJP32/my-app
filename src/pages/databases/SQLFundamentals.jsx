import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

const DATABASE_COLORS = {
  primary: '#06b6d4',
  primaryHover: '#22d3ee',
  bg: 'rgba(6, 182, 212, 0.1)',
  border: 'rgba(6, 182, 212, 0.3)',
  arrow: '#06b6d4',
  hoverBg: 'rgba(6, 182, 212, 0.2)',
  topicBg: 'rgba(6, 182, 212, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
]

// Join Types Diagram
const JoinDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">SQL JOIN Types Visualized</text>

    {/* INNER JOIN */}
    <g transform="translate(50, 50)">
      <circle cx="50" cy="60" r="45" fill="none" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="95" cy="60" r="45" fill="none" stroke="#3b82f6" strokeWidth="2"/>
      <path d="M 72 20 A 45 45 0 0 1 72 100 A 45 45 0 0 1 72 20" fill="#3b82f6" opacity="0.6"/>
      <text x="72" y="140" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">INNER JOIN</text>
      <text x="72" y="158" textAnchor="middle" fill="#94a3b8" fontSize="9">Only matching rows</text>
      <text x="30" y="60" textAnchor="middle" fill="#94a3b8" fontSize="10">A</text>
      <text x="115" y="60" textAnchor="middle" fill="#94a3b8" fontSize="10">B</text>
    </g>

    {/* LEFT JOIN */}
    <g transform="translate(230, 50)">
      <circle cx="50" cy="60" r="45" fill="#3b82f6" opacity="0.4" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="95" cy="60" r="45" fill="none" stroke="#3b82f6" strokeWidth="2"/>
      <path d="M 72 20 A 45 45 0 0 1 72 100 A 45 45 0 0 1 72 20" fill="#3b82f6" opacity="0.6"/>
      <text x="72" y="140" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">LEFT JOIN</text>
      <text x="72" y="158" textAnchor="middle" fill="#94a3b8" fontSize="9">All from A + matches</text>
      <text x="30" y="60" textAnchor="middle" fill="white" fontSize="10">A</text>
      <text x="115" y="60" textAnchor="middle" fill="#94a3b8" fontSize="10">B</text>
    </g>

    {/* RIGHT JOIN */}
    <g transform="translate(410, 50)">
      <circle cx="50" cy="60" r="45" fill="none" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="95" cy="60" r="45" fill="#3b82f6" opacity="0.4" stroke="#3b82f6" strokeWidth="2"/>
      <path d="M 72 20 A 45 45 0 0 1 72 100 A 45 45 0 0 1 72 20" fill="#3b82f6" opacity="0.6"/>
      <text x="72" y="140" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">RIGHT JOIN</text>
      <text x="72" y="158" textAnchor="middle" fill="#94a3b8" fontSize="9">All from B + matches</text>
      <text x="30" y="60" textAnchor="middle" fill="#94a3b8" fontSize="10">A</text>
      <text x="115" y="60" textAnchor="middle" fill="white" fontSize="10">B</text>
    </g>

    {/* FULL OUTER JOIN */}
    <g transform="translate(590, 50)">
      <circle cx="50" cy="60" r="45" fill="#3b82f6" opacity="0.4" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="95" cy="60" r="45" fill="#3b82f6" opacity="0.4" stroke="#3b82f6" strokeWidth="2"/>
      <text x="72" y="140" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">FULL OUTER</text>
      <text x="72" y="158" textAnchor="middle" fill="#94a3b8" fontSize="9">All from both tables</text>
      <text x="30" y="60" textAnchor="middle" fill="white" fontSize="10">A</text>
      <text x="115" y="60" textAnchor="middle" fill="white" fontSize="10">B</text>
    </g>

    {/* CROSS JOIN note */}
    <rect x="250" y="195" width="300" height="35" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="400" y="217" textAnchor="middle" fill="#a78bfa" fontSize="10">CROSS JOIN: Cartesian product (every row with every row)</text>

    <text x="400" y="265" textAnchor="middle" fill="#64748b" fontSize="10">NULL values appear for non-matching rows in LEFT/RIGHT/FULL joins</text>
  </svg>
)

function SQLFundamentals({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'sql-vocabulary',
      name: 'SQL Vocabulary',
      icon: '📖',
      color: '#06b6d4',
      description: 'Essential SQL terms and definitions every developer should know',
      details: [
        {
          name: 'DDL - Data Definition',
          explanation: 'DDL (Data Definition Language) commands define database structure. CREATE builds new objects, ALTER modifies existing ones, DROP removes them, TRUNCATE empties tables quickly. These commands auto-commit and cannot be rolled back in most databases.',
          codeExample: `-- CREATE: Build new database objects
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

-- ALTER: Modify existing objects
ALTER TABLE users ADD COLUMN name VARCHAR(100);
ALTER TABLE users DROP COLUMN name;
ALTER TABLE users RENAME COLUMN email TO email_address;

-- DROP: Remove objects completely
DROP TABLE IF EXISTS users CASCADE;
DROP INDEX idx_users_email;

-- TRUNCATE: Empty table (faster than DELETE)
TRUNCATE TABLE logs;  -- Resets auto-increment, cannot rollback`
        },
        {
          name: 'DML - Data Manipulation',
          explanation: 'DML (Data Manipulation Language) commands work with data: SELECT retrieves data, INSERT adds new rows, UPDATE modifies existing rows, DELETE removes rows. These can be rolled back within transactions.',
          codeExample: `-- SELECT: Retrieve data
SELECT id, email FROM users WHERE active = true;

-- INSERT: Add new rows
INSERT INTO users (email) VALUES ('user@example.com');
INSERT INTO users (email, name)
VALUES ('a@test.com', 'Alice'), ('b@test.com', 'Bob');

-- UPDATE: Modify existing rows
UPDATE users SET name = 'Updated' WHERE id = 1;
UPDATE products SET price = price * 1.1;  -- 10% increase

-- DELETE: Remove rows
DELETE FROM users WHERE id = 1;
DELETE FROM logs WHERE created_at < '2024-01-01';

-- UPSERT: Insert or update (PostgreSQL)
INSERT INTO users (email, name) VALUES ('test@example.com', 'Test')
ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name;`
        },
        {
          name: 'Key Database Terms',
          explanation: 'Primary Key uniquely identifies each row. Foreign Key references another table. Index speeds up queries. Constraint enforces data rules. Schema organizes database objects. View is a saved query. Transaction groups operations atomically.',
          codeExample: `-- PRIMARY KEY: Unique identifier for each row
CREATE TABLE products (
    id SERIAL PRIMARY KEY,  -- Auto-incrementing unique ID
    sku VARCHAR(50) UNIQUE  -- Another unique identifier
);

-- FOREIGN KEY: Reference to another table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id)
);

-- INDEX: Speed up queries on columns
CREATE INDEX idx_orders_user ON orders(user_id);

-- CONSTRAINT: Enforce data rules
ALTER TABLE products ADD CONSTRAINT price_positive CHECK (price > 0);

-- VIEW: Saved query (virtual table)
CREATE VIEW active_users AS
SELECT * FROM users WHERE status = 'active';

-- SCHEMA: Organize objects
CREATE SCHEMA reporting;
CREATE TABLE reporting.monthly_sales (...);`
        },
        {
          name: 'Query Clauses',
          explanation: 'SELECT chooses columns, FROM specifies tables, WHERE filters rows, GROUP BY aggregates, HAVING filters groups, ORDER BY sorts results, LIMIT restricts rows returned. Execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.',
          codeExample: `-- Full query with all clauses
SELECT
    department,                    -- SELECT: columns to return
    COUNT(*) AS employee_count,    -- Aggregate with alias
    AVG(salary) AS avg_salary
FROM employees                     -- FROM: source table(s)
WHERE hire_date > '2020-01-01'     -- WHERE: filter rows
GROUP BY department                -- GROUP BY: aggregate groups
HAVING COUNT(*) > 5                -- HAVING: filter groups
ORDER BY avg_salary DESC           -- ORDER BY: sort results
LIMIT 10                           -- LIMIT: max rows returned
OFFSET 5;                          -- OFFSET: skip rows

-- Execution order (not syntax order):
-- 1. FROM (get data)
-- 2. WHERE (filter rows)
-- 3. GROUP BY (aggregate)
-- 4. HAVING (filter groups)
-- 5. SELECT (choose columns)
-- 6. ORDER BY (sort)
-- 7. LIMIT/OFFSET (restrict)`
        },
        {
          name: 'NULL Handling',
          explanation: 'NULL represents missing/unknown data. NULL is not equal to anything, including NULL. Use IS NULL/IS NOT NULL to test. COALESCE returns the first non-NULL value. NULLIF returns NULL if values match. NULLs sort last by default.',
          codeExample: `-- Testing for NULL
SELECT * FROM users WHERE phone IS NULL;
SELECT * FROM users WHERE phone IS NOT NULL;

-- NULL comparisons (these return no rows!)
SELECT * FROM users WHERE phone = NULL;     -- Wrong!
SELECT * FROM users WHERE phone <> NULL;    -- Wrong!

-- COALESCE: First non-NULL value
SELECT COALESCE(nickname, first_name, 'Anonymous') AS display_name
FROM users;

-- NULLIF: Return NULL if values match
SELECT NULLIF(discount, 0) AS discount  -- Avoid division by zero
FROM products;

SELECT price / NULLIF(discount, 0) FROM products;

-- NULL in aggregates (NULLs are ignored)
SELECT AVG(salary) FROM employees;  -- NULLs excluded
SELECT COUNT(phone) FROM users;     -- Counts non-NULL only
SELECT COUNT(*) FROM users;         -- Counts all rows

-- NULL ordering
SELECT * FROM users ORDER BY phone NULLS LAST;
SELECT * FROM users ORDER BY phone NULLS FIRST;`
        },
        {
          name: 'Data Types',
          explanation: 'Common types: INTEGER/BIGINT for whole numbers, DECIMAL/NUMERIC for exact decimals, FLOAT/REAL for approximate decimals, VARCHAR/TEXT for strings, DATE/TIME/TIMESTAMP for dates, BOOLEAN for true/false, UUID for unique identifiers.',
          codeExample: `-- Numeric types
CREATE TABLE numbers_example (
    small_int SMALLINT,        -- -32,768 to 32,767
    regular_int INTEGER,       -- -2B to 2B
    big_int BIGINT,            -- Very large numbers
    price DECIMAL(10, 2),      -- Exact: 10 digits, 2 decimal
    rating REAL,               -- Approximate decimal
    percentage FLOAT           -- Approximate decimal
);

-- String types
CREATE TABLE strings_example (
    code CHAR(5),              -- Fixed length, padded
    name VARCHAR(100),         -- Variable length, max 100
    description TEXT,          -- Unlimited length
    email CITEXT               -- Case-insensitive (PostgreSQL)
);

-- Date/Time types
CREATE TABLE dates_example (
    birth_date DATE,           -- Date only
    start_time TIME,           -- Time only
    created_at TIMESTAMP,      -- Date + time
    updated_at TIMESTAMPTZ,    -- With timezone (recommended)
    duration INTERVAL          -- Time span
);

-- Other types
CREATE TABLE other_types (
    id UUID DEFAULT gen_random_uuid(),
    is_active BOOLEAN DEFAULT true,
    tags TEXT[],               -- Array (PostgreSQL)
    metadata JSONB             -- JSON (PostgreSQL)
);`
        }
      ]
    },
    {
      id: 'joins',
      name: 'JOIN Types',
      icon: '🔗',
      color: '#3b82f6',
      description: 'Master all SQL JOIN types: INNER, LEFT, RIGHT, FULL, CROSS, and SELF joins',
      diagram: JoinDiagram,
      details: [
        {
          name: 'INNER JOIN',
          explanation: 'INNER JOIN returns only rows where there is a match in BOTH tables. If a row in table A has no matching row in table B, it is excluded from results. This is the most common join type and the default when you just write JOIN.',
          codeExample: `-- Tables for examples:
-- users: id, name, department_id
-- departments: id, name

-- INNER JOIN: Only matching rows
SELECT u.name AS user_name, d.name AS department
FROM users u
INNER JOIN departments d ON u.department_id = d.id;

-- Equivalent using just JOIN (INNER is default)
SELECT u.name, d.name
FROM users u
JOIN departments d ON u.department_id = d.id;

-- Multiple conditions
SELECT o.id, u.name, p.name AS product
FROM orders o
INNER JOIN users u ON o.user_id = u.id
INNER JOIN products p ON o.product_id = p.id
WHERE o.status = 'completed';

-- Using USING when column names match
SELECT * FROM orders
INNER JOIN users USING (user_id);  -- Same as ON orders.user_id = users.user_id`
        },
        {
          name: 'LEFT JOIN',
          explanation: 'LEFT JOIN (or LEFT OUTER JOIN) returns ALL rows from the left table, plus matching rows from the right table. If no match exists, NULL values appear for right table columns. Use when you need all records from the primary table.',
          codeExample: `-- LEFT JOIN: All users, even without departments
SELECT u.name, d.name AS department
FROM users u
LEFT JOIN departments d ON u.department_id = d.id;

-- Result includes users with department_id = NULL
-- Those rows show NULL for department name

-- Find users WITHOUT a department (LEFT JOIN + WHERE NULL)
SELECT u.name
FROM users u
LEFT JOIN departments d ON u.department_id = d.id
WHERE d.id IS NULL;

-- Count orders per user (including users with 0 orders)
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;

-- Multiple LEFT JOINs
SELECT u.name, o.id AS order_id, p.name AS product
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
LEFT JOIN products p ON o.product_id = p.id;`
        },
        {
          name: 'RIGHT JOIN',
          explanation: 'RIGHT JOIN returns ALL rows from the right table, plus matching rows from the left. Rarely used because you can achieve the same result by swapping table order and using LEFT JOIN. Some developers prefer LEFT JOIN for consistency.',
          codeExample: `-- RIGHT JOIN: All departments, even without users
SELECT u.name, d.name AS department
FROM users u
RIGHT JOIN departments d ON u.department_id = d.id;

-- Equivalent using LEFT JOIN (more common style)
SELECT u.name, d.name AS department
FROM departments d
LEFT JOIN users u ON u.department_id = d.id;

-- Find departments with no users
SELECT d.name
FROM users u
RIGHT JOIN departments d ON u.department_id = d.id
WHERE u.id IS NULL;

-- Same result with LEFT JOIN
SELECT d.name
FROM departments d
LEFT JOIN users u ON u.department_id = d.id
WHERE u.id IS NULL;`
        },
        {
          name: 'FULL OUTER JOIN',
          explanation: 'FULL OUTER JOIN returns ALL rows from BOTH tables. Matching rows are combined; non-matching rows appear with NULLs for the missing side. Useful for finding discrepancies or merging datasets.',
          codeExample: `-- FULL OUTER JOIN: All users and all departments
SELECT u.name AS user_name, d.name AS department
FROM users u
FULL OUTER JOIN departments d ON u.department_id = d.id;

-- Results include:
-- 1. Users with matching departments
-- 2. Users without departments (department columns = NULL)
-- 3. Departments without users (user columns = NULL)

-- Find unmatched records from either table
SELECT
    COALESCE(u.name, 'No User') AS user_name,
    COALESCE(d.name, 'No Dept') AS department
FROM users u
FULL OUTER JOIN departments d ON u.department_id = d.id
WHERE u.id IS NULL OR d.id IS NULL;

-- Compare two datasets
SELECT
    COALESCE(a.id, b.id) AS id,
    a.value AS old_value,
    b.value AS new_value
FROM old_data a
FULL OUTER JOIN new_data b ON a.id = b.id
WHERE a.value IS DISTINCT FROM b.value;`
        },
        {
          name: 'CROSS JOIN',
          explanation: 'CROSS JOIN produces the Cartesian product: every row from table A paired with every row from table B. Results = rows_A × rows_B. Rarely needed but useful for generating combinations or test data.',
          codeExample: `-- CROSS JOIN: Every combination
SELECT u.name, p.name AS product
FROM users u
CROSS JOIN products p;

-- If users has 100 rows and products has 50,
-- result has 100 × 50 = 5,000 rows

-- Practical use: Generate a calendar
SELECT
    d.date,
    s.name AS store
FROM generate_series('2024-01-01', '2024-12-31', '1 day'::interval) AS d(date)
CROSS JOIN stores s;

-- Generate all size/color combinations
SELECT sizes.size, colors.color
FROM (VALUES ('S'), ('M'), ('L'), ('XL')) AS sizes(size)
CROSS JOIN (VALUES ('Red'), ('Blue'), ('Green')) AS colors(color);

-- Implicit CROSS JOIN (comma syntax - avoid)
SELECT u.name, p.name
FROM users u, products p;  -- Same as CROSS JOIN`
        },
        {
          name: 'SELF JOIN',
          explanation: 'A SELF JOIN joins a table to itself. Useful for hierarchical data (employees/managers), comparing rows within the same table, or finding related records. Always use table aliases to distinguish the two instances.',
          codeExample: `-- Employee/Manager hierarchy
SELECT
    e.name AS employee,
    m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- Find employees who earn more than their manager
SELECT e.name, e.salary, m.name AS manager, m.salary AS manager_salary
FROM employees e
JOIN employees m ON e.manager_id = m.id
WHERE e.salary > m.salary;

-- Find duplicate emails
SELECT a.id, a.email
FROM users a
JOIN users b ON a.email = b.email AND a.id < b.id;

-- Find products in same category with different prices
SELECT
    p1.name AS product1,
    p2.name AS product2,
    p1.category,
    p1.price AS price1,
    p2.price AS price2
FROM products p1
JOIN products p2 ON p1.category = p2.category
    AND p1.id < p2.id
    AND p1.price <> p2.price;`
        }
      ]
    },
    {
      id: 'subqueries',
      name: 'Subqueries',
      icon: '🔍',
      color: '#8b5cf6',
      description: 'Nested queries: scalar, column, table subqueries, and correlated subqueries',
      details: [
        {
          name: 'Scalar Subqueries',
          explanation: 'A scalar subquery returns exactly ONE value (one row, one column). Can be used anywhere a single value is expected: SELECT list, WHERE clause, or even in calculations. Returns NULL if no rows match.',
          codeExample: `-- Scalar subquery in SELECT
SELECT
    name,
    salary,
    salary - (SELECT AVG(salary) FROM employees) AS diff_from_avg
FROM employees;

-- Scalar subquery in WHERE
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Scalar subquery with MAX
SELECT * FROM orders
WHERE created_at = (SELECT MAX(created_at) FROM orders);

-- In calculations
SELECT
    name,
    salary,
    ROUND(salary * 100.0 / (SELECT SUM(salary) FROM employees), 2) AS pct_of_total
FROM employees;

-- As a column value
UPDATE products
SET avg_category_price = (
    SELECT AVG(price) FROM products p2
    WHERE p2.category = products.category
);`
        },
        {
          name: 'IN / NOT IN Subqueries',
          explanation: 'IN checks if a value exists in a subquery result set. NOT IN checks if it does not exist. Be careful: NOT IN returns no rows if the subquery contains NULL. Prefer EXISTS for large datasets.',
          codeExample: `-- IN: Users who have placed orders
SELECT name FROM users
WHERE id IN (SELECT DISTINCT user_id FROM orders);

-- NOT IN: Users who have NOT placed orders
SELECT name FROM users
WHERE id NOT IN (
    SELECT user_id FROM orders
    WHERE user_id IS NOT NULL  -- Important! Handle NULLs
);

-- Multiple columns (some databases)
SELECT * FROM orders
WHERE (user_id, product_id) IN (
    SELECT user_id, product_id FROM wishlist
);

-- IN with literal values (not a subquery)
SELECT * FROM products
WHERE category IN ('Electronics', 'Books', 'Clothing');

-- Warning: NOT IN with NULLs
-- If subquery returns NULL, NOT IN returns 0 rows!
SELECT * FROM a WHERE x NOT IN (SELECT x FROM b);
-- If b.x contains NULL, this returns nothing
-- Use NOT EXISTS instead for safety`
        },
        {
          name: 'EXISTS / NOT EXISTS',
          explanation: 'EXISTS returns TRUE if the subquery returns ANY rows. More efficient than IN for large datasets because it stops at the first match. NOT EXISTS is safer than NOT IN with NULLs. Always use correlated subqueries with EXISTS.',
          codeExample: `-- EXISTS: Users who have orders
SELECT u.name
FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o
    WHERE o.user_id = u.id  -- Correlated: references outer query
);

-- NOT EXISTS: Users without orders (safer than NOT IN)
SELECT u.name
FROM users u
WHERE NOT EXISTS (
    SELECT 1 FROM orders o
    WHERE o.user_id = u.id
);

-- EXISTS is often faster than IN
-- IN:     SELECT * FROM a WHERE x IN (SELECT x FROM b)
-- EXISTS: SELECT * FROM a WHERE EXISTS (SELECT 1 FROM b WHERE b.x = a.x)

-- EXISTS with multiple conditions
SELECT p.name
FROM products p
WHERE EXISTS (
    SELECT 1 FROM order_items oi
    JOIN orders o ON oi.order_id = o.id
    WHERE oi.product_id = p.id
    AND o.created_at > '2024-01-01'
);

-- Check if table has any rows
SELECT CASE WHEN EXISTS (SELECT 1 FROM users) THEN 'Has data' ELSE 'Empty' END;`
        },
        {
          name: 'Correlated Subqueries',
          explanation: 'A correlated subquery references columns from the outer query. It executes once per row of the outer query. Can be slower than JOINs but sometimes more readable. Often used with EXISTS or for row-by-row calculations.',
          codeExample: `-- Correlated: Get each employee's department avg salary
SELECT
    e.name,
    e.salary,
    e.department_id,
    (SELECT AVG(salary) FROM employees e2
     WHERE e2.department_id = e.department_id) AS dept_avg
FROM employees e;

-- Find employees earning above their department average
SELECT name, salary, department_id
FROM employees e
WHERE salary > (
    SELECT AVG(salary) FROM employees e2
    WHERE e2.department_id = e.department_id
);

-- Get latest order for each user
SELECT * FROM orders o
WHERE created_at = (
    SELECT MAX(created_at) FROM orders o2
    WHERE o2.user_id = o.user_id
);

-- Equivalent using window function (often faster)
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn
    FROM orders
) sub WHERE rn = 1;`
        },
        {
          name: 'Derived Tables (FROM)',
          explanation: 'A subquery in the FROM clause creates a derived table (inline view). Must have an alias. Useful for pre-aggregating data or creating intermediate result sets before further processing.',
          codeExample: `-- Derived table: Pre-aggregate then filter
SELECT department, avg_salary
FROM (
    SELECT department, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department
) AS dept_stats
WHERE avg_salary > 50000;

-- Join with derived table
SELECT u.name, order_stats.total_orders, order_stats.total_spent
FROM users u
JOIN (
    SELECT user_id, COUNT(*) AS total_orders, SUM(total) AS total_spent
    FROM orders
    GROUP BY user_id
) AS order_stats ON u.id = order_stats.user_id;

-- Multiple derived tables
SELECT a.category, a.avg_price, b.max_price
FROM (
    SELECT category, AVG(price) AS avg_price
    FROM products GROUP BY category
) a
JOIN (
    SELECT category, MAX(price) AS max_price
    FROM products GROUP BY category
) b ON a.category = b.category;

-- Derived table with column alias
SELECT * FROM (
    SELECT name, salary, salary * 12 AS annual
    FROM employees
) AS emp_annual
WHERE annual > 100000;`
        },
        {
          name: 'ANY / ALL Operators',
          explanation: 'ANY returns TRUE if comparison is true for at least one subquery value. ALL returns TRUE only if comparison is true for every subquery value. Often used with comparison operators (>, <, =, etc.).',
          codeExample: `-- ANY: Salary greater than ANY manager salary
SELECT name, salary
FROM employees
WHERE salary > ANY (
    SELECT salary FROM employees WHERE role = 'Manager'
);
-- Equivalent: salary > minimum manager salary

-- ALL: Salary greater than ALL manager salaries
SELECT name, salary
FROM employees
WHERE salary > ALL (
    SELECT salary FROM employees WHERE role = 'Manager'
);
-- Equivalent: salary > maximum manager salary

-- = ANY is same as IN
SELECT * FROM products
WHERE category = ANY (SELECT category FROM featured_categories);
-- Same as: WHERE category IN (SELECT ...)

-- <> ALL is same as NOT IN
SELECT * FROM products
WHERE category <> ALL (SELECT category FROM discontinued);
-- Same as: WHERE category NOT IN (SELECT ...)

-- Practical example: Find products cheaper than all competitors
SELECT name, price FROM our_products
WHERE price < ALL (
    SELECT price FROM competitor_products
    WHERE competitor_products.sku = our_products.sku
);`
        }
      ]
    },
    {
      id: 'cte',
      name: 'CTEs (WITH Clause)',
      icon: '📋',
      color: '#10b981',
      description: 'Common Table Expressions for readable, maintainable, and recursive queries',
      details: [
        {
          name: 'Basic CTEs',
          explanation: 'A CTE (Common Table Expression) is a named temporary result set defined in a WITH clause. Makes complex queries more readable by breaking them into logical steps. CTEs exist only for the duration of the query.',
          codeExample: `-- Basic CTE
WITH active_users AS (
    SELECT id, name, email
    FROM users
    WHERE status = 'active'
)
SELECT * FROM active_users WHERE email LIKE '%@gmail.com';

-- CTE with aggregation
WITH order_totals AS (
    SELECT
        user_id,
        COUNT(*) AS order_count,
        SUM(total) AS total_spent
    FROM orders
    GROUP BY user_id
)
SELECT u.name, ot.order_count, ot.total_spent
FROM users u
JOIN order_totals ot ON u.id = ot.user_id
WHERE ot.total_spent > 1000;

-- CTE makes this more readable than nested subqueries:
-- Instead of:
SELECT u.name, sub.order_count
FROM users u
JOIN (SELECT user_id, COUNT(*) AS order_count FROM orders GROUP BY user_id) sub
ON u.id = sub.user_id;`
        },
        {
          name: 'Multiple CTEs',
          explanation: 'You can define multiple CTEs in one WITH clause, separated by commas. Later CTEs can reference earlier ones. This allows building complex queries step by step, improving readability and maintainability.',
          codeExample: `-- Multiple CTEs building on each other
WITH
-- Step 1: Get active users
active_users AS (
    SELECT id, name FROM users WHERE status = 'active'
),
-- Step 2: Get their orders (references active_users)
user_orders AS (
    SELECT
        au.id AS user_id,
        au.name,
        COUNT(o.id) AS order_count,
        SUM(o.total) AS total_spent
    FROM active_users au
    LEFT JOIN orders o ON au.id = o.user_id
    GROUP BY au.id, au.name
),
-- Step 3: Categorize users
user_tiers AS (
    SELECT
        *,
        CASE
            WHEN total_spent > 10000 THEN 'Gold'
            WHEN total_spent > 1000 THEN 'Silver'
            ELSE 'Bronze'
        END AS tier
    FROM user_orders
)
-- Final query
SELECT tier, COUNT(*) AS user_count, SUM(total_spent) AS tier_revenue
FROM user_tiers
GROUP BY tier
ORDER BY tier_revenue DESC;`
        },
        {
          name: 'Recursive CTEs',
          explanation: 'Recursive CTEs can reference themselves, enabling traversal of hierarchical/tree data. Structure: anchor member (base case) UNION ALL recursive member (references the CTE). Always include a termination condition to prevent infinite loops.',
          codeExample: `-- Employee hierarchy (org chart)
WITH RECURSIVE org_chart AS (
    -- Anchor: Top-level employees (no manager)
    SELECT id, name, manager_id, 1 AS level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive: Employees with managers already in result
    SELECT e.id, e.name, e.manager_id, oc.level + 1
    FROM employees e
    JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT * FROM org_chart ORDER BY level, name;

-- Category tree
WITH RECURSIVE category_tree AS (
    SELECT id, name, parent_id, name AS path
    FROM categories WHERE parent_id IS NULL

    UNION ALL

    SELECT c.id, c.name, c.parent_id, ct.path || ' > ' || c.name
    FROM categories c
    JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT * FROM category_tree;

-- Generate number sequence
WITH RECURSIVE numbers AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM numbers WHERE n < 100
)
SELECT * FROM numbers;`
        },
        {
          name: 'CTE vs Subquery',
          explanation: 'CTEs improve readability and allow reuse within a query. However, in some databases CTEs are optimization fences (not inlined). Subqueries may perform better for simple cases. Use CTEs for complex, multi-step logic.',
          codeExample: `-- Same logic as CTE vs Subquery

-- CTE version (readable, reusable)
WITH high_value_orders AS (
    SELECT user_id, SUM(total) AS total_spent
    FROM orders
    GROUP BY user_id
    HAVING SUM(total) > 1000
)
SELECT u.name, h.total_spent
FROM users u
JOIN high_value_orders h ON u.id = h.user_id;

-- Subquery version (may optimize better)
SELECT u.name, h.total_spent
FROM users u
JOIN (
    SELECT user_id, SUM(total) AS total_spent
    FROM orders
    GROUP BY user_id
    HAVING SUM(total) > 1000
) h ON u.id = h.user_id;

-- CTE can be referenced multiple times
WITH stats AS (
    SELECT AVG(salary) AS avg_sal, MAX(salary) AS max_sal
    FROM employees
)
SELECT
    name,
    salary,
    salary - (SELECT avg_sal FROM stats) AS diff_from_avg,
    salary * 100.0 / (SELECT max_sal FROM stats) AS pct_of_max
FROM employees;`
        },
        {
          name: 'CTE with DML',
          explanation: 'CTEs can wrap INSERT, UPDATE, DELETE statements (in PostgreSQL and some other databases). Useful for returning affected rows, chaining operations, or using RETURNING clause results in further queries.',
          codeExample: `-- CTE with INSERT ... RETURNING
WITH new_user AS (
    INSERT INTO users (name, email)
    VALUES ('John', 'john@example.com')
    RETURNING id, name
)
INSERT INTO user_profiles (user_id, created_at)
SELECT id, NOW() FROM new_user;

-- CTE with DELETE ... RETURNING
WITH deleted_orders AS (
    DELETE FROM orders
    WHERE status = 'cancelled' AND created_at < '2023-01-01'
    RETURNING *
)
INSERT INTO order_archive SELECT * FROM deleted_orders;

-- CTE with UPDATE ... RETURNING
WITH updated AS (
    UPDATE products
    SET price = price * 1.1
    WHERE category = 'Electronics'
    RETURNING id, name, price
)
SELECT * FROM updated;

-- Chain multiple DML operations
WITH
deactivated AS (
    UPDATE users SET status = 'inactive'
    WHERE last_login < '2023-01-01'
    RETURNING id
),
archived AS (
    INSERT INTO inactive_users SELECT * FROM users WHERE id IN (SELECT id FROM deactivated)
    RETURNING id
)
SELECT COUNT(*) AS users_archived FROM archived;`
        }
      ]
    },
    {
      id: 'aggregates',
      name: 'Aggregate Functions',
      icon: '📊',
      color: '#f59e0b',
      description: 'COUNT, SUM, AVG, MIN, MAX and GROUP BY for data summarization',
      details: [
        {
          name: 'Basic Aggregates',
          explanation: 'Aggregate functions compute a single value from multiple rows. COUNT counts rows, SUM adds values, AVG calculates mean, MIN/MAX find extremes. NULL values are ignored (except COUNT(*)).',
          codeExample: `-- COUNT variations
SELECT
    COUNT(*) AS total_rows,           -- Counts all rows
    COUNT(email) AS with_email,       -- Counts non-NULL emails
    COUNT(DISTINCT department) AS dept_count  -- Unique departments
FROM employees;

-- SUM and AVG
SELECT
    SUM(salary) AS total_salary,
    AVG(salary) AS avg_salary,
    SUM(salary) / COUNT(*) AS manual_avg  -- Same as AVG
FROM employees;

-- MIN and MAX
SELECT
    MIN(salary) AS lowest_salary,
    MAX(salary) AS highest_salary,
    MAX(hire_date) AS most_recent_hire,
    MIN(name) AS first_alphabetically
FROM employees;

-- Combining aggregates
SELECT
    COUNT(*) AS employee_count,
    SUM(salary) AS total_payroll,
    ROUND(AVG(salary), 2) AS avg_salary,
    MAX(salary) - MIN(salary) AS salary_range
FROM employees
WHERE department = 'Engineering';`
        },
        {
          name: 'GROUP BY',
          explanation: 'GROUP BY divides rows into groups based on column values. Aggregates are calculated per group. Every non-aggregated column in SELECT must be in GROUP BY. Can group by multiple columns or expressions.',
          codeExample: `-- Basic GROUP BY
SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department;

-- Multiple grouping columns
SELECT department, job_title, COUNT(*), AVG(salary)
FROM employees
GROUP BY department, job_title
ORDER BY department, job_title;

-- GROUP BY with expression
SELECT
    EXTRACT(YEAR FROM hire_date) AS hire_year,
    COUNT(*) AS hires
FROM employees
GROUP BY EXTRACT(YEAR FROM hire_date)
ORDER BY hire_year;

-- GROUP BY with CASE
SELECT
    CASE
        WHEN salary < 50000 THEN 'Low'
        WHEN salary < 100000 THEN 'Medium'
        ELSE 'High'
    END AS salary_band,
    COUNT(*) AS employee_count
FROM employees
GROUP BY
    CASE
        WHEN salary < 50000 THEN 'Low'
        WHEN salary < 100000 THEN 'Medium'
        ELSE 'High'
    END;`
        },
        {
          name: 'HAVING Clause',
          explanation: 'HAVING filters groups AFTER aggregation (WHERE filters rows BEFORE). Use HAVING with aggregate conditions. WHERE cannot use aggregates; HAVING can. HAVING executes after GROUP BY.',
          codeExample: `-- HAVING filters groups
SELECT department, COUNT(*) AS emp_count
FROM employees
GROUP BY department
HAVING COUNT(*) > 10;  -- Only departments with >10 employees

-- WHERE vs HAVING
SELECT department, AVG(salary) AS avg_salary
FROM employees
WHERE hire_date > '2020-01-01'  -- Filter rows first
GROUP BY department
HAVING AVG(salary) > 60000;     -- Then filter groups

-- Complex HAVING
SELECT
    department,
    COUNT(*) AS emp_count,
    AVG(salary) AS avg_salary,
    SUM(salary) AS total_salary
FROM employees
GROUP BY department
HAVING COUNT(*) >= 5
   AND AVG(salary) > 50000
   AND SUM(salary) < 1000000;

-- HAVING without GROUP BY (treats entire table as one group)
SELECT AVG(salary) AS company_avg
FROM employees
HAVING AVG(salary) > 50000;`
        },
        {
          name: 'ROLLUP & CUBE',
          explanation: 'ROLLUP creates subtotals for hierarchical grouping (e.g., region → country → city). CUBE creates subtotals for all combinations. Both produce NULL in grouping columns for subtotal rows.',
          codeExample: `-- ROLLUP: Hierarchical subtotals
SELECT
    region,
    country,
    city,
    SUM(sales) AS total_sales
FROM sales_data
GROUP BY ROLLUP(region, country, city);
-- Produces:
-- region, country, city totals (detail)
-- region, country totals (NULL city)
-- region totals (NULL country, city)
-- grand total (all NULL)

-- CUBE: All combination subtotals
SELECT
    department,
    job_title,
    SUM(salary) AS total_salary
FROM employees
GROUP BY CUBE(department, job_title);
-- Produces:
-- department + job_title (detail)
-- department only (NULL job_title)
-- job_title only (NULL department)
-- grand total (both NULL)

-- GROUPING function identifies subtotal rows
SELECT
    department,
    job_title,
    SUM(salary),
    GROUPING(department) AS is_dept_subtotal,
    GROUPING(job_title) AS is_title_subtotal
FROM employees
GROUP BY ROLLUP(department, job_title);`
        },
        {
          name: 'String Aggregates',
          explanation: 'Concatenate values from multiple rows into one. STRING_AGG (PostgreSQL/SQL Server), GROUP_CONCAT (MySQL), or LISTAGG (Oracle) combine strings. Useful for creating comma-separated lists.',
          codeExample: `-- STRING_AGG (PostgreSQL, SQL Server)
SELECT
    department,
    STRING_AGG(name, ', ' ORDER BY name) AS employees
FROM employees
GROUP BY department;
-- Result: "Engineering", "Alice, Bob, Charlie"

-- With DISTINCT
SELECT
    department,
    STRING_AGG(DISTINCT job_title, ', ') AS job_titles
FROM employees
GROUP BY department;

-- GROUP_CONCAT (MySQL)
SELECT
    department,
    GROUP_CONCAT(name ORDER BY name SEPARATOR ', ') AS employees
FROM employees
GROUP BY department;

-- ARRAY_AGG (PostgreSQL) - creates array
SELECT
    department,
    ARRAY_AGG(name ORDER BY name) AS employee_array
FROM employees
GROUP BY department;

-- JSON aggregation (PostgreSQL)
SELECT
    department,
    JSON_AGG(JSON_BUILD_OBJECT('name', name, 'salary', salary)) AS employees_json
FROM employees
GROUP BY department;`
        }
      ]
    },
    {
      id: 'window-functions',
      name: 'Window Functions',
      icon: '🪟',
      color: '#ec4899',
      description: 'ROW_NUMBER, RANK, LAG, LEAD, running totals and advanced analytics',
      details: [
        {
          name: 'ROW_NUMBER, RANK, DENSE_RANK',
          explanation: 'Ranking functions assign numbers to rows. ROW_NUMBER gives unique sequential numbers. RANK gives same rank to ties with gaps. DENSE_RANK gives same rank to ties without gaps. All use OVER clause with ORDER BY.',
          codeExample: `-- ROW_NUMBER: Unique sequential number
SELECT
    name,
    department,
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num
FROM employees;
-- Results: 1, 2, 3, 4, 5... (no ties)

-- ROW_NUMBER with PARTITION BY
SELECT
    name,
    department,
    salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank
FROM employees;
-- Ranks reset to 1 for each department

-- RANK: Same rank for ties, with gaps
SELECT
    name,
    salary,
    RANK() OVER (ORDER BY salary DESC) AS rank
FROM employees;
-- If two people tie for 2nd: 1, 2, 2, 4, 5 (skips 3)

-- DENSE_RANK: Same rank for ties, no gaps
SELECT
    name,
    salary,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;
-- If two people tie for 2nd: 1, 2, 2, 3, 4 (no skip)

-- Get top 3 per department
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn
    FROM employees
) sub WHERE rn <= 3;`
        },
        {
          name: 'LAG and LEAD',
          explanation: 'LAG accesses previous row values; LEAD accesses next row values. Useful for comparing current row to adjacent rows, calculating differences, or detecting changes. Optional parameters: offset (default 1) and default value.',
          codeExample: `-- LAG: Previous row value
SELECT
    date,
    revenue,
    LAG(revenue) OVER (ORDER BY date) AS prev_revenue,
    revenue - LAG(revenue) OVER (ORDER BY date) AS change
FROM daily_sales;

-- LEAD: Next row value
SELECT
    date,
    revenue,
    LEAD(revenue) OVER (ORDER BY date) AS next_revenue
FROM daily_sales;

-- With offset and default
SELECT
    date,
    revenue,
    LAG(revenue, 2, 0) OVER (ORDER BY date) AS two_days_ago,
    LEAD(revenue, 1, revenue) OVER (ORDER BY date) AS next_or_same
FROM daily_sales;

-- Detect changes
SELECT date, status,
    CASE WHEN status <> LAG(status) OVER (ORDER BY date)
         THEN 'Changed' ELSE 'Same' END AS status_change
FROM status_log;

-- Calculate growth rate
SELECT
    date,
    revenue,
    ROUND((revenue - LAG(revenue) OVER (ORDER BY date)) * 100.0 /
          NULLIF(LAG(revenue) OVER (ORDER BY date), 0), 2) AS growth_pct
FROM daily_sales;`
        },
        {
          name: 'Running Totals & Averages',
          explanation: 'Use SUM/AVG/COUNT with OVER clause for running calculations. Frame specification (ROWS/RANGE) defines which rows to include. Default frame with ORDER BY is RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.',
          codeExample: `-- Running total
SELECT
    date,
    amount,
    SUM(amount) OVER (ORDER BY date) AS running_total
FROM transactions;

-- Running average
SELECT
    date,
    amount,
    AVG(amount) OVER (ORDER BY date) AS running_avg
FROM transactions;

-- Running count
SELECT
    date,
    SUM(1) OVER (ORDER BY date) AS row_number
FROM transactions;

-- Partitioned running total
SELECT
    category,
    date,
    amount,
    SUM(amount) OVER (PARTITION BY category ORDER BY date) AS category_running_total
FROM transactions;

-- Percentage of total
SELECT
    category,
    amount,
    ROUND(amount * 100.0 / SUM(amount) OVER (), 2) AS pct_of_total,
    ROUND(amount * 100.0 / SUM(amount) OVER (PARTITION BY category), 2) AS pct_of_category
FROM transactions;`
        },
        {
          name: 'Window Frame',
          explanation: 'Frame clause defines which rows the window function uses. ROWS counts physical rows; RANGE counts logical values. UNBOUNDED PRECEDING/FOLLOWING means all previous/next. CURRENT ROW is the current row. N PRECEDING/FOLLOWING is N rows before/after.',
          codeExample: `-- Moving average (last 3 rows)
SELECT
    date,
    value,
    AVG(value) OVER (
        ORDER BY date
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) AS moving_avg_3
FROM metrics;

-- Moving average (3 rows centered)
SELECT
    date,
    value,
    AVG(value) OVER (
        ORDER BY date
        ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
    ) AS centered_avg
FROM metrics;

-- Sum of all following rows
SELECT
    date,
    amount,
    SUM(amount) OVER (
        ORDER BY date
        ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING
    ) AS remaining_total
FROM transactions;

-- RANGE vs ROWS (RANGE groups same values)
SELECT
    date,
    amount,
    SUM(amount) OVER (ORDER BY date ROWS UNBOUNDED PRECEDING) AS rows_total,
    SUM(amount) OVER (ORDER BY date RANGE UNBOUNDED PRECEDING) AS range_total
FROM transactions;
-- RANGE: if multiple rows have same date, they see same running total
-- ROWS: each row sees total up to and including itself`
        },
        {
          name: 'FIRST_VALUE & LAST_VALUE',
          explanation: 'FIRST_VALUE returns the first value in the window frame. LAST_VALUE returns the last value (but be careful: default frame ends at CURRENT ROW). NTH_VALUE returns the Nth value.',
          codeExample: `-- FIRST_VALUE: First in partition
SELECT
    department,
    name,
    salary,
    FIRST_VALUE(name) OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS highest_paid
FROM employees;

-- LAST_VALUE: Need to extend frame!
SELECT
    department,
    name,
    salary,
    LAST_VALUE(name) OVER (
        PARTITION BY department
        ORDER BY salary DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS lowest_paid
FROM employees;
-- Without frame clause, LAST_VALUE would return current row!

-- NTH_VALUE: Get specific position
SELECT
    department,
    name,
    salary,
    NTH_VALUE(name, 2) OVER (
        PARTITION BY department
        ORDER BY salary DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS second_highest
FROM employees;

-- Practical: Show range for each row
SELECT
    department,
    name,
    salary,
    FIRST_VALUE(salary) OVER w AS max_salary,
    LAST_VALUE(salary) OVER w AS min_salary
FROM employees
WINDOW w AS (
    PARTITION BY department
    ORDER BY salary DESC
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
);`
        }
      ]
    }
  ]

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedConceptIndex !== null) {
          setSelectedConceptIndex(null)
          setSelectedDetailIndex(0)
        } else {
          onBack()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

  const buildBreadcrumbStack = () => {
    const stack = [{ name: 'Databases', icon: '🗃️' }]
    if (selectedConcept) {
      stack.push({ name: 'SQL Fundamentals', icon: '📖' })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'SQL Fundamentals', icon: '📖' })
    }
    return stack
  }

  const handleBreadcrumbClick = (index) => {
    if (index === 0) onBack()
    else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)
      setSelectedDetailIndex(0)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #164e63 50%, #0f172a 100%)',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={onBack}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'rgba(6, 182, 212, 0.2)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: '0.5rem',
              color: '#22d3ee',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            ← Back to Databases
          </button>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            📖 SQL Fundamentals
          </h1>
        </div>

        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={DATABASE_COLORS}
        />

        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Master the essential building blocks of SQL: vocabulary, joins, subqueries, CTEs, and more
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
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
                e.currentTarget.style.borderColor = concept.color
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = `${concept.color}40`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>{concept.icon}</span>
                <h3 style={{ color: concept.color, margin: 0 }}>{concept.name}</h3>
              </div>
              <p style={{ color: '#94a3b8', margin: 0, lineHeight: '1.6' }}>{concept.description}</p>
              <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
                {concept.details.length} topics • Click to explore
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
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
                width: '95vw',
                maxWidth: '1200px',
                maxHeight: '90vh',
                overflow: 'auto',
                border: `1px solid ${selectedConcept.color}`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Breadcrumb
                breadcrumbStack={buildBreadcrumbStack()}
                onBreadcrumbClick={handleBreadcrumbClick}
                onMainMenu={breadcrumb?.onMainMenu || onBack}
                colors={DATABASE_COLORS}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ color: selectedConcept.color, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>{selectedConcept.icon}</span> {selectedConcept.name}
                </h2>
                <button
                  onClick={() => setSelectedConceptIndex(null)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '0.5rem',
                    color: '#f87171',
                    cursor: 'pointer'
                  }}
                >
                  ✕ Close
                </button>
              </div>

              {/* Diagram if exists */}
              {selectedConcept.diagram && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <selectedConcept.diagram />
                </div>
              )}

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
                      fontWeight: selectedDetailIndex === i ? '600' : '400'
                    }}
                  >
                    {detail.name}
                  </button>
                ))}
              </div>

              {(() => {
                const detail = selectedConcept.details[selectedDetailIndex]
                const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
                return (
                  <div>
                    <h3 style={{ color: '#e2e8f0', marginBottom: '1rem' }}>{detail.name}</h3>
                    <p style={{
                      color: '#e2e8f0',
                      lineHeight: '1.8',
                      marginBottom: '1.5rem',
                      background: colorScheme.bg,
                      border: `1px solid ${colorScheme.border}`,
                      borderRadius: '0.5rem',
                      padding: '1rem'
                    }}>
                      {detail.explanation}
                    </p>
                    {detail.codeExample && (
                      <SyntaxHighlighter
                        language="sql"
                        style={vscDarkPlus}
                        customStyle={{ borderRadius: '0.5rem', fontSize: '0.85rem' }}
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
    </div>
  )
}

export default SQLFundamentals

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function PostgreSQLQuestions({ onBack, breadcrumb, problemLimit }) {
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
      category: 'JSONB',
      question: 'Explain JSONB in PostgreSQL and how it differs from JSON',
      answer: `**JSON vs JSONB:**

- JSON: Stores exact copy of input text, must reparse on each query
- JSONB: Binary format, faster to query, supports indexing

**JSONB Advantages:**
- Indexed with GIN indexes
- Faster query operations
- Supports containment operators
- Doesn't preserve whitespace/key order

\`\`\`sql
-- Create table with JSONB
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    data JSONB
);

-- Insert JSONB data
INSERT INTO products (data) VALUES
('{"name": "Laptop", "specs": {"ram": 16, "storage": 512}}');

-- Access operators
SELECT
    data -> 'name' AS name_json,        -- Returns JSON: "Laptop"
    data ->> 'name' AS name_text,       -- Returns text: Laptop
    data #> '{specs, ram}' AS ram_json, -- Path access
    data #>> '{specs, ram}' AS ram_text -- Path as text
FROM products;
\`\`\`

**JSONB Operators:**
- \`->\` : Get JSON object field (returns JSON)
- \`->>\` : Get JSON object field as text
- \`#>\` : Get JSON object at path (returns JSON)
- \`#>>\` : Get JSON object at path as text
- \`@>\` : Contains (left contains right)
- \`?\` : Key exists
- \`?|\` : Any key exists
- \`?&\` : All keys exist

**Indexing JSONB:**
\`\`\`sql
-- GIN index for all JSONB operations
CREATE INDEX idx_products_data ON products USING GIN (data);

-- More efficient for containment only (@>)
CREATE INDEX idx_products_data_path ON products USING GIN (data jsonb_path_ops);

-- Expression index for specific key
CREATE INDEX idx_product_name ON products ((data ->> 'name'));
\`\`\`

**Common Queries:**
\`\`\`sql
-- Find by containment
SELECT * FROM products WHERE data @> '{"name": "Laptop"}';

-- Check key exists
SELECT * FROM products WHERE data ? 'specs';

-- Nested value filter
SELECT * FROM products WHERE (data -> 'specs' ->> 'ram')::int > 8;
\`\`\``
    },
    {
      id: 2,
      category: 'Performance',
      question: 'How do you analyze and optimize query performance in PostgreSQL?',
      answer: `**EXPLAIN ANALYZE:**

The primary tool for understanding query execution:

\`\`\`sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
\`\`\`

**Key Metrics to Watch:**
- Seq Scan vs Index Scan
- Actual time vs Estimated time
- Rows estimated vs actual
- Buffers hit vs read

**Common Scan Types:**
- Seq Scan: Full table scan (bad for large tables)
- Index Scan: Uses index, fetches rows from table
- Index Only Scan: Data from index only (best)
- Bitmap Scan: Combines multiple indexes

**Optimization Strategies:**

**1. Add Appropriate Indexes:**
\`\`\`sql
-- B-tree for equality/range (default)
CREATE INDEX idx_users_email ON users(email);

-- Composite index (order matters!)
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at DESC);

-- Partial index (smaller, faster)
CREATE INDEX idx_active_users ON users(email) WHERE status = 'active';

-- Covering index (avoid table lookup)
CREATE INDEX idx_orders_cover ON orders(user_id) INCLUDE (total, status);
\`\`\`

**2. Update Statistics:**
\`\`\`sql
ANALYZE users;  -- Update statistics for planner
VACUUM ANALYZE orders;  -- Clean up and update stats
\`\`\`

**3. Configuration Tuning:**
\`\`\`sql
-- Check current settings
SHOW shared_buffers;
SHOW work_mem;
SHOW effective_cache_size;

-- Recommended for 16GB RAM:
-- shared_buffers = 4GB
-- effective_cache_size = 12GB
-- work_mem = 256MB
-- random_page_cost = 1.1 (for SSD)
\`\`\`

**4. Query Rewriting:**
\`\`\`sql
-- Use EXISTS instead of IN for large subqueries
-- Bad:
SELECT * FROM users WHERE id IN (SELECT user_id FROM orders);
-- Good:
SELECT * FROM users u WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);
\`\`\`

**Monitoring Tools:**
\`\`\`sql
-- Enable pg_stat_statements
CREATE EXTENSION pg_stat_statements;

-- Find slow queries
SELECT query, calls, mean_exec_time, total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
\`\`\``
    },
    {
      id: 3,
      category: 'Extensions',
      question: 'What are some essential PostgreSQL extensions and their use cases?',
      answer: `**Popular PostgreSQL Extensions:**

**1. pg_stat_statements - Query Performance:**
\`\`\`sql
CREATE EXTENSION pg_stat_statements;

-- Find slowest queries
SELECT query, calls, total_exec_time, mean_exec_time
FROM pg_stat_statements
ORDER BY total_exec_time DESC;
\`\`\`

**2. pg_trgm - Fuzzy Text Search:**
\`\`\`sql
CREATE EXTENSION pg_trgm;

-- Similarity search
SELECT word, similarity(word, 'postgresql') AS sim
FROM words
WHERE similarity(word, 'postgresql') > 0.3
ORDER BY sim DESC;

-- GIN index for LIKE queries
CREATE INDEX idx_name_trgm ON users USING GIN (name gin_trgm_ops);

-- Now ILIKE uses index!
SELECT * FROM users WHERE name ILIKE '%john%';
\`\`\`

**3. PostGIS - Geospatial:**
\`\`\`sql
CREATE EXTENSION postgis;

-- Store locations
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    coordinates GEOGRAPHY(POINT, 4326)
);

-- Find within distance
SELECT name FROM locations
WHERE ST_DWithin(
    coordinates,
    ST_SetSRID(ST_MakePoint(-73.9, 40.7), 4326)::geography,
    5000  -- 5km
);
\`\`\`

**4. uuid-ossp / pgcrypto - UUIDs:**
\`\`\`sql
CREATE EXTENSION "uuid-ossp";
-- or
CREATE EXTENSION pgcrypto;

-- Generate UUID
SELECT uuid_generate_v4();  -- uuid-ossp
SELECT gen_random_uuid();   -- pgcrypto (preferred)
\`\`\`

**5. hstore - Key-Value Store:**
\`\`\`sql
CREATE EXTENSION hstore;

CREATE TABLE settings (
    user_id INT,
    prefs HSTORE
);

INSERT INTO settings VALUES (1, 'theme => dark, lang => en');
SELECT prefs -> 'theme' FROM settings;  -- dark
\`\`\`

**6. citext - Case-Insensitive Text:**
\`\`\`sql
CREATE EXTENSION citext;

CREATE TABLE users (
    email CITEXT PRIMARY KEY  -- 'Test@Email.com' = 'test@email.com'
);
\`\`\`

**List Extensions:**
\`\`\`sql
-- Available
SELECT * FROM pg_available_extensions;

-- Installed
SELECT * FROM pg_extension;
\`\`\``
    },
    {
      id: 4,
      category: 'Replication',
      question: 'Explain PostgreSQL replication strategies',
      answer: `**Streaming Replication (Physical):**

Most common for high availability:

- Entire database cluster is replicated
- Byte-for-byte copy via WAL (Write-Ahead Log)
- Supports synchronous and asynchronous modes

**Setup Overview:**

**Primary Server (postgresql.conf):**
\`\`\`
wal_level = replica
max_wal_senders = 10
wal_keep_size = 1GB
\`\`\`

**Create Replication User:**
\`\`\`sql
CREATE ROLE replicator WITH REPLICATION LOGIN PASSWORD 'secret';
\`\`\`

**On Replica - Base Backup:**
\`\`\`bash
pg_basebackup -h primary_host -U replicator -D /var/lib/postgresql/data -Fp -Xs -P -R
\`\`\`

**Check Replication Status:**
\`\`\`sql
-- On primary
SELECT client_addr, state, sent_lsn, replay_lsn
FROM pg_stat_replication;

-- On replica (check lag)
SELECT pg_last_wal_receive_lsn(), pg_last_wal_replay_lsn();
\`\`\`

**Logical Replication (PostgreSQL 10+):**

- Selective table replication
- Can replicate to different PostgreSQL versions
- Supports publish/subscribe model

\`\`\`sql
-- On publisher
CREATE PUBLICATION my_pub FOR TABLE users, orders;

-- On subscriber
CREATE SUBSCRIPTION my_sub
CONNECTION 'host=primary dbname=mydb user=replicator'
PUBLICATION my_pub;
\`\`\`

**Synchronous vs Asynchronous:**

| Synchronous | Asynchronous |
|-------------|--------------|
| No data loss | Possible data loss |
| Higher latency | Lower latency |
| Stronger consistency | Eventual consistency |

\`\`\`sql
-- Synchronous replication
synchronous_commit = on
synchronous_standby_names = 'replica1'
\`\`\`

**Failover:**
\`\`\`sql
-- Promote replica to primary
SELECT pg_promote();
\`\`\`

**Tools for HA:**
- Patroni (automatic failover)
- pgBouncer (connection pooling)
- HAProxy (load balancing)`
    },
    {
      id: 5,
      category: 'Partitioning',
      question: 'How does table partitioning work in PostgreSQL?',
      answer: `**Why Partition?**
- Improve query performance on large tables
- Easier maintenance (drop old partitions)
- Parallel query execution

**Partition Types:**

**1. Range Partitioning (most common):**
\`\`\`sql
CREATE TABLE logs (
    id SERIAL,
    message TEXT,
    created_at TIMESTAMPTZ NOT NULL
) PARTITION BY RANGE (created_at);

-- Create partitions
CREATE TABLE logs_2024_01 PARTITION OF logs
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
CREATE TABLE logs_2024_02 PARTITION OF logs
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');

-- Query automatically uses partition pruning
SELECT * FROM logs WHERE created_at >= '2024-01-15';
\`\`\`

**2. List Partitioning:**
\`\`\`sql
CREATE TABLE sales (
    id SERIAL,
    region TEXT NOT NULL,
    amount DECIMAL(10,2)
) PARTITION BY LIST (region);

CREATE TABLE sales_us PARTITION OF sales FOR VALUES IN ('US', 'CA');
CREATE TABLE sales_eu PARTITION OF sales FOR VALUES IN ('UK', 'DE', 'FR');
CREATE TABLE sales_asia PARTITION OF sales FOR VALUES IN ('JP', 'CN', 'KR');
\`\`\`

**3. Hash Partitioning:**
\`\`\`sql
CREATE TABLE events (
    id SERIAL,
    user_id INTEGER NOT NULL,
    data JSONB
) PARTITION BY HASH (user_id);

-- Create 4 hash partitions
CREATE TABLE events_0 PARTITION OF events FOR VALUES WITH (MODULUS 4, REMAINDER 0);
CREATE TABLE events_1 PARTITION OF events FOR VALUES WITH (MODULUS 4, REMAINDER 1);
CREATE TABLE events_2 PARTITION OF events FOR VALUES WITH (MODULUS 4, REMAINDER 2);
CREATE TABLE events_3 PARTITION OF events FOR VALUES WITH (MODULUS 4, REMAINDER 3);
\`\`\`

**Partition Management:**
\`\`\`sql
-- Add new partition
CREATE TABLE logs_2024_03 PARTITION OF logs
    FOR VALUES FROM ('2024-03-01') TO ('2024-04-01');

-- Drop old partition (very fast!)
DROP TABLE logs_2023_01;

-- Detach without dropping
ALTER TABLE logs DETACH PARTITION logs_2023_01;
\`\`\`

**Default Partition (catch-all):**
\`\`\`sql
CREATE TABLE logs_default PARTITION OF logs DEFAULT;
\`\`\`

**Best Practices:**
- Partition key should be in most queries
- Keep partition count reasonable (<1000)
- Use constraints for partition pruning
- Index each partition appropriately`
    },
    {
      id: 6,
      category: 'Advanced',
      question: 'Explain CTEs (Common Table Expressions) and Recursive CTEs',
      answer: `**Basic CTE:**

CTEs improve readability and allow query reuse:

\`\`\`sql
WITH active_users AS (
    SELECT id, name, email
    FROM users
    WHERE status = 'active'
)
SELECT * FROM active_users WHERE email LIKE '%@gmail.com';
\`\`\`

**Multiple CTEs:**
\`\`\`sql
WITH
active_users AS (
    SELECT id, name FROM users WHERE status = 'active'
),
user_orders AS (
    SELECT au.id, au.name, COUNT(o.id) as order_count
    FROM active_users au
    LEFT JOIN orders o ON au.id = o.user_id
    GROUP BY au.id, au.name
)
SELECT * FROM user_orders WHERE order_count > 5;
\`\`\`

**Recursive CTE:**

Essential for hierarchical data:

\`\`\`sql
-- Employee hierarchy (org chart)
WITH RECURSIVE org_chart AS (
    -- Base case: top-level employees
    SELECT id, name, manager_id, 1 AS level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive case: employees with managers
    SELECT e.id, e.name, e.manager_id, oc.level + 1
    FROM employees e
    JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT * FROM org_chart ORDER BY level, name;
\`\`\`

**Category Tree:**
\`\`\`sql
WITH RECURSIVE category_tree AS (
    SELECT id, name, parent_id, name AS path
    FROM categories
    WHERE parent_id IS NULL

    UNION ALL

    SELECT c.id, c.name, c.parent_id, ct.path || ' > ' || c.name
    FROM categories c
    JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT * FROM category_tree;
\`\`\`

**Generate Series:**
\`\`\`sql
WITH RECURSIVE numbers AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM numbers WHERE n < 100
)
SELECT * FROM numbers;
\`\`\`

**CTE with INSERT/UPDATE/DELETE (PostgreSQL):**
\`\`\`sql
WITH deleted AS (
    DELETE FROM orders
    WHERE status = 'cancelled' AND created_at < '2023-01-01'
    RETURNING *
)
INSERT INTO order_archive SELECT * FROM deleted;
\`\`\`

**CTE vs Subquery:**
- CTE: More readable, can be referenced multiple times
- Subquery: May optimize better in some cases
- PostgreSQL 12+: CTEs can be inlined for optimization`
    },
    {
      id: 7,
      category: 'Security',
      question: 'How do you implement Row-Level Security (RLS) in PostgreSQL?',
      answer: `**Row-Level Security Overview:**

RLS restricts which rows users can see/modify:

**Enable RLS:**
\`\`\`sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
\`\`\`

**Create Policy:**
\`\`\`sql
-- Users can only see their own orders
CREATE POLICY user_orders ON orders
    FOR ALL
    TO app_users
    USING (user_id = current_setting('app.current_user_id')::int);
\`\`\`

**Policy Types:**
\`\`\`sql
-- SELECT only
CREATE POLICY select_policy ON orders FOR SELECT
    USING (user_id = current_user_id());

-- INSERT only
CREATE POLICY insert_policy ON orders FOR INSERT
    WITH CHECK (user_id = current_user_id());

-- UPDATE - both read and write checks
CREATE POLICY update_policy ON orders FOR UPDATE
    USING (user_id = current_user_id())
    WITH CHECK (user_id = current_user_id());

-- DELETE
CREATE POLICY delete_policy ON orders FOR DELETE
    USING (user_id = current_user_id() AND status = 'draft');
\`\`\`

**Multi-Tenant Example:**
\`\`\`sql
-- Set tenant context
CREATE OR REPLACE FUNCTION set_tenant(tenant_id INT)
RETURNS VOID AS $$
BEGIN
    PERFORM set_config('app.tenant_id', tenant_id::text, false);
END;
$$ LANGUAGE plpgsql;

-- RLS policy
CREATE POLICY tenant_isolation ON all_data
    USING (tenant_id = current_setting('app.tenant_id')::int);

-- In application
SELECT set_tenant(123);
SELECT * FROM all_data;  -- Only tenant 123's data
\`\`\`

**Role-Based Policies:**
\`\`\`sql
-- Admins see everything
CREATE POLICY admin_all ON orders
    FOR ALL
    TO admins
    USING (true);

-- Regular users see own data
CREATE POLICY user_own ON orders
    FOR ALL
    TO regular_users
    USING (user_id = current_user_id());
\`\`\`

**Force RLS for Table Owner:**
\`\`\`sql
ALTER TABLE orders FORCE ROW LEVEL SECURITY;
\`\`\`

**Check Policies:**
\`\`\`sql
SELECT * FROM pg_policies WHERE tablename = 'orders';
\`\`\`

**Best Practices:**
- Always test RLS policies thoroughly
- Consider performance impact
- Use EXPLAIN to verify policy application
- Bypass RLS only when necessary (BYPASSRLS role)`
    },
    {
      id: 8,
      category: 'Data Types',
      question: 'What are some unique PostgreSQL data types and when to use them?',
      answer: `**Array Types:**
\`\`\`sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    tags TEXT[]
);

INSERT INTO posts (tags) VALUES (ARRAY['sql', 'postgres', 'database']);

-- Query arrays
SELECT * FROM posts WHERE 'sql' = ANY(tags);
SELECT * FROM posts WHERE tags @> ARRAY['sql', 'postgres'];

-- Array functions
SELECT array_length(tags, 1), unnest(tags) FROM posts;
\`\`\`

**Range Types:**
\`\`\`sql
CREATE TABLE reservations (
    room_id INT,
    reserved_during TSTZRANGE
);

INSERT INTO reservations VALUES
(1, '[2024-01-15 14:00, 2024-01-15 16:00)');

-- Range operators
SELECT * FROM reservations
WHERE reserved_during && '[2024-01-15 15:00, 2024-01-15 17:00)';  -- Overlaps

-- Exclude constraint (prevent double booking)
CREATE TABLE room_bookings (
    room_id INT,
    during TSTZRANGE,
    EXCLUDE USING GIST (room_id WITH =, during WITH &&)
);
\`\`\`

**Network Types:**
\`\`\`sql
CREATE TABLE servers (
    ip INET,
    network CIDR,
    mac MACADDR
);

INSERT INTO servers (ip, network) VALUES ('192.168.1.100', '192.168.1.0/24');

-- Network queries
SELECT * FROM servers WHERE ip << '192.168.0.0/16';  -- Contained in
SELECT * FROM servers WHERE network >>= '192.168.1.50';  -- Contains
\`\`\`

**UUID:**
\`\`\`sql
CREATE EXTENSION pgcrypto;

CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT
);
\`\`\`

**Composite Types:**
\`\`\`sql
CREATE TYPE address AS (
    street TEXT,
    city TEXT,
    zip TEXT
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name TEXT,
    home_address address
);

INSERT INTO customers (name, home_address)
VALUES ('John', ROW('123 Main St', 'NYC', '10001'));

SELECT (home_address).city FROM customers;
\`\`\`

**Enum Types:**
\`\`\`sql
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered');

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status order_status DEFAULT 'pending'
);

-- Add new value
ALTER TYPE order_status ADD VALUE 'cancelled' AFTER 'delivered';
\`\`\`

**Domain Types:**
\`\`\`sql
CREATE DOMAIN email AS TEXT
CHECK (VALUE ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$');

CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    email email NOT NULL
);
\`\`\``
    },
    {
      id: 9,
      category: 'Transactions',
      question: 'Explain PostgreSQL transaction isolation levels and MVCC',
      answer: `**MVCC (Multi-Version Concurrency Control):**

PostgreSQL uses MVCC for high concurrency:
- Readers never block writers
- Writers never block readers
- Each transaction sees a consistent snapshot

**How MVCC Works:**
- Each row has hidden columns: xmin (created), xmax (deleted)
- Rows aren't physically deleted immediately
- VACUUM cleans up old row versions

**Isolation Levels:**

**1. Read Uncommitted:**
\`\`\`sql
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
-- PostgreSQL treats this as READ COMMITTED
\`\`\`

**2. Read Committed (Default):**
\`\`\`sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
-- Each query sees only committed data
-- Different queries in same transaction may see different data
\`\`\`

**3. Repeatable Read:**
\`\`\`sql
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
-- Transaction sees snapshot from start
-- No phantom reads
-- May get serialization failure
\`\`\`

**4. Serializable:**
\`\`\`sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- Transactions appear to execute serially
-- Highest isolation, may need retries
\`\`\`

**Comparison:**

| Issue | Read Committed | Repeatable Read | Serializable |
|-------|----------------|-----------------|--------------|
| Dirty Read | No | No | No |
| Non-Repeatable Read | Yes | No | No |
| Phantom Read | Yes | No | No |
| Serialization Anomaly | Yes | Yes | No |

**Handling Serialization Failures:**
\`\`\`sql
-- Application must retry on error 40001
BEGIN ISOLATION LEVEL SERIALIZABLE;
-- ... operations ...
COMMIT;
-- On ERROR 40001: ROLLBACK and retry
\`\`\`

**Savepoints:**
\`\`\`sql
BEGIN;
INSERT INTO orders (...) VALUES (...);
SAVEPOINT before_items;
INSERT INTO order_items (...) VALUES (...);  -- Might fail
-- If failed:
ROLLBACK TO SAVEPOINT before_items;
-- Continue with other operations
COMMIT;
\`\`\`

**Lock Monitoring:**
\`\`\`sql
SELECT blocked.pid, blocked.query, blocking.pid, blocking.query
FROM pg_stat_activity blocked
JOIN pg_stat_activity blocking
  ON blocking.pid = ANY(pg_blocking_pids(blocked.pid));
\`\`\``
    },
    {
      id: 10,
      category: 'Performance',
      question: 'What are materialized views and when should you use them?',
      answer: `**Materialized View:**

Stores query results physically (unlike regular views):

\`\`\`sql
CREATE MATERIALIZED VIEW monthly_sales AS
SELECT
    DATE_TRUNC('month', order_date) AS month,
    SUM(total) AS revenue,
    COUNT(*) AS order_count
FROM orders
GROUP BY DATE_TRUNC('month', order_date)
WITH DATA;  -- Populate immediately
\`\`\`

**When to Use:**
- Expensive aggregations
- Reports and dashboards
- Acceptable staleness (not real-time)
- Read-heavy workloads

**Refresh Options:**
\`\`\`sql
-- Full refresh (locks table)
REFRESH MATERIALIZED VIEW monthly_sales;

-- Concurrent refresh (needs unique index, no lock)
CREATE UNIQUE INDEX idx_monthly_sales ON monthly_sales(month);
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales;
\`\`\`

**Index on Materialized View:**
\`\`\`sql
CREATE INDEX idx_mv_month ON monthly_sales(month);
CREATE INDEX idx_mv_revenue ON monthly_sales(revenue);
\`\`\`

**Auto-Refresh Strategies:**

**1. Using pg_cron:**
\`\`\`sql
SELECT cron.schedule('refresh-sales', '0 * * * *',
    'REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales');
\`\`\`

**2. Using triggers (careful with performance):**
\`\`\`sql
CREATE OR REPLACE FUNCTION refresh_mv()
RETURNS TRIGGER AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;
\`\`\`

**Check Last Refresh:**
\`\`\`sql
SELECT relname, last_refresh
FROM pg_stat_user_tables
WHERE relname = 'monthly_sales';
\`\`\`

**Materialized View vs Regular View:**

| Materialized View | Regular View |
|-------------------|--------------|
| Stores data physically | Virtual (query stored) |
| Needs manual refresh | Always current |
| Fast queries | Query executed each time |
| Uses disk space | No storage |
| Can be indexed | Cannot be indexed |

**Best Practices:**
- Use CONCURRENTLY for production
- Index based on query patterns
- Monitor refresh times
- Consider incremental refresh patterns`
    }
  ]

  // Filter questions based on problemLimit (for Top 100/300 mode)
  const displayQuestions = problemLimit ? questions.slice(0, problemLimit) : questions

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'JSONB': '#f59e0b',
      'Performance': '#10b981',
      'Extensions': '#8b5cf6',
      'Replication': '#3b82f6',
      'Partitioning': '#ec4899',
      'Advanced': '#06b6d4',
      'Security': '#ef4444',
      'Data Types': '#6366f1',
      'Transactions': '#f97316'
    }
    return colors[category] || '#6b7280'
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <button
          onClick={onBack}
          style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          ← Back to Questions
        </button>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#93c5fd', margin: 0 }}>
          PostgreSQL Interview Questions
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

      <p style={{ fontSize: '1.1rem', color: '#d1d5db', textAlign: 'left', marginBottom: '2rem', lineHeight: '1.6' }}>
        Essential PostgreSQL interview questions covering JSONB, extensions, replication, partitioning, and performance tuning.
      </p>

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
                  <CompletionCheckbox problemId={`PostgreSQLQuestions-${q.id}`} />
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

      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'rgba(51, 103, 145, 0.15)', borderRadius: '12px', border: '2px solid #336791' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#93c5fd', marginBottom: '0.5rem' }}>
          PostgreSQL Interview Tips
        </h3>
        <ul style={{ color: '#d1d5db', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Know JSONB operators and indexing strategies</li>
          <li>Understand EXPLAIN ANALYZE output and optimization techniques</li>
          <li>Be familiar with PostgreSQL-specific features (extensions, RLS, partitioning)</li>
          <li>Understand MVCC and transaction isolation levels</li>
          <li>Know when to use materialized views vs regular views</li>
        </ul>
      </div>
    </div>
  )
}

export default PostgreSQLQuestions

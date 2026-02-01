import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

const DATABASE_COLORS = {
  primary: '#336791',
  primaryHover: '#5a8bb8',
  bg: 'rgba(51, 103, 145, 0.1)',
  border: 'rgba(51, 103, 145, 0.3)',
  arrow: '#336791',
  hoverBg: 'rgba(51, 103, 145, 0.2)',
  topicBg: 'rgba(51, 103, 145, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(51, 103, 145, 0.15)', border: 'rgba(51, 103, 145, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

function PostgreSQL({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'core-features',
      name: 'Core Features',
      icon: '🐘',
      color: '#336791',
      description: 'PostgreSQL fundamentals including data types, constraints, and core functionality',
      details: [
        {
          name: 'Data Types',
          explanation: 'PostgreSQL offers rich data types: INTEGER, BIGINT, SERIAL for numbers; VARCHAR, TEXT for strings; BOOLEAN; DATE, TIME, TIMESTAMP with timezone support; UUID for unique identifiers; ARRAY types; JSONB for semi-structured data; and custom ENUM types.',
          codeExample: `-- Numeric types
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    price DECIMAL(10, 2),
    quantity INTEGER,
    weight REAL
);

-- Text and UUID
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    bio TEXT,
    status user_status DEFAULT 'active'  -- ENUM type
);

-- Date/Time with timezone
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    event_name VARCHAR(100),
    start_time TIMESTAMPTZ NOT NULL,
    duration INTERVAL
);

-- Arrays
CREATE TABLE tags_example (
    id SERIAL PRIMARY KEY,
    tags TEXT[] DEFAULT '{}'
);

INSERT INTO tags_example (tags) VALUES (ARRAY['sql', 'postgres', 'database']);
SELECT * FROM tags_example WHERE 'sql' = ANY(tags);`
        },
        {
          name: 'Constraints',
          explanation: 'PostgreSQL supports PRIMARY KEY, FOREIGN KEY with CASCADE options, UNIQUE, NOT NULL, CHECK constraints, and EXCLUDE constraints for preventing overlaps. Constraints can be deferred for complex transactions.',
          codeExample: `-- Table with multiple constraints
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total DECIMAL(10, 2) CHECK (total >= 0),
    status VARCHAR(20) CHECK (status IN ('pending', 'shipped', 'delivered')),
    UNIQUE (user_id, order_date)  -- One order per user per day
);

-- Exclusion constraint (requires btree_gist extension)
CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE TABLE room_reservations (
    room_id INTEGER,
    reserved_during TSTZRANGE,
    EXCLUDE USING GIST (room_id WITH =, reserved_during WITH &&)
);

-- Deferrable foreign key
CREATE TABLE parent (id SERIAL PRIMARY KEY);
CREATE TABLE child (
    id SERIAL PRIMARY KEY,
    parent_id INTEGER REFERENCES parent(id)
        DEFERRABLE INITIALLY DEFERRED
);`
        },
        {
          name: 'Sequences & Identity',
          explanation: 'SERIAL creates auto-incrementing columns using sequences. IDENTITY (SQL standard) is preferred in modern PostgreSQL. Sequences can be manipulated directly for custom ID generation strategies.',
          codeExample: `-- SERIAL (legacy approach)
CREATE TABLE legacy_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

-- IDENTITY (modern, SQL standard)
CREATE TABLE modern_table (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100)
);

-- Custom sequence
CREATE SEQUENCE order_number_seq START 1000 INCREMENT 1;

CREATE TABLE orders_custom (
    order_number INTEGER DEFAULT nextval('order_number_seq'),
    description TEXT
);

-- Reset sequence
ALTER SEQUENCE order_number_seq RESTART WITH 5000;

-- Get current value without incrementing
SELECT currval('order_number_seq');`
        },
        {
          name: 'Table Inheritance',
          explanation: 'PostgreSQL supports table inheritance where child tables inherit columns from parent tables. Useful for partitioning strategies and modeling hierarchies, though modern partitioning syntax is preferred.',
          codeExample: `-- Parent table
CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(50),
    model VARCHAR(50),
    year INTEGER
);

-- Child tables inherit columns
CREATE TABLE cars (
    num_doors INTEGER,
    trunk_capacity INTEGER
) INHERITS (vehicles);

CREATE TABLE motorcycles (
    engine_cc INTEGER,
    has_sidecar BOOLEAN DEFAULT false
) INHERITS (vehicles);

-- Query all vehicles (includes cars and motorcycles)
SELECT * FROM vehicles;

-- Query only direct vehicles (excludes children)
SELECT * FROM ONLY vehicles;

-- Insert into child table
INSERT INTO cars (brand, model, year, num_doors, trunk_capacity)
VALUES ('Toyota', 'Camry', 2023, 4, 450);`
        }
      ]
    },
    {
      id: 'jsonb',
      name: 'JSONB & JSON',
      icon: '{}',
      color: '#f59e0b',
      description: 'Working with JSON data: storage, querying, indexing, and manipulation',
      details: [
        {
          name: 'JSONB Basics',
          explanation: 'JSONB stores JSON in binary format for efficient querying. Use -> for JSON output, ->> for text output, #> for path access. JSONB supports indexing and is preferred over JSON for most use cases.',
          codeExample: `CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    attributes JSONB
);

INSERT INTO products (name, attributes) VALUES
('Laptop', '{"brand": "Dell", "specs": {"ram": 16, "storage": 512}, "tags": ["electronics", "computer"]}'),
('Phone', '{"brand": "Apple", "specs": {"ram": 8, "storage": 256}, "tags": ["electronics", "mobile"]}');

-- Access operators
SELECT
    name,
    attributes -> 'brand' AS brand_json,           -- Returns JSON: "Dell"
    attributes ->> 'brand' AS brand_text,          -- Returns text: Dell
    attributes #> '{specs, ram}' AS ram_json,      -- Path access: 16
    attributes #>> '{specs, ram}' AS ram_text      -- Path as text: 16
FROM products;

-- Check if key exists
SELECT * FROM products WHERE attributes ? 'brand';

-- Check if any key exists
SELECT * FROM products WHERE attributes ?| ARRAY['brand', 'color'];

-- Check if all keys exist
SELECT * FROM products WHERE attributes ?& ARRAY['brand', 'specs'];`
        },
        {
          name: 'JSONB Querying',
          explanation: 'Use containment operators (@>, <@) for efficient queries on JSONB. The @> operator checks if left contains right. Combine with GIN indexes for high performance on large datasets.',
          codeExample: `-- Containment: find products with specific attributes
SELECT * FROM products
WHERE attributes @> '{"brand": "Dell"}';

-- Nested containment
SELECT * FROM products
WHERE attributes @> '{"specs": {"ram": 16}}';

-- Array containment in JSONB
SELECT * FROM products
WHERE attributes -> 'tags' ? 'electronics';

-- Combine with regular SQL
SELECT name, attributes ->> 'brand' AS brand
FROM products
WHERE (attributes -> 'specs' ->> 'ram')::int > 8
ORDER BY attributes -> 'specs' ->> 'storage' DESC;

-- JSONB array operations
SELECT * FROM products
WHERE attributes -> 'tags' @> '["computer"]'::jsonb;

-- Exists in array (any element)
SELECT * FROM products
WHERE jsonb_array_length(attributes -> 'tags') > 1;`
        },
        {
          name: 'JSONB Modification',
          explanation: 'PostgreSQL provides functions to modify JSONB: jsonb_set for updating values, || for merging, - for removing keys. These operations create new JSONB values (immutable).',
          codeExample: `-- Update a value
UPDATE products
SET attributes = jsonb_set(attributes, '{brand}', '"Lenovo"')
WHERE name = 'Laptop';

-- Set nested value
UPDATE products
SET attributes = jsonb_set(attributes, '{specs, ram}', '32')
WHERE name = 'Laptop';

-- Add new key
UPDATE products
SET attributes = attributes || '{"color": "silver"}'
WHERE name = 'Laptop';

-- Remove a key
UPDATE products
SET attributes = attributes - 'color'
WHERE name = 'Laptop';

-- Remove nested key
UPDATE products
SET attributes = attributes #- '{specs, storage}'
WHERE name = 'Laptop';

-- Append to array
UPDATE products
SET attributes = jsonb_set(
    attributes,
    '{tags}',
    (attributes -> 'tags') || '["sale"]'::jsonb
)
WHERE name = 'Laptop';`
        },
        {
          name: 'JSONB Indexing',
          explanation: 'GIN indexes dramatically speed up JSONB queries. Use jsonb_ops for general queries, jsonb_path_ops for containment-only queries (smaller index). Expression indexes target specific paths.',
          codeExample: `-- GIN index for all JSONB operations
CREATE INDEX idx_products_attributes ON products
USING GIN (attributes);

-- More compact index for containment only (@>)
CREATE INDEX idx_products_attrs_path ON products
USING GIN (attributes jsonb_path_ops);

-- Expression index for specific key
CREATE INDEX idx_products_brand ON products
((attributes ->> 'brand'));

-- Expression index for nested value
CREATE INDEX idx_products_ram ON products
(((attributes -> 'specs' ->> 'ram')::int));

-- Use EXPLAIN to verify index usage
EXPLAIN ANALYZE
SELECT * FROM products
WHERE attributes @> '{"brand": "Dell"}';

-- Partial index for common queries
CREATE INDEX idx_electronics ON products
USING GIN (attributes)
WHERE attributes -> 'tags' ? 'electronics';`
        }
      ]
    },
    {
      id: 'extensions',
      name: 'Extensions',
      icon: '🔌',
      color: '#8b5cf6',
      description: 'Popular PostgreSQL extensions: PostGIS, pg_trgm, uuid-ossp, and more',
      details: [
        {
          name: 'Common Extensions',
          explanation: 'PostgreSQL extensions add functionality: uuid-ossp/pgcrypto for UUIDs, pg_trgm for fuzzy text search, hstore for key-value storage, citext for case-insensitive text, tablefunc for crosstab queries.',
          codeExample: `-- List available extensions
SELECT * FROM pg_available_extensions;

-- List installed extensions
SELECT * FROM pg_extension;

-- UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
SELECT uuid_generate_v4();

-- Or use pgcrypto (often preferred)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
SELECT gen_random_uuid();

-- Case-insensitive text
CREATE EXTENSION IF NOT EXISTS "citext";
CREATE TABLE users (
    email CITEXT PRIMARY KEY,  -- 'Test@Email.com' = 'test@email.com'
    name VARCHAR(100)
);

-- Key-value store
CREATE EXTENSION IF NOT EXISTS "hstore";
CREATE TABLE settings (
    user_id INTEGER,
    prefs HSTORE
);
INSERT INTO settings VALUES (1, 'theme => dark, lang => en');
SELECT prefs -> 'theme' FROM settings;`
        },
        {
          name: 'pg_trgm (Trigram)',
          explanation: 'pg_trgm enables fuzzy string matching and similarity searches. Great for typo-tolerant search, autocomplete, and finding similar text. Supports GIN and GiST indexes for performance.',
          codeExample: `CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Similarity score (0-1)
SELECT similarity('postgresql', 'postgre');  -- 0.6

-- Similar strings
SELECT word, similarity(word, 'postgresql') AS sim
FROM words
WHERE similarity(word, 'postgresql') > 0.3
ORDER BY sim DESC;

-- LIKE/ILIKE with index support
CREATE INDEX idx_name_trgm ON users
USING GIN (name gin_trgm_ops);

-- Now LIKE queries use the index
SELECT * FROM users WHERE name ILIKE '%john%';

-- Distance operator (lower = more similar)
SELECT * FROM users
WHERE name % 'jon'  -- Finds 'John', 'Jon', 'Jonathan'
ORDER BY name <-> 'jon'
LIMIT 10;

-- Set similarity threshold
SET pg_trgm.similarity_threshold = 0.3;
SELECT * FROM users WHERE name % 'search_term';`
        },
        {
          name: 'PostGIS',
          explanation: 'PostGIS adds geographic object support: points, lines, polygons, and spatial queries. Essential for mapping, location-based services, and GIS applications.',
          codeExample: `CREATE EXTENSION IF NOT EXISTS postgis;

-- Create table with geometry
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    coordinates GEOGRAPHY(POINT, 4326)  -- WGS84
);

-- Insert points (longitude, latitude)
INSERT INTO locations (name, coordinates) VALUES
('Eiffel Tower', ST_SetSRID(ST_MakePoint(2.2945, 48.8584), 4326)),
('Big Ben', ST_SetSRID(ST_MakePoint(-0.1246, 51.5007), 4326));

-- Find locations within 500km of a point
SELECT name,
       ST_Distance(coordinates, ST_SetSRID(ST_MakePoint(0, 51), 4326)) / 1000 AS km
FROM locations
WHERE ST_DWithin(
    coordinates,
    ST_SetSRID(ST_MakePoint(0, 51), 4326)::geography,
    500000  -- 500km in meters
);

-- Spatial index
CREATE INDEX idx_locations_geo ON locations
USING GIST (coordinates);`
        },
        {
          name: 'Full-Text Search',
          explanation: 'Built-in full-text search with tsvector and tsquery. Supports stemming, ranking, highlighting, and multiple languages. Combine with GIN indexes for high-performance search.',
          codeExample: `-- Create searchable column
ALTER TABLE articles ADD COLUMN search_vector tsvector;

-- Populate search vector
UPDATE articles SET search_vector =
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(body, '')), 'B');

-- Create GIN index
CREATE INDEX idx_articles_search ON articles USING GIN(search_vector);

-- Search with ranking
SELECT title,
       ts_rank(search_vector, query) AS rank
FROM articles,
     to_tsquery('english', 'postgres & database') AS query
WHERE search_vector @@ query
ORDER BY rank DESC;

-- Phrase search
SELECT * FROM articles
WHERE search_vector @@ phraseto_tsquery('english', 'full text search');

-- Highlight matches
SELECT ts_headline('english', body, to_tsquery('postgres'),
    'StartSel=<b>, StopSel=</b>, MaxWords=50')
FROM articles
WHERE search_vector @@ to_tsquery('postgres');`
        }
      ]
    },
    {
      id: 'performance',
      name: 'Performance & Tuning',
      icon: '⚡',
      color: '#10b981',
      description: 'Query optimization, EXPLAIN ANALYZE, indexing strategies, and configuration tuning',
      details: [
        {
          name: 'EXPLAIN ANALYZE',
          explanation: 'EXPLAIN shows query plan, ANALYZE executes and shows actual times. Look for sequential scans on large tables, high row estimates vs actuals, and nested loop joins with many iterations.',
          codeExample: `-- Basic explain
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';

-- With execution stats
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';

-- Verbose output with buffers
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id;

-- JSON format for programmatic analysis
EXPLAIN (ANALYZE, FORMAT JSON)
SELECT * FROM products WHERE price > 100;

-- Key things to look for:
-- - Seq Scan on large tables (might need index)
-- - Nested Loop with high row counts
-- - Hash Join memory usage
-- - Sort operations (might need index)
-- - Rows estimated vs actual (stats might be stale)`
        },
        {
          name: 'Index Types',
          explanation: 'B-tree (default) for equality/range, Hash for equality only, GIN for arrays/JSONB/full-text, GiST for geometric/range types, BRIN for large sequential tables.',
          codeExample: `-- B-tree (default) - equality, range, sorting
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_date ON orders(created_at DESC);

-- Composite index (column order matters!)
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);

-- Partial index (only index matching rows)
CREATE INDEX idx_active_users ON users(email)
WHERE status = 'active';

-- Covering index (include columns to avoid table lookup)
CREATE INDEX idx_orders_covering ON orders(user_id)
INCLUDE (total, status);

-- Hash index (equality only, smaller than B-tree)
CREATE INDEX idx_users_hash ON users USING HASH(user_id);

-- GIN for arrays
CREATE INDEX idx_tags ON posts USING GIN(tags);

-- BRIN for large tables with correlated data
CREATE INDEX idx_logs_time ON logs USING BRIN(created_at);`
        },
        {
          name: 'Query Optimization',
          explanation: 'Optimize queries by using appropriate indexes, avoiding SELECT *, using EXISTS instead of IN for subqueries, and leveraging CTEs wisely. Monitor with pg_stat_statements.',
          codeExample: `-- Enable query statistics
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Find slowest queries
SELECT query, calls, mean_exec_time, total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Use EXISTS instead of IN for large subqueries
-- Slow:
SELECT * FROM users WHERE id IN (SELECT user_id FROM orders);
-- Fast:
SELECT * FROM users u WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.user_id = u.id
);

-- Avoid functions on indexed columns
-- Slow (can't use index):
SELECT * FROM users WHERE LOWER(email) = 'test@example.com';
-- Fast (uses expression index):
CREATE INDEX idx_email_lower ON users(LOWER(email));
SELECT * FROM users WHERE LOWER(email) = 'test@example.com';

-- Batch operations
INSERT INTO logs (message, created_at)
SELECT 'Batch ' || i, NOW()
FROM generate_series(1, 10000) AS i;`
        },
        {
          name: 'Configuration Tuning',
          explanation: 'Key postgresql.conf settings: shared_buffers (25% of RAM), effective_cache_size (75% of RAM), work_mem for sorting, maintenance_work_mem for VACUUM/CREATE INDEX.',
          codeExample: `-- Check current settings
SHOW shared_buffers;
SHOW work_mem;
SHOW effective_cache_size;

-- Recommended settings for 16GB RAM server:
-- shared_buffers = 4GB           # 25% of RAM
-- effective_cache_size = 12GB    # 75% of RAM
-- work_mem = 256MB               # For complex sorts
-- maintenance_work_mem = 1GB     # For VACUUM, CREATE INDEX
-- random_page_cost = 1.1         # For SSDs (default 4.0 for HDD)
-- effective_io_concurrency = 200 # For SSDs

-- Set temporarily for session
SET work_mem = '512MB';

-- View pg_stat_user_tables for table stats
SELECT relname, seq_scan, idx_scan,
       n_live_tup, n_dead_tup
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;

-- Analyze tables to update statistics
ANALYZE users;
VACUUM ANALYZE orders;`
        }
      ]
    },
    {
      id: 'advanced',
      name: 'Advanced Features',
      icon: '🚀',
      color: '#ec4899',
      description: 'Partitioning, materialized views, triggers, and procedural languages',
      details: [
        {
          name: 'Table Partitioning',
          explanation: 'Partition large tables by range, list, or hash for better performance and maintenance. PostgreSQL 10+ has declarative partitioning. Useful for time-series data and multi-tenant systems.',
          codeExample: `-- Range partitioning by date
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

-- List partitioning by region
CREATE TABLE sales (
    id SERIAL,
    region TEXT NOT NULL,
    amount DECIMAL(10,2)
) PARTITION BY LIST (region);

CREATE TABLE sales_us PARTITION OF sales FOR VALUES IN ('US');
CREATE TABLE sales_eu PARTITION OF sales FOR VALUES IN ('EU', 'UK');

-- Hash partitioning for even distribution
CREATE TABLE events (
    id SERIAL,
    user_id INTEGER NOT NULL,
    data JSONB
) PARTITION BY HASH (user_id);

CREATE TABLE events_0 PARTITION OF events FOR VALUES WITH (MODULUS 4, REMAINDER 0);
CREATE TABLE events_1 PARTITION OF events FOR VALUES WITH (MODULUS 4, REMAINDER 1);`
        },
        {
          name: 'Materialized Views',
          explanation: 'Materialized views store query results physically for fast access. Ideal for expensive aggregations. Refresh manually or on schedule. Use CONCURRENTLY for non-blocking refresh.',
          codeExample: `-- Create materialized view
CREATE MATERIALIZED VIEW monthly_sales AS
SELECT
    DATE_TRUNC('month', order_date) AS month,
    SUM(total) AS revenue,
    COUNT(*) AS order_count
FROM orders
GROUP BY DATE_TRUNC('month', order_date)
WITH DATA;  -- Populate immediately

-- Create index on materialized view
CREATE INDEX idx_monthly_sales ON monthly_sales(month);

-- Refresh (blocks reads during refresh)
REFRESH MATERIALIZED VIEW monthly_sales;

-- Refresh concurrently (requires unique index)
CREATE UNIQUE INDEX idx_monthly_sales_unique ON monthly_sales(month);
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales;

-- Check if refresh is needed
SELECT relname, last_refresh
FROM pg_stat_user_tables
WHERE relname = 'monthly_sales';

-- Query like a regular table
SELECT * FROM monthly_sales WHERE month >= '2024-01-01';`
        },
        {
          name: 'Triggers',
          explanation: 'Triggers execute functions automatically on INSERT, UPDATE, DELETE. Use for audit logging, data validation, maintaining derived data, and enforcing complex business rules.',
          codeExample: `-- Create audit log table
CREATE TABLE audit_log (
    id SERIAL PRIMARY KEY,
    table_name TEXT,
    operation TEXT,
    old_data JSONB,
    new_data JSONB,
    changed_at TIMESTAMPTZ DEFAULT NOW(),
    changed_by TEXT DEFAULT current_user
);

-- Create trigger function
CREATE OR REPLACE FUNCTION audit_trigger_func()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_log (table_name, operation, old_data, new_data)
    VALUES (
        TG_TABLE_NAME,
        TG_OP,
        CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN row_to_json(OLD)::jsonb END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW)::jsonb END
    );
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to table
CREATE TRIGGER audit_users
    AFTER INSERT OR UPDATE OR DELETE ON users
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();`
        },
        {
          name: 'PL/pgSQL',
          explanation: 'PostgreSQL procedural language for functions, stored procedures, and complex logic. Supports variables, control flow, exception handling, and dynamic SQL.',
          codeExample: `-- Function with parameters and return
CREATE OR REPLACE FUNCTION get_user_stats(p_user_id INTEGER)
RETURNS TABLE(total_orders INT, total_spent DECIMAL, avg_order DECIMAL)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(*)::INT,
        COALESCE(SUM(total), 0),
        COALESCE(AVG(total), 0)
    FROM orders
    WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- Call the function
SELECT * FROM get_user_stats(123);

-- Procedure (no return value, can use transactions)
CREATE OR REPLACE PROCEDURE transfer_funds(
    from_account INT,
    to_account INT,
    amount DECIMAL
)
AS $$
BEGIN
    UPDATE accounts SET balance = balance - amount WHERE id = from_account;
    UPDATE accounts SET balance = balance + amount WHERE id = to_account;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Account not found';
    END IF;

    COMMIT;
END;
$$ LANGUAGE plpgsql;

-- Call procedure
CALL transfer_funds(1, 2, 100.00);`
        }
      ]
    },
    {
      id: 'admin',
      name: 'Administration',
      icon: '🔧',
      color: '#6366f1',
      description: 'Backup, restore, replication, security, and database administration',
      details: [
        {
          name: 'Backup & Restore',
          explanation: 'pg_dump for logical backups, pg_basebackup for physical backups. Logical backups are portable and selective; physical backups support point-in-time recovery (PITR).',
          codeExample: `-- Logical backup (single database)
pg_dump -h localhost -U postgres mydb > backup.sql
pg_dump -Fc mydb > backup.dump  # Custom format (compressed)

-- Backup specific tables
pg_dump -t users -t orders mydb > tables.sql

-- Backup all databases
pg_dumpall > all_databases.sql

-- Restore from SQL
psql mydb < backup.sql

-- Restore from custom format
pg_restore -d mydb backup.dump

-- Physical backup for PITR
pg_basebackup -D /backup/base -Fp -Xs -P

-- Point-in-time recovery setup (postgresql.conf)
-- archive_mode = on
-- archive_command = 'cp %p /archive/%f'
-- wal_level = replica

-- Restore to specific time
-- recovery_target_time = '2024-01-15 14:30:00'
-- restore_command = 'cp /archive/%f %p'`
        },
        {
          name: 'Streaming Replication',
          explanation: 'Hot standby replicas for read scaling and high availability. Asynchronous or synchronous modes. Replicas can be promoted to primary on failure.',
          codeExample: `-- Primary server (postgresql.conf)
-- wal_level = replica
-- max_wal_senders = 10
-- wal_keep_size = 1GB

-- Create replication user
CREATE ROLE replicator WITH REPLICATION LOGIN PASSWORD 'secret';

-- pg_hba.conf on primary
-- host replication replicator replica_ip/32 scram-sha-256

-- On replica server: base backup
pg_basebackup -h primary_host -U replicator -D /var/lib/postgresql/data -Fp -Xs -P -R

-- The -R flag creates standby.signal and configures recovery

-- Check replication status on primary
SELECT client_addr, state, sent_lsn, write_lsn, flush_lsn, replay_lsn
FROM pg_stat_replication;

-- Check lag on replica
SELECT pg_last_wal_receive_lsn(),
       pg_last_wal_replay_lsn(),
       pg_last_xact_replay_timestamp();

-- Promote replica to primary
SELECT pg_promote();`
        },
        {
          name: 'Security & Roles',
          explanation: 'Role-based access control with GRANT/REVOKE. Row-level security (RLS) for fine-grained access. SSL/TLS for encrypted connections. pg_hba.conf controls authentication.',
          codeExample: `-- Create roles
CREATE ROLE readonly;
CREATE ROLE readwrite;
CREATE ROLE admin WITH SUPERUSER;

-- Grant privileges
GRANT CONNECT ON DATABASE mydb TO readonly;
GRANT USAGE ON SCHEMA public TO readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;

-- Make future tables accessible
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT SELECT ON TABLES TO readonly;

-- Create user with role
CREATE USER analyst WITH PASSWORD 'secure123';
GRANT readonly TO analyst;

-- Row-Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_orders ON orders
    FOR ALL
    TO readwrite
    USING (user_id = current_setting('app.current_user_id')::int);

-- Set user context in application
SET app.current_user_id = '123';
SELECT * FROM orders;  -- Only sees user 123's orders

-- Revoke public access
REVOKE ALL ON DATABASE mydb FROM PUBLIC;`
        },
        {
          name: 'Monitoring',
          explanation: 'Use pg_stat views for monitoring. pg_stat_statements tracks query performance. Check for locks, bloat, and replication lag. Tools: pgAdmin, pg_stat_monitor, Prometheus exporters.',
          codeExample: `-- Active queries
SELECT pid, query, state, wait_event_type, wait_event,
       NOW() - query_start AS duration
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY duration DESC;

-- Table statistics
SELECT schemaname, relname,
       seq_scan, seq_tup_read,
       idx_scan, idx_tup_fetch,
       n_tup_ins, n_tup_upd, n_tup_del,
       n_dead_tup, last_vacuum, last_autovacuum
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;

-- Index usage
SELECT indexrelname, idx_scan, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- Check for blocking queries
SELECT blocked.pid AS blocked_pid,
       blocked.query AS blocked_query,
       blocking.pid AS blocking_pid,
       blocking.query AS blocking_query
FROM pg_stat_activity blocked
JOIN pg_stat_activity blocking ON blocking.pid = ANY(pg_blocking_pids(blocked.pid))
WHERE blocked.pid != blocking.pid;

-- Database size
SELECT pg_database.datname,
       pg_size_pretty(pg_database_size(pg_database.datname)) AS size
FROM pg_database
ORDER BY pg_database_size(pg_database.datname) DESC;`
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
      stack.push({ name: 'PostgreSQL', icon: '🐘' })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'PostgreSQL', icon: '🐘' })
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
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={onBack}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'rgba(51, 103, 145, 0.2)',
              border: '1px solid rgba(51, 103, 145, 0.3)',
              borderRadius: '0.5rem',
              color: '#60a5fa',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            ← Back to Databases
          </button>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #60a5fa, #336791)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🐘 PostgreSQL
          </h1>
        </div>

        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={DATABASE_COLORS}
        />

        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '2rem', fontSize: '1.1rem' }}>
          The world's most advanced open-source relational database
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

export default PostgreSQL

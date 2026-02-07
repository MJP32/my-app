import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import { useTheme } from '../../contexts/ThemeContext'

const DATABASE_COLORS = {
  primary: '#60a5fa',
  primaryHover: '#93c5fd',
  bg: 'rgba(59, 130, 246, 0.1)',
  border: 'rgba(59, 130, 246, 0.3)',
  arrow: '#3b82f6',
  hoverBg: 'rgba(59, 130, 246, 0.2)',
  topicBg: 'rgba(59, 130, 246, 0.2)'
}

function Databases({ onBack, onSelectItem, breadcrumb }) {
  const { colors, isDark } = useTheme()
  const databaseItems = [
    {
      id: 'SQL',
      name: 'SQL Databases',
      icon: '🗄️',
      color: '#3b82f6',
      description: 'Relational databases, SQL queries, normalization, indexing, transactions, and ACID principles.'
    },
    {
      id: 'NoSQL',
      name: 'NoSQL Databases',
      icon: '📊',
      color: '#0ea5e9',
      description: 'Document stores, key-value stores, column-family stores, graph databases, and CAP theorem.'
    },
    {
      id: 'Oracle',
      name: 'Oracle Database',
      icon: '🔴',
      color: '#dc2626',
      description: 'Oracle database administration, PL/SQL, performance tuning, and enterprise database features.'
    },
    {
      id: 'ORM',
      name: 'ORM & Data Access',
      icon: '🔗',
      color: '#2563eb',
      description: 'Object-Relational Mapping, Hibernate, JPA, Spring Data, and data access patterns.'
    },
    {
      id: 'Redis',
      name: 'Redis',
      icon: '⚡',
      color: '#ef4444',
      description: 'In-memory data structure store, caching, pub/sub messaging, distributed locks, and session management.'
    },
    {
      id: 'StoredProcedures',
      name: 'Stored Procedures',
      icon: '📜',
      color: '#8b5cf6',
      description: 'Database stored procedures, functions, triggers, cursors, and procedural SQL programming for encapsulating business logic.'
    },
    {
      id: 'DatabaseOptimization',
      name: 'Database Optimization',
      icon: '🚀',
      color: '#10b981',
      description: 'Query optimization, indexing strategies, execution plans, performance tuning, and database profiling techniques.'
    },
    {
      id: 'PLSQL',
      name: 'PL/SQL',
      icon: '📜',
      color: '#f97316',
      description: 'Oracle procedural language extension for SQL with variables, control structures, cursors, and exception handling.'
    },
    {
      id: 'PostgreSQL',
      name: 'PostgreSQL',
      icon: '🐘',
      color: '#336791',
      description: 'Advanced open-source relational database with extensions, JSONB, full-text search, and powerful features.'
    },
    {
      id: 'SQLFundamentals',
      name: 'SQL Fundamentals',
      icon: '📖',
      color: '#06b6d4',
      description: 'Core SQL concepts: SELECT, JOIN types, subqueries, CTEs, aggregate functions, and essential SQL vocabulary.'
    }
  ]

  const { focusedIndex, itemRefs } = useKeyboardNavigation({
    items: databaseItems,
    onSelect: (item) => onSelectItem(item.id),
    onBack,
    enabled: true,
    gridColumns: 2,
    loop: true
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark
        ? 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)'
        : 'linear-gradient(to bottom right, #f8fafc, #dbeafe, #f8fafc)',
      color: colors.textPrimary,
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <Breadcrumb
          breadcrumbStack={[
            { name: 'Databases', icon: '🗃️' }
          ]}
          colors={DATABASE_COLORS}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
        />

        {/* Collapsible Sidebar for quick topic navigation */}
        <CollapsibleSidebar
          items={databaseItems}
          selectedIndex={-1}
          onSelect={(index) => onSelectItem(databaseItems[index].id)}
          title="Databases"
          getItemLabel={(item) => item.name}
          getItemIcon={(item) => item.icon}
          primaryColor={DATABASE_COLORS.primary}
        />

        <p style={{
          fontSize: '1.2rem',
          color: isDark ? '#d1d5db' : '#4b5563',
          textAlign: 'center',
          marginBottom: '3rem',
          lineHeight: '1.8'
        }}>
          Explore database technologies from SQL to NoSQL, understanding data storage, retrieval, and management strategies.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem'
        }}>
          {databaseItems.map((item, index) => (
            <button
              key={item.id}
              ref={(el) => itemRefs.current[index] = el}
              onClick={() => onSelectItem(item.id)}
              tabIndex={focusedIndex === index ? 0 : -1}
              role="link"
              aria-label={`${item.name}. ${item.description}`}
              style={{
                background: isDark
                  ? 'linear-gradient(to bottom right, #1f2937, #111827)'
                  : 'linear-gradient(to bottom right, #ffffff, #f9fafb)',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                border: `2px solid ${item.color}`,
                cursor: 'pointer',
                transition: 'all 0.3s',
                transform: focusedIndex === index ? 'translateY(-0.5rem)' : 'translateY(0)',
                boxShadow: focusedIndex === index
                  ? `0 25px 50px -12px ${item.color}50`
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                textAlign: 'left',
                width: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-0.5rem)'
                e.currentTarget.style.boxShadow = `0 25px 50px -12px ${item.color}50`
              }}
              onMouseLeave={(e) => {
                if (focusedIndex !== index) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <span style={{ fontSize: '2.5rem' }}>{item.icon}</span>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: isDark ? '#93c5fd' : '#2563eb',
                  marginBottom: '0.25rem'
                }}>
                  {item.name}
                </h3>
              </div>

              <p style={{
                fontSize: '0.9rem',
                color: isDark ? '#d1d5db' : '#4b5563',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                {item.description}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '0.5rem',
                fontSize: '0.9rem',
                color: item.color,
                fontWeight: '600',
                paddingTop: '0.75rem',
                borderTop: isDark ? '1px solid #374151' : '1px solid #e5e7eb'
              }}>
                <span>Explore Topic</span>
                <span>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Databases

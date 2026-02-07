import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import { useTheme } from '../../contexts/ThemeContext'

function Messaging({ onBack, onSelectItem, breadcrumb }) {
  const { isDark } = useTheme()
  const messagingItems = [
    {
      id: 'Kafka',
      name: 'Apache Kafka',
      icon: '📨',
      color: '#f59e0b',
      description: 'Distributed event streaming platform for high-throughput, fault-tolerant message processing.'
    },
    {
      id: 'Apache Flink',
      name: 'Apache Flink',
      icon: '🌊',
      color: '#f97316',
      description: 'Stream processing framework for real-time data analytics and event-driven applications.'
    },
    {
      id: 'Solace',
      name: 'Solace PubSub+',
      icon: '💬',
      color: '#ea580c',
      description: 'Enterprise event broker for messaging, streaming, and event mesh architectures.'
    },
    {
      id: 'RabbitMQ',
      name: 'RabbitMQ',
      icon: '🐰',
      color: '#dc2626',
      description: 'Message broker supporting multiple messaging protocols and queue-based communication.'
    }
  ]

  const { focusedIndex, itemRefs } = useKeyboardNavigation({
    items: messagingItems,
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
        ? 'linear-gradient(to bottom right, #111827, #78350f, #111827)'
        : 'linear-gradient(to bottom right, #f8fafc, #fef3c7, #f8fafc)',
      color: isDark ? '#ffffff' : '#1f2937',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

        {/* Collapsible Sidebar for quick topic navigation */}
        <CollapsibleSidebar
          items={messagingItems}
          selectedIndex={-1}
          onSelect={(index) => onSelectItem(messagingItems[index].id)}
          title="Messaging"
          getItemLabel={(item) => item.name}
          getItemIcon={(item) => item.icon}
          primaryColor="#f59e0b"
        />

        <p style={{
          fontSize: '1.2rem',
          color: isDark ? '#d1d5db' : '#4b5563',
          textAlign: 'center',
          marginBottom: '3rem',
          lineHeight: '1.8'
        }}>
          Explore messaging and streaming technologies for building event-driven, real-time distributed systems.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem'
        }}>
          {messagingItems.map((item, index) => (
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
                  color: isDark ? '#fcd34d' : '#b45309',
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

export default Messaging

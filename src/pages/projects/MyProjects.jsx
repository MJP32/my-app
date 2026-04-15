import { useState, useEffect } from 'react'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

const PROJECT_COLORS = {
  primary: '#5eead4',
  primaryHover: '#99f6e4',
  bg: 'rgba(13, 148, 136, 0.1)',
  border: 'rgba(13, 148, 136, 0.3)',
  arrow: '#0d9488',
  hoverBg: 'rgba(13, 148, 136, 0.2)',
  topicBg: 'rgba(13, 148, 136, 0.2)'
}

const categories = {
  all: { label: 'All', ids: null },
  financial: { label: 'Financial & Trading', ids: ['Var/CVar', 'Dark Pool Matching Engine', 'Financial Banking', 'Credit Card Portal', 'Virtual Numbers'] },
  enterprise: { label: 'Enterprise & Healthcare', ids: ['Medi/Health', 'Monolith to Microservice'] },
  mobile: { label: 'Mobile & IoT', ids: ['Mobile Weather App', 'Apartment Alarm System'] }
}

function MyProjects({ onBack, onSelectItem, breadcrumb, initialCategory, onInitialCategoryUsed }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'all')

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory)
      onInitialCategoryUsed?.()
    }
  }, [initialCategory])

  const projectItems = [
    // Financial & Trading
    {
      id: 'Var/CVar',
      name: 'VaR/CVaR Risk Management',
      icon: '\u{1F4C8}',
      color: '#10b981',
      description: 'Complete Value at Risk and Conditional Value at Risk system. Covers basic calculations, Monte Carlo simulations, stress testing, real-time analytics, and portfolio optimization.'
    },
    {
      id: 'Dark Pool Matching Engine',
      name: 'Dark Pool Matching Engine',
      icon: '\u{1F311}',
      color: '#6366f1',
      description: 'High-performance order matching engine for dark pool trading. From fundamentals to advanced features including order book management, matching algorithms, and latency optimization.'
    },
    {
      id: 'Financial Banking',
      name: 'Financial Banking',
      icon: '\u{1F3E6}',
      color: '#f59e0b',
      description: 'Core banking system with transaction processing and account management.'
    },
    {
      id: 'Credit Card Portal',
      name: 'Credit Card Portal',
      icon: '\u{1F4B3}',
      color: '#ec4899',
      description: 'Full-stack credit card management system. Includes transaction tracking, rewards, fraud detection, CQRS, Event Sourcing, Saga patterns, and scaling for 10M+ users.'
    },
    {
      id: 'Virtual Numbers',
      name: 'Virtual Numbers',
      icon: '\u{1F522}',
      color: '#14b8a6',
      description: 'Deep dive into credit card number structure, network identifiers, Luhn Algorithm validation, and payment card industry standards.'
    },
    // Enterprise & Healthcare
    {
      id: 'Medi/Health',
      name: 'Medi/Health',
      icon: '\u{1F3E5}',
      color: '#ef4444',
      description: 'Healthcare management system with patient records and appointment scheduling.'
    },
    {
      id: 'Monolith to Microservice',
      name: 'Monolith to Microservice',
      icon: '\u{1F504}',
      color: '#8b5cf6',
      description: 'Migration journey from monolithic architecture to microservices-based system.'
    },
    // Mobile & IoT
    {
      id: 'Mobile Weather App',
      name: 'Mobile Weather App',
      icon: '\u{1F324}\uFE0F',
      color: '#0ea5e9',
      description: 'Mobile weather application with real-time weather data, forecasts, location services, and weather alerts. Integrates with weather APIs and displays interactive weather maps.'
    },
    {
      id: 'Apartment Alarm System',
      name: 'Apartment Alarm System',
      icon: '\u{1F6A8}',
      color: '#dc2626',
      description: 'IoT-based security alarm system for apartment buildings. Real-time monitoring, sensor integration, mobile alerts, access control, and emergency response coordination.'
    }
  ]

  const filteredItems = activeCategory === 'all'
    ? projectItems
    : projectItems.filter(item => categories[activeCategory].ids.includes(item.id))

  const { focusedIndex, itemRefs } = useKeyboardNavigation({
    items: filteredItems,
    onSelect: (item) => onSelectItem(item.id),
    onBack,
    enabled: true,
    gridColumns: 3,
    loop: true
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #134e4a, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto'
      }}>
        {/* Breadcrumb */}
        <Breadcrumb
          breadcrumbStack={[{ name: 'My Projects', icon: '\u{1F4BC}' }]}
          colors={PROJECT_COLORS}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
        />

        {/* Collapsible Sidebar for quick project navigation */}
        <CollapsibleSidebar
          items={filteredItems}
          selectedIndex={-1}
          onSelect={(index) => onSelectItem(filteredItems[index].id)}
          title="Projects"
          getItemLabel={(item) => item.name}
          getItemIcon={(item) => item.icon}
          primaryColor={PROJECT_COLORS.primary}
        />

        <p style={{
          fontSize: '1.2rem',
          color: '#d1d5db',
          textAlign: 'center',
          marginBottom: '2rem',
          lineHeight: '1.8'
        }}>
          Real-world projects spanning financial systems, healthcare, and enterprise applications showcasing practical implementations.
        </p>

        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          borderBottom: '2px solid #374151',
          overflowX: 'auto'
        }}>
          {Object.entries(categories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              style={{
                padding: '1rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: activeCategory === key ? '#0d9488' : 'transparent',
                color: activeCategory === key ? 'white' : '#9ca3af',
                border: 'none',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== key) {
                  e.target.style.backgroundColor = '#374151'
                  e.target.style.color = '#d1d5db'
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== key) {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = '#9ca3af'
                }
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Flat Project Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredItems.map((item, index) => (
            <button
              key={item.id}
              ref={(el) => itemRefs.current[index] = el}
              onClick={() => onSelectItem(item.id)}
              tabIndex={focusedIndex === index ? 0 : -1}
              role="link"
              aria-label={`${item.name}. ${item.description}`}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
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
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#5eead4',
                    marginBottom: '0.25rem'
                  }}>
                    {item.name}
                  </h3>
                </div>
              </div>

              <p style={{
                fontSize: '0.9rem',
                color: '#d1d5db',
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
                borderTop: '1px solid #374151'
              }}>
                <span>Explore Project</span>
                <span>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyProjects

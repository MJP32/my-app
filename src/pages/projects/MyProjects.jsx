import { useState } from 'react'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function MyProjects({ onBack, onSelectItem }) {
  const [selectedConcept, setSelectedConcept] = useState('')

  // Organized into logical groups
  const projectGroups = [
    {
      title: 'Financial & Trading Systems',
      icon: '💰',
      color: '#10b981',
      projects: [
        {
          id: 'Var/CVar',
          name: 'VaR/CVaR Risk Management',
          icon: '📈',
          color: '#10b981',
          description: 'Complete Value at Risk and Conditional Value at Risk system. Covers basic calculations, Monte Carlo simulations, stress testing, real-time analytics, and portfolio optimization.'
        },
        {
          id: 'Dark Pool Matching Engine',
          name: 'Dark Pool Matching Engine',
          icon: '🌑',
          color: '#6366f1',
          description: 'High-performance order matching engine for dark pool trading. From fundamentals to advanced features including order book management, matching algorithms, and latency optimization.'
        },
        {
          id: 'Financial Banking',
          name: 'Financial Banking',
          icon: '🏦',
          color: '#f59e0b',
          description: 'Core banking system with transaction processing and account management.'
        },
        {
          id: 'Credit Card Portal',
          name: 'Credit Card Portal',
          icon: '💳',
          color: '#ec4899',
          description: 'Full-stack credit card management system. Includes transaction tracking, rewards, fraud detection, CQRS, Event Sourcing, Saga patterns, and scaling for 10M+ users.'
        },
        {
          id: 'Virtual Numbers',
          name: 'Virtual Numbers',
          icon: '🔢',
          color: '#14b8a6',
          description: 'Deep dive into credit card number structure, network identifiers, Luhn Algorithm validation, and payment card industry standards.'
        }
      ]
    },
    {
      title: 'Enterprise & Healthcare',
      icon: '🏢',
      color: '#8b5cf6',
      projects: [
        {
          id: 'Medi/Health',
          name: 'Medi/Health',
          icon: '🏥',
          color: '#ef4444',
          description: 'Healthcare management system with patient records and appointment scheduling.'
        },
        {
          id: 'Monolith to Microservice',
          name: 'Monolith to Microservice',
          icon: '🔄',
          color: '#8b5cf6',
          description: 'Migration journey from monolithic architecture to microservices-based system.'
        }
      ]
    },
    {
      title: 'Mobile & IoT',
      icon: '📱',
      color: '#0ea5e9',
      projects: [
        {
          id: 'Mobile Weather App',
          name: 'Mobile Weather App',
          icon: '🌤️',
          color: '#0ea5e9',
          description: 'Mobile weather application with real-time weather data, forecasts, location services, and weather alerts. Integrates with weather APIs and displays interactive weather maps.'
        },
        {
          id: 'Apartment Alarm System',
          name: 'Apartment Alarm System',
          icon: '🚨',
          color: '#dc2626',
          description: 'IoT-based security alarm system for apartment buildings. Real-time monitoring, sensor integration, mobile alerts, access control, and emergency response coordination.'
        }
      ]
    }
  ]

  // Flatten for navigation
  const projectItems = projectGroups.flatMap(group => group.projects)

  const { focusedIndex, itemRefs } = useKeyboardNavigation({
    items: projectItems,
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
        {/* Dark themed Breadcrumb */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'rgba(13, 148, 136, 0.1)',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          border: '1px solid rgba(13, 148, 136, 0.3)'
        }}>
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              color: '#2dd4bf',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.2)'
              e.currentTarget.style.color = '#5eead4'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#2dd4bf'
            }}
          >
            <span>💼</span> My Projects
          </button>
          <span style={{ color: '#0d9488', fontSize: '0.9rem' }}>→</span>
          <span style={{
            color: '#e2e8f0',
            fontSize: '0.9rem',
            fontWeight: '600',
            padding: '0.25rem 0.75rem',
            backgroundColor: 'rgba(13, 148, 136, 0.2)',
            borderRadius: '4px'
          }}>
            Project Gallery
          </span>
        </div>

        <p style={{
          fontSize: '1.2rem',
          color: '#d1d5db',
          textAlign: 'center',
          marginBottom: '3rem',
          lineHeight: '1.8'
        }}>
          Real-world projects spanning financial systems, healthcare, and enterprise applications showcasing practical implementations.
        </p>

      {projectGroups.map((group, groupIndex) => {
        const groupStartIndex = projectGroups
          .slice(0, groupIndex)
          .reduce((sum, g) => sum + g.projects.length, 0)

        return (
          <div key={group.title} style={{ marginBottom: '2.5rem' }}>
            {/* Group Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
              padding: '1rem 1.5rem',
              background: 'linear-gradient(to right, rgba(31, 41, 55, 0.9), rgba(17, 24, 39, 0.9))',
              borderRadius: '0.75rem',
              borderLeft: `4px solid ${group.color}`,
              boxShadow: `0 4px 15px -3px ${group.color}30`
            }}>
              <span style={{ fontSize: '2rem' }}>{group.icon}</span>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: group.color,
                margin: 0
              }}>
                {group.title}
              </h2>
              <span style={{
                fontSize: '0.875rem',
                color: '#9ca3af',
                marginLeft: 'auto'
              }}>
                {group.projects.length} {group.projects.length === 1 ? 'project' : 'projects'}
              </span>
            </div>

            {/* Dropdown or Project Cards */}
            {group.isDropdown ? (
              <div style={{ marginBottom: '1rem' }}>
                <select
                  value={selectedConcept}
                  onChange={(e) => {
                    setSelectedConcept(e.target.value)
                    if (e.target.value) {
                      onSelectItem(e.target.value)
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#e5e7eb',
                    backgroundColor: '#1f2937',
                    border: `2px solid ${group.color}`,
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    outline: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = group.color
                    e.target.style.boxShadow = `0 0 0 3px ${group.color}40, 0 4px 6px rgba(0,0,0,0.1)`
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = group.color
                    e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <option value="">Select a concept to learn...</option>
                  {group.projects.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.icon} {item.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                {group.projects.map((item, projIndex) => {
                  const index = groupStartIndex + projIndex
                  return (
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
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default MyProjects

import { useState } from 'react'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'

function Questions({ onBack, onSelectItem }) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null)

  // Organized into logical groups
  const categoryGroups = [
    {
      title: 'Backend Frameworks',
      icon: '🏗️',
      color: '#10b981',
      categories: [
        {
          id: 'Spring Framework',
          name: 'Spring Framework',
          icon: '🌱',
          color: '#10b981',
          count: 5,
          items: ['Spring Core Questions', 'Spring Boot Questions', 'Spring Security Questions', 'Spring Data JPA Questions', 'Spring Annotations Questions']
        },
        {
          id: 'Hibernate',
          name: 'Hibernate',
          icon: '🔧',
          color: '#8b5cf6',
          count: 1,
          items: ['Hibernate Questions']
        }
      ]
    },
    {
      title: 'Programming Languages',
      icon: '💻',
      color: '#f59e0b',
      categories: [
        {
          id: 'Java',
          name: 'Java',
          icon: '☕',
          color: '#f59e0b',
          count: 6,
          items: ['Core Java Questions', 'Java 8 Questions', 'Java 11 Questions', 'Java 15 Questions', 'Java 21 Questions', 'Java 24 Questions']
        },
        {
          id: 'SQL',
          name: 'SQL',
          icon: '🗃️',
          color: '#3b82f6',
          count: 1,
          items: ['SQL Questions']
        }
      ]
    },
    {
      title: 'Messaging & Streaming',
      icon: '📨',
      color: '#ef4444',
      categories: [
        {
          id: 'Kafka',
          name: 'Kafka & Streaming',
          icon: '📨',
          color: '#ef4444',
          count: 2,
          items: ['Kafka Questions', 'Apache Flink Questions']
        },
        {
          id: 'Messaging',
          name: 'Messaging',
          icon: '📡',
          color: '#ec4899',
          count: 2,
          items: ['RabbitMQ Questions', 'Solace Questions']
        }
      ]
    },
    {
      title: 'APIs & Services',
      icon: '🌐',
      color: '#6366f1',
      categories: [
        {
          id: 'REST API',
          name: 'REST API',
          icon: '🌐',
          color: '#6366f1',
          count: 1,
          items: ['REST API Questions']
        }
      ]
    },
    {
      title: 'DevOps & Monitoring',
      icon: '🚀',
      color: '#14b8a6',
      categories: [
        {
          id: 'CI/CD',
          name: 'CI/CD',
          icon: '🚀',
          color: '#f59e0b',
          count: 2,
          items: ['Jenkins Questions', 'TeamCity Questions']
        },
        {
          id: 'Monitoring',
          name: 'Monitoring',
          icon: '📊',
          color: '#14b8a6',
          count: 4,
          items: ['Prometheus Questions', 'Grafana Questions', 'Zipkin Questions', 'Actuator Questions']
        }
      ]
    }
  ]

  // Flatten for navigation
  const subcategories = categoryGroups.flatMap(group => group.categories)

  // Hook for subcategories view
  const { focusedIndex: focusedSubcategoryIndex, itemRefs: subcategoryRefs } = useKeyboardNavigation({
    items: subcategories,
    onSelect: (subcategory) => setSelectedSubcategory(subcategory),
    onBack,
    enabled: !selectedSubcategory,
    gridColumns: 2,
    loop: true
  })

  // Hook for items view within a subcategory
  const currentItems = selectedSubcategory ? selectedSubcategory.items.map(item => ({ id: item, name: item })) : []
  const { focusedIndex: focusedItemIndex, itemRefs: itemRefs } = useKeyboardNavigation({
    items: currentItems,
    onSelect: (item) => onSelectItem(item.id),
    onBack: () => setSelectedSubcategory(null),
    enabled: !!selectedSubcategory,
    gridColumns: 2,
    loop: true
  })

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#faf5ff', minHeight: '100vh' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <button
          onClick={selectedSubcategory ? () => setSelectedSubcategory(null) : onBack}
          style={{
            padding: '0.6rem 1.25rem',
            fontSize: '0.95rem',
            fontWeight: '600',
            backgroundColor: selectedSubcategory ? '#8b5cf6' : '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = selectedSubcategory ? '#7c3aed' : '#4b5563'}
          onMouseLeave={(e) => e.target.style.backgroundColor = selectedSubcategory ? '#8b5cf6' : '#6b7280'}
        >
          {selectedSubcategory ? '← Back to Categories' : '← Back to Menu'}
        </button>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: 0
        }}>
          {selectedSubcategory ? `${selectedSubcategory.icon} ${selectedSubcategory.name}` : '❓ Questions'}
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      {!selectedSubcategory ? (
        <>
          <p style={{
            fontSize: '1rem',
            color: '#4b5563',
            textAlign: 'center',
            marginBottom: '1.5rem',
            lineHeight: '1.6'
          }}>
            Test your knowledge with interview questions and practice problems. Choose a category below to start
            preparing for technical interviews and assessments.
          </p>

          {categoryGroups.map((group, groupIndex) => {
            const groupStartIndex = categoryGroups
              .slice(0, groupIndex)
              .reduce((sum, g) => sum + g.categories.length, 0)

            return (
              <div key={group.title} style={{ marginBottom: '2rem' }}>
                {/* Group Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  borderLeft: `5px solid ${group.color}`,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>{group.icon}</span>
                  <h2 style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    margin: 0
                  }}>
                    {group.title}
                  </h2>
                </div>

                {/* Category Cards */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1rem'
                }}>
                  {group.categories.map((subcategory, catIndex) => {
                    const index = groupStartIndex + catIndex
                    return (
                      <button
                        key={subcategory.id}
                        ref={(el) => subcategoryRefs.current[index] = el}
                        onClick={() => setSelectedSubcategory(subcategory)}
                        tabIndex={focusedSubcategoryIndex === index ? 0 : -1}
                        role="link"
                        aria-label={`${subcategory.name} category. ${subcategory.count} interview questions.`}
                        style={{
                          backgroundColor: subcategory.color + '10',
                          padding: '1.25rem',
                          borderRadius: '10px',
                          border: `2px solid ${subcategory.color}40`,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          transform: focusedSubcategoryIndex === index ? 'translateY(-4px)' : 'translateY(0)',
                          boxShadow: focusedSubcategoryIndex === index
                            ? `0 0 0 3px ${subcategory.color}40, 0 8px 16px rgba(0,0,0,0.12)`
                            : 'none',
                          textAlign: 'left',
                          width: '100%'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-4px)'
                          e.currentTarget.style.boxShadow = `0 0 0 3px ${subcategory.color}40, 0 8px 16px rgba(0,0,0,0.12)`
                        }}
                        onMouseLeave={(e) => {
                          if (focusedSubcategoryIndex !== index) {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = 'none'
                          }
                        }}
                      >
                        <div style={{
                          fontSize: '2.5rem',
                          marginBottom: '0.75rem',
                          textAlign: 'center'
                        }}>
                          {subcategory.icon}
                        </div>
                        <h3 style={{
                          fontSize: '1.15rem',
                          fontWeight: '700',
                          color: '#1f2937',
                          marginBottom: '0.5rem',
                          textAlign: 'center'
                        }}>
                          {subcategory.name}
                        </h3>
                        <p style={{
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: subcategory.color,
                          textAlign: 'center',
                          margin: '0.5rem 0'
                        }}>
                          ({subcategory.count})
                        </p>
                        <div style={{
                          fontSize: '0.8rem',
                          color: '#6b7280',
                          lineHeight: '1.5',
                          marginTop: '0.75rem'
                        }}>
                          {subcategory.items.slice(0, 3).map((item, idx) => (
                            <div key={idx} style={{ marginBottom: '0.2rem' }}>
                              • {item}
                            </div>
                          ))}
                          {subcategory.items.length > 3 && (
                            <div style={{ fontStyle: 'italic', color: '#9ca3af' }}>
                              + {subcategory.items.length - 3} more
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </>
      ) : (
        <>
          <p style={{
            fontSize: '1rem',
            color: '#4b5563',
            textAlign: 'center',
            marginBottom: '1.5rem',
            lineHeight: '1.6'
          }}>
            Select a topic to start practicing interview questions. Test your knowledge and prepare for success!
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem'
          }}>
            {selectedSubcategory.items.map((item, index) => (
              <button
                key={item}
                ref={(el) => itemRefs.current[index] = el}
                onClick={() => onSelectItem(item)}
                tabIndex={focusedItemIndex === index ? 0 : -1}
                role="link"
                aria-label={`${item} interview questions`}
                style={{
                  backgroundColor: 'white',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: focusedItemIndex === index
                    ? `2px solid ${selectedSubcategory.color}`
                    : `2px solid ${selectedSubcategory.color}40`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: focusedItemIndex === index ? 'translateY(-3px)' : 'translateY(0)',
                  boxShadow: focusedItemIndex === index
                    ? `0 0 0 3px ${selectedSubcategory.color}40, 0 6px 12px rgba(0,0,0,0.12)`
                    : '0 2px 6px rgba(0,0,0,0.08)',
                  textAlign: 'left',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${selectedSubcategory.color}40, 0 6px 12px rgba(0,0,0,0.12)`
                  e.currentTarget.style.borderColor = selectedSubcategory.color
                }}
                onMouseLeave={(e) => {
                  if (focusedItemIndex !== index) {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.08)'
                    e.currentTarget.style.borderColor = selectedSubcategory.color + '40'
                  }
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    backgroundColor: selectedSubcategory.color,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    fontWeight: '700',
                    flexShrink: 0
                  }}>
                    {index + 1}
                  </div>
                  <h3 style={{
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    margin: 0
                  }}>
                    {item}
                  </h3>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '0.4rem',
                  fontSize: '0.8rem',
                  color: selectedSubcategory.color,
                  fontWeight: '600'
                }}>
                  <span>Start Questions</span>
                  <span>→</span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Questions

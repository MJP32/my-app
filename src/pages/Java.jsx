import { useState, useEffect } from 'react'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'

function Java({ onBack, onSelectItem }) {
  const javaVersions = [
    {
      id: 'Core Java',
      name: 'Core Java',
      icon: '☕',
      color: '#f59e0b',
      complexity: 'Beginner to Intermediate',
      description: 'Comprehensive Java programming fundamentals including OOP principles, collections framework, exception handling, multithreading, and JVM internals.'
    },
    {
      id: 'Java 8',
      name: 'Java 8',
      icon: '🎯',
      color: '#3b82f6',
      complexity: 'Intermediate',
      description: 'Lambda expressions, Stream API, functional interfaces, default methods, and the revolutionary changes that shaped modern Java development.'
    },
    {
      id: 'Java 11',
      name: 'Java 11 LTS',
      icon: '🔧',
      color: '#8b5cf6',
      complexity: 'Intermediate',
      description: 'Long-Term Support release featuring HTTP Client API, local-variable syntax for lambda parameters, and essential performance improvements.'
    },
    {
      id: 'Java 15',
      name: 'Java 15',
      icon: '📝',
      color: '#10b981',
      complexity: 'Advanced',
      description: 'Text blocks, sealed classes (preview), hidden classes, and the Edwards-Curve Digital Signature Algorithm for enhanced security.'
    },
    {
      id: 'Java 21',
      name: 'Java 21 LTS',
      icon: '🚀',
      color: '#ec4899',
      complexity: 'Advanced',
      description: 'Long-Term Support with virtual threads, pattern matching, record patterns, sequenced collections, and significant performance enhancements.'
    },
    {
      id: 'Java 24',
      name: 'Java 24 Preview',
      icon: '🔮',
      color: '#06b6d4',
      complexity: 'Expert Level',
      description: 'Cutting-edge preview features including advanced pattern matching, class-file API improvements, and next-generation JVM capabilities.'
    }
  ]

  // Enable keyboard navigation with 2-column grid
  const { focusedIndex, itemRefs } = useKeyboardNavigation({
    items: javaVersions,
    onSelect: (item) => onSelectItem(item.id),
    onBack,
    enabled: true,
    gridColumns: 2,
    loop: true
  })

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#fef3c7', minHeight: '100vh' }}>
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
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
        >
          ← Back to Menu
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: 0
        }}>
          ☕ Java Versions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <p style={{
        fontSize: '1.2rem',
        color: '#4b5563',
        textAlign: 'center',
        marginBottom: '3rem',
        lineHeight: '1.8'
      }}>
        Explore Java versions from fundamentals to cutting-edge features. Select a version to dive deep into
        its capabilities, features, and best practices.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: '2rem'
      }}>
        {javaVersions.map((version, index) => (
          <button
            key={version.id}
            ref={(el) => itemRefs.current[index] = el}
            onClick={() => onSelectItem(version.id)}
            tabIndex={focusedIndex === index ? 0 : -1}
            role="link"
            aria-label={`${version.name} - ${version.complexity}. ${version.description}`}
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: `3px solid ${version.color}`,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: focusedIndex === index ? 'translateY(-8px)' : 'translateY(0)',
              boxShadow: focusedIndex === index
                ? `0 0 0 4px ${version.color}40, 0 12px 24px rgba(0,0,0,0.2)`
                : '0 4px 12px rgba(0,0,0,0.1)',
              textAlign: 'left',
              width: '100%'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = `0 0 0 4px ${version.color}40, 0 12px 24px rgba(0,0,0,0.2)`
            }}
            onMouseLeave={(e) => {
              if (focusedIndex !== index) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
              }
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                fontSize: '3rem',
                lineHeight: 1
              }}>
                {version.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  margin: 0,
                  marginBottom: '0.25rem'
                }}>
                  {version.name}
                </h3>
                <div style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  backgroundColor: version.color,
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  borderRadius: '6px'
                }}>
                  {version.complexity}
                </div>
              </div>
            </div>

            <p style={{
              fontSize: '0.95rem',
              color: '#6b7280',
              lineHeight: '1.6',
              margin: '1rem 0'
            }}>
              {version.description}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '0.5rem',
              fontSize: '0.9rem',
              color: version.color,
              fontWeight: '600',
              marginTop: '1.5rem'
            }}>
              <span>Explore Features</span>
              <span>→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Java

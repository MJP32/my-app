import { useState } from 'react'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function Design({ onBack, onSelectItem }) {
  const designItems = [
    {
      id: 'Design Patterns',
      name: 'Design Patterns',
      icon: '🎨',
      color: '#8b5cf6',
      description: 'Classic and modern software design patterns including Gang of Four patterns, architectural patterns, and enterprise integration patterns.'
    },
    {
      id: 'Microservice Design Patterns',
      name: 'Microservice Design Patterns',
      icon: '🔷',
      color: '#6366f1',
      description: 'Microservices architecture patterns including API Gateway, Circuit Breaker, Service Discovery, and Event Sourcing.'
    },
    {
      id: 'Class',
      name: 'Object-Oriented Design',
      icon: '🏗️',
      color: '#7c3aed',
      description: 'Object-oriented design principles, encapsulation, inheritance, composition, and OOP best practices.'
    },
    {
      id: 'System Design',
      name: 'System Design',
      icon: '⚙️',
      color: '#a855f7',
      description: 'Large-scale system design, distributed systems, scalability, reliability, and architectural decision-making.'
    },
    {
      id: 'Module',
      name: 'Module System',
      icon: '📦',
      color: '#9333ea',
      description: 'Java Module System (JPMS), modular application design, and dependency management.'
    },
    {
      id: 'Function',
      name: 'Functional Programming',
      icon: '⚡',
      color: '#7e22ce',
      description: 'Functional programming paradigms, lambda expressions, stream processing, and immutability.'
    },
    {
      id: 'Interface',
      name: 'Interface Design',
      icon: '🔌',
      color: '#6b21a8',
      description: 'Contract programming with interfaces, abstraction, polymorphism, and API design principles.'
    },
    {
      id: 'Event Driven Architecture',
      name: 'Event Driven Architecture',
      icon: '📡',
      color: '#ec4899',
      description: 'Event-driven systems, message queuing, pub/sub patterns, event sourcing, CQRS, and asynchronous communication.'
    },
    {
      id: 'Domain Driven Design',
      name: 'Domain Driven Design',
      icon: '🏛️',
      color: '#14b8a6',
      description: 'Strategic and tactical patterns for complex domain modeling including bounded contexts, aggregates, entities, value objects, and ubiquitous language.'
    }
  ]

  // Enable keyboard navigation with 2-column grid
  const { focusedIndex, itemRefs } = useKeyboardNavigation({
    items: designItems,
    onSelect: (item) => onSelectItem(item.id),
    onBack,
    enabled: true,
    gridColumns: 2,
    loop: true
  })

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#f3e8ff', minHeight: '100vh' }}>
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
          🎨 Design & Architecture
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
        Master software design patterns, architectural principles, and best practices for building scalable, maintainable systems.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '2rem'
      }}>
        {designItems.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => itemRefs.current[index] = el}
            onClick={() => onSelectItem(item.id)}
            tabIndex={focusedIndex === index ? 0 : -1}
            role="link"
            aria-label={`${item.name}. ${item.description}`}
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: `3px solid ${item.color}`,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: focusedIndex === index ? 'translateY(-8px)' : 'translateY(0)',
              boxShadow: focusedIndex === index
                ? `0 0 0 4px ${item.color}40, 0 12px 24px rgba(0,0,0,0.2)`
                : '0 4px 12px rgba(0,0,0,0.1)',
              textAlign: 'left',
              width: '100%'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = `0 0 0 4px ${item.color}40, 0 12px 24px rgba(0,0,0,0.2)`
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
                {item.icon}
              </div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                color: '#1f2937',
                margin: 0
              }}>
                {item.name}
              </h3>
            </div>

            <p style={{
              fontSize: '0.95rem',
              color: '#6b7280',
              lineHeight: '1.6',
              margin: '1rem 0'
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
              marginTop: '1.5rem'
            }}>
              <span>Explore Topic</span>
              <span>→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Design

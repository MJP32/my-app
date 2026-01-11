import { useState } from 'react'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'
import Breadcrumb from '../../components/Breadcrumb'

function Cloud({ onBack, onSelectItem, breadcrumb }) {
  const cloudItems = [
    {
      id: 'AWS',
      name: 'Amazon Web Services',
      icon: '☁️',
      color: '#f97316',
      description: 'AWS cloud services including EC2, S3, Lambda, RDS, and comprehensive cloud architecture patterns.'
    },
    {
      id: 'GCP',
      name: 'Google Cloud Platform',
      icon: '🌐',
      color: '#3b82f6',
      description: 'GCP services, Compute Engine, Cloud Storage, BigQuery, and Google Cloud infrastructure.'
    },
    {
      id: 'Azure',
      name: 'Microsoft Azure',
      icon: '☁',
      color: '#0ea5e9',
      description: 'Azure cloud platform, Virtual Machines, Azure Functions, Cosmos DB, and enterprise solutions.'
    }
  ]

  const { focusedIndex, itemRefs } = useKeyboardNavigation({
    items: cloudItems,
    onSelect: (item) => onSelectItem(item.id),
    onBack,
    enabled: true,
    gridColumns: 1,
    loop: true
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #0c4a6e, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={onBack}
              style={{
                background: '#2563eb',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500',
                fontSize: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1d4ed8'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2563eb'
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              ← Back to Menu
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #7dd3fc, #38bdf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              ☁️ Cloud Platforms
            </h1>
          </div>
        </div>

        {/* Dark themed Breadcrumb */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'rgba(14, 165, 233, 0.1)',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          border: '1px solid rgba(14, 165, 233, 0.3)'
        }}>
          <button
            onClick={breadcrumb?.section?.onClick || onBack}
            style={{
              background: 'none',
              border: 'none',
              color: '#7dd3fc',
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
              e.currentTarget.style.backgroundColor = 'rgba(14, 165, 233, 0.2)'
              e.currentTarget.style.color = '#bae6fd'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#7dd3fc'
            }}
          >
            <span>☁️</span> Cloud
          </button>
          <span style={{ color: '#0ea5e9', fontSize: '0.9rem' }}>→</span>
          <span style={{
            color: '#e2e8f0',
            fontSize: '0.9rem',
            fontWeight: '600',
            padding: '0.25rem 0.75rem',
            backgroundColor: 'rgba(14, 165, 233, 0.2)',
            borderRadius: '4px'
          }}>
            Cloud Platforms
          </span>
        </div>

        <p style={{
          fontSize: '1.2rem',
          color: '#d1d5db',
          textAlign: 'center',
          marginBottom: '3rem',
          lineHeight: '1.8'
        }}>
          Explore major cloud platforms and learn to architect, deploy, and manage applications in the cloud.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem'
        }}>
          {cloudItems.map((item, index) => (
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
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#7dd3fc',
                  marginBottom: '0.25rem'
                }}>
                  {item.name}
                </h3>
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

export default Cloud

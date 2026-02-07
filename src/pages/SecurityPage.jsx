import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'
import Breadcrumb from '../components/Breadcrumb'
import CollapsibleSidebar from '../components/CollapsibleSidebar'

function SecurityPage({ onBack, onSelectItem, breadcrumb }) {
  const securityItems = [
    {
      id: 'Security OWASP',
      name: 'Security & OWASP',
      icon: '🔒',
      color: '#ef4444',
      description: 'Application security principles, OWASP Top 10 vulnerabilities, secure coding practices, and security testing.'
    },
    {
      id: 'JWT',
      name: 'JWT (JSON Web Tokens)',
      icon: '🔑',
      color: '#8b5cf6',
      description: 'Stateless authentication tokens, token structure (header, payload, signature), signing algorithms, and security best practices.'
    },
    {
      id: 'OAuth',
      name: 'OAuth 1.0',
      icon: '🔐',
      color: '#3b82f6',
      description: 'OAuth 1.0 protocol, three-legged authentication, signature-based security, request tokens, and authorization flow.'
    },
    {
      id: 'OAuth2',
      name: 'OAuth 2.0',
      icon: '🛡️',
      color: '#10b981',
      description: 'OAuth 2.0 framework, authorization flows (authorization code, implicit, client credentials, password), access tokens, refresh tokens, and PKCE.'
    }
  ]

  const { focusedIndex, itemRefs } = useKeyboardNavigation({
    items: securityItems,
    onSelect: (item) => onSelectItem(item.id),
    onBack,
    enabled: true,
    gridColumns: 1,
    loop: true
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #7f1d1d, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

        {/* Collapsible Sidebar for quick topic navigation */}
        <CollapsibleSidebar
          items={securityItems}
          selectedIndex={-1}
          onSelect={(index) => onSelectItem(securityItems[index].id)}
          title="Security"
          getItemLabel={(item) => item.name}
          getItemIcon={(item) => item.icon}
          primaryColor="#ef4444"
        />

        <p style={{
          fontSize: '1.2rem',
          color: '#d1d5db',
          textAlign: 'center',
          marginBottom: '3rem',
          lineHeight: '1.8'
        }}>
          Master application security, understand common vulnerabilities, and learn secure coding best practices.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem'
        }}>
          {securityItems.map((item, index) => (
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
                  color: '#fca5a5',
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

export default SecurityPage

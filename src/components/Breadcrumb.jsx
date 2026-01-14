function Breadcrumb({ breadcrumb }) {
  // breadcrumb format:
  // - section: { name, icon, onClick } - e.g., Python, Design, Cloud
  // - topic: string - current page name
  if (!breadcrumb) return null

  const { section, topic } = breadcrumb

  const linkStyle = {
    background: 'none',
    border: 'none',
    color: '#60a5fa',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  }

  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = '#334155'
    e.currentTarget.style.color = '#93c5fd'
  }

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = 'transparent'
    e.currentTarget.style.color = '#60a5fa'
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1rem',
      backgroundColor: '#1e293b',
      borderRadius: '8px',
      marginBottom: '1.5rem',
      flexWrap: 'wrap',
      border: '1px solid #334155'
    }}>
      {/* Section link (e.g., Python, Design) */}
      {section && (
        <button
          onClick={section.onClick}
          style={linkStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {section.icon && <span>{section.icon}</span>} {section.name}
        </button>
      )}

      {/* Arrow before topic */}
      {section && (
        <span style={{ color: '#475569', fontSize: '0.9rem' }}>→</span>
      )}

      {/* Current Topic (not clickable) */}
      <span style={{
        color: '#e2e8f0',
        fontSize: '0.9rem',
        fontWeight: '600',
        padding: '0.25rem 0.75rem',
        backgroundColor: '#334155',
        borderRadius: '4px'
      }}>
        {topic}
      </span>
    </div>
  )
}

export default Breadcrumb

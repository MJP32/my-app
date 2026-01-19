function Breadcrumb({ breadcrumb }) {
  // breadcrumb format:
  // - section: { name, icon, onClick, color } - e.g., Python, Design, Cloud
  // - category: { name, onClick } (optional) - intermediate category
  // - topic: string - current page name
  // - colors: { primary, primaryHover, bg, border, arrow } (optional) - theme colors
  if (!breadcrumb) return null

  const { section, category, topic, colors } = breadcrumb

  // Default colors (blue theme) - can be overridden via colors prop
  const themeColors = {
    primary: colors?.primary || '#93c5fd',
    primaryHover: colors?.primaryHover || '#bfdbfe',
    bg: colors?.bg || 'rgba(59, 130, 246, 0.1)',
    border: colors?.border || 'rgba(59, 130, 246, 0.3)',
    arrow: colors?.arrow || '#3b82f6',
    hoverBg: colors?.hoverBg || 'rgba(59, 130, 246, 0.2)',
    topicBg: colors?.topicBg || 'rgba(59, 130, 246, 0.2)'
  }

  const linkStyle = {
    background: 'none',
    border: 'none',
    color: themeColors.primary,
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
    e.currentTarget.style.backgroundColor = themeColors.hoverBg
    e.currentTarget.style.color = themeColors.primaryHover
  }

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = 'transparent'
    e.currentTarget.style.color = themeColors.primary
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1rem',
      backgroundColor: themeColors.bg,
      borderRadius: '8px',
      marginBottom: '1.5rem',
      flexWrap: 'wrap',
      border: `1px solid ${themeColors.border}`
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

      {/* Arrow after section */}
      {section && (
        <span style={{ color: themeColors.arrow, fontSize: '0.9rem' }}>→</span>
      )}

      {/* Optional category link (e.g., Fundamentals, Modern Java) */}
      {category && (
        <>
          <button
            onClick={category.onClick}
            style={linkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {category.name}
          </button>
          <span style={{ color: themeColors.arrow, fontSize: '0.9rem' }}>→</span>
        </>
      )}

      {/* Current Topic (not clickable) */}
      <span style={{
        color: '#e2e8f0',
        fontSize: '0.9rem',
        fontWeight: '600',
        padding: '0.25rem 0.75rem',
        backgroundColor: themeColors.topicBg,
        borderRadius: '4px'
      }}>
        {topic}
      </span>
    </div>
  )
}

export default Breadcrumb

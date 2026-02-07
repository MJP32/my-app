function Breadcrumb({ breadcrumb, breadcrumbStack, onBreadcrumbClick, colors: propColors, onMainMenu: propOnMainMenu }) {
  // Get onMainMenu from either prop or breadcrumb object
  const onMainMenu = propOnMainMenu || breadcrumb?.onMainMenu
  // Supports two formats:
  // 1. Legacy format (breadcrumb prop):
  //    - section: { name, icon, onClick, color } - e.g., Python, Design, Cloud
  //    - category: { name, onClick } (optional) - intermediate category
  //    - topic: string - current page name
  //    - colors: { primary, primaryHover, bg, border, arrow } (optional) - theme colors
  //
  // 2. New stack format (breadcrumbStack prop):
  //    - Array of { name, icon?, page? } items
  //    - onBreadcrumbClick(index) - callback when clicking a breadcrumb item
  //    - colors: theme colors (passed as separate prop)

  // Determine which format we're using
  const isStackFormat = Array.isArray(breadcrumbStack) && breadcrumbStack.length > 0

  if (!breadcrumb && !isStackFormat) return null

  // Get colors from either format
  const colors = propColors || breadcrumb?.colors

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
    e.currentTarget.style.textDecoration = 'underline'
  }

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = 'transparent'
    e.currentTarget.style.color = themeColors.primary
    e.currentTarget.style.textDecoration = 'none'
  }

  // Render stack-based breadcrumbs
  if (isStackFormat) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1rem',
        backgroundColor: themeColors.bg,
        borderRadius: '8px',
        marginBottom: '1.5rem',
        flexWrap: 'wrap'
      }}>
        {/* Main Menu link */}
        {onMainMenu && (
          <>
            <button
              onClick={onMainMenu}
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span>🏠</span> Main Menu
            </button>
            <span style={{ color: themeColors.arrow, fontSize: '0.9rem' }}>→</span>
          </>
        )}
        {breadcrumbStack.map((item, index) => {
          const isLast = index === breadcrumbStack.length - 1
          const isClickable = !isLast && onBreadcrumbClick

          return (
            <span key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {isClickable ? (
                <button
                  onClick={() => onBreadcrumbClick(index, item)}
                  style={linkStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.icon && <span>{item.icon}</span>} {item.name}
                </button>
              ) : (
                <span style={{
                  color: themeColors.primary,
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  {item.icon && <span>{item.icon}</span>} {item.name}
                </span>
              )}
              {!isLast && (
                <span style={{ color: themeColors.arrow, fontSize: '0.9rem' }}>→</span>
              )}
            </span>
          )
        })}
      </div>
    )
  }

  // Legacy format rendering
  const { section, category, subcategory, subsubcategory, topic } = breadcrumb

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1rem',
      backgroundColor: themeColors.bg,
      borderRadius: '8px',
      marginBottom: '1.5rem',
      flexWrap: 'wrap'
    }}>
      {/* Main Menu link */}
      {onMainMenu && (
        <>
          <button
            onClick={onMainMenu}
            style={linkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span>🏠</span> Main Menu
          </button>
          <span style={{ color: themeColors.arrow, fontSize: '0.9rem' }}>→</span>
        </>
      )}

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

      {/* Optional subcategory link (e.g., Core Python when viewing a concept) */}
      {subcategory && (
        <>
          <button
            onClick={subcategory.onClick}
            style={linkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {subcategory.name}
          </button>
          <span style={{ color: themeColors.arrow, fontSize: '0.9rem' }}>→</span>
        </>
      )}

      {/* Optional subsubcategory link (e.g., Lambda Expressions when viewing a concept in Java 8) */}
      {subsubcategory && (
        <>
          <button
            onClick={subsubcategory.onClick}
            style={linkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {subsubcategory.name}
          </button>
          <span style={{ color: themeColors.arrow, fontSize: '0.9rem' }}>→</span>
        </>
      )}

      {/* Current Topic (not clickable) */}
      <span style={{
        color: themeColors.primary,
        fontSize: '0.9rem',
        fontWeight: '600'
      }}>
        {topic}
      </span>
    </div>
  )
}

export default Breadcrumb

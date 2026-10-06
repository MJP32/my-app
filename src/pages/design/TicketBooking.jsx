import { useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const TOPIC_COLORS = {
  primary: '#ec4899',
  primaryHover: '#f9a8d4',
  bg: 'rgba(236, 72, 153, 0.1)',
  border: 'rgba(236, 72, 153, 0.3)',
  arrow: '#ec4899',
  hoverBg: 'rgba(236, 72, 153, 0.2)',
  topicBg: 'rgba(236, 72, 153, 0.2)'
}

// The full write-up is an authored, self-contained document (15 tabbed
// phases, its own diagrams and script). It is served verbatim from /public
// and embedded here so the app chrome (breadcrumb, back, keyboard) matches
// the other system design guides.
const DOCUMENT_URL = '/designs/ticket-booking.html'

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function TicketBooking({ onBack, breadcrumb }) {
  // =============================================================================
  // BREADCRUMB CONFIGURATION
  // =============================================================================

  const breadcrumbStack = [
    { name: 'System Design', icon: '🏗️', page: 'System Design' },
    { name: 'Ticket Booking', icon: '🎟️', page: 'Ticket Booking' }
  ]

  const handleBreadcrumbClick = (index) => {
    if (index === 0) onBack()
  }

  // =============================================================================
  // KEYBOARD NAVIGATION
  // =============================================================================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        onBack()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onBack])

  // =============================================================================
  // STYLES
  // =============================================================================

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1a0b14 50%, #0f172a 100%)',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }

  const headerStyle = {
    maxWidth: '1400px',
    margin: '0 auto 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  }

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #ec4899, #f9a8d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(236, 72, 153, 0.2)',
    border: '1px solid rgba(236, 72, 153, 0.3)',
    borderRadius: '0.5rem',
    color: '#f9a8d4',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Ticket Booking System Design</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(236, 72, 153, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(236, 72, 153, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to System Design
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 1.5rem' }}>
        <Breadcrumb
          breadcrumbStack={breadcrumbStack}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={TOPIC_COLORS}
        />
      </div>

      {/* Embedded interview write-up */}
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '0.75rem',
          color: '#9ca3af',
          fontSize: '0.85rem'
        }}>
          <span>
            A 45-minute system design round walked end to end: scope → scale → API → data → CQRS → architecture → flows → deep dives → AWS → observability → patterns → critique → talk track. Never sell a seat twice.
          </span>
          <a
            href={DOCUMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#f9a8d4', textDecoration: 'none', whiteSpace: 'nowrap' }}
          >
            Open full screen ↗
          </a>
        </div>
        <iframe
          src={DOCUMENT_URL}
          title="Ticket Booking System — System Design Round"
          style={{
            width: '100%',
            height: 'calc(100vh - 220px)',
            minHeight: '640px',
            border: '1px solid #374151',
            borderRadius: '1rem',
            background: '#1a0b14',
            display: 'block'
          }}
        />
      </div>
    </div>
  )
}

export default TicketBooking

import { useState } from 'react'
import { trackShare } from './GoogleAnalytics'

/**
 * Social Share Component
 * Provides buttons to share content on various platforms
 */
function SocialShare({
  url = '',
  title = '',
  description = '',
  hashtags = ['Java', 'Programming', 'LearnToCode'],
  showLabel = true,
  size = 'medium', // 'small', 'medium', 'large'
  layout = 'horizontal' // 'horizontal', 'vertical'
}) {
  const [copied, setCopied] = useState(false)
  const shareUrl = url || window.location.href
  const shareTitle = title || document.title

  const sizes = {
    small: { button: '32px', icon: '14px', gap: '0.5rem' },
    medium: { button: '40px', icon: '18px', gap: '0.75rem' },
    large: { button: '48px', icon: '22px', gap: '1rem' }
  }

  const currentSize = sizes[size]

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}&hashtags=${hashtags.join(',')}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`,
    hackernews: `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(shareUrl)}&t=${encodeURIComponent(shareTitle)}`,
    email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(description + '\n\n' + shareUrl)}`
  }

  const handleShare = async (platform) => {
    trackShare(platform, 'page', window.location.pathname)

    if (platform === 'copy') {
      handleCopyLink()
      return
    }

    // Try native Web Share API first (best on mobile)
    if (platform !== 'email' && typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: description, url: shareUrl })
        trackShare('web_share', 'page', window.location.pathname)
        return
      } catch (e) {
        // User canceled or unsupported - fall through to link-based share
        // console.debug('Web Share API fallback:', e)
      }
    }

    const link = shareLinks[platform]
    if (link) {
      // Use an anchor element click to avoid popup blockers
      const a = document.createElement('a')
      a.href = link
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
      // Some browsers require the element to be in the DOM to dispatch click reliably
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      trackShare('copy_link', 'page', window.location.pathname)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = shareUrl
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (e) {
        console.error('Fallback copy failed:', e)
      }
      document.body.removeChild(textArea)
    }
  }

  const shareButtons = [
    { platform: 'twitter', icon: '𝕏', label: 'Twitter/X', color: '#000000' },
    { platform: 'linkedin', icon: 'in', label: 'LinkedIn', color: '#0077b5' },
    { platform: 'facebook', icon: 'f', label: 'Facebook', color: '#1877f2' },
    { platform: 'reddit', icon: '🤖', label: 'Reddit', color: '#ff4500' },
    { platform: 'hackernews', icon: 'Y', label: 'Hacker News', color: '#ff6600' },
    { platform: 'email', icon: '✉', label: 'Email', color: '#6b7280' },
    { platform: 'copy', icon: copied ? '✓' : '🔗', label: copied ? 'Copied!' : 'Copy Link', color: copied ? '#10b981' : '#3b82f6' }
  ]

  return (
    <div style={{
      display: 'flex',
      flexDirection: layout === 'vertical' ? 'column' : 'row',
      alignItems: layout === 'vertical' ? 'stretch' : 'center',
      gap: currentSize.gap,
      padding: '0.5rem'
    }}>
      {showLabel && (
        <span style={{
          fontSize: size === 'small' ? '0.875rem' : '1rem',
          fontWeight: '600',
          color: '#4b5563',
          marginRight: layout === 'horizontal' ? '0.5rem' : '0',
          marginBottom: layout === 'vertical' ? '0.5rem' : '0'
        }}>
          Share:
        </span>
      )}

      <div style={{
        display: 'flex',
        flexDirection: layout === 'vertical' ? 'column' : 'row',
        gap: size === 'small' ? '0.375rem' : '0.5rem',
        flexWrap: 'wrap'
      }}>
        {shareButtons.map(({ platform, icon, label, color }) => (
          <button
            key={platform}
            onClick={() => handleShare(platform)}
            aria-label={`Share on ${label}`}
            title={label}
            style={{
              width: layout === 'vertical' ? '100%' : currentSize.button,
              height: currentSize.button,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              border: `2px solid ${color}20`,
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: currentSize.icon,
              fontWeight: '700',
              color: color,
              padding: layout === 'vertical' ? '0 0.75rem' : '0',
              gap: layout === 'vertical' ? '0.5rem' : '0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = color + '10'
              e.currentTarget.style.borderColor = color
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = `0 4px 12px ${color}30`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white'
              e.currentTarget.style.borderColor = color + '20'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <span>{icon}</span>
            {layout === 'vertical' && (
              <span style={{ fontSize: '0.875rem', flex: 1, textAlign: 'left' }}>
                {label}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SocialShare

/**
 * Compact social share button for account dropdown
 */
export function ShareButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        width: '100%',
        padding: '0.75rem 1rem',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.95rem',
        color: '#374151',
        textAlign: 'left',
        transition: 'all 0.2s ease',
        borderRadius: '6px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f3f4f6'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      <span style={{ fontSize: '1.25rem' }}>🔗</span>
      <span style={{ fontWeight: '500' }}>Share This Page</span>
    </button>
  )
}

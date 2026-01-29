import { useState, useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

/**
 * ShareButton - Component for sharing achievements on social media
 */
const ShareButton = ({ type, data, size = 'medium' }) => {
  const { isDarkMode } = useContext(ThemeContext)
  const [showOptions, setShowOptions] = useState(false)

  // Generate share text based on type
  const getShareText = (platform) => {
    let text = ''
    let url = window.location.origin

    switch (type) {
      case 'dailyChallenge':
        text = `Just solved today's Daily Challenge: ${data.title}! 🔥\n${data.streak ? `${data.streak}-day streak` : 'Started my streak'} on TechLearn`
        break

      case 'streak':
        if (data.milestone) {
          text = `🔥 Achieved a ${data.streak}-day streak on TechLearn! Consistency is key! 💪`
        } else {
          text = `🔥 ${data.streak}-day learning streak on TechLearn! Keep the momentum going!`
        }
        break

      case 'levelUp':
        text = `⭐ Level ${data.level} achieved on TechLearn! ${data.xp} XP and counting! 🚀`
        break

      case 'completion':
        text = `✅ Completed ${data.count} coding problems on TechLearn! ${data.category ? `Mastering ${data.category}!` : 'Keep coding!'} 💻`
        break

      default:
        text = `Check out my progress on TechLearn!`
    }

    // Add hashtags for Twitter
    if (platform === 'twitter') {
      text += '\n\n#100DaysOfCode #LeetCode #CodingInterview #TechLearn'
    }

    return text
  }

  const shareOnTwitter = () => {
    const text = getShareText('twitter')
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(twitterUrl, '_blank', 'width=550,height=420')
    setShowOptions(false)
  }

  const shareOnLinkedIn = () => {
    const text = getShareText('linkedin')
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`
    // LinkedIn doesn't support pre-filled text in the URL, so we'll just open the share dialog
    window.open(linkedInUrl, '_blank', 'width=550,height=420')
    setShowOptions(false)
  }

  const copyToClipboard = () => {
    const text = getShareText('generic')
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!')
      setShowOptions(false)
    }).catch(err => {
      console.error('Failed to copy:', err)
    })
  }

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  }

  const buttonSize = sizeClasses[size] || sizeClasses.medium

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className={`${buttonSize} font-semibold rounded-lg transition-all ${
          isDarkMode
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white'
            : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
        } shadow-lg hover:shadow-xl flex items-center gap-2`}
      >
        <span>Share</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </button>

      {showOptions && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowOptions(false)}
          />

          {/* Share options menu */}
          <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl border-2 z-50 ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}>
            <div className="py-1">
              <button
                onClick={shareOnTwitter}
                className={`w-full text-left px-4 py-2 flex items-center gap-3 transition-colors ${
                  isDarkMode
                    ? 'hover:bg-gray-700 text-gray-200'
                    : 'hover:bg-gray-100 text-gray-800'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>Share on X</span>
              </button>

              <button
                onClick={shareOnLinkedIn}
                className={`w-full text-left px-4 py-2 flex items-center gap-3 transition-colors ${
                  isDarkMode
                    ? 'hover:bg-gray-700 text-gray-200'
                    : 'hover:bg-gray-100 text-gray-800'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>Share on LinkedIn</span>
              </button>

              <button
                onClick={copyToClipboard}
                className={`w-full text-left px-4 py-2 flex items-center gap-3 transition-colors ${
                  isDarkMode
                    ? 'hover:bg-gray-700 text-gray-200'
                    : 'hover:bg-gray-100 text-gray-800'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy to clipboard</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ShareButton

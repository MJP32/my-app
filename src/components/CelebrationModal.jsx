import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import ShareButton from './ShareButton'

/**
 * CelebrationModal - Shows celebration message when completing achievements
 */
const CelebrationModal = ({ type, data, onClose }) => {
  const { isDarkMode } = useContext(ThemeContext)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose && onClose(), 300)
  }

  const getContent = () => {
    switch (type) {
      case 'dailyChallenge':
        return {
          emoji: '🎉',
          title: 'Daily Challenge Complete!',
          message: `You solved "${data.title}"`,
          subMessage: data.streak > 1 ? `${data.streak}-day streak! Keep it going!` : 'Start building your streak!',
          color: 'from-green-500 to-emerald-500'
        }

      case 'streak':
        return {
          emoji: '🔥',
          title: `${data.streak}-Day Streak!`,
          message: data.milestone ? `You hit a ${data.streak}-day milestone!` : 'Amazing consistency!',
          subMessage: 'Keep the momentum going!',
          color: 'from-orange-500 to-red-500'
        }

      case 'levelUp':
        return {
          emoji: '⭐',
          title: `Level ${data.level}!`,
          message: 'You leveled up!',
          subMessage: `${data.xp} XP total`,
          color: 'from-purple-500 to-pink-500'
        }

      default:
        return {
          emoji: '✅',
          title: 'Awesome!',
          message: 'Keep up the great work!',
          subMessage: '',
          color: 'from-blue-500 to-cyan-500'
        }
    }
  }

  const content = getContent()

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-50 ${
          isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none`}>
        <div
          className={`pointer-events-auto w-full max-w-md transform transition-all duration-300 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <div className={`rounded-2xl p-8 shadow-2xl border-2 ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}>
            {/* Emoji with animation */}
            <div className="text-center mb-6">
              <div className="text-8xl animate-bounce inline-block">
                {content.emoji}
              </div>
            </div>

            {/* Title */}
            <h2 className={`text-3xl font-bold text-center mb-4 bg-gradient-to-r ${content.color} bg-clip-text text-transparent`}>
              {content.title}
            </h2>

            {/* Message */}
            <p className={`text-xl text-center mb-2 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              {content.message}
            </p>

            {/* Sub-message */}
            {content.subMessage && (
              <p className={`text-sm text-center mb-6 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {content.subMessage}
              </p>
            )}

            {/* Share Button */}
            <div className="flex justify-center mb-6">
              <ShareButton type={type} data={data} size="large" />
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CelebrationModal

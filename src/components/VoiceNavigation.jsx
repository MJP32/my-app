import { useState, useEffect, useRef, useCallback } from 'react'
import { Mic, MicOff } from 'lucide-react'
import useSpeechRecognition from '../hooks/useSpeechRecognition'
import { createSearchIndex, searchContent } from '../utils/searchIndex.js'

const FILLER_PATTERN = /^(go\s+to|open|show\s+me|navigate\s+to|take\s+me\s+to|search\s+for)\s+/i

function cleanTranscript(text) {
  return text.replace(FILLER_PATTERN, '').trim()
}

function fuzzyWordOverlap(query, title) {
  const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2)
  const titleWords = title.toLowerCase().split(/[\s\-/]+/)
  let matches = 0
  for (const qw of queryWords) {
    if (titleWords.some(tw => tw.startsWith(qw) || qw.startsWith(tw))) {
      matches++
    }
  }
  return queryWords.length > 0 ? (matches / queryWords.length) * 100 : 0
}

function VoiceNavigation({ onNavigate }) {
  const { isListening, transcript, finalTranscript, isSupported, error, toggleListening, resetTranscript } = useSpeechRecognition()
  const [feedback, setFeedback] = useState(null) // { text, type: 'listening'|'success'|'error' }
  const [searchIndex, setSearchIndex] = useState(null)
  const [disambiguationResults, setDisambiguationResults] = useState(null)
  const feedbackTimer = useRef(null)
  const lastProcessedRef = useRef('')
  const dropdownRef = useRef(null)

  // Spacebar shortcut to toggle listening (capture phase so it fires
  // before App.jsx's keyboard handler which also uses spacebar)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !e.target.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="link"]')) {
        e.preventDefault()
        e.stopPropagation()
        toggleListening()
      }
    }
    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [toggleListening])

  // Lazily init search index on first use
  useEffect(() => {
    if (isListening && !searchIndex) {
      setSearchIndex(createSearchIndex())
    }
  }, [isListening, searchIndex])

  // Show "Listening..." while active
  useEffect(() => {
    if (isListening) {
      setFeedback({ text: 'Listening...', type: 'listening' })
      lastProcessedRef.current = ''
    }
  }, [isListening])

  // Process final transcript (fires while still listening)
  useEffect(() => {
    if (!finalTranscript || finalTranscript === lastProcessedRef.current) return
    lastProcessedRef.current = finalTranscript

    const cleaned = cleanTranscript(finalTranscript)
    if (!cleaned || !searchIndex) {
      showFeedback('No match found', 'error')
      return
    }

    let results = searchContent(cleaned, searchIndex)

    // Only keep component/section results — category/subcategory types
    // just expand the sidebar and don't actually navigate to a page
    const goodResults = results
      .filter(r => r.score >= 30 && (r.type === 'component' || r.type === 'section'))

    console.log('[Voice] transcript:', JSON.stringify(finalTranscript), '→ cleaned:', JSON.stringify(cleaned))
    console.log('[Voice] all results:', results.length, '→ goodResults:', goodResults.length)
    if (goodResults.length > 0) {
      console.log('[Voice] top 3:', goodResults.slice(0, 3).map(r => `${r.title} (${r.type}, score=${r.score})`))
    }

    if (goodResults.length > 0) {
      const top = goodResults[0]
      const second = goodResults[1]

      // Auto-navigate when: strong match (score>=500 means title starts-with
      // or better), only one result, or top score well above the rest
      if (top.score >= 500 || !second || top.score >= second.score * 1.5) {
        console.log('[Voice] auto-navigating to:', top.title, '→', top.navigateTo())
        showFeedback(`Navigating to ${top.title}`, 'success')
        onNavigate(top.navigateTo())
      } else {
        console.log('[Voice] showing disambiguation:', goodResults.slice(0, 6).map(r => r.title))
        // Multiple close matches - show disambiguation dialog
        setDisambiguationResults(goodResults.slice(0, 6))
      }
    } else {
      // Fallback: fuzzy word-overlap — collect all close matches
      const fuzzyMatches = []
      for (const item of searchIndex) {
        if (item.type !== 'component' && item.type !== 'section') continue
        const score = fuzzyWordOverlap(cleaned, item.title)
        if (score >= 40) {
          fuzzyMatches.push({ ...item, score })
        }
      }
      fuzzyMatches.sort((a, b) => b.score - a.score)

      console.log('[Voice] fuzzy fallback matches:', fuzzyMatches.length, fuzzyMatches.slice(0, 3).map(r => `${r.title} (score=${r.score})`))

      if (fuzzyMatches.length === 1 && fuzzyMatches[0].score >= 60) {
        console.log('[Voice] fuzzy auto-navigating to:', fuzzyMatches[0].title)
        showFeedback(`Navigating to ${fuzzyMatches[0].title}`, 'success')
        onNavigate(fuzzyMatches[0].navigateTo())
      } else if (fuzzyMatches.length > 0) {
        console.log('[Voice] fuzzy showing disambiguation')
        setDisambiguationResults(fuzzyMatches.slice(0, 6))
      } else {
        console.log('[Voice] no matches at all')
        showFeedback('No match found', 'error')
      }
    }

    resetTranscript()
  }, [finalTranscript, searchIndex, onNavigate, resetTranscript])

  const showFeedback = useCallback((text, type) => {
    clearTimeout(feedbackTimer.current)
    setFeedback({ text, type })
    feedbackTimer.current = setTimeout(() => setFeedback(null), 2000)
  }, [])

  const handleDisambiguationSelect = useCallback((result) => {
    setDisambiguationResults(null)
    showFeedback(`Navigating to ${result.title}`, 'success')
    onNavigate(result.navigateTo())
  }, [onNavigate, showFeedback])

  // Close dropdown on click outside or Escape
  useEffect(() => {
    if (!disambiguationResults) return
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDisambiguationResults(null)
      }
    }
    const handleKey = (e) => {
      if (e.key === 'Escape') setDisambiguationResults(null)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [disambiguationResults])

  // Show error feedback
  useEffect(() => {
    if (error) {
      showFeedback(`Error: ${error}`, 'error')
    }
  }, [error, showFeedback])

  // Cleanup timer
  useEffect(() => {
    return () => clearTimeout(feedbackTimer.current)
  }, [])

  if (!isSupported) return null

  const Icon = isListening ? MicOff : Mic

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <button
        onClick={toggleListening}
        aria-label={isListening ? 'Stop voice navigation (Space)' : 'Start voice navigation (Space)'}
        title={isListening ? 'Stop listening (Space)' : 'Start listening (Space)'}
        style={{
          width: '32px',
          height: '32px',
          fontSize: '1rem',
          backgroundColor: isListening ? '#ef4444' : '#6366f1',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isListening
            ? '0 4px 12px -2px rgba(239, 68, 68, 0.4)'
            : '0 4px 12px -2px rgba(99, 102, 241, 0.4)',
          transition: 'all 0.2s ease',
          outline: 'none',
          animation: isListening ? 'voicePulse 1.5s ease-in-out infinite' : 'none'
        }}
        onMouseEnter={(e) => {
          if (!isListening) {
            e.currentTarget.style.backgroundColor = '#4f46e5'
            e.currentTarget.style.transform = 'scale(1.1)'
            e.currentTarget.style.boxShadow = '0 6px 16px -2px rgba(99, 102, 241, 0.5)'
          }
        }}
        onMouseLeave={(e) => {
          if (!isListening) {
            e.currentTarget.style.backgroundColor = '#6366f1'
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 4px 12px -2px rgba(99, 102, 241, 0.4)'
          }
        }}
      >
        <Icon size={16} />
      </button>

      {/* Interim transcript display */}
      {isListening && transcript && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '8px',
          padding: '6px 12px',
          backgroundColor: '#1e1b4b',
          color: '#c7d2fe',
          borderRadius: '6px',
          fontSize: '0.75rem',
          whiteSpace: 'nowrap',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          maxWidth: '200px',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {transcript}
        </div>
      )}

      {/* Feedback tooltip */}
      {feedback && feedback.type !== 'listening' && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '8px',
          padding: '6px 12px',
          backgroundColor: feedback.type === 'success' ? '#065f46' :
                           feedback.type === 'error' ? '#7f1d1d' : '#1e1b4b',
          color: feedback.type === 'success' ? '#a7f3d0' :
                 feedback.type === 'error' ? '#fecaca' : '#c7d2fe',
          borderRadius: '6px',
          fontSize: '0.75rem',
          whiteSpace: 'nowrap',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          {feedback.text}
        </div>
      )}

      {/* Listening feedback tooltip */}
      {feedback && feedback.type === 'listening' && isListening && !transcript && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '8px',
          padding: '6px 12px',
          backgroundColor: '#1e1b4b',
          color: '#c7d2fe',
          borderRadius: '6px',
          fontSize: '0.75rem',
          whiteSpace: 'nowrap',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          Listening...
        </div>
      )}

      {/* Near-match dropdown */}
      {disambiguationResults && (
        <div ref={dropdownRef} style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '8px',
          width: '280px',
          backgroundColor: '#1e1b4b',
          border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '10px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
          zIndex: 1001,
          overflow: 'hidden'
        }}>
          <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(99,102,241,0.15)', fontSize: '0.7rem', color: '#a5b4fc', fontWeight: 600 }}>
            Did you mean?
          </div>
          {disambiguationResults.map((result, i) => (
            <button
              key={result.id || i}
              onClick={() => handleDisambiguationSelect(result)}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px 12px',
                background: 'none',
                border: 'none',
                borderBottom: i < disambiguationResults.length - 1 ? '1px solid rgba(99,102,241,0.1)' : 'none',
                cursor: 'pointer',
                textAlign: 'left',
                color: '#e0e7ff',
                transition: 'background 0.1s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{result.title}</div>
              <div style={{ fontSize: '0.65rem', color: '#818cf8', marginTop: '2px' }}>{result.breadcrumb}</div>
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes voicePulse {
          0%, 100% { box-shadow: 0 4px 12px -2px rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 4px 20px -2px rgba(239, 68, 68, 0.7); }
        }
      `}</style>
    </div>
  )
}

export default VoiceNavigation

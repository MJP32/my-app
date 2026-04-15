import { useState, useEffect, useRef, useCallback } from 'react'

const SpeechRecognition = typeof window !== 'undefined'
  ? window.SpeechRecognition || window.webkitSpeechRecognition
  : null

export default function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [finalTranscript, setFinalTranscript] = useState('')
  const [error, setError] = useState(null)
  const recognitionRef = useRef(null)
  const wantListeningRef = useRef(false)

  const isSupported = !!SpeechRecognition

  useEffect(() => {
    if (!isSupported) return

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) {
          setFinalTranscript(result[0].transcript)
          setTranscript('')
        } else {
          setTranscript(result[0].transcript)
        }
      }
    }

    recognition.onend = () => {
      // Auto-restart if user hasn't explicitly turned it off
      if (wantListeningRef.current) {
        try {
          recognition.start()
        } catch (e) {
          wantListeningRef.current = false
          setIsListening(false)
        }
        return
      }
      setIsListening(false)
    }

    recognition.onerror = (event) => {
      if (event.error === 'aborted') return
      // no-speech is expected during silence, onend will auto-restart
      if (event.error === 'no-speech') return
      setError(event.error)
      wantListeningRef.current = false
      setIsListening(false)
    }

    recognitionRef.current = recognition

    return () => {
      wantListeningRef.current = false
      recognition.abort()
    }
  }, [isSupported])

  const toggleListening = useCallback(() => {
    const recognition = recognitionRef.current
    if (!recognition) return

    if (isListening) {
      wantListeningRef.current = false
      recognition.abort()
      setIsListening(false)
    } else {
      setTranscript('')
      setFinalTranscript('')
      setError(null)
      wantListeningRef.current = true
      recognition.start()
      setIsListening(true)
    }
  }, [isListening])

  const resetTranscript = useCallback(() => {
    setTranscript('')
    setFinalTranscript('')
    setError(null)
  }, [])

  return { isListening, transcript, finalTranscript, isSupported, error, toggleListening, resetTranscript }
}

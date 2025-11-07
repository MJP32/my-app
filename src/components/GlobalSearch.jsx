import { useState, useEffect, useRef } from 'react'
import { createSearchIndex, searchContent, groupSearchResults } from '../utils/searchIndex.js'

function GlobalSearch({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [groupedResults, setGroupedResults] = useState({ categories: [], subcategories: [], components: [] })
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [searchIndex, setSearchIndex] = useState([])
  
  const searchInputRef = useRef(null)
  const searchContainerRef = useRef(null)
  const resultsRefs = useRef([])

  // Initialize search index
  useEffect(() => {
    const index = createSearchIndex()
    setSearchIndex(index)
  }, [])

  // Focus search input when opened
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      // Multiple attempts to ensure focus works
      const focusInput = () => {
        if (searchInputRef.current) {
          searchInputRef.current.focus()
        }
      }

      // Immediate focus
      focusInput()

      // Backup focus attempts
      setTimeout(focusInput, 50)
      setTimeout(focusInput, 100)
      setTimeout(focusInput, 200)
    }
  }, [isOpen])

  // Handle search
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([])
      setGroupedResults({ categories: [], subcategories: [], components: [] })
      setFocusedIndex(-1)
      return
    }

    const searchResults = searchContent(query, searchIndex)
    setResults(searchResults)
    setGroupedResults(groupSearchResults(searchResults))
    setFocusedIndex(searchResults.length > 0 ? 0 : -1)
  }, [query, searchIndex])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      // Only handle specific navigation keys, let everything else pass through for typing
      if (['ArrowDown', 'ArrowUp', 'Escape', 'Enter'].includes(e.key)) {
        switch (e.key) {
          case 'Escape':
            e.preventDefault()
            e.stopPropagation() // Prevent event from reaching global handlers
            handleClose()
            break
          case 'ArrowDown':
            e.preventDefault()
            setFocusedIndex(prev =>
              prev < results.length - 1 ? prev + 1 : prev
            )
            break
          case 'ArrowUp':
            e.preventDefault()
            setFocusedIndex(prev => prev > 0 ? prev - 1 : prev)
            break
          case 'Enter':
            // Only navigate if a result is focused
            if (focusedIndex >= 0 && results[focusedIndex]) {
              e.preventDefault()
              handleResultSelect(results[focusedIndex])
            }
            // Otherwise let the input handle Enter normally
            break
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, focusedIndex])

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIndex >= 0 && resultsRefs.current[focusedIndex]) {
      resultsRefs.current[focusedIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }, [focusedIndex])

  const handleClose = () => {
    setQuery('')
    setResults([])
    setGroupedResults({ categories: [], subcategories: [], components: [] })
    setFocusedIndex(-1)
    onClose()
  }

  const handleResultSelect = (result) => {
    const navigation = result.navigateTo()
    onNavigate(navigation)
    handleClose()
  }

  const handleClear = () => {
    setQuery('')
    setResults([])
    setGroupedResults({ categories: [], subcategories: [], components: [] })
    setFocusedIndex(-1)
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999999,
          backdropFilter: 'blur(4px)'
        }}
        onClick={handleClose}
      />

      {/* Search Modal */}
      <div
        ref={searchContainerRef}
        style={{
          position: 'fixed',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '600px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          zIndex: 1000000,
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{ fontSize: '1.25rem', color: '#6b7280' }}>🔍</div>
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
            onKeyDown={(e) => {
              // Stop propagation for all typing keys to prevent global shortcuts
              // Navigation keys (arrows, escape, enter) are handled by the global listener
              if (!['ArrowDown', 'ArrowUp', 'Escape', 'Enter'].includes(e.key)) {
                e.stopPropagation()
              }
            }}
            placeholder="Search components, categories, topics..."
            style={{
              flex: 1,
              fontSize: '1.1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '6px',
              padding: '0.5rem',
              outline: 'none',
              color: '#1f2937',
              backgroundColor: 'white',
              width: '100%',
              minWidth: 0
            }}
            aria-label="Search application content"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          {query && (
            <button
              onClick={handleClear}
              style={{
                padding: '0.5rem',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#6b7280',
                cursor: 'pointer',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
          <div style={{
            fontSize: '0.75rem',
            color: '#9ca3af',
            padding: '0.25rem 0.5rem',
            backgroundColor: '#f3f4f6',
            borderRadius: '4px',
            fontFamily: 'monospace'
          }}>
            ESC
          </div>
        </div>

        {/* Search Results */}
        <div style={{
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          {query.trim().length === 0 ? (
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
              <div style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Search across all content
              </div>
              <div style={{ fontSize: '0.875rem' }}>
                Find components, categories, topics, and more...
              </div>
              <div style={{ fontSize: '0.75rem', marginTop: '1rem', color: '#9ca3af' }}>
                Try searching for "streams", "java", "design patterns", or "algorithms"
              </div>
            </div>
          ) : results.length === 0 ? (
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>😔</div>
              <div style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                No results found
              </div>
              <div style={{ fontSize: '0.875rem' }}>
                Try a different search term or check your spelling
              </div>
            </div>
          ) : (
            <div style={{ padding: '0.5rem' }}>
              {results.map((result, index) => (
                <div
                  key={result.id}
                  ref={el => resultsRefs.current[index] = el}
                  onClick={() => handleResultSelect(result)}
                  style={{
                    padding: '0.75rem 1rem',
                    margin: '0.25rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: focusedIndex === index ? '#f3f4f6' : 'transparent',
                    border: focusedIndex === index ? '2px solid #3b82f6' : '2px solid transparent',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <div style={{
                      fontSize: '1.25rem',
                      width: '2rem',
                      textAlign: 'center'
                    }}>
                      {result.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: '0.25rem'
                      }}
                        dangerouslySetInnerHTML={{ __html: result.highlightedTitle }}
                      />
                      <div style={{
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        marginBottom: '0.25rem'
                      }}
                        dangerouslySetInnerHTML={{ __html: result.highlightedDescription }}
                      />
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#9ca3af',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{
                          padding: '0.125rem 0.375rem',
                          backgroundColor: result.color + '20',
                          color: result.color,
                          borderRadius: '4px',
                          fontSize: '0.625rem',
                          fontWeight: '600',
                          textTransform: 'uppercase'
                        }}>
                          {result.type}
                        </span>
                        <span>{result.breadcrumb}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div style={{
            padding: '0.75rem 1.5rem',
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#f9fafb',
            fontSize: '0.75rem',
            color: '#6b7280',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>Use ↑↓ to navigate, Enter to select</span>
            <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
    </>
  )
}

export default GlobalSearch

import { useState, useRef, useEffect } from 'react'

function DrawingCanvas({ isOpen, onClose, problemId, existingDrawing }) {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')
  const [lineWidth, setLineWidth] = useState(3)
  const [context, setContext] = useState(null)
  const [tool, setTool] = useState('pen') // 'pen' or 'eraser'

  const colors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
    '#FFC0CB', '#A52A2A', '#808080', '#90EE90', '#FFD700'
  ]

  const lineWidths = [1, 2, 3, 5, 8, 12, 16, 20]

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Set canvas size
    canvas.width = 800
    canvas.height = 600

    // Set white background
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Load existing drawing if available
    if (existingDrawing) {
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0)
      }
      img.src = existingDrawing
    }

    setContext(ctx)
  }, [isOpen, existingDrawing])

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        e.stopPropagation() // Prevent event from reaching global handlers
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const startDrawing = (e) => {
    if (!context) return
    setIsDrawing(true)
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    context.beginPath()
    context.moveTo(x, y)
    // Use white color for eraser, otherwise use selected color
    context.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color
    context.lineWidth = tool === 'eraser' ? lineWidth * 2 : lineWidth // Eraser is wider
    context.lineCap = 'round'
    context.lineJoin = 'round'
  }

  const draw = (e) => {
    if (!isDrawing || !context) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    context.lineTo(x, y)
    context.stroke()
  }

  const stopDrawing = () => {
    if (!context) return
    setIsDrawing(false)
    context.closePath()
  }

  const clearCanvas = () => {
    if (!context) return
    context.fillStyle = '#FFFFFF'
    context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
  }

  const saveDrawing = () => {
    if (!canvasRef.current) return

    const dataUrl = canvasRef.current.toDataURL('image/png')
    localStorage.setItem(`drawing-${problemId}`, dataUrl)
    onClose()
  }

  const deleteDrawing = () => {
    localStorage.removeItem(`drawing-${problemId}`)
    clearCanvas()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '1.5rem',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <h2 style={{ margin: 0, color: '#1e293b' }}>🎨 Draw Your Solution</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#64748b',
              padding: '0.25rem 0.5rem'
            }}
          >
            ✕
          </button>
        </div>

        {/* Tools Section */}
        <div style={{
          marginBottom: '1rem',
          padding: '1rem',
          backgroundColor: '#f8fafc',
          borderRadius: '8px'
        }}>
          {/* Color Picker */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#475569'
            }}>
              Color:
            </label>
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap'
            }}>
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: c,
                    border: color === c ? '3px solid #3b82f6' : '2px solid #cbd5e1',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: color === c ? '0 0 0 3px rgba(59, 130, 246, 0.3)' : 'none'
                  }}
                  title={c}
                />
              ))}
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{
                  width: '36px',
                  height: '36px',
                  border: '2px solid #cbd5e1',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                title="Custom color"
              />
            </div>
          </div>

          {/* Tool Selector (Pen/Eraser) */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#475569'
            }}>
              Tool:
            </label>
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => setTool('pen')}
                style={{
                  padding: '0.75rem 1.25rem',
                  backgroundColor: tool === 'pen' ? '#3b82f6' : 'white',
                  color: tool === 'pen' ? 'white' : '#475569',
                  border: '2px solid ' + (tool === 'pen' ? '#3b82f6' : '#cbd5e1'),
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                ✏️ Pen
              </button>
              <button
                onClick={() => setTool('eraser')}
                style={{
                  padding: '0.75rem 1.25rem',
                  backgroundColor: tool === 'eraser' ? '#3b82f6' : 'white',
                  color: tool === 'eraser' ? 'white' : '#475569',
                  border: '2px solid ' + (tool === 'eraser' ? '#3b82f6' : '#cbd5e1'),
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                🧹 Eraser
              </button>
            </div>
          </div>

          {/* Line Width Selector */}
          <div>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#475569'
            }}>
              {tool === 'eraser' ? 'Eraser' : 'Pencil'} Width:
            </label>
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              {lineWidths.map((width) => (
                <button
                  key={width}
                  onClick={() => setLineWidth(width)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: lineWidth === width ? '#3b82f6' : 'white',
                    color: lineWidth === width ? 'white' : '#475569',
                    border: '2px solid ' + (lineWidth === width ? '#3b82f6' : '#cbd5e1'),
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.2s',
                    fontSize: '0.875rem'
                  }}
                >
                  {width}px
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          style={{
            border: '2px solid #cbd5e1',
            borderRadius: '8px',
            cursor: tool === 'eraser' ? 'pointer' : 'crosshair',
            backgroundColor: 'white',
            display: 'block',
            width: '100%',
            height: 'auto',
            maxHeight: '600px'
          }}
        />

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          marginTop: '1rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={saveDrawing}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
          >
            💾 Save Drawing
          </button>

          <button
            onClick={clearCanvas}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#d97706'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f59e0b'}
          >
            🗑️ Clear Canvas
          </button>

          {existingDrawing && (
            <button
              onClick={deleteDrawing}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
            >
              🗑️ Delete Drawing
            </button>
          )}

          <button
            onClick={onClose}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.2s',
              marginLeft: 'auto'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
          >
            Cancel
          </button>
        </div>

        <p style={{
          marginTop: '1rem',
          fontSize: '0.875rem',
          color: '#64748b',
          textAlign: 'center'
        }}>
          💡 Tip: Draw diagrams, visualize data structures, or sketch your solution approach
        </p>
      </div>
    </div>
  )
}

export default DrawingCanvas

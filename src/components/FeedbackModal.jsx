import { useState, useEffect } from 'react'

export default function FeedbackModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation() // Prevent event from reaching global handlers
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Create mailto link with pre-filled content
      const subject = `Feedback: ${formData.category.charAt(0).toUpperCase() + formData.category.slice(1)}`
      const body = `
Name: ${formData.name}
Email: ${formData.email}
Category: ${formData.category}

Message:
${formData.message}
      `.trim()

      const mailtoLink = `mailto:admin@eggyeggs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

      // Open user's email client
      window.location.href = mailtoLink

      setSubmitStatus('success')

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          category: 'general',
          message: ''
        })
        setSubmitStatus(null)
        onClose()
      }, 2000)
    } catch (error) {
      console.error('Error submitting feedback:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000000,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '2px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: '800',
              color: '#1f2937',
              margin: 0,
              marginBottom: '0.25rem'
            }}>
              📧 Send Feedback
            </h2>
            <p style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              margin: 0
            }}>
              We'd love to hear from you! Your feedback helps us improve.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '0.5rem',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f3f4f6'
              e.target.style.color = '#1f2937'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent'
              e.target.style.color = '#6b7280'
            }}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
          {/* Name Field */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.2s',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          {/* Email Field */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Email <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.2s',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          {/* Category Field */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Category <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.2s',
                outline: 'none',
                backgroundColor: 'white',
                cursor: 'pointer',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            >
              <option value="general">General Feedback</option>
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="content">Content Suggestion</option>
              <option value="question">Question</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Message Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Message <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell us what's on your mind..."
              rows={6}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.2s',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <div style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#d1fae5',
              border: '2px solid #10b981',
              borderRadius: '8px',
              marginBottom: '1rem',
              fontSize: '0.875rem',
              color: '#065f46',
              fontWeight: '600'
            }}>
              ✅ Opening your email client... Thank you for your feedback!
            </div>
          )}

          {submitStatus === 'error' && (
            <div style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#fee2e2',
              border: '2px solid #ef4444',
              borderRadius: '8px',
              marginBottom: '1rem',
              fontSize: '0.875rem',
              color: '#991b1b',
              fontWeight: '600'
            }}>
              ❌ Something went wrong. Please try again.
            </div>
          )}

          {/* Submit Button */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                flex: 1,
                padding: '0.875rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: isSubmitting ? '#9ca3af' : '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: isSubmitting ? 0.6 : 1
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.target.style.backgroundColor = '#7c3aed'
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.target.style.backgroundColor = '#8b5cf6'
                }
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send Feedback'}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.875rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e5e7eb'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f3f4f6'
              }}
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Footer Note */}
        <div style={{
          padding: '1rem 1.5rem',
          backgroundColor: '#f9fafb',
          borderTop: '2px solid #e5e7eb',
          borderBottomLeftRadius: '16px',
          borderBottomRightRadius: '16px'
        }}>
          <p style={{
            fontSize: '0.75rem',
            color: '#6b7280',
            margin: 0,
            textAlign: 'center'
          }}>
            Your feedback will be sent to <strong>admin@eggyeggs.com</strong>. We typically respond within 24-48 hours.
          </p>
        </div>
      </div>
    </div>
  )
}

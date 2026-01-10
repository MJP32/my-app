import React, { useState, useEffect, useRef } from 'react';
import { checkAIStatus, sendChatMessage } from '../../services/aiService';

function AIChatPanel({ colors, context, problemTitle }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState({ configured: false, checked: false });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    checkAIStatus().then(setAiStatus);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const data = await sendChatMessage([...messages, userMessage], context, 'general');

    if (data.success) {
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } else {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Error: ${data.error || 'Failed to get response'}`,
        isError: true
      }]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      {/* Status indicator */}
      {!aiStatus.configured && aiStatus.checked && (
        <div style={{
          padding: '0.75rem',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '8px',
          fontSize: '0.8rem',
          color: '#fbbf24',
          marginBottom: '1rem'
        }}>
          <strong>AI Not Configured</strong>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', opacity: 0.8 }}>
            Set ANTHROPIC_API_KEY and restart the server.
          </p>
        </div>
      )}

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        marginBottom: '1rem'
      }}>
        {messages.length === 0 && aiStatus.configured && (
          <div style={{
            textAlign: 'center',
            color: colors.textMuted,
            padding: '2rem 1rem',
            fontSize: '0.875rem'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💬</div>
            <p>Ask questions about "{problemTitle}"</p>
            <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
              Get explanations, discuss approaches, or clarify concepts.
            </p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              padding: '0.75rem 1rem',
              borderRadius: msg.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
              backgroundColor: msg.role === 'user'
                ? '#3b82f6'
                : msg.isError
                ? 'rgba(239, 68, 68, 0.1)'
                : colors.bgTertiary || colors.bgSecondary,
              color: msg.role === 'user'
                ? 'white'
                : msg.isError
                ? '#f87171'
                : colors.textPrimary,
              fontSize: '0.875rem',
              lineHeight: '1.5',
              whiteSpace: 'pre-wrap'
            }}
          >
            {msg.content}
          </div>
        ))}

        {isLoading && (
          <div style={{
            alignSelf: 'flex-start',
            padding: '0.75rem 1rem',
            borderRadius: '12px 12px 12px 4px',
            backgroundColor: colors.bgTertiary || colors.bgSecondary,
            color: colors.textMuted,
            fontSize: '0.875rem'
          }}>
            <span style={{ animation: 'pulse 1.5s infinite' }}>Thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        display: 'flex',
        gap: '0.5rem'
      }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about this problem..."
          disabled={!aiStatus.configured || isLoading}
          style={{
            flex: 1,
            padding: '0.75rem',
            fontSize: '0.875rem',
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
            backgroundColor: colors.bgPrimary,
            color: colors.textPrimary,
            resize: 'none',
            minHeight: '44px',
            maxHeight: '100px',
            fontFamily: 'inherit'
          }}
          rows={1}
        />
        <button
          onClick={handleSendMessage}
          disabled={!input.trim() || isLoading || !aiStatus.configured}
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: (!input.trim() || isLoading || !aiStatus.configured) ? colors.bgTertiary : '#3b82f6',
            color: (!input.trim() || isLoading || !aiStatus.configured) ? colors.textMuted : 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: (!input.trim() || isLoading || !aiStatus.configured) ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            fontSize: '0.875rem'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default AIChatPanel;

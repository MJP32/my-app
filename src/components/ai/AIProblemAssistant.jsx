import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import AIHintsPanel from './AIHintsPanel';
import AICodeReviewPanel from './AICodeReviewPanel';
import AIChatPanel from './AIChatPanel';

function AIProblemAssistant({
  problemTitle,
  problemDescription,
  difficulty,
  userCode,
  language,
  onClose
}) {
  const { isDark, colors } = useTheme();
  const [activeTab, setActiveTab] = useState('hints');

  const tabs = [
    { id: 'hints', label: 'Hints', icon: '💡' },
    { id: 'review', label: 'Review', icon: '🔍' },
    { id: 'chat', label: 'Chat', icon: '💬' }
  ];

  const context = `Problem: ${problemTitle}
Difficulty: ${difficulty}

Description:
${problemDescription}

Current Code (${language}):
${userCode || '// No code written yet'}`;

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: 0,
        width: '400px',
        height: '100vh',
        backgroundColor: colors.bgSecondary,
        borderLeft: `1px solid ${colors.border}`,
        boxShadow: isDark
          ? '-4px 0 20px rgba(0, 0, 0, 0.5)'
          : '-4px 0 20px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideInRight 0.3s ease'
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '1rem',
          borderBottom: `1px solid ${colors.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: colors.bgTertiary || colors.bgPrimary
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.25rem' }}>🤖</span>
          <span style={{ fontWeight: '600', color: colors.textPrimary, fontSize: '0.95rem' }}>
            AI Assistant
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: colors.textMuted,
            cursor: 'pointer',
            fontSize: '1.5rem',
            padding: '0.25rem',
            lineHeight: 1,
            borderRadius: '4px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.bgTertiary;
            e.currentTarget.style.color = colors.textPrimary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = colors.textMuted;
          }}
        >
          ×
        </button>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          borderBottom: `1px solid ${colors.border}`
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '0.75rem',
              border: 'none',
              borderBottom: `2px solid ${activeTab === tab.id ? '#3b82f6' : 'transparent'}`,
              backgroundColor: 'transparent',
              color: activeTab === tab.id ? colors.textPrimary : colors.textMuted,
              fontWeight: '600',
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.375rem',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.backgroundColor = colors.bgTertiary;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: '1rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {activeTab === 'hints' && (
          <AIHintsPanel
            colors={colors}
            problemDescription={problemDescription}
            userCode={userCode}
            language={language}
          />
        )}

        {activeTab === 'review' && (
          <AICodeReviewPanel
            colors={colors}
            userCode={userCode}
            language={language}
            problemDescription={problemDescription}
          />
        )}

        {activeTab === 'chat' && (
          <AIChatPanel
            colors={colors}
            context={context}
            problemTitle={problemTitle}
          />
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '0.75rem 1rem',
          borderTop: `1px solid ${colors.border}`,
          fontSize: '0.7rem',
          color: colors.textMuted,
          textAlign: 'center'
        }}
      >
        AI responses may not always be accurate. Review suggestions carefully.
      </div>

      {/* Slide-in animation */}
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default AIProblemAssistant;

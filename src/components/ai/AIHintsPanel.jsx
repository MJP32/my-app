import React, { useState, useEffect } from 'react';
import { checkAIStatus, getHint } from '../../services/aiService';

function AIHintsPanel({ colors, problemDescription, userCode, language }) {
  const [hints, setHints] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState({ configured: false, checked: false });

  useEffect(() => {
    checkAIStatus().then(setAiStatus);
  }, []);

  const levelLabels = [
    { level: 1, name: 'Conceptual', description: 'General direction', color: '#10b981' },
    { level: 2, name: 'Approach', description: 'Algorithm outline', color: '#f59e0b' },
    { level: 3, name: 'Detailed', description: 'Step-by-step guide', color: '#ef4444' }
  ];

  const handleGetHint = async () => {
    if (isLoading || currentLevel >= 3) return;

    const nextLevel = currentLevel + 1;
    setIsLoading(true);

    const data = await getHint(problemDescription, userCode, language, nextLevel);

    if (data.success) {
      setHints(prev => [...prev, {
        level: nextLevel,
        content: data.message,
        timestamp: new Date()
      }]);
      setCurrentLevel(nextLevel);
    } else {
      setHints(prev => [...prev, {
        level: nextLevel,
        content: `Error: ${data.error || 'Failed to get hint'}`,
        isError: true,
        timestamp: new Date()
      }]);
    }

    setIsLoading(false);
  };

  const getNextLevelInfo = () => {
    if (currentLevel >= 3) return null;
    return levelLabels[currentLevel];
  };

  const nextLevel = getNextLevelInfo();

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

      {/* Progress indicator */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1rem'
      }}>
        {levelLabels.map((level) => (
          <div
            key={level.level}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '6px',
              backgroundColor: currentLevel >= level.level ? level.color + '20' : colors.bgTertiary || colors.bgSecondary,
              border: `2px solid ${currentLevel >= level.level ? level.color : 'transparent'}`,
              textAlign: 'center'
            }}
          >
            <div style={{
              fontSize: '0.7rem',
              fontWeight: '600',
              color: currentLevel >= level.level ? level.color : colors.textMuted
            }}>
              {level.name}
            </div>
          </div>
        ))}
      </div>

      {/* Hints list */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        marginBottom: '1rem'
      }}>
        {hints.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: colors.textMuted,
            padding: '2rem 1rem',
            fontSize: '0.875rem'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💡</div>
            <p>Need help getting started?</p>
            <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
              Get progressive hints from conceptual to detailed guidance.
            </p>
          </div>
        )}

        {hints.map((hint, idx) => (
          <div
            key={idx}
            style={{
              padding: '1rem',
              borderRadius: '8px',
              backgroundColor: hint.isError ? 'rgba(239, 68, 68, 0.1)' : colors.bgTertiary || colors.bgSecondary,
              border: `1px solid ${hint.isError ? '#ef4444' : levelLabels[hint.level - 1].color}40`
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <span style={{
                padding: '0.125rem 0.5rem',
                borderRadius: '4px',
                backgroundColor: levelLabels[hint.level - 1].color + '20',
                color: levelLabels[hint.level - 1].color,
                fontSize: '0.7rem',
                fontWeight: '600'
              }}>
                Level {hint.level}: {levelLabels[hint.level - 1].name}
              </span>
            </div>
            <div style={{
              fontSize: '0.875rem',
              lineHeight: '1.6',
              color: hint.isError ? '#f87171' : colors.textPrimary,
              whiteSpace: 'pre-wrap'
            }}>
              {hint.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div style={{
            padding: '1rem',
            borderRadius: '8px',
            backgroundColor: colors.bgTertiary || colors.bgSecondary,
            textAlign: 'center',
            color: colors.textMuted,
            fontSize: '0.875rem'
          }}>
            Generating hint...
          </div>
        )}
      </div>

      {/* Get hint button */}
      {nextLevel && (
        <button
          onClick={handleGetHint}
          disabled={isLoading || !aiStatus.configured}
          style={{
            padding: '0.875rem',
            backgroundColor: isLoading || !aiStatus.configured ? colors.bgTertiary : nextLevel.color,
            color: isLoading || !aiStatus.configured ? colors.textMuted : 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isLoading || !aiStatus.configured ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          {isLoading ? (
            'Getting Hint...'
          ) : (
            <>
              💡 Get {nextLevel.name} Hint
              <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                ({nextLevel.description})
              </span>
            </>
          )}
        </button>
      )}

      {currentLevel >= 3 && (
        <div style={{
          padding: '0.875rem',
          backgroundColor: colors.bgTertiary || colors.bgSecondary,
          borderRadius: '8px',
          textAlign: 'center',
          color: colors.textMuted,
          fontSize: '0.875rem'
        }}>
          All hints revealed! Try implementing the solution now.
        </div>
      )}
    </div>
  );
}

export default AIHintsPanel;

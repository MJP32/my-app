import React, { useState, useEffect } from 'react';
import { checkAIStatus, analyzeCode, getOptimizations } from '../../services/aiService';

function AICodeReviewPanel({ colors, userCode, language, problemDescription }) {
  const [analysis, setAnalysis] = useState(null);
  const [optimizations, setOptimizations] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [aiStatus, setAiStatus] = useState({ configured: false, checked: false });

  useEffect(() => {
    checkAIStatus().then(setAiStatus);
  }, []);

  const handleAnalyze = async () => {
    if (isAnalyzing || !userCode.trim()) return;

    setIsAnalyzing(true);
    setAnalysis(null);
    setOptimizations(null);

    const data = await analyzeCode(userCode, language, problemDescription);

    if (data.success) {
      setAnalysis(data.analysis);
    } else {
      setAnalysis({ error: data.error || 'Failed to analyze code' });
    }

    setIsAnalyzing(false);
  };

  const handleGetOptimizations = async () => {
    if (isOptimizing || !userCode.trim()) return;

    setIsOptimizing(true);

    const data = await getOptimizations(userCode, language, problemDescription);

    if (data.success) {
      setOptimizations(data.optimizations);
    } else {
      setOptimizations({ error: data.error || 'Failed to get optimizations' });
    }

    setIsOptimizing(false);
  };

  const getScoreColor = (score) => {
    if (score >= 8) return '#10b981';
    if (score >= 6) return '#f59e0b';
    return '#ef4444';
  };

  const ScoreCircle = ({ score, label }) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.25rem'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: getScoreColor(score) + '20',
        color: getScoreColor(score),
        fontSize: '1.25rem',
        fontWeight: '700',
        border: `2px solid ${getScoreColor(score)}`
      }}>
        {score}
      </div>
      <span style={{
        fontSize: '0.7rem',
        color: colors.textMuted
      }}>
        {label}
      </span>
    </div>
  );

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

      {/* Results area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        marginBottom: '1rem'
      }}>
        {!analysis && !isAnalyzing && (
          <div style={{
            textAlign: 'center',
            color: colors.textMuted,
            padding: '2rem 1rem',
            fontSize: '0.875rem'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
            <p>Get AI feedback on your code</p>
            <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
              Analyze correctness, efficiency, and code quality.
            </p>
          </div>
        )}

        {isAnalyzing && (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: colors.textMuted
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏳</div>
            <p>Analyzing your code...</p>
          </div>
        )}

        {analysis && !analysis.error && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {/* Score summary */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              padding: '1rem',
              backgroundColor: colors.bgTertiary || colors.bgSecondary,
              borderRadius: '8px'
            }}>
              <ScoreCircle score={analysis.overall || analysis.correctness || 7} label="Overall" />
              <ScoreCircle score={analysis.correctness || 7} label="Correct" />
              <ScoreCircle score={analysis.efficiency || 7} label="Efficient" />
              <ScoreCircle score={analysis.quality || analysis.codeQuality || 7} label="Quality" />
            </div>

            {/* Feedback sections */}
            {analysis.feedback && (
              <div style={{
                padding: '1rem',
                backgroundColor: colors.bgTertiary || colors.bgSecondary,
                borderRadius: '8px'
              }}>
                <h4 style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '0.875rem',
                  color: colors.textPrimary
                }}>
                  Feedback
                </h4>
                <p style={{
                  margin: 0,
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  color: colors.textSecondary,
                  whiteSpace: 'pre-wrap'
                }}>
                  {analysis.feedback}
                </p>
              </div>
            )}

            {/* Suggestions */}
            {analysis.suggestions && analysis.suggestions.length > 0 && (
              <div style={{
                padding: '1rem',
                backgroundColor: colors.bgTertiary || colors.bgSecondary,
                borderRadius: '8px'
              }}>
                <h4 style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '0.875rem',
                  color: colors.textPrimary
                }}>
                  Suggestions
                </h4>
                <ul style={{
                  margin: 0,
                  paddingLeft: '1.25rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  color: colors.textSecondary
                }}>
                  {analysis.suggestions.map((suggestion, idx) => (
                    <li key={idx} style={{ marginBottom: '0.25rem' }}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Edge cases */}
            {analysis.edgeCases && (
              <div style={{
                padding: '1rem',
                backgroundColor: colors.bgTertiary || colors.bgSecondary,
                borderRadius: '8px'
              }}>
                <h4 style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '0.875rem',
                  color: colors.textPrimary
                }}>
                  Edge Cases
                </h4>
                <p style={{
                  margin: 0,
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  color: colors.textSecondary,
                  whiteSpace: 'pre-wrap'
                }}>
                  {typeof analysis.edgeCases === 'string'
                    ? analysis.edgeCases
                    : analysis.edgeCases.join(', ')}
                </p>
              </div>
            )}

            {/* Optimizations section */}
            {optimizations && !optimizations.error && (
              <div style={{
                padding: '1rem',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '8px'
              }}>
                <h4 style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '0.875rem',
                  color: '#818cf8'
                }}>
                  Optimization Tips
                </h4>
                <p style={{
                  margin: 0,
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  color: colors.textSecondary,
                  whiteSpace: 'pre-wrap'
                }}>
                  {typeof optimizations === 'string'
                    ? optimizations
                    : optimizations.tips || optimizations.suggestions || JSON.stringify(optimizations, null, 2)}
                </p>
              </div>
            )}
          </div>
        )}

        {analysis && analysis.error && (
          <div style={{
            padding: '1rem',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            color: '#f87171',
            fontSize: '0.875rem'
          }}>
            Error: {analysis.error}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !aiStatus.configured || !userCode.trim()}
          style={{
            padding: '0.875rem',
            backgroundColor: (isAnalyzing || !aiStatus.configured || !userCode.trim())
              ? colors.bgTertiary
              : '#3b82f6',
            color: (isAnalyzing || !aiStatus.configured || !userCode.trim())
              ? colors.textMuted
              : 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: (isAnalyzing || !aiStatus.configured || !userCode.trim())
              ? 'not-allowed'
              : 'pointer',
            fontWeight: '600',
            fontSize: '0.875rem'
          }}
        >
          {isAnalyzing ? 'Analyzing...' : '🔍 Analyze My Code'}
        </button>

        {analysis && !analysis.error && (
          <button
            onClick={handleGetOptimizations}
            disabled={isOptimizing || !aiStatus.configured}
            style={{
              padding: '0.75rem',
              backgroundColor: isOptimizing ? colors.bgTertiary : 'transparent',
              color: isOptimizing ? colors.textMuted : '#6366f1',
              border: `1px solid ${isOptimizing ? colors.border : '#6366f1'}`,
              borderRadius: '8px',
              cursor: isOptimizing ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '0.875rem'
            }}
          >
            {isOptimizing ? 'Getting tips...' : '✨ Get Optimization Tips'}
          </button>
        )}
      </div>
    </div>
  );
}

export default AICodeReviewPanel;

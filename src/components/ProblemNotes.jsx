import { useState, useEffect, useCallback } from 'react';
import { getNote, saveNote } from '../services/notesService';
import { useTheme } from '../contexts/ThemeContext';

/**
 * ProblemNotes - Expandable notes section for each problem
 *
 * Props:
 * - problemId: Unique identifier for the problem
 * - userId: Current user's ID (or null for anonymous)
 */
const ProblemNotes = ({ problemId, userId }) => {
  const { colors } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [hasNote, setHasNote] = useState(false);

  // Load existing note on mount
  useEffect(() => {
    const existingNote = getNote(userId, problemId);
    if (existingNote && existingNote.text) {
      setNoteText(existingNote.text);
      setHasNote(true);
      setLastSaved(existingNote.updatedAt);
    }
  }, [userId, problemId]);

  // Auto-save with debounce
  const handleSave = useCallback(() => {
    if (noteText !== getNote(userId, problemId)?.text) {
      setIsSaving(true);
      const success = saveNote(userId, problemId, noteText);
      if (success) {
        setLastSaved(new Date().toISOString());
        setHasNote(noteText.trim().length > 0);
      }
      setTimeout(() => setIsSaving(false), 500);
    }
  }, [userId, problemId, noteText]);

  // Save on blur
  const handleBlur = () => {
    handleSave();
  };

  // Format last saved time
  const formatLastSaved = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div style={{
      marginTop: '1rem',
      borderRadius: '8px',
      border: `1px solid ${colors.border}`,
      overflow: 'hidden',
      backgroundColor: colors.bgSecondary
    }}>
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: colors.textPrimary
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1rem' }}>
            {hasNote ? '📝' : '📋'}
          </span>
          <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>
            My Notes
          </span>
          {hasNote && !isExpanded && (
            <span style={{
              fontSize: '0.75rem',
              color: colors.textSecondary,
              backgroundColor: colors.bgTertiary,
              padding: '0.125rem 0.5rem',
              borderRadius: '4px'
            }}>
              {noteText.length} chars
            </span>
          )}
        </div>
        <span style={{
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }}>
          ▼
        </span>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div style={{ padding: '0 1rem 1rem 1rem' }}>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            onBlur={handleBlur}
            placeholder="Add your notes here... (auto-saves when you click away)"
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '0.75rem',
              borderRadius: '6px',
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.bgPrimary,
              color: colors.textPrimary,
              fontSize: '0.875rem',
              lineHeight: '1.5',
              resize: 'vertical',
              fontFamily: 'inherit',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlurCapture={(e) => {
              e.target.style.borderColor = colors.border;
              e.target.style.boxShadow = 'none';
            }}
          />

          {/* Footer with status */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '0.5rem',
            fontSize: '0.75rem',
            color: colors.textSecondary
          }}>
            <span>
              {noteText.length} characters
            </span>
            <span>
              {isSaving ? (
                <span style={{ color: '#3b82f6' }}>Saving...</span>
              ) : lastSaved ? (
                <span>Saved {formatLastSaved(lastSaved)}</span>
              ) : null}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemNotes;

// Notes Service - Save and load personal notes for problems

const NOTES_KEY_PREFIX = 'problem_notes_';

/**
 * Get the storage key for a user's notes
 */
const getStorageKey = (userId) => {
  return `${NOTES_KEY_PREFIX}${userId || 'anonymous'}`;
};

/**
 * Get all notes for a user
 */
export const getAllNotes = (userId) => {
  try {
    const key = getStorageKey(userId);
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error loading notes:', error);
    return {};
  }
};

/**
 * Get note for a specific problem
 */
export const getNote = (userId, problemId) => {
  const notes = getAllNotes(userId);
  return notes[problemId] || '';
};

/**
 * Save note for a specific problem
 */
export const saveNote = (userId, problemId, noteText) => {
  try {
    const key = getStorageKey(userId);
    const notes = getAllNotes(userId);

    if (noteText.trim()) {
      notes[problemId] = {
        text: noteText,
        updatedAt: new Date().toISOString()
      };
    } else {
      // Remove empty notes
      delete notes[problemId];
    }

    localStorage.setItem(key, JSON.stringify(notes));

    // Dispatch event for any listeners
    window.dispatchEvent(new CustomEvent('notesUpdate', {
      detail: { problemId, note: notes[problemId] }
    }));

    return true;
  } catch (error) {
    console.error('Error saving note:', error);
    return false;
  }
};

/**
 * Delete note for a specific problem
 */
export const deleteNote = (userId, problemId) => {
  return saveNote(userId, problemId, '');
};

/**
 * Get count of notes
 */
export const getNotesCount = (userId) => {
  const notes = getAllNotes(userId);
  return Object.keys(notes).length;
};

/**
 * Get all problem IDs that have notes
 */
export const getProblemsWithNotes = (userId) => {
  const notes = getAllNotes(userId);
  return Object.keys(notes);
};

/**
 * Migrate notes from anonymous to authenticated user
 */
export const migrateNotes = (fromUserId, toUserId) => {
  try {
    const anonymousNotes = getAllNotes(fromUserId);
    const userNotes = getAllNotes(toUserId);

    // Merge notes, preferring user's existing notes
    const mergedNotes = { ...anonymousNotes, ...userNotes };

    const key = getStorageKey(toUserId);
    localStorage.setItem(key, JSON.stringify(mergedNotes));

    // Clear anonymous notes
    localStorage.removeItem(getStorageKey(fromUserId));

    return true;
  } catch (error) {
    console.error('Error migrating notes:', error);
    return false;
  }
};

/**
 * Export all notes as JSON
 */
export const exportNotes = (userId) => {
  const notes = getAllNotes(userId);
  return JSON.stringify(notes, null, 2);
};

/**
 * Search notes for a keyword
 */
export const searchNotes = (userId, keyword) => {
  const notes = getAllNotes(userId);
  const results = [];
  const searchTerm = keyword.toLowerCase();

  for (const [problemId, note] of Object.entries(notes)) {
    if (note.text && note.text.toLowerCase().includes(searchTerm)) {
      results.push({ problemId, ...note });
    }
  }

  return results;
};

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Check AI service status
 */
export async function checkAIStatus() {
  try {
    const res = await fetch(`${API_BASE_URL}/ai/status`);
    const data = await res.json();
    return { ...data, checked: true };
  } catch (error) {
    return { configured: false, checked: true, error: error.message };
  }
}

/**
 * Get a hint for a problem
 * @param {string} problemDescription - The problem description
 * @param {string} userCode - Current user code
 * @param {string} language - Programming language (java/python)
 * @param {number} hintLevel - Hint level (1=conceptual, 2=algorithmic, 3=detailed)
 */
export async function getHint(problemDescription, userCode, language, hintLevel = 1) {
  const levelDescriptions = {
    1: 'Give a conceptual hint about the approach without revealing the algorithm. Just point them in the right direction with data structures or techniques to consider.',
    2: 'Give an algorithmic hint explaining the general approach and key steps, but without providing actual code.',
    3: 'Give a detailed hint with step-by-step guidance and pseudocode, but still let them write the actual implementation.'
  };

  const context = `Problem: ${problemDescription}

Current Code (${language}):
${userCode || '// No code written yet'}

Hint Level: ${hintLevel}/3 - ${levelDescriptions[hintLevel]}`;

  const message = hintLevel === 1
    ? 'I need a hint to get started with this problem.'
    : hintLevel === 2
    ? 'I need more help. Can you explain the approach?'
    : 'I\'m still stuck. Can you give me detailed guidance?';

  return sendChatMessage([{ role: 'user', content: message }], context, 'hint');
}

/**
 * Analyze code for review
 * @param {string} code - Code to analyze
 * @param {string} language - Programming language
 * @param {string} problemDescription - Problem description for context
 */
export async function analyzeCode(code, language, problemDescription) {
  try {
    const res = await fetch(`${API_BASE_URL}/ai/analyze-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language, problemDescription })
    });
    return await res.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Get optimization suggestions
 * @param {string} code - Code to optimize
 * @param {string} language - Programming language
 * @param {string} problemDescription - Problem description
 */
export async function getOptimizations(code, language, problemDescription) {
  try {
    const res = await fetch(`${API_BASE_URL}/ai/optimize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language, problemDescription })
    });
    return await res.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Send a chat message to AI
 * @param {Array} messages - Message history
 * @param {string} context - Problem context
 * @param {string} mode - Chat mode (hint, code-review, general)
 */
export async function sendChatMessage(messages, context, mode = 'general') {
  try {
    const res = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, context, mode })
    });
    return await res.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Get follow-up questions after solving
 * @param {string} problemTitle - Problem title
 * @param {string} problemDescription - Problem description
 * @param {string} code - User's solution
 */
export async function getFollowUpQuestions(problemTitle, problemDescription, code) {
  try {
    const res = await fetch(`${API_BASE_URL}/ai/follow-up-questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ problemTitle, problemDescription, code })
    });
    return await res.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export default {
  checkAIStatus,
  getHint,
  analyzeCode,
  getOptimizations,
  sendChatMessage,
  getFollowUpQuestions
};

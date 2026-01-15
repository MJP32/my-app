// API Key Service - Manage AI provider API keys

const API_KEYS_STORAGE_KEY = 'ai_api_keys';

/**
 * Get all stored API keys
 */
export const getApiKeys = () => {
  try {
    const stored = localStorage.getItem(API_KEYS_STORAGE_KEY);
    if (!stored) {
      return {
        anthropic: '',
        openai: '',
        gemini: ''
      };
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error getting API keys:', error);
    return {
      anthropic: '',
      openai: '',
      gemini: ''
    };
  }
};

/**
 * Save API keys
 */
export const saveApiKeys = (keys) => {
  try {
    localStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify(keys));
    window.dispatchEvent(new CustomEvent('apiKeysUpdated', { detail: keys }));
    return true;
  } catch (error) {
    console.error('Error saving API keys:', error);
    return false;
  }
};

/**
 * Get a specific API key
 */
export const getApiKey = (provider) => {
  const keys = getApiKeys();
  return keys[provider] || '';
};

/**
 * Save a specific API key
 */
export const saveApiKey = (provider, key) => {
  const keys = getApiKeys();
  keys[provider] = key;
  return saveApiKeys(keys);
};

/**
 * Clear all API keys
 */
export const clearApiKeys = () => {
  try {
    localStorage.removeItem(API_KEYS_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('apiKeysUpdated', { detail: {} }));
    return true;
  } catch (error) {
    console.error('Error clearing API keys:', error);
    return false;
  }
};

/**
 * Check if any API key is configured
 */
export const hasAnyApiKey = () => {
  const keys = getApiKeys();
  return !!(keys.anthropic || keys.openai || keys.gemini);
};

/**
 * Mask an API key for display (show first 4 and last 4 chars)
 */
export const maskApiKey = (key) => {
  if (!key || key.length < 12) return key ? '••••••••' : '';
  return `${key.slice(0, 4)}••••••••${key.slice(-4)}`;
};

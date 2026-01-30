import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { getApiKeys, saveApiKeys } from '../services/apiKeyService';

export default function Settings({ onBack }) {
  const { isDark, colors, toggleTheme } = useTheme();
  const [apiKeys, setApiKeys] = useState({
    anthropic: '',
    openai: '',
    gemini: ''
  });
  const [showKeys, setShowKeys] = useState({
    anthropic: false,
    openai: false,
    gemini: false
  });
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(null);
  const [testResults, setTestResults] = useState({});

  useEffect(() => {
    const keys = getApiKeys();
    setApiKeys(keys);
  }, []);

  const handleSave = () => {
    saveApiKeys(apiKeys);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const testApiKey = async (provider) => {
    setTesting(provider);
    setTestResults(prev => ({ ...prev, [provider]: null }));

    try {
      const response = await fetch('http://localhost:3001/api/ai/test-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          apiKey: apiKeys[provider]
        })
      });

      const result = await response.json();
      setTestResults(prev => ({
        ...prev,
        [provider]: result.success ? 'valid' : 'invalid'
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [provider]: 'error'
      }));
    }

    setTesting(null);
  };

  const providers = [
    {
      id: 'anthropic',
      name: 'Anthropic (Claude)',
      description: 'Powers the AI Interview assistant with Claude models',
      placeholder: 'sk-ant-...',
      docsUrl: 'https://console.anthropic.com/',
      color: '#d97706'
    },
    {
      id: 'openai',
      name: 'OpenAI (GPT)',
      description: 'Alternative AI provider using GPT models',
      placeholder: 'sk-...',
      docsUrl: 'https://platform.openai.com/api-keys',
      color: '#10b981'
    },
    {
      id: 'gemini',
      name: 'Google Gemini',
      description: 'Google\'s AI models for code assistance',
      placeholder: 'AIza...',
      docsUrl: 'https://makersuite.google.com/app/apikey',
      color: '#3b82f6'
    }
  ];

  const cardStyle = {
    backgroundColor: colors.bgSecondary,
    borderRadius: '12px',
    padding: '1.5rem',
    border: `1px solid ${colors.border}`,
    marginBottom: '1rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    backgroundColor: colors.bgTertiary,
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    color: colors.textPrimary,
    fontSize: '0.875rem',
    fontFamily: 'monospace',
    outline: 'none'
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s'
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.bgPrimary,
      color: colors.textPrimary,
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={onBack}
            style={{
              ...buttonStyle,
              backgroundColor: colors.bgSecondary,
              color: colors.textPrimary,
              marginBottom: '1rem'
            }}
          >
            ← Back
          </button>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            Settings
          </h1>
          <p style={{ color: colors.textMuted }}>
            Configure AI providers and application preferences
          </p>
        </div>

        {/* API Keys Section */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            AI Provider API Keys
          </h2>
          <p style={{ color: colors.textMuted, fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Add your API keys to enable AI-powered features like the Interview Assistant.
            Keys are stored locally in your browser.
          </p>

          {providers.map((provider) => (
            <div key={provider.id} style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: provider.color
                }} />
                <label style={{ fontWeight: '500' }}>{provider.name}</label>
                {testResults[provider.id] && (
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '0.125rem 0.5rem',
                    borderRadius: '4px',
                    backgroundColor: testResults[provider.id] === 'valid'
                      ? 'rgba(16, 185, 129, 0.2)'
                      : 'rgba(239, 68, 68, 0.2)',
                    color: testResults[provider.id] === 'valid' ? '#10b981' : '#ef4444'
                  }}>
                    {testResults[provider.id] === 'valid' ? 'Valid' : 'Invalid'}
                  </span>
                )}
              </div>
              <p style={{ color: colors.textMuted, fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                {provider.description}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <input
                    type={showKeys[provider.id] ? 'text' : 'password'}
                    value={apiKeys[provider.id]}
                    onChange={(e) => setApiKeys(prev => ({
                      ...prev,
                      [provider.id]: e.target.value
                    }))}
                    placeholder={provider.placeholder}
                    style={inputStyle}
                  />
                </div>
                <button
                  onClick={() => setShowKeys(prev => ({
                    ...prev,
                    [provider.id]: !prev[provider.id]
                  }))}
                  style={{
                    ...buttonStyle,
                    backgroundColor: colors.bgTertiary,
                    color: colors.textMuted,
                    width: '80px'
                  }}
                >
                  {showKeys[provider.id] ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => testApiKey(provider.id)}
                  disabled={!apiKeys[provider.id] || testing === provider.id}
                  style={{
                    ...buttonStyle,
                    backgroundColor: apiKeys[provider.id] ? provider.color : colors.bgTertiary,
                    color: 'white',
                    opacity: !apiKeys[provider.id] ? 0.5 : 1,
                    width: '80px'
                  }}
                >
                  {testing === provider.id ? '...' : 'Test'}
                </button>
              </div>
              <a
                href={provider.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.75rem',
                  color: provider.color,
                  textDecoration: 'none',
                  display: 'inline-block',
                  marginTop: '0.25rem'
                }}
              >
                Get API key →
              </a>
            </div>
          ))}

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button
              onClick={handleSave}
              style={{
                ...buttonStyle,
                backgroundColor: '#10b981',
                color: 'white',
                flex: 1
              }}
            >
              {saved ? '✓ Saved!' : 'Save API Keys'}
            </button>
            <button
              onClick={() => {
                setApiKeys({ anthropic: '', openai: '', gemini: '' });
                setTestResults({});
              }}
              style={{
                ...buttonStyle,
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444'
              }}
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Theme Section */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            Appearance
          </h2>
          <p style={{ color: colors.textMuted, fontSize: '0.875rem', marginBottom: '1rem' }}>
            Customize the look and feel of the application
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: '500' }}>Theme</div>
              <div style={{ color: colors.textMuted, fontSize: '0.875rem' }}>
                Currently using {isDark ? 'dark' : 'light'} mode
              </div>
            </div>
            <button
              onClick={toggleTheme}
              style={{
                ...buttonStyle,
                backgroundColor: colors.bgTertiary,
                color: colors.textPrimary,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div style={{
          ...cardStyle,
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)'
        }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🔒</span>
            <div>
              <div style={{ fontWeight: '500', color: '#60a5fa' }}>Security Note</div>
              <p style={{ color: colors.textMuted, fontSize: '0.875rem', marginTop: '0.25rem' }}>
                API keys are stored locally in your browser's localStorage and are never sent to our servers.
                They are only used to make direct API calls to the respective AI providers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

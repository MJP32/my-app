import React from 'react';

function AIToggleButton({ isOpen, onClick }) {

  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: isOpen ? '#6366f1' : '#3b82f6',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
        transition: 'all 0.2s ease',
        zIndex: 999
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
      }}
      title={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
    >
      {isOpen ? '×' : '🤖'}
    </button>
  );
}

export default AIToggleButton;

import Breadcrumb from '../../components/Breadcrumb'

function PythonTopicPlaceholder({ topicName, onBack, breadcrumb }) {
  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#f0f9ff',
      minHeight: '100vh'
    }}>
      <button
        onClick={onBack}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          fontWeight: '600',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '2rem'
        }}
      >
        ← Back to Python Topics
      </button>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '12px',
        border: '3px solid #3776ab',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🐍</div>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          marginBottom: '1rem'
        }}>
          {topicName}
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#6b7280',
          marginBottom: '2rem'
        }}>
          Content for this Python topic is coming soon!
        </p>
        <div style={{
          backgroundColor: '#dbeafe',
          padding: '1.5rem',
          borderRadius: '8px',
          color: '#1e40af',
          fontSize: '1rem'
        }}>
          This section will include comprehensive explanations, code examples,
          and interactive demonstrations for {topicName}.
        </div>
      </div>
    </div>
  )
}

export default PythonTopicPlaceholder

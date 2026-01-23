import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function L3SystemDesign({ onBack }) {
  const [expandedTopic, setExpandedTopic] = useState(null)

  const breadcrumb = {
    section: { name: 'Design', icon: '🎨', onClick: onBack },
    category: { name: 'System Design Interview', onClick: onBack },
    topic: 'L3 Level (Junior)',
    colors: {
      primary: '#22c55e',
      primaryHover: '#4ade80',
      bg: 'rgba(34, 197, 94, 0.1)',
      border: 'rgba(34, 197, 94, 0.3)',
      arrow: '#22c55e',
      hoverBg: 'rgba(34, 197, 94, 0.2)',
      topicBg: 'rgba(34, 197, 94, 0.2)'
    }
  }

  const topics = [
    {
      id: 'ood-basics',
      title: 'Object-Oriented Design Basics',
      icon: '🏗️',
      color: '#22c55e',
      description: 'Fundamental OOD questions focusing on class design, relationships, and SOLID principles.',
      questions: [
        {
          title: 'Design a Library Management System',
          difficulty: 'Easy',
          concepts: ['Classes', 'Inheritance', 'Encapsulation'],
          keyPoints: [
            'Identify entities: Book, Member, Librarian, Library',
            'Define relationships: Member borrows Books',
            'Consider operations: checkout, return, search, reserve',
            'Handle edge cases: overdue books, multiple copies'
          ]
        },
        {
          title: 'Design a Deck of Cards',
          difficulty: 'Easy',
          concepts: ['Composition', 'Enums', 'Shuffle algorithm'],
          keyPoints: [
            'Card class with Suit and Rank enums',
            'Deck class containing 52 Card objects',
            'Implement shuffle using Fisher-Yates algorithm',
            'Support for different card games (extensibility)'
          ]
        },
        {
          title: 'Design a Vending Machine',
          difficulty: 'Easy-Medium',
          concepts: ['State Pattern', 'Inventory', 'Payment'],
          keyPoints: [
            'States: Idle, HasMoney, Dispensing, OutOfStock',
            'Product and Inventory management',
            'Handle multiple payment methods',
            'Return change calculation'
          ]
        },
        {
          title: 'Design an ATM',
          difficulty: 'Medium',
          concepts: ['State Machine', 'Transactions', 'Security'],
          keyPoints: [
            'Authentication flow (card + PIN)',
            'Transaction types: withdraw, deposit, balance, transfer',
            'Concurrency: handle multiple ATMs accessing same account',
            'Cash dispenser logic and denominations'
          ]
        }
      ]
    },
    {
      id: 'api-basics',
      title: 'Simple API Design',
      icon: '🔌',
      color: '#3b82f6',
      description: 'Design clean REST APIs with proper endpoints, methods, and error handling.',
      questions: [
        {
          title: 'Design a Todo List API',
          difficulty: 'Easy',
          concepts: ['REST', 'CRUD', 'HTTP Methods'],
          keyPoints: [
            'Endpoints: GET/POST /todos, GET/PUT/DELETE /todos/:id',
            'Request/Response formats with JSON',
            'Status codes: 200, 201, 400, 404, 500',
            'Pagination for listing todos'
          ]
        },
        {
          title: 'Design a Blog Post API',
          difficulty: 'Easy-Medium',
          concepts: ['REST', 'Relationships', 'Authentication'],
          keyPoints: [
            'Resources: Posts, Comments, Users, Tags',
            'Nested resources: /posts/:id/comments',
            'Authentication with JWT tokens',
            'Filtering and sorting: /posts?tag=tech&sort=date'
          ]
        },
        {
          title: 'Design a User Management API',
          difficulty: 'Medium',
          concepts: ['Auth', 'Roles', 'Validation'],
          keyPoints: [
            'Registration, login, logout, password reset',
            'Role-based access control (RBAC)',
            'Input validation and error messages',
            'Rate limiting for security'
          ]
        }
      ]
    },
    {
      id: 'data-structures',
      title: 'Data Structure Choices',
      icon: '🗃️',
      color: '#f59e0b',
      description: 'Discuss trade-offs between different data structures for common scenarios.',
      questions: [
        {
          title: 'Design a LRU Cache',
          difficulty: 'Medium',
          concepts: ['HashMap', 'Doubly Linked List', 'Time Complexity'],
          keyPoints: [
            'O(1) get and put operations',
            'HashMap for fast key lookup',
            'Doubly linked list for ordering (most/least recent)',
            'Move accessed items to front, evict from back'
          ]
        },
        {
          title: 'Design a Leaderboard',
          difficulty: 'Easy-Medium',
          concepts: ['Sorted Data Structures', 'Trade-offs'],
          keyPoints: [
            'Options: Sorted array, BST, Skip List, Heap',
            'Trade-offs: insert vs query performance',
            'Consider: frequent updates vs frequent reads',
            'Tie-breaking rules (timestamp, alphabetical)'
          ]
        },
        {
          title: 'Design an Autocomplete System',
          difficulty: 'Medium',
          concepts: ['Trie', 'Prefix Search', 'Ranking'],
          keyPoints: [
            'Trie for prefix-based search',
            'Store frequency/popularity at nodes',
            'Return top-k suggestions',
            'Handle updates when new searches occur'
          ]
        },
        {
          title: 'Design a Task Scheduler',
          difficulty: 'Medium',
          concepts: ['Priority Queue', 'Heap', 'Scheduling'],
          keyPoints: [
            'Min-heap ordered by execution time',
            'Support for recurring tasks',
            'Handle task dependencies',
            'Consider: delayed tasks, cancellation'
          ]
        }
      ]
    }
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#22c55e'
      case 'Easy-Medium': return '#84cc16'
      case 'Medium': return '#f59e0b'
      default: return '#6b7280'
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #064e3b, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <button
          onClick={onBack}
          style={{
            background: '#22c55e',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '1.5rem',
            fontWeight: '500'
          }}
        >
          ← Back
        </button>

        <Breadcrumb breadcrumb={breadcrumb} />

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            background: 'linear-gradient(to right, #22c55e, #4ade80)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🌱 L3 Level System Design
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Entry-level design questions for junior engineers. Focus on OOD fundamentals,
            basic API design, and data structure selection.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {topics.map(topic => (
            <div
              key={topic.id}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                borderRadius: '12px',
                border: `2px solid ${topic.color}`,
                overflow: 'hidden'
              }}
            >
              <button
                onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                style={{
                  width: '100%',
                  padding: '1.5rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '2rem' }}>{topic.icon}</span>
                  <div style={{ textAlign: 'left' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: topic.color }}>
                      {topic.title}
                    </h2>
                    <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                      {topic.description}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{
                    background: topic.color,
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem'
                  }}>
                    {topic.questions.length} questions
                  </span>
                  <span style={{ color: topic.color, fontSize: '1.5rem' }}>
                    {expandedTopic === topic.id ? '−' : '+'}
                  </span>
                </div>
              </button>

              {expandedTopic === topic.id && (
                <div style={{ padding: '0 1.5rem 1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {topic.questions.map((question, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: '#1f2937',
                          borderRadius: '8px',
                          padding: '1.25rem',
                          border: '1px solid #374151'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '1rem'
                        }}>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#f3f4f6' }}>
                            {question.title}
                          </h3>
                          <span style={{
                            background: getDifficultyColor(question.difficulty),
                            color: 'white',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}>
                            {question.difficulty}
                          </span>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                          <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Key Concepts: </span>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                            {question.concepts.map((concept, i) => (
                              <span
                                key={i}
                                style={{
                                  background: '#374151',
                                  color: '#d1d5db',
                                  padding: '0.2rem 0.5rem',
                                  borderRadius: '4px',
                                  fontSize: '0.8rem'
                                }}
                              >
                                {concept}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Key Points:</span>
                          <ul style={{
                            marginTop: '0.5rem',
                            paddingLeft: '1.25rem',
                            color: '#d1d5db',
                            fontSize: '0.9rem'
                          }}>
                            {question.keyPoints.map((point, i) => (
                              <li key={i} style={{ marginBottom: '0.25rem' }}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default L3SystemDesign

import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function L3SystemDesign({ onBack }) {
  const [selectedTopic, setSelectedTopic] = useState(null)

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
      id: 'library-management',
      title: 'Library Management System',
      icon: '📚',
      color: '#22c55e',
      difficulty: 'Easy',
      category: 'OOD',
      description: 'Design a system to manage library operations including books, members, and borrowing.',
      content: {
        requirements: [
          'Add/remove/search books in the library',
          'Register members and manage memberships',
          'Issue and return books',
          'Track book availability and reservations',
          'Handle fines for overdue books'
        ],
        entities: [
          { name: 'Book', attrs: 'ISBN, title, author, publisher, copies, status' },
          { name: 'Member', attrs: 'memberId, name, email, borrowedBooks, fines' },
          { name: 'Librarian', attrs: 'employeeId, name, permissions' },
          { name: 'Library', attrs: 'name, address, books, members' },
          { name: 'BookLoan', attrs: 'book, member, issueDate, dueDate, returnDate' },
          { name: 'Reservation', attrs: 'book, member, reservationDate, status' }
        ],
        relationships: [
          'Library has many Books and Members',
          'Member can borrow multiple Books (max limit)',
          'Book can have multiple Copies',
          'BookLoan links Member to Book with dates',
          'Reservation queues members for unavailable books'
        ],
        keyMethods: [
          'searchBook(query) → List<Book>',
          'issueBook(memberId, ISBN) → BookLoan',
          'returnBook(loanId) → Fine?',
          'reserveBook(memberId, ISBN) → Reservation',
          'calculateFine(loan) → amount'
        ],
        designPatterns: ['Singleton (Library)', 'Factory (BookLoan creation)', 'Observer (notify on availability)']
      }
    },
    {
      id: 'deck-of-cards',
      title: 'Deck of Cards',
      icon: '🃏',
      color: '#ef4444',
      difficulty: 'Easy',
      category: 'OOD',
      description: 'Design a generic deck of cards that can support multiple card games.',
      content: {
        requirements: [
          'Represent a standard 52-card deck',
          'Support shuffle operation',
          'Deal cards to players',
          'Support multiple games (Blackjack, Poker)',
          'Handle multiple decks for casino games'
        ],
        entities: [
          { name: 'Card', attrs: 'suit (Enum), rank (Enum), faceUp' },
          { name: 'Suit', attrs: 'HEARTS, DIAMONDS, CLUBS, SPADES' },
          { name: 'Rank', attrs: 'ACE, TWO...TEN, JACK, QUEEN, KING' },
          { name: 'Deck', attrs: 'cards[], remainingCards' },
          { name: 'Hand', attrs: 'cards[], owner' },
          { name: 'Game', attrs: 'deck, players[], rules (abstract)' }
        ],
        relationships: [
          'Deck contains 52 Cards',
          'Card has one Suit and one Rank',
          'Hand holds subset of Cards from Deck',
          'Game uses one or more Decks'
        ],
        keyMethods: [
          'shuffle() → void (Fisher-Yates algorithm)',
          'dealCard() → Card',
          'dealHand(numCards) → Hand',
          'reset() → void',
          'getRemainingCount() → int'
        ],
        designPatterns: ['Factory (create different game types)', 'Strategy (different game rules)', 'Template Method (game flow)']
      }
    },
    {
      id: 'vending-machine',
      title: 'Vending Machine',
      icon: '🏭',
      color: '#f59e0b',
      difficulty: 'Easy-Medium',
      category: 'OOD',
      description: 'Design a vending machine with product selection, payment, and inventory management.',
      content: {
        requirements: [
          'Display available products and prices',
          'Accept multiple payment methods (coins, bills, card)',
          'Dispense selected product',
          'Return change accurately',
          'Handle inventory and restocking'
        ],
        entities: [
          { name: 'VendingMachine', attrs: 'inventory, currentState, balance' },
          { name: 'Product', attrs: 'id, name, price, quantity' },
          { name: 'Inventory', attrs: 'slots[][], products' },
          { name: 'Coin/Bill', attrs: 'denomination, count' },
          { name: 'State', attrs: 'Idle, HasMoney, Dispensing, OutOfStock' }
        ],
        relationships: [
          'VendingMachine has Inventory of Products',
          'VendingMachine maintains State',
          'Transaction links Payment to Product'
        ],
        keyMethods: [
          'selectProduct(code) → Product',
          'insertMoney(amount) → balance',
          'dispense() → Product',
          'returnChange() → Coin[]',
          'refund() → amount'
        ],
        designPatterns: ['State Pattern (machine states)', 'Strategy (payment methods)', 'Singleton (machine instance)']
      }
    },
    {
      id: 'atm',
      title: 'ATM System',
      icon: '🏧',
      color: '#3b82f6',
      difficulty: 'Medium',
      category: 'OOD',
      description: 'Design an ATM with authentication, transactions, and cash management.',
      content: {
        requirements: [
          'Authenticate users with card + PIN',
          'Support withdraw, deposit, balance inquiry, transfer',
          'Dispense cash in available denominations',
          'Handle concurrent access to accounts',
          'Maintain transaction logs'
        ],
        entities: [
          { name: 'ATM', attrs: 'location, cashDispenser, cardReader, state' },
          { name: 'Account', attrs: 'accountNumber, balance, type, holder' },
          { name: 'Card', attrs: 'cardNumber, expiryDate, PIN (hashed)' },
          { name: 'Transaction', attrs: 'type, amount, timestamp, status' },
          { name: 'CashDispenser', attrs: 'denominations[], counts[]' }
        ],
        relationships: [
          'Card belongs to Account holder',
          'ATM processes Transactions on Accounts',
          'CashDispenser tracks available cash'
        ],
        keyMethods: [
          'authenticateUser(card, PIN) → boolean',
          'withdraw(amount) → Transaction',
          'deposit(amount) → Transaction',
          'transfer(toAccount, amount) → Transaction',
          'getBalance() → amount'
        ],
        designPatterns: ['State (ATM states)', 'Command (transactions)', 'Chain of Responsibility (validation)']
      }
    },
    {
      id: 'todo-api',
      title: 'Todo List API',
      icon: '✅',
      color: '#10b981',
      difficulty: 'Easy',
      category: 'API Design',
      description: 'Design a RESTful API for a todo list application.',
      content: {
        requirements: [
          'Create, read, update, delete todos',
          'Mark todos as complete/incomplete',
          'Filter by status, due date, priority',
          'Support pagination for large lists',
          'User authentication'
        ],
        endpoints: [
          { method: 'GET', path: '/todos', desc: 'List all todos with pagination' },
          { method: 'POST', path: '/todos', desc: 'Create new todo' },
          { method: 'GET', path: '/todos/:id', desc: 'Get specific todo' },
          { method: 'PUT', path: '/todos/:id', desc: 'Update todo' },
          { method: 'DELETE', path: '/todos/:id', desc: 'Delete todo' },
          { method: 'PATCH', path: '/todos/:id/complete', desc: 'Toggle completion' }
        ],
        requestResponse: {
          create: '{ title, description?, dueDate?, priority? }',
          response: '{ id, title, description, completed, dueDate, priority, createdAt, updatedAt }'
        },
        statusCodes: [
          '200 OK - Successful GET/PUT',
          '201 Created - Successful POST',
          '204 No Content - Successful DELETE',
          '400 Bad Request - Invalid input',
          '404 Not Found - Todo doesn\'t exist',
          '401 Unauthorized - Not authenticated'
        ],
        bestPractices: ['Use query params for filtering: ?status=completed&priority=high', 'Pagination: ?page=1&limit=20', 'Include total count in response headers']
      }
    },
    {
      id: 'blog-api',
      title: 'Blog Post API',
      icon: '📝',
      color: '#8b5cf6',
      difficulty: 'Easy-Medium',
      category: 'API Design',
      description: 'Design a RESTful API for a blog platform with posts, comments, and users.',
      content: {
        requirements: [
          'CRUD operations for posts',
          'Comments on posts',
          'User authentication and authorization',
          'Tags and categories',
          'Search and filtering'
        ],
        endpoints: [
          { method: 'GET', path: '/posts', desc: 'List posts with pagination' },
          { method: 'POST', path: '/posts', desc: 'Create post (auth required)' },
          { method: 'GET', path: '/posts/:id', desc: 'Get post with comments' },
          { method: 'PUT', path: '/posts/:id', desc: 'Update post (owner only)' },
          { method: 'DELETE', path: '/posts/:id', desc: 'Delete post (owner only)' },
          { method: 'GET', path: '/posts/:id/comments', desc: 'Get comments' },
          { method: 'POST', path: '/posts/:id/comments', desc: 'Add comment' },
          { method: 'GET', path: '/users/:id/posts', desc: 'Get user\'s posts' }
        ],
        requestResponse: {
          create: '{ title, content, tags[], categoryId }',
          response: '{ id, title, content, author, tags[], comments[], createdAt }'
        },
        authentication: ['JWT tokens in Authorization header', 'Refresh token endpoint', 'Role-based access (author, admin, reader)'],
        bestPractices: ['Nested resources: /posts/:id/comments', 'Filter: ?tag=tech&author=john', 'Sort: ?sort=-createdAt (descending)']
      }
    },
    {
      id: 'user-api',
      title: 'User Management API',
      icon: '👤',
      color: '#ec4899',
      difficulty: 'Medium',
      category: 'API Design',
      description: 'Design a user management system with authentication, roles, and profiles.',
      content: {
        requirements: [
          'User registration and login',
          'Password reset flow',
          'Role-based access control',
          'User profile management',
          'Session management'
        ],
        endpoints: [
          { method: 'POST', path: '/auth/register', desc: 'Create new account' },
          { method: 'POST', path: '/auth/login', desc: 'Authenticate user' },
          { method: 'POST', path: '/auth/logout', desc: 'Invalidate session' },
          { method: 'POST', path: '/auth/refresh', desc: 'Refresh access token' },
          { method: 'POST', path: '/auth/forgot-password', desc: 'Request reset email' },
          { method: 'POST', path: '/auth/reset-password', desc: 'Reset with token' },
          { method: 'GET', path: '/users/me', desc: 'Get current user' },
          { method: 'PUT', path: '/users/me', desc: 'Update profile' }
        ],
        security: [
          'Password hashing (bcrypt)',
          'JWT with short expiry + refresh tokens',
          'Rate limiting on auth endpoints',
          'Email verification for registration',
          'HTTPS only'
        ],
        rbac: ['Roles: admin, moderator, user', 'Permissions: read, write, delete, admin', 'Middleware checks role on protected routes']
      }
    },
    {
      id: 'lru-cache',
      title: 'LRU Cache',
      icon: '💾',
      color: '#06b6d4',
      difficulty: 'Medium',
      category: 'Data Structures',
      description: 'Design a Least Recently Used cache with O(1) operations.',
      content: {
        requirements: [
          'O(1) get operation',
          'O(1) put operation',
          'Fixed capacity with eviction',
          'Track access order',
          'Thread-safe option'
        ],
        dataStructures: [
          { name: 'HashMap', purpose: 'O(1) key lookup → node reference' },
          { name: 'Doubly Linked List', purpose: 'O(1) insert/remove, maintains order' },
          { name: 'Node', attrs: 'key, value, prev, next' }
        ],
        algorithm: [
          'GET: If key exists, move node to head (most recent), return value',
          'PUT: If key exists, update value and move to head',
          'PUT: If key doesn\'t exist, create node at head',
          'PUT: If capacity exceeded, remove tail node (least recent)',
          'Always update HashMap when adding/removing nodes'
        ],
        implementation: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = { next: this.tail };
    this.tail = { prev: this.head };
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this.moveToHead(node);
    return node.value;
  }

  put(key, value) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      node.value = value;
      this.moveToHead(node);
    } else {
      const node = { key, value };
      this.map.set(key, node);
      this.addToHead(node);
      if (this.map.size > this.capacity) {
        const removed = this.removeTail();
        this.map.delete(removed.key);
      }
    }
  }
}`,
        complexity: ['Time: O(1) for both get and put', 'Space: O(capacity)']
      }
    },
    {
      id: 'leaderboard',
      title: 'Leaderboard System',
      icon: '🏆',
      color: '#f59e0b',
      difficulty: 'Easy-Medium',
      category: 'Data Structures',
      description: 'Design a real-time leaderboard for ranking players by score.',
      content: {
        requirements: [
          'Add/update player scores',
          'Get top K players',
          'Get player rank',
          'Handle ties (by timestamp)',
          'Efficient updates with millions of players'
        ],
        approaches: [
          {
            name: 'Sorted Array',
            pros: 'Simple, fast range queries',
            cons: 'O(n) insert/update',
            use: 'Small datasets, infrequent updates'
          },
          {
            name: 'Balanced BST (TreeMap)',
            pros: 'O(log n) insert/update/rank',
            cons: 'Complex implementation',
            use: 'Medium datasets, frequent updates'
          },
          {
            name: 'Skip List',
            pros: 'O(log n) operations, simpler than BST',
            cons: 'More space',
            use: 'Redis sorted sets use this'
          },
          {
            name: 'Bucket + Sorted Set',
            pros: 'Very fast for score ranges',
            cons: 'More complex',
            use: 'Large scale with score ranges'
          }
        ],
        redisApproach: [
          'Use Redis Sorted Set (ZSET)',
          'ZADD leaderboard <score> <playerId>',
          'ZREVRANGE leaderboard 0 9 → top 10',
          'ZREVRANK leaderboard <playerId> → rank',
          'O(log n) for all operations'
        ],
        tieBreaking: ['Include timestamp in score: score * 1e10 + (MAX_TS - timestamp)', 'Secondary sort by name', 'Store composite key']
      }
    },
    {
      id: 'autocomplete',
      title: 'Autocomplete System',
      icon: '🔍',
      color: '#6366f1',
      difficulty: 'Medium',
      category: 'Data Structures',
      description: 'Design a type-ahead suggestion system for search.',
      content: {
        requirements: [
          'Return suggestions as user types',
          'Rank by popularity/relevance',
          'Fast prefix matching',
          'Handle millions of queries',
          'Update rankings based on usage'
        ],
        dataStructures: [
          { name: 'Trie', purpose: 'Prefix tree for efficient prefix matching' },
          { name: 'TrieNode', attrs: 'children{}, isWord, topSuggestions[]' },
          { name: 'Priority Queue', purpose: 'Maintain top-k suggestions per node' }
        ],
        algorithm: [
          'Build trie from search history with frequencies',
          'At each node, store top-k completions for that prefix',
          'On query: traverse trie following input chars',
          'Return pre-computed top-k at final node',
          'Periodically rebuild trie with updated frequencies'
        ],
        optimization: [
          'Cache popular prefixes at CDN edge',
          'Debounce client requests (wait 100-200ms)',
          'Return results as user types (streaming)',
          'Personalize based on user history'
        ],
        scale: [
          'Shard trie by first 1-2 characters',
          'Replicate for read scaling',
          'Async updates to frequency counts',
          'Approximate counting (Count-Min Sketch)'
        ]
      }
    },
    {
      id: 'task-scheduler',
      title: 'Task Scheduler',
      icon: '⏰',
      color: '#14b8a6',
      difficulty: 'Medium',
      category: 'Data Structures',
      description: 'Design a system to schedule and execute tasks at specified times.',
      content: {
        requirements: [
          'Schedule tasks for future execution',
          'Support one-time and recurring tasks',
          'Handle task dependencies',
          'Allow task cancellation',
          'Distribute across multiple workers'
        ],
        dataStructures: [
          { name: 'Min-Heap', purpose: 'Priority queue ordered by execution time' },
          { name: 'Task', attrs: 'id, executionTime, callback, interval, status' },
          { name: 'HashMap', purpose: 'O(1) lookup for cancellation by taskId' }
        ],
        algorithm: [
          'Main loop sleeps until next task\'s execution time',
          'Wake up, pop task from heap, execute',
          'If recurring, calculate next time and re-add to heap',
          'Use condition variable for efficient sleeping',
          'Handle clock skew and delays gracefully'
        ],
        distributedVersion: [
          'Coordinator assigns tasks to workers',
          'Workers poll for tasks or use push model',
          'Persist tasks to database for crash recovery',
          'Use distributed lock for task claiming',
          'Dead letter queue for failed tasks'
        ],
        implementation: `class TaskScheduler {
  constructor() {
    this.heap = new MinHeap(); // by executionTime
    this.tasks = new Map();   // id → task
  }

  schedule(task, delay, interval = 0) {
    const execTime = Date.now() + delay;
    const entry = { ...task, execTime, interval };
    this.tasks.set(task.id, entry);
    this.heap.push(entry);
  }

  cancel(taskId) {
    const task = this.tasks.get(taskId);
    if (task) task.cancelled = true;
    this.tasks.delete(taskId);
  }

  run() {
    while (true) {
      const next = this.heap.peek();
      const wait = next.execTime - Date.now();
      if (wait > 0) sleep(wait);
      const task = this.heap.pop();
      if (!task.cancelled) {
        task.callback();
        if (task.interval > 0) {
          task.execTime += task.interval;
          this.heap.push(task);
        }
      }
    }
  }
}`
      }
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

  const getCategoryColor = (category) => {
    switch (category) {
      case 'OOD': return '#8b5cf6'
      case 'API Design': return '#3b82f6'
      case 'Data Structures': return '#06b6d4'
      default: return '#6b7280'
    }
  }

  const renderTopicModal = (topic) => {
    const content = topic.content

    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}
        onClick={() => setSelectedTopic(null)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            borderRadius: '16px',
            maxWidth: '900px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            border: `2px solid ${topic.color}`,
            boxShadow: `0 25px 50px -12px ${topic.color}40`
          }}
        >
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid #374151',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            background: '#1f2937',
            zIndex: 10
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2rem' }}>{topic.icon}</span>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: topic.color, margin: 0 }}>
                  {topic.title}
                </h2>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <span style={{
                    background: getDifficultyColor(topic.difficulty),
                    color: 'white',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {topic.difficulty}
                  </span>
                  <span style={{
                    background: getCategoryColor(topic.category),
                    color: 'white',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {topic.category}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedTopic(null)}
              style={{
                background: '#374151',
                border: 'none',
                color: '#9ca3af',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
          </div>

          <div style={{ padding: '1.5rem' }}>
            <p style={{ color: '#d1d5db', marginBottom: '1.5rem', fontSize: '1rem' }}>
              {topic.description}
            </p>

            {/* Requirements */}
            {content.requirements && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#22c55e', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Requirements
                </h3>
                <ul style={{ paddingLeft: '1.5rem', color: '#d1d5db' }}>
                  {content.requirements.map((req, i) => (
                    <li key={i} style={{ marginBottom: '0.4rem' }}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Entities */}
            {content.entities && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#3b82f6', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Key Entities
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.75rem' }}>
                  {content.entities.map((entity, i) => (
                    <div key={i} style={{
                      background: '#374151',
                      padding: '0.75rem',
                      borderRadius: '6px'
                    }}>
                      <span style={{ color: topic.color, fontWeight: '600' }}>{entity.name}</span>
                      <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: '0.25rem' }}>{entity.attrs}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Endpoints for API topics */}
            {content.endpoints && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#8b5cf6', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  API Endpoints
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {content.endpoints.map((ep, i) => (
                    <div key={i} style={{
                      background: '#374151',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <span style={{
                        background: ep.method === 'GET' ? '#22c55e' : ep.method === 'POST' ? '#3b82f6' : ep.method === 'PUT' ? '#f59e0b' : ep.method === 'PATCH' ? '#8b5cf6' : '#ef4444',
                        color: 'white',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        minWidth: '4rem',
                        textAlign: 'center'
                      }}>
                        {ep.method}
                      </span>
                      <code style={{ color: '#22d3ee', fontSize: '0.9rem' }}>{ep.path}</code>
                      <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>— {ep.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Relationships */}
            {content.relationships && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#f59e0b', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Relationships
                </h3>
                <ul style={{ paddingLeft: '1.5rem', color: '#d1d5db' }}>
                  {content.relationships.map((rel, i) => (
                    <li key={i} style={{ marginBottom: '0.4rem' }}>{rel}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Methods */}
            {content.keyMethods && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#ec4899', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Key Methods
                </h3>
                <div style={{ background: '#374151', padding: '1rem', borderRadius: '6px' }}>
                  {content.keyMethods.map((method, i) => (
                    <code key={i} style={{ display: 'block', color: '#22d3ee', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                      {method}
                    </code>
                  ))}
                </div>
              </div>
            )}

            {/* Design Patterns */}
            {content.designPatterns && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#a855f7', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Design Patterns Used
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {content.designPatterns.map((pattern, i) => (
                    <span key={i} style={{
                      background: '#4c1d95',
                      color: '#c4b5fd',
                      padding: '0.4rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.85rem'
                    }}>
                      {pattern}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Data Structures */}
            {content.dataStructures && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#06b6d4', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Data Structures
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {content.dataStructures.map((ds, i) => (
                    <div key={i} style={{
                      background: '#374151',
                      padding: '0.75rem',
                      borderRadius: '6px'
                    }}>
                      <span style={{ color: '#22d3ee', fontWeight: '600' }}>{ds.name}</span>
                      <span style={{ color: '#9ca3af' }}> — {ds.purpose || ds.attrs}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Algorithm */}
            {content.algorithm && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#f59e0b', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Algorithm
                </h3>
                <ol style={{ paddingLeft: '1.5rem', color: '#d1d5db' }}>
                  {content.algorithm.map((step, i) => (
                    <li key={i} style={{ marginBottom: '0.4rem' }}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Approaches */}
            {content.approaches && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#f59e0b', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Implementation Approaches
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                  {content.approaches.map((approach, i) => (
                    <div key={i} style={{
                      background: '#374151',
                      padding: '0.75rem',
                      borderRadius: '6px'
                    }}>
                      <span style={{ color: '#22d3ee', fontWeight: '600' }}>{approach.name}</span>
                      <p style={{ color: '#22c55e', fontSize: '0.8rem', marginTop: '0.25rem' }}>✓ {approach.pros}</p>
                      <p style={{ color: '#ef4444', fontSize: '0.8rem' }}>✗ {approach.cons}</p>
                      <p style={{ color: '#9ca3af', fontSize: '0.8rem', fontStyle: 'italic' }}>{approach.use}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Code Implementation */}
            {content.implementation && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#22d3ee', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Implementation
                </h3>
                <pre style={{
                  background: '#1e1e1e',
                  padding: '1rem',
                  borderRadius: '6px',
                  overflow: 'auto',
                  fontSize: '0.85rem',
                  color: '#d4d4d4'
                }}>
                  {content.implementation}
                </pre>
              </div>
            )}

            {/* Status Codes */}
            {content.statusCodes && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#f59e0b', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  HTTP Status Codes
                </h3>
                <div style={{ background: '#374151', padding: '1rem', borderRadius: '6px' }}>
                  {content.statusCodes.map((code, i) => (
                    <div key={i} style={{ color: '#d1d5db', marginBottom: '0.3rem', fontSize: '0.9rem' }}>
                      {code}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security */}
            {content.security && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#ef4444', marginBottom: '0.75rem', fontSize: '1.1rem', fontWeight: '600' }}>
                  Security Considerations
                </h3>
                <ul style={{ paddingLeft: '1.5rem', color: '#d1d5db' }}>
                  {content.security.map((item, i) => (
                    <li key={i} style={{ marginBottom: '0.4rem' }}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const categories = ['OOD', 'API Design', 'Data Structures']

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
            Entry-level design questions for junior engineers. Click any topic to view detailed solution approach.
          </p>
        </div>

        {categories.map(category => (
          <div key={category} style={{ marginBottom: '2.5rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: getCategoryColor(category),
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {category === 'OOD' && '🏗️'}
              {category === 'API Design' && '🔌'}
              {category === 'Data Structures' && '🗃️'}
              {category}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem'
            }}>
              {topics.filter(t => t.category === category).map(topic => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  style={{
                    background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: `2px solid ${topic.color}40`,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = topic.color
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = `0 10px 30px -10px ${topic.color}50`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${topic.color}40`
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '1.75rem' }}>{topic.icon}</span>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#f3f4f6', margin: 0 }}>
                        {topic.title}
                      </h3>
                      <span style={{
                        background: getDifficultyColor(topic.difficulty),
                        color: 'white',
                        padding: '0.15rem 0.4rem',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: '600'
                      }}>
                        {topic.difficulty}
                      </span>
                    </div>
                  </div>
                  <p style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: '1.5' }}>
                    {topic.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '0.5rem',
                    marginTop: '0.75rem',
                    color: topic.color,
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    View Solution →
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedTopic && renderTopicModal(selectedTopic)}
    </div>
  )
}

export default L3SystemDesign

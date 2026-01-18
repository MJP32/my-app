import { useState } from 'react'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function MyProjects({ onBack, onSelectItem }) {
  const [selectedConcept, setSelectedConcept] = useState('')

  // Organized into logical groups
  const projectGroups = [
    {
      title: 'System Design Concepts',
      icon: '📚',
      color: '#f97316',
      isDropdown: true,
      projects: [
        {
          id: 'Load Balancing',
          name: 'Load Balancing',
          icon: '⚖️',
          color: '#3b82f6',
          description: 'Distribute traffic across multiple servers. Learn algorithms (Round Robin, Least Connections, IP Hash), health checks, and Layer 4 vs Layer 7 load balancing.'
        },
        {
          id: 'Caching Strategies',
          name: 'Caching Strategies',
          icon: '💾',
          color: '#10b981',
          description: 'Improve performance with caching. Understand cache-aside, write-through, write-back patterns, cache eviction policies (LRU, LFU), and distributed caching with Redis/Memcached.'
        },
        {
          id: 'Database Sharding',
          name: 'Database Sharding',
          icon: '🗄️',
          color: '#8b5cf6',
          description: 'Scale databases horizontally by partitioning data. Learn sharding strategies (range, hash, directory-based), shard key selection, and resharding techniques.'
        },
        {
          id: 'CAP Theorem',
          name: 'CAP Theorem',
          icon: '🔺',
          color: '#ef4444',
          description: 'Understand the fundamental tradeoff: Consistency, Availability, Partition Tolerance. Learn why you can only pick 2 of 3, and real-world database examples (CP, AP, CA).'
        },
        {
          id: 'Consistency Patterns',
          name: 'Consistency Patterns',
          icon: '🔄',
          color: '#06b6d4',
          description: 'Master data consistency models: Strong Consistency, Eventual Consistency, Causal Consistency. Learn when to use each pattern and tradeoffs with availability and performance.'
        },
        {
          id: 'API Design',
          name: 'API Design & REST',
          icon: '🔌',
          color: '#f59e0b',
          description: 'Design scalable REST APIs. Learn HTTP methods, status codes, versioning, pagination, rate limiting, authentication (OAuth, JWT), and API gateway patterns.'
        },
        {
          id: 'Message Queues',
          name: 'Message Queues',
          icon: '📬',
          color: '#ec4899',
          description: 'Decouple systems with async messaging. Learn message queue patterns, pub/sub, topics, dead letter queues, and tools like RabbitMQ, Kafka, and SQS.'
        },
        {
          id: 'CDN',
          name: 'Content Delivery Network',
          icon: '🌐',
          color: '#14b8a6',
          description: 'Deliver content globally with low latency. Understand CDN architecture, edge locations, caching strategies, cache invalidation, and popular CDNs (CloudFront, Cloudflare, Akamai).'
        },
        {
          id: 'Database Replication',
          name: 'Database Replication',
          icon: '🔁',
          color: '#a855f7',
          description: 'Ensure high availability with database replication. Learn master-slave, master-master replication, read replicas, replication lag, and failover strategies.'
        },
        {
          id: 'Scaling',
          name: 'Horizontal vs Vertical Scaling',
          icon: '📈',
          color: '#0891b2',
          description: 'Scale your systems effectively. Understand when to scale up (vertical) vs scale out (horizontal), stateless vs stateful services, and auto-scaling strategies.'
        },
        {
          id: 'Proxies',
          name: 'Proxies & Reverse Proxies',
          icon: '🚪',
          color: '#6366f1',
          description: 'Learn proxy server patterns. Understand forward proxies, reverse proxies (Nginx, HAProxy), SSL termination, request routing, and API gateways.'
        },
        {
          id: 'Data Partitioning',
          name: 'Data Partitioning',
          icon: '📊',
          color: '#f97316',
          description: 'Partition data for better performance and scalability. Learn horizontal partitioning (sharding), vertical partitioning, and criteria for partitioning strategies.'
        },
        {
          id: 'SQL vs NoSQL',
          name: 'SQL vs NoSQL',
          icon: '🗃️',
          color: '#84cc16',
          description: 'Choose the right database for your use case. Compare relational (PostgreSQL, MySQL) vs NoSQL (MongoDB, Cassandra, DynamoDB) databases, ACID vs BASE, and when to use each.'
        },
        {
          id: 'Consistent Hashing',
          name: 'Consistent Hashing',
          icon: '🔑',
          color: '#eab308',
          description: 'Distribute data across nodes efficiently. Learn consistent hashing algorithm, virtual nodes, and how it solves the rehashing problem in distributed systems.'
        },
        {
          id: 'WebSockets',
          name: 'Long Polling vs WebSockets',
          icon: '🔌',
          color: '#22c55e',
          description: 'Enable real-time communication. Compare long polling, WebSockets, and Server-Sent Events (SSE). Learn when to use each pattern and implementation best practices.'
        },
        {
          id: 'Blob Storage',
          name: 'Blob Storage',
          icon: '📦',
          color: '#3b82f6',
          description: 'Store and serve large files efficiently. Learn about object storage (S3, Azure Blob, GCS), metadata management, access patterns, and cost optimization.'
        },
        {
          id: 'Microservices',
          name: 'Microservices Architecture',
          icon: '🧩',
          color: '#8b5cf6',
          description: 'Design distributed systems with microservices. Learn service decomposition, inter-service communication, service discovery, circuit breakers, and the saga pattern.'
        },
        {
          id: 'Event-Driven',
          name: 'Event-Driven Architecture',
          icon: '⚡',
          color: '#f59e0b',
          description: 'Build reactive systems with events. Learn event sourcing, CQRS, event streaming (Kafka), eventual consistency, and handling distributed transactions.'
        }
      ]
    },
    {
      title: 'Financial & Trading Systems',
      icon: '💰',
      color: '#10b981',
      projects: [
        {
          id: 'Var/CVar',
          name: 'Var/CVar',
          icon: '📈',
          color: '#10b981',
          description: 'Value at Risk and Conditional Value at Risk calculations for financial risk management.'
        },
        {
          id: 'Var/CVar - Advanced',
          name: 'Var/CVar - Advanced',
          icon: '📊',
          color: '#059669',
          description: 'Advanced VaR/CVaR techniques with Monte Carlo simulations and stress testing.'
        },
        {
          id: 'Var/CVar 3',
          name: 'Var/CVar 3',
          icon: '📉',
          color: '#047857',
          description: 'Enhanced VaR/CVaR system with real-time analytics and portfolio optimization.'
        },
        {
          id: 'Dark Pool Matching Engine',
          name: 'Dark Pool Matching Engine',
          icon: '🌑',
          color: '#6366f1',
          description: 'High-performance order matching engine for dark pool trading operations.'
        },
        {
          id: 'Dark Pool Matching Engine - Basic',
          name: 'Dark Pool Matching Engine - Basic',
          icon: '🌓',
          color: '#4f46e5',
          description: 'Simplified dark pool matching engine for learning trading system fundamentals.'
        },
        {
          id: 'Dark Pool Engine 3',
          name: 'Dark Pool Engine 3',
          icon: '🌚',
          color: '#3730a3',
          description: 'Latest iteration of dark pool engine with advanced features and optimizations.'
        },
        {
          id: 'Financial Banking',
          name: 'Financial Banking',
          icon: '🏦',
          color: '#f59e0b',
          description: 'Core banking system with transaction processing and account management.'
        },
        {
          id: 'Credit Card Portal',
          name: 'Credit Card Portal',
          icon: '💳',
          color: '#ec4899',
          description: 'Credit card management portal with transaction tracking, rewards, and payment processing.'
        },
        {
          id: 'Credit Card Portal 2',
          name: 'Credit Card Portal 2',
          icon: '💎',
          color: '#a855f7',
          description: 'Enhanced credit card portal with advanced analytics, fraud detection, and premium features.'
        },
        {
          id: 'Credit Card Portal 3',
          name: 'Credit Card Portal 3',
          icon: '🏗️',
          color: '#0891b2',
          description: 'System design interview preparation - Complete CQRS, Event Sourcing, Saga patterns for 10M users.'
        },
        {
          id: 'Virtual Numbers',
          name: 'Virtual Numbers',
          icon: '🔢',
          color: '#14b8a6',
          description: 'Deep dive into credit card number structure, network identifiers, Luhn Algorithm validation, and payment card industry standards.'
        }
      ]
    },
    {
      title: 'System Design Projects',
      icon: '🏛️',
      color: '#3b82f6',
      projects: [
        {
          id: 'Ride Share',
          name: 'Ride Share',
          icon: '🚗',
          color: '#10b981',
          description: 'Fault-tolerant ride sharing platform with real-time matching, geospatial routing, and high availability architecture.'
        },
        {
          id: 'Google Docs',
          name: 'Google Docs',
          icon: '📝',
          color: '#3b82f6',
          description: 'Understand the System Design of Google Docs, using different techniques to address storage, collaborative editing, and concurrency issues.'
        },
        {
          id: 'YouTube',
          name: 'YouTube',
          icon: '▶️',
          color: '#ff0000',
          description: 'Design a video streaming platform like YouTube. Handle video upload, transcoding, CDN delivery, recommendations, and scalability for millions of users.'
        },
        {
          id: 'Newsfeed System',
          name: 'Newsfeed System',
          icon: '📰',
          color: '#1877f2',
          description: 'Design a scalable newsfeed system like Facebook or Twitter. Handle fan-out strategies, ranking algorithms, real-time updates, and personalized content delivery.'
        },
        {
          id: 'TinyURL',
          name: 'TinyURL',
          icon: '🔗',
          color: '#06b6d4',
          description: 'Design a URL shortening service like TinyURL or Bitly. Handle short URL generation, redirection, analytics, rate limiting, and high-volume traffic.'
        },
        {
          id: 'WhatsApp',
          name: 'WhatsApp',
          icon: '💬',
          color: '#25d366',
          description: 'Design a messaging platform like WhatsApp. Handle real-time messaging, end-to-end encryption, group chats, media sharing, and billions of messages daily.'
        },
        {
          id: 'Type Ahead System',
          name: 'Type Ahead System',
          icon: '🔍',
          color: '#8b5cf6',
          description: 'Design an autocomplete/type-ahead system like Google Search. Handle prefix matching, ranking, caching, real-time suggestions, and billions of queries.'
        },
        {
          id: 'Instagram',
          name: 'Instagram',
          icon: '📸',
          color: '#e1306c',
          description: 'Design a photo-sharing platform like Instagram. Handle image upload/storage, feed generation, stories, likes/comments, followers, and billion-user scale.'
        },
        {
          id: 'Netflix',
          name: 'Netflix',
          icon: '🎬',
          color: '#e50914',
          description: 'Design a video streaming platform like Netflix. Handle video encoding, CDN architecture, personalized recommendations, adaptive bitrate streaming, and global scale for 200M+ users.'
        },
        {
          id: 'Twitter',
          name: 'Twitter/X',
          icon: '🐦',
          color: '#1da1f2',
          description: 'Design a social media platform like Twitter. Handle real-time tweets, timeline generation, trending topics, fan-out strategies, and billions of daily interactions.'
        },
        {
          id: 'Amazon',
          name: 'Amazon E-Commerce',
          icon: '🛒',
          color: '#ff9900',
          description: 'Design an e-commerce platform like Amazon. Handle product catalog, inventory management, shopping cart, order processing, payment gateway, and millions of SKUs.'
        },
        {
          id: 'Zoom',
          name: 'Zoom',
          icon: '📹',
          color: '#2d8cff',
          description: 'Design a video conferencing platform like Zoom. Handle WebRTC, real-time communication, screen sharing, recording, and scalable meetings for 1000+ participants.'
        },
        {
          id: 'Dropbox',
          name: 'Dropbox',
          icon: '📁',
          color: '#0061ff',
          description: 'Design a file storage and sync service like Dropbox. Handle file chunking, deduplication, conflict resolution, version history, and cross-device synchronization.'
        },
        {
          id: 'Notification System',
          name: 'Notification System',
          icon: '🔔',
          color: '#f59e0b',
          description: 'Design a scalable notification system. Handle push notifications, email, SMS, rate limiting, prioritization, delivery guarantees, and millions of notifications per second.'
        },
        {
          id: 'Rate Limiter',
          name: 'Rate Limiter',
          icon: '⏱️',
          color: '#8b5cf6',
          description: 'Design a distributed rate limiting system. Handle token bucket, sliding window algorithms, Redis-based implementation, and protect APIs from abuse at scale.'
        },
        {
          id: 'Food Delivery',
          name: 'Food Delivery',
          icon: '🍕',
          color: '#ff6347',
          description: 'Design a food delivery platform like Uber Eats. Handle restaurant discovery, real-time order tracking, driver routing, geospatial indexing, and dynamic pricing.'
        }
      ]
    },
    {
      title: 'Enterprise & Healthcare',
      icon: '🏢',
      color: '#8b5cf6',
      projects: [
        {
          id: 'Medi/Health',
          name: 'Medi/Health',
          icon: '🏥',
          color: '#ef4444',
          description: 'Healthcare management system with patient records and appointment scheduling.'
        },
        {
          id: 'Monolith to Microservice',
          name: 'Monolith to Microservice',
          icon: '🔄',
          color: '#8b5cf6',
          description: 'Migration journey from monolithic architecture to microservices-based system.'
        }
      ]
    },
    {
      title: 'Mobile & IoT',
      icon: '📱',
      color: '#0ea5e9',
      projects: [
        {
          id: 'Mobile Weather App',
          name: 'Mobile Weather App',
          icon: '🌤️',
          color: '#0ea5e9',
          description: 'Mobile weather application with real-time weather data, forecasts, location services, and weather alerts. Integrates with weather APIs and displays interactive weather maps.'
        },
        {
          id: 'Apartment Alarm System',
          name: 'Apartment Alarm System',
          icon: '🚨',
          color: '#dc2626',
          description: 'IoT-based security alarm system for apartment buildings. Real-time monitoring, sensor integration, mobile alerts, access control, and emergency response coordination.'
        }
      ]
    },
    {
      title: 'Interview Preparation',
      icon: '🎯',
      color: '#8b5cf6',
      projects: [
        {
          id: 'AI Interview Tips',
          name: 'AI-Enabled Technical Interview',
          icon: '🤖',
          color: '#8b5cf6',
          description: 'Master the art of AI-assisted technical interviews. Learn strategies for coding with AI tools, effective prompting, debugging approaches, and how to demonstrate your skills when AI is part of the interview process.'
        }
      ]
    },
    {
      title: 'Java Internals',
      icon: '☕',
      color: '#f97316',
      projects: [
        {
          id: 'HashMap - Internal Workings',
          name: 'HashMap - Internal Workings',
          icon: '🗺️',
          color: '#f97316',
          description: 'Deep dive into Java HashMap: hash function, bucket array, collision handling with chaining, treeification (Java 8+), load factor, and resizing. Essential for FAANG interviews.'
        },
        {
          id: 'Blocking Queue',
          name: 'Blocking Queue',
          icon: '🚦',
          color: '#eab308',
          description: 'Master Java BlockingQueue: producer-consumer pattern, ArrayBlockingQueue vs LinkedBlockingQueue, put/take operations, and custom implementation with ReentrantLock and Conditions.'
        },
        {
          id: 'ConcurrentHashMap - Internal Workings',
          name: 'ConcurrentHashMap - Internal Workings',
          icon: '🔐',
          color: '#22c55e',
          description: 'Understand ConcurrentHashMap internals: lock-free reads, per-bucket locking, CAS operations, Java 7 segments vs Java 8+ node locking, and size counting with CounterCells.'
        },
        {
          id: 'ThreadPoolExecutor - Internal Workings',
          name: 'ThreadPoolExecutor - Internal Workings',
          icon: '⚙️',
          color: '#3b82f6',
          description: 'Master ThreadPoolExecutor: 7 core parameters, work queue types, rejection policies, ctl field internals, Worker class, task execution flow, and shutdown mechanisms.'
        },
        {
          id: 'CompletableFuture - Internal Workings',
          name: 'CompletableFuture - Internal Workings',
          icon: '🔮',
          color: '#8b5cf6',
          description: 'Deep dive into CompletableFuture: async composition, completion stages, thenApply vs thenCompose, exception handling, allOf/anyOf, and internal stack-based completion mechanism.'
        },
        {
          id: 'ArrayList - Internal Workings',
          name: 'ArrayList - Internal Workings',
          icon: '📋',
          color: '#06b6d4',
          description: 'Master ArrayList internals: dynamic array growth (1.5x), amortized O(1) add, element shifting, fail-fast iterators, and ArrayList vs LinkedList comparison.'
        },
        {
          id: 'LinkedHashMap - Internal Workings',
          name: 'LinkedHashMap - Internal Workings',
          icon: '🔗',
          color: '#14b8a6',
          description: 'Understand LinkedHashMap: insertion vs access order, doubly-linked list, LRU cache implementation, removeEldestEntry, and when to use over HashMap.'
        },
        {
          id: 'ReentrantLock - Internal Workings',
          name: 'ReentrantLock - Internal Workings',
          icon: '🔒',
          color: '#ef4444',
          description: 'Master ReentrantLock: AQS framework, fair vs non-fair locks, CLH queue, Conditions, lock interruptibly, tryLock, and comparison with synchronized.'
        },
        {
          id: 'Atomic & CAS - Internal Workings',
          name: 'Atomic & CAS - Internal Workings',
          icon: '⚛️',
          color: '#a855f7',
          description: 'Deep dive into AtomicInteger, CAS operations, lock-free programming, ABA problem, AtomicReference, and LongAdder for high-contention counting.'
        },
        {
          id: 'String Pool - Internal Workings',
          name: 'String Pool - Internal Workings',
          icon: '📝',
          color: '#f59e0b',
          description: 'Understand String Pool: interning, immutability benefits, compile-time optimization, Compact Strings (Java 9+), and memory tuning.'
        },
        {
          id: 'JVM Memory Model',
          name: 'JVM Memory Model',
          icon: '🧠',
          color: '#ec4899',
          description: 'Master JVM memory: heap, stack, metaspace, object layout, volatile visibility, happens-before relationships, and memory barriers.'
        },
        {
          id: 'TreeMap - Internal Workings',
          name: 'TreeMap - Internal Workings',
          icon: '🌳',
          color: '#84cc16',
          description: 'Understand TreeMap: Red-Black tree implementation, O(log n) operations, tree rotations, NavigableMap methods, and when to use over HashMap.'
        },
        {
          id: 'Garbage Collection',
          name: 'Garbage Collection',
          icon: '🗑️',
          color: '#6366f1',
          description: 'Master GC: generational collection, G1/ZGC/Shenandoah collectors, GC roots, marking algorithms, tuning, and choosing the right collector.'
        },
        {
          id: 'Virtual Threads (Java 21)',
          name: 'Virtual Threads (Java 21)',
          icon: '🧵',
          color: '#0ea5e9',
          description: 'Understand Virtual Threads: Project Loom, carrier threads, thread pinning, million-thread scalability, structured concurrency, and migration from platform threads.'
        },
        {
          id: 'Synchronized Internals',
          name: 'Synchronized Internals',
          icon: '🔐',
          color: '#dc2626',
          description: 'Master synchronized: object monitors, Mark Word, biased/thin/fat locks, lock inflation, wait/notify, and comparison with ReentrantLock.'
        },
        {
          id: 'PriorityQueue - Internal Workings',
          name: 'PriorityQueue - Internal Workings',
          icon: '📊',
          color: '#0891b2',
          description: 'Deep dive into PriorityQueue: binary heap in array, sift up/down operations, heapify algorithm, and common interview patterns.'
        },
        {
          id: 'ForkJoinPool - Internal Workings',
          name: 'ForkJoinPool - Internal Workings',
          icon: '🔀',
          color: '#7c3aed',
          description: 'Master ForkJoinPool: work-stealing algorithm, fork/join operations, RecursiveTask vs RecursiveAction, and parallel stream internals.'
        },
        {
          id: 'CountDownLatch & CyclicBarrier',
          name: 'CountDownLatch & CyclicBarrier',
          icon: '🚦',
          color: '#059669',
          description: 'Understand thread synchronization: CountDownLatch for one-time events, CyclicBarrier for reusable sync points, and Phaser for advanced coordination.'
        },
        {
          id: 'Semaphore - Internal Workings',
          name: 'Semaphore - Internal Workings',
          icon: '🎫',
          color: '#ea580c',
          description: 'Deep dive into Semaphore: permit-based synchronization, fair vs non-fair modes, connection pooling patterns, and rate limiting.'
        },
        {
          id: 'Class Loading',
          name: 'Class Loading',
          icon: '📦',
          color: '#4f46e5',
          description: 'Master JVM class loading: loading phases, delegation model, custom ClassLoaders, Metaspace, and class unloading.'
        },
        {
          id: 'Java NIO',
          name: 'Java NIO',
          icon: '📡',
          color: '#0284c7',
          description: 'Deep dive into Java NIO: ByteBuffer internals, channels and selectors, non-blocking I/O, memory-mapped files, and high-performance networking.'
        }
      ]
    }
  ]

  // Flatten for navigation
  const projectItems = projectGroups.flatMap(group => group.projects)

  const { focusedIndex, itemRefs } = useKeyboardNavigation({
    items: projectItems,
    onSelect: (item) => onSelectItem(item.id),
    onBack,
    enabled: true,
    gridColumns: 3,
    loop: true
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #134e4a, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <button
              onClick={onBack}
              style={{
                background: '#0d9488',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500',
                fontSize: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#0f766e'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0d9488'
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              ← Back to Menu
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #2dd4bf, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              💼 My Projects
            </h1>
          </div>
        </div>

        {/* Dark themed Breadcrumb */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'rgba(13, 148, 136, 0.1)',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          border: '1px solid rgba(13, 148, 136, 0.3)'
        }}>
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              color: '#2dd4bf',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(13, 148, 136, 0.2)'
              e.currentTarget.style.color = '#5eead4'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#2dd4bf'
            }}
          >
            <span>💼</span> My Projects
          </button>
          <span style={{ color: '#0d9488', fontSize: '0.9rem' }}>→</span>
          <span style={{
            color: '#e2e8f0',
            fontSize: '0.9rem',
            fontWeight: '600',
            padding: '0.25rem 0.75rem',
            backgroundColor: 'rgba(13, 148, 136, 0.2)',
            borderRadius: '4px'
          }}>
            Project Gallery
          </span>
        </div>

        <p style={{
          fontSize: '1.2rem',
          color: '#d1d5db',
          textAlign: 'center',
          marginBottom: '3rem',
          lineHeight: '1.8'
        }}>
          Real-world projects spanning financial systems, healthcare, and enterprise applications showcasing practical implementations.
        </p>

      {projectGroups.map((group, groupIndex) => {
        const groupStartIndex = projectGroups
          .slice(0, groupIndex)
          .reduce((sum, g) => sum + g.projects.length, 0)

        return (
          <div key={group.title} style={{ marginBottom: '2.5rem' }}>
            {/* Group Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
              padding: '1rem 1.5rem',
              background: 'linear-gradient(to right, rgba(31, 41, 55, 0.9), rgba(17, 24, 39, 0.9))',
              borderRadius: '0.75rem',
              borderLeft: `4px solid ${group.color}`,
              boxShadow: `0 4px 15px -3px ${group.color}30`
            }}>
              <span style={{ fontSize: '2rem' }}>{group.icon}</span>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: group.color,
                margin: 0
              }}>
                {group.title}
              </h2>
              <span style={{
                fontSize: '0.875rem',
                color: '#9ca3af',
                marginLeft: 'auto'
              }}>
                {group.projects.length} {group.projects.length === 1 ? 'project' : 'projects'}
              </span>
            </div>

            {/* Dropdown or Project Cards */}
            {group.isDropdown ? (
              <div style={{ marginBottom: '1rem' }}>
                <select
                  value={selectedConcept}
                  onChange={(e) => {
                    setSelectedConcept(e.target.value)
                    if (e.target.value) {
                      onSelectItem(e.target.value)
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#e5e7eb',
                    backgroundColor: '#1f2937',
                    border: `2px solid ${group.color}`,
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    outline: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = group.color
                    e.target.style.boxShadow = `0 0 0 3px ${group.color}40, 0 4px 6px rgba(0,0,0,0.1)`
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = group.color
                    e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <option value="">Select a concept to learn...</option>
                  {group.projects.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.icon} {item.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                {group.projects.map((item, projIndex) => {
                  const index = groupStartIndex + projIndex
                  return (
                    <button
                      key={item.id}
                      ref={(el) => itemRefs.current[index] = el}
                      onClick={() => onSelectItem(item.id)}
                      tabIndex={focusedIndex === index ? 0 : -1}
                      role="link"
                      aria-label={`${item.name}. ${item.description}`}
                      style={{
                        background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        border: `2px solid ${item.color}`,
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        transform: focusedIndex === index ? 'translateY(-0.5rem)' : 'translateY(0)',
                        boxShadow: focusedIndex === index
                          ? `0 25px 50px -12px ${item.color}50`
                          : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        textAlign: 'left',
                        width: '100%'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-0.5rem)'
                        e.currentTarget.style.boxShadow = `0 25px 50px -12px ${item.color}50`
                      }}
                      onMouseLeave={(e) => {
                        if (focusedIndex !== index) {
                          e.currentTarget.style.transform = 'translateY(0)'
                          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1rem'
                      }}>
                        <span style={{ fontSize: '2.5rem' }}>{item.icon}</span>
                        <div>
                          <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            color: '#5eead4',
                            marginBottom: '0.25rem'
                          }}>
                            {item.name}
                          </h3>
                        </div>
                      </div>

                      <p style={{
                        fontSize: '0.9rem',
                        color: '#d1d5db',
                        lineHeight: '1.6',
                        marginBottom: '1rem'
                      }}>
                        {item.description}
                      </p>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        color: item.color,
                        fontWeight: '600',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid #374151'
                      }}>
                        <span>Explore Project</span>
                        <span>→</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default MyProjects

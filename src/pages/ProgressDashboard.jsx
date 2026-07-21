import { useState, useEffect } from 'react'
import { getCompletedProblems } from '../services/progressService'
import { getBookmarks } from '../services/bookmarkService'
import { getCurrentUser } from '../services/authService'
import Breadcrumb from '../components/Breadcrumb'
import WeeklyProgressChart from '../components/charts/WeeklyProgressChart'
import ActivityHeatmap from '../components/charts/ActivityHeatmap'
import { useTheme } from '../contexts/ThemeContext'

function ProgressDashboard({ onBack, onNavigate }) {
  const { colors, isDark } = useTheme()
  const currentUser = getCurrentUser()
  const [completedProblems, setCompletedProblems] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [, setRefreshKey] = useState(0)
  const [expandedSections, setExpandedSections] = useState({})
  const [initialExpandSet, setInitialExpandSet] = useState(false)
  const [pathSubTab, setPathSubTab] = useState('top100')

  useEffect(() => {
    loadData()

    const handleProgressUpdate = () => {
      setRefreshKey(prev => prev + 1)
      loadData()
    }
    const handleBookmarkUpdate = () => loadData()

    window.addEventListener('progressUpdate', handleProgressUpdate)
    window.addEventListener('bookmarkUpdate', handleBookmarkUpdate)

    return () => {
      window.removeEventListener('progressUpdate', handleProgressUpdate)
      window.removeEventListener('bookmarkUpdate', handleBookmarkUpdate)
    }
  }, [])

  // Find and expand the next incomplete section (only once on initial load)
  useEffect(() => {
    if (initialExpandSet || completedProblems.length === 0 && !initialExpandSet) {
      // If no progress yet, expand first section
      if (!initialExpandSet && completedProblems.length === 0) {
        setExpandedSections({ 0: true })
        setInitialExpandSet(true)
      }
      return
    }

    // Find the first section that is not 100% complete
    const getTopicProgressLocal = (topicName) => {
      const topicIdMap = {
        'Binary Search': 'BinarySearch',
        'Dynamic Programming': 'DynamicProgramming',
        'Dynamic Programming Patterns': 'DynamicProgrammingPatterns',
        'Hash Tables': 'HashTables',
        'Linked Lists': 'LinkedLists',
        'Two Pointers': 'TwoPointers',
        'Sliding Window': 'SlidingWindow',
        'Binary Trees': 'BinaryTrees',
        'Binary Search Trees': 'BinarySearchTrees',
        'Advanced Graphs': 'AdvancedGraphs',
        'Greedy Algorithms': 'GreedyAlgorithms',
        'Bit Manipulation': 'BitManipulation',
        'Union Find': 'UnionFind',
        'Math & Geometry': 'MathGeometry',
        'Famous Algorithms': 'FamousAlgorithms',
        'Data Structures': 'DataStructures',
        'Streams Advanced': 'StreamsAdvanced',
        'Lambdas Advanced': 'LambdasAdvanced',
        'Functional Interfaces': 'FunctionalInterfaces',
        'Collections Framework': 'CollectionsFramework',
        'Object-Oriented Programming': 'ObjectOrientedProgramming',
        'Exception Handling': 'ExceptionHandling',
        'File I/O': 'FileIO',
        'JVM Internals': 'JVMInternals',
        'Memory Management': 'MemoryManagement',
        'Java 8': 'Java8', 'Java 11': 'Java11', 'Java 15': 'Java15',
        'Java 21': 'Java21', 'Java 24': 'Java24',
        'Core Java Questions': 'CoreJavaQuestions',
        'Java 8 Questions': 'Java8Questions',
        'Java 11 Questions': 'Java11Questions',
        'Java 15 Questions': 'Java15Questions',
        'Java 21 Questions': 'Java21Questions',
        'Java 24 Questions': 'Java24Questions',
        'Spring Core Questions': 'SpringCoreQuestions',
        'Spring Boot Questions': 'SpringBootQuestions',
        'Spring Security Questions': 'SpringSecurityQuestions',
        'Spring Data JPA Questions': 'SpringDataJPAQuestions',
        'Spring Annotations Questions': 'SpringAnnotationsQuestions',
        'SQL Questions': 'SQLQuestions',
        'NoSQL Questions': 'NoSQLQuestions',
        'ORM Questions': 'ORMQuestions',
        'Hibernate Questions': 'HibernateQuestions',
        'PostgreSQL Questions': 'PostgreSQLQuestions',
        'SQL Fundamentals Questions': 'SQLFundamentalsQuestions',
        'Kafka Questions': 'KafkaQuestions',
        'RabbitMQ Questions': 'RabbitMQQuestions',
        'Solace Questions': 'SolaceQuestions',
        'Apache Flink Questions': 'ApacheFlinkQuestions',
        'Jenkins Questions': 'JenkinsQuestions',
        'TeamCity Questions': 'TeamCityQuestions',
        'Prometheus Questions': 'PrometheusQuestions',
        'Grafana Questions': 'GrafanaQuestions',
        'Zipkin Questions': 'ZipkinQuestions',
        'Actuator Questions': 'ActuatorQuestions',
        'REST API Questions': 'RestAPIQuestions',
        'eTrading Questions': 'EtradingQuestions',
        'System Design Questions': 'SystemDesignQuestions',
      }
      const prefix = topicIdMap[topicName] || topicName
      return completedProblems.filter(id => id.startsWith(prefix)).length
    }

    // Use the appropriate learning path based on selected tab
    // When user switches tabs, initialExpandSet is reset which re-triggers this
    const activePath = pathSubTab === 'top100' ? top100Path : pathSubTab === 'top400' ? top400Path : learningPath
    let nextSectionIdx = 0
    for (let i = 0; i < activePath.length; i++) {
      const section = activePath[i]
      const sectionCompleted = section.topics.reduce((sum, t) => sum + getTopicProgressLocal(t.name), 0)
      const sectionTotal = section.topics.reduce((sum, t) => sum + t.problems, 0)
      const sectionPercent = sectionTotal > 0 ? Math.round((sectionCompleted / sectionTotal) * 100) : 0

      if (sectionPercent < 100) {
        nextSectionIdx = i
        break
      }
      // If all sections are complete, show the last one
      if (i === activePath.length - 1) {
        nextSectionIdx = i
      }
    }

    setExpandedSections({ [nextSectionIdx]: true })
    setInitialExpandSet(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedProblems, initialExpandSet, pathSubTab])

  const loadData = () => {
    const completed = getCompletedProblems()
    setCompletedProblems(completed)
    setBookmarks(getBookmarks())
  }

  // Convert problemId to page name for navigation
  const getPageNameFromProblemId = (problemId) => {
    // problemId format: PageName-number
    // e.g., "Arrays-1" -> "Arrays"
    // e.g., "Dynamic Programming-5" -> "Dynamic Programming"
    // e.g., "Hash Tables-3" -> "Hash Tables"

    // Find the last dash followed by a number
    const lastDashIndex = problemId.lastIndexOf('-')
    if (lastDashIndex > 0) {
      const afterDash = problemId.substring(lastDashIndex + 1)
      // Check if what's after the dash is a number
      if (/^\d+$/.test(afterDash)) {
        // Return everything before the last dash
        return problemId.substring(0, lastDashIndex)
      }
    }
    // If no number found, return as-is
    return problemId
  }

  const handleProblemClick = (problemId) => {
    const pageName = getPageNameFromProblemId(problemId)
    if (onNavigate) {
      onNavigate(pageName)
    }
  }

  // Parse problem IDs to extract categories
  const parseCategory = (problemId) => {
    // Use the same logic as getPageNameFromProblemId to extract category name
    const lastDashIndex = problemId.lastIndexOf('-')
    if (lastDashIndex > 0) {
      const afterDash = problemId.substring(lastDashIndex + 1)
      // Check if what's after the dash is a number
      if (/^\d+$/.test(afterDash)) {
        // Return everything before the last dash as the category
        return problemId.substring(0, lastDashIndex)
      }
    }
    return problemId
  }

  // Group completed problems by category
  const completedByCategory = completedProblems.reduce((acc, problemId) => {
    const category = parseCategory(problemId)
    if (!acc[category]) acc[category] = []
    acc[category].push(problemId)
    return acc
  }, {})

  // Calculate statistics
  const totalCompleted = completedProblems.length
  const totalBookmarked = bookmarks.length
  const categoriesStarted = Object.keys(completedByCategory).length

  // Recent activity (last 10)
  const recentActivity = [...completedProblems].slice(-10).reverse()

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'path', label: 'Learning Path', icon: '🎯' },
    { id: 'completed', label: 'Completed', icon: '✅' },
    { id: 'bookmarks', label: 'Bookmarks', icon: '⭐' },
  ]

  // Learning path - topics ordered from easiest to hardest
  const learningPath = [
    // Fundamentals (Easiest)
    { category: 'Fundamentals', difficulty: 'Beginner', color: '#10b981', topics: [
      { name: 'Arrays', problems: 21, icon: '📊', description: 'Basic array operations and manipulations' },
      { name: 'Strings', problems: 11, icon: '📝', description: 'String manipulation and pattern matching' },
      { name: 'Hash Tables', problems: 11, icon: '#️⃣', description: 'Hash maps, sets, and frequency counting' },
      { name: 'Stacks', problems: 8, icon: '📚', description: 'LIFO data structure and applications' },
      { name: 'Queues', problems: 4, icon: '🚶', description: 'FIFO data structure and BFS preparation' },
    ]},
    // Core Algorithms (Easy-Medium)
    { category: 'Core Algorithms', difficulty: 'Easy-Medium', color: '#3b82f6', topics: [
      { name: 'Two Pointers', problems: 5, icon: '👆', description: 'Efficient array traversal techniques' },
      { name: 'Sliding Window', problems: 9, icon: '🪟', description: 'Subarray and substring problems' },
      { name: 'Binary Search', problems: 5, icon: '🔍', description: 'Efficient searching in sorted data' },
      { name: 'Searching', problems: 2, icon: '🔎', description: 'Linear and binary search algorithms' },
      { name: 'Sorting', problems: 4, icon: '📈', description: 'Sorting algorithms and applications' },
      { name: 'Linked Lists', problems: 12, icon: '🔗', description: 'Node-based data structures' },
    ]},
    // Intermediate (Medium)
    { category: 'Intermediate', difficulty: 'Medium', color: '#f59e0b', topics: [
      { name: 'Trees', problems: 6, icon: '🌳', description: 'Tree traversals and manipulations' },
      { name: 'Binary Trees', problems: 17, icon: '🌲', description: 'Binary tree specific algorithms' },
      { name: 'Binary Search Trees', problems: 3, icon: '🌿', description: 'BST operations and properties' },
      { name: 'Heaps', problems: 6, icon: '⛰️', description: 'Priority queues and heap operations' },
      { name: 'Math & Geometry', problems: 9, icon: '📐', description: 'Mathematical and geometric algorithms' },
    ]},
    // Advanced Data Structures (Medium-Hard)
    { category: 'Advanced Data Structures', difficulty: 'Medium-Hard', color: '#8b5cf6', topics: [
      { name: 'Graphs', problems: 9, icon: '🕸️', description: 'Graph traversal and basic algorithms' },
      { name: 'Trie', problems: 5, icon: '🔤', description: 'Prefix trees for string operations' },
      { name: 'Union Find', problems: 4, icon: '🔗', description: 'Disjoint set data structure' },
      { name: 'Intervals', problems: 7, icon: '📏', description: 'Interval merging and scheduling' },
      { name: 'Data Structures', problems: 1, icon: '🏗️', description: 'Custom data structure implementations' },
    ]},
    // Advanced Algorithms (Hard)
    { category: 'Advanced Algorithms', difficulty: 'Hard', color: '#ef4444', topics: [
      { name: 'Dynamic Programming', problems: 17, icon: '🧩', description: 'Optimization and memoization' },
      { name: 'Dynamic Programming Patterns', problems: 89, icon: '🎨', description: 'Advanced DP patterns and techniques' },
      { name: 'Backtracking', problems: 11, icon: '↩️', description: 'Exhaustive search with pruning' },
      { name: 'Greedy Algorithms', problems: 4, icon: '🎯', description: 'Local optimal choices' },
      { name: 'Advanced Graphs', problems: 5, icon: '🗺️', description: 'Shortest paths, MST, topological sort' },
      { name: 'Bit Manipulation', problems: 7, icon: '💻', description: 'Binary operations and tricks' },
      { name: 'Famous Algorithms', problems: 3, icon: '🏆', description: 'Classic algorithms every developer should know' },
    ]},
    // Java Features
    { category: 'Java Features', difficulty: 'Intermediate', color: '#f97316', topics: [
      { name: 'Streams', problems: 0, icon: '🌊', description: 'Java Stream API for functional data processing' },
      { name: 'Streams Advanced', problems: 0, icon: '🌀', description: 'Advanced stream operations and collectors' },
      { name: 'Lambdas', problems: 4, icon: 'λ', description: 'Lambda expressions and method references' },
      { name: 'Lambdas Advanced', problems: 0, icon: '⚡', description: 'Advanced lambda patterns and techniques' },
      { name: 'Functional Interfaces', problems: 4, icon: '🔗', description: 'Predicate, Function, Consumer, Supplier' },
      { name: 'Collections Framework', problems: 0, icon: '📦', description: 'Lists, Sets, Maps, and Queues' },
      { name: 'Optional', problems: 0, icon: '❓', description: 'Null-safe programming with Optional' },
    ]},
    // Modern Java Versions
    { category: 'Modern Java Versions', difficulty: 'Intermediate-Advanced', color: '#0ea5e9', topics: [
      { name: 'Java 8', problems: 0, icon: '🎯', description: 'Lambdas, Streams, Optional, Date/Time API' },
      { name: 'Java 11', problems: 0, icon: '🔧', description: 'HTTP Client, var keyword, String methods' },
      { name: 'Java 15', problems: 0, icon: '📝', description: 'Text blocks, sealed classes preview, records preview' },
      { name: 'Java 21', problems: 0, icon: '🚀', description: 'Virtual threads, pattern matching, sequenced collections' },
      { name: 'Java 24', problems: 0, icon: '🔮', description: 'Preview features and experimental capabilities' },
    ]},
    // Core Java Fundamentals
    { category: 'Core Java Fundamentals', difficulty: 'Beginner-Intermediate', color: '#06b6d4', topics: [
      { name: 'Object-Oriented Programming', problems: 0, icon: '🎭', description: 'Classes, inheritance, polymorphism, encapsulation' },
      { name: 'Exception Handling', problems: 0, icon: '⚠️', description: 'Try-catch, custom exceptions, best practices' },
      { name: 'File I/O', problems: 6, icon: '📁', description: 'File reading, writing, and NIO' },
      { name: 'Generics', problems: 4, icon: '🔷', description: 'Type parameters and generic programming' },
      { name: 'JVM Internals', problems: 5, icon: '⚙️', description: 'JVM architecture, class loading, bytecode' },
      { name: 'Memory Management', problems: 4, icon: '🧠', description: 'Heap, stack, garbage collection' },
    ]},
    // Concurrency
    { category: 'Concurrency', difficulty: 'Advanced', color: '#a855f7', topics: [
      { name: 'Concurrency', problems: 0, icon: '🔀', description: 'Concurrent programming fundamentals' },
      { name: 'Multithreading', problems: 0, icon: '🧵', description: 'Threads, synchronization, locks' },
    ]},
    // Python Operations
    { category: 'Python Operations', difficulty: 'Beginner', color: '#22c55e', topics: [
      { name: 'Set Operations', problems: 0, icon: '🔢', description: 'Python set operations and methods' },
      { name: 'Map Operations', problems: 0, icon: '🗺️', description: 'Dictionary operations and comprehensions' },
    ]},
    // System Design Fundamentals
    { category: 'System Design Fundamentals', difficulty: 'Intermediate', color: '#ec4899', topics: [
      { name: 'System Design', problems: 3, icon: '🏗️', description: 'System design overview and methodology' },
      { name: 'CAP Theorem', problems: 2, icon: '⚖️', description: 'Consistency, Availability, Partition tolerance' },
      { name: 'Scaling', problems: 2, icon: '📈', description: 'Horizontal and vertical scaling strategies' },
      { name: 'Load Balancing', problems: 2, icon: '⚡', description: 'Load balancer types and algorithms' },
      { name: 'Caching Strategies', problems: 2, icon: '💨', description: 'Cache patterns, eviction policies, CDN' },
      { name: 'CDN', problems: 2, icon: '🌐', description: 'Content Delivery Networks and edge caching' },
      { name: 'Proxies', problems: 2, icon: '🔀', description: 'Forward and reverse proxy patterns' },
    ]},
    // Data & Storage
    { category: 'Data & Storage', difficulty: 'Intermediate-Advanced', color: '#8b5cf6', topics: [
      { name: 'Database Sharding', problems: 2, icon: '🔪', description: 'Horizontal partitioning strategies' },
      { name: 'Database Replication', problems: 2, icon: '📋', description: 'Master-slave, multi-master replication' },
      { name: 'Data Partitioning', problems: 2, icon: '📊', description: 'Partitioning schemes and strategies' },
      { name: 'SQL vs NoSQL', problems: 2, icon: '🗄️', description: 'When to use relational vs non-relational' },
      { name: 'Consistent Hashing', problems: 2, icon: '🔄', description: 'Distributed hash tables and ring hashing' },
      { name: 'Blob Storage', problems: 2, icon: '📦', description: 'Object storage for unstructured data' },
    ]},
    // Communication & APIs
    { category: 'Communication & APIs', difficulty: 'Intermediate', color: '#06b6d4', topics: [
      { name: 'API Design', problems: 2, icon: '🔌', description: 'RESTful API design principles' },
      { name: 'Message Queues', problems: 2, icon: '📬', description: 'Async messaging patterns and brokers' },
      { name: 'WebSockets', problems: 2, icon: '🔗', description: 'Real-time bidirectional communication' },
      { name: 'Event Driven', problems: 2, icon: '📡', description: 'Event-driven architecture basics' },
    ]},
    // Architecture Patterns
    { category: 'Architecture Patterns', difficulty: 'Advanced', color: '#f97316', topics: [
      { name: 'Microservices', problems: 2, icon: '🧩', description: 'Microservices architecture principles' },
      { name: 'Microservice Patterns', problems: 3, icon: '📐', description: 'Saga, CQRS, Event Sourcing patterns' },
      { name: 'Domain Driven Design', problems: 2, icon: '🎯', description: 'DDD concepts and bounded contexts' },
      { name: 'Event Driven Architecture', problems: 2, icon: '⚡', description: 'Event sourcing and stream processing' },
      { name: 'Design Patterns', problems: 3, icon: '🏛️', description: 'Gang of Four design patterns' },
    ]},
    // System Design Components
    { category: 'System Design Components', difficulty: 'Advanced', color: '#10b981', topics: [
      { name: 'LRU Cache', problems: 7, icon: '💾', description: 'Least Recently Used cache implementation' },
      { name: 'Rate Limiter', problems: 6, icon: '⏱️', description: 'Rate limiting algorithms and implementations' },
      { name: 'Notification System', problems: 6, icon: '🔔', description: 'Push notifications architecture' },
      { name: 'TypeAhead', problems: 5, icon: '🔍', description: 'Autocomplete and search suggestions' },
    ]},
    // System Design Case Studies
    { category: 'System Design Case Studies', difficulty: 'Advanced', color: '#ef4444', topics: [
      { name: 'Twitter', problems: 5, icon: '🐦', description: 'Social media platform design' },
      { name: 'Netflix', problems: 6, icon: '🎬', description: 'Video streaming service design' },
      { name: 'Instagram', problems: 8, icon: '📷', description: 'Photo sharing platform design' },
      { name: 'YouTube', problems: 5, icon: '▶️', description: 'Video platform architecture' },
      { name: 'WhatsApp', problems: 7, icon: '💬', description: 'Messaging app design' },
      { name: 'Zoom', problems: 9, icon: '📹', description: 'Video conferencing system' },
      { name: 'Dropbox', problems: 7, icon: '📁', description: 'File storage and sync service' },
      { name: 'Amazon', problems: 7, icon: '🛒', description: 'E-commerce platform design' },
      { name: 'Google Docs', problems: 5, icon: '📝', description: 'Collaborative editing system' },
      { name: 'RideShare', problems: 5, icon: '🚗', description: 'Ride-sharing service design' },
    ]},
    // Java Interview Questions
    { category: 'Java Interview Questions', difficulty: 'Intermediate', color: '#f97316', topics: [
      { name: 'Core Java Questions', problems: 12, icon: '📚', description: 'Core Java fundamentals and concepts' },
      { name: 'Java 8 Questions', problems: 15, icon: '🎯', description: 'Java 8 features interview questions' },
      { name: 'Java 11 Questions', problems: 8, icon: '🔧', description: 'Java 11 features interview questions' },
      { name: 'Java 15 Questions', problems: 8, icon: '📝', description: 'Java 15 features interview questions' },
      { name: 'Java 21 Questions', problems: 8, icon: '🚀', description: 'Java 21 features interview questions' },
      { name: 'Java 24 Questions', problems: 4, icon: '🔮', description: 'Java 24 features interview questions' },
    ]},
    // Spring Framework Questions
    { category: 'Spring Framework Questions', difficulty: 'Intermediate-Advanced', color: '#22c55e', topics: [
      { name: 'Spring Core Questions', problems: 3, icon: '🌱', description: 'Spring Core framework concepts' },
      { name: 'Spring Boot Questions', problems: 18, icon: '🚀', description: 'Spring Boot configuration and features' },
      { name: 'Spring Security Questions', problems: 3, icon: '🔒', description: 'Spring Security authentication and authorization' },
      { name: 'Spring Data JPA Questions', problems: 3, icon: '💾', description: 'Spring Data JPA repositories and queries' },
      { name: 'Spring Annotations Questions', problems: 8, icon: '🏷️', description: 'Common Spring annotations and usage' },
    ]},
    // Database Questions
    { category: 'Database Questions', difficulty: 'Intermediate', color: '#3b82f6', topics: [
      { name: 'SQL Questions', problems: 16, icon: '🗃️', description: 'SQL queries, joins, and optimization' },
      { name: 'NoSQL Questions', problems: 8, icon: '📊', description: 'NoSQL databases and use cases' },
      { name: 'ORM Questions', problems: 8, icon: '🔗', description: 'Object-Relational Mapping concepts' },
      { name: 'Hibernate Questions', problems: 5, icon: '🐻', description: 'Hibernate ORM framework' },
      { name: 'PostgreSQL Questions', problems: 10, icon: '🐘', description: 'PostgreSQL features and internals' },
      { name: 'SQL Fundamentals Questions', problems: 10, icon: '📖', description: 'Core SQL concepts: JOINs, CTEs, window functions' },
    ]},
    // Messaging & Streaming Questions
    { category: 'Messaging & Streaming Questions', difficulty: 'Intermediate-Advanced', color: '#8b5cf6', topics: [
      { name: 'Kafka Questions', problems: 18, icon: '📨', description: 'Apache Kafka messaging and streaming' },
      { name: 'RabbitMQ Questions', problems: 4, icon: '🐰', description: 'RabbitMQ message broker' },
      { name: 'Solace Questions', problems: 4, icon: '☀️', description: 'Solace messaging platform' },
      { name: 'Apache Flink Questions', problems: 5, icon: '⚡', description: 'Apache Flink stream processing' },
    ]},
    // DevOps & Monitoring Questions
    { category: 'DevOps & Monitoring Questions', difficulty: 'Intermediate', color: '#06b6d4', topics: [
      { name: 'Jenkins Questions', problems: 11, icon: '🔧', description: 'Jenkins CI/CD pipeline concepts' },
      { name: 'TeamCity Questions', problems: 4, icon: '🏗️', description: 'TeamCity build automation' },
      { name: 'Prometheus Questions', problems: 4, icon: '📈', description: 'Prometheus monitoring and alerting' },
      { name: 'Grafana Questions', problems: 4, icon: '📊', description: 'Grafana visualization and dashboards' },
      { name: 'Zipkin Questions', problems: 4, icon: '🔍', description: 'Distributed tracing with Zipkin' },
      { name: 'Actuator Questions', problems: 4, icon: '⚙️', description: 'Spring Boot Actuator endpoints' },
      { name: 'JMeter Questions', problems: 4, icon: '🔥', description: 'JMeter load testing concepts' },
      { name: 'JFR Questions', problems: 4, icon: '✈️', description: 'Java Flight Recorder profiling' },
      { name: 'Dynatrace Questions', problems: 4, icon: '🔮', description: 'Dynatrace APM and monitoring' },
    ]},
    // API & Integration Questions
    { category: 'API & Integration Questions', difficulty: 'Intermediate', color: '#14b8a6', topics: [
      { name: 'REST API Questions', problems: 4, icon: '🌐', description: 'RESTful API design and best practices' },
    ]},
    // Specialized Domain Questions
    { category: 'Specialized Domain Questions', difficulty: 'Advanced', color: '#f43f5e', topics: [
      { name: 'eTrading Questions', problems: 27, icon: '📈', description: 'Electronic trading systems and concepts' },
      { name: 'System Design Questions', problems: 15, icon: '🏛️', description: 'Scalability, architecture, and distributed systems' },
    ]},
  ]

  // Top 100 - Exactly 100 most important questions from ALL categories
  const top100Path = [
    // Fundamentals (11)
    { category: 'Fundamentals', difficulty: 'Beginner', color: '#10b981', topics: [
      { name: 'Arrays', problems: 4, icon: '📊', description: 'Top 4 essential array problems' },
      { name: 'Strings', problems: 2, icon: '📝', description: 'Must-know string problems' },
      { name: 'Hash Tables', problems: 3, icon: '#️⃣', description: 'Key hash map problems' },
      { name: 'Stacks', problems: 2, icon: '📚', description: 'Essential stack problems' },
    ]},
    // Core Algorithms (9)
    { category: 'Core Algorithms', difficulty: 'Easy-Medium', color: '#3b82f6', topics: [
      { name: 'Two Pointers', problems: 2, icon: '👆', description: 'Essential two pointer patterns' },
      { name: 'Sliding Window', problems: 2, icon: '🪟', description: 'Key sliding window problems' },
      { name: 'Binary Search', problems: 2, icon: '🔍', description: 'Must-know binary search' },
      { name: 'Linked Lists', problems: 3, icon: '🔗', description: 'Essential linked list problems' },
    ]},
    // Intermediate (7)
    { category: 'Intermediate', difficulty: 'Medium', color: '#f59e0b', topics: [
      { name: 'Binary Trees', problems: 3, icon: '🌲', description: 'Core tree problems' },
      { name: 'Heaps', problems: 2, icon: '⛰️', description: 'Priority queue basics' },
    ]},
    // Advanced Data Structures (7)
    { category: 'Advanced Data Structures', difficulty: 'Medium-Hard', color: '#8b5cf6', topics: [
      { name: 'Graphs', problems: 3, icon: '🕸️', description: 'Essential graph problems' },
      { name: 'Trie', problems: 2, icon: '🔤', description: 'Prefix tree basics' },
      { name: 'Intervals', problems: 2, icon: '📏', description: 'Interval problems' },
    ]},
    // Advanced Algorithms (9)
    { category: 'Advanced Algorithms', difficulty: 'Hard', color: '#ef4444', topics: [
      { name: 'Dynamic Programming', problems: 4, icon: '🧩', description: 'Top 4 DP problems' },
      { name: 'Backtracking', problems: 3, icon: '↩️', description: 'Key backtracking' },
      { name: 'Greedy Algorithms', problems: 2, icon: '🎯', description: 'Greedy essentials' },
    ]},
    // Java Features (4)
    { category: 'Java Features', difficulty: 'Intermediate', color: '#f97316', topics: [
      { name: 'Lambdas', problems: 2, icon: 'λ', description: 'Lambda essentials' },
      { name: 'Functional Interfaces', problems: 2, icon: '🔗', description: 'Core functional interfaces' },
    ]},
    // Modern Java Versions (4)
    { category: 'Modern Java Versions', difficulty: 'Intermediate', color: '#0ea5e9', topics: [
      { name: 'Java 8', problems: 2, icon: '🎯', description: 'Java 8 essentials' },
      { name: 'Java 21', problems: 2, icon: '🚀', description: 'Java 21 key features' },
    ]},
    // Core Java Fundamentals (4)
    { category: 'Core Java Fundamentals', difficulty: 'Beginner-Intermediate', color: '#06b6d4', topics: [
      { name: 'Object-Oriented Programming', problems: 2, icon: '🎭', description: 'OOP essentials' },
      { name: 'Generics', problems: 2, icon: '🔷', description: 'Generic basics' },
    ]},
    // Concurrency (2)
    { category: 'Concurrency', difficulty: 'Advanced', color: '#a855f7', topics: [
      { name: 'Multithreading', problems: 2, icon: '🧵', description: 'Threading essentials' },
    ]},
    // System Design Fundamentals (4)
    { category: 'System Design Fundamentals', difficulty: 'Intermediate', color: '#ec4899', topics: [
      { name: 'System Design', problems: 2, icon: '🏗️', description: 'Core concepts' },
      { name: 'Load Balancing', problems: 1, icon: '⚡', description: 'Load balancer basics' },
      { name: 'Caching Strategies', problems: 1, icon: '💨', description: 'Cache fundamentals' },
    ]},
    // Data & Storage (2)
    { category: 'Data & Storage', difficulty: 'Intermediate-Advanced', color: '#8b5cf6', topics: [
      { name: 'Database Sharding', problems: 1, icon: '🔪', description: 'Sharding basics' },
      { name: 'SQL vs NoSQL', problems: 1, icon: '🗄️', description: 'Database selection' },
    ]},
    // Communication & APIs (2)
    { category: 'Communication & APIs', difficulty: 'Intermediate', color: '#06b6d4', topics: [
      { name: 'API Design', problems: 1, icon: '🔌', description: 'API design basics' },
      { name: 'Message Queues', problems: 1, icon: '📬', description: 'Messaging fundamentals' },
    ]},
    // Architecture Patterns (3)
    { category: 'Architecture Patterns', difficulty: 'Advanced', color: '#f97316', topics: [
      { name: 'Microservices', problems: 1, icon: '🧩', description: 'Microservices intro' },
      { name: 'Design Patterns', problems: 2, icon: '🏛️', description: 'Key design patterns' },
    ]},
    // System Design Components (4)
    { category: 'System Design Components', difficulty: 'Advanced', color: '#10b981', topics: [
      { name: 'LRU Cache', problems: 2, icon: '💾', description: 'Cache implementation' },
      { name: 'Rate Limiter', problems: 2, icon: '⏱️', description: 'Rate limiting' },
    ]},
    // System Design Case Studies (4)
    { category: 'System Design Case Studies', difficulty: 'Advanced', color: '#ef4444', topics: [
      { name: 'Twitter', problems: 2, icon: '🐦', description: 'Social platform' },
      { name: 'Netflix', problems: 2, icon: '🎬', description: 'Streaming service' },
    ]},
    // Java Interview Questions (6)
    { category: 'Java Interview Questions', difficulty: 'Intermediate', color: '#f97316', topics: [
      { name: 'Java 8 Questions', problems: 3, icon: '🎯', description: 'Top Java 8 questions' },
      { name: 'Core Java Questions', problems: 3, icon: '📚', description: 'Core Java essentials' },
    ]},
    // Spring Framework Questions (2)
    { category: 'Spring Framework Questions', difficulty: 'Intermediate-Advanced', color: '#22c55e', topics: [
      { name: 'Spring Boot Questions', problems: 2, icon: '🚀', description: 'Spring Boot essentials' },
    ]},
    // Database Questions (5)
    { category: 'Database Questions', difficulty: 'Intermediate', color: '#3b82f6', topics: [
      { name: 'SQL Questions', problems: 3, icon: '🗃️', description: 'Must-know SQL' },
      { name: 'NoSQL Questions', problems: 2, icon: '📊', description: 'NoSQL basics' },
    ]},
    // Messaging & Streaming Questions (2)
    { category: 'Messaging & Streaming Questions', difficulty: 'Intermediate-Advanced', color: '#8b5cf6', topics: [
      { name: 'Kafka Questions', problems: 2, icon: '📨', description: 'Kafka essentials' },
    ]},
    // DevOps & Monitoring Questions (3)
    { category: 'DevOps & Monitoring Questions', difficulty: 'Intermediate', color: '#06b6d4', topics: [
      { name: 'Jenkins Questions', problems: 2, icon: '🔧', description: 'CI/CD basics' },
      { name: 'Prometheus Questions', problems: 1, icon: '📈', description: 'Monitoring intro' },
    ]},
    // API & Integration Questions (2)
    { category: 'API & Integration Questions', difficulty: 'Intermediate', color: '#14b8a6', topics: [
      { name: 'REST API Questions', problems: 2, icon: '🌐', description: 'REST API basics' },
    ]},
    // Specialized Domain Questions (4)
    { category: 'Specialized Domain Questions', difficulty: 'Advanced', color: '#f43f5e', topics: [
      { name: 'eTrading Questions', problems: 2, icon: '📈', description: 'eTrading essentials' },
      { name: 'System Design Questions', problems: 2, icon: '🏛️', description: 'System design Q&A' },
    ]},
  ]

  // Top 400 - More comprehensive coverage from EVERY category (exactly 400 questions)
  const top400Path = [
    // Fundamentals
    { category: 'Fundamentals', difficulty: 'Beginner', color: '#10b981', topics: [
      { name: 'Arrays', problems: 15, icon: '📊', description: 'Comprehensive array problems' },
      { name: 'Strings', problems: 8, icon: '📝', description: 'String manipulation' },
      { name: 'Hash Tables', problems: 8, icon: '#️⃣', description: 'Hash map mastery' },
      { name: 'Stacks', problems: 6, icon: '📚', description: 'Stack applications' },
      { name: 'Queues', problems: 3, icon: '🚶', description: 'Queue fundamentals' },
    ]},
    // Core Algorithms
    { category: 'Core Algorithms', difficulty: 'Easy-Medium', color: '#3b82f6', topics: [
      { name: 'Two Pointers', problems: 4, icon: '👆', description: 'Two pointer techniques' },
      { name: 'Sliding Window', problems: 6, icon: '🪟', description: 'Sliding window mastery' },
      { name: 'Binary Search', problems: 4, icon: '🔍', description: 'Binary search patterns' },
      { name: 'Linked Lists', problems: 8, icon: '🔗', description: 'Linked list mastery' },
      { name: 'Sorting', problems: 3, icon: '📈', description: 'Sorting algorithms' },
    ]},
    // Intermediate
    { category: 'Intermediate', difficulty: 'Medium', color: '#f59e0b', topics: [
      { name: 'Trees', problems: 4, icon: '🌳', description: 'Tree traversals' },
      { name: 'Binary Trees', problems: 12, icon: '🌲', description: 'Binary tree algorithms' },
      { name: 'Binary Search Trees', problems: 3, icon: '🌿', description: 'BST operations' },
      { name: 'Heaps', problems: 5, icon: '⛰️', description: 'Priority queues' },
      { name: 'Math & Geometry', problems: 5, icon: '📐', description: 'Math algorithms' },
    ]},
    // Advanced Data Structures
    { category: 'Advanced Data Structures', difficulty: 'Medium-Hard', color: '#8b5cf6', topics: [
      { name: 'Graphs', problems: 7, icon: '🕸️', description: 'Graph algorithms' },
      { name: 'Trie', problems: 4, icon: '🔤', description: 'Prefix trees' },
      { name: 'Union Find', problems: 3, icon: '🔗', description: 'Disjoint sets' },
      { name: 'Intervals', problems: 5, icon: '📏', description: 'Interval problems' },
    ]},
    // Advanced Algorithms
    { category: 'Advanced Algorithms', difficulty: 'Hard', color: '#ef4444', topics: [
      { name: 'Dynamic Programming', problems: 12, icon: '🧩', description: 'DP fundamentals' },
      { name: 'Dynamic Programming Patterns', problems: 20, icon: '🎨', description: 'Top DP patterns' },
      { name: 'Backtracking', problems: 8, icon: '↩️', description: 'Backtracking problems' },
      { name: 'Greedy Algorithms', problems: 3, icon: '🎯', description: 'Greedy approach' },
      { name: 'Advanced Graphs', problems: 4, icon: '🗺️', description: 'Advanced graph algorithms' },
      { name: 'Bit Manipulation', problems: 5, icon: '💻', description: 'Bit operations' },
    ]},
    // Java Features
    { category: 'Java Features', difficulty: 'Intermediate', color: '#f97316', topics: [
      { name: 'Streams', problems: 3, icon: '🌊', description: 'Stream API' },
      { name: 'Lambdas', problems: 3, icon: 'λ', description: 'Lambda expressions' },
      { name: 'Functional Interfaces', problems: 3, icon: '🔗', description: 'Functional interfaces' },
      { name: 'Optional', problems: 2, icon: '❓', description: 'Optional usage' },
    ]},
    // Modern Java Versions
    { category: 'Modern Java Versions', difficulty: 'Intermediate-Advanced', color: '#0ea5e9', topics: [
      { name: 'Java 8', problems: 4, icon: '🎯', description: 'Java 8 features' },
      { name: 'Java 11', problems: 3, icon: '🔧', description: 'Java 11 features' },
      { name: 'Java 21', problems: 4, icon: '🚀', description: 'Java 21 features' },
    ]},
    // Core Java Fundamentals
    { category: 'Core Java Fundamentals', difficulty: 'Beginner-Intermediate', color: '#06b6d4', topics: [
      { name: 'Object-Oriented Programming', problems: 4, icon: '🎭', description: 'OOP concepts' },
      { name: 'Exception Handling', problems: 3, icon: '⚠️', description: 'Exception handling' },
      { name: 'Generics', problems: 3, icon: '🔷', description: 'Generic programming' },
      { name: 'JVM Internals', problems: 3, icon: '⚙️', description: 'JVM architecture' },
    ]},
    // Concurrency
    { category: 'Concurrency', difficulty: 'Advanced', color: '#a855f7', topics: [
      { name: 'Concurrency', problems: 3, icon: '🔀', description: 'Concurrency basics' },
      { name: 'Multithreading', problems: 4, icon: '🧵', description: 'Threading mastery' },
    ]},
    // System Design Fundamentals
    { category: 'System Design Fundamentals', difficulty: 'Intermediate', color: '#ec4899', topics: [
      { name: 'System Design', problems: 3, icon: '🏗️', description: 'Design methodology' },
      { name: 'CAP Theorem', problems: 2, icon: '⚖️', description: 'CAP concepts' },
      { name: 'Scaling', problems: 2, icon: '📈', description: 'Scaling strategies' },
      { name: 'Load Balancing', problems: 2, icon: '⚡', description: 'Load balancers' },
      { name: 'Caching Strategies', problems: 2, icon: '💨', description: 'Caching patterns' },
    ]},
    // Data & Storage
    { category: 'Data & Storage', difficulty: 'Intermediate-Advanced', color: '#8b5cf6', topics: [
      { name: 'Database Sharding', problems: 2, icon: '🔪', description: 'Sharding strategies' },
      { name: 'Database Replication', problems: 2, icon: '📋', description: 'Replication patterns' },
      { name: 'SQL vs NoSQL', problems: 2, icon: '🗄️', description: 'Database selection' },
      { name: 'Consistent Hashing', problems: 2, icon: '🔄', description: 'Distributed hashing' },
    ]},
    // Communication & APIs
    { category: 'Communication & APIs', difficulty: 'Intermediate', color: '#06b6d4', topics: [
      { name: 'API Design', problems: 2, icon: '🔌', description: 'API design principles' },
      { name: 'Message Queues', problems: 2, icon: '📬', description: 'Message brokers' },
      { name: 'WebSockets', problems: 2, icon: '🔗', description: 'Real-time communication' },
    ]},
    // Architecture Patterns
    { category: 'Architecture Patterns', difficulty: 'Advanced', color: '#f97316', topics: [
      { name: 'Microservices', problems: 2, icon: '🧩', description: 'Microservices patterns' },
      { name: 'Microservice Patterns', problems: 3, icon: '📐', description: 'Saga, CQRS, Event Sourcing' },
      { name: 'Design Patterns', problems: 3, icon: '🏛️', description: 'GoF patterns' },
      { name: 'Event Driven Architecture', problems: 2, icon: '⚡', description: 'Event sourcing' },
    ]},
    // System Design Components
    { category: 'System Design Components', difficulty: 'Advanced', color: '#10b981', topics: [
      { name: 'LRU Cache', problems: 5, icon: '💾', description: 'Cache implementation' },
      { name: 'Rate Limiter', problems: 4, icon: '⏱️', description: 'Rate limiting algorithms' },
      { name: 'Notification System', problems: 4, icon: '🔔', description: 'Push notifications' },
    ]},
    // System Design Case Studies
    { category: 'System Design Case Studies', difficulty: 'Advanced', color: '#ef4444', topics: [
      { name: 'Twitter', problems: 4, icon: '🐦', description: 'Social platform design' },
      { name: 'Netflix', problems: 4, icon: '🎬', description: 'Streaming service' },
      { name: 'Instagram', problems: 4, icon: '📷', description: 'Photo sharing' },
      { name: 'WhatsApp', problems: 4, icon: '💬', description: 'Messaging app' },
      { name: 'Amazon', problems: 4, icon: '🛒', description: 'E-commerce platform' },
    ]},
    // Java Interview Questions
    { category: 'Java Interview Questions', difficulty: 'Intermediate', color: '#f97316', topics: [
      { name: 'Core Java Questions', problems: 8, icon: '📚', description: 'Core Java concepts' },
      { name: 'Java 8 Questions', problems: 10, icon: '🎯', description: 'Java 8 features' },
      { name: 'Java 21 Questions', problems: 5, icon: '🚀', description: 'Modern Java' },
    ]},
    // Spring Framework Questions
    { category: 'Spring Framework Questions', difficulty: 'Intermediate-Advanced', color: '#22c55e', topics: [
      { name: 'Spring Core Questions', problems: 3, icon: '🌱', description: 'Spring fundamentals' },
      { name: 'Spring Boot Questions', problems: 10, icon: '🚀', description: 'Spring Boot mastery' },
      { name: 'Spring Security Questions', problems: 3, icon: '🔒', description: 'Security concepts' },
      { name: 'Spring Data JPA Questions', problems: 3, icon: '💾', description: 'Data JPA' },
    ]},
    // Database Questions
    { category: 'Database Questions', difficulty: 'Intermediate', color: '#3b82f6', topics: [
      { name: 'SQL Questions', problems: 10, icon: '🗃️', description: 'SQL expertise' },
      { name: 'NoSQL Questions', problems: 5, icon: '📊', description: 'NoSQL databases' },
      { name: 'ORM Questions', problems: 4, icon: '🔗', description: 'ORM concepts' },
      { name: 'Hibernate Questions', problems: 4, icon: '🐻', description: 'Hibernate ORM' },
    ]},
    // Messaging & Streaming Questions
    { category: 'Messaging & Streaming Questions', difficulty: 'Intermediate-Advanced', color: '#8b5cf6', topics: [
      { name: 'Kafka Questions', problems: 10, icon: '📨', description: 'Kafka deep dive' },
      { name: 'RabbitMQ Questions', problems: 3, icon: '🐰', description: 'RabbitMQ basics' },
      { name: 'Apache Flink Questions', problems: 3, icon: '⚡', description: 'Stream processing' },
    ]},
    // DevOps & Monitoring Questions
    { category: 'DevOps & Monitoring Questions', difficulty: 'Intermediate', color: '#06b6d4', topics: [
      { name: 'Jenkins Questions', problems: 6, icon: '🔧', description: 'CI/CD pipelines' },
      { name: 'Prometheus Questions', problems: 3, icon: '📈', description: 'Monitoring' },
      { name: 'Grafana Questions', problems: 3, icon: '📊', description: 'Visualization' },
      { name: 'JMeter Questions', problems: 4, icon: '🔥', description: 'Load testing' },
      { name: 'JFR Questions', problems: 4, icon: '✈️', description: 'Java Flight Recorder' },
      { name: 'Dynatrace Questions', problems: 4, icon: '🔮', description: 'Dynatrace APM' },
    ]},
    // API & Integration Questions
    { category: 'API & Integration Questions', difficulty: 'Intermediate', color: '#14b8a6', topics: [
      { name: 'REST API Questions', problems: 4, icon: '🌐', description: 'RESTful APIs' },
    ]},
    // Specialized Domain Questions
    { category: 'Specialized Domain Questions', difficulty: 'Advanced', color: '#f43f5e', topics: [
      { name: 'eTrading Questions', problems: 8, icon: '📈', description: 'eTrading systems' },
      { name: 'System Design Questions', problems: 6, icon: '🏛️', description: 'System design Q&A' },
    ]},
  ]

  // Get the active learning path based on sub-tab
  const getActiveLearningPath = () => {
    switch (pathSubTab) {
      case 'top100':
        return top100Path
      case 'top400':
        return top400Path
      default:
        return learningPath
    }
  }

  // Calculate progress for each topic
  const getTopicProgress = (topicName) => {
    const topicIdMap = {
      // Algorithm topics
      'Binary Search': 'BinarySearch',
      'Dynamic Programming': 'DynamicProgramming',
      'Dynamic Programming Patterns': 'DynamicProgrammingPatterns',
      'Hash Tables': 'HashTables',
      'Linked Lists': 'LinkedLists',
      'Two Pointers': 'TwoPointers',
      'Sliding Window': 'SlidingWindow',
      'Binary Trees': 'BinaryTrees',
      'Binary Search Trees': 'BinarySearchTrees',
      'Advanced Graphs': 'AdvancedGraphs',
      'Greedy Algorithms': 'GreedyAlgorithms',
      'Bit Manipulation': 'BitManipulation',
      'Union Find': 'UnionFind',
      'Math & Geometry': 'MathGeometry',
      'Famous Algorithms': 'FamousAlgorithms',
      'Data Structures': 'DataStructures',
      // Java topics
      'Streams Advanced': 'StreamsAdvanced',
      'Lambdas Advanced': 'LambdasAdvanced',
      'Functional Interfaces': 'FunctionalInterfaces',
      'Collections Framework': 'CollectionsFramework',
      'Object-Oriented Programming': 'ObjectOrientedProgramming',
      'Exception Handling': 'ExceptionHandling',
      'File I/O': 'FileIO',
      'JVM Internals': 'JVMInternals',
      'Memory Management': 'MemoryManagement',
      // Java versions
      'Java 8': 'Java8',
      'Java 11': 'Java11',
      'Java 15': 'Java15',
      'Java 21': 'Java21',
      'Java 24': 'Java24',
      // Python topics
      'Set Operations': 'SetOperations',
      'Map Operations': 'MapOperations',
      // System Design Fundamentals - all map to SystemDesignFundamentalsQuestions
      'System Design': 'SystemDesignFundamentalsQuestions',
      'CAP Theorem': 'SystemDesignFundamentalsQuestions',
      'Scaling': 'SystemDesignFundamentalsQuestions',
      'Load Balancing': 'SystemDesignFundamentalsQuestions',
      'Caching Strategies': 'SystemDesignFundamentalsQuestions',
      'CDN': 'SystemDesignFundamentalsQuestions',
      'Proxies': 'SystemDesignFundamentalsQuestions',
      // Data & Storage - all map to DataStorageQuestions
      'Database Sharding': 'DataStorageQuestions',
      'Database Replication': 'DataStorageQuestions',
      'Data Partitioning': 'DataStorageQuestions',
      'SQL vs NoSQL': 'DataStorageQuestions',
      'Consistent Hashing': 'DataStorageQuestions',
      'Blob Storage': 'DataStorageQuestions',
      // Communication & APIs - all map to CommunicationQuestions
      'API Design': 'CommunicationQuestions',
      'Message Queues': 'CommunicationQuestions',
      'WebSockets': 'CommunicationQuestions',
      'Event Driven': 'CommunicationQuestions',
      // Architecture Patterns - all map to ArchitectureQuestions
      'Microservices': 'ArchitectureQuestions',
      'Microservice Patterns': 'ArchitectureQuestions',
      'Domain Driven Design': 'ArchitectureQuestions',
      'Event Driven Architecture': 'ArchitectureQuestions',
      'Design Patterns': 'ArchitectureQuestions',
      // System Design Components
      'LRU Cache': 'LRUCache',
      'Rate Limiter': 'RateLimiter',
      'Notification System': 'NotificationSystem',
      // System Design Case Studies
      'Google Docs': 'GoogleDocs',
      // Java Interview Questions
      'Core Java Questions': 'CoreJavaQuestions',
      'Java 8 Questions': 'Java8Questions',
      'Java 11 Questions': 'Java11Questions',
      'Java 15 Questions': 'Java15Questions',
      'Java 21 Questions': 'Java21Questions',
      'Java 24 Questions': 'Java24Questions',
      // Spring Framework Questions
      'Spring Core Questions': 'SpringCoreQuestions',
      'Spring Boot Questions': 'SpringBootQuestions',
      'Spring Security Questions': 'SpringSecurityQuestions',
      'Spring Data JPA Questions': 'SpringDataJPAQuestions',
      'Spring Annotations Questions': 'SpringAnnotationsQuestions',
      // Database Questions
      'SQL Questions': 'SQLQuestions',
      'NoSQL Questions': 'NoSQLQuestions',
      'ORM Questions': 'ORMQuestions',
      'Hibernate Questions': 'HibernateQuestions',
      'PostgreSQL Questions': 'PostgreSQLQuestions',
      'SQL Fundamentals Questions': 'SQLFundamentalsQuestions',
      // Messaging & Streaming Questions
      'Kafka Questions': 'KafkaQuestions',
      'RabbitMQ Questions': 'RabbitMQQuestions',
      'Solace Questions': 'SolaceQuestions',
      'Apache Flink Questions': 'ApacheFlinkQuestions',
      // DevOps & Monitoring Questions
      'Jenkins Questions': 'JenkinsQuestions',
      'TeamCity Questions': 'TeamCityQuestions',
      'Prometheus Questions': 'PrometheusQuestions',
      'Grafana Questions': 'GrafanaQuestions',
      'Zipkin Questions': 'ZipkinQuestions',
      'Actuator Questions': 'ActuatorQuestions',
      'JMeter Questions': 'JMeterQuestions',
      'JFR Questions': 'JFRQuestions',
      'Dynatrace Questions': 'DynatraceQuestions',
      // API & Integration Questions
      'REST API Questions': 'RestAPIQuestions',
      // Specialized Domain Questions
      'eTrading Questions': 'EtradingQuestions',
      'System Design Questions': 'SystemDesignQuestions'
    }
    const prefix = topicIdMap[topicName] || topicName
    return completedProblems.filter(id => id.startsWith(prefix)).length
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark
        ? 'linear-gradient(to bottom right, #111827, #1f2937)'
        : 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)',
      color: colors.textPrimary,
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Breadcrumb
            breadcrumbStack={[
              { name: 'Progress Dashboard', icon: '📊' }
            ]}
            onMainMenu={onBack}
            colors={{
              primary: '#f59e0b',
              primaryHover: '#fbbf24',
              bg: 'rgba(245, 158, 11, 0.1)',
              border: 'rgba(245, 158, 11, 0.3)',
              arrow: '#f59e0b',
              hoverBg: 'rgba(245, 158, 11, 0.2)'
            }}
          />
        </div>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>

          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            background: 'linear-gradient(to right, #f59e0b, #fbbf24)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            Progress Dashboard
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '1.1rem' }}>
            Track your learning journey and achievements
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <StatCard
            icon="✅"
            value={totalCompleted}
            label="Problems Completed"
            color="#10b981"
            isDark={isDark}
          />
          <StatCard
            icon="⭐"
            value={totalBookmarked}
            label="Bookmarked"
            color="#f59e0b"
            isDark={isDark}
          />
          <StatCard
            icon="📁"
            value={categoriesStarted}
            label="Categories Started"
            color="#3b82f6"
            isDark={isDark}
          />
          <StatCard
            icon="🔥"
            value={calculateStreak(completedProblems)}
            label="Day Streak"
            color="#ef4444"
            isDark={isDark}
          />
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          borderBottom: '1px solid #374151',
          paddingBottom: '0.5rem'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: activeTab === tab.id ? '#374151' : 'transparent',
                color: activeTab === tab.id ? '#f59e0b' : '#9ca3af',
                border: 'none',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div>
            {/* Activity Charts */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <WeeklyProgressChart userId={currentUser?.uid} />
              <ActivityHeatmap userId={currentUser?.uid} weeks={12} />
            </div>

            {/* Category and Recent Activity Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Progress by Category */}
            <div style={{
              background: isDark ? 'linear-gradient(to bottom right, #1f2937, #111827)' : 'linear-gradient(to bottom right, #ffffff, #f9fafb)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #374151'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f59e0b', marginBottom: '1rem' }}>
                Progress by Category
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {Object.entries(completedByCategory).slice(0, 8).map(([category, problems]) => (
                  <button
                    key={category}
                    onClick={() => handleProblemClick(problems[0])}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      const progressBar = e.currentTarget.querySelector('.progress-fill')
                      if (progressBar) progressBar.style.backgroundColor = '#22c55e'
                    }}
                    onMouseLeave={(e) => {
                      const progressBar = e.currentTarget.querySelector('.progress-fill')
                      if (progressBar) progressBar.style.backgroundColor = '#10b981'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ color: '#d1d5db', fontSize: '0.9rem' }}>{category}</span>
                      <span style={{ color: '#10b981', fontWeight: '600' }}>{problems.length}</span>
                    </div>
                    <div style={{
                      height: '6px',
                      backgroundColor: '#374151',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div
                        className="progress-fill"
                        style={{
                          height: '100%',
                          width: `${Math.min(problems.length * 10, 100)}%`,
                          backgroundColor: '#10b981',
                          borderRadius: '3px',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div style={{
              background: isDark ? 'linear-gradient(to bottom right, #1f2937, #111827)' : 'linear-gradient(to bottom right, #ffffff, #f9fafb)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #374151'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f59e0b', marginBottom: '1rem' }}>
                Recent Activity
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {recentActivity.length > 0 ? recentActivity.map((problemId, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleProblemClick(problemId)}
                    style={{
                      padding: '0.75rem',
                      backgroundColor: '#374151',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      width: '100%',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#374151'}
                  >
                    <span style={{ color: '#10b981' }}>✓</span>
                    <span style={{ color: '#d1d5db', fontSize: '0.9rem' }}>
                      {problemId.replace(/-/g, ' ')}
                    </span>
                  </button>
                )) : (
                  <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
                    No completed problems yet. Start practicing!
                  </p>
                )}
              </div>
            </div>
            </div>
          </div>
        )}

        {activeTab === 'path' && (
          <div style={{
            background: isDark ? 'linear-gradient(to bottom right, #1f2937, #111827)' : 'linear-gradient(to bottom right, #ffffff, #f9fafb)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #374151'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f59e0b', marginBottom: '0.5rem' }}>
                🎯 Recommended Learning Path
              </h3>
              <p style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Follow this sequence from easiest to hardest to build your skills progressively
              </p>

              {/* Sub-tabs for Top 100, Top 400, All */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                {[
                  { id: 'top100', label: 'Top 100' },
                  { id: 'top400', label: 'Top 400' },
                  { id: 'all', label: 'All', count: learningPath.reduce((sum, s) => sum + s.topics.reduce((t, topic) => t + topic.problems, 0), 0) }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setPathSubTab(tab.id)
                      setExpandedSections({})
                      setInitialExpandSet(false)
                    }}
                    style={{
                      padding: '0.5rem 1rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      backgroundColor: pathSubTab === tab.id
                        ? (tab.id === 'top100' ? '#3b82f6' : tab.id === 'top400' ? '#8b5cf6' : '#f59e0b')
                        : (isDark ? '#374151' : '#e5e7eb'),
                      color: pathSubTab === tab.id ? 'white' : (isDark ? '#9ca3af' : '#6b7280'),
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tab.label}
                    {tab.count && (
                      <span style={{
                        backgroundColor: pathSubTab === tab.id ? 'rgba(255,255,255,0.2)' : (isDark ? '#4b5563' : '#d1d5db'),
                        padding: '0.125rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem'
                      }}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {getActiveLearningPath().map((section, sectionIdx) => {
              const sectionCompleted = section.topics.reduce((sum, t) => sum + getTopicProgress(t.name), 0)
              const sectionTotal = section.topics.reduce((sum, t) => sum + t.problems, 0)
              const sectionPercent = sectionTotal > 0 ? Math.round((sectionCompleted / sectionTotal) * 100) : 0
              const isExpanded = expandedSections[sectionIdx] === true // Default to collapsed

              return (
                <div key={sectionIdx} style={{ marginBottom: '1rem' }}>
                  {/* Section Header - Clickable */}
                  <button
                    onClick={() => setExpandedSections(prev => ({
                      ...prev,
                      [sectionIdx]: !isExpanded
                    }))}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: isExpanded ? '1rem' : '0',
                      padding: '0.75rem 1rem',
                      backgroundColor: `${section.color}15`,
                      borderRadius: '8px',
                      border: `1px solid ${section.color}40`,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: section.color,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.875rem',
                        fontWeight: '700'
                      }}>
                        {sectionIdx + 1}
                      </span>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ color: section.color, fontWeight: '700', fontSize: '1rem' }}>
                          {section.category}
                        </div>
                        <div style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '0.75rem' }}>
                          {section.difficulty} • {section.topics.length} topics
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: section.color, fontWeight: '700', fontSize: '1.1rem' }}>
                          {sectionPercent}%
                        </div>
                        <div style={{ color: isDark ? '#6b7280' : '#9ca3af', fontSize: '0.75rem' }}>
                          {sectionCompleted}/{sectionTotal}
                        </div>
                      </div>
                      <span style={{
                        color: section.color,
                        fontSize: '1.25rem',
                        transition: 'transform 0.2s',
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}>
                        ▼
                      </span>
                    </div>
                  </button>

                  {/* Topics Grid - Collapsible */}
                  {isExpanded && (() => {
                    // Find the first incomplete topic index
                    let firstIncompleteIdx = -1
                    for (let i = 0; i < section.topics.length; i++) {
                      const t = section.topics[i]
                      const c = getTopicProgress(t.name)
                      const p = t.problems > 0 ? Math.round((c / t.problems) * 100) : 0
                      if (p < 100) {
                        firstIncompleteIdx = i
                        break
                      }
                    }

                    return (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '0.75rem',
                    paddingLeft: '1rem',
                    animation: 'fadeIn 0.2s ease-in-out'
                  }}>
                    {section.topics.map((topic, topicIdx) => {
                      const completed = getTopicProgress(topic.name)
                      const percent = topic.problems > 0 ? Math.round((completed / topic.problems) * 100) : 0
                      const isComplete = percent === 100
                      const isNextToComplete = topicIdx === firstIncompleteIdx

                      return (
                        <button
                          key={topicIdx}
                          onClick={() => {
                            if (onNavigate) {
                              // Pass problem limit for Top 100/300 modes
                              if (pathSubTab !== 'all') {
                                onNavigate(topic.name, { problemLimit: topic.problems, mode: pathSubTab })
                              } else {
                                onNavigate(topic.name)
                              }
                            }
                          }}
                          style={{
                            padding: '1rem',
                            backgroundColor: isComplete ? 'rgba(16, 185, 129, 0.1)' : isNextToComplete ? 'rgba(245, 158, 11, 0.15)' : (isDark ? '#374151' : '#f3f4f6'),
                            borderRadius: '10px',
                            border: isComplete ? '2px solid #10b981' : isNextToComplete ? '2px solid #f59e0b' : (isDark ? '1px solid #4b5563' : '1px solid #d1d5db'),
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s',
                            boxShadow: isNextToComplete ? '0 0 12px rgba(245, 158, 11, 0.4)' : 'none',
                            position: 'relative'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)'
                            e.currentTarget.style.boxShadow = isNextToComplete ? '0 4px 16px rgba(245, 158, 11, 0.5)' : `0 4px 12px ${section.color}30`
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = isNextToComplete ? '0 0 12px rgba(245, 158, 11, 0.4)' : 'none'
                          }}
                        >
                          {isNextToComplete && (
                            <div style={{
                              position: 'absolute',
                              top: '-8px',
                              right: '-8px',
                              backgroundColor: '#f59e0b',
                              color: '#1f2937',
                              fontSize: '0.6rem',
                              fontWeight: '700',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}>
                              Up Next
                            </div>
                          )}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '1.25rem' }}>{topic.icon}</span>
                            <span style={{
                              color: isComplete ? '#10b981' : isNextToComplete ? '#f59e0b' : (isDark ? '#f9fafb' : '#1f2937'),
                              fontWeight: '600',
                              fontSize: '0.9rem'
                            }}>
                              {topic.name}
                            </span>
                            {isComplete && <span style={{ color: '#10b981' }}>✓</span>}
                            {topic.name.includes('Questions') && (
                              <span style={{
                                backgroundColor: 'rgba(139, 92, 246, 0.2)',
                                color: '#a78bfa',
                                fontSize: '0.6rem',
                                fontWeight: '600',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                marginLeft: 'auto'
                              }}>
                                PRACTICE
                              </span>
                            )}
                          </div>
                          <div style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                            {topic.description}
                          </div>
                          {/* Progress Bar */}
                          <div style={{
                            height: '6px',
                            backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
                            borderRadius: '3px',
                            overflow: 'hidden',
                            marginBottom: '0.25rem'
                          }}>
                            <div style={{
                              height: '100%',
                              width: `${percent}%`,
                              backgroundColor: isComplete ? '#10b981' : section.color,
                              borderRadius: '3px',
                              transition: 'width 0.3s'
                            }} />
                          </div>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.7rem',
                            color: isDark ? '#6b7280' : '#9ca3af'
                          }}>
                            <span>{completed}/{topic.problems}</span>
                            <span style={{ color: isComplete ? '#10b981' : section.color }}>{percent}%</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                    )
                  })()}
                </div>
              )
            })}

            {/* Summary */}
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: '#374151',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: 0 }}>
                💡 <strong style={{ color: '#f59e0b' }}>Tip:</strong> Complete each section before moving to the next for optimal learning.
                Master fundamentals before tackling advanced topics.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'completed' && (
          <div style={{
            background: isDark ? 'linear-gradient(to bottom right, #1f2937, #111827)' : 'linear-gradient(to bottom right, #ffffff, #f9fafb)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#10b981', marginBottom: '1rem' }}>
              All Completed Problems ({totalCompleted})
            </h3>
            {Object.entries(completedByCategory).map(([category, problems]) => (
              <div key={category} style={{ marginBottom: '1.5rem' }}>
                <button
                  onClick={() => handleProblemClick(problems[0])}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    marginBottom: '0.75rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  <h4 style={{ color: '#f59e0b', margin: 0 }}>
                    {category} ({problems.length})
                  </h4>
                </button>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {problems.map(problemId => (
                    <button
                      key={problemId}
                      onClick={() => handleProblemClick(problemId)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#374151',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        color: '#d1d5db',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#4b5563'
                        e.currentTarget.style.color = '#10b981'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#374151'
                        e.currentTarget.style.color = '#d1d5db'
                      }}
                    >
                      {problemId.split('-').pop()}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {totalCompleted === 0 && (
              <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
                No completed problems yet. Start practicing!
              </p>
            )}
          </div>
        )}

        {activeTab === 'bookmarks' && (
          <div style={{
            background: isDark ? 'linear-gradient(to bottom right, #1f2937, #111827)' : 'linear-gradient(to bottom right, #ffffff, #f9fafb)',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f59e0b', marginBottom: '1rem' }}>
              Bookmarked Problems ({totalBookmarked})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {bookmarks.length > 0 ? bookmarks.map((bookmark, idx) => (
                <button
                  key={idx}
                  onClick={() => handleProblemClick(bookmark.problemId)}
                  style={{
                    padding: '1rem',
                    backgroundColor: '#374151',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    width: '100%',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#374151'}
                >
                  <div>
                    <div style={{ color: '#f9fafb', fontWeight: '600' }}>
                      {bookmark.title || bookmark.problemId}
                    </div>
                    {bookmark.category && (
                      <div style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
                        {bookmark.category}
                      </div>
                    )}
                  </div>
                  {bookmark.difficulty && (
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor:
                        bookmark.difficulty === 'Easy' ? 'rgba(16, 185, 129, 0.2)' :
                        bookmark.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.2)' :
                        'rgba(239, 68, 68, 0.2)',
                      color:
                        bookmark.difficulty === 'Easy' ? '#10b981' :
                        bookmark.difficulty === 'Medium' ? '#f59e0b' :
                        '#ef4444'
                    }}>
                      {bookmark.difficulty}
                    </span>
                  )}
                </button>
              )) : (
                <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
                  No bookmarked problems. Click the star icon on any problem to bookmark it!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({ icon, value, label, color, isDark }) {
  return (
    <div style={{
      background: isDark ? 'linear-gradient(to bottom right, #1f2937, #111827)' : 'linear-gradient(to bottom right, #ffffff, #f9fafb)',
      borderRadius: '12px',
      padding: '1.5rem',
      border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
      <div style={{ fontSize: '2.5rem', fontWeight: '800', color, marginBottom: '0.25rem' }}>
        {value}
      </div>
      <div style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: '0.9rem' }}>{label}</div>
    </div>
  )
}

// Calculate streak (simplified - would need timestamp data for real implementation)
function calculateStreak(completedProblems) {
  // Placeholder - return count as "streak" for demo
  return Math.min(completedProblems.length, 30)
}

export default ProgressDashboard

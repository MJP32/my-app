import { useEffect } from 'react'

/**
 * Dynamic SEO Head component for managing meta tags
 * Updates document head with page-specific SEO metadata
 */
function SEOHead({
  title = 'EggyEggs - Master Java, Design Patterns & System Design',
  description = 'Comprehensive interactive learning platform for Java programming, design patterns, system design, algorithms, data structures, Spring framework, databases, and DevOps.',
  keywords = 'Java, Java 8, Java 11, Java 21, Design Patterns, System Design, Algorithms, Data Structures, Spring Boot, Microservices, DevOps, Databases, SQL, NoSQL, Practice Problems, Coding Interview',
  author = 'Michael Perera',
  canonicalUrl = null,
  ogImage = '/og-image.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  structuredData = null
}) {
  useEffect(() => {
    // Update title
    document.title = title

    // Helper function to update meta tag
    const updateMetaTag = (selector, attribute, value) => {
      let element = document.querySelector(selector)
      if (element) {
        element.setAttribute(attribute, value)
      } else {
        element = document.createElement('meta')
        if (selector.includes('property=')) {
          element.setAttribute('property', selector.match(/property="([^"]+)"/)[1])
        } else if (selector.includes('name=')) {
          element.setAttribute('name', selector.match(/name="([^"]+)"/)[1])
        }
        element.setAttribute(attribute, value)
        document.head.appendChild(element)
      }
    }

    // Update meta tags
    updateMetaTag('meta[name="description"]', 'content', description)
    updateMetaTag('meta[name="keywords"]', 'content', keywords)
    updateMetaTag('meta[name="author"]', 'content', author)

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', 'content', title)
    updateMetaTag('meta[property="og:description"]', 'content', description)
    updateMetaTag('meta[property="og:image"]', 'content', window.location.origin + ogImage)
    updateMetaTag('meta[property="og:type"]', 'content', ogType)
    updateMetaTag('meta[property="og:url"]', 'content', window.location.href)

    // Update Twitter tags
    updateMetaTag('meta[name="twitter:card"]', 'content', twitterCard)
    updateMetaTag('meta[name="twitter:title"]', 'content', title)
    updateMetaTag('meta[name="twitter:description"]', 'content', description)
    updateMetaTag('meta[name="twitter:image"]', 'content', window.location.origin + ogImage)

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl || window.location.href)
    } else {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      canonical.setAttribute('href', canonicalUrl || window.location.href)
      document.head.appendChild(canonical)
    }

    // Update structured data if provided
    if (structuredData) {
      let scriptTag = document.querySelector('script[type="application/ld+json"][data-dynamic]')
      if (!scriptTag) {
        scriptTag = document.createElement('script')
        scriptTag.setAttribute('type', 'application/ld+json')
        scriptTag.setAttribute('data-dynamic', 'true')
        document.head.appendChild(scriptTag)
      }
      scriptTag.textContent = JSON.stringify(structuredData)
    }
  }, [title, description, keywords, author, canonicalUrl, ogImage, ogType, twitterCard, structuredData])

  return null // This component doesn't render anything
}

export default SEOHead

/**
 * SEO metadata presets for common page types
 */
// Helper to create Course structured data
const createCourseSchema = (name, description, topics = []) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": name,
  "description": description,
  "provider": {
    "@type": "Organization",
    "name": "EggyEggs",
    "url": "https://eggyeggs.com"
  },
  ...(topics.length > 0 && { "about": topics.map(topic => ({ "@type": "Thing", "name": topic })) })
})

// Helper to create BreadcrumbList structured data
export const createBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://eggyeggs.com${item.path}`
  }))
})

// Helper to create FAQ structured data
export const createFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
})

export const seoPresets = {
  // Homepage
  home: {
    title: 'EggyEggs - Technical Interview Prep | Coding Problems, System Design & DSA',
    description: 'Ace your technical interviews with 500+ coding problems, system design guides, and DSA practice. Master Java, Python, algorithms, and get interview-ready with FAANG-style questions.',
    keywords: 'technical interview prep, coding interview, FAANG interview, LeetCode problems, system design interview, DSA practice, algorithms, data structures',
    structuredData: createCourseSchema(
      'EggyEggs Technical Interview Prep',
      'Complete technical interview preparation platform',
      ['Coding Interview', 'System Design', 'DSA', 'FAANG Prep']
    )
  },

  // Java versions
  java: {
    title: 'Java Interview Prep - Core Java to Advanced Topics | EggyEggs',
    description: 'Prepare for Java interviews: Core Java, OOP, Collections, Multithreading, Streams, and modern Java features. Common interview questions with solutions.',
    keywords: 'Java interview, Java interview questions, Java coding interview, Core Java, OOP interview, Collections interview',
    structuredData: createCourseSchema('Java Interview Preparation', 'Complete Java interview guide')
  },

  java8: {
    title: 'Java 8 Interview Questions - Lambda, Streams & Functional Programming | EggyEggs',
    description: 'Master Java 8 for interviews: lambda expressions, Stream API, functional interfaces, Optional. Top interview questions with detailed explanations.',
    keywords: 'Java 8 interview, lambda interview questions, streams interview, functional programming interview, Java 8 coding',
    structuredData: createCourseSchema('Java 8 Interview Prep', 'Java 8 interview questions and answers', ['Lambda', 'Streams', 'Optional', 'Functional Interfaces'])
  },

  java11: {
    title: 'Java 11 Interview Questions - var, HTTP Client & New Features | EggyEggs',
    description: 'Java 11 interview preparation: var keyword, HTTP Client API, String methods, and LTS features. Common interview questions with examples.',
    keywords: 'Java 11 interview, var keyword interview, HTTP Client, Java 11 interview questions, LTS features',
    structuredData: createCourseSchema('Java 11 Interview Prep', 'Java 11 interview questions and answers')
  },

  java21: {
    title: 'Java 21 Interview Questions - Virtual Threads & Pattern Matching | EggyEggs',
    description: 'Prepare for Java 21 interviews: Virtual Threads, pattern matching, record patterns, sequenced collections. Latest Java features for interviews.',
    keywords: 'Java 21 interview, virtual threads interview, pattern matching, record patterns, Java 21 questions',
    structuredData: createCourseSchema('Java 21 Interview Prep', 'Java 21 interview questions and answers', ['Virtual Threads', 'Pattern Matching', 'Record Patterns'])
  },

  // Python
  python: {
    title: 'Python Interview Prep - From Basics to Advanced | EggyEggs',
    description: 'Python interview preparation: syntax, data structures, OOP, decorators, generators. Practice coding problems in Python for technical interviews.',
    keywords: 'Python interview, Python coding interview, Python interview questions, Python data structures, Python OOP',
    structuredData: createCourseSchema('Python Interview Preparation', 'Complete Python interview guide')
  },

  // Design & Architecture
  designPatterns: {
    title: 'Design Patterns Interview Questions - Gang of Four with Examples | EggyEggs',
    description: 'Ace design pattern interviews: Singleton, Factory, Observer, Strategy, and more. Real interview questions with Java implementations and UML diagrams.',
    keywords: 'design patterns interview, singleton interview, factory pattern interview, observer pattern, design patterns questions',
    structuredData: createCourseSchema('Design Patterns Interview Prep', 'Design patterns interview questions', ['Singleton', 'Factory', 'Observer', 'Strategy', 'Decorator'])
  },

  systemDesign: {
    title: 'System Design Interview - FAANG-Style Questions & Solutions | EggyEggs',
    description: 'Master system design interviews: scalability, load balancing, caching, CAP theorem, microservices. Real FAANG interview questions with step-by-step solutions.',
    keywords: 'system design interview, FAANG system design, scalability interview, distributed systems interview, system architecture interview',
    structuredData: createCourseSchema('System Design Interview Prep', 'FAANG system design interview preparation', ['Scalability', 'Load Balancing', 'Caching', 'CAP Theorem'])
  },

  microservices: {
    title: 'Microservices Interview Questions - Patterns & Architecture | EggyEggs',
    description: 'Prepare for microservices interviews: API gateway, service discovery, circuit breaker, saga pattern. Common interview questions with real-world examples.',
    keywords: 'microservices interview, API gateway interview, circuit breaker interview, saga pattern, microservices architecture interview',
    structuredData: createCourseSchema('Microservices Interview Prep', 'Microservices interview questions and answers')
  },

  // Frameworks
  spring: {
    title: 'Spring Framework Interview Questions - IoC, DI, AOP | EggyEggs',
    description: 'Ace Spring interviews: Dependency Injection, IoC container, AOP, transaction management. Top interview questions with detailed answers.',
    keywords: 'Spring interview, Spring interview questions, dependency injection interview, IoC interview, AOP interview',
    structuredData: createCourseSchema('Spring Interview Prep', 'Spring Framework interview questions')
  },

  springBoot: {
    title: 'Spring Boot Interview Questions - Microservices & REST APIs | EggyEggs',
    description: 'Spring Boot interview preparation: auto-configuration, REST APIs, microservices, Spring Data JPA, Spring Security. Common questions with solutions.',
    keywords: 'Spring Boot interview, Spring Boot questions, microservices interview, REST API interview, Spring Security interview',
    structuredData: createCourseSchema('Spring Boot Interview Prep', 'Spring Boot interview questions and answers')
  },

  // Algorithms & Practice
  algorithms: {
    title: 'DSA Interview Prep - Data Structures & Algorithms | EggyEggs',
    description: 'Master DSA for coding interviews: arrays, linked lists, trees, graphs, dynamic programming. 500+ LeetCode-style problems with Java and Python solutions.',
    keywords: 'DSA interview, data structures interview, algorithms interview, coding interview prep, LeetCode problems, FAANG coding',
    structuredData: createCourseSchema('DSA Interview Preparation', 'Complete DSA interview prep', ['Arrays', 'Trees', 'Graphs', 'Dynamic Programming'])
  },

  practice: {
    title: 'Coding Practice - 500+ LeetCode-Style Problems | EggyEggs',
    description: 'Practice 500+ coding problems for technical interviews. Java and Python solutions with explanations. Track progress and ace your FAANG interviews.',
    keywords: 'coding practice, LeetCode problems, coding interview practice, FAANG prep, coding challenges, interview problems',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "EggyEggs Coding Practice",
      "description": "500+ coding problems for technical interview preparation",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web Browser"
    }
  },

  arrays: {
    title: 'Array Interview Problems - Two Pointers, Sliding Window | EggyEggs',
    description: 'Master array problems for coding interviews: two pointers, sliding window, prefix sum. LeetCode-style problems with Java and Python solutions.',
    keywords: 'array interview problems, two pointers interview, sliding window problems, array coding interview, LeetCode arrays',
    structuredData: createCourseSchema('Array Interview Problems', 'Array coding interview preparation')
  },

  dynamicProgramming: {
    title: 'Dynamic Programming Interview - Patterns & Problems | EggyEggs',
    description: 'Master DP for coding interviews: memoization, tabulation, knapsack, LCS, LIS patterns. Step-by-step solutions to top interview problems.',
    keywords: 'dynamic programming interview, DP interview questions, memoization, tabulation, knapsack problem, LCS, LIS',
    structuredData: createCourseSchema('DP Interview Preparation', 'Dynamic programming interview problems')
  },

  trees: {
    title: 'Tree Interview Problems - Binary Trees, BST, Traversals | EggyEggs',
    description: 'Ace tree problems in coding interviews: binary trees, BST, DFS, BFS, tree traversals. Common interview questions with visual explanations.',
    keywords: 'tree interview problems, binary tree interview, BST interview, tree traversal interview, DFS BFS trees',
    structuredData: createCourseSchema('Tree Interview Problems', 'Tree coding interview preparation')
  },

  graphs: {
    title: 'Graph Interview Problems - BFS, DFS, Dijkstra | EggyEggs',
    description: 'Master graph problems for interviews: BFS, DFS, Dijkstra, topological sort, union-find. Step-by-step solutions to FAANG interview problems.',
    keywords: 'graph interview problems, BFS DFS interview, Dijkstra interview, topological sort, graph algorithms interview',
    structuredData: createCourseSchema('Graph Interview Problems', 'Graph coding interview preparation')
  },

  // Databases
  databases: {
    title: 'Database Interview Questions - SQL, NoSQL, ORM | EggyEggs',
    description: 'Database interview preparation: SQL queries, NoSQL databases, ORM frameworks, indexing, transactions. Common interview questions with answers.',
    keywords: 'database interview, SQL interview questions, NoSQL interview, ORM interview, database design interview',
    structuredData: createCourseSchema('Database Interview Prep', 'Database interview questions and answers')
  },

  sql: {
    title: 'SQL Interview Questions - Queries, Joins, Optimization | EggyEggs',
    description: 'Ace SQL interviews: complex queries, JOINs, subqueries, window functions, query optimization. Practice with real interview questions.',
    keywords: 'SQL interview, SQL interview questions, SQL joins interview, window functions, SQL query optimization',
    structuredData: createCourseSchema('SQL Interview Prep', 'SQL interview questions with solutions')
  },

  nosql: {
    title: 'NoSQL Interview Questions - MongoDB, Redis, Cassandra | EggyEggs',
    description: 'NoSQL interview preparation: MongoDB, Redis, Cassandra, DynamoDB. When to use NoSQL vs SQL - common interview questions answered.',
    keywords: 'NoSQL interview, MongoDB interview, Redis interview, Cassandra interview, NoSQL vs SQL interview',
    structuredData: createCourseSchema('NoSQL Interview Prep', 'NoSQL interview questions and answers')
  },

  // DevOps
  devops: {
    title: 'DevOps Interview Questions - Docker, Kubernetes, CI/CD | EggyEggs',
    description: 'DevOps interview preparation: Docker, Kubernetes, CI/CD pipelines, cloud deployment. Common interview questions with practical examples.',
    keywords: 'DevOps interview, Docker interview questions, Kubernetes interview, CI/CD interview, cloud interview',
    structuredData: createCourseSchema('DevOps Interview Prep', 'DevOps interview questions', ['Docker', 'Kubernetes', 'CI/CD', 'Cloud'])
  },

  docker: {
    title: 'Docker Interview Questions - Containers, Images, Compose | EggyEggs',
    description: 'Docker interview preparation: containers, images, Dockerfile, Docker Compose, networking. Top interview questions with hands-on examples.',
    keywords: 'Docker interview, Docker interview questions, containers interview, Dockerfile interview, Docker Compose',
    structuredData: createCourseSchema('Docker Interview Prep', 'Docker interview questions and answers')
  },

  kubernetes: {
    title: 'Kubernetes Interview Questions - Pods, Services, Deployments | EggyEggs',
    description: 'Kubernetes interview preparation: pods, services, deployments, ConfigMaps, Helm. Common K8s interview questions with practical answers.',
    keywords: 'Kubernetes interview, K8s interview questions, pods interview, deployments interview, Helm interview',
    structuredData: createCourseSchema('Kubernetes Interview Prep', 'Kubernetes interview questions and answers')
  },

  // Messaging
  kafka: {
    title: 'Kafka Interview Questions - Producers, Consumers, Streams | EggyEggs',
    description: 'Apache Kafka interview preparation: producers, consumers, partitions, Kafka Streams. Top interview questions for event streaming roles.',
    keywords: 'Kafka interview, Kafka interview questions, event streaming interview, Kafka Streams, message queue interview',
    structuredData: createCourseSchema('Kafka Interview Prep', 'Kafka interview questions and answers')
  },

  // Cloud
  cloud: {
    title: 'Cloud Interview Questions - AWS, GCP, Azure | EggyEggs',
    description: 'Cloud computing interview preparation: AWS, GCP, Azure services, serverless, cloud architecture. Common interview questions for cloud roles.',
    keywords: 'cloud interview, AWS interview, GCP interview, Azure interview, cloud architecture interview, serverless interview',
    structuredData: createCourseSchema('Cloud Interview Prep', 'Cloud computing interview questions')
  },

  aws: {
    title: 'AWS Interview Questions - EC2, S3, Lambda, RDS | EggyEggs',
    description: 'AWS interview preparation: EC2, S3, Lambda, RDS, DynamoDB, API Gateway. Top AWS interview questions for cloud and DevOps roles.',
    keywords: 'AWS interview, AWS interview questions, EC2 interview, Lambda interview, S3 interview, DynamoDB interview',
    structuredData: createCourseSchema('AWS Interview Prep', 'AWS interview questions and answers')
  },

  // Security
  security: {
    title: 'Security Interview Questions - OWASP, JWT, OAuth | EggyEggs',
    description: 'Application security interview preparation: OWASP Top 10, JWT, OAuth, authentication patterns. Security interview questions for developers.',
    keywords: 'security interview, OWASP interview, JWT interview, OAuth interview, authentication interview, secure coding interview',
    structuredData: createCourseSchema('Security Interview Prep', 'Security interview questions and answers')
  },

  // Questions/Interview Prep
  questions: {
    title: 'Technical Interview Questions - Java, Spring, System Design | EggyEggs',
    description: 'Comprehensive technical interview questions: Java, Spring Boot, databases, system design, DevOps. Detailed answers and explanations for each topic.',
    keywords: 'technical interview questions, Java interview questions, Spring interview questions, system design questions, coding interview questions',
    structuredData: createCourseSchema('Technical Interview Questions', 'Complete interview preparation guide')
  },

  // Projects
  hashmap: {
    title: 'HashMap Internal Workings - Java Interview Deep Dive | EggyEggs',
    description: 'Master Java HashMap internals for interviews: hash function, bucket array, collision handling, treeification, and resizing. Essential knowledge for FAANG interviews.',
    keywords: 'HashMap internal, HashMap interview, Java HashMap, hash function, collision handling, HashMap vs Hashtable, ConcurrentHashMap',
    structuredData: createCourseSchema('HashMap Internals', 'Deep dive into Java HashMap implementation')
  },

  blockingQueue: {
    title: 'BlockingQueue - Why, How & Implementation | Java Concurrency | EggyEggs',
    description: 'Master Java BlockingQueue for interviews: producer-consumer pattern, ArrayBlockingQueue vs LinkedBlockingQueue, custom implementation. Essential concurrency knowledge.',
    keywords: 'BlockingQueue, Java concurrency, producer consumer, ArrayBlockingQueue, LinkedBlockingQueue, thread safe queue, Java interview',
    structuredData: createCourseSchema('BlockingQueue Deep Dive', 'Java BlockingQueue implementation and usage')
  },

  concurrentHashMap: {
    title: 'ConcurrentHashMap Internal Workings - Java Concurrency Deep Dive | EggyEggs',
    description: 'Master ConcurrentHashMap for interviews: lock-free reads, per-bucket locking, CAS operations, Java 7 vs 8 implementation, size counting. Essential for FAANG interviews.',
    keywords: 'ConcurrentHashMap, Java concurrency, thread safe map, CAS, lock-free, segment locking, Java interview, HashMap vs ConcurrentHashMap',
    structuredData: createCourseSchema('ConcurrentHashMap Internals', 'Deep dive into Java ConcurrentHashMap implementation')
  },

  threadPoolExecutor: {
    title: 'ThreadPoolExecutor Internal Workings - Java Concurrency Deep Dive | EggyEggs',
    description: 'Master ThreadPoolExecutor for interviews: 7 core parameters, work queues, rejection policies, ctl field, Worker class, task execution flow. Essential for FAANG interviews.',
    keywords: 'ThreadPoolExecutor, Java concurrency, thread pool, executor service, work queue, rejection policy, Java interview, core pool size, maximum pool size',
    structuredData: createCourseSchema('ThreadPoolExecutor Internals', 'Deep dive into Java ThreadPoolExecutor implementation')
  }
}

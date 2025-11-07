// Global search index for the application
// This file creates a comprehensive searchable index of all content

// Define category groups locally to avoid circular imports
const categoryGroups = {
  'Java': {
    icon: '☕',
    color: '#f59e0b',
    items: ['Core Java', 'Java 8', 'Java 11', 'Java 15', 'Java 21', 'Java 24']
  },
  'Design': {
    icon: '🎨',
    color: '#8b5cf6',
    items: ['Design Patterns', 'Microservice Design Patterns', 'Class', 'System Design', 'Module', 'Function', 'Interface']
  },
  'Databases': {
    icon: '🗃️',
    color: '#3b82f6',
    items: ['SQL', 'NoSQL', 'Oracle', 'ORM']
  },
  'My Projects': {
    icon: '💼',
    color: '#10b981',
    items: ['Var/CVar', 'Var/CVar - Advanced', 'Var/CVar 3', 'Dark Pool Matching Engine', 'Dark Pool Matching Engine - Basic', 'Medi/Health', 'Dark Pool Engine 3', 'Monolith to Microservice', 'Financial Banking']
  },
  'Frameworks': {
    icon: '🌱',
    color: '#ec4899',
    items: ['Spring', 'Spring Boot', 'REST API']
  },
  'DevOps': {
    icon: '🛠️',
    color: '#0ea5e9',
    items: ['DevOps', 'Deployment', 'Docker', 'Kubernetes', 'Testing', 'CI/CD', 'Agile Scrum', 'Production Support']
  },
  'Messaging': {
    icon: '📨',
    color: '#f43f5e',
    items: ['Kafka', 'Apache Flink', 'Solace', 'RabbitMQ']
  },
  'Security': {
    icon: '🔒',
    color: '#ef4444',
    items: ['Security OWASP']
  },
  'Cloud': {
    icon: '☁️',
    color: '#0ea5e9',
    items: ['AWS', 'GCP', 'Azure']
  },
  'Practice': {
    icon: '💪',
    color: '#10b981',
    hasSubcategories: true,
    subcategories: {
      'Data Structures': {
        icon: '📊',
        items: ['Arrays', 'Strings', 'Linked Lists', 'Stacks', 'Queues', 'Hash Tables', 'Trees', 'Binary Trees', 'Binary Search Trees', 'Heaps', 'Graphs', 'Tries']
      },
      'Algorithms': {
        icon: '🎯',
        items: ['Searching', 'Binary Search', 'Sorting', 'Recursion', 'Dynamic Programming', 'Greedy Algorithms', 'Famous Algorithms', 'Union Find', 'Trie']
      },
      'Java Features': {
        icon: '☕',
        items: ['Streams', 'Lambdas', 'Functional Interfaces', 'Collections Framework']
      },
      'Concurrency': {
        icon: '🔀',
        items: ['Concurrency', 'Multithreading']
      },
      'Core Java Fundamentals': {
        icon: '⚙️',
        items: ['Object-Oriented Programming', 'Exception Handling', 'File I/O', 'JVM Internals', 'Memory Management', 'Data Structures', 'Strings', 'Generics']
      },
      'System Design': {
        icon: '🛠️',
        items: ['Design Patterns Practice', 'LRU Cache', 'Rate Limiter', 'Design Problems']
      },
      'Frameworks': {
        icon: '🌱',
        items: ['Spring Annotations Questions']
      }
    }
  }
}

// Create comprehensive search index
export const createSearchIndex = () => {
  const searchIndex = []

  // Add top-level categories
  Object.entries(categoryGroups).forEach(([categoryName, categoryData]) => {
    searchIndex.push({
      id: `category-${categoryName}`,
      type: 'category',
      title: categoryName,
      description: `${categoryData.icon} ${categoryName} - Main category`,
      icon: categoryData.icon,
      color: categoryData.color,
      path: [categoryName],
      breadcrumb: categoryName,
      keywords: [categoryName.toLowerCase()],
      navigateTo: () => ({ type: 'category', value: categoryName })
    })

    // Add subcategories if they exist
    if (categoryData.hasSubcategories && categoryData.subcategories) {
      Object.entries(categoryData.subcategories).forEach(([subName, subData]) => {
        searchIndex.push({
          id: `subcategory-${categoryName}-${subName}`,
          type: 'subcategory',
          title: subName,
          description: `${subData.icon} ${subName} - ${subData.items.length} items`,
          icon: subData.icon,
          color: categoryData.color,
          path: [categoryName, subName],
          breadcrumb: `${categoryName} → ${subName}`,
          keywords: [subName.toLowerCase(), categoryName.toLowerCase()],
          navigateTo: () => ({ type: 'subcategory', category: categoryName, subcategory: subName })
        })

        // Add items within subcategories
        subData.items.forEach(item => {
          searchIndex.push({
            id: `item-${categoryName}-${subName}-${item}`,
            type: 'component',
            title: item,
            description: `${item} - Practice component`,
            icon: subData.icon,
            color: categoryData.color,
            path: [categoryName, subName, item],
            breadcrumb: `${categoryName} → ${subName} → ${item}`,
            keywords: [item.toLowerCase(), subName.toLowerCase(), categoryName.toLowerCase()],
            navigateTo: () => ({ type: 'component', value: item })
          })
        })
      })
    } else {
      // Add regular category items
      categoryData.items.forEach(item => {
        searchIndex.push({
          id: `item-${categoryName}-${item}`,
          type: 'component',
          title: item,
          description: `${item} - ${categoryName} component`,
          icon: categoryData.icon,
          color: categoryData.color,
          path: [categoryName, item],
          breadcrumb: `${categoryName} → ${item}`,
          keywords: [item.toLowerCase(), categoryName.toLowerCase()],
          navigateTo: () => ({ type: 'component', value: item })
        })
      })
    }
  })

  // Add detailed component descriptions from optionGroups
  const detailedComponents = [
    // Core Programming
    {
      value: 'Core Java',
      title: 'Core Java',
      description: 'Comprehensive Java programming fundamentals including OOP principles, collections framework, exception handling, multithreading, and JVM internals.',
      keywords: ['java', 'oop', 'collections', 'multithreading', 'jvm', 'programming', 'fundamentals']
    },
    {
      value: 'Java 8',
      title: 'Java 8',
      description: 'Java 8 features including lambda expressions, streams API, optional, method references, and functional programming.',
      keywords: ['java8', 'lambda', 'streams', 'optional', 'functional', 'programming']
    },
    {
      value: 'Var/CVar',
      title: 'VaR/CVaR',
      description: 'Value at Risk and Conditional Value at Risk calculations for financial risk management.',
      keywords: ['var', 'cvar', 'risk', 'financial', 'value', 'conditional']
    },
    {
      value: 'Spring',
      title: 'Spring Framework',
      description: 'Spring framework including dependency injection, AOP, MVC, and enterprise application development.',
      keywords: ['spring', 'dependency', 'injection', 'aop', 'mvc', 'framework']
    },
    {
      value: 'Design Patterns',
      title: 'Design Patterns',
      description: 'Gang of Four design patterns including creational, structural, and behavioral patterns.',
      keywords: ['design', 'patterns', 'gof', 'creational', 'structural', 'behavioral']
    },
    {
      value: 'Microservice Design Patterns',
      title: 'Microservice Design Patterns',
      description: 'Microservice architecture patterns including API gateway, circuit breaker, and service mesh.',
      keywords: ['microservice', 'architecture', 'api', 'gateway', 'circuit', 'breaker', 'service', 'mesh']
    },
    {
      value: 'SQL',
      title: 'SQL',
      description: 'Structured Query Language for database operations, joins, indexing, and optimization.',
      keywords: ['sql', 'database', 'query', 'joins', 'indexing', 'optimization']
    },
    {
      value: 'NoSQL',
      title: 'NoSQL',
      description: 'NoSQL databases including MongoDB, Cassandra, and document/key-value stores.',
      keywords: ['nosql', 'mongodb', 'cassandra', 'document', 'keyvalue', 'database']
    },
    {
      value: 'Docker',
      title: 'Docker',
      description: 'Containerization with Docker including images, containers, networking, and orchestration.',
      keywords: ['docker', 'container', 'containerization', 'images', 'networking', 'orchestration']
    },
    {
      value: 'Kubernetes',
      title: 'Kubernetes',
      description: 'Container orchestration with Kubernetes including pods, services, deployments, and scaling.',
      keywords: ['kubernetes', 'k8s', 'orchestration', 'pods', 'services', 'deployments', 'scaling']
    },
    {
      value: 'AWS',
      title: 'Amazon Web Services',
      description: 'AWS cloud services including EC2, S3, Lambda, RDS, and cloud architecture.',
      keywords: ['aws', 'amazon', 'cloud', 'ec2', 's3', 'lambda', 'rds', 'architecture']
    },
    {
      value: 'Kafka',
      title: 'Apache Kafka',
      description: 'Distributed streaming platform for building real-time data pipelines and streaming applications.',
      keywords: ['kafka', 'streaming', 'messaging', 'distributed', 'realtime', 'pipelines']
    }
  ]

  // Enhance existing entries with detailed descriptions
  detailedComponents.forEach(component => {
    const existingIndex = searchIndex.findIndex(item => 
      item.title === component.title || item.title === component.value
    )
    
    if (existingIndex !== -1) {
      searchIndex[existingIndex].description = component.description
      searchIndex[existingIndex].keywords = [
        ...searchIndex[existingIndex].keywords,
        ...component.keywords
      ]
    }
  })

  return searchIndex
}

// Search function with fuzzy matching and ranking
export const searchContent = (query, searchIndex) => {
  if (!query || query.trim().length === 0) {
    return []
  }

  const normalizedQuery = query.toLowerCase().trim()
  const queryWords = normalizedQuery.split(/\s+/)
  
  const results = searchIndex
    .map(item => {
      let score = 0
      let matchedTerms = []

      // Exact title match (highest priority)
      if (item.title.toLowerCase() === normalizedQuery) {
        score += 1000
        matchedTerms.push(item.title)
      }

      // Title starts with query (very high priority)
      else if (item.title.toLowerCase().startsWith(normalizedQuery)) {
        score += 500
        matchedTerms.push(item.title)
      }

      // Title contains query as whole word
      else if (new RegExp(`\\b${normalizedQuery}\\b`, 'i').test(item.title)) {
        score += 300
        matchedTerms.push(item.title)
      }

      // Title contains query anywhere
      else if (item.title.toLowerCase().includes(normalizedQuery)) {
        score += 100
        matchedTerms.push(item.title)
      }

      // Check individual words in title (only for multi-word queries)
      if (queryWords.length > 1) {
        let wordMatchCount = 0
        queryWords.forEach(word => {
          if (word.length > 2 && item.title.toLowerCase().includes(word)) {
            wordMatchCount++
            matchedTerms.push(word)
          }
        })
        score += wordMatchCount * 50
      }

      // Exact keyword match
      item.keywords.forEach(keyword => {
        if (keyword === normalizedQuery) {
          score += 400
          matchedTerms.push(keyword)
        } else if (keyword.startsWith(normalizedQuery)) {
          score += 200
          matchedTerms.push(keyword)
        } else if (new RegExp(`\\b${normalizedQuery}\\b`, 'i').test(keyword)) {
          score += 150
          matchedTerms.push(keyword)
        } else if (keyword.includes(normalizedQuery) && normalizedQuery.length > 3) {
          score += 50
          matchedTerms.push(keyword)
        }
      })

      // Description matches (lower priority, only for longer queries)
      if (normalizedQuery.length > 3 && item.description.toLowerCase().includes(normalizedQuery)) {
        score += 10
        matchedTerms.push('description')
      }

      // Breadcrumb matches
      if (item.breadcrumb.toLowerCase().includes(normalizedQuery)) {
        score += 20
        matchedTerms.push('breadcrumb')
      }

      // Boost score based on item type
      if (item.type === 'component') score += 30  // Components are what users usually want
      if (item.type === 'subcategory') score += 20
      if (item.type === 'category') score += 10

      return {
        ...item,
        score,
        matchedTerms: [...new Set(matchedTerms)],
        highlightedTitle: highlightMatches(item.title, queryWords),
        highlightedDescription: highlightMatches(item.description, queryWords)
      }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10) // Limit to top 10 results

  return results
}

// Helper function to highlight matching terms
const highlightMatches = (text, queryWords) => {
  let highlighted = text
  queryWords.forEach(word => {
    const regex = new RegExp(`(${word})`, 'gi')
    highlighted = highlighted.replace(regex, '<mark>$1</mark>')
  })
  return highlighted
}

// Group results by type for better display
export const groupSearchResults = (results) => {
  const grouped = {
    categories: [],
    subcategories: [],
    components: []
  }

  results.forEach(result => {
    if (result.type === 'category') {
      grouped.categories.push(result)
    } else if (result.type === 'subcategory') {
      grouped.subcategories.push(result)
    } else {
      grouped.components.push(result)
    }
  })

  return grouped
}

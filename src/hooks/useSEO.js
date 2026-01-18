import { useEffect } from 'react'
import { seoPresets, createBreadcrumbSchema } from '../components/SEOHead'

/**
 * Map of page/route names to SEO preset keys
 */
const PAGE_TO_SEO_PRESET = {
  // Homepage
  '': 'home',

  // Java
  'Java': 'java',
  'Core Java': 'java',
  'Java 8': 'java8',
  'Java 11': 'java11',
  'Java 15': 'java',
  'Java 21': 'java21',
  'Java 24': 'java',

  // Python
  'Python': 'python',
  'Core Python': 'python',
  'Python OOP': 'python',
  'Python Advanced': 'python',
  'Data Science': 'python',
  'Machine Learning': 'python',

  // Design & Architecture
  'Design': 'designPatterns',
  'Design Patterns': 'designPatterns',
  'Design Patterns Practice': 'designPatterns',
  'Microservice Design Patterns': 'microservices',
  'System Design': 'systemDesign',
  'Event Driven Architecture': 'systemDesign',
  'Domain Driven Design': 'systemDesign',

  // Practice - Algorithms
  'Practice': 'practice',
  'Arrays': 'arrays',
  'Hash Tables': 'algorithms',
  'Linked Lists': 'algorithms',
  'Stacks': 'algorithms',
  'Queues': 'algorithms',
  'Trees': 'trees',
  'Binary Trees': 'trees',
  'Binary Search Trees': 'trees',
  'Graphs': 'graphs',
  'Heaps': 'algorithms',
  'Sorting': 'algorithms',
  'Binary Search': 'algorithms',
  'Recursion': 'algorithms',
  'Dynamic Programming': 'dynamicProgramming',
  'DP Patterns': 'dynamicProgramming',
  'Union Find': 'algorithms',
  'Trie': 'algorithms',
  'Sliding Window': 'algorithms',
  'Backtracking': 'algorithms',
  'Two Pointers': 'algorithms',
  'Greedy Algorithms': 'algorithms',
  'Bit Manipulation': 'algorithms',

  // Frameworks
  'Frameworks': 'spring',
  'Spring': 'spring',
  'Spring Boot': 'springBoot',
  'REST API': 'springBoot',
  'Hibernate': 'databases',
  'gRPC': 'springBoot',
  'SOAP': 'springBoot',
  'React': 'algorithms',
  'Actuator': 'springBoot',
  'Dependency Injection': 'spring',

  // Databases
  'Databases': 'databases',
  'SQL': 'sql',
  'NoSQL': 'nosql',
  'Oracle': 'sql',
  'ORM': 'databases',
  'Redis': 'nosql',
  'PL/SQL': 'sql',

  // DevOps
  'DevOps': 'devops',
  'Deployment': 'devops',
  'Docker': 'docker',
  'Kubernetes': 'kubernetes',
  'CI/CD': 'devops',
  'Testing': 'devops',
  'TeamCity': 'devops',
  'Jenkins': 'devops',
  'Prometheus': 'devops',
  'Grafana': 'devops',

  // Messaging
  'Kafka': 'kafka',
  'Apache Flink': 'kafka',
  'RabbitMQ': 'kafka',
  'Solace': 'kafka',
  'MuleSoft': 'kafka',

  // Cloud
  'Cloud': 'cloud',
  'AWS': 'aws',
  'GCP': 'cloud',
  'Azure': 'cloud',

  // Security
  'Security': 'security',
  'Security OWASP': 'security',
  'JWT': 'security',
  'OAuth': 'security',
  'OAuth2': 'security',

  // Questions
  'Questions': 'questions',
  'Java 8 Questions': 'questions',
  'Java 11 Questions': 'questions',
  'Java 15 Questions': 'questions',
  'Java 21 Questions': 'questions',
  'Java 24 Questions': 'questions',
  'SQL Questions': 'questions',
  'Hibernate Questions': 'questions',
  'Kafka Questions': 'questions',
  'RabbitMQ Questions': 'questions',
  'Solace Questions': 'questions',
  'REST API Questions': 'questions',
  'Jenkins Questions': 'questions',
  'TeamCity Questions': 'questions',
  'Prometheus Questions': 'questions',
  'Grafana Questions': 'questions',
  'Spring Core Questions': 'questions',
  'Spring Boot Questions': 'questions',
  'Spring Security Questions': 'questions',
  'Spring Data JPA Questions': 'questions',
  'Spring Annotations Questions': 'questions',

  // AI Interview
  'AI Interview': 'practice',

  // Progress Dashboard
  'Progress Dashboard': 'home',

  // Projects
  'HashMap - Internal Workings': 'hashmap',
  'Blocking Queue': 'blockingQueue',
  'ConcurrentHashMap - Internal Workings': 'concurrentHashMap',
  'ThreadPoolExecutor - Internal Workings': 'threadPoolExecutor',
  'CompletableFuture - Internal Workings': 'completableFuture',
}

/**
 * Get breadcrumb items based on current page
 */
const getBreadcrumbs = (selectedOption) => {
  if (!selectedOption) {
    return [{ name: 'Home', path: '/' }]
  }

  const breadcrumbs = [{ name: 'Home', path: '/' }]

  // Add category breadcrumb based on page type
  if (['Java 8', 'Java 11', 'Java 15', 'Java 21', 'Java 24', 'Core Java'].includes(selectedOption)) {
    breadcrumbs.push({ name: 'Java', path: '/java' })
  } else if (selectedOption.includes('Python') || ['Data Science', 'Machine Learning', 'Web Frameworks', 'Async Python'].includes(selectedOption)) {
    breadcrumbs.push({ name: 'Python', path: '/python' })
  } else if (['Arrays', 'Hash Tables', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Binary Search'].includes(selectedOption)) {
    breadcrumbs.push({ name: 'Practice', path: '/practice' })
  } else if (selectedOption.includes('Questions')) {
    breadcrumbs.push({ name: 'Questions', path: '/questions' })
  } else if (['Spring', 'Spring Boot', 'REST API', 'Hibernate', 'gRPC', 'SOAP'].includes(selectedOption)) {
    breadcrumbs.push({ name: 'Frameworks', path: '/frameworks' })
  } else if (['SQL', 'NoSQL', 'Oracle', 'ORM', 'Redis', 'PL/SQL'].includes(selectedOption)) {
    breadcrumbs.push({ name: 'Databases', path: '/databases' })
  } else if (['Docker', 'Kubernetes', 'CI/CD', 'Deployment', 'Jenkins', 'TeamCity'].includes(selectedOption)) {
    breadcrumbs.push({ name: 'DevOps', path: '/devops' })
  } else if (['AWS', 'GCP', 'Azure'].includes(selectedOption)) {
    breadcrumbs.push({ name: 'Cloud', path: '/cloud' })
  }

  // Add current page if not the category page itself
  if (selectedOption && !['Java', 'Python', 'Practice', 'Questions', 'Frameworks', 'Databases', 'DevOps', 'Cloud', 'Design'].includes(selectedOption)) {
    breadcrumbs.push({ name: selectedOption, path: '#' })
  }

  return breadcrumbs
}

/**
 * Custom hook to manage SEO based on current page
 * @param {string} selectedOption - The currently selected page/option
 */
export function useSEO(selectedOption) {
  useEffect(() => {
    // Get the SEO preset key for this page
    const presetKey = PAGE_TO_SEO_PRESET[selectedOption] || PAGE_TO_SEO_PRESET['']
    const preset = seoPresets[presetKey] || seoPresets.home

    // Update document title
    document.title = preset.title

    // Helper function to update or create meta tag
    const updateMetaTag = (selector, attribute, value) => {
      let element = document.querySelector(selector)
      if (element) {
        element.setAttribute(attribute, value)
      } else {
        element = document.createElement('meta')
        if (selector.includes('property=')) {
          const match = selector.match(/property="([^"]+)"/)
          if (match) element.setAttribute('property', match[1])
        } else if (selector.includes('name=')) {
          const match = selector.match(/name="([^"]+)"/)
          if (match) element.setAttribute('name', match[1])
        }
        element.setAttribute(attribute, value)
        document.head.appendChild(element)
      }
    }

    // Update meta tags
    updateMetaTag('meta[name="description"]', 'content', preset.description)
    updateMetaTag('meta[name="keywords"]', 'content', preset.keywords)

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', 'content', preset.title)
    updateMetaTag('meta[property="og:description"]', 'content', preset.description)
    updateMetaTag('meta[property="og:url"]', 'content', window.location.href)

    // Update Twitter tags
    updateMetaTag('meta[name="twitter:title"]', 'content', preset.title)
    updateMetaTag('meta[name="twitter:description"]', 'content', preset.description)

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      canonical.setAttribute('href', window.location.href)
    }

    // Update structured data
    if (preset.structuredData) {
      let scriptTag = document.querySelector('script[type="application/ld+json"][data-seo-dynamic]')
      if (!scriptTag) {
        scriptTag = document.createElement('script')
        scriptTag.setAttribute('type', 'application/ld+json')
        scriptTag.setAttribute('data-seo-dynamic', 'true')
        document.head.appendChild(scriptTag)
      }
      scriptTag.textContent = JSON.stringify(preset.structuredData)
    }

    // Add breadcrumb structured data
    const breadcrumbs = getBreadcrumbs(selectedOption)
    if (breadcrumbs.length > 1) {
      let breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-breadcrumb]')
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script')
        breadcrumbScript.setAttribute('type', 'application/ld+json')
        breadcrumbScript.setAttribute('data-breadcrumb', 'true')
        document.head.appendChild(breadcrumbScript)
      }
      breadcrumbScript.textContent = JSON.stringify(createBreadcrumbSchema(breadcrumbs))
    }

  }, [selectedOption])
}

export default useSEO

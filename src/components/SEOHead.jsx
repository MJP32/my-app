import { useEffect } from 'react'

/**
 * Dynamic SEO Head component for managing meta tags
 * Updates document head with page-specific SEO metadata
 */
function SEOHead({
  title = 'Java Learning Platform - Master Java, Design Patterns & System Design',
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
export const seoPresets = {
  java8: {
    title: 'Java 8 Features - Lambda, Streams, Functional Programming Tutorial',
    description: 'Master Java 8 features including lambda expressions, Stream API, functional interfaces, Optional class, and new Date/Time API. Complete tutorial with 100+ code examples and practice problems.',
    keywords: 'Java 8, lambda expressions, streams api, functional programming, optional, date time api, method references',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Java 8 Features Tutorial",
      "description": "Comprehensive guide to Java 8 features",
      "provider": {
        "@type": "Organization",
        "name": "Java Learning Platform"
      }
    }
  },

  java11: {
    title: 'Java 11 LTS Features - Complete Tutorial & Examples',
    description: 'Learn Java 11 LTS features: local variable type inference (var), HTTP Client API, String methods, Flight Recorder, and performance improvements. Production-ready examples included.',
    keywords: 'Java 11, LTS, var keyword, HTTP Client, Java 11 features, local variable type inference',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Java 11 LTS Tutorial",
      "description": "Complete guide to Java 11 Long Term Support features"
    }
  },

  java21: {
    title: 'Java 21 LTS - Virtual Threads, Pattern Matching & New Features',
    description: 'Master Java 21 LTS: Virtual Threads (Project Loom), pattern matching for switch, record patterns, sequenced collections, and structured concurrency. Latest Java features explained.',
    keywords: 'Java 21, virtual threads, project loom, pattern matching, record patterns, sequenced collections, structured concurrency',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Java 21 LTS Tutorial",
      "description": "Latest Java 21 features and best practices"
    }
  },

  designPatterns: {
    title: 'Design Patterns - Gang of Four Patterns with Java Examples',
    description: 'Learn 23 Gang of Four design patterns: Creational, Structural, and Behavioral patterns. Complete Java implementations with real-world examples, UML diagrams, and best practices.',
    keywords: 'design patterns, gang of four, singleton, factory, observer, strategy, creational patterns, structural patterns, behavioral patterns',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Design Patterns Tutorial",
      "description": "Complete guide to software design patterns"
    }
  },

  systemDesign: {
    title: 'System Design Interview Preparation - Architecture & Scalability',
    description: 'Master system design interviews: scalability, high availability, load balancing, caching, CAP theorem, microservices architecture, and distributed systems. Real interview questions solved.',
    keywords: 'system design, system architecture, scalability, high availability, load balancing, caching, distributed systems, microservices',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "System Design Tutorial",
      "description": "System architecture and design interview preparation"
    }
  },

  spring: {
    title: 'Spring Framework Tutorial - IoC, DI, AOP & Enterprise Development',
    description: 'Complete Spring Framework guide: Dependency Injection, IoC container, AOP, transaction management, Spring MVC, and enterprise application development with practical examples.',
    keywords: 'spring framework, dependency injection, IoC, AOP, spring mvc, transaction management, spring boot',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Spring Framework Tutorial",
      "description": "Enterprise Java development with Spring"
    }
  },

  springBoot: {
    title: 'Spring Boot Tutorial - Build Microservices & REST APIs',
    description: 'Learn Spring Boot: auto-configuration, embedded servers, REST API development, microservices, Spring Data JPA, Spring Security, and production deployment. Complete project-based learning.',
    keywords: 'spring boot, microservices, rest api, spring boot tutorial, spring data jpa, spring security, embedded servers',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Spring Boot Tutorial",
      "description": "Modern microservices development with Spring Boot"
    }
  },

  algorithms: {
    title: 'Data Structures & Algorithms - Complete Interview Preparation',
    description: 'Master DSA for coding interviews: arrays, linked lists, trees, graphs, sorting, searching, dynamic programming, and graph algorithms. 500+ practice problems with solutions.',
    keywords: 'data structures, algorithms, coding interview, leetcode, dynamic programming, graph algorithms, trees, arrays',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Data Structures & Algorithms",
      "description": "Complete DSA interview preparation"
    }
  },

  practice: {
    title: 'Coding Practice Problems - LeetCode Style Java & Python Challenges',
    description: 'Practice 500+ coding problems in Java and Python: data structures, algorithms, system design, and Java features. Track progress, get hints, and ace your coding interviews.',
    keywords: 'coding practice, leetcode problems, java practice, python practice, coding challenges, interview preparation',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Coding Practice Platform",
      "description": "Interactive coding practice problems"
    }
  }
}

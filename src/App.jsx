import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TechnicalDetails from './TechnicalDetails.jsx'
import TechnicalDetailsAdvanced from './TechnicalDetailsAdvanced.jsx'
import DarkPoolMatchingEngine from './DarkPoolMatchingEngine.jsx'
import DarkPoolMatchingEngineBasic from './DarkPoolMatchingEngineBasic.jsx'
import ApacheKafka from './ApacheKafka.jsx'
import ApacheFlink from './ApacheFlink.jsx'
import Solace from './Solace.jsx'
import RabbitMQ from './RabbitMQ.jsx'
import CoreJava from './CoreJava.jsx'
import FunctionalProgramming from './FunctionalProgramming.jsx'
import Java11 from './Java11.jsx'
import Java8 from './Java8.jsx'
import Java15 from './Java15.jsx'
import Java21 from './Java21.jsx'
import DesignPatterns from './DesignPatterns.jsx'
import Spring from './Spring.jsx'
import SQL from './SQL.jsx'
import NoSQL from './NoSQL.jsx'
import ORM from './ORM.jsx'
import Module from './Module.jsx'
import DevOps from './DevOps.jsx'
import MicroservicePatterns from './MicroservicePatterns.jsx'
import Class from './Class.jsx'
import Interface from './Interface.jsx'

// Main category groups (defined outside component to prevent recreation)
const categoryGroups = {
  'Java': {
    icon: '☕',
    color: '#f59e0b',
    items: ['Core Java', 'Java 8', 'Java 11', 'Java 15', 'Java 21', 'Java 24']
  },
  'Design': {
    icon: '🎨',
    color: '#8b5cf6',
    items: ['Design Patterns', 'Microservice Design Patterns', 'Class']
  },
  'Databases': {
    icon: '🗃️',
    color: '#3b82f6',
    items: ['SQL', 'NoSQL', 'ORM']
  },
  'My Projects': {
    icon: '💼',
    color: '#10b981',
    items: ['Var/CVar', 'Var/CVar - Advanced', 'Dark Pool Matching Engine', 'Dark Pool Matching Engine - Basic']
  },
  'Frameworks': {
    icon: '🌱',
    color: '#ec4899',
    items: ['Spring', 'Kafka', 'Apache Flink', 'Module', 'Function', 'Interface']
  },
  'DevOps': {
    icon: '🛠️',
    color: '#0ea5e9',
    items: ['DevOps']
  },
  'Messaging': {
    icon: '📨',
    color: '#f43f5e',
    items: ['Kafka', 'Apache Flink', 'Solace', 'RabbitMQ']
  }
}

function App() {
  const [count, setCount] = useState(0)
  const [selectedOption, setSelectedOption] = useState('')
  const [hoveredOption, setHoveredOption] = useState(null)
  const [expandedGroup, setExpandedGroup] = useState(null)
  const [focusedCategoryIndex, setFocusedCategoryIndex] = useState(0)
  const [focusedItemIndex, setFocusedItemIndex] = useState(0)

  // Use ref to always have access to current selectedOption in event handlers
  const selectedOptionRef = useRef(selectedOption)

  // Keep ref in sync with state
  useEffect(() => {
    selectedOptionRef.current = selectedOption
  }, [selectedOption])

  // Custom setter that updates both state and ref immediately
  const setSelectedOptionAndRef = (value) => {
    selectedOptionRef.current = value
    setSelectedOption(value)
  }

  // Organize options into logical groups
  const optionGroups = {
    // Row 1: Core Programming & Architecture
    'Core Programming': [
      {
        value: 'Core Java',
        label: '☕ Core Java',
        description: 'Comprehensive Java programming fundamentals including OOP principles, collections framework, exception handling, multithreading, and JVM internals. Covers design patterns, memory management, garbage collection, and performance optimization techniques.',
        metrics: ['OOP Principles', 'Collections Framework', 'Multithreading', 'JVM Internals'],
        complexity: 'Beginner to Intermediate',
        industry: 'Software Development, Enterprise'
      },
      {
        value: 'Function',
        label: '⚡ Functional Programming',
        description: 'Comprehensive method design patterns, functional programming paradigms, lambda expressions, and stream processing in Java. Covers higher-order functions, immutability principles, functional composition, and reactive programming.',
        metrics: ['Lambda Expressions', 'Stream API', 'Functional Composition', 'Reactive Programming'],
        complexity: 'Intermediate to Advanced',
        industry: 'Software Development, Fintech'
      },
      {
        value: 'Class',
        label: '🏗️ Object-Oriented Design',
        description: 'Object-oriented design principles, encapsulation strategies, inheritance hierarchies, composition patterns, and enterprise design patterns. Includes SOLID principles, Gang of Four patterns, and architectural best practices.',
        metrics: ['Design Patterns', 'SOLID Principles', 'Architecture Patterns', 'Enterprise Integration'],
        complexity: 'Intermediate to Advanced',
        industry: 'Enterprise Software, System Design'
      },
      {
        value: 'Interface',
        label: '🔌 Interface Design',
        description: 'Contract programming methodologies, dependency injection frameworks, strategy patterns, and polymorphism implementation. Advanced topics include interface segregation and API design principles.',
        metrics: ['Contract Programming', 'Dependency Injection', 'Strategy Patterns', 'API Design'],
        complexity: 'Intermediate to Advanced',
        industry: 'Microservices, API Development'
      },
      {
        value: 'Design Patterns',
        label: '🎨 Design Patterns',
        description: 'Classic and modern software design patterns including Gang of Four patterns, architectural patterns, and enterprise integration patterns. Covers creational, structural, and behavioral patterns.',
        metrics: ['Creational Patterns', 'Structural Patterns', 'Behavioral Patterns', 'Enterprise Patterns'],
        complexity: 'Intermediate to Advanced',
        industry: 'Software Architecture, Object-Oriented Design'
      }
    ],
    'Java Versions': [
      {
        value: 'Java 8',
        label: '🎯 Java 8',
        description: 'Modern Java programming with Java 8 features including lambda expressions, streams API, functional interfaces, optional class, and new date/time API. Covers parallel processing and functional programming paradigms.',
        metrics: ['Lambda Expressions', 'Streams API', 'Functional Programming', 'Parallel Processing'],
        complexity: 'Intermediate',
        industry: 'Modern Java Development'
      },
      {
        value: 'Java 11',
        label: '🔧 Java 11 LTS',
        description: 'Java 11 Long Term Support features including local variable type inference, HTTP client API, flight recorder, and performance improvements. Covers module system enhancements and new garbage collectors.',
        metrics: ['HTTP Client', 'Local Variable Inference', 'Module System', 'Performance Tuning'],
        complexity: 'Intermediate',
        industry: 'Enterprise Java, LTS Applications'
      },
      {
        value: 'Java 15',
        label: '📝 Java 15',
        description: 'Java 15 innovations including text blocks, sealed classes preview, pattern matching enhancements, and hidden classes. Covers ZGC improvements and foreign-function interface features.',
        metrics: ['Text Blocks', 'Sealed Classes', 'Pattern Matching', 'ZGC Improvements'],
        complexity: 'Advanced',
        industry: 'Modern Java, Research & Development'
      },
      {
        value: 'Java 21',
        label: '🚀 Java 21 LTS',
        description: 'Latest Java 21 LTS features including virtual threads, pattern matching for switch, record patterns, and sequenced collections. Covers Project Loom and structured concurrency.',
        metrics: ['Virtual Threads', 'Pattern Matching', 'Structured Concurrency', 'Record Patterns'],
        complexity: 'Advanced',
        industry: 'Next-Gen Java, High-Performance Computing'
      },
      {
        value: 'Java 24',
        label: '🔮 Java 24 Preview',
        description: 'Cutting-edge Java 24 preview features and experimental capabilities. Covers upcoming language enhancements, JVM improvements, and next-generation development tools.',
        metrics: ['Future Features', 'JVM Enhancements', 'Language Evolution', 'Experimental APIs'],
        complexity: 'Expert Level',
        industry: 'Research & Development, Early Adopters'
      }
    ],
    // Row 2: Frameworks & Data Technologies
    'Frameworks & Middleware': [
      {
        value: 'Spring',
        label: '🌱 Spring Framework',
        description: 'Enterprise Java development with Spring ecosystem including Spring Boot, Spring Security, Spring Data, and Spring Cloud. Covers dependency injection, AOP, microservices architecture, and reactive programming.',
        metrics: ['Dependency Injection', 'Microservices', 'Security', 'Cloud Integration'],
        complexity: 'Intermediate to Advanced',
        industry: 'Enterprise Java, Microservices'
      },
      {
        value: 'Kafka',
        label: '🚀 Apache Kafka',
        description: 'Distributed event streaming platform for high-throughput, fault-tolerant messaging systems. Covers Kafka architecture, producers, consumers, partitioning, replication, and stream processing with Kafka Streams.',
        metrics: ['Event Streaming', 'Message Queues', 'Stream Processing', 'Distributed Systems'],
        complexity: 'Intermediate to Advanced',
        industry: 'Real-time Analytics, Microservices'
      },
      {
        value: 'Apache Flink',
        label: '🌊 Apache Flink',
        description: 'Stream processing framework for real-time data analytics and event-driven applications. Covers stateful computations, event time processing, windowing, checkpointing, and fault tolerance.',
        metrics: ['Stream Processing', 'Event Time Handling', 'Stateful Computing', 'Fault Tolerance'],
        complexity: 'Advanced to Expert',
        industry: 'Real-time Analytics, IoT, Financial Trading'
      },
      {
        value: 'Solace',
        label: '📨 Solace PubSub+',
        description: 'Enterprise event mesh platform for hybrid cloud messaging. Covers event broker, message VPNs, persistent messaging, replay capabilities, and multi-protocol support including AMQP, MQTT, REST.',
        metrics: ['Event Mesh', 'Message VPN', 'Persistent Delivery', 'Multi-Protocol'],
        complexity: 'Intermediate to Advanced',
        industry: 'Enterprise Messaging, Event-Driven Architecture'
      },
      {
        value: 'RabbitMQ',
        label: '🐰 RabbitMQ',
        description: 'Robust AMQP message broker with flexible routing, clustering, and high availability. Covers exchanges, queues, bindings, publisher confirms, consumer acknowledgments, and federation.',
        metrics: ['AMQP Protocol', 'Message Routing', 'Clustering', 'High Availability'],
        complexity: 'Intermediate to Advanced',
        industry: 'Microservices, Distributed Systems'
      },
      {
        value: 'Module',
        label: '📦 Modular Architecture',
        description: 'Domain-driven design principles, bounded contexts implementation, microservices architecture patterns, and modular programming techniques. Covers event sourcing, CQRS, and hexagonal architecture.',
        metrics: ['Domain-Driven Design', 'Bounded Contexts', 'Microservices', 'Event Sourcing'],
        complexity: 'Advanced to Expert',
        industry: 'Enterprise Architecture, Distributed Systems'
      },
      {
        value: 'Microservice Design Patterns',
        label: '🔧 Microservice Patterns',
        description: 'Modern microservices architecture patterns including service decomposition, data management, communication patterns, and resilience strategies. Covers API gateway, circuit breaker, saga, and CQRS.',
        metrics: ['Service Decomposition', 'Communication Patterns', 'Data Consistency', 'Resilience Patterns'],
        complexity: 'Advanced to Expert',
        industry: 'Cloud-Native, Distributed Systems'
      }
      ,
      {
        value: 'DevOps',
        label: '🛠️ DevOps',
        description: 'End-to-end CI/CD automation, containerization, orchestration, and testing practices. Includes TeamCity, Jenkins, Docker, Kubernetes, and automated testing frameworks.',
        metrics: ['CI/CD', 'Containers', 'Orchestration', 'Test Automation'],
        complexity: 'Intermediate to Advanced',
        industry: 'Platform Engineering, Cloud-Native'
      }
    ],
    'Data & Persistence': [
      {
        value: 'SQL',
        label: '🗃️ SQL Databases',
        description: 'Comprehensive SQL database design, optimization, and administration. Covers advanced queries, indexing strategies, transaction management, performance tuning, and database design patterns.',
        metrics: ['Query Optimization', 'Database Design', 'Performance Tuning', 'Transaction Management'],
        complexity: 'Beginner to Advanced',
        industry: 'Enterprise Applications, Data Analytics'
      },
      {
        value: 'NoSQL',
        label: '📊 NoSQL Databases',
        description: 'Modern NoSQL database technologies including MongoDB, Cassandra, Redis, and DynamoDB. Covers document stores, key-value databases, column-family, and graph databases.',
        metrics: ['Document Stores', 'Key-Value Stores', 'Distributed Architecture', 'Scalability Patterns'],
        complexity: 'Intermediate to Advanced',
        industry: 'Big Data, Web Applications'
      },
      {
        value: 'ORM',
        label: '🔗 Object-Relational Mapping',
        description: 'Advanced ORM frameworks including Hibernate, JPA, MyBatis, and JDBC patterns. Covers entity mapping, query optimization, caching strategies, and transaction management.',
        metrics: ['Entity Mapping', 'Query Optimization', 'Caching Strategies', 'Transaction Management'],
        complexity: 'Intermediate to Advanced',
        industry: 'Enterprise Applications, Data Layer'
      },
      {
        value: 'Var/CVar',
        label: '📊 VaR/CVaR Basic',
        description: 'Value at Risk & Conditional Value at Risk - Essential financial risk metrics for portfolio management. Includes basic VaR calculations, confidence intervals, and fundamental risk reporting.',
        metrics: ['Historical VaR', 'Monte Carlo Basic', 'Portfolio Risk', 'Compliance Reports'],
        complexity: 'Beginner to Intermediate',
        industry: 'Financial Services, Banking'
      },
      {
        value: 'Var/CVar - Advanced',
        label: '🚀 VaR/CVaR Advanced',
        description: 'Advanced VaR/CVaR implementations with Monte Carlo simulations, stress testing, backtesting frameworks, and real-time calculations. Features sophisticated risk modeling and extreme value theory.',
        metrics: ['Real-time Processing', 'Monte Carlo Advanced', 'Stress Testing', 'Backtesting Framework'],
        complexity: 'Advanced to Expert',
        industry: 'Investment Banking, Hedge Funds'
      },
      {
        value: 'Dark Pool Matching Engine',
        label: '🌊 Dark Pool Engine',
        description: 'Advanced dark pool trading system with sophisticated order matching algorithms, liquidity optimization, and minimal market impact execution. Features real-time order book management.',
        metrics: ['Order Matching', 'Liquidity Optimization', 'Smart Routing', 'Privacy Controls'],
        complexity: 'Expert Level',
        industry: 'High-Frequency Trading, Investment Banking'
      },
      {
        value: 'Dark Pool Matching Engine - Basic',
        label: '🌊 Dark Pool - Basic',
        description: 'Streaming platform and real-time risk analytics for rates trading. Kafka-based event processing, Apache Flink integration, fault-tolerant systems with Spring Reactor for high-frequency trading operations.',
        metrics: ['Kafka Streaming', 'Real-time Risk', 'Apache Flink', 'Oracle Coherence'],
        complexity: 'Advanced to Expert',
        industry: 'Investment Banking, Trading Desk Operations'
      }
    ]
  }

  // Flatten all options for easy access
  const options = Object.values(optionGroups).flat()

  // Initial focus on mount
  useEffect(() => {
    // Focus first category button on page load
    const firstButton = document.querySelector('[data-category-index="0"]')
    if (firstButton) {
      setTimeout(() => firstButton.focus(), 100)
    }
  }, [])

  // Auto-focus the focused button
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(() => {
      // If viewing a component, don't try to focus menu buttons
      if (selectedOptionRef.current) return

      if (!expandedGroup) {
        // Focus category button
        const categoryButton = document.querySelector(`[data-category-index="${focusedCategoryIndex}"]`)
        if (categoryButton) {
          categoryButton.focus()
        }
      } else {
        // Focus item button
        const itemButton = document.querySelector(`[data-item-index="${focusedItemIndex}"]`)
        if (itemButton) {
          itemButton.focus()
        }
      }
    })
  }, [focusedCategoryIndex, focusedItemIndex, expandedGroup, selectedOption])

  // Track previous selectedOption state to detect when we return to menu
  const [previousSelectedOption, setPreviousSelectedOption] = useState('')

  useEffect(() => {
    // If we just returned to menu (selectedOption changed from something to empty)
    if (previousSelectedOption && !selectedOption) {
      // Capture current state
      const currentExpandedGroup = expandedGroup
      const currentCategoryIndex = focusedCategoryIndex
      const currentItemIndex = focusedItemIndex

      // Delay to ensure component has unmounted and menu is visible
      setTimeout(() => {
        if (!currentExpandedGroup) {
          const categoryButton = document.querySelector(`[data-category-index="${currentCategoryIndex}"]`)
          if (categoryButton) {
            categoryButton.focus()
          }
        } else {
          const itemButton = document.querySelector(`[data-item-index="${currentItemIndex}"]`)
          if (itemButton) {
            itemButton.focus()
          }
        }
      }, 150)
    }
    setPreviousSelectedOption(selectedOption)
  }, [selectedOption, expandedGroup, focusedCategoryIndex, focusedItemIndex, previousSelectedOption])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log('App.jsx KeyDown:', e.key, 'selectedOption:', selectedOptionRef.current)

      // Don't handle if typing in an input or textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return
      }

      const categoryNames = Object.keys(categoryGroups)

      // If viewing a component, only let Escape through to go back (handled by component)
      if (selectedOptionRef.current) {
        // Don't handle anything - let component handle all keys
        console.log('App.jsx: Letting component handle key')
        return
      }

      if (!expandedGroup) {
        // Navigate between category buttons
        if (e.key === 'ArrowRight') {
          e.preventDefault()
          setFocusedCategoryIndex((prev) => (prev + 1) % categoryNames.length)
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault()
          setFocusedCategoryIndex((prev) => (prev - 1 + categoryNames.length) % categoryNames.length)
        } else if (e.key === 'ArrowDown') {
          // Down arrow expands the focused category
          e.preventDefault()
          const categoryName = categoryNames[focusedCategoryIndex]
          setExpandedGroup(categoryName)
          setFocusedItemIndex(0)
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          setFocusedCategoryIndex((prev) => (prev - 1 + categoryNames.length) % categoryNames.length)
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          const categoryName = categoryNames[focusedCategoryIndex]
          setExpandedGroup(expandedGroup === categoryName ? null : categoryName)
          setFocusedItemIndex(0)
        }
      } else {
        // Navigate between expanded items
        const items = categoryGroups[expandedGroup].items

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault()
          setFocusedItemIndex((prev) => (prev + 1) % items.length)
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault()
          setFocusedItemIndex((prev) => (prev - 1 + items.length) % items.length)
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          // If on first item, go back to category buttons
          if (focusedItemIndex === 0) {
            setExpandedGroup(null)
            setFocusedItemIndex(0)
          } else {
            setFocusedItemIndex((prev) => prev - 1)
          }
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          const itemValue = items[focusedItemIndex]
          setSelectedOptionAndRef(itemValue)
        } else if (e.key === 'Escape') {
          e.preventDefault()
          setExpandedGroup(null)
          setFocusedItemIndex(0)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [expandedGroup, focusedCategoryIndex, focusedItemIndex])

  // Component rendering logic
  const renderSelectedComponent = () => {
    if (selectedOption === 'Var/CVar') {
      return <TechnicalDetails onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'Var/CVar - Advanced') {
      return <TechnicalDetailsAdvanced onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'Dark Pool Matching Engine') {
      return <DarkPoolMatchingEngine onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'Dark Pool Matching Engine - Basic') {
      return <DarkPoolMatchingEngineBasic onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'Kafka') {
      return <ApacheKafka onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'Apache Flink') {
      return <ApacheFlink onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'Core Java') {
      return <CoreJava onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'Function') {
      return <FunctionalProgramming onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'Java 11') {
      return <Java11 onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'Java 8') {
      return <Java8 onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'Java 15') {
      return <Java15 onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'Java 21') {
      return <Java21 onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'Java 24') {
      return <Java24 onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'Design Patterns') {
      return <DesignPatterns onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'Spring') {
      return <Spring onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'SQL') {
      return <SQL onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'NoSQL') {
      return <NoSQL onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'ORM') {
      return <ORM onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'Module') {
      return <Module onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'Microservice Design Patterns') {
      return <MicroservicePatterns onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'Class') {
      return <Class onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'Interface') {
      return <Interface onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'DevOps') {
      return <DevOps onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'Solace') {
      return <Solace onBack={() => setSelectedOptionAndRef('')} />
    }
    if (selectedOption === 'RabbitMQ') {
      return <RabbitMQ onBack={() => setSelectedOptionAndRef('')} />
    }
    return null
  }

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: '0.75rem 1.5rem',
        borderBottom: '3px solid rgba(59, 130, 246, 0.4)',
        boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.15)',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(147, 197, 253, 0.08) 100%)',
        backdropFilter: 'blur(15px)',
        zIndex: 1000
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '0.75rem'
        }}>
          <h1 style={{
            margin: 0,
            color: '#1f2937',
            fontSize: '1.5rem',
            fontWeight: '800',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            letterSpacing: '-0.025em'
          }}>
            Technical Architecture Areas
          </h1>
        </div>

        {/* Main Category Buttons */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          justifyContent: 'center',
          marginBottom: expandedGroup ? '1rem' : '0',
          flexWrap: 'wrap'
        }}>
          {Object.entries(categoryGroups).map(([groupName, group], index) => (
            <button
              key={groupName}
              data-category-button
              data-category-index={index}
              tabIndex={0}
              onClick={(e) => {
                setExpandedGroup(expandedGroup === groupName ? null : groupName)
                setFocusedCategoryIndex(index)
                setFocusedItemIndex(0)
                // Maintain focus after click
                setTimeout(() => e.target.focus(), 0)
              }}
              onMouseDown={(e) => {
                // Prevent default to keep focus on button
                e.preventDefault()
              }}
              onFocus={() => setFocusedCategoryIndex(index)}
              style={{
                padding: '0.6rem 1.2rem',
                fontSize: '0.95rem',
                fontWeight: '700',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                backgroundColor: expandedGroup === groupName
                  ? group.color
                  : (focusedCategoryIndex === index && !expandedGroup ? `${group.color}22` : 'white'),
                color: expandedGroup === groupName
                  ? 'white'
                  : (focusedCategoryIndex === index && !expandedGroup ? group.color : '#374151'),
                border: `2px solid ${group.color}`,
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: expandedGroup === groupName
                  ? `0 6px 12px -3px ${group.color}66`
                  : focusedCategoryIndex === index && !expandedGroup
                  ? `0 0 0 4px ${group.color}44, 0 6px 12px -3px ${group.color}33`
                  : '0 3px 6px -1px rgba(0, 0, 0, 0.1)',
                outline: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transform: focusedCategoryIndex === index && !expandedGroup ? 'scale(1.08)' : 'scale(1)',
                borderWidth: focusedCategoryIndex === index && !expandedGroup ? '3px' : '2px'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{group.icon}</span>
              <span>{groupName}</span>
              <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                ({group.items.length})
              </span>
            </button>
          ))}
        </div>

        {/* Expanded Group Items */}
        {expandedGroup && (
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: '0.75rem',
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
            borderRadius: '10px',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {categoryGroups[expandedGroup].items.map((itemValue, itemIndex) => {
              const option = options.find(opt => opt.value === itemValue)
              if (!option) return null

              const isFocused = focusedItemIndex === itemIndex

              return (
                <div
                  key={option.value}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setHoveredOption(option)}
                  onMouseLeave={() => setHoveredOption(null)}
                >
                  <button
                    data-item-button
                    data-item-index={itemIndex}
                    tabIndex={0}
                    onClick={() => {
                      setSelectedOptionAndRef(option.value)
                    }}
                    onMouseDown={(e) => {
                      // Prevent default to keep focus behavior consistent
                      e.preventDefault()
                    }}
                    onFocus={() => setFocusedItemIndex(itemIndex)}
                    style={{
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      backgroundColor: selectedOption === option.value
                        ? '#3b82f6'
                        : (isFocused ? 'rgba(59, 130, 246, 0.15)' : 'white'),
                      color: selectedOption === option.value
                        ? 'white'
                        : (isFocused ? '#1e40af' : '#374151'),
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: selectedOption === option.value
                        ? '0 6px 12px -3px rgba(59, 130, 246, 0.4)'
                        : isFocused
                        ? '0 0 0 4px rgba(59, 130, 246, 0.3), 0 6px 12px -3px rgba(59, 130, 246, 0.2)'
                        : '0 3px 6px -1px rgba(0, 0, 0, 0.1)',
                      minWidth: '160px',
                      textAlign: 'center',
                      outline: 'none',
                      transform: hoveredOption?.value === option.value || isFocused ? 'translateY(-2px) scale(1.05)' : 'translateY(0)',
                      borderColor: selectedOption === option.value
                        ? '#3b82f6'
                        : (hoveredOption?.value === option.value || isFocused ? '#3b82f6' : '#e5e7eb'),
                      borderWidth: isFocused ? '3px' : '2px'
                    }}
                  >
                    <div style={{
                      fontSize: '0.9rem',
                      marginBottom: '0.2rem'
                    }}>
                      {option.label}
                    </div>
                    <div style={{
                      fontSize: '0.65rem',
                      opacity: 0.8,
                      fontWeight: '500'
                    }}>
                      {option.complexity}
                    </div>
                  </button>

                  {hoveredOption?.value === option.value && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: '#1f2937',
                      color: 'white',
                      padding: '1rem',
                      borderRadius: '10px',
                      fontSize: '0.8rem',
                      lineHeight: '1.5',
                      width: '320px',
                      boxShadow: '0 15px 25px -8px rgba(0, 0, 0, 0.3)',
                      zIndex: 1001,
                      marginTop: '8px',
                      border: '2px solid #374151'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '-6px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '6px solid transparent',
                        borderRight: '6px solid transparent',
                        borderBottom: '6px solid #1f2937'
                      }}></div>

                      <div style={{
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        marginBottom: '0.5rem',
                        color: '#60a5fa'
                      }}>Technical Details</div>

                      <div style={{ marginBottom: '0.75rem', lineHeight: '1.4', fontSize: '0.75rem' }}>
                        {option.description}
                      </div>

                      <div style={{
                        borderTop: '1px solid #374151',
                        paddingTop: '0.5rem',
                        marginTop: '0.5rem'
                      }}>
                        <div style={{
                          fontWeight: '600',
                          fontSize: '0.75rem',
                          marginBottom: '0.4rem',
                          color: '#93c5fd'
                        }}>Key Components:</div>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '0.3rem',
                          fontSize: '0.7rem'
                        }}>
                          {option.metrics.map((metric, idx) => (
                            <div key={idx} style={{
                              backgroundColor: 'rgba(59, 130, 246, 0.2)',
                              padding: '0.25rem 0.3rem',
                              borderRadius: '4px',
                              textAlign: 'center',
                              fontWeight: '500'
                            }}>
                              {metric}
                            </div>
                          ))}
                        </div>

                        <div style={{
                          marginTop: '0.5rem',
                          padding: '0.3rem',
                          backgroundColor: 'rgba(34, 197, 94, 0.15)',
                          borderRadius: '5px',
                          textAlign: 'center'
                        }}>
                          <div style={{
                            fontSize: '0.7rem',
                            fontWeight: '600',
                            color: '#10b981'
                          }}>
                            Industry: {option.industry}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        <div style={{
          display: 'none',
          gridTemplateRows: '1fr 1fr',
          gap: '1rem',
          maxWidth: '1800px',
          margin: '0 auto'
        }}>
          {/* Row 1: Core Programming & Java Versions */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
          }}>
            {/* Core Programming Group */}
            <div>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '0.5rem',
                textAlign: 'center',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                Core Programming & Architecture
              </h3>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                {optionGroups['Core Programming'].map((option) => (
                  <div
                    key={option.value}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setHoveredOption(option)}
                    onMouseLeave={() => setHoveredOption(null)}
                  >
                    <button
                      onClick={() => setSelectedOption(option.value)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        backgroundColor: selectedOption === option.value ? '#3b82f6' : 'white',
                        color: selectedOption === option.value ? 'white' : '#374151',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: selectedOption === option.value
                          ? '0 6px 12px -3px rgba(59, 130, 246, 0.4)'
                          : '0 3px 6px -1px rgba(0, 0, 0, 0.1)',
                        minWidth: '180px',
                        width: '180px',
                        textAlign: 'center',
                        outline: 'none',
                        transform: hoveredOption?.value === option.value ? 'translateY(-2px)' : 'translateY(0)',
                        borderColor: selectedOption === option.value ? '#3b82f6' : (hoveredOption?.value === option.value ? '#60a5fa' : '#e5e7eb')
                      }}
                    >
                      <div style={{
                        fontSize: '0.9rem',
                        marginBottom: '0.2rem'
                      }}>
                        {option.label}
                      </div>
                      <div style={{
                        fontSize: '0.65rem',
                        opacity: 0.8,
                        fontWeight: '500'
                      }}>
                        {option.complexity}
                      </div>
                    </button>

                    {hoveredOption?.value === option.value && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#1f2937',
                        color: 'white',
                        padding: '1.25rem',
                        borderRadius: '10px',
                        fontSize: '0.85rem',
                        lineHeight: '1.5',
                        width: '350px',
                        boxShadow: '0 15px 25px -8px rgba(0, 0, 0, 0.3)',
                        zIndex: 1001,
                        marginTop: '8px',
                        border: '2px solid #374151'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '-6px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 0,
                          height: 0,
                          borderLeft: '6px solid transparent',
                          borderRight: '6px solid transparent',
                          borderBottom: '6px solid #1f2937'
                        }}></div>

                        <div style={{
                          fontWeight: '700',
                          fontSize: '1rem',
                          marginBottom: '0.5rem',
                          color: '#60a5fa'
                        }}>Technical Details</div>

                        <div style={{ marginBottom: '0.75rem', lineHeight: '1.4' }}>
                          {option.description}
                        </div>

                        <div style={{
                          borderTop: '1px solid #374151',
                          paddingTop: '0.5rem',
                          marginTop: '0.5rem'
                        }}>
                          <div style={{
                            fontWeight: '600',
                            fontSize: '0.8rem',
                            marginBottom: '0.4rem',
                            color: '#93c5fd'
                          }}>Key Components:</div>
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '0.4rem',
                            fontSize: '0.75rem'
                          }}>
                            {option.metrics.map((metric, idx) => (
                              <div key={idx} style={{
                                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                padding: '0.3rem 0.4rem',
                                borderRadius: '5px',
                                textAlign: 'center',
                                fontWeight: '500'
                              }}>
                                {metric}
                              </div>
                            ))}
                          </div>

                          <div style={{
                            marginTop: '0.5rem',
                            padding: '0.4rem',
                            backgroundColor: 'rgba(34, 197, 94, 0.15)',
                            borderRadius: '5px',
                            textAlign: 'center'
                          }}>
                            <div style={{
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              color: '#10b981'
                            }}>
                              Industry: {option.industry}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Java Versions Group */}
            <div>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '0.5rem',
                textAlign: 'center',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                Java Versions & Evolution
              </h3>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                {optionGroups['Java Versions'].map((option) => (
                  <div
                    key={option.value}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setHoveredOption(option)}
                    onMouseLeave={() => setHoveredOption(null)}
                  >
                    <button
                      onClick={() => setSelectedOption(option.value)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        backgroundColor: selectedOption === option.value ? '#3b82f6' : 'white',
                        color: selectedOption === option.value ? 'white' : '#374151',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: selectedOption === option.value
                          ? '0 6px 12px -3px rgba(59, 130, 246, 0.4)'
                          : '0 3px 6px -1px rgba(0, 0, 0, 0.1)',
                        minWidth: '180px',
                        width: '180px',
                        textAlign: 'center',
                        outline: 'none',
                        transform: hoveredOption?.value === option.value ? 'translateY(-2px)' : 'translateY(0)',
                        borderColor: selectedOption === option.value ? '#3b82f6' : (hoveredOption?.value === option.value ? '#60a5fa' : '#e5e7eb')
                      }}
                    >
                      <div style={{
                        fontSize: '0.9rem',
                        marginBottom: '0.2rem'
                      }}>
                        {option.label}
                      </div>
                      <div style={{
                        fontSize: '0.65rem',
                        opacity: 0.8,
                        fontWeight: '500'
                      }}>
                        {option.complexity}
                      </div>
                    </button>

                    {hoveredOption?.value === option.value && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#1f2937',
                        color: 'white',
                        padding: '1.25rem',
                        borderRadius: '10px',
                        fontSize: '0.85rem',
                        lineHeight: '1.5',
                        width: '350px',
                        boxShadow: '0 15px 25px -8px rgba(0, 0, 0, 0.3)',
                        zIndex: 1001,
                        marginTop: '8px',
                        border: '2px solid #374151'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '-6px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 0,
                          height: 0,
                          borderLeft: '6px solid transparent',
                          borderRight: '6px solid transparent',
                          borderBottom: '6px solid #1f2937'
                        }}></div>

                        <div style={{
                          fontWeight: '700',
                          fontSize: '1rem',
                          marginBottom: '0.5rem',
                          color: '#60a5fa'
                        }}>Technical Details</div>

                        <div style={{ marginBottom: '0.75rem', lineHeight: '1.4' }}>
                          {option.description}
                        </div>

                        <div style={{
                          borderTop: '1px solid #374151',
                          paddingTop: '0.5rem',
                          marginTop: '0.5rem'
                        }}>
                          <div style={{
                            fontWeight: '600',
                            fontSize: '0.8rem',
                            marginBottom: '0.4rem',
                            color: '#93c5fd'
                          }}>Key Components:</div>
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '0.4rem',
                            fontSize: '0.75rem'
                          }}>
                            {option.metrics.map((metric, idx) => (
                              <div key={idx} style={{
                                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                padding: '0.3rem 0.4rem',
                                borderRadius: '5px',
                                textAlign: 'center',
                                fontWeight: '500'
                              }}>
                                {metric}
                              </div>
                            ))}
                          </div>

                          <div style={{
                            marginTop: '0.5rem',
                            padding: '0.4rem',
                            backgroundColor: 'rgba(34, 197, 94, 0.15)',
                            borderRadius: '5px',
                            textAlign: 'center'
                          }}>
                            <div style={{
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              color: '#10b981'
                            }}>
                              Industry: {option.industry}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Frameworks & Data Technologies */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
          }}>
            {/* Frameworks & Middleware Group */}
            <div>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '0.5rem',
                textAlign: 'center',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                Frameworks & Middleware
              </h3>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                {optionGroups['Frameworks & Middleware'].map((option) => (
                  <div
                    key={option.value}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setHoveredOption(option)}
                    onMouseLeave={() => setHoveredOption(null)}
                  >
                    <button
                      onClick={() => setSelectedOption(option.value)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        backgroundColor: selectedOption === option.value ? '#3b82f6' : 'white',
                        color: selectedOption === option.value ? 'white' : '#374151',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: selectedOption === option.value
                          ? '0 6px 12px -3px rgba(59, 130, 246, 0.4)'
                          : '0 3px 6px -1px rgba(0, 0, 0, 0.1)',
                        minWidth: '180px',
                        width: '180px',
                        textAlign: 'center',
                        outline: 'none',
                        transform: hoveredOption?.value === option.value ? 'translateY(-2px)' : 'translateY(0)',
                        borderColor: selectedOption === option.value ? '#3b82f6' : (hoveredOption?.value === option.value ? '#60a5fa' : '#e5e7eb')
                      }}
                    >
                      <div style={{
                        fontSize: '0.9rem',
                        marginBottom: '0.2rem'
                      }}>
                        {option.label}
                      </div>
                      <div style={{
                        fontSize: '0.65rem',
                        opacity: 0.8,
                        fontWeight: '500'
                      }}>
                        {option.complexity}
                      </div>
                    </button>

                    {hoveredOption?.value === option.value && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#1f2937',
                        color: 'white',
                        padding: '1.25rem',
                        borderRadius: '10px',
                        fontSize: '0.85rem',
                        lineHeight: '1.5',
                        width: '350px',
                        boxShadow: '0 15px 25px -8px rgba(0, 0, 0, 0.3)',
                        zIndex: 1001,
                        marginTop: '8px',
                        border: '2px solid #374151'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '-6px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 0,
                          height: 0,
                          borderLeft: '6px solid transparent',
                          borderRight: '6px solid transparent',
                          borderBottom: '6px solid #1f2937'
                        }}></div>

                        <div style={{
                          fontWeight: '700',
                          fontSize: '1rem',
                          marginBottom: '0.5rem',
                          color: '#60a5fa'
                        }}>Technical Details</div>

                        <div style={{ marginBottom: '0.75rem', lineHeight: '1.4' }}>
                          {option.description}
                        </div>

                        <div style={{
                          borderTop: '1px solid #374151',
                          paddingTop: '0.5rem',
                          marginTop: '0.5rem'
                        }}>
                          <div style={{
                            fontWeight: '600',
                            fontSize: '0.8rem',
                            marginBottom: '0.4rem',
                            color: '#93c5fd'
                          }}>Key Components:</div>
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '0.4rem',
                            fontSize: '0.75rem'
                          }}>
                            {option.metrics.map((metric, idx) => (
                              <div key={idx} style={{
                                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                padding: '0.3rem 0.4rem',
                                borderRadius: '5px',
                                textAlign: 'center',
                                fontWeight: '500'
                              }}>
                                {metric}
                              </div>
                            ))}
                          </div>

                          <div style={{
                            marginTop: '0.5rem',
                            padding: '0.4rem',
                            backgroundColor: 'rgba(34, 197, 94, 0.15)',
                            borderRadius: '5px',
                            textAlign: 'center'
                          }}>
                            <div style={{
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              color: '#10b981'
                            }}>
                              Industry: {option.industry}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Data & Persistence Group */}
            <div>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '0.5rem',
                textAlign: 'center',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                Data & Financial Systems
              </h3>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                {optionGroups['Data & Persistence'].map((option) => (
                  <div
                    key={option.value}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setHoveredOption(option)}
                    onMouseLeave={() => setHoveredOption(null)}
                  >
                    <button
                      onClick={() => setSelectedOption(option.value)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        backgroundColor: selectedOption === option.value ? '#3b82f6' : 'white',
                        color: selectedOption === option.value ? 'white' : '#374151',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: selectedOption === option.value
                          ? '0 6px 12px -3px rgba(59, 130, 246, 0.4)'
                          : '0 3px 6px -1px rgba(0, 0, 0, 0.1)',
                        minWidth: '180px',
                        width: '180px',
                        textAlign: 'center',
                        outline: 'none',
                        transform: hoveredOption?.value === option.value ? 'translateY(-2px)' : 'translateY(0)',
                        borderColor: selectedOption === option.value ? '#3b82f6' : (hoveredOption?.value === option.value ? '#60a5fa' : '#e5e7eb')
                      }}
                    >
                      <div style={{
                        fontSize: '0.9rem',
                        marginBottom: '0.2rem'
                      }}>
                        {option.label}
                      </div>
                      <div style={{
                        fontSize: '0.65rem',
                        opacity: 0.8,
                        fontWeight: '500'
                      }}>
                        {option.complexity}
                      </div>
                    </button>

                    {hoveredOption?.value === option.value && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#1f2937',
                        color: 'white',
                        padding: '1.25rem',
                        borderRadius: '10px',
                        fontSize: '0.85rem',
                        lineHeight: '1.5',
                        width: '350px',
                        boxShadow: '0 15px 25px -8px rgba(0, 0, 0, 0.3)',
                        zIndex: 1001,
                        marginTop: '8px',
                        border: '2px solid #374151'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '-6px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 0,
                          height: 0,
                          borderLeft: '6px solid transparent',
                          borderRight: '6px solid transparent',
                          borderBottom: '6px solid #1f2937'
                        }}></div>

                        <div style={{
                          fontWeight: '700',
                          fontSize: '1rem',
                          marginBottom: '0.5rem',
                          color: '#60a5fa'
                        }}>Technical Details</div>

                        <div style={{ marginBottom: '0.75rem', lineHeight: '1.4' }}>
                          {option.description}
                        </div>

                        <div style={{
                          borderTop: '1px solid #374151',
                          paddingTop: '0.5rem',
                          marginTop: '0.5rem'
                        }}>
                          <div style={{
                            fontWeight: '600',
                            fontSize: '0.8rem',
                            marginBottom: '0.4rem',
                            color: '#93c5fd'
                          }}>Key Components:</div>
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '0.4rem',
                            fontSize: '0.75rem'
                          }}>
                            {option.metrics.map((metric, idx) => (
                              <div key={idx} style={{
                                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                padding: '0.3rem 0.4rem',
                                borderRadius: '5px',
                                textAlign: 'center',
                                fontWeight: '500'
                              }}>
                                {metric}
                              </div>
                            ))}
                          </div>

                          <div style={{
                            marginTop: '0.5rem',
                            padding: '0.4rem',
                            backgroundColor: 'rgba(34, 197, 94, 0.15)',
                            borderRadius: '5px',
                            textAlign: 'center'
                          }}>
                            <div style={{
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              color: '#10b981'
                            }}>
                              Industry: {option.industry}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedOption && (
        <div style={{
          position: 'fixed',
          top: expandedGroup ? '280px' : '120px',
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'auto',
          backgroundColor: '#ffffff',
          zIndex: 100000
        }}>
          {renderSelectedComponent()}
        </div>
      )}

      {!selectedOption && (
        <div style={{ marginTop: '140px' }}>
          <div>
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      )}
    </>
  )
}

export default App

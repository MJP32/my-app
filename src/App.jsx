import { useState, useEffect, useRef, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import KeyboardShortcutsDialog from './components/KeyboardShortcutsDialog.jsx'
import GlobalSearch from './components/GlobalSearch.jsx'
import { KEYS, SHORTCUTS, FocusManager, AriaUtils } from './utils/keyboardNavigation.js'
import { FocusManager as FocusManagerUtil, focusHistory } from './utils/focusManagement.js'
// Project pages
import TechnicalDetails from './pages/projects/TechnicalDetails.jsx'
import TechnicalDetailsAdvanced from './pages/projects/TechnicalDetailsAdvanced.jsx'
import DarkPoolMatchingEngine from './pages/projects/DarkPoolMatchingEngine.jsx'
import DarkPoolMatchingEngineBasic from './pages/projects/DarkPoolMatchingEngineBasic.jsx'
import MediHealth from './pages/projects/MediHealth.jsx'
import DarkPoolEngine3 from './pages/projects/DarkPoolEngine3.jsx'
import MonolithToMicroservice from './pages/projects/MonolithToMicroservice.jsx'
import AgileScrum from './pages/projects/AgileScrum.jsx'
import ProductionSupport from './pages/projects/ProductionSupport.jsx'
import SecurityOWASP from './pages/projects/SecurityOWASP.jsx'
import JWT from './pages/security/JWT.jsx'
import OAuth from './pages/security/OAuth.jsx'
import OAuth2 from './pages/security/OAuth2.jsx'
import FinancialBanking from './pages/projects/FinancialBanking.jsx'
import VarCvar3 from './pages/projects/VarCvar3.jsx'
import Testing from './pages/projects/Testing.jsx'
import MyProjects from './pages/projects/MyProjects.jsx'
import VirtualNumbers from './pages/projects/VirtualNumbers.jsx'

// Messaging pages
import ApacheKafka from './pages/messaging/ApacheKafka.jsx'
import ApacheFlink from './pages/messaging/ApacheFlink.jsx'
import Solace from './pages/messaging/Solace.jsx'
import RabbitMQ from './pages/messaging/RabbitMQ.jsx'
import MuleSoft from './pages/messaging/MuleSoft.jsx'

// Java pages
import CoreJava from './pages/java/CoreJava.jsx'
import FunctionalProgramming from './pages/java/FunctionalProgramming.jsx'
import Java11 from './pages/java/Java11.jsx'
import Java8 from './pages/java/Java8.jsx'
import Java15 from './pages/java/Java15.jsx'
import Java21 from './pages/java/Java21.jsx'
import Java24 from './pages/java/Java24.jsx'
import Module from './pages/java/Module.jsx'
import Class from './pages/java/Class.jsx'
import Interface from './pages/java/Interface.jsx'
import Generics from './pages/java/Generics.jsx'
import CollectionsFramework from './pages/java/CollectionsFramework.jsx'
import ObjectOrientedProgramming from './pages/java/ObjectOrientedProgramming.jsx'
import Concurrency from './pages/java/Concurrency.jsx'
import Multithreading from './pages/java/Multithreading.jsx'
import ExceptionHandling from './pages/java/ExceptionHandling.jsx'
import FileIO from './pages/java/FileIO.jsx'
import JVMInternals from './pages/java/JVMInternals.jsx'
import MemoryManagement from './pages/java/MemoryManagement.jsx'
import Streams from './pages/java/Streams.jsx'
import StreamsAdvanced from './pages/java/StreamsAdvanced.jsx'
import Lambdas from './pages/java/Lambdas.jsx'
import LambdasAdvanced from './pages/java/LambdasAdvanced.jsx'
import FunctionalInterfaces from './pages/java/FunctionalInterfaces.jsx'

// Spring pages
import DependencyInjection from './pages/spring/DependencyInjection.jsx'
import Spring from './pages/spring/Spring.jsx'
import SpringBoot from './pages/spring/SpringBoot.jsx'
import RestAPI from './pages/spring/RestAPI.jsx'
import Hibernate from './pages/spring/Hibernate.jsx'
import Actuator from './pages/frameworks/Actuator.jsx'
import GRPC from './pages/spring/GRPC.jsx'
import SOAP from './pages/spring/SOAP.jsx'
import ReactFramework from './pages/spring/ReactFramework.jsx'

// Question pages
import JavaQuestions from './pages/questions/JavaQuestions.jsx'
import CoreJavaQuestions from './pages/questions/CoreJavaQuestions.jsx'
import Java8Questions from './pages/questions/Java8Questions.jsx'
import Java11Questions from './pages/questions/Java11Questions.jsx'
import Java15Questions from './pages/questions/Java15Questions.jsx'
import Java21Questions from './pages/questions/Java21Questions.jsx'
import Java24Questions from './pages/questions/Java24Questions.jsx'
import SQLQuestions from './pages/questions/SQLQuestions.jsx'
import HibernateQuestions from './pages/questions/HibernateQuestions.jsx'
import KafkaQuestions from './pages/questions/KafkaQuestions.jsx'
import ApacheFlinkQuestions from './pages/questions/ApacheFlinkQuestions.jsx'
import RabbitMQQuestions from './pages/questions/RabbitMQQuestions.jsx'
import SolaceQuestions from './pages/questions/SolaceQuestions.jsx'
import RestAPIQuestions from './pages/questions/RestAPIQuestions.jsx'
import JenkinsQuestions from './pages/questions/JenkinsQuestions.jsx'
import TeamCityQuestions from './pages/questions/TeamCityQuestions.jsx'
import PrometheusQuestions from './pages/questions/PrometheusQuestions.jsx'
import GrafanaQuestions from './pages/questions/GrafanaQuestions.jsx'
import ZipkinQuestions from './pages/questions/ZipkinQuestions.jsx'
import ActuatorQuestions from './pages/questions/ActuatorQuestions.jsx'
import SpringCoreQuestions from './pages/questions/SpringCoreQuestions.jsx'
import SpringBootQuestions from './pages/questions/SpringBootQuestions.jsx'
import SpringSecurityQuestions from './pages/questions/SpringSecurityQuestions.jsx'
import SpringDataJPAQuestions from './pages/questions/SpringDataJPAQuestions.jsx'
import SpringAnnotationsQuestions from './pages/questions/SpringAnnotationsQuestions.jsx'

// Database pages
import SQL from './pages/databases/SQL.jsx'
import NoSQL from './pages/databases/NoSQL.jsx'
import Oracle from './pages/databases/Oracle.jsx'
import ORM from './pages/databases/ORM.jsx'
import Redis from './pages/databases/Redis.jsx'
import Databases from './pages/databases/Databases.jsx'

// DevOps pages
import Deployment from './pages/devops/Deployment.jsx'
import Docker from './pages/devops/Docker.jsx'
import Kubernetes from './pages/devops/Kubernetes.jsx'
import CICD from './pages/devops/CICD.jsx'
import DevOpsPage from './pages/devops/DevOpsPage.jsx'
import TeamCity from './pages/devops/TeamCity.jsx'
import Jenkins from './pages/devops/Jenkins.jsx'
import Prometheus from './pages/devops/Prometheus.jsx'
import Grafana from './pages/devops/Grafana.jsx'

// Security pages
import SecurityPage from './pages/SecurityPage.jsx'

// Cloud pages
import AWS from './pages/cloud/AWS.jsx'
import GCP from './pages/cloud/GCP.jsx'
import Azure from './pages/cloud/Azure.jsx'
import Cloud from './pages/cloud/Cloud.jsx'

// Algorithm pages
import Arrays from './pages/algorithms/Arrays.jsx'
import HashTables from './pages/algorithms/HashTables.jsx'
import Strings from './pages/algorithms/Strings.jsx'
import LinkedLists from './pages/algorithms/LinkedLists.jsx'
import Stacks from './pages/algorithms/Stacks.jsx'
import Queues from './pages/algorithms/Queues.jsx'
import Sorting from './pages/algorithms/Sorting.jsx'
import BinarySearch from './pages/algorithms/BinarySearch.jsx'
import Recursion from './pages/algorithms/Recursion.jsx'
import DataStructures from './pages/algorithms/DataStructures.jsx'
import DynamicProgramming from './pages/algorithms/DynamicProgramming.jsx'
import DynamicProgrammingPatterns from './pages/practice/DynamicProgrammingPatterns.jsx'
import Trees from './pages/algorithms/Trees.jsx'
import BinaryTrees from './pages/algorithms/BinaryTrees.jsx'
import BinarySearchTrees from './pages/algorithms/BinarySearchTrees.jsx'
import Graphs from './pages/algorithms/Graphs.jsx'
import Heaps from './pages/algorithms/Heaps.jsx'
import UnionFind from './pages/algorithms/UnionFind.jsx'
import Trie from './pages/algorithms/Trie.jsx'
import Searching from './pages/algorithms/Searching.jsx'
import GreedyAlgorithms from './pages/algorithms/GreedyAlgorithms.jsx'
import FamousAlgorithms from './pages/algorithms/FamousAlgorithms.jsx'
import SlidingWindow from './pages/algorithms/SlidingWindow.jsx'
import Backtracking from './pages/algorithms/Backtracking.jsx'
import Intervals from './pages/algorithms/Intervals.jsx'
import MathGeometry from './pages/algorithms/MathGeometry.jsx'
import AdvancedGraphs from './pages/algorithms/AdvancedGraphs.jsx'

// Design pages
import DesignPatterns from './pages/design/DesignPatterns.jsx'
import MicroservicePatterns from './pages/design/MicroservicePatterns.jsx'
import SystemDesign from './pages/design/SystemDesign.jsx'
import LRUCache from './pages/design/LRUCache.jsx'
import RateLimiter from './pages/design/RateLimiter.jsx'
import DesignProblems from './pages/design/DesignProblems.jsx'
import DesignPatternsInteractive from './pages/design/DesignPatternsInteractive.jsx'
import Design from './pages/design/Design.jsx'
import CreditCardPortal from './pages/design/CreditCardPortal.jsx'
import CreditCardPortal2 from './pages/design/CreditCardPortal2.jsx'
import CreditCardPortal3 from './pages/design/CreditCardPortal3.jsx'
import RideShare from './pages/design/RideShare.jsx'
import GoogleDocs from './pages/design/GoogleDocs.jsx'
import YouTube from './pages/design/YouTube.jsx'
import Newsfeed from './pages/design/Newsfeed.jsx'
import TinyURL from './pages/design/TinyURL.jsx'
import WhatsApp from './pages/design/WhatsApp.jsx'
import TypeAhead from './pages/design/TypeAhead.jsx'
import Instagram from './pages/design/Instagram.jsx'
import Netflix from './pages/design/Netflix.jsx'
import Twitter from './pages/design/Twitter.jsx'
import Amazon from './pages/design/Amazon.jsx'
import Zoom from './pages/design/Zoom.jsx'
import Dropbox from './pages/design/Dropbox.jsx'
import NotificationSystem from './pages/design/NotificationSystem.jsx'
import RateLimiterDesign from './pages/design/RateLimiterDesign.jsx'
import FoodDelivery from './pages/design/FoodDelivery.jsx'
import MobileWeatherApp from './pages/design/MobileWeatherApp.jsx'
import ApartmentAlarmSystem from './pages/design/ApartmentAlarmSystem.jsx'
import EventDrivenArchitecture from './pages/design/EventDrivenArchitecture.jsx'
import DomainDrivenDesign from './pages/design/DomainDrivenDesign.jsx'

// System Design Concept pages
import LoadBalancing from './pages/concepts/LoadBalancing.jsx'
import CachingStrategies from './pages/concepts/CachingStrategies.jsx'
import DatabaseSharding from './pages/concepts/DatabaseSharding.jsx'
import CAPTheorem from './pages/concepts/CAPTheorem.jsx'
import ConsistencyPatterns from './pages/concepts/ConsistencyPatterns.jsx'
import APIDesign from './pages/concepts/APIDesign.jsx'
import MessageQueues from './pages/concepts/MessageQueues.jsx'
import CDN from './pages/concepts/CDN.jsx'
import DatabaseReplication from './pages/concepts/DatabaseReplication.jsx'
import Scaling from './pages/concepts/Scaling.jsx'
import Proxies from './pages/concepts/Proxies.jsx'
import DataPartitioning from './pages/concepts/DataPartitioning.jsx'
import SQLvsNoSQL from './pages/concepts/SQLvsNoSQL.jsx'
import ConsistentHashing from './pages/concepts/ConsistentHashing.jsx'
import WebSockets from './pages/concepts/WebSockets.jsx'
import BlobStorage from './pages/concepts/BlobStorage.jsx'
import Microservices from './pages/concepts/Microservices.jsx'
import EventDriven from './pages/concepts/EventDriven.jsx'

// Root level navigation pages
import Practice from './pages/Practice.jsx'
import Questions from './pages/Questions.jsx'
import Java from './pages/Java.jsx'
import Python from './pages/Python.jsx'
import PythonTopicPlaceholder from './pages/python/PythonTopicPlaceholder.jsx'
import IndexSlicing from './pages/python/IndexSlicing.jsx'
import BitwiseOperations from './pages/python/BitwiseOperations.jsx'
import ListComprehension from './pages/python/ListComprehension.jsx'
import LambdaFunctions from './pages/python/LambdaFunctions.jsx'
import BisectFunctions from './pages/python/BisectFunctions.jsx'
import SetOperations from './pages/practice/SetOperations.jsx'
import MapOperations from './pages/practice/MapOperations.jsx'
import PythonAdvanced from './pages/python/PythonAdvanced.jsx'
import CorePython from './pages/python/CorePython.jsx'
import PythonOOP from './pages/python/PythonOOP.jsx'
import PythonSetOperations from './pages/python/PythonSetOperations.jsx'
import PythonDictOperations from './pages/python/PythonDictOperations.jsx'
import PythonTuples from './pages/python/PythonTuples.jsx'
import PythonMapFunctions from './pages/python/PythonMapFunctions.jsx'
import PythonStringMethods from './pages/python/PythonStringMethods.jsx'
import PythonHeaps from './pages/python/PythonHeapsReference.jsx'
import PythonPitfalls from './pages/python/PythonPitfalls.jsx'
import PythonRegex from './pages/python/PythonRegex.jsx'
import Itertools from './pages/python/Itertools.jsx'
import CollectionsModule from './pages/python/CollectionsModule.jsx'
import SortingFunctions from './pages/python/SortingFunctions.jsx'
import LeetCodePatterns from './pages/python/LeetCodePatterns.jsx'
import SortingAlgorithms from './pages/python/SortingAlgorithms.jsx'
import Frameworks from './pages/Frameworks.jsx'
import StudyGuideModal from './components/StudyGuideModal.jsx'
import AccountDropdown from './components/AccountDropdown.jsx'
import KeyboardGuide from './components/KeyboardGuide.jsx'
import FeedbackModal from './components/FeedbackModal.jsx'
import GoogleAnalytics from './components/GoogleAnalytics.jsx'
import { initializeUser, getProgressStats, getCategoryStats, getCategoryGroupings, getAllPracticeProblems, getCompletedProblems, migrateCompletionData } from './services/progressService'
import { onAuthStateChange } from './services/authService'

// Category organization metadata (for visual grouping)
const categoryOrganization = {
  'Learning': {
    label: '📚 Core Learning',
    categories: ['Java', 'Python', 'Design']
  },
  'Practice': {
    label: '💪 Practice & Questions',
    categories: ['Practice', 'Questions']
  },
  'Projects': {
    label: '🚀 Real-World Projects',
    categories: ['My Projects']
  },
  'Tech Stack': {
    label: '⚙️ Technology Stack',
    categories: ['Frameworks', 'Databases', 'Cloud']
  },
  'Operations': {
    label: '🛠️ DevOps & Security',
    categories: ['DevOps']
  }
}

// Main category groups (defined outside component to prevent recreation)
const categoryGroups = {
  'Java': {
    icon: '☕',
    color: '#f59e0b',
    groupSection: 'Learning',
    description: 'Java fundamentals and versions',
    items: ['Core Java', 'Java 8', 'Java 11', 'Java 15', 'Java 21', 'Java 24']
  },
  'Python': {
    icon: '🐍',
    color: '#3776ab',
    groupSection: 'Learning',
    description: 'Python programming and libraries',
    items: ['Core Python', 'Index Slicing', 'Bitwise Operations', 'List Comprehension', 'Lambda', 'Bisect Functions', 'Python Advanced', 'Data Science', 'Machine Learning', 'Web Frameworks', 'Async Python', 'Python Set Operations', 'Python Dict Operations', 'Python Tuples', 'Python Map Functions', 'Python String Methods', 'Python Heaps', 'Python Pitfalls']
  },
  'Design': {
    icon: '🎨',
    color: '#8b5cf6',
    groupSection: 'Learning',
    description: 'Design patterns and architecture',
    items: ['Design Patterns', 'Microservice Design Patterns', 'Class', 'System Design', 'Module', 'Function', 'Interface', 'Event Driven Architecture', 'Domain Driven Design']
  },
  'My Projects': {
    icon: '💼',
    color: '#10b981',
    groupSection: 'Projects',
    description: 'Real-world project implementations',
    items: ['Var/CVar', 'Var/CVar - Advanced', 'Var/CVar 3', 'Dark Pool Matching Engine', 'Dark Pool Matching Engine - Basic', 'Medi/Health', 'Dark Pool Engine 3', 'Monolith to Microservice', 'Financial Banking', 'Credit Card Portal', 'Credit Card Portal 2', 'Credit Card Portal 3', 'Virtual Numbers', 'Ride Share']
  },
  'Frameworks': {
    icon: '🌱',
    color: '#ec4899',
    groupSection: 'Tech Stack',
    description: 'Spring, REST, Hibernate, React',
    items: ['Spring', 'Spring Boot', 'REST API', 'Hibernate', 'gRPC', 'SOAP', 'React', 'Actuator', 'Dependency Injection']
  },
  'Databases': {
    icon: '🗃️',
    color: '#3b82f6',
    groupSection: 'Tech Stack',
    description: 'SQL, NoSQL, ORM, caching',
    items: ['SQL', 'NoSQL', 'Oracle', 'ORM', 'Redis']
  },
  'Cloud': {
    icon: '☁️',
    color: '#0ea5e9',
    groupSection: 'Tech Stack',
    description: 'AWS, GCP, Azure platforms',
    items: ['AWS', 'GCP', 'Azure']
  },
  'DevOps': {
    icon: '🛠️',
    color: '#0ea5e9',
    groupSection: 'Operations',
    description: 'CI/CD, Docker, Kubernetes, Messaging, Security',
    items: ['Deployment', 'Docker', 'Kubernetes', 'Testing', 'CI/CD', 'Agile Scrum', 'Production Support', 'TeamCity', 'Jenkins', 'Prometheus', 'Grafana', 'Security OWASP', 'JWT', 'OAuth', 'OAuth2', 'Kafka', 'Apache Flink', 'RabbitMQ', 'Solace', 'MuleSoft']
  },
  'Practice': {
    icon: '💪',
    color: '#10b981',
    groupSection: 'Practice',
    description: 'Algorithm practice and coding challenges',
    hasSubcategories: true,
    subcategories: {
      'Data Structures': {
        icon: '📊',
        items: ['Arrays', 'Hash Tables', 'Stacks', 'Queues', 'Trees', 'Graphs', 'Heaps', 'Linked Lists']
      },
      'Algorithms': {
        icon: '🎯',
        items: ['Sorting', 'Binary Search', 'Recursion', 'Dynamic Programming', 'Union Find', 'Trie']
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
      'Python Operations': {
        icon: '🐍',
        items: ['Set Operations', 'Map Operations']
      }
    }
  },
  'Questions': {
    icon: '❓',
    color: '#8b5cf6',
    groupSection: 'Practice',
    description: 'Interview questions and answers',
    hasSubcategories: true,
    subcategories: {
      'Spring Framework': {
        icon: '🌱',
        items: ['Spring Core Questions', 'Spring Boot Questions', 'Spring Security Questions', 'Spring Data JPA Questions', 'Spring Annotations Questions']
      },
      'Java': {
        icon: '☕',
        items: ['Java 8 Questions', 'Java 11 Questions', 'Java 15 Questions', 'Java 21 Questions', 'Java 24 Questions']
      },
      'Databases': {
        icon: '🗃️',
        items: ['SQL Questions', 'Hibernate Questions']
      },
      'Messaging': {
        icon: '📨',
        items: ['Kafka Questions', 'RabbitMQ Questions', 'Solace Questions']
      },
      'APIs & Integration': {
        icon: '🔌',
        items: ['REST API Questions']
      },
      'CI/CD': {
        icon: '🔄',
        items: ['Jenkins Questions', 'TeamCity Questions']
      },
      'Monitoring': {
        icon: '📊',
        items: ['Prometheus Questions', 'Grafana Questions', 'Zipkin Questions', 'Actuator Questions']
      }
    }
  }
}

// Order of practice components for navigation
const PRACTICE_COMPONENTS_ORDER = [
  // Data Structures
  'Arrays', 'Hash Tables', 'Stacks', 'Queues', 'Trees', 'Graphs', 'Heaps', 'Linked Lists',
  // Algorithms
  'Sorting', 'Binary Search', 'Recursion', 'Dynamic Programming', 'Union Find', 'Trie',
  // Java Features
  'Streams', 'Streams Advanced', 'Lambdas', 'Lambdas Advanced', 'Functional Interfaces', 'Collections Framework',
  // Concurrency
  'Concurrency', 'Multithreading',
  // Core Java Fundamentals
  'Object-Oriented Programming', 'Exception Handling', 'File I/O', 'JVM Internals', 'Memory Management', 'Strings', 'Generics',
  // System Design
  'Design Patterns Practice', 'LRU Cache', 'Rate Limiter', 'Design Problems'
]

// Subcategory groupings
const PRACTICE_SUBCATEGORIES = {
  'Data Structures': ['Arrays', 'Hash Tables', 'Stacks', 'Queues', 'Trees', 'Graphs', 'Heaps', 'Linked Lists'],
  'Algorithms': ['Sorting', 'Binary Search', 'Recursion', 'Dynamic Programming', 'Union Find', 'Trie'],
  'Java Features': ['Streams', 'Streams Advanced', 'Lambdas', 'Lambdas Advanced', 'Functional Interfaces', 'Collections Framework'],
  'Concurrency': ['Concurrency', 'Multithreading'],
  'Core Java Fundamentals': ['Object-Oriented Programming', 'Exception Handling', 'File I/O', 'JVM Internals', 'Memory Management', 'Data Structures', 'Strings', 'Generics'],
  'System Design': ['Design Patterns Practice', 'LRU Cache', 'Rate Limiter', 'Design Problems']
}

const SUBCATEGORY_ORDER = ['Data Structures', 'Algorithms', 'Java Features', 'Concurrency', 'Core Java Fundamentals', 'System Design']

// Order of questions components for navigation
const QUESTIONS_COMPONENTS_ORDER = [
  // Spring Framework
  'Spring Core Questions', 'Spring Boot Questions', 'Spring Security Questions', 'Spring Data JPA Questions', 'Spring Annotations Questions',
  // Java
  'Java 8 Questions', 'Java 11 Questions', 'Java 15 Questions', 'Java 21 Questions', 'Java 24 Questions',
  // Databases
  'SQL Questions', 'Hibernate Questions',
  // Messaging
  'Kafka Questions', 'RabbitMQ Questions', 'Solace Questions',
  // APIs & Integration
  'REST API Questions',
  // CI/CD
  'Jenkins Questions', 'TeamCity Questions',
  // Monitoring
  'Prometheus Questions', 'Grafana Questions', 'Zipkin Questions', 'Actuator Questions'
]

// Subcategory groupings for questions
const QUESTIONS_SUBCATEGORIES = {
  'Spring Framework': ['Spring Core Questions', 'Spring Boot Questions', 'Spring Security Questions', 'Spring Data JPA Questions', 'Spring Annotations Questions'],
  'Java': ['Java 8 Questions', 'Java 11 Questions', 'Java 15 Questions', 'Java 21 Questions', 'Java 24 Questions'],
  'Databases': ['SQL Questions', 'Hibernate Questions'],
  'Messaging': ['Kafka Questions', 'RabbitMQ Questions', 'Solace Questions'],
  'APIs & Integration': ['REST API Questions'],
  'CI/CD': ['Jenkins Questions', 'TeamCity Questions'],
  'Monitoring': ['Prometheus Questions', 'Grafana Questions', 'Zipkin Questions', 'Actuator Questions']
}

const QUESTIONS_SUBCATEGORY_ORDER = ['Spring Framework', 'Java', 'Databases', 'Messaging', 'APIs & Integration', 'CI/CD', 'Monitoring']

// Get subcategory for a component (Practice)
const getSubcategoryForComponent = (componentName) => {
  for (const [subcategory, components] of Object.entries(PRACTICE_SUBCATEGORIES)) {
    if (components.includes(componentName)) {
      return subcategory
    }
  }
  return null
}

// Get subcategory for a questions component
const getSubcategoryForQuestionsComponent = (componentName) => {
  for (const [subcategory, components] of Object.entries(QUESTIONS_SUBCATEGORIES)) {
    if (components.includes(componentName)) {
      return subcategory
    }
  }
  return null
}

// Order of learning components for navigation
const LEARNING_COMPONENTS_ORDER = [
  // Core Programming
  'Core Java', 'Class', 'Interface', 'Design Patterns', 'Dependency Injection', 'System Design',
  // Java Versions
  'Java 8', 'Java 11', 'Java 15', 'Java 21', 'Java 24'
]

// Subcategory groupings for learning components
const LEARNING_SUBCATEGORIES = {
  'Core Programming': ['Core Java', 'Class', 'Interface', 'Design Patterns', 'Dependency Injection', 'System Design'],
  'Java Versions': ['Java 8', 'Java 11', 'Java 15', 'Java 21', 'Java 24']
}

const LEARNING_SUBCATEGORY_ORDER = ['Core Programming', 'Java Versions']

// Get subcategory for a learning component
const getSubcategoryForLearningComponent = (componentName) => {
  for (const [subcategory, components] of Object.entries(LEARNING_SUBCATEGORIES)) {
    if (components.includes(componentName)) {
      return subcategory
    }
  }
  return null
}

// Helper functions for learning component navigation
const getLearningComponentIndex = (componentName) => {
  return LEARNING_COMPONENTS_ORDER.indexOf(componentName)
}

// Order of database components for navigation
const DATABASE_COMPONENTS_ORDER = ['SQL', 'NoSQL', 'Oracle', 'ORM', 'Redis']

// Display names for database components
const DATABASE_DISPLAY_NAMES = {
  'SQL': 'SQL',
  'NoSQL': 'NoSQL',
  'Oracle': 'Oracle',
  'ORM': 'ORM',
  'Redis': 'Redis'
}

// Helper functions for database component navigation
const getDatabaseComponentIndex = (componentName) => {
  return DATABASE_COMPONENTS_ORDER.indexOf(componentName)
}

const FRAMEWORKS_COMPONENTS_ORDER = ['Spring', 'SpringBoot', 'RestAPI', 'Hibernate', 'gRPC', 'SOAP', 'React']

// Display names for frameworks components
const FRAMEWORKS_DISPLAY_NAMES = {
  'Spring': 'Spring',
  'SpringBoot': 'Spring Boot',
  'RestAPI': 'REST API',
  'Hibernate': 'Hibernate',
  'gRPC': 'gRPC',
  'SOAP': 'SOAP',
  'React': 'React'
}

// Helper functions for frameworks component navigation
const getFrameworksComponentIndex = (componentName) => {
  return FRAMEWORKS_COMPONENTS_ORDER.indexOf(componentName)
}

const DEVOPS_COMPONENTS_ORDER = ['Deployment', 'Docker', 'Kubernetes', 'Testing', 'CICD', 'AgileScrum', 'ProductionSupport', 'TeamCity', 'Jenkins', 'Prometheus', 'Grafana', 'SecurityOWASP', 'JWT', 'OAuth', 'OAuth2', 'Kafka', 'ApacheFlink', 'RabbitMQ', 'Solace', 'MuleSoft']

// Display names for devops components
const DEVOPS_DISPLAY_NAMES = {
  'Deployment': 'Deployment',
  'Docker': 'Docker',
  'Kubernetes': 'Kubernetes',
  'Testing': 'Testing',
  'CICD': 'CI/CD',
  'AgileScrum': 'Agile Scrum',
  'ProductionSupport': 'Production Support',
  'TeamCity': 'TeamCity',
  'Jenkins': 'Jenkins',
  'Prometheus': 'Prometheus',
  'Grafana': 'Grafana',
  'SecurityOWASP': 'Security & OWASP',
  'JWT': 'JWT',
  'OAuth': 'OAuth',
  'OAuth2': 'OAuth 2.0',
  'Kafka': 'Apache Kafka',
  'ApacheFlink': 'Apache Flink',
  'RabbitMQ': 'RabbitMQ',
  'Solace': 'Solace',
  'MuleSoft': 'MuleSoft'
}

// Helper functions for devops component navigation
const getDevOpsComponentIndex = (componentName) => {
  return DEVOPS_COMPONENTS_ORDER.indexOf(componentName)
}

const CLOUD_COMPONENTS_ORDER = ['AWS', 'GCP', 'Azure']

// Display names for cloud components
const CLOUD_DISPLAY_NAMES = {
  'AWS': 'AWS',
  'GCP': 'GCP',
  'Azure': 'Azure'
}

// Helper functions for cloud component navigation
const getCloudComponentIndex = (componentName) => {
  return CLOUD_COMPONENTS_ORDER.indexOf(componentName)
}

const DESIGN_COMPONENTS_ORDER = ['DesignPatterns', 'MicroservicePatterns', 'Class', 'SystemDesign', 'Module', 'Function', 'Interface']

// Display names for design components
const DESIGN_DISPLAY_NAMES = {
  'DesignPatterns': 'Design Patterns',
  'MicroservicePatterns': 'Microservice Patterns',
  'Class': 'OOP Design',
  'SystemDesign': 'System Design',
  'Module': 'Module',
  'Function': 'Function',
  'Interface': 'Interface'
}

// Helper functions for design component navigation
const getDesignComponentIndex = (componentName) => {
  return DESIGN_COMPONENTS_ORDER.indexOf(componentName)
}

function App() {
  const [count, setCount] = useState(0)
  const [selectedOption, setSelectedOption] = useState('')
  const [hoveredOption, setHoveredOption] = useState(null)
  const [expandedGroup, setExpandedGroup] = useState(null)
  const [expandedSubcategory, setExpandedSubcategory] = useState(null)
  const [focusedCategoryIndex, setFocusedCategoryIndex] = useState(0)
  const [focusedUtilityButton, setFocusedUtilityButton] = useState(null) // 'search' or 'account'
  const [focusedItemIndex, setFocusedItemIndex] = useState(-1)
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false)
  const [showGlobalSearch, setShowGlobalSearch] = useState(false)
  const [isKeyboardUser, setIsKeyboardUser] = useState(false)
  const [expandedProgressCategory, setExpandedProgressCategory] = useState(null)
  const [triggeringElement, setTriggeringElement] = useState(null)
  const [helpDialogTrigger, setHelpDialogTrigger] = useState(null)
  const [showStudyGuideModal, setShowStudyGuideModal] = useState(false)
  const [showDesignPatternsModal, setShowDesignPatternsModal] = useState(false)
  const [showMicroservicePatternsModal, setShowMicroservicePatternsModal] = useState(false)
  const [showClassModal, setShowClassModal] = useState(false)
  const [showSystemDesignModal, setShowSystemDesignModal] = useState(false)
  const [showModuleModal, setShowModuleModal] = useState(false)
  const [showFunctionModal, setShowFunctionModal] = useState(false)
  const [showInterfaceModal, setShowInterfaceModal] = useState(false)
  const [showEventDrivenArchitectureModal, setShowEventDrivenArchitectureModal] = useState(false)
  const [showDomainDrivenDesignModal, setShowDomainDrivenDesignModal] = useState(false)
  const [showSQLModal, setShowSQLModal] = useState(false)
  const [showNoSQLModal, setShowNoSQLModal] = useState(false)
  const [showOracleModal, setShowOracleModal] = useState(false)
  const [showORMModal, setShowORMModal] = useState(false)
  const [showRedisModal, setShowRedisModal] = useState(false)
  const [showSpringModal, setShowSpringModal] = useState(false)
  const [showSpringBootModal, setShowSpringBootModal] = useState(false)
  const [showRESTAPIModal, setShowRESTAPIModal] = useState(false)
  const [showDeploymentModal, setShowDeploymentModal] = useState(false)
  const [showDockerModal, setShowDockerModal] = useState(false)
  const [showKubernetesModal, setShowKubernetesModal] = useState(false)
  const [showTestingModal, setShowTestingModal] = useState(false)
  const [showCICDModal, setShowCICDModal] = useState(false)
  const [showAgileScrumModal, setShowAgileScrumModal] = useState(false)
  const [showProductionSupportModal, setShowProductionSupportModal] = useState(false)
  const [showTeamCityModal, setShowTeamCityModal] = useState(false)
  const [showJenkinsModal, setShowJenkinsModal] = useState(false)
  const [showPrometheusModal, setShowPrometheusModal] = useState(false)
  const [showGrafanaModal, setShowGrafanaModal] = useState(false)
  const [showSecurityOWASPModal, setShowSecurityOWASPModal] = useState(false)
  const [showKafkaModal, setShowKafkaModal] = useState(false)
  const [showApacheFlinkModal, setShowApacheFlinkModal] = useState(false)
  const [showSolaceModal, setShowSolaceModal] = useState(false)
  const [showRabbitMQModal, setShowRabbitMQModal] = useState(false)
  const [showMuleSoftModal, setShowMuleSoftModal] = useState(false)
  const [showAWSModal, setShowAWSModal] = useState(false)
  const [showGCPModal, setShowGCPModal] = useState(false)
  const [showAzureModal, setShowAzureModal] = useState(false)
  const [showArraysModal, setShowArraysModal] = useState(false)
  const [showHashTablesModal, setShowHashTablesModal] = useState(false)
  const [showStacksModal, setShowStacksModal] = useState(false)
  const [showQueuesModal, setShowQueuesModal] = useState(false)
  const [showTreesModal, setShowTreesModal] = useState(false)
  const [showBinaryTreesModal, setShowBinaryTreesModal] = useState(false)
  const [showBinarySearchTreesModal, setShowBinarySearchTreesModal] = useState(false)
  const [showGraphsModal, setShowGraphsModal] = useState(false)
  const [showHeapsModal, setShowHeapsModal] = useState(false)
  const [showUnionFindModal, setShowUnionFindModal] = useState(false)
  const [showTrieModal, setShowTrieModal] = useState(false)
  const [showLinkedListsModal, setShowLinkedListsModal] = useState(false)
  const [showSortingModal, setShowSortingModal] = useState(false)
  const [showBinarySearchModal, setShowBinarySearchModal] = useState(false)
  const [showRecursionModal, setShowRecursionModal] = useState(false)
  const [showDynamicProgrammingModal, setShowDynamicProgrammingModal] = useState(false)
  const [showSlidingWindowModal, setShowSlidingWindowModal] = useState(false)
  const [showBacktrackingModal, setShowBacktrackingModal] = useState(false)
  const [showIntervalsModal, setShowIntervalsModal] = useState(false)
  const [showMathGeometryModal, setShowMathGeometryModal] = useState(false)
  const [showAdvancedGraphsModal, setShowAdvancedGraphsModal] = useState(false)
  const [showStreamsModal, setShowStreamsModal] = useState(false)
  const [showStreamsAdvancedModal, setShowStreamsAdvancedModal] = useState(false)
  const [showLambdasModal, setShowLambdasModal] = useState(false)
  const [showLambdasAdvancedModal, setShowLambdasAdvancedModal] = useState(false)
  const [showFunctionalInterfacesModal, setShowFunctionalInterfacesModal] = useState(false)
  const [showCollectionsFrameworkModal, setShowCollectionsFrameworkModal] = useState(false)
  const [showConcurrencyModal, setShowConcurrencyModal] = useState(false)
  const [showMultithreadingModal, setShowMultithreadingModal] = useState(false)
  const [showObjectOrientedProgrammingModal, setShowObjectOrientedProgrammingModal] = useState(false)
  const [showExceptionHandlingModal, setShowExceptionHandlingModal] = useState(false)
  const [showFileIOModal, setShowFileIOModal] = useState(false)
  const [showJVMInternalsModal, setShowJVMInternalsModal] = useState(false)
  const [showMemoryManagementModal, setShowMemoryManagementModal] = useState(false)
  const [showDataStructuresModal, setShowDataStructuresModal] = useState(false)
  const [showStringsModal, setShowStringsModal] = useState(false)
  const [showGenericsModal, setShowGenericsModal] = useState(false)
  const [showDesignPatternsPracticeModal, setShowDesignPatternsPracticeModal] = useState(false)
  const [showLRUCacheModal, setShowLRUCacheModal] = useState(false)
  const [showRateLimiterModal, setShowRateLimiterModal] = useState(false)
  const [showDesignProblemsModal, setShowDesignProblemsModal] = useState(false)
  const [showHibernateModal, setShowHibernateModal] = useState(false)
  const [showActuatorModal, setShowActuatorModal] = useState(false)
  const [showGRPCModal, setShowGRPCModal] = useState(false)
  const [showSOAPModal, setShowSOAPModal] = useState(false)
  const [showReactModal, setShowReactModal] = useState(false)
  const [showJavaQuestionsModal, setShowJavaQuestionsModal] = useState(false)
  const [showCoreJavaQuestionsModal, setShowCoreJavaQuestionsModal] = useState(false)
  const [showJava8QuestionsModal, setShowJava8QuestionsModal] = useState(false)
  const [showJava11QuestionsModal, setShowJava11QuestionsModal] = useState(false)
  const [showJava15QuestionsModal, setShowJava15QuestionsModal] = useState(false)
  const [showJava21QuestionsModal, setShowJava21QuestionsModal] = useState(false)
  const [showJava24QuestionsModal, setShowJava24QuestionsModal] = useState(false)
  const [showSQLQuestionsModal, setShowSQLQuestionsModal] = useState(false)
  const [showHibernateQuestionsModal, setShowHibernateQuestionsModal] = useState(false)
  const [showKafkaQuestionsModal, setShowKafkaQuestionsModal] = useState(false)
  const [showApacheFlinkQuestionsModal, setShowApacheFlinkQuestionsModal] = useState(false)
  const [showRabbitMQQuestionsModal, setShowRabbitMQQuestionsModal] = useState(false)
  const [showSolaceQuestionsModal, setShowSolaceQuestionsModal] = useState(false)
  const [showRestAPIQuestionsModal, setShowRestAPIQuestionsModal] = useState(false)
  const [showJenkinsQuestionsModal, setShowJenkinsQuestionsModal] = useState(false)
  const [showTeamCityQuestionsModal, setShowTeamCityQuestionsModal] = useState(false)
  const [showPrometheusQuestionsModal, setShowPrometheusQuestionsModal] = useState(false)
  const [showGrafanaQuestionsModal, setShowGrafanaQuestionsModal] = useState(false)
  const [showZipkinQuestionsModal, setShowZipkinQuestionsModal] = useState(false)
  const [showActuatorQuestionsModal, setShowActuatorQuestionsModal] = useState(false)
  const [showSpringCoreQuestionsModal, setShowSpringCoreQuestionsModal] = useState(false)
  const [showSpringBootQuestionsModal, setShowSpringBootQuestionsModal] = useState(false)
  const [showSpringSecurityQuestionsModal, setShowSpringSecurityQuestionsModal] = useState(false)
  const [showSpringDataJPAQuestionsModal, setShowSpringDataJPAQuestionsModal] = useState(false)
  const [showSpringAnnotationsQuestionsModal, setShowSpringAnnotationsQuestionsModal] = useState(false)
  const [showSearchingModal, setShowSearchingModal] = useState(false)
  const [showGreedyAlgorithmsModal, setShowGreedyAlgorithmsModal] = useState(false)
  const [showFamousAlgorithmsModal, setShowFamousAlgorithmsModal] = useState(false)
  const [showAccountDropdown, setShowAccountDropdown] = useState(false)
  const [showKeyboardGuide, setShowKeyboardGuide] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [expandedCategories, setExpandedCategories] = useState([])
  const categoryButtonRefs = useRef({})
  const itemButtonRefs = useRef({})
  const componentContainerRef = useRef(null)
  const accountButtonRef = useRef(null)
  const subcategoryItemsRef = useRef(null)
  const lastScrollY = useRef(0)

  // Use ref to always have access to current selectedOption in event handlers
  const selectedOptionRef = useRef(selectedOption)

  // Initialize user and progress tracking on mount
  useEffect(() => {
    initializeUser()
    
    // Read initial page from URL parameter
    const params = new URLSearchParams(window.location.search)
    const pageParam = params.get('page')
    if (pageParam) {
      setSelectedOption(pageParam)
    }
  }, [])

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setCurrentUser(user)
      // Migrate old completion data to user-specific storage when user logs in
      if (user) {
        migrateCompletionData()
      }
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  // Keep ref in sync with state and update URL
  useEffect(() => {
    selectedOptionRef.current = selectedOption
    
    // Update URL parameter when page changes
    const params = new URLSearchParams(window.location.search)
    if (selectedOption) {
      params.set('page', selectedOption)
    } else {
      params.delete('page')
    }
    const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname
    window.history.replaceState({}, '', newUrl)
    
    // Update document title for better sharing and browser tabs
    if (selectedOption) {
      document.title = `${selectedOption} | Java Learning Platform`
    } else {
      document.title = 'Java Learning Platform - Master Java, Design Patterns & System Design'
    }
  }, [selectedOption])

  // Update focused category index based on selected/expanded category
  useEffect(() => {
    const categoryNames = Object.keys(categoryGroups);
    
    // Function to find which category contains a given item
    const findCategoryForItem = (itemName) => {
      for (const [categoryName, categoryData] of Object.entries(categoryGroups)) {
        // Check direct items
        if (categoryData.items && categoryData.items.includes(itemName)) {
          return categoryName;
        }
        // Check subcategory items
        if (categoryData.hasSubcategories && categoryData.subcategories) {
          for (const subcategoryData of Object.values(categoryData.subcategories)) {
            if (subcategoryData.items && subcategoryData.items.includes(itemName)) {
              return categoryName;
            }
          }
        }
      }
      return null;
    };
    
    // Priority: expandedGroup > selectedOption
    let targetCategory = null;
    
    if (expandedGroup) {
      // A category is expanded, highlight it
      targetCategory = expandedGroup;
    } else if (selectedOption) {
      // Check if selectedOption is a category name itself
      if (categoryNames.includes(selectedOption)) {
        targetCategory = selectedOption;
      } else {
        // Find which category contains this item
        targetCategory = findCategoryForItem(selectedOption);
      }
    }
    
    // Update the focused index if we found a target category (REMOVED focusedCategoryIndex from deps to prevent loop)
    if (targetCategory) {
      const newIndex = categoryNames.indexOf(targetCategory);
      if (newIndex !== -1) {
        setFocusedCategoryIndex(newIndex);
      }
    }
  }, [selectedOption, expandedGroup]);

  // Detect keyboard usage for enhanced accessibility
  useEffect(() => {
    const handleKeyDown = () => setIsKeyboardUser(true);
    const handleMouseDown = () => setIsKeyboardUser(false);

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Auto-focus first element when component loads
  useEffect(() => {
    if (selectedOption && componentContainerRef.current) {
      FocusManagerUtil.focusFirstElement(componentContainerRef.current, 150);
      FocusManagerUtil.announce(`${selectedOption} component loaded`, 'polite');
    }
  }, [selectedOption]);

  // Scroll to subcategory items when subcategory is expanded (only on mouse click)
  useEffect(() => {
    if (expandedSubcategory && subcategoryItemsRef.current && shouldAutoScroll) {
      setTimeout(() => {
        // Scroll with an offset to keep the container header visible
        const element = subcategoryItemsRef.current;
        const yOffset = -100; // Offset to keep header visible
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        setShouldAutoScroll(false); // Reset flag after scrolling
      }, 100);
    }
  }, [expandedSubcategory, shouldAutoScroll]);

  // Auto-hide header when hovering on content
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Show header when mouse is in top 350px, hide when below 500px
      if (e.clientY < 350) {
        setIsHeaderVisible(true)
      } else if (e.clientY > 500) {
        setIsHeaderVisible(false)
      }
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show header when scrolling up or at the top
      if (currentScrollY < 10) {
        setIsHeaderVisible(true)
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setIsHeaderVisible(true)
      } else {
        // Scrolling down
        setIsHeaderVisible(false)
      }

      lastScrollY.current = currentScrollY
    }

    // Only add listeners when content is being viewed
    if (selectedOption) {
      document.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('scroll', handleScroll)
      lastScrollY.current = window.scrollY
    } else {
      // Always show header when on main menu
      setIsHeaderVisible(true)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [selectedOption])

  // Handle opening DevOps modals when selectedOption changes
  useEffect(() => {
    // Map of DevOps component names to their modal setters
    const devOpsModalMap = {
      'Deployment': setShowDeploymentModal,
      'Docker': setShowDockerModal,
      'Kubernetes': setShowKubernetesModal,
      'Testing': setShowTestingModal,
      'CICD': setShowCICDModal,
      'CI/CD': setShowCICDModal,
      'Agile Scrum': setShowAgileScrumModal,
      'Production Support': setShowProductionSupportModal,
      'TeamCity': setShowTeamCityModal,
      'Jenkins': setShowJenkinsModal,
      'Prometheus': setShowPrometheusModal,
      'Grafana': setShowGrafanaModal,
      'Security OWASP': setShowSecurityOWASPModal,
      'Security & OWASP': setShowSecurityOWASPModal
    }

    // Check if selectedOption is a DevOps component
    if (selectedOption && devOpsModalMap[selectedOption]) {
      // Close all other modals first
      setShowDeploymentModal(false)
      setShowDockerModal(false)
      setShowKubernetesModal(false)
      setShowTestingModal(false)
      setShowCICDModal(false)
      setShowAgileScrumModal(false)
      setShowProductionSupportModal(false)
      setShowTeamCityModal(false)
      setShowJenkinsModal(false)
      setShowPrometheusModal(false)
      setShowGrafanaModal(false)
      setShowSecurityOWASPModal(false)

      // Open the target modal
      devOpsModalMap[selectedOption](true)
    }
  }, [selectedOption])

  // Custom setter that updates both state and ref immediately
  const setSelectedOptionAndRef = (value, triggerElement = null) => {
    console.log('setSelectedOptionAndRef called with:', value)

    // If opening a new component, save the triggering element for focus restoration
    if (value && !selectedOptionRef.current && triggerElement) {
      focusHistory.push(triggerElement, `Opening ${value} component`);
      setTriggeringElement(triggerElement);
      // Close the expanded group when opening a component
      setExpandedGroup(null);
      setExpandedSubcategory(null);
    }

    // If closing a component, restore focus to the last clicked button
    if (!value && selectedOptionRef.current) {
      // Use setTimeout to ensure the DOM has updated before restoring focus
      setTimeout(() => {
        // First try to restore to the saved triggering element (the button that was clicked)
        const restored = focusHistory.pop(`Closing ${selectedOptionRef.current} component`);
        if (!restored && triggeringElement) {
          try {
            triggeringElement.focus();
            triggeringElement.classList.add('keyboard-focus');
            FocusManagerUtil.announce('Returned to main menu', 'polite');
          } catch (error) {
            console.warn('Failed to restore focus to triggering element:', error);
            // Fallback: focus on the category button
            const categoryButton = categoryButtonRefs.current[focusedCategoryIndex];
            if (categoryButton) {
              categoryButton.focus();
            }
          }
        }
        setTriggeringElement(null);
      }, 100);
    }

    selectedOptionRef.current = value
    setSelectedOption(value)
  }

  // Practice component navigation helpers
  const getPracticeComponentIndex = (componentName) => {
    return PRACTICE_COMPONENTS_ORDER.indexOf(componentName)
  }

  const navigateToPracticeComponent = (componentName) => {
    // Map component names to their modal setters
    const componentModalMap = {
      'Arrays': setShowArraysModal,
      'Hash Tables': setShowHashTablesModal,
      'Stacks': setShowStacksModal,
      'Queues': setShowQueuesModal,
      'Trees': setShowTreesModal,
      'Graphs': setShowGraphsModal,
      'Heaps': setShowHeapsModal,
      'Linked Lists': setShowLinkedListsModal,
      'Sorting': setShowSortingModal,
      'Binary Search': setShowBinarySearchModal,
      'Recursion': setShowRecursionModal,
      'Dynamic Programming': setShowDynamicProgrammingModal,
      'Streams': setShowStreamsModal,
      'Streams Advanced': setShowStreamsAdvancedModal,
      'Lambdas': setShowLambdasModal,
      'Lambdas Advanced': setShowLambdasAdvancedModal,
      'Functional Interfaces': setShowFunctionalInterfacesModal,
      'Collections Framework': setShowCollectionsFrameworkModal,
      'Concurrency': setShowConcurrencyModal,
      'Multithreading': setShowMultithreadingModal,
      'Object-Oriented Programming': setShowObjectOrientedProgrammingModal,
      'Exception Handling': setShowExceptionHandlingModal,
      'File I/O': setShowFileIOModal,
      'JVM Internals': setShowJVMInternalsModal,
      'Memory Management': setShowMemoryManagementModal,
      'Data Structures': setShowDataStructuresModal,
      'Strings': setShowStringsModal,
      'Generics': setShowGenericsModal,
      'Design Patterns Practice': setShowDesignPatternsPracticeModal,
      'LRU Cache': setShowLRUCacheModal,
      'Rate Limiter': setShowRateLimiterModal,
      'Design Problems': setShowDesignProblemsModal,
      'Union Find': setShowUnionFindModal,
      'Trie': setShowTrieModal
    }

    const setter = componentModalMap[componentName]
    if (setter) {
      setter(true)
    }
  }

  const createNavigationCallbacks = (currentComponentName) => {
    const currentIndex = getPracticeComponentIndex(currentComponentName)

    const onPrevious = currentIndex > 0 ? () => {
      // Close current modal
      const closeMap = {
        'Arrays': () => setShowArraysModal(false),
        'Hash Tables': () => setShowHashTablesModal(false),
        'Stacks': () => setShowStacksModal(false),
        'Queues': () => setShowQueuesModal(false),
        'Trees': () => setShowTreesModal(false),
        'Binary Trees': () => setShowBinaryTreesModal(false),
        'Binary Search Trees': () => setShowBinarySearchTreesModal(false),
        'Graphs': () => setShowGraphsModal(false),
        'Heaps': () => setShowHeapsModal(false),
        'Linked Lists': () => setShowLinkedListsModal(false),
        'Sorting': () => setShowSortingModal(false),
        'Binary Search': () => setShowBinarySearchModal(false),
        'Recursion': () => setShowRecursionModal(false),
        'Dynamic Programming': () => setShowDynamicProgrammingModal(false),
        'Streams': () => setShowStreamsModal(false),
        'Streams Advanced': () => setShowStreamsAdvancedModal(false),
        'Lambdas': () => setShowLambdasModal(false),
        'Lambdas Advanced': () => setShowLambdasAdvancedModal(false),
        'Functional Interfaces': () => setShowFunctionalInterfacesModal(false),
        'Collections Framework': () => setShowCollectionsFrameworkModal(false),
        'Concurrency': () => setShowConcurrencyModal(false),
        'Multithreading': () => setShowMultithreadingModal(false),
        'Object-Oriented Programming': () => setShowObjectOrientedProgrammingModal(false),
        'Exception Handling': () => setShowExceptionHandlingModal(false),
        'File I/O': () => setShowFileIOModal(false),
        'JVM Internals': () => setShowJVMInternalsModal(false),
        'Memory Management': () => setShowMemoryManagementModal(false),
        'Data Structures': () => setShowDataStructuresModal(false),
        'Strings': () => setShowStringsModal(false),
        'Generics': () => setShowGenericsModal(false),
        'Design Patterns Practice': () => setShowDesignPatternsPracticeModal(false),
        'LRU Cache': () => setShowLRUCacheModal(false),
        'Rate Limiter': () => setShowRateLimiterModal(false),
        'Design Problems': () => setShowDesignProblemsModal(false),
        'Union Find': () => setShowUnionFindModal(false),
        'Trie': () => setShowTrieModal(false)
      }

      closeMap[currentComponentName]()
      setTimeout(() => {
        navigateToPracticeComponent(PRACTICE_COMPONENTS_ORDER[currentIndex - 1])
      }, 50)
    } : null

    const onNext = currentIndex < PRACTICE_COMPONENTS_ORDER.length - 1 ? () => {
      // Close current modal
      const closeMap = {
        'Arrays': () => setShowArraysModal(false),
        'Hash Tables': () => setShowHashTablesModal(false),
        'Stacks': () => setShowStacksModal(false),
        'Queues': () => setShowQueuesModal(false),
        'Trees': () => setShowTreesModal(false),
        'Binary Trees': () => setShowBinaryTreesModal(false),
        'Binary Search Trees': () => setShowBinarySearchTreesModal(false),
        'Graphs': () => setShowGraphsModal(false),
        'Heaps': () => setShowHeapsModal(false),
        'Linked Lists': () => setShowLinkedListsModal(false),
        'Sorting': () => setShowSortingModal(false),
        'Binary Search': () => setShowBinarySearchModal(false),
        'Recursion': () => setShowRecursionModal(false),
        'Dynamic Programming': () => setShowDynamicProgrammingModal(false),
        'Streams': () => setShowStreamsModal(false),
        'Streams Advanced': () => setShowStreamsAdvancedModal(false),
        'Lambdas': () => setShowLambdasModal(false),
        'Lambdas Advanced': () => setShowLambdasAdvancedModal(false),
        'Functional Interfaces': () => setShowFunctionalInterfacesModal(false),
        'Collections Framework': () => setShowCollectionsFrameworkModal(false),
        'Concurrency': () => setShowConcurrencyModal(false),
        'Multithreading': () => setShowMultithreadingModal(false),
        'Object-Oriented Programming': () => setShowObjectOrientedProgrammingModal(false),
        'Exception Handling': () => setShowExceptionHandlingModal(false),
        'File I/O': () => setShowFileIOModal(false),
        'JVM Internals': () => setShowJVMInternalsModal(false),
        'Memory Management': () => setShowMemoryManagementModal(false),
        'Data Structures': () => setShowDataStructuresModal(false),
        'Strings': () => setShowStringsModal(false),
        'Generics': () => setShowGenericsModal(false),
        'Design Patterns Practice': () => setShowDesignPatternsPracticeModal(false),
        'LRU Cache': () => setShowLRUCacheModal(false),
        'Rate Limiter': () => setShowRateLimiterModal(false),
        'Design Problems': () => setShowDesignProblemsModal(false),
        'Union Find': () => setShowUnionFindModal(false),
        'Trie': () => setShowTrieModal(false)
      }

      closeMap[currentComponentName]()
      setTimeout(() => {
        navigateToPracticeComponent(PRACTICE_COMPONENTS_ORDER[currentIndex + 1])
      }, 50)
    } : null

    const previousName = currentIndex > 0 ? PRACTICE_COMPONENTS_ORDER[currentIndex - 1] : null
    const nextName = currentIndex < PRACTICE_COMPONENTS_ORDER.length - 1 ? PRACTICE_COMPONENTS_ORDER[currentIndex + 1] : null

    // Get subcategory navigation
    const currentSubcategory = getSubcategoryForComponent(currentComponentName)
    const currentSubcategoryIndex = SUBCATEGORY_ORDER.indexOf(currentSubcategory)

    const previousSubcategory = currentSubcategoryIndex > 0 ? SUBCATEGORY_ORDER[currentSubcategoryIndex - 1] : null
    const nextSubcategory = currentSubcategoryIndex < SUBCATEGORY_ORDER.length - 1 ? SUBCATEGORY_ORDER[currentSubcategoryIndex + 1] : null

    // Subcategory navigation handlers (navigate to first component of target subcategory)
    const onPreviousSubcategory = previousSubcategory ? () => {
      const closeMap = {
        'Arrays': () => setShowArraysModal(false),
        'Hash Tables': () => setShowHashTablesModal(false),
        'Stacks': () => setShowStacksModal(false),
        'Queues': () => setShowQueuesModal(false),
        'Trees': () => setShowTreesModal(false),
        'Binary Trees': () => setShowBinaryTreesModal(false),
        'Binary Search Trees': () => setShowBinarySearchTreesModal(false),
        'Graphs': () => setShowGraphsModal(false),
        'Heaps': () => setShowHeapsModal(false),
        'Linked Lists': () => setShowLinkedListsModal(false),
        'Sorting': () => setShowSortingModal(false),
        'Binary Search': () => setShowBinarySearchModal(false),
        'Recursion': () => setShowRecursionModal(false),
        'Dynamic Programming': () => setShowDynamicProgrammingModal(false),
        'Streams': () => setShowStreamsModal(false),
        'Streams Advanced': () => setShowStreamsAdvancedModal(false),
        'Lambdas': () => setShowLambdasModal(false),
        'Lambdas Advanced': () => setShowLambdasAdvancedModal(false),
        'Functional Interfaces': () => setShowFunctionalInterfacesModal(false),
        'Collections Framework': () => setShowCollectionsFrameworkModal(false),
        'Concurrency': () => setShowConcurrencyModal(false),
        'Multithreading': () => setShowMultithreadingModal(false),
        'Object-Oriented Programming': () => setShowObjectOrientedProgrammingModal(false),
        'Exception Handling': () => setShowExceptionHandlingModal(false),
        'File I/O': () => setShowFileIOModal(false),
        'JVM Internals': () => setShowJVMInternalsModal(false),
        'Memory Management': () => setShowMemoryManagementModal(false),
        'Data Structures': () => setShowDataStructuresModal(false),
        'Strings': () => setShowStringsModal(false),
        'Generics': () => setShowGenericsModal(false),
        'Design Patterns Practice': () => setShowDesignPatternsPracticeModal(false),
        'LRU Cache': () => setShowLRUCacheModal(false),
        'Rate Limiter': () => setShowRateLimiterModal(false),
        'Design Problems': () => setShowDesignProblemsModal(false),
        'Union Find': () => setShowUnionFindModal(false),
        'Trie': () => setShowTrieModal(false)
      }

      const firstComponentInPreviousSubcategory = PRACTICE_SUBCATEGORIES[previousSubcategory][0]
      closeMap[currentComponentName]()
      setTimeout(() => {
        navigateToPracticeComponent(firstComponentInPreviousSubcategory)
      }, 50)
    } : null

    const onNextSubcategory = nextSubcategory ? () => {
      const closeMap = {
        'Arrays': () => setShowArraysModal(false),
        'Hash Tables': () => setShowHashTablesModal(false),
        'Stacks': () => setShowStacksModal(false),
        'Queues': () => setShowQueuesModal(false),
        'Trees': () => setShowTreesModal(false),
        'Binary Trees': () => setShowBinaryTreesModal(false),
        'Binary Search Trees': () => setShowBinarySearchTreesModal(false),
        'Graphs': () => setShowGraphsModal(false),
        'Heaps': () => setShowHeapsModal(false),
        'Linked Lists': () => setShowLinkedListsModal(false),
        'Sorting': () => setShowSortingModal(false),
        'Binary Search': () => setShowBinarySearchModal(false),
        'Recursion': () => setShowRecursionModal(false),
        'Dynamic Programming': () => setShowDynamicProgrammingModal(false),
        'Streams': () => setShowStreamsModal(false),
        'Streams Advanced': () => setShowStreamsAdvancedModal(false),
        'Lambdas': () => setShowLambdasModal(false),
        'Lambdas Advanced': () => setShowLambdasAdvancedModal(false),
        'Functional Interfaces': () => setShowFunctionalInterfacesModal(false),
        'Collections Framework': () => setShowCollectionsFrameworkModal(false),
        'Concurrency': () => setShowConcurrencyModal(false),
        'Multithreading': () => setShowMultithreadingModal(false),
        'Object-Oriented Programming': () => setShowObjectOrientedProgrammingModal(false),
        'Exception Handling': () => setShowExceptionHandlingModal(false),
        'File I/O': () => setShowFileIOModal(false),
        'JVM Internals': () => setShowJVMInternalsModal(false),
        'Memory Management': () => setShowMemoryManagementModal(false),
        'Data Structures': () => setShowDataStructuresModal(false),
        'Strings': () => setShowStringsModal(false),
        'Generics': () => setShowGenericsModal(false),
        'Design Patterns Practice': () => setShowDesignPatternsPracticeModal(false),
        'LRU Cache': () => setShowLRUCacheModal(false),
        'Rate Limiter': () => setShowRateLimiterModal(false),
        'Design Problems': () => setShowDesignProblemsModal(false),
        'Union Find': () => setShowUnionFindModal(false),
        'Trie': () => setShowTrieModal(false)
      }

      const firstComponentInNextSubcategory = PRACTICE_SUBCATEGORIES[nextSubcategory][0]
      closeMap[currentComponentName]()
      setTimeout(() => {
        navigateToPracticeComponent(firstComponentInNextSubcategory)
      }, 50)
    } : null

    return { onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory }
  }

  // Create navigation callbacks for learning components
  const createLearningNavigationCallbacks = (currentComponentName) => {
    const currentIndex = getLearningComponentIndex(currentComponentName)
    const currentSubcategory = getSubcategoryForLearningComponent(currentComponentName)
    const currentSubcategoryIndex = LEARNING_SUBCATEGORY_ORDER.indexOf(currentSubcategory)
    const componentsInCurrentSubcategory = LEARNING_SUBCATEGORIES[currentSubcategory]
    const indexInSubcategory = componentsInCurrentSubcategory.indexOf(currentComponentName)

    const navigateToLearningComponent = (componentName) => {
      setSelectedOptionAndRef(componentName)
    }

    // Check if we're at the start of a subcategory
    const isFirstInSubcategory = indexInSubcategory === 0
    const previousSubcategory = currentSubcategoryIndex > 0 ? LEARNING_SUBCATEGORY_ORDER[currentSubcategoryIndex - 1] : null

    // Check if we're at the end of a subcategory
    const isLastInSubcategory = indexInSubcategory === componentsInCurrentSubcategory.length - 1
    const nextSubcategory = currentSubcategoryIndex < LEARNING_SUBCATEGORY_ORDER.length - 1 ? LEARNING_SUBCATEGORY_ORDER[currentSubcategoryIndex + 1] : null

    // Previous button logic
    let onPrevious = null
    let previousName = null
    if (currentIndex > 0) {
      if (isFirstInSubcategory && previousSubcategory) {
        // Jump to first component of previous subcategory
        const firstComponentInPreviousSubcategory = LEARNING_SUBCATEGORIES[previousSubcategory][0]
        onPrevious = () => navigateToLearningComponent(firstComponentInPreviousSubcategory)
        previousName = previousSubcategory
      } else {
        // Go to previous component in sequence
        onPrevious = () => navigateToLearningComponent(LEARNING_COMPONENTS_ORDER[currentIndex - 1])
        previousName = LEARNING_COMPONENTS_ORDER[currentIndex - 1]
      }
    }

    // Next button logic
    let onNext = null
    let nextName = null
    if (currentIndex < LEARNING_COMPONENTS_ORDER.length - 1) {
      if (isLastInSubcategory && nextSubcategory) {
        // Jump to first component of next subcategory
        const firstComponentInNextSubcategory = LEARNING_SUBCATEGORIES[nextSubcategory][0]
        onNext = () => navigateToLearningComponent(firstComponentInNextSubcategory)
        nextName = nextSubcategory
      } else {
        // Go to next component in sequence
        onNext = () => navigateToLearningComponent(LEARNING_COMPONENTS_ORDER[currentIndex + 1])
        nextName = LEARNING_COMPONENTS_ORDER[currentIndex + 1]
      }
    }

    // Subcategory navigation handlers (navigate to first component of target subcategory)
    const onPreviousSubcategory = previousSubcategory ? () => {
      const firstComponentInPreviousSubcategory = LEARNING_SUBCATEGORIES[previousSubcategory][0]
      navigateToLearningComponent(firstComponentInPreviousSubcategory)
    } : null

    const onNextSubcategory = nextSubcategory ? () => {
      const firstComponentInNextSubcategory = LEARNING_SUBCATEGORIES[nextSubcategory][0]
      navigateToLearningComponent(firstComponentInNextSubcategory)
    } : null

    return { onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory }
  }

  // Create navigation callbacks for database components
  const createDatabaseNavigationCallbacks = (currentComponentName) => {
    const currentIndex = getDatabaseComponentIndex(currentComponentName)

    const navigateToDatabaseComponent = (componentName) => {
      // Close all database modals first
      setShowSQLModal(false)
      setShowNoSQLModal(false)
      setShowOracleModal(false)
      setShowORMModal(false)
      setShowRedisModal(false)

      // Open the target modal
      if (componentName === 'SQL') {
        setShowSQLModal(true)
      } else if (componentName === 'NoSQL') {
        setShowNoSQLModal(true)
      } else if (componentName === 'Oracle') {
        setShowOracleModal(true)
      } else if (componentName === 'ORM') {
        setShowORMModal(true)
      } else if (componentName === 'Redis') {
        setShowRedisModal(true)
      }
    }

    // Previous button logic
    const onPrevious = currentIndex > 0 ? () => {
      navigateToDatabaseComponent(DATABASE_COMPONENTS_ORDER[currentIndex - 1])
    } : null
    const previousName = currentIndex > 0 ? DATABASE_DISPLAY_NAMES[DATABASE_COMPONENTS_ORDER[currentIndex - 1]] : null

    // Next button logic
    const onNext = currentIndex < DATABASE_COMPONENTS_ORDER.length - 1 ? () => {
      navigateToDatabaseComponent(DATABASE_COMPONENTS_ORDER[currentIndex + 1])
    } : null
    const nextName = currentIndex < DATABASE_COMPONENTS_ORDER.length - 1 ? DATABASE_DISPLAY_NAMES[DATABASE_COMPONENTS_ORDER[currentIndex + 1]] : null

    return { onPrevious, onNext, previousName, nextName, currentSubcategory: 'Databases' }
  }

  // Create navigation callbacks for frameworks components
  const createFrameworksNavigationCallbacks = (currentComponentName) => {
    const currentIndex = getFrameworksComponentIndex(currentComponentName)

    const navigateToFrameworksComponent = (componentName) => {
      // Close all framework modals first
      setShowSpringModal(false)
      setShowSpringBootModal(false)
      setShowRESTAPIModal(false)
      setShowHibernateModal(false)
      setShowGRPCModal(false)
      setShowSOAPModal(false)
      setShowReactModal(false)

      // Open the target modal
      if (componentName === 'Spring') {
        setShowSpringModal(true)
      } else if (componentName === 'SpringBoot') {
        setShowSpringBootModal(true)
      } else if (componentName === 'RestAPI') {
        setShowRESTAPIModal(true)
      } else if (componentName === 'Hibernate') {
        setShowHibernateModal(true)
      } else if (componentName === 'gRPC') {
        setShowGRPCModal(true)
      } else if (componentName === 'SOAP') {
        setShowSOAPModal(true)
      } else if (componentName === 'React') {
        setShowReactModal(true)
      }
    }

    // Previous button logic
    const onPrevious = currentIndex > 0 ? () => {
      navigateToFrameworksComponent(FRAMEWORKS_COMPONENTS_ORDER[currentIndex - 1])
    } : null
    const previousName = currentIndex > 0 ? FRAMEWORKS_DISPLAY_NAMES[FRAMEWORKS_COMPONENTS_ORDER[currentIndex - 1]] : null

    // Next button logic
    const onNext = currentIndex < FRAMEWORKS_COMPONENTS_ORDER.length - 1 ? () => {
      navigateToFrameworksComponent(FRAMEWORKS_COMPONENTS_ORDER[currentIndex + 1])
    } : null
    const nextName = currentIndex < FRAMEWORKS_COMPONENTS_ORDER.length - 1 ? FRAMEWORKS_DISPLAY_NAMES[FRAMEWORKS_COMPONENTS_ORDER[currentIndex + 1]] : null

    return { onPrevious, onNext, previousName, nextName, currentSubcategory: 'Frameworks' }
  }

  // Create navigation callbacks for devops components
  const createDevOpsNavigationCallbacks = (currentComponentName) => {
    const currentIndex = getDevOpsComponentIndex(currentComponentName)

    const navigateToDevOpsComponent = (componentName) => {
      // Close all devops modals first
      setShowDeploymentModal(false)
      setShowDockerModal(false)
      setShowKubernetesModal(false)
      setShowTestingModal(false)
      setShowCICDModal(false)
      setShowAgileScrumModal(false)
      setShowProductionSupportModal(false)
      setShowTeamCityModal(false)
      setShowJenkinsModal(false)
      setShowPrometheusModal(false)
      setShowGrafanaModal(false)
      setShowSecurityOWASPModal(false)
      setShowKafkaModal(false)
      setShowApacheFlinkModal(false)
      setShowRabbitMQModal(false)
      setShowSolaceModal(false)
      setShowMuleSoftModal(false)

      // Open the target modal
      if (componentName === 'Deployment') {
        setShowDeploymentModal(true)
      } else if (componentName === 'Docker') {
        setShowDockerModal(true)
      } else if (componentName === 'Kubernetes') {
        setShowKubernetesModal(true)
      } else if (componentName === 'Testing') {
        setShowTestingModal(true)
      } else if (componentName === 'CICD') {
        setShowCICDModal(true)
      } else if (componentName === 'AgileScrum') {
        setShowAgileScrumModal(true)
      } else if (componentName === 'ProductionSupport') {
        setShowProductionSupportModal(true)
      } else if (componentName === 'TeamCity') {
        setShowTeamCityModal(true)
      } else if (componentName === 'Jenkins') {
        setShowJenkinsModal(true)
      } else if (componentName === 'Prometheus') {
        setShowPrometheusModal(true)
      } else if (componentName === 'Grafana') {
        setShowGrafanaModal(true)
      } else if (componentName === 'SecurityOWASP') {
        setShowSecurityOWASPModal(true)
      } else if (componentName === 'JWT') {
        setSelectedOptionAndRef('JWT')
      } else if (componentName === 'OAuth') {
        setSelectedOptionAndRef('OAuth')
      } else if (componentName === 'OAuth2') {
        setSelectedOptionAndRef('OAuth2')
      } else if (componentName === 'Kafka') {
        setShowKafkaModal(true)
      } else if (componentName === 'ApacheFlink') {
        setShowApacheFlinkModal(true)
      } else if (componentName === 'RabbitMQ') {
        setShowRabbitMQModal(true)
      } else if (componentName === 'Solace') {
        setShowSolaceModal(true)
      } else if (componentName === 'MuleSoft') {
        setShowMuleSoftModal(true)
      }
    }

    // Previous button logic
    const onPrevious = currentIndex > 0 ? () => {
      navigateToDevOpsComponent(DEVOPS_COMPONENTS_ORDER[currentIndex - 1])
    } : null
    const previousName = currentIndex > 0 ? DEVOPS_DISPLAY_NAMES[DEVOPS_COMPONENTS_ORDER[currentIndex - 1]] : null

    // Next button logic
    const onNext = currentIndex < DEVOPS_COMPONENTS_ORDER.length - 1 ? () => {
      navigateToDevOpsComponent(DEVOPS_COMPONENTS_ORDER[currentIndex + 1])
    } : null
    const nextName = currentIndex < DEVOPS_COMPONENTS_ORDER.length - 1 ? DEVOPS_DISPLAY_NAMES[DEVOPS_COMPONENTS_ORDER[currentIndex + 1]] : null

    return { onPrevious, onNext, previousName, nextName, currentSubcategory: 'DevOps' }
  }

  // Create navigation callbacks for cloud components
  const createCloudNavigationCallbacks = (currentComponentName) => {
    const currentIndex = getCloudComponentIndex(currentComponentName)

    const navigateToCloudComponent = (componentName) => {
      // Close all cloud modals first
      setShowAWSModal(false)
      setShowGCPModal(false)
      setShowAzureModal(false)

      // Open the target modal
      if (componentName === 'AWS') {
        setShowAWSModal(true)
      } else if (componentName === 'GCP') {
        setShowGCPModal(true)
      } else if (componentName === 'Azure') {
        setShowAzureModal(true)
      }
    }

    // Previous button logic
    const onPrevious = currentIndex > 0 ? () => {
      navigateToCloudComponent(CLOUD_COMPONENTS_ORDER[currentIndex - 1])
    } : null
    const previousName = currentIndex > 0 ? CLOUD_DISPLAY_NAMES[CLOUD_COMPONENTS_ORDER[currentIndex - 1]] : null

    // Next button logic
    const onNext = currentIndex < CLOUD_COMPONENTS_ORDER.length - 1 ? () => {
      navigateToCloudComponent(CLOUD_COMPONENTS_ORDER[currentIndex + 1])
    } : null
    const nextName = currentIndex < CLOUD_COMPONENTS_ORDER.length - 1 ? CLOUD_DISPLAY_NAMES[CLOUD_COMPONENTS_ORDER[currentIndex + 1]] : null

    return { onPrevious, onNext, previousName, nextName, currentSubcategory: 'Cloud' }
  }

  // Create navigation callbacks for design components
  const createDesignNavigationCallbacks = (currentComponentName) => {
    const currentIndex = getDesignComponentIndex(currentComponentName)

    const navigateToDesignComponent = (componentName) => {
      // Close all design modals first
      setShowDesignPatternsModal(false)
      setShowMicroservicePatternsModal(false)
      setShowClassModal(false)
      setShowSystemDesignModal(false)
      setShowModuleModal(false)
      setShowFunctionModal(false)
      setShowInterfaceModal(false)

      // Open the target modal
      if (componentName === 'DesignPatterns') {
        setShowDesignPatternsModal(true)
      } else if (componentName === 'MicroservicePatterns') {
        setShowMicroservicePatternsModal(true)
      } else if (componentName === 'Class') {
        setShowClassModal(true)
      } else if (componentName === 'SystemDesign') {
        setShowSystemDesignModal(true)
      } else if (componentName === 'Module') {
        setShowModuleModal(true)
      } else if (componentName === 'Function') {
        setShowFunctionModal(true)
      } else if (componentName === 'Interface') {
        setShowInterfaceModal(true)
      }
    }

    // Previous button logic
    const onPrevious = currentIndex > 0 ? () => {
      navigateToDesignComponent(DESIGN_COMPONENTS_ORDER[currentIndex - 1])
    } : null
    const previousName = currentIndex > 0 ? DESIGN_DISPLAY_NAMES[DESIGN_COMPONENTS_ORDER[currentIndex - 1]] : null

    // Next button logic
    const onNext = currentIndex < DESIGN_COMPONENTS_ORDER.length - 1 ? () => {
      navigateToDesignComponent(DESIGN_COMPONENTS_ORDER[currentIndex + 1])
    } : null
    const nextName = currentIndex < DESIGN_COMPONENTS_ORDER.length - 1 ? DESIGN_DISPLAY_NAMES[DESIGN_COMPONENTS_ORDER[currentIndex + 1]] : null

    return { onPrevious, onNext, previousName, nextName, currentSubcategory: 'Design' }
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
        description: 'Functional programming paradigms with lambda expressions and stream processing. Covers higher-order functions, immutability, and functional composition.',
        metrics: ['Lambda Expressions', 'Stream API', 'Functional Composition', 'Immutability'],
        complexity: 'Intermediate to Advanced',
        industry: 'Software Development'
      },
      {
        value: 'Class',
        label: '🏗️ Object-Oriented Design',
        description: 'Object-oriented design principles, encapsulation, inheritance, and composition. Includes SOLID principles and OOP best practices.',
        metrics: ['OOP Principles', 'SOLID', 'Encapsulation', 'Inheritance'],
        complexity: 'Intermediate to Advanced',
        industry: 'Software Development'
      },
      {
        value: 'Interface',
        label: '🔌 Interface Design',
        description: 'Contract programming with interfaces, abstraction, and polymorphism. Covers interface segregation and API design principles.',
        metrics: ['Contract Programming', 'Abstraction', 'Polymorphism', 'API Design'],
        complexity: 'Intermediate to Advanced',
        industry: 'Software Development'
      },
      {
        value: 'Design Patterns',
        label: '🎨 Design Patterns',
        description: 'Classic and modern software design patterns including Gang of Four patterns, architectural patterns, and enterprise integration patterns. Covers creational, structural, and behavioral patterns.',
        metrics: ['Creational Patterns', 'Structural Patterns', 'Behavioral Patterns', 'Enterprise Patterns'],
        complexity: 'Intermediate to Advanced',
        industry: 'Software Architecture, Object-Oriented Design'
      },
      {
        value: 'Dependency Injection',
        label: '💉 Dependency Injection',
        description: 'Dependency Injection (DI) design pattern implementing Inversion of Control (IoC). Covers constructor, setter, field, and interface injection with examples from Spring, Guice, .NET Core, and Angular.',
        metrics: ['Constructor Injection', 'Setter Injection', 'Field Injection', 'IoC Containers', 'DI Frameworks'],
        complexity: 'Intermediate',
        industry: 'Software Architecture, Enterprise Development, Spring Framework'
      },
      {
        value: 'System Design',
        label: '🏗️ System Design',
        description: 'System architecture principles including scalability, high availability, load balancing, caching, and disaster recovery. Covers CAP theorem and N-tier architecture.',
        metrics: ['Scalability', 'High Availability', 'Load Balancing', 'Caching'],
        complexity: 'Advanced to Expert',
        industry: 'System Architecture'
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
        description: 'Core Spring Framework providing IoC container, dependency injection, AOP, and resource management. Foundation for all Spring-based applications with comprehensive enterprise features.',
        metrics: ['Dependency Injection', 'IoC Container', 'AOP', 'Transaction Management'],
        complexity: 'Intermediate to Advanced',
        industry: 'Enterprise Java, Application Framework'
      },
      {
        value: 'Spring Boot',
        label: '🚀 Spring Boot',
        description: 'Opinionated framework built on Spring for rapid application development. Features auto-configuration, embedded servers, starter dependencies, production-ready actuators, and simplified deployment.',
        metrics: ['Auto-Configuration', 'Embedded Servers', 'Starter Dependencies', 'Production Ready'],
        complexity: 'Intermediate',
        industry: 'Microservices, Rapid Development'
      },
      {
        value: 'REST API',
        label: '🌐 RESTful Web Services',
        description: 'Design and implementation of RESTful APIs following REST principles. Covers HTTP methods, status codes, resource design, versioning, authentication, documentation with OpenAPI/Swagger, and best practices for scalable APIs.',
        metrics: ['REST Principles', 'API Design', 'HTTP Methods', 'API Security'],
        complexity: 'Intermediate',
        industry: 'Web Services, Microservices, Integration'
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
        description: 'Domain-driven design with bounded contexts and modular programming techniques. Covers event sourcing, CQRS, and hexagonal architecture.',
        metrics: ['Domain-Driven Design', 'Bounded Contexts', 'Event Sourcing', 'CQRS'],
        complexity: 'Advanced to Expert',
        industry: 'Enterprise Architecture'
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
      },
      {
        value: 'Deployment',
        label: '🚀 Production Deployment',
        description: 'Complete production deployment pipeline from build to release. Covers environment configuration, blue-green deployment, canary releases, rollback strategies, monitoring setup, and production readiness checklist.',
        metrics: ['Build Pipeline', 'Release Strategy', 'Monitoring', 'Rollback Procedures'],
        complexity: 'Intermediate to Advanced',
        industry: 'DevOps, Site Reliability Engineering'
      },
      {
        value: 'Docker',
        label: '🐳 Docker',
        description: 'Containerization with Docker including image creation, multi-stage builds, Docker Compose, networking, volumes, security best practices, and optimization techniques for production deployments.',
        metrics: ['Containerization', 'Image Building', 'Orchestration', 'Security'],
        complexity: 'Intermediate',
        industry: 'DevOps, Cloud-Native'
      },
      {
        value: 'Kubernetes',
        label: '☸️ Kubernetes',
        description: 'Container orchestration with Kubernetes covering pods, deployments, services, ingress, ConfigMaps, secrets, persistent volumes, auto-scaling, rolling updates, and production cluster management.',
        metrics: ['Orchestration', 'Auto-Scaling', 'Service Discovery', 'Self-Healing'],
        complexity: 'Advanced',
        industry: 'Cloud-Native, DevOps, Microservices'
      },
      {
        value: 'Testing',
        label: '🧪 Testing',
        description: 'Comprehensive testing strategies including unit testing with JUnit/Mockito, integration testing, contract testing, performance testing, test-driven development, and test automation frameworks.',
        metrics: ['Unit Testing', 'Integration Testing', 'Test Automation', 'TDD/BDD'],
        complexity: 'Intermediate to Advanced',
        industry: 'Software Development, Quality Assurance'
      },
      {
        value: 'CI/CD',
        label: '🔄 CI/CD',
        description: 'Continuous Integration and Continuous Deployment pipelines with automated build, test, and deployment processes. Covers Jenkins, GitLab CI, GitHub Actions, ArgoCD, and modern DevOps practices.',
        metrics: ['Jenkins Pipelines', 'GitLab CI/CD', 'GitHub Actions', 'ArgoCD', 'Automated Testing'],
        complexity: 'Intermediate to Advanced',
        industry: 'DevOps, Software Engineering, Cloud Operations'
      },
      {
        value: 'Agile Scrum',
        label: '🏃 Agile & Scrum',
        description: 'Agile methodologies and Scrum framework including sprint planning, user stories, daily standups, retrospectives, estimation techniques, and agile best practices for iterative development.',
        metrics: ['Sprint Planning', 'User Stories', 'Scrum Ceremonies', 'Agile Estimation'],
        complexity: 'Beginner to Intermediate',
        industry: 'Software Development, Project Management'
      },
      {
        value: 'Production Support',
        label: '🚨 Production Support',
        description: 'Production support best practices including incident management, root cause analysis, troubleshooting techniques, on-call procedures, SLA management, and maintaining critical infrastructure applications.',
        metrics: ['Incident Management', 'RCA', 'Troubleshooting', 'On-Call Support'],
        complexity: 'Intermediate to Advanced',
        industry: 'DevOps, Site Reliability Engineering'
      }
    ],
    'Security & Compliance': [
      {
        value: 'Security OWASP',
        label: '🔒 Security & OWASP',
        description: 'Application security fundamentals covering OWASP Top 10 vulnerabilities, secure coding practices, authentication, authorization, encryption, SQL injection prevention, XSS protection, and security testing with static/dynamic analysis.',
        metrics: ['OWASP Top 10', 'Secure Coding', 'Security Testing', 'Vulnerability Management'],
        complexity: 'Intermediate to Advanced',
        industry: 'Security, Compliance, Enterprise Development'
      }
    ],
    'Practice Topics': [
      {
        value: 'Arrays',
        label: '📋 Arrays',
        description: 'Array data structure fundamentals, operations, and algorithms.',
        metrics: ['Array Operations', 'Traversal', 'Search', 'Sort'],
        complexity: 'Beginner to Intermediate',
        industry: 'Software Development'
      },
      {
        value: 'Hash Tables',
        label: '🗂️ Hash Tables',
        description: 'Hash table implementation, collision handling, and optimization.',
        metrics: ['Hashing', 'Collision Resolution', 'Performance', 'HashMap'],
        complexity: 'Intermediate',
        industry: 'Software Development'
      },
      {
        value: 'Sorting',
        label: '🔄 Sorting',
        description: 'Sorting algorithms and their applications.',
        metrics: ['QuickSort', 'MergeSort', 'HeapSort', 'Complexity'],
        complexity: 'Intermediate',
        industry: 'Software Development'
      },
      {
        value: 'Stacks',
        label: '📚 Stacks',
        description: 'Stack data structure and LIFO operations.',
        metrics: ['Push/Pop', 'LIFO', 'Stack Applications', 'Memory'],
        complexity: 'Beginner to Intermediate',
        industry: 'Software Development'
      },
      {
        value: 'Strings',
        label: '📝 Strings',
        description: 'String manipulation and algorithms.',
        metrics: ['String Operations', 'Pattern Matching', 'StringBuilder', 'RegEx'],
        complexity: 'Beginner to Intermediate',
        industry: 'Software Development'
      },
      {
        value: 'Generics',
        label: '🔤 Generics',
        description: 'Java Generics for type-safe collections and methods. Learn type parameters, bounded types, wildcards, and generic classes/methods.',
        metrics: ['Type Parameters', 'Bounded Types', 'Wildcards', 'Generic Methods'],
        complexity: 'Intermediate',
        industry: 'Software Development'
      },
      {
        value: 'Binary Search',
        label: '🔍 Binary Search',
        description: 'Binary search algorithm and variations.',
        metrics: ['Search Algorithm', 'Divide & Conquer', 'Complexity', 'Optimization'],
        complexity: 'Intermediate',
        industry: 'Software Development'
      },
      {
        value: 'Linked Lists',
        label: '🔗 Linked Lists',
        description: 'Linked list data structures and operations.',
        metrics: ['Singly Linked', 'Doubly Linked', 'Circular', 'Operations'],
        complexity: 'Intermediate',
        industry: 'Software Development'
      },
      {
        value: 'Object-Oriented Programming',
        label: '🎯 OOP',
        description: 'Object-oriented programming principles and practices.',
        metrics: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'],
        complexity: 'Intermediate',
        industry: 'Software Development'
      },
      {
        value: 'Concurrency',
        label: '🔀 Concurrency',
        description: 'Concurrent programming concepts and patterns.',
        metrics: ['Threads', 'Synchronization', 'Race Conditions', 'Deadlocks'],
        complexity: 'Advanced',
        industry: 'Software Development'
      },
      {
        value: 'Multithreading',
        label: '🧵 Multithreading',
        description: 'Multithreading implementation and best practices.',
        metrics: ['Thread Pool', 'Executors', 'Thread Safety', 'Performance'],
        complexity: 'Advanced',
        industry: 'Software Development'
      },
      {
        value: 'Collections Framework',
        label: '📦 Collections',
        description: 'Java Collections Framework and utilities.',
        metrics: ['List', 'Set', 'Map', 'Queue'],
        complexity: 'Intermediate',
        industry: 'Software Development'
      },
      {
        value: 'Data Structures',
        label: '🏗️ Data Structures',
        description: 'Core data structures and their applications.',
        metrics: ['Trees', 'Graphs', 'Heaps', 'Tries'],
        complexity: 'Intermediate to Advanced',
        industry: 'Software Development'
      },
      {
        value: 'Exception Handling',
        label: '⚠️ Exception Handling',
        description: 'Exception handling patterns and best practices.',
        metrics: ['Try-Catch', 'Custom Exceptions', 'Error Handling', 'Recovery'],
        complexity: 'Beginner to Intermediate',
        industry: 'Software Development'
      },
      {
        value: 'File I/O',
        label: '📁 File I/O',
        description: 'File input/output operations and streams.',
        metrics: ['Streams', 'Buffers', 'NIO', 'Serialization'],
        complexity: 'Intermediate',
        industry: 'Software Development'
      },
      {
        value: 'JVM Internals',
        label: '⚙️ JVM Internals',
        description: 'Java Virtual Machine architecture and internals.',
        metrics: ['Classloader', 'Bytecode', 'JIT', 'GC'],
        complexity: 'Advanced',
        industry: 'Software Development'
      },
      {
        value: 'Memory Management',
        label: '🧠 Memory Management',
        description: 'Memory management and garbage collection.',
        metrics: ['Heap', 'Stack', 'GC Algorithms', 'Memory Leaks'],
        complexity: 'Advanced',
        industry: 'Software Development'
      },
      {
        value: 'Recursion',
        label: '🔄 Recursion',
        description: 'Recursive algorithms and problem solving.',
        metrics: ['Base Case', 'Recursive Case', 'Backtracking', 'Tree Traversal'],
        complexity: 'Intermediate',
        industry: 'Software Development'
      },
      {
        value: 'Streams',
        label: '🌊 Streams',
        description: 'Java Streams API for functional-style operations on collections.',
        metrics: ['Stream Operations', 'Parallel Streams', 'Collectors', 'Primitive Streams'],
        complexity: 'Intermediate to Advanced',
        industry: 'Software Development'
      },
      {
        value: 'Streams Advanced',
        label: '🌊 Streams Advanced',
        description: 'Advanced Java Streams challenges including multi-level grouping, parallel processing, and custom collectors.',
        metrics: ['Complex Grouping', 'Parallel Streams', 'Custom Collectors', 'Stream Performance'],
        complexity: 'Advanced',
        industry: 'Software Development'
      },
      {
        value: 'Lambdas',
        label: '⚡ Lambdas',
        description: 'Lambda expressions and functional programming in Java.',
        metrics: ['Lambda Syntax', 'Method References', 'Higher-Order Functions', 'Closures'],
        complexity: 'Intermediate',
        industry: 'Software Development'
      },
      {
        value: 'Lambdas Advanced',
        label: 'λ Lambdas Advanced',
        description: 'Advanced lambda challenges including function composition, custom functional interfaces, exception handling, and closures.',
        metrics: ['Function Composition', 'Predicate Chaining', 'Custom Functional Interfaces', 'Higher-Order Functions'],
        complexity: 'Advanced',
        industry: 'Software Development'
      },
      {
        value: 'Functional Interfaces',
        label: '🔌 Functional Interfaces',
        description: 'Built-in and custom functional interfaces in Java.',
        metrics: ['Predicate', 'Function', 'Consumer', 'Supplier'],
        complexity: 'Intermediate',
        industry: 'Software Development'
      },
      {
        value: 'Dynamic Programming',
        label: '🎯 Dynamic Programming',
        description: 'Optimization problems using memoization and tabulation techniques.',
        metrics: ['Memoization', 'Tabulation', 'Optimal Substructure', 'Overlapping Subproblems'],
        complexity: 'Advanced',
        industry: 'Software Development'
      },
      {
        value: 'Union Find',
        label: '🔗 Union Find',
        description: 'Disjoint Set Union data structure with path compression and union by rank for efficient set operations.',
        metrics: ['Path Compression', 'Union by Rank', 'Connected Components', 'Cycle Detection'],
        complexity: 'Intermediate to Advanced',
        industry: 'Software Development'
      },
      {
        value: 'Trie',
        label: '🌲 Trie',
        description: 'Prefix tree data structure for efficient string searching and prefix matching.',
        metrics: ['Insert', 'Search', 'Prefix Match', 'Word Search'],
        complexity: 'Intermediate to Advanced',
        industry: 'Software Development'
      },
      {
        value: 'Trees',
        label: '🌳 Trees',
        description: 'Binary tree algorithms, traversals, and BST operations.',
        metrics: ['Tree Traversal', 'BST Validation', 'LCA', 'Depth & Diameter'],
        complexity: 'Intermediate to Advanced',
        industry: 'Software Development'
      },
      {
        value: 'Graphs',
        label: '🔗 Graphs',
        description: 'Graph traversal, shortest path, and cycle detection algorithms.',
        metrics: ['DFS', 'BFS', 'Dijkstra', 'Topological Sort'],
        complexity: 'Advanced',
        industry: 'Software Development'
      },
      {
        value: 'Heaps',
        label: '📊 Heaps',
        description: 'Priority queue implementation and heap-based algorithms.',
        metrics: ['Min/Max Heap', 'Priority Queue', 'Kth Element', 'Median Finding'],
        complexity: 'Intermediate to Advanced',
        industry: 'Software Development'
      },
      {
        value: 'Queues',
        label: '📥 Queues',
        description: 'Queue implementations and variations including circular queues.',
        metrics: ['FIFO Operations', 'Circular Queue', 'Sliding Window', 'Deque'],
        complexity: 'Intermediate',
        industry: 'Software Development'
      },
      {
        value: 'LRU Cache',
        label: '💾 LRU Cache',
        description: 'Least Recently Used cache implementation with HashMap and doubly linked list.',
        metrics: ['Hash Map', 'Doubly Linked List', 'O(1) Operations', 'Cache Eviction'],
        complexity: 'Advanced',
        industry: 'Software Development'
      },
      {
        value: 'Rate Limiter',
        label: '⏱️ Rate Limiter',
        description: 'Rate limiting algorithms including token bucket and sliding window.',
        metrics: ['Token Bucket', 'Sliding Window', 'Fixed Window', 'Leaky Bucket'],
        complexity: 'Advanced',
        industry: 'Software Development'
      },
      {
        value: 'Spring Annotations Questions',
        label: '📝 Spring Annotations Questions',
        description: 'Comprehensive Spring annotation questions covering @Component, @Autowired, @Transactional, @Cacheable, AOP, and more.',
        metrics: ['Stereotype Annotations', 'DI Annotations', '@Transactional', 'AOP', 'Caching'],
        complexity: 'Medium',
        industry: 'Software Development'
      },
      {
        value: 'Design Problems',
        label: '🛠️ Design Problems',
        description: 'Common system design problems like HashMap, ArrayList, and thread-safe structures.',
        metrics: ['Data Structure Design', 'API Design', 'Thread Safety', 'Performance'],
        complexity: 'Advanced',
        industry: 'Software Development'
      },
      {
        value: 'Design Patterns Practice',
        label: '🎨 Design Patterns Practice',
        description: 'Hands-on implementation of classic GoF design patterns (Singleton, Factory, Observer, Strategy).',
        metrics: ['Creational Patterns', 'Behavioral Patterns', 'OOP', 'Code Architecture'],
        complexity: 'Intermediate to Advanced',
        industry: 'Software Development'
      }
    ],
    'Cloud Platforms': [
      {
        value: 'AWS',
        label: '☁️ Amazon Web Services',
        description: 'Comprehensive cloud computing platform offering over 200 services including EC2, S3, Lambda, RDS, and more. Industry-leading cloud infrastructure for compute, storage, databases, networking, and analytics.',
        metrics: ['EC2 Compute', 'S3 Storage', 'Lambda Serverless', 'RDS Databases'],
        complexity: 'Intermediate to Advanced',
        industry: 'Cloud Computing, DevOps, Enterprise'
      },
      {
        value: 'GCP',
        label: '☁️ Google Cloud Platform',
        description: 'Google\'s cloud platform built on the same infrastructure that powers Google products. Offers computing, data storage, data analytics, and machine learning services with strong Kubernetes and BigQuery capabilities.',
        metrics: ['Compute Engine', 'Cloud Storage', 'BigQuery', 'GKE'],
        complexity: 'Intermediate to Advanced',
        industry: 'Cloud Computing, Data Analytics, AI/ML'
      },
      {
        value: 'Azure',
        label: '☁️ Microsoft Azure',
        description: 'Microsoft\'s cloud platform with deep integration into Windows ecosystem and enterprise tools. Provides comprehensive services for compute, storage, networking, AI, IoT, and hybrid cloud solutions.',
        metrics: ['Virtual Machines', 'Azure SQL', 'AKS', 'Active Directory'],
        complexity: 'Intermediate to Advanced',
        industry: 'Cloud Computing, Enterprise, Hybrid Cloud'
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
        value: 'Oracle',
        label: '🔴 Oracle Database',
        description: 'Enterprise Oracle Database administration, PL/SQL programming, performance tuning, RAC clustering, and Oracle-specific features. Covers SQL optimization, partitioning, data warehousing, and high availability configurations.',
        metrics: ['PL/SQL', 'Performance Tuning', 'RAC & High Availability', 'Data Warehousing'],
        complexity: 'Intermediate to Advanced',
        industry: 'Enterprise Applications, Financial Services'
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
        value: 'Var/CVar 3',
        label: '💹 VaR/CVaR System 3',
        description: 'Comprehensive risk management system with real-time VaR/CVaR calculations, portfolio analytics, stress testing, backtesting framework, and regulatory reporting. Features advanced Monte Carlo simulations and marginal risk analysis.',
        metrics: ['Real-time VaR', 'Portfolio Analytics', 'Stress Testing', 'Backtesting'],
        complexity: 'Expert Level',
        industry: 'Risk Management, Investment Banking'
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
      },
      {
        value: 'Medi/Health',
        label: '🏥 Medi/Health',
        description: 'Healthcare management system with patient records, appointment scheduling, medical billing, and clinical workflows. Covers HIPAA compliance, HL7/FHIR standards, and healthcare interoperability.',
        metrics: ['Patient Management', 'HIPAA Compliance', 'HL7/FHIR', 'Clinical Workflows'],
        complexity: 'Intermediate to Advanced',
        industry: 'Healthcare, Medical Technology'
      },
      {
        value: 'Dark Pool Engine 3',
        label: '🌊 Dark Pool Engine 3',
        description: 'Advanced dark pool matching engine with sophisticated order matching algorithms, smart order routing, liquidity optimization, and minimal market impact execution. Features real-time order book management, IOI processing, and regulatory compliance.',
        metrics: ['Order Matching', 'Smart Routing', 'Liquidity Optimization', 'Market Impact Analysis'],
        complexity: 'Expert Level',
        industry: 'High-Frequency Trading, Investment Banking, Alternative Trading Systems'
      },
      {
        value: 'Monolith to Microservice',
        label: '🏗️ Monolith to Microservice',
        description: 'Large-scale migration project decomposing a monolithic VaR/CVaR system into microservices using the Strangler Fig Pattern. Successfully decommissioned legacy vendor system while maintaining zero downtime through incremental domain-driven decomposition.',
        metrics: ['Strangler Fig Pattern', 'Domain-Driven Design', 'Zero Downtime Migration', 'Vendor Decommission'],
        complexity: 'Expert Level',
        industry: 'Software Architecture, Enterprise Migration, Risk Management'
      },
      {
        value: 'Financial Banking',
        label: '💰 Financial & Banking Systems',
        description: 'Financial transaction processing, payment systems, banking domain concepts, settlement processes, regulatory compliance, and critical infrastructure applications in the financial services industry.',
        metrics: ['Payment Processing', 'Transaction Systems', 'Compliance', 'Financial Domain'],
        complexity: 'Intermediate to Advanced',
        industry: 'Financial Services, Banking, FinTech'
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

  // Handle search navigation
  const handleSearchNavigation = (navigation) => {
    if (navigation.type === 'component') {
      setSelectedOptionAndRef(navigation.value)
    } else if (navigation.type === 'category') {
      setExpandedGroup(navigation.value)
      setExpandedSubcategory(null)
      setFocusedItemIndex(-1)
    } else if (navigation.type === 'subcategory') {
      setExpandedGroup(navigation.category)
      setExpandedSubcategory(navigation.subcategory)
      setFocusedItemIndex(-1)
    }
  }

  // Handle programmatic focus for keyboard navigation
  useEffect(() => {
    if (isKeyboardUser && !selectedOption) {
      if (!expandedGroup) {
        // Focus on category button
        const categoryButton = categoryButtonRefs.current[focusedCategoryIndex];
        if (categoryButton) {
          categoryButton.focus();
        }
      } else if (expandedGroup && focusedItemIndex >= 0) {
        // Focus on item or subcategory button
        const buttonKey = `${expandedGroup}-${focusedItemIndex}`;
        const itemButton = itemButtonRefs.current[buttonKey];
        if (itemButton) {
          itemButton.focus();
        }
      }
    }
  }, [focusedCategoryIndex, focusedItemIndex, expandedGroup, expandedSubcategory, isKeyboardUser, selectedOption]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // CRITICAL: Allow Escape to always work, even if sign-in modal is open
      if (window.__SIGN_IN_MODAL_OPEN__ && e.key !== 'Escape') {
        console.log('Keyboard nav blocked: sign-in modal open');
        return;
      }

      // CRITICAL: Exit immediately if user is typing in any input field
      // Check BEFORE doing anything else
      const ae = document.activeElement
      if (ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA' || ae.tagName === 'SELECT')) {
        // Allow Escape to close modals even if typing
        if (e.key !== 'Escape') {
          console.log('Keyboard nav blocked: typing in input field');
          return // Don't handle keyboard nav when user is typing (except Escape)
        }
      }

      // If event originated within the top menubar or its buttons, let local handlers manage it
      const inMenuBar = (e.target && e.target.getAttribute && (e.target.getAttribute('role') === 'menuitem' || e.target.getAttribute('role') === 'menubar'))
        || (e.target && e.target.closest && e.target.closest('[role="menubar"]'))
      if (inMenuBar && e.key !== 'Escape') {
        return
      }
      
      console.log('Keyboard event:', e.key, 'selectedOption:', selectedOption, 'expandedGroup:', expandedGroup);

      // Global shortcuts that work everywhere
      if (SHORTCUTS.HELP.includes(e.key)) {
        e.preventDefault();
        setHelpDialogTrigger(document.activeElement);
        setShowKeyboardHelp(true);
        AriaUtils.announce('Keyboard shortcuts dialog opened');
        return;
      }

      // Global search shortcut (Ctrl+K or Cmd+K)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowGlobalSearch(true);
        AriaUtils.announce('Global search opened');
        return;
      }

      // Keyboard navigation guide (? key)
      if (e.key === '?' && !e.shiftKey) {
        e.preventDefault();
        setShowKeyboardGuide(prev => !prev);
        AriaUtils.announce(showKeyboardGuide ? 'Keyboard guide closed' : 'Keyboard navigation guide opened');
        return;
      }

      // Global Escape key handler: close only the topmost open modal
      if (e.key === 'Escape') {
        const closeTopModal = () => {
          const closers = [
            [showKeyboardHelp, setShowKeyboardHelp],
            [showGlobalSearch, setShowGlobalSearch],
            [showKeyboardGuide, setShowKeyboardGuide],
            [showStudyGuideModal, setShowStudyGuideModal],
            [showFeedbackModal, setShowFeedbackModal],
            [showDesignPatternsModal, setShowDesignPatternsModal],
            [showMicroservicePatternsModal, setShowMicroservicePatternsModal],
            [showClassModal, setShowClassModal],
            [showSystemDesignModal, setShowSystemDesignModal],
            [showModuleModal, setShowModuleModal],
            [showFunctionModal, setShowFunctionModal],
            [showInterfaceModal, setShowInterfaceModal],
            [showSQLModal, setShowSQLModal],
            [showNoSQLModal, setShowNoSQLModal],
            [showOracleModal, setShowOracleModal],
            [showORMModal, setShowORMModal],
            [showRedisModal, setShowRedisModal],
            [showSpringModal, setShowSpringModal],
            [showSpringBootModal, setShowSpringBootModal],
            [showRESTAPIModal, setShowRESTAPIModal],
            [showDeploymentModal, setShowDeploymentModal],
            [showDockerModal, setShowDockerModal],
            [showKubernetesModal, setShowKubernetesModal],
            [showTestingModal, setShowTestingModal],
            [showCICDModal, setShowCICDModal],
            [showAgileScrumModal, setShowAgileScrumModal],
            [showProductionSupportModal, setShowProductionSupportModal],
            [showTeamCityModal, setShowTeamCityModal],
            [showJenkinsModal, setShowJenkinsModal],
            [showPrometheusModal, setShowPrometheusModal],
            [showGrafanaModal, setShowGrafanaModal],
            [showSecurityOWASPModal, setShowSecurityOWASPModal],
            [showKafkaModal, setShowKafkaModal],
            [showApacheFlinkModal, setShowApacheFlinkModal],
            [showSolaceModal, setShowSolaceModal],
            [showRabbitMQModal, setShowRabbitMQModal],
            [showAWSModal, setShowAWSModal],
            [showGCPModal, setShowGCPModal],
            [showAzureModal, setShowAzureModal],
            [showArraysModal, setShowArraysModal],
            [showHashTablesModal, setShowHashTablesModal],
            [showStacksModal, setShowStacksModal],
            [showQueuesModal, setShowQueuesModal],
            [showTreesModal, setShowTreesModal],
            [showBinaryTreesModal, setShowBinaryTreesModal],
            [showBinarySearchTreesModal, setShowBinarySearchTreesModal],
            [showGraphsModal, setShowGraphsModal],
            [showHeapsModal, setShowHeapsModal],
            [showUnionFindModal, setShowUnionFindModal],
            [showTrieModal, setShowTrieModal],
            [showLinkedListsModal, setShowLinkedListsModal],
            [showSortingModal, setShowSortingModal],
            [showBinarySearchModal, setShowBinarySearchModal],
            [showRecursionModal, setShowRecursionModal],
            [showDynamicProgrammingModal, setShowDynamicProgrammingModal],
            [showSearchingModal, setShowSearchingModal],
            [showGreedyAlgorithmsModal, setShowGreedyAlgorithmsModal],
            [showFamousAlgorithmsModal, setShowFamousAlgorithmsModal],
            [showStreamsModal, setShowStreamsModal],
            [showStreamsAdvancedModal, setShowStreamsAdvancedModal],
            [showLambdasModal, setShowLambdasModal],
            [showLambdasAdvancedModal, setShowLambdasAdvancedModal],
            [showFunctionalInterfacesModal, setShowFunctionalInterfacesModal],
            [showCollectionsFrameworkModal, setShowCollectionsFrameworkModal],
            [showConcurrencyModal, setShowConcurrencyModal],
            [showMultithreadingModal, setShowMultithreadingModal],
            [showObjectOrientedProgrammingModal, setShowObjectOrientedProgrammingModal],
            [showExceptionHandlingModal, setShowExceptionHandlingModal],
            [showFileIOModal, setShowFileIOModal],
            [showJVMInternalsModal, setShowJVMInternalsModal],
            [showMemoryManagementModal, setShowMemoryManagementModal],
            [showDataStructuresModal, setShowDataStructuresModal],
            [showStringsModal, setShowStringsModal],
            [showGenericsModal, setShowGenericsModal],
            [showDesignPatternsPracticeModal, setShowDesignPatternsPracticeModal],
            [showLRUCacheModal, setShowLRUCacheModal],
            [showRateLimiterModal, setShowRateLimiterModal],
            [showDesignProblemsModal, setShowDesignProblemsModal],
            [showHibernateModal, setShowHibernateModal],
            [showActuatorModal, setShowActuatorModal],
            [showGRPCModal, setShowGRPCModal],
            [showSOAPModal, setShowSOAPModal],
            [showReactModal, setShowReactModal],
            [showJavaQuestionsModal, setShowJavaQuestionsModal],
            [showCoreJavaQuestionsModal, setShowCoreJavaQuestionsModal],
            [showJava8QuestionsModal, setShowJava8QuestionsModal],
            [showJava11QuestionsModal, setShowJava11QuestionsModal],
            [showJava15QuestionsModal, setShowJava15QuestionsModal],
            [showJava21QuestionsModal, setShowJava21QuestionsModal],
            [showJava24QuestionsModal, setShowJava24QuestionsModal],
            [showSQLQuestionsModal, setShowSQLQuestionsModal],
            [showHibernateQuestionsModal, setShowHibernateQuestionsModal],
            [showKafkaQuestionsModal, setShowKafkaQuestionsModal],
            [showRabbitMQQuestionsModal, setShowRabbitMQQuestionsModal],
            [showSolaceQuestionsModal, setShowSolaceQuestionsModal],
            [showRestAPIQuestionsModal, setShowRestAPIQuestionsModal],
            [showJenkinsQuestionsModal, setShowJenkinsQuestionsModal],
            [showTeamCityQuestionsModal, setShowTeamCityQuestionsModal],
            [showPrometheusQuestionsModal, setShowPrometheusQuestionsModal],
            [showGrafanaQuestionsModal, setShowGrafanaQuestionsModal],
            [showZipkinQuestionsModal, setShowZipkinQuestionsModal],
            [showActuatorQuestionsModal, setShowActuatorQuestionsModal],
            [showSpringCoreQuestionsModal, setShowSpringCoreQuestionsModal],
            [showSpringBootQuestionsModal, setShowSpringBootQuestionsModal],
            [showSpringSecurityQuestionsModal, setShowSpringSecurityQuestionsModal],
            [showSpringDataJPAQuestionsModal, setShowSpringDataJPAQuestionsModal],
            [showSpringAnnotationsQuestionsModal, setShowSpringAnnotationsQuestionsModal],
          ];
          // Close the last (topmost) open modal
          for (let i = closers.length - 1; i >= 0; i--) {
            if (closers[i][0]) {
              closers[i][1](false);
              return true;
            }
          }
          return false;
        };

        if (closeTopModal()) {
          e.preventDefault();
          AriaUtils.announce('Modal closed');
          return;
        }
      }
      // Main menu shortcut
      if (SHORTCUTS.MAIN_MENU.includes(e.key) && selectedOptionRef.current) {
        e.preventDefault();
        setSelectedOptionAndRef('');
        AriaUtils.announce('Returned to main menu');
        return;
      }

      const categoryNames = Object.keys(categoryGroups)

      // If viewing a component, only let Escape through to go back (handled by component)
      if (selectedOptionRef.current) {
        // Don't handle anything - let component handle all keys
        return
      }

      if (!expandedGroup) {
        // Navigate between category buttons
        if (e.key === 'ArrowRight') {
          e.preventDefault()
          const newIndex = (focusedCategoryIndex + 1) % categoryNames.length;
          setFocusedCategoryIndex(newIndex);
          AriaUtils.announce(`${categoryNames[newIndex]} category`);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault()
          const newIndex = (focusedCategoryIndex - 1 + categoryNames.length) % categoryNames.length;
          setFocusedCategoryIndex(newIndex);
          AriaUtils.announce(`${categoryNames[newIndex]} category`);
        } else if (e.key === 'ArrowDown') {
          // Down arrow expands the focused category and focuses first item
          e.preventDefault()
          const categoryName = categoryNames[focusedCategoryIndex]
          setExpandedGroup(categoryName)
          setFocusedItemIndex(0)
          const categoryData = categoryGroups[categoryName]
          const itemCount = categoryData.hasSubcategories
            ? Object.keys(categoryData.subcategories).length
            : categoryData.items.length
          const itemType = categoryData.hasSubcategories ? 'subcategories' : 'items'
          AriaUtils.announce(`${categoryName} category expanded, ${itemCount} ${itemType} available`);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          const newIndex = (focusedCategoryIndex - 1 + categoryNames.length) % categoryNames.length;
          setFocusedCategoryIndex(newIndex);
          AriaUtils.announce(`${categoryNames[newIndex]} category`);
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          const categoryName = categoryNames[focusedCategoryIndex]
          // Special case: Practice should open its page
          if (categoryName === 'Practice') {
            setSelectedOptionAndRef(categoryName)
            setExpandedGroup(null)
            setExpandedSubcategory(null)
            AriaUtils.announce(`Opening ${categoryName} page`);
          } else {
            const isExpanding = expandedGroup !== categoryName;
            setExpandedGroup(isExpanding ? categoryName : null)
            setFocusedItemIndex(isExpanding ? 0 : -1)
            if (isExpanding) {
              const categoryData = categoryGroups[categoryName]
              const itemCount = categoryData.hasSubcategories
                ? Object.keys(categoryData.subcategories).length
                : categoryData.items.length
              const itemType = categoryData.hasSubcategories ? 'subcategories' : 'items'
              AriaUtils.announce(`${categoryName} category expanded, ${itemCount} ${itemType} available`);
            } else {
              AriaUtils.announce(`${categoryName} category collapsed`);
            }
          }
        }
      } else {
        // Navigate between expanded items (flattened; no subcategory navigation)
        const categoryData = categoryGroups[expandedGroup]
        const items = categoryData.hasSubcategories
          ? Object.values(categoryData.subcategories).flatMap(s => s.items)
          : categoryData.items

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault()
          setFocusedItemIndex((prev) => (prev + 1) % items.length)
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault()
          setFocusedItemIndex((prev) => (prev - 1 + items.length) % items.length)
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          // If on first item, go back to category buttons
          if (focusedItemIndex <= 0) {
            setExpandedGroup(null)
            setFocusedItemIndex(-1)
          } else {
            setFocusedItemIndex((prev) => prev - 1)
          }
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          if (focusedItemIndex >= 0) {
            // Selecting an item
            const itemValue = items[focusedItemIndex]
            const buttonKey = `${expandedGroup}-${focusedItemIndex}`;
            const triggerElement = itemButtonRefs.current[buttonKey];
            setSelectedOptionAndRef(itemValue, triggerElement)
          }
        } else if (e.key === 'Escape') {
          e.preventDefault()
          // Close the expanded group
          setExpandedGroup(null)
          setFocusedItemIndex(-1)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    expandedGroup,
    expandedSubcategory,
    focusedCategoryIndex,
    focusedItemIndex,
    showKeyboardHelp,
    showGlobalSearch,
    showKeyboardGuide,
    showStudyGuideModal,
    showFeedbackModal,
    showDesignPatternsModal,
    showMicroservicePatternsModal,
    showClassModal,
    showSystemDesignModal,
    showModuleModal,
    showFunctionModal,
    showInterfaceModal,
    showSQLModal,
    showNoSQLModal,
    showOracleModal,
    showORMModal,
    showRedisModal,
    showSpringModal,
    showSpringBootModal,
    showRESTAPIModal,
    showDeploymentModal,
    showDockerModal,
    showKubernetesModal,
    showTestingModal,
    showCICDModal,
    showAgileScrumModal,
    showProductionSupportModal,
    showTeamCityModal,
    showJenkinsModal,
    showPrometheusModal,
    showGrafanaModal,
    showSecurityOWASPModal,
    showKafkaModal,
    showApacheFlinkModal,
    showSolaceModal,
    showRabbitMQModal,
    showAWSModal,
    showGCPModal,
    showAzureModal,
    showArraysModal,
    showHashTablesModal,
    showStacksModal,
    showQueuesModal,
    showTreesModal,
    showBinaryTreesModal,
    showBinarySearchTreesModal,
    showGraphsModal,
    showHeapsModal,
    showUnionFindModal,
    showTrieModal,
    showLinkedListsModal,
    showSortingModal,
    showBinarySearchModal,
    showRecursionModal,
    showDynamicProgrammingModal,
    showSearchingModal,
    showGreedyAlgorithmsModal,
    showFamousAlgorithmsModal,
    showStreamsModal,
    showStreamsAdvancedModal,
    showLambdasModal,
    showLambdasAdvancedModal,
    showFunctionalInterfacesModal,
    showCollectionsFrameworkModal,
    showConcurrencyModal,
    showMultithreadingModal,
    showObjectOrientedProgrammingModal,
    showExceptionHandlingModal,
    showFileIOModal,
    showJVMInternalsModal,
    showMemoryManagementModal,
    showDataStructuresModal,
    showStringsModal,
    showGenericsModal,
    showDesignPatternsPracticeModal,
    showLRUCacheModal,
    showRateLimiterModal,
    showDesignProblemsModal,
    showHibernateModal,
    showActuatorModal,
    showGRPCModal,
    showSOAPModal,
    showReactModal,
    showJavaQuestionsModal,
    showCoreJavaQuestionsModal,
    showJava8QuestionsModal,
    showJava11QuestionsModal,
    showJava15QuestionsModal,
    showJava21QuestionsModal,
    showJava24QuestionsModal,
    showSQLQuestionsModal,
    showHibernateQuestionsModal,
    showKafkaQuestionsModal,
    showRabbitMQQuestionsModal,
    showSolaceQuestionsModal,
    showRestAPIQuestionsModal,
    showJenkinsQuestionsModal,
    showTeamCityQuestionsModal,
    showPrometheusQuestionsModal,
    showGrafanaQuestionsModal,
    showZipkinQuestionsModal,
    showActuatorQuestionsModal,
    showSpringCoreQuestionsModal,
    showSpringBootQuestionsModal,
    showSpringSecurityQuestionsModal,
    showSpringDataJPAQuestionsModal,
    showSpringAnnotationsQuestionsModal
  ]);

  // Component rendering logic
  const renderSelectedComponent = () => {
    if (selectedOption === 'Java') {
      return <Java
        onBack={() => setSelectedOptionAndRef('')}
        onSelectItem={(item) => {
          // Open the appropriate Java version component
          setSelectedOptionAndRef(item)
        }}
      />
    }
    if (selectedOption === 'Python') {
      return <Python
        onBack={() => setSelectedOptionAndRef('')}
        onSelectItem={(item) => {
          setSelectedOptionAndRef(item)
        }}
      />
    }
    // Python topic routes
    if (selectedOption === 'Core Python') {
      return <CorePython onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'Python OOP') {
      return <PythonOOP onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'Index Slicing') {
      return <IndexSlicing onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'Bitwise Operations') {
      return <BitwiseOperations onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'List Comprehension') {
      return <ListComprehension onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'Lambda') {
      return <LambdaFunctions onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'Bisect Functions') {
      return <BisectFunctions onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'Set Operations') {
      return <SetOperations onBack={() => setSelectedOptionAndRef('Practice')} />
    }
    if (selectedOption === 'Map Operations') {
      return <MapOperations onBack={() => setSelectedOptionAndRef('Practice')} />
    }
    if (selectedOption === 'Python Advanced') {
      return <PythonAdvanced onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'Data Science') {
      return <PythonTopicPlaceholder topicName="Data Science" onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'Machine Learning') {
      return <PythonTopicPlaceholder topicName="Machine Learning" onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'Web Frameworks') {
      return <PythonTopicPlaceholder topicName="Web Frameworks" onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'Async Python') {
      return <PythonTopicPlaceholder topicName="Async Python" onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'Python Set Operations') {
      return <PythonSetOperations onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'Python Dict Operations') {
      return <PythonDictOperations onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'Python Tuples') {
      return <PythonTuples onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'Python Map Functions') {
      return <PythonMapFunctions onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'Python String Methods') {
      return <PythonStringMethods onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'Python Heaps') {
      return <PythonHeaps onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'Python Pitfalls') {
      return <PythonPitfalls onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'Python Regex') {
      return <PythonRegex onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'Itertools') {
      return <Itertools onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'Collections Module') {
      return <CollectionsModule onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'Sorting Functions') {
      return <SortingFunctions onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'LeetCode Patterns') {
      return <LeetCodePatterns onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'Sorting Algorithms') {
      return <SortingAlgorithms onBack={() => setSelectedOptionAndRef('Python')} />
    }
    if (selectedOption === 'Event Driven Architecture') {
      setShowEventDrivenArchitectureModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Domain Driven Design') {
      setShowDomainDrivenDesignModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Design') {
      return <Design
        onBack={() => setSelectedOptionAndRef('')}
        onSelectItem={(item) => {
          // Open the appropriate design topic
          setSelectedOptionAndRef(item)
        }}
      />
    }
    if (selectedOption === 'Databases') {
      return <Databases
        onBack={() => setSelectedOptionAndRef('')}
        onSelectItem={(item) => {
          // Open the appropriate database topic
          setSelectedOptionAndRef(item)
        }}
      />
    }
    if (selectedOption === 'My Projects') {
      return <MyProjects
        onBack={() => setSelectedOptionAndRef('')}
        onSelectItem={(item) => {
          // Open the appropriate project
          setSelectedOptionAndRef(item)
        }}
      />
    }
    if (selectedOption === 'Frameworks') {
      return <Frameworks
        onBack={() => setSelectedOptionAndRef('')}
        onSelectItem={(item) => {
          // Open the appropriate framework topic
          setSelectedOptionAndRef(item)
        }}
      />
    }
    if (selectedOption === 'DevOps') {
      return <DevOpsPage
        onBack={() => setSelectedOptionAndRef('')}
        onSelectItem={(item) => {
          // Open the appropriate DevOps topic
          setSelectedOptionAndRef(item)
        }}
      />
    }
    if (selectedOption === 'Cloud') {
      return <Cloud
        onBack={() => setSelectedOptionAndRef('')}
        onSelectItem={(item) => {
          // Open the appropriate cloud topic
          setSelectedOptionAndRef(item)
        }}
      />
    }
    if (selectedOption === 'Var/CVar') {
      return (
        <div ref={componentContainerRef}>
          <TechnicalDetails onBack={() => setSelectedOptionAndRef('My Projects')} />
        </div>
      )
    }
    if (selectedOption === 'Var/CVar - Advanced') {
      return (
        <div ref={componentContainerRef}>
          <TechnicalDetailsAdvanced onBack={() => setSelectedOptionAndRef('My Projects')} />
        </div>
      )
    }
    if (selectedOption === 'Var/CVar 3') {
      return (
        <div ref={componentContainerRef}>
          <VarCvar3 onBack={() => setSelectedOptionAndRef('My Projects')} />
        </div>
      )
    }
    if (selectedOption === 'Dark Pool Matching Engine') {
      return (
        <div ref={componentContainerRef}>
          <DarkPoolMatchingEngine onBack={() => setSelectedOptionAndRef('My Projects')} />
        </div>
      )
    }
    if (selectedOption === 'Dark Pool Matching Engine - Basic') {
      return (
        <div ref={componentContainerRef}>
          <DarkPoolMatchingEngineBasic onBack={() => setSelectedOptionAndRef('My Projects')} />
        </div>
      )
    }
    if (selectedOption === 'Medi/Health') {
      return (
        <div ref={componentContainerRef}>
          <MediHealth onBack={() => setSelectedOptionAndRef('My Projects')} />
        </div>
      )
    }
    if (selectedOption === 'Kafka') {
      setShowKafkaModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Apache Flink') {
      setShowApacheFlinkModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Core Java') {
      const navCallbacks = createLearningNavigationCallbacks('Core Java')
      return <CoreJava onBack={() => setSelectedOptionAndRef('')} {...navCallbacks} />
    }
    if (selectedOption === 'Function') {
      setShowFunctionModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Java 11') {
      const navCallbacks = createLearningNavigationCallbacks('Java 11')
      return <Java11 onBack={() => setSelectedOptionAndRef('')} {...navCallbacks} />
    }
    if (selectedOption === 'Java 8') {
      const navCallbacks = createLearningNavigationCallbacks('Java 8')
      return <Java8 onBack={() => setSelectedOptionAndRef('')} {...navCallbacks} />
    }
    if (selectedOption === 'Java 15') {
      const navCallbacks = createLearningNavigationCallbacks('Java 15')
      return <Java15 onBack={() => setSelectedOptionAndRef('')} {...navCallbacks} />
    }
    if (selectedOption === 'Java 21') {
      const navCallbacks = createLearningNavigationCallbacks('Java 21')
      return <Java21 onBack={() => setSelectedOptionAndRef('')} {...navCallbacks} />
    }
    if (selectedOption === 'Java 24') {
      const navCallbacks = createLearningNavigationCallbacks('Java 24')
      return <Java24 onBack={() => setSelectedOptionAndRef('')} {...navCallbacks} />
    }
    if (selectedOption === 'Design Patterns') {
      setShowDesignPatternsModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Dependency Injection') {
      const navCallbacks = createLearningNavigationCallbacks('Dependency Injection')
      return <DependencyInjection onBack={() => setSelectedOptionAndRef('')} {...navCallbacks} />
    }
    if (selectedOption === 'Spring') {
      setShowSpringModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Spring Boot') {
      setShowSpringBootModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'SQL') {
      setShowSQLModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'NoSQL') {
      setShowNoSQLModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Oracle') {
      setShowOracleModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'ORM') {
      setShowORMModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Redis') {
      setShowRedisModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Module') {
      setShowModuleModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Microservice Design Patterns') {
      setShowMicroservicePatternsModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Class') {
      setShowClassModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Interface') {
      setShowInterfaceModal(true)
      setSelectedOptionAndRef('')
      return null
    }

    if (selectedOption === 'REST API') {
      setShowRESTAPIModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Hibernate') {
      setShowHibernateModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Actuator') {
      setShowActuatorModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'gRPC') {
      setShowGRPCModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'SOAP') {
      setShowSOAPModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'React') {
      setShowReactModal(true)
      setSelectedOptionAndRef('')
      return null
    }

    if (selectedOption === 'JWT') {
      return <JWT onBack={() => setSelectedOptionAndRef('DevOps')} {...createDevOpsNavigationCallbacks('JWT')} />
    }
    if (selectedOption === 'OAuth') {
      return <OAuth onBack={() => setSelectedOptionAndRef('DevOps')} {...createDevOpsNavigationCallbacks('OAuth')} />
    }
    if (selectedOption === 'OAuth2') {
      return <OAuth2 onBack={() => setSelectedOptionAndRef('DevOps')} {...createDevOpsNavigationCallbacks('OAuth2')} />
    }
    if (selectedOption === 'System Design') {
      setShowSystemDesignModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Financial Banking') {
      return <FinancialBanking onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Credit Card Portal') {
      return <CreditCardPortal onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Credit Card Portal 2') {
      return <CreditCardPortal2 onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Credit Card Portal 3') {
      return <CreditCardPortal3 onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Virtual Numbers') {
      return <VirtualNumbers onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Ride Share') {
      return <RideShare onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Google Docs') {
      return <GoogleDocs onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'YouTube') {
      return <YouTube onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Newsfeed System') {
      return <Newsfeed onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'TinyURL') {
      return <TinyURL onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'WhatsApp') {
      return <WhatsApp onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Type Ahead System') {
      return <TypeAhead onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Instagram') {
      return <Instagram onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Netflix') {
      return <Netflix onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Twitter') {
      return <Twitter onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Amazon') {
      return <Amazon onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Zoom') {
      return <Zoom onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Dropbox') {
      return <Dropbox onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Notification System') {
      return <NotificationSystem onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Rate Limiter') {
      return <RateLimiterDesign onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Food Delivery') {
      return <FoodDelivery onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Mobile Weather App') {
      return <MobileWeatherApp onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Apartment Alarm System') {
      return <ApartmentAlarmSystem onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    // System Design Concepts
    if (selectedOption === 'Load Balancing') {
      return <LoadBalancing onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Caching Strategies') {
      return <CachingStrategies onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Database Sharding') {
      return <DatabaseSharding onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'CAP Theorem') {
      return <CAPTheorem onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Consistency Patterns') {
      return <ConsistencyPatterns onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'API Design') {
      return <APIDesign onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Message Queues') {
      return <MessageQueues onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'CDN') {
      return <CDN onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Database Replication') {
      return <DatabaseReplication onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Scaling') {
      return <Scaling onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Proxies') {
      return <Proxies onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Data Partitioning') {
      return <DataPartitioning onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'SQL vs NoSQL') {
      return <SQLvsNoSQL onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Consistent Hashing') {
      return <ConsistentHashing onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'WebSockets') {
      return <WebSockets onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Blob Storage') {
      return <BlobStorage onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Microservices') {
      return <Microservices onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Event-Driven') {
      return <EventDriven onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Solace') {
      setShowSolaceModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'RabbitMQ') {
      setShowRabbitMQModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'MuleSoft') {
      setShowMuleSoftModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Dark Pool Engine 3') {
      return <DarkPoolEngine3 onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'Monolith to Microservice') {
      return <MonolithToMicroservice onBack={() => setSelectedOptionAndRef('My Projects')} />
    }
    if (selectedOption === 'AWS') {
      setShowAWSModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'GCP') {
      setShowGCPModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Azure') {
      setShowAzureModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Arrays') {
      setShowArraysModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Hash Tables') {
      setShowHashTablesModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Strings') {
      setShowStringsModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Generics') {
      setShowGenericsModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Linked Lists') {
      setShowLinkedListsModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Stacks') {
      setShowStacksModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Sorting') {
      setShowSortingModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Binary Search') {
      setShowBinarySearchModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Recursion') {
      setShowRecursionModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Collections Framework') {
      setShowCollectionsFrameworkModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Data Structures') {
      setShowDataStructuresModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Object-Oriented Programming') {
      setShowObjectOrientedProgrammingModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Concurrency') {
      setShowConcurrencyModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Multithreading') {
      setShowMultithreadingModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Exception Handling') {
      setShowExceptionHandlingModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'File I/O') {
      setShowFileIOModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'JVM Internals') {
      setShowJVMInternalsModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Memory Management') {
      setShowMemoryManagementModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Streams') {
      setShowStreamsModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Streams Advanced') {
      setShowStreamsAdvancedModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Lambdas') {
      setShowLambdasModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Lambdas Advanced') {
      setShowLambdasAdvancedModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Functional Interfaces') {
      setShowFunctionalInterfacesModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Dynamic Programming') {
      setShowDynamicProgrammingModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Dynamic Programming Patterns') {
      console.log('✅ Navigating to Dynamic Programming Patterns')
      return <DynamicProgrammingPatterns onBack={() => setSelectedOptionAndRef('Practice')} />
    }
    console.log('❌ Did not match Dynamic Programming Patterns, selectedOption:', selectedOption)
    if (selectedOption === 'Trees') {
      setShowTreesModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Graphs') {
      setShowGraphsModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Heaps') {
      setShowHeapsModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Queues') {
      setShowQueuesModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'LRU Cache') {
      setShowLRUCacheModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Rate Limiter') {
      setShowRateLimiterModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Design Problems') {
      setShowDesignProblemsModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Design Patterns Practice') {
      setShowDesignPatternsPracticeModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Practice') {
      return <Practice
        onBack={() => setSelectedOptionAndRef('')}
        onSelectItem={(item) => {
          // Open the appropriate modal based on the item name
          switch(item) {
            case 'Arrays': setShowArraysModal(true); break;
            case 'Hash Tables': setShowHashTablesModal(true); break;
            case 'Stacks': setShowStacksModal(true); break;
            case 'Queues': setShowQueuesModal(true); break;
            case 'Trees': setShowTreesModal(true); break;
            case 'Binary Trees': setShowBinaryTreesModal(true); break;
            case 'Binary Search Trees': setShowBinarySearchTreesModal(true); break;
            case 'Graphs': setShowGraphsModal(true); break;
            case 'Heaps': setShowHeapsModal(true); break;
            case 'Union Find': setShowUnionFindModal(true); break;
            case 'Trie': setShowTrieModal(true); break;
            case 'Linked Lists': setShowLinkedListsModal(true); break;
            case 'Sorting': setShowSortingModal(true); break;
            case 'Binary Search': setShowBinarySearchModal(true); break;
            case 'Recursion': setShowRecursionModal(true); break;
            case 'Dynamic Programming': setShowDynamicProgrammingModal(true); break;
            case 'Dynamic Programming Patterns': setSelectedOptionAndRef('Dynamic Programming Patterns'); break;
            case 'Sliding Window': setShowSlidingWindowModal(true); break;
            case 'Backtracking': setShowBacktrackingModal(true); break;
            case 'Intervals': setShowIntervalsModal(true); break;
            case 'Math & Geometry': setShowMathGeometryModal(true); break;
            case 'Advanced Graphs': setShowAdvancedGraphsModal(true); break;
            case 'Searching': setShowSearchingModal(true); break;
            case 'Greedy Algorithms': setShowGreedyAlgorithmsModal(true); break;
            case 'Famous Algorithms': setShowFamousAlgorithmsModal(true); break;
            case 'Streams': setShowStreamsModal(true); break;
            case 'Streams Advanced': setShowStreamsAdvancedModal(true); break;
            case 'Lambdas': setShowLambdasModal(true); break;
            case 'Lambdas Advanced': setShowLambdasAdvancedModal(true); break;
            case 'Functional Interfaces': setShowFunctionalInterfacesModal(true); break;
            case 'Collections Framework': setShowCollectionsFrameworkModal(true); break;
            case 'Concurrency': setShowConcurrencyModal(true); break;
            case 'Multithreading': setShowMultithreadingModal(true); break;
            case 'Object-Oriented Programming': setShowObjectOrientedProgrammingModal(true); break;
            case 'Exception Handling': setShowExceptionHandlingModal(true); break;
            case 'File I/O': setShowFileIOModal(true); break;
            case 'JVM Internals': setShowJVMInternalsModal(true); break;
            case 'Memory Management': setShowMemoryManagementModal(true); break;
            case 'Data Structures': setShowDataStructuresModal(true); break;
            case 'Strings': setShowStringsModal(true); break;
            case 'Generics': setShowGenericsModal(true); break;
            case 'Design Patterns Practice': setShowDesignPatternsPracticeModal(true); break;
            case 'LRU Cache': setShowLRUCacheModal(true); break;
            case 'Rate Limiter': setShowRateLimiterModal(true); break;
            case 'Design Problems': setShowDesignProblemsModal(true); break;
            default: break;
          }
        }}
      />
    }
    if (selectedOption === 'Questions') {
      return <Questions
        onBack={() => setSelectedOptionAndRef('')}
        onSelectItem={(item) => {
          // Open the appropriate modal based on the item name
          console.log('Questions item clicked:', item);
          switch(item) {
            case 'Java Questions': setShowJavaQuestionsModal(true); break;
            case 'Core Java Questions': setShowCoreJavaQuestionsModal(true); break;
            case 'Java 8 Questions': setShowJava8QuestionsModal(true); break;
            case 'Java 11 Questions': setShowJava11QuestionsModal(true); break;
            case 'Java 15 Questions': setShowJava15QuestionsModal(true); break;
            case 'Java 21 Questions': setShowJava21QuestionsModal(true); break;
            case 'Java 24 Questions': setShowJava24QuestionsModal(true); break;
            case 'SQL Questions': setShowSQLQuestionsModal(true); break;
            case 'Hibernate Questions': setShowHibernateQuestionsModal(true); break;
            case 'Kafka Questions': setShowKafkaQuestionsModal(true); break;
            case 'Apache Flink Questions': setShowApacheFlinkQuestionsModal(true); break;
            case 'RabbitMQ Questions': setShowRabbitMQQuestionsModal(true); break;
            case 'Solace Questions': setShowSolaceQuestionsModal(true); break;
            case 'REST API Questions': setShowRestAPIQuestionsModal(true); break;
            case 'Jenkins Questions': setShowJenkinsQuestionsModal(true); break;
            case 'TeamCity Questions': setShowTeamCityQuestionsModal(true); break;
            case 'Prometheus Questions': setShowPrometheusQuestionsModal(true); break;
            case 'Grafana Questions': setShowGrafanaQuestionsModal(true); break;
            case 'Zipkin Questions': setShowZipkinQuestionsModal(true); break;
            case 'Actuator Questions':
              console.log('Setting Actuator modal to true');
              setShowActuatorQuestionsModal(true);
              break;
            case 'Spring Core Questions': setShowSpringCoreQuestionsModal(true); break;
            case 'Spring Boot Questions': setShowSpringBootQuestionsModal(true); break;
            case 'Spring Security Questions': setShowSpringSecurityQuestionsModal(true); break;
            case 'Spring Data JPA Questions': setShowSpringDataJPAQuestionsModal(true); break;
            case 'Spring Annotations Questions': setShowSpringAnnotationsQuestionsModal(true); break;
            default:
              console.log('No match found for item:', item);
              break;
          }
        }}
      />
    }
    return null
  }

  return (
    <>
      {/* Google Analytics - Replace G-XXXXXXXXXX with your actual GA4 Measurement ID */}
      <GoogleAnalytics measurementId="G-XXXXXXXXXX" />

      {/* Skip link for keyboard navigation */}
      <a
        href="#main-content"
        className="skip-link"
        onFocus={() => setIsKeyboardUser(true)}
      >
        Skip to main content
      </a>

      {/* Keyboard shortcuts dialog */}
      <KeyboardShortcutsDialog
        isOpen={showKeyboardHelp}
        onClose={() => {
          setShowKeyboardHelp(false);
          setHelpDialogTrigger(null);
        }}
        triggerElement={helpDialogTrigger}
      />

      {/* Global Search */}
      <GlobalSearch
        isOpen={showGlobalSearch}
        onClose={() => setShowGlobalSearch(false)}
        onNavigate={handleSearchNavigation}
      />

      {/* Keyboard Navigation Guide */}
      <KeyboardGuide
        isOpen={showKeyboardGuide}
        onClose={() => setShowKeyboardGuide(false)}
      />

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <FeedbackModal onClose={() => setShowFeedbackModal(false)} />
      )}

      {/* Study Guide Modal */}
      <StudyGuideModal
        isOpen={showStudyGuideModal}
        onClose={() => setShowStudyGuideModal(false)}
      />

      {/* Design Patterns Modal */}
      {showDesignPatternsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowDesignPatternsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <DesignPatterns onBack={() => { setShowDesignPatternsModal(false); setSelectedOptionAndRef('Design'); }} {...createDesignNavigationCallbacks('DesignPatterns')} />
          </div>
        </div>
      )}

      {/* Microservice Patterns Modal */}
      {showMicroservicePatternsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowMicroservicePatternsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <MicroservicePatterns onBack={() => { setShowMicroservicePatternsModal(false); setSelectedOptionAndRef('Design'); }} {...createDesignNavigationCallbacks('MicroservicePatterns')} />
          </div>
        </div>
      )}

      {/* Event Driven Architecture Modal */}
      {showEventDrivenArchitectureModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowEventDrivenArchitectureModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <EventDrivenArchitecture onBack={() => { setShowEventDrivenArchitectureModal(false); setSelectedOptionAndRef('Design'); }} />
          </div>
        </div>
      )}

      {/* Domain Driven Design Modal */}
      {showDomainDrivenDesignModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowDomainDrivenDesignModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <DomainDrivenDesign onBack={() => { setShowDomainDrivenDesignModal(false); setSelectedOptionAndRef('Design'); }} />
          </div>
        </div>
      )}

      {/* Class Modal */}
      {showClassModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowClassModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Class onBack={() => { setShowClassModal(false); setSelectedOptionAndRef('Design'); }} {...createDesignNavigationCallbacks('Class')} />
          </div>
        </div>
      )}

      {/* System Design Modal */}
      {showSystemDesignModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowSystemDesignModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <SystemDesign onBack={() => { setShowSystemDesignModal(false); setSelectedOptionAndRef('Design'); }} {...createDesignNavigationCallbacks('SystemDesign')} />
          </div>
        </div>
      )}

      {/* Module Modal */}
      {showModuleModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowModuleModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Module onBack={() => { setShowModuleModal(false); setSelectedOptionAndRef('Design'); }} {...createDesignNavigationCallbacks('Module')} />
          </div>
        </div>
      )}

      {/* Function Modal */}
      {showFunctionModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowFunctionModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <FunctionalProgramming onBack={() => { setShowFunctionModal(false); setSelectedOptionAndRef('Design'); }} {...createDesignNavigationCallbacks('Function')} />
          </div>
        </div>
      )}

      {/* Interface Modal */}
      {showInterfaceModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowInterfaceModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Interface onBack={() => { setShowInterfaceModal(false); setSelectedOptionAndRef('Design'); }} {...createDesignNavigationCallbacks('Interface')} />
          </div>
        </div>
      )}

      {/* SQL Modal */}
      {showSQLModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowSQLModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <SQL onBack={() => setShowSQLModal(false)} {...createDatabaseNavigationCallbacks('SQL')} />
          </div>
        </div>
      )}

      {/* NoSQL Modal */}
      {showNoSQLModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowNoSQLModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <NoSQL onBack={() => setShowNoSQLModal(false)} {...createDatabaseNavigationCallbacks('NoSQL')} />
          </div>
        </div>
      )}

      {/* Oracle Modal */}
      {showOracleModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowOracleModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Oracle onBack={() => setShowOracleModal(false)} {...createDatabaseNavigationCallbacks('Oracle')} />
          </div>
        </div>
      )}

      {/* ORM Modal */}
      {showORMModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowORMModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <ORM onBack={() => setShowORMModal(false)} {...createDatabaseNavigationCallbacks('ORM')} />
          </div>
        </div>
      )}

      {/* Redis Modal */}
      {showRedisModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowRedisModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Redis onBack={() => setShowRedisModal(false)} {...createDatabaseNavigationCallbacks('Redis')} />
          </div>
        </div>
      )}

      {/* Spring Modal */}
      {showSpringModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowSpringModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Spring onBack={() => setShowSpringModal(false)} {...createFrameworksNavigationCallbacks('Spring')} />
          </div>
        </div>
      )}

      {/* Spring Boot Modal */}
      {showSpringBootModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowSpringBootModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <SpringBoot onBack={() => setShowSpringBootModal(false)} {...createFrameworksNavigationCallbacks('SpringBoot')} />
          </div>
        </div>
      )}

      {/* REST API Modal */}
      {showRESTAPIModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowRESTAPIModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <RestAPI onBack={() => setShowRESTAPIModal(false)} {...createFrameworksNavigationCallbacks('RestAPI')} />
          </div>
        </div>
      )}

      {/* Hibernate Modal */}
      {showHibernateModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowHibernateModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Hibernate onBack={() => setShowHibernateModal(false)} {...createFrameworksNavigationCallbacks('Hibernate')} />
          </div>
        </div>
      )}

      {/* Actuator Modal */}
      {showActuatorModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowActuatorModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Actuator onBack={() => setShowActuatorModal(false)} />
          </div>
        </div>
      )}

      {/* gRPC Modal */}
      {showGRPCModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowGRPCModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <GRPC onBack={() => setShowGRPCModal(false)} {...createFrameworksNavigationCallbacks('gRPC')} />
          </div>
        </div>
      )}

      {/* SOAP Modal */}
      {showSOAPModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowSOAPModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <SOAP onBack={() => setShowSOAPModal(false)} {...createFrameworksNavigationCallbacks('SOAP')} />
          </div>
        </div>
      )}

      {/* React Modal */}
      {showReactModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowReactModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <ReactFramework onBack={() => setShowReactModal(false)} {...createFrameworksNavigationCallbacks('React')} />
          </div>
        </div>
      )}

      {/* Deployment Modal */}
      {showDeploymentModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowDeploymentModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Deployment onBack={() => setShowDeploymentModal(false)} {...createDevOpsNavigationCallbacks('Deployment')} />
          </div>
        </div>
      )}

      {/* Docker Modal */}
      {showDockerModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowDockerModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Docker onBack={() => setShowDockerModal(false)} {...createDevOpsNavigationCallbacks('Docker')} />
          </div>
        </div>
      )}

      {/* Kubernetes Modal */}
      {showKubernetesModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowKubernetesModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Kubernetes onBack={() => setShowKubernetesModal(false)} {...createDevOpsNavigationCallbacks('Kubernetes')} />
          </div>
        </div>
      )}

      {/* Testing Modal */}
      {showTestingModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowTestingModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Testing onBack={() => setShowTestingModal(false)} {...createDevOpsNavigationCallbacks('Testing')} />
          </div>
        </div>
      )}

      {/* CI/CD Modal */}
      {showCICDModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowCICDModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <CICD onBack={() => setShowCICDModal(false)} {...createDevOpsNavigationCallbacks('CICD')} />
          </div>
        </div>
      )}

      {/* Agile Scrum Modal */}
      {showAgileScrumModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowAgileScrumModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <AgileScrum onBack={() => setShowAgileScrumModal(false)} {...createDevOpsNavigationCallbacks('AgileScrum')} />
          </div>
        </div>
      )}

      {/* Production Support Modal */}
      {showProductionSupportModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowProductionSupportModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <ProductionSupport onBack={() => setShowProductionSupportModal(false)} {...createDevOpsNavigationCallbacks('ProductionSupport')} />
          </div>
        </div>
      )}

      {/* TeamCity Modal */}
      {showTeamCityModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowTeamCityModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <TeamCity onBack={() => setShowTeamCityModal(false)} {...createDevOpsNavigationCallbacks('TeamCity')} />
          </div>
        </div>
      )}

      {/* Jenkins Modal */}
      {showJenkinsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowJenkinsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Jenkins onBack={() => setShowJenkinsModal(false)} {...createDevOpsNavigationCallbacks('Jenkins')} />
          </div>
        </div>
      )}

      {/* Prometheus Modal */}
      {showPrometheusModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowPrometheusModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Prometheus onBack={() => setShowPrometheusModal(false)} {...createDevOpsNavigationCallbacks('Prometheus')} />
          </div>
        </div>
      )}

      {/* Grafana Modal */}
      {showGrafanaModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowGrafanaModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Grafana onBack={() => setShowGrafanaModal(false)} {...createDevOpsNavigationCallbacks('Grafana')} />
          </div>
        </div>
      )}

      {/* Security OWASP Modal */}
      {showSecurityOWASPModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowSecurityOWASPModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <SecurityOWASP onBack={() => setShowSecurityOWASPModal(false)} {...createDevOpsNavigationCallbacks('SecurityOWASP')} />
          </div>
        </div>
      )}

      {/* Kafka Modal */}
      {showKafkaModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowKafkaModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <ApacheKafka onBack={() => setShowKafkaModal(false)} {...createDevOpsNavigationCallbacks('Kafka')} />
          </div>
        </div>
      )}

      {/* Apache Flink Modal */}
      {showApacheFlinkModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowApacheFlinkModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <ApacheFlink onBack={() => setShowApacheFlinkModal(false)} {...createDevOpsNavigationCallbacks('ApacheFlink')} />
          </div>
        </div>
      )}

      {/* Solace Modal */}
      {showSolaceModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowSolaceModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Solace onBack={() => setShowSolaceModal(false)} {...createDevOpsNavigationCallbacks('Solace')} />
          </div>
        </div>
      )}

      {/* RabbitMQ Modal */}
      {showRabbitMQModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowRabbitMQModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <RabbitMQ onBack={() => setShowRabbitMQModal(false)} {...createDevOpsNavigationCallbacks('RabbitMQ')} />
          </div>
        </div>
      )}

      {/* MuleSoft Modal */}
      {showMuleSoftModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowMuleSoftModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <MuleSoft onBack={() => setShowMuleSoftModal(false)} {...createDevOpsNavigationCallbacks('MuleSoft')} />
          </div>
        </div>
      )}

      {showAWSModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowAWSModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <AWS onBack={() => setShowAWSModal(false)} {...createCloudNavigationCallbacks('AWS')} />
          </div>
        </div>
      )}

      {showGCPModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowGCPModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <GCP onBack={() => setShowGCPModal(false)} {...createCloudNavigationCallbacks('GCP')} />
          </div>
        </div>
      )}

      {showAzureModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowAzureModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Azure onBack={() => setShowAzureModal(false)} {...createCloudNavigationCallbacks('Azure')} />
          </div>
        </div>
      )}

      {showArraysModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowArraysModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Arrays
              onBack={() => setShowArraysModal(false)}
              {...createNavigationCallbacks('Arrays')}
            />
          </div>
        </div>
      )}

      {showHashTablesModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowHashTablesModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <HashTables
              onBack={() => setShowHashTablesModal(false)}
              {...createNavigationCallbacks('Hash Tables')}
            />
          </div>
        </div>
      )}

      {showStacksModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowStacksModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Stacks
              onBack={() => setShowStacksModal(false)}
              {...createNavigationCallbacks('Stacks')}
            />
          </div>
        </div>
      )}

      {showQueuesModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowQueuesModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Queues
              onBack={() => setShowQueuesModal(false)}
              {...createNavigationCallbacks('Queues')}
            />
          </div>
        </div>
      )}

      {showTreesModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowTreesModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Trees
              onBack={() => setShowTreesModal(false)}
              {...createNavigationCallbacks('Trees')}
            />
          </div>
        </div>
      )}

      {showBinaryTreesModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowBinaryTreesModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <BinaryTrees
              onBack={() => setShowBinaryTreesModal(false)}
              {...createNavigationCallbacks('Binary Trees')}
            />
          </div>
        </div>
      )}

      {showBinarySearchTreesModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowBinarySearchTreesModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <BinarySearchTrees
              onBack={() => setShowBinarySearchTreesModal(false)}
              {...createNavigationCallbacks('Binary Search Trees')}
            />
          </div>
        </div>
      )}

      {showGraphsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowGraphsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Graphs
              onBack={() => setShowGraphsModal(false)}
              {...createNavigationCallbacks('Graphs')}
            />
          </div>
        </div>
      )}

      {showHeapsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowHeapsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Heaps
              onBack={() => setShowHeapsModal(false)}
              {...createNavigationCallbacks('Heaps')}
            />
          </div>
        </div>
      )}

      {showUnionFindModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowUnionFindModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <UnionFind
              onBack={() => setShowUnionFindModal(false)}
              {...createNavigationCallbacks('UnionFind')}
            />
          </div>
        </div>
      )}

      {showTrieModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowTrieModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Trie
              onBack={() => setShowTrieModal(false)}
              {...createNavigationCallbacks('Trie')}
            />
          </div>
        </div>
      )}

      {showLinkedListsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowLinkedListsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <LinkedLists
              onBack={() => setShowLinkedListsModal(false)}
              {...createNavigationCallbacks('Linked Lists')}
            />
          </div>
        </div>
      )}

      {showSortingModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowSortingModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Sorting
              onBack={() => setShowSortingModal(false)}
              {...createNavigationCallbacks('Sorting')}
            />
          </div>
        </div>
      )}

      {showBinarySearchModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowBinarySearchModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <BinarySearch
              onBack={() => setShowBinarySearchModal(false)}
              {...createNavigationCallbacks('Binary Search')}
            />
          </div>
        </div>
      )}

      {showRecursionModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowRecursionModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Recursion
              onBack={() => setShowRecursionModal(false)}
              {...createNavigationCallbacks('Recursion')}
            />
          </div>
        </div>
      )}

      {showDynamicProgrammingModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowDynamicProgrammingModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <DynamicProgramming
              onBack={() => setShowDynamicProgrammingModal(false)}
              {...createNavigationCallbacks('Dynamic Programming')}
            />
          </div>
        </div>
      )}

      {showSlidingWindowModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowSlidingWindowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <SlidingWindow
              onBack={() => setShowSlidingWindowModal(false)}
              {...createNavigationCallbacks('Sliding Window')}
            />
          </div>
        </div>
      )}

      {showBacktrackingModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowBacktrackingModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Backtracking
              onBack={() => setShowBacktrackingModal(false)}
              {...createNavigationCallbacks('Backtracking')}
            />
          </div>
        </div>
      )}

      {showIntervalsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowIntervalsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Intervals
              onBack={() => setShowIntervalsModal(false)}
              {...createNavigationCallbacks('Intervals')}
            />
          </div>
        </div>
      )}

      {showMathGeometryModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowMathGeometryModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <MathGeometry
              onBack={() => setShowMathGeometryModal(false)}
              {...createNavigationCallbacks('Math & Geometry')}
            />
          </div>
        </div>
      )}

      {showAdvancedGraphsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowAdvancedGraphsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <AdvancedGraphs
              onBack={() => setShowAdvancedGraphsModal(false)}
              {...createNavigationCallbacks('Advanced Graphs')}
            />
          </div>
        </div>
      )}

      {showSearchingModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowSearchingModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Searching
              onBack={() => setShowSearchingModal(false)}
              {...createNavigationCallbacks('Searching')}
            />
          </div>
        </div>
      )}

      {showGreedyAlgorithmsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowGreedyAlgorithmsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <GreedyAlgorithms
              onBack={() => setShowGreedyAlgorithmsModal(false)}
              {...createNavigationCallbacks('Greedy Algorithms')}
            />
          </div>
        </div>
      )}

      {showFamousAlgorithmsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowFamousAlgorithmsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <FamousAlgorithms
              onBack={() => setShowFamousAlgorithmsModal(false)}
              {...createNavigationCallbacks('Famous Algorithms')}
            />
          </div>
        </div>
      )}

      {showStreamsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowStreamsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Streams
              onBack={() => setShowStreamsModal(false)}
              {...createNavigationCallbacks('Streams')}
            />
          </div>
        </div>
      )}

      {showStreamsAdvancedModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowStreamsAdvancedModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <StreamsAdvanced
              onBack={() => setShowStreamsAdvancedModal(false)}
            />
          </div>
        </div>
      )}

      {showLambdasModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowLambdasModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Lambdas
              onBack={() => setShowLambdasModal(false)}
              {...createNavigationCallbacks('Lambdas')}
            />
          </div>
        </div>
      )}

      {showLambdasAdvancedModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowLambdasAdvancedModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <LambdasAdvanced
              onBack={() => setShowLambdasAdvancedModal(false)}
            />
          </div>
        </div>
      )}

      {showFunctionalInterfacesModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowFunctionalInterfacesModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <FunctionalInterfaces
              onBack={() => setShowFunctionalInterfacesModal(false)}
              {...createNavigationCallbacks('Functional Interfaces')}
            />
          </div>
        </div>
      )}

      {showCollectionsFrameworkModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowCollectionsFrameworkModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <CollectionsFramework
              onBack={() => setShowCollectionsFrameworkModal(false)}
              {...createNavigationCallbacks('Collections Framework')}
            />
          </div>
        </div>
      )}

      {showConcurrencyModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowConcurrencyModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Concurrency
              onBack={() => setShowConcurrencyModal(false)}
              {...createNavigationCallbacks('Concurrency')}
            />
          </div>
        </div>
      )}

      {showMultithreadingModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowMultithreadingModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Multithreading
              onBack={() => setShowMultithreadingModal(false)}
              {...createNavigationCallbacks('Multithreading')}
            />
          </div>
        </div>
      )}

      {showObjectOrientedProgrammingModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowObjectOrientedProgrammingModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <ObjectOrientedProgramming
              onBack={() => setShowObjectOrientedProgrammingModal(false)}
              {...createNavigationCallbacks('Object-Oriented Programming')}
            />
          </div>
        </div>
      )}

      {showExceptionHandlingModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowExceptionHandlingModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <ExceptionHandling
              onBack={() => setShowExceptionHandlingModal(false)}
              {...createNavigationCallbacks('Exception Handling')}
            />
          </div>
        </div>
      )}

      {showFileIOModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowFileIOModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <FileIO
              onBack={() => setShowFileIOModal(false)}
              {...createNavigationCallbacks('File I/O')}
            />
          </div>
        </div>
      )}

      {showJVMInternalsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowJVMInternalsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <JVMInternals
              onBack={() => setShowJVMInternalsModal(false)}
              {...createNavigationCallbacks('JVM Internals')}
            />
          </div>
        </div>
      )}

      {showMemoryManagementModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowMemoryManagementModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <MemoryManagement
              onBack={() => setShowMemoryManagementModal(false)}
              {...createNavigationCallbacks('Memory Management')}
            />
          </div>
        </div>
      )}

      {showDataStructuresModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowDataStructuresModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <DataStructures
              onBack={() => setShowDataStructuresModal(false)}
              {...createNavigationCallbacks('Data Structures')}
            />
          </div>
        </div>
      )}

      {showStringsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowStringsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Strings
              onBack={() => setShowStringsModal(false)}
              {...createNavigationCallbacks('Strings')}
            />
          </div>
        </div>
      )}

      {showGenericsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowGenericsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Generics
              onBack={() => setShowGenericsModal(false)}
              {...createNavigationCallbacks('Generics')}
            />
          </div>
        </div>
      )}

      {showDesignPatternsPracticeModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowDesignPatternsPracticeModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <DesignPatternsInteractive
              onBack={() => setShowDesignPatternsInteractiveModal(false)}
              {...createNavigationCallbacks('Design Patterns Practice')}
            />
          </div>
        </div>
      )}

      {showLRUCacheModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowLRUCacheModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <LRUCache
              onBack={() => setShowLRUCacheModal(false)}
              {...createNavigationCallbacks('LRU Cache')}
            />
          </div>
        </div>
      )}

      {showRateLimiterModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowRateLimiterModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <RateLimiter
              onBack={() => setShowRateLimiterModal(false)}
              {...createNavigationCallbacks('Rate Limiter')}
            />
          </div>
        </div>
      )}

      {showDesignProblemsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowDesignProblemsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <DesignProblems
              onBack={() => setShowDesignProblemsModal(false)}
              {...createNavigationCallbacks('Design Problems')}
            />
          </div>
        </div>
      )}


      {showJavaQuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowJavaQuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <JavaQuestions onBack={() => setShowJavaQuestionsModal(false)} />
          </div>
        </div>
      )}

      {showCoreJavaQuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowCoreJavaQuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <CoreJavaQuestions onBack={() => setShowCoreJavaQuestionsModal(false)} />
          </div>
        </div>
      )}

      {showJava8QuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowJava8QuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Java8Questions onBack={() => setShowJava8QuestionsModal(false)} />
          </div>
        </div>
      )}

      {showJava11QuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowJava11QuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Java11Questions onBack={() => setShowJava11QuestionsModal(false)} />
          </div>
        </div>
      )}

      {showJava15QuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowJava15QuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Java15Questions onBack={() => setShowJava15QuestionsModal(false)} />
          </div>
        </div>
      )}

      {showJava21QuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowJava21QuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Java21Questions onBack={() => setShowJava21QuestionsModal(false)} />
          </div>
        </div>
      )}

      {showJava24QuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowJava24QuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Java24Questions onBack={() => setShowJava24QuestionsModal(false)} />
          </div>
        </div>
      )}

      {showSQLQuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowSQLQuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <SQLQuestions onBack={() => setShowSQLQuestionsModal(false)} />
          </div>
        </div>
      )}

      {showHibernateQuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowHibernateQuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <HibernateQuestions onBack={() => setShowHibernateQuestionsModal(false)} />
          </div>
        </div>
      )}

      {showKafkaQuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowKafkaQuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <KafkaQuestions onBack={() => setShowKafkaQuestionsModal(false)} />
          </div>
        </div>
      )}

      {showApacheFlinkQuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowApacheFlinkQuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <ApacheFlinkQuestions onBack={() => setShowApacheFlinkQuestionsModal(false)} />
          </div>
        </div>
      )}

      {showRabbitMQQuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowRabbitMQQuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <RabbitMQQuestions onBack={() => setShowRabbitMQQuestionsModal(false)} />
          </div>
        </div>
      )}

      {showSolaceQuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowSolaceQuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <SolaceQuestions onBack={() => setShowSolaceQuestionsModal(false)} />
          </div>
        </div>
      )}

      {showRestAPIQuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowRestAPIQuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <RestAPIQuestions onBack={() => setShowRestAPIQuestionsModal(false)} />
          </div>
        </div>
      )}

      {showJenkinsQuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowJenkinsQuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <JenkinsQuestions onBack={() => setShowJenkinsQuestionsModal(false)} />
          </div>
        </div>
      )}

      {showTeamCityQuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowTeamCityQuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <TeamCityQuestions onBack={() => setShowTeamCityQuestionsModal(false)} />
          </div>
        </div>
      )}

      {showPrometheusQuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowPrometheusQuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <PrometheusQuestions onBack={() => setShowPrometheusQuestionsModal(false)} />
          </div>
        </div>
      )}

      {showGrafanaQuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowGrafanaQuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <GrafanaQuestions onBack={() => setShowGrafanaQuestionsModal(false)} />
          </div>
        </div>
      )}

      {showZipkinQuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowZipkinQuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <ZipkinQuestions onBack={() => setShowZipkinQuestionsModal(false)} />
          </div>
        </div>
      )}

{showActuatorQuestionsModal && (
        <>
          {console.log('Rendering Actuator Questions modal')}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000000,
              padding: '1rem',
              overflow: 'auto'
            }}
            onClick={() => setShowActuatorQuestionsModal(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                maxWidth: '95vw',
                width: '1400px',
                maxHeight: '95vh',
                overflow: 'auto',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                position: 'relative'
              }}
            >
              <ActuatorQuestions onBack={() => setShowActuatorQuestionsModal(false)} />
            </div>
          </div>
        </>
      )}

      {showSpringCoreQuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowSpringCoreQuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <SpringCoreQuestions onBack={() => setShowSpringCoreQuestionsModal(false)} />
          </div>
        </div>
      )}

      {showSpringAnnotationsQuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowSpringAnnotationsQuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <SpringAnnotationsQuestions onBack={() => setShowSpringAnnotationsQuestionsModal(false)} />
          </div>
        </div>
      )}

      {showSpringBootQuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowSpringBootQuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <SpringBootQuestions onBack={() => setShowSpringBootQuestionsModal(false)} />
          </div>
        </div>
      )}

      {showSpringSecurityQuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowSpringSecurityQuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <SpringSecurityQuestions onBack={() => setShowSpringSecurityQuestionsModal(false)} />
          </div>
        </div>
      )}

      {showSpringDataJPAQuestionsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000000,
            padding: '1rem',
            overflow: 'auto'
          }}
          onClick={() => setShowSpringDataJPAQuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <SpringDataJPAQuestions onBack={() => setShowSpringDataJPAQuestionsModal(false)} />
          </div>
        </div>
      )}

      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
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
        zIndex: 100001,
        transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '0.75rem'
        }}>
          {isKeyboardUser && (
            <div
              id="main-title"
              style={{
                margin: 0,
                fontSize: '0.85rem',
                color: '#6b7280',
                fontWeight: '500',
                textAlign: 'center',
                marginBottom: '0.5rem'
              }}
            >
              Press H for keyboard shortcuts
            </div>
          )}
        </div>

        {/* Navigation Row with Category Buttons and Utility Buttons */}
        <div
          role="menubar"
          aria-label="Category selection"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: expandedGroup ? '1rem' : '0'
          }}
        >
          {Object.entries(categoryGroups).map(([groupName, group], index) => (
            <button
              key={groupName}
              role="menuitem"
              title={group.description || `${groupName} category`}
              aria-label={`${groupName}: ${group.description}. ${group.hasSubcategories ? Object.keys(group.subcategories).length + ' subcategories' : (group.items?.length || 0) + ' items'}`}
              aria-expanded={expandedGroup === groupName}
              aria-haspopup="true"
              data-category-button
              data-category-index={index}
              ref={(el) => {
                if (el) {
                  categoryButtonRefs.current[index] = el;
                }
              }}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key !== 'Escape') e.stopPropagation();
                if (selectedOptionRef.current) return;
                const categoryNames = Object.keys(categoryGroups);
                if (!expandedGroup) {
                  if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    const newIndex = (focusedCategoryIndex + 1) % categoryNames.length;
                    setFocusedCategoryIndex(newIndex);
                    const btn = categoryButtonRefs.current[newIndex];
                    if (btn) btn.focus();
                  } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const newIndex = (focusedCategoryIndex - 1 + categoryNames.length) % categoryNames.length;
                    setFocusedCategoryIndex(newIndex);
                    const btn = categoryButtonRefs.current[newIndex];
                    if (btn) btn.focus();
                  } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const categoryName = categoryNames[focusedCategoryIndex];
                    setExpandedGroup(categoryName);
                    setFocusedItemIndex(0);
                  }
                }
              }}
              onClick={(e) => {
                // Special case: Practice and Questions should open their pages, not just expand
                if (groupName === 'Practice' || groupName === 'Questions') {
                  setSelectedOptionAndRef(groupName, e.target)
                  setExpandedGroup(null)
                  setExpandedSubcategory(null)
                } else if (group.hasSubcategories) {
                  // Categories with subcategories should expand to show subcategories
                  console.log('Expanding category with subcategories:', groupName)
                  setExpandedGroup(expandedGroup === groupName ? null : groupName)
                  setExpandedSubcategory(null)
                  setFocusedItemIndex(-1)
                } else {
                  // Regular categories navigate to their own pages
                  setSelectedOptionAndRef(groupName, e.target)
                  setExpandedGroup(null)
                  setExpandedSubcategory(null)
                }
              }}
              onMouseDown={(e) => {
                // Prevent default to keep focus on button
                e.preventDefault()
              }}
              onFocus={() => setFocusedCategoryIndex(index)}
              style={{
                padding: '0.4rem 0.75rem',
                fontSize: '0.8rem',
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
                borderWidth: focusedCategoryIndex === index && !expandedGroup ? '3px' : '2px',
                position: 'relative'
              }}
            >
              <span style={{ fontSize: '0.95rem' }}>{group.icon}</span>
              <span>{groupName}</span>
              <span style={{ fontSize: '0.65rem', opacity: 0.8, backgroundColor: expandedGroup === groupName ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)', padding: '0.1rem 0.3rem', borderRadius: '3px' }}>
                {group.hasSubcategories ? Object.keys(group.subcategories).length : (group.items?.length || 0)}
              </span>
            </button>
          ))}

          {/* Divider */}
          <div style={{
            width: '2px',
            height: '32px',
            backgroundColor: '#e5e7eb',
            margin: '0 0.25rem',
            alignSelf: 'center'
          }}></div>

          {/* Search Button - Circular */}
          <button
              onClick={() => setShowGlobalSearch(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setShowGlobalSearch(true)
                }
              }}
              tabIndex={0}
              aria-label="Open global search (Ctrl+K)"
              className={focusedUtilityButton === 'search' ? 'btn-focus-green' : ''}
              style={{
                width: '40px',
                height: '40px',
                fontSize: '1.2rem',
                backgroundColor: showGlobalSearch ? '#059669' : '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px -2px rgba(16, 185, 129, 0.4)',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                if (!showGlobalSearch && focusedUtilityButton !== 'search') {
                  e.currentTarget.style.backgroundColor = '#059669'
                  e.currentTarget.style.transform = 'scale(1.1)'
                  e.currentTarget.style.boxShadow = '0 6px 16px -2px rgba(16, 185, 129, 0.5)'
                }
              }}
              onMouseLeave={(e) => {
                if (!showGlobalSearch && focusedUtilityButton !== 'search') {
                  e.currentTarget.style.backgroundColor = '#10b981'
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = '0 4px 12px -2px rgba(16, 185, 129, 0.4)'
                }
              }}
              onFocus={() => setFocusedUtilityButton('search')}
              onBlur={() => setFocusedUtilityButton(null)}
            >
              <span>🔍</span>
            </button>

            {/* Account Button - Circular */}
            <div style={{ position: 'relative' }}>
              <button
                ref={accountButtonRef}
                onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setShowAccountDropdown(!showAccountDropdown)
                  } else if (e.key === 'Escape' && showAccountDropdown) {
                    e.preventDefault()
                    setShowAccountDropdown(false)
                  }
                }}
                tabIndex={0}
                aria-label="Account menu"
                aria-expanded={showAccountDropdown}
                aria-haspopup="true"
                className={focusedUtilityButton === 'account' ? 'btn-focus-blue' : ''}
                style={{
                  width: '40px',
                  height: '40px',
                  fontSize: '1.2rem',
                  backgroundColor: showAccountDropdown ? '#2563eb' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px -2px rgba(59, 130, 246, 0.4)',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
                onMouseEnter={(e) => {
                  if (!showAccountDropdown && focusedUtilityButton !== 'account') {
                    e.currentTarget.style.backgroundColor = '#2563eb'
                    e.currentTarget.style.transform = 'scale(1.1)'
                    e.currentTarget.style.boxShadow = '0 6px 16px -2px rgba(59, 130, 246, 0.5)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showAccountDropdown && focusedUtilityButton !== 'account') {
                    e.currentTarget.style.backgroundColor = '#3b82f6'
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = '0 4px 12px -2px rgba(59, 130, 246, 0.4)'
                  }
                }}
                onFocus={() => setFocusedUtilityButton('account')}
                onBlur={() => setFocusedUtilityButton(null)}
              >
                <span>👤</span>
              </button>

              <AccountDropdown
                isOpen={showAccountDropdown}
                onClose={() => setShowAccountDropdown(false)}
                onOpenStudyGuide={() => setShowStudyGuideModal(true)}
                onGoToHome={() => setSelectedOptionAndRef('')}
                onGoToPractice={(category) => {
                  // If category is 'Practice', navigate to Practice page, otherwise open specific modal
                  if (category === 'Practice') {
                    setSelectedOptionAndRef('Practice')
                  } else {
                    navigateToPracticeComponent(category)
                  }
                }}
                triggerRef={accountButtonRef}
              />
            </div>

            {/* Feedback Button - Circular */}
            <button
              onClick={() => setShowFeedbackModal(true)}
              aria-label="Send feedback"
              title="Send Feedback"
              style={{
                width: '40px',
                height: '40px',
                fontSize: '1.2rem',
                backgroundColor: showFeedbackModal ? '#7c3aed' : '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px -2px rgba(139, 92, 246, 0.4)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#7c3aed'
                e.currentTarget.style.transform = 'scale(1.1)'
                e.currentTarget.style.boxShadow = '0 6px 16px -4px rgba(139, 92, 246, 0.6)'
              }}
              onMouseLeave={(e) => {
                if (!showFeedbackModal) {
                  e.currentTarget.style.backgroundColor = '#8b5cf6'
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = '0 4px 12px -2px rgba(139, 92, 246, 0.4)'
                }
              }}
            >
              <span>💬</span>
            </button>
        </div>

        {/* Expanded Group Items (flattened; no subcategory links) */}
        {expandedGroup && (
          <div
            role="menu"
            aria-label={`${expandedGroup} items`}
            style={{
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
            {/* Always show items list (flattened from subcategories if present) */}
            <>
              {(() => {
                const group = categoryGroups[expandedGroup];
                const items = group.hasSubcategories
                  ? Object.values(group.subcategories).flatMap(s => s.items)
                  : group.items || []
                return items
              })().map((itemValue, itemIndex) => {
                  const option = options.find(opt => opt.value === itemValue)

                if (expandedSubcategory === 'Algorithms') {
                  console.log(`Looking for "${itemValue}":`, option ? 'FOUND' : 'NOT FOUND')
                }

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
                    role="menuitem"
                    aria-label={`${option.label} - ${option.complexity}`}
                    data-item-button
                    data-item-index={itemIndex}
                    tabIndex={0}
                    ref={(el) => {
                      if (el) {
                        itemButtonRefs.current[`${expandedGroup}-${itemIndex}`] = el;
                      }
                    }}
                    onClick={(e) => {
                      console.log('Clicking item:', option.value, 'in group:', expandedGroup)
                      // For Practice items, use navigateToPracticeComponent to open modals directly
                      if (expandedGroup === 'Practice') {
                        navigateToPracticeComponent(option.value)
                      } else {
                        setSelectedOptionAndRef(option.value, e.currentTarget)
                      }
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
                      fontSize: '0.95rem',
                      fontWeight: '700'
                    }}>
                      {itemValue}
                    </div>
                  </button>
                </div>
              )
            })}
              </>
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
      </nav>

      {selectedOption && (
        <div style={{
          position: 'fixed',
          top: isHeaderVisible ? '120px' : '0',
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'auto',
          backgroundColor: '#ffffff',
          zIndex: 100000,
          transition: 'top 0.3s ease-in-out',
          pointerEvents: 'auto'
        }}>
          {renderSelectedComponent()}
        </div>
      )}

      {!selectedOption && (
        <main id="main-content" style={{
          marginTop: '140px',
          padding: '2rem',
          maxWidth: '900px',
          margin: '140px auto 0'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '3rem',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
            border: '2px solid #e5e7eb'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '800',
              color: '#1f2937',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              📊 Your Learning Progress
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              Track your completion across all practice topics
            </p>

            {(() => {
              const stats = getProgressStats();
              const percentage = stats.progressPercent;

              return (
                <>
                  {/* Progress Bar */}
                  <div style={{ marginBottom: '2rem' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>
                        Overall Progress
                      </span>
                      <span style={{ fontSize: '1rem', fontWeight: '700', color: '#3b82f6' }}>
                        {percentage}%
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '32px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <div style={{
                        width: `${percentage}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
                        transition: 'width 0.5s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: '1rem',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        color: 'white'
                      }}>
                        {percentage > 10 && `${stats.completed}/${stats.total}`}
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1.5rem',
                    marginTop: '2rem'
                  }}>
                    <div style={{
                      backgroundColor: '#eff6ff',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      textAlign: 'center',
                      border: '2px solid #3b82f6'
                    }}>
                      <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#3b82f6' }}>
                        {stats.total}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '600', marginTop: '0.5rem' }}>
                        Total Problems
                      </div>
                    </div>
                    <div style={{
                      backgroundColor: '#f0fdf4',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      textAlign: 'center',
                      border: '2px solid #10b981'
                    }}>
                      <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#10b981' }}>
                        {stats.completed}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '600', marginTop: '0.5rem' }}>
                        Completed
                      </div>
                    </div>
                    <div style={{
                      backgroundColor: '#fef3c7',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      textAlign: 'center',
                      border: '2px solid #f59e0b'
                    }}>
                      <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#f59e0b' }}>
                        {stats.remaining}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '600', marginTop: '0.5rem' }}>
                        Remaining
                      </div>
                    </div>
                  </div>

                  {/* Motivational Message */}
                  <div style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '1rem', color: '#4b5563', margin: 0 }}>
                      {percentage === 0 && '🚀 Start your learning journey by selecting a topic above!'}
                      {percentage > 0 && percentage < 25 && '💪 Great start! Keep up the momentum!'}
                      {percentage >= 25 && percentage < 50 && '🔥 You\'re on fire! Keep going!'}
                      {percentage >= 50 && percentage < 75 && '⭐ Halfway there! Excellent progress!'}
                      {percentage >= 75 && percentage < 100 && '🎯 Almost done! You\'re doing amazing!'}
                      {percentage === 100 && '🎉 Congratulations! You\'ve completed all problems!'}
                    </p>
                  </div>

                  {/* Category Progress Dropdown */}
                  <div style={{ marginTop: '2rem' }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: '#1f2937',
                      marginBottom: '1rem'
                    }}>
                      📚 Progress by Category
                    </h3>

                    {(() => {
                      const categoryStats = getCategoryStats();
                      const categoryGroupings = getCategoryGroupings();
                      const allProblems = getAllPracticeProblems();
                      const completedProblems = getCompletedProblems();
                      const sortedCategories = Object.entries(categoryStats).sort((a, b) =>
                        b[1].percent - a[1].percent
                      );

                      return (
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: '0.75rem'
                        }}>
                          {sortedCategories.map(([categoryName, stats]) => {
                            const isExpanded = expandedProgressCategory === categoryName;
                            const topics = categoryGroupings[categoryName] || [];

                            // Define color schemes for each category
                            const categoryColors = {
                              'Practice - Algorithms': {
                                bg: '#f0fdf4',
                                border: '#10b981',
                                hover: '#dcfce7',
                                text: '#065f46'
                              },
                              'Practice - Java Features': {
                                bg: '#fef3c7',
                                border: '#f59e0b',
                                hover: '#fde68a',
                                text: '#92400e'
                              },
                              'Practice - Concurrency': {
                                bg: '#fce7f3',
                                border: '#ec4899',
                                hover: '#fbcfe8',
                                text: '#9f1239'
                              },
                              'Practice - Core Java Fundamentals': {
                                bg: '#f3e8ff',
                                border: '#a855f7',
                                hover: '#e9d5ff',
                                text: '#6b21a8'
                              },
                              'Practice - System Design': {
                                bg: '#ffedd5',
                                border: '#f97316',
                                hover: '#fed7aa',
                                text: '#9a3412'
                              },
                              'Practice - Python Operations': {
                                bg: '#dbeafe',
                                border: '#3b82f6',
                                hover: '#bfdbfe',
                                text: '#1e3a8a'
                              }
                            };

                            const colors = categoryColors[categoryName] || {
                              bg: '#f9fafb',
                              border: '#6b7280',
                              hover: '#f3f4f6',
                              text: '#374151'
                            };

                            return (
                              <div key={categoryName} style={{
                                backgroundColor: 'white',
                                border: `2px solid ${colors.border}`,
                                borderRadius: '8px',
                                overflow: 'hidden',
                                transition: 'all 0.2s ease',
                                gridColumn: isExpanded ? 'span 3' : 'span 1'
                              }}>
                                {/* Category Header */}
                                <button
                                  onClick={() => {
                                    setExpandedProgressCategory(isExpanded ? null : categoryName);
                                  }}
                                  style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    backgroundColor: stats.percent === 100 ? '#f0fdf4' : colors.bg,
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem',
                                    transition: 'all 0.2s ease'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = stats.percent === 100 ? '#dcfce7' : colors.hover;
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = stats.percent === 100 ? '#f0fdf4' : colors.bg;
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
                                    <span style={{
                                      fontSize: '0.875rem',
                                      fontWeight: '600',
                                      color: colors.text,
                                      textAlign: 'left',
                                      flex: 1,
                                      lineHeight: '1.2'
                                    }}>
                                      {categoryName}
                                    </span>
                                    <span style={{
                                      fontSize: '0.75rem',
                                      color: colors.border,
                                      fontWeight: '600',
                                      transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                                      transition: 'transform 0.2s'
                                    }}>
                                      {isExpanded ? '▼' : '▶'}
                                    </span>
                                  </div>

                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '1.25rem' }}>
                                    <span style={{
                                      fontSize: '0.75rem',
                                      color: '#6b7280',
                                      fontWeight: '500'
                                    }}>
                                      {stats.completed}/{stats.total}
                                    </span>
                                    <span style={{
                                      fontSize: '0.875rem',
                                      fontWeight: '700',
                                      color: stats.percent === 100 ? '#10b981' : colors.border
                                    }}>
                                      {stats.percent}%
                                    </span>
                                  </div>
                                </button>

                                {/* Expanded Topics List */}
                                {isExpanded && (
                                  <div style={{
                                    padding: '1rem',
                                    backgroundColor: colors.bg,
                                    borderTop: `2px solid ${colors.border}`
                                  }}>
                                    <div style={{
                                      display: 'grid',
                                      gridTemplateColumns: 'repeat(3, 1fr)',
                                      gap: '0.5rem'
                                    }}>
                                      {topics.map(topic => {
                                        // Map topic names to their actual problem ID prefixes
                                        const topicIdMap = {
                                          'Binary Search': 'BinarySearch',
                                          'Dynamic Programming': 'DynamicProgramming',
                                          'Hash Tables': 'HashTables',
                                          'Linked Lists': 'LinkedLists',
                                          'Object-Oriented Programming': 'ObjectOrientedProgramming',
                                          'Exception Handling': 'ExceptionHandling',
                                          'File I/O': 'FileIO',
                                          'JVM Internals': 'JVMInternals',
                                          'Memory Management': 'MemoryManagement',
                                          'Data Structures': 'DataStructures',
                                          'Streams Advanced': 'StreamsAdvanced',
                                          'Lambdas Advanced': 'LambdasAdvanced',
                                          'Functional Interfaces': 'FunctionalInterfaces',
                                          'Collections Framework': 'CollectionsFramework',
                                          'Design Patterns Practice': 'DesignPatternsPractice',
                                          'LRU Cache': 'LRUCache',
                                          'Rate Limiter': 'RateLimiter',
                                          'Design Problems': 'DesignProblems',
                                          'Union Find': 'UnionFind'
                                        };
                                        const problemIdPrefix = topicIdMap[topic] || topic;
                                        const topicTotal = allProblems[topic] || 0;
                                        const topicCompleted = completedProblems.filter(id => id.startsWith(problemIdPrefix)).length;
                                        const topicPercent = topicTotal > 0 ? Math.round((topicCompleted / topicTotal) * 100) : 0;
                                        const remaining = topicTotal - topicCompleted;

                                        return (
                                          <button
                                            key={topic}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              navigateToPracticeComponent(topic);
                                            }}
                                            style={{
                                              padding: '0.75rem',
                                              backgroundColor: topicPercent === 100 ? '#dcfce7' : 'white',
                                              border: `2px solid ${topicPercent === 100 ? '#10b981' : '#e5e7eb'}`,
                                              borderRadius: '8px',
                                              cursor: 'pointer',
                                              textAlign: 'left',
                                              transition: 'all 0.2s',
                                              display: 'flex',
                                              flexDirection: 'column',
                                              gap: '0.5rem'
                                            }}
                                            onMouseEnter={(e) => {
                                              e.currentTarget.style.borderColor = colors.border;
                                              e.currentTarget.style.transform = 'translateY(-2px)';
                                              e.currentTarget.style.boxShadow = `0 4px 12px ${colors.border}40`;
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.borderColor = topicPercent === 100 ? '#10b981' : '#e5e7eb';
                                              e.currentTarget.style.transform = 'translateY(0)';
                                              e.currentTarget.style.boxShadow = 'none';
                                            }}
                                          >
                                            <div style={{
                                              fontSize: '0.875rem',
                                              fontWeight: '600',
                                              color: '#1f2937'
                                            }}>
                                              {topic}
                                            </div>
                                            <div style={{
                                              display: 'flex',
                                              justifyContent: 'space-between',
                                              alignItems: 'center'
                                            }}>
                                              <span style={{
                                                fontSize: '0.75rem',
                                                color: remaining > 0 ? '#f59e0b' : '#10b981',
                                                fontWeight: '600'
                                              }}>
                                                {remaining > 0 ? `${remaining} left` : '✓ Done'}
                                              </span>
                                              <span style={{
                                                fontSize: '0.75rem',
                                                fontWeight: '700',
                                                color: topicPercent === 100 ? '#10b981' : '#6b7280'
                                              }}>
                                                {topicCompleted}/{topicTotal}
                                              </span>
                                            </div>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}
                  </div>
                </>
              );
            })()}
          </div>
        </main>
      )}
    </>
  )
}

export default App

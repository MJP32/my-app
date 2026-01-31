import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react'
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom'
import './App.css'
import KeyboardShortcutsDialog from './components/KeyboardShortcutsDialog.jsx'
import GlobalSearch from './components/GlobalSearch.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import { useTheme } from './contexts/ThemeContext'
import ProgressDashboard from './pages/ProgressDashboard.jsx'
import BookmarkButton from './components/BookmarkButton.jsx'
import LoadingSpinner from './components/LoadingSpinner.jsx'
import { KEYS, SHORTCUTS, FocusManager, AriaUtils } from './utils/keyboardNavigation.js'
import { FocusManager as FocusManagerUtil, focusHistory } from './utils/focusManagement.js'
// Project pages (DevOps-related)
import AgileScrum from './pages/projects/AgileScrum.jsx'
import ProductionSupport from './pages/projects/ProductionSupport.jsx'
import SecurityOWASP from './pages/projects/SecurityOWASP.jsx'
import JWT from './pages/security/JWT.jsx'
import OAuth from './pages/security/OAuth.jsx'
import OAuth2 from './pages/security/OAuth2.jsx'
import Testing from './pages/projects/Testing.jsx'
import AIInterview from './pages/AIInterview.jsx'
import Settings from './pages/Settings.jsx'

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
import Optional from './pages/java/Optional.jsx'
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
import Zipkin from './pages/frameworks/Zipkin.jsx'
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
import NoSQLQuestions from './pages/questions/NoSQLQuestions.jsx'
import ORMQuestions from './pages/questions/ORMQuestions.jsx'
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
import EtradingQuestions from './pages/questions/EtradingQuestions.jsx'
import SystemDesignQuestions from './pages/questions/SystemDesignQuestions.jsx'

// Database pages
import SQL from './pages/databases/SQL.jsx'
import NoSQL from './pages/databases/NoSQL.jsx'
import Oracle from './pages/databases/Oracle.jsx'
import ORM from './pages/databases/ORM.jsx'
import Redis from './pages/databases/Redis.jsx'
import PLSQL from './pages/databases/PLSQL.jsx'
import StoredProcedures from './pages/databases/StoredProcedures.jsx'
import DatabaseOptimization from './pages/databases/DatabaseOptimization.jsx'
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
import Messaging from './pages/messaging/Messaging.jsx'
import ETrading from './pages/etrading/ETrading.jsx'
import RFQSystems from './pages/etrading/RFQSystems.jsx'
import FixedIncomeTrading from './pages/etrading/FixedIncomeTrading.jsx'
import AeronMessaging from './pages/etrading/AeronMessaging.jsx'
import LowLatency from './pages/etrading/LowLatency.jsx'
import LatencyMeasurement from './pages/etrading/LatencyMeasurement.jsx'
import OrderManagement from './pages/etrading/OrderManagement.jsx'
import ExecutionAlgorithms from './pages/etrading/ExecutionAlgorithms.jsx'
import AutomatedHedging from './pages/etrading/AutomatedHedging.jsx'
import FIXProtocol from './pages/etrading/FIXProtocol.jsx'
import JavaTrading from './pages/etrading/JavaTrading.jsx'
import RiskManagement from './pages/etrading/RiskManagement.jsx'
import PriceContribution from './pages/etrading/PriceContribution.jsx'
import DistributedSystems from './pages/etrading/DistributedSystems.jsx'
import DisruptorPattern from './pages/etrading/DisruptorPattern.jsx'

// Algorithm pages - lazy loaded for better performance
const Arrays = lazy(() => import('./pages/algorithms/Arrays.jsx'))
const HashTables = lazy(() => import('./pages/algorithms/HashTables.jsx'))
const Strings = lazy(() => import('./pages/algorithms/Strings.jsx'))
const LinkedLists = lazy(() => import('./pages/algorithms/LinkedLists.jsx'))
const Stacks = lazy(() => import('./pages/algorithms/Stacks.jsx'))
const Queues = lazy(() => import('./pages/algorithms/Queues.jsx'))
const Sorting = lazy(() => import('./pages/algorithms/Sorting.jsx'))
const BinarySearch = lazy(() => import('./pages/algorithms/BinarySearch.jsx'))
const Recursion = lazy(() => import('./pages/algorithms/Recursion.jsx'))
const DataStructures = lazy(() => import('./pages/algorithms/DataStructures.jsx'))
const DynamicProgramming = lazy(() => import('./pages/algorithms/DynamicProgramming.jsx'))
const DynamicProgrammingPatterns = lazy(() => import('./pages/practice/DynamicProgrammingPatterns.jsx'))
const Trees = lazy(() => import('./pages/algorithms/Trees.jsx'))
const BinaryTrees = lazy(() => import('./pages/algorithms/BinaryTrees.jsx'))
const BinarySearchTrees = lazy(() => import('./pages/algorithms/BinarySearchTrees.jsx'))
const Graphs = lazy(() => import('./pages/algorithms/Graphs.jsx'))
const Heaps = lazy(() => import('./pages/algorithms/Heaps.jsx'))
const UnionFind = lazy(() => import('./pages/algorithms/UnionFind.jsx'))
const Trie = lazy(() => import('./pages/algorithms/Trie.jsx'))
const Searching = lazy(() => import('./pages/algorithms/Searching.jsx'))
const GreedyAlgorithms = lazy(() => import('./pages/algorithms/GreedyAlgorithms.jsx'))
const FamousAlgorithms = lazy(() => import('./pages/algorithms/FamousAlgorithms.jsx'))
const SlidingWindow = lazy(() => import('./pages/algorithms/SlidingWindow.jsx'))
const Backtracking = lazy(() => import('./pages/algorithms/Backtracking.jsx'))
const Intervals = lazy(() => import('./pages/algorithms/Intervals.jsx'))
const MathGeometry = lazy(() => import('./pages/algorithms/MathGeometry.jsx'))
const AdvancedGraphs = lazy(() => import('./pages/algorithms/AdvancedGraphs.jsx'))
const BitManipulation = lazy(() => import('./pages/algorithms/BitManipulation.jsx'))
const TwoPointers = lazy(() => import('./pages/algorithms/TwoPointers.jsx'))

// Design pages - lazy loaded for better performance
const DesignPatterns = lazy(() => import('./pages/design/DesignPatterns.jsx'))
const MicroservicePatterns = lazy(() => import('./pages/design/MicroservicePatterns.jsx'))
const SystemDesign = lazy(() => import('./pages/design/SystemDesign.jsx'))
const LRUCache = lazy(() => import('./pages/design/LRUCache.jsx'))
const RateLimiter = lazy(() => import('./pages/design/RateLimiter.jsx'))
const DesignProblems = lazy(() => import('./pages/design/DesignProblems.jsx'))
const DesignPatternsInteractive = lazy(() => import('./pages/design/DesignPatternsInteractive.jsx'))
const Design = lazy(() => import('./pages/design/Design.jsx'))
const EventDrivenArchitecture = lazy(() => import('./pages/design/EventDrivenArchitecture.jsx'))
const DomainDrivenDesign = lazy(() => import('./pages/design/DomainDrivenDesign.jsx'))
const L3SystemDesign = lazy(() => import('./pages/design/L3SystemDesign.jsx'))
const L4SystemDesign = lazy(() => import('./pages/design/L4SystemDesign.jsx'))
const L5SystemDesign = lazy(() => import('./pages/design/L5SystemDesign.jsx'))

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
import DataScience from './pages/python/DataScience.jsx'
import MachineLearning from './pages/python/MachineLearning.jsx'
import WebFrameworks from './pages/python/WebFrameworks.jsx'
import AsyncPython from './pages/python/AsyncPython.jsx'
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
import StringAlgorithms from './pages/python/StringAlgorithms.jsx'
import Frameworks from './pages/Frameworks.jsx'
import StudyGuideModal from './components/StudyGuideModal.jsx'
import AccountDropdown from './components/AccountDropdown.jsx'
import KeyboardGuide from './components/KeyboardGuide.jsx'
import FeedbackModal from './components/FeedbackModal.jsx'
import GoogleAnalytics from './components/GoogleAnalytics.jsx'
import { initializeUser, getProgressStats, getCategoryStats, getCategoryGroupings, getAllPracticeProblems, getCompletedProblems, migrateCompletionData } from './services/progressService'
import { onAuthStateChange, getCurrentUser } from './services/authService'
import { XPGainNotification } from './components/gamification'
import { AchievementNotification } from './components/achievements'
import DailyChallenge from './components/DailyChallenge'
import { ActivityHeatmap, WeeklyProgressChart } from './components/charts'
import { checkStreakStatus } from './services/gamificationService'
import { useSEO } from './hooks/useSEO'

// Category organization metadata (for visual grouping)
const categoryOrganization = {
  'Learning': {
    label: '📚 Core Learning',
    categories: ['Java', 'Python', 'Design']
  },
  'Practice': {
    label: '💪 Practice & Questions',
    categories: ['Practice', 'Questions', 'Progress Dashboard']
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
    items: []
  },
  'Python': {
    icon: '🐍',
    color: '#3776ab',
    groupSection: 'Learning',
    description: 'Python programming and libraries',
    items: []
  },
  'Design': {
    icon: '🎨',
    color: '#8b5cf6',
    groupSection: 'Learning',
    description: 'Design patterns and architecture',
    items: []
  },
  'Frameworks': {
    icon: '🌱',
    color: '#ec4899',
    groupSection: 'Tech Stack',
    description: 'Spring, REST, Hibernate, React',
    items: []
  },
  'Databases': {
    icon: '🗃️',
    color: '#3b82f6',
    groupSection: 'Tech Stack',
    description: 'SQL, NoSQL, ORM, caching',
    items: []
  },
  'Cloud': {
    icon: '☁️',
    color: '#0ea5e9',
    groupSection: 'Tech Stack',
    description: 'AWS, GCP, Azure platforms',
    items: []
  },
  'DevOps': {
    icon: '🛠️',
    color: '#0ea5e9',
    groupSection: 'Operations',
    description: 'CI/CD, Docker, Kubernetes, Messaging, Security',
    items: []
  },
  'eTrading': {
    icon: '📈',
    color: '#22c55e',
    groupSection: 'Tech Stack',
    description: 'Electronic trading systems and protocols',
    items: []
  },
  'Practice': {
    icon: '💪',
    color: '#10b981',
    groupSection: 'Practice',
    description: 'Algorithm practice and coding challenges',
    items: []
  },
  'Questions': {
    icon: '❓',
    color: '#8b5cf6',
    groupSection: 'Practice',
    description: 'Interview questions and answers',
    items: []
  },
  'Progress Dashboard': {
    icon: '📊',
    color: '#6366f1',
    groupSection: 'Practice',
    description: 'Track your learning progress',
    items: []
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
  'SQL Questions', 'NoSQL Questions', 'ORM Questions', 'Hibernate Questions',
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
  'Databases': ['SQL Questions', 'NoSQL Questions', 'ORM Questions', 'Hibernate Questions'],
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
const DATABASE_COMPONENTS_ORDER = ['SQL', 'NoSQL', 'Oracle', 'ORM', 'Redis', 'PLSQL', 'StoredProcedures', 'DatabaseOptimization']

// Display names for database components
const DATABASE_DISPLAY_NAMES = {
  'SQL': 'SQL',
  'NoSQL': 'NoSQL',
  'Oracle': 'Oracle',
  'ORM': 'ORM',
  'Redis': 'Redis',
  'PLSQL': 'PL/SQL',
  'StoredProcedures': 'Stored Procedures',
  'DatabaseOptimization': 'Optimization'
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

// Route mapping for URL-based navigation
const ROUTE_TO_PAGE = {
  '/': '',
  '/java': 'Java',
  '/python': 'Python',
  '/practice': 'Practice',
  '/design': 'Design',
  '/questions': 'Questions',
  '/frameworks': 'Frameworks',
  '/databases': 'Databases',
  '/devops': 'DevOps',
  '/cloud': 'Cloud',
  '/security': 'Security',
  '/messaging': 'Messaging',
  '/etrading': 'eTrading',
  '/projects': 'Projects',
  '/progress': 'Progress',
  '/ai-interview': 'AI Interview'
}

const PAGE_TO_ROUTE = Object.fromEntries(
  Object.entries(ROUTE_TO_PAGE).map(([route, page]) => [page, route])
)

// Breadcrumb color themes for each category
const BREADCRUMB_COLORS = {
  Java: {
    primary: '#fbbf24',
    primaryHover: '#fcd34d',
    bg: 'rgba(245, 158, 11, 0.1)',
    border: 'rgba(245, 158, 11, 0.3)',
    arrow: '#f59e0b',
    hoverBg: 'rgba(245, 158, 11, 0.2)',
    topicBg: 'rgba(245, 158, 11, 0.2)'
  },
  Python: {
    primary: '#60a5fa',
    primaryHover: '#93c5fd',
    bg: 'rgba(55, 118, 171, 0.1)',
    border: 'rgba(55, 118, 171, 0.3)',
    arrow: '#3b82f6',
    hoverBg: 'rgba(55, 118, 171, 0.2)',
    topicBg: 'rgba(55, 118, 171, 0.2)'
  },
  Design: {
    primary: '#c084fc',
    primaryHover: '#d8b4fe',
    bg: 'rgba(168, 85, 247, 0.1)',
    border: 'rgba(168, 85, 247, 0.3)',
    arrow: '#a855f7',
    hoverBg: 'rgba(168, 85, 247, 0.2)',
    topicBg: 'rgba(168, 85, 247, 0.2)'
  },
  Practice: {
    primary: '#93c5fd',
    primaryHover: '#bfdbfe',
    bg: 'rgba(59, 130, 246, 0.1)',
    border: 'rgba(59, 130, 246, 0.3)',
    arrow: '#3b82f6',
    hoverBg: 'rgba(59, 130, 246, 0.2)',
    topicBg: 'rgba(59, 130, 246, 0.2)'
  },
  Questions: {
    primary: '#a78bfa',
    primaryHover: '#c4b5fd',
    bg: 'rgba(139, 92, 246, 0.1)',
    border: 'rgba(139, 92, 246, 0.3)',
    arrow: '#8b5cf6',
    hoverBg: 'rgba(139, 92, 246, 0.2)',
    topicBg: 'rgba(139, 92, 246, 0.2)'
  },
  Frameworks: {
    primary: '#6ee7b7',
    primaryHover: '#a7f3d0',
    bg: 'rgba(16, 185, 129, 0.1)',
    border: 'rgba(16, 185, 129, 0.3)',
    arrow: '#10b981',
    hoverBg: 'rgba(16, 185, 129, 0.2)',
    topicBg: 'rgba(16, 185, 129, 0.2)'
  },
  Databases: {
    primary: '#93c5fd',
    primaryHover: '#bfdbfe',
    bg: 'rgba(59, 130, 246, 0.1)',
    border: 'rgba(59, 130, 246, 0.3)',
    arrow: '#3b82f6',
    hoverBg: 'rgba(59, 130, 246, 0.2)',
    topicBg: 'rgba(59, 130, 246, 0.2)'
  },
  DevOps: {
    primary: '#93c5fd',
    primaryHover: '#bfdbfe',
    bg: 'rgba(59, 130, 246, 0.1)',
    border: 'rgba(59, 130, 246, 0.3)',
    arrow: '#3b82f6',
    hoverBg: 'rgba(59, 130, 246, 0.2)',
    topicBg: 'rgba(59, 130, 246, 0.2)'
  },
  Cloud: {
    primary: '#7dd3fc',
    primaryHover: '#bae6fd',
    bg: 'rgba(14, 165, 233, 0.1)',
    border: 'rgba(14, 165, 233, 0.3)',
    arrow: '#0ea5e9',
    hoverBg: 'rgba(14, 165, 233, 0.2)',
    topicBg: 'rgba(14, 165, 233, 0.2)'
  },
  Security: {
    primary: '#fca5a5',
    primaryHover: '#fecaca',
    bg: 'rgba(239, 68, 68, 0.1)',
    border: 'rgba(239, 68, 68, 0.3)',
    arrow: '#ef4444',
    hoverBg: 'rgba(239, 68, 68, 0.2)',
    topicBg: 'rgba(239, 68, 68, 0.2)'
  },
  Messaging: {
    primary: '#fca5a5',
    primaryHover: '#fecaca',
    bg: 'rgba(239, 68, 68, 0.1)',
    border: 'rgba(239, 68, 68, 0.3)',
    arrow: '#ef4444',
    hoverBg: 'rgba(239, 68, 68, 0.2)',
    topicBg: 'rgba(239, 68, 68, 0.2)'
  },
  eTrading: {
    primary: '#4ade80',
    primaryHover: '#86efac',
    bg: 'rgba(34, 197, 94, 0.1)',
    border: 'rgba(34, 197, 94, 0.3)',
    arrow: '#22c55e',
    hoverBg: 'rgba(34, 197, 94, 0.2)',
    topicBg: 'rgba(34, 197, 94, 0.2)'
  }
}

// Helper function to create breadcrumb with colors
const createBreadcrumb = (sectionName, sectionIcon, topic, onSectionClick, category = null, onCategoryClick = null) => ({
  section: { name: sectionName, icon: sectionIcon, onClick: onSectionClick },
  category: category ? { name: category, onClick: onCategoryClick } : null,
  topic,
  colors: BREADCRUMB_COLORS[sectionName] || BREADCRUMB_COLORS.Practice
})

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const [count, setCount] = useState(0)
  const [selectedOption, setSelectedOption] = useState(() => {
    // Initialize from URL on first load
    return ROUTE_TO_PAGE[location.pathname] || ''
  })
  const [pythonInitialCategory, setPythonInitialCategory] = useState(null)
  const [javaInitialCategory, setJavaInitialCategory] = useState(null)
  const [designInitialCategory, setDesignInitialCategory] = useState(null)
  const [securityInitialCategory, setSecurityInitialCategory] = useState(null)
  const [databasesInitialCategory, setDatabasesInitialCategory] = useState(null)
  const [frameworksInitialCategory, setFrameworksInitialCategory] = useState(null)
  const [devopsInitialCategory, setDevopsInitialCategory] = useState(null)
  const [messagingInitialCategory, setMessagingInitialCategory] = useState(null)
  const [cloudInitialCategory, setCloudInitialCategory] = useState(null)
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
  const [showPLSQLModal, setShowPLSQLModal] = useState(false)
  const [showStoredProceduresModal, setShowStoredProceduresModal] = useState(false)
  const [showDatabaseOptimizationModal, setShowDatabaseOptimizationModal] = useState(false)
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
  const [showOptionalModal, setShowOptionalModal] = useState(false)
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
  const [showZipkinModal, setShowZipkinModal] = useState(false)
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
  const [showNoSQLQuestionsModal, setShowNoSQLQuestionsModal] = useState(false)
  const [showORMQuestionsModal, setShowORMQuestionsModal] = useState(false)
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
  const [showEtradingQuestionsModal, setShowEtradingQuestionsModal] = useState(false)
  const [showSystemDesignQuestionsModal, setShowSystemDesignQuestionsModal] = useState(false)
  const [showSearchingModal, setShowSearchingModal] = useState(false)
  const [showGreedyAlgorithmsModal, setShowGreedyAlgorithmsModal] = useState(false)
  const [showFamousAlgorithmsModal, setShowFamousAlgorithmsModal] = useState(false)
  const [showTwoPointersModal, setShowTwoPointersModal] = useState(false)
  const [showBitManipulationModal, setShowBitManipulationModal] = useState(false)
  const [showAccountDropdown, setShowAccountDropdown] = useState(false)
  const [showKeyboardGuide, setShowKeyboardGuide] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [expandedCategories, setExpandedCategories] = useState([])

  // Cumulative breadcrumb navigation stack
  // Stack item format: { name, icon?, page?, metadata? }
  const [breadcrumbStack, setBreadcrumbStack] = useState([])

  const categoryButtonRefs = useRef({})
  const itemButtonRefs = useRef({})
  const componentContainerRef = useRef(null)
  const accountButtonRef = useRef(null)
  const subcategoryItemsRef = useRef(null)
  const lastScrollY = useRef(0)

  // Use ref to always have access to current selectedOption in event handlers
  const selectedOptionRef = useRef(selectedOption)

  // Apply SEO settings based on current page
  useSEO(selectedOption)

  // Initialize user and progress tracking on mount
  useEffect(() => {
    initializeUser()
  }, [])

  // Sync URL with selectedOption (URL -> State)
  useEffect(() => {
    const pageFromUrl = ROUTE_TO_PAGE[location.pathname]
    if (pageFromUrl !== undefined && pageFromUrl !== selectedOption) {
      setSelectedOption(pageFromUrl)
    }
  }, [location.pathname])

  // Helper to navigate with URL update
  const setSelectedOptionAndNavigate = useCallback((option) => {
    setSelectedOption(option)
    const route = PAGE_TO_ROUTE[option]
    if (route && location.pathname !== route) {
      navigate(route)
    } else if (!route && option && location.pathname !== '/') {
      // For pages without routes, go to home but keep state
      navigate('/')
    }
  }, [navigate, location.pathname])

  // Breadcrumb navigation functions
  // Push a new item to the breadcrumb stack
  const pushBreadcrumb = useCallback((item) => {
    setBreadcrumbStack(prev => [...prev, item])
  }, [])

  // Navigate to a specific breadcrumb index, truncating the stack
  const navigateToBreadcrumb = useCallback((index, item) => {
    setBreadcrumbStack(prev => {
      // Truncate stack to the clicked index (inclusive)
      const newStack = prev.slice(0, index + 1)
      return newStack
    })

    // Handle navigation based on the passed item
    if (item && item.page) {
        // Close all modals first
        setShowArraysModal(false)
        setShowHashTablesModal(false)
        setShowStacksModal(false)
        setShowQueuesModal(false)
        setShowTreesModal(false)
        setShowBinaryTreesModal(false)
        setShowBinarySearchTreesModal(false)
        setShowGraphsModal(false)
        setShowHeapsModal(false)
        setShowUnionFindModal(false)
        setShowTrieModal(false)
        setShowLinkedListsModal(false)
        setShowSortingModal(false)
        setShowBinarySearchModal(false)
        setShowRecursionModal(false)
        setShowDynamicProgrammingModal(false)
        setShowSlidingWindowModal(false)
        setShowBacktrackingModal(false)
        setShowIntervalsModal(false)
        setShowMathGeometryModal(false)
        setShowAdvancedGraphsModal(false)
        setShowSearchingModal(false)
        setShowGreedyAlgorithmsModal(false)
        setShowFamousAlgorithmsModal(false)
        setShowTwoPointersModal(false)
        setShowBitManipulationModal(false)
        setShowStringsModal(false)
        setShowStreamsModal(false)
        setShowStreamsAdvancedModal(false)
        setShowLambdasModal(false)
        setShowLambdasAdvancedModal(false)
        setShowFunctionalInterfacesModal(false)
        setShowCollectionsFrameworkModal(false)
        setShowConcurrencyModal(false)
        setShowMultithreadingModal(false)
        setShowObjectOrientedProgrammingModal(false)
        setShowExceptionHandlingModal(false)
        setShowFileIOModal(false)
        setShowJVMInternalsModal(false)
        setShowMemoryManagementModal(false)
        setShowDataStructuresModal(false)
        setShowGenericsModal(false)
        setShowDesignPatternsPracticeModal(false)
        setShowLRUCacheModal(false)
        setShowRateLimiterModal(false)
        setShowDesignProblemsModal(false)

      // Navigate to the target page
      setSelectedOption(item.page)
    }
  }, [])

  // Reset breadcrumb stack (for going to main menu)
  const resetBreadcrumbStack = useCallback(() => {
    setBreadcrumbStack([])
  }, [])

  // Initialize breadcrumb stack with a root item
  const initializeBreadcrumbStack = useCallback((rootItem) => {
    setBreadcrumbStack([rootItem])
  }, [])

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setCurrentUser(user)
      // Migrate old completion data to user-specific storage when user logs in
      if (user) {
        migrateCompletionData()
        // Check streak status when user logs in
        checkStreakStatus(user.uid)
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
        if (categoryData.items && categoryData.items.includes(itemName)) {
          return categoryName;
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

    // Update URL for main sections
    const route = PAGE_TO_ROUTE[value]
    if (route) {
      navigate(route, { replace: true })
    } else if (!value) {
      navigate('/', { replace: true })
    }
  }

  // Practice component navigation helpers
  const getPracticeComponentIndex = (componentName) => {
    return PRACTICE_COMPONENTS_ORDER.indexOf(componentName)
  }

  const navigateToPracticeComponent = (componentName) => {
    // Map grouped category names (from progress service) to first component in subcategory
    const categoryToFirstComponentMap = {
      'Practice - Algorithms': 'Arrays',
      'Practice - Java Features': 'Streams',
      'Practice - Concurrency': 'Concurrency',
      'Practice - Core Java Fundamentals': 'Object-Oriented Programming',
      'Practice - System Design': 'System Design',
      'Practice - Python Operations': 'Set Operations' // First Python topic
    }

    // Check if this is a grouped category name and map to first component
    if (categoryToFirstComponentMap[componentName] !== undefined) {
      const firstComponent = categoryToFirstComponentMap[componentName]
      if (firstComponent) {
        componentName = firstComponent
      } else {
        // No component available for this category
        return
      }
    }

    // Python topics use setSelectedOptionAndRef instead of modals
    const pythonTopicsMap = {
      'SetOperations': 'Set Operations',
      'MapOperations': 'Map Operations',
      'PythonSetOperations': 'Python Set Operations',
      'PythonMapFunctions': 'Python Map Functions',
      'PythonDictOps': 'Python Dict Operations',
      'PythonRegex': 'Python Regex'
    }

    // Check if this is a Python topic and navigate via setSelectedOptionAndRef
    if (pythonTopicsMap[componentName]) {
      setSelectedOptionAndRef(pythonTopicsMap[componentName])
      return
    }

    // Also handle already-mapped Python topic names
    const pythonSelectedOptions = [
      'Set Operations', 'Map Operations', 'Python Set Operations',
      'Python Map Functions', 'Python Dict Operations', 'Python Regex'
    ]
    if (pythonSelectedOptions.includes(componentName)) {
      setSelectedOptionAndRef(componentName)
      return
    }

    // Map topic names from progressService to componentModalMap names
    const topicNameMap = {
      'StreamsAdvanced': 'Streams Advanced',
      'LambdasAdvanced': 'Lambdas Advanced',
      'FunctionalInterfaces': 'Functional Interfaces',
      'CollectionsFramework': 'Collections Framework',
      'ObjectOrientedProgramming': 'Object-Oriented Programming',
      'ExceptionHandling': 'Exception Handling',
      'FileIO': 'File I/O',
      'MemoryManagement': 'Memory Management',
      'DesignPatternsInteractive': 'Design Patterns Practice',
      'DesignProblems': 'Design Problems',
      'LRUCache': 'LRU Cache',
      'RateLimiter': 'Rate Limiter',
      'BinarySearch': 'Binary Search',
      'DynamicProgramming': 'Dynamic Programming',
      'HashTables': 'Hash Tables',
      'LinkedLists': 'Linked Lists',
      'UnionFind': 'Union Find',
      'DataStructures': 'Data Structures',
      'JVMInternals': 'JVM Internals'
    }

    // Apply topic name mapping if needed
    if (topicNameMap[componentName]) {
      componentName = topicNameMap[componentName]
    }

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
      'Optional': setShowOptionalModal,
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
      'Trie': setShowTrieModal,
      'Backtracking': setShowBacktrackingModal,
      'Advanced Graphs': setShowAdvancedGraphsModal,
      'Greedy Algorithms': setShowGreedyAlgorithmsModal,
      'Intervals': setShowIntervalsModal,
      'Math & Geometry': setShowMathGeometryModal,
      'Sliding Window': setShowSlidingWindowModal,
      'Famous Algorithms': setShowFamousAlgorithmsModal,
      'Two Pointers': setShowTwoPointersModal,
      'Bit Manipulation': setShowBitManipulationModal,
      'Binary Trees': setShowBinaryTreesModal,
      'Binary Search Trees': setShowBinarySearchTreesModal,
      'Searching': setShowSearchingModal,
      'System Design': setShowSystemDesignModal
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
        'Optional': () => setShowOptionalModal(false),
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
        'Optional': () => setShowOptionalModal(false),
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
        'Optional': () => setShowOptionalModal(false),
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
        'Optional': () => setShowOptionalModal(false),
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

    // Create close function for current component
    const closeCurrentModal = {
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
      'Trie': () => setShowTrieModal(false),
      'Advanced Graphs': () => setShowAdvancedGraphsModal(false),
      'Backtracking': () => setShowBacktrackingModal(false),
      'Greedy Algorithms': () => setShowGreedyAlgorithmsModal(false),
      'Intervals': () => setShowIntervalsModal(false),
      'Math Geometry': () => setShowMathGeometryModal(false),
      'Searching': () => setShowSearchingModal(false),
      'Sliding Window': () => setShowSlidingWindowModal(false),
      'Two Pointers': () => setShowTwoPointersModal(false),
      'Famous Algorithms': () => setShowFamousAlgorithmsModal(false),
      'Bit Manipulation': () => setShowBitManipulationModal(false)
    }[currentComponentName]

    // Breadcrumb for Practice section navigation (legacy format)
    const breadcrumb = {
      section: {
        name: 'Practice',
        icon: '🎯',
        onClick: () => {
          if (closeCurrentModal) closeCurrentModal()
          setSelectedOptionAndRef('Practice')
        }
      },
      category: currentSubcategory ? {
        name: currentSubcategory,
        onClick: () => {
          if (closeCurrentModal) closeCurrentModal()
          setSelectedOptionAndRef('Practice')
        }
      } : null,
      topic: currentComponentName
    }

    // New cumulative breadcrumb stack format
    // Build initial stack based on current navigation state
    const buildBreadcrumbStack = () => {
      const stack = [
        { name: 'Practice', icon: '💪', page: 'Practice' }
      ]
      if (currentSubcategory) {
        stack.push({ name: currentSubcategory, page: 'Practice' })
      }
      stack.push({ name: currentComponentName, page: null })
      return stack
    }

    return {
      onPrevious,
      onNext,
      previousName,
      nextName,
      currentSubcategory,
      previousSubcategory,
      nextSubcategory,
      onPreviousSubcategory,
      onNextSubcategory,
      breadcrumb,
      // New breadcrumb stack props
      breadcrumbStack: buildBreadcrumbStack(),
      onBreadcrumbClick: navigateToBreadcrumb,
      pushBreadcrumb,
      breadcrumbColors: BREADCRUMB_COLORS.Practice
    }
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
      setShowPLSQLModal(false)
      setShowStoredProceduresModal(false)
      setShowDatabaseOptimizationModal(false)

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
      } else if (componentName === 'PLSQL') {
        setShowPLSQLModal(true)
      } else if (componentName === 'StoredProcedures') {
        setShowStoredProceduresModal(true)
      } else if (componentName === 'DatabaseOptimization') {
        setShowDatabaseOptimizationModal(true)
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
            [showOptionalModal, setShowOptionalModal],
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
            [showZipkinModal, setShowZipkinModal],
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
            [showEtradingQuestionsModal, setShowEtradingQuestionsModal],
            [showSystemDesignQuestionsModal, setShowSystemDesignQuestionsModal],
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
          const itemCount = categoryData.items?.length || 0
          AriaUtils.announce(`${categoryName} category expanded, ${itemCount} items available`);
          // Focus first item after DOM updates
          setTimeout(() => {
            const firstItem = document.querySelector('[data-item-index="0"]')
            if (firstItem) {
              firstItem.focus()
            }
          }, 50)
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
              const itemCount = categoryData.items?.length || 0
              AriaUtils.announce(`${categoryName} category expanded, ${itemCount} items available`);
              // Focus first item after DOM updates
              setTimeout(() => {
                const firstItem = document.querySelector('[data-item-index="0"]')
                if (firstItem) {
                  firstItem.focus()
                }
              }, 50)
            } else {
              AriaUtils.announce(`${categoryName} category collapsed`);
            }
          }
        }
      } else {
        // Navigate between expanded items
        const categoryData = categoryGroups[expandedGroup]
        const items = categoryData.items || []

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
    showOptionalModal,
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
    showZipkinModal,
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
    showSpringAnnotationsQuestionsModal,
    showEtradingQuestionsModal
  ]);

  // Design topic category mapping for breadcrumbs (component level for modal access)
  const designTopicCategories = {
    'Design Patterns': { name: 'Software Patterns', id: 'patterns' },
    'Class': { name: 'Software Patterns', id: 'patterns' },
    'Module': { name: 'Software Patterns', id: 'patterns' },
    'Function': { name: 'Software Patterns', id: 'patterns' },
    'Interface': { name: 'Software Patterns', id: 'patterns' },
    'System Design': { name: 'Architecture', id: 'architecture' },
    'Microservice Design Patterns': { name: 'Architecture', id: 'architecture' },
    'Event Driven Architecture': { name: 'Architecture', id: 'architecture' },
    'Domain Driven Design': { name: 'Architecture', id: 'architecture' }
  }

  // Helper function to navigate to Design with a specific category
  const goToDesignCategory = (categoryId) => {
    setDesignInitialCategory(categoryId)
    setSelectedOptionAndRef('Design')
  }

  // Python topic category mapping for breadcrumbs
  const pythonTopicCategories = {
    'Core Python': { name: 'Fundamentals', id: 'fundamentals' },
    'Python OOP': { name: 'Fundamentals', id: 'fundamentals' },
    'Index Slicing': { name: 'Fundamentals', id: 'fundamentals' },
    'Bitwise Operations': { name: 'Fundamentals', id: 'fundamentals' },
    'Python Set Operations': { name: 'Data Structures & Collections', id: 'data-structures' },
    'Python Dict Operations': { name: 'Data Structures & Collections', id: 'data-structures' },
    'Python Tuples': { name: 'Data Structures & Collections', id: 'data-structures' },
    'List Comprehension': { name: 'Data Structures & Collections', id: 'data-structures' },
    'Sorting Algorithms': { name: 'Algorithms', id: 'algorithms' },
    'String Algorithms': { name: 'Algorithms', id: 'algorithms' },
    'DP Patterns': { name: 'Algorithms', id: 'algorithms' },
    'Lambda': { name: 'Functional Programming', id: 'functional' },
    'Python Map Functions': { name: 'Functional Programming', id: 'functional' },
    'Itertools': { name: 'Modules & Utilities', id: 'modules' },
    'Collections Module': { name: 'Modules & Utilities', id: 'modules' },
    'Sorting Functions': { name: 'Modules & Utilities', id: 'modules' },
    'Bisect Functions': { name: 'Modules & Utilities', id: 'modules' },
    'Python String Methods': { name: 'Modules & Utilities', id: 'modules' },
    'Python Advanced': { name: 'Advanced Topics', id: 'advanced' },
    'Async Python': { name: 'Advanced Topics', id: 'advanced' },
    'Web Frameworks': { name: 'Web Development', id: 'web' },
    'Data Science': { name: 'Data Science & ML', id: 'data-science' },
    'Machine Learning': { name: 'Data Science & ML', id: 'data-science' },
    'Python Heaps': { name: 'Reference & Best Practices', id: 'reference' },
    'Python Pitfalls': { name: 'Reference & Best Practices', id: 'reference' },
    'Python Regex': { name: 'Reference & Best Practices', id: 'reference' },
    'LeetCode Patterns': { name: 'Interview Preparation', id: 'interview' }
  }

  // Helper function to navigate to Python with a specific category
  const goToPythonCategory = (categoryId) => {
    setPythonInitialCategory(categoryId)
    setSelectedOptionAndRef('Python')
  }

  // Java topic category mapping for breadcrumbs
  const javaTopicCategories = {
    'Core Java': { name: 'Fundamentals', id: 'fundamentals' },
    'Java 8': { name: 'Modern Java (8-11)', id: 'modern-java' },
    'Java 11': { name: 'Modern Java (8-11)', id: 'modern-java' },
    'Java 15': { name: 'Recent Releases (15-21)', id: 'recent-releases' },
    'Java 21': { name: 'Recent Releases (15-21)', id: 'recent-releases' },
    'Java 24': { name: 'Preview Features', id: 'preview' }
  }

  // Helper function to navigate to Java with a specific category
  const goToJavaCategory = (categoryId) => {
    setJavaInitialCategory(categoryId)
    setSelectedOptionAndRef('Java')
  }

  // Security topic category mapping for breadcrumbs
  const securityTopicCategories = {
    'JWT': { name: 'Authentication', id: 'authentication' },
    'OAuth': { name: 'Authentication', id: 'authentication' },
    'OAuth2': { name: 'Authentication', id: 'authentication' }
  }

  // Helper function to navigate to Security with a specific category
  const goToSecurityCategory = (categoryId) => {
    setSecurityInitialCategory(categoryId)
    setSelectedOptionAndRef('Security')
  }

  // Database topic category mapping for breadcrumbs
  const databaseTopicCategories = {
    'SQL': { name: 'Relational', id: 'relational' },
    'Oracle': { name: 'Relational', id: 'relational' },
    'PLSQL': { name: 'Relational', id: 'relational' },
    'NoSQL': { name: 'Non-Relational', id: 'non-relational' },
    'Redis': { name: 'Non-Relational', id: 'non-relational' },
    'ORM': { name: 'Data Access', id: 'data-access' },
    'StoredProcedures': { name: 'Procedural', id: 'procedural' },
    'DatabaseOptimization': { name: 'Performance', id: 'performance' }
  }

  // Helper function to navigate to Databases with a specific category
  const goToDatabasesCategory = (categoryId) => {
    setDatabasesInitialCategory(categoryId)
    setSelectedOptionAndRef('Databases')
  }

  // Frameworks topic category mapping for breadcrumbs
  const frameworksTopicCategories = {
    'Spring': { name: 'Spring Ecosystem', id: 'spring' },
    'SpringBoot': { name: 'Spring Ecosystem', id: 'spring' },
    'Hibernate': { name: 'Spring Ecosystem', id: 'spring' },
    'Actuator': { name: 'Spring Ecosystem', id: 'spring' },
    'Zipkin': { name: 'Spring Ecosystem', id: 'spring' },
    'RestAPI': { name: 'API Development', id: 'api' },
    'GRPC': { name: 'API Development', id: 'api' },
    'SOAP': { name: 'API Development', id: 'api' },
    'React': { name: 'Frontend', id: 'frontend' }
  }

  // Helper function to navigate to Frameworks with a specific category
  const goToFrameworksCategory = (categoryId) => {
    setFrameworksInitialCategory(categoryId)
    setSelectedOptionAndRef('Frameworks')
  }

  // DevOps topic category mapping for breadcrumbs
  const devopsTopicCategories = {
    'Docker': { name: 'Containerization', id: 'containerization' },
    'Kubernetes': { name: 'Containerization', id: 'containerization' },
    'Deployment': { name: 'CI/CD & Build Tools', id: 'cicd' },
    'CICD': { name: 'CI/CD & Build Tools', id: 'cicd' },
    'TeamCity': { name: 'CI/CD & Build Tools', id: 'cicd' },
    'Jenkins': { name: 'CI/CD & Build Tools', id: 'cicd' },
    'Testing': { name: 'Methodology & Quality', id: 'methodology' },
    'AgileScrum': { name: 'Methodology & Quality', id: 'methodology' },
    'ProductionSupport': { name: 'Monitoring & Observability', id: 'monitoring' },
    'Prometheus': { name: 'Monitoring & Observability', id: 'monitoring' },
    'Grafana': { name: 'Monitoring & Observability', id: 'monitoring' },
    'SecurityOWASP': { name: 'Security & Authentication', id: 'security' }
  }

  // Helper function to navigate to DevOps with a specific category
  const goToDevopsCategory = (categoryId) => {
    setDevopsInitialCategory(categoryId)
    setSelectedOptionAndRef('DevOps')
  }

  // Messaging topic category mapping for breadcrumbs
  const messagingTopicCategories = {
    'Kafka': { name: 'Event Streaming', id: 'streaming' },
    'ApacheFlink': { name: 'Event Streaming', id: 'streaming' },
    'RabbitMQ': { name: 'Message Brokers', id: 'brokers' },
    'Solace': { name: 'Message Brokers', id: 'brokers' }
  }

  // Helper function to navigate to Messaging with a specific category
  const goToMessagingCategory = (categoryId) => {
    setMessagingInitialCategory(categoryId)
    setSelectedOptionAndRef('Messaging')
  }

  // Cloud topic category mapping for breadcrumbs
  const cloudTopicCategories = {
    'AWS': { name: 'Cloud Providers', id: 'providers' },
    'GCP': { name: 'Cloud Providers', id: 'providers' },
    'Azure': { name: 'Cloud Providers', id: 'providers' }
  }

  // Helper function to navigate to Cloud with a specific category
  const goToCloudCategory = (categoryId) => {
    setCloudInitialCategory(categoryId)
    setSelectedOptionAndRef('Cloud')
  }

  // Component rendering logic
  const renderSelectedComponent = () => {
    if (selectedOption === 'Java') {
      return <Java
        onBack={() => {
          setJavaInitialCategory(null)
          setSelectedOptionAndRef('')
        }}
        onSelectItem={(item) => {
          // Open the appropriate Java version component
          setSelectedOptionAndRef(item)
        }}
        initialCategory={javaInitialCategory}
        breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef('') }}
      />
    }
    if (selectedOption === 'Python') {
      return <Python
        onBack={() => {
          setPythonInitialCategory(null)
          setSelectedOptionAndRef('')
        }}
        onSelectItem={(item) => {
          setSelectedOptionAndRef(item)
        }}
        initialCategory={pythonInitialCategory}
        breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef('') }}
      />
    }

    // Python topic routes
    if (selectedOption === 'Core Python') {
      return <CorePython onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['Core Python'].name, onClick: () => goToPythonCategory(pythonTopicCategories['Core Python'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'Core Python' }} />
    }
    if (selectedOption === 'Python OOP') {
      return <PythonOOP onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['Python OOP'].name, onClick: () => goToPythonCategory(pythonTopicCategories['Python OOP'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'Object-Oriented Programming' }} />
    }
    if (selectedOption === 'Index Slicing') {
      return <IndexSlicing onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['Index Slicing'].name, onClick: () => goToPythonCategory(pythonTopicCategories['Index Slicing'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'Index Slicing' }} />
    }
    if (selectedOption === 'Bitwise Operations') {
      return <BitwiseOperations onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['Bitwise Operations'].name, onClick: () => goToPythonCategory(pythonTopicCategories['Bitwise Operations'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'Bitwise Operations' }} />
    }
    if (selectedOption === 'List Comprehension') {
      return <ListComprehension onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['List Comprehension'].name, onClick: () => goToPythonCategory(pythonTopicCategories['List Comprehension'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'List Comprehension' }} />
    }
    if (selectedOption === 'Lambda') {
      return <LambdaFunctions onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['Lambda'].name, onClick: () => goToPythonCategory(pythonTopicCategories['Lambda'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'Lambda Functions' }} />
    }
    if (selectedOption === 'Bisect Functions') {
      return <BisectFunctions onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['Bisect Functions'].name, onClick: () => goToPythonCategory(pythonTopicCategories['Bisect Functions'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'Bisect Functions' }} />
    }
    if (selectedOption === 'Set Operations') {
      return <SetOperations onBack={() => setSelectedOptionAndRef('Practice')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Practice', icon: '📝', onClick: () => setSelectedOptionAndRef('Practice') }, topic: 'Set Operations', colors: BREADCRUMB_COLORS.Practice }} />
    }
    if (selectedOption === 'Map Operations') {
      return <MapOperations onBack={() => setSelectedOptionAndRef('Practice')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Practice', icon: '📝', onClick: () => setSelectedOptionAndRef('Practice') }, topic: 'Map Operations', colors: BREADCRUMB_COLORS.Practice }} />
    }
    if (selectedOption === 'Python Advanced') {
      return <PythonAdvanced onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['Python Advanced'].name, onClick: () => goToPythonCategory(pythonTopicCategories['Python Advanced'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'Python Advanced' }} />
    }
    if (selectedOption === 'Data Science') {
      return <DataScience onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['Data Science'].name, onClick: () => goToPythonCategory(pythonTopicCategories['Data Science'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'Data Science' }} />
    }
    if (selectedOption === 'Machine Learning') {
      return <MachineLearning onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['Machine Learning'].name, onClick: () => goToPythonCategory(pythonTopicCategories['Machine Learning'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'Machine Learning' }} />
    }
    if (selectedOption === 'Web Frameworks') {
      return <WebFrameworks onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['Web Frameworks'].name, onClick: () => goToPythonCategory(pythonTopicCategories['Web Frameworks'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'Web Frameworks' }} />
    }
    if (selectedOption === 'Async Python') {
      return <AsyncPython onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['Async Python'].name, onClick: () => goToPythonCategory(pythonTopicCategories['Async Python'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'Async Python' }} />
    }
    if (selectedOption === 'Python Set Operations') {
      return <PythonSetOperations onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['Python Set Operations'].name, onClick: () => goToPythonCategory(pythonTopicCategories['Python Set Operations'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'Set Operations' }} />
    }
    if (selectedOption === 'Python Dict Operations') {
      return <PythonDictOperations onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['Python Dict Operations'].name, onClick: () => goToPythonCategory(pythonTopicCategories['Python Dict Operations'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'Dictionary Operations' }} />
    }
    if (selectedOption === 'Python Tuples') {
      return <PythonTuples onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['Python Tuples'].name, onClick: () => goToPythonCategory(pythonTopicCategories['Python Tuples'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'Tuple Operations' }} />
    }
    if (selectedOption === 'Python Map Functions') {
      return <PythonMapFunctions onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['Python Map Functions'].name, onClick: () => goToPythonCategory(pythonTopicCategories['Python Map Functions'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'Map Functions' }} />
    }
    if (selectedOption === 'Python String Methods') {
      return <PythonStringMethods onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['Python String Methods'].name, onClick: () => goToPythonCategory(pythonTopicCategories['Python String Methods'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'String Methods' }} />
    }
    if (selectedOption === 'Python Heaps') {
      return <PythonHeaps onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['Python Heaps'].name, onClick: () => goToPythonCategory(pythonTopicCategories['Python Heaps'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'Heaps Reference' }} />
    }
    if (selectedOption === 'Python Pitfalls') {
      return <PythonPitfalls onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['Python Pitfalls'].name, onClick: () => goToPythonCategory(pythonTopicCategories['Python Pitfalls'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'Common Pitfalls' }} />
    }
    if (selectedOption === 'Python Regex') {
      return <PythonRegex onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['Python Regex'].name, onClick: () => goToPythonCategory(pythonTopicCategories['Python Regex'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'Regular Expressions' }} />
    }
    if (selectedOption === 'Itertools') {
      return <Itertools onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['Itertools'].name, onClick: () => goToPythonCategory(pythonTopicCategories['Itertools'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'Itertools' }} />
    }
    if (selectedOption === 'Collections Module') {
      return <CollectionsModule onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['Collections Module'].name, onClick: () => goToPythonCategory(pythonTopicCategories['Collections Module'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'Collections Module' }} />
    }
    if (selectedOption === 'Sorting Functions') {
      return <SortingFunctions onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['Sorting Functions'].name, onClick: () => goToPythonCategory(pythonTopicCategories['Sorting Functions'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'Sorting Functions' }} />
    }
    if (selectedOption === 'LeetCode Patterns') {
      return <LeetCodePatterns onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['LeetCode Patterns'].name, onClick: () => goToPythonCategory(pythonTopicCategories['LeetCode Patterns'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'LeetCode Patterns' }} />
    }
    if (selectedOption === 'DP Patterns') {
      return <DynamicProgrammingPatterns onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['DP Patterns'].name, onClick: () => goToPythonCategory(pythonTopicCategories['DP Patterns'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'DP Patterns' }} />
    }
    if (selectedOption === 'Sorting Algorithms') {
      return <SortingAlgorithms onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['Sorting Algorithms'].name, onClick: () => goToPythonCategory(pythonTopicCategories['Sorting Algorithms'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'Sorting Algorithms' }} />
    }
    if (selectedOption === 'String Algorithms') {
      return <StringAlgorithms onBack={() => setSelectedOptionAndRef('Python')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Python', icon: '🐍', onClick: () => setSelectedOptionAndRef('Python') }, category: { name: pythonTopicCategories['String Algorithms'].name, onClick: () => goToPythonCategory(pythonTopicCategories['String Algorithms'].id) }, colors: BREADCRUMB_COLORS.Python, topic: 'String Algorithms' }} />
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
    if (selectedOption === 'L3 System Design') {
      return (
        <Suspense fallback={<LoadingSpinner text="Loading L3 System Design..." />}>
          <L3SystemDesign onBack={() => {
            setDesignInitialCategory('interview')
            setSelectedOptionAndRef('Design')
          }} />
        </Suspense>
      )
    }
    if (selectedOption === 'L4 System Design') {
      return (
        <Suspense fallback={<LoadingSpinner text="Loading L4 System Design..." />}>
          <L4SystemDesign onBack={() => {
            setDesignInitialCategory('interview')
            setSelectedOptionAndRef('Design')
          }} />
        </Suspense>
      )
    }
    if (selectedOption === 'L5 System Design') {
      return (
        <Suspense fallback={<LoadingSpinner text="Loading L5 System Design..." />}>
          <L5SystemDesign onBack={() => {
            setDesignInitialCategory('interview')
            setSelectedOptionAndRef('Design')
          }} />
        </Suspense>
      )
    }
    if (selectedOption === 'Design') {
      return <Design
        onBack={() => {
          setDesignInitialCategory(null)
          setSelectedOptionAndRef('')
        }}
        onSelectItem={(item) => {
          // Open the appropriate design topic
          setSelectedOptionAndRef(item)
        }}
        initialCategory={designInitialCategory}
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
    if (selectedOption === 'Progress Dashboard') {
      return <ProgressDashboard
        onBack={() => setSelectedOptionAndRef('')}
        onNavigate={(item) => {
          // Handle question topics by opening their modals
          const questionModals = {
            'Java Questions': setShowJavaQuestionsModal,
            'Core Java Questions': setShowCoreJavaQuestionsModal,
            'Java 8 Questions': setShowJava8QuestionsModal,
            'Java 11 Questions': setShowJava11QuestionsModal,
            'Java 15 Questions': setShowJava15QuestionsModal,
            'Java 21 Questions': setShowJava21QuestionsModal,
            'Java 24 Questions': setShowJava24QuestionsModal,
            'Spring Core Questions': setShowSpringCoreQuestionsModal,
            'Spring Boot Questions': setShowSpringBootQuestionsModal,
            'Spring Security Questions': setShowSpringSecurityQuestionsModal,
            'Spring Data JPA Questions': setShowSpringDataJPAQuestionsModal,
            'Spring Annotations Questions': setShowSpringAnnotationsQuestionsModal,
            'SQL Questions': setShowSQLQuestionsModal,
            'NoSQL Questions': setShowNoSQLQuestionsModal,
            'ORM Questions': setShowORMQuestionsModal,
            'Hibernate Questions': setShowHibernateQuestionsModal,
            'Kafka Questions': setShowKafkaQuestionsModal,
            'RabbitMQ Questions': setShowRabbitMQQuestionsModal,
            'Solace Questions': setShowSolaceQuestionsModal,
            'Apache Flink Questions': setShowApacheFlinkQuestionsModal,
            'Jenkins Questions': setShowJenkinsQuestionsModal,
            'TeamCity Questions': setShowTeamCityQuestionsModal,
            'Prometheus Questions': setShowPrometheusQuestionsModal,
            'Grafana Questions': setShowGrafanaQuestionsModal,
            'Zipkin Questions': setShowZipkinQuestionsModal,
            'Actuator Questions': setShowActuatorQuestionsModal,
            'REST API Questions': setShowRestAPIQuestionsModal,
            'eTrading Questions': setShowEtradingQuestionsModal,
            'System Design Questions': setShowSystemDesignQuestionsModal,
          }

          if (questionModals[item]) {
            questionModals[item](true)
          } else {
            setSelectedOptionAndRef(item)
          }
        }}
      />
    }
    if (selectedOption === 'AI Interview') {
      return <AIInterview
        onBack={() => setSelectedOptionAndRef('Practice')}
        onSettings={() => setSelectedOptionAndRef('Settings')}
      />
    }
    if (selectedOption === 'Settings') {
      return <Settings
        onBack={() => setSelectedOptionAndRef('')}
      />
    }
    if (selectedOption === 'Frameworks') {
      return <Frameworks
        onBack={() => setSelectedOptionAndRef('')}
        breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef('') }}
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
        initialCategory={devopsInitialCategory}
        onInitialCategoryUsed={() => setDevopsInitialCategory(null)}
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
    if (selectedOption === 'Messaging') {
      return <Messaging
        onBack={() => setSelectedOptionAndRef('')}
        onSelectItem={(item) => {
          // Open the appropriate messaging topic
          setSelectedOptionAndRef(item)
        }}
      />
    }
    if (selectedOption === 'eTrading') {
      return <ETrading
        onBack={() => setSelectedOptionAndRef('')}
        onSelectItem={(item) => {
          // Open the appropriate eTrading topic
          setSelectedOptionAndRef(item)
        }}
      />
    }
    // eTrading topic pages
    if (selectedOption === 'RFQ Systems') {
      return <RFQSystems
        onBack={() => setSelectedOptionAndRef('eTrading')}
        breadcrumb={{
          onMainMenu: () => setSelectedOptionAndRef(''),
          section: { name: 'eTrading', icon: '📈', onClick: () => setSelectedOptionAndRef('eTrading') },
          topic: 'RFQ Systems',
          colors: BREADCRUMB_COLORS.eTrading
        }}
      />
    }
    if (selectedOption === 'Fixed Income Trading') {
      return <FixedIncomeTrading
        onBack={() => setSelectedOptionAndRef('eTrading')}
        breadcrumb={{
          onMainMenu: () => setSelectedOptionAndRef(''),
          section: { name: 'eTrading', icon: '📈', onClick: () => setSelectedOptionAndRef('eTrading') },
          topic: 'Fixed Income Trading',
          colors: BREADCRUMB_COLORS.eTrading
        }}
      />
    }
    if (selectedOption === 'Aeron Messaging') {
      return <AeronMessaging
        onBack={() => setSelectedOptionAndRef('eTrading')}
        breadcrumb={{
          onMainMenu: () => setSelectedOptionAndRef(''),
          section: { name: 'eTrading', icon: '📈', onClick: () => setSelectedOptionAndRef('eTrading') },
          topic: 'Aeron Messaging',
          colors: BREADCRUMB_COLORS.eTrading
        }}
      />
    }
    if (selectedOption === 'Low Latency') {
      return <LowLatency
        onBack={() => setSelectedOptionAndRef('eTrading')}
        breadcrumb={{
          onMainMenu: () => setSelectedOptionAndRef(''),
          section: { name: 'eTrading', icon: '📈', onClick: () => setSelectedOptionAndRef('eTrading') },
          topic: 'Low Latency Systems',
          colors: BREADCRUMB_COLORS.eTrading
        }}
      />
    }
    if (selectedOption === 'Latency Measurement') {
      return <LatencyMeasurement
        onBack={() => setSelectedOptionAndRef('eTrading')}
        breadcrumb={{
          onMainMenu: () => setSelectedOptionAndRef(''),
          section: { name: 'eTrading', icon: '📈', onClick: () => setSelectedOptionAndRef('eTrading') },
          topic: 'Latency Measurement',
          colors: BREADCRUMB_COLORS.eTrading
        }}
      />
    }
    if (selectedOption === 'Order Management') {
      return <OrderManagement
        onBack={() => setSelectedOptionAndRef('eTrading')}
        breadcrumb={{
          onMainMenu: () => setSelectedOptionAndRef(''),
          section: { name: 'eTrading', icon: '📈', onClick: () => setSelectedOptionAndRef('eTrading') },
          topic: 'Order Management',
          colors: BREADCRUMB_COLORS.eTrading
        }}
      />
    }
    if (selectedOption === 'Execution Algorithms') {
      return <ExecutionAlgorithms
        onBack={() => setSelectedOptionAndRef('eTrading')}
        breadcrumb={{
          onMainMenu: () => setSelectedOptionAndRef(''),
          section: { name: 'eTrading', icon: '📈', onClick: () => setSelectedOptionAndRef('eTrading') },
          topic: 'Execution Algorithms',
          colors: BREADCRUMB_COLORS.eTrading
        }}
      />
    }
    if (selectedOption === 'Automated Hedging') {
      return <AutomatedHedging
        onBack={() => setSelectedOptionAndRef('eTrading')}
        breadcrumb={{
          onMainMenu: () => setSelectedOptionAndRef(''),
          section: { name: 'eTrading', icon: '📈', onClick: () => setSelectedOptionAndRef('eTrading') },
          topic: 'Automated Hedging',
          colors: BREADCRUMB_COLORS.eTrading
        }}
      />
    }
    if (selectedOption === 'FIX Protocol') {
      return <FIXProtocol
        onBack={() => setSelectedOptionAndRef('eTrading')}
        breadcrumb={{
          onMainMenu: () => setSelectedOptionAndRef(''),
          section: { name: 'eTrading', icon: '📈', onClick: () => setSelectedOptionAndRef('eTrading') },
          topic: 'FIX Protocol',
          colors: BREADCRUMB_COLORS.eTrading
        }}
      />
    }
    if (selectedOption === 'Java Trading') {
      return <JavaTrading
        onBack={() => setSelectedOptionAndRef('eTrading')}
        breadcrumb={{
          onMainMenu: () => setSelectedOptionAndRef(''),
          section: { name: 'eTrading', icon: '📈', onClick: () => setSelectedOptionAndRef('eTrading') },
          topic: 'Java for Trading',
          colors: BREADCRUMB_COLORS.eTrading
        }}
      />
    }
    if (selectedOption === 'Risk Management') {
      return <RiskManagement
        onBack={() => setSelectedOptionAndRef('eTrading')}
        breadcrumb={{
          onMainMenu: () => setSelectedOptionAndRef(''),
          section: { name: 'eTrading', icon: '📈', onClick: () => setSelectedOptionAndRef('eTrading') },
          topic: 'Risk Management',
          colors: BREADCRUMB_COLORS.eTrading
        }}
      />
    }
    if (selectedOption === 'Price Contribution') {
      return <PriceContribution
        onBack={() => setSelectedOptionAndRef('eTrading')}
        breadcrumb={{
          onMainMenu: () => setSelectedOptionAndRef(''),
          section: { name: 'eTrading', icon: '📈', onClick: () => setSelectedOptionAndRef('eTrading') },
          topic: 'Real-time Pricing',
          colors: BREADCRUMB_COLORS.eTrading
        }}
      />
    }
    if (selectedOption === 'Distributed Systems') {
      return <DistributedSystems
        onBack={() => setSelectedOptionAndRef('eTrading')}
        breadcrumb={{
          onMainMenu: () => setSelectedOptionAndRef(''),
          section: { name: 'eTrading', icon: '📈', onClick: () => setSelectedOptionAndRef('eTrading') },
          topic: 'Distributed Systems',
          colors: BREADCRUMB_COLORS.eTrading
        }}
      />
    }
    if (selectedOption === 'Disruptor Pattern') {
      return <DisruptorPattern
        onBack={() => setSelectedOptionAndRef('eTrading')}
        breadcrumb={{
          onMainMenu: () => setSelectedOptionAndRef(''),
          section: { name: 'eTrading', icon: '📈', onClick: () => setSelectedOptionAndRef('eTrading') },
          topic: 'Disruptor Pattern',
          colors: BREADCRUMB_COLORS.eTrading
        }}
      />
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
      return <CoreJava onBack={() => setSelectedOptionAndRef('Java')} {...navCallbacks} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Java', icon: '☕', onClick: () => setSelectedOptionAndRef('Java') }, category: { name: javaTopicCategories['Core Java'].name, onClick: () => goToJavaCategory(javaTopicCategories['Core Java'].id) }, colors: BREADCRUMB_COLORS.Java, topic: 'Core Java' }} />
    }
    if (selectedOption === 'Function') {
      setShowFunctionModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Java 11') {
      const navCallbacks = createLearningNavigationCallbacks('Java 11')
      return <Java11 onBack={() => setSelectedOptionAndRef('Java')} {...navCallbacks} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Java', icon: '☕', onClick: () => setSelectedOptionAndRef('Java') }, category: { name: javaTopicCategories['Java 11'].name, onClick: () => goToJavaCategory(javaTopicCategories['Java 11'].id) }, colors: BREADCRUMB_COLORS.Java, topic: 'Java 11 LTS' }} />
    }
    if (selectedOption === 'Java 8') {
      const navCallbacks = createLearningNavigationCallbacks('Java 8')
      return <Java8 onBack={() => setSelectedOptionAndRef('Java')} {...navCallbacks} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Java', icon: '☕', onClick: () => setSelectedOptionAndRef('Java') }, category: { name: javaTopicCategories['Java 8'].name, onClick: () => goToJavaCategory(javaTopicCategories['Java 8'].id) }, colors: BREADCRUMB_COLORS.Java, topic: 'Java 8' }} />
    }
    if (selectedOption === 'Java 15') {
      const navCallbacks = createLearningNavigationCallbacks('Java 15')
      return <Java15 onBack={() => setSelectedOptionAndRef('Java')} {...navCallbacks} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Java', icon: '☕', onClick: () => setSelectedOptionAndRef('Java') }, category: { name: javaTopicCategories['Java 15'].name, onClick: () => goToJavaCategory(javaTopicCategories['Java 15'].id) }, colors: BREADCRUMB_COLORS.Java, topic: 'Java 15' }} />
    }
    if (selectedOption === 'Java 21') {
      const navCallbacks = createLearningNavigationCallbacks('Java 21')
      return <Java21 onBack={() => setSelectedOptionAndRef('Java')} {...navCallbacks} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Java', icon: '☕', onClick: () => setSelectedOptionAndRef('Java') }, category: { name: javaTopicCategories['Java 21'].name, onClick: () => goToJavaCategory(javaTopicCategories['Java 21'].id) }, colors: BREADCRUMB_COLORS.Java, topic: 'Java 21 LTS' }} />
    }
    if (selectedOption === 'Java 24') {
      const navCallbacks = createLearningNavigationCallbacks('Java 24')
      return <Java24 onBack={() => setSelectedOptionAndRef('Java')} {...navCallbacks} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Java', icon: '☕', onClick: () => setSelectedOptionAndRef('Java') }, category: { name: javaTopicCategories['Java 24'].name, onClick: () => goToJavaCategory(javaTopicCategories['Java 24'].id) }, colors: BREADCRUMB_COLORS.Java, topic: 'Java 24 Preview' }} />
    }
    if (selectedOption === 'Design Patterns') {
      setShowDesignPatternsModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Dependency Injection') {
      const navCallbacks = createLearningNavigationCallbacks('Dependency Injection')
      return <DependencyInjection onBack={() => setSelectedOptionAndRef('')} {...navCallbacks} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Spring', icon: '🌱', onClick: () => setSelectedOptionAndRef('Spring') }, topic: 'Dependency Injection', colors: BREADCRUMB_COLORS.Spring }} />
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
    if (selectedOption === 'PL/SQL') {
      setShowPLSQLModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'StoredProcedures') {
      setShowStoredProceduresModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'DatabaseOptimization') {
      setShowDatabaseOptimizationModal(true)
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
    if (selectedOption === 'Zipkin') {
      setShowZipkinModal(true)
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
      return <JWT onBack={() => setSelectedOptionAndRef('Security')} {...createDevOpsNavigationCallbacks('JWT')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Security', icon: '🔒', onClick: () => setSelectedOptionAndRef('Security') },
        category: { name: securityTopicCategories['JWT'].name, onClick: () => goToSecurityCategory(securityTopicCategories['JWT'].id) },
        topic: 'JWT (JSON Web Tokens)',
        colors: BREADCRUMB_COLORS.Security
      }} />
    }
    if (selectedOption === 'OAuth') {
      return <OAuth onBack={() => setSelectedOptionAndRef('Security')} {...createDevOpsNavigationCallbacks('OAuth')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Security', icon: '🔒', onClick: () => setSelectedOptionAndRef('Security') },
        category: { name: securityTopicCategories['OAuth'].name, onClick: () => goToSecurityCategory(securityTopicCategories['OAuth'].id) },
        topic: 'OAuth 1.0',
        colors: BREADCRUMB_COLORS.Security
      }} />
    }
    if (selectedOption === 'OAuth2') {
      return <OAuth2 onBack={() => setSelectedOptionAndRef('Security')} {...createDevOpsNavigationCallbacks('OAuth2')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Security', icon: '🔒', onClick: () => setSelectedOptionAndRef('Security') },
        category: { name: securityTopicCategories['OAuth2'].name, onClick: () => goToSecurityCategory(securityTopicCategories['OAuth2'].id) },
        topic: 'OAuth 2.0',
        colors: BREADCRUMB_COLORS.Security
      }} />
    }
    if (selectedOption === 'System Design') {
      setShowSystemDesignModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    // System Design Concepts
    if (selectedOption === 'Load Balancing') {
      return <LoadBalancing onBack={() => { setDesignInitialCategory('concepts'); setSelectedOptionAndRef('Design'); }} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => setSelectedOptionAndRef('Design') },
        category: { name: 'System Design Topics', onClick: () => goToDesignCategory('concepts') },
        topic: 'Load Balancing',
        colors: BREADCRUMB_COLORS.Design
      }} />
    }
    if (selectedOption === 'Caching Strategies') {
      return <CachingStrategies onBack={() => { setDesignInitialCategory('concepts'); setSelectedOptionAndRef('Design'); }} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => setSelectedOptionAndRef('Design') },
        category: { name: 'System Design Topics', onClick: () => goToDesignCategory('concepts') },
        topic: 'Caching Strategies',
        colors: BREADCRUMB_COLORS.Design
      }} />
    }
    if (selectedOption === 'Database Sharding') {
      return <DatabaseSharding onBack={() => { setDesignInitialCategory('concepts'); setSelectedOptionAndRef('Design'); }} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => setSelectedOptionAndRef('Design') },
        category: { name: 'System Design Topics', onClick: () => goToDesignCategory('concepts') },
        topic: 'Database Sharding',
        colors: BREADCRUMB_COLORS.Design
      }} />
    }
    if (selectedOption === 'CAP Theorem') {
      return <CAPTheorem onBack={() => { setDesignInitialCategory('concepts'); setSelectedOptionAndRef('Design'); }} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => setSelectedOptionAndRef('Design') },
        category: { name: 'System Design Topics', onClick: () => goToDesignCategory('concepts') },
        topic: 'CAP Theorem',
        colors: BREADCRUMB_COLORS.Design
      }} />
    }
    if (selectedOption === 'Consistency Patterns') {
      return <ConsistencyPatterns onBack={() => { setDesignInitialCategory('concepts'); setSelectedOptionAndRef('Design'); }} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => setSelectedOptionAndRef('Design') },
        category: { name: 'System Design Topics', onClick: () => goToDesignCategory('concepts') },
        topic: 'Consistency Patterns',
        colors: BREADCRUMB_COLORS.Design
      }} />
    }
    if (selectedOption === 'API Design') {
      return <APIDesign onBack={() => { setDesignInitialCategory('concepts'); setSelectedOptionAndRef('Design'); }} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => setSelectedOptionAndRef('Design') },
        category: { name: 'System Design Topics', onClick: () => goToDesignCategory('concepts') },
        topic: 'API Design & REST',
        colors: BREADCRUMB_COLORS.Design
      }} />
    }
    if (selectedOption === 'Message Queues') {
      return <MessageQueues onBack={() => { setDesignInitialCategory('concepts'); setSelectedOptionAndRef('Design'); }} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => setSelectedOptionAndRef('Design') },
        category: { name: 'System Design Topics', onClick: () => goToDesignCategory('concepts') },
        topic: 'Message Queues',
        colors: BREADCRUMB_COLORS.Design
      }} />
    }
    if (selectedOption === 'CDN') {
      return <CDN onBack={() => { setDesignInitialCategory('concepts'); setSelectedOptionAndRef('Design'); }} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => setSelectedOptionAndRef('Design') },
        category: { name: 'System Design Topics', onClick: () => goToDesignCategory('concepts') },
        topic: 'Content Delivery Network',
        colors: BREADCRUMB_COLORS.Design
      }} />
    }
    if (selectedOption === 'Database Replication') {
      return <DatabaseReplication onBack={() => { setDesignInitialCategory('concepts'); setSelectedOptionAndRef('Design'); }} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => setSelectedOptionAndRef('Design') },
        category: { name: 'System Design Topics', onClick: () => goToDesignCategory('concepts') },
        topic: 'Database Replication',
        colors: BREADCRUMB_COLORS.Design
      }} />
    }
    if (selectedOption === 'Scaling') {
      return <Scaling onBack={() => { setDesignInitialCategory('concepts'); setSelectedOptionAndRef('Design'); }} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => setSelectedOptionAndRef('Design') },
        category: { name: 'System Design Topics', onClick: () => goToDesignCategory('concepts') },
        topic: 'Horizontal vs Vertical Scaling',
        colors: BREADCRUMB_COLORS.Design
      }} />
    }
    if (selectedOption === 'Proxies') {
      return <Proxies onBack={() => { setDesignInitialCategory('concepts'); setSelectedOptionAndRef('Design'); }} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => setSelectedOptionAndRef('Design') },
        category: { name: 'System Design Topics', onClick: () => goToDesignCategory('concepts') },
        topic: 'Proxies & Reverse Proxies',
        colors: BREADCRUMB_COLORS.Design
      }} />
    }
    if (selectedOption === 'Data Partitioning') {
      return <DataPartitioning onBack={() => { setDesignInitialCategory('concepts'); setSelectedOptionAndRef('Design'); }} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => setSelectedOptionAndRef('Design') },
        category: { name: 'System Design Topics', onClick: () => goToDesignCategory('concepts') },
        topic: 'Data Partitioning',
        colors: BREADCRUMB_COLORS.Design
      }} />
    }
    if (selectedOption === 'SQL vs NoSQL') {
      return <SQLvsNoSQL onBack={() => { setDesignInitialCategory('concepts'); setSelectedOptionAndRef('Design'); }} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => setSelectedOptionAndRef('Design') },
        category: { name: 'System Design Topics', onClick: () => goToDesignCategory('concepts') },
        topic: 'SQL vs NoSQL',
        colors: BREADCRUMB_COLORS.Design
      }} />
    }
    if (selectedOption === 'Consistent Hashing') {
      return <ConsistentHashing onBack={() => { setDesignInitialCategory('concepts'); setSelectedOptionAndRef('Design'); }} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => setSelectedOptionAndRef('Design') },
        category: { name: 'System Design Topics', onClick: () => goToDesignCategory('concepts') },
        topic: 'Consistent Hashing',
        colors: BREADCRUMB_COLORS.Design
      }} />
    }
    if (selectedOption === 'WebSockets') {
      return <WebSockets onBack={() => { setDesignInitialCategory('concepts'); setSelectedOptionAndRef('Design'); }} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => setSelectedOptionAndRef('Design') },
        category: { name: 'System Design Topics', onClick: () => goToDesignCategory('concepts') },
        topic: 'Long Polling vs WebSockets',
        colors: BREADCRUMB_COLORS.Design
      }} />
    }
    if (selectedOption === 'Blob Storage') {
      return <BlobStorage onBack={() => { setDesignInitialCategory('concepts'); setSelectedOptionAndRef('Design'); }} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => setSelectedOptionAndRef('Design') },
        category: { name: 'System Design Topics', onClick: () => goToDesignCategory('concepts') },
        topic: 'Blob Storage',
        colors: BREADCRUMB_COLORS.Design
      }} />
    }
    if (selectedOption === 'Microservices') {
      return <Microservices onBack={() => { setDesignInitialCategory('concepts'); setSelectedOptionAndRef('Design'); }} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => setSelectedOptionAndRef('Design') },
        category: { name: 'System Design Topics', onClick: () => goToDesignCategory('concepts') },
        topic: 'Microservices Architecture',
        colors: BREADCRUMB_COLORS.Design
      }} />
    }
    if (selectedOption === 'Event-Driven') {
      return <EventDriven onBack={() => { setDesignInitialCategory('concepts'); setSelectedOptionAndRef('Design'); }} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => setSelectedOptionAndRef('Design') },
        category: { name: 'System Design Topics', onClick: () => goToDesignCategory('concepts') },
        topic: 'Event-Driven Architecture',
        colors: BREADCRUMB_COLORS.Design
      }} />
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
    if (selectedOption === 'Optional') {
      setShowOptionalModal(true)
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
      return <DynamicProgrammingPatterns onBack={() => setSelectedOptionAndRef('Practice')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Practice', icon: '📝', onClick: () => setSelectedOptionAndRef('Practice') }, topic: 'Dynamic Programming Patterns', colors: BREADCRUMB_COLORS.Practice }} />
    }
    console.log('❌ Did not match Dynamic Programming Patterns, selectedOption:', selectedOption)
    if (selectedOption === 'Trees') {
      setShowTreesModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Binary Trees') {
      setShowBinaryTreesModal(true)
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
    if (selectedOption === 'Two Pointers') {
      setShowTwoPointersModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Sliding Window') {
      setShowSlidingWindowModal(true)
      setSelectedOptionAndRef('')
      return null
    }
    if (selectedOption === 'Backtracking') {
      setShowBacktrackingModal(true)
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
        breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef('') }}
        onSelectItem={(item) => {
          // Open the appropriate modal based on the item name
          switch (item) {
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
            case 'AI Interview': setSelectedOptionAndRef('AI Interview'); break;
            case 'Two Pointers': setShowTwoPointersModal(true); break;
            case 'Bit Manipulation': setShowBitManipulationModal(true); break;
            case 'Set Operations': setSelectedOptionAndRef('Set Operations'); break;
            case 'Map Operations': setSelectedOptionAndRef('Map Operations'); break;
            default: break;
          }
        }}
      />
    }
    if (selectedOption === 'Questions') {
      return <Questions
        onBack={() => setSelectedOptionAndRef('')}
        breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef('') }}
        onSelectItem={(item) => {
          // Open the appropriate modal based on the item name
          console.log('Questions item clicked:', item);
          switch (item) {
            case 'Java Questions': setShowJavaQuestionsModal(true); break;
            case 'Core Java Questions': setShowCoreJavaQuestionsModal(true); break;
            case 'Java 8 Questions': setShowJava8QuestionsModal(true); break;
            case 'Java 11 Questions': setShowJava11QuestionsModal(true); break;
            case 'Java 15 Questions': setShowJava15QuestionsModal(true); break;
            case 'Java 21 Questions': setShowJava21QuestionsModal(true); break;
            case 'Java 24 Questions': setShowJava24QuestionsModal(true); break;
            case 'SQL Questions': setShowSQLQuestionsModal(true); break;
            case 'NoSQL Questions': setShowNoSQLQuestionsModal(true); break;
            case 'ORM Questions': setShowORMQuestionsModal(true); break;
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
            case 'eTrading Questions': setShowEtradingQuestionsModal(true); break;
            case 'System Design Questions': setShowSystemDesignQuestionsModal(true); break;
            default:
              console.log('No match found for item:', item);
              break;
          }
        }}
      />
    }
    return null
  }

  // Get theme from context
  const { isDark, colors } = useTheme()

  // Reusable modal styles
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000000,
    padding: '1rem',
    overflow: 'auto'
  }

  const modalContentStyle = {
    backgroundColor: colors.bgSecondary,
    borderRadius: '16px',
    maxWidth: '95vw',
    width: '1400px',
    maxHeight: '95vh',
    overflow: 'auto',
    boxShadow: isDark
      ? '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
      : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    position: 'relative',
    border: `1px solid ${colors.border}`
  }

  // Tooltip/dropdown style for hover menus
  const tooltipStyle = {
    backgroundColor: colors.bgSecondary,
    color: colors.textPrimary,
    border: `2px solid ${colors.border}`,
    boxShadow: isDark
      ? '0 15px 25px -8px rgba(0, 0, 0, 0.5)'
      : '0 15px 25px -8px rgba(0, 0, 0, 0.15)'
  }

  return (
    <div className="app-container" data-theme={isDark ? 'dark' : 'light'}>
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
          style={modalOverlayStyle}
          onClick={() => setShowDesignPatternsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Design Patterns..." />}>
              <DesignPatterns onBack={() => { setShowDesignPatternsModal(false); setSelectedOptionAndRef('Design'); }} {...createDesignNavigationCallbacks('DesignPatterns')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => { setShowDesignPatternsModal(false); setSelectedOptionAndRef('Design'); } }, category: { name: designTopicCategories['Design Patterns'].name, onClick: () => { setShowDesignPatternsModal(false); goToDesignCategory(designTopicCategories['Design Patterns'].id); } }, topic: 'Design Patterns', colors: BREADCRUMB_COLORS.Design }} />
            </Suspense>
          </div>
        </div>
      )}

      {/* Microservice Patterns Modal */}
      {showMicroservicePatternsModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowMicroservicePatternsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Microservice Patterns..." />}>
              <MicroservicePatterns onBack={() => { setShowMicroservicePatternsModal(false); setSelectedOptionAndRef('Design'); }} {...createDesignNavigationCallbacks('MicroservicePatterns')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => { setShowMicroservicePatternsModal(false); setSelectedOptionAndRef('Design'); } }, category: { name: designTopicCategories['Microservice Design Patterns'].name, onClick: () => { setShowMicroservicePatternsModal(false); goToDesignCategory(designTopicCategories['Microservice Design Patterns'].id); } }, topic: 'Microservice Patterns', colors: BREADCRUMB_COLORS.Design }} />
            </Suspense>
          </div>
        </div>
      )}

      {/* Event Driven Architecture Modal */}
      {showEventDrivenArchitectureModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowEventDrivenArchitectureModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Event Driven Architecture..." />}>
              <EventDrivenArchitecture onBack={() => { setShowEventDrivenArchitectureModal(false); setSelectedOptionAndRef('Design'); }} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => { setShowEventDrivenArchitectureModal(false); setSelectedOptionAndRef('Design'); } }, category: { name: designTopicCategories['Event Driven Architecture'].name, onClick: () => { setShowEventDrivenArchitectureModal(false); goToDesignCategory(designTopicCategories['Event Driven Architecture'].id); } }, topic: 'Event Driven Architecture', colors: BREADCRUMB_COLORS.Design }} />
            </Suspense>
          </div>
        </div>
      )}

      {/* Domain Driven Design Modal */}
      {showDomainDrivenDesignModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowDomainDrivenDesignModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Domain Driven Design..." />}>
              <DomainDrivenDesign onBack={() => { setShowDomainDrivenDesignModal(false); setSelectedOptionAndRef('Design'); }} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => { setShowDomainDrivenDesignModal(false); setSelectedOptionAndRef('Design'); } }, category: { name: designTopicCategories['Domain Driven Design'].name, onClick: () => { setShowDomainDrivenDesignModal(false); goToDesignCategory(designTopicCategories['Domain Driven Design'].id); } }, topic: 'Domain Driven Design', colors: BREADCRUMB_COLORS.Design }} />
            </Suspense>
          </div>
        </div>
      )}

      {/* Class Modal */}
      {showClassModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowClassModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Class onBack={() => { setShowClassModal(false); setSelectedOptionAndRef('Design'); }} {...createDesignNavigationCallbacks('Class')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => { setShowClassModal(false); setSelectedOptionAndRef('Design'); } }, category: { name: designTopicCategories['Class'].name, onClick: () => { setShowClassModal(false); goToDesignCategory(designTopicCategories['Class'].id); } }, topic: 'Object-Oriented Design', colors: BREADCRUMB_COLORS.Design }} />
          </div>
        </div>
      )}

      {/* System Design Modal */}
      {showSystemDesignModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowSystemDesignModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Suspense fallback={<LoadingSpinner text="Loading System Design..." />}>
              <SystemDesign onBack={() => { setShowSystemDesignModal(false); setSelectedOptionAndRef('Design'); }} {...createDesignNavigationCallbacks('SystemDesign')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => { setShowSystemDesignModal(false); setSelectedOptionAndRef('Design'); } }, category: { name: designTopicCategories['System Design'].name, onClick: () => { setShowSystemDesignModal(false); goToDesignCategory(designTopicCategories['System Design'].id); } }, topic: 'System Design', colors: BREADCRUMB_COLORS.Design }} />
            </Suspense>
          </div>
        </div>
      )}

      {/* Module Modal */}
      {showModuleModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowModuleModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Module onBack={() => { setShowModuleModal(false); setSelectedOptionAndRef('Design'); }} {...createDesignNavigationCallbacks('Module')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => { setShowModuleModal(false); setSelectedOptionAndRef('Design'); } }, category: { name: designTopicCategories['Module'].name, onClick: () => { setShowModuleModal(false); goToDesignCategory(designTopicCategories['Module'].id); } }, topic: 'Module System', colors: BREADCRUMB_COLORS.Design }} />
          </div>
        </div>
      )}

      {/* Function Modal */}
      {showFunctionModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowFunctionModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <FunctionalProgramming onBack={() => { setShowFunctionModal(false); setSelectedOptionAndRef('Design'); }} {...createDesignNavigationCallbacks('Function')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => { setShowFunctionModal(false); setSelectedOptionAndRef('Design'); } }, category: { name: designTopicCategories['Function'].name, onClick: () => { setShowFunctionModal(false); goToDesignCategory(designTopicCategories['Function'].id); } }, topic: 'Functional Programming', colors: BREADCRUMB_COLORS.Design }} />
          </div>
        </div>
      )}

      {/* Interface Modal */}
      {showInterfaceModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowInterfaceModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Interface onBack={() => { setShowInterfaceModal(false); setSelectedOptionAndRef('Design'); }} {...createDesignNavigationCallbacks('Interface')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Design', icon: '🎨', onClick: () => { setShowInterfaceModal(false); setSelectedOptionAndRef('Design'); } }, category: { name: designTopicCategories['Interface'].name, onClick: () => { setShowInterfaceModal(false); goToDesignCategory(designTopicCategories['Interface'].id); } }, topic: 'Interface Design', colors: BREADCRUMB_COLORS.Design }} />
          </div>
        </div>
      )}

      {/* SQL Modal */}
      {showSQLModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowSQLModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <SQL onBack={() => { setShowSQLModal(false); setSelectedOptionAndRef('Databases') }} {...createDatabaseNavigationCallbacks('SQL')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Databases', icon: '🗃️', onClick: () => { setShowSQLModal(false); setSelectedOptionAndRef('Databases') } },
              category: { name: databaseTopicCategories['SQL'].name, onClick: () => { setShowSQLModal(false); goToDatabasesCategory(databaseTopicCategories['SQL'].id) } },
              topic: 'SQL Databases',
              colors: BREADCRUMB_COLORS.Databases
            }} />
          </div>
        </div>
      )}

      {/* NoSQL Modal */}
      {showNoSQLModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowNoSQLModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <NoSQL onBack={() => { setShowNoSQLModal(false); setSelectedOptionAndRef('Databases') }} {...createDatabaseNavigationCallbacks('NoSQL')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Databases', icon: '🗃️', onClick: () => { setShowNoSQLModal(false); setSelectedOptionAndRef('Databases') } },
              category: { name: databaseTopicCategories['NoSQL'].name, onClick: () => { setShowNoSQLModal(false); goToDatabasesCategory(databaseTopicCategories['NoSQL'].id) } },
              topic: 'NoSQL Databases',
              colors: BREADCRUMB_COLORS.Databases
            }} />
          </div>
        </div>
      )}

      {/* Oracle Modal */}
      {showOracleModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowOracleModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Oracle onBack={() => { setShowOracleModal(false); setSelectedOptionAndRef('Databases') }} {...createDatabaseNavigationCallbacks('Oracle')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Databases', icon: '🗃️', onClick: () => { setShowOracleModal(false); setSelectedOptionAndRef('Databases') } },
              category: { name: databaseTopicCategories['Oracle'].name, onClick: () => { setShowOracleModal(false); goToDatabasesCategory(databaseTopicCategories['Oracle'].id) } },
              topic: 'Oracle Database',
              colors: BREADCRUMB_COLORS.Databases
            }} />
          </div>
        </div>
      )}

      {/* ORM Modal */}
      {showORMModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowORMModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <ORM onBack={() => { setShowORMModal(false); setSelectedOptionAndRef('Databases') }} {...createDatabaseNavigationCallbacks('ORM')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Databases', icon: '🗃️', onClick: () => { setShowORMModal(false); setSelectedOptionAndRef('Databases') } },
              category: { name: databaseTopicCategories['ORM'].name, onClick: () => { setShowORMModal(false); goToDatabasesCategory(databaseTopicCategories['ORM'].id) } },
              topic: 'ORM & Data Access',
              colors: BREADCRUMB_COLORS.Databases
            }} />
          </div>
        </div>
      )}

      {/* Redis Modal */}
      {showRedisModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowRedisModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Redis onBack={() => { setShowRedisModal(false); setSelectedOptionAndRef('Databases') }} {...createDatabaseNavigationCallbacks('Redis')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Databases', icon: '🗃️', onClick: () => { setShowRedisModal(false); setSelectedOptionAndRef('Databases') } },
              category: { name: databaseTopicCategories['Redis'].name, onClick: () => { setShowRedisModal(false); goToDatabasesCategory(databaseTopicCategories['Redis'].id) } },
              topic: 'Redis',
              colors: BREADCRUMB_COLORS.Databases
            }} />
          </div>
        </div>
      )}

      {/* PL/SQL Modal */}
      {showPLSQLModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowPLSQLModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <PLSQL onBack={() => { setShowPLSQLModal(false); setSelectedOptionAndRef('Databases') }} {...createDatabaseNavigationCallbacks('PLSQL')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Databases', icon: '🗃️', onClick: () => { setShowPLSQLModal(false); setSelectedOptionAndRef('Databases') } },
              category: { name: databaseTopicCategories['PLSQL'].name, onClick: () => { setShowPLSQLModal(false); goToDatabasesCategory(databaseTopicCategories['PLSQL'].id) } },
              topic: 'PL/SQL',
              colors: BREADCRUMB_COLORS.Databases
            }} />
          </div>
        </div>
      )}

      {/* Stored Procedures Modal */}
      {showStoredProceduresModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowStoredProceduresModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <StoredProcedures onBack={() => { setShowStoredProceduresModal(false); setSelectedOptionAndRef('Databases') }} {...createDatabaseNavigationCallbacks('StoredProcedures')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Databases', icon: '🗃️', onClick: () => { setShowStoredProceduresModal(false); setSelectedOptionAndRef('Databases') } },
              category: { name: databaseTopicCategories['StoredProcedures'].name, onClick: () => { setShowStoredProceduresModal(false); goToDatabasesCategory(databaseTopicCategories['StoredProcedures'].id) } },
              topic: 'Stored Procedures',
              colors: BREADCRUMB_COLORS.Databases
            }} />
          </div>
        </div>
      )}

      {/* Database Optimization Modal */}
      {showDatabaseOptimizationModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowDatabaseOptimizationModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <DatabaseOptimization onBack={() => { setShowDatabaseOptimizationModal(false); setSelectedOptionAndRef('Databases') }} {...createDatabaseNavigationCallbacks('DatabaseOptimization')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Databases', icon: '🗃️', onClick: () => { setShowDatabaseOptimizationModal(false); setSelectedOptionAndRef('Databases') } },
              category: { name: databaseTopicCategories['DatabaseOptimization'].name, onClick: () => { setShowDatabaseOptimizationModal(false); goToDatabasesCategory(databaseTopicCategories['DatabaseOptimization'].id) } },
              topic: 'Database Optimization',
              colors: BREADCRUMB_COLORS.Databases
            }} />
          </div>
        </div>
      )}

      {/* Spring Modal */}
      {showSpringModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowSpringModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Spring onBack={() => { setShowSpringModal(false); setSelectedOptionAndRef('Frameworks') }} {...createFrameworksNavigationCallbacks('Spring')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Frameworks', icon: '🌱', onClick: () => { setShowSpringModal(false); setSelectedOptionAndRef('Frameworks') } },
              category: { name: frameworksTopicCategories['Spring'].name, onClick: () => { setShowSpringModal(false); goToFrameworksCategory(frameworksTopicCategories['Spring'].id) } },
              topic: 'Spring Framework',
              colors: BREADCRUMB_COLORS.Frameworks
            }} />
          </div>
        </div>
      )}

      {/* Spring Boot Modal */}
      {showSpringBootModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowSpringBootModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <SpringBoot onBack={() => { setShowSpringBootModal(false); setSelectedOptionAndRef('Frameworks') }} {...createFrameworksNavigationCallbacks('SpringBoot')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Frameworks', icon: '🌱', onClick: () => { setShowSpringBootModal(false); setSelectedOptionAndRef('Frameworks') } },
              category: { name: frameworksTopicCategories['SpringBoot'].name, onClick: () => { setShowSpringBootModal(false); goToFrameworksCategory(frameworksTopicCategories['SpringBoot'].id) } },
              topic: 'Spring Boot',
              colors: BREADCRUMB_COLORS.Frameworks
            }} />
          </div>
        </div>
      )}

      {/* REST API Modal */}
      {showRESTAPIModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowRESTAPIModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <RestAPI onBack={() => { setShowRESTAPIModal(false); setSelectedOptionAndRef('Frameworks') }} {...createFrameworksNavigationCallbacks('RestAPI')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Frameworks', icon: '🌱', onClick: () => { setShowRESTAPIModal(false); setSelectedOptionAndRef('Frameworks') } },
              category: { name: frameworksTopicCategories['RestAPI'].name, onClick: () => { setShowRESTAPIModal(false); goToFrameworksCategory(frameworksTopicCategories['RestAPI'].id) } },
              topic: 'REST API Design',
              colors: BREADCRUMB_COLORS.Frameworks
            }} />
          </div>
        </div>
      )}

      {/* Hibernate Modal */}
      {showHibernateModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowHibernateModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Hibernate onBack={() => { setShowHibernateModal(false); setSelectedOptionAndRef('Frameworks') }} {...createFrameworksNavigationCallbacks('Hibernate')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Frameworks', icon: '🌱', onClick: () => { setShowHibernateModal(false); setSelectedOptionAndRef('Frameworks') } },
              category: { name: frameworksTopicCategories['Hibernate'].name, onClick: () => { setShowHibernateModal(false); goToFrameworksCategory(frameworksTopicCategories['Hibernate'].id) } },
              topic: 'Hibernate ORM',
              colors: BREADCRUMB_COLORS.Frameworks
            }} />
          </div>
        </div>
      )}

      {/* Actuator Modal */}
      {showActuatorModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowActuatorModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Actuator onBack={() => { setShowActuatorModal(false); setSelectedOptionAndRef('Frameworks') }} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Frameworks', icon: '🌱', onClick: () => { setShowActuatorModal(false); setSelectedOptionAndRef('Frameworks') } },
              category: { name: frameworksTopicCategories['Actuator'].name, onClick: () => { setShowActuatorModal(false); goToFrameworksCategory(frameworksTopicCategories['Actuator'].id) } },
              topic: 'Spring Boot Actuator',
              colors: BREADCRUMB_COLORS.Frameworks
            }} />
          </div>
        </div>
      )}

      {/* Zipkin Modal */}
      {showZipkinModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowZipkinModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Zipkin onBack={() => { setShowZipkinModal(false); setSelectedOptionAndRef('Frameworks') }} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Frameworks', icon: '🌱', onClick: () => { setShowZipkinModal(false); setSelectedOptionAndRef('Frameworks') } },
              category: { name: frameworksTopicCategories['Zipkin'].name, onClick: () => { setShowZipkinModal(false); goToFrameworksCategory(frameworksTopicCategories['Zipkin'].id) } },
              topic: 'Zipkin Distributed Tracing',
              colors: BREADCRUMB_COLORS.Frameworks
            }} />
          </div>
        </div>
      )}

      {/* gRPC Modal */}
      {showGRPCModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowGRPCModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <GRPC onBack={() => { setShowGRPCModal(false); setSelectedOptionAndRef('Frameworks') }} {...createFrameworksNavigationCallbacks('gRPC')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Frameworks', icon: '🌱', onClick: () => { setShowGRPCModal(false); setSelectedOptionAndRef('Frameworks') } },
              category: { name: frameworksTopicCategories['GRPC'].name, onClick: () => { setShowGRPCModal(false); goToFrameworksCategory(frameworksTopicCategories['GRPC'].id) } },
              topic: 'gRPC',
              colors: BREADCRUMB_COLORS.Frameworks
            }} />
          </div>
        </div>
      )}

      {/* SOAP Modal */}
      {showSOAPModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowSOAPModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <SOAP onBack={() => { setShowSOAPModal(false); setSelectedOptionAndRef('Frameworks') }} {...createFrameworksNavigationCallbacks('SOAP')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Frameworks', icon: '🌱', onClick: () => { setShowSOAPModal(false); setSelectedOptionAndRef('Frameworks') } },
              category: { name: frameworksTopicCategories['SOAP'].name, onClick: () => { setShowSOAPModal(false); goToFrameworksCategory(frameworksTopicCategories['SOAP'].id) } },
              topic: 'SOAP Web Services',
              colors: BREADCRUMB_COLORS.Frameworks
            }} />
          </div>
        </div>
      )}

      {/* React Modal */}
      {showReactModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowReactModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <ReactFramework onBack={() => { setShowReactModal(false); setSelectedOptionAndRef('Frameworks') }} {...createFrameworksNavigationCallbacks('React')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Frameworks', icon: '🌱', onClick: () => { setShowReactModal(false); setSelectedOptionAndRef('Frameworks') } },
              category: { name: frameworksTopicCategories['React'].name, onClick: () => { setShowReactModal(false); goToFrameworksCategory(frameworksTopicCategories['React'].id) } },
              topic: 'React',
              colors: BREADCRUMB_COLORS.Frameworks
            }} />
          </div>
        </div>
      )}

      {/* Deployment Modal */}
      {showDeploymentModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowDeploymentModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Deployment onBack={() => { setShowDeploymentModal(false); setSelectedOptionAndRef('DevOps') }} {...createDevOpsNavigationCallbacks('Deployment')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'DevOps', icon: '🛠️', onClick: () => { setShowDeploymentModal(false); setSelectedOptionAndRef('DevOps') } },
              category: { name: devopsTopicCategories['Deployment'].name, onClick: () => { setShowDeploymentModal(false); goToDevopsCategory(devopsTopicCategories['Deployment'].id) } },
              topic: 'Deployment',
              colors: BREADCRUMB_COLORS.DevOps
            }} />
          </div>
        </div>
      )}

      {/* Docker Modal */}
      {showDockerModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowDockerModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Docker onBack={() => { setShowDockerModal(false); setSelectedOptionAndRef('DevOps') }} {...createDevOpsNavigationCallbacks('Docker')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'DevOps', icon: '🛠️', onClick: () => { setShowDockerModal(false); setSelectedOptionAndRef('DevOps') } },
              category: { name: devopsTopicCategories['Docker'].name, onClick: () => { setShowDockerModal(false); goToDevopsCategory(devopsTopicCategories['Docker'].id) } },
              topic: 'Docker',
              colors: BREADCRUMB_COLORS.DevOps
            }} />
          </div>
        </div>
      )}

      {/* Kubernetes Modal */}
      {showKubernetesModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowKubernetesModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Kubernetes onBack={() => { setShowKubernetesModal(false); setSelectedOptionAndRef('DevOps') }} {...createDevOpsNavigationCallbacks('Kubernetes')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'DevOps', icon: '🛠️', onClick: () => { setShowKubernetesModal(false); setSelectedOptionAndRef('DevOps') } },
              category: { name: devopsTopicCategories['Kubernetes'].name, onClick: () => { setShowKubernetesModal(false); goToDevopsCategory(devopsTopicCategories['Kubernetes'].id) } },
              topic: 'Kubernetes',
              colors: BREADCRUMB_COLORS.DevOps
            }} />
          </div>
        </div>
      )}

      {/* Testing Modal */}
      {showTestingModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowTestingModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Testing onBack={() => { setShowTestingModal(false); setSelectedOptionAndRef('DevOps') }} {...createDevOpsNavigationCallbacks('Testing')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'DevOps', icon: '🛠️', onClick: () => { setShowTestingModal(false); setSelectedOptionAndRef('DevOps') } },
              category: { name: devopsTopicCategories['Testing'].name, onClick: () => { setShowTestingModal(false); goToDevopsCategory(devopsTopicCategories['Testing'].id) } },
              topic: 'Testing',
              colors: BREADCRUMB_COLORS.DevOps
            }} />
          </div>
        </div>
      )}

      {/* CI/CD Modal */}
      {showCICDModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowCICDModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <CICD onBack={() => { setShowCICDModal(false); setSelectedOptionAndRef('DevOps') }} {...createDevOpsNavigationCallbacks('CICD')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'DevOps', icon: '🛠️', onClick: () => { setShowCICDModal(false); setSelectedOptionAndRef('DevOps') } },
              category: { name: devopsTopicCategories['CICD'].name, onClick: () => { setShowCICDModal(false); goToDevopsCategory(devopsTopicCategories['CICD'].id) } },
              topic: 'CI/CD',
              colors: BREADCRUMB_COLORS.DevOps
            }} />
          </div>
        </div>
      )}

      {/* Agile Scrum Modal */}
      {showAgileScrumModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowAgileScrumModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <AgileScrum onBack={() => { setShowAgileScrumModal(false); setSelectedOptionAndRef('DevOps') }} {...createDevOpsNavigationCallbacks('AgileScrum')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'DevOps', icon: '🛠️', onClick: () => { setShowAgileScrumModal(false); setSelectedOptionAndRef('DevOps') } },
              category: { name: devopsTopicCategories['AgileScrum'].name, onClick: () => { setShowAgileScrumModal(false); goToDevopsCategory(devopsTopicCategories['AgileScrum'].id) } },
              topic: 'Agile & Scrum',
              colors: BREADCRUMB_COLORS.DevOps
            }} />
          </div>
        </div>
      )}

      {/* Production Support Modal */}
      {showProductionSupportModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowProductionSupportModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <ProductionSupport onBack={() => { setShowProductionSupportModal(false); setSelectedOptionAndRef('DevOps') }} {...createDevOpsNavigationCallbacks('ProductionSupport')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'DevOps', icon: '🛠️', onClick: () => { setShowProductionSupportModal(false); setSelectedOptionAndRef('DevOps') } },
              category: { name: devopsTopicCategories['ProductionSupport'].name, onClick: () => { setShowProductionSupportModal(false); goToDevopsCategory(devopsTopicCategories['ProductionSupport'].id) } },
              topic: 'Production Support',
              colors: BREADCRUMB_COLORS.DevOps
            }} />
          </div>
        </div>
      )}

      {/* TeamCity Modal */}
      {showTeamCityModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowTeamCityModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <TeamCity onBack={() => { setShowTeamCityModal(false); setSelectedOptionAndRef('DevOps') }} {...createDevOpsNavigationCallbacks('TeamCity')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'DevOps', icon: '🛠️', onClick: () => { setShowTeamCityModal(false); setSelectedOptionAndRef('DevOps') } },
              category: { name: devopsTopicCategories['TeamCity'].name, onClick: () => { setShowTeamCityModal(false); goToDevopsCategory(devopsTopicCategories['TeamCity'].id) } },
              topic: 'TeamCity',
              colors: BREADCRUMB_COLORS.DevOps
            }} />
          </div>
        </div>
      )}

      {/* Jenkins Modal */}
      {showJenkinsModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowJenkinsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Jenkins onBack={() => { setShowJenkinsModal(false); setSelectedOptionAndRef('DevOps') }} {...createDevOpsNavigationCallbacks('Jenkins')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'DevOps', icon: '🛠️', onClick: () => { setShowJenkinsModal(false); setSelectedOptionAndRef('DevOps') } },
              category: { name: devopsTopicCategories['Jenkins'].name, onClick: () => { setShowJenkinsModal(false); goToDevopsCategory(devopsTopicCategories['Jenkins'].id) } },
              topic: 'Jenkins',
              colors: BREADCRUMB_COLORS.DevOps
            }} />
          </div>
        </div>
      )}

      {/* Prometheus Modal */}
      {showPrometheusModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowPrometheusModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Prometheus onBack={() => { setShowPrometheusModal(false); setSelectedOptionAndRef('DevOps') }} {...createDevOpsNavigationCallbacks('Prometheus')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'DevOps', icon: '🛠️', onClick: () => { setShowPrometheusModal(false); setSelectedOptionAndRef('DevOps') } },
              category: { name: devopsTopicCategories['Prometheus'].name, onClick: () => { setShowPrometheusModal(false); goToDevopsCategory(devopsTopicCategories['Prometheus'].id) } },
              topic: 'Prometheus',
              colors: BREADCRUMB_COLORS.DevOps
            }} />
          </div>
        </div>
      )}

      {/* Grafana Modal */}
      {showGrafanaModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowGrafanaModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Grafana onBack={() => { setShowGrafanaModal(false); setSelectedOptionAndRef('DevOps') }} {...createDevOpsNavigationCallbacks('Grafana')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'DevOps', icon: '🛠️', onClick: () => { setShowGrafanaModal(false); setSelectedOptionAndRef('DevOps') } },
              category: { name: devopsTopicCategories['Grafana'].name, onClick: () => { setShowGrafanaModal(false); goToDevopsCategory(devopsTopicCategories['Grafana'].id) } },
              topic: 'Grafana',
              colors: BREADCRUMB_COLORS.DevOps
            }} />
          </div>
        </div>
      )}

      {/* Security OWASP Modal */}
      {showSecurityOWASPModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowSecurityOWASPModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <SecurityOWASP onBack={() => { setShowSecurityOWASPModal(false); setSelectedOptionAndRef('Security') }} {...createDevOpsNavigationCallbacks('SecurityOWASP')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Security', icon: '🔒', onClick: () => { setShowSecurityOWASPModal(false); setSelectedOptionAndRef('Security') } },
              category: { name: devopsTopicCategories['SecurityOWASP'].name, onClick: () => { setShowSecurityOWASPModal(false); goToDevopsCategory(devopsTopicCategories['SecurityOWASP'].id) } },
              topic: 'Security & OWASP',
              colors: BREADCRUMB_COLORS.Security
            }} />
          </div>
        </div>
      )}

      {/* Kafka Modal */}
      {showKafkaModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowKafkaModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <ApacheKafka onBack={() => { setShowKafkaModal(false); setSelectedOptionAndRef('Messaging') }} {...createDevOpsNavigationCallbacks('Kafka')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Messaging', icon: '📨', onClick: () => { setShowKafkaModal(false); setSelectedOptionAndRef('Messaging') } },
              category: { name: messagingTopicCategories['Kafka'].name, onClick: () => { setShowKafkaModal(false); goToMessagingCategory(messagingTopicCategories['Kafka'].id) } },
              topic: 'Apache Kafka',
              colors: BREADCRUMB_COLORS.Messaging
            }} />
          </div>
        </div>
      )}

      {/* Apache Flink Modal */}
      {showApacheFlinkModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowApacheFlinkModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <ApacheFlink onBack={() => { setShowApacheFlinkModal(false); setSelectedOptionAndRef('Messaging') }} {...createDevOpsNavigationCallbacks('ApacheFlink')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Messaging', icon: '📨', onClick: () => { setShowApacheFlinkModal(false); setSelectedOptionAndRef('Messaging') } },
              category: { name: messagingTopicCategories['ApacheFlink'].name, onClick: () => { setShowApacheFlinkModal(false); goToMessagingCategory(messagingTopicCategories['ApacheFlink'].id) } },
              topic: 'Apache Flink',
              colors: BREADCRUMB_COLORS.Messaging
            }} />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Solace onBack={() => { setShowSolaceModal(false); setSelectedOptionAndRef('Messaging') }} {...createDevOpsNavigationCallbacks('Solace')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Messaging', icon: '📨', onClick: () => { setShowSolaceModal(false); setSelectedOptionAndRef('Messaging') } },
              category: { name: messagingTopicCategories['Solace'].name, onClick: () => { setShowSolaceModal(false); goToMessagingCategory(messagingTopicCategories['Solace'].id) } },
              topic: 'Solace PubSub+',
              colors: BREADCRUMB_COLORS.Messaging
            }} />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <RabbitMQ onBack={() => { setShowRabbitMQModal(false); setSelectedOptionAndRef('Messaging') }} {...createDevOpsNavigationCallbacks('RabbitMQ')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Messaging', icon: '📨', onClick: () => { setShowRabbitMQModal(false); setSelectedOptionAndRef('Messaging') } },
              category: { name: messagingTopicCategories['RabbitMQ'].name, onClick: () => { setShowRabbitMQModal(false); goToMessagingCategory(messagingTopicCategories['RabbitMQ'].id) } },
              topic: 'RabbitMQ',
              colors: BREADCRUMB_COLORS.Messaging
            }} />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <MuleSoft onBack={() => { setShowMuleSoftModal(false); setSelectedOptionAndRef('Messaging') }} {...createDevOpsNavigationCallbacks('MuleSoft')} />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <AWS onBack={() => { setShowAWSModal(false); setSelectedOptionAndRef('Cloud') }} {...createCloudNavigationCallbacks('AWS')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Cloud', icon: '☁️', onClick: () => { setShowAWSModal(false); setSelectedOptionAndRef('Cloud') } },
              category: { name: cloudTopicCategories['AWS'].name, onClick: () => { setShowAWSModal(false); goToCloudCategory(cloudTopicCategories['AWS'].id) } },
              topic: 'Amazon Web Services',
              colors: BREADCRUMB_COLORS.Cloud
            }} />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <GCP onBack={() => { setShowGCPModal(false); setSelectedOptionAndRef('Cloud') }} {...createCloudNavigationCallbacks('GCP')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Cloud', icon: '☁️', onClick: () => { setShowGCPModal(false); setSelectedOptionAndRef('Cloud') } },
              category: { name: cloudTopicCategories['GCP'].name, onClick: () => { setShowGCPModal(false); goToCloudCategory(cloudTopicCategories['GCP'].id) } },
              topic: 'Google Cloud Platform',
              colors: BREADCRUMB_COLORS.Cloud
            }} />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Azure onBack={() => { setShowAzureModal(false); setSelectedOptionAndRef('Cloud') }} {...createCloudNavigationCallbacks('Azure')} breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Cloud', icon: '☁️', onClick: () => { setShowAzureModal(false); setSelectedOptionAndRef('Cloud') } },
              category: { name: cloudTopicCategories['Azure'].name, onClick: () => { setShowAzureModal(false); goToCloudCategory(cloudTopicCategories['Azure'].id) } },
              topic: 'Microsoft Azure',
              colors: BREADCRUMB_COLORS.Cloud
            }} />
          </div>
        </div>
      )}

      {showArraysModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowArraysModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Arrays..." />}>
              <Arrays
                onBack={() => { setShowArraysModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Arrays')}
              />
            </Suspense>
          </div>
        </div>
      )}

      {showHashTablesModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowHashTablesModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Hash Tables..." />}>
              <HashTables
                onBack={() => { setShowHashTablesModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Hash Tables')}
              />
            </Suspense>
          </div>
        </div>
      )}

      {showStacksModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowStacksModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Stacks..." />}>
              <Stacks
                onBack={() => { setShowStacksModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Stacks')}
              />
            </Suspense>
          </div>
        </div>
      )}

      {showQueuesModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowQueuesModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Queues..." />}>
              <Queues
                onBack={() => { setShowQueuesModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Queues')}
              />
            </Suspense>
          </div>
        </div>
      )}

      {showTreesModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowTreesModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Trees..." />}>
              <Trees
                onBack={() => { setShowTreesModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Trees')}
              />
            </Suspense>
          </div>
        </div>
      )}

      {showBinaryTreesModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowBinaryTreesModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Binary Trees..." />}>
              <BinaryTrees
                onBack={() => { setShowBinaryTreesModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Binary Trees')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Binary Search Trees..." />}>
              <BinarySearchTrees
                onBack={() => { setShowBinarySearchTreesModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Binary Search Trees')}
              />
            </Suspense>
          </div>
        </div>
      )}

      {showGraphsModal && (
        <div
          style={modalOverlayStyle}
          onClick={() => setShowGraphsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={modalContentStyle}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Graphs..." />}>
              <Graphs
                onBack={() => { setShowGraphsModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Graphs')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Heaps..." />}>
              <Heaps
                onBack={() => { setShowHeapsModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Heaps')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Union Find..." />}>
              <UnionFind
                onBack={() => { setShowUnionFindModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('UnionFind')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Trie..." />}>
              <Trie
                onBack={() => { setShowTrieModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Trie')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Linked Lists..." />}>
              <LinkedLists
                onBack={() => { setShowLinkedListsModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Linked Lists')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Sorting..." />}>
              <Sorting
                onBack={() => { setShowSortingModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Sorting')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Binary Search..." />}>
              <BinarySearch
                onBack={() => { setShowBinarySearchModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Binary Search')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Recursion..." />}>
              <Recursion
                onBack={() => { setShowRecursionModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Recursion')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Dynamic Programming..." />}>
              <DynamicProgramming
                onBack={() => { setShowDynamicProgrammingModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Dynamic Programming')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Sliding Window..." />}>
              <SlidingWindow
                onBack={() => { setShowSlidingWindowModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Sliding Window')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Backtracking..." />}>
              <Backtracking
                onBack={() => { setShowBacktrackingModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Backtracking')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Intervals..." />}>
              <Intervals
                onBack={() => { setShowIntervalsModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Intervals')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Math & Geometry..." />}>
              <MathGeometry
                onBack={() => { setShowMathGeometryModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Math & Geometry')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Advanced Graphs..." />}>
              <AdvancedGraphs
                onBack={() => { setShowAdvancedGraphsModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Advanced Graphs')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Searching..." />}>
              <Searching
                onBack={() => { setShowSearchingModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Searching')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Greedy Algorithms..." />}>
              <GreedyAlgorithms
                onBack={() => { setShowGreedyAlgorithmsModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Greedy Algorithms')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Famous Algorithms..." />}>
              <FamousAlgorithms
                onBack={() => { setShowFamousAlgorithmsModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Famous Algorithms')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
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
              onBack={() => { setShowStreamsModal(false); setSelectedOptionAndRef('Java') }}
              {...createNavigationCallbacks('Streams')}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Java', icon: '☕', onClick: () => { setShowStreamsModal(false); setSelectedOptionAndRef('Java') } },
                topic: 'Streams'
              }}
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
              backgroundColor: colors.bgSecondary,
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
              onBack={() => { setShowStreamsAdvancedModal(false); setSelectedOptionAndRef('Java') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Java', icon: '☕', onClick: () => { setShowStreamsAdvancedModal(false); setSelectedOptionAndRef('Java') } },
                topic: 'Streams Advanced'
              }}
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
              backgroundColor: colors.bgSecondary,
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
              onBack={() => { setShowLambdasModal(false); setSelectedOptionAndRef('Java') }}
              {...createNavigationCallbacks('Lambdas')}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Java', icon: '☕', onClick: () => { setShowLambdasModal(false); setSelectedOptionAndRef('Java') } },
                topic: 'Lambdas'
              }}
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
              backgroundColor: colors.bgSecondary,
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
              onBack={() => { setShowLambdasAdvancedModal(false); setSelectedOptionAndRef('Java') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Java', icon: '☕', onClick: () => { setShowLambdasAdvancedModal(false); setSelectedOptionAndRef('Java') } },
                topic: 'Lambdas Advanced'
              }}
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
              backgroundColor: colors.bgSecondary,
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
              onBack={() => { setShowFunctionalInterfacesModal(false); setSelectedOptionAndRef('Java') }}
              {...createNavigationCallbacks('Functional Interfaces')}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Java', icon: '☕', onClick: () => { setShowFunctionalInterfacesModal(false); setSelectedOptionAndRef('Java') } },
                topic: 'Functional Interfaces'
              }}
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
              backgroundColor: colors.bgSecondary,
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
              onBack={() => { setShowCollectionsFrameworkModal(false); setSelectedOptionAndRef('Java') }}
              {...createNavigationCallbacks('Collections Framework')}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Java', icon: '☕', onClick: () => { setShowCollectionsFrameworkModal(false); setSelectedOptionAndRef('Java') } },
                topic: 'Collections Framework'
              }}
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
              backgroundColor: colors.bgSecondary,
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
              onBack={() => { setShowConcurrencyModal(false); setSelectedOptionAndRef('Java') }}
              {...createNavigationCallbacks('Concurrency')}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Java', icon: '☕', onClick: () => { setShowConcurrencyModal(false); setSelectedOptionAndRef('Java') } },
                topic: 'Concurrency'
              }}
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
              backgroundColor: colors.bgSecondary,
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
              onBack={() => { setShowMultithreadingModal(false); setSelectedOptionAndRef('Java') }}
              {...createNavigationCallbacks('Multithreading')}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Java', icon: '☕', onClick: () => { setShowMultithreadingModal(false); setSelectedOptionAndRef('Java') } },
                topic: 'Multithreading'
              }}
            />
          </div>
        </div>
      )}

      {showOptionalModal && (
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
          onClick={() => setShowOptionalModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Optional
              onBack={() => { setShowOptionalModal(false); setSelectedOptionAndRef('Java') }}
              {...createNavigationCallbacks('Optional')}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Java', icon: '☕', onClick: () => { setShowOptionalModal(false); setSelectedOptionAndRef('Java') } },
                topic: 'Optional'
              }}
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
              backgroundColor: colors.bgSecondary,
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
              onBack={() => { setShowObjectOrientedProgrammingModal(false); setSelectedOptionAndRef('Java') }}
              {...createNavigationCallbacks('Object-Oriented Programming')}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Java', icon: '☕', onClick: () => { setShowObjectOrientedProgrammingModal(false); setSelectedOptionAndRef('Java') } },
                topic: 'Object-Oriented Programming'
              }}
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
              backgroundColor: colors.bgSecondary,
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
              onBack={() => { setShowExceptionHandlingModal(false); setSelectedOptionAndRef('Java') }}
              {...createNavigationCallbacks('Exception Handling')}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Java', icon: '☕', onClick: () => { setShowExceptionHandlingModal(false); setSelectedOptionAndRef('Java') } },
                topic: 'Exception Handling'
              }}
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
              backgroundColor: colors.bgSecondary,
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
              onBack={() => { setShowFileIOModal(false); setSelectedOptionAndRef('Java') }}
              {...createNavigationCallbacks('File I/O')}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Java', icon: '☕', onClick: () => { setShowFileIOModal(false); setSelectedOptionAndRef('Java') } },
                topic: 'File I/O'
              }}
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
              backgroundColor: colors.bgSecondary,
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
              onBack={() => { setShowJVMInternalsModal(false); setSelectedOptionAndRef('Java') }}
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
              backgroundColor: colors.bgSecondary,
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
              onBack={() => { setShowMemoryManagementModal(false); setSelectedOptionAndRef('Java') }}
              {...createNavigationCallbacks('Memory Management')}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Java', icon: '☕', onClick: () => { setShowMemoryManagementModal(false); setSelectedOptionAndRef('Java') } },
                topic: 'Memory Management'
              }}
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Data Structures..." />}>
              <DataStructures
                onBack={() => { setShowDataStructuresModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Data Structures')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Strings..." />}>
              <Strings
                onBack={() => { setShowStringsModal(false); setSelectedOptionAndRef('Algorithms') }}
                {...createNavigationCallbacks('Strings')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
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
              onBack={() => { setShowGenericsModal(false); setSelectedOptionAndRef('Java') }}
              {...createNavigationCallbacks('Generics')}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Java', icon: '☕', onClick: () => { setShowGenericsModal(false); setSelectedOptionAndRef('Java') } },
                topic: 'Generics'
              }}
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Design Patterns Practice..." />}>
              <DesignPatternsInteractive
                onBack={() => { setShowDesignPatternsPracticeModal(false); setSelectedOptionAndRef('Design Patterns') }}
                {...createNavigationCallbacks('Design Patterns Practice')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Suspense fallback={<LoadingSpinner text="Loading LRU Cache..." />}>
              <LRUCache
                onBack={() => { setShowLRUCacheModal(false); setSelectedOptionAndRef('System Design') }}
                {...createNavigationCallbacks('LRU Cache')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Rate Limiter..." />}>
              <RateLimiter
                onBack={() => { setShowRateLimiterModal(false); setSelectedOptionAndRef('System Design') }}
                {...createNavigationCallbacks('Rate Limiter')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Suspense fallback={<LoadingSpinner text="Loading Design Problems..." />}>
              <DesignProblems
                onBack={() => { setShowDesignProblemsModal(false); setSelectedOptionAndRef('System Design') }}
                {...createNavigationCallbacks('Design Problems')}
              />
            </Suspense>
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <JavaQuestions
              onBack={() => { setShowJavaQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowJavaQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'Java',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <CoreJavaQuestions
              onBack={() => { setShowCoreJavaQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowCoreJavaQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'Core Java',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Java8Questions
              onBack={() => { setShowJava8QuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowJava8QuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'Java 8',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Java11Questions
              onBack={() => { setShowJava11QuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowJava11QuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'Java 11',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Java15Questions
              onBack={() => { setShowJava15QuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowJava15QuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'Java 15',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Java21Questions
              onBack={() => { setShowJava21QuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowJava21QuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'Java 21',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <Java24Questions
              onBack={() => { setShowJava24QuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowJava24QuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'Java 24',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <SQLQuestions
              onBack={() => { setShowSQLQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowSQLQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'SQL',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
          </div>
        </div>
      )}

      {showNoSQLQuestionsModal && (
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
          onClick={() => setShowNoSQLQuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <NoSQLQuestions
              onBack={() => { setShowNoSQLQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowNoSQLQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'NoSQL',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
          </div>
        </div>
      )}

      {showORMQuestionsModal && (
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
          onClick={() => setShowORMQuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <ORMQuestions
              onBack={() => { setShowORMQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowORMQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'ORM',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <HibernateQuestions
              onBack={() => { setShowHibernateQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowHibernateQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'Hibernate',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <KafkaQuestions
              onBack={() => { setShowKafkaQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowKafkaQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'Kafka',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <ApacheFlinkQuestions
              onBack={() => { setShowApacheFlinkQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowApacheFlinkQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'Apache Flink',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <RabbitMQQuestions
              onBack={() => { setShowRabbitMQQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowRabbitMQQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'RabbitMQ',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <SolaceQuestions
              onBack={() => { setShowSolaceQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowSolaceQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'Solace',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <RestAPIQuestions
              onBack={() => { setShowRestAPIQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowRestAPIQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'REST API',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <JenkinsQuestions
              onBack={() => { setShowJenkinsQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowJenkinsQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'Jenkins',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <TeamCityQuestions
              onBack={() => { setShowTeamCityQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowTeamCityQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'TeamCity',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <PrometheusQuestions
              onBack={() => { setShowPrometheusQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowPrometheusQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'Prometheus',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <GrafanaQuestions
              onBack={() => { setShowGrafanaQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowGrafanaQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'Grafana',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <ZipkinQuestions
              onBack={() => { setShowZipkinQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowZipkinQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'Zipkin',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
                backgroundColor: colors.bgSecondary,
                borderRadius: '16px',
                maxWidth: '95vw',
                width: '1400px',
                maxHeight: '95vh',
                overflow: 'auto',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                position: 'relative'
              }}
            >
              <ActuatorQuestions
                onBack={() => { setShowActuatorQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
                breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowActuatorQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                  topic: 'Spring Actuator',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <SpringCoreQuestions
              onBack={() => { setShowSpringCoreQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowSpringCoreQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'Spring Core',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <SpringAnnotationsQuestions
              onBack={() => { setShowSpringAnnotationsQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowSpringAnnotationsQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'Spring Annotations',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
          </div>
        </div>
      )}

      {showEtradingQuestionsModal && (
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
          onClick={() => setShowEtradingQuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <EtradingQuestions
              onBack={() => { setShowEtradingQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowEtradingQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'eTrading Systems',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
          </div>
        </div>
      )}

      {showSystemDesignQuestionsModal && (
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
          onClick={() => setShowSystemDesignQuestionsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <SystemDesignQuestions
              onBack={() => { setShowSystemDesignQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowSystemDesignQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'System Design',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <SpringBootQuestions
              onBack={() => { setShowSpringBootQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowSpringBootQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'Spring Boot',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <SpringSecurityQuestions
              onBack={() => { setShowSpringSecurityQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowSpringSecurityQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'Spring Security',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              maxWidth: '95vw',
              width: '1400px',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
          >
            <SpringDataJPAQuestions
              onBack={() => { setShowSpringDataJPAQuestionsModal(false); setSelectedOptionAndRef('Questions') }}
              breadcrumb={{ onMainMenu: () => setSelectedOptionAndRef(''), section: { name: 'Questions', icon: '?', onClick: () => { setShowSpringDataJPAQuestionsModal(false); setSelectedOptionAndRef('Questions') } },
                topic: 'Spring Data JPA',
                colors: BREADCRUMB_COLORS.Questions
              }}
            />
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
          backgroundColor: colors.bgSecondary,
          padding: '0.5rem 1rem',
          borderBottom: '3px solid rgba(59, 130, 246, 0.4)',
          boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.15)',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(147, 197, 253, 0.08) 100%)',
          backdropFilter: 'blur(15px)',
          zIndex: 100001,
          transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease-in-out'
        }}>
        {isKeyboardUser && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '0.35rem'
          }}>
            <div
              id="main-title"
              style={{
                margin: 0,
                fontSize: '0.75rem',
                color: colors.textSecondary,
                fontWeight: '500',
                textAlign: 'center'
              }}
            >
              Press H for keyboard shortcuts
            </div>
          </div>
        )}

        {/* Navigation Row with Category Buttons and Utility Buttons */}
        <div
          role="menubar"
          aria-label="Category selection"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: '0.3rem',
            flexWrap: 'nowrap',
            marginBottom: expandedGroup ? '1rem' : '0'
          }}
        >
          {Object.entries(categoryGroups).map(([groupName, group], index) => (
            <button
              key={groupName}
              role="menuitem"
              title={group.description || `${groupName} category`}
              aria-label={`${groupName}: ${group.description}. ${group.items?.length || 0} items`}
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
                // Categories with items should expand to show items
                if (group.items && group.items.length > 0) {
                  const isExpanding = expandedGroup !== groupName
                  setExpandedGroup(isExpanding ? groupName : null)
                  setExpandedSubcategory(null)
                  setFocusedItemIndex(isExpanding ? 0 : -1)
                  // Focus first item after DOM updates
                  if (isExpanding) {
                    setTimeout(() => {
                      const firstItem = document.querySelector('[data-item-index="0"]')
                      if (firstItem) {
                        firstItem.focus()
                      }
                    }, 50)
                  }
                } else {
                  // Categories without items navigate to their own pages
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
                padding: '0.3rem 0.5rem',
                fontSize: '0.7rem',
                fontWeight: '700',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                height: '32px',
                backgroundColor: expandedGroup === groupName
                  ? group.color
                  : (focusedCategoryIndex === index && !expandedGroup ? `${group.color}22` : colors.bgSecondary),
                color: expandedGroup === groupName
                  ? 'white'
                  : (focusedCategoryIndex === index && !expandedGroup ? group.color : colors.textPrimary),
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
                gap: '0.3rem',
                transform: focusedCategoryIndex === index && !expandedGroup ? 'scale(1.08)' : 'scale(1)',
                borderWidth: focusedCategoryIndex === index && !expandedGroup ? '3px' : '2px',
                position: 'relative'
              }}
            >
              <span style={{ fontSize: '0.8rem' }}>{group.icon}</span>
              <span>{groupName}</span>
            </button>
          ))}

          {/* Divider */}
          <div style={{
            width: '2px',
            height: '26px',
            backgroundColor: colors.border,
            margin: '0 0.15rem',
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
              width: '32px',
              height: '32px',
              fontSize: '1rem',
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

          {/* Theme Toggle */}
          <ThemeToggle size="small" />

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
                width: '32px',
                height: '32px',
                fontSize: '1rem',
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
            {/* Show items list */}
            <>
              {(() => {
                const group = categoryGroups[expandedGroup];
                const items = group.items || []
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
                          : (isFocused ? 'rgba(59, 130, 246, 0.15)' : colors.bgSecondary),
                        color: selectedOption === option.value
                          ? 'white'
                          : (isFocused ? '#1e40af' : colors.textPrimary),
                        border: `2px solid ${colors.border}`,
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
                          : (hoveredOption?.value === option.value || isFocused ? '#3b82f6' : colors.border),
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
                color: colors.textPrimary,
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
                        backgroundColor: selectedOption === option.value ? '#3b82f6' : colors.bgSecondary,
                        color: selectedOption === option.value ? 'white' : colors.textPrimary,
                        border: `2px solid ${colors.border}`,
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
                        borderColor: selectedOption === option.value ? '#3b82f6' : (hoveredOption?.value === option.value ? '#60a5fa' : colors.border)
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
                        ...tooltipStyle,
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '1.25rem',
                        borderRadius: '10px',
                        fontSize: '0.85rem',
                        lineHeight: '1.5',
                        width: '350px',
                        zIndex: 1001,
                        marginTop: '8px'
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
                          borderBottom: `6px solid ${colors.bgSecondary}`
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
                          borderTop: `1px solid ${colors.border}`,
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
                color: colors.textPrimary,
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
                        backgroundColor: selectedOption === option.value ? '#3b82f6' : colors.bgSecondary,
                        color: selectedOption === option.value ? 'white' : colors.textPrimary,
                        border: `2px solid ${colors.border}`,
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
                        borderColor: selectedOption === option.value ? '#3b82f6' : (hoveredOption?.value === option.value ? '#60a5fa' : colors.border)
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
                        ...tooltipStyle,
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '1.25rem',
                        borderRadius: '10px',
                        fontSize: '0.85rem',
                        lineHeight: '1.5',
                        width: '350px',
                        zIndex: 1001,
                        marginTop: '8px'
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
                          borderBottom: `6px solid ${colors.bgSecondary}`
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
                          borderTop: `1px solid ${colors.border}`,
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
                color: colors.textPrimary,
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
                        backgroundColor: selectedOption === option.value ? '#3b82f6' : colors.bgSecondary,
                        color: selectedOption === option.value ? 'white' : colors.textPrimary,
                        border: `2px solid ${colors.border}`,
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
                        borderColor: selectedOption === option.value ? '#3b82f6' : (hoveredOption?.value === option.value ? '#60a5fa' : colors.border)
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
                        ...tooltipStyle,
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '1.25rem',
                        borderRadius: '10px',
                        fontSize: '0.85rem',
                        lineHeight: '1.5',
                        width: '350px',
                        zIndex: 1001,
                        marginTop: '8px'
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
                          borderBottom: `6px solid ${colors.bgSecondary}`
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
                          borderTop: `1px solid ${colors.border}`,
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
                color: colors.textPrimary,
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
                        backgroundColor: selectedOption === option.value ? '#3b82f6' : colors.bgSecondary,
                        color: selectedOption === option.value ? 'white' : colors.textPrimary,
                        border: `2px solid ${colors.border}`,
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
                        borderColor: selectedOption === option.value ? '#3b82f6' : (hoveredOption?.value === option.value ? '#60a5fa' : colors.border)
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
                        ...tooltipStyle,
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '1.25rem',
                        borderRadius: '10px',
                        fontSize: '0.85rem',
                        lineHeight: '1.5',
                        width: '350px',
                        zIndex: 1001,
                        marginTop: '8px'
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
                          borderBottom: `6px solid ${colors.bgSecondary}`
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
                          borderTop: `1px solid ${colors.border}`,
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
          backgroundColor: colors.bgPrimary,
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
          {/* Daily Challenge */}
          <div style={{
            backgroundColor: colors.bgSecondary,
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: isDark ? '0 4px 24px rgba(0, 0, 0, 0.3)' : '0 4px 24px rgba(0, 0, 0, 0.1)',
            border: `2px solid ${colors.border}`,
            marginBottom: '1.5rem'
          }}>
            <DailyChallenge
              userId={currentUser?.uid}
              onNavigate={(page) => {
                setSelectedOptionAndRef(page, null);
              }}
            />
          </div>

          {/* Progress Summary Card */}
          <div
            onClick={() => setSelectedOptionAndRef('Progress Dashboard')}
            style={{
              backgroundColor: colors.bgSecondary,
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: isDark ? '0 4px 24px rgba(0, 0, 0, 0.3)' : '0 4px 24px rgba(0, 0, 0, 0.1)',
              border: `2px solid ${colors.border}`,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = isDark ? '0 8px 32px rgba(0, 0, 0, 0.4)' : '0 8px 32px rgba(0, 0, 0, 0.15)'
              e.currentTarget.style.borderColor = '#3b82f6'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = isDark ? '0 4px 24px rgba(0, 0, 0, 0.3)' : '0 4px 24px rgba(0, 0, 0, 0.1)'
              e.currentTarget.style.borderColor = colors.border
            }}
          >

            {(() => {
              const stats = getProgressStats();
              const percentage = stats.progressPercent;

              return (
                <>
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem'
                  }}>
                    <div>
                      <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        color: colors.textPrimary,
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        📊 Progress Dashboard
                      </h2>
                      <p style={{
                        fontSize: '0.9rem',
                        color: colors.textMuted,
                        margin: '0.25rem 0 0 0'
                      }}>
                        Track your learning journey
                      </p>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#3b82f6',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      View Details →
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: '600', color: colors.textPrimary }}>
                        Overall Progress
                      </span>
                      <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#3b82f6' }}>
                        {percentage}%
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '24px',
                      backgroundColor: colors.border,
                      borderRadius: '12px',
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
                        paddingRight: '0.75rem',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: 'white'
                      }}>
                        {percentage > 15 && `${stats.completed}/${stats.total}`}
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid - Compact */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem'
                  }}>
                    <div style={{
                      backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : '#eff6ff',
                      padding: '1rem',
                      borderRadius: '10px',
                      textAlign: 'center',
                      border: '1px solid rgba(59, 130, 246, 0.3)'
                    }}>
                      <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#3b82f6' }}>
                        {stats.total}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: colors.textSecondary, fontWeight: '600' }}>
                        Total
                      </div>
                    </div>
                    <div style={{
                      backgroundColor: isDark ? 'rgba(16, 185, 129, 0.1)' : '#f0fdf4',
                      padding: '1rem',
                      borderRadius: '10px',
                      textAlign: 'center',
                      border: '1px solid rgba(16, 185, 129, 0.3)'
                    }}>
                      <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#10b981' }}>
                        {stats.completed}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: colors.textSecondary, fontWeight: '600' }}>
                        Done
                      </div>
                    </div>
                    <div style={{
                      backgroundColor: isDark ? 'rgba(245, 158, 11, 0.1)' : '#fef3c7',
                      padding: '1rem',
                      borderRadius: '10px',
                      textAlign: 'center',
                      border: '1px solid rgba(245, 158, 11, 0.3)'
                    }}>
                      <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#f59e0b' }}>
                        {stats.remaining}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: colors.textSecondary, fontWeight: '600' }}>
                        Left
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </main>
      )}

      {/* XP Gain Notifications */}
      <XPGainNotification />

      {/* Achievement Notifications */}
      <AchievementNotification />
    </div>
  )
}

export default App

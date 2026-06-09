import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const DESIGN_COLORS = {
  primary: '#a855f7',
  primaryHover: '#c084fc',
  bg: 'rgba(168, 85, 247, 0.1)',
  border: 'rgba(168, 85, 247, 0.3)',
  arrow: '#9333ea',
  hoverBg: 'rgba(168, 85, 247, 0.2)',
  topicBg: 'rgba(168, 85, 247, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(99, 102, 241, 0.15)', border: 'rgba(99, 102, 241, 0.3)' },
  { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const SingletonDiagram = () => (
  <svg viewBox="0 0 600 350" style={{ width: '100%', maxWidth: '600px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="singletonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowSing" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#6366f1" />
      </marker>
    </defs>
    <text x="300" y="30" fontSize="18" fontWeight="bold" fill="#6366f1" textAnchor="middle">Singleton Pattern</text>
    <rect x="200" y="70" width="200" height="150" rx="12" fill="url(#singletonGrad)" stroke="#4f46e5" strokeWidth="3" />
    <text x="300" y="100" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">Singleton Class</text>
    <rect x="220" y="120" width="160" height="30" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
    <text x="300" y="140" fontSize="12" fontWeight="600" fill="#6366f1" textAnchor="middle">- instance: Singleton</text>
    <line x1="220" y1="160" x2="380" y2="160" stroke="#6366f1" strokeWidth="2" />
    <rect x="220" y="170" width="160" height="30" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
    <text x="300" y="190" fontSize="12" fontWeight="600" fill="#6366f1" textAnchor="middle">+ getInstance()</text>
    <rect x="50" y="100" width="100" height="60" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
    <text x="100" y="125" fontSize="13" fontWeight="600" fill="#6366f1" textAnchor="middle">Client A</text>
    <text x="100" y="145" fontSize="11" fill="#6b7280" textAnchor="middle">Requests</text>
    <rect x="450" y="100" width="100" height="60" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
    <text x="500" y="125" fontSize="13" fontWeight="600" fill="#6366f1" textAnchor="middle">Client B</text>
    <text x="500" y="145" fontSize="11" fill="#6b7280" textAnchor="middle">Requests</text>
    <line x1="150" y1="130" x2="200" y2="130" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowSing)" />
    <line x1="450" y1="130" x2="400" y2="130" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowSing)" />
    <rect x="200" y="270" width="200" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
    <text x="300" y="295" fontSize="14" fontWeight="600" fill="#f59e0b" textAnchor="middle">Single Instance</text>
    <text x="300" y="312" fontSize="11" fill="#6b7280" textAnchor="middle">All clients get same object</text>
    <line x1="300" y1="220" x2="300" y2="270" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
  </svg>
)

const FactoryMethodDiagram = () => (
  <svg viewBox="0 0 700 400" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="factoryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowFactory" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
      </marker>
    </defs>
    <text x="350" y="30" fontSize="18" fontWeight="bold" fill="#10b981" textAnchor="middle">Factory Method Pattern</text>
    <rect x="250" y="60" width="200" height="100" rx="10" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
    <text x="350" y="85" fontSize="14" fontWeight="bold" fill="#047857" textAnchor="middle">abstract</text>
    <text x="350" y="105" fontSize="15" fontWeight="bold" fill="#047857" textAnchor="middle">Creator</text>
    <line x1="260" y1="115" x2="440" y2="115" stroke="#10b981" strokeWidth="1.5" />
    <text x="350" y="135" fontSize="12" fill="#047857" textAnchor="middle">+ factoryMethod()</text>
    <text x="350" y="150" fontSize="12" fill="#047857" textAnchor="middle">+ operation()</text>
    <rect x="100" y="220" width="160" height="80" rx="8" fill="url(#factoryGrad)" stroke="#059669" strokeWidth="2" />
    <text x="180" y="245" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">PDFCreator</text>
    <line x1="110" y1="255" x2="250" y2="255" stroke="white" strokeWidth="1" />
    <text x="180" y="275" fontSize="11" fill="white" textAnchor="middle">+ factoryMethod()</text>
    <text x="180" y="290" fontSize="10" fill="#d1fae5" textAnchor="middle">return PDFDoc</text>
    <rect x="440" y="220" width="160" height="80" rx="8" fill="url(#factoryGrad)" stroke="#059669" strokeWidth="2" />
    <text x="520" y="245" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">WordCreator</text>
    <line x1="450" y1="255" x2="590" y2="255" stroke="white" strokeWidth="1" />
    <text x="520" y="275" fontSize="11" fill="white" textAnchor="middle">+ factoryMethod()</text>
    <text x="520" y="290" fontSize="10" fill="#d1fae5" textAnchor="middle">return WordDoc</text>
    <line x1="180" y1="220" x2="300" y2="160" stroke="#10b981" strokeWidth="2" />
    <polygon points="295,165 300,160 305,165" fill="white" stroke="#10b981" strokeWidth="2" />
    <line x1="520" y1="220" x2="400" y2="160" stroke="#10b981" strokeWidth="2" />
    <polygon points="395,165 400,160 405,165" fill="white" stroke="#10b981" strokeWidth="2" />
    <rect x="120" y="330" width="120" height="50" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
    <text x="180" y="352" fontSize="13" fontWeight="600" fill="#f59e0b" textAnchor="middle">PDFDocument</text>
    <text x="180" y="368" fontSize="10" fill="#92400e" textAnchor="middle">Product A</text>
    <rect x="460" y="330" width="120" height="50" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
    <text x="520" y="352" fontSize="13" fontWeight="600" fill="#f59e0b" textAnchor="middle">WordDocument</text>
    <text x="520" y="368" fontSize="10" fill="#92400e" textAnchor="middle">Product B</text>
    <line x1="180" y1="300" x2="180" y2="330" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arrowFactory)" />
    <line x1="520" y1="300" x2="520" y2="330" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arrowFactory)" />
  </svg>
)

const BuilderDiagram = () => (
  <svg viewBox="0 0 650 350" style={{ width: '100%', maxWidth: '650px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="builderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowBuilder" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#f59e0b" />
      </marker>
    </defs>
    <text x="325" y="30" fontSize="18" fontWeight="bold" fill="#f59e0b" textAnchor="middle">Builder Pattern</text>
    <rect x="40" y="80" width="120" height="60" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
    <text x="100" y="107" fontSize="14" fontWeight="bold" fill="#92400e" textAnchor="middle">Client</text>
    <text x="100" y="125" fontSize="11" fill="#92400e" textAnchor="middle">Uses Builder</text>
    <rect x="240" y="70" width="160" height="110" rx="8" fill="url(#builderGrad)" stroke="#d97706" strokeWidth="2" />
    <text x="320" y="95" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Builder</text>
    <line x1="250" y1="105" x2="390" y2="105" stroke="white" strokeWidth="1" />
    <text x="320" y="125" fontSize="11" fill="white" textAnchor="middle">setName()</text>
    <text x="320" y="142" fontSize="11" fill="white" textAnchor="middle">setAge()</text>
    <text x="320" y="159" fontSize="11" fill="white" textAnchor="middle">setEmail()</text>
    <text x="320" y="176" fontSize="11" fill="white" textAnchor="middle">build()</text>
    <rect x="480" y="80" width="130" height="100" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
    <text x="545" y="105" fontSize="14" fontWeight="bold" fill="#1e40af" textAnchor="middle">Product</text>
    <line x1="490" y1="115" x2="600" y2="115" stroke="#3b82f6" strokeWidth="1" />
    <text x="545" y="135" fontSize="10" fill="#1e40af" textAnchor="middle">- name</text>
    <text x="545" y="150" fontSize="10" fill="#1e40af" textAnchor="middle">- age</text>
    <text x="545" y="165" fontSize="10" fill="#1e40af" textAnchor="middle">- email</text>
    <rect x="200" y="230" width="250" height="90" rx="8" fill="#f3f4f6" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="3,3" />
    <text x="325" y="252" fontSize="13" fontWeight="600" fill="#374151" textAnchor="middle">Construction Steps</text>
    <text x="230" y="272" fontSize="11" fill="#6b7280">1. new Builder()</text>
    <text x="230" y="288" fontSize="11" fill="#6b7280">2. setName("John")</text>
    <text x="230" y="304" fontSize="11" fill="#6b7280">3. setAge(30)</text>
    <line x1="160" y1="110" x2="240" y2="110" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowBuilder)" />
    <line x1="400" y1="130" x2="480" y2="130" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBuilder)" />
    <text x="440" y="125" fontSize="10" fill="#3b82f6">builds</text>
  </svg>
)

const ObserverDiagram = () => (
  <svg viewBox="0 0 700 400" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="observerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowObserver" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#8b5cf6" />
      </marker>
    </defs>
    <text x="350" y="30" fontSize="18" fontWeight="bold" fill="#8b5cf6" textAnchor="middle">Observer Pattern</text>
    <rect x="250" y="70" width="200" height="100" rx="10" fill="url(#observerGrad)" stroke="#7c3aed" strokeWidth="2" />
    <text x="350" y="95" fontSize="15" fontWeight="bold" fill="white" textAnchor="middle">Subject</text>
    <line x1="260" y1="105" x2="440" y2="105" stroke="white" strokeWidth="1" />
    <text x="350" y="125" fontSize="11" fill="white" textAnchor="middle">+ attach(Observer)</text>
    <text x="350" y="142" fontSize="11" fill="white" textAnchor="middle">+ detach(Observer)</text>
    <text x="350" y="159" fontSize="11" fill="white" textAnchor="middle">+ notify()</text>
    <rect x="80" y="250" width="140" height="80" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
    <text x="150" y="275" fontSize="14" fontWeight="bold" fill="#6d28d9" textAnchor="middle">Observer A</text>
    <line x1="90" y1="285" x2="210" y2="285" stroke="#8b5cf6" strokeWidth="1" />
    <text x="150" y="305" fontSize="11" fill="#6d28d9" textAnchor="middle">+ update()</text>
    <rect x="280" y="250" width="140" height="80" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
    <text x="350" y="275" fontSize="14" fontWeight="bold" fill="#6d28d9" textAnchor="middle">Observer B</text>
    <line x1="290" y1="285" x2="410" y2="285" stroke="#8b5cf6" strokeWidth="1" />
    <text x="350" y="305" fontSize="11" fill="#6d28d9" textAnchor="middle">+ update()</text>
    <rect x="480" y="250" width="140" height="80" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
    <text x="550" y="275" fontSize="14" fontWeight="bold" fill="#6d28d9" textAnchor="middle">Observer C</text>
    <line x1="490" y1="285" x2="610" y2="285" stroke="#8b5cf6" strokeWidth="1" />
    <text x="550" y="305" fontSize="11" fill="#6d28d9" textAnchor="middle">+ update()</text>
    <line x1="150" y1="250" x2="300" y2="170" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrowObserver)" strokeDasharray="5,3" />
    <line x1="350" y1="250" x2="350" y2="170" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrowObserver)" strokeDasharray="5,3" />
    <line x1="550" y1="250" x2="400" y2="170" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrowObserver)" strokeDasharray="5,3" />
    <text x="200" y="210" fontSize="11" fill="#ef4444" fontWeight="600">notify()</text>
    <text x="420" y="210" fontSize="11" fill="#ef4444" fontWeight="600">notify()</text>
    <rect x="200" y="355" width="300" height="35" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="350" y="377" fontSize="12" fill="#92400e" textAnchor="middle">When Subject changes, all Observers are notified</text>
  </svg>
)

const StrategyDiagram = () => (
  <svg viewBox="0 0 650 380" style={{ width: '100%', maxWidth: '650px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="strategyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#db2777', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowStrategy" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#ec4899" />
      </marker>
    </defs>
    <text x="325" y="30" fontSize="18" fontWeight="bold" fill="#ec4899" textAnchor="middle">Strategy Pattern</text>
    <rect x="40" y="80" width="140" height="90" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
    <text x="110" y="105" fontSize="14" fontWeight="bold" fill="#92400e" textAnchor="middle">Context</text>
    <line x1="50" y1="115" x2="170" y2="115" stroke="#f59e0b" strokeWidth="1" />
    <text x="110" y="135" fontSize="11" fill="#92400e" textAnchor="middle">- strategy</text>
    <text x="110" y="153" fontSize="11" fill="#92400e" textAnchor="middle">+ setStrategy()</text>
    <text x="110" y="167" fontSize="11" fill="#92400e" textAnchor="middle">+ execute()</text>
    <rect x="260" y="80" width="150" height="70" rx="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
    <text x="335" y="105" fontSize="13" fontWeight="bold" fill="#9f1239" textAnchor="middle">interface</text>
    <text x="335" y="125" fontSize="14" fontWeight="bold" fill="#9f1239" textAnchor="middle">Strategy</text>
    <text x="335" y="143" fontSize="11" fill="#9f1239" textAnchor="middle">+ execute()</text>
    <rect x="120" y="240" width="130" height="70" rx="8" fill="url(#strategyGrad)" stroke="#db2777" strokeWidth="2" />
    <text x="185" y="265" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">StrategyA</text>
    <line x1="130" y1="275" x2="240" y2="275" stroke="white" strokeWidth="1" />
    <text x="185" y="295" fontSize="11" fill="white" textAnchor="middle">+ execute()</text>
    <rect x="270" y="240" width="130" height="70" rx="8" fill="url(#strategyGrad)" stroke="#db2777" strokeWidth="2" />
    <text x="335" y="265" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">StrategyB</text>
    <line x1="280" y1="275" x2="390" y2="275" stroke="white" strokeWidth="1" />
    <text x="335" y="295" fontSize="11" fill="white" textAnchor="middle">+ execute()</text>
    <rect x="420" y="240" width="130" height="70" rx="8" fill="url(#strategyGrad)" stroke="#db2777" strokeWidth="2" />
    <text x="485" y="265" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">StrategyC</text>
    <line x1="430" y1="275" x2="540" y2="275" stroke="white" strokeWidth="1" />
    <text x="485" y="295" fontSize="11" fill="white" textAnchor="middle">+ execute()</text>
    <line x1="180" y1="125" x2="260" y2="125" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowStrategy)" />
    <text x="220" y="115" fontSize="10" fill="#ec4899">uses</text>
    <line x1="185" y1="240" x2="300" y2="150" stroke="#ec4899" strokeWidth="2" strokeDasharray="5,5" />
    <polygon points="295,155 300,150 305,155" fill="white" stroke="#ec4899" strokeWidth="2" />
    <line x1="335" y1="240" x2="335" y2="150" stroke="#ec4899" strokeWidth="2" strokeDasharray="5,5" />
    <polygon points="330,155 335,150 340,155" fill="white" stroke="#ec4899" strokeWidth="2" />
    <line x1="485" y1="240" x2="370" y2="150" stroke="#ec4899" strokeWidth="2" strokeDasharray="5,5" />
    <polygon points="365,155 370,150 375,155" fill="white" stroke="#ec4899" strokeWidth="2" />
    <rect x="180" y="340" width="290" height="30" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
    <text x="325" y="360" fontSize="11" fill="#1e40af" textAnchor="middle">Algorithms can be switched at runtime</text>
  </svg>
)

const DecoratorDiagram = () => (
  <svg viewBox="0 0 750 400" style={{ width: '100%', maxWidth: '750px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="decoratorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowDecorator" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#059669" />
      </marker>
    </defs>
    <text x="375" y="30" fontSize="18" fontWeight="bold" fill="#10b981" textAnchor="middle">Decorator Pattern</text>
    <rect x="280" y="50" width="190" height="80" fill="url(#decoratorGrad)" stroke="#059669" strokeWidth="2" rx="5" />
    <text x="375" y="75" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">interface</text>
    <text x="375" y="95" textAnchor="middle" fill="white" fontSize="17" fontWeight="bold">Component</text>
    <line x1="290" y1="105" x2="460" y2="105" stroke="white" strokeWidth="1" />
    <text x="295" y="122" fill="white" fontSize="12">+ operation()</text>
    <rect x="80" y="180" width="160" height="70" fill="#d1fae5" stroke="#10b981" strokeWidth="2" rx="5" />
    <text x="160" y="205" textAnchor="middle" fill="#059669" fontSize="16" fontWeight="bold">ConcreteComponent</text>
    <line x1="90" y1="215" x2="230" y2="215" stroke="#10b981" strokeWidth="1" />
    <text x="95" y="232" fill="#047857" fontSize="12">+ operation()</text>
    <rect x="310" y="180" width="130" height="90" fill="url(#decoratorGrad)" stroke="#059669" strokeWidth="2" rx="5" />
    <text x="375" y="205" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">abstract</text>
    <text x="375" y="222" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">Decorator</text>
    <line x1="320" y1="232" x2="430" y2="232" stroke="white" strokeWidth="1" />
    <text x="320" y="247" fill="white" fontSize="11">- component</text>
    <line x1="320" y1="252" x2="430" y2="252" stroke="white" strokeWidth="1" />
    <text x="320" y="266" fill="white" fontSize="11">+ operation()</text>
    <rect x="490" y="300" width="120" height="65" fill="#d1fae5" stroke="#10b981" strokeWidth="2" rx="5" />
    <text x="550" y="322" textAnchor="middle" fill="#059669" fontSize="14" fontWeight="bold">DecoratorA</text>
    <line x1="500" y1="330" x2="600" y2="330" stroke="#10b981" strokeWidth="1" />
    <text x="505" y="345" fill="#047857" fontSize="11">+ operation()</text>
    <text x="505" y="358" fill="#047857" fontSize="10">+ extra behavior</text>
    <rect x="630" y="300" width="110" height="65" fill="#d1fae5" stroke="#10b981" strokeWidth="2" rx="5" />
    <text x="685" y="322" textAnchor="middle" fill="#059669" fontSize="14" fontWeight="bold">DecoratorB</text>
    <line x1="640" y1="330" x2="730" y2="330" stroke="#10b981" strokeWidth="1" />
    <text x="645" y="345" fill="#047857" fontSize="11">+ operation()</text>
    <text x="645" y="358" fill="#047857" fontSize="10">+ extra behavior</text>
    <line x1="160" y1="180" x2="320" y2="130" stroke="#059669" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowDecorator)" />
    <line x1="375" y1="130" x2="375" y2="180" stroke="#059669" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowDecorator)" />
    <line x1="550" y1="300" x2="400" y2="270" stroke="#059669" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowDecorator)" />
    <line x1="685" y1="300" x2="420" y2="270" stroke="#059669" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowDecorator)" />
    <path d="M 310 225 L 240 215" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowDecorator)" />
    <text x="255" y="210" fill="#059669" fontSize="11" fontWeight="bold">wraps</text>
  </svg>
)

const AdapterDiagram = () => (
  <svg viewBox="0 0 700 350" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="adapterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowAdapter" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#d97706" />
      </marker>
    </defs>
    <text x="350" y="30" fontSize="18" fontWeight="bold" fill="#f59e0b" textAnchor="middle">Adapter Pattern</text>
    <rect x="30" y="140" width="140" height="70" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="5" />
    <text x="100" y="165" textAnchor="middle" fill="#d97706" fontSize="16" fontWeight="bold">Client</text>
    <line x1="40" y1="175" x2="160" y2="175" stroke="#f59e0b" strokeWidth="1" />
    <text x="45" y="192" fill="#b45309" fontSize="13">Uses Target</text>
    <rect x="250" y="50" width="180" height="80" fill="url(#adapterGrad)" stroke="#d97706" strokeWidth="2" rx="5" />
    <text x="340" y="75" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">interface</text>
    <text x="340" y="95" textAnchor="middle" fill="white" fontSize="17" fontWeight="bold">Target</text>
    <line x1="260" y1="105" x2="420" y2="105" stroke="white" strokeWidth="1" />
    <text x="265" y="122" fill="white" fontSize="13">+ request()</text>
    <rect x="250" y="170" width="180" height="100" fill="url(#adapterGrad)" stroke="#d97706" strokeWidth="2" rx="5" />
    <text x="340" y="195" textAnchor="middle" fill="white" fontSize="17" fontWeight="bold">Adapter</text>
    <line x1="260" y1="205" x2="420" y2="205" stroke="white" strokeWidth="1" />
    <text x="265" y="222" fill="white" fontSize="12">- adaptee: Adaptee</text>
    <line x1="260" y1="230" x2="420" y2="230" stroke="white" strokeWidth="1" />
    <text x="265" y="247" fill="white" fontSize="12">+ request()</text>
    <text x="270" y="262" fill="#fef3c7" fontSize="11" fontStyle="italic">calls adaptee.specificRequest()</text>
    <rect x="500" y="170" width="180" height="100" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="5" />
    <text x="590" y="195" textAnchor="middle" fill="#d97706" fontSize="16" fontWeight="bold">Adaptee</text>
    <line x1="510" y1="205" x2="670" y2="205" stroke="#f59e0b" strokeWidth="1" />
    <text x="515" y="222" fill="#b45309" fontSize="12">(Incompatible Interface)</text>
    <line x1="510" y1="230" x2="670" y2="230" stroke="#f59e0b" strokeWidth="1" />
    <text x="515" y="247" fill="#b45309" fontSize="12">+ specificRequest()</text>
    <path d="M 170 175 L 250 90" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowAdapter)" />
    <text x="185" y="125" fill="#d97706" fontSize="12" fontWeight="bold">uses</text>
    <line x1="340" y1="130" x2="340" y2="170" stroke="#d97706" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowAdapter)" />
    <path d="M 430 220 L 500 220" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrowAdapter)" />
    <text x="440" y="210" fill="#d97706" fontSize="12" fontWeight="bold">wraps</text>
  </svg>
)

const FacadeDiagram = () => (
  <svg viewBox="0 0 700 380" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="facadeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowFacade" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#2563eb" />
      </marker>
    </defs>
    <text x="350" y="30" fontSize="18" fontWeight="bold" fill="#3b82f6" textAnchor="middle">Facade Pattern</text>
    <rect x="30" y="150" width="120" height="60" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="5" />
    <text x="90" y="175" textAnchor="middle" fill="#2563eb" fontSize="16" fontWeight="bold">Client</text>
    <text x="90" y="195" textAnchor="middle" fill="#1e40af" fontSize="12">Simple API</text>
    <rect x="220" y="120" width="180" height="120" fill="url(#facadeGrad)" stroke="#2563eb" strokeWidth="2" rx="5" />
    <text x="310" y="150" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Facade</text>
    <line x1="230" y1="160" x2="390" y2="160" stroke="white" strokeWidth="1" />
    <text x="235" y="177" fill="white" fontSize="12">- subsystemA</text>
    <text x="235" y="192" fill="white" fontSize="12">- subsystemB</text>
    <text x="235" y="207" fill="white" fontSize="12">- subsystemC</text>
    <line x1="230" y1="213" x2="390" y2="213" stroke="white" strokeWidth="1" />
    <text x="235" y="230" fill="white" fontSize="12">+ simpleOperation()</text>
    <rect x="480" y="50" width="180" height="280" fill="#f0f9ff" stroke="#3b82f6" strokeWidth="2" rx="5" strokeDasharray="5,5" />
    <text x="570" y="40" textAnchor="middle" fill="#1e40af" fontSize="14" fontWeight="bold">Complex Subsystem</text>
    <rect x="500" y="70" width="140" height="60" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="5" />
    <text x="570" y="95" textAnchor="middle" fill="#2563eb" fontSize="14" fontWeight="bold">SubsystemA</text>
    <text x="510" y="115" fill="#1e40af" fontSize="11">+ operationA()</text>
    <rect x="500" y="150" width="140" height="60" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="5" />
    <text x="570" y="175" textAnchor="middle" fill="#2563eb" fontSize="14" fontWeight="bold">SubsystemB</text>
    <text x="510" y="195" fill="#1e40af" fontSize="11">+ operationB()</text>
    <rect x="500" y="230" width="140" height="60" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="5" />
    <text x="570" y="255" textAnchor="middle" fill="#2563eb" fontSize="14" fontWeight="bold">SubsystemC</text>
    <text x="510" y="275" fill="#1e40af" fontSize="11">+ operationC()</text>
    <path d="M 150 180 L 220 180" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowFacade)" />
    <text x="165" y="170" fill="#2563eb" fontSize="12" fontWeight="bold">uses</text>
    <path d="M 400 150 L 500 100" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowFacade)" />
    <path d="M 400 180 L 500 180" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowFacade)" />
    <path d="M 400 210 L 500 260" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowFacade)" />
    <rect x="30" y="320" width="380" height="50" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="5" />
    <text x="220" y="342" textAnchor="middle" fill="#1e3a8a" fontSize="13" fontWeight="bold">Benefit: Client calls one simple method</text>
    <text x="220" y="358" textAnchor="middle" fill="#1e40af" fontSize="12">Facade coordinates all complex subsystems</text>
  </svg>
)

const CommandDiagram = () => (
  <svg viewBox="0 0 750 400" style={{ width: '100%', maxWidth: '750px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="commandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#64748b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#475569', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowCommand" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#475569" />
      </marker>
    </defs>
    <text x="375" y="30" fontSize="18" fontWeight="bold" fill="#64748b" textAnchor="middle">Command Pattern</text>
    <rect x="300" y="50" width="150" height="80" fill="url(#commandGrad)" stroke="#475569" strokeWidth="2" rx="5" />
    <text x="375" y="75" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">interface</text>
    <text x="375" y="95" textAnchor="middle" fill="white" fontSize="17" fontWeight="bold">Command</text>
    <line x1="310" y1="105" x2="440" y2="105" stroke="white" strokeWidth="1" />
    <text x="315" y="122" fill="white" fontSize="12">+ execute()</text>
    <rect x="150" y="180" width="140" height="90" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" rx="5" />
    <text x="220" y="205" textAnchor="middle" fill="#475569" fontSize="15" fontWeight="bold">CommandA</text>
    <line x1="160" y1="215" x2="280" y2="215" stroke="#64748b" strokeWidth="1" />
    <text x="165" y="230" fill="#334155" fontSize="11">- receiver: Receiver</text>
    <line x1="160" y1="238" x2="280" y2="238" stroke="#64748b" strokeWidth="1" />
    <text x="165" y="253" fill="#334155" fontSize="11">+ execute()</text>
    <text x="165" y="266" fill="#334155" fontSize="10">+ undo()</text>
    <rect x="310" y="180" width="130" height="90" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" rx="5" />
    <text x="375" y="205" textAnchor="middle" fill="#475569" fontSize="15" fontWeight="bold">CommandB</text>
    <line x1="320" y1="215" x2="430" y2="215" stroke="#64748b" strokeWidth="1" />
    <text x="325" y="230" fill="#334155" fontSize="11">- receiver</text>
    <line x1="320" y1="238" x2="430" y2="238" stroke="#64748b" strokeWidth="1" />
    <text x="325" y="253" fill="#334155" fontSize="11">+ execute()</text>
    <rect x="50" y="200" width="80" height="50" fill="url(#commandGrad)" stroke="#475569" strokeWidth="2" rx="5" />
    <text x="90" y="225" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Invoker</text>
    <text x="90" y="240" textAnchor="middle" fill="white" fontSize="10">triggers</text>
    <rect x="550" y="180" width="150" height="90" fill="url(#commandGrad)" stroke="#475569" strokeWidth="2" rx="5" />
    <text x="625" y="205" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Receiver</text>
    <text x="560" y="222" fill="white" fontSize="12">(actual work)</text>
    <line x1="560" y1="230" x2="690" y2="230" stroke="white" strokeWidth="1" />
    <text x="565" y="247" fill="white" fontSize="11">+ action()</text>
    <text x="565" y="262" fill="white" fontSize="11">+ anotherAction()</text>
    <line x1="220" y1="180" x2="340" y2="130" stroke="#475569" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowCommand)" />
    <line x1="375" y1="130" x2="375" y2="180" stroke="#475569" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowCommand)" />
    <path d="M 130 225 L 150 215" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowCommand)" />
    <path d="M 290 245 L 550 225" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arrowCommand)" />
    <path d="M 440 245 L 550 225" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arrowCommand)" />
    <text x="430" y="255" fill="#475569" fontSize="11" fontWeight="bold">calls</text>
    <rect x="50" y="310" width="600" height="70" fill="#f8fafc" stroke="#64748b" strokeWidth="2" rx="5" strokeDasharray="5,5" />
    <text x="60" y="330" fill="#1e293b" fontSize="13" fontWeight="bold">Command Pattern Flow:</text>
    <text x="60" y="348" fill="#334155" fontSize="11">1. Client creates Command with Receiver  2. Client passes Command to Invoker</text>
    <text x="60" y="366" fill="#334155" fontSize="11">3. Invoker.execute() calls command.execute()  4. Command calls method on Receiver</text>
  </svg>
)

const ProxyDiagram = () => (
  <svg viewBox="0 0 700 340" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="proxyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowProxy" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#dc2626" />
      </marker>
    </defs>
    <text x="350" y="30" fontSize="18" fontWeight="bold" fill="#ef4444" textAnchor="middle">Proxy Pattern</text>
    <rect x="280" y="50" width="150" height="70" fill="url(#proxyGrad)" stroke="#dc2626" strokeWidth="2" rx="5" />
    <text x="355" y="75" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">interface</text>
    <text x="355" y="95" textAnchor="middle" fill="white" fontSize="17" fontWeight="bold">Subject</text>
    <text x="290" y="115" fill="white" fontSize="13">+ request()</text>
    <rect x="100" y="170" width="180" height="110" fill="url(#proxyGrad)" stroke="#dc2626" strokeWidth="2" rx="5" />
    <text x="190" y="195" textAnchor="middle" fill="white" fontSize="17" fontWeight="bold">Proxy</text>
    <line x1="110" y1="205" x2="270" y2="205" stroke="white" strokeWidth="1" />
    <text x="115" y="222" fill="white" fontSize="12">- realSubject: RealSubject</text>
    <line x1="110" y1="230" x2="270" y2="230" stroke="white" strokeWidth="1" />
    <text x="115" y="247" fill="white" fontSize="12">+ request()</text>
    <text x="120" y="272" fill="#fee2e2" fontSize="11" fontStyle="italic">Controls access / lazy loading</text>
    <rect x="430" y="170" width="180" height="110" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="5" />
    <text x="520" y="195" textAnchor="middle" fill="#dc2626" fontSize="17" fontWeight="bold">RealSubject</text>
    <line x1="440" y1="205" x2="600" y2="205" stroke="#ef4444" strokeWidth="1" />
    <text x="445" y="222" fill="#b91c1c" fontSize="12">- expensiveResource</text>
    <line x1="440" y1="230" x2="600" y2="230" stroke="#ef4444" strokeWidth="1" />
    <text x="445" y="247" fill="#b91c1c" fontSize="12">+ request()</text>
    <text x="450" y="272" fill="#991b1b" fontSize="11" fontStyle="italic">Expensive to create</text>
    <rect x="30" y="70" width="130" height="60" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="5" />
    <text x="95" y="95" textAnchor="middle" fill="#dc2626" fontSize="16" fontWeight="bold">Client</text>
    <text x="95" y="115" textAnchor="middle" fill="#b91c1c" fontSize="11">Uses Subject</text>
    <line x1="190" y1="170" x2="310" y2="120" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowProxy)" />
    <line x1="520" y1="170" x2="400" y2="120" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowProxy)" />
    <path d="M 160 100 L 280 85" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowProxy)" />
    <text x="195" y="90" fill="#dc2626" fontSize="11" fontWeight="bold">uses</text>
    <path d="M 280 225 L 430 225" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrowProxy)" />
    <text x="320" y="215" fill="#dc2626" fontSize="12" fontWeight="bold">delegates to</text>
  </svg>
)

const StateDiagram = () => (
  <svg viewBox="0 0 700 420" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="stateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#84cc16', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#65a30d', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowState" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#65a30d" />
      </marker>
    </defs>
    <text x="350" y="30" fontSize="18" fontWeight="bold" fill="#84cc16" textAnchor="middle">State Pattern</text>
    <rect x="280" y="50" width="140" height="80" fill="url(#stateGrad)" stroke="#65a30d" strokeWidth="2" rx="5" />
    <text x="350" y="75" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Context</text>
    <text x="290" y="92" fill="white" fontSize="11">(e.g. VendingMachine)</text>
    <line x1="290" y1="100" x2="410" y2="100" stroke="white" strokeWidth="1" />
    <text x="295" y="115" fill="white" fontSize="11">- currentState</text>
    <text x="295" y="128" fill="white" fontSize="11">+ request()</text>
    <rect x="280" y="170" width="140" height="70" fill="#ecfccb" stroke="#84cc16" strokeWidth="2" rx="5" />
    <text x="350" y="190" textAnchor="middle" fill="#65a30d" fontSize="14" fontWeight="bold">interface</text>
    <text x="350" y="208" textAnchor="middle" fill="#65a30d" fontSize="15" fontWeight="bold">State</text>
    <line x1="290" y1="218" x2="410" y2="218" stroke="#84cc16" strokeWidth="1" />
    <text x="295" y="232" fill="#4d7c0f" fontSize="11">+ handle()</text>
    <rect x="50" y="290" width="130" height="70" fill="#ecfccb" stroke="#84cc16" strokeWidth="2" rx="5" />
    <text x="115" y="315" textAnchor="middle" fill="#65a30d" fontSize="14" fontWeight="bold">StateA</text>
    <line x1="60" y1="325" x2="170" y2="325" stroke="#84cc16" strokeWidth="1" />
    <text x="65" y="340" fill="#4d7c0f" fontSize="11">+ handle()</text>
    <text x="70" y="353" fill="#3f6212" fontSize="10" fontStyle="italic">transition to B</text>
    <rect x="200" y="290" width="130" height="70" fill="#ecfccb" stroke="#84cc16" strokeWidth="2" rx="5" />
    <text x="265" y="315" textAnchor="middle" fill="#65a30d" fontSize="14" fontWeight="bold">StateB</text>
    <line x1="210" y1="325" x2="320" y2="325" stroke="#84cc16" strokeWidth="1" />
    <text x="215" y="340" fill="#4d7c0f" fontSize="11">+ handle()</text>
    <text x="220" y="353" fill="#3f6212" fontSize="10" fontStyle="italic">transition to C</text>
    <rect x="350" y="290" width="130" height="70" fill="#ecfccb" stroke="#84cc16" strokeWidth="2" rx="5" />
    <text x="415" y="315" textAnchor="middle" fill="#65a30d" fontSize="14" fontWeight="bold">StateC</text>
    <line x1="360" y1="325" x2="470" y2="325" stroke="#84cc16" strokeWidth="1" />
    <text x="365" y="340" fill="#4d7c0f" fontSize="11">+ handle()</text>
    <text x="370" y="353" fill="#3f6212" fontSize="10" fontStyle="italic">transition to A</text>
    <path d="M 350 130 L 350 170" stroke="#65a30d" strokeWidth="2" markerEnd="url(#arrowState)" />
    <text x="360" y="155" fill="#65a30d" fontSize="11" fontWeight="bold">has</text>
    <line x1="115" y1="290" x2="300" y2="240" stroke="#65a30d" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowState)" />
    <line x1="265" y1="290" x2="330" y2="240" stroke="#65a30d" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowState)" />
    <line x1="415" y1="290" x2="370" y2="240" stroke="#65a30d" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowState)" />
    <path d="M 180 315 L 200 315" stroke="#84cc16" strokeWidth="2" markerEnd="url(#arrowState)" />
    <path d="M 330 315 L 350 315" stroke="#84cc16" strokeWidth="2" markerEnd="url(#arrowState)" />
    <path d="M 415 360 Q 265 400 115 360" stroke="#84cc16" strokeWidth="2" markerEnd="url(#arrowState)" fill="none" />
    <rect x="50" y="380" width="600" height="30" fill="#f7fee7" stroke="#84cc16" strokeWidth="2" rx="5" />
    <text x="350" y="400" textAnchor="middle" fill="#3f6212" fontSize="12">Each state encapsulates behavior and transitions</text>
  </svg>
)

const AbstractFactoryDiagram = () => (
  <svg viewBox="0 0 700 400" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="abstractFactoryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#0284c7', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <text x="350" y="25" fontSize="18" fontWeight="bold" fill="#0ea5e9" textAnchor="middle">Abstract Factory Pattern</text>
    <rect x="250" y="45" width="200" height="70" rx="8" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="2" />
    <text x="350" y="70" fontSize="14" fontWeight="bold" fill="#0369a1" textAnchor="middle">AbstractFactory</text>
    <text x="350" y="90" fontSize="11" fill="#0369a1" textAnchor="middle">+ createProductA()</text>
    <text x="350" y="105" fontSize="11" fill="#0369a1" textAnchor="middle">+ createProductB()</text>
    <rect x="80" y="150" width="160" height="60" rx="8" fill="url(#abstractFactoryGrad)" stroke="#0284c7" strokeWidth="2" />
    <text x="160" y="175" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">WinFactory</text>
    <text x="160" y="195" fontSize="10" fill="white" textAnchor="middle">Windows widgets</text>
    <rect x="460" y="150" width="160" height="60" rx="8" fill="url(#abstractFactoryGrad)" stroke="#0284c7" strokeWidth="2" />
    <text x="540" y="175" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">MacFactory</text>
    <text x="540" y="195" fontSize="10" fill="white" textAnchor="middle">Mac widgets</text>
    <rect x="40" y="260" width="100" height="45" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
    <text x="90" y="287" fontSize="11" fontWeight="600" fill="#92400e" textAnchor="middle">WinButton</text>
    <rect x="160" y="260" width="100" height="45" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
    <text x="210" y="287" fontSize="11" fontWeight="600" fill="#92400e" textAnchor="middle">WinCheckbox</text>
    <rect x="440" y="260" width="100" height="45" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
    <text x="490" y="287" fontSize="11" fontWeight="600" fill="#92400e" textAnchor="middle">MacButton</text>
    <rect x="560" y="260" width="100" height="45" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
    <text x="610" y="287" fontSize="11" fontWeight="600" fill="#92400e" textAnchor="middle">MacCheckbox</text>
    <line x1="160" y1="150" x2="300" y2="115" stroke="#0ea5e9" strokeWidth="2" />
    <line x1="540" y1="150" x2="400" y2="115" stroke="#0ea5e9" strokeWidth="2" />
    <line x1="90" y1="260" x2="130" y2="210" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" />
    <line x1="210" y1="260" x2="180" y2="210" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" />
    <line x1="490" y1="260" x2="520" y2="210" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" />
    <line x1="610" y1="260" x2="560" y2="210" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" />
    <rect x="200" y="340" width="300" height="40" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
    <text x="350" y="365" fontSize="12" fill="#047857" textAnchor="middle">Creates families of related objects without specifying concrete classes</text>
  </svg>
)

const PrototypeDiagram = () => (
  <svg viewBox="0 0 600 320" style={{ width: '100%', maxWidth: '600px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="prototypeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f472b6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <text x="300" y="25" fontSize="18" fontWeight="bold" fill="#ec4899" textAnchor="middle">Prototype Pattern</text>
    <rect x="200" y="50" width="200" height="60" rx="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
    <text x="300" y="75" fontSize="14" fontWeight="bold" fill="#be185d" textAnchor="middle">Prototype</text>
    <text x="300" y="95" fontSize="11" fill="#be185d" textAnchor="middle">+ clone(): Prototype</text>
    <rect x="80" y="160" width="180" height="80" rx="8" fill="url(#prototypeGrad)" stroke="#db2777" strokeWidth="2" />
    <text x="170" y="185" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">ConcretePrototype1</text>
    <line x1="90" y1="195" x2="250" y2="195" stroke="white" strokeWidth="1" />
    <text x="170" y="215" fontSize="10" fill="white" textAnchor="middle">- field1, field2</text>
    <text x="170" y="230" fontSize="10" fill="white" textAnchor="middle">+ clone()</text>
    <rect x="340" y="160" width="180" height="80" rx="8" fill="url(#prototypeGrad)" stroke="#db2777" strokeWidth="2" />
    <text x="430" y="185" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">ConcretePrototype2</text>
    <line x1="350" y1="195" x2="510" y2="195" stroke="white" strokeWidth="1" />
    <text x="430" y="215" fontSize="10" fill="white" textAnchor="middle">- fieldA, fieldB</text>
    <text x="430" y="230" fontSize="10" fill="white" textAnchor="middle">+ clone()</text>
    <line x1="170" y1="160" x2="250" y2="110" stroke="#ec4899" strokeWidth="2" />
    <line x1="430" y1="160" x2="350" y2="110" stroke="#ec4899" strokeWidth="2" />
    <rect x="150" y="270" width="300" height="35" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="300" y="292" fontSize="12" fill="#92400e" textAnchor="middle">Clone existing objects without coupling to their classes</text>
  </svg>
)

const CompositeDiagram = () => (
  <svg viewBox="0 0 650 380" style={{ width: '100%', maxWidth: '650px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="compositeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#a78bfa', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <text x="325" y="25" fontSize="18" fontWeight="bold" fill="#8b5cf6" textAnchor="middle">Composite Pattern</text>
    <rect x="225" y="50" width="200" height="60" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
    <text x="325" y="75" fontSize="14" fontWeight="bold" fill="#6d28d9" textAnchor="middle">Component</text>
    <text x="325" y="95" fontSize="11" fill="#6d28d9" textAnchor="middle">+ operation()</text>
    <rect x="80" y="160" width="150" height="70" rx="8" fill="#ddd6fe" stroke="#8b5cf6" strokeWidth="2" />
    <text x="155" y="185" fontSize="13" fontWeight="bold" fill="#6d28d9" textAnchor="middle">Leaf</text>
    <line x1="90" y1="195" x2="220" y2="195" stroke="#8b5cf6" strokeWidth="1" />
    <text x="155" y="215" fontSize="10" fill="#6d28d9" textAnchor="middle">+ operation()</text>
    <rect x="420" y="160" width="150" height="90" rx="8" fill="url(#compositeGrad)" stroke="#7c3aed" strokeWidth="2" />
    <text x="495" y="185" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">Composite</text>
    <line x1="430" y1="195" x2="560" y2="195" stroke="white" strokeWidth="1" />
    <text x="495" y="215" fontSize="10" fill="white" textAnchor="middle">- children: Component[]</text>
    <text x="495" y="230" fontSize="10" fill="white" textAnchor="middle">+ add(Component)</text>
    <text x="495" y="245" fontSize="10" fill="white" textAnchor="middle">+ operation()</text>
    <line x1="155" y1="160" x2="275" y2="110" stroke="#8b5cf6" strokeWidth="2" />
    <line x1="495" y1="160" x2="375" y2="110" stroke="#8b5cf6" strokeWidth="2" />
    <path d="M 495 250 Q 495 300 325 300 Q 155 300 155 230" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5" fill="none" />
    <text x="325" y="320" fontSize="11" fill="#6d28d9" textAnchor="middle">contains</text>
    <rect x="175" y="340" width="300" height="30" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="325" y="360" fontSize="11" fill="#92400e" textAnchor="middle">Compose objects into tree structures (part-whole hierarchies)</text>
  </svg>
)

const TemplateMethodDiagram = () => (
  <svg viewBox="0 0 600 350" style={{ width: '100%', maxWidth: '600px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="templateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#fb923c', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <text x="300" y="25" fontSize="18" fontWeight="bold" fill="#f97316" textAnchor="middle">Template Method Pattern</text>
    <rect x="175" y="50" width="250" height="100" rx="8" fill="#ffedd5" stroke="#f97316" strokeWidth="2" />
    <text x="300" y="75" fontSize="14" fontWeight="bold" fill="#c2410c" textAnchor="middle">AbstractClass</text>
    <line x1="185" y1="85" x2="415" y2="85" stroke="#f97316" strokeWidth="1" />
    <text x="300" y="105" fontSize="11" fill="#c2410c" textAnchor="middle">+ templateMethod() // final</text>
    <text x="300" y="120" fontSize="11" fill="#9a3412" textAnchor="middle" fontStyle="italic">- step1() // abstract</text>
    <text x="300" y="135" fontSize="11" fill="#9a3412" textAnchor="middle" fontStyle="italic">- step2() // abstract</text>
    <rect x="80" y="200" width="180" height="80" rx="8" fill="url(#templateGrad)" stroke="#ea580c" strokeWidth="2" />
    <text x="170" y="225" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">ConcreteClassA</text>
    <line x1="90" y1="235" x2="250" y2="235" stroke="white" strokeWidth="1" />
    <text x="170" y="255" fontSize="10" fill="white" textAnchor="middle">+ step1() // impl</text>
    <text x="170" y="270" fontSize="10" fill="white" textAnchor="middle">+ step2() // impl</text>
    <rect x="340" y="200" width="180" height="80" rx="8" fill="url(#templateGrad)" stroke="#ea580c" strokeWidth="2" />
    <text x="430" y="225" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">ConcreteClassB</text>
    <line x1="350" y1="235" x2="510" y2="235" stroke="white" strokeWidth="1" />
    <text x="430" y="255" fontSize="10" fill="white" textAnchor="middle">+ step1() // impl</text>
    <text x="430" y="270" fontSize="10" fill="white" textAnchor="middle">+ step2() // impl</text>
    <line x1="170" y1="200" x2="250" y2="150" stroke="#f97316" strokeWidth="2" />
    <line x1="430" y1="200" x2="350" y2="150" stroke="#f97316" strokeWidth="2" />
    <rect x="125" y="310" width="350" height="30" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
    <text x="300" y="330" fontSize="11" fill="#047857" textAnchor="middle">Define algorithm skeleton, let subclasses override specific steps</text>
  </svg>
)

const IteratorDiagram = () => (
  <svg viewBox="0 0 650 320" style={{ width: '100%', maxWidth: '650px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="iteratorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <text x="325" y="25" fontSize="18" fontWeight="bold" fill="#06b6d4" textAnchor="middle">Iterator Pattern</text>
    <rect x="40" y="60" width="180" height="80" rx="8" fill="#cffafe" stroke="#06b6d4" strokeWidth="2" />
    <text x="130" y="85" fontSize="14" fontWeight="bold" fill="#0e7490" textAnchor="middle">Aggregate</text>
    <line x1="50" y1="95" x2="210" y2="95" stroke="#06b6d4" strokeWidth="1" />
    <text x="130" y="115" fontSize="11" fill="#0e7490" textAnchor="middle">+ createIterator()</text>
    <text x="130" y="130" fontSize="11" fill="#0e7490" textAnchor="middle">+ getItems()</text>
    <rect x="430" y="60" width="180" height="80" rx="8" fill="#cffafe" stroke="#06b6d4" strokeWidth="2" />
    <text x="520" y="85" fontSize="14" fontWeight="bold" fill="#0e7490" textAnchor="middle">Iterator</text>
    <line x1="440" y1="95" x2="600" y2="95" stroke="#06b6d4" strokeWidth="1" />
    <text x="520" y="115" fontSize="11" fill="#0e7490" textAnchor="middle">+ hasNext(): boolean</text>
    <text x="520" y="130" fontSize="11" fill="#0e7490" textAnchor="middle">+ next(): Element</text>
    <rect x="40" y="190" width="180" height="60" rx="8" fill="url(#iteratorGrad)" stroke="#0891b2" strokeWidth="2" />
    <text x="130" y="215" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">ConcreteAggregate</text>
    <text x="130" y="235" fontSize="10" fill="white" textAnchor="middle">- items[]</text>
    <rect x="430" y="190" width="180" height="60" rx="8" fill="url(#iteratorGrad)" stroke="#0891b2" strokeWidth="2" />
    <text x="520" y="215" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">ConcreteIterator</text>
    <text x="520" y="235" fontSize="10" fill="white" textAnchor="middle">- currentIndex</text>
    <line x1="130" y1="190" x2="130" y2="140" stroke="#06b6d4" strokeWidth="2" />
    <line x1="520" y1="190" x2="520" y2="140" stroke="#06b6d4" strokeWidth="2" />
    <path d="M 220 220 L 430 220" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5,5" />
    <text x="325" y="210" fontSize="11" fill="#0e7490" textAnchor="middle">creates</text>
    <rect x="175" y="280" width="300" height="30" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="325" y="300" fontSize="11" fill="#92400e" textAnchor="middle">Access elements sequentially without exposing representation</text>
  </svg>
)

const ChainOfResponsibilityDiagram = () => (
  <svg viewBox="0 0 700 280" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="chainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#4ade80', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#22c55e', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowChain" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#22c55e" />
      </marker>
    </defs>
    <text x="350" y="25" fontSize="18" fontWeight="bold" fill="#22c55e" textAnchor="middle">Chain of Responsibility Pattern</text>
    <rect x="250" y="50" width="200" height="70" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
    <text x="350" y="75" fontSize="14" fontWeight="bold" fill="#166534" textAnchor="middle">Handler</text>
    <line x1="260" y1="85" x2="440" y2="85" stroke="#22c55e" strokeWidth="1" />
    <text x="350" y="105" fontSize="11" fill="#166534" textAnchor="middle">+ setNext(Handler)</text>
    <text x="350" y="118" fontSize="11" fill="#166534" textAnchor="middle">+ handle(Request)</text>
    <rect x="50" y="170" width="140" height="60" rx="8" fill="url(#chainGrad)" stroke="#16a34a" strokeWidth="2" />
    <text x="120" y="195" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">HandlerA</text>
    <text x="120" y="215" fontSize="10" fill="white" textAnchor="middle">handles type A</text>
    <rect x="250" y="170" width="140" height="60" rx="8" fill="url(#chainGrad)" stroke="#16a34a" strokeWidth="2" />
    <text x="320" y="195" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">HandlerB</text>
    <text x="320" y="215" fontSize="10" fill="white" textAnchor="middle">handles type B</text>
    <rect x="450" y="170" width="140" height="60" rx="8" fill="url(#chainGrad)" stroke="#16a34a" strokeWidth="2" />
    <text x="520" y="195" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">HandlerC</text>
    <text x="520" y="215" fontSize="10" fill="white" textAnchor="middle">handles type C</text>
    <line x1="120" y1="170" x2="300" y2="120" stroke="#22c55e" strokeWidth="2" />
    <line x1="320" y1="170" x2="350" y2="120" stroke="#22c55e" strokeWidth="2" />
    <line x1="520" y1="170" x2="400" y2="120" stroke="#22c55e" strokeWidth="2" />
    <line x1="190" y1="200" x2="250" y2="200" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowChain)" />
    <line x1="390" y1="200" x2="450" y2="200" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowChain)" />
    <rect x="175" y="250" width="350" height="25" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="350" y="267" fontSize="11" fill="#92400e" textAnchor="middle">Pass request along chain until a handler processes it</text>
  </svg>
)

const MementoDiagram = () => (
  <svg viewBox="0 0 650 320" style={{ width: '100%', maxWidth: '650px', height: 'auto', margin: '1rem auto', display: 'block' }}>
    <defs>
      <linearGradient id="mementoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f87171', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <text x="325" y="25" fontSize="18" fontWeight="bold" fill="#ef4444" textAnchor="middle">Memento Pattern</text>
    <rect x="40" y="70" width="160" height="100" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
    <text x="120" y="95" fontSize="14" fontWeight="bold" fill="#b91c1c" textAnchor="middle">Originator</text>
    <line x1="50" y1="105" x2="190" y2="105" stroke="#ef4444" strokeWidth="1" />
    <text x="120" y="125" fontSize="10" fill="#b91c1c" textAnchor="middle">- state</text>
    <text x="120" y="140" fontSize="10" fill="#b91c1c" textAnchor="middle">+ save(): Memento</text>
    <text x="120" y="155" fontSize="10" fill="#b91c1c" textAnchor="middle">+ restore(Memento)</text>
    <rect x="250" y="70" width="150" height="80" rx="8" fill="url(#mementoGrad)" stroke="#dc2626" strokeWidth="2" />
    <text x="325" y="95" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Memento</text>
    <line x1="260" y1="105" x2="390" y2="105" stroke="white" strokeWidth="1" />
    <text x="325" y="125" fontSize="10" fill="white" textAnchor="middle">- state (snapshot)</text>
    <text x="325" y="140" fontSize="10" fill="white" textAnchor="middle">+ getState()</text>
    <rect x="450" y="70" width="160" height="80" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
    <text x="530" y="95" fontSize="14" fontWeight="bold" fill="#b91c1c" textAnchor="middle">Caretaker</text>
    <line x1="460" y1="105" x2="600" y2="105" stroke="#ef4444" strokeWidth="1" />
    <text x="530" y="125" fontSize="10" fill="#b91c1c" textAnchor="middle">- history: Memento[]</text>
    <text x="530" y="140" fontSize="10" fill="#b91c1c" textAnchor="middle">+ undo()</text>
    <path d="M 200 110 L 250 110" stroke="#ef4444" strokeWidth="2" />
    <text x="225" y="100" fontSize="10" fill="#b91c1c">creates</text>
    <path d="M 400 110 L 450 110" stroke="#ef4444" strokeWidth="2" />
    <text x="425" y="100" fontSize="10" fill="#b91c1c">stores</text>
    <rect x="150" y="200" width="350" height="80" rx="8" fill="#f3f4f6" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4,4" />
    <text x="325" y="225" fontSize="12" fontWeight="600" fill="#374151" textAnchor="middle">Workflow</text>
    <text x="175" y="245" fontSize="11" fill="#6b7280">1. Originator.save() → Memento</text>
    <text x="175" y="262" fontSize="11" fill="#6b7280">2. Caretaker stores Memento in history</text>
    <text x="175" y="279" fontSize="11" fill="#6b7280">3. Caretaker.undo() → Originator.restore(memento)</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

// =============================================================================
// REAL-WORLD USAGE EXAMPLES (rendered as an extra tab per pattern)
// =============================================================================
const REAL_WORLD_USAGE = {
  singleton: {
    name: 'Real-World Usage',
    explanation: 'Where you actually meet Singletons: Spring beans default to singleton scope (one instance per container); java.lang.Runtime and the SLF4J/Log4j LogManager are JVM-wide singletons; connection pools like HikariCP expose a single shared pool; configuration/property managers and metric registries (Micrometer) are typically singletons. The goal is one shared, expensive-to-create resource coordinated across the whole app.',
    codeExample: `// A single shared connection pool for the whole service
public final class ConnectionPool {
  private static final ConnectionPool INSTANCE = new ConnectionPool();
  private final HikariDataSource dataSource;

  private ConnectionPool() {
    HikariConfig cfg = new HikariConfig();
    cfg.setJdbcUrl(System.getenv("DB_URL"));
    cfg.setMaximumPoolSize(20);
    this.dataSource = new HikariDataSource(cfg);
  }

  public static ConnectionPool getInstance() { return INSTANCE; }
  public Connection getConnection() throws SQLException {
    return dataSource.getConnection();
  }
}

// In Spring this is automatic - every @Service/@Component is a singleton bean
@Service
public class PricingService { /* one instance shared by all callers */ }`
  },
  'factory-method': {
    name: 'Real-World Usage',
    explanation: 'Factory Method shows up wherever creation is decoupled from use: JDBC DriverManager.getConnection() returns the right Connection for the URL; LoggerFactory.getLogger() hands back a logger implementation; Calendar.getInstance() returns a locale-specific calendar; payment gateways and notification systems pick a concrete sender at runtime based on type/config.',
    codeExample: `// Pick a payment processor by type, without the caller knowing the class
public abstract class PaymentFactory {
  public abstract PaymentProcessor create();   // the factory method

  public static PaymentFactory forType(String type) {
    return switch (type) {
      case "card"   -> new CardPaymentFactory();
      case "paypal" -> new PayPalFactory();
      case "crypto" -> new CryptoFactory();
      default -> throw new IllegalArgumentException(type);
    };
  }
}

PaymentProcessor processor = PaymentFactory.forType(order.method()).create();
processor.charge(order.amount());   // works for any provider`
  },
  builder: {
    name: 'Real-World Usage',
    explanation: 'Builders are everywhere in modern Java: StringBuilder, Stream.builder(), the Java 11+ HttpClient/HttpRequest builders, OkHttp Request.Builder, Lombok @Builder, and the AWS/GCP SDK request builders. They shine when an object has many optional fields and you want readable, immutable construction without telescoping constructors.',
    codeExample: `// Building an HTTP request fluently (java.net.http)
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/orders"))
    .header("Authorization", "Bearer " + token)
    .header("Content-Type", "application/json")
    .timeout(Duration.ofSeconds(10))
    .POST(HttpRequest.BodyPublishers.ofString(json))
    .build();

// Lombok generates the same style for your domain objects
Order order = Order.builder()
    .customerId(42L)
    .item("SKU-1", 3)
    .expedited(true)
    .build();`
  },
  observer: {
    name: 'Real-World Usage',
    explanation: 'Observer underpins all event-driven code: Spring ApplicationEvents with @EventListener, GUI listeners in Swing/Android, reactive streams (Project Reactor, RxJava), Kafka/RabbitMQ consumers reacting to messages, and WebSocket subscriptions. One state change fans out to many independent reactions without the publisher knowing the subscribers.',
    codeExample: `// Spring publishes a domain event; many listeners react independently
@Service
public class OrderService {
  private final ApplicationEventPublisher publisher;
  public OrderService(ApplicationEventPublisher publisher) { this.publisher = publisher; }

  public void place(Order order) {
    save(order);
    publisher.publishEvent(new OrderPlacedEvent(order));  // notify observers
  }
}

@Component
class EmailListener {
  @EventListener void on(OrderPlacedEvent e) { sendConfirmation(e.order()); }
}
@Component
class InventoryListener {
  @EventListener void on(OrderPlacedEvent e) { reserveStock(e.order()); }
}`
  },
  strategy: {
    name: 'Real-World Usage',
    explanation: 'Strategy lets you swap algorithms at runtime: Collections.sort with different Comparators, pluggable shipping/discount/pricing engines, authentication strategies in Spring Security, compression or serialization format selection, and order-routing logic in trading systems. The behavior is chosen by configuration or context instead of hard-coded branches.',
    codeExample: `// Choose a shipping-cost algorithm at runtime
interface ShippingStrategy { BigDecimal cost(Cart cart); }

class StandardShipping implements ShippingStrategy {
  public BigDecimal cost(Cart c) { return BigDecimal.valueOf(5); }
}
class ExpressShipping implements ShippingStrategy {
  public BigDecimal cost(Cart c) { return BigDecimal.valueOf(15); }
}
class FreeOverThreshold implements ShippingStrategy {
  public BigDecimal cost(Cart c) {
    return c.total().compareTo(BigDecimal.valueOf(50)) >= 0
        ? BigDecimal.ZERO : BigDecimal.valueOf(5);
  }
}

ShippingStrategy strategy = strategies.get(customer.tier());
BigDecimal fee = strategy.cost(cart);`
  },
  decorator: {
    name: 'Real-World Usage',
    explanation: 'The classic example is java.io: a BufferedInputStream wraps a FileInputStream which can be wrapped again for decompression - each layer adds behavior. Other real uses: Collections.unmodifiableList / synchronizedList, Spring HttpServletRequestWrapper for request filtering, servlet response compression/caching wrappers, and UI component decoration.',
    codeExample: `// Stack behavior by wrapping streams (java.io decorators)
InputStream in =
    new GZIPInputStream(                 // + decompression
        new BufferedInputStream(         // + buffering
            new FileInputStream("data.gz")));   // base source

// Collections decorators add behavior without subclassing
List<String> readOnly = Collections.unmodifiableList(names);
List<String> threadSafe = Collections.synchronizedList(new ArrayList<>());`
  },
  adapter: {
    name: 'Real-World Usage',
    explanation: 'Adapters bridge incompatible interfaces: InputStreamReader adapts a byte stream to a character stream, Arrays.asList adapts an array to a List, SLF4J adapts to Log4j/JUL behind one API, and Spring MVC HandlerAdapter lets the dispatcher invoke many controller styles. In practice you wrap legacy or third-party SDKs to fit your own interfaces.',
    codeExample: `// Adapt a third-party gateway to our own PaymentProcessor interface
interface PaymentProcessor { void charge(Money amount, String token); }

// Legacy/3rd-party class we cannot change
class StripeClient { void createCharge(long cents, String src) { /* ... */ } }

class StripeAdapter implements PaymentProcessor {
  private final StripeClient stripe = new StripeClient();
  public void charge(Money amount, String token) {
    stripe.createCharge(amount.toCents(), token);   // translate the call
  }
}

// The rest of the app depends only on PaymentProcessor
PaymentProcessor processor = new StripeAdapter();`
  },
  facade: {
    name: 'Real-World Usage',
    explanation: 'Facades give a simple front to a complex subsystem: Spring JdbcTemplate hides JDBC connection/statement/result-set handling, SLF4J fronts logging backends, and service-layer classes orchestrate inventory, payment, and shipping behind one method. Clients call one clean API instead of wiring many low-level components.',
    codeExample: `// One checkout() call hides a multi-step subsystem
@Service
public class CheckoutFacade {
  private final InventoryService inventory;
  private final PaymentService payment;
  private final ShippingService shipping;
  private final NotificationService notifications;

  public OrderResult checkout(Cart cart, Customer customer) {
    inventory.reserve(cart);
    Payment p = payment.charge(customer, cart.total());
    Shipment s = shipping.schedule(cart, customer.address());
    notifications.sendConfirmation(customer, p, s);
    return new OrderResult(p.id(), s.tracking());
  }
}`
  },
  command: {
    name: 'Real-World Usage',
    explanation: 'Command objectifies an action so it can be queued, logged, or undone: Runnable/Callable tasks submitted to an ExecutorService, GUI menu actions with undo/redo in editors, job queues and Spring Batch steps, transactional outbox entries, and macro recording. The invoker triggers commands without knowing their concrete logic.',
    codeExample: `// Editor actions as commands enable undo/redo
interface Command { void execute(); void undo(); }

class InsertText implements Command {
  private final Document doc; private final String text; private final int pos;
  InsertText(Document doc, String text, int pos) { this.doc = doc; this.text = text; this.pos = pos; }
  public void execute() { doc.insert(pos, text); }
  public void undo()    { doc.delete(pos, text.length()); }
}

Deque<Command> history = new ArrayDeque<>();
void run(Command c) { c.execute(); history.push(c); }
void undo()         { if (!history.isEmpty()) history.pop().undo(); }`
  },
  proxy: {
    name: 'Real-World Usage',
    explanation: 'Proxies are core to frameworks: Spring AOP creates proxies so @Transactional/@Async/@Cacheable work, Hibernate returns lazy-loading proxies for entity associations, java.lang.reflect.Proxy and CGLIB power dynamic proxies, and Mockito mocks are proxies. Real systems also use API gateways and caching/protection proxies in front of expensive resources.',
    codeExample: `// A virtual proxy delays loading an expensive resource until needed
interface Image { void render(); }

class RealImage implements Image {
  private final byte[] data;
  RealImage(String path) { this.data = loadFromDisk(path); }  // expensive
  public void render() { /* draw data */ }
}

class LazyImage implements Image {       // the proxy
  private final String path;
  private RealImage delegate;
  LazyImage(String path) { this.path = path; }
  public void render() {
    if (delegate == null) delegate = new RealImage(path);  // load on first use
    delegate.render();
  }
}
// Spring/Hibernate generate this kind of proxy for you automatically`
  },
  state: {
    name: 'Real-World Usage',
    explanation: 'State machines model real lifecycles: an order moving through CREATED -> PAID -> SHIPPED -> DELIVERED, a TCP connection, a vending machine, document/approval workflows, and game character states. Each state encapsulates the allowed transitions, replacing tangled if/switch chains. Spring Statemachine formalizes this.',
    codeExample: `// Order lifecycle as states - each defines its own valid transitions
interface OrderState { OrderState pay(Order o); OrderState ship(Order o); }

class Created implements OrderState {
  public OrderState pay(Order o)  { o.capturePayment(); return new Paid(); }
  public OrderState ship(Order o) { throw new IllegalStateException("pay first"); }
}
class Paid implements OrderState {
  public OrderState pay(Order o)  { throw new IllegalStateException("already paid"); }
  public OrderState ship(Order o) { o.dispatch(); return new Shipped(); }
}
class Shipped implements OrderState {
  public OrderState pay(Order o)  { throw new IllegalStateException(); }
  public OrderState ship(Order o) { throw new IllegalStateException(); }
}`
  },
  'abstract-factory': {
    name: 'Real-World Usage',
    explanation: 'Abstract Factory creates whole families of related objects: GUI toolkits producing a matching look-and-feel set (buttons, checkboxes) per OS/theme, JDBC driver families, DocumentBuilderFactory/TransformerFactory in JAXP, and cloud-provider SDKs that build a consistent family of clients (storage, queue, compute) per provider.',
    codeExample: `// A family of UI widgets that must match per platform/theme
interface UiFactory { Button button(); Checkbox checkbox(); }

class DarkThemeFactory implements UiFactory {
  public Button button()     { return new DarkButton(); }
  public Checkbox checkbox() { return new DarkCheckbox(); }
}
class LightThemeFactory implements UiFactory {
  public Button button()     { return new LightButton(); }
  public Checkbox checkbox() { return new LightCheckbox(); }
}

UiFactory factory = userPrefersDark ? new DarkThemeFactory() : new LightThemeFactory();
Button b = factory.button();      // guaranteed to match the chosen theme
Checkbox c = factory.checkbox();`
  },
  prototype: {
    name: 'Real-World Usage',
    explanation: 'Prototype clones a preconfigured object instead of rebuilding it: copying expensive-to-construct configuration objects, spawning game entities from a template, duplicating document/email templates, Spring prototype-scoped beans, and deep-copying complex object graphs. Cloning is often far cheaper than constructing from scratch.',
    codeExample: `// Clone a fully configured template instead of rebuilding it each time
public class EmailTemplate implements Cloneable {
  private String subject;
  private String body;
  private List<String> headers = new ArrayList<>();

  @Override
  public EmailTemplate clone() {
    try {
      EmailTemplate copy = (EmailTemplate) super.clone();
      copy.headers = new ArrayList<>(this.headers);  // deep copy mutable state
      return copy;
    } catch (CloneNotSupportedException e) { throw new AssertionError(e); }
  }
}

EmailTemplate welcome = baseTemplate.clone();   // reuse base config
welcome.setSubject("Welcome!");`
  },
  composite: {
    name: 'Real-World Usage',
    explanation: 'Composite models part-whole trees uniformly: file systems (files and directories), GUI component hierarchies and the HTML DOM, organization charts, nested menus, and graphics scene graphs. Client code treats a single leaf and a whole subtree the same way through one interface.',
    codeExample: `// File system: files (leaves) and folders (composites) share one interface
interface Node { long size(); }

class FileNode implements Node {
  private final long bytes;
  FileNode(long bytes) { this.bytes = bytes; }
  public long size() { return bytes; }
}

class FolderNode implements Node {
  private final List<Node> children = new ArrayList<>();
  void add(Node n) { children.add(n); }
  public long size() {                       // recurse over the tree
    return children.stream().mapToLong(Node::size).sum();
  }
}

// A folder and a file are used identically
long total = rootFolder.size();`
  },
  'template-method': {
    name: 'Real-World Usage',
    explanation: 'Template Method fixes an algorithm skeleton and lets subclasses fill steps: Spring JdbcTemplate/RestTemplate, the servlet HttpServlet.service() dispatching to doGet/doPost, JUnit setUp/test/tearDown, java.util.AbstractList, and ETL/import pipelines with a fixed read-transform-write flow but pluggable stages.',
    codeExample: `// Fixed import pipeline; subclasses define the varying steps
public abstract class DataImporter {
  // the template method - the algorithm skeleton (final = not overridable)
  public final void run(Path file) {
    var raw = read(file);
    var clean = validate(raw);
    save(clean);
    afterImport();        // hook with a default
  }
  protected abstract List<Row> read(Path file);
  protected abstract List<Row> validate(List<Row> rows);
  protected abstract void save(List<Row> rows);
  protected void afterImport() { /* optional hook */ }
}

class CsvImporter extends DataImporter {
  protected List<Row> read(Path f)        { /* parse CSV */ return ...; }
  protected List<Row> validate(List<Row> r){ /* rules */    return ...; }
  protected void save(List<Row> r)        { repository.saveAll(r); }
}`
  },
  iterator: {
    name: 'Real-World Usage',
    explanation: 'Iterator is built into the language: every Collection exposes iterator() and the for-each loop, Scanner iterates tokens, Spring Data Pageable iterates pages, and database/JDBC cursors stream large result sets. It lets you traverse a collection without exposing its internal structure.',
    codeExample: `// A custom iterator hides how the data is stored
public class Playlist implements Iterable<Song> {
  private final Song[] songs;
  public Playlist(Song[] songs) { this.songs = songs; }

  public Iterator<Song> iterator() {
    return new Iterator<>() {
      private int index = 0;
      public boolean hasNext() { return index < songs.length; }
      public Song next()       { return songs[index++]; }
    };
  }
}

// Client traverses without knowing it's backed by an array
for (Song s : playlist) play(s);`
  },
  'chain-of-responsibility': {
    name: 'Real-World Usage',
    explanation: 'Chain of Responsibility powers pipelines: Servlet Filters and the Spring Security filter chain, logging handler chains (java.util.logging), exception/HTTP interceptors, middleware stacks, and multi-level approval workflows. Each handler either processes the request or passes it along until one handles it.',
    codeExample: `// Expense approval escalates up a chain until someone can approve
abstract class Approver {
  protected Approver next;
  Approver linkWith(Approver next) { this.next = next; return next; }
  void handle(Expense e) {
    if (canApprove(e)) approve(e);
    else if (next != null) next.handle(e);     // pass it on
    else throw new IllegalStateException("no approver for " + e.amount());
  }
  abstract boolean canApprove(Expense e);
  abstract void approve(Expense e);
}

class Manager extends Approver {
  boolean canApprove(Expense e) { return e.amount() <= 1000; }
  void approve(Expense e) { /* ... */ }
}
class Director extends Approver {
  boolean canApprove(Expense e) { return e.amount() <= 10000; }
  void approve(Expense e) { /* ... */ }
}

Approver chain = new Manager();
chain.linkWith(new Director());`
  },
  memento: {
    name: 'Real-World Usage',
    explanation: 'Memento captures and restores state: undo/redo in editors and IDEs, game save points, database transaction savepoints/rollback, form-state restoration, and version snapshots. The originator produces an opaque memento that a caretaker stores and later uses to roll back, without exposing internals.',
    codeExample: `// Editor snapshots enable undo
class Editor {
  private String content = "";
  void type(String text) { content += text; }
  String content() { return content; }

  Memento save()              { return new Memento(content); }   // capture
  void restore(Memento m)     { this.content = m.state(); }      // roll back

  record Memento(String state) {}   // opaque to the caretaker
}

Editor editor = new Editor();
Deque<Editor.Memento> history = new ArrayDeque<>();

editor.type("Hello");
history.push(editor.save());   // checkpoint
editor.type(" World");
editor.restore(history.pop()); // undo -> "Hello"`
  }
};

// =============================================================================
// COMPLETE END-TO-END EXAMPLES (rendered as an extra tab per pattern)
// =============================================================================
const COMPLETE_EXAMPLE = {
  singleton: {
    name: 'Complete Example',
    explanation: 'A complete, runnable program: a thread-safe configuration registry implemented as an enum Singleton, with a main method proving every caller shares the same instance.',
    codeExample: `import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

// Enum singleton - thread-safe, serialization-safe, reflection-safe
enum AppConfig {
  INSTANCE;

  private final Map<String, String> settings = new ConcurrentHashMap<>();

  public void set(String key, String value) { settings.put(key, value); }
  public String get(String key)             { return settings.get(key); }
}

public class Demo {
  public static void main(String[] args) {
    AppConfig.INSTANCE.set("region", "us-east-1");

    // A different part of the app reads the same instance
    String region = AppConfig.INSTANCE.get("region");
    System.out.println("region = " + region);                 // us-east-1

    boolean same = AppConfig.INSTANCE == AppConfig.INSTANCE;
    System.out.println("same instance = " + same);            // true
  }
}`
  },
  'factory-method': {
    name: 'Complete Example',
    explanation: 'A complete program where a creator decides which Shape to instantiate, so the client never references concrete classes.',
    codeExample: `interface Shape { void draw(); }

class Circle implements Shape { public void draw() { System.out.println("Circle"); } }
class Square implements Shape { public void draw() { System.out.println("Square"); } }

abstract class ShapeFactory {
  abstract Shape create();                 // the factory method

  static ShapeFactory of(String kind) {
    return switch (kind) {
      case "circle" -> new CircleFactory();
      case "square" -> new SquareFactory();
      default -> throw new IllegalArgumentException(kind);
    };
  }
}
class CircleFactory extends ShapeFactory { Shape create() { return new Circle(); } }
class SquareFactory extends ShapeFactory { Shape create() { return new Square(); } }

public class Demo {
  public static void main(String[] args) {
    for (String kind : new String[]{"circle", "square"}) {
      Shape s = ShapeFactory.of(kind).create();
      s.draw();                            // Circle, then Square
    }
  }
}`
  },
  builder: {
    name: 'Complete Example',
    explanation: 'A complete program building an immutable User with required and optional fields through a fluent builder.',
    codeExample: `class User {
  private final String name;     // required
  private final int age;         // optional
  private final String email;    // optional

  private User(Builder b) { this.name = b.name; this.age = b.age; this.email = b.email; }

  public String toString() { return name + ", age=" + age + ", email=" + email; }

  static Builder builder(String name) { return new Builder(name); }

  static class Builder {
    private final String name;
    private int age;
    private String email;
    Builder(String name) { this.name = name; }
    Builder age(int age)        { this.age = age; return this; }
    Builder email(String email) { this.email = email; return this; }
    User build()                { return new User(this); }
  }
}

public class Demo {
  public static void main(String[] args) {
    User u = User.builder("Ada").age(36).email("ada@x.io").build();
    System.out.println(u);                 // Ada, age=36, email=ada@x.io
  }
}`
  },
  observer: {
    name: 'Complete Example',
    explanation: 'A complete weather-station program: the subject pushes updates to every registered observer.',
    codeExample: `import java.util.ArrayList;
import java.util.List;

interface Observer { void update(float temp); }

class WeatherStation {
  private final List<Observer> observers = new ArrayList<>();
  private float temp;
  void subscribe(Observer o)   { observers.add(o); }
  void setTemp(float t) {
    this.temp = t;
    observers.forEach(o -> o.update(temp));   // notify all
  }
}

class PhoneDisplay implements Observer {
  public void update(float t) { System.out.println("Phone: " + t + "C"); }
}
class WebDisplay implements Observer {
  public void update(float t) { System.out.println("Web: " + t + "C"); }
}

public class Demo {
  public static void main(String[] args) {
    WeatherStation station = new WeatherStation();
    station.subscribe(new PhoneDisplay());
    station.subscribe(new WebDisplay());
    station.setTemp(21.5f);                 // both displays update
  }
}`
  },
  strategy: {
    name: 'Complete Example',
    explanation: 'A complete program where the payment algorithm is selected at runtime and swapped without changing the context.',
    codeExample: `interface PaymentStrategy { void pay(int amount); }

class CardPayment implements PaymentStrategy {
  private final String number;
  CardPayment(String number) { this.number = number; }
  public void pay(int amount) { System.out.println("Paid " + amount + " with card " + number); }
}
class PayPalPayment implements PaymentStrategy {
  private final String email;
  PayPalPayment(String email) { this.email = email; }
  public void pay(int amount) { System.out.println("Paid " + amount + " via PayPal " + email); }
}

class Checkout {
  private PaymentStrategy strategy;
  void setStrategy(PaymentStrategy s) { this.strategy = s; }
  void pay(int amount) { strategy.pay(amount); }
}

public class Demo {
  public static void main(String[] args) {
    Checkout checkout = new Checkout();
    checkout.setStrategy(new CardPayment("4242"));
    checkout.pay(100);
    checkout.setStrategy(new PayPalPayment("a@b.io"));  // swap at runtime
    checkout.pay(250);
  }
}`
  },
  decorator: {
    name: 'Complete Example',
    explanation: 'A complete coffee-shop program: decorators wrap a base beverage to add cost and description dynamically.',
    codeExample: `interface Coffee { String desc(); double cost(); }

class Espresso implements Coffee {
  public String desc() { return "Espresso"; }
  public double cost() { return 2.0; }
}

abstract class CoffeeDecorator implements Coffee {
  protected final Coffee inner;
  CoffeeDecorator(Coffee inner) { this.inner = inner; }
}
class Milk extends CoffeeDecorator {
  Milk(Coffee c) { super(c); }
  public String desc() { return inner.desc() + " + Milk"; }
  public double cost() { return inner.cost() + 0.5; }
}
class Sugar extends CoffeeDecorator {
  Sugar(Coffee c) { super(c); }
  public String desc() { return inner.desc() + " + Sugar"; }
  public double cost() { return inner.cost() + 0.2; }
}

public class Demo {
  public static void main(String[] args) {
    Coffee order = new Sugar(new Milk(new Espresso()));
    System.out.println(order.desc() + " = $" + order.cost());
    // Espresso + Milk + Sugar = $2.7
  }
}`
  },
  adapter: {
    name: 'Complete Example',
    explanation: 'A complete program where an adapter makes an incompatible legacy class satisfy the interface the client expects.',
    codeExample: `// Target interface the client wants
interface MediaPlayer { void play(String file); }

// Incompatible existing class we cannot modify
class LegacyAudioEngine {
  void start(String path) { System.out.println("Playing " + path); }
}

// Adapter translates play() -> start()
class AudioAdapter implements MediaPlayer {
  private final LegacyAudioEngine engine = new LegacyAudioEngine();
  public void play(String file) { engine.start(file); }
}

public class Demo {
  public static void main(String[] args) {
    MediaPlayer player = new AudioAdapter();
    player.play("song.mp3");               // Playing song.mp3
  }
}`
  },
  facade: {
    name: 'Complete Example',
    explanation: 'A complete home-theater program: one facade method coordinates several subsystems behind a simple API.',
    codeExample: `class Amplifier { void on()  { System.out.println("Amp on"); } }
class Projector { void on()  { System.out.println("Projector on"); } }
class Lights    { void dim() { System.out.println("Lights dimmed"); } }
class Player    { void play(String movie) { System.out.println("Playing " + movie); } }

class HomeTheaterFacade {
  private final Amplifier amp = new Amplifier();
  private final Projector projector = new Projector();
  private final Lights lights = new Lights();
  private final Player player = new Player();

  void watch(String movie) {            // hides the whole sequence
    lights.dim();
    amp.on();
    projector.on();
    player.play(movie);
  }
}

public class Demo {
  public static void main(String[] args) {
    new HomeTheaterFacade().watch("Inception");
  }
}`
  },
  command: {
    name: 'Complete Example',
    explanation: 'A complete remote-control program: commands encapsulate actions on a receiver, invoked uniformly.',
    codeExample: `interface Command { void execute(); }

class Light {
  void on()  { System.out.println("Light ON"); }
  void off() { System.out.println("Light OFF"); }
}

class LightOnCommand  implements Command {
  private final Light light;
  LightOnCommand(Light l) { this.light = l; }
  public void execute() { light.on(); }
}
class LightOffCommand implements Command {
  private final Light light;
  LightOffCommand(Light l) { this.light = l; }
  public void execute() { light.off(); }
}

class Remote {
  private Command command;
  void setCommand(Command c) { this.command = c; }
  void press()               { command.execute(); }
}

public class Demo {
  public static void main(String[] args) {
    Light light = new Light();
    Remote remote = new Remote();
    remote.setCommand(new LightOnCommand(light));
    remote.press();                        // Light ON
    remote.setCommand(new LightOffCommand(light));
    remote.press();                        // Light OFF
  }
}`
  },
  proxy: {
    name: 'Complete Example',
    explanation: 'A complete protection-proxy program: the proxy enforces access control before delegating to the real object.',
    codeExample: `interface Document { void display(String user); }

class SecureDocument implements Document {
  public void display(String user) { System.out.println(user + " viewing secret report"); }
}

class DocumentProxy implements Document {
  private final SecureDocument real = new SecureDocument();
  private final java.util.Set<String> allowed = java.util.Set.of("admin");

  public void display(String user) {
    if (!allowed.contains(user)) {
      System.out.println("Access denied for " + user);
      return;
    }
    real.display(user);                    // delegate only if permitted
  }
}

public class Demo {
  public static void main(String[] args) {
    Document doc = new DocumentProxy();
    doc.display("guest");                   // Access denied for guest
    doc.display("admin");                   // admin viewing secret report
  }
}`
  },
  state: {
    name: 'Complete Example',
    explanation: 'A complete turnstile program: each state object handles events and returns the next state.',
    codeExample: `interface State { State coin(); State push(); }

class Locked implements State {
  public State coin() { System.out.println("Unlocked"); return new Unlocked(); }
  public State push() { System.out.println("Still locked"); return this; }
}
class Unlocked implements State {
  public State coin() { System.out.println("Already unlocked"); return this; }
  public State push() { System.out.println("Walk through; locking"); return new Locked(); }
}

class Turnstile {
  private State state = new Locked();
  void coin() { state = state.coin(); }
  void push() { state = state.push(); }
}

public class Demo {
  public static void main(String[] args) {
    Turnstile t = new Turnstile();
    t.push();   // Still locked
    t.coin();   // Unlocked
    t.push();   // Walk through; locking
  }
}`
  },
  'abstract-factory': {
    name: 'Complete Example',
    explanation: 'A complete program creating a matching family of UI widgets for a chosen platform via an abstract factory.',
    codeExample: `interface Button   { void render(); }
interface Checkbox { void render(); }

class WinButton   implements Button   { public void render() { System.out.println("Windows button"); } }
class WinCheckbox implements Checkbox { public void render() { System.out.println("Windows checkbox"); } }
class MacButton   implements Button   { public void render() { System.out.println("Mac button"); } }
class MacCheckbox implements Checkbox { public void render() { System.out.println("Mac checkbox"); } }

interface GuiFactory { Button button(); Checkbox checkbox(); }
class WinFactory implements GuiFactory {
  public Button button()     { return new WinButton(); }
  public Checkbox checkbox() { return new WinCheckbox(); }
}
class MacFactory implements GuiFactory {
  public Button button()     { return new MacButton(); }
  public Checkbox checkbox() { return new MacCheckbox(); }
}

public class Demo {
  public static void main(String[] args) {
    GuiFactory factory = System.getProperty("os.name").startsWith("Mac")
        ? new MacFactory() : new WinFactory();
    factory.button().render();
    factory.checkbox().render();           // family always matches
  }
}`
  },
  prototype: {
    name: 'Complete Example',
    explanation: 'A complete program that registers prototypes and produces new objects by cloning them.',
    codeExample: `import java.util.HashMap;
import java.util.Map;

class Shape implements Cloneable {
  String type;
  String color;
  Shape(String type, String color) { this.type = type; this.color = color; }
  public Shape clone() {
    try { return (Shape) super.clone(); }
    catch (CloneNotSupportedException e) { throw new AssertionError(e); }
  }
  public String toString() { return color + " " + type; }
}

class ShapeRegistry {
  private final Map<String, Shape> prototypes = new HashMap<>();
  void register(String key, Shape s) { prototypes.put(key, s); }
  Shape create(String key)           { return prototypes.get(key).clone(); }
}

public class Demo {
  public static void main(String[] args) {
    ShapeRegistry registry = new ShapeRegistry();
    registry.register("red-circle", new Shape("circle", "red"));

    Shape a = registry.create("red-circle");
    Shape b = registry.create("red-circle");
    b.color = "blue";                       // clones are independent
    System.out.println(a + " | " + b);      // red circle | blue circle
  }
}`
  },
  composite: {
    name: 'Complete Example',
    explanation: 'A complete file-system program: files and folders share one interface, and a folder recursively sums its tree.',
    codeExample: `import java.util.ArrayList;
import java.util.List;

interface Node { long size(); }

class FileNode implements Node {
  private final String name; private final long bytes;
  FileNode(String name, long bytes) { this.name = name; this.bytes = bytes; }
  public long size() { return bytes; }
}

class Folder implements Node {
  private final String name;
  private final List<Node> children = new ArrayList<>();
  Folder(String name) { this.name = name; }
  Folder add(Node n) { children.add(n); return this; }
  public long size() { return children.stream().mapToLong(Node::size).sum(); }
}

public class Demo {
  public static void main(String[] args) {
    Folder root = new Folder("root")
        .add(new FileNode("a.txt", 100))
        .add(new Folder("sub")
            .add(new FileNode("b.txt", 250))
            .add(new FileNode("c.txt", 150)));
    System.out.println("total bytes = " + root.size());   // 500
  }
}`
  },
  'template-method': {
    name: 'Complete Example',
    explanation: 'A complete beverage program: the base class fixes the brew sequence; subclasses fill in the varying steps.',
    codeExample: `abstract class Beverage {
  // template method - fixed skeleton
  public final void prepare() {
    boilWater();
    brew();
    pourInCup();
    addCondiments();
  }
  private void boilWater() { System.out.println("Boiling water"); }
  private void pourInCup() { System.out.println("Pouring into cup"); }
  protected abstract void brew();
  protected abstract void addCondiments();
}

class Tea extends Beverage {
  protected void brew()          { System.out.println("Steeping tea"); }
  protected void addCondiments() { System.out.println("Adding lemon"); }
}
class Coffee extends Beverage {
  protected void brew()          { System.out.println("Dripping coffee"); }
  protected void addCondiments() { System.out.println("Adding sugar"); }
}

public class Demo {
  public static void main(String[] args) {
    new Tea().prepare();
    System.out.println("---");
    new Coffee().prepare();
  }
}`
  },
  iterator: {
    name: 'Complete Example',
    explanation: 'A complete program with a custom collection that exposes its own Iterator, traversed with a for-each loop.',
    codeExample: `import java.util.Iterator;

class NameRepository implements Iterable<String> {
  private final String[] names = { "Ann", "Bob", "Cy" };

  public Iterator<String> iterator() {
    return new Iterator<>() {
      private int index = 0;
      public boolean hasNext() { return index < names.length; }
      public String next()     { return names[index++]; }
    };
  }
}

public class Demo {
  public static void main(String[] args) {
    NameRepository repo = new NameRepository();
    for (String name : repo) {             // uses the custom iterator
      System.out.println(name);            // Ann, Bob, Cy
    }
  }
}`
  },
  'chain-of-responsibility': {
    name: 'Complete Example',
    explanation: 'A complete logging program: each handler processes messages at or above its level and passes the rest along the chain.',
    codeExample: `abstract class Logger {
  protected int level;
  protected Logger next;
  Logger(int level) { this.level = level; }
  Logger setNext(Logger next) { this.next = next; return next; }

  void log(int level, String msg) {
    if (this.level <= level) write(msg);
    if (next != null) next.log(level, msg);   // pass along
  }
  abstract void write(String msg);
}

class ConsoleLogger extends Logger {
  ConsoleLogger(int level) { super(level); }
  void write(String msg) { System.out.println("Console: " + msg); }
}
class ErrorLogger extends Logger {
  ErrorLogger(int level) { super(level); }
  void write(String msg) { System.out.println("ERROR file: " + msg); }
}

public class Demo {
  static final int INFO = 1, ERROR = 3;
  public static void main(String[] args) {
    Logger chain = new ConsoleLogger(INFO);
    chain.setNext(new ErrorLogger(ERROR));

    chain.log(INFO,  "starting up");        // Console only
    chain.log(ERROR, "disk full");          // Console + ERROR file
  }
}`
  },
  memento: {
    name: 'Complete Example',
    explanation: 'A complete text-editor program: snapshots are pushed to a history stack and popped to undo.',
    codeExample: `import java.util.ArrayDeque;
import java.util.Deque;

class Editor {
  private final StringBuilder content = new StringBuilder();
  void type(String text) { content.append(text); }
  String text() { return content.toString(); }

  record Memento(String state) {}
  Memento save()               { return new Memento(content.toString()); }
  void restore(Memento m)      { content.setLength(0); content.append(m.state()); }
}

public class Demo {
  public static void main(String[] args) {
    Editor editor = new Editor();
    Deque<Editor.Memento> history = new ArrayDeque<>();

    editor.type("Hello");
    history.push(editor.save());           // checkpoint
    editor.type(", World");
    System.out.println(editor.text());     // Hello, World

    editor.restore(history.pop());         // undo
    System.out.println(editor.text());     // Hello
  }
}`
  }
};

// =============================================================================
// TRADE-OFFS & COMPARISONS (rendered as an extra tab per pattern)
// =============================================================================
const TRADE_OFFS = {
  singleton: {
    name: 'Trade-offs & Comparisons',
    explanation: 'Pros: one shared instance, controlled global access, lazy or eager creation. Cons: it is essentially global state - it hides dependencies (callers reach for it instead of receiving it), makes unit testing hard (shared mutable state leaks between tests), and can become a concurrency bottleneck. When NOT to use: if you only ever create one instance by convention, prefer dependency injection (a single Spring bean) over a hard Singleton - you keep one instance but stay testable and mockable. Compared to a static utility class: Singleton can implement interfaces and be passed as an object; a static class cannot. Reach for it only for truly process-wide resources (logging, config, connection pools).',
  },
  'factory-method': {
    name: 'Trade-offs & Comparisons',
    explanation: 'Pros: decouples client from concrete classes, follows Open/Closed (add a new product+creator without touching callers), centralizes creation logic. Cons: a class explosion of creator subclasses, and indirection that can be overkill for simple objects. When NOT to use: if construction is trivial and stable, just call new. Factory Method vs Abstract Factory: Factory Method creates ONE product via subclassing/overriding a method; Abstract Factory creates a FAMILY of related products via composition (you hold a factory object). Factory Method vs a simple static factory: the static factory (e.g. valueOf) is simpler but cannot be overridden by subclasses.',
  },
  builder: {
    name: 'Trade-offs & Comparisons',
    explanation: 'Pros: readable construction of objects with many optional fields, supports immutability, validates before building. Cons: more code (a parallel Builder class), and a tiny runtime cost for the intermediate builder object. When NOT to use: for objects with one or two fields a constructor or factory is clearer. Builder vs telescoping constructors: builders avoid the unreadable new User(a,b,null,null,true) problem. Builder vs setters on a mutable object: builders can produce an immutable result and enforce required fields at build() time. Prefer it once you have ~4+ parameters, especially optional ones.',
  },
  observer: {
    name: 'Trade-offs & Comparisons',
    explanation: 'Pros: loose coupling between publisher and subscribers, dynamic subscription, supports broadcast. Cons: hard to follow control flow, risk of memory leaks if observers are not unsubscribed, unexpected update cascades, and undefined notification order. When NOT to use: for simple one-to-one callbacks a plain function/lambda is enough. Observer vs Pub/Sub (message broker): Observer is in-process and the subject knows its observers; pub/sub adds a broker/topic and full decoupling across processes. Modern Java often replaces hand-rolled Observer with reactive streams (Flow/Reactor) or Spring events.',
  },
  strategy: {
    name: 'Trade-offs & Comparisons',
    explanation: 'Pros: swap algorithms at runtime, eliminate big conditionals, test each strategy in isolation. Cons: clients must know the strategies exist to choose one, and many tiny classes for small variations. When NOT to use: if behavior never varies, a single method is simpler. Strategy vs State: structurally similar (both delegate to an interface) but intent differs - Strategy is chosen by the client and usually does not change itself; State transitions are driven by the object internally as its lifecycle advances. Strategy vs Template Method: Strategy varies behavior via composition (swap an object); Template Method varies it via inheritance (override steps).',
  },
  decorator: {
    name: 'Trade-offs & Comparisons',
    explanation: 'Pros: add responsibilities at runtime without subclass explosion, compose behaviors in any order, follows Single Responsibility. Cons: many small wrapper classes, deeply nested layers are hard to debug, and identity checks break (a decorated object != the original). When NOT to use: if behavior is fixed at compile time, subclassing or simple flags may be clearer. Decorator vs Inheritance: decoration is dynamic and combinable; inheritance is static. Decorator vs Proxy: same structure (wrap and delegate) but intent differs - Decorator ADDS behavior, Proxy CONTROLS access. Decorator vs Adapter: Decorator keeps the same interface, Adapter changes it.',
  },
  adapter: {
    name: 'Trade-offs & Comparisons',
    explanation: 'Pros: lets incompatible interfaces work together, isolates third-party/legacy code behind your own interface, no need to modify existing classes. Cons: extra indirection, and overuse can mask a design that should be cleaned up instead. When NOT to use: if you control both sides, change the interface directly rather than adapting. Adapter vs Facade: Adapter makes an existing interface match what a client expects (interface conversion); Facade invents a new simpler interface over a complex subsystem. Adapter vs Decorator: Adapter changes the interface; Decorator keeps it and adds behavior. Object adapter (composition) is generally preferred over class adapter (inheritance).',
  },
  facade: {
    name: 'Trade-offs & Comparisons',
    explanation: 'Pros: simplifies a complex subsystem to one easy entry point, decouples clients from internals, improves readability. Cons: can become a god object if it accumulates logic, and may hide useful subsystem capabilities. When NOT to use: if the subsystem is already simple, a facade just adds a layer. Facade vs Adapter: Facade defines a new convenient API over many classes; Adapter conforms an existing class to an expected interface. Facade vs Mediator: Facade is one-directional (clients -> subsystem) and the subsystem does not know the facade; Mediator coordinates two-way communication between peers. A facade should delegate, not implement business rules itself.',
  },
  command: {
    name: 'Trade-offs & Comparisons',
    explanation: 'Pros: turns requests into objects you can queue, log, schedule, and undo/redo; decouples invoker from receiver. Cons: a class per command can be heavy (lambdas/method refs mitigate this), and undo support adds complexity. When NOT to use: for a single direct call that never needs queuing or undo, just call the method. Command vs Strategy: both wrap behavior in an object, but Command represents a request/action (often with undo and a known receiver) while Strategy represents an interchangeable algorithm. In Java, a Runnable/Callable submitted to an executor is Command in practice.',
  },
  proxy: {
    name: 'Trade-offs & Comparisons',
    explanation: 'Pros: control access to an object (lazy loading, security, caching, remoting, logging) without changing it or the client. Cons: extra indirection and potential latency; lazy proxies can hide surprising costs. When NOT to use: if you do not need to intercept access, talk to the object directly. Proxy vs Decorator: identical structure (wrap + delegate) but Proxy CONTROLS/limits access while Decorator ADDS behavior. Proxy vs Adapter: Proxy keeps the same interface; Adapter changes it. Frameworks generate proxies for you - Spring AOP (@Transactional), Hibernate lazy loading, dynamic proxies, Mockito mocks.',
  },
  state: {
    name: 'Trade-offs & Comparisons',
    explanation: 'Pros: removes large state-based conditionals, makes each state and its transitions explicit, easy to add new states. Cons: more classes, and transition logic can be scattered across states. When NOT to use: for two or three simple states a boolean/enum + switch may be clearer. State vs Strategy: same structure, different intent - State objects know about and trigger transitions to other states as the object progresses through a lifecycle; Strategy objects are independent algorithms chosen externally and rarely swap themselves. If your conditionals branch on a status field that changes over time, that is State.',
  },
  'abstract-factory': {
    name: 'Trade-offs & Comparisons',
    explanation: 'Pros: creates families of related objects that are guaranteed to be compatible, isolates concrete classes, swaps whole families at once. Cons: rigid - adding a NEW product type means changing every factory; lots of interfaces/classes. When NOT to use: if you only need one product, Factory Method is lighter. Abstract Factory vs Factory Method: Abstract Factory is an object holding several factory methods to build a family (composition); Factory Method builds a single product via subclass override (inheritance). Abstract Factory vs Builder: Abstract Factory emphasizes WHICH family of products; Builder emphasizes step-by-step construction of one complex product.',
  },
  prototype: {
    name: 'Trade-offs & Comparisons',
    explanation: 'Pros: create objects by cloning a configured instance (cheaper than rebuilding), avoid subclassing factories, add/remove prototypes at runtime. Cons: deep-copying object graphs with circular references and mutable shared state is error-prone; Java Cloneable is widely considered flawed (prefer copy constructors/factories). When NOT to use: for simple, cheap-to-build objects just construct them. Prototype vs Factory Method: Prototype copies an existing instance; Factory Method instantiates a class. Prototype shines when configuration is expensive but the result is reused with minor tweaks (templates, game entities).',
  },
  composite: {
    name: 'Trade-offs & Comparisons',
    explanation: 'Pros: treat individual objects and compositions uniformly, makes recursive tree structures natural, easy to add new node types. Cons: the shared interface can become too general (leaf nodes forced to implement add/remove), and type safety weakens. When NOT to use: if your data is not hierarchical, do not force a tree. Composite vs Decorator: both are recursive wrappers, but Composite builds part-whole TREES (many children) while Decorator adds behavior to ONE wrapped component. Composite pairs naturally with Iterator (to traverse) and Visitor (to operate over the tree).',
  },
  'template-method': {
    name: 'Trade-offs & Comparisons',
    explanation: 'Pros: removes duplicated algorithm skeletons, fixes the invariant steps while letting subclasses fill the varying ones, enforces the overall flow. Cons: inheritance-based (one parent only), can violate the Liskov principle if hooks are misused, and the inverted control flow ("don\'t call us, we\'ll call you") can surprise. When NOT to use: if steps vary independently or you need runtime swapping, prefer Strategy (composition). Template Method vs Strategy: Template Method varies parts of an algorithm via subclassing; Strategy swaps the whole algorithm via composition. Frameworks use it heavily (JdbcTemplate, HttpServlet, JUnit lifecycle).',
  },
  iterator: {
    name: 'Trade-offs & Comparisons',
    explanation: 'Pros: traverse a collection without exposing its internals, support multiple simultaneous traversals, uniform iteration across structures. Cons: for simple arrays/lists it is unnecessary overhead, and external iterators add boilerplate. When NOT to use: a plain for-each over a standard collection already IS this pattern - do not hand-roll one. Iterator (external, client pulls next()) vs Internal iteration (forEach/Streams, the collection pushes elements): streams are more declarative and parallelizable. Implement a custom Iterator only for custom data structures (trees, graphs, paginated/remote sources).',
  },
  'chain-of-responsibility': {
    name: 'Trade-offs & Comparisons',
    explanation: 'Pros: decouples sender from receiver, lets you add/reorder handlers dynamically, each handler has a single responsibility. Cons: no guarantee a request is handled (it can fall off the end), harder to debug a long chain, and possible performance cost traversing it. When NOT to use: if exactly one known handler applies, call it directly. Chain of Responsibility vs Decorator: both build a chain of wrappers, but CoR lets a handler STOP the chain (handle and return) while Decorator always passes through and augments. Real uses: Servlet filters, Spring Security filter chain, logging levels, approval workflows.',
  },
  memento: {
    name: 'Trade-offs & Comparisons',
    explanation: 'Pros: capture and restore state without exposing internals, clean undo/redo and checkpoints, keeps the originator encapsulated. Cons: mementos can be memory-heavy if state is large or snapshots are frequent; managing the history (the caretaker) adds complexity. When NOT to use: if state is trivial to recompute or you can use command-based undo instead. Memento vs Command (for undo): Command undo re-runs an inverse operation (compact, but every action needs an inverse); Memento restores a full snapshot (simple, but stores whole state). Use Memento when reversing operations individually is hard.',
  }
};

// GoF classification per pattern id
const PATTERN_CATEGORY = {
  singleton: 'Creational',
  'factory-method': 'Creational',
  builder: 'Creational',
  'abstract-factory': 'Creational',
  prototype: 'Creational',
  decorator: 'Structural',
  adapter: 'Structural',
  facade: 'Structural',
  proxy: 'Structural',
  composite: 'Structural',
  observer: 'Behavioral',
  strategy: 'Behavioral',
  command: 'Behavioral',
  state: 'Behavioral',
  'template-method': 'Behavioral',
  iterator: 'Behavioral',
  'chain-of-responsibility': 'Behavioral',
  memento: 'Behavioral'
};

const CATEGORY_COLOR = {
  Creational: '#22c55e',
  Structural: '#3b82f6',
  Behavioral: '#f59e0b'
};

// Append the extra tabs (Real-World Usage, Complete Example, Trade-offs) to a pattern's details
const withExtraTabs = (concept) => {
  const extras = [REAL_WORLD_USAGE[concept.id], COMPLETE_EXAMPLE[concept.id], TRADE_OFFS[concept.id]].filter(Boolean)
  return extras.length ? [...concept.details, ...extras] : concept.details
}

// Small by default, expands to full size on hover (shared with the Spring page behavior)
const HoverZoomDiagram = ({ children }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={hovered ? '' : 'Hover to enlarge'}
      style={{
        maxWidth: hovered ? '100%' : '360px',
        margin: '0 auto',
        transition: 'max-width 0.35s ease',
        cursor: hovered ? 'zoom-out' : 'zoom-in'
      }}
    >
      {children}
    </div>
  )
}

function DesignPatterns({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'singleton',
      name: 'Singleton',
      icon: '🔒',
      color: '#6366f1',
      description: 'Ensures class has only one instance with global access point. Lazy initialization, thread-safe implementations.',
      diagram: SingletonDiagram,
      details: [
        {
          name: 'Eager Initialization',
          explanation: 'Creates instance at class loading time. Thread-safe by default since JVM handles class initialization. Simple but may waste resources if instance is never used.',
          codeExample: `public class DatabaseConnection {
    // Instance created at class loading
    private static final DatabaseConnection instance = new DatabaseConnection();

    private DatabaseConnection() {
        // Private constructor prevents instantiation
    }

    public static DatabaseConnection getInstance() {
        return instance;
    }
}

// Usage
DatabaseConnection db1 = DatabaseConnection.getInstance();
DatabaseConnection db2 = DatabaseConnection.getInstance();
System.out.println(db1 == db2);  // true - same instance`
        },
        {
          name: 'Double-Check Locking',
          explanation: 'Lazy initialization with thread safety. Uses volatile keyword to prevent instruction reordering. First check avoids locking overhead, second check ensures single instance.',
          codeExample: `public class LazyDbConnection {
    private static volatile LazyDbConnection instance;

    private LazyDbConnection() {}

    public static LazyDbConnection getInstance() {
        if (instance == null) {  // First check (no locking)
            synchronized (LazyDbConnection.class) {
                if (instance == null) {  // Second check (with locking)
                    instance = new LazyDbConnection();
                }
            }
        }
        return instance;
    }
}`
        },
        {
          name: 'Enum Singleton',
          explanation: 'Best approach recommended by Joshua Bloch. Handles serialization automatically, prevents reflection attacks, and is thread-safe. JVM guarantees single instance.',
          codeExample: `public enum ConfigManager {
    INSTANCE;

    private String config;

    public void setConfig(String config) {
        this.config = config;
    }

    public String getConfig() {
        return config;
    }
}

// Usage
ConfigManager.INSTANCE.setConfig("production");
System.out.println(ConfigManager.INSTANCE.getConfig());

// JDK Examples:
Runtime runtime = Runtime.getRuntime();  // Singleton
Desktop desktop = Desktop.getDesktop();  // Singleton`
        },
        {
          name: 'JDK Examples',
          explanation: 'The JDK uses Singleton extensively. Runtime provides JVM-level operations. Desktop provides OS integration. System provides standard I/O and properties. LogManager controls the logging framework.',
          codeExample: `// java.lang.Runtime — one JVM, one Runtime
Runtime rt = Runtime.getRuntime();
rt.availableProcessors();   // CPU core count
rt.maxMemory();             // max heap size
rt.gc();                    // suggest garbage collection
rt.addShutdownHook(new Thread(() ->
    System.out.println("JVM shutting down")));

// java.awt.Desktop — one OS desktop
Desktop desktop = Desktop.getDesktop();
desktop.browse(new URI("https://example.com"));
desktop.open(new File("document.pdf"));

// java.lang.System — static singleton (no getInstance)
System.currentTimeMillis();
System.getProperty("java.version");
System.getenv("PATH");

// java.util.logging.LogManager
LogManager manager = LogManager.getLogManager();

// Spring: ApplicationContext is a singleton container
// that manages singleton-scoped beans by default
@Bean  // singleton scope by default
public DataSource dataSource() { /* ... */ }`
        }
      ]
    },
    {
      id: 'factory-method',
      name: 'Factory Method',
      icon: '🏭',
      color: '#10b981',
      description: 'Defines interface for creating objects, letting subclasses decide which class to instantiate. Promotes loose coupling.',
      diagram: FactoryMethodDiagram,
      details: [
        {
          name: 'Abstract Creator & Product',
          explanation: 'Product interface defines what can be created. Creator abstract class contains the factory method that subclasses override to produce different products.',
          codeExample: `// Product interface
interface Document {
    void open();
    void save();
}

// Creator with factory method
abstract class Application {
    // Factory method - subclasses override
    abstract Document createDocument();

    public void newDocument() {
        Document doc = createDocument();
        doc.open();
    }
}`
        },
        {
          name: 'Concrete Implementations',
          explanation: 'Each concrete creator returns a specific product type. Adding new products only requires creating new creator-product pairs without modifying existing code.',
          codeExample: `// Concrete products
class PDFDocument implements Document {
    public void open() { System.out.println("Opening PDF"); }
    public void save() { System.out.println("Saving PDF"); }
}

class WordDocument implements Document {
    public void open() { System.out.println("Opening Word"); }
    public void save() { System.out.println("Saving Word"); }
}

// Concrete creators
class PDFApplication extends Application {
    Document createDocument() { return new PDFDocument(); }
}

class WordApplication extends Application {
    Document createDocument() { return new WordDocument(); }
}`
        },
        {
          name: 'Usage & Benefits',
          explanation: 'Client code works with creators and products through interfaces. Easy to extend with new product types. Single Responsibility: creation logic in one place.',
          codeExample: `// Usage
Application pdfApp = new PDFApplication();
pdfApp.newDocument();  // Opening PDF

Application wordApp = new WordApplication();
wordApp.newDocument();  // Opening Word

// JDK Examples:
Calendar calendar = Calendar.getInstance();
NumberFormat formatter = NumberFormat.getInstance();
DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();`
        },
        {
          name: 'JDK Examples',
          explanation: 'The JDK uses Factory Method everywhere. Calendar.getInstance() returns GregorianCalendar or locale-specific subclass. NumberFormat returns DecimalFormat. Collection.iterator() is a factory method on every collection.',
          codeExample: `// java.util.Calendar.getInstance()
// Returns GregorianCalendar, JapaneseImperialCalendar, etc.
Calendar cal = Calendar.getInstance();        // default
Calendar jp = Calendar.getInstance(
    Locale.JAPAN);                            // locale-specific

// java.text.NumberFormat.getInstance()
// Returns DecimalFormat or CompactNumberFormat
NumberFormat nf = NumberFormat.getInstance();
NumberFormat currency = NumberFormat
    .getCurrencyInstance(Locale.US);
System.out.println(currency.format(1234.56));
// $1,234.56

// javax.xml.parsers.DocumentBuilderFactory
DocumentBuilderFactory dbf = DocumentBuilderFactory
    .newInstance();  // returns platform-specific impl
DocumentBuilder builder = dbf.newDocumentBuilder();

// java.util.Collection.iterator()
// Each collection returns its own Iterator subclass
List<String> list = List.of("a", "b", "c");
Iterator<String> it = list.iterator();  // ListIterator

Set<String> set = Set.of("x", "y");
Iterator<String> setIt = set.iterator();  // SetIterator

// java.net.URLStreamHandlerFactory
// URL.openConnection() returns HttpURLConnection,
// FtpURLConnection, JarURLConnection, etc.
URL url = new URL("https://example.com");
URLConnection conn = url.openConnection();`
        }
      ]
    },
    {
      id: 'builder',
      name: 'Builder',
      icon: '🏗️',
      color: '#f59e0b',
      description: 'Constructs complex objects step by step. Separates construction from representation. Fluent API pattern.',
      diagram: BuilderDiagram,
      details: [
        {
          name: 'Product with Private Constructor',
          explanation: 'Product class with many fields uses private constructor. Only the Builder can instantiate it, ensuring all required validations pass before object creation.',
          codeExample: `public class User {
    private final String username;
    private final String email;
    private final String firstName;
    private final int age;

    private User(UserBuilder builder) {
        this.username = builder.username;
        this.email = builder.email;
        this.firstName = builder.firstName;
        this.age = builder.age;
    }
    // Getters...
}`
        },
        {
          name: 'Fluent Builder Class',
          explanation: 'Builder holds same fields as product. Each setter returns "this" for method chaining. Build method creates and returns the final product.',
          codeExample: `public static class UserBuilder {
    private final String username;  // Required
    private final String email;     // Required
    private String firstName = "";  // Optional with default
    private int age = 0;            // Optional with default

    public UserBuilder(String username, String email) {
        this.username = username;
        this.email = email;
    }

    public UserBuilder firstName(String firstName) {
        this.firstName = firstName;
        return this;  // Enable chaining
    }

    public UserBuilder age(int age) {
        this.age = age;
        return this;
    }

    public User build() { return new User(this); }
}`
        },
        {
          name: 'Usage Examples',
          explanation: 'Fluent API makes code readable. Only required parameters in constructor, optional ones via setters. JDK uses this pattern extensively.',
          codeExample: `// Fluent API usage
User user1 = new User.UserBuilder("john", "john@example.com")
    .firstName("John")
    .age(30)
    .build();

User user2 = new User.UserBuilder("jane", "jane@example.com")
    .firstName("Jane")
    .build();  // age defaults to 0

// JDK Examples:
StringBuilder sb = new StringBuilder()
    .append("Hello")
    .append(" ")
    .append("World");

Stream<String> stream = Stream.<String>builder()
    .add("one").add("two").add("three")
    .build();`
        },
        {
          name: 'JDK Examples',
          explanation: 'Builder is one of the most common JDK patterns. StringBuilder for strings, Stream.builder() for streams, and Java 11+ HttpClient.newBuilder() for HTTP requests. All use fluent method chaining.',
          codeExample: `// java.lang.StringBuilder — classic builder
String result = new StringBuilder()
    .append("SELECT * FROM orders")
    .append(" WHERE status = 'ACTIVE'")
    .append(" ORDER BY created_at DESC")
    .toString();

// java.util.stream.Stream.builder()
Stream<String> stream = Stream.<String>builder()
    .add("AAPL").add("GOOGL").add("MSFT")
    .build();

// java.net.http.HttpRequest.newBuilder() (Java 11+)
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/orders"))
    .header("Authorization", "Bearer token123")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(json))
    .timeout(Duration.ofSeconds(10))
    .build();

// java.util.Locale.Builder (Java 7+)
Locale locale = new Locale.Builder()
    .setLanguage("en")
    .setRegion("US")
    .build();

// java.time (Java 8+) — immutable builders
LocalDateTime dt = LocalDateTime.now()
    .withHour(9).withMinute(30);  // market open

// ProcessBuilder
Process proc = new ProcessBuilder("java", "-version")
    .directory(new File("/app"))
    .redirectErrorStream(true)
    .start();`
        }
      ]
    },
    {
      id: 'observer',
      name: 'Observer',
      icon: '👁️',
      color: '#8b5cf6',
      description: 'Defines one-to-many dependency. When subject changes state, all observers are notified. Publisher-Subscriber model.',
      diagram: ObserverDiagram,
      details: [
        {
          name: 'Observer Interface & Subject',
          explanation: 'Observer interface defines update method. Subject maintains list of observers and provides attach/detach methods. NotifyAll iterates and calls update on each.',
          codeExample: `interface Observer {
    void update(String message);
}

class Subject {
    private List<Observer> observers = new ArrayList<>();
    private String state;

    public void attach(Observer observer) {
        observers.add(observer);
    }

    public void detach(Observer observer) {
        observers.remove(observer);
    }

    public void setState(String state) {
        this.state = state;
        notifyAllObservers();
    }

    private void notifyAllObservers() {
        for (Observer observer : observers) {
            observer.update(state);
        }
    }
}`
        },
        {
          name: 'Concrete Observers',
          explanation: 'Each observer implements update differently. EmailNotifier sends emails, SMSNotifier sends texts. All respond to same event in their own way.',
          codeExample: `class EmailNotifier implements Observer {
    private String email;

    public EmailNotifier(String email) {
        this.email = email;
    }

    @Override
    public void update(String message) {
        System.out.println("Email to " + email + ": " + message);
    }
}

class SMSNotifier implements Observer {
    private String phone;

    public SMSNotifier(String phone) {
        this.phone = phone;
    }

    @Override
    public void update(String message) {
        System.out.println("SMS to " + phone + ": " + message);
    }
}`
        },
        {
          name: 'Stock Market Example',
          explanation: 'Real-world example: stock price changes notify all investors. Loose coupling - subject knows nothing about observer implementations.',
          codeExample: `class Stock extends Subject {
    private String symbol;
    private double price;

    public void setPrice(double price) {
        this.price = price;
        setState(symbol + " price: $" + price);
    }
}

// Usage
Stock appleStock = new Stock("AAPL", 150.0);
appleStock.attach(new StockInvestor("John"));
appleStock.attach(new StockInvestor("Jane"));

appleStock.setPrice(155.0);
// Investor John notified: AAPL price: $155.0
// Investor Jane notified: AAPL price: $155.0

// JDK: PropertyChangeSupport, java.util.Observable`
        }
      ]
    },
    {
      id: 'strategy',
      name: 'Strategy',
      icon: '🎯',
      color: '#ec4899',
      description: 'Defines family of interchangeable algorithms. Algorithm varies independently from clients. Eliminates conditionals.',
      diagram: StrategyDiagram,
      details: [
        {
          name: 'Strategy Interface',
          explanation: 'The strategy interface declares the algorithm contract. In trading, order execution algorithms (VWAP, TWAP, Iceberg) all share the same interface but differ in how they slice and route orders. Each concrete strategy encapsulates one execution algorithm.',
          codeExample: `// Strategy interface - execution algorithm contract
interface ExecutionStrategy {
    List<ChildOrder> slice(Order parentOrder,
            MarketData marketData);
    boolean shouldPause(MarketConditions conditions);
    String getName();
}

// VWAP: Volume-Weighted Average Price
class VwapStrategy implements ExecutionStrategy {
    private final double participationRate;
    private final VolumeProfile historicalProfile;

    public VwapStrategy(double participationRate,
            VolumeProfile profile) {
        this.participationRate = participationRate;
        this.historicalProfile = profile;
    }

    @Override
    public List<ChildOrder> slice(Order parent,
            MarketData data) {
        // Slice order proportional to historical volume
        double expectedVolume = historicalProfile
            .getExpectedVolume(LocalTime.now());
        int sliceQty = (int) (expectedVolume
            * participationRate);
        sliceQty = Math.min(sliceQty,
            parent.getRemainingQty());

        return List.of(new ChildOrder(
            parent.getSymbol(),
            parent.getSide(),
            sliceQty,
            data.getMidPrice(),
            OrderType.LIMIT
        ));
    }
}`
        },
        {
          name: 'Concrete Strategies',
          explanation: 'Each concrete strategy implements a different execution algorithm. TWAP slices evenly over time, Iceberg hides large order size, and POV (Percent of Volume) tracks real-time market volume. All interchangeable behind the same interface.',
          codeExample: `// TWAP: Time-Weighted Average Price
class TwapStrategy implements ExecutionStrategy {
    private final Duration duration;
    private final int numSlices;

    @Override
    public List<ChildOrder> slice(Order parent,
            MarketData data) {
        // Divide equally across time intervals
        int sliceQty = parent.getRemainingQty()
            / numSlices;
        return List.of(new ChildOrder(
            parent.getSymbol(), parent.getSide(),
            sliceQty, data.getMidPrice(), OrderType.LIMIT
        ));
    }
}

// Iceberg: Hide true order size
class IcebergStrategy implements ExecutionStrategy {
    private final int visibleQty;

    @Override
    public List<ChildOrder> slice(Order parent,
            MarketData data) {
        // Only show a small clip to the market
        int qty = Math.min(visibleQty,
            parent.getRemainingQty());
        double price = parent.getSide() == Side.BUY
            ? data.getBestBid()    // join the bid
            : data.getBestAsk();   // join the ask
        return List.of(new ChildOrder(
            parent.getSymbol(), parent.getSide(),
            qty, price, OrderType.LIMIT
        ));
    }
}

// POV: Percent of Volume
class PovStrategy implements ExecutionStrategy {
    private final double targetRate; // e.g., 0.15 = 15%

    @Override
    public List<ChildOrder> slice(Order parent,
            MarketData data) {
        // Track real-time volume, not historical
        long recentVolume = data.getVolumeSince(
            Instant.now().minus(Duration.ofMinutes(1)));
        int sliceQty = (int)(recentVolume * targetRate);
        return List.of(new ChildOrder(
            parent.getSymbol(), parent.getSide(),
            sliceQty, data.getMidPrice(), OrderType.LIMIT
        ));
    }
}`
        },
        {
          name: 'Context: Algo Engine',
          explanation: 'The context (AlgoEngine) holds a reference to the strategy and delegates slicing decisions to it. The engine handles the execution loop — timing, order management, fills — while the strategy decides what to send. Strategy can be changed at runtime.',
          codeExample: `// Context - delegates execution decisions to strategy
class AlgoEngine {
    private final ExecutionVenue venue;
    private ExecutionStrategy strategy;
    private Order parentOrder;
    private final List<Fill> fills = new ArrayList<>();

    public AlgoEngine(ExecutionVenue venue) {
        this.venue = venue;
    }

    public void setStrategy(ExecutionStrategy strategy) {
        this.strategy = strategy;
    }

    public void execute(Order order, MarketData data) {
        this.parentOrder = order;

        while (parentOrder.getRemainingQty() > 0) {
            MarketConditions conditions =
                assessConditions(data);

            // Strategy decides whether to pause
            if (strategy.shouldPause(conditions)) {
                sleep(1000);
                continue;
            }

            // Strategy decides how to slice
            List<ChildOrder> children =
                strategy.slice(parentOrder, data);

            for (ChildOrder child : children) {
                ExecutionReport report =
                    venue.sendOrder(child);
                if (report.isFilled()) {
                    fills.add(report.getFill());
                    parentOrder.reduce(
                        report.getFilledQty());
                }
            }

            sleep(strategy.getInterval());
        }
    }
}`
        },
        {
          name: 'Runtime Strategy Switching',
          explanation: 'Strategies can be swapped at runtime based on market conditions. A trading desk might start with VWAP for a large order, then switch to Iceberg when the stock becomes volatile. The engine code never changes — Open/Closed Principle in action.',
          codeExample: `// Switch strategies at runtime
AlgoEngine engine = new AlgoEngine(nyseVenue);

// Start with VWAP for 100K shares
Order order = new Order("AAPL", Side.BUY, 100_000);
engine.setStrategy(new VwapStrategy(0.10, appleProfile));
engine.execute(order, marketData);

// Market turns volatile — switch to Iceberg
if (marketData.getVolatility() > 2.0) {
    engine.setStrategy(new IcebergStrategy(500));
}

// End of day — switch to aggressive TWAP
if (LocalTime.now().isAfter(LocalTime.of(15, 30))) {
    engine.setStrategy(new TwapStrategy(
        Duration.ofMinutes(30), 10
    ));
}

// Spring injection — configure via properties
@Configuration
class AlgoConfig {
    @Bean
    @ConditionalOnProperty(name = "algo.default",
        havingValue = "vwap")
    ExecutionStrategy vwap(VolumeProfileService profiles) {
        return new VwapStrategy(0.10,
            profiles.getDefault());
    }

    @Bean
    @ConditionalOnProperty(name = "algo.default",
        havingValue = "twap")
    ExecutionStrategy twap() {
        return new TwapStrategy(
            Duration.ofHours(2), 20);
    }
}`
        },
        {
          name: 'Pricing & Risk Strategies',
          explanation: 'Strategy pattern appears throughout finance — pricing models (Black-Scholes vs Binomial vs Monte Carlo), risk calculations (VaR methods), and order routing. Each encapsulates a complex algorithm behind a clean interface.',
          codeExample: `// Options pricing strategies
interface PricingModel {
    double price(Option option, MarketData data);
    Greeks calculateGreeks(Option option, MarketData data);
}

class BlackScholesModel implements PricingModel {
    @Override
    public double price(Option opt, MarketData data) {
        double S = data.getSpotPrice(opt.getUnderlying());
        double K = opt.getStrike();
        double T = opt.getTimeToExpiry();
        double r = data.getRiskFreeRate();
        double sigma = data.getImpliedVol(opt);

        double d1 = (Math.log(S / K) +
            (r + sigma * sigma / 2) * T)
            / (sigma * Math.sqrt(T));
        double d2 = d1 - sigma * Math.sqrt(T);

        if (opt.getType() == OptionType.CALL) {
            return S * N(d1) - K * Math.exp(-r * T) * N(d2);
        } else {
            return K * Math.exp(-r * T) * N(-d2) - S * N(-d1);
        }
    }
}

class MonteCarloModel implements PricingModel {
    private final int simulations; // e.g., 100_000

    @Override
    public double price(Option opt, MarketData data) {
        double sum = 0;
        for (int i = 0; i < simulations; i++) {
            double path = simulatePath(opt, data);
            sum += opt.payoff(path);
        }
        double r = data.getRiskFreeRate();
        double T = opt.getTimeToExpiry();
        return Math.exp(-r * T) * (sum / simulations);
    }
}

// Risk engine swaps pricing strategy per product
class RiskEngine {
    private final Map<String, PricingModel> models;

    public double pricePosition(Position pos,
            MarketData data) {
        PricingModel model = models.get(
            pos.getProductType()); // "vanilla","exotic"
        return model.price(pos.getOption(), data);
    }
}`
        },
        {
          name: 'Order Routing Strategy',
          explanation: 'Smart Order Routers use Strategy pattern to decide where to send orders. Best-price routes to the venue with the tightest spread, liquidity-seeking checks dark pools first, and cost-minimized factors in exchange fees. Strategies compose with the Adapter pattern for venue connectivity.',
          codeExample: `// Order routing strategy
interface RoutingStrategy {
    String selectVenue(Order order,
        Map<String, MarketData> venueData);
}

class BestPriceRouting implements RoutingStrategy {
    @Override
    public String selectVenue(Order order,
            Map<String, MarketData> venueData) {
        return venueData.entrySet().stream()
            .min(Comparator.comparingDouble(e ->
                order.getSide() == Side.BUY
                    ? e.getValue().getBestAsk()
                    : -e.getValue().getBestBid()))
            .map(Map.Entry::getKey)
            .orElse("PRIMARY");
    }
}

class LiquiditySeeking implements RoutingStrategy {
    @Override
    public String selectVenue(Order order,
            Map<String, MarketData> venueData) {
        // Check dark pools first for hidden liquidity
        for (String venue : List.of("DARKPOOL_A",
                "DARKPOOL_B", "SIGMA_X")) {
            MarketData md = venueData.get(venue);
            if (md != null && md.getIndicativeSize()
                    >= order.getQuantity()) {
                return venue;
            }
        }
        // Fall back to lit venue with most volume
        return venueData.entrySet().stream()
            .filter(e -> !e.getKey().startsWith("DARK"))
            .max(Comparator.comparingLong(e ->
                e.getValue().getVolume()))
            .map(Map.Entry::getKey)
            .orElse("NYSE");
    }
}

// PITFALLS & BEST PRACTICES:
// ✗ Don't put venue-specific logic in the router
// ✗ Avoid god-strategy with too many responsibilities
// ✗ Don't hardcode strategy selection — use config
// ✓ One strategy per algorithm / routing rule
// ✓ Strategies should be stateless when possible
// ✓ Combine with Factory to select strategy by name
// ✓ Unit test each strategy independently`
        }
      ]
    },
    {
      id: 'decorator',
      name: 'Decorator',
      icon: '🎨',
      color: '#10b981',
      description: 'Attaches additional responsibilities dynamically. Alternative to subclassing. Chain multiple decorators.',
      diagram: DecoratorDiagram,
      details: [
        {
          name: 'Component Interface',
          explanation: 'Component interface defines operations. Concrete component provides base implementation. Both decorators and components implement same interface.',
          codeExample: `interface Coffee {
    String getDescription();
    double getCost();
}

class SimpleCoffee implements Coffee {
    @Override
    public String getDescription() {
        return "Simple coffee";
    }

    @Override
    public double getCost() {
        return 2.0;
    }
}`
        },
        {
          name: 'Abstract Decorator',
          explanation: 'Decorator wraps a component and delegates to it. Subclasses add behavior before/after delegation. Maintains same interface as component.',
          codeExample: `abstract class CoffeeDecorator implements Coffee {
    protected Coffee decoratedCoffee;

    public CoffeeDecorator(Coffee coffee) {
        this.decoratedCoffee = coffee;
    }

    @Override
    public String getDescription() {
        return decoratedCoffee.getDescription();
    }

    @Override
    public double getCost() {
        return decoratedCoffee.getCost();
    }
}`
        },
        {
          name: 'Concrete Decorators & Chaining',
          explanation: 'Each decorator adds specific behavior. Decorators can be stacked. Order matters - each wraps the previous. JDK I/O streams use this pattern.',
          codeExample: `class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) { super(coffee); }

    @Override
    public String getDescription() {
        return decoratedCoffee.getDescription() + ", milk";
    }

    @Override
    public double getCost() {
        return decoratedCoffee.getCost() + 0.5;
    }
}

// Chaining decorators
Coffee coffee = new SimpleCoffee();  // $2.0
coffee = new MilkDecorator(coffee);   // $2.5
coffee = new SugarDecorator(coffee);  // $2.7
System.out.println(coffee.getDescription());
// Simple coffee, milk, sugar

// JDK Example:
BufferedReader reader = new BufferedReader(
    new InputStreamReader(
        new FileInputStream("file.txt")
    )
);`
        }
      ]
    },
    {
      id: 'adapter',
      name: 'Adapter',
      icon: '🔌',
      color: '#f59e0b',
      description: 'Converts interface of one class into another clients expect. Makes incompatible interfaces work together.',
      diagram: AdapterDiagram,
      details: [
        {
          name: 'Target & Adaptee',
          explanation: 'Target is the interface your trading system expects. Adaptee is an exchange or vendor API with an incompatible interface. You cannot modify the exchange SDK, so an adapter wraps it to conform to your internal interface.',
          codeExample: `// Target interface - your trading system's contract
interface MarketDataFeed {
    Quote getQuote(String symbol);
    void subscribe(String symbol, QuoteListener listener);
    void unsubscribe(String symbol);
}

// Adaptee - Bloomberg terminal SDK (incompatible)
class BloombergTerminal {
    public BbgSecurity resolve(String ticker,
            String yellowKey) {
        // Bloomberg-specific security resolution
        return new BbgSecurity(ticker, yellowKey);
    }

    public BbgTick requestSnap(BbgSecurity security,
            List<String> fields) {
        // Returns Bloomberg-specific tick data
        return new BbgTick(/* ... */);
    }

    public void registerSubscription(BbgSecurity security,
            BbgEventHandler handler) {
        // Bloomberg's proprietary event model
    }
}`
        },
        {
          name: 'Object Adapter (Composition)',
          explanation: 'Object adapter uses composition — holds a reference to the adaptee and delegates calls. Preferred approach because it can adapt multiple vendor feeds behind one interface, and can be swapped at runtime (e.g., switch from Bloomberg to Reuters).',
          codeExample: `// Object Adapter - adapts Bloomberg to our feed
class BloombergFeedAdapter implements MarketDataFeed {
    private final BloombergTerminal bbg;
    private final Map<String, BbgSecurity> cache
        = new ConcurrentHashMap<>();

    public BloombergFeedAdapter(BloombergTerminal bbg) {
        this.bbg = bbg;
    }

    @Override
    public Quote getQuote(String symbol) {
        // Translate our symbol -> Bloomberg security
        BbgSecurity sec = cache.computeIfAbsent(symbol,
            s -> bbg.resolve(s, "Equity"));

        // Call Bloomberg API
        BbgTick tick = bbg.requestSnap(sec,
            List.of("BID", "ASK", "LAST_PRICE", "VOLUME"));

        // Translate Bloomberg response -> our domain
        return new Quote(
            symbol,
            tick.getField("BID").asDouble(),
            tick.getField("ASK").asDouble(),
            tick.getField("LAST_PRICE").asDouble(),
            tick.getField("VOLUME").asLong(),
            Instant.now()
        );
    }

    @Override
    public void subscribe(String symbol,
            QuoteListener listener) {
        BbgSecurity sec = cache.computeIfAbsent(symbol,
            s -> bbg.resolve(s, "Equity"));

        bbg.registerSubscription(sec, event -> {
            // Adapt Bloomberg event -> our QuoteListener
            Quote q = translateTick(event);
            listener.onQuote(q);
        });
    }
}`
        },
        {
          name: 'Class Adapter (Inheritance)',
          explanation: 'Class adapter extends the adaptee and implements the target. Less common in trading systems since vendor SDKs are usually final classes. Useful for adapting internal legacy components like an old FIX engine.',
          codeExample: `// Class Adapter - extends legacy FIX engine
class LegacyFixEngine {
    protected void sendRawMessage(String fixMsg) {
        // Low-level FIX 4.2 message sending
    }
    protected String receiveRawMessage() {
        return "8=FIX.4.2|35=D|49=SENDER|...";
    }
}

// Modern order gateway interface
interface OrderGateway {
    String submitOrder(Order order);
    OrderStatus getStatus(String orderId);
}

// Class adapter bridges legacy FIX -> modern interface
class FixEngineAdapter extends LegacyFixEngine
        implements OrderGateway {

    @Override
    public String submitOrder(Order order) {
        // Build FIX NewOrderSingle (35=D) from domain
        String fix = "8=FIX.4.2|35=D"
            + "|55=" + order.getSymbol()
            + "|54=" + (order.getSide() == Side.BUY
                ? "1" : "2")
            + "|38=" + order.getQuantity()
            + "|44=" + order.getPrice()
            + "|40=" + order.getType().fixValue()
            + "|10=000|";

        super.sendRawMessage(fix);  // inherited method
        return order.getClOrdId();
    }
}

// Comparison:
// Object Adapter: HAS-A adaptee (composition)
//   + Swap Bloomberg ↔ Reuters at runtime
//   + Adapt multiple vendor feeds
//
// Class Adapter: IS-A adaptee (inheritance)
//   + Direct access to internals
//   - Coupled to one specific adaptee`
        },
        {
          name: 'Multi-Venue Trading Adapter',
          explanation: 'In electronic trading, you often connect to multiple exchanges (NYSE, NASDAQ, dark pools) each with different protocols. Adapters normalize them behind a single execution interface — this is the core of a Smart Order Router.',
          codeExample: `// Unified execution port (hexagonal architecture)
interface ExecutionVenue {
    ExecutionReport sendOrder(Order order);
    void cancelOrder(String orderId);
    List<Fill> getFills(String orderId);
}

// NYSE adapter — FIX protocol
@Component("nyse")
class NyseAdapter implements ExecutionVenue {
    private final FixSession nyseSession;

    @Override
    public ExecutionReport sendOrder(Order order) {
        NewOrderSingle nos = new NewOrderSingle();
        nos.set(new Symbol(order.getSymbol()));
        nos.set(new Side(order.getSide().fixChar()));
        nos.set(new OrderQty(order.getQuantity()));
        nos.set(new Price(order.getLimitPrice()));
        nos.set(new TimeInForce(TimeInForce.DAY));

        nyseSession.send(nos);
        return awaitAck(nos.getClOrdID().getValue());
    }
}

// Dark Pool adapter — proprietary binary protocol
@Component("darkpool")
class DarkPoolAdapter implements ExecutionVenue {
    private final DarkPoolClient client;

    @Override
    public ExecutionReport sendOrder(Order order) {
        DPOrder dpOrder = DPOrder.builder()
            .instrument(order.getSymbol())
            .direction(order.getSide() == Side.BUY
                ? DPDirection.PASSIVE_BUY
                : DPDirection.PASSIVE_SELL)
            .size(order.getQuantity())
            .minFillSize(order.getMinQty())
            .build();

        DPResponse resp = client.submit(dpOrder);
        return mapToExecutionReport(resp);
    }
}

// Smart Order Router uses adapters uniformly
@Service
class SmartOrderRouter {
    private final Map<String, ExecutionVenue> venues;

    public void routeOrder(Order order) {
        String venue = selectBestVenue(order);
        venues.get(venue).sendOrder(order);
    }
}`
        },
        {
          name: 'FIX Protocol Message Adapter',
          explanation: 'FIX messages use tag=value pairs (e.g., 35=D for NewOrderSingle). An adapter translates between FIX wire format and domain objects, handling version differences (FIX 4.2 vs 4.4 vs 5.0) transparently.',
          codeExample: `// Adapt FIX execution reports to domain events
interface TradeEventListener {
    void onFill(Fill fill);
    void onPartialFill(Fill fill);
    void onReject(Rejection rejection);
}

class FixMessageAdapter implements Application {
    private final TradeEventListener listener;

    // QuickFIX/J callback — raw FIX messages
    @Override
    public void fromApp(Message message, SessionID sid)
            throws FieldNotFound {
        String msgType = message.getHeader()
            .getString(MsgType.FIELD);

        if ("8".equals(msgType)) {  // ExecutionReport
            adaptExecutionReport(message);
        }
    }

    private void adaptExecutionReport(Message msg)
            throws FieldNotFound {
        char execType = msg.getChar(ExecType.FIELD);
        char ordStatus = msg.getChar(OrdStatus.FIELD);

        Fill fill = new Fill(
            msg.getString(OrderID.FIELD),
            msg.getString(Symbol.FIELD),
            msg.getChar(Side.FIELD) == '1'
                ? Side.BUY : Side.SELL,
            msg.getDecimal(LastPx.FIELD),
            msg.getInt(LastShares.FIELD),
            msg.getString(ExecID.FIELD),
            Instant.now()
        );

        // Translate FIX exec types -> domain events
        switch (execType) {
            case ExecType.FILL:
                listener.onFill(fill);
                break;
            case ExecType.PARTIAL_FILL:
                listener.onPartialFill(fill);
                break;
            case ExecType.REJECTED:
                listener.onReject(new Rejection(
                    msg.getString(OrderID.FIELD),
                    msg.getString(Text.FIELD)
                ));
                break;
        }
    }
}`
        },
        {
          name: 'When to Use & Pitfalls',
          explanation: 'Use Adapter when connecting to exchanges, vendor feeds, legacy systems, or implementing a Smart Order Router. Essential for multi-venue trading and FIX protocol integration. Keep adapters thin — translate only, no business logic.',
          codeExample: `// WHEN TO USE IN TRADING:
// 1. Multi-venue connectivity (NYSE, NASDAQ, LSE)
// 2. Market data normalization (Bloomberg, Reuters)
// 3. FIX version bridging (4.2 → 5.0)
// 4. Legacy system migration
// 5. Testing with exchange simulators

// Pattern: Adapter per environment
@Configuration
class MarketDataConfig {
    @Bean
    @Profile("production")
    MarketDataFeed bloombergFeed() {
        return new BloombergFeedAdapter(
            new BloombergTerminal()
        );
    }

    @Bean
    @Profile("uat")
    MarketDataFeed reutersFeed() {
        return new ReutersFeedAdapter(
            new ReutersElektra()
        );
    }

    @Bean
    @Profile("test")
    MarketDataFeed replayFeed() {
        // Adapter over historical data for backtesting
        return new HistoricalReplayAdapter(
            new TickDatabase("2024-01-15")
        );
    }
}

// PITFALLS:
// ✗ Don't put order validation in adapters
// ✗ Don't let FIX tags leak into domain objects
// ✗ Avoid adapter chains (adapter wrapping adapter)
// ✗ Keep adapters thin — translate only
// ✓ One adapter per venue/vendor
// ✓ Unit test adapters with recorded messages
// ✓ Log raw + translated for reconciliation`
        }
      ]
    },
    {
      id: 'facade',
      name: 'Facade',
      icon: '🎭',
      color: '#3b82f6',
      description: 'Provides simplified interface to complex subsystem. Hides complexity. Decouples client from subsystem.',
      diagram: FacadeDiagram,
      details: [
        {
          name: 'Complex Subsystem',
          explanation: 'Subsystem has multiple classes with complex interactions. Each class has its own interface. Client would need to know all classes to use subsystem directly.',
          codeExample: `// Complex subsystem components
class CPU {
    public void freeze() {
        System.out.println("CPU: Freezing processor");
    }
    public void jump(long position) {
        System.out.println("CPU: Jumping to " + position);
    }
    public void execute() {
        System.out.println("CPU: Executing");
    }
}

class Memory {
    public void load(long position, byte[] data) {
        System.out.println("Memory: Loading at " + position);
    }
}

class HardDrive {
    public byte[] read(long lba, int size) {
        System.out.println("HardDrive: Reading " + size + " bytes");
        return new byte[size];
    }
}`
        },
        {
          name: 'Facade Class',
          explanation: 'Facade provides single simplified method. Internally coordinates all subsystem classes. Client only interacts with facade.',
          codeExample: `class ComputerFacade {
    private CPU cpu;
    private Memory memory;
    private HardDrive hardDrive;

    public ComputerFacade() {
        this.cpu = new CPU();
        this.memory = new Memory();
        this.hardDrive = new HardDrive();
    }

    // Simplified method coordinates subsystems
    public void start() {
        System.out.println("Starting computer...");
        cpu.freeze();
        memory.load(0, hardDrive.read(0, 1024));
        cpu.jump(0);
        cpu.execute();
        System.out.println("Computer started!");
    }
}`
        },
        {
          name: 'Benefits & Usage',
          explanation: 'Facade simplifies client code dramatically. Subsystem can still be used directly if needed. Great for library APIs and framework integration.',
          codeExample: `// Without facade - complex
CPU cpu = new CPU();
Memory memory = new Memory();
HardDrive hardDrive = new HardDrive();
cpu.freeze();
memory.load(0, hardDrive.read(0, 1024));
cpu.jump(0);
cpu.execute();

// With facade - simple!
ComputerFacade computer = new ComputerFacade();
computer.start();

// Banking Facade Example
class BankingFacade {
    public void withdraw(String pin, double amount) {
        if (security.validate(pin)) {
            account.debit(amount);
            ledger.updateLedger("Withdrawal: $" + amount);
        }
    }
}`
        }
      ]
    },
    {
      id: 'command',
      name: 'Command',
      icon: '⚡',
      color: '#64748b',
      description: 'Encapsulates request as object. Queue/log requests. Support undo operations. GUI actions, transactions.',
      diagram: CommandDiagram,
      details: [
        {
          name: 'Command Interface & Receiver',
          explanation: 'Command interface declares execute and undo. Receiver contains actual business logic. Commands call receiver methods.',
          codeExample: `interface Command {
    void execute();
    void undo();
}

// Receiver - actual work happens here
class TextEditor {
    private StringBuilder text = new StringBuilder();

    public void write(String content) {
        text.append(content);
        System.out.println("Text: " + text);
    }

    public void deleteLast(int length) {
        int start = text.length() - length;
        if (start >= 0) {
            text.delete(start, text.length());
            System.out.println("Text: " + text);
        }
    }
}`
        },
        {
          name: 'Concrete Commands',
          explanation: 'Each command stores receiver and parameters. Execute calls receiver method. Undo reverses the action. Commands are self-contained.',
          codeExample: `class WriteCommand implements Command {
    private TextEditor editor;
    private String content;

    public WriteCommand(TextEditor editor, String content) {
        this.editor = editor;
        this.content = content;
    }

    @Override
    public void execute() {
        editor.write(content);
    }

    @Override
    public void undo() {
        editor.deleteLast(content.length());
    }
}`
        },
        {
          name: 'Invoker with Undo/Redo',
          explanation: 'Invoker stores command history. Undo pops from history and calls undo. Redo re-executes undone commands. Supports unlimited undo levels.',
          codeExample: `class CommandInvoker {
    private Stack<Command> history = new Stack<>();
    private Stack<Command> redoStack = new Stack<>();

    public void execute(Command command) {
        command.execute();
        history.push(command);
        redoStack.clear();
    }

    public void undo() {
        if (!history.isEmpty()) {
            Command cmd = history.pop();
            cmd.undo();
            redoStack.push(cmd);
        }
    }

    public void redo() {
        if (!redoStack.isEmpty()) {
            Command cmd = redoStack.pop();
            cmd.execute();
            history.push(cmd);
        }
    }
}

// Usage
TextEditor editor = new TextEditor();
CommandInvoker invoker = new CommandInvoker();
invoker.execute(new WriteCommand(editor, "Hello "));
invoker.execute(new WriteCommand(editor, "World!"));
invoker.undo();  // Text: Hello`
        }
      ]
    },
    {
      id: 'proxy',
      name: 'Proxy',
      icon: '🛡️',
      color: '#ef4444',
      description: 'Provides placeholder for another object. Controls access, lazy loading, caching. ORM, security layers.',
      diagram: ProxyDiagram,
      details: [
        {
          name: 'Subject & Real Subject',
          explanation: 'Subject interface defines operations. RealSubject is expensive to create or needs protection. Both proxy and real subject implement same interface.',
          codeExample: `interface Image {
    void display();
}

// Real subject - expensive to create
class RealImage implements Image {
    private String filename;

    public RealImage(String filename) {
        this.filename = filename;
        loadFromDisk();  // Expensive operation
    }

    private void loadFromDisk() {
        System.out.println("Loading image: " + filename);
    }

    @Override
    public void display() {
        System.out.println("Displaying: " + filename);
    }
}`
        },
        {
          name: 'Virtual Proxy (Lazy Loading)',
          explanation: 'Proxy defers creation until needed. First call creates real object, subsequent calls reuse it. Saves resources when object might not be used.',
          codeExample: `class ImageProxy implements Image {
    private String filename;
    private RealImage realImage;

    public ImageProxy(String filename) {
        this.filename = filename;
    }

    @Override
    public void display() {
        // Lazy initialization
        if (realImage == null) {
            realImage = new RealImage(filename);
        }
        realImage.display();
    }
}

// Usage
Image image = new ImageProxy("photo.jpg");
// Image not loaded yet
image.display();  // NOW image loads and displays
image.display();  // Just displays (already loaded)`
        },
        {
          name: 'Protection & Caching Proxy',
          explanation: 'Protection proxy checks access rights. Caching proxy stores results. Same interface hides control logic from client.',
          codeExample: `// Protection Proxy
class ProtectedAccount implements BankAccount {
    private RealBankAccount realAccount;
    private String userRole;

    @Override
    public void withdraw(double amount) {
        if (userRole.equals("OWNER")) {
            realAccount.withdraw(amount);
        } else {
            System.out.println("Access denied");
        }
    }
}

// Caching Proxy
class CachingProxy implements DataService {
    private DatabaseService db = new DatabaseService();
    private Map<String, String> cache = new HashMap<>();

    @Override
    public String getData(String key) {
        if (cache.containsKey(key)) {
            return cache.get(key);  // Return cached
        }
        String data = db.getData(key);  // Fetch & cache
        cache.put(key, data);
        return data;
    }
}`
        }
      ]
    },
    {
      id: 'state',
      name: 'State',
      icon: '🔄',
      color: '#84cc16',
      description: 'Object alters behavior when state changes. Appears to change class. Eliminates conditionals. Workflow engines.',
      diagram: StateDiagram,
      details: [
        {
          name: 'State Interface & Context',
          explanation: 'State interface declares all possible actions. Context holds current state and delegates actions to it. State objects can trigger transitions.',
          codeExample: `interface State {
    void insertCoin(VendingMachine machine);
    void selectProduct(VendingMachine machine);
    void dispense(VendingMachine machine);
}

class VendingMachine {
    private State noCoinState;
    private State hasCoinState;
    private State soldState;
    private State currentState;
    private int count;

    public VendingMachine(int count) {
        this.count = count;
        noCoinState = new NoCoinState();
        hasCoinState = new HasCoinState();
        soldState = new SoldState();
        currentState = noCoinState;
    }

    public void insertCoin() { currentState.insertCoin(this); }
    public void setState(State state) { this.currentState = state; }
    // getters for states...
}`
        },
        {
          name: 'Concrete States',
          explanation: 'Each state handles actions differently. States can change context state. Behavior encapsulated in state classes, not scattered in conditionals.',
          codeExample: `class NoCoinState implements State {
    @Override
    public void insertCoin(VendingMachine m) {
        System.out.println("Coin inserted");
        m.setState(m.getHasCoinState());  // Transition
    }

    @Override
    public void selectProduct(VendingMachine m) {
        System.out.println("Insert coin first");
    }

    @Override
    public void dispense(VendingMachine m) {
        System.out.println("Pay first");
    }
}

class HasCoinState implements State {
    @Override
    public void insertCoin(VendingMachine m) {
        System.out.println("Coin already inserted");
    }

    @Override
    public void selectProduct(VendingMachine m) {
        System.out.println("Product selected");
        m.setState(m.getSoldState());  // Transition
    }
}`
        },
        {
          name: 'Usage Example',
          explanation: 'Machine behavior changes based on internal state. No if-else chains. Adding new states is easy - just add new state class.',
          codeExample: `// Usage
VendingMachine machine = new VendingMachine(2);

machine.insertCoin();    // Coin inserted (NoCoin -> HasCoin)
machine.selectProduct(); // Product selected (HasCoin -> Sold)
machine.dispense();      // Product dispensed (Sold -> NoCoin)

machine.selectProduct(); // Insert coin first (in NoCoin state)
machine.insertCoin();    // Coin inserted
machine.insertCoin();    // Coin already inserted (in HasCoin)

// Benefits:
// - State-specific behavior is localized
// - Easy to add new states
// - Eliminates large switch/if statements
// - State transitions are explicit`
        }
      ]
    },
    {
      id: 'abstract-factory',
      name: 'Abstract Factory',
      icon: '�icing',
      color: '#0ea5e9',
      description: 'Creates families of related objects without specifying concrete classes. Platform-independent UI toolkits.',
      diagram: AbstractFactoryDiagram,
      details: [
        {
          name: 'Abstract Factory Interface',
          explanation: 'Declares creation methods for each product type in the family. Each concrete factory implements these methods to create products for a specific variant (e.g., Windows vs Mac).',
          codeExample: `// Abstract Factory interface
interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
    Menu createMenu();
}

// Abstract Products
interface Button {
    void render();
    void onClick(Runnable handler);
}

interface Checkbox {
    void render();
    boolean isChecked();
}`
        },
        {
          name: 'Concrete Factories',
          explanation: 'Each factory creates products of a single variant. All products from one factory are compatible with each other. Adding a new product family requires a new factory.',
          codeExample: `// Windows Factory
class WindowsFactory implements GUIFactory {
    public Button createButton() {
        return new WindowsButton();
    }
    public Checkbox createCheckbox() {
        return new WindowsCheckbox();
    }
    public Menu createMenu() {
        return new WindowsMenu();
    }
}

// Mac Factory
class MacFactory implements GUIFactory {
    public Button createButton() {
        return new MacButton();
    }
    public Checkbox createCheckbox() {
        return new MacCheckbox();
    }
    public Menu createMenu() {
        return new MacMenu();
    }
}`
        },
        {
          name: 'Usage & Benefits',
          explanation: 'Client code works with factories and products through abstract interfaces. Switch entire product families by changing factory. Ensures product compatibility.',
          codeExample: `// Client code - works with any factory
class Application {
    private GUIFactory factory;
    private Button button;
    private Checkbox checkbox;

    public Application(GUIFactory factory) {
        this.factory = factory;
    }

    public void createUI() {
        button = factory.createButton();
        checkbox = factory.createCheckbox();
    }

    public void render() {
        button.render();
        checkbox.render();
    }
}

// Usage - switch UI by changing factory
GUIFactory factory = isWindows()
    ? new WindowsFactory()
    : new MacFactory();
Application app = new Application(factory);
app.createUI();
app.render();

// JDK Example: DocumentBuilderFactory, TransformerFactory`
        }
      ]
    },
    {
      id: 'prototype',
      name: 'Prototype',
      icon: '🧬',
      color: '#ec4899',
      description: 'Clone existing objects without coupling to their concrete classes. Useful for complex object creation.',
      diagram: PrototypeDiagram,
      details: [
        {
          name: 'Prototype Interface',
          explanation: 'Declares clone method. Concrete classes implement cloning logic. Supports shallow and deep copies depending on requirements.',
          codeExample: `// Prototype interface
interface Prototype<T> {
    T clone();
}

// Or use Java's Cloneable
class Shape implements Cloneable {
    protected String color;
    protected int x, y;

    public Shape(Shape source) {
        this.color = source.color;
        this.x = source.x;
        this.y = source.y;
    }

    @Override
    public Shape clone() {
        return new Shape(this);
    }
}`
        },
        {
          name: 'Concrete Prototypes',
          explanation: 'Each subclass implements clone() to copy its specific fields. Deep copy nested objects to avoid shared references. Copy constructors often used internally.',
          codeExample: `class Circle extends Shape {
    private int radius;

    public Circle(Circle source) {
        super(source);
        this.radius = source.radius;
    }

    @Override
    public Circle clone() {
        return new Circle(this);
    }
}

class Rectangle extends Shape {
    private int width, height;

    public Rectangle(Rectangle source) {
        super(source);
        this.width = source.width;
        this.height = source.height;
    }

    @Override
    public Rectangle clone() {
        return new Rectangle(this);
    }
}`
        },
        {
          name: 'Prototype Registry',
          explanation: 'Store pre-built prototypes for common configurations. Clone and customize as needed. Reduces object creation complexity.',
          codeExample: `class ShapeCache {
    private static Map<String, Shape> cache = new HashMap<>();

    static {
        // Pre-populate with prototypes
        Circle redCircle = new Circle();
        redCircle.setColor("red");
        redCircle.setRadius(10);
        cache.put("red-circle", redCircle);

        Rectangle blueRect = new Rectangle();
        blueRect.setColor("blue");
        blueRect.setWidth(100);
        cache.put("blue-rect", blueRect);
    }

    public static Shape getShape(String id) {
        return cache.get(id).clone();
    }
}

// Usage
Shape circle1 = ShapeCache.getShape("red-circle");
Shape circle2 = ShapeCache.getShape("red-circle");
// circle1 != circle2 (different objects, same data)

// JDK Examples:
Object.clone(), Arrays.copyOf(),
Collections copy constructors`
        }
      ]
    },
    {
      id: 'composite',
      name: 'Composite',
      icon: '🌳',
      color: '#8b5cf6',
      description: 'Compose objects into tree structures. Treat individual objects and compositions uniformly.',
      diagram: CompositeDiagram,
      details: [
        {
          name: 'Component Interface',
          explanation: 'Common interface for both leaf and composite objects. Declares operations that make sense for both simple and complex elements.',
          codeExample: `// Component interface
interface FileSystemItem {
    String getName();
    long getSize();
    void print(String indent);
}

// Leaf - simple element
class File implements FileSystemItem {
    private String name;
    private long size;

    public File(String name, long size) {
        this.name = name;
        this.size = size;
    }

    public String getName() { return name; }
    public long getSize() { return size; }

    public void print(String indent) {
        System.out.println(indent + "File: " + name + " (" + size + " bytes)");
    }
}`
        },
        {
          name: 'Composite Class',
          explanation: 'Container that holds child components. Implements operations by delegating to children. Can contain both leaves and other composites.',
          codeExample: `// Composite - container element
class Directory implements FileSystemItem {
    private String name;
    private List<FileSystemItem> children = new ArrayList<>();

    public Directory(String name) {
        this.name = name;
    }

    public void add(FileSystemItem item) {
        children.add(item);
    }

    public void remove(FileSystemItem item) {
        children.remove(item);
    }

    public String getName() { return name; }

    public long getSize() {
        // Aggregate size from all children
        return children.stream()
            .mapToLong(FileSystemItem::getSize)
            .sum();
    }

    public void print(String indent) {
        System.out.println(indent + "Dir: " + name + "/");
        for (FileSystemItem child : children) {
            child.print(indent + "  ");
        }
    }
}`
        },
        {
          name: 'Usage Example',
          explanation: 'Build tree structures naturally. Client code treats all elements uniformly through component interface. Great for hierarchical data.',
          codeExample: `// Build file system tree
Directory root = new Directory("root");
Directory docs = new Directory("documents");
Directory pics = new Directory("pictures");

docs.add(new File("resume.pdf", 50000));
docs.add(new File("notes.txt", 1200));

pics.add(new File("photo1.jpg", 250000));
pics.add(new File("photo2.png", 180000));

root.add(docs);
root.add(pics);
root.add(new File("readme.md", 500));

// Uniform operations on tree
root.print("");
// Dir: root/
//   Dir: documents/
//     File: resume.pdf (50000 bytes)
//     File: notes.txt (1200 bytes)
//   Dir: pictures/
//     File: photo1.jpg (250000 bytes)
//     File: photo2.png (180000 bytes)
//   File: readme.md (500 bytes)

System.out.println("Total: " + root.getSize() + " bytes");
// Total: 481700 bytes

// JDK Examples: java.awt.Container, javax.swing.JComponent`
        }
      ]
    },
    {
      id: 'template-method',
      name: 'Template Method',
      icon: '📋',
      color: '#f97316',
      description: 'Define algorithm skeleton in base class, let subclasses override specific steps without changing structure.',
      diagram: TemplateMethodDiagram,
      details: [
        {
          name: 'Abstract Template Class',
          explanation: 'Template method defines algorithm structure and is typically final to prevent overriding. Calls abstract primitive operations that subclasses must implement.',
          codeExample: `abstract class DataProcessor {
    // Template method - defines algorithm skeleton
    public final void process() {
        readData();
        processData();
        writeResults();
        cleanup();  // Optional hook
    }

    // Abstract steps - subclasses MUST implement
    protected abstract void readData();
    protected abstract void processData();
    protected abstract void writeResults();

    // Hook - optional override, default implementation
    protected void cleanup() {
        // Default: do nothing
    }
}`
        },
        {
          name: 'Concrete Implementations',
          explanation: 'Subclasses implement abstract steps for specific data formats. Algorithm structure stays the same, only step implementations vary.',
          codeExample: `class CSVProcessor extends DataProcessor {
    private List<String[]> data;
    private List<String[]> results;

    @Override
    protected void readData() {
        data = CSVReader.read("input.csv");
        System.out.println("Read " + data.size() + " CSV rows");
    }

    @Override
    protected void processData() {
        results = data.stream()
            .filter(row -> row[0].startsWith("A"))
            .collect(Collectors.toList());
    }

    @Override
    protected void writeResults() {
        CSVWriter.write("output.csv", results);
    }
}

class JSONProcessor extends DataProcessor {
    private JsonArray data;
    private JsonArray results;

    @Override
    protected void readData() {
        data = JsonParser.parse("input.json");
    }

    @Override
    protected void processData() {
        results = transform(data);
    }

    @Override
    protected void writeResults() {
        JsonWriter.write("output.json", results);
    }

    @Override
    protected void cleanup() {
        // Override hook for JSON-specific cleanup
        System.out.println("Clearing JSON cache...");
    }
}`
        },
        {
          name: 'Usage & Benefits',
          explanation: 'Eliminates code duplication by extracting common algorithm to base class. Subclasses customize only what varies. Hook methods provide optional extension points.',
          codeExample: `// Usage
DataProcessor csvProc = new CSVProcessor();
csvProc.process();  // Uses CSV implementations

DataProcessor jsonProc = new JSONProcessor();
jsonProc.process();  // Uses JSON implementations

// Both follow same algorithm:
// 1. readData()
// 2. processData()
// 3. writeResults()
// 4. cleanup()

// Benefits:
// - Code reuse in base class
// - Easy to add new variants
// - Enforces algorithm structure
// - Hooks for optional customization

// JDK Examples:
// - java.io.InputStream.read()
// - java.util.AbstractList.get()
// - javax.servlet.http.HttpServlet.service()`
        }
      ]
    },
    {
      id: 'iterator',
      name: 'Iterator',
      icon: '🔄',
      color: '#06b6d4',
      description: 'Access elements of a collection sequentially without exposing its underlying representation.',
      diagram: IteratorDiagram,
      details: [
        {
          name: 'Iterator Interface',
          explanation: 'Declares traversal operations: hasNext() checks for more elements, next() returns current and advances. May include remove() for modification during iteration.',
          codeExample: `// Custom Iterator interface
interface Iterator<T> {
    boolean hasNext();
    T next();
    void remove();  // Optional
}

// Collection interface
interface IterableCollection<T> {
    Iterator<T> createIterator();
    int size();
}`
        },
        {
          name: 'Concrete Iterator',
          explanation: 'Implements traversal algorithm for specific collection. Maintains current position. Multiple iterators can traverse same collection independently.',
          codeExample: `class TreeNode<T> {
    T value;
    TreeNode<T> left, right;
}

// In-order iterator for binary tree
class InOrderIterator<T> implements Iterator<T> {
    private Stack<TreeNode<T>> stack = new Stack<>();

    public InOrderIterator(TreeNode<T> root) {
        pushLeftBranch(root);
    }

    private void pushLeftBranch(TreeNode<T> node) {
        while (node != null) {
            stack.push(node);
            node = node.left;
        }
    }

    @Override
    public boolean hasNext() {
        return !stack.isEmpty();
    }

    @Override
    public T next() {
        TreeNode<T> node = stack.pop();
        if (node.right != null) {
            pushLeftBranch(node.right);
        }
        return node.value;
    }
}

// Can also create PreOrderIterator, PostOrderIterator, etc.`
        },
        {
          name: 'Usage & Benefits',
          explanation: 'Client code uses same interface for any collection type. Can iterate different structures uniformly. Java enhanced for-loop uses Iterator internally.',
          codeExample: `// Java's built-in Iterator usage
List<String> list = Arrays.asList("A", "B", "C");
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String item = it.next();
    System.out.println(item);
}

// Enhanced for-loop (uses Iterator internally)
for (String item : list) {
    System.out.println(item);
}

// Custom tree iteration
BinaryTree<Integer> tree = new BinaryTree<>();
tree.insert(5, 3, 7, 1, 4);

Iterator<Integer> inOrder = tree.createInOrderIterator();
while (inOrder.hasNext()) {
    System.out.print(inOrder.next() + " ");  // 1 3 4 5 7
}

// JDK Examples:
// - java.util.Iterator
// - java.util.Scanner
// - java.util.Enumeration
// - java.sql.ResultSet`
        }
      ]
    },
    {
      id: 'chain-of-responsibility',
      name: 'Chain of Responsibility',
      icon: '⛓️',
      color: '#22c55e',
      description: 'Pass requests along a chain of handlers. Each handler decides to process or pass to next handler.',
      diagram: ChainOfResponsibilityDiagram,
      details: [
        {
          name: 'Handler Interface',
          explanation: 'Declares method for handling requests and setting next handler. Base handler class often provides default chaining logic.',
          codeExample: `// Handler interface
interface Handler {
    void setNext(Handler next);
    void handle(Request request);
}

// Base handler with chaining logic
abstract class BaseHandler implements Handler {
    protected Handler next;

    @Override
    public void setNext(Handler next) {
        this.next = next;
    }

    protected void passToNext(Request request) {
        if (next != null) {
            next.handle(request);
        }
    }
}`
        },
        {
          name: 'Concrete Handlers',
          explanation: 'Each handler checks if it can process the request. If yes, handles it (may stop chain). If no, passes to next handler.',
          codeExample: `class AuthenticationHandler extends BaseHandler {
    @Override
    public void handle(Request request) {
        if (!request.hasValidToken()) {
            throw new UnauthorizedException("Invalid token");
        }
        System.out.println("Auth passed");
        passToNext(request);
    }
}

class AuthorizationHandler extends BaseHandler {
    @Override
    public void handle(Request request) {
        if (!request.hasPermission()) {
            throw new ForbiddenException("No permission");
        }
        System.out.println("Authz passed");
        passToNext(request);
    }
}

class ValidationHandler extends BaseHandler {
    @Override
    public void handle(Request request) {
        if (!request.isValid()) {
            throw new BadRequestException("Invalid data");
        }
        System.out.println("Validation passed");
        passToNext(request);
    }
}

class BusinessLogicHandler extends BaseHandler {
    @Override
    public void handle(Request request) {
        System.out.println("Processing business logic...");
        // Actually process the request
    }
}`
        },
        {
          name: 'Chain Assembly & Usage',
          explanation: 'Build chain by linking handlers. Order matters - auth before authz before validation. Each request flows through entire chain.',
          codeExample: `// Build the chain
Handler auth = new AuthenticationHandler();
Handler authz = new AuthorizationHandler();
Handler validation = new ValidationHandler();
Handler business = new BusinessLogicHandler();

auth.setNext(authz);
authz.setNext(validation);
validation.setNext(business);

// Use the chain
Request request = new Request(token, data);
auth.handle(request);
// Output:
// Auth passed
// Authz passed
// Validation passed
// Processing business logic...

// Real-world examples:
// - Servlet Filters
// - Spring Security filter chain
// - Logging frameworks
// - Event bubbling in UI

// JDK Example: java.util.logging.Logger (parent chain)`
        }
      ]
    },
    {
      id: 'memento',
      name: 'Memento',
      icon: '💾',
      color: '#ef4444',
      description: 'Capture and restore object state without exposing internal structure. Enables undo/redo functionality.',
      diagram: MementoDiagram,
      details: [
        {
          name: 'Memento & Originator',
          explanation: 'Originator creates mementos containing snapshots of its state. Memento is opaque to other objects - only originator can read its contents.',
          codeExample: `// Memento - stores state snapshot
class EditorMemento {
    private final String content;
    private final int cursorPosition;
    private final String[] selection;

    EditorMemento(String content, int cursor, String[] selection) {
        this.content = content;
        this.cursorPosition = cursor;
        this.selection = selection.clone();
    }

    // Package-private getters - only Originator accesses
    String getContent() { return content; }
    int getCursorPosition() { return cursorPosition; }
    String[] getSelection() { return selection.clone(); }
}

// Originator - creates and restores from mementos
class TextEditor {
    private String content = "";
    private int cursorPosition = 0;
    private String[] selection = {};

    public void type(String text) {
        content = content.substring(0, cursorPosition)
                + text
                + content.substring(cursorPosition);
        cursorPosition += text.length();
    }

    public EditorMemento save() {
        return new EditorMemento(content, cursorPosition, selection);
    }

    public void restore(EditorMemento memento) {
        content = memento.getContent();
        cursorPosition = memento.getCursorPosition();
        selection = memento.getSelection();
    }
}`
        },
        {
          name: 'Caretaker',
          explanation: 'Stores mementos but never examines their contents. Manages history for undo/redo. Can limit history size to save memory.',
          codeExample: `class History {
    private Deque<EditorMemento> undoStack = new ArrayDeque<>();
    private Deque<EditorMemento> redoStack = new ArrayDeque<>();
    private static final int MAX_HISTORY = 50;

    public void save(EditorMemento memento) {
        undoStack.push(memento);
        redoStack.clear();  // New action clears redo

        // Limit history size
        if (undoStack.size() > MAX_HISTORY) {
            undoStack.removeLast();
        }
    }

    public EditorMemento undo() {
        if (undoStack.isEmpty()) return null;
        EditorMemento memento = undoStack.pop();
        redoStack.push(memento);
        return undoStack.isEmpty() ? null : undoStack.peek();
    }

    public EditorMemento redo() {
        if (redoStack.isEmpty()) return null;
        EditorMemento memento = redoStack.pop();
        undoStack.push(memento);
        return memento;
    }

    public boolean canUndo() { return !undoStack.isEmpty(); }
    public boolean canRedo() { return !redoStack.isEmpty(); }
}`
        },
        {
          name: 'Complete Usage',
          explanation: 'Combine all three roles for full undo/redo support. Save state before changes. Restore previous state on undo.',
          codeExample: `class EditorApplication {
    private TextEditor editor = new TextEditor();
    private History history = new History();

    public void type(String text) {
        history.save(editor.save());  // Save before change
        editor.type(text);
    }

    public void undo() {
        EditorMemento memento = history.undo();
        if (memento != null) {
            editor.restore(memento);
        }
    }

    public void redo() {
        EditorMemento memento = history.redo();
        if (memento != null) {
            editor.restore(memento);
        }
    }
}

// Usage
EditorApplication app = new EditorApplication();
app.type("Hello");
app.type(" World");
System.out.println(editor.getContent());  // "Hello World"

app.undo();
System.out.println(editor.getContent());  // "Hello"

app.redo();
System.out.println(editor.getContent());  // "Hello World"

// JDK Example: java.io.Serializable (serialize state)`
        }
      ]
    }
  ]

  // =============================================================================
  // NAVIGATION HANDLERS
  // =============================================================================

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  const handlePreviousConcept = () => {
    if (selectedConceptIndex > 0) {
      setSelectedConceptIndex(selectedConceptIndex - 1)
      setSelectedDetailIndex(0)
    }
  }

  const handleNextConcept = () => {
    if (selectedConceptIndex < concepts.length - 1) {
      setSelectedConceptIndex(selectedConceptIndex + 1)
      setSelectedDetailIndex(0)
    }
  }

  // =============================================================================
  // KEYBOARD NAVIGATION
  // =============================================================================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (selectedConcept) {
          setSelectedConceptIndex(null)
        } else {
          onBack()
        }
      } else if (e.key === 'ArrowLeft' && selectedConceptIndex !== null) {
        e.preventDefault()
        handlePreviousConcept()
      } else if (e.key === 'ArrowRight' && selectedConceptIndex !== null) {
        e.preventDefault()
        handleNextConcept()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

  // =============================================================================
  // STYLES
  // =============================================================================

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #312e81 50%, #0f172a 100%)',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }

  const headerStyle = {
    maxWidth: '1400px',
    margin: '0 auto 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  }

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #a855f7, #c084fc)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(168, 85, 247, 0.2)',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    borderRadius: '0.5rem',
    color: '#c084fc',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Design Patterns</h1>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {onPrevious && (
            <button
              style={{ ...backButtonStyle, background: 'rgba(139, 92, 246, 0.2)', borderColor: 'rgba(139, 92, 246, 0.3)' }}
              onClick={onPrevious}
            >
              ← {previousName}
            </button>
          )}
          <button
            style={backButtonStyle}
            onClick={onBack}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(168, 85, 247, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            ← Back to Design
          </button>
          {onNext && (
            <button
              style={{ ...backButtonStyle, background: 'rgba(139, 92, 246, 0.2)', borderColor: 'rgba(139, 92, 246, 0.3)' }}
              onClick={onNext}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />
      </div>

      {/* Collapsible Sidebar for quick concept navigation */}
      <CollapsibleSidebar
        items={concepts}
        selectedIndex={selectedConceptIndex ?? -1}
        onSelect={(index) => {
          setSelectedConceptIndex(index)
          setSelectedDetailIndex(0)
        }}
        title="Concepts"
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.icon}
        primaryColor={DESIGN_COLORS.primary}
      />


      {/* Intro */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 2rem',
        padding: '1.5rem 2rem',
        background: 'rgba(168, 85, 247, 0.1)',
        borderRadius: '1rem',
        border: '1px solid rgba(168, 85, 247, 0.3)'
      }}>
        <p style={{ color: '#94a3b8', lineHeight: '1.8', margin: 0, textAlign: 'center', fontSize: '1.1rem' }}>
          Design patterns are reusable solutions to common software design problems. They represent best practices
          and provide a shared vocabulary for developers to communicate architectural decisions effectively.
        </p>
      </div>

      {/* Concept Cards Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem'
      }}>
        {concepts.map((concept, index) => (
          <div
            key={concept.id}
            onClick={() => setSelectedConceptIndex(index)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: `1px solid ${concept.color}40`,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = `0 20px 40px ${concept.color}20`
              e.currentTarget.style.borderColor = concept.color
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.borderColor = `${concept.color}40`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{concept.icon}</span>
              <h3 style={{ color: concept.color, margin: 0, fontSize: '1.25rem' }}>{concept.name}</h3>
            </div>
            {PATTERN_CATEGORY[concept.id] && (
              <span style={{
                display: 'inline-block',
                marginBottom: '0.75rem',
                padding: '0.15rem 0.6rem',
                borderRadius: '999px',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                color: CATEGORY_COLOR[PATTERN_CATEGORY[concept.id]],
                background: `${CATEGORY_COLOR[PATTERN_CATEGORY[concept.id]]}1a`,
                border: `1px solid ${CATEGORY_COLOR[PATTERN_CATEGORY[concept.id]]}55`
              }}>
                {PATTERN_CATEGORY[concept.id]}
              </span>
            )}
            <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>{concept.description}</p>
            <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
              {withExtraTabs(concept).length} topics - Click to explore
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedConcept && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => setSelectedConceptIndex(null)}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              borderRadius: '1rem',
              padding: '2rem',
              width: '95vw', maxWidth: '1400px', height: '90vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #334155'
            }}>
              <h2 style={{
                color: selectedConcept.color,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.5rem'
              }}>
                <span style={{ fontSize: '2rem' }}>{selectedConcept.icon}</span>
                {selectedConcept.name}
                {PATTERN_CATEGORY[selectedConcept.id] && (
                  <span style={{
                    padding: '0.15rem 0.6rem',
                    borderRadius: '999px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: CATEGORY_COLOR[PATTERN_CATEGORY[selectedConcept.id]],
                    background: `${CATEGORY_COLOR[PATTERN_CATEGORY[selectedConcept.id]]}1a`,
                    border: `1px solid ${CATEGORY_COLOR[PATTERN_CATEGORY[selectedConcept.id]]}55`
                  }}>
                    {PATTERN_CATEGORY[selectedConcept.id]}
                  </span>
                )}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button
                  onClick={handlePreviousConcept}
                  disabled={selectedConceptIndex === 0}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >←</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>
                  {selectedConceptIndex + 1}/{concepts.length}
                </span>
                <button
                  onClick={handleNextConcept}
                  disabled={selectedConceptIndex === concepts.length - 1}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >→</button>
                <button
                  onClick={() => setSelectedConceptIndex(null)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '0.375rem',
                    color: '#f87171',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    marginLeft: '0.5rem'
                  }}
                >✕</button>
              </div>
            </div>

            {/* Detail Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {withExtraTabs(selectedConcept).map((detail, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDetailIndex(i)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)',
                    border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`,
                    borderRadius: '0.5rem',
                    color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: selectedDetailIndex === i ? '600' : '400',
                    transition: 'all 0.2s'
                  }}
                >
                  {detail.name}
                </button>
              ))}
            </div>

            {/* Selected Detail Content */}
            {(() => {
              const detail = withExtraTabs(selectedConcept)[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = selectedConcept.diagram
              return (
                <div>
                  {/* Diagram */}
                  {DiagramComponent && (
                    <div style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      border: '1px solid #334155'
                    }}>
                      <HoverZoomDiagram>
                        <DiagramComponent />
                      </HoverZoomDiagram>
                    </div>
                  )}

                  {/* Detail Name */}
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                    {detail.name}
                  </h3>

                  {/* Explanation */}
                  <p style={{
                    color: '#e2e8f0',
                    lineHeight: '1.8',
                    marginBottom: '1rem',
                    background: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'left'
                  }}>
                    {detail.explanation}
                  </p>

                  {/* Code Example */}
                  {detail.codeExample && (
                    <SyntaxHighlighter
                      language="java"
                      style={vscDarkPlus}
                      customStyle={{
                        padding: '1rem',
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.8rem',
                        border: '1px solid #334155',
                        background: '#0f172a'
                      }}
                      codeTagProps={{ style: { background: 'transparent' } }}
                    >
                      {detail.codeExample}
                    </SyntaxHighlighter>
                  )}
                </div>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}

export default DesignPatterns

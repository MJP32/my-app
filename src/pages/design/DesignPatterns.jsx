import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

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

// =============================================================================
// MAIN COMPONENT
// =============================================================================

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
          explanation: 'Strategy interface declares method common to all algorithms. Each concrete strategy implements the algorithm differently. Context uses strategy via interface.',
          codeExample: `interface PaymentStrategy {
    void pay(double amount);
}

class CreditCardStrategy implements PaymentStrategy {
    private String cardNumber;

    public CreditCardStrategy(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    @Override
    public void pay(double amount) {
        System.out.println("Paid $" + amount + " via Credit Card " +
            cardNumber.substring(cardNumber.length() - 4));
    }
}

class PayPalStrategy implements PaymentStrategy {
    private String email;

    @Override
    public void pay(double amount) {
        System.out.println("Paid $" + amount + " via PayPal: " + email);
    }
}`
        },
        {
          name: 'Context Class',
          explanation: 'Context holds reference to strategy and delegates work to it. Strategy can be changed at runtime. Context knows nothing about concrete strategies.',
          codeExample: `class ShoppingCart {
    private List<String> items = new ArrayList<>();
    private double total = 0;
    private PaymentStrategy paymentStrategy;

    public void addItem(String item, double price) {
        items.add(item);
        total += price;
    }

    public void setPaymentStrategy(PaymentStrategy strategy) {
        this.paymentStrategy = strategy;
    }

    public void checkout() {
        if (paymentStrategy == null) {
            System.out.println("Please select a payment method");
            return;
        }
        System.out.println("Items: " + items);
        paymentStrategy.pay(total);
    }
}`
        },
        {
          name: 'Runtime Switching',
          explanation: 'Strategies can be swapped at runtime. No need to modify context code to add new strategies. Open/Closed Principle in action.',
          codeExample: `// Usage - switch strategies at runtime
ShoppingCart cart = new ShoppingCart();
cart.addItem("Laptop", 1200.0);
cart.addItem("Mouse", 25.0);

// Pay with credit card
cart.setPaymentStrategy(new CreditCardStrategy("1234-5678-9012-3456"));
cart.checkout();
// Items: [Laptop, Mouse]
// Paid $1225.0 via Credit Card 3456

// Change to PayPal
cart.setPaymentStrategy(new PayPalStrategy("user@example.com"));
cart.checkout();
// Paid $1225.0 via PayPal: user@example.com

// Sorting example: Arrays.sort() with Comparator is Strategy pattern`
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
          explanation: 'Target is the interface client expects. Adaptee has incompatible interface but useful functionality. Adapter bridges the gap between them.',
          codeExample: `// Target interface - what client expects
interface MediaPlayer {
    void play(String audioType, String fileName);
}

// Adaptee - existing but incompatible interface
class AdvancedMediaPlayer {
    public void playMp4(String fileName) {
        System.out.println("Playing mp4: " + fileName);
    }

    public void playVlc(String fileName) {
        System.out.println("Playing vlc: " + fileName);
    }
}`
        },
        {
          name: 'Adapter Implementation',
          explanation: 'Adapter implements target interface and wraps adaptee. Translates calls from target interface to adaptee methods. Object adapter uses composition.',
          codeExample: `class MediaAdapter implements MediaPlayer {
    private AdvancedMediaPlayer advancedPlayer;

    public MediaAdapter() {
        advancedPlayer = new AdvancedMediaPlayer();
    }

    @Override
    public void play(String audioType, String fileName) {
        if (audioType.equalsIgnoreCase("mp4")) {
            advancedPlayer.playMp4(fileName);
        } else if (audioType.equalsIgnoreCase("vlc")) {
            advancedPlayer.playVlc(fileName);
        }
    }
}`
        },
        {
          name: 'Usage & JDK Examples',
          explanation: 'Client uses adapter through target interface. Adapter delegates to adaptee. JDK uses adapters extensively for compatibility.',
          codeExample: `class AudioPlayer implements MediaPlayer {
    private MediaAdapter adapter;

    @Override
    public void play(String audioType, String fileName) {
        if (audioType.equalsIgnoreCase("mp3")) {
            System.out.println("Playing mp3: " + fileName);
        } else if (audioType.equals("mp4") || audioType.equals("vlc")) {
            adapter = new MediaAdapter();
            adapter.play(audioType, fileName);
        }
    }
}

// JDK Examples:
// InputStreamReader adapts InputStream to Reader
InputStreamReader reader = new InputStreamReader(System.in);

// Arrays.asList() adapts array to List
List<String> list = Arrays.asList("one", "two", "three");`
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
        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu} />
      </div>

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
            <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>{concept.description}</p>
            <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
              {concept.details.length} topics - Click to explore
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
              {selectedConcept.details.map((detail, i) => (
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
              const detail = selectedConcept.details[selectedDetailIndex]
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
                      <DiagramComponent />
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

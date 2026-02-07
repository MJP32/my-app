/**
 * Design Patterns Interactive Page
 *
 * Converted to tab_template format with concept cards and modal details.
 * Covers Creational, Behavioral patterns: Singleton, Factory, Observer, Strategy
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const TOPIC_COLORS = {
  primary: '#8b5cf6',
  primaryHover: '#a78bfa',
  bg: 'rgba(139, 92, 246, 0.1)',
  border: 'rgba(139, 92, 246, 0.3)',
  arrow: '#8b5cf6',
  hoverBg: 'rgba(139, 92, 246, 0.2)',
  topicBg: 'rgba(139, 92, 246, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

// Singleton Pattern Diagram
const SingletonPatternDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="singletonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="clientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowSingleton" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
      </marker>
    </defs>
    <rect x="30" y="30" width="100" height="50" rx="8" fill="url(#clientGrad)" />
    <text x="80" y="60" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">Client 1</text>
    <rect x="30" y="100" width="100" height="50" rx="8" fill="url(#clientGrad)" />
    <text x="80" y="130" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">Client 2</text>
    <rect x="280" y="50" width="140" height="70" rx="10" fill="url(#singletonGrad)" stroke="#7c3aed" strokeWidth="2" />
    <text x="350" y="80" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">getInstance()</text>
    <text x="350" y="100" fontSize="10" fill="white" opacity="0.8" textAnchor="middle">Thread-Safe</text>
    <rect x="500" y="40" width="160" height="90" rx="10" fill="#fbbf24" stroke="#f59e0b" strokeWidth="3" />
    <text x="580" y="70" fontSize="14" fontWeight="bold" fill="#78350f" textAnchor="middle">Single Instance</text>
    <text x="580" y="90" fontSize="11" fill="#78350f" textAnchor="middle">DatabaseConnection</text>
    <text x="580" y="110" fontSize="10" fill="#78350f" opacity="0.8" textAnchor="middle">(Only One Exists)</text>
    <line x1="130" y1="55" x2="280" y2="75" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowSingleton)" />
    <line x1="130" y1="125" x2="280" y2="95" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowSingleton)" />
    <line x1="420" y1="85" x2="500" y2="85" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowSingleton)" />
  </svg>
)

// Double-Checked Locking Diagram
const DoubleCheckedLockingDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto' }}>
    <defs>
      <marker id="arrowDCL" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Double-Checked Locking Flow
    </text>
    <rect x="50" y="50" width="140" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="120" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">First Check</text>
    <text x="120" y="95" textAnchor="middle" fill="white" fontSize="9">(No Lock)</text>
    <rect x="250" y="50" width="140" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="320" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Synchronized</text>
    <text x="320" y="95" textAnchor="middle" fill="white" fontSize="9">(Acquire Lock)</text>
    <rect x="450" y="50" width="140" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="520" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Second Check</text>
    <text x="520" y="95" textAnchor="middle" fill="white" fontSize="9">(With Lock)</text>
    <rect x="650" y="50" width="100" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="700" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Create</text>
    <line x1="190" y1="75" x2="245" y2="75" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowDCL)"/>
    <line x1="390" y1="75" x2="445" y2="75" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowDCL)"/>
    <line x1="590" y1="75" x2="645" y2="75" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowDCL)"/>
    <text x="217" y="65" textAnchor="middle" fill="#94a3b8" fontSize="9">null?</text>
    <text x="417" y="65" textAnchor="middle" fill="#94a3b8" fontSize="9">locked</text>
    <text x="617" y="65" textAnchor="middle" fill="#94a3b8" fontSize="9">null?</text>
    <rect x="200" y="140" width="400" height="60" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="165" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="bold">volatile keyword ensures visibility</text>
    <text x="400" y="185" textAnchor="middle" fill="#94a3b8" fontSize="10">Prevents instruction reordering and ensures all threads see the update</text>
  </svg>
)

// Bill Pugh Singleton Diagram
const BillPughDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto' }}>
    <defs>
      <marker id="arrowBP" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Bill Pugh Singleton (Inner Static Class)
    </text>
    <rect x="50" y="50" width="200" height="100" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="150" y="80" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">DatabaseConnection</text>
    <text x="150" y="100" textAnchor="middle" fill="white" fontSize="10">private constructor()</text>
    <text x="150" y="120" textAnchor="middle" fill="white" fontSize="10">getInstance() method</text>
    <rect x="350" y="50" width="200" height="100" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="450" y="80" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">SingletonHelper</text>
    <text x="450" y="100" textAnchor="middle" fill="white" fontSize="10">(Inner Static Class)</text>
    <text x="450" y="120" textAnchor="middle" fill="white" fontSize="10">static final INSTANCE</text>
    <rect x="620" y="65" width="130" height="70" rx="8" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2"/>
    <text x="685" y="95" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="bold">Instance</text>
    <text x="685" y="115" textAnchor="middle" fill="#78350f" fontSize="10">(Created Lazily)</text>
    <line x1="250" y1="100" x2="345" y2="100" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowBP)"/>
    <line x1="550" y1="100" x2="615" y2="100" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowBP)"/>
    <text x="297" y="90" textAnchor="middle" fill="#94a3b8" fontSize="9">accesses</text>
    <text x="582" y="90" textAnchor="middle" fill="#94a3b8" fontSize="9">holds</text>
    <text x="400" y="180" textAnchor="middle" fill="#94a3b8" fontSize="11">Inner class only loaded when getInstance() is called - JVM guarantees thread safety</text>
  </svg>
)

// Enum Singleton Diagram
const EnumSingletonDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Enum Singleton (Most Robust)
    </text>
    <rect x="250" y="50" width="300" height="100" rx="10" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="3"/>
    <text x="400" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">enum DatabaseConnection</text>
    <text x="400" y="105" textAnchor="middle" fill="white" fontSize="11">INSTANCE</text>
    <text x="400" y="125" textAnchor="middle" fill="white" fontSize="10">connect(), query(), close()</text>
    <rect x="50" y="70" width="140" height="40" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="120" y="95" textAnchor="middle" fill="#4ade80" fontSize="10">Reflection Safe</text>
    <rect x="610" y="70" width="140" height="40" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="680" y="95" textAnchor="middle" fill="#4ade80" fontSize="10">Serialization Safe</text>
    <text x="400" y="170" textAnchor="middle" fill="#94a3b8" fontSize="11">JVM guarantees exactly one instance - handles all edge cases automatically</text>
  </svg>
)

// Factory Pattern Diagram
const FactoryPatternDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="factoryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="productGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowFactory" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#6366f1" />
      </marker>
    </defs>
    <rect x="30" y="55" width="120" height="60" rx="8" fill="#3b82f6" />
    <text x="90" y="82" fontSize="12" fontWeight="600" fill="white" textAnchor="middle">Client</text>
    <text x="90" y="98" fontSize="10" fill="white" opacity="0.8" textAnchor="middle">createNotification()</text>
    <rect x="220" y="40" width="160" height="90" rx="12" fill="url(#factoryGrad)" stroke="#d97706" strokeWidth="3" />
    <text x="300" y="70" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Factory</text>
    <text x="300" y="90" fontSize="10" fill="white" opacity="0.9" textAnchor="middle">NotificationFactory</text>
    <text x="300" y="108" fontSize="9" fill="white" opacity="0.7" textAnchor="middle">Encapsulates Creation</text>
    <rect x="480" y="15" width="120" height="40" rx="6" fill="url(#productGrad)" />
    <text x="540" y="40" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">EmailNotification</text>
    <rect x="480" y="65" width="120" height="40" rx="6" fill="url(#productGrad)" />
    <text x="540" y="90" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">SMSNotification</text>
    <rect x="480" y="115" width="120" height="40" rx="6" fill="url(#productGrad)" />
    <text x="540" y="140" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">PushNotification</text>
    <line x1="150" y1="85" x2="220" y2="85" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowFactory)" />
    <line x1="380" y1="65" x2="480" y2="35" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowFactory)" />
    <line x1="380" y1="85" x2="480" y2="85" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowFactory)" />
    <line x1="380" y1="105" x2="480" y2="135" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowFactory)" />
  </svg>
)

// Simple Factory Diagram
const SimpleFactoryDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto' }}>
    <defs>
      <marker id="arrowSF" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Simple Factory Pattern
    </text>
    <rect x="50" y="60" width="150" height="70" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="125" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Client Code</text>
    <text x="125" y="110" textAnchor="middle" fill="white" fontSize="9">Factory.create(type)</text>
    <rect x="280" y="50" width="200" height="90" rx="10" fill="#f59e0b" stroke="#fbbf24" strokeWidth="3"/>
    <text x="380" y="80" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">NotificationFactory</text>
    <text x="380" y="100" textAnchor="middle" fill="white" fontSize="10">static createNotification(type)</text>
    <text x="380" y="118" textAnchor="middle" fill="white" fontSize="9">switch(type) ...</text>
    <rect x="560" y="50" width="180" height="90" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Products</text>
    <text x="650" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">EmailNotification</text>
    <text x="650" y="110" textAnchor="middle" fill="#94a3b8" fontSize="10">SMSNotification</text>
    <text x="650" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">PushNotification</text>
    <line x1="200" y1="95" x2="275" y2="95" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowSF)"/>
    <line x1="480" y1="95" x2="555" y2="95" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowSF)"/>
    <text x="237" y="85" textAnchor="middle" fill="#94a3b8" fontSize="9">request</text>
    <text x="517" y="85" textAnchor="middle" fill="#94a3b8" fontSize="9">returns</text>
    <text x="400" y="175" textAnchor="middle" fill="#94a3b8" fontSize="11">Centralized creation logic - client decoupled from concrete classes</text>
  </svg>
)

// Factory Method Pattern Diagram
const FactoryMethodDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto' }}>
    <defs>
      <marker id="arrowFM" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Factory Method Pattern (GoF)
    </text>
    <rect x="250" y="50" width="300" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Abstract NotificationCreator</text>
    <text x="400" y="95" textAnchor="middle" fill="white" fontSize="10">abstract createNotification()</text>
    <rect x="50" y="150" width="150" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="125" y="180" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">EmailCreator</text>
    <rect x="250" y="150" width="150" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="325" y="180" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">SMSCreator</text>
    <rect x="500" y="150" width="150" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="575" y="180" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">PushCreator</text>
    <line x1="125" y1="150" x2="125" y2="130" stroke="#4ade80" strokeWidth="2"/>
    <line x1="125" y1="130" x2="250" y2="110" stroke="#4ade80" strokeWidth="2"/>
    <line x1="325" y1="150" x2="325" y2="130" stroke="#4ade80" strokeWidth="2"/>
    <line x1="325" y1="130" x2="400" y2="110" stroke="#4ade80" strokeWidth="2"/>
    <line x1="575" y1="150" x2="575" y2="130" stroke="#4ade80" strokeWidth="2"/>
    <line x1="575" y1="130" x2="550" y2="110" stroke="#4ade80" strokeWidth="2"/>
    <text x="400" y="230" textAnchor="middle" fill="#94a3b8" fontSize="11">Subclasses decide which class to instantiate - Open/Closed compliant</text>
  </svg>
)

// Observer Pattern Diagram
const ObserverPatternDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="subjectGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#db2777', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="observerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#0891b2', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowObserver" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
      </marker>
    </defs>
    <rect x="30" y="40" width="150" height="90" rx="10" fill="url(#subjectGrad)" stroke="#db2777" strokeWidth="3" />
    <text x="105" y="70" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Subject</text>
    <text x="105" y="90" fontSize="11" fill="white" opacity="0.9" textAnchor="middle">Stock (AAPL)</text>
    <text x="105" y="110" fontSize="10" fill="white" opacity="0.8" textAnchor="middle">price = $155.00</text>
    <text x="290" y="85" fontSize="12" fontWeight="600" fill="#f59e0b" textAnchor="middle">notify()</text>
    <rect x="420" y="15" width="140" height="40" rx="6" fill="url(#observerGrad)" />
    <text x="490" y="40" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Investor (John)</text>
    <rect x="420" y="65" width="140" height="40" rx="6" fill="url(#observerGrad)" />
    <text x="490" y="90" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Investor (Sarah)</text>
    <rect x="420" y="115" width="140" height="40" rx="6" fill="url(#observerGrad)" />
    <text x="490" y="140" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">Analytics Service</text>
    <line x1="180" y1="60" x2="420" y2="35" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arrowObserver)" />
    <line x1="180" y1="85" x2="420" y2="85" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arrowObserver)" />
    <line x1="180" y1="110" x2="420" y2="135" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arrowObserver)" />
  </svg>
)

// Push vs Pull Model Diagram
const PushPullDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto' }}>
    <defs>
      <marker id="arrowPP" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
      <marker id="arrowPPBack" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Push vs Pull Notification Models
    </text>
    <text x="200" y="55" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Push Model</text>
    <rect x="50" y="70" width="120" height="50" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="110" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Subject</text>
    <rect x="230" y="70" width="120" height="50" rx="6" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="290" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Observer</text>
    <line x1="170" y1="95" x2="225" y2="95" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowPP)"/>
    <text x="197" y="85" textAnchor="middle" fill="#94a3b8" fontSize="9">all data</text>
    <text x="600" y="55" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Pull Model</text>
    <rect x="450" y="70" width="120" height="50" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="510" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Subject</text>
    <rect x="630" y="70" width="120" height="50" rx="6" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="690" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Observer</text>
    <line x1="570" y1="88" x2="625" y2="88" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowPP)"/>
    <line x1="625" y1="102" x2="570" y2="102" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowPPBack)"/>
    <text x="597" y="80" textAnchor="middle" fill="#94a3b8" fontSize="9">notify</text>
    <text x="597" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">query</text>
    <rect x="50" y="145" width="300" height="50" rx="6" fill="rgba(34, 197, 94, 0.15)" stroke="rgba(34, 197, 94, 0.3)" strokeWidth="1"/>
    <text x="200" y="165" textAnchor="middle" fill="#4ade80" fontSize="10">Subject pushes ALL data to observers</text>
    <text x="200" y="180" textAnchor="middle" fill="#94a3b8" fontSize="9">Simple but inflexible</text>
    <rect x="450" y="145" width="300" height="50" rx="6" fill="rgba(245, 158, 11, 0.15)" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1"/>
    <text x="600" y="165" textAnchor="middle" fill="#fbbf24" fontSize="10">Observers PULL needed data from subject</text>
    <text x="600" y="180" textAnchor="middle" fill="#94a3b8" fontSize="9">Flexible but more coupled</text>
  </svg>
)

// Observer Lifecycle Diagram
const ObserverLifecycleDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto' }}>
    <defs>
      <marker id="arrowOL" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Observer Lifecycle
    </text>
    <rect x="50" y="60" width="130" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="115" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">addObserver()</text>
    <rect x="230" y="60" width="130" height="50" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="295" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">State Change</text>
    <rect x="410" y="60" width="130" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="475" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">notifyAll()</text>
    <rect x="590" y="60" width="150" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="665" y="90" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">removeObserver()</text>
    <line x1="180" y1="85" x2="225" y2="85" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowOL)"/>
    <line x1="360" y1="85" x2="405" y2="85" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowOL)"/>
    <line x1="540" y1="85" x2="585" y2="85" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowOL)"/>
    <rect x="150" y="140" width="500" height="40" rx="6" fill="rgba(239, 68, 68, 0.15)" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="1"/>
    <text x="400" y="165" textAnchor="middle" fill="#f87171" fontSize="11">Memory Leak Risk: Always remove observers when no longer needed!</text>
  </svg>
)

// Strategy Pattern Diagram
const StrategyPatternDiagram = () => (
  <svg viewBox="0 0 700 160" style={{ width: '100%', maxWidth: '700px', height: 'auto' }}>
    <defs>
      <linearGradient id="contextGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="strategyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#14b8a6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#0d9488', stopOpacity: 1 }} />
      </linearGradient>
      <marker id="arrowStrategy" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6" />
      </marker>
    </defs>
    <rect x="30" y="50" width="160" height="70" rx="10" fill="url(#contextGrad)" stroke="#4f46e5" strokeWidth="3" />
    <text x="110" y="80" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle">PaymentProcessor</text>
    <text x="110" y="100" fontSize="10" fill="white" opacity="0.8" textAnchor="middle">setStrategy()</text>
    <rect x="270" y="50" width="130" height="70" rx="8" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
    <text x="335" y="75" fontSize="11" fontWeight="bold" fill="#78350f" textAnchor="middle">PaymentStrategy</text>
    <text x="335" y="93" fontSize="10" fill="#78350f" textAnchor="middle">(Interface)</text>
    <text x="335" y="108" fontSize="9" fill="#78350f" opacity="0.8" textAnchor="middle">pay(amount)</text>
    <rect x="480" y="15" width="130" height="35" rx="6" fill="url(#strategyGrad)" />
    <text x="545" y="38" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">CreditCardStrategy</text>
    <rect x="480" y="60" width="130" height="35" rx="6" fill="url(#strategyGrad)" />
    <text x="545" y="83" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">PayPalStrategy</text>
    <rect x="480" y="105" width="130" height="35" rx="6" fill="url(#strategyGrad)" />
    <text x="545" y="128" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">CryptoStrategy</text>
    <line x1="190" y1="85" x2="270" y2="85" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowStrategy)" />
    <line x1="400" y1="65" x2="480" y2="32" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowStrategy)" />
    <line x1="400" y1="85" x2="480" y2="77" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowStrategy)" />
    <line x1="400" y1="105" x2="480" y2="122" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowStrategy)" />
  </svg>
)

// Strategy vs State Diagram
const StrategyVsStateDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Strategy Pattern vs State Pattern
    </text>
    <rect x="50" y="50" width="300" height="140" rx="10" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2"/>
    <text x="200" y="75" textAnchor="middle" fill="#818cf8" fontSize="13" fontWeight="bold">Strategy Pattern</text>
    <text x="200" y="100" textAnchor="middle" fill="#94a3b8" fontSize="10">Client chooses strategy</text>
    <text x="200" y="120" textAnchor="middle" fill="#94a3b8" fontSize="10">Strategies are independent</text>
    <text x="200" y="140" textAnchor="middle" fill="#94a3b8" fontSize="10">Focus: Different algorithms</text>
    <text x="200" y="165" textAnchor="middle" fill="#4ade80" fontSize="10">Example: Payment methods</text>
    <rect x="450" y="50" width="300" height="140" rx="10" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
    <text x="600" y="75" textAnchor="middle" fill="#f472b6" fontSize="13" fontWeight="bold">State Pattern</text>
    <text x="600" y="100" textAnchor="middle" fill="#94a3b8" fontSize="10">Context manages transitions</text>
    <text x="600" y="120" textAnchor="middle" fill="#94a3b8" fontSize="10">States aware of each other</text>
    <text x="600" y="140" textAnchor="middle" fill="#94a3b8" fontSize="10">Focus: State-based behavior</text>
    <text x="600" y="165" textAnchor="middle" fill="#4ade80" fontSize="10">Example: Order status</text>
  </svg>
)

// Runtime Strategy Switch Diagram
const RuntimeStrategySwitchDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto' }}>
    <defs>
      <marker id="arrowRSS" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
      </marker>
    </defs>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Runtime Strategy Switching
    </text>
    <rect x="50" y="50" width="180" height="60" rx="8" fill="#6366f1" stroke="#818cf8" strokeWidth="2"/>
    <text x="140" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">PaymentProcessor</text>
    <text x="140" y="95" textAnchor="middle" fill="white" fontSize="10">setStrategy(strategy)</text>
    <rect x="300" y="50" width="140" height="40" rx="6" fill="#14b8a6" stroke="#2dd4bf" strokeWidth="2"/>
    <text x="370" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">CreditCard</text>
    <rect x="300" y="100" width="140" height="40" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="370" y="125" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">PayPal</text>
    <rect x="520" y="70" width="230" height="60" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="635" y="95" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Switch at runtime!</text>
    <text x="635" y="115" textAnchor="middle" fill="#94a3b8" fontSize="10">No code modification needed</text>
    <line x1="230" y1="75" x2="295" y2="70" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowRSS)"/>
    <line x1="230" y1="85" x2="295" y2="120" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowRSS)"/>
    <line x1="440" y1="95" x2="515" y2="95" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowRSS)"/>
    <text x="400" y="175" textAnchor="middle" fill="#94a3b8" fontSize="11">Client can dynamically change algorithm without modifying context</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function DesignPatternsInteractive({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'singleton',
      name: 'Singleton Pattern',
      icon: '1️⃣',
      color: '#8b5cf6',
      description: 'Ensure only ONE instance of a class exists throughout the application lifecycle. Thread-safe implementations for database connections, loggers, and configuration managers.',
      diagram: SingletonPatternDiagram,
      details: [
        {
          name: 'Double-Checked Locking',
          diagram: DoubleCheckedLockingDiagram,
          explanation: `The most common thread-safe Singleton implementation. It uses two null checks: first without synchronization for performance, then with synchronization to ensure thread safety. The 'volatile' keyword is crucial - it prevents instruction reordering and ensures visibility across threads. Without it, a partially constructed object might be visible to other threads.`,
          codeExample: `public class DatabaseConnection {
    // volatile ensures visibility across threads
    private static volatile DatabaseConnection instance;

    private DatabaseConnection() {
        System.out.println("Creating database connection...");
    }

    public static DatabaseConnection getInstance() {
        if (instance == null) {                    // First check (no lock)
            synchronized (DatabaseConnection.class) {
                if (instance == null) {            // Second check (with lock)
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }

    public void connect() {
        System.out.println("Connected to database");
    }
}`
        },
        {
          name: 'Bill Pugh Singleton',
          diagram: BillPughDiagram,
          explanation: `The best practice Singleton implementation. It leverages the Java class loading mechanism - the inner static class is not loaded until getInstance() is called. The JVM guarantees thread-safe class initialization, so no explicit synchronization is needed. This provides lazy initialization with excellent performance and guaranteed thread safety.`,
          codeExample: `public class DatabaseConnection {
    // Private constructor prevents instantiation
    private DatabaseConnection() {
        System.out.println("Creating database connection...");
    }

    // Inner static helper class - only loaded when accessed
    private static class SingletonHelper {
        // JVM guarantees thread-safe initialization
        private static final DatabaseConnection INSTANCE =
            new DatabaseConnection();
    }

    public static DatabaseConnection getInstance() {
        // Inner class loaded here - lazy initialization!
        return SingletonHelper.INSTANCE;
    }

    public void connect() {
        System.out.println("Connected to database");
    }
}`
        },
        {
          name: 'Enum Singleton',
          diagram: EnumSingletonDiagram,
          explanation: `The most robust Singleton implementation, recommended by Joshua Bloch in "Effective Java". Enums are inherently thread-safe and serialization-safe. They're immune to reflection attacks (JVM prevents instantiating enum values via reflection). The only downside is that it cannot extend other classes, but this is rarely needed.`,
          codeExample: `// The most robust Singleton - recommended by Joshua Bloch
public enum DatabaseConnection {
    INSTANCE;  // The single instance

    // Constructor called once by JVM
    DatabaseConnection() {
        System.out.println("Creating database connection...");
    }

    public void connect() {
        System.out.println("Connected to database");
    }

    public void query(String sql) {
        System.out.println("Executing: " + sql);
    }
}

// Usage:
// DatabaseConnection.INSTANCE.connect();
// DatabaseConnection.INSTANCE.query("SELECT * FROM users");`
        },
        {
          name: 'Protection Techniques',
          diagram: SingletonPatternDiagram,
          explanation: `Class-based Singletons need protection against various attacks: cloning (override clone()), serialization (implement readResolve()), and reflection (check in constructor). Enum Singletons handle all these automatically. Real-world use cases include database connection pools, configuration managers, logger instances, and cache managers.`,
          codeExample: `public class SecureSingleton implements Serializable, Cloneable {
    private static volatile SecureSingleton instance;

    private SecureSingleton() {
        // Prevent reflection attack
        if (instance != null) {
            throw new RuntimeException("Use getInstance()!");
        }
        System.out.println("Creating instance...");
    }

    public static SecureSingleton getInstance() {
        if (instance == null) {
            synchronized (SecureSingleton.class) {
                if (instance == null) {
                    instance = new SecureSingleton();
                }
            }
        }
        return instance;
    }

    // Prevent cloning
    @Override
    protected Object clone() throws CloneNotSupportedException {
        throw new CloneNotSupportedException("Singleton cannot be cloned!");
    }

    // Prevent serialization attack
    protected Object readResolve() {
        return getInstance();
    }
}`
        }
      ]
    },
    {
      id: 'factory',
      name: 'Factory Pattern',
      icon: '🏭',
      color: '#f59e0b',
      description: 'Encapsulate object creation logic to avoid tight coupling with concrete classes. Follows Open/Closed Principle - open for extension, closed for modification.',
      diagram: FactoryPatternDiagram,
      details: [
        {
          name: 'Simple Factory',
          diagram: SimpleFactoryDiagram,
          explanation: `The Simple Factory is the most common implementation. A static method takes a type parameter and returns the appropriate concrete class. The client code is decoupled from concrete classes - it only knows about the interface. The downside is that adding new types requires modifying the factory's switch statement, violating Open/Closed Principle.`,
          codeExample: `// Interface - client depends only on this
interface Notification {
    void send(String message);
}

class EmailNotification implements Notification {
    @Override
    public void send(String message) {
        System.out.println("Email: " + message);
    }
}

class SMSNotification implements Notification {
    @Override
    public void send(String message) {
        System.out.println("SMS: " + message);
    }
}

class PushNotification implements Notification {
    @Override
    public void send(String message) {
        System.out.println("Push: " + message);
    }
}

// Simple Factory - centralized creation
class NotificationFactory {
    public static Notification createNotification(String type) {
        if (type == null || type.isEmpty()) {
            throw new IllegalArgumentException("Type cannot be null");
        }

        switch (type.toUpperCase()) {
            case "EMAIL": return new EmailNotification();
            case "SMS":   return new SMSNotification();
            case "PUSH":  return new PushNotification();
            default:
                throw new IllegalArgumentException("Unknown: " + type);
        }
    }
}

// Usage:
// Notification notif = NotificationFactory.createNotification("EMAIL");
// notif.send("Hello World");`
        },
        {
          name: 'Factory Method Pattern',
          diagram: FactoryMethodDiagram,
          explanation: `The Factory Method Pattern (GoF) uses an abstract creator class with an abstract factory method. Subclasses decide which class to instantiate. This fully complies with Open/Closed Principle - adding new types only requires adding new subclasses, no existing code is modified. More classes, but more extensible.`,
          codeExample: `// Abstract Creator
abstract class NotificationCreator {
    // Factory method - subclasses implement
    public abstract Notification createNotification();

    // Template method using factory method
    public void sendNotification(String message) {
        Notification notification = createNotification();
        notification.send(message);
    }
}

// Concrete Creators
class EmailNotificationCreator extends NotificationCreator {
    @Override
    public Notification createNotification() {
        return new EmailNotification();
    }
}

class SMSNotificationCreator extends NotificationCreator {
    @Override
    public Notification createNotification() {
        return new SMSNotification();
    }
}

class PushNotificationCreator extends NotificationCreator {
    @Override
    public Notification createNotification() {
        return new PushNotification();
    }
}

// Usage - no modification needed to add new types
NotificationCreator creator = new EmailNotificationCreator();
creator.sendNotification("Hello via Factory Method");

// Switch at runtime
creator = new SMSNotificationCreator();
creator.sendNotification("Different notification type");`
        },
        {
          name: 'When to Use Which',
          diagram: FactoryPatternDiagram,
          explanation: `Use Simple Factory when: you have a fixed set of products that rarely changes, simplicity is preferred, or you're building a small application. Use Factory Method when: you need extensibility, building plugin architectures, or following strict SOLID principles. Real-world examples include document creation (PDF, Word), database connections (MySQL, PostgreSQL), UI components, and logging frameworks.`,
          codeExample: `// Simple Factory: Fixed types, modify switch for new types
// Good for: Small apps, fixed product set
class DocumentFactory {
    public static Document create(String type) {
        switch (type) {
            case "PDF":  return new PDFDocument();
            case "WORD": return new WordDocument();
            default: throw new IllegalArgumentException("Unknown");
        }
    }
}

// Factory Method: Add new types without modification
// Good for: Plugin architectures, extensibility
abstract class DocumentCreator {
    public abstract Document createDocument();
}

class PDFCreator extends DocumentCreator {
    public Document createDocument() { return new PDFDocument(); }
}

// Adding new type - NO existing code modified!
class ExcelCreator extends DocumentCreator {
    public Document createDocument() { return new ExcelDocument(); }
}

// Registration-based factory (best of both worlds)
class PluggableFactory {
    private Map<String, Supplier<Document>> creators = new HashMap<>();

    public void register(String type, Supplier<Document> creator) {
        creators.put(type, creator);
    }

    public Document create(String type) {
        return creators.get(type).get();
    }
}
// factory.register("PDF", PDFDocument::new);
// factory.register("WORD", WordDocument::new);`
        }
      ]
    },
    {
      id: 'observer',
      name: 'Observer Pattern',
      icon: '👁️',
      color: '#ec4899',
      description: 'Automatically notify multiple objects when one object state changes. Also known as Publish-Subscribe pattern. Enables loose coupling between subjects and observers.',
      diagram: ObserverPatternDiagram,
      details: [
        {
          name: 'Core Implementation',
          diagram: ObserverPatternDiagram,
          explanation: `The Observer pattern establishes a one-to-many dependency. When the Subject (Observable) changes state, all registered Observers are notified automatically. The Subject maintains a list of observers and provides attach/detach methods. This enables broadcast communication with loose coupling - the subject doesn't know concrete observer types.`,
          codeExample: `import java.util.*;

// Observer interface
interface Observer {
    void update(String stockSymbol, double price);
}

// Subject interface
interface Subject {
    void addObserver(Observer observer);
    void removeObserver(Observer observer);
    void notifyObservers();
}

// Concrete Observer
class Investor implements Observer {
    private String name;

    public Investor(String name) {
        this.name = name;
    }

    @Override
    public void update(String stockSymbol, double price) {
        System.out.println(name + " notified: " + stockSymbol +
                         " price changed to $" + price);
    }
}

// Concrete Subject
class Stock implements Subject {
    private String symbol;
    private double price;
    private List<Observer> observers = new ArrayList<>();

    public Stock(String symbol, double price) {
        this.symbol = symbol;
        this.price = price;
    }

    @Override
    public void addObserver(Observer observer) {
        if (!observers.contains(observer)) {
            observers.add(observer);
        }
    }

    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    public void setPrice(double price) {
        if (this.price != price) {
            this.price = price;
            notifyObservers();
        }
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(symbol, price);
        }
    }
}`
        },
        {
          name: 'Push vs Pull Model',
          diagram: PushPullDiagram,
          explanation: `In the Push Model, the subject sends all relevant data to observers in the update() method. Simple but inflexible - observers get data they may not need. In the Pull Model, the subject sends itself as a reference, and observers query the data they need. More flexible but creates tighter coupling between observer and subject.`,
          codeExample: `// PUSH MODEL - Subject sends all data
interface PushObserver {
    void update(String symbol, double price, long volume, Date timestamp);
}

class PushStock {
    public void notifyObservers() {
        for (PushObserver obs : observers) {
            // Push ALL data to every observer
            obs.update(symbol, price, volume, timestamp);
        }
    }
}

// PULL MODEL - Observer queries needed data
interface PullObserver {
    void update(Subject subject);  // Pass subject reference
}

class PullInvestor implements PullObserver {
    @Override
    public void update(Subject subject) {
        PullStock stock = (PullStock) subject;
        // Pull only what we need
        String sym = stock.getSymbol();
        double price = stock.getPrice();
        // Don't need volume or timestamp
        System.out.println(sym + ": $" + price);
    }
}

class PullStock implements Subject {
    public void notifyObservers() {
        for (PullObserver obs : observers) {
            obs.update(this);  // Pass reference to self
        }
    }

    // Getters for observers to pull data
    public String getSymbol() { return symbol; }
    public double getPrice() { return price; }
    public long getVolume() { return volume; }
}`
        },
        {
          name: 'Lifecycle & Thread Safety',
          diagram: ObserverLifecycleDiagram,
          explanation: `Key lifecycle: addObserver() registers, state change triggers notifyObservers(), removeObserver() unregisters. Memory leaks are a major risk - always remove observers when done. For thread safety, use synchronized lists and create snapshots before iterating to avoid ConcurrentModificationException.`,
          codeExample: `class ThreadSafeStock implements Subject {
    private String symbol;
    private volatile double price;  // Ensure visibility
    // Thread-safe list
    private List<Observer> observers =
        Collections.synchronizedList(new ArrayList<>());

    @Override
    public void addObserver(Observer observer) {
        synchronized (observers) {
            if (!observers.contains(observer)) {
                observers.add(observer);
            }
        }
    }

    @Override
    public void removeObserver(Observer observer) {
        synchronized (observers) {
            observers.remove(observer);
        }
    }

    @Override
    public void notifyObservers() {
        // Create snapshot to avoid ConcurrentModificationException
        List<Observer> snapshot;
        synchronized (observers) {
            snapshot = new ArrayList<>(observers);
        }
        // Notify outside synchronized block
        for (Observer observer : snapshot) {
            observer.update(symbol, price);
        }
    }

    public void setPrice(double price) {
        if (this.price != price) {
            this.price = price;
            notifyObservers();
        }
    }
}

// Usage - always clean up!
Stock apple = new Stock("AAPL", 150.0);
Investor john = new Investor("John");
apple.addObserver(john);
// ... use observer ...
apple.removeObserver(john);  // IMPORTANT: Prevent memory leak!`
        },
        {
          name: 'Real-World Examples',
          diagram: ObserverPatternDiagram,
          explanation: `Observer pattern is everywhere: GUI event handling (button clicks), Model-View-Controller (model notifies views), pub/sub messaging systems, social media notifications, stock market tickers, and weather monitoring. Java provides built-in support with java.util.Observer (deprecated) and PropertyChangeListener.`,
          codeExample: `// Java PropertyChangeSupport (modern approach)
import java.beans.*;

class Stock {
    private PropertyChangeSupport support =
        new PropertyChangeSupport(this);
    private double price;

    public void addPropertyChangeListener(PropertyChangeListener l) {
        support.addPropertyChangeListener(l);
    }

    public void removePropertyChangeListener(PropertyChangeListener l) {
        support.removePropertyChangeListener(l);
    }

    public void setPrice(double newPrice) {
        double oldPrice = this.price;
        this.price = newPrice;
        // Automatically notifies all listeners
        support.firePropertyChange("price", oldPrice, newPrice);
    }
}

// Observer using lambda (Java 8+)
Stock apple = new Stock();
apple.addPropertyChangeListener(event -> {
    System.out.println("Property: " + event.getPropertyName());
    System.out.println("Old: " + event.getOldValue());
    System.out.println("New: " + event.getNewValue());
});

apple.setPrice(155.0);
// Output:
// Property: price
// Old: 0.0
// New: 155.0`
        }
      ]
    },
    {
      id: 'strategy',
      name: 'Strategy Pattern',
      icon: '🎯',
      color: '#14b8a6',
      description: 'Enable selecting algorithm behavior at runtime without modifying client code. Encapsulate interchangeable algorithms and eliminate conditional logic with polymorphism.',
      diagram: StrategyPatternDiagram,
      details: [
        {
          name: 'Core Implementation',
          diagram: StrategyPatternDiagram,
          explanation: `The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. The Context holds a reference to a Strategy and delegates the algorithm execution. Clients can switch strategies at runtime without changing the context. This replaces conditional logic (if/switch) with polymorphism.`,
          codeExample: `// Strategy interface
interface PaymentStrategy {
    void pay(double amount);
    String getPaymentMethod();
}

// Concrete Strategies
class CreditCardStrategy implements PaymentStrategy {
    private String cardNumber;

    public CreditCardStrategy(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    @Override
    public void pay(double amount) {
        System.out.println("Processing $" + amount + " via Credit Card");
        System.out.println("Card: ****" +
            cardNumber.substring(cardNumber.length() - 4));
    }

    @Override
    public String getPaymentMethod() { return "Credit Card"; }
}

class PayPalStrategy implements PaymentStrategy {
    private String email;

    public PayPalStrategy(String email) { this.email = email; }

    @Override
    public void pay(double amount) {
        System.out.println("Processing $" + amount + " via PayPal");
        System.out.println("Account: " + email);
    }

    @Override
    public String getPaymentMethod() { return "PayPal"; }
}

class CryptoStrategy implements PaymentStrategy {
    private String wallet;
    private String currency;

    public CryptoStrategy(String wallet, String currency) {
        this.wallet = wallet;
        this.currency = currency;
    }

    @Override
    public void pay(double amount) {
        System.out.println("Processing $" + amount + " via " + currency);
        System.out.println("Wallet: " + wallet);
    }

    @Override
    public String getPaymentMethod() {
        return "Crypto (" + currency + ")";
    }
}`
        },
        {
          name: 'Context Class',
          diagram: RuntimeStrategySwitchDiagram,
          explanation: `The Context class holds a strategy reference and delegates algorithm execution. It can accept strategy via constructor or setter (for runtime switching). The context is decoupled from concrete strategies - it only knows the interface. This enables runtime flexibility and easy testing with mock strategies.`,
          codeExample: `// Context - holds and uses strategy
class PaymentProcessor {
    private PaymentStrategy strategy;

    public PaymentProcessor(PaymentStrategy strategy) {
        if (strategy == null) {
            throw new IllegalArgumentException("Strategy required");
        }
        this.strategy = strategy;
    }

    // Allow runtime strategy switching
    public void setStrategy(PaymentStrategy strategy) {
        if (strategy == null) {
            throw new IllegalArgumentException("Strategy required");
        }
        this.strategy = strategy;
    }

    public void processPayment(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        System.out.println("=== Payment Processing ===");
        System.out.println("Method: " + strategy.getPaymentMethod());
        strategy.pay(amount);  // Delegate to strategy
        System.out.println("Payment completed!");
    }
}

// Usage - runtime strategy switching
PaymentProcessor processor = new PaymentProcessor(
    new CreditCardStrategy("1234567890123456")
);
processor.processPayment(100.0);

// Switch to PayPal at runtime
processor.setStrategy(new PayPalStrategy("user@example.com"));
processor.processPayment(250.0);

// Switch to Crypto
processor.setStrategy(new CryptoStrategy("0x1A2B3C...", "ETH"));
processor.processPayment(500.0);`
        },
        {
          name: 'Strategy vs State',
          diagram: StrategyVsStateDiagram,
          explanation: `Strategy and State patterns look similar but have different intents. Strategy: client chooses/knows the strategy, strategies are independent, focus is on different algorithms for the same task. State: context manages transitions, states know about each other, focus is on behavior that changes with state. Strategy is about HOW, State is about WHEN.`,
          codeExample: `// STRATEGY PATTERN - Client chooses algorithm
// Different payment METHODS (algorithms) for same task (paying)
PaymentStrategy creditCard = new CreditCardStrategy("1234...");
PaymentStrategy paypal = new PayPalStrategy("user@mail.com");
// Client explicitly selects which algorithm to use
processor.setStrategy(creditCard);  // Client's choice

// STATE PATTERN - Context manages transitions
// Order behavior changes based on current state
class Order {
    private OrderState state;

    public void ship() {
        state.ship(this);  // State decides behavior
    }
}

class PendingState implements OrderState {
    public void ship(Order order) {
        System.out.println("Shipping order...");
        order.setState(new ShippedState());  // State transition
    }
}

class ShippedState implements OrderState {
    public void ship(Order order) {
        System.out.println("Already shipped!");  // Different behavior
    }
}

// Summary:
// Strategy: Multiple algorithms, client picks one
// State: One object, multiple behavioral states`
        },
        {
          name: 'Functional Approach',
          diagram: StrategyPatternDiagram,
          explanation: `In Java 8+, strategies can be implemented as lambdas using functional interfaces. This reduces boilerplate - no need for concrete strategy classes. You can use built-in functional interfaces (Function, Consumer) or define your own @FunctionalInterface. This is ideal for simple, stateless strategies.`,
          codeExample: `// Strategy as functional interface
@FunctionalInterface
interface PaymentStrategy {
    void pay(double amount);
}

// Context accepts lambda strategies
class PaymentProcessor {
    private PaymentStrategy strategy;

    public void setStrategy(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public void process(double amount) {
        strategy.pay(amount);
    }
}

// Usage with lambdas - no classes needed!
PaymentProcessor processor = new PaymentProcessor();

// Credit card as lambda
processor.setStrategy(amount ->
    System.out.println("Credit card: $" + amount));
processor.process(100.0);

// PayPal as lambda
processor.setStrategy(amount ->
    System.out.println("PayPal: $" + amount));
processor.process(200.0);

// Method reference
processor.setStrategy(this::processWithCrypto);

// Using built-in functional interfaces
import java.util.function.Consumer;

class FlexibleProcessor {
    private Consumer<Double> paymentStrategy;

    public void setStrategy(Consumer<Double> strategy) {
        this.paymentStrategy = strategy;
    }

    public void process(double amount) {
        paymentStrategy.accept(amount);
    }
}

// Strategy as method reference
FlexibleProcessor fp = new FlexibleProcessor();
fp.setStrategy(System.out::println);  // Simple print strategy
fp.process(150.0);`
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
  // BREADCRUMB CONFIGURATION
  // =============================================================================

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'Practice', icon: '📝', page: 'Practice' },
      { name: 'Design Patterns', icon: '🎨', page: 'DesignPatternsInteractive' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index) => {
    if (index === 0) {
      onBack()
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)
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
        if (selectedConceptIndex !== null) {
          setSelectedConceptIndex(null)
        } else {
          onBack()
        }
      } else if (e.key === 'ArrowLeft' && selectedConceptIndex !== null) {
        e.preventDefault()
        if (selectedConceptIndex > 0) {
          setSelectedConceptIndex(selectedConceptIndex - 1)
          setSelectedDetailIndex(0)
        }
      } else if (e.key === 'ArrowRight' && selectedConceptIndex !== null) {
        e.preventDefault()
        if (selectedConceptIndex < concepts.length - 1) {
          setSelectedConceptIndex(selectedConceptIndex + 1)
          setSelectedDetailIndex(0)
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack, concepts.length])

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
    background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(139, 92, 246, 0.2)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '0.5rem',
    color: '#a78bfa',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Design Patterns</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Back to Practice
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={TOPIC_COLORS}
        />
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
        primaryColor={TOPIC_COLORS.primary}
      />


      {/* Description */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: '1.6', margin: 0 }}>
          Master essential GoF design patterns with interactive examples and diagrams.
          Learn Creational patterns (Singleton, Factory) and Behavioral patterns (Observer, Strategy).
        </p>
      </div>

      {/* Concept Cards Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
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

      {/* Modal for Selected Concept */}
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
              maxWidth: '1400px', height: '90vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`,
              width: '95vw'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu || onBack}
              colors={TOPIC_COLORS}
            />

            {/* Modal Header with Navigation */}
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
                fontSize: '1.25rem'
              }}>
                <span>{selectedConcept.icon}</span>
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
                >Prev</button>
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
                >Next</button>
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
                >Close</button>
              </div>
            </div>

            {/* Subtopic Tabs */}
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

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = detail.diagram || selectedConcept.diagram
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

export default DesignPatternsInteractive

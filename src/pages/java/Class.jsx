/**
 * Object-Oriented Design Page
 *
 * Covers OOP principles: SOLID, inheritance, composition, encapsulation,
 * abstraction, polymorphism, design patterns, and class design best practices.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const CLASS_COLORS = {
  primary: '#84cc16',           // Lime
  primaryHover: '#a3e635',      // Lighter lime
  bg: 'rgba(132, 204, 22, 0.1)',
  border: 'rgba(132, 204, 22, 0.3)',
  arrow: '#65a30d',
  hoverBg: 'rgba(132, 204, 22, 0.2)',
  topicBg: 'rgba(132, 204, 22, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },    // blue
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },      // green
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },    // amber
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },    // purple
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },    // pink
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },      // cyan
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const SOLIDDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="solidArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#84cc16" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      SOLID Principles
    </text>

    {/* S */}
    <rect x="30" y="60" width="130" height="60" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="95" y="85" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">S</text>
    <text x="95" y="105" textAnchor="middle" fill="white" fontSize="9">Single Responsibility</text>

    {/* O */}
    <rect x="175" y="60" width="130" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="240" y="85" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">O</text>
    <text x="240" y="105" textAnchor="middle" fill="white" fontSize="9">Open/Closed</text>

    {/* L */}
    <rect x="320" y="60" width="130" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="385" y="85" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">L</text>
    <text x="385" y="105" textAnchor="middle" fill="white" fontSize="9">Liskov Substitution</text>

    {/* I */}
    <rect x="465" y="60" width="130" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="530" y="85" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">I</text>
    <text x="530" y="105" textAnchor="middle" fill="white" fontSize="9">Interface Segregation</text>

    {/* D */}
    <rect x="610" y="60" width="130" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="675" y="85" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">D</text>
    <text x="675" y="105" textAnchor="middle" fill="white" fontSize="9">Dependency Inversion</text>

    {/* Result */}
    <rect x="275" y="150" width="250" height="50" rx="8" fill="rgba(132, 204, 22, 0.2)" stroke="#84cc16" strokeWidth="2"/>
    <text x="400" y="180" textAnchor="middle" fill="#84cc16" fontSize="12" fontWeight="bold">Maintainable, Flexible Code</text>

    {/* Arrows */}
    <line x1="95" y1="120" x2="300" y2="150" stroke="#84cc16" strokeWidth="1.5" markerEnd="url(#solidArrow)" opacity="0.5"/>
    <line x1="240" y1="120" x2="350" y2="150" stroke="#84cc16" strokeWidth="1.5" markerEnd="url(#solidArrow)" opacity="0.5"/>
    <line x1="385" y1="120" x2="400" y2="150" stroke="#84cc16" strokeWidth="1.5" markerEnd="url(#solidArrow)" opacity="0.5"/>
    <line x1="530" y1="120" x2="450" y2="150" stroke="#84cc16" strokeWidth="1.5" markerEnd="url(#solidArrow)" opacity="0.5"/>
    <line x1="675" y1="120" x2="500" y2="150" stroke="#84cc16" strokeWidth="1.5" markerEnd="url(#solidArrow)" opacity="0.5"/>
  </svg>
)

const InheritanceDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="inheritArrow" markerWidth="12" markerHeight="8" refX="11" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="none" stroke="#a855f7" strokeWidth="2"/>
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Inheritance Hierarchy (IS-A Relationship)
    </text>

    {/* Parent Class */}
    <rect x="300" y="50" width="200" height="70" rx="8" fill="#a855f7" stroke="#c084fc" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Animal</text>
    <text x="400" y="95" textAnchor="middle" fill="white" fontSize="10">+ name: String</text>
    <text x="400" y="110" textAnchor="middle" fill="white" fontSize="10">+ makeSound()</text>

    {/* Child Classes */}
    <rect x="100" y="180" width="150" height="80" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="175" y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Dog</text>
    <text x="175" y="225" textAnchor="middle" fill="white" fontSize="9">+ breed: String</text>
    <text x="175" y="240" textAnchor="middle" fill="white" fontSize="9">+ makeSound() → Woof!</text>

    <rect x="325" y="180" width="150" height="80" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="400" y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Cat</text>
    <text x="400" y="225" textAnchor="middle" fill="white" fontSize="9">+ indoor: boolean</text>
    <text x="400" y="240" textAnchor="middle" fill="white" fontSize="9">+ makeSound() → Meow!</text>

    <rect x="550" y="180" width="150" height="80" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="625" y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Bird</text>
    <text x="625" y="225" textAnchor="middle" fill="white" fontSize="9">+ canFly: boolean</text>
    <text x="625" y="240" textAnchor="middle" fill="white" fontSize="9">+ makeSound() → Chirp!</text>

    {/* Inheritance Arrows (hollow triangle) */}
    <line x1="175" y1="180" x2="350" y2="120" stroke="#a855f7" strokeWidth="2" markerEnd="url(#inheritArrow)"/>
    <line x1="400" y1="180" x2="400" y2="120" stroke="#a855f7" strokeWidth="2" markerEnd="url(#inheritArrow)"/>
    <line x1="625" y1="180" x2="450" y2="120" stroke="#a855f7" strokeWidth="2" markerEnd="url(#inheritArrow)"/>

    {/* Labels */}
    <text x="250" y="160" textAnchor="middle" fill="#94a3b8" fontSize="10">extends</text>
    <text x="400" y="160" textAnchor="middle" fill="#94a3b8" fontSize="10">extends</text>
    <text x="550" y="160" textAnchor="middle" fill="#94a3b8" fontSize="10">extends</text>
  </svg>
)

const CompositionDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="compArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#7c3aed" />
      </marker>
      <marker id="diamond" markerWidth="12" markerHeight="12" refX="6" refY="6" orient="auto">
        <polygon points="6 0, 12 6, 6 12, 0 6" fill="#7c3aed" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Composition (HAS-A Relationship)
    </text>

    {/* Car - the composite */}
    <rect x="300" y="50" width="200" height="80" rx="8" fill="#7c3aed" stroke="#a78bfa" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Car</text>
    <text x="400" y="95" textAnchor="middle" fill="white" fontSize="10">- engine: Engine</text>
    <text x="400" y="110" textAnchor="middle" fill="white" fontSize="10">- transmission: Transmission</text>

    {/* Components */}
    <rect x="100" y="170" width="140" height="60" rx="8" fill="#6366f1" stroke="#818cf8" strokeWidth="2"/>
    <text x="170" y="195" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Engine</text>
    <text x="170" y="215" textAnchor="middle" fill="white" fontSize="9">+ start(), stop()</text>

    <rect x="330" y="170" width="140" height="60" rx="8" fill="#6366f1" stroke="#818cf8" strokeWidth="2"/>
    <text x="400" y="195" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Transmission</text>
    <text x="400" y="215" textAnchor="middle" fill="white" fontSize="9">+ shiftUp(), shiftDown()</text>

    <rect x="560" y="170" width="140" height="60" rx="8" fill="#6366f1" stroke="#818cf8" strokeWidth="2"/>
    <text x="630" y="195" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Wheels</text>
    <text x="630" y="215" textAnchor="middle" fill="white" fontSize="9">+ rotate()</text>

    {/* Composition lines with diamond */}
    <line x1="350" y1="130" x2="170" y2="170" stroke="#7c3aed" strokeWidth="2" markerStart="url(#diamond)"/>
    <line x1="400" y1="130" x2="400" y2="170" stroke="#7c3aed" strokeWidth="2" markerStart="url(#diamond)"/>
    <line x1="450" y1="130" x2="630" y2="170" stroke="#7c3aed" strokeWidth="2" markerStart="url(#diamond)"/>

    {/* Labels */}
    <text x="250" y="158" textAnchor="middle" fill="#94a3b8" fontSize="9">has-a</text>
    <text x="400" y="158" textAnchor="middle" fill="#94a3b8" fontSize="9">has-a</text>
    <text x="550" y="158" textAnchor="middle" fill="#94a3b8" fontSize="9">has-a</text>
  </svg>
)

const EncapsulationDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="encapArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#84cc16" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Encapsulation - Data Hiding
    </text>

    {/* Class boundary */}
    <rect x="200" y="50" width="400" height="170" rx="12" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="400" y="75" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">BankAccount Class</text>

    {/* Private section */}
    <rect x="230" y="90" width="160" height="110" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="310" y="115" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Private</text>
    <text x="310" y="135" textAnchor="middle" fill="white" fontSize="9">- balance</text>
    <text x="310" y="150" textAnchor="middle" fill="white" fontSize="9">- accountNumber</text>
    <text x="310" y="165" textAnchor="middle" fill="white" fontSize="9">- transactionHistory</text>
    <text x="310" y="190" textAnchor="middle" fill="#fca5a5" fontSize="8">Hidden from outside</text>

    {/* Public section */}
    <rect x="410" y="90" width="160" height="110" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="490" y="115" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Public</text>
    <text x="490" y="135" textAnchor="middle" fill="white" fontSize="9">+ getBalance()</text>
    <text x="490" y="150" textAnchor="middle" fill="white" fontSize="9">+ deposit(amount)</text>
    <text x="490" y="165" textAnchor="middle" fill="white" fontSize="9">+ withdraw(amount)</text>
    <text x="490" y="190" textAnchor="middle" fill="#86efac" fontSize="8">Controlled access</text>

    {/* External access */}
    <rect x="650" y="110" width="100" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="700" y="145" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Client</text>

    <line x1="650" y1="140" x2="575" y2="140" stroke="#84cc16" strokeWidth="2" markerEnd="url(#encapArrow)"/>
    <text x="612" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">uses</text>

    {/* X for blocked access */}
    <text x="100" y="150" textAnchor="middle" fill="#ef4444" fontSize="24" fontWeight="bold">✗</text>
    <line x1="120" y1="150" x2="195" y2="150" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4"/>
    <text x="157" y="140" textAnchor="middle" fill="#ef4444" fontSize="9">blocked</text>
  </svg>
)

const AbstractionDiagram = () => (
  <svg viewBox="0 0 800 260" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="absArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
      <marker id="implArrow" markerWidth="12" markerHeight="8" refX="11" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="none" stroke="#f59e0b" strokeWidth="2"/>
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Abstraction - Interface Contract
    </text>

    {/* Interface */}
    <rect x="300" y="50" width="200" height="70" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="400" y="70" textAnchor="middle" fill="#fbbf24" fontSize="10" fontStyle="italic">«interface»</text>
    <text x="400" y="90" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">PaymentProcessor</text>
    <text x="400" y="110" textAnchor="middle" fill="#fbbf24" fontSize="10">+ processPayment(amount)</text>

    {/* Implementations */}
    <rect x="80" y="170" width="170" height="70" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="165" y="200" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">CreditCardProcessor</text>
    <text x="165" y="220" textAnchor="middle" fill="white" fontSize="9">+ processPayment()</text>

    <rect x="315" y="170" width="170" height="70" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="400" y="200" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">PayPalProcessor</text>
    <text x="400" y="220" textAnchor="middle" fill="white" fontSize="9">+ processPayment()</text>

    <rect x="550" y="170" width="170" height="70" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="635" y="200" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">CryptoProcessor</text>
    <text x="635" y="220" textAnchor="middle" fill="white" fontSize="9">+ processPayment()</text>

    {/* Implementation arrows */}
    <line x1="165" y1="170" x2="350" y2="120" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#implArrow)"/>
    <line x1="400" y1="170" x2="400" y2="120" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#implArrow)"/>
    <line x1="635" y1="170" x2="450" y2="120" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#implArrow)"/>

    <text x="250" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">implements</text>
    <text x="400" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">implements</text>
    <text x="550" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">implements</text>
  </svg>
)

const PolymorphismDiagram = () => (
  <svg viewBox="0 0 800 260" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="polyArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ec4899" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Polymorphism - One Interface, Many Forms
    </text>

    {/* Single reference */}
    <rect x="50" y="100" width="150" height="60" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="125" y="125" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Shape shape</text>
    <text x="125" y="145" textAnchor="middle" fill="white" fontSize="9">(reference type)</text>

    {/* Method call */}
    <rect x="250" y="100" width="120" height="60" rx="8" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
    <text x="310" y="135" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="bold">calculateArea()</text>

    {/* Different behaviors */}
    <rect x="450" y="50" width="130" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="515" y="72" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Rectangle</text>
    <text x="515" y="90" textAnchor="middle" fill="white" fontSize="9">w × h</text>

    <rect x="450" y="110" width="130" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="515" y="132" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Circle</text>
    <text x="515" y="150" textAnchor="middle" fill="white" fontSize="9">π × r²</text>

    <rect x="450" y="170" width="130" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="515" y="192" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Triangle</text>
    <text x="515" y="210" textAnchor="middle" fill="white" fontSize="9">½ × b × h</text>

    {/* Arrows */}
    <line x1="200" y1="130" x2="245" y2="130" stroke="#ec4899" strokeWidth="2" markerEnd="url(#polyArrow)"/>
    <line x1="370" y1="115" x2="445" y2="75" stroke="#ec4899" strokeWidth="2" markerEnd="url(#polyArrow)"/>
    <line x1="370" y1="130" x2="445" y2="135" stroke="#ec4899" strokeWidth="2" markerEnd="url(#polyArrow)"/>
    <line x1="370" y1="145" x2="445" y2="195" stroke="#ec4899" strokeWidth="2" markerEnd="url(#polyArrow)"/>

    {/* Labels */}
    <text x="610" y="75" textAnchor="start" fill="#60a5fa" fontSize="10">→ width * height</text>
    <text x="610" y="135" textAnchor="start" fill="#4ade80" fontSize="10">→ Math.PI * r * r</text>
    <text x="610" y="195" textAnchor="start" fill="#fbbf24" fontSize="10">→ 0.5 * base * height</text>

    {/* Dynamic Dispatch label */}
    <text x="400" y="245" textAnchor="middle" fill="#94a3b8" fontSize="11">Runtime determines which implementation is called (Dynamic Dispatch)</text>
  </svg>
)

const DesignPatternsDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Design Pattern Categories
    </text>

    {/* Creational */}
    <rect x="50" y="60" width="200" height="150" rx="8" fill="rgba(20, 184, 166, 0.2)" stroke="#14b8a6" strokeWidth="2"/>
    <text x="150" y="90" textAnchor="middle" fill="#14b8a6" fontSize="14" fontWeight="bold">Creational</text>
    <text x="150" y="115" textAnchor="middle" fill="#5eead4" fontSize="10">Object Creation</text>
    <text x="150" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">• Singleton</text>
    <text x="150" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">• Factory Method</text>
    <text x="150" y="170" textAnchor="middle" fill="#94a3b8" fontSize="9">• Builder</text>
    <text x="150" y="185" textAnchor="middle" fill="#94a3b8" fontSize="9">• Prototype</text>

    {/* Structural */}
    <rect x="300" y="60" width="200" height="150" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="90" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Structural</text>
    <text x="400" y="115" textAnchor="middle" fill="#93c5fd" fontSize="10">Object Composition</text>
    <text x="400" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">• Adapter</text>
    <text x="400" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">• Decorator</text>
    <text x="400" y="170" textAnchor="middle" fill="#94a3b8" fontSize="9">• Proxy</text>
    <text x="400" y="185" textAnchor="middle" fill="#94a3b8" fontSize="9">• Facade</text>

    {/* Behavioral */}
    <rect x="550" y="60" width="200" height="150" rx="8" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth="2"/>
    <text x="650" y="90" textAnchor="middle" fill="#a855f7" fontSize="14" fontWeight="bold">Behavioral</text>
    <text x="650" y="115" textAnchor="middle" fill="#c4b5fd" fontSize="10">Object Interaction</text>
    <text x="650" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">• Strategy</text>
    <text x="650" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">• Observer</text>
    <text x="650" y="170" textAnchor="middle" fill="#94a3b8" fontSize="9">• Command</text>
    <text x="650" y="185" textAnchor="middle" fill="#94a3b8" fontSize="9">• Template Method</text>
  </svg>
)

const ClassDesignDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="designArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#84cc16" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Class Design Best Practices
    </text>

    {/* High Cohesion */}
    <rect x="50" y="60" width="170" height="70" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="135" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">High Cohesion</text>
    <text x="135" y="110" textAnchor="middle" fill="white" fontSize="9">Single focused purpose</text>

    {/* Loose Coupling */}
    <rect x="240" y="60" width="170" height="70" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="325" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Loose Coupling</text>
    <text x="325" y="110" textAnchor="middle" fill="white" fontSize="9">Minimal dependencies</text>

    {/* DRY */}
    <rect x="430" y="60" width="170" height="70" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="515" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">DRY</text>
    <text x="515" y="110" textAnchor="middle" fill="white" fontSize="9">Don't Repeat Yourself</text>

    {/* YAGNI */}
    <rect x="620" y="60" width="130" height="70" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="685" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">YAGNI</text>
    <text x="685" y="110" textAnchor="middle" fill="white" fontSize="9">No speculative code</text>

    {/* Result */}
    <rect x="250" y="160" width="300" height="50" rx="8" fill="rgba(132, 204, 22, 0.2)" stroke="#84cc16" strokeWidth="2"/>
    <text x="400" y="190" textAnchor="middle" fill="#84cc16" fontSize="12" fontWeight="bold">Clean, Maintainable, Testable Code</text>

    {/* Arrows */}
    <line x1="135" y1="130" x2="300" y2="160" stroke="#84cc16" strokeWidth="1.5" markerEnd="url(#designArrow)" opacity="0.6"/>
    <line x1="325" y1="130" x2="370" y2="160" stroke="#84cc16" strokeWidth="1.5" markerEnd="url(#designArrow)" opacity="0.6"/>
    <line x1="515" y1="130" x2="430" y2="160" stroke="#84cc16" strokeWidth="1.5" markerEnd="url(#designArrow)" opacity="0.6"/>
    <line x1="685" y1="130" x2="500" y2="160" stroke="#84cc16" strokeWidth="1.5" markerEnd="url(#designArrow)" opacity="0.6"/>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Class({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'solid',
      name: 'SOLID Principles',
      icon: '🎯',
      color: '#ef4444',
      description: 'Five fundamental principles of object-oriented design ensuring maintainable, flexible, and robust class structures.',
      diagram: SOLIDDiagram,
      details: [
        {
          name: 'Single Responsibility & Open-Closed',
          explanation: 'Single Responsibility Principle (SRP) states that each class should have one and only one reason to change. A class should do one thing well, with high cohesion where related functionality is grouped together. This makes classes easier to understand, test, and maintain with changes isolated to a single class. The Open-Closed Principle (OCP) states that classes should be open for extension but closed for modification. You should be able to add new functionality without changing existing code by using abstraction and polymorphism through inheritance, composition, and interfaces.',
          codeExample: `// SRP Example: Separate concerns into different classes
public class Employee {
    private String name;
    private double salary;

    public double calculatePay() {
        return salary;
    }
}

// Separate class for persistence - single responsibility
public class EmployeeRepository {
    public void save(Employee employee) {
        // Database operations here
    }
}

// OCP Example: Open for extension, closed for modification
public interface PaymentProcessor {
    void processPayment(double amount);
}

public class CreditCardProcessor implements PaymentProcessor {
    @Override
    public void processPayment(double amount) {
        System.out.println("Processing credit card: $" + amount);
    }
}

// Extend without modifying existing code
public class CryptoProcessor implements PaymentProcessor {
    @Override
    public void processPayment(double amount) {
        System.out.println("Processing crypto: $" + amount);
    }
}`
        },
        {
          name: 'Liskov Substitution & Interface Segregation',
          explanation: 'Liskov Substitution Principle (LSP) states that subtypes must be substitutable for their base types. A derived class should be able to replace its parent class without breaking the application. This requires preserving contracts, pre/post conditions, and behavioral subtyping - inheritance hierarchies must make semantic sense. Interface Segregation Principle (ISP) states that clients should not be forced to depend on interfaces they do not use. Many specific interfaces are better than one general "fat" interface. Role-based interfaces prevent interface pollution and reduce coupling.',
          codeExample: `// LSP Example: Proper substitution
public abstract class Bird {
    public abstract void move();
}

public class Sparrow extends Bird {
    @Override
    public void move() {
        System.out.println("Flying through the air");
    }
}

public class Penguin extends Bird {
    @Override
    public void move() {
        System.out.println("Swimming through water");
    }
}

// Both can substitute for Bird without issues
public void makeBirdMove(Bird bird) {
    bird.move(); // Works correctly for any Bird
}

// ISP Example: Segregated interfaces
public interface Workable {
    void work();
}

public interface Eatable {
    void eat();
}

public class Human implements Workable, Eatable {
    public void work() { System.out.println("Working"); }
    public void eat() { System.out.println("Eating"); }
}

public class Robot implements Workable {
    public void work() { System.out.println("Working"); }
    // Robot doesn't need eat() - no forced implementation
}`
        },
        {
          name: 'Dependency Inversion',
          explanation: 'Dependency Inversion Principle (DIP) states that high-level modules should not depend on low-level modules - both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions. This is achieved through interfaces as contracts, dependency injection, and programming to interfaces rather than implementations. This enables testability through mocking and provides flexibility to swap implementations without affecting dependent code.',
          codeExample: `// Without DIP - tightly coupled
public class EmailNotification {
    public void send(String message) {
        System.out.println("Sending email: " + message);
    }
}

// Bad: High-level depends on low-level
public class OrderServiceBad {
    private EmailNotification notification = new EmailNotification();

    public void processOrder() {
        // Process order...
        notification.send("Order processed");
    }
}

// With DIP - loosely coupled through abstraction
public interface NotificationService {
    void send(String message);
}

public class EmailNotificationService implements NotificationService {
    @Override
    public void send(String message) {
        System.out.println("Email: " + message);
    }
}

public class SMSNotificationService implements NotificationService {
    @Override
    public void send(String message) {
        System.out.println("SMS: " + message);
    }
}

// Good: Depends on abstraction, injected dependency
public class OrderService {
    private final NotificationService notificationService;

    public OrderService(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    public void processOrder() {
        // Process order...
        notificationService.send("Order processed");
    }
}`
        }
      ]
    },
    {
      id: 'inheritance',
      name: 'Inheritance',
      icon: '🌳',
      color: '#a855f7',
      description: 'Mechanism for creating class hierarchies where child classes inherit properties and behaviors from parent classes.',
      diagram: InheritanceDiagram,
      details: [
        {
          name: 'IS-A Relationship & Method Overriding',
          explanation: 'Inheritance models the "is-a" relationship between classes - a Dog is-a Animal. The subclass inherits properties and methods from its superclass, specializing the parent class behavior. Method overriding allows subclasses to provide specific implementations of parent methods using the @Override annotation. This enables runtime polymorphism through dynamic dispatch where behavior is determined by the actual object type at runtime. The subclass preserves the method signature and can call super.method() to invoke parent behavior.',
          codeExample: `// IS-A relationship: Dog is-a Animal
public class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    public void makeSound() {
        System.out.println("Some generic sound");
    }

    public void eat() {
        System.out.println(name + " is eating");
    }
}

public class Dog extends Animal {
    private String breed;

    public Dog(String name, String breed) {
        super(name); // Call parent constructor
        this.breed = breed;
    }

    @Override // Method overriding for specific behavior
    public void makeSound() {
        System.out.println(name + " says: Woof!");
    }

    // Dog-specific method
    public void fetch() {
        System.out.println(name + " is fetching the ball");
    }
}

// Runtime polymorphism
Animal myDog = new Dog("Buddy", "Golden Retriever");
myDog.makeSound(); // Output: Buddy says: Woof!
myDog.eat();       // Output: Buddy is eating`
        },
        {
          name: 'Abstract Classes & Protected Access',
          explanation: 'Abstract classes cannot be instantiated directly and serve as templates for subclasses. They contain abstract methods (no implementation) that subclasses must implement, along with concrete methods that provide shared functionality. The Template Method pattern commonly uses abstract classes. Protected access modifier allows members to be accessible to subclasses and classes in the same package, providing extension points and hook methods for customization while maintaining some encapsulation.',
          codeExample: `// Abstract class with Template Method pattern
public abstract class DataProcessor {
    // Template method - defines the algorithm skeleton
    public final void process() {
        readData();
        processData();
        writeData();
    }

    // Abstract methods - subclasses must implement
    protected abstract void readData();
    protected abstract void processData();

    // Concrete method - shared implementation
    protected void writeData() {
        System.out.println("Writing processed data to output");
    }
}

public class CSVProcessor extends DataProcessor {
    @Override
    protected void readData() {
        System.out.println("Reading CSV file");
    }

    @Override
    protected void processData() {
        System.out.println("Parsing CSV rows");
    }
}

public class JSONProcessor extends DataProcessor {
    @Override
    protected void readData() {
        System.out.println("Reading JSON file");
    }

    @Override
    protected void processData() {
        System.out.println("Parsing JSON objects");
    }

    @Override
    protected void writeData() {
        // Override default behavior
        System.out.println("Writing as formatted JSON");
    }
}`
        },
        {
          name: 'Constructor Chaining & Inheritance Trade-offs',
          explanation: 'Constructor chaining ensures proper object initialization in inheritance hierarchies. The subclass constructor must call the parent constructor using super() as its first statement, either explicitly or implicitly. Initialization flows from parent to child, ensuring the complete object state is properly set up. While inheritance provides benefits like code reuse and natural hierarchies, it has trade-offs including tight coupling between parent and child, the fragile base class problem where parent changes can break children, and deep hierarchies becoming hard to understand. Generally, favor composition over inheritance.',
          codeExample: `// Constructor chaining example
public class Vehicle {
    protected String brand;
    protected int year;

    public Vehicle(String brand, int year) {
        this.brand = brand;
        this.year = year;
        System.out.println("Vehicle constructor called");
    }
}

public class Car extends Vehicle {
    private int numDoors;

    public Car(String brand, int year, int numDoors) {
        super(brand, year); // Must be first statement
        this.numDoors = numDoors;
        System.out.println("Car constructor called");
    }
}

public class ElectricCar extends Car {
    private int batteryCapacity;

    public ElectricCar(String brand, int year, int doors, int battery) {
        super(brand, year, doors); // Chains to Car, then Vehicle
        this.batteryCapacity = battery;
        System.out.println("ElectricCar constructor called");
    }
}

// Creating an ElectricCar prints:
// Vehicle constructor called
// Car constructor called
// ElectricCar constructor called

// Trade-off: Prefer composition for flexibility
public class CarWithEngine {
    private Engine engine; // HAS-A: more flexible than inheritance

    public CarWithEngine(Engine engine) {
        this.engine = engine;
    }
}`
        }
      ]
    },
    {
      id: 'composition',
      name: 'Composition',
      icon: '🔧',
      color: '#7c3aed',
      description: 'Design approach where classes contain instances of other classes to achieve code reuse and flexibility.',
      diagram: CompositionDiagram,
      details: [
        {
          name: 'HAS-A Relationship & Delegation',
          explanation: 'Composition models the "has-a" relationship where objects contain other objects - a Car has-a Engine. This approach aggregates behavior from component objects and is more flexible than inheritance because you can compose behavior at runtime. Delegation forwards method calls to contained objects, allowing complex behavior to be composed from simple, focused parts. The Decorator and Proxy patterns heavily use delegation. Each component maintains a single responsibility while the composite orchestrates their behavior.',
          codeExample: `// HAS-A relationship with delegation
public class Engine {
    private int horsepower;

    public Engine(int horsepower) {
        this.horsepower = horsepower;
    }

    public void start() {
        System.out.println("Engine starting with " + horsepower + " HP");
    }

    public void stop() {
        System.out.println("Engine stopping");
    }
}

public class Transmission {
    public void shiftUp() {
        System.out.println("Shifting up");
    }

    public void shiftDown() {
        System.out.println("Shifting down");
    }
}

// Car HAS-A Engine and Transmission
public class Car {
    private Engine engine;
    private Transmission transmission;

    public Car(Engine engine, Transmission transmission) {
        this.engine = engine;
        this.transmission = transmission;
    }

    // Delegation - forward calls to components
    public void start() {
        engine.start();
    }

    public void accelerate() {
        transmission.shiftUp();
    }

    public void brake() {
        transmission.shiftDown();
    }
}`
        },
        {
          name: 'Aggregation vs Composition',
          explanation: 'Aggregation and composition are both HAS-A relationships but differ in ownership semantics. Aggregation is a loose relationship where parts can exist independently of the whole - a Department has Employees, but employees can exist without the department. Composition is a strong relationship where the part lifecycle is tied to the whole - a House has Rooms, and rooms cannot exist without the house. When the composite object is destroyed, composed parts are also destroyed in composition, while aggregated parts survive.',
          codeExample: `// Composition: Strong ownership - parts die with whole
public class Room {
    private String name;

    public Room(String name) {
        this.name = name;
    }
}

public class House {
    private List<Room> rooms; // Rooms can't exist without House

    public House() {
        // House creates and owns its rooms
        this.rooms = new ArrayList<>();
        rooms.add(new Room("Kitchen"));
        rooms.add(new Room("Bedroom"));
    }
    // When House is garbage collected, Rooms go with it
}

// Aggregation: Loose relationship - parts exist independently
public class Employee {
    private String name;

    public Employee(String name) {
        this.name = name;
    }
}

public class Department {
    private List<Employee> employees; // Employees exist independently

    public Department() {
        this.employees = new ArrayList<>();
    }

    public void addEmployee(Employee emp) {
        employees.add(emp); // Employee created elsewhere
    }

    public void removeEmployee(Employee emp) {
        employees.remove(emp); // Employee still exists
    }
}`
        },
        {
          name: 'Dependency Injection & Composition Benefits',
          explanation: 'Dependency Injection (DI) is a technique where dependencies are passed to a class rather than created internally. Constructor injection provides required dependencies at creation time, setter injection allows optional dependencies, and interface injection uses an interface to provide the injector method. DI enables testability through mocking, loose coupling, and flexibility to swap implementations. Composition provides runtime flexibility, better encapsulation, easier testing, clearer intent, and avoids the complexity of deep inheritance hierarchies.',
          codeExample: `// Dependency Injection enables flexible composition
public interface MessageService {
    void sendMessage(String message, String recipient);
}

public class EmailService implements MessageService {
    @Override
    public void sendMessage(String message, String recipient) {
        System.out.println("Email to " + recipient + ": " + message);
    }
}

public class SMSService implements MessageService {
    @Override
    public void sendMessage(String message, String recipient) {
        System.out.println("SMS to " + recipient + ": " + message);
    }
}

// Constructor Injection - dependencies provided externally
public class NotificationManager {
    private final MessageService primaryService;
    private MessageService backupService; // Optional

    // Constructor injection for required dependency
    public NotificationManager(MessageService primaryService) {
        this.primaryService = primaryService;
    }

    // Setter injection for optional dependency
    public void setBackupService(MessageService backupService) {
        this.backupService = backupService;
    }

    public void notify(String message, String recipient) {
        primaryService.sendMessage(message, recipient);
    }
}

// Usage - easy to swap implementations and test
MessageService emailService = new EmailService();
NotificationManager manager = new NotificationManager(emailService);

// For testing, inject a mock
MessageService mockService = new MockMessageService();
NotificationManager testManager = new NotificationManager(mockService);`
        }
      ]
    },
    {
      id: 'encapsulation',
      name: 'Encapsulation',
      icon: '🔒',
      color: '#8b5cf6',
      description: 'Bundling data and methods together while hiding internal state to protect object integrity.',
      diagram: EncapsulationDiagram,
      details: [
        {
          name: 'Data Hiding & Access Modifiers',
          explanation: 'Encapsulation hides internal state using private fields with controlled access through public methods. This black box principle protects class invariants and prevents invalid states. Java provides four access modifiers: private (class only), protected (subclasses and same package), default/package-private (package only), and public (everywhere). The principle of least privilege suggests exposing the minimal interface necessary. Information hiding allows internal implementation to change without affecting clients.',
          codeExample: `public class BankAccount {
    // Private fields - hidden from outside
    private String accountNumber;
    private double balance;
    private List<String> transactionHistory;

    // Package-private - accessible within package
    String bankCode;

    // Protected - accessible to subclasses
    protected double interestRate;

    // Public constructor
    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        this.transactionHistory = new ArrayList<>();
        logTransaction("Account opened with $" + initialBalance);
    }

    // Private helper method - internal use only
    private void logTransaction(String description) {
        transactionHistory.add(LocalDateTime.now() + ": " + description);
    }

    // Public methods control access to private state
    public double getBalance() {
        return balance;
    }

    // Validation in public method protects invariants
    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        balance += amount;
        logTransaction("Deposited $" + amount);
    }
}`
        },
        {
          name: 'Getters, Setters & Validation',
          explanation: 'Accessor methods (getters and setters) provide controlled field access. Setters can include validation logic to enforce business rules and maintain object invariants. Getters can compute derived values or return defensive copies for mutable objects. This allows adding logic without breaking existing clients and follows the JavaBeans convention. While getters/setters add boilerplate (mitigated by tools like Lombok), they enable encapsulation and future flexibility.',
          codeExample: `public class Person {
    private String name;
    private int age;
    private Date birthDate;
    private List<String> hobbies;

    // Getter with validation
    public String getName() {
        return name;
    }

    // Setter with validation
    public void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
        this.name = name.trim();
    }

    // Getter with business rule validation
    public int getAge() {
        return age;
    }

    // Setter with range validation
    public void setAge(int age) {
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException("Age must be between 0 and 150");
        }
        this.age = age;
    }

    // Defensive copy on getter - protect mutable object
    public Date getBirthDate() {
        return birthDate != null ? new Date(birthDate.getTime()) : null;
    }

    // Defensive copy on setter
    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate != null ? new Date(birthDate.getTime()) : null;
    }

    // Return unmodifiable view of collection
    public List<String> getHobbies() {
        return Collections.unmodifiableList(hobbies);
    }
}`
        },
        {
          name: 'Immutability & Tell Don\'t Ask',
          explanation: 'Immutable objects cannot be modified after construction - they have final fields, no setters, and return defensive copies. Immutability provides thread-safety by default and simpler reasoning about object state. Java\'s String is immutable, and Records (Java 14+) are ideal for immutable data carriers. The "Tell Don\'t Ask" principle suggests telling objects what to do rather than asking for data to operate on. This keeps behavior with data, creates rich domain objects, and avoids the anemic domain model anti-pattern.',
          codeExample: `// Immutable class
public final class Money {
    private final BigDecimal amount;
    private final Currency currency;

    public Money(BigDecimal amount, Currency currency) {
        this.amount = amount;
        this.currency = currency;
    }

    // No setters - immutable

    public BigDecimal getAmount() {
        return amount;
    }

    public Currency getCurrency() {
        return currency;
    }

    // Operations return new instances
    public Money add(Money other) {
        if (!this.currency.equals(other.currency)) {
            throw new IllegalArgumentException("Currency mismatch");
        }
        return new Money(this.amount.add(other.amount), this.currency);
    }
}

// Java Record - immutable by default (Java 14+)
public record Point(int x, int y) {
    // Compact constructor for validation
    public Point {
        if (x < 0 || y < 0) {
            throw new IllegalArgumentException("Coordinates must be non-negative");
        }
    }
}

// Tell Don't Ask principle
// Bad: Ask for data, operate externally
if (account.getBalance() >= amount) {
    account.setBalance(account.getBalance() - amount);
}

// Good: Tell object what to do
account.withdraw(amount); // Object handles its own logic`
        }
      ]
    },
    {
      id: 'abstraction',
      name: 'Abstraction',
      icon: '🎨',
      color: '#f59e0b',
      description: 'Hiding complex implementation details and showing only essential features through interfaces and abstract classes.',
      diagram: AbstractionDiagram,
      details: [
        {
          name: 'Interfaces & Pure Abstraction',
          explanation: 'Interfaces provide pure abstraction in Java - a contract without implementation. They define what operations are available without specifying how they work. Multiple interface inheritance is allowed, enabling classes to fulfill multiple contracts. Interfaces segregate concerns and define capabilities. Since Java 8, interfaces can have default methods with implementations and static methods, providing more flexibility while maintaining the abstraction contract.',
          codeExample: `// Interface defines contract without implementation
public interface Drawable {
    void draw();

    // Default method (Java 8+)
    default void drawWithBorder() {
        System.out.println("Drawing border...");
        draw();
    }

    // Static method
    static Drawable createCircle() {
        return new Circle();
    }
}

public interface Resizable {
    void resize(double factor);
}

// Multiple interface implementation
public class Circle implements Drawable, Resizable {
    private double radius;

    public Circle() {
        this.radius = 1.0;
    }

    @Override
    public void draw() {
        System.out.println("Drawing circle with radius: " + radius);
    }

    @Override
    public void resize(double factor) {
        this.radius *= factor;
    }
}

// Client code uses interface, not implementation
public void renderShape(Drawable shape) {
    shape.draw(); // Works with any Drawable
}

Drawable circle = new Circle();
Drawable rectangle = new Rectangle();
renderShape(circle);    // Polymorphic behavior
renderShape(rectangle); // Same interface, different implementation`
        },
        {
          name: 'Abstract Classes vs Interfaces',
          explanation: 'Abstract classes provide partial abstraction with a mix of abstract methods (no implementation) and concrete methods (shared implementation). They are ideal for the Template Method pattern and when subclasses share significant code. Abstract classes can maintain state and have constructors. However, Java\'s single inheritance limits their use compared to interfaces. Choose abstract classes for "is-a" relationships with shared behavior; choose interfaces for defining capabilities and contracts.',
          codeExample: `// Abstract class for shared implementation
public abstract class AbstractRepository<T> {
    protected Connection connection;

    // Concrete method - shared by all subclasses
    protected void openConnection() {
        System.out.println("Opening database connection");
        // Connection logic...
    }

    // Concrete method using template method pattern
    public final T findById(Long id) {
        openConnection();
        T result = doFindById(id);
        closeConnection();
        return result;
    }

    // Abstract method - subclasses must implement
    protected abstract T doFindById(Long id);
    protected abstract void save(T entity);

    protected void closeConnection() {
        System.out.println("Closing connection");
    }
}

public class UserRepository extends AbstractRepository<User> {
    @Override
    protected User doFindById(Long id) {
        System.out.println("Finding user with id: " + id);
        return new User(id);
    }

    @Override
    protected void save(User user) {
        System.out.println("Saving user: " + user.getName());
    }
}

// Interface for capability - can combine with abstract class
public interface Cacheable {
    void cache();
    void invalidateCache();
}

public class CachedUserRepository extends AbstractRepository<User>
                                   implements Cacheable {
    // Inherits from abstract class AND implements interface
}`
        },
        {
          name: 'Programming to Interfaces & Abstraction Levels',
          explanation: 'Programming to interfaces means depending on abstractions rather than concrete classes. Using List<String> instead of ArrayList<String> provides flexibility to change implementations without modifying client code. This supports the Dependency Inversion Principle, enables mocking in tests, and creates loose coupling. Well-designed systems have multiple abstraction levels: high-level business logic, mid-level services, and low-level data access. Each layer abstracts the one below, enabling clean separation and easier maintenance.',
          codeExample: `// Programming to interfaces - depend on abstraction
public interface UserService {
    User findById(Long id);
    void save(User user);
    List<User> findAll();
}

public class UserServiceImpl implements UserService {
    private final UserRepository repository;

    public UserServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public User findById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new UserNotFoundException(id));
    }

    @Override
    public void save(User user) {
        repository.save(user);
    }

    @Override
    public List<User> findAll() {
        return repository.findAll();
    }
}

// Client depends on interface, not implementation
public class UserController {
    private final UserService userService; // Interface type

    public UserController(UserService userService) {
        this.userService = userService;
    }

    public void displayUser(Long id) {
        User user = userService.findById(id);
        System.out.println("User: " + user.getName());
    }
}

// Easy to swap implementations
UserService realService = new UserServiceImpl(new JpaUserRepository());
UserService testService = new MockUserService(); // For testing
UserController controller = new UserController(realService);`
        }
      ]
    },
    {
      id: 'polymorphism',
      name: 'Polymorphism',
      icon: '🦎',
      color: '#ec4899',
      description: 'Ability of objects to take many forms, enabling single interface to represent different underlying implementations.',
      diagram: PolymorphismDiagram,
      details: [
        {
          name: 'Runtime Polymorphism (Dynamic Dispatch)',
          explanation: 'Runtime polymorphism occurs when method resolution happens at runtime based on the actual object type, not the reference type. This is achieved through method overriding where subclasses provide specific implementations of parent methods. The JVM uses dynamic dispatch (virtual method invocation) to determine which overridden method to call. A base class reference can hold a subclass object, and the behavior is determined by the actual object. This is the foundation for many design patterns including Strategy.',
          codeExample: `// Runtime polymorphism through method overriding
public abstract class Shape {
    protected String color;

    public Shape(String color) {
        this.color = color;
    }

    // Method to be overridden
    public abstract double calculateArea();

    public void displayInfo() {
        System.out.println(color + " shape with area: " + calculateArea());
    }
}

public class Rectangle extends Shape {
    private double width, height;

    public Rectangle(String color, double width, double height) {
        super(color);
        this.width = width;
        this.height = height;
    }

    @Override
    public double calculateArea() {
        return width * height;
    }
}

public class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
}

// Dynamic dispatch - runtime determines which method
Shape shape1 = new Rectangle("Red", 5, 3);
Shape shape2 = new Circle("Blue", 4);

shape1.calculateArea(); // Calls Rectangle.calculateArea()
shape2.calculateArea(); // Calls Circle.calculateArea()

// Process any shape uniformly
public void printArea(Shape shape) {
    System.out.println("Area: " + shape.calculateArea());
}`
        },
        {
          name: 'Compile-time Polymorphism (Overloading)',
          explanation: 'Compile-time polymorphism is achieved through method overloading, where the same method name has different parameter lists. The compiler resolves which method to call based on the method signature (parameter types and count). This is also called static binding or early binding. Overloading provides convenience for callers by allowing multiple ways to invoke similar functionality. Constructor overloading is a common example, providing multiple ways to create objects.',
          codeExample: `public class Calculator {
    // Method overloading - same name, different parameters

    public int add(int a, int b) {
        return a + b;
    }

    public int add(int a, int b, int c) {
        return a + b + c;
    }

    public double add(double a, double b) {
        return a + b;
    }

    public String add(String a, String b) {
        return a + b;
    }
}

// Constructor overloading
public class User {
    private String name;
    private String email;
    private int age;

    // Default constructor
    public User() {
        this("Unknown", "unknown@example.com", 0);
    }

    // Constructor with name only
    public User(String name) {
        this(name, "unknown@example.com", 0);
    }

    // Constructor with name and email
    public User(String name, String email) {
        this(name, email, 0);
    }

    // Full constructor
    public User(String name, String email, int age) {
        this.name = name;
        this.email = email;
        this.age = age;
    }
}

// Compiler determines which method/constructor at compile time
Calculator calc = new Calculator();
calc.add(1, 2);       // Calls add(int, int)
calc.add(1.5, 2.5);   // Calls add(double, double)
calc.add("Hello", " World"); // Calls add(String, String)`
        },
        {
          name: 'Interface Polymorphism & Collections',
          explanation: 'Interface polymorphism allows multiple classes implementing the same interface to be treated uniformly through the interface reference. This is heavily used in the Collections framework where List can be ArrayList or LinkedList. Polymorphic collections can hold heterogeneous objects of a common supertype or interface - List<Animal> can contain Dog and Cat objects. This enables plug-in architectures, strategy pattern, and testability through mocking.',
          codeExample: `// Interface polymorphism
public interface PaymentMethod {
    boolean processPayment(double amount);
    String getPaymentType();
}

public class CreditCard implements PaymentMethod {
    @Override
    public boolean processPayment(double amount) {
        System.out.println("Processing $" + amount + " via credit card");
        return true;
    }

    @Override
    public String getPaymentType() {
        return "Credit Card";
    }
}

public class PayPal implements PaymentMethod {
    @Override
    public boolean processPayment(double amount) {
        System.out.println("Processing $" + amount + " via PayPal");
        return true;
    }

    @Override
    public String getPaymentType() {
        return "PayPal";
    }
}

// Polymorphic collection
List<PaymentMethod> paymentMethods = new ArrayList<>();
paymentMethods.add(new CreditCard());
paymentMethods.add(new PayPal());
paymentMethods.add(new BankTransfer());

// Process all uniformly
public void processAllPayments(List<PaymentMethod> methods, double amount) {
    for (PaymentMethod method : methods) {
        System.out.println("Using: " + method.getPaymentType());
        method.processPayment(amount);
    }
}

// Collection framework polymorphism
List<String> arrayList = new ArrayList<>();
List<String> linkedList = new LinkedList<>();

// Method works with any List implementation
public void processList(List<String> list) {
    for (String item : list) {
        System.out.println(item);
    }
}`
        }
      ]
    },
    {
      id: 'design-patterns',
      name: 'Design Patterns',
      icon: '⚙️',
      color: '#14b8a6',
      description: 'Reusable solutions to common software design problems providing templates for writing maintainable code.',
      diagram: DesignPatternsDiagram,
      details: [
        {
          name: 'Creational Patterns',
          explanation: 'Creational patterns deal with object creation mechanisms, providing flexibility in how objects are instantiated. Singleton ensures only one instance exists. Factory Method abstracts object creation to subclasses. Abstract Factory creates families of related objects. Builder constructs complex objects step by step. Prototype creates new objects by cloning existing ones. These patterns decouple client code from concrete classes and control how objects are created.',
          codeExample: `// Singleton - ensures single instance
public class DatabaseConnection {
    private static volatile DatabaseConnection instance;

    private DatabaseConnection() {} // Private constructor

    public static DatabaseConnection getInstance() {
        if (instance == null) {
            synchronized (DatabaseConnection.class) {
                if (instance == null) {
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }
}

// Factory Method - subclasses decide what to create
public abstract class NotificationFactory {
    public abstract Notification createNotification();

    public void sendNotification(String message) {
        Notification notification = createNotification();
        notification.send(message);
    }
}

public class EmailNotificationFactory extends NotificationFactory {
    @Override
    public Notification createNotification() {
        return new EmailNotification();
    }
}

// Builder - construct complex objects step by step
public class User {
    private final String name;
    private final String email;
    private final int age;

    private User(Builder builder) {
        this.name = builder.name;
        this.email = builder.email;
        this.age = builder.age;
    }

    public static class Builder {
        private String name;
        private String email;
        private int age;

        public Builder name(String name) { this.name = name; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder age(int age) { this.age = age; return this; }
        public User build() { return new User(this); }
    }
}

User user = new User.Builder().name("John").email("john@test.com").age(30).build();`
        },
        {
          name: 'Structural Patterns',
          explanation: 'Structural patterns concern class and object composition, forming larger structures from individual parts. Adapter converts one interface to another for compatibility. Decorator adds behavior dynamically without subclassing. Proxy provides a surrogate to control access. Composite treats individual objects and compositions uniformly in tree structures. Facade provides a simplified interface to a complex subsystem. Bridge separates abstraction from implementation.',
          codeExample: `// Adapter - convert incompatible interface
public interface ModernPayment {
    void pay(double amount);
}

public class LegacyPaymentSystem {
    public void makePayment(String amount) {
        System.out.println("Legacy payment: " + amount);
    }
}

public class PaymentAdapter implements ModernPayment {
    private LegacyPaymentSystem legacy;

    public PaymentAdapter(LegacyPaymentSystem legacy) {
        this.legacy = legacy;
    }

    @Override
    public void pay(double amount) {
        legacy.makePayment(String.valueOf(amount));
    }
}

// Decorator - add behavior dynamically
public interface Coffee {
    double getCost();
    String getDescription();
}

public class SimpleCoffee implements Coffee {
    public double getCost() { return 2.0; }
    public String getDescription() { return "Simple coffee"; }
}

public abstract class CoffeeDecorator implements Coffee {
    protected Coffee decoratedCoffee;

    public CoffeeDecorator(Coffee coffee) {
        this.decoratedCoffee = coffee;
    }
}

public class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) { super(coffee); }

    public double getCost() { return decoratedCoffee.getCost() + 0.5; }
    public String getDescription() {
        return decoratedCoffee.getDescription() + ", milk";
    }
}

Coffee coffee = new MilkDecorator(new SimpleCoffee());
// Cost: 2.5, Description: "Simple coffee, milk"`
        },
        {
          name: 'Behavioral Patterns',
          explanation: 'Behavioral patterns deal with object interaction and responsibility distribution. Strategy encapsulates interchangeable algorithms. Observer defines one-to-many dependency for event notification. Command encapsulates requests as objects. Template Method defines algorithm skeleton with customizable steps. Iterator provides sequential access without exposing underlying structure. State allows behavior change based on internal state. These patterns improve communication between objects.',
          codeExample: `// Strategy - encapsulate interchangeable algorithms
public interface SortingStrategy {
    void sort(int[] array);
}

public class QuickSort implements SortingStrategy {
    @Override
    public void sort(int[] array) {
        System.out.println("Sorting using QuickSort");
        // QuickSort implementation
    }
}

public class MergeSort implements SortingStrategy {
    @Override
    public void sort(int[] array) {
        System.out.println("Sorting using MergeSort");
        // MergeSort implementation
    }
}

public class Sorter {
    private SortingStrategy strategy;

    public void setStrategy(SortingStrategy strategy) {
        this.strategy = strategy;
    }

    public void performSort(int[] array) {
        strategy.sort(array);
    }
}

// Observer - publish/subscribe
public interface Observer {
    void update(String message);
}

public class NewsAgency {
    private List<Observer> observers = new ArrayList<>();

    public void addObserver(Observer observer) {
        observers.add(observer);
    }

    public void publishNews(String news) {
        for (Observer observer : observers) {
            observer.update(news);
        }
    }
}

public class NewsSubscriber implements Observer {
    private String name;

    public NewsSubscriber(String name) { this.name = name; }

    @Override
    public void update(String message) {
        System.out.println(name + " received: " + message);
    }
}`
        }
      ]
    },
    {
      id: 'class-design',
      name: 'Class Design Best Practices',
      icon: '📐',
      color: '#6366f1',
      description: 'Best practices for designing robust, maintainable classes including cohesion, coupling, and naming conventions.',
      diagram: ClassDesignDiagram,
      details: [
        {
          name: 'Cohesion & Single Purpose',
          explanation: 'Cohesion measures how strongly related the responsibilities within a class are. High cohesion means all methods and fields work together toward a single purpose. Cohesive classes are easy to name (usually a single noun), easy to understand, and naturally result in low coupling. The Single Responsibility Principle is the application of high cohesion - each class should have one reason to change. When a class is hard to name or has "And" in its description, it likely lacks cohesion.',
          codeExample: `// Low cohesion - multiple unrelated responsibilities
public class UserManager {
    public void createUser(String name) { /* ... */ }
    public void sendEmail(String to, String message) { /* ... */ }
    public void generateReport() { /* ... */ }
    public void backupDatabase() { /* ... */ }
}

// High cohesion - single focused responsibility
public class UserRepository {
    public User findById(Long id) { /* ... */ }
    public void save(User user) { /* ... */ }
    public void delete(User user) { /* ... */ }
    public List<User> findAll() { /* ... */ }
}

public class EmailService {
    public void sendEmail(String to, String subject, String body) { /* ... */ }
    public void sendBulkEmail(List<String> recipients, String message) { /* ... */ }
}

public class ReportGenerator {
    public Report generateUserReport(List<User> users) { /* ... */ }
    public void exportToPDF(Report report) { /* ... */ }
}

// Easy to name = good cohesion
// UserRepository - manages user persistence
// EmailService - handles email operations
// ReportGenerator - creates reports`
        },
        {
          name: 'Coupling & Dependencies',
          explanation: 'Coupling measures the degree of interdependence between classes. Loose coupling is the goal - changes in one class should not require changes in others. Achieve loose coupling through interfaces, dependency injection, and the Law of Demeter (don\'t talk to strangers). Tightly coupled code creates a ripple effect where changes propagate throughout the system. Loose coupling enables independent testing, deployment, and modification of classes.',
          codeExample: `// Tight coupling - direct dependency on concrete class
public class OrderService {
    private MySQLDatabase database = new MySQLDatabase();
    private EmailSender emailSender = new EmailSender();

    public void processOrder(Order order) {
        database.save(order);
        emailSender.send("Order processed");
    }
}

// Loose coupling - depend on abstractions
public interface Database {
    void save(Object entity);
}

public interface NotificationService {
    void notify(String message);
}

public class OrderService {
    private final Database database;
    private final NotificationService notificationService;

    // Dependencies injected
    public OrderService(Database database, NotificationService notificationService) {
        this.database = database;
        this.notificationService = notificationService;
    }

    public void processOrder(Order order) {
        database.save(order);
        notificationService.notify("Order processed");
    }
}

// Law of Demeter - don't chain method calls
// Bad: customer.getAddress().getCity().getName()
// Good:
public class Customer {
    private Address address;

    public String getCityName() {
        return address.getCityName(); // Customer asks Address
    }
}`
        },
        {
          name: 'DRY, YAGNI & Naming Conventions',
          explanation: 'DRY (Don\'t Repeat Yourself) eliminates duplication by extracting common code into reusable methods or classes. Every piece of knowledge should have a single authoritative representation. YAGNI (You Aren\'t Gonna Need It) advises against adding functionality until it is needed - avoid speculative features. Naming conventions make code self-documenting: classes are nouns (User, Order), methods are verbs (calculate, send), and names should reveal intent without abbreviations.',
          codeExample: `// DRY violation - duplicated validation logic
public class UserService {
    public void createUser(String email) {
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Invalid email");
        }
        // Create user...
    }

    public void updateEmail(String email) {
        if (email == null || !email.contains("@")) { // Duplicated!
            throw new IllegalArgumentException("Invalid email");
        }
        // Update email...
    }
}

// DRY applied - extracted common validation
public class EmailValidator {
    public static void validate(String email) {
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Invalid email");
        }
    }
}

public class UserService {
    public void createUser(String email) {
        EmailValidator.validate(email);
        // Create user...
    }

    public void updateEmail(String email) {
        EmailValidator.validate(email);
        // Update email...
    }
}

// Good naming conventions
public class OrderProcessor {                    // Noun - class
    private OrderRepository orderRepository;    // Noun - field

    public Order findOrderById(Long id) {       // Verb phrase - method
        return orderRepository.findById(id);
    }

    public void processOrder(Order order) {     // Verb phrase - method
        validateOrder(order);
        calculateTotal(order);
        saveOrder(order);
    }

    private void validateOrder(Order order) {}  // Intention revealing
    private void calculateTotal(Order order) {} // Clear purpose
    private void saveOrder(Order order) {}      // Self-documenting
}`
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
      { name: 'Java', icon: '☕', page: 'Java' },
      { name: 'Object-Oriented Design', icon: '🏗️', page: 'Object-Oriented Design' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index, item) => {
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
    background: 'linear-gradient(135deg, #0f172a 0%, #365314 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #a3e635, #84cc16)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(132, 204, 22, 0.2)',
    border: '1px solid rgba(132, 204, 22, 0.3)',
    borderRadius: '0.5rem',
    color: '#a3e635',
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
        <h1 style={titleStyle}>Object-Oriented Design</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(132, 204, 22, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(132, 204, 22, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Java
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={CLASS_COLORS}
        />
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
              width: '95vw', maxWidth: '1400px', height: '90vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu}
              colors={CLASS_COLORS}
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

export default Class

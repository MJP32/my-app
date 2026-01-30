/**
 * Object-Oriented Programming - Java Concepts
 *
 * Covers the four pillars of OOP and related concepts:
 * - Encapsulation
 * - Inheritance
 * - Polymorphism
 * - Abstraction
 * Plus: Design Patterns, SOLID Principles
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import { isProblemCompleted } from '../../services/progressService'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const OOP_COLORS = {
  primary: '#3b82f6',
  primaryHover: '#60a5fa',
  bg: 'rgba(59, 130, 246, 0.1)',
  border: 'rgba(59, 130, 246, 0.3)',
  arrow: '#3b82f6',
  hoverBg: 'rgba(59, 130, 246, 0.2)',
  topicBg: 'rgba(59, 130, 246, 0.2)'
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

const EncapsulationDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-enc" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Encapsulation - Data Hiding with Controlled Access
    </text>

    {/* Class Box */}
    <rect x="250" y="50" width="300" height="150" rx="12" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="bold">BankAccount</text>
    <line x1="270" y1="85" x2="530" y2="85" stroke="#3b82f6" strokeWidth="1" opacity="0.5"/>

    {/* Private Fields */}
    <rect x="270" y="95" width="120" height="45" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="1"/>
    <text x="330" y="112" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Private</text>
    <text x="330" y="130" textAnchor="middle" fill="#fca5a5" fontSize="9">- balance: double</text>

    {/* Public Methods */}
    <rect x="410" y="95" width="120" height="45" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="470" y="112" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Public</text>
    <text x="470" y="130" textAnchor="middle" fill="#86efac" fontSize="9">+ getBalance()</text>

    {/* Getter/Setter */}
    <rect x="310" y="150" width="180" height="35" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="400" y="172" textAnchor="middle" fill="#a78bfa" fontSize="10">deposit() / withdraw()</text>

    {/* External Access Arrow */}
    <rect x="50" y="100" width="80" height="40" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="90" y="125" textAnchor="middle" fill="#fbbf24" fontSize="10">External</text>
    <line x1="130" y1="120" x2="245" y2="120" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-enc)" strokeDasharray="5,3"/>
    <text x="185" y="110" textAnchor="middle" fill="#94a3b8" fontSize="8">via public API</text>
  </svg>
)

const InheritanceDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-inh" markerWidth="12" markerHeight="8" refX="0" refY="4" orient="auto">
        <polygon points="12 4, 0 0, 0 8" fill="none" stroke="#3b82f6" strokeWidth="2" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Inheritance - IS-A Relationship Hierarchy
    </text>

    {/* Parent Class */}
    <rect x="300" y="45" width="200" height="70" rx="10" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="70" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">Animal (Parent)</text>
    <text x="400" y="90" textAnchor="middle" fill="#c4b5fd" fontSize="10">+ name: String</text>
    <text x="400" y="105" textAnchor="middle" fill="#c4b5fd" fontSize="10">+ makeSound()</text>

    {/* Inheritance Arrows */}
    <line x1="280" y1="150" x2="350" y2="120" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-inh)"/>
    <line x1="520" y1="150" x2="450" y2="120" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-inh)"/>

    {/* Child Classes */}
    <rect x="120" y="160" width="180" height="80" rx="10" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="210" y="185" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">Dog (Child)</text>
    <text x="210" y="205" textAnchor="middle" fill="#86efac" fontSize="10">+ breed: String</text>
    <text x="210" y="220" textAnchor="middle" fill="#86efac" fontSize="10">+ makeSound() {"bark"}</text>

    <rect x="500" y="160" width="180" height="80" rx="10" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="590" y="185" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Cat (Child)</text>
    <text x="590" y="205" textAnchor="middle" fill="#fcd34d" fontSize="10">+ indoor: boolean</text>
    <text x="590" y="220" textAnchor="middle" fill="#fcd34d" fontSize="10">+ makeSound() {"meow"}</text>

    {/* Labels */}
    <text x="270" y="140" textAnchor="middle" fill="#60a5fa" fontSize="9">extends</text>
    <text x="530" y="140" textAnchor="middle" fill="#60a5fa" fontSize="9">extends</text>
  </svg>
)

const PolymorphismDiagram = () => (
  <svg viewBox="0 0 800 260" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-poly" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Polymorphism - One Interface, Multiple Implementations
    </text>

    {/* Method Call */}
    <rect x="50" y="90" width="140" height="50" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="120" y="115" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">shape.draw()</text>
    <text x="120" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">Same call</text>

    {/* Arrow to branches */}
    <line x1="190" y1="115" x2="250" y2="115" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-poly)"/>

    {/* Runtime Check */}
    <polygon points="300,115 340,75 380,115 340,155" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="340" y="118" textAnchor="middle" fill="#fbbf24" fontSize="9">Runtime</text>

    {/* Branches */}
    <line x1="380" y1="95" x2="450" y2="60" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-poly)"/>
    <line x1="380" y1="115" x2="450" y2="115" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-poly)"/>
    <line x1="380" y1="135" x2="450" y2="170" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrow-poly)"/>

    {/* Different Implementations */}
    <rect x="460" y="35" width="160" height="50" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="540" y="55" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Circle.draw()</text>
    <text x="540" y="72" textAnchor="middle" fill="#86efac" fontSize="9">Draws circle</text>

    <rect x="460" y="90" width="160" height="50" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="540" y="110" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Rectangle.draw()</text>
    <text x="540" y="127" textAnchor="middle" fill="#c4b5fd" fontSize="9">Draws rectangle</text>

    <rect x="460" y="145" width="160" height="50" rx="8" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
    <text x="540" y="165" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Triangle.draw()</text>
    <text x="540" y="182" textAnchor="middle" fill="#f9a8d4" fontSize="9">Draws triangle</text>

    {/* Results */}
    <line x1="620" y1="60" x2="680" y2="60" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-poly)"/>
    <line x1="620" y1="115" x2="680" y2="115" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow-poly)"/>
    <line x1="620" y1="170" x2="680" y2="170" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrow-poly)"/>

    <circle cx="720" cy="60" r="20" fill="none" stroke="#22c55e" strokeWidth="2"/>
    <rect x="700" y="100" width="40" height="30" fill="none" stroke="#8b5cf6" strokeWidth="2"/>
    <polygon points="720,150 700,190 740,190" fill="none" stroke="#ec4899" strokeWidth="2"/>
  </svg>
)

const AbstractionDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-abs" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Abstraction - Hiding Complexity, Exposing Essentials
    </text>

    {/* User/Client */}
    <rect x="50" y="80" width="100" height="80" rx="10" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="100" y="110" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Client</text>
    <text x="100" y="130" textAnchor="middle" fill="#94a3b8" fontSize="9">Uses simple</text>
    <text x="100" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">interface</text>

    {/* Arrow */}
    <line x1="150" y1="120" x2="220" y2="120" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-abs)"/>

    {/* Abstract Interface */}
    <rect x="230" y="60" width="180" height="120" rx="10" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,3"/>
    <text x="320" y="85" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold" fontStyle="italic">Vehicle (Abstract)</text>
    <line x1="245" y1="95" x2="395" y2="95" stroke="#8b5cf6" strokeWidth="1" opacity="0.5"/>
    <text x="320" y="115" textAnchor="middle" fill="#c4b5fd" fontSize="10">+ start()</text>
    <text x="320" y="135" textAnchor="middle" fill="#c4b5fd" fontSize="10">+ stop()</text>
    <text x="320" y="155" textAnchor="middle" fill="#c4b5fd" fontSize="10">+ accelerate()</text>

    {/* Arrow to implementation */}
    <line x1="410" y1="120" x2="480" y2="120" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-abs)"/>
    <text x="445" y="108" textAnchor="middle" fill="#94a3b8" fontSize="8">implements</text>

    {/* Concrete Implementation */}
    <rect x="490" y="50" width="250" height="140" rx="10" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="615" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Car (Concrete)</text>
    <line x1="505" y1="85" x2="725" y2="85" stroke="#22c55e" strokeWidth="1" opacity="0.5"/>
    <text x="615" y="105" textAnchor="middle" fill="#86efac" fontSize="9">- engine: Engine</text>
    <text x="615" y="120" textAnchor="middle" fill="#86efac" fontSize="9">- transmission: Transmission</text>
    <text x="615" y="135" textAnchor="middle" fill="#86efac" fontSize="9">- fuelSystem: FuelSystem</text>
    <text x="615" y="155" textAnchor="middle" fill="#64748b" fontSize="8">Hidden complexity...</text>
    <text x="615" y="175" textAnchor="middle" fill="#22c55e" fontSize="9">+ start() - complex logic inside</text>
  </svg>
)

const InterfaceDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-int" markerWidth="12" markerHeight="8" refX="0" refY="4" orient="auto">
        <polygon points="12 4, 0 0, 0 8" fill="none" stroke="#3b82f6" strokeWidth="2" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Interface - Contract for Multiple Implementations
    </text>

    {/* Interface */}
    <rect x="300" y="45" width="200" height="60" rx="10" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,3"/>
    <text x="400" y="68" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">{`&lt;&lt;interface&gt;&gt;`}</text>
    <text x="400" y="85" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">Flyable</text>
    <text x="400" y="100" textAnchor="middle" fill="#bfdbfe" fontSize="9">+ fly(): void</text>

    {/* Implementation arrows */}
    <line x1="240" y1="140" x2="340" y2="110" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-int)" strokeDasharray="5,3"/>
    <line x1="400" y1="140" x2="400" y2="110" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-int)" strokeDasharray="5,3"/>
    <line x1="560" y1="140" x2="460" y2="110" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-int)" strokeDasharray="5,3"/>

    {/* Implementing classes */}
    <rect x="100" y="150" width="140" height="55" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="170" y="175" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Bird</text>
    <text x="170" y="193" textAnchor="middle" fill="#86efac" fontSize="9">fly(): flap wings</text>

    <rect x="330" y="150" width="140" height="55" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="175" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Airplane</text>
    <text x="400" y="193" textAnchor="middle" fill="#fcd34d" fontSize="9">fly(): use engines</text>

    <rect x="560" y="150" width="140" height="55" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="630" y="175" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Drone</text>
    <text x="630" y="193" textAnchor="middle" fill="#c4b5fd" fontSize="9">fly(): use rotors</text>
  </svg>
)

const CompositionDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="diamond-comp" markerWidth="12" markerHeight="12" refX="12" refY="6" orient="auto">
        <polygon points="0 6, 6 0, 12 6, 6 12" fill="#3b82f6" stroke="#3b82f6" strokeWidth="1" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Composition - HAS-A Relationship (Strong Ownership)
    </text>

    {/* Container class */}
    <rect x="300" y="50" width="200" height="80" rx="10" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">Car</text>
    <text x="400" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">- engine: Engine</text>
    <text x="400" y="112" textAnchor="middle" fill="#94a3b8" fontSize="10">- wheels: Wheel[]</text>

    {/* Composed parts */}
    <line x1="300" y1="90" x2="180" y2="90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#diamond-comp)"/>
    <rect x="70" y="65" width="110" height="50" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="125" y="95" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Engine</text>

    <line x1="500" y1="90" x2="600" y2="90" stroke="#3b82f6" strokeWidth="2" markerStart="url(#diamond-comp)"/>
    <rect x="600" y="65" width="110" height="50" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="655" y="95" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Wheel[4]</text>

    {/* Note */}
    <text x="400" y="160" textAnchor="middle" fill="#64748b" fontSize="10">When Car is destroyed, Engine and Wheels are also destroyed</text>
    <text x="400" y="178" textAnchor="middle" fill="#64748b" fontSize="10">(Parts cannot exist independently)</text>
  </svg>
)

const SingletonDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-sing" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Singleton Pattern - Single Instance Guarantee
    </text>

    {/* Multiple clients */}
    <rect x="50" y="60" width="80" height="40" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="90" y="85" textAnchor="middle" fill="#fbbf24" fontSize="9">Client A</text>

    <rect x="50" y="110" width="80" height="40" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="90" y="135" textAnchor="middle" fill="#fbbf24" fontSize="9">Client B</text>

    <rect x="50" y="160" width="80" height="40" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="90" y="185" textAnchor="middle" fill="#fbbf24" fontSize="9">Client C</text>

    {/* Arrows to singleton */}
    <line x1="130" y1="80" x2="280" y2="110" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-sing)"/>
    <line x1="130" y1="130" x2="280" y2="120" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-sing)"/>
    <line x1="130" y1="180" x2="280" y2="130" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-sing)"/>

    {/* getInstance() label */}
    <text x="200" y="100" textAnchor="middle" fill="#94a3b8" fontSize="8">getInstance()</text>

    {/* Singleton class */}
    <rect x="290" y="70" width="220" height="100" rx="10" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="95" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">DatabaseConnection</text>
    <line x1="305" y1="105" x2="495" y2="105" stroke="#8b5cf6" strokeWidth="1" opacity="0.5"/>
    <text x="400" y="125" textAnchor="middle" fill="#c4b5fd" fontSize="9">- static instance: DatabaseConnection</text>
    <text x="400" y="145" textAnchor="middle" fill="#c4b5fd" fontSize="9">- private constructor()</text>
    <text x="400" y="160" textAnchor="middle" fill="#c4b5fd" fontSize="9">+ static getInstance(): DatabaseConnection</text>

    {/* Single instance */}
    <line x1="510" y1="120" x2="580" y2="120" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-sing)"/>
    <rect x="590" y="90" width="150" height="60" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="665" y="115" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Single Instance</text>
    <text x="665" y="135" textAnchor="middle" fill="#86efac" fontSize="9">Shared by all clients</text>
  </svg>
)

const ObserverDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-obs" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Observer Pattern - Publish-Subscribe Notification
    </text>

    {/* Subject */}
    <rect x="50" y="70" width="200" height="100" rx="10" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="150" y="95" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Subject (Observable)</text>
    <line x1="65" y1="105" x2="235" y2="105" stroke="#8b5cf6" strokeWidth="1" opacity="0.5"/>
    <text x="150" y="125" textAnchor="middle" fill="#c4b5fd" fontSize="9">{`- observers: List&lt;Observer&gt;`}</text>
    <text x="150" y="145" textAnchor="middle" fill="#c4b5fd" fontSize="9">+ attach(observer)</text>
    <text x="150" y="160" textAnchor="middle" fill="#c4b5fd" fontSize="9">+ notifyAll()</text>

    {/* Notification arrows */}
    <line x1="250" y1="100" x2="400" y2="70" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-obs)"/>
    <line x1="250" y1="120" x2="400" y2="120" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-obs)"/>
    <line x1="250" y1="140" x2="400" y2="170" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-obs)"/>

    {/* notify label */}
    <text x="320" y="80" textAnchor="middle" fill="#4ade80" fontSize="8">notify()</text>

    {/* Observers */}
    <rect x="410" y="45" width="160" height="50" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="490" y="65" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">EmailNotifier</text>
    <text x="490" y="82" textAnchor="middle" fill="#93c5fd" fontSize="9">update(): send email</text>

    <rect x="410" y="100" width="160" height="50" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="490" y="120" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">SMSNotifier</text>
    <text x="490" y="137" textAnchor="middle" fill="#fcd34d" fontSize="9">update(): send SMS</text>

    <rect x="410" y="155" width="160" height="50" rx="8" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
    <text x="490" y="175" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">LogObserver</text>
    <text x="490" y="192" textAnchor="middle" fill="#f9a8d4" fontSize="9">update(): log event</text>

    {/* State change trigger */}
    <rect x="620" y="100" width="130" height="50" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="685" y="120" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">State Change</text>
    <text x="685" y="137" textAnchor="middle" fill="#86efac" fontSize="8">triggers notify</text>
  </svg>
)

const SOLIDDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      SOLID Principles - Five Pillars of Clean OOP Design
    </text>

    {/* S */}
    <rect x="50" y="50" width="120" height="120" rx="10" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="110" y="85" textAnchor="middle" fill="#60a5fa" fontSize="28" fontWeight="bold">S</text>
    <text x="110" y="110" textAnchor="middle" fill="#93c5fd" fontSize="9">Single</text>
    <text x="110" y="125" textAnchor="middle" fill="#93c5fd" fontSize="9">Responsibility</text>
    <text x="110" y="155" textAnchor="middle" fill="#64748b" fontSize="8">One reason</text>
    <text x="110" y="165" textAnchor="middle" fill="#64748b" fontSize="8">to change</text>

    {/* O */}
    <rect x="190" y="50" width="120" height="120" rx="10" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="250" y="85" textAnchor="middle" fill="#4ade80" fontSize="28" fontWeight="bold">O</text>
    <text x="250" y="110" textAnchor="middle" fill="#86efac" fontSize="9">Open/Closed</text>
    <text x="250" y="155" textAnchor="middle" fill="#64748b" fontSize="8">Open extend</text>
    <text x="250" y="165" textAnchor="middle" fill="#64748b" fontSize="8">Closed modify</text>

    {/* L */}
    <rect x="330" y="50" width="120" height="120" rx="10" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="390" y="85" textAnchor="middle" fill="#fbbf24" fontSize="28" fontWeight="bold">L</text>
    <text x="390" y="110" textAnchor="middle" fill="#fcd34d" fontSize="9">Liskov</text>
    <text x="390" y="125" textAnchor="middle" fill="#fcd34d" fontSize="9">Substitution</text>
    <text x="390" y="155" textAnchor="middle" fill="#64748b" fontSize="8">Subtypes must</text>
    <text x="390" y="165" textAnchor="middle" fill="#64748b" fontSize="8">be substitutable</text>

    {/* I */}
    <rect x="470" y="50" width="120" height="120" rx="10" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="530" y="85" textAnchor="middle" fill="#a78bfa" fontSize="28" fontWeight="bold">I</text>
    <text x="530" y="110" textAnchor="middle" fill="#c4b5fd" fontSize="9">Interface</text>
    <text x="530" y="125" textAnchor="middle" fill="#c4b5fd" fontSize="9">Segregation</text>
    <text x="530" y="155" textAnchor="middle" fill="#64748b" fontSize="8">Small, specific</text>
    <text x="530" y="165" textAnchor="middle" fill="#64748b" fontSize="8">interfaces</text>

    {/* D */}
    <rect x="610" y="50" width="120" height="120" rx="10" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
    <text x="670" y="85" textAnchor="middle" fill="#f472b6" fontSize="28" fontWeight="bold">D</text>
    <text x="670" y="110" textAnchor="middle" fill="#f9a8d4" fontSize="9">Dependency</text>
    <text x="670" y="125" textAnchor="middle" fill="#f9a8d4" fontSize="9">Inversion</text>
    <text x="670" y="155" textAnchor="middle" fill="#64748b" fontSize="8">Depend on</text>
    <text x="670" y="165" textAnchor="middle" fill="#64748b" fontSize="8">abstractions</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function ObjectOrientedProgramming({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const handleProgressUpdate = () => setRefreshKey(prev => prev + 1)
    window.addEventListener('progressUpdate', handleProgressUpdate)
    return () => window.removeEventListener('progressUpdate', handleProgressUpdate)
  }, [])

  const [selectedProblem, setSelectedProblem] = useState(null)
  const [userCode, setUserCode] = useState('')
  const [showSolution, setShowSolution] = useState(false)

  const openProblem = (problem) => { setSelectedProblem(problem); setUserCode(problem.starterCode); setShowSolution(false) }
  const closeProblem = () => { setSelectedProblem(null); setUserCode(''); setShowSolution(false) }

  const practiceProblems = [
    { id: 1, title: 'Design a Class Hierarchy', difficulty: 'Medium', description: 'Design a class hierarchy for a vehicle system with inheritance and polymorphism.', example: 'Vehicle → Car, Motorcycle, Truck',
      instructions: `Design a vehicle class hierarchy.

**Requirements:**
1. Create abstract Vehicle class with common properties
2. Create Car, Motorcycle subclasses
3. Override methods appropriately
4. Demonstrate polymorphism`,
      starterCode: `// TODO: Create abstract Vehicle class
// - Properties: brand, year
// - Abstract method: getDescription()
// - Concrete method: start()

// TODO: Create Car extends Vehicle
// - Additional property: numDoors

// TODO: Create Motorcycle extends Vehicle
// - Additional property: hasSidecar

public class VehicleDemo {
    public static void main(String[] args) {
        // TODO: Create instances and demonstrate polymorphism
    }
}`,
      solution: `abstract class Vehicle {
    protected String brand;
    protected int year;
    
    public Vehicle(String brand, int year) {
        this.brand = brand;
        this.year = year;
    }
    
    public void start() {
        System.out.println(brand + " starting...");
    }
    
    public abstract String getDescription();
}

class Car extends Vehicle {
    private int numDoors;
    
    public Car(String brand, int year, int numDoors) {
        super(brand, year);
        this.numDoors = numDoors;
    }
    
    @Override
    public String getDescription() {
        return year + " " + brand + " with " + numDoors + " doors";
    }
}

class Motorcycle extends Vehicle {
    private boolean hasSidecar;
    
    public Motorcycle(String brand, int year, boolean hasSidecar) {
        super(brand, year);
        this.hasSidecar = hasSidecar;
    }
    
    @Override
    public String getDescription() {
        return year + " " + brand + (hasSidecar ? " with sidecar" : "");
    }
}

public class VehicleDemo {
    public static void main(String[] args) {
        Vehicle[] vehicles = {
            new Car("Toyota", 2023, 4),
            new Motorcycle("Harley", 2022, false)
        };
        
        for (Vehicle v : vehicles) {
            v.start();
            System.out.println(v.getDescription());
        }
    }
}`
    },
    { id: 2, title: 'Implement Interface', difficulty: 'Easy', description: 'Create an interface for a payment system and implement multiple payment methods.', example: 'PaymentMethod interface → CreditCard, PayPal, BankTransfer',
      instructions: `Create a payment interface with implementations.

**Requirements:**
1. Create PaymentMethod interface with pay() method
2. Implement CreditCard and PayPal classes
3. Process payments polymorphically`,
      starterCode: `// TODO: Create PaymentMethod interface
// - Method: boolean pay(double amount)

// TODO: Create CreditCard implements PaymentMethod

// TODO: Create PayPal implements PaymentMethod

public class PaymentDemo {
    public static void main(String[] args) {
        // TODO: Process payments
    }
}`,
      solution: `interface PaymentMethod {
    boolean pay(double amount);
    String getMethodName();
}

class CreditCard implements PaymentMethod {
    private String cardNumber;
    
    public CreditCard(String cardNumber) {
        this.cardNumber = cardNumber;
    }
    
    @Override
    public boolean pay(double amount) {
        System.out.println("Charging $" + amount + " to card ending in " + cardNumber.substring(cardNumber.length() - 4));
        return true;
    }
    
    @Override
    public String getMethodName() { return "Credit Card"; }
}

class PayPal implements PaymentMethod {
    private String email;
    
    public PayPal(String email) {
        this.email = email;
    }
    
    @Override
    public boolean pay(double amount) {
        System.out.println("Sending $" + amount + " via PayPal to " + email);
        return true;
    }
    
    @Override
    public String getMethodName() { return "PayPal"; }
}

public class PaymentDemo {
    public static void main(String[] args) {
        PaymentMethod[] methods = {
            new CreditCard("1234567890123456"),
            new PayPal("user@email.com")
        };
        
        for (PaymentMethod pm : methods) {
            System.out.println("Using " + pm.getMethodName());
            pm.pay(99.99);
        }
    }
}`
    },
    { id: 3, title: 'Apply SOLID Principles', difficulty: 'Hard', description: 'Refactor given code to follow Single Responsibility and Open/Closed principles.', example: 'Split monolithic class into focused components',
      instructions: `Refactor code to follow SOLID principles.

**Requirements:**
1. Split responsibilities into separate classes
2. Use interfaces for extensibility
3. Apply dependency injection`,
      starterCode: `// BAD: This class does too much (violates SRP)
class OrderProcessor {
    public void processOrder(String item, double price, String email) {
        // Calculate total
        double tax = price * 0.1;
        double total = price + tax;
        
        // Save to database
        System.out.println("Saving order to DB: " + item);
        
        // Send email
        System.out.println("Sending email to: " + email);
        
        // Print receipt
        System.out.println("Receipt: " + item + " - $" + total);
    }
}

// TODO: Refactor into separate classes:
// - PriceCalculator
// - OrderRepository  
// - EmailService
// - ReceiptPrinter`,
      solution: `// Single Responsibility: Each class has one job

interface PriceCalculator {
    double calculateTotal(double price);
}

class TaxCalculator implements PriceCalculator {
    private double taxRate;
    
    public TaxCalculator(double taxRate) {
        this.taxRate = taxRate;
    }
    
    @Override
    public double calculateTotal(double price) {
        return price + (price * taxRate);
    }
}

interface OrderRepository {
    void save(String item, double total);
}

class DatabaseOrderRepository implements OrderRepository {
    @Override
    public void save(String item, double total) {
        System.out.println("Saving to DB: " + item + " - $" + total);
    }
}

interface NotificationService {
    void notify(String recipient, String message);
}

class EmailService implements NotificationService {
    @Override
    public void notify(String email, String message) {
        System.out.println("Email to " + email + ": " + message);
    }
}

// Open/Closed: Open for extension, closed for modification
class OrderProcessor {
    private PriceCalculator calculator;
    private OrderRepository repository;
    private NotificationService notifier;
    
    public OrderProcessor(PriceCalculator calc, OrderRepository repo, NotificationService notif) {
        this.calculator = calc;
        this.repository = repo;
        this.notifier = notif;
    }
    
    public void process(String item, double price, String email) {
        double total = calculator.calculateTotal(price);
        repository.save(item, total);
        notifier.notify(email, "Order confirmed: " + item);
    }
}

public class SOLIDDemo {
    public static void main(String[] args) {
        OrderProcessor processor = new OrderProcessor(
            new TaxCalculator(0.1),
            new DatabaseOrderRepository(),
            new EmailService()
        );
        processor.process("Laptop", 999.99, "user@email.com");
    }
}`
    },
    { id: 4, title: 'Encapsulation Practice', difficulty: 'Easy', description: 'Convert public fields to private with proper getters/setters and validation.', example: 'Add validation in setAge() to reject negative values',
      instructions: `Apply encapsulation to a Person class.

**Requirements:**
1. Make fields private
2. Add getters and setters
3. Add validation in setAge()`,
      starterCode: `// BAD: Public fields - no encapsulation
class Person {
    public String name;
    public int age;
}

// TODO: Refactor with proper encapsulation
// - Private fields
// - Getters and setters
// - Validation: age must be 0-150

public class EncapsulationDemo {
    public static void main(String[] args) {
        Person p = new Person();
        // p.setName("John");
        // p.setAge(25);
    }
}`,
      solution: `class Person {
    private String name;
    private int age;
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
        this.name = name;
    }
    
    public int getAge() {
        return age;
    }
    
    public void setAge(int age) {
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException("Age must be between 0 and 150");
        }
        this.age = age;
    }
}

public class EncapsulationDemo {
    public static void main(String[] args) {
        Person p = new Person();
        p.setName("John");
        p.setAge(25);
        System.out.println(p.getName() + " is " + p.getAge());
        
        try {
            p.setAge(-5); // Will throw exception
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`
    }
  ]

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'encapsulation',
      name: 'Encapsulation',
      icon: '🔒',
      color: '#3b82f6',
      description: 'Bundle data and methods that operate on that data within a single unit, restricting direct access to some components.',
      diagram: EncapsulationDiagram,
      details: [
        {
          name: 'Access Modifiers',
          diagram: EncapsulationDiagram,
          explanation: 'Java provides four access modifiers to control visibility: private (class only), default/package-private (same package), protected (same package + subclasses), and public (everywhere). Properly using these modifiers is the foundation of encapsulation - hide implementation details and expose only what is necessary.',
          codeExample: `public class BankAccount {
    // Private - only accessible within this class
    private double balance;
    private String accountNumber;

    // Protected - accessible in subclasses
    protected String accountType;

    // Public - accessible everywhere
    public String ownerName;

    // Package-private (default) - accessible within same package
    int transactionCount;

    // Constructor
    public BankAccount(String owner, double initialBalance) {
        this.ownerName = owner;
        this.balance = initialBalance;
    }

    // Public getter - controlled access to private field
    public double getBalance() {
        return balance;
    }

    // Public setter with validation
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            transactionCount++;
        }
    }
}`
        },
        {
          name: 'Getters and Setters',
          explanation: 'Getters and setters (accessors and mutators) provide controlled access to private fields. They allow you to add validation, logging, or computed values while maintaining a clean interface. Modern IDEs can auto-generate these, but you should only create them when needed - not every field needs both a getter and setter.',
          codeExample: `public class Employee {
    private String name;
    private double salary;
    private LocalDate hireDate;

    // Simple getter
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

    // Getter with computation
    public int getYearsEmployed() {
        return Period.between(hireDate, LocalDate.now()).getYears();
    }

    // Setter with business rules
    public void setSalary(double salary) {
        if (salary < 0) {
            throw new IllegalArgumentException("Salary cannot be negative");
        }
        if (salary > this.salary * 1.5) {
            // Log significant raise for audit
            System.out.println("Large salary increase detected");
        }
        this.salary = salary;
    }

    // Read-only property (no setter)
    public LocalDate getHireDate() {
        return hireDate;  // Immutable, so safe to return
    }
}`
        },
        {
          name: 'Data Hiding Benefits',
          explanation: 'Data hiding protects object integrity by preventing invalid states. It enables you to change internal implementation without affecting client code, add validation and business rules, and maintain invariants. This separation between interface and implementation is key to building maintainable systems.',
          codeExample: `public class Temperature {
    // Hidden implementation - stored in Celsius internally
    private double celsius;

    public Temperature(double celsius) {
        setCelsius(celsius);  // Use setter for validation
    }

    public double getCelsius() {
        return celsius;
    }

    public void setCelsius(double celsius) {
        // Absolute zero validation
        if (celsius < -273.15) {
            throw new IllegalArgumentException(
                "Temperature cannot be below absolute zero");
        }
        this.celsius = celsius;
    }

    // Computed property - no storage needed
    public double getFahrenheit() {
        return celsius * 9/5 + 32;
    }

    // Implementation can change without breaking clients
    // Originally might have stored both, now just computes
    public void setFahrenheit(double fahrenheit) {
        setCelsius((fahrenheit - 32) * 5/9);
    }

    // Kelvin support added later - no breaking change
    public double getKelvin() {
        return celsius + 273.15;
    }
}`
        }
      ]
    },
    {
      id: 'inheritance',
      name: 'Inheritance',
      icon: '🌳',
      color: '#22c55e',
      description: 'Create new classes based on existing classes, inheriting their attributes and behaviors while adding or modifying functionality.',
      diagram: InheritanceDiagram,
      details: [
        {
          name: 'extends Keyword',
          diagram: InheritanceDiagram,
          explanation: 'Java uses the extends keyword to create inheritance relationships. A subclass inherits all non-private members from its parent class. Java supports single inheritance for classes (one parent) but multiple inheritance for interfaces. The subclass can add new fields/methods and override inherited methods.',
          codeExample: `// Parent class (superclass)
public class Animal {
    protected String name;
    protected int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void eat() {
        System.out.println(name + " is eating");
    }

    public void sleep() {
        System.out.println(name + " is sleeping");
    }
}

// Child class (subclass) - inherits from Animal
public class Dog extends Animal {
    private String breed;

    public Dog(String name, int age, String breed) {
        super(name, age);  // Call parent constructor
        this.breed = breed;
    }

    // New method specific to Dog
    public void bark() {
        System.out.println(name + " says: Woof!");
    }

    // Override inherited method
    @Override
    public void eat() {
        System.out.println(name + " the " + breed + " is eating dog food");
    }
}

// Usage
Dog buddy = new Dog("Buddy", 3, "Golden Retriever");
buddy.eat();    // "Buddy the Golden Retriever is eating dog food"
buddy.sleep();  // "Buddy is sleeping" (inherited)
buddy.bark();   // "Buddy says: Woof!" (Dog-specific)`
        },
        {
          name: 'super Keyword',
          explanation: 'The super keyword refers to the parent class. Use super() to call the parent constructor (must be first statement in constructor). Use super.method() to call an overridden parent method. This is essential for extending behavior rather than completely replacing it.',
          codeExample: `public class Vehicle {
    protected String brand;
    protected int year;

    public Vehicle(String brand, int year) {
        this.brand = brand;
        this.year = year;
    }

    public void start() {
        System.out.println("Vehicle starting...");
    }

    public void displayInfo() {
        System.out.println(year + " " + brand);
    }
}

public class Car extends Vehicle {
    private int numDoors;

    public Car(String brand, int year, int numDoors) {
        // super() must be first statement
        super(brand, year);
        this.numDoors = numDoors;
    }

    @Override
    public void start() {
        // Call parent's start first
        super.start();
        // Then add car-specific behavior
        System.out.println("Engine warming up...");
        System.out.println("Car ready to drive!");
    }

    @Override
    public void displayInfo() {
        // Extend parent's behavior
        super.displayInfo();
        System.out.println("Doors: " + numDoors);
    }
}

// Usage
Car myCar = new Car("Toyota", 2023, 4);
myCar.start();
// Output:
// Vehicle starting...
// Engine warming up...
// Car ready to drive!`
        },
        {
          name: 'Method Overriding',
          explanation: 'Method overriding allows a subclass to provide a specific implementation of a method already defined in its parent class. Use @Override annotation to catch errors at compile time. The overriding method must have the same signature, return type (or covariant), and cannot have more restrictive access.',
          codeExample: `public class Shape {
    protected String color;

    public Shape(String color) {
        this.color = color;
    }

    // Method to be overridden
    public double calculateArea() {
        return 0;  // Default implementation
    }

    public void display() {
        System.out.println("A " + color + " shape");
    }
}

public class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override  // Compiler checks this is valid override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }

    @Override
    public void display() {
        System.out.println("A " + color + " circle with radius " + radius);
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

// Polymorphic usage
Shape[] shapes = {
    new Circle("red", 5),
    new Rectangle("blue", 4, 6)
};

for (Shape shape : shapes) {
    System.out.println("Area: " + shape.calculateArea());
}`
        },
        {
          name: 'Inheritance vs Composition',
          diagram: CompositionDiagram,
          explanation: 'Inheritance (IS-A) creates tight coupling - prefer composition (HAS-A) when possible. Composition offers more flexibility, easier testing, and avoids fragile base class problems. Use inheritance for true "is-a" relationships and when you need polymorphism. Use composition for "has-a" relationships and code reuse.',
          codeExample: `// Inheritance approach (tightly coupled)
public class ElectricCar extends Car {
    private Battery battery;
    // Problem: What if we need a hybrid that's both electric and gas?
}

// Composition approach (flexible)
public class Vehicle {
    private Engine engine;        // HAS-A engine
    private Transmission trans;   // HAS-A transmission

    // Can swap implementations at runtime
    public void setEngine(Engine engine) {
        this.engine = engine;
    }
}

// Engine is an interface - easy to swap
public interface Engine {
    void start();
    void stop();
}

public class GasEngine implements Engine {
    public void start() { /* gas engine logic */ }
    public void stop() { /* ... */ }
}

public class ElectricMotor implements Engine {
    public void start() { /* electric motor logic */ }
    public void stop() { /* ... */ }
}

public class HybridEngine implements Engine {
    private GasEngine gas = new GasEngine();
    private ElectricMotor electric = new ElectricMotor();

    public void start() {
        electric.start();  // Start on electric
    }
    public void stop() { /* ... */ }
}

// Usage - flexible and testable
Vehicle car = new Vehicle();
car.setEngine(new ElectricMotor());  // Electric car
car.setEngine(new HybridEngine());   // Now it's a hybrid!`
        }
      ]
    },
    {
      id: 'polymorphism',
      name: 'Polymorphism',
      icon: '🔄',
      color: '#8b5cf6',
      description: 'Objects of different classes can be treated as objects of a common superclass, with each responding appropriately to method calls.',
      diagram: PolymorphismDiagram,
      details: [
        {
          name: 'Runtime Polymorphism',
          diagram: PolymorphismDiagram,
          explanation: 'Runtime (dynamic) polymorphism occurs when the JVM determines which method to call at runtime based on the actual object type, not the reference type. This is achieved through method overriding. It enables writing code that works with base types while actual behavior depends on concrete implementations.',
          codeExample: `public abstract class Payment {
    protected double amount;

    public Payment(double amount) {
        this.amount = amount;
    }

    // Abstract method - must be implemented by subclasses
    public abstract void process();

    public abstract String getPaymentMethod();
}

public class CreditCardPayment extends Payment {
    private String cardNumber;

    public CreditCardPayment(double amount, String cardNumber) {
        super(amount);
        this.cardNumber = cardNumber;
    }

    @Override
    public void process() {
        System.out.println("Processing credit card payment of $" + amount);
        System.out.println("Card: ****" + cardNumber.substring(12));
    }

    @Override
    public String getPaymentMethod() {
        return "Credit Card";
    }
}

public class PayPalPayment extends Payment {
    private String email;

    public PayPalPayment(double amount, String email) {
        super(amount);
        this.email = email;
    }

    @Override
    public void process() {
        System.out.println("Processing PayPal payment of $" + amount);
        System.out.println("PayPal account: " + email);
    }

    @Override
    public String getPaymentMethod() {
        return "PayPal";
    }
}

// Polymorphic processing
public class PaymentProcessor {
    public void processPayment(Payment payment) {
        // Works with ANY Payment subclass
        System.out.println("Using: " + payment.getPaymentMethod());
        payment.process();  // Actual method called depends on object type
    }
}

// Usage
PaymentProcessor processor = new PaymentProcessor();
processor.processPayment(new CreditCardPayment(100.0, "1234567890123456"));
processor.processPayment(new PayPalPayment(50.0, "user@email.com"));`
        },
        {
          name: 'Compile-time Polymorphism',
          explanation: 'Compile-time (static) polymorphism is achieved through method overloading - same method name with different parameter lists. The compiler determines which method to call based on the arguments. This is resolved at compile time, unlike runtime polymorphism which is resolved at runtime.',
          codeExample: `public class Calculator {
    // Method overloading - same name, different parameters

    // Add two integers
    public int add(int a, int b) {
        return a + b;
    }

    // Add three integers
    public int add(int a, int b, int c) {
        return a + b + c;
    }

    // Add two doubles
    public double add(double a, double b) {
        return a + b;
    }

    // Add array of numbers
    public int add(int... numbers) {
        int sum = 0;
        for (int n : numbers) {
            sum += n;
        }
        return sum;
    }

    // Different parameter types
    public String add(String a, String b) {
        return a + b;  // Concatenation
    }
}

// Usage - compiler chooses correct method
Calculator calc = new Calculator();
System.out.println(calc.add(5, 3));           // int add(int, int) -> 8
System.out.println(calc.add(5, 3, 2));        // int add(int, int, int) -> 10
System.out.println(calc.add(5.5, 3.2));       // double add(double, double) -> 8.7
System.out.println(calc.add(1, 2, 3, 4, 5));  // int add(int...) -> 15
System.out.println(calc.add("Hello", " World")); // String add(String, String)`
        },
        {
          name: 'Interface Polymorphism',
          diagram: InterfaceDiagram,
          explanation: 'Interfaces enable polymorphism without inheritance. A class can implement multiple interfaces, allowing objects to be treated as multiple types. This is more flexible than class inheritance and is the preferred way to achieve polymorphism in modern Java.',
          codeExample: `// Multiple interfaces for different capabilities
public interface Drawable {
    void draw();
}

public interface Resizable {
    void resize(double factor);
}

public interface Movable {
    void moveTo(int x, int y);
}

// Class implementing multiple interfaces
public class Circle implements Drawable, Resizable, Movable {
    private int x, y;
    private double radius;

    public Circle(int x, int y, double radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    @Override
    public void draw() {
        System.out.println("Drawing circle at (" + x + "," + y + ") with radius " + radius);
    }

    @Override
    public void resize(double factor) {
        radius *= factor;
    }

    @Override
    public void moveTo(int x, int y) {
        this.x = x;
        this.y = y;
    }
}

// Polymorphic usage with different interface types
public class Canvas {
    private List<Drawable> drawables = new ArrayList<>();

    public void addShape(Drawable shape) {
        drawables.add(shape);
    }

    public void drawAll() {
        for (Drawable d : drawables) {
            d.draw();  // Each shape draws itself
        }
    }

    public void resizeAll(double factor) {
        for (Drawable d : drawables) {
            if (d instanceof Resizable) {
                ((Resizable) d).resize(factor);
            }
        }
    }
}`
        },
        {
          name: 'instanceof and Type Casting',
          explanation: 'The instanceof operator checks if an object is an instance of a specific class or implements an interface. Type casting converts a reference to a more specific type. Java 16+ pattern matching simplifies this with instanceof expressions that combine the check and cast.',
          codeExample: `public void processShape(Shape shape) {
    // Traditional instanceof + cast
    if (shape instanceof Circle) {
        Circle circle = (Circle) shape;
        System.out.println("Circle radius: " + circle.getRadius());
    } else if (shape instanceof Rectangle) {
        Rectangle rect = (Rectangle) shape;
        System.out.println("Rectangle: " + rect.getWidth() + "x" + rect.getHeight());
    }
}

// Java 16+ Pattern Matching for instanceof
public void processShapeModern(Shape shape) {
    // Pattern variable eliminates explicit cast
    if (shape instanceof Circle circle) {
        System.out.println("Circle radius: " + circle.getRadius());
    } else if (shape instanceof Rectangle rect) {
        System.out.println("Rectangle: " + rect.getWidth() + "x" + rect.getHeight());
    }
}

// Java 21+ Pattern Matching in switch
public double calculateArea(Shape shape) {
    return switch (shape) {
        case Circle c -> Math.PI * c.getRadius() * c.getRadius();
        case Rectangle r -> r.getWidth() * r.getHeight();
        case Triangle t -> 0.5 * t.getBase() * t.getHeight();
        case null -> 0;
        default -> throw new IllegalArgumentException("Unknown shape");
    };
}

// Avoid ClassCastException
public void safeProcess(Object obj) {
    if (obj instanceof String str && str.length() > 0) {
        // str is guaranteed to be non-null String with length > 0
        System.out.println("First char: " + str.charAt(0));
    }
}`
        }
      ]
    },
    {
      id: 'abstraction',
      name: 'Abstraction',
      icon: '🎭',
      color: '#f59e0b',
      description: 'Hide complex implementation details and show only the essential features of an object, reducing complexity and increasing reusability.',
      diagram: AbstractionDiagram,
      details: [
        {
          name: 'Abstract Classes',
          diagram: AbstractionDiagram,
          explanation: 'Abstract classes cannot be instantiated directly and may contain abstract methods (no implementation) and concrete methods (with implementation). They define a common base for subclasses while enforcing that certain methods must be implemented. Use abstract classes when classes share common code and have an "is-a" relationship.',
          codeExample: `public abstract class Vehicle {
    protected String brand;
    protected String model;

    public Vehicle(String brand, String model) {
        this.brand = brand;
        this.model = model;
    }

    // Abstract methods - must be implemented by subclasses
    public abstract void start();
    public abstract void stop();
    public abstract double getFuelEfficiency();

    // Concrete method - shared by all subclasses
    public void displayInfo() {
        System.out.println(brand + " " + model);
    }

    // Template method pattern
    public final void performMaintenance() {
        System.out.println("Starting maintenance...");
        checkOil();        // Implemented here
        checkBrakes();     // Implemented here
        specificCheck();   // Abstract - subclass implements
        System.out.println("Maintenance complete.");
    }

    private void checkOil() {
        System.out.println("Checking oil level...");
    }

    private void checkBrakes() {
        System.out.println("Checking brake pads...");
    }

    // Abstract hook for subclass-specific checks
    protected abstract void specificCheck();
}

public class ElectricCar extends Vehicle {
    private int batteryCapacity;

    public ElectricCar(String brand, String model, int batteryCapacity) {
        super(brand, model);
        this.batteryCapacity = batteryCapacity;
    }

    @Override
    public void start() {
        System.out.println("Electric motor starting silently...");
    }

    @Override
    public void stop() {
        System.out.println("Regenerative braking engaged.");
    }

    @Override
    public double getFuelEfficiency() {
        return batteryCapacity / 100.0;  // kWh per 100 miles
    }

    @Override
    protected void specificCheck() {
        System.out.println("Checking battery health...");
    }
}`
        },
        {
          name: 'Interfaces',
          diagram: InterfaceDiagram,
          explanation: 'Interfaces define a contract - a set of methods that implementing classes must provide. Since Java 8, interfaces can have default and static methods. Since Java 9, they can have private methods. Interfaces enable multiple inheritance of behavior and are key to dependency injection and loose coupling.',
          codeExample: `// Interface with various method types
public interface DataProcessor {
    // Abstract method - must be implemented
    void process(String data);

    // Default method - provides default implementation (Java 8+)
    default void validate(String data) {
        if (data == null || data.isEmpty()) {
            throw new IllegalArgumentException("Data cannot be empty");
        }
    }

    // Static method - utility function (Java 8+)
    static DataProcessor createDefault() {
        return data -> System.out.println("Processing: " + data);
    }

    // Private method - for code reuse within interface (Java 9+)
    private void log(String message) {
        System.out.println("[DataProcessor] " + message);
    }

    // Default method using private method
    default void processWithLogging(String data) {
        log("Starting processing");
        process(data);
        log("Processing complete");
    }
}

// Functional interface - can use lambda
@FunctionalInterface
public interface Transformer<T, R> {
    R transform(T input);

    // Can still have default methods
    default Transformer<T, R> andThen(Transformer<R, R> after) {
        return input -> after.transform(this.transform(input));
    }
}

// Implementation
public class JsonProcessor implements DataProcessor {
    @Override
    public void process(String data) {
        System.out.println("Parsing JSON: " + data);
    }
}

// Lambda implementation (functional interface)
Transformer<String, Integer> stringLength = String::length;
Transformer<String, Integer> doubleLength =
    stringLength.andThen(len -> len * 2);`
        },
        {
          name: 'Abstract vs Interface',
          explanation: 'Choose abstract class when you want to share code among related classes, need constructor or instance fields, or have non-public members. Choose interface when you want to define a contract for unrelated classes, need multiple inheritance, or are defining a type that could have many implementations.',
          codeExample: `// Abstract class - for related classes sharing code
public abstract class Animal {
    protected String name;
    protected int age;

    // Constructor - interfaces can't have these
    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Shared implementation
    public void sleep() {
        System.out.println(name + " is sleeping");
    }

    // Force subclasses to implement
    public abstract void makeSound();
}

// Interface - for capability that any class can have
public interface Flyable {
    void fly();

    default void land() {
        System.out.println("Landing...");
    }
}

// A class can extend one abstract class BUT implement many interfaces
public class Bird extends Animal implements Flyable, Comparable<Bird> {

    public Bird(String name, int age) {
        super(name, age);
    }

    @Override
    public void makeSound() {
        System.out.println(name + " chirps");
    }

    @Override
    public void fly() {
        System.out.println(name + " is flying");
    }

    @Override
    public int compareTo(Bird other) {
        return this.age - other.age;
    }
}

// Unrelated class can also be Flyable
public class Airplane implements Flyable {
    @Override
    public void fly() {
        System.out.println("Airplane flying at 30,000 feet");
    }
}`
        }
      ]
    },
    {
      id: 'design-patterns',
      name: 'Design Patterns',
      icon: '📐',
      color: '#ec4899',
      description: 'Reusable solutions to common software design problems. These proven patterns help create flexible, maintainable, and scalable code.',
      diagram: SingletonDiagram,
      details: [
        {
          name: 'Singleton Pattern',
          diagram: SingletonDiagram,
          explanation: 'Singleton ensures a class has only one instance and provides a global access point. Common uses include database connections, configuration managers, and logging. Use double-checked locking for thread safety, or leverage the enum approach which is the most robust way in Java.',
          codeExample: `// Thread-safe Singleton with double-checked locking
public class DatabaseConnection {
    // volatile ensures visibility across threads
    private static volatile DatabaseConnection instance;

    private Connection connection;

    // Private constructor prevents instantiation
    private DatabaseConnection() {
        // Initialize connection
        System.out.println("Creating database connection...");
    }

    // Double-checked locking
    public static DatabaseConnection getInstance() {
        if (instance == null) {                    // First check (no locking)
            synchronized (DatabaseConnection.class) {
                if (instance == null) {            // Second check (with locking)
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }

    public void query(String sql) {
        System.out.println("Executing: " + sql);
    }
}

// Enum Singleton - thread-safe and serialization-safe
public enum ConfigManager {
    INSTANCE;

    private Properties properties;

    ConfigManager() {
        properties = new Properties();
        // Load configuration
    }

    public String getProperty(String key) {
        return properties.getProperty(key);
    }

    public void setProperty(String key, String value) {
        properties.setProperty(key, value);
    }
}

// Usage
DatabaseConnection db = DatabaseConnection.getInstance();
db.query("SELECT * FROM users");

String setting = ConfigManager.INSTANCE.getProperty("app.name");`
        },
        {
          name: 'Observer Pattern',
          diagram: ObserverDiagram,
          explanation: 'Observer defines a one-to-many dependency between objects. When the subject changes state, all registered observers are notified automatically. This decouples the subject from its observers and is the foundation for event-driven programming and reactive systems.',
          codeExample: `// Observer interface
public interface Observer {
    void update(String event, Object data);
}

// Subject interface
public interface Subject {
    void attach(Observer observer);
    void detach(Observer observer);
    void notifyObservers(String event, Object data);
}

// Concrete subject
public class StockTicker implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private Map<String, Double> prices = new HashMap<>();

    @Override
    public void attach(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void detach(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers(String event, Object data) {
        for (Observer observer : observers) {
            observer.update(event, data);
        }
    }

    public void setPrice(String symbol, double price) {
        double oldPrice = prices.getOrDefault(symbol, 0.0);
        prices.put(symbol, price);

        if (Math.abs(price - oldPrice) / oldPrice > 0.05) {
            notifyObservers("SIGNIFICANT_CHANGE",
                Map.of("symbol", symbol, "price", price));
        }
    }
}

// Concrete observers
public class EmailAlert implements Observer {
    @Override
    public void update(String event, Object data) {
        System.out.println("Sending email alert: " + event + " - " + data);
    }
}

public class TradingBot implements Observer {
    @Override
    public void update(String event, Object data) {
        System.out.println("Trading bot analyzing: " + event);
        // Execute trading logic
    }
}

// Usage
StockTicker ticker = new StockTicker();
ticker.attach(new EmailAlert());
ticker.attach(new TradingBot());
ticker.setPrice("AAPL", 150.0);  // Notifies all observers`
        },
        {
          name: 'Factory Pattern',
          explanation: 'Factory Method defines an interface for creating objects but lets subclasses decide which class to instantiate. Abstract Factory creates families of related objects without specifying concrete classes. Factories encapsulate object creation logic, making code more flexible and testable.',
          codeExample: `// Product interface
public interface Notification {
    void send(String message);
}

// Concrete products
public class EmailNotification implements Notification {
    public void send(String message) {
        System.out.println("Sending email: " + message);
    }
}

public class SMSNotification implements Notification {
    public void send(String message) {
        System.out.println("Sending SMS: " + message);
    }
}

public class PushNotification implements Notification {
    public void send(String message) {
        System.out.println("Sending push: " + message);
    }
}

// Simple Factory
public class NotificationFactory {
    public static Notification create(String type) {
        return switch (type.toLowerCase()) {
            case "email" -> new EmailNotification();
            case "sms" -> new SMSNotification();
            case "push" -> new PushNotification();
            default -> throw new IllegalArgumentException("Unknown type: " + type);
        };
    }
}

// Factory Method pattern
public abstract class NotificationService {
    // Factory method - subclasses implement
    protected abstract Notification createNotification();

    public void notifyUser(String message) {
        Notification notification = createNotification();
        notification.send(message);
    }
}

public class EmailService extends NotificationService {
    @Override
    protected Notification createNotification() {
        return new EmailNotification();
    }
}

// Usage
Notification notification = NotificationFactory.create("email");
notification.send("Hello!");

NotificationService service = new EmailService();
service.notifyUser("Welcome!");`
        },
        {
          name: 'Strategy Pattern',
          explanation: 'Strategy defines a family of algorithms, encapsulates each one, and makes them interchangeable. This lets the algorithm vary independently from clients that use it. It is perfect for situations where you need to select an algorithm at runtime, like payment processing or sorting.',
          codeExample: `// Strategy interface
public interface PricingStrategy {
    double calculatePrice(double basePrice, int quantity);
}

// Concrete strategies
public class RegularPricing implements PricingStrategy {
    @Override
    public double calculatePrice(double basePrice, int quantity) {
        return basePrice * quantity;
    }
}

public class PremiumPricing implements PricingStrategy {
    private double discount = 0.10;  // 10% discount

    @Override
    public double calculatePrice(double basePrice, int quantity) {
        return basePrice * quantity * (1 - discount);
    }
}

public class BulkPricing implements PricingStrategy {
    @Override
    public double calculatePrice(double basePrice, int quantity) {
        if (quantity >= 100) return basePrice * quantity * 0.70;  // 30% off
        if (quantity >= 50) return basePrice * quantity * 0.80;   // 20% off
        if (quantity >= 10) return basePrice * quantity * 0.90;   // 10% off
        return basePrice * quantity;
    }
}

// Context - uses strategy
public class ShoppingCart {
    private List<Item> items = new ArrayList<>();
    private PricingStrategy pricingStrategy;

    public ShoppingCart(PricingStrategy strategy) {
        this.pricingStrategy = strategy;
    }

    // Strategy can be changed at runtime
    public void setPricingStrategy(PricingStrategy strategy) {
        this.pricingStrategy = strategy;
    }

    public double calculateTotal() {
        return items.stream()
            .mapToDouble(item ->
                pricingStrategy.calculatePrice(item.getPrice(), item.getQuantity()))
            .sum();
    }
}

// Usage - strategy selected at runtime
ShoppingCart cart = new ShoppingCart(new RegularPricing());
cart.addItem(new Item("Widget", 10.0, 5));

// User logs in as premium member
cart.setPricingStrategy(new PremiumPricing());

// Bulk order detected
if (cart.getTotalQuantity() >= 100) {
    cart.setPricingStrategy(new BulkPricing());
}`
        }
      ]
    },
    {
      id: 'solid-principles',
      name: 'SOLID Principles',
      icon: '💎',
      color: '#06b6d4',
      description: 'Five fundamental principles for writing maintainable, scalable, and robust object-oriented software.',
      diagram: SOLIDDiagram,
      details: [
        {
          name: 'Single Responsibility',
          diagram: SOLIDDiagram,
          explanation: 'A class should have only one reason to change. Each class should do one thing and do it well. This makes classes easier to understand, test, and maintain. When a class has multiple responsibilities, changes to one can affect the other.',
          codeExample: `// BAD: Multiple responsibilities
public class Employee {
    public void calculatePay() { /* payroll logic */ }
    public void saveToDatabase() { /* persistence logic */ }
    public void generateReport() { /* reporting logic */ }
}

// GOOD: Single responsibility per class
public class Employee {
    private String name;
    private double salary;
    private String department;

    // Only employee data and behavior
    public String getName() { return name; }
    public double getSalary() { return salary; }
}

public class PayrollCalculator {
    // Only payroll calculations
    public double calculatePay(Employee employee) {
        return employee.getSalary() / 12;  // Monthly pay
    }

    public double calculateTax(Employee employee) {
        return employee.getSalary() * 0.25;
    }
}

public class EmployeeRepository {
    // Only persistence
    public void save(Employee employee) {
        // Database logic
    }

    public Employee findById(Long id) {
        // Database query
        return null;
    }
}

public class EmployeeReportGenerator {
    // Only reporting
    public String generateReport(Employee employee) {
        return "Employee Report: " + employee.getName();
    }
}`
        },
        {
          name: 'Open/Closed Principle',
          explanation: 'Software entities should be open for extension but closed for modification. You should be able to add new functionality without changing existing code. This is typically achieved through abstraction and polymorphism.',
          codeExample: `// BAD: Must modify class to add new shapes
public class AreaCalculator {
    public double calculate(Object shape) {
        if (shape instanceof Rectangle) {
            Rectangle r = (Rectangle) shape;
            return r.width * r.height;
        } else if (shape instanceof Circle) {
            Circle c = (Circle) shape;
            return Math.PI * c.radius * c.radius;
        }
        // Must add new if-else for each new shape!
        return 0;
    }
}

// GOOD: Open for extension, closed for modification
public interface Shape {
    double calculateArea();
}

public class Rectangle implements Shape {
    private double width, height;

    @Override
    public double calculateArea() {
        return width * height;
    }
}

public class Circle implements Shape {
    private double radius;

    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
}

// Adding new shape doesn't require modifying existing code
public class Triangle implements Shape {
    private double base, height;

    @Override
    public double calculateArea() {
        return 0.5 * base * height;
    }
}

public class AreaCalculator {
    // Works with any Shape - no modification needed
    public double calculate(Shape shape) {
        return shape.calculateArea();
    }

    public double calculateTotal(List<Shape> shapes) {
        return shapes.stream()
            .mapToDouble(Shape::calculateArea)
            .sum();
    }
}`
        },
        {
          name: 'Liskov Substitution',
          explanation: 'Objects of a superclass should be replaceable with objects of its subclasses without breaking the application. Subclasses must fulfill the contract of the parent class. If it looks like a duck and quacks like a duck but needs batteries, you probably have the wrong abstraction.',
          codeExample: `// BAD: Violates LSP - Square is not a valid Rectangle substitute
public class Rectangle {
    protected int width, height;

    public void setWidth(int width) { this.width = width; }
    public void setHeight(int height) { this.height = height; }
    public int getArea() { return width * height; }
}

public class Square extends Rectangle {
    // Violates LSP - changing width must also change height
    @Override
    public void setWidth(int width) {
        this.width = width;
        this.height = width;  // Surprise! Height changes too
    }

    @Override
    public void setHeight(int height) {
        this.width = height;
        this.height = height;
    }
}

// This test passes for Rectangle but fails for Square!
void testRectangle(Rectangle r) {
    r.setWidth(5);
    r.setHeight(4);
    assert r.getArea() == 20;  // Fails for Square!
}

// GOOD: Proper abstraction
public interface Shape {
    int getArea();
}

public class Rectangle implements Shape {
    private final int width, height;

    public Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public int getArea() { return width * height; }
}

public class Square implements Shape {
    private final int side;

    public Square(int side) {
        this.side = side;
    }

    @Override
    public int getArea() { return side * side; }
}

// Now both work correctly as Shape
void calculateAreas(List<Shape> shapes) {
    shapes.forEach(s -> System.out.println(s.getArea()));
}`
        },
        {
          name: 'Interface Segregation',
          explanation: 'Clients should not be forced to depend on interfaces they do not use. Instead of one fat interface, prefer many small, specific interfaces. This prevents classes from implementing methods they do not need and makes the system more flexible.',
          codeExample: `// BAD: Fat interface forces implementations of unused methods
public interface Worker {
    void work();
    void eat();
    void sleep();
    void attendMeeting();
    void writeReport();
}

// Robot can't eat or sleep!
public class Robot implements Worker {
    public void work() { /* ... */ }
    public void eat() { /* Can't eat! */ }
    public void sleep() { /* Can't sleep! */ }
    public void attendMeeting() { /* ... */ }
    public void writeReport() { /* ... */ }
}

// GOOD: Segregated interfaces
public interface Workable {
    void work();
}

public interface Feedable {
    void eat();
}

public interface Sleepable {
    void sleep();
}

public interface Meetable {
    void attendMeeting();
}

// Human implements all relevant interfaces
public class Human implements Workable, Feedable, Sleepable, Meetable {
    public void work() { System.out.println("Working..."); }
    public void eat() { System.out.println("Eating lunch"); }
    public void sleep() { System.out.println("Sleeping"); }
    public void attendMeeting() { System.out.println("In meeting"); }
}

// Robot only implements what it can do
public class Robot implements Workable, Meetable {
    public void work() { System.out.println("Robot working 24/7"); }
    public void attendMeeting() { System.out.println("Robot attending via screen"); }
}

// Intern doesn't attend meetings yet
public class Intern implements Workable, Feedable, Sleepable {
    public void work() { /* ... */ }
    public void eat() { /* ... */ }
    public void sleep() { /* ... */ }
}`
        },
        {
          name: 'Dependency Inversion',
          explanation: 'High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions. This principle is the foundation for dependency injection.',
          codeExample: `// BAD: High-level module depends on low-level module
public class OrderService {
    private MySQLDatabase database = new MySQLDatabase();  // Direct dependency
    private SmtpEmailSender emailSender = new SmtpEmailSender();

    public void createOrder(Order order) {
        database.save(order);  // Tightly coupled to MySQL
        emailSender.send(order.getCustomerEmail(), "Order confirmed");
    }
}

// GOOD: Depend on abstractions
public interface OrderRepository {
    void save(Order order);
    Order findById(String id);
}

public interface NotificationService {
    void notify(String recipient, String message);
}

// High-level module depends on abstractions
public class OrderService {
    private final OrderRepository repository;
    private final NotificationService notificationService;

    // Dependencies injected via constructor
    public OrderService(OrderRepository repository,
                       NotificationService notificationService) {
        this.repository = repository;
        this.notificationService = notificationService;
    }

    public void createOrder(Order order) {
        repository.save(order);
        notificationService.notify(order.getCustomerEmail(), "Order confirmed");
    }
}

// Low-level modules implement abstractions
public class MySQLOrderRepository implements OrderRepository {
    public void save(Order order) { /* MySQL logic */ }
    public Order findById(String id) { /* ... */ return null; }
}

public class MongoOrderRepository implements OrderRepository {
    public void save(Order order) { /* MongoDB logic */ }
    public Order findById(String id) { /* ... */ return null; }
}

public class EmailNotificationService implements NotificationService {
    public void notify(String recipient, String message) { /* email logic */ }
}

// Easy to test with mocks
@Test
void testOrderCreation() {
    OrderRepository mockRepo = mock(OrderRepository.class);
    NotificationService mockNotify = mock(NotificationService.class);

    OrderService service = new OrderService(mockRepo, mockNotify);
    service.createOrder(new Order());

    verify(mockRepo).save(any());
    verify(mockNotify).notify(any(), any());
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
      { name: 'Object-Oriented Programming', icon: '🏗️', page: 'Object-Oriented Programming' }
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
      } else if (e.key === 'ArrowLeft' && selectedConceptIndex !== null && selectedConceptIndex > 0) {
        e.preventDefault()
        setSelectedConceptIndex(selectedConceptIndex - 1)
        setSelectedDetailIndex(0)
      } else if (e.key === 'ArrowRight' && selectedConceptIndex !== null && selectedConceptIndex < concepts.length - 1) {
        e.preventDefault()
        setSelectedConceptIndex(selectedConceptIndex + 1)
        setSelectedDetailIndex(0)
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
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(59, 130, 246, 0.2)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: '0.5rem',
    color: '#60a5fa',
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
        <h1 style={titleStyle}>Object-Oriented Programming</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'
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
          colors={OOP_COLORS}
        />
      </div>

      {/* Practice Exercises Section */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem', background: 'rgba(15, 23, 42, 0.8)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
        <h2 style={{ color: '#3b82f6', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span>📝</span> Practice Exercises</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>Click on an exercise to practice. Complete the code challenge and mark as done.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {practiceProblems.map((problem) => {
            const problemId = `ObjectOrientedProgramming-${problem.id}`
            const isCompleted = isProblemCompleted(problemId)
            return (
              <div key={problem.id} onClick={() => openProblem(problem)} style={{ background: isCompleted ? 'rgba(34, 197, 94, 0.1)' : 'rgba(30, 41, 59, 0.8)', borderRadius: '0.75rem', padding: '1rem', border: `1px solid ${isCompleted ? '#22c55e' : '#334155'}`, cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.2)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = isCompleted ? '#22c55e' : '#334155'; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h4 style={{ color: '#e2e8f0', margin: 0, fontSize: '0.95rem' }}>{problem.title}</h4>
                  <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '600', backgroundColor: problem.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.2)' : problem.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: problem.difficulty === 'Easy' ? '#22c55e' : problem.difficulty === 'Medium' ? '#f59e0b' : '#ef4444' }}>{problem.difficulty}</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0.5rem 0', lineHeight: '1.4' }}>{problem.description}</p>
                <p style={{ color: '#64748b', fontSize: '0.75rem', margin: '0.5rem 0', fontStyle: 'italic' }}>{problem.example}</p>
                <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#3b82f6', fontSize: '0.8rem', fontWeight: '500' }}>Click to practice →</span>
                  <div onClick={(e) => e.stopPropagation()}><CompletionCheckbox problemId={problemId} compact /></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Practice Problem Modal */}
      {selectedProblem && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }} onClick={closeProblem}>
          <div style={{ backgroundColor: '#1f2937', borderRadius: '1rem', width: '95vw', maxWidth: '1400px', height: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '2px solid #3b82f6' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h2 style={{ color: '#e2e8f0', margin: 0, fontSize: '1.5rem' }}>{selectedProblem.title}</h2>
                <span style={{ padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', backgroundColor: selectedProblem.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.2)' : selectedProblem.difficulty === 'Medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: selectedProblem.difficulty === 'Easy' ? '#22c55e' : selectedProblem.difficulty === 'Medium' ? '#f59e0b' : '#ef4444' }}>{selectedProblem.difficulty}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <CompletionCheckbox problemId={`ObjectOrientedProgramming-${selectedProblem.id}`} compact />
                <button onClick={closeProblem} style={{ padding: '0.5rem 1rem', backgroundColor: '#374151', color: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>✕ Close</button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem', borderRight: '1px solid #374151', overflowY: 'auto' }}>
                <h3 style={{ color: '#3b82f6', marginTop: 0, marginBottom: '1rem' }}>📋 Instructions</h3>
                <div style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{selectedProblem.instructions.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} style={{ color: '#e2e8f0' }}>{part}</strong> : part)}</div>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedProblem.solution) }} style={{ padding: '0.5rem 1rem', backgroundColor: showSolution ? '#ef4444' : '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>{showSolution ? '🔒 Hide Solution' : '💡 Show Solution'}</button>
                  <button onClick={() => { setUserCode(selectedProblem.starterCode); setShowSolution(false) }} style={{ padding: '0.5rem 1rem', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>🔄 Reset Code</button>
                  <button onClick={() => navigator.clipboard.writeText(userCode)} style={{ padding: '0.5rem 1rem', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>📋 Copy Code</button>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                  <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'Consolas, Monaco, "Courier New", monospace', fontSize: '0.9rem', backgroundColor: '#111827', color: '#e2e8f0', border: '1px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5' }} spellCheck={false} />
                </div>
                <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.75rem', marginBottom: 0 }}>💡 Copy this code to your IDE to run and test. Mark as complete when you've solved it!</p>
              </div>
            </div>
          </div>
        </div>
      )}

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
              colors={OOP_COLORS}
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

export default ObjectOrientedProgramming

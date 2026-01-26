/**
 * Interface-Based Design - Java Internals
 *
 * Comprehensive guide to interface-based design patterns in Java including
 * contract programming, dependency injection, design patterns, and SOLID principles.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const INTERFACE_COLORS = {
  primary: '#0ea5e9',           // Sky blue - main accent color
  primaryHover: '#38bdf8',      // Lighter sky blue for hover
  bg: 'rgba(14, 165, 233, 0.1)', // Background with transparency
  border: 'rgba(14, 165, 233, 0.3)', // Border color
  arrow: '#0ea5e9',             // Arrow/indicator color
  hoverBg: 'rgba(14, 165, 233, 0.2)', // Hover background
  topicBg: 'rgba(14, 165, 233, 0.2)'  // Topic card background
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

// Interface Inheritance Diagram
const InterfaceInheritanceDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#0ea5e9" />
      </marker>
      <marker id="hollowArrow" markerWidth="12" markerHeight="8" refX="11" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Interface Contract & Implementation
    </text>

    {/* Interface Box */}
    <rect x="300" y="50" width="200" height="70" rx="8" fill="rgba(14, 165, 233, 0.2)" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="8,4"/>
    <text x="400" y="70" textAnchor="middle" fill="#0ea5e9" fontSize="10" fontStyle="italic">{'<<interface>>'}</text>
    <text x="400" y="90" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">PaymentProcessor</text>
    <text x="400" y="108" textAnchor="middle" fill="#94a3b8" fontSize="10">+ processPayment(amount)</text>

    {/* Implementation Boxes */}
    <rect x="50" y="180" width="180" height="70" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="140" y="210" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">StripeProcessor</text>
    <text x="140" y="228" textAnchor="middle" fill="#bfdbfe" fontSize="10">Stripe API impl</text>

    <rect x="310" y="180" width="180" height="70" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="400" y="210" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">PayPalProcessor</text>
    <text x="400" y="228" textAnchor="middle" fill="#bbf7d0" fontSize="10">PayPal API impl</text>

    <rect x="570" y="180" width="180" height="70" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="660" y="210" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">CryptoProcessor</text>
    <text x="660" y="228" textAnchor="middle" fill="#ddd6fe" fontSize="10">Crypto API impl</text>

    {/* Implementation arrows (dashed, hollow head) */}
    <line x1="140" y1="180" x2="350" y2="125" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#hollowArrow)"/>
    <line x1="400" y1="180" x2="400" y2="125" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#hollowArrow)"/>
    <line x1="660" y1="180" x2="450" y2="125" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#hollowArrow)"/>

    <text x="230" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">implements</text>
    <text x="400" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">implements</text>
    <text x="570" y="155" textAnchor="middle" fill="#94a3b8" fontSize="9">implements</text>
  </svg>
)

// Dependency Injection Diagram
const DependencyInjectionDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="diArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#0ea5e9" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Constructor Injection Pattern
    </text>

    {/* Container */}
    <rect x="30" y="50" width="150" height="80" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="105" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">DI Container</text>
    <text x="105" y="95" textAnchor="middle" fill="#fef3c7" fontSize="9">Creates & Injects</text>
    <text x="105" y="110" textAnchor="middle" fill="#fef3c7" fontSize="9">Dependencies</text>

    {/* Service */}
    <rect x="325" y="50" width="150" height="80" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">UserService</text>
    <text x="400" y="95" textAnchor="middle" fill="#bfdbfe" fontSize="9">Business Logic</text>
    <text x="400" y="110" textAnchor="middle" fill="#bfdbfe" fontSize="9">(depends on abstractions)</text>

    {/* Dependencies */}
    <rect x="570" y="40" width="180" height="50" rx="6" fill="rgba(14, 165, 233, 0.2)" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="6,3"/>
    <text x="660" y="60" textAnchor="middle" fill="#0ea5e9" fontSize="10" fontStyle="italic">{'<<interface>>'}</text>
    <text x="660" y="78" textAnchor="middle" fill="white" fontSize="11">UserRepository</text>

    <rect x="570" y="100" width="180" height="50" rx="6" fill="rgba(14, 165, 233, 0.2)" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="6,3"/>
    <text x="660" y="120" textAnchor="middle" fill="#0ea5e9" fontSize="10" fontStyle="italic">{'<<interface>>'}</text>
    <text x="660" y="138" textAnchor="middle" fill="white" fontSize="11">EmailService</text>

    {/* Implementations */}
    <rect x="590" y="170" width="140" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="660" y="195" textAnchor="middle" fill="white" fontSize="10">JpaUserRepository</text>

    <rect x="590" y="215" width="140" height="40" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="660" y="240" textAnchor="middle" fill="white" fontSize="10">SmtpEmailService</text>

    {/* Arrows */}
    <line x1="180" y1="90" x2="320" y2="90" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#diArrow)"/>
    <text x="250" y="82" textAnchor="middle" fill="#94a3b8" fontSize="9">injects</text>

    <line x1="475" y1="70" x2="565" y2="65" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#diArrow)"/>
    <line x1="475" y1="110" x2="565" y2="125" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#diArrow)"/>

    <line x1="660" y1="150" x2="660" y2="165" stroke="#4ade80" strokeWidth="2" strokeDasharray="4,2"/>
  </svg>
)

// Strategy Pattern Diagram
const StrategyPatternDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="stratArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#0ea5e9" />
      </marker>
      <marker id="stratHollow" markerWidth="12" markerHeight="8" refX="11" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Strategy Pattern - Runtime Algorithm Selection
    </text>

    {/* Context */}
    <rect x="30" y="90" width="160" height="100" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="110" y="120" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">ShoppingCart</text>
    <line x1="40" y1="135" x2="180" y2="135" stroke="#60a5fa" strokeWidth="1"/>
    <text x="110" y="155" textAnchor="middle" fill="#bfdbfe" fontSize="10">- pricingStrategy</text>
    <text x="110" y="175" textAnchor="middle" fill="#bfdbfe" fontSize="10">+ calculateTotal()</text>

    {/* Strategy Interface */}
    <rect x="300" y="90" width="200" height="70" rx="8" fill="rgba(14, 165, 233, 0.2)" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="8,4"/>
    <text x="400" y="115" textAnchor="middle" fill="#0ea5e9" fontSize="10" fontStyle="italic">{'<<interface>>'}</text>
    <text x="400" y="135" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">PricingStrategy</text>
    <text x="400" y="152" textAnchor="middle" fill="#94a3b8" fontSize="10">+ calculatePrice(product)</text>

    {/* Concrete Strategies */}
    <rect x="570" y="50" width="180" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="660" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">RegularPricing</text>

    <rect x="570" y="115" width="180" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="660" y="145" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">VipPricing</text>

    <rect x="570" y="180" width="180" height="50" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="660" y="210" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">SeasonalPricing</text>

    {/* Arrows */}
    <line x1="190" y1="130" x2="295" y2="130" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#stratArrow)"/>
    <text x="243" y="122" textAnchor="middle" fill="#94a3b8" fontSize="9">uses</text>

    <line x1="500" y1="115" x2="565" y2="80" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#stratHollow)"/>
    <line x1="500" y1="130" x2="565" y2="140" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#stratHollow)"/>
    <line x1="500" y1="145" x2="565" y2="200" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#stratHollow)"/>

    {/* Runtime Selection */}
    <rect x="150" y="220" width="500" height="45" rx="8" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="400" y="240" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Runtime: if (customer.isVip()) cart.setStrategy(new VipPricing())</text>
    <text x="400" y="255" textAnchor="middle" fill="#94a3b8" fontSize="9">Strategy can be changed at runtime based on context</text>
  </svg>
)

// Factory Pattern Diagram
const FactoryPatternDiagram = () => (
  <svg viewBox="0 0 800 260" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="factArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#0ea5e9" />
      </marker>
      <marker id="factHollow" markerWidth="12" markerHeight="8" refX="11" refY="4" orient="auto">
        <polygon points="0 0, 12 4, 0 8" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Abstract Factory Pattern
    </text>

    {/* Abstract Factory */}
    <rect x="300" y="45" width="200" height="60" rx="8" fill="rgba(14, 165, 233, 0.2)" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="8,4"/>
    <text x="400" y="65" textAnchor="middle" fill="#0ea5e9" fontSize="10" fontStyle="italic">{'<<interface>>'}</text>
    <text x="400" y="82" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">GUIFactory</text>
    <text x="400" y="98" textAnchor="middle" fill="#94a3b8" fontSize="9">+ createButton() + createCheckbox()</text>

    {/* Concrete Factories */}
    <rect x="120" y="140" width="160" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="200" y="170" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">WindowsFactory</text>

    <rect x="520" y="140" width="160" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="600" y="170" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">MacFactory</text>

    {/* Products */}
    <rect x="60" y="210" width="100" height="40" rx="4" fill="#60a5fa" stroke="#93c5fd" strokeWidth="1"/>
    <text x="110" y="235" textAnchor="middle" fill="white" fontSize="9">WinButton</text>

    <rect x="180" y="210" width="100" height="40" rx="4" fill="#60a5fa" stroke="#93c5fd" strokeWidth="1"/>
    <text x="230" y="235" textAnchor="middle" fill="white" fontSize="9">WinCheckbox</text>

    <rect x="520" y="210" width="100" height="40" rx="4" fill="#4ade80" stroke="#86efac" strokeWidth="1"/>
    <text x="570" y="235" textAnchor="middle" fill="white" fontSize="9">MacButton</text>

    <rect x="640" y="210" width="100" height="40" rx="4" fill="#4ade80" stroke="#86efac" strokeWidth="1"/>
    <text x="690" y="235" textAnchor="middle" fill="white" fontSize="9">MacCheckbox</text>

    {/* Arrows */}
    <line x1="200" y1="140" x2="350" y2="110" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#factHollow)"/>
    <line x1="600" y1="140" x2="450" y2="110" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#factHollow)"/>

    <line x1="160" y1="190" x2="130" y2="205" stroke="#60a5fa" strokeWidth="1" markerEnd="url(#factArrow)"/>
    <line x1="240" y1="190" x2="250" y2="205" stroke="#60a5fa" strokeWidth="1" markerEnd="url(#factArrow)"/>
    <line x1="560" y1="190" x2="560" y2="205" stroke="#4ade80" strokeWidth="1" markerEnd="url(#factArrow)"/>
    <line x1="640" y1="190" x2="680" y2="205" stroke="#4ade80" strokeWidth="1" markerEnd="url(#factArrow)"/>

    <text x="150" y="200" textAnchor="middle" fill="#94a3b8" fontSize="8">creates</text>
    <text x="650" y="200" textAnchor="middle" fill="#94a3b8" fontSize="8">creates</text>
  </svg>
)

// Adapter Pattern Diagram
const AdapterPatternDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="adpArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#0ea5e9" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Adapter Pattern - Interface Translation
    </text>

    {/* Client */}
    <rect x="30" y="80" width="140" height="60" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="100" y="115" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Client Code</text>

    {/* Target Interface */}
    <rect x="230" y="80" width="160" height="60" rx="8" fill="rgba(14, 165, 233, 0.2)" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="6,3"/>
    <text x="310" y="100" textAnchor="middle" fill="#0ea5e9" fontSize="9" fontStyle="italic">{'<<interface>>'}</text>
    <text x="310" y="118" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">MediaPlayer</text>
    <text x="310" y="133" textAnchor="middle" fill="#94a3b8" fontSize="9">+ play(filename)</text>

    {/* Adapter */}
    <rect x="450" y="80" width="140" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="520" y="105" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">VlcAdapter</text>
    <text x="520" y="120" textAnchor="middle" fill="#fef3c7" fontSize="9">implements</text>
    <text x="520" y="133" textAnchor="middle" fill="#fef3c7" fontSize="9">MediaPlayer</text>

    {/* Adaptee */}
    <rect x="640" y="80" width="140" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="710" y="105" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">VlcLibrary</text>
    <text x="710" y="120" textAnchor="middle" fill="#ddd6fe" fontSize="9">(third-party)</text>
    <text x="710" y="133" textAnchor="middle" fill="#ddd6fe" fontSize="9">+ vlcPlay(path)</text>

    {/* Arrows */}
    <line x1="170" y1="110" x2="225" y2="110" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#adpArrow)"/>
    <text x="198" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">uses</text>

    <line x1="390" y1="110" x2="445" y2="110" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#adpArrow)"/>
    <text x="418" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">impl</text>

    <line x1="590" y1="110" x2="635" y2="110" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#adpArrow)"/>
    <text x="613" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9">wraps</text>

    {/* Translation note */}
    <rect x="430" y="160" width="200" height="45" rx="6" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="530" y="180" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Adapter translates calls:</text>
    <text x="530" y="195" textAnchor="middle" fill="#94a3b8" fontSize="9">play(file) → vlcPlay(file)</text>
  </svg>
)

// Interface Segregation Diagram
const InterfaceSegregationDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="ispArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#0ea5e9" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Interface Segregation Principle
    </text>

    {/* BAD - Fat Interface */}
    <text x="150" y="55" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">
      BAD: Fat Interface
    </text>
    <rect x="50" y="70" width="200" height="90" rx="6" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="2" strokeDasharray="6,3"/>
    <text x="150" y="90" textAnchor="middle" fill="#ef4444" fontSize="10">Worker</text>
    <text x="150" y="108" textAnchor="middle" fill="#94a3b8" fontSize="9">+ work()</text>
    <text x="150" y="121" textAnchor="middle" fill="#94a3b8" fontSize="9">+ eat()</text>
    <text x="150" y="134" textAnchor="middle" fill="#94a3b8" fontSize="9">+ sleep()</text>
    <text x="150" y="147" textAnchor="middle" fill="#94a3b8" fontSize="9">+ writeReport()</text>

    <rect x="50" y="180" width="90" height="40" rx="4" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="95" y="205" textAnchor="middle" fill="white" fontSize="9">Human</text>

    <rect x="160" y="180" width="90" height="40" rx="4" fill="#ef4444" stroke="#f87171" strokeWidth="1"/>
    <text x="205" y="200" textAnchor="middle" fill="white" fontSize="9">Robot</text>
    <text x="205" y="212" textAnchor="middle" fill="#fca5a5" fontSize="7">eat()? sleep()?</text>

    <line x1="95" y1="160" x2="95" y2="175" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="205" y1="160" x2="205" y2="175" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,2"/>

    {/* GOOD - Segregated Interfaces */}
    <text x="600" y="55" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">
      GOOD: Segregated Interfaces
    </text>

    {/* Small interfaces */}
    <rect x="450" y="70" width="90" height="40" rx="4" fill="rgba(14, 165, 233, 0.2)" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4,2"/>
    <text x="495" y="85" textAnchor="middle" fill="#0ea5e9" fontSize="9">Workable</text>
    <text x="495" y="100" textAnchor="middle" fill="#94a3b8" fontSize="8">+ work()</text>

    <rect x="555" y="70" width="90" height="40" rx="4" fill="rgba(14, 165, 233, 0.2)" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4,2"/>
    <text x="600" y="85" textAnchor="middle" fill="#0ea5e9" fontSize="9">Feedable</text>
    <text x="600" y="100" textAnchor="middle" fill="#94a3b8" fontSize="8">+ eat()</text>

    <rect x="660" y="70" width="90" height="40" rx="4" fill="rgba(14, 165, 233, 0.2)" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4,2"/>
    <text x="705" y="85" textAnchor="middle" fill="#0ea5e9" fontSize="9">Reportable</text>
    <text x="705" y="100" textAnchor="middle" fill="#94a3b8" fontSize="8">+ writeReport()</text>

    {/* Implementations */}
    <rect x="450" y="150" width="130" height="50" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="515" y="170" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Human</text>
    <text x="515" y="185" textAnchor="middle" fill="#bbf7d0" fontSize="8">All interfaces</text>

    <rect x="620" y="150" width="130" height="50" rx="4" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="685" y="170" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Robot</text>
    <text x="685" y="185" textAnchor="middle" fill="#bbf7d0" fontSize="8">Workable + Reportable</text>

    {/* Arrows */}
    <line x1="495" y1="110" x2="495" y2="145" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="600" y1="110" x2="535" y2="145" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="705" y1="110" x2="560" y2="145" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3,2"/>

    <line x1="495" y1="110" x2="650" y2="145" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="705" y1="110" x2="710" y2="145" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3,2"/>

    {/* Key insight */}
    <rect x="400" y="220" width="350" height="55" rx="6" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="1"/>
    <text x="575" y="242" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Clients depend only on methods they use</text>
    <text x="575" y="260" textAnchor="middle" fill="#94a3b8" fontSize="9">Robot doesn't need eat() or sleep() - so it doesn't implement them</text>
  </svg>
)

// Polymorphism Diagram
const PolymorphismDiagram = () => (
  <svg viewBox="0 0 800 260" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="polyArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#0ea5e9" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Polymorphism via Interfaces
    </text>

    {/* Interface */}
    <rect x="320" y="45" width="160" height="55" rx="8" fill="rgba(14, 165, 233, 0.2)" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="8,4"/>
    <text x="400" y="65" textAnchor="middle" fill="#0ea5e9" fontSize="10" fontStyle="italic">{'<<interface>>'}</text>
    <text x="400" y="82" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Shape</text>
    <text x="400" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">+ area() + draw()</text>

    {/* Implementations */}
    <rect x="100" y="140" width="120" height="45" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="160" y="168" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Circle</text>

    <rect x="340" y="140" width="120" height="45" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="400" y="168" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Rectangle</text>

    <rect x="580" y="140" width="120" height="45" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="640" y="168" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Triangle</text>

    {/* Implementation arrows */}
    <line x1="160" y1="140" x2="360" y2="105" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="5,3"/>
    <line x1="400" y1="140" x2="400" y2="105" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="5,3"/>
    <line x1="640" y1="140" x2="440" y2="105" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="5,3"/>

    {/* Polymorphic usage */}
    <rect x="200" y="210" width="400" height="40" rx="6" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="400" y="227" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">List&lt;Shape&gt; shapes = List.of(circle, rect, triangle);</text>
    <text x="400" y="242" textAnchor="middle" fill="#94a3b8" fontSize="9">shapes.forEach(s -&gt; s.draw(canvas));  // Each draws differently</text>
  </svg>
)

// Default Methods Diagram
const DefaultMethodsDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="defArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#0ea5e9" />
      </marker>
    </defs>

    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Interface Default Methods (Java 8+)
    </text>

    {/* Interface with default method */}
    <rect x="250" y="45" width="300" height="85" rx="8" fill="rgba(14, 165, 233, 0.2)" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="8,4"/>
    <text x="400" y="65" textAnchor="middle" fill="#0ea5e9" fontSize="10" fontStyle="italic">{'<<interface>>'}</text>
    <text x="400" y="82" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Validator&lt;T&gt;</text>
    <line x1="260" y1="92" x2="540" y2="92" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="400" y="108" textAnchor="middle" fill="#94a3b8" fontSize="10">+ validate(T item) : ValidationResult</text>
    <text x="400" y="124" textAnchor="middle" fill="#4ade80" fontSize="10">+ default and(Validator&lt;T&gt; other) : Validator&lt;T&gt;</text>

    {/* Implementations */}
    <rect x="120" y="160" width="160" height="45" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="200" y="188" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">EmailValidator</text>

    <rect x="520" y="160" width="160" height="45" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="600" y="188" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">AgeValidator</text>

    {/* Arrows */}
    <line x1="200" y1="160" x2="330" y2="135" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="5,3"/>
    <line x1="600" y1="160" x2="470" y2="135" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="5,3"/>

    {/* Note */}
    <text x="400" y="218" textAnchor="middle" fill="#94a3b8" fontSize="9">
      Default methods provide shared implementation without breaking existing implementations
    </text>
  </svg>
)

// Static Methods Diagram
const StaticMethodsDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Interface Static Methods - Factory Methods
    </text>

    {/* Interface with static method */}
    <rect x="250" y="50" width="300" height="80" rx="8" fill="rgba(14, 165, 233, 0.2)" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="8,4"/>
    <text x="400" y="70" textAnchor="middle" fill="#0ea5e9" fontSize="10" fontStyle="italic">{'<<interface>>'}</text>
    <text x="400" y="87" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Comparator&lt;T&gt;</text>
    <line x1="260" y1="97" x2="540" y2="97" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3,2"/>
    <text x="400" y="113" textAnchor="middle" fill="#f59e0b" fontSize="10">+ static naturalOrder() : Comparator</text>
    <text x="400" y="126" textAnchor="middle" fill="#f59e0b" fontSize="10">+ static comparing(Function) : Comparator</text>

    {/* Usage examples */}
    <rect x="100" y="150" width="250" height="35" rx="6" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="225" y="172" textAnchor="middle" fill="#60a5fa" fontSize="9">Comparator.naturalOrder()</text>

    <rect x="450" y="150" width="250" height="35" rx="6" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="575" y="172" textAnchor="middle" fill="#60a5fa" fontSize="9">Comparator.comparing(User::getName)</text>
  </svg>
)

// API Design Diagram
const ApiDesignDiagram = () => (
  <svg viewBox="0 0 800 240" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="25" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Clean API Design Principles
    </text>

    {/* Three pillars */}
    <rect x="50" y="50" width="200" height="100" rx="8" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="150" y="75" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">Clear Naming</text>
    <text x="150" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">createUser()</text>
    <text x="150" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">findById()</text>
    <text x="150" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">isActive()</text>
    <text x="150" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">hasPermission()</text>

    <rect x="300" y="50" width="200" height="100" rx="8" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Fail-Fast Validation</text>
    <text x="400" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">Validate inputs eagerly</text>
    <text x="400" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">Clear error messages</text>
    <text x="400" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">Optional for nulls</text>
    <text x="400" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">Domain types</text>

    <rect x="550" y="50" width="200" height="100" rx="8" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Builder Pattern</text>
    <text x="650" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">Fluent API</text>
    <text x="650" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">Immutable objects</text>
    <text x="650" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">Optional parameters</text>
    <text x="650" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">Readable code</text>

    {/* Summary */}
    <rect x="200" y="170" width="400" height="50" rx="8" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="400" y="192" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">A well-designed API makes it hard to use incorrectly</text>
    <text x="400" y="208" textAnchor="middle" fill="#94a3b8" fontSize="9">Self-documenting, type-safe, impossible to create invalid states</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Interface({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'contract-programming',
      name: 'Contract Programming',
      icon: '📜',
      color: '#9333ea',
      description: 'Design approach where interfaces define behavioral contracts that implementations must fulfill',
      diagram: InterfaceInheritanceDiagram,
      details: [
        {
          name: 'Interface as Contract',
          diagram: InterfaceInheritanceDiagram,
          explanation: 'Interfaces define a contract - what operations are available and what behavior is expected. Implementations provide the "how" while the interface provides the "what". This separation allows clients to depend on contracts rather than concrete implementations. The interface acts as an agreement between the provider and consumer of functionality.',
          codeExample: `// Define the contract
public interface PaymentProcessor {
    /**
     * Process a payment transaction
     * @param amount must be positive
     * @param currency ISO 4217 currency code
     * @return transaction ID on success
     * @throws PaymentException if processing fails
     */
    String processPayment(BigDecimal amount, String currency);

    boolean refund(String transactionId);
    PaymentStatus getStatus(String transactionId);
}

// Implementation honors the contract
public class StripePaymentProcessor implements PaymentProcessor {
    @Override
    public String processPayment(BigDecimal amount, String currency) {
        // Stripe-specific implementation
        return stripeClient.charge(amount, currency).getId();
    }

    @Override
    public boolean refund(String transactionId) {
        return stripeClient.refund(transactionId).isSuccess();
    }

    @Override
    public PaymentStatus getStatus(String transactionId) {
        return mapStripeStatus(stripeClient.getCharge(transactionId));
    }
}`
        },
        {
          name: 'Multiple Implementations',
          explanation: 'One interface can have many implementations, each providing different behavior while honoring the same contract. This enables polymorphism where different objects can be used interchangeably if they implement the same interface. The client code works with any implementation without modification.',
          codeExample: `public interface NotificationService {
    void send(String recipient, String message);
    boolean isDelivered(String messageId);
}

// Email implementation
public class EmailNotificationService implements NotificationService {
    private final EmailClient emailClient;

    @Override
    public void send(String recipient, String message) {
        emailClient.sendEmail(recipient, "Notification", message);
    }

    @Override
    public boolean isDelivered(String messageId) {
        return emailClient.checkDeliveryStatus(messageId);
    }
}

// SMS implementation
public class SmsNotificationService implements NotificationService {
    private final SmsGateway smsGateway;

    @Override
    public void send(String recipient, String message) {
        smsGateway.sendSms(recipient, message);
    }

    @Override
    public boolean isDelivered(String messageId) {
        return smsGateway.getDeliveryReport(messageId).isDelivered();
    }
}

// Client code works with any implementation
public class OrderService {
    private final NotificationService notifications;

    public void notifyCustomer(Order order) {
        notifications.send(order.getCustomerContact(),
            "Order " + order.getId() + " confirmed!");
    }
}`
        },
        {
          name: 'Generic Interface Contracts',
          explanation: 'Generic interfaces provide compile-time type safety while maintaining flexibility. Repository<User> and Repository<Product> ensure you cannot accidentally mix types. The compiler catches type errors before runtime, preventing bugs and improving code reliability. Generics make interfaces reusable across different domain types.',
          codeExample: `// Generic repository contract
public interface Repository<T, ID> {
    T save(T entity);
    Optional<T> findById(ID id);
    List<T> findAll();
    void delete(T entity);
    boolean existsById(ID id);
}

// Type-safe implementation for User
public class UserRepository implements Repository<User, Long> {
    @Override
    public User save(User entity) {
        return entityManager.merge(entity);
    }

    @Override
    public Optional<User> findById(Long id) {
        return Optional.ofNullable(entityManager.find(User.class, id));
    }

    @Override
    public List<User> findAll() {
        return entityManager.createQuery(
            "SELECT u FROM User u", User.class).getResultList();
    }

    @Override
    public void delete(User entity) {
        entityManager.remove(entity);
    }

    @Override
    public boolean existsById(Long id) {
        return findById(id).isPresent();
    }
}

// Compile-time type safety
UserRepository userRepo = new UserRepository();
User user = userRepo.findById(1L).orElseThrow(); // Returns User
// userRepo.save(new Product()); // Compile error!`
        }
      ]
    },
    {
      id: 'dependency-injection',
      name: 'Dependency Injection',
      icon: '💉',
      color: '#8b5cf6',
      description: 'Pattern where objects receive dependencies from external sources rather than creating them',
      diagram: DependencyInjectionDiagram,
      details: [
        {
          name: 'Constructor Injection',
          diagram: DependencyInjectionDiagram,
          explanation: 'Dependencies are passed through the constructor, making them explicit, required, and immutable. This is the preferred method because it ensures objects are fully initialized and dependencies are clear. Constructor injection makes objects easier to test and reason about. The class cannot be instantiated without its dependencies.',
          codeExample: `public interface UserRepository {
    User findById(Long id);
    User save(User user);
}

public interface EmailService {
    void sendEmail(String to, String subject, String body);
}

// Constructor injection - dependencies are explicit and required
public class UserService {
    private final UserRepository userRepository;
    private final EmailService emailService;

    // Dependencies injected via constructor
    public UserService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = Objects.requireNonNull(userRepository);
        this.emailService = Objects.requireNonNull(emailService);
    }

    public User registerUser(String email, String name) {
        User user = new User(email, name);
        User saved = userRepository.save(user);
        emailService.sendEmail(email, "Welcome!", "Hello " + name);
        return saved;
    }
}

// With Spring framework
@Service
public class UserService {
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Autowired // Optional in newer Spring versions
    public UserService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
}`
        },
        {
          name: 'Dependency Inversion Principle',
          explanation: 'High-level modules should depend on abstractions (interfaces), not concrete implementations. Both high and low-level modules depend on interfaces. This inverts the traditional dependency structure and makes code more flexible and maintainable. Changes to low-level modules do not affect high-level modules.',
          codeExample: `// WITHOUT Dependency Inversion - tightly coupled
public class OrderProcessor {
    private MySqlDatabase database = new MySqlDatabase(); // Direct dependency
    private SmtpEmailSender emailSender = new SmtpEmailSender(); // Direct dependency

    public void process(Order order) {
        database.save(order);
        emailSender.send(order.getEmail(), "Order confirmed");
    }
}

// WITH Dependency Inversion - loosely coupled
public interface Database {
    void save(Object entity);
}

public interface EmailSender {
    void send(String to, String message);
}

public class OrderProcessor {
    private final Database database;        // Depends on abstraction
    private final EmailSender emailSender;  // Depends on abstraction

    public OrderProcessor(Database database, EmailSender emailSender) {
        this.database = database;
        this.emailSender = emailSender;
    }

    public void process(Order order) {
        database.save(order);
        emailSender.send(order.getEmail(), "Order confirmed");
    }
}

// Now we can use any implementation
OrderProcessor processor = new OrderProcessor(
    new PostgresDatabase(),      // Or MongoDB, Redis, etc.
    new SendGridEmailSender()    // Or AWS SES, Mailgun, etc.
);`
        },
        {
          name: 'Testing with Mock Implementations',
          explanation: 'Dependency injection makes testing easy by allowing mock implementations. You can inject test doubles instead of real dependencies, enabling isolated unit testing without external services, databases, or APIs. This makes tests fast, reliable, and independent. Mocks can verify interactions and simulate edge cases.',
          codeExample: `public interface PaymentGateway {
    PaymentResult charge(String cardToken, BigDecimal amount);
}

public class CheckoutService {
    private final PaymentGateway paymentGateway;

    public CheckoutService(PaymentGateway paymentGateway) {
        this.paymentGateway = paymentGateway;
    }

    public Order checkout(Cart cart, String cardToken) {
        PaymentResult result = paymentGateway.charge(cardToken, cart.getTotal());
        if (!result.isSuccess()) {
            throw new PaymentFailedException(result.getError());
        }
        return new Order(cart, result.getTransactionId());
    }
}

// Unit test with mock
class CheckoutServiceTest {
    @Test
    void shouldCreateOrderOnSuccessfulPayment() {
        // Create mock implementation
        PaymentGateway mockGateway = mock(PaymentGateway.class);
        when(mockGateway.charge(anyString(), any()))
            .thenReturn(PaymentResult.success("txn-123"));

        // Inject mock
        CheckoutService service = new CheckoutService(mockGateway);

        Cart cart = new Cart();
        cart.addItem(new Product("Widget", new BigDecimal("29.99")));

        Order order = service.checkout(cart, "card-token");

        assertNotNull(order);
        assertEquals("txn-123", order.getTransactionId());
        verify(mockGateway).charge("card-token", new BigDecimal("29.99"));
    }

    @Test
    void shouldThrowExceptionOnFailedPayment() {
        PaymentGateway mockGateway = mock(PaymentGateway.class);
        when(mockGateway.charge(anyString(), any()))
            .thenReturn(PaymentResult.failure("Card declined"));

        CheckoutService service = new CheckoutService(mockGateway);

        assertThrows(PaymentFailedException.class,
            () -> service.checkout(new Cart(), "bad-card"));
    }
}`
        }
      ]
    },
    {
      id: 'strategy-pattern',
      name: 'Strategy Pattern',
      icon: '🎲',
      color: '#a855f7',
      description: 'Defines family of algorithms, encapsulates each one, and makes them interchangeable at runtime',
      diagram: StrategyPatternDiagram,
      details: [
        {
          name: 'Algorithm Encapsulation',
          diagram: StrategyPatternDiagram,
          explanation: 'Each algorithm is encapsulated in its own class implementing a common interface. This separates the algorithm from the code that uses it, making both easier to understand, test, and maintain independently. New algorithms can be added without changing existing code.',
          codeExample: `// Strategy interface
public interface CompressionStrategy {
    byte[] compress(byte[] data);
    byte[] decompress(byte[] data);
    String getFileExtension();
}

// ZIP compression strategy
public class ZipCompressionStrategy implements CompressionStrategy {
    @Override
    public byte[] compress(byte[] data) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (GZIPOutputStream gzip = new GZIPOutputStream(baos)) {
            gzip.write(data);
        }
        return baos.toByteArray();
    }

    @Override
    public byte[] decompress(byte[] data) {
        try (GZIPInputStream gzip = new GZIPInputStream(
                new ByteArrayInputStream(data))) {
            return gzip.readAllBytes();
        }
    }

    @Override
    public String getFileExtension() { return ".gz"; }
}

// LZ4 compression strategy (faster, less compression)
public class Lz4CompressionStrategy implements CompressionStrategy {
    private final LZ4Compressor compressor = LZ4Factory.fastestInstance().fastCompressor();
    private final LZ4Decompressor decompressor = LZ4Factory.fastestInstance().fastDecompressor();

    @Override
    public byte[] compress(byte[] data) {
        return compressor.compress(data);
    }

    @Override
    public byte[] decompress(byte[] data) {
        return decompressor.decompress(data, data.length * 10);
    }

    @Override
    public String getFileExtension() { return ".lz4"; }
}`
        },
        {
          name: 'Runtime Strategy Selection',
          explanation: 'Strategies can be selected and changed at runtime based on context or configuration. The client can switch between different algorithms dynamically without code changes, enabling flexible, adaptive behavior. This is particularly useful when the best algorithm depends on runtime conditions.',
          codeExample: `public interface PricingStrategy {
    BigDecimal calculatePrice(Product product, Customer customer);
}

public class RegularPricingStrategy implements PricingStrategy {
    @Override
    public BigDecimal calculatePrice(Product product, Customer customer) {
        return product.getBasePrice();
    }
}

public class VipPricingStrategy implements PricingStrategy {
    private static final BigDecimal VIP_DISCOUNT = new BigDecimal("0.20");

    @Override
    public BigDecimal calculatePrice(Product product, Customer customer) {
        BigDecimal basePrice = product.getBasePrice();
        return basePrice.subtract(basePrice.multiply(VIP_DISCOUNT));
    }
}

public class SeasonalPricingStrategy implements PricingStrategy {
    private final BigDecimal discountRate;

    public SeasonalPricingStrategy(BigDecimal discountRate) {
        this.discountRate = discountRate;
    }

    @Override
    public BigDecimal calculatePrice(Product product, Customer customer) {
        BigDecimal basePrice = product.getBasePrice();
        return basePrice.subtract(basePrice.multiply(discountRate));
    }
}

// Context class that uses strategy
public class ShoppingCart {
    private PricingStrategy pricingStrategy;

    public void setPricingStrategy(PricingStrategy strategy) {
        this.pricingStrategy = strategy;
    }

    public BigDecimal calculateTotal(Customer customer) {
        return items.stream()
            .map(item -> pricingStrategy.calculatePrice(item.getProduct(), customer))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}

// Usage - strategy selected at runtime
ShoppingCart cart = new ShoppingCart();
if (customer.isVip()) {
    cart.setPricingStrategy(new VipPricingStrategy());
} else if (isBlackFriday()) {
    cart.setPricingStrategy(new SeasonalPricingStrategy(new BigDecimal("0.30")));
} else {
    cart.setPricingStrategy(new RegularPricingStrategy());
}`
        },
        {
          name: 'Eliminating Conditionals',
          explanation: 'Instead of complex if-else or switch statements to select behavior, you select a strategy object. This reduces cyclomatic complexity, makes code more maintainable, and makes it easy to add new strategies without modifying existing code. The Open-Closed Principle is naturally satisfied.',
          codeExample: `// BEFORE: Complex conditionals (bad)
public class PaymentProcessor {
    public PaymentResult process(Payment payment) {
        if (payment.getType().equals("CREDIT_CARD")) {
            // 50 lines of credit card processing
            return processCreditCard(payment);
        } else if (payment.getType().equals("PAYPAL")) {
            // 50 lines of PayPal processing
            return processPayPal(payment);
        } else if (payment.getType().equals("CRYPTO")) {
            // 50 lines of crypto processing
            return processCrypto(payment);
        } else if (payment.getType().equals("BANK_TRANSFER")) {
            // 50 lines of bank transfer processing
            return processBankTransfer(payment);
        }
        throw new UnsupportedPaymentException(payment.getType());
    }
}

// AFTER: Strategy pattern (good)
public interface PaymentStrategy {
    PaymentResult process(Payment payment);
    boolean supports(String paymentType);
}

@Component
public class CreditCardStrategy implements PaymentStrategy {
    @Override
    public PaymentResult process(Payment payment) {
        // Credit card specific logic
        return stripeClient.charge(payment);
    }

    @Override
    public boolean supports(String paymentType) {
        return "CREDIT_CARD".equals(paymentType);
    }
}

@Component
public class PayPalStrategy implements PaymentStrategy {
    @Override
    public PaymentResult process(Payment payment) {
        return paypalClient.executePayment(payment);
    }

    @Override
    public boolean supports(String paymentType) {
        return "PAYPAL".equals(paymentType);
    }
}

// Clean payment processor using strategies
@Service
public class PaymentProcessor {
    private final List<PaymentStrategy> strategies;

    public PaymentProcessor(List<PaymentStrategy> strategies) {
        this.strategies = strategies;
    }

    public PaymentResult process(Payment payment) {
        return strategies.stream()
            .filter(s -> s.supports(payment.getType()))
            .findFirst()
            .orElseThrow(() -> new UnsupportedPaymentException(payment.getType()))
            .process(payment);
    }
}`
        }
      ]
    },
    {
      id: 'factory-pattern',
      name: 'Factory Pattern',
      icon: '🏭',
      color: '#f59e0b',
      description: 'Creates objects through interface without specifying exact class',
      diagram: FactoryPatternDiagram,
      details: [
        {
          name: 'Factory Method Pattern',
          diagram: FactoryPatternDiagram,
          explanation: 'Subclasses decide which class to instantiate. The factory method is defined in an abstract class, and concrete subclasses override it to create specific types. This follows the Open-Closed Principle - open for extension, closed for modification. Each factory subclass produces its own product variant.',
          codeExample: `// Product interface
public interface Document {
    void open();
    void save();
    void close();
}

// Concrete products
public class PdfDocument implements Document {
    @Override public void open() { System.out.println("Opening PDF"); }
    @Override public void save() { System.out.println("Saving PDF"); }
    @Override public void close() { System.out.println("Closing PDF"); }
}

public class WordDocument implements Document {
    @Override public void open() { System.out.println("Opening Word doc"); }
    @Override public void save() { System.out.println("Saving Word doc"); }
    @Override public void close() { System.out.println("Closing Word doc"); }
}

// Creator with factory method
public abstract class Application {
    // Factory method - subclasses decide what to create
    public abstract Document createDocument();

    public void newDocument() {
        Document doc = createDocument(); // Calls factory method
        doc.open();
        documents.add(doc);
    }
}

// Concrete creators
public class PdfApplication extends Application {
    @Override
    public Document createDocument() {
        return new PdfDocument();
    }
}

public class WordApplication extends Application {
    @Override
    public Document createDocument() {
        return new WordDocument();
    }
}

// Usage
Application app = new PdfApplication();
app.newDocument(); // Creates PdfDocument`
        },
        {
          name: 'Abstract Factory Pattern',
          explanation: 'Creates families of related objects without specifying concrete classes. For example, a WindowsFactory creates Windows-style buttons and checkboxes, while MacFactory creates Mac-style components. This ensures consistent object families that work together properly.',
          codeExample: `// Abstract products
public interface Button {
    void render();
    void onClick(Runnable handler);
}

public interface Checkbox {
    void render();
    boolean isChecked();
}

// Concrete products - Windows family
public class WindowsButton implements Button {
    @Override public void render() { System.out.println("Windows button"); }
    @Override public void onClick(Runnable handler) { /* Windows click */ }
}

public class WindowsCheckbox implements Checkbox {
    @Override public void render() { System.out.println("Windows checkbox"); }
    @Override public boolean isChecked() { return checked; }
}

// Concrete products - Mac family
public class MacButton implements Button {
    @Override public void render() { System.out.println("Mac button"); }
    @Override public void onClick(Runnable handler) { /* Mac click */ }
}

public class MacCheckbox implements Checkbox {
    @Override public void render() { System.out.println("Mac checkbox"); }
    @Override public boolean isChecked() { return checked; }
}

// Abstract factory
public interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

// Concrete factories
public class WindowsFactory implements GUIFactory {
    @Override public Button createButton() { return new WindowsButton(); }
    @Override public Checkbox createCheckbox() { return new WindowsCheckbox(); }
}

public class MacFactory implements GUIFactory {
    @Override public Button createButton() { return new MacButton(); }
    @Override public Checkbox createCheckbox() { return new MacCheckbox(); }
}

// Client code works with any factory
public class Application {
    private final Button button;
    private final Checkbox checkbox;

    public Application(GUIFactory factory) {
        button = factory.createButton();
        checkbox = factory.createCheckbox();
    }

    public void render() {
        button.render();
        checkbox.render();
    }
}

// Usage
GUIFactory factory = System.getProperty("os.name").contains("Mac")
    ? new MacFactory()
    : new WindowsFactory();
Application app = new Application(factory);`
        },
        {
          name: 'Static Factory Methods',
          diagram: StaticMethodsDiagram,
          explanation: 'A centralized factory class with methods that create objects based on parameters. While not a "Gang of Four" pattern, it is practical for simple cases. Static factory methods on the class itself offer naming flexibility and can return cached instances or subtype instances.',
          codeExample: `// Simple Factory class
public class NotificationFactory {
    public static Notification create(String type, String message) {
        return switch (type.toUpperCase()) {
            case "EMAIL" -> new EmailNotification(message);
            case "SMS" -> new SmsNotification(message);
            case "PUSH" -> new PushNotification(message);
            case "SLACK" -> new SlackNotification(message);
            default -> throw new IllegalArgumentException("Unknown type: " + type);
        };
    }
}

// Usage
Notification notification = NotificationFactory.create("EMAIL", "Hello!");
notification.send("user@example.com");

// Static Factory Methods (on the class itself)
public class Money {
    private final BigDecimal amount;
    private final Currency currency;

    private Money(BigDecimal amount, Currency currency) {
        this.amount = amount;
        this.currency = currency;
    }

    // Named static factory methods
    public static Money dollars(double amount) {
        return new Money(BigDecimal.valueOf(amount), Currency.USD);
    }

    public static Money euros(double amount) {
        return new Money(BigDecimal.valueOf(amount), Currency.EUR);
    }

    public static Money of(BigDecimal amount, Currency currency) {
        return new Money(amount, currency);
    }

    public static Money zero(Currency currency) {
        return new Money(BigDecimal.ZERO, currency);
    }

    // Can return cached instances
    private static final Money ZERO_USD = new Money(BigDecimal.ZERO, Currency.USD);
    public static Money zeroUsd() {
        return ZERO_USD; // Return cached instance
    }
}

// Clear, readable usage
Money price = Money.dollars(29.99);
Money shipping = Money.euros(5.00);
Money empty = Money.zero(Currency.GBP);`
        }
      ]
    },
    {
      id: 'adapter-pattern',
      name: 'Adapter Pattern',
      icon: '🔌',
      color: '#06b6d4',
      description: 'Allows incompatible interfaces to work together by wrapping existing class',
      diagram: AdapterPatternDiagram,
      details: [
        {
          name: 'Interface Translation',
          diagram: AdapterPatternDiagram,
          explanation: 'Adapters convert one interface into another that clients expect. They act as translators between incompatible interfaces, making it possible to use existing code with new systems without modifying either one. The adapter wraps the adaptee and implements the target interface.',
          codeExample: `// Target interface that client expects
public interface MediaPlayer {
    void play(String filename);
    void pause();
    void stop();
}

// Existing third-party library with different interface (Adaptee)
public class VlcLibrary {
    public void vlcPlay(String path) { /* VLC implementation */ }
    public void vlcPause() { /* VLC pause */ }
    public void vlcStop() { /* VLC stop */ }
}

public class FfmpegLibrary {
    public void startPlayback(File file) { /* FFmpeg implementation */ }
    public void pausePlayback() { /* FFmpeg pause */ }
    public void stopPlayback() { /* FFmpeg stop */ }
}

// Adapter translates MediaPlayer interface to VlcLibrary
public class VlcMediaPlayerAdapter implements MediaPlayer {
    private final VlcLibrary vlc;

    public VlcMediaPlayerAdapter(VlcLibrary vlc) {
        this.vlc = vlc;
    }

    @Override
    public void play(String filename) {
        vlc.vlcPlay(filename); // Translate to VLC method
    }

    @Override
    public void pause() {
        vlc.vlcPause();
    }

    @Override
    public void stop() {
        vlc.vlcStop();
    }
}

// Adapter for FFmpeg
public class FfmpegMediaPlayerAdapter implements MediaPlayer {
    private final FfmpegLibrary ffmpeg;

    public FfmpegMediaPlayerAdapter(FfmpegLibrary ffmpeg) {
        this.ffmpeg = ffmpeg;
    }

    @Override
    public void play(String filename) {
        ffmpeg.startPlayback(new File(filename)); // Translate and convert
    }

    @Override
    public void pause() { ffmpeg.pausePlayback(); }

    @Override
    public void stop() { ffmpeg.stopPlayback(); }
}

// Client code uses unified interface
MediaPlayer player = new VlcMediaPlayerAdapter(new VlcLibrary());
player.play("video.mp4");`
        },
        {
          name: 'Legacy System Integration',
          explanation: 'Adapters are crucial for integrating legacy systems. You cannot modify old code, but you can wrap it with an adapter that provides a modern interface. This allows gradual modernization without big-bang rewrites. The legacy system continues to work unchanged.',
          codeExample: `// Legacy payment system (cannot modify)
public class LegacyPaymentSystem {
    public int processPayment(String cardNum, String exp, int cents) {
        // Returns: 0=success, 1=declined, 2=error
        return legacyProcessor.charge(cardNum, exp, cents);
    }

    public boolean voidTransaction(int transactionCode) {
        return legacyProcessor.void(transactionCode);
    }
}

// Modern payment interface
public interface PaymentGateway {
    PaymentResult charge(CreditCard card, Money amount);
    RefundResult refund(String transactionId, Money amount);
}

public record PaymentResult(boolean success, String transactionId, String error) {}
public record RefundResult(boolean success, String error) {}

// Adapter bridges legacy to modern
public class LegacyPaymentAdapter implements PaymentGateway {
    private final LegacyPaymentSystem legacy;

    public LegacyPaymentAdapter(LegacyPaymentSystem legacy) {
        this.legacy = legacy;
    }

    @Override
    public PaymentResult charge(CreditCard card, Money amount) {
        // Convert modern objects to legacy format
        int cents = amount.toCents();
        String cardNum = card.getNumber();
        String exp = card.getExpiryMonth() + "/" + card.getExpiryYear();

        int result = legacy.processPayment(cardNum, exp, cents);

        // Convert legacy response to modern format
        return switch (result) {
            case 0 -> new PaymentResult(true, generateTxnId(), null);
            case 1 -> new PaymentResult(false, null, "Card declined");
            case 2 -> new PaymentResult(false, null, "Processing error");
            default -> new PaymentResult(false, null, "Unknown error");
        };
    }

    @Override
    public RefundResult refund(String transactionId, Money amount) {
        int txnCode = parseLegacyTxnCode(transactionId);
        boolean success = legacy.voidTransaction(txnCode);
        return new RefundResult(success, success ? null : "Refund failed");
    }
}

// Modern code uses modern interface
PaymentGateway gateway = new LegacyPaymentAdapter(legacySystem);
PaymentResult result = gateway.charge(card, Money.dollars(99.99));`
        },
        {
          name: 'Third-Party Library Abstraction',
          explanation: 'When using third-party libraries with different interfaces than your application expects, adapters provide a consistent interface. This also isolates your code from external dependencies, making it easier to swap libraries later without changing your application code.',
          codeExample: `// Your application's logging interface
public interface Logger {
    void debug(String message);
    void info(String message);
    void warn(String message);
    void error(String message, Throwable t);
}

// Adapter for SLF4J
public class Slf4jLoggerAdapter implements Logger {
    private final org.slf4j.Logger slf4jLogger;

    public Slf4jLoggerAdapter(Class<?> clazz) {
        this.slf4jLogger = org.slf4j.LoggerFactory.getLogger(clazz);
    }

    @Override public void debug(String message) { slf4jLogger.debug(message); }
    @Override public void info(String message) { slf4jLogger.info(message); }
    @Override public void warn(String message) { slf4jLogger.warn(message); }
    @Override public void error(String message, Throwable t) { slf4jLogger.error(message, t); }
}

// Adapter for Log4j2
public class Log4j2LoggerAdapter implements Logger {
    private final org.apache.logging.log4j.Logger log4jLogger;

    public Log4j2LoggerAdapter(Class<?> clazz) {
        this.log4jLogger = org.apache.logging.log4j.LogManager.getLogger(clazz);
    }

    @Override public void debug(String message) { log4jLogger.debug(message); }
    @Override public void info(String message) { log4jLogger.info(message); }
    @Override public void warn(String message) { log4jLogger.warn(message); }
    @Override public void error(String message, Throwable t) { log4jLogger.error(message, t); }
}

// Factory to create appropriate adapter
public class LoggerFactory {
    public static Logger getLogger(Class<?> clazz) {
        // Can switch implementations without changing application code
        return new Slf4jLoggerAdapter(clazz);
    }
}

// Application code is isolated from logging library
public class OrderService {
    private static final Logger log = LoggerFactory.getLogger(OrderService.class);

    public void processOrder(Order order) {
        log.info("Processing order: " + order.getId());
        try {
            // process...
        } catch (Exception e) {
            log.error("Failed to process order", e);
        }
    }
}`
        }
      ]
    },
    {
      id: 'interface-segregation',
      name: 'Interface Segregation',
      icon: '✂️',
      color: '#ec4899',
      description: 'SOLID principle stating interfaces should be small and focused',
      diagram: InterfaceSegregationDiagram,
      details: [
        {
          name: 'Small, Focused Interfaces',
          diagram: InterfaceSegregationDiagram,
          explanation: 'Instead of one large interface with many methods, create multiple small interfaces with few methods each. Clients should not be forced to depend on methods they do not use. This makes code more flexible and reduces coupling between components.',
          codeExample: `// BAD: Fat interface forces unused method implementations
public interface Worker {
    void work();
    void eat();
    void sleep();
    void attendMeeting();
    void writeReport();
}

// Robot must implement methods that don't apply
public class Robot implements Worker {
    @Override public void work() { /* OK */ }
    @Override public void eat() { /* Doesn't make sense! */ }
    @Override public void sleep() { /* Doesn't make sense! */ }
    @Override public void attendMeeting() { /* Maybe OK */ }
    @Override public void writeReport() { /* OK */ }
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

public interface Reportable {
    void writeReport();
}

// Human implements all relevant interfaces
public class Human implements Workable, Feedable, Sleepable, Reportable {
    @Override public void work() { System.out.println("Working"); }
    @Override public void eat() { System.out.println("Eating lunch"); }
    @Override public void sleep() { System.out.println("Sleeping"); }
    @Override public void writeReport() { System.out.println("Writing report"); }
}

// Robot only implements what makes sense
public class Robot implements Workable, Reportable {
    @Override public void work() { System.out.println("Robot working"); }
    @Override public void writeReport() { System.out.println("Generating report"); }
}`
        },
        {
          name: 'Role-Based Interface Design',
          explanation: 'Design interfaces around roles or capabilities: Readable, Writable, Closeable, Seekable. Objects implement only the interfaces for capabilities they support. This prevents forcing objects to implement methods that do not make sense for them and enables flexible composition.',
          codeExample: `// Role-based interfaces from Java I/O
public interface Readable {
    int read(CharBuffer cb) throws IOException;
}

public interface Appendable {
    Appendable append(char c) throws IOException;
    Appendable append(CharSequence csq) throws IOException;
}

public interface Closeable {
    void close() throws IOException;
}

public interface Flushable {
    void flush() throws IOException;
}

// Custom role-based interfaces for data access
public interface Findable<T, ID> {
    Optional<T> findById(ID id);
    List<T> findAll();
    boolean existsById(ID id);
}

public interface Saveable<T> {
    T save(T entity);
    List<T> saveAll(List<T> entities);
}

public interface Deletable<T, ID> {
    void delete(T entity);
    void deleteById(ID id);
    void deleteAll();
}

// Read-only repository only needs Findable
public class ReadOnlyUserRepository implements Findable<User, Long> {
    @Override public Optional<User> findById(Long id) { /* impl */ }
    @Override public List<User> findAll() { /* impl */ }
    @Override public boolean existsById(Long id) { /* impl */ }
}

// Full repository implements all roles
public class UserRepository implements Findable<User, Long>, Saveable<User>, Deletable<User, Long> {
    @Override public Optional<User> findById(Long id) { /* impl */ }
    @Override public List<User> findAll() { /* impl */ }
    @Override public boolean existsById(Long id) { /* impl */ }
    @Override public User save(User entity) { /* impl */ }
    @Override public List<User> saveAll(List<User> entities) { /* impl */ }
    @Override public void delete(User entity) { /* impl */ }
    @Override public void deleteById(Long id) { /* impl */ }
    @Override public void deleteAll() { /* impl */ }
}

// Service only depends on what it needs
public class ReportService {
    private final Findable<User, Long> users; // Only needs read access

    public ReportService(Findable<User, Long> users) {
        this.users = users;
    }
}`
        },
        {
          name: 'Avoiding Fat Interface Anti-Pattern',
          explanation: 'Fat interfaces force implementations to provide methods they do not need, often throwing UnsupportedOperationException or leaving empty implementations. This violates the Liskov Substitution Principle and makes code fragile. Segregated interfaces prevent this problem entirely.',
          codeExample: `// FAT INTERFACE ANTI-PATTERN
public interface MessagingService {
    void sendEmail(String to, String subject, String body);
    void sendSms(String phoneNumber, String message);
    void sendPushNotification(String deviceId, String message);
    void sendSlackMessage(String channel, String message);
    void sendWebhook(String url, String payload);
}

// EmailService forced to implement irrelevant methods
public class EmailOnlyService implements MessagingService {
    @Override
    public void sendEmail(String to, String subject, String body) {
        // Actual implementation
    }

    @Override
    public void sendSms(String phoneNumber, String message) {
        throw new UnsupportedOperationException("SMS not supported"); // BAD!
    }

    @Override
    public void sendPushNotification(String deviceId, String message) {
        throw new UnsupportedOperationException("Push not supported"); // BAD!
    }

    @Override
    public void sendSlackMessage(String channel, String message) {
        throw new UnsupportedOperationException("Slack not supported"); // BAD!
    }

    @Override
    public void sendWebhook(String url, String payload) {
        throw new UnsupportedOperationException("Webhook not supported"); // BAD!
    }
}

// SEGREGATED INTERFACES SOLUTION
public interface EmailSender {
    void sendEmail(String to, String subject, String body);
}

public interface SmsSender {
    void sendSms(String phoneNumber, String message);
}

public interface PushNotificationSender {
    void sendPushNotification(String deviceId, String message);
}

// Implementations only have methods they can handle
public class SendGridEmailService implements EmailSender {
    @Override
    public void sendEmail(String to, String subject, String body) {
        sendGridClient.send(to, subject, body);
    }
}

public class TwilioSmsService implements SmsSender {
    @Override
    public void sendSms(String phoneNumber, String message) {
        twilioClient.sendMessage(phoneNumber, message);
    }
}

// Multi-channel service implements multiple interfaces
public class OmnichannelService implements EmailSender, SmsSender, PushNotificationSender {
    @Override public void sendEmail(String to, String subject, String body) { /* impl */ }
    @Override public void sendSms(String phoneNumber, String message) { /* impl */ }
    @Override public void sendPushNotification(String deviceId, String message) { /* impl */ }
}`
        }
      ]
    },
    {
      id: 'api-design',
      name: 'API Design',
      icon: '🎨',
      color: '#ef4444',
      description: 'Principles for designing clear, consistent, and maintainable APIs',
      diagram: ApiDesignDiagram,
      details: [
        {
          name: 'Clear and Consistent Naming',
          diagram: ApiDesignDiagram,
          explanation: 'Use consistent naming conventions: create/find/update/delete for CRUD, is/has for booleans, get for simple retrieval. Method names should clearly describe what they do. Parameters and returns should be well-documented with preconditions and exceptions.',
          codeExample: `public interface UserService {
    // CRUD operations use consistent verbs
    User createUser(CreateUserRequest request);
    Optional<User> findUserById(Long id);
    List<User> findUsersByRole(Role role);
    User updateUser(Long id, UpdateUserRequest request);
    void deleteUser(Long id);

    // Boolean queries use is/has/can prefixes
    boolean isEmailAvailable(String email);
    boolean hasPermission(Long userId, Permission permission);
    boolean canAccessResource(Long userId, Long resourceId);

    // Counts are explicit
    long countActiveUsers();
    long countUsersByRole(Role role);

    // Actions are verbs describing the action
    void activateUser(Long id);
    void deactivateUser(Long id);
    void resetPassword(Long id);
    void sendVerificationEmail(Long id);
}

// Parameter objects for complex inputs
public record CreateUserRequest(
    @NotBlank String email,
    @NotBlank String name,
    @NotNull Role role,
    @Valid Address address  // Optional nested object
) {}

// Return objects are clear about what they contain
public record UserSearchResult(
    List<User> users,
    int totalCount,
    int page,
    int pageSize,
    boolean hasNextPage
) {}`
        },
        {
          name: 'Builder Pattern for Complex Objects',
          explanation: 'Prefer immutable configuration objects with builder pattern for complex setup. Builders provide a fluent, readable API for constructing objects with many optional parameters. Immutability makes objects thread-safe and easier to reason about.',
          codeExample: `public interface HttpClient {
    Response execute(Request request);
}

// Immutable request with builder
public final class Request {
    private final String url;
    private final HttpMethod method;
    private final Map<String, String> headers;
    private final byte[] body;
    private final Duration timeout;
    private final int maxRetries;

    private Request(Builder builder) {
        this.url = Objects.requireNonNull(builder.url);
        this.method = builder.method;
        this.headers = Map.copyOf(builder.headers); // Immutable copy
        this.body = builder.body != null ? builder.body.clone() : null;
        this.timeout = builder.timeout;
        this.maxRetries = builder.maxRetries;
    }

    // Only getters, no setters
    public String getUrl() { return url; }
    public HttpMethod getMethod() { return method; }
    public Map<String, String> getHeaders() { return headers; }

    public static Builder builder(String url) {
        return new Builder(url);
    }

    public static class Builder {
        private final String url;
        private HttpMethod method = HttpMethod.GET;
        private final Map<String, String> headers = new HashMap<>();
        private byte[] body;
        private Duration timeout = Duration.ofSeconds(30);
        private int maxRetries = 3;

        private Builder(String url) {
            this.url = url;
        }

        public Builder method(HttpMethod method) {
            this.method = method;
            return this;
        }

        public Builder header(String name, String value) {
            this.headers.put(name, value);
            return this;
        }

        public Builder body(byte[] body) {
            this.body = body;
            return this;
        }

        public Builder timeout(Duration timeout) {
            this.timeout = timeout;
            return this;
        }

        public Builder maxRetries(int maxRetries) {
            this.maxRetries = maxRetries;
            return this;
        }

        public Request build() {
            return new Request(this);
        }
    }
}

// Fluent, readable usage
Request request = Request.builder("https://api.example.com/users")
    .method(HttpMethod.POST)
    .header("Content-Type", "application/json")
    .header("Authorization", "Bearer " + token)
    .body(jsonBody.getBytes())
    .timeout(Duration.ofSeconds(10))
    .maxRetries(5)
    .build();`
        },
        {
          name: 'Fail-Fast Validation',
          explanation: 'Validate inputs eagerly and throw exceptions early with clear messages. Do not return null - use Optional for potentially missing values. Make invalid states unrepresentable. A well-designed API makes it hard to use incorrectly.',
          codeExample: `public interface AccountService {
    // Returns Optional instead of null
    Optional<Account> findById(String accountId);

    // Throws clear exceptions for invalid input
    Account createAccount(CreateAccountRequest request)
        throws InvalidEmailException, DuplicateAccountException;

    // Uses domain types that enforce validity
    void transfer(AccountId from, AccountId to, Money amount);
}

// Value types that enforce validity at construction
public final class AccountId {
    private final String value;

    public AccountId(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Account ID cannot be blank");
        }
        if (!value.matches("^ACC-[0-9]{10}$")) {
            throw new IllegalArgumentException(
                "Account ID must match format ACC-XXXXXXXXXX, got: " + value);
        }
        this.value = value;
    }

    public String getValue() { return value; }
}

public final class Money {
    private final BigDecimal amount;
    private final Currency currency;

    public Money(BigDecimal amount, Currency currency) {
        Objects.requireNonNull(amount, "Amount cannot be null");
        Objects.requireNonNull(currency, "Currency cannot be null");
        if (amount.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Amount cannot be negative: " + amount);
        }
        this.amount = amount;
        this.currency = currency;
    }

    public static Money dollars(double amount) {
        return new Money(BigDecimal.valueOf(amount), Currency.USD);
    }
}

// Implementation validates early
public class AccountServiceImpl implements AccountService {
    @Override
    public Account createAccount(CreateAccountRequest request) {
        // Validate immediately - fail fast
        Objects.requireNonNull(request, "Request cannot be null");

        if (!EmailValidator.isValid(request.email())) {
            throw new InvalidEmailException("Invalid email: " + request.email());
        }

        if (accountRepository.existsByEmail(request.email())) {
            throw new DuplicateAccountException(
                "Account already exists for: " + request.email());
        }

        // Only proceed if all validations pass
        return accountRepository.save(new Account(request));
    }

    @Override
    public void transfer(AccountId from, AccountId to, Money amount) {
        // Domain types guarantee validity - no null checks needed
        Account source = findById(from.getValue())
            .orElseThrow(() -> new AccountNotFoundException(from));
        Account target = findById(to.getValue())
            .orElseThrow(() -> new AccountNotFoundException(to));

        source.withdraw(amount);
        target.deposit(amount);
    }
}`
        }
      ]
    },
    {
      id: 'polymorphism',
      name: 'Polymorphism via Interfaces',
      icon: '🎭',
      color: '#6366f1',
      description: 'Using interfaces to achieve runtime polymorphism',
      diagram: PolymorphismDiagram,
      details: [
        {
          name: 'Interface Polymorphism',
          diagram: PolymorphismDiagram,
          explanation: 'Different classes implementing the same interface can be treated uniformly. A List can be an ArrayList, LinkedList, or Vector - client code does not know or care. This enables writing generic, reusable code that works with any implementation.',
          codeExample: `public interface Shape {
    double area();
    double perimeter();
    void draw(Canvas canvas);
}

public class Circle implements Shape {
    private final double radius;

    public Circle(double radius) { this.radius = radius; }

    @Override public double area() { return Math.PI * radius * radius; }
    @Override public double perimeter() { return 2 * Math.PI * radius; }
    @Override public void draw(Canvas canvas) { canvas.drawCircle(radius); }
}

public class Rectangle implements Shape {
    private final double width, height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override public double area() { return width * height; }
    @Override public double perimeter() { return 2 * (width + height); }
    @Override public void draw(Canvas canvas) { canvas.drawRect(width, height); }
}

public class Triangle implements Shape {
    private final double a, b, c;

    @Override public double area() {
        double s = perimeter() / 2;
        return Math.sqrt(s * (s-a) * (s-b) * (s-c));
    }
    @Override public double perimeter() { return a + b + c; }
    @Override public void draw(Canvas canvas) { canvas.drawTriangle(a, b, c); }
}

// Polymorphic code works with ANY shape
public class ShapeCalculator {
    public double totalArea(List<Shape> shapes) {
        return shapes.stream()
            .mapToDouble(Shape::area)
            .sum();
    }

    public void drawAll(List<Shape> shapes, Canvas canvas) {
        for (Shape shape : shapes) {
            shape.draw(canvas); // Each shape draws itself
        }
    }
}

// Usage - mix any shapes
List<Shape> shapes = List.of(
    new Circle(5),
    new Rectangle(4, 6),
    new Triangle(3, 4, 5)
);
double total = calculator.totalArea(shapes); // Works with all shapes`
        },
        {
          name: 'Programming to Interfaces',
          explanation: 'Declare variables with interface types, not implementation types: List<String> not ArrayList<String>. This makes code more flexible - you can change implementations without changing client code. It is a fundamental best practice in Java.',
          codeExample: `// BAD: Programming to implementation
public class OrderService {
    // Tied to specific implementations
    private ArrayList<Order> orders = new ArrayList<>();
    private HashMap<String, Customer> customers = new HashMap<>();
    private LinkedList<String> notifications = new LinkedList<>();

    public ArrayList<Order> getOrders() {
        return orders; // Exposes implementation
    }
}

// GOOD: Programming to interfaces
public class OrderService {
    // Interface types allow flexibility
    private List<Order> orders = new ArrayList<>();
    private Map<String, Customer> customers = new HashMap<>();
    private Queue<String> notifications = new LinkedList<>();

    public List<Order> getOrders() {
        return List.copyOf(orders); // Return unmodifiable copy
    }
}

// Benefits of interface types
public class DataProcessor {
    // Works with ANY List implementation
    public <T> T findFirst(List<T> items, Predicate<T> condition) {
        for (T item : items) {
            if (condition.test(item)) {
                return item;
            }
        }
        return null;
    }
}

// All these work:
DataProcessor processor = new DataProcessor();
processor.findFirst(new ArrayList<>(), x -> true);   // ArrayList
processor.findFirst(new LinkedList<>(), x -> true);  // LinkedList
processor.findFirst(List.of(1, 2, 3), x -> true);    // ImmutableList
processor.findFirst(new CopyOnWriteArrayList<>(), x -> true); // Thread-safe

// Easy to change implementation
public class CacheService {
    private Map<String, Object> cache;

    public CacheService(boolean concurrent) {
        // Change implementation based on need
        cache = concurrent
            ? new ConcurrentHashMap<>()
            : new HashMap<>();
    }

    // Rest of code unchanged
    public void put(String key, Object value) { cache.put(key, value); }
    public Object get(String key) { return cache.get(key); }
}`
        },
        {
          name: 'Functional Interfaces and Lambdas',
          diagram: DefaultMethodsDiagram,
          explanation: 'Interfaces with one abstract method (SAM) enable lambda expressions and method references. Predicate, Function, Consumer, and Supplier are functional interfaces that power Java functional programming features and the stream API.',
          codeExample: `// Built-in functional interfaces
@FunctionalInterface
public interface Predicate<T> {
    boolean test(T t);
}

@FunctionalInterface
public interface Function<T, R> {
    R apply(T t);
}

@FunctionalInterface
public interface Consumer<T> {
    void accept(T t);
}

@FunctionalInterface
public interface Supplier<T> {
    T get();
}

// Custom functional interface
@FunctionalInterface
public interface Validator<T> {
    ValidationResult validate(T item);

    // Can have default methods
    default Validator<T> and(Validator<T> other) {
        return item -> {
            ValidationResult result = this.validate(item);
            return result.isValid() ? other.validate(item) : result;
        };
    }
}

// Using functional interfaces with lambdas
public class UserProcessor {
    public List<User> filterUsers(List<User> users, Predicate<User> criteria) {
        return users.stream()
            .filter(criteria)
            .collect(Collectors.toList());
    }

    public <R> List<R> transformUsers(List<User> users, Function<User, R> mapper) {
        return users.stream()
            .map(mapper)
            .collect(Collectors.toList());
    }

    public void processEach(List<User> users, Consumer<User> action) {
        users.forEach(action);
    }
}

// Lambda expressions implement functional interfaces
UserProcessor processor = new UserProcessor();

// Predicate lambda
List<User> adults = processor.filterUsers(users, user -> user.getAge() >= 18);
List<User> active = processor.filterUsers(users, User::isActive); // Method reference

// Function lambda
List<String> names = processor.transformUsers(users, user -> user.getName());
List<String> emails = processor.transformUsers(users, User::getEmail);

// Consumer lambda
processor.processEach(users, user -> System.out.println(user.getName()));
processor.processEach(users, emailService::sendWelcomeEmail);

// Chaining with Streams (all lambdas implementing functional interfaces)
List<String> result = users.stream()
    .filter(u -> u.getAge() >= 18)          // Predicate
    .filter(User::isActive)                  // Predicate (method ref)
    .map(User::getEmail)                     // Function
    .filter(email -> email.endsWith(".com")) // Predicate
    .sorted()                                // Uses Comparator
    .collect(Collectors.toList());`
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
      { name: 'Interface-Based Design', icon: '📜', page: 'Interface' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(14, 165, 233, 0.2)',
    border: '1px solid rgba(14, 165, 233, 0.3)',
    borderRadius: '0.5rem',
    color: '#38bdf8',
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
        <h1 style={titleStyle}>Interface-Based Design</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(14, 165, 233, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(14, 165, 233, 0.2)'
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
          colors={INTERFACE_COLORS}
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
              maxWidth: '1200px',
              maxHeight: '92vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              colors={INTERFACE_COLORS}
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

export default Interface

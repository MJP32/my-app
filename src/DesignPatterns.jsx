import { useState, useEffect, useRef } from 'react'

// Pattern diagram component
const PatternDiagram = ({ patternName }) => {
  const diagrams = {
    'Singleton': (
      <svg width="700" height="350" viewBox="0 0 700 350" style={{ maxWidth: '100%', height: 'auto' }}>
        <rect x="250" y="80" width="200" height="180" rx="8" fill="#3b82f6" stroke="#1e40af" strokeWidth="3"/>
        <text x="350" y="110" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">Singleton</text>
        <text x="350" y="140" textAnchor="middle" fontSize="14" fill="white">- instance: Singleton</text>
        <text x="350" y="165" textAnchor="middle" fontSize="14" fill="white">- Singleton()</text>
        <line x1="250" y1="175" x2="450" y2="175" stroke="white" strokeWidth="2"/>
        <text x="350" y="200" textAnchor="middle" fontSize="14" fill="white">+ getInstance(): Singleton</text>

        <path d="M 450 170 Q 550 170 550 220 Q 550 270 450 270" fill="none" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowRed)"/>
        <text x="580" y="220" fontSize="14" fontWeight="600" fill="#ef4444">Only one instance</text>

        <defs>
          <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
          </marker>
        </defs>
      </svg>
    ),

    'Factory Method': (
      <svg width="700" height="400" viewBox="0 0 700 400" style={{ maxWidth: '100%', height: 'auto' }}>
        <rect x="250" y="20" width="200" height="80" rx="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
        <text x="350" y="50" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Creator</text>
        <text x="350" y="75" textAnchor="middle" fontSize="13" fill="white">+ factoryMethod()</text>

        <line x1="150" y1="100" x2="150" y2="180" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowGray)"/>
        <line x1="550" y1="100" x2="550" y2="180" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowGray)"/>

        <rect x="50" y="180" width="200" height="80" rx="8" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
        <text x="150" y="210" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">ConcreteCreatorA</text>
        <text x="150" y="235" textAnchor="middle" fontSize="12" fill="white">+ factoryMethod()</text>

        <rect x="450" y="180" width="200" height="80" rx="8" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
        <text x="550" y="210" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">ConcreteCreatorB</text>
        <text x="550" y="235" textAnchor="middle" fontSize="12" fill="white">+ factoryMethod()</text>

        <line x1="150" y1="260" x2="150" y2="300" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowGreen)"/>
        <line x1="550" y1="260" x2="550" y2="300" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowGreen)"/>

        <rect x="50" y="300" width="200" height="60" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
        <text x="150" y="335" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">ProductA</text>

        <rect x="450" y="300" width="200" height="60" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
        <text x="550" y="335" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">ProductB</text>

        <defs>
          <marker id="arrowGray" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#64748b"/>
          </marker>
          <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
          </marker>
        </defs>
      </svg>
    ),

    'Observer': (
      <svg width="700" height="400" viewBox="0 0 700 400" style={{ maxWidth: '100%', height: 'auto' }}>
        <rect x="250" y="40" width="200" height="100" rx="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="3"/>
        <text x="350" y="70" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">Subject</text>
        <text x="350" y="95" textAnchor="middle" fontSize="13" fill="white">+ attach(observer)</text>
        <text x="350" y="115" textAnchor="middle" fontSize="13" fill="white">+ notify()</text>

        <line x1="350" y1="140" x2="150" y2="240" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowBlue)"/>
        <line x1="350" y1="140" x2="350" y2="240" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowBlue)"/>
        <line x1="350" y1="140" x2="550" y2="240" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowBlue)"/>

        <text x="350" y="200" textAnchor="middle" fontSize="14" fontWeight="600" fill="#3b82f6">notifies</text>

        <rect x="50" y="240" width="200" height="80" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
        <text x="150" y="270" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Observer A</text>
        <text x="150" y="295" textAnchor="middle" fontSize="13" fill="white">+ update()</text>

        <rect x="250" y="240" width="200" height="80" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
        <text x="350" y="270" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Observer B</text>
        <text x="350" y="295" textAnchor="middle" fontSize="13" fill="white">+ update()</text>

        <rect x="450" y="240" width="200" height="80" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
        <text x="550" y="270" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Observer C</text>
        <text x="550" y="295" textAnchor="middle" fontSize="13" fill="white">+ update()</text>

        <defs>
          <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
          </marker>
        </defs>
      </svg>
    ),

    'Strategy': (
      <svg width="700" height="400" viewBox="0 0 700 400" style={{ maxWidth: '100%', height: 'auto' }}>
        <rect x="250" y="30" width="200" height="80" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="3"/>
        <text x="350" y="60" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">Context</text>
        <text x="350" y="85" textAnchor="middle" fontSize="13" fill="white">- strategy: Strategy</text>

        <line x1="350" y1="110" x2="350" y2="160" stroke="#64748b" strokeWidth="3" markerEnd="url(#arrowGray2)"/>
        <text x="380" y="140" fontSize="14" fontWeight="600" fill="#64748b">uses</text>

        <rect x="250" y="160" width="200" height="70" rx="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
        <text x="350" y="190" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Strategy</text>
        <text x="350" y="210" textAnchor="middle" fontSize="13" fill="white" fontStyle="italic">+ execute()</text>

        <line x1="150" y1="230" x2="150" y2="280" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen2)"/>
        <line x1="350" y1="230" x2="350" y2="280" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen2)"/>
        <line x1="550" y1="230" x2="550" y2="280" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen2)"/>

        <rect x="50" y="280" width="200" height="70" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
        <text x="150" y="310" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">StrategyA</text>
        <text x="150" y="330" textAnchor="middle" fontSize="13" fill="white">+ execute()</text>

        <rect x="250" y="280" width="200" height="70" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
        <text x="350" y="310" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">StrategyB</text>
        <text x="350" y="330" textAnchor="middle" fontSize="13" fill="white">+ execute()</text>

        <rect x="450" y="280" width="200" height="70" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
        <text x="550" y="310" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">StrategyC</text>
        <text x="550" y="330" textAnchor="middle" fontSize="13" fill="white">+ execute()</text>

        <defs>
          <marker id="arrowGray2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#64748b"/>
          </marker>
          <marker id="arrowGreen2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
          </marker>
        </defs>
      </svg>
    ),

    'Decorator': (
      <svg width="700" height="450" viewBox="0 0 700 450" style={{ maxWidth: '100%', height: 'auto' }}>
        <rect x="280" y="20" width="140" height="60" rx="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
        <text x="350" y="50" textAnchor="middle" fontSize="15" fontWeight="700" fill="white" fontStyle="italic">Component</text>

        <line x1="250" y1="80" x2="200" y2="130" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowG)"/>
        <line x1="450" y1="80" x2="500" y2="130" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowG)"/>

        <rect x="100" y="130" width="200" height="80" rx="8" fill="#3b82f6" stroke="#1e40af" strokeWidth="2"/>
        <text x="200" y="160" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">ConcreteComponent</text>
        <text x="200" y="185" textAnchor="middle" fontSize="13" fill="white">+ operation()</text>

        <rect x="400" y="130" width="200" height="100" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
        <text x="500" y="160" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Decorator</text>
        <text x="500" y="185" textAnchor="middle" fontSize="13" fill="white">- component: Component</text>
        <text x="500" y="205" textAnchor="middle" fontSize="13" fill="white">+ operation()</text>

        <line x1="450" y1="230" x2="400" y2="280" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowOrange)"/>
        <line x1="550" y1="230" x2="600" y2="280" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowOrange)"/>

        <rect x="300" y="280" width="200" height="90" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
        <text x="400" y="310" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">DecoratorA</text>
        <text x="400" y="335" textAnchor="middle" fontSize="13" fill="white">+ operation()</text>
        <text x="400" y="355" textAnchor="middle" fontSize="13" fill="white">+ addedBehavior()</text>

        <rect x="500" y="280" width="200" height="90" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
        <text x="600" y="310" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">DecoratorB</text>
        <text x="600" y="335" textAnchor="middle" fontSize="13" fill="white">+ operation()</text>
        <text x="600" y="355" textAnchor="middle" fontSize="13" fill="white">+ addedState</text>

        <path d="M 500 180 Q 450 180 450 140 Q 450 100 420 100" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowG)"/>
        <text x="470" y="140" fontSize="12" fontWeight="600" fill="#64748b">wraps</text>

        <defs>
          <marker id="arrowG" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#64748b"/>
          </marker>
          <marker id="arrowOrange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
          </marker>
        </defs>
      </svg>
    ),

    'Proxy': (
      <svg width="700" height="350" viewBox="0 0 700 350" style={{ maxWidth: '100%', height: 'auto' }}>
        <rect x="50" y="120" width="160" height="80" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="3"/>
        <text x="130" y="150" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">Client</text>
        <text x="130" y="175" textAnchor="middle" fontSize="13" fill="white">uses service</text>

        <line x1="210" y1="160" x2="270" y2="160" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowB)"/>
        <text x="240" y="150" textAnchor="middle" fontSize="13" fontWeight="600" fill="#3b82f6">calls</text>

        <rect x="270" y="120" width="160" height="80" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
        <text x="350" y="150" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">Proxy</text>
        <text x="350" y="175" textAnchor="middle" fontSize="13" fill="white">+ request()</text>

        <line x1="430" y1="160" x2="490" y2="160" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowB)"/>
        <text x="460" y="150" textAnchor="middle" fontSize="13" fontWeight="600" fill="#3b82f6">delegates</text>

        <rect x="490" y="120" width="160" height="80" rx="8" fill="#ef4444" stroke="#dc2626" strokeWidth="3"/>
        <text x="570" y="150" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">RealSubject</text>
        <text x="570" y="175" textAnchor="middle" fontSize="13" fill="white">+ request()</text>

        <rect x="270" y="230" width="160" height="80" rx="6" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5"/>
        <text x="350" y="255" textAnchor="middle" fontSize="14" fontWeight="600" fill="#d97706">Controls Access:</text>
        <text x="350" y="275" textAnchor="middle" fontSize="12" fill="#d97706">- Lazy loading</text>
        <text x="350" y="290" textAnchor="middle" fontSize="12" fill="#d97706">- Access control</text>

        <defs>
          <marker id="arrowB" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
          </marker>
        </defs>
      </svg>
    ),

    'Adapter': (
      <svg width="700" height="350" viewBox="0 0 700 350" style={{ maxWidth: '100%', height: 'auto' }}>
        <rect x="50" y="120" width="160" height="80" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="3"/>
        <text x="130" y="150" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">Client</text>
        <text x="130" y="175" textAnchor="middle" fontSize="13" fill="white">expects Target</text>

        <line x1="210" y1="160" x2="270" y2="160" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowBl)"/>

        <rect x="270" y="120" width="160" height="80" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
        <text x="350" y="150" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">Adapter</text>
        <text x="350" y="175" textAnchor="middle" fontSize="13" fill="white">+ request()</text>

        <line x1="430" y1="160" x2="490" y2="160" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowBl)"/>
        <text x="460" y="150" textAnchor="middle" fontSize="13" fontWeight="600" fill="#3b82f6">adapts</text>

        <rect x="490" y="120" width="160" height="80" rx="8" fill="#ef4444" stroke="#dc2626" strokeWidth="3"/>
        <text x="570" y="150" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">Adaptee</text>
        <text x="570" y="175" textAnchor="middle" fontSize="13" fill="white">+ specificRequest()</text>

        <text x="350" y="250" textAnchor="middle" fontSize="14" fontWeight="600" fill="#059669">Converts interface</text>
        <text x="350" y="270" textAnchor="middle" fontSize="12" fill="#64748b">request() → specificRequest()</text>

        <defs>
          <marker id="arrowBl" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
          </marker>
        </defs>
      </svg>
    ),

    'Facade': (
      <svg width="700" height="450" viewBox="0 0 700 450" style={{ maxWidth: '100%', height: 'auto' }}>
        <rect x="50" y="40" width="160" height="80" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="3"/>
        <text x="130" y="70" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">Client</text>

        <line x1="130" y1="120" x2="350" y2="180" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowBlu)"/>

        <rect x="250" y="180" width="200" height="100" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
        <text x="350" y="210" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">Facade</text>
        <text x="350" y="235" textAnchor="middle" fontSize="13" fill="white">+ simpleMethod1()</text>
        <text x="350" y="255" textAnchor="middle" fontSize="13" fill="white">+ simpleMethod2()</text>

        <line x1="350" y1="280" x2="200" y2="340" stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowGr)"/>
        <line x1="350" y1="280" x2="350" y2="340" stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowGr)"/>
        <line x1="350" y1="280" x2="500" y2="340" stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowGr)"/>

        <text x="350" y="315" textAnchor="middle" fontSize="14" fontWeight="600" fill="#64748b">hides complexity</text>

        <rect x="100" y="340" width="200" height="60" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
        <text x="200" y="375" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Subsystem A</text>

        <rect x="250" y="340" width="200" height="60" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
        <text x="350" y="375" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Subsystem B</text>

        <rect x="400" y="340" width="200" height="60" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
        <text x="500" y="375" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Subsystem C</text>

        <defs>
          <marker id="arrowBlu" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
          </marker>
          <marker id="arrowGr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#64748b"/>
          </marker>
        </defs>
      </svg>
    ),

    'Command': (
      <svg width="700" height="400" viewBox="0 0 700 400" style={{ maxWidth: '100%', height: 'auto' }}>
        <rect x="50" y="150" width="150" height="80" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
        <text x="125" y="180" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Invoker</text>
        <text x="125" y="205" textAnchor="middle" fontSize="13" fill="white">- command</text>

        <line x1="200" y1="190" x2="270" y2="190" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowBle)"/>
        <text x="235" y="180" textAnchor="middle" fontSize="13" fontWeight="600" fill="#3b82f6">executes</text>

        <rect x="270" y="150" width="150" height="80" rx="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
        <text x="345" y="180" textAnchor="middle" fontSize="16" fontWeight="700" fill="white" fontStyle="italic">Command</text>
        <text x="345" y="205" textAnchor="middle" fontSize="13" fill="white">+ execute()</text>

        <line x1="345" y1="230" x2="345" y2="280" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowGra)"/>

        <rect x="270" y="280" width="150" height="80" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
        <text x="345" y="310" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">ConcreteCommand</text>
        <text x="345" y="335" textAnchor="middle" fontSize="13" fill="white">+ execute()</text>

        <line x1="420" y1="320" x2="490" y2="320" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowBle)"/>
        <text x="455" y="310" textAnchor="middle" fontSize="13" fontWeight="600" fill="#3b82f6">calls</text>

        <rect x="490" y="280" width="150" height="80" rx="8" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
        <text x="565" y="310" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Receiver</text>
        <text x="565" y="335" textAnchor="middle" fontSize="13" fill="white">+ action()</text>

        <defs>
          <marker id="arrowBle" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
          </marker>
          <marker id="arrowGra" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#64748b"/>
          </marker>
        </defs>
      </svg>
    ),

    'State': (
      <svg width="700" height="400" viewBox="0 0 700 400" style={{ maxWidth: '100%', height: 'auto' }}>
        <rect x="250" y="30" width="200" height="80" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="3"/>
        <text x="350" y="60" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">Context</text>
        <text x="350" y="85" textAnchor="middle" fontSize="13" fill="white">- state: State</text>

        <line x1="350" y1="110" x2="350" y2="160" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowBlu2)"/>
        <text x="380" y="140" fontSize="13" fontWeight="600" fill="#3b82f6">delegates</text>

        <rect x="250" y="160" width="200" height="60" rx="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
        <text x="350" y="190" textAnchor="middle" fontSize="16" fontWeight="700" fill="white" fontStyle="italic">State</text>
        <text x="350" y="210" textAnchor="middle" fontSize="13" fill="white">+ handle()</text>

        <line x1="200" y1="220" x2="150" y2="280" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGre)"/>
        <line x1="350" y1="220" x2="350" y2="280" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGre)"/>
        <line x1="500" y1="220" x2="550" y2="280" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGre)"/>

        <rect x="50" y="280" width="200" height="70" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
        <text x="150" y="310" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">StateA</text>
        <text x="150" y="330" textAnchor="middle" fontSize="13" fill="white">+ handle()</text>

        <rect x="250" y="280" width="200" height="70" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
        <text x="350" y="310" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">StateB</text>
        <text x="350" y="330" textAnchor="middle" fontSize="13" fill="white">+ handle()</text>

        <rect x="450" y="280" width="200" height="70" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
        <text x="550" y="310" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">StateC</text>
        <text x="550" y="330" textAnchor="middle" fontSize="13" fill="white">+ handle()</text>

        <path d="M 250 315 Q 200 315 150 315" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowOra)"/>
        <path d="M 450 315 Q 500 315 550 315" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowOra)"/>

        <text x="350" y="375" textAnchor="middle" fontSize="14" fontWeight="600" fill="#f59e0b">State transitions</text>

        <defs>
          <marker id="arrowBlu2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
          </marker>
          <marker id="arrowGre" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
          </marker>
          <marker id="arrowOra" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
          </marker>
        </defs>
      </svg>
    )
  }

  return diagrams[patternName] || null
}

// Simple syntax highlighter for Java code
const SyntaxHighlighter = ({ code }) => {
  const highlightJava = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    // Store protected content with placeholders
    const protectedContent = []
    let placeholder = 0

    // Protect comments first
    highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    // Protect strings
    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    // Apply syntax highlighting to remaining code
    highlighted = highlighted
      // Keywords - purple
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null)\b/g, '<span style="color: #c586c0;">$1</span>')

      // Boolean and primitives - blue
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')

      // Types and classes - light green
      .replace(/\b(String|List|ArrayList|LinkedList|HashMap|TreeMap|HashSet|TreeSet|Map|Set|Queue|Deque|Collection|Arrays|Collections|Thread|Runnable|Executor|ExecutorService|CompletableFuture|Stream|Optional|Path|Files|Pattern|Matcher|StringBuilder|StringBuffer|Integer|Double|Float|Long|Short|Byte|Character|Boolean|Object|System|Math|Scanner|BufferedReader|FileReader|FileWriter|PrintWriter|InputStream|OutputStream|Exception|RuntimeException|IOException|SQLException|WeakReference|SoftReference|PhantomReference|ReferenceQueue)\b/g, '<span style="color: #4ec9b0;">$1</span>')

      // Annotations - yellow
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')

      // Numbers - light green
      .replace(/\b(\d+\.?\d*[fLdD]?)\b/g, '<span style="color: #b5cea8;">$1</span>')

      // Method calls - yellow
      .replace(/\b([a-z_]\w*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')

    // Restore protected content
    protectedContent.forEach(({ id, replacement }) => {
      highlighted = highlighted.replace(id, replacement)
    })

    return highlighted
  }

  return (
    <pre style={{
      margin: 0,
      fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
      fontSize: '0.85rem',
      lineHeight: '1.6',
      color: '#d4d4d4',
      whiteSpace: 'pre',
      overflowX: 'auto',
      textAlign: 'left',
      padding: 0
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightJava(code) }} />
    </pre>
  )
}

const ModernDiagram = ({ components, onComponentClick, title, width = 1400, height = 800, containerWidth = 1800, focusedIndex }) => {
  const [hoveredComponent, setHoveredComponent] = useState(null)

  return (
    <div style={{
      width: '100%',
      maxWidth: `${containerWidth}px`,
      margin: '0 auto',
      backgroundColor: '#f8fafc',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
      border: '2px solid #e2e8f0'
    }}>
      <h3 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '1.75rem',
        fontWeight: '800',
        color: '#1e293b',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        {title}
      </h3>

      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#059669" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="indigoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#db2777" stopOpacity="0.9"/>
          </linearGradient>

          {/* Arrow markers */}
          <marker id="arrowSolid" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#1e293b" />
          </marker>
          <marker id="arrowDashed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Pattern category backgrounds */}
        <g opacity="0.1">
          <rect x="50" y="180" width="420" height="200" rx="16" fill="#3b82f6" />
          <text x="260" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af" opacity="0.6">
            Creational
          </text>

          <rect x="550" y="80" width="420" height="180" rx="16" fill="#10b981" />
          <text x="760" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="#059669" opacity="0.6">
            Structural
          </text>

          <rect x="550" y="280" width="420" height="180" rx="16" fill="#8b5cf6" />
          <text x="760" y="310" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7c3aed" opacity="0.6">
            Behavioral
          </text>

          <rect x="50" y="400" width="420" height="180" rx="16" fill="#ef4444" />
          <text x="260" y="430" textAnchor="middle" fontSize="14" fontWeight="700" fill="#dc2626" opacity="0.6">
            Principles
          </text>

          <rect x="550" y="480" width="900" height="180" rx="16" fill="#f59e0b" />
          <text x="1000" y="510" textAnchor="middle" fontSize="14" fontWeight="700" fill="#d97706" opacity="0.6">
            Enterprise & Concurrency
          </text>
        </g>

        {/* Connecting lines with arrows and labels */}
        <g fill="none">
          <line x1="430" y1="280" x2="580" y2="180" stroke="#1e293b" strokeWidth="3" strokeOpacity="0.8" markerEnd="url(#arrowSolid)"/>
          <text x="505" y="220" fontSize="11" fontWeight="600" fill="#1e293b" textAnchor="middle">
            extends
          </text>

          <line x1="430" y1="300" x2="580" y2="380" stroke="#1e293b" strokeWidth="3" strokeOpacity="0.8" markerEnd="url(#arrowSolid)"/>
          <text x="505" y="350" fontSize="11" fontWeight="600" fill="#1e293b" textAnchor="middle">
            implements
          </text>

          <line x1="930" y1="180" x2="1080" y2="280" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="1005" y="220" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            applies
          </text>

          <line x1="930" y1="380" x2="1080" y2="480" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="1005" y="440" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            uses
          </text>

          <line x1="430" y1="490" x2="580" y2="580" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="505" y="545" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            guides
          </text>

          <line x1="930" y1="580" x2="760" y2="580" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="845" y="570" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            supports
          </text>
        </g>

        {/* Component rectangles */}
        {components.map((component, index) => {
          const isFocused = focusedIndex === index
          const isHovered = hoveredComponent === component.id
          const isHighlighted = isFocused || isHovered

          return (
          <g key={component.id}>
            {/* Focused ring indicator */}
            {isFocused && (
              <rect
                x={component.x - 6}
                y={component.y - 6}
                width={component.width + 12}
                height={component.height + 12}
                rx="16"
                ry="16"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="4"
                style={{
                  opacity: 0.9,
                  filter: 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.6))'
                }}
              />
            )}
            <rect
              x={component.x}
              y={component.y}
              width={component.width}
              height={component.height}
              rx="12"
              ry="12"
              fill={`url(#${component.color}Gradient)`}
              stroke={isHighlighted ? '#1e293b' : '#64748b'}
              strokeWidth={isHighlighted ? '4' : '2'}
              style={{
                cursor: 'pointer',
                filter: isHighlighted ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                transform: isHighlighted ? 'scale(1.05)' : 'scale(1)',
                transformOrigin: `${component.x + component.width/2}px ${component.y + component.height/2}px`,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={() => setHoveredComponent(component.id)}
              onMouseLeave={() => setHoveredComponent(null)}
              onClick={() => onComponentClick && onComponentClick(component)}
            />

            {/* Icon */}
            <text
              x={component.x + component.width/2}
              y={component.y + 35}
              textAnchor="middle"
              fontSize="48"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {component.icon}
            </text>

            {/* Title */}
            <text
              x={component.x + component.width/2}
              y={component.y + 75}
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="white"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {component.title}
            </text>

            {/* Details */}
            {component.details && component.details.slice(0, 3).map((detail, idx) => (
              <text
                key={idx}
                x={component.x + component.width/2}
                y={component.y + 100 + (idx * 15)}
                textAnchor="middle"
                fontSize="10"
                fontWeight="500"
                fill="rgba(255,255,255,0.9)"
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              >
                {detail.name.length > 18 ? detail.name.substring(0, 15) + '...' : detail.name}
              </text>
            ))}
            {component.details && component.details.length > 3 && (
              <text
                x={component.x + component.width/2}
                y={component.y + 145}
                textAnchor="middle"
                fontSize="10"
                fontWeight="500"
                fill="rgba(255,255,255,0.7)"
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              >
                +{component.details.length - 3} more patterns...
              </text>
            )}
          </g>
        )})}
      </svg>
    </div>
  )
}

function DesignPatterns({ onBack }) {
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [focusedComponentIndex, setFocusedComponentIndex] = useState(0)

  const components = [
    {
      id: 'creational', x: 80, y: 240, width: 350, height: 160,
      icon: '🏗️', title: 'Creational Patterns', color: 'blue',
      details: [
        {
          name: 'Singleton',
          explanation: 'Ensures class has only one instance with global access point. Lazy initialization, thread-safe implementations (double-check locking, enum). Used for configuration managers, logging, caching. Caution: can hinder testability and create hidden dependencies.',
          codeExample: `// Eager initialization - thread-safe by default
public class DatabaseConnection {
  private static final DatabaseConnection instance = new DatabaseConnection();

  private DatabaseConnection() {
    // Private constructor prevents instantiation
  }

  public static DatabaseConnection getInstance() {
    return instance;
  }
}

// Lazy initialization with double-check locking
public class LazyDbConnection {
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
}

// Best approach: Enum Singleton (Joshua Bloch)
public enum ConfigManager {
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
DatabaseConnection db1 = DatabaseConnection.getInstance();
DatabaseConnection db2 = DatabaseConnection.getInstance();
System.out.println(db1 == db2);  // true - same instance

ConfigManager.INSTANCE.setConfig("production");
System.out.println(ConfigManager.INSTANCE.getConfig());

// Output:
// true
// production`
        },
        {
          name: 'Factory Method',
          explanation: 'Defines interface for creating objects, letting subclasses decide which class to instantiate. Defers instantiation to subclasses. Promotes loose coupling. Common in frameworks - DocumentFactory, ConnectionFactory. Alternative to direct constructor calls.',
          codeExample: `// Product interface
interface Transport {
  void deliver();
}

// Concrete products
class Truck implements Transport {
  public void deliver() {
    System.out.println("Delivering by truck on road");
  }
}

class Ship implements Transport {
  public void deliver() {
    System.out.println("Delivering by ship on sea");
  }
}

// Creator - defines factory method
abstract class Logistics {
  // Factory method
  abstract Transport createTransport();

  public void planDelivery() {
    Transport transport = createTransport();
    transport.deliver();
  }
}

// Concrete creators
class RoadLogistics extends Logistics {
  @Override
  Transport createTransport() {
    return new Truck();
  }
}

class SeaLogistics extends Logistics {
  @Override
  Transport createTransport() {
    return new Ship();
  }
}

// Usage
Logistics logistics1 = new RoadLogistics();
logistics1.planDelivery();  // Truck delivery

Logistics logistics2 = new SeaLogistics();
logistics2.planDelivery();  // Ship delivery

// Output:
// Delivering by truck on road
// Delivering by ship on sea`
        },
        {
          name: 'Abstract Factory',
          explanation: 'Provides interface for creating families of related objects without specifying concrete classes. Creates product families (WindowsUI vs MacUI). Ensures products work together. More abstract than Factory Method. Used in cross-platform frameworks.',
          codeExample: `// Abstract products
interface Button {
  void paint();
}

interface Checkbox {
  void paint();
}

// Windows family
class WindowsButton implements Button {
  public void paint() {
    System.out.println("Rendering Windows button");
  }
}

class WindowsCheckbox implements Checkbox {
  public void paint() {
    System.out.println("Rendering Windows checkbox");
  }
}

// Mac family
class MacButton implements Button {
  public void paint() {
    System.out.println("Rendering Mac button");
  }
}

class MacCheckbox implements Checkbox {
  public void paint() {
    System.out.println("Rendering Mac checkbox");
  }
}

// Abstract factory
interface GUIFactory {
  Button createButton();
  Checkbox createCheckbox();
}

// Concrete factories
class WindowsFactory implements GUIFactory {
  public Button createButton() {
    return new WindowsButton();
  }

  public Checkbox createCheckbox() {
    return new WindowsCheckbox();
  }
}

class MacFactory implements GUIFactory {
  public Button createButton() {
    return new MacButton();
  }

  public Checkbox createCheckbox() {
    return new MacCheckbox();
  }
}

// Application
class Application {
  private Button button;
  private Checkbox checkbox;

  public Application(GUIFactory factory) {
    button = factory.createButton();
    checkbox = factory.createCheckbox();
  }

  public void render() {
    button.paint();
    checkbox.paint();
  }
}

// Usage
String os = "Windows";
GUIFactory factory = os.equals("Windows") ?
  new WindowsFactory() : new MacFactory();

Application app = new Application(factory);
app.render();

// Output:
// Rendering Windows button
// Rendering Windows checkbox`
        },
        {
          name: 'Builder',
          explanation: 'Separates object construction from representation. Builds complex objects step by step. Fluent interface with method chaining. Immutable object creation. StringBuilder, Lombok @Builder. Perfect for objects with many optional parameters.',
          codeExample: `// Product class
class Pizza {
  private final String dough;     // Required
  private final String sauce;     // Required
  private final boolean cheese;   // Optional
  private final boolean pepperoni;// Optional
  private final boolean mushrooms;// Optional

  private Pizza(PizzaBuilder builder) {
    this.dough = builder.dough;
    this.sauce = builder.sauce;
    this.cheese = builder.cheese;
    this.pepperoni = builder.pepperoni;
    this.mushrooms = builder.mushrooms;
  }

  @Override
  public String toString() {
    return "Pizza: " + dough + " dough, " + sauce + " sauce, " +
           "cheese=" + cheese + ", pepperoni=" + pepperoni +
           ", mushrooms=" + mushrooms;
  }

  // Builder class
  public static class PizzaBuilder {
    private String dough;
    private String sauce;
    private boolean cheese = false;
    private boolean pepperoni = false;
    private boolean mushrooms = false;

    public PizzaBuilder(String dough, String sauce) {
      this.dough = dough;
      this.sauce = sauce;
    }

    public PizzaBuilder cheese(boolean value) {
      cheese = value;
      return this;
    }

    public PizzaBuilder pepperoni(boolean value) {
      pepperoni = value;
      return this;
    }

    public PizzaBuilder mushrooms(boolean value) {
      mushrooms = value;
      return this;
    }

    public Pizza build() {
      return new Pizza(this);
    }
  }
}

// Usage
Pizza pizza1 = new Pizza.PizzaBuilder("thin", "tomato")
  .cheese(true)
  .pepperoni(true)
  .build();

Pizza pizza2 = new Pizza.PizzaBuilder("thick", "BBQ")
  .cheese(true)
  .mushrooms(true)
  .build();

System.out.println(pizza1);
System.out.println(pizza2);

// Output:
// Pizza: thin dough, tomato sauce, cheese=true, pepperoni=true, mushrooms=false
// Pizza: thick dough, BBQ sauce, cheese=true, pepperoni=false, mushrooms=true`
        },
        {
          name: 'Prototype',
          explanation: 'Creates new objects by cloning existing ones. Implements Cloneable interface. Shallow vs deep copy considerations. Useful when object creation is expensive. Alternative to complex constructors. Common in game development for entity spawning.',
          codeExample: `// Prototype interface
abstract class Shape implements Cloneable {
  private String id;
  protected String type;

  abstract void draw();

  public String getType() {
    return type;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  @Override
  public Object clone() {
    Object clone = null;
    try {
      clone = super.clone();
    } catch (CloneNotSupportedException e) {
      e.printStackTrace();
    }
    return clone;
  }
}

// Concrete prototypes
class Circle extends Shape {
  public Circle() {
    type = "Circle";
  }

  @Override
  void draw() {
    System.out.println("Drawing a Circle");
  }
}

class Rectangle extends Shape {
  public Rectangle() {
    type = "Rectangle";
  }

  @Override
  void draw() {
    System.out.println("Drawing a Rectangle");
  }
}

// Registry to cache prototypes
class ShapeCache {
  private static Map<String, Shape> shapeMap = new HashMap<>();

  public static Shape getShape(String shapeId) {
    Shape cachedShape = shapeMap.get(shapeId);
    return (Shape) cachedShape.clone();
  }

  public static void loadCache() {
    Circle circle = new Circle();
    circle.setId("1");
    shapeMap.put(circle.getId(), circle);

    Rectangle rectangle = new Rectangle();
    rectangle.setId("2");
    shapeMap.put(rectangle.getId(), rectangle);
  }
}

// Usage
ShapeCache.loadCache();

Shape clonedCircle1 = ShapeCache.getShape("1");
System.out.println("Type: " + clonedCircle1.getType());
clonedCircle1.draw();

Shape clonedCircle2 = ShapeCache.getShape("1");
System.out.println("Same object? " + (clonedCircle1 == clonedCircle2));

// Output:
// Type: Circle
// Drawing a Circle
// Same object? false`
        }
      ],
      description: 'Patterns for object creation mechanisms, providing flexibility in what gets created, who creates it, how, and when.'
    },
    {
      id: 'structural', x: 580, y: 140, width: 350, height: 160,
      icon: '🔗', title: 'Structural Patterns', color: 'green',
      details: [
        {
          name: 'Adapter',
          explanation: 'Converts interface of class into another interface clients expect. Wraps incompatible interface. Makes classes work together that couldn\'t otherwise. Wrapper pattern. Common in legacy code integration. Example: Collections.unmodifiableList().',
          codeExample: `// Target interface (what client expects)
interface MediaPlayer {
  void play(String audioType, String fileName);
}

// Adaptee (incompatible interface)
interface AdvancedMediaPlayer {
  void playVlc(String fileName);
  void playMp4(String fileName);
}

class VlcPlayer implements AdvancedMediaPlayer {
  public void playVlc(String fileName) {
    System.out.println("Playing vlc file: " + fileName);
  }

  public void playMp4(String fileName) {
    // Do nothing
  }
}

class Mp4Player implements AdvancedMediaPlayer {
  public void playVlc(String fileName) {
    // Do nothing
  }

  public void playMp4(String fileName) {
    System.out.println("Playing mp4 file: " + fileName);
  }
}

// Adapter - bridges the incompatibility
class MediaAdapter implements MediaPlayer {
  AdvancedMediaPlayer advancedPlayer;

  public MediaAdapter(String audioType) {
    if (audioType.equals("vlc")) {
      advancedPlayer = new VlcPlayer();
    } else if (audioType.equals("mp4")) {
      advancedPlayer = new Mp4Player();
    }
  }

  public void play(String audioType, String fileName) {
    if (audioType.equals("vlc")) {
      advancedPlayer.playVlc(fileName);
    } else if (audioType.equals("mp4")) {
      advancedPlayer.playMp4(fileName);
    }
  }
}

// Client
class AudioPlayer implements MediaPlayer {
  MediaAdapter mediaAdapter;

  public void play(String audioType, String fileName) {
    if (audioType.equals("mp3")) {
      System.out.println("Playing mp3 file: " + fileName);
    } else if (audioType.equals("vlc") || audioType.equals("mp4")) {
      mediaAdapter = new MediaAdapter(audioType);
      mediaAdapter.play(audioType, fileName);
    } else {
      System.out.println("Invalid format: " + audioType);
    }
  }
}

// Usage
AudioPlayer player = new AudioPlayer();
player.play("mp3", "song.mp3");
player.play("mp4", "video.mp4");
player.play("vlc", "movie.vlc");

// Output:
// Playing mp3 file: song.mp3
// Playing mp4 file: video.mp4
// Playing vlc file: movie.vlc`
        },
        {
          name: 'Decorator',
          explanation: 'Attaches additional responsibilities to object dynamically. Flexible alternative to subclassing. Wraps objects to add behavior. Java I/O streams use this heavily (BufferedReader wraps FileReader). Maintains single responsibility while extending functionality.',
          codeExample: `// Component interface
interface Coffee {
  String getDescription();
  double getCost();
}

// Concrete component
class SimpleCoffee implements Coffee {
  public String getDescription() {
    return "Simple Coffee";
  }

  public double getCost() {
    return 2.0;
  }
}

// Decorator base class
abstract class CoffeeDecorator implements Coffee {
  protected Coffee decoratedCoffee;

  public CoffeeDecorator(Coffee coffee) {
    this.decoratedCoffee = coffee;
  }

  public String getDescription() {
    return decoratedCoffee.getDescription();
  }

  public double getCost() {
    return decoratedCoffee.getCost();
  }
}

// Concrete decorators
class MilkDecorator extends CoffeeDecorator {
  public MilkDecorator(Coffee coffee) {
    super(coffee);
  }

  public String getDescription() {
    return decoratedCoffee.getDescription() + ", Milk";
  }

  public double getCost() {
    return decoratedCoffee.getCost() + 0.5;
  }
}

class SugarDecorator extends CoffeeDecorator {
  public SugarDecorator(Coffee coffee) {
    super(coffee);
  }

  public String getDescription() {
    return decoratedCoffee.getDescription() + ", Sugar";
  }

  public double getCost() {
    return decoratedCoffee.getCost() + 0.3;
  }
}

class WhipDecorator extends CoffeeDecorator {
  public WhipDecorator(Coffee coffee) {
    super(coffee);
  }

  public String getDescription() {
    return decoratedCoffee.getDescription() + ", Whip";
  }

  public double getCost() {
    return decoratedCoffee.getCost() + 0.7;
  }
}

// Usage
Coffee coffee = new SimpleCoffee();
System.out.println(coffee.getDescription() + " $" + coffee.getCost());

coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
coffee = new WhipDecorator(coffee);
System.out.println(coffee.getDescription() + " $" + coffee.getCost());

// Output:
// Simple Coffee $2.0
// Simple Coffee, Milk, Sugar, Whip $3.5`
        },
        {
          name: 'Proxy',
          explanation: 'Provides placeholder/surrogate for another object to control access. Virtual proxy (lazy loading), protection proxy (access control), remote proxy (RMI). Spring AOP, Hibernate lazy loading. Adds indirection for control.',
          codeExample: `// Subject interface
interface Image {
  void display();
}

// Real subject - expensive to create
class RealImage implements Image {
  private String fileName;

  public RealImage(String fileName) {
    this.fileName = fileName;
    loadFromDisk();
  }

  private void loadFromDisk() {
    System.out.println("Loading image: " + fileName);
  }

  public void display() {
    System.out.println("Displaying image: " + fileName);
  }
}

// Proxy - controls access and delays creation
class ProxyImage implements Image {
  private RealImage realImage;
  private String fileName;

  public ProxyImage(String fileName) {
    this.fileName = fileName;
  }

  public void display() {
    // Lazy initialization
    if (realImage == null) {
      realImage = new RealImage(fileName);
    }
    realImage.display();
  }
}

// Protection Proxy example
interface BankAccount {
  void withdraw(double amount);
  double getBalance();
}

class RealBankAccount implements BankAccount {
  private double balance = 1000.0;

  public void withdraw(double amount) {
    balance -= amount;
    System.out.println("Withdrawn: $" + amount);
  }

  public double getBalance() {
    return balance;
  }
}

class ProtectedBankAccount implements BankAccount {
  private RealBankAccount realAccount;
  private String userRole;

  public ProtectedBankAccount(String userRole) {
    this.realAccount = new RealBankAccount();
    this.userRole = userRole;
  }

  public void withdraw(double amount) {
    if (userRole.equals("ADMIN") || userRole.equals("OWNER")) {
      realAccount.withdraw(amount);
    } else {
      System.out.println("Access denied: insufficient permissions");
    }
  }

  public double getBalance() {
    return realAccount.getBalance();
  }
}

// Usage
// Virtual Proxy
Image image = new ProxyImage("photo.jpg");
image.display();  // Loads and displays
image.display();  // Just displays (already loaded)

// Protection Proxy
BankAccount account1 = new ProtectedBankAccount("OWNER");
account1.withdraw(100);

BankAccount account2 = new ProtectedBankAccount("GUEST");
account2.withdraw(100);

// Output:
// Loading image: photo.jpg
// Displaying image: photo.jpg
// Displaying image: photo.jpg
// Withdrawn: $100
// Access denied: insufficient permissions`
        },
        {
          name: 'Facade',
          explanation: 'Provides simplified interface to complex subsystem. Hides complexity behind simple API. Reduces dependencies on subsystem internals. Makes library easier to use. Common in API design - slf4j facade for logging frameworks.',
          codeExample: `// Complex subsystem classes
class CPU {
  public void freeze() {
    System.out.println("CPU: Freezing...");
  }

  public void jump(long position) {
    System.out.println("CPU: Jumping to " + position);
  }

  public void execute() {
    System.out.println("CPU: Executing...");
  }
}

class Memory {
  public void load(long position, byte[] data) {
    System.out.println("Memory: Loading data at " + position);
  }
}

class HardDrive {
  public byte[] read(long lba, int size) {
    System.out.println("HardDrive: Reading " + size + " bytes from " + lba);
    return new byte[size];
  }
}

// Facade - simplified interface
class ComputerFacade {
  private CPU cpu;
  private Memory memory;
  private HardDrive hardDrive;

  public ComputerFacade() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
  }

  public void start() {
    System.out.println("Starting computer...");
    cpu.freeze();
    memory.load(0, hardDrive.read(0, 1024));
    cpu.jump(0);
    cpu.execute();
    System.out.println("Computer started!");
  }
}

// Another example: Home Theater
class Amplifier {
  public void on() { System.out.println("Amplifier on"); }
  public void setVolume(int level) {
    System.out.println("Volume set to " + level);
  }
}

class DVDPlayer {
  public void on() { System.out.println("DVD Player on"); }
  public void play(String movie) {
    System.out.println("Playing: " + movie);
  }
}

class Projector {
  public void on() { System.out.println("Projector on"); }
  public void wideScreenMode() {
    System.out.println("Widescreen mode enabled");
  }
}

class HomeTheaterFacade {
  private Amplifier amp;
  private DVDPlayer dvd;
  private Projector projector;

  public HomeTheaterFacade(Amplifier amp, DVDPlayer dvd, Projector projector) {
    this.amp = amp;
    this.dvd = dvd;
    this.projector = projector;
  }

  public void watchMovie(String movie) {
    System.out.println("Get ready to watch a movie...");
    projector.on();
    projector.wideScreenMode();
    amp.on();
    amp.setVolume(5);
    dvd.on();
    dvd.play(movie);
  }
}

// Usage
ComputerFacade computer = new ComputerFacade();
computer.start();

System.out.println();

HomeTheaterFacade homeTheater = new HomeTheaterFacade(
  new Amplifier(), new DVDPlayer(), new Projector()
);
homeTheater.watchMovie("Inception");

// Output:
// Starting computer...
// CPU: Freezing...
// HardDrive: Reading 1024 bytes from 0
// Memory: Loading data at 0
// CPU: Jumping to 0
// CPU: Executing...
// Computer started!
//
// Get ready to watch a movie...
// Projector on
// Widescreen mode enabled
// Amplifier on
// Volume set to 5
// DVD Player on
// Playing: Inception`
        },
        {
          name: 'Composite',
          explanation: 'Composes objects into tree structures for part-whole hierarchies. Treats individual objects and compositions uniformly. Recursive composition. GUI component trees, file systems. Enables treating complex structures like simple objects.',
          codeExample: `// Component interface
interface Employee {
  void showDetails();
  double getSalary();
}

// Leaf - individual object
class Developer implements Employee {
  private String name;
  private double salary;

  public Developer(String name, double salary) {
    this.name = name;
    this.salary = salary;
  }

  public void showDetails() {
    System.out.println("Developer: " + name + ", Salary: $" + salary);
  }

  public double getSalary() {
    return salary;
  }
}

class Designer implements Employee {
  private String name;
  private double salary;

  public Designer(String name, double salary) {
    this.name = name;
    this.salary = salary;
  }

  public void showDetails() {
    System.out.println("Designer: " + name + ", Salary: $" + salary);
  }

  public double getSalary() {
    return salary;
  }
}

// Composite - can contain other components
class Manager implements Employee {
  private String name;
  private double salary;
  private List<Employee> subordinates = new ArrayList<>();

  public Manager(String name, double salary) {
    this.name = name;
    this.salary = salary;
  }

  public void add(Employee employee) {
    subordinates.add(employee);
  }

  public void remove(Employee employee) {
    subordinates.remove(employee);
  }

  public void showDetails() {
    System.out.println("Manager: " + name + ", Salary: $" + salary);
    for (Employee emp : subordinates) {
      emp.showDetails();
    }
  }

  public double getSalary() {
    double totalSalary = salary;
    for (Employee emp : subordinates) {
      totalSalary += emp.getSalary();
    }
    return totalSalary;
  }
}

// Usage
Employee dev1 = new Developer("John", 70000);
Employee dev2 = new Developer("Jane", 75000);
Employee designer = new Designer("Mike", 65000);

Manager manager1 = new Manager("Alice", 90000);
manager1.add(dev1);
manager1.add(dev2);

Manager manager2 = new Manager("Bob", 95000);
manager2.add(designer);

Manager ceo = new Manager("CEO", 150000);
ceo.add(manager1);
ceo.add(manager2);

ceo.showDetails();
System.out.println("Total budget: $" + ceo.getSalary());

// Output:
// Manager: CEO, Salary: $150000.0
// Manager: Alice, Salary: $90000.0
// Developer: John, Salary: $70000.0
// Developer: Jane, Salary: $75000.0
// Manager: Bob, Salary: $95000.0
// Designer: Mike, Salary: $65000.0
// Total budget: $545000.0`
        },
        {
          name: 'Bridge',
          explanation: 'Decouples abstraction from implementation so both can vary independently. Separates what (abstraction) from how (implementation). Avoids permanent binding. JDBC drivers use bridge pattern - same API, different database implementations.',
          codeExample: `// Implementation interface
interface DrawAPI {
  void drawCircle(int radius, int x, int y);
}

// Concrete implementations
class RedCircle implements DrawAPI {
  public void drawCircle(int radius, int x, int y) {
    System.out.println("Drawing RED circle: radius=" + radius +
                       ", x=" + x + ", y=" + y);
  }
}

class GreenCircle implements DrawAPI {
  public void drawCircle(int radius, int x, int y) {
    System.out.println("Drawing GREEN circle: radius=" + radius +
                       ", x=" + x + ", y=" + y);
  }
}

// Abstraction
abstract class Shape {
  protected DrawAPI drawAPI;

  protected Shape(DrawAPI drawAPI) {
    this.drawAPI = drawAPI;
  }

  public abstract void draw();
}

// Refined abstraction
class Circle extends Shape {
  private int x, y, radius;

  public Circle(int x, int y, int radius, DrawAPI drawAPI) {
    super(drawAPI);
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  public void draw() {
    drawAPI.drawCircle(radius, x, y);
  }
}

// Another example: Device and Remote Control
interface Device {
  void turnOn();
  void turnOff();
  void setVolume(int volume);
}

class TV implements Device {
  private int volume = 10;

  public void turnOn() { System.out.println("TV is ON"); }
  public void turnOff() { System.out.println("TV is OFF"); }
  public void setVolume(int volume) {
    this.volume = volume;
    System.out.println("TV volume: " + volume);
  }
}

class Radio implements Device {
  private int volume = 5;

  public void turnOn() { System.out.println("Radio is ON"); }
  public void turnOff() { System.out.println("Radio is OFF"); }
  public void setVolume(int volume) {
    this.volume = volume;
    System.out.println("Radio volume: " + volume);
  }
}

abstract class RemoteControl {
  protected Device device;

  public RemoteControl(Device device) {
    this.device = device;
  }

  abstract void power();
  abstract void volumeUp();
}

class BasicRemote extends RemoteControl {
  public BasicRemote(Device device) {
    super(device);
  }

  public void power() {
    device.turnOn();
  }

  public void volumeUp() {
    device.setVolume(15);
  }
}

// Usage
Shape redCircle = new Circle(100, 100, 10, new RedCircle());
Shape greenCircle = new Circle(200, 200, 20, new GreenCircle());
redCircle.draw();
greenCircle.draw();

RemoteControl remote = new BasicRemote(new TV());
remote.power();
remote.volumeUp();

// Output:
// Drawing RED circle: radius=10, x=100, y=100
// Drawing GREEN circle: radius=20, x=200, y=200
// TV is ON
// TV volume: 15`
        }
      ],
      description: 'Patterns for assembling objects and classes into larger structures while keeping structures flexible and efficient.'
    },
    {
      id: 'behavioral', x: 580, y: 340, width: 350, height: 160,
      icon: '🎭', title: 'Behavioral Patterns', color: 'purple',
      details: [
        {
          name: 'Strategy',
          explanation: 'Defines family of algorithms, encapsulates each, makes them interchangeable. Algorithm varies independently from clients. Composition over inheritance. Comparator interface is classic example. Used in sorting, validation, compression algorithms.',
          codeExample: `// Strategy interface
interface PaymentStrategy {
  void pay(int amount);
}

// Concrete strategies
class CreditCardPayment implements PaymentStrategy {
  private String cardNumber;

  public CreditCardPayment(String cardNumber) {
    this.cardNumber = cardNumber;
  }

  public void pay(int amount) {
    System.out.println("Paid $" + amount + " using Credit Card: " + cardNumber);
  }
}

class PayPalPayment implements PaymentStrategy {
  private String email;

  public PayPalPayment(String email) {
    this.email = email;
  }

  public void pay(int amount) {
    System.out.println("Paid $" + amount + " using PayPal: " + email);
  }
}

class BitcoinPayment implements PaymentStrategy {
  private String walletAddress;

  public BitcoinPayment(String walletAddress) {
    this.walletAddress = walletAddress;
  }

  public void pay(int amount) {
    System.out.println("Paid $" + amount + " using Bitcoin: " + walletAddress);
  }
}

// Context
class ShoppingCart {
  private PaymentStrategy paymentStrategy;

  public void setPaymentStrategy(PaymentStrategy strategy) {
    this.paymentStrategy = strategy;
  }

  public void checkout(int amount) {
    paymentStrategy.pay(amount);
  }
}

// Usage
ShoppingCart cart = new ShoppingCart();

cart.setPaymentStrategy(new CreditCardPayment("1234-5678-9012-3456"));
cart.checkout(100);

cart.setPaymentStrategy(new PayPalPayment("user@example.com"));
cart.checkout(200);

cart.setPaymentStrategy(new BitcoinPayment("1A2B3C4D5E6F"));
cart.checkout(300);

// Output:
// Paid $100 using Credit Card: 1234-5678-9012-3456
// Paid $200 using PayPal: user@example.com
// Paid $300 using Bitcoin: 1A2B3C4D5E6F`
        },
        {
          name: 'Observer',
          explanation: 'Defines one-to-many dependency - when one object changes state, dependents notified automatically. Event handling mechanism. Publisher-subscriber model. Java Event Listeners, PropertyChangeListener. Loose coupling between subjects and observers.',
          codeExample: `import java.util.*;

// Observer interface
interface Observer {
  void update(String message);
}

// Subject (Observable)
class NewsAgency {
  private List<Observer> observers = new ArrayList<>();
  private String news;

  public void addObserver(Observer observer) {
    observers.add(observer);
  }

  public void removeObserver(Observer observer) {
    observers.remove(observer);
  }

  public void setNews(String news) {
    this.news = news;
    notifyObservers();
  }

  private void notifyObservers() {
    for (Observer observer : observers) {
      observer.update(news);
    }
  }
}

// Concrete observers
class NewsChannel implements Observer {
  private String name;

  public NewsChannel(String name) {
    this.name = name;
  }

  public void update(String news) {
    System.out.println(name + " received news: " + news);
  }
}

class EmailSubscriber implements Observer {
  private String email;

  public EmailSubscriber(String email) {
    this.email = email;
  }

  public void update(String news) {
    System.out.println("Email sent to " + email + ": " + news);
  }
}

// Usage
NewsAgency agency = new NewsAgency();

Observer channel1 = new NewsChannel("CNN");
Observer channel2 = new NewsChannel("BBC");
Observer subscriber = new EmailSubscriber("user@example.com");

agency.addObserver(channel1);
agency.addObserver(channel2);
agency.addObserver(subscriber);

agency.setNews("Breaking: New Java version released!");
System.out.println();
agency.setNews("Weather: Sunny day ahead!");

// Output:
// CNN received news: Breaking: New Java version released!
// BBC received news: Breaking: New Java version released!
// Email sent to user@example.com: Breaking: New Java version released!
//
// CNN received news: Weather: Sunny day ahead!
// BBC received news: Weather: Sunny day ahead!
// Email sent to user@example.com: Weather: Sunny day ahead!`
        },
        {
          name: 'Command',
          explanation: 'Encapsulates request as object, parameterizing clients with different requests. Queues requests, logs them, supports undo. Runnable interface, menu actions, transaction systems. Decouples invoker from receiver.',
          codeExample: `// Command interface
interface Command {
  void execute();
  void undo();
}

// Receiver
class Light {
  public void turnOn() {
    System.out.println("Light is ON");
  }

  public void turnOff() {
    System.out.println("Light is OFF");
  }
}

// Concrete commands
class LightOnCommand implements Command {
  private Light light;

  public LightOnCommand(Light light) {
    this.light = light;
  }

  public void execute() {
    light.turnOn();
  }

  public void undo() {
    light.turnOff();
  }
}

class LightOffCommand implements Command {
  private Light light;

  public LightOffCommand(Light light) {
    this.light = light;
  }

  public void execute() {
    light.turnOff();
  }

  public void undo() {
    light.turnOn();
  }
}

// Invoker
class RemoteControl {
  private Command command;
  private Command lastCommand;

  public void setCommand(Command command) {
    this.command = command;
  }

  public void pressButton() {
    command.execute();
    lastCommand = command;
  }

  public void pressUndo() {
    if (lastCommand != null) {
      lastCommand.undo();
    }
  }
}

// Usage
Light livingRoomLight = new Light();

Command lightOn = new LightOnCommand(livingRoomLight);
Command lightOff = new LightOffCommand(livingRoomLight);

RemoteControl remote = new RemoteControl();

remote.setCommand(lightOn);
remote.pressButton();  // Light ON

remote.setCommand(lightOff);
remote.pressButton();  // Light OFF

remote.pressUndo();    // Undo: Light ON

// Output:
// Light is ON
// Light is OFF
// Light is ON`
        },
        {
          name: 'Template Method',
          explanation: 'Defines skeleton of algorithm, letting subclasses override specific steps. Abstract class with template method. Hook methods for customization. HttpServlet.service() method. Code reuse while allowing variations.',
          codeExample: `// Abstract class with template method
abstract class DataProcessor {
  // Template method - defines skeleton
  public final void process() {
    readData();
    processData();
    writeData();
    hook();  // Optional hook
  }

  // Steps to be implemented by subclasses
  abstract void readData();
  abstract void processData();
  abstract void writeData();

  // Hook method - optional override
  void hook() {
    // Default implementation (can be overridden)
  }
}

// Concrete implementations
class CSVProcessor extends DataProcessor {
  void readData() {
    System.out.println("Reading data from CSV file");
  }

  void processData() {
    System.out.println("Processing CSV data");
  }

  void writeData() {
    System.out.println("Writing processed data to CSV");
  }

  @Override
  void hook() {
    System.out.println("CSV post-processing hook");
  }
}

class XMLProcessor extends DataProcessor {
  void readData() {
    System.out.println("Reading data from XML file");
  }

  void processData() {
    System.out.println("Processing XML data");
  }

  void writeData() {
    System.out.println("Writing processed data to XML");
  }
}

// Another example: Beverage
abstract class Beverage {
  // Template method
  public final void prepareRecipe() {
    boilWater();
    brew();
    pourInCup();
    addCondiments();
  }

  abstract void brew();
  abstract void addCondiments();

  void boilWater() {
    System.out.println("Boiling water");
  }

  void pourInCup() {
    System.out.println("Pouring into cup");
  }
}

class Tea extends Beverage {
  void brew() {
    System.out.println("Steeping the tea");
  }

  void addCondiments() {
    System.out.println("Adding lemon");
  }
}

class Coffee extends Beverage {
  void brew() {
    System.out.println("Dripping coffee through filter");
  }

  void addCondiments() {
    System.out.println("Adding sugar and milk");
  }
}

// Usage
DataProcessor csvProcessor = new CSVProcessor();
csvProcessor.process();
System.out.println();

DataProcessor xmlProcessor = new XMLProcessor();
xmlProcessor.process();
System.out.println();

Beverage tea = new Tea();
tea.prepareRecipe();

// Output:
// Reading data from CSV file
// Processing CSV data
// Writing processed data to CSV
// CSV post-processing hook
//
// Reading data from XML file
// Processing XML data
// Writing processed data to XML
//
// Boiling water
// Steeping the tea
// Pouring into cup
// Adding lemon`
        },
        {
          name: 'Iterator',
          explanation: 'Provides way to access elements of aggregate sequentially without exposing underlying representation. Java Iterator interface. for-each loop uses iterators. Decouples collection traversal from collection itself. Cursor pattern.',
          codeExample: `import java.util.*;

// Custom collection
class BookCollection {
  private List<String> books = new ArrayList<>();

  public void addBook(String book) {
    books.add(book);
  }

  // Return iterator
  public Iterator<String> createIterator() {
    return books.iterator();
  }

  // Custom iterator implementation
  public Iterator<String> createReverseIterator() {
    return new ReverseIterator();
  }

  // Inner class - custom iterator
  private class ReverseIterator implements Iterator<String> {
    private int currentIndex = books.size() - 1;

    public boolean hasNext() {
      return currentIndex >= 0;
    }

    public String next() {
      if (!hasNext()) {
        throw new NoSuchElementException();
      }
      return books.get(currentIndex--);
    }
  }
}

// Another example: Custom iterable collection
class MenuItems implements Iterable<String> {
  private String[] items;
  private int count = 0;

  public MenuItems(int size) {
    items = new String[size];
  }

  public void addItem(String item) {
    if (count < items.length) {
      items[count++] = item;
    }
  }

  public Iterator<String> iterator() {
    return new MenuIterator();
  }

  private class MenuIterator implements Iterator<String> {
    private int position = 0;

    public boolean hasNext() {
      return position < count;
    }

    public String next() {
      if (!hasNext()) {
        throw new NoSuchElementException();
      }
      return items[position++];
    }

    public void remove() {
      throw new UnsupportedOperationException();
    }
  }
}

// Usage
BookCollection library = new BookCollection();
library.addBook("Design Patterns");
library.addBook("Clean Code");
library.addBook("Effective Java");

// Forward iteration
Iterator<String> iterator = library.createIterator();
System.out.println("Forward:");
while (iterator.hasNext()) {
  System.out.println("- " + iterator.next());
}

// Reverse iteration
Iterator<String> reverseIterator = library.createReverseIterator();
System.out.println("\\nReverse:");
while (reverseIterator.hasNext()) {
  System.out.println("- " + reverseIterator.next());
}

// Using enhanced for loop
MenuItems menu = new MenuItems(3);
menu.addItem("Pizza");
menu.addItem("Burger");
menu.addItem("Salad");

System.out.println("\\nMenu:");
for (String item : menu) {
  System.out.println("- " + item);
}

// Output:
// Forward:
// - Design Patterns
// - Clean Code
// - Effective Java
//
// Reverse:
// - Effective Java
// - Clean Code
// - Design Patterns
//
// Menu:
// - Pizza
// - Burger
// - Salad`
        },
        {
          name: 'State',
          explanation: 'Allows object to alter behavior when internal state changes. Object appears to change class. State-specific behavior in separate classes. TCP connection states, order workflow. Alternative to large conditional statements.',
          codeExample: `// State interface
interface State {
  void insertCoin();
  void ejectCoin();
  void dispense();
}

// Context
class VendingMachine {
  private State noCoinState;
  private State hasCoinState;
  private State soldState;
  private State currentState;

  public VendingMachine() {
    noCoinState = new NoCoinState(this);
    hasCoinState = new HasCoinState(this);
    soldState = new SoldState(this);
    currentState = noCoinState;
  }

  public void insertCoin() {
    currentState.insertCoin();
  }

  public void ejectCoin() {
    currentState.ejectCoin();
  }

  public void dispense() {
    currentState.dispense();
  }

  public void setState(State state) {
    this.currentState = state;
  }

  public State getNoCoinState() { return noCoinState; }
  public State getHasCoinState() { return hasCoinState; }
  public State getSoldState() { return soldState; }
}

// Concrete states
class NoCoinState implements State {
  private VendingMachine machine;

  public NoCoinState(VendingMachine machine) {
    this.machine = machine;
  }

  public void insertCoin() {
    System.out.println("Coin inserted");
    machine.setState(machine.getHasCoinState());
  }

  public void ejectCoin() {
    System.out.println("No coin to eject");
  }

  public void dispense() {
    System.out.println("Insert coin first");
  }
}

class HasCoinState implements State {
  private VendingMachine machine;

  public HasCoinState(VendingMachine machine) {
    this.machine = machine;
  }

  public void insertCoin() {
    System.out.println("Coin already inserted");
  }

  public void ejectCoin() {
    System.out.println("Coin ejected");
    machine.setState(machine.getNoCoinState());
  }

  public void dispense() {
    System.out.println("Dispensing product...");
    machine.setState(machine.getSoldState());
  }
}

class SoldState implements State {
  private VendingMachine machine;

  public SoldState(VendingMachine machine) {
    this.machine = machine;
  }

  public void insertCoin() {
    System.out.println("Please wait, dispensing...");
  }

  public void ejectCoin() {
    System.out.println("Already dispensing");
  }

  public void dispense() {
    System.out.println("Product dispensed!");
    machine.setState(machine.getNoCoinState());
  }
}

// Usage
VendingMachine machine = new VendingMachine();

machine.dispense();        // No coin
machine.insertCoin();      // Insert coin
machine.dispense();        // Dispensing
machine.dispense();        // Product dispensed

System.out.println();

machine.insertCoin();      // Insert another coin
machine.ejectCoin();       // Eject coin

// Output:
// Insert coin first
// Coin inserted
// Dispensing product...
// Product dispensed!
//
// Coin inserted
// Coin ejected`
        }
      ],
      description: 'Patterns for algorithms, assignment of responsibilities, and communication between objects.'
    },
    {
      id: 'solid', x: 80, y: 440, width: 350, height: 160,
      icon: '⭐', title: 'SOLID Principles', color: 'red',
      details: [
        {
          name: 'Single Responsibility',
          explanation: 'Class should have only one reason to change. One class, one responsibility. High cohesion. Easier to understand, test, maintain. User class handles user data, not persistence or validation - those are separate responsibilities.',
          codeExample: `// BAD: Multiple responsibilities in one class
class User {
  private String name;
  private String email;

  public void save() {
    // Database logic
    System.out.println("Saving to database...");
  }

  public void sendEmail() {
    // Email logic
    System.out.println("Sending email...");
  }

  public void generateReport() {
    // Reporting logic
    System.out.println("Generating report...");
  }
}

// GOOD: Each class has single responsibility
class User {
  private String name;
  private String email;

  public User(String name, String email) {
    this.name = name;
    this.email = email;
  }

  public String getName() { return name; }
  public String getEmail() { return email; }
}

class UserRepository {
  public void save(User user) {
    System.out.println("Saving " + user.getName() + " to database");
  }
}

class EmailService {
  public void sendWelcomeEmail(User user) {
    System.out.println("Sending email to " + user.getEmail());
  }
}

class ReportGenerator {
  public void generateUserReport(User user) {
    System.out.println("Generating report for " + user.getName());
  }
}

// Usage
User user = new User("John Doe", "john@example.com");
new UserRepository().save(user);
new EmailService().sendWelcomeEmail(user);
new ReportGenerator().generateUserReport(user);

// Output:
// Saving John Doe to database
// Sending email to john@example.com
// Generating report for John Doe`
        },
        {
          name: 'Open/Closed',
          explanation: 'Software entities open for extension, closed for modification. Use abstractions and polymorphism. Add new functionality without changing existing code. Strategy pattern exemplifies this. Prevents regression bugs.',
          codeExample: `// BAD: Modification required for new shapes
class AreaCalculator {
  public double calculateArea(Object shape) {
    if (shape instanceof Rectangle) {
      Rectangle r = (Rectangle) shape;
      return r.width * r.height;
    } else if (shape instanceof Circle) {
      Circle c = (Circle) shape;
      return Math.PI * c.radius * c.radius;
    }
    // Need to modify this method for every new shape!
    return 0;
  }
}

// GOOD: Open for extension, closed for modification
interface Shape {
  double calculateArea();
}

class Rectangle implements Shape {
  double width, height;

  public Rectangle(double width, double height) {
    this.width = width;
    this.height = height;
  }

  public double calculateArea() {
    return width * height;
  }
}

class Circle implements Shape {
  double radius;

  public Circle(double radius) {
    this.radius = radius;
  }

  public double calculateArea() {
    return Math.PI * radius * radius;
  }
}

// New shape - no need to modify existing code!
class Triangle implements Shape {
  double base, height;

  public Triangle(double base, double height) {
    this.base = base;
    this.height = height;
  }

  public double calculateArea() {
    return 0.5 * base * height;
  }
}

class AreaCalculator {
  public double calculateArea(Shape shape) {
    return shape.calculateArea();
  }
}

// Usage
AreaCalculator calculator = new AreaCalculator();
System.out.println("Rectangle: " + calculator.calculateArea(new Rectangle(5, 4)));
System.out.println("Circle: " + calculator.calculateArea(new Circle(3)));
System.out.println("Triangle: " + calculator.calculateArea(new Triangle(4, 6)));

// Output:
// Rectangle: 20.0
// Circle: 28.274333882308138
// Triangle: 12.0`
        },
        {
          name: 'Liskov Substitution',
          explanation: 'Objects of superclass should be replaceable with objects of subclass without breaking application. Subclass must honor superclass contract. Square-Rectangle problem classic violation. Ensures proper inheritance hierarchies.',
          codeExample: `// BAD: Violates LSP - Square breaks Rectangle contract
class Rectangle {
  protected int width;
  protected int height;

  public void setWidth(int width) { this.width = width; }
  public void setHeight(int height) { this.height = height; }
  public int getArea() { return width * height; }
}

class Square extends Rectangle {
  @Override
  public void setWidth(int width) {
    this.width = width;
    this.height = width;  // Violates Rectangle behavior!
  }

  @Override
  public void setHeight(int height) {
    this.width = height;
    this.height = height;  // Violates Rectangle behavior!
  }
}

// This breaks when using Square
void testRectangle(Rectangle r) {
  r.setWidth(5);
  r.setHeight(4);
  // Expected: 20, but Square gives 16!
}

// GOOD: Proper abstraction
interface Shape {
  int getArea();
}

class Rectangle implements Shape {
  private int width;
  private int height;

  public Rectangle(int width, int height) {
    this.width = width;
    this.height = height;
  }

  public int getArea() {
    return width * height;
  }
}

class Square implements Shape {
  private int side;

  public Square(int side) {
    this.side = side;
  }

  public int getArea() {
    return side * side;
  }
}

// Another example: Bird hierarchy
abstract class Bird {
  abstract void eat();
}

abstract class FlyingBird extends Bird {
  abstract void fly();
}

class Sparrow extends FlyingBird {
  void eat() { System.out.println("Sparrow eating"); }
  void fly() { System.out.println("Sparrow flying"); }
}

class Ostrich extends Bird {
  void eat() { System.out.println("Ostrich eating"); }
  // No fly() method - doesn't violate LSP!
}

// Usage
Rectangle rect = new Rectangle(5, 4);
System.out.println("Rectangle area: " + rect.getArea());

Square square = new Square(4);
System.out.println("Square area: " + square.getArea());

// Output:
// Rectangle area: 20
// Square area: 16`
        },
        {
          name: 'Interface Segregation',
          explanation: 'Clients shouldn\'t depend on interfaces they don\'t use. Many specific interfaces better than one general interface. No fat interfaces. Prevents interface pollution. Example: separate Reader and Writer interfaces.',
          codeExample: `// BAD: Fat interface forces unnecessary implementations
interface Worker {
  void work();
  void eat();
  void sleep();
}

class HumanWorker implements Worker {
  public void work() { System.out.println("Human working"); }
  public void eat() { System.out.println("Human eating"); }
  public void sleep() { System.out.println("Human sleeping"); }
}

class RobotWorker implements Worker {
  public void work() { System.out.println("Robot working"); }
  public void eat() { /* Robot doesn't eat! */ }
  public void sleep() { /* Robot doesn't sleep! */ }
}

// GOOD: Segregated interfaces
interface Workable {
  void work();
}

interface Eatable {
  void eat();
}

interface Sleepable {
  void sleep();
}

class HumanWorker implements Workable, Eatable, Sleepable {
  public void work() {
    System.out.println("Human working");
  }

  public void eat() {
    System.out.println("Human eating");
  }

  public void sleep() {
    System.out.println("Human sleeping");
  }
}

class RobotWorker implements Workable {
  public void work() {
    System.out.println("Robot working 24/7");
  }
}

// Another example: Document operations
interface Readable {
  String read();
}

interface Writable {
  void write(String content);
}

interface Closeable {
  void close();
}

class Document implements Readable, Writable, Closeable {
  private String content;

  public String read() {
    return content;
  }

  public void write(String content) {
    this.content = content;
  }

  public void close() {
    System.out.println("Document closed");
  }
}

class ReadOnlyDocument implements Readable, Closeable {
  private String content;

  public ReadOnlyDocument(String content) {
    this.content = content;
  }

  public String read() {
    return content;
  }

  public void close() {
    System.out.println("Read-only document closed");
  }
}

// Usage
HumanWorker human = new HumanWorker();
human.work();
human.eat();

RobotWorker robot = new RobotWorker();
robot.work();  // Only implements what it needs!

// Output:
// Human working
// Human eating
// Robot working 24/7`
        },
        {
          name: 'Dependency Inversion',
          explanation: 'High-level modules shouldn\'t depend on low-level modules. Both depend on abstractions. Abstractions shouldn\'t depend on details. Details depend on abstractions. Foundation of dependency injection. Decouples components.',
          codeExample: `// BAD: High-level depends on low-level
class MySQLDatabase {
  public void save(String data) {
    System.out.println("Saving to MySQL: " + data);
  }
}

class UserService {
  private MySQLDatabase database = new MySQLDatabase();

  public void saveUser(String user) {
    database.save(user);  // Tightly coupled to MySQL!
  }
}

// GOOD: Both depend on abstraction
interface Database {
  void save(String data);
  String retrieve(String id);
}

class MySQLDatabase implements Database {
  public void save(String data) {
    System.out.println("Saving to MySQL: " + data);
  }

  public String retrieve(String id) {
    return "Data from MySQL: " + id;
  }
}

class MongoDatabase implements Database {
  public void save(String data) {
    System.out.println("Saving to MongoDB: " + data);
  }

  public String retrieve(String id) {
    return "Data from MongoDB: " + id;
  }
}

class UserService {
  private Database database;

  // Dependency injected via constructor
  public UserService(Database database) {
    this.database = database;
  }

  public void saveUser(String user) {
    database.save(user);
  }

  public String getUser(String id) {
    return database.retrieve(id);
  }
}

// Another example: Notification system
interface MessageSender {
  void send(String message);
}

class EmailSender implements MessageSender {
  public void send(String message) {
    System.out.println("Email: " + message);
  }
}

class SmsSender implements MessageSender {
  public void send(String message) {
    System.out.println("SMS: " + message);
  }
}

class NotificationService {
  private MessageSender messageSender;

  public NotificationService(MessageSender messageSender) {
    this.messageSender = messageSender;
  }

  public void notify(String message) {
    messageSender.send(message);
  }
}

// Usage
Database mysqlDb = new MySQLDatabase();
UserService service1 = new UserService(mysqlDb);
service1.saveUser("John");

Database mongoDb = new MongoDatabase();
UserService service2 = new UserService(mongoDb);
service2.saveUser("Jane");

NotificationService emailNotif = new NotificationService(new EmailSender());
emailNotif.notify("Hello via Email!");

NotificationService smsNotif = new NotificationService(new SmsSender());
smsNotif.notify("Hello via SMS!");

// Output:
// Saving to MySQL: John
// Saving to MongoDB: Jane
// Email: Hello via Email!
// SMS: Hello via SMS!`
        }
      ],
      description: 'Five fundamental principles for object-oriented design promoting maintainability, flexibility, and testability.'
    },
    {
      id: 'enterprise', x: 580, y: 540, width: 350, height: 160,
      icon: '🏢', title: 'Enterprise Patterns', color: 'orange',
      details: [
        { name: 'DAO (Data Access Object)', explanation: 'Abstracts persistence layer from business logic. Encapsulates database access. CRUD operations in dedicated classes. Separates data access from business rules. Spring Data repositories exemplify this. Enables changing persistence without affecting business logic.' },
        { name: 'Repository', explanation: 'Mediates between domain and data mapping layers using collection-like interface. More domain-centric than DAO. Encapsulates queries. Spring Data JPA repositories. Provides cleaner separation of concerns than raw DAO.' },
        { name: 'Service Layer', explanation: 'Defines application boundary with set of available operations. Encapsulates business logic. Coordinates transactions. Separates business logic from presentation. @Service in Spring. Entry point for use cases.' },
        { name: 'DTO (Data Transfer Object)', explanation: 'Object that carries data between processes. Reduces method calls in remote interfaces. Aggregates data for transfer. Separates internal domain model from external API. JSON serialization objects. Often used with REST APIs.' },
        { name: 'MVC (Model-View-Controller)', explanation: 'Separates application into three components: Model (data/logic), View (presentation), Controller (input handling). Promotes separation of concerns. Spring MVC, JSF. Parallel development possible. Clear responsibilities.' },
        { name: 'Front Controller', explanation: 'Single handler processes all requests for application. Centralized request handling. Authentication, logging, routing in one place. DispatcherServlet in Spring MVC. Ensures consistent request processing.' }
      ],
      description: 'Architectural patterns for enterprise applications handling business logic, data access, and application structure.'
    },
    {
      id: 'concurrency', x: 1080, y: 240, width: 350, height: 160,
      icon: '⚡', title: 'Concurrency Patterns', color: 'teal',
      details: [
        { name: 'Thread Pool', explanation: 'Reuses fixed number of threads to execute tasks. Avoids overhead of creating threads. ExecutorService framework. Bounded resource usage. Improves performance for I/O or compute-heavy operations. Configurable thread counts.' },
        { name: 'Producer-Consumer', explanation: 'Producers create data, consumers process it. Decouples production from processing. BlockingQueue implementation. Buffering between stages. Pipeline architectures. Different rates of production/consumption.' },
        { name: 'Future/Promise', explanation: 'Placeholder for result of asynchronous operation. CompletableFuture in Java. Non-blocking async programming. Composable asynchronous operations. Chain callbacks. Better than callback hell.' },
        { name: 'Reactor', explanation: 'Handles service requests delivered concurrently by one or more clients. Event-driven with demultiplexing. NIO Selector pattern. Single-threaded event loop. High performance I/O. Node.js, Netty use this.' },
        { name: 'Double-Checked Locking', explanation: 'Reduces overhead of acquiring lock by first testing locking criterion without synchronization. Lazy singleton initialization. Requires volatile field. Careful implementation needed. Performance optimization for thread-safe singletons.' },
        { name: 'Read-Write Lock', explanation: 'Multiple readers or single writer access. ReadWriteLock interface. Concurrent reads, exclusive writes. Better throughput than synchronized when reads dominate. Cache implementations benefit.' }
      ],
      description: 'Patterns for managing concurrent execution, thread safety, and asynchronous operations in multi-threaded environments.'
    },
    {
      id: 'dependency-injection', x: 1080, y: 440, width: 350, height: 160,
      icon: '💉', title: 'Dependency Injection', color: 'indigo',
      details: [
        { name: 'Constructor Injection', explanation: 'Dependencies provided through constructor. Immutable dependencies. Required dependencies clear. Preferred injection method. Easy to test with mock objects. Compile-time safety. Spring @Autowired on constructor.' },
        { name: 'Setter Injection', explanation: 'Dependencies provided through setter methods. Optional dependencies. Allows reconfiguration. More flexible than constructor. Can lead to partially constructed objects. @Autowired on setters. Use when truly optional.' },
        { name: 'Interface Injection', explanation: 'Interface provides method for injecting dependency. Least common type. Servlets use this pattern. Dependencies received through interface methods. More invasive than other types.' },
        { name: 'IoC Container', explanation: 'Inversion of Control - framework manages object lifecycle and dependencies. Spring ApplicationContext, CDI Container. Configures and assembles objects. Dependency resolution automatic. Promotes loose coupling.' },
        { name: 'Service Locator', explanation: 'Central registry providing service lookup. Alternative to DI. JNDI, Spring ServiceLocatorFactoryBean. Can hide dependencies. Generally DI preferred. Useful in legacy integration.' }
      ],
      description: 'Patterns for managing dependencies between objects, promoting loose coupling and testability through inversion of control.'
    },
    {
      id: 'microservices', x: 1080, y: 640, width: 350, height: 140,
      icon: '🔧', title: 'Microservices Patterns', color: 'pink',
      details: [
        { name: 'API Gateway', explanation: 'Single entry point for all clients. Routes requests to appropriate services. Handles cross-cutting concerns: authentication, rate limiting, caching. Aggregates results. Netflix Zuul, Spring Cloud Gateway. Simplifies client code.' },
        { name: 'Circuit Breaker', explanation: 'Prevents cascading failures. Fails fast when service unavailable. Three states: closed (normal), open (failing), half-open (testing). Hystrix, Resilience4j. Protects system stability. Fallback mechanisms.' },
        { name: 'Saga', explanation: 'Manages distributed transactions across services. Sequence of local transactions. Compensating transactions for rollback. Choreography or orchestration. Maintains consistency without 2PC. Used in e-commerce workflows.' },
        { name: 'CQRS', explanation: 'Command Query Responsibility Segregation. Separate models for reads and writes. Different data stores for queries and commands. Optimized independently. Event sourcing often used with CQRS. Scalability and performance.' },
        { name: 'Event Sourcing', explanation: 'Store state changes as sequence of events. Rebuild state by replaying events. Complete audit trail. Time travel debugging. Event store as source of truth. Used in financial and audit systems.' }
      ],
      description: 'Architectural patterns for building resilient, scalable distributed systems and microservices architectures.'
    }
  ]

  const handleComponentClick = (component) => {
    setSelectedComponent(component)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedComponent(null)
    setSelectedConcept(null)


  }

  // Use refs to access current modal state in event handler
  const selectedConceptRef = useRef(selectedConcept)
  useEffect(() => {
    selectedConceptRef.current = selectedConcept
  }, [selectedConcept])


  // Set initial focus on mount
  useEffect(() => {
    setFocusedComponentIndex(0)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentSelectedConcept = selectedConceptRef.current
      // Handle Escape to close modal or go back to menu
      if (e.key === 'Escape') {
        if (currentSelectedConcept) {
          e.preventDefault()
          e.stopImmediatePropagation()
          setSelectedConcept(null)
          return
        }
        return
      }

      if (currentSelectedConcept) {
        // Modal is open, don't handle other keys
        return
      }

      // Navigation when modal is closed
      const componentCount = components.length

      switch(e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault()
          setFocusedComponentIndex((prev) => (prev + 1) % componentCount)
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          setFocusedComponentIndex((prev) => (prev - 1 + componentCount) % componentCount)
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (components[focusedComponentIndex]) {
            handleComponentClick(components[focusedComponentIndex])
          }
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [focusedComponentIndex])

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept)
  }

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '95%',
      margin: '120px auto 0',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      border: '3px solid rgba(249, 115, 22, 0.4)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          ← Back to Menu
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          🎨 Design Patterns
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <div style={{
        backgroundColor: 'rgba(249, 115, 22, 0.05)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(249, 115, 22, 0.3)',
        marginBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.3rem',
          color: '#374151',
          fontWeight: '500',
          margin: 0,
          lineHeight: '1.8',
          textAlign: 'center'
        }}>
          Comprehensive guide to software design patterns including Gang of Four patterns,
          SOLID principles, enterprise patterns, concurrency patterns, dependency injection,
          and modern microservices architectural patterns for building robust, maintainable applications.
        </p>
      </div>

      <ModernDiagram
        components={components}
        onComponentClick={handleComponentClick}
        title="Design Patterns & Architectural Principles"
        width={1400}
        height={800}
        containerWidth={1800}
      
        focusedIndex={focusedComponentIndex}
      />

      {/* Modal */}
      {isModalOpen && selectedComponent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2.5rem',
            borderRadius: '16px',
            maxWidth: '1400px',
            width: '95%',
            maxHeight: '85vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '3px solid rgba(249, 115, 22, 0.4)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: '#1f2937',
                margin: 0,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                {selectedComponent.icon} {selectedComponent.title}
              </h2>
              <button
                onClick={closeModal}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{
              backgroundColor: 'rgba(249, 115, 22, 0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '2px solid rgba(249, 115, 22, 0.2)',
              marginBottom: '2rem'
            }}>
              <p style={{
                fontSize: '1.1rem',
                color: '#374151',
                fontWeight: '500',
                margin: 0,
                lineHeight: '1.6'
              }}>
                {selectedComponent.description}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: selectedConcept ? '1fr 1fr' : '1fr',
              gap: '2rem'
            }}>
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  Key Patterns
                </h3>
                <div style={{
                  display: 'grid',
                  gap: '0.75rem'
                }}>
                  {selectedComponent.details.map((detail, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleConceptClick(detail)}
                      style={{
                        backgroundColor: selectedConcept?.name === detail.name
                          ? 'rgba(249, 115, 22, 0.15)'
                          : 'rgba(34, 197, 94, 0.1)',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: selectedConcept?.name === detail.name
                          ? '2px solid rgba(249, 115, 22, 0.4)'
                          : '2px solid rgba(34, 197, 94, 0.2)',
                        fontSize: '0.95rem',
                        fontWeight: '500',
                        color: selectedConcept?.name === detail.name
                          ? '#ea580c'
                          : '#166534',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        transform: 'scale(1)'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedConcept?.name !== detail.name) {
                          e.target.style.backgroundColor = 'rgba(34, 197, 94, 0.15)'
                          e.target.style.transform = 'scale(1.02)'
                          e.target.style.borderColor = 'rgba(34, 197, 94, 0.4)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedConcept?.name !== detail.name) {
                          e.target.style.backgroundColor = 'rgba(34, 197, 94, 0.1)'
                          e.target.style.transform = 'scale(1)'
                          e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)'
                        }
                      }}
                    >
                      • {detail.name}
                      {selectedConcept?.name === detail.name && (
                        <span style={{
                          fontSize: '0.8rem',
                          opacity: 0.8,
                          marginLeft: '0.5rem',
                          fontWeight: '600'
                        }}>
                          ← Selected
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {selectedConcept && (
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '1rem'
                  }}>
                    {selectedConcept.name}
                  </h3>

                  <div style={{
                    backgroundColor: 'rgba(249, 115, 22, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(249, 115, 22, 0.2)',
                    marginBottom: '1.5rem'
                  }}>
                    <p style={{
                      fontSize: '1rem',
                      color: '#374151',
                      fontWeight: '500',
                      margin: 0,
                      lineHeight: '1.7',
                      textAlign: 'justify'
                    }}>
                      {selectedConcept.explanation}
                    </p>
                  </div>

                  {PatternDiagram({ patternName: selectedConcept.name }) && (
                    <div style={{
                      backgroundColor: '#f8fafc',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0',
                      marginBottom: '1.5rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <div style={{ width: '100%' }}>
                        <h4 style={{
                          fontSize: '1rem',
                          fontWeight: '700',
                          color: '#1e293b',
                          margin: '0 0 1rem 0',
                          textAlign: 'center'
                        }}>
                          Pattern Structure
                        </h4>
                        <PatternDiagram patternName={selectedConcept.name} />
                      </div>
                    </div>
                  )}

                  {selectedConcept.codeExample && (
                    <div style={{
                      backgroundColor: '#1e293b',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '2px solid #334155',
                      marginBottom: '1.5rem'
                    }}>
                      <h4 style={{
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: '#60a5fa',
                        margin: '0 0 1rem 0'
                      }}>
                        💻 Code Example
                      </h4>
                      <SyntaxHighlighter code={selectedConcept.codeExample} />
                    </div>
                  )}

                  <div style={{
                    backgroundColor: 'rgba(99, 102, 241, 0.05)',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(99, 102, 241, 0.2)'
                  }}>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: '#4f46e5',
                      margin: '0 0 0.75rem 0'
                    }}>
                      💡 Key Takeaway
                    </h4>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#4f46e5',
                      fontWeight: '500',
                      margin: 0,
                      lineHeight: '1.5',
                      fontStyle: 'italic'
                    }}>
                      {selectedConcept.name} is a proven solution to recurring design problems, promoting code reusability, maintainability, and scalability in software development.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default DesignPatterns

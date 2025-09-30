import { useState, useEffect, useRef } from 'react'

// Pattern diagram component for microservice patterns
const PatternDiagram = ({ patternName }) => {
  const diagrams = {
    'API Gateway': (
      <svg width="700" height="450" viewBox="0 0 700 450" style={{ maxWidth: '100%', height: 'auto' }}>
        <rect x="80" y="30" width="120" height="80" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="3"/>
        <text x="140" y="65" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Mobile</text>
        <text x="140" y="85" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Client</text>

        <rect x="230" y="30" width="120" height="80" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="3"/>
        <text x="290" y="65" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Web</text>
        <text x="290" y="85" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Client</text>

        <rect x="380" y="30" width="120" height="80" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="3"/>
        <text x="440" y="65" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Third-Party</text>
        <text x="440" y="85" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Client</text>

        <line x1="140" y1="110" x2="290" y2="180" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowGateway)"/>
        <line x1="290" y1="110" x2="290" y2="180" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowGateway)"/>
        <line x1="440" y1="110" x2="290" y2="180" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowGateway)"/>

        <rect x="200" y="180" width="180" height="100" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
        <text x="290" y="210" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">API Gateway</text>
        <text x="290" y="235" textAnchor="middle" fontSize="13" fill="white">- Routing</text>
        <text x="290" y="255" textAnchor="middle" fontSize="13" fill="white">- Authentication</text>

        <line x1="200" y1="280" x2="100" y2="350" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowService)"/>
        <line x1="290" y1="280" x2="290" y2="350" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowService)"/>
        <line x1="380" y1="280" x2="480" y2="350" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowService)"/>

        <rect x="40" y="350" width="120" height="70" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
        <text x="100" y="380" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">User</text>
        <text x="100" y="400" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Service</text>

        <rect x="230" y="350" width="120" height="70" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
        <text x="290" y="380" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Order</text>
        <text x="290" y="400" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Service</text>

        <rect x="420" y="350" width="120" height="70" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
        <text x="480" y="380" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Payment</text>
        <text x="480" y="400" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Service</text>

        <defs>
          <marker id="arrowGateway" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
          </marker>
          <marker id="arrowService" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#64748b"/>
          </marker>
        </defs>
      </svg>
    ),

    'Circuit Breaker': (
      <svg width="700" height="400" viewBox="0 0 700 400" style={{ maxWidth: '100%', height: 'auto' }}>
        <ellipse cx="150" cy="100" rx="100" ry="70" fill="#10b981" stroke="#059669" strokeWidth="3"/>
        <text x="150" y="95" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">CLOSED</text>
        <text x="150" y="115" textAnchor="middle" fontSize="13" fill="white">Normal Operation</text>

        <ellipse cx="550" cy="100" rx="100" ry="70" fill="#ef4444" stroke="#dc2626" strokeWidth="3"/>
        <text x="550" y="95" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">OPEN</text>
        <text x="550" y="115" textAnchor="middle" fontSize="13" fill="white">Failing Fast</text>

        <ellipse cx="350" cy="280" rx="110" ry="70" fill="#f59e0b" stroke="#d97706" strokeWidth="3"/>
        <text x="350" y="275" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">HALF-OPEN</text>
        <text x="350" y="295" textAnchor="middle" fontSize="13" fill="white">Testing Recovery</text>

        <path d="M 230 120 L 470 120" fill="none" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowCB)"/>
        <text x="350" y="110" textAnchor="middle" fontSize="13" fontWeight="700" fill="#3b82f6">threshold exceeded</text>

        <path d="M 480 160 Q 430 220 400 260" fill="none" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#arrowCB2)"/>
        <text x="460" y="215" textAnchor="middle" fontSize="13" fontWeight="700" fill="#8b5cf6">timeout</text>

        <path d="M 300 260 Q 250 220 220 160" fill="none" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowCB3)"/>
        <text x="240" y="215" textAnchor="middle" fontSize="13" fontWeight="700" fill="#10b981">success</text>

        <path d="M 350 220 L 350 200" fill="none" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowCB4)"/>
        <text x="420" y="245" textAnchor="middle" fontSize="13" fontWeight="700" fill="#ef4444">failure</text>

        <defs>
          <marker id="arrowCB" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
          </marker>
          <marker id="arrowCB2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6"/>
          </marker>
          <marker id="arrowCB3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
          </marker>
          <marker id="arrowCB4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
          </marker>
        </defs>
      </svg>
    ),

    'Saga': (
      <svg width="700" height="450" viewBox="0 0 700 450" style={{ maxWidth: '100%', height: 'auto' }}>
        <rect x="250" y="30" width="200" height="80" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="3"/>
        <text x="350" y="60" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">Saga</text>
        <text x="350" y="85" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">Orchestrator</text>

        <line x1="200" y1="110" x2="150" y2="170" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowSaga1)"/>
        <line x1="350" y1="110" x2="350" y2="170" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowSaga1)"/>
        <line x1="500" y1="110" x2="550" y2="170" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowSaga1)"/>

        <text x="180" y="145" textAnchor="middle" fontSize="12" fontWeight="700" fill="#10b981">1. Create</text>
        <text x="350" y="145" textAnchor="middle" fontSize="12" fontWeight="700" fill="#10b981">2. Reserve</text>
        <text x="520" y="145" textAnchor="middle" fontSize="12" fontWeight="700" fill="#10b981">3. Charge</text>

        <rect x="70" y="170" width="160" height="80" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
        <text x="150" y="200" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Order</text>
        <text x="150" y="220" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Service</text>

        <rect x="270" y="170" width="160" height="80" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
        <text x="350" y="200" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Inventory</text>
        <text x="350" y="220" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Service</text>

        <rect x="470" y="170" width="160" height="80" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
        <text x="550" y="200" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Payment</text>
        <text x="550" y="220" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Service</text>

        <line x1="150" y1="250" x2="150" y2="310" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowSaga2)"/>
        <line x1="350" y1="250" x2="350" y2="310" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowSaga2)"/>
        <line x1="550" y1="250" x2="550" y2="310" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowSaga2)"/>

        <text x="350" y="285" textAnchor="middle" fontSize="14" fontWeight="700" fill="#ef4444">On Failure: Compensate</text>

        <rect x="70" y="310" width="160" height="80" rx="8" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
        <text x="150" y="340" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Cancel</text>
        <text x="150" y="360" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Order</text>

        <rect x="270" y="310" width="160" height="80" rx="8" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
        <text x="350" y="340" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Release</text>
        <text x="350" y="360" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Inventory</text>

        <rect x="470" y="310" width="160" height="80" rx="8" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
        <text x="550" y="340" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Refund</text>
        <text x="550" y="360" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Payment</text>

        <defs>
          <marker id="arrowSaga1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
          </marker>
          <marker id="arrowSaga2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
          </marker>
        </defs>
      </svg>
    ),

    'CQRS': (
      <svg width="700" height="400" viewBox="0 0 700 400" style={{ maxWidth: '100%', height: 'auto' }}>
        <rect x="50" y="150" width="140" height="80" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="3"/>
        <text x="120" y="185" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">Client</text>

        <line x1="190" y1="170" x2="260" y2="110" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowCQRS1)"/>
        <text x="225" y="135" textAnchor="middle" fontSize="13" fontWeight="700" fill="#3b82f6">Commands</text>

        <line x1="190" y1="210" x2="260" y2="270" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowCQRS2)"/>
        <text x="225" y="250" textAnchor="middle" fontSize="13" fontWeight="700" fill="#10b981">Queries</text>

        <rect x="260" y="70" width="180" height="80" rx="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="3"/>
        <text x="350" y="100" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Command Model</text>
        <text x="350" y="125" textAnchor="middle" fontSize="13" fill="white">Write Operations</text>

        <rect x="260" y="230" width="180" height="80" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
        <text x="350" y="260" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Query Model</text>
        <text x="350" y="285" textAnchor="middle" fontSize="13" fill="white">Read Operations</text>

        <line x1="440" y1="110" x2="510" y2="110" stroke="#64748b" strokeWidth="3" markerEnd="url(#arrowCQRS3)"/>
        <line x1="440" y1="270" x2="510" y2="270" stroke="#64748b" strokeWidth="3" markerEnd="url(#arrowCQRS3)"/>

        <rect x="510" y="70" width="140" height="80" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
        <text x="580" y="100" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Write DB</text>
        <text x="580" y="120" textAnchor="middle" fontSize="13" fill="white">(Normalized)</text>

        <rect x="510" y="230" width="140" height="80" rx="8" fill="#14b8a6" stroke="#0d9488" strokeWidth="2"/>
        <text x="580" y="260" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Read DB</text>
        <text x="580" y="280" textAnchor="middle" fontSize="13" fill="white">(Denormalized)</text>

        <path d="M 580 150 L 580 230" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowCQRS4)"/>
        <text x="620" y="195" textAnchor="middle" fontSize="13" fontWeight="700" fill="#3b82f6">Events</text>

        <defs>
          <marker id="arrowCQRS1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
          </marker>
          <marker id="arrowCQRS2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
          </marker>
          <marker id="arrowCQRS3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#64748b"/>
          </marker>
          <marker id="arrowCQRS4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
          </marker>
        </defs>
      </svg>
    ),

    'Event Sourcing': (
      <svg width="700" height="450" viewBox="0 0 700 450" style={{ maxWidth: '100%', height: 'auto' }}>
        <rect x="50" y="40" width="140" height="80" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="3"/>
        <text x="120" y="75" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">Command</text>

        <line x1="190" y1="80" x2="260" y2="80" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowES1)"/>

        <rect x="260" y="40" width="180" height="80" rx="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="3"/>
        <text x="350" y="70" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Aggregate</text>
        <text x="350" y="95" textAnchor="middle" fontSize="13" fill="white">Business Logic</text>

        <line x1="350" y1="120" x2="350" y2="180" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowES2)"/>
        <text x="380" y="155" textAnchor="middle" fontSize="13" fontWeight="700" fill="#10b981">emits</text>

        <rect x="260" y="180" width="180" height="140" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
        <text x="350" y="210" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Event Store</text>
        <text x="350" y="235" textAnchor="middle" fontSize="13" fill="white">Event 1: OrderCreated</text>
        <text x="350" y="255" textAnchor="middle" fontSize="13" fill="white">Event 2: ItemAdded</text>
        <text x="350" y="275" textAnchor="middle" fontSize="13" fill="white">Event 3: OrderPaid</text>
        <text x="350" y="295" textAnchor="middle" fontSize="13" fill="white">Event 4: OrderShipped</text>

        <line x1="440" y1="250" x2="510" y2="250" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowES3)"/>
        <text x="475" y="240" textAnchor="middle" fontSize="13" fontWeight="700" fill="#f59e0b">replay</text>

        <rect x="510" y="210" width="140" height="80" rx="8" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
        <text x="580" y="240" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Current State</text>
        <text x="580" y="260" textAnchor="middle" fontSize="13" fill="white">Rebuilt from</text>
        <text x="580" y="275" textAnchor="middle" fontSize="13" fill="white">events</text>

        <line x1="350" y1="320" x2="350" y2="370" stroke="#14b8a6" strokeWidth="3" markerEnd="url(#arrowES4)"/>
        <text x="380" y="350" textAnchor="middle" fontSize="13" fontWeight="700" fill="#14b8a6">projects</text>

        <rect x="260" y="370" width="180" height="60" rx="8" fill="#14b8a6" stroke="#0d9488" strokeWidth="2"/>
        <text x="350" y="400" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Read Models</text>
        <text x="350" y="418" textAnchor="middle" fontSize="13" fill="white">Projections</text>

        <defs>
          <marker id="arrowES1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
          </marker>
          <marker id="arrowES2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
          </marker>
          <marker id="arrowES3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
          </marker>
          <marker id="arrowES4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#14b8a6"/>
          </marker>
        </defs>
      </svg>
    ),

    'Service Discovery': (
      <svg width="700" height="450" viewBox="0 0 700 450" style={{ maxWidth: '100%', height: 'auto' }}>
        <rect x="250" y="30" width="200" height="100" rx="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="3"/>
        <text x="350" y="60" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">Service Registry</text>
        <text x="350" y="85" textAnchor="middle" fontSize="13" fill="white">(Consul, Eureka)</text>
        <text x="350" y="105" textAnchor="middle" fontSize="13" fill="white">Service Locations</text>

        <line x1="200" y1="130" x2="150" y2="200" stroke="#10b981" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowSD1)"/>
        <text x="170" y="170" textAnchor="middle" fontSize="12" fontWeight="700" fill="#10b981">register</text>

        <line x1="500" y1="130" x2="550" y2="200" stroke="#10b981" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowSD1)"/>
        <text x="530" y="170" textAnchor="middle" fontSize="12" fontWeight="700" fill="#10b981">register</text>

        <line x1="120" y1="80" x2="260" y2="80" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowSD2)"/>
        <text x="190" y="70" textAnchor="middle" fontSize="12" fontWeight="700" fill="#3b82f6">lookup</text>

        <rect x="20" y="40" width="100" height="80" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
        <text x="70" y="75" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Client</text>

        <rect x="70" y="200" width="160" height="80" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
        <text x="150" y="230" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Service A</text>
        <text x="150" y="250" textAnchor="middle" fontSize="12" fill="white">instance-1</text>

        <rect x="270" y="200" width="160" height="80" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
        <text x="350" y="230" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Service A</text>
        <text x="350" y="250" textAnchor="middle" fontSize="12" fill="white">instance-2</text>

        <rect x="470" y="200" width="160" height="80" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
        <text x="550" y="230" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Service B</text>
        <text x="550" y="250" textAnchor="middle" fontSize="12" fill="white">instance-1</text>

        <line x1="70" y1="120" x2="150" y2="200" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowSD3)"/>
        <text x="100" y="165" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ef4444">call</text>

        <rect x="250" y="330" width="200" height="90" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5"/>
        <text x="350" y="360" textAnchor="middle" fontSize="14" fontWeight="700" fill="#64748b">Health Checks</text>
        <text x="350" y="380" textAnchor="middle" fontSize="12" fill="#64748b">Heartbeat monitoring</text>
        <text x="350" y="400" textAnchor="middle" fontSize="12" fill="#64748b">Auto deregistration</text>

        <defs>
          <marker id="arrowSD1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
          </marker>
          <marker id="arrowSD2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
          </marker>
          <marker id="arrowSD3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
          </marker>
        </defs>
      </svg>
    ),

    'Config Server': (
      <svg width="700" height="400" viewBox="0 0 700 400" style={{ maxWidth: '100%', height: 'auto' }}>
        <rect x="50" y="40" width="140" height="80" rx="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="3"/>
        <text x="120" y="70" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Git Repository</text>
        <text x="120" y="95" textAnchor="middle" fontSize="13" fill="white">Config Files</text>

        <line x1="190" y1="80" x2="260" y2="80" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowConfig1)"/>
        <text x="225" y="70" textAnchor="middle" fontSize="12" fontWeight="700" fill="#3b82f6">reads</text>

        <rect x="260" y="40" width="180" height="80" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
        <text x="350" y="70" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">Config Server</text>
        <text x="350" y="95" textAnchor="middle" fontSize="13" fill="white">Centralized Config</text>

        <line x1="350" y1="120" x2="200" y2="200" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowConfig2)"/>
        <line x1="350" y1="120" x2="350" y2="200" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowConfig2)"/>
        <line x1="350" y1="120" x2="500" y2="200" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowConfig2)"/>

        <text x="350" y="165" textAnchor="middle" fontSize="13" fontWeight="700" fill="#f59e0b">distributes config</text>

        <rect x="100" y="200" width="200" height="80" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
        <text x="200" y="230" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Service A</text>
        <text x="200" y="255" textAnchor="middle" fontSize="13" fill="white">dev config</text>

        <rect x="250" y="200" width="200" height="80" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
        <text x="350" y="230" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Service B</text>
        <text x="350" y="255" textAnchor="middle" fontSize="13" fill="white">dev config</text>

        <rect x="400" y="200" width="200" height="80" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
        <text x="500" y="230" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">Service C</text>
        <text x="500" y="255" textAnchor="middle" fontSize="13" fill="white">prod config</text>

        <rect x="470" y="40" width="180" height="80" rx="8" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
        <text x="560" y="70" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Vault</text>
        <text x="560" y="95" textAnchor="middle" fontSize="13" fill="white">Secrets Storage</text>

        <line x1="440" y1="80" x2="470" y2="80" stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowConfig3)"/>
        <text x="455" y="70" textAnchor="middle" fontSize="12" fontWeight="700" fill="#64748b">fetches</text>

        <defs>
          <marker id="arrowConfig1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
          </marker>
          <marker id="arrowConfig2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
          </marker>
          <marker id="arrowConfig3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#64748b"/>
          </marker>
        </defs>
      </svg>
    ),

    'Sidecar': (
      <svg width="700" height="400" viewBox="0 0 700 400" style={{ maxWidth: '100%', height: 'auto' }}>
        <rect x="100" y="80" width="500" height="240" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="10,5"/>
        <text x="350" y="60" textAnchor="middle" fontSize="16" fontWeight="700" fill="#64748b">Pod / Container Group</text>

        <rect x="140" y="120" width="180" height="160" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="3"/>
        <text x="230" y="150" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">Main Application</text>
        <text x="230" y="180" textAnchor="middle" fontSize="13" fill="white">Business Logic</text>
        <text x="230" y="200" textAnchor="middle" fontSize="13" fill="white">Core Service</text>
        <text x="230" y="220" textAnchor="middle" fontSize="13" fill="white">Port: 8080</text>

        <rect x="380" y="120" width="180" height="160" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
        <text x="470" y="150" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">Sidecar Proxy</text>
        <text x="470" y="180" textAnchor="middle" fontSize="13" fill="white">- Logging</text>
        <text x="470" y="200" textAnchor="middle" fontSize="13" fill="white">- Monitoring</text>
        <text x="470" y="220" textAnchor="middle" fontSize="13" fill="white">- Security</text>
        <text x="470" y="240" textAnchor="middle" fontSize="13" fill="white">- Service Mesh</text>

        <line x1="320" y1="200" x2="380" y2="200" stroke="#3b82f6" strokeWidth="3" strokeDasharray="5,5"/>
        <text x="350" y="190" textAnchor="middle" fontSize="12" fontWeight="700" fill="#3b82f6">localhost</text>

        <line x1="50" y1="200" x2="140" y2="200" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowSidecar1)"/>
        <text x="95" y="190" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ef4444">External</text>

        <line x1="560" y1="200" x2="650" y2="200" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowSidecar2)"/>
        <text x="605" y="190" textAnchor="middle" fontSize="12" fontWeight="700" fill="#f59e0b">Outbound</text>

        <text x="350" y="350" textAnchor="middle" fontSize="14" fontWeight="600" fill="#64748b">Shared lifecycle, network namespace</text>

        <defs>
          <marker id="arrowSidecar1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
          </marker>
          <marker id="arrowSidecar2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
          </marker>
        </defs>
      </svg>
    )
  }

  return diagrams[patternName] || null
}

// Detail Diagram component for individual feature details
const DetailDiagram = ({ patternName, featureName }) => {
  const diagrams = {
    'API Gateway Pattern': {
      'Single Entry Point': (
        <svg width="650" height="350" viewBox="0 0 650 350" style={{ maxWidth: '100%', height: 'auto' }}>
          <rect x="50" y="30" width="100" height="70" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="100" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Mobile</text>
          <text x="100" y="78" textAnchor="middle" fontSize="12" fill="white">Client</text>

          <rect x="50" y="140" width="100" height="70" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="100" y="170" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Web</text>
          <text x="100" y="188" textAnchor="middle" fontSize="12" fill="white">Client</text>

          <rect x="50" y="250" width="100" height="70" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="100" y="280" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">IoT</text>
          <text x="100" y="298" textAnchor="middle" fontSize="12" fill="white">Device</text>

          <line x1="150" y1="65" x2="240" y2="175" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowDetail1)"/>
          <line x1="150" y1="175" x2="240" y2="175" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowDetail1)"/>
          <line x1="150" y1="285" x2="240" y2="175" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowDetail1)"/>

          <rect x="240" y="140" width="140" height="70" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
          <text x="310" y="170" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">API Gateway</text>
          <text x="310" y="190" textAnchor="middle" fontSize="12" fill="white">Single Entry</text>

          <line x1="380" y1="155" x2="460" y2="80" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowDetail2)"/>
          <line x1="380" y1="175" x2="460" y2="175" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowDetail2)"/>
          <line x1="380" y1="195" x2="460" y2="270" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowDetail2)"/>

          <rect x="460" y="50" width="140" height="60" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
          <text x="530" y="78" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">User Service</text>
          <text x="530" y="94" textAnchor="middle" fontSize="11" fill="white">:8081</text>

          <rect x="460" y="145" width="140" height="60" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
          <text x="530" y="173" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Order Service</text>
          <text x="530" y="189" textAnchor="middle" fontSize="11" fill="white">:8082</text>

          <rect x="460" y="240" width="140" height="60" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
          <text x="530" y="268" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Payment Service</text>
          <text x="530" y="284" textAnchor="middle" fontSize="11" fill="white">:8083</text>

          <defs>
            <marker id="arrowDetail1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
            </marker>
            <marker id="arrowDetail2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#64748b"/>
            </marker>
          </defs>
        </svg>
      ),
      'Request Routing': (
        <svg width="650" height="380" viewBox="0 0 650 380" style={{ maxWidth: '100%', height: 'auto' }}>
          <rect x="30" y="170" width="100" height="60" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="80" y="195" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Client</text>
          <text x="80" y="213" textAnchor="middle" fontSize="11" fill="white">Request</text>

          <line x1="130" y1="200" x2="200" y2="200" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowRoute1)"/>

          <rect x="200" y="150" width="160" height="100" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
          <text x="280" y="180" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Gateway Router</text>
          <text x="280" y="202" textAnchor="middle" fontSize="11" fill="white">/users/* → User</text>
          <text x="280" y="218" textAnchor="middle" fontSize="11" fill="white">/orders/* → Order</text>
          <text x="280" y="234" textAnchor="middle" fontSize="11" fill="white">/payments/* → Pay</text>

          <line x1="360" y1="170" x2="440" y2="80" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowRoute2)"/>
          <text x="400" y="120" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ef4444">/users/*</text>

          <line x1="360" y1="200" x2="440" y2="200" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#arrowRoute3)"/>
          <text x="400" y="190" textAnchor="middle" fontSize="12" fontWeight="700" fill="#8b5cf6">/orders/*</text>

          <line x1="360" y1="230" x2="440" y2="320" stroke="#14b8a6" strokeWidth="3" markerEnd="url(#arrowRoute4)"/>
          <text x="400" y="280" textAnchor="middle" fontSize="12" fontWeight="700" fill="#14b8a6">/payments/*</text>

          <rect x="440" y="50" width="140" height="60" rx="8" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
          <text x="510" y="78" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">User Service</text>
          <text x="510" y="94" textAnchor="middle" fontSize="11" fill="white">10.0.1.5:8081</text>

          <rect x="440" y="170" width="140" height="60" rx="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
          <text x="510" y="198" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Order Service</text>
          <text x="510" y="214" textAnchor="middle" fontSize="11" fill="white">10.0.1.6:8082</text>

          <rect x="440" y="290" width="140" height="60" rx="8" fill="#14b8a6" stroke="#0d9488" strokeWidth="2"/>
          <text x="510" y="318" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Payment Service</text>
          <text x="510" y="334" textAnchor="middle" fontSize="11" fill="white">10.0.1.7:8083</text>

          <defs>
            <marker id="arrowRoute1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
            </marker>
            <marker id="arrowRoute2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
            </marker>
            <marker id="arrowRoute3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6"/>
            </marker>
            <marker id="arrowRoute4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#14b8a6"/>
            </marker>
          </defs>
        </svg>
      ),
      'Authentication & Authorization': (
        <svg width="650" height="400" viewBox="0 0 650 400" style={{ maxWidth: '100%', height: 'auto' }}>
          <rect x="30" y="180" width="100" height="60" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="80" y="205" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Client</text>
          <text x="80" y="223" textAnchor="middle" fontSize="11" fill="white">+ JWT Token</text>

          <line x1="130" y1="210" x2="200" y2="210" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowAuth1)"/>
          <text x="165" y="200" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3b82f6">Request</text>

          <rect x="200" y="160" width="180" height="100" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
          <text x="290" y="190" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">API Gateway</text>
          <text x="290" y="210" textAnchor="middle" fontSize="11" fill="white">1. Validate JWT</text>
          <text x="290" y="226" textAnchor="middle" fontSize="11" fill="white">2. Check Permissions</text>
          <text x="290" y="242" textAnchor="middle" fontSize="11" fill="white">3. Forward Request</text>

          <line x1="290" y1="160" x2="290" y2="80" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowAuth2)"/>
          <text x="330" y="115" textAnchor="middle" fontSize="11" fontWeight="700" fill="#8b5cf6">validate</text>

          <rect x="220" y="30" width="140" height="50" rx="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
          <text x="290" y="54" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Auth Service</text>
          <text x="290" y="70" textAnchor="middle" fontSize="11" fill="white">OAuth2/JWT</text>

          <line x1="380" y1="210" x2="450" y2="210" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowAuth3)"/>
          <text x="415" y="200" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981">Authorized</text>

          <rect x="450" y="180" width="140" height="60" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
          <text x="520" y="205" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Backend</text>
          <text x="520" y="223" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Service</text>

          <line x1="290" y1="260" x2="290" y2="320" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowAuth4)"/>
          <text x="340" y="295" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ef4444">if invalid</text>

          <rect x="220" y="320" width="140" height="50" rx="8" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
          <text x="290" y="344" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">401 Unauthorized</text>
          <text x="290" y="360" textAnchor="middle" fontSize="11" fill="white">Access Denied</text>

          <defs>
            <marker id="arrowAuth1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
            </marker>
            <marker id="arrowAuth2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6"/>
            </marker>
            <marker id="arrowAuth3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
            </marker>
            <marker id="arrowAuth4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
            </marker>
          </defs>
        </svg>
      )
    },
    'Circuit Breaker Pattern': {
      'Failure Detection': (
        <svg width="650" height="350" viewBox="0 0 650 350" style={{ maxWidth: '100%', height: 'auto' }}>
          <rect x="50" y="140" width="120" height="80" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="110" y="175" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Service A</text>
          <text x="110" y="193" textAnchor="middle" fontSize="11" fill="white">Calling</text>

          <line x1="170" y1="180" x2="240" y2="180" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowFail1)"/>
          <text x="205" y="170" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3b82f6">requests</text>

          <rect x="240" y="120" width="160" height="120" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
          <text x="320" y="150" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Circuit Breaker</text>
          <text x="320" y="175" textAnchor="middle" fontSize="11" fill="white">Success: 45</text>
          <text x="320" y="193" textAnchor="middle" fontSize="11" fill="white">Failures: 8</text>
          <text x="320" y="211" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ef4444">Rate: 15%</text>
          <text x="320" y="228" textAnchor="middle" fontSize="10" fill="white">Threshold: 50%</text>

          <line x1="400" y1="160" x2="470" y2="120" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowFail2)"/>
          <text x="435" y="135" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981">pass</text>

          <line x1="400" y1="200" x2="470" y2="240" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowFail3)"/>
          <text x="435" y="225" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ef4444">failures</text>

          <rect x="470" y="90" width="120" height="60" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
          <text x="530" y="115" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Service B</text>
          <text x="530" y="133" textAnchor="middle" fontSize="11" fill="white">✓ Healthy</text>

          <rect x="470" y="210" width="120" height="60" rx="8" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
          <text x="530" y="235" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Failure</text>
          <text x="530" y="253" textAnchor="middle" fontSize="11" fill="white">Timeout/Error</text>

          <rect x="240" y="280" width="160" height="50" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
          <text x="320" y="302" textAnchor="middle" fontSize="12" fontWeight="700" fill="white">Monitoring Window</text>
          <text x="320" y="318" textAnchor="middle" fontSize="10" fill="white">Last 60 seconds</text>

          <defs>
            <marker id="arrowFail1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
            </marker>
            <marker id="arrowFail2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
            </marker>
            <marker id="arrowFail3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
            </marker>
          </defs>
        </svg>
      ),
      'Circuit States': (
        <svg width="650" height="380" viewBox="0 0 650 380" style={{ maxWidth: '100%', height: 'auto' }}>
          <ellipse cx="140" cy="100" rx="90" ry="60" fill="#10b981" stroke="#059669" strokeWidth="3"/>
          <text x="140" y="95" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">CLOSED</text>
          <text x="140" y="115" textAnchor="middle" fontSize="12" fill="white">Normal Flow</text>

          <rect x="90" y="140" width="100" height="35" rx="6" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1"/>
          <text x="140" y="160" textAnchor="middle" fontSize="10" fontWeight="700" fill="white">Success: 95%</text>

          <ellipse cx="510" cy="100" rx="90" ry="60" fill="#ef4444" stroke="#dc2626" strokeWidth="3"/>
          <text x="510" y="95" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">OPEN</text>
          <text x="510" y="115" textAnchor="middle" fontSize="12" fill="white">Fail Fast</text>

          <rect x="460" y="140" width="100" height="35" rx="6" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1"/>
          <text x="510" y="160" textAnchor="middle" fontSize="10" fontWeight="700" fill="white">Failures: 60%</text>

          <ellipse cx="325" cy="280" rx="100" ry="60" fill="#f59e0b" stroke="#d97706" strokeWidth="3"/>
          <text x="325" y="275" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">HALF-OPEN</text>
          <text x="325" y="295" textAnchor="middle" fontSize="12" fill="white">Testing</text>

          <rect x="270" y="320" width="110" height="35" rx="6" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1"/>
          <text x="325" y="340" textAnchor="middle" fontSize="10" fontWeight="700" fill="white">Trial Requests</text>

          <path d="M 220 110 L 430 110" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowState1)"/>
          <text x="325" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3b82f6">Threshold</text>
          <text x="325" y="130" textAnchor="middle" fontSize="10" fill="#64748b">errors &gt; 50%</text>

          <path d="M 450 155 Q 400 220 380 260" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#arrowState2)"/>
          <text x="440" y="210" textAnchor="middle" fontSize="11" fontWeight="700" fill="#8b5cf6">Timeout</text>
          <text x="440" y="225" textAnchor="middle" fontSize="10" fill="#64748b">30s elapsed</text>

          <path d="M 270 260 Q 220 220 200 155" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowState3)"/>
          <text x="210" y="210" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981">Success</text>
          <text x="210" y="225" textAnchor="middle" fontSize="10" fill="#64748b">tests pass</text>

          <path d="M 380 250 L 430 130" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowState4)"/>
          <text x="435" y="190" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ef4444">Fail</text>
          <text x="435" y="205" textAnchor="middle" fontSize="10" fill="#64748b">tests fail</text>

          <defs>
            <marker id="arrowState1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
            </marker>
            <marker id="arrowState2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6"/>
            </marker>
            <marker id="arrowState3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
            </marker>
            <marker id="arrowState4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
            </marker>
          </defs>
        </svg>
      ),
      'Fallback Mechanisms': (
        <svg width="650" height="350" viewBox="0 0 650 350" style={{ maxWidth: '100%', height: 'auto' }}>
          <rect x="30" y="140" width="100" height="60" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="80" y="165" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Client</text>
          <text x="80" y="183" textAnchor="middle" fontSize="11" fill="white">Request</text>

          <line x1="130" y1="170" x2="200" y2="170" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowFallback1)"/>

          <rect x="200" y="130" width="140" height="80" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
          <text x="270" y="160" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Circuit Breaker</text>
          <text x="270" y="178" textAnchor="middle" fontSize="11" fill="white">State: OPEN</text>
          <text x="270" y="194" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ef4444">Circuit Tripped!</text>

          <line x1="340" y1="150" x2="420" y2="90" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowFallback2)"/>
          <text x="380" y="115" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981">Primary</text>
          <text x="380" y="130" textAnchor="middle" fontSize="10" fill="#64748b">(blocked)</text>

          <line x1="340" y1="190" x2="420" y2="250" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowFallback3)"/>
          <text x="380" y="215" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f59e0b">Fallback</text>
          <text x="380" y="230" textAnchor="middle" fontSize="10" fill="#64748b">(active)</text>

          <rect x="420" y="60" width="160" height="60" rx="8" fill="#64748b" stroke="#475569" strokeWidth="2" opacity="0.5"/>
          <text x="500" y="85" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Primary Service</text>
          <text x="500" y="103" textAnchor="middle" fontSize="11" fill="white">✗ Unavailable</text>

          <rect x="420" y="220" width="160" height="80" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="3"/>
          <text x="500" y="245" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Fallback Strategy</text>
          <text x="500" y="263" textAnchor="middle" fontSize="11" fill="white">• Cached Data</text>
          <text x="500" y="278" textAnchor="middle" fontSize="11" fill="white">• Default Response</text>
          <text x="500" y="293" textAnchor="middle" fontSize="11" fill="white">• Degraded Mode</text>

          <defs>
            <marker id="arrowFallback1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
            </marker>
            <marker id="arrowFallback2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
            </marker>
            <marker id="arrowFallback3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
            </marker>
          </defs>
        </svg>
      )
    },
    'Service Discovery Pattern': {
      'Service Registry': (
        <svg width="650" height="380" viewBox="0 0 650 380" style={{ maxWidth: '100%', height: 'auto' }}>
          <rect x="220" y="30" width="200" height="120" rx="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="3"/>
          <text x="320" y="60" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Service Registry</text>
          <text x="320" y="80" textAnchor="middle" fontSize="12" fill="white">Consul / Eureka</text>
          <rect x="240" y="95" width="160" height="45" rx="6" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1"/>
          <text x="320" y="112" textAnchor="middle" fontSize="10" fill="white">UserService: 10.0.1.5:8081</text>
          <text x="320" y="126" textAnchor="middle" fontSize="10" fill="white">OrderService: 10.0.1.6:8082</text>
          <text x="320" y="140" textAnchor="middle" fontSize="10" fill="white">PaymentService: 10.0.1.7:8083</text>

          <line x1="220" y1="180" x2="140" y2="250" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowRegistry1)"/>
          <text x="165" y="210" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981">register</text>

          <line x1="320" y1="150" x2="320" y2="250" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowRegistry1)"/>
          <text x="350" y="200" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981">register</text>

          <line x1="420" y1="180" x2="500" y2="250" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowRegistry1)"/>
          <text x="475" y="210" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981">register</text>

          <rect x="60" y="250" width="160" height="70" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="140" y="278" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">User Service</text>
          <text x="140" y="296" textAnchor="middle" fontSize="11" fill="white">10.0.1.5:8081</text>
          <text x="140" y="310" textAnchor="middle" fontSize="10" fill="white">Status: UP</text>

          <rect x="240" y="250" width="160" height="70" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="320" y="278" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Order Service</text>
          <text x="320" y="296" textAnchor="middle" fontSize="11" fill="white">10.0.1.6:8082</text>
          <text x="320" y="310" textAnchor="middle" fontSize="10" fill="white">Status: UP</text>

          <rect x="420" y="250" width="160" height="70" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="500" y="278" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Payment Service</text>
          <text x="500" y="296" textAnchor="middle" fontSize="11" fill="white">10.0.1.7:8083</text>
          <text x="500" y="310" textAnchor="middle" fontSize="10" fill="white">Status: UP</text>

          <defs>
            <marker id="arrowRegistry1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
            </marker>
          </defs>
        </svg>
      ),
      'Client-Side Discovery': (
        <svg width="650" height="350" viewBox="0 0 650 350" style={{ maxWidth: '100%', height: 'auto' }}>
          <rect x="30" y="140" width="100" height="60" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="80" y="165" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Client</text>
          <text x="80" y="183" textAnchor="middle" fontSize="11" fill="white">Smart Client</text>

          <line x1="130" y1="150" x2="220" y2="90" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowClient1)"/>
          <text x="175" y="115" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3b82f6">1. Query</text>

          <rect x="220" y="60" width="160" height="60" rx="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
          <text x="300" y="85" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Service Registry</text>
          <text x="300" y="103" textAnchor="middle" fontSize="11" fill="white">Return Locations</text>

          <line x1="220" y1="110" x2="130" y2="160" stroke="#10b981" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowClient2)"/>
          <text x="175" y="140" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981">2. List</text>

          <line x1="130" y1="190" x2="440" y2="245" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowClient3)"/>
          <text x="285" y="210" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ef4444">3. Direct Call</text>
          <text x="285" y="225" textAnchor="middle" fontSize="10" fill="#64748b">(Load Balance)</text>

          <rect x="440" y="220" width="150" height="60" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
          <text x="515" y="245" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Service Instance</text>
          <text x="515" y="263" textAnchor="middle" fontSize="11" fill="white">10.0.1.5:8081</text>

          <rect x="80" y="250" width="80" height="40" rx="6" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
          <text x="120" y="270" textAnchor="middle" fontSize="11" fontWeight="700" fill="white">Ribbon</text>
          <text x="120" y="284" textAnchor="middle" fontSize="9" fill="white">Load Balancer</text>

          <defs>
            <marker id="arrowClient1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
            </marker>
            <marker id="arrowClient2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
            </marker>
            <marker id="arrowClient3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
            </marker>
          </defs>
        </svg>
      ),
      'Server-Side Discovery': (
        <svg width="650" height="350" viewBox="0 0 650 350" style={{ maxWidth: '100%', height: 'auto' }}>
          <rect x="30" y="140" width="100" height="60" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="80" y="165" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Client</text>
          <text x="80" y="183" textAnchor="middle" fontSize="11" fill="white">Simple Client</text>

          <line x1="130" y1="170" x2="220" y2="170" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowServer1)"/>
          <text x="175" y="160" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3b82f6">1. Request</text>

          <rect x="220" y="130" width="140" height="80" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
          <text x="290" y="160" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Load Balancer</text>
          <text x="290" y="178" textAnchor="middle" fontSize="11" fill="white">AWS ELB</text>
          <text x="290" y="194" textAnchor="middle" fontSize="11" fill="white">NGINX</text>

          <line x1="290" y1="130" x2="290" y2="60" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowServer2)"/>
          <text x="330" y="90" textAnchor="middle" fontSize="11" fontWeight="700" fill="#8b5cf6">2. Query</text>

          <rect x="210" y="20" width="160" height="40" rx="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
          <text x="290" y="45" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Service Registry</text>

          <line x1="360" y1="150" x2="440" y2="110" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowServer3)"/>
          <text x="405" y="125" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ef4444">3. Route</text>

          <line x1="360" y1="190" x2="440" y2="230" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowServer3)"/>
          <text x="405" y="215" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ef4444">3. Route</text>

          <rect x="440" y="80" width="140" height="60" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
          <text x="510" y="105" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Service A</text>
          <text x="510" y="123" textAnchor="middle" fontSize="11" fill="white">Instance 1</text>

          <rect x="440" y="200" width="140" height="60" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
          <text x="510" y="225" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Service A</text>
          <text x="510" y="243" textAnchor="middle" fontSize="11" fill="white">Instance 2</text>

          <defs>
            <marker id="arrowServer1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
            </marker>
            <marker id="arrowServer2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6"/>
            </marker>
            <marker id="arrowServer3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
            </marker>
          </defs>
        </svg>
      )
    },
    'Config Server Pattern': {
      'Externalized Configuration': (
        <svg width="650" height="350" viewBox="0 0 650 350" style={{ maxWidth: '100%', height: 'auto' }}>
          <rect x="40" y="30" width="140" height="60" rx="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
          <text x="110" y="55" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Git Repository</text>
          <text x="110" y="73" textAnchor="middle" fontSize="11" fill="white">config-repo/</text>

          <line x1="180" y1="60" x2="250" y2="60" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowConfig1)"/>
          <text x="215" y="50" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3b82f6">pull</text>

          <rect x="250" y="30" width="160" height="60" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
          <text x="330" y="55" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Config Server</text>
          <text x="330" y="73" textAnchor="middle" fontSize="11" fill="white">:8888</text>

          <line x1="330" y1="90" x2="150" y2="180" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowConfig2)"/>
          <text x="240" y="130" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f59e0b">fetch config</text>

          <line x1="330" y1="90" x2="330" y2="180" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowConfig2)"/>
          <text x="365" y="135" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f59e0b">fetch</text>

          <line x1="330" y1="90" x2="510" y2="180" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowConfig2)"/>
          <text x="420" y="130" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f59e0b">fetch config</text>

          <rect x="60" y="180" width="180" height="80" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="150" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">User Service</text>
          <text x="150" y="228" textAnchor="middle" fontSize="10" fill="white">application-dev.yml</text>
          <text x="150" y="243" textAnchor="middle" fontSize="10" fill="white">db.host=dev-db:5432</text>

          <rect x="250" y="180" width="160" height="80" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="330" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Order Service</text>
          <text x="330" y="228" textAnchor="middle" fontSize="10" fill="white">application-dev.yml</text>
          <text x="330" y="243" textAnchor="middle" fontSize="10" fill="white">db.host=dev-db:5432</text>

          <rect x="420" y="180" width="180" height="80" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="510" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Payment Service</text>
          <text x="510" y="228" textAnchor="middle" fontSize="10" fill="white">application-prod.yml</text>
          <text x="510" y="243" textAnchor="middle" fontSize="10" fill="white">db.host=prod-db:5432</text>

          <rect x="220" y="290" width="220" height="40" rx="6" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
          <text x="330" y="312" textAnchor="middle" fontSize="11" fontWeight="700" fill="white">No Code Changes Required!</text>

          <defs>
            <marker id="arrowConfig1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
            </marker>
            <marker id="arrowConfig2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
            </marker>
          </defs>
        </svg>
      ),
      'Dynamic Refresh': (
        <svg width="650" height="380" viewBox="0 0 650 380" style={{ maxWidth: '100%', height: 'auto' }}>
          <rect x="220" y="30" width="200" height="70" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
          <text x="320" y="58" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Config Server</text>
          <text x="320" y="78" textAnchor="middle" fontSize="11" fill="white">Config Changed!</text>
          <text x="320" y="93" textAnchor="middle" fontSize="10" fill="white">max_connections: 200</text>

          <line x1="220" y1="120" x2="140" y2="200" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowRefresh1)"/>
          <text x="165" y="155" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3b82f6">webhook</text>

          <line x1="320" y1="100" x2="320" y2="200" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowRefresh1)"/>
          <text x="355" y="150" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3b82f6">push</text>

          <line x1="420" y1="120" x2="500" y2="200" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowRefresh1)"/>
          <text x="475" y="155" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3b82f6">notify</text>

          <rect x="60" y="200" width="160" height="90" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="140" y="230" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Service A</text>
          <text x="140" y="248" textAnchor="middle" fontSize="11" fill="white">@RefreshScope</text>
          <text x="140" y="263" textAnchor="middle" fontSize="10" fill="white">Old: max=100</text>
          <text x="140" y="280" textAnchor="middle" fontSize="10" fontWeight="700" fill="#10b981">New: max=200</text>

          <rect x="240" y="200" width="160" height="90" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="320" y="230" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Service B</text>
          <text x="320" y="248" textAnchor="middle" fontSize="11" fill="white">@RefreshScope</text>
          <text x="320" y="263" textAnchor="middle" fontSize="10" fill="white">Old: max=100</text>
          <text x="320" y="280" textAnchor="middle" fontSize="10" fontWeight="700" fill="#10b981">New: max=200</text>

          <rect x="420" y="200" width="160" height="90" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="500" y="230" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Service C</text>
          <text x="500" y="248" textAnchor="middle" fontSize="11" fill="white">@RefreshScope</text>
          <text x="500" y="263" textAnchor="middle" fontSize="10" fill="white">Old: max=100</text>
          <text x="500" y="280" textAnchor="middle" fontSize="10" fontWeight="700" fill="#10b981">New: max=200</text>

          <rect x="220" y="320" width="200" height="40" rx="6" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
          <text x="320" y="342" textAnchor="middle" fontSize="11" fontWeight="700" fill="white">No Restart Required!</text>

          <defs>
            <marker id="arrowRefresh1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
            </marker>
          </defs>
        </svg>
      ),
      'Encryption & Secrets': (
        <svg width="650" height="350" viewBox="0 0 650 350" style={{ maxWidth: '100%', height: 'auto' }}>
          <rect x="40" y="140" width="120" height="60" rx="8" fill="#ef4444" stroke="#dc2626" strokeWidth="3"/>
          <text x="100" y="165" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Vault</text>
          <text x="100" y="183" textAnchor="middle" fontSize="11" fill="white">Secrets Store</text>

          <line x1="160" y1="170" x2="230" y2="170" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowSecret1)"/>
          <text x="195" y="160" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ef4444">fetch</text>

          <rect x="230" y="120" width="170" height="100" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
          <text x="315" y="150" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Config Server</text>
          <text x="315" y="170" textAnchor="middle" fontSize="11" fill="white">Decrypt secrets</text>
          <rect x="250" y="180" width="130" height="30" rx="6" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1"/>
          <text x="315" y="200" textAnchor="middle" fontSize="10" fill="white">db.password={'{'}{'{cipher}'}{'}'}</text>

          <line x1="400" y1="170" x2="470" y2="170" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowSecret2)"/>
          <text x="435" y="160" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981">provide</text>

          <rect x="470" y="120" width="140" height="100" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="540" y="150" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Service</text>
          <text x="540" y="168" textAnchor="middle" fontSize="11" fill="white">Receives plaintext</text>
          <rect x="490" y="180" width="100" height="30" rx="6" fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="1"/>
          <text x="540" y="200" textAnchor="middle" fontSize="10" fill="white">db.pass=secret123</text>

          <rect x="190" y="260" width="280" height="60" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
          <text x="330" y="285" textAnchor="middle" fontSize="12" fontWeight="700" fill="white">Security Flow</text>
          <text x="330" y="302" textAnchor="middle" fontSize="10" fill="white">Vault → Encrypted Config → Server Decrypts → Service</text>

          <defs>
            <marker id="arrowSecret1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
            </marker>
            <marker id="arrowSecret2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
            </marker>
          </defs>
        </svg>
      )
    },
    'Saga Pattern': {
      'Orchestration-Based': (
        <svg width="650" height="400" viewBox="0 0 650 400" style={{ maxWidth: '100%', height: 'auto' }}>
          <rect x="250" y="30" width="150" height="60" rx="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="3"/>
          <text x="325" y="55" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Saga</text>
          <text x="325" y="73" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Orchestrator</text>

          <line x1="250" y1="90" x2="140" y2="150" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowOrch1)"/>
          <text x="185" y="115" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981">1. Create</text>

          <line x1="325" y1="90" x2="325" y2="150" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowOrch1)"/>
          <text x="355" y="120" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981">2. Reserve</text>

          <line x1="400" y1="90" x2="510" y2="150" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowOrch1)"/>
          <text x="465" y="115" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981">3. Charge</text>

          <rect x="60" y="150" width="160" height="70" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
          <text x="140" y="180" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Order Service</text>
          <text x="140" y="198" textAnchor="middle" fontSize="11" fill="white">createOrder()</text>

          <rect x="245" y="150" width="160" height="70" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
          <text x="325" y="180" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Inventory</text>
          <text x="325" y="198" textAnchor="middle" fontSize="11" fill="white">reserveItems()</text>

          <rect x="430" y="150" width="160" height="70" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
          <text x="510" y="180" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Payment</text>
          <text x="510" y="198" textAnchor="middle" fontSize="11" fill="white">chargeCard()</text>

          <line x1="140" y1="220" x2="140" y2="280" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowOrch2)"/>
          <line x1="325" y1="220" x2="325" y2="280" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowOrch2)"/>
          <line x1="510" y1="220" x2="510" y2="280" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowOrch2)"/>

          <text x="325" y="255" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ef4444">On Failure: Compensate All</text>

          <rect x="60" y="280" width="160" height="70" rx="8" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
          <text x="140" y="310" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Compensation</text>
          <text x="140" y="328" textAnchor="middle" fontSize="11" fill="white">cancelOrder()</text>

          <rect x="245" y="280" width="160" height="70" rx="8" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
          <text x="325" y="310" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Compensation</text>
          <text x="325" y="328" textAnchor="middle" fontSize="11" fill="white">releaseItems()</text>

          <rect x="430" y="280" width="160" height="70" rx="8" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
          <text x="510" y="310" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Compensation</text>
          <text x="510" y="328" textAnchor="middle" fontSize="11" fill="white">refundCard()</text>

          <defs>
            <marker id="arrowOrch1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
            </marker>
            <marker id="arrowOrch2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
            </marker>
          </defs>
        </svg>
      ),
      'Choreography-Based': (
        <svg width="650" height="380" viewBox="0 0 650 380" style={{ maxWidth: '100%', height: 'auto' }}>
          <rect x="60" y="60" width="160" height="70" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="140" y="88" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Order Service</text>
          <text x="140" y="106" textAnchor="middle" fontSize="11" fill="white">Creates Order</text>
          <text x="140" y="121" textAnchor="middle" fontSize="10" fontWeight="700" fill="#10b981">Emit: OrderCreated</text>

          <line x1="220" y1="95" x2="280" y2="180" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowChor1)"/>
          <text x="255" y="135" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981">event</text>

          <rect x="280" y="160" width="160" height="70" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="360" y="188" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Inventory</text>
          <text x="360" y="206" textAnchor="middle" fontSize="11" fill="white">Reserve Items</text>
          <text x="360" y="221" textAnchor="middle" fontSize="10" fontWeight="700" fill="#10b981">Emit: ItemsReserved</text>

          <line x1="440" y1="195" x2="500" y2="270" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowChor1)"/>
          <text x="475" y="230" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981">event</text>

          <rect x="430" y="260" width="160" height="70" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="510" y="288" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Payment</text>
          <text x="510" y="306" textAnchor="middle" fontSize="11" fill="white">Charge Card</text>
          <text x="510" y="321" textAnchor="middle" fontSize="10" fontWeight="700" fill="#10b981">Emit: PaymentDone</text>

          <rect x="220" y="40" width="200" height="50" rx="8" fill="#14b8a6" stroke="#0d9488" strokeWidth="2"/>
          <text x="320" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Event Bus</text>
          <text x="320" y="80" textAnchor="middle" fontSize="11" fill="white">Kafka / RabbitMQ</text>

          <line x1="140" y1="60" x2="280" y2="70" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5"/>
          <line x1="360" y1="160" x2="360" y2="90" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5"/>
          <line x1="510" y1="260" x2="420" y2="75" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5"/>

          <text x="320" y="350" textAnchor="middle" fontSize="12" fontWeight="700" fill="#64748b">No Central Coordinator - Services React to Events</text>

          <defs>
            <marker id="arrowChor1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
            </marker>
          </defs>
        </svg>
      ),
      'Compensating Transactions': (
        <svg width="650" height="400" viewBox="0 0 650 400" style={{ maxWidth: '100%', height: 'auto' }}>
          <text x="325" y="25" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b">Success Path</text>
          <rect x="60" y="40" width="140" height="60" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
          <text x="130" y="65" textAnchor="middle" fontSize="13" fontWeight="700" fill="white">Step 1</text>
          <text x="130" y="83" textAnchor="middle" fontSize="11" fill="white">Create Order</text>

          <line x1="200" y1="70" x2="250" y2="70" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowComp1)"/>

          <rect x="250" y="40" width="140" height="60" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
          <text x="320" y="65" textAnchor="middle" fontSize="13" fontWeight="700" fill="white">Step 2</text>
          <text x="320" y="83" textAnchor="middle" fontSize="11" fill="white">Reserve Items</text>

          <line x1="390" y1="70" x2="440" y2="70" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowComp1)"/>

          <rect x="440" y="40" width="140" height="60" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
          <text x="510" y="65" textAnchor="middle" fontSize="13" fontWeight="700" fill="white">Step 3</text>
          <text x="510" y="83" textAnchor="middle" fontSize="11" fill="white">Charge Card</text>

          <text x="325" y="145" textAnchor="middle" fontSize="14" fontWeight="700" fill="#ef4444">Failure at Step 3</text>

          <rect x="440" y="160" width="140" height="60" rx="8" fill="#ef4444" stroke="#dc2626" strokeWidth="3"/>
          <text x="510" y="185" textAnchor="middle" fontSize="13" fontWeight="700" fill="white">Step 3 FAILS</text>
          <text x="510" y="203" textAnchor="middle" fontSize="11" fill="white">Card Declined</text>

          <line x1="440" y1="190" x2="390" y2="190" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowComp2)"/>
          <text x="415" y="180" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ef4444">trigger</text>

          <text x="325" y="255" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e293b">Compensation Path</text>

          <rect x="250" y="270" width="140" height="60" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
          <text x="320" y="295" textAnchor="middle" fontSize="13" fontWeight="700" fill="white">Compensate 2</text>
          <text x="320" y="313" textAnchor="middle" fontSize="11" fill="white">Release Items</text>

          <line x1="250" y1="300" x2="200" y2="300" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowComp3)"/>

          <rect x="60" y="270" width="140" height="60" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
          <text x="130" y="295" textAnchor="middle" fontSize="13" fontWeight="700" fill="white">Compensate 1</text>
          <text x="130" y="313" textAnchor="middle" fontSize="11" fill="white">Cancel Order</text>

          <text x="325" y="370" textAnchor="middle" fontSize="12" fontWeight="700" fill="#64748b">Compensations Undo Completed Steps in Reverse Order</text>

          <defs>
            <marker id="arrowComp1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
            </marker>
            <marker id="arrowComp2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
            </marker>
            <marker id="arrowComp3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
            </marker>
          </defs>
        </svg>
      )
    },
    'CQRS Pattern': {
      'Separation of Concerns': (
        <svg width="650" height="350" viewBox="0 0 650 350" style={{ maxWidth: '100%', height: 'auto' }}>
          <rect x="30" y="140" width="100" height="60" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="80" y="165" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Client</text>

          <line x1="130" y1="150" x2="200" y2="90" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowSep1)"/>
          <text x="165" y="115" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3b82f6">Commands</text>

          <line x1="130" y1="190" x2="200" y2="250" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowSep2)"/>
          <text x="165" y="225" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981">Queries</text>

          <rect x="200" y="60" width="170" height="60" rx="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="3"/>
          <text x="285" y="85" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Command Side</text>
          <text x="285" y="103" textAnchor="middle" fontSize="11" fill="white">Write Model</text>

          <rect x="200" y="220" width="170" height="60" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
          <text x="285" y="245" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Query Side</text>
          <text x="285" y="263" textAnchor="middle" fontSize="11" fill="white">Read Model</text>

          <line x1="370" y1="90" x2="440" y2="90" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowSep3)"/>

          <rect x="440" y="60" width="140" height="60" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
          <text x="510" y="85" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Write DB</text>
          <text x="510" y="103" textAnchor="middle" fontSize="11" fill="white">PostgreSQL</text>

          <line x1="370" y1="250" x2="440" y2="250" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowSep3)"/>

          <rect x="440" y="220" width="140" height="60" rx="8" fill="#14b8a6" stroke="#0d9488" strokeWidth="2"/>
          <text x="510" y="245" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Read DB</text>
          <text x="510" y="263" textAnchor="middle" fontSize="11" fill="white">MongoDB</text>

          <path d="M 510 120 L 510 220" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowSep4)"/>
          <text x="550" y="170" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3b82f6">Events</text>

          <defs>
            <marker id="arrowSep1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
            </marker>
            <marker id="arrowSep2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
            </marker>
            <marker id="arrowSep3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#64748b"/>
            </marker>
            <marker id="arrowSep4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
            </marker>
          </defs>
        </svg>
      ),
      'Command Model': (
        <svg width="650" height="350" viewBox="0 0 650 350" style={{ maxWidth: '100%', height: 'auto' }}>
          <rect x="30" y="140" width="100" height="60" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="80" y="165" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Client</text>
          <text x="80" y="183" textAnchor="middle" fontSize="11" fill="white">CreateOrder</text>

          <line x1="130" y1="170" x2="200" y2="170" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowCmd1)"/>
          <text x="165" y="160" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3b82f6">command</text>

          <rect x="200" y="120" width="160" height="100" rx="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="3"/>
          <text x="280" y="150" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Command Model</text>
          <text x="280" y="170" textAnchor="middle" fontSize="11" fill="white">1. Validate</text>
          <text x="280" y="186" textAnchor="middle" fontSize="11" fill="white">2. Apply Business Rules</text>
          <text x="280" y="202" textAnchor="middle" fontSize="11" fill="white">3. Persist Changes</text>

          <line x1="360" y1="170" x2="430" y2="170" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowCmd2)"/>
          <text x="395" y="160" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981">save</text>

          <rect x="430" y="120" width="160" height="100" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
          <text x="510" y="150" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Write Database</text>
          <text x="510" y="168" textAnchor="middle" fontSize="11" fill="white">Normalized Schema</text>
          <text x="510" y="186" textAnchor="middle" fontSize="10" fill="white">ACID Transactions</text>
          <text x="510" y="202" textAnchor="middle" fontSize="10" fill="white">Strong Consistency</text>

          <line x1="510" y1="220" x2="510" y2="270" stroke="#14b8a6" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowCmd3)"/>
          <text x="550" y="250" textAnchor="middle" fontSize="11" fontWeight="700" fill="#14b8a6">publish</text>

          <rect x="430" y="270" width="160" height="50" rx="8" fill="#14b8a6" stroke="#0d9488" strokeWidth="2"/>
          <text x="510" y="292" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Domain Events</text>
          <text x="510" y="308" textAnchor="middle" fontSize="11" fill="white">OrderCreated</text>

          <defs>
            <marker id="arrowCmd1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
            </marker>
            <marker id="arrowCmd2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
            </marker>
            <marker id="arrowCmd3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#14b8a6"/>
            </marker>
          </defs>
        </svg>
      ),
      'Query Model': (
        <svg width="650" height="350" viewBox="0 0 650 350" style={{ maxWidth: '100%', height: 'auto' }}>
          <rect x="30" y="180" width="100" height="60" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="80" y="205" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Client</text>
          <text x="80" y="223" textAnchor="middle" fontSize="11" fill="white">GetOrders</text>

          <line x1="130" y1="210" x2="200" y2="210" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowQry1)"/>
          <text x="165" y="200" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3b82f6">query</text>

          <rect x="200" y="160" width="160" height="100" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
          <text x="280" y="190" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Query Model</text>
          <text x="280" y="210" textAnchor="middle" fontSize="11" fill="white">No Business Logic</text>
          <text x="280" y="226" textAnchor="middle" fontSize="11" fill="white">Simple Data Access</text>
          <text x="280" y="242" textAnchor="middle" fontSize="11" fill="white">Fast Reads</text>

          <line x1="360" y1="210" x2="430" y2="210" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowQry2)"/>
          <text x="395" y="200" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981">fetch</text>

          <rect x="430" y="160" width="160" height="100" rx="8" fill="#14b8a6" stroke="#0d9488" strokeWidth="2"/>
          <text x="510" y="190" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Read Database</text>
          <text x="510" y="208" textAnchor="middle" fontSize="11" fill="white">Denormalized</text>
          <text x="510" y="226" textAnchor="middle" fontSize="10" fill="white">Optimized for Reads</text>
          <text x="510" y="242" textAnchor="middle" fontSize="10" fill="white">Eventually Consistent</text>

          <rect x="200" y="30" width="180" height="80" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
          <text x="290" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Event Processor</text>
          <text x="290" y="76" textAnchor="middle" fontSize="11" fill="white">Subscribes to Events</text>
          <text x="290" y="92" textAnchor="middle" fontSize="11" fill="white">Updates Read Models</text>

          <line x1="380" y1="85" x2="470" y2="160" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowQry3)"/>
          <text x="440" y="115" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f59e0b">update</text>

          <defs>
            <marker id="arrowQry1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
            </marker>
            <marker id="arrowQry2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
            </marker>
            <marker id="arrowQry3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
            </marker>
          </defs>
        </svg>
      )
    },
    'Event Sourcing Pattern': {
      'Event Store': (
        <svg width="650" height="380" viewBox="0 0 650 380" style={{ maxWidth: '100%', height: 'auto' }}>
          <rect x="30" y="40" width="120" height="60" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="90" y="65" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Command</text>
          <text x="90" y="83" textAnchor="middle" fontSize="11" fill="white">Create Order</text>

          <line x1="150" y1="70" x2="220" y2="70" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowES1)"/>

          <rect x="220" y="40" width="140" height="60" rx="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
          <text x="290" y="65" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Aggregate</text>
          <text x="290" y="83" textAnchor="middle" fontSize="11" fill="white">Business Logic</text>

          <line x1="290" y1="100" x2="290" y2="160" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowES2)"/>
          <text x="325" y="135" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981">append</text>

          <rect x="180" y="160" width="220" height="150" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
          <text x="290" y="185" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Event Store</text>
          <text x="290" y="203" textAnchor="middle" fontSize="12" fill="white">(Append-Only Log)</text>
          <rect x="200" y="215" width="180" height="85" rx="6" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1"/>
          <text x="290" y="235" textAnchor="middle" fontSize="11" fill="white">1. OrderCreated (t=0)</text>
          <text x="290" y="252" textAnchor="middle" fontSize="11" fill="white">2. ItemAdded (t=1)</text>
          <text x="290" y="269" textAnchor="middle" fontSize="11" fill="white">3. OrderPaid (t=2)</text>
          <text x="290" y="286" textAnchor="middle" fontSize="11" fill="white">4. OrderShipped (t=3)</text>

          <line x1="400" y1="235" x2="470" y2="235" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowES3)"/>
          <text x="435" y="225" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f59e0b">replay</text>

          <rect x="470" y="200" width="140" height="70" rx="8" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
          <text x="540" y="225" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Current State</text>
          <text x="540" y="243" textAnchor="middle" fontSize="11" fill="white">Order: Shipped</text>
          <text x="540" y="258" textAnchor="middle" fontSize="10" fill="white">Computed from events</text>

          <defs>
            <marker id="arrowES1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
            </marker>
            <marker id="arrowES2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
            </marker>
            <marker id="arrowES3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
            </marker>
          </defs>
        </svg>
      ),
      'Event Replay': (
        <svg width="650" height="380" viewBox="0 0 650 380" style={{ maxWidth: '100%', height: 'auto' }}>
          <rect x="30" y="160" width="180" height="120" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
          <text x="120" y="185" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Event Store</text>
          <rect x="45" y="200" width="150" height="70" rx="6" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1"/>
          <text x="120" y="218" textAnchor="middle" fontSize="10" fill="white">OrderCreated (v=0)</text>
          <text x="120" y="233" textAnchor="middle" fontSize="10" fill="white">ItemAdded (v=1)</text>
          <text x="120" y="248" textAnchor="middle" fontSize="10" fill="white">OrderPaid (v=2)</text>
          <text x="120" y="263" textAnchor="middle" fontSize="10" fill="white">OrderShipped (v=3)</text>

          <line x1="210" y1="200" x2="280" y2="140" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowReplay1)"/>
          <text x="245" y="165" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3b82f6">replay</text>

          <rect x="280" y="60" width="140" height="160" rx="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
          <text x="350" y="85" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Replay Process</text>
          <rect x="295" y="95" width="110" height="115" rx="6" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1"/>
          <text x="350" y="112" textAnchor="middle" fontSize="10" fill="white">State = {}</text>
          <text x="350" y="130" textAnchor="middle" fontSize="10" fill="white">→ Apply Event 1</text>
          <text x="350" y="148" textAnchor="middle" fontSize="10" fill="white">→ Apply Event 2</text>
          <text x="350" y="166" textAnchor="middle" fontSize="10" fill="white">→ Apply Event 3</text>
          <text x="350" y="184" textAnchor="middle" fontSize="10" fill="white">→ Apply Event 4</text>
          <text x="350" y="202" textAnchor="middle" fontSize="10" fontWeight="700" fill="white">= Current State</text>

          <line x1="420" y1="140" x2="490" y2="140" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowReplay2)"/>

          <rect x="490" y="100" width="130" height="80" rx="8" fill="#10b981" stroke="#059669" strokeWidth="2"/>
          <text x="555" y="130" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">State (v=3)</text>
          <text x="555" y="148" textAnchor="middle" fontSize="11" fill="white">Status: Shipped</text>
          <text x="555" y="163" textAnchor="middle" fontSize="11" fill="white">Items: [...]</text>

          <line x1="210" y1="250" x2="280" y2="310" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowReplay3)"/>
          <text x="245" y="285" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f59e0b">replay to t=1</text>

          <rect x="280" y="280" width="130" height="70" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
          <text x="345" y="308" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">State (v=1)</text>
          <text x="345" y="326" textAnchor="middle" fontSize="11" fill="white">Time Travel!</text>

          <defs>
            <marker id="arrowReplay1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
            </marker>
            <marker id="arrowReplay2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#10b981"/>
            </marker>
            <marker id="arrowReplay3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
            </marker>
          </defs>
        </svg>
      ),
      'Projections & Views': (
        <svg width="650" height="380" viewBox="0 0 650 380" style={{ maxWidth: '100%', height: 'auto' }}>
          <rect x="40" y="150" width="180" height="100" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
          <text x="130" y="175" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Event Store</text>
          <text x="130" y="193" textAnchor="middle" fontSize="11" fill="white">Event Stream</text>
          <rect x="55" y="205" width="150" height="35" rx="6" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1"/>
          <text x="130" y="220" textAnchor="middle" fontSize="10" fill="white">OrderCreated</text>
          <text x="130" y="234" textAnchor="middle" fontSize="10" fill="white">ItemAdded, OrderPaid...</text>

          <line x1="220" y1="170" x2="290" y2="100" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowProj1)"/>
          <text x="255" y="130" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3b82f6">project</text>

          <line x1="220" y1="200" x2="290" y2="200" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#arrowProj2)"/>
          <text x="255" y="190" textAnchor="middle" fontSize="11" fontWeight="700" fill="#8b5cf6">project</text>

          <line x1="220" y1="230" x2="290" y2="300" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowProj3)"/>
          <text x="255" y="270" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f59e0b">project</text>

          <rect x="290" y="60" width="150" height="80" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="365" y="88" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Order Summary</text>
          <text x="365" y="106" textAnchor="middle" fontSize="11" fill="white">PostgreSQL</text>
          <text x="365" y="121" textAnchor="middle" fontSize="10" fill="white">For dashboards</text>

          <rect x="290" y="160" width="150" height="80" rx="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
          <text x="365" y="188" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Search Index</text>
          <text x="365" y="206" textAnchor="middle" fontSize="11" fill="white">Elasticsearch</text>
          <text x="365" y="221" textAnchor="middle" fontSize="10" fill="white">For text search</text>

          <rect x="290" y="260" width="150" height="80" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
          <text x="365" y="288" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Analytics View</text>
          <text x="365" y="306" textAnchor="middle" fontSize="11" fill="white">MongoDB</text>
          <text x="365" y="321" textAnchor="middle" fontSize="10" fill="white">For reporting</text>

          <rect x="470" y="160" width="150" height="80" rx="8" fill="#14b8a6" stroke="#0d9488" strokeWidth="2"/>
          <text x="545" y="188" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Real-Time View</text>
          <text x="545" y="206" textAnchor="middle" fontSize="11" fill="white">Redis Cache</text>
          <text x="545" y="221" textAnchor="middle" fontSize="10" fill="white">For fast reads</text>

          <line x1="440" y1="200" x2="470" y2="200" stroke="#14b8a6" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowProj4)"/>

          <defs>
            <marker id="arrowProj1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
            </marker>
            <marker id="arrowProj2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6"/>
            </marker>
            <marker id="arrowProj3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
            </marker>
            <marker id="arrowProj4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#14b8a6"/>
            </marker>
          </defs>
        </svg>
      )
    },
    'Sidecar Pattern': {
      'Co-Located Helper': (
        <svg width="650" height="350" viewBox="0 0 650 350" style={{ maxWidth: '100%', height: 'auto' }}>
          <rect x="80" y="60" width="480" height="240" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="10,5"/>
          <text x="320" y="40" textAnchor="middle" fontSize="14" fontWeight="700" fill="#64748b">Kubernetes Pod / Container Group</text>

          <rect x="120" y="100" width="180" height="160" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="3"/>
          <text x="210" y="130" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Main Application</text>
          <text x="210" y="152" textAnchor="middle" fontSize="12" fill="white">Business Logic</text>
          <text x="210" y="170" textAnchor="middle" fontSize="12" fill="white">Core Service</text>
          <text x="210" y="188" textAnchor="middle" fontSize="12" fill="white">Port: 8080</text>
          <rect x="135" y="205" width="150" height="45" rx="6" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1"/>
          <text x="210" y="225" textAnchor="middle" fontSize="11" fill="white">Java/Python/Node</text>
          <text x="210" y="241" textAnchor="middle" fontSize="11" fill="white">Your Code</text>

          <rect x="340" y="100" width="180" height="160" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
          <text x="430" y="130" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Sidecar Proxy</text>
          <text x="430" y="152" textAnchor="middle" fontSize="12" fill="white">• Logging Agent</text>
          <text x="430" y="170" textAnchor="middle" fontSize="12" fill="white">• Metrics Collector</text>
          <text x="430" y="188" textAnchor="middle" fontSize="12" fill="white">• Security Proxy</text>
          <rect x="355" y="205" width="150" height="45" rx="6" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1"/>
          <text x="430" y="225" textAnchor="middle" fontSize="11" fill="white">Envoy/Linkerd</text>
          <text x="430" y="241" textAnchor="middle" fontSize="11" fill="white">Service Mesh</text>

          <line x1="300" y1="180" x2="340" y2="180" stroke="#3b82f6" strokeWidth="3" strokeDasharray="5,5"/>
          <text x="320" y="170" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3b82f6">localhost</text>

          <text x="320" y="325" textAnchor="middle" fontSize="12" fontWeight="700" fill="#64748b">Shared: Network, Storage, Lifecycle</text>

          <defs>
            <marker id="arrowSide1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
            </marker>
          </defs>
        </svg>
      ),
      'Communication Patterns': (
        <svg width="650" height="380" viewBox="0 0 650 380" style={{ maxWidth: '100%', height: 'auto' }}>
          <rect x="30" y="140" width="100" height="70" rx="8" fill="#ef4444" stroke="#dc2626" strokeWidth="2"/>
          <text x="80" y="165" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">External</text>
          <text x="80" y="183" textAnchor="middle" fontSize="11" fill="white">Client</text>
          <text x="80" y="198" textAnchor="middle" fontSize="10" fill="white">10.0.1.100</text>

          <line x1="130" y1="175" x2="200" y2="175" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowComm1)"/>
          <text x="165" y="165" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ef4444">request</text>

          <rect x="200" y="130" width="140" height="90" rx="8" fill="#10b981" stroke="#059669" strokeWidth="3"/>
          <text x="270" y="160" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">Sidecar</text>
          <text x="270" y="178" textAnchor="middle" fontSize="11" fill="white">Proxy/Filter</text>
          <text x="270" y="194" textAnchor="middle" fontSize="11" fill="white">TLS Termination</text>
          <text x="270" y="210" textAnchor="middle" fontSize="11" fill="white">Auth Check</text>

          <line x1="340" y1="175" x2="410" y2="175" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowComm2)"/>
          <text x="375" y="165" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3b82f6">localhost</text>

          <rect x="410" y="130" width="140" height="90" rx="8" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
          <text x="480" y="160" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">Main App</text>
          <text x="480" y="178" textAnchor="middle" fontSize="11" fill="white">Business Logic</text>
          <text x="480" y="194" textAnchor="middle" fontSize="11" fill="white">Port: 8080</text>

          <line x1="480" y1="220" x2="480" y2="280" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowComm3)"/>
          <text x="520" y="255" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f59e0b">outbound</text>

          <rect x="410" y="280" width="140" height="70" rx="8" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
          <text x="480" y="308" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">External API</text>
          <text x="480" y="326" textAnchor="middle" fontSize="11" fill="white">Remote Service</text>

          <path d="M 340 190 Q 375 235 410 280" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowComm4)"/>
          <text x="330" y="240" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f59e0b">intercept</text>

          <defs>
            <marker id="arrowComm1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#ef4444"/>
            </marker>
            <marker id="arrowComm2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6"/>
            </marker>
            <marker id="arrowComm3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
            </marker>
            <marker id="arrowComm4" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b"/>
            </marker>
          </defs>
        </svg>
      )
    }
  }

  return diagrams[patternName]?.[featureName] || null
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

        {/* Architectural layer backgrounds */}
        <g opacity="0.1">
          <rect x="50" y="180" width="420" height="200" rx="16" fill="#6366f1" />
          <text x="260" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#4f46e5" opacity="0.6">
            API Layer
          </text>

          <rect x="550" y="80" width="420" height="280" rx="16" fill="#6366f1" />
          <text x="760" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="#4f46e5" opacity="0.6">
            Resilience Layer
          </text>

          <rect x="50" y="400" width="420" height="200" rx="16" fill="#6366f1" />
          <text x="260" y="430" textAnchor="middle" fontSize="14" fontWeight="700" fill="#4f46e5" opacity="0.6">
            Configuration
          </text>

          <rect x="550" y="480" width="420" height="180" rx="16" fill="#6366f1" />
          <text x="760" y="510" textAnchor="middle" fontSize="14" fontWeight="700" fill="#4f46e5" opacity="0.6">
            Transaction Layer
          </text>

          <rect x="1050" y="180" width="420" height="280" rx="16" fill="#6366f1" />
          <text x="1260" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#4f46e5" opacity="0.6">
            Data Layer
          </text>

          <rect x="1050" y="480" width="420" height="180" rx="16" fill="#6366f1" />
          <text x="1260" y="510" textAnchor="middle" fontSize="14" fontWeight="700" fill="#4f46e5" opacity="0.6">
            Sidecar Pattern
          </text>
        </g>

        {/* Connecting lines with arrows and labels */}
        <g fill="none">
          <line x1="430" y1="300" x2="580" y2="200" stroke="#1e293b" strokeWidth="3" strokeOpacity="0.8" markerEnd="url(#arrowSolid)"/>
          <text x="505" y="240" fontSize="11" fontWeight="600" fill="#1e293b" textAnchor="middle">
            routes
          </text>

          <line x1="430" y1="300" x2="580" y2="320" stroke="#1e293b" strokeWidth="3" strokeOpacity="0.8" markerEnd="url(#arrowSolid)"/>
          <text x="505" y="320" fontSize="11" fontWeight="600" fill="#1e293b" textAnchor="middle">
            protects
          </text>

          <line x1="930" y1="200" x2="1080" y2="300" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="1005" y="240" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            uses
          </text>

          <line x1="930" y1="320" x2="1080" y2="400" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="1005" y="370" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            stores
          </text>

          <line x1="430" y1="500" x2="580" y2="560" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="505" y="540" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            configures
          </text>

          <line x1="930" y1="560" x2="1080" y2="580" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="1005" y="580" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            proxies
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
                +{component.details.length - 3} more features...
              </text>
            )}
          </g>
        )})}
      </svg>
    </div>
  )
}

function MicroservicePatterns({ onBack }) {
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [focusedComponentIndex, setFocusedComponentIndex] = useState(0)

  const components = [
    {
      id: 'api-gateway', x: 80, y: 240, width: 350, height: 160,
      icon: '🚪', title: 'API Gateway Pattern', color: 'indigo',
      details: [
        { name: 'Single Entry Point', explanation: 'Unified entry point for all clients. Routes requests to appropriate microservices. Simplifies client code. Reduces coupling between clients and services. Protocol translation. Client doesn\'t need to know service topology.' },
        { name: 'Request Routing', explanation: 'Routes based on URL, headers, method. Path-based routing: /users/* to user service. Load balancing across service instances. Version-based routing. A/B testing. Canary deployments. Dynamic routing rules.' },
        { name: 'Authentication & Authorization', explanation: 'Centralized security enforcement. JWT validation. OAuth2/OIDC integration. API key management. Rate limiting per client. Security policies. Single place for auth logic. Reduces duplication across services.' },
        { name: 'Request Aggregation', explanation: 'Combine multiple service calls into single response. Reduces client-side complexity. Parallel service invocation. Data composition. Backend for Frontend (BFF) pattern. Mobile-specific aggregations. Optimized for client needs.' },
        { name: 'Cross-Cutting Concerns', explanation: 'Logging, monitoring, metrics collection. Distributed tracing correlation IDs. Request/response transformation. Caching. Compression. SSL termination. Error handling. Protocol translation (REST to gRPC).' },
        { name: 'Technologies', explanation: 'Kong, NGINX, AWS API Gateway, Azure API Management, Spring Cloud Gateway, Zuul. Service mesh integration (Istio, Linkerd). Cloud-native gateways. Programmable gateways. Open source and commercial options.' }
      ],
      description: 'Single entry point for clients that routes requests, handles cross-cutting concerns, and aggregates responses.'
    },
    {
      id: 'circuit-breaker', x: 580, y: 140, width: 350, height: 160,
      icon: '🔌', title: 'Circuit Breaker Pattern', color: 'indigo',
      details: [
        { name: 'Failure Detection', explanation: 'Monitors service call failures. Tracks success/failure rates. Timeout detection. Exceptions monitoring. Configurable thresholds. Prevents cascading failures. Fast failure instead of waiting. Protects downstream services.' },
        { name: 'Circuit States', explanation: 'Closed: normal operation, requests pass through. Open: threshold exceeded, fail fast without calling service. Half-Open: test if service recovered. Automatic state transitions. Configurable timeout before testing recovery.' },
        { name: 'Fallback Mechanisms', explanation: 'Default response when circuit open. Cached data. Degraded functionality. Static content. Queuing for later processing. Graceful degradation. User-friendly error messages. Maintain partial system functionality.' },
        { name: 'Health Checks', explanation: 'Periodic health checks in half-open state. Successful calls close circuit. Failed calls reopen circuit. Configurable probe frequency. Active vs passive health checks. Service discovery integration. Automatic recovery.' },
        { name: 'Metrics & Monitoring', explanation: 'Track circuit state changes. Failure rates. Response times. Recovery metrics. Alerting on circuit open. Dashboard visibility. Identify problem services quickly. Historical data for analysis.' },
        { name: 'Implementation', explanation: 'Netflix Hystrix (deprecated but influential). Resilience4j (modern replacement). Spring Cloud Circuit Breaker abstraction. Istio/Envoy service mesh. Polly (.NET). Configuration per service. Annotations or programmatic.' }
      ],
      description: 'Prevents cascading failures by detecting faults and stopping calls to failing services until recovery.'
    },
    {
      id: 'service-discovery', x: 580, y: 340, width: 350, height: 160,
      icon: '🔍', title: 'Service Discovery Pattern', color: 'indigo',
      details: [
        { name: 'Service Registry', explanation: 'Centralized database of service instances. Service location information: host, port, protocol. Metadata tags. Health status. Dynamic inventory of running services. Services register on startup. Consul, Eureka, etcd, ZooKeeper.' },
        { name: 'Service Registration', explanation: 'Self-registration: service registers itself. Third-party registration: platform registers service. Heartbeats to maintain registration. Deregistration on shutdown. Automatic cleanup of dead instances. Metadata updates. Health check endpoints.' },
        { name: 'Client-Side Discovery', explanation: 'Client queries service registry. Client selects instance (load balancing). Direct communication to service. Netflix Eureka pattern. More network hops. Client-side load balancing. Ribbon, Spring Cloud LoadBalancer. Smart clients.' },
        { name: 'Server-Side Discovery', explanation: 'Client calls load balancer/router. Load balancer queries registry. Load balancer routes to service. AWS ELB, NGINX. Simpler clients. Centralized load balancing. Additional network hop. Better for diverse clients.' },
        { name: 'Health Checks', explanation: 'Service health monitoring. Active checks by registry. Passive health monitoring. TTL-based registration. Multiple health indicators. Graceful shutdown. Only route to healthy instances. Remove unhealthy from rotation.' },
        { name: 'Service Mesh Integration', explanation: 'Istio, Linkerd handle discovery transparently. Sidecar proxies. Automatic service registration. Traffic management. No application code changes. Platform-level discovery. Cloud-native approach. Kubernetes service discovery.' }
      ],
      description: 'Enables automatic detection of service instances through dynamic registry for location transparency.'
    },
    {
      id: 'config-server', x: 80, y: 440, width: 350, height: 160,
      icon: '⚙️', title: 'Config Server Pattern', color: 'indigo',
      details: [
        { name: 'Externalized Configuration', explanation: 'Configuration outside application code. Environment-specific properties. No rebuilding for config changes. Version controlled configuration. Centralized management. Application, service, environment-specific configs. Separation of concerns.' },
        { name: 'Configuration Storage', explanation: 'Git repository backend (Spring Cloud Config). Database storage. Consul KV store. etcd. AWS Parameter Store. Azure App Configuration. Vault for secrets. Version history. Rollback capability. Audit trail.' },
        { name: 'Dynamic Refresh', explanation: 'Update config without restart. Push updates via webhook. Pull-based periodic refresh. @RefreshScope in Spring. Feature flags. A/B testing configurations. Gradual rollout of changes. Hot reloading properties.' },
        { name: 'Environment Profiles', explanation: 'Different configs for dev, test, prod. Profile-specific property files. Inheritance and overrides. Common base configuration. Environment-specific secrets. Consistency across environments. Reduced configuration errors.' },
        { name: 'Encryption & Secrets', explanation: 'Encrypt sensitive properties. Integration with HashiCorp Vault. AWS KMS. Azure Key Vault. Decrypt on service startup. Separate secret management. Never commit secrets to git. Rotation policies. Audit access.' },
        { name: 'High Availability', explanation: 'Cluster config servers. Caching in services. Graceful degradation if config server down. Fast fail for critical configs. Service starts with cached/default config. Retry mechanisms. Multiple config sources.' }
      ],
      description: 'Centralized external configuration management for microservices across all environments.'
    },
    {
      id: 'saga-pattern', x: 580, y: 540, width: 350, height: 160,
      icon: '🔄', title: 'Saga Pattern', color: 'indigo',
      details: [
        { name: 'Distributed Transaction', explanation: 'Sequence of local transactions across services. No two-phase commit. Eventual consistency. Each service updates own database. Publishes events or sends commands. Long-running business processes. Order, payment, inventory, shipping coordination.' },
        { name: 'Orchestration-Based', explanation: 'Central orchestrator coordinates saga. Saga Execution Coordinator (SEC). Defines saga flow. Sends commands to participants. Handles responses. State machine for process. Easier to understand and debug. Single point of coordination.' },
        { name: 'Choreography-Based', explanation: 'Decentralized coordination via events. Each service subscribes to events and publishes new events. No central coordinator. Event-driven architecture. More loosely coupled. Harder to visualize flow. No single point of failure. Event sourcing integration.' },
        { name: 'Compensating Transactions', explanation: 'Semantic undo for completed steps. Not ACID rollback. Business logic compensation. RefundPayment for ChargePayment. CancelReservation for ReserveInventory. Idempotent compensation. May not restore exact previous state. Best-effort rollback.' },
        { name: 'Failure Handling', explanation: 'Backward recovery: compensate all completed steps. Forward recovery: retry until success. Timeout handling. Manual intervention for unrecoverable errors. Dead letter queues. Saga log for tracking state. Alerting and monitoring. Correlation IDs.' },
        { name: 'Implementation Considerations', explanation: 'Idempotency of operations. Duplicate message handling. Saga state persistence. Exactly-once semantics. Timeout configuration. Monitoring saga execution. Testing strategies. Frameworks: Axon, Eventuate, Camunda. Message infrastructure.' }
      ],
      description: 'Manages distributed transactions across microservices using sequence of local transactions with compensations.'
    },
    {
      id: 'cqrs-pattern', x: 1080, y: 240, width: 350, height: 160,
      icon: '📊', title: 'CQRS Pattern', color: 'indigo',
      details: [
        { name: 'Separation of Concerns', explanation: 'Commands: change state, no return value. Queries: read data, no state change. Different models for read and write. Separate databases possible. Independent scaling. Optimized data structures for each. Clear intent in code.' },
        { name: 'Command Model', explanation: 'Handles state changes. Domain-driven design aggregates. Business logic and validation. Normalized schema. ACID transactions. Publishes domain events. Optimized for writes. Ensures consistency and invariants. Single source of truth.' },
        { name: 'Query Model', explanation: 'Optimized for reads. Denormalized views. Eventually consistent. Multiple specialized read models. No business logic. Materialized views. Different storage technology (NoSQL, search engines). Fast queries. Cache-friendly.' },
        { name: 'Event-Driven Sync', explanation: 'Command side publishes events. Query side subscribes and updates read models. Message queue or event stream (Kafka). Asynchronous processing. Eventual consistency. Multiple subscribers possible. Replay events to rebuild views.' },
        { name: 'Scalability Benefits', explanation: 'Scale reads and writes independently. Most systems are read-heavy. Read replicas of query models. Write model can be highly consistent. Read models can sacrifice consistency for speed. Geographic distribution of read models.' },
        { name: 'Use Cases & Trade-offs', explanation: 'Complex domains with different read/write patterns. High read volume. Collaborative systems. Event sourcing synergy. Trade-offs: increased complexity, eventual consistency, duplicate data. Not needed for simple CRUD. Consider carefully.' }
      ],
      description: 'Separates read and write operations into distinct models for independent optimization and scaling.'
    },
    {
      id: 'event-sourcing', x: 1080, y: 440, width: 350, height: 160,
      icon: '📜', title: 'Event Sourcing Pattern', color: 'indigo',
      details: [
        { name: 'Event Store', explanation: 'Append-only log of domain events. Events are immutable facts. Complete history of all changes. Event store is database. Never update/delete events. Only append new events. OrderCreated, ItemAdded, OrderShipped. Current state derived from events.' },
        { name: 'Event Replay', explanation: 'Rebuild aggregate state by replaying events. Load events for aggregate. Apply each event in sequence. Compute current state. Time travel to any point. Debugging capabilities. Create new projections. What-if analysis possible.' },
        { name: 'Snapshots', explanation: 'Performance optimization for long event streams. Periodic state captures. Load snapshot then apply subsequent events. Configurable snapshot frequency. Reduce replay time. Trade-off: storage vs performance. Automatic snapshot creation.' },
        { name: 'Event Versioning', explanation: 'Events schema evolves over time. Upcasting old events to new versions. Multiple versions coexist. Event transformers. Weak schema flexibility. Migration strategies. Backward compatibility. Versioned event types. Tolerant readers.' },
        { name: 'Projections & Views', explanation: 'Derive read models from events. Multiple projections from same events. Real-time or batch processing. Materialized views. Subscribe to event stream. Update projections. Different databases per view. Specialized for queries.' },
        { name: 'Benefits & Challenges', explanation: 'Benefits: audit trail, temporal queries, debugging, event-driven integration. Challenges: complexity, eventual consistency, query difficulty, steep learning curve. Event store technology: EventStore, Kafka, custom. Not for all domains.' }
      ],
      description: 'Stores all changes as sequence of immutable events rather than current state for complete audit trail.'
    },
    {
      id: 'sidecar-pattern', x: 1080, y: 640, width: 350, height: 140,
      icon: '🛸', title: 'Sidecar Pattern', color: 'indigo',
      details: [
        { name: 'Co-Located Helper', explanation: 'Helper component deployed alongside main application. Separate process but same host/pod. Shares resources with main app. Provides supporting features. Decouples cross-cutting concerns. Polyglot microservices support. Service mesh foundation.' },
        { name: 'Common Use Cases', explanation: 'Service mesh proxies (Envoy, Linkerd). Logging and monitoring agents. Configuration watchers. Security enforcers. Circuit breakers. Service discovery clients. Protocol translation. TLS termination. Observability instrumentation.' },
        { name: 'Communication Patterns', explanation: 'Localhost communication between app and sidecar. Fast IPC. Sidecar handles network calls. Transparent to application. Intercepts inbound/outbound traffic. Proxy pattern. Application unaware of sidecar functionality. Protocol bridging.' },
        { name: 'Deployment', explanation: 'Kubernetes sidecar containers. Docker Compose multi-container. Same lifecycle as main app. Started and stopped together. Shared volumes. Network namespace sharing. Resource allocation. Health checks for both containers.' },
        { name: 'Benefits', explanation: 'Technology agnostic (any language). Reusable across services. Independent versioning. Reduces application complexity. Centralized configuration. Easy updates to cross-cutting concerns. Consistent behavior across services. Separation of concerns.' }
      ],
      description: 'Helper component deployed alongside application providing supporting features like logging, monitoring, and proxying.'
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
    console.log('MicroservicePatterns: Setting up keyboard listener, selectedConcept:', selectedConcept)

    const handleKeyDown = (e) => {
      const currentSelectedConcept = selectedConceptRef.current
      console.log('MicroservicePatterns KeyDown:', e.key, 'selectedConcept:', selectedConcept)

      // Handle Escape to close modal or go back to menu
      if (e.key === 'Escape') {
        if (currentSelectedConcept) {
          console.log('MicroservicePatterns: Closing modal')
          e.preventDefault()
          e.stopImmediatePropagation()
          setSelectedConcept(null)
          return
        }
        console.log('MicroservicePatterns: No modal open, returning')
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
      border: '3px solid rgba(99, 102, 241, 0.4)'
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
          Microservice Design Patterns
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <div style={{
        backgroundColor: 'rgba(99, 102, 241, 0.05)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(99, 102, 241, 0.3)',
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
          Microservice Design Patterns: API Gateway for unified entry, Circuit Breaker for resilience,
          Service Discovery for dynamic location, Config Server for centralized configuration,
          Saga for distributed transactions, CQRS for read/write separation, Event Sourcing, and Sidecar pattern.
        </p>
      </div>

      <ModernDiagram
        components={components}
        onComponentClick={handleComponentClick}
        title="Essential Microservice Design Patterns"
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
            border: '3px solid rgba(99, 102, 241, 0.4)'
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
              backgroundColor: 'rgba(99, 102, 241, 0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '2px solid rgba(99, 102, 241, 0.2)',
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
                  Key Features
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
                          ? 'rgba(99, 102, 241, 0.15)'
                          : 'rgba(99, 102, 241, 0.1)',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: selectedConcept?.name === detail.name
                          ? '2px solid rgba(99, 102, 241, 0.4)'
                          : '2px solid rgba(99, 102, 241, 0.2)',
                        fontSize: '0.95rem',
                        fontWeight: '500',
                        color: selectedConcept?.name === detail.name
                          ? '#4f46e5'
                          : '#3730a3',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        transform: 'scale(1)'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedConcept?.name !== detail.name) {
                          e.target.style.backgroundColor = 'rgba(99, 102, 241, 0.15)'
                          e.target.style.transform = 'scale(1.02)'
                          e.target.style.borderColor = 'rgba(99, 102, 241, 0.4)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedConcept?.name !== detail.name) {
                          e.target.style.backgroundColor = 'rgba(99, 102, 241, 0.1)'
                          e.target.style.transform = 'scale(1)'
                          e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)'
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
                    backgroundColor: 'rgba(99, 102, 241, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(99, 102, 241, 0.2)',
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

                  {DetailDiagram({ patternName: selectedComponent.title, featureName: selectedConcept.name }) && (
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
                          How It Works
                        </h4>
                        <DetailDiagram patternName={selectedComponent.title} featureName={selectedConcept.name} />
                      </div>
                    </div>
                  )}

                  <div style={{
                    backgroundColor: 'rgba(59, 130, 246, 0.05)',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(59, 130, 246, 0.2)'
                  }}>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: '#1e40af',
                      margin: '0 0 0.75rem 0'
                    }}>
                      💡 Key Takeaway
                    </h4>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#1e40af',
                      fontWeight: '500',
                      margin: 0,
                      lineHeight: '1.5',
                      fontStyle: 'italic'
                    }}>
                      {selectedConcept.name} is a critical microservice pattern that enables resilient, scalable, and maintainable distributed systems.
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

export default MicroservicePatterns

import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import CompletionCheckbox from '../../components/CompletionCheckbox'

// SVG Diagram: High-Level Architecture
const FoodDeliveryArchitectureDiagram = () => (
  <svg viewBox="0 0 900 500" className="w-full h-auto" style={{ maxWidth: '900px', margin: '0 auto', display: 'block' }}>
    <defs>
      <linearGradient id="archClientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="archServiceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#b91c1c" />
      </linearGradient>
      <linearGradient id="archDbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7c3aed" />
        <stop offset="100%" stopColor="#6d28d9" />
      </linearGradient>
      <linearGradient id="archGatewayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0891b2" />
        <stop offset="100%" stopColor="#0e7490" />
      </linearGradient>
      <filter id="archShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Background */}
    <rect width="900" height="500" fill="#1f2937" rx="10" />

    {/* Title */}
    <text x="450" y="35" textAnchor="middle" fill="#f97316" fontSize="20" fontWeight="bold">Food Delivery Platform Architecture</text>

    {/* Client Applications Layer */}
    <g filter="url(#archShadow)">
      <rect x="50" y="60" width="180" height="70" rx="10" fill="url(#archClientGrad)" />
      <text x="140" y="90" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Customer App</text>
      <text x="140" y="110" textAnchor="middle" fill="#fed7aa" fontSize="11">iOS / Android</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="260" y="60" width="180" height="70" rx="10" fill="url(#archClientGrad)" />
      <text x="350" y="90" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Restaurant App</text>
      <text x="350" y="110" textAnchor="middle" fill="#fed7aa" fontSize="11">Dashboard / Tablet</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="470" y="60" width="180" height="70" rx="10" fill="url(#archClientGrad)" />
      <text x="560" y="90" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Driver App</text>
      <text x="560" y="110" textAnchor="middle" fill="#fed7aa" fontSize="11">iOS / Android</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="680" y="60" width="180" height="70" rx="10" fill="url(#archClientGrad)" />
      <text x="770" y="90" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Admin Portal</text>
      <text x="770" y="110" textAnchor="middle" fill="#fed7aa" fontSize="11">Web Dashboard</text>
    </g>

    {/* Arrows from clients to gateway */}
    <path d="M140 130 L140 155 L450 155 L450 170" stroke="#9ca3af" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
    <path d="M350 130 L350 155 L450 155" stroke="#9ca3af" strokeWidth="2" fill="none" />
    <path d="M560 130 L560 155 L450 155" stroke="#9ca3af" strokeWidth="2" fill="none" />
    <path d="M770 130 L770 155 L450 155" stroke="#9ca3af" strokeWidth="2" fill="none" />

    {/* Arrow marker */}
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
      </marker>
    </defs>

    {/* API Gateway */}
    <g filter="url(#archShadow)">
      <rect x="300" y="170" width="300" height="50" rx="8" fill="url(#archGatewayGrad)" />
      <text x="450" y="200" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">API Gateway (Load Balancer + Auth)</text>
    </g>

    {/* Arrow from gateway to services */}
    <path d="M450 220 L450 250" stroke="#9ca3af" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />

    {/* Microservices Layer */}
    <rect x="40" y="250" width="820" height="120" rx="10" fill="#374151" stroke="#4b5563" strokeWidth="2" />
    <text x="450" y="275" textAnchor="middle" fill="#d1d5db" fontSize="12" fontWeight="bold">MICROSERVICES LAYER</text>

    {/* Services */}
    <g filter="url(#archShadow)">
      <rect x="55" y="290" width="110" height="60" rx="6" fill="url(#archServiceGrad)" />
      <text x="110" y="315" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">User Service</text>
      <text x="110" y="335" textAnchor="middle" fill="#fca5a5" fontSize="9">Auth + Profiles</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="175" y="290" width="110" height="60" rx="6" fill="url(#archServiceGrad)" />
      <text x="230" y="315" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Order Service</text>
      <text x="230" y="335" textAnchor="middle" fill="#fca5a5" fontSize="9">CRUD + Status</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="295" y="290" width="110" height="60" rx="6" fill="url(#archServiceGrad)" />
      <text x="350" y="315" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Restaurant Svc</text>
      <text x="350" y="335" textAnchor="middle" fill="#fca5a5" fontSize="9">Menus + Hours</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="415" y="290" width="110" height="60" rx="6" fill="url(#archServiceGrad)" />
      <text x="470" y="315" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Driver Service</text>
      <text x="470" y="335" textAnchor="middle" fill="#fca5a5" fontSize="9">Status + Location</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="535" y="290" width="110" height="60" rx="6" fill="url(#archServiceGrad)" />
      <text x="590" y="315" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Matching Svc</text>
      <text x="590" y="335" textAnchor="middle" fill="#fca5a5" fontSize="9">Order-Driver</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="655" y="290" width="110" height="60" rx="6" fill="url(#archServiceGrad)" />
      <text x="710" y="315" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Payment Svc</text>
      <text x="710" y="335" textAnchor="middle" fill="#fca5a5" fontSize="9">Stripe / Cards</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="775" y="290" width="75" height="60" rx="6" fill="url(#archServiceGrad)" />
      <text x="812" y="315" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Notif Svc</text>
      <text x="812" y="335" textAnchor="middle" fill="#fca5a5" fontSize="9">Push/SMS</text>
    </g>

    {/* Arrow from services to databases */}
    <path d="M450 370 L450 400" stroke="#9ca3af" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />

    {/* Database Layer */}
    <rect x="40" y="400" width="820" height="85" rx="10" fill="#1e1b4b" stroke="#4338ca" strokeWidth="2" />
    <text x="450" y="425" textAnchor="middle" fill="#a5b4fc" fontSize="12" fontWeight="bold">DATA LAYER</text>

    {/* Databases */}
    <g filter="url(#archShadow)">
      <rect x="55" y="440" width="100" height="35" rx="5" fill="url(#archDbGrad)" />
      <text x="105" y="462" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">PostgreSQL</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="165" y="440" width="100" height="35" rx="5" fill="url(#archDbGrad)" />
      <text x="215" y="462" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">MongoDB</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="275" y="440" width="100" height="35" rx="5" fill="url(#archDbGrad)" />
      <text x="325" y="462" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Redis Geo</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="385" y="440" width="100" height="35" rx="5" fill="url(#archDbGrad)" />
      <text x="435" y="462" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Elasticsearch</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="495" y="440" width="100" height="35" rx="5" fill="url(#archDbGrad)" />
      <text x="545" y="462" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Cassandra</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="605" y="440" width="100" height="35" rx="5" fill="url(#archDbGrad)" />
      <text x="655" y="462" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Kafka</text>
    </g>
    <g filter="url(#archShadow)">
      <rect x="715" y="440" width="100" height="35" rx="5" fill="url(#archDbGrad)" />
      <text x="765" y="462" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">S3 / CDN</text>
    </g>
  </svg>
)

// SVG Diagram: Order Flow Lifecycle
const OrderFlowDiagram = () => (
  <svg viewBox="0 0 900 280" className="w-full h-auto" style={{ maxWidth: '900px', margin: '0 auto', display: 'block' }}>
    <defs>
      <linearGradient id="orderStepGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="orderStepGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
      <linearGradient id="orderStepGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
      <filter id="orderShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3" />
      </filter>
      <marker id="orderArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
      </marker>
    </defs>

    {/* Background */}
    <rect width="900" height="280" fill="#1f2937" rx="10" />

    {/* Title */}
    <text x="450" y="30" textAnchor="middle" fill="#f97316" fontSize="18" fontWeight="bold">Order Lifecycle Flow</text>

    {/* Step 1: Browse */}
    <g filter="url(#orderShadow)">
      <circle cx="80" cy="120" r="40" fill="url(#orderStepGrad1)" />
      <text x="80" y="115" textAnchor="middle" fill="white" fontSize="22">1</text>
      <text x="80" y="135" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Browse</text>
    </g>
    <text x="80" y="180" textAnchor="middle" fill="#9ca3af" fontSize="10">Customer finds</text>
    <text x="80" y="195" textAnchor="middle" fill="#9ca3af" fontSize="10">restaurant</text>

    {/* Arrow 1-2 */}
    <path d="M125 120 L175 120" stroke="#f97316" strokeWidth="3" fill="none" markerEnd="url(#orderArrow)" />

    {/* Step 2: Order */}
    <g filter="url(#orderShadow)">
      <circle cx="220" cy="120" r="40" fill="url(#orderStepGrad1)" />
      <text x="220" y="115" textAnchor="middle" fill="white" fontSize="22">2</text>
      <text x="220" y="135" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Order</text>
    </g>
    <text x="220" y="180" textAnchor="middle" fill="#9ca3af" fontSize="10">Select items,</text>
    <text x="220" y="195" textAnchor="middle" fill="#9ca3af" fontSize="10">add to cart</text>

    {/* Arrow 2-3 */}
    <path d="M265 120 L315 120" stroke="#f97316" strokeWidth="3" fill="none" markerEnd="url(#orderArrow)" />

    {/* Step 3: Payment */}
    <g filter="url(#orderShadow)">
      <circle cx="360" cy="120" r="40" fill="url(#orderStepGrad2)" />
      <text x="360" y="115" textAnchor="middle" fill="white" fontSize="22">3</text>
      <text x="360" y="135" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Payment</text>
    </g>
    <text x="360" y="180" textAnchor="middle" fill="#9ca3af" fontSize="10">Process payment</text>
    <text x="360" y="195" textAnchor="middle" fill="#9ca3af" fontSize="10">via Stripe</text>

    {/* Arrow 3-4 */}
    <path d="M405 120 L455 120" stroke="#f97316" strokeWidth="3" fill="none" markerEnd="url(#orderArrow)" />

    {/* Step 4: Restaurant Prep */}
    <g filter="url(#orderShadow)">
      <circle cx="500" cy="120" r="40" fill="url(#orderStepGrad2)" />
      <text x="500" y="115" textAnchor="middle" fill="white" fontSize="22">4</text>
      <text x="500" y="135" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Preparing</text>
    </g>
    <text x="500" y="180" textAnchor="middle" fill="#9ca3af" fontSize="10">Restaurant</text>
    <text x="500" y="195" textAnchor="middle" fill="#9ca3af" fontSize="10">prepares food</text>

    {/* Arrow 4-5 */}
    <path d="M545 120 L595 120" stroke="#f97316" strokeWidth="3" fill="none" markerEnd="url(#orderArrow)" />

    {/* Step 5: Driver Pickup */}
    <g filter="url(#orderShadow)">
      <circle cx="640" cy="120" r="40" fill="url(#orderStepGrad3)" />
      <text x="640" y="115" textAnchor="middle" fill="white" fontSize="22">5</text>
      <text x="640" y="135" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Pickup</text>
    </g>
    <text x="640" y="180" textAnchor="middle" fill="#9ca3af" fontSize="10">Driver picks up</text>
    <text x="640" y="195" textAnchor="middle" fill="#9ca3af" fontSize="10">from restaurant</text>

    {/* Arrow 5-6 */}
    <path d="M685 120 L735 120" stroke="#f97316" strokeWidth="3" fill="none" markerEnd="url(#orderArrow)" />

    {/* Step 6: Delivery */}
    <g filter="url(#orderShadow)">
      <circle cx="780" cy="120" r="40" fill="url(#orderStepGrad3)" />
      <text x="780" y="115" textAnchor="middle" fill="white" fontSize="22">6</text>
      <text x="780" y="135" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Delivered</text>
    </g>
    <text x="780" y="180" textAnchor="middle" fill="#9ca3af" fontSize="10">Order arrives</text>
    <text x="780" y="195" textAnchor="middle" fill="#9ca3af" fontSize="10">at customer</text>

    {/* Time indicators */}
    <rect x="50" y="220" width="780" height="40" rx="5" fill="#374151" />
    <text x="80" y="245" textAnchor="middle" fill="#6b7280" fontSize="10">0 min</text>
    <text x="220" y="245" textAnchor="middle" fill="#6b7280" fontSize="10">2-5 min</text>
    <text x="360" y="245" textAnchor="middle" fill="#6b7280" fontSize="10">5-7 min</text>
    <text x="500" y="245" textAnchor="middle" fill="#f97316" fontSize="10" fontWeight="bold">15-25 min</text>
    <text x="640" y="245" textAnchor="middle" fill="#6b7280" fontSize="10">25-30 min</text>
    <text x="780" y="245" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">35-45 min</text>
  </svg>
)

// SVG Diagram: Driver Matching Algorithm
const DriverMatchingDiagram = () => (
  <svg viewBox="0 0 800 450" className="w-full h-auto" style={{ maxWidth: '800px', margin: '0 auto', display: 'block' }}>
    <defs>
      <linearGradient id="matchRestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
      <linearGradient id="matchDriverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
      <linearGradient id="matchRadiusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#f97316" stopOpacity="0.1" />
      </linearGradient>
      <filter id="matchShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3" />
      </filter>
      <marker id="matchArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
      </marker>
    </defs>

    {/* Background */}
    <rect width="800" height="450" fill="#1f2937" rx="10" />

    {/* Title */}
    <text x="400" y="30" textAnchor="middle" fill="#f97316" fontSize="18" fontWeight="bold">Driver Matching Algorithm</text>

    {/* Map Area */}
    <rect x="30" y="50" width="350" height="300" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="2" />
    <text x="205" y="75" textAnchor="middle" fill="#9ca3af" fontSize="12" fontWeight="bold">Geospatial View</text>

    {/* Search Radius Circle */}
    <circle cx="180" cy="200" r="100" fill="url(#matchRadiusGrad)" stroke="#f97316" strokeWidth="2" strokeDasharray="5,5" />
    <text x="180" y="310" textAnchor="middle" fill="#f97316" fontSize="10">5km radius</text>

    {/* Restaurant (center) */}
    <g filter="url(#matchShadow)">
      <rect x="160" y="180" width="40" height="40" rx="5" fill="url(#matchRestGrad)" />
      <text x="180" y="205" textAnchor="middle" fill="white" fontSize="18">R</text>
    </g>

    {/* Drivers */}
    <g filter="url(#matchShadow)">
      <circle cx="120" cy="150" r="15" fill="url(#matchDriverGrad)" />
      <text x="120" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">D1</text>
      <text x="120" y="130" textAnchor="middle" fill="#22c55e" fontSize="9">1.2km</text>
    </g>
    <g filter="url(#matchShadow)">
      <circle cx="250" cy="170" r="15" fill="url(#matchDriverGrad)" />
      <text x="250" y="175" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">D2</text>
      <text x="250" y="150" textAnchor="middle" fill="#22c55e" fontSize="9">2.1km</text>
    </g>
    <g filter="url(#matchShadow)">
      <circle cx="200" cy="260" r="15" fill="url(#matchDriverGrad)" />
      <text x="200" y="265" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">D3</text>
      <text x="200" y="285" textAnchor="middle" fill="#22c55e" fontSize="9">2.8km</text>
    </g>
    <g filter="url(#matchShadow)">
      <circle cx="100" cy="230" r="15" fill="url(#matchDriverGrad)" />
      <text x="100" y="235" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">D4</text>
      <text x="100" y="255" textAnchor="middle" fill="#22c55e" fontSize="9">3.5km</text>
    </g>
    <g filter="url(#matchShadow)">
      <circle cx="280" cy="240" r="15" fill="#6b7280" />
      <text x="280" y="245" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">D5</text>
      <text x="280" y="265" textAnchor="middle" fill="#6b7280" fontSize="9">6.2km</text>
    </g>

    {/* Dashed lines from drivers to restaurant */}
    <line x1="120" y1="150" x2="160" y2="185" stroke="#22c55e" strokeWidth="1" strokeDasharray="3,3" />
    <line x1="250" y1="170" x2="200" y2="195" stroke="#22c55e" strokeWidth="1" strokeDasharray="3,3" />
    <line x1="200" y1="260" x2="190" y2="220" stroke="#22c55e" strokeWidth="1" strokeDasharray="3,3" />
    <line x1="100" y1="230" x2="160" y2="210" stroke="#22c55e" strokeWidth="1" strokeDasharray="3,3" />

    {/* Scoring Panel */}
    <rect x="410" y="50" width="360" height="300" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="2" />
    <text x="590" y="75" textAnchor="middle" fill="#9ca3af" fontSize="12" fontWeight="bold">Match Scoring</text>

    {/* Scoring Formula */}
    <rect x="430" y="90" width="320" height="50" rx="5" fill="#1f2937" />
    <text x="590" y="115" textAnchor="middle" fill="#f97316" fontSize="11" fontWeight="bold">Score = 0.4(Distance) + 0.3(ETA) + 0.2(Rating) + 0.1(Accept%)</text>

    {/* Driver Scores */}
    <rect x="430" y="150" width="320" height="40" rx="5" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" strokeWidth="1" />
    <text x="445" y="175" fill="white" fontSize="12" fontWeight="bold">D1:</text>
    <text x="475" y="175" fill="#22c55e" fontSize="11">1.2km | 4min | 4.9 star | 92% = 82.3</text>
    <rect x="680" y="158" width="60" height="24" rx="4" fill="#22c55e" />
    <text x="710" y="175" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">BEST</text>

    <rect x="430" y="200" width="320" height="40" rx="5" fill="#1f2937" />
    <text x="445" y="225" fill="white" fontSize="12" fontWeight="bold">D2:</text>
    <text x="475" y="225" fill="#9ca3af" fontSize="11">2.1km | 7min | 4.7 star | 88% = 71.5</text>

    <rect x="430" y="250" width="320" height="40" rx="5" fill="#1f2937" />
    <text x="445" y="275" fill="white" fontSize="12" fontWeight="bold">D3:</text>
    <text x="475" y="275" fill="#9ca3af" fontSize="11">2.8km | 9min | 4.5 star | 85% = 65.2</text>

    <rect x="430" y="300" width="320" height="40" rx="5" fill="#1f2937" />
    <text x="445" y="325" fill="white" fontSize="12" fontWeight="bold">D4:</text>
    <text x="475" y="325" fill="#9ca3af" fontSize="11">3.5km | 12min | 4.3 star | 78% = 58.1</text>

    {/* Process Flow */}
    <rect x="30" y="370" width="740" height="65" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="2" />

    <rect x="50" y="385" width="120" height="35" rx="5" fill="url(#matchRestGrad)" />
    <text x="110" y="407" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Order Placed</text>

    <path d="M175 402 L195 402" stroke="#f97316" strokeWidth="2" fill="none" markerEnd="url(#matchArrow)" />

    <rect x="200" y="385" width="120" height="35" rx="5" fill="url(#matchRestGrad)" />
    <text x="260" y="407" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">GEORADIUS</text>

    <path d="M325 402 L345 402" stroke="#f97316" strokeWidth="2" fill="none" markerEnd="url(#matchArrow)" />

    <rect x="350" y="385" width="120" height="35" rx="5" fill="url(#matchRestGrad)" />
    <text x="410" y="407" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Score Drivers</text>

    <path d="M475 402 L495 402" stroke="#f97316" strokeWidth="2" fill="none" markerEnd="url(#matchArrow)" />

    <rect x="500" y="385" width="120" height="35" rx="5" fill="url(#matchRestGrad)" />
    <text x="560" y="407" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Send to Top 5</text>

    <path d="M625 402 L645 402" stroke="#f97316" strokeWidth="2" fill="none" markerEnd="url(#matchArrow)" />

    <rect x="650" y="385" width="110" height="35" rx="5" fill="url(#matchDriverGrad)" />
    <text x="705" y="407" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">First Accept Wins</text>
  </svg>
)

// SVG Diagram: Real-Time GPS Tracking
const RealTimeTrackingDiagram = () => (
  <svg viewBox="0 0 800 380" className="w-full h-auto" style={{ maxWidth: '800px', margin: '0 auto', display: 'block' }}>
    <defs>
      <linearGradient id="trackDriverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
      <linearGradient id="trackRestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="trackCustomerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <linearGradient id="trackServerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <filter id="trackShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3" />
      </filter>
      <marker id="trackArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
      <marker id="trackArrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
    </defs>

    {/* Background */}
    <rect width="800" height="380" fill="#1f2937" rx="10" />

    {/* Title */}
    <text x="400" y="30" textAnchor="middle" fill="#f97316" fontSize="18" fontWeight="bold">Real-Time GPS Tracking System</text>

    {/* Driver App */}
    <g filter="url(#trackShadow)">
      <rect x="30" y="80" width="150" height="180" rx="10" fill="#374151" stroke="url(#trackDriverGrad)" strokeWidth="2" />
      <rect x="50" y="95" width="110" height="20" rx="5" fill="url(#trackDriverGrad)" />
      <text x="105" y="110" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Driver App</text>

      {/* Phone screen */}
      <rect x="50" y="125" width="110" height="120" rx="5" fill="#1f2937" />

      {/* GPS Icon */}
      <circle cx="105" cy="170" r="20" fill="none" stroke="#22c55e" strokeWidth="2" />
      <circle cx="105" cy="170" r="10" fill="#22c55e" />
      <circle cx="105" cy="170" r="5" fill="white" />

      <text x="105" y="215" textAnchor="middle" fill="#22c55e" fontSize="9">GPS: 37.7749, -122.4194</text>
      <text x="105" y="230" textAnchor="middle" fill="#6b7280" fontSize="8">Every 5-10 sec</text>
    </g>

    {/* Arrow: Driver to Server */}
    <path d="M185 170 L285 170" stroke="#22c55e" strokeWidth="2" fill="none" markerEnd="url(#trackArrow)" />
    <text x="235" y="160" textAnchor="middle" fill="#22c55e" fontSize="9">Location Update</text>
    <text x="235" y="185" textAnchor="middle" fill="#6b7280" fontSize="8">lat, lng, heading, speed</text>

    {/* Backend Services */}
    <g filter="url(#trackShadow)">
      <rect x="290" y="60" width="220" height="220" rx="10" fill="#374151" stroke="url(#trackServerGrad)" strokeWidth="2" />
      <text x="400" y="85" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold">Backend Services</text>

      {/* Location Service */}
      <rect x="310" y="100" width="180" height="50" rx="5" fill="#1f2937" stroke="#8b5cf6" strokeWidth="1" />
      <text x="400" y="120" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Location Service</text>
      <text x="400" y="138" textAnchor="middle" fill="#9ca3af" fontSize="9">Process + Store in Redis Geo</text>

      {/* Kafka */}
      <rect x="310" y="160" width="180" height="50" rx="5" fill="#1f2937" stroke="#8b5cf6" strokeWidth="1" />
      <text x="400" y="180" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Kafka</text>
      <text x="400" y="198" textAnchor="middle" fill="#9ca3af" fontSize="9">Publish location events</text>

      {/* WebSocket Server */}
      <rect x="310" y="220" width="180" height="50" rx="5" fill="#1f2937" stroke="#8b5cf6" strokeWidth="1" />
      <text x="400" y="240" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">WebSocket Server</text>
      <text x="400" y="258" textAnchor="middle" fill="#9ca3af" fontSize="9">Push updates to customers</text>
    </g>

    {/* Arrow: Server to Customer */}
    <path d="M515 170 L615 170" stroke="#3b82f6" strokeWidth="2" fill="none" markerEnd="url(#trackArrowBlue)" />
    <text x="565" y="160" textAnchor="middle" fill="#3b82f6" fontSize="9">WebSocket Push</text>
    <text x="565" y="185" textAnchor="middle" fill="#6b7280" fontSize="8">Real-time location</text>

    {/* Customer App */}
    <g filter="url(#trackShadow)">
      <rect x="620" y="80" width="150" height="180" rx="10" fill="#374151" stroke="url(#trackCustomerGrad)" strokeWidth="2" />
      <rect x="640" y="95" width="110" height="20" rx="5" fill="url(#trackCustomerGrad)" />
      <text x="695" y="110" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Customer App</text>

      {/* Phone screen with map */}
      <rect x="640" y="125" width="110" height="120" rx="5" fill="#1f2937" />

      {/* Map representation */}
      <rect x="650" y="135" width="90" height="80" rx="3" fill="#374151" />

      {/* Route line */}
      <path d="M665 195 Q680 175 705 160 Q720 150 725 145" stroke="#f97316" strokeWidth="2" fill="none" strokeDasharray="4,2" />

      {/* Driver marker */}
      <circle cx="690" cy="170" r="6" fill="#22c55e" />

      {/* Restaurant marker */}
      <rect x="720" y="140" width="10" height="10" rx="2" fill="#f97316" />

      {/* Customer marker */}
      <circle cx="665" cy="195" r="6" fill="#3b82f6" />

      <text x="695" y="230" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">ETA: 8 min</text>
      <text x="695" y="245" textAnchor="middle" fill="#6b7280" fontSize="8">1.2 km away</text>
    </g>

    {/* Data Flow Summary */}
    <rect x="30" y="290" width="740" height="75" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="2" />
    <text x="400" y="315" textAnchor="middle" fill="#9ca3af" fontSize="12" fontWeight="bold">Data Flow</text>

    <rect x="50" y="330" width="150" height="25" rx="4" fill="#22c55e" fillOpacity="0.2" />
    <text x="125" y="347" textAnchor="middle" fill="#22c55e" fontSize="10">Driver GPS (5-10s)</text>

    <text x="215" y="347" textAnchor="middle" fill="#6b7280" fontSize="14">{`->`}</text>

    <rect x="230" y="330" width="150" height="25" rx="4" fill="#8b5cf6" fillOpacity="0.2" />
    <text x="305" y="347" textAnchor="middle" fill="#a78bfa" fontSize="10">Redis Geo + Kafka</text>

    <text x="395" y="347" textAnchor="middle" fill="#6b7280" fontSize="14">{`->`}</text>

    <rect x="410" y="330" width="150" height="25" rx="4" fill="#8b5cf6" fillOpacity="0.2" />
    <text x="485" y="347" textAnchor="middle" fill="#a78bfa" fontSize="10">WebSocket Server</text>

    <text x="575" y="347" textAnchor="middle" fill="#6b7280" fontSize="14">{`->`}</text>

    <rect x="590" y="330" width="170" height="25" rx="4" fill="#3b82f6" fillOpacity="0.2" />
    <text x="675" y="347" textAnchor="middle" fill="#3b82f6" fontSize="10">Customer Live Map</text>
  </svg>
)

// SVG Diagram: ETA Prediction with ML
const ETAPredictionDiagram = () => (
  <svg viewBox="0 0 800 420" className="w-full h-auto" style={{ maxWidth: '800px', margin: '0 auto', display: 'block' }}>
    <defs>
      <linearGradient id="etaInputGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="etaModelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <linearGradient id="etaOutputGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
      <filter id="etaShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3" />
      </filter>
      <marker id="etaArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
      </marker>
    </defs>

    {/* Background */}
    <rect width="800" height="420" fill="#1f2937" rx="10" />

    {/* Title */}
    <text x="400" y="30" textAnchor="middle" fill="#f97316" fontSize="18" fontWeight="bold">ML-Based ETA Prediction System</text>

    {/* Input Features Section */}
    <rect x="30" y="55" width="220" height="300" rx="10" fill="#374151" stroke="url(#etaInputGrad)" strokeWidth="2" />
    <rect x="50" y="70" width="180" height="25" rx="5" fill="url(#etaInputGrad)" />
    <text x="140" y="88" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Input Features</text>

    {/* Feature items */}
    <rect x="45" y="105" width="190" height="30" rx="4" fill="#1f2937" />
    <text x="140" y="125" textAnchor="middle" fill="#fed7aa" fontSize="10">Distance: 5.2 km</text>

    <rect x="45" y="145" width="190" height="30" rx="4" fill="#1f2937" />
    <text x="140" y="165" textAnchor="middle" fill="#fed7aa" fontSize="10">Time: 12:30 PM (Lunch Rush)</text>

    <rect x="45" y="185" width="190" height="30" rx="4" fill="#1f2937" />
    <text x="140" y="205" textAnchor="middle" fill="#fed7aa" fontSize="10">Traffic: Heavy (0.8)</text>

    <rect x="45" y="225" width="190" height="30" rx="4" fill="#1f2937" />
    <text x="140" y="245" textAnchor="middle" fill="#fed7aa" fontSize="10">Weather: Rain</text>

    <rect x="45" y="265" width="190" height="30" rx="4" fill="#1f2937" />
    <text x="140" y="285" textAnchor="middle" fill="#fed7aa" fontSize="10">Restaurant Prep: 15 min (avg)</text>

    <rect x="45" y="305" width="190" height="30" rx="4" fill="#1f2937" />
    <text x="140" y="325" textAnchor="middle" fill="#fed7aa" fontSize="10">Driver Rating: 4.8</text>

    {/* Arrow to ML Model */}
    <path d="M255 200 L285 200" stroke="#8b5cf6" strokeWidth="3" fill="none" markerEnd="url(#etaArrow)" />

    {/* ML Model Section */}
    <g filter="url(#etaShadow)">
      <rect x="290" y="80" width="220" height="240" rx="10" fill="#374151" stroke="url(#etaModelGrad)" strokeWidth="2" />
      <rect x="310" y="95" width="180" height="25" rx="5" fill="url(#etaModelGrad)" />
      <text x="400" y="113" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">ML Model</text>

      {/* Neural network visualization */}
      <rect x="310" y="135" width="180" height="130" rx="5" fill="#1f2937" />

      {/* Input layer */}
      <circle cx="340" cy="160" r="8" fill="#f97316" />
      <circle cx="340" cy="185" r="8" fill="#f97316" />
      <circle cx="340" cy="210" r="8" fill="#f97316" />
      <circle cx="340" cy="235" r="8" fill="#f97316" />

      {/* Hidden layer 1 */}
      <circle cx="385" cy="170" r="8" fill="#8b5cf6" />
      <circle cx="385" cy="200" r="8" fill="#8b5cf6" />
      <circle cx="385" cy="230" r="8" fill="#8b5cf6" />

      {/* Hidden layer 2 */}
      <circle cx="430" cy="180" r="8" fill="#8b5cf6" />
      <circle cx="430" cy="210" r="8" fill="#8b5cf6" />

      {/* Output layer */}
      <circle cx="470" cy="195" r="10" fill="#22c55e" />

      {/* Connections (simplified) */}
      <line x1="348" y1="160" x2="377" y2="170" stroke="#6b7280" strokeWidth="1" opacity="0.5" />
      <line x1="348" y1="185" x2="377" y2="200" stroke="#6b7280" strokeWidth="1" opacity="0.5" />
      <line x1="348" y1="210" x2="377" y2="200" stroke="#6b7280" strokeWidth="1" opacity="0.5" />
      <line x1="348" y1="235" x2="377" y2="230" stroke="#6b7280" strokeWidth="1" opacity="0.5" />
      <line x1="393" y1="170" x2="422" y2="180" stroke="#6b7280" strokeWidth="1" opacity="0.5" />
      <line x1="393" y1="200" x2="422" y2="195" stroke="#6b7280" strokeWidth="1" opacity="0.5" />
      <line x1="393" y1="230" x2="422" y2="210" stroke="#6b7280" strokeWidth="1" opacity="0.5" />
      <line x1="438" y1="180" x2="460" y2="195" stroke="#6b7280" strokeWidth="1" opacity="0.5" />
      <line x1="438" y1="210" x2="460" y2="195" stroke="#6b7280" strokeWidth="1" opacity="0.5" />

      <text x="400" y="280" textAnchor="middle" fill="#a78bfa" fontSize="10">Gradient Boosting / Neural Net</text>
      <text x="400" y="300" textAnchor="middle" fill="#6b7280" fontSize="9">Trained on 10M+ deliveries</text>
    </g>

    {/* Arrow to Output */}
    <path d="M515 200 L545 200" stroke="#8b5cf6" strokeWidth="3" fill="none" markerEnd="url(#etaArrow)" />

    {/* Output Section */}
    <rect x="550" y="55" width="220" height="300" rx="10" fill="#374151" stroke="url(#etaOutputGrad)" strokeWidth="2" />
    <rect x="570" y="70" width="180" height="25" rx="5" fill="url(#etaOutputGrad)" />
    <text x="660" y="88" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">ETA Prediction</text>

    {/* Predicted ETA */}
    <rect x="570" y="105" width="180" height="80" rx="8" fill="#1f2937" />
    <text x="660" y="135" textAnchor="middle" fill="#22c55e" fontSize="28" fontWeight="bold">38 min</text>
    <text x="660" y="160" textAnchor="middle" fill="#6b7280" fontSize="11">Estimated Delivery Time</text>
    <text x="660" y="178" textAnchor="middle" fill="#22c55e" fontSize="10">Confidence: 94%</text>

    {/* Breakdown */}
    <rect x="570" y="195" width="180" height="145" rx="5" fill="#1f2937" />
    <text x="660" y="215" textAnchor="middle" fill="#9ca3af" fontSize="11" fontWeight="bold">Breakdown</text>

    <text x="585" y="240" fill="#fed7aa" fontSize="10">Driver to Restaurant:</text>
    <text x="735" y="240" textAnchor="end" fill="white" fontSize="10">8 min</text>

    <text x="585" y="260" fill="#fed7aa" fontSize="10">Food Preparation:</text>
    <text x="735" y="260" textAnchor="end" fill="white" fontSize="10">15 min</text>

    <text x="585" y="280" fill="#fed7aa" fontSize="10">Restaurant to Customer:</text>
    <text x="735" y="280" textAnchor="end" fill="white" fontSize="10">12 min</text>

    <text x="585" y="300" fill="#fed7aa" fontSize="10">Buffer (traffic/weather):</text>
    <text x="735" y="300" textAnchor="end" fill="white" fontSize="10">3 min</text>

    <rect x="585" y="310" width="150" height="1" fill="#4b5563" />
    <text x="585" y="330" fill="#22c55e" fontSize="11" fontWeight="bold">Total:</text>
    <text x="735" y="330" textAnchor="end" fill="#22c55e" fontSize="11" fontWeight="bold">38 min</text>

    {/* Feedback Loop */}
    <rect x="30" y="370" width="740" height="40" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="2" />
    <text x="400" y="395" textAnchor="middle" fill="#9ca3af" fontSize="11">
      Feedback Loop: Actual delivery time collected for model retraining (MAE target: under 3 min)
    </text>
  </svg>
)

function FoodDelivery({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.6rem 1.25rem',
            fontSize: '0.95rem',
            fontWeight: '600',
            backgroundColor: '#1f2937',
            color: '#f97316',
            border: '1px solid #c2410c',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#1f2937'}
        >
          ← Back to Projects
        </button>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '800',
          color: '#ffffff',
          margin: 0
        }}>
          Food Delivery Platform System Design
        </h1>
        <div style={{ width: '140px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        borderBottom: '1px solid #374151',
        paddingBottom: '0.5rem',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'architecture', label: 'Architecture' },
          { id: 'matching', label: 'Order Matching' },
          { id: 'routing', label: 'Driver Routing' },
          { id: 'features', label: 'Features' },
          { id: 'scalability', label: 'Scalability' },
          { id: 'api', label: 'API Endpoints' }
        ].map(tab => (
          <div key={tab.id} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <div onClick={(e) => e.stopPropagation()} style={{ transform: 'scale(0.8)' }}>
              <CompletionCheckbox problemId={`FoodDelivery-${tab.id}`} />
            </div>
            <button
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: activeTab === tab.id ? '#374151' : 'transparent',
                color: activeTab === tab.id ? '#fb923c' : '#9ca3af',
                border: 'none',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {tab.label}
            </button>
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{
        backgroundColor: '#1f2937',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        minHeight: '500px'
      }}>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-white">System Overview</h2>
              <p className="text-gray-300 leading-relaxed">
                Design a food delivery platform like Uber Eats or DoorDash that connects customers with restaurants,
                matches orders with delivery drivers, provides real-time tracking, handles payments, and optimizes
                delivery routes using geospatial indexing and intelligent matching algorithms.
              </p>
            </div>

            {/* Order Flow Diagram */}
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <OrderFlowDiagram />
            </div>

            {/* Scale Metrics */}
            <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/30 rounded-xl p-6 border-2 border-orange-700">
              <h3 className="text-2xl font-bold mb-4 text-orange-400">Scale & Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-orange-400 mb-1">100M+</div>
                  <div className="text-sm text-gray-300">Active users</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-orange-400 mb-1">1M+</div>
                  <div className="text-sm text-gray-300">Restaurant partners</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-orange-400 mb-1">5M+</div>
                  <div className="text-sm text-gray-300">Delivery drivers</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-orange-400 mb-1">50M</div>
                  <div className="text-sm text-gray-300">Orders per day</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-orange-400 mb-1">30-45 min</div>
                  <div className="text-sm text-gray-300">Average delivery time</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-orange-400 mb-1">{'<'} 2 sec</div>
                  <div className="text-sm text-gray-300">Driver matching latency</div>
                </div>
              </div>
            </div>

            {/* Functional Requirements */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/30 rounded-xl p-6 border-2 border-blue-700">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Functional Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-blue-400 mb-2">Customer Features:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>Browse restaurants by location</li>
                    <li>Search and filter menu items</li>
                    <li>Place orders with customization</li>
                    <li>Real-time order tracking</li>
                    <li>Payment processing</li>
                    <li>Ratings and reviews</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-blue-400 mb-2">Driver Features:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>Receive order assignments</li>
                    <li>Navigation to restaurant/customer</li>
                    <li>Update order status</li>
                    <li>Earnings tracking</li>
                    <li>Accept/decline orders</li>
                    <li>Multi-order batching</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Non-Functional Requirements */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-900/30 rounded-xl p-6 border-2 border-green-700">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Non-Functional Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <ul className="space-y-2 text-gray-300">
                    <li><strong>Availability:</strong> 99.99% uptime</li>
                    <li><strong>Latency:</strong> {'<'} 2 sec for driver matching</li>
                    <li><strong>Real-time:</strong> Location updates every 5-10 sec</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2 text-gray-300">
                    <li><strong>Scalability:</strong> Handle 50M orders/day</li>
                    <li><strong>Accuracy:</strong> Precise geospatial calculations</li>
                    <li><strong>Security:</strong> PCI DSS for payments, data encryption</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Architecture Tab */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-white">High-Level Architecture</h2>

            {/* Architecture Diagram */}
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 mb-8">
              <FoodDeliveryArchitectureDiagram />
            </div>

            <div className="flex flex-col items-center space-y-4">
              {/* Client Layer */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 shadow-xl border-2 border-blue-400 max-w-3xl w-full">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-2">Client Applications</div>
                  <div className="text-sm text-blue-100">Customer App - Driver App - Restaurant Dashboard - Web Portal</div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-500"></div>
              </div>

              {/* API Gateway */}
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 shadow-xl border-2 border-purple-400 max-w-3xl w-full">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-2">API Gateway</div>
                  <div className="text-sm text-purple-100">Authentication - Rate limiting - Load balancing - SSL termination</div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-500"></div>
              </div>

              {/* Microservices */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 shadow-xl border-2 border-orange-400 max-w-3xl w-full">
                <div className="text-white">
                  <div className="text-2xl font-bold mb-4 text-center">Microservices Layer</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      'User Service',
                      'Restaurant Service',
                      'Menu Service',
                      'Order Service',
                      'Driver Service',
                      'Matching Service',
                      'Location Service',
                      'Routing Service',
                      'Payment Service',
                      'Notification Service',
                      'Rating Service',
                      'Analytics Service'
                    ].map(service => (
                      <div key={service} className="bg-white/20 rounded-lg p-3 backdrop-blur text-center text-sm font-medium">
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-500"></div>
              </div>

              {/* Data Layer */}
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 shadow-xl border-2 border-indigo-400 max-w-3xl w-full">
                <div className="text-white">
                  <div className="text-2xl font-bold mb-4 text-center">Data Layer</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">PostgreSQL</div>
                      <div className="text-xs text-indigo-100">Users, Orders</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">MongoDB</div>
                      <div className="text-xs text-indigo-100">Menus, Reviews</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">Redis</div>
                      <div className="text-xs text-indigo-100">Cache, Sessions</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">Redis Geo</div>
                      <div className="text-xs text-indigo-100">Driver locations</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">Elasticsearch</div>
                      <div className="text-xs text-indigo-100">Restaurant search</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">Cassandra</div>
                      <div className="text-xs text-indigo-100">Location history</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">S3</div>
                      <div className="text-xs text-indigo-100">Images</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">Kafka</div>
                      <div className="text-xs text-indigo-100">Event stream</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Components */}
            <div className="mt-8 bg-gradient-to-br from-yellow-900/30 to-yellow-900/30 rounded-xl p-6 border-2 border-yellow-700">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">Key Components</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Location Service</div>
                  <div className="text-sm text-gray-300">Track driver locations in real-time using Redis Geospatial, update every 5-10 seconds</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Matching Engine</div>
                  <div className="text-sm text-gray-300">Match orders to nearby available drivers using proximity + ETA + driver rating</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Routing Engine</div>
                  <div className="text-sm text-gray-300">Calculate optimal routes using Google Maps API or OSRM for multi-stop deliveries</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Dynamic Pricing</div>
                  <div className="text-sm text-gray-300">Surge pricing based on demand, supply, distance, traffic, weather conditions</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Matching Tab */}
        {activeTab === 'matching' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-white">Order-Driver Matching Algorithm</h2>

            {/* Driver Matching Diagram */}
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 mb-8">
              <DriverMatchingDiagram />
            </div>

            {/* Matching Flow */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Matching Flow</h3>

              <div className="flex flex-col items-center space-y-4">
                {/* Step 1 */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 shadow-xl border-2 border-blue-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">1. Customer Places Order</div>
                    <div className="text-sm text-blue-100">Restaurant location: (lat, lon), Delivery address: (lat, lon)</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-blue-400"></div>
                </div>

                {/* Step 2 */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 shadow-xl border-2 border-green-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">2. Find Nearby Available Drivers</div>
                    <div className="text-sm text-green-100">GEORADIUS query on Redis: Find drivers within 5km of restaurant</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-green-400"></div>
                </div>

                {/* Step 3 */}
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 shadow-xl border-2 border-yellow-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">3. Calculate Match Score</div>
                    <div className="text-sm text-yellow-100">
                      Score = w1xDistance + w2xETA + w3xRating + w4xAcceptanceRate
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-yellow-400"></div>
                </div>

                {/* Step 4 */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 shadow-xl border-2 border-orange-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">4. Send to Top 5 Drivers (Batch)</div>
                    <div className="text-sm text-orange-100">Push notification via FCM/APNs, wait 15 seconds for acceptance</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-orange-400"></div>
                </div>

                {/* Step 5 */}
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 shadow-xl border-2 border-purple-400 max-w-3xl w-full">
                  <div className="text-white text-center">
                    <div className="text-xl font-bold mb-2">5. First Acceptance Wins</div>
                    <div className="text-sm text-purple-100">Assign order to first driver who accepts, cancel others</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Matching Criteria */}
            <div className="bg-gradient-to-br from-pink-900/30 to-pink-900/30 rounded-xl p-6 border-2 border-pink-700">
              <h3 className="text-2xl font-bold mb-4 text-pink-400">Matching Score Formula</h3>
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <h4 className="font-bold text-white mb-2">Scoring Factors:</h4>
                  <div className="text-sm text-gray-300 space-y-2">
                    <div>• <strong>Distance (40% weight):</strong> Driver to restaurant distance</div>
                    <div>• <strong>ETA (30% weight):</strong> Estimated time to reach restaurant</div>
                    <div>• <strong>Driver Rating (20% weight):</strong> Customer ratings (1-5 stars)</div>
                    <div>• <strong>Acceptance Rate (10% weight):</strong> Historical order acceptance %</div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <h4 className="font-bold text-white mb-2">Example Calculation:</h4>
                  <pre className="text-xs font-mono bg-gray-900 p-3 rounded text-gray-300">
{`Driver A:
  Distance: 2km -> score = (5-2)/5 x 100 = 60
  ETA: 8 min -> score = (20-8)/20 x 100 = 60
  Rating: 4.8/5 -> score = 4.8/5 x 100 = 96
  Accept Rate: 85% -> score = 85

Total Score = 0.4x60 + 0.3x60 + 0.2x96 + 0.1x85
            = 24 + 18 + 19.2 + 8.5 = 69.7`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Redis Geospatial */}
            <div className="bg-gradient-to-br from-red-900/30 to-red-900/30 rounded-xl p-6 border-2 border-red-700">
              <h3 className="text-2xl font-bold mb-4 text-red-400">Redis Geospatial Queries</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Store Driver Location:</div>
                  <code className="text-xs bg-gray-900 p-2 rounded block text-gray-300">
                    GEOADD drivers:online 37.7749 -122.4194 driver123
                  </code>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Find Nearby Drivers:</div>
                  <code className="text-xs bg-gray-900 p-2 rounded block text-gray-300">
                    GEORADIUS drivers:online 37.7749 -122.4194 5 km WITHDIST
                  </code>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Calculate Distance:</div>
                  <code className="text-xs bg-gray-900 p-2 rounded block text-gray-300">
                    GEODIST drivers:online driver123 driver456 km
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Driver Routing Tab */}
        {activeTab === 'routing' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-white">Driver Routing & Navigation</h2>

            {/* ETA Prediction Diagram */}
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 mb-8">
              <ETAPredictionDiagram />
            </div>

            {/* Route Optimization */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/30 rounded-xl p-6 border-2 border-blue-700">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Multi-Stop Route Optimization</h3>
              <div className="space-y-4">
                <p className="text-gray-300">
                  When driver picks up multiple orders (batching), optimize the sequence of pickups and drop-offs:
                </p>

                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <h4 className="font-bold text-white mb-2">Problem: Traveling Salesman Problem (TSP)</h4>
                  <div className="text-sm text-gray-300">
                    Given N restaurants and N delivery addresses, find optimal order to minimize total distance/time
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <h4 className="font-bold text-white mb-2">Solution Approaches:</h4>
                  <div className="text-sm text-gray-300 space-y-2">
                    <div><strong>1. Greedy (Fast):</strong> Pick nearest unvisited stop each time - O(n2)</div>
                    <div><strong>2. 2-Opt (Better):</strong> Iteratively swap edges to reduce distance - O(n2)</div>
                    <div><strong>3. Google OR-Tools:</strong> Constraint programming solver for TSP</div>
                    <div><strong>4. Heuristic:</strong> Pickup all orders first, then deliver (simple but effective)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Routing APIs */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-900/30 rounded-xl p-6 border-2 border-green-700">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Routing APIs</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Google Maps Directions API</div>
                  <div className="text-sm text-gray-300">
                    Turn-by-turn navigation<br/>
                    Real-time traffic data<br/>
                    Multiple waypoints support<br/>
                    Cost: $5 per 1000 requests
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">OSRM (Open Source Routing Machine)</div>
                  <div className="text-sm text-gray-300">
                    Self-hosted routing engine<br/>
                    OpenStreetMap data<br/>
                    Fast route calculation<br/>
                    Cost: Infrastructure only (free API)
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Mapbox Directions</div>
                  <div className="text-sm text-gray-300">
                    High-performance routing<br/>
                    Optimized routes API<br/>
                    Traffic-aware routing<br/>
                    Cost: $4 per 1000 requests
                  </div>
                </div>
              </div>
            </div>

            {/* ETA Calculation */}
            <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/30 rounded-xl p-6 border-2 border-orange-700">
              <h3 className="text-2xl font-bold mb-4 text-orange-400">ETA Calculation</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Components of Total ETA:</div>
                  <div className="text-sm text-gray-300 space-y-1">
                    <div>1. <strong>Driver to Restaurant:</strong> Driving time (API)</div>
                    <div>2. <strong>Food Preparation:</strong> Avg prep time per restaurant (historical data)</div>
                    <div>3. <strong>Restaurant to Customer:</strong> Driving time (API)</div>
                    <div>4. <strong>Traffic Buffer:</strong> Add 10-20% during peak hours</div>
                    <div>5. <strong>Parking/Handoff:</strong> Add 2-5 minutes</div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Formula:</div>
                  <code className="text-xs bg-gray-900 p-2 rounded block text-gray-300">
                    TotalETA = DriverToRestaurant + FoodPrep + RestaurantToCustomer + Buffers
                  </code>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">ML-Based ETA:</div>
                  <div className="text-sm text-gray-300">
                    Train ML model on historical delivery data to predict more accurate ETAs<br/>
                    Features: Time of day, weather, traffic, restaurant, driver speed
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-white">Key Features</h2>

            {/* Real-Time Tracking Diagram */}
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 mb-8">
              <RealTimeTrackingDiagram />
            </div>

            {/* Real-time Tracking */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/30 rounded-xl p-6 border-2 border-blue-700">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Real-time Order Tracking</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Driver Location Updates</div>
                  <div className="text-sm text-gray-300">
                    Driver app sends GPS coordinates every 5-10 seconds<br/>
                    Store in Redis Geospatial with TTL<br/>
                    Publish location updates to Kafka topic
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Customer Live Tracking</div>
                  <div className="text-sm text-gray-300">
                    WebSocket connection for real-time updates<br/>
                    Show driver on map with ETA countdown<br/>
                    Update every 10 seconds (reduce battery drain)
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Order Status Updates</div>
                  <div className="text-sm text-gray-300">
                    Confirmed - Preparing - Picked Up - En Route - Delivered
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Pricing */}
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/30 rounded-xl p-6 border-2 border-purple-700">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Dynamic Pricing (Surge Pricing)</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Pricing Factors:</div>
                  <div className="text-sm text-gray-300 space-y-1">
                    <div>• <strong>Demand:</strong> High order volume - increase price</div>
                    <div>• <strong>Supply:</strong> Low driver availability - increase price</div>
                    <div>• <strong>Distance:</strong> Longer distances cost more</div>
                    <div>• <strong>Time of Day:</strong> Peak lunch/dinner hours</div>
                    <div>• <strong>Weather:</strong> Rain/snow increases demand</div>
                    <div>• <strong>Traffic:</strong> Heavy traffic increases delivery time</div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Surge Multiplier Formula:</div>
                  <code className="text-xs bg-gray-900 p-2 rounded block text-gray-300">
                    Multiplier = 1.0 + (DemandScore x 0.5) + (SupplyScore x 0.3) + (WeatherScore x 0.2)
                  </code>
                </div>
              </div>
            </div>

            {/* Restaurant Discovery */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-900/30 rounded-xl p-6 border-2 border-green-700">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Restaurant Discovery</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Geospatial Search</div>
                  <div className="text-sm text-gray-300">
                    GEORADIUS on Redis: Find restaurants within 10km<br/>
                    Filter by cuisine, rating, delivery time, price<br/>
                    Sort by distance, rating, popularity
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Menu Search (Elasticsearch)</div>
                  <div className="text-sm text-gray-300">
                    Full-text search on dish names, descriptions<br/>
                    Autocomplete suggestions<br/>
                    Filter by dietary preferences (vegan, gluten-free)
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Personalized Recommendations</div>
                  <div className="text-sm text-gray-300">
                    Collaborative filtering based on order history<br/>
                    "Customers who ordered X also ordered Y"<br/>
                    Popular in your area
                  </div>
                </div>
              </div>
            </div>

            {/* Payments */}
            <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-900/30 rounded-xl p-6 border-2 border-yellow-700">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">Payment Processing</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Payment Methods</div>
                  <div className="text-sm text-gray-300">
                    Credit/Debit Card - Digital Wallets (Apple Pay, Google Pay) - Cash on Delivery - Gift Cards
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Payment Flow</div>
                  <div className="text-sm text-gray-300">
                    1. Tokenize card (Stripe/Braintree)<br/>
                    2. Pre-authorize amount when order placed<br/>
                    3. Capture payment when order delivered<br/>
                    4. Refund if order cancelled
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Payout to Restaurants & Drivers</div>
                  <div className="text-sm text-gray-300">
                    Weekly payouts via ACH transfer<br/>
                    Split: 70% restaurant, 20% driver, 10% platform<br/>
                    Track earnings in real-time dashboard
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scalability Tab */}
        {activeTab === 'scalability' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-white">Scalability & Performance</h2>

            {/* Database Scaling */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/30 rounded-xl p-6 border-2 border-blue-700">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Database Scaling</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Sharding Strategy</div>
                  <div className="text-sm text-gray-300">
                    • <strong>Users:</strong> Shard by user_id (consistent hashing)<br/>
                    • <strong>Orders:</strong> Shard by created_at + region (time-based)<br/>
                    • <strong>Restaurants:</strong> Shard by geo-hash (location-based)
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Read Replicas</div>
                  <div className="text-sm text-gray-300">
                    • 5 read replicas per primary (90% reads, 10% writes)<br/>
                    • Route reads to nearest replica by region<br/>
                    • Async replication (eventual consistency OK for most reads)
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Redis for Hot Data</div>
                  <div className="text-sm text-gray-300">
                    • Active orders (in-progress deliveries)<br/>
                    • Online driver locations<br/>
                    • Restaurant availability (open/closed)<br/>
                    • Menu items (frequently accessed)
                  </div>
                </div>
              </div>
            </div>

            {/* Geospatial Scaling */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-900/30 rounded-xl p-6 border-2 border-green-700">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Geospatial Data Scaling</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Redis Geo Sharding</div>
                  <div className="text-sm text-gray-300">
                    • Partition drivers by city/region<br/>
                    • Key: drivers:online:san_francisco<br/>
                    • Reduces single-node bottleneck
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Geohash-Based Indexing</div>
                  <div className="text-sm text-gray-300">
                    • Encode lat/lon to geohash (e.g., 9q8yy)<br/>
                    • Query by geohash prefix for proximity<br/>
                    • Faster than calculating distance for every point
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">QuadTree / R-Tree</div>
                  <div className="text-sm text-gray-300">
                    • Spatial index for fast range queries<br/>
                    • Used by PostGIS extension<br/>
                    • O(log n) nearest neighbor search
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Optimization */}
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/30 rounded-xl p-6 border-2 border-purple-700">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Performance Optimization</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Batch Processing</div>
                  <div className="text-sm text-gray-300">
                    • Group location updates (send every 10 sec, not every 1 sec)<br/>
                    • Batch notifications (1 notification for N orders, not N notifications)<br/>
                    • Batch database writes (bulk insert)
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">CDN for Static Assets</div>
                  <div className="text-sm text-gray-300">
                    • Restaurant/menu images on CloudFront<br/>
                    • Mobile app assets cached at edge<br/>
                    • Reduce origin server load
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Async Processing</div>
                  <div className="text-sm text-gray-300">
                    • Order placed - Kafka event - Async workers process<br/>
                    • Send notifications async (don't block API response)<br/>
                    • Analytics/reporting runs on replicas
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Targets */}
            <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/30 rounded-xl p-6 border-2 border-orange-700">
              <h3 className="text-2xl font-bold mb-4 text-orange-400">Performance Targets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-orange-400 mb-1">{'<'} 2 sec</div>
                  <div className="text-sm text-gray-300">Driver matching latency</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-orange-400 mb-1">{'<'} 500ms</div>
                  <div className="text-sm text-gray-300">Restaurant search API (p95)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-orange-400 mb-1">5-10 sec</div>
                  <div className="text-sm text-gray-300">Location update interval</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-orange-400 mb-1">99.99%</div>
                  <div className="text-sm text-gray-300">System availability</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-orange-400 mb-1">50M/day</div>
                  <div className="text-sm text-gray-300">Order processing capacity</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-orange-400 mb-1">30-45 min</div>
                  <div className="text-sm text-gray-300">Average delivery time</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Endpoints Tab */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            {/* API Overview */}
            <div className="bg-gradient-to-br from-red-900/30 to-red-900/30 rounded-xl p-6 border-2 border-red-700">
              <h2 className="text-2xl font-bold mb-4 text-red-400">Food Delivery API Overview</h2>
              <p className="text-gray-300 mb-4">
                RESTful API for managing restaurants, menus, orders, deliveries, and driver operations. Supports real-time tracking and dynamic pricing.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-red-400 mb-2">Base URL</div>
                  <code className="text-sm text-gray-300">https://api.fooddelivery.com/v1</code>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-red-400 mb-2">Authentication</div>
                  <code className="text-sm text-gray-300">JWT + OAuth 2.0</code>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-red-400 mb-2">Rate Limit</div>
                  <code className="text-sm text-gray-300">1000 req/min per user</code>
                </div>
              </div>
            </div>

            {/* Restaurant & Menu APIs */}
            <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-white">Restaurant & Menu APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/restaurants?lat=37.7749&lng=-122.4194&radius=5km</code>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">Search restaurants by location</p>
                  <div className="bg-gray-900 p-3 rounded">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "restaurants": [
    {
      "id": "rest123",
      "name": "Pizza Palace",
      "rating": 4.5,
      "delivery_time": "25-35 min",
      "delivery_fee": 2.99,
      "cuisines": ["Italian", "Pizza"]
    }
  ]
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/restaurants/:restaurantId/menu</code>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">Get restaurant menu</p>
                  <div className="bg-gray-900 p-3 rounded">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "categories": [
    {
      "name": "Pizza",
      "items": [
        {
          "id": "item789",
          "name": "Margherita Pizza",
          "price": 12.99,
          "description": "Fresh mozzarella and basil",
          "image_url": "https://...",
          "available": true
        }
      ]
    }
  ]
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/restaurants/:restaurantId</code>
                  </div>
                  <p className="text-sm text-gray-300">Get restaurant details</p>
                </div>
              </div>
            </div>

            {/* Order APIs */}
            <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-white">Order APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/orders</code>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">Place a new order</p>
                  <div className="bg-gray-900 p-3 rounded">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "restaurant_id": "rest123",
  "items": [
    {
      "item_id": "item789",
      "quantity": 2,
      "special_instructions": "No onions"
    }
  ],
  "delivery_address": {
    "street": "123 Main St",
    "city": "San Francisco",
    "lat": 37.7749,
    "lng": -122.4194
  },
  "payment_method_id": "pm_abc123"
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/orders/:orderId</code>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">Get order status and details</p>
                  <div className="bg-gray-900 p-3 rounded">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "order_id": "ord_xyz789",
  "status": "out_for_delivery",
  "restaurant": {...},
  "items": [...],
  "driver": {
    "name": "John Doe",
    "phone": "+1234567890",
    "location": {"lat": 37.7750, "lng": -122.4195}
  },
  "estimated_delivery": "2024-01-20T12:35:00Z"
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/orders</code>
                  </div>
                  <p className="text-sm text-gray-300">Get user's order history</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/orders/:orderId/cancel</code>
                  </div>
                  <p className="text-sm text-gray-300">Cancel an order</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/orders/:orderId/rating</code>
                  </div>
                  <p className="text-sm text-gray-300">Rate order and driver</p>
                </div>
              </div>
            </div>

            {/* Driver APIs */}
            <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-white">Driver APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/drivers/online</code>
                  </div>
                  <p className="text-sm text-gray-300">Set driver status to online</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/drivers/location</code>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">Update driver location (real-time)</p>
                  <div className="bg-gray-900 p-3 rounded">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "lat": 37.7749,
  "lng": -122.4194,
  "heading": 90,
  "speed": 25
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/drivers/orders/available</code>
                  </div>
                  <p className="text-sm text-gray-300">Get available orders nearby</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/drivers/orders/:orderId/accept</code>
                  </div>
                  <p className="text-sm text-gray-300">Accept an order</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/drivers/orders/:orderId/pickup</code>
                  </div>
                  <p className="text-sm text-gray-300">Mark order as picked up</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/drivers/orders/:orderId/deliver</code>
                  </div>
                  <p className="text-sm text-gray-300">Mark order as delivered</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/drivers/earnings</code>
                  </div>
                  <p className="text-sm text-gray-300">Get driver earnings and statistics</p>
                </div>
              </div>
            </div>

            {/* Tracking & Payment APIs */}
            <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-white">Tracking & Payment APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/orders/:orderId/track</code>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">Real-time order tracking (WebSocket)</p>
                  <div className="bg-gray-900 p-3 rounded">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`WebSocket: wss://api.fooddelivery.com/track/:orderId
Messages:
{
  "driver_location": {"lat": 37.7750, "lng": -122.4195},
  "eta_minutes": 12,
  "status": "on_the_way"
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/payments/methods</code>
                  </div>
                  <p className="text-sm text-gray-300">Add payment method</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/orders/:orderId/receipt</code>
                  </div>
                  <p className="text-sm text-gray-300">Get order receipt</p>
                </div>
              </div>
            </div>

            {/* Response Codes */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border-2 border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">HTTP Status Codes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                  <div className="text-green-400 font-bold">200 OK</div>
                  <div className="text-gray-300 text-sm">Request successful</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                  <div className="text-green-400 font-bold">201 Created</div>
                  <div className="text-gray-300 text-sm">Order/resource created</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                  <div className="text-yellow-400 font-bold">400 Bad Request</div>
                  <div className="text-gray-300 text-sm">Invalid order data</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                  <div className="text-yellow-400 font-bold">401 Unauthorized</div>
                  <div className="text-gray-300 text-sm">Authentication required</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                  <div className="text-red-400 font-bold">404 Not Found</div>
                  <div className="text-gray-300 text-sm">Restaurant/order not found</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                  <div className="text-red-400 font-bold">429 Too Many Requests</div>
                  <div className="text-gray-300 text-sm">Rate limit exceeded</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FoodDelivery

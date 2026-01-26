/**
 * Amazon E-Commerce System Design
 *
 * Converted to tab_template format with concepts and details
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const TOPIC_COLORS = {
  primary: '#f97316',
  primaryHover: '#fb923c',
  bg: 'rgba(249, 115, 22, 0.1)',
  border: 'rgba(249, 115, 22, 0.3)',
  arrow: '#f97316',
  hoverBg: 'rgba(249, 115, 22, 0.2)',
  topicBg: 'rgba(249, 115, 22, 0.2)'
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

// 1. High-level e-commerce architecture diagram
const AmazonArchitectureDiagram = () => (
  <svg viewBox="0 0 900 500" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="clientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="cdnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <linearGradient id="gatewayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
      <linearGradient id="serviceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fb923c" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>
      <linearGradient id="dbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
      </marker>
    </defs>

    <rect width="900" height="500" fill="#1f2937" rx="10" />
    <text x="450" y="30" textAnchor="middle" fill="#f97316" fontSize="18" fontWeight="bold">Amazon E-Commerce Architecture</text>

    <rect x="300" y="50" width="300" height="50" rx="8" fill="url(#clientGrad)" />
    <text x="450" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Clients (Web, iOS, Android, Alexa)</text>

    <line x1="450" y1="100" x2="450" y2="130" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowhead)" />

    <rect x="300" y="135" width="300" height="45" rx="8" fill="url(#cdnGrad)" />
    <text x="450" y="163" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">CloudFront CDN (Static Assets)</text>

    <line x1="450" y1="180" x2="450" y2="210" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowhead)" />

    <rect x="200" y="215" width="200" height="45" rx="8" fill="url(#gatewayGrad)" />
    <text x="300" y="243" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">API Gateway</text>

    <rect x="500" y="215" width="200" height="45" rx="8" fill="#ef4444" />
    <text x="600" y="243" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Load Balancer (ELB)</text>

    <line x1="300" y1="260" x2="300" y2="290" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowhead)" />
    <line x1="600" y1="260" x2="600" y2="290" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowhead)" />
    <line x1="300" y1="285" x2="600" y2="285" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4" />

    <rect x="50" y="295" width="800" height="80" rx="8" fill="url(#serviceGrad)" fillOpacity="0.3" stroke="#f97316" strokeWidth="2" />
    <text x="450" y="315" textAnchor="middle" fill="#f97316" fontSize="14" fontWeight="bold">Microservices Layer</text>

    <rect x="70" y="325" width="90" height="35" rx="4" fill="#374151" stroke="#f97316" />
    <text x="115" y="347" textAnchor="middle" fill="white" fontSize="10">Product</text>

    <rect x="170" y="325" width="90" height="35" rx="4" fill="#374151" stroke="#f97316" />
    <text x="215" y="347" textAnchor="middle" fill="white" fontSize="10">Search</text>

    <rect x="270" y="325" width="90" height="35" rx="4" fill="#374151" stroke="#f97316" />
    <text x="315" y="347" textAnchor="middle" fill="white" fontSize="10">Cart</text>

    <rect x="370" y="325" width="90" height="35" rx="4" fill="#374151" stroke="#f97316" />
    <text x="415" y="347" textAnchor="middle" fill="white" fontSize="10">Order</text>

    <rect x="470" y="325" width="90" height="35" rx="4" fill="#374151" stroke="#f97316" />
    <text x="515" y="347" textAnchor="middle" fill="white" fontSize="10">Payment</text>

    <rect x="570" y="325" width="90" height="35" rx="4" fill="#374151" stroke="#f97316" />
    <text x="615" y="347" textAnchor="middle" fill="white" fontSize="10">Inventory</text>

    <rect x="670" y="325" width="90" height="35" rx="4" fill="#374151" stroke="#f97316" />
    <text x="715" y="347" textAnchor="middle" fill="white" fontSize="10">Recommend</text>

    <line x1="450" y1="375" x2="450" y2="405" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowhead)" />

    <rect x="50" y="410" width="800" height="80" rx="8" fill="url(#dbGrad)" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" />
    <text x="450" y="430" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Data Layer</text>

    <rect x="70" y="440" width="80" height="35" rx="4" fill="#1e3a5f" stroke="#3b82f6" />
    <text x="110" y="462" textAnchor="middle" fill="white" fontSize="9">PostgreSQL</text>

    <rect x="160" y="440" width="80" height="35" rx="4" fill="#1e3a5f" stroke="#3b82f6" />
    <text x="200" y="462" textAnchor="middle" fill="white" fontSize="9">DynamoDB</text>

    <rect x="250" y="440" width="90" height="35" rx="4" fill="#1e3a5f" stroke="#3b82f6" />
    <text x="295" y="462" textAnchor="middle" fill="white" fontSize="9">Elasticsearch</text>

    <rect x="350" y="440" width="70" height="35" rx="4" fill="#1e3a5f" stroke="#3b82f6" />
    <text x="385" y="462" textAnchor="middle" fill="white" fontSize="9">Redis</text>

    <rect x="430" y="440" width="70" height="35" rx="4" fill="#1e3a5f" stroke="#3b82f6" />
    <text x="465" y="462" textAnchor="middle" fill="white" fontSize="9">S3</text>

    <rect x="510" y="440" width="80" height="35" rx="4" fill="#1e3a5f" stroke="#3b82f6" />
    <text x="550" y="462" textAnchor="middle" fill="white" fontSize="9">Cassandra</text>

    <rect x="600" y="440" width="70" height="35" rx="4" fill="#1e3a5f" stroke="#3b82f6" />
    <text x="635" y="462" textAnchor="middle" fill="white" fontSize="9">Kafka</text>

    <rect x="680" y="440" width="70" height="35" rx="4" fill="#1e3a5f" stroke="#3b82f6" />
    <text x="715" y="462" textAnchor="middle" fill="white" fontSize="9">Neo4j</text>
  </svg>
)

// 2. Order flow diagram - complete order lifecycle
const OrderFlowDiagram = () => (
  <svg viewBox="0 0 900 280" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="cartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="checkoutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#ca8a04" />
      </linearGradient>
      <linearGradient id="paymentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
      <linearGradient id="inventoryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <linearGradient id="shippingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <linearGradient id="deliveredGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <marker id="flowArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
      </marker>
    </defs>

    <rect width="900" height="280" fill="#1f2937" rx="10" />
    <text x="450" y="30" textAnchor="middle" fill="#f97316" fontSize="18" fontWeight="bold">Order Flow Lifecycle</text>

    <rect x="30" y="60" width="110" height="70" rx="10" fill="url(#cartGrad)" />
    <text x="85" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Cart</text>
    <text x="85" y="110" textAnchor="middle" fill="white" fontSize="9">Add Items</text>

    <line x1="140" y1="95" x2="175" y2="95" stroke="#f97316" strokeWidth="3" markerEnd="url(#flowArrow)" />

    <rect x="180" y="60" width="110" height="70" rx="10" fill="url(#checkoutGrad)" />
    <text x="235" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Checkout</text>
    <text x="235" y="110" textAnchor="middle" fill="white" fontSize="9">Address + Ship</text>

    <line x1="290" y1="95" x2="325" y2="95" stroke="#f97316" strokeWidth="3" markerEnd="url(#flowArrow)" />

    <rect x="330" y="60" width="110" height="70" rx="10" fill="url(#paymentGrad)" />
    <text x="385" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Payment</text>
    <text x="385" y="110" textAnchor="middle" fill="white" fontSize="9">Process + Fraud</text>

    <line x1="440" y1="95" x2="475" y2="95" stroke="#f97316" strokeWidth="3" markerEnd="url(#flowArrow)" />

    <rect x="480" y="60" width="110" height="70" rx="10" fill="url(#inventoryGrad)" />
    <text x="535" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Inventory</text>
    <text x="535" y="110" textAnchor="middle" fill="white" fontSize="9">Reserve + Deduct</text>

    <line x1="590" y1="95" x2="625" y2="95" stroke="#f97316" strokeWidth="3" markerEnd="url(#flowArrow)" />

    <rect x="630" y="60" width="110" height="70" rx="10" fill="url(#shippingGrad)" />
    <text x="685" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Shipping</text>
    <text x="685" y="110" textAnchor="middle" fill="white" fontSize="9">Pick + Pack</text>

    <line x1="740" y1="95" x2="775" y2="95" stroke="#f97316" strokeWidth="3" markerEnd="url(#flowArrow)" />

    <rect x="780" y="60" width="100" height="70" rx="10" fill="url(#deliveredGrad)" />
    <text x="830" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Delivered</text>
    <text x="830" y="110" textAnchor="middle" fill="white" fontSize="9">Complete</text>

    <rect x="100" y="170" width="700" height="40" rx="6" fill="#374151" stroke="#f97316" strokeWidth="2" />
    <text x="450" y="195" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="bold">Kafka Event Bus (Order Events, Inventory Events, Shipping Events)</text>

    <line x1="85" y1="130" x2="85" y2="170" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4" />
    <line x1="235" y1="130" x2="235" y2="170" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4" />
    <line x1="385" y1="130" x2="385" y2="170" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4" />
    <line x1="535" y1="130" x2="535" y2="170" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4" />
    <line x1="685" y1="130" x2="685" y2="170" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4" />
    <line x1="830" y1="130" x2="800" y2="170" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4" />

    <rect x="200" y="230" width="150" height="35" rx="6" fill="#1e3a5f" stroke="#3b82f6" />
    <text x="275" y="252" textAnchor="middle" fill="white" fontSize="10">Analytics Service</text>

    <rect x="550" y="230" width="150" height="35" rx="6" fill="#1e3a5f" stroke="#3b82f6" />
    <text x="625" y="252" textAnchor="middle" fill="white" fontSize="10">Notification Service</text>

    <line x1="275" y1="210" x2="275" y2="230" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4" />
    <line x1="625" y1="210" x2="625" y2="230" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4" />
  </svg>
)

// 3. Inventory management diagram - real-time tracking across warehouses
const InventoryManagementDiagram = () => (
  <svg viewBox="0 0 900 400" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="warehouseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="centralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <linearGradient id="cacheGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
      <marker id="invArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#f97316" />
      </marker>
      <marker id="syncArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
      </marker>
    </defs>

    <rect width="900" height="400" fill="#1f2937" rx="10" />
    <text x="450" y="30" textAnchor="middle" fill="#f97316" fontSize="18" fontWeight="bold">Real-Time Inventory Management System</text>

    <rect x="30" y="70" width="180" height="280" rx="8" fill="#374151" stroke="#f97316" strokeWidth="2" />
    <text x="120" y="95" textAnchor="middle" fill="#f97316" fontSize="14" fontWeight="bold">Fulfillment Centers</text>

    <rect x="50" y="110" width="140" height="45" rx="6" fill="url(#warehouseGrad)" />
    <text x="120" y="130" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">FC-East (NYC)</text>
    <text x="120" y="145" textAnchor="middle" fill="white" fontSize="9">Stock: 45,000 SKUs</text>

    <rect x="50" y="165" width="140" height="45" rx="6" fill="url(#warehouseGrad)" />
    <text x="120" y="185" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">FC-West (LA)</text>
    <text x="120" y="200" textAnchor="middle" fill="white" fontSize="9">Stock: 52,000 SKUs</text>

    <rect x="50" y="220" width="140" height="45" rx="6" fill="url(#warehouseGrad)" />
    <text x="120" y="240" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">FC-Central (TX)</text>
    <text x="120" y="255" textAnchor="middle" fill="white" fontSize="9">Stock: 38,000 SKUs</text>

    <rect x="50" y="275" width="140" height="45" rx="6" fill="url(#warehouseGrad)" />
    <text x="120" y="295" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">FC-South (FL)</text>
    <text x="120" y="310" textAnchor="middle" fill="white" fontSize="9">Stock: 41,000 SKUs</text>

    <rect x="320" y="100" width="260" height="200" rx="10" fill="url(#centralGrad)" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" />
    <text x="450" y="130" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">Inventory Service</text>

    <rect x="340" y="145" width="100" height="40" rx="4" fill="#1e3a5f" stroke="#3b82f6" />
    <text x="390" y="165" textAnchor="middle" fill="white" fontSize="10">Stock Manager</text>
    <text x="390" y="178" textAnchor="middle" fill="#9ca3af" fontSize="8">Real-time updates</text>

    <rect x="460" y="145" width="100" height="40" rx="4" fill="#1e3a5f" stroke="#3b82f6" />
    <text x="510" y="165" textAnchor="middle" fill="white" fontSize="10">Reservation</text>
    <text x="510" y="178" textAnchor="middle" fill="#9ca3af" fontSize="8">15-min TTL</text>

    <rect x="340" y="200" width="100" height="40" rx="4" fill="#1e3a5f" stroke="#3b82f6" />
    <text x="390" y="220" textAnchor="middle" fill="white" fontSize="10">Aggregator</text>
    <text x="390" y="233" textAnchor="middle" fill="#9ca3af" fontSize="8">Cross-FC totals</text>

    <rect x="460" y="200" width="100" height="40" rx="4" fill="#1e3a5f" stroke="#3b82f6" />
    <text x="510" y="220" textAnchor="middle" fill="white" fontSize="10">Allocator</text>
    <text x="510" y="233" textAnchor="middle" fill="#9ca3af" fontSize="8">Optimal FC pick</text>

    <rect x="340" y="255" width="220" height="30" rx="4" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" />
    <text x="450" y="275" textAnchor="middle" fill="#22c55e" fontSize="10">Optimistic Locking (Version Control)</text>

    <rect x="690" y="70" width="180" height="100" rx="8" fill="url(#cacheGrad)" fillOpacity="0.3" stroke="#ef4444" strokeWidth="2" />
    <text x="780" y="100" textAnchor="middle" fill="#ef4444" fontSize="13" fontWeight="bold">Redis Cache</text>
    <text x="780" y="120" textAnchor="middle" fill="white" fontSize="10">Hot Products (80/20)</text>
    <text x="780" y="140" textAnchor="middle" fill="#9ca3af" fontSize="9">TTL: 5 minutes</text>
    <text x="780" y="155" textAnchor="middle" fill="#9ca3af" fontSize="9">Sub-ms latency</text>

    <rect x="690" y="200" width="180" height="100" rx="8" fill="#374151" stroke="#8b5cf6" strokeWidth="2" />
    <text x="780" y="230" textAnchor="middle" fill="#8b5cf6" fontSize="13" fontWeight="bold">PostgreSQL (Sharded)</text>
    <text x="780" y="250" textAnchor="middle" fill="white" fontSize="10">Primary: Writes</text>
    <text x="780" y="270" textAnchor="middle" fill="#9ca3af" fontSize="9">Read Replicas: 5x</text>
    <text x="780" y="285" textAnchor="middle" fill="#9ca3af" fontSize="9">Shard by product_id</text>

    <line x1="210" y1="130" x2="320" y2="165" stroke="#f97316" strokeWidth="2" markerEnd="url(#invArrow)" />
    <line x1="210" y1="187" x2="320" y2="187" stroke="#f97316" strokeWidth="2" markerEnd="url(#invArrow)" />
    <line x1="210" y1="242" x2="320" y2="220" stroke="#f97316" strokeWidth="2" markerEnd="url(#invArrow)" />
    <line x1="210" y1="297" x2="320" y2="250" stroke="#f97316" strokeWidth="2" markerEnd="url(#invArrow)" />

    <line x1="580" y1="165" x2="690" y2="130" stroke="#22c55e" strokeWidth="2" markerEnd="url(#syncArrow)" />
    <line x1="580" y1="220" x2="690" y2="250" stroke="#22c55e" strokeWidth="2" markerEnd="url(#syncArrow)" />

    <rect x="250" y="340" width="400" height="40" rx="6" fill="#374151" stroke="#f97316" strokeWidth="2" />
    <text x="450" y="365" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="bold">Kafka: inventory-updates, stock-alerts, reorder-triggers</text>

    <line x1="450" y1="300" x2="450" y2="340" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4" />
  </svg>
)

// 4. Search service diagram with relevance ranking
const SearchServiceDiagram = () => (
  <svg viewBox="0 0 900 380" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="searchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="esGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
      <linearGradient id="mlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <marker id="searchArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#f97316" />
      </marker>
    </defs>

    <rect width="900" height="380" fill="#1f2937" rx="10" />
    <text x="450" y="30" textAnchor="middle" fill="#f97316" fontSize="18" fontWeight="bold">Product Search Service Architecture</text>

    <rect x="30" y="60" width="140" height="60" rx="8" fill="url(#searchGrad)" />
    <text x="100" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">User Query</text>
    <text x="100" y="105" textAnchor="middle" fill="white" fontSize="10">"laptop gaming"</text>

    <line x1="170" y1="90" x2="210" y2="90" stroke="#f97316" strokeWidth="2" markerEnd="url(#searchArrow)" />

    <rect x="215" y="55" width="130" height="70" rx="8" fill="#374151" stroke="#f97316" strokeWidth="2" />
    <text x="280" y="80" textAnchor="middle" fill="#f97316" fontSize="11" fontWeight="bold">Query Parser</text>
    <text x="280" y="98" textAnchor="middle" fill="white" fontSize="9">Tokenization</text>
    <text x="280" y="112" textAnchor="middle" fill="#9ca3af" fontSize="8">Spell correction</text>

    <line x1="345" y1="90" x2="385" y2="90" stroke="#f97316" strokeWidth="2" markerEnd="url(#searchArrow)" />

    <rect x="390" y="40" width="200" height="130" rx="10" fill="url(#esGrad)" fillOpacity="0.3" stroke="#22c55e" strokeWidth="2" />
    <text x="490" y="65" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">Elasticsearch Cluster</text>
    <text x="490" y="85" textAnchor="middle" fill="white" fontSize="10">50+ Nodes | 12M+ Products</text>

    <rect x="405" y="95" width="80" height="30" rx="4" fill="#1e3a5f" stroke="#22c55e" />
    <text x="445" y="115" textAnchor="middle" fill="white" fontSize="9">BM25 Score</text>

    <rect x="495" y="95" width="80" height="30" rx="4" fill="#1e3a5f" stroke="#22c55e" />
    <text x="535" y="115" textAnchor="middle" fill="white" fontSize="9">N-gram</text>

    <rect x="405" y="130" width="80" height="30" rx="4" fill="#1e3a5f" stroke="#22c55e" />
    <text x="445" y="150" textAnchor="middle" fill="white" fontSize="9">Fuzzy Match</text>

    <rect x="495" y="130" width="80" height="30" rx="4" fill="#1e3a5f" stroke="#22c55e" />
    <text x="535" y="150" textAnchor="middle" fill="white" fontSize="9">Filters</text>

    <line x1="590" y1="105" x2="630" y2="105" stroke="#f97316" strokeWidth="2" markerEnd="url(#searchArrow)" />

    <rect x="635" y="40" width="160" height="130" rx="10" fill="url(#mlGrad)" fillOpacity="0.3" stroke="#8b5cf6" strokeWidth="2" />
    <text x="715" y="65" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">ML Ranking</text>
    <text x="715" y="85" textAnchor="middle" fill="white" fontSize="10">Personalization</text>

    <rect x="650" y="95" width="130" height="25" rx="4" fill="#1e3a5f" stroke="#8b5cf6" />
    <text x="715" y="112" textAnchor="middle" fill="white" fontSize="9">User History</text>

    <rect x="650" y="125" width="130" height="25" rx="4" fill="#1e3a5f" stroke="#8b5cf6" />
    <text x="715" y="142" textAnchor="middle" fill="white" fontSize="9">Click-through Rate</text>

    <line x1="795" y1="105" x2="835" y2="105" stroke="#f97316" strokeWidth="2" markerEnd="url(#searchArrow)" />

    <rect x="840" y="55" width="50" height="100" rx="6" fill="#374151" stroke="#f97316" strokeWidth="2" />
    <text x="865" y="85" textAnchor="middle" fill="#f97316" fontSize="10" fontWeight="bold" transform="rotate(-90, 865, 105)">Results</text>

    <rect x="30" y="190" width="400" height="80" rx="8" fill="#374151" stroke="#3b82f6" strokeWidth="2" />
    <text x="230" y="215" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold">Faceted Search (Aggregations)</text>

    <rect x="50" y="230" width="70" height="28" rx="4" fill="#1e3a5f" stroke="#3b82f6" />
    <text x="85" y="248" textAnchor="middle" fill="white" fontSize="9">Category</text>

    <rect x="130" y="230" width="70" height="28" rx="4" fill="#1e3a5f" stroke="#3b82f6" />
    <text x="165" y="248" textAnchor="middle" fill="white" fontSize="9">Brand</text>

    <rect x="210" y="230" width="70" height="28" rx="4" fill="#1e3a5f" stroke="#3b82f6" />
    <text x="245" y="248" textAnchor="middle" fill="white" fontSize="9">Price</text>

    <rect x="290" y="230" width="70" height="28" rx="4" fill="#1e3a5f" stroke="#3b82f6" />
    <text x="325" y="248" textAnchor="middle" fill="white" fontSize="9">Rating</text>

    <rect x="470" y="190" width="400" height="80" rx="8" fill="#374151" stroke="#eab308" strokeWidth="2" />
    <text x="670" y="215" textAnchor="middle" fill="#eab308" fontSize="13" fontWeight="bold">Autocomplete (Edge N-grams)</text>

    <rect x="490" y="230" width="90" height="28" rx="4" fill="#1e3a5f" stroke="#eab308" />
    <text x="535" y="248" textAnchor="middle" fill="white" fontSize="9">{`lap -&gt; laptop`}</text>

    <rect x="590" y="230" width="90" height="28" rx="4" fill="#1e3a5f" stroke="#eab308" />
    <text x="635" y="248" textAnchor="middle" fill="white" fontSize="9">Suggestions</text>

    <rect x="690" y="230" width="90" height="28" rx="4" fill="#1e3a5f" stroke="#eab308" />
    <text x="735" y="248" textAnchor="middle" fill="white" fontSize="9">Popular</text>

    <rect x="150" y="300" width="600" height="60" rx="8" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="2" />
    <text x="450" y="325" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="bold">{`Performance: &lt;200ms p95 | 10K QPS | 99.9% Availability`}</text>
    <text x="450" y="345" textAnchor="middle" fill="white" fontSize="10">Cached queries: ~50ms | Result caching: 10-min TTL</text>
  </svg>
)

// 5. Recommendation system diagram
const RecommendationDiagram = () => (
  <svg viewBox="0 0 900 420" style={{ width: '100%', maxWidth: '900px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <linearGradient id="userGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="collabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <linearGradient id="contentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
      <linearGradient id="hybridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <marker id="recArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#f97316" />
      </marker>
    </defs>

    <rect width="900" height="420" fill="#1f2937" rx="10" />
    <text x="450" y="30" textAnchor="middle" fill="#f97316" fontSize="18" fontWeight="bold">"Customers Who Bought This Also Bought" Recommendation Engine</text>

    <rect x="30" y="70" width="160" height="120" rx="8" fill="url(#userGrad)" fillOpacity="0.3" stroke="#f97316" strokeWidth="2" />
    <text x="110" y="95" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="bold">User Data</text>

    <rect x="45" y="105" width="130" height="25" rx="4" fill="#374151" />
    <text x="110" y="122" textAnchor="middle" fill="white" fontSize="9">Browse History</text>

    <rect x="45" y="135" width="130" height="25" rx="4" fill="#374151" />
    <text x="110" y="152" textAnchor="middle" fill="white" fontSize="9">Purchase History</text>

    <rect x="45" y="165" width="130" height="25" rx="4" fill="#374151" />
    <text x="110" y="182" textAnchor="middle" fill="white" fontSize="9">Cart Items</text>

    <line x1="190" y1="100" x2="250" y2="100" stroke="#f97316" strokeWidth="2" markerEnd="url(#recArrow)" />
    <line x1="190" y1="160" x2="250" y2="160" stroke="#f97316" strokeWidth="2" markerEnd="url(#recArrow)" />

    <rect x="255" y="55" width="180" height="90" rx="8" fill="url(#collabGrad)" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" />
    <text x="345" y="80" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">Collaborative Filtering</text>
    <text x="345" y="100" textAnchor="middle" fill="white" fontSize="9">User-User Similarity</text>
    <text x="345" y="115" textAnchor="middle" fill="#9ca3af" fontSize="8">Item-Item Co-occurrence</text>
    <rect x="275" y="125" width="140" height="15" rx="3" fill="#1e3a5f" />
    <text x="345" y="136" textAnchor="middle" fill="white" fontSize="8">Matrix Factorization</text>

    <rect x="255" y="155" width="180" height="90" rx="8" fill="url(#contentGrad)" fillOpacity="0.3" stroke="#22c55e" strokeWidth="2" />
    <text x="345" y="180" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">Content-Based</text>
    <text x="345" y="200" textAnchor="middle" fill="white" fontSize="9">Product Attributes</text>
    <text x="345" y="215" textAnchor="middle" fill="#9ca3af" fontSize="8">Category, Brand, Features</text>
    <rect x="275" y="225" width="140" height="15" rx="3" fill="#1e3a5f" />
    <text x="345" y="236" textAnchor="middle" fill="white" fontSize="8">TF-IDF Similarity</text>

    <line x1="435" y1="100" x2="495" y2="150" stroke="#f97316" strokeWidth="2" markerEnd="url(#recArrow)" />
    <line x1="435" y1="200" x2="495" y2="180" stroke="#f97316" strokeWidth="2" markerEnd="url(#recArrow)" />

    <rect x="500" y="110" width="180" height="120" rx="10" fill="url(#hybridGrad)" fillOpacity="0.3" stroke="#8b5cf6" strokeWidth="2" />
    <text x="590" y="140" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">Hybrid ML Model</text>

    <rect x="515" y="150" width="150" height="25" rx="4" fill="#1e3a5f" stroke="#8b5cf6" />
    <text x="590" y="167" textAnchor="middle" fill="white" fontSize="9">Deep Learning (Embeddings)</text>

    <rect x="515" y="180" width="150" height="25" rx="4" fill="#1e3a5f" stroke="#8b5cf6" />
    <text x="590" y="197" textAnchor="middle" fill="white" fontSize="9">Real-time Personalization</text>

    <text x="590" y="220" textAnchor="middle" fill="#9ca3af" fontSize="8">A/B Testing | CTR Optimization</text>

    <line x1="680" y1="170" x2="730" y2="170" stroke="#f97316" strokeWidth="2" markerEnd="url(#recArrow)" />

    <rect x="735" y="70" width="150" height="200" rx="8" fill="#374151" stroke="#f97316" strokeWidth="2" />
    <text x="810" y="95" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="bold">Recommendations</text>

    <rect x="750" y="110" width="120" height="35" rx="4" fill="#f97316" fillOpacity="0.2" stroke="#f97316" />
    <text x="810" y="125" textAnchor="middle" fill="white" fontSize="9">Also Bought</text>
    <text x="810" y="140" textAnchor="middle" fill="#9ca3af" fontSize="8">High confidence</text>

    <rect x="750" y="155" width="120" height="35" rx="4" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" />
    <text x="810" y="170" textAnchor="middle" fill="white" fontSize="9">Similar Items</text>
    <text x="810" y="185" textAnchor="middle" fill="#9ca3af" fontSize="8">Content match</text>

    <rect x="750" y="200" width="120" height="35" rx="4" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" />
    <text x="810" y="215" textAnchor="middle" fill="white" fontSize="9">Trending Now</text>
    <text x="810" y="230" textAnchor="middle" fill="#9ca3af" fontSize="8">Popular in category</text>

    <rect x="750" y="245" width="120" height="15" rx="3" fill="#1e3a5f" />
    <text x="810" y="256" textAnchor="middle" fill="white" fontSize="8">Personalized for You</text>

    <rect x="100" y="280" width="200" height="100" rx="8" fill="#374151" stroke="#ec4899" strokeWidth="2" />
    <text x="200" y="305" textAnchor="middle" fill="#ec4899" fontSize="12" fontWeight="bold">Neo4j Graph DB</text>
    <text x="200" y="325" textAnchor="middle" fill="white" fontSize="10">Product Relationships</text>
    <text x="200" y="345" textAnchor="middle" fill="#9ca3af" fontSize="9">User-Product-Category Graph</text>
    <text x="200" y="365" textAnchor="middle" fill="#9ca3af" fontSize="8">Cypher queries for traversal</text>

    <rect x="350" y="280" width="200" height="100" rx="8" fill="#374151" stroke="#ef4444" strokeWidth="2" />
    <text x="450" y="305" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Redis Cache</text>
    <text x="450" y="325" textAnchor="middle" fill="white" fontSize="10">Pre-computed Recs</text>
    <text x="450" y="345" textAnchor="middle" fill="#9ca3af" fontSize="9">Per-product: Top 20 items</text>
    <text x="450" y="365" textAnchor="middle" fill="#9ca3af" fontSize="8">TTL: 1 hour | Sub-ms latency</text>

    <rect x="600" y="280" width="200" height="100" rx="8" fill="#374151" stroke="#f97316" strokeWidth="2" />
    <text x="700" y="305" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="bold">Kafka Streams</text>
    <text x="700" y="325" textAnchor="middle" fill="white" fontSize="10">Real-time Events</text>
    <text x="700" y="345" textAnchor="middle" fill="#9ca3af" fontSize="9">clicks, views, purchases</text>
    <text x="700" y="365" textAnchor="middle" fill="#9ca3af" fontSize="8">Model retraining triggers</text>

    <line x1="200" y1="245" x2="200" y2="280" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4" />
    <line x1="450" y1="245" x2="450" y2="280" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4" />
    <line x1="700" y1="245" x2="700" y2="280" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4" />
  </svg>
)

// 6. Shopping Cart Diagram
const ShoppingCartDiagram = () => (
  <svg viewBox="0 0 800 300" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="cartArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#f97316" />
      </marker>
    </defs>

    <rect width="800" height="300" fill="#1f2937" rx="10" />
    <text x="400" y="30" textAnchor="middle" fill="#f97316" fontSize="16" fontWeight="bold">Shopping Cart Storage Architecture</text>

    <rect x="50" y="60" width="160" height="100" rx="8" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" />
    <text x="130" y="90" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">Logged-in Users</text>
    <text x="130" y="115" textAnchor="middle" fill="white" fontSize="10">DynamoDB Storage</text>
    <text x="130" y="135" textAnchor="middle" fill="#9ca3af" fontSize="9">Key: user_id</text>
    <text x="130" y="150" textAnchor="middle" fill="#9ca3af" fontSize="9">TTL: 90 days</text>

    <rect x="250" y="60" width="160" height="100" rx="8" fill="#ef4444" fillOpacity="0.3" stroke="#ef4444" strokeWidth="2" />
    <text x="330" y="90" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Anonymous Users</text>
    <text x="330" y="115" textAnchor="middle" fill="white" fontSize="10">Redis Storage</text>
    <text x="330" y="135" textAnchor="middle" fill="#9ca3af" fontSize="9">Key: session_id</text>
    <text x="330" y="150" textAnchor="middle" fill="#9ca3af" fontSize="9">TTL: 7 days</text>

    <rect x="450" y="60" width="300" height="100" rx="8" fill="#22c55e" fillOpacity="0.3" stroke="#22c55e" strokeWidth="2" />
    <text x="600" y="90" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Cart Service</text>
    <text x="600" y="115" textAnchor="middle" fill="white" fontSize="10">Add/Remove/Update Items</text>
    <text x="600" y="135" textAnchor="middle" fill="#9ca3af" fontSize="9">Price verification | Stock check</text>
    <text x="600" y="150" textAnchor="middle" fill="#9ca3af" fontSize="9">Cart merging on login</text>

    <line x1="210" y1="110" x2="450" y2="110" stroke="#f97316" strokeWidth="2" markerEnd="url(#cartArrow)" />
    <line x1="410" y1="110" x2="450" y2="110" stroke="#f97316" strokeWidth="2" markerEnd="url(#cartArrow)" />

    <rect x="150" y="200" width="500" height="80" rx="8" fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="2" />
    <text x="400" y="230" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="bold">Cart Features</text>
    <text x="250" y="255" textAnchor="middle" fill="white" fontSize="9">Real-time price updates</text>
    <text x="400" y="255" textAnchor="middle" fill="white" fontSize="9">Stock availability check</text>
    <text x="550" y="255" textAnchor="middle" fill="white" fontSize="9">Save for later</text>
  </svg>
)

// 7. Saga Pattern Diagram
const SagaPatternDiagram = () => (
  <svg viewBox="0 0 800 250" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="sagaArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
      </marker>
      <marker id="sagaRollback" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#ef4444" />
      </marker>
    </defs>

    <rect width="800" height="250" fill="#1f2937" rx="10" />
    <text x="400" y="25" textAnchor="middle" fill="#f97316" fontSize="16" fontWeight="bold">Saga Pattern: Order Processing</text>

    <rect x="30" y="50" width="140" height="60" rx="6" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" />
    <text x="100" y="75" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">1. Reserve</text>
    <text x="100" y="95" textAnchor="middle" fill="white" fontSize="9">Inventory</text>

    <line x1="170" y1="80" x2="220" y2="80" stroke="#22c55e" strokeWidth="2" markerEnd="url(#sagaArrow)" />

    <rect x="225" y="50" width="140" height="60" rx="6" fill="#22c55e" fillOpacity="0.3" stroke="#22c55e" strokeWidth="2" />
    <text x="295" y="75" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">2. Process</text>
    <text x="295" y="95" textAnchor="middle" fill="white" fontSize="9">Payment</text>

    <line x1="365" y1="80" x2="415" y2="80" stroke="#22c55e" strokeWidth="2" markerEnd="url(#sagaArrow)" />

    <rect x="420" y="50" width="140" height="60" rx="6" fill="#8b5cf6" fillOpacity="0.3" stroke="#8b5cf6" strokeWidth="2" />
    <text x="490" y="75" textAnchor="middle" fill="#8b5cf6" fontSize="10" fontWeight="bold">3. Create</text>
    <text x="490" y="95" textAnchor="middle" fill="white" fontSize="9">Shipment</text>

    <line x1="560" y1="80" x2="610" y2="80" stroke="#22c55e" strokeWidth="2" markerEnd="url(#sagaArrow)" />

    <rect x="615" y="50" width="140" height="60" rx="6" fill="#f97316" fillOpacity="0.3" stroke="#f97316" strokeWidth="2" />
    <text x="685" y="75" textAnchor="middle" fill="#f97316" fontSize="10" fontWeight="bold">4. Send</text>
    <text x="685" y="95" textAnchor="middle" fill="white" fontSize="9">Confirmation</text>

    <text x="400" y="140" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">Compensating Transactions (Rollback)</text>

    <rect x="30" y="160" width="140" height="50" rx="6" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1" strokeDasharray="4" />
    <text x="100" y="185" textAnchor="middle" fill="#ef4444" fontSize="9">Release Inventory</text>

    <rect x="225" y="160" width="140" height="50" rx="6" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1" strokeDasharray="4" />
    <text x="295" y="185" textAnchor="middle" fill="#ef4444" fontSize="9">Refund Payment</text>

    <rect x="420" y="160" width="140" height="50" rx="6" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1" strokeDasharray="4" />
    <text x="490" y="185" textAnchor="middle" fill="#ef4444" fontSize="9">Cancel Shipment</text>

    <rect x="615" y="160" width="140" height="50" rx="6" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1" strokeDasharray="4" />
    <text x="685" y="185" textAnchor="middle" fill="#ef4444" fontSize="9">Cancel Email</text>

    <line x1="170" y1="185" x2="120" y2="185" stroke="#ef4444" strokeWidth="1" strokeDasharray="4" markerEnd="url(#sagaRollback)" />
    <line x1="365" y1="185" x2="315" y2="185" stroke="#ef4444" strokeWidth="1" strokeDasharray="4" markerEnd="url(#sagaRollback)" />
    <line x1="560" y1="185" x2="510" y2="185" stroke="#ef4444" strokeWidth="1" strokeDasharray="4" markerEnd="url(#sagaRollback)" />
    <line x1="755" y1="185" x2="705" y2="185" stroke="#ef4444" strokeWidth="1" strokeDasharray="4" markerEnd="url(#sagaRollback)" />
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Amazon({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'architecture',
      name: 'E-Commerce Architecture',
      icon: '🏗️',
      color: '#f97316',
      description: 'High-level system architecture with microservices, API gateway, CDN, and polyglot persistence for handling millions of requests.',
      diagram: AmazonArchitectureDiagram,
      details: [
        {
          name: 'System Overview',
          diagram: AmazonArchitectureDiagram,
          explanation: 'Amazon-scale e-commerce requires a highly scalable platform handling 300M+ active customers, 12M+ products, 5B+ orders/year, and 100K peak orders/minute. The architecture follows microservices patterns with API Gateway for routing, CloudFront CDN for static assets, and polyglot persistence with PostgreSQL, DynamoDB, Elasticsearch, Redis, S3, Cassandra, Kafka, and Neo4j.',
          codeExample: `// Microservices Architecture Configuration
@Configuration
public class ServiceDiscoveryConfig {

    @Bean
    public LoadBalancer loadBalancer() {
        return LoadBalancer.builder()
            .strategy(RoundRobin.class)
            .healthCheck("/health", Duration.ofSeconds(30))
            .build();
    }

    @Bean
    public CircuitBreaker circuitBreaker() {
        return CircuitBreaker.builder()
            .failureThreshold(5)
            .waitDuration(Duration.ofSeconds(30))
            .build();
    }
}`
        },
        {
          name: 'Design Patterns',
          explanation: 'Key design patterns include CQRS (Command Query Responsibility Segregation) for separating read/write operations, Event Sourcing for storing order state changes as events, Saga Pattern for distributed transactions, and Circuit Breaker for preventing cascade failures across microservices.',
          codeExample: `// CQRS Pattern Implementation
public interface CommandHandler<T extends Command> {
    void handle(T command);
}

public interface QueryHandler<Q extends Query, R> {
    R handle(Q query);
}

// Order Command Handler (Write)
@Service
public class CreateOrderCommandHandler
    implements CommandHandler<CreateOrderCommand> {

    @Override
    public void handle(CreateOrderCommand command) {
        Order order = Order.create(command);
        orderRepository.save(order);
        eventPublisher.publish(new OrderCreatedEvent(order));
    }
}

// Order Query Handler (Read)
@Service
public class GetOrderQueryHandler
    implements QueryHandler<GetOrderQuery, OrderDTO> {

    @Override
    public OrderDTO handle(GetOrderQuery query) {
        return orderReadRepository
            .findById(query.getOrderId());
    }
}`
        },
        {
          name: 'API Gateway',
          explanation: 'The API Gateway handles authentication, rate limiting (1000 req/min per user), request routing, SSL termination, and request/response transformation. It provides a unified entry point for all client applications including Web, iOS, Android, and Alexa devices.',
          codeExample: `// API Gateway Route Configuration
spring:
  cloud:
    gateway:
      routes:
        - id: product-service
          uri: lb://product-service
          predicates:
            - Path=/api/v1/products/**
          filters:
            - RewritePath=/api/v1/(?<segment>.*), /\${segment}
            - name: CircuitBreaker
              args:
                name: productServiceCB
                fallbackUri: forward:/fallback/products
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 100
                redis-rate-limiter.burstCapacity: 200
                key-resolver: "#{@userKeyResolver}"`
        }
      ]
    },
    {
      id: 'catalog',
      name: 'Product Catalog',
      icon: '📦',
      color: '#3b82f6',
      description: 'Product data management with 12M+ SKUs, search indexing with Elasticsearch, and multi-warehouse inventory tracking.',
      diagram: SearchServiceDiagram,
      details: [
        {
          name: 'Product Search',
          diagram: SearchServiceDiagram,
          explanation: 'Product search uses Elasticsearch cluster with 50+ nodes indexing 12M+ products. Features include BM25 relevance scoring, N-gram tokenization for fuzzy matching, spell correction, and faceted search with category/brand/price/rating aggregations. Autocomplete uses edge N-grams for prefix matching. Target: <200ms p95 latency at 10K QPS.',
          codeExample: `// Elasticsearch Product Search Query
{
  "query": {
    "bool": {
      "must": [
        {
          "multi_match": {
            "query": "laptop gaming",
            "fields": ["name^3", "description", "brand^2"],
            "type": "best_fields",
            "fuzziness": "AUTO"
          }
        }
      ],
      "filter": [
        { "term": { "in_stock": true } },
        { "range": { "price": { "lte": 2000 } } }
      ]
    }
  },
  "aggs": {
    "categories": { "terms": { "field": "category" } },
    "brands": { "terms": { "field": "brand" } },
    "price_ranges": {
      "range": {
        "field": "price",
        "ranges": [
          { "to": 500 },
          { "from": 500, "to": 1000 },
          { "from": 1000 }
        ]
      }
    }
  }
}`
        },
        {
          name: 'Inventory Management',
          diagram: InventoryManagementDiagram,
          explanation: 'Real-time inventory management across multiple fulfillment centers (NYC, LA, TX, FL). Features include optimistic locking with version control to prevent overselling, Redis caching for hot products (80/20 rule with 5-min TTL), and PostgreSQL sharding by product_id with 5x read replicas. Kafka handles inventory-updates, stock-alerts, and reorder-triggers.',
          codeExample: `// Optimistic Locking for Inventory
@Entity
public class Inventory {
    @Id
    private UUID productId;

    @Version
    private Long version;

    private Integer availableQuantity;
    private Integer reservedQuantity;

    public boolean reserve(int quantity) {
        if (availableQuantity >= quantity) {
            availableQuantity -= quantity;
            reservedQuantity += quantity;
            return true;
        }
        return false;
    }
}

// Service with retry on optimistic lock failure
@Service
public class InventoryService {
    @Retryable(
        value = OptimisticLockException.class,
        maxAttempts = 3,
        backoff = @Backoff(delay = 100)
    )
    @Transactional
    public void reserveInventory(UUID productId, int qty) {
        Inventory inv = inventoryRepo.findById(productId)
            .orElseThrow();
        if (!inv.reserve(qty)) {
            throw new InsufficientStockException();
        }
        inventoryRepo.save(inv);
    }
}`
        },
        {
          name: 'Product Data Model',
          explanation: 'Products have hierarchical structure with UUID identifiers, category relationships, pricing, images stored in S3, and JSON attributes for flexible schema. Multi-warehouse support tracks inventory per fulfillment center with real-time aggregation across all locations.',
          codeExample: `// Product Entity
@Entity
@Table(name = "products")
public class Product {
    @Id
    private UUID productId;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    private Category category;

    private String brand;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    @ElementCollection
    private List<String> imageUrls;

    @Type(type = "jsonb")
    private Map<String, Object> attributes;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

// GET /products/:id Response
{
  "id": "B08N5WRWNW",
  "name": "Echo Dot (4th Gen)",
  "price": 49.99,
  "rating": 4.7,
  "reviews_count": 54321,
  "in_stock": true,
  "inventory_count": 1250
}`
        }
      ]
    },
    {
      id: 'shopping',
      name: 'Shopping Cart',
      icon: '🛒',
      color: '#22c55e',
      description: 'Shopping cart with dual storage strategy - DynamoDB for logged-in users and Redis for anonymous sessions with cart merging on login.',
      diagram: ShoppingCartDiagram,
      details: [
        {
          name: 'Cart Storage Strategy',
          diagram: ShoppingCartDiagram,
          explanation: 'Logged-in users have carts persisted in DynamoDB with 90-day TTL, keyed by user_id for long-term persistence. Anonymous users have carts in Redis with session_id key and 7-day TTL. On login, anonymous cart is merged with existing user cart, handling quantity conflicts and price updates.',
          codeExample: `// Cart Service Implementation
@Service
public class CartService {
    private final DynamoDBMapper dynamoMapper;
    private final RedisTemplate<String, Cart> redisTemplate;

    public Cart getCart(String userId, String sessionId) {
        if (userId != null) {
            return dynamoMapper.load(Cart.class, userId);
        }
        return redisTemplate.opsForValue()
            .get("cart:" + sessionId);
    }

    public void mergeCarts(String userId, String sessionId) {
        Cart userCart = getCart(userId, null);
        Cart sessionCart = getCart(null, sessionId);

        if (sessionCart != null) {
            for (CartItem item : sessionCart.getItems()) {
                userCart.addItem(item);
            }
            dynamoMapper.save(userCart);
            redisTemplate.delete("cart:" + sessionId);
        }
    }
}`
        },
        {
          name: 'Cart API',
          explanation: 'Cart service exposes REST endpoints for managing cart items including add, update quantity, remove, and fetch operations. Real-time price verification ensures customers see accurate prices, and stock availability is checked before checkout.',
          codeExample: `// Cart REST API
GET /cart
{
  "cart_id": "cart_abc123",
  "user_id": "user_789",
  "items": [
    {
      "product_id": "B08N5WRWNW",
      "quantity": 2,
      "price": 49.99
    }
  ],
  "subtotal": 99.98,
  "tax": 8.50,
  "total": 108.48
}

POST /cart/items  // Add item
PUT /cart/items/:id  // Update quantity
DELETE /cart/items/:id  // Remove item

// Cart Controller
@RestController
@RequestMapping("/cart")
public class CartController {

    @PostMapping("/items")
    public ResponseEntity<Cart> addItem(
        @RequestBody AddItemRequest request,
        @AuthenticationPrincipal User user) {

        // Verify product exists and is in stock
        Product product = productService
            .findById(request.getProductId())
            .orElseThrow(ProductNotFoundException::new);

        if (!product.isInStock()) {
            throw new OutOfStockException();
        }

        Cart cart = cartService.addItem(
            user.getId(),
            request.getProductId(),
            request.getQuantity()
        );
        return ResponseEntity.ok(cart);
    }
}`
        },
        {
          name: 'Checkout Flow',
          explanation: 'Seven-step checkout: Cart Review (verify prices, check availability), Shipping Address (select/add, validate), Shipping Options (Standard/Express/Prime), Payment Method (Credit/Debit/Gift Card), Order Review (apply promo codes), Payment Processing (Stripe/fraud detection/3D Secure), Order Confirmation (email, tracking number).',
          codeExample: `// Checkout Flow Orchestrator
@Service
public class CheckoutService {

    @Transactional
    public Order checkout(CheckoutRequest request) {
        // Step 1: Validate cart
        Cart cart = cartService.getCart(request.getUserId());
        validateCart(cart);

        // Step 2: Verify shipping address
        Address address = addressService
            .validate(request.getShippingAddressId());

        // Step 3: Calculate shipping
        ShippingOption shipping = shippingService
            .calculate(cart, address, request.getShippingOption());

        // Step 4: Apply promo codes
        Discount discount = promoService
            .apply(cart, request.getPromoCode());

        // Step 5: Create order
        Order order = orderService.create(
            cart, address, shipping, discount);

        // Step 6: Process payment
        paymentService.process(
            order, request.getPaymentMethodId());

        // Step 7: Send confirmation
        notificationService.sendOrderConfirmation(order);

        return order;
    }
}`
        }
      ]
    },
    {
      id: 'order',
      name: 'Order Processing',
      icon: '📮',
      color: '#8b5cf6',
      description: 'Distributed order processing using Saga pattern with compensating transactions for inventory, payment, shipping, and notifications.',
      diagram: OrderFlowDiagram,
      details: [
        {
          name: 'Order Lifecycle',
          diagram: OrderFlowDiagram,
          explanation: 'Order flows through states: ORDER_PLACED -> PAYMENT_CONFIRMED -> PREPARING_FOR_SHIPMENT -> SHIPPED -> OUT_FOR_DELIVERY -> DELIVERED. Each transition publishes events to Kafka for analytics, notifications, and downstream services. The event bus enables real-time tracking and status updates.',
          codeExample: `// Order State Machine
public enum OrderStatus {
    ORDER_PLACED,
    PAYMENT_CONFIRMED,
    PREPARING_FOR_SHIPMENT,
    SHIPPED,
    OUT_FOR_DELIVERY,
    DELIVERED,
    CANCELLED,
    RETURNED
}

@Entity
public class Order {
    @Id
    private String orderId;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private String trackingNumber;
    private LocalDate estimatedDelivery;

    @OneToMany(cascade = CascadeType.ALL)
    private List<OrderItem> items;

    @Column(precision = 10, scale = 2)
    private BigDecimal total;

    public void transitionTo(OrderStatus newStatus) {
        validateTransition(this.status, newStatus);
        this.status = newStatus;
        DomainEvents.publish(
            new OrderStatusChangedEvent(this));
    }
}`
        },
        {
          name: 'Saga Pattern',
          diagram: SagaPatternDiagram,
          explanation: 'Distributed transactions use Saga pattern with compensating actions: (1) Reserve Inventory - compensate: Release, (2) Process Payment - compensate: Refund, (3) Create Shipment - compensate: Cancel, (4) Send Confirmation - compensate: Cancel Email. Saga orchestrator coordinates the flow and triggers rollbacks on failure.',
          codeExample: `// Saga Orchestrator
@Service
public class OrderSagaOrchestrator {

    public void executeOrderSaga(OrderCommand cmd) {
        SagaExecution saga = SagaExecution.start();

        try {
            // Step 1: Reserve Inventory
            saga.execute(
                () -> inventoryService.reserve(cmd),
                () -> inventoryService.release(cmd));

            // Step 2: Process Payment
            saga.execute(
                () -> paymentService.charge(cmd),
                () -> paymentService.refund(cmd));

            // Step 3: Create Shipment
            saga.execute(
                () -> shippingService.createShipment(cmd),
                () -> shippingService.cancelShipment(cmd));

            // Step 4: Send Confirmation
            saga.execute(
                () -> notificationService.sendConfirmation(cmd),
                () -> notificationService.sendCancellation(cmd));

            saga.complete();

        } catch (SagaException e) {
            saga.compensate(); // Rollback all completed steps
            throw new OrderProcessingException(e);
        }
    }
}`
        },
        {
          name: 'Fulfillment Center Selection',
          explanation: 'Order allocation considers geographic proximity (nearest FC to customer), inventory availability (real-time stock across FCs), load balancing (prevent FC overload), and cost optimization (minimize shipping while meeting SLAs). Real-time tracking integrates with FedEx/UPS/USPS APIs and Amazon Logistics GPS.',
          codeExample: `// Fulfillment Center Selection
@Service
public class FulfillmentService {

    public FulfillmentCenter selectOptimalFC(
            Order order, Address destination) {

        List<FulfillmentCenter> candidates =
            inventoryService.findFCsWithStock(order.getItems());

        return candidates.stream()
            .map(fc -> new FCScore(
                fc,
                calculateDistanceScore(fc, destination),
                calculateLoadScore(fc),
                calculateCostScore(fc, destination)
            ))
            .min(Comparator.comparing(FCScore::total))
            .map(FCScore::getFC)
            .orElseThrow(NoFCAvailableException::new);
    }

    private double calculateDistanceScore(
            FulfillmentCenter fc, Address dest) {
        return geoService.distanceKm(
            fc.getLocation(), dest.getCoordinates());
    }
}

// Order Tracking API
GET /orders/:id
{
  "order_id": "112-1234567-8901234",
  "status": "shipped",
  "tracking_number": "1Z999AA10123456789",
  "estimated_delivery": "2024-01-20",
  "items": [...],
  "total": 108.48
}`
        }
      ]
    },
    {
      id: 'recommendations',
      name: 'Recommendations',
      icon: '🎯',
      color: '#ec4899',
      description: '"Customers Who Bought This Also Bought" recommendation engine using collaborative filtering, content-based, and hybrid ML models.',
      diagram: RecommendationDiagram,
      details: [
        {
          name: 'Recommendation Engine',
          diagram: RecommendationDiagram,
          explanation: 'Hybrid recommendation system combines Collaborative Filtering (user-user similarity, item-item co-occurrence, matrix factorization), Content-Based (product attributes, TF-IDF similarity), and Deep Learning (embeddings, real-time personalization). Output includes Also Bought, Similar Items, Trending Now, and Personalized For You sections.',
          codeExample: `// Collaborative Filtering Service
@Service
public class CollaborativeFilteringService {

    public List<Product> getRecommendations(
            String userId, int limit) {

        // Get user's purchase history
        List<String> purchasedItems =
            orderService.getPurchasedProductIds(userId);

        // Find similar users (cosine similarity)
        List<String> similarUsers =
            findSimilarUsers(userId, purchasedItems);

        // Get items purchased by similar users
        return similarUsers.stream()
            .flatMap(u -> orderService
                .getPurchasedProductIds(u).stream())
            .filter(p -> !purchasedItems.contains(p))
            .collect(Collectors.groupingBy(
                Function.identity(), Collectors.counting()))
            .entrySet().stream()
            .sorted(Map.Entry.<String, Long>comparingByValue()
                .reversed())
            .limit(limit)
            .map(e -> productService.findById(e.getKey()))
            .filter(Optional::isPresent)
            .map(Optional::get)
            .toList();
    }
}`
        },
        {
          name: 'Graph Database',
          explanation: 'Neo4j stores product relationships in a User-Product-Category graph structure. Cypher queries enable traversal for recommendations, finding products frequently bought together, and discovering category relationships. Pre-computed recommendations are cached in Redis with 1-hour TTL for sub-millisecond latency.',
          codeExample: `// Neo4j Cypher Query for Recommendations
MATCH (u:User {id: $userId})-[:PURCHASED]->(p:Product)
MATCH (p)<-[:PURCHASED]-(other:User)
MATCH (other)-[:PURCHASED]->(rec:Product)
WHERE NOT (u)-[:PURCHASED]->(rec)
WITH rec, COUNT(*) AS frequency
ORDER BY frequency DESC
LIMIT 20
RETURN rec.id, rec.name, frequency

// Redis Caching for Recommendations
@Service
public class RecommendationCache {

    @Cacheable(
        value = "recommendations",
        key = "#productId",
        unless = "#result.isEmpty()"
    )
    public List<ProductRecommendation> getRecommendations(
            String productId) {

        return recommendationEngine.compute(productId);
    }

    // TTL: 1 hour
    @Scheduled(fixedRate = 3600000)
    public void refreshCache() {
        hotProducts.forEach(p ->
            getRecommendations(p.getId()));
    }
}`
        },
        {
          name: 'Real-time Events',
          explanation: 'Kafka Streams processes real-time user events (clicks, views, purchases) to update recommendations. A/B testing optimizes for click-through rate. Model retraining is triggered based on event volume and performance metrics, enabling continuous improvement of recommendation quality.',
          codeExample: `// Kafka Streams for Real-time Events
@Component
public class UserEventProcessor {

    @Bean
    public KStream<String, UserEvent> processUserEvents(
            StreamsBuilder builder) {

        return builder.stream("user-events")
            .filter((k, v) -> v.getType() == EventType.PURCHASE)
            .peek((k, v) -> updateRecommendationModel(v))
            .groupBy((k, v) -> v.getProductId())
            .windowedBy(TimeWindows.of(Duration.ofMinutes(5)))
            .count()
            .toStream()
            .filter((k, count) -> count > TRENDING_THRESHOLD)
            .map((k, count) -> KeyValue.pair(
                k.key(), new TrendingProduct(k.key(), count)))
            .to("trending-products");
    }

    private void updateRecommendationModel(UserEvent event) {
        // Update co-occurrence matrix
        cooccurrenceService.recordPurchase(
            event.getUserId(),
            event.getProductId(),
            event.getRelatedProducts()
        );
    }
}`
        }
      ]
    },
    {
      id: 'scalability',
      name: 'Scalability',
      icon: '⚡',
      color: '#eab308',
      description: 'Scaling strategies including database sharding, multi-layer caching, connection pooling, and auto-scaling for handling 10M concurrent users.',
      details: [
        {
          name: 'Database Scaling',
          explanation: 'Horizontal scaling through sharding: Product DB by product_id, User DB by user_id, Order DB by order_id. Read replicas (95% reads, 5% writes) with 5x replicas per shard. Connection pooling via PgBouncer/RDS Proxy manages thousands of concurrent connections.',
          codeExample: `// Database Sharding Configuration
@Configuration
public class ShardingConfig {

    @Bean
    public ShardingDataSource shardingDataSource() {
        return ShardingDataSource.builder()
            .addDataSource("ds0", createDataSource("shard-0"))
            .addDataSource("ds1", createDataSource("shard-1"))
            .addDataSource("ds2", createDataSource("shard-2"))
            .addDataSource("ds3", createDataSource("shard-3"))
            .shardingRule(
                ShardingRule.builder()
                    .table("products")
                    .shardingColumn("product_id")
                    .algorithm(ModuloShardingAlgorithm.class)
                    .build()
            )
            .readWriteSplit(
                ReadWriteSplitRule.builder()
                    .master("master")
                    .replicas("replica1", "replica2", "replica3")
                    .loadBalancer(RoundRobinLoadBalancer.class)
                    .build()
            )
            .build();
    }
}`
        },
        {
          name: 'Caching Strategy',
          explanation: 'Four-layer caching: (1) CDN/CloudFront for static assets with 7-day TTL, (2) Redis application cache for hot products and sessions with 5-30 min TTL, (3) Elasticsearch result cache for search queries with 10-min TTL, (4) Browser cache for client-side caching of images and API responses.',
          codeExample: `// Multi-Layer Caching
@Service
public class ProductService {

    // L1: Local Cache (Caffeine)
    @Cacheable(
        cacheManager = "localCacheManager",
        value = "products",
        key = "#id"
    )
    public Product getProductL1(String id) {
        return getProductL2(id);
    }

    // L2: Distributed Cache (Redis)
    @Cacheable(
        cacheManager = "redisCacheManager",
        value = "products",
        key = "#id",
        unless = "#result == null"
    )
    public Product getProductL2(String id) {
        return productRepository.findById(id);
    }
}

// Cache Configuration
spring:
  cache:
    type: redis
    redis:
      time-to-live: 300000  # 5 minutes
      cache-null-values: false
  data:
    redis:
      cluster:
        nodes: redis-1:6379,redis-2:6379,redis-3:6379`
        },
        {
          name: 'Performance Targets',
          explanation: 'System targets: <200ms product search p95, <100ms add to cart p95, <3 sec checkout p95, 99.99% availability (53 min/year downtime), 100K orders/minute peak, 10M concurrent users. Monitoring via Datadog/CloudWatch for metrics, ELK for logging, Jaeger/X-Ray for distributed tracing, PagerDuty for alerting.',
          codeExample: `// Performance Monitoring Configuration
@Configuration
public class ObservabilityConfig {

    @Bean
    public MeterRegistry meterRegistry() {
        return new CompositeMeterRegistry()
            .add(new DatadogMeterRegistry(config, clock))
            .add(new CloudWatchMeterRegistry(config, clock));
    }

    @Bean
    public Tracer tracer() {
        return JaegerTracer.builder()
            .serviceName("amazon-order-service")
            .sampler(Sampler.ALWAYS_SAMPLE)
            .build();
    }
}

// SLA Metrics
@Timed(
    value = "order.checkout",
    histogram = true,
    percentiles = {0.5, 0.95, 0.99}
)
public Order checkout(CheckoutRequest request) {
    // Target: p95 < 3 seconds
    return checkoutService.process(request);
}

// Health Check
@Component
public class HealthIndicator implements ReactiveHealthIndicator {
    @Override
    public Mono<Health> health() {
        return checkDependencies()
            .map(status -> status ? Health.up() : Health.down())
            .onErrorReturn(Health.down().build());
    }
}`
        }
      ]
    },
    {
      id: 'payment',
      name: 'Payment Processing',
      icon: '💳',
      color: '#ef4444',
      description: 'PCI DSS compliant payment processing with tokenization, fraud detection, multiple payment methods, and idempotent retry logic.',
      details: [
        {
          name: 'Payment Gateway',
          explanation: 'PCI DSS compliance requires never storing raw card data - use tokenization via Stripe or Braintree. Fraud detection includes real-time scoring, velocity checks, and device fingerprinting. Retry logic uses exponential backoff with idempotency keys to prevent duplicate charges.',
          codeExample: `// Payment Service with Stripe
@Service
public class PaymentService {
    private final StripeClient stripe;

    @Retryable(
        value = StripeException.class,
        maxAttempts = 3,
        backoff = @Backoff(delay = 1000, multiplier = 2)
    )
    public PaymentResult processPayment(PaymentRequest request) {
        // Idempotency key prevents duplicate charges
        String idempotencyKey = generateIdempotencyKey(
            request.getOrderId());

        PaymentIntentCreateParams params =
            PaymentIntentCreateParams.builder()
                .setAmount(request.getAmount().longValue())
                .setCurrency("usd")
                .setPaymentMethod(request.getPaymentMethodId())
                .setConfirm(true)
                .build();

        return stripe.paymentIntents()
            .create(params, RequestOptions.builder()
                .setIdempotencyKey(idempotencyKey)
                .build());
    }
}`
        },
        {
          name: 'Fraud Detection',
          explanation: 'Multi-layer fraud prevention: device fingerprinting to detect account takeover, velocity checks for unusual activity patterns, ML scoring model trained on historical fraud data, 3D Secure for high-risk transactions, and manual review queue for flagged orders.',
          codeExample: `// Fraud Detection Service
@Service
public class FraudDetectionService {

    public FraudScore assessRisk(PaymentRequest request) {
        double score = 0.0;

        // Device fingerprint check
        if (isNewDevice(request.getDeviceId())) {
            score += 0.2;
        }

        // Velocity check (multiple orders in short time)
        int recentOrders = countRecentOrders(
            request.getUserId(), Duration.ofHours(1));
        if (recentOrders > 5) {
            score += 0.3;
        }

        // ML model prediction
        score += mlModel.predict(request.getFeatures());

        // Address verification
        if (!matchesBillingAddress(request)) {
            score += 0.15;
        }

        return new FraudScore(score, determineAction(score));
    }

    private FraudAction determineAction(double score) {
        if (score > 0.8) return FraudAction.REJECT;
        if (score > 0.5) return FraudAction.REQUIRE_3DS;
        if (score > 0.3) return FraudAction.MANUAL_REVIEW;
        return FraudAction.APPROVE;
    }
}`
        },
        {
          name: 'Payment API',
          explanation: 'Payment service APIs handle process, refund, and status operations. All payment transactions are logged for audit compliance. Webhook handlers process async payment events from providers for transaction status updates.',
          codeExample: `// Payment REST API
POST /payments/process
{
  "order_id": "112-1234567-8901234",
  "payment_method_id": "pm_456",
  "amount": 108.48,
  "currency": "USD"
}

POST /payments/refund
{
  "payment_id": "pi_abc123",
  "amount": 108.48,
  "reason": "customer_request"
}

GET /payments/:id/status
{
  "payment_id": "pi_abc123",
  "status": "succeeded",
  "amount": 108.48,
  "created_at": "2024-01-15T10:30:00Z"
}

// Webhook Handler
@PostMapping("/webhooks/stripe")
public ResponseEntity<Void> handleStripeWebhook(
        @RequestBody String payload,
        @RequestHeader("Stripe-Signature") String signature) {

    Event event = stripe.webhooks()
        .constructEvent(payload, signature, webhookSecret);

    switch (event.getType()) {
        case "payment_intent.succeeded":
            handlePaymentSuccess(event.getData());
            break;
        case "payment_intent.payment_failed":
            handlePaymentFailure(event.getData());
            break;
    }

    return ResponseEntity.ok().build();
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
      { name: 'System Design', icon: '🏛️', page: 'Design' },
      { name: 'Amazon E-Commerce', icon: '🛒', page: 'Amazon' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #7c2d12 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #fb923c, #f97316)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(249, 115, 22, 0.2)',
    border: '1px solid rgba(249, 115, 22, 0.3)',
    borderRadius: '0.5rem',
    color: '#fb923c',
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
        <h1 style={titleStyle}>Amazon E-Commerce System Design</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(249, 115, 22, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(249, 115, 22, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Back to System Design
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          colors={TOPIC_COLORS}
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

export default Amazon

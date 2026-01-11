import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function Amazon({ onBack, breadcrumb }) {
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
            color: '#fdba74',
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
          🛒 Amazon E-Commerce System Design
        </h1>
        <div style={{ width: '140px' }}></div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        backgroundColor: '#1f2937',
        padding: '0.75rem',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
      }}>
        {[
          { id: 'overview', label: 'Overview', icon: '📋' },
          { id: 'architecture', label: 'Architecture', icon: '🏗️' },
          { id: 'catalog', label: 'Product Catalog', icon: '📦' },
          { id: 'shopping', label: 'Shopping & Checkout', icon: '🛒' },
          { id: 'order', label: 'Order Processing', icon: '📮' },
          { id: 'scalability', label: 'Scalability', icon: '⚡' },
          { id: 'api', label: 'API Endpoints', icon: '🔌' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.6rem 1.25rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              backgroundColor: activeTab === tab.id ? '#ff9900' : '#374151',
              color: activeTab === tab.id ? 'white' : '#d1d5db',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.icon} {tab.label}
          </button>
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
                Design a highly scalable e-commerce platform like Amazon that handles millions of products,
                concurrent users, transactions, and provides features like product search, recommendations,
                shopping cart, order processing, and payment integration.
              </p>
            </div>

            {/* Scale Metrics */}
            <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/30 rounded-xl p-6 border-2 border-orange-700">
              <h3 className="text-2xl font-bold mb-4 text-orange-400">📊 Scale & Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-orange-400 mb-1">300M+</div>
                  <div className="text-sm text-gray-300">Active customers</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-orange-400 mb-1">12M+</div>
                  <div className="text-sm text-gray-300">Product SKUs</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-orange-400 mb-1">1.7M</div>
                  <div className="text-sm text-gray-300">Sellers</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-orange-400 mb-1">5B+</div>
                  <div className="text-sm text-gray-300">Orders per year</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-orange-400 mb-1">$500B+</div>
                  <div className="text-sm text-gray-300">GMV annually</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-orange-400 mb-1">100K</div>
                  <div className="text-sm text-gray-300">Peak orders/min</div>
                </div>
              </div>
            </div>

            {/* Functional Requirements */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/30 rounded-xl p-6 border-2 border-blue-700">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">🎯 Functional Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-blue-400 mb-2">Core Features:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>✓ Product catalog browsing</li>
                    <li>✓ Product search & filtering</li>
                    <li>✓ Shopping cart management</li>
                    <li>✓ Checkout & payment processing</li>
                    <li>✓ Order tracking</li>
                    <li>✓ User reviews & ratings</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-blue-400 mb-2">Advanced Features:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>✓ Product recommendations</li>
                    <li>✓ Inventory management</li>
                    <li>✓ Seller dashboard</li>
                    <li>✓ Wish lists</li>
                    <li>✓ Deal of the day</li>
                    <li>✓ Prime membership</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Non-Functional Requirements */}
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/30 rounded-xl p-6 border-2 border-purple-700">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">⚙️ Non-Functional Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <ul className="space-y-2 text-gray-300">
                    <li><strong>Availability:</strong> 99.99% uptime (53 min/year downtime)</li>
                    <li><strong>Latency:</strong> {'<'} 200ms for product search</li>
                    <li><strong>Consistency:</strong> Strong consistency for orders/inventory</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2 text-gray-300">
                    <li><strong>Scalability:</strong> Handle 10M concurrent users</li>
                    <li><strong>Security:</strong> PCI DSS compliance for payments</li>
                    <li><strong>Reliability:</strong> No lost transactions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Architecture Tab */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-white">🏗️ High-Level Architecture</h2>

            <div className="flex flex-col items-center space-y-4">
              {/* Client Layer */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 shadow-xl border-2 border-blue-400 max-w-3xl w-full">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-2">📱 Client Applications</div>
                  <div className="text-sm text-blue-100">Web • iOS • Android • Alexa • Fire TV</div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-500">↓</div>
              </div>

              {/* CDN/CloudFront */}
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 shadow-xl border-2 border-purple-400 max-w-3xl w-full">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-2">🌐 Amazon CloudFront (CDN)</div>
                  <div className="text-sm text-purple-100">Static content • Images • CSS/JS • Edge caching</div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-500">↓</div>
              </div>

              {/* API Gateway & Load Balancer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full">
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 shadow-xl border-2 border-green-400">
                  <div className="text-white text-center">
                    <div className="text-xl font-bold mb-2">🚪 API Gateway</div>
                    <div className="text-sm text-green-100">Auth • Rate limiting • Routing</div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 shadow-xl border-2 border-red-400">
                  <div className="text-white text-center">
                    <div className="text-xl font-bold mb-2">⚖️ Load Balancer</div>
                    <div className="text-sm text-red-100">ELB • Health checks • SSL</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-500">↓</div>
              </div>

              {/* Microservices */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 shadow-xl border-2 border-orange-400 max-w-3xl w-full">
                <div className="text-white">
                  <div className="text-2xl font-bold mb-4 text-center">🔧 Microservices Layer</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      'Product Service',
                      'Search Service',
                      'Cart Service',
                      'Order Service',
                      'Payment Service',
                      'Inventory Service',
                      'Recommendation',
                      'Review Service',
                      'User Service',
                      'Seller Service',
                      'Notification Service',
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
                <div className="text-4xl text-gray-500">↓</div>
              </div>

              {/* Data Layer */}
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 shadow-xl border-2 border-indigo-400 max-w-3xl w-full">
                <div className="text-white">
                  <div className="text-2xl font-bold mb-4 text-center">💾 Data Layer</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">PostgreSQL</div>
                      <div className="text-xs text-indigo-100">Products, Orders</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">DynamoDB</div>
                      <div className="text-xs text-indigo-100">Cart, Sessions</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">Elasticsearch</div>
                      <div className="text-xs text-indigo-100">Product Search</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">Redis</div>
                      <div className="text-xs text-indigo-100">Cache, Sessions</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">S3</div>
                      <div className="text-xs text-indigo-100">Images, Assets</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">Cassandra</div>
                      <div className="text-xs text-indigo-100">Order History</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">Kafka</div>
                      <div className="text-xs text-indigo-100">Event Stream</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">Neo4j</div>
                      <div className="text-xs text-indigo-100">Recommendations</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Design Patterns */}
            <div className="mt-8 bg-gradient-to-br from-yellow-900/30 to-yellow-900/30 rounded-xl p-6 border-2 border-yellow-700">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">🎨 Key Design Patterns</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">🔄 CQRS Pattern</div>
                  <div className="text-sm text-gray-300">Separate read/write operations for better performance</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">📦 Event Sourcing</div>
                  <div className="text-sm text-gray-300">Store all order state changes as events</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">🎪 Saga Pattern</div>
                  <div className="text-sm text-gray-300">Distributed transactions for order processing</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">🔌 Circuit Breaker</div>
                  <div className="text-sm text-gray-300">Prevent cascade failures in microservices</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Catalog Tab */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-white">📦 Product Catalog & Inventory</h2>

            {/* Product Data Model */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/30 rounded-xl p-6 border-2 border-blue-700">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Product Data Model</h3>
              <div className="bg-gray-800 rounded-lg p-4 shadow">
                <div className="font-mono text-sm text-gray-300 space-y-1">
                  <div><strong>Product:</strong></div>
                  <div className="ml-4">- product_id: UUID</div>
                  <div className="ml-4">- name: string</div>
                  <div className="ml-4">- description: text</div>
                  <div className="ml-4">- category_id: UUID</div>
                  <div className="ml-4">- brand: string</div>
                  <div className="ml-4">- price: decimal</div>
                  <div className="ml-4">- images: string[]</div>
                  <div className="ml-4">- attributes: JSON</div>
                  <div className="ml-4">- created_at: timestamp</div>
                </div>
              </div>
            </div>

            {/* Inventory System Flow */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Inventory Management Flow</h3>

              <div className="flex flex-col items-center space-y-4">
                {/* Real-time Inventory Check */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 shadow-xl border-2 border-green-400 max-w-2xl w-full">
                  <div className="text-white text-center">
                    <div className="text-xl font-bold mb-2">📊 Real-time Inventory Check</div>
                    <div className="text-sm text-green-100">Check available stock before checkout</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-green-400">↓</div>
                </div>

                {/* Reserve Inventory */}
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 shadow-xl border-2 border-yellow-400 max-w-2xl w-full">
                  <div className="text-white text-center">
                    <div className="text-xl font-bold mb-2">🔒 Reserve Inventory</div>
                    <div className="text-sm text-yellow-100">Hold items during checkout (15 min TTL)</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-yellow-400">↓</div>
                </div>

                {/* Order Confirmation */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 shadow-xl border-2 border-blue-400 max-w-2xl w-full">
                  <div className="text-white text-center">
                    <div className="text-xl font-bold mb-2">✅ Order Confirmation</div>
                    <div className="text-sm text-blue-100">Commit inventory deduction, update stock</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-blue-400">↓</div>
                </div>

                {/* Async Updates */}
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 shadow-xl border-2 border-purple-400 max-w-2xl w-full">
                  <div className="text-white text-center">
                    <div className="text-xl font-bold mb-2">📢 Event Propagation</div>
                    <div className="text-sm text-purple-100">Kafka: Update search index, analytics, seller dashboard</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory Strategies */}
            <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/30 rounded-xl p-6 border-2 border-orange-700">
              <h3 className="text-2xl font-bold mb-4 text-orange-400">Inventory Strategies</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">🔢 Database Sharding</div>
                  <div className="text-sm text-gray-300">Shard by product_id for horizontal scaling</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">⚡ Redis Caching</div>
                  <div className="text-sm text-gray-300">Cache hot products (80/20 rule), 5-min TTL</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">🎯 Optimistic Locking</div>
                  <div className="text-sm text-gray-300">Version-based concurrency control to prevent overselling</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">📦 Multi-Warehouse</div>
                  <div className="text-sm text-gray-300">Track inventory across multiple fulfillment centers</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shopping & Checkout Tab */}
        {activeTab === 'shopping' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-white">🛒 Shopping Cart & Checkout Flow</h2>

            {/* Shopping Cart Architecture */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-900/30 rounded-xl p-6 border-2 border-green-700">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Shopping Cart Storage</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">👤 Logged-in Users</div>
                  <div className="text-sm text-gray-300 mb-3">Store in DynamoDB for persistence</div>
                  <div className="text-xs font-mono text-gray-400">
                    Key: user_id<br/>
                    TTL: 90 days
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">👻 Anonymous Users</div>
                  <div className="text-sm text-gray-300 mb-3">Store in Redis with session_id</div>
                  <div className="text-xs font-mono text-gray-400">
                    Key: session_id<br/>
                    TTL: 7 days
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Flow */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Checkout Flow</h3>

              <div className="flex flex-col items-center space-y-4">
                {/* Step 1 */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 shadow-xl border-2 border-blue-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">1️⃣ Cart Review</div>
                    <div className="text-sm text-blue-100">Fetch cart items, verify prices, check availability</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-blue-400">↓</div>
                </div>

                {/* Step 2 */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 shadow-xl border-2 border-green-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">2️⃣ Shipping Address</div>
                    <div className="text-sm text-green-100">Select or add delivery address, validate address</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-green-400">↓</div>
                </div>

                {/* Step 3 */}
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 shadow-xl border-2 border-yellow-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">3️⃣ Shipping Options</div>
                    <div className="text-sm text-yellow-100">Standard (5-7 days) • Express (2-3 days) • Prime (1-2 days)</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-yellow-400">↓</div>
                </div>

                {/* Step 4 */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 shadow-xl border-2 border-orange-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">4️⃣ Payment Method</div>
                    <div className="text-sm text-orange-100">Credit Card • Debit Card • Gift Card • Pay on Delivery</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-orange-400">↓</div>
                </div>

                {/* Step 5 */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 shadow-xl border-2 border-red-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">5️⃣ Order Review & Place Order</div>
                    <div className="text-sm text-red-100">Final review, apply promo codes, confirm order</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-red-400">↓</div>
                </div>

                {/* Step 6 */}
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 shadow-xl border-2 border-purple-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">6️⃣ Payment Processing</div>
                    <div className="text-sm text-purple-100">Stripe/PayPal integration, fraud detection, 3D Secure</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-purple-400">↓</div>
                </div>

                {/* Step 7 */}
                <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-6 shadow-xl border-2 border-pink-400 max-w-3xl w-full">
                  <div className="text-white text-center">
                    <div className="text-xl font-bold mb-2">✅ Order Confirmation</div>
                    <div className="text-sm text-pink-100">Email confirmation, order tracking number, estimated delivery</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Gateway Integration */}
            <div className="bg-gradient-to-br from-indigo-900/30 to-indigo-900/30 rounded-xl p-6 border-2 border-indigo-700">
              <h3 className="text-2xl font-bold mb-4 text-indigo-400">💳 Payment Gateway Integration</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">🔐 PCI DSS Compliance</div>
                  <div className="text-sm text-gray-300">Never store raw card data, use tokenization (Stripe, Braintree)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">🛡️ Fraud Detection</div>
                  <div className="text-sm text-gray-300">Real-time fraud scoring, velocity checks, device fingerprinting</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">🔄 Retry Logic</div>
                  <div className="text-sm text-gray-300">Exponential backoff for failed payments, idempotency keys</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">💰 Multiple Payment Methods</div>
                  <div className="text-sm text-gray-300">Credit/Debit cards, digital wallets, BNPL, gift cards</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Processing Tab */}
        {activeTab === 'order' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-white">📮 Order Processing & Fulfillment</h2>

            {/* Order State Machine */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Order State Machine</h3>

              <div className="flex flex-col items-center space-y-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 shadow-xl border-2 border-blue-400 max-w-2xl w-full">
                  <div className="text-white text-center font-bold">ORDER_PLACED</div>
                </div>
                <div className="text-3xl text-blue-400">↓</div>

                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-4 shadow-xl border-2 border-yellow-400 max-w-2xl w-full">
                  <div className="text-white text-center font-bold">PAYMENT_CONFIRMED</div>
                </div>
                <div className="text-3xl text-yellow-400">↓</div>

                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 shadow-xl border-2 border-orange-400 max-w-2xl w-full">
                  <div className="text-white text-center font-bold">PREPARING_FOR_SHIPMENT</div>
                </div>
                <div className="text-3xl text-orange-400">↓</div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 shadow-xl border-2 border-purple-400 max-w-2xl w-full">
                  <div className="text-white text-center font-bold">SHIPPED</div>
                </div>
                <div className="text-3xl text-purple-400">↓</div>

                <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-4 shadow-xl border-2 border-pink-400 max-w-2xl w-full">
                  <div className="text-white text-center font-bold">OUT_FOR_DELIVERY</div>
                </div>
                <div className="text-3xl text-pink-400">↓</div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 shadow-xl border-2 border-green-400 max-w-2xl w-full">
                  <div className="text-white text-center font-bold">DELIVERED ✓</div>
                </div>
              </div>
            </div>

            {/* Saga Pattern for Distributed Transaction */}
            <div className="bg-gradient-to-br from-red-900/30 to-red-900/30 rounded-xl p-6 border-2 border-red-700">
              <h3 className="text-2xl font-bold mb-4 text-red-400">🎪 Saga Pattern: Order Processing</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Step 1: Reserve Inventory</div>
                  <div className="text-sm text-gray-300">Compensating: Release inventory reservation</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Step 2: Process Payment</div>
                  <div className="text-sm text-gray-300">Compensating: Refund payment</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Step 3: Create Shipment</div>
                  <div className="text-sm text-gray-300">Compensating: Cancel shipment</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Step 4: Send Confirmation</div>
                  <div className="text-sm text-gray-300">Compensating: Send cancellation email</div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-red-900/50 rounded-lg border border-red-700">
                <div className="text-sm text-gray-300">
                  <strong>Note:</strong> Each step publishes success/failure events to Kafka.
                  Saga orchestrator coordinates the flow and triggers compensating transactions on failure.
                </div>
              </div>
            </div>

            {/* Fulfillment Centers */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-900/30 rounded-xl p-6 border-2 border-green-700">
              <h3 className="text-2xl font-bold mb-4 text-green-400">📦 Fulfillment Center Selection</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">🗺️ Geographic Proximity</div>
                  <div className="text-sm text-gray-300">Select nearest FC to customer address for faster delivery</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">📊 Inventory Availability</div>
                  <div className="text-sm text-gray-300">Check real-time stock levels across all FCs</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">⚖️ Load Balancing</div>
                  <div className="text-sm text-gray-300">Distribute orders evenly to prevent FC overload</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">💰 Cost Optimization</div>
                  <div className="text-sm text-gray-300">Minimize shipping costs while meeting delivery SLAs</div>
                </div>
              </div>
            </div>

            {/* Order Tracking */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/30 rounded-xl p-6 border-2 border-blue-700">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">📍 Real-time Order Tracking</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">🚚 Carrier Integration</div>
                  <div className="text-sm text-gray-300">FedEx, UPS, USPS APIs for tracking updates</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">📱 Push Notifications</div>
                  <div className="text-sm text-gray-300">Real-time updates on order status changes</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">🗺️ GPS Tracking</div>
                  <div className="text-sm text-gray-300">Live location of delivery vehicle (Amazon Logistics)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">📧 Email Updates</div>
                  <div className="text-sm text-gray-300">Shipped, out for delivery, delivered confirmations</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scalability Tab */}
        {activeTab === 'scalability' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-white">⚡ Scalability & Performance</h2>

            {/* Database Scaling */}
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/30 rounded-xl p-6 border-2 border-purple-700">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">🗄️ Database Scaling Strategies</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">📊 Sharding</div>
                  <div className="text-sm text-gray-300 mb-2">
                    <strong>Product DB:</strong> Shard by product_id<br/>
                    <strong>User DB:</strong> Shard by user_id<br/>
                    <strong>Order DB:</strong> Shard by order_id or user_id
                  </div>
                  <div className="text-xs text-gray-400">Horizontal scaling across multiple database servers</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">🔄 Read Replicas</div>
                  <div className="text-sm text-gray-300">Multiple read replicas per shard, route reads to replicas (95% reads, 5% writes)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">📈 Connection Pooling</div>
                  <div className="text-sm text-gray-300">PgBouncer/RDS Proxy to manage thousands of concurrent connections</div>
                </div>
              </div>
            </div>

            {/* Caching Strategy */}
            <div className="bg-gradient-to-br from-red-900/30 to-red-900/30 rounded-xl p-6 border-2 border-red-700">
              <h3 className="text-2xl font-bold mb-4 text-red-400">⚡ Multi-layer Caching</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">1️⃣ CDN (CloudFront)</div>
                  <div className="text-sm text-gray-300">Cache static assets, product images, CSS/JS (TTL: 7 days)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">2️⃣ Redis (Application Cache)</div>
                  <div className="text-sm text-gray-300">Hot products, user sessions, shopping carts (TTL: 5-30 min)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">3️⃣ Elasticsearch Cache</div>
                  <div className="text-sm text-gray-300">Search results, popular queries, filters (TTL: 10 min)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">4️⃣ Browser Cache</div>
                  <div className="text-sm text-gray-300">Client-side caching for images, scripts, API responses</div>
                </div>
              </div>
            </div>

            {/* Search Optimization */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/30 rounded-xl p-6 border-2 border-blue-700">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">🔍 Product Search at Scale</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">📚 Elasticsearch Cluster</div>
                  <div className="text-sm text-gray-300">12M+ products indexed, sharded across 50+ nodes</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">🎯 Relevance Ranking</div>
                  <div className="text-sm text-gray-300">BM25 scoring + personalized ranking based on user history</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">🔤 Autocomplete</div>
                  <div className="text-sm text-gray-300">N-gram tokenization, edge n-grams for prefix matching</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">🎨 Faceted Search</div>
                  <div className="text-sm text-gray-300">Category, brand, price range, ratings filters with aggregations</div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-900/30 rounded-xl p-6 border-2 border-green-700">
              <h3 className="text-2xl font-bold mb-4 text-green-400">📊 Performance Targets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-green-400 mb-1">{'<'} 200ms</div>
                  <div className="text-sm text-gray-300">Product search response time (p95)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-green-400 mb-1">{'<'} 100ms</div>
                  <div className="text-sm text-gray-300">Add to cart operation (p95)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-green-400 mb-1">{'<'} 3 sec</div>
                  <div className="text-sm text-gray-300">Checkout completion time (p95)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-green-400 mb-1">99.99%</div>
                  <div className="text-sm text-gray-300">System availability (53 min/year downtime)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-green-400 mb-1">100K</div>
                  <div className="text-sm text-gray-300">Orders processed per minute (peak)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-green-400 mb-1">10M</div>
                  <div className="text-sm text-gray-300">Concurrent users supported</div>
                </div>
              </div>
            </div>

            {/* Monitoring & Observability */}
            <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/30 rounded-xl p-6 border-2 border-orange-700">
              <h3 className="text-2xl font-bold mb-4 text-orange-400">📈 Monitoring & Observability</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">📊 Metrics (Datadog/CloudWatch)</div>
                  <div className="text-sm text-gray-300">CPU, memory, latency, throughput, error rates</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">📝 Logging (ELK Stack)</div>
                  <div className="text-sm text-gray-300">Centralized logging, structured logs, log aggregation</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">🔍 Tracing (Jaeger/X-Ray)</div>
                  <div className="text-sm text-gray-300">Distributed tracing across microservices</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">🚨 Alerting (PagerDuty)</div>
                  <div className="text-sm text-gray-300">On-call rotation, incident management, SLA alerts</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Endpoints Tab */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            {/* API Overview */}
            <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/30 rounded-xl p-6 border-2 border-orange-700">
              <h2 className="text-2xl font-bold mb-4 text-orange-400">🔌 API Overview</h2>
              <p className="text-gray-300 mb-4">
                RESTful microservices architecture with API Gateway. Each service exposes its own REST API.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-orange-400 mb-2">Base URL</div>
                  <code className="text-sm text-gray-300">https://api.amazon.com/v1</code>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-orange-400 mb-2">Authentication</div>
                  <code className="text-sm text-gray-300">API Key + OAuth 2.0</code>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-orange-400 mb-2">Rate Limit</div>
                  <code className="text-sm text-gray-300">1000 req/min per user</code>
                </div>
              </div>
            </div>

            {/* Product Endpoints */}
            <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-white">📦 Product Service APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/products/:id</code>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Get product details</p>
                  <div className="bg-gray-900 p-3 rounded">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "id": "B08N5WRWNW",
  "name": "Echo Dot (4th Gen)",
  "price": 49.99,
  "rating": 4.7,
  "reviews_count": 54321,
  "in_stock": true,
  "inventory_count": 1250
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/products/search?q=laptop&page=1&limit=20</code>
                  </div>
                  <p className="text-sm text-gray-400">Search products with filters</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/products/:id/reviews</code>
                  </div>
                  <p className="text-sm text-gray-400">Get product reviews</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/50 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/products/:id/reviews</code>
                  </div>
                  <p className="text-sm text-gray-400">Submit a product review</p>
                </div>
              </div>
            </div>

            {/* Cart Endpoints */}
            <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-white">🛒 Cart Service APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/cart</code>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Get user's cart</p>
                  <div className="bg-gray-900 p-3 rounded">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
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
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/50 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/cart/items</code>
                  </div>
                  <p className="text-sm text-gray-400">Add item to cart</p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-yellow-900/50 text-yellow-400 rounded text-xs font-bold">PUT</span>
                    <code className="text-sm text-gray-300">/cart/items/:id</code>
                  </div>
                  <p className="text-sm text-gray-400">Update item quantity</p>
                </div>

                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-red-900/50 text-red-400 rounded text-xs font-bold">DELETE</span>
                    <code className="text-sm text-gray-300">/cart/items/:id</code>
                  </div>
                  <p className="text-sm text-gray-400">Remove item from cart</p>
                </div>
              </div>
            </div>

            {/* Order Endpoints */}
            <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-white">📮 Order Service APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/50 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/orders</code>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Create a new order</p>
                  <div className="bg-gray-900 p-3 rounded">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "cart_id": "cart_abc123",
  "shipping_address_id": "addr_123",
  "payment_method_id": "pm_456",
  "shipping_option": "standard"
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/orders/:id</code>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Get order details</p>
                  <div className="bg-gray-900 p-3 rounded">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "order_id": "112-1234567-8901234",
  "status": "shipped",
  "tracking_number": "1Z999AA10123456789",
  "estimated_delivery": "2024-01-20",
  "items": [...],
  "total": 108.48
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/orders</code>
                  </div>
                  <p className="text-sm text-gray-400">Get user's order history</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/50 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/orders/:id/cancel</code>
                  </div>
                  <p className="text-sm text-gray-400">Cancel an order</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/50 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/orders/:id/return</code>
                  </div>
                  <p className="text-sm text-gray-400">Initiate order return</p>
                </div>
              </div>
            </div>

            {/* User & Account Endpoints */}
            <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-white">👤 User Service APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/users/profile</code>
                  </div>
                  <p className="text-sm text-gray-400">Get user profile</p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-yellow-900/50 text-yellow-400 rounded text-xs font-bold">PUT</span>
                    <code className="text-sm text-gray-300">/users/profile</code>
                  </div>
                  <p className="text-sm text-gray-400">Update user profile</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/users/addresses</code>
                  </div>
                  <p className="text-sm text-gray-400">Get saved addresses</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/50 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/users/addresses</code>
                  </div>
                  <p className="text-sm text-gray-400">Add new address</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/users/payment-methods</code>
                  </div>
                  <p className="text-sm text-gray-400">Get saved payment methods</p>
                </div>
              </div>
            </div>

            {/* Payment Endpoints */}
            <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-white">💳 Payment Service APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/50 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/payments/process</code>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Process payment</p>
                  <div className="bg-gray-900 p-3 rounded">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "order_id": "112-1234567-8901234",
  "payment_method_id": "pm_456",
  "amount": 108.48,
  "currency": "USD"
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/50 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/payments/refund</code>
                  </div>
                  <p className="text-sm text-gray-400">Process refund</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/payments/:id/status</code>
                  </div>
                  <p className="text-sm text-gray-400">Check payment status</p>
                </div>
              </div>
            </div>

            {/* Response Codes */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border-2 border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">📊 HTTP Status Codes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                  <div className="text-green-400 font-bold">200 OK</div>
                  <div className="text-gray-300 text-sm">Request successful</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                  <div className="text-green-400 font-bold">201 Created</div>
                  <div className="text-gray-300 text-sm">Resource created</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                  <div className="text-yellow-400 font-bold">400 Bad Request</div>
                  <div className="text-gray-300 text-sm">Invalid request</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                  <div className="text-yellow-400 font-bold">401 Unauthorized</div>
                  <div className="text-gray-300 text-sm">Auth required</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                  <div className="text-red-400 font-bold">404 Not Found</div>
                  <div className="text-gray-300 text-sm">Resource not found</div>
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

export default Amazon

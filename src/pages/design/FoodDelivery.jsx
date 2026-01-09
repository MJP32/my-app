import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

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
            cursor: 'pointer'
          }}
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

      <Breadcrumb breadcrumb={breadcrumb} />

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
          { id: 'overview', label: 'Overview', icon: '' },
          { id: 'architecture', label: 'Architecture', icon: '' },
          { id: 'matching', label: 'Order Matching', icon: '' },
          { id: 'routing', label: 'Driver Routing', icon: '' },
          { id: 'features', label: 'Features', icon: '' },
          { id: 'scalability', label: 'Scalability', icon: '' },
          { id: 'api', label: 'API Endpoints', icon: '' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.6rem 1.25rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              backgroundColor: activeTab === tab.id ? '#ff6347' : '#374151',
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
                Design a food delivery platform like Uber Eats or DoorDash that connects customers with restaurants,
                matches orders with delivery drivers, provides real-time tracking, handles payments, and optimizes
                delivery routes using geospatial indexing and intelligent matching algorithms.
              </p>
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

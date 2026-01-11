import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

export default function MobileWeatherApp({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: '📋 Overview', icon: '📋' },
    { id: 'components', label: '🔧 Core Components', icon: '🔧' },
    { id: 'dataflow', label: '🔄 Data Flow', icon: '🔄' },
    { id: 'scalability', label: '📈 Scalability', icon: '📈' },
    { id: 'tradeoffs', label: '⚖️ Trade-offs', icon: '⚖️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-gray-800 rounded-2xl shadow-lg p-6 border-l-8 border-cyan-500">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              ← Back
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center gap-3">
              <span className="text-5xl">🌤️</span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Mobile Weather App
              </span>
            </h1>
            <div className="w-24"></div>
          </div>
          <p className="text-gray-300 text-lg text-center">
            Design a mobile weather application with real-time data, forecasts, location services, weather alerts, and interactive maps
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          borderBottom: '1px solid #374151',
          paddingBottom: '0.5rem',
          overflowX: 'auto'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: activeTab === tab.id ? '#374151' : 'transparent',
                color: activeTab === tab.id ? '#22d3ee' : '#9ca3af',
                border: 'none',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Requirements */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-cyan-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-cyan-400">📝</span>
                System Requirements
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-green-400 mb-3">✅ Functional Requirements</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Current Weather:</strong> Real-time temperature, humidity, wind, precipitation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Forecast:</strong> Hourly (48h) and daily (7-14 day) forecasts</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Location Services:</strong> Auto-detect location via GPS or manual search</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Multiple Locations:</strong> Save and track multiple cities/locations</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Weather Alerts:</strong> Push notifications for severe weather warnings</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Interactive Maps:</strong> Radar, temperature, precipitation overlays</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Air Quality Index:</strong> AQI and pollutant levels</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-orange-400 mb-3">⚡ Non-Functional Requirements</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>High Availability:</strong> 99.9% uptime for weather data</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Low Latency:</strong> Weather loads in &lt;1 second</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Scalability:</strong> Support 10 million+ users</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Offline Support:</strong> Cache last weather data for offline viewing</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Battery Efficiency:</strong> Minimize GPS and network usage</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Diagram */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-blue-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-blue-400">🏗️</span>
                High-Level Architecture
              </h2>

              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-8 rounded-xl border-2 border-blue-700">
                <svg viewBox="0 0 1200 900" className="w-full h-auto">
                  {/* Mobile Clients */}
                  <rect x="50" y="50" width="140" height="70" fill="#0ea5e9" rx="8"/>
                  <text x="120" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">iOS App</text>
                  <text x="120" y="100" textAnchor="middle" fill="white" fontSize="11">Swift/SwiftUI</text>

                  <rect x="220" y="50" width="140" height="70" fill="#0ea5e9" rx="8"/>
                  <text x="290" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Android App</text>
                  <text x="290" y="100" textAnchor="middle" fill="white" fontSize="11">Kotlin/Jetpack</text>

                  {/* CDN */}
                  <rect x="390" y="50" width="140" height="70" fill="#10b981" rx="8"/>
                  <text x="460" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">CDN</text>
                  <text x="460" y="100" textAnchor="middle" fill="white" fontSize="11">CloudFront</text>

                  {/* Load Balancer */}
                  <rect x="120" y="170" width="240" height="60" fill="#8b5cf6" rx="8"/>
                  <text x="240" y="205" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Load Balancer (ALB)</text>

                  {/* API Gateway */}
                  <rect x="120" y="270" width="240" height="60" fill="#6366f1" rx="8"/>
                  <text x="240" y="305" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">API Gateway</text>

                  {/* Services Layer */}
                  <rect x="40" y="380" width="160" height="90" fill="#3b82f6" rx="8"/>
                  <text x="120" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Weather Service</text>
                  <text x="120" y="430" textAnchor="middle" fill="white" fontSize="10">Current/Forecast</text>
                  <text x="120" y="448" textAnchor="middle" fill="white" fontSize="10">Data Aggregation</text>

                  <rect x="220" y="380" width="160" height="90" fill="#06b6d4" rx="8"/>
                  <text x="300" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Location Service</text>
                  <text x="300" y="430" textAnchor="middle" fill="white" fontSize="10">Geocoding</text>
                  <text x="300" y="448" textAnchor="middle" fill="white" fontSize="10">Reverse Lookup</text>

                  <rect x="400" y="380" width="160" height="90" fill="#ec4899" rx="8"/>
                  <text x="480" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Alert Service</text>
                  <text x="480" y="430" textAnchor="middle" fill="white" fontSize="10">Severe Weather</text>
                  <text x="480" y="448" textAnchor="middle" fill="white" fontSize="10">Push Notifications</text>

                  <rect x="580" y="380" width="160" height="90" fill="#f59e0b" rx="8"/>
                  <text x="660" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Map Service</text>
                  <text x="660" y="430" textAnchor="middle" fill="white" fontSize="10">Radar/Overlays</text>
                  <text x="660" y="448" textAnchor="middle" fill="white" fontSize="10">Tile Generation</text>

                  <rect x="760" y="380" width="160" height="90" fill="#10b981" rx="8"/>
                  <text x="840" y="410" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">User Service</text>
                  <text x="840" y="430" textAnchor="middle" fill="white" fontSize="10">Preferences</text>
                  <text x="840" y="448" textAnchor="middle" fill="white" fontSize="10">Saved Locations</text>

                  {/* Cache Layer */}
                  <rect x="120" y="520" width="240" height="60" fill="#ef4444" rx="8"/>
                  <text x="240" y="545" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Cache (Redis)</text>
                  <text x="240" y="565" textAnchor="middle" fill="white" fontSize="11">Weather Data, Forecasts</text>

                  {/* External APIs */}
                  <rect x="600" y="520" width="320" height="60" fill="#8b5cf6" rx="8"/>
                  <text x="760" y="545" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Weather Data Providers</text>
                  <text x="760" y="565" textAnchor="middle" fill="white" fontSize="11">OpenWeatherMap, NOAA, Weather.gov</text>

                  {/* Databases */}
                  <rect x="40" y="630" width="160" height="80" fill="#334155" rx="8"/>
                  <text x="120" y="660" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">User DB</text>
                  <text x="120" y="680" textAnchor="middle" fill="white" fontSize="10">PostgreSQL</text>

                  <rect x="220" y="630" width="160" height="80" fill="#334155" rx="8"/>
                  <text x="300" y="660" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Location DB</text>
                  <text x="300" y="680" textAnchor="middle" fill="white" fontSize="10">MongoDB</text>

                  <rect x="400" y="630" width="160" height="80" fill="#334155" rx="8"/>
                  <text x="480" y="660" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Alert History</text>
                  <text x="480" y="680" textAnchor="middle" fill="white" fontSize="10">TimescaleDB</text>

                  <rect x="580" y="630" width="160" height="80" fill="#059669" rx="8"/>
                  <text x="660" y="660" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Map Tiles</text>
                  <text x="660" y="680" textAnchor="middle" fill="white" fontSize="10">S3</text>

                  <rect x="760" y="630" width="160" height="80" fill="#0891b2" rx="8"/>
                  <text x="840" y="660" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Analytics DB</text>
                  <text x="840" y="680" textAnchor="middle" fill="white" fontSize="10">ClickHouse</text>

                  {/* Message Queue */}
                  <rect x="600" y="750" width="320" height="60" fill="#f97316" rx="8"/>
                  <text x="760" y="775" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Message Queue (Kafka)</text>
                  <text x="760" y="795" textAnchor="middle" fill="white" fontSize="11">Weather Updates, Alert Processing</text>

                  {/* Connections */}
                  <path d="M 120 120 L 240 170" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
                  <path d="M 290 120 L 240 170" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
                  <path d="M 460 120 L 460 300" stroke="#10b981" strokeWidth="2" fill="none" strokeDasharray="5,5"/>

                  <path d="M 240 230 L 240 270" stroke="#6366f1" strokeWidth="2" fill="none"/>

                  <path d="M 240 330 L 120 380" stroke="#3b82f6" strokeWidth="2" fill="none"/>
                  <path d="M 240 330 L 300 380" stroke="#06b6d4" strokeWidth="2" fill="none"/>
                  <path d="M 240 330 L 480 380" stroke="#ec4899" strokeWidth="2" fill="none"/>
                  <path d="M 240 330 L 660 380" stroke="#f59e0b" strokeWidth="2" fill="none"/>
                  <path d="M 240 330 L 840 380" stroke="#10b981" strokeWidth="2" fill="none"/>

                  <path d="M 120 470 L 240 520" stroke="#ef4444" strokeWidth="2" fill="none"/>
                  <path d="M 300 470 L 240 520" stroke="#ef4444" strokeWidth="2" fill="none"/>
                  <path d="M 120 470 L 760 520" stroke="#8b5cf6" strokeWidth="2" fill="none"/>

                  <path d="M 840 470 L 840 630" stroke="#334155" strokeWidth="2" fill="none"/>
                  <path d="M 300 470 L 300 630" stroke="#334155" strokeWidth="2" fill="none"/>
                  <path d="M 480 470 L 480 630" stroke="#334155" strokeWidth="2" fill="none"/>
                  <path d="M 660 470 L 660 630" stroke="#059669" strokeWidth="2" fill="none"/>
                  <path d="M 480 470 L 760 750" stroke="#f97316" strokeWidth="2" fill="none"/>
                </svg>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="bg-cyan-900/30 p-4 rounded-lg border-l-4 border-cyan-500">
                  <div className="font-bold text-cyan-400 mb-2">Client Layer</div>
                  <div className="text-sm text-cyan-300">Native mobile apps (iOS/Android) with offline caching</div>
                </div>
                <div className="bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="font-bold text-blue-400 mb-2">Service Layer</div>
                  <div className="text-sm text-blue-300">Microservices for weather, location, alerts, and maps</div>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg border-l-4 border-purple-500">
                  <div className="font-bold text-purple-400 mb-2">Data Layer</div>
                  <div className="text-sm text-purple-300">Redis cache, PostgreSQL, MongoDB, and external APIs</div>
                </div>
              </div>
            </div>

            {/* Scale Estimates */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-emerald-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-emerald-400">📊</span>
                Scale & Capacity Estimates
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 p-6 rounded-xl border-2 border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-4 text-lg">User Base & Activity</h3>
                  <div className="space-y-2 text-gray-300">
                    <div>• Total users: <strong>10 million</strong></div>
                    <div>• Daily active users: <strong>3 million</strong></div>
                    <div>• Average sessions/day: <strong>5 sessions/user</strong></div>
                    <div>• Weather checks per day: <strong>15 million</strong></div>
                    <div>• Saved locations per user: <strong>3-5 locations</strong></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-6 rounded-xl border-2 border-green-700">
                  <h3 className="font-bold text-green-400 mb-4 text-lg">API & Traffic</h3>
                  <div className="space-y-2 text-gray-300">
                    <div>• Weather API calls: <strong>~175 QPS</strong></div>
                    <div>• Peak QPS: <strong>~500 QPS</strong></div>
                    <div>• Cache hit rate: <strong>~85%</strong></div>
                    <div>• External API calls: <strong>~26 QPS (cached)</strong></div>
                    <div>• Alert notifications: <strong>~100K/day</strong></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-xl border-2 border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-4 text-lg">Storage Requirements</h3>
                  <div className="space-y-2 text-gray-300">
                    <div>• User data: <strong>~100 MB (10M users × 10 KB)</strong></div>
                    <div>• Location database: <strong>~500 MB (cities worldwide)</strong></div>
                    <div>• Alert history (1 year): <strong>~10 GB</strong></div>
                    <div>• Map tiles (S3): <strong>~50 GB</strong></div>
                    <div>• Analytics data: <strong>~1 TB/year</strong></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 p-6 rounded-xl border-2 border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-4 text-lg">Bandwidth & Latency</h3>
                  <div className="space-y-2 text-gray-300">
                    <div>• Average response size: <strong>~10 KB</strong></div>
                    <div>• Daily bandwidth: <strong>~150 GB/day</strong></div>
                    <div>• Target latency: <strong>&lt;1 second</strong></div>
                    <div>• Cache response time: <strong>&lt;50 ms</strong></div>
                    <div>• API fallback time: <strong>&lt;2 seconds</strong></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'components' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Weather Service */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                  <span>☀️</span>
                  Weather Service
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="bg-blue-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-blue-400 mb-1">Data Aggregation</div>
                    <div className="text-sm">• Fetch data from multiple providers (OpenWeatherMap, NOAA)</div>
                    <div className="text-sm">• Aggregate and normalize weather data</div>
                    <div className="text-sm">• Calculate derived metrics (feels-like, wind chill)</div>
                  </div>
                  <div className="bg-cyan-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-cyan-400 mb-1">Caching Strategy</div>
                    <div className="text-sm">• Cache current weather for 15 minutes</div>
                    <div className="text-sm">• Cache forecasts for 1 hour</div>
                    <div className="text-sm">• Reduce external API calls by 85%</div>
                  </div>
                  <div className="bg-indigo-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-indigo-400 mb-1">Response Format</div>
                    <div className="text-sm">• Temperature (°F/°C)</div>
                    <div className="text-sm">• Humidity, pressure, visibility</div>
                    <div className="text-sm">• Wind speed & direction</div>
                  </div>
                </div>
              </div>

              {/* Location Service */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-cyan-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                  <span>📍</span>
                  Location Service
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="bg-cyan-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-cyan-400 mb-1">Geocoding</div>
                    <div className="text-sm">• Convert city names to lat/lon coordinates</div>
                    <div className="text-sm">• Support for ZIP codes, addresses</div>
                    <div className="text-sm">• Autocomplete suggestions for city search</div>
                  </div>
                  <div className="bg-teal-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-teal-400 mb-1">Reverse Geocoding</div>
                    <div className="text-sm">• Convert GPS coordinates to city names</div>
                    <div className="text-sm">• Auto-detect user's current location</div>
                    <div className="text-sm">• Cache frequently accessed locations</div>
                  </div>
                  <div className="bg-blue-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-blue-400 mb-1">Saved Locations</div>
                    <div className="text-sm">• Store user's favorite cities</div>
                    <div className="text-sm">• Sync across devices via cloud</div>
                  </div>
                </div>
              </div>

              {/* Alert Service */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-pink-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-pink-400 mb-4 flex items-center gap-2">
                  <span>⚠️</span>
                  Alert Service
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="bg-pink-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-pink-400 mb-1">Severe Weather Monitoring</div>
                    <div className="text-sm">• Monitor NOAA alerts for severe weather</div>
                    <div className="text-sm">• Tornado, hurricane, flood warnings</div>
                    <div className="text-sm">• Heat advisories, winter storm alerts</div>
                  </div>
                  <div className="bg-red-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-red-400 mb-1">Push Notifications</div>
                    <div className="text-sm">• FCM (Android) / APNS (iOS) integration</div>
                    <div className="text-sm">• Location-based alerts for saved cities</div>
                    <div className="text-sm">• User preferences for alert types</div>
                  </div>
                  <div className="bg-orange-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-orange-400 mb-1">Alert History</div>
                    <div className="text-sm">• Store alerts in TimescaleDB</div>
                    <div className="text-sm">• Allow users to view past alerts</div>
                  </div>
                </div>
              </div>

              {/* Map Service */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-2">
                  <span>🗺️</span>
                  Map Service
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="bg-orange-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-orange-400 mb-1">Radar Maps</div>
                    <div className="text-sm">• Real-time precipitation radar</div>
                    <div className="text-sm">• 30-minute loop animation</div>
                    <div className="text-sm">• Intensity levels (light, moderate, heavy)</div>
                  </div>
                  <div className="bg-yellow-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-yellow-400 mb-1">Weather Overlays</div>
                    <div className="text-sm">• Temperature heatmaps</div>
                    <div className="text-sm">• Wind speed & direction arrows</div>
                    <div className="text-sm">• Cloud cover visualization</div>
                  </div>
                  <div className="bg-amber-900/30 p-3 rounded-lg">
                    <div className="font-semibold text-amber-400 mb-1">Tile Generation</div>
                    <div className="text-sm">• Generate map tiles on-demand</div>
                    <div className="text-sm">• Cache tiles in S3 for 1 hour</div>
                    <div className="text-sm">• Serve via CloudFront CDN</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dataflow' && (
          <div className="space-y-8">
            {/* Weather Request Flow */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-blue-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-blue-400">🌤️</span>
                Weather Request Flow
              </h2>

              <div className="space-y-4">
                {[
                  { step: 1, title: 'User Opens App', desc: 'App requests current location via GPS or uses saved location', color: 'blue' },
                  { step: 2, title: 'Check Cache', desc: 'Query Redis: GET weather:{lat}:{lon} → Check if cached (15-min TTL)', color: 'cyan' },
                  { step: 3, title: 'Cache Hit', desc: 'If cache hit (~85%), return cached weather data (&lt;50ms)', color: 'green' },
                  { step: 4, title: 'Cache Miss → External API', desc: 'Fetch from OpenWeatherMap API with lat/lon coordinates', color: 'purple' },
                  { step: 5, title: 'Normalize Data', desc: 'Convert units, calculate derived metrics (feels-like, wind chill)', color: 'orange' },
                  { step: 6, title: 'Cache & Return', desc: 'Cache result in Redis (15-min TTL), return to client', color: 'pink' },
                  { step: 7, title: 'Display Weather', desc: 'Render current conditions, hourly/daily forecast, icons', color: 'indigo' }
                ].map(item => (
                  <div key={item.step} className={`bg-${item.color}-900/30 p-5 rounded-lg border-l-4 border-${item.color}-500`}>
                    <div className="flex items-start gap-4">
                      <div className={`bg-${item.color}-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0`}>
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className={`font-bold text-${item.color}-400 mb-1`}>{item.title}</div>
                        <div className="text-gray-300 text-sm">{item.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alert Flow */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-pink-500">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-pink-400">⚠️</span>
                Severe Weather Alert Flow
              </h2>

              <div className="space-y-4">
                {[
                  { step: 1, title: 'NOAA Alert Issued', desc: 'NOAA issues severe weather warning for specific region', color: 'red' },
                  { step: 2, title: 'Webhook Received', desc: 'Alert Service receives webhook from NOAA API', color: 'orange' },
                  { step: 3, title: 'Parse Alert Data', desc: 'Extract alert type, severity, affected regions, expiration time', color: 'yellow' },
                  { step: 4, title: 'Query Affected Users', desc: 'Find users with saved locations in affected region (geospatial query)', color: 'green' },
                  { step: 5, title: 'Publish to Kafka', desc: 'Publish alert event to Kafka topic "weather_alerts"', color: 'purple' },
                  { step: 6, title: 'Send Push Notifications', desc: 'Worker consumes Kafka events, sends FCM/APNS notifications', color: 'blue' },
                  { step: 7, title: 'Store in Database', desc: 'Save alert to TimescaleDB for history tracking', color: 'indigo' }
                ].map(item => (
                  <div key={item.step} className={`bg-${item.color}-900/30 p-5 rounded-lg border-l-4 border-${item.color}-500`}>
                    <div className="flex items-start gap-4">
                      <div className={`bg-${item.color}-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0`}>
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className={`font-bold text-${item.color}-400 mb-1`}>{item.title}</div>
                        <div className="text-gray-300 text-sm">{item.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scalability' && (
          <div className="space-y-8">
            {/* Caching Strategy */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-cyan-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-cyan-600">⚡</span>
                Multi-Layer Caching
              </h2>

              <div className="space-y-4">
                <div className="bg-cyan-50 p-6 rounded-xl border-l-4 border-cyan-500">
                  <div className="font-bold text-cyan-900 mb-3 text-lg">L1: Client-Side Cache</div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>• Cache last weather data locally (SQLite)</div>
                    <div>• Enable offline viewing</div>
                    <div>• Display last update timestamp</div>
                    <div>• Reduce network requests</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <div className="font-bold text-blue-900 mb-3 text-lg">L2: Redis Cache (Server)</div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>• Current weather: 15-minute TTL</div>
                    <div>• Hourly forecast: 1-hour TTL</div>
                    <div>• Daily forecast: 6-hour TTL</div>
                    <div>• Location geocoding: 24-hour TTL</div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                  <div className="font-bold text-purple-900 mb-3 text-lg">L3: CDN Cache (Edge)</div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>• Cache map tiles at edge locations</div>
                    <div>• Weather icons and static assets</div>
                    <div>• 7-day TTL for static content</div>
                  </div>
                </div>
              </div>
            </div>

            {/* API Rate Limiting */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-orange-600">🚦</span>
                API Rate Limiting & Cost Optimization
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                  <h3 className="font-bold text-orange-900 mb-3">External API Limits</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• OpenWeatherMap: <strong>1M calls/month (free tier)</strong></div>
                    <div>• ~33K calls/day budget</div>
                    <div>• With 85% cache hit rate: ~5K actual calls/day</div>
                    <div>• Well within free tier limits</div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                  <h3 className="font-bold text-green-900 mb-3">Cost Optimization</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• Aggressive caching reduces API costs</div>
                    <div>• Batch requests for multiple locations</div>
                    <div>• Use webhooks instead of polling for alerts</div>
                    <div>• Estimated cost: &lt;$100/month</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Optimizations */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-green-600">🚀</span>
                Mobile Performance Optimizations
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-xl">
                  <div className="font-bold text-green-900 mb-3 text-lg">Battery Efficiency</div>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• <strong>GPS:</strong> Request location only on app open</div>
                    <div>• <strong>Background refresh:</strong> Limit to once per hour</div>
                    <div>• <strong>Network:</strong> Batch requests when possible</div>
                    <div>• <strong>Geofencing:</strong> Alert only when entering/leaving regions</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="font-bold text-blue-900 mb-3 text-lg">Offline Support</div>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• <strong>Local cache:</strong> Store last 24 hours of weather data</div>
                    <div>• <strong>Graceful degradation:</strong> Show cached data with timestamp</div>
                    <div>• <strong>Sync on reconnect:</strong> Update when network available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tradeoffs' && (
          <div className="space-y-8">
            {/* Technology Stack */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-indigo-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-indigo-600">🛠️</span>
                Technology Stack
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-indigo-50 p-6 rounded-xl border-2 border-indigo-200">
                  <h3 className="font-bold text-indigo-900 mb-4">Mobile Apps</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold text-gray-900">iOS: Swift + SwiftUI</div>
                      <div className="text-gray-700">Native performance, smooth animations, Apple ecosystem</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Android: Kotlin + Jetpack Compose</div>
                      <div className="text-gray-700">Modern UI framework, efficient coroutines</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Local Storage: SQLite + Room</div>
                      <div className="text-gray-700">Offline caching for weather data</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-4">Backend Services</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold text-gray-900">API: Node.js / Python (FastAPI)</div>
                      <div className="text-gray-700">Async I/O for external API calls</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Cache: Redis</div>
                      <div className="text-gray-700">High-speed caching with TTL support</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Message Queue: Kafka</div>
                      <div className="text-gray-700">Async alert processing</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Design Trade-offs */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-orange-600">⚖️</span>
                Key Design Trade-offs
              </h2>

              <div className="space-y-6">
                {/* Real-time vs Cached */}
                <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                  <h3 className="text-xl font-bold text-orange-900 mb-4">1. Real-time Updates vs Caching</h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                      <div className="font-bold text-green-700 mb-2">Real-time (No Cache)</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Pros:</strong></div>
                        <div>• Always up-to-date</div>
                        <div>• Most accurate data</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Slow (2+ seconds per request)</div>
                        <div>• High API costs</div>
                        <div>• Rate limit issues</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                      <div className="font-bold text-blue-700 mb-2">Aggressive Caching</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Pros:</strong></div>
                        <div>• Fast response (&lt;50ms)</div>
                        <div>• Low API costs</div>
                        <div>• No rate limit issues</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Slightly stale data (up to 15 min)</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-100 p-4 rounded-lg border-2 border-purple-300">
                    <div className="font-bold text-purple-900 mb-2">🎯 Our Decision: 15-Minute Cache TTL</div>
                    <div className="text-sm text-gray-800">
                      Weather changes slowly (15 minutes is acceptable staleness). Caching dramatically improves UX and reduces costs. Use 85% cache hit rate to balance freshness and performance.
                    </div>
                  </div>
                </div>

                {/* Single API vs Multiple */}
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">2. Single Weather API vs Multiple Providers</h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
                      <div className="font-bold text-purple-700 mb-2">Single API Provider</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Pros:</strong></div>
                        <div>• Simpler integration</div>
                        <div>• Lower cost</div>
                        <div>• Consistent data format</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Single point of failure</div>
                        <div>• Accuracy varies by region</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                      <div className="font-bold text-green-700 mb-2">Multiple Providers</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Pros:</strong></div>
                        <div>• Higher accuracy (aggregate)</div>
                        <div>• Redundancy/failover</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Complex integration</div>
                        <div>• Higher API costs</div>
                        <div>• Data inconsistencies</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cyan-100 p-4 rounded-lg border-2 border-cyan-300">
                    <div className="font-bold text-cyan-900 mb-2">🎯 Our Decision: Primary + Fallback</div>
                    <div className="text-sm text-gray-800">
                      Use OpenWeatherMap as primary (free tier, good coverage). Add NOAA as fallback for US locations. Provides redundancy without excessive costs.
                    </div>
                  </div>
                </div>

                {/* Native vs Cross-Platform */}
                <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-green-900 mb-4">3. Native Apps vs Cross-Platform (React Native / Flutter)</h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                      <div className="font-bold text-blue-700 mb-2">Cross-Platform (React Native)</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Pros:</strong></div>
                        <div>• Single codebase (iOS + Android)</div>
                        <div>• Faster development</div>
                        <div>• Lower cost</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Performance overhead</div>
                        <div>• Platform-specific bugs</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                      <div className="font-bold text-green-700 mb-2">Native (Swift/Kotlin)</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Pros:</strong></div>
                        <div>• Best performance</div>
                        <div>• Native UI/UX</div>
                        <div>• Full platform API access</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Separate codebases</div>
                        <div>• Higher development cost</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-100 p-4 rounded-lg border-2 border-emerald-300">
                    <div className="font-bold text-emerald-900 mb-2">🎯 Our Decision: Native Apps</div>
                    <div className="text-sm text-gray-800">
                      Weather apps require smooth animations, map rendering, and GPS efficiency. Native provides best UX and performance. Backend API is shared, so duplication is minimal.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

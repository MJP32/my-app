import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

export default function ApartmentAlarmSystem({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: '📋 Overview', icon: '📋' },
    { id: 'components', label: '🔧 Core Components', icon: '🔧' },
    { id: 'dataflow', label: '🔄 Data Flow', icon: '🔄' },
    { id: 'scalability', label: '📈 Scalability', icon: '📈' },
    { id: 'tradeoffs', label: '⚖️ Trade-offs', icon: '⚖️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 border-l-8 border-red-500">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 font-medium"
            >
              <span>←</span>
              <span>Back</span>
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 flex items-center gap-3">
              <span className="text-5xl">🚨</span>
              <span className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Apartment Alarm System
              </span>
            </h1>
            <div className="w-24"></div>
          </div>
          <p className="text-gray-600 text-lg text-center">
            Design an IoT-based security system for apartment buildings with real-time monitoring, sensor integration, mobile alerts, and emergency response
          </p>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} />

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b-2 border-gray-200 overflow-x-auto pb-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab.id
                  ? 'text-red-600 bg-red-50 border-b-4 border-red-600 -mb-0.5'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-red-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-red-600">📝</span>
                System Requirements
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-green-700 mb-3">✅ Functional Requirements</h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Door/Window Sensors:</strong> Monitor all entry points across apartments</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Motion Detectors:</strong> PIR sensors for indoor motion detection</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Fire & Smoke Alarms:</strong> Integrated fire detection system</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Access Control:</strong> Keycard/PIN/biometric entry system</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Mobile Alerts:</strong> Push notifications for security events</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Video Surveillance:</strong> Common area cameras with recording</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Emergency Response:</strong> One-touch panic button integration</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span><strong>Central Monitoring:</strong> Building security dashboard</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-orange-700 mb-3">⚡ Non-Functional Requirements</h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>High Availability:</strong> 99.99% uptime for security monitoring</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Low Latency:</strong> Alert delivery within 2 seconds</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Scalability:</strong> Support 500+ apartments per building</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Reliability:</strong> Redundant communication (WiFi + cellular)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Battery Backup:</strong> 24-hour power backup for sensors</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span><strong>Data Security:</strong> End-to-end encryption for all communications</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Diagram */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-orange-600">🏗️</span>
                High-Level Architecture
              </h2>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-xl border-2 border-orange-200">
                <svg viewBox="0 0 1200 1000" className="w-full h-auto">
                  {/* IoT Devices Layer */}
                  <rect x="50" y="50" width="140" height="70" fill="#dc2626" rx="8"/>
                  <text x="120" y="80" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Door Sensors</text>
                  <text x="120" y="100" textAnchor="middle" fill="white" fontSize="10">IoT - Zigbee</text>

                  <rect x="220" y="50" width="140" height="70" fill="#dc2626" rx="8"/>
                  <text x="290" y="80" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Motion Sensors</text>
                  <text x="290" y="100" textAnchor="middle" fill="white" fontSize="10">PIR - WiFi</text>

                  <rect x="390" y="50" width="140" height="70" fill="#dc2626" rx="8"/>
                  <text x="460" y="80" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Fire Alarms</text>
                  <text x="460" y="100" textAnchor="middle" fill="white" fontSize="10">Smoke/Heat</text>

                  <rect x="560" y="50" width="140" height="70" fill="#dc2626" rx="8"/>
                  <text x="630" y="80" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Cameras</text>
                  <text x="630" y="100" textAnchor="middle" fill="white" fontSize="10">1080p RTSP</text>

                  <rect x="730" y="50" width="140" height="70" fill="#dc2626" rx="8"/>
                  <text x="800" y="80" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Access Control</text>
                  <text x="800" y="100" textAnchor="middle" fill="white" fontSize="10">RFID/PIN</text>

                  {/* IoT Gateway */}
                  <rect x="220" y="170" width="480" height="60" fill="#f59e0b" rx="8"/>
                  <text x="460" y="205" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">IoT Gateway / Hub (MQTT Broker)</text>

                  {/* Edge Processing */}
                  <rect x="50" y="280" width="200" height="70" fill="#8b5cf6" rx="8"/>
                  <text x="150" y="305" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Edge Processing</text>
                  <text x="150" y="325" textAnchor="middle" fill="white" fontSize="10">Local AI Detection</text>
                  <text x="150" y="340" textAnchor="middle" fill="white" fontSize="10">Raspberry Pi/Jetson</text>

                  {/* Load Balancer */}
                  <rect x="320" y="280" width="280" height="60" fill="#6366f1" rx="8"/>
                  <text x="460" y="315" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Load Balancer (ALB)</text>

                  {/* API Gateway */}
                  <rect x="320" y="380" width="280" height="60" fill="#3b82f6" rx="8"/>
                  <text x="460" y="415" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">API Gateway</text>

                  {/* Services Layer */}
                  <rect x="30" y="490" width="160" height="90" fill="#10b981" rx="8"/>
                  <text x="110" y="520" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Alarm Service</text>
                  <text x="110" y="540" textAnchor="middle" fill="white" fontSize="9">Event Processing</text>
                  <text x="110" y="555" textAnchor="middle" fill="white" fontSize="9">Rule Engine</text>

                  <rect x="210" y="490" width="160" height="90" fill="#06b6d4" rx="8"/>
                  <text x="290" y="520" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Alert Service</text>
                  <text x="290" y="540" textAnchor="middle" fill="white" fontSize="9">Push/SMS/Email</text>
                  <text x="290" y="555" textAnchor="middle" fill="white" fontSize="9">Emergency Dispatch</text>

                  <rect x="390" y="490" width="160" height="90" fill="#ec4899" rx="8"/>
                  <text x="470" y="520" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">User Service</text>
                  <text x="470" y="540" textAnchor="middle" fill="white" fontSize="9">Authentication</text>
                  <text x="470" y="555" textAnchor="middle" fill="white" fontSize="9">Permissions</text>

                  <rect x="570" y="490" width="160" height="90" fill="#f59e0b" rx="8"/>
                  <text x="650" y="520" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Video Service</text>
                  <text x="650" y="540" textAnchor="middle" fill="white" fontSize="9">Stream/Record</text>
                  <text x="650" y="555" textAnchor="middle" fill="white" fontSize="9">Motion Detection</text>

                  <rect x="750" y="490" width="160" height="90" fill="#8b5cf6" rx="8"/>
                  <text x="830" y="520" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Access Service</text>
                  <text x="830" y="540" textAnchor="middle" fill="white" fontSize="9">Entry Logs</text>
                  <text x="830" y="555" textAnchor="middle" fill="white" fontSize="9">Guest Access</text>

                  {/* Message Queue */}
                  <rect x="320" y="630" width="280" height="60" fill="#f97316" rx="8"/>
                  <text x="460" y="655" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Message Queue (Kafka/MQTT)</text>
                  <text x="460" y="675" textAnchor="middle" fill="white" fontSize="11">Real-time Event Stream</text>

                  {/* Cache Layer */}
                  <rect x="650" y="630" width="240" height="60" fill="#ef4444" rx="8"/>
                  <text x="770" y="655" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Cache (Redis)</text>
                  <text x="770" y="675" textAnchor="middle" fill="white" fontSize="11">Sensor State, Sessions</text>

                  {/* Databases */}
                  <rect x="40" y="740" width="150" height="80" fill="#334155" rx="8"/>
                  <text x="115" y="770" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Event DB</text>
                  <text x="115" y="790" textAnchor="middle" fill="white" fontSize="9">TimescaleDB</text>

                  <rect x="210" y="740" width="150" height="80" fill="#334155" rx="8"/>
                  <text x="285" y="770" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">User DB</text>
                  <text x="285" y="790" textAnchor="middle" fill="white" fontSize="9">PostgreSQL</text>

                  <rect x="380" y="740" width="150" height="80" fill="#334155" rx="8"/>
                  <text x="455" y="770" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Config DB</text>
                  <text x="455" y="790" textAnchor="middle" fill="white" fontSize="9">MongoDB</text>

                  <rect x="550" y="740" width="150" height="80" fill="#059669" rx="8"/>
                  <text x="625" y="770" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Video Storage</text>
                  <text x="625" y="790" textAnchor="middle" fill="white" fontSize="9">S3/NAS</text>

                  <rect x="720" y="740" width="150" height="80" fill="#0891b2" rx="8"/>
                  <text x="795" y="770" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Analytics DB</text>
                  <text x="795" y="790" textAnchor="middle" fill="white" fontSize="9">ClickHouse</text>

                  {/* External Services */}
                  <rect x="320" y="870" width="160" height="60" fill="#7c3aed" rx="8"/>
                  <text x="400" y="895" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Emergency Services</text>
                  <text x="400" y="915" textAnchor="middle" fill="white" fontSize="10">911/Fire Dept</text>

                  <rect x="500" y="870" width="160" height="60" fill="#2563eb" rx="8"/>
                  <text x="580" y="895" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Security Company</text>
                  <text x="580" y="915" textAnchor="middle" fill="white" fontSize="10">24/7 Monitoring</text>

                  {/* Connections */}
                  <path d="M 120 120 L 460 170" stroke="#f59e0b" strokeWidth="2" fill="none"/>
                  <path d="M 290 120 L 460 170" stroke="#f59e0b" strokeWidth="2" fill="none"/>
                  <path d="M 460 120 L 460 170" stroke="#f59e0b" strokeWidth="2" fill="none"/>
                  <path d="M 630 120 L 460 170" stroke="#f59e0b" strokeWidth="2" fill="none"/>
                  <path d="M 800 120 L 460 170" stroke="#f59e0b" strokeWidth="2" fill="none"/>

                  <path d="M 150 230 L 150 280" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
                  <path d="M 460 230 L 460 280" stroke="#6366f1" strokeWidth="2" fill="none"/>

                  <path d="M 460 340 L 460 380" stroke="#3b82f6" strokeWidth="2" fill="none"/>

                  <path d="M 460 440 L 110 490" stroke="#10b981" strokeWidth="2" fill="none"/>
                  <path d="M 460 440 L 290 490" stroke="#06b6d4" strokeWidth="2" fill="none"/>
                  <path d="M 460 440 L 470 490" stroke="#ec4899" strokeWidth="2" fill="none"/>
                  <path d="M 460 440 L 650 490" stroke="#f59e0b" strokeWidth="2" fill="none"/>
                  <path d="M 460 440 L 830 490" stroke="#8b5cf6" strokeWidth="2" fill="none"/>

                  <path d="M 110 580 L 460 630" stroke="#f97316" strokeWidth="2" fill="none"/>
                  <path d="M 290 580 L 460 630" stroke="#f97316" strokeWidth="2" fill="none"/>
                  <path d="M 470 580 L 770 630" stroke="#ef4444" strokeWidth="2" fill="none"/>

                  <path d="M 110 580 L 115 740" stroke="#334155" strokeWidth="2" fill="none"/>
                  <path d="M 470 580 L 285 740" stroke="#334155" strokeWidth="2" fill="none"/>
                  <path d="M 470 580 L 455 740" stroke="#334155" strokeWidth="2" fill="none"/>
                  <path d="M 650 580 L 625 740" stroke="#059669" strokeWidth="2" fill="none"/>
                  <path d="M 290 580 L 400 870" stroke="#7c3aed" strokeWidth="2" fill="none"/>
                  <path d="M 290 580 L 580 870" stroke="#2563eb" strokeWidth="2" fill="none"/>
                </svg>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <div className="font-bold text-red-900 mb-2">IoT Device Layer</div>
                  <div className="text-sm text-red-800">Sensors, cameras, and access control devices connected via IoT protocols</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <div className="font-bold text-orange-900 mb-2">Service Layer</div>
                  <div className="text-sm text-orange-800">Microservices for alarms, alerts, video, and access control</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <div className="font-bold text-purple-900 mb-2">Data Layer</div>
                  <div className="text-sm text-purple-800">Time-series events, user data, video storage, and analytics</div>
                </div>
              </div>
            </div>

            {/* Scale Estimates */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-emerald-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-emerald-600">📊</span>
                Scale & Capacity Estimates
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-4 text-lg">Building & Device Scale</h3>
                  <div className="space-y-2 text-gray-700">
                    <div>• Apartments per building: <strong>500 units</strong></div>
                    <div>• Sensors per apartment: <strong>~12 sensors</strong></div>
                    <div>• Total sensors per building: <strong>~6,000 devices</strong></div>
                    <div>• Common area cameras: <strong>~50 cameras</strong></div>
                    <div>• Sensor polling rate: <strong>1-5 seconds</strong></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                  <h3 className="font-bold text-green-900 mb-4 text-lg">Event & Traffic Volume</h3>
                  <div className="space-y-2 text-gray-700">
                    <div>• Sensor events per day: <strong>~5M events</strong></div>
                    <div>• Average events per second: <strong>~60 EPS</strong></div>
                    <div>• Peak events per second: <strong>~200 EPS</strong></div>
                    <div>• Alarm events per day: <strong>~50-100 events</strong></div>
                    <div>• False alarm rate: <strong>~95% (filtered)</strong></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
                  <h3 className="font-bold text-purple-900 mb-4 text-lg">Storage Requirements</h3>
                  <div className="space-y-2 text-gray-700">
                    <div>• Event logs (1 year): <strong>~500 GB</strong></div>
                    <div>• User/config data: <strong>~10 GB</strong></div>
                    <div>• Video storage (30 days): <strong>~20 TB</strong></div>
                    <div>• Video per camera/day: <strong>~400 GB (H.265)</strong></div>
                    <div>• Total storage: <strong>~21 TB</strong></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border-2 border-orange-200">
                  <h3 className="font-bold text-orange-900 mb-4 text-lg">Bandwidth & Latency</h3>
                  <div className="space-y-2 text-gray-700">
                    <div>• Sensor bandwidth: <strong>~1 MB/s (aggregate)</strong></div>
                    <div>• Video streaming: <strong>~250 Mbps (50 cameras)</strong></div>
                    <div>• Alert latency target: <strong>&lt;2 seconds</strong></div>
                    <div>• Event processing latency: <strong>&lt;500ms</strong></div>
                    <div>• Video retrieval latency: <strong>&lt;5 seconds</strong></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'components' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Alarm Service */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
                  <span>🚨</span>
                  Alarm Service
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="font-semibold text-green-900 mb-1">Event Processing</div>
                    <div className="text-sm">• Consume sensor events from MQTT/Kafka</div>
                    <div className="text-sm">• Apply rule engine (e.g., door open + motion = intrusion)</div>
                    <div className="text-sm">• Filter false alarms (debouncing, time windows)</div>
                    <div className="text-sm">• Classify alarm severity (low/medium/high/critical)</div>
                  </div>
                  <div className="bg-teal-50 p-3 rounded-lg">
                    <div className="font-semibold text-teal-900 mb-1">Rule Engine</div>
                    <div className="text-sm">• User-defined alarm rules</div>
                    <div className="text-sm">• Zone-based monitoring (perimeter vs interior)</div>
                    <div className="text-sm">• Arm/disarm schedules</div>
                    <div className="text-sm">• Smart home integration (lights, locks)</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="font-semibold text-blue-900 mb-1">State Management</div>
                    <div className="text-sm">• Track alarm state (armed/disarmed/triggered)</div>
                    <div className="text-sm">• Store in Redis for fast access</div>
                    <div className="text-sm">• Persist to TimescaleDB for audit logs</div>
                  </div>
                </div>
              </div>

              {/* Alert Service */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-cyan-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-cyan-700 mb-4 flex items-center gap-2">
                  <span>🔔</span>
                  Alert Service
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-cyan-50 p-3 rounded-lg">
                    <div className="font-semibold text-cyan-900 mb-1">Multi-Channel Notifications</div>
                    <div className="text-sm">• Push notifications (FCM/APNS) - highest priority</div>
                    <div className="text-sm">• SMS for critical alarms (Twilio)</div>
                    <div className="text-sm">• Email for low-priority events</div>
                    <div className="text-sm">• In-app notifications for building staff</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="font-semibold text-blue-900 mb-1">Emergency Dispatch</div>
                    <div className="text-sm">• Auto-dial 911 for fire/medical emergencies</div>
                    <div className="text-sm">• Contact security monitoring company</div>
                    <div className="text-sm">• Notify building management</div>
                    <div className="text-sm">• Provide location, apartment #, emergency type</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="font-semibold text-purple-900 mb-1">Alert Escalation</div>
                    <div className="text-sm">• Retry logic if notification fails</div>
                    <div className="text-sm">• Escalate if not acknowledged in 5 min</div>
                    <div className="text-sm">• Contact alternate emergency contacts</div>
                  </div>
                </div>
              </div>

              {/* Video Service */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-orange-700 mb-4 flex items-center gap-2">
                  <span>📹</span>
                  Video Service
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="font-semibold text-orange-900 mb-1">Video Streaming</div>
                    <div className="text-sm">• RTSP/HLS streams from cameras</div>
                    <div className="text-sm">• Live view on mobile/web dashboard</div>
                    <div className="text-sm">• H.265 compression (50% bandwidth savings)</div>
                    <div className="text-sm">• Adaptive bitrate streaming</div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <div className="font-semibold text-yellow-900 mb-1">Recording & Storage</div>
                    <div className="text-sm">• 24/7 continuous recording to NAS/S3</div>
                    <div className="text-sm">• 30-day retention policy</div>
                    <div className="text-sm">• Motion-triggered clip extraction</div>
                    <div className="text-sm">• Clip sharing for incident reports</div>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="font-semibold text-red-900 mb-1">AI Motion Detection</div>
                    <div className="text-sm">• Edge AI for person/vehicle detection</div>
                    <div className="text-sm">• Reduce false alarms from pets/shadows</div>
                    <div className="text-sm">• Face recognition for access control</div>
                  </div>
                </div>
              </div>

              {/* Access Control Service */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                  <span>🔑</span>
                  Access Control Service
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="font-semibold text-purple-900 mb-1">Entry Methods</div>
                    <div className="text-sm">• RFID keycards/fobs</div>
                    <div className="text-sm">• PIN codes (temporary/permanent)</div>
                    <div className="text-sm">• Mobile app (Bluetooth/NFC unlock)</div>
                    <div className="text-sm">• Biometric (fingerprint/face recognition)</div>
                  </div>
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <div className="font-semibold text-indigo-900 mb-1">Access Logs</div>
                    <div className="text-sm">• Record all entry/exit events</div>
                    <div className="text-sm">• Timestamp, user ID, location</div>
                    <div className="text-sm">• Failed access attempts (security audit)</div>
                    <div className="text-sm">• Export logs for compliance</div>
                  </div>
                  <div className="bg-pink-50 p-3 rounded-lg">
                    <div className="font-semibold text-pink-900 mb-1">Guest Access</div>
                    <div className="text-sm">• Temporary PIN codes for visitors</div>
                    <div className="text-sm">• Time-limited access (e.g., 2-hour window)</div>
                    <div className="text-sm">• Delivery person access</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dataflow' && (
          <div className="space-y-8">
            {/* Intrusion Detection Flow */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-red-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-red-600">🚨</span>
                Intrusion Detection Flow
              </h2>

              <div className="space-y-4">
                {[
                  { step: 1, title: 'Door Sensor Triggered', desc: 'Door sensor detects opening while alarm is armed', color: 'red' },
                  { step: 2, title: 'Sensor Event Published', desc: 'IoT device publishes event to MQTT broker (topic: sensors/door/apt_501)', color: 'orange' },
                  { step: 3, title: 'Edge Processing', desc: 'Edge gateway validates event, checks for tampering/battery status', color: 'yellow' },
                  { step: 4, title: 'Alarm Service Processes', desc: 'Rule engine evaluates: armed state + door open = intrusion alarm', color: 'green' },
                  { step: 5, title: 'Grace Period Check', desc: 'Check if entry delay window (30s) for resident to disarm', color: 'blue' },
                  { step: 6, title: 'Trigger Alarm', desc: 'If not disarmed, publish alarm event to Kafka topic "alarms"', color: 'purple' },
                  { step: 7, title: 'Multi-Channel Alert', desc: 'Alert Service sends push notification, SMS, email to residents and security', color: 'pink' },
                  { step: 8, title: 'Emergency Dispatch', desc: 'If high-severity, auto-contact monitoring company and police', color: 'indigo' },
                  { step: 9, title: 'Activate Sirens', desc: 'Trigger building sirens and strobe lights', color: 'red' },
                  { step: 10, title: 'Record Video', desc: 'Start recording from nearest cameras, save clips to S3', color: 'cyan' }
                ].map(item => (
                  <div key={item.step} className={`bg-${item.color}-50 p-5 rounded-lg border-l-4 border-${item.color}-500`}>
                    <div className="flex items-start gap-4">
                      <div className={`bg-${item.color}-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0`}>
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className={`font-bold text-${item.color}-900 mb-1`}>{item.title}</div>
                        <div className="text-gray-700 text-sm">{item.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fire Alarm Flow */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-orange-600">🔥</span>
                Fire Alarm Flow
              </h2>

              <div className="space-y-4">
                {[
                  { step: 1, title: 'Smoke Detected', desc: 'Smoke detector sensor triggers (>3.5% obscuration threshold)', color: 'red' },
                  { step: 2, title: 'Publish to MQTT', desc: 'Event published to sensors/smoke/apt_501 with sensor ID and value', color: 'orange' },
                  { step: 3, title: 'Immediate Priority', desc: 'Alarm Service marks as CRITICAL (fire = highest priority)', color: 'yellow' },
                  { step: 4, title: 'Building-Wide Alert', desc: 'Trigger fire alarms in ALL apartments (not just affected unit)', color: 'red' },
                  { step: 5, title: 'Emergency Services', desc: 'Auto-dial 911 and fire department with building address, apartment #', color: 'purple' },
                  { step: 6, title: 'Evacuate Notification', desc: 'Send evacuation push notifications to all building residents', color: 'blue' },
                  { step: 7, title: 'Unlock Exit Doors', desc: 'Access control system unlocks all emergency exits', color: 'green' },
                  { step: 8, title: 'Elevator Recall', desc: 'Send elevators to ground floor, disable until firefighters arrive', color: 'indigo' }
                ].map(item => (
                  <div key={item.step} className={`bg-${item.color}-50 p-5 rounded-lg border-l-4 border-${item.color}-500`}>
                    <div className="flex items-start gap-4">
                      <div className={`bg-${item.color}-500 text-white rounded-full w-9 h-9 flex items-center justify-center font-bold flex-shrink-0 text-sm`}>
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className={`font-bold text-${item.color}-900 mb-1`}>{item.title}</div>
                        <div className="text-gray-700 text-sm">{item.desc}</div>
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
            {/* IoT Communication */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-orange-600">📡</span>
                IoT Communication Protocols
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                  <h3 className="font-bold text-orange-900 mb-3">MQTT</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• Lightweight pub/sub protocol</div>
                    <div>• QoS levels (0, 1, 2 for reliability)</div>
                    <div>• Topic hierarchy: sensors/{type}/{apt_id}</div>
                    <div>• Retained messages for sensor state</div>
                    <div>• Last Will & Testament for offline detection</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-3">Zigbee</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• Low-power mesh network</div>
                    <div>• Battery life: 2+ years</div>
                    <div>• Self-healing network</div>
                    <div>• Short range (10-20m indoor)</div>
                    <div>• Ideal for sensors/locks</div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                  <h3 className="font-bold text-purple-900 mb-3">WiFi</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• High bandwidth for cameras</div>
                    <div>• Longer range (50m+)</div>
                    <div>• Higher power consumption</div>
                    <div>• Requires building WiFi infrastructure</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Redundancy & Reliability */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-green-600">🔄</span>
                Redundancy & Reliability
              </h2>

              <div className="space-y-4">
                <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                  <div className="font-bold text-green-900 mb-3 text-lg">Dual Communication</div>
                  <div className="text-sm text-gray-700">
                    • Primary: WiFi/Ethernet for high-bandwidth sensors
                    <br />• Fallback: Cellular (4G/5G) backup if internet down
                    <br />• Automatic failover within 10 seconds
                    <br />• Cellular module in IoT gateway with data plan
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <div className="font-bold text-blue-900 mb-3 text-lg">Battery Backup</div>
                  <div className="text-sm text-gray-700">
                    • UPS for IoT gateway (24-hour runtime)
                    <br />• Battery-powered sensors (2+ year lifespan)
                    <br />• Low-battery alerts at 20% threshold
                    <br />• Cloud-synced sensor battery status
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                  <div className="font-bold text-purple-900 mb-3 text-lg">Edge Processing</div>
                  <div className="text-sm text-gray-700">
                    • Local alarm processing on edge gateway
                    <br />• Continue operating even if cloud disconnected
                    <br />• Sync events when connection restored
                    <br />• Store last 7 days of events locally
                  </div>
                </div>
              </div>
            </div>

            {/* Data Retention */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-indigo-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-indigo-600">💾</span>
                Data Retention & Privacy
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-indigo-50 p-6 rounded-xl">
                  <div className="font-bold text-indigo-900 mb-3">Event Logs</div>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• <strong>Hot storage:</strong> Last 30 days (TimescaleDB)</div>
                    <div>• <strong>Warm storage:</strong> 31-90 days (compressed)</div>
                    <div>• <strong>Cold storage:</strong> 91-365 days (S3 Glacier)</div>
                    <div>• <strong>Archival:</strong> &gt;1 year (long-term compliance)</div>
                  </div>
                </div>

                <div className="bg-pink-50 p-6 rounded-xl">
                  <div className="font-bold text-pink-900 mb-3">Video Recordings</div>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• <strong>Common areas:</strong> 30 days rolling retention</div>
                    <div>• <strong>Incident clips:</strong> Flagged for 1 year</div>
                    <div>• <strong>Privacy zones:</strong> Blur faces/license plates</div>
                    <div>• <strong>GDPR compliance:</strong> Right to request deletion</div>
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
                  <h3 className="font-bold text-indigo-900 mb-4">IoT & Edge</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold text-gray-900">IoT Gateway: Raspberry Pi 4 / NVIDIA Jetson</div>
                      <div className="text-gray-700">Local processing, MQTT broker, edge AI</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">MQTT Broker: Eclipse Mosquitto</div>
                      <div className="text-gray-700">Lightweight, reliable pub/sub messaging</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Sensors: Zigbee/Z-Wave/WiFi</div>
                      <div className="text-gray-700">Multi-protocol support for compatibility</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-4">Backend Services</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold text-gray-900">API: Node.js / Go</div>
                      <div className="text-gray-700">Async I/O for real-time event processing</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Time-Series DB: TimescaleDB</div>
                      <div className="text-gray-700">PostgreSQL extension for sensor data</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Video: Frigate NVR / Shinobi</div>
                      <div className="text-gray-700">Open-source video recording with AI</div>
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
                {/* Cloud vs Local */}
                <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                  <h3 className="text-xl font-bold text-orange-900 mb-4">1. Cloud-Only vs Hybrid (Cloud + Edge)</h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-red-200">
                      <div className="font-bold text-red-700 mb-2">Cloud-Only</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Pros:</strong></div>
                        <div>• Simple deployment</div>
                        <div>• No local hardware to maintain</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Single point of failure (internet down = no alarms)</div>
                        <div>• Higher latency (sensor → cloud → alert)</div>
                        <div>• Subscription costs</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                      <div className="font-bold text-green-700 mb-2">Hybrid (Cloud + Edge)</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Pros:</strong></div>
                        <div>• Works offline (local processing)</div>
                        <div>• Lower latency (&lt;500ms)</div>
                        <div>• No subscription dependency</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Requires edge gateway hardware</div>
                        <div>• More complex setup</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-100 p-4 rounded-lg border-2 border-purple-300">
                    <div className="font-bold text-purple-900 mb-2">🎯 Our Decision: Hybrid Architecture</div>
                    <div className="text-sm text-gray-800">
                      Security systems must work offline. Edge gateway handles local alarms even if internet down. Cloud provides remote access, analytics, and video storage. Best of both worlds.
                    </div>
                  </div>
                </div>

                {/* Wired vs Wireless */}
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">2. Wired vs Wireless Sensors</h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
                      <div className="font-bold text-orange-700 mb-2">Wired Sensors</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Pros:</strong></div>
                        <div>• 100% reliable (no battery/signal issues)</div>
                        <div>• No maintenance</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Expensive installation (pull cables)</div>
                        <div>• Difficult to retrofit</div>
                        <div>• Not feasible for apartments</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                      <div className="font-bold text-green-700 mb-2">Wireless Sensors</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Pros:</strong></div>
                        <div>• Easy installation (no wiring)</div>
                        <div>• Flexible placement</div>
                        <div>• Lower cost</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Battery replacement (every 2 years)</div>
                        <div>• Signal interference possible</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cyan-100 p-4 rounded-lg border-2 border-cyan-300">
                    <div className="font-bold text-cyan-900 mb-2">🎯 Our Decision: Wireless (Zigbee/Z-Wave)</div>
                    <div className="text-sm text-gray-800">
                      Apartments need easy installation without damaging walls. Wireless sensors with 2+ year battery life are practical. Use mesh networking for reliability. Monitor battery levels proactively.
                    </div>
                  </div>
                </div>

                {/* Professional Monitoring */}
                <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-green-900 mb-4">3. Self-Monitored vs Professional Monitoring</h3>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                      <div className="font-bold text-blue-700 mb-2">Self-Monitored</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Pros:</strong></div>
                        <div>• No monthly fees</div>
                        <div>• Full control</div>
                        <div><strong>Cons:</strong></div>
                        <div>• Resident must respond to every alert</div>
                        <div>• No professional oversight</div>
                        <div>• Slower police response (resident calls)</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
                      <div className="font-bold text-purple-700 mb-2">Professional Monitoring</div>
                      <div className="text-sm space-y-1 text-gray-700">
                        <div><strong>Pros:</strong></div>
                        <div>• 24/7 monitoring center</div>
                        <div>• Faster emergency response</div>
                        <div>• UL-certified monitoring</div>
                        <div><strong>Cons:</strong></div>
                        <div>• $30-60/month per apartment</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-100 p-4 rounded-lg border-2 border-emerald-300">
                    <div className="font-bold text-emerald-900 mb-2">🎯 Our Decision: Hybrid Monitoring</div>
                    <div className="text-sm text-gray-800">
                      Offer both options. Building management has professional monitoring for common areas. Individual residents choose self or professional for their units. Fire alarms always trigger professional dispatch.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-red-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-red-600">🔐</span>
                Privacy & Security Considerations
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="font-bold text-red-900 mb-3">Data Encryption</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• <strong>In transit:</strong> TLS 1.3 for all communications</div>
                    <div>• <strong>At rest:</strong> AES-256 encryption for video/logs</div>
                    <div>• <strong>MQTT:</strong> TLS with client certificates</div>
                    <div>• <strong>Mobile app:</strong> End-to-end encryption</div>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="font-bold text-orange-900 mb-3">Access Control</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• <strong>Role-based:</strong> Resident, building staff, admin</div>
                    <div>• <strong>Residents:</strong> Only view their apartment sensors</div>
                    <div>• <strong>Staff:</strong> View common areas + access logs</div>
                    <div>• <strong>Audit trail:</strong> Log all system access</div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="font-bold text-yellow-900 mb-3">Video Privacy</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• <strong>Common areas only:</strong> No cameras in hallways near apartment doors</div>
                    <div>• <strong>Privacy zones:</strong> Auto-blur windows/balconies</div>
                    <div>• <strong>Access restrictions:</strong> Video viewable only by authorized staff</div>
                    <div>• <strong>Retention limits:</strong> Auto-delete after 30 days</div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-bold text-green-900 mb-3">Compliance</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div>• <strong>GDPR:</strong> Right to access/delete personal data</div>
                    <div>• <strong>CCPA:</strong> California privacy compliance</div>
                    <div>• <strong>UL 2050:</strong> Security system certification</div>
                    <div>• <strong>Local codes:</strong> Fire alarm regulations</div>
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

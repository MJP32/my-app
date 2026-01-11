import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function NotificationSystem({ onBack, breadcrumb }) {
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
          ← Back to Projects
        </button>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '800',
          color: '#ffffff',
          margin: 0
        }}>
          🔔 Notification System Design
        </h1>
        <div style={{ width: '140px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

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
          { id: 'overview', label: 'Overview', icon: '📋' },
          { id: 'architecture', label: 'Architecture', icon: '🏗️' },
          { id: 'channels', label: 'Notification Channels', icon: '📡' },
          { id: 'reliability', label: 'Reliability', icon: '🛡️' },
          { id: 'scalability', label: 'Scalability', icon: '⚡' },
          { id: 'api', label: 'API Endpoints', icon: '🔌' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: activeTab === tab.id ? '#374151' : 'transparent',
              color: activeTab === tab.id ? '#fbbf24' : '#9ca3af',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              transition: 'all 0.2s'
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
                Design a scalable notification system that can send millions of notifications per second across
                multiple channels (push, email, SMS) with rate limiting, prioritization, delivery tracking,
                and retry mechanisms to ensure reliable delivery.
              </p>
            </div>

            {/* Scale Metrics */}
            <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-900/30 rounded-xl p-6 border-2 border-yellow-700">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">📊 Scale & Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">10M+</div>
                  <div className="text-sm text-gray-300">Notifications per second (peak)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">100B+</div>
                  <div className="text-sm text-gray-300">Notifications per day</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">500M</div>
                  <div className="text-sm text-gray-300">Active users</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">{'<'} 1 sec</div>
                  <div className="text-sm text-gray-300">Push notification latency (p95)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">99.9%</div>
                  <div className="text-sm text-gray-300">Delivery success rate</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">3 channels</div>
                  <div className="text-sm text-gray-300">Push, Email, SMS</div>
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
                    <li>✓ Send push notifications (iOS, Android, Web)</li>
                    <li>✓ Send emails (transactional, marketing)</li>
                    <li>✓ Send SMS messages</li>
                    <li>✓ Track delivery status</li>
                    <li>✓ User notification preferences</li>
                    <li>✓ Template management</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-blue-400 mb-2">Advanced Features:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>✓ Rate limiting per user</li>
                    <li>✓ Priority levels (urgent, high, normal, low)</li>
                    <li>✓ Batching and deduplication</li>
                    <li>✓ A/B testing</li>
                    <li>✓ Analytics and reporting</li>
                    <li>✓ Multi-language support</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Non-Functional Requirements */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-900/30 rounded-xl p-6 border-2 border-green-700">
              <h3 className="text-2xl font-bold mb-4 text-green-400">⚙️ Non-Functional Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <ul className="space-y-2 text-gray-300">
                    <li><strong>Scalability:</strong> Handle 10M+ notifications/sec</li>
                    <li><strong>Availability:</strong> 99.9% uptime</li>
                    <li><strong>Latency:</strong> {'<'} 1 sec for push, {'<'} 30 sec for email</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2 text-gray-300">
                    <li><strong>Reliability:</strong> At-least-once delivery guarantee</li>
                    <li><strong>Ordering:</strong> FIFO within priority level</li>
                    <li><strong>Security:</strong> Encrypt sensitive data, auth checks</li>
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
              {/* Services/Apps */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 shadow-xl border-2 border-blue-400 max-w-3xl w-full">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-2">📱 Services & Applications</div>
                  <div className="text-sm text-blue-100">Order Service • Payment Service • Social Service • Marketing Service</div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-500">↓</div>
              </div>

              {/* Notification API */}
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 shadow-xl border-2 border-purple-400 max-w-3xl w-full">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-2">🚪 Notification API Gateway</div>
                  <div className="text-sm text-purple-100">REST API • Authentication • Rate limiting • Validation</div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-500">↓</div>
              </div>

              {/* Message Queue */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 shadow-xl border-2 border-green-400 max-w-3xl w-full">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-2">📬 Message Queue (Kafka)</div>
                  <div className="text-sm text-green-100">Partitioned by user_id • 3 topics: push_notifications, email, sms</div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-500">↓</div>
              </div>

              {/* Workers */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 shadow-xl border-2 border-orange-400 max-w-3xl w-full">
                <div className="text-white">
                  <div className="text-2xl font-bold mb-4 text-center">⚙️ Notification Workers</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">Push Workers</div>
                      <div className="text-xs text-orange-100">Process push queue</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">Email Workers</div>
                      <div className="text-xs text-orange-100">Process email queue</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">SMS Workers</div>
                      <div className="text-xs text-orange-100">Process SMS queue</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-500">↓</div>
              </div>

              {/* Third-Party Services */}
              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 shadow-xl border-2 border-red-400 max-w-3xl w-full">
                <div className="text-white">
                  <div className="text-2xl font-bold mb-4 text-center">🌐 Third-Party Services</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">APNs / FCM</div>
                      <div className="text-xs text-red-100">iOS / Android Push</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">SendGrid / SES</div>
                      <div className="text-xs text-red-100">Email Delivery</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">Twilio / SNS</div>
                      <div className="text-xs text-red-100">SMS Delivery</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-500">↓</div>
              </div>

              {/* Data Storage */}
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 shadow-xl border-2 border-indigo-400 max-w-3xl w-full">
                <div className="text-white">
                  <div className="text-2xl font-bold mb-4 text-center">💾 Data Storage</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">PostgreSQL</div>
                      <div className="text-xs text-indigo-100">User preferences</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">Cassandra</div>
                      <div className="text-xs text-indigo-100">Notification logs</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">Redis</div>
                      <div className="text-xs text-indigo-100">Rate limiting</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">S3</div>
                      <div className="text-xs text-indigo-100">Templates</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* API Example */}
            <div className="mt-8 bg-gradient-to-br from-yellow-900/30 to-yellow-900/30 rounded-xl p-6 border-2 border-yellow-700">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">📝 API Example</h3>
              <div className="bg-gray-800 rounded-lg p-4 shadow font-mono text-sm">
                <div className="text-gray-200">
                  <strong>POST /api/v1/notifications</strong>
                  <pre className="mt-2 text-xs bg-gray-900 p-3 rounded">
{`{
  "user_ids": ["user123", "user456"],
  "channels": ["push", "email"],
  "priority": "high",
  "template_id": "order_shipped",
  "data": {
    "order_id": "ORD-12345",
    "tracking_number": "1Z999AA10123456784"
  },
  "ttl": 86400
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification Channels Tab */}
        {activeTab === 'channels' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-white">📡 Notification Channels</h2>

            {/* Push Notifications */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/30 rounded-xl p-6 border-2 border-blue-700">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">📱 Push Notifications</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">🍎 iOS - APNs (Apple Push Notification service)</div>
                  <div className="text-sm text-gray-300">
                    • Token-based authentication (JWT)<br/>
                    • HTTP/2 connection to api.push.apple.com<br/>
                    • Payload limit: 4KB
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">🤖 Android - FCM (Firebase Cloud Messaging)</div>
                  <div className="text-sm text-gray-300">
                    • API key authentication<br/>
                    • HTTP v1 API<br/>
                    • Payload limit: 4KB
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">🌐 Web Push - Service Workers</div>
                  <div className="text-sm text-gray-300">
                    • Push API + Notifications API<br/>
                    • VAPID authentication<br/>
                    • Works offline via service workers
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">🔔 Device Token Management</div>
                  <div className="text-sm text-gray-300">
                    • Store device tokens in PostgreSQL (user_id → [tokens])<br/>
                    • Handle token refresh/expiration<br/>
                    • Remove invalid tokens after feedback
                  </div>
                </div>
              </div>
            </div>

            {/* Email Notifications */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-900/30 rounded-xl p-6 border-2 border-green-700">
              <h3 className="text-2xl font-bold mb-4 text-green-400">📧 Email Notifications</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">📮 Email Service Providers</div>
                  <div className="text-sm text-gray-300">
                    • <strong>SendGrid:</strong> High deliverability, template engine<br/>
                    • <strong>Amazon SES:</strong> Cost-effective, scalable<br/>
                    • <strong>Mailgun:</strong> Developer-friendly APIs
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">📝 Template Engine</div>
                  <div className="text-sm text-gray-300">
                    • HTML/plain text templates<br/>
                    • Variable substitution (Handlebars, Jinja2)<br/>
                    • Preview and testing tools
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">📊 Email Analytics</div>
                  <div className="text-sm text-gray-300">
                    • Open rate tracking (tracking pixel)<br/>
                    • Click-through tracking (redirect links)<br/>
                    • Bounce and spam complaint handling
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">🛡️ Deliverability</div>
                  <div className="text-sm text-gray-300">
                    • SPF, DKIM, DMARC configuration<br/>
                    • IP warming and reputation management<br/>
                    • Unsubscribe link compliance (CAN-SPAM)
                  </div>
                </div>
              </div>
            </div>

            {/* SMS Notifications */}
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/30 rounded-xl p-6 border-2 border-purple-700">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">💬 SMS Notifications</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">📱 SMS Gateways</div>
                  <div className="text-sm text-gray-300">
                    • <strong>Twilio:</strong> Global coverage, robust APIs<br/>
                    • <strong>Amazon SNS:</strong> Cost-effective, AWS integration<br/>
                    • <strong>Nexmo (Vonage):</strong> Two-way messaging
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">💰 Cost Optimization</div>
                  <div className="text-sm text-gray-300">
                    • SMS is expensive ($0.01-0.05 per message)<br/>
                    • Use only for critical notifications (2FA, alerts)<br/>
                    • Rate limit aggressively (max 5 SMS/day per user)
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">🌍 International Support</div>
                  <div className="text-sm text-gray-300">
                    • Phone number validation (E.164 format)<br/>
                    • Country-specific regulations (GDPR, TCPA)<br/>
                    • Local sender IDs for better delivery
                  </div>
                </div>
              </div>
            </div>

            {/* User Preferences */}
            <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/30 rounded-xl p-6 border-2 border-orange-700">
              <h3 className="text-2xl font-bold mb-4 text-orange-400">⚙️ User Notification Preferences</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">🎛️ Granular Controls</div>
                  <div className="text-sm text-gray-300">
                    • Per-channel preferences (push, email, SMS)<br/>
                    • Per-category preferences (marketing, transactional, social)<br/>
                    • Quiet hours (don't disturb 10pm - 8am)
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">🔕 Opt-out Management</div>
                  <div className="text-sm text-gray-300">
                    • Easy unsubscribe links<br/>
                    • Global opt-out (all notifications)<br/>
                    • Compliance with GDPR, CAN-SPAM
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reliability Tab */}
        {activeTab === 'reliability' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-white">🛡️ Reliability & Delivery Guarantees</h2>

            {/* Delivery Guarantees */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/30 rounded-xl p-6 border-2 border-blue-700">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">✅ At-Least-Once Delivery</h3>
              <div className="space-y-3">
                <p className="text-gray-300">
                  We guarantee at-least-once delivery (not exactly-once) to balance reliability and cost:
                </p>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">1️⃣ Kafka Message Queue</div>
                  <div className="text-sm text-gray-300">Messages persisted to disk, not lost even if consumer crashes</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">2️⃣ Worker Acknowledgment</div>
                  <div className="text-sm text-gray-300">Worker commits offset only after successful delivery to provider</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">3️⃣ Retry Logic</div>
                  <div className="text-sm text-gray-300">Exponential backoff: 1s, 2s, 4s, 8s, 16s, 32s, 64s (max 7 retries)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">4️⃣ Dead Letter Queue (DLQ)</div>
                  <div className="text-sm text-gray-300">After max retries, move to DLQ for manual investigation</div>
                </div>
              </div>
            </div>

            {/* Idempotency */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-900/30 rounded-xl p-6 border-2 border-green-700">
              <h3 className="text-2xl font-bold mb-4 text-green-400">🔁 Idempotency & Deduplication</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">🆔 Notification ID</div>
                  <div className="text-sm text-gray-300">
                    Generate unique notification_id (UUID) at API gateway<br/>
                    Store in Redis with 24-hour TTL
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">✅ Duplicate Detection</div>
                  <div className="text-sm text-gray-300">
                    Before sending, check if notification_id exists in Redis<br/>
                    If exists, skip (already sent)
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">📦 Batching</div>
                  <div className="text-sm text-gray-300">
                    Group similar notifications (e.g., "5 new messages")<br/>
                    Reduce notification fatigue
                  </div>
                </div>
              </div>
            </div>

            {/* Priority Handling */}
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/30 rounded-xl p-6 border-2 border-purple-700">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">⚡ Priority Levels</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow border-2 border-red-400">
                  <div className="font-bold text-gray-200 mb-2">🚨 Urgent (P0)</div>
                  <div className="text-sm text-gray-300">
                    Security alerts, fraud detection, system outages<br/>
                    <strong>Latency:</strong> {'<'} 100ms | <strong>Retry:</strong> Aggressive
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow border-2 border-orange-400">
                  <div className="font-bold text-gray-200 mb-2">⚠️ High (P1)</div>
                  <div className="text-sm text-gray-300">
                    Order updates, payment confirmations, 2FA codes<br/>
                    <strong>Latency:</strong> {'<'} 1 sec | <strong>Retry:</strong> Normal
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow border-2 border-blue-400">
                  <div className="font-bold text-gray-200 mb-2">📊 Normal (P2)</div>
                  <div className="text-sm text-gray-300">
                    Social notifications, reminders<br/>
                    <strong>Latency:</strong> {'<'} 5 sec | <strong>Retry:</strong> Normal
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow border-2 border-gray-400">
                  <div className="font-bold text-gray-200 mb-2">📢 Low (P3)</div>
                  <div className="text-sm text-gray-300">
                    Marketing emails, newsletters<br/>
                    <strong>Latency:</strong> Best effort | <strong>Retry:</strong> Limited
                  </div>
                </div>
              </div>
            </div>

            {/* Monitoring */}
            <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-900/30 rounded-xl p-6 border-2 border-yellow-700">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">📊 Monitoring & Alerting</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">📈 Key Metrics</div>
                  <div className="text-sm text-gray-300">
                    • Delivery rate (successful / total)<br/>
                    • Latency (p50, p95, p99)<br/>
                    • Queue depth (Kafka lag)<br/>
                    • Error rate per channel
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">🚨 Alerts</div>
                  <div className="text-sm text-gray-300">
                    • Delivery rate {'<'} 99% for 5 minutes<br/>
                    • Latency p95 {'>'} 5 seconds<br/>
                    • DLQ size {'>'} 1000 messages
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">🔍 Distributed Tracing</div>
                  <div className="text-sm text-gray-300">
                    Trace notification from API → Queue → Worker → Provider → Delivery<br/>
                    Use Jaeger/Zipkin for end-to-end visibility
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scalability Tab */}
        {activeTab === 'scalability' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-white">⚡ Scalability & Performance</h2>

            {/* Rate Limiting */}
            <div className="bg-gradient-to-br from-red-900/30 to-red-900/30 rounded-xl p-6 border-2 border-red-700">
              <h3 className="text-2xl font-bold mb-4 text-red-400">🚦 Rate Limiting</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">👤 Per-User Rate Limiting</div>
                  <div className="text-sm text-gray-300">
                    • Max 100 notifications/hour per user (push)<br/>
                    • Max 10 emails/hour per user<br/>
                    • Max 5 SMS/day per user
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">🏢 Per-Service Rate Limiting</div>
                  <div className="text-sm text-gray-300">
                    Prevent one service from overwhelming system<br/>
                    Max 10K notifications/sec per service
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">🔧 Implementation</div>
                  <div className="text-sm text-gray-300">
                    • Redis Token Bucket algorithm<br/>
                    • Key: user_id:channel | Value: token count<br/>
                    • TTL: 1 hour (sliding window)
                  </div>
                </div>
              </div>
            </div>

            {/* Kafka Scaling */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/30 rounded-xl p-6 border-2 border-blue-700">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">📬 Kafka Queue Scaling</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">📊 Partitioning Strategy</div>
                  <div className="text-sm text-gray-300">
                    • Partition by user_id (consistent hashing)<br/>
                    • 100 partitions per topic<br/>
                    • Enables parallel processing
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">🔄 Consumer Groups</div>
                  <div className="text-sm text-gray-300">
                    • 100 workers per consumer group<br/>
                    • Each worker processes 1+ partitions<br/>
                    • Auto-rebalancing on worker failure
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">💾 Retention Policy</div>
                  <div className="text-sm text-gray-300">
                    • Retain messages for 7 days<br/>
                    • Replay in case of bugs<br/>
                    • Size-based deletion after 100 GB
                  </div>
                </div>
              </div>
            </div>

            {/* Worker Scaling */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-900/30 rounded-xl p-6 border-2 border-green-700">
              <h3 className="text-2xl font-bold mb-4 text-green-400">⚙️ Worker Auto-Scaling</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">📈 Scaling Metrics</div>
                  <div className="text-sm text-gray-300">
                    • Scale up if: Kafka consumer lag {'>'} 1M messages<br/>
                    • Scale down if: CPU {'<'} 30% for 10 minutes
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">🐳 Kubernetes HPA</div>
                  <div className="text-sm text-gray-300">
                    • Horizontal Pod Autoscaler<br/>
                    • Min: 10 pods, Max: 1000 pods<br/>
                    • Target CPU: 70%
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">⚡ Batch Processing</div>
                  <div className="text-sm text-gray-300">
                    • Workers pull 100 messages at a time<br/>
                    • Process in parallel (10 threads per worker)<br/>
                    • Commit offset after batch completion
                  </div>
                </div>
              </div>
            </div>

            {/* Database Scaling */}
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/30 rounded-xl p-6 border-2 border-purple-700">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">🗄️ Database Scaling</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">📚 Cassandra for Logs</div>
                  <div className="text-sm text-gray-300">
                    • Write-optimized for high throughput<br/>
                    • Partition by (user_id, date)<br/>
                    • TTL: 90 days (auto-delete old logs)
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">🐘 PostgreSQL for Preferences</div>
                  <div className="text-sm text-gray-300">
                    • Shard by user_id<br/>
                    • Read replicas for read-heavy queries<br/>
                    • Cache in Redis (5-min TTL)
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-200 mb-2">⚡ Redis for Rate Limiting</div>
                  <div className="text-sm text-gray-300">
                    • In-memory for sub-millisecond latency<br/>
                    • Redis Cluster for horizontal scaling<br/>
                    • 50+ nodes, 500GB total memory
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Targets */}
            <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/30 rounded-xl p-6 border-2 border-orange-700">
              <h3 className="text-2xl font-bold mb-4 text-orange-400">📊 Performance Targets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-orange-400 mb-1">10M+/sec</div>
                  <div className="text-sm text-gray-300">Peak throughput</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-orange-400 mb-1">{'<'} 1 sec</div>
                  <div className="text-sm text-gray-300">Push notification latency (p95)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-orange-400 mb-1">99.9%</div>
                  <div className="text-sm text-gray-300">Delivery success rate</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-orange-400 mb-1">{'<'} 50ms</div>
                  <div className="text-sm text-gray-300">API response time (p95)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-orange-400 mb-1">99.9%</div>
                  <div className="text-sm text-gray-300">System uptime</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-orange-400 mb-1">{'<'} 0.1%</div>
                  <div className="text-sm text-gray-300">Duplicate notification rate</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Endpoints Tab */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            {/* API Overview */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-900/30 rounded-xl p-6 border-2 border-green-700">
              <h2 className="text-2xl font-bold mb-4 text-green-400">🔌 Notification API Overview</h2>
              <p className="text-gray-300 mb-4">
                RESTful API for sending notifications across multiple channels (push, email, SMS). Supports templates, scheduling, and user preferences.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-green-400 mb-2">Base URL</div>
                  <code className="text-sm text-gray-300">https://api.notifications.com/v1</code>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-green-400 mb-2">Authentication</div>
                  <code className="text-sm text-gray-300">API Key + OAuth 2.0</code>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-green-400 mb-2">Rate Limit</div>
                  <code className="text-sm text-gray-300">1000 req/min per service</code>
                </div>
              </div>
            </div>

            {/* Send Notification APIs */}
            <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-white">📤 Send Notification APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/notifications/send</code>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">Send a notification to one or more users</p>
                  <div className="bg-gray-900 p-3 rounded">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "user_ids": ["user123", "user456"],
  "channel": "push",
  "title": "New Message",
  "body": "You have a new message from John",
  "data": {
    "conversation_id": "conv789",
    "deep_link": "/messages/conv789"
  },
  "priority": "high"
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/notifications/send/bulk</code>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">Send notification to many users (batch)</p>
                  <div className="bg-gray-900 p-3 rounded">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "user_ids": ["user1", "user2", ...1000 users],
  "channel": "email",
  "template_id": "welcome_email",
  "variables": {
    "company_name": "Acme Inc"
  }
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/notifications/send/topic</code>
                  </div>
                  <p className="text-sm text-gray-300">Send notification to all users subscribed to a topic</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/notifications/schedule</code>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">Schedule a notification for later</p>
                  <div className="bg-gray-900 p-3 rounded">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "user_ids": ["user123"],
  "channel": "push",
  "title": "Reminder",
  "body": "Your appointment is tomorrow",
  "scheduled_at": "2024-01-20T10:00:00Z"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* User Preferences APIs */}
            <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-white">⚙️ User Preferences APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/users/:userId/preferences</code>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">Get user's notification preferences</p>
                  <div className="bg-gray-900 p-3 rounded">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "user_id": "user123",
  "channels": {
    "push": {
      "enabled": true,
      "categories": {
        "messages": true,
        "promotions": false
      }
    },
    "email": {
      "enabled": true,
      "frequency": "immediate"
    },
    "sms": {
      "enabled": false
    }
  }
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded text-xs font-bold">PUT</span>
                    <code className="text-sm text-gray-300">/users/:userId/preferences</code>
                  </div>
                  <p className="text-sm text-gray-300">Update notification preferences</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/users/:userId/devices</code>
                  </div>
                  <p className="text-sm text-gray-300">Register device for push notifications</p>
                </div>

                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-red-900/30 text-red-400 rounded text-xs font-bold">DELETE</span>
                    <code className="text-sm text-gray-300">/users/:userId/devices/:deviceId</code>
                  </div>
                  <p className="text-sm text-gray-300">Unregister a device</p>
                </div>
              </div>
            </div>

            {/* Template APIs */}
            <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-white">📝 Template APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/templates</code>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">Create a notification template</p>
                  <div className="bg-gray-900 p-3 rounded">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "name": "order_shipped",
  "channel": "email",
  "subject": "Your order has shipped!",
  "body": "Hi {{user_name}}, your order {{order_id}} has shipped.",
  "variables": ["user_name", "order_id"]
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/templates/:templateId</code>
                  </div>
                  <p className="text-sm text-gray-300">Get template details</p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded text-xs font-bold">PUT</span>
                    <code className="text-sm text-gray-300">/templates/:templateId</code>
                  </div>
                  <p className="text-sm text-gray-300">Update a template</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/templates</code>
                  </div>
                  <p className="text-sm text-gray-300">List all templates</p>
                </div>
              </div>
            </div>

            {/* Status & Analytics APIs */}
            <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-white">📊 Status & Analytics APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/notifications/:notificationId/status</code>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">Check notification delivery status</p>
                  <div className="bg-gray-900 p-3 rounded">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "notification_id": "notif_abc123",
  "status": "delivered",
  "sent_at": "2024-01-20T10:00:00Z",
  "delivered_at": "2024-01-20T10:00:03Z",
  "opened_at": "2024-01-20T10:05:00Z"
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/notifications/:notificationId/analytics</code>
                  </div>
                  <p className="text-sm text-gray-300">Get analytics (delivery rate, open rate, click rate)</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/users/:userId/notifications</code>
                  </div>
                  <p className="text-sm text-gray-300">Get user's notification history</p>
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
                  <div className="text-green-400 font-bold">202 Accepted</div>
                  <div className="text-gray-300 text-sm">Notification queued</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                  <div className="text-yellow-400 font-bold">400 Bad Request</div>
                  <div className="text-gray-300 text-sm">Invalid payload</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                  <div className="text-yellow-400 font-bold">401 Unauthorized</div>
                  <div className="text-gray-300 text-sm">Invalid API key</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                  <div className="text-red-400 font-bold">404 Not Found</div>
                  <div className="text-gray-300 text-sm">User/template not found</div>
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

export default NotificationSystem

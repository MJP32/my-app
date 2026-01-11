import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { useTheme } from '../../contexts/ThemeContext'

function Dropbox({ onBack, breadcrumb }) {
  const { colors } = useTheme()
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: colors.bgPrimary, minHeight: '100vh' }}>
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
          color: colors.textPrimary,
          margin: 0
        }}>
          📁 Dropbox File Storage & Sync System Design
        </h1>
        <div style={{ width: '140px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        borderBottom: `1px solid ${colors.border}`,
        paddingBottom: '0.5rem',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'overview', label: 'Overview', icon: '📋' },
          { id: 'architecture', label: 'Architecture', icon: '🏗️' },
          { id: 'sync', label: 'File Sync', icon: '🔄' },
          { id: 'dedup', label: 'Deduplication', icon: '🗜️' },
          { id: 'features', label: 'Features', icon: '✨' },
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
              color: activeTab === tab.id ? '#60a5fa' : '#9ca3af',
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
        backgroundColor: colors.bgSecondary,
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        minHeight: '500px',
        color: colors.textPrimary
      }}>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">System Overview</h2>
              <p className="text-gray-600 leading-relaxed">
                Design a cloud file storage and synchronization service like Dropbox that allows users to store files,
                sync across devices, share with others, and maintain version history. The system must handle file
                deduplication, conflict resolution, and efficient bandwidth usage.
              </p>
            </div>

            {/* Scale Metrics */}
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-2xl font-bold mb-4 text-blue-800">📊 Scale & Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-blue-600 mb-1">700M+</div>
                  <div className="text-sm text-gray-600">Registered users</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-blue-600 mb-1">600M+</div>
                  <div className="text-sm text-gray-600">Files uploaded daily</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-blue-600 mb-1">2 EB+</div>
                  <div className="text-sm text-gray-600">Data stored (Exabytes)</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-blue-600 mb-1">1B+</div>
                  <div className="text-sm text-gray-600">File uploads/day</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-blue-600 mb-1">95%</div>
                  <div className="text-sm text-gray-600">Bandwidth saved via dedup</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-blue-600 mb-1">5 devices</div>
                  <div className="text-sm text-gray-600">Average devices per user</div>
                </div>
              </div>
            </div>

            {/* Functional Requirements */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-2xl font-bold mb-4 text-green-800">🎯 Functional Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-green-700 mb-2">Core Features:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Upload and download files</li>
                    <li>✓ File/folder synchronization across devices</li>
                    <li>✓ Automatic sync on file changes</li>
                    <li>✓ Share files and folders</li>
                    <li>✓ Offline access to files</li>
                    <li>✓ File version history</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-green-700 mb-2">Advanced Features:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Conflict resolution</li>
                    <li>✓ File deduplication</li>
                    <li>✓ Delta sync (only changed parts)</li>
                    <li>✓ Public/private sharing links</li>
                    <li>✓ Collaborative editing</li>
                    <li>✓ File recovery (deleted files)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Non-Functional Requirements */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-2xl font-bold mb-4 text-purple-800">⚙️ Non-Functional Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Reliability:</strong> 99.99% uptime, no data loss</li>
                    <li><strong>Consistency:</strong> Eventual consistency for sync</li>
                    <li><strong>Latency:</strong> {'<'} 2 sec for file metadata sync</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Bandwidth:</strong> Minimize via chunking + dedup</li>
                    <li><strong>Security:</strong> Encryption at rest and in transit</li>
                    <li><strong>Scalability:</strong> Handle billions of files</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Architecture Tab */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">🏗️ High-Level Architecture</h2>

            <div className="flex flex-col items-center space-y-4">
              {/* Client Layer */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 shadow-xl border-2 border-blue-400 max-w-3xl w-full">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-2">📱 Dropbox Clients</div>
                  <div className="text-sm text-blue-100">Desktop (Windows, Mac, Linux) • Mobile (iOS, Android) • Web Browser</div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-500">↓</div>
              </div>

              {/* Load Balancer */}
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 shadow-xl border-2 border-purple-400 max-w-3xl w-full">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-2">⚖️ Load Balancer (ELB)</div>
                  <div className="text-sm text-purple-100">Distribute requests across API servers • Health checks • SSL termination</div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-500">↓</div>
              </div>

              {/* API Servers */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 shadow-xl border-2 border-green-400 max-w-3xl w-full">
                <div className="text-white">
                  <div className="text-2xl font-bold mb-4 text-center">🖥️ API Servers (Stateless)</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      'Upload API',
                      'Download API',
                      'Metadata API',
                      'Sync API',
                      'Sharing API',
                      'Auth API',
                      'Notification API',
                      'Search API'
                    ].map(api => (
                      <div key={api} className="bg-white/20 rounded-lg p-3 backdrop-blur text-center text-sm font-medium">
                        {api}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-500">↓</div>
              </div>

              {/* Message Queue */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 shadow-xl border-2 border-orange-400 max-w-3xl w-full">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-2">📬 Message Queue (Kafka/SQS)</div>
                  <div className="text-sm text-orange-100">Async processing • Sync notifications • File upload events</div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-500">↓</div>
              </div>

              {/* Storage Layer */}
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 shadow-xl border-2 border-indigo-400 max-w-3xl w-full">
                <div className="text-white">
                  <div className="text-2xl font-bold mb-4 text-center">💾 Storage Layer</div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">S3 / Block Storage</div>
                      <div className="text-xs text-indigo-100">File chunks (4MB)</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">PostgreSQL</div>
                      <div className="text-xs text-indigo-100">File metadata</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">Redis</div>
                      <div className="text-xs text-indigo-100">Cache, sessions</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">Cassandra</div>
                      <div className="text-xs text-indigo-100">User activity logs</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">Elasticsearch</div>
                      <div className="text-xs text-indigo-100">File search</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">DynamoDB</div>
                      <div className="text-xs text-indigo-100">Chunk hash index</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Components */}
            <div className="mt-8 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border-2 border-pink-200">
              <h3 className="text-2xl font-bold mb-4 text-pink-800">🔧 Key Components</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">📂 Metadata Database</div>
                  <div className="text-sm text-gray-600">Stores file/folder names, paths, permissions, versions, sharing info</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🗂️ Block Storage (S3)</div>
                  <div className="text-sm text-gray-600">Stores actual file chunks (4MB blocks), deduplicated via SHA-256 hash</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🔄 Sync Service</div>
                  <div className="text-sm text-gray-600">Monitors file changes, notifies other devices via WebSocket/long polling</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🔍 Deduplication Engine</div>
                  <div className="text-sm text-gray-600">Chunk-level dedup using content-defined chunking (CDC)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* File Sync Tab */}
        {activeTab === 'sync' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">🔄 File Synchronization</h2>

            {/* Upload Flow */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">📤 File Upload Flow</h3>

              <div className="flex flex-col items-center space-y-4">
                {/* Step 1 */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 shadow-xl border-2 border-blue-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">1️⃣ File Chunking</div>
                    <div className="text-sm text-blue-100">Split file into 4MB chunks using content-defined chunking (CDC)</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-blue-400">↓</div>
                </div>

                {/* Step 2 */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 shadow-xl border-2 border-green-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">2️⃣ Compute Chunk Hashes</div>
                    <div className="text-sm text-green-100">Calculate SHA-256 hash for each chunk for deduplication</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-green-400">↓</div>
                </div>

                {/* Step 3 */}
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 shadow-xl border-2 border-yellow-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">3️⃣ Check if Chunks Exist</div>
                    <div className="text-sm text-yellow-100">Query hash index (DynamoDB) to see if chunks already stored</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-yellow-400">↓</div>
                </div>

                {/* Step 4 */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 shadow-xl border-2 border-orange-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">4️⃣ Upload Missing Chunks Only</div>
                    <div className="text-sm text-orange-100">Upload only new chunks to S3, skip existing ones (dedup!)</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-orange-400">↓</div>
                </div>

                {/* Step 5 */}
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 shadow-xl border-2 border-purple-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">5️⃣ Update Metadata</div>
                    <div className="text-sm text-purple-100">Store file metadata in PostgreSQL (name, path, chunk references)</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-purple-400">↓</div>
                </div>

                {/* Step 6 */}
                <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-6 shadow-xl border-2 border-pink-400 max-w-3xl w-full">
                  <div className="text-white text-center">
                    <div className="text-xl font-bold mb-2">6️⃣ Notify Other Devices</div>
                    <div className="text-sm text-pink-100">Push notification via WebSocket to sync file to other devices</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Flow */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">📥 File Download Flow</h3>

              <div className="flex flex-col items-center space-y-4">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl p-6 shadow-xl border-2 border-indigo-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">1️⃣ Fetch File Metadata</div>
                    <div className="text-sm text-indigo-100">Get list of chunk hashes from PostgreSQL</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-indigo-400">↓</div>
                </div>

                <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl p-6 shadow-xl border-2 border-cyan-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">2️⃣ Download Chunks</div>
                    <div className="text-sm text-cyan-100">Download chunks from S3 in parallel (up to 10 concurrent)</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-cyan-400">↓</div>
                </div>

                <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 shadow-xl border-2 border-teal-400 max-w-3xl w-full">
                  <div className="text-white text-center">
                    <div className="text-xl font-bold mb-2">3️⃣ Reassemble File</div>
                    <div className="text-sm text-teal-100">Combine chunks in correct order, verify integrity</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Conflict Resolution */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border-2 border-red-200">
              <h3 className="text-2xl font-bold mb-4 text-red-800">⚔️ Conflict Resolution</h3>
              <div className="space-y-3">
                <p className="text-gray-700">
                  When the same file is modified on multiple devices simultaneously:
                </p>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🕐 Last-Write-Wins (LWW)</div>
                  <div className="text-sm text-gray-600">Most recent timestamp wins, but keep conflicting copy</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">📋 Conflicted Copy</div>
                  <div className="text-sm text-gray-600">Create "file (User's conflicted copy 2024-01-15).txt" for losing version</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🔢 Version Vectors</div>
                  <div className="text-sm text-gray-600">Track version history per device to detect conflicts</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Deduplication Tab */}
        {activeTab === 'dedup' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">🗜️ File Deduplication</h2>

            {/* Why Dedup */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border-2 border-yellow-200">
              <h3 className="text-2xl font-bold mb-4 text-yellow-800">💡 Why Deduplication?</h3>
              <div className="space-y-3">
                <p className="text-gray-700">
                  Dropbox saves <strong>95% bandwidth and storage</strong> through deduplication:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Same file uploaded by multiple users → store once</li>
                  <li>• File modified → only upload changed chunks</li>
                  <li>• Large files (videos, ISOs) commonly shared</li>
                  <li>• Operating system files identical across users</li>
                </ul>
              </div>
            </div>

            {/* Content-Defined Chunking */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">✂️ Content-Defined Chunking (CDC)</h3>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 shadow">
                    <div className="font-bold text-gray-800 mb-2">❌ Fixed-Size Chunking (Not Used)</div>
                    <div className="text-sm text-gray-600 mb-2">
                      Split file every 4MB exactly
                    </div>
                    <div className="text-xs text-red-600">
                      Problem: Insert 1 byte at start → all chunks shift → no dedup!
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow border-2 border-green-400">
                    <div className="font-bold text-gray-800 mb-2">✅ Content-Defined Chunking (Used)</div>
                    <div className="text-sm text-gray-600 mb-2">
                      Split at boundaries based on content (rolling hash)
                    </div>
                    <div className="text-xs text-green-600">
                      Benefit: Insert 1 byte → only affected chunk changes, rest stay same!
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
                <h4 className="text-xl font-bold mb-3 text-purple-800">How CDC Works:</h4>
                <div className="space-y-2 text-gray-700">
                  <div className="bg-white rounded-lg p-3 shadow">
                    <strong>1. Rolling Hash:</strong> Compute hash over sliding window (48 bytes)
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow">
                    <strong>2. Boundary Detection:</strong> If hash mod 8192 == 0, mark chunk boundary
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow">
                    <strong>3. Chunk Size Limits:</strong> Min 2MB, Max 8MB, Avg 4MB
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow">
                    <strong>4. SHA-256 Hash:</strong> Compute strong hash of chunk for dedup
                  </div>
                </div>
              </div>
            </div>

            {/* Dedup Example */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-2xl font-bold mb-4 text-green-800">📊 Deduplication Example</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">Scenario:</div>
                  <div className="text-sm text-gray-600">
                    • User A uploads "movie.mp4" (1GB) → 250 chunks<br/>
                    • User B uploads same "movie.mp4" → 0 chunks uploaded!<br/>
                    • Storage used: 1GB (not 2GB)<br/>
                    • Bandwidth saved: 1GB
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">Delta Sync:</div>
                  <div className="text-sm text-gray-600">
                    • User edits 1 page in 100-page PDF → Only 1 chunk changes<br/>
                    • Upload only the modified chunk (~40 KB instead of 5 MB)
                  </div>
                </div>
              </div>
            </div>

            {/* Hash Index */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
              <h3 className="text-2xl font-bold mb-4 text-orange-800">🗂️ Chunk Hash Index</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">📦 DynamoDB Table</div>
                  <div className="text-sm text-gray-600 font-mono">
                    Key: chunk_hash (SHA-256)<br/>
                    Value: s3_key, size, ref_count
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">⚡ Redis Cache</div>
                  <div className="text-sm text-gray-600">Cache popular chunks (hot files) for fast lookup</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🗑️ Garbage Collection</div>
                  <div className="text-sm text-gray-600">When ref_count reaches 0, mark chunk for deletion after 30 days</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">✨ Key Features</h2>

            {/* File Sharing */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-2xl font-bold mb-4 text-blue-800">🔗 File Sharing</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🌐 Public Links</div>
                  <div className="text-sm text-gray-600">Generate shareable URL, optional password protection, expiration date</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">👥 Shared Folders</div>
                  <div className="text-sm text-gray-600">Invite users to folder, real-time collaboration, permission levels (view/edit)</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">📧 Share via Email</div>
                  <div className="text-sm text-gray-600">Send file links directly to email addresses</div>
                </div>
              </div>
            </div>

            {/* Version History */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-2xl font-bold mb-4 text-green-800">📜 Version History</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">⏮️ Restore Previous Versions</div>
                  <div className="text-sm text-gray-600">Keep last 30 days of versions (or unlimited for paid plans)</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">📸 Snapshots</div>
                  <div className="text-sm text-gray-600">Store metadata + chunk references for each version</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🗑️ Deleted File Recovery</div>
                  <div className="text-sm text-gray-600">Recover deleted files within 30-day retention period</div>
                </div>
              </div>
            </div>

            {/* Offline Access */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-2xl font-bold mb-4 text-purple-800">📴 Offline Access</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">💾 Local Cache</div>
                  <div className="text-sm text-gray-600">Store frequently accessed files locally on device</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">✏️ Offline Edits</div>
                  <div className="text-sm text-gray-600">Make changes offline, sync when connection restored</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🔄 Smart Sync</div>
                  <div className="text-sm text-gray-600">Mark files as "online-only" to save disk space</div>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
              <h3 className="text-2xl font-bold mb-4 text-orange-800">🔍 File Search</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">📝 Full-Text Search</div>
                  <div className="text-sm text-gray-600">Search file names, content (PDFs, docs), metadata using Elasticsearch</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🏷️ Filters</div>
                  <div className="text-sm text-gray-600">Filter by file type, date modified, size, owner</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🤖 ML-Powered</div>
                  <div className="text-sm text-gray-600">Image recognition, OCR for scanned documents, tag suggestions</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scalability Tab */}
        {activeTab === 'scalability' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">⚡ Scalability & Performance</h2>

            {/* Database Scaling */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-2xl font-bold mb-4 text-blue-800">🗄️ Metadata Database Scaling</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🔀 Sharding by User ID</div>
                  <div className="text-sm text-gray-600">Partition PostgreSQL by user_id for horizontal scaling</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🔄 Read Replicas</div>
                  <div className="text-sm text-gray-600">Multiple read replicas per shard for read-heavy workload</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">⚡ Redis Caching</div>
                  <div className="text-sm text-gray-600">Cache file metadata, folder listings, user sessions (TTL: 5 min)</div>
                </div>
              </div>
            </div>

            {/* Storage Scaling */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-2xl font-bold mb-4 text-green-800">📦 Block Storage Scaling</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">☁️ S3 Multi-Region</div>
                  <div className="text-sm text-gray-600">Replicate hot chunks across regions for lower latency</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">❄️ Cold Storage</div>
                  <div className="text-sm text-gray-600">Move rarely-accessed chunks to S3 Glacier (90% cost savings)</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🎯 Intelligent Tiering</div>
                  <div className="text-sm text-gray-600">Auto-move chunks between hot/warm/cold storage based on access patterns</div>
                </div>
              </div>
            </div>

            {/* Upload/Download Optimization */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-2xl font-bold mb-4 text-purple-800">⬆️ Upload/Download Optimization</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🔀 Parallel Uploads</div>
                  <div className="text-sm text-gray-600">Upload up to 20 chunks in parallel using HTTP/2 multiplexing</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🔄 Resumable Uploads</div>
                  <div className="text-sm text-gray-600">Track uploaded chunks, resume from failure point</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">📶 Bandwidth Throttling</div>
                  <div className="text-sm text-gray-600">Rate limit uploads/downloads to prevent network saturation</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🗜️ Compression</div>
                  <div className="text-sm text-gray-600">Compress text files before upload (gzip), skip for already compressed (video, images)</div>
                </div>
              </div>
            </div>

            {/* Notification System */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
              <h3 className="text-2xl font-bold mb-4 text-orange-800">📬 Notification System</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">🔌 WebSocket Connections</div>
                  <div className="text-sm text-gray-600">Persistent connections for real-time sync notifications</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">📊 Long Polling Fallback</div>
                  <div className="text-sm text-gray-600">For clients that can't maintain WebSocket</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-gray-800 mb-2">📮 Message Queue (Kafka)</div>
                  <div className="text-sm text-gray-600">Publish file change events to topic, notification servers consume</div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border-2 border-pink-200">
              <h3 className="text-2xl font-bold mb-4 text-pink-800">📊 Performance Targets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-pink-600 mb-1">{'<'} 2 sec</div>
                  <div className="text-sm text-gray-600">File metadata sync latency</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-pink-600 mb-1">95%</div>
                  <div className="text-sm text-gray-600">Bandwidth saved via dedup</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-pink-600 mb-1">99.99%</div>
                  <div className="text-sm text-gray-600">Durability (no data loss)</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-pink-600 mb-1">50 MB/s</div>
                  <div className="text-sm text-gray-600">Average upload speed</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-pink-600 mb-1">100 MB/s</div>
                  <div className="text-sm text-gray-600">Average download speed</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-pink-600 mb-1">{'<'} 100ms</div>
                  <div className="text-sm text-gray-600">Metadata API response time (p95)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Endpoints Tab */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            {/* API Overview */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
              <h2 className="text-2xl font-bold mb-4 text-blue-800">🔌 Dropbox API Overview</h2>
              <p className="text-gray-700 mb-4">
                RESTful API with OAuth 2.0 authentication. Supports file operations, sharing, and team management.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-blue-600 mb-2">Base URL</div>
                  <code className="text-sm text-gray-700">https://api.dropboxapi.com/2</code>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-blue-600 mb-2">Authentication</div>
                  <code className="text-sm text-gray-700">OAuth 2.0 Bearer Token</code>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="font-bold text-blue-600 mb-2">Content Host</div>
                  <code className="text-sm text-gray-700">https://content.dropboxapi.com/2</code>
                </div>
              </div>
            </div>

            {/* File Operations APIs */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">📁 File Operations APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/upload</code>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Upload a file (up to 150MB)</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-semibold text-gray-700 mb-1">Headers:</div>
                    <pre className="text-xs text-gray-700">
{`Dropbox-API-Arg: {
  "path": "/Homework/math.txt",
  "mode": "add",
  "autorename": true
}
Content-Type: application/octet-stream`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/upload_session/start</code>
                  </div>
                  <p className="text-sm text-gray-600">Upload large files in chunks (session-based)</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/download</code>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Download a file</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-semibold text-gray-700 mb-1">Response Headers:</div>
                    <pre className="text-xs text-gray-700">
{`Dropbox-API-Result: {
  "name": "math.txt",
  "size": 1024,
  "path_display": "/Homework/math.txt"
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-700">/files/get_metadata</code>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Get file/folder metadata</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <pre className="text-xs text-gray-700 overflow-x-auto">
{`{
  ".tag": "file",
  "name": "math.txt",
  "id": "id:a4ayc_80_OEAAAAAAAAAXw",
  "path_display": "/Homework/math.txt",
  "size": 1024,
  "server_modified": "2024-01-20T10:00:00Z",
  "rev": "015f9a50d3f8fc0000000001c"
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/delete_v2</code>
                  </div>
                  <p className="text-sm text-gray-600">Delete a file or folder</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/move_v2</code>
                  </div>
                  <p className="text-sm text-gray-600">Move a file or folder</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/copy_v2</code>
                  </div>
                  <p className="text-sm text-gray-600">Copy a file or folder</p>
                </div>
              </div>
            </div>

            {/* Folder Operations APIs */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">📂 Folder Operations APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/create_folder_v2</code>
                  </div>
                  <p className="text-sm text-gray-600">Create a new folder</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/list_folder</code>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">List folder contents</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <pre className="text-xs text-gray-700 overflow-x-auto">
{`{
  "entries": [
    {
      ".tag": "file",
      "name": "math.txt",
      "path_display": "/Homework/math.txt"
    },
    {
      ".tag": "folder",
      "name": "Photos",
      "path_display": "/Photos"
    }
  ],
  "has_more": false
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/list_folder/continue</code>
                  </div>
                  <p className="text-sm text-gray-600">Paginate through folder contents</p>
                </div>
              </div>
            </div>

            {/* Sharing APIs */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">🔗 Sharing APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/sharing/create_shared_link_with_settings</code>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Create a shared link</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <pre className="text-xs text-gray-700 overflow-x-auto">
{`{
  "path": "/Photos/vacation.jpg",
  "settings": {
    "requested_visibility": "public",
    "audience": "public",
    "access": "viewer"
  }
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/sharing/share_folder</code>
                  </div>
                  <p className="text-sm text-gray-600">Share a folder with specific users</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-700">/sharing/list_shared_links</code>
                  </div>
                  <p className="text-sm text-gray-600">List shared links</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/sharing/revoke_shared_link</code>
                  </div>
                  <p className="text-sm text-gray-600">Revoke a shared link</p>
                </div>
              </div>
            </div>

            {/* Search & Version History */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">🔍 Search & Version APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/search_v2</code>
                  </div>
                  <p className="text-sm text-gray-600">Search for files and folders</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/list_revisions</code>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Get file version history</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <pre className="text-xs text-gray-700 overflow-x-auto">
{`{
  "entries": [
    {
      "name": "math.txt",
      "rev": "015f9a50d3f8fc0000000001c",
      "size": 1024,
      "server_modified": "2024-01-20T10:00:00Z"
    }
  ]
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-700">/files/restore</code>
                  </div>
                  <p className="text-sm text-gray-600">Restore a previous file version</p>
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
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                  <div className="text-yellow-400 font-bold">400 Bad Request</div>
                  <div className="text-gray-300 text-sm">Invalid request parameters</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                  <div className="text-yellow-400 font-bold">401 Unauthorized</div>
                  <div className="text-gray-300 text-sm">Invalid or expired token</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                  <div className="text-red-400 font-bold">409 Conflict</div>
                  <div className="text-gray-300 text-sm">File/folder already exists</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                  <div className="text-red-400 font-bold">429 Too Many Requests</div>
                  <div className="text-gray-300 text-sm">Rate limit exceeded</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                  <div className="text-red-400 font-bold">507 Insufficient Storage</div>
                  <div className="text-gray-300 text-sm">User out of space</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dropbox

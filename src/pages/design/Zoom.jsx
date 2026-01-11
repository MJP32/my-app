import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function Zoom({ onBack, breadcrumb }) {
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
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '800',
          color: '#ffffff',
          margin: 0
        }}>
          Zoom Video Conferencing System Design
        </h1>
        <div style={{ width: '140px' }}></div>
      </div>

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
          { id: 'webrtc', label: 'WebRTC & Media' },
          { id: 'features', label: 'Features' },
          { id: 'scalability', label: 'Scalability' },
          { id: 'api', label: 'API Endpoints' }
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
            {tab.label}
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
                Design a video conferencing platform like Zoom that supports high-quality video/audio calls,
                screen sharing, recording, chat, and can scale to handle meetings with 1000+ participants
                while maintaining low latency and high reliability.
              </p>
            </div>

            {/* Scale Metrics */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/30 rounded-xl p-6 border-2 border-blue-700">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Scale & Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-blue-400 mb-1">300M+</div>
                  <div className="text-sm text-gray-300">Daily meeting participants</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-blue-400 mb-1">1000+</div>
                  <div className="text-sm text-gray-300">Participants per meeting</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-blue-400 mb-1">3.3T</div>
                  <div className="text-sm text-gray-300">Annual meeting minutes (2020)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-blue-400 mb-1">{'<'} 150ms</div>
                  <div className="text-sm text-gray-300">End-to-end latency target</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-blue-400 mb-1">99.9%</div>
                  <div className="text-sm text-gray-300">Service uptime</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-3xl font-bold text-blue-400 mb-1">6 PB</div>
                  <div className="text-sm text-gray-300">Video data processed daily</div>
                </div>
              </div>
            </div>

            {/* Functional Requirements */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-900/30 rounded-xl p-6 border-2 border-green-700">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Functional Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-green-400 mb-2">Core Features:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>1-on-1 and group video calls</li>
                    <li>Screen sharing (full screen, window, tab)</li>
                    <li>Audio-only mode</li>
                    <li>Meeting chat (text, files)</li>
                    <li>Recording and playback</li>
                    <li>Virtual backgrounds</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-green-400 mb-2">Advanced Features:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>Breakout rooms</li>
                    <li>Live transcription/captions</li>
                    <li>Polling and reactions</li>
                    <li>Webinars (10K+ attendees)</li>
                    <li>Waiting room</li>
                    <li>End-to-end encryption</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Non-Functional Requirements */}
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/30 rounded-xl p-6 border-2 border-purple-700">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Non-Functional Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <ul className="space-y-2 text-gray-300">
                    <li><strong>Latency:</strong> {'<'} 150ms end-to-end for real-time feel</li>
                    <li><strong>Availability:</strong> 99.9% uptime (8.76 hrs/year downtime)</li>
                    <li><strong>Video Quality:</strong> 1080p HD, adaptive bitrate</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2 text-gray-300">
                    <li><strong>Scalability:</strong> Support 1000+ participants</li>
                    <li><strong>Reliability:</strong> Auto-reconnect on network issues</li>
                    <li><strong>Security:</strong> E2EE, waiting room, password protection</li>
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
                  <div className="text-2xl font-bold mb-2">Zoom Clients</div>
                  <div className="text-sm text-blue-100">Desktop (Windows, Mac, Linux) - Mobile (iOS, Android) - Web (WebRTC)</div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-400">|</div>
              </div>

              {/* Edge Servers */}
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 shadow-xl border-2 border-purple-400 max-w-3xl w-full">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-2">Global Edge Network</div>
                  <div className="text-sm text-purple-100">50+ data centers worldwide - Lowest latency routing - STUN/TURN servers</div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-400">|</div>
              </div>

              {/* Connection Decision */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full">
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 shadow-xl border-2 border-green-400">
                  <div className="text-white text-center">
                    <div className="text-xl font-bold mb-2">P2P Connection</div>
                    <div className="text-sm text-green-100">1-on-1 calls - Direct peer-to-peer - Lower latency</div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 shadow-xl border-2 border-orange-400">
                  <div className="text-white text-center">
                    <div className="text-xl font-bold mb-2">SFU Routing</div>
                    <div className="text-sm text-orange-100">Group calls (3+) - Server-side routing - Optimized bandwidth</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-400">|</div>
              </div>

              {/* Media Processing */}
              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 shadow-xl border-2 border-red-400 max-w-3xl w-full">
                <div className="text-white">
                  <div className="text-2xl font-bold mb-4 text-center">Media Processing Services</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      'Video Transcoding',
                      'Audio Mixing',
                      'Screen Share',
                      'Recording',
                      'Virtual BG',
                      'Noise Suppression',
                      'Echo Cancellation',
                      'Bandwidth Adapt'
                    ].map(service => (
                      <div key={service} className="bg-white/20 rounded-lg p-3 backdrop-blur text-center text-sm font-medium">
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-400">|</div>
              </div>

              {/* Backend Services */}
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 shadow-xl border-2 border-indigo-400 max-w-3xl w-full">
                <div className="text-white">
                  <div className="text-2xl font-bold mb-4 text-center">Backend Services</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      'Auth Service',
                      'Meeting Service',
                      'User Service',
                      'Chat Service',
                      'Recording Service',
                      'Analytics',
                      'Presence',
                      'Notification'
                    ].map(service => (
                      <div key={service} className="bg-white/20 rounded-lg p-3 backdrop-blur text-center text-sm font-medium">
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-4xl text-gray-400">|</div>
              </div>

              {/* Data Storage */}
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 shadow-xl border-2 border-yellow-400 max-w-3xl w-full">
                <div className="text-white">
                  <div className="text-2xl font-bold mb-4 text-center">Data Storage Layer</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">PostgreSQL</div>
                      <div className="text-xs text-yellow-100">Users, Meetings</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">Redis</div>
                      <div className="text-xs text-yellow-100">Presence, Sessions</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">S3</div>
                      <div className="text-xs text-yellow-100">Recordings, Files</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 backdrop-blur text-center">
                      <div className="font-bold">Cassandra</div>
                      <div className="text-xs text-yellow-100">Chat History</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Patterns */}
            <div className="mt-8 bg-gradient-to-br from-pink-900/30 to-pink-900/30 rounded-xl p-6 border-2 border-pink-700">
              <h3 className="text-2xl font-bold mb-4 text-pink-400">Key Architecture Patterns</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Microservices</div>
                  <div className="text-sm text-gray-300">Independent services for auth, meeting, chat, recording</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">WebRTC P2P + SFU</div>
                  <div className="text-sm text-gray-300">P2P for 1-on-1, SFU for group calls</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Edge Computing</div>
                  <div className="text-sm text-gray-300">Media routing at edge for lowest latency</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Load Balancing</div>
                  <div className="text-sm text-gray-300">Geographic + capacity-based routing</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WebRTC & Media Tab */}
        {activeTab === 'webrtc' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-white">WebRTC & Media Streaming</h2>

            {/* WebRTC Connection Flow */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">WebRTC Connection Setup</h3>

              <div className="flex flex-col items-center space-y-4">
                {/* Step 1 */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 shadow-xl border-2 border-blue-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">1. Signaling (WebSocket)</div>
                    <div className="text-sm text-blue-100">Exchange SDP offers/answers, ICE candidates via signaling server</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-blue-400">|</div>
                </div>

                {/* Step 2 */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 shadow-xl border-2 border-green-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">2. STUN Server (NAT Traversal)</div>
                    <div className="text-sm text-green-100">Discover public IP address and port through NAT</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-green-400">|</div>
                </div>

                {/* Step 3 */}
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 shadow-xl border-2 border-yellow-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">3. Direct P2P Connection (if possible)</div>
                    <div className="text-sm text-yellow-100">Peer-to-peer UDP connection for 1-on-1 calls</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-yellow-400">|</div>
                </div>

                {/* Step 4 */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 shadow-xl border-2 border-orange-400 max-w-3xl w-full">
                  <div className="text-white">
                    <div className="text-xl font-bold mb-2">4. TURN Server Fallback</div>
                    <div className="text-sm text-orange-100">Relay through TURN if P2P fails (strict firewalls/NAT)</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="text-4xl text-orange-400">|</div>
                </div>

                {/* Step 5 */}
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 shadow-xl border-2 border-purple-400 max-w-3xl w-full">
                  <div className="text-white text-center">
                    <div className="text-xl font-bold mb-2">5. Media Streaming (RTP/SRTP)</div>
                    <div className="text-sm text-purple-100">Real-time media transmission with encryption</div>
                  </div>
                </div>
              </div>
            </div>

            {/* SFU Architecture */}
            <div className="bg-gradient-to-br from-pink-900/30 to-pink-900/30 rounded-xl p-6 border-2 border-pink-700">
              <h3 className="text-2xl font-bold mb-4 text-pink-400">SFU (Selective Forwarding Unit)</h3>
              <div className="space-y-4">
                <p className="text-gray-300">
                  For group calls (3+ participants), Zoom uses SFU architecture instead of Mesh or MCU:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800 rounded-lg p-4 shadow">
                    <div className="font-bold text-white mb-2">Mesh (Not Used)</div>
                    <div className="text-sm text-gray-300 mb-2">Each peer connects to all others</div>
                    <div className="text-xs text-red-400">Does not scale (N^2 connections)</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 shadow">
                    <div className="font-bold text-white mb-2">MCU (Not Used)</div>
                    <div className="text-sm text-gray-300 mb-2">Server mixes all streams</div>
                    <div className="text-xs text-red-400">CPU intensive, higher latency</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 shadow border-2 border-green-500">
                    <div className="font-bold text-white mb-2">SFU (Used)</div>
                    <div className="text-sm text-gray-300 mb-2">Server forwards streams</div>
                    <div className="text-xs text-green-400">Scalable, low latency</div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">How SFU Works:</div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>- Each participant sends 1 video stream to SFU</li>
                    <li>- SFU forwards N-1 streams to each participant</li>
                    <li>- No transcoding (just routing) = low CPU, low latency</li>
                    <li>- Simulcast: Send multiple quality versions, SFU picks best</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Adaptive Bitrate */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/30 rounded-xl p-6 border-2 border-blue-700">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Adaptive Bitrate Streaming</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Network Monitoring</div>
                  <div className="text-sm text-gray-300">Continuously monitor packet loss, jitter, RTT, available bandwidth</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Quality Adjustment</div>
                  <div className="text-sm text-gray-300">Dynamically adjust resolution (1080p to 720p to 480p to 180p) and frame rate</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Audio Priority</div>
                  <div className="text-sm text-gray-300">Always prioritize audio quality over video (audio is critical)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Simulcast</div>
                  <div className="text-sm text-gray-300">Client sends multiple resolutions, server picks appropriate quality per recipient</div>
                </div>
              </div>
            </div>

            {/* Video Codecs */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-900/30 rounded-xl p-6 border-2 border-green-700">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Video/Audio Codecs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Video Codecs</div>
                  <div className="text-sm text-gray-300">
                    - <strong>H.264/AVC:</strong> Most common, good compatibility<br/>
                    - <strong>VP8/VP9:</strong> Open-source, WebRTC default<br/>
                    - <strong>H.265/HEVC:</strong> Better compression, newer devices
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Audio Codecs</div>
                  <div className="text-sm text-gray-300">
                    - <strong>Opus:</strong> WebRTC default, low latency<br/>
                    - <strong>AAC:</strong> High quality, widely supported<br/>
                    - <strong>G.722:</strong> HD audio for phone systems
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

            {/* Screen Sharing */}
            <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/30 rounded-xl p-6 border-2 border-orange-700">
              <h3 className="text-2xl font-bold mb-4 text-orange-400">Screen Sharing</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Capture Options</div>
                  <div className="text-sm text-gray-300">Full screen, specific window, browser tab, iPhone/iPad screen</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">High Frame Rate</div>
                  <div className="text-sm text-gray-300">Up to 30fps for smooth animations, higher bitrate for clarity</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Content Optimization</div>
                  <div className="text-sm text-gray-300">Detect video content in screen share, optimize for video vs. text</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Remote Control</div>
                  <div className="text-sm text-gray-300">Allow participants to control shared screen (with permission)</div>
                </div>
              </div>
            </div>

            {/* Recording */}
            <div className="bg-gradient-to-br from-red-900/30 to-red-900/30 rounded-xl p-6 border-2 border-red-700">
              <h3 className="text-2xl font-bold mb-4 text-red-400">Cloud Recording</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Cloud vs Local</div>
                  <div className="text-sm text-gray-300">Cloud: Server-side recording to S3 | Local: Client-side to disk</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Recording Modes</div>
                  <div className="text-sm text-gray-300">Speaker view, gallery view, shared screen with speaker, audio-only</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Transcription</div>
                  <div className="text-sm text-gray-300">Automatic speech-to-text, searchable transcripts, multiple languages</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Post-Processing</div>
                  <div className="text-sm text-gray-300">Video encoding to MP4, thumbnail generation, indexing for search</div>
                </div>
              </div>
            </div>

            {/* Virtual Backgrounds & Effects */}
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/30 rounded-xl p-6 border-2 border-purple-700">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Virtual Backgrounds & AI Features</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Virtual Backgrounds</div>
                  <div className="text-sm text-gray-300">ML-based person segmentation, replace background with image/video, blur background</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Appearance Filters</div>
                  <div className="text-sm text-gray-300">Touch up appearance, adjust lighting, eyebrow/lip color, facial recognition</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Noise Suppression</div>
                  <div className="text-sm text-gray-300">AI-powered background noise removal (keyboard, traffic, dogs)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Echo Cancellation</div>
                  <div className="text-sm text-gray-300">Remove acoustic echo when audio feeds back through speakers</div>
                </div>
              </div>
            </div>

            {/* Breakout Rooms */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-900/30 rounded-xl p-6 border-2 border-green-700">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Breakout Rooms</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Room Creation</div>
                  <div className="text-sm text-gray-300">Host creates up to 50 breakout rooms, assign manually or auto-assign</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Participant Management</div>
                  <div className="text-sm text-gray-300">Move participants between rooms, allow self-selection, set timers</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Broadcasting</div>
                  <div className="text-sm text-gray-300">Host can broadcast messages to all breakout rooms</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Return to Main</div>
                  <div className="text-sm text-gray-300">Close all rooms and bring everyone back to main meeting</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scalability Tab */}
        {activeTab === 'scalability' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-white">Scalability & Performance</h2>

            {/* Large Meetings */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/30 rounded-xl p-6 border-2 border-blue-700">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Scaling to 1000+ Participants</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Gallery View Optimization</div>
                  <div className="text-sm text-gray-300">Only render visible tiles (9-49 on screen), lazy load others on scroll</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Active Speaker Detection</div>
                  <div className="text-sm text-gray-300">AI detects who's speaking, send higher quality for active speakers</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Video On-Demand</div>
                  <div className="text-sm text-gray-300">Request video only for visible participants, audio-only for others</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Webinar Mode</div>
                  <div className="text-sm text-gray-300">10K+ attendees view-only, panelists broadcast (hybrid SFU + CDN)</div>
                </div>
              </div>
            </div>

            {/* Global Infrastructure */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-900/30 rounded-xl p-6 border-2 border-green-700">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Global Edge Network</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">50+ Data Centers</div>
                  <div className="text-sm text-gray-300">Distributed across North America, Europe, Asia-Pacific, South America</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Intelligent Routing</div>
                  <div className="text-sm text-gray-300">Route to nearest data center based on latency, capacity, network conditions</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Failover & Redundancy</div>
                  <div className="text-sm text-gray-300">Auto-failover to backup data center if primary fails, no meeting interruption</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Edge Processing</div>
                  <div className="text-sm text-gray-300">Run media mixing/processing at edge for lowest latency</div>
                </div>
              </div>
            </div>

            {/* Bandwidth Optimization */}
            <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/30 rounded-xl p-6 border-2 border-orange-700">
              <h3 className="text-2xl font-bold mb-4 text-orange-400">Bandwidth Optimization</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Adaptive Bitrate</div>
                  <div className="text-sm text-gray-300">
                    - High bandwidth: 1080p @ 3 Mbps<br/>
                    - Medium: 720p @ 1.5 Mbps<br/>
                    - Low: 360p @ 500 Kbps
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Simulcast</div>
                  <div className="text-sm text-gray-300">Send 3 quality layers (low, medium, high), server chooses per recipient</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Audio-Only Mode</div>
                  <div className="text-sm text-gray-300">Fallback to audio-only when bandwidth is critically low ({'<'} 100 Kbps)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Network Telemetry</div>
                  <div className="text-sm text-gray-300">Monitor RTT, packet loss, jitter every 1-2 seconds, adjust in real-time</div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/30 rounded-xl p-6 border-2 border-purple-700">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Performance Targets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-purple-400 mb-1">{'<'} 150ms</div>
                  <div className="text-sm text-gray-300">End-to-end latency for real-time feel</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-purple-400 mb-1">{'<'} 1%</div>
                  <div className="text-sm text-gray-300">Packet loss rate</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-purple-400 mb-1">{'<'} 30ms</div>
                  <div className="text-sm text-gray-300">Jitter (latency variation)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-purple-400 mb-1">30 fps</div>
                  <div className="text-sm text-gray-300">Video frame rate (1080p)</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-purple-400 mb-1">99.9%</div>
                  <div className="text-sm text-gray-300">Uptime SLA</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-2xl font-bold text-purple-400 mb-1">{'<'} 3 sec</div>
                  <div className="text-sm text-gray-300">Time to join meeting</div>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-gradient-to-br from-red-900/30 to-red-900/30 rounded-xl p-6 border-2 border-red-700">
              <h3 className="text-2xl font-bold mb-4 text-red-400">Security Measures</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">End-to-End Encryption (E2EE)</div>
                  <div className="text-sm text-gray-300">AES-256 GCM encryption, only participants have keys, server can't decrypt</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Waiting Room</div>
                  <div className="text-sm text-gray-300">Host approves participants before joining, prevent Zoom-bombing</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Meeting Passwords</div>
                  <div className="text-sm text-gray-300">Require password to join, embedded in invite link</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-white mb-2">Meeting Lock</div>
                  <div className="text-sm text-gray-300">Host can lock meeting to prevent new participants from joining</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Endpoints Tab */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            {/* API Overview */}
            <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/30 rounded-xl p-6 border-2 border-blue-700">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">Zoom API Overview</h2>
              <p className="text-gray-300 mb-4">
                RESTful API with OAuth 2.0 and JWT authentication. Supports meeting management, user management, webhooks, and real-time controls.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-blue-400 mb-2">Base URL</div>
                  <code className="text-sm text-gray-300">https://api.zoom.us/v2</code>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-blue-400 mb-2">Authentication</div>
                  <code className="text-sm text-gray-300">OAuth 2.0 / JWT / Server-to-Server OAuth</code>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="font-bold text-blue-400 mb-2">Rate Limit</div>
                  <code className="text-sm text-gray-300">50-100 req/sec (varies by endpoint)</code>
                </div>
              </div>
            </div>

            {/* Meeting Management APIs */}
            <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-white">Meeting Management APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/users/:userId/meetings</code>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">Create a new meeting</p>
                  <div className="bg-gray-900 p-3 rounded">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "topic": "My Meeting",
  "type": 2,
  "start_time": "2024-01-20T10:00:00Z",
  "duration": 60,
  "password": "abc123",
  "settings": {
    "host_video": true,
    "participant_video": true,
    "waiting_room": true,
    "join_before_host": false
  }
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/meetings/:meetingId</code>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">Get meeting details</p>
                  <div className="bg-gray-900 p-3 rounded">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "id": 123456789,
  "topic": "My Meeting",
  "join_url": "https://zoom.us/j/123456789?pwd=xxx",
  "start_url": "https://zoom.us/s/123456789?zak=xxx",
  "status": "waiting",
  "duration": 60,
  "settings": {...}
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded text-xs font-bold">PATCH</span>
                    <code className="text-sm text-gray-300">/meetings/:meetingId</code>
                  </div>
                  <p className="text-sm text-gray-300">Update meeting details</p>
                </div>

                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-red-900/30 text-red-400 rounded text-xs font-bold">DELETE</span>
                    <code className="text-sm text-gray-300">/meetings/:meetingId</code>
                  </div>
                  <p className="text-sm text-gray-300">Delete a meeting</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/users/:userId/meetings</code>
                  </div>
                  <p className="text-sm text-gray-300">List user's meetings</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-bold">PUT</span>
                    <code className="text-sm text-gray-300">/meetings/:meetingId/status</code>
                  </div>
                  <p className="text-sm text-gray-300">Update meeting status (end meeting)</p>
                </div>
              </div>
            </div>

            {/* User & Participant APIs */}
            <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-white">User & Participant APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/users/:userId</code>
                  </div>
                  <p className="text-sm text-gray-300">Get user information</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/meetings/:meetingId/participants</code>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">List meeting participants</p>
                  <div className="bg-gray-900 p-3 rounded">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "participants": [
    {
      "id": "participant123",
      "user_id": "user789",
      "name": "John Doe",
      "email": "john@example.com",
      "join_time": "2024-01-20T10:05:00Z",
      "duration": 3600,
      "attentiveness_score": 95
    }
  ]
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-bold">PUT</span>
                    <code className="text-sm text-gray-300">/live_meetings/:meetingId/participants/:participantId</code>
                  </div>
                  <p className="text-sm text-gray-300">Update participant (mute, remove, spotlight)</p>
                </div>
              </div>
            </div>

            {/* Recording APIs */}
            <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-white">Recording APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/meetings/:meetingId/recordings</code>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">Get meeting recordings</p>
                  <div className="bg-gray-900 p-3 rounded">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "recording_files": [
    {
      "id": "rec123",
      "recording_type": "shared_screen_with_speaker_view",
      "file_type": "MP4",
      "file_size": 524288000,
      "download_url": "https://zoom.us/rec/download/...",
      "play_url": "https://zoom.us/rec/play/..."
    }
  ]
}`}
                    </pre>
                  </div>
                </div>

                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-red-900/30 text-red-400 rounded text-xs font-bold">DELETE</span>
                    <code className="text-sm text-gray-300">/meetings/:meetingId/recordings/:recordingId</code>
                  </div>
                  <p className="text-sm text-gray-300">Delete a recording</p>
                </div>
              </div>
            </div>

            {/* Webinar APIs */}
            <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-white">Webinar APIs</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/users/:userId/webinars</code>
                  </div>
                  <p className="text-sm text-gray-300">Create a webinar</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs font-bold">GET</span>
                    <code className="text-sm text-gray-300">/webinars/:webinarId</code>
                  </div>
                  <p className="text-sm text-gray-300">Get webinar details</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-bold">POST</span>
                    <code className="text-sm text-gray-300">/webinars/:webinarId/registrants</code>
                  </div>
                  <p className="text-sm text-gray-300">Add webinar registrant</p>
                </div>
              </div>
            </div>

            {/* Webhooks */}
            <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-white">Webhook Events</h3>

              <div className="space-y-3">
                <div className="bg-blue-900/30 p-3 rounded">
                  <div className="font-bold text-blue-400 mb-1">meeting.started</div>
                  <div className="text-sm text-gray-300">Triggered when a meeting starts</div>
                </div>
                <div className="bg-blue-900/30 p-3 rounded">
                  <div className="font-bold text-blue-400 mb-1">meeting.ended</div>
                  <div className="text-sm text-gray-300">Triggered when a meeting ends</div>
                </div>
                <div className="bg-blue-900/30 p-3 rounded">
                  <div className="font-bold text-blue-400 mb-1">meeting.participant_joined</div>
                  <div className="text-sm text-gray-300">Triggered when a participant joins</div>
                </div>
                <div className="bg-blue-900/30 p-3 rounded">
                  <div className="font-bold text-blue-400 mb-1">recording.completed</div>
                  <div className="text-sm text-gray-300">Triggered when recording is ready</div>
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
                  <div className="text-gray-300 text-sm">Resource created</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                  <div className="text-yellow-400 font-bold">400 Bad Request</div>
                  <div className="text-gray-300 text-sm">Invalid request</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                  <div className="text-yellow-400 font-bold">401 Unauthorized</div>
                  <div className="text-gray-300 text-sm">Invalid credentials</div>
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

export default Zoom

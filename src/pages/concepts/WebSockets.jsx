import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

export default function WebSockets({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-950 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 px-5 py-2.5 bg-gray-800 border-2 border-green-700 hover:border-green-600 text-green-300 hover:text-white font-medium rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            ← Back to Projects
          </button>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              🔌 Long Polling vs WebSockets
            </h1>
            <span className="px-3 py-1 bg-green-900/50 text-green-300 rounded-lg text-xs font-bold uppercase tracking-wide border border-green-700">
              Core Concept
            </span>
          </div>
          <p className="text-xl text-gray-300 mb-6 font-light">
            Enable real-time bidirectional communication between clients and servers
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-lg text-sm font-medium border border-green-700">WebSockets</span>
            <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-lg text-sm font-medium border border-blue-700">Long Polling</span>
            <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-lg text-sm font-medium border border-purple-700">SSE</span>
            <span className="px-4 py-2 bg-orange-900/30 text-orange-300 rounded-lg text-sm font-medium border border-orange-700">Real-time</span>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} />

        <div className="flex gap-2 mb-8 border-b-2 border-gray-700 overflow-x-auto pb-0">
          {['overview', 'comparison', 'implementation', 'examples'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-green-400 bg-green-900/30 border-b-2 border-green-600 -mb-0.5'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'comparison' && 'Comparison'}
              {tab === 'implementation' && 'Implementation'}
              {tab === 'examples' && 'Examples'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">🔌 WebSockets</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                WebSockets provide full-duplex communication channels over a single TCP connection. After an initial HTTP handshake,
                the connection is upgraded to WebSocket protocol, enabling bidirectional real-time data flow.
              </p>
              <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                <h3 className="font-bold text-green-400 mb-3">Key Features:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Persistent connection - stays open for continuous communication</li>
                  <li>• Low latency - no HTTP overhead after initial handshake</li>
                  <li>• Bidirectional - both client and server can send messages anytime</li>
                  <li>• Protocol: ws:// (unsecured) or wss:// (secured with TLS)</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">🔄 Long Polling</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Long polling is a technique where the client makes an HTTP request, and the server holds the request open
                until new data is available or a timeout occurs. Once data is sent, the client immediately opens a new connection.
              </p>
              <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                <h3 className="font-bold text-blue-400 mb-3">How it works:</h3>
                <ol className="space-y-2 text-gray-300">
                  <li>1. Client sends HTTP request</li>
                  <li>2. Server holds connection open (doesn't respond immediately)</li>
                  <li>3. When data available, server responds</li>
                  <li>4. Client processes response and immediately reconnects</li>
                  <li>5. Repeat continuously</li>
                </ol>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">📡 Server-Sent Events (SSE)</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                SSE allows servers to push real-time updates to clients over HTTP. Unlike WebSockets, SSE is unidirectional
                (server to client only) but simpler to implement and works over standard HTTP.
              </p>
              <div className="bg-gray-800 p-6 rounded-xl border border-purple-700">
                <h3 className="font-bold text-purple-400 mb-3">Characteristics:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Unidirectional (server → client)</li>
                  <li>• Automatic reconnection built-in</li>
                  <li>• Works over HTTP/HTTPS</li>
                  <li>• Good for event streams, notifications</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-800/30 to-slate-800/30 rounded-2xl p-8 border-2 border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">Feature Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-gray-800 rounded-xl border border-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="p-4 text-left font-bold text-white">Feature</th>
                      <th className="p-4 text-left font-bold text-green-400">WebSockets</th>
                      <th className="p-4 text-left font-bold text-blue-400">Long Polling</th>
                      <th className="p-4 text-left font-bold text-purple-400">SSE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    <tr>
                      <td className="p-4 font-semibold text-gray-300">Communication</td>
                      <td className="p-4 text-gray-300">Bidirectional</td>
                      <td className="p-4 text-gray-300">Bidirectional</td>
                      <td className="p-4 text-gray-300">Unidirectional (S→C)</td>
                    </tr>
                    <tr className="bg-gray-800/50">
                      <td className="p-4 font-semibold text-gray-300">Protocol</td>
                      <td className="p-4 text-gray-300">ws:// / wss://</td>
                      <td className="p-4 text-gray-300">HTTP/HTTPS</td>
                      <td className="p-4 text-gray-300">HTTP/HTTPS</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-gray-300">Latency</td>
                      <td className="p-4 text-green-400 font-bold">Very Low</td>
                      <td className="p-4 text-yellow-400">Moderate</td>
                      <td className="p-4 text-green-400">Low</td>
                    </tr>
                    <tr className="bg-gray-800/50">
                      <td className="p-4 font-semibold text-gray-300">Overhead</td>
                      <td className="p-4 text-green-400 font-bold">Minimal</td>
                      <td className="p-4 text-red-400">High</td>
                      <td className="p-4 text-green-400">Low</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-gray-300">Browser Support</td>
                      <td className="p-4 text-gray-300">Modern browsers</td>
                      <td className="p-4 text-green-400 font-bold">All browsers</td>
                      <td className="p-4 text-gray-300">Most modern browsers</td>
                    </tr>
                    <tr className="bg-gray-800/50">
                      <td className="p-4 font-semibold text-gray-300">Firewall/Proxy</td>
                      <td className="p-4 text-yellow-400">May be blocked</td>
                      <td className="p-4 text-green-400 font-bold">Works everywhere</td>
                      <td className="p-4 text-green-400">Works well</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-gray-300">Complexity</td>
                      <td className="p-4 text-yellow-400">Moderate</td>
                      <td className="p-4 text-green-400">Simple</td>
                      <td className="p-4 text-green-400 font-bold">Very Simple</td>
                    </tr>
                    <tr className="bg-gray-800/50">
                      <td className="p-4 font-semibold text-gray-300">Best Use Case</td>
                      <td className="p-4 text-gray-300">Chat, gaming, collaboration</td>
                      <td className="p-4 text-gray-300">Fallback, simple updates</td>
                      <td className="p-4 text-gray-300">Notifications, feeds</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">When to Use Each</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-4">Use WebSockets</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>✅ Real-time chat applications</li>
                    <li>✅ Multiplayer games</li>
                    <li>✅ Collaborative editing (Google Docs)</li>
                    <li>✅ Live sports/trading updates</li>
                    <li>✅ IoT device communication</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 text-xl mb-4">Use Long Polling</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>✅ Fallback when WebSockets blocked</li>
                    <li>✅ Legacy browser support needed</li>
                    <li>✅ Infrequent updates</li>
                    <li>✅ Simple notification systems</li>
                    <li>✅ Behind restrictive proxies</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 text-xl mb-4">Use SSE</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>✅ Server-to-client only updates</li>
                    <li>✅ News feeds, social media updates</li>
                    <li>✅ Real-time notifications</li>
                    <li>✅ Stock price tickers</li>
                    <li>✅ Progress monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'implementation' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">WebSocket Implementation</h2>
              <div className="bg-gray-900 p-6 rounded-xl text-white font-mono text-sm mb-4">
                <div className="text-green-400 mb-2">// Client-side (JavaScript)</div>
                <div>const ws = new WebSocket('wss://example.com/socket');</div>
                <div className="mt-2">ws.onopen = () ={'>'} {'{'}</div>
                <div className="ml-4">console.log('Connected');</div>
                <div className="ml-4">ws.send(JSON.stringify({'{'}type: 'hello'{'}'}));</div>
                <div>{'}'}</div>
                <div className="mt-2">ws.onmessage = (event) ={'>'} {'{'}</div>
                <div className="ml-4">const data = JSON.parse(event.data);</div>
                <div className="ml-4">console.log('Received:', data);</div>
                <div>{'}'}</div>
                <div className="mt-2">ws.onerror = (error) ={'>'} console.error(error);</div>
                <div>ws.onclose = () ={'>'} console.log('Disconnected');</div>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl text-white font-mono text-sm">
                <div className="text-green-400 mb-2">// Server-side (Node.js + ws library)</div>
                <div>const WebSocket = require('ws');</div>
                <div>const wss = new WebSocket.Server({'{'} port: 8080 {'}'});</div>
                <div className="mt-2">wss.on('connection', (ws) ={'>'} {'{'}</div>
                <div className="ml-4">ws.on('message', (message) ={'>'} {'{'}</div>
                <div className="ml-8">console.log('Received:', message);</div>
                <div className="ml-8">ws.send(JSON.stringify({'{'}type: 'ack'{'}'}));</div>
                <div className="ml-4">{'}'});</div>
                <div>{'}'});</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Long Polling Implementation</h2>
              <div className="bg-gray-900 p-6 rounded-xl text-white font-mono text-sm mb-4">
                <div className="text-blue-400 mb-2">// Client-side</div>
                <div>async function longPoll() {'{'}</div>
                <div className="ml-4">try {'{'}</div>
                <div className="ml-8">const response = await fetch('/poll');</div>
                <div className="ml-8">const data = await response.json();</div>
                <div className="ml-8">handleUpdate(data);</div>
                <div className="ml-4">{'}'} catch (error) {'{'}</div>
                <div className="ml-8">console.error(error);</div>
                <div className="ml-4">{'}'}</div>
                <div className="ml-4">setTimeout(longPoll, 1000); // Reconnect</div>
                <div>{'}'}</div>
                <div className="mt-2">longPoll(); // Start polling</div>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl text-white font-mono text-sm">
                <div className="text-blue-400 mb-2">// Server-side (Node.js/Express)</div>
                <div>app.get('/poll', async (req, res) ={'>'} {'{'}</div>
                <div className="ml-4">// Wait for new data (up to 30s)</div>
                <div className="ml-4">const data = await waitForData(30000);</div>
                <div className="ml-4">res.json(data);</div>
                <div>{'}'});</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">SSE Implementation</h2>
              <div className="bg-gray-900 p-6 rounded-xl text-white font-mono text-sm mb-4">
                <div className="text-purple-400 mb-2">// Client-side</div>
                <div>const eventSource = new EventSource('/events');</div>
                <div className="mt-2">eventSource.onmessage = (event) ={'>'} {'{'}</div>
                <div className="ml-4">const data = JSON.parse(event.data);</div>
                <div className="ml-4">console.log('Received:', data);</div>
                <div>{'}'}</div>
                <div className="mt-2">eventSource.onerror = (error) ={'>'} {'{'}</div>
                <div className="ml-4">console.error('SSE error:', error);</div>
                <div>{'}'}</div>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl text-white font-mono text-sm">
                <div className="text-purple-400 mb-2">// Server-side (Node.js/Express)</div>
                <div>app.get('/events', (req, res) ={'>'} {'{'}</div>
                <div className="ml-4">res.setHeader('Content-Type', 'text/event-stream');</div>
                <div className="ml-4">res.setHeader('Cache-Control', 'no-cache');</div>
                <div className="ml-4 mt-2">setInterval(() ={'>'} {'{'}</div>
                <div className="ml-8">res.write(`data: ${'{'}JSON.stringify(data){'}'}\n\n`);</div>
                <div className="ml-4">{'}'}, 1000);</div>
                <div>{'}'});</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Real-World Examples</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">💬 Slack - Team Chat (WebSockets)</h3>
                  <p className="text-gray-300">Uses WebSockets for instant message delivery, typing indicators, and presence updates across millions of concurrent connections</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">📝 Google Docs - Collaborative Editing (WebSockets)</h3>
                  <p className="text-gray-300">Real-time document synchronization using WebSockets with operational transformation for conflict resolution</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">📊 Trading Platforms (WebSockets)</h3>
                  <p className="text-gray-300">Stock/crypto exchanges push real-time price updates with microsecond latency for high-frequency trading</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">📧 Gmail - Email Notifications (Long Polling)</h3>
                  <p className="text-gray-300">Originally used long polling for new email notifications before adopting more modern approaches</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">🐦 Twitter/X - Live Feed Updates (SSE)</h3>
                  <p className="text-gray-300">Streams new tweets and notifications from server to client using Server-Sent Events</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Popular Libraries & Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 text-xl mb-2">Socket.IO</h3>
                  <p className="text-gray-300 mb-2">JavaScript library for real-time web applications with automatic fallback support</p>
                  <span className="text-sm text-gray-400">WebSockets + Long Polling fallback</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 text-xl mb-2">SignalR (Microsoft)</h3>
                  <p className="text-gray-300 mb-2">ASP.NET library for adding real-time functionality</p>
                  <span className="text-sm text-gray-400">Automatic transport selection</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 text-xl mb-2">Pusher / Ably</h3>
                  <p className="text-gray-300 mb-2">Managed real-time messaging services</p>
                  <span className="text-sm text-gray-400">WebSockets as a Service</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 text-xl mb-2">Centrifugo</h3>
                  <p className="text-gray-300 mb-2">Scalable real-time messaging server</p>
                  <span className="text-sm text-gray-400">Language-agnostic WebSocket server</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

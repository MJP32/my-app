import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

export default function NetworkProtocols({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-950 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 px-5 py-2.5 bg-gray-800 border-2 border-teal-700 hover:border-teal-600 text-teal-300 hover:text-teal-200 font-medium rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            ← Back to Projects
          </button>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              🔌 Network Protocols
            </h1>
            <span className="px-3 py-1 bg-teal-900/50 text-teal-300 rounded-lg text-xs font-bold uppercase tracking-wide border border-teal-700">
              Core Concept
            </span>
          </div>
          <p className="text-xl text-gray-300 mb-6 font-light">
            How machines talk to each other — the layered rules behind TCP, UDP, and HTTP
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-teal-900/30 text-teal-300 rounded-lg text-sm font-medium border border-teal-700">TCP</span>
            <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-lg text-sm font-medium border border-blue-700">UDP</span>
            <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-lg text-sm font-medium border border-green-700">HTTP/1.1 · 2 · 3</span>
            <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-lg text-sm font-medium border border-purple-700">QUIC</span>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

        <div className="flex gap-2 mb-8 border-b-2 border-gray-700 overflow-x-auto pb-0">
          {['overview', 'tcp-udp', 'http-versions', 'comparison'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-teal-400 bg-teal-900/30 border-b-2 border-teal-400 -mb-0.5'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'tcp-udp' && 'TCP vs UDP'}
              {tab === 'http-versions' && 'HTTP Versions'}
              {tab === 'comparison' && 'Comparison'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-teal-700">
              <h2 className="text-3xl font-bold text-white mb-6">What is a Network Protocol?</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                A network protocol is a standardized set of rules that defines how data is formatted, addressed,
                transmitted, and received between devices. Without shared protocols, two machines could send bits at each
                other forever and never understand a single message.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Protocols are organized into layers, where each layer solves one problem and hands its result to the layer
                above or below it. This separation lets a web browser worry about HTTP while never caring whether the
                packets travel over Wi-Fi, fiber, or a cellular network.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">The Layering Model</h2>
              <p className="text-gray-300 text-lg mb-6">
                The OSI model has 7 layers; the practical TCP/IP model collapses them into 4. Each layer wraps the data
                from the layer above with its own header (encapsulation).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">📨 Application Layer</h3>
                  <p className="text-gray-300">HTTP, DNS, SMTP, FTP — the protocols apps speak directly. This is where requests and responses live.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">🚚 Transport Layer</h3>
                  <p className="text-gray-300">TCP and UDP. Provides ports, plus either reliable streams (TCP) or fast datagrams (UDP).</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">🌍 Internet / Network Layer</h3>
                  <p className="text-gray-300">IP (IPv4/IPv6). Routes packets across networks using addresses; best-effort, no guarantees.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">🔗 Link Layer</h3>
                  <p className="text-gray-300">Ethernet, Wi-Fi. Moves frames between directly connected devices over physical media.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Where TCP, UDP, and HTTP Sit</h2>
              <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                <div className="font-mono text-sm text-gray-300 space-y-2">
                  <div className="text-green-400">Application:  HTTP / DNS / TLS</div>
                  <div className="pl-6 text-gray-500">▼ encapsulated into ▼</div>
                  <div className="text-blue-400">Transport:    TCP  /  UDP   (ports, reliability)</div>
                  <div className="pl-6 text-gray-500">▼ encapsulated into ▼</div>
                  <div className="text-purple-400">Internet:     IP    (addressing, routing)</div>
                  <div className="pl-6 text-gray-500">▼ encapsulated into ▼</div>
                  <div className="text-orange-400">Link:         Ethernet / Wi-Fi (frames)</div>
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  HTTP/1.1 and HTTP/2 ride on TCP. HTTP/3 instead rides on QUIC, which is built on UDP.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tcp-udp' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">TCP — Transmission Control Protocol</h2>
              <p className="text-gray-300 text-lg mb-4">
                TCP is connection-oriented and reliable. Before any data flows, both sides establish a connection, and TCP
                then guarantees that bytes arrive in order, with no duplicates and no loss.
              </p>
              <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 mb-4">
                <h3 className="font-bold text-blue-400 mb-4">The 3-Way Handshake:</h3>
                <ol className="space-y-3 text-gray-300">
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-400 min-w-[60px]">SYN</span>
                    <span>Client sends SYN with an initial sequence number to request a connection.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-400 min-w-[60px]">SYN-ACK</span>
                    <span>Server replies acknowledging the client and sending its own sequence number.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-400 min-w-[60px]">ACK</span>
                    <span>Client acknowledges the server. The connection is now established and data can flow.</span>
                  </li>
                </ol>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">✅ Guarantees</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Reliable delivery (retransmits lost segments)</li>
                    <li>• Ordered delivery (sequence numbers)</li>
                    <li>• Flow control (receiver advertises a window)</li>
                    <li>• Congestion control (slow start, AIMD)</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">⚠️ Costs</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Handshake adds round-trip latency</li>
                    <li>• Head-of-line blocking: one lost segment stalls everything behind it</li>
                    <li>• Larger headers and per-connection state</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">UDP — User Datagram Protocol</h2>
              <p className="text-gray-300 text-lg mb-4">
                UDP is connectionless and unreliable by design. It fires off independent datagrams with no handshake, no
                acknowledgements, and no ordering — trading guarantees for raw speed and low latency.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">Characteristics</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• No connection setup (zero handshake)</li>
                    <li>• No retransmission or ordering</li>
                    <li>• Tiny 8-byte header</li>
                    <li>• App handles reliability if it needs it</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">Where It Shines</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• DNS lookups (one tiny request/response)</li>
                    <li>• Live video & VoIP (stale data is useless)</li>
                    <li>• Online gaming (latency &gt; perfection)</li>
                    <li>• QUIC / HTTP/3 (reliability rebuilt on top)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Side-by-Side</h2>
              <div className="bg-gray-800 rounded-xl border border-green-700 overflow-hidden">
                <div className="grid grid-cols-3 font-mono text-sm">
                  <div className="p-3 font-bold text-green-400 border-b border-green-700">Property</div>
                  <div className="p-3 font-bold text-blue-400 border-b border-green-700">TCP</div>
                  <div className="p-3 font-bold text-purple-400 border-b border-green-700">UDP</div>

                  <div className="p-3 text-gray-300 border-b border-gray-700">Connection</div>
                  <div className="p-3 text-gray-300 border-b border-gray-700">Connection-oriented</div>
                  <div className="p-3 text-gray-300 border-b border-gray-700">Connectionless</div>

                  <div className="p-3 text-gray-300 border-b border-gray-700">Reliability</div>
                  <div className="p-3 text-gray-300 border-b border-gray-700">Guaranteed</div>
                  <div className="p-3 text-gray-300 border-b border-gray-700">Best-effort</div>

                  <div className="p-3 text-gray-300 border-b border-gray-700">Ordering</div>
                  <div className="p-3 text-gray-300 border-b border-gray-700">Ordered</div>
                  <div className="p-3 text-gray-300 border-b border-gray-700">Unordered</div>

                  <div className="p-3 text-gray-300 border-b border-gray-700">Speed</div>
                  <div className="p-3 text-gray-300 border-b border-gray-700">Slower (overhead)</div>
                  <div className="p-3 text-gray-300 border-b border-gray-700">Faster (lean)</div>

                  <div className="p-3 text-gray-300">Header size</div>
                  <div className="p-3 text-gray-300">20–60 bytes</div>
                  <div className="p-3 text-gray-300">8 bytes</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'http-versions' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">HTTP/1.1 — The Text Era</h2>
              <p className="text-gray-300 text-lg mb-4">
                Released in 1997, HTTP/1.1 is a human-readable, text-based protocol. It introduced persistent connections
                (keep-alive) so a single TCP connection could be reused across requests instead of reopening each time.
              </p>
              <div className="space-y-3">
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">Keep-Alive</h3>
                  <p className="text-gray-300 text-sm">Reuses one TCP connection for many requests, avoiding repeated handshakes.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">One Request at a Time</h3>
                  <p className="text-gray-300 text-sm">Each connection handles requests serially. Browsers open 6+ parallel connections to compensate.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">Head-of-Line Blocking</h3>
                  <p className="text-gray-300 text-sm">A slow response holds up every response queued behind it on the same connection.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">HTTP/2 — Binary &amp; Multiplexed</h2>
              <p className="text-gray-300 text-lg mb-4">
                Standardized in 2015, HTTP/2 kept the same semantics but rebuilt the wire format to fix HTTP/1.1&apos;s
                concurrency problems — all over a single TCP connection.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">Binary Framing</h3>
                  <p className="text-gray-300 text-sm">Messages split into binary frames instead of plain text — compact and unambiguous to parse.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">Multiplexing</h3>
                  <p className="text-gray-300 text-sm">Many concurrent streams interleave over one TCP connection — no more 6-connection workaround.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">HPACK Header Compression</h3>
                  <p className="text-gray-300 text-sm">Compresses repetitive headers, cutting overhead on request-heavy pages.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">Server Push</h3>
                  <p className="text-gray-300 text-sm">Server can proactively send resources before the client asks (later deprecated in practice).</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                Catch: multiplexing is at the HTTP layer, but TCP still delivers one byte stream — so a single lost packet
                still causes TCP-level head-of-line blocking across all streams.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">HTTP/3 — QUIC over UDP</h2>
              <p className="text-gray-300 text-lg mb-4">
                Standardized in 2022, HTTP/3 abandons TCP entirely and runs over QUIC, a new transport built on UDP. This
                finally kills transport-level head-of-line blocking.
              </p>
              <div className="space-y-3">
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">No TCP Head-of-Line Blocking</h3>
                  <p className="text-gray-300 text-sm">QUIC streams are independent — a lost packet only stalls its own stream, not the others.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">Faster Connection Setup (0-RTT)</h3>
                  <p className="text-gray-300 text-sm">QUIC merges the transport and TLS handshakes; resumed connections can send data with 0-RTT.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">Built-in TLS 1.3</h3>
                  <p className="text-gray-300 text-sm">Encryption is mandatory and baked into the protocol — there is no unencrypted HTTP/3.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">Connection Migration</h3>
                  <p className="text-gray-300 text-sm">Connection IDs let a session survive a network change (Wi-Fi to cellular) without reconnecting.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Why the Evolution?</h2>
              <p className="text-gray-300 text-lg">
                Each version chased the same goal — load pages faster — by removing the bottleneck the previous version
                couldn&apos;t. HTTP/1.1 fixed connection reuse, HTTP/2 fixed application-layer concurrency, and HTTP/3
                fixed the transport itself by replacing TCP with QUIC.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-teal-700">
              <h2 className="text-3xl font-bold text-white mb-6">HTTP Versions at a Glance</h2>
              <div className="bg-gray-800 rounded-xl border border-teal-700 overflow-hidden">
                <div className="grid grid-cols-4 font-mono text-xs md:text-sm">
                  <div className="p-3 font-bold text-teal-400 border-b border-teal-700">Feature</div>
                  <div className="p-3 font-bold text-orange-400 border-b border-teal-700">HTTP/1.1</div>
                  <div className="p-3 font-bold text-blue-400 border-b border-teal-700">HTTP/2</div>
                  <div className="p-3 font-bold text-purple-400 border-b border-teal-700">HTTP/3</div>

                  <div className="p-3 text-gray-300 border-b border-gray-700">Transport</div>
                  <div className="p-3 text-gray-300 border-b border-gray-700">TCP</div>
                  <div className="p-3 text-gray-300 border-b border-gray-700">TCP</div>
                  <div className="p-3 text-gray-300 border-b border-gray-700">QUIC / UDP</div>

                  <div className="p-3 text-gray-300 border-b border-gray-700">Format</div>
                  <div className="p-3 text-gray-300 border-b border-gray-700">Text</div>
                  <div className="p-3 text-gray-300 border-b border-gray-700">Binary</div>
                  <div className="p-3 text-gray-300 border-b border-gray-700">Binary</div>

                  <div className="p-3 text-gray-300 border-b border-gray-700">Multiplexing</div>
                  <div className="p-3 text-gray-300 border-b border-gray-700">No</div>
                  <div className="p-3 text-gray-300 border-b border-gray-700">Yes (1 TCP conn)</div>
                  <div className="p-3 text-gray-300 border-b border-gray-700">Yes (QUIC streams)</div>

                  <div className="p-3 text-gray-300 border-b border-gray-700">Header compression</div>
                  <div className="p-3 text-gray-300 border-b border-gray-700">None</div>
                  <div className="p-3 text-gray-300 border-b border-gray-700">HPACK</div>
                  <div className="p-3 text-gray-300 border-b border-gray-700">QPACK</div>

                  <div className="p-3 text-gray-300 border-b border-gray-700">HoL blocking</div>
                  <div className="p-3 text-gray-300 border-b border-gray-700">App + TCP</div>
                  <div className="p-3 text-gray-300 border-b border-gray-700">TCP only</div>
                  <div className="p-3 text-gray-300 border-b border-gray-700">Eliminated</div>

                  <div className="p-3 text-gray-300">Encryption</div>
                  <div className="p-3 text-gray-300">Optional (TLS)</div>
                  <div className="p-3 text-gray-300">Optional (TLS)</div>
                  <div className="p-3 text-gray-300">Mandatory (TLS 1.3)</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Choosing a Transport</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">Reach for TCP when…</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Every byte must arrive (file transfer, APIs, web pages)</li>
                    <li>• Order matters and partial data is useless</li>
                    <li>• You want the OS to handle reliability for you</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">Reach for UDP when…</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Latency beats completeness (gaming, VoIP, live video)</li>
                    <li>• Messages are small and self-contained (DNS)</li>
                    <li>• You build your own reliability layer (QUIC)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Key Takeaways</h2>
              <div className="space-y-3">
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <p className="text-gray-300 text-sm"><strong className="text-green-400">Layering</strong> lets HTTP ignore how packets actually travel — that abstraction is what makes the internet composable.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <p className="text-gray-300 text-sm"><strong className="text-green-400">TCP vs UDP</strong> is a reliability-versus-latency trade, not a question of which is better.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <p className="text-gray-300 text-sm"><strong className="text-green-400">HTTP/3</strong> is the clearest example of fixing a layer by replacing the one beneath it — TCP gave way to QUIC over UDP.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

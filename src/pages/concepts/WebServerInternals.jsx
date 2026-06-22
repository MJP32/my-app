import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

export default function WebServerInternals({ onBack, breadcrumb }) {
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
              ⚙️ Web Server Internals
            </h1>
            <span className="px-3 py-1 bg-teal-900/50 text-teal-300 rounded-lg text-xs font-bold uppercase tracking-wide border border-teal-700">
              Core Concept
            </span>
          </div>
          <p className="text-xl text-gray-300 mb-6 font-light">
            How web servers accept connections, parse HTTP, and serve content using different concurrency architectures
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-teal-900/30 text-teal-300 rounded-lg text-sm font-medium border border-teal-700">HTTP</span>
            <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-lg text-sm font-medium border border-blue-700">Concurrency</span>
            <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-lg text-sm font-medium border border-green-700">Event Loop</span>
            <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-lg text-sm font-medium border border-purple-700">NGINX & Node.js</span>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

        <div className="flex gap-2 mb-8 border-b-2 border-gray-700 overflow-x-auto pb-0">
          {['overview', 'architectures', 'threading-models', 'servers'].map(tab => (
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
              {tab === 'architectures' && 'Architectures'}
              {tab === 'threading-models' && 'Threading Models'}
              {tab === 'servers' && 'Servers'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-teal-700">
              <h2 className="text-3xl font-bold text-white mb-6">What Does a Web Server Do?</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                A web server is a program that listens on a network socket (typically port 80 for HTTP or 443 for HTTPS),
                accepts incoming TCP connections, reads and parses HTTP requests, and returns HTTP responses. It bridges
                raw network bytes and application logic.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                At its core, the server handles three responsibilities: managing many concurrent connections efficiently,
                understanding the HTTP protocol, and dispatching requests to the right handler &mdash; whether that serves a
                static file from disk or invokes dynamic application code to generate a response.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Core Responsibilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">🔌 Accept TCP Connections</h3>
                  <p className="text-gray-300">Bind to a port, listen, and accept() inbound sockets, completing the TCP three-way handshake for each client</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">📨 Parse HTTP</h3>
                  <p className="text-gray-300">Read the request line, headers, and body; validate the method, URL, version, and Content-Length / chunked encoding</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">🧭 Route Requests</h3>
                  <p className="text-gray-300">Map the host and path to a virtual host, location block, or application handler to decide who produces the response</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">📄 Serve Static Content</h3>
                  <p className="text-gray-300">Read files from disk efficiently (often via sendfile() zero-copy) and stream them back with correct MIME types</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">⚡ Serve Dynamic Content</h3>
                  <p className="text-gray-300">Forward to an application server (FastCGI, WSGI, reverse proxy) and relay the generated response back to the client</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">🔐 Manage Connections</h3>
                  <p className="text-gray-300">Handle keep-alive, timeouts, TLS termination, and connection reuse to reduce overhead across many requests</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">The Request Lifecycle</h2>
              <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                <ol className="space-y-3 text-gray-300">
                  <li className="flex gap-3">
                    <span className="font-bold text-green-400 min-w-[24px]">1.</span>
                    <span>Client opens a TCP connection; the server accept()s the socket (and completes the TLS handshake for HTTPS)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-green-400 min-w-[24px]">2.</span>
                    <span>Server reads bytes from the socket and parses the HTTP request line and headers</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-green-400 min-w-[24px]">3.</span>
                    <span>Server selects a virtual host and matches the path to a route or location handler</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-green-400 min-w-[24px]">4.</span>
                    <span>Handler produces a response: read a static file, or proxy to an app server for dynamic content</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-green-400 min-w-[24px]">5.</span>
                    <span>Server writes the status line, headers, and body back over the socket</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-green-400 min-w-[24px]">6.</span>
                    <span>With HTTP keep-alive the connection stays open for the next request; otherwise it is closed</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'architectures' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Concurrency Architectures</h2>
              <p className="text-gray-300 text-lg mb-6">
                The central design question for any web server is: how do you handle thousands of simultaneous connections?
                Different architectures trade memory, CPU, and code complexity against raw concurrency.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 text-xl mb-2">Process-per-Request</h3>
                  <p className="text-gray-300 mb-2">
                    The server fork()s a new process for each connection (classic CGI / Apache prefork). Strong isolation &mdash;
                    a crash in one process cannot corrupt others &mdash; but processes are heavy (megabytes of memory each) and
                    context switching is expensive.
                  </p>
                  <span className="text-sm text-gray-400">Trade-off: maximum isolation, poor scalability under high concurrency</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 text-xl mb-2">Thread-per-Request</h3>
                  <p className="text-gray-300 mb-2">
                    One OS thread per connection. Threads share an address space so they are lighter than processes, but each
                    still needs its own stack (often 0.5&ndash;1&nbsp;MB). A few thousand threads exhausts memory and the
                    scheduler.
                  </p>
                  <span className="text-sm text-gray-400">Trade-off: simpler blocking code, but limited by stack memory and scheduling cost</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 text-xl mb-2">Event-Driven / Event Loop (Reactor Pattern)</h3>
                  <p className="text-gray-300 mb-2">
                    A single thread (or a small number) runs an event loop, using epoll (Linux) or kqueue (BSD/macOS) to wait
                    for readiness on thousands of sockets at once. When a socket is ready, a callback handles it without
                    blocking. This is the reactor pattern.
                  </p>
                  <span className="text-sm text-gray-400">Trade-off: tiny per-connection memory, massive concurrency, but callback-style code is harder to write</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 text-xl mb-2">Async I/O</h3>
                  <p className="text-gray-300 mb-2">
                    Built on non-blocking sockets and the event loop, async I/O lets a single thread initiate many operations
                    and continue working while the kernel completes them. Modern interfaces like io_uring push this further by
                    batching syscalls and reducing kernel/user transitions.
                  </p>
                  <span className="text-sm text-gray-400">Trade-off: highest throughput per core, with added complexity in handling partial reads/writes</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">The C10K Problem</h2>
              <p className="text-gray-300 text-lg mb-4">
                Coined by Dan Kegel in 1999, the C10K problem asks how a single server can handle 10,000 concurrent
                connections. The thread-per-connection model breaks down here: 10,000 threads &times; ~1&nbsp;MB of stack is
                ~10&nbsp;GB of memory, and the scheduler chokes on context switches.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">The Bottleneck</h3>
                  <p className="text-gray-300 text-sm">Memory per thread and O(n) syscalls like select() that scan every fd on each call</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">The Solution</h3>
                  <p className="text-gray-300 text-sm">Event-driven servers with O(1) readiness notification (epoll/kqueue) handling all connections on a few threads</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'threading-models' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">Blocking I/O</h2>
              <p className="text-gray-300 text-lg mb-4">
                In blocking I/O, when a thread calls read() on a socket and no data is available, the thread is suspended by
                the kernel until data arrives. The thread can do nothing else while it waits &mdash; it is parked.
              </p>
              <div className="space-y-3">
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">One Thread Per Connection</h3>
                  <p className="text-gray-300 text-sm">Each connection needs a dedicated thread because that thread blocks whenever it waits on the network</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">Example</h3>
                  <div className="bg-orange-900/30 p-4 rounded-lg font-mono text-sm text-gray-300 space-y-1">
                    <div>data = socket.read()   # blocks here until bytes arrive</div>
                    <div>process(data)          # thread idle the whole wait</div>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">Limited Concurrency</h3>
                  <p className="text-gray-300 text-sm">A slow client holding a connection ties up a whole thread; thousands of slow clients can exhaust the pool (slowloris attacks exploit exactly this)</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Non-Blocking I/O & the Event Loop</h2>
              <p className="text-gray-300 text-lg mb-4">
                With non-blocking sockets, read() returns immediately &mdash; either with data or with EAGAIN meaning &quot;not
                ready yet.&quot; A single thread loops over an event notification API (epoll on Linux, kqueue on BSD/macOS) that
                reports which of thousands of sockets are ready, and handles only those.
              </p>
              <div className="space-y-3">
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">One Thread, Thousands of Connections</h3>
                  <p className="text-gray-300 text-sm">The thread never blocks on a single socket; it multiplexes across all of them, doing real work only when a socket is ready</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">Example</h3>
                  <div className="bg-blue-900/30 p-4 rounded-lg font-mono text-sm text-gray-300 space-y-1">
                    <div>events = epoll.wait()          # ready sockets only</div>
                    <div>for fd in events:              # no idle waiting</div>
                    <div>&nbsp;&nbsp;handle(fd)                  # never blocks</div>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">Used By</h3>
                  <p className="text-gray-300 text-sm">NGINX and Node.js are the canonical examples &mdash; both serve enormous concurrency on a handful of threads</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Blocking vs Non-Blocking at a Glance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-3">Blocking (Thread-per-Request)</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Simple, sequential code</li>
                    <li>• 1 thread blocked per active wait</li>
                    <li>• Memory scales with connections</li>
                    <li>• Concurrency capped by thread count</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-3">Non-Blocking (Event Loop)</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Callback / async code</li>
                    <li>• Few threads, never idle-blocked</li>
                    <li>• Flat memory across connections</li>
                    <li>• Concurrency capped by file descriptors</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">Worker-Pool Hybrids</h2>
              <p className="text-gray-300 text-lg mb-4">
                Many production servers combine both models: an event loop accepts and multiplexes connections, while a pool
                of worker threads handles blocking or CPU-bound work without stalling the loop.
              </p>
              <div className="space-y-3">
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">Apache MPM event</h3>
                  <p className="text-gray-300 text-sm">A dedicated listener thread keeps idle keep-alive connections in an event loop, handing only active requests to worker threads &mdash; freeing workers from waiting on slow clients</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h3 className="font-bold text-purple-400 mb-2">Node.js libuv thread pool</h3>
                  <p className="text-gray-300 text-sm">The single-threaded event loop offloads blocking file I/O and DNS to a background thread pool, then resumes via callbacks</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'servers' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">NGINX</h2>
              <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                <p className="text-gray-300 mb-3">
                  NGINX uses an event-driven, asynchronous architecture. A master process reads config and manages a set of
                  single-threaded worker processes (typically one per CPU core). Each worker runs an event loop and handles
                  thousands of connections with non-blocking I/O.
                </p>
                <ul className="text-sm text-gray-300 space-y-1 mb-3">
                  <li>• Master + worker process model</li>
                  <li>• Excellent for static files and as a reverse proxy / load balancer</li>
                  <li>• Low, predictable memory footprint under high concurrency</li>
                </ul>
                <span className="text-sm text-gray-400">Best for: static content, reverse proxying, TLS termination, high-concurrency edge serving</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Apache HTTP Server</h2>
              <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                <p className="text-gray-300 mb-3">
                  Apache is configurable via Multi-Processing Modules (MPMs) that select its concurrency model. Its rich module
                  ecosystem and per-directory .htaccess configuration make it flexible, at some cost to peak throughput.
                </p>
                <ul className="text-sm text-gray-300 space-y-1 mb-3">
                  <li>• <strong>prefork</strong>: process-per-request, no threads &mdash; safest for non-thread-safe modules</li>
                  <li>• <strong>worker</strong>: hybrid of processes and threads (thread-per-request)</li>
                  <li>• <strong>event</strong>: like worker but offloads keep-alive connections to a listener loop</li>
                  <li>• Dynamic modules (mod_rewrite, mod_ssl) and .htaccess overrides</li>
                </ul>
                <span className="text-sm text-gray-400">Best for: flexible configuration, legacy apps, shared hosting, .htaccess-driven setups</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">Node.js</h2>
              <div className="bg-gray-800 p-6 rounded-xl border border-purple-700">
                <p className="text-gray-300 mb-3">
                  Node.js runs a single-threaded event loop on top of libuv, which provides the cross-platform non-blocking I/O
                  abstraction (epoll/kqueue/IOCP) plus a background thread pool for file system and DNS work. JavaScript code
                  runs on one thread, so blocking or CPU-heavy work stalls everything &mdash; it must be offloaded.
                </p>
                <ul className="text-sm text-gray-300 space-y-1 mb-3">
                  <li>• Single-threaded event loop + libuv thread pool</li>
                  <li>• Non-blocking by default; great for I/O-bound, many-connection workloads</li>
                  <li>• Scale across cores with the cluster module or worker_threads</li>
                </ul>
                <span className="text-sm text-gray-400">Best for: I/O-bound APIs, real-time apps (WebSockets), JavaScript full-stack</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-teal-700">
              <h2 className="text-3xl font-bold text-white mb-6">Comparison</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-teal-700">
                  <h3 className="font-bold text-teal-400 mb-2">NGINX</h3>
                  <p className="text-gray-300 text-sm">Event-driven workers. Fastest for static + proxy. Config is declarative and global.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-teal-700">
                  <h3 className="font-bold text-teal-400 mb-2">Apache</h3>
                  <p className="text-gray-300 text-sm">Pluggable MPMs. Most flexible and modular. .htaccess for per-directory control.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-teal-700">
                  <h3 className="font-bold text-teal-400 mb-2">Node.js</h3>
                  <p className="text-gray-300 text-sm">App + server in one. Event loop for I/O. Application code, not just a web server.</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mt-4">
                A common production setup: NGINX out front as a reverse proxy and static/TLS layer, forwarding dynamic
                requests to Node.js or Apache application backends.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

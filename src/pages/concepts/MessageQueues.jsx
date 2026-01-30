import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

export default function MessageQueues({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-pink-950 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 px-5 py-2.5 bg-gray-800 border-2 border-pink-700 hover:border-pink-600 text-pink-300 hover:text-white font-medium rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            ← Back to Projects
          </button>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              📬 Message Queues
            </h1>
            <span className="px-3 py-1 bg-pink-900/50 text-pink-300 rounded-lg text-xs font-bold uppercase tracking-wide border border-pink-700">
              Core Concept
            </span>
          </div>
          <p className="text-xl text-gray-300 mb-6 font-light">
            Decouple services and enable asynchronous communication using message queues and pub/sub patterns
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-pink-900/30 text-pink-300 rounded-lg text-sm font-medium border border-pink-700">Asynchronous</span>
            <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-lg text-sm font-medium border border-purple-700">Pub/Sub</span>
            <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-lg text-sm font-medium border border-blue-700">Point-to-Point</span>
            <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-lg text-sm font-medium border border-green-700">Decoupling</span>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu} />

        <div className="flex gap-2 mb-8 border-b-2 border-gray-700 overflow-x-auto pb-0">
          {['overview', 'patterns', 'implementation', 'examples'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-pink-400 bg-pink-900/30 border-b-2 border-pink-400 -mb-0.5'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'patterns' && 'Queue Patterns'}
              {tab === 'implementation' && 'Key Features'}
              {tab === 'examples' && 'Examples'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 rounded-2xl p-8 border-2 border-pink-700">
              <h2 className="text-3xl font-bold text-white mb-6">What are Message Queues?</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Message queues are components that enable asynchronous communication between services by storing messages
                until the receiving service can process them. They act as a buffer between producers (senders) and consumers (receivers).
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Instead of direct synchronous calls, services send messages to a queue and continue with other work.
                Other services consume messages from the queue at their own pace, enabling loose coupling and better scalability.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Benefits of Message Queues</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">🔌 Decoupling</h3>
                  <p className="text-gray-300">Services don't need to know about each other. Producer and consumer can evolve independently.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">📈 Scalability</h3>
                  <p className="text-gray-300">Scale producers and consumers independently based on their own load patterns.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">💪 Reliability</h3>
                  <p className="text-gray-300">Messages persist in queue if consumer is down. Retry failed messages automatically.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">🎯 Load Leveling</h3>
                  <p className="text-gray-300">Handle traffic spikes by buffering messages. Process at consistent rate.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">When to Use Message Queues</h2>
              <div className="space-y-3">
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">⏱️ Long-Running Tasks</h3>
                  <p className="text-gray-300 text-sm">Video processing, report generation, batch operations that shouldn't block user requests</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">🔔 Event Broadcasting</h3>
                  <p className="text-gray-300 text-sm">Notify multiple services when something happens (user signup, order placed)</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">⚖️ Load Smoothing</h3>
                  <p className="text-gray-300 text-sm">Buffer requests during traffic spikes and process at sustainable rate</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-2">🔄 Workflow Orchestration</h3>
                  <p className="text-gray-300 text-sm">Chain multiple steps where each service picks up after previous completes</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">📨 Point-to-Point (Queue)</h2>
              <p className="text-gray-300 text-lg mb-4">One message is consumed by exactly one consumer.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 mb-4">
                <h3 className="font-bold text-blue-400 mb-3">How it works:</h3>
                <p className="text-gray-300 mb-4">
                  Producer sends message to queue. Multiple consumers can listen, but only one receives each message.
                  Great for work distribution.
                </p>
                <div className="bg-blue-900/30 p-4 rounded-lg text-gray-300">
                  Producer → [Queue] → Consumer 1, Consumer 2, Consumer 3<br/>
                  Message A goes to Consumer 1<br/>
                  Message B goes to Consumer 2<br/>
                  Message C goes to Consumer 3
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h4 className="font-bold text-blue-400 mb-2">Use Cases:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Task distribution across workers</li>
                    <li>• Job processing (background jobs)</li>
                    <li>• Email sending queue</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h4 className="font-bold text-blue-400 mb-2">Examples:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• AWS SQS</li>
                    <li>• RabbitMQ (with queues)</li>
                    <li>• Azure Queue Storage</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">📡 Publish-Subscribe (Pub/Sub)</h2>
              <p className="text-gray-300 text-lg mb-4">One message is delivered to multiple subscribers.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-purple-700 mb-4">
                <h3 className="font-bold text-purple-400 mb-3">How it works:</h3>
                <p className="text-gray-300 mb-4">
                  Publisher sends message to topic. All subscribers to that topic receive a copy.
                  Great for event broadcasting.
                </p>
                <div className="bg-purple-900/30 p-4 rounded-lg text-gray-300">
                  Publisher → [Topic] → Subscriber 1, Subscriber 2, Subscriber 3<br/>
                  Message A goes to ALL subscribers<br/>
                  Each subscriber gets their own copy
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h4 className="font-bold text-purple-400 mb-2">Use Cases:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Event notification systems</li>
                    <li>• Real-time data streaming</li>
                    <li>• Microservice events</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h4 className="font-bold text-purple-400 mb-2">Examples:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• AWS SNS</li>
                    <li>• Google Pub/Sub</li>
                    <li>• RabbitMQ (with exchanges)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">🎯 Topic-Based Routing</h2>
              <p className="text-gray-300 text-lg mb-4">Route messages to subscribers based on topics or patterns.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-green-700 mb-4">
                <h3 className="font-bold text-green-400 mb-3">Example Topics:</h3>
                <div className="space-y-2 text-gray-300 font-mono text-sm">
                  <div>orders.created → Order Service, Inventory Service, Notification Service</div>
                  <div>orders.cancelled → Inventory Service, Refund Service</div>
                  <div>user.* → All user-related events</div>
                  <div>*.urgent → All urgent events</div>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                <h4 className="font-bold text-green-400 mb-2">Benefits:</h4>
                <p className="text-gray-300 text-sm">Flexible routing, services only subscribe to relevant events, easy to add new subscribers</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">🔄 Request-Reply Pattern</h2>
              <p className="text-gray-300 text-lg mb-4">Asynchronous request-response using two queues.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-orange-700">
                <h3 className="font-bold text-orange-400 mb-3">Flow:</h3>
                <ol className="space-y-2 text-gray-300">
                  <li>1. Client sends request to request queue with correlation ID and reply-to queue</li>
                  <li>2. Server processes request asynchronously</li>
                  <li>3. Server sends response to reply-to queue with correlation ID</li>
                  <li>4. Client retrieves response using correlation ID</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'implementation' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Message Delivery Guarantees</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 text-lg mb-3">At-Most-Once</h3>
                  <p className="text-gray-300 mb-2">Message delivered zero or one time. May lose messages but no duplicates.</p>
                  <p className="text-sm text-gray-400">Use when: Performance matters more than reliability (metrics, logs)</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 text-lg mb-3">At-Least-Once</h3>
                  <p className="text-gray-300 mb-2">Message delivered one or more times. Guaranteed delivery but possible duplicates.</p>
                  <p className="text-sm text-gray-400">Use when: Can't lose messages, consumers are idempotent (most common)</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 text-lg mb-3">Exactly-Once</h3>
                  <p className="text-gray-300 mb-2">Message delivered exactly one time. Most difficult to achieve.</p>
                  <p className="text-sm text-gray-400">Use when: Duplicates cause serious issues (payments, financial transactions)</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Dead Letter Queues (DLQ)</h2>
              <p className="text-gray-300 text-lg mb-4">Handle messages that fail processing after multiple retries.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-green-700 mb-4">
                <h3 className="font-bold text-green-400 mb-3">How it works:</h3>
                <ol className="space-y-2 text-gray-300">
                  <li>1. Message fails processing</li>
                  <li>2. Retry up to N times (e.g., 3 attempts)</li>
                  <li>3. If still failing, move to Dead Letter Queue</li>
                  <li>4. Investigate and manually process or fix issue</li>
                  <li>5. Optionally replay from DLQ after fixing</li>
                </ol>
              </div>
              <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                <h4 className="font-bold text-green-400 mb-2">Benefits:</h4>
                <p className="text-gray-300 text-sm">Prevent poison messages from blocking queue, investigate failures, maintain system health</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">Message Ordering</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-purple-700">
                  <h3 className="text-lg font-bold text-purple-400 mb-3">FIFO Queues</h3>
                  <p className="text-gray-300 mb-3">Messages processed in exact order sent</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Guaranteed ordering</li>
                    <li>• Lower throughput</li>
                    <li>• SQS FIFO, Kafka partitions</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-purple-700">
                  <h3 className="text-lg font-bold text-purple-400 mb-3">Standard Queues</h3>
                  <p className="text-gray-300 mb-3">Best-effort ordering, higher throughput</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• No ordering guarantee</li>
                    <li>• Higher throughput</li>
                    <li>• SQS Standard, most queues</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">Message Retention & TTL</h2>
              <div className="space-y-3">
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">Retention Period</h3>
                  <p className="text-gray-300 text-sm">How long messages stay in queue before deletion (e.g., 14 days for SQS)</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">Message TTL</h3>
                  <p className="text-gray-300 text-sm">Time-to-Live per message. Expire old messages automatically.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h3 className="font-bold text-orange-400 mb-2">Visibility Timeout</h3>
                  <p className="text-gray-300 text-sm">Hide message while being processed. Returns to queue if not deleted within timeout.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Popular Message Queue Systems</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">RabbitMQ</h3>
                  <p className="text-gray-300 mb-2">Mature, feature-rich message broker with flexible routing</p>
                  <span className="text-sm text-gray-400">AMQP protocol, exchanges and queues, clustering support</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">Apache Kafka</h3>
                  <p className="text-gray-300 mb-2">High-throughput distributed streaming platform</p>
                  <span className="text-sm text-gray-400">Event streaming, log aggregation, real-time analytics</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">AWS SQS</h3>
                  <p className="text-gray-300 mb-2">Fully managed queue service with Standard and FIFO options</p>
                  <span className="text-sm text-gray-400">Serverless, auto-scaling, integrated with AWS services</span>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 text-xl mb-2">Redis Streams</h3>
                  <p className="text-gray-300 mb-2">Append-only log data structure for messaging</p>
                  <span className="text-sm text-gray-400">Consumer groups, fast, in-memory</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Real-World Use Cases</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">📧 Email Service</h3>
                  <p className="text-gray-300">Queue email sending jobs. Workers process at sustainable rate, retry on failure.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">🎥 Video Processing</h3>
                  <p className="text-gray-300">Upload triggers message. Workers transcode to different formats in parallel.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">🛒 Order Processing</h3>
                  <p className="text-gray-300">Order placed → Queue message → Payment, Inventory, Shipping services all consume event.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">📊 Analytics Pipeline</h3>
                  <p className="text-gray-300">Stream user events to Kafka. Multiple consumers process for analytics, recommendations, ML.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';

export default function EventDriven({ onBack }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 px-5 py-2.5 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 font-medium rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            ← Back to Projects
          </button>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              ⚡ Event-Driven Architecture
            </h1>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-bold uppercase tracking-wide">
              Core Concept
            </span>
          </div>
          <p className="text-xl text-gray-600 mb-6 font-light">
            Build reactive, scalable systems where components communicate through events and respond to state changes
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium border border-orange-100">Event Sourcing</span>
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">CQRS</span>
            <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-100">Pub/Sub</span>
            <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-100">Kafka</span>
          </div>
        </div>

        <div className="flex gap-2 mb-8 border-b-2 border-gray-100 overflow-x-auto pb-0">
          {['overview', 'patterns', 'implementation', 'examples'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-orange-600 bg-orange-50 border-b-2 border-orange-600 -mb-0.5'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'patterns' && 'Patterns'}
              {tab === 'implementation' && 'Implementation'}
              {tab === 'examples' && 'Examples'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Event-Driven Architecture?</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Event-Driven Architecture (EDA) is a design pattern where systems react to events (significant state changes or occurrences)
                rather than responding to direct requests. Components are loosely coupled and communicate asynchronously through events,
                enabling highly scalable, resilient, and flexible systems.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                In EDA, producers emit events without knowing who will consume them, and consumers subscribe to events they're interested in.
                This decoupling allows independent evolution and scaling of system components.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Core Concepts</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">📢 Events</h3>
                  <p className="text-gray-700 mb-2">Immutable records of something that happened in the system</p>
                  <p className="text-sm text-gray-600">Example: OrderPlaced, PaymentProcessed, UserRegistered</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">📤 Event Producers</h3>
                  <p className="text-gray-700 mb-2">Components that detect and publish events to event bus/stream</p>
                  <p className="text-sm text-gray-600">Example: Order Service publishes OrderPlaced event</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">📥 Event Consumers</h3>
                  <p className="text-gray-700 mb-2">Components that subscribe to and process events</p>
                  <p className="text-sm text-gray-600">Example: Email Service listens for UserRegistered events</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">🚌 Event Bus/Stream</h3>
                  <p className="text-gray-700 mb-2">Infrastructure for transmitting events between producers and consumers</p>
                  <p className="text-sm text-gray-600">Example: Apache Kafka, AWS EventBridge, RabbitMQ</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits of Event-Driven Architecture</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-700 mb-3">🔗 Loose Coupling</h3>
                  <p className="text-gray-700">Services don't need to know about each other, only about events</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-700 mb-3">📈 Scalability</h3>
                  <p className="text-gray-700">Scale event producers and consumers independently</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-700 mb-3">🛡️ Resilience</h3>
                  <p className="text-gray-700">System continues working even if some consumers fail</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-700 mb-3">⚡ Real-time</h3>
                  <p className="text-gray-700">React to events as they happen for immediate processing</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-700 mb-3">🔌 Extensibility</h3>
                  <p className="text-gray-700">Add new consumers without modifying producers</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-700 mb-3">📊 Audit Trail</h3>
                  <p className="text-gray-700">Complete history of all events for compliance and debugging</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">📚 Event Sourcing</h2>
              <p className="text-gray-700 text-lg mb-4">
                Store the state of your system as a sequence of events rather than just the current state.
                All changes are captured as immutable events in an event store.
              </p>
              <div className="bg-white p-6 rounded-xl border border-orange-100 mb-4">
                <h3 className="font-bold text-orange-700 mb-3">How it works:</h3>
                <ol className="space-y-2 text-gray-700">
                  <li>1. Application state changes generate events</li>
                  <li>2. Events are appended to event store (immutable log)</li>
                  <li>3. Current state is reconstructed by replaying events</li>
                  <li>4. Can replay events to any point in time</li>
                </ol>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-orange-100">
                  <h4 className="font-bold text-orange-700 mb-2">✅ Benefits:</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Complete audit trail</li>
                    <li>• Time travel (replay to any state)</li>
                    <li>• Easy to debug</li>
                    <li>• Supports CQRS perfectly</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-xl border border-orange-100">
                  <h4 className="font-bold text-red-700 mb-2">❌ Challenges:</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Eventual consistency</li>
                    <li>• Learning curve</li>
                    <li>• Event versioning</li>
                    <li>• Storage growth</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🔀 CQRS (Command Query Responsibility Segregation)</h2>
              <p className="text-gray-700 text-lg mb-4">
                Separate read (query) and write (command) operations into different models.
                Optimize each independently for their specific workload.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-3">✍️ Command Model (Write)</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Validates and executes commands</li>
                    <li>• Optimized for writes</li>
                    <li>• Generates events</li>
                    <li>• Normalized data model</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-3">📖 Query Model (Read)</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Handles read queries</li>
                    <li>• Optimized for reads</li>
                    <li>• Denormalized views</li>
                    <li>• Can use different database</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-blue-100 mt-4">
                <h3 className="font-bold text-blue-700 mb-2">Example:</h3>
                <p className="text-gray-700 text-sm">
                  Command: PostgreSQL for transactions → Events → Query: Elasticsearch for search + Redis for caching
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">📬 Pub/Sub Pattern</h2>
              <p className="text-gray-700 text-lg mb-4">
                Publishers send events to topics without knowing subscribers. Subscribers receive events from topics they're interested in.
              </p>
              <div className="bg-white p-6 rounded-xl border border-green-100">
                <h3 className="font-bold text-green-700 mb-3">Characteristics:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• One-to-many messaging</li>
                  <li>• Publishers and subscribers are decoupled</li>
                  <li>• Multiple subscribers can receive same event</li>
                  <li>• Supports fan-out scenarios</li>
                  <li>• Tools: Kafka, Redis Pub/Sub, AWS SNS, Google Pub/Sub</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🔄 Event Streaming</h2>
              <p className="text-gray-700 text-lg mb-4">
                Continuous flow of events through a distributed commit log (like Apache Kafka).
                Events are persisted and can be replayed.
              </p>
              <div className="bg-white p-6 rounded-xl border border-purple-100">
                <h3 className="font-bold text-purple-700 mb-3">Key Features:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Durable event storage (retention policy)</li>
                  <li>• Multiple consumers can read same stream</li>
                  <li>• Ordered delivery within partition</li>
                  <li>• Replayability for recovery/reprocessing</li>
                  <li>• High throughput (millions of events/second)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'implementation' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Event Schema Example</h2>
              <div className="bg-gray-900 p-6 rounded-xl text-white font-mono text-sm">
                <div className="text-orange-400 mb-2">// Example event structure</div>
                <div>{'{'}</div>
                <div className="ml-4">"eventId": "uuid-1234-5678",</div>
                <div className="ml-4">"eventType": "OrderPlaced",</div>
                <div className="ml-4">"timestamp": "2024-01-15T10:30:00Z",</div>
                <div className="ml-4">"aggregateId": "order-9876",</div>
                <div className="ml-4">"version": 1,</div>
                <div className="ml-4">"data": {'{'}</div>
                <div className="ml-8">"orderId": "order-9876",</div>
                <div className="ml-8">"customerId": "customer-123",</div>
                <div className="ml-8">"items": [{'{'}"productId": "prod-1", "quantity": 2{'}'}],</div>
                <div className="ml-8">"totalAmount": 99.99</div>
                <div className="ml-4">{'}'},</div>
                <div className="ml-4">"metadata": {'{'}</div>
                <div className="ml-8">"userId": "user-456",</div>
                <div className="ml-8">"source": "web-app"</div>
                <div className="ml-4">{'}'}</div>
                <div>{'}'}</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Kafka Producer Example</h2>
              <div className="bg-gray-900 p-6 rounded-xl text-white font-mono text-sm">
                <div className="text-blue-400 mb-2">// Node.js Kafka Producer</div>
                <div>const {'{'} Kafka {'}'} = require('kafkajs');</div>
                <div className="mt-2">const kafka = new Kafka({'{'}</div>
                <div className="ml-4">clientId: 'order-service',</div>
                <div className="ml-4">brokers: ['kafka:9092']</div>
                <div>{'}'});</div>
                <div className="mt-2">const producer = kafka.producer();</div>
                <div className="mt-2">await producer.connect();</div>
                <div>await producer.send({'{'}</div>
                <div className="ml-4">topic: 'orders',</div>
                <div className="ml-4">messages: [{'{'}</div>
                <div className="ml-8">key: orderId,</div>
                <div className="ml-8">value: JSON.stringify(event)</div>
                <div className="ml-4">{'}'}]</div>
                <div>{'}'});</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Kafka Consumer Example</h2>
              <div className="bg-gray-900 p-6 rounded-xl text-white font-mono text-sm">
                <div className="text-green-400 mb-2">// Node.js Kafka Consumer</div>
                <div>const consumer = kafka.consumer({'{'}</div>
                <div className="ml-4">groupId: 'email-service'</div>
                <div>{'}'});</div>
                <div className="mt-2">await consumer.connect();</div>
                <div>await consumer.subscribe({'{'}</div>
                <div className="ml-4">topic: 'orders',</div>
                <div className="ml-4">fromBeginning: false</div>
                <div>{'}'});</div>
                <div className="mt-2">await consumer.run({'{'}</div>
                <div className="ml-4">eachMessage: async ({'{'} topic, partition, message {'}'}) ={'>'} {'{'}</div>
                <div className="ml-8">const event = JSON.parse(message.value);</div>
                <div className="ml-8">if (event.eventType === 'OrderPlaced') {'{'}</div>
                <div className="ml-12">await sendConfirmationEmail(event.data);</div>
                <div className="ml-8">{'}'}</div>
                <div className="ml-4">{'}'}</div>
                <div>{'}'});</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Practices</h2>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-700 mb-2">✅ Idempotency</h3>
                  <p className="text-gray-700 text-sm">Design consumers to handle duplicate events safely</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-700 mb-2">✅ Event Versioning</h3>
                  <p className="text-gray-700 text-sm">Include version field and maintain backward compatibility</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-700 mb-2">✅ Dead Letter Queue</h3>
                  <p className="text-gray-700 text-sm">Handle failed events without blocking consumer</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-700 mb-2">✅ Event Schema Registry</h3>
                  <p className="text-gray-700 text-sm">Centralize and validate event schemas (Confluent Schema Registry)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Use Cases</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">🚗 Uber - Ride Matching</h3>
                  <p className="text-gray-700">Uses event-driven architecture to match riders with drivers in real-time, process payments, and update trip status</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">📦 Amazon - Order Processing</h3>
                  <p className="text-gray-700">Order events trigger inventory checks, payment processing, warehouse fulfillment, and shipping notifications</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">💰 Stripe - Payment Processing</h3>
                  <p className="text-gray-700">Event-driven webhooks notify merchants about payment events: succeeded, failed, refunded, disputed</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">📱 LinkedIn - Activity Feed</h3>
                  <p className="text-gray-700">User actions (post, like, comment) generate events that update followers' feeds in near real-time</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">📊 Data Pipelines</h3>
                  <p className="text-gray-700">Stream events from applications to data warehouse for analytics (CDC, ETL, real-time dashboards)</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Technology Stack</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 text-xl mb-2">Apache Kafka</h3>
                  <p className="text-gray-700 mb-2">Distributed event streaming platform for high-throughput, fault-tolerant event streams</p>
                  <span className="text-sm text-gray-500">Used by: LinkedIn, Netflix, Uber, Airbnb</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 text-xl mb-2">AWS EventBridge</h3>
                  <p className="text-gray-700 mb-2">Serverless event bus for connecting AWS services and SaaS applications</p>
                  <span className="text-sm text-gray-500">Fully managed, schema registry, event filtering</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 text-xl mb-2">RabbitMQ</h3>
                  <p className="text-gray-700 mb-2">Message broker supporting multiple messaging protocols</p>
                  <span className="text-sm text-gray-500">AMQP, MQTT, flexible routing</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 text-xl mb-2">Google Cloud Pub/Sub</h3>
                  <p className="text-gray-700 mb-2">Global messaging and event ingestion service</p>
                  <span className="text-sm text-gray-500">At-least-once delivery, automatic scaling</span>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 text-xl mb-2">Apache Pulsar</h3>
                  <p className="text-gray-700 mb-2">Multi-tenant, high-performance messaging platform</p>
                  <span className="text-sm text-gray-500">Geo-replication, unified messaging & streaming</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

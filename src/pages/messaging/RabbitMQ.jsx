/**
 * RabbitMQ - Message Broker
 *
 * Comprehensive guide to RabbitMQ AMQP message broker with exchanges, queues,
 * bindings, clustering, and management features.
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

/**
 * Main topic colors - rose theme for RabbitMQ
 */
const RABBITMQ_COLORS = {
  primary: '#fb7185',           // Main accent color (rose)
  primaryHover: '#fda4af',      // Hover state
  bg: 'rgba(251, 113, 133, 0.1)', // Background with transparency
  border: 'rgba(251, 113, 133, 0.3)', // Border color
  arrow: '#f43f5e',             // Arrow/indicator color
  hoverBg: 'rgba(251, 113, 133, 0.2)', // Hover background
  topicBg: 'rgba(251, 113, 133, 0.2)'  // Topic card background
}

/**
 * Alternating colors for subtopic detail explanations
 */
const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },    // blue
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },      // green
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },    // amber
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },    // purple
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },    // pink
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },      // cyan
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

// RabbitMQ Broker Diagram
const BrokerDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
      </marker>
    </defs>

    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">RabbitMQ Message Flow</text>

    <rect x="50" y="55" width="100" height="60" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="100" y="80" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Producer</text>
    <text x="100" y="98" textAnchor="middle" fill="#93c5fd" fontSize="8">publish()</text>

    <rect x="200" y="55" width="120" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="260" y="80" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Exchange</text>
    <text x="260" y="98" textAnchor="middle" fill="#fcd34d" fontSize="8">routing logic</text>

    <rect x="370" y="35" width="100" height="40" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="420" y="60" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Queue 1</text>
    <rect x="370" y="85" width="100" height="40" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="420" y="110" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Queue 2</text>

    <rect x="520" y="35" width="100" height="40" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="570" y="60" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Consumer 1</text>
    <rect x="520" y="85" width="100" height="40" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="570" y="110" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">Consumer 2</text>

    <path d="M 150 85 L 195 85" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 320 70 L 365 55" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 320 100 L 365 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 470 55 L 515 55" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 470 105 L 515 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>

    <rect x="650" y="50" width="120" height="70" rx="6" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2"/>
    <text x="710" y="75" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">AMQP 0-9-1</text>
    <text x="710" y="95" textAnchor="middle" fill="#fbcfe8" fontSize="8">Acknowledgments</text>
    <text x="710" y="110" textAnchor="middle" fill="#fbcfe8" fontSize="8">Confirms</text>
  </svg>
)

// Exchanges Diagram
const ExchangesDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">RabbitMQ Exchange Types</text>

    <rect x="50" y="45" width="160" height="70" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="130" y="70" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Direct Exchange</text>
    <text x="130" y="88" textAnchor="middle" fill="#93c5fd" fontSize="8">Routing key match</text>
    <text x="130" y="103" textAnchor="middle" fill="#93c5fd" fontSize="8">1:1 routing</text>

    <rect x="230" y="45" width="160" height="70" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="310" y="70" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Topic Exchange</text>
    <text x="310" y="88" textAnchor="middle" fill="#86efac" fontSize="8">Pattern matching</text>
    <text x="310" y="103" textAnchor="middle" fill="#86efac" fontSize="8">*.logs.# wildcards</text>

    <rect x="410" y="45" width="160" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="490" y="70" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Fanout Exchange</text>
    <text x="490" y="88" textAnchor="middle" fill="#fcd34d" fontSize="8">Broadcast to all</text>
    <text x="490" y="103" textAnchor="middle" fill="#fcd34d" fontSize="8">Ignores routing key</text>

    <rect x="590" y="45" width="160" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="670" y="70" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Headers Exchange</text>
    <text x="670" y="88" textAnchor="middle" fill="#c4b5fd" fontSize="8">Header attributes</text>
    <text x="670" y="103" textAnchor="middle" fill="#c4b5fd" fontSize="8">x-match: all/any</text>

    <rect x="200" y="135" width="400" height="45" rx="6" fill="rgba(100, 116, 139, 0.1)" stroke="#64748b" strokeWidth="1"/>
    <text x="400" y="160" textAnchor="middle" fill="#94a3b8" fontSize="9">Default exchange: direct routing to queue by name | Dead letter exchange for failed messages</text>
  </svg>
)

// Queues Diagram
const QueuesDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">RabbitMQ Queue Features</text>

    <rect x="50" y="50" width="140" height="65" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="120" y="73" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Classic Queue</text>
    <text x="120" y="90" textAnchor="middle" fill="#93c5fd" fontSize="8">In-memory + disk</text>
    <text x="120" y="105" textAnchor="middle" fill="#93c5fd" fontSize="8">HA mirroring</text>

    <rect x="210" y="50" width="140" height="65" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="280" y="73" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Quorum Queue</text>
    <text x="280" y="90" textAnchor="middle" fill="#86efac" fontSize="8">Raft consensus</text>
    <text x="280" y="105" textAnchor="middle" fill="#86efac" fontSize="8">Recommended HA</text>

    <rect x="370" y="50" width="140" height="65" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="440" y="73" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Stream</text>
    <text x="440" y="90" textAnchor="middle" fill="#fcd34d" fontSize="8">Append-only log</text>
    <text x="440" y="105" textAnchor="middle" fill="#fcd34d" fontSize="8">Time-based retention</text>

    <rect x="530" y="50" width="140" height="65" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="600" y="73" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Priority Queue</text>
    <text x="600" y="90" textAnchor="middle" fill="#c4b5fd" fontSize="8">Message priority</text>
    <text x="600" y="105" textAnchor="middle" fill="#c4b5fd" fontSize="8">1-255 levels</text>

    <rect x="100" y="135" width="600" height="30" rx="4" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="1"/>
    <text x="400" y="155" textAnchor="middle" fill="#f87171" fontSize="9">Features: TTL, Max length, Dead letter, Lazy mode, Single active consumer</text>
  </svg>
)

// Bindings Diagram
const BindingsDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">RabbitMQ Bindings & Routing</text>

    <rect x="150" y="50" width="140" height="60" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="220" y="75" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Exchange</text>
    <text x="220" y="95" textAnchor="middle" fill="#fcd34d" fontSize="8">logs.topic</text>

    <rect x="450" y="30" width="120" height="35" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="510" y="52" textAnchor="middle" fill="#60a5fa" fontSize="9">error_queue</text>
    <rect x="450" y="75" width="120" height="35" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="510" y="97" textAnchor="middle" fill="#4ade80" fontSize="9">all_logs_queue</text>
    <rect x="450" y="120" width="120" height="35" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="510" y="142" textAnchor="middle" fill="#a78bfa" fontSize="9">app_queue</text>

    <path d="M 290 65 L 445 47" stroke="#3b82f6" strokeWidth="2"/>
    <text x="360" y="45" fill="#60a5fa" fontSize="8">*.error</text>
    <path d="M 290 80 L 445 92" stroke="#22c55e" strokeWidth="2"/>
    <text x="360" y="78" fill="#4ade80" fontSize="8">#</text>
    <path d="M 290 95 L 445 137" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="360" y="120" fill="#a78bfa" fontSize="8">app.*</text>

    <rect x="620" y="60" width="140" height="60" rx="6" fill="rgba(100, 116, 139, 0.2)" stroke="#64748b" strokeWidth="2"/>
    <text x="690" y="85" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Binding Key</text>
    <text x="690" y="105" textAnchor="middle" fill="#cbd5e1" fontSize="8">* = one word</text>
    <text x="690" y="118" textAnchor="middle" fill="#cbd5e1" fontSize="8"># = zero or more</text>
  </svg>
)

// Clustering Diagram
const ClusteringDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">RabbitMQ Cluster Architecture</text>

    <rect x="50" y="50" width="140" height="110" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="120" y="73" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Node 1</text>
    <rect x="60" y="85" width="120" height="25" rx="3" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="1"/>
    <text x="120" y="102" textAnchor="middle" fill="#4ade80" fontSize="8">Quorum Q Leader</text>
    <rect x="60" y="115" width="120" height="25" rx="3" fill="rgba(245, 158, 11, 0.4)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="120" y="132" textAnchor="middle" fill="#fbbf24" fontSize="8">Follower</text>

    <rect x="230" y="50" width="140" height="110" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="300" y="73" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Node 2</text>
    <rect x="240" y="85" width="120" height="25" rx="3" fill="rgba(245, 158, 11, 0.4)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="300" y="102" textAnchor="middle" fill="#fbbf24" fontSize="8">Follower</text>
    <rect x="240" y="115" width="120" height="25" rx="3" fill="rgba(34, 197, 94, 0.4)" stroke="#22c55e" strokeWidth="1"/>
    <text x="300" y="132" textAnchor="middle" fill="#4ade80" fontSize="8">Quorum Q Leader</text>

    <rect x="410" y="50" width="140" height="110" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="480" y="73" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Node 3</text>
    <rect x="420" y="85" width="120" height="25" rx="3" fill="rgba(245, 158, 11, 0.4)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="480" y="102" textAnchor="middle" fill="#fbbf24" fontSize="8">Follower</text>
    <rect x="420" y="115" width="120" height="25" rx="3" fill="rgba(245, 158, 11, 0.4)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="480" y="132" textAnchor="middle" fill="#fbbf24" fontSize="8">Follower</text>

    <rect x="600" y="60" width="160" height="90" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="680" y="85" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Cluster Features</text>
    <text x="680" y="105" textAnchor="middle" fill="#c4b5fd" fontSize="8">Raft consensus</text>
    <text x="680" y="120" textAnchor="middle" fill="#c4b5fd" fontSize="8">Auto failover</text>
    <text x="680" y="135" textAnchor="middle" fill="#c4b5fd" fontSize="8">Metadata sync</text>

    <line x1="190" y1="105" x2="225" y2="105" stroke="#64748b" strokeWidth="2" strokeDasharray="4"/>
    <line x1="370" y1="105" x2="405" y2="105" stroke="#64748b" strokeWidth="2" strokeDasharray="4"/>
  </svg>
)

// Management Diagram
const ManagementDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">RabbitMQ Management & Monitoring</text>

    <rect x="50" y="50" width="160" height="100" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="130" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Management UI</text>
    <text x="130" y="95" textAnchor="middle" fill="#93c5fd" fontSize="8">Port 15672</text>
    <text x="130" y="110" textAnchor="middle" fill="#93c5fd" fontSize="8">Queue/Exchange mgmt</text>
    <text x="130" y="125" textAnchor="middle" fill="#93c5fd" fontSize="8">User permissions</text>

    <rect x="250" y="50" width="160" height="100" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="330" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">REST API</text>
    <text x="330" y="95" textAnchor="middle" fill="#86efac" fontSize="8">HTTP API</text>
    <text x="330" y="110" textAnchor="middle" fill="#86efac" fontSize="8">Automation</text>
    <text x="330" y="125" textAnchor="middle" fill="#86efac" fontSize="8">CI/CD integration</text>

    <rect x="450" y="50" width="160" height="100" rx="6" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="530" y="75" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Prometheus</text>
    <text x="530" y="95" textAnchor="middle" fill="#fcd34d" fontSize="8">rabbitmq_* metrics</text>
    <text x="530" y="110" textAnchor="middle" fill="#fcd34d" fontSize="8">Grafana dashboards</text>
    <text x="530" y="125" textAnchor="middle" fill="#fcd34d" fontSize="8">Alerting</text>

    <rect x="650" y="50" width="120" height="100" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="710" y="75" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Key Metrics</text>
    <text x="710" y="95" textAnchor="middle" fill="#c4b5fd" fontSize="8">Queue depth</text>
    <text x="710" y="110" textAnchor="middle" fill="#c4b5fd" fontSize="8">Message rates</text>
    <text x="710" y="125" textAnchor="middle" fill="#c4b5fd" fontSize="8">Connection count</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * RabbitMQ Component
 *
 * @param {function} onBack - Callback to navigate back to parent page
 * @param {object} breadcrumb - Optional breadcrumb configuration from parent
 */
function RabbitMQ({ onBack, breadcrumb }) {
  // State for modal navigation
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'broker',
      name: 'RabbitMQ Broker',
      icon: '🐰',
      color: '#10b981',
      description: 'Reliable, scalable message broker implementing AMQP protocol with support for multiple messaging patterns, high availability clustering, and enterprise-grade features',
      diagram: BrokerDiagram,
      details: [
        {
          name: 'Connection Management',
          diagram: BrokerDiagram,
          explanation: 'Configure connection factory with host, port, credentials, and virtual host. Connection pooling with automatic recovery enabled. Set connection timeout, heartbeat interval, and network recovery settings. Create named connections for better monitoring. Channel management for publishing and consuming. Resource lifecycle tracking and graceful shutdown.',
          codeExample: `// Java RabbitMQ Connection Setup
ConnectionFactory factory = new ConnectionFactory();
factory.setHost("localhost");
factory.setPort(5672);
factory.setUsername("guest");
factory.setPassword("guest");
factory.setVirtualHost("/");

// Enable automatic recovery
factory.setAutomaticRecoveryEnabled(true);
factory.setNetworkRecoveryInterval(10000);

// Connection timeout and heartbeat
factory.setConnectionTimeout(30000);
factory.setRequestedHeartbeat(60);

Connection connection = factory.newConnection();
Channel channel = connection.createChannel();`
        },
        {
          name: 'Publisher Confirms',
          explanation: 'Enable publisher confirms for guaranteed message delivery. Broker acknowledges message receipt. Wait for confirmations synchronously or handle asynchronously. Track message delivery with correlation IDs. Batch confirmations for high throughput. Retry logic for failed publishes. Transaction support for atomic operations.',
          codeExample: `// Enable publisher confirms
channel.confirmSelect();

// Publish with correlation ID
String correlationId = UUID.randomUUID().toString();
AMQP.BasicProperties props = new AMQP.BasicProperties.Builder()
    .correlationId(correlationId)
    .deliveryMode(2) // persistent
    .build();

channel.basicPublish(
    "my-exchange",
    "routing.key",
    props,
    message.getBytes()
);

// Wait for confirmation
channel.waitForConfirmsOrDie(5000);

// Async confirms with listener
channel.addConfirmListener(new ConfirmListener() {
    public void handleAck(long deliveryTag, boolean multiple) {
        System.out.println("Message confirmed: " + deliveryTag);
    }
    public void handleNack(long deliveryTag, boolean multiple) {
        System.err.println("Message rejected: " + deliveryTag);
    }
});`
        },
        {
          name: 'High Availability',
          explanation: 'Connect to multiple broker addresses for failover. Primary and backup broker configuration. Automatic reconnection on connection loss. Topology recovery reapplies exchanges, queues, and bindings. Network partition handling. Zero downtime during broker restarts. Client-side load balancing across cluster nodes.',
          codeExample: `// Multi-host connection with failover
List<Address> addresses = Arrays.asList(
    new Address("rabbit1.example.com", 5672),
    new Address("rabbit2.example.com", 5672),
    new Address("rabbit3.example.com", 5672)
);

ConnectionFactory factory = new ConnectionFactory();
factory.setAutomaticRecoveryEnabled(true);
factory.setTopologyRecoveryEnabled(true);

// Connect with automatic failover
Connection connection = factory.newConnection(addresses);

// Recovery listener
((Recoverable) connection).addRecoveryListener(
    new RecoveryListener() {
        public void handleRecovery(Recoverable recoverable) {
            System.out.println("Connection recovered");
        }
        public void handleRecoveryStarted(Recoverable recoverable) {
            System.out.println("Recovery started");
        }
    }
);`
        }
      ]
    },
    {
      id: 'exchanges',
      name: 'Exchanges',
      icon: '🔄',
      color: '#3b82f6',
      description: 'Message routing engines supporting direct, topic, fanout, and headers exchange types for flexible message distribution patterns and complex routing topologies',
      diagram: ExchangesDiagram,
      details: [
        {
          name: 'Direct Exchange',
          explanation: 'Route messages to queues based on exact routing key match. One-to-one message routing. Declare durable exchanges for persistence. Bind queues with specific routing keys. Ideal for targeted message delivery. Use for priority-based routing. Supports multiple bindings per queue for different keys.',
          codeExample: `// Declare direct exchange
channel.exchangeDeclare(
    "direct-exchange",
    BuiltinExchangeType.DIRECT,
    true,  // durable
    false, // auto-delete
    null   // arguments
);

// Bind queue with routing key
channel.queueBind("orders-queue", "direct-exchange", "order.new");
channel.queueBind("payments-queue", "direct-exchange", "payment.success");

// Publish with routing key
channel.basicPublish(
    "direct-exchange",
    "order.new",
    null,
    message.getBytes()
);`
        },
        {
          name: 'Topic Exchange',
          explanation: 'Pattern-based routing with wildcard matching. Use * to match one word, # to match zero or more words. Hierarchical routing keys (e.g., kern.error, app.info). Multiple consumers with different pattern subscriptions. Flexible pub/sub patterns. Dynamic routing based on message characteristics. Log aggregation and event streaming.',
          codeExample: `// Declare topic exchange
channel.exchangeDeclare("logs", BuiltinExchangeType.TOPIC, true);

// Bind with wildcard patterns
channel.queueBind("error-logs", "logs", "*.error");
channel.queueBind("all-logs", "logs", "#");
channel.queueBind("app-logs", "logs", "app.#");

// Publish with hierarchical routing key
channel.basicPublish("logs", "app.error", null, msg.getBytes());
channel.basicPublish("logs", "kernel.info", null, msg.getBytes());
channel.basicPublish("logs", "app.payment.success", null, msg.getBytes());

// Routing examples:
// "app.error" -> matches "*.error" and "app.#"
// "kernel.info" -> matches "#" only
// "app.payment.success" -> matches "app.#" and "#"`
        },
        {
          name: 'Fanout Exchange',
          explanation: 'Broadcast messages to all bound queues. Routing key is ignored. Perfect for pub/sub scenarios. All subscribers receive all messages. Use for notifications, alerts, cache invalidation. Fan-out pattern for parallel processing. Duplicate messages across multiple consumers for redundancy.',
          codeExample: `// Declare fanout exchange
channel.exchangeDeclare("notifications", BuiltinExchangeType.FANOUT, true);

// Bind multiple queues (routing key ignored)
channel.queueBind("email-queue", "notifications", "");
channel.queueBind("sms-queue", "notifications", "");
channel.queueBind("push-queue", "notifications", "");

// Publish (routing key ignored)
channel.basicPublish(
    "notifications",
    "", // routing key ignored
    null,
    "Alert: System maintenance in 10 minutes".getBytes()
);

// All bound queues receive the message`
        },
        {
          name: 'Headers Exchange',
          explanation: 'Route based on message header attributes instead of routing key. Match any header (x-match: any) or all headers (x-match: all). Complex routing rules with multiple conditions. Content-based routing. Metadata-driven message distribution. Flexible routing without key constraints.',
          codeExample: `// Declare headers exchange
channel.exchangeDeclare("headers-exchange", BuiltinExchangeType.HEADERS, true);

// Bind with header matching requirements
Map<String, Object> bindArgs = new HashMap<>();
bindArgs.put("x-match", "all"); // or "any"
bindArgs.put("format", "pdf");
bindArgs.put("type", "report");
channel.queueBind("pdf-reports", "headers-exchange", "", bindArgs);

// Publish with headers
Map<String, Object> headers = new HashMap<>();
headers.put("format", "pdf");
headers.put("type", "report");

AMQP.BasicProperties props = new AMQP.BasicProperties.Builder()
    .headers(headers)
    .build();

channel.basicPublish(
    "headers-exchange",
    "", // routing key ignored
    props,
    message.getBytes()
);`
        }
      ]
    },
    {
      id: 'queues',
      name: 'Queues',
      icon: '📥',
      color: '#8b5cf6',
      description: 'Message storage and delivery with durable persistence, priority support, consumer acknowledgments, and quality-of-service controls for reliable message processing',
      diagram: QueuesDiagram,
      details: [
        {
          name: 'Durable Queues',
          explanation: 'Queues survive broker restarts when declared durable. Persistent messages stored to disk. Configure message TTL for automatic expiration. Set max queue length to prevent overflow. Lazy mode for large queues stores messages on disk. Priority levels (0-255) for message ordering. Auto-delete queues removed when unused.',
          codeExample: `// Declare durable queue with arguments
Map<String, Object> args = new HashMap<>();
args.put("x-message-ttl", 60000);        // 60 seconds TTL
args.put("x-max-length", 10000);         // max 10k messages
args.put("x-max-priority", 10);          // priority 0-10
args.put("x-queue-mode", "lazy");        // lazy mode

channel.queueDeclare(
    "my-queue",
    true,  // durable - survives restart
    false, // exclusive
    false, // auto-delete
    args
);

// Publish persistent message with priority
AMQP.BasicProperties props = new AMQP.BasicProperties.Builder()
    .deliveryMode(2) // persistent
    .priority(5)     // priority 0-10
    .expiration("30000") // 30 second TTL
    .build();

channel.basicPublish("", "my-queue", props, msg.getBytes());`
        },
        {
          name: 'Consumer Acknowledgment',
          explanation: 'Manual acknowledgment ensures reliable message processing. Prefetch count (QoS) controls concurrent message delivery. basicAck confirms successful processing. basicNack rejects with optional requeue. Multiple acknowledgment for batch processing. Unacked messages redelivered on consumer failure. Auto-ack for high-throughput scenarios.',
          codeExample: `// Set QoS - prefetch count
channel.basicQos(10); // max 10 unacked messages

// Consumer with manual acknowledgment
DeliverCallback deliverCallback = (consumerTag, delivery) -> {
    String message = new String(delivery.getBody(), "UTF-8");
    try {
        processMessage(message);

        // Acknowledge successful processing
        channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
    } catch (Exception e) {
        // Reject and requeue on failure
        channel.basicNack(
            delivery.getEnvelope().getDeliveryTag(),
            false, // multiple
            true   // requeue
        );
    }
};

channel.basicConsume(
    "my-queue",
    false, // manual ack
    deliverCallback,
    consumerTag -> {}
);`
        },
        {
          name: 'Priority Queues',
          explanation: 'Define max priority level when declaring queue (0-255). Publish messages with priority property. Higher priority messages consumed first. Balance priority with fairness. Use for urgent task processing. SLA-based message handling. Emergency notification delivery. Limited performance impact with proper tuning.',
          codeExample: `// Declare priority queue
Map<String, Object> args = new HashMap<>();
args.put("x-max-priority", 10); // priority 0-10

channel.queueDeclare("priority-queue", true, false, false, args);

// Publish messages with different priorities
AMQP.BasicProperties highPriority = new AMQP.BasicProperties.Builder()
    .priority(10)
    .build();

AMQP.BasicProperties lowPriority = new AMQP.BasicProperties.Builder()
    .priority(1)
    .build();

channel.basicPublish("", "priority-queue", highPriority,
    "Urgent task".getBytes());
channel.basicPublish("", "priority-queue", lowPriority,
    "Normal task".getBytes());

// Consumer receives high priority messages first`
        },
        {
          name: 'Dead Letter Exchanges',
          explanation: 'Route rejected or expired messages to dead letter exchange. Configure x-dead-letter-exchange argument on queue. Capture failed processing attempts. Implement retry logic with delayed requeue. Analyze problematic messages. Prevent poison message blocking. Track message rejection reasons in headers.',
          codeExample: `// Declare dead letter exchange
channel.exchangeDeclare("dlx", BuiltinExchangeType.DIRECT, true);
channel.queueDeclare("dead-letters", true, false, false, null);
channel.queueBind("dead-letters", "dlx", "");

// Declare queue with DLX
Map<String, Object> args = new HashMap<>();
args.put("x-dead-letter-exchange", "dlx");
args.put("x-message-ttl", 60000); // expire after 60s

channel.queueDeclare("work-queue", true, false, false, args);

// Messages go to DLX when:
// 1. Message rejected with requeue=false
// 2. Message TTL expires
// 3. Queue length limit exceeded

// Inspect dead letters for debugging
channel.basicConsume("dead-letters", false,
    (tag, delivery) -> {
        Map<String, Object> headers = delivery.getProperties().getHeaders();
        System.out.println("DL reason: " + headers.get("x-death"));
    },
    tag -> {}
);`
        }
      ]
    },
    {
      id: 'bindings',
      name: 'Bindings',
      icon: '🔗',
      color: '#3b82f6',
      description: 'Flexible routing configuration connecting exchanges to queues with pattern-based, header-based, or direct routing rules that can be dynamically managed at runtime',
      diagram: BindingsDiagram,
      details: [
        {
          name: 'Queue Bindings',
          explanation: 'Bind queues to exchanges with routing keys or patterns. Multiple bindings per queue for different routing rules. Exchange-to-exchange bindings for complex topologies. Dynamic binding creation and removal at runtime. Topic patterns with wildcards (* and #). Direct bindings for specific keys. Fanout bindings ignore routing keys.',
          codeExample: `// Bind queue to exchange with routing key
channel.queueBind("order-queue", "order-exchange", "order.new");

// Multiple bindings to same queue
channel.queueBind("notification-queue", "events", "order.*");
channel.queueBind("notification-queue", "events", "payment.*");
channel.queueBind("notification-queue", "events", "user.registered");

// Exchange-to-exchange binding
channel.exchangeBind("all-events", "order-events", "");
channel.exchangeBind("all-events", "user-events", "");

// Unbind queue
channel.queueUnbind("order-queue", "order-exchange", "order.new");`
        },
        {
          name: 'Dynamic Routing',
          explanation: 'Add or remove bindings without restarting broker. Runtime topology changes for flexible routing. Bind and unbind operations via API or management UI. Support for A/B testing and canary deployments. Temporary bindings for ad-hoc consumers. Version-based routing for service upgrades. Blue-green deployment support.',
          codeExample: `// Dynamic binding for canary deployment
public void enableCanary(int percentage) {
    if (percentage > 0) {
        // Route percentage of traffic to canary
        channel.queueBind(
            "canary-queue",
            "service-exchange",
            "service.request",
            Collections.singletonMap("weight", percentage)
        );
    }
}

// Switch traffic for blue-green deployment
public void switchToGreen() {
    // Remove blue binding
    channel.queueUnbind("blue-queue", "service-exchange", "service.request");

    // Add green binding
    channel.queueBind("green-queue", "service-exchange", "service.request");
}

// Temporary binding for debugging
channel.queueBind("debug-queue", "events", "#");
// ... debug ...
channel.queueUnbind("debug-queue", "events", "#");`
        },
        {
          name: 'Routing Patterns',
          explanation: 'Topic exchange supports hierarchical patterns. Use dots to separate routing key segments. Wildcard * matches exactly one word. Wildcard # matches zero or more words. Example: logs.*.error, events.orders.#. Multiple patterns per binding. Combine patterns for complex routing logic.',
          codeExample: `// Topic exchange routing patterns
channel.exchangeDeclare("logs", BuiltinExchangeType.TOPIC, true);

// Pattern examples:
// *.error - matches "app.error", "db.error"
// app.# - matches "app.error", "app.payment.error"
// #.critical.# - matches anything with "critical"

// Error logs from any source
channel.queueBind("error-logs", "logs", "*.error");
channel.queueBind("error-logs", "logs", "*.*.error");

// All app logs
channel.queueBind("app-logs", "logs", "app.#");

// Critical logs only
channel.queueBind("critical-logs", "logs", "#.critical.#");

// Publishing examples:
channel.basicPublish("logs", "app.error", null, msg);
channel.basicPublish("logs", "db.query.error", null, msg);
channel.basicPublish("logs", "app.payment.critical.error", null, msg);`
        }
      ]
    },
    {
      id: 'clustering',
      name: 'Clustering',
      icon: '🔧',
      color: '#ef4444',
      description: 'Distributed cluster architecture with quorum queues, mirrored queues, automatic failover, and Raft-based consensus for high availability and data safety across multiple nodes',
      diagram: ClusteringDiagram,
      details: [
        {
          name: 'Cluster Formation',
          explanation: 'Multiple RabbitMQ nodes form a single logical broker. Nodes share users, virtual hosts, exchanges, and bindings. Erlang clustering for node communication. Automatic node discovery with plugins. Client connects to any node in cluster. Load distribution across nodes. Network partition handling strategies.',
          codeExample: `# Join node to cluster
rabbitmqctl stop_app
rabbitmqctl join_cluster rabbit@node1
rabbitmqctl start_app

# List cluster nodes
rabbitmqctl cluster_status

# Set cluster name
rabbitmqctl set_cluster_name production-cluster

# Remove node from cluster
rabbitmqctl forget_cluster_node rabbit@node2

# Python client connecting to cluster
import pika

connection = pika.BlockingConnection(
    pika.ConnectionParameters(
        host='rabbit1.example.com',
        # Automatic failover to other nodes
        connection_attempts=3,
        retry_delay=5
    )
)`
        },
        {
          name: 'Quorum Queues',
          explanation: 'Replicated queues using Raft consensus protocol. Replicate to majority of nodes for data safety. Automatic leader election on node failure. Poison message handling with delivery limits. At-least-once delivery guarantees. No message loss on node failures. Better than classic mirrored queues. Recommended for critical workloads.',
          codeExample: `// Declare quorum queue
Map<String, Object> args = new HashMap<>();
args.put("x-queue-type", "quorum");
args.put("x-max-in-memory-length", 10000);
args.put("x-delivery-limit", 3); // poison message handling

channel.queueDeclare(
    "critical-orders",
    true,  // durable
    false,
    false,
    args
);

// Quorum queue features:
// - Replicated across nodes (Raft consensus)
// - Leader election on failure
// - At-least-once delivery
// - Automatic poison message detection
// - No message loss on node failure

// Client automatically handles leader changes
channel.basicPublish("", "critical-orders",
    MessageProperties.PERSISTENT_TEXT_PLAIN,
    message.getBytes()
);`
        },
        {
          name: 'Mirrored Queues (Classic HA)',
          explanation: 'Legacy HA with master-mirror replication. Configure via policies (ha-mode: all, exactly, nodes). Automatic synchronization of new mirrors. Master failover promotes mirror. Synchronous replication for consistency. Performance impact with many mirrors. Use quorum queues for new deployments. Policy-based HA configuration.',
          codeExample: `# Set HA policy via CLI
rabbitmqctl set_policy ha-all "^ha\." \
  '{"ha-mode":"all","ha-sync-mode":"automatic"}' \
  --priority 1 --apply-to queues

# HA modes:
# ha-mode: all - mirror to all nodes
# ha-mode: exactly, ha-params: 2 - exactly 2 replicas
# ha-mode: nodes, ha-params: ["node1", "node2"]

# Python: Declare queue with HA pattern
channel.queue_declare(
    queue='ha.orders',  # matches "^ha\." pattern
    durable=True
)

# HTTP API to set policy
curl -u guest:guest -X PUT \
  http://localhost:15672/api/policies/%2f/ha-all \
  -H "content-type:application/json" \
  -d '{"pattern":"^ha\.", "definition":{"ha-mode":"all"}}'`
        },
        {
          name: 'Federation & Shovel',
          explanation: 'Federation connects brokers across data centers. Asynchronous message replication between clusters. Shovel moves messages between queues or exchanges. Cross-region redundancy. Disaster recovery configurations. WAN-friendly message distribution. Loose coupling between geographically distributed brokers.',
          codeExample: `# Enable federation plugin
rabbitmq-plugins enable rabbitmq_federation
rabbitmq-plugins enable rabbitmq_federation_management

# Define upstream (remote broker)
rabbitmqctl set_parameter federation-upstream east \
  '{"uri":"amqp://rabbit.us-east.example.com"}'

# Create federation policy
rabbitmqctl set_policy federate-me "^federated\." \
  '{"federation-upstream":"east"}' \
  --apply-to exchanges

# Shovel configuration (move messages between queues)
rabbitmqctl set_parameter shovel my-shovel \
'{
  "src-uri": "amqp://localhost",
  "src-queue": "source-queue",
  "dest-uri": "amqp://remote-host",
  "dest-queue": "destination-queue"
}'

# Use cases:
# - Multi-datacenter replication
# - Disaster recovery
# - WAN message distribution
# - Cross-cluster communication`
        }
      ]
    },
    {
      id: 'management',
      name: 'Management & Monitoring',
      icon: '📊',
      color: '#14b8a6',
      description: 'Comprehensive web-based management interface and REST API for monitoring cluster health, managing resources, viewing metrics, and configuring policies across the broker',
      diagram: ManagementDiagram,
      details: [
        {
          name: 'Management API',
          explanation: 'RESTful HTTP API for broker operations. Endpoints for queues, exchanges, bindings, connections. JSON responses for easy integration. Basic authentication or OAuth. List resources, get statistics, create/delete entities. Automate broker configuration. Integration with CI/CD pipelines. Programmatic policy management.',
          codeExample: `# Management API examples (curl)

# List all queues
curl -u guest:guest http://localhost:15672/api/queues

# Get queue details
curl -u guest:guest http://localhost:15672/api/queues/%2f/my-queue

# Create exchange
curl -u guest:guest -X PUT \
  http://localhost:15672/api/exchanges/%2f/my-exchange \
  -H "content-type:application/json" \
  -d '{"type":"topic","durable":true}'

# Create binding
curl -u guest:guest -X POST \
  http://localhost:15672/api/bindings/%2f/e/my-exchange/q/my-queue \
  -H "content-type:application/json" \
  -d '{"routing_key":"app.*"}'

# Publish message via API
curl -u guest:guest -X POST \
  http://localhost:15672/api/exchanges/%2f/my-exchange/publish \
  -H "content-type:application/json" \
  -d '{"routing_key":"app.test","payload":"hello","properties":{}}'`
        },
        {
          name: 'Monitoring & Metrics',
          explanation: 'Real-time metrics via management UI and API. Message rates (publish, deliver, ack). Queue depth and consumer counts. Memory and disk usage tracking. Connection and channel statistics. Prometheus exporter for metrics scraping. Alerting on thresholds (memory, disk, queue length). Grafana dashboards for visualization.',
          codeExample: `# Enable Prometheus plugin
rabbitmq-plugins enable rabbitmq_prometheus

# Prometheus scrape endpoint
# http://localhost:15692/metrics

# Key metrics to monitor:
# - rabbitmq_queue_messages (queue depth)
# - rabbitmq_queue_messages_ready
# - rabbitmq_queue_messages_unacknowledged
# - rabbitmq_queue_consumers
# - rabbitmq_connections
# - rabbitmq_channels

# Prometheus config (prometheus.yml)
scrape_configs:
  - job_name: 'rabbitmq'
    static_configs:
      - targets: ['localhost:15692']

# Alert rules (alerts.yml)
groups:
  - name: rabbitmq
    rules:
      - alert: HighQueueDepth
        expr: rabbitmq_queue_messages > 10000
        annotations:
          summary: "Queue depth too high"
      - alert: NoConsumers
        expr: rabbitmq_queue_consumers == 0
        annotations:
          summary: "Queue has no consumers"`
        },
        {
          name: 'Policy Management',
          explanation: 'Define policies for automatic queue configuration. Pattern-based policy application (regex). Set HA mode, TTL, max-length, message expiry. Apply to queues or exchanges matching pattern. Runtime policy updates without queue recreation. Priority-based policy application. Operator policies override user policies. Centralized configuration management.',
          codeExample: `# Set policy via CLI
rabbitmqctl set_policy TTL "^ttl\." \
  '{"message-ttl":60000,"expires":120000}' \
  --priority 1 --apply-to queues

# HA policy for production queues
rabbitmqctl set_policy prod-ha "^prod\." \
  '{"ha-mode":"exactly","ha-params":3,"ha-sync-mode":"automatic"}' \
  --priority 10

# Max length policy
rabbitmqctl set_policy max-length "^limited\." \
  '{"max-length":10000,"overflow":"reject-publish"}' \
  --priority 1

# List all policies
rabbitmqctl list_policies

# Delete policy
rabbitmqctl clear_policy TTL

# HTTP API to manage policies
curl -u guest:guest -X PUT \
  http://localhost:15672/api/policies/%2f/my-policy \
  -H "content-type:application/json" \
  -d '{
    "pattern": "^myapp\.",
    "definition": {"max-length": 5000},
    "priority": 0,
    "apply-to": "queues"
  }'`
        },
        {
          name: 'Health Checks',
          explanation: 'HTTP health check endpoints for load balancers. Node aliveness checks for monitoring. Cluster health status. Alarms for resource thresholds (memory, disk). Virtual host-specific health checks. Readiness and liveness probes for Kubernetes. Circuit breaker integration. Automated recovery procedures.',
          codeExample: `# Health check endpoints

# Node aliveness
curl -u guest:guest http://localhost:15672/api/aliveness-test/%2f

# Cluster health
curl -u guest:guest http://localhost:15672/api/healthchecks/node
curl -u guest:guest http://localhost:15672/api/healthchecks/cluster

# Kubernetes probes
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: rabbitmq
      livenessProbe:
        exec:
          command: ["rabbitmq-diagnostics", "ping"]
        initialDelaySeconds: 60
        periodSeconds: 60
        timeoutSeconds: 15
      readinessProbe:
        exec:
          command: ["rabbitmq-diagnostics", "check_port_connectivity"]
        initialDelaySeconds: 20
        periodSeconds: 60
        timeoutSeconds: 10

# Check for alarms
rabbitmqctl list_alarms

# Common alarms:
# - memory_alarm: memory threshold exceeded
# - disk_free_alarm: disk space low`
        }
      ]
    }
  ]

  // =============================================================================
  // NAVIGATION HANDLERS
  // =============================================================================

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  const handlePreviousConcept = () => {
    if (selectedConceptIndex > 0) {
      setSelectedConceptIndex(selectedConceptIndex - 1)
      setSelectedDetailIndex(0)
    }
  }

  const handleNextConcept = () => {
    if (selectedConceptIndex < concepts.length - 1) {
      setSelectedConceptIndex(selectedConceptIndex + 1)
      setSelectedDetailIndex(0)
    }
  }

  // =============================================================================
  // BREADCRUMB CONFIGURATION
  // =============================================================================

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'Messaging', icon: '📨', page: 'Messaging' },
      { name: 'RabbitMQ', icon: '🐰', page: 'RabbitMQ' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index, item) => {
    if (index === 0) {
      onBack()  // Go back to Messaging main page
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)  // Close modal, stay on RabbitMQ page
    }
  }

  // =============================================================================
  // KEYBOARD NAVIGATION
  // =============================================================================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (selectedConcept) {
          setSelectedConceptIndex(null)
        } else {
          onBack()
        }
      } else if (e.key === 'ArrowLeft' && selectedConceptIndex !== null) {
        e.preventDefault()
        handlePreviousConcept()
      } else if (e.key === 'ArrowRight' && selectedConceptIndex !== null) {
        e.preventDefault()
        handleNextConcept()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

  // =============================================================================
  // STYLES
  // =============================================================================

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #881337 50%, #0f172a 100%)',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }

  const headerStyle = {
    maxWidth: '1400px',
    margin: '0 auto 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  }

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #fda4af, #fb7185)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(251, 113, 133, 0.2)',
    border: '1px solid rgba(251, 113, 133, 0.3)',
    borderRadius: '0.5rem',
    color: '#fb7185',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>RabbitMQ</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(251, 113, 133, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(251, 113, 133, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Messaging
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          colors={RABBITMQ_COLORS}
        />
      </div>

      {/* Concept Cards Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {concepts.map((concept, index) => (
          <div
            key={concept.id}
            onClick={() => setSelectedConceptIndex(index)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: `1px solid ${concept.color}40`,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = `0 20px 40px ${concept.color}20`
              e.currentTarget.style.borderColor = concept.color
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.borderColor = `${concept.color}40`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{concept.icon}</span>
              <h3 style={{ color: concept.color, margin: 0, fontSize: '1.25rem' }}>{concept.name}</h3>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>{concept.description}</p>
            <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
              {concept.details.length} topics • Click to explore
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Selected Concept */}
      {selectedConcept && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => setSelectedConceptIndex(null)}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              borderRadius: '1rem',
              padding: '2rem',
              maxWidth: '1200px',
              maxHeight: '92vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              colors={RABBITMQ_COLORS}
            />

            {/* Modal Header with Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #334155'
            }}>
              <h2 style={{
                color: selectedConcept.color,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.25rem'
              }}>
                <span>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button
                  onClick={handlePreviousConcept}
                  disabled={selectedConceptIndex === 0}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >←</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>
                  {selectedConceptIndex + 1}/{concepts.length}
                </span>
                <button
                  onClick={handleNextConcept}
                  disabled={selectedConceptIndex === concepts.length - 1}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >→</button>
                <button
                  onClick={() => setSelectedConceptIndex(null)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '0.375rem',
                    color: '#f87171',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    marginLeft: '0.5rem'
                  }}
                >✕</button>
              </div>
            </div>

            {/* Subtopic Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDetailIndex(i)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)',
                    border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`,
                    borderRadius: '0.5rem',
                    color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: selectedDetailIndex === i ? '600' : '400',
                    transition: 'all 0.2s'
                  }}
                >
                  {detail.name}
                </button>
              ))}
            </div>

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = detail.diagram || selectedConcept.diagram
              return (
                <div>
                  {/* Diagram */}
                  {DiagramComponent && (
                    <div style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      border: '1px solid #334155'
                    }}>
                      <DiagramComponent />
                    </div>
                  )}

                  {/* Detail Name */}
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                    {detail.name}
                  </h3>

                  {/* Explanation */}
                  <p style={{
                    color: '#e2e8f0',
                    lineHeight: '1.8',
                    marginBottom: '1rem',
                    background: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'left'
                  }}>
                    {detail.explanation}
                  </p>

                  {/* Code Example */}
                  {detail.codeExample && (
                    <SyntaxHighlighter
                      language="java"
                      style={vscDarkPlus}
                      customStyle={{
                        padding: '1rem',
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.8rem',
                        border: '1px solid #334155',
                        background: '#0f172a'
                      }}
                      codeTagProps={{ style: { background: 'transparent' } }}
                    >
                      {detail.codeExample}
                    </SyntaxHighlighter>
                  )}
                </div>
              )
            })()}

          </div>
        </div>
      )}
    </div>
  )
}

export default RabbitMQ

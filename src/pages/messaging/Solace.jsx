import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const SOLACE_COLORS = {
  primary: '#be123c',           // Burgundy
  primaryHover: '#e11d48',      // Hover state
  bg: 'rgba(190, 18, 60, 0.1)', // Background with transparency
  border: 'rgba(190, 18, 60, 0.3)', // Border color
  arrow: '#be123c',             // Arrow/indicator color
  hoverBg: 'rgba(190, 18, 60, 0.2)', // Hover background
  topicBg: 'rgba(190, 18, 60, 0.2)'  // Topic card background
}

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

const BrokerDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrow-broker" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
      </marker>
    </defs>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Solace PubSub+ Event Broker</text>

    <rect x="50" y="45" width="120" height="55" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="110" y="70" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Publishers</text>
    <text x="110" y="88" textAnchor="middle" fill="#93c5fd" fontSize="8">MQTT/AMQP/REST</text>

    <rect x="280" y="35" width="240" height="100" rx="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="400" y="58" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Solace PubSub+ Broker</text>
    <rect x="295" y="70" width="100" height="30" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="345" y="90" textAnchor="middle" fill="#fbbf24" fontSize="8">Message VPN</text>
    <rect x="405" y="70" width="100" height="30" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="455" y="90" textAnchor="middle" fill="#a78bfa" fontSize="8">Topics/Queues</text>
    <text x="400" y="125" textAnchor="middle" fill="#86efac" fontSize="8">HA Cluster | Guaranteed Delivery</text>

    <rect x="630" y="45" width="120" height="55" rx="6" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="2"/>
    <text x="690" y="70" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">Subscribers</text>
    <text x="690" y="88" textAnchor="middle" fill="#fbcfe8" fontSize="8">JMS/SMF/WebSocket</text>

    <path d="M 170 72 L 275 72" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-broker)"/>
    <path d="M 520 72 L 625 72" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-broker)"/>

    <rect x="250" y="150" width="300" height="25" rx="4" fill="rgba(100, 116, 139, 0.1)" stroke="#64748b" strokeWidth="1"/>
    <text x="400" y="167" textAnchor="middle" fill="#94a3b8" fontSize="8">Software | Appliance | Cloud (SaaS)</text>
  </svg>
)

// Event Portal Diagram
const EventPortalDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Solace Event Portal</text>

    <rect x="250" y="40" width="300" height="80" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2"/>
    <text x="400" y="65" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Event Portal</text>
    <text x="400" y="85" textAnchor="middle" fill="#fca5a5" fontSize="8">Design | Discover | Govern</text>
    <text x="400" y="100" textAnchor="middle" fill="#fca5a5" fontSize="8">AsyncAPI | Event Catalog</text>

    <rect x="50" y="130" width="140" height="40" rx="4" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1"/>
    <text x="120" y="155" textAnchor="middle" fill="#60a5fa" fontSize="9">Event Mesh</text>

    <rect x="230" y="130" width="140" height="40" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="300" y="155" textAnchor="middle" fill="#4ade80" fontSize="9">Runtime Discovery</text>

    <rect x="410" y="130" width="140" height="40" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="480" y="155" textAnchor="middle" fill="#fbbf24" fontSize="9">Schema Registry</text>

    <rect x="590" y="130" width="140" height="40" rx="4" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="660" y="155" textAnchor="middle" fill="#a78bfa" fontSize="9">Code Generation</text>
  </svg>
)

// Message VPN Diagram
const MessageVPNDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Message VPN - Multi-Tenancy</text>

    <rect x="100" y="40" width="600" height="120" rx="8" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="400" y="60" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Solace Broker</text>

    <rect x="130" y="75" width="160" height="70" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="210" y="100" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">VPN: Production</text>
    <text x="210" y="118" textAnchor="middle" fill="#86efac" fontSize="8">Isolated namespace</text>
    <text x="210" y="133" textAnchor="middle" fill="#86efac" fontSize="8">ACLs, Quotas</text>

    <rect x="320" y="75" width="160" height="70" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="400" y="100" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">VPN: Staging</text>
    <text x="400" y="118" textAnchor="middle" fill="#fcd34d" fontSize="8">Test environment</text>
    <text x="400" y="133" textAnchor="middle" fill="#fcd34d" fontSize="8">Separate users</text>

    <rect x="510" y="75" width="160" height="70" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="590" y="100" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">VPN: Dev</text>
    <text x="590" y="118" textAnchor="middle" fill="#c4b5fd" fontSize="8">Development</text>
    <text x="590" y="133" textAnchor="middle" fill="#c4b5fd" fontSize="8">Lower limits</text>
  </svg>
)

// Queues and Topics Diagram
const QueuesTopicsDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`Solace Topics & Queues`}</text>

    <rect x="50" y="45" width="320" height="120" rx="6" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="210" y="68" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Topic Subscriptions (Pub/Sub)</text>
    <text x="210" y="88" textAnchor="middle" fill="#c4b5fd" fontSize="8">{`orders/>  (wildcard)`}</text>
    <text x="210" y="105" textAnchor="middle" fill="#c4b5fd" fontSize="8">orders/*/created</text>
    <rect x="70" y="115" width="120" height="35" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="130" y="137" textAnchor="middle" fill="#4ade80" fontSize="8">Subscriber A</text>
    <rect x="210" y="115" width="120" height="35" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="1"/>
    <text x="270" y="137" textAnchor="middle" fill="#4ade80" fontSize="8">Subscriber B</text>

    <rect x="430" y="45" width="320" height="120" rx="6" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="590" y="68" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Queue Endpoints (P2P)</text>
    <rect x="450" y="85" width="130" height="35" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="515" y="107" textAnchor="middle" fill="#fbbf24" fontSize="8">order-queue</text>
    <rect x="600" y="85" width="130" height="35" rx="4" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="665" y="107" textAnchor="middle" fill="#fbbf24" fontSize="8">payment-queue</text>
    <text x="590" y="150" textAnchor="middle" fill="#93c5fd" fontSize="8">Exclusive | Non-Exclusive consumers</text>
  </svg>
)

// Persistent Messaging Diagram
const PersistentDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Guaranteed Messaging</text>

    <rect x="50" y="50" width="120" height="55" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="110" y="75" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Publisher</text>
    <text x="110" y="93" textAnchor="middle" fill="#93c5fd" fontSize="8">Persistent msg</text>

    <rect x="220" y="50" width="160" height="55" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="300" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Broker Spool</text>
    <text x="300" y="93" textAnchor="middle" fill="#86efac" fontSize="8">Disk persistence</text>

    <rect x="430" y="50" width="160" height="55" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="510" y="75" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Queue</text>
    <text x="510" y="93" textAnchor="middle" fill="#fcd34d" fontSize="8">Message retained</text>

    <rect x="640" y="50" width="120" height="55" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="700" y="75" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Consumer</text>
    <text x="700" y="93" textAnchor="middle" fill="#c4b5fd" fontSize="8">ACK required</text>

    <path d="M 170 77 L 215 77" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 380 77 L 425 77" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 590 77 L 635 77" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>

    <rect x="200" y="125" width="400" height="40" rx="4" fill="rgba(100, 116, 139, 0.1)" stroke="#64748b" strokeWidth="1"/>
    <text x="400" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">Delivery Modes: Direct | Non-Persistent | Persistent</text>
    <text x="400" y="158" textAnchor="middle" fill="#64748b" fontSize="8">XA Transactions | Publisher Confirms | Consumer ACKs</text>
  </svg>
)

// Replay Diagram
const ReplayDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">{`Message Replay & Time Travel`}</text>

    <rect x="50" y="50" width="200" height="70" rx="6" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="150" y="75" textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="bold">Replay Log</text>
    <text x="150" y="93" textAnchor="middle" fill="#a5f3fc" fontSize="8">Time-based retention</text>
    <text x="150" y="108" textAnchor="middle" fill="#a5f3fc" fontSize="8">All messages stored</text>

    <rect x="300" y="50" width="200" height="70" rx="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="75" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Replay Request</text>
    <text x="400" y="93" textAnchor="middle" fill="#c4b5fd" fontSize="8">From timestamp</text>
    <text x="400" y="108" textAnchor="middle" fill="#c4b5fd" fontSize="8">From message ID</text>

    <rect x="550" y="50" width="200" height="70" rx="6" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="2"/>
    <text x="650" y="75" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Consumer</text>
    <text x="650" y="93" textAnchor="middle" fill="#86efac" fontSize="8">Receives historical</text>
    <text x="650" y="108" textAnchor="middle" fill="#86efac" fontSize="8">+ live messages</text>

    <path d="M 250 85 L 295 85" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
    <path d="M 500 85 L 545 85" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>

    <rect x="200" y="140" width="400" height="30" rx="4" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="1"/>
    <text x="400" y="160" textAnchor="middle" fill="#fbbf24" fontSize="9">Use cases: Debug, Audit, New consumer catch-up, Disaster recovery</text>
  </svg>
)

function Solace({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  const concepts = [
    {
      id: 'broker',
      name: 'Solace Broker',
      icon: '🔥',
      color: '#10b981',
      description: 'Enterprise-grade message broker providing high-performance, reliable messaging infrastructure with built-in high availability',
      diagram: BrokerDiagram,
      details: [
        {
          name: 'Session Management',
          explanation: 'Create and manage connections to Solace broker. Configure connection properties including host, VPN name, credentials. Session represents conversation with broker. Connection pooling for efficiency. Automatic reconnection strategies. Resource lifecycle management.',
          codeExample: `// Java: Connect to Solace Broker
final JCSMPProperties properties = new JCSMPProperties();
properties.setProperty(JCSMPProperties.HOST, "tcp://localhost:55555");
properties.setProperty(JCSMPProperties.VPN_NAME, "default");
properties.setProperty(JCSMPProperties.USERNAME, "admin");
properties.setProperty(JCSMPProperties.PASSWORD, "admin");

// Create session
final JCSMPSession session = JCSMPFactory.onlyInstance()
    .createSession(properties);

session.connect();

// Session is ready for messaging
System.out.println("Connected to Solace broker!");`
        },
        {
          name: 'High Availability',
          explanation: 'Multiple broker URLs for failover. Primary and backup broker configuration. Automatic reconnection on failure. Reapply subscriptions after reconnect. Transparent failover for applications. Zero message loss during broker failover. Session event handlers for connection monitoring.',
          codeExample: `// Configure HA with multiple broker URLs
final JCSMPProperties properties = new JCSMPProperties();
properties.setProperty(JCSMPProperties.HOST,
    "tcp://primary:55555,tcp://backup:55555");
properties.setProperty(JCSMPProperties.VPN_NAME, "default");

// Enable automatic reconnection
properties.setProperty(JCSMPProperties.REAPPLY_SUBSCRIPTIONS, true);

// Session event handler for connection monitoring
properties.setProperty(JCSMPProperties.SESSION_EVENT_HANDLER,
    new SessionEventHandler() {
        @Override
        public void handleEvent(SessionEventArgs event) {
            System.out.println("Session Event: " + event);
        }
    });`
        },
        {
          name: 'Performance Tuning',
          explanation: 'Configure acknowledgment window sizes for throughput. TCP no-delay for low latency. Socket buffer sizing for high-volume workloads. Message callback on reactor thread. Disable unnecessary features. Balance between latency and throughput. Optimize for specific use case.',
          codeExample: `// Performance tuning properties
final JCSMPProperties properties = new JCSMPProperties();

// Increase ACK window for high throughput
properties.setProperty(JCSMPProperties.PUB_ACK_WINDOW_SIZE, 255);

// TCP no-delay for low latency
properties.setProperty(JCSMPProperties.NO_DELAY, true);

// Socket buffer sizes for high volume
properties.setProperty(JCSMPProperties.SOCKET_SEND_BUFFER_SIZE, 131072);
properties.setProperty(JCSMPProperties.SOCKET_RECEIVE_BUFFER_SIZE, 131072);

// Direct callback on reactor thread for minimal latency
properties.setProperty(JCSMPProperties.MESSAGE_CALLBACK_ON_REACTOR, true);`
        }
      ]
    },
    {
      id: 'eventportal',
      name: 'Event Portal',
      icon: '🌐',
      color: '#ef4444',
      description: 'Event-driven architecture management platform for designing, documenting, and governing event streams',
      diagram: EventPortalDiagram,
      details: [
        {
          name: 'Event Catalog',
          explanation: 'Central repository for event schemas and definitions. JSON Schema, Avro, Protobuf support. Version management for schemas. Event metadata and documentation. Searchable catalog of all events. Consumer and producer discovery. API-driven schema registration.',
          codeExample: `// Define event schema in AsyncAPI
asyncapi: '2.5.0'
info:
  title: Order Service Events
  version: '1.0.0'
channels:
  order/created:
    subscribe:
      message:
        contentType: application/json
        payload:
          type: object
          properties:
            orderId:
              type: string
            customerId:
              type: string
            amount:
              type: number`
        },
        {
          name: 'Runtime Discovery',
          explanation: 'Automatically discover events flowing through broker. Monitor topics and payloads in real-time. Identify undocumented events. Track event publishers and consumers. Generate schema from runtime data. Visualize event flows. Alert on schema drift.',
          codeExample: `// Event Portal REST API - Runtime Discovery
curl -X GET "https://api.solace.cloud/api/v2/architecture/events" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json"

// Response shows discovered events
{
  "data": [{
    "id": "evt123",
    "name": "order.created",
    "topicAddress": "commerce/orders/created",
    "schemaId": "schema456",
    "producers": ["order-service"],
    "consumers": ["fulfillment-service"]
  }]
}`
        },
        {
          name: 'Governance & Lifecycle',
          explanation: 'Event approval workflows and policies. Ownership and responsibility assignment. Deprecation policies for old events. State management (draft, approved, deprecated). Version control and migration paths. Consumer impact analysis. Compliance and audit trails.',
          codeExample: `// Event lifecycle states in Event Portal
{
  "eventId": "evt123",
  "name": "OrderCreatedEvent",
  "version": "2.0.0",
  "state": "APPROVED",
  "owner": "order-team",
  "deprecationDate": null,
  "consumers": [
    {"appId": "fulfillment-svc", "version": "1.2.0"},
    {"appId": "analytics-svc", "version": "3.1.0"}
  ],
  "approvalHistory": [
    {"date": "2025-01-15", "user": "architect", "action": "APPROVED"}
  ]
}`
        }
      ]
    },
    {
      id: 'messagevpn',
      name: 'Message VPN',
      icon: '🔐',
      color: '#3b82f6',
      description: 'Virtual private networking within Solace broker enabling multi-tenancy, security isolation, and resource management',
      diagram: MessageVPNDiagram,
      details: [
        {
          name: 'VPN Configuration',
          explanation: 'Multiple isolated VPNs on single broker. Production and development separation. Per-VPN authentication and authorization. Independent message routing. Isolated message stores. Multi-tenancy for different applications. Environment segmentation.',
          codeExample: `# Connect to specific Message VPN
final JCSMPProperties properties = new JCSMPProperties();
properties.setProperty(JCSMPProperties.HOST, "tcp://broker:55555");
properties.setProperty(JCSMPProperties.VPN_NAME, "production-vpn");
properties.setProperty(JCSMPProperties.USERNAME, "app-user");
properties.setProperty(JCSMPProperties.PASSWORD, "secure-password");

final JCSMPSession session = JCSMPFactory.onlyInstance()
    .createSession(properties);

// Messages are isolated to this VPN
session.connect();`
        },
        {
          name: 'Access Control',
          explanation: 'ACL-based permission model per VPN. Publish/subscribe permissions by topic. Client username and client name restrictions. Connection limits. Topic and queue access control. Fine-grained security policies. LDAP/Kerberos integration.',
          codeExample: `# CLI: Configure ACL profile for VPN
solace> enable
solace# configure
solace(configure)# acl-profile "app-profile" message-vpn "production-vpn"
solace(configure-acl-profile)# publish-topic default-action disallow
solace(configure-acl-profile)# publish-topic exceptions commerce/orders/>
solace(configure-acl-profile)# subscribe-topic default-action disallow
solace(configure-acl-profile)# subscribe-topic exceptions commerce/>

# Apply ACL to client username
solace(configure)# client-username "order-service" message-vpn "production-vpn"
solace(configure-client-username)# acl-profile "app-profile"`
        },
        {
          name: 'Resource Limits',
          explanation: 'Quota management per VPN. Max connections, queues, topics. Spool usage limits (disk space). Message rate throttling. Client profile settings. Prevent resource exhaustion. Fair resource allocation. Monitoring and alerting on limits.',
          codeExample: `# CLI: Configure VPN resource limits
solace(configure)# message-vpn "production-vpn"
solace(configure-message-vpn)# max-connections 1000
solace(configure-message-vpn)# max-subscriptions 100000
solace(configure-message-vpn)# max-spool-usage 50000

# Client profile with rate limits
solace(configure)# client-profile "rate-limited" message-vpn "production-vpn"
solace(configure-client-profile)# max-ingress-flows 10000
solace(configure-client-profile)# max-egress-flows 10000
solace(configure-client-profile)# max-connections-per-client-username 10`
        }
      ]
    },
    {
      id: 'queuestopics',
      name: 'Queues & Topics',
      icon: '📬',
      color: '#8b5cf6',
      description: 'Flexible messaging patterns supporting publish-subscribe with topics and point-to-point with queues',
      diagram: QueuesTopicsDiagram,
      details: [
        {
          name: 'Topic Publishing',
          explanation: 'Hierarchical topic structure (e.g., commerce/orders/created). Wildcards for subscriptions (* and >). Dynamic topic routing. Direct messaging pattern. Low-latency pub-sub. Fan-out to multiple subscribers. Topic-based filtering.',
          codeExample: `// Publish to hierarchical topic
final XMLMessageProducer producer = session.getMessageProducer(
    new JCSMPStreamingPublishCorrelatingEventHandler() {
        @Override
        public void handleError(String messageId, JCSMPException e, long timestamp) {
            System.err.println("Error publishing: " + e);
        }
    }
);

// Publish message to topic
final Topic topic = JCSMPFactory.onlyInstance()
    .createTopic("commerce/orders/created");

final TextMessage msg = JCSMPFactory.onlyInstance().createMessage(TextMessage.class);
msg.setText("{\\"orderId\\": \\"12345\\", \\"amount\\": 99.99}");

producer.send(msg, topic);

// Subscribers use wildcards: commerce/orders/> matches all order events`
        },
        {
          name: 'Queue Consumers',
          explanation: 'Durable queues for guaranteed delivery. Client acknowledgment for reliability. Flow control to prevent overwhelm. Multiple consumers for load balancing. Exclusive or non-exclusive access. Message redelivery on nack. Dead message queue for failures.',
          codeExample: `// Create queue consumer with flow control
final Queue queue = JCSMPFactory.onlyInstance()
    .createQueue("order-processing-queue");

final ConsumerFlowProperties flowProps = new ConsumerFlowProperties();
flowProps.setEndpoint(queue);
flowProps.setAckMode(JCSMPProperties.SUPPORTED_MESSAGE_ACK_CLIENT);

final FlowReceiver flowReceiver = session.createFlow(
    new XMLMessageListener() {
        @Override
        public void onReceive(BytesXMLMessage msg) {
            try {
                // Process message
                processOrder(msg);
                // Acknowledge successful processing
                msg.ackMessage();
            } catch (Exception e) {
                // Negative ACK causes redelivery
                msg.nackMessage();
            }
        }
    },
    flowProps
);

flowReceiver.start();`
        },
        {
          name: 'Topic to Queue Mapping',
          explanation: 'Attract topic messages to queues. Queue subscriptions to topic patterns. Convert pub-sub to point-to-point. Persistent storage for topic messages. Decoupling publishers from consumers. Flexible routing rules. Dynamic subscription management.',
          codeExample: `# CLI: Add topic subscription to queue
solace(configure)# message-spool message-vpn "default"
solace(configure-message-spool)# queue "order-queue"
solace(configure-message-spool-queue)# subscription topic "commerce/orders/>"
solace(configure-message-spool-queue)# permission all consume

# Now all messages published to commerce/orders/*
# are routed to the queue for persistent storage

# Programmatic subscription
final Queue queue = JCSMPFactory.onlyInstance()
    .createQueue("order-queue");
session.addSubscription(queue,
    JCSMPFactory.onlyInstance().createTopic("commerce/orders/>"),
    JCSMPSession.WAIT_FOR_CONFIRM);`
        }
      ]
    },
    {
      id: 'persistent',
      name: 'Persistent Messaging',
      icon: '💾',
      color: '#3b82f6',
      description: 'Enterprise-grade message persistence with guaranteed delivery, transactional support, and disk-based spooling',
      diagram: PersistentDiagram,
      details: [
        {
          name: 'Guaranteed Delivery',
          explanation: 'Persistent message delivery mode. Acknowledgment from broker confirms spooling. Correlation keys for tracking. Delivery guarantees even on failure. Message persistence to disk. No message loss. Publisher flow control.',
          codeExample: `// Publish persistent message with acknowledgment
final XMLMessageProducer producer = session.getMessageProducer(
    new JCSMPStreamingPublishCorrelatingEventHandler() {
        @Override
        public void handleErrorEx(Object key, JCSMPException cause, long timestamp) {
            System.err.println("Error publishing message " + key + ": " + cause);
        }

        @Override
        public void responseReceivedEx(Object key) {
            System.out.println("Message " + key + " acknowledged by broker");
        }
    }
);

final TextMessage msg = JCSMPFactory.onlyInstance().createMessage(TextMessage.class);
msg.setDeliveryMode(DeliveryMode.PERSISTENT);
msg.setText("Critical order data");

// Set correlation key for tracking
producer.send(msg, queue, "order-12345");`
        },
        {
          name: 'Transactional Publishing',
          explanation: 'ACID transactions for message publishing. Multiple messages in single transaction. Atomic commit or rollback. Transacted sessions. Coordinated publishing across queues. Exactly-once semantics. Consistency guarantees for distributed workflows.',
          codeExample: `// Create transacted session
final JCSMPProperties properties = new JCSMPProperties();
properties.setProperty(JCSMPProperties.HOST, "tcp://localhost:55555");

final JCSMPSession session = JCSMPFactory.onlyInstance()
    .createSession(properties);
session.connect();

final XMLMessageProducer producer = session.getMessageProducer(null);

try {
    // Begin transaction
    final JCSMPTransactedSession txSession = session.createTransactedSession();

    // Publish multiple messages in transaction
    txSession.send(msg1, queue1);
    txSession.send(msg2, queue2);
    txSession.send(msg3, queue3);

    // Commit - all or nothing
    txSession.commit();
} catch (Exception e) {
    // Rollback on error
    txSession.rollback();
}`
        },
        {
          name: 'Message Spooling',
          explanation: 'Disk-based message storage. High-throughput spooling engine. Configurable spool size limits. Message TTL (time-to-live). Overflow to disk. Persistent queues and topics. Survive broker restarts. Large message backlogs supported.',
          codeExample: `# CLI: Configure message spool for VPN
solace(configure)# message-spool message-vpn "production-vpn"
solace(configure-message-spool)# max-spool-usage 50000
solace(configure-message-spool)# max-transacted-sessions 1000

# Configure queue with TTL and size limits
solace(configure-message-spool)# queue "order-queue"
solace(configure-message-spool-queue)# max-message-size 10000000
solace(configure-message-spool-queue)# max-spool-usage 1000
solace(configure-message-spool-queue)# max-ttl 86400
solace(configure-message-spool-queue)# respect-ttl
solace(configure-message-spool-queue)# no shutdown`
        }
      ]
    },
    {
      id: 'replay',
      name: 'Replay & Time Travel',
      icon: '⏮️',
      color: '#14b8a6',
      description: 'Advanced message replay capabilities enabling time-travel debugging and historical data analysis',
      diagram: ReplayDiagram,
      details: [
        {
          name: 'Message Replay',
          explanation: 'Replay messages from specific point in time. Reprocess historical events. Recover from application errors. Debug production issues. Replay from date/time or message ID. Fast-forward through message log. State reconstruction.',
          codeExample: `// Create replay flow from specific time
final ReplayStartLocation startLocation =
    JCSMPFactory.onlyInstance().createReplayStartLocationDate(
        new Date(System.currentTimeMillis() - 3600000) // 1 hour ago
    );

final ConsumerFlowProperties flowProps = new ConsumerFlowProperties();
flowProps.setEndpoint(queue);
flowProps.setStartLocation(startLocation);

final FlowReceiver flowReceiver = session.createFlow(
    new XMLMessageListener() {
        @Override
        public void onReceive(BytesXMLMessage msg) {
            System.out.println("Replayed message: " +
                msg.getApplicationMessageId());
            processReplayedMessage(msg);
        }
    },
    flowProps
);

flowReceiver.start();`
        },
        {
          name: 'Time-Based Replay',
          explanation: 'Specify exact timestamp for replay start. Replay time ranges (e.g., yesterdays trading session). Event sourcing patterns. Temporal queries on message streams. Reconstruct state at any point in time. Historical analytics.',
          codeExample: `// Replay messages from specific date/time range
final Calendar calendar = Calendar.getInstance();
calendar.set(2026, Calendar.JANUARY, 20, 9, 30, 0); // Jan 20, 9:30 AM

final ReplayStartLocation startLocation =
    JCSMPFactory.onlyInstance().createReplayStartLocationDate(
        calendar.getTime()
    );

// Configure replay log on queue
# CLI configuration:
solace(configure)# message-spool message-vpn "default"
solace(configure-message-spool)# queue "trading-events"
solace(configure-message-spool-queue)# replay-log-name "trading-replay-log"

# Replay log configuration
solace(configure)# replay-log "trading-replay-log" message-vpn "default"
solace(configure-replay-log)# max-spool-usage 100000
solace(configure-replay-log)# no shutdown`
        },
        {
          name: 'Replay with Filtering',
          explanation: 'Selective replay with message selectors. Filter by message properties. Replay only relevant subset. Reduce processing overhead. Focus on specific event types. SQL-like filter expressions. Combine time ranges with filters.',
          codeExample: `// Replay with message selector filter
final ConsumerFlowProperties flowProps = new ConsumerFlowProperties();
flowProps.setEndpoint(queue);

// Replay from 1 hour ago
final ReplayStartLocation startLocation =
    JCSMPFactory.onlyInstance().createReplayStartLocationDate(
        new Date(System.currentTimeMillis() - 3600000)
    );
flowProps.setStartLocation(startLocation);

// Filter only high-priority orders
flowProps.setSelector("priority = 'HIGH' AND amount > 1000");

final FlowReceiver flowReceiver = session.createFlow(
    new XMLMessageListener() {
        @Override
        public void onReceive(BytesXMLMessage msg) {
            // Only receives filtered messages
            processHighPriorityOrder(msg);
        }
    },
    flowProps
);`
        }
      ]
    }
  ]

  // Navigation handlers
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

  // Breadcrumb configuration
  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'Messaging', icon: '📨', page: 'Messaging' },
      { name: 'Solace PubSub+', icon: '🔥', page: 'Solace' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index, item) => {
    if (index === 0) {
      onBack()
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)
    }
  }

  // Keyboard navigation
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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #7c2d12 50%, #0f172a 100%)',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header with title and back button */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #be123c, #e11d48)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0
        }}>
          Solace PubSub+
        </h1>
        <button
          style={{
            padding: '0.75rem 1.5rem',
            background: 'rgba(190, 18, 60, 0.2)',
            border: '1px solid rgba(190, 18, 60, 0.3)',
            borderRadius: '0.5rem',
            color: '#fb7185',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'all 0.2s'
          }}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(190, 18, 60, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(190, 18, 60, 0.2)'
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
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={SOLACE_COLORS}
        />
      </div>

      {/* Collapsible Sidebar for quick concept navigation */}
      <CollapsibleSidebar
        items={concepts}
        selectedIndex={selectedConceptIndex ?? -1}
        onSelect={(index) => {
          setSelectedConceptIndex(index)
          setSelectedDetailIndex(0)
        }}
        title="Concepts"
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.icon}
        primaryColor={SOLACE_COLORS.primary}
      />


      {/* Description */}
      <p style={{
        maxWidth: '1400px',
        margin: '0 auto 2rem',
        fontSize: '1.1rem',
        color: '#94a3b8',
        lineHeight: '1.6',
        textAlign: 'center'
      }}>
        Advanced event broker platform combining messaging, streaming, and event management with enterprise-grade reliability.
        Features message VPNs for multi-tenancy, replay for time-travel debugging, and Event Portal for event governance.
      </p>

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
              width: '95vw', maxWidth: '1400px', height: '90vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu || onBack}
              colors={SOLACE_COLORS}
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

export default Solace

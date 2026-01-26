import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const TOPIC_COLORS = {
  primary: '#a78bfa',
  primaryHover: '#c4b5fd',
  bg: 'rgba(167, 139, 250, 0.1)',
  border: 'rgba(167, 139, 250, 0.3)',
  arrow: '#8b5cf6',
  hoverBg: 'rgba(167, 139, 250, 0.2)',
  topicBg: 'rgba(167, 139, 250, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

const PaymentProcessingDiagram = () => (
  <svg viewBox="0 0 800 220" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-payment" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#a78bfa" />
      </marker>
    </defs>

    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Payment Processing Flow
    </text>

    <rect x="30" y="60" width="100" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="80" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">User Portal</text>

    <rect x="170" y="60" width="100" height="50" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="220" y="90" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">API Gateway</text>

    <rect x="310" y="60" width="110" height="50" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="365" y="85" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Payment</text>
    <text x="365" y="97" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Service</text>

    <rect x="460" y="60" width="100" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="510" y="85" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Fraud</text>
    <text x="510" y="97" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Detection</text>

    <rect x="600" y="60" width="100" height="50" rx="8" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="650" y="85" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Stripe</text>
    <text x="650" y="97" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Gateway</text>

    <rect x="310" y="150" width="110" height="50" rx="8" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="365" y="175" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Event Store</text>
    <text x="365" y="187" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">(Immutable)</text>

    <rect x="460" y="150" width="100" height="50" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="510" y="175" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Kafka</text>
    <text x="510" y="187" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Event Bus</text>

    <line x1="130" y1="85" x2="165" y2="85" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowhead-payment)"/>
    <line x1="270" y1="85" x2="305" y2="85" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowhead-payment)"/>
    <line x1="420" y1="85" x2="455" y2="85" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowhead-payment)"/>
    <line x1="560" y1="85" x2="595" y2="85" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowhead-payment)"/>
    <line x1="365" y1="110" x2="365" y2="145" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowhead-payment)"/>
    <line x1="420" y1="175" x2="455" y2="175" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowhead-payment)"/>

    <text x="345" y="53" fill="#94a3b8" fontSize="8">validate</text>
    <text x="485" y="53" fill="#94a3b8" fontSize="8">score</text>
    <text x="625" y="53" fill="#94a3b8" fontSize="8">charge</text>
  </svg>
)

const SecurityDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-sec" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Security & Fraud Detection Pipeline
    </text>

    <rect x="50" y="70" width="120" height="60" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="110" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">WAF</text>
    <text x="110" y="110" textAnchor="middle" fill="white" fontSize="8">Rate Limit</text>

    <rect x="220" y="70" width="120" height="60" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="280" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Auth Service</text>
    <text x="280" y="110" textAnchor="middle" fill="white" fontSize="8">JWT + OAuth</text>

    <rect x="390" y="70" width="140" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="460" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Fraud Detection</text>
    <text x="460" y="110" textAnchor="middle" fill="white" fontSize="8">ML Models &lt;100ms</text>

    <rect x="580" y="70" width="120" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="640" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">PCI Vault</text>
    <text x="640" y="110" textAnchor="middle" fill="white" fontSize="8">Tokenization</text>

    <line x1="170" y1="100" x2="215" y2="100" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowhead-sec)"/>
    <line x1="340" y1="100" x2="385" y2="100" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowhead-sec)"/>
    <line x1="530" y1="100" x2="575" y2="100" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowhead-sec)"/>

    <rect x="250" y="155" width="300" height="30" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1"/>
    <text x="400" y="175" textAnchor="middle" fill="#4ade80" fontSize="10">All traffic encrypted TLS 1.3 + at-rest encryption</text>
  </svg>
)

const CQRSDiagram = () => (
  <svg viewBox="0 0 800 280" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-cqrs" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#a78bfa" />
      </marker>
    </defs>

    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      CQRS Architecture with Event Sourcing
    </text>

    {/* Write Side */}
    <rect x="30" y="50" width="300" height="100" rx="8" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="2"/>
    <text x="180" y="70" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">WRITE MODEL (Commands)</text>

    <rect x="50" y="85" width="80" height="50" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="1"/>
    <text x="90" y="110" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Command</text>
    <text x="90" y="122" textAnchor="middle" fill="white" fontSize="8">Handler</text>

    <rect x="150" y="85" width="80" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1"/>
    <text x="190" y="110" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">MongoDB</text>
    <text x="190" y="122" textAnchor="middle" fill="white" fontSize="8">Sharded</text>

    <rect x="240" y="85" width="80" height="50" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="1"/>
    <text x="280" y="110" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Event</text>
    <text x="280" y="122" textAnchor="middle" fill="white" fontSize="8">Store</text>

    {/* Read Side */}
    <rect x="470" y="50" width="300" height="100" rx="8" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="620" y="70" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">READ MODEL (Queries)</text>

    <rect x="490" y="85" width="80" height="50" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="1"/>
    <text x="530" y="110" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Redis</text>
    <text x="530" y="122" textAnchor="middle" fill="white" fontSize="8">Cache</text>

    <rect x="580" y="85" width="80" height="50" rx="6" fill="#06b6d4" stroke="#22d3ee" strokeWidth="1"/>
    <text x="620" y="110" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Postgres</text>
    <text x="620" y="122" textAnchor="middle" fill="white" fontSize="8">Replicas</text>

    <rect x="670" y="85" width="90" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="1"/>
    <text x="715" y="110" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Elasticsearch</text>
    <text x="715" y="122" textAnchor="middle" fill="white" fontSize="8">Search</text>

    {/* Event Bus */}
    <rect x="330" y="170" width="140" height="50" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="400" y="195" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Apache Kafka</text>
    <text x="400" y="210" textAnchor="middle" fill="white" fontSize="8">Event Bus</text>

    {/* Arrows */}
    <line x1="280" y1="135" x2="280" y2="155" stroke="#a78bfa" strokeWidth="2"/>
    <line x1="280" y1="155" x2="325" y2="195" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowhead-cqrs)"/>
    <line x1="470" y1="195" x2="530" y2="155" stroke="#a78bfa" strokeWidth="2"/>
    <line x1="530" y1="155" x2="530" y2="140" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowhead-cqrs)"/>

    <text x="400" y="260" textAnchor="middle" fill="#94a3b8" fontSize="10">Eventual Consistency: 5-15 min lag from write to read stores</text>
  </svg>
)

const UserManagementDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-user" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
      </marker>
    </defs>

    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      User Account Management Services
    </text>

    <rect x="300" y="50" width="200" height="50" rx="8" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="400" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Account Service (Saga Orchestrator)</text>

    <rect x="80" y="130" width="120" height="50" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="140" y="155" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Card Application</text>
    <text x="140" y="167" textAnchor="middle" fill="white" fontSize="8">Service</text>

    <rect x="230" y="130" width="120" height="50" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="290" y="155" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Balance</text>
    <text x="290" y="167" textAnchor="middle" fill="white" fontSize="8">Tracker</text>

    <rect x="380" y="130" width="120" height="50" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="440" y="155" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Credit Limit</text>
    <text x="440" y="167" textAnchor="middle" fill="white" fontSize="8">Manager</text>

    <rect x="530" y="130" width="120" height="50" rx="6" fill="#ec4899" stroke="#f472b6" strokeWidth="2"/>
    <text x="590" y="155" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Rewards</text>
    <text x="590" y="167" textAnchor="middle" fill="white" fontSize="8">Engine</text>

    <line x1="320" y1="100" x2="160" y2="125" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-user)"/>
    <line x1="370" y1="100" x2="300" y2="125" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-user)"/>
    <line x1="430" y1="100" x2="440" y2="125" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-user)"/>
    <line x1="480" y1="100" x2="580" y2="125" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead-user)"/>
  </svg>
)

const DataInfrastructureDiagram = () => (
  <svg viewBox="0 0 800 260" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-data" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Multi-Database Architecture
    </text>

    {/* Write DBs */}
    <text x="150" y="50" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">Write-Optimized</text>
    <rect x="50" y="60" width="100" height="45" rx="6" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="100" y="82" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">MongoDB</text>
    <text x="100" y="95" textAnchor="middle" fill="white" fontSize="8">5 Shards</text>

    <rect x="160" y="60" width="100" height="45" rx="6" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="210" y="82" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">PostgreSQL</text>
    <text x="210" y="95" textAnchor="middle" fill="white" fontSize="8">ACID</text>

    {/* Read DBs */}
    <text x="500" y="50" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">Read-Optimized</text>
    <rect x="380" y="60" width="80" height="45" rx="6" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2"/>
    <text x="420" y="82" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Redis</text>
    <text x="420" y="95" textAnchor="middle" fill="white" fontSize="8">&lt;1ms</text>

    <rect x="470" y="60" width="80" height="45" rx="6" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="510" y="82" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">ES</text>
    <text x="510" y="95" textAnchor="middle" fill="white" fontSize="8">Search</text>

    <rect x="560" y="60" width="80" height="45" rx="6" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="600" y="82" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">InfluxDB</text>
    <text x="600" y="95" textAnchor="middle" fill="white" fontSize="8">Stats</text>

    <rect x="650" y="60" width="90" height="45" rx="6" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="695" y="82" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Snowflake</text>
    <text x="695" y="95" textAnchor="middle" fill="white" fontSize="8">Warehouse</text>

    {/* Event Bus */}
    <rect x="300" y="130" width="200" height="40" rx="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
    <text x="400" y="155" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Apache Kafka (Event Bus)</text>

    {/* Data Pipeline */}
    <rect x="200" y="195" width="400" height="45" rx="8" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="400" y="215" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Data Pipeline (Kafka Streams / Flink)</text>
    <text x="400" y="230" textAnchor="middle" fill="#94a3b8" fontSize="9">ETL, Aggregations, Real-time Processing</text>

    {/* Arrows */}
    <line x1="210" y1="105" x2="300" y2="130" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead-data)"/>
    <line x1="500" y1="130" x2="510" y2="110" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead-data)"/>
    <line x1="400" y1="170" x2="400" y2="190" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead-data)"/>
  </svg>
)

const ObservabilityDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowhead-obs" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ec4899" />
      </marker>
    </defs>

    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
      Observability Stack
    </text>

    <rect x="50" y="70" width="150" height="60" rx="8" fill="#8b5cf6" stroke="#a78bfa" strokeWidth="2"/>
    <text x="125" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Prometheus</text>
    <text x="125" y="110" textAnchor="middle" fill="white" fontSize="9">Metrics Collection</text>

    <rect x="230" y="70" width="150" height="60" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="2"/>
    <text x="305" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ELK Stack</text>
    <text x="305" y="110" textAnchor="middle" fill="white" fontSize="9">Centralized Logging</text>

    <rect x="410" y="70" width="150" height="60" rx="8" fill="#06b6d4" stroke="#22d3ee" strokeWidth="2"/>
    <text x="485" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Jaeger</text>
    <text x="485" y="110" textAnchor="middle" fill="white" fontSize="9">Distributed Tracing</text>

    <rect x="590" y="70" width="150" height="60" rx="8" fill="#ef4444" stroke="#f87171" strokeWidth="2"/>
    <text x="665" y="95" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">PagerDuty</text>
    <text x="665" y="110" textAnchor="middle" fill="white" fontSize="9">Alerting</text>

    <rect x="230" y="155" width="340" height="30" rx="4" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="1"/>
    <text x="400" y="175" textAnchor="middle" fill="#f472b6" fontSize="10">Grafana Dashboards - Unified Visualization</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function CreditCardPortal({ onBack, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'payment-processing',
      name: 'Payment Processing',
      icon: '💳',
      color: '#22c55e',
      description: 'End-to-end payment flow with idempotency, fraud scoring, and payment gateway integration. Handles 30M transactions/day with sub-100ms latency.',
      diagram: PaymentProcessingDiagram,
      details: [
        {
          name: 'Transaction Flow',
          diagram: PaymentProcessingDiagram,
          explanation: 'The payment flow follows a strict pipeline: User initiates payment from portal, API Gateway validates and routes to Payment Service. The service generates an idempotency key to prevent double-charging, then parallel-processes fraud detection while preparing the charge. On approval, the payment is sent to Stripe with circuit breaker protection. Events are stored immutably and published to Kafka for downstream processing. The entire flow completes in under 100ms for approved transactions.',
          codeExample: `@Service
public class PaymentProcessingService {

    private final FraudDetectionService fraudService;
    private final PaymentGateway stripeGateway;
    private final EventStore eventStore;
    private final KafkaTemplate<String, PaymentEvent> kafka;

    @Transactional
    public PaymentResult processPayment(PaymentRequest request) {
        // Generate idempotency key to prevent double-charging
        String idempotencyKey = generateIdempotencyKey(request);

        // Check for existing payment with same key
        Optional<Payment> existing = paymentRepo.findByIdempotencyKey(idempotencyKey);
        if (existing.isPresent()) {
            return PaymentResult.alreadyProcessed(existing.get());
        }

        // Parallel fraud scoring (async)
        CompletableFuture<FraudScore> fraudFuture =
            CompletableFuture.supplyAsync(() -> fraudService.score(request));

        // Prepare payment while fraud check runs
        Payment payment = Payment.builder()
            .userId(request.getUserId())
            .amount(request.getAmount())
            .idempotencyKey(idempotencyKey)
            .status(PaymentStatus.PENDING)
            .build();

        // Wait for fraud score
        FraudScore score = fraudFuture.join();
        if (score.isHighRisk()) {
            payment.setStatus(PaymentStatus.BLOCKED);
            eventStore.append(new FraudAlertEvent(payment, score));
            kafka.send("fraud-alerts", new FraudAlertEvent(payment, score));
            return PaymentResult.blocked(score.getReason());
        }

        // Process with payment gateway (circuit breaker protected)
        try {
            GatewayResponse response = stripeGateway.charge(request);
            payment.setStatus(PaymentStatus.COMPLETED);
            payment.setGatewayTransactionId(response.getTransactionId());
        } catch (GatewayException e) {
            payment.setStatus(PaymentStatus.FAILED);
            payment.setErrorMessage(e.getMessage());
        }

        // Store event and publish
        paymentRepo.save(payment);
        eventStore.append(new PaymentProcessedEvent(payment));
        kafka.send("payments", new PaymentProcessedEvent(payment));

        return PaymentResult.success(payment);
    }

    private String generateIdempotencyKey(PaymentRequest request) {
        return DigestUtils.sha256Hex(
            request.getUserId() + ":" +
            request.getAmount() + ":" +
            request.getCardId() + ":" +
            request.getTimestamp().truncatedTo(ChronoUnit.MINUTES)
        );
    }
}`
        },
        {
          name: 'Idempotency Pattern',
          explanation: 'Idempotency ensures that duplicate payment requests (due to network retries, user double-clicks, etc.) result in only one charge. We generate a unique key from request properties and check for existing payments before processing. This is critical for financial systems where duplicate charges cause customer disputes and chargebacks. The idempotency key combines user ID, amount, card, and time window to allow legitimate repeated payments while blocking true duplicates.',
          codeExample: `@Component
public class IdempotencyService {

    private final RedisTemplate<String, String> redis;
    private static final Duration IDEMPOTENCY_TTL = Duration.ofHours(24);

    /**
     * Check if operation was already performed.
     * Returns previous result if exists, null if new operation.
     */
    public String checkIdempotency(String key) {
        return redis.opsForValue().get("idempotency:" + key);
    }

    /**
     * Store result of idempotent operation.
     * TTL ensures cleanup while preventing duplicates in reasonable window.
     */
    public void storeResult(String key, String result) {
        redis.opsForValue().set(
            "idempotency:" + key,
            result,
            IDEMPOTENCY_TTL
        );
    }

    /**
     * Atomic check-and-set for distributed idempotency.
     * Returns true if this is the first request, false if duplicate.
     */
    public boolean tryAcquire(String key) {
        Boolean acquired = redis.opsForValue()
            .setIfAbsent("idempotency:" + key, "processing", IDEMPOTENCY_TTL);
        return Boolean.TRUE.equals(acquired);
    }
}

// Usage in payment service
public PaymentResult processPayment(PaymentRequest request) {
    String key = generateIdempotencyKey(request);

    // Check for existing result
    String existingResult = idempotencyService.checkIdempotency(key);
    if (existingResult != null) {
        return deserializeResult(existingResult);
    }

    // Try to acquire lock for processing
    if (!idempotencyService.tryAcquire(key)) {
        // Another request is processing - wait and check again
        Thread.sleep(100);
        return processPayment(request); // Retry
    }

    // Process and store result
    PaymentResult result = doProcessPayment(request);
    idempotencyService.storeResult(key, serializeResult(result));

    return result;
}`
        },
        {
          name: 'Circuit Breaker',
          explanation: 'The circuit breaker pattern protects against cascading failures when the payment gateway (Stripe) experiences issues. It monitors failure rates and trips open after threshold breaches, immediately rejecting requests rather than timing out. After a cool-down period, it allows test requests through. This prevents our service from being overwhelmed during gateway outages and provides fast feedback to users rather than hanging requests.',
          codeExample: `@Configuration
public class PaymentGatewayConfig {

    @Bean
    public CircuitBreaker paymentGatewayCircuitBreaker() {
        CircuitBreakerConfig config = CircuitBreakerConfig.custom()
            .failureRateThreshold(50)           // Open at 50% failure rate
            .slowCallRateThreshold(80)          // Open if 80% of calls are slow
            .slowCallDurationThreshold(Duration.ofMillis(500))
            .waitDurationInOpenState(Duration.ofSeconds(30))
            .permittedNumberOfCallsInHalfOpenState(10)
            .slidingWindowType(SlidingWindowType.COUNT_BASED)
            .slidingWindowSize(100)
            .build();

        return CircuitBreakerRegistry.of(config)
            .circuitBreaker("payment-gateway");
    }
}

@Service
public class StripePaymentGateway implements PaymentGateway {

    private final CircuitBreaker circuitBreaker;
    private final StripeClient stripeClient;

    @Override
    public GatewayResponse charge(PaymentRequest request) {
        return circuitBreaker.executeSupplier(() -> {
            try {
                PaymentIntent intent = stripeClient.paymentIntents().create(
                    PaymentIntentCreateParams.builder()
                        .setAmount(request.getAmountInCents())
                        .setCurrency("usd")
                        .setPaymentMethod(request.getPaymentMethodId())
                        .setConfirm(true)
                        .build()
                );

                return GatewayResponse.success(intent.getId());

            } catch (StripeException e) {
                if (isRetryable(e)) {
                    throw new GatewayException("Retryable error", e);
                }
                return GatewayResponse.declined(e.getMessage());
            }
        });
    }

    // Fallback when circuit is open
    @CircuitBreakerFallback
    public GatewayResponse fallback(PaymentRequest request, Throwable t) {
        // Queue for retry or return graceful failure
        paymentRetryQueue.enqueue(request);
        return GatewayResponse.queued("Payment queued for processing");
    }
}`
        }
      ]
    },
    {
      id: 'security-fraud',
      name: 'Security & Fraud Detection',
      icon: '🛡️',
      color: '#ef4444',
      description: 'Multi-layer security with WAF, auth services, ML-based fraud detection (<100ms inference), and PCI-compliant tokenization.',
      diagram: SecurityDiagram,
      details: [
        {
          name: 'ML Fraud Detection',
          diagram: SecurityDiagram,
          explanation: 'Real-time fraud detection uses ensemble ML models (XGBoost, neural networks) to score every transaction in under 100ms. Features include transaction velocity, device fingerprinting, geolocation anomalies, spending patterns, and merchant risk profiles. The system uses a two-stage approach: fast rule-based filtering, then ML scoring for borderline cases. High-risk transactions are blocked immediately while suspicious ones are flagged for manual review.',
          codeExample: `# fraud_detection_service.py
import numpy as np
from sklearn.ensemble import GradientBoostingClassifier
import xgboost as xgb
from tensorflow import keras

class FraudDetectionService:
    def __init__(self):
        self.rule_engine = RuleBasedFilter()
        self.xgb_model = xgb.Booster()
        self.xgb_model.load_model('models/fraud_xgb.model')
        self.nn_model = keras.models.load_model('models/fraud_nn.h5')

    async def score_transaction(self, transaction: Transaction) -> FraudScore:
        """Score transaction for fraud risk. Target: <100ms latency."""

        # Stage 1: Fast rule-based filtering (5ms)
        rule_result = self.rule_engine.evaluate(transaction)
        if rule_result.is_definitive:
            return FraudScore(
                score=rule_result.score,
                reason=rule_result.reason,
                model='rules'
            )

        # Stage 2: Feature extraction (10ms)
        features = await self.extract_features(transaction)

        # Stage 3: ML ensemble scoring (parallel, 50ms)
        xgb_score, nn_score = await asyncio.gather(
            self.score_xgboost(features),
            self.score_neural_net(features)
        )

        # Ensemble: weighted average
        final_score = 0.6 * xgb_score + 0.4 * nn_score

        return FraudScore(
            score=final_score,
            xgb_score=xgb_score,
            nn_score=nn_score,
            features=self.get_top_features(features),
            is_high_risk=final_score > 0.85,
            requires_review=0.5 < final_score < 0.85
        )

    async def extract_features(self, txn: Transaction) -> np.ndarray:
        """Extract features for ML models."""

        # User behavior features
        user_stats = await self.user_service.get_stats(txn.user_id)

        features = {
            # Transaction features
            'amount': txn.amount,
            'amount_zscore': (txn.amount - user_stats.avg_amount) / user_stats.std_amount,

            # Velocity features
            'txn_count_1h': user_stats.txn_count_last_hour,
            'txn_count_24h': user_stats.txn_count_last_day,
            'velocity_ratio': user_stats.txn_count_last_hour / max(user_stats.avg_hourly, 1),

            # Geolocation features
            'distance_from_last': self.geo_distance(txn.location, user_stats.last_location),
            'is_new_country': txn.country not in user_stats.known_countries,

            # Device features
            'is_known_device': txn.device_id in user_stats.known_devices,
            'device_risk_score': self.device_service.get_risk(txn.device_id),

            # Merchant features
            'merchant_risk': self.merchant_service.get_risk(txn.merchant_id),
            'is_high_risk_mcc': txn.mcc in HIGH_RISK_MCCS,

            # Time features
            'hour_of_day': txn.timestamp.hour,
            'is_unusual_hour': self.is_unusual_hour(txn.timestamp, user_stats),
        }

        return np.array(list(features.values())).reshape(1, -1)`
        },
        {
          name: 'PCI Compliance & Tokenization',
          explanation: 'PCI DSS compliance requires that credit card numbers never touch our application servers. We use tokenization: card data goes directly from user browser to our PCI-compliant vault (or Stripe), which returns a token. Our systems only ever see and store tokens, not actual card numbers. This dramatically reduces our PCI scope and security risk. The vault handles encryption at rest (AES-256) and in transit (TLS 1.3), with HSM-backed key management.',
          codeExample: `// Frontend: Direct card tokenization
class CardTokenizer {
    constructor(stripePublicKey) {
        this.stripe = Stripe(stripePublicKey);
        this.elements = this.stripe.elements();
    }

    async tokenizeCard(cardElement) {
        // Card data goes directly to Stripe, never touches our backend
        const { token, error } = await this.stripe.createToken(cardElement);

        if (error) {
            throw new TokenizationError(error.message);
        }

        // Only the token is sent to our backend
        return token.id;  // tok_1234567890
    }
}

// Backend: Only handles tokens, never raw card data
@Service
public class CardVaultService {

    private final StripeClient stripe;
    private final EncryptionService encryption;

    /**
     * Store tokenized card for user.
     * We only store the token reference, never the actual card.
     */
    public SavedCard saveCard(String userId, String stripeToken) {
        // Create payment method from token
        PaymentMethod pm = stripe.paymentMethods().create(
            PaymentMethodCreateParams.builder()
                .setType(PaymentMethodCreateParams.Type.CARD)
                .setCard(PaymentMethodCreateParams.Token.builder()
                    .setToken(stripeToken)
                    .build())
                .build()
        );

        // Store only reference data (last 4, brand, expiry)
        SavedCard card = SavedCard.builder()
            .userId(userId)
            .stripePaymentMethodId(pm.getId())  // pm_1234567890
            .last4(pm.getCard().getLast4())     // "4242"
            .brand(pm.getCard().getBrand())     // "visa"
            .expMonth(pm.getCard().getExpMonth())
            .expYear(pm.getCard().getExpYear())
            .fingerprint(encryption.hash(pm.getCard().getFingerprint()))
            .build();

        return cardRepository.save(card);
    }

    /**
     * Charge using saved card token.
     * Actual card number is never retrieved or transmitted.
     */
    public ChargeResult chargeCard(String savedCardId, long amountCents) {
        SavedCard card = cardRepository.findById(savedCardId)
            .orElseThrow(() -> new CardNotFoundException(savedCardId));

        // Charge using Stripe payment method ID
        PaymentIntent intent = stripe.paymentIntents().create(
            PaymentIntentCreateParams.builder()
                .setAmount(amountCents)
                .setCurrency("usd")
                .setPaymentMethod(card.getStripePaymentMethodId())
                .setConfirm(true)
                .build()
        );

        return ChargeResult.from(intent);
    }
}`
        },
        {
          name: 'Authentication & Rate Limiting',
          explanation: 'The API Gateway enforces authentication (JWT with short expiry + refresh tokens) and rate limiting before requests reach services. Rate limits are tiered: per-user (100 req/min), per-IP (1000 req/min), and global (10K req/sec). Suspicious patterns trigger additional checks or temporary blocks. OAuth 2.0 integration allows third-party apps with scoped permissions. All auth decisions are logged for security audit trails.',
          codeExample: `@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .addFilterBefore(rateLimitFilter(), UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(jwtAuthFilter(), UsernamePasswordAuthenticationFilter.class)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/payments/**").hasRole("PAYMENT_USER")
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtConverter()))
            )
            .build();
    }
}

@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private final RateLimiterService rateLimiter;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                     HttpServletResponse response,
                                     FilterChain chain) throws ServletException, IOException {

        String userId = extractUserId(request);
        String clientIp = extractClientIp(request);
        String endpoint = request.getRequestURI();

        // Check rate limits in order of specificity
        RateLimitResult userLimit = rateLimiter.check("user:" + userId, 100, Duration.ofMinutes(1));
        RateLimitResult ipLimit = rateLimiter.check("ip:" + clientIp, 1000, Duration.ofMinutes(1));
        RateLimitResult endpointLimit = rateLimiter.check("endpoint:" + endpoint, 10000, Duration.ofSeconds(1));

        if (!userLimit.isAllowed() || !ipLimit.isAllowed() || !endpointLimit.isAllowed()) {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setHeader("Retry-After", String.valueOf(getRetryAfter(userLimit, ipLimit, endpointLimit)));
            response.setHeader("X-RateLimit-Remaining", "0");

            // Log for security monitoring
            securityLogger.logRateLimitExceeded(userId, clientIp, endpoint);

            return;
        }

        // Add rate limit headers
        response.setHeader("X-RateLimit-Limit", String.valueOf(userLimit.getLimit()));
        response.setHeader("X-RateLimit-Remaining", String.valueOf(userLimit.getRemaining()));
        response.setHeader("X-RateLimit-Reset", String.valueOf(userLimit.getResetAt()));

        chain.doFilter(request, response);
    }
}`
        }
      ]
    },
    {
      id: 'cqrs-architecture',
      name: 'CQRS Architecture',
      icon: '🔄',
      color: '#8b5cf6',
      description: 'Command Query Responsibility Segregation with Event Sourcing. Separate write (MongoDB) and read (Elasticsearch, InfluxDB) paths for optimal performance.',
      diagram: CQRSDiagram,
      details: [
        {
          name: 'Write Model (Commands)',
          diagram: CQRSDiagram,
          explanation: 'The write model handles all state-changing operations through command handlers. Commands are validated, processed, and result in events being stored in the Event Store (immutable append-only log). Write databases (MongoDB sharded for throughput, PostgreSQL for ACID transactions) are optimized for fast writes. Every state change generates an event that is published to Kafka for downstream consumers. This separation allows write operations to be fast without query optimization concerns.',
          codeExample: `@Service
public class TransactionCommandHandler {

    private final MongoTemplate mongo;
    private final EventStore eventStore;
    private final KafkaTemplate<String, DomainEvent> kafka;

    @Transactional
    public CommandResult handle(PostTransactionCommand command) {
        // Validate command
        ValidationResult validation = validator.validate(command);
        if (!validation.isValid()) {
            return CommandResult.rejected(validation.getErrors());
        }

        // Create aggregate and apply command
        TransactionAggregate aggregate = TransactionAggregate.create(
            command.getTransactionId(),
            command.getUserId(),
            command.getAmount(),
            command.getMerchant()
        );

        // Store in write-optimized MongoDB (sharded by user_id)
        mongo.save(aggregate.toDocument(), "transactions");

        // Generate domain events
        List<DomainEvent> events = aggregate.getUncommittedEvents();

        // Append to immutable event store
        events.forEach(event -> {
            eventStore.append(
                aggregate.getId(),
                event,
                aggregate.getVersion()
            );
        });

        // Publish events for read model updates
        events.forEach(event -> {
            kafka.send("domain-events", aggregate.getId(), event);
        });

        aggregate.markEventsCommitted();

        return CommandResult.success(aggregate.getId());
    }
}

@Document(collection = "event_store")
public class StoredEvent {
    @Id
    private String id;
    private String aggregateId;
    private String eventType;
    private long version;
    private Instant timestamp;
    private String payload;  // JSON serialized event

    // Events are immutable - never updated, only appended
    // This provides complete audit trail and replay capability
}`
        },
        {
          name: 'Read Model (Queries)',
          diagram: CQRSDiagram,
          explanation: 'The read model is optimized for query patterns, not write consistency. It consumes events from Kafka and maintains denormalized views in specialized databases: Redis for hot data (<1ms), PostgreSQL replicas for consistent reads, Elasticsearch for full-text search, and InfluxDB for time-series analytics. This separation means queries never compete with writes and can be scaled independently. The trade-off is eventual consistency (5-15 min lag).',
          codeExample: `@Service
public class AccountQueryService {

    private final RedisTemplate<String, Account> redis;
    private final JdbcTemplate readReplica;
    private final ElasticsearchClient elasticsearch;

    private static final Duration CACHE_TTL = Duration.ofMinutes(5);

    /**
     * Get account balance with cache-aside pattern.
     * Latency: <1ms (cache hit) or <50ms (cache miss)
     */
    public AccountBalance getBalance(String userId) {
        // Try Redis cache first
        String cacheKey = "balance:" + userId;
        AccountBalance cached = redis.opsForValue().get(cacheKey);

        if (cached != null) {
            return cached;  // Cache hit: <1ms
        }

        // Cache miss: query read replica
        AccountBalance balance = readReplica.queryForObject(
            "SELECT user_id, current_balance, available_credit, " +
            "credit_limit, last_updated FROM account_balances WHERE user_id = ?",
            new Object[]{userId},
            (rs, rowNum) -> AccountBalance.builder()
                .userId(rs.getString("user_id"))
                .currentBalance(rs.getBigDecimal("current_balance"))
                .availableCredit(rs.getBigDecimal("available_credit"))
                .creditLimit(rs.getBigDecimal("credit_limit"))
                .lastUpdated(rs.getTimestamp("last_updated").toInstant())
                .build()
        );

        // Populate cache
        redis.opsForValue().set(cacheKey, balance, CACHE_TTL);

        return balance;
    }

    /**
     * Search transactions with Elasticsearch.
     * Supports full-text search, filters, and faceted aggregations.
     */
    public TransactionSearchResult searchTransactions(TransactionSearchQuery query) {
        SearchRequest request = SearchRequest.of(s -> s
            .index("transactions")
            .query(q -> q
                .bool(b -> {
                    b.must(m -> m.term(t -> t.field("user_id").value(query.getUserId())));

                    if (query.getMerchantName() != null) {
                        b.must(m -> m.match(t -> t.field("merchant_name").query(query.getMerchantName())));
                    }
                    if (query.getDateRange() != null) {
                        b.filter(f -> f.range(r -> r
                            .field("timestamp")
                            .gte(JsonData.of(query.getDateRange().getStart()))
                            .lte(JsonData.of(query.getDateRange().getEnd()))
                        ));
                    }
                    return b;
                })
            )
            .aggregations("by_category", a -> a
                .terms(t -> t.field("category.keyword"))
            )
            .sort(so -> so.field(f -> f.field("timestamp").order(SortOrder.Desc)))
            .size(query.getPageSize())
            .from(query.getOffset())
        );

        return elasticsearch.search(request, Transaction.class);
    }
}`
        },
        {
          name: 'Event Sourcing',
          explanation: 'Event Sourcing stores all state changes as immutable events rather than current state. This provides: complete audit trail for compliance, ability to replay events to rebuild state (disaster recovery), time-travel debugging, and natural fit with CQRS. The Event Store uses append-only writes for performance. Events can be replayed to create new read models or fix bugs in projections. Snapshots are taken periodically to avoid replaying entire history.',
          codeExample: `@Service
public class EventStore {

    private final MongoTemplate mongo;
    private static final String EVENTS_COLLECTION = "event_store";

    /**
     * Append event to store. Events are immutable - never modified.
     * Uses optimistic locking via version to prevent conflicts.
     */
    public void append(String aggregateId, DomainEvent event, long expectedVersion) {
        StoredEvent storedEvent = StoredEvent.builder()
            .id(UUID.randomUUID().toString())
            .aggregateId(aggregateId)
            .eventType(event.getClass().getSimpleName())
            .version(expectedVersion + 1)
            .timestamp(Instant.now())
            .payload(objectMapper.writeValueAsString(event))
            .build();

        // Optimistic concurrency check
        Query query = Query.query(
            Criteria.where("aggregateId").is(aggregateId)
                .and("version").is(expectedVersion)
        );

        if (expectedVersion > 0 && mongo.count(query, EVENTS_COLLECTION) == 0) {
            throw new ConcurrencyException(
                "Aggregate " + aggregateId + " version mismatch"
            );
        }

        mongo.insert(storedEvent, EVENTS_COLLECTION);
    }

    /**
     * Load all events for an aggregate to rebuild state.
     */
    public List<DomainEvent> loadEvents(String aggregateId) {
        return mongo.find(
            Query.query(Criteria.where("aggregateId").is(aggregateId))
                .with(Sort.by(Sort.Direction.ASC, "version")),
            StoredEvent.class,
            EVENTS_COLLECTION
        ).stream()
        .map(this::deserializeEvent)
        .collect(Collectors.toList());
    }

    /**
     * Load events from snapshot for efficiency.
     */
    public List<DomainEvent> loadEventsSince(String aggregateId, long sinceVersion) {
        return mongo.find(
            Query.query(
                Criteria.where("aggregateId").is(aggregateId)
                    .and("version").gt(sinceVersion)
            ).with(Sort.by(Sort.Direction.ASC, "version")),
            StoredEvent.class,
            EVENTS_COLLECTION
        ).stream()
        .map(this::deserializeEvent)
        .collect(Collectors.toList());
    }

    /**
     * Replay events to rebuild read model (for migrations/fixes).
     */
    public void replayAllEvents(Consumer<DomainEvent> eventHandler) {
        try (MongoCursor<StoredEvent> cursor = mongo.getCollection(EVENTS_COLLECTION)
                .find()
                .sort(Sorts.ascending("timestamp"))
                .iterator()) {

            while (cursor.hasNext()) {
                StoredEvent stored = cursor.next();
                DomainEvent event = deserializeEvent(stored);
                eventHandler.accept(event);
            }
        }
    }
}`
        },
        {
          name: 'Eventual Consistency',
          explanation: 'CQRS trades strong consistency for performance: read models lag write models by 5-15 minutes. This is acceptable because: users rarely read immediately after writing, the UI can show optimistic updates, and critical paths (balance checks) use synchronous reads. The system uses event timestamps for ordering guarantees and implements read-your-writes consistency for the originating user session via Redis cache warming.',
          codeExample: `@Component
public class ConsistencyManager {

    private final RedisTemplate<String, String> redis;

    /**
     * Read-your-writes consistency for user session.
     * When user writes, we immediately update their cache
     * so subsequent reads see their own changes.
     */
    public void ensureReadYourWrites(String userId, DomainEvent event) {
        if (event instanceof BalanceChangedEvent) {
            BalanceChangedEvent balanceEvent = (BalanceChangedEvent) event;

            // Immediately update user's cache
            String cacheKey = "balance:" + userId;
            redis.opsForValue().set(
                cacheKey,
                serializeBalance(balanceEvent.getNewBalance()),
                Duration.ofMinutes(5)
            );

            // Mark session as having pending updates
            redis.opsForSet().add(
                "pending_sync:" + userId,
                event.getEventId()
            );
        }
    }

    /**
     * Check if read model has caught up to user's writes.
     * Used to show "data may be out of date" warning.
     */
    public boolean isConsistent(String userId) {
        Set<String> pendingEvents = redis.opsForSet().members("pending_sync:" + userId);
        return pendingEvents == null || pendingEvents.isEmpty();
    }

    /**
     * Mark event as synced when read model catches up.
     * Called by event consumers after updating read model.
     */
    public void markSynced(String userId, String eventId) {
        redis.opsForSet().remove("pending_sync:" + userId, eventId);
    }
}

@KafkaListener(topics = "domain-events")
public class ReadModelUpdater {

    private final ConsistencyManager consistencyManager;
    private final AccountProjection accountProjection;

    @KafkaHandler
    public void handleBalanceChanged(BalanceChangedEvent event) {
        // Update read model (PostgreSQL replica, Elasticsearch)
        accountProjection.applyBalanceChange(event);

        // Mark as synced for user
        consistencyManager.markSynced(event.getUserId(), event.getEventId());

        log.info("Read model updated for user {} - lag: {}ms",
            event.getUserId(),
            System.currentTimeMillis() - event.getTimestamp().toEpochMilli()
        );
    }
}`
        }
      ]
    },
    {
      id: 'user-management',
      name: 'User Account Management',
      icon: '👤',
      color: '#3b82f6',
      description: 'Account lifecycle management with Saga orchestration for distributed operations across card applications, balance tracking, and rewards.',
      diagram: UserManagementDiagram,
      details: [
        {
          name: 'Saga Pattern',
          diagram: UserManagementDiagram,
          explanation: 'The Saga pattern manages distributed transactions across multiple services without two-phase commit. For credit card applications, the saga orchestrator coordinates: 1) Fraud check, 2) Credit bureau query, 3) Account creation, 4) Card provisioning. Each step has a compensating action for rollback. If credit bureau fails, we compensate by canceling the fraud check result. This provides eventual consistency with clear failure handling.',
          codeExample: `@Service
public class CardApplicationSaga {

    private final FraudService fraudService;
    private final CreditBureauService creditBureau;
    private final AccountService accountService;
    private final CardProvisioningService cardProvisioning;

    @Transactional
    public SagaResult processApplication(CardApplication application) {
        SagaContext context = new SagaContext(application.getId());

        try {
            // Step 1: Fraud check
            FraudCheckResult fraudResult = fraudService.checkApplicant(application);
            context.addCompensation(() -> fraudService.cancelCheck(application.getId()));

            if (fraudResult.isHighRisk()) {
                return SagaResult.rejected("Failed fraud check");
            }

            // Step 2: Credit bureau query (with circuit breaker)
            CreditReport creditReport = creditBureau.pullReport(application);
            context.addCompensation(() -> creditBureau.deleteSoftInquiry(application.getId()));

            if (creditReport.getScore() < MINIMUM_CREDIT_SCORE) {
                context.compensate();  // Roll back fraud check
                return SagaResult.rejected("Credit score below threshold");
            }

            // Step 3: Create account
            Account account = accountService.createAccount(application, creditReport);
            context.addCompensation(() -> accountService.deleteAccount(account.getId()));

            // Step 4: Provision card
            Card card = cardProvisioning.provisionCard(account);
            context.addCompensation(() -> cardProvisioning.cancelCard(card.getId()));

            // All steps succeeded - publish event
            eventPublisher.publish(new CardApplicationApprovedEvent(
                application.getId(),
                account.getId(),
                card.getId()
            ));

            return SagaResult.success(card);

        } catch (Exception e) {
            log.error("Saga failed for application {}", application.getId(), e);
            context.compensate();  // Execute all compensating actions in reverse
            return SagaResult.failed(e.getMessage());
        }
    }
}

public class SagaContext {
    private final String sagaId;
    private final Deque<Runnable> compensations = new ArrayDeque<>();

    public void addCompensation(Runnable compensation) {
        compensations.push(compensation);  // Add to front for reverse execution
    }

    public void compensate() {
        while (!compensations.isEmpty()) {
            try {
                compensations.pop().run();
            } catch (Exception e) {
                log.error("Compensation failed in saga {}", sagaId, e);
                // Log and continue - compensations should be idempotent
            }
        }
    }
}`
        },
        {
          name: 'Balance Management',
          explanation: 'Balance tracking requires strong consistency for correctness while remaining performant. We use optimistic locking with version numbers to prevent lost updates. Critical balance operations (payments, transactions) use PostgreSQL for ACID guarantees. Read-heavy operations use cached balances from Redis. The system handles concurrent updates through compare-and-swap operations and automatic retry on conflicts.',
          codeExample: `@Service
public class BalanceService {

    private final AccountRepository accountRepo;
    private final RedisTemplate<String, AccountBalance> redis;

    /**
     * Update balance with optimistic locking.
     * Prevents lost updates in concurrent scenarios.
     */
    @Transactional
    @Retryable(value = OptimisticLockException.class, maxAttempts = 3)
    public BalanceUpdateResult updateBalance(String accountId, BigDecimal delta, String transactionId) {
        // Load account with version
        Account account = accountRepo.findByIdWithLock(accountId)
            .orElseThrow(() -> new AccountNotFoundException(accountId));

        // Validate update
        BigDecimal newBalance = account.getBalance().add(delta);
        BigDecimal newAvailable = account.getAvailableCredit().subtract(delta);

        if (newAvailable.compareTo(BigDecimal.ZERO) < 0) {
            throw new InsufficientCreditException(accountId, delta, account.getAvailableCredit());
        }

        // Apply update
        account.setBalance(newBalance);
        account.setAvailableCredit(newAvailable);
        account.setVersion(account.getVersion() + 1);  // Optimistic lock version
        account.setLastUpdated(Instant.now());

        // Save (will throw OptimisticLockException on version conflict)
        accountRepo.save(account);

        // Invalidate cache
        redis.delete("balance:" + accountId);

        // Publish event for read model update
        eventPublisher.publish(new BalanceChangedEvent(
            accountId,
            account.getBalance(),
            account.getAvailableCredit(),
            transactionId
        ));

        return BalanceUpdateResult.success(account);
    }

    /**
     * Atomic credit limit increase with validation.
     */
    @Transactional
    public void increaseCreditLimit(String accountId, BigDecimal newLimit, String approvalId) {
        Account account = accountRepo.findByIdWithLock(accountId)
            .orElseThrow(() -> new AccountNotFoundException(accountId));

        if (newLimit.compareTo(account.getCreditLimit()) <= 0) {
            throw new InvalidLimitException("New limit must be higher than current");
        }

        BigDecimal increase = newLimit.subtract(account.getCreditLimit());

        account.setCreditLimit(newLimit);
        account.setAvailableCredit(account.getAvailableCredit().add(increase));
        account.setVersion(account.getVersion() + 1);

        accountRepo.save(account);

        eventPublisher.publish(new CreditLimitIncreasedEvent(
            accountId, account.getCreditLimit(), newLimit, approvalId
        ));
    }
}`
        },
        {
          name: 'Rewards Engine',
          explanation: 'The rewards engine calculates and tracks points for every transaction based on configurable rules: base rates, category bonuses, promotional multipliers, and partner offers. Points are awarded asynchronously after transaction posts to avoid slowing payment flow. The engine supports complex rules like tiered earning, spending thresholds, and time-limited promotions. Points balances are eventually consistent with transactions.',
          codeExample: `@Service
public class RewardsEngine {

    private final RewardsRuleRepository ruleRepo;
    private final PointsLedgerRepository ledger;

    /**
     * Calculate and award points for a transaction.
     * Called asynchronously after transaction posts.
     */
    @Async
    @EventListener
    public void onTransactionPosted(TransactionPostedEvent event) {
        Transaction txn = event.getTransaction();
        Account account = accountService.getAccount(txn.getAccountId());

        // Load applicable rules
        List<RewardsRule> rules = ruleRepo.findActiveRules(
            account.getCardType(),
            txn.getMerchantCategory(),
            txn.getTimestamp()
        );

        // Calculate points
        PointsCalculation calculation = calculatePoints(txn, account, rules);

        // Award points
        PointsEntry entry = PointsEntry.builder()
            .accountId(account.getId())
            .transactionId(txn.getId())
            .basePoints(calculation.getBasePoints())
            .bonusPoints(calculation.getBonusPoints())
            .totalPoints(calculation.getTotalPoints())
            .rules(calculation.getAppliedRules())
            .timestamp(Instant.now())
            .build();

        ledger.save(entry);

        // Update cached balance
        updatePointsBalance(account.getId(), calculation.getTotalPoints());

        eventPublisher.publish(new PointsAwardedEvent(
            account.getId(),
            txn.getId(),
            calculation.getTotalPoints(),
            calculation.getAppliedRules()
        ));
    }

    private PointsCalculation calculatePoints(Transaction txn, Account account, List<RewardsRule> rules) {
        BigDecimal baseRate = BigDecimal.valueOf(0.01);  // 1 point per dollar default
        BigDecimal amount = txn.getAmount().abs();

        int basePoints = amount.multiply(baseRate).intValue();
        int bonusPoints = 0;
        List<String> appliedRules = new ArrayList<>();

        for (RewardsRule rule : rules) {
            if (rule.matches(txn, account)) {
                int bonus = rule.calculateBonus(amount, basePoints);
                bonusPoints += bonus;
                appliedRules.add(rule.getName() + ": +" + bonus);
            }
        }

        return PointsCalculation.builder()
            .basePoints(basePoints)
            .bonusPoints(bonusPoints)
            .totalPoints(basePoints + bonusPoints)
            .appliedRules(appliedRules)
            .build();
    }
}

// Example rewards rule
public class CategoryBonusRule implements RewardsRule {
    private final String categoryCode;
    private final BigDecimal multiplier;

    @Override
    public boolean matches(Transaction txn, Account account) {
        return txn.getMerchantCategory().equals(categoryCode);
    }

    @Override
    public int calculateBonus(BigDecimal amount, int basePoints) {
        return (int) (basePoints * (multiplier.doubleValue() - 1));
    }
}`
        }
      ]
    },
    {
      id: 'data-infrastructure',
      name: 'Data Infrastructure',
      icon: '🗄️',
      color: '#f59e0b',
      description: 'Multi-database architecture with MongoDB (writes), PostgreSQL (ACID), Redis (cache), Elasticsearch (search), InfluxDB (stats), and Snowflake (warehouse).',
      diagram: DataInfrastructureDiagram,
      details: [
        {
          name: 'Database Selection Strategy',
          diagram: DataInfrastructureDiagram,
          explanation: 'Each database is chosen for specific strengths: MongoDB sharded across 5 nodes handles high write throughput for transactions (6M writes/shard/day). PostgreSQL with read replicas provides ACID compliance for account balances. Redis Cluster (6 nodes) delivers sub-millisecond cache reads. Elasticsearch indexes billions of transactions for search. InfluxDB stores time-series metrics. Snowflake warehouses 2+ years of historical data for analytics.',
          codeExample: `@Configuration
public class DatabaseConfig {

    /**
     * MongoDB: Write-optimized for high transaction throughput
     * - Sharded by user_id for even distribution
     * - 5 shards handling 6M writes/shard/day
     * - Flexible schema for transaction metadata
     */
    @Bean
    public MongoClient mongoClient() {
        return MongoClients.create(
            MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(mongoUri))
                .applyToClusterSettings(builder ->
                    builder.mode(ClusterConnectionMode.MULTIPLE)  // Sharded
                )
                .writeConcern(WriteConcern.W1)  // Fast writes, let replication catch up
                .build()
        );
    }

    /**
     * PostgreSQL: ACID for account balances
     * - Primary for writes, 2 read replicas for queries
     * - Row-level locking for concurrent balance updates
     */
    @Bean
    @Primary
    public DataSource primaryDataSource() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(postgresWriteUrl);
        config.setMaximumPoolSize(50);
        config.setConnectionTimeout(5000);
        return new HikariDataSource(config);
    }

    @Bean
    @Qualifier("readReplica")
    public DataSource readReplicaDataSource() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(postgresReadUrl);
        config.setMaximumPoolSize(100);  // More connections for reads
        config.setReadOnly(true);
        return new HikariDataSource(config);
    }

    /**
     * Redis Cluster: Sub-millisecond cache
     * - 3 masters + 3 replicas for HA
     * - Used for session, balance cache, rate limiting
     */
    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        RedisClusterConfiguration config = new RedisClusterConfiguration(redisNodes);
        config.setMaxRedirects(3);

        LettuceClientConfiguration clientConfig = LettuceClientConfiguration.builder()
            .commandTimeout(Duration.ofMillis(100))
            .build();

        return new LettuceConnectionFactory(config, clientConfig);
    }

    /**
     * Elasticsearch: Full-text search and analytics
     * - 3-node cluster with sharding
     * - Indexes transactions with 5-min lag from write
     */
    @Bean
    public ElasticsearchClient elasticsearchClient() {
        RestClient restClient = RestClient.builder(
            new HttpHost("es-node-1", 9200),
            new HttpHost("es-node-2", 9200),
            new HttpHost("es-node-3", 9200)
        ).build();

        return new ElasticsearchClient(new RestClientTransport(restClient, new JacksonJsonpMapper()));
    }
}`
        },
        {
          name: 'Caching Strategy',
          explanation: 'We use cache-aside pattern with Redis for frequently accessed data. Hot data (active user balances, recent transactions) stays in cache with 5-minute TTL. Cache invalidation is event-driven: when balance changes, we delete the cached value rather than updating it, ensuring next read gets fresh data. Multi-tier caching uses local in-memory cache for ultra-hot data (rate limit counters) backed by distributed Redis.',
          codeExample: `@Service
public class CacheService {

    private final RedisTemplate<String, Object> redis;
    private final Cache<String, Object> localCache;  // Caffeine local cache

    private static final Duration DEFAULT_TTL = Duration.ofMinutes(5);
    private static final Duration LOCAL_TTL = Duration.ofSeconds(30);

    /**
     * Multi-tier cache read: local -> Redis -> database
     */
    public <T> T get(String key, Class<T> type, Supplier<T> loader) {
        // Tier 1: Local cache (ultra-fast, <1ms)
        T value = localCache.getIfPresent(key);
        if (value != null) {
            return value;
        }

        // Tier 2: Redis (fast, <5ms)
        value = (T) redis.opsForValue().get(key);
        if (value != null) {
            localCache.put(key, value);  // Warm local cache
            return value;
        }

        // Tier 3: Load from database
        value = loader.get();
        if (value != null) {
            // Populate both cache tiers
            redis.opsForValue().set(key, value, DEFAULT_TTL);
            localCache.put(key, value);
        }

        return value;
    }

    /**
     * Event-driven cache invalidation.
     * Delete on write - next read will populate fresh data.
     */
    @EventListener
    public void onBalanceChanged(BalanceChangedEvent event) {
        String key = "balance:" + event.getAccountId();

        // Delete from both tiers
        redis.delete(key);
        localCache.invalidate(key);

        // Optionally: warm cache immediately for active users
        if (isActiveUser(event.getAccountId())) {
            AccountBalance fresh = accountService.getBalanceFromDb(event.getAccountId());
            redis.opsForValue().set(key, fresh, DEFAULT_TTL);
        }
    }

    /**
     * Cache warming on startup and after deployments.
     */
    @PostConstruct
    public void warmCache() {
        List<String> activeUsers = analyticsService.getActiveUsers(Duration.ofHours(24));

        activeUsers.parallelStream().forEach(userId -> {
            AccountBalance balance = accountService.getBalanceFromDb(userId);
            redis.opsForValue().set("balance:" + userId, balance, DEFAULT_TTL);
        });

        log.info("Warmed cache for {} active users", activeUsers.size());
    }
}`
        },
        {
          name: 'Analytics Pipeline',
          explanation: 'The analytics pipeline uses Kafka Streams for real-time processing and batch jobs for historical analysis. Real-time: transaction events are aggregated into InfluxDB for live dashboards (spending by category, fraud trends). Batch: nightly ETL jobs load data into Snowflake for long-term storage and complex analytics. The pipeline handles out-of-order events and ensures exactly-once processing semantics.',
          codeExample: `@Configuration
public class AnalyticsPipeline {

    /**
     * Kafka Streams topology for real-time analytics
     */
    @Bean
    public StreamsBuilder streamsBuilder() {
        StreamsBuilder builder = new StreamsBuilder();

        // Input: transaction events
        KStream<String, TransactionEvent> transactions = builder.stream(
            "transaction-events",
            Consumed.with(Serdes.String(), transactionEventSerde)
        );

        // Aggregate: spending by category per user per hour
        transactions
            .groupBy((key, txn) -> txn.getUserId() + ":" + txn.getCategory())
            .windowedBy(TimeWindows.ofSizeWithNoGrace(Duration.ofHours(1)))
            .aggregate(
                SpendingAggregate::new,
                (key, txn, agg) -> agg.add(txn.getAmount()),
                Materialized.with(Serdes.String(), spendingAggregateSerde)
            )
            .toStream()
            .foreach((windowedKey, aggregate) ->
                influxClient.write(toInfluxPoint(windowedKey, aggregate))
            );

        // Aggregate: fraud score distribution (for monitoring)
        transactions
            .filter((key, txn) -> txn.getFraudScore() != null)
            .groupBy((key, txn) -> "fraud_scores")
            .windowedBy(TimeWindows.ofSizeWithNoGrace(Duration.ofMinutes(5)))
            .aggregate(
                FraudScoreHistogram::new,
                (key, txn, histogram) -> histogram.add(txn.getFraudScore()),
                Materialized.with(Serdes.String(), histogramSerde)
            )
            .toStream()
            .foreach((key, histogram) -> metricsPublisher.publishHistogram(histogram));

        return builder;
    }
}

/**
 * Batch job: ETL to Snowflake
 */
@Component
public class SnowflakeETLJob {

    @Scheduled(cron = "0 0 2 * * *")  // 2 AM daily
    public void runDailyETL() {
        LocalDate yesterday = LocalDate.now().minusDays(1);

        // Extract from MongoDB
        List<Transaction> transactions = mongoTemplate.find(
            Query.query(Criteria.where("date").is(yesterday)),
            Transaction.class
        );

        // Transform: denormalize with user and merchant data
        List<DenormalizedTransaction> transformed = transactions.stream()
            .map(this::denormalize)
            .collect(Collectors.toList());

        // Load to Snowflake
        snowflakeJdbc.batchInsert(
            "INSERT INTO transactions_fact VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            transformed,
            (ps, txn) -> {
                ps.setString(1, txn.getTransactionId());
                ps.setString(2, txn.getUserId());
                ps.setBigDecimal(3, txn.getAmount());
                // ... more columns
            }
        );

        log.info("ETL completed: {} transactions loaded for {}", transformed.size(), yesterday);
    }
}`
        }
      ]
    },
    {
      id: 'observability',
      name: 'Observability & Monitoring',
      icon: '📊',
      color: '#ec4899',
      description: 'Comprehensive observability with Prometheus metrics, ELK logging, Jaeger distributed tracing, and PagerDuty alerting for 99.9% uptime.',
      diagram: ObservabilityDiagram,
      details: [
        {
          name: 'Distributed Tracing',
          diagram: ObservabilityDiagram,
          explanation: 'Jaeger traces requests across all microservices, showing the complete journey of a transaction from API Gateway through services to databases. Each service propagates trace context (trace ID, span ID) in headers. Traces capture timing, errors, and metadata. This enables: identifying slow services, debugging production issues, and understanding system behavior. Sampling reduces overhead while maintaining visibility.',
          codeExample: `@Configuration
public class TracingConfig {

    @Bean
    public Tracer jaegerTracer() {
        Configuration.SamplerConfiguration samplerConfig =
            Configuration.SamplerConfiguration.fromEnv()
                .withType(ConstSampler.TYPE)
                .withParam(1);  // Sample 100% in dev, reduce in prod

        Configuration.ReporterConfiguration reporterConfig =
            Configuration.ReporterConfiguration.fromEnv()
                .withLogSpans(true)
                .withSender(
                    Configuration.SenderConfiguration.fromEnv()
                        .withAgentHost("jaeger-agent")
                        .withAgentPort(6831)
                );

        return new Configuration("credit-card-service")
            .withSampler(samplerConfig)
            .withReporter(reporterConfig)
            .getTracer();
    }
}

@Aspect
@Component
public class TracingAspect {

    private final Tracer tracer;

    /**
     * Automatically trace all service methods
     */
    @Around("@within(org.springframework.stereotype.Service)")
    public Object traceServiceMethod(ProceedingJoinPoint pjp) throws Throwable {
        String operationName = pjp.getSignature().toShortString();

        Span span = tracer.buildSpan(operationName)
            .withTag("class", pjp.getTarget().getClass().getSimpleName())
            .withTag("method", pjp.getSignature().getName())
            .start();

        try (Scope scope = tracer.activateSpan(span)) {
            // Add parameters as tags (excluding sensitive data)
            Object[] args = pjp.getArgs();
            for (int i = 0; i < args.length; i++) {
                if (!isSensitive(args[i])) {
                    span.setTag("arg." + i, String.valueOf(args[i]));
                }
            }

            Object result = pjp.proceed();
            span.setTag("result.type", result != null ? result.getClass().getSimpleName() : "null");
            return result;

        } catch (Exception e) {
            span.setTag(Tags.ERROR, true);
            span.log(Map.of(
                "event", "error",
                "error.kind", e.getClass().getName(),
                "message", e.getMessage()
            ));
            throw e;
        } finally {
            span.finish();
        }
    }
}

/**
 * Trace context propagation for async operations
 */
@Component
public class TracedKafkaProducer {

    private final KafkaTemplate<String, Object> kafka;
    private final Tracer tracer;

    public void send(String topic, String key, Object value) {
        Span span = tracer.activeSpan();

        ProducerRecord<String, Object> record = new ProducerRecord<>(topic, key, value);

        // Inject trace context into Kafka headers
        tracer.inject(span.context(), Format.Builtin.TEXT_MAP,
            new KafkaHeadersCarrier(record.headers()));

        kafka.send(record);
    }
}`
        },
        {
          name: 'Metrics & Alerting',
          explanation: 'Prometheus scrapes metrics from all services every 15 seconds. Key metrics include: request latency (p50, p95, p99), error rates, queue depths, database connection pool usage, and business metrics (transactions/second, fraud detection rate). Alertmanager routes alerts to PagerDuty based on severity. Grafana dashboards visualize real-time system health and historical trends.',
          codeExample: `@Configuration
public class MetricsConfig {

    @Bean
    public MeterRegistry meterRegistry() {
        return new PrometheusMeterRegistry(PrometheusConfig.DEFAULT);
    }
}

@Component
public class PaymentMetrics {

    private final Counter paymentCounter;
    private final Counter paymentErrorCounter;
    private final Timer paymentLatency;
    private final Gauge activePayments;
    private final DistributionSummary paymentAmount;

    public PaymentMetrics(MeterRegistry registry) {
        this.paymentCounter = Counter.builder("payments_total")
            .description("Total number of payments processed")
            .tags("service", "payment")
            .register(registry);

        this.paymentErrorCounter = Counter.builder("payments_errors_total")
            .description("Total payment errors")
            .tags("service", "payment")
            .register(registry);

        this.paymentLatency = Timer.builder("payment_latency_seconds")
            .description("Payment processing latency")
            .publishPercentiles(0.5, 0.95, 0.99)
            .register(registry);

        this.activePayments = Gauge.builder("payments_active",
                activePaymentTracker, AtomicInteger::get)
            .description("Currently processing payments")
            .register(registry);

        this.paymentAmount = DistributionSummary.builder("payment_amount_dollars")
            .description("Payment amounts distribution")
            .publishPercentiles(0.5, 0.95, 0.99)
            .register(registry);
    }

    public void recordPayment(PaymentResult result, Duration duration) {
        paymentCounter.increment();
        paymentLatency.record(duration);
        paymentAmount.record(result.getAmount().doubleValue());

        if (result.isError()) {
            paymentErrorCounter.increment();
        }
    }
}

// Prometheus alerting rules (prometheus-rules.yml)
/*
groups:
  - name: payment-alerts
    rules:
      - alert: HighPaymentErrorRate
        expr: |
          rate(payments_errors_total[5m]) / rate(payments_total[5m]) > 0.05
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Payment error rate above 5%"

      - alert: SlowPaymentLatency
        expr: |
          histogram_quantile(0.95, rate(payment_latency_seconds_bucket[5m])) > 0.5
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Payment p95 latency above 500ms"

      - alert: FraudRateSpike
        expr: |
          rate(fraud_detected_total[10m]) > rate(fraud_detected_total[1h] offset 1d) * 2
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Fraud detection rate 2x higher than yesterday"
*/`
        },
        {
          name: 'Centralized Logging',
          explanation: 'All services emit structured JSON logs to the ELK stack (Elasticsearch, Logstash, Kibana). Logs include trace IDs for correlation with Jaeger traces. Sensitive data (card numbers, passwords) is masked before logging. Log levels are dynamically configurable. Compliance requires 7-year retention for audit trails. Kibana dashboards enable searching and visualizing logs across all services.',
          codeExample: `@Configuration
public class LoggingConfig {

    /**
     * Structured JSON logging with MDC context
     */
    @Bean
    public Encoder<ILoggingEvent> jsonEncoder() {
        LogstashEncoder encoder = new LogstashEncoder();
        encoder.setIncludeMdc(true);
        encoder.setIncludeContext(true);
        encoder.setIncludeCallerData(true);

        // Add custom fields
        encoder.addProvider(new CustomFieldsJsonProvider());

        return encoder;
    }
}

@Component
public class LoggingFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                     HttpServletResponse response,
                                     FilterChain chain) throws ServletException, IOException {

        // Extract trace context from Jaeger
        String traceId = request.getHeader("X-Trace-Id");
        if (traceId == null) {
            traceId = UUID.randomUUID().toString();
        }

        // Add to MDC for all log statements
        MDC.put("traceId", traceId);
        MDC.put("userId", extractUserId(request));
        MDC.put("requestPath", request.getRequestURI());
        MDC.put("clientIp", extractClientIp(request));

        try {
            chain.doFilter(request, response);
        } finally {
            MDC.clear();
        }
    }
}

/**
 * Sensitive data masking in logs
 */
@Component
public class SensitiveDataMasker implements FieldSerializer<String> {

    private static final Pattern CARD_PATTERN =
        Pattern.compile("\\\\b\\\\d{4}[- ]?\\\\d{4}[- ]?\\\\d{4}[- ]?\\\\d{4}\\\\b");

    @Override
    public void serializeValue(String value, JsonGenerator gen) throws IOException {
        if (value == null) {
            gen.writeNull();
            return;
        }

        // Mask card numbers
        String masked = CARD_PATTERN.matcher(value)
            .replaceAll(match -> "****-****-****-" + match.group().substring(match.group().length() - 4));

        gen.writeString(masked);
    }
}

// Example log output (JSON)
/*
{
  "@timestamp": "2024-01-15T10:30:45.123Z",
  "level": "INFO",
  "logger": "com.bank.PaymentService",
  "message": "Payment processed successfully",
  "traceId": "abc123def456",
  "spanId": "span789",
  "userId": "user_12345",
  "requestPath": "/api/payments",
  "paymentId": "pay_67890",
  "amount": 99.99,
  "duration_ms": 87,
  "service": "payment-service",
  "host": "payment-pod-abc123"
}
*/`
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
      { name: 'System Design', icon: '🏗️', page: 'System Design' },
      { name: 'Credit Card Portal', icon: '💳', page: 'Credit Card Portal' }
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
    background: 'linear-gradient(135deg, #0f172a 0%, #4c1d95 50%, #0f172a 100%)',
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
    background: 'linear-gradient(135deg, #c4b5fd, #a78bfa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(167, 139, 250, 0.2)',
    border: '1px solid rgba(167, 139, 250, 0.3)',
    borderRadius: '0.5rem',
    color: '#c4b5fd',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Credit Card Portal System Design</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(167, 139, 250, 0.3)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(167, 139, 250, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Back to System Design
        </button>
      </div>

      {/* Subtitle */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 1rem', color: '#94a3b8' }}>
        <p style={{ margin: 0 }}>Modern Credit Card Management System - 10M Users - 30M Transactions/Day - 20+ Components</p>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ padding: '0.25rem 0.75rem', background: 'rgba(236, 72, 153, 0.2)', color: '#f472b6', borderRadius: '9999px', fontSize: '0.875rem' }}>CQRS Pattern</span>
          <span style={{ padding: '0.25rem 0.75rem', background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', borderRadius: '9999px', fontSize: '0.875rem' }}>Event Sourcing</span>
          <span style={{ padding: '0.25rem 0.75rem', background: 'rgba(139, 92, 246, 0.2)', color: '#a78bfa', borderRadius: '9999px', fontSize: '0.875rem' }}>Saga Pattern</span>
          <span style={{ padding: '0.25rem 0.75rem', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', borderRadius: '9999px', fontSize: '0.875rem' }}>Circuit Breaker</span>
          <span style={{ padding: '0.25rem 0.75rem', background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', borderRadius: '9999px', fontSize: '0.875rem' }}>ML Fraud Detection</span>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          colors={TOPIC_COLORS}
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
              {concept.details.length} topics - Click to explore
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
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
              border: `1px solid ${selectedConcept.color}40`,
              width: '100%'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              colors={TOPIC_COLORS}
            />

            {/* Modal Header */}
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
                >Prev</button>
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
                >Next</button>
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
                >Close</button>
              </div>
            </div>

            {/* Detail Tabs */}
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

            {/* Detail Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = detail.diagram || selectedConcept.diagram
              return (
                <div>
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

                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                    {detail.name}
                  </h3>

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
